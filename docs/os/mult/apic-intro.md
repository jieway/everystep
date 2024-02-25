本文主要讲解了在多处理器系统中，如何通过对称多处理（SMP）和高级可编程中断控制器（APIC）来实现处理器的并行运行。

### 什么是 SMP？

"对称多处理"（SMP）是一种多处理器模型，其中所有的处理器（CPU）对系统资源（如内存和 I/O 总线）具有等效的访问权限。这意味着每个处理器都可以独立地访问任何内存或 I/O 设备。这种模型的优点是它可以提供良好的性能扩展性，因为增加更多的处理器可以直接增加系统的处理能力。

在 SMP 系统中，处理器可以被分为两种类型：

1. 引导程序处理器（Bootstrap Processor，简称 BSP）：BSP 是在系统启动时负责初始化系统和引导操作系统的处理器。它**首先启动**，注意是第一个启动的 CPU，并执行所有的系统初始化任务，包括初始化内存控制器、I/O 子系统等。然后，它加载并启动操作系统。一旦操作系统启动并运行，BSP 就可以像系统中的其他处理器一样执行常规的计算任务。

2. 应用程序处理器（Application Processor，简称 AP）：AP 是在操作系统启动并运行后由 BSP 激活的处理器。一旦被激活，AP 就可以执行常规的计算任务。在多处理器系统中，可以有多个 AP。

综上，第一个启动的 CPU 是 BSP，后续启动的 CPU 是 AP 。在系统启动过程中，哪个处理器作为 BSP 是由硬件和 BIOS 决定的。在这个过程完成后，所有的处理器在功能上都是相同的，都可以执行用户级和内核级的代码。JOS 代码都在 BSP 上运行。

### 什么是 APIC？

APIC 解决了在多处理器系统中分发和处理中断的问题。在没有 APIC 的系统中，所有的中断都会发送到一个中央处理器，这可能会导致处理器过载。通过使用 APIC，每个处理器都可以处理自己的中断，从而提高了系统的整体性能。

APIC（高级可编程中断控制器）是一种硬件设备，用于管理和控制中断。在一个对称多处理（SMP）系统中，每个 CPU 都有一个相应的本地 APIC（LAPIC）单元。本地 APIC 可以接收来自 I/O APIC 的中断，并将其传递给处理器。此外，本地 APIC 还可以发送和接收来自其他本地 APIC 的中断，这使得处理器之间可以相互通信。

### 参数读取细节

当 CPU 执行到 i386_init 时会执行 mp_init 进程参数初始化，随后执行 lapic_init 初始化 APIC 。

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

其中 `mp_init()` 用于将读取到的参数绑定到结构体上，后续会用到这些参数。参数是 Intel 多处理器规范的一部分，用于描述系统的硬件配置，包括处理器、总线、I/O APIC 等的信息。`mp_init()` 函数读取的数据主要来自多处理器配置表，这个配置表由 BIOS 在系统启动时生成，并存储在内存中的特定位置。

在启动应用程序处理器（APs）之前，引导服务处理器（BSP）应首先收集关于多处理器系统的信息，例如 CPU 的总数、它们的 APIC ID 以及 LAPIC 单元的 MMIO 地址。`mp_init()`函数（在`kern/mpconfig.c`中）通过读取位于 BIOS 内存区域的 MP 配置表来获取这些信息。

接下来讲解 `mp_init()` 是如何获取参数的，

在 `mp_init()` 中会先执行 `bootcpu = &cpus[0];`，这行代码的作用是将 `bootcpu` 指针指向 `cpus` 数组的第一个元素。将 `bootcpu` 指向系统中的第一个 CPU，即 BSP。这样，我们就可以通过 `bootcpu` 指针来访问和操作 BSP 的信息。`bootcpu` 是一个全局变量，即 `struct CpuInfo *bootcpu;`，是用来指向启动 CPU（Bootstrap Processor，简称 BSP）的信息的。

因此，`bootcpu` 通常被用来在初始化过程中访问和操作 BSP 的信息。`cpus` 是一个 `CpuInfo` 结构体数组，用于存储系统中所有 CPU 的信息。`CpuInfo` 结构体包含了关于 CPU 的信息，例如 CPU 的 ID，状态等。

接下来 `mp_init` 函数中遍历了多处理器配置表中的每个处理器条目，并为每个处理器设置了相应的 `CpuInfo` 结构。具体来说，它将每个处理器的 ID 设置为其在 `cpus` 数组中的索引，并将 `cpu_status` 设置为 `CPU_STARTED`。如果处理器是引导处理器（BSP），则 `bootcpu` 指针会被设置为指向该处理器的 `CpuInfo` 结构。

### APIC 初始化细节

`lapic_init` 的作用是初始化本地 APIC（高级可编程中断控制器），下面是具体的代码。

```cpp
void lapic_init(void) {
    // 如果 lapicaddr 不存在，则直接返回
    if (!lapicaddr)
        return;

    // 将 LAPIC 的物理地址映射到虚拟内存，以便我们可以访问它
    lapic = mmio_map_region(lapicaddr, 4096);

    // 启用本地 APIC，并设置伪中断向量
    lapicw(SVR, ENABLE | (IRQ_OFFSET + IRQ_SPURIOUS));

    // 设置定时器，使其以总线频率从 lapic[TICR] 倒计时，然后发出中断
    lapicw(TDCR, X1);
    lapicw(TIMER, PERIODIC | (IRQ_OFFSET + IRQ_TIMER));
    lapicw(TICR, 10000000);

    // 如果当前 CPU 不是引导 CPU，则禁用 LINT0
    if (thiscpu != bootcpu)
        lapicw(LINT0, MASKED);

    // 在所有 CPU 上禁用 NMI（LINT1）
    lapicw(LINT1, MASKED);

    // 在提供该中断入口的机器上禁用性能计数器溢出中断
    if (((lapic[VER]>>16) & 0xFF) >= 4)
        lapicw(PCINT, MASKED);

    // 将错误中断映射到 IRQ_ERROR
    lapicw(ERROR, IRQ_OFFSET + IRQ_ERROR);

    // 清除错误状态寄存器（需要连续写入两次）
    lapicw(ESR, 0);
    lapicw(ESR, 0);

    // 确认任何未处理的中断
    lapicw(EOI, 0);

    // 发送 Init Level De-Assert 以同步仲裁 ID
    lapicw(ICRHI, 0);
    lapicw(ICRLO, BCAST | INIT | LEVEL);
    while(lapic[ICRLO] & DELIVS)
        ;

    // 在 APIC 上启用中断（但不在处理器上）
    lapicw(TPR, 0);
}
```

这个函数首先检查 `lapicaddr` 是否存在，如果不存在则直接返回。然后，它将 LAPIC 的物理地址映射到虚拟内存，以便我们可以访问它。接下来，它启用本地 APIC，并设置伪中断向量。然后，它设置定时器，使其以总线频率从 `lapic[TICR]` 倒计时，然后发出中断。如果当前 CPU 不是引导 CPU，则禁用 LINT0。在所有 CPU 上禁用 NMI（LINT1）。在提供该中断入口的机器上禁用性能计数器溢出中断。将错误中断映射到 IRQ_ERROR。清除错误状态寄存器（需要连续写入两次）。确认任何未处理的中断。发送 Init Level De-Assert 以同步仲裁 ID。最后，在 APIC 上启用中断（但不在处理器上）。

### 如何启动其他 CPU ？

下面的代码中 `lapic_startap()` 函数使用 LAPIC 发送 STARTUP IPI 以启动其他 CPU。

在这个实验中，我们使用了 LAPIC 单元的以下基本功能（在 `kern/lapic.c` 中）：读取 LAPIC 标识符（APIC ID）以确定我们的代码当前正在运行在哪个 CPU 上（参见 `cpunum()`）。

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

### BSP 如何启动 AP ？

`lapic_startap` 函数的目的是启动一个指定的应用程序处理器（AP）。以下是函数的主要部分的解释：

1. `outb(IO_RTC, 0xF); outb(IO_RTC+1, 0x0A);`：这两行代码将 CMOS 的关机代码设置为 0x0A。CMOS 是一个用于存储 BIOS 设置和系统时间的内存，地址 0xF 是用于设置关机状态的。这里将其设置为 0x0A，表示执行一个特定的启动序列，这是在执行通用启动算法之前必须的步骤。

2. `wrv = (uint16_t *)KADDR((0x40 << 4 | 0x67)); wrv[0] = 0; wrv[1] = addr >> 4;`：这些代码将热重启向量设置为 AP 启动代码的地址。热重启向量是在内存地址 0x467 的位置，用于存储下一次 CPU 启动时应该执行的代码的物理地址。这是为了让 AP 在启动时知道从哪里开始执行代码。

3. `lapicw(ICRHI, apicid << 24); lapicw(ICRLO, INIT | LEVEL | ASSERT); microdelay(200); lapicw(ICRLO, INIT | LEVEL); microdelay(100);`：这些代码发送 INIT 中断来重置其他的 CPU。这是为了让 AP 进入一个已知的、一致的状态，以便于启动。

4. `for (i = 0; i < 2; i++) { lapicw(ICRHI, apicid << 24); lapicw(ICRLO, STARTUP | (addr >> 12)); microdelay(200); }`：这些代码发送启动 IPI 来进入代码。这也是通用启动算法的一部分。注意，这个过程需要执行两次，这是 Intel 官方算法的一部分。这是为了确保 AP 确实收到了启动 IPI，并开始执行启动代码。

在这个函数中，`lapicw` 是一个辅助函数，用于向本地 APIC 寄存器写入值。`microdelay` 是一个辅助函数，用于延迟一定的微秒数。
