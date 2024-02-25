这篇文章主要讲解 OS 是如何实现中断和异常的，首先讲解如何设置 IDT 。

### 设置中断描述符 IDT

接下来结合具体的代码讲解如何设置 IDT 来处理中断向量 0-31（处理器异常）。随后讲解如何处理系统调用中断，并添加中断 32-47（设备 IRQ）。

在 `trapentry.S` 中定义了 `TRAPHANDLER` 和 `TRAPHANDLER_NOEC` 两个宏，这两个宏都是用来定义处理中断和异常的处理程序的。它们的工作流程非常相似，都是先定义一个全局的函数符号，然后设置这个符号的类型为函数，接着对齐函数定义，然后在函数开始的地方推入中断或异常的编号，最后跳转到 `_alltraps` 函数。

这两个宏的主要差异在于处理错误代码的方式不同。`TRAPHANDLER` 宏用于处理那些 CPU 会自动推送错误代码的中断或异常，它直接将中断或异常的编号推入堆栈。而 `TRAPHANDLER_NOEC` 宏用于处理那些 CPU 不会自动推送错误代码的中断或异常，它在推入中断或异常的编号之前，先推入一个 0 作为错误代码。这样做的目的是为了保证在任何情况下，中断或异常的处理程序的堆栈帧都有相同的格式。

```c
#define TRAPHANDLER(name, num)						\
	.globl name;		/* 定义 'name' 的全局符号 */	\
	.type name, @function;	/* 符号类型是函数 */		\
	.align 2;		/* 对齐函数定义 */		\
	name:			/* 函数从这里开始 */		\
	pushl $(num);							\
	jmp _alltraps

#define TRAPHANDLER_NOEC(name, num)					\
	.globl name;							\
	.type name, @function;						\
	.align 2;							\
	name:								\
	pushl $0;							\
	pushl $(num);							\
	jmp _alltraps
```

在处理中断或异常时，CPU 会将一些信息（如错误代码）推入堆栈。这些信息会被保存在一个叫做 `trap frame` 的数据结构中。`trap frame` 的格式对于不同的中断或异常可能会有所不同。例如，对于某些中断或异常，CPU 会自动将错误代码推入堆栈，而对于其他的中断或异常，CPU 则不会这样做。

`TRAPHANDLER` 和 `TRAPHANDLER_NOEC` 这两个宏的主要区别就在于它们如何处理这种情况。`TRAPHANDLER` 宏用于处理那些 CPU 会自动推送错误代码的中断或异常，它直接将中断或异常的编号推入堆栈。而 `TRAPHANDLER_NOEC` 宏用于处理那些 CPU 不会自动推送错误代码的中断或异常，它在推入中断或异常的编号之前，先推入一个 0 作为错误代码。

这样做的目的是为了保证在任何情况下，中断或异常的处理程序的堆栈帧都有相同的格式。也就是说，无论 CPU 是否会自动推送错误代码，处理程序都可以从相同的位置找到中断或异常的编号。这样可以简化处理程序的代码，因为它们不需要考虑不同的 `trap frame` 格式。

### 陷阱（trap）和中断请求（IRQ）对应的编号

接下来讲解陷阱（trap）和中断请求（IRQ）对应的编号，下一节为每种编号设置对应的处理函数。

```c
// Trap numbers
// 这些是处理器定义的：
#define T_DIVIDE     0		// 除法错误
#define T_DEBUG      1		// 调试异常
#define T_NMI        2		// 不可屏蔽中断
#define T_BRKPT      3		// 断点
#define T_OFLOW      4		// 溢出
#define T_BOUND      5		// 边界检查
#define T_ILLOP      6		// 非法操作码
#define T_DEVICE     7		// 设备不可用
#define T_DBLFLT     8		// 双重错误

/* #define T_COPROC  9 */	// 保留（最近的处理器不会生成）
#define T_TSS       10		// 无效的任务切换段
#define T_SEGNP     11		// 段不存在
#define T_STACK     12		// 栈异常
#define T_GPFLT     13		// 一般保护错误
#define T_PGFLT     14		// 页错误

/* #define T_RES    15 */	// 保留
#define T_FPERR     16		// 浮点错误
#define T_ALIGN     17		// 对齐检查
#define T_MCHK      18		// 机器检查
#define T_SIMDERR   19		// SIMD浮点错误

// 这些是任意选择的，但是要注意不要与处理器定义的异常或中断向量重叠。
#define T_SYSCALL   48		// 系统调用
#define T_DEFAULT   500		// 万能捕获

#define IRQ_OFFSET	32	// IRQ 0 对应于 int IRQ_OFFSET

// 硬件IRQ编号。我们接收到的是 (IRQ_OFFSET+IRQ_WHATEVER)
#define IRQ_TIMER        0
#define IRQ_KBD          1
#define IRQ_SERIAL       4
#define IRQ_SPURIOUS     7
#define IRQ_IDE         14
#define IRQ_ERROR       19
```

这段代码中的宏定义主要分为三部分：

1. 处理器定义的陷阱编号：这些陷阱是由 CPU 硬件定义的，例如除以零错误（T_DIVIDE）、调试异常（T_DEBUG）等。

2. 自定义的陷阱编号：这些陷阱是操作系统自定义的，例如系统调用（T_SYSCALL）和默认陷阱（T_DEFAULT）。

3. 硬件中断请求（IRQ）编号：这些是由硬件设备发出的中断请求，例如定时器（IRQ_TIMER）、键盘（IRQ_KBD）等。

这些宏定义在操作系统的其他部分会被用到，例如在处理陷阱和中断的代码中，会根据陷阱或中断的编号，调用相应的处理函数。

### 设置 trap 入口

接下来为 trap 中定义的每个陷阱（trap）设置相应的入口，下面这段代码是在为不同的陷阱（trap）生成入口点。

```c
TRAPHANDLER_NOEC(handler0, T_DIVIDE)
TRAPHANDLER_NOEC(handler1, T_DEBUG)
TRAPHANDLER_NOEC(handler2, T_NMI)
TRAPHANDLER_NOEC(handler3, T_BRKPT)
TRAPHANDLER_NOEC(handler4, T_OFLOW)
TRAPHANDLER_NOEC(handler5, T_BOUND)
TRAPHANDLER_NOEC(handler6, T_ILLOP)
TRAPHANDLER_NOEC(handler7, T_DEVICE)

TRAPHANDLER(handler8, T_DBLFLT)
TRAPHANDLER(handler10, T_TSS)
TRAPHANDLER(handler11, T_SEGNP)
TRAPHANDLER(handler12, T_STACK)
TRAPHANDLER(handler13, T_GPFLT)
TRAPHANDLER(handler14, T_PGFLT)
TRAPHANDLER(handler16, T_FPERR)
TRAPHANDLER(handler17, T_ALIGN)
```

这段代码的目的是为了在发生陷阱时，能够根据陷阱号调用对应的处理函数，处理完陷阱后，再恢复程序的执行。

在这段代码中，`TRAPHANDLER_NOEC(handler0, T_DIVIDE)`定义了一个名为`handler0`的函数，用于处理陷阱号为`T_DIVIDE`的陷阱，这是一个由除以零引起的陷阱。

当程序运行过程中发生这些特定的陷阱时，对应的`handler`函数就会被调用，以处理这些陷阱。处理完陷阱后，程序会恢复执行。

### alltraps

前文已经提到了 `_alltraps` 函数，这个函数是所有陷阱处理函数（由`TRAPHANDLER`和`TRAPHANDLER_NOEC`宏定义）的公共入口点。

当发生陷阱时，CPU 会跳转到相应的陷阱处理函数，然后这些处理函数会将陷阱号（和错误代码，如果有的话）压入堆栈，然后跳转到`_alltraps`。

```
.globl		_start
_alltraps:
	pushl	%ds
	pushl	%es
	pushal
	movw 	$(GD_KD), %ax
  	movw 	%ax, %ds
  	movw 	%ax, %es
	pushl 	%esp
	call	trap
```

`_alltraps`函数的主要任务是保存 CPU 的状态，然后调用`trap`函数处理陷阱。具体来说，它做了以下操作：

1. `pushl %ds`和`pushl %es`：将数据段寄存器（DS）和附加段寄存器（ES）的值压入堆栈，以便稍后恢复。这两个寄存器是 x86 架构中的段寄存器，用于存储内存段的基地址。在处理陷阱或中断时，可能需要改变这些寄存器的值，所以需要先保存原来的值。

2. `pushal`：将所有通用寄存器的值压入堆栈。`pushal`是一个汇编指令，它会依次将 EAX、ECX、EDX、EBX、ESP、EBP、ESI 和 EDI 寄存器的值压入堆栈。

3. `movw $(GD_KD), %ax`，`movw %ax, %ds`和`movw %ax, %es`：将内核数据段的选择子（`GD_KD`）加载到 AX 寄存器，然后将 AX 寄存器的值复制到 DS 和 ES 寄存器。这是为了确保在处理陷阱时，数据段和附加段寄存器指向内核数据段。

4. `pushl %esp`：将堆栈指针（ESP）的值压入堆栈。这是因为`trap`函数需要知道陷阱帧的位置，陷阱帧是保存在堆栈上的，包含了发生陷阱时 CPU 的状态信息。

5. `call trap`：调用`trap`函数处理陷阱。`trap`函数会根据陷阱号调用相应的处理函数。

这段代码的目的是为了在发生陷阱时，保存 CPU 的状态，然后调用`trap`函数处理陷阱，处理完陷阱后，再恢复 CPU 的状态，继续执行被中断的程序。

这样做的原因是为了统一处理所有的陷阱和中断。当发生陷阱或中断时，CPU 会跳转到相应的处理函数，这些处理函数会将陷阱号（和错误代码，如果有的话）压入堆栈，然后跳转到`_alltraps`。这样，无论发生何种陷阱或中断，处理流程都是一样的，都会跳转到`_alltraps`进行处理。

在`_alltraps`中，首先会保存当前的环境（包括寄存器的值等），然后调用`trap`函数进行具体的处理。这样做的好处是，无论`trap`函数如何修改寄存器的值，都不会影响到原来的环境，因为在返回到原来的代码之前，会恢复这些寄存器的值。

这种设计使得处理陷阱和中断更加灵活和方便，因为可以在`trap`函数中根据陷阱号和错误代码进行不同的处理，而不需要为每种陷阱或中断都编写一个完整的处理函数。同时，这种设计也使得代码更加简洁和易于理解。

### Trapframe

`Trapframe` 用于在发生中断或异常时保存处理器的状态。下面是对每个字段的详细解释：

```cpp
struct Trapframe {
 struct PushRegs tf_regs;  // 保存通用寄存器的状态
 uint16_t tf_es;          // 保存ES寄存器的状态
 uint16_t tf_padding1;    // 填充，用于保持结构体的对齐
 uint16_t tf_ds;          // 保存DS寄存器的状态
 uint16_t tf_padding2;    // 填充，用于保持结构体的对齐
 uint32_t tf_trapno;      // 中断或异常的编号
 /* below here defined by x86 hardware */
 uint32_t tf_err;         // 错误代码
 uintptr_t tf_eip;        // 保存EIP寄存器的状态，即下一条要执行的指令的地址
 uint16_t tf_cs;          // 保存CS寄存器的状态
 uint16_t tf_padding3;    // 填充，用于保持结构体的对齐
 uint32_t tf_eflags;      // 保存EFLAGS寄存器的状态，包含了处理器的一些状态标志
 /* below here only when crossing rings, such as from user to kernel */
 uintptr_t tf_esp;        // 保存ESP寄存器的状态，即当前的栈顶指针
 uint16_t tf_ss;          // 保存SS寄存器的状态
 uint16_t tf_padding4;    // 填充，用于保持结构体的对齐
} __attribute__((packed)); // 表示该结构体按照紧凑模式进行对齐
```

这个结构体的设计是为了在发生中断或异常时，能够保存处理器的状态，然后在处理完中断或异常后，能够恢复到原来的状态，继续执行被打断的代码。

每个处理程序都应该在堆栈上构建一个`struct Trapframe` 并用指向 `Trapframe` 的指针调用 `trap()`。然后`trap()` 处理异常/中断或分派到特定的处理函数。

### 初始化 IDT

下面这段代码是在初始化中断描述符表（Interrupt Descriptor Table，IDT）。当 CPU 接收到一个中断或者陷阱（trap）信号时，会根据信号的类型（也就是中断向量）在 IDT 中查找对应的中断处理程序，然后跳转到该程序去处理中断。

```c
void
trap_init(void)
{
	extern struct Segdesc gdt[];

	SETGATE(idt[0], 1, GD_KT, handler0, 0);
	SETGATE(idt[1], 1, GD_KT, handler1, 3);
	SETGATE(idt[2], 1, GD_KT, handler2, 0);

	// ...
	// Per-CPU setup
	trap_init_percpu();
}
```

在这段代码中，`SETGATE`宏用于设置 IDT 中的条目。它接受五个参数：

1. IDT 的条目（例如`idt[0]`，`idt[1]`等）。
2. 中断门的类型，这里都是 1，表示这是一个中断门。
3. 段描述符，这里都是`GD_KT`，表示内核文本段。
4. 中断处理程序的名称（例如`handler0`，`handler1`等）。
5. 特权级，0 表示内核级，3 表示用户级。

例如，`SETGATE(idt[0], 1, GD_KT, handler0, 0);`这行代码设置了中断向量 0 的中断门。当 CPU 接收到中断向量为 0 的中断时，它会跳转到`handler0`去处理这个中断。

最后，`trap_init_percpu()`函数用于进行每个 CPU 的中断初始化。在多处理器系统中，每个处理器都有自己的中断控制器，因此需要单独进行初始化。

### 全局 IDT

trap_init 代码中使用了一个名为`idt`的数组，这个数据是一个全局数据，定义在了函数外。数组的类型是`Gatedesc`，长度为 256。`Gatedesc`是一个结构体类型，用于表示中断描述符表（Interrupt Descriptor Table，IDT）中的条目。IDT 是一个数据结构，用于存储中断处理程序的地址和一些相关属性。当 CPU 接收到一个中断或者陷阱（trap）信号时，会根据信号的类型（也就是中断向量）在 IDT 中查找对应的中断处理程序，然后跳转到该程序去处理中断。

```c
/* 中断描述符表。 （必须在运行时构建，因为
 * 位移后的函数地址无法在重定位记录中表示。）
 */
struct Gatedesc idt[256] = { { 0 } };
```

在这段代码中，`idt`数组被初始化为全 0，表示所有的中断向量初始时都没有对应的中断处理程序。在系统运行过程中，会通过`SETGATE`宏来设置`idt`中的条目，即为特定的中断向量指定处理程序。

IDT 必须在运行时构建，因为位移后的函数地址无法在重定位记录中表示。这是因为中断处理程序的地址是在程序运行过程中动态确定的，不能在编译时就固定下来。

### SETGATE

接下来讲解 SETGATE ，即设置 IDT 的细节。下面是具体的代码：

```c
#define SETGATE(gate, istrap, sel, off, dpl)			\
{								\
	(gate).gd_off_15_0 = (uint32_t) (off) & 0xffff;		\
	(gate).gd_sel = (sel);					\
	(gate).gd_args = 0;					\
	(gate).gd_rsv1 = 0;					\
	(gate).gd_type = (istrap) ? STS_TG32 : STS_IG32;	\
	(gate).gd_s = 0;					\
	(gate).gd_dpl = (dpl);					\
	(gate).gd_p = 1;					\
	(gate).gd_off_31_16 = (uint32_t) (off) >> 16;		\
}
```

这段代码定义了一个名为`SETGATE`的宏，用于设置中断门或陷阱门描述符。这个宏接受五个参数：

- `gate`：要设置的门描述符。
- `istrap`：如果为 1，表示设置的是陷阱门；如果为 0，表示设置的是中断门。
- `sel`：中断或陷阱处理程序的代码段选择器。
- `off`：中断或陷阱处理程序在代码段中的偏移量。
- `dpl`：描述符特权级别，表示软件使用`int`指令显式调用此中断/陷阱门所需的特权级别。

这个宏的主要作用是填充`gate`描述符的各个字段。例如，`(gate).gd_off_15_0 = (uint32_t) (off) & 0xffff;`这行代码将`off`的低 16 位赋值给`gate`的`gd_off_15_0`字段，表示中断或陷阱处理程序在代码段中的偏移量的低 16 位。其他字段的设置也类似。

其中，`gd_type`字段的设置比较特殊，它根据`istrap`的值来确定是设置为陷阱门类型（`STS_TG32`）还是中断门类型（`STS_IG32`）。

下面是对应 `Gatedesc` 的结构体，用于描述中断和陷阱门的描述符，即 gate 部分。

```c
// 中断和陷阱门的门描述符
struct Gatedesc {
 unsigned gd_off_15_0 : 16;   // 段内偏移的低16位
 unsigned gd_sel : 16;        // 段选择器
 unsigned gd_args : 5;        // 参数数量，对于中断/陷阱门，此值为0
 unsigned gd_rsv1 : 3;        // 保留字段，我猜应该为零
 unsigned gd_type : 4;        // 类型(STS_{TG,IG32,TG32})
 unsigned gd_s : 1;           // 必须为0（系统）
 unsigned gd_dpl : 2;         // 描述符（新的含义）特权级别
 unsigned gd_p : 1;           // 存在位
 unsigned gd_off_31_16 : 16;  // 段内偏移的高16位
};
```

这段代码定义了一个名为`Gatedesc`的结构体，它是中断和陷阱门的描述符。这个描述符用于在中断描述符表（IDT）中表示中断或陷阱的处理程序的信息。每个字段都包含了中断或陷阱处理程序的重要信息，如段内偏移、段选择器、参数数量、类型、特权级别等。这些信息在处理中断或陷阱时非常关键，因为它们决定了如何定位和执行相应的处理程序。

### 总结

文章主要介绍了操作系统如何实现中断和异常的处理，以及如何设置中断描述符表（IDT）。通过详细讲解设置 IDT 的过程，包括使用宏定义处理中断和异常、陷阱和中断请求的编号、以及为每个陷阱设置相应的入口点。此外，文章还解释了全局 IDT 的初始化、`SETGATE`宏的具体实现，以及`Trapframe`结构体的设计用于保存处理器状态。文章最后总结了整个过程，包括初始化 IDT、设置中断和陷阱处理程序、处理陷阱的公共入口点`_alltraps`，以及`Trapframe`的作用。
