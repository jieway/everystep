# Lab 2: Raft

6.824 Lab 2: Raft
Part 2A Due: Feb 21 23:59
Part 2B Due: Feb 28 23:59
Part 2C Due: Mar 6 23:59

阅读：https://pdos.csail.mit.edu/6.824/labs/lab-raft.html

在 `raft/raft.go` 添加代码。

    //创建一个新的Raft服务器实例:
    rf := Make(peers, me, persister, applyCh)

    //开始一个新的日志条目的协议:
    rf.Start(command interface{}) (index, term, isleader)

    //询问一个Raft的当前 term，以及它是否认为自己是leader
    rf.GetState() (term, isLeader)

    //每次提交一个新的记录到日志，每个Raft peer
    //应该向服务(或测试器)发送一个ApplyMsg。
    type ApplyMsg

服务调用Make(peers,me，…)来创建一个Raft对等点。

peers 参数是一个Raft对等体(包括这个)的网络标识符数组，用于RPC。参数me是该对等体在对等体数组中的索引。Start(命令)请求Raft启动处理，将该命令追加到复制的日志中。

Start()应该立即返回，而不需要等待日志追加完成。服务希望实现为每个新提交的日志条目向applyCh通道参数发送一个ApplyMsg给Make()。

raft.go 包含发送一个RPC (sendRequestVote())和处理传入RPC (RequestVote())的示例代码。

Raft 必须使用 RPC 通信不能使用共享变量或文件来进行通信。

## Part 2A: leader election (moderate)

测试 lab 2a 的正确性：`go test -run 2A`

实现 Raft leader 的选举和心跳(AppendEntries没有日志记录的rpc)。

2A部分的目标是选出一个 leader，如果没有故障，leader 将保持 leader，如果旧 leader 故障或旧leader 的数据包丢失，则由新 leader 接管。运行 `go test -run 2A` 来测试你的2A代码。实现本身是难以运行的，必须通过测试器来测试。

按照论文的图2。在这一点上，你关心的是发送和接收RequestVote rpc，与选举相关的服务器规则，以及与状态相关的领袖选举。

在 Raft .go 中为 Raft 结构添加图2中领袖选举的状态。您还需要定义一个结构来保存关于每个日志条目的信息。

填写 RequestVoteArgs 和 requestvoterreply 结构体。修改 Make() 来创建一个后台 goroutine，当它有一段时间没有收到其他peer的消息时，通过发送RequestVote rpc来定期启动leader选举。这样，同伴就会知道谁是领导者，如果已经有了领导者，或者自己成为领导者。实现RequestVote() RPC处理程序，这样服务器就可以互相投票。

