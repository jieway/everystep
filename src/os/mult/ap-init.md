本文介绍了在对称多处理器系统（SMP）中，每个处理器（CPU）都有独立的内核栈的重要性，避免了并发操作可能导致的数据混乱。通过在内核页目录 kern_pgdir 中为每个 CPU 映射内核栈，确保了每个 CPU 在执行内核代码时都使用自己的内核栈。

文章详细讲解了如何通过循环遍历每个 CPU，使用 boot_map_region 函数在虚拟地址区域 `[KSTACKTOP-PTSIZE, KSTACKTOP)` 中映射每个 CPU 的栈。进一步介绍了在多核系统中初始化任务状态段（TSS）和中断描述符表（IDT）的实现细节。重点在于为每个 CPU 设置正确的 TSS 和 IDT，以确保新启动的 CPU 能够正确处理中断和执行代码。文章最后，通过示例展示了 GDT 的定义，包括内核代码段、内核数据段、用户代码段、用户数据段以及每个 CPU 的 TSS 描述符，以实现多核环境下的正确切换和处理。

### 多处理器内核栈初始化细节

在对称多处理器（SMP）系统中，每个处理器（CPU）都有自己的内核栈。这是因为每个 CPU 都可能独立地运行不同的内核代码，这些代码可能会在不同的时间对其各自的内核栈进行推送和弹出操作。如果所有 CPU 共享一个内核栈，那么这些并发操作可能会导致数据混乱和不可预测的行为。

因此，为了保证每个 CPU 都有自己独立的内核栈空间，我们需要在内核页目录 `kern_pgdir` 中为每个 CPU 设置内核栈的映射。这样，每个 CPU 在执行内核代码时，都会使用其自己的内核栈，从而避免了上述的问题。

接下来讲解如何在内核页目录 `kern_pgdir` 中为每个 CPU 设置内核栈的映射。在代码中通过循环遍历每个 CPU，并使用 `boot_map_region` 函数在虚拟地址区域 `[KSTACKTOP-PTSIZE, KSTACKTOP)` 中映射每个 CPU 的栈。这个区域被划分为多个部分，每个部分对应一个 CPU 的内核栈。下面是对应区域的图形化表示：

```
KERNBASE, ---->  +------------------------------+ 0xf0000000      --+
KSTACKTOP        |     CPU0's Kernel Stack      | RW/--  KSTKSIZE   |
                 | - - - - - - - - - - - - - - -|                   |
                 |      Invalid Memory (*)      | --/--  KSTKGAP    |
                 +------------------------------+                   |
                 |     CPU1's Kernel Stack      | RW/--  KSTKSIZE   |
                 | - - - - - - - - - - - - - - -|                 PTSIZE
                 |      Invalid Memory (*)      | --/--  KSTKGAP    |
                 +------------------------------+                   |
                 :              .               :                   |
                 :              .               :                   |
MMIOLIM ------>  +------------------------------+ 0xefc00000      --+
```

每个 CPU 的内核栈从虚拟地址 `kstacktop_i = KSTACKTOP - i * (KSTKSIZE + KSTKGAP)` 向下增长，并且被划分为两部分：

- `[kstacktop_i - KSTKSIZE, kstacktop_i)`：这部分由物理内存支持。
- `[kstacktop_i - (KSTKSIZE + KSTKGAP), kstacktop_i - KSTKSIZE)`：这部分没有被物理内存支持；所以如果内核溢出其栈，它将触发错误，而不是覆盖另一个 CPU 的栈。这被称为 "guard page"。

这个映射的虚拟地址从 `KSTACKTOP - KSTKSIZE - i * (KSTKSIZE + KSTKGAP)` 开始，大小为 `KSTKSIZE`，物理地址为 `percpu_kstacks[i]` 对应的物理地址，权限为 `PTE_W`（即，可写）。

在函数的实现中，使用了一个循环来遍历每个 CPU，并使用 `boot_map_region` 函数来设置每个 CPU 的内核栈的映射。这个映射的虚拟地址从 `KSTACKTOP - KSTKSIZE - i * (KSTKSIZE + KSTKGAP)` 开始，大小为 `KSTKSIZE`，物理地址为 `percpu_kstacks[i]` 对应的物理地址，权限为 `PTE_W`（即，可写）。

### AP 启动过程

在多处理器系统中，引导处理器（BSP）负责启动操作系统，然后通过发送特殊的中断请求（IPI）来启动其他的 AP。每个 AP 都是在收到引导 CPU 发送的 STARTUP IPI（中断请求）后启动的。AP 将以实模式启动，CS:IP 设置为 XY00:0000，其中 XY 是与 STARTUP 一起发送的 8 位值。因此，AP 启动时的汇编代码必须从 4096 字节边界开始。

因为这段代码将 DS（数据段寄存器）设置为零，所以它必须从物理内存的低 2^16 字节的地址运行。

在 init.c 中的 boot_aps()函数将这段代码复制到 MPENTRY_PADDR（满足上述限制）。然后，对于每个 AP，它在 mpentry_kstack 中存储预分配的每核栈的地址，发送 STARTUP IPI，并等待这段代码确认它已经启动（这在 init.c 中的 mp_main 中发生）。

这段代码与 boot/boot.S 相似，除了以下两点：

- 它不需要启用 A20
- 它使用 MPBOOTPHYS 来计算其符号的绝对地址，而不是依赖链接器来填充它们。

### 为什么 AP 以实模式启动？

AP（辅助处理器）以实模式启动是因为在计算机启动时，所有的 x86 处理器都会以实模式启动。实模式是 x86 处理器的初始状态，它只能访问 1MB 的内存，没有内存保护，也不支持多任务。AP 会执行位于这个地址的代码。这段代码通常会将处理器切换到保护模式或长模式，这样处理器就可以访问更多的内存，支持内存保护和多任务等特性。在你的代码中，这个过程在`mpentry_start`标签开始的地方进行。

所以，AP 以实模式启动是由于 x86 处理器的硬件设计和多处理器规范的要求。

### 同 boot/boot.S 相比，为什么不需要启用 A20 ？

在实模式下，CPU 只能访问 1MB 的内存，但由于地址回绕的问题，实际上可以访问到 1MB+64KB 的内存。当 A20 线被禁用时，任何尝试访问超过 1MB 的内存的操作都会回绕到 64KB-1MB 的内存区域。启用 A20 线可以解决这个问题，允许 CPU 访问超过 1MB 的内存。

然而，在保护模式或长模式下，CPU 可以访问的内存远超 1MB，而且没有地址回绕的问题。因此，启用 A20 线在这些模式下并不是必需的。

在代码中，AP（辅助处理器）在接收到 STARTUP IPI 后，会以实模式启动，然后执行的代码会将处理器切换到保护模式或长模式。因此，这段代码不需要启用 A20 线。

另一方面，`boot/boot.S`是引导加载器的一部分，它在实模式下运行，需要处理超过 1MB 的内存，因此需要启用 A20 线。

### 绝对地址计算方式

为什么使用 MPBOOTPHYS 来计算其符号的绝对地址，而不是依赖链接器来填充它们？

在代码中，使用 MPBOOTPHYS 宏来计算符号的绝对地址是因为这段代码会被复制到一个固定的物理地址（MPENTRY_PADDR）处执行，而不是在其被链接的位置执行。因此，我们不能依赖链接器来填充这些符号的地址，而需要手动计算它们在运行时的实际地址。

MPBOOTPHYS(s)宏的作用是计算出符号 s 在被复制到 MPENTRY_PADDR 后的实际物理地址。它通过将符号 s 的链接地址减去 mpentry_start 的链接地址，然后加上 MPENTRY_PADDR，得到符号 s 的实际物理地址。

在代码中，`MPENTRY_PADDR`被定义为 0x7000，这是一个满足上述要求的地址。`boot_aps()`函数会将`mpentry.S`中的代码复制到这个地址，然后向 AP 发送 STARTUP IPI，AP 就会开始执行这段代码。

`boot/boot.S`是 BSP 的启动汇编代码，和`kern/mpentry.S` 相比，它们的处理方式有所不同。

首先，`boot/boot.S`是引导加载器的代码，它在系统启动时被执行。在编译阶段，链接器会将`boot/boot.S`链接到一个可执行文件中，这个可执行文件会被写入到硬盘的引导扇区。当计算机启动时，BIOS 会加载并执行引导扇区的内容，也就是`boot/boot.S`的代码。

具体的链接过程如下：

1. 编译器将`boot/boot.S`编译成对象文件。
2. 链接器将对象文件链接成一个可执行文件。
3. 写入硬盘的引导扇区。

然后，`kern/mpentry.S`是用于启动辅助处理器（AP）的代码。在系统运行时，主处理器（BSP）会将`kern/mpentry.S`的代码复制到一个特定的物理地址（`MPENTRY_PADDR`），然后向 AP 发送 STARTUP IPI，AP 就会开始执行这段代码。

具体的复制过程如下：

1. 编译器将`kern/mpentry.S`编译成对象文件。
2. 在系统运行时，`boot_aps()`函数（在`kern/init.c`中）会将`kern/mpentry.S`的代码复制到`MPENTRY_PADDR`地址。下面是具体的复制代码。

```c
	extern unsigned char mpentry_start[], mpentry_end[];
	code = KADDR(MPENTRY_PADDR);
	memmove(code, mpentry_start, mpentry_end - mpentry_start);
```

3. BSP 向 AP 发送 STARTUP IPI，AP 开始执行`MPENTRY_PADDR`地址处的代码。

这两个过程的主要区别在于，`boot/boot.S`的代码是在系统启动时被执行，而`kern/mpentry.S`的代码是在系统运行时被复制和执行的。

### AP 启动 C 语言部分

这部分内容讲解 AP 启动后执行的 C 语言代码。这段代码是在多处理器环境中启动应用处理器（AP）的主要函数。当引导处理器（BP）启动并初始化系统。

```c
void
mp_main(void)
{
	// We are in high EIP now, safe to switch to kern_pgdir
	lcr3(PADDR(kern_pgdir));
	cprintf("SMP: CPU %d starting\n", cpunum());

	lapic_init();
	env_init_percpu();
	trap_init_percpu();
	xchg(&thiscpu->cpu_status, CPU_STARTED); // tell boot_aps() we're up

	// ...
}
```

函数的主要步骤如下：

`lcr3(PADDR(kern_pgdir));` 这行代码的作用就是将页目录基址寄存器（CR3）设置为内核页目录的物理地址，也就是切换到内核的页表。CR3 寄存器存储的是当前活动页目录的物理地址。

`cprintf("SMP: CPU %d starting\n", cpunum());`：这行代码打印一条消息，表明当前的 CPU 已经开始启动。这样做的目的是为了让开发者知道哪个 CPU 正在启动。

`lapic_init();`：这行代码初始化了本地 APIC。APIC 是高级可编程中断控制器的缩写，它用于在多处理器系统中处理中断。这样做的目的是为了让新启动的 CPU 能够正确处理中断。

`env_init_percpu();`：这行代码为当前 CPU 初始化环境。这样做的目的是为了让新启动的 CPU 有一个正确的运行环境。

`trap_init_percpu();`：这行代码为当前 CPU 初始化陷阱处理程序。这样做的目的是为了让新启动的 CPU 能够正确处理陷阱。

`xchg(&thiscpu->cpu_status, CPU_STARTED);`：这行代码将当前 CPU 的状态设置为已启动。这是一个原子操作，它同时读取和写入`thiscpu->cpu_status`。这样做的目的是为了让引导处理器知道新启动的 CPU 已经完成了初始化。

总的来说，这段代码的目的是为了启动新的 CPU，并为其设置正确的运行环境。

### 为什么要切换页表？

在多处理器系统中，每个处理器都有自己的页表，用于管理自己的虚拟内存到物理内存的映射。当一个新的处理器启动时，它需要加载正确的页表，以便能够正确地访问内存。

`lcr3(PADDR(kern_pgdir));` 这行代码的作用就是将页目录基址寄存器（CR3）设置为内核页目录的物理地址，也就是切换到内核的页表。CR3 寄存器存储的是当前活动页目录的物理地址。

切换之前，新启动的处理器可能没有有效的页表，或者使用的是 BIOS 提供的页表，这个页表可能并不符合操作系统的需求。例如，它可能没有包含操作系统内核所在的地址空间，或者没有正确地设置页的权限。

切换之后，处理器就可以使用内核的页表了。这个页表包含了操作系统内核的地址空间，并且正确地设置了页的权限。这样，处理器就可以正确地访问内核代码和数据，以及用户进程的地址空间了。

在多核处理器系统中，所有的处理器都使用相同的`kern_pgdir`。这是因为`kern_pgdir`是内核的页目录，它包含了内核的地址空间。由于内核代码和数据是共享的，所以所有的处理器都需要访问相同的内核地址空间，因此它们都使用相同的`kern_pgdir`。

当然，每个处理器都有自己的页目录基址寄存器（CR3），用于存储当前活动的页目录的物理地址。当处理器需要切换到用户模式时，它会通过改变 CR3 的值来加载对应的用户进程的页目录。但是在内核模式下，所有处理器的 CR3 都指向`kern_pgdir`。

### 为当前 CPU 初始化环境

这段代码的目的是初始化每个处理器的段寄存器和全局描述符表（GDT）。在 x86 架构中，段寄存器和全局描述符表是用于内存管理和保护的重要组成部分。

1. `lgdt(&gdt_pd);`：这行代码加载全局描述符表（GDT）。GDT 包含了内核代码段、内核数据段、用户代码段和用户数据段的描述符。这样做的目的是为了让处理器知道如何访问内存。

2. `asm volatile("movw %%ax,%%gs" : : "a" (GD_UD|3));` 和 `asm volatile("movw %%ax,%%fs" : : "a" (GD_UD|3));`：这两行代码将 GS 和 FS 寄存器的值设置为用户数据段的选择子。这样做的目的是为了让处理器在用户模式下能够正确地访问数据。

3. `asm volatile("movw %%ax,%%es" : : "a" (GD_KD));`、`asm volatile("movw %%ax,%%ds" : : "a" (GD_KD));` 和 `asm volatile("movw %%ax,%%ss" : : "a" (GD_KD));`：这三行代码将 ES、DS 和 SS 寄存器的值设置为内核数据段的选择子。这样做的目的是为了让处理器在内核模式下能够正确地访问数据。

4. `asm volatile("ljmp %0,$1f\n 1:\n" : : "i" (GD_KT));`：这行代码将 CS 寄存器的值设置为内核代码段的选择子，并跳转到标签 1。这样做的目的是为了让处理器在内核模式下能够正确地执行代码。

5. `lldt(0);`：这行代码清除了本地描述符表（LDT）。在这个系统中，LDT 没有被使用，所以清除 LDT 是为了防止其可能存在的旧数据对系统造成影响。

总的来说，这段代码的目的是为了设置正确的内存访问环境，以便处理器能够正确地执行代码和访问数据。

### 单核初始化 TSS 和 IDT 的实现细节

下面的代码是只有一个 CPU 时初始化并任务状态段（Task State Segment，TSS）和中断描述符表（Interrupt Descriptor Table，IDT）的实现细节。随后要将其改为支持多核。

```c
void
trap_init_percpu(void)
{
	ts.ts_esp0 = KSTACKTOP;
	ts.ts_ss0 = GD_KD;
	ts.ts_iomb = sizeof(struct Taskstate);

	gdt[GD_TSS0 >> 3] = SEG16(STS_T32A, (uint32_t) (&ts),
					sizeof(struct Taskstate) - 1, 0);
	gdt[GD_TSS0 >> 3].sd_s = 0;

	ltr(GD_TSS0);
	lidt(&idt_pd);
}
```

首先，设置 TSS 以便在陷入内核时获取正确的栈。这里的 `ts.ts_esp0 = KSTACKTOP;` 是当前 CPU 的内核栈顶，`ts.ts_ss0 = GD_KD;` 设置的是内核数据段选择子。

然后，初始化全局描述符表（Global Descriptor Table，GDT）中的 TSS 槽。`gdt[GD_TSS0 >> 3] = SEG16(STS_T32A, (uint32_t) (&ts), sizeof(struct Taskstate) - 1, 0);` 这行代码设置了 GDT 中的 TSS 描述符，其中 `GD_TSS0 >> 3` 是 TSS 描述符的索引，`&(ts)` 是 TSS 的地址，`sizeof(struct Taskstate) - 1` 是 TSS 的大小。`gdt[GD_TSS0 >> 3].sd_s = 0;` 这行代码将 TSS 描述符的 `sd_s` 字段设置为 0，表示这是一个系统段。

接下来，加载 TSS 选择子。`ltr(GD_TSS0);` 这行代码加载了 TSS 选择子到任务寄存器（Task Register，TR）。注意，TSS 选择子的底部三位是特殊的，我们将它们保留为 0。

最后，加载 IDT。`lidt(&idt_pd);` 这行代码加载了 IDT 的基地址和限制到中断描述符表寄存器（Interrupt Descriptor Table Register，IDTR）。

### 多核 TSS 和 IDT 的实现细节

接下来需要将此前的单核任务状态段（Task State Segment，TSS）和中断描述符表（Interrupt Descriptor Table，IDT）改为多核实现。

```c
void
trap_init_percpu(void)
{
	int cid = thiscpu->cpu_id;
	thiscpu->cpu_ts.ts_esp0 = KSTACKTOP - cid * (KSTKSIZE + KSTKGAP);
	thiscpu->cpu_ts.ts_ss0 = GD_KD;

	gdt[(GD_TSS0 >> 3)+cid] = SEG16(STS_T32A, (uint32_t) (&(thiscpu->cpu_ts)),
					sizeof(struct Taskstate), 0);
	gdt[(GD_TSS0 >> 3)+cid].sd_s = 0;

	ltr(GD_TSS0+8*cid);
	lidt(&idt_pd);
}
```

首先，获取当前 CPU 的 ID，然后设置 TSS 以便在陷入内核时获取正确的栈。这里的 `thiscpu->cpu_ts.ts_esp0` 是当前 CPU 的内核栈顶，`KSTACKTOP - cid * (KSTKSIZE + KSTKGAP)` 计算的是每个 CPU 的内核栈顶地址。`thiscpu->cpu_ts.ts_ss0 = GD_KD;` 设置的是内核数据段选择子。当发生从用户态到内核态的中断时，CPU 会自动从 TSS 中读取 `ts_esp0` 和 `ts_ss0` 这两个字段的值，分别设置堆栈指针寄存器（ESP）和堆栈段寄存器（SS）。因此，`ts.ts_ss0 = GD_KD;` 这行代码实际上是在设置内核态堆栈的段选择子，以便在发生中断时能正确地切换到内核堆栈。

然后，初始化全局描述符表（Global Descriptor Table，GDT）中的 TSS 槽。`gdt[(GD_TSS0 >> 3)+cid] = SEG16(STS_T32A, (uint32_t) (&(thiscpu->cpu_ts)), sizeof(struct Taskstate), 0);` 这行代码设置了 GDT 中的 TSS 描述符，其中 `GD_TSS0 >> 3` 是 TSS 描述符的索引，`cid` 是当前 CPU 的 ID，`&(thiscpu->cpu_ts)` 是 TSS 的地址，`sizeof(struct Taskstate)` 是 TSS 的大小。`gdt[(GD_TSS0 >> 3)+cid].sd_s = 0;` 这行代码将 TSS 描述符的 `sd_s` 字段设置为 0，表示这是一个系统段。

接下来，加载 TSS 选择子。`ltr(GD_TSS0+8*cid);` 这行代码加载了 TSS 选择子到任务寄存器（Task Register，TR）。注意，TSS 选择子的底部三位是特殊的，我们将它们保留为 0。

最后，加载 IDT。`lidt(&idt_pd);` 这行代码加载了 IDT 的基地址和限制到中断描述符表寄存器（Interrupt Descriptor Table Register，IDTR）。

### 全局描述符表 GDT

在 x86 架构中，全局描述符表（GDT）是一种数据结构，用于定义各种类型的段。这些段包括内核段、用户段、任务状态段（TSS）等。每个段都有一个对应的段描述符，存储在 GDT 中。CPU 通过查询 GDT 来获取段的属性和位置。

每个段描述符定义了一个段的属性和位置。这里的段可以被用于多种目的，虽然我们不使用它们的内存映射能力，但我们需要它们来切换特权级别。

在 x86 架构中，特权级别是通过段选择子（segment selector）的特权级别（Descriptor Privilege Level，DPL）和当前特权级别（Current Privilege Level，CPL）来控制的。当 CPU 执行特权级别更高（数字更小）的代码时，需要通过加载相应的段选择子来切换特权级别。

```c
struct Segdesc gdt[NCPU + 5] =
{
	// 0x0 - unused (always faults -- for trapping NULL far pointers)
	SEG_NULL,

	// 0x8 - kernel code segment
	[GD_KT >> 3] = SEG(STA_X | STA_R, 0x0, 0xffffffff, 0),

	// 0x10 - kernel data segment
	[GD_KD >> 3] = SEG(STA_W, 0x0, 0xffffffff, 0),

	// 0x18 - user code segment
	[GD_UT >> 3] = SEG(STA_X | STA_R, 0x0, 0xffffffff, 3),

	// 0x20 - user data segment
	[GD_UD >> 3] = SEG(STA_W, 0x0, 0xffffffff, 3),

	// Per-CPU TSS descriptors (starting from GD_TSS0) are initialized
	// in trap_init_percpu()
	[GD_TSS0 >> 3] = SEG_NULL
};
```

在这个 GDT 中，内核模式和用户模式的段是分开的。内核和用户的段是相同的，除了 DPL（Descriptor Privilege Level，描述符特权级别）。为了加载 SS 寄存器，CPL（Current Privilege Level，当前特权级别）必须等于 DPL。因此，我们必须为用户和内核复制段。

具体来说，SEG 宏在定义 gdt 时使用的最后一个参数指定了该描述符的 DPL：0 代表内核，3 代表用户。

这个 GDT 包含以下段：

- 0x0 - 未使用（总是出错 -- 用于捕获 NULL 远指针）
- 0x8 - 内核代码段
- 0x10 - 内核数据段
- 0x18 - 用户代码段
- 0x20 - 用户数据段
- 每个 CPU 的 TSS 描述符（从 GD_TSS0 开始）在 trap_init_percpu()中初始化

上述代码中 GDT 的每个条目都是一个段描述符，定义了一个段的属性和位置。这些段包括内核代码段、内核数据段、用户代码段、用户数据段和任务状态段（Task State Segment，TSS）。这些段的 DPL 分别设置为 0（内核模式）和 3（用户模式），以此来实现特权级别的切换。

例如，当 CPU 从用户模式切换到内核模式时，会加载内核代码段和内核数据段的段选择子，从而将 CPL 切换到 0；反之，当 CPU 从内核模式切换到用户模式时，会加载用户代码段和用户数据段的段选择子，从而将 CPL 切换到 3。

在这个 GDT 中，内核模式和用户模式的段是分开的。内核和用户的段是相同的，除了 DPL（Descriptor Privilege Level，描述符特权级别）。为了加载 SS 寄存器，CPL（Current Privilege Level，当前特权级别）必须等于 DPL。

具体来说，SEG 宏在定义 gdt 时使用的最后一个参数指定了该描述符的 DPL：0 代表内核，3 代表用户。
