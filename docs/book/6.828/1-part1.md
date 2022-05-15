# Lab 1: Booting a PC

阅读：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

这个实验由三部分组成：

* 第一部分主要是为了熟悉使用 x86 汇编语言、QEMU x86 仿真器、以及 PC 的加电引导过程。
* 第二部分查看我们的 6.828 内核的引导加载器，它位于 lab 的 boot 目录中。
* 第三部分深入到名为 JOS 的 6.828 内核模型内部，它在 kernel 目录中。

> 因为文章太长，拆分成了三篇。

# Part 1: PC Bootstrap

来源：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

这部分介绍 x86 汇编语言和 PC 引导过程，熟悉 QEMU 和 QEMU/GDB 调试。不用写代码但是需要回答问题。

## Exercise 1.

阅读材料，熟悉汇编语言。跳过了。

## The PC's Physical Address Space

`make qemu` 和 `make qemu-nox` 都是用来启动 qemu ，区别是后者不带图形界面。

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
    |     BIOS ROM     |    BIOS 基本的输入输出
    +------------------+  <- 0x000F0000 (960KB)
    |  16-bit devices, |
    |  expansion ROMs  |    
    +------------------+  <- 0x000C0000 (768KB)
    |   VGA Display    |    用于视频显示
    +------------------+  <- 0x000A0000 (640KB)
    |                  |
    |    Low Memory    |  早期 PC 唯一可以访问的区域
    |                  |  实际上早期 PC 一般内存大小为 16KB, 32KB, 或 64KB
    +------------------+  <- 0x00000000


早期的 PC 是 16bit ，例如 8088 处理器，只能处理 1MB 的物理内存。（为什么是 1MB 接下来会解释）

1. 内存布局的前 640KB 是低内存，这是早期 PC 唯一可以随机访问的区域。此外早期 PC 的内存可以设置为 16KB，32KB 或 64KB 。

2. 从 0x000A0000 到 0x000FFFFF 这片内存区域留给硬件使用，例如视频显示的缓冲区，Basic Input/Output System (BIOS) 。起初这片区域是用 ROM 来实现的，也就是只能读不能写，而目前是用 flash 来实现，读写均可。此外 BIOS 负责初始化，初始化完成后会将 OS 加载到内存中，此后将控制权交给 OS 。

随着时代的发展，PC 开始支持 4GB 内存，所以地址空间扩展到了 0xFFFFFFFF 。但是为了兼容已有的软件，保留了 0 - 1MB 之间的内存布局。0x000A0000 到 0x00100000 这区域看起来像是一个洞。前 640kb 是传统内存，剩余的部分是扩展内存。在 32 位下，PC 顶端的一些空间保留给 BIOS ，方便 32 位 PCI 设备使用。但是支持的内存空间已经超过了 4GB 的物理内存，也就是物理内存可以扩展到 0xFFFFFFFF 之上。但是为了兼容 32 位设备的映射，在 32 位高地址部分留给 BIOS 的这片内存区域依旧保留，看起来像第二个洞。本实验中， JOS 只使用了前 256MB，可以假设只有 32 位的物理内存。

* 为什么只能处理 1MB 的物理内存？

因为 16 位的 PC 数据线是 16 位($2^{16} = 64KB$)，而地址线是 20 位( $2^{20} = 1MB$)。数据线决定了一次能获取的数据量，所以一次只能取 64KB。而地址线决定了可寻址空间大小，所以寻址空间是 1MB 。这也解释了实模式下为什么段长是 64KB 。所以物理空间从 `0x00000000` 开始到 `0x000FFFFF` 结束，并非是 `0xFFFFFFFF` 结束。

而 32 位 PC 的地址空间是 32 位，所以大小为 $4G = 2^32$ 。物理空间从 `0x00000000` 开始，到 `0xFFFFFFFF` 结束。

* 新的问题，寄存器都是 16 位的，怎么表示 20 位的地址？

既然一个寄存器无法表示那么就用两个寄存器来表示，也就是分段。将 1MB 的空间在逻辑上以 64KB 为单位切分，段长就是 64KB 。地址由段基地址和段内偏移两部分组成，其中段基址左移四位再加上段内偏移即可。

段基址不一定是 65536 的倍数，因为段允许重叠。

* 为什么要分段？

## The ROM BIOS

这一部分将会使用 qemu 的 debug 工具来研究计算机启动。

![20220504195748](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220504195748.png)

可以用 tmux 开两个窗口，一个窗口输入 `make qemu-nox-gdb` 另一个窗口输入 `make gdb` 摘取其中一行输入信息：

    [f000:fff0] 0xffff0:	ljmp   $0xf000,$0xe05b

PC 从 0x000ffff0 开始执行，第一条要执行的指令是 jmp，跳转到分段地址 CS=0xf000 和 IP=0xe05b 。

起初因特尔是这样设计的，而 BIOS 处于 0x000f0000 和 0x000fffff 之间。这样设计确保了 PC 启动或重启都能获得机器的控制权。

QEMU 自带 BIOS 并且会将其放置在模拟的物理地址空间的位置上，当处理器复位时，模拟的处理器进入实模式，将 CS 设置为 0xf000，IP 设置为 0xfff0 。然后就在 CS:IP 段处开始执行。

分段地址 0xf000:ffff0 如何变成物理地址？这里面有一个公式：

    address = 16 * segment + offset

例如：

    16 * 0xf000 + 0xfff0   # in hex multiplication by 16 is
    = 0xf0000 + 0xfff0     # easy--just append a 0.
    = 0xffff0 

0xffff0 是 BIOS 结束前的16个字节（0x100000）。如果继续向后执行， 16 字节 BIOS 就结束了，这么小的空间能干什么？

## Exercise 2.

使用 gdb 的 si 指令搞清楚 BIOS 的大致情况，不需要搞清楚所有细节。

使用 si 逐行查看指令：

    [f000:fff0]    0xffff0: ljmp   $0xf000,$0xe05b  # 跳转到 `$0xfe05b` 处
    [f000:e05b]    0xfe05b: cmpl   $0x0,%cs:0x6ac8  # 若 0x6ac8 处的值为零则跳转
    [f000:e062]    0xfe062: jne    0xfd2e1
    [f000:e066]    0xfe066: xor    %dx,%dx          # 将 dx 寄存器清零
    [f000:e068]    0xfe068: mov    %dx,%ss          # 将 ss 寄存器清零
    [f000:e06a]    0xfe06a: mov    $0x7000,%esp     # esp = 0x7000 esp 始终指向栈顶
    [f000:e070]    0xfe070: mov    $0xf34c2,%edx    # edx = 0xf34c2 
    [f000:e076]    0xfe076: jmp    0xfd15c          # 跳转到 0xfd15c
    [f000:d15c]    0xfd15c: mov    %eax,%ecx        # ecx = eax
    [f000:d15f]    0xfd15f: cli                     # 关闭硬件中断
    [f000:d160]    0xfd160: cld                     # 设置了方向标志，表示后续操作的内存变化
    [f000:d161]    0xfd161: mov    $0x8f,%eax       # eax = 0x8f  接下来的三条指令用于关闭不可屏蔽中断
    [f000:d167]    0xfd167: out    %al,$0x70        # 0x70 和 0x71 是用于操作 CMOS 的端口
    [f000:d169]    0xfd169: in     $0x71,%al        # 从CMOS读取选择的寄存器
    [f000:d16b]    0xfd16b: in     $0x92,%al        # 读取系统控制端口A
    [f000:d16d]    0xfd16d: or     $0x2,%al         
    [f000:d16f]    0xfd16f: out    %al,$0x92        # 启动 A20
    [f000:d171]    0xfd171: lidtw  %cs:0x6ab8       # 加载到 IDT 表
    [f000:d177]    0xfd177: lgdtw  %cs:0x6a74       # 加载到 GDT 表
    [f000:d17d]    0xfd17d: mov    %cr0,%eax        # eax = cr0
    [f000:d180]    0xfd180: or     $0x1,%eax        # 
    [f000:d184]    0xfd184: mov    %eax,%cr0        # 打开保护模式
    [f000:d187]    0xfd187: ljmpl  $0x8,$0xfd18f    # 通过 ljmp 进入保护模式
    => 0xfd18f:     mov    $0x10,%eax               # 设置段寄存器
    => 0xfd194:     mov    %eax,%ds
    => 0xfd196:     mov    %eax,%es

当 BIOS 启动的时候会先设置中断描述表，然后初始化各种硬件，例如 VGA 。

当初始化 PCI 总线和 BIOS 知晓的所有重要设备后，将会寻找一个可启动的设备，如软盘、硬盘或CD-ROM。

最终，当找到一个可启动的磁盘时，BIOS 从磁盘上读取 boot loader 并将控制权转移给它。

## Part 1 总结

PC 通电后，CPU 首先执行 BIOS ，执行一些初始化工作。
