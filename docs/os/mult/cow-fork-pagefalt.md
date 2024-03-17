花了三天时间整理了一遍程序执行流程，感觉这个理解还是有点难度的。本来想一篇文章全部列完 COW Fork 的知识点，但是开头就卡住了，慢慢来吧。

这篇文章结合具体的代码讲解操作系统中 COW Fork 的页面错误实现细节。

### 如何实现 COW Fork ？

COW（Copy-On-Write）Fork 是一种优化的 Fork 实现方式，它在创建子进程时并不立即复制父进程的所有内存页，而是让父子进程共享同一份内存页，只有当其中一个进程试图修改某个内存页时，才会复制该内存页，这就是所谓的写时复制（Copy-On-Write）。

接下来讲解 COW Fork 的实现细节：

1. 首先，设置页错误处理函数`pgfault`，这个函数会在发生页错误（例如试图写入一个只读页）时被调用。

2. 调用`sys_exofork`创建一个新的进程，新进程的地址空间最初是空的。

3. 如果`sys_exofork`返回 0，说明当前是子进程，设置全局变量`thisenv`指向子进程的环境描述符，并返回 0。

4. 如果`sys_exofork`返回的是一个正数，说明当前是父进程，开始复制页表。遍历用户空间的每一个页，如果该页是存在的并且是用户页，就调用`duppage`复制该页。`duppage`会检查该页是否是可写的或者是写时复制的，如果是，就将该页在父子进程中都标记为写时复制，否则，直接复制页表项。

5. 为子进程的用户异常栈分配一个新的页。用户异常栈不能标记为写时复制，因为当发生页错误时，需要能够写入用户异常栈。

6. 设置子进程的页错误处理函数为`_pgfault_upcall`，这个函数是一个汇编语言函数，它会保存当前的寄存器状态，并调用`pgfault`。

7. 最后，将子进程的状态设置为可运行（RUNNABLE），并返回子进程的环境 ID。

这样，父进程和子进程就共享了大部分内存页，只有当其中一个进程试图修改某个页时，才会复制该页，从而节省了大量的内存和 CPU 时间。

### 页面错误处理 trap

在 COW Fork 中，子进程的页面初始时被标记为只读，并且与父进程共享。当子进程试图写入这些只读页面时，会触发页面错误（Page Fault），操作系统会捕获这个错误，并为子进程创建一个新的、可写的页面副本。这个过程就是所谓的“写时复制”（Copy-On-Write）。在这种情况下，`trap_dispatch`函数会检查`Trapframe`中的中断号，如果中断号为`T_PGFLT`，则调用`page_fault_handler`函数处理页面错误。

```c
static void
trap_dispatch(struct Trapframe *tf)
{
	switch (tf->tf_trapno) {
		case T_PGFLT:
			page_fault_handler(tf);
			return;
		case T_BRKPT:
			monitor(tf);
			return;
		case T_SYSCALL:
			tf->tf_regs.reg_eax = syscall(tf->tf_regs.reg_eax, tf->tf_regs.reg_edx, tf->tf_regs.reg_ecx,
				tf->tf_regs.reg_ebx, tf->tf_regs.reg_edi, tf->tf_regs.reg_esi);
			return;
		default:
			// Handle other cases here
			break;
	}
    // ...
}

```

接下来讲解 page_fault_handler 的实现细节。

### 异常栈

`page_fault_handler`函数首先读取处理器的 CR2 寄存器以找到出错的地址。如果错误发生在内核模式，它会触发 panic。如果错误发生在用户模式，它会检查当前环境是否设置了页面错误处理函数。如果设置了，它会在用户异常栈上设置一个页面错误栈帧，然后跳转到页面错误处理函数。如果没有设置页面错误处理函数，或者异常栈溢出，或者异常栈没有分配，它会销毁引起错误的环境。

```c
void
page_fault_handler(struct Trapframe *tf)
{
	uint32_t fault_va;

	// 读取处理器的CR2寄存器以找到出错的地址
	fault_va = rcr2();

	// 处理内核模式下的页面错误。
	// 如果错误发生在内核模式下
	if ((tf->tf_cs & 3) == 0) {
		// 触发panic，因为内核模式下不应该发生页面错误
		panic("page_fault_handler():page fault in kernel mode!\n");
	}

	// 如果当前进程有异常处理函数
	if (curenv->env_pgfault_upcall) {

		// 如果发生在异常栈上，那么就使用当前栈
		uintptr_t stacktop = UXSTACKTOP;

		// 如果当前栈指针在异常栈的范围内，处理“递归页面错误”
		if (UXSTACKTOP - PGSIZE < tf->tf_esp && tf->tf_esp < UXSTACKTOP) {
			// 将栈顶设置为当前栈指针
			stacktop = tf->tf_esp;
		}

		// 为异常栈分配空间，包括一个UTrapframe结构和一个额外的字
		uint32_t size = sizeof(struct UTrapframe) + sizeof(uint32_t);

		// 检查异常栈是否越界
		user_mem_assert(curenv, (void *)stacktop - size, size, PTE_U | PTE_W);

		// 将异常栈指针指向异常栈的顶部
		struct UTrapframe *utr = (struct UTrapframe *)(stacktop - size);

		// 填充UTrapframe结构
		utr->utf_fault_va = fault_va;
		utr->utf_err = tf->tf_err;
		utr->utf_regs = tf->tf_regs;
		utr->utf_eip = tf->tf_eip;
		utr->utf_eflags = tf->tf_eflags;
		utr->utf_esp = tf->tf_esp;

		// 设置eip为异常处理函数的地址，设置esp为UTrapframe结构的地址
		curenv->env_tf.tf_eip = (uintptr_t)curenv->env_pgfault_upcall;
		curenv->env_tf.tf_esp = (uintptr_t)utr;

		// 运行异常处理函数
		env_run(curenv);
	}

	// 如果没有异常处理函数，或者异常栈溢出，或者异常栈没有分配
	cprintf("[%08x] user fault va %08x ip %08x\n",
		curenv->env_id, fault_va, tf->tf_eip);
	print_trapframe(tf);
	env_destroy(curenv);
}
```

异常栈（Exception Stack）或者叫做中断栈（Interrupt Stack），是用于处理异常或中断的特殊栈。当 CPU 检测到异常或中断时，它会自动保存当前的执行状态（包括寄存器的值、指令指针等）到异常栈上，然后跳转到对应的异常处理函数或中断处理函数去处理这个异常或中断。

异常栈的主要作用有两个：

1. 保存异常或中断发生时的执行状态：当异常或中断发生时，CPU 需要暂停当前的执行流程，跳转到异常处理函数或中断处理函数去处理这个异常或中断。为了能在处理完异常或中断后能恢复到原来的执行流程，CPU 需要保存当前的执行状态，这就需要用到异常栈。

2. 提供处理异常或中断的运行环境：异常处理函数或中断处理函数在执行过程中可能需要使用栈来保存局部变量、传递参数等，这就需要用到异常栈。

在这段代码中，当发生页面错误（Page Fault）时，如果当前进程设置了页面错误处理函数，那么就会在用户异常栈上设置一个页面错误栈帧，然后跳转到页面错误处理函数。这个页面错误栈帧中保存了发生页面错误时的执行状态，包括发生错误的虚拟地址、错误代码、通用寄存器的值、指令指针、系统状态标志、堆栈指针等。这些信息在处理页面错误的过程中是非常重要的，它们可以帮助我们定位错误发生的原因，也可以帮助我们在处理完页面错误后恢复到错误发生时的状态。

在调用处理函数之前，会在用户异常栈上（位于`UXSTACKTOP`以下）设置一个页面错误栈帧。

如果页面错误处理函数导致另一个页面错误，那么会递归地调用页面错误处理函数，并在用户异常栈的顶部推入另一个页面错误栈帧。

在处理页面错误的过程中，需要在陷阱时间栈的顶部留有一个字的临时空间，以便更容易恢复`eip`和`esp`。在非递归情况下，不必担心这个问题，因为常规用户栈的顶部是空闲的。但在递归情况下，需要在当前异常栈的顶部和新的栈帧之间留下一个额外的字，因为异常栈就是陷阱时间栈。

在 x86 架构中，当发生异常（如页面错误）时，CPU 会自动将当前的执行状态（包括`eip`和`esp`）保存到异常栈上，然后跳转到异常处理函数去处理这个异常。在处理完异常后，需要从异常栈上恢复这些保存的状态，以便程序可以在错误发生的地方继续执行。

```c
// 为异常栈分配空间，包括一个UTrapframe结构和一个额外的字
uint32_t size = sizeof(struct UTrapframe) + sizeof(uint32_t);
```

这里的"一个字的临时空间"，实际上是指一个 32 位的空间（在 x86 架构中，一个字等于 32 位）。这个空间是用来保存`eip`和`esp`的。因为在处理异常的过程中，可能会有新的数据被压入栈中，如果不预留这个空间，那么`eip`和`esp`可能会被覆盖，导致无法正确地恢复到错误发生时的状态。

在代码中是通过下面的逻辑来判断的：

```c
// 如果当前栈指针在异常栈的范围内，处理“递归页面错误”
if (UXSTACKTOP - PGSIZE < tf->tf_esp && tf->tf_esp < UXSTACKTOP) {
	stacktop = tf->tf_esp;
}

//...
curenv->env_tf.tf_esp = (uintptr_t)utr;
```

其中最后 tf_esp 记录了 utr 的指针，防止被覆盖。这个设计是为了处理递归的页面错误。在处理页面错误的过程中，可能会发生另一个页面错误，这就需要递归地调用页面错误处理函数。在递归的情况下，需要在当前的异常栈的顶部和新的栈帧之间留下一个额外的字，因为异常栈就是陷阱时间栈。

如果没有页面错误处理函数，或者进程没有为其异常栈分配一个页面，或者不能写入它，或者异常栈溢出，那么就销毁引起错误的环境。

`user_mem_assert()`函数用于检查内存权限，`env_run()`函数用于切换到用户态并开始执行页面错误处理函数。要改变用户环境运行的内容，需要修改`curenv->env_tf`，这是当前进程的陷阱帧。

### 发生 Trap 后需要保存哪些信息？

`UTrapframe`结构体用于保存发生异常时的 CPU 状态，具体字段的含义如下：

```cpp
struct UTrapframe {
	// utf_fault_va字段用于保存发生错误的虚拟地址。
    // 对于页面错误（T_PGFLT），这个字段保存错误的地址，否则为0。
	uint32_t utf_fault_va;

	// utf_err字段用于保存错误代码。
    // 错误代码是由CPU在发生异常时自动设置的，
    // 它可以告诉我们错误的具体类型（例如，错误是由于缺页还是权限错误）。
	uint32_t utf_err;

	// utf_regs字段用于保存发生异常时的寄存器状态。
    // 这些寄存器包括`eax`、`ecx`、`edx`、`ebx`、`esp`、`ebp`、`esi`和`edi`。
	struct PushRegs utf_regs;

	// utf_eip字段用于保存发生异常时的指令指针。
    // 指令指针`eip`指向发生异常的指令。
	uintptr_t utf_eip;

	// utf_eflags字段用于保存发生异常时的标志寄存器。
    // 标志寄存器`eflags`包含了一些重要的状态位，例如中断使能位。
	uint32_t utf_eflags;

	// utf_esp字段用于保存发生异常时的堆栈指针。
    // 堆栈指针`esp`指向当前的堆栈顶部。
	uintptr_t utf_esp;
} __attribute__((packed));
```

这些字段的保存是为了在处理异常的过程中，如果发生了另一个异常，可以递归地调用异常处理函数，而不会覆盖掉原来的 CPU 状态。

### 如何设置 env_pgfault_upcall ？

从上的代码中已经看到了 env_pgfault_upcall 的重要性，那么该如何设置呢？这其实是通过一个系统调用来实现的，在 COW Fork 的实现中第一步就是设置这个字段。下面这段代码的目的是设置页错误处理函数。

```cpp
extern void _pgfault_upcall(void);
set_pgfault_handler(pgfault);
```

上面的代码下面声明了一个外部函数`_pgfault_upcall`。这个函数在`lib/pfentry.S`文件中定义，是页错误的上调入口点。当发生页错误时，内核会跳转到这个函数。

随后 `set_pgfault_handler(pgfault);` 这行代码调用了`set_pgfault_handler`函数，将`pgfault`设置为页错误处理函数。`pgfault`函数在`lib/fork.c`文件中定义，是用户级别的页错误处理函数。

当发生页错误时，内核会跳转到`_pgfault_upcall`函数，然后`_pgfault_upcall`函数会调用`pgfault`函数。`pgfault`函数的工作是检查错误的类型，如果是写入一个只读的页，那么就分配一个新的页，将旧页的内容复制到新页，然后将新页映射到旧页的地址，这样就实现了写时复制（Copy-On-Write）。

这样做的原因是，COW Fork 在创建子进程时，并不立即复制父进程的所有内存页，而是让父子进程共享同一份内存页，只有当其中一个进程试图修改某个内存页时，才会复制该内存页。这样可以节省大量的内存和 CPU 时间。而页错误处理函数就是实现这个逻辑的关键部分。

#### 为什么要先跳转到汇编 `_pgfault_upcall` 再调用 C 语言实现的 `pgfault` ？

在处理页错误时，我们需要保存当前的寄存器状态，以便在处理完页错误后能够恢复到这个状态，继续执行被中断的程序。这个过程涉及到底层的硬件操作，需要直接操作寄存器，这是 C 语言无法做到的，因为 C 语言是一种高级语言，它的设计目标是让程序员能够编写与硬件无关的代码。而汇编语言是一种低级语言，它可以直接操作硬件，包括寄存器。

因此，我们需要使用汇编语言来编写`_pgfault_upcall`函数。这个函数的工作是保存当前的寄存器状态，然后调用 C 语言编写的`pgfault`函数。`pgfault`函数的工作是检查错误的类型，如果是写入一个只读的页，那么就分配一个新的页，将旧页的内容复制到新页，然后将新页映射到旧页的地址，这样就实现了写时复制（Copy-On-Write）。这部分工作可以用 C 语言来完成，因为它不涉及到底层的硬件操作。

#### 页面错误处理流程

总结一下，当 COW Fork 创建出来的进程试图修改父子进程共享的某个内存页时会触发一个页面错误。接下来处理页面错误，如果页面错误来自内核直接 panic ，如果来自用户态继续执行。随后在异常栈上申请一块空间，将当前寄存器的临时信息保存到这里，当然还存在递归的情形。然后切换到 \_pgfault_handler 进一步处理。

\_pgfault_handler 本质上是进程结构体中的一个回掉函数，通过一个系统调用来注册，这个回掉函数是自定义的。即调用`sys_env_set_pgfault_upcall`函数时设置的：

```c
sys_env_set_pgfault_upcall(envid, _pgfault_upcall);
```

这行代码告诉内核，当发生页错误时，应该跳转到`_pgfault_upcall`函数开始执行。这行代码位于 fork 的实现中。

下面是这个系统调用的具体实现细节：

```c
static int
sys_env_set_pgfault_upcall(envid_t envid, void *func)
{
	struct Env *env;
	int ret;
	// 调用 envid2env 函数，将进程 ID 转换为 Env 结构体指针
	// 如果转换失败（返回值小于0），则返回错误码
	if ((ret = envid2env(envid, &env, 1)) < 0) {
		return ret;
	}
	// 将 func 赋值给 env 的 env_pgfault_upcall 成员
	// env_pgfault_upcall 用于存储页面错误处理函数的地址
	env->env_pgfault_upcall = func;
	// 如果以上操作都成功，那么返回 0
	return 0;
}
```

简单来说上面的代码根据进程 id 获取对应进程的结构体，然后将页面错误处理函数 func “注册”到 进程的字段 env_pgfault_upcall 上，这样，当进程出现页面错误后会调用该字段上的函数来处理页面错误。

在 COW Fork 中是将 \_pgfault_upcall “注册”到了 env_pgfault_upcall 字段上，当出现页面错误后会跳转到 \_pgfault_upcall 上。

#### pgfault 实现细节

\_pgfault_upcall 的主要逻辑是当发生页错误时，保存当前的状态，调用页错误处理程序 \_pgfault_handler(pgfault) ，然后恢复到错误发生时的状态并重新执行导致错误的指令。

`_pgfault_upcall`函数的代码在`lib/pfentry.S`文件中：

```
.text
.globl _pgfault_upcall
_pgfault_upcall:
	// 调用C语言的页错误处理程序
	// 将栈指针%esp压入栈中，作为函数参数，指向UTrapframe
	pushl %esp
	// 将全局变量_pgfault_handler的值加载到%eax寄存器中
	movl _pgfault_handler, %eax
	// 调用%eax寄存器中的函数（页错误处理程序）
	call *%eax
	// 将栈指针%esp增加4，弹出函数参数

	addl $4, %esp
```

这段代码首先将当前的栈指针（%esp）压入栈中，然后将`_pgfault_handler`的值（也就是`pgfault`函数的地址）加载到%eax 寄存器中，然后调用`call *%eax`，这条指令会将当前的程序计数器压入栈中，然后跳转到%eax 寄存器中的地址（也就是`pgfault`函数）开始执行。

这样，当发生页错误时，CPU 就会自动跳转到`_pgfault_upcall`函数，然后`_pgfault_upcall`函数再跳转到`pgfault`函数，这就完成了从硬件异常到用户级别页错误处理函数的跳转。

pgfault 是一个自定义的页错误处理函数，用于处理发生在用户级别的页错误。当发生页错误时，如果错误的访问是写操作，并且访问的页面是写时复制（Copy-On-Write，COW）的，那么这个函数就会被调用。

```c
// 自定义页错误处理函数 - 如果错误的页面是写时复制（Copy-On-Write）的，
// 则映射我们自己的私有可写副本。
static void
pgfault(struct UTrapframe *utf)
{
    // 获取错误的虚拟地址和错误代码
	void *addr = (void *) utf->utf_fault_va;
	uint32_t err = utf->utf_err;
	int r;

	// 检查错误的访问是否是写操作，并且是否是对写时复制的页面的访问。如果不是，触发panic。
	addr = ROUNDDOWN(addr, PGSIZE);

	// 检查错误的访问是否是写操作，并且是否是对写时复制的页面的访问
	if (!(err & FEC_WR) || !(uvpt[PGNUM(addr)] & PTE_COW)) {
		// 不是写操作或者不是对写时复制的页面的访问，触发panic
		panic("pgfault(): not COW");
	}

	// 分配一个新的页面，将其映射到临时位置（PFTEMP），
	// 将旧页面的数据复制到新页面，然后将新页面移动到旧页面的地址。
	// 提示：你应该进行三次系统调用。

	// 分配一个临时页面并将其映射到PFTEMP
	if ((r = sys_page_map(0, PFTEMP, 0, PFTEMP, PTE_U | PTE_P)) < 0)
		panic("sys_page_map: %e", r);

	// 在错误的地址处分配一个新的页面，并赋予写权限
	if ((r = sys_page_alloc(0, addr, PTE_P | PTE_U | PTE_W)) < 0)
		panic("sys_page_alloc: %e", r);

	// 将旧页面的数据复制到新页面
	memmove(addr, PFTEMP, PGSIZE);

	// 取消映射临时页面
	if ((r = sys_page_unmap(0, PFTEMP)) < 0)
		panic("sys_page_unmap: %e", r);
}
```

函数的主要工作流程如下：

首先，它会检查错误的访问是否是写操作，并且是否是对写时复制的页面的访问。如果不是，那么就会触发 panic。

随后当一个进程试图写入一个标记为 COW 的页面时，操作系统不会直接让它写入，而是会复制一个新的页面，让进程写入新的页面，这样就不会影响到其他可能正在使用这个页面的进程。

1. 使用`sys_page_map`函数在 PFTEMP 地址处映射一个新的页面。这个页面是临时的，用于存储旧页面的数据。如果映射失败，会触发 panic。

```cpp
if ((r = sys_page_map(0, PFTEMP, 0, PFTEMP, PTE_U | PTE_P)) < 0)
	panic("sys_page_map: %e", r);
```

具体来说，当发生写时复制的页错误时，处理流程如下：

1. 分配一个新的页面，并将其映射到临时位置 PFTEMP。
2. 将旧页面（即发生错误的页面）的数据复制到 PFTEMP 所映射的新页面。
3. 将新页面从 PFTEMP 重新映射到旧页面的地址，这样新页面就替换了旧页面，且包含了旧页面的所有数据。
4. 取消 PFTEMP 的映射。

这样，我们就实现了写时复制的功能，即在子进程试图写入共享页面时，不是直接修改共享页面，而是创建一个新的页面，将共享页面的数据复制过去，然后让子进程写入这个新页面。这样既保护了父进程的数据，又允许子进程进行写操作。

### \_pgfault_upcall

处理完虚拟内存之后，接下来从 pgfault 返回，随后继续执行 \_pgfault_upcall 的后续内容。因为已经处理完映射了，接下来需要重新执行之前导致页面错误的指令，所以需要之前保留在异常栈上的信息复制到正常栈上，以便重新执行出错的指令。

接下来执行下面的代码，这段代码是在处理页错误后恢复中断发生时的状态，并返回到导致页错误的指令处继续执行。

```
	// 恢复中断发生时的寄存器状态
	// 将栈指针%esp增加8，跳过utf_fault_va和utf_err
	// 因为在页错误处理程序中，我们并不需要这两个值。
	addl $8, %esp

	// 将中断发生时的栈指针的值加载到%eax寄存器中
	// 以便在后面将中断发生时的指令指针的值存储到原来的栈中
	movl 40(%esp), %eax

	// 将中断发生时的指令指针的值加载到%ecx寄存器中
	// 以便在后面将这个值存储到原来的栈中
	movl 32(%esp), %ecx

	// 将中断发生时的指令指针的值存储到原来的栈中
	// 这是为了在返回到中断发生时的代码位置时，
	// 能够正确地恢复指令指针的值
	movl %ecx, -4(%eax)

	// 恢复所有的通用寄存器到中断发生时的状态
	popal

	// 将栈指针%esp增加4，跳过eip
	addl $4, %esp

	// 从栈中恢复eflags，此后不能再使用任何可能修改eflags的算术操作
	popfl
	// 恢复栈指针%esp的值
	popl %esp
	// 调整栈指针的值，因为之前压入了eip的值但是没有减少esp的值
	lea -4(%esp), %esp
	// 返回，以重新执行导致页错误的指令
	ret
```

### 总结

继续总结，当 COW Fork 创建出来的进程试图修改父子进程共享的某个内存页时会触发一个页面错误。接下来处理页面错误，如果页面错误来自内核直接 panic ，如果来自用户态继续执行。随后在异常栈上申请一块空间，将当前寄存器的临时信息保存到这里，当然还存在递归的情形。然后切换到 \_pgfault_handler 进一步处理。

在 \_pgfault_handler 会跳转到自定义的 pgfault 处理映射关系。随后将堆栈信息从异常栈复制出来恢复正常。然后重新执行导致页面错误的指令。因为此时已经设置了新的页面，所以不会出现页面错误。
