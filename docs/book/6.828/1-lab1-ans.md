# Lab 1: Booting a PC

阅读：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

第一部分主要是为了熟悉使用 x86 汇编语言、QEMU x86 仿真器、以及 PC 的加电引导过程。第二部分查看我们的 6.828 内核的引导加载器，它位于 lab 的 boot 目录中。第三部分深入到名为 JOS 的 6.828 内核模型内部，它在 kernel 目录中。

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
    |    Low Memory    |
    |                  |
    +------------------+  <- 0x00000000

这台 PC 是基于 16 bit 的 8088 处理器，只能处理 1MB 的物理内存，所以物理地址是从  0x00000000 开始到 0x000FFFFF 结束，并非是 0xFFFFFFFF 结束。

![20220417235310](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220417235310.png)

前 640KB 的区域被标记为低内存，这也是早期 PC 唯一可以随机访问的区域，RAM 。此外最早期的 PC 可以设置为 16KB, 32KB, 或 64KB 的内存。

![20220417235853](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220417235853.png)

从 0x000A0000 到 0x000FFFFF 为硬件所保留，负责的功能有视频显示的缓冲区，其中最重要的是 Basic Input/Output System (BIOS) 。早期的 PC 中，这篇区域用 ROM 来存，也就是只能读，目前这篇区域用 flash 来存，读写均可。BIOS 负责一些初始化的工作，初始化完成后 BIOS 会把 OS 加载进内存最后将控制权交给 OS 。

![20220418000022](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220418000022.png)

使用 qemu 的调试功能去研究计算机是如何引导的。


When Intel finally "broke the one megabyte barrier" with the 80286 and 80386 processors, which supported 16MB and 4GB physical address spaces respectively, the PC architects nevertheless preserved the original layout for the low 1MB of physical address space in order to ensure backward compatibility with existing software. Modern PCs therefore have a "hole" in physical memory from 0x000A0000 to 0x00100000, dividing RAM into "low" or "conventional memory" (the first 640KB) and "extended memory" (everything else). In addition, some space at the very top of the PC's 32-bit physical address space, above all physical RAM, is now commonly reserved by the BIOS for use by 32-bit PCI devices.

https://pdos.csail.mit.edu/6.828/2018/labs/lab1/