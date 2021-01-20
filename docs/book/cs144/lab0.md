## lab0： 网络热身

简介：使用 C++ 写一个获取网页的程序，这个程序可以实现网络关键的抽象（内存中），大概消耗 2 - 6 小时。后续的实验要在前置 lab 的基础上。

* 先浏览整个实验。
* 实验与实验直接是存在联系的，不建议跳，跳的话可能写不下去。
* lab 不是完美的，可能存在问题。

## 0 协作政策

* 除了课程提供的部分辅助代码外，其他代码必须是自己完成的，不允许 copy 。如果你参考了网上的代码，提交代码之时需要将链接作为注释写在源代码上。
* 自己不能看别人的代码，自己的代码也不能展示给别人，不允许看往届的答案。可以和同学讨论作业，但是不能 copy 任何人的代码。如果和同学讨论了，在提交代码之时需要将同谁讨论作业的同学名字作为注释写在相关的代码部分。handout 中有更多的细节。

## 1 系统安装 

CS144 的作业需要在 GNU/Linux 系统之上进行并且要有 C++ 2017 版本的编译器。

安装 Linux 系统，官方提供的三种安装方式，分别是安装官方提供的镜像，其次是自己安装 Ubuntu 18.04 LTS 版本然后运行网站中所提供的工具安装脚本，最后是自己摸索。

我选择的是第一种，也就是下载官方所提供的镜像。也就是按照这一页的内容来：https://stanford.edu/class/cs144/vm_howto/vm-howto-image.html

注意：Windows 系统的话需要先下载虚拟机（VirtualBox），页面中有写到，按照步骤来就可以了。

可以直接默认，也可以根据你的电脑配置来修改。

我将内存（RAM）改为了 4G 。CPU 核心数改为了 2 。

![image-1](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.6dmk7hpxcmo0.png)

首次登陆会强制修改密码，用户名和密码均为 **cs144** 。

登陆进去后默认是文本中断，如果想要图形界面需要以下命令：

安装图形界面：`sudo apt-get install --reinstall lightdm`

启动图形界面：`sudo systemctl start lightdm`

终端访问：我的系统本身是 win10 ，采用的终端是 WSL ，访问命令：`ssh -p 2222 cs144@localhost` 。（这一步可以不选，我觉得用 WSL 访问比较便捷，windows 下你可以采用 XShell 或 Putty 等终端）

该系统其实就是 Ubuntu 18.04 LTS

![image-2](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.41e5ycv81yy0.png)

记得换源！

## 2.0 手动联网

有两个任务，像浏览器一样读取网页，其次像邮件客户端一样发送一个邮件消息。

以上的两个任务都依赖可靠双向字节流的网络抽象。可靠双向字节流指在本地中断中输入一串消息，该消息一相同的顺序发送给另一台计算机，另一台计算机收到该消息后会回复一条消息表示收到。

### 2.1 捕获一个网页

1. 这一节内容是告诉我们如何在浏览器中看到网页访问所得到的信息。

首先在浏览器中查看 http://cs144.keithw.org/hello 可以看到 `Hello, CS144!` 。


2. 那么在终端中，按照文中所给步骤也是可以看到该内容的。

![image-3](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.5070rpwtdig0.png)


3. 修改 GET 请求的路径即可，改成自己的 ID 能拿到属于自己的 X-Your-Code-Is 。

![image-4](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.70o0sngyzc40.png)


### 2.2 给自己发邮件

这个需要处于 stanford 的网络才能做，跳过了。

### 2.3 监听和连接

要分别开两个终端，分别代表服务端和客户端。

`netcat -v -l -p 9090` 表示监听 9090 端口，当作服务端，一旦受到消息就显示出来。

`telnet localhost 9090` 表示访问 9090 端口，当作客户端，在其中输入内容会在服务端中显示出来。

服务端和客户端都可实现交互，注意是在一个虚拟机中。

## 3.0 使用系统套接字编写程序

