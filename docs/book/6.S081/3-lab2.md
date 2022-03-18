# Lab syscall

上一个实验仅仅是在用户态下面增加一些功能，而这个实验不仅仅是用户态还涉及到了内核。通过这个实验来了解内核的结构以及内核是如何工作的。

> 需要提前阅读的内容：xv6书的第2章和第4章的4.3和4.4节，以及相关的源文件。系统调用的用户空间代码在 `user/user.h` 和 `user/usys.pl` 中。内核空间的代码是 `kernel/syscall.h` , `kernel/syscall.c`。与进程有关的代码是 `kernel/proc.h` 和 `kernel/proc.c` 。

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

## System call tracing (moderate)

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
* 后续内容修改如下：

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

## Sysinfo (moderate)

任务是添加一个系统调用函数 sysinfo ，先把用户态下的执行流程设置好。

将 `$U/_sysinfotest` 添加到 Makefile 的 UPROGS 中。接下来执行 make qemu 后发现报错：


![20220318135234](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318135234.png)

添加系统调用sysinfo，步骤与 trace 相同。（如果这里卡住就回头仔细搞明白 trace 的执行流程再往下研究）。

跳转到内核后，接下来是在内核中实现 sysinfotest 。

sysinfo 需要将 struct sysinfo 拷贝回用户空间；参见 sys_fstat() (kernel/sysfile.c)和 filestat() (kernel/file.c)，了解如何使用copyout()进行拷贝。

To collect the amount of free memory, add a function to kernel/kalloc.c

在 kernel/kalloc.c 中添加一个函数，统计自由内存的数量。

在 kernel/proc.c中加入一个函数，统计进程的数量。