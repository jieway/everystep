# Lab Checkpoint 3: the TCP sender


## TCPSender 功能

从收发两个角度来看：

发射：TCP Sender 将 ByteStream 中的数据以 TCP 报文形式持续发送给接收者。

接收：处理 ackno ，window size 。

超时重传：为每个报文设置计时器，超过 RTO 就重传。RTO 随着网络环境变化。如果收到确认，则终止计时器。

# 1 Overview

Suggestion: read the whole lab document before implementing.

建议：在实施之前阅读整个实验文件。

In Lab 0, you implemented the abstraction of a flow-controlled byte stream (ByteStream). 

在实验0中，你实现了一个流量控制的字节流（ByteStream）的抽象概念。

In Labs 1 and 2, you implemented the tools that translate from segments carried in unreliable datagrams to an incoming byte stream: the StreamReassembler and TCPReceiver.

在实验室1和2中，你实现了从不可靠的数据报中携带的段翻译成传入的字节流的工具：StreamReassembler 和 TCPReceiver。

Now, in Lab 3, you’ll implement the other side of the connection. 

现在，在实验室3中，你将实现连接的另一端。

The TCPSender is a tool that translates from an outgoing byte stream to segments that will become the payloads of unreliable datagrams. 

TCPSender 是一个工具，它从传出的字节流翻译成段，将成为不可靠数据报的有效载荷。

Finally, in Lab 4, you’ll combine your work from the previous to labs to create a working TCP implementation: a TCPConnection that contains a TCPSender and TCPReceiver. You’ll use this to talk to real servers on the Internet.

最后，在第4个实验中，你将结合前几个实验的工作，创建一个有效的TCP实现：一个包含TCPSender和TCPReceiver的TCPConnection。你将用它来与互联网上的真实服务器对话。

