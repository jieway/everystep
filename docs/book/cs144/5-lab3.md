# Lab Checkpoint 3: the TCP sender


## TCPSender 功能

从收发两个角度来看：

发：TCP Sender 将 ByteStream 中的数据以 TCP 报文形式持续发送给接收者。

收：处理 ackno ，window size 。

超时重传：为每个报文设置计时器，超过 RTO 就重传。RTO 随着网络环境变化。如果收到确认，则终止计时器。

