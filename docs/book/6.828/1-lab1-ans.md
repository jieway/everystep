# Lab 1: Booting a PC

阅读：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

## 0. 环境配置

    % mkdir ~/6.828
    % cd ~/6.828
    % git clone https://pdos.csail.mit.edu/6.828/2018/jos.git lab
    Cloning into lab...
    % cd lab
    % 

接下来阅读：https://pdos.csail.mit.edu/6.828/2018/tools.html ，进行环境配置。



## Part 1: PC Bootstrap

介绍x86汇编语言和PC引导过程，熟悉 QEMU 和 QEMU/GDB 调试。不用写代码但是需要回答问题。

### Exercise 1.

练习1. 熟悉6.828参考页上的汇编语言材料。你现在不必阅读它们，但是在阅读和编写x86汇编时，你几乎肯定想参考其中的一些材料。

我们确实建议阅读布伦南的内联汇编指南中的“语法”一节。它对我们将在JOS中与GNU汇编程序一起使用的AT&T汇编语法进行了很好的（非常简短）描述。

Certainly the definitive reference for x86 assembly language programming is Intel's instruction set architecture reference, which you can find on the 6.828 reference page in two flavors: an HTML edition of the old 80386 Programmer's Reference Manual, which is much shorter and easier to navigate than more recent manuals but describes all of the x86 processor features that we will make use of in 6.828; and the full, latest and greatest IA-32 Intel Architecture Software Developer's Manuals from Intel, covering all the features of the most recent processors that we won't need in class but you may be interested in learning about. An equivalent (and often friendlier) set of manuals is available from AMD. Save the Intel/AMD architecture manuals for later or use them for reference when you want to look up the definitive explanation of a particular processor feature or instruction.

当然，x86汇编语言编程的权威参考是英特尔的指令集架构参考，您可以在6.828参考页面上找到两种版本：旧80386程序员参考手册的超文本标记语言版本，它比最近的手册更短、更容易导航，但描述了我们将在6.828中使用的所有x86处理器功能；以及英特尔的完整、最新和最伟大的IA-32英特尔架构软件开发人员手册，涵盖了我们在课堂上不需要的最新处理器的所有功能，但您可能有兴趣了解。一套等效的（通常更友好的）手册可以从AMD获得。请将英特尔/AMD架构手册保存到以后，或者在您想查找特定处理器功能或指令的最终解释时使用它们作为参考。

Simulating the x86


To get started, extract the Lab 1 files into your own directory on Athena as described above in "Software Setup", then type make (or gmake on BSD systems) in the lab directory to build the minimal 6.828 boot loader and kernel you will start with. (It's a little generous to call the code we're running here a "kernel," but we'll flesh it out throughout the semester.)

首先，按照上述软件设置中的描述，将Lab 1文件提取到您自己在Athena上的目录中，然后在lab目录中键入make（或BSD系统上的gmake），构建您将开始使用的最小的6.828引导加载器和内核。（将我们在这里运行的代码称为“内核”有点慷慨，但我们将在整个学期中充实它。）

    % cd lab
    % make
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

(If you get errors like "undefined reference to `__udivdi3'", you probably don't have the 32-bit gcc multilib. If you're running Debian or Ubuntu, try installing the gcc-multilib package.)

（如果你遇到像"未定义引用'__udivdi3'"这样的错误，你可能没有32位的 gcc Multilib。如果你在运行Debian或Ubuntu，试着安装gcc-Multilib包。）

Now you're ready to run QEMU, supplying the file obj/kern/kernel.img, created above, as the contents of the emulated PC's "virtual hard disk." This hard disk image contains both our boot loader (obj/boot/boot) and our kernel (obj/kernel).

现在您已经准备好运行QEMU，提供上面创建的文件obj/kern/kernel.img作为模拟电脑“虚拟硬盘”的内容这个硬盘映像包含我们的引导加载程序（obj/引导/引导）和内核（obj/内核）。
athena% make qemu
雅典娜%使qemu
orathena% make qemu-nox
orathena%使qemu-nox
This executes QEMU with the options required to set the hard disk and direct serial port output to the terminal. Some text should appear in the QEMU window:
这将使用设置硬盘和将串口输出直接发送到终端所需的选项执行QEMU。QEMU窗口中应该出现一些文本：
Booting from Hard Disk...
从硬盘启动...
6828 decimal is XXX octal!
6828小数是XXX八进制！
entering test_backtrace 5
进入5test_backtrace
entering test_backtrace 4
进入test_backtrace4
entering test_backtrace 3
进入test_backtrace3
entering test_backtrace 2
进入2test_backtrace
entering test_backtrace 1
进入test_backtrace1
entering test_backtrace 0
输入test_backtrace0
leaving test_backtrace 0
离开test_backtrace0
leaving test_backtrace 1
离开test_backtrace1
leaving test_backtrace 2
离开test_backtrace2
leaving test_backtrace 3
离开test_backtrace3
leaving test_backtrace 4
离开test_backtrace4
leaving test_backtrace 5
离开test_backtrace5
Welcome to the JOS kernel monitor!
欢迎使用JOS内核监视器！
Type 'help' for a list of commands.
为命令列表键入“帮助”。
K>
K>
Everything after 'Booting from Hard Disk...' was printed by our skeletal JOS kernel; the K> is the prompt printed by the small monitor, or interactive control program, that we've included in the kernel. If you used make qemu, these lines printed by the kernel will appear in both the regular shell window from which you ran QEMU and the QEMU display window. This is because for testing and lab grading purposes we have set up the JOS kernel to write its console output not only to the virtual VGA display (as seen in the QEMU window), but also to the simulated PC's virtual serial port, which QEMU in turn outputs to its own standard output. Likewise, the JOS kernel will take input from both the keyboard and the serial port, so you can give it commands in either the VGA display window or the terminal running QEMU. Alternatively, you can use the serial console without the virtual VGA by running make qemu-nox. This may be convenient if you are SSH'd into an Athena dialup. To quit qemu, type Ctrl+a x.
从硬盘启动...之后的所有内容都由我们的骨架JOS内核打印；K>是由我们包含在内核中的小型监视器或交互式控制程序打印的提示。如果您使用make qemu，内核打印的这些行将出现在运行QEMU的常规外壳窗口和QEMU显示窗口中。这是因为出于测试和实验室分级的目的，我们已经设置了JOS内核，不仅将控制台输出写入虚拟VGA显示器（如QEMU窗口所示），还将其写入模拟电脑的虚拟串行端口，QEMU反过来将其输出为自己的标准输出。同样，JOS内核将接受键盘和串行端口的输入，因此您可以在VGA显示窗口或运行QEMU的终端中给它命令。或者，您可以通过运行make qemu-nox来使用没有虚拟VGA的串行控制台。如果你是SSH到Athena拨号，这可能会很方便。要退出qemu，输入Ctrl+a x。
There are only two commands you can give to the kernel monitor, help and kerninfo.
你只能给内核监视器两个命令，help和kerninfo。
K> help
K>帮助
help - display this list of commands
help-显示此命令列表
kerninfo - display information about the kernel
Kerninfo-显示关于内核的信息
K> kerninfo
K>kerninfo
Special kernel symbols:
特殊内核符号：
  entry  f010000c (virt)  0010000c (phys)
条目f010000c（virt）0010000c（phys）
  etext  f0101a75 (virt)  00101a75 (phys)
文本f0101a75（virt）00101a75（phys）
  edata  f0112300 (virt)  00112300 (phys)
edata f0112300（virt）00112300（phys）
  end    f0112960 (virt)  00112960 (phys)
结束f0112960（virt）00112960（phys）
Kernel executable memory footprint: 75KB
内核可执行内存占用：75KB
K>
K>
The help command is obvious, and we will shortly discuss the meaning of what the kerninfo command prints. Although simple, it's important to note that this kernel monitor is running "directly" on the "raw (virtual) hardware" of the simulated PC. This means that you should be able to copy the contents of obj/kern/kernel.img onto the first few sectors of a real hard disk, insert that hard disk into a real PC, turn it on, and see exactly the same thing on the PC's real screen as you did above in the QEMU window. (We don't recommend you do this on a real machine with useful information on its hard disk, though, because copying kernel.img onto the beginning of its hard disk will trash the master boot record and the beginning of the first partition, effectively causing everything previously on the hard disk to be lost!)
帮助命令是显而易见的，我们将很快讨论kerninfo命令打印的内容的含义。虽然简单，但重要的是要注意，这个内核监视器“直接”在模拟电脑的“原始（虚拟）硬件”上运行。这意味着你应该能够将obj/kern/kernel.img的内容复制到真实硬盘的前几个扇区，将硬盘插入真实电脑，打开它，在电脑的真实屏幕上看到与上面在QEMU窗口中看到的完全相同的东西。不过，我们不建议您在硬盘上有有用信息的真实机器上这样做，因为将kernel.img复制到硬盘的开头会丢弃主引导记录和第一个分区的开头，有效地导致硬盘上以前的所有内容都丢失！）
The PC's Physical Address Space
PC的物理地址空间
We will now dive into a bit more detail about how a PC starts up. A PC's physical address space is hard-wired to have the following general layout:
现在，我们将深入探讨有关PC如何启动的更多细节。PC的物理地址空间是硬连线的，具有以下总体布局：
+------------------+ <- 0xFFFFFFFF (4GB) | 32-bit | | memory mapped | | devices | | | /\/\/\/\/\/\/\/\/\/\ /\/\/\/\/\/\/\/\/\/\ | | | Unused | | | +------------------+ <- depends on amount of RAM | | | | | Extended Memory | | | | | +------------------+ <- 0x00100000 (1MB) | BIOS ROM | +------------------+ <- 0x000F0000 (960KB) | 16-bit devices, | | expansion ROMs | +------------------+ <- 0x000C0000 (768KB) | VGA Display | +------------------+ <- 0x000A0000 (640KB) | | | Low Memory | | | +------------------+ <- 0x00000000 The first PCs, which were based on the 16-bit Intel 8088 processor, were only capable of addressing 1MB of physical memory. The physical address space of an early PC would therefore start at 0x00000000 but end at 0x000FFFFF instead of 0xFFFFFFFF. The 640KB area marked "Low Memory" was the only random-access memory (RAM) that an early PC could use; in fact the very earliest PCs only could be configured with 16KB, 32KB, or 64KB of RAM!
+------------------+ <- 0xFFFFFFFF（4GB）|32位||内存映射||设备 | | | /\/\/\/\/\/\/\/\/\/\ /\/\/\/\/\/\/\/\/\/\ | | | 未使用的 | | | +------------------+ <- 取决于内存的数量 | | | | | 扩展内存 | | | | | +------------------+ <- 0x00100000 (1MB）|BIOS ROM | +------------------+ <- 0x000F0000（960KB）|16位设备，||扩展ROM | +------------------+ <- 0x000C0000（768KB）|VGA显示 | +------------------+ <- 0x000A0000（640KB) | | | 低内存 | | | +------------------+ <- 0x00000000第一台电脑基于16位英特尔8088处理器，只能寻址1MB的物理内存。因此，早期电脑的物理地址空间将从0x00000000开始，但结束于0x000FFFFF，而不是0xFFFFFFFF。标记为“低内存”的640KB区域是早期电脑可以使用的唯一随机存取存储器；事实上，最早的电脑只能配置16KB、32KB或64KB的内存！
The 384KB area from 0x000A0000 through 0x000FFFFF was reserved by the hardware for special uses such as video display buffers and firmware held in non-volatile memory. The most important part of this reserved area is the Basic Input/Output System (BIOS), which occupies the 64KB region from 0x000F0000 through 0x000FFFFF. In early PCs the BIOS was held in true read-only memory (ROM), but current PCs store the BIOS in updateable flash memory. The BIOS is responsible for performing basic system initialization such as activating the video card and checking the amount of memory installed. After performing this initialization, the BIOS loads the operating system from some appropriate location such as floppy disk, hard disk, CD-ROM, or the network, and passes control of the machine to the operating system.
从0x000A0000到0x000FFFFF的384KB区域由硬件保留，用于特殊用途，如视频显示缓冲区和保存在非易失性存储器中的固件。该保留区域中最重要的部分是基本输入/输出系统（BIOS），它占据了从0x000F0000到0x000FFFFF的64KB区域。在早期的个人电脑中，BIOS保存在真正的只读存储器中，但目前的个人电脑将BIOS存储在可更新的闪存中。BIOS负责执行基本的系统初始化，如激活显卡和检查安装的内存量。执行此初始化后，BIOS将从软盘、硬盘、CD-ROM或网络等适当位置加载操作系统，并将机器的控制权传递给操作系统。
When Intel finally "broke the one megabyte barrier" with the 80286 and 80386 processors, which supported 16MB and 4GB physical address spaces respectively, the PC architects nevertheless preserved the original layout for the low 1MB of physical address space in order to ensure backward compatibility with existing software. Modern PCs therefore have a "hole" in physical memory from 0x000A0000 to 0x00100000, dividing RAM into "low" or "conventional memory" (the first 640KB) and "extended memory" (everything else). In addition, some space at the very top of the PC's 32-bit physical address space, above all physical RAM, is now commonly reserved by the BIOS for use by 32-bit PCI devices.
当英特尔最终以分别支持16MB和4GB物理地址空间的80286和80386处理器“突破1兆字节的障碍”时，个人电脑架构师仍然保留了低1MB物理地址空间的原始布局，以确保与现有软件的向后兼容。因此，现代个人电脑的物理内存从0x000A0000到0x00100000有一个“洞”，将内存分为“低”或“常规内存”（第一个640KB）和“扩展内存”（其他一切）。此外，个人电脑32位物理地址空间最顶端的一些空间，尤其是物理内存，现在通常由BIOS保留，供32位PCI设备使用。
Recent x86 processors can support more than 4GB of physical RAM, so RAM can extend further above 0xFFFFFFFF. In this case the BIOS must arrange to leave a second hole in the system's RAM at the top of the 32-bit addressable region, to leave room for these 32-bit devices to be mapped. Because of design limitations JOS will use only the first 256MB of a PC's physical memory anyway, so for now we will pretend that all PCs have "only" a 32-bit physical address space. But dealing with complicated physical address spaces and other aspects of hardware organization that evolved over many years is one of the important practical challenges of OS development.
最近的x86处理器可以支持超过4GB的物理内存，因此内存可以扩展到0xFFFFFF以上。在这种情况下，BIOS必须安排在系统的32位可寻址区域顶部的内存中留下第二个孔，为这些32位设备留下映射的空间。由于设计限制，JOS无论如何只会使用电脑物理内存的前256MB，所以现在我们将假装所有电脑都“只有”32位物理地址空间。但是处理复杂的物理地址空间和经过多年发展的硬件组织的其他方面是操作系统开发的重要实际挑战之一。
The ROM BIOS
ROM BIOS
In this portion of the lab, you'll use QEMU's debugging facilities to investigate how an IA-32 compatible computer boots.
在实验室的这一部分，您将使用QEMU的调试工具来研究IA-32兼容计算机是如何启动的。
Open two terminal windows and cd both shells into your lab directory. In one, enter make qemu-gdb (or make qemu-nox-gdb). This starts up QEMU, but QEMU stops just before the processor executes the first instruction and waits for a debugging connection from GDB. In the second terminal, from the same directory you ran make, run make gdb. You should see something like this,
打开两个终端窗口，将两个shell光盘放入实验室目录。在其中一个中，输入make qemu-gdb（或make qemu-nox-gdb）。这将启动QEMU，但QEMU在处理器执行第一条指令之前停止，并等待GDB的调试连接。在第二个终端中，从您运行make的同一目录中，运行make gdb。您应该会看到这样的内容，
athena% make gdb
雅典娜%使gdb
GNU gdb (GDB) 6.8-debian
GNU gdb（GDB）6.8-debian
Copyright (C) 2008 Free Software Foundation, Inc.
版权所有（C）2008自由软件基金会，有限公司。
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
许可证GPLv3+： GNU GPL版本3或更高版本<http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
这是免费软件：您可以自由更改和重新发布它。
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
在法律允许的范围内，没有保证。键入“显示复制”
and "show warranty" for details.
并“出示保修”了解详情。
This GDB was configured as "i486-linux-gnu".
此GDB配置为"i486-linux-gnu"。
+ target remote localhost:26000
+目标远程localhost:26000
The target architecture is assumed to be i8086
假设目标架构为i8086
[f000:fff0] 0xffff0:        ljmp   $0xf000,$0xe05b
[f000： fff0] 0xffff0： ljmp$0xf000，$0xe05b
0x0000fff0 in ?? ()
0x0000fff0在？？（）
+ symbol-file obj/kern/kernel
+符号文件obj/kern/内核
(gdb) 
（gdb）
We provided a .gdbinit file that set up GDB to debug the 16-bit code used during early boot and directed it to attach to the listening QEMU. (If it doesn't work, you may have to add an add-auto-load-safe-path in your .gdbinit in your home directory to convince gdb to process the .gdbinit we provided. gdb will tell you if you have to do this.)
我们提供了一个. gdbinit文件，该文件设置GDB来调试早期引导期间使用的16位代码，并指示它附加到侦听QEMU。（如果它不起作用，您可能必须在主目录中的. gdbinit中添加一个add-auto-load-sec-path，以说服gdb处理我们提供的. gdbinit。如果必须这样做，gdb会告诉您。）
The following line:
以下一行：
[f000:fff0] 0xffff0:        ljmp   $0xf000,$0xe05b
[f000： fff0] 0xffff0： ljmp$0xf000，$0xe05b
is GDB's disassembly of the first instruction to be executed. From this output you can conclude a few things:
是GDB对要执行的第一条指令的反汇编。从这个输出可以得出一些结论：
- The IBM PC starts executing at physical address 0x000ffff0, which is at the very top of the 64KB area reserved for the ROM BIOS.
- IBMPC从物理地址0x000ffff0开始执行，该地址位于为ROM BIOS保留的64KB区域的最顶端。
- The PC starts executing with CS = 0xf000 and IP = 0xfff0.
- PC以CS=0xf000和IP=0xfff0开始执行。
- The first instruction to be executed is a jmp instruction, which jumps to the segmented address CS = 0xf000 and IP = 0xe05b.
- 要执行的第一个指令是jmp指令，它跳转到分段地址CS=0xf000和IP=0xe05b。
Why does QEMU start like this? This is how Intel designed the 8088 processor, which IBM used in their original PC. Because the BIOS in a PC is "hard-wired" to the physical address range 0x000f0000-0x000fffff, this design ensures that the BIOS always gets control of the machine first after power-up or any system restart - which is crucial because on power-up there is no other software anywhere in the machine's RAM that the processor could execute. The QEMU emulator comes with its own BIOS, which it places at this location in the processor's simulated physical address space. On processor reset, the (simulated) processor enters real mode and sets CS to 0xf000 and the IP to 0xfff0, so that execution begins at that (CS:IP) segment address. How does the segmented address 0xf000:fff0 turn into a physical address?
为什么QEMU是这样启动的？这就是英特尔设计8088处理器的方式，它IBM用在他们的原始电脑上。因为电脑中的基本输入输出系统是“硬连接”到物理地址范围0x000f0000-0x000fffff的，这种设计确保基本输入输出系统在加电或任何系统重启后总是首先控制机器——这一点至关重要，因为在加电时，机器内存中没有其他软件是处理器可以执行的。QEMU模拟器配有自己的基本输入输出系统，它把基本输入输出系统放在处理器模拟的物理地址空间的这个位置。在处理器复位时，（模拟的）处理器进入真实模式，并将CS设置为0xf000，将IP设置为0xfff0，以便在（CS： IP）段地址处开始执行。分段地址0xf000： fff0如何变成物理地址？
To answer that we need to know a bit about real mode addressing. In real mode (the mode that PC starts off in), address translation works according to the formula: physical address = 16 * segment + offset. So, when the PC sets CS to 0xf000 and IP to 0xfff0, the physical address referenced is:
为了回答这个问题，我们需要了解一些关于实模式寻址的知识。在实模式（电脑启动的模式）中，地址转换根据公式工作：物理地址=16*段+偏移量。所以，当电脑将CS设置为0xf000，将IP设置为0xfff0时，引用的物理地址是：
   16 * 0xf000 + 0xfff0   # in hex multiplication by 16 is
16*0xf000+0xfff0#在十六进制乘以16是
   = 0xf0000 + 0xfff0     # easy--just append a 0.
=0xf0000+0xfff0#easy--只是追加一个0。
   = 0xffff0 
=0xffff0
0xffff0 is 16 bytes before the end of the BIOS (0x100000). Therefore we shouldn't be surprised that the first thing that the BIOS does is jmp backwards to an earlier location in the BIOS; after all how much could it accomplish in just 16 bytes?
0xffff0是BIOS（0x100000）结束前的16个字节。因此，我们不应该惊讶于BIOS做的第一件事是向后跳转到BIOS中的早期位置；毕竟，它能在仅仅16个字节内完成多少？

Exercise 2. Use GDB's si (Step Instruction) command to trace into the ROM BIOS for a few more instructions, and try to guess what it might be doing. You might want to look at Phil Storrs I/O Ports Description, as well as other materials on the 6.828 reference materials page. No need to figure out all the details - just the general idea of what the BIOS is doing first.
练习2。使用GDB的si（步骤指令）命令跟踪到ROM BIOS以获取更多指令，并尝试猜测它可能在做什么。您可能想看看菲尔·斯托尔斯输入/输出端口描述，以及6.828参考材料页上的其他材料。不需要弄清楚所有细节——只需了解BIOS首先在做什么。
When the BIOS runs, it sets up an interrupt descriptor table and initializes various devices such as the VGA display. This is where the "Starting SeaBIOS" message you see in the QEMU window comes from.
当BIOS运行时，它设置一个中断描述符表，并初始化各种设备，如VGA显示。这就是您在QEMU窗口中看到的“启动SeaBIOS”消息的来源。
After initializing the PCI bus and all the important devices the BIOS knows about, it searches for a bootable device such as a floppy, hard drive, or CD-ROM. Eventually, when it finds a bootable disk, the BIOS reads the boot loader from the disk and transfers control to it.
在初始化PCI总线和BIOS知道的所有重要设备后，它会搜索可引导设备，如软盘、硬盘或光盘。最终，当它找到可引导磁盘时，BIOS会从磁盘上读取引导加载程序，并将控制权转移给它。
Part 2: The Boot Loader
第2部分：引导加载程序
Floppy and hard disks for PCs are divided into 512 byte regions called sectors. A sector is the disk's minimum transfer granularity: each read or write operation must be one or more sectors in size and aligned on a sector boundary. If the disk is bootable, the first sector is called the boot sector, since this is where the boot loader code resides. When the BIOS finds a bootable floppy or hard disk, it loads the 512-byte boot sector into memory at physical addresses 0x7c00 through 0x7dff, and then uses a jmp instruction to set the CS:IP to 0000:7c00, passing control to the boot loader. Like the BIOS load address, these addresses are fairly arbitrary - but they are fixed and standardized for PCs.
电脑软盘和硬盘被分成512字节的区域，称为扇区。扇区是磁盘的最小传输粒度：每次读取或写入操作必须有一个或多个扇区大小，并在扇区边界上对齐。如果磁盘是可引导的，第一个扇区称为引导扇区，因为这是引导加载程序代码所在的地方。当BIOS找到一个可引导的软盘或硬盘时，它会将512字节的引导扇区加载到物理地址0x7c00到0x7dff的内存中，然后使用jmp指令将CS： IP设置为0000:7c00，将控制权传递给引导加载程序。像BIOS的加载地址一样，这些地址相当任意——但它们是固定的，并且对个人电脑是标准化的。
The ability to boot from a CD-ROM came much later during the evolution of the PC, and as a result the PC architects took the opportunity to rethink the boot process slightly. As a result, the way a modern BIOS boots from a CD-ROM is a bit more complicated (and more powerful). CD-ROMs use a sector size of 2048 bytes instead of 512, and the BIOS can load a much larger boot image from the disk into memory (not just one sector) before transferring control to it. For more information, see the "El Torito" Bootable CD-ROM Format Specification.
从CD-ROM启动的能力是在个人电脑发展的后期才出现的，因此个人电脑架构师借此机会稍微重新思考了启动过程。因此，现代BIOS从CD-ROM启动的方式有点复杂（也更强大）。光盘使用2048字节而不是512字节的扇区大小，BIOS可以在将控制权转移到磁盘之前将更大的启动映像从磁盘加载到内存（而不仅仅是一个扇区）。有关更多信息，请参见“埃尔托里托”可启动光盘格式规范。
For 6.828, however, we will use the conventional hard drive boot mechanism, which means that our boot loader must fit into a measly 512 bytes. The boot loader consists of one assembly language source file, boot/boot.S, and one C source file, boot/main.c Look through these source files carefully and make sure you understand what's going on. The boot loader must perform two main functions:
然而，对于6.828，我们将使用传统的硬盘引导机制，这意味着我们的引导加载器必须适合微不足道的512字节。引导加载器由一个汇编语言源文件——引导/引导。S和一个C源文件——引导/main. c组成。仔细浏览这些源文件，确保你明白发生了什么。引导加载器必须执行两个主要功能：
1. First, the boot loader switches the processor from real mode to 32-bit protected mode, because it is only in this mode that software can access all the memory above 1MB in the processor's physical address space. Protected mode is described briefly in sections 1.2.7 and 1.2.8 of PC Assembly Language, and in great detail in the Intel architecture manuals. At this point you only have to understand that translation of segmented addresses (segment:offset pairs) into physical addresses happens differently in protected mode, and that after the transition offsets are 32 bits instead of 16.
2. 首先，引导加载程序将处理器从真实模式切换到32位的保护模式，因为只有在这种模式下，软件才能访问处理器物理地址空间中1MB以上的所有内存。保护模式在个人电脑汇编语言的1.2.7和1.2.8节中简要描述，并在英特尔架构手册中非常详细。在这一点上，您只需要理解将分段地址（分段：偏移对）转换为物理地址在保护模式下会发生不同的情况，并且转换偏移后是32位而不是16位。
3. Second, the boot loader reads the kernel from the hard disk by directly accessing the IDE disk device registers via the x86's special I/O instructions. If you would like to understand better what the particular I/O instructions here mean, check out the "IDE hard drive controller" section on the 6.828 reference page. You will not need to learn much about programming specific devices in this class: writing device drivers is in practice a very important part of OS development, but from a conceptual or architectural viewpoint it is also one of the least interesting.
4. 其次，引导加载程序通过x86的特殊输入/输出指令直接访问IDE磁盘设备寄存器，从硬盘上读取内核。如果您想更好地理解这里的特定输入/输出指令的含义，请查看6.828参考页面上的“IDE硬盘驱动器控制器”部分。您不需要学习太多关于在这个类中编程特定设备的知识：编写设备驱动程序实际上是操作系统开发中非常重要的一部分，但从概念或架构的角度来看，它也是最不有趣的部分之一。
After you understand the boot loader source code, look at the file obj/boot/boot.asm. This file is a disassembly of the boot loader that our GNUmakefile creates after compiling the boot loader. This disassembly file makes it easy to see exactly where in physical memory all of the boot loader's code resides, and makes it easier to track what's happening while stepping through the boot loader in GDB. Likewise, obj/kern/kernel.asm contains a disassembly of the JOS kernel, which can often be useful for debugging.
在您理解了引导加载器源代码后，请查看文件obj/boot/boot.asm.该文件是对我们的GNUmakefile在编译引导加载器后创建的引导加载器的反汇编。这个反汇编文件可以很容易地看到所有引导加载器代码在物理内存中的确切位置，并且可以更容易地跟踪GDB中引导加载器的运行情况。同样，obj/kern/kernel.asm包含对JOS内核的反汇编，这通常对调试很有用。
You can set address breakpoints in GDB with the b command. For example, b *0x7c00 sets a breakpoint at address 0x7C00. Once at a breakpoint, you can continue execution using the c and si commands: c causes QEMU to continue execution until the next breakpoint (or until you press Ctrl-C in GDB), and si N steps through the instructions N at a time.
您可以使用b命令在GDB中设置地址断点。例如，b*0x7c00在地址0x7C00处设置断点。一旦到达断点，您可以使用c和si命令继续执行：c导致QEMU继续执行，直到下一个断点（或者直到在GDB中按Ctrl-C），并且siN每次执行指令N步。
To examine instructions in memory (besides the immediate next one to be executed, which GDB prints automatically), you use the x/i command. This command has the syntax x/Ni ADDR, where N is the number of consecutive instructions to disassemble and ADDR is the memory address at which to start disassembling.
要检查内存中的指令（除了GDB自动打印的下一个要执行的指令之外），您可以使用x/i命令。该命令具有语法x/NiADDR，其中N是要拆解的连续指令的数量，ADDR是开始拆解的内存地址。

Exercise 3. Take a look at the lab tools guide, especially the section on GDB commands. Even if you're familiar with GDB, this includes some esoteric GDB commands that are useful for OS work.
练习3。看看实验室工具指南，尤其是关于GDB命令的部分。即使你熟悉GDB，这也包括一些对操作系统工作有用的深奥的GDB命令。
Set a breakpoint at address 0x7c00, which is where the boot sector will be loaded. Continue execution until that breakpoint. Trace through the code in boot/boot.S, using the source code and the disassembly file obj/boot/boot.asm to keep track of where you are. Also use the x/i command in GDB to disassemble sequences of instructions in the boot loader, and compare the original boot loader source code with both the disassembly in obj/boot/boot.asm and GDB.
在地址0x7c00处设置一个断点，这是将加载引导扇区的地方。继续执行直到该断点。使用源代码和反汇编文件obj/boot/boot.asm跟踪引导/引导中的代码，以跟踪您的位置。还可以使用GDB中的x/i命令来反汇编引导加载程序中的指令序列，并将原始引导加载程序源代码与obj/boot/boot.asm和GDB中的反汇编进行比较。
Trace into bootmain() in boot/main.c, and then into readsect(). Identify the exact assembly instructions that correspond to each of the statements in readsect(). Trace through the rest of readsect() and back out into bootmain(), and identify the begin and end of the for loop that reads the remaining sectors of the kernel from the disk. Find out what code will run when the loop is finished, set a breakpoint there, and continue to that breakpoint. Then step through the remainder of the boot loader.
跟踪引导/main. c中的bootmain（），然后跟踪readsect（）。确定与readsect（）中的每个语句相对应的确切的程序集指令。跟踪readsect（）的其余部分，然后返回到bootmain（），并确定从磁盘读取内核剩余扇区的for循环的开始和结束。找出循环完成后会运行什么代码，在那里设置一个断点，并继续执行该断点。然后逐步完成引导加载程序的其余部分。
Be able to answer the following questions:
能够回答以下问题：
- At what point does the processor start executing 32-bit code? What exactly causes the switch from 16- to 32-bit mode?
- 处理器什么时候开始执行32位代码？到底是什么导致从16位模式切换到32位模式？
- What is the last instruction of the boot loader executed, and what is the first instruction of the kernel it just loaded?
- 引导加载器执行的最后一个指令是什么，它刚刚加载的内核的第一个指令是什么？
- Where is the first instruction of the kernel?
- 哪里是内核的第一条指令？
- How does the boot loader decide how many sectors it must read in order to fetch the entire kernel from disk? Where does it find this information?
- 引导加载程序如何决定它必须读取多少扇区才能从磁盘中获取整个内核？它在哪里找到这些信息？
Loading the Kernel
加载内核
We will now look in further detail at the C language portion of the boot loader, in boot/main.c. But before doing so, this is a good time to stop and review some of the basics of C programming.
现在，我们将更详细地了解引导加载程序的C语言部分，在引导/main. c中。但是在这样做之前，现在是停下来回顾一些C编程基础的好时机。

Exercise 4. Read about programming with pointers in C. The best reference for the C language is The C Programming Language by Brian Kernighan and Dennis Ritchie (known as 'K&R'). We recommend that students purchase this book (here is an Amazon Link) or find one of MIT's 7 copies.
练习4。阅读C语言中的指针编程。C语言的最佳参考是布莱恩·克尼汉和丹尼斯·里奇的《C编程语言》（又名“K&R”）。我们建议学生购买这本书（这里是亚马逊链接）或找到麻省理工学院的7本之一。
Read 5.1 (Pointers and Addresses) through 5.5 (Character Pointers and Functions) in K&R. Then download the code for pointers.c, run it, and make sure you understand where all of the printed values come from. In particular, make sure you understand where the pointer addresses in printed lines 1 and 6 come from, how all the values in printed lines 2 through 4 get there, and why the values printed in line 5 are seemingly corrupted.
阅读K&R中的5.1（指针和地址）到5.5（字符指针和函数）。然后下载指针. c的代码，运行它，并确保您理解所有打印值的来源。特别是，确保您理解打印行1和6中的指针地址来自哪里，打印行2到4中的所有值是如何到达那里的，以及为什么第5行中打印的值似乎损坏了。
There are other references on pointers in C (e.g., A tutorial by Ted Jensen that cites K&R heavily), though not as strongly recommended.
C中还有其他关于指针的参考文献（例如，Ted Jensen的一个教程大量引用了K&R），尽管没有强烈推荐。
Warning: Unless you are already thoroughly versed in C, do not skip or even skim this reading exercise. If you do not really understand pointers in C, you will suffer untold pain and misery in subsequent labs, and then eventually come to understand them the hard way. Trust us; you don't want to find out what "the hard way" is.
警告：除非你已经完全精通C语言，否则不要跳过甚至浏览这个阅读练习。如果你没有真正理解C语言中的指针，你将在随后的实验室中遭受难以形容的痛苦和折磨，然后最终以艰难的方式理解它们。相信我们；你不会想知道什么是“艰难的方式”。
To make sense out of boot/main.c you'll need to know what an ELF binary is. When you compile and link a C program such as the JOS kernel, the compiler transforms each C source ('.c') file into an object ('.o') file containing assembly language instructions encoded in the binary format expected by the hardware. The linker then combines all of the compiled object files into a single binary image such as obj/kern/kernel, which in this case is a binary in the ELF format, which stands for "Executable and Linkable Format".
要理解引导/main. c，您需要知道什么是ELF二进制文件。当您编译和链接一个C程序（如JOS内核）时，编译器将每个C源文件转换成一个对象文件。o）文件包含以硬件预期的二进制格式编码的汇编语言指令。然后，链接器将所有编译的对象文件组合成一个单一的二进制图像，如obj/kern/内核，在这种情况下，它是ELF格式的二进制文件，代表“可执行和可链接格式”。
Full information about this format is available in the ELF specification on our reference page, but you will not need to delve very deeply into the details of this format in this class. Although as a whole the format is quite powerful and complex, most of the complex parts are for supporting dynamic loading of shared libraries, which we will not do in this class. The Wikipedia page has a short description.
关于这种格式的全部信息可以在我们的参考页面上的ELF规范中找到，但是您不需要在这个类中深入研究这种格式的细节。尽管作为一个整体，这种格式是相当强大和复杂的，但是大多数复杂的部分是为了支持共享库的动态加载，我们在这个类中不会这样做。维基百科页面有一个简短的描述。
For purposes of 6.828, you can consider an ELF executable to be a header with loading information, followed by several program sections, each of which is a contiguous chunk of code or data intended to be loaded into memory at a specified address. The boot loader does not modify the code or data; it loads it into memory and starts executing it.
为了6.828的目的，您可以将ELF可执行文件视为带有加载信息的头文件，后面跟着几个程序部分，每个部分都是连续的代码或数据块，旨在以指定的地址加载到内存中。引导加载程序不修改代码或数据；它将其加载到内存中并开始执行。
An ELF binary starts with a fixed-length ELF header, followed by a variable-length program header listing each of the program sections to be loaded. The C definitions for these ELF headers are in inc/elf.h. The program sections we're interested in are:
ELF二进制文件以一个固定长度的ELF头开始，然后是一个可变长度的程序头，列出了要加载的每个程序部分。这些ELF头的C定义在inc/elf. h中。我们感兴趣的程序部分是：
- .text: The program's executable instructions.
- . text：程序的可执行指令。
- .rodata: Read-only data, such as ASCII string constants produced by the C compiler. (We will not bother setting up the hardware to prohibit writing, however.)
- . rodata：只读数据，例如C编译器生成的ASCII字符串常量。（但是，我们不会费心设置硬件来禁止写入。）
- .data: The data section holds the program's initialized data, such as global variables declared with initializers like int x = 5;.
- . data：数据部分保存程序的初始化数据，例如使用初始化器（如int x=5；）声明的全局变量。
When the linker computes the memory layout of a program, it reserves space for uninitialized global variables, such as int x;, in a section called .bss that immediately follows .data in memory. C requires that "uninitialized" global variables start with a value of zero. Thus there is no need to store contents for .bss in the ELF binary; instead, the linker records just the address and size of the .bss section. The loader or the program itself must arrange to zero the .bss section.
当链接器计算程序的内存布局时，它会在内存中紧跟. data之后的名为. bss的部分中为未初始化的全局变量（如int x；）保留空间。C要求“未初始化”的全局变量以零开始。因此，没有必要将. bss的内容存储在ELF二进制文件中；相反，链接器只记录. bss部分的地址和大小。加载程序或程序本身必须安排将. bss部分归零。
Examine the full list of the names, sizes, and link addresses of all the sections in the kernel executable by typing:
通过键入以下命令，检查内核可执行文件中所有部分的名称、大小和链接地址的完整列表：
athena% objdump -h obj/kern/kernel
雅典娜%对象转储-h obj/kern/内核
(If you compiled your own toolchain, you may need to use i386-jos-elf-objdump)
（如果你编译了自己的工具链，你可能需要使用i386-jos-elf-Objuck）
You will see many more sections than the ones we listed above, but the others are not important for our purposes. Most of the others are to hold debugging information, which is typically included in the program's executable file but not loaded into memory by the program loader.
您将看到比我们上面列出的更多的部分，但是其他部分对我们的目的并不重要。大多数其他部分是保存调试信息，这些信息通常包含在程序的可执行文件中，但不会被程序加载程序加载到内存中。
Take particular note of the "VMA" (or link address) and the "LMA" (or load address) of the .text section. The load address of a section is the memory address at which that section should be loaded into memory.
请特别注意. text部分的VMA（或链接地址）和LMA（或加载地址）。节的加载地址是该节应加载到内存中的内存地址。
The link address of a section is the memory address from which the section expects to execute. The linker encodes the link address in the binary in various ways, such as when the code needs the address of a global variable, with the result that a binary usually won't work if it is executing from an address that it is not linked for. (It is possible to generate position-independent code that does not contain any such absolute addresses. This is used extensively by modern shared libraries, but it has performance and complexity costs, so we won't be using it in 6.828.)
节的链接地址是节期望从中执行的内存地址。链接器以各种方式对二进制中的链接地址进行编码，例如当代码需要全局变量的地址时，结果是如果二进制从未链接的地址执行，则二进制通常无法工作。（可以生成不包含任何此类绝对地址的位置无关代码。现代共享库广泛使用这种方法，但它存在性能和复杂性成本，因此我们不会在6.828中使用它。）
Typically, the link and load addresses are the same. For example, look at the .text section of the boot loader:
通常，链接和加载地址是相同的。例如，查看引导加载程序的. text部分：
athena% objdump -h obj/boot/boot.out
雅典娜%对象转储-h obj/引导/boot.out
The boot loader uses the ELF program headers to decide how to load the sections. The program headers specify which parts of the ELF object to load into memory and the destination address each should occupy. You can inspect the program headers by typing:
引导加载程序使用ELF程序头来决定如何加载这些部分。程序头指定要加载到内存中的ELF对象的哪些部分以及每个部分应该占用的目标地址。您可以通过键入以下命令来检查程序头：
athena% objdump -x obj/kern/kernel
雅典娜%对象转储-x obj/kern/内核
The program headers are then listed under "Program Headers" in the output of objdump. The areas of the ELF object that need to be loaded into memory are those that are marked as "LOAD". Other information for each program header is given, such as the virtual address ("vaddr"), the physical address ("paddr"), and the size of the loaded area ("memsz" and "filesz").
然后，程序头被列在对象转储输出中的“程序头”下。需要加载到内存中的ELF对象的区域是那些被标记为“加载”的区域。每个程序头的其他信息被给出，例如虚拟地址（“vaddr”）、物理地址（“paddr”）和加载区域的大小（“memsz”和“filesz”）。
Back in boot/main.c, the ph->p_pa field of each program header contains the segment's destination physical address (in this case, it really is a physical address, though the ELF specification is vague on the actual meaning of this field).
回到引导/main. c，每个程序头的ph->p_pa字段包含段的目标物理地址（在这种情况下，它实际上是一个物理地址，尽管ELF规范对该字段的实际含义模糊不清）。
The BIOS loads the boot sector into memory starting at address 0x7c00, so this is the boot sector's load address. This is also where the boot sector executes from, so this is also its link address. We set the link address by passing -Ttext 0x7C00 to the linker in boot/Makefrag, so the linker will produce the correct memory addresses in the generated code.
BIOS从地址0x7c00开始将引导扇区加载到内存中，因此这是引导扇区的加载地址。这也是引导扇区执行的地方，因此这也是它的链接地址。我们通过将-Ttext 0x7C00传递给引导/Makefrag中的链接器来设置链接地址，因此链接器将在生成的代码中产生正确的内存地址。

Exercise 5. Trace through the first few instructions of the boot loader again and identify the first instruction that would "break" or otherwise do the wrong thing if you were to get the boot loader's link address wrong. Then change the link address in boot/Makefrag to something wrong, run make clean, recompile the lab with make, and trace into the boot loader again to see what happens. Don't forget to change the link address back and make clean again afterward!
练习5。再次跟踪引导加载程序的前几条指令，如果你弄错了引导加载程序的链接地址，找出第一条会“中断”或做错误事情的指令。然后将引导/Makefrag中的链接地址更改为错误的，运行makine，用make重新编译实验室，然后再次跟踪引导加载程序，看看会发生什么。别忘了把链接地址改回来，然后再弄干净！
Look back at the load and link addresses for the kernel. Unlike the boot loader, these two addresses aren't the same: the kernel is telling the boot loader to load it into memory at a low address (1 megabyte), but it expects to execute from a high address. We'll dig in to how we make this work in the next section.
回顾一下内核的加载和链接地址。与引导加载器不同，这两个地址是不一样的：内核告诉引导加载器以低地址（1MB）将其加载到内存中，但它希望从高地址执行。我们将在下一节深入研究如何实现这一工作。
Besides the section information, there is one more field in the ELF header that is important to us, named e_entry. This field holds the link address of the entry point in the program: the memory address in the program's text section at which the program should begin executing. You can see the entry point:
除了部分信息之外，ELF头中还有一个对我们很重要的字段，叫做e_entry。这个字段保存程序中切入点的链接地址：程序文本部分中的内存地址，程序应该从那里开始执行。你可以看到切入点：
athena% objdump -f obj/kern/kernel
雅典娜%对象转储-f obj/kern/内核
You should now be able to understand the minimal ELF loader in boot/main.c. It reads each section of the kernel from disk into memory at the section's load address and then jumps to the kernel's entry point.
您现在应该能够理解引导/main. c中最小的ELF加载器。它将内核的每个部分从磁盘读取到该部分的加载地址处的内存中，然后跳转到内核的切入点。

Exercise 6. We can examine memory using GDB's x command. The GDB manual has full details, but for now, it is enough to know that the command x/Nx ADDR prints N words of memory at ADDR. (Note that both 'x's in the command are lowercase.) Warning: The size of a word is not a universal standard. In GNU assembly, a word is two bytes (the 'w' in xorw, which stands for word, means 2 bytes).
练习6。我们可以使用GDB的x命令检查内存。GDB手册有完整的细节，但是现在，只要知道命令x/NxADDR在ADDR打印N个单词的内存就足够了。（请注意，命令中的两个“x”都是小写的。）警告：单词的大小不是通用标准。在GNU程序集中，一个单词是两个字节（xorw中的“w”代表单词，意思是2个字节）。
Reset the machine (exit QEMU/GDB and start them again). Examine the 8 words of memory at 0x00100000 at the point the BIOS enters the boot loader, and then again at the point the boot loader enters the kernel. Why are they different? What is there at the second breakpoint? (You do not really need to use QEMU to answer this question. Just think.)
重置机器（退出QEMU/GDB并再次启动它们）。在BIOS进入引导加载程序的点检查0x00100000处的8个单词内存，然后在引导加载程序进入内核的点再次检查。为什么它们不同？在第二个断点有什么？（你真的不需要使用QEMU来回答这个问题。想想吧。）
Part 3: The Kernel
第3部分：内核
We will now start to examine the minimal JOS kernel in a bit more detail. (And you will finally get to write some code!). Like the boot loader, the kernel begins with some assembly language code that sets things up so that C language code can execute properly.
我们现在将开始更详细地研究最小的JOS内核。（你最终会写一些代码！）。像引导加载器一样，内核从一些汇编语言代码开始，这些代码设置了一些东西，以便C语言代码能够正确执行。
Using virtual memory to work around position dependence
使用虚拟内存解决位置依赖问题
When you inspected the boot loader's link and load addresses above, they matched perfectly, but there was a (rather large) disparity between the kernel's link address (as printed by objdump) and its load address. Go back and check both and make sure you can see what we're talking about. (Linking the kernel is more complicated than the boot loader, so the link and load addresses are at the top of kern/kernel.ld.)
当您检查上面的引导加载器的链接和加载地址时，它们完全匹配，但是内核的链接地址（如Objuck打印的）和加载地址之间存在（相当大的）差异。返回并检查两者，确保您能看到我们正在谈论的内容。（链接内核比引导加载器更复杂，所以链接和加载地址在kern/kernel.ld.的顶部）
Operating system kernels often like to be linked and run at very high virtual address, such as 0xf0100000, in order to leave the lower part of the processor's virtual address space for user programs to use. The reason for this arrangement will become clearer in the next lab.
操作系统内核往往喜欢被链接，在非常高的虚拟地址上运行，比如0xf0100000，以便将处理器的较低部分虚拟地址空间留给用户程序使用。这种安排的原因将在下一个实验室变得更加清楚。
Many machines don't have any physical memory at address 0xf0100000, so we can't count on being able to store the kernel there. Instead, we will use the processor's memory management hardware to map virtual address 0xf0100000 (the link address at which the kernel code expects to run) to physical address 0x00100000 (where the boot loader loaded the kernel into physical memory). This way, although the kernel's virtual address is high enough to leave plenty of address space for user processes, it will be loaded in physical memory at the 1MB point in the PC's RAM, just above the BIOS ROM. This approach requires that the PC have at least a few megabytes of physical memory (so that physical address 0x00100000 works), but this is likely to be true of any PC built after about 1990.
许多机器在地址0xf0100000处没有任何物理内存，所以我们不能指望能够将内核存储在那里。相反，我们将使用处理器的内存管理硬件将虚拟地址0xf0100000（内核代码期望运行的链接地址）映射到物理地址0x00100000（引导加载程序将内核加载到物理内存中的位置）。这样，尽管内核的虚拟地址足够高，可以为用户进程留下足够的地址空间，但它将加载到个人电脑内存中1MB点的物理内存中，就在BIOS ROM上方。这种方法要求电脑至少有几兆字节的物理内存（这样物理地址0x00100000就可以工作），但这可能适用于大约1990年后建造的任何电脑。
In fact, in the next lab, we will map the entire bottom 256MB of the PC's physical address space, from physical addresses 0x00000000 through 0x0fffffff, to virtual addresses 0xf0000000 through 0xffffffff respectively. You should now see why JOS can only use the first 256MB of physical memory.
事实上，在接下来的实验室中，我们将映射PC物理地址空间的整个底部256MB，从物理地址0x00000000到0x0fffffff，分别映射到虚拟地址0xf0000000到0xffffff。你现在应该明白为什么JOS只能使用第一个256MB的物理内存了。
For now, we'll just map the first 4MB of physical memory, which will be enough to get us up and running. We do this using the hand-written, statically-initialized page directory and page table in kern/entrypgdir.c. For now, you don't have to understand the details of how this works, just the effect that it accomplishes. Up until kern/entry.S sets the CR0_PG flag, memory references are treated as physical addresses (strictly speaking, they're linear addresses, but boot/boot.S set up an identity mapping from linear addresses to physical addresses and we're never going to change that). Once CR0_PG is set, memory references are virtual addresses that get translated by the virtual memory hardware to physical addresses. entry_pgdir translates virtual addresses in the range 0xf0000000 through 0xf0400000 to physical addresses 0x00000000 through 0x00400000, as well as virtual addresses 0x00000000 through 0x00400000 to physical addresses 0x00000000 through 0x00400000. Any virtual address that is not in one of these two ranges will cause a hardware exception which, since we haven't set up interrupt handling yet, will cause QEMU to dump the machine state and exit (or endlessly reboot if you aren't using the 6.828-patched version of QEMU).
现在，我们只需要映射第一个4MB的物理内存，这就足以让我们启动并运行。我们使用kern/entrypgdir. c中手写的静态初始化页面目录和页表来实现这一点。现在，你不必理解它是如何工作的细节，只需要理解它所实现的效果。在kern/entry. s设置CR0_PG标志之前，内存引用被视为物理地址（严格来说，它们是线性地址，但是引导/引导。我们设置了线性地址到物理地址的身份映射，我们永远不会改变这一点）。设置CR0_PG后，内存引用是虚拟内存硬件转换为物理地址的虚拟地址。entry_pgdir将范围为0xf0000000至0xf0400000的虚拟地址转换为物理地址0x00000000至0x00400000，以及将虚拟地址0x00000000至0x00400000转换为物理地址0x00000000至0x00400000。任何不在这两个范围内的虚拟地址都会导致硬件异常，因为我们还没有设置中断处理，这将导致QEMU转储机器状态并退出（或者如果您不使用6.828修补版本的QEMU，则会无休止地重新启动）。

Exercise 7. Use QEMU and GDB to trace into the JOS kernel and stop at the movl %eax, %cr0. Examine memory at 0x00100000 and at 0xf0100000. Now, single step over that instruction using the stepi GDB command. Again, examine memory at 0x00100000 and at 0xf0100000. Make sure you understand what just happened.
练习7。使用QEMU和GDB跟踪到JOS内核，并在movl%eax，%cr0处停止。检查0x00100000和0xf0100000处的内存。现在，使用stepiGDB命令执行该指令。再次，检查0x00100000和0xf0100000处的内存。确保您理解刚刚发生的事情。
What is the first instruction after the new mapping is established that would fail to work properly if the mapping weren't in place? Comment out the movl %eax, %cr0 in kern/entry.S, trace into it, and see if you were right.
建立新映射后的第一个指令是什么，如果映射不到位，它将无法正常工作？注释kern/entry. s中的movl%eax，%cr0，跟踪它，看看是否正确。
Formatted Printing to the Console
格式化打印到控制台
Most people take functions like printf() for granted, sometimes even thinking of them as "primitives" of the C language. But in an OS kernel, we have to implement all I/O ourselves.
大多数人认为像printf（）这样的函数是理所当然的，有时甚至认为它们是C语言的“原语”。但是在操作系统内核中，我们必须自己实现所有的输入/输出。
Read through kern/printf.c, lib/printfmt.c, and kern/console.c, and make sure you understand their relationship. It will become clear in later labs why printfmt.c is located in the separate lib directory.
通读kern/printf. c、lib/printfmt. c和kern/控制台. c，并确保你理解它们的关系。在以后的实验室中，你会清楚为什么printfmt. c位于单独的lib目录中。

Exercise 8. We have omitted a small fragment of code - the code necessary to print octal numbers using patterns of the form "%o". Find and fill in this code fragment.
练习8。我们省略了一小部分代码——使用表格“%o”的模式打印八进制数字所必需的代码。查找并填写这个代码片段。
Be able to answer the following questions:
能够回答以下问题：
3. Explain the interface between printf.c and console.c. Specifically, what function does console.c export? How is this function used by printf.c?
3. 解释printf. c和控制台. c之间的接口。具体来说，控制台. c导出什么功能？printf. c如何使用这个功能？
4. Explain the following from console.c:
4. 从控制台c解释以下内容：
1      if (crt_pos >= CRT_SIZE) {
1 if（crt_pos>=CRT_SIZE）{
2              int i;
2              int i;
3              memmove(crt_buf, crt_buf + CRT_COLS, (CRT_SIZE - CRT_COLS) * sizeof(uint16_t));
3 memmoft（crt_buf，crt_buf+CRT_COLS，（CRT_SIZE-CRT_COLS）*sizeof（uint16_t））；
4              for (i = CRT_SIZE - CRT_COLS; i < CRT_SIZE; i++)
4 for（i=CRT_SIZE-CRT_COLS； i<CRT_SIZE； i++）
5                      crt_buf[i] = 0x0700 | ' ';
5crt_buf[i]=0x0700 | ' ';
6              crt_pos -= CRT_COLS;
6 crt_pos-=CRT_COLS；
7      }
7      }
5. For the following questions you might wish to consult the notes for Lecture 2. These notes cover GCC's calling convention on the x86.Trace the execution of the following code step-by-step:
5. 对于以下问题，您可以参考第2讲的注释。这些注释涵盖了GCC对x86的调用约定。逐步跟踪以下代码的执行：
int x = 1, y = 3, z = 4;
int x=1， y=3， z=4；
cprintf("x %d, y %x, z %d\n", x, y, z);
cprintf（"x%d， y%x， z%d\n"， x， y， z）；
  - In the call to cprintf(), to what does fmt point? To what does ap point?
  - 在对cprintf（）的调用中，fmt指向什么？ap指向什么？
  - List (in order of execution) each call to cons_putc, va_arg, and vcprintf. For cons_putc, list its argument as well. For va_arg, list what ap points to before and after the call. For vcprintf list the values of its two arguments.
  - 列出对cons_putc、va_arg和vcprintf的每个调用（按执行顺序）。对于cons_putc，列出它的参数。对于va_arg，列出调用前后ap指向的内容。对于vcprintf，列出其两个参数的值。
6. Run the following code.    unsigned int i = 0x00646c72;
6. 运行下面的代码。无符号int i=0x00646c72；
    cprintf("H%x Wo%s", 57616, &i);
cprintf（"H%x Wo%s"，57616，&i）；
What is the output? Explain how this output is arrived at in the step-by-step manner of the previous exercise. Here's an ASCII table that maps bytes to characters.
输出是什么？解释这个输出是如何按照上一个练习的逐步方式得出的。这里有一个ASCII表，它将字节映射到字符。
The output depends on that fact that the x86 is little-endian. If the x86 were instead big-endian what would you set i to in order to yield the same output? Would you need to change 57616 to a different value?
输出取决于x86是小端的事实。如果x86是大端的，你会把i设置成什么来产生相同的输出？你需要把57616改成不同的值吗？
Here's a description of little- and big-endian and a more whimsical description.
这里有一个小端和大端的描述和一个更古怪的描述。
7. In the following code, what is going to be printed after 'y='? (note: the answer is not a specific value.) Why does this happen?
7. 在下面的代码中，在'y='之后要打印什么？（注意：答案不是特定的值。）为什么会发生这种情况？
    cprintf("x=%d y=%d", 3);
cprintf（"x=%d y=%d"，3）；
8. Let's say that GCC changed its calling convention so that it pushed arguments on the stack in declaration order, so that the last argument is pushed last. How would you have to change cprintf or its interface so that it would still be possible to pass it a variable number of arguments?
8. 假设GCC改变了它的调用约定，所以它按声明顺序推送堆栈上的参数，所以最后一个参数是最后一个推送的。你必须如何改变cprintf或它的接口，这样它仍然可以传递可变数量的参数？
Challenge Enhance the console to allow text to be printed in different colors. The traditional way to do this is to make it interpret ANSI escape sequences embedded in the text strings printed to the console, but you may use any mechanism you like. There is plenty of information on the 6.828 reference page and elsewhere on the web on programming the VGA display hardware. If you're feeling really adventurous, you could try switching the VGA hardware into a graphics mode and making the console draw text onto the graphical frame buffer.
挑战增强控制台，允许文本以不同的颜色打印。传统的方法是让它解释打印到控制台的文本字符串中嵌入的ANSI转义序列，但是您可以使用任何您喜欢的机制。6.828参考页面上和网络上的其他地方有很多关于编程VGA显示硬件的信息。如果你真的觉得很冒险，你可以尝试将VGA硬件切换到图形模式，并使控制台将文本绘制到图形帧缓冲区上。
The Stack
堆栈
In the final exercise of this lab, we will explore in more detail the way the C language uses the stack on the x86, and in the process write a useful new kernel monitor function that prints a backtrace of the stack: a list of the saved Instruction Pointer (IP) values from the nested call instructions that led to the current point of execution.
在本实验的最后练习中，我们将更详细地探索C语言在x86上使用堆栈的方式，并在此过程中编写一个有用的新内核监控函数，打印堆栈的回溯：从导致当前执行点的嵌套调用指令中保存的指令指针（IP）值的列表。

Exercise 9. Determine where the kernel initializes its stack, and exactly where in memory its stack is located. How does the kernel reserve space for its stack? And at which "end" of this reserved area is the stack pointer initialized to point to?
练习9。确定内核在哪里初始化它的堆栈，以及它的堆栈在内存中的确切位置。内核如何为它的堆栈保留空间？堆栈指针初始化指向这个保留区域的“末端”？
The x86 stack pointer (esp register) points to the lowest location on the stack that is currently in use. Everything below that location in the region reserved for the stack is free. Pushing a value onto the stack involves decreasing the stack pointer and then writing the value to the place the stack pointer points to. Popping a value from the stack involves reading the value the stack pointer points to and then increasing the stack pointer. In 32-bit mode, the stack can only hold 32-bit values, and esp is always divisible by four. Various x86 instructions, such as call, are "hard-wired" to use the stack pointer register.
x86堆栈指针（esp寄存器）指向当前正在使用的堆栈上的最低位置。在为堆栈保留的区域中，该位置以下的所有内容都是免费的。将值推到堆栈上涉及减少堆栈指针，然后将值写入堆栈指针指向的位置。从堆栈中弹出一个值涉及读取堆栈指针指向的值，然后增加堆栈指针。在32位模式下，堆栈只能容纳32位值，esp总是可以被4整除。各种x86指令，如call，都是“硬连线”来使用堆栈指针寄存器的。
The ebp (base pointer) register, in contrast, is associated with the stack primarily by software convention. On entry to a C function, the function's prologue code normally saves the previous function's base pointer by pushing it onto the stack, and then copies the current esp value into ebp for the duration of the function. If all the functions in a program obey this convention, then at any given point during the program's execution, it is possible to trace back through the stack by following the chain of saved ebp pointers and determining exactly what nested sequence of function calls caused this particular point in the program to be reached. This capability can be particularly useful, for example, when a particular function causes an assert failure or panic because bad arguments were passed to it, but you aren't sure who passed the bad arguments. A stack backtrace lets you find the offending function.
相反，ebp（基指针）寄存器主要通过软件惯例与堆栈相关联。在进入一个C函数时，函数的序言代码通常通过将前一个函数的基指针推到堆栈上来保存它，然后在函数持续期间将当前的esp值复制到ebp中。如果程序中的所有函数都遵守这个约定，那么在程序执行过程中的任何给定点，都有可能通过跟踪保存的ebp指针链并确定是什么嵌套的函数调用序列导致程序中的这个特定点被到达来回溯堆栈。例如，当一个特定的函数因为传递了错误的参数而导致断言失败或恐慌时，但是您不确定是谁传递了错误的参数，这个功能特别有用。堆栈回溯可以让您找到违规的函数。

Exercise 10. To become familiar with the C calling conventions on the x86, find the address of the test_backtrace function in obj/kern/kernel.asm, set a breakpoint there, and examine what happens each time it gets called after the kernel starts. How many 32-bit words does each recursive nesting level of test_backtrace push on the stack, and what are those words?
练习10。要熟悉x86上的C调用约定，在obj/kern/kernel.asm中找到test_backtrace函数的地址，在那里设置一个断点，并检查每次内核启动后调用它时会发生什么。每个递归嵌套级别的test_backtrace在堆栈上推送多少32位单词，这些单词是什么？
Note that, for this exercise to work properly, you should be using the patched version of QEMU available on the tools page or on Athena. Otherwise, you'll have to manually translate all breakpoint and memory addresses to linear addresses.
请注意，为了使此练习正常工作，您应该使用工具页面或Athena上可用的QEMU修补版本。否则，您将不得不手动将所有断点和内存地址转换为线性地址。
The above exercise should give you the information you need to implement a stack backtrace function, which you should call mon_backtrace(). A prototype for this function is already waiting for you in kern/monitor.c. You can do it entirely in C, but you may find the read_ebp() function in inc/x86.h useful. You'll also have to hook this new function into the kernel monitor's command list so that it can be invoked interactively by the user.
上面的练习应该会给你实现堆栈回溯函数所需的信息，你应该调用mon_backtrace（）。这个函数的原型已经在kern/显示器中等着你了。你可以完全用C来做，但是你可能会发现inc/x86. h中的read_ebp（）函数很有用。你还必须把这个新函数挂接到内核显示器的命令列表中，这样用户就可以交互地调用它。
The backtrace function should display a listing of function call frames in the following format:
回溯函数应该以以下格式显示函数调用框架的列表：
Stack backtrace:
堆栈回溯：
  ebp f0109e58  eip f0100a62  args 00000001 f0109e80 f0109e98 f0100ed2 00000031
ebp f0109e58 eip f0100a62 args 00000001 f0109e80 f0109e98 f0100ed2 00000031
  ebp f0109ed8  eip f01000d6  args 00000000 00000000 f0100058 f0109f28 00000061
ebp f0109ed8 eip f01000d6 args00000000 00000000f0100058 f0109f28 00000061
  ...
  ...
Each line contains an ebp, eip, and args. The ebp value indicates the base pointer into the stack used by that function: i.e., the position of the stack pointer just after the function was entered and the function prologue code set up the base pointer. The listed eip value is the function's return instruction pointer: the instruction address to which control will return when the function returns. The return instruction pointer typically points to the instruction after the call instruction (why?). Finally, the five hex values listed after args are the first five arguments to the function in question, which would have been pushed on the stack just before the function was called. If the function was called with fewer than five arguments, of course, then not all five of these values will be useful. (Why can't the backtrace code detect how many arguments there actually are? How could this limitation be fixed?)
每行包含一个ebp、eip和args。ebp值表示该函数使用的堆栈中的基指针：即，在函数输入和函数序言代码设置基指针后堆栈指针的位置。列出的eip值是函数的返回指令指针：函数返回时控件将返回的指令地址。返回指令指针通常指向调用指令后的指令（为什么？）。最后，args后面列出的五个十六进制值是所讨论函数的前五个参数，这些参数会在函数被调用之前被推送到堆栈上。当然，如果函数被调用时参数少于五个，那么并不是所有的五个值都有用。（为什么回溯代码不能检测实际有多少个参数？这个限制是如何修复的？）
The first line printed reflects the currently executing function, namely mon_backtrace itself, the second line reflects the function that called mon_backtrace, the third line reflects the function that called that one, and so on. You should print all the outstanding stack frames. By studying kern/entry.S you'll find that there is an easy way to tell when to stop.
打印的第一行反映了当前正在执行的函数，即mon_backtrace本身，第二行反映了调用mon_backtrace的函数，第三行反映了调用该函数的函数，依此类推。您应该打印所有未完成的堆栈框架。通过研究kern/entry。你会发现有一种简单的方法可以告诉何时停止。
Here are a few specific points you read about in K&R Chapter 5 that are worth remembering for the following exercise and for future labs.
以下是您在K&R第5章中读到的一些具体要点，值得在下面的练习和未来的实验室中记住。
- If int *p = (int*)100, then (int)p + 1 and (int)(p + 1) are different numbers: the first is 101 but the second is 104. When adding an integer to a pointer, as in the second case, the integer is implicitly multiplied by the size of the object the pointer points to.
- 如果int*p=（int*）100，那么（int）p+1和（int）（p+1）是不同的数字：第一个是101，但第二个是104。当向指针添加整数时，与第二种情况一样，整数隐式乘以指针指向的对象的大小。
- p[i] is defined to be the same as *(p+i), referring to the i'th object in the memory pointed to by p. The above rule for addition helps this definition work when the objects are larger than one byte.
- p[i]被定义为与*（p+i）相同，指的是p指向的内存中的第i个对象。当对象大于一个字节时，上述加法规则有助于此定义的工作。
- &p[i] is the same as (p+i), yielding the address of the i'th object in the memory pointed to by p.
- &p[i]与（p+i）相同，产生p指向的内存中第i个对象的地址。
Although most C programs never need to cast between pointers and integers, operating systems frequently do. Whenever you see an addition involving a memory address, ask yourself whether it is an integer addition or pointer addition and make sure the value being added is appropriately multiplied or not.
尽管大多数C程序从不需要在指针和整数之间转换，但操作系统经常需要转换。每当你看到一个涉及内存地址的加法时，问问自己它是整数加法还是指针加法，并确保所添加的值被适当地乘以或不乘以。

Exercise 11. Implement the backtrace function as specified above. Use the same format as in the example, since otherwise the grading script will be confused. When you think you have it working right, run make grade to see if its output conforms to what our grading script expects, and fix it if it doesn't. After you have handed in your Lab 1 code, you are welcome to change the output format of the backtrace function any way you like.
练习11。实现上面指定的回溯函数。使用与示例中相同的格式，否则评分脚本将被混淆。当您认为它工作正常时，运行make级，看看它的输出是否符合我们评分脚本的期望，如果不符合，则进行修复。在您交出您的Lab 1代码后，欢迎您以任何您喜欢的方式更改回溯函数的输出格式。
If you use read_ebp(), note that GCC may generate "optimized" code that calls read_ebp() before mon_backtrace()'s function prologue, which results in an incomplete stack trace (the stack frame of the most recent function call is missing). While we have tried to disable optimizations that cause this reordering, you may want to examine the assembly of mon_backtrace() and make sure the call to read_ebp() is happening after the function prologue.
如果使用read_ebp（），请注意，GCC可能会生成在mon_backtrace（） 的函数序言之前调用 read_ebp（）的“优化”代码，这将导致不完整的堆栈跟踪（最近函数调用的堆栈框架丢失）。虽然我们试图禁用导致这种重新排序的优化，但您可能需要检查mon_backtrace（）的程序集，并确保对read_ebp（）的调用发生在函数序言之后。
At this point, your backtrace function should give you the addresses of the function callers on the stack that lead to mon_backtrace() being executed. However, in practice you often want to know the function names corresponding to those addresses. For instance, you may want to know which functions could contain a bug that's causing your kernel to crash.
此时，回溯函数应该给出导致mon_backtrace（）执行的堆栈上函数调用者的地址。然而，在实践中，您通常想知道与这些地址对应的函数名。例如，您可能想知道哪些函数可能包含导致内核崩溃的错误。
To help you implement this functionality, we have provided the function debuginfo_eip(), which looks up eip in the symbol table and returns the debugging information for that address. This function is defined in kern/kdebug.c.
为了帮助您实现这个功能，我们提供了函数debuginfo_eip（），它在符号表中查找eip并返回该地址的调试信息。这个函数在kern/kdeg. c中定义。

Exercise 12. Modify your stack backtrace function to display, for each eip, the function name, source file name, and line number corresponding to that eip.
练习12。修改堆栈回溯函数，为每个eip显示对应于该eip的函数名称、源文件名称和行号。
In debuginfo_eip, where do __STAB_* come from? This question has a long answer; to help you to discover the answer, here are some things you might want to do:
在debuginfo_eip，__STAB_*来自哪里？这个问题有一个很长的答案；为了帮助你找到答案，这里有一些你可能想做的事情：
- look in the file kern/kernel.ld for __STAB_*
- 在文件kern/kernel.ld中查找__STAB_*
- run objdump -h obj/kern/kernel
- 运行对象转储-h obj/kern/内核
- run objdump -G obj/kern/kernel
- 运行对象转储-G obj/kern/内核
- run gcc -pipe -nostdinc -O2 -fno-builtin -I. -MD -Wall -Wno-format -DJOS_KERNEL -gstabs -c -S kern/init.c, and look at init.s.
- 运行gcc-tube-nostdinc-O2-fno-Builtin-I.-MD-Wall-Wno-formt-DJOS_KERNEL-gstasts-c-S kern/init. c，并查看init. s。
- see if the bootloader loads the symbol table in memory as part of loading the kernel binary
- 看看引导程序是否加载内存中的符号表作为加载内核二进制文件的一部分
Complete the implementation of debuginfo_eip by inserting the call to stab_binsearch to find the line number for an address.
通过插入对stab_binsearch的调用来完成debuginfo_eip的实现，以查找地址的行号。
Add a backtrace command to the kernel monitor, and extend your implementation of mon_backtrace to call debuginfo_eip and print a line for each stack frame of the form:
向内核监视器添加回溯命令，并扩展mon_backtrace的实现，以调用debuginfo_eip并为表单的每个堆栈帧打印一行：
K> backtrace
K>回溯
Stack backtrace:
堆栈回溯：
  ebp f010ff78  eip f01008ae  args 00000001 f010ff8c 00000000 f0110580 00000000
ebp f010ff78 eip f01008ae args 00000001 f010ff8c 00000000 f0110580 00000000
         kern/monitor.c:143: monitor+106
kern/显示器. c： 143：显示器+106
  ebp f010ffd8  eip f0100193  args 00000000 00001aac 00000660 00000000 00000000
ebp f010ffd8 eip f0100193 args00000000 00001aac00000660 00000000 00000000
         kern/init.c:49: i386_init+59
kern/init. c： 49：i386_init+59
  ebp f010fff8  eip f010003d  args 00000000 00000000 0000ffff 10cf9a00 0000ffff
ebp f010fff8 eip f010003d args00000000 00000000 0000ffff 10cf9a00 0000ffff
         kern/entry.S:70: <unknown>+0
克恩/条目。S： 70：<未知>+0
K> 
K>
Each line gives the file name and line within that file of the stack frame's eip, followed by the name of the function and the offset of the eip from the first instruction of the function (e.g., monitor+106 means the return eip is 106 bytes past the beginning of monitor).
每行给出文件名和堆栈帧的eip文件中的行，然后是函数的名称和eip与函数的第一个指令的偏移量（例如，监视器+106意味着返回eip是监视器开始后的106字节）。
Be sure to print the file and function names on a separate line, to avoid confusing the grading script.
请务必将文件和函数名打印在单独的行上，以避免混淆分级脚本。
Tip: printf format strings provide an easy, albeit obscure, way to print non-null-terminated strings like those in STABS tables. printf("%.*s", length, string) prints at most length characters of string. Take a look at the printf man page to find out why this works.
提示：printf格式字符串提供了一种简单但模糊的方法来打印像STABS表中那样的非空值结尾的字符串。printf（"%.*s"，长度，字符串）打印字符串的最大长度字符。看看printf手册页，找出为什么这是有效的。
You may find that some functions are missing from the backtrace. For example, you will probably see a call to monitor() but not to runcmd(). This is because the compiler in-lines some function calls. Other optimizations may cause you to see unexpected line numbers. If you get rid of the -O2 from GNUMakefile, the backtraces may make more sense (but your kernel will run more slowly).
您可能会发现回溯中缺少一些函数。例如，您可能会看到对显示器（）的调用，而不是对runcmd（）的调用。这是因为编译器内联了一些函数调用。其他优化可能会导致您看到意想不到的行号。如果您从GNUMakefile中去掉-O2，回溯可能会更有意义（但是您的内核会运行得更慢）。
This completes the lab. In the lab directory, commit your changes with git commit and type make handin to submit your code.
这就完成了实验室。在实验室目录中，用git提交并键入make handin提交代码。
