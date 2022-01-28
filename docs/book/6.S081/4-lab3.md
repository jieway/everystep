# Lab: page tables

在这个实验室中，你将探索页表，并修改它们以简化从用户空间复制数据到内核空间的功能。

需要提前阅读 xv6书 第三章

`kern/memlayout.h` ，它捕捉了内存的布局。

`kern/vm.c` 它包含了大部分虚拟内存（VM）代码。

`kernel/kalloc.c` 它包含分配和释放物理内存的代码。

切换到 pgtbl 分支

  $ git checkout pgtbl
  $ make clean
  
## Print a page table (easy)

To help you learn about RISC-V page tables, and perhaps to aid future debugging, your first task is to write a function that prints the contents of a page table.

为了帮助你学习RISC-V页表，也许是为了帮助将来的调试，你的第一个任务是写一个函数，打印页表的内容。

Define a function called vmprint(). It should take a pagetable_t argument, and print that pagetable in the format described below. 

定义一个叫做vmprint()的函数。它应该接受一个pagetable_t参数，并以下面描述的格式打印该pagetable。

Insert if(p->pid==1) vmprint(p->pagetable) in exec.c just before the return argc, to print the first process's page table. 

在exec.c的返回argc之前插入if(p->pid==1) vmprint(p->pagetable)，以打印第一个进程的页表。

You receive full credit for this assignment if you pass the pte printout test of make grade.

如果你通过了pte printout测试的make grade，你将获得这项作业的全部学分。

Now when you start xv6 it should print output like this, describing the page table of the first process at the point when it has just finished exec()ing init:

现在，当你启动xv6时，它应该打印这样的输出，描述第一个进程在刚刚完成exec()ing init时的页面表。

page table 0x0000000087f6e000
..0: pte 0x0000000021fda801 pa 0x0000000087f6a000
.. ..0: pte 0x0000000021fda401 pa 0x0000000087f69000
.. .. ..0: pte 0x0000000021fdac1f pa 0x0000000087f6b000
.. .. ..1: pte 0x0000000021fda00f pa 0x0000000087f68000
.. .. ..2: pte 0x0000000021fd9c1f pa 0x0000000087f67000
..255: pte 0x0000000021fdb401 pa 0x0000000087f6d000
.. ..511: pte 0x0000000021fdb001 pa 0x0000000087f6c000
.. .. ..510: pte 0x0000000021fdd807 pa 0x0000000087f76000
.. .. ..511: pte 0x0000000020001c0b pa 0x0000000080007000
  
The first line displays the argument to vmprint. 

第一行显示vmprint的参数。

After that there is a line for each PTE, including PTEs that refer to page-table pages deeper in the tree. 

之后，每个PTE都有一行，包括引用树中更深的页表页的PTE。

Each PTE line is indented by a number of " .." that indicates its depth in the tree. 

每个PTE行的缩进都有一个"... "的数字，表示它在树中的深度。

Each PTE line shows the PTE index in its page-table page, the pte bits, and the physical address extracted from the PTE. 

每个PTE行显示其页表页中的PTE索引、PTE位，以及从PTE中提取的物理地址。

Don't print PTEs that are not valid. In the above example, the top-level page-table page has mappings for entries 0 and 255. 

不要打印无效的PTE。在上面的例子中，顶层页-表页有条目0和255的映射。

The next level down for entry 0 has only index 0 mapped, and the bottom-level for that index 0 has entries 0, 1, and 2 mapped.

下一级的条目0只映射了索引0，而该索引0的下一级则映射了条目0、1和2。

Your code might emit different physical addresses than those shown above. The number of entries and the virtual addresses should be the same.

你的代码可能发出的物理地址与上面显示的不同。条目数和虚拟地址应该是一样的。

Some hints:

You can put vmprint() in kernel/vm.c.

你可以把vmprint()放在kernel/vm.c中。

Use the macros at the end of the file kernel/riscv.h.

使用文件kernel/riscv.h末尾的宏。

The function freewalk may be inspirational.

职能部门的自由行走可能是鼓舞人心的。

Define the prototype for vmprint in kernel/defs.h so that you can call it from exec.c.

在kernel/defs.h中定义vmprint的原型，以便你可以从exec.c中调用它。

Use %p in your printf calls to print out full 64-bit hex PTEs and addresses as shown in the example.

在你的printf调用中使用%p来打印出完整的64位十六进制PTE和地址，如例子中所示。

Explain the output of vmprint in terms of Fig 3-4 from the text. What does page 0 contain? 

用文中的图3-4来解释vmprint的输出。第0页包含什么？

What is in page 2? When running in user mode, could the process read/write the memory mapped by page 1?

第2页里有什么？当以用户模式运行时，该进程能否读/写第1页所映射的内存？

## A kernel page table per process (hard)

Xv6 has a single kernel page table that's used whenever it executes in the kernel. 

Xv6有一个单一的内核页表，每当它在内核中执行时都会用到。

The kernel page table is a direct mapping to physical addresses, so that kernel virtual address x maps to physical address x. 

内核页表是对物理地址的直接映射，因此，内核虚拟地址x映射到物理地址x。

Xv6 also has a separate page table for each process's user address space, containing only mappings for that process's user memory, starting at virtual address zero. 

Xv6也有一个单独的页表，用于每个进程的用户地址空间，只包含该进程用户内存的映射，从虚拟地址0开始。

Because the kernel page table doesn't contain these mappings, user addresses are not valid in the kernel. 

因为内核页表不包含这些映射，用户地址在内核中是无效的。

Thus, when the kernel needs to use a user pointer passed in a system call (e.g., the buffer pointer passed to write()), the kernel must first translate the pointer to a physical address. 

因此，当内核需要使用在系统调用中传递的用户指针（例如，传递给write()的缓冲区指针）时，内核必须首先将该指针转换为物理地址。

The goal of this section and the next is to allow the kernel to directly dereference user pointers.

本节和下一节的目标是允许内核直接解除对用户指针的定义。

Your first job is to modify the kernel so that every process uses its own copy of the kernel page table when executing in the kernel. 

你的第一项工作是修改内核，使每个进程在内核中执行时使用自己的内核页表副本。

Modify struct proc to maintain a kernel page table for each process, and modify the scheduler to switch kernel page tables when switching processes. 

修改struct proc，为每个进程维护一个内核页表，并修改调度程序，在切换进程时切换内核页表。

For this step, each per-process kernel page table should be identical to the existing global kernel page table. 

对于这一步，每个进程的内核页表应该与现有的全局内核页表相同。

You pass this part of the lab if usertests runs correctly.

如果usertests运行正常，你就能通过这部分的实验。

Read the book chapter and code mentioned at the start of this assignment; it will be easier to modify the virtual memory code correctly with an understanding of how it works. 

阅读本作业开始时提到的书中章节和代码；在了解了虚拟内存的工作原理后，正确修改虚拟内存代码会更容易。

Bugs in page table setup can cause traps due to missing mappings, can cause loads and stores to affect unexpected pages of physical memory, and can cause execution of instructions from incorrect pages of memory.

页表设置中的错误可能导致因映射缺失而产生陷阱，可能导致加载和存储影响物理内存的意外页面，并可能导致从不正确的内存页面执行指令。

Some hints:

Add a field to struct proc for the process's kernel page table.

在struct proc中增加一个字段，用于进程的内核页表。

A reasonable way to produce a kernel page table for a new process is to implement a modified version of kvminit that makes a new page table instead of modifying kernel_pagetable. You'll want to call this function from allocproc.

为一个新进程生成内核页表的合理方法是实现一个修改版的kvminit，它可以生成一个新的页表而不是修改kernel_pagetable。你想从 allocproc 中调用这个函数。

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