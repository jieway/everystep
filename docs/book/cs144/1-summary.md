# CS144 Fall 2021

[课程主页](https://cs144.github.io/)

我是直接用的官方提供的虚拟机，然后用 vscode 的 remote ssh 远程开发。

    如果打开 virtualbox 出现蓝屏/绿屏，需要关闭 Hyper-v 。

    以管理员方式打开 cmd/Powershell 输出如下，然后重启。

    bcdedit /set hypervisorlaunchtype off

make -j4 表示同时调用 4 个核心来编译，可以多设置几个加快编译速度。