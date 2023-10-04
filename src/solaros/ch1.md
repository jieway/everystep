# Part 1 : 打印 Hello World！


## 3. 执行内核

内核需要用到 qemu 、程序内存布局、

### 3.1 Qemu 启动流程分析

对于 CPU 而言，整个内存可以抽象为一个字节数组，以字节（8bit）为单位。而 CPU 是从 `0x80000000` 开始读取内核，以字节为单位读取内存中的数据，并非从零地址开始。

CPU 可以同时读取多个字节的数据，这就产生了顺序问题，即大小端。用 qemu 来模拟一台 64 位 RISC-V 架构的计算机，它包含CPU 、物理内存以及若干 I/O 外设。

qemu 启动流程：

1. 在 qemu 内部执行若干指令跳转到 `0x80000000` 处，这个地址在 qemu 内部写死了。
2. `0x80000000` 处存放 bootloader 的 rustsbi-qemu.bin，执行此程序，
3. 跳转到 `0x80200000` 执行 `abyssos.bin` 程序，跳转到此处控制权已经交给内核了。

### 3.2 程序的内存布局

程序的内部布局即代码编译后在内存中的存放方式，主要分为**代码**和**数据**两部分。

1. 代码部分只有一个代码段 .text ，其中存放了汇编代码。
2. 数据部分包含堆、栈、未初始化数据和已初始化数据四部分。
   1. 堆（heap）用来存动态分配的内存。例如 c 中 malloc/new ，从低地址向上增长。
   2. 栈（stack）用来存函数上下文，局部变量、编译期就能确定大小的变量。从高地址向下生长。
   3. 未初始化数据段（.bss）用来保存程序中未初始化的全局数据，通常需要手动逐字节置零。
   4. 已初始化数据段保存程序中那些已初始化的全局数据，分为 .rodata 和 .data 两部分。
      1. .rodata 存放只读的全局数据，例如常数、常量字符串等。
      2. .data 而后者存放可修改的全局数据。

### 3.3 编译流程

代码通过**编译器**生成汇编代码，通过**汇编器**将汇编代码转为机器码，**链接器**将机器码链接为一个完整的可执行文件。

链接器具体流程：
1. 重整 .o 文件，根据内存布局归并为一个。
2. 将符号替换为具体地址。

### 3.4 在 Qemu 上运行的内核镜像

1. 通过链接脚本调整内核可执行文件的内存布局确保内核被执行的第一条指令位于地址 0x80200000 处。
2. 代码段所在的地址应低于其他段，Qemu 物理内存中低于 0x80200000 的区域并未分配给内核，而是主要由 RustSBI 使用。
3. 将内核可执行文件中的元数据丢掉得到内核镜像，内核镜像仅包含实际会用到的代码和数据。因为 Qemu 的加载功能过于简单直接，它直接将输入的文件逐字节拷贝到物理内存中。

下一节我们将成功生成内核镜像并在 Qemu 上验证控制权被转移到内核。


## 4. 编写内核指令

在文件 `os/src/entry.asm` 中编写进入内核后的指令。

在文件 `os/src/main.rs` 中嵌入之前写的汇编代码。

在文件 `os/.cargo/config` 添加链接器名称，在 `os/src/linker.ld` 写入具体规则，用于调整内核布局。

生成内核文件并查看：

    root:/mnt/abyssos# cargo build --release
    Compiling abyssos v0.1.0 (/mnt/abyssos)
        Finished release [optimized] target(s) in 0.41s
    root:/mnt/abyssos# file target/riscv64gc-unknown-none-elf/release/abyssos
    target/riscv64gc-unknown-none-elf/release/abyssos: ELF 64-bit LSB executable, UCB RISC-V, version 1 (SYSV), statically linked, not stripped

当前的文件还有一些问题，存在一些元数据无法被 qemu 加载到利用且会被放在错误位置。使用如下命令丢弃内核可执行文件中的元数据得到内核镜像：

    rust-objcopy --strip-all target/riscv64gc-unknown-none-elf/release/abyssos -O binary target/riscv64gc-unknown-none-elf/release/abyssos.bin

使用 stat 工具来比较内核可执行文件和内核镜像的大小：

    root:/mnt/abyssos# stat target/riscv64gc-unknown-none-elf/release/abyssos
    File: target/riscv64gc-unknown-none-elf/release/abyssos
    Size: 5248            Blocks: 16         IO Block: 4096   regular file
    Device: 820h/2080d      Inode: 998212      Links: 2
    Access: (0755/-rwxr-xr-x)  Uid: (    0/    root)   Gid: (    0/    root)
    Access: 2023-02-18 15:08:32.673110665 +0000
    Modify: 2023-02-18 15:08:11.572988709 +0000
    Change: 2023-02-18 15:08:11.582988768 +0000
    Birth: -
    root:/mnt/abyssos# stat target/riscv64gc-unknown-none-elf/release/abyssos.bin
    File: target/riscv64gc-unknown-none-elf/release/abyssos.bin
    Size: 4               Blocks: 8          IO Block: 4096   regular file
    Device: 820h/2080d      Inode: 232713      Links: 1
    Access: (0755/-rwxr-xr-x)  Uid: (    0/    root)   Gid: (    0/    root)
    Access: 2023-02-18 15:12:13.893914294 +0000
    Modify: 2023-02-18 15:12:13.893914294 +0000
    Change: 2023-02-18 15:12:13.893914294 +0000
    Birth: -    

基于 GDB 验证启动流程

通过以下命令启动 Qemu 并加载 RustSBI 和内核镜像：    

    qemu-system-riscv64 \
        -machine virt \
        -nographic \
        -bios ../bootloader/rustsbi-qemu.bin \
        -device loader,file=target/riscv64gc-unknown-none-elf/release/abyssos.bin,addr=0x80200000 \
        -s -S    

打开另一个终端，启动一个 GDB 客户端连接到 Qemu ：

    riscv64-unknown-elf-gdb \
        -ex 'file target/riscv64gc-unknown-none-elf/release/abyssos' \
        -ex 'set arch riscv:rv64' \
        -ex 'target remote localhost:1234'

Qemu 启动后 PC 被初始化为 0x1000 。可以检查一下 Qemu 的启动固件的内容：

## 5. 为内核支持函数调用

编写汇编代码，将控制权交给 Rust 编写的内核入口函数。

在 entry.asm 还要做一些初始工作，主要实现下面三步：

1. 设置栈空间，来在内核内使能函数调用。
2. 调用使用 Rust 编写的内核入口函数。
3. 控制权交给 Rust 代码。

- 函数调用与栈

对于循环或者条件判断来说，跳转前后的位置在编译期都能确定，可以直接以汇编的形式呈现。但函数调用不行，因为不同函数调用不同一个函数的返回地址是不同的，需要在**运行时**才能确定，即当函数调用发生的那一刻才能确定。

在汇编中一般使用 jal/jalr 实现上述功能，即跳转之前将返回地址保存在寄存器中。但是如果嵌套使用会出现新的问题，即 a 调用 b ，b 调用 c 是会将 a 的返回信息给覆盖掉。

为了避免函数返回信息因为多次嵌套被覆盖，需要将这些信息保存到内存中。即在调用子函数之前，将寄存器中的值保存到内存中，当恢复时从物理内存中恢复寄存器的值即可。

根据谁来保存寄存器中的值可以将其分为两类，即调用者保存的是 Caller-Saved ，而被调者这保存的是 Callee-Saved 。

为什么这样分类？以 sp 寄存器为例，属于被调用者保存，如果作为调用者保存那么调用者就有可能将其修改掉从而导致程序出错。

- 调用规范

调用规范是指函数调用之间的约定，规则，即下述三个方面。

1. 函数的输入参数和返回值如何传递；
2. 函数调用上下文中调用者/被调用者保存寄存器的划分；
3. 其他的在函数调用流程中对于寄存器的使用方法。

此前函数调用时需要保存的信息实际上是保存在栈中。sp 寄存器保存了栈指针，始终指向栈顶。当创建一个函数时， sp 需要减去一个值从而为该函数申请栈空间，用来存放一些信息，这块内存被称为**栈帧**（Stack Frame）。sp 通过增加一个值的方式从而实现回收空间。sp 是一个被调用者保存的寄存器。

## 6. 基于 SBI 服务完成输出和关机

RustSBI 不仅仅在计算机启动时负责环境初始化，此外还要在内核运行时响应内核的请求并为内核提供服务。

内核和 RustSBI 交互的方式类似函数调用，但和函数调用不同。

在子模块 sbi 中实现内核与 RustSBI 通信的相关功能。内核通过调用 sbi_call 同 RustSBI 进行交互。

在 sbi.rs 中定义 RustSBI 支持的服务类型常量。

- 实现格式化输出

结构体 Stdout 不包含任何字段，因此它被称为类单元结构体（Unit-like structs）

Unit-like struct 在 Rust 中有很多用途，例如作为标记或者占位符，或者用作枚举的变体。在某些情况下，它们也可以用作数据类型的占位符，以便在将来可以向结构体添加其他成员变量。

另外，需要注意的是，Unit-like struct 的实例不会占用任何内存空间，因为它们没有任何成员变量，只是一个类型声明。

- 处理致命错误

此前 panic 的处理是一个死循环，接下来完善这个功能。在 panic 函数中打印错误信息并关机。

创建一个 Makefile 文件，输入下述内容，然后执行 `make run` 运行程序。

    run:
        cargo build --release
        rust-objcopy --strip-all target/riscv64gc-unknown-none-elf/release/abyssos -O binary target/riscv64gc-unknown-none-elf/release/abyssos.bin
        qemu-system-riscv64 \
            -machine virt \
            -nographic \
            -bios ../bootloader/rustsbi-qemu.bin \
            -device loader,file=target/riscv64gc-unknown-none-elf/release/abyssos.bin,addr=0x80200000 \

此时已经能够实现一个最小化的内核。