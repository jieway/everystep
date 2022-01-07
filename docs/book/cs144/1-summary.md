# CS144 Fall 2021

> 先记一些思路，和一些踩坑的地方。

[课程主页](https://cs144.github.io/)

## 1. 环境

最开始用的 WSL，但是 lab1 和 lab0 中有几个测试死活过不去，将其中测试网站的 google 改成 baidu 也不行。

后来直接用的官方提供的虚拟机，然后用 vscode 的 remote ssh 远程开发。

    如果打开 virtualbox 出现蓝屏/绿屏，需要关闭 Hyper-v 。

    以管理员方式打开 cmd/Powershell 输出如下，然后重启。

    bcdedit /set hypervisorlaunchtype off

make -j4 表示同时调用 4 个核心来编译，可以多设置几个加快编译速度。

vscode 的 remote ssh 配置如下：

    Host vm
        HostName localhost
        Port 2222
        User cs144

## 调试

* 调试的时候没有停在断点上：

将 `etc/cflags.cmake` 第 18 行修改为如下：

set (CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -ggdb3 -O0")

其实就将编译优化由 -Og 改为 -O0 。
