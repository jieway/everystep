这篇文章讲解多核处理器中 AP 的引导代码，即除了第一个启动的 CPU 的执行步骤。

### AP 引导代码从哪里开始执行？

此前已经提及，`boot_aps()`函数将 AP 的入口代码（位于`kern/mpentry.S`）复制到实模式下可寻址的内存位置。这是因为，和 Boot Loader 类似，APs 在启动时也是在实模式下运行的。然而，与 Boot Loader 不同的是，可以控制 AP 开始执行代码的具体位置。在这个例子中，入口代码被复制到了 0x7000（`MPENTRY_PADDR`），这是一个实模式下可寻址的内存位置。

STARTUP IPI 是一种特殊的中断，它可以使处理器从实模式（一种早期的 CPU 操作模式，只能访问 1MB 的内存）切换到保护模式（一种现代的 CPU 操作模式，可以访问所有的内存）。当 AP 收到 STARTUP IPI 后，它会以实模式启动，并将代码段寄存器（CS）和指令指针（IP）设置为 XY00:0000。这里的 XY 是一个 8 位值，它是与 STARTUP IPI 一起发送的。这意味着 AP 将从内存地址 XY00:0000 开始执行代码。

在这个例子中，入口代码被复制到了 0x7000（`MPENTRY_PADDR`），这是一个实模式下可寻址的内存位置。这样，当 AP 收到 STARTUP IPI 后，它会从 0x7000 这个地址开始执行代码。这就是如何控制 AP 执行代码的具体位置的。

这种方式与 Boot Loader 不同，因为 Boot Loader 在系统启动时加载并执行的代码位置是固定的，通常是 0x7C00。但在多处理器系统中，我们可以控制 AP 开始执行代码的具体位置，这为系统提供了更大的灵活性。

接下来详细讲解 `kern/mpentry.S` ，从中了解如何启动 AP 。

```
# 设置了代码段选择器和数据段选择器的值。
.set PROT_MODE_CSEG, 0x8	# kernel code segment selector
.set PROT_MODE_DSEG, 0x10	# kernel data segment selector

.code16
.globl mpentry_start
mpentry_start:
	cli                     # 禁用了中断。

    # 寄存器 `%ax` 清零，并将其值复制到数据段寄存器 `%ds`、
    # 附加段寄存器 `%es` 和堆栈段寄存器 `%ss`。
	xorw    %ax, %ax
	movw    %ax, %ds
	movw    %ax, %es
	movw    %ax, %ss

    # 加载全局描述符表（GDT）
	lgdt    MPBOOTPHYS(gdtdesc)

    # 将控制寄存器 `%cr0` 的值复制到寄存器 `%eax`，
    # 并将其保护模式位设置为1。
	movl    %cr0, %eax
	orl     $CR0_PE, %eax
	movl    %eax, %cr0

	ljmpl   $(PROT_MODE_CSEG), $(MPBOOTPHYS(start32))
```

这段代码是用于启动应用程序处理器（AP）的汇编代码。以下是对代码的详细解释：

```
.code32
start32:
    # 将数据段选择器的值加载到 ax 寄存器
	movw    $(PROT_MODE_DSEG), %ax
    # 将 ax 寄存器的值加载到数据段寄存器 ds
	movw    %ax, %ds
    # 将 ax 寄存器的值加载到附加段寄存器 es
	movw    %ax, %es
    # 将 ax 寄存器的值加载到堆栈段寄存器 ss
	movw    %ax, %ss
    # 将 ax 寄存器清零
	movw    $0, %ax
    # 将 ax 寄存器的值加载到 fs 寄存器
	movw    %ax, %fs
    # 将 ax 寄存器的值加载到 gs 寄存器
	movw    %ax, %gs

    # 设置初始页表。我们不能使用 kern_pgdir，因为我们仍然在低 EIP 运行。
	movl    $(RELOC(entry_pgdir)), %eax
	movl    %eax, %cr3
    # 开启分页。
	movl    %cr0, %eax
	orl     $(CR0_PE|CR0_PG|CR0_WP), %eax
	movl    %eax, %cr0

    # 切换到在 boot_aps() 中分配的每个 CPU 的堆栈
	movl    mpentry_kstack, %esp
    # 将 ebp 寄存器清零，即清除帧指针
	movl    $0x0, %ebp

    # 调用 mp_main() 函数。这是一个间接调用，原因留给读者思考。
	movl    $mp_main, %eax
	call    *%eax
```

这段代码主要完成了以下几个任务：

1. 将数据段选择器的值加载到各个段寄存器。
2. 设置初始页表。
3. 开启分页。
4. 切换到在 `boot_aps()` 中分配的每个 CPU 的堆栈。
5. 调用 `mp_main()` 函数。

```
	# If mp_main returns (it shouldn't), loop.
spin:
	jmp     spin

# Bootstrap GDT
.p2align 2					# 强制对齐到4字节边界
gdt:                        # 定义了全局描述符表（GDT）
	SEG_NULL				# 用于生成一个空的段描述符

    # `STA_X|STA_R` 表示这个段是一个可读的执行段
	SEG(STA_X|STA_R, 0x0, 0xffffffff)	# 用于生成一个代码段描述符

    # `STA_W` 表示这个段是一个可写的数据段，
    # `0x0` 是段的基地址，`0xffffffff` 是段的限制。
	SEG(STA_W, 0x0, 0xffffffff)		# 用于生成一个数据段描述符

gdtdesc:                    # GDT描述符

    # 用于生成一个字（16位）的立即数。
    # 这里的 `0x17` 是 GDT 的大小减一。
	.word   0x17				# sizeof(gdt) - 1

    # 用于生成一个长字（32位）的立即数
    # 这里的 `MPBOOTPHYS(gdt)` 是 GDT 的物理地址。
	.long   MPBOOTPHYS(gdt)			# address gdt

.globl mpentry_end
mpentry_end:
	nop
```

GDT 是用于保护模式的内存管理，它包含了一些段描述符。每个段描述符定义了一个段的基地址、限制和访问权限。在这里，GDT 包含了三个段描述符：一个空段、一个代码段和一个数据段。GDT 描述符包含了 GDT 的大小和地址。

这段描述是关于如何启动应用程序处理器（AP）的。在多处理器系统中，有一个引导处理器（BP）和多个应用程序处理器（AP）。在系统启动时，引导处理器首先启动，然后通过发送 STARTUP IPI（Inter-Processor Interrupt，处理器间中断）来启动每个应用程序处理器。

STARTUP IPI 是一种特殊的中断，它可以使处理器从实模式（一种早期的 CPU 操作模式，只能访问 1MB 的内存）切换到保护模式（一种现代的 CPU 操作模式，可以访问所有的内存）。当 AP 收到 STARTUP IPI 后，它会以实模式启动，并将代码段寄存器（CS）和指令指针（IP）设置为 XY00:0000。这里的 XY 是一个 8 位值，它是与 STARTUP IPI 一起发送的。这意味着 AP 将从内存地址 XY00:0000 开始执行代码。

这段代码必须从 4096 字节边界开始，这是因为 XY 是一个 8 位值，所以它可以表示从 0 到 255 的任何值，乘以 4096（即 2^12），结果可以是从 0 到 1MB 的任何 4096 字节边界。这样可以确保无论 XY 的值是多少，代码都会在一个 4096 字节边界开始。

此外，这段代码将数据段寄存器（DS）设置为零。在实模式下，DS 寄存器的值会被用作内存地址的一部分，所以将 DS 设置为零意味着代码将从物理内存的低地址开始执行。因为 DS 是 16 位的，所以它可以表示从 0 到 65535 的任何值，乘以 16（实模式下，内存地址是由段值乘以 16 加上偏移量得到的），结果可以是从 0 到 1MB 的任何 16 字节边界。但是，由于这段代码将 DS 设置为零，所以代码必须从物理内存的低 2^16 字节的地址运行。

`MPBOOTPHYS` 是一个宏，用于将链接时的地址转换为运行时的物理地址。

在 `kern/mpentry.S` 文件中，这个宏非常重要，因为这个文件的代码是在内核空间（即 KERNBASE 以上）编译和链接的，但是在运行时，它需要在物理内存的低地址空间（即 KERNBASE 以下）执行。

这是因为 `kern/mpentry.S` 中的代码是用于启动应用程序处理器（AP）的，而 AP 在启动时是在实模式下运行的，只能访问物理内存的低 1MB 地址空间。因此，我们需要 `MPBOOTPHYS` 宏来将链接时的高地址转换为运行时的低地址。

相比之下，在 `boot/boot.S` 文件中，这个宏是不必要的。因为 `boot/boot.S` 中的代码是在引导加载器中运行的，引导加载器是在实模式下运行的，直接访问的就是物理地址，所以不需要进行地址转换。

如果在 `kern/mpentry.S` 中省略了 `MPBOOTPHYS` 宏，那么代码将尝试在高地址空间执行，但是由于处理器此时仍处于实模式，只能访问低 1MB 的物理内存，因此会导致错误。

在编写多处理器操作系统时，区分每个处理器的私有状态（per-CPU state）和整个系统共享的全局状态（global state）是非常重要的。`kern/cpu.h`定义了大部分的 per-CPU 状态，包括`struct CpuInfo`，它存储了每个 CPU 的变量。`cpunum()`函数总是返回调用它的 CPU 的 ID，这可以用作索引到像`cpus`这样的数组。另外，宏`thiscpu`是当前 CPU 的`struct CpuInfo`的简写。

以下是你需要了解的 per-CPU 状态：

1. 每个 CPU 的内核栈（Per-CPU kernel stack）。
   因为多个 CPU 可以同时陷入内核，所以我们需要为每个处理器提供一个单独的内核栈，以防止它们干扰彼此的执行。数组`percpu_kstacks[NCPU][KSTKSIZE]`为 NCPU 的内核栈预留了空间。

2. 每个 CPU 的 TSS 和 TSS 描述符（Per-CPU TSS and TSS descriptor）。
   每个 CPU 都需要一个任务状态段（TSS）来指定每个 CPU 的内核栈在哪里。CPU i 的 TSS 存储在`cpus[i].cpu_ts`中，相应的 TSS 描述符在 GDT 条目`gdt[(GD_TSS0 >> 3) + i]`中定义。在`kern/trap.c`中定义的全局变量`ts`将不再有用。

3. 每个 CPU 的当前环境指针（Per-CPU current environment pointer）。
   由于每个 CPU 可以同时运行不同的用户进程，我们重新定义了符号`curenv`，使其指向`cpus[cpunum()].cpu_env`（或`thiscpu->cpu_env`），它指向当前在当前 CPU（运行代码的 CPU）上执行的环境。

4. 每个 CPU 的系统寄存器（Per-CPU system registers）。
   所有寄存器，包括系统寄存器，都是 CPU 私有的。因此，初始化这些寄存器的指令，如`lcr3()`，`ltr()`，`lgdt()`，`lidt()`等，必须在每个 CPU 上执行一次。函数`env_init_percpu()`和`trap_init_percpu()`就是为此目的定义的。

此外，如果你在之前的实验中为了解决挑战问题而添加了任何额外的 per-CPU 状态或执行了任何额外的 CPU 特定初始化（比如，设置 CPU 寄存器中的新位），请确保在这里在每个 CPU 上复制它们！

Exercise 3.
