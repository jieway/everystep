# Lab Checkpoint 2: the TCP receiver

数据通过 TCPReceiver 流向 StreamReassembler，然后是 ByteStream 最终到应用程序中。

前两个实验已经实现了 StreamReassembler, ByteStream 这个实验主要实现 TCPReceiver 。

除了传送数据之外 TCPReceiver 还负责两件事情：

1. 需要发给接收方第一个未重组的字节索引，也就是 ackno (acknowledgment number) 。
2. 第一个未重组和第一个未接收索引之间的距离，也就是接收窗口 (window size) 。通过接收窗口可以实现流量控制。

其实就是由三部分组成：重组 + 未重组 + 未接收 ，接收窗口也就是未重组的部分。

重组数据在 lab1 中已经完成，接下来要考虑的是如何表示每一个 byte 在字节流中的位置。也就是 sequence number 。

合并代码 `git merge origin/lab2-startercode`

# Translating between 64-bit indexes and 32-bit seqnos

index 不是 64 而是 32 位。

> 一旦一个 一旦一个32位的序列号数到 2^32 - 1，数据流中的下一个字节的序列号将是0。序列号为零。

tcp 的 seq 以一个随机值开始。也就是 Initial Sequence Number (ISN) 这是代表SYN（流的开始）的序列号。第一个字节是 ISN + 1 ，第二个字节是 ISN + 2 ，等等。

SYN 表示字节流开始，FIN 表示字节流终止。都占一个序号。SYN / FIN 用来表示开始和结束，不是数据报本身！

wrap 实现了 absolute seqno 到 seqno 的转换，unwrap 则是反过来。

WrappingInt32 wrap(uint64_t n, WrappingInt32 isn) { return isn + uint32_t(n); }

window_size 其实就是未重组的字节数。

`size_t TCPReceiver::window_size() const { return _capacity - _reassembler.stream_out().buffer_size(); }`
  