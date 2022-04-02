# Lab 2: Raft 翻译

## Introduction

实现 Raft 协议并构建一个具备容错功能的 K/V 存储系统。

In this lab you'll implement Raft, a replicated state machine protocol. In the next lab you'll build a key/value service on top of Raft. Then you will “shard” your service over multiple replicated state machines for higher performance.

这是一系列实验室中的第一个，你将建立一个容错的键/值存储系统。在这个实验室中，你将实现Raft，一个复制的状态机协议。在下一个实验室中，你将在Raft的基础上建立一个键/值服务。然后你将在多个复制的状态机上 "分片 "你的服务，以获得更高的性能。

A replicated service achieves fault tolerance by storing complete copies of its state (i.e., data) on multiple replica servers. Replication allows the service to continue operating even if some of its servers experience failures (crashes or a broken or flaky network). The challenge is that failures may cause the replicas to hold differing copies of the data.

复制的服务通过在多个复制服务器上存储其状态（即数据）的完整副本来实现容错。复制允许服务继续运行，即使它的一些服务器出现故障（崩溃或网络故障或摇摆不定）。挑战在于，故障可能导致副本持有不同的数据副本。

Raft organizes client requests into a sequence, called the log, and ensures that all the replica servers see the same log. Each replica executes client requests in log order, applying them to its local copy of the service's state. Since all the live replicas see the same log contents, they all execute the same requests in the same order, and thus continue to have identical service state. If a server fails but later recovers, Raft takes care of bringing its log up to date. Raft will continue to operate as long as at least a majority of the servers are alive and can talk to each other. If there is no such majority, Raft will make no progress, but will pick up where it left off as soon as a majority can communicate again.

Raft将客户请求组织成一个序列，称为日志，并确保所有副本服务器看到相同的日志。每个副本按日志顺序执行客户请求，将它们应用于其本地的服务状态副本。由于所有的实时副本看到相同的日志内容，它们都以相同的顺序执行相同的请求，从而继续拥有相同的服务状态。如果一个服务器发生故障但后来恢复了，Raft会负责将其日志更新。只要至少有大多数的服务器还活着，并且能够相互交谈，Raft就会继续运行。如果没有这样的多数，Raft将不会取得任何进展，但一旦多数服务器能够再次通信，Raft将重新开始工作。

In this lab you'll implement Raft as a Go object type with associated methods, meant to be used as a module in a larger service. A set of Raft instances talk to each other with RPC to maintain replicated logs. Your Raft interface will support an indefinite sequence of numbered commands, also called log entries. The entries are numbered with index numbers. The log entry with a given index will eventually be committed. At that point, your Raft should send the log entry to the larger service for it to execute.

在这个实验室中，你将把Raft实现为一个带有相关方法的Go对象类型，旨在作为一个更大的服务中的模块使用。一组Raft实例通过RPC相互对话，以维护复制的日志。你的Raft接口将支持一连串不确定的编号命令，也称为日志条目。条目是用索引号来编号的。具有特定索引的日志条目最终将被提交。在这一点上，你的Raft应该将日志条目发送到更大的服务，让它执行。

You should follow the design in the [extended Raft paper](https://pdos.csail.mit.edu/6.824/papers/raft-extended.pdf), with particular attention to Figure 2. You'll implement most of what's in the paper, including saving persistent state and reading it after a node fails and then restarts. You will not implement cluster membership changes (Section 6).

你应该遵循[扩展的Raft论文](https://pdos.csail.mit.edu/6.824/papers/raft-extended.pdf)中的设计，特别注意图2。你将实现论文中的大部分内容，包括保存持久性状态和在节点故障后重新启动后读取状态。你将不会实现集群成员的变化（第6节）。

You may find this [guide](https://thesquareplanet.com/blog/students-guide-to-raft/) useful, as well as this advice about [locking](https://pdos.csail.mit.edu/6.824/labs/raft-locking.txt) and [structure](https://pdos.csail.mit.edu/6.824/labs/raft-structure.txt) for concurrency. For a wider perspective, have a look at Paxos, Chubby, Paxos Made Live, Spanner, Zookeeper, Harp, Viewstamped Replication, and [Bolosky et al.](http://static.usenix.org/event/nsdi11/tech/full_papers/Bolosky.pdf) (Note: the student's guide was written several years ago, and part 2D in particular has since changed. Make sure you understand why a particular implementation strategy makes sense before blindly following it!)

你可能会发现这个[指南](https://thesquareplanet.com/blog/students-guide-to-raft/)很有用，还有这个关于并发的锁和结构的建议。为了获得更广泛的视角，可以看看Paxos、Chubby、Paxos Made Live、Spanner、Zookeeper、Harp、Viewstamped Replication和Bolosky等（注意：学生指南是几年前写的，尤其是2D部分后来有了变化。请确保你在盲目追随某个特定的实施策略之前，了解它为什么有意义！)

Keep in mind that the most challenging part of this lab may not be implementing your solution, but debugging it. To help address this challenge, you may wish to spend time thinking about how to make your implementation more easily debuggable. You might refer to the [Guidance](https://pdos.csail.mit.edu/6.824/labs/guidance.html) page and to this blog post about [effective print statements](https://blog.josejg.com/debugging-pretty/).

请记住，本实验中最具挑战性的部分可能不是实现你的解决方案，而是调试它。为了帮助应对这一挑战，你可能希望花时间考虑如何使你的实现更容易调试。你可以参考指导页和这篇关于有效打印语句的博文。

We also provide a [diagram of Raft interactions](https://pdos.csail.mit.edu/6.824/notes/raft_diagram.pdf) that can help clarify how your Raft code interacts with the layers on top of it.

我们还提供了一个Raft互动图，可以帮助澄清你的Raft代码如何与上面的层互动。

This lab is due in four parts. You must submit each part on the corresponding due date.

本实验分四部分完成。你必须在相应的到期日提交每个部分。

## Getting Started 入门

If you have done Lab 1, you already have a copy of the lab source code. If not, you can find directions for obtaining the source via git in the Lab 1 instructions.

如果你做过实验1，你已经有一份实验源代码的副本。如果没有，你可以在实验1的说明中找到通过git获取源代码的方法。

We supply you with skeleton code src/raft/raft.go. We also supply a set of tests, which you should use to drive your implementation efforts, and which we'll use to grade your submitted lab. The tests are in src/raft/test_test.go.

我们为你提供了骨架代码 src/raft/raft.go。我们还提供了一套测试，你应该用它来推动你的实施工作，我们会用它来给你提交的实验室评分。这些测试在 src/raft/test_test.go 中。

When we grade your submissions, we will run the tests without the -race flag. However, you should make sure that your code does not have race conditions because race conditions can cause the tests to fail. So, it's highly recommended to also run the tests with the -race flag as you develop your solution.

当我们对你提交的文件进行评分时，我们将在没有-race标志的情况下运行测试。然而，你应该确保你的代码不存在竞赛条件，因为竞赛条件会导致测试失败。因此，强烈建议你在开发你的解决方案时，也用-race标志来运行测试。

To get up and running, execute the following commands. Don't forget the git pull to get the latest software.

要启动和运行，请执行以下命令。不要忘记使用git pull来获取最新的软件。

    $ cd ~/6.824
    $ git pull
    ...
    $ cd src/raft
    $ go test
    Test (2A): initial election ...
    --- FAIL: TestInitialElection2A (5.04s)
            config.go:326: expected one leader, got none
    Test (2A): election after network failure ...
    --- FAIL: TestReElection2A (5.03s)
            config.go:326: expected one leader, got none
    ...
    $

## The code 准则

Implement Raft by adding code to raft/raft.go. In that file you'll find skeleton code, plus examples of how to send and receive RPCs.

通过向raft/raft.go添加代码来实现Raft。在该文件中，你会发现骨架代码，以及如何发送和接收RPC的例子。

Your implementation must support the following interface, which the tester and (eventually) your key/value server will use. You'll find more details in comments in raft.go.

你的实现必须支持以下接口，测试者和（最终）你的键/值服务器将使用该接口。你可以在raft.go的注释中找到更多细节。

    // create a new Raft server instance:
    // 创建一个新的Raft服务器实例。
    rf := Make(peers, me, persister, applyCh)

    // start agreement on a new log entry:
    // 启动在一个新的日志条目的协议。
    rf.Start(command interface{}) (index, term, isleader)

    // ask a Raft for its current term, and whether it thinks it is leader
    // 询问一个 Raft 的当前任期，以及它是否认为自己是领导者。
    rf.GetState() (term, isLeader)

    // each time a new entry is committed to the log, each Raft peer
    // should send an ApplyMsg to the service (or tester).
    // 每当一个新条目被提交到日志中时，每个 Raft 对等体
    // 应该向服务（或测试者）发送一个ApplyMsg。
    type ApplyMsg

A service calls Make(peers,me,…) to create a Raft peer. The peers argument is an array of network identifiers of the Raft peers (including this one), for use with RPC. The me argument is the index of this peer in the peers array. Start(command) asks Raft to start the processing to append the command to the replicated log. Start() should return immediately, without waiting for the log appends to complete. The service expects your implementation to send an ApplyMsg for each newly committed log entry to the applyCh channel argument to Make().

一个服务调用Make(peers,me,...)来创建一个Raft对等体。peers参数是一个Raft对等体（包括这个）的网络标识符数组，用于RPC。me参数是该对等体在对等体数组中的索引。Start(command)要求Raft开始处理，将该命令附加到复制的日志中。Start()应立即返回，而不需要等待日志追加完成。该服务希望你的实现为每个新提交的日志条目发送一个ApplyMsg到Make()的applyCh通道参数。

raft.go contains example code that sends an RPC (sendRequestVote()) and that handles an incoming RPC (RequestVote()). Your Raft peers should exchange RPCs using the labrpc Go package (source in src/labrpc). The tester can tell labrpc to delay RPCs, re-order them, and discard them to simulate various network failures. While you can temporarily modify labrpc, make sure your Raft works with the original labrpc, since that's what we'll use to test and grade your lab. Your Raft instances must interact only with RPC; for example, they are not allowed to communicate using shared Go variables or files.

raft.go包含发送RPC（sendRequestVote()）和处理传入RPC（RequestVote()）的示例代码。你的Raft对等体应该使用labrpc Go包（源代码在src/labrpc中）交换RPC。测试人员可以告诉labrpc延迟RPC，重新排序，并丢弃它们以模拟各种网络故障。虽然你可以临时修改labrpc，但要确保你的Raft与原始的labrpc一起工作，因为我们将用它来测试和评定你的实验室。你的Raft实例必须只与RPC互动；例如，它们不允许使用共享的Go变量或文件进行通信。

Subsequent labs build on this lab, so it is important to give yourself enough time to write solid code.

随后的实验是在这个实验的基础上进行的，所以给自己足够的时间来写出坚实的代码是很重要的。

## Part 2A: leader election (moderate)

Implement Raft leader election and heartbeats (AppendEntries RPCs with no log entries). The goal for Part 2A is for a single leader to be elected, for the leader to remain the leader if there are no failures, and for a new leader to take over if the old leader fails or if packets to/from the old leader are lost. Run go test -run 2A to test your 2A code.

实现Raft领导者选举和心跳（AppendEntries RPCs，没有日志条目）。第2A部分的目标是选出一个领导者，如果没有失败，该领导者将继续担任领导者，如果老领导者失败或与老领导者之间的数据包丢失，则由新领导者接管。运行go test -run 2A来测试你的2A代码。

* You can't easily run your Raft implementation directly; instead you should run it by way of the tester, i.e. go test -run 2A .

你不能轻易地直接运行你的Raft实现；相反，你应该通过测试器来运行它，即go test -run 2A 。

* Follow the paper's Figure 2. At this point you care about sending and receiving RequestVote RPCs, the Rules for Servers that relate to elections, and the State related to leader election,

按照论文中的图2。在这一点上，你关心的是发送和接收RequestVote RPCs，与选举有关的服务器规则，以及与领导选举有关的状态。

Add the Figure 2 state for leader election to the Raft struct in raft.go. You'll also need to define a struct to hold information about each log entry.

在raft.go中的Raft结构中添加图2中领导者选举的状态。你还需要定义一个结构来保存每个日志条目的信息。

Fill in the RequestVoteArgs and RequestVoteReply structs. Modify Make() to create a background goroutine that will kick off leader election periodically by sending out RequestVote RPCs when it hasn't heard from another peer for a while. This way a peer will learn who is the leader, if there is already a leader, or become the leader itself. Implement the RequestVote() RPC handler so that servers will vote for one another.

填入RequestVoteArgs和RequestVoteReply结构。修改Make()以创建一个后台goroutine，当它有一段时间没有收到另一个对等体的消息时，它将通过发送RequestVote RPCs定期启动领导者选举。这样，如果已经有了一个领导者，对等体将了解谁是领导者，或者自己成为领导者。实现RequestVote()RPC处理程序，这样服务器就可以互相投票了。

To implement heartbeats, define an AppendEntries RPC struct (though you may not need all the arguments yet), and have the leader send them out periodically. Write an AppendEntries RPC handler method that resets the election timeout so that other servers don't step forward as leaders when one has already been elected.

为了实现心跳，定义一个AppendEntries RPC结构（尽管你可能还不需要所有的参数），并让领导者定期发送它们。编写一个AppendEntries RPC处理方法，重设选举超时，这样当一个人已经当选时，其他服务器就不会站出来当领导者。

Make sure the election timeouts in different peers don't always fire at the same time, or else all peers will vote only for themselves and no one will become the leader.

确保不同对等体的选举超时不会总是在同一时间发生，否则所有对等体将只为自己投票，没有人会成为领导者。

The tester requires that the leader send heartbeat RPCs no more than ten times per second.

测试者要求领导者每秒发送心跳RPC的次数不超过10次。

The tester requires your Raft to elect a new leader within five seconds of the failure of the old leader (if a majority of peers can still communicate). Remember, however, that leader election may require multiple rounds in case of a split vote (which can happen if packets are lost or if candidates unluckily choose the same random backoff times). You must pick election timeouts (and thus heartbeat intervals) that are short enough that it's very likely that an election will complete in less than five seconds even if it requires multiple rounds.

测试员要求你的Raft在老领袖失败后的五秒钟内选出一个新的领袖（如果大多数对等体仍能通信）。然而，请记住，如果出现分裂投票，领袖选举可能需要多轮投票（如果数据包丢失或候选人不走运地选择相同的随机退避时间，就会发生这种情况）。你必须选择足够短的选举超时（以及心跳间隔），即使需要多轮选举，也很可能在5秒内完成。

The paper's Section 5.2 mentions election timeouts in the range of 150 to 300 milliseconds. Such a range only makes sense if the leader sends heartbeats considerably more often than once per 150 milliseconds. Because the tester limits you to 10 heartbeats per second, you will have to use an election timeout larger than the paper's 150 to 300 milliseconds, but not too large, because then you may fail to elect a leader within five seconds.

论文的第5.2节提到选举超时的范围是150到300毫秒。只有当领导者发送心跳的频率大大超过每150毫秒一次时，这样的范围才有意义。因为测试者把你限制在每秒10次心跳，所以你必须使用比文件中的150到300毫秒更大的选举超时，但不能太大，因为那样你可能无法在5秒内选出一个领导者。

You may find Go's rand useful.

你可能会发现Go的rand很有用。

You'll need to write code that takes actions periodically or after delays in time. The easiest way to do this is to create a goroutine with a loop that calls time.Sleep(); (see the ticker() goroutine that Make() creates for this purpose). Don't use Go's time.Timer or time.Ticker, which are difficult to use correctly.

你需要编写代码，定期或在时间延迟后采取行动。最简单的方法是创建一个带有循环的goroutine，调用time.Sleep();（参见Make()为此目的而创建的ticker()goroutine）。不要使用Go的time.Timer或time.Ticker，它们很难正确使用。

The [Guidance page](https://pdos.csail.mit.edu/6.824/labs/guidance.html) has some tips on how to develop and debug your code.

指导页有一些关于如何开发和调试你的代码的提示。

If your code has trouble passing the tests, read the paper's Figure 2 again; the full logic for leader election is spread over multiple parts of the figure.

如果你的代码难以通过测试，请再次阅读该论文的图2；领导人选举的全部逻辑分布在图中的多个部分。

Don't forget to implement GetState().

不要忘记实现GetState()。

The tester calls your Raft's rf.Kill() when it is permanently shutting down an instance. You can check whether Kill() has been called using rf.killed(). You may want to do this in all loops, to avoid having dead Raft instances print confusing messages.

测试员在永久关闭一个实例时，会调用你的Raft的rf.Kill()。您可以使用rf.killed()检查Kill()是否被调用。您可能希望在所有的循环中都这样做，以避免死亡的Raft实例打印混乱的信息。

Go RPC sends only struct fields whose names start with capital letters. Sub-structures must also have capitalized field names (e.g. fields of log records in an array). The labgob package will warn you about this; don't ignore the warnings.

Go RPC只发送名称以大写字母开头的结构字段。子结构也必须有大写的字段名（例如，数组中的日志记录字段）。labgob包会对此发出警告；不要忽视这些警告。

Be sure you pass the 2A tests before submitting Part 2A, so that you see something like this:

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

Each "Passed" line contains five numbers; these are the time that the test took in seconds, the number of Raft peers, the number of RPCs sent during the test, the total number of bytes in the RPC messages, and the number of log entries that Raft reports were committed. Your numbers will differ from those shown here. You can ignore the numbers if you like, but they may help you sanity-check the number of RPCs that your implementation sends. For all of labs 2, 3, and 4, the grading script will fail your solution if it takes more than 600 seconds for all of the tests (go test), or if any individual test takes more than 120 seconds.

每一行 "通过 "包含五个数字；它们是测试所花的时间（秒）、Raft对等体的数量、测试期间发送的RPC数量、RPC消息中的总字节数，以及Raft报告的提交的日志条目数量。您的数字将与这里显示的数字不同。如果你愿意，你可以忽略这些数字，但它们可以帮助你理智地检查你的实现所发送的RPC的数量。对于所有的实验2、3和4，如果你的解决方案在所有的测试中花费超过600秒（去测试），或者任何单独的测试花费超过120秒，评分脚本将会失败。

When we grade your submissions, we will run the tests without the -race flag but you should also make sure that your code consistently passes the tests with the -race flag.

当我们对你提交的文件进行评分时，我们会在没有-race标志的情况下运行测试，但你也应该确保你的代码在有-race标志的情况下能持续通过测试。

## Part 2B: log (hard)

Implement the leader and follower code to append new log entries, so that the go test -run 2B tests pass.

实现领导者和追随者代码，以追加新的日志条目，从而使go test -run 2B测试通过。

Run git pull to get the latest lab software.

运行git pull以获得最新的实验室软件。

Your first goal should be to pass TestBasicAgree2B(). Start by implementing Start(), then write the code to send and receive new log entries via AppendEntries RPCs, following Figure 2. Send each newly committed entry on applyCh on each peer.

你的第一个目标应该是通过TestBasicAgree2B（）。从实现Start()开始，然后编写代码，通过AppendEntries RPCs发送和接收新的日志条目，如下图2。在每个对等体的applyCh上发送每个新提交的条目。

You will need to implement the election restriction (section 5.4.1 in the paper).

你将需要实施选举限制（文件中的5.4.1节）。

One way to fail to reach agreement in the early Lab 2B tests is to hold repeated elections even though the leader is alive. Look for bugs in election timer management, or not sending out heartbeats immediately after winning an election.

在早期的Lab 2B测试中，无法达成协议的一个方法是，即使领导人还活着，也要重复举行选举。寻找选举定时器管理中的错误，或者在赢得选举后不立即发送心跳的问题。

Your code may have loops that repeatedly check for certain events. Don't have these loops execute continuously without pausing, since that will slow your implementation enough that it fails tests. Use Go's condition variables, or insert a time.Sleep(10 * time.Millisecond) in each loop iteration.

你的代码可能有重复检查某些事件的循环。不要让这些循环在没有暂停的情况下连续执行，因为这将使你的执行速度慢到无法通过测试。使用 Go 的条件变量，或者在每个循环迭代中插入 time.Sleep(10 * time.Millisecond) 。

Do yourself a favor for future labs and write (or re-write) code that's clean and clear. For ideas, re-visit our the [Guidance page](https://pdos.csail.mit.edu/6.824/labs/guidance.html) with tips on how to develop and debug your code.

为你自己将来的实验帮个忙，写（或重写）干净清晰的代码。想了解更多信息，请重新访问我们的指导页面，了解如何开发和调试代码的技巧。

If you fail a test, look over the code for the test in config.go and test_test.go to get a better understanding what the test is testing. config.go also illustrates how the tester uses the Raft API.

如果你测试失败，请查看config.go和test_test.go中的测试代码，以更好地了解测试的内容。config.go还说明了测试人员如何使用Raft API。

The tests for upcoming labs may fail your code if it runs too slowly. You can check how much real time and CPU time your solution uses with the time command. Here's typical output:

如果你的代码运行太慢，即将进行的实验室测试可能会失败。你可以用时间命令检查你的解决方案使用了多少实时时间和CPU时间。下面是典型的输出。


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

The "ok 6.824/raft 35.557s" means that Go measured the time taken for the 2B tests to be 35.557 seconds of real (wall-clock) time. The "user 0m2.556s" means that the code consumed 2.556 seconds of CPU time, or time spent actually executing instructions (rather than waiting or sleeping). If your solution uses much more than a minute of real time for the 2B tests, or much more than 5 seconds of CPU time, you may run into trouble later on. Look for time spent sleeping or waiting for RPC timeouts, loops that run without sleeping or waiting for conditions or channel messages, or large numbers of RPCs sent.

ok 6.824/raft 35.557s "意味着Go测量了2B测试所花费的时间是35.557秒的实际（挂钟）时间。user 0m2.556s "意味着代码消耗了2.556秒的CPU时间，或实际执行指令的时间（而不是等待或睡眠）。如果你的解决方案在2B测试中使用的实际时间远远超过1分钟，或者远远超过5秒的CPU时间，你以后可能会遇到麻烦。寻找花费在睡眠或等待RPC超时上的时间，在没有睡眠或等待条件或通道消息的情况下运行的循环，或发送大量的RPC。

## Part 2C: persistence (hard)

If a Raft-based server reboots it should resume service where it left off. This requires that Raft keep persistent state that survives a reboot. The paper's Figure 2 mentions which state should be persistent.

如果基于Raft的服务器重新启动，它应该在其停止的地方恢复服务。这就要求Raft在重启后仍能保持持久的状态。该文件的图2提到了哪些状态应该是持久的。

A real implementation would write Raft's persistent state to disk each time it changed, and would read the state from disk when restarting after a reboot. Your implementation won't use the disk; instead, it will save and restore persistent state from a Persister object (see persister.go). Whoever calls Raft.Make() supplies a Persister that initially holds Raft's most recently persisted state (if any). Raft should initialize its state from that Persister, and should use it to save its persistent state each time the state changes. Use the Persister's ReadRaftState() and SaveRaftState() methods.

真正的实现会在每次Raft的持久化状态发生变化时将其写入磁盘，并在重启后重新启动时从磁盘读取状态。你的实现不会使用磁盘；相反，它将从Persister对象（见persister.go）保存和恢复持久化状态。调用Raft.Make()的人提供了一个Persister，它最初持有Raft最近的持久化状态（如果有的话）。Raft应该从该Persister初始化其状态，并在每次状态改变时使用它来保存其持久化状态。使用Persister的ReadRaftState（）和SaveRaftState（）方法。

Complete the functions persist() and readPersist() in raft.go by adding code to save and restore persistent state. You will need to encode (or "serialize") the state as an array of bytes in order to pass it to the Persister. Use the labgob encoder; see the comments in persist() and readPersist(). labgob is like Go's gob encoder but prints error messages if you try to encode structures with lower-case field names. Insert calls to persist() at the points where your implementation changes persistent state. Once you've done this, and if the rest of your implementation is correct, you should pass all of the 2C tests.

通过添加保存和恢复持久化状态的代码，完成raft.go中的 persist() 和 readPersist() 函数。你将需要把状态编码（或 "序列化"）为一个字节数组，以便将其传递给持久化器。使用labgob编码器；参见persist()和readPersist()中的注释。labgob就像Go的gob编码器，但如果你试图用小写的字段名对结构进行编码，会打印出错误信息。在你的实现改变持久化状态的地方插入对persist()的调用。一旦你完成了这些，并且如果你的其他实现是正确的，你就应该通过所有的2C测试。

Run git pull to get the latest lab software.

运行git pull以获得最新的实验室软件。

The 2C tests are more demanding than those for 2A or 2B, and failures may be caused by problems in your code for 2A or 2B.

2C测试比2A或2B的测试要求更高，失败可能是由于你的2A或2B的代码有问题造成的。

You will probably need the optimization that backs up nextIndex by more than one entry at a time. Look at the extended Raft paper starting at the bottom of page 7 and top of page 8 (marked by a gray line). The paper is vague about the details; you will need to fill in the gaps, perhaps with the help of the 6.824 Raft lecture notes.

你可能会需要一次备份多个条目的NextIndex的优化。看看从第7页底部和第8页顶部开始的扩展Raft论文（用灰线标记）。论文中的细节很模糊，你需要填补这些空白，也许可以借助6.824 Raft的讲义。

Your code should pass all the 2C tests (as shown below), as well as the 2A and 2B tests.

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

## Part 2D: log compaction (hard) 

As things stand now, a rebooting server replays the complete Raft log in order to restore its state. However, it's not practical for a long-running service to remember the complete Raft log forever. Instead, you'll modify Raft to cooperate with services that persistently store a "snapshot" of their state from time to time, at which point Raft discards log entries that precede the snapshot. The result is a smaller amount of persistent data and faster restart. However, it's now possible for a follower to fall so far behind that the leader has discarded the log entries it needs to catch up; the leader must then send a snapshot plus the log starting at the time of the snapshot. Section 7 of the extended Raft paper outlines the scheme; you will have to design the details.

按照目前的情况，重新启动的服务器会复制完整的Raft日志，以恢复其状态。然而，对于一个长期运行的服务来说，永远记住完整的Raft日志是不现实的。相反，你将修改Raft，使其与那些不时持久性地存储其状态的 "快照 "的服务合作，此时Raft会丢弃快照之前的日志条目。其结果是持久性数据量更小，重启速度更快。然而，现在追随者有可能落后太多，以至于领导者丢弃了它需要追赶的日志条目；然后领导者必须发送一个快照，加上快照时间开始的日志。扩展的Raft论文的第7节概述了该方案；你必须设计细节。

You may find it helpful to refer to the diagram of Raft interactions to understand how the replicated service and Raft communicate.

你可能会发现参考Raft的交互图对了解复制的服务和Raft的通信方式很有帮助。

Your Raft must provide the following function that the service can call with a serialized snapshot of its state:

你的Raft必须提供以下函数，服务可以用其状态的序列化快照来调用。

    Snapshot(index int, snapshot []byte)

In Lab 2D, the tester calls Snapshot() periodically. In Lab 3, you will write a key/value server that calls Snapshot(); the snapshot will contain the complete table of key/value pairs. The service layer calls Snapshot() on every peer (not just on the leader).

在Lab 2D中，测试者定期调用Snapshot()。在实验室3中，你将编写一个调用Snapshot()的键/值服务器；快照将包含键/值对的完整表格。服务层在每个对等体上调用Snapshot()（而不仅仅是在领导者上）。

The index argument indicates the highest log entry that's reflected in the snapshot. Raft should discard its log entries before that point. You'll need to revise your Raft code to operate while storing only the tail of the log.

index参数表示在快照中反映的最高日志条目。Raft 应该丢弃在该点之前的日志条目。你需要修改你的Raft代码，以便在操作时只存储日志的尾部。

You'll need to implement the InstallSnapshot RPC discussed in the paper that allows a Raft leader to tell a lagging Raft peer to replace its state with a snapshot. You will likely need to think through how InstallSnapshot should interact with the state and rules in Figure 2.

你需要实现论文中讨论的 InstallSnapshot RPC，它允许 Raft 领导告诉落后的 Raft 对等体用快照替换其状态。你可能需要考虑InstallSnapshot应该如何与图2中的状态和规则互动。

When a follower's Raft code receives an InstallSnapshot RPC, it can use the applyCh to send the snapshot to the service in an ApplyMsg. The ApplyMsg struct definition already contains the fields you will need (and which the tester expects). Take care that these snapshots only advance the service's state, and don't cause it to move backwards.

当跟随者的 Raft 代码收到 InstallSnapshot RPC 时，它可以使用 applyCh 在 ApplyMsg 中向服务发送快照。ApplyMsg 结构定义已经包含了您需要的字段（也是测试人员所期望的）。请注意，这些快照只能推进服务的状态，而不会导致它向后移动。

If a server crashes, it must restart from persisted data. Your Raft should persist both Raft state and the corresponding snapshot. Use persister.SaveStateAndSnapshot(), which takes separate arguments for the Raft state and the corresponding snapshot. If there's no snapshot, pass nil as the snapshot argument.

如果一个服务器崩溃了，它必须从持久化的数据中重新启动。你的Raft应该同时保存Raft状态和相应的快照。使用 persister.SaveStateAndSnapshot()，它为 Raft 状态和相应的快照接受单独的参数。如果没有快照，则传递nil作为快照参数。

When a server restarts, the application layer reads the persisted snapshot and restores its saved state.

当服务器重新启动时，应用层会读取持久化的快照并恢复其保存的状态。

Previously, this lab recommended that you implement a function called CondInstallSnapshot to avoid the requirement that snapshots and log entries sent on applyCh are coordinated. This vestigal API interface remains, but you are discouraged from implementing it: instead, we suggest that you simply have it return true.

以前，本实验室建议你实现一个叫做CondInstallSnapshot的函数，以避免在applyCh上发送的快照和日志条目被协调的要求。这个残存的API接口仍然存在，但我们不鼓励你去实现它：相反，我们建议你只需让它返回true。

Implement Snapshot() and the InstallSnapshot RPC, as well as the changes to Raft to support these (e.g, operation with a trimmed log). Your solution is complete when it passes the 2D tests (and all the previous Lab 2 tests).

实现Snapshot()和InstallSnapshot RPC，以及对Raft的修改以支持这些功能（例如，用修剪后的日志进行操作）。当你的解决方案通过2D测试（以及之前所有的Lab 2测试）时，就完成了。

git pull to make sure you have the latest software.

git pull以确保你有最新的软件。

A good place to start is to modify your code to so that it is able to store just the part of the log starting at some index X. Initially you can set X to zero and run the 2B/2C tests. Then make Snapshot(index) discard the log before index, and set X equal to index. If all goes well you should now pass the first 2D test.

一个好的开始是修改你的代码，使其能够只存储从某个索引X开始的日志部分。最初你可以将X设置为零，并运行2B/2C测试。然后让Snapshot(index)丢弃索引之前的日志，并将X设置为等于索引。如果一切顺利，你现在应该通过第一个2D测试。

You won't be able to store the log in a Go slice and use Go slice indices interchangeably with Raft log indices; you'll need to index the slice in a way that accounts for the discarded portion of the log.

你不能将日志存储在Go分片中，并将Go分片索引与Raft日志索引互换使用；你需要对分片进行索引，以说明日志中被丢弃的部分。

Next: have the leader send an InstallSnapshot RPC if it doesn't have the log entries required to bring a follower up to date.

下一步：如果领导者没有使追随者更新所需的日志条目，就让它发送InstallSnapshot RPC。

Send the entire snapshot in a single InstallSnapshot RPC. Don't implement Figure 13's offset mechanism for splitting up the snapshot.

在单个 InstallSnapshot RPC 中发送整个快照。不要实现图13的偏移机制来分割快照。

Raft must discard old log entries in a way that allows the Go garbage collector to free and re-use the memory; this requires that there be no reachable references (pointers) to the discarded log entries.

Raft必须以允许Go垃圾收集器释放和重新使用内存的方式丢弃旧的日志条目；这要求对被丢弃的日志条目没有可及的引用（指针）。

Even when the log is trimmed, your implemention still needs to properly send the term and index of the entry prior to new entries in AppendEntries RPCs; this may require saving and referencing the latest snapshot's lastIncludedTerm/lastIncludedIndex (consider whether this should be persisted).

即使日志被修剪，你的实现仍然需要在AppendEntries RPCs中的新条目之前正确发送条目的术语和索引；这可能需要保存和引用最新快照的lastIncludedTerm/lastIncludedIndex（考虑这是否应该被持续保存）。

A reasonable amount of time to consume for the full set of Lab 2 tests (2A+2B+2C+2D) without -race is 6 minutes of real time and one minute of CPU time. When running with -race, it is about 10 minutes of real time and two minutes of CPU time.

在没有-race的情况下，实验室2的全套测试（2A+2B+2C+2D）的合理耗时是6分钟的真实时间和1分钟的CPU时间。当用-race运行时，大约是10分钟的真实时间和2分钟的CPU时间。

Your code should pass all the 2D tests (as shown below), as well as the 2A, 2B, and 2C tests.

你的代码应该通过所有的2D测试（如下图所示），以及2A、2B和2C测试。

    $ go test -run 2D
    Test (2D): snapshots basic ...
    ... Passed --  11.6  3  176   61716  192
    Test (2D): install snapshots (disconnect) ...
    ... Passed --  64.2  3  878  320610  336
    Test (2D): install snapshots (disconnect+unreliable) ...
    ... Passed --  81.1  3 1059  375850  341
    Test (2D): install snapshots (crash) ...
    ... Passed --  53.5  3  601  256638  339
    Test (2D): install snapshots (unreliable+crash) ...
    ... Passed --  63.5  3  687  288294  336
    Test (2D): crash and restart all servers ...
    ... Passed --  19.5  3  268   81352   58
    PASS
    ok      6.824/raft      293.456s

Again, a reminder that when we grade your submissions, we will run the tests without the -race flag but you should also make sure that your code consistently passes the tests with the -race flag.

再次提醒您，当我们对您提交的文件进行评分时，我们将在没有-race标志的情况下运行测试，但您也应该确保您的代码在有-race标志的情况下始终通过测试。