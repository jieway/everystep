# 0. 环境配置

打开官网: https://www.rust-lang.org/zh-CN/tools/install

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

# 1. A Freestanding Rust Binary

创建新的 cargo 项目,项目名为 everystepos (原文是 blog_os)

```sh
$ cargo new everystepos
     Created binary (application) `everystepos` package
```

eh_personality 语言项是什么?

为什么会编译失败?

# 2. A Minimal Rust Kernel

https://os.phil-opp.com/minimal-rust-kernel/

遇到的第一个坑，最开始看的[中文地址](https://github.com/rustcc/writing-an-os-in-rust/blob/master/02-minimal-rust-kernel.md)但是已经过时，有几个包版本不对，建议直接阅读英文。

第二个坑，我是用 WSL 做的，建议安装 [wslg](https://github.com/microsoft/wslg)，仔细阅读官方文档，运行 qemu 时可以弹出窗口。

电脑启动流程：通电后，ROM 中的**固件**启动，负责加电自检并检测内存是否可用。接下来是寻找可引导的存储介质，然后将介质交给引导程序。如果程序太长就分为两段.

固件分为 BIOS 和 UEFI 两种类型。区别是前者陈旧但简单，后者强大但复杂。

BIOS 启动流程：

1. 加电自检，初始化硬件，寻找可用的存储介质。
2. 将电脑的控制权交给引导程序。如果引导程序大于 512 字节那么就分阶段引导，每一阶段要小于 512 字节。
3. 引导程序将内核加载到内存中。除此之外还将 CPU 从 16 位的实模式切换到 32 位的保护模式，再切换到 64 位的长模式，此时所有的 64 位寄存器和整个主内存才能被访问。
4. 从 BIOS 查询特定的信息，并将其传递到内核；如查询和传递内存映射表。

Multiboot 标准是引导程序的一个标准，GNU GRUB 则是该标准的具体实现，也是最热门的 linux 系统引导程序的实现之一。

因为需要用 nightly 版本下的一些特性，需要安装一下 `rustup override add nightly` 。


## 3. VGA Text Mode


