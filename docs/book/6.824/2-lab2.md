# Lab 2: Raft 总结

1. 阅读实验手册：https://pdos.csail.mit.edu/6.824/labs/lab-raft.html
2. 阅读：[Lecture 06 - Raft1](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/lecture-06-raft1)
3. 阅读：[Raft一致性算法论文](https://github.com/maemual/raft-zh_cn/blob/master/raft-zh_cn.md)
4. 

## Part 2A: leader election (moderate)

这部分是实现领导者**选举**和**心跳**。使用 `go test -run 2A` 来检测这部分代码的正确性。

直接运行的话会出现如下内容。因为没有实现相应功能，所以会失败。

    $ go test -run 2A
    Test (2A): initial election ...
    --- FAIL: TestInitialElection2A (5.00s)
        config.go:460: expected one leader, got none
    Test (2A): election after network failure ...
    --- FAIL: TestReElection2A (5.11s)
        config.go:460: expected one leader, got none
    Test (2A): multiple elections ...
    --- FAIL: TestManyElections2A (5.02s)
        config.go:460: expected one leader, got none
    FAIL
    exit status 1
    FAIL    6.824/raft      15.126s


此外还要关注，如何收发 RequestVote RPCs ，与选举有关的规则，以及与领导选举有关的状态。

1. 在`raft.go`中的Raft结构中添加图2中领导者选举的状态。

* 当前节点的状态(Follower/Candidate/Leader)
* 服务器已知最新的任期（在服务器首次启动时初始化为0，单调递增）
* 当前任期内收到选票的 candidateId，如果没有投给任何候选人则为空。
* 存放日志。
* 上次收到心跳的时间。 
* 下次选举超时的时间。

节点的状态分为三种类型：Follower，Candidate，Leader 。下面是三种状态需要负责的事情。

* Leader：处理客户端请求，复制请求到其他服务器上，并告诉什么其他服务器什么时候能用。
  * 接收来自客户端的请求，将日志附加到本地日志中，日志应用到状态机后响应客户端。
  * 向其他的所有服务器发送 AppendEntries 附加日志，防止 Follower 超时。
  * 如果 Follower 发送来的 log entries 索引值大于等于 nextIndex (lastLogIndex ≥ nextIndex)。
    * 如果成功：更新相应跟随者的 nextIndex 和 matchIndex 。
    * 如果因为日志不一致而失败，则 nextIndex 递减并重试。
  * 假设存在 N 满足N > commitIndex，使得大多数的 matchIndex[i] ≥ N以及log[N].term == currentTerm 成立，则令 commitIndex = N（5.3 和 5.4 节）

* Follower：处理 Leader 和 Candidate 发来的请求。如果在规定时间内没有收到当前 Leader 发来的心跳则自动转为 Candidate 。

* Candidate：选举，如果超时则重新选举，成为 Leader 或成为 Follower 。
  * 从 Leader 变为 Candidate 后立刻开始选举过程（自增当前任期号，投给自己，重置选取超时器，向其他服务器发送请求投票的 RPC）。
  * 拿到超半数的投票后则变为 Leader 。
  * 收到来自 Leader 的 AppendEntries 日志的 RPC 请求后成为 Follower 。
  * 选举超时，重新投票。


Figure 2 中有介绍，由三部分组成，分别是状态机的命令和领导人接收到该条目时的任期（初始索引为1），此外还有当前日志的下标 index 。 


2. 日志结构体如何定义？

包含三个信息：收到该 log 的任期，当前日志的索引，需要执行的命令。

命令如何表示？参考已经定义的方法 `Start(command interface{})`，用 Interfaces 表示。

3. 实现 RequestVoteArgs 和 RequestVoteReply 结构。

* RequestVoteArgs，RequestVoteReply 是用来干什么的？

投票的时候需要用到，通过 RequestVoteArgs 构造出一张选票发送出去。RequestVoteReply 则用来接收信息，所以需要“传引用”。

* 投票的时候需要提供什么信息？

需要提供当前的任期 term 和提供这张票人的 id ，也就是 raft 节点自己。

* 需要返回什么样的信息？

是否投给自己 voteGranted 以及当前的任期号 term 。

4. 修改 `Make()` 以创建一个后台goroutine，当它有一段时间没有收到另一个对等体的消息时，它将通过发送RequestVote RPCs定期启动领导者选举。这样，如果已经有了一个领导者，对等体将了解谁是领导者，或者自己成为领导者。实现 RequestVote() RPC 处理程序，这样服务器就可以互相投票了。

大致流程是首先**初始化超时时间**，然后进行**选举**，最后发送**心跳包**维持自己的地位。

Make() 输入参数含义：其中 peers[] 存储了所有的 Raft server ，当然也包括自己 peers[me] 。这也是第三个参数 me 的含义。peers[] 中有固定的顺序。第四个参数 persister 用于持久化。第五个参数 applyCh 是一个 channel ，Raft 向其中发送 ApplyMsg。

* 如何初始化超时时间？

超时时间使用一个随机数来生成一个固定区间(例如 150-300 毫秒)内的值，用当前时间作为随机种子。

随机数确保了不同对等体的选举超时不会总是在同一时间发生，否则所有对等体将只为自己投票，没有人会成为领导者。

论文的第5.2节提到选举超时的范围是150到300毫秒。只有当领导者发送心跳的频率大大超过每150毫秒一次时，这样的范围才有意义。因为测试者把你限制在每秒10次心跳，所以你必须使用比文件中的150到300毫秒更大的选举超时，但不能太大，因为那样你可能无法在5秒内选出一个领导者。

* 如何进行选举？

首先判断是否已经 killed ？ killed 用来判断是否已经调用 kill 终止整个程序了。

接下来判断是否已经是 Leader ？如果是就终止，不再执行。

然后确保真的超时了，当前时间减去上次收到心跳包的时间大于超时时间上限。

然后进行选举，首先重置状态，例如重置超时时间，任期加一，变为 Candidate ，给自己投票。

然后构造选票结构体，发给剩余的所有对等体。然后分析返回的信息。如果回复的任期大于当前任期，那么立刻转为 Follower 并重置当前任期。如果投给自己那么投票数累加，再判断票数是否过半，若过半则成为 Leader 。最后向所有节点广播并发送心跳包。

对等体如何处理投票的请求？也就是 RequestVote 的实现。

首先将当前节点的任期更新到返回值中。然后判断输入参数的任期是否小于当前节点的任期，若小于则不投，若大于当前节点转为 Follower ，若等于接下来判断当前节点是否已经投票了，没有的话再去投票。

* 如何实现心跳。

为了维持 Leader 的地位，需要在超时时间内向所有节点发送心跳包。

首先判断是否已经调用 kill，然后判断当前节点是否是 Leader 若是则进行广播心跳包。

广播心跳包的实现方式，首先初始化 AppendEntriesArgs 结构体，然后遍历所有对等体，将其发送出去。若根据返回参数判断出对方的任期大于当前节点的任期那么立刻转为 Follower 。

测试者要求领导者每秒发送心跳RPC的次数不超过10次。执行一次 RPC 沉睡一会，例如沉睡 0.2s 。

然而，请记住，如果出现分裂投票，领袖选举可能需要多轮投票（如果数据包丢失或候选人不走运地选择相同的随机退避时间，就会发生这种情况）。你必须选择足够短的选举超时（以及心跳间隔），即使需要多轮选举，也很可能在5秒内完成。


5. 其他

不要忘记实现 GetState()。返回当前任期并判断是否是 Leader 。

测试员在永久关闭一个实例时，会调用你的Raft的rf.Kill()。您可以使用rf.killed()检查Kill()是否被调用。您可能希望在所有的循环中都这样做，以避免死亡的Raft实例打印混乱的信息。

Go RPC只发送名称以大写字母开头的结构字段。子结构也必须有大写的字段名（例如，数组中的日志记录字段）。labgob包会对此发出警告；不要忽视这些警告。

在提交第2A部分之前，请确保你通过了2A测试，这样你就会看到这样的内容。

    $ go test -run 2A
    Test (2A): initial election ...
    ... Passed --   3.5  3   58   16840    0
    Test (2A): election after network failure ...
    ... Passed --   5.4  3  118   25269    0
    Test (2A): multiple elections ...
    ... Passed --   7.3  7  624  138014    0
    PASS
    ok  	6.824/raft	16.265s
    $

每一行 "通过 "包含五个数字；它们是测试所花的时间（秒）、Raft对等体的数量、测试期间发送的RPC数量、RPC消息中的总字节数，以及Raft报告的提交的日志条目数量。您的数字将与这里显示的数字不同。如果你愿意，你可以忽略这些数字，但它们可以帮助你理智地检查你的实现所发送的RPC的数量。对于所有的实验2、3和4，如果你的解决方案在所有的测试中花费超过600秒（去测试），或者任何单独的测试花费超过120秒，评分脚本将会失败。


## Part 2B: log (hard)

使用 `go test -run 2B` 来检测代码是否正确。

通过`TestBasicAgree2B()`。从实现`Start()`开始，然后编写代码，通过 AppendEntries RPCs 发送和接收新的日志条目，如下图2。在每个对等体的`applyCh`上发送每个新提交的条目。你将需要实施选举限制（文件中的5.4.1节）。

1. 实现 `Start()` 。该函数实现了什么样的功能？

输入的是 command 将其追加到 log 中，如果当前节点不是 leader 则返回 false 。即便当前 Raft 实例被 kill 掉，该函数也应当返回。

输出的三个参数分别是输入命令对应的索引，当前周期，当前节点是否是 leader 。

* 日志索引加一，追加日志。


在早期的Lab 2B测试中，无法达成协议的一个方法是，即使领导人还活着，也要重复举行选举。寻找选举定时器管理中的错误，或者在赢得选举后不立即发送心跳的问题。

你的代码可能有重复检查某些事件的循环。不要让这些循环在没有暂停的情况下连续执行，因为这将使你的执行速度慢到无法通过测试。使用 Go 的条件变量，或者在每个循环迭代中插入 time.Sleep(10 * time.Millisecond) 。

如果测试失败，建议查看config.go和test_test.go中的测试代码，以更好地了解测试的内容。config.go 提供了测试人员如何使用Raft API。

如果代码运行太慢，即将进行的测试可能会失败。可以用 time 命令检查你的解决方案使用了多少实时时间和CPU时间。下面是典型的输出。

    $ time go test -run 2B
    Test (2B): basic agreement ...
    ... Passed --   0.9  3   16    4572    3
    Test (2B): RPC byte count ...
    ... Passed --   1.7  3   48  114536   11
    Test (2B): agreement after follower reconnects ...
    ... Passed --   3.6  3   78   22131    7
    Test (2B): no agreement if too many followers disconnect ...
    ... Passed --   3.8  5  172   40935    3
    Test (2B): concurrent Start()s ...
    ... Passed --   1.1  3   24    7379    6
    Test (2B): rejoin of partitioned leader ...
    ... Passed --   5.1  3  152   37021    4
    Test (2B): leader backs up quickly over incorrect follower logs ...
    ... Passed --  17.2  5 2080 1587388  102
    Test (2B): RPC counts aren't too high ...
    ... Passed --   2.2  3   60   20119   12
    PASS
    ok  	6.824/raft	35.557s

    real	0m35.899s
    user	0m2.556s
    sys	0m1.458s
    $

`ok 6.824/raft 35.557s` 意味着Go测量了2B测试所花费的时间是35.557秒的实际（挂钟）时间。`user 0m2.556s` 意味着代码消耗了2.556 秒的CPU时间，或实际执行指令的时间（而不是等待或睡眠）。如果在2B测试中使用的实际时间远远超过1分钟，或者远远超过5秒的CPU时间，那么以后可能会遇到麻烦。寻找花费在睡眠或等待RPC超时上的时间，在没有睡眠或等待条件或通道消息的情况下运行的循环，或发送大量的RPC。


## Part 2C: persistence (hard)

如果基于Raft的服务器重新启动，它应该在其停止的地方恢复服务。这就要求Raft在重启后仍能保持持久的状态。该文件的图2提到了哪些状态应该是持久的。

真正的实现会在每次Raft的持久化状态发生变化时将其写入磁盘，并在重启后重新启动时从磁盘读取状态。你的实现不会使用磁盘；相反，它将从Persister对象（见persister.go）保存和恢复持久化状态。调用Raft.Make()的人提供了一个Persister，它最初持有Raft最近的持久化状态（如果有的话）。Raft应该从该Persister初始化其状态，并在每次状态改变时使用它来保存其持久化状态。使用Persister的ReadRaftState（）和SaveRaftState（）方法。

通过添加保存和恢复持久化状态的代码，完成raft.go中的 persist() 和 readPersist() 函数。你将需要把状态编码（或 "序列化"）为一个字节数组，以便将其传递给持久化器。使用labgob编码器；参见persist()和readPersist()中的注释。labgob就像Go的gob编码器，但如果你试图用小写的字段名对结构进行编码，会打印出错误信息。在你的实现改变持久化状态的地方插入对persist()的调用。一旦你完成了这些，并且如果你的其他实现是正确的，你就应该通过所有的2C测试。

运行git pull以获得最新的实验室软件。

2C测试比2A或2B的测试要求更高，失败可能是由于你的2A或2B的代码有问题造成的。

你可能会需要一次备份多个条目的NextIndex的优化。看看从第7页底部和第8页顶部开始的扩展Raft论文（用灰线标记）。论文中的细节很模糊，你需要填补这些空白，也许可以借助6.824 Raft的讲义。

你的代码应该通过所有2C测试（如下图所示），以及2A和2B测试。

    $ go test -run 2C
    Test (2C): basic persistence ...
    ... Passed --   5.0  3   86   22849    6
    Test (2C): more persistence ...
    ... Passed --  17.6  5  952  218854   16
    Test (2C): partitioned leader and one follower crash, leader restarts ...
    ... Passed --   2.0  3   34    8937    4
    Test (2C): Figure 8 ...
    ... Passed --  31.2  5  580  130675   32
    Test (2C): unreliable agreement ...
    ... Passed --   1.7  5 1044  366392  246
    Test (2C): Figure 8 (unreliable) ...
    ... Passed --  33.6  5 10700 33695245  308
    Test (2C): churn ...
    ... Passed --  16.1  5 8864 44771259 1544
    Test (2C): unreliable churn ...
    ... Passed --  16.5  5 4220 6414632  906
    PASS
    ok  	6.824/raft	123.564s
    $

It is a good idea to run the tests multiple times before submitting and check that each run prints PASS.

在提交之前，最好多次运行测试，并检查每一次运行都打印出PASS。

    $ for i in {0..10}; do go test; done

