# MIT 6.828 JOS 2018 环境配置

环境：Ubuntu 20.04

- Windows 建议 WSL2
- MacOS 建议买个云服务器，用 Docker 的话在 M1/M2 上有些指令无法执行。

最初我在 Windows 用 WSL2 写的 Lab1 ，可以直接本地调试。后续的 Lab 是在 MacOS 上，代码使用 Clion 在本地编辑，通过其内置的 SFTP 来同步代码，即每次保存代码会自动同步到云服务器上。在终端里面通过 ssh 链接到服务器上，在里面敲命令的方式来编译运行，调试。

```shell
mkdir ~/6.828 && cd ~/6.828
git clone https://pdos.csail.mit.edu/6.828/2018/jos.git lab
sudo apt-get install -y build-essential gdb gcc-multilib
git clone https://github.com/mit-pdos/6.828-qemu.git qemu
sudo apt-get install libsdl1.2-dev libtool-bin libglib2.0-dev libz-dev libpixman-1-dev
cd qemu
./configure --disable-kvm --disable-werror --target-list="i386-softmmu x86_64-softmmu" --python=/usr/bin/python2.7

make && make install
```

出现如下错误：

```shell
/usr/bin/ld: qga/commands-posix.o: in function `dev_major_minor':
/home/yunwei/qemu/qga/commands-posix.c:633: undefined reference to `major'
/usr/bin/ld: /home/yunwei/qemu/qga/commands-posix.c:634: undefined reference to `minor'
collect2: error: ld returned 1 exit status
```

在 `qga/commands-posix.c` 文件中加上头文件 `#include<sys/sysmacros.h>` 随后重新执行 `make && make install` 。

进入 lab 后执行如下命令报错：

```shell
$ make
+ ld obj/kern/kernel
ld: warning: section `.bss' type changed to PROGBITS
ld: obj/kern/printfmt.o: in function `printnum':
lib/printfmt.c:41: undefined reference to `__udivdi3'
ld: lib/printfmt.c:49: undefined reference to `__umoddi3'
make: *** [kern/Makefrag:71: obj/kern/kernel] Error 1
```

解决方案是安装 4.8 的 gcc ，但是报错，原因是这个包没有在这个源中。

```shell
$ sudo apt-get install -y gcc-4.8-multilib
Reading package lists... Done
Building dependency tree
Reading state information... Done
E: Unable to locate package gcc-4.8-multilib
E: Couldn't find any package by glob 'gcc-4.8-multilib'
E: Couldn't find any package by regex 'gcc-4.8-multilib'
```

经过一番折腾，看到了这篇[文章](https://blog.csdn.net/feinifi/article/details/121793945)。简单来说就是这个包在 Ubuntu16.04 下可以正常下载，那么增加这个包的源即可。在 `/etc/apt/sources.list` 中添加如下内容：

```shell
deb http://dk.archive.ubuntu.com/ubuntu/ xenial main
deb http://dk.archive.ubuntu.com/ubuntu/ xenial universe
```

切记，需要更新，然后再次启动 qemu 依旧报错

```shell
$ sudo apt-get update
$ make
+ ld obj/kern/kernel
ld: warning: section `.bss' type changed to PROGBITS
ld: obj/kern/printfmt.o: in function `printnum':
lib/printfmt.c:41: undefined reference to `__udivdi3'
ld: lib/printfmt.c:49: undefined reference to `__umoddi3'
make: *** [kern/Makefrag:71: obj/kern/kernel] Error 1
```

经过分析，发现 gcc 版本没有修改

```shell
$ gcc --version
gcc (Ubuntu 8.4.0-3ubuntu2) 8.4.0
Copyright (C) 2018 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

于是将 gcc 版本改为 4.8 。删除原来的软连接，增加指向 4.8 版本的 软连接。查看版本更新成功。

```shell
$ sudo rm /usr/bin/gcc
$ sudo ln -s /usr/bin/gcc-4.8 /usr/bin/gcc
$ gcc --version
gcc (Ubuntu 4.8.5-4ubuntu2) 4.8.5
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

再次编译，没有问题了！

```shell
$ cd lab
$ make
+ ld obj/kern/kernel
ld: warning: section `.bss' type changed to PROGBITS
+ as boot/boot.S
+ cc -Os boot/main.c
+ ld boot/boot
boot block is 380 bytes (max 510)
+ mk obj/kern/kernel.img
```

启动 qemu

```shell
$ sudo make qemu
```

至此，环境配置完成，接下来继续阅读 lab1 ：https://pdos.csail.mit.edu/6.828/2018/labs/lab1/

使用 `make grade` 来测试。

```python
make grade
make clean
make[1]: Entering directory '/root/6.828/lab'
rm -rf obj .gdbinit jos.in qemu.log
make[1]: Leaving directory '/root/6.828/lab'
./grade-lab1
/usr/bin/env: ‘python’: No such file or directory
make: *** [GNUmakefile:202: grade] Error 127
```

下面的命令可以解决上面的报错：

```shell
update-alternatives --install /usr/bin/python python /usr/bin/python3 200
```
