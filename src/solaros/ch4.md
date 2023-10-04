# Part 5 : console

进入 main 函数后，首先进行 console 初始化：

```c
// start() jumps here in supervisor mode on all CPUs.
void
main()
{
  if(cpuid() == 0){
    consoleinit();
  }
}
```

## 1. console

接下来是实现 console.c 这个文件。

这个文件实现了操作系统的控制台输入和输出，支持逐行读取和特殊输入字符的处理，包括回车、退格、终止文件、打印进程列表等。主要包括以下功能：

1. 控制台输出函数 `consputc(int c)` 用于将字符输出到控制台，支持特殊字符的处理，如退格。

2. 控制台输入缓冲区结构 `cons`，用于存储用户输入的字符。

3. `consolewrite` 函数用于处理用户写入控制台的数据。

4. `consoleread` 函数用于从控制台读取用户输入的数据，包括一整行的输入。

5. 控制台输入中断处理函数 `consoleintr`，用于处理输入字符，包括特殊控制字符的处理。

6. `consoleinit` 函数用于初始化控制台，包括初始化锁、初始化 UART（通用异步收发传输）和连接读写系统调用。

总之，这个文件负责管理操作系统的控制台输入和输出，支持用户与操作系统进行交互。

### 1.1 consoleinit

```c
void
consoleinit(void)
{
  initlock(&cons.lock, "cons");

  uartinit();
}
```

consoleinit 初始化本质上就是 uart 初始化。


## 2. uart

执行 main 函数时需要初始化 UART ，接下来先实现 UART 。

UART（Universal Asynchronous Receiver/Transmitter）是一种通用的串行通信接口，用于在计算机和外部设备之间传输数据。它通常用于串行通信，支持双向数据传输，并且不需要共享时钟信号，因此适用于连接各种外部设备，如调制解调器、传感器、GPS 接收器等。UART 通常有两个引脚：一个用于发送数据（TX，Transmit）和一个用于接收数据（RX，Receive）。数据通过 UART 以串行的方式逐位传输，通常使用起始位、数据位、停止位等协议来进行数据的帧同步和解释。UART 是一种简单而常见的串行通信标准，广泛用于嵌入式系统和通信设备中。


## 2.1  读取 UART

```c
kernel/memlayout.h
// qemu puts UART registers here in physical memory.
#define UART0 0x10000000L
#define UART0_IRQ 10
```

1. `UART0`（0x10000000L）：这是定义了 UART（Universal Asynchronous Receiver/Transmitter，通用异步收发器）设备的物理内存基地址。在这个地址处，QEMU 虚拟机模拟器会模拟出 UART 寄存器，允许操作系统或应用程序通过读写这些寄存器来进行与 UART 设备的通信。UART 通常用于串行通信，用于与外部设备（如串口终端、调制解调器等）进行数据交换。

2. `UART0_IRQ`（10）：这是定义了 UART 设备的中断请求（IRQ）号码。在某些情况下，当 UART 设备有数据可用或发送完成时，它可以触发一个中断，通知处理器需要处理 UART 相关的事件。IRQ 号码用于标识中断请求的来源，使操作系统能够相应地处理中断事件。

综合起来，这两个地址和值定义了在物理内存中的 UART 设备位置以及相关的中断请求号码，以便操作系统或应用程序可以与该 UART 设备进行通信并处理相应的中断事件。

```c
kernel/uart.c
// the UART control registers are memory-mapped
// at address UART0. this macro returns the
// address of one of the registers.
#define Reg(reg) ((volatile unsigned char *)(UART0 + reg))

// the UART control registers.
// some have different meanings for
// read vs write.
// see http://byterunner.com/16550.html
#define RHR 0                 // receive holding register (for input bytes)
#define THR 0                 // transmit holding register (for output bytes)
#define IER 1                 // interrupt enable register
#define IER_RX_ENABLE (1<<0)
#define IER_TX_ENABLE (1<<1)
#define FCR 2                 // FIFO control register
#define FCR_FIFO_ENABLE (1<<0)
#define FCR_FIFO_CLEAR (3<<1) // clear the content of the two FIFOs
#define ISR 2                 // interrupt status register
#define LCR 3                 // line control register
#define LCR_EIGHT_BITS (3<<0)
#define LCR_BAUD_LATCH (1<<7) // special mode to set baud rate
#define LSR 5                 // line status register
#define LSR_RX_READY (1<<0)   // input is waiting to be read from RHR
#define LSR_TX_IDLE (1<<5)    // THR can accept another character to send

#define ReadReg(reg) (*(Reg(reg)))
#define WriteReg(reg, v) (*(Reg(reg)) = (v))
```

这段代码定义了一些宏，用于访问 UART（通用异步收发器）设备的控制寄存器。

- `Reg(reg)` 宏：该宏用于生成访问 UART 设备控制寄存器的内存地址，根据传入的寄存器偏移量 `reg`，它返回一个指向特定寄存器的地址。

- `ReadReg(reg)` 宏：该宏用于读取 UART 设备控制寄存器的值，它通过调用 `Reg(reg)` 宏获取寄存器地址，然后用解引用操作符 `*` 读取该地址处的值。

- `WriteReg(reg, v)` 宏：该宏用于写入一个值 `v` 到 UART 设备控制寄存器，它也通过调用 `Reg(reg)` 宏获取寄存器地址，然后用解引用操作符 `*` 将值 `v` 写入该地址。

这些宏使得程序可以方便地读取和写入 UART 设备的控制寄存器，以配置 UART 的行为、发送和接收数据。它们简化了对硬件寄存器的访问，提高了代码的可读性和可维护性。

1. `RHR`：接收保持寄存器的偏移量，用于读取输入字节。

2. `THR`：传输保持寄存器的偏移量，用于写入输出字节。

3. `IER`：中断使能寄存器的偏移量，用于控制中断的使能。`IER_RX_ENABLE` 和 `IER_TX_ENABLE` 是位掩码，用于启用接收和发送中断。

4. `FCR`：FIFO（先进先出）控制寄存器的偏移量，用于控制 UART 的 FIFO 缓冲区。`FCR_FIFO_ENABLE` 用于启用 FIFO，`FCR_FIFO_CLEAR` 用于清除 FIFO 内容。

5. `ISR`：中断状态寄存器的偏移量，用于查看中断状态。

6. `LCR`：线路控制寄存器的偏移量，用于配置数据位数等线路参数。`LCR_EIGHT_BITS` 用于设置数据位数为八位，`LCR_BAUD_LATCH` 用于设置波特率。

7. `LSR`：线路状态寄存器的偏移量，用于检查线路状态。`LSR_RX_READY` 表示接收寄存器已有数据等待读取，`LSR_TX_IDLE` 表示传输寄存器可以接受另一个字符进行发送。

这些变量定义了对 UART 设备寄存器的访问方式，允许程序配置 UART 的操作和监控 UART 的状态。它们用于在嵌入式系统中控制串口通信的行为。

## 2. 实现 UART 初始化

```c
kernel/uart.c

void
uartinit(void)
{
  // disable interrupts.
  WriteReg(IER, 0x00);

  // special mode to set baud rate.
  WriteReg(LCR, LCR_BAUD_LATCH);

  // LSB for baud rate of 38.4K.
  WriteReg(0, 0x03);

  // MSB for baud rate of 38.4K.
  WriteReg(1, 0x00);

  // leave set-baud mode,
  // and set word length to 8 bits, no parity.
  WriteReg(LCR, LCR_EIGHT_BITS);

  // reset and enable FIFOs.
  WriteReg(FCR, FCR_FIFO_ENABLE | FCR_FIFO_CLEAR);

  // enable transmit and receive interrupts.
  WriteReg(IER, IER_TX_ENABLE | IER_RX_ENABLE);

  initlock(&uart_tx_lock, "uart");
}
```