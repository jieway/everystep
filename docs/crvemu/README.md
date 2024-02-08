# 使用 C++23 从零实现 RISC-V 模拟器

使用 C++23 从零实现的 RISC-V 模拟器，最终的模拟器可以运行 [xv6](https://pdos.csail.mit.edu/6.828/2012/xv6.html) 操作系统。

- 教程: [everystep](https://github.com/weijiew/everystep)
- 代码: [crvemu](https://github.com/weijiew/crvemu)

本教程参考了 [Asami](https://github.com/d0iasm) 所写的 Rust 版本的模拟器[教程](https://book.rvemu.app/) ，但是原版只写了前三章。此外也参考了 [Rare](https://github.com/siriusdemon/Rare) 对 rvemu 的改进 [Rare](https://siriusdemon.github.io/Rare/) 这也是一个 Rust 版本的并且已经完结了，对 rust 版本感兴趣的可以参考上面所给出对应的链接。

接下来我将会用 C++ 23 来实现，原则是即能用上的新特性全部都用上。以循序渐进的方式，最终实现一个可以运行 [xv6](https://pdos.csail.mit.edu/6.828/2012/xv6.html) 操作系统的 RISC-V 模拟器。此外重新组织了实现方式，一定程度上降低了难度梯度。

### 前置知识

假设读者学过 C 语言并且了解一点 C++ 的基本概念，即 C with class 水平即可。

对于 RISC-V 方面的知识可以参考下面的内容：

- [RISC-V Specifications](https://riscv.org/technical/specifications/)
- [RISC-V Reader](https://zh.webbooksnow.art/dl/16429281/d4417e)
- [手把手教你设计 RISC-V 处理器](https://zh.webbooksnow.art/book/18067855/bd7a8a)

### 开发环境

- Linux / Win(WSL) / MacOS

使用 docker 开发，其内部包含了一个 Ubuntu 20.04，其中用到了 `riscv64-unknown-elf-gcc`， 也可以用 clang 来编译。

lab0-start-code 分支是一个包含了 gtest 的启动代码。项目名称为 crvemu ，即 C++ RISC-V emulate 的缩写。

```sh
git clone --recurse-submodules https://github.com/weijiew/crvemu/tree/lab0-start-code
cd crvemu && mkdir -p build && cd build
cmake .. && make -j $(nproc)
./crvemu
# Hello, World!
```

验证 gtest ：

```sh
cmake .. && make -j $(nproc) && ./g_test
```

### 问题

如有任何问题，可以随时提 [crvemu issue](https://github.com/weijiew/crvemu/issue)。
