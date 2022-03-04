# Lab4: traps

* 实验手册：https://pdos.csail.mit.edu/6.S081/2020/labs/traps.html
* 中文版：http://xv6.dgs.zone/labs/requirements/lab4.html
* [lec6](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/lec06-isolation-and-system-call-entry-exit-robert)

* https://www.bilibili.com/video/BV19k4y1C7kA?p=4

*  https://www.bilibili.com/video/BV19k4y1C7kA?p=5

* 视频解析：https://www.bilibili.com/video/BV1FT4y127WW/?spm_id_from=pageDriver

## 总结

指令在执行的时候是会暂停的，以下三种情况下会暂停普通指令的执行：

1. 系统调用。例如系统执行 ecall 指令。
2. 异常。例如除零或使用无效地址。
3. 中断。例如设备发出读写请求。

以上三种情况统称为 trap 。trap 是透明的，也就是被执行的代码感知不到 trap 的存在。

trap 的大致流程如下：

1. 控制权交给内核。
2. 内核保存寄存器状态方便日后恢复。
3. 内核执行相应代码。
4. 内核恢复状态并从 trap 中返回。
5. 代码回到原来的地方。

在切换的过程中需要修改寄存器的状态，以下是一些重要寄存器的介绍。

* 程序计数器(Program Counter Register) ，指向了当前正在指向的下一条指令。
* mode ，表明当前mode的标志位，这个标志位表明了当前是supervisor mode还是user mode。当我们在运行Shell的时候，自然是在user mode。
* SATP（Supervisor Address Translation and Protection） 指向page table的物理内存地址。
* STVEC（Supervisor Trap Vector Base Address Register）指向了内核中处理trap的指令的起始地址。
* SEPC（Supervisor Exception Program Counter）在trap的过程中保存程序计数器的值。
* SSRATCH（Supervisor Scratch Register）寄存器，这也是个非常重要的寄存器（详见6.5）。

这些寄存器表明了执行系统调用时计算机的状态。

trap 流程

1. 保存 32 个用户寄存器。
2. 保存程序计数器 CP ，中断完成后通过之前的 PC 继续执行。
3. 将 mode 改成 supervisor mode 。
4. 将 SATP 指向 kernel page table 。
5. 将堆栈寄存器指向位于内核的一个地址，因为我们需要一个堆栈来调用内核的C函数。
6. 设置好后跳入内核的C代码。

这一节的重点是如何从将程序执行从用户空间切换到内核的一个位置。

用户代码不能接入到 user/kernel 切换，因为会破坏安全性，所以trap中涉及到的硬件和内核机制不能依赖任何来自用户空间东西。例如我们不能依赖32个用户寄存器，它们可能保存的是恶意的数据，所以，XV6的trap机制不会查看这些寄存器，而只是将它们保存起来。

trap 机制对用户代码是透明的。也就是用户代码察觉不到 trap 的执行。

可以在supervisor mode完成，但是不能在user mode完成的工作：读写SATP寄存器，也就是page table的指针；STVEC，也就是处理trap的内核指令地址；SEPC，保存当发生trap时的程序计数器；SSCRATCH等等。

在 supervisor mode 下可以使用PTE_U标志位为0的PTE。当PTE_U标志位为1的时候，表明用户代码可以使用这个页表；

supervisor mode 中的代码并不能读写任意物理地址。在supervisor mode中，就像普通的用户代码一样，也需要通过page table来访问内存。如果一个虚拟地址并不在当前由SATP指向的page table中，又或者SATP指向的page table中PTE_U=1，那么supervisor mode不能使用那个地址。所以，即使我们在supervisor mode，我们还是受限于当前page table设置的虚拟地址。

如何通过trap进入到内核空间：

1. write 通过执行 ECALL 指令来执行系统调用。
2. ECALL指令会切换到具有supervisor mode的内核中。ecall 具体干了三件事情：
   1. 将代码从user mode改到supervisor mode。
   2. 将程序计数器的值保存在了SEPC寄存器。
   3. ecall会跳转到STVEC寄存器指向的指令。
3. 在内核中执行的第一个指令是一个由汇编语言写的函数，叫做 uservec ，位于 trampoline.s 中。
   1. 保存现场，也就是保存 32 个通用寄存器中的数据。
   2. 切换到内核页表，内核栈，将当前进程的 CPUid 加载到寄存器中。
   3. 跳转到 usertrap() 。
4. 之后跳转到 trap.c 中的 usertrap() 中。
   1. 更改STVEC寄存器。(从用户态到内核态，如果已经在内核中了那么很多操作将会省去)
   2. 通过 myproc 函数获取当前正在执行的进行。
   3. 保存当前进程的SEPC寄存器到一个与该进程关联的内存中(trapframe)，因为中间如果发生进程切换可能会导致数据被覆盖。
   4. 分析为什么执行 usertrap() 调用，8 表示因为系统调用而执行 usertrap() 函数。
   5. 判断当前进程是否已被杀掉。
   6. 之前保存的 PC + 4，指向返回地址。
   7. 执行 syscall 前开启中断。此时是可以被中断的。
5. 在 usertrap 中，执行 syscall 函数。
   1. 根据传入的代表系统调用的数字进行查找，并在内核中执行具体实现了系统调用功能的函数。此时就是sys_write。
   2. sys_write 将要显示数据输出到console上，完成后会返回给 syscall 函数。
6. usertrap 最终调用了 trap.c 中的 usertrapret() 函数，该函数实现了在C代码中实现的返回到用户空间的工作。
   1. 首先关闭中断，更新STVEC寄存器来指向用户空间的trap处理代码，将STVEC更新到指向用户空间的trap处理代码时。
   2. 存储了内核页表，内核栈的指针。
   4. 存储了usertrap函数的指针，这样trampoline代码才能跳转到这个函数（注，详见6.5中 ld t0 (16)a0 指令）。
   5. 从tp寄存器中读取当前的CPU核编号，并存储在trapframe中，这样trampoline代码才能恢复这个数字，因为用户代码可能会修改这个数字。
7. 此时又回到 trampoline.s 中，执行 userret 完成的了一些细节。调用机器指令返回到用户空间并恢复ECALL之后的用户程序的执行。
   1. 切换page table 。

trampoline page 中包含了内核的trap处理代码。

ecall尽量的简单可以提升软件设计的灵活性。

## 调试

使用 `make fs.img` 编译文件 `user/call.c` 生成 `user/call.asm` 阅读该文件。

`sudo apt-get install tmux` 下载 tmux 。

输入 `$ tmux` 启动。

ctrl +b 方向键 可以调整选中的窗口。例如 ctrl +b ⬆ 会把光标移动到上方的窗格。

一个窗口运行 `make qemu-gdb` 指定一个 CPU 会更好。

在另一个窗口执行：

```cpp
gdb-multiarch kernel/kernel

# (gdb) 进入gdb后执行
set confirm off
set architecture riscv:rv64
set riscv use-compressed-breakpoints yes
target remote localhost:26000 
```

`file user/_call` 调试用户态下的程序。

`b main` 在 main 处打一个断点。

在第一个窗口中执行 call 命令。（没有特殊说明其他命令都是在第二个窗口中执行）

`layout split` 开启更多窗口，提供更多信息。


gdb 常用命令。

```sh
b # 打断点 (e.g.     b main | b *0x30)
c # continue

layout split # view src-code & asm-code

ni # 单步执行汇编(不进函数)
si # 单步执行汇编(有函数则进入函数)
n # 单步执行源码
s # 单步执行源码

p # print
p $a0 # 打印a0寄存器的值
p/x 1536 # 以16进制的格式打印1536
i r a0 # info registers a0
x/i 0x630 # 查看0x630地址处的指令
```

## RISC-V assembly (easy)

1. Which registers contain arguments to functions? For example, which register holds 13 in main's call to printf?

a0 a2-a7 其中 a2 保存 13

2. Where is the call to function f in the assembly code for main? Where is the call to g? (Hint: the compiler may inline functions.)

函数调用已经被内联了。

3. At what address is the function printf located?

0000000000000630

4. What value is in the register ra just after the jalr to printf in main?

经过 jalr 跳转后 ra 的值是 0x38 其中 ra 是 return adddress 的缩写。

跳转之前打印 ra 中的数据

`jalr	1536(ra)` 表示跳转到 ra 寄存器中的值加上 1536 所在地址。
其中 1536 在 16 进制下是 0x600 ，此时 ra 寄存器中的值是 0x30 。所以将会跳转到 0x630 处。
此外 ra 的值将会变为 pc + 4 即 0x38. 也就是 return address 。执行完函数之后通过 ra 返回。

4. Q: Run the following code.

	unsigned int i = 0x00646c72;
	printf("H%x Wo%s", 57616, &i);      

What is the output?
If the RISC-V were instead big-endian what would you set i to in order to yield the same output?
Would you need to change 57616 to a different value?
A: "He110 World"; 0x726c6400; no, 57616 is 110 in hex regardless of endianness.

%X 表示无符号以十六进制表示的整数。%s 表示输出字符串。

其中 57616 在 16 进制下是 E110 。 

其中 72:r 6c:l 64:d 符合 Risc-V 小段的输出，如果是大端的话需要将 i 修改为 0x726c6400 。

5. In the following code, what is going to be printed after 'y='? (note: the answer is not a specific value.) Why does this happen?

	printf("x=%d y=%d", 3);

	$ call
	x=3 y=5221

* [详细代码](https://github.com/weijiew/6.S081-2020/commit/a3894ff5e3b7e9a3e08a0a1ea1697ff3bac9bb87)


## Backtrace (moderate)

建议阅读《程序员的自我修养》第十章。

bttest 将会调用 sys_sleep，在 sys_sleep 中插入 backtrace() 。

在 kernel/defs.h 中添加 backtrace() 并在 kernel/printf.c 中实现。

在 kernel/riscv.h 添加获取 frame pointer 的代码，代码如下：

```c
static inline uint64
r_fp()
{
  uint64 x;
  asm volatile("mv %0, s0" : "=r" (x) );
  return x;
}
```

其中 s0 中存储了 frame pointer 。在 backtrace 中将会调用该函数。

将 backtrace() 加入 panic 中，当跳转到 panic 时将会打印调用函数的信息。

栈指针 sp (stack pointer)。 指向栈的最高处。

栈帧指针 fp (frame pointer)。指向栈帧(stack frame)的最高处。

可以简单的理解为 sp 是当前函数在栈中地址上界，而 fp 则是当前具体执行到那一步了。

fp - 8 表示返回地址， fp - 16 表示上一个 fp 的地址。

fp 保存在寄存器 s0 中，每个函数调用栈

通过循环，不断打印 ra ，通过 pre fp 拿到父函数的地址再打印 ra 即可。

* [详细代码](https://github.com/weijiew/6.S081-2020/commit/102e77e9b3324df1062b8812b578f0d5b95d1a71)

## Alarm (hard)

实现一个进程使用 CPU time 时周期性的发出警告的功能。例如周期性的检查中断/异常需要用到这个功能。

增加一个系统调用 sigalarm(interval, handler)，其中 handler 一个函数，interval 一个整数表示经过的时间。sigalarm 的功能是经过 interval 个 CPU ticks ，调用 handler 函数。如果 sigalarm(0, 0) 内核将会停止周期性调用。

proc 中需要保存 interval ，还需要一个字段表示当前时间 n ，每次调用 n-- 。当 n = 0 时执行函数并更新状态。

如果有 handler 函数正在执行那么就不能执行别的 handler 函数，需要加一个字段判断一下。

最后注意恢复。

    == Test answers-traps.txt == answers-traps.txt: OK 
    == Test backtrace test == 
    $ make qemu-gdb
    backtrace test: OK (12.1s) 
    == Test running alarmtest == 
    $ make qemu-gdb
    (4.5s) 
    == Test   alarmtest: test0 == 
    alarmtest: test0: OK 
    == Test   alarmtest: test1 == 
    alarmtest: test1: OK 
    == Test   alarmtest: test2 == 
    alarmtest: test2: OK 
    == Test usertests == 
    $ make qemu-gdb
    usertests: OK (116.5s) 
    == Test time == 
    time: OK 
    Score: 85/85

* [详细代码](https://github.com/weijiew/6.S081-2020/commit/bddcd70db9d2f61749c8bd58b8100f49217a122d)