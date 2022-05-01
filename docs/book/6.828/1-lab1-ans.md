# Lab 1: Booting a PC

阅读：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

这个实验由三部分组成，第一部分主要是为了熟悉使用 x86 汇编语言、QEMU x86 仿真器、以及 PC 的加电引导过程。第二部分查看我们的 6.828 内核的引导加载器，它位于 lab 的 boot 目录中。第三部分深入到名为 JOS 的 6.828 内核模型内部，它在 kernel 目录中。

## 0. 下载代码

    % mkdir ~/6.828
    % cd ~/6.828
    % git clone https://pdos.csail.mit.edu/6.828/2018/jos.git lab
    Cloning into lab...
    % cd lab
    % 

接下来阅读 [tools](https://pdos.csail.mit.edu/6.828/2018/tools.html) 进行环境配置。

## 1. 环境配置

环境：WSL2 ubuntu20.04

    sudo apt-get install -y build-essential gdb
    sudo apt-get install gcc-multilib

    git clone https://github.com/mit-pdos/6.828-qemu.git qemu
    sudo apt-get install libsdl1.2-dev libtool-bin libglib2.0-dev libz-dev libpixman-1-dev
    ./configure --disable-kvm --disable-werror --target-list="i386-softmmu x86_64-softmmu"

出错：

    /usr/bin/ld: qga/commands-posix.o: in function `dev_major_minor':
    /home/yunwei/qemu/qga/commands-posix.c:633: undefined reference to `major'
    /usr/bin/ld: /home/yunwei/qemu/qga/commands-posix.c:634: undefined reference to `minor'
    collect2: error: ld returned 1 exit status

在 `qga/commands-posix.c` 文件中加上头文件: `#include<sys/sysmacros.h>`

    make && make install

进入 lab 报错：

    $ make
    + ld obj/kern/kernel
    ld: warning: section `.bss' type changed to PROGBITS
    ld: obj/kern/printfmt.o: in function `printnum':
    lib/printfmt.c:41: undefined reference to `__udivdi3'
    ld: lib/printfmt.c:49: undefined reference to `__umoddi3'
    make: *** [kern/Makefrag:71: obj/kern/kernel] Error 1

解决方案是安装 4.8 的 gcc ，但是报错，原因是这个包没有在这个源中。

    $ sudo apt-get install -y gcc-4.8-multilib
    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    E: Unable to locate package gcc-4.8-multilib
    E: Couldn't find any package by glob 'gcc-4.8-multilib'
    E: Couldn't find any package by regex 'gcc-4.8-multilib'

经过一番折腾，看到了这篇[文章](https://blog.csdn.net/feinifi/article/details/121793945)。简单来说就是这个包在 Ubuntu16.04 下可以正常下载，那么增加这个办的源即可。在 `/etc/apt/sources.list` 中添加如下内容：

    deb http://dk.archive.ubuntu.com/ubuntu/ xenial main
    deb http://dk.archive.ubuntu.com/ubuntu/ xenial universe

切记，需要更新

    sudo apt-get update

然后再次启动 qemu 依旧报错（此时已经过去一天了🥲）

    $ make
    + ld obj/kern/kernel
    ld: warning: section `.bss' type changed to PROGBITS
    ld: obj/kern/printfmt.o: in function `printnum':
    lib/printfmt.c:41: undefined reference to `__udivdi3'
    ld: lib/printfmt.c:49: undefined reference to `__umoddi3'
    make: *** [kern/Makefrag:71: obj/kern/kernel] Error 1

经过分析，发现 gcc 版本没有修改

    $ gcc --version
    gcc (Ubuntu 8.4.0-3ubuntu2) 8.4.0
    Copyright (C) 2018 Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.  There is NO
    warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

于是将 gcc 版本改为 4.8 。删除原来的软连接，增加指向 4.8 版本的 软连接。查看版本更新成功。

    $ sudo rm /usr/bin/gcc
    $ sudo ln -s /usr/bin/gcc-4.8 /usr/bin/gcc
    $ gcc --version
    gcc (Ubuntu 4.8.5-4ubuntu2) 4.8.5
    Copyright (C) 2015 Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.  There is NO
    warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

再次编译，没有问题了！

    $ make
    + ld obj/kern/kernel
    ld: warning: section `.bss' type changed to PROGBITS
    + as boot/boot.S
    + cc -Os boot/main.c
    + ld boot/boot
    boot block is 380 bytes (max 510)
    + mk obj/kern/kernel.img

    $ sudo make qemu

至此，环境配置完成：

![20220417223135](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220417223135.png)

接下来继续阅读 lab1 ：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/ 

使用 `make grade` 来测试，验证程序是否正确。

## Part 1: PC Bootstrap

介绍 x86 汇编语言和 PC 引导过程，熟悉 QEMU 和 QEMU/GDB 调试。不用写代码但是需要回答问题。

### Exercise 1.

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
    |     BIOS ROM     |
    +------------------+  <- 0x000F0000 (960KB)
    |  16-bit devices, |
    |  expansion ROMs  |
    +------------------+  <- 0x000C0000 (768KB)
    |   VGA Display    |
    +------------------+  <- 0x000A0000 (640KB)
    |                  |
    |    Low Memory    |  早期 PC 唯一可以访问的区域
    |                  |  早期 PC 一般内存大小为 16KB, 32KB, 或 64KB
    +------------------+  <- 0x00000000

第一太 PC 是基于 16 bit 的 8088 处理器，只能处理 1MB 的物理内存，所以物理地址是从  0x00000000 开始到 0x000FFFFF 结束，并非是 0xFFFFFFFF 结束。

![20220417235310](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220417235310.png)

前 640KB 的区域被标记为低内存，这也是早期 PC 唯一可以随机访问的区域，RAM 。此外最早期的 PC 可以设置为 16KB, 32KB, 或 64KB 的内存。

![20220417235853](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220417235853.png)

从 0x000A0000 到 0x000FFFFF 为硬件所保留，负责的功能有视频显示的缓冲区，其中最重要的是 Basic Input/Output System (BIOS) 。早期的 PC 中，这篇区域用 ROM 来存，也就是只能读，目前这篇区域用 flash 来存，读写均可。BIOS 负责一些初始化的工作，初始化完成后 BIOS 会把 OS 加载进内存最后将控制权交给 OS 。

![20220418000022](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220418000022.png)

Intel 在 80286 和 80386 两个处理器上打破了 1 MB 的限制，分别支持 16 MB 和 4GB 物理地址空间。
但是 PC 架构师为了兼容已有的软件，依旧保留了低 0 - 1MB 之间的内存布局。

现代 PC 在 0x000A0000 到 0x00100000 之间看起来就想要一个“洞” ，这个洞将内存切分为传统内存（前 640kb）和扩展内存（剩余所有）。

此外，在PC的32位物理地址空间的最顶端的一些空间通常由BIOS保留，供 32 位 PCI 设备使用。

现代的 x86 处理器可以支持超过 4GB 的物理内存，所以物理内存可以扩展到 0xFFFFFFFF 之上。所以 BIOS 需要在 32 位可寻址区域的顶部留下第二个洞，为了兼容 32 位设备的映射。

这个实验的 JOS 只使用了前 256MB ，所以假设只有 32 位的物理空间。

这一部分将会使用 qemu 的 debug 工具来研究计算机启动。

可以用 tmux 开两个窗口，一个窗口输入 `make qemu-nox-gdb` 另一个窗口输入 `make gdb` 摘取其中一行输入信息：

    [f000:fff0] 0xffff0:	ljmp   $0xf000,$0xe05b

PC 从 0x000ffff0 开始执行，第一条要执行的指令是 jmp，跳转到分段地址 CS=0xf000 和 IP=0xe05b 。

因特尔最初是这样设计的，而 BIOS 处于 0x000f0000 和 0x000fffff 之间。这样设计确保了 PC 启动或重启都能获得机器的控制权。

QEMU 自带 BIOS 并且会将其放置在模拟的物理地址空间的位置上，当处理器复位时，模拟的处理器进入实模式，将 CS 设置为 0xf000，IP 设置为 0xfff0 。然后就在 CS:IP 段处开始执行。

分段地址 0xf000:ffff0 如何变成物理地址？这里面有一个公式：

    address = 16 * segment + offset

    16 * 0xf000 + 0xfff0   # in hex multiplication by 16 is
    = 0xf0000 + 0xfff0     # easy--just append a 0.
    = 0xffff0 

0xffff0 是 BIOS 结束前的16个字节（0x100000）。如果继续向后执行， 16 字节 BIOS 就结束了，这么小的空间能干什么？

### Exercise 2.

使用 gdb 的 si 指令搞清楚 BIOS 的大致情况，不需要搞清楚所有细节。

当 BIOS 启动的时候会先设置中断描述表，然后初始化各种硬件，例如 VGA 。

当初始化 PCI 总线和 BIOS 知晓的所有重要设备后，将会寻找一个可启动的设备，如软盘、硬盘或CD-ROM。

最终，当找到一个可启动的磁盘时，BIOS 从磁盘上读取 boot loader 并将控制权转移给它。

## Part 2: The Boot Loader

在磁盘或软盘中，512B 为一个扇区，扇区是最小单元。

如果磁盘是可启动的，第一个扇区被称为 boot sector ，因为这是启动加载器代码所在的地方。

当 BIOS 发现可启动的软盘或磁盘时，那么将会把 512B 的 boot sector 从磁盘加载到内存 0x7c00 到 0x7dff 之间。然后使用 jmp 指令设置 CS:IP 为 0000:7c00 最后将控制权传递给引导装载程序。

与 BIOS 的加载地址一样，这些地址是相当随意的--但它们对PC来说是固定的和标准化的。

在 6.828 中使用传统的硬盘启动机制，也就是 boot loader 不能超过 512B 。

boot loader 由汇编语言 `boot/boot.S` 和一个 C 语言文件 `boot/main.c` 组成。需要搞明白这两个文件的内容。

Boot Loader 负责两个功能：

1. boot loader 从实模式切换到 32 位的保护模式，因为只有在保护模式下软件才能访问超过 1MB 的物理内存。此外在保护模式下，段偏移量就变为了 32 而非 16 。
2. 其次，Boot Loader 通过 x86 的特殊 I/O 指令直接访问 IDE 磁盘设备寄存器，从硬盘上读取内核。


理解了 Boot Loader 的源代码后，看看 `obj/boot/boot.asm` 文件。这个文件是 GNUmakefile 在编译 Boot Loader 后创建的 Boot Loader 的反汇编。这个反汇编文件使我们很容易看到 Boot Loader 的所有代码在物理内存中的位置，也使我们更容易在 GDB 中跟踪 Boot Loader 发生了什么。同样的，`obj/kern/kernel.asm` 包含了 JOS 内核的反汇编，这对调试很有用。

在 gdb 中使用 b *0x7c00 在该地址处设置断点，然后使用 c 或 si 继续执行。c 将会跳转到下一个断点处，而 si 跳转到下一条指令，si N 则一次跳转 N 条指令。

使用 `x/Ni ADDR` 来打印地址中存储的内容。其中 N 是要反汇编的连续指令的数量，ADDR 是开始反汇编的内存地址。

## Exercise 3. 

阅读 [lab tools guide](https://pdos.csail.mit.edu/6.828/2018/labguide.html)，即使你已经很熟悉了，最好看看。

在 0x7c00 设置一个断点，启动扇区将会加载到此处。跟踪 `boot/boot.S` 并使用 `obj/boot/boot.asm` 来定位当前执行位置。使用 GDB 的 x/i 命令来反汇编 Boot Loader 中的指令序列并和 `obj/boot/boot.asm` 比较。

跟踪 boot/main.c 中的 bootmain() 函数，此后追踪到 readsect() 并研究对应的汇编指令，然后返回到 bootmain() 。确定从磁盘上读取内核剩余扇区的for循环的开始和结束。找出循环结束后将运行的代码，在那里设置一个断点，并继续到该断点。然后逐步完成 Boot Loader 的剩余部分。

* 回答下面的问题：

1. 在什么时候，处理器开始执行32位代码？究竟是什么原因导致从16位到32位模式的转换？

2. Boot Loader执行的最后一条指令是什么，它刚刚加载的内核的第一条指令是什么？

3. 内核的第一条指令在哪里？

4. Boot Loader如何决定它必须读取多少个扇区才能从磁盘上获取整个内核？它在哪里找到这些信息？

接下来进一步研究 `boot/main.c` 中的 C 语言部分。

### Exercise 4.

建议阅读 'K&R' 5.1 到 5.5 搞清楚指针，此外弄清楚 [pointers.c](https://pdos.csail.mit.edu/6.828/2018/labs/lab1/pointers.c) 的输出，否则后续会很痛苦。

需要了解 ELF 二进制文件才能搞清楚 `boot/main.c` 。

当编译链接一个 C 语言程序时，首先需要将 .c 文件编译为 .o 结尾的 object 文件，其中包含了相应的二进制格式的汇编指令。

链接器将所有的 .o 文件链接为单个二进制镜像，例如 `obj/kern/kernel` ，这是一个 ELF 格式的二进制文件，全称叫做 “Executable and Linkable Format” 。此处可以简单的将 ELF 认为头部带有加载信息，然后是是程序部分，每部分都是连续的代码或数据块，将指定的地址加载到内存中。Boot Loader 将其加载到内存中并开始执行。

