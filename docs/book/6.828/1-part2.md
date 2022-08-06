# Lab 1 Part 2: The Boot Loader

磁盘是由扇区组成，一个扇区为 512 B。磁盘的第一个扇区称为 boot sector ，其中存放着 boot loader 。

BIOS 将 512B 的 boot sector 从磁盘加载到内存 0x7c00 到 0x7dff 之间。然后使用 jmp 指令设置 CS:IP 为 0000:7c00 最后将控制权传递给引导装载程序。在 6.828 中使用传统的硬盘启动机制，也就是 boot loader 不能超过 512B 。

> 为什么是 0x7c00？
> 简而言之，0x7c00 = 32KB - 1024B  
> 最初 IBM 设计 DOS 1.0 最小内存是 32KB 。
> 为了加载 boot loader 所消耗的内存要大于 512B ，选择了 1024B 。
> 具体可参考：https://zhuanlan.zhihu.com/p/38433204 。

boot loader 由汇编语言 `boot/boot.S` 和一个 C 语言文件 `boot/main.c` 组成。需要搞明白这两个文件的内容。

Boot Loader 负责两个功能：

1. boot loader 从实模式切换到 32 位的保护模式，因为只有在保护模式下软件才能访问超过 1MB 的物理内存。此外在保护模式下，段偏移量就变为了 32 而非 16 。

2. 其次，Boot Loader 通过 x86 的特殊 I/O 指令直接访问 IDE 磁盘设备寄存器，从硬盘上读取内核。

理解了 Boot Loader 的源代码后，看看 `obj/boot/boot.asm` 文件。这个文件是 GNUmakefile 在编译 Boot Loader 后创建的 Boot Loader 的反汇编。这个反汇编文件使我们很容易看到 Boot Loader 的所有代码在物理内存中的位置，也使我们更容易在 GDB 中跟踪 Boot Loader 发生了什么。同样的，`obj/kern/kernel.asm` 包含了 JOS 内核的反汇编，这对调试很有用。

在 gdb 中使用 b *0x7c00 在该地址处设置断点，然后使用 c 或 si 继续执行。c 将会跳转到下一个断点处，而 si 跳转到下一条指令，si N 则一次跳转 N 条指令。

使用 `x/Ni ADDR` 来打印地址中存储的内容。其中 N 是要反汇编的连续指令的数量，ADDR 是开始反汇编的内存地址。

> Exercise 3. 阅读 [lab tools guide](https://pdos.csail.mit.edu/6.828/2018/labguide.html)，即使你已经很熟悉了，最好看看。

在 0x7c00 设置一个断点，启动扇区将会加载到此处。跟踪 `boot/boot.S` 并使用 `obj/boot/boot.asm` 来定位当前执行位置。使用 GDB 的 x/i 命令来反汇编 Boot Loader 中的指令序列并和 `obj/boot/boot.asm` 比较。

* 阅读 `obj/boot/boot.asm` 下面是一些总结：

在汇编中以 . 开头的是汇编器指令，功能是告诉汇编器如何做，而不是做什么。汇编器指令并不会直接翻译为机器码，汇编指令会直接翻译为机器码。首先设置实模式的标志，进入实模式。然后关闭中断，防止执行时被打断，接下来设置字符串指针的移动方向。做了一些初始化工作，例如寄存器清零，开启 A20 数据线，为切换到 32 位做准备。处理 GDT 。

跟踪 boot/main.c 中的 bootmain() 函数，此后追踪到 readsect() 并研究对应的汇编指令，然后返回到 bootmain() 。确定从磁盘上读取内核剩余扇区的for循环的开始和结束。找出循环结束后将运行的代码，在那里设置一个断点，并继续到该断点。然后逐步完成 Boot Loader 的剩余部分。

* 回答下面的问题：

1. 在什么时候，处理器开始执行32位代码？究竟是什么原因导致从16位到32位模式的转换？

* 从 boot.S 的第 55 行开始切换为 32 位代码，切换到 32 位后会有更多的寻址空间。

2. Boot Loader 执行的最后一条指令是什么，它刚刚加载的内核的第一条指令是什么？

* 最后一条指令是 `boot/main.c` 的 `((void (*)(void)) (ELFHDR->e_entry))();` 
*  `movw $0x1234, 0x472`

3. 内核的第一条指令在哪里？

* 内核的第一条指令在 0x1000c 处，对应的源码位于 kern/entry.S 中。

4. Boot Loader如何决定它必须读取多少个扇区才能从磁盘上获取整个内核？它在哪里找到这些信息？

> 这些信息存放在 Proghdr 中。

接下来进一步研究 `boot/main.c` 中的 C 语言部分。

> Exercise 4. 建议阅读 'K&R' 5.1 到 5.5 搞清楚指针，此外弄清楚 [pointers.c](https://pdos.csail.mit.edu/6.828/2018/labs/lab1/pointers.c) 的输出，否则后续会很痛苦。

需要了解 ELF 二进制文件才能搞清楚 `boot/main.c` 。

当编译链接一个 C 语言程序时，首先需要将 .c 文件编译为 .o 结尾的 object 文件，其中包含了相应的二进制格式的汇编指令。

链接器将所有的 .o 文件链接为单个二进制镜像，例如 `obj/kern/kernel` ，这是一个 ELF 格式的二进制文件，全称叫做 “Executable and Linkable Format” 。

此处可以简单的将 ELF 认为该文件头部带有加载信息，然后是是程序部分，每部分都是连续的代码或数据块，将指定的地址加载到内存中。Boot Loader 将其加载到内存中并开始执行。

ELF 的二进制文件头部的长度是固定的，然后是长度可变的程序头，其中包含了需要加载的程序部分。在 `inc/elf.h` 中包含了 ELF 文件头部的定义。

* .text: 程序指令.
* .rodata: 只读数据，例如由 C 编译器生成的 ASCII 字符常量。(这个只读并没有在硬件层面实现)
* .data: 数据部分，包含了程序初始化的数据，例如声明的全局变量 x = 5 。

当链接器计算一个程序的内存布局之时，它为没有初始化的程序保留了空间，例如 int x ，在内存中紧随.data之后的一个名为.bss的部分。C 默认未初始化的全局变量为零，所以 .bss 此时没有存储内容，因此链接器只记录 .bss 部分的地址和大小并将其置为零。

通过键入检查内核可执行文件中所有部分的名称、大小和链接地址的完整列表。

    $ objdump -h obj/kern/kernel

    obj/kern/kernel:     file format elf32-i386

    Sections:
    Idx Name          Size      VMA       LMA       File off  Algn
    0 .text         00001917  f0100000  00100000  00001000  2**4
                    CONTENTS, ALLOC, LOAD, READONLY, CODE
    1 .rodata       00000714  f0101920  00101920  00002920  2**5
                    CONTENTS, ALLOC, LOAD, READONLY, DATA
    2 .stab         00003889  f0102034  00102034  00003034  2**2
                    CONTENTS, ALLOC, LOAD, READONLY, DATA
    3 .stabstr      000018af  f01058bd  001058bd  000068bd  2**0
                    CONTENTS, ALLOC, LOAD, READONLY, DATA
    4 .data         0000a300  f0108000  00108000  00009000  2**12
                    CONTENTS, ALLOC, LOAD, DATA
    5 .bss          00000648  f0112300  00112300  00013300  2**5
                    CONTENTS, ALLOC, LOAD, DATA
    6 .comment      00000023  00000000  00000000  00013948  2**0
                    CONTENTS, READONLY

VMA 是逻辑地址，LMA 是加载到内存中的物理地址。通常这两个地址是相同的。

boot loader 根据 ELF 文件的头部决定加载哪些部分。程序头部指定了哪些信息需要加载及其地址。可以通过下面的命令来查看程序头部。

    athena% objdump -x obj/kern/kernel

程序头部已经在 "Program Headers" 下列出，ELF 对象的区域需要加载到内存中然后被标记为 "LOAD"。

每个程序头的其他信息也被给出，如虚拟地址（"vaddr"），物理地址（"paddr"），以及加载区域的大小（"memsz "和 "filesz"）。

回到 `boot/main.c` 每一个程序的 `ph->p_pa` 字段包含了段的物理地址。此处是一个真正的物理地址，尽管 ELF 对这个描述不清晰。

BIOS 将 boot sector 加载到内存中并从 0x7c00 处开始，这是 boot sector 的加载地址。boot sector 从这里开始执行。这也是 boot sector 执行的地方，所以这也是它的链接地址。

在 `boot/Makefrag` 中通过 -Ttext 0x7C00 设置了启动地址。

> Exercise 5.再次追踪 Boot Loader 的前几条指令，找出第一条指令，如果把 Boot Loader 的链接地址弄错了，就会 "中断 "或报错。然后把`boot/Makefrag` 中的链接地址改成错误的，运行make clean，用make重新编译实验室，并再次追踪到boot loader，看看会发生什么。不要忘了把链接地址改回来，然后再做一次清理。

修改 `boot/Makefrag` 中的 `-Ttext 0x7C00` ，查看结果，例如将 其改为 `-Ttext 0x0C00` 。起初依旧加载到 0x7c00 处，但是跳转的时候出现问题。也就是最初的指令并不依赖地址，跳转的时候依赖。

![20220505143831](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220505143831.png)

回头看内核加载和链接的地址，和 Boot Loader 不同的是，这两个地址并不相同。内核告诉 Boot Loader 在一个低的地址（1 兆字节）将其加载到内存中，但它希望从一个高的地址执行。我们将在下一节中深入探讨如何使这一工作。

此外 ELF 还有很多重要的信息。例如 e_entry 是程序 entry point 的地址。可以通过如下命令查看：

    $ objdump -f obj/kern/kernel

    obj/kern/kernel:     file format elf32-i386
    architecture: i386, flags 0x00000112:
    EXEC_P, HAS_SYMS, D_PAGED
    start address 0x0010000c

kernel 是从 0x0010000c 处开始执行。

此时应当理解 `boot/main.c` 中的 ELF loader 。它将内核的每个部分从磁盘上读到内存中的该部分的加载地址，然后跳转到内核的入口点。

> Exercise 6.可以使用 GDB 的 x 命令来查看内存。此处知晓 `x/Nx ADDR` 就够用了，在ADDR处打印N个字的内存。

重新打开 gdb 检测，在 BIOS 进入 Boot Loader 时检查 0x00100000 处的 8 个内存字，然后在 Boot Loader 进入内核时再次检查。为什么它们会不同？在第二个断点处有什么？(你不需要用 QEMU 来回答这个问题，只需要思考一下。)

> 不同是因为内核加载进来了，内核指令。

## Part 2 总结

BIOS 将磁盘第一个扇区的数据(512B)复制到内存 0x7c00 到 0x7dff 之间。（这个地址是x86规定的，可自定义）。

这部分数据被称为 boot loader ，负责两个功能：切换到 32 位，将内核加载到内存中。