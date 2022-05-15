# Lab 2: Memory Management

来源：https://pdos.csail.mit.edu/6.828/2018/labs/lab2/

## Introduction

在这个 lab 中，将会实现 OS 的内存管理。内存管理由两部分组成。

第一部分是物理内核分配器，内核能够分配并释放内存。分配器以 4096 字节为单位进行分配，也叫做一页。
维护一个数据结构，该数据结构记录了哪些物理页被分配，哪些没有被分配，某个被分配的物理页上有多少个进行在共享使用。编写分配和释放内存页的程序。

第二部分是虚拟内存，该部分实现了内核和用户软件使用的虚拟地址到物理地址的映射。当使用内存时，由 x86 中的 MMU 通过查询页表来实现映射。按照提示修改 JOS 中的 MMU 页表使其符合规范。

## Getting started

切换到 lab2 分支然后合并 lab1 代码：

    git checkout -b lab2 origin/lab2
    git merge lab1

下面是切换到 lab2 后新增加的文件，需要浏览一遍。

* inc/memlayout.h
* kern/pmap.c
* kern/pmap.h   
* kern/kclock.h 
* kern/kclock.c

`memlayout.h` 描述了虚拟地址空间的布局，必须通过修改 `pmap.c` 来实现。

`memlayout.h` 和 `pmap.h` 定义了 `PageInfo` 结构，用它来跟踪哪些物理内存页是空闲的。

`kclock.c` 和 `kclock.h` 操纵 PC 的电池支持的时钟和 CMOS RAM 硬件，其中 BIOS 记录了 PC 包含的物理内存的数量。

`pmap.c` 中的代码需要读取这个设备硬件，以便计算出有多少物理内存，但这部分代码已经为完成了，不需要知道CMOS硬件工作的细节。

注意 `memlayout.h` 和 `pmap.h` 因为本实验要求你使用并理解它们所包含的许多定义。 

`inc/mmu.h` 也包含了许多对本实验有用的定义。

在 Lab1 中已经完成了 16 位到 32 位的转换。实现了将 0xf0000000 到 0xf0400000 之间的虚拟地址映射到物理地址 0x00000000 00400000 上。


接下来仔细研究 `memlayout.h` 。

![20220515200905](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220515200905.png)

## Part 1: Physical Page Management

操作系统必须跟踪物理 RAM 的哪些部分是空闲的，哪些是当前正在使用的。JOS 用页的粒度来管理 PC 的物理内存，这样它就可以使用MMU 来映射和保护每一块分配的内存。

你现在要编写物理页分配器。它通过一个 PageInfo 对象的链接列表来跟踪哪些页面是空闲的（与xv6不同的是，这些对象并没有嵌入到空闲页面本身），每个页面都对应一个物理页面。你需要在编写其余的虚拟内存实现之前编写物理页分配器，因为你的页表管理代码将需要分配物理内存来存储页表。

### Exercise 1. 

实现 `kern/pmap.c` 中的 `boot_alloc()`, `mem_init()` （只到调用check_page_free_list(1)为止）, `page_init()`, `page_alloc()`, `page_free()` 。建议按顺序来。

`check_page_free_list()` 和 `check_page_alloc()` 用来测试物理页分配器。

启动 `check_page_alloc()` ，验证代码代码是否正确，可以添加自己的 assert() 。

启动内核后会先调用 init.c 中的 i386_init() ，在该函数中首先做初始化工作，也就是将 edata 到 end 之间的数据清零，接下来初始化终端然后就可以使用 cprintf 最后调用 `mem_init()` 初始化内存。

在 `mem_init()` 函数中，首先检测通过 `i386_detect_memory()` 当前机器内存数量 。然后通过 `boot_alloc()` 函数创建初始页目录并初始化为 0 。


1. 实现 boot_alloc(n)

阅读注释可知：这个函数只用于 JOS 设置虚拟内存。page_alloc() 是真正的内存分配器。如果 n>0 ，分配足够的连续物理内存页以容纳'n'字节。 不对内存进行初始化。返回一个内核虚拟地址。如果n==0，返回下一个空闲页的地址，不分配任何东西。如果内存不够该函数会 panic 。这个函数只能在初始化过程中使用，在page_free_list列表被设置好之前。

```cpp
	if (n == 0) return nextfree;
	if (n > 0) {
		result = nextfree;
		nextfree = ROUNDUP((char *) (nextfree + n), PGSIZE);
	}
	if((uint32_t)nextfree - KERNBASE > (npages * PGSIZE)) {
		panic("boot alloc: out of memory.\n");
	}
	return result;
```

2. 实现 `mem_init()`

检测内存数量，然后创建并初始化内核页表。接下来分配一个 npages 的数组 'struct PageInfo' ，并将其存储在'pages'中。内核使用这个数组来跟踪物理页：对于每个物理页，在这个数组中都有一个相应的结构PageInfo。'npages'是内存中物理页的数量。 使用 memset 来初始化每个结构PageInfo的所有字段为 0 。

```cpp
	pages = (struct PageInfo *) boot_alloc(sizeof(struct PageInfo) * npages);
	memset(pages, 0, sizeof(struct PageInfo) * npages);
```

## Part 2: Virtual Memory

需要熟悉 x86 保护模式的内存管理方式，也就是分段和页转换。

### Exercise 2.

建议阅读  [Intel 80386 Reference Programmer's Manual](https://pdos.csail.mit.edu/6.828/2018/readings/i386/toc.htm) 第五章和第六章。仔细阅读关于页面转换和基于页面的保护的章节（5.2和6.4）。建议略读关于分段的章节；虽然JOS使用分页硬件进行虚拟内存和保护，但分段转换和基于分段的保护在x86上不能被禁用，所以你需要对它有一个基本的了解。


### Virtual, Linear, and Physical Addresses

在X86术语中，虚拟地址由段选择器和段内的偏移量组成。线性地址是你在段转换之后但在页转换之前得到的东西。物理地址是你在段和页转换后最终得到的东西，也是最终通过硬件总线到RAM的东西。

           Selector  +--------------+         +-----------+
          ---------->|              |         |           |
                     | Segmentation |         |  Paging   |
Software             |              |-------->|           |---------->  RAM
            Offset   |  Mechanism   |         | Mechanism |
          ---------->|              |         |           |
                     +--------------+         +-----------+
            Virtual                   Linear                Physical


C语言的指针是虚拟地址的 "偏移 "部分。在boot/boot.S中，我们安装了一个全局描述符表（GDT），通过将所有的段基地址设置为0，限制为0xffffffff，有效地禁止了段转换。因此，"选择器 "没有作用，线性地址总是等于虚拟地址的偏移。在实验室3中，我们将不得不与分段进行更多的交互，以设置权限级别，但对于内存转换，我们可以在整个JOS实验室中忽略分段，而只关注页面转换。

