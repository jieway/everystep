这篇文章结合具体的代码讲解操作系统 IPC(Inter-Process Communication) 通信机制的实现细节。

### 什么是 IPC ？

IPC，全称为进程间通信（Inter-Process Communication），是指在不同的进程之间传递和共享信息的机制。这种机制允许运行在同一操作系统上的不同进程之间进行数据交换。常见的 IPC 机制包括管道（Pipe）、消息队列（Message Queue）、信号量（Semaphore）、共享内存（Shared Memory）、套接字（Socket）等。这些机制都有各自的特点和适用场景，可以根据具体的需求进行选择。

### 为什么需要 IPC ，什么是 IPC ？

操作系统需要进程间通信（IPC）的原因主要有以下几点：

1. 数据共享：多个进程可能需要访问和操作同一份数据，通过 IPC，这些进程可以共享数据，而无需复制数据。

2. 速度：在某些情况下，使用 IPC 传递数据比其他方法（如通过文件系统）更快。

3. 模块化：通过 IPC，可以将一个大的任务分解为多个小的、独立的进程，每个进程负责一部分任务。这样可以提高代码的模块化程度，使得代码更易于理解和维护。

4. 并发：通过 IPC，多个进程可以并行执行，从而提高系统的性能。

5. 资源共享：多个进程可能需要使用同一资源（如打印机、文件等），通过 IPC，这些进程可以协调对资源的使用，避免资源冲突。

6. 同步和协调：多个进程在执行过程中可能需要相互协调和同步，通过 IPC，这些进程可以相互发送信号和消息，以达到同步和协调的目的。

### IPC 类型有哪些

操作系统的进程间通信（IPC）主要有以下几种类型：

1. 管道（Pipe）和命名管道（named pipe）：这是最早的 IPC 形式，主要用于有血缘关系的进程间的通信。

2. 消息队列（Message Queue）：消息队列是消息的链表，存放在内核中并由消息队列标识符标识。

3. 共享内存（Shared Memory）：多个进程共享一段能够同时读写的内存区域。

4. 信号量（Semaphore）：主要作为控制多个进程对共享资源的访问。

5. 套接字（Socket）：更为一般的进程间通信机制，可用于不同机器之间的进程间通信。

6. 信号（Signal）：一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。

以上就是操作系统中常见的进程间通信方式。

### JOS 中的 IPC 通信方式

JOS 中的 IPC（Inter-Process Communication，进程间通信）属于消息传递类型。在 JOS 中，进程间通信主要通过`sys_ipc_try_send`和`sys_ipc_recv`两个系统调用来实现。`sys_ipc_try_send`用于发送消息，`sys_ipc_recv`用于接收消息。这种方式下，进程间的通信数据是通过内核进行中转的，发送进程将消息发送给内核，然后接收进程从内核中接收消息。

用户进程可以使用 JOS 的 IPC 机制向彼此发送的"消息"包含两个组成部分：一个 32 位的值，以及可选的一个页面映射。允许进程在消息中传递页面映射提供了一种比单个 32 位整数能容纳的数据更多的有效传输方式，也使得进程能够轻松地设置共享内存安排。

### 如何接收消息？

当一个进程想要接收消息时，它会调用`sys_ipc_recv`系统调用。这个调用会使当前进程进入等待状态，直到它接收到一个消息为止。在这个等待期间，该进程不会被调度运行。

这里有一个重要的概念，那就是任何其他进程都可以向等待接收消息的进程发送消息。这并不限于特定的进程，也不限于与接收进程有父/子关系的进程。这意味着，IPC 的设计允许任何进程之间进行通信，而不仅仅是有特定关系的进程。

### 如何发送消息？

当一个进程想要发送消息时，它会调用`sys_ipc_try_send`系统调用，并提供接收者的进程 id 和要发送的值。

如果指定的接收进程正在等待接收消息（即它已经调用了`sys_ipc_recv`并且还没有接收到一个值），那么`sys_ipc_try_send`会成功地传递消息并返回 0，表示消息发送成功。

如果指定的接收进程并没有在等待接收消息，那么`sys_ipc_try_send`会返回一个错误码`-E_IPC_NOT_RECV`，表示目标进程当前并不期望接收一个值。

在用户空间，有一个库函数`ipc_recv`，它会调用`sys_ipc_recv`，然后在当前进程的`struct Env`中查找关于接收到的值的信息。这个函数的作用是帮助进程接收消息，并处理接收到的消息。

另一个库函数`ipc_send`会负责反复调用`sys_ipc_try_send`，直到消息发送成功。这个函数的作用是帮助进程发送消息，并处理发送消息的结果。

总的来说，这段内容描述的是进程间通信的发送和接收消息的过程，以及如何处理发送和接收消息的结果。

### 页面共享

当一个进程调用`sys_ipc_recv`并提供一个有效的`dstva`参数（低于 UTOP）时，这个进程表示它愿意接收一个页面映射。如果发送进程在调用`sys_ipc_try_send`时发送了一个页面，那么这个页面将会在接收进程的地址空间中的`dstva`处映射。如果接收进程在`dstva`处已经映射了一个页面，那么会被覆盖。

当一个进程以一个有效的`srcva`（低于 UTOP）调用`sys_ipc_try_send`时，它意味着发送者想要发送当前在`srcva`处映射的页面给接收者，权限为`perm`。在成功的 IPC 之后，发送者保留其在地址空间中`srcva`处的页面的原始映射，但接收者也在接收者的地址空间中获得了这个相同物理页面在接收者最初指定的`dstva`处的映射。结果，这个页面在发送者和接收者之间共享。

简而言之就是将 srcva 对应的物理页面映射到 dstva 上。如果发送者或接收者都没有指示应该传输一个页面，那么不会传输页面。在任何 IPC 之后，内核都会将接收者的 Env 结构中的新字段`env_ipc_perm`设置为接收到的页面的权限，如果没有接收到页面，则为零。这是一种保护机制，确保只有在接收者明确表示愿意接收页面，并且发送者明确表示愿意发送页面的情况下，才会进行页面传输。

这样设计的目的是为了实现进程间的内存共享。在许多情况下，进程间需要共享数据，而这些数据可能会存储在内存的页面中。通过这种设计，一个进程可以将其内存中的一个页面发送给另一个进程，而不需要复制页面的内容。这不仅可以节省内存，还可以提高数据传输的效率。

此外，这种设计还提供了一种保护机制，确保只有在接收进程愿意接收页面，并且发送进程愿意发送页面的情况下，才会进行页面传输。这可以防止恶意进程无意义地发送页面，从而干扰其他进程的正常运行。

总的来说，这种设计使得进程间的内存共享变得既高效又安全。

### 实现 sys_ipc_recv

sys_ipc_recv 用于接收进程间通信（IPC）的消息。当一个进程调用这个函数时，它会阻塞并等待接收一个值。这个进程通过设置`env_ipc_recving`和`env_ipc_dstva`字段来记录它希望接收的信息。

`env_ipc_recving`字段表示这个进程正在等待接收一个值，`env_ipc_dstva`字段是一个虚拟地址，表示这个进程愿意接收一个页面的数据，并且这个页面应该映射到这个虚拟地址。

```c
static int
sys_ipc_recv(void *dstva)
{
	// 如果dstva小于UTOP（用户空间的最大地址）并且dstva没有页对齐（即，它不是一个页的开始地址）
	// 那么返回错误码-E_INVAL
	if (dstva < (void *)UTOP && dstva != ROUNDDOWN(dstva, PGSIZE)) {
		return -E_INVAL;
	}
	// 设置当前环境为接收状态，env_ipc_recving字段为1表示当前环境正在等待接收IPC消息
	curenv->env_ipc_recving = 1;
	// 将当前环境的状态设置为不可运行，这样调度器在下一次调度时不会选择这个环境运行
	curenv->env_status = ENV_NOT_RUNNABLE;
	// 设置当前环境期望接收的页面的虚拟地址
	curenv->env_ipc_dstva = dstva;
	// 调用sys_yield()让出CPU，等待其他环境发送IPC消息
	sys_yield();
	// 如果没有错误发生，那么返回0
	return 0;
}
```

如果`dstva`小于`UTOP`，那么这个进程愿意接收一个页面的数据。`dstva`是一个虚拟地址，表示接收的页面应该映射到的位置。

这个函数只有在出错时才会返回，否则它会一直阻塞，直到接收到一个值。如果成功接收到一个值，那么系统调用最终会返回 0。

如果出错，这个函数会返回一个负数。可能的错误包括：如果`dstva`小于`UTOP`但不是页面对齐的，那么会返回`-E_INVAL`错误。

### 实现 sys_ipc_try_send

`sys_ipc_try_send`函数是操作系统中用于进程间通信（IPC）的一部分。它尝试从当前环境（发送者）向由`envid`指定的另一个环境（接收者）发送一个值，以及可选的一块内存页。

```c
static int
sys_ipc_try_send(envid_t envid, uint32_t value, void *srcva, unsigned perm)
{
	struct Env *rcvenv;  // 定义一个 Env 结构体指针 rcvenv
	int ret = envid2env(envid, &rcvenv, 0);  // 将 envid 转换为 Env 结构体指针
	if (ret) return ret;  // 如果转换失败（返回值小于0），则返回错误码
	if (!rcvenv->env_ipc_recving) return -E_IPC_NOT_RECV;  // 如果接收进程不在接收状态，则返回错误码

	if (srcva < (void*)UTOP) {  // 如果虚拟地址 srcva 小于 UTOP
		pte_t *pte;  // 定义页表项指针 pte
		struct PageInfo *pg = page_lookup(curenv->env_pgdir, srcva, &pte);  // 在当前进程的页目录中查找虚拟地址 srcva 对应的物理页

		if (srcva != ROUNDDOWN(srcva, PGSIZE)) return -E_INVAL;  // 如果虚拟地址 srcva 不是页对齐的，则返回错误码
		if ((*pte & perm) != perm) return -E_INVAL;  // 如果页表项的权限位和 perm 不匹配，则返回错误码
		if (!pg) return -E_INVAL;  // 如果物理页不存在，则返回错误码
		if ((perm & PTE_W) && !(*pte & PTE_W)) return -E_INVAL;  // 如果 perm 中设置了写权限，但页表项中没有写权限，则返回错误码

		if (rcvenv->env_ipc_dstva < (void*)UTOP) {  // 如果接收进程的接收虚拟地址小于 UTOP
			ret = page_insert(rcvenv->env_pgdir, pg, rcvenv->env_ipc_dstva, perm);  // 在接收进程的页目录中插入一个新的页表项，建立虚拟地址和物理页的映射关系
			if (ret) return ret;  // 如果插入失败，则返回错误码
			rcvenv->env_ipc_perm = perm;  // 设置接收进程的接收权限
		}
	}
	rcvenv->env_ipc_recving = 0;  // 标记接收进程为非接收状态
	rcvenv->env_ipc_from = curenv->env_id;  // 设置接收进程的发送进程 ID
	rcvenv->env_ipc_value = value;  // 设置接收进程的接收值
	rcvenv->env_status = ENV_RUNNABLE;  // 设置接收进程的状态为可运行
	rcvenv->env_tf.tf_regs.reg_eax = 0;  // 设置接收进程的返回值为0
	return 0;  // 返回0，表示发送成功
}
```

函数首先将`envid`转换为一个环境结构体指针，如果转换失败则返回错误。然后检查接收环境是否准备好接收 IPC，如果没有则返回错误。

如果`srcva`小于`UTOP`，表示发送者希望发送一块内存页。此时，函数会检查`srcva`是否页对齐，权限是否合法，以及`srcva`是否在发送者的地址空间中映射，如果发送者希望授予写权限，那么该页是否可写。如果任何检查失败，函数返回错误。

如果接收环境准备好接收一块内存页（即`env_ipc_dstva`小于`UTOP`），函数会将该页插入到接收环境的页目录中，并赋予指定的权限。如果插入失败，函数返回错误。

最后，函数更新接收环境的 IPC 字段，并将其标记为可运行。它将`env_ipc_recving`设置为 0 以阻止未来的发送，将`env_ipc_from`设置为发送者的`envid`，将`env_ipc_value`设置为`value`参数，如果传输了页，则将`env_ipc_perm`设置为`perm`。它还将暂停的`sys_ipc_recv`系统调用在接收者中的返回值设置为 0。

函数在成功时返回 0，在失败时返回负的错误代码。

### ipc_recv

在用户空间，有一个库函数`ipc_recv`，它会调用`sys_ipc_recv`，然后在当前进程的`struct Env`中查找关于接收到的值的信息。这个函数的作用是帮助进程接收消息，并处理接收到的消息。

```c
int32_t
ipc_recv(envid_t *from_env_store, void *pg, int *perm_store)
{
	// 如果 pg 为空，将 pg 设置为 (void *)-1，表示没有页面需要映射
	if (pg == NULL) {
		pg = (void *)-1;
	}

	// 调用系统调用 sys_ipc_recv，尝试接收 IPC 消息
	int r = sys_ipc_recv(pg);

	// 如果系统调用返回值小于0，表示系统调用失败
	if (r < 0) {
		// 如果 from_env_store 非空，将其值设置为0
		if (from_env_store) *from_env_store = 0;
		// 如果 perm_store 非空，将其值设置为0
		if (perm_store) *perm_store = 0;
		// 返回系统调用的错误码
		return r;
	}

	// 如果系统调用成功，且 from_env_store 非空，将发送者的进程 ID 存储在 *from_env_store 中
	if (from_env_store)
		*from_env_store = thisenv->env_ipc_from;

	// 如果系统调用成功，且 perm_store 非空，将发送者的页面权限存储在 *perm_store 中
	if (perm_store)
		*perm_store = thisenv->env_ipc_perm;

	// 返回发送者发送的值
	return thisenv->env_ipc_value;
}
```

`ipc_recv`函数是用于接收进程间通信（IPC）的值，并将其返回。如果`pg`非空，那么发送者发送的任何页面都将映射到该地址。如果`from_env_store`非空，那么将 IPC 发送者的`envid`存储在`*from_env_store`中。如果`perm_store`非空，那么将 IPC 发送者的页面权限存储在`*perm_store`中。如果系统调用失败，那么在`*fromenv`和`*perm`中存储 0，并返回错误。否则，返回发送者发送的值。

如果`pg`为空，那么传递给`sys_ipc_recv`一个它能理解为“无页面”的值。这里选择了`(void *)-1`，因为 0 是一个完全有效的映射页面的地方。

首先，函数检查`pg`是否为空，如果为空，将其设置为`(void *)-1`。然后，调用`sys_ipc_recv`函数，将`pg`作为参数。如果`sys_ipc_recv`返回值小于 0，表示系统调用失败，此时，如果`from_env_store`和`perm_store`非空，将它们设置为 0，并返回错误码。

如果系统调用成功，那么将`thisenv->env_ipc_from`的值存储在`*from_env_store`中，将`thisenv->env_ipc_perm`的值存储在`*perm_store`中，最后返回`thisenv->env_ipc_value`。

### ipc_send

在用户空间，另一个库函数`ipc_send`会负责反复调用`sys_ipc_try_send`，直到消息发送成功。这个函数的作用是帮助进程发送消息，并处理发送消息的结果。

```c
void
ipc_send(envid_t to_env, uint32_t val, void *pg, int perm)
{
	// 如果 pg 为空，将 pg 设置为 (void *)-1，表示没有页面需要发送
	if (pg == NULL) {
		pg = (void *)-1;
	}

	int r;
	// 循环尝试发送 IPC 消息，直到成功
	while(1) {
		// 调用系统调用 sys_ipc_try_send，尝试发送 IPC 消息
		r = sys_ipc_try_send(to_env, val, pg, perm);
		// 如果返回值为0，表示发送成功，函数返回
		if (r == 0) {
			return;
		}
		// 如果返回值为 -E_IPC_NOT_RECV，表示接收进程还没有准备好接收消息
		// 此时，调用 sys_yield 让出 CPU，等待下一次调度
		else if (r == -E_IPC_NOT_RECV) {
			sys_yield();
		}
		// 如果返回其他错误码，表示发送过程中出现错误，调用 panic 函数打印错误信息并终止程序
		else {
			panic("ipc_send():%e", r);
		}
	}
}
```

`ipc_send`函数的主要目的是通过进程间通信（IPC）向指定的环境发送一个值。如果`pg`参数非空，那么它指向的页面将会被发送。函数首先检查`pg`是否为空，如果为空，将其设置为`(void *)-1`，表示没有页面需要发送。

函数进入一个无限循环，尝试调用`sys_ipc_try_send`系统调用来发送 IPC 消息。如果系统调用返回 0，表示消息发送成功，函数就会返回。如果系统调用返回`-E_IPC_NOT_RECV`，表示接收进程还没有准备好接收消息，此时函数会调用`sys_yield`让出 CPU，等待下一次调度。如果系统调用返回其他错误码，表示发送过程中出现错误，函数就会调用`panic`函数打印错误信息并终止程序。这个过程会一直重复，直到消息成功发送。

### 总结

支持 IPC 实现完毕。通过 IPC 在两个进程之间传递数据或者共享同一个物理页。
