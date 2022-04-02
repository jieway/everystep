# Lab 3: Fault-tolerant Key/Value Service

Due Part A: Friday April 1 23:59
Collaboration policy // Submit lab // Setup Go // Guidance // Piazza

## Introduction

In this lab you will build a fault-tolerant key/value storage service using your Raft library from Lab 2. 

在本实验中，您将使用实验2中的Raft库构建容错的键/值存储服务。

Your key/value service will be a replicated state machine, consisting of several key/value servers that use Raft for replication. 

您的键/值服务将是一个复制的状态机，由几个使用Raft进行复制的键/值服务器组成。

Your key/value service should continue to process client requests as long as a majority of the servers are alive and can communicate, in spite of other failures or network partitions. 

您的键/值服务应该继续处理客户端请求，只要大多数服务器还活着并且可以通信，尽管存在其他故障或网络分区。

After Lab 3, you will have implemented all parts (Clerk, Service, and Raft) shown in the diagram of Raft interactions.

在实验3之后，您将实现所有部分（Clerk、Service和Raft），如Raft交互关系图所示。

Clients can send three different RPCs to the key/value service: Put(key, value), Append(key, arg), and Get(key). 

客户端可以向键/值服务发送三种不同的RPC。Put(key, value), Append(key, arg), and Get(key)。

The service maintains a simple database of key/value pairs. Keys and values are strings. 

该服务维护一个简单的键/值对数据库。键和值是字符串。

Put(key, value) replaces the value for a particular key in the database, Append(key, arg) appends arg to key's value, and Get(key) fetches the current value for the key. 

Put(key, value) 替换数据库中特定键的值，Append(key, arg) 将arg追加到键的值，Get(key) 获取键的当前值。

A Get for a non-existent key should return an empty string. 

不存在键的获取应该返回一个空字符串。

An Append to a non-existent key should act like Put. Each client talks to the service through a Clerk with Put/Append/Get methods. A Clerk manages RPC interactions with the servers.

不存在键的追加应该像放置一样。每个客户端都通过一个使用Put/Append/Get 方法的Clerk与服务对话。一个Clerk管理与服务器的RPC交互。

Your service must arrange that application calls to Clerk Get/Put/Append methods be linearizable. 

您的服务必须安排对Clerk的应用程序调用获取/放置/追加方法是可线性化的。

If called one at a time, the Get/Put/Append methods should act as if the system had only one copy of its state, and each call should observe the modifications to the state implied by the preceding sequence of calls. 

如果一次调用一个，Get/Put/Append 方法的行为应该就像系统只有其状态的一个副本一样，每个调用都应该观察前面一系列调用所隐含的状态修改。

For concurrent calls, the return values and final state must be the same as if the operations had executed one at a time in some order. 

对于并发调用，返回值和最终状态必须与操作以某种顺序一次执行一个相同。

Calls are concurrent if they overlap in time: for example, if client X calls Clerk.Put(), and client Y calls Clerk.Append(), and then client X's call returns. 

如果调用在时间上重叠，则为并发调用：例如，如果客户端X调用Clerk. put（），客户端Y调用Clerk. Append（），然后客户端X的调用返回。

A call must observe the effects of all calls that have completed before the call starts.

调用必须观察调用开始前完成的所有呼叫的效果。

Linearizability is convenient for applications because it's the behavior you'd see from a single server that processes requests one at a time. 

线性化对应用程序来说很方便，因为你会从一台服务器上看到一次处理一个请求的行为。

For example, if one client gets a successful response from the service for an update request, subsequently launched reads from other clients are guaranteed to see the effects of that update. 

例如，如果一个客户端从服务获得了更新请求的成功响应，那么从其他客户端发起的读取肯定会看到更新的效果。

Providing linearizability is relatively easy for a single server. 

对于一台服务器来说，提供线性化相对容易。

It is harder if the service is replicated, since all servers must choose the same execution order for concurrent requests, must avoid replying to clients using state that isn't up to date, and must recover their state after a failure in a way that preserves all acknowledged client updates.

如果服务被复制，就更难了，因为所有服务器都必须为并发请求选择相同的执行顺序，必须避免使用不最新的状态回复客户端，并且必须在失败后以保留所有已确认的客户端更新的方式恢复状态。

This lab has two parts. In part A, you will implement a key/value service using your Raft implementation, but without using snapshots. 

该实验室由两部分组成。在A部分，您将使用Raft实现实现一个键/值服务，但不使用快照。

In part B, you will use your snapshot implementation from Lab 2D, which will allow Raft to discard old log entries. Please submit each part by the respective deadline.

在B部分，您将使用来自2D实验室的快照实现，这将允许Raft丢弃旧的日志条目。请在各自的截止日期前提交每个部分。

You should review the extended Raft paper, in particular Sections 7 and 8. For a wider perspective, have a look at Chubby, Paxos Made Live, Spanner, Zookeeper, Harp, Viewstamped Replication, and Bolosky et al.

你应该回顾一下扩展的Raft论文，特别是第7节和第8节。为了更广阔的视角，看看胖乎乎的、帕克斯制作的现场、扳手、动物园管理员、竖琴、视标复制和博洛斯基等人。

Start early.
早点开始。

## Getting Started

We supply you with skeleton code and tests in src/kvraft. You will need to modify kvraft/client.go, kvraft/server.go, and perhaps kvraft/common.go.
我们为您提供src/kvft的框架代码和测试。您需要修改kvft/client.go、kvft/server.go，也许还需要修改kvft/common.go.

To get up and running, execute the following commands. Don't forget the git pull to get the latest software.
要启动并运行，请执行以下命令。不要忘记git拉取以获取最新的软件。

  $ cd ~/6.824
  $ git pull
  ...
  $ cd src/kvraft
  $ go test -race
  ...
  ...
  $

## Part A: Key/value service without snapshots (moderate/hard)

Each of your key/value servers ("kvservers") will have an associated Raft peer. 

您的每个键/值服务器（“kvserver”）都有一个关联的Raft对等体。

Clerks send Put(), Append(), and Get() RPCs to the kvserver whose associated Raft is the leader. 

Clerks向其关联的Raft为前导的kvserver发送Put(), Append(), 和 Get() RPC。

The kvserver code submits the Put/Append/Get operation to Raft, so that the Raft log holds a sequence of Put/Append/Get operations. 

kvserver代码向Raft提交放置/追加/获取操作，以便Raft日志保存一系列放置/追加/获取操作。

All of the kvservers execute operations from the Raft log in order, applying the operations to their key/value databases; the intent is for the servers to maintain identical replicas of the key/value database.

所有 kvserver 都按顺序执行Raft日志中的操作，将这些操作应用于它们的键/值数据库；目的是让服务器保持键/值数据库的相同副本。

A Clerk sometimes doesn't know which kvserver is the Raft leader. 

Clerk有时不知道哪个kvserver是Raft领先者。

If the Clerk sends an RPC to the wrong kvserver, or if it cannot reach the kvserver, the Clerk should re-try by sending to a different kvserver. 

如果Clerk将RPC发送到错误的kvserver，或者无法到达kvserver，Clerk应该通过发送到不同的kvserver来重试。

If the key/value service commits the operation to its Raft log (and hence applies the operation to the key/value state machine), the leader reports the result to the Clerk by responding to its RPC. 

如果key/value服务将操作提交到其Raft日志（因此将操作应用到key/value状态机），领先者通过响应其RPC将结果报告给Clerk。

If the operation failed to commit (for example, if the leader was replaced), the server reports an error, and the Clerk retries with a different server.

如果操作未能提交（例如，如果领先者被替换），服务器将报告错误，Clerk将使用不同的服务器重试。

Your kvservers should not directly communicate; they should only interact with each other through Raft.
您的kvserver不应该直接通信；它们应该只通过Raft相互交互。

Your first task is to implement a solution that works when there are no dropped messages, and no failed servers.
您的第一个任务是实现一个解决方案，该解决方案在没有丢弃的消息和失败的服务器时有效。

You'll need to add RPC-sending code to the Clerk Put/Append/Get methods in client.go, and implement PutAppend() and Get() RPC handlers in server.go. 

您需要将RPC发送代码添加到client.go中的Clerk放置/追加/获取方法中，并在server.go.中实现PutAppend（）和get（）RPC处理程序。

These handlers should enter an Op in the Raft log using Start(); you should fill in the Op struct definition in server.go so that it describes a Put/Append/Get operation. 

这些处理程序应该使用Start()在Raft日志中输入一个Op；你应该在server.go中填写Op结构定义，使其描述一个Put/Append/Get操作。

Each server should execute Op commands as Raft commits them, i.e. as they appear on the applyCh. An RPC handler should notice when Raft commits its Op, and then reply to the RPC.

这些处理程序应该使用Start（）在Raft日志中输入一个Op；您应该在server.go中填写Op结构定义，以便它描述一个放置/追加/获取操作。每个服务器应该在Raft提交Op命令时执行它们，也就是说，当它们出现在ApplyCh上时。RPC处理程序应该注意Raft何时提交它的Op，然后回复RPC。
You have completed this task when you reliably pass the first test in the test suite: "One client".
当您可靠地通过测试套件中的第一个测试：“一个客户端”时，您就完成了这项任务。
- After calling Start(), your kvservers will need to wait for Raft to complete agreement. Commands that have been agreed upon arrive on the applyCh. Your code will need to keep reading applyCh while PutAppend() and Get() handlers submit commands to the Raft log using Start(). Beware of deadlock between the kvserver and its Raft library.
- 调用Start（）后，您的kvserver需要等待Raft完成协议。已经同意的命令到达应用程序。当PutAppend（）和get（）处理程序使用Start（）向Raft日志提交命令时，您的代码需要继续读取应用程序。当心kvserver和它的Raft库之间的死锁。
- You are allowed to add fields to the Raft ApplyMsg, and to add fields to Raft RPCs such as AppendEntries, however this should not be necessary for most implementations.
- 您可以将字段添加到Raft ApplyMsg，并将字段添加到Raft RPC（如附录条目），但是这对于大多数实现来说并不是必需的。
- A kvserver should not complete a Get() RPC if it is not part of a majority (so that it does not serve stale data). A simple solution is to enter every Get() (as well as each Put() and Append()) in the Raft log. You don't have to implement the optimization for read-only operations that is described in Section 8.
- kvserver不应该完成一个get（）RPC，如果它不是大多数的一部分（这样它就不会提供陈旧的数据）。一个简单的解决方案是在Raft日志中输入每个get（）（以及每个put（）和Append（））。您不必为第8节中描述的只读操作实现优化。
- It's best to add locking from the start because the need to avoid deadlocks sometimes affects overall code design. Check that your code is race-free using go test -race.
- 最好从一开始就添加锁定，因为避免死锁的需要有时会影响整个代码设计。使用go test-races检查您的代码是否没有竞争。
Now you should modify your solution to continue in the face of network and server failures. One problem you'll face is that a Clerk may have to send an RPC multiple times until it finds a kvserver that replies positively. If a leader fails just after committing an entry to the Raft log, the Clerk may not receive a reply, and thus may re-send the request to another leader. Each call to Clerk.Put() or Clerk.Append() should result in just a single execution, so you will have to ensure that the re-send doesn't result in the servers executing the request twice.
现在，您应该修改您的解决方案，以便在网络和服务器故障时继续。您将面临的一个问题是，Clerk可能不得不多次发送RPC，直到它找到一个回复积极的kvserver。如果一个领导者在向Raft日志提交一个条目后失败，Clerk可能不会收到回复，因此可能会将请求重新发送给另一个领导者。每次调用Clerk. put（）或Clerk. Append（）应该只导致一次执行，因此您必须确保重新发送不会导致服务器执行请求两次。
Add code to handle failures, and to cope with duplicate Clerk requests, including situations where the Clerk sends a request to a kvserver leader in one term, times out waiting for a reply, and re-sends the request to a new leader in another term. The request should execute just once. Your code should pass the go test -run 3A -race tests.
添加代码来处理失败，并处理重复的Clerk请求，包括Clerk在一个术语中向kvserver领导者发送请求，等待回复超时，然后在另一个术语中向新领导者重新发送请求的情况。请求应该只执行一次。您的代码应该通过go测试运行3A竞赛测试。
- Your solution needs to handle a leader that has called Start() for a Clerk's RPC, but loses its leadership before the request is committed to the log. In this case you should arrange for the Clerk to re-send the request to other servers until it finds the new leader. One way to do this is for the server to detect that it has lost leadership, by noticing that a different request has appeared at the index returned by Start(), or that Raft's term has changed. If the ex-leader is partitioned by itself, it won't know about new leaders; but any client in the same partition won't be able to talk to a new leader either, so it's OK in this case for the server and client to wait indefinitely until the partition heals.
- 您的解决方案需要处理一个为Clerk的RPC调用了Start（）的领导者，但在请求提交到日志之前失去了它的领导地位。在这种情况下，您应该安排Clerk将请求重新发送到其他服务器，直到找到新的领导者。一种方法是让服务器通过注意一个不同的请求出现在Start（）返回的索引中，或者Raft的术语发生了变化，来检测它是否失去了领导地位。如果前领导者是自己分区的，它不会知道新的领导者；但是同一分区中的任何客户端也不能与新的领导者交谈，所以在这种情况下，服务器和客户端可以无限期等待，直到分区恢复。
- You will probably have to modify your Clerk to remember which server turned out to be the leader for the last RPC, and send the next RPC to that server first. This will avoid wasting time searching for the leader on every RPC, which may help you pass some of the tests quickly enough.
- 您可能必须修改您的Clerk，以记住哪个服务器是最后一个RPC的领导者，并首先将下一个RPC发送到该服务器。这将避免浪费时间在每个RPC上搜索领导者，这可能有助于您足够快地通过一些测试。
- You will need to uniquely identify client operations to ensure that the key/value service executes each one just once.
- 您需要唯一标识客户端操作，以确保键/值服务只执行一次。
- Your scheme for duplicate detection should free server memory quickly, for example by having each RPC imply that the client has seen the reply for its previous RPC. It's OK to assume that a client will make only one call into a Clerk at a time.
- 您的重复检测方案应该快速释放服务器内存，例如，让每个RPC暗示客户端已经看到了前一个RPC的回复。假设客户端一次只会对办事员进行一次调用是可以的。
Your code should now pass the Lab 3A tests, like this:
您的代码现在应该通过Lab 3A测试，如下所示：
$ go test -run 3A -race
$go测试运行3A比赛
Test: one client (3A) ...
测试：一个客户（3A）...
  ... Passed --  15.5  5  4576  903
...通过--  15.5  5  4576  903
Test: ops complete fast enough (3A) ...
测试：行动完成得足够快（3A）...
  ... Passed --  15.7  3  3022    0
...通过--  15.7  3  3022    0
Test: many clients (3A) ...
测试：很多客户（3A）...
  ... Passed --  15.9  5  5884 1160
...通过--  15.9  5  5884 1160
Test: unreliable net, many clients (3A) ...
测试：不靠谱网，客户端多（3A）...
  ... Passed --  19.2  5  3083  441
...通过--  19.2  5  3083  441
Test: concurrent append to same key, unreliable (3A) ...
测试：并发追加到同一个密钥，不可靠（3A）...
  ... Passed --   2.5  3   218   52
...通过--   2.5  3   218   52
Test: progress in majority (3A) ...
测试：多数进步（3A）...
  ... Passed --   1.7  5   103    2
...通过--   1.7  5   103    2
Test: no progress in minority (3A) ...
测试：少数（3A）无进展...
  ... Passed --   1.0  5   102    3
...通过--   1.0  5   102    3
Test: completion after heal (3A) ...
测试：痊愈后完成（3A）...
  ... Passed --   1.2  5    70    3
...通过--   1.2  5    70    3
Test: partitions, one client (3A) ...
测试：分区，一个客户端（3A）...
  ... Passed --  23.8  5  4501  765
...通过--  23.8  5  4501  765
Test: partitions, many clients (3A) ...
测试：分区，许多客户端（3A）...
  ... Passed --  23.5  5  5692  974
...通过--  23.5  5  5692  974
Test: restarts, one client (3A) ...
测试：重启，一个客户端（3A）...
  ... Passed --  22.2  5  4721  908
...通过--  22.2  5  4721  908
Test: restarts, many clients (3A) ...
测试：重启，许多客户端（3A）...
  ... Passed --  22.5  5  5490 1033
...通过--  22.5  5  5490 1033
Test: unreliable net, restarts, many clients (3A) ...
测试：不可靠网，重启，客户端多（3A）...
  ... Passed --  26.5  5  3532  474
...通过--  26.5  5  3532  474
Test: restarts, partitions, many clients (3A) ...
测试：重启，分区，许多客户端（3A）...
  ... Passed --  29.7  5  6122 1060
...通过--  29.7  5  6122 1060
Test: unreliable net, restarts, partitions, many clients (3A) ...
测试：不可靠的网，重启，分区，许多客户端（3A）...
  ... Passed --  32.9  5  2967  317
...通过--  32.9  5  2967  317
Test: unreliable net, restarts, partitions, random keys, many clients (3A) ...
测试：不可靠的网，重启，分区，随机密钥，许多客户端（3A）...
  ... Passed --  35.0  7  8249  746
...通过--  35.0  7  8249  746
PASS
通行证
ok          6.824/kvraft        290.184s
OK 6.824/kvft 290.184 s
The numbers after each Passed are real time in seconds, number of peers, number of RPCs sent (including client RPCs), and number of key/value operations executed (Clerk Get/Put/Append calls).
每次通过后的数字是以秒为单位的实时数字、对等体数量、发送的RPC数量（包括客户端RPC）和执行的键/值操作数量（Clerk获取/放置/追加调用）。
Part B: Key/value service with snapshots (hard)
B部分：带快照的键/值服务（硬）
As things stand now, your key/value server doesn't call your Raft library's Snapshot() method, so a rebooting server has to replay the complete persisted Raft log in order to restore its state. Now you'll modify kvserver to cooperate with Raft to save log space, and reduce restart time, using Raft's Snapshot() from Lab 2D.
就目前情况而言，键/值服务器不调用Raft库的Snapshot（）方法，因此重启服务器必须重放完整的持久化Raft日志才能恢复其状态。现在，您将修改kvserver以与Raft合作，使用实验室2D中的Raft快照（）来节省日志空间，并减少重启时间。
The tester passes maxraftstate to your StartKVServer(). maxraftstate indicates the maximum allowed size of your persistent Raft state in bytes (including the log, but not including snapshots). You should compare maxraftstate to persister.RaftStateSize(). Whenever your key/value server detects that the Raft state size is approaching this threshold, it should save a snapshot by calling Raft's Snapshot. If maxraftstate is -1, you do not have to snapshot. maxraftstate applies to the GOB-encoded bytes your Raft passes to persister.SaveRaftState().
测试程序将maxraftstate传递给您的StartKVServer（）。maxraftstate表示您的持久Raft状态的最大允许大小（以字节为单位）（包括日志，但不包括快照）。您应该将maxraftstate与per姐进行比较。RaftStateSize（）。每当您的键/值服务器检测到Raft状态大小正在接近此阈值时，它应该通过调用Raft的快照来保存快照。如果maxraftstate为-1，则不必进行快照。maxraftstate适用于Raft传递给per姐的GOB编码字节。SaveRaftState（）。
Modify your kvserver so that it detects when the persisted Raft state grows too large, and then hands a snapshot to Raft. When a kvserver server restarts, it should read the snapshot from persister and restore its state from the snapshot.
修改您的kvserver，以便它检测到持久Raft状态何时变得过大，然后将快照交给Raft。当kvserver服务器重新启动时，它应该从永久服务器读取快照，并从快照恢复其状态。
- Think about when a kvserver should snapshot its state and what should be included in the snapshot. Raft stores each snapshot in the persister object using SaveStateAndSnapshot(), along with corresponding Raft state. You can read the latest stored snapshot using ReadSnapshot().
- 考虑kvserver何时应该快照它的状态，以及快照中应该包含什么。Raft使用SaveStateAndSnapshot（）将每个快照存储在永久对象中，以及相应的Raft状态。您可以使用ReadSnapshot（）读取最新存储的快照。
- Your kvserver must be able to detect duplicated operations in the log across checkpoints, so any state you are using to detect them must be included in the snapshots.
- 您的kvserver必须能够跨检查点检测日志中的重复操作，因此您用于检测它们的任何状态都必须包含在快照中。
- Capitalize all fields of structures stored in the snapshot.
- 将快照中存储的结构的所有字段大写。
- You may have bugs in your Raft library that this lab exposes. If you make changes to your Raft implementation make sure it continues to pass all of the Lab 2 tests.
- 您的Raft库中可能有此实验室公开的错误。如果您对Raft实现进行更改，请确保它继续通过所有实验室2测试。
- A reasonable amount of time to take for the Lab 3 tests is 400 seconds of real time and 700 seconds of CPU time. Further, go test -run TestSnapshotSize should take less than 20 seconds of real time.
- Lab 3测试的合理时间是400秒的实时时间和700秒的CPU时间。此外，go测试运行TestSnapshotSize的实时时间应该少于20秒。
Your code should pass the 3B tests (as in the example here) as well as the 3A tests (and your Raft must continue to pass the Lab 2 tests).
您的代码应该通过3B测试（如这里的示例）以及3A测试（您的Raft必须继续通过Lab 2测试）。
$ go test -run 3B -race
去测试3B
Test: InstallSnapshot RPC (3B) ...
安装快照RPC（3B）
  ... Passed --   4.0  3   289   63
...通过--   4.0  3   289   63
Test: snapshot size is reasonable (3B) ...
测试：快照大小是否合理（3B）...
  ... Passed --   2.6  3  2418  800
...通过--   2.6  3  2418  800
Test: ops complete fast enough (3B) ...
测试：行动完成得足够快（3B）...
  ... Passed --   3.2  3  3025    0
...通过--   3.2  3  3025    0
Test: restarts, snapshots, one client (3B) ...
测试：重启，快照，一个客户端（3B）...
  ... Passed --  21.9  5 29266 5820
...通过--  21.9  5 29266 5820
Test: restarts, snapshots, many clients (3B) ...
测试：重启，快照，许多客户端（3B）...
  ... Passed --  21.5  5 33115 6420
...通过--  21.5  5 33115 6420
Test: unreliable net, snapshots, many clients (3B) ...
测试：不可靠的网络，快照，许多客户端（3B）...
  ... Passed --  17.4  5  3233  482
...通过--  17.4  5  3233  482
Test: unreliable net, restarts, snapshots, many clients (3B) ...
测试：不可靠的网，重启，快照，许多客户端（3B）...
  ... Passed --  22.7  5  3337  471
...通过--  22.7  5  3337  471
Test: unreliable net, restarts, partitions, snapshots, many clients (3B) ...
测试：不可靠的网，重启，分区，快照，很多客户端（3B）...
  ... Passed --  30.4  5  2725  274
...通过--  30.4  5  2725  274
Test: unreliable net, restarts, partitions, snapshots, random keys, many clients (3B) ...
测试：不可靠的网，重启，分区，快照，随机密钥，许多客户端（3B）...
  ... Passed --  37.7  7  8378  681
...通过--  37.7  7  8378  681
PASS
通行证
ok          6.824/kvraft        161.538s
OK 6.824/kvft 161.538s
