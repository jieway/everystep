# 6.824 - Spring 2020

6.824 Lab 2: Raft
Part 2A Due: Feb 21 23:59
Part 2B Due: Feb 28 23:59
Part 2C Due: Mar 6 23:59

## Introduction

This is the first in a series of labs in which you'll build a fault-tolerant key/value storage system. In this lab you'll implement Raft, a replicated state machine protocol. In the next lab you'll build a key/value service on top of Raft. Then you will “shard” your service over multiple replicated state machines for higher performance.

这是一系列实验室中的第一个，你将建立一个容错的键/值存储系统。在这个实验室中，你将实现Raft，一个复制的状态机协议。在下一个实验室中，你将在Raft的基础上建立一个键/值服务。然后你将在多个复制的状态机上 "分片 "你的服务，以获得更高的性能。

A replicated service achieves fault tolerance by storing complete copies of its state (i.e., data) on multiple replica servers. Replication allows the service to continue operating even if some of its servers experience failures (crashes or a broken or flaky network). The challenge is that failures may cause the replicas to hold differing copies of the data.

复制的服务通过在多个复制服务器上存储其状态（即数据）的完整副本来实现容错。复制允许服务继续运行，即使它的一些服务器出现故障（崩溃或网络故障或摇摆不定）。挑战在于，故障可能导致副本持有不同的数据副本。

Raft organizes client requests into a sequence, called the log, and ensures that all the replica servers see the same log. Each replica executes client requests in log order, applying them to its local copy of the service's state. Since all the live replicas see the same log contents, they all execute the same requests in the same order, and thus continue to have identical service state. If a server fails but later recovers, Raft takes care of bringing its log up to date. Raft will continue to operate as long as at least a majority of the servers are alive and can talk to each other. If there is no such majority, Raft will make no progress, but will pick up where it left off as soon as a majority can communicate again.

Raft将客户请求组织成一个序列，称为日志，并确保所有副本服务器看到相同的日志。每个副本按日志顺序执行客户请求，将它们应用于其本地的服务状态副本。由于所有的实时副本看到相同的日志内容，它们都以相同的顺序执行相同的请求，从而继续拥有相同的服务状态。如果一个服务器发生故障但后来恢复了，Raft会负责将其日志更新。只要至少有大多数的服务器还活着，并且能够相互交谈，Raft就会继续运行。如果没有这样的多数，Raft将不会取得任何进展，但一旦多数服务器能够再次通信，Raft将重新开始工作。

In this lab you'll implement Raft as a Go object type with associated methods, meant to be used as a module in a larger service. A set of Raft instances talk to each other with RPC to maintain replicated logs. Your Raft interface will support an indefinite sequence of numbered commands, also called log entries. The entries are numbered with index numbers. The log entry with a given index will eventually be committed. At that point, your Raft should send the log entry to the larger service for it to execute.

在这个实验室中，你将把Raft实现为一个带有相关方法的Go对象类型，旨在作为一个更大的服务中的模块使用。一组Raft实例通过RPC相互对话，以维护复制的日志。你的Raft接口将支持一连串不确定的编号命令，也称为日志条目。条目是用索引号来编号的。具有特定索引的日志条目最终将被提交。在这一点上，你的Raft应该将日志条目发送到更大的服务，让它执行。

You should follow the design in the extended Raft paper, with particular attention to Figure 2. You'll implement most of what's in the paper, including saving persistent state and reading it after a node fails and then restarts. You will not implement cluster membership changes (Section 6). You'll implement log compaction / snapshotting (Section 7) in a later lab.

你应该遵循扩展的Raft论文中的设计，特别注意图2。你将实现论文中的大部分内容，包括保存持久性状态和在节点故障后重新启动后读取状态。你将不会实现集群成员的变化（第6节）。你将在以后的实验中实现日志压缩/快照（第7节）。

You may find this guide useful, as well as this advice about locking and structure for concurrency. For a wider perspective, have a look at Paxos, Chubby, Paxos Made Live, Spanner, Zookeeper, Harp, Viewstamped Replication, and Bolosky et al.

你可能会发现这个指南很有用，还有这个关于并发的锁和结构的建议。为了获得更广泛的视角，可以看看Paxos、Chubby、Paxos Made Live、Spanner、Zookeeper、Harp、Viewstamped Replication以及Bolosky等。

This lab is due in three parts. You must submit each part on the corresponding due date.

本实验分三部分完成。你必须在相应的到期日提交每个部分。

## Collaboration Policy
You must write all the code you hand in for 6.824, except for code that we give you as part of the assignment. You are not allowed to look at anyone else's solution, you are not allowed to look at code from previous years, and you are not allowed to look at other Raft implementations. You may discuss the assignments with other students, but you may not look at or copy anyone else's code, or allow anyone else to look at your code.

你必须写出你所交的6.824的所有代码，除了我们作为作业的一部分给你的代码。你不允许看别人的解决方案，不允许看往年的代码，也不允许看其他Raft的实现。你可以和其他同学讨论作业，但你不能看或复制其他人的代码，也不能让其他人看你的代码。

Please do not publish your code or make it available to current or future 6.824 students. github.com repositories are public by default, so please don't put your code there unless you make the repository private. You may find it convenient to use MIT's GitHub, but be sure to create a private repository.

请不要发布你的代码，也不要把它提供给现在或将来的6.824学生。github.com的仓库默认是公开的，所以请不要把你的代码放在那里，除非你把仓库变成私有的。你可能会发现使用麻省理工学院的GitHub很方便，但一定要创建一个私有仓库。

## Getting Started
If you have done Lab 1, you already have a copy of the lab source code. If not, you can find directions for obtaining the source via git in the Lab 1 instructions.

如果你做过实验1，你已经有一份实验源代码的副本。如果没有，你可以在实验1的说明中找到通过git获取源代码的方法。

We supply you with skeleton code src/raft/raft.go. We also supply a set of tests, which you should use to drive your implementation efforts, and which we'll use to grade your submitted lab. The tests are in src/raft/test_test.go.

我们为你提供了骨架代码 src/raft/raft.go。我们还提供了一套测试，你应该用它来推动你的实施工作，我们会用它来给你提交的实验室评分。这些测试在 src/raft/test_test.go 中。

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

## The code
Implement Raft by adding code to raft/raft.go. In that file you'll find skeleton code, plus examples of how to send and receive RPCs.

通过向raft/raft.go添加代码来实现Raft。在该文件中，你会发现骨架代码，以及如何发送和接收RPC的例子。

Your implementation must support the following interface, which the tester and (eventually) your key/value server will use. You'll find more details in comments in raft.go.

你的实现必须支持以下接口，测试者和（最终）你的键/值服务器将使用该接口。你可以在raft.go的注释中找到更多细节。

    // create a new Raft server instance:
    rf := Make(peers, me, persister, applyCh)

    // start agreement on a new log entry:
    rf.Start(command interface{}) (index, term, isleader)

    // ask a Raft for its current term, and whether it thinks it is leader
    rf.GetState() (term, isLeader)

    // each time a new entry is committed to the log, each Raft peer
    // should send an ApplyMsg to the service (or tester).
    type ApplyMsg

A service calls Make(peers,me,…) to create a Raft peer. The peers argument is an array of network identifiers of the Raft peers (including this one), for use with RPC. The me argument is the index of this peer in the peers array. Start(command) asks Raft to start the processing to append the command to the replicated log. Start() should return immediately, without waiting for the log appends to complete. The service expects your implementation to send an ApplyMsg for each newly committed log entry to the applyCh channel argument to Make().

一个服务调用Make(peers,me,...)来创建一个Raft对等体。peers参数是一个Raft对等体（包括这个）的网络标识符数组，用于RPC。me参数是该对等体在对等体数组中的索引。Start(command)要求Raft开始处理，将该命令附加到复制的日志中。Start()应立即返回，而不需要等待日志追加完成。该服务希望你的实现为每个新提交的日志条目发送一个ApplyMsg到Make()的applyCh通道参数。

raft.go contains example code that sends an RPC (sendRequestVote()) and that handles an incoming RPC (RequestVote()). Your Raft peers should exchange RPCs using the labrpc Go package (source in src/labrpc). The tester can tell labrpc to delay RPCs, re-order them, and discard them to simulate various network failures. While you can temporarily modify labrpc, make sure your Raft works with the original labrpc, since that's what we'll use to test and grade your lab. Your Raft instances must interact only with RPC; for example, they are not allowed to communicate using shared Go variables or files.

raft.go包含发送RPC（sendRequestVote()）和处理传入RPC（RequestVote()）的示例代码。你的Raft对等体应该使用labrpc Go包（源代码在src/labrpc中）交换RPC。测试人员可以告诉labrpc延迟RPC，重新排序，并丢弃它们以模拟各种网络故障。虽然你可以临时修改labrpc，但要确保你的Raft与原始的labrpc一起工作，因为我们将用它来测试和评定你的实验室。你的Raft实例必须只与RPC互动；例如，它们不允许使用共享的Go变量或文件进行通信。

Subsequent labs build on this lab, so it is important to give yourself enough time to write solid code.



Part 2A
Implement Raft leader election and heartbeats (AppendEntries RPCs with no log entries). The goal for Part 2A is for a single leader to be elected, for the leader to remain the leader if there are no failures, and for a new leader to take over if the old leader fails or if packets to/from the old leader are lost. Run go test -run 2A to test your 2A code.

You can't easily run your Raft implementation directly; instead you should run it by way of the tester, i.e. go test -run 2A.
Follow the paper's Figure 2. At this point you care about sending and receiving RequestVote RPCs, the Rules for Servers that relate to elections, and the State related to leader election,
Add the Figure 2 state for leader election to the Raft struct in raft.go. You'll also need to define a struct to hold information about each log entry.
Fill in the RequestVoteArgs and RequestVoteReply structs. Modify Make() to create a background goroutine that will kick off leader election periodically by sending out RequestVote RPCs when it hasn't heard from another peer for a while. This way a peer will learn who is the leader, if there is already a leader, or become the leader itself. Implement the RequestVote() RPC handler so that servers will vote for one another.
To implement heartbeats, define an AppendEntries RPC struct (though you may not need all the arguments yet), and have the leader send them out periodically. Write an AppendEntries RPC handler method that resets the election timeout so that other servers don't step forward as leaders when one has already been elected.
Make sure the election timeouts in different peers don't always fire at the same time, or else all peers will vote only for themselves and no one will become the leader.
The tester requires that the leader send heartbeat RPCs no more than ten times per second.
The tester requires your Raft to elect a new leader within five seconds of the failure of the old leader (if a majority of peers can still communicate). Remember, however, that leader election may require multiple rounds in case of a split vote (which can happen if packets are lost or if candidates unluckily choose the same random backoff times). You must pick election timeouts (and thus heartbeat intervals) that are short enough that it's very likely that an election will complete in less than five seconds even if it requires multiple rounds.
The paper's Section 5.2 mentions election timeouts in the range of 150 to 300 milliseconds. Such a range only makes sense if the leader sends heartbeats considerably more often than once per 150 milliseconds. Because the tester limits you to 10 heartbeats per second, you will have to use an election timeout larger than the paper's 150 to 300 milliseconds, but not too large, because then you may fail to elect a leader within five seconds.
You may find Go's rand useful.
You'll need to write code that takes actions periodically or after delays in time. The easiest way to do this is to create a goroutine with a loop that calls time.Sleep(). Don't use Go's time.Timer or time.Ticker, which are difficult to use correctly.
Read this advice about locking and structure.
If your code has trouble passing the tests, read the paper's Figure 2 again; the full logic for leader election is spread over multiple parts of the figure.
Don't forget to implement GetState().
The tester calls your Raft's rf.Kill() when it is permanently shutting down an instance. You can check whether Kill() has been called using rf.killed(). You may want to do this in all loops, to avoid having dead Raft instances print confusing messages.
A good way to debug your code is to insert print statements when a peer sends or receives a message, and collect the output in a file with go test -run 2A > out. Then, by studying the trace of messages in the out file, you can identify where your implementation deviates from the desired protocol. You might find DPrintf in util.go useful to turn printing on and off as you debug different problems.
Go RPC sends only struct fields whose names start with capital letters. Sub-structures must also have capitalized field names (e.g. fields of log records in an array). The labgob package will warn you about this; don't ignore the warnings.
Check your code with go test -race, and fix any races it reports.
Be sure you pass the 2A tests before submitting Part 2A, so that you see something like this:

$ go test -run 2A
Test (2A): initial election ...
  ... Passed --   4.0  3   32    9170    0
Test (2A): election after network failure ...
  ... Passed --   6.1  3   70   13895    0
PASS
ok      raft    10.187s
$
Each "Passed" line contains five numbers; these are the time that the test took in seconds, the number of Raft peers (usually 3 or 5), the number of RPCs sent during the test, the total number of bytes in the RPC messages, and the number of log entries that Raft reports were committed. Your numbers will differ from those shown here. You can ignore the numbers if you like, but they may help you sanity-check the number of RPCs that your implementation sends. For all of labs 2, 3, and 4, the grading script will fail your solution if it takes more than 600 seconds for all of the tests (go test), or if any individual test takes more than 120 seconds.

Handin procedure for lab 2A
First, please run the 2A tests one last time. Then, run make lab2a to upload your code to the submission site.

You may use your MIT Certificate or request an API key via email to log in for the first time. Your API key (XXX) is displayed once you are logged in, and can be used to upload the lab from the console as follows.

$ cd ~/6.824
$ echo "XXX" > api.key
$ make lab2a
Check the submission website to make sure it sees your submission.

You may submit multiple times. We will use your last submission to calculate late days. Your grade is determined by the score your solution reliably achieves when we run the tester.

Part 2B
Implement the leader and follower code to append new log entries, so that the go test -run 2B tests pass.

Run git pull to get the latest lab software.
Your first goal should be to pass TestBasicAgree2B(). Start by implementing Start(), then write the code to send and receive new log entries via AppendEntries RPCs, following Figure 2.
You will need to implement the election restriction (section 5.4.1 in the paper).
One way to fail to reach agreement in the early Lab 2B tests is to hold repeated elections even though the leader is alive. Look for bugs in election timer management, or not sending out heartbeats immediately after winning an election.
Your code may have loops that repeatedly check for certain events. Don't have these loops execute continuously without pausing, since that will slow your implementation enough that it fails tests. Use Go's condition variables, or insert a time.Sleep(10 * time.Millisecond) in each loop iteration.
Do yourself a favor for future labs and write (or re-write) code that's clean and clear. For ideas, you can re-visit our structure, locking, and guide pages.
The tests for upcoming labs may fail your code if it runs too slowly. You can check how much real time and CPU time your solution uses with the time command. Here's typical output:

$ time go test -run 2B
Test (2B): basic agreement ...
  ... Passed --   1.6  3   18    5158    3
Test (2B): RPC byte count ...
  ... Passed --   3.3  3   50  115122   11
Test (2B): agreement despite follower disconnection ...
  ... Passed --   6.3  3   64   17489    7
Test (2B): no agreement if too many followers disconnect ...
  ... Passed --   4.9  5  116   27838    3
Test (2B): concurrent Start()s ...
  ... Passed --   2.1  3   16    4648    6
Test (2B): rejoin of partitioned leader ...
  ... Passed --   8.1  3  111   26996    4
Test (2B): leader backs up quickly over incorrect follower logs ...
  ... Passed --  28.6  5 1342  953354  102
Test (2B): RPC counts aren't too high ...
  ... Passed --   3.4  3   30    9050   12
PASS
ok      raft    58.142s

real    0m58.475s
user    0m2.477s
sys     0m1.406s
$
The "ok raft 58.142s" means that Go measured the time taken for the 2B tests to be 58.142 seconds of real (wall-clock) time. The "user 0m2.477s" means that the code consumed 2.477 seconds of CPU time, or time spent actually executing instructions (rather than waiting or sleeping). If your solution uses much more than a minute of real time for the 2B tests, or much more than 5 seconds of CPU time, you may run into trouble later on. Look for time spent sleeping or waiting for RPC timeouts, loops that run without sleeping or waiting for conditions or channel messages, or large numbers of RPCs sent.
Handin procedure for lab 2B
First, double-check that your code passes the 2B tests, and still passes the 2A tests. Then, run make lab2b to upload your code to the submission site.

You may use your MIT Certificate or request an API key via email to log in for the first time. Your API key (XXX) is displayed once you are logged in, which can be used to upload the lab from the console as follows.

$ cd ~/6.824
$ echo "XXX" > api.key
$ make lab2b
Part 2C
If a Raft-based server reboots it should resume service where it left off. This requires that Raft keep persistent state that survives a reboot. The paper's Figure 2 mentions which state should be persistent.

A real implementation would write Raft's persistent state to disk each time it changed, and would read the state from disk when restarting after a reboot. Your implementation won't use the disk; instead, it will save and restore persistent state from a Persister object (see persister.go). Whoever calls Raft.Make() supplies a Persister that initially holds Raft's most recently persisted state (if any). Raft should initialize its state from that Persister, and should use it to save its persistent state each time the state changes. Use the Persister's ReadRaftState() and SaveRaftState() methods.

Complete the functions persist() and readPersist() in raft.go by adding code to save and restore persistent state. You will need to encode (or "serialize") the state as an array of bytes in order to pass it to the Persister. Use the labgob encoder; see the comments in persist() and readPersist(). labgob is like Go's gob encoder but prints error messages if you try to encode structures with lower-case field names.

Insert calls to persist() at the points where your implementation changes persistent state. Once you've done this, you should pass the remaining tests.

In order to avoid running out of memory, Raft must periodically discard old log entries, but you do not have to worry about this until the next lab.

Run git pull to get the latest lab software.
Many of the 2C tests involve servers failing and the network losing RPC requests or replies.
You will probably need the optimization that backs up nextIndex by more than one entry at a time. Look at the extended Raft paper starting at the bottom of page 7 and top of page 8 (marked by a gray line). The paper is vague about the details; you will need to fill in the gaps, perhaps with the help of the 6.824 Raft lectures.
A reasonable amount of time to consume for the full set of Lab 2 tests (2A+2B+2C) is 4 minutes of real time and one minute of CPU time.
Your code should pass all the 2C tests (as shown below), as well as the 2A and 2B tests.

$ go test -run 2C
Test (2C): basic persistence ...
  ... Passed --   7.2  3  206   42208    6
Test (2C): more persistence ...
  ... Passed --  23.2  5 1194  198270   16
Test (2C): partitioned leader and one follower crash, leader restarts ...
  ... Passed --   3.2  3   46   10638    4
Test (2C): Figure 8 ...
  ... Passed --  35.1  5 9395 1939183   25
Test (2C): unreliable agreement ...
  ... Passed --   4.2  5  244   85259  246
Test (2C): Figure 8 (unreliable) ...
  ... Passed --  36.3  5 1948 4175577  216
Test (2C): churn ...
  ... Passed --  16.6  5 4402 2220926 1766
Test (2C): unreliable churn ...
  ... Passed --  16.5  5  781  539084  221
PASS
ok      raft    142.357s
$ 
Handin procedure for lab 2C
First, double-check that your code passes all the 2A, 2B, and 2C tests. Then, run make lab2c to upload your code to the submission site.

You may use your MIT Certificate or request an API key via email to log in for the first time. Your API key (XXX) is displayed once you are logged in, which can be used to upload the lab from the console as follows.

$ cd ~/6.824
$ echo "XXX" > api.key
$ make lab2c
Please post questions on Piazza.