# Lab 2: Raft

6.824 Lab 2: Raft
Part 2A Due: Feb 21 23:59
Part 2B Due: Feb 28 23:59
Part 2C Due: Mar 6 23:59

阅读：https://pdos.csail.mit.edu/6.824/labs/lab-raft.html

在这个 lab 中将会实现 raft 协议，而下一个 lab 在此基础上将会实现一个 KV service 。

Raft 将客户端的请求组织成了一个序列，也就是日志进而确保所有的副本都拥有同样的日志。

如果一个服务器发生故障但后来恢复了，Raft会负责将其日志更新。只要至少有大多数的服务器还活着，并且能够相互交谈，Raft就会继续运行。如果没有这样的多数，Raft将不会取得任何进展，但一旦多数服务器能够再次通信，Raft将重新开始工作。


