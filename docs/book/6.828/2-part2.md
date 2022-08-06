# Lab2 Part 2: Virtual Memory

需要熟悉 x86 保护模式的内存管理方式，也就是分段和页转换。

* Exercise 2.建议阅读  [Intel 80386 Reference Programmer's Manual](https://pdos.csail.mit.edu/6.828/2018/readings/i386/toc.htm) 第五章和第六章。仔细阅读关于 page translation 和  page-based protection （5.2和6.4）。建议略读关于分段的章节；虽然 JOS 使用分页硬件进行虚拟内存和保护，但分段转换和基于分段的保护在 x86 上不能被禁用，所以需要对它有一个基本的了解。

逻辑地址转为物理地址需要经过分段和分页两部分。

逻辑地址经过分段转为线性地址，线性地址经过分页转为物理地址。

## Virtual, Linear, and Physical Addresses

虚拟地址，线性地址，物理地址。

在 x86 术语中，虚拟地址由段选择子和段内偏移量组成。

在段转换后，页转换前，该地址为线性地址。

经过段转换和页转换后，最终变为物理地址。


           Selector  +--------------+         +-----------+
          ---------->|              |         |           |
                     | Segmentation |         |  Paging   |
Software             |              |-------->|           |---------->  RAM
            Offset   |  Mechanism   |         | Mechanism |
          ---------->|              |         |           |
                     +--------------+         +-----------+
            Virtual                   Linear                Physical


C语言的指针是虚拟地址的偏移部分。

在 `boot/boot.S` 中设置了一个全局描述符表（GDT），据此将所有的段基地址设置为 0 ，限制为`0xffffffff` ，有效地禁止了段转换。因此，"selector" 没有作用，线性地址总是等于虚拟地址的偏移。

在 lab3 中将会与分段进行更多的交互，以设置权限级别。

对于内存转换，可以在整个JOS实验中忽略分段，而只关注页面转换。

在 Lab1 的 part 3 中设置了一个简单的页表，使得内核能够在 `0xf0100000` 处执行，尽管它实际上被加载在物理内存中，就在 ROM BIOS 的上方，位于 `0x00100000` 。该页表仅映射了 4MB 的内存。

在这个 lab 中，将会映射从 `0xf0000000` 处开始的 256 MB 的内存空间，并且映射虚拟地址空间的其他部分。

* Exercise 3. 虽然GDB只能通过虚拟地址访问QEMU的内存，但是在设置虚拟内存的时候能够检查物理内存往往是很有用的。建议回顾 qemu 的命令，尤其是 xp 命令可以查看物理内存。通过 Ctrl-a c 可以查看 QEMU monitor 。
* 使用 QEMU monitor 中的 xp 命令和 GDB 中的 x 命令来检查相应物理地址和虚拟地址的内存，确保看到的数据是一样的。
* 实验中所使用的 QEMU 补丁版本中提供了一个`info pg`命令，该命令显示了一个紧凑但详细的当前页表，包括所有映射的内存范围、权限和标志。
* `info mem` 显示了哪些虚拟地址范围被映射了，有哪些权限。

一旦进入保护模式（在 `boot/boot.S` 中首先进入保护模式），就没有办法直接使用线性或物理地址。所有的内存引用都被解释为虚拟地址并由 MMU 转换，这意味着 C 语言中所有的指针都是虚拟地址。

JOS 内核经常需要将地址作为不透明的值或整数来操作，而不去引用它们。例如在物理内存分配器中，有时这些是虚拟地址，有时是物理地址。为了帮助记录代码，JOS的源代码区分了这两种情况：`uintptr_t` 表示虚拟地址，而 `physaddr_t` 代表物理地址。但实际上二者均是 32 位整数，即 uint32_t 型。二者可以进行类型转换，但是若进行解引用需要转为指针。

总结：

* C type	Address type
* T*  	Virtual
* uintptr_t  	Virtual
* physaddr_t  	Physical

Q: 假设下面的JOS内核代码是正确的，变量 x 应该是什么类型，uintptr_t 还是 physaddr_t ？

    mystery_t x;
    char* value = return_a_pointer();
    *value = 10;
    x = (mystery_t) value;

A: 虚拟地址，因为使用了解引用。

JOS 内核有时需要读取或修改它只知道物理地址的内存。例如，向页表中添加映射可能需要分配物理内存来存储页目录，然后初始化该内存。然而，内核不能绕过虚拟地址转换，因此不能直接加载和存储到物理地址。

JOS 将所有的物理内存从物理地址 0 开始重新映射到虚拟地址 `0xf0000000` 处的原因之一是为了帮助内核读写它只知道物理地址的内存。

物理地址加上 `0xf0000000` 后转为内核虚拟地址，可以通过 `KADDR(pa)` 来实现。

内核虚拟地址减去 `0xf0000000` 后转为物理地址，可以通过 `PADDR(va)` 实现。内核全局变量和由 `boot_alloc()` 分配的内存都在加载内核的区域，从 `0xf0000000` 开始映射所有物理内存的区域。

## Reference counting

后续存在多个虚拟地址指向同一个物理页的情况，这就使得物理页不能被随便释放。通过物理页的 PageInfo 结构的 pp_ref 字段中对每个物理页的引用数量进行统计。当物理页计数为零时该页面可以被释放。

通常该计数等于物理页所在页表中出现在 UTOP 一下的次数。UTOP以上的映射大多是在启动时由内核设置的，不应该被释放，所以没有必要对它们进行引用计数。

此外还将用它来跟踪保留的指向页面目录页面的指针数量，反过来，也跟踪页面目录对页面表页的引用数量。

使用page_alloc时要小心。它返回的页面的引用计数总是为 0 ，所以一旦对返回的页面做修改，pp_ref 就应该被递增（比如把它插入到一个页面表中）。有时这由其他函数处理（例如，page_insert），有时调用page_alloc的函数必须直接处理。

## Page Table Management

实现页表管理方面的一些操作。例如插入、删除线性地址到物理地址的映射，创建页表。

* Exercise 4.  在文件kern/pmap.c中，你必须实现下列函数的代码。

        pgdir_walk()
        boot_map_region()
        page_lookup()
        page_remove()
        page_insert()

check_page()，由 mem_init() 调用，测试页表管理程序。应该确保在继续进行之前报告成功。

回顾一下，执行 `make qemu` 后报错：

  check_page_free_list() succeeded!
  check_page_alloc() succeeded!
  kernel panic at kern/pmap.c:738: assertion failed: page_insert(kern_pgdir, pp1, 0x0, PTE_W) < 0

原因是 `page_insert()` 还未实现，分析可知 `check_page()` 函数调用了 `page_insert()` 。

但是通过阅读 `check_page()` 函数可知，首先测试了 `page_lookup()`，阅读注释可知 `page_lookup()` 需要调用 `pgdir_walk()` 实现。接下来实现 `pgdir_walk()` :

1. 实现 `pgdir_walk()` :

给出一个指向页目录的指针(pgdir)，返回指向线性地址 va 的页表项（PTE）的指针。这需要走两层的页表结构。相关的页表页可能还不存在。

如果页表项不存在并且 `create == false` 那么 `pgdir_walk` 返回 NULL 。否则，pgdir_walk 会用page_alloc 分配一个新的页表页。如果分配失败就返回 NULL，若分配成功那么引用计数加一，页刷新，返回指向页表页的指针。

提示1：你可以用 `kern/pmap.h` 中的 `page2pa()` 将 `PageInfo *` 变成它所指的页面的物理地址。

提示2：x86 MMU 检查 page directory 和 page table 的权限，所以，在 page directory 中留下比严格意义上所需的更多权限是安全的。

提示3：看看`inc/mmu.h`中的有用的宏，这些宏可以操作页表和页指示器条目。

2. 实现 boot_map_region()

```c
static void
boot_map_region(pde_t *pgdir, uintptr_t va, size_t size, physaddr_t pa, int perm)
{
	for(size_t i = 0; i < size; i += PGSIZE, va += PGSIZE, pa += PGSIZE)
	{
		pte_t* addr = pgdir_walk(pgdir, (const void*)va, 1);
		if(addr == NULL) {
			panic("boot_map_region error!");
		}
		*addr = pa | (perm | PTE_P);
	}
}
```


3. 实现 page_lookup()

返回和虚拟地址 va 对应的页面。如果 pte_store 不为零，那么就在其中存储这个页面的 pte 的地址。

```c
struct PageInfo *
page_lookup(pde_t *pgdir, void *va, pte_t **pte_store)
{
	pte_t *pte = pgdir_walk(pgdir, va, 0);
	if (!pte) {
		return NULL;
	}
	if (pte_store) {
		*pte_store = pte;  // 通过指针的指针返回指针给调用者
	}
	if (*pte & PTE_P) {
		return (pa2page(PTE_ADDR(*pte)));
	}
	return NULL;
}
```

4. 实现 page_insert() 

建立物理地址 pp 和 va 之间的映射。PTE 的低 12 位将会被设置为权限 'perm|PTE_P'

```c
int
page_insert(pde_t *pgdir, struct PageInfo *pp, void *va, int perm)
{
	pte_t *pte = pgdir_walk(pgdir, va, 1);

    if (!pte) {
        return -E_NO_MEM;
	}
	if (*pte & PTE_P) {
		if (PTE_ADDR(*pte) == page2pa(pp)) {
			// 插入的是同一个页面，只需要修改权限等即可
			pp->pp_ref--;
		}else {
			page_remove(pgdir, va);
		}
	}
    pp->pp_ref++;
    *pte = page2pa(pp) | perm | PTE_P;
    return 0;
}
```
