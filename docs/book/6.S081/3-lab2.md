# Lab syscall

上一个实验仅仅是在用户态下面增加一些功能，而这个实验不仅仅是用户态还涉及到了内核。通过这个实验来了解内核的结构以及内核是如何工作的。

> 需要提前阅读的内容：xv6书的第2章和第4章的4.3和4.4节，以及相关的源文件。系统调用的用户空间代码在 `user/user.h` 和 `user/usys.pl` 中。内核空间的代码是 `kernel/syscall.h` , `kernel/syscall.c`。与进程有关的代码是 `kernel/proc.h` 和 `kernel/proc.c` 。

## 1. 前置阅读内容总结

xv6 book ch2 总结

- OS 需要保证以下三个功能：多路复用：同时支持多个活动。隔离：进程出现问题不影响其他进程执行。交互：进程之间需要能够交互，例如管道。第二章主要介绍宏内核如何实现上述功能，此外还介绍了 xv6 启动时第一个进程的创建。
- Xv6运行在多核RISC-V微处理器上，RISC-V 是一个64位的CPU。xv6 是用 "LP64 "C语言编写的，所以 long(L) 和指针(P)是64位的，但int是32位的。
- CPU 需要和硬件交互，而硬件大部分呈I/O接口的形式。此处硬件是通过带"-machine virt "选项的qemu模拟出来的。硬件例如 RAM 、包含启动代码的ROM、与用户键盘/屏幕的串行连接以及用于存储的磁盘。
- 2.1 为什么需要 OS ？
  - 如果直接将 OS 当作库函数，那么无法保障隔离性。
  - 为了实现隔离，需要引入权限使得应用程序不能直接访问敏感的硬件资源。所以需要将硬件资源抽象为服务，例如，Unix应用程序只通过文件系统的`open`、`read`、`write`和`close`系统调用与文件系统进行交互，而不是直接读写磁盘。
  - 同样，Unix 在进程之间透明地切换硬件CPU，必要时保存和恢复寄存器状态，这样应用程序就不必意识到时间共享。这种透明性允许操作系统共享CPU，即使一些应用程序处于无限循环中。
  - Unix进程使用`exec`来建立它们的内存映像，而不是直接与物理内存交互。这使得操作系统可以决定将进程放在内存的什么位置；如果内存紧张，操作系统甚至可能将进程的部分数据存储在磁盘上。`exec`还允许用户将可执行文件储存在文件系统中。
  - Unix 进程之间的许多形式的交互都是通过文件描述符进行的。文件描述符不仅可以抽象出许多细节（例如，管道或文件中的数据存储在哪里），而且它们的定义方式也可以简化交互。例如，如果管道中的一个应用程序崩溃了，内核就会为管道中的另一个进程产生一个文件结束信号。
  - xv6 中的系统调用接口经过精心设计，既为程序员提供了便利，又提供了强隔离的可能。Unix接口并不是抽象资源的唯一方式，但事实证明它是一种非常好的方式。
- 2.2 机器模式，监督模式和系统调用
  - 为了实现强隔离，在应用程序和 OS 之间花了条线使得应用程序崩溃后不会影响 OS ，并且 OS 还能处理崩溃的应用程序确保其他程序正确运行。
  - 为了实现强隔离，操作系统必须确保应用程序不能修改（甚至不能读取）操作系统的数据结构和指令，应用程序不能访问其他进程的内存。
  - CPU提供了强隔离的硬件支持。例如，RISC-V有三种模式，CPU可以执行指令：**机器模式**、**监督者（supervisor）模式**和**用户模式**。在机器模式下执行的指令具有完全的权限，一个CPU在机器模式下启动。机器模式主要用于配置计算机。Xv6会在机器模式下执行几条指令，然后转为监督者模式。
  - CPU 在**机器模式**下启动，然后转为**监督者模式**，随后转为**用户模式**。CPU 在**机器模式**下具有完全的权限。在**监督者模式**下被允许执行特权指令，叫做允许在内核空间。例如启用和禁用中断，读写保存页表地址的寄存器等。在**用户模式**下执行特权指令会导致切换到监督者模式，进而终止该程序。应用程序只能执行用户模式的指令。
  - 一个应用程序如果要调用内核函数（如xv6中的`read`系统调用），必须过渡到内核。CPU提供了一个特殊的指令，可以将CPU从用户模式切换到监督者模式，并在内核指定的入口处进入内核。(RISC-V为此提供了`ecall`指令。)一旦CPU切换到监督者模式，内核就可以验证系统调用的参数，决定是否允许应用程序执行请求的操作，然后拒绝或执行该操作。由内核控制监督者模式的入口点是很重要的；如果应用程序可以决定内核的入口点，那么恶意应用程序就能够在跳过参数验证的情况下进入内核。
- 2.3 Kernel 组织
  - 根据操作系统的哪一部分应该在监督者模式下运行存在两种方式，分别是宏内核和微内核。
  - **宏内核**将所有系统调用的实现都在监督者模式下运行。优点是实现方便，并且 OS 之间的不同部分容易协作。缺点是接口实现复杂，一旦出问题会导致整个内核崩溃。
  - **微内核**能不放在监督者模式下运行就不放。用户模式下执行大部分代码。例如文件系统作为用户级进程运行。应用程序通过内核提供的进程间通信机制来实现和文件服务器的交互。例如，如果一个像shell这样的应用程序想要读写文件，它就会向文件服务器发送一个消息，并等待响应。
  - 在微内核中，内核接口由一些低级函数组成，用于启动应用程序、发送消息、访问设备硬件等。这种组织方式使得内核相对简单，因为大部分操作系统驻留在用户级服务器中。
  - xv6 和大多数Unix操作系统一样，是以宏内核的形式实现的。因此，xv6内核接口与操作系统接口相对应，内核实现了完整的操作系统。由于xv6不提供很多服务，所以它的内核比一些微内核要小，但从概念上讲xv6是宏内核。
- 2.4 Code: xv6 organization
  - xv6内核源码在`kernel/`子目录下。按照模块化的概念，源码被分成了多个文件。模块间的接口在`kernel/defs.h`中定义。
  - bio.c 文件系统的磁盘块缓存。
  - console.c 连接到用户键盘和屏幕。
  - entry.S 最早的启动说明。
  - exec.c exec() 系统调用. 
  - file.c 支持文件描述符。 
  - fs.c 文件系统。 
  - kalloc.c 物理页分配器. 
  - kernelvec.S 处理来自内核的陷阱，以及定时器中断。 
  - log.c 文件系统记录和崩溃恢复。
  - main.c 在启动过程中控制其他模块的初始化。 
  - pipe.c 管道。 plic.c RISC-V中断控制器。
  - printf.c 格式化的输出到控制台。 
  - proc.c 流程和调度安排。
  - sleeplock.c 产生CPU的锁。
  - spinlock.c 不产生CPU的锁。
  - start.c 早期的机器模式启动代码。
  - string.c C语言字符串和字节数库。
  - swtch.S 线程切换。 
  - syscall.c 派遣系统调用到处理功能。
  - sysfile.c 文件相关的系统调用。
  - sysproc.c 进程相关的系统调用。
  - trampoline.S 在用户和内核之间切换的汇编代码。
  - trap.c 用C代码来处理和返回陷阱和中断。
  - uart.c 串行端口的控制台设备驱动程序。
  - virtio_disk.c 磁盘设备驱动程序。
  - vm.c 管理页表和地址空间。
- 2.5 Process overview
  - xv6 的隔离是以进程为单位。进程隔离可以防止一个进程破坏或监视另一个进程的内存、CPU、文件描述符等。此外还可以防止进程破坏内核，所以进程不能破坏内核的隔离机制。内核必须小心翼翼地实现进程抽象，因为一个错误或恶意的应用程序可能会欺骗内核或硬件做一些不好的事情（例如，规避隔离）。内核用来实现进程的机制包括：用户/监督模式标志、地址空间和线程的时间片轮转。
  - 为了实施隔离，进程抽象为程序提供了一种拥有整个机器的错觉。一个进程为程序提供了一个看似私有的内存系统，或者说是地址空间，其他进程不能对其进行读写。进程还为程序提供了“私有”的CPU，用来执行程序的指令。
  - XV6 使用页表（由硬件实现）使得每个进程拥有自己的地址空间。RISC-V 页表将**虚拟地址**（RISC-V指令操作的地址）转换（或 "映射"）为**物理地址**（CPU芯片发送到主存储器的地址）。
  - Xv6为每个进程维护一个单独的页表，定义该进程的地址空间。如图2.3所示，进程的用户空间内存的地址空间是从虚拟地址0开始的。指令存放在最前面，其次是全局变量，然后是栈，最后是一个堆区（用于**malloc**），进程可以根据需要扩展。有一些因素限制了进程地址空间的最大长度：RISC-V上的指针是64位宽；硬件在页表中查找虚拟地址时只使用低的39位；xv6只使用39位中的38位。因此，最大地址是$2^{38}-1$ = 0x3fffffffff，也就是`MAXVA`（kernel/riscv.h:348）。在地址空间的顶端，xv6保留了一页，用于**trampoline**和映射进程**trapframe**的页，以便切换到内核，第4章会详细解释。
  - xv6内核为每个进程维护了许多状态，记录在`proc`结构体(kernel/proc.h:86)。一个进程最重要的内核状态是它的页表、内核栈和运行状态。用`p->xxx`来表示`proc`结构的元素，例如，`p->pagetable`是指向进程页表的指针。
  - 每个进程都有一个线程在执行进程的指令。一个线程可以被暂停，然后再恢复。为了在进程之间透明地切换，内核会暂停当前运行的线程，并恢复另一个进程的线程。线程的大部分状态（局部变量、函数调用返回地址）都存储在线程的栈中。每个进程有两个栈：用户栈和内核栈（`p->kstack`）。当进程在执行用户指令时，只有它的用户栈在被使用，而它的内核栈是空的。当进程进入内核时（因为系统调用或中断），内核代码在进程的内核栈上执行；当进程在内核中时，它的用户栈仍然包含保存的数据，但不被主动使用。进程的线程在用户栈和内核栈中交替执行。内核栈是独立的（并且受到保护，不受用户代码的影响），所以即使一个进程用户栈被破坏了，内核也可以执行。
  - 一个进程可以通过执行RISC-V `ecall`指令进行系统调用。该指令提高硬件权限级别，并将程序计数器改变为内核定义的入口点。入口点的代码会切换到内核栈，并执行实现系统调用的内核指令。当系统调用完成后，内核切换回用户栈，并通过调用`sret`指令返回用户空间，降低硬件特权级别，恢复执行系统调用前的用户指令。进程的线程可以在内核中阻塞等待I/O，当I/O完成后，再从离开的地方恢复。
  - `p->state`表示进程是创建、就绪、运行、等待I/O，还是退出。
  - `p->pagetable`以RISC-V硬件需要的格式保存进程的页表，当进程在用户空间执行时，xv6使分页硬件使用进程的`p->pagetable`。进程的页表也会记录分配给该进程内存的物理页地址。
- 2.6 Code: starting xv6 and the first process
  - 本节主要关注内核如何启动和运行的第一个进程。
  - 当计算机开机后，会首先从一个只读存储器中读取 bootloader 。bootloader  负责将 xv6 内核加载到内存中。随后在机器模式下，CPU从 `_entry`（kernel/entry.S:6）开始执行 xv6 。RISC-V在禁用分页硬件的情况下启动：虚拟地址直接映射到物理地址。
  - loader 将xv6内核加载到物理地址`0x80000000`的内存中。之所以将内核放在`0x80000000`而不是`0x0`，是因为地址范围`0x0:0x80000000`包含I/O设备。
  - `_entry`处的指令设置了一个栈，这样 xv6 就可以运行 C 代码。Xv6在文件`start.c`(kernel/start.c:11)中声明了初始栈的空间，即`stack0`。在`_entry`处的代码加载栈指针寄存器`sp`，地址为`stack0+4096`，也就是栈的顶部，因为RISC-V的栈是向下扩张的。现在内核就拥有了栈，`_entry`调用`start`(kernel/start.c:21)，并执行其C代码。
  - 函数`start`执行一些只有在机器模式下才允许的配置，然后切换到监督者模式。为了进入监督者模式，RISC-V提供了指令`mret`。这条指令最常用来从上一次的调用中返回，上一次调用从监督者模式到机器模式。`start`并不是从这样的调用中返回，而是把事情设置得像有过这样的调用一样：它在寄存器`mstatus`中把上一次的特权模式设置为特权者模式，它把`main`的地址写入寄存器`mepc`中，把返回地址设置为`main`函数的地址，在特权者模式中把`0`写入页表寄存器`satp`中，禁用虚拟地址转换，并把所有中断和异常委托给特权者模式。
  - 在进入特权者模式之前，`start`还要执行一项任务：对时钟芯片进行编程以初始化定时器中断。在完成了这些基本管理后，`start`通过调用`mret`“返回”到监督者模式。这将导致程序计数器变为`main`（kernel/main.c:11）的地址。
  - 在`main`(kernel/main.c:11)初始化几个设备和子系统后，它通过调用`userinit`(kernel/proc.c:212)来创建第一个进程。第一个进程执行一个用RISC-V汇编编写的小程序`initcode.S`（user/initcode.S:1），它通过调用`exec`系统调用重新进入内核。正如我们在第一章中所看到的，`exec`用一个新的程序（本例中是`/init`）替换当前进程的内存和寄存器。
  - 一旦内核完成`exec`，它就会在`/init`进程中返回到用户空间。`init` (user/init.c:15)在需要时会创建一个新的控制台设备文件，然后以文件描述符0、1和2的形式打开它。然后它在控制台上启动一个shell。这样系统就启动了。
- 2.7 Real world
  - 实际上现代操作系统中即存在宏内核，也存在微内核。许多Unix内核都是宏内核，例如 Linux 。此外大多数操作系统都采用了进程概念，大多数进程都与xv6的相似。
  - 现代操作系统支持进程可以拥有多个线程，以允许一个进程利用多个CPU。在一个进程中支持多个线程涉及到不少 xv6 没有的机制，包括潜在的接口变化(如Linux的`clone`，`fork`的变种)，以控制线程所共享进程的那些部分。

## 2. 做实验

开始实验，切换到syscall分支。

```sh
$ git checkout syscall
$ make clean
``` 

直接运行测试 `make grade` 发现 trace 和 sysinfotest 无法执行，接下来的任务就是实现这两个命令。

    如果出现如下问题，可将 `grade-lab-syscall` 第一行 `#!/usr/bin/env python` 改为 `#!/usr/bin/env python3` 

    /usr/bin/env: ‘python’: No such file or directory
    make: *** [Makefile:227: grade] Error 127

    接下来再次运行 make grade 发现不能执行 trace 和 sysinfotest。

### System call tracing (moderate)

添加一个跟踪系统调用的功能。创建一个名为 trace 的系统调用的函数。输入中有个参数，该参数是一个整数（掩码），指定位置决定了要跟踪哪些系统调用。例如要跟踪一条命令中 fork 的系统调用。那么就要设置 fork 对应的掩码 1 << SYS_fork ， 其中SYS_fork是kernel/syscall.h中的一个系统调用编号。因为 SYS_fork = 1，所以此时掩码就是 2 因为 `2 = 1 << 1` 。

打印出要跟踪的系统调用的进程ID、系统调用的名称和返回值，包含子进程。下面是几个实现好的例子。

```sh
$ trace 32 grep hello README
3: syscall read -> 1023
3: syscall read -> 966
3: syscall read -> 70
3: syscall read -> 0
```

其中 32 是掩码，而 $$32 = 2^5$$ ，查阅 `kernel/syscall.h` 可知 `SYS_read    5` ，那么要跟踪的系统调用就是 read 。将执行 `grep hello README` 过程中调用 read 的进程ID、系统调用的名称和返回值打印出来。

```sh
$ trace 2147483647 grep hello README
4: syscall trace -> 0
4: syscall exec -> 3
4: syscall open -> 3
4: syscall read -> 1023
4: syscall read -> 966
4: syscall read -> 70
4: syscall read -> 0
4: syscall close -> 0
```

2147583647 的31个低位全部被设置，所以所有的系统调用都将被跟踪。

```sh
$ grep hello README
$
```

这个例子中，程序没有被跟踪，所以没有输出。

```sh
$ trace 2 usertests forkforkfork
usertests starting
test forkforkfork: 407: syscall fork -> 408
408: syscall fork -> 409
409: syscall fork -> 410
410: syscall fork -> 411
409: syscall fork -> 412
410: syscall fork -> 413
409: syscall fork -> 414
411: syscall fork -> 415
...
$   
```

usertests 中的 `forkforkfork` test的所有后代的fork系统调用都被追踪。

最终实现出来的结果就是上面所呈现的，课程进程 ID 不同。

> 跟着 hint 走，下面的内容是结合了提示之后我的实现步骤。

* 在 Makefile 第 152 行处添加 `$U/_trace` 。目的是编译的时候能够识别到 trace 。

* 运行`make qemu` 发现报错，无法编译 `user/trace.c` 第 17 行的 trace 函数 。原因是这个系统调用还没有被注册，在 `user/user.h` 添加即可，接下来需要判断 trace 的函数签名，也就是输入输出。

* 由 `user/trace.c` 第 17 行处可知，trace 输入输出均为 int，此时在 `user/user.h` 第26行处添加代码 `int trace(int);` 接下来在 `kernel/syscall.h` 中添加syscall编号。 

* 在`user/usys.pl`中添加 `entry("trace");` 原因是 Makefile 调用 perl 脚本 `user/usys.pl`，产生`user/usys.S` 。 RISC-V 的 ecall 过渡到内核。(Makefile => `user/usys.pl` => `user/usys.S`)

* 此时 `make qemu` 就可以启动了。

* 此时再运行 `trace 32 grep hello README` 依旧失败，因为还未在内核中实现。

* 在 `kernel/sysproc.c` 中增加一个 sys_trace() 函数，在用户态执行 trace 函数后经过汇编代码最终切换到内核态后将会执行该函数(sys_trace())。这个函数的实现是照着上面代码改的，例如 `sys_exit()` 。其中 argint() 函数是拿到用户态输入的参数，将其保存到 n 中，其实就是掩码，将掩码保存到当前进程中，那么就需要在当前进程中加一个参数了。myproc() 表示当前进程，

```cpp
uint64
sys_trace(void){
  int n;
  if(argint(0, &n) < 0) {
    return -1;
  }
  myproc()->trace_mask = n;
  return 0;
}
```

* 在进程 `kernel/proc.h` 第 106 行添加 `int trace_mask; ` 用于记录掩码。
* 接下来是修改 `kernel/syscall.c` 中的 `syscall()` 函数以打印跟踪输出。
* 先将在头部添加 `extern uint64 sys_trace(void); `方便别的文件引用。
* 接下来在 `static uint64 (*syscalls[])(void)` 添加相应内容 `[SYS_trace]   sys_trace,`
* 因为要打印系统调用名称，但是缺少系统调用号和名称之间的映射，需要建立二者的映射。

```cpp
static char* syscall_names[] = {
  [SYS_fork]    "fork",
  [SYS_exit]    "exit",
  [SYS_wait]    "wait",
  [SYS_pipe]    "pipe",
  [SYS_read]    "read",
  [SYS_kill]    "kill",
  [SYS_exec]    "exec",
  [SYS_fstat]   "fstat",
  [SYS_chdir]   "chdir",
  [SYS_dup]     "dup",
  [SYS_getpid]  "getpid",
  [SYS_sbrk]    "sbrk",
  [SYS_sleep]   "sleep",
  [SYS_uptime]  "uptime",
  [SYS_open]    "open",
  [SYS_write]   "write",
  [SYS_mknod]   "mknod",
  [SYS_unlink]  "unlink",
  [SYS_link]    "link",
  [SYS_mkdir]   "mkdir",
  [SYS_close]   "close",
  [SYS_trace]   "trace",
};

void
syscall(void)
{
  int num;
  struct proc *p = myproc();

  num = p->trapframe->a7;
  if(num > 0 && num < NELEM(syscalls) && syscalls[num]) {
    p->trapframe->a0 = syscalls[num]();
    if ((p->trace_mask & (1 << num)) != 0) {                                  
        printf("%d: syscall %s -> %d \n", p->pid, syscall_names[num], p->trapframe->a0);
    }
  } else {
    printf("%d %s: unknown sys call %d\n",
            p->pid, p->name, num);
    p->trapframe->a0 = -1;
  }
}

```

主要关注 if 内，判断当前所执行进程的参数是否命中掩码，如果命中就打印。

```sh
    if ((p->trace_mask & (1 << num)) != 0) {                                  
        printf("%d: syscall %s -> %d \n", p->pid, syscall_names[num], p->trapframe->a0);
    }
```

修改 fork()(见kernel/proc.c)，将跟踪掩码从父进程复制到子进程，方便跟踪子进程的执行。添加 `np->trace_mask = p->trace_mask;` 即可。

注意修改 kernel/proc.c 中的 `freeproc()` 函数，将 `p->trace_mask = 0;` 释放进程的时候要重置相应内容。

### Sysinfo (moderate)

任务是添加一个系统调用函数 sysinfo ，先把用户态下的执行流程设置好。

- 将 `$U/_sysinfotest` 添加到 Makefile 的 UPROGS 中。接下来执行 make qemu 后发现报错：
- 添加系统调用 sysinfo，步骤与 trace 相同。（如果这里卡住就回头仔细搞明白 trace 的执行流程再往下研究）。
- sysinfo 需要将 struct sysinfo 拷贝回用户空间；参见 sys_fstat() (kernel/sysfile.c)和 filestat() (kernel/file.c)，了解如何使用 copyout() 进行拷贝。

在 kernel/kalloc.c 中添加一个函数，统计自由内存的数量。

在 kernel/proc.c中加入一个函数，统计进程的数量。