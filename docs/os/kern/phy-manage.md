这篇文章主要讲解内存初始化，即 mem_init 部分。进入内核之后需要初始化物理内存，随后建立物理内存和虚拟内存之间的映射。初始化物理内存的过程分为物理内存的检测，页表的初始化。这篇文章如何初始化物理内存，下篇文章讲解如何建立虚拟内存和物理内存之间的映射。

### 检测物理内存

使用`i386_detect_memory()`函数检测机器上的物理内存数量。在操作系统中，物理内存的检测是非常重要的一步。这是因为操作系统需要知道有多少可用的物理内存，以便于后续的内存管理和分配。例如，操作系统需要知道有多少内存可以用于创建页表，分配给进程，或者用于文件系统的缓存等。如果没有正确地检测物理内存，操作系统可能会尝试使用不存在的内存，这将导致错误。因此，物理内存的检测通常是操作系统启动和初始化过程的一部分。

通过 `i386_detect_memory()` 来获取一些基本的内存信息，即`npages`和`npages_basemem`，这两个变量都是用来存储物理内存页面数量的，但是它们的用途有所不同。

`npages`：这个变量用来存储系统中所有的物理内存页面的数量。这包括了**所有可用**的物理内存，无论它们是否正在被使用。

`npages_basemem`：这个变量用来存储**基本内存的页面数量**。基本内存通常指的是系统启动时可用的，例如有些内存会被 BIOS，设备驱动程序和操作系统内核使用。

`npages`和`npages_basemem`都是全局变量，下面是获取这两个变量的具体代码：

```c
static void
i386_detect_memory(void)
{
	size_t basemem, extmem, ext16mem, totalmem;

	// 使用 CMOS 调用来测量可用的基本内存和扩展内存。
	// （CMOS 调用返回以千字节为单位的结果。）
	basemem = nvram_read(NVRAM_BASELO);
	extmem = nvram_read(NVRAM_EXTLO);
	ext16mem = nvram_read(NVRAM_EXT16LO) * 64;

	// 计算基本内存和扩展内存中可用的物理页面数量。
	if (ext16mem)
		totalmem = 16 * 1024 + ext16mem;
	else if (extmem)
		totalmem = 1 * 1024 + extmem;
	else
		totalmem = basemem;

	npages = totalmem / (PGSIZE / 1024);
	npages_basemem = basemem / (PGSIZE / 1024);

	cprintf("Physical memory: %uK available, base = %uK, extended = %uK\n",
		totalmem, basemem, totalmem - basemem);
}
```

这段代码的主要目的是检测和计算系统中可用的物理内存数量。

首先，它使用 CMOS 调用来读取基本内存（`basemem`）和扩展内存（`extmem`和`ext16mem`）。

`extmem`表示的是在 1MB 以上，16MB 以下的扩展内存大小，单位是 KB。这部分内存通常被称为"传统"的扩展内存。这部分内存通常被操作系统和一些大型的应用程序使用，例如数据库管理系统或者图形处理软件。

`ext16mem`表示的是在 16MB 以上的扩展内存大小，单位是 64KB。这部分内存通常被称为"高端"的扩展内存。这部分内存通常被操作系统用来存储内核数据结构，例如页表、文件系统缓存等。

在操作系统启动的时候，会读取这两个变量的值，然后根据这些值来初始化内存管理子系统，包括设置物理内存的布局，初始化页表，以及设置内存分配器等。

CMOS 是计算机上的一种小型存储设备，用于存储系统的基本设置，包括系统时间和系统内存大小等信息。在这里，`nvram_read`函数被用来读取 CMOS 中的内存信息。这些信息通常以 KB（千字节）为单位。

然后，它根据读取到的内存信息来计算总的物理内存数量（`totalmem`）。如果`ext16mem`存在，那么总内存就是 16MB 加上`ext16mem`。如果`ext16mem`不存在但`extmem`存在，那么总内存就是 1MB 加上`extmem`。如果两者都不存在，那么总内存就是`basemem`。

这段代码的结果是计算出系统中可用的物理内存总量，以便于后续的内存管理和分配。

### 初始页目录

接下来创建一个初始的页目录来管理虚拟内存到物理内存的映射。

```c
kern_pgdir = (pde_t *) boot_alloc(PGSIZE);
memset(kern_pgdir, 0, PGSIZE);
```

其中 `boot_alloc` 函数是一个简单的物理内存分配器，仅在系统启动时用于分配物理内存。后续会讲解这个函数的实现细节。

函数接受一个参数`n`，表示需要分配的字节数。此处表示要分配一个 PGSIZE ，作为内核的页目录(kern_pgdir)，PGSIZE 即 4096 字节。页目录是一个包含页表条目（PTE）的数组，每个条目都指向一个页表。页表又是一个数组，包含了实际的物理页帧地址以及一些权限和状态位。

可以将页目录想象成一个数组，其中每个元素都是一个页表条目（PTE）。每个 PTE 都指向一个页表。下面是一个简化描述。

```
+---------------+
|   Page Table  |
|   Directory   |
+---------------+
| PTE[0] (Page   |
| Table Entry)  |
+---------------+
| PTE[1]        |
+---------------+
| PTE[2]        |
+---------------+
| ...           |
+---------------+
| PTE[N]        |
+---------------+
```

在这个数组中，每个 PTE 都是一个指向页表的指针。接下来，让我们深入了解页表，将其表示为另一个数组，其中包含了实际的物理页帧地址以及一些权限和状态位。这可以通过以下方式进行图形化表示：

```
+------------------------+
|       Page Table       |
+------------------------+
| Entry 0 | Frame: 0xABC |  <-- Physical Page Frame Address
|         | Permissions  |  <-- Read/Write/Execute permissions
|         | Status Bits  |  <-- Page status bits
+------------------------+
| Entry 1 | Frame: 0xDEF |
|         | Permissions  |
|         | Status Bits  |
+------------------------+
| Entry 2 | Frame: ...   |
|         | Permissions  |
|         | Status Bits  |
+------------------------+
| ...                    |
+------------------------+
| Entry N | Frame: ...   |
|         | Permissions  |
|         | Status Bits  |
+------------------------+
```

在这个数组中，每个条目表示一个物理页帧，其中包含了该页的实际地址、权限（读/写/执行）和状态位。整个结构形成了一个层次化的页面管理系统，其中页目录引导到页表，而页表则映射到实际的物理页帧。

### boot_alloc

接下来详细讲解 boot_alloc 是如何申请空间的。通过 boot_alloc 申请足够的空间用作内核的页目录(kern_pgdir)。如果系统没有足够的内存来满足分配请求，`boot_alloc`函数会触发 panic，表示系统出现了无法恢复的错误。

```c
static void *
boot_alloc(uint32_t n)
{
	static char *nextfree;
	char *result;

	if (!nextfree) {
		extern char end[];
		nextfree = ROUNDUP((char *) end, PGSIZE);
	}

    // 将 'n' 对齐到 PGSIZE 的倍数
    if (n > 0) {
        n = ROUNDUP(n, PGSIZE);
    }

    // 检查是否有足够的剩余内存进行分配。
    if (PADDR(nextfree) + n > npages * PGSIZE) {
        panic("boot_alloc: Out of memory!");
        return NULL;
    }

    // 通过调整 'nextfree' 来分配内存。
    result = nextfree;
    if (n > 0) {
        nextfree += n;
    }

    return result;
}
```

需要注意的是，这个函数只能在系统初始化期间使用，也就是在设置`page_free_list`列表之前。`page_free_list`是一个链表，用于跟踪系统中所有的空闲内存页。一旦这个列表被设置，系统就会开始使用`page_alloc`函数来分配内存，而不再使用`boot_alloc`函数。

#### nextfree 为什么指向 end ？

nextfree 是一个指向下一个可用内存的指针。在 boot_alloc 函数中，如果 nextfree 为 NULL（也就是第一次调用 boot_alloc 函数），nextfree 会被初始化为内核 bss 段结束后的第一个地址。bss 段接下来是堆，即堆的起始地址。

```c
	if (!nextfree) {
		extern char end[];
		nextfree = ROUNDUP((char *) end, PGSIZE);
	}
```

关于程序的内存布局在上一篇文章中已经提及，下面是一个局部图。这样做的目的是让 nextfree 指向内核使用的内存之后的第一个可用页。

```
                          ..........
                  .                      .
                  :                      :
                  |           ^          |
                  |           |          |
 brk point ->     | - - - - - - - - - - -|   堆上声明动态内存
                  |          HEAP        |
                  |                      |
                  |----------------------|
                  |          BSS         |   未初始化数据 (BSS)
                  |----------------------|
                  |          Data        |   初始化数据 (DS)
                  |----------------------|
                  |          Text        |   二进制代码
低地址       ----> '----------------------'
```

#### 检查内存是否足够

在分配内存之前要检查是否有足够的可用内存，下面是具体的判断代码，后续会详细讲解。

```c
	if (PADDR(nextfree) + n > npages * PGSIZE) {
		panic("Out of memory!");
	}
```

`PADDR(nextfree)`是将`nextfree`（下一个空闲内存字节的虚拟地址）转换为物理地址。`n`是请求的内存大小，`npages * PGSIZE`是系统中总的物理内存大小。

如果`PADDR(nextfree) + n`大于`npages * PGSIZE`，那么说明请求的内存大小加上已经分配的内存大小超过了系统的总物理内存大小，这意味着系统没有足够的物理内存来满足这次的内存分配请求，因此会触发 panic，表示系统出现了无法恢复的错误。

### 设置 UVPT

接下来要在页目录中递归地插入自身，以在虚拟地址 UVPT 处形成一个虚拟页表。

```c
kern_pgdir[PDX(UVPT)] = PADDR(kern_pgdir) | PTE_U | PTE_P;
```

在这里，`kern_pgdir[PDX(UVPT)]` 是获取 UVPT 的页目录条目。`PADDR(kern_pgdir)` 是获取页目录的物理地址。`PTE_U` 和 `PTE_P` 是页表条目的权限位，分别表示用户级别可以访问和页存在。

所以，这行代码的含义是将页目录的物理地址与权限位进行或运算后，设置到 UVPT 的页目录条目中。这样做的结果是在虚拟地址 UVPT 处形成了一个虚拟页表，这个页表实际上就是页目录自身。这样做的好处是，操作系统可以通过 UVPT 这个虚拟地址来访问和修改页表。

`UVPT` 是用户级别的页表的虚拟地址。在 x86 架构中，每个进程都有自己的页表，用于将虚拟地址映射到物理地址。`UVPT` 是这个页表在用户空间的虚拟地址。这个地址是在用户空间的高地址部分，这样设计的目的是为了避免与用户程序的地址空间冲突。在这个地址处，用户程序可以读取但不能写入，因此它可以查看但不能修改页表。

在 `kern/pmap.c` 文件的 `mem_init` 函数中，`UVPT` 被设置为页目录自身的地址，这样在用户空间就可以访问到页表了：这行代码的含义是将页目录的物理地址与权限位进行或运算后，设置到 `UVPT` 的页目录条目中。这样做的结果是在虚拟地址 `UVPT` 处形成了一个虚拟页表，这个页表实际上就是页目录自身。

### 分配并初始化页表数组

接下来需要为每个物理页面分配一个 `struct PageInfo` 结构体，并将其存储在 `pages` 数组中。可以使用 `boot_alloc` 函数来分配所需的内存，然后使用 `memset` 函数将所有字段初始化为 0。以下是实现这个功能的具体代码：

```c
// 计算需要的内存大小
size_t pages_size = sizeof(struct PageInfo) * npages;

// 使用 boot_alloc 分配内存
pages = (struct PageInfo *) boot_alloc(pages_size);

// 使用 memset 将所有字段初始化为 0
memset(pages, 0, pages_size);
```

这段代码首先计算了需要分配的内存大小，然后使用 `boot_alloc` 函数分配了相应的内存，并将返回的地址赋值给 `pages`。最后，使用 `memset` 函数将所有字段初始化为 0。

接下来讲解和 page 相关的三个函数，其中 page_init 用于初始化物理页面的空闲列表，page_alloc 用于申请一个 page ，而 page_free 则用与释放 page 。

### 初始化空闲页面列表

在分配了初始的内核数据结构之后，设置空闲物理页面的列表。这样，所有后续的内存管理都将通过`page_*`函数进行。

`page_init` 函数的主要目的是初始化物理页面的空闲列表。这个函数的主要任务是遍历所有的物理页面，并将未使用的页面添加到空闲列表中。在这个过程中，我们需要考虑到一些特殊的内存区域，比如物理页面 0（通常被 BIOS 使用），IO hole（被 IO 设备使用的内存区域），以及已经被内核使用的内存区域。

```c
void
page_init(void)
{
	pages[0].pp_ref = 1;
	pages[0].pp_link = NULL;


	// 从物理页面 1 到 npages_basemem - 1 是基本内存，可以被分配。
	for (size_t i = 1; i < npages_basemem; i++) {
		pages[i].pp_ref = 0;
		pages[i].pp_link = page_free_list;
		page_free_list = &pages[i];
	}

	// 处理 I/O 空隙。这些页面从 IOPHYSMEM 到 EXTPHYSMEM 不能被分配。
	size_t io_hole_start = IOPHYSMEM / PGSIZE;
	size_t io_hole_end = EXTPHYSMEM / PGSIZE;
	for (size_t i = io_hole_start; i < io_hole_end; i++) {
		pages[i].pp_ref = 1;
	}

	// 处理内核已使用的扩展内存。从 EXTPHYSMEM 到 boot_alloc(0) 返回的地址是内核使用的。
	size_t kernel_end = PADDR((char *)boot_alloc(0)) / PGSIZE;
	for (size_t i = io_hole_end; i < kernel_end; i++) {
		pages[i].pp_ref = 1;
	}

	// 处理剩余的扩展内存。这些页面可以被分配。
	for (size_t i = kernel_end; i < npages; i++) {
		pages[i].pp_ref = 0;
		pages[i].pp_link = page_free_list;
		page_free_list = &pages[i];
	}
}
```

函数首先将物理页面 0 标记为已使用，然后将基础内存的页面添加到空闲列表中。接着，函数将 IO hole 的页面标记为已使用。然后，函数检查扩展内存中的页面，其中一部分已经被内核使用，一部分是空闲的。对于已经被内核使用的页面，函数将它们标记为已使用。对于空闲的页面，函数将它们添加到空闲列表中。

这个函数的主要作用是在系统启动时，对物理内存进行初始化和管理，以便后续的内存分配和回收操作。

### Page

接下来详细讲解如何管理物理页面，以及如何实现获取 Page `page_alloc` 和释放 Page `page_free` 对应的功能。对于物理页面需要设计一个对应的结构体`PageInfo`，用于存储关于物理页面的元数据。这个结构体并不是物理页面本身，但是每个物理页面和一个`PageInfo`结构体一一对应。

```c
struct PageInfo {
	struct PageInfo *pp_link;
	uint16_t pp_ref;
};
```

`PageInfo`结构体包含两个成员：

1. `pp_link`：这是一个指向下一个`PageInfo`的指针，用于链接空闲页面列表。

2. `pp_ref`：这是一个指向此页面的指针计数（通常在页面表条目中）。对于使用`page_alloc`分配的页面，这个字段是有效的。但是对于在引导时使用`pmap.c`的`boot_alloc`分配的页面，这个字段是无效的。

这个结构体通常映射在`UPAGES`地址，对内核是可读写的，对用户程序是只读的。

#### page_alloc

page_alloc 函数用来获取一个 page ，以下是实现这个函数的代码：

```c
struct PageInfo *
page_alloc(int alloc_flags)
{
    // 检查是否有空闲的物理页面
    if (!page_free_list)
        return NULL;

    // 从空闲列表中取出一个页面
    struct PageInfo *page = page_free_list;

    // 更新空闲列表
    page_free_list = page_free_list->pp_link;

    // 防止双重释放
    page->pp_link = NULL;

    // 如果需要，将页面内容清零
    if (alloc_flags & ALLOC_ZERO)
        memset(page2kva(page), 0, PGSIZE);

    return page;
}
```

这段代码首先检查 `page_free_list` 是否为空。如果为空，说明没有空闲的物理页面，函数返回 NULL。否则，函数从 `page_free_list` 中取出一个页面，并更新 `page_free_list`。然后，函数将取出的页面的 `pp_link` 字段设置为 NULL，以防止在释放页面时出现双重释放的错误。最后，如果 `alloc_flags` 参数中包含 `ALLOC_ZERO` 标志，函数将整个页面填充为 0。

#### page_free

`page_free` 函数用于释放一个 Page ，以下是实现这个函数的代码：

```cpp
void
page_free(struct PageInfo *pp)
{
    // 如果 pp->pp_ref 不为0，调用 panic 函数报错
    if (pp->pp_ref != 0)
        panic("pp->pp_ref is nonzero!");

    // 如果 pp->pp_link 不为 NULL，调用 panic 函数报错
    if (pp->pp_link != NULL)
        panic("pp->pp_link is not NULL!");

    // 将页面添加到空闲列表中
    pp->pp_link = page_free_list;
    page_free_list = pp;
}
```

这段代码首先检查 `pp->pp_ref` 是否为 0，如果不为 0，说明这个页面还在被引用，不能被释放，函数调用 panic 函数报错。然后，函数检查 `pp->pp_link` 是否为 NULL，如果不为 NULL，说明这个页面已经在空闲列表中，函数调用 panic 函数报错。如果以上两个条件都满足，函数将这个页面添加到 `page_free_list` 中。

### 总结

至此，详细讲解了物理页面管理，接下来讲解虚拟内存。
