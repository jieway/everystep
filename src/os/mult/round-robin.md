循环调度（Round-Robin Scheduling）是一种计算机操作系统中常用的进程或任务调度算法。在这种调度算法中，每个进程被赋予一个固定的时间片（也称为量子），在这个时间片内，进程有权利使用 CPU。如果进程在其分配的时间片内没有完成，那么系统将会剥夺其对 CPU 的使用权，并将其放回就绪队列等待下一次的调度。

循环调度算法的主要优点是公平性和简单性。每个进程都有相等的机会获得 CPU 时间，不会出现某个进程长时间得不到调度的情况。同时，这种算法的实现也相对简单。

### 循环调度的例子

下面是一个简单的例子来说明循环调度的工作原理：

假设我们有三个进程：P1、P2 和 P3，它们的执行时间分别为 20ms、10ms 和 30ms。我们设置时间片为 10ms。

1. 首先，调度器选择 P1 运行，P1 运行 10ms 后，时间片用完，P1 被放回就绪队列，剩余执行时间为 10ms。
2. 接着，调度器选择 P2 运行，P2 运行 10ms 后，任务完成，从就绪队列中移除。
3. 然后，调度器选择 P3 运行，P3 运行 10ms 后，时间片用完，P3 被放回就绪队列，剩余执行时间为 20ms。
4. 此时，就绪队列中有 P1 和 P3，调度器再次选择 P1 运行，P1 运行 10ms 后，任务完成，从就绪队列中移除。
5. 最后，调度器选择 P3 运行，P3 运行 20ms 后，任务完成，从就绪队列中移除。

以上就是循环调度的基本工作原理。在实际的操作系统中，循环调度可能会结合优先级、I/O 等待等因素进行更复杂的调度。

### 循环调度的实现细节

下面的代码是一个简单的轮询调度算法的实现，用于在多个用户进程之间进行调度。

```c
void
sched_yield(void)
{
	struct Env *idle;

	int start = (curenv == NULL) ? 0 : ENVX(curenv->env_id) + 1;
	int i;
	for (i = 0; i < NENV; i++) {
		int j = (i + start) % NENV;
		if (envs[j].env_status == ENV_RUNNABLE) {
			env_run(&envs[j]);
		}
	}

	if (curenv != NULL && curenv->env_status == ENV_RUNNING) {
		env_run(curenv);
	}

	// sched_halt never returns
	sched_halt();
}
```

首先，定义了一个 `start` 变量，它表示开始搜索可运行进程的位置。如果当前没有运行的进程（`curenv == NULL`），那么从 `envs` 数组的开始位置搜索；否则，从当前进程的下一个位置开始搜索。这是为了保证所有的进程都有公平的机会被调度到，而不是总是从同一个位置开始搜索。

然后，进行一个循环，遍历 `envs` 数组。在每次循环中，计算出当前要检查的进程的索引 `j`，这是通过 `(i + start) % NENV` 来实现的，保证了索引总是在 `0` 到 `NENV-1` 之间，实现了环形的搜索。如果找到一个状态为 `ENV_RUNNABLE` 的进程，那么就调用 `env_run(&envs[j])` 切换到这个进程并运行它。

如果遍历完 `envs` 数组都没有找到可运行的进程，但是当前进程的状态仍然是 `ENV_RUNNING`，那么就继续运行当前进程。这是为了保证如果没有其他可运行的进程，当前进程可以继续运行，不会浪费 CPU 的时间。

最后，如果没有任何可运行的进程，那么就调用 `sched_halt()` 让 CPU 进入停机状态。这是为了在没有工作可做的时候，让 CPU 进入低功耗的状态，节省能源。

这段代码的目的是实现一个公平、简单的进程调度算法。通过轮询的方式，保证了每个进程都有公平的机会被调度到。同时，代码的实现也相对简单，易于理解和维护。

### 如何实现进程切换？

下面这段代码是在操作系统中进行进程切换的函数，函数名为`env_run`，接收一个`Env`类型的参数`e`，表示要切换到的进程。

```c
void
env_run(struct Env *e)
{
	if (curenv && curenv->env_status == ENV_RUNNING) {
		curenv->env_status = ENV_RUNNABLE;
	}

	curenv = e;
	curenv->env_status = ENV_RUNNING;
	curenv->env_runs++;
	lcr3(PADDR(curenv->env_pgdir));
	unlock_kernel();
	env_pop_tf(&curenv->env_tf);
}
```

首先，如果当前进程（`curenv`）存在并且其状态为运行（`ENV_RUNNING`），那么将其状态设置为可运行（`ENV_RUNNABLE`）。这是因为我们即将切换到新的进程，所以当前进程需要暂停运行，等待下一次调度。

然后，将`curenv`设置为新的进程`e`，并将其状态设置为运行（`ENV_RUNNING`）。这是因为我们即将开始执行新进程的代码，所以需要将其状态设置为运行。

接着，更新新进程的运行次数（`env_runs`）。这是为了统计进程的运行次数，可以用于调度算法，例如优先级调度。

然后，使用`lcr3`函数切换到新进程的地址空间。这是因为每个进程都有自己的虚拟地址空间，所以在切换进程时，需要切换到新进程的地址空间。

最后，使用`env_pop_tf`函数恢复新进程的寄存器状态，并进入用户模式开始执行新进程。`env_pop_tf`函数会将进程的`Trapframe`结构中保存的寄存器状态加载到对应的寄存器中，然后使用`iret`指令返回到用户模式，开始执行新进程的代码。这一步是必要的，因为每个进程都有自己的寄存器状态，所以在切换进程时，必须恢复新进程的寄存器状态。

总的来说，这段代码的目的是实现进程切换，即从当前进程切换到新的进程，并开始执行新进程的代码。这是操作系统进行进程调度的关键步骤。

### 执行完 iret 后会跳转到哪里？

切换新进程之后会执行`env_pop_tf`函数恢复新进程的寄存器状态，并进入用户模式开始执行新进程。

```c
void
env_pop_tf(struct Trapframe *tf)
{
	curenv->env_cpunum = cpunum();

	asm volatile(
		"\tmovl %0,%%esp\n"
		"\tpopal\n"
		"\tpopl %%es\n"
		"\tpopl %%ds\n"
		"\taddl $0x8,%%esp\n" /* skip tf_trapno and tf_errcode */
		"\tiret\n"
		: : "g" (tf) : "memory");
	panic("iret failed");  /* mostly to placate the compiler */
}
```

执行`iret`指令后，CPU 会从栈中弹出`eip`、`cs`和`eflags`寄存器的值，然后跳转到`eip`指定的地址开始执行代码。这个地址就是环境的入口点，也就是用户程序的入口函数。具体的函数取决于你在加载 ELF 文件并设置环境时，将哪个函数的地址设置为了环境的入口点。在代码中，这个入口点是通过`e->env_tf.tf_eip = ELFHDR->e_entry;`这行代码设置的，其中`ELFHDR->e_entry`是从 ELF 文件头中读取的入口地址。

### 如何实现 CPU 停机？

下面这段代码是 `sched_halt` 函数的实现，它的作用是在没有可运行的进程时，让当前的 CPU 进入停机状态。

```c
void
sched_halt(void)
{
	int i;
	for (i = 0; i < NENV; i++) {
		if ((envs[i].env_status == ENV_RUNNABLE ||
		     envs[i].env_status == ENV_RUNNING ||
		     envs[i].env_status == ENV_DYING))
			break;
	}

	if (i == NENV) {
		cprintf("No runnable environments in the system!\n");
		while (1)
			monitor(NULL);
	}

	curenv = NULL;
	lcr3(PADDR(kern_pgdir));
	xchg(&thiscpu->cpu_status, CPU_HALTED);

	unlock_kernel();

	asm volatile (
		"movl $0, %%ebp\n"
		"movl %0, %%esp\n"
		"pushl $0\n"
		"pushl $0\n"
		"sti\n"
		"hlt\n"
		"1:\n"
		"jmp 1b\n"
	: : "a" (thiscpu->cpu_ts.ts_esp0));
}
```

首先，函数通过一个循环检查所有的进程，看是否有任何可运行的进程。如果所有的进程都不可运行（即它们的状态不是 `ENV_RUNNABLE`、`ENV_RUNNING` 或 `ENV_DYING`），那么就打印一条消息，并进入内核监视器。这是为了在调试和测试时，如果系统中没有可运行的进程，可以方便地进入内核监视器进行调试。

然后，函数将 `curenv` 设置为 `NULL`，表示当前没有进程在运行。并调用 `lcr3` 函数将页目录切换到内核的页目录。这是因为在没有进程运行时，我们应该使用内核的页目录，而不是任何特定进程的页目录。

接着，函数将当前 CPU 的状态设置为 `CPU_HALTED`，表示当前 CPU 已经进入停机状态。这样，当定时器中断发生时，我们知道应该重新获取大内核锁。然后，函数调用 `unlock_kernel` 释放大内核锁。这是因为在 CPU 进入停机状态时，我们应该释放大内核锁，以允许其他 CPU 进入内核。

最后，函数通过一段内联汇编代码将栈指针重置，启用中断，然后让 CPU 进入停机状态。在这段代码中，`movl $0, %%ebp` 和 `movl %0, %%esp` 将栈指针重置，`pushl $0` 将 0 压入栈两次，`sti` 启用中断，`hlt` 让 CPU 进入停机状态，`jmp 1b` 是一个无限循环，保证 CPU 一直停机，直到有中断发生。

这段代码的目的是在没有可运行的进程时，让 CPU 进入停机状态。同时，它也处理了在 CPU 停机时需要进行的一些清理工作，例如切换页目录、释放大内核锁等。

### 什么时候会执行进程调度？

在进程调度的过程中，进入内核态通常发生在以下几种情况：

1. 系统调用：当用户进程主动发起系统调用时，会触发一个软件中断，使得 CPU 从用户态切换到内核态，开始执行内核代码。

2. 异常和硬件中断：当发生异常或础件中断时，CPU 会自动从用户态切换到内核态，开始执行内核的中断处理程序。

在代码中，进程调度的过程是在`sched_yield`函数中实现的。当当前进程主动放弃 CPU 使用权，或者当前进程的时间片用完，内核会调用`sched_yield`函数来选择一个新的进程运行。在这个过程中，CPU 已经处于内核态。

在代码中，`sched_yield`函数是在`mp_main`函数中被调用的。`mp_main`函数是在 AP（Application Processor，非引导处理器）启动时执行的代码。这个函数在`kern/init.c`文件中定义。

```c
void
mp_main(void)
{
	lcr3(PADDR(kern_pgdir));
	cprintf("SMP: CPU %d starting\n", cpunum());

	lapic_init();
	env_init_percpu();
	trap_init_percpu();
	xchg(&thiscpu->cpu_status, CPU_STARTED);

	lock_kernel();
	sched_yield();
}
```

在`mp_main`函数中，首先调用`lcr3`函数切换到内核的页表，然后初始化 LAPIC，初始化每个 CPU 的环境，初始化每个 CPU 的陷阱处理程序，然后将 CPU 的状态设置为已启动。这些操作都是在内核态下完成的。

然后，调用`lock_kernel`函数获取内核锁。这个函数也是在内核态下执行的。获取内核锁后，就可以安全地调用`sched_yield`函数进行进程调度了。

所以，调用`sched_yield`函数之前，CPU 已经处于内核态。这是通过在 AP 启动时执行的`mp_main`函数实现的。
