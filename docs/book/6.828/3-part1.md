# Lab 3: User Environments

https://pdos.csail.mit.edu/6.828/2018/labs/lab3/

## Introduction

实现基本的内核功能，例如获取一个进程。

在这个实验中，你将实现让受保护的用户模式环境（即"进程"）运行所需的基本内核设施。

增强JOS内核，以建立数据结构来跟踪用户环境，创建一个单一的用户环境，将一个程序映像加载到其中，并开始运行。将使JOS内核能够处理用户环境的任何系统调用，并处理它引起的任何其他异常。

环境和进程均指运行一个程序的抽象概念。但是 JOS environments 和 UNIX processes 提供了不同的接口。

## Getting Started

切换到 lab3 分支：

    git checkout -b lab3 origin/lab3
    git merge lab2

NANO Ctrl + x 保存。

下面是 lab3 新添加的文件，需要浏览：

* `inc/env.h` 用户环境的公共定义
  * `trap.h` 处理陷阱的公共定义
  * `syscall.h`	从用户环境到内核的公共定义
  * `lib.h` 用户模式支持库的公共定义
* `kern/env.h` 内核专用的对于用户环境定义
  * `env.c` 实现用户模式环境的内核代码
  * `trap.h` 内核专用的陷阱处理定义
  * `trap.c` 陷阱处理代码
  * `trapentry.S` 汇编语言的陷阱处理程序入口点
  * `syscall.h` 内核专用的系统调用的定义
  * `syscall.c` 系统调用的代码实现
* `lib/Makefrag` 构建用户模式的 Makefile 库
  * `entry.S` 用户环境汇编语言的程序入口
  * `libmain.c` 用户模式库设置代码，由 `entry.S` 调用
  * `syscall.c` 用户模式系统调用 stub 函数
  * `console.c` 用户模式实现 putchar 和 getchar，提供终端 I/O
  * `exit.c` 用户模式实现 `exit`
  * `panic.c` 用户模式实现 panic 
* `user/*` lab3 的测试代码

使用 `git diff lab2` 可查看 lab3 对于 lab2 源文件的修改。

## Lab Requirements

Lab 分为 Part A、Part B 两部分。

## Inline Assembly

Lab 中会用到[内联汇编](https://pdos.csail.mit.edu/6.828/2018/reference.html)。

## Part A: User Environments and Exception Handling

`inc/env.h` 包含了 JOS 定义的用户环境。内核使用 `Env` 数据结构来跟踪每一个用户环境。

在这个实验中将会创建一个用户环境，并且 JOS 内核需要支持多用户环境。lab 4 将利用这一特点，允许一个用户环境 fork 其他环境。

在`kern/env.c`中，内核维护着三个与环境有关的主要全局变量。

```cpp
struct Env *envs = NULL;		// 所有的环境
struct Env *curenv = NULL;		// 当前环境光
static struct Env *env_free_list;	// 自由环境列表
```

一旦 JOS 获得并且运行，envs 指针指向了一个 Env 结构的数组来表示环境中的所有环境。

JOS内核将支持最多的 NENV 个同时活动环境。通常运行环境数量是较少的，，NENV 是定义在 `inc/env.h` 中的常量。

一旦被分配，envs 数组将会包含单个 Env 数据结构实例对每个 NENV 环境。JOS 内核将所有不活跃的 Env 结构保存在 env_free_list 中。这种设计使环境的分配和删除变得容易，因为它们只需要被添加到 free list 中或从 free list 中删除。

内核使用 curenv 符号来跟踪当前在任何时间执行的环境。在启动过程中，在第一个环境被运行之前，curenv 最初被设置为 NULL。

## Environment State

Env结构在`inc/env.h`中定义如下（尽管在未来的实验中会增加更多的字段）。

```cpp
struct Env {
	struct Trapframe env_tf;	// 保存的寄存器
	struct Env *env_link;		// 下一个 free Env
	envid_t env_id;			// 环境的唯一标识符
	envid_t env_parent_id;		// 父环境的标识符
	enum EnvType env_type;		// 特殊的系统环境
	unsigned env_status;		// 环境状态
	uint32_t env_runs;		// 环境运行次数

	// 地址空间
	pde_t *env_pgdir;		//  page dir 内核地址空间
};
```

以下是Env字段的用途：

* env_tf: 定义在 `inc/trap.h` 中，当环境不运行时，保存环境寄存器的值。当从用户模式切换到内核模式时，内核会保存这些值方便日后恢复。
* env_link：指向 env_free_list 上的下一个 Env 的链接。env_free_list 指向列表中的第一个free environment。
* env_id: 用来唯一标识当前使用这个Env结构的环境（即，使用 enves 数组中的这个特定槽），存放在内核中。用户环境终止后，内核可以重新分配相同的 Env 结构给一个不同的环境--但是新环境将有一个与旧环境不同的 env_id ，即使新环境重新使用 envs 数组中的同一个槽。
* env_parent_id: 内核存储了创建该环境的环境的 env_id。据此环境之间形成了一个 family tree ，进而可以辅助决策。
* env_type: 用来区分特殊环境的。对于大多数环境，它将是ENV_TYPE_USER。我们将在以后的实验中为特殊的系统服务环境介绍一些更多的类型。
* env_status: 该变量持有以下数值：
  * ENV_FREE: 表明该环境是不活跃的，并且位于 env_free_list 中。
  * ENV_RUNNABLE: 表示Env结构代表一个在处理器上等待运行的环境。
  * ENV_RUNNING: 表示正在运行。
  * ENV_NOT_RUNNABLE: 表示Env结构代表一个当前活动的环境，但它目前还没有准备好运行：例如，因为它正在等待另一个环境的进程间通信（IPC）。
  * ENV_DYING: 表示该Env结构代表一个僵尸环境。一个僵尸环境将在下一次捕获到内核时被释放。在 lab4 之前不使用这个标志。
* env_pgdir: 持有环境页目录的内核虚拟地址。

和 Unix 进程一样，JOS 环境结合了线程和地址空间的概念。线程主要由保存的寄存器（env_tf字段）定义，而地址空间则由env_pgdir所指向的页目录和页表定义。为了运行一个环境，内核必须在CPU上设置保存的寄存器和适当的地址空间。

结构Env类似于xv6中的 struct proc 。这两个结构都在一个 Trapframe 结构中保存了环境（即进程）的用户模式寄存器状态。在JOS中，各个环境并不像 xv6 中的进程那样有自己的内核堆栈。内核中一次只能有一个JOS环境在活动，所以JOS只需要一个内核栈。

## Allocating the Environments Array

在 lab2 中，在 `mem_init()` 中为 `pages[]` 数组分配了内存，这是内核用来跟踪哪些页面是空闲的，哪些不是。现在需要进一步修改 `mem_init()` 来分配一个类似的 Env 结构数组，称为 envs 。

* 练习1. 修改 `kern/pmap.c` 中的 `mem_init()` 来分配和映射 envs 数组。这个数组由环境结构的 NENV实例组成，其分配方式与你分配 pages 数组的方式很相似。和 pages 数组一样，支持 enves 的内存也应该在 UENVS （定义在`inc/memlayout.h`中）处被映射为用户只读，因此用户进程可以从这个数组中读取。通过 check_kern_pgdir() 来判断代码是否正确。

### Exercise 1.

构建 enves 数组，为其申请空间：

	envs = (struct Env*)boot_alloc(NENV*sizeof(struct Env));
	memset(envs, 0, NENV*sizeof(struct Env));

建立映射：

	boot_map_region(kern_pgdir, UENVS, PTSIZE, PADDR(envs), PTE_U);

使用 `make qemu` 验证，通过测试：

    check_page_free_list() succeeded!
    check_page_alloc() succeeded!
    check_page() succeeded!
    check_kern_pgdir() succeeded!
    check_page_free_list() succeeded!
    check_page_installed_pgdir() succeeded!
    kernel panic at kern/env.c:461: env_run not yet implemented
    Welcome to the JOS kernel monitor!
    Type 'help' for a list of commands.
    K>

## Creating and Running Environments

现在你将在 `kern/env.c` 中编写运行用户环境所需的代码。因为目前还没有文件系统，所以设置内核来加载一个嵌入内核本身的静态二进制 image 。JOS 将这个二进制文件作为 ELF 可执行文件嵌入内核中。

Lab 3 GNUmakefile 在 `obj/user/` 目录下生成了一些二进制映像。目录 `kern/Makefrag` 下，二进制文件直接 "链接" 到内核可执行文件中，类似 .o 文件。链接器命令行中的 `-b binary` 选项使这些文件作为 "原始的" 未解释的二进制文件被链接进来，而不是作为由编译器产生的普通 `.o` 文件。(就链接器而言，这些文件根本不一定是 ELF image--它们可以是任何东西，如文本文件或图片！) 在构建内核后查看 `obj/kern/kernel.sym` 会看到链接器 "神奇地 "产生了一些有趣的符号，它们的名字很模糊，比如 _binary_obj_user_hello_start，_binary_obj_user_hello_end，和_binary_obj_user_hello_size。链接器通过篡改二进制文件的文件名来生成这些符号名称；这些符号为普通的内核代码提供了一种引用嵌入式二进制文件的方法。

* Exercise 2. 在文件 env.c 中实现如下函数：
  * `env_init()` 初始化 envs 数组中的所有 Env 结构，并将它们添加到 env_free_list 中。同时调用env_init_percpu，为特权级别0（内核）和特权级别3（用户）配置分段硬件。
  * `env_setup_vm()` 为新环境分配一个页面目录，并初始化新环境的地址空间的内核部分。
  * `region_alloc()` 为环境分配空间并映射物理内存。
  * `load_icode()` 解析一个ELF二进制镜像，就像启动加载器已经做的那样，并将其内容加载到一个新环境的用户地址空间。
  * `env_create()` 用env_alloc分配一个环境，并调用load_icode将一个ELF二进制文件加载到其中。
  * `env_run()` 启动一个以用户模式运行的特定环境。

* 使用 cprintf 中 %e 可以打印出与错误代码相对应的描述。例如：

	r = -E_NO_MEM;
	panic("env_alloc: %e", r);

会出现 "env_alloc: out of memory "的 panic。

下面是到调用用户代码的地方为止的代码调用图。请确保你理解每一步的目的。

* start (kern/entry.S)
* i386_init (kern/init.c)
  * cons_init
  * mem_init
  * env_init
  * trap_init (此时还未实现)
  * env_create
  * env_run
  * env_pop_tf

一旦完成后，应当在 qemu 中编译并执行内核。如果一切顺利，系统应该进入用户空间并执行 hello 二进制，直到它用 int 指令进行系统调用。在这一点上会有麻烦，因为 JOS 没有设置硬件来允许任何形式的从用户空间到内核的过渡。当 CPU 发现没有被设置为处理这个系统调用中断时，将会产生一个一般保护异常，发现它不能处理，产生一个双重故障异常，发现它也不能处理，最后以所谓的 "三重故障 "放弃。通常情况下，会看到 CPU 复位和系统重启。虽然这对传统应用程序很重要（见这篇博文的解释），但对内核开发来说是个麻烦，所以在 6.828补丁的QEMU中，你会看到一个寄存器转储和一个 "三重故障 "信息。

我们将很快解决这个问题，但现在我们可以使用调试器来检查我们是否进入了用户模式。使用qemu-gdb，在env_pop_tf处设置一个GDB断点，这应该是你在实际进入用户模式之前碰到的最后一个函数。使用si单步通过这个函数；处理器应该在iret指令之后进入用户模式。现在使用b *0x...在hello中sys_cputs()的int $0x30处设置断点（用户空间地址见obj/user/hello.asm）。这个int是向控制台显示一个字符的系统调用。如果你不能执行到int，那么你的地址空间设置或程序加载代码就有问题；在继续之前，请回去修正它。

### Exercise 2.

回顾一下，从 lab2 如何跳转到 lab3：在 `i386_init()` 函数中，经过 `mem_init()` 函数对内存初始化。接下来通过 `env_init()` 实现环境的初始化。也就是进入 lab3 。

1. 实现 `env_init()` ：

根据注释可知，将'envs'中的所有环境标记为自由，将其 env_ids 设置为 0 并将其插入 env_free_list 中。确保环境以同样的顺序插入 free list 中。它们在envs数组中（也就是说，这样第一次调用 env_alloc()就会返回 envs[0] ）。

```cpp
	for (int i = NENV - 1; i >= 0; i--) {
		envs[i].env_id = 0;
		envs[i].env_status = ENV_FREE;
		envs[i].env_link = env_free_list;
		env_free_list = &envs[i];
	}
```

2. 实现 `env_setup_vm()` ：

为环境 e 初始化内核虚拟内存布局。分配一个页面目录，相应地设置 `e->env_pgdir` ，并初始化新环境的地址空间的内核部分。不要把任何东西映射到环境的虚拟地址空间的用户部分。

返回数字为零表示成功，小于零表示错误，例如 -E_NO_MEM 表示页目录或页表没有被正确分配。

设置`e->env_pgdir`并初始化页面目录。所有环境的 VA 空间在 UTOP 以上是相同的，除了在 UVPT 处，我们在下面设置了这个空间。关于权限和布局，见`inc/memlayout.h`。可以使用 `kern_pgdir` 作为模板。

确保在 lab2 获得了正确的权限。UTOP 之下的虚拟内存是空的，不需要使用 `page_alloc()` 。

注意：一般来说，对于只在 UTOP 以上映射的物理页，pp_ref 不被维护，但是 env_pgdir 是一个例外--需要增加 env_pgdir 的 pp_ref ，以便 env_free 能够正确工作。 kern/pmap.h 中的函数是很方便的。

```c
	p->pp_ref++;
	e->env_pgdir = (pde_t *)page2kva(p);
	memcpy(e->env_pgdir, kern_pgdir, PGSIZE);
```

3. `region_alloc()` 为环境分配空间并映射物理内存。

不以任何方式调零或以其他方式初始化映射的页面。用户和内核应该可以写入页面。如果任何分配尝试失败，则 panic 。但只有当你需要它来加载 _icode 时才会如此。

提示：如果调用者能够传递非页对齐的'va'和'len'值，那么使用 region_alloc 会更容易。你应该将 va 向下取整，并将（va + len）向上取整。注意 corner-cases !

```cpp
static void
region_alloc(struct Env *e, void *va, size_t len)
{
	struct PageInfo *page = NULL;
	va = ROUNDDOWN(va, PGSIZE);
	void *end = (void *)ROUNDUP(va + len, PGSIZE);
	for (; va < end; va += PGSIZE) {
		if (!(page = page_alloc(ALLOC_ZERO))) {
			panic("region_alloc: alloc failed.");
		}
		if (page_insert(e->env_pgdir, page, va, PTE_U | PTE_W)) {
			panic("region_alloc: page mapping failed.");
		}
	}
}
```

4. 实现 `load_icode()` 解析一个ELF二进制镜像，就像启动加载器已经做的那样，并将其内容加载到一个新环境的用户地址空间。

为一个用户进程设置初始程序二进制、堆栈和处理器标志。这个函数只在内核初始化时调用，在运行第一个用户模式环境之前。

这个函数从 ELF 二进制映像中的所有可加载段加载到环境的用户内存中，从 ELF 程序头中指示的适当的虚拟地址开始。同时，它将这些段的任何部分清除为零，这些段在程序头中被标记为被映射，但实际上并不存在于 ELF 文件中，即程序的 bss 部分。w所有这些和我们的 Boot Loader 所做的非常相似，除了 Boot Loader 还需要从磁盘上读取代码。看一下 `boot/main.c` 来获得灵感。最后，这个函数为程序的初始堆栈映射了一个页面。 如果遇到问题，load_icode 会 panic 。  - load_icode 怎么会失败？ 给定的输入可能有什么问题？

5. `env_create()` 用 env_alloc 分配一个环境，并调用 load_icode 将一个 ELF 二进制文件加载到其中。



6. `env_run()` 启动一个以用户模式运行的特定环境。



## Handling Interrupts and Exceptions

在这一点上，用户空间的第一个`int 0x30`系统调用指令是一个死胡同：一旦处理器进入用户模式，就没有办法再出来。你现在需要实现基本的异常和系统调用处理，这样内核就有可能从用户模式代码中恢复对处理器的控制。你应该做的第一件事是彻底熟悉x86中断和异常机制。

* Exercise 3. Read Chapter 9, Exceptions and Interrupts in the 80386 Programmer's Manual (or Chapter 5 of the IA-32 Developer's Manual), if you haven't already.

