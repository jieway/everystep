本文主要讲解了在多处理器系统中，如何通过对称多处理（SMP）和高级可编程中断控制器（APIC）来实现处理器的并行运行。

### 什么是 SMP？

"对称多处理"（SMP）是一种多处理器模型，其中所有的处理器（CPU）对系统资源（如内存和 I/O 总线）具有等效的访问权限。这意味着每个处理器都可以独立地访问任何内存或 I/O 设备。这种模型的优点是它可以提供良好的性能扩展性，因为增加更多的处理器可以直接增加系统的处理能力。

在 SMP 系统中，综上，第一个启动的 CPU 是 BSP，后续启动的 CPU 是 AP 。下面是两种类型处理器的详细区别：

1. 引导程序处理器（Bootstrap Processor，简称 BSP）：BSP 是在系统启动时负责初始化系统和引导操作系统的处理器。它**首先启动**，注意是第一个启动的 CPU，并执行所有的系统初始化任务，包括初始化内存控制器、I/O 子系统等。然后，它加载并启动操作系统。一旦操作系统启动并运行，BSP 就可以像系统中的其他处理器一样执行常规的计算任务。

2. 应用程序处理器（Application Processor，简称 AP）：AP 是在操作系统启动并运行后由 BSP 激活的处理器。一旦被激活，AP 就可以执行常规的计算任务。在多处理器系统中，可以有多个 AP。

在系统启动过程中，哪个处理器作为 BSP 是由硬件和 BIOS 决定的。在这个过程完成后，所有的处理器在功能上都是相同的，都可以执行用户级和内核级的代码。

### 什么是 APIC？

APIC 解决了在多处理器系统中分发和处理中断的问题。在没有 APIC 的系统中，所有的中断都会发送到一个中央处理器，这可能会导致处理器过载。通过使用 APIC，每个处理器都可以处理自己的中断，从而提高了系统的整体性能。

APIC（高级可编程中断控制器）是一种硬件设备，用于管理和控制中断。在一个对称多处理（SMP）系统中，每个 CPU 都有一个相应的本地 APIC（LAPIC）单元。本地 APIC 可以接收来自 I/O APIC 的中断，并将其传递给处理器。此外，本地 APIC 还可以发送和接收来自其他本地 APIC 的中断，这使得处理器之间可以相互通信。

### 参数读取细节

当 CPU 执行到 i386_init 时会执行 mp_init 将读取到的参数绑定到结构体上，随后执行 lapic_init 初始化 APIC 。

```c
void
i386_init(void)
{
    // ...
	mp_init();
	lapic_init();
    // ...
}
```

参数是 Intel 多处理器规范的一部分，用于描述系统的硬件配置，包括处理器、总线、I/O APIC 等的信息。`mp_init()` 函数读取的数据主要来自多处理器配置表，这个配置表由 BIOS 在系统启动时生成，并存储在内存中的特定位置。

在启动应用程序处理器（APs）之前，引导服务处理器（BSP）应首先收集关于多处理器系统的信息，例如 CPU 的总数、它们的 APIC ID 以及 LAPIC 单元的 MMIO 地址。

`mp_init()`函数（在`kern/mpconfig.c`中）通过读取位于 BIOS 内存区域的 MP 配置表来获取这些信息。接下来讲解 `mp_init()` 是如何获取参数的。

在 `mp_init()` 中会先执行 `bootcpu = &cpus[0];`，这行代码的作用是将 `bootcpu` 指针指向 `cpus` 数组的第一个元素。将 `bootcpu` 指向系统中的第一个 CPU，即 BSP。这样，我们就可以通过 `bootcpu` 指针来访问和操作 BSP 的信息。`bootcpu` 是一个全局变量，即 `struct CpuInfo *bootcpu;`，是用来指向启动 CPU（Bootstrap Processor，简称 BSP）的信息的。

因此，`bootcpu` 通常被用来在初始化过程中访问和操作 BSP 的信息。`cpus` 是一个 `CpuInfo` 结构体数组，用于存储系统中所有 CPU 的信息。`CpuInfo` 结构体包含了关于 CPU 的信息，例如 CPU 的 ID，状态等。

接下来 `mp_init` 函数中遍历了多处理器配置表中的每个处理器条目，并为每个处理器设置了相应的 `CpuInfo` 结构。具体来说，它将每个处理器的 ID 设置为其在 `cpus` 数组中的索引，并将 `cpu_status` 设置为 `CPU_STARTED`。如果处理器是引导处理器（BSP），则 `bootcpu` 指针会被设置为指向该处理器的 `CpuInfo` 结构。

### APIC 是如何初始化的？

`lapic_init` 主要是初始化和配置本地高级可编程中断控制器（Local APIC）。首先，它会检查并映射 Local APIC 的物理地址，然后启用 Local APIC 并设置伪中断。接着，它会初始化和配置 Local APIC 的定时器，以便执行定时任务。此外，它还会根据处理器的类型和支持的功能，进行一些特定的配置，如禁用某些中断，清除错误状态寄存器，确认未处理的中断，以及在 APIC 上启用中断等。

### Local APIC 如何设置虚拟内存？

首先将 LAPIC（本地高级可编程中断控制器）的物理内存映射到虚拟内存中，以便我们可以在代码中访问它。

```cpp
lapic = mmio_map_region(lapicaddr, 4096);
```

`lapicaddr` 是 LAPIC 的物理地址，它是在系统启动时由 BIOS 设置的。LAPIC 是一个硬件设备，它的寄存器是映射在物理内存中的。为了在代码中访问这些寄存器，我们需要将它们映射到虚拟内存中。

`mmio_map_region` 是一个函数，它的作用是将物理内存映射到虚拟内存中。这个函数接受两个参数：要映射的物理地址和映射的大小。在这个例子中，我们要映射的是 LAPIC 的物理地址，大小是 4096 字节（4KB）。这是因为 LAPIC 的寄存器是在一个 4KB 的内存区域中。

这段代码的结果是，`lapic` 变量现在指向一个虚拟地址，这个虚拟地址映射到了 LAPIC 的物理地址。这样，我们就可以通过 `lapic` 变量来访问 LAPIC 的寄存器了。

这是做因为在现代操作系统中，我们通常使用虚拟内存来访问内存。虚拟内存为我们提供了一种抽象，使我们可以像操作连续的内存一样操作物理内存，即使物理内存可能是分散的。此外，虚拟内存还提供了一种保护机制，使我们可以控制哪些内存区域可以被访问，以及如何访问。因此，我们需要将 LAPIC 的物理内存映射到虚拟内存中，以便我们可以在代码中访问它。

### 内存映射 I/O（MMIO）

内存映射 I/O（MMIO）是一种允许 CPU 和设备进行通信的机制。在这种机制中，设备的寄存器被映射到系统的地址空间，CPU 可以通过读写这些地址来控制设备。MMIO 区域的起始地址是`MMIOBASE`，结束地址是`MMIOLIM`。这个区域的大小是`PTSIZE`。

这个区域的权限是读写（RW）对于内核，对于用户空间是不可访问的（--）。这是因为设备通常只允许内核进行直接操作，用户程序通常需要通过系统调用来间接操作设备。

在这个区域中，设备的寄存器被映射到虚拟地址，CPU 可以通过读写这些虚拟地址来读取设备的状态或者发送命令给设备。这种方式比传统的 I/O 端口访问方式更灵活，因为它可以直接利用 CPU 的地址空间，不需要额外的 I/O 指令和 I/O 地址空间。

```
                     :              .               :                   |
                     :              .               :                   |
    MMIOLIM ------>  +------------------------------+ 0xefc00000      --+
                     |       Memory-mapped I/O      | RW/--  PTSIZE
 ULIM, MMIOBASE -->  +------------------------------+ 0xef800000
                     |  Cur. Page Table (User R-)   | R-/R-  PTSIZE
    UVPT      ---->  +------------------------------+ 0xef400000
```

下面的代码实现了如何映射，即`mmio_map_region`函数将物理地址`pa`到`pa+size`的区域映射到这个预留的空间。这个函数返回预留区域的基址。

```c
void *
mmio_map_region(physaddr_t pa, size_t size)
{
	static uintptr_t base = MMIOBASE;
	size = ROUNDUP(pa+size, PGSIZE);
	pa = ROUNDDOWN(pa, PGSIZE);
	size -= pa;
	if (base+size >= MMIOLIM) panic("not enough memory");
	boot_map_region(kern_pgdir, base, size, pa, PTE_PCD|PTE_PWT|PTE_W);
	base += size;
 	return (void*) (base - size);
}
```

### AP 引导过程

在系统启动时，BSP 负责初始化系统，然后启动其他的应用程序处理器（Application Processor，简称 AP）。第一个启动的 CPU 是 BSP，后续启动的 CPU 是 AP 。之前已经提及了，此处再强调一下。

在 AP 的引导过程中，BSP 会将 AP 的引导代码复制到一个特定的物理地址，这个地址是 `MPENTRY_PADDR`。下面是代码复制的具体细节。

```c
extern unsigned char mpentry_start[], mpentry_end[];
void *code;

// Write entry code to unused memory at MPENTRY_PADDR
code = KADDR(MPENTRY_PADDR);
memmove(code, mpentry_start, mpentry_end - mpentry_start);
```

这段代码的目的是将 AP（Application Processor）的引导代码复制到一个特定的物理地址 `MPENTRY_PADDR`。

1. `extern unsigned char mpentry_start[], mpentry_end[];` 这行代码声明了两个外部变量 `mpentry_start` 和 `mpentry_end`，它们分别表示 AP 引导代码的开始和结束位置。

2. `void *code;` 这行代码声明了一个指针变量 `code`，它将用于指向 `MPENTRY_PADDR` 所指向的物理地址。

3. `code = KADDR(MPENTRY_PADDR);` 这行代码将 `MPENTRY_PADDR` 所指向的物理地址转换为内核虚拟地址，并将结果赋值给 `code`。`KADDR()` 是一个宏，用于将物理地址转换为内核虚拟地址。

4. `memmove(code, mpentry_start, mpentry_end - mpentry_start);` 这行代码将 `mpentry_start` 和 `mpentry_end` 之间的内容（即 AP 引导代码）复制到 `code` 所指向的地址（即 `MPENTRY_PADDR` 所指向的物理地址）。`memmove()` 是一个标准的 C 函数，用于复制内存区域。

然后，BSP 通过发送启动 IPI（Inter-Processor Interrupt，处理器间中断）来启动 AP。AP 会在 `MPENTRY_PADDR` 指定的地址开始执行其引导代码。

```c
// Boot each AP one at a time
for (c = cpus; c < cpus + ncpu; c++) {
	if (c == cpus + cpunum())  // We've started already.
		continue;

	// Tell mpentry.S what stack to use
	mpentry_kstack = percpu_kstacks[c - cpus] + KSTKSIZE;
	// Start the CPU at mpentry_start
	lapic_startap(c->cpu_id, PADDR(code));
	// Wait for the CPU to finish some basic setup in mp_main()
	while(c->cpu_status != CPU_STARTED)
		;
}
```

遍历所有的处理器。对于每一个处理器，首先检查它是否已经启动。如果已经启动，则跳过这个处理器。否则，设置这个处理器的栈，然后通过 `lapic_startap` 函数启动这个处理器。`lapic_startap` 函数会发送一个 IPI 来启动目标处理器。

在处理器启动后，会执行 `mpentry_start` 到 `mpentry_end` 之间的代码。在这段代码执行完毕后，处理器的状态会被设置为 `CPU_STARTED`。`boot_aps` 函数会等待处理器的状态变为 `CPU_STARTED`，然后继续启动下一个处理器。

总的来说，这段代码通过发送 IPI 来启动非引导处理器，然后等待处理器完成初始化。这是一个典型的使用 IPI 进行处理器间同步的例子。

### IPI 处理器间中断

IPI，全称为 Inter-Processor Interrupt，即处理器间中断，是一种用于多处理器系统中的通信机制。在多处理器系统中，一个处理器可以通过发送 IPI 来中断另一个处理器，以便通知它执行某些任务。

例如，当一个处理器改变了内存的某个部分，可能需要通知其他处理器刷新其缓存。这时，它就可以发送一个 IPI 来通知其他处理器。

IPI 也可以用于实现任务调度。例如，当一个处理器过载时，操作系统可以通过发送 IPI 来通知另一个处理器接管一些任务。

总的来说，IPI 是多处理器系统中处理器间同步和通信的重要机制。下面是使用 IPI 中断的具体代码。

```c
// 启动额外的处理器并运行指定地址的入口代码
// 参见多处理器规范的附录B
void
lapic_startap(uint8_t apicid, uint32_t addr)
{
	int i;
	uint16_t *wrv;

	// "BSP必须将CMOS关机代码初始化为0AH
	// 并将热重启向量（位于40:67的DWORD）指向
	// AP启动代码，然后才能执行[通用启动算法]。"
	outb(IO_RTC, 0xF);  // 偏移0xF是关机代码
	outb(IO_RTC+1, 0x0A);
	wrv = (uint16_t *)KADDR((0x40 << 4 | 0x67));  // 热重启向量
	wrv[0] = 0;
	wrv[1] = addr >> 4;

	// "通用启动算法。"
	// 发送INIT（电平触发）中断以重置其他CPU。
	lapicw(ICRHI, apicid << 24);
	lapicw(ICRLO, INIT | LEVEL | ASSERT);
	microdelay(200);
	lapicw(ICRLO, INIT | LEVEL);
	microdelay(100);    // 应该是10ms，但在Bochs中太慢了！

	// 发送启动IPI（两次！）以进入代码。
	// 正常的硬件应该只在由于INIT而处于停止状态时接受STARTUP。
	// 所以第二次应该会被忽略，但这是官方Intel算法的一部分。
	// Bochs对第二次发送的STARTUP有所抱怨。对Bochs来说，这是不幸的。
	for (i = 0; i < 2; i++) {
		lapicw(ICRHI, apicid << 24);
		lapicw(ICRLO, STARTUP | (addr >> 12));
		microdelay(200);
	}
}
```

在 `lapic_startap` 函数中，用于启动其他处理器（AP）并运行指定地址的入口代码。这个过程涉及到了 IPI（Inter-Processor Interrupt，处理器间中断）。

首先，函数设置了 CMOS 的关机代码和热重启向量，以指向 AP 启动代码。这是在执行通用启动算法之前必须完成的步骤。

然后，函数通过发送 INIT 中断来重置其他处理器。这个中断是电平触发的，发送后会等待一段时间，然后再次发送 INIT 中断，但这次不再触发。这个过程是为了确保其他处理器已经被正确地重置。

接下来，函数发送两次启动 IPI，以使处理器进入指定地址的代码。根据 Intel 的官方算法，正常的硬件只会在由于 INIT 而处于停止状态时接受 STARTUP。因此，第二次发送的 STARTUP 应该会被忽略。但是，为了遵循官方算法，这里还是发送了两次。

总的来说，这段代码通过发送 IPI 来重置和启动其他处理器，然后等待处理器进入指定地址的代码。这是一个典型的使用 IPI 进行处理器间同步的例子。

### AP 和 BSP 启动代码的差异

`kern/mpentry.S` 和 `boot/boot.S` 都是启动代码，但它们的运行环境和目标不同。`boot/boot.S` 是 BIOS 加载的第一段代码，它的目标是切换到保护模式，设置好分页，然后加载并跳转到内核。

而 `kern/mpentry.S` 是在内核中用于启动其他处理器的代码。当启动其他处理器（AP）时，BIOS 会将 AP 设置为实模式，并从预设的物理地址开始执行代码。因此，我们需要将 `kern/mpentry.S` 编译为可以在物理地址运行的代码，这就是 `MPBOOTPHYS` 宏的目的。

`MPBOOTPHYS` 宏将 `kern/mpentry.S` 中的所有地址都转换为物理地址。这是因为在 AP 启动的早期阶段，分页还没有被设置，处理器还在实模式下运行，此时处理器只能访问物理地址。

`MPBOOTPHYS` 宏的定义如下：

```
#define MPBOOTPHYS(s) ((s) - mpentry_start + MPENTRY_PADDR)
```

这个宏接受一个参数 `s`，然后将 `s` 减去 `mpentry_start` 的地址，再加上 `MPENTRY_PADDR`。这样做的目的是将链接时的虚拟地址转换为运行时的物理地址。

在 `kern/mpentry.S` 文件中，`mpentry_start` 是该文件中代码的起始地址，而 `MPENTRY_PADDR` 是在 `inc/memlayout.h` 文件中定义的物理地址，其值为 `0x7000`。

如果在 `kern/mpentry.S` 中省略 `MPBOOTPHYS` 宏，那么生成的代码将无法在 AP 启动的早期阶段正确执行，因为那时的地址空间还是物理地址空间，而不是内核的虚拟地址空间。

而在 `boot/boot.S` 中，由于它是在没有开启分页的实模式下运行的，所以它直接使用物理地址，不需要进行地址转换，因此不需要 `MPBOOTPHYS` 宏。

### CPU 内核

因为多个 CPU 可以同时陷入内核，所以我们需要为每个处理器提供一个单独的内核栈，以防止它们干扰彼此的执行。数组`percpu_kstacks[NCPU][KSTKSIZE]`为 NCPU 的内核栈预留了空间。

此前将`bootstack`引用的物理内存映射为 BSP 的内核栈，就在`KSTACKTOP`下面。同样，此时需要把每个 CPU 的内核栈映射到这个区域，用保护页作为它们之间的缓冲。CPU 0 的栈仍然会从`KSTACKTOP`向下增长；CPU 1 的栈将从 CPU 0 栈的底部向下`KSTKGAP`字节开始，以此类推。

每个 CPU 都需要一个任务状态段（TSS）来指定每个 CPU 的内核栈在哪里。CPU i 的 TSS 存储在`cpus[i].cpu_ts`中，相应的 TSS 描述符定义在 GDT 条目`gdt[(GD_TSS0 >> 3) + i]`中。在`kern/trap.c`中定义的全局变量`ts`将不再有用。
