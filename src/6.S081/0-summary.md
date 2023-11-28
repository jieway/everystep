# 6.S081 Operation System 2020

schedule 页面：https://pdos.csail.mit.edu/6.828/2020/schedule.html

* [视频中文翻译](https://www.bilibili.com/video/BV19k4y1C7kA)
* [视频中文文字版](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/)
* [lab 文档的中文翻译](https://github.com/duguosheng/6.S081-All-in-one)

# 环境配置 Tools

我采用的是虚拟机，宿主机是 win10 ，虚拟机采用的是 VMware 。

首先安装 Ubuntu20.04 ，注意建议不要安装别的版本，这个版本省事，因为有一些特定的包在这个版本上，而其他版本上需要重新编译。

接下来就说配置环境，参照信息均来源于此页面： https://pdos.csail.mit.edu/6.828/2020/tools.html 。

## 1. 安装包

安装 `sudo apt-get install git build-essential gdb-multiarch qemu-system-misc gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu` 

该版本的包存在一个问题 `sudo apt-get remove qemu-system-misc` 需要卸载安装指定版本。

安装指定版本 `sudo apt-get install qemu-system-misc=1:4.2-3ubuntu6` 。

## 2. 测试环境是否配置成功

据此命令 `riscv64-unknown-elf-gcc --version` 出现如下内容：

    @ubuntu:~$ riscv64-unknown-elf-gcc --version

    Command 'riscv64-unknown-elf-gcc' not found, but can be installed with:

    sudo apt install gcc-riscv64-unknown-elf

意思是缺少该包，按照提示安装即可：`sudo apt install gcc-riscv64-unknown-elf`

安装后输入下面的两条命令判断 `riscv64-unknown-elf-gcc --version`

    @ubuntu:~$ riscv64-unknown-elf-gcc --version
    riscv64-unknown-elf-gcc () 9.3.0
    Copyright (C) 2019 Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.  There is NO
    warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

`qemu-system-riscv64 --version`

    @ubuntu:~$ qemu-system-riscv64 --version
    QEMU emulator version 4.2.0 (Debian 1:4.2-3ubuntu6)
    Copyright (c) 2003-2019 Fabrice Bellard and the QEMU Project developers

到此处本实验其实已经结束了。

## 最后

下面的内容其实是下一个实验的，当然来本实验的最后其实也提到了。目的是将 xv6 的代码拉取下来看能否编译成功，据此判断环境是否搭建成功。

我将代码放到了共享文件夹中，关于共享文件夹的设置方法可以参照[此处](https://zhuanlan.zhihu.com/p/42203768)。

下载 xv6 代码并编译判断

    git clone git://g.csail.mit.edu/xv6-labs-2020
    cd xv6-labs-2020
    git checkout util

然后输入 `sudo make qemu` 编译代码。

当出现 xv6 kernel is booting 表示着源码编译搭建成功。

进入 qemu 后可以输入一些命令来查看，例如 `ls` 等。

退出 qemu ： 先输入 ctrl + a 抬起后再输入 x 。

## 注意

* 全局搜索很方便，不用挨个翻文件查找。

VSCode 全局搜索快捷键 ctrl + p 加上 `# 加内容`。

![20220318135133](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318135133.png)

* 如果出现 make grade 时出现 `/usr/bin/env: ‘python3\r’: No such file or directory` 

用 vim 打开测试文件输入如下内容：

:set  ff=unix 
:wq

* 如果想从头再来，可以回退到上一个版本重新开始(`git reset --hard HEAD^`) 。

或者删除分支，



# 参考

[0. WSL 安装](https://blog.csdn.net/z2876563/article/details/117023126)
[1. MIT 6.S081: Lab 0 搭建环境](https://zhuanlan.zhihu.com/p/343655412)
[2. qemu 的退出方法](https://blog.csdn.net/zsj1126/article/details/104054913)

## 参考

1. [MIT6.S081 Operating System Engineering 课程总结 & Lab 指北](https://blog.miigon.net/posts/s081-ending/)