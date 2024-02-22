上篇文章已经将物理内存初始化设置完毕了，接下来讲解如何建立虚拟内存到物理内存之间的映射。在讲解映射之前要先讲解虚拟内存，虚拟内存将内核和用户软件使用的虚拟地址映射到物理内存的地址。

### 虚拟地址、线性地址和物理地址三者的区别

在计算机系统中，我们通常会遇到三种类型的地址：虚拟地址（Virtual Address）、线性地址（Linear Address）和物理地址（Physical Address）。这三种地址在内存管理中各有其特定的用途和含义。

1. 虚拟地址（Virtual Address）：虚拟地址是由 CPU 生成的，程序在运行时使用的地址。这些地址是虚拟的，也就是说它们并不直接对应实际的物理内存地址。虚拟地址空间的大小由 CPU 的架构决定，例如在 32 位系统中，虚拟地址空间的大小为 4GB。

2. 线性地址（Linear Address）：线性地址是虚拟地址经过分段（Segmentation）转换后得到的地址。在分段转换过程中，虚拟地址会加上一个段基址得到线性地址。在许多现代操作系统中，由于使用了平坦模型（Flat Model），分段转换通常不会改变地址，因此虚拟地址和线性地址往往是相同的。

3. 物理地址（Physical Address）：物理地址是实际存在于 RAM 中的地址。线性地址经过分页（Paging）转换后得到物理地址。分页转换是通过页表（Page Table）完成的，页表将线性地址空间分割成固定大小的页（Page），并将每个页映射到物理内存中的具体位置。

总的来说，虚拟地址是程序直接使用的地址，线性地址是虚拟地址经过分段转换后的地址，物理地址是实际对应到 RAM 中的地址。这三种地址的转换过程是由 CPU 的内存管理单元（MMU）自动完成的。

### 内存管理单元（MMU）

内存管理单元（MMU）是计算机系统中的一个关键组件，它负责处理虚拟内存和物理内存之间的映射。MMU 的工作过程可以分为以下几个步骤：

1. 当 CPU 需要访问内存时，它会生成一个虚拟地址。这个虚拟地址是由程序生成的，可以被视为一个抽象的概念，它并不直接对应物理内存中的实际位置。

2. 这个虚拟地址会被送到 MMU 进行处理。MMU 会使用一种叫做页表的数据结构来存储虚拟地址到物理地址的映射信息。

3. MMU 会查找页表，找到虚拟地址对应的物理地址。这个过程叫做地址转换或地址映射。

4. 一旦找到了对应的物理地址，MMU 就会将这个物理地址返回给 CPU，CPU 就可以直接访问物理内存了。

5. 如果在页表中找不到虚拟地址对应的物理地址，那么 MMU 就会触发一个页面错误（Page Fault）。这通常意味着程序试图访问一个并未分配的内存区域，或者试图进行一种不被允许的操作，例如写入一个只读的内存区域。

6. 在处理页面错误时，操作系统会介入，它可能会分配新的内存，或者终止发生错误的程序。

在这个过程中，MMU 起到了一个关键的角色，它使得程序可以使用虚拟地址来访问内存，而不需要关心物理内存的实际布局。这大大简化了内存管理的复杂性，同时也提供了一种有效的内存保护机制。

### 地址转换

此前在 `boot/boot.S` 中，已经设置了一个全局描述符表（GDT），其中将所有段基地址设置为 0，限制为 `0xffffffff` ，有效地禁用了段转换。所以"Selector" 没有产生效果，故线性地址总是等于虚拟地址的偏移量。所以在后续的内容中虚拟地址等同于线性地址。可以忽略分段，仅专注于页面转换。

```
           Selector  +--------------+         +-----------+
          ---------->|              |         |           |
                     | Segmentation |         |  Paging   |
Software             |              |-------->|           |---------->  RAM
            Offset   |  Mechanism   |         | Mechanism |
          ---------->|              |         |           |
                     +--------------+         +-----------+
            Virtual                   Linear                Physical
```

### 线性地址组成

接下来讲解虚拟地址的组成组成部分，一个线性地址（'la'）被分解为三个部分：

- 页目录索引（Page Directory Index）
- 页表索引（Page Table Index）
- 页内偏移（Offset within Page）

```
+--------10------+-------10-------+---------12----------+
| Page Directory |   Page Table   | Offset within Page  |
|      Index     |      Index     |                     |
+----------------+----------------+---------------------+
 \--- PDX(la) --/ \--- PTX(la) --/ \---- PGOFF(la) ----/
 \---------- PGNUM(la) ----------/
```

这里的 10 和 12 是位数，表示每个部分占用的位数。页目录索引和页表索引各占 10 位，页内偏移占 12 位。

`PDX(la)`、`PTX(la)`、`PGOFF(la)`和`PGNUM(la)`这四个宏用于分解线性地址。例如，`PDX(la)`用于获取线性地址`la`的页目录索引。

如果你有页目录索引、页表索引和页内偏移，你可以使用`PGADDR(PDX(la), PTX(la), PGOFF(la))`这个宏来构造一个线性地址。

下面是这几个宏对应的实现细节：

```c
// page number field of address
#define PGNUM(la)	(((uintptr_t) (la)) >> PTXSHIFT)

// page directory index
#define PDX(la)		((((uintptr_t) (la)) >> PDXSHIFT) & 0x3FF)

// page table index
#define PTX(la)		((((uintptr_t) (la)) >> PTXSHIFT) & 0x3FF)

// offset in page
#define PGOFF(la)	(((uintptr_t) (la)) & 0xFFF)

// construct linear address from indexes and offset
#define PGADDR(d, t, o)	((void*) ((d) << PDXSHIFT | (t) << PTXSHIFT | (o)))
```

### 页目录和页表

Page Directory 可以理解为数组，其中每一个元素分别是 Page Directory Entry (PDE) 。每个 PDE 指向一个 Page Table。下面是一个简化的 Page Directory 的文本图形化表示：

```
+-----------+-----------+-----------+-----------+-----------+
|   PDE 0   |   PDE 1   |   PDE 2   |   PDE 3   |    ...    |
+-----------+-----------+-----------+-----------+-----------+
|   ...     |   ...     |   ...     |   ...     |    ...    |
+-----------+-----------+-----------+-----------+-----------+
```

Page Table 也是一个数组，一个位置对应一个 Page Table Entry (PTE)。每个 PTE 指向一个物理页框。下面是一个简化的 Page Table 的文本图形化表示：

```
+-----------+-----------+-----------+-----------+-----------+
|   PTE 0   |   PTE 1   |   PTE 2   |   PTE 3   |    ...    |
+-----------+-----------+-----------+-----------+-----------+
|   ...     |   ...     |   ...     |   ...     |    ...    |
+-----------+-----------+-----------+-----------+-----------+
```

每个 PTE 包含一些信息，例如指向对应物理页框的地址等。在这个图中，每个格子代表一个 PTE。

Page Directory 和 Page Table 之间的关系如下：

```
Page Directory        Page Table
+-----------+         +-----------+
|   PDE 0   |-------->|   PTE 0   |
+-----------+         +-----------+
|   PDE 1   |-------->|   PTE 1   |
+-----------+         +-----------+
|   PDE 2   |-------->|   PTE 2   |
+-----------+         +-----------+
|   PDE 3   |-------->|   PTE 3   |
+-----------+         +-----------+
```

这里，箭头表示指向关系。每个 Page Directory Entry 指向一个对应的 Page Table，而每个 Page Table Entry 指向一个物理页框。这种结构允许通过两级查找，从虚拟地址找到物理地址。

### 建立映射的过程

接下来结合具体的代码讲解页目录和页表，进一步具像化，了解在代码中是如何使用的。函数`pgdir_walk`的作用是在给定的页目录`pgdir`中查找虚拟地址`va`对应的页表项。如果页表项不存在，它可以选择创建一个新的页表页。

```c
pte_t *
pgdir_walk(pde_t *pgdir, const void *va, int create)
{
	pde_t *pde;
	pte_t *pte;
	struct PageInfo *pp;

	// 获取页目录项
	pde = &pgdir[PDX(va)];

	if (*pde & PTE_P) {
		// 页目录项存在，获取页表
		pte = (pte_t*) KADDR(PTE_ADDR(*pde));
	} else {
		if (!create || (pp = page_alloc(ALLOC_ZERO)) == NULL) {
			// 页目录项不存在，且不创建新的页表页，或者创建失败
			return NULL;
		}

		// 设置新页表页的物理地址到页目录项中
		*pde = page2pa(pp) | PTE_U | PTE_W | PTE_P;
		// 增加引用计数
		pp->pp_ref++;

		// 获取页表
		pte = (pte_t*) page2kva(pp);
	}

	// 返回页表项
	return &pte[PTX(va)];
}
```

`pgdir` 是一个页目录，它是一个数组，每个元素都是一个页目录项（Page Directory Entry，简称 PDE）。每个页目录项都包含一个页表的物理地址和一些权限位。

通过`PDX(va)`宏获取虚拟地址`va`的页目录索引，并使用该索引从页目录`pgdir`中获取对应的页目录项`pde`。`pde_t *pde` 是一个指向页目录项的指针。`pte_t *pte` 是一个指向页表项的指针。

然后，函数检查页目录项`pde`是否存在。如果存在（即`*pde & PTE_P`为真），则说明对应的页表已经存在。随后通过 `pte = (pte_t*) KADDR(PTE_ADDR(*pde));` 获取页表的虚拟地址。

- 其中 `PTE_ADDR`，它用于获取页表项（Page Table Entry，简称 PTE）中的物理地址。之前已经提及，在 x86 架构的分页内存管理中，页表项中存储了物理页的物理地址和一些权限位。这个宏通过与操作`& ~0xFFF`将页表项`pte`的低 12 位清零，从而获取到物理地址。这是因为在 x86 架构中，物理地址的低 12 位用于存储权限位和其他信息，而高位存储的才是实际的物理地址。

- 通过`KADDR(PTE_ADDR(*pde))`将页目录项`pde`中存储的物理地址转换为内核虚拟地址，并将其视为页表`pte`。

如果页目录项`pde`不存在，函数会根据`create`参数决定是否创建新的页表页。如果`create`为假或者创建新的页表页失败（即`page_alloc(ALLOC_ZERO)`返回 NULL），函数会返回 NULL 表示失败。

如果创建新的页表页成功，函数会将新页表页的物理地址和一些权限位设置到页目录项`pde`中，并增加新页表页的引用计数。然后，函数将新页表页的物理地址转换为内核虚拟地址，并将其视为页表`pte`。

最后，函数通过`PTX(va)`宏获取虚拟地址`va`的页表索引，并返回页表`pte`中对应的页表项的地址。

这个函数是虚拟内存管理的关键部分，它实现了虚拟地址到物理地址的映射。

### 范围映射

通过 `pgdir_walk` 实现了虚拟地址到物理地址的映射。接下来在这个函数的基础上增加其他功能，例如给出起始地址和长度，建立多个地址的映射。

`boot_map_region` 将虚拟地址空间`[va, va+size)`映射到物理地址`[pa, pa+size)`、通过 `page_lookup` 返回虚拟地址'va'映射的页，通过 `page_remove` 取消映射虚拟地址'va'的物理页，通过 `page_insert` 将物理页'pp'映射到虚拟地址'va'。

研究如何使用 boot_map_region ，下面是一个具体的使用示例。boot_map_region 实现后，就需要用到下面的代码，其中将虚拟地址 UPAGES 处映射 'pages' 数组。此前已经讲过 pages 数组了，其中包含所有物理页面信息的数组，每个元素是一个`struct PageInfo`结构体，表示一个物理页面的状态。

```c
boot_map_region(kern_pgdir, UPAGES, pages_size, PADDR(pages), PTE_U | PTE_P);
```

所以，这个函数调用的作用是将虚拟地址`UPAGES`到`UPAGES + pages_size`的范围映射到物理地址`PADDR(pages)`到`PADDR(pages) + pages_size`的范围，权限设置为用户可读且页面存在。这样，内核就可以通过访问虚拟地址`UPAGES`来访问和管理`pages`数组了。

接下来讲解如何实现 boot_map_region ，下面是实现代码，后续讲解每行代码的含义。

```c
static void
boot_map_region(pde_t *pgdir, uintptr_t va, size_t size, physaddr_t pa, int perm)
{
	// 计算需要映射的页数
	size_t num_pages = size / PGSIZE;

	for (size_t i = 0; i < num_pages; i++) {
		// 计算当前页的虚拟地址和物理地址
		uintptr_t cur_va = va + i * PGSIZE;
		physaddr_t cur_pa = pa + i * PGSIZE;

		// 获取当前页的页表项
		pte_t *pte = pgdir_walk(pgdir, (void *)cur_va, 1);

		// 如果获取页表项失败（例如，内存不足），则退出函数
		if (!pte) {
			return;
		}

		// 设置页表项的值为物理地址和权限位的组合
		*pte = cur_pa | perm | PTE_P;
	}
}
```

之前已经讲解过一遍`boot_map_region`参数的含义了，接下来再重复一遍。即在给定的页目录`pgdir`中，将虚拟地址`va`到`va + size`的范围映射到物理地址`pa`到`pa + size`的范围。`size`是以字节为单位的大小，是`PGSIZE`的倍数，`va`和`pa`都应该是页对齐的。

1. 计算需要映射的页数，这是通过将`size`除以`PGSIZE`得到的。

2. 对于每一页，计算当前页的虚拟地址和物理地址。这是通过将`i * PGSIZE`加到`va`和`pa`上得到的。

3. 获取当前页的页表项。这是通过调用`pgdir_walk`函数得到的，该函数返回一个指向页表项的指针。如果页表项不存在，`pgdir_walk`会创建一个新的页表页。

4. 如果获取页表项失败（例如，内存不足），则退出函数。

5. 设置页表项的值为物理地址和权限位的组合。这是通过将`cur_pa`、`perm`和`PTE_P`进行位或操作得到的。`PTE_P`是一个标志位，表示页表项有效。

这段代码的目的是在页目录中设置虚拟地址到物理地址的映射，这是建立虚拟内存系统的一个重要步骤。

### 查找虚拟地址对应的物理页面

接下来 `page_lookup` 的函数，它在给定的页目录 `pgdir` 中查找虚拟地址 `va` 映射的物理页面。

```c
struct PageInfo *
page_lookup(pde_t *pgdir, void *va, pte_t **pte_store)
{
	// 使用 pgdir_walk 获取虚拟地址 va 的页表项
	pte_t *pte = pgdir_walk(pgdir, va, 0);
	if (!pte)
		return NULL;  // 如果页表项不存在，返回 NULL

	// 如果 pte_store 不为零，存储页表项的地址
	if (pte_store)
		*pte_store = pte;

	// 使用 pa2page 将页表项中的物理地址转换为页面信息结构
	return pa2page(PTE_ADDR(*pte));
}
```

函数的参数包括：

- `pgdir`：页目录的指针，它是一个数组，每个元素都是一个页目录项（Page Directory Entry，简称 PDE）。
- `va`：需要查找的虚拟地址。
- `pte_store`：一个指向页表项（Page Table Entry，简称 PTE）指针的指针。如果 `pte_store` 不为零，那么函数会在其中存储找到的页表项的地址。

函数的返回值是一个指向 `PageInfo` 结构的指针，这个结构包含了物理页面的信息。如果虚拟地址 `va` 没有映射的物理页面，函数会返回 `NULL`。

函数的主要步骤如下：

1. 使用 `pgdir_walk` 函数获取虚拟地址 `va` 的页表项。如果页表项不存在，函数返回 `NULL`。
2. 如果 `pte_store` 不为零，那么在 `pte_store` 指向的位置存储页表项的地址。
3. 使用 `pa2page` 函数将页表项中的物理地址转换为 `PageInfo` 结构，然后返回这个结构的指针。

这个函数主要用于查找虚拟地址映射的物理页面，以及获取虚拟地址对应的页表项。

### 删除虚拟地址和物理页面之间的映射关系

这个函数主要用于取消虚拟地址映射的物理页面，以及释放不再使用的物理页面。

```c
void
page_remove(pde_t *pgdir, void *va)
{
	pte_t *pte;
	struct PageInfo *pp;
	// 使用 page_lookup 获取虚拟地址 va 映射的页
	pp = page_lookup(pgdir, va, &pte);
	if (!pp)
		return;  // 如果没有物理页，什么都不做

	// 减少物理页的引用计数
	pp->pp_ref--;

	// 如果引用计数达到 0，释放物理页
	if (pp->pp_ref == 0)
		page_free(pp);

	// 将页表项设置为 0
	*pte = 0;

	// 使 TLB 无效
	tlb_invalidate(pgdir, va);
}
```

函数的参数包括：

- `pgdir`：页目录的指针，它是一个数组，每个元素都是一个页目录项（Page Directory Entry，简称 PDE）。
- `va`：需要取消映射的虚拟地址。

函数的主要步骤如下：

1. 使用 `page_lookup` 函数获取虚拟地址 `va` 映射的物理页面。如果没有映射的物理页面，函数直接返回。
2. 减少物理页面的引用计数。如果引用计数达到 0，释放物理页面。
3. 将虚拟地址 `va` 对应的页表项设置为 0，即取消映射。
4. 使用 `tlb_invalidate` 函数使 TLB（Translation Lookaside Buffer，快表）无效。因为页表项已经改变，所以需要使 TLB 无效，以防止 CPU 使用过时的映射信息。

### page_insert

这段代码的作用是将物理页面 `pp` 映射到虚拟地址 `va`。

```c
int
page_insert(pde_t *pgdir, struct PageInfo *pp, void *va, int perm)
{
	pte_t *pte;

	// 使用 pgdir_walk 获取虚拟地址 va 的页表项
	pte = pgdir_walk(pgdir, va, 1);
	if (!pte)
		return -E_NO_MEM;  // 如果获取页表项失败（例如，内存不足），返回 -E_NO_MEM

	// 如果页表项存在，使用 page_remove 取消映射
	if (*pte & PTE_P) {
		if (PTE_ADDR(*pte) == page2pa(pp)) {
			// 如果重复插入同一个页面，只需要更新权限
			*pte = page2pa(pp) | perm | PTE_P;
			return 0;
		}
		page_remove(pgdir, va);
	}

	// 将物理页面 pp 映射到虚拟地址 va
	*pte = page2pa(pp) | perm | PTE_P;

	// 增加引用计数
	pp->pp_ref++;
	return 0;
}
```

函数的参数包括：

- `pgdir`：页目录的指针，它是一个数组，每个元素都是一个页目录项（Page Directory Entry，简称 PDE）。
- `pp`：需要映射的物理页面，它是一个 `PageInfo` 结构的指针，这个结构包含了物理页面的信息。
- `va`：需要映射的虚拟地址。
- `perm`：映射的权限位。

函数的主要步骤如下：

1. 使用 `pgdir_walk` 函数获取虚拟地址 `va` 的页表项。如果页表项不存在，函数返回 `NULL`。
2. 如果页表项存在，那么使用 `page_remove` 函数取消映射。如果重复插入同一个页面，只需要更新权限。
3. 将物理页面 `pp` 映射到虚拟地址 `va`，并设置权限位。
4. 增加物理页面 `pp` 的引用计数。

这个函数主要用于在虚拟地址空间中映射物理页面。

### 总结

本文结合具体的代码讲解了虚拟内存的映射过程，接下来将会讲解内核如何调用这些代码进一步建立映射。
