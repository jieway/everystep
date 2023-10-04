# SolarOS

一步一步写 OS 。

## 环境配置

参考这个链接：https://pdos.csail.mit.edu/6.S081/2023/tools.html

### MacOS

1. 安装 xcode、homebrew

```sh
$ xcode-select --install
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. 安装 RISC-V compiler toolchain （耗时略长）

```sh
$ brew tap riscv/riscv
$ brew install riscv-tools
```
3. 安装 qemu

```sh
brew install qemu
```
4. 验证是否安装成功

```sh
~/Documents/everystep (master*) » riscv64-unknown-elf-gcc --version
riscv64-unknown-elf-gcc (g2ee5e430018-dirty) 12.2.0
Copyright (C) 2022 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

~/Documents/everystep (master*) »  riscv64-unknown-elf-gcc --version
riscv64-unknown-elf-gcc (g2ee5e430018-dirty) 12.2.0
Copyright (C) 2022 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

上面是我安装时候的最新版本，后续的教程可以保证这个版本没问题，其他版本有问题了再说。😤