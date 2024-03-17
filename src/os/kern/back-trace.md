在调试程序时，backtrace 是一个非常有用的工具，它可以显示函数调用的堆栈轨迹。这对于理解程序的执行流程，以及定位错误发生的位置非常有帮助。这篇文章讲解如何实现 backtrace 。

### backtrace 使用示例

当使用 GDB（GNU Debugger）调试程序时，可以使用`backtrace`命令获取函数调用链信息，从而定位程序崩溃或异常的原因。以下是一个简单的示例，演示如何使用 GDB 调试并查看 backtrace 信息。

假设有一个简单的 C++程序，文件名为`my_program.cpp`：

```cpp
#include <iostream>

void func3() {
    int* invalidPointer = nullptr;
    *invalidPointer = 42;  // 这里将导致段错误
}

void func2() {
    func3();
}

void func1() {
    func2();
}

int main() {
    func1();
    return 0;
}
```

首先，使用以下命令编译程序并包含调试信息：

```bash
g++ -g -o my_program my_program.cpp
```

编译完成后，使用 GDB 运行程序：

```bash
gdb ./my_program
```

这将启动 GDB。现在，在 GDB 中运行程序：

```bash
run
```

程序将崩溃，而 GDB 会捕获这个崩溃。当崩溃发生时，使用`backtrace`命令获取 backtrace 信息：

```bash
bt
```

这将显示 backtrace 信息，显示函数调用序列以及崩溃发生的行号。输出可能如下所示：

```
#0  0x0000000000401174 in func3 () at my_program.cpp:6
#1  0x0000000000401186 in func2 () at my_program.cpp:11
#2  0x0000000000401192 in func1 () at my_program.cpp:16
#3  0x00000000004011a1 in main () at my_program.cpp:21
```

这个 backtrace 显示崩溃发生在`func3`的第 6 行，而`func3`又被`func2`调用（位于第 11 行），依此类推。

你可以使用 GDB 命令检查变量的值、设置断点以及执行各种调试任务。完成后，可以退出 GDB：

```bash
quit
```

这个示例演示了如何使用 GDB 分析 backtrace，并找出程序崩溃的源头。

### OS 是如何进入到命令行的？

OS 启动后通过 `i386_init` 函数完成一些初始化工作后，随后会进入一个无限循环，不断地调用 `monitor(NULL)` 函数。这个函数就是内核监视器，它提供了一个命令行界面，允许用户输入命令来控制内核和探索系统。

```c
void
i386_init(void)
{
	extern char edata[], end[];
	memset(edata, 0, end - edata);
	cons_init();
	// Drop into the kernel monitor.
	while (1)
		monitor(NULL);
}
```

`monitor(NULL)` 函数的定义在 `kern/monitor.c` 文件中。这个函数首先打印一些欢迎信息，然后进入一个无限循环，不断地读取用户输入的命令，并尝试执行这些命令。

### 在命令行中是如何解析命令的？

在 `monitor` 函数的无限循环中，每次循环都会调用 `readline` 函数来读取用户输入的一行命令，然后调用 `runcmd` 函数来解析和执行这个命令。`runcmd` 函数会查找命令列表中的命令，如果找到匹配的命令，就调用相应的函数来执行这个命令。

因此，当在内核监视器中输入一个命令并按下回车键时，内核就会执行相应的函数，然后返回到内核监视器，等待输入下一个命令。

下面是具体的使用示例，输入 help 后会输出对应的信息。

```
Welcome to the JOS kernel monitor!
Type 'help' for a list of commands.
K> help
help - Display this list of commands
kerninfo - Display information about the kernel
backtrace - Stack backtrace
```

下面是具体的实现代码：

```c
void
monitor(struct Trapframe *tf)
{
	char *buf;

	cprintf("Welcome to the JOS kernel monitor!\n");
	cprintf("Type 'help' for a list of commands.\n");


	while (1) {
		buf = readline("K> ");
		if (buf != NULL)
			if (runcmd(buf, tf) < 0)
				break;
	}
}
```

### 命令是如何跳转到对应函数上的？

一个命令对应一个名为 `Command` 的结构体，`Command` 结构体包含三个成员：

```c
struct Command {
	const char *name;   // 一个指向常量字符的指针，表示命令的名称。
	const char *desc;   // 一个指向常量字符的指针，表示命令的描述。
	// return -1 to force monitor to exit
	int (*func)(int argc, char** argv, struct Trapframe* tf);
};
```

其中 `func` 表示一个函数指针，指向的函数接受三个参数（一个整数，一个字符指针的指针，以及一个指向 `Trapframe` 结构体的指针），并返回一个整数。这个函数指针表示执行命令时应调用的函数。

此外维护了一个全局数组，`commands` 数组包含了三个 `Command` 结构体的实例，分别对应三个不同的命令：`help`，`kerninfo` 和 `backtrace`。每个命令都有一个名称，一个描述，以及一个对应的函数。

- `help` 命令的函数是 `mon_help`，它会显示所有可用的命令及其描述。
- `kerninfo` 命令的函数是 `mon_kerninfo`，它会显示关于内核的信息。
- `backtrace` 命令的函数是 `mon_backtrace`，它会显示函数调用的堆栈轨迹。

下面是具体代码的实现细节。

```c
static struct Command commands[] = {
	{ "help", "Display this list of commands", mon_help },
	{ "kerninfo", "Display information about the kernel", mon_kerninfo },
	{ "backtrace", "Stack backtrace", mon_backtrace},
};
```

当中断读取到命令时会遍历这个数组判断是否一致，若一致则会跳转到对应的函数上。

### backtrace 是如何实现的？

`mon_backtrace` 函数实现了一个简单的 backtrace 功能。这个函数的工作原理是，它从当前的 EBP（Extended Base Pointer）寄存器开始，沿着堆栈向上回溯，打印出每个堆栈帧的信息。这个过程的代码如下：

```c
int
mon_backtrace(int argc, char **argv, struct Trapframe *tf) {
    cprintf("Stack backtrace:\n");
    uint32_t *ebp;
    int valid;
    struct Eipdebuginfo ei;
    ebp = (uint32_t *) read_ebp();
    while (ebp != 0) {
        cprintf("  ebp %08x", ebp);
        cprintf(" eip %08x  args", *(ebp + 1));
        valid = debuginfo_eip(*(ebp + 1), &ei);
        for (int i = 2; i < 7; ++i) {
            cprintf(" %08x", *(ebp + i));
        }
        cprintf("\n");
        if (valid == 0) {
            cprintf("         %s:%d: %.*s+%d\n",
                ei.eip_file, ei.eip_line, ei.eip_fn_namelen,
                ei.eip_fn_name, *(ebp + 1) - ei.eip_fn_addr);
        }
        ebp = (uint32_t *) *ebp;
    }
    return 0;
}
```

在这段代码中，`read_ebp()` 函数用于读取当前的 EBP 寄存器的值。然后，通过 `*(ebp+1)` 可以获取到当前函数的返回地址（EIP），这个地址就是调用当前函数的函数的地址。然后，通过 `debuginfo_eip` 函数，可以获取到这个地址对应的源代码行号和函数名。最后，通过 `*(ebp+i)`（其中 i 从 2 到 6）可以获取到当前函数的参数。

这样，通过打印出每个堆栈帧的 EBP、EIP、源代码行号、函数名和参数，就可以得到一个详细的函数调用堆栈轨迹。

### 内存布局

下面突出了 `backtrace` 中 `ebp`、`eip` 等信息在内存中的布局：

```
+-------------------------+
|       Stack Top         |
|                         |
|         ...             |
|                         |
|   Function Arguments    |  <- ebp + 2
|                         |
|   ...                   |
|                         |
|   Function Arguments    |  <- ebp + 6
|                         |
|-------------------------|
|      Previous EBP       |  <- ebp
|-------------------------|
|    Return Address (eip) |  <- ebp + 1
|-------------------------|
|    Local Variables      |
|    and Temporary Data   |
|                         |
|         ...             |
|                         |
|-------------------------|
|      Previous EBP       |
|-------------------------|
|    Return Address (eip) |
|-------------------------|
|    Local Variables      |
|    and Temporary Data   |
|                         |
|         ...             |
|                         |
+-------------------------+
```

解释：

- 栈从高地址向低地址生长，即栈顶在上方，栈底在下方。
- 每个堆栈帧的起始地址是 `ebp` 的值。
- `ebp` 存储了上一级函数的 `ebp`，通过 `*ebp` 可以访问上一级函数的堆栈帧。
- `*(ebp + 1)` 存储了当前函数的返回地址 (`eip`)，即调用当前函数的函数的地址。
- `*(ebp + i)`（其中 i 从 2 到 6）存储了当前函数的参数。
- `debuginfo_eip` 函数用于获取 `eip` 对应的源代码行号和函数名。

### 如何获取源代码行号？

之前代码中通过调用 `debuginfo_eip` 来进一步获取源代码行号和函数名等相关信息，接下来讲解 `debuginfo_eip` 这个函数是如何获取这些信息的。

`debuginfo_eip` 函数的主要目的是填充一个 `Eipdebuginfo` 结构体，该结构体包含了关于指定指令地址（`addr`）的信息。函数返回 0 表示找到了信息，返回负数表示没有找到信息。即使返回负数，它也会将一些信息存储到 `*info` 中。

函数首先初始化 `info` 结构体的各个字段，然后找到相关的 stab 集（stab 是一种用于调试信息的数据格式）。

接着，函数使用二分查找（`stab_binsearch`）在 stab 集中查找源文件（类型为 `N_SO` 的 stab）。如果找不到源文件，函数返回 -1。

然后，函数在找到的文件的 stab 中查找函数定义（类型为 `N_FUN` 的 stab）。如果找到了函数定义，函数就会设置 `info` 结构体的 `eip_fn_name` 和 `eip_fn_addr` 字段，并在函数定义中查找行号。如果没有找到函数定义，函数就会在整个文件中查找行号。

接下来，函数在行号的 stab 中查找文件名 stab。因为内联函数可能会插入来自不同文件的代码，所以不能只使用 `lfile` stab，而需要向后查找到相关的文件名 stab。

最后，函数设置 `eip_fn_narg` 字段为函数接受的参数数量，如果没有包含函数，则设置为 0。

这就是 `debuginfo_eip` 函数的基本工作原理。

### stab 是什么？

"stab" 是一种用于存储调试信息的数据格式，它通常存储在程序的二进制文件中，例如 ELF（Executable and Linkable Format）文件。它通常用于存储源代码文件、函数、变量、行号等信息，以便在调试时可以从执行的机器代码中恢复出源代码的结构。

在程序加载到内存时，这些信息也会被加载到内存中。在代码中，`__STAB_BEGIN__` 和 `__STAB_END__` 分别表示 stab 表的开始和结束，这些都是内存地址。`debuginfo_eip` 函数就是通过这些 stab 和字符串表来获取指定地址的调试信息。

在代码中，`stab` 是一个结构体，定义在 `inc/stab.h` 文件中。这个结构体包含了一些字段，如 `n_type`、`n_value` 和 `n_strx`，这些字段分别用于存储 stab 类型、地址值和字符串索引。

例如，`N_SO` 类型的 stab 用于标记源文件，`N_FUN` 类型的 stab 用于标记函数。`n_value` 字段存储的是源文件或函数的地址，`n_strx` 字段是一个索引，指向一个字符串表，这个字符串表存储了源文件名或函数名。

stab 中的信息是在编译阶段生成的。当你使用 gcc 或其他编译器编译源代码时，如果你开启了调试选项（例如使用 gcc 的 `-g` 选项），编译器就会生成 stab 信息并将其存储在生成的二进制文件中。这些信息包括源代码文件名、函数名、变量名、行号等，这些都是在调试时非常有用的信息。

### 总结

文章强调了在调试程序时使用 backtrace 的重要性，并通过 GDB 的 backtrace 命令展示了如何获取函数调用链信息以定位程序崩溃或异常的原因。同时，文章解释了内核监视器的实现，包括如何解析用户输入的命令并调用相应的函数。文章还通过`mon_backtrace`函数展示了如何从当前的 EBP 寄存器开始，沿着堆栈向上回溯，打印每个堆栈帧的信息，并讲解了如何通过`debuginfo_eip`函数和 stab 信息获取源代码行号的过程。stab 是一种存储调试信息的数据格式，通常存储在程序的二进制文件中，用于在调试时恢复出源代码的结构，这些信息是在编译阶段生成的，需要开启调试选项才会包含在生成的二进制文件中。
