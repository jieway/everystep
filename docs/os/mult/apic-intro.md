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

接下来分点详细讲解。

### 为 LAPIC 设置虚拟内存

首先将 LAPIC（本地高级可编程中断控制器）的物理内存映射到虚拟内存中，以便我们可以在代码中访问它。

```cpp
lapic = mmio_map_region(lapicaddr, 4096);
```

`lapicaddr` 是 LAPIC 的物理地址，它是在系统启动时由 BIOS 设置的。LAPIC 是一个硬件设备，它的寄存器是映射在物理内存中的。为了在代码中访问这些寄存器，我们需要将它们映射到虚拟内存中。

`mmio_map_region` 是一个函数，它的作用是将物理内存映射到虚拟内存中。这个函数接受两个参数：要映射的物理地址和映射的大小。在这个例子中，我们要映射的是 LAPIC 的物理地址，大小是 4096 字节（4KB）。这是因为 LAPIC 的寄存器是在一个 4KB 的内存区域中。

这段代码的结果是，`lapic` 变量现在指向一个虚拟地址，这个虚拟地址映射到了 LAPIC 的物理地址。这样，我们就可以通过 `lapic` 变量来访问 LAPIC 的寄存器了。

这是做因为在现代操作系统中，我们通常使用虚拟内存来访问内存。虚拟内存为我们提供了一种抽象，使我们可以像操作连续的内存一样操作物理内存，即使物理内存可能是分散的。此外，虚拟内存还提供了一种保护机制，使我们可以控制哪些内存区域可以被访问，以及如何访问。因此，我们需要将 LAPIC 的物理内存映射到虚拟内存中，以便我们可以在代码中访问它。

### 设置伪中断

下面这段代码的目的是启用本地 APIC 并设置伪中断。

```cpp
// Enable local APIC; set spurious interrupt vector.
lapicw(SVR, ENABLE | (IRQ_OFFSET + IRQ_SPURIOUS));
```

`lapicw` 是一个函数，用于写入本地 APIC 的寄存器。它接受两个参数：寄存器的索引和要写入的值。

`SVR` 是本地 APIC 的一个寄存器，称为伪中断寄存器。这个寄存器用于设置伪中断。

`ENABLE` 是一个标志位，用于启用本地 APIC。当这个位被设置时，本地 APIC 就会被启用，可以开始处理中断。

`IRQ_OFFSET + IRQ_SPURIOUS` 是伪中断的值。`IRQ_OFFSET` 是一个常数，用于将中断向量映射到一个不会与其他设备冲突的范围。`IRQ_SPURIOUS` 是假中断的中断号。

这段代码的作用是启用本地 APIC，并设置伪中断。这样，当系统收到一个假中断时，它就会通过这个伪中断找到对应的中断处理程序。

这样做的目的是在多处理器系统中，每个处理器都有一个本地 APIC，用于处理中断。为了使本地 APIC 能够正常工作，我们需要启用它。此外，假中断是一种特殊的中断，它可能会在系统运行中随时发生。为了能够正确处理这种中断，我们需要设置一个伪中断，指向一个能够处理假中断的中断处理程序。

### 初始化和配置本地 APIC 的定时器

这段代码的目的是初始化和配置本地 APIC（高级可编程中断控制器）的定时器。APIC 的定时器是一种硬件设备，它可以定期产生中断，从而使操作系统可以执行定时任务，如调度进程。

```cpp
lapicw(TDCR, X1);
lapicw(TIMER, PERIODIC | (IRQ_OFFSET + IRQ_TIMER));
lapicw(TICR, 10000000);
```

首先，`lapicw(TDCR, X1);` 设置定时器的分频因子。TDCR 是定时器分频配置寄存器，X1 表示不分频，即定时器的频率与总线频率相同。

然后，`lapicw(TIMER, PERIODIC | (IRQ_OFFSET + IRQ_TIMER));` 设置定时器工作模式和中断向量。TIMER 是定时器的配置寄存器，PERIODIC 表示定时器工作在周期模式，即到达设定的计数值后，会自动重载开始下一轮计数；IRQ_OFFSET + IRQ_TIMER 是中断向量，当定时器到达设定的计数值后，会产生一个此向量的中断。

最后，`lapicw(TICR, 10000000);` 设置定时器的初始计数值。TICR 是定时器初始计数寄存器，10000000 是初始计数值，定时器会从这个值开始倒计数，到 0 时产生一个中断。

这样做的目的是在操作系统中，定时器是非常重要的一种硬件设备。它可以定期产生中断，使得操作系统可以执行定时任务，如调度进程。此外，通过改变定时器的计数值，我们还可以改变操作系统的调度频率，从而影响系统的性能。因此，我们需要在系统启动时初始化和配置定时器，以便后续使用。

### 处理多处理器系统中的本地 APIC 中断

这段代码的目的是在多处理器系统中处理本地高级可编程中断控制器（Local APIC）的中断。在这种系统中，每个处理器都有一个本地 APIC，用于处理中断。特别的，引导处理器（BSP）需要从 8259A 芯片获取中断。

```cpp
if (thiscpu != bootcpu)
 lapicw(LINT0, MASKED);
```

在这段代码中，首先检查当前处理器（`thiscpu`）是否是引导处理器（`bootcpu`）。如果不是，那么就通过调用`lapicw`函数来禁用 LINT0 中断。这是因为在多处理器系统中，只有 BSP 需要从 8259A 芯片获取中断。

为什么要这样做呢？这是因为在多处理器系统中，每个处理器都有一个本地 APIC，用于处理中断。然而，只有 BSP 需要从 8259A 芯片获取中断。因此，对于非 BSP 的处理器，我们需要禁用 LINT0 中断，以避免处理不必要的中断。这样可以提高系统的效率，避免不必要的中断处理开销。

### 禁用所有处理器的非屏蔽中断（NMI）

接下来是禁用所有处理器的非屏蔽中断（NMI）。非屏蔽中断是一种特殊类型的中断，它可以在任何时候发生，即使处理器正在处理另一个中断。因此，非屏蔽中断可能会导致处理器在处理其他中断的过程中被打断，这可能会导致系统的不稳定。

```cpp
// Disable NMI (LINT1) on all CPUs
lapicw(LINT1, MASKED);
```

在这段代码中，`lapicw`函数被用来写入 Local APIC 的寄存器。`LINT1`是寄存器的索引，`MASKED`是要写入的值。`MASKED`的意思是禁用中断。

为什么要禁用 NMI 呢？这是因为 NMI 是一种特殊的中断，它可以在任何时候发生，即使处理器正在处理另一个中断。这可能会导致处理器在处理其他中断的过程中被打断，这可能会导致系统的不稳定。因此，为了保证系统的稳定性，我们选择禁用 NMI。

### 禁用性能计数器溢出中断

这段代码的目的是禁用性能计数器溢出中断。性能计数器是处理器中的一个硬件组件，用于测量处理器的各种性能指标，如指令数、缓存命中率等。当性能计数器的值达到预设的阈值时，处理器会产生一个性能计数器溢出中断。

```cpp
// Disable performance counter overflow interrupts
// on machines that provide that interrupt entry.
if (((lapic[VER]>>16) & 0xFF) >= 4)
 lapicw(PCINT, MASKED);
```

在这段代码中，首先检查处理器的版本号。如果版本号大于或等于 4，那么处理器支持性能计数器溢出中断。然后，通过调用`lapicw`函数来禁用性能计数器溢出中断。`PCINT`是中断向量的索引，`MASKED`是要写入的值。`MASKED`的意思是禁用中断。

为什么要禁用性能计数器溢出中断呢？这是因为性能计数器溢出中断主要用于性能分析和调试，而在正常的系统运行中，我们通常不需要这个中断。如果不禁用这个中断，那么每次性能计数器的值达到阈值时，处理器都会被打断来处理这个中断，这可能会对系统的性能产生影响。因此，为了提高系统的运行效率，我们选择禁用性能计数器溢出中断。

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

接下来对所有 AP 执行 `lapic_startap()` 函数来发送启动 IPI，启动 AP。这段代码的目的是启动每一个应用程序处理器（AP）。以下是代码的主要部分的解释：

1. `for (c = cpus; c < cpus + ncpu; c++)`：这是一个循环，遍历所有的 CPU。`cpus` 是一个数组，包含了系统中所有的 CPU，`ncpu` 是 CPU 的数量。

2. `if (c == cpus + cpunum())`：这是一个判断语句，检查当前的 CPU 是否已经启动。如果已经启动，就跳过当前的循环迭代。

3. `mpentry_kstack = percpu_kstacks[c - cpus] + KSTKSIZE`：这行代码设置了每个 CPU 的内核栈。`percpu_kstacks` 是一个二维数组，每个 CPU 都有一个对应的栈，`KSTKSIZE` 是栈的大小。

4. `lapic_startap(c->cpu_id, PADDR(code))`：这行代码启动了当前的 CPU。`lapic_startap()` 是一个函数，接受两个参数：CPU 的 ID 和引导代码的物理地址。`PADDR()` 是一个宏，用于将内核虚拟地址转换为物理地址。

5. `while(c->cpu_status != CPU_STARTED)`：这是一个循环，等待当前的 CPU 完成基本的设置。`CPU_STARTED` 是一个常量，表示 CPU 已经启动。
