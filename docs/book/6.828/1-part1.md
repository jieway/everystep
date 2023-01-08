# Lab 1: Booting a PC

阅读：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

## 1. 如何配置环境？

上一篇文章

## 2. 如何下载并运行代码？

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

## 3. x86 汇编没学过怎么办？

阅读 [《PC Assembly Language》](https://pdos.csail.mit.edu/6.828/2018/readings/pcasm-book.pdf) 但书中的汇编使用的是 Intel 风格，而代码采用的 GNU 风格，可以通过 [Brennan's Guide to Inline Assembly](http://www.delorie.com/djgpp/doc/brennan/brennan_att_inline_djgpp.html) 了解二者的差异，进而转换。


[Intel 80386 Reference Programmer's Manual Table of Contents](https://pdos.csail.mit.edu/6.828/2018/readings/i386/toc.htm)

## 4. Exercise 1. 如何解决？

阅读材料，熟悉汇编语言，了解两种汇编风格并学会转换。现在不用看，但是后续需要不断的参考。

## 5. 如何使用终端？

通过 `make qemu` 进入中断。此时终端仅支持 help 和 kerninfo 两个命令。其中 help 打印出可执行的命令，kerninfo 打印出内核信息。

此时已经将内核二进制文件(`obj/kern/kernel.img`)复制到磁盘的前几个扇区中。可以在真正的机器上这样做，但是不建议，因为可能会硬盘此前所保存的信息丢失。


## 6. PC 的内存地址空间布局是什么？

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


最初的 PC 是 16 位，例如因特尔 8088 处理器，并且只能处理 1MB 的物理内存。因此，早期PC的物理地址空间将从0x00000000开始，但在0x000FFFFF而不是0xFFFFFFFF结束。

* 为什么 16 位的内存地址却能处理 1MB 的物理内存？

> 因为地址线是 20 位，所以地址空间是 $2^{20}$ ，即 $1MB$ 。因为地址空间只有 1MB ，所以内存空间从 `0x00000000` 开始到 `0x000FFFFF` 结束。早期 PC 的数据线是 16 位，所以一次只能取 $2^{16}$ 大小的数据，即 64KB 大小。32 位 PC 的地址空间是 32 位，所以大小为 $4G = 2^32$ 。物理空间从 `0x00000000` 开始，到 `0xFFFFFFFF` 结束。

1. [0x00000000, 0x000A0000 (640KB)] 称为 "Low Memory" ,早期 PC 唯一可用的随机存取存储器。实际上，最初的 PC 内存大小通常为 16 KB， 32 KB 或 64KB 的 RAM 。
2. [0x000A0000, 0x000FFFFF] 例如视频显示的缓冲区，其中 0x000F0000 到 0x000FFFFF 留给了 Basic Input/Output System (BIOS) 。起初这片区域是用 ROM 来实现的，也就是只能读不能写，而目前是用 flash 来实现，读写均可。此外 BIOS 负责初始化，初始化完成后会将 OS 加载到内存中，此后将控制权交给 OS 。

随着时代的发展，PC 开始支持 4GB 内存，所以地址空间扩展到了 0xFFFFFFFF 。但是为了兼容已有的软件，保留了 0 - 1MB 之间的内存布局。0x000A0000 到 0x00100000 这区域看起来像是一个洞。前 640kb 是传统内存，剩余的部分是扩展内存。在 32 位下，PC 顶端的一些空间保留给 BIOS ，方便 32 位 PCI 设备使用。但是支持的内存空间已经超过了 4GB 的物理内存，也就是物理内存可以扩展到 0xFFFFFFFF 之上。但是为了兼容 32 位设备的映射，在 32 位高地址部分留给 BIOS 的这片内存区域依旧保留，看起来像第二个洞。本实验中， JOS 只使用了前 256MB，可以假设只有 32 位的物理内存。

## 7. 启动流程分析

这一部分将会使用 qemu 的 debug 工具来研究计算机启动。

debug 时需要开两个窗口，建议 tmux 。一个窗口输入 `make qemu-nox-gdb` 另一个窗口输入 `make gdb` 摘取其中一行输出信息：

    [f000:fff0] 0xffff0:	ljmp   $0xf000,$0xe05b

这是 GDB 反汇编出来的第一条指令，从中可以得出 PC 从物理地址 `0x000ffff0` 处开始执行，处于 BIOS 地址的顶部。

PC 从 `CS=0xf000` 和 `IP=0xfff0` 处开始执行。

第一条执行的指令是 jmp，跳转到分段地址 `CS=0xf000` 和 `IP=0xe05b` 。

为什么 qemu 从此处开始执行？

Intel 的 8088 处理器起初是这样设计的。因为 BIOS 处于 `0x000f0000` 和 `0x000fffff` 之间。这样设计确保了 PC 启动或重启都能获得机器的控制权，此外 BIOS 写死在这个地方。因为启动的时候只有 BIOS 能够被 CPU 处理。

qemu 自带的 BIOS 会模拟真实的物理地址空间。当处理器启动，模拟的处理器进入实模式后会将 CS 设置为 0xf000，IP 设置为 0xfff0 。此后就在 CS:IP 段处开始执行。

分段地址 0xf000:ffff0 如何变成物理地址？这里面有一个公式：

    address = 16 * segment + offset

例如：

    16 * 0xf000 + 0xfff0   # 这是 16 进制
    = 0xf0000 + 0xfff0     # 仅仅是左移一位
    = 0xffff0 

在实模式下使用段式内存管理。因为数据线为 16 位，所以一次只能取 $2^{16}$ 的数据，即 64KB 。而地址线是20 位，即 $2^{20}$ ，也就是一个16 位的数据无法一次性索引 20 位的地址空间。解决方案是分段，一个寄存器表示段基地址，另一个寄存器表示段偏移量，其中段基址左移四位(16 进制下就是左移一位)再加上段内偏移即可。段基址不一定是 65536 的倍数，因为段允许重叠。

0xffff0 是 BIOS 结束前的16个字节（0x100000）也是 PC 开始执行的第一条指令地址。如果继续向后执行， 16 字节 BIOS 就结束了，这么小的空间能干什么？

## 8. Exercise 2.

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

当初始化 PCI 总线和 BIOS 知晓的所有重要设备后，将会寻找一个可启动的设备，如软盘、硬盘或 CD-ROM 。

最终，当找到一个可启动的磁盘时，BIOS 从磁盘上读取 boot loader 并将控制权转移给它。

## Part 1 总结

PC 通电后，CPU 首先执行 BIOS ，执行一些初始化工作。
