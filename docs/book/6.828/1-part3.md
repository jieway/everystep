# Lab 1 Part 3: The Kernel

最初先执行汇编，然后为 C 语言执行做一些准备。使用虚拟内存来解决位置依赖的问题。

Boot Loader 的虚拟地址和物理地址是相同的，但是内核的虚拟地址和物理地址是不同的，更为复杂，链接和加载地址都在 `kern/kernel.ld` 的顶部。

地址空间的低地址部分通常留给用户程序使用。高地址部分通常留给 OS 内核使用，链接和运行，例如 `0xf0100000` 。

但是有些机器的物理内存（物理内存太小）无法达到 `0xf0100000` 进而无法存储内核。解决方案是使用内存管理硬件将虚拟地址 `0xf0100000` 映射到物理地址 `0x00100000` 处。这样使得内核虚拟地址足够高，用户进程有足够的地址空间。

内核实际位于物理内存中位于 PC 中 RAM 的 1MB 处，也就在 BIOS ROM 上方。这使得 PC 至少要有几兆字节的物理内存，至少大于 `0x00100000` 才可以。这也是 1990 年后的 PC 真实情况。

事实上，在下一个实验中，我们将把PC的整个底部 256MB 的物理地址空间，从物理地址 `0x00000000` 到 `0x0fffffff` ，分别映射到虚拟地址 `0xf0000000` 到 `0xffffffff` 。这也就是为什么JOS只能使用前256MB的物理内存了。

现在只需映射前 4MB 的物理内存，这就足以开始运行。

使用`kern/entrypgdir.c`中手工编写的、静态初始化的页目录和页表来做这件事。现在不需要了解这个工作的细节，只需要了解它的效果。在`kern/entry.S`设置 CR0_PG 标志之前，内存引用被视为物理地址（严格来说，它们是线性地址，但`boot/boot.S`设置了从线性地址到物理地址的映射，我们永远不会改变）。一旦CR0_PG被设置，内存引用就是虚拟地址，被虚拟内存硬件翻译成物理地址。 entry_pgdir 将 0xf0000000 到 0xf0400000 范围内的虚拟地址翻译成物理地址0x00000000到0x00400000，以及虚拟地址0x00000000到0x00400000翻译为物理地址0x00000000到0x00400000。任何不在这两个范围内的虚拟地址都会引起硬件异常，由于我们还没有设置中断处理，这将导致QEMU转储机器状态并退出（如果你没有使用6.828补丁版本的QEMU，则会无休止地重新启动）。

> Exercise 7.使用QEMU和GDB追踪到JOS的内核，在 `movl %eax, %cr0` 处停止。检查0x00100000和0xf0100000处的内存。现在，使用stepi GDB命令对该指令进行单步操作。再次，检查0x00100000和0xf0100000处的内存。确保你明白刚刚发生了什么。

在新的映射建立后的第一条指令是什么，如果映射没有建立，它将不能正常工作？把`kern/entry.S`中的`movl %eax, %cr0`注释，追踪到它，看看你是否正确。

![20220505155904](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220505155904.png)

在 0x00100000 处打断点，比较两个地址中存储的数据后发现不一样。

![20220505160121](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220505160121.png)

> 然后执行几条指令，执行完 `mov    %eax,%cr0` 后发现两个地址中存储的数据一致。说明此时启用了页表明完成了地址映射。

大多数人认为 printf() 这样的函数是理所当然的，有时甚至认为它们是C语言的 "原语"。但是在操作系统的内核中，我们必须自己实现所有的I/O。

## Formatted Printing to the Console

阅读 `kern/printf.c`、`lib/printfmt.c` 和 `kern/console.c`，并确保你理解它们之间的关系。在后面的实验中会清楚为什么 `printfmt.c` 位于单独的 lib 目录中。

`kern/printf.c` 中的 `cprintf()` 函数调用了 `vcprintf()` 函数，该函数又调用了 `lib/printfmt.c` 中的 `vprintfmt()` 函数。

	va_start(ap, fmt);
	cnt = vcprintf(fmt, ap);
	va_end(ap);

接下来研究 `cprintf()` 函数，函数签名是 `int cprintf(const char *fmt, ...)` 其中 ... 表示可变参数。

然后是 [va_start](https://en.cppreference.com/w/c/variadic/va_start) ，简单来说，就是将可变参数放置到 ap 中。

然后调用 vcprintf 函数，将得到的参数 ap 传进去，最后调用 `va_end` 释放参数列表。此外，这部分还涉及到了 va_arg ，后面会用到，例如 `va_arg(*ap, int)` 表示用 int 来解析 ap 。

其中 putch 函数作为参数传入，而 putch 函数调用了 cputchar 函数，该函数再次调用了 cons_putc 函数，根据注释可知该函数负责将字符输出到终端。根据调用关系，可以简单的认为 putch 实现了将数据打印到终端的功能，至于实现细节后续再研究。

接下来回头研究 `lib/printfmt.c` 中的 `vprintfmt()` 函数，因为 `kern/printf.c` 中的 `cprintf()` 最终调用了该函数。

```c
vprintfmt(void (*putch)(int, void*), void *putdat, const char *fmt, va_list ap)
```

该函数的函数签名中共四个参数，下面是四个参数的解释：

1. 第一个参数是 putch 函数，之前已经解释过了，负责实现打印到终端。
2. 第二个参数 putdat 初始值为零，目前还不知道负责什么功能。
3. 第三个参数 fmt 是输入的字符串。
4. 第四个参数 ap 是 va_list 类型，这个参数实现了可变参数，也就是可以处理不同数量的参数。

cons_putc 分别调用了 serial_putc，lpt_putc 和 cga_putc 三个函数。

> Exercise 8. 我们省略了一小段代码--使用"%o "形式的模式打印八进制数字所需的代码。找到并填入这个代码片段。

		case 'u':
			num = getuint(&ap, lflag);
			base = 10;
			goto number;

		// (unsigned) octal
		case 'o':
			// Replace this with your code.
			num = getuint(&ap, lflag);
			base = 8;
			goto number;
			break;


回答以下问题: 

1. 解释一下 printf.c 和 console.c 之间的接口。具体来说，console.c输出了什么函数？这个函数是如何被printf.c使用的？

printf.c 中的 putch() 函数调用了 console.c 中的 cputchar() 函数，该函数再次调用了 cons_putc() 函数，这个函数负责将数据打印到终端。

2. 从 console.c 中解释如下：

```c
    1      if (crt_pos >= CRT_SIZE) {
    2              int i;
    3              memmove(crt_buf, crt_buf + CRT_COLS, (CRT_SIZE - CRT_COLS) * sizeof(uint16_t));
    4              for (i = CRT_SIZE - CRT_COLS; i < CRT_SIZE; i++)
    5                      crt_buf[i] = 0x0700 | ' ';
    6              crt_pos -= CRT_COLS;
    7      }
```

这段函数源自 `console.c` 文件中的 `cga_putc()` 函数，该函数会被 `cons_putc()` 函数所调用。根据注释可知，`cons_putc()` 负责将数据打印到终端，那么 `cga_putc()` 则是负责具体实现如何打印到终端。

然后研究 `void* memmove( void* dest, const void* src, std::size_t count );` 从 src 处复制 count 大小的数据到 dest 上。最后分析 `memmove(crt_buf, crt_buf + CRT_COLS, (CRT_SIZE - CRT_COLS) * sizeof(uint16_t));` 其实就是将当前屏幕上的数据向上移动一行。

最后的 for 循环就是将最新写入的部分(crt_pos >= CRT_SIZE)打印出来。

3. 对于下面的问题，你可能希望参考第2讲的注释。这些笔记涵盖了GCC在X86上的调用惯例。

* 逐步跟踪以下代码的执行。

    int x = 1, y = 3, z = 4;
    cprintf("x %d, y %x, z %d\n", x, y, z);

* 在对cprintf()的调用中，fmt指向什么？ap指的是什么？

列出对cons_putc、va_arg和vcprintf的每个调用（按执行顺序）。对于cons_putc，也要列出其参数。对于va_arg，列出调用前后ap所指向的内容。对于vcprintf，列出其两个参数的值。


> 首先研究 fmt ：将上述代码写入 `kern/monitor.c` 中的 `mon_backtrace()` 函数中，然后开始调试。

> 使用 `b mon_backtrace` 打断点，使用 c 执行到这一步，然后使用 `s` 进入 `cprintf()` 函数中，多执行两步后发现 `fmt = "x %d, y %x, z %d\n"` 。

![20220505225217](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220505225217.png)

> 接下来研究 ap ，经过数次调用 va_arg ，ap 从 1 3 4 变为 3 4 变为 4 再为空。

4. 运行以下代码。

    unsigned int i = 0x00646c72;
    cprintf("H%x Wo%s", 57616, &i);


输出是什么？解释一下这个输出是如何按照前面练习的方式一步步得出的。这里有一个ASCII表，将字节映射到字符。这个输出取决于x86是小端的事实。如果x86是big-endian的，你要把i设置成什么样子才能产生同样的输出？你是否需要将57616改为不同的值？

> 输出 "He110 World" 其中 5760 的二进制形式是 e110 。至于 0x00646c72 为什么显示为 rld ，首先要搞清楚大小端。

> 我认为应当从读取顺序的角度来看，通常人类的读取习惯是从高位向地位阅读，也就是从左向右。但是对于计算机而言优先处理地位显然效率更高，所以数字的地位存储在低地址部分，数据的高位存储在高地址部分，也就是小端。而大端反之，地位存储在高地址部分，小端存储在低地址部分。

    低地址  =====> 高地址
    小端：  72  6c  64 00
    大端：  00  64  6c 72

> 查 ASCII 表可知 0x72 0x6c 0x64 0x00 分别表示 'r' 'l' 'd' '\0' 。如果在大端的系统上输出相同的内容需要改为 0x726c6400 。

5. 在下面的代码中，'y='后面要打印什么？(注意：答案不是一个具体的数值。)为什么会出现这种情况？

    cprintf("x=%d y=%d", 3);

> 输出 x=3 y=-267321544 第一个输出 3 是因为参数就是 3 而第二个输出则是读取了相邻地址中的内容。

6. 假设GCC改变了它的调用惯例，使它按声明顺序把参数推到堆栈上，这样最后一个参数就被推到了。你要如何改变cprintf或它的接口，使它仍然有可能传递可变数量的参数？

> `cprintf` 函数的两个参数交换顺序即可。

7. 挑战，终端打印出彩色文本。

> 写到这里已经花了很长时间了，先跳过。

## The Stack

## Exercise 9. 

确定内核在哪里初始化它的堆栈，以及它的堆栈在内存中的确切位置。内核是如何为其堆栈保留空间的？堆栈指针被初始化为指向这个保留区域的哪个 "末端"？

esp 寄存器指向栈顶，ebp 指向栈底。在 32 位模式下，堆栈只能容纳 32 位的值，esp 总能被 4 整除。当调用 C 函数之时，首先将 esp 中的值复制到 ebp 中，然后 esp 向下生长开辟空间。可以通过 ebp 指针链来回溯堆栈进而确定函数的调用关系。这个功能很有用，例如一个函数断言失败或 panic ，那么可以通过回溯堆栈来确定出现问题函数。

> 1. 在 `kernel/entry.S` 中 77 行的 `movl	$(bootstacktop),%esp` 指令开始初始化栈，该指令设置了栈帧。
> 2. 根据 `.space		KSTKSIZE` 来确定栈大小，KSTKSIZE 在 `inc/memlayout.h` 定义大小为 8*PGSIZE ，而 PGSIZE 为 4096 字节。
> 3. 根据相应的汇编文件 `obj/kern/kernel.asm` 第 58 行可知，栈帧的虚拟地址为 0xf0110000。因为栈是向下生长，所以根据 KSTKSIZE 可以确定栈的末端。

## Exercise 10. 

为了熟悉x86上的C语言调用习惯，在`obj/kern/kernel.asm`中找到`test_backtrace`函数的地址，在那里设置一个断点，并检查内核启动后每次调用该函数时发生的情况。test_backtrace的每个递归嵌套层在堆栈上推多少个32位字，这些字是什么？

实现 `kern/monitor.c` 文件中的 `mon_backtrace()` 函数。`inc/x86.h`中的`read_ebp()`函数很有用。

回溯函数应该以下列格式显示函数调用框架的清单。

        Stack backtrace:
        ebp f0109e58  eip f0100a62  args 00000001 f0109e80 f0109e98 f0100ed2 00000031
        ebp f0109ed8  eip f01000d6  args 00000000 00000000 f0100058 f0109f28 00000061
        ...

每一行都包含一个 ebp 、 eip 和 args 。ebp 值表示该函数所使用的进入堆栈的基本指针：即刚进入函数后堆栈指针的位置，函数序言代码设置了基本指针。 eip 值是该函数的返回指令指针：当函数返回时，控制将返回到该指令地址。返回指令指针通常指向调用指令之后的指令（为什么呢）。最后，在args后面列出的五个十六进制值是有关函数的前五个参数，这些参数在函数被调用之前会被推到堆栈中。当然，如果函数被调用时的参数少于5个，那么这5个值就不会全部有用。(为什么回溯代码不能检测到实际有多少个参数？如何才能解决这个限制呢？）

打印的第一行反映当前执行的函数，即 mon_backtrace 本身，第二行反映调用  mon_backtrace 的函数，第三行反映调用该函数的函数，以此类推。应该打印所有未完成的堆栈帧。通过研究 `kern/entry.S` ，你会发现有一种简单的方法可以告诉你何时停止。

以下是你在《K&R》第五章中读到的几个具体要点，值得你在下面的练习和今后的实验中记住。

1. 如果int *p = (int*)100，那么(int)p + 1和(int)(p + 1)是不同的数字：第一个是101，但第二个是104。当把一个整数加到一个指针上时，就像第二种情况一样，这个整数隐含地乘以指针所指向的对象的大小。
2. p[i]被定义为与*(p+i)相同，指的是p所指向的内存中的第i个对象。当对象大于一个字节时，上面的加法规则有助于这个定义发挥作用。
3. &p[i]与(p+i)相同，产生p所指向的内存中的第i个对象的地址。

尽管大多数C语言程序不需要在指针和整数之间进行转换，但操作系统经常需要。每当你看到涉及内存地址的加法时，要问自己这到底是整数加法还是指针加法，并确保被加的值被适当地乘以。

> ebp 的初始值为 0 ，可以判断是否为零来停止循环。

```cpp
	uint32_t ebp, eip;
	cprintf("Stack backtrace:\n");
	for (ebp = read_ebp(); ebp != 0; ebp = *((uint32_t *)ebp)) {
		eip = *((uint32_t *)ebp + 1);
		cprintf(" ebp %08x eip %08x args %08x %08x %08x %08x %08x\n",
		ebp, eip, *((uint32_t *)ebp + 2),
		*((uint32_t *)ebp + 3), *((uint32_t *)ebp + 4),
		*((uint32_t *)ebp + 5), *((uint32_t *)ebp + 6));
	}
```

> Exercise 11. 使用 make grade 验证。

如果使用 read_ebp()，中间变量可能会被优化掉，进而导致跟踪堆栈信息时看不到完整的堆栈信息。

在这一点上，你的回溯函数应该给你堆栈上导致 mon_backtrace() 被执行的函数调用者的地址。然而，在实践中，你经常想知道这些地址所对应的函数名称。例如，你可能想知道哪些函数可能包含一个导致内核崩溃的错误。

为了帮助你实现这一功能，我们提供了函数 debuginfo_eip()，它在符号表中查找eip并返回该地址的调试信息。这个函数在kern/kdebug.c中定义。

在这一点上，你的回溯函数应该给你堆栈上导致 mon_backtrace() 被执行的函数调用者的地址。然而，在实践中，你经常想知道这些地址所对应的函数名称。例如，你可能想知道哪些函数可能包含一个导致内核崩溃的错误。

为了帮助你实现这一功能，我们提供了函数 debuginfo_eip() ，它在符号表中查找 eip 并返回该地址的调试信息。这个函数在kern/kdebug.c中定义。

通过 `debuginfo_eip(addr, info)` 来查看 eip 中更多的信息，具体功能是将地址 addr 处的内容填入 info 中。如果找到信息就返回零，如果没有查到信息就返回负数，

## Exercise 12. 

修改你的堆栈回溯函数，为每个 eip 显示函数名、源文件名和与该 eip 对应的行号。

在 debuginfo_eip 中，__STAB_* 来自哪里？这个问题有一个很长的答案；为了帮助你发现答案，这里有一些你可能想做的事情。

* 在kern/kernel.ld文件中查找__STAB_*。
* 运行 objdump -h obj/kern/kernel
* 运行objdump -G obj/kern/kernel
* 运行gcc -pipe -nostdinc -O2 -fno-builtin -I. -MD -Wall -Wno-format -DJOS_KERNEL -gstabs -c -S kern/init.c，并查看init.s。
* 看看bootloader是否在内存中加载符号表作为加载内核二进制的一部分
* 完成 debuginfo_eip 的实现，插入对stab_binsearch的调用，以找到地址的行号。


	stab_binsearch(stabs, &lline, &rline, N_SLINE, addr);
	info->eip_line = lline > rline ? -1 : stabs[rline].n_desc;

在内核监控器中添加一个回溯命令，并扩展你的mon_backtrace的实现，以调用debuginfo_eip并为每个堆栈帧打印一行。

        Stack backtrace:
        ebp f0109e58  eip f0100a62  args 00000001 f0109e80 f0109e98 f0100ed2 00000031
        ebp f0109ed8  eip f01000d6  args 00000000 00000000 f0100058 f0109f28 00000061

    K> backtrace
    Stack backtrace:
    ebp f010ff78  eip f01008ae  args 00000001 f010ff8c 00000000 f0110580 00000000
            kern/monitor.c:143: monitor+106
    ebp f010ffd8  eip f0100193  args 00000000 00001aac 00000660 00000000 00000000
            kern/init.c:49: i386_init+59
    ebp f010fff8  eip f010003d  args 00000000 00000000 0000ffff 10cf9a00 0000ffff
            kern/entry.S:70: <unknown>+0
    K> 

每一行都给出了stack frame 的 eip 文件名和在该文件中的行数，然后是函数的名称和 eip 与函数第一条指令的偏移量（例如，monitor+106表示返回eip比monitor的开头多106字节）。

请确保将文件和函数名单独打印在一行，以避免混淆 grading 脚本。

提示：printf格式的字符串提供了一种简单但不明显的方法来打印非空尾的字符串，如STABS表中的字符串。 printf("%.*s", length, string)最多能打印出字符串的长度字符。看一下printf手册，了解为什么这样做。

你可能会发现在回溯中缺少一些函数。例如，你可能会看到对monitor()的调用，但没有对runcmd()的调用。这是因为编译器对一些函数的调用进行了内联。其他优化可能导致你看到意外的行数。如果你把GNUMakefile中的-O2去掉，回溯可能会更有意义（但你的内核会运行得更慢）。


```cpp
int
mon_backtrace(int argc, char **argv, struct Trapframe *tf)
{
	uint32_t ebp, eip;
	struct Eipdebuginfo info;
	cprintf("Stack backtrace:\n");
	for (ebp = read_ebp(); ebp != 0; ebp = *((uint32_t *)ebp)) {
		eip = *((uint32_t *)ebp + 1);
		cprintf(" ebp %08x eip %08x args %08x %08x %08x %08x %08x\n",
		ebp, eip, *((uint32_t *)ebp + 2),
		*((uint32_t *)ebp + 3), *((uint32_t *)ebp + 4),
		*((uint32_t *)ebp + 5), *((uint32_t *)ebp + 6));

		if (!debuginfo_eip(eip,&info)) {
			cprintf("%s:%d: %.*s+%d\n",
			info.eip_file, info.eip_line,info.eip_fn_namelen,
			info.eip_fn_name, eip - info.eip_fn_addr);		
		}
	}
	return 0;
}
```

## Part 3 总结

实模式的虚拟地址等于物理地址，保护模式虚拟地址和物理地址之间存在一个映射关系。

# lab1 总结

1. PC 通电后，CPU 首先执行 BIOS ，执行一些初始化工作。
2. BIOS 将磁盘第一个扇区的数据(512B)复制到内存 0x7c00 到 0x7dff 之间。（这个地址是x86规定的，可自定义）。
3. 这部分数据被称为 boot loader ，负责两个功能：切换到 32 位，将内核加载到内存中。
4. 实模式的虚拟地址等于物理地址，保护模式虚拟地址和物理地址之间存在一个映射关系。