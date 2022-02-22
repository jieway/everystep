# Lab: page tables

https://pdos.csail.mit.edu/6.828/2020/labs/pgtbl.html

探索页表，并修改它们以简化从用户空间复制数据到内核空间的功能。需要提前阅读 xv6 书第三章。

`kern/memlayout.h` ，它捕捉了内存的布局。

`kern/vm.c` 它包含了大部分虚拟内存（VM）代码。

`kernel/kalloc.c` 它包含分配和释放物理内存的代码。

切换到 pgtbl 分支

  $ git checkout pgtbl
  $ make clean

## Print a page table (easy)

源码被分成了多个文件，在 defs.h(kernel/defs.h) 中定义模块间的接口。

跟着 hint 走，看明白 freewalk 函数稍微改动即可。

`(pte & (PTE_R|PTE_W|PTE_X)) == 0` 表示非叶子节点。

具体代码变动：[PASS Lab3 ex1](https://github.com/weijiew/6.S081-2020/commit/6632a87f01b651984a54bd04f20cc63a99ca1b3f)

  $ make qemu-gdb
  pte printout: OK (6.9s)
      (Old xv6.out.pteprint failure log removed)
  == Test answers-pgtbl.txt == answers-pgtbl.txt: FAIL
      Cannot read answers-pgtbl.txt
  == Test count copyin ==

## A kernel page table per process (hard)

在内核中，xv6 有一个单独页表，这个页表是直接映射，例如虚拟地址 x 就是物理地址 x 。

Xv6 中的每一个用户进程有一个单独的地址空间，其中包含了进程内存的映射，虚拟地址从 0 开始。这些地址在内存中无效，因为内存页表不包含这些映射。所以用户进程中的指针传递给内核时需要先将指针转为物理地址。例如，传递给 write() 的缓冲区指针。

本节和下一节的目标是允许内核直接解除对用户指针的定义。

你的第一项工作是修改内核，使每个进程在内核中执行时使用自己的内核页表副本。

> 目前每个进程都有自己的用户页表，但是只有一个内核页表。接下来的任务是修改内核，使每个进程都有自己独立的内核页表。

修改 struct proc，为每个进程维护一个内核页表，并修改调度程序，在切换进程时切换内核页表。

对于这一步，每个进程的内核页表应该与现有的全局内核页表相同。

如果 usertests 运行正常，你就能通过这部分的实验。

阅读本作业开始时提到的书中章节和代码；在了解了虚拟内存的工作原理后，正确修改虚拟内存代码会更容易。

页表设置中的错误可能导致因映射缺失而产生陷阱，可能导致加载和存储影响物理内存的意外页面，并可能导致从不正确的内存页面执行指令。

Some hints:

在 struct proc 中增加一个字段，用于进程的内核页表。

> proc 是一个结构体，其中包含了进程的所有状态信息。

A reasonable way to produce a kernel page table for a new process is to implement a modified version of kvminit that makes a new page table instead of modifying kernel_pagetable. You'll want to call this function from allocproc.

为一个新进程生成内核页表的合理方法是实现一个修改版的 kvminit，它可以生成一个新的页表而不是修改 kernel_pagetable 。你想从 allocproc 中调用这个函数。

> kvminit 这个调用发生在 xv6 在 RISC-V 启用分页之前，所以地址直接指向物理内存。Kvminit 首先分配一页物理内存来存放根页表页。然后调用 kvmmap 将内核所需要的硬件资源映射到物理地址。这些资源包括内核的指令和数据，KERNBASE 到 PHYSTOP（0x86400000）的物理内存，以及实际上是设备的内存范围。
> kvmmap (kernel/vm.c:118) 调用 mappages (kernel/vm.c:149)，它将一个虚拟地址范围映射到一个物理地址范围。它将范围内地址分割成多页（忽略余数），每次映射一页的顶端地址。对于每个要映射的虚拟地址（页的顶端地址），mapages 调用 walk 找到该地址的最后一级 PTE 的地址。然后，它配置 PTE，使其持有相关的物理页号、所需的权限(PTE_W、PTE_X 和/或 PTE_R)，以及 PTE_V 来标记 PTE 为有效(kernel/vm.c:161)。

Make sure that each process's kernel page table has a mapping for that process's kernel stack. 

确保每个进程的内核页表都有对该进程的内核堆栈的映射。

In unmodified xv6, all the kernel stacks are set up in procinit. You will need to move some or all of this functionality to allocproc.

在未修改的xv6中，所有的内核栈都是在procinit中设置的。你需要把这些功能的一部分或全部转移到 allocproc。

Modify scheduler() to load the process's kernel page table into the core's satp register (see kvminithart for inspiration). Don't forget to call sfence_vma() after calling w_satp().

修改scheduler()，将进程的内核页表加载到内核的satp寄存器中（见kvminithart的启发）。不要忘记在调用w_satp()后调用sfence_vma()。

scheduler() should use kernel_pagetable when no process is running. Free a process's kernel page table in freeproc.

scheduler()应该在没有进程运行时使用kernel_pagetable。在 freeproc 中释放一个进程的内核页表。

You'll need a way to free a page table without also freeing the leaf physical memory pages.

你需要一种方法来释放一个页表，而不同时释放物理内存页。

vmprint may come in handy to debug page tables. It's OK to modify xv6 functions or add new functions; you'll probably need to do this in at least kernel/vm.c and kernel/proc.c. (But, don't modify kernel/vmcopyin.c, kernel/stats.c, user/usertests.c, and user/stats.c.)

vmprint在调试页表时可能会派上用场。修改xv6函数或添加新函数是可以的；你可能至少需要在kernel/vm.c和kernel/proc.c中这样做（但是，不要修改kernel/vmcopyin.c、kernel/stats.c、user/usertests.c和user/stats.c）。

A missing page table mapping will likely cause the kernel to encounter a page fault. 

一个缺失的页表映射将可能导致内核遇到一个页故障。

It will print an error that includes sepc=0x00000000XXXXXXXX. You can find out where the fault occurred by searching for XXXXXXXX in kernel/kernel.asm.

它将打印一个包括sepc=0x00000000XXXXXX的错误。你可以通过搜索kernel/kernel.asm中的XXXXXXX来找出故障发生的位置。

## Simplify copyin/copyinstr (hard)

The kernel's copyin function reads memory pointed to by user pointers. 

内核的copyin函数会读取用户指针指向的内存。

It does this by translating them to physical addresses, which the kernel can directly dereference. 

它是通过将它们翻译成物理地址来实现的，内核可以直接解读这些地址。

It performs this translation by walking the process page-table in software. 

它通过在软件中行走进程页表来执行这种翻译。

Your job in this part of the lab is to add user mappings to each process's kernel page table (created in the previous section) that allow copyin (and the related string function copyinstr) to directly dereference user pointers.

你在这一部分的工作是在每个进程的内核页表中添加用户映射（在上一节中创建），允许copyin（以及相关的字符串函数copyinstr）直接解除对用户指针的引用。

Replace the body of copyin in kernel/vm.c with a call to copyin_new (defined in kernel/vmcopyin.c); do the same for copyinstr and copyinstr_new. 

在kernel/vm.c中用调用copyin_new（定义在kernel/vmcopyin.c中）替换copyin的主体；对copyinstr和copyinstr_new也做同样的处理。

Add mappings for user addresses to each process's kernel page table so that copyin_new and copyinstr_new work. 

在每个进程的内核页表中添加用户地址的映射，以便copyin_new和copyinstr_new工作。

You pass this assignment if usertests runs correctly and all the make grade tests pass.

如果usertests正确运行，并且所有的使级测试都通过，你就通过了这项作业。

This scheme relies on the user virtual address range not overlapping the range of virtual addresses that the kernel uses for its own instructions and data. 

这个方案依赖于用户的虚拟地址范围不与内核用于其自身指令和数据的虚拟地址范围重叠。

Xv6 uses virtual addresses that start at zero for user address spaces, and luckily the kernel's memory starts at higher addresses. 

Xv6对用户地址空间使用从零开始的虚拟地址，幸运的是，内核的内存从更高的地址开始。

However, this scheme does limit the maximum size of a user process to be less than the kernel's lowest virtual address. 

然而，这个方案确实限制了用户进程的最大尺寸，使其小于内核的最低虚拟地址。

After the kernel has booted, that address is 0xC000000 in xv6, the address of the PLIC registers; see kvminit() in kernel/vm.c, kernel/memlayout.h, and Figure 3-4 in the text. 

内核启动后，该地址为xv6中的0xC000000，即PLIC寄存器的地址；参见kernel/vm.c中的kvminit()，kernel/memlayout.h，以及文中的图3-4。

You'll need to modify xv6 to prevent user processes from growing larger than the PLIC address.

你需要修改xv6以防止用户进程的规模超过PLIC地址。

Some hints:

Replace copyin() with a call to copyin_new first, and make it work, before moving on to copyinstr.

首先用copyin_new的调用代替copyin()，并使其工作，然后再转到copyinstr。

At each point where the kernel changes a process's user mappings, change the process's kernel page table in the same way. Such points include fork(), exec(), and sbrk().

在内核改变进程的用户映射的每个点上，以同样的方式改变进程的内核页表。这些点包括fork(), exec(), 和sbrk().

Don't forget that to include the first process's user page table in its kernel page table in userinit.

不要忘了在userinit中把第一个进程的用户页表纳入它的内核页表。

What permissions do the PTEs for user addresses need in a process's kernel page table? (A page with PTE_U set cannot be accessed in kernel mode.)

在进程的内核页表中，用户地址的PTEs需要什么权限？(设置了PTE_U的页在内核模式下不能被访问)。

Don't forget about the above-mentioned PLIC limit.

不要忘记上面提到的PLIC限制。

Linux uses a technique similar to what you have implemented. 

Linux使用了一种与你所实现的类似的技术。

Until a few years ago many kernels used the same per-process page table in both user and kernel space, with mappings for both user and kernel addresses, to avoid having to switch page tables when switching between user and kernel space. However, that setup allowed side-channel attacks such as Meltdown and Spectre.

直到几年前，许多内核在用户和内核空间都使用相同的每进程页表，并对用户和内核地址进行映射，以避免在用户和内核空间之间切换时必须切换页表。然而，这种设置允许诸如Meltdown和Spectre这样的侧通道攻击。

Explain why the third test srcva + len < srcva is necessary in copyin_new(): give values for srcva and len for which the first two test fail (i.e., they will not cause to return -1) but for which the third one is true (resulting in returning -1).


解释为什么第三个测试srcva + len < srcva在copyin_new()中是必要的：给出srcva和len的值，前两个测试失败（即不会导致返回-1），但第三个测试为真（导致返回1）。