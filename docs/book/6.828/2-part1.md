# Lab 2: Memory Management

来源：https://pdos.csail.mit.edu/6.828/2018/labs/lab2/

## 1. 介绍

实现 OS 的内存管理，其中内存管理分为内存分配物理内存和虚拟内存两部分。

- 为内存分配物理内存，内核能够分配并释放内存。分配器以 4096 字节为单位进行分配，也叫做一页。维护一个数据结构，该数据结构记录了哪些物理页被分配，哪些没有被分配，某个被分配的物理页上有多少个进行在共享使用。编写分配和释放内存页的程序。

- 虚拟内存，该部分实现了内核和用户软件使用的虚拟地址到物理地址的映射。当使用内存时，由 x86 中的 MMU 通过查询页表来实现映射。按照提示修改 JOS 中的 MMU 页表使其符合规范。

## 2. Getting started

切换到 lab2 分支然后合并 lab1 代码：

    git checkout -b lab2 origin/lab2
    git merge lab1

下面是切换到 lab2 后新增加的文件，需要浏览一遍。

* inc/memlayout.h
* kern/pmap.c
* kern/pmap.h   
* kern/kclock.h 
* kern/kclock.c

- `memlayout.h` 描述了虚拟地址空间的布局，必须通过修改 `pmap.c` 来实现。

`memlayout.h` 和 `pmap.h` 定义了 `PageInfo` 结构，用它来跟踪哪些物理内存页是空闲的。

PageInfo 是一个结构体，记录了物理页的元信息，和物理页一一对应，可以通过 `page2pa()` 函数实现 PageInfo 和物理页的对应。这个结构体本质上是一个链表，每个节点对应一个物理页并且其中存储了一些关于该物理页的信息，例如该页被引用的次数（ pp_ref 字段）。同时该结构体还有一个指针字段 pp_link ，用于在空闲页列表中链接下一个空闲页。

在 OS 中，通过 PageInfo 组成的链表来跟踪每个物理页的状态，例如是否空闲，是否被占用等。当 OS 想要分配一个物理页时就可以从一个 PageInfo 所维护的空闲链表中选择一个合适的物理页并将其分配给所需要使用该页的进程。此外也可以通过此链表来判断是否可以回收物理页，并更新其中信息。

需要注意的是，该结构体的权限设置为对内核可读写，对用户程序只读，因为该结构体存储的是敏感信息，仅由操作系统内核可以访问和修改。

- `kclock.c` 和 `kclock.h` 操纵 PC 的电池支持的时钟和 CMOS RAM 硬件，其中 BIOS 记录了 PC 包含的物理内存的数量。

- `pmap.c` 中的代码需要读取这个设备硬件，以便计算出有多少物理内存。但这部分代码已经为完成了，不需要知道CMOS硬件工作的细节。

- 注意阅读 `memlayout.h` 和 `pmap.h` ，因为本实验要求你使用并理解它们所包含的许多定义。 

* `inc/mmu.h` 也包含了许多对本实验有用的定义。

在 Lab1 中已经完成了 16 位到 32 位的转换。实现了将 0xf0000000 - 0xf0400000 之间的虚拟地址映射到物理地址 0x00000000 - 00400000 上。

接下来仔细研究 `memlayout.h` 。

![20220515200905](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220515200905.png)

## Part 1: Physical Page Management

操作系统必须跟踪物理 RAM 的哪些部分是空闲的，哪些是当前正在使用的。JOS 用页的粒度来管理 PC 的物理内存，这样它就可以使用 MMU 来映射和保护每一块分配的内存。

你现在要编写物理页分配器。它通过一个 PageInfo 对象的链接列表来跟踪哪些页面是空闲的（与 xv6 不同的是，这些对象并没有嵌入到空闲页面本身），每个页面都对应一个物理页面。你需要在编写其余的虚拟内存实现之前编写物理页分配器，因为你的页表管理代码将需要分配物理内存来存储页表。

> Exercise 1.  实现 `kern/pmap.c` 中的 `boot_alloc()`, `mem_init()` （只到调用 check_page_free_list(1) 为止）, `page_init()`, `page_alloc()`, `page_free()` 。建议按顺序来。

`check_page_free_list()` 和 `check_page_alloc()` 用来测试物理页分配器。

启动 `check_page_alloc()` ，验证代码代码是否正确，可以添加自己的 assert() 。

启动内核后会先调用 `init.c` 中的 `i386_init()` 。该函数中首先做初始化工作，也就是将 `edata` 到 `end` 之间的数据清零，接下来初始化终端然后就可以使用 `cprintf` 最后调用 `mem_init()` 初始化内存。

在 `mem_init()` 函数中，首先检测通过 `i386_detect_memory()` 当前机器内存数量 。然后通过 `boot_alloc()` 函数创建初始页目录并初始化为 0 。

0. 怎么执行到这个这一步的？

回顾一下：

* `boot.S` 和 `main.c`  组成了 boot loader 。
* 此后文件 `entry.S` 实现了进入内核。
* 随即跳转到 `kern/init.c:i386_init()`，初始化 BSS 数据，初始化终端，最后初始化内存。最终进入`kern/monitor.c:monitor()`。
* 通过 `mem_init()` 函数初始化内存。设置二级页表，kern_pgdir 是根部的线性地址，仅用来设置内核部分地址空间(addresses >= UTOP),
* `kern/monitor.c:monitor()` 负责处理输入命令。

1. 实现 `boot_alloc(n)`

阅读注释可知：这个函数只用于 JOS 设置虚拟内存。page_alloc() 是真正的内存分配器。

如果 `n > 0` ，分配足够的连续物理内存页以容纳'n'字节。 不对内存进行初始化。返回一个内核虚拟地址。

如果 `n == 0` ，返回下一个空闲页的地址，不分配任何东西。

如果内存不够该函数会 panic 。这个函数只能在初始化过程中使用，在page_free_list列表被设置好之前。

`ROUNDUP(a, PGSIZE)` 表示对地址 a 以 PGSIZE 为单位，向上取整。

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

此后初始化内核页表 kern_pgdir 。

```cpp
	kern_pgdir = (pde_t *) boot_alloc(PGSIZE);
	memset(kern_pgdir, 0, PGSIZE);
	kern_pgdir[PDX(UVPT)] = PADDR(kern_pgdir) | PTE_U | PTE_P;
```

建立内核页表虚拟地址和物理地址之间的映射。其中 UVPT 是某段虚拟地址的起始地址。PDX 实现了虚拟地址到页表索引的转换。

PADDR 实现了虚拟地址和物理地址之间的映射，地址应当大于等于 KERNBASE ，否则会 panic 。用户和内核的权限是只读。

2. 实现 `mem_init()`

分配 n 个 PageInfo 并指向 pages 。内核使用 pages 来跟踪物理页，每一个物理页和 PageInfo 相对应。

npages 是内核中物理页的数量，使用 memset 将 PageInfo 初始化为零。

此前已经通过 `i386_detect_memory()` 计算出 npages 。

```cpp
	pages = (struct PageInfo *) boot_alloc(sizeof(struct PageInfo) * npages);
	memset(pages, 0, sizeof(struct PageInfo) * npages);
```

3. 实现 `page_init()` 。

此时已经分配好内核的数据结构了，接下来设置自由物理页。一旦设置好后就能使用 `boot_map_region()` 和 `page_insert()` 。

跟踪物理页，pages 中每一个物理页都对应一个 PageInfo 。空闲页存于一个链表中(page_free_list)。

初始化页表结构和内存空闲页。完成后不再使用 `boot_alloc()` 函数，只使用 page allocator 函数，通过`page_free_list` 分配和删除物理内存。

其实就是用头插法构建将物理页转为链表，第零个物理页标记被使用。 base memory (前 640KB) 全当作空闲链表处理，此后是一个 I/O hole 设置标记不能使用，其余内存都塞入空闲链表中。

```c

	// 1) page 0 被使用，保留实模式下的 IDT 和 BIOS 结构
	pages[0].pp_ref = 1;

	// 头插法构建空闲链表
	size_t i;
	for (i = 1; i < npages_basemem; i++) {
		pages[i].pp_ref = 0;
		pages[i].pp_link = page_free_list;
		page_free_list = &pages[i];		
	}

	// 分为三部分：
	// 1. npages_basemem 是偏移量。
	// 2. 380K/4K = 96 用于 IO hole。
	// 3. 用于映射初始页表。
	const size_t pages_in_use_end = 
	npages_basemem + 96 + ((uint32_t)boot_alloc(0) - KERNBASE) / PGSIZE;	

	//  [IOPHYSMEM, EXTPHYSMEM)
	for (i = npages_basemem; i < pages_in_use_end; i++){
		pages[i].pp_ref = 1;
	}

	for (i = pages_in_use_end; i < npages; i++) {
		pages[i].pp_ref = 0;
		pages[i].pp_link = page_free_list;
		page_free_list = &pages[i];
	}
```

4. 实现 `page_alloc()` 。

`page_alloc` 负责分配物理页，

`page2kva` 中通过 `page2pa` 实现了 `struct PageInfo * ` 和物理地址的映射。再通过 `KADDR` 转为虚拟地址。也就是将 page 转为虚拟地址。

其实就是从空闲链表中取出一个节点。

```c
	if (page_free_list == NULL) {
		return NULL;
	}
	struct PageInfo *t = page_free_list;
	page_free_list = t->pp_link;
	t->pp_link = NULL;
	if (alloc_flags && ALLOC_ZERO) {
		memset(page2kva(t), 0, PGSIZE);
	}
	return t;
```

5. 实现 `page_free()` 。

向空闲链表中加入一个节点。

```c
	if(pp->pp_ref != 0) {
		panic("This page is in using! beacuse pp_ref != 0 .");
	}
	if (pp->pp_link != NULL) {
		panic("This page is in using! beacuse pp_link != NULL !");		
	}
	pp->pp_link = page_free_list;
	page_free_list = pp;
```

至此 Part1 搞定！下面的爆粗不用理会，那是下一部分要解决的问题。

	check_page_free_list() succeeded!
	check_page_alloc() succeeded!
	kernel panic at kern/pmap.c:729: assertion failed: page_insert(kern_pgdir, pp1, 0x0, PTE_W) < 0
