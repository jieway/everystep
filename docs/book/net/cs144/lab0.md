# Lab 0: 网络热身

欢迎来到 CS144：计算机网络简介。在这个热身的实验中，你将会在你的电脑上安装一个 Linux 系统。
学习怎样手动在互联网上执行一些任务，写一个小的 C++ 程序，这个程序可以通过 Internet 来获取网页，
并且实现（在内存中）网络的关键抽象之一：读者和写者之间可靠的字节流。
完成整个热身实验花费的时间大约在 2-6 小时（未来的实验将会花费更多时间）。
做实验之前最好读完整个 lab 的内容。

## 0 合作政策

编程作业必须是自己做的：出了我们已经提供的代码之外，你所上交的编程作业中的所有代码必须是你自己写的。
不允许从 Stackoverflow，Github，或者其他地方复制粘贴。如果你的代码基于互联网或其他部分的实例，
那么在提交源码的时候需要标明地址或出处。

合作：你不可以将代码展示给任何人看而是看看其他人的代码，或者查找前些年的解决方案。
你可以同其他同学讨论作业内容，但是不能复制任何人的代码。如果你和同学讨论作业，提交代码的时候需要将其名字写入其中。
请参考课程行政讲义获取更多的细节，或者如果有什么不清晰的地方在 Piazza 询问。

Piazz：在 Piazz 上可以自由提问，但是不要发布任何源代码。

## 1 安装 GNU/Linux 系统

CS144 作业需要在 GNU/Linux 操作系统上和一个最近的 C++ 编译器，这个编译器支持 C++ 2017 标准。请选择下面三个选项中的其中一个。

1. **推荐**：安装CS144 VirtualBox虚拟机映像。（说明在：https://stanford.edu/class/cs144/vm_howto/vm-howto-image.html）
2. 运行在 Ubuntu 18.04 LTS 上，然后运行我们的脚本。你可以在这样做自己的电脑上，VirtualBox，或者在 EC2 或者其他的虚拟机上。（一个手把手的指导：https://stanford.edu/class/cs144/vm_howto/vm-howto-iso.html） 
3. 使用其他的 GNU/Linux 发行版。但是需要注意这种方式你可能会遇到障碍并且需要调试他们。你的代码必须在 Ubuntu 18.04 LTS 上使用 g++ 8.2.0 编译上通过测试，并且要在下面的条件下正常运行。提示：https://stanford.edu/class/cs144/vm_howto/vm-howto-byo.html 

## 2 手动联网

让我们开始使用网络。您将手动执行两项任务：检索网页（就像Web浏览器一样）并发送电子邮件（例如电子邮件客户端）。
这两项任务都依赖于称为可靠双向有序字节流的网络抽象：您将在终端中键入一个字节序列，
并且最终将以相同的顺序将相同的字节序列传递给另一台计算机（服务器）上运行的程序。
服务器以自己的字节序列进行响应，并返回给终端。

### 2.1 获取一个网页

1. 在一个 Web 浏览器中，访问 http://cs144.keithw.org/hello 并查看结果。

2. 现在你将手动执行和浏览器相同的操作。
  （a）在你的虚拟机中，执行此命令 `telnet cs144.keithw.org http`。这个命令表示自己的计算机和远程的计算机（cs144.keithw.org 所在的服务器）之间建立一个可靠的字节流，并且在电脑上运行特殊的服务：”http“ 服务，全称为 Hyper-Text Transfer Protocol，超文本传输协议，被使用在万维网中。
如果你的电脑设置没有问题，那么将会看到如下内容：

```bash
user@computer:~$ telnet cs144.keithw.org http
Trying 104.196.238.229...
Connected to cs144.keithw.org.
Escape character is '^]'.
```
如果你想退出，按住 ctrl 和 ]，键入 close 即可。 
  （b）
  键入 `GET /hello HTTP/1.1` 这将会告诉服务器的部分路径。（从第三个斜杠开始的部分。例如 http://cs144.keithw.org/hello）
  （c）
  键入 `Host: cs144.keithw.org` 。这将会告诉服务器主机部分的 URL 。
  （d）
  再按一次 Enter 键。告诉服务器已经准备好了 http 请求。
  （e）
  如果所有都做好了，你将会看到你在浏览器中看到的结果。在 HTTP headers 之前会告诉浏览器该怎样翻译得到的结果。

3. 作业：现在你直到了如何手动去访问网页的过程，使用之前的方法来捕获这个页面 http://cs144.keithw.org/lab0/sunetid

### 2.2 给自己发生一个 email

现在你知道了如何获取网页，是时候发送电子邮件了，再次使用到另一台计算机上运行的服务的可靠字节流。

1. 在斯坦福大学网络内部，运行 `telnet smtp-unencrypted.stanford.edu smtp`。（如果您不在斯坦福大学的网络上，请先登录 cardinal.stanford.edu，然后再登录运行这些命令）。smtp 指的是 Simple Mail Transfer Protocol，被用于发送电子邮件。如果一切顺利，你将会看到：

```sh
user@computer:~$ telnet smtp-unencrypted.stanford.edu smtp
Trying 171.64.13.18...
Connected to smtp-unencrypted.stanford.edu.
Escape character is '^]'.
220 smtp-unencrypted.stanford.edu ESMTP Postfix
```

2. 第一步：邮件服务器表示您的电脑。键入 `HELO mycomputer.stanford.edu` 。 等待看到 “250 smtp-unencrypted.stanford.edu” 。

3. 下一步：谁在发送邮件？键入 `MAIL FROM: sunetid @stanford.edu` 将 sunetid 替换为你自己的 SUNet ID 。 如果一切顺利，你将会看到 ”250 2.1.0 Ok“ 。
4. 下一步：谁是接收者？键入 `RCPT TO: sunetid @stanford.edu` 将 sunetid 替换为你自己的 SUNet ID 。 如果一切顺利，你将会看到 ”250 2.1.5 Ok“ 。
5. 现在该上传电子邮件本身了。键入 `DATA` 告诉服务器你打算启动。如果一切顺利，你将会看到 “354 End data with <CR><LF>.<CR><LF>” 。
6. 现在你正在发送一封邮件给自己。首先输入标题您将在电子邮件客户端中看到的内容。在标题的末尾留空行。

```sh
354 End data with <CR><LF>.<CR><LF>
From: sunetid@stanford.edu
To: sunetid@stanford.edu
Subject: Hello from CS144 Lab 0!
```

7. 写入邮件的内容，自己想写的。结束后以点结尾，单独一行。期望看到这样的内容：“250 2.0.0 Ok: queued” 。
8. 键入 `QUIT` 来结束和邮件服务器的交流。检查收件箱和垃圾邮件文件夹来确保已经收到了邮件。
9. 作业：现在你已经知道了如何手动发送一封邮件。使用之上的技术发送一封邮件，从您自己到 cs144grader@gmail.com 。 

### 2.3 监听和连接

您已经了解了可以使用telnet进行的操作：一个建立传出连接到其他计算机上运行的程序的客户端项目。现在是时候尝试做一个简单的服务器：一种等待客户端连接到它的程序。

1. 在一个终端窗口中，在你的虚拟机中运行 `netcat -v -l -p 9090` 。你将会看到如下内容：

```bash
cs144@cs144vm:~$ netcat -v -l -p 9090
Listening on [0.0.0.0] (family 0, port 9090)
```
2. 保持 netcat 运行。再开一个终端，在你的虚拟机上运行 `telnet localhost 9090` 。（在同一台机器上！）
3. 如果一切顺利，再 netcat 终端中你将会看到 `Connection from localhost 59744 received!` 。
4. 现在在任何一个终端的窗口中--（netcat（服务端） 或者 telnet（客户端）中）。请注意，您在一个窗口中键入的任何内容都会出现在另一个窗口中，反之亦然。你必须敲击 enter 才能传输字节。
5. 在 netcat 窗口中，键入 `ctrl-c` 退出程序。注意，telnet 程序也会立即退出。

## 3 使用操作系统的套接字流编写一个网络项目

这个热身实验接下来的部分，你将会写一个短的程序，这个程序可以在互联网上捕获网页。
你将利用 Linux 内核提供的功能，以及大多数其他操作系统的功能：在两个程序之间创建可靠双向字节流。
其中一个程序运行在你的电脑上，例外一个程序运行在另一台计算机中。（例如：像 Apache 或者 nginx 一样的 web 服务器，或者像 netcat 一样的程序）

该功能称为 stream socket。 对于你的程序和 web 服务器而言，socket 看起来像一个普通文件描述符。（类似于磁盘上的文件，stdin/stdout 的 I/O 流）
当两个 socket 建立起连接，任何写入的字节将会从一个 socket 最终都以相同的顺序从另一台计算机上的 socket 中出来。

事实上：互联网并不提供可靠的字节流传输服务。替代的则是，
互联网真正要做的唯一事情就是尽其最大的努力来交付
数据，称为Internet数据报，到他们的目的地。
每个数据报包含了一些元数据（headers），
这些元数据指明了像目的地址和源地址之类的内容，
从哪里来，要到那里去以及一些有效载荷数据（高达 1500 bytes）将会被发送到目的主机中。

尽管互联网进最大努力的交付每一个数据报，
实际上数据报依旧会丢失，（1）
乱序交付，（2）
交付内容发送改变，（3）
甚至复制并多次交付。（4）

### 3.1 捕获并建立启动代码



### 3.2 现代C++：更安全依旧迅速且低级。

### 3.3 阅读 Sponge 文档

### 3.4 写 webget

## 4 一个内存中可信赖的字节流

## 5 提交

