# Lab2 Part 3: Kernel Address Space

JOS 将 32 位线性地址空间划分为用户和内核两部分，其中用户空间处于地址空间下部，内核处于上部。

`inc/memlayout.h` 中的符号 ULIM 是分界线。内核保留了大约256MB 的虚拟地址空间。这也就是为什么 lab1 中内核有很高的链接地址，因为太低的话下部的用户环境就没有足够的空间了。

`inc/memlayout.h` 中的 JOS 内存布局图对这部分和后面的实验都很有帮助。

## Permissions and Fault Isolation

因为内核和用户都存在于每个环境的地址空间中，所以需要设置权限避免使得用户代码只能访问地址空间的用户部分，否则可能会可能会导致崩溃。请注意，可写权限位（PTE_W）对用户和内核代码都有影响。

用户环境没有 ULIM 以上内存的权限，内核拥有这部分权限。

范围 [UTOP,ULIM] 对于内核和用户环境都是只读，不可写。用来向用户环境访问某些只读的内核数据结构。

最后，UTOP 以下的地址空间是给用户环境使用的；用户环境将为访问这个内存设置权限。

## Initializing the Kernel Address Space

现在可以设置 UTOP 之上的地址空间，地址空间的内核部分。

`inc/memlayout.h` 显示了应当使用的布局。使用刚才写的函数来设置适当的线性到物理的映射关系。

* Exercise 5. 将函数 mem_init() 中 check_page() 后的代码补充完整。通过 check_kern_pgdir() 和 check_page_installed_pgdir() 。 

设置虚拟内存：用户在线性地址 UPAGES 之上映射只读的 "页"。

	boot_map_region(kern_pgdir, UPAGES, PTSIZE, PADDR(pages), PTE_U);

使用 "bootstack" 所指的物理内存作为内核栈。内核堆栈从虚拟地址 KSTACKTOP 开始向下生长。

	boot_map_region(kern_pgdir, KSTACKTOP - KSTKSIZE, KSTKSIZE, PADDR(bootstack), PTE_W);

将虚拟内存 [KERNBASE, 2^32) 映射到 [0, 2^32 - KERNBASE) 上。

	boot_map_region(kern_pgdir, KERNBASE, (0xffffffff-KERNBASE), 0, PTE_W);

测试：

    running JOS: (0.4s)
        Physical page allocator: OK
        Page management: OK
        Kernel page directory: OK
        Page management 2: OK
    Score: 70/70

2. 页面目录中的哪些条目（行）已被填入？它们映射的是什么地址，它们指向哪里？换句话说，尽可能多地填写这个表格。

Entry	Base Virtual Address	Points to (logically):
1023	?	Page table for top 4MB of phys memory
1022	?	?
.	?	?
.	?	?
.	?	?
2	0x00800000	?
1	0x00400000	?
0	0x00000000	[see next question]

3. 将内核和用户环境放在同一个地址空间中。为什么用户程序不能读或写内核的内存？有什么具体的机制来保护内核的内存？

4. 这个操作系统所能支持的最大物理内存量是多少？为什么？

5. 如果我们真的拥有最大数量的物理内存，那么管理内存的空间开销有多大？这种开销是如何分解的？

6. 重新审视 `kern/entry.S` 和 `kern/entrypgdir.c` 中的页表设置。在我们打开分页后，EIP 仍然是一个低数字（略高于1MB）。在什么时候我们要过渡到以高于 KERNBASE 的 EIP 运行？在我们启用分页和开始以高于 KERNBASE 的 EIP 运行之间，是什么使我们有可能继续以低 EIP 执行？为什么这种过渡是必要的？

