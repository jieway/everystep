这篇文章讲解 AP 的引导代码，即汇编部分。

### AP 引导代码

此前已经提及，`boot_aps()`函数将 AP 的入口代码（位于`kern/mpentry.S`）复制到实模式下可寻址的内存位置。这是因为，和 Boot Loader 类似，APs 在启动时也是在实模式下运行的。然而，与引导加载程序不同的是，我们可以控制 AP 开始执行代码的具体位置。在这个例子中，入口代码被复制到了 0x7000（`MPENTRY_PADDR`），这是一个实模式下可寻址的内存位置。

接下来讲解如何启动 AP 。

下面这段代码是用于启动应用程序处理器（AP）的汇编代码。

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

```mc68000
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

每个 AP 是通过引导 CPU 发送的 STARTUP IPI（Inter-Processor Interrupt，处理器间中断）来启动的。AP 将以实模式启动，CS:IP 设置为 XY00:0000 ，其中 XY 是与 STARTUP 一起发送的 8 位值。因此，这段代码必须从 4096 字节边界开始。

由于这段代码将 DS 设置为零，它必须从物理内存的低 2^16 字节的地址运行。

`boot_aps()`函数（在`init.c`中）将这段代码复制到`MPENTRY_PADDR`（满足上述限制）。然后，对于每个 AP，它在`mpentry_kstack`中存储预分配的每核栈的地址，发送 STARTUP IPI，并等待这段代码确认它已经启动（这发生在`mp_main`函数中）。

它首先进行一些基本的设置，然后将 AP 切换到启用分页的保护模式。在完成这些设置后，它会调用 C 设置例程`mp_main()`（也在`kern/init.c`中）。
