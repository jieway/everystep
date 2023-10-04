# Part 2 : start

下面是实现 start() 函数。

## 1. 设置特权模式

OS 启动后，首先要设置之前的特权模式，这样做是是为了以便在切换特权级别时能够正确地返回到前一特权级别。

### 1.1 特权级别

特权机制是对不同级别作出相应的限制，限制逐渐降低。下面是 RISC-V 架构的四种特权级别：

1. 用户态（User Mode）：用户应用程序运行的低特权级别。

2. 监管者态（Supervisor Mode，S 模式）：操作系统内核运行的中间特权级别。

3. 机器态（Machine Mode，M 模式）：底层系统管理运行的高特权级别。

4. 超级用户态（Hypervisor Mode，H 模式）：用于虚拟化管理的特权级别。

### 1.2 OS 启动的时候为什么要从 M 模式切换到 S 模式？

在 RISC-V 架构上的引导加载程序一般运行在 M 模式上、OS 运行在 S 模式下、应用程序运行在 U 模式上。

通过 qemu 启动后的模式是 M 模式，而 OS 运行在 S 模式下，所以需要切换。更进一步的话我认为 M 模式权限太高，S 模式的权限就够用了，M 模式具有最高的特权级别，拥有对计算机系统的完全控制权，包括所有硬件资源和系统级别的功能。

### 1.3 如何设置？

下面是切换的具体代码，简单来讲就是将一个数据写入指定的寄存器中。

```c
// set M Previous Privilege mode to Supervisor, for mret.
unsigned long x = r_mstatus();
x &= ~MSTATUS_MPP_MASK;             // 清除 MPP 字段，即将其设置为 0
x |= MSTATUS_MPP_S;                 // 将 MPP 字段设置为 Supervisor 模式（S 模式）
w_mstatus(x);                       // 将修改后的 mstatus 寄存器值写回到 mstatus 寄存器
```

这段代码的目的是将处理器的 M 模式的 Previous Privilege Mode 字段（MPP）设置为 Supervisor 模式（S 模式）。

通过 r_mstatus() 读取当前的 mstatus 寄存器的值，并将其保存在变量 x 中。

使用位掩码操作 x &= ~MSTATUS_MPP_MASK;，清除 x 中的 MPP 字段，即将其设置为0。

通过 x |= MSTATUS_MPP_S;，将 MPP 字段的相应位设置为 Supervisor 模式（S 模式）。

最后，通过 w_mstatus(x); 将修改后的 x 值写回 mstatus 寄存器，以使上述修改生效。

这段代码的目的是在特定情况下切换特权级别，通常在从内核代码切换到用户代码或从异常处理程序返回到用户代码时执行，以确保正确的特权级别设置。

### 1.4 r_mstatus 和 w_mstatus

这段代码定义了两个内联函数，用于读取和写入 RISC-V 处理器的 `mstatus` 寄存器：

1. `r_mstatus()` 函数：
- 通过 `asm volatile` 汇编指令使用 `csrr` 从 `mstatus` 寄存器中读取数据，并将结果存储在变量 `x` 中。
- 最后，将读取的数据返回给调用者。

2. `w_mstatus(uint64 x)` 函数：
- 接受一个参数 `x`，即要写入 `mstatus` 寄存器的数据。
- 通过 `asm volatile` 汇编指令使用 `csrw` 将参数 `x` 写入到 `mstatus` 寄存器中，以更新寄存器的值。

这两个函数允许读取和修改处理器的 `mstatus` 寄存器，`mstatus` 寄存器通常包含了与特权级别、中断使能、虚拟化和其他系统状态相关的信息。这些函数是直接与处理器硬件交互的接口，允许操作系统或其他系统软件管理和控制特权状态。

```c
static inline uint64
r_mstatus()
{
  uint64 x;
  asm volatile("csrr %0, mstatus" : "=r" (x) );
  return x;
}

static inline void
w_mstatus(uint64 x)
{
  asm volatile("csrw mstatus, %0" : : "r" (x));
}
```

`mstatus` 寄存器是 RISC-V 处理器中的一个特殊寄存器，用于存储和管理处理器的特权状态和控制信息。这个寄存器包含了多个字段，每个字段用于不同的目的，通常包括以下重要信息：

1. 特权级别（Privilege Level）：`mstatus` 寄存器中的 `MPP` 字段表示当前的特权级别，指示处理器当前处于 Machine Mode、Supervisor Mode 还是 User Mode。这个字段允许处理器在不同的特权级别之间切换，并在异常、中断等情况下正确恢复上下文。

2. 中断使能（Interrupt Enable）：`mstatus` 寄存器中的 `MIE` 字段控制中断的使能和禁用。当 `MIE` 为 1 时，允许中断产生和响应；当为 0 时，禁用中断。

3. 外部中断使能（External Interrupt Enable）：`mstatus` 寄存器中的 `MIE` 字段的一个子字段，用于控制外部中断（如时钟中断、硬件中断）的使能和禁用。

4. 中断响应位（Interrupt Pending）：`mstatus` 寄存器中的 `MIP` 字段表示当前是否存在未处理的中断请求。当 `MIP` 中的某个位为 1 时，表示相应类型的中断请求待处理。

5. 全局中断使能（Global Interrupt Enable）：`mstatus` 寄存器中的 `MIE` 字段的一个子字段，用于全局使能或禁用所有中断，不受各个中断类型的影响。

6. 虚拟化相关字段：`mstatus` 寄存器还包含了一些与虚拟化相关的字段，用于虚拟化管理和控制。

总之，`mstatus` 寄存器是一个关键的系统状态寄存器，它存储了有关处理器特权级别、中断使能和中断状态的重要信息。操作系统和处理器在管理和控制系统特权级别、中断处理和异常处理时，会使用这些字段来确保系统的正确运行和安全性。不同的 RISC-V 实现可能会有不同的 `mstatus` 寄存器字段和含义，因此具体的寄存器布局和字段意义可能会有所不同。


## 2. w_mepc

接下来会执行下面的代码，简单来说就是将 main 函数对应的地址写入 MEPC 寄存器中，当执行 mret 指令后会读取 MEPC 中的地址进而程序从这个地址开始执行。

```c
// set M Exception Program Counter to main, for mret.
// requires gcc -mcmodel=medany
w_mepc((uint64)main);
```

下面是 w_mepc 的具体实现：

```sh
// machine exception program counter, holds the
// instruction address to which a return from
// exception will go.
static inline void 
w_mepc(uint64 x)
{
  asm volatile("csrw mepc, %0" : : "r" (x));
}
```

### 2.1 为什么要这样做？

这段代码的目的是将 C 语言程序的 `main` 函数地址设置为 RISC-V 处理器的 "M Exception Program Counter"（MEPC）寄存器的值。这样做的目的是，在程序执行期间如果发生异常，处理器将能够在异常处理后正确返回到 `main` 函数。这是在操作系统内核中非常关键的操作。为了正确编译此代码，需要使用指定的编译选项 `-mcmodel=medany`。

`-mcmodel=medany` 是 GCC 编译器的一个选项，用于指定代码的内存模型。`-mcmodel=medany` 表示选择了一种适用于大型地址空间的内存模型，用于编译程序，以确保程序能够正确地处理大量内存地址。这通常用于操作系统内核等需要访问大量内存的情况。

将 `main` 函数的地址设置为 "M Exception Program Counter"（MEPC）寄存器的值是为了定义程序的入口点和确保在操作系统启动过程中正确处理异常，同时在需要时启动用户程序。这有助于管理和控制操作系统的执行流程。

## 3. 关闭分页

接下来执行关闭分页的代码：

```c
// disable paging for now.
// satp 寄存器（Supervisor Address Translation and Protection Register）
// 用于控制 RISC-V 处理器的分页机制
w_satp(0);                          // 关闭分页
```

下面是函数的具体实现：

```c
// supervisor address translation and protection;
// holds the address of the page table.
static inline void 
w_satp(uint64 x)
{
  asm volatile("csrw satp, %0" : : "r" (x));
}
```

### 3.1 为什么在 OS 刚开始启动的时候要关闭分页？

在操作系统启动的早期阶段关闭分页是为了简化启动过程、提高速度、减少错误，并确保操作系统能够正确初始化硬件和内存管理系统。这样可以保持启动过程的简单性和可靠性。在后续阶段，操作系统可以启用分页来支持多任务和虚拟内存。

### 3.2 如何关闭分页？

`satp` 寄存器是 RISC-V 架构中用于虚拟内存管理的关键寄存器。它控制着页表的基址、地址转换和虚拟内存的访问权限，通常在 Supervisor Mode（监管者态）下由操作系统内核配置和管理，用于实现内存隔离和安全性。

`w_satp(0)` 表示将 RISC-V 中的 "Supervisor Address Translation and Protection"（SATP）寄存器的 `MODE` 字段设置为零，这意味着关闭分页机制，禁用虚拟内存。这样做的目的是在操作系统启动的早期阶段简化启动过程，确保操作系统能够稳定地初始化。后续在初始化完成后，操作系统可以重新配置 SATP 寄存器以启用虚拟内存。


## 4. S 模式下处理异常和中断

此前的异常和中断都是 M 模式下处理，现在切换为 S 模式后，对应的异常中断也全都委托给 S 模式处理，下面是委托的具体实现。

```c
// delegate all interrupts and exceptions to supervisor mode.
w_medeleg(0xffff);
w_mideleg(0xffff);
w_sie(r_sie() | SIE_SEIE | SIE_STIE | SIE_SSIE);
```

这段代码的作用是将所有中断和异常委托（delegate）给 Supervisor Mode（S 模式）。它通过以下操作实现：

1. `w_medeleg(0xffff);`：将 "Machine Exception Delegation Register"（medeleg）的值设置为 0xffff，表示将所有的异常委托给 S 模式处理。这意味着 S 模式将负责处理所有异常，而不需要在 Machine Mode 处理。

2. `w_mideleg(0xffff);`：将 "Machine Interrupt Delegation Register"（mideleg）的值设置为 0xffff，表示将所有的中断委托给 S 模式处理。这意味着 S 模式将负责处理所有中断，而不需要在 Machine Mode 处理。

3. `w_sie(r_sie() | SIE_SEIE | SIE_STIE | SIE_SSIE);`：通过修改 "Supervisor Interrupt Enable Register"（sie）的值，启用了 S 模式下的异常和中断处理。具体来说，它设置了 S 模式下的异常使能位（SEIE）、定时器中断使能位（STIE）和软件中断使能位（SSIE），允许 S 模式处理这些事件。

综合起来，这段代码将系统中的所有异常和中断都交给了 Supervisor Mode 处理，同时启用了 S 模式下的异常和中断处理，以确保 S 模式下的操作系统内核能够正确地处理这些事件。这在操作系统的启动和运行过程中非常关键，因为它确保了操作系统能够管理系统的硬件和处理各种事件。

## 5. S 模式下访问内存

此前并未明确设置 S 模式所能访问的物理地址。虽然默认情况下是启用的，但初始配置可能限制了对某些物理内存区域的访问权限。因此，如果不明确配置 PMP 寄存器，可能会限制某些特权级别（如 Supervisor Mode）对物理内存的访问。

```c
// configure Physical Memory Protection to give supervisor mode
// access to all of physical memory.
w_pmpaddr0(0x3fffffffffffffull);
w_pmpcfg0(0xf);
```

以下是对给定代码的解释：

这段代码的作用是配置物理内存保护（Physical Memory Protection，PMP），以授予 Supervisor Mode（S 模式）对所有物理内存的访问权限。它通过以下操作实现：

1. `w_pmpaddr0(0x3fffffffffffffull);`：设置 "PMP Address Register 0"（pmpaddr0）的值为 `0x3fffffffffffffull`。这个值表示了一个地址范围，覆盖了几乎整个物理内存空间。换句话说，这段代码将 pmpaddr0 设置为一个非常大的地址，使得 Supervisor Mode 具有对所有物理内存的访问权限。

2. `w_pmpcfg0(0xf);`：设置 "PMP Configuration Register 0"（pmpcfg0）的值为 `0xf`。这个值表示启用 PMP 寄存器 pmpaddr0，并允许 Supervisor Mode 具有读取和写入该地址范围的权限。

综合起来，这段代码通过配置 PMP 寄存器，将物理内存的大部分范围分配给 Supervisor Mode，允许 S 模式的操作系统内核访问系统的所有物理内存。这对于操作系统来说非常重要，因为它需要管理和控制整个系统的内存资源。需要注意的是，PMP 寄存器的配置通常需要根据具体的硬件和需求进行调整，上述代码是一个示例。

## 6. timerinit


## 7. 设置 tp 寄存器

接下来为每个 CPU 设置一个唯一的硬件线程标识号（hartid），然后将这个标识号存储在每个 CPU 的 `tp` 寄存器中，以便后续的线程管理和调度操作使用。这有助于操作系统在多核系统中准确定位和区分不同的 CPU 核心。

```c
// keep each CPU's hartid in its tp register, for cpuid().
int id = r_mhartid();
w_tp(id);
```

在 RISC-V 架构中，`tp` 寄存器的全称是 "Thread Pointer Register"，它用于存储线程相关的信息，如线程指针、线程局部存储等。它允许不同线程在多线程环境中访问独立的数据，提供了线程隔离和数据共享的机制。其具体功能和用途可能因操作系统和应用程序而异。

## 8. mret

`mret` 指令是 RISC-V 架构中用于切换特权级别和执行返回操作的指令。它将处理器从 Machine Mode 切换到 Supervisor Mode，并执行返回操作，通常在操作系统内核启动后用于切换到内核执行。这有助于实现多特权级别的管理和控制。

执行 mret 后会跳转到 main 函数中，前面提过。

```c
// switch to supervisor mode and jump to main().
asm volatile("mret");
```