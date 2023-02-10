# Lab 1: Booting a PC

阅读：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

## 1. 简介

此实验分为下述三部分：
1. 第一部分用于熟悉 x86 汇编语言、QEMU 和 PC 启动流程。
2. 第二部分是研究 6.828 内核的启动加载器。
3. 第三部分深入研究了 6.828 内核本身的初始模板，名为 JOS ，位于内核目录中。

### 1.1 运行代码

首先下载代码：

    % mkdir ~/6.828
    % cd ~/6.828
    % add git
    % git clone https://pdos.csail.mit.edu/6.828/2018/jos.git lab
    Cloning into lab...
    % cd lab
    % 

代码跑在 qemu 模拟器上，没有跑在裸机上。

通过 `make` 命令可以构建 JOS 的 boot loader 和 kernel。

通过 `make qemu` 或  可以启动 qemu 。

在 SSH 窗口中使用 `make qemu-nox` 更方便，因为不会弹出窗口。

使用 `ctrl + a x` 可以退出 qemu 。


## 2. Part 1: PC Bootstrap

第一个练习的目的是学习x86汇编语言和PC启动过程，并开始使用 QEMU 和 QEMU/GDB 调试。这部分不需要为这部分实验写任何代码，但为了加深理解，还是需要认真研究并回答下面提出的问题。

### 2.1 从 x86 汇编语言开始

阅读 [《PC Assembly Language》](https://pdos.csail.mit.edu/6.828/2018/readings/pcasm-book.pdf) 但书中的汇编使用的是 Intel 风格，而代码采用的 GNU 风格，可以通过 [Brennan's Guide to Inline Assembly](http://www.delorie.com/djgpp/doc/brennan/brennan_att_inline_djgpp.html) 了解二者的差异，进而转换。


[Intel 80386 Reference Programmer's Manual Table of Contents](https://pdos.csail.mit.edu/6.828/2018/readings/i386/toc.htm)

:::danger💡 练习2.
练习1. 熟悉一下[6.828参考页](https://pdos.csail.mit.edu/6.828/2018/reference.html)上的汇编语言材料。阅读材料，熟悉汇编语言，了解两种汇编风格并学会转换。现在不用看，但是后续需要不断的参考。
:::

建议阅读[Brennan's Guide to Inline Assembly](http://www.delorie.com/djgpp/doc/brennan/brennan_att_inline_djgpp.html)中的 "The Syntax" 部分。它对我们将在JOS中与GNU汇编器一起使用的AT&T汇编语法做了很好的（而且相当简短）描述。

### 2.2 模拟 x86

进入 lab 目录，使用 make 构建系统，其中 kern 目录下的代码均为内核代码。

    athena% cd lab
    athena% make
    + as kern/entry.S
    + cc kern/entrypgdir.c
    + cc kern/init.c
    + cc kern/console.c
    + cc kern/monitor.c
    + cc kern/printf.c
    + cc kern/kdebug.c
    + cc lib/printfmt.c
    + cc lib/readline.c
    + cc lib/string.c
    + ld obj/kern/kernel
    + as boot/boot.S
    + cc -Os boot/main.c
    + ld boot/boot
    boot block is 380 bytes (max 510)
    + mk obj/kern/kernel.img

现在已经准备好运行 QEMU 了，提供上面创建的文件obj/kern/kernel.img，作为模拟PC的 "虚拟硬盘" 的内容。这个硬盘镜像包含启动加载器（obj/boot/boot）和内核（obj/kernel）。

使用 `make qemu` 或 `make qemu-nox` 启动。这就执行了QEMU，并带有设置硬盘和直接串口输出到终端所需的选项。一些文本应该出现在QEMU窗口中。

    Booting from Hard Disk...
    6828 decimal is XXX octal!
    entering test_backtrace 5
    entering test_backtrace 4
    entering test_backtrace 3
    entering test_backtrace 2
    entering test_backtrace 1
    entering test_backtrace 0
    leaving test_backtrace 0
    leaving test_backtrace 1
    leaving test_backtrace 2
    leaving test_backtrace 3
    leaving test_backtrace 4
    leaving test_backtrace 5
    Welcome to the JOS kernel monitor!
    Type 'help' for a list of commands.
    K>


在 "Booting from Hard Disk... "之后的所有内容都是由 JOS 内核打印的；`K> `是由我们包含在内核中的小型 _monitor_，即交互式控制程序打印的提示。如果使用了 `make qemu`，这些由内核打印出来的行会同时出现在你运行 QEMU 的常规 shell 窗口和 QEMU 显示窗口。这是因为为了测试和实验室评分的目的，我们设置了 JOS 内核，使其控制台输出不仅写入虚拟 VGA 显示器（如在QEMU窗口中看到的），而且写入模拟 PC 的虚拟串口，QEMU 再输出到自己的标准输出。同样，JOS 内核将接受来自键盘和串口的输入，所以你可以在VGA 显示窗口或运行 QEMU 的终端给它下命令。另外，你也可以通过运行`make qemu-nox`来使用串口控制台而不使用虚拟VGA。如果你是通过SSH进入Athena拨号系统，这可能很方便。要退出 `qemu` ，输入`Ctrl+a x`。

目前仅支持 help 和 kerninfo 这两个命令。


    K> help
    help - display this list of commands
    kerninfo - display information about the kernel
    K> kerninfo
    Special kernel symbols:
    entry  f010000c (virt)  0010000c (phys)
    etext  f0101a75 (virt)  00101a75 (phys)
    edata  f0112300 (virt)  00112300 (phys)
    end    f0112960 (virt)  00112960 (phys)
    Kernel executable memory footprint: 75KB
    K>

通过 `make qemu` 进入中断。此时终端仅支持 help 和 kerninfo 两个命令。其中 help 打印出可执行的命令，kerninfo 打印出内核信息。

此时已经将内核二进制文件(`obj/kern/kernel.img`)复制到磁盘的前几个扇区中。可以在真正的机器上这样做，但是不建议，因为可能会硬盘此前所保存的信息丢失。

### 2.3 PC 的内存地址空间布局

下图是 PC 的物理地址空间布局如下：

    +------------------+  <- 0xFFFFFFFF (4GB)
    |      32-bit      |
    |  memory mapped   |
    |     devices      |
    |                  |
    /\/\/\/\/\/\/\/\/\/\

    /\/\/\/\/\/\/\/\/\/\
    |                  |
    |      Unused      |
    |                  |
    +------------------+  <- depends on amount of RAM
    |                  |
    |                  |
    | Extended Memory  |
    |                  |
    |                  |
    +------------------+  <- 0x00100000 (1MB)
    |     BIOS ROM     |  
    +------------------+  <- 0x000F0000 (960KB)
    |  16-bit devices, |
    |  expansion ROMs  |    
    +------------------+  <- 0x000C0000 (768KB)
    |   VGA Display    | 
    +------------------+  <- 0x000A0000 (640KB) IOPHYSMEM
    |                  |
    |    Low Memory    | 
    |                  |  
    +------------------+  <- 0x00000000

够访问所需的内存，以便有效地执行其任务。I/O物理内存的大小可以根据系统的不同而变化，但在现代计算机中通常是几千兆字节。

第一批基于 16 位英特尔 8088 处理器的 PC ，只能够寻址 1MB 的物理内存。因此，早期 PC 的物理地址空间从 `0x00000000` 开始，但在 `0x000FFFFF` 而不是 `0xFFFFFFFF` 结束。标记为 "Low Memory" 的 640KB 区域是早期 PC 可以使用的唯一的随机存取内存（RAM）；事实上，最早期的PC只能配置16KB、32KB或64KB的RAM。

> 上图中的 IOPHYSMEM 指什么?
> 
> "IOPHYSMEM"指的是I/O物理内存，它是一个术语，用来描述计算机物理内存的一部分，保留给输入/输出（I/O）操作使用。I/O操作通常由设备驱动程序和其他低级系统软件组件执行，并需要直接访问物理内存，以确保低延迟和高性能。
> 
> I/O物理内存通常是从计算机的主系统内存中划分出来的，专门为I/O操作保留。这有助于防止I/O操作干扰其他系统进程，并确保它们能

从 `0x000A0000` 到 `0x000FFFFF` 的 384KB 区域被硬件保留，用于特殊用途，如视频显示缓冲区和非易失性存储器中的固件。其中最重要的部分是基本输入/输出系统（BIOS），它占据了从 `0x000F0000` 到 `0x000FFFFF` 的 64KB 区域。在早期的PC中，BIOS被保存在真正的只读存储器（ROM）中，但目前的PC将BIOS存储在可更新的闪存中。BIOS负责执行基本的系统初始化，如激活视频卡和检查安装的内存数量。执行这一初始化后，BIOS从一些适当的位置（如软盘、硬盘、CD-ROM或网络）加载操作系统，并将机器的控制权交给操作系统。

当英特尔最终用 80286 和 80386 处理器 "打破了 1MB 的障碍"，分别支持16MB和4GB的物理地址空间时，PC架构师还是保留了低1MB物理地址空间的原始布局，以确保与现有软件的后向兼容性。因此，现代PC的物理内存有一个从0x000A0000到0x00100000的 "洞"，将RAM分为 "低 "或 "传统内存"（前640KB）和 "扩展内存"（其他一切）。此外，在PC的32位物理地址空间的最顶端的一些空间，在所有物理RAM之上，现在通常由BIOS保留给32位PCI设备使用。

最近的x86处理器可以支持超过4GB的物理RAM，所以RAM可以进一步扩展到0xFFFFFFFF以上。在这种情况下，BIOS必须安排在系统的RAM中，在32位可寻址区域的顶部留出一个第二个“洞”，以便为这些32位设备留出映射空间。由于设计上的限制，JOS将只使用PC物理内存的前256MB，所以现在我们将假装所有的PC都 "只有 "32位物理地址空间。但是，处理复杂的物理地址空间和经过多年发展的硬件组织的其他方面，是操作系统开发的重要实际挑战之一。


* 为什么 16 位的内存地址却能处理 1MB 的物理内存？

> 因为地址线是 20 位，所以地址空间是 $2^{20}$ ，即 $1MB$ 。因为地址空间只有 1MB ，所以内存空间从 `0x00000000` 开始到 `0x000FFFFF` 结束。早期 PC 的数据线是 16 位，所以一次只能取 $2^{16}$ 大小的数据，即 640KB 大小。32 位 PC 的地址空间是 32 位，所以大小为 $4G = 2^32$ 。物理空间从 `0x00000000` 开始，到 `0xFFFFFFFF` 结束。
> 
> 在16位内存地址系统中，内存被分为两部分：一个段地址和该段内的偏移量。段地址用于定位内存中的段，偏移量用于定位该段中的特定字节。使用这种技术，每个段可以有多达64KB的内存，而内存的大小可以达到1MB，因为有多达65536（2^16）个可能的段地址。
> 
> 换句话说，物理内存的每个区段都被分配了一个唯一的16位区段地址，而区段内的内存位置则由偏移地址确定。通过结合段地址和偏移地址，系统可以访问整个1MB的内存。

1. [0x00000000, 0x000A0000 (640KB)] 称为 "Low Memory" ,早期 PC 唯一可用的随机存取存储器。实际上，最初的 PC 内存大小通常为 16 KB， 32 KB 或 64KB 的 RAM 。
2. [0x000A0000, 0x000FFFFF] 例如视频显示的缓冲区。
   1. 0x000F0000 到 0x000FFFFF 留给了 Basic Input/Output System (BIOS) 。起初这片区域是用 ROM 来实现的，也就是只能读不能写，而目前是用 flash 来实现，读写均可。此外 BIOS 负责初始化，初始化完成后会将 OS 加载到内存中，此后将控制权交给 OS 。
3. 随着时代的发展，PC 开始支持 4GB 内存，所以地址空间扩展到了 0xFFFFFFFF 。
   1. 为了兼容已有的软件，保留了 0 - 1MB 之间的内存布局。0x000A0000 到 0x00100000 这区域看起来像是一个洞。
   2. 前 640kb 是传统内存，剩余的部分是扩展内存。
   3. 在 32 位下，PC 顶端的一些空间保留给 BIOS ，方便 32 位 PCI 设备使用。但是支持的内存空间已经超过了 4GB 的物理内存，也就是物理内存可以扩展到 0xFFFFFFFF 之上。
   4. 但是为了兼容 32 位设备的映射，在 32 位高地址部分留给 BIOS 的这片内存区域依旧保留，看起来像第二个洞。
   5. 本实验中， JOS 只使用了前 256MB，可以假设只有 32 位的物理内存。

### 2.4 The ROM BIOS

这一部分将会使用 qemu 的 debug 工具来研究计算机启动。

在 lab 目录下使用 tmux 打开两个窗口输入下述内容：

    tmux
    ctrl + b %

一个窗口输入 `make qemu-gdb`（或 `make qemu-nox-gdb`）。这样就启动了QEMU，但是 QEMU 在处理器执行第一条指令之前就停止了，等待来自GDB的调试连接。在第二个终端运行 `make gdb` 将会输出下述内容：

    athena% make gdb
    GNU gdb (GDB) 6.8-debian
    Copyright (C) 2008 Free Software Foundation, Inc.
    License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
    This is free software: you are free to change and redistribute it.
    There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
    and "show warranty" for details.
    This GDB was configured as "i486-linux-gnu".
    + target remote localhost:26000
    The target architecture is assumed to be i8086
    [f000:fff0] 0xffff0:	ljmp   $0xf000,$0xe05b
    0x0000fff0 in ?? ()
    + symbol-file obj/kern/kernel
    (gdb) 

`.gdbinit` 文件中设置了 GDB 来调试早期启动时使用的 16 位代码，并指示它附加到监听的 QEMU。(如果它不工作，需要在主目录下的 .gdbinit 中添加一个添加自动加载安全路径使得 gdb 能够处理 `.gdbinit` 。gdb 会告诉你是否必须这样做)。

下面这一行。

    [f000:ff0] 0xffff0: ljmp $0xf000,$0xe05b

这是 GDB 反汇编出来的第一条指令，从中可以得出如下结论：

- PC 从物理地址 `0x000ffff0` 处开始执行，处于 ROM BIOS保留的64KB区域的最顶端。
- PC 从 `CS=0xf000` 和 `IP=0xfff0` 处开始执行。
- 第一条执行的指令是 jmp，跳转到分段地址 `CS=0xf000` 和 `IP=0xe05b` 。

为什么 QEMU 会这样开始？

Intel 的 8088 处理器起初是这样设计的。因为 BIOS 处于 `0x000f0000` 和 `0x000fffff` 之间。这样设计确保了 PC 启动或重启都能获得机器的控制权，这一点很重要，机器的 RAM 中没有其他软件可供处理器执行。

QEMU 模拟器有自己的 BIOS，它把它放在处理器的模拟物理地址空间的这个位置上。在处理器复位时，（模拟的）处理器进入真实模式，并将CS设置为0xf000，IP设置为0xfff0，这样就在该（CS:IP）段地址开始执行。

地址`0xf000:0xfff0`被选择为复位向量，因为它位于上层内存区，该区被保留给系统使用，通常不用于通用内存分配。这有助于确保复位向量不会被用户代码或数据所覆盖。

在8088处理器的情况下，复位向量被硬连接到处理器本身，不能被改变。这意味着，当处理器被重置时，它将总是从`CS=0xf000`和`IP=0xfff0`开始执行代码。

复位向量是一个内存位置，它包含了程序计数器（PC）或指令指针（IP）和代码段（CS）寄存器的初始值。这些值决定了复位事件后程序执行的起始点，如开机复位或硬件复位。

复位向量为处理器提供了一种方法，在复位后在一个已知的位置开始执行代码，使系统能够自我初始化并开始运行操作系统或其他软件。复位向量的地址通常是固定的，并在处理器的文档中指定。

在计算机系统中，复位向量通常位于内存中的一个固定地址，包含启动代码的起始地址，负责初始化系统和加载操作系统或其他软件。处理器复位和重启都是为了使系统回到初始状态，准备运行新的程序。不同的是，处理器复位只影响处理器的状态，而重启则影响整个系统的状态。

分段地址 `0xf000:ffff0` 是如何变成物理地址的？这里面有一个公式：

    物理地址 = 16 * segment + offset

例如：

    16 * 0xf000 + 0xfff0   # 这是 16 进制
    = 0xf0000 + 0xfff0     # 仅仅是左移一位
    = 0xffff0 

在实模式下使用段式内存管理。因为数据线为 16 位，所以一次只能取 $2^{16}$ 的数据，即 64KB 。而地址线是20 位，即 $2^{20}$ ，也就是一个16 位的数据无法一次性索引 20 位的地址空间。解决方案是分段，一个寄存器表示段基地址，另一个寄存器表示段偏移量，其中段基址左移四位(16 进制下就是左移一位)再加上段内偏移即可。段基址不一定是 65536 的倍数，因为段允许**重叠**。

注意左移四位在 16 进制下就是左移一位，其实就是让出高位。对于 0xf000 而言用 f 表示最高位。

0xffff0 是 BIOS 结束前的16个字节（0x100000）也是 PC 开始执行的第一条指令地址。如果继续向后执行， 16 字节 BIOS 就结束了，这么小的空间能干什么？

:::danger💡 Exercise 2.
> 使用GDB的 si(Step Instruction) 命令追踪到 ROM BIOS 中的几个指令，并尝试猜测它可能在做什么。
> 可以参考 Phil Storrs I/O 中关于端口的描述，以及[6.828参考资料页面](https://pdos.csail.mit.edu/6.828/2018/reference.html)上的其他资料。
> 不需要弄清楚所有的细节--只需要先弄清楚BIOS在做什么的大概意思。
::: 

:::callout 🍧

使用 si 逐行查看指令。这些汇编代码是实现引导程序的代码，用于在启动电脑之后将控制权转移到内存的不同位置。代码实现了以下操作：跳转到内存的不同位置、对于一些指令，在特定条件下执行跳转操作、清零寄存器、将 esp 寄存器指向栈顶、设置 edx 寄存器、关闭硬件中断、设置方向标志、关闭不可屏蔽中断、启动 A20 地址线、加载到 IDT 和 GDT 表、打开保护模式并进入保护模式

清零寄存器是初始化的一部分，为了防止因为前面的程序运行影响到当前程序的执行，在进入新的程序之前清零寄存器是很有必要的。此外，因为很多指令只能在特定的寄存器设置下才能正常执行，因此清零寄存器也有助于程序的可移植性。

将 ESP 寄存器指向栈顶可以确保当前程序使用栈时，栈始终在内存的合适位置。此外，如果不这样做，程序可能会出现栈溢出，这是一种严重的编程错误，可能导致程序崩溃或执行不正确的操作。

在操作系统的引导过程中，关闭硬件中断是一种保护机制，以防止在初始化系统之前发生不必要的硬件中断。在引导过程中，操作系统的内存布局和寄存器的状态都可能在任何时刻发生变化，因此，避免不必要的硬件中断可以确保操作系统的稳定性和正确性。同时，在引导过程结束后，操作系统可以选择启用硬件中断，以便正常运行。

方向标志是 CPU 中的一个标志位，用于控制字节操作的方向。在 x86 架构中，当方向标志被设置为 1 时，字节操作从高地址向低地址执行，这称为从高地址到低地址的字节操作。当方向标志被设置为 0 时，字节操作从低地址向高地址执行，这称为从低地址到高地址的字节操作。在操作系统中，设置方向标志可以帮助保证正确的字节顺序。例如，当写入数字的二进制表示时，如果方向标志没有设置正确，那么写入的数字可能不正确。因此，在操作系统的某些代码段中，在操作字节数据时可能需要设置或清除方向标志。

在一些特定情况下，不可屏蔽中断 (NMI) 可能会干扰系统正常运行，例如当系统正在进行一些关键操作时。关闭不可屏蔽中断可以确保系统在执行关键操作时不会被打断，从而避免对系统造成影响。

启动 A20 地址线。

打开保护模式并进入保护模式。

IDT 和 GDT 是两个在 x86 架构中常用的描述符表。IDT (Interrupt Descriptor Table) 是一个中断描述符表，它描述了各种硬件和软件中断的行为，包括处理方式和中断处理程序的地址。当硬件或软件中断发生时，CPU 会转到 IDT 中的相应描述符，执行相应的中断处理程序。GDT (Global Descriptor Table) 是一个全局描述符表，它描述了系统中各个代码段和数据段的性质，如大小、访问权限、执行属性等。GDT 的作用是提供给段寄存器选择段，并在进行内存访问时对内存访问进行限制。


整个代码的目的是为了启动操作系统并将控制权转移到保护模式，以便进一步加载操作系统的其他部分。

[f000:fff0]    0xffff0: ljmp   $0xf000,$0xe05b      # 该指令是一条长跳（ljmp）指令，跳转到 `$0xfe05b` 处，用于将控制权转移到内存的不同位置
[f000:e05b]    0xfe05b: cmpl   $0x0,%cs:0x6ac8      # 若 0x6ac8 处的值为零则跳转
[f000:e062]    0xfe062: jne    0xfd2e1
[f000:e066]    0xfe066: xor    %dx,%dx              # 将 dx 寄存器清零
[f000:e068]    0xfe068: mov    %dx,%ss              # 将 ss 寄存器清零
[f000:e06a]    0xfe06a: mov    $0x7000,%esp         # esp = 0x7000 esp 始终指向栈顶
[f000:e070]    0xfe070: mov    $0xf34c2,%edx        # edx = 0xf34c2 
[f000:e076]    0xfe076: jmp    0xfd15c              # 跳转到 0xfd15c
[f000:d15c]    0xfd15c: mov    %eax,%ecx            # ecx = eax
[f000:d15f]    0xfd15f: cli                         # 关闭硬件中断
[f000:d160]    0xfd160: cld                         # 设置了方向标志，表示后续操作的内存变化
[f000:d161]    0xfd161: mov    $0x8f,%eax           # eax = 0x8f  接下来的三条指令用于关闭不可屏蔽中断
[f000:d167]    0xfd167: out    %al,$0x70            # 0x70 和 0x71 是用于操作 CMOS 的端口
[f000:d169]    0xfd169: in     $0x71,%al            # 从CMOS读取选择的寄存器
[f000:d16b]    0xfd16b: in     $0x92,%al            # 读取系统控制端口A
[f000:d16d]    0xfd16d: or     $0x2,%al         
[f000:d16f]    0xfd16f: out    %al,$0x92            # 启动 A20
[f000:d171]    0xfd171: lidtw  %cs:0x6ab8           # 加载到 IDT 表
[f000:d177]    0xfd177: lgdtw  %cs:0x6a74           # 加载到 GDT 表
[f000:d17d]    0xfd17d: mov    %cr0,%eax            # eax = cr0
[f000:d180]    0xfd180: or     $0x1,%eax            # 
[f000:d184]    0xfd184: mov    %eax,%cr0            # 打开保护模式
[f000:d187]    0xfd187: ljmpl  $0x8,$0xfd18f        # 通过 ljmp 进入保护模式
=> 0xfd18f:     mov    $0x10,%eax                   # 设置段寄存器
=> 0xfd194:     mov    %eax,%ds
=> 0xfd196:     mov    %eax,%es
:::    

当 BIOS 启动的时候会先设置中断描述表，然后初始化各种硬件，例如 VGA 。

当初始化 PCI 总线和 BIOS 知晓的所有重要设备后，将会寻找一个可启动的设备，如软盘、硬盘或 CD-ROM 。

最终，当找到一个可启动的磁盘时，BIOS 从磁盘上读取 boot loader 并将控制权转移给它。

## Part 1 总结

PC 通电后，CPU 首先执行 BIOS ，从 `0xffff0` 开始执行指令，做一些初始化工作例如关闭中断，不可屏蔽中断。接下来开启 A20 地址线，然后进入保护模式。