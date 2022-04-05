13-01
0-0.06

um maybe maybe we should get started

emmm，我觉得我们应该开始了

0.06-0.11

 um it's been a long time since we've all been in the same place tonight

自从我们在一起上课已经过去了很长一段时间

0.11-0.12

 I hope everybody's doing well

我希望每个人都过的不错

0.12-0.17

 today  I'd like to talk about spanner

今天我想来谈论下Spanner

0.17-0.21

 the reason to talk about this paper is that

我讨论这篇paper的原因是

0.21-0.32

 it's a rare example of a system provides distributed transactions over data that's widely separated that is data that might be scattered all over the internet and different data centers

这是一个很少见的例子，该系统提供了针对分布范围很广的分离数据的分布式事务，这些数据可能分散在整个Internet下不同的数据中心

0.32-0.36

I'm almost never done in production systems

我几乎没有在生产环境下的系统中做过这种东西

0.36-0.39

 of course it's extremely desirable to be able to have transactions

Of course，我们非常想去能够使用事务

0.39-0.40

 the programmers really like it

程序员真的很喜欢这个

0.40-0.49

and also extremely desirable to have data spread all over the network for both for fault tolerance

并且我们也非常想要将数据分散在网络上以获得容错能力

0.49-0.55

 and to ensure that data is near that there's a copy of the data near everybody who wants to use it

以此来确保在每个想要使用该数据的人的附近都有该数据的一份副本

0.55-1.07

and on the way to achieving this spanner used at least two neat ideas

为了去做到这点，spanner使用了至少两个很巧妙的思想

1.07-1.09

one is that they run two-phase commit

其中一点就是，它们使用了两阶段提交

1.09-1.21

 but they actually run it over paxos replicated participants  I'm in order to avoid the problem the two-phase commit that a crashed coordinator can block everyone

但为了避免二阶段提交中因为事务协调器崩溃而导致所有人都被阻塞这一情况，他们在Spanner中使用了Paxos



1.21-1.28

and the other interesting idea is that they use synchronize time in order to have very efficient read-only transactions

另一个令我们感兴趣的想法就是，他们通过同步时间来做到非常高效的只读事务

1.28-1.32

 and the system is that actually been very successful

这个系统实际上非常成功

1.32-1.35

 it's used a lot by many many different services inside of Google

谷歌内部有很多很多服务都使用了Spanner

1.35-1.42

 it's been turned by Google into a product to service for their cloud-based customers 

谷歌将其变为一项产品作为一项服务提供给他们的云客户

1.42-1.47

and it's inspired a bunch of other research and other systems

许多其他研究和系统都受到了它的启发

1.47-1.50

 both sort of by the example

例如

1.50-1.52

 that it's kind of wide area transactions are possible

这使得大范围的事务成为可能

1.52-1.54

and also specifically

特别是

1.54-2.00

there's at least one open source system cockroach DB that uses a lot of explicitly uses a lot of the design

其中一个叫做Cockroach DB的开源系统就很多地方都使用了这些设计

2.02-2.09

the motivating use case the reason that the paper says they first kind of started the design spanner was that 

paper中有提到过，他们一开始设计Spanner的原因是什么

2.09-2.14

they were already had a actually they had many big database systems inside Google

实际上，谷歌内部已经用了很多种大型数据库系统

2.14-2.25

 but their advertising system in particular the data was shorted over many many distinct mysql and BigTable databases

但他们广告系统中的数据过去是存放在很多不同的MySQL和BigTable数据库中的

2.25-2.30

and maintaining that sharding was a just an awkward and manual and time-consuming process

维护这些分片是一个非常费时费力的过程

2.30-2.31

 in addition

此外

2.31-2.40

their previous advertising database system didn't allow transactions that spanned more than a single basically more than a single server 

他们之前的广告系统所使用的数据库系统不支持跨多台服务器上使用事务，只能在单台服务器上使用事务

2.40-2.53

but they really wanted to be able to have to spread their data out more widely for better performance and to have transactions over the multiple shards of the data

但他们想要能够将数据分散到不同的服务器上以获得更好的性能，并且想具备在多个数据分片上使用事务的能力

2.53-2.59

 for their advertising database apparently the workload was dominated by read-only transactions

对于他们广告系统所使用的数据库来说，显而易见，这里的workload是以只读事务为主


2.59-3.00

I mean you can see this in table 6 

你们可以去看下Table 6

3.00-3.08

where the there's billions of read-only transactions and only millions of readwrite transactions

可以看到，上面有数十亿只读事务，读写型事务只有数百万而已

3.08-3.14

 so they're very interested in the performance of read-only of transactions that only do reads

So，他们真的对只读事务（只用于读取数据）的性能很感兴趣

3.14-3.17

and apparently they also required strong consistency 

很明显，他们也需要强一致性

3.17-3.23

and that you know what transactions in particular so they wanted serializable transactions

事务是什么你也知道。So，他们想要顺序地执行事务

3.23-3.27

and they also wanted external consistency

他们也想要获得外部一致性（external consistency）

3.27-3.28

which means that

这意味着

3.28-3.29

 if one transaction commits

如果提交了一个事务

3.29-3.34

 and then after it finishes committing

然后，当它结束提交时

3.34-3.35

 another transaction starts

另一个事务就会开始执行

3.35-3.39

the second transaction needs to see any modification is done by the first 

这第二个事务需要去看到由第一个事务所做的任何修改

3.39-3.49

and this external consistency turns out to be interesting with replicated data 

事实证明，如果我们想去获得外部一致性的能力，那么就要考虑分布式下数据复制相关的问题

3.49-3.50

all right



3.50-3.59

so ownage are just a basic arrangement sort of physical arrangement of their servers that spanner uses

Spanner所使用的服务器物理布局非常普通

3.59-4.07

 it has the its servers are spread over data centers presumably all over the world certainly all over the United States

谷歌的数据中心想必是遍布全球，当然这肯定也遍布美国

4.07-4.11

and each piece of data is replicated at multiple data centers

每份数据都会复制到多个数据中心

4.11-4.21

 so the diagrams got to have multiple data centers let's say there's there's three data centers really there'd be many more oops

So，这里来画张图，图上有多个数据中心，这里我们画3个，实际的数量应该更多


4.27-4.28

so we have multiple data centers

So，我们有多个数据中心

4.28-4.30

then the data shard it

然后，我们将数据进行分片

4.30-4.36

that it's broken up you can think of it has been being broken up by key into and split over many servers

你可以这样想，将数据通过key来进行拆分，并分散到许多服务器上


4.36-4.43

so maybe there's one server that serves keys starting with a in this data center 

So，可能在数据中心1中其中一台服务器保存的是key为a开头的数据

4.43-4.45

or another starting with B

另一台服务器保存的则是key以b为开头的数据


4.45-4.46

and so forth

以此类推

4.46-4.49

lots of lots of sharding with lots of servers

我们通过很多台服务器来保存这些数据分片

4.49-4.49

 in fact

事实上

4.49-4.56

 every data center has on any piece of data is any shard is replicated at more than one data center 

每份数据都会被进行分片并复制备份到多个数据中心中


4.56-5.01

so there's going to be another copy another replica of the a keys and the B keys and so on

So，这里会有另一个关于key为a和b的数据的副本，以此类推

5.01-5.10

the second data center and yet another hopefully identical copy of all this data at the third data center

我们会将所有这些相关数据的副本放在第二个数据中心以及第三个数据中心，这些副本都是完全一样的

5.10-5.11

in addition

此外


5.11*-5.17

 each data center has multiple clients  or their clients of spanner

每个数据中心都有多个Spanner client

5.17-5.21

and what these clients really are as web servers

这些client其实就是web服务器

5.21-5.28

 so if our ordinary human beings sitting in front of a web browser connects to some Google service that uses spanner

So，如果我们坐在电脑前，打开浏览器，去连接某些使用Spanner的谷歌服务

5.28-5.31

they'll connect to some web server in one of the data centers 

他们会连接到其中一个数据中心的某个web服务器上

5.31-5.36

and that's going to be one of these one of these spanner clients

也就是和其中一个Spanner client建立连接

5.36-5.37

all right

5.37-5.43

so that is replicated the replication is managed by Paxos

这些副本（replication）是由Paxos所管理

5.43-5.44

 in fact

事实上

5.44-5.50

 that really a variant of Paxos that has leaders and is really very much like the raft that we're all familiar with

这里它所使用的是Paxos的一种变体，它里面有leader，这和我们所熟悉的raft非常相似



5.50-5.56

and each Paxos instance manages all the replicas of a given shard of the data

每个Paxos实例都管理着一个给定数据分片的所有replica

对于一个给定的数据分片，它都会由一个Paxos实例来管理该数据分片对应的所有replica


5.56-6.05

 so this shard all the copies of this shard form one Paxos group

包含该数据分片的所有replica就组成了一个Paxos组


6.05-6.09

 and all the replicas are this shard form other Paxos was group 

该数据分片（b）的所有replica就组成了另一个Paxos组


6.09-6.12

and within each these Paxos instances  independent

这些Paxos实例都是彼此独立的

6.12-6.19

 as its own leader runs its own version of the instance of the Paxos protocol

每个Paxos组中都有自己的leader，leader所运行的是自己的Paxos协议实例

每个Paxos组都有属于自己的leader，各自维护着独立的数据版本协议

6.19-6.32

the reason for the sharding and for the independent paxos instances per shard is to allow parallel speed-up and a lot of parallel throughput

之所以每个数据分片对应Paxos实例彼此独立，是因为，这样做可以让我们对这些数据并行加速处理，提高了并行吞吐量

6.32-6.35

 because there's a vast number of clients 

因为我们拥有海量的请求client端

6.35-6.38

you know which are representing working on behalf of web browsers 

这些客户端都是以浏览器的形式工作的

6.38-6.42

so this huge number typically of concurrent requests

So，为了应对这种海量的并发请求

6.42-6.53

 and so it pays more immensely to split them up over multiple shards and multiple sort of Paxos groups that are running in parallel 

So，它要付出巨大的代价将这些请求分散到数据分片所在多个Paxos组中，以此来做到对请求的并行处理

6.53-6.56

okay 

6.56-7.00

and you can think of or each of these paxos groups has a leader

你可以想象下，每个Paxos组中都有一个leader

7.00-7.03

a lot like raft

这和raft很像


7.03-7.06

so maybe the leader for this shard  is a replica in datacenter one

So，可能数据中心1的这个服务器是该数据分片所属Paxos组中的leader


7.06-7.12

 and the leader for this shard might be the replica in datacenter two 

数据中心2中这个服务器则是另一个数据分片所属Paxos组的leader

7.12-7.14

and so forth 

以此类推

7.14-7.19

and you know so that means

So，这意味着

7.19-7.22

 that if you need to if a client needs to do a write

如果一个client需要去进行写操作

7.22-7.29

it has to send that write to the leader of the shard whose data it needs to write

它得将这个写请求发送给这个需要处理的这个数据分片所在Paxos组中的leader

7.29-7.32

just with Raft

就和使用Raft一样

7.32-7.36

 these Paxos instances are what they're really doing is sending out a log

这些Paxos实例所做的就是发送日志

7.36-7.40

 the leader is sort of replicating a log of operations to all the followers

leader会将关于操作的日志发送给它所有的follower

7.40-7.44

 and the followers execute that log which is for data is gonna be reads and writes

follower就会去执行这些日志，对于数据来说，就是读取和写入



7.44-7.49

so it executes those logs all in the same order

So，它会以完全相同的执行顺序来执行这些日志记录的操作

7.49-7.53

 all right 



7.53-7.56

so the reason for these for this setup

So，使用这种设置的原因是

7.56-7.59

 the sharding as I mentioned for throughput

正如我提到的那种，这里使用分片是为了提高并行吞吐量

7.59-8.04

 the multiple copies in different data centers is for two reasons 

将数据的多个副本放在不同的数据中心，这样做是有两个原因的

8.04-8.05

one is

其中一个原因是

8.05-8.07

you want copies in different data centers

我们想将数据副本放在不同的数据中心

8.07-8.09

 in case one data center fails

如果其中一个数据中心发生了故障

8.09-8.13

 if you know maybe you power fails to the entire city the data centers in 

你知道的，比如该数据中心所在的城市发生了供电故障

8.13-8.15

or there's an earthquake or a fire or something 

或者发生了地震火灾之类的事情

8.15-8.21

you'd like other copies that other data centers that are maybe not going to fail at the same time

在同一时间，保存着该数据其他副本的数据中心可能并不会发生故障

8.21-8.23

and then you know there's a price to pay for that

你知道，这样做是要付出代价的

8.23-8.30

 because now the paxos protocol now has to talk maybe over long distances to talk to followers in different data centers 

因为我们得通过Paxos协议去和离我们很远的不同数据中心中的follower进行通信

8.30-8.33

the other reason to have data in multiple data centers is

将数据放在多个数据中心的另一个理由是

8.33-8.39

that it may allow you to have copies of the data near all the different clients that use it 

这使得可以让靠近该数据副本的所有不同client去使用该数据

你可以让这些靠近该数据副本的所有不同client去使用该数据

8.39-8.44

so if you have a piece of data that may be read in both California and New York 

So，假设你有一份数据，加利福尼亚和纽约的两个client都要去读取这个数据

8.44-8.49

maybe it's nice to have a copy of that data one copy in California one copy in New York

那么如果在加利福尼亚和纽约各放一个数据副本，这样就会很nice

8.49-8.51

 so that reads can be very fast 

So，这样读取起来就很快

8.51-9.00

and indeed a lot of the focus that design is to make reads from the local the nearest replica both fast and correct

该设计的重点是让当地和离client最近的replica来处理读请求，这样做的话，读取起来既快又准

9.00-9.03

finally

最后

9.03-9.07

 another interesting interaction between Paxos and multiple data centers is that

Paxos与多个数据中心之间存在着一个我们感兴趣的交互

9.07-9.14

paxos like raft only requires a majority in order to replicate a log entry and proceed 

Paxos和raft很像，它只需要得到大多数的支持，以此来对日志条目进行复制并处理

9.14-9.14

and that means

这意味着

9.14-9.17

 if there's one slow or distant or flaky data center

如果我们有一个速度很慢，或者距离很远，或者不是很稳定的数据中心

9.17-9.25

the Paxos system can keep chugging along and accepting new requests even if one data center is is being slow

即使在某一个数据中心速度很慢的情况下，Paxos系统也能继续处理并接收新的请求

9.25-9.28

 all right



9.28-9.34

so with this arrangement  there's a couple of big challenges that paper has to bite off

So，通过这种安排，paper克服了两个巨大的问题

9.34-9.37

 one is they really want to do reads from local data centers 

其中一个问题是，他们真的很想从本地数据中心读取数据

9.37-9.41

but because they're using Paxos

但因为他们使用的是Paxos

9.41-9.47

 and because Paxos only requires each log entry to be replicated on a majority

因为Paxos只需要将每个日志条目复制到大多数follower中即可

9.47-9.50

 that means a minority of the replicas may be lagging

这意味着有少数replica中的数据可能会落后

9.50-9.55

and may not have seen the latest data that's been committed by paxos

它们可能还没有看到由Paxos所提交的最新数据

9.55-9.57

 and that means that

这意味着

9.57-10.01

 if we allow clients to read from the local replicas for speed

如果我们允许client去读取当地replicas中的数据副本来提高速度的话

10.01-10.04

 they may be reading out-of-date data

那么它们所读取到的可能是过时的数据

10.04-10.07

 if their replica happens to be in the minority

如果它们所读取的这个replica是属于少数派的

10.07-10.08

that didn't see the latest updates

那么，它可能不会看到最新的数据

10.08-10.11

 so they have to since they're requiring correctness

因为它们需要的是数据的正确性

10.11-10.15

 they're requiring this external consistency idea

它们需要这种外部一致性的思想

10.15-10.18

 that every read see the most up-to-date data 

即让每次读操作看到的都是最新的数据

10.18-10.23

they have to have some way of dealing with the possibility that the local replicas may be lagging

他们得通过某种方式来处理本地replica上数据的版本有点落后的情况

10.23-10.27  

 another issue they have to deal with is

他们需要去应对的另一个问题是

10.27-10.32

 that a transaction may involve multiple shards and therefore multiple paxos groups

一个事务可能会涉及到多个数据分片，也就是多个Paxos组

10.32-10.40

 so you may be reading or writing a single transaction may be reading or writing multiple records in the database that are stored in multiple shards and multiple Paxos groups

So，这个事务可能要对数据库中的多个记录进行读写，这些记录被保存在多个数据分片和多个Paxos组中

10.40-10.44

so those have to be we need distributed transactions

So，我们需要分布式事务

10.44-10.48

 okay



10.48-10.51

so I'm going to explain how the transactions work

So，接下来我会去讲事务是如何工作的

10.51-10.55

 that's going to be the kind of focus of the lecture

这将会是这节课的重点

10.55-10.58 ！！！！！！

spanner actually treats implements readwrite transactions

实际上，Spanner实现了读写型事务

10.58-11.01

quite differently from read-only transactions

这和只读事务比起来相当不同

11.01-11.05

 so let me start with readwrite transactions which are

So，让我先从读写型事务开始讲起

11.05-11.08

 so have a lot more conventional in their design 

So，在他们的设计中，里面有很多常规性的东西

11.08-11.10

alright 



11.10-11.21

so first readwrite transactions

So，首先来看下读写型事务


11.21-11.29

let me just remind you at a transaction looks like

让我来帮你们回忆下一个事务是啥样的

11.29-11.31

so let's just choose a simple one

So，我们来看一个简单的例子

11.31-11.35

 that's like mimicking bank transfer 

这是一个模拟银行转账的小demo

11.35-11.42

so I'm one of those client machines a client of spanner you'd run some code you run this transaction code

So，假设Spanner的某个client端要去执行这段事务代码

11.42-11.44

 the code would say oh I'm beginning a transaction 

代码就会说，Oh，我要开始执行一个事务

11.44-11.47

and then I would say oh I want to read and write these records

接着，我想对这些记录进行读写

11.47-11.50

 so maybe you have a bank balance in database record X 

So，假设我的银行存款保存在数据库中里的记录x中


11.50-11.57

and we want to you know increment and increase this bank balance and decrease y's bank balance

我们想对x的存款余额进行加一，y的存款余额减一


11.57-11.59

 and oh that's the end of the transaction

到这里我们的事务就结束了

11.59-12.02

 and now the client hopes the database will go off and commit that

Now，client希望数据库可以结束并提交该事务

12.02-12.06

alright



12.06-12.16

so I want to trace through all the steps that that have to happen in order for Spanner to execute this read/write transaction

So，我想去追溯Spanner执行这个读写事务时所必须执行的所有步骤

12.16-12.19

so first of all  there's a client in one of the data centers

So，首先，这里有一个client会连接到其中一个数据中心

12.19-12.21

 that's driving this transaction

它发起了这个事务


12.21-12.23

so I'll draw this client here

So，这里我画了一个client

12.23-12.26

 let's imagine that x and y are on different shards 

假设，x和y是保存在不同数据分片上的



12.26-12.29

since that's the interesting case 

因为我们对这个情况很感兴趣

12.29-12.38

and that those shards each of the two shards is replicated in three different data centers so 

这两个数据分片会被复制到3个不同的数据中心中




12.38-12.40

now we got our three data centers here

这里我们有3个数据中心

12.40-12.57

and at each data center there's a server  that I'm just going to write x for the replicas of the shard that's holding act with the bank balance for x

在每个数据中心，都会有一台用来保存x所对应数据分片服务器，这里我用X来代表保存着账户X银行存款数据分片的replica



12.57-13.02

 and y for the these three servers

Y则代表保存着账户Y银行存款数据分片的replica

13.02-13.09

Spanner wants two-phase commit just to totally stand our two-phase commit and two phase locking 

Spanner想要对两阶段提交和两阶段锁完全支持

13.09-13.17

almost exactly as described in the reading from last week from the 6.033 textbook

这和我们上周在6.033教科书中所看到的几乎完全一样



13.17-13.20

 and the huge difference is

其中一个很大的不同在于

13.20-13.26

 that instead of the participants and the transaction manager being individual computers

这里我们不会使用单独一个服务器来作为参与者和事务协调器

13.26-13.36

 the participants in the transaction manager are Paxos replicated groups of servers for increased fault tolerance 

我们是使用由多台服务器所组成的Paxos组来充当参与者和事务协调器的角色，以此提高容错能力




13.37-13.45

so that means just to remind you that the shard the three replicas of the shard that stores X it's a really Paxos group

So，这是为了提醒你保存着X数据分片的这三个replica是一个Paxos组

13.45-13.47

 same with these three replicas stroring Y 

对于下面保存着Y的三个replica也是同样如此

13.47-13.50

and we'll just imagine that

我们可以想象一下


13.50-13.53

 for each of these one of the three servers is the leader 

每三台服务器中，就有一台会被作为leader使用

13.53-14.00

so let's say the server and data center 2 is the Paxos leader for the X is shard 

So，假设数据中心2中的这台服务器是数据分片X这个Paxos组中的leader


14.00-14.06

and the server in data center 1 is saying one is the Paxos leader for y shard

数据中心1中的这台服务器是数据分片Y所在Paxos组中的leader

14.06-14.07

 okay



14.07-14.09

so the first thing that happens is 

So，这里首先发生的事情是

14.09-14.15

that the client picks a unique transaction ID which is going to be carried on all these messages

client会选择一个唯一的事务id来给它所要发送的所有消息打上标记

14.15-14.20

 so that the system knows that all the different operations are associated with a single transaction

So，这样系统就会根据事务id知道该事务所对应的所有这些不同的操作

14.20-14.23

 the first thing that does the client has to read

client首先要做的就是读取


14.23-14.28

 so despite the way the code looks where it reads and writes X then read and write Y

So，如图所示，尽管代码看起来像是在读取x，然后对x进行写入，接着读取y，再对y进行写入

14.28-14.30

 in fact

事实上

14.30-14.34

 the way the code has transaction code has to be organized it has to do all its reads first

我们得组织一下这段事务代码，它首先得去执行所有的读操作

14.34-14.40

 and then at the very end do all the writes at the same time essentially as part of the commit 

然后在最后同时去执行所有的写操作，本质上这是提交操作的一部分

14.40-14.46

so the clients go to do reads

So，client要去进行读取

14.46-14.46

 it turns out that

事实证明

14.46-14.51

 it in order to maintain locks

为了去维护锁

14.51-14.56

 since just as as in last week's 6033 reading

正如我们在上周6.033阅读材料中读过的那样

14.56-14.59

 every time you read or write a data item 

当你每次要对一个data item进行读取或写入时

14.59-15.05

the server responsible for it has to associate a lock with that data item

负责处理该item的服务器得将一把锁和这个data item关联起来

15.05-15.09

 the locks are maintained the read locks

这些锁的类型是读锁

15.09-15.12

 and spanner maintain only in the Paxos leader

Spanner会在Paxos组的leader处对这些锁进行维护


15.12-15.22

 so when the client transaction wants to read x sends a read X request to the leader of X‘s shard 

So，当client想执行事务时，即它想去读取x，它会向数据分片x所属的Paxos组中的leader发送第一个读请求

15.22-15.27

and that leader of the shard returns the current value of x plus sets a lock on X 

该数据分片所在的Paxos组中的leader会返回x的当前值，并对x加锁

15.27-15.29

of course if the locks already set

Of course，如果该数据已经被加锁了

15.29-15.36

 then you won't respond to the client until whatever transaction currently has the data locked releases the lock by committing

那么只有当前持有该数据所对应的锁的事务提交并释放锁后，我们才能对这个client进行响应

15.36-15.42

and then the leader for that shard sends back the value of x to client

然后，该分片的leader才会将x的值发送给client

15.42-15.43

 the client needs to read Y 

client需要去读取Y

15.43-15.45

got lucky this time

这次运气不错


15.45-15.52

because the assuming like clients in data center one the leaders in the local data center 

假设，client将读请求发送给数据中心1中的leader，该leader就在client附近的本地数据中心

15.52-15.54

so this reads gonna be a lot faster 

So，这样读起来速度就快很多了

15.54-15.59

that reads sets the lock on Y in the Paxos leader and then returns

该Paxos组中的leader会对该数据加上一个读锁，然后将数据返回给client

16.00-16.02

okay's now the clients sent all the reads

Ok，现在client已经将所有的读请求发送完毕了

16.02-16.07

 it does internal computations and figures out the writes that wants to do what values wants to write to x and y 

这个client会在内部进行计算，并弄清楚它想要对x和y写入的值是什么



16.07-16.17

and so now the clients going to send out the updated values for the records that it wants to write

So，client现在会将它要对该记录进行更新的值发送给leader

16.17-16.21

 and it does this all at once at the end towards the end of the transaction 

client会在事务的最后将所有这些写操作一次性提交给Paxos组

16.21-196.24

so the first thing it does is 

So，它（client）首先做的事情是

16.24-16.29

it chooses one of the Paxos those groups to act as the transaction coordinator

它（client）会选择其中一个Paxos组来作为事务协调器使用

16.29-16.33

 and as it chooses us in advance 

它会提前帮我们选出那个作为事务协调器使用的Paxos组

16.33-16.38

and it's gonna send out the identity of the which Paxos group is going to act as the transaction coordinator

它会将作为事务协调器来使用的那个Paxos组的id发送出去


16.38-16.50

 so let's assume it chooses this Paxos group i've split a double box here to say that not only is this server the leader of its Paxos group it's also acting as transaction coordinator for this transaction

So，这里我用两个方框标记的这个Paxos组中的这个服务器，它不仅是该Paxos组的leader，它同时也扮演了该事务的事务协调器的角色

16.50-16.58

 then the client sends out the updated values that it wants to write 

然后，client将它想写入的更新值发送出去


16.58-17.04

so it's going to send a write extra write X request here with a new value and the identity of the transaction coordinator 

So，client会发送一个关于x的写请求给x的leader，该请求中携带了它想写入的新值，以及该事务协调器的id

17.04-17.13

when each the Paxos leader for each written value receives the write request

当每个Paxos组中的leader收到携带写入值的这个写请求时


17.17-17.24

 it sends out a prepare message to its followers and gets that into the Paxos log

它会发送一条prepare消息给它的follower，并将它写入到Paxos的日志中

17.24-17.28

 so that I'll represent that by P into the paxos log

这里我用P表示prepare消息，然后它会被写入Paxos日志中

17.28-17.39-

because it's gonna commit to being able to come it's the wrong word it's promising to be able to carry out this transaction that it hasn't crashed for example and lost its locks 

如果在它没有发生崩溃和丢失锁的情况下，那么它就会能够去执行这个事务

17.39-17.45

so it sends out this prepare message logs the prepare message through paxos

So，leader会将prepare消息发送给该Paxos组中的follower

17.45-17.47

 when it gets a majority of responses from the followers 

当它收到了大多数follower的响应后

17.47-17.55

then this Paxos leader sends a yes to the transaction coordinator 

然后，这个Paxos组中的leader就会发送一个Yes给这个事务协调器


17.55-18.03

saying yes I am a promising to be able to carry out my part of the transaction write to Y

它会说Yes，我能够去执行事务中我负责的这部分任务，并将结果告诉Y（事务协调器）

18.03-18.07

notionally

从概念上来讲


18.07-18.20

 the transaction see the client also sent the value to Y why's paxos leader 

client也会发送一个值给Y所属的Paxos组中的leader

18.20-18.22

and this server acting as paxos leader 

这个服务器扮演着Paxos leader的角色


18.22-18.32

sends out prepare messages to his followers and logs in Paxos those waits for the acknowledgments from a majority 

它会将prepare消息发送给该Paxos组中它的follower，并等待来自大多数follower的确认信息

18.32-18.34

and then you can think of it

那么，你可以想象一下


18.34-18.47

as the Paxos leaders sending the transaction coordinator which is on the same machine maybe the same program a yes vote saying yes I can I can commit

数据分片Y所对应的这个Paxos leader向与X所使用的同一个事务协调器组（当下可能指的就是自己这台服务器）发送了一个Yes，表示它可以去提交事务

18.47-18.48

 okay 



18.48-18.59

so when the transaction coordinator gets responses from all the different from the leaders of all the different shards whose data is involved in this transaction

当事务协调器收到了来自所有涉及该事务的数据分片所属的Paxos组中leader的响应后



18.59-19.03

 if they all said yes，then the transaction coordinator can commit

如果它们回复的都是Yes，那么事务协调器就会去提交这个事务

19.03-19.07

otherwise it can't

否则，它就不会去提交这个事务

19.07-19.09

 let's assume it decides to commit

我们假设，这里事务协调器会去提交该事务


19.09-19.17

at that point the transaction coordinator sends out to the paxos followers a commit message 

此时，事务协调器发给数据分片Y所属的Paxos组中的follower一条commit消息


19.17-19.27

saying look please remember that permanently in the transaction log that we're committing this transaction

并说，我们正在提交这个事务，+请将这个事务落地到日志


19.32-19.39

and it also tells the leaders of the other Paxos those groups involved in the transaction

然后，它也会告诉该事务中所涉及的其他Paxos组的leader，你们可以提交了

19.39-19.41

 then they can commit as well

那么，它们也可以进行提交操作了


19.41-19.48

and  so now this leader sends out commit messages to his followers as well 

So，现在这个leader也给它的follower发送了commit消息

19.48-20.01

as soon as the commits are the transaction coordinator probably doesn't send out the commit message to the other shards until it's committed as safe in the log 

只有当commit安全落地到日志后，事务协调器才会将commit消息发送给其他数据分片的Paxos组

20.01-20.05

so that the transaction coordinator is not guaranteed not to forget its decision 

So，我们会保证事务协调器不会忘记它所做的决定


20.05-20.12

once commits these commit messages are committed into the paxos logs of the different shards

一旦这些commit消息都被提交到了不同shard中的Paxos log日志中

20.12-20.23

each of those shards can actually execute the writes that is place the written data and release the locks on the data items

每个shard就可以去执行这些写操作，将这些数据写入，并释放这些data item上的锁





20.23-20.25

so that other transactions can use them 

So，这样其他事务就可以使用这些数据了

20.25-20.32

and then the transactions over 

那么，事务这块就讲完了





20.33-20.38

so first of all，please feel free to ask questions by raising your hand ，if you have questions

So，首先，如果你们任何问题的话，请不要害羞，你们举手提问就行

20.38-20.44

ok

========================================================









五十九  阅举报
13-02
20.44-20.48

so there's some points to observe about the design so far

So，到目前为止，在该设计中还有一些要点需要注意

20.48-20.51

 which is only covered the readwrite aspect of transactions 

这些只涉及事务的读写方面



20.51-20.54

one is that it's that the locking

其中一点是锁这个方面

20.54-20.57

 that is insuring serializability 

它是用来确保事务执行的有序性

20.57-20.59

that is of two transactions conflict 

如果有两个事务冲突了

20.59-21.01

because they use the same data

因为它们在操作同一个数据对象

21.01-21.04

one has to completely wait for the other releases locks before it can proceed

那么在其中一个事务可以在对该数据对象进行处理之前，它只能等另一个事务将锁释放

21.04-21.17

so it's using so spanners using completely standard two-phase locking in order to get serializability and completely standard two-phase commit to get distributed transactions

So，Spanner使用了完全标准的两阶段锁来获取有序性，并且它也使用了完全标准的两阶段提交来获得使用分布式事务的能力

21.17-21.21

 the two-phase commits widely hated 

很多人都很痛恨两阶段提交这个东西

21.21-21.26

because if the transaction coordinator should fail or become unreachable

如果事务协调器发生了故障或者无法和它进行通信

21.26-21.33

then any transactions it was managing block indefinitely until the transaction coordinator comes back up

那么它所管理的这些事务会一直阻塞下去，直到事务协调器恢复为止

21.33-21.35

 and they block with locks held

这些事务阻塞的时候，还拿着它们执行事务时所要用到的锁

21.35-21.41

 so people have been in general very reluctant to use two-phase commit in the real world

So，人们通常不愿意在现实生活中使用两阶段锁

21.41-21.42

 because it's blocking

因为它会导致阻塞

21.42-21.48

 spanner solves this by replicating the transaction manager

Spanner通过对事务协调器进行复制，解决了这个问题

21.48-21.51

 the transaction manager itself is a Paxos replicated state machine

事务协调器自身就是一个基于Paxos的replicated state machine

21.51-21.53

 so everything it does like for example 

So，比如它所做的事情就是

21.53-21.58

remember whether it's committed or not is replicated into the paxos log

记住，不管这个事务有没有被提交，它都会被复制到Paxos log日志中


21.58-22.02

so if the leader here fails

So，如果这里的leader崩溃了（指用双方框圈起来的Y）

22.02-22.05

even though it was managing the transaction

虽然它之前管理着事务

22.05-22.07

 because it's raft replicated

因为这里是使用的是和raft一样的复制行为


22.07-22.12

either of these two replicas can spring to life take over leadership

那么这两个replica中的任意一个都能去接手leader的工作

22.12-22.15

 and also take over being the transaction manager 

同时也能去接手事务协调器的工作

22.15-22.19

and they'll have in their log， if it's the transaction manager decided to commit

如果事务协调器决定去提交事务，那么它们在它们自己的log日志中就能看到这条commit消息

22.19-22.30

any leader that takes over will see a commitment it's log and be able to then tell the other right away tell the other participants and two-phase commit that look oh this transaction was committed

不管该Paxos组中剩下的哪个服务器接手了leader的工作，它就会在它的日志中看到这条提交信息，并能够告诉其他参与者该事务已经被提交

22.30-22.37

 so this effectively eliminates the problem a two-phase commit that it can block with locks held if there's a failure

So，这有效地消除了两阶段提交所带来的问题: 即如果事务协调器在持有锁的情况下发生故障导致阻塞的问题

22.37-22.39

 this is a really big deal

这是一个很重要的手段

22.39-22.48

 because this problem basically makes two-phase commit otherwise completely unacceptable for any sort of large-scale system that has a lot of parts that might fail

因为这个问题基本上使两阶段提交对于其他任何可能遇上很多部分故障的大型系统来说都是完全不可接受的

22.48-22.51

 the other another thing to note is

另一件要注意的事情是


22.51-22.56

 that there's a huge amount of messages on in this diagram here

这张图上消息请求响应的数量实在是太多了

这张图上存在着大量的消息来往

22.56-22.59

 and that means that

这意味着

22.59-23.02

 many of them are across data centers

其中很多消息都是跨数据中心的

23.02-23.10

 and said the some of these messages that go between the shards or between a client and a shard whose leaders in another data center may take many milliseconds

这种数据分片Paxos组之间的消息来往或者是和离client较远的数据中心中的Paxos组leader之间的消息来往，可能会花费很多时间

23.11-23.16 

and in a world in which you know computations take nanoseconds

你知道的，在现实生活中，这些计算只需数纳秒就完事了

23.16-23.20 #######################

this is potentially pretty grim expense

如果要花很多毫秒才能处理完，那么这就是一笔不小的成本


23.20-23.26

and indeed you can see that from in table six

你们在paper中的table 6中可以看到

23.26-23.28

and table six if you look at it 

如果你们看下table 6

23.28-23.33

it's describing the performance of a spanner deployment

它描述的是Spanner部署后的性能

23.33-23.38

where the different replicas are on different sides of the United States I east and west coast 

Well，不同的replica会在美国的不同地区，比如东海岸和西海岸

23.38-23.43

and it takes about a hundred milliseconds to do complete a transaction

那它就得花100毫秒才能完成这个事务

23.43-23.47

where the different replicas involved are on different coasts 

该事务中所涉及的不同replica都位于不同的地方（比如：东海岸和西海岸）

23.47-13.49

that's a huge amount of time it's a tenth of a second 

那么这就得花很长一段时间了，也就是0.1秒

23.49-23.52

there's maybe not quite as bad as it may seem

这可能并没有我说的这么糟糕

23.52-23.58

because the throughput of the system since it's sharded and it can run a lot of non conflicting transactions in parallel

因为这里数据都被分好片了，并且系统可以同时并行执行很多无冲突的事务

23.58*-24.00

 the throughput may be very hard high 

那么吞吐量可能就会非常高

24.00-24.03

but their delay for individual transactions very significant

但对于单个事务的延迟来说就会非常明显

24.03-24.07

 I mean a hundred milliseconds is maybe somewhat less than a human is going to notice 

我的意思是，对于人们来说，他们可能并不会注意到这100毫秒的延迟

24.07-24.09

but if you have to do a couple of them

但如果你要执行其中两个事务

24.09-24.12

 to just say generate a webpage or carry out a human instruction

比如，生成一个网页或者执行我们所发出的一条指令

24.12-24.15

 it's starting to be amount of time whoops

执行这些消耗比较多时间的操作

24.15-24.18

you noticeable start to be bothersome

你就会对此感到烦躁，速度太慢了

24.18-24.20

on the other hand

另一方面

24.20-24.21

 for I think

我认为

24.21-24.24

 I suspect from many uses of spanner 

对于Spanner的多种用途来说

24.24-24.28

all the replicas might be in in the same city or sort of across town

它们的所有replica可能是放在同一个城市或者是跨镇

24.28-24.30

 and they're the much faster times 

它们的速度会更快

24.30-24.33

that you can see in Table three are relevant

你可以在table 3中看到这些相关信息


24.33-24.39

 in the Earth's Table three shows that it can complete transactions where the data centers are nearby in

table 3向我们展示了邻近数据中心完成事务的执行时间

24.39-24.43

 all right you know I think it's 14 milliseconds instead of 100 milliseconds 

All right，我觉得这里执行一个事务所需要花费的时间是14毫秒而不是100毫秒

24.43-24.44

so that's not quite so that

So，这并没有我想象的那么糟糕

24.44-24.50

nevertheless these read/write transactions are slow enough 

但是这些读写型事务的执行速度还是很慢

24.50-24.55

that we'd like to avoid the expense if we possibly can

我们想尽可能避免这种开销

24.55-24.59

 so that's going to take us to read-only transactions

So，这就会让我们转向只读事务

24.59-25.01

 it turns out that if you're not writing

事实证明，如果我们不进行写操作

25.01-25.06

 that is if you know in advance that all of the operations in a transaction are guaranteed to be reads 

如果我们能提前知道该事务中所有的操作都是读操作的话

25.06-25.16

then spanner has a much faster much more streamlined much less massive message intensive scheme for executing read-only transactions

那么对于执行只读事务来说，Spanner就能使用速度更快，更加精简，并且不用发送那么多消息的方案了

25.16-25.20

okay

================================================================

25.20-25.24

 so read-only transactions 

So，我们来讲只读事务

25.24-25.29

start a new topic

我换一张纸来讲这个主题

25.29-25.34

 the reader only transactions work although they rely on some information from readwrite transactions to

只读事务的工作方式是依赖于读写型事务中的一些信息

25.34-25.40

 designs quite different from the read of the readwrite transactions

它的设计和读写型事务中的读操作部分是相当不同


25.40-25.47

 in spanner，it eliminates two big costs

在Spanner中，它消除了两种巨大的成本消耗问题

25.47-25.54

 and its read-only transaction design eliminates two of the costs that were present and readwrite transactions

Spanner中这种只读事务的设计消除了读写型事务中存在的两种成本消耗问题

25.54-25.55

 first of all as I mentioned

首先，正如我提到的那样

25.55-25.57

 it reads from local replicas

它是从本地replica中读取数据

25.57-26.05

and so if you have a replica as long as there's a replica the client needs the transaction needs in the local data center

如果你有一个replica，只要该replica是该client以及事务执行所需要的，并且它在本地数据中心

26.05-26.07

 you can do the read and from that local replica 

那么你就可以从本地replica中读取数据

26.07-26.15

which may take a small fraction of a millisecond to talk to instead of maybe dozens of milliseconds if you have to go cross country

如果从本地replica处读取数据，那么所花时间可能不到1毫秒。如果是跨国读取数据，那么所花的时间就是数十毫秒

26.15-26.16

 so it can read from local replicas 

So，它可以从本地replica处读取数据

26.16-26.17

but note 

但要注意的是

26.17-26.20

you know again a danger here is

此处的风险在于

26.20-26.22

 that any given replicas may not be up-to-date 

任何给定的replica中的数据可能都不是最新的

26.22-26.24

so there has to be a story for that

So，这里面就有些内容要讲了

26.24-26.29

and the other big savings and the read-only design 

只读事务的设计所解决的另一个问题是

26.29-26.30

is that it doesn't use locks

它并没有使用锁

26.30-26.31

 it doesn't use two-phase commit

它也没有使用两阶段提交

26.31-26.34

 I mean that doesn't need a transaction manager

我的意思是，它不需要使用事务管理器进行管理

26.34-26.42

 and this tvoids things like cross data center or inter data center messages to Paxos leaders 

这就可以避免跨数据中心读取数据，即避免将读请求发送给跨数据中心的Paxos组leader来处理这个事务

26.42-26.50

and because no locks are taken out not only does that make the read-only transactions faster but it avoids slowing down read write transactions

因为这里没有使用锁，这不仅可以让只读事务速度更快，也可以避免降低读写型事务的执行速度

26.50-26.53

because they don't have to wait for locks held by read-only transactions

因为它们不需要去等待由只读事务所持有的锁

26.53-26.57

 now I mean just to kind of preview why this is important to them

现在我们来看一下，为什么这点对它们来说很重要



26.57-27.05

tables 3 & 6 show a ten times latency improvement for read-only transactions compared to readwrite transactions

从table 3和6上可以知道，与读写型事务相比，只读事务在延迟方面改善了10倍之多

27.05-27.16

so the main only design is submit factor ten boost in latency and much less complexity is almost certainly far more throughput as well

So，该设计中最重要的一点是，它在延迟方面改善了10倍左右，并且降低了复杂性，大大提高了吞吐量

27.16-27.26  ！！！！！！！

 and the big challenge is going to be how to square the you know read-only transactions don't do a lot of things that were required the read/write transactions to get serializeability 

这里最大的挑战在于，你知道的，只读事务所做的事情并不多，不像我们会要求读写型事务的执行要保证有序

27.26-27.33

so we  need to find a way to kind of square this increased efficiency with correctness 

So，我们需要在保证正确性的情况下去提升效率

27.33-27.43

and so there's really two main correctness constraints that they wanted to have read-only transactions imposed

So，他们想在只读事务中主要引入两个正确性约束

27.43-27.44

 the first is 

第一个正确性约束是

27.44-27.47

that they like all transactions they still need to be serializable 

他们想让所有事务的执行依然是有序的（知秋注：因为我们要考虑前面是否有读写型事务，其实这和指令重排序一个道理）


27.47-27.51

and what that means is that

这意味着

27.51-28.00

even though just a review even though the system may execute transactions concurrently in parallel 

即使这个系统会同时并行执行很多事务

28.00-28.10

the results that a bunch of concurrent transactions must yield both in terms of sort of values that they return to the client and modifications to the database

这些并发事务执行所生成的结果，它们既得将这些结果返回给client，也得将这些修改落地到数据库

28.10-28.20

 the results of a bunch of concurrent transactions must be the same as some one at a time or serial execution of those transactions

这些并发执行的事务所生成的结果必须和一次或者连续执行这些事务时所得到的结果一致

28.20-28.24

 and for read-only transactions 

对于只读事务来说

28.24-28.26

what that essentially means is 

这意味着

28.26-28.39

that the an entire all the reads of a read-only transaction must effectively fit neatly between all the writes of a bunch of transactions that can be viewed as going before it

一个只读事务的所有读操作可以看到在它执行之前的那个事务中的所有写操作所执行的结果

28.39-28.45

and it must not see any of the writes of the transactions that we're going to view as it's going after it

它必然无法看到任何在它之后所执行事务中的任何写操作所执行的结果

28.45-28.52

so we need a way to sort of fit to read all the reads of a transaction read-only transaction kind of neatly between readwrite transactions 

So，我们需要通过一种方法来将一个只读事务的所有读操作都放在读写事务的中间

So，我们需要通过一种方法来将一个夹在两个读写事务之间的只读事务的所有读操作都放在这两个读写事务中间

28.52-29.02

well the other big constraint that the paper talks about is that they want external consistency 

Well，paper中所讨论的另一个主要约束就是他们想要获取外部一致性的能力



29.02-29.05

and what this means

这意味着什么呢？


29.05-29.16

it's actually equivalent to linearizability that we've seen before

这实际上等同于我们以前看过的线性一致性

29.16-29.17

what this really means is that

这意味着

29.17-29.20

 if one transaction commits finishes committing

当一个事务结束提交后

29.20-29.27

 and another transaction starts after the first transaction completed in real time

当第一个事务结束后，另一个事务就会实时开始执行

29.27-29.33

 then the second transaction is required to see the writes done by the first transaction

那么我们就会要求第二个事务能够看到由第一个事务所做的所有写操作的结果

29.33-29.39

 another way of putting that is that transactions even read-only transactions should not see stale data

另一点就是这些事务，甚至是只读事务不应该看到过时的数据

29.39-29.45

and if there's a committed write from a completed transaction

如果在这个已完成的事务中有已经提交的写操作存在

29.45-29.49

that's prior to the readonly transaction prior to the start of the read-only transaction

那么它应该出现在只读事务执行之前

29.49-29.52

the read-only transaction is required to see that write

我们要求这个只读事务看到这个写操作所做的修改

29.52-29.59

 ok so this is actually none of neither of these is particularly surprising

Ok，实际上这里并没有什么令我们感到惊奇的地方

29.59-30.10

 but standard databases like MySQL or something for example can be configured to provide this kind of consistency 

但我们可以通过配置诸如MySQL这样的标准数据库来获得这种一致性（外部一致性）

30.10-30.20

so in a way it's sort of the consistency that if you didn't know better， this is exactly the consistency that you would expect of a straightforward system

So，如果你并不了解这些一致性的话，其实准确地来讲，这种一致性就是我们想在一个简单的系统中所获得的那种一致性

30.20-30.29

 and in the you know have it but it makes programmers lives it makes it much easier to produce correct answers

通过这种外部一致性，能让程序更容易生成正确答案

30.29-30.31

in otherwise you don't have this kind of consistency 

否则，如果你不具备这种一致性的话

30.31-30.37

then the programmers are responsible for kind of programming around whatever anomalies the database may provide 

那么程序员就得对数据库所可能提供的任何异常情况进行处理

30.38-30.42

so this is like a night this is sort of the gold standard of correctness

So，这就是正确性方面的黄金守则

30.42-30.43

okay



30.43-30.51

so let's I want to gonna talk about how read-only transactions work it's a bit of a complex story 

So，我接下来想去讨论在复杂场景下只读事务是如何工作的

30.51-30.54

so I think what I'd like to talk about first is

So，我觉得我首先要讲的东西是

30.54-31.08

 to just consider what would happen if we did just absolutely the stupidest thing and had the read-only transactions not do anything special to achieve consistency but just read the very latest copy of the data

思考一下，如果我们做了件非常愚蠢的事情，即我们没有对只读事务做任何处理导致我们不具备一致性，但它读取的还是该数据对象最新的副本，那么这会发生什么呢？

31.08-31.10

 so every time I read only transaction does a read

So，当每次只读事务执行一次读操作的时候

31.10-31.20

 we could just  have it look at the local replicas and find the current most up-to-date copy of the data 

我们会让它从本地replica中读取当前最新的数据副本

31.20-31.24

and that would be very straightforward very low overhead

这样做起来非常简单，而且开销很低

31.24-31.26

so we need to understand why that doesn't work

So，我们得需要理解它这里为什么不奏效


31.26-31.38

in order so this is a so why not read the just a the latest value 

So，这里为什么读取到的不是最新的值


31.38-32.00

and so maybe we'll imagine that the transaction is a transaction that simply reads x and y and prints them finance read-only  I'm going to print Y I'll just print X comma Y

So，假设我们这里有一个只读事务，这里我们就只是去读取x和y的值，然后将它们的值打印出来



32.00-32.02

okay 



32.02-32.05

so all I want to show you an example of a situation

So，我想向你们展示一个场景

32.05-32.14

 in which read-only this transaction is just simply be the latest value yields incorrect not not serializable results 

即只读事务读取到的最新值并不是正确的结果，它和顺序执行所读取到的值并不相同

33.14-32.16

so suppose we have three transactions running

So，假设我们正在执行三个事务


32.16-32.21

 t1 t2 t3

T1，T2以及T3

32.21-32.28

t3 is going to be R transaction t1 and t2 or transactions that are our read/write transactions 

T3是一个只读事务，T1和T2是我们的读写型事务

32.28-32.38

so let's say that t1 write x and write y and then commits and you know maybe it's a bank transfer operation 

So，T1中，我们对x和y进行写入操作，然后提交。你知道的，这可能是一个银行转账操作

32.38-32.40

so it's transferring money from X to Y

So，这里将钱从x的账户转移到y的账户

32.40-32.44

 and we're printing x and y because we're doing an audit of the bank try to make sure it hasn't lost money

这里我们要打印出x和y的值，因为我们得对账户进行审计以确保银行没有丢钱


32.44-32.54

let's imagine that transaction 2 also does another transfer between balances x and y  and then commits

我们想象一下，假设T2也执行了另一次x和y间的转账操作，然后提交事务

32.54-32.59

 and now we have R transaction transaction t3 it needs to read x and y

现在，我们有一个负责读的事务T3，它需要去读取x和y的值

32.59-33.01

 so it's gonna have a read of X

So，它会去读取x的值


33.01-33.04

 let's say the read of X happens at this point in time 

假设它是在此时对x进行读取

33.04-33.11

and so I'm the way I'm drawing these diagrams is that real time moves to the right wall clock time

So，我画这些图的方式是按照时间向右走的顺序画的


33.11-33.14

 you'd see on your watch moves to the right 

你们可以看到时间是往右走的

33.14-33.20

so the read of X happens here after transaction 1 completes before transaction 2 starts

So，T3中对x的读取操作是发生在T1结束后T2开始前这段时间内

33.20-33.23

and let's say T 3 is running on a slow computer 

假设T3在一台速度很慢的机器上执行

33.23-33.27

so it only manages to issue the read of Y much later

So，T3是在很后面的时候才对y进行读取

33.27-33.30

 so the way this is gonna play out is 

So，这里所发生是


33.30-33.35

that transaction 3 will see the Y value that t1 wrote 

T3会看到由T1所写入的y值（其实应该是x）


33.35-33.40

but the x value that t2 wrote

但它所读取到的x值则是T2写入的（其实应该是y）

33.40-33.48

assuming it uses this dubious procedure of simply reading the latest value that's in the database

假设它通过这个很简单的过程来读取数据库中最新的值

33.48-33.53

 and so this is not serializable

So，这些执行是无序的

33.53-34.06

 because well we know that any serial order that could exist must have t1 followed by t2 

因为我们知道任何可能存在的有序执行顺序必然是T1执行完，然后T2再去执行

34.06-34.08

there's only 2 places T3 go 

这里只有两处地方可以放入T3


34.08-34.11

so t3 could go here

So，T3可以放在T1和T2之间


34.11-34.14

but T3 can't fit here

但T3不能放在这里

34.14-34.17

 because if t3 was second in the equivalent serial order 

因为如果T3是放在执行顺序中的第二个位置的话

34.17-34.20

then it shouldn't see writes by t2 which comes after it 

那么它就不应该看到在它之后T2所写入的值了


34.20-34.24

it should see the value of Y produced by t1

它所看到的应该是由T1所产生的y值

34.24-34.25

 but it doesn't right

但它并没有看到

34.25-34.29

 it see the value produced  by t2 

它所看到的是由T2生成的y值

34.29-34.33

so this is not an equivalent this serial order wouldn't produce the same results

So，这就和我们的预期不符，这个执行顺序所生成的结果和我们想的并不一致


34.33-34.36

the only other one available to us is this one 

唯一符合我们要求的就是这个执行顺序

34.36-34.44

this serial order would get the same value for y that t3 actually produced 

这个执行顺序所产生的结果和T3实际生成的y值相同

34.44-34.46

but if this was the serial order 

如果我们的执行顺序是这个执行顺序

34.46-34.48

then t3 should have seen the value written by t2 

那么，T3就应该能看到由T2所写入的值

34.48-34.51

but it actually saw the valuable written by t1

但它实际看到的是由T1所写入的值

34.51-34.56

 so this execution is not equivalent to any one at a time serial order

So，该执行所产生的结果和我们所说的任意执行顺序所产生的结果都不一样


34.56-35.05

 so this is like there's something broken about reads simply reading the latest value

So，这里面肯定有东西导致我们没法简单地读取最新的值

35.05-35.07

 so we know that doesn't work 

So，我们知道这种方式并不奏效

35.07-35.21

you know what we're really looking for of course is that either the R transaction either reads the both values at this point in time or it reads both values at this point in time

你知道的，我们想做的就是让这个只读事务要么在T1和T2之间执行完毕，要么就在T2之后开始执行

35.21-35.24

 okay 



35.24-35.38

so the approach that Spanner taste of  this it's a somewhat complex 

So，Spanner解决这个问题所采用的方式有点复杂

35.38-35.41

the first big idea is

首先，第一个重要的思路就是

35.41-35.43

an existing idea

这是一个已知的思路


35.43-35.44

it's called snapshot isolation

它叫做快照隔离（snapshot isolation）

35.44-35.59

and the way I'm gonna describe this is 

我会这样描述它

35.59-36.05

that let's imagine that all the computers involved had synchronized clocks

假设，所有参与的机器上都有一个同步时钟

36.05-36.11

 that is you know they all have a clock the clock yields us or wall clock time

它们都有一个时钟，通过时钟为我们生成时间（知秋注：各个时钟间时间是同步的）

36.11-36.17

 like oh it's 143 in the afternoon  on April 7th 2020

比如，2020年4月7日下午1点43分

36.17-36.20

 so that's what we mean by a wall clock time a time

So，这就是所谓的时钟时间

36.20-36.27

so it's assumed that all the computers assume even though this isn't true that all the computers involved have synchronized times

虽然我的说法不一定正确，但假设所有参与事务的机器上的时间都是同步的

36.27-36.28

 furthermore

此外

36.28-36.25

 let's imagine that every transaction is assigned a particular time a time stamp

假设，我们给每个事务都分配了一个特定的时间，即一个时间戳


36.25-36.48

and timestamps  their wall clocks times taken from these synchronized clocks 

这个时间戳是由它们上面的同步时钟那里拿到的



36.48-36.50

for readwrite transaction 

对于读写型事务来说


36.50-37.00

its timestamp is I'm going to say just for this simplified design is the real time at at the commit

在这个简单案例中，它的时间戳就是事务提交的时间




37.00-37.09

and for read for a or at the time at which the transaction manager starts the commit 



37.00-37.16

and for read-only transaction the timestamp is equal to the start time

对于只读事务来说，它的时间戳就是事务开始的时间

37.16-37.19

 all right read only transaction has the time

So，只读事务的时间戳就是事务开始的时间

37.19-37.33

 and we're gonna design our system or a snapshot isolation system gets is designed to execute as if to get the same results as if all the transactions had executed in timestamp order

我们想去设计这样一个snapshot isolation系统，即如果所有的事务都是按照时间戳顺序执行，那么它们所生成的结果都是一样的

37.33-37.37

 so we're going to assign the transactions each transaction a timestamp

So，我们会为每个事务都分配一个时间戳

37.37-37.39

 and then we're going to arrange the executions

然后，我们会根据时间戳来对事务的执行顺序进行安排

37.39-37.44

 so that the transactions gets the results as if they had executed in that order

So，如果我们是按照时间戳的顺序来执行事务，那么事务就会得到正确的执行结果

37.44-37.51

 so given the timestamps we sort of need to have an implementation that will kind of easily honor the timestamps 

So，我们需要实现一种实现方式，即遵守时间戳的顺序来执行事务

37.51-37.59

and basically you know show each transaction the data sort of as it existed at its timestamp

简单来讲，每个事务中所涉及的数据都会有它自己的时间戳

37.59-38.00

 okay 

===================

38.00-38.09

so the way that this works for read-only transactions is 

So，这里只读事务的工作方式是

38.09-38.14

that each replica when it stores data it actually has multiple versions of the data

当每个replica保存数据时，实际上它保存了该数据的多个版本

38.16-38.20

so we have a multiple version database

So，我们有一个多版本的数据库



38.20-38.26

every database record has you know maybe if it's been written a couple times 

如果我们对每条数据库记录多次写入

38.26-38.30

it has a separate copy of that record for each of the times it's been written

它会在每次写入每条记录时，保存该记录的单独副本

38.30-38.36

each one of them associated with the timestamp of the transaction that wrote it 

它们中的每个副本都是和写入这些副本的事务的时间戳相关联的

38.36-38.43

and then the basic strategies that

这里的基本策略是

38.43-38.46

 read only transactions when they when a read-only transaction does a read

当只读事务执行读操作时

38.46-38.52

 it's already allocated itself a timestamp，when it started

当该事务开始执行的时候，它就已经给它自己分配了一个时间戳

38.49-38.56

 and so it accompanies its read request with its timestamp

So，当它发送读请求时，它会让读请求携带一个时间戳

38.56-39.04

and the whatever server that stores the replicas of the data that the transaction needs

不管是哪台服务器保存了该事务所涉及数据的副本

39.04-39.17

 it's going to look into its multi version database and find the record that's being asked for that as the highest time that's still less than the timestamp specified by the read-only transaction

它都会去这个多版本数据库中查看并找到它所要的那条记录，这条记录的时间戳得是最新的时间，但这条记录的时间戳要比该只读事务所指定的时间戳要小

39.17-39.25

so that means to be the read-only transaction sort of sees data that is data as of the time as up it's time chosen timestamp

So，这意味着，只读事务会根据发起的时间来读取时间戳最新的那个数据


39.25-39.28

 okay 



39.28-39.37

so this is for this snapshot isolation idea works for read-only transactions or spanner uses it for read-only transactions

So，Spanner使用这种snapshot isolation的思路来解决只读事务所存在的问题

39.37-39.45

Spanner  still uses two-phase locking and two-phase commit for readwrite transactions

在读写型事务方面，Spanner依然用的是两阶段锁和两阶段提交来解决问题

39.45-39.49

 and so the readwrite transactions allocate timestamps for themselves a commit time

So，读写型事务会给它们自己分配一个时间戳，这个时间戳就是该事务的提交时间（知秋注：因为它是独占性的，在事务提交时设定一个时间戳即可）

39.49-39.53

but other than that， they work in the usual way with locks and two-phase commit 

但除此之外，它们的工作方式还是使用锁以及二阶段提交



39.53-40.08

where's the read-only transactions access multiple versions in the database and get the version that's you know written by the has the timestamp that's highest  that's still less than the read-only transactions timestamp

对于只读事务来说，它会去访问数据库中该数据对象的多个版本，并去获取时间戳最高的那个版本，但这个时间戳要比只读事务的时间戳低

40.09-40.10

and where this is going to get us is that

这会给我们带来，

40.10-40.17

 you know read-only transactions will see all the writes of readwrite transactions with lower timestamps 

你知道的，只读事务会看到读写型事务中所有时间戳较老的写操作所做的结果

40.17-40.21

and none of the rights of read/write transactions with higher timestamps

而不是读写型事务中那些时间戳较新的写操作所做的结果

40.21-40.36

okay so how would snapshot isolation work out for our example that I had here before 

Ok，snapshot isolation该如何解决我们之前的问题呢？

40.36-40.41

in which we had a failure of serializability

即内部操作在要符合事务间执行顺序的问题

40.41-40.55

because reading  transaction read values that were not between any two other read/write transactions

因为那个读取事务读取数据的时间点并不在其他两个读写型事务之间

四十九  阅举报
13-03
40.55-41.02

okay so this is an our example but with snapshot isolation

Ok，这是一个使用了snapshot isolation的例子

41.02-41.14

I'm showing you this to show that the snapshot isolation technique solves our problem causes the read-only transaction to be serializable

通过这个例子来展示快照隔离技术是如何解决只读事务的顺序执行问题


41.14-41.18

 so again we have these two readwrite transactions t1 and t2 

So，这里我们有两个读写型事务T1和T2


41.18-41.22

and we have our transaction that's a read-only transaction

我们还有另一个只读事务T3


41.22-41.32

 t1 and t2 right as before they write and they commit 

T1和T2会进行写操作，然后提交事务


41.32-41.40

but now they're allocating themselves timestamps as of the commit time

但现在，它们会在提交事务的时候给它们自己分配一个时间戳

41.40-41.43

 so in addition， to using two-phase commit and two-phase locking

So，此外，为了使用二阶段提交和二阶段锁

41.43-41.46

 these read/write transactions allocate a timestamp

Spanner就给这些读写型事务分配了一个时间戳


41.46-41.47

 so let's imagine that 

So，我们想象一下

41.47-41.53

at the time of the commit T1 looked at the clock and saw that it the time was ten

在提交事务的时候，T1看了下时间，它发现提交的时间是10点

41.53-41.57

 I'm gonna use times of ten and twenty and whatnot 

这里我就使用10点20分作为提交时间

41.57-42.02

but you know you should imagine times as being real times like four o'clock in the morning on a given day 

但你知道的，这里所使用的时间应该是真实时间，比如某一天的早上四点

42.02-42.07

so let's say that T one sees the time as 10 when it committed 

So，假设，当我提交T1时，T1所看到的时间是10点


42.07-42.13

and T 2 sees that the commit time the time was 20

T2看到的提交时间则是20点

42.13-42.16

 so I'm gonna write these transactions chosen timestamp after the @ sign

So，我们在这些事务的@符号后面写下它们的时间戳

42.16-42.35

then the database storage systems the Spanner storage systems are going to store when transaction 1 does its writes they're gonna store a new sort of not instead of overwriting in the current value they're just gonna add a new copy of this record with the timestamp 

So，当T1执行完它的写操作时，Spanner存储系统并不会将旧值用新值覆盖，而是去添加该记录的一个新副本，上面还会携带一个时间戳


42.35-42.45

so it's gonna the database is going to store away a new record  this says the value of x at time 10 is whatever it happens to be let's say 9

So，数据库会去存储一条新的记录，即它在10点时所保存的x的值为9


42.45-42.51

 the value of record Y at time 10 is we say 11  

记录y在10点时它的值是11

42.51-42.55

maybe we're doing a transfer from X to Y

可能我们现在正在进行转账操作，将x的钱转到y

42.55-42.58

similarly T2 chose timestamp of 20 

类似的，T2这里选择提交的时间是20点

42.58-43.00

because that was the real time at commit time

因为这是执行提交操作的真正时间

43.00-43.02

and the database is gonna remember a new set of Records

数据库就会记住这一组新的记录

43.02-43.04

 in addition

此外


43.04-43.17

these old ones it's gonna say X at time 20 maybe we did a another transfer from X to Y and Y at time 20 equals 12 

这里就会说，因为我们进行了转账操作，在20点的时候x的值变成了8，y的值变成了12

43.17-43.19

oh so now we have two copies of each record at different times

So，现在我们就拥有了每条记录在不同时间的两个副本

43.19-43.22

now transaction 3 is gonna come along

此时，T3要开始执行了


43.22-43.27

and again it starts at about this time and does a read of X 

它会在这个时间点去读取x的值

43.27-43.28

and again it's gonna be slow 

它所在的那台服务器速度比较慢

43.28-43.34

so you know it's not gonna get around to reading y utill much later much later in real time

So，你知道的，它会在很长一段时间后才会去读取y的值

43.34-43.26

however 

但是

43.26-43.28

when transaction 3 started

当T3开始执行的时候

43.28-43.42

 it chose a timestamp by looking at the looking at the current time

它会去根据当前时间来选择一个时间戳

43.42-43.50

and so let's say since we know in real time  that transaction 3 started after transaction one on before transaction 2 

So，因为我们知道T3是在T1执行完，T2开始执行前这段时间内开始执行的

43.50-43.54

we know  it's got to have chosen a transaction time somewhere between 10 and 20 

因此，我们就知道我们得选10点和20点之间这段时间内作为事务执行的时间


43.54-44.01

and let's suppose it started it time 15 and chose timestamp 15 for itself 

我们假设T3开始的时间是15点，所以这里我们选的时间戳也就是15点

44.01-44.03

so that mean

So，这意味着

44.03-44.10

 when it does the read of X，it's gonna send a request the local replica that holds X 

当它要对x进行读取x的时候，它就会将请求发送给持有数据分片x的那个本地replica

44.10-44.13

and it's gonna accompany it with it it's time stamp of 15 

它发送这个请求的时候，会让这个请求携带15点这个时间戳

44.13-44.16

it's gonna say please give me the latest data as of time 15

它会说请给我15点时的最新数据

44.16-44.20

 of course transaction 2 hasnt executed yet

Of course，此时，T2还没有被执行

44.20-44.28

 and but nevertheless the highest time stamp copy of X is the one from time 10 written by transaction 1

但尽管如此，这里我们所能读到的时间戳最高的那个x的副本是由T1在10点时所写入的

44.28-44.32

so we're gonna get 9 for this one

So，我们所读到的x值为9

44.32-44.34

time passes.

随着时间的流逝

44.34-44.35

 transaction 2 commits

T2也被提交了

44.35-44.37

 now transaction 3 does the second read again

现在，T3会执行第二次读取操作，即读取y的值

44.37-44.42

at acompany suit the read requests with its own time stamp of 15  send the server's 

它会让这个读请求携带这个时间戳（即15点）并发送给服务器

44.42-44.44

now the server's have 2 records

现在，这个服务器上有2条记录

44.44-44.49

 but again because the server gets transaction threes time stamp of 15

但因为服务器收到T3的时间戳是15

44.49-44.57

it looks at its records and say ha 15 sits between these two I'm gonna return the highest time stamp record for X for y 

它会去查看它上面保存的记录，并说，15是在10和20之间，它会去返回这期间时间戳最高的x和y的记录

44.57-44.59

it's less than the requested timestamp 

该时间戳得小于T3请求所携带的时间戳


44.59-45.03

and that's still the version of Y from time 10 

所以，它拿到的还是10点的Y

45.03-45.06

so the read of Y will return at 11

So，它所读取到的Y值就是11


45.06-45.10

that is the read of X essentially happens at this time 

本质上来讲，它是在这个时间点对x进行读取

45.10-45.12

but because we remembered a timestamp 

但因为我们知道事务发生的时间戳

45.12-45.18

and we have the database keep data as of different times it was written

我们的数据库中也保存了不同时间点所写入的数据版本

45.18-45.26

it's as if both reads happened the time 15 instead of one at time 15 and one later 

如果这两个读操作都是在15点的时候执行，而不是一个在15点执行，另一个在15点之后执行

45.26-45.38

and now you'll see that in fact this just essentially emulates a serial one at a time execution in which the order is timestamp order

简单来讲，这里我模拟了以时间戳顺序来执行事务


45.38-45.45

 transaction 1 and transaction 2 sorry then transaction 3 then transaction 2 

我的执行顺序是先执行T1，接着执行T3，最后再执行T2

45.45-45.52

that is a serial order that is equivalent to that was also actually produced is the timestamp order of 10 15 20

这个执行顺序所产生的结果和我按照10 15 20这些时间戳顺序所产生的结果是相同的

45.52-45.56

alright 



45.56-46.06

okay so that's a simplified version of what spanner does for really transactions 

So，这就是Spanner处理事务时的简化版本



46.06-46.11

there's more complexity which I'll get to in a minute

这其中还有些很复杂的地方，我稍后会对它进行讲解



46.11-46.14

one question you might have is

你们可能会问的一个问题是

46.14*-46.19

why it was okay for transaction 3 to read an old value of y

对于T3来说，为什么读取y的旧值是ok的呢？


46.19-46.23

that is it issued this read of Y at this point in time

T3是在这个时间点对Y进行读取

46.23-46.27

the freshest data for y was this value 12

此时，y的最新值是12

46.27-46.33

but the value would actually got was intentionally a stale value not the freshest value

但实际上，这样T3读到的就是一个过时的值，而不是最新值

46.33-46.37

 but the value from a while ago  this value 11

即它读到的是之前的值，11

46.37-46.38

 so why is that okay

So，为什么这样做是Ok的呢？

46.38-46.42

 why is it okay not to be using the freshest version of the data

为什么不使用该数据对象的最新数据是Ok的呢？

46.42-46.48

 and the kind of technical justification for that is

从技术上来讲，这样做的理由是

46.48-46.52

 that transaction 2 and transaction 3 are concurrent

T2和T3是并发执行的

46.52-46.53

 that is the overlap in time

它们执行的时候，时间上会有重叠




46.53-46.58

 so those sort of timestamp of transaction 2 is here 

So，T2的时间戳是在这里


46.58*-47.00

and the timestamp of transaction 3 is here

T3的时间戳则是在这里

47.00-47.01

 they're concurrent 

它们是并发执行的

47.01-47.06

and the rules for linearizability and external consistency or that

对于线性一致性和外部一致性来说，它们的规则是

47.06-47.07

if two transactions are concurrent 

如果两个事务并发执行

47.07-47.17

then  the serial order that the database is allowed to use can be can put the two transactions in either order

那么数据库所允许使用的执行顺序可以是任意的，即要么先执行第一个事务，再执行第二个事务，要么先执行第二个事务，再执行第一个事务

47.17-47.24

 and here the database spanner has chosen to put transaction 3 before transaction 2 in the serial order

此处，Spanner决定将T3放在T2之前执行

47.24-47.30

 okay Robert we we have a student question

Hi，教授，我们有一个问题

47.30-47.34

 does external consistency like with timestamps always imply a strong consistency

使用时间戳的外部一致性是否意味着它是强一致性

47.34-47.40

 I'm got yes

我猜是这样的

47.40-47.50

 yes I think so if strong consistency strong consistency usually what people mean by that is linearizability

强一致性就是人们通常所说的线性一致性

47.50-47.56

 and I believe the definition of linearizability and external consistency are the same

我相信线性一致性和外部一致性的定义是相同的

47.56-47.58

 so I would say yes

So，我觉得答案是Yes

47.58-48.04

 and another question how does this not absolutely blow up storage

另一个问题是，它是如何做到绝对不会耗尽存储空间的

48.04-48.05

that is a great question

这是一个很棒的问题

48.05-48.10

 and the answer is it definitely blows up storage

答案是，它肯定会耗尽存储空间

48.10-48.11

 and the reason is that 

我这样说的理由是

48.11-48.19

now the storage system has to keep multiple copies data records that have been recently modified multiple times

存储系统得去保存该记录最近被修改的多个数据副本

48.19-48.21

 and that's definitely expense

这绝对是开销的一部分

48.21-48.26

 both both this cost in storage space on the disk in the memory

磁盘存储空间和内存空间的双重开销

48.26-48.30

 and also it's just like an added layer of bookkeeping

这就像是外挂了一层用来记录版本的层

这就像是外挂了一层皮，用来记录数据版本


48.30-48.32

 you know now lookups have to consider the timestamps as well as keys

它不仅得去考虑时间戳也得去考虑这些key

你知道的，这不仅得去考虑数据记录的key，也要去考虑它的时间戳

48.32-48.41

the storage expense I think is not as great as it could be

我觉得存储成本并没有想象的那么贵

48.41-48.44

 because the system discards old records 

因为系统会将老的记录进行丢弃掉

48.44-48.45

that paper does not say what the policy is

paper中并没有说丢弃老的记录的策略是怎么样的

48.45-48.52

 but presumably well it must be discarding old records

但想必，Spanner肯定会将老的记录丢掉

48.52-48.58！！！！！！！！

certainly if the only reason for the multiple records is to implement snapshot isolation of these kinds of transactions 

之所以对每条记录使用多版本，是为了实现这些事务的快照隔离



48.58-49.。04

then you don't really need to remember values too far in the past

你不需要去记住太过久远的值

49.04-49.13

because you only need to remember values back to the sort of earliest time that a transaction could have started at that's still running now

因为你只需要记住可以追溯到最早已经执行事务的时间点所对应的值，并且此时该事务依然还在执行中

49.13-49.20

 and if your transactions mostly you're always finish or force the finish by killing them or something within say one minute

如果你的事务差不多还要1分钟就执行完了，或者是你将该事务kill掉来强制结束它

49.20-49.23

 if no transaction can take longer than a minute

如果你的事务一分钟以内就完成了

49.23-49.28

 then you only have to remember the last minute of versions in the database 

那么你只需要在数据库中记录该数据对象上一分钟的版本

49.28-49.30

now in fact the paper implies

事实上，paper中暗示了

49.30-49.32

 that they remember data  farther back than that

它们所记录的数据版本要比这个更久远

49.32-49.45

 because it appears they support intentionally support these snapshot reads which allow them to support the notion of seeing you know data from a while ago you know yesterday or something 

它们支持去读取该数据对象不久之前的版本，比如该数据对象昨天的版本

49.45-49.51

but they don't say but but the garbage collection policy is for old values so

但他们也没提关于旧值垃圾回收这块的内容

49.51-49.53

 I don't know how expensive it would be for them

我不知道这样做他们所要付出的代价是怎么样的

49.53-49.58

 okay



49.58-50.08

okay so the the justification for ice legal is that in external consistency that the only rule that external consistency imposes is that

外部一致性所强加的唯一一条规则是

50.08-50.10

 if one transaction has completed

如果一个事务已经完成了

50.10-50.14

 then a transaction that starts after it must see its writes

那么在它之后开始执行的这个事务必须看到自己这个事务中所有写操作做的修改

50.14-50.17

 so t1 may be t1 completed

So，假设这里T1已经完成了


50.17-50.19

let's say that t1 completed at this time

假设T1是在这个时间点完成的

50.19-50.23

and t3 started just after it 

T3在T1完成后就开始执行了

50.23-50.27

may be external consistency but demand that t3 sees T1‘s writes 

外部一致性会让T3看到T1中写操作所做的修改

50.27-50.31

but since T2 definitely didn't finish before t3 started 

但可以肯定的是，在T2开始执行前，T3肯定没有结束（老师口误）

50.31-50.36

we have no obligation under external consistency T3 to see T2’s writes

根据外部一致性来看，我们没有义务让T3看到T2中写操作所做的修改

50.36-50.39

and indeed in this example it does not 

在这个例子中，确实就是这样

50.39-50.40

so it's actually legal

So，这样做实际上是合法的

50.40-50.48

 um okay another problem that comes up is that 

Ok，另一个出现的问题是

50.48-50.54

the transaction T3 is needs to read data as of a particular timestamp 

T3需要去读取一个特定时间戳所对应的数据

50.54-50.57

but you know the reason why this is desirable is 

你知道的，这样做可取的理由在于

50.57-51.02

that were it allows us to read from the local replicas in the same data center

它允许我们从同一个数据中心下所属的本地replica中读取数据

51.02-51.11

 but maybe that local replica is in the minority of paxos followers that didn't see the latest log records the leader

但这个本地replica可能是属于Paxos follower中的少数派，即它并没有看到leader发送给它的最新日志条目


51.11-51.17

 so maybe our local replicas maybe it's never even seen you know never saw these writes to X&Y at all

So，我们所要读取的那个本地replica可能从来没见过对x和y所做的这些写操作

51.17-51.23

 it's still back at a version from time you know five or six or seven

它上面保存的数据可能依然是5点，6点或者7点时的版本

51.23-51.26

and so if we don't do something clever

So，如果我们没做任何聪明的处理的话

51.26-51.33

when we ask for the sort of highest version record you know less than timestamp 15

当我们要去读取该记录的（15点以前的）最高版本时

51.33-51.35

 we may get some much older version

我们可能会拿到该数据更古老的版本

51.35-51.40

 that's not actually the you produced by transaction one which were required to see

实际上，这可能并不是T1所生成的结果，也不是我们想要看到的数据


51.40-51.47

so the way spanner deals with this is with our notion of safe time 

So，Spanner使用了一种叫做安全时间（safe time）的概念来解决这个问题

51.47-51.52

and the scope is 

安全时间的范围是

51.52-51.59

that each replica remembers you know it's getting log records from its Paxos leader 

每个replica会去记录它从它的Paxos leader处所收到的日志记录

51.59-52.07

and the log records it turns out that the paper arranges so that the leader sends out log records and strictly increasing timestamp order

paper中表明，leader会严格按照时间戳增加的顺序来发送日志记录

52.07*-52.15

so a replica can look at the very last log record it's gotten from its leader to know how updated it 

So，replica可以根据它从leader处所拿到的最后一个日志记录来进行更新

52.15-52.20

so if I ask for a value as of timestamp 15 

So，如果我要去读取时间戳15所对应的值

52.20-52.26

but the replica has only gotten log entries from Paxos leader after timesstamp 13

但replica只从Paxos leader处拿到了时间戳13所对应的日志条目

52.26-52.28

the replicas gonna make us delay

那么我们从这个replica上所读到的数据就是落后的

那么replica就会推迟给我们返回数据

52.28-52.34

 it's not gonna answer until it's gotten a log record with timestamped 15 from the leader 

直到它从leader处拿到了时间戳15所对应的日志条目时，它才会对我们进行响应（知秋注：拿到的时间戳大于等于15）

52.34-52.45

and this ensures that replicas don't answer a request for a given timestamp until they're guaranteed to know everything from the leader up through that timestamp 

这样做就确保了，对于一个给定时间点的请求来说，直到replica从leader那里知道了该时间点前所发生的一切事情，它才会对该请求进行响应

52.45-52.46

so this may delay

So，这样做可能会造成延迟

52.46-52.50

 this may delay the reads 

对于读请求来说，这可能会造成延迟

52.50-52.53

okay



52.56-53.03

so the next question I've been assuming I assumed in this discussion

So，在这场讨论中我所假设的下一个问题是

53.03-53.07

 that the clocks and all the different servers are perfectly synchronized 

所有不同服务器上的时钟都是完美同步的

53.07-53.13

so everybody's clock says you know 1001 and 30 seconds at exactly the same time

比如，在同一时间，每台服务器的时钟显示的都是10点01分30秒

53.13-53.22

 but it turns out that you can't synchronize clocks that precisely

但事实证明，你没法如此精确地对时钟进行同步

53.22-53.30

it's basically impossible to get perfectly synchronized clocks

简单来讲，要做到对时钟完美同步是不可能的

53.30-53.36

 and the reasons are reasonably fundamental 

理由很简单


53.36-53.40

so the topic is time synchronization

So，我们要讨论的主题是时间同步

53.40-53.47

 which is sort of making sure clocks say the same real time value different clocks read the same value

即我们要确保不同服务器上的时钟所读取的是同一个值

53.47-53.48

the sort of fundamental problem is 

这里要讲的一个常识问题是

53.48-54.06

that time is defined as basically the time it says on a collection of highly accurate expensive clocks in a set of government laboratories

时间是由政府实验室中那些价格昂贵的高度精准的时钟所定义的

54.06-54.08

 so we can't directly read them

So，我们没法直接去读取这些值

54.08-54.15

 although we can know is that these government laboratories can broadcast the time in various ways 

虽然我们知道这些政府实验室可以通过不同的途径来传播时间

54.15-54.20

and the broadcast take time

传播这些需要花一定的时间

54.20-54.25

 and so it's some time later some possibly unknown time later we hear these announcements of what the time is

So，直到过了一定时间后，我们才知道现在是几点

54.25-54.30

you know it may all hear these announcements at different times due to varying delays

你知道的，因为延迟时间的不同，这些服务器会在不同的时间收到这些时间


54.30-54.48

so I actually first I want to consider the problem of what the impact is if on snapshot isolation if the clocks are not synchronize which they won't be

So，首先我要思考的问题是，如果快照隔离的时间并不同步的话，会产生什么影响

54.48-54.53

okay 



54.53-54.55

so what if the clocks aren't same

So，如果时间不同步会怎么样呢？

54.55-55.00

 there's actually no problem at all for the spanners readwrite transactions

对于Spanner中的读写型事务来说，这点根本不是啥问题

55.00-55.03

because the readwrite transactions used locks and two-phase commit 

因为读写型事务使用了锁和二阶段提交

55.03-55.06

they're not actually using snapshot isolation

它们实际上并没有使用快照隔离

55.06-55.07

so they don't care

So，它们不在意时间不同步这种问题

55.07-55.11

 so the readwrite transactions will still be serialized by the lock the two-phase locking mechanism

基于两阶段锁机制，读写型事务依然是有序执行的

55.11-55.16

so we're only interested in what happens for an  read-only transaction

So，我们只对只读事务遇上这种情况后会发生什么感兴趣

55.16-55.27

So let's suppose a read-only transaction chooses a timestamp that is too large

So，假设一个只读事务选择了一个很大的时间戳


55.27-55.29

so that is far in the future 

即很久之后才会执行这个只读事务

55.29-55.31

you know it's now 12:01 p.m.

比如现在是中午12点01分

55.31-55.34

 and it chooses a timestamp at  1 o'clock p.m

它选择的时间戳是下午1点


55.34-55.42

so if a transactions chosen timestamps too big

如果一个事务选择的时间戳太大

55.42-55.45

that's actually not that bad 

这实际上并不是很糟糕

55.45-55.46

what it'll mean is that 

这意味着

55.46-55.51

it will do read requests it'll send a read request to some replicas 

当有人发送了一个读请求给某个replica时

55.51-55.52

the replicas would say wait a minute

replica就会说，稍等一下

55.52-56.00

 you're you know your clock is far greater your timestamp far greater than the last log entry I saw for my Paxos leader

你所携带的时间戳远大于我从Paxos leader处所拿到的最后一条日志条目所对应的时间戳

56.00-56.09

 so I'm gonna make you wait until the Paxos at the time and the log entries and the Paxos leader catches up to the time you've requested I'm only gonna respond then

So，我（该replica）得等到直到Paxos leader返回给我的日志条目所对应的时间戳追上了你所携带的时间戳时，我才能对你进行响应


56.09-56.10

 so this is correct but slow

So，这样做虽然正确，但速度很慢

56.10-56.16

the reader will be forced away

So，这个reader就会被迫离开（事务超时）

56.16-56.17

 that's not the worst in the world

这并不是最糟糕的情况

56.17-56.23

 but what happens if we have a read-only transaction and it's timestamp is too small 

如果我们只读事务的时间戳过小，那么这会发生什么呢？


56.23-56.33

and this would correspond to its clock being either set wrong so that it's said in the past

这可能和时钟之前设置的时间就是错的有关

56.33-56.36

or maybe it was originally set correctly but the clock its clock ticks too slowly 

或者是，时钟原本设置的时间是正确的，但是时钟走得速度太慢了

56.36-56.42

the problem with this this is a obviously causes a correctness problem

很明显，这是一个正确性问题

56.42-56.43

this will cause a violation of external consistency 

这会违反外部一致性

56.43-56.50

because the multi version databases you'll give it a timestamp that's far in the past say an hour ago

因为这是一个多版本数据库，如果你给出的时间戳太过久远，比如一小时前

56.50-56.56

and the database will read you a value associated with it the timestamp from an hour ago

那么数据库就会返回给你该数据对象一小时之前的版本

56.56-56.59

 which may ignore more recent writes

这个版本的数据可能忽略了很多最近对它所做的修改

56.59-57.06

 so using a assigning a timestamp to a transaction that's too small will cause you to miss recent committed writes

So，如果给事务分配的时间戳太小，这会导致我们丢失最近已经提交落地的写操作（知秋注：提交可能比较密集，同时如果只读服务器有延时，这会导致我们读到的数据可能是以前的数据，因为读服务器是延时的，也就是说，正常这个读请求如果放在时间正确的服务器中，读到的数据时间戳会更大，此时，在延时服务器中，本应可以读取的最新数据可能就读不到了）

57.06-57.13

 and that's a violation of external consistency

这就违反了外部一致性


57.13-57.21

 so not external consistency

So，这就没有遵守外部一致性

57.21-57.24

so we actually have a problem here

So，实际上，这里我们就遇上了一个问题

57.24-57.27

the assumption that the clocks were synchronized is

假设这些时钟都是同步的

57.27-57.30

 in fact a very serious assumption

事实上，这是一个非常严肃的假设

57.30-57.33

and the fact that you cannot count on it means that unless we do something

除非我们做了某些处理

57.35-57.36

 the system is going to be incorrect 

不然，该系统所得出的东西都是不正确的

57.36-57.38

all right



57.38-57.45

so can we synchronize clocks perfectly

So，我们能否让这些时钟完美同步呢？

57.45-57.47

 all right that would be the ideal thing 

这是我们想要做到的理想情况

57.47-57.49

and if not why not 

如果没法做到完美同步，那这是为什么没法做到呢？

57.49-57.53

so what about clock synchronization

So，我们来看下时钟同步

57.53-57.57

 the as I mentioned 

正如我所提到的那样

57.57-58.06

we're time come from this it's actually a collection of the kind of median of a collection of clocks and government labs

我们的时间取得是政府实验室的高精度钟所提供的时间集合的中间值



58.06-58.11

the way that we hear about the time is that it's broadcast  by various protocols

我们知道时间的方式是通过各种协议所进行的广播

58.11-58.13

 sometimes by radio protocols

有时候是雷达协议

58.13-58.17

 like basically what GPS is doing for spanner

简单来讲，这就是GPS为Spanner所做的事情

57.17-58.31

is a GPS acts as a radio broadcast system that broadcasts the current time from some government lab through the GPS satellites to GPS receiver sitting in the Google machine rooms 

GPS扮演了雷达广播系统的角色，它把从政府实验室所收到的当前时间通过GPS卫星发送给谷歌机房中的GPS接收器

58.31-58.33

and there's a number of other radio protocols

其中还有很多其他的雷达协议

58.33-58.39

 like WWB is another older radio protocol for broadcasting the current time

比如，WWB就是另一种比较老的用来广播当前时间的雷达协议

58.39-58.41

 and there's newer protocols 

当然，还有一些较新的协议

58.41-58.47

like there's this NTP protocol that operates over the Internet

比如NTP协议，它是基于网络的一个时间协议

58.47-58.50

 that also is in charge of basically broadcasting time

简单来讲，它也是用来广播时间的

58.50-58.55

so the sort of system diagram is

So，这种系统架构图是这样的

58.55-58.56

that there are some government labs 

这里面有一些政府实验室

58.56-59.01

and the government labs with their accurate clocks define a universal notion of time

政府实验室通过他们的高精度时钟定义了世界时间的概念

59.01-59.03

 that's called UTC 

这种东西叫做UTC

59.03-59.08

so we've UTC coming from some clocks in some labs

So，我们从某些实验室中收到UTC时间

59.08-59.18

 then we have some you know radio internet broadcast or something for the case of spanner

然后，我们通过雷达或者网络将时间广播给Spanner


59.18-59.26

 it's the we can think of the government allowed to broadcasting to GPS satellites

可以想象一下，政府实验室将时间广播给GPS卫星

59.26-59.33

the satellites in turn broadcast and the broadcaster you know the millions of GPS receivers that are out there

接着，GPS卫星会将时间广播给数百万GPS接收器

59.33-59.38

you can buy GPS receivers for a couple hundred bucks

你可以花一两百美金去买个GPS接收器

59.38-59.44

 that will decode the timestamps in the GPS signals

它会对GPS信号中的时间戳进行解密


59.44-59.58

 and sort of keep you up to date with exactly what the time is corrected for the propagation delay between the government labs and the GPS satellites and also corrected for the delay between the GPS satellites in your current position

通过修正政府实验室和GPS卫星间的传播延迟以及GPS卫星和我们当前所在地的传播延迟，来让我们的时间保存最新

59.58-1.00.06

 and then there's in each data center  there's a GPS receiver 

在每个数据中心里都有一个GPS接收器

1.00.06-1.00.13

that's connected up to what the paper calls a time master 

它们和paper中提到的time master进行了连接

1.00.13-1.00.16

which is some server

其实就是和某台服务器建立了连接


1.00.16-1.00.19

 there's going to be more than one of these for data center in case one fails 

为了避免出现故障，导致不能使用的情况，在每个数据中心里面可能会有多个time master服务器

1.00.19-1.00.26

and then there's all the hundreds of servers in the data center that are running spanner either as servers or as clients

在每个数据中心中有数百台运行着Spanner的服务器，有的是作为Spanner server使用，有的是作为Spanner client使用

1.00.26-1.00.40

 each one of them is going to periodically send a request saying aw what time is it to the local one or more usually more than one piece one fails to the time masters

每台服务器会定期向本地的time master服务器发送一个询问时间的请求，通常它会向多个time master服务器发送这样的请求，防止其中一个服务器发生故障崩溃

1.00.40-1.00.46

 and the time master will reply with oh you know I think the current time has received for GPS is such-and-such

time master就会对我们进行回复，并说：Oh，我觉得我从GPS卫星那里收到的当前时间是xxx



1.00.46-1.00.56

 now built into this unfortunately is a certain amount of uncertainty

这里面还得涉及一些不确定的时间误差

1.00.56-1.01.02

 and the primary sources of uncertainty I think 

我觉得这种误差的主要来源是

1.01.02-1.01.07

well there's fundamentally uncertainty in that we don't actually know how far we are from the GPS satellites exactly

Well，最基本的误差是来源于我们不清楚我们距离GPS卫星的距离有多远

1.01.07-1.01.12

so the you know radio signals take some amount of time 

So，你知道的，雷达信号需要一定时间进行传播

1.01.12-1.01.14

even though the GPS satellite knew exactly what time it is

即使GPS卫星知道传播所需要的时间是多少

1.01.14-1.01.16

those signals take some time to get to our GPS receiver

这些信号需要花点时间才能到达我们的GPS接收器处

1.01.16-1.01.18

 we're not sure what that is

我们不确定这段时间有多长

1.01.18-1.01.19

 that means that

这意味着

1.01.19-1.01.25

when the we get a message from the radio message from the GPS satellite saying exactly 12 o'clock

当我们接收到来自GPS卫星所发送来的消息时，它告诉我们的时间是12点

1.01.25-1.01.31

you know if the propagation delay might have been you know a couple of nanoseconds 

如果传播的时候延迟了数纳秒

1.01.31-1.01.31

that mean

这意味着

1.01.31-1.01.37

 that's there were actually the propagation delays much more than that it's really uncertainty in the propagation delay 

这意味着，信号传播时实际的误差要远比传播延迟大得多

1.01.37-1.01.42

means that we're not really sure exactly whether it's 12 o'clock or a little before a little after

这就意味着，我们不清楚我们收到的时间是在12点前还是12点后

1.01.42-1.01.43

 in addition

此外

1.01.43-1.01.48

 all the times at time is communicated  added uncertainty

我们通过通信所拿到的所有时间都是存在误差的

1.01.48-1.01.50

 that you have to account for

这是你必须去考虑的一点

1.01.50-1.01.53

 and the biggest sources are that

其中最主要的误差来源是

1.01.53-1.01.55

when a server sends requests after a while it gets a response 

当一个服务器发送了请求，之后它收到了该请求对应的响应

1.01.55-1.01.57

if the response says

如果响应中的信息表示


1.01.57-1.01.58

 it's exactly 12 o'clock

它返回的正好就是12点

1.01.58-1.02.04

 but the  amount but um say a second pass

但这里经历了两轮

1.02.04-1.02.08

 you know between when the server sent the request and when I got the response

即服务器发送请求和收到请求的这段时间内

1.02.08-1.02.10

 all the server knows is

所有服务器都知道

1.02.10-1.02.12

that even if the master had the correct time 

即使time master处的时间是正确的

1.02.12-1.02.22

all the server knows is that the time is within a second of 12 o'clock 

所有服务器都知道时间是在12点以内的

1.02.22-1.02.24

because maybe that may be the request was instant 

因为请求可能是瞬间就发出去了

1.02.24-1.02.26

but the reply was delayed 

但time master的对服务器的响应则被延迟了

1.02.26-1.02.28

or maybe the request was delayed by a second 

或者请求被延迟了1秒

1.02.28-1.02.31

and the response was the instant

然而，响应则是即时的





四十八  阅举报
13-04
1.02.31-1.02.32

so all you really know is 

So，你所知道的事情是


1.02.32-1.02.40

that it's between you know 12 o'clock and zero seconds and twelve o'clock and one second

误差是在12:00:00和12:00:01之间

1.02.40-1.02.43

 okay 



1.02.43-1.02.46

so there's always this uncertainty

So，误差是始终存在的

1.02.46-1.02.50

 and in order to which we really can't ignore though

我们是没法忽略这些误差的

1.02.50-1.02.53

 because the uncertainties we're talking about milliseconds here

因为这里我们所讨论的误差是在毫秒级

1.02.53-1.03.06

 and we're gonna find out that these that the uncertainty in the time goes directly to the these how long these safe waits have to be and how long some other pauses have to be the commit wait as we'll see

我们会发现时间上的误差取决于安全等待的持续时间以及提交等待的暂停时间

1.03.06-1.03.11

 so you know uncertainty in the level of milliseconds is a serious problem 

So，你知道的，这种毫秒级的误差是一个严重的问题

1.03.11-1.03.12

the other big uncertainty is

另一种主要的误差是

1.03.12-1.03.20

 that each of these servers only request the current time from the master every once in a while say every minute or however often

每台服务器会每隔一分钟或者一定时间向time master请求当前时间

1.03.20-1.03.28

and between that， the each server runs its own local clock that sort of keeps the time starting with the last time from the master 

在发送请求并等待time master进行响应的这段时间里，每台服务器会运行自己的本地时钟，本地时钟是从time master已获取到的最后一次当前时间处开始走的

1.03.28-1.03.29

those local clocks are actually pretty bad

这些本地时钟其实相当糟糕

1.03.29-1.03.36

and can drift by things by milliseconds between times that the server talks to the master

在服务器和time master进行通信的时候，本地时钟的时间会发生毫秒级的偏移

1.03.36-1.03.47

 and so the system has to sort of add the unknown but estimated drift of the local clock to the uncertainty of the time

因此系统必须将本地时钟运行时所产生的这种不确定的时间偏移量添加到时间的不确定性中

1.03.47-1.03.53

 so I'm in order to capture this uncertainty and account for it

So，为了捕获这种不确定性，并解决它所带来的问题

1.03.53-1.04.00

spanner uses this true time scheme

Spanner使用了这种True time方案

1.04.00-1.04.05

 in which when you ask what time it is，what you actually get back as one of these TT interval things 

当你询问时间的时候，你实际拿到的是一种叫做TT区间（TT interval）的东西




1.04.05-1.04.27

which is a pair of an earliest time and a latest earliest time is their early early as the time could possibly be and the second is the latest the time can possibly be

这个区间是由最earliest time和latest time所组成



1.04.27-1.04.33

 so when the application you know makes this library call that asked for the time

So，当应用程序通过这个库来查询时间时

1.04.33-1.04.33

 it gets back this pair

它所拿到的这是这个pair（TT范围）

1.04.33-1.04.34

 all it knows is that

它所知道的事情是

1.04.34-1.04.37

the current time is somewhere between earliest and latest 

当前时间是位于这个TT范围内的某一个时间点

1.04.37-1.04.41

that's what you know earliest might be in this case earliest might be twelve o'clock

你知道的，在这个例子中，earliest time可能是12点00分00秒

1.04.41-1.04.43

 and may this might be twelve o'clock in one second

latest time则可能是12点00分01秒

1.04.43-1.04.51

just just our guarantee that the that the correct time isn't less than earliest and isn't greater than latest

我们要保证正确的时间是不早于earliest time，但也不能比latest time大

1.04.51-1.04.54

what we don't know where between that lines

但我们不清楚这个时间是在这个区间的哪个位置

1.04.54-1.04.58

okay



1.04.58-1.05.03

so this is what uh when a transaction asks the system what time it is

当一个事务询问系统时间的时候


1.05.03-1.05.08

this is what the transaction actually gets back from the time system

这实际上就是事务从时间系统那里所得到的东西

1.05.08-1.05.14

 and now let's return to our original problem was

现在，让我们回到我们一开始的问题

1.05.14-1.05.17

that if the clock was too slow 

如果时钟走得过慢

1.05.17-1.05.22

that a read-only transaction might read data too far in the past 

那么这个只读事务所读取到的数据对象的版本可能就会太过久远

1.05.22-1.05.26

and that it wouldn't read data from a recent committed transaction 

它不会读取到一个最近已经提交事务所修改后的数据

1.05.26-1.05.36

so we need to know what we're looking for is how spanner uses these TT intervals in its notion of true time in order to ensure that despite uncertainty in what time it is

So，我们需要知道Spanner是如何使用TT区间来消除这种时间上的误差并确保时间正确

1.05.36-1.05.42

transaction obey external consistency that is a read-only transaction

只读事务需要去遵守外部一致性

1.05.42-1.05.48

 it's guaranteed to see writes done by a transaction write transaction that completed before us

这保证了只读事务能看到在它之前已经完成的事务中写操作所做的所有修改

1.05.48-1.05.59

 and there are two rules that the paper talks about that conspire to enforce this

这篇paper中谈论了两条规则，以此来做到外部一致性

1.05.59-1.06.04

 and the two rules which are in section 4-1

你们可以在第4.1节看到这两条规则


1.06.04-1.06.06

one of them is the start rule

其中一条规则是start rule


1.06.10-1.06.13

 and the other is commit wait

另一条规则是commit wait

1.06.13-1.06.25

this start rule tells us  what timestamps transactions choose

start rule会告诉我们事务所选择的时间戳是什么

1.06.25-1.06.27

 and basically says

基本上来讲


1.06.27-1.06.49

that a transactions timestamp has to be equal to the latest half of the true time current time so this is TT now call which returns one of those earliest latest pairs that's the current time and that transactions timestamp has to be the latest

一个事务所选择的时间戳(TS)等于TT.now().latest

1.06.49-1.06.52

 that is it's going to be a time that's guaranteed not to have happened yet 

它得保证这是一个还未发生的时间点

1.06.52-1.06.54

because the true time is between earliest and latest

因为True time是在earliest time和latest time之间的时间点

1.06.54-1.06.56

and for a read-only transaction

对于一个只读事务来说


1.06.56-1.07.05

 it's assign the latest time as of its the time it starts

它的时间戳就是它开始执行时的时间戳，将latest time设置给它


1.07.05-1.07.12

and for a read or write transaction is to assign a timestamp this latest value as of the time it starts to commit

对于一个读写型事务来说，我们会将latest time作为它的提交时间戳分配给它



1.07.12-1.07.17

okay 



1.07.17-1.07.20

so the start rule says  this is how spanner chooses time stamps

So，start rule中表示这就是Spanner选择时间戳的方式

1.07.20-1.07.25

the commit wait rule only for readwrite transactions 

commitwait rule只适用于读写型事务

1.07.25-1.07.28

says that 

它表示

1.07.28-1.07.37

when a transaction coordinator is you know collects the votes and sees that it's able to commit

事务协调器会去收集投票信息，并检查是否能够提交该事务

1.07.37-1.07.40

 and and chooses a timestamp

并为该事务选择一个提交时间戳

1.07.40-1.07.41

 after it chooses this time stamp

当它选完时间戳后

1.07.41-1.07.48

it's required to delay to wait a certain amount of time before til I have to actually commit and write the values and release locks

在我实际提交该事务（执行完写操作并释放锁）之前，它需要延迟等待一段时间（知秋注：因为请求的真实时间介于earlist time 与 latest time之间，我们能确定的是它最晚不会超过 latest time，为了保证分布式环境下各个数据分片master的时间协调性，选择 latest time作为提交时间，因为各个数据分片服务器也会找时间标准master服务器获取时间，到达latest时间后再作提交）


1.07.48-1.08.14

 so a readwrite transaction has to delay until it's timestamps that it chose when it was starting to think about commit is less than the current time the earliest

So，对于一个读写型事务来说，它得等到它开始提交的时候才能进行提交，这个时间点小于earliest time

So，对于一个读写型事务来说，它得等待，直到到达它选择的那个时间戳为止，进行事务提交，这个提交时间戳得小于下一个读事务当前时间的最早开始时间（earliest time，这里可以理解为在这个写事务后万一有个该数据的读事务紧跟着，那其实就是ts的时间戳必须不能在TS.now获取到的时间区间内，也就是它得小于这个TS.now的earliest time，此处就简单将它译为该数据有紧跟着一个读事务，方便理解）

1.08.14-1.08.15

so what's going on here is

So，这里所发生的事情是

1.08.15-1.08.17

the sits in a loop calling TS now 

这里会有一个循环，它在循环里面调用TS.now()

1.08.17-1.08.26 ！！！！

and it stays in that loop until the timestamp that it had chosen at the beginning of the commit process is less than the current times earliest time

它会在这个循环中进行等待，直到到达开始提交处理选择的时间戳，该时间戳小于下一个读事务当前时间的最早开始时间（earliest time）

直到时间到了earliest time为止


1.08.26-1.08.27

and what this guarantees is that 

这里所保证的东西是

1.08.27-1.08.36

since now the earliest possible correct time is greater than the transactions timestamp

因为现在，下一个读事务的earliest time要比该事务的时间戳来得大（知秋注：这里的它是针对于该数据所对应的事务）

1.08.36-1.08.37

that means that

这意味着

1.08.37-1.08.39

 when this loop is finished 

当这个循环结束的时候

1.08.39-1.08.40

when the commit wait is finished 

当commit wait结束的时候


1.08.40-1.08.45

this timestamp of the transaction is absolutely guaranteed to be in the past

它绝对保证该事务的时间戳是小于它下一个读事务的earliest time（知秋注：这里的它是针对于该数据所对应的事务）

1.08.45-1.08.47

 okay



1.08.47-1.09.02

so how does the system actually make use of these two rules in order to enforce external consistency for read-only transactions

So，系统是如何通过这两条规则对只读事务做到强制外部一致性的？

1.09.02-1.09.15

 I want to go back to our or I want to cook up a someone simplified scenario in order to illustrate this

为了解释这个问题，我想要给你们看下一个简单场景

1.09.15-1.09.22

 so I'm gonna imagine that the writing transactions only do one write each just reduce the complexity 

So，为了降低复杂性，这里我假设每个事务只做一次写操作

1.09.22--1.09.26

let's say that there's two read/write transactions

假设这里有两个读写型事务


1.09.26-1.09.32

 so we have t0 and t1 are read/write transactions

即T0和T1

1.09.32-1.09.34

 and they both write X

它们都对x进行了写入操作

1.09.34-1.09.36

 and we have a t2 which is going to read X

这里我们有一个事务T2，它要去读取x

1.09.36-1.09.45

 and we want to make sure that t2 sees you know it's going to use snapshot isolation on timestamps we want to make sure that sees the latest written value

因为这里在时间戳上使用了快照隔离，所以我们想确保T2看到最新写入的值


1.09.45-1.09.53

 so we're going to imagine that t2 does a write of X and writes one to X 

So，假设T0对x进行写入操作，即将x的值设定为1

1.09.53-1.09.54

and then commits 

然后，提交事务


1.09.54-1.10.04

we're going to imagine that sorry t1 write x and commit  at t2 also writes X writes a value 2 to X

T1对x进行写入操作，并将x设置为2，然后提交事务

1.10.04-1.10.08

 and we need to distinguish between  prepare and commit 

我们需要去区分下prepare和commit


1.10.08-1.10.14

so we're going to say it it's really a prepare that the transaction chooses its timestamps

So，这里T1准备去选择它的时间戳

1.10.14-1.10.18

 so this is a point at which it chooses timestamp and it commits some time later 

So，在这个时间点，它会去选择时间戳，并在之后提交事务

1.10.18-1.10.24

and then we're imagining by assumption that t2 starts after t1 finishes 

接着，我们假设T2是在T1完成后才开始执行

1.10.24-1.10.29

so it's going to read X afterwards

So，T2会在之后去读取x

1.10.29-1.10.31

 and we want to make sure it sees 2

我们想确保它看到的x值为2

1.10.31-1.10.31

 all right 


1.10.31-1.10.38

so let's suppose that t0 chooses a timestamp of one

So，假设T0所选的时间戳是1

1.10.38-1.10.42

 commits writes the database

它在这个时间点将写操作落地到数据库

1.10.42-1.10.46

 let's say t1 starts 

假设T1开始执行

1.10.46-1.10.49

at the time  it chooses a time stamp

此时它选择了一个时间戳

1.10.49-1.10.54

 it's gonna get some it's not get a single number from the true time system really gets a range of numbers

它从Truetime系统那里拿到了一个数字范围（时间范围），而不是一个数字

1.10.54-1.11.01

 you know earliest and a latest value

即earliest time和latest time

1.11.01-1.11.04

 let's say at the time it chooses its timestamp

假设，此时它选择了时间戳


1.11.04-1.11.10

 it the range of values that earliest time it gets is 1 

它所拿到的earliest time值为1

1.11.10-1.11.13

and the latest field in the current time is 10

latest time的值为10

1.11.13-1.11.18

 so the rule says 

So，根据规则来看

1.11.18-1.11.21

that it must choose 10 the latest value as its time stamp

它必须选择latest time 10作为它的时间戳 


1.11.21-1.11.24

 so t1 is gonna commit with its timestamp10

So，T1的提交时间就是10

1.11.24-1.11.27

now you can't commit yet

现在，我们还不能提交这个事务

1.11.27-1.11.33

 because the commit wait rule says it has to wait until it's time stamp is guaranteed to be in the past

因为commit wait规则表示，我们得等到这个时间点才能进行提交

1.11.33-1.11.44

 so transaction 1 is going to sit there keep asking what time is it what time is it until it gets an interval back that doesn't include time 10 

So，T1会一直去询问时间，直到它所拿到的时间范围里面不包括10为止

1.11.44-1.11.45

so at some point

So，在某一时间点

1.11.45-1.11.48

it's gonna ask what time it is

它会去询问现在是几点

1.11.48-1.11.53

 is gonna get a time that we're the earliest values 11 and elitist is I don't know let's say 20 

接着，它拿到的earliest time为11，latest time为20

1.11.53-1.11.57

and now I was gonna say AHA now I know that my timestamp it's guaranteed to be in the past 

现在我就可以说，aha，我知道我的时间戳（10）肯定是过时的了

1.11.57-1.11.58

and I can commit

我可以去提交这个事务了


1.11.58-1.12.05

 so t1 will actually this is its commit wait period to sit there and wait for a while before it commits

So，实际上，此处就是T1的commit wait范围，它在提交事务前，它会在这里等一会

1.12.05-1.12.06

 okay 



1.12.06-1.1208

now after it commits

当它提交后

1.02.08-1.12.12

 transaction two comes along wants to read x

T2想去读取x

1.12.12-1.12.16

 it's gonna choose a time stamp also

它也会去选择一个时间戳

1.12.16-1.12.19

 we're assuming that it starts after t1 finishes 

我们假设T2是在T1结束后开始执行

1.12.19-1.12.22

because that's the interesting scenario for external consistency 

因为这是我们在外部一致性中所感兴趣的一种情况

1.12.22-1.12.29

so let's say when  it asks at a time after time 11

So，假设T2是在11点后去询问时间的

1.12.29-1.12.32

 so it's going to get back an interval that includes time 11

So，它会拿到一个包含时间11的时间范围


1.12.32-1.12.44

so let's suppose it gets back in a little bit goes from time ten this is the earliest time twelve the latest

So，假设它所拿到的earliest time是10，latest time是12

1.12.44-1.12.48

and of course the time twelve has to be since we know that must be at least time 11 

Of course，我们知道这个latest time至少也得是11

1.12.48-1.12.51

since transaction two started after transaction one finished

因为T2是在T1结束后开始执行的

1.12.51-1.12.53

 that means

这意味着

1.12.53-1.12.56

 that the 11 must be less than the latest value 

11必然小于latest time

1.12.56-1.13.02

transaction 2 is going to choose this latest 12 as its timestamp

T2会选择12作为它的时间戳


1.13.02-1.13.07

 so it's gonna actually choose timestamp 12

So，实际上它会去选择时间戳12

1.13.07-1.13.11

and in this example 

在这个例子中

1.13.11-1.13.13

when it does its read

当T2进行读操作的时候

1.13.13-1.13.15

it's gonna ask the storage system

它会去询问存储系统

1.13.15-1.13.21

oh I want to read as of timestamp 12 since transaction 1 wrote with timestamp 10

并说，Oh，我想去读取时间戳12所对应的版本数据，因为T1提交的时间是10

1.13.21-1.13.21

that means

这意味着

1.13.21-1.13.25

 that you know assuming the safe wait the safe time machinery works

 假设这种safe time机制奏效的话

1.13.25-1.13.28

we're actually gonna read the correct value

那么我们实际就会读取到正确的值

1.13.28-1.13.37

 and what's going on here is that the so this happened to work out

这里就恰好解决了这个问题

1.13.37-1.13.43

 but indeed it's guaranteed to work out if as long as transaction 2 starts after transaction 1 commits

只要T2是在T1提交后开始执行，那么就能保证这是奏效的

1.13.43-1.13.44

and the reason is 

这里的理由是

1.13.44-1.13.53

that commit wait causes transaction 1 not to finish committing until its timestamp is guaranteed to be in the past

commit wait会导致只有到了提交时间后，T1才会去提交事务

1.13.53-1.13.54

all right



1.13.54-1.13.57

 so transaction 1 chooses a timestamp

So，T1选择了一个时间戳


1.13.57-1.14.09

 it's guaranteed to commit after that timestamp transaction 2 starts after the commit it

这就保证了当T1在这个时间点提交后，T2就会开始执行

1.14.09-1.14.13

and so we don't know anything about what its earliest value will be 

So，我们对earliest time的值是什么并不清楚

1.14.13-1.14.17

but its latest value is guaranteed to be after the current time

但我们保证该事务的latest time是在当前时间之后的

1.14.17-1.14.21

 but we know that the current time is after the commit time of T1 

但我们知道当前时间是在T1的提交时间之后

1.14.21-1.14.35

and therefore that T2 latest value the timestamp it chooses is guaranteed to be after when C committed and therefore after the timestamp that C used

这里保证了T2的latest time（即它所选择的时间戳）是在T1的提交时间之后

1.14.35-1.14.40

 and because if transaction 2 starts after T 1 finishes

因为如果T2在T1结束后开始执行

1.14.40-1.14.43

transaction 2 is guaranteed to get a higher timestamp

那么这就保证了T2会获得一个更高的时间戳

1.14.43-1.14.56

and the snapshot isolation machinery the multiple versions will cause it to read to it's read to see all lower valued writes from all the lower time-stamped transactions 

快照隔离机制（数据对象会有多个版本）会导致T2能够看到所有比它时间戳来得低的事务中的所有写操作所做的修改



1.14.56-1.14.59

that means T2 is going to see t1 

这意味着T2会看到T1所做的修改

1.14.59-1.14.59

and that basically means that

简单来讲，这意味着

1.14.59-1.15.06

this is how spanner enforces external consistency for its transactions

这就是Spanner如何强制让它的事务保持外部一致性的方式了

1.15.06-1.15.15

 so any questions about this machinery

对于这个机制，你们有任何疑问吗？

1.15.15-1.15.18

 alright



1.15.18-1.15.20

um I'm gonna step back a little bit

我要回过头去讲点东西


1.15.20-1.15.27

 there's really from my point of view sort of two big things going on here 

从我的观点来看，这里有两个很重要的东西

1.15.27-1.15.30

one is snapshot isolation by itself

其中一点就是快照隔离

1.15.30-1.15.35

 snapshot isolation by itself is enough to give you that it's keeping the multiple versions and

快照隔离会为我们提供多版本的功能

1.15.35-1.15.37

giving every transaction a timestamp

并给每个事务都分配一个时间戳

1.15.37-1.15.41

snapshot isolation is guaranteed to give you serializable read-only transactions

快照隔离能够保证只读事务的有序执行

1.15.41-1.15.44

because basically what snapshot isolation means is

因为简单来讲，快照隔离意味着

1.15.44-1.16.02

 that we're going to use these timestamps as the equivalent serial order  and things like the safe wait the safe time ensure that read-only transactions really do read as of their timestamps see every readwrite transaction before that and none after that

我们通过使用时间戳（等同于执行顺序）和安全等待时间来确保只读事务能够看到它们开始执行前的所有读写型事务所做的修改，并且它无法看到它（只读事务）开始时间之后的读写型事务所做的修改（知秋注：只读事务的开始时间为latest）

1.16.02-1.16.05

 so there's really two pieces

So，这里有两块内容

1.16.05-1.16.13

 snapshot isolation by itself though is actually often used not just by spanner

快照隔离这项技术实际上很多地方都有使用，不仅仅只是Spanner使用它

1.16.13-1.16.17

 but generally doesn't by a self guarantee external consistency

但一般来讲，它无法保证外部一致性

1.16.17-1.16.21

because in a distributed system it's different computers choosing the timestamp

但在分布式系统中会有很多不同的机器去选择时间戳

1.16.21-1.16.28

 so we're not sure there's timestamps will obey external consistency， even if they'll deliver serializeability

So，即使它们做到了线性一致性，我们也无法确定这些时间戳会遵守外部一致性

1.16.28-1.16.34

so in addition to snapshot isolation， spanner also has synchronized timestamps

So，为了使用快照隔离，Spanner也得对时间戳进行同步

1.16.34-1.16.45

 and it's the synchronized timestamps plus the commit wait rule  that allow spanner to guarantee external consistency as well as serializability 

同步时间戳加上commit wait规则这才允许Spanner去保证外部一致性以及线性一致性



1.16.45-1.16.49

and again the reason why all this is interesting is that

这些东西令我们感兴趣的原因在于

1.16.49-1.16.54

programmers really like transactions and really like external consistency

因为程序员真的很喜欢事务，并且也很喜欢外部一致性

1.16.54-1.16.56

because that makes the applications much easier to write

因为这样可以让我们更简单地去编写应用程序

1.16.56-1.17.00

they traditionally not been provided in distributed settings 

通常情况下，分布式系统中并没有提供它们

1.17.00-1.17.01

because they're too slow

因为它们的速度太慢了

1.17.01-1.17.08

 and so the fact that spanner manages to release make read-only transactions very fast is extremely attractive right

事实上，Spanner设法让只读事务的执行速度变得非常快，这点非常吸引我们

1.17.08-1.17.10

 no locking no two-phase commit

它里面没有锁，也没有二阶段提交

1.17.10-1.17.18

 and not even any distant reads for a read-only transactions they operate very efficiently from the local replicas

对于一个只读事务来说，它们能够非常高效地从本地的replica中读取数据，而不是从距离他们很远的replica上读取数据

1.17.18-1.17.27

 and again this is what's good for a basically attend factor of 10 latency improvement as measured in tables 3 & 6 

简单来讲，我们从paper中的table 3和6里面看到，这样做在延迟方面的性能改善了10倍左右

1.17.27-1.17.32

but just to remind you it's not all fabulous 

但要提醒你的是，这并不是什么奇迹

1.17.32-1.17.38

the all this wonderful machinery only applies to read-only transactions

这种很棒的机制只适用于只读事务

1.17.38-1.17.42

readwrite transactions still use two-phase commit and locks 

读写型事务使用的依然是两阶段提交和锁

1.17.42-1.17.49

and there's a number of cases in which even spanner will have the block like due to the safe time and the commit wait

因为安全等待时间和commit wait的原因，在很多时候Spanner还是会遇上阻塞的情况

1.17.49-1.17.53

 but as long as their times are accurate enough

但只要它们的时间足够准确

1.17.53-1.17.57

these commit waits are likely to be relatively small 

那么这些commit wait的时间就会变得相当小

1.17.57-1.18.00

okay just to summarize

Ok，我来总结一下

1.18.00-1.18.04

the spanner at the time was kind of a breakthrough 

Spanner在当时是一种突破性的东西

1.18.04-1.18.15

because it was very rare to see deployed systems that operate distributed transactions where the data was geographically in very different data centers 

因为我们很少能看到对分布式事务进行操作的系统，并且这些事务所涉及的数据是分布在世界各地的数据中心的

1.18.15-1.18.17

I'm surprising

我对此感到非常惊奇

1.18.17-1.18.22

you know spanner people were surprised that somebody was using a database that actually did a good job of this

人们对于spanner数据库能够做到这点，他们感到非常惊叹

1.18.22-1.18.24

 and that the performance was tolerable

而且性能也是可以忍受的

1.18.24-1.18.33

 and the snapshot isolation and a timestamp being part of the probably the most interesting aspects of the paper 

snapshot isolation以及时间戳可能是这篇paper中最令我们感兴趣的两个方面

1.18.35-1.18.39

and that is all I have to say for today

这就是我今天所要讲的全部内容了

1.18.39-1.18.42

 any last questions 

你们还有问题吗？

1.18.47-1.18.48

okay



1.18.48-1.18.54

I think on Thursday we're gonna we're going to see farm

我觉得我们会在周四的时候看到FaRm

1.18.54-1.19.01

which is a sort of very different slice through the desire to provide very high performance transactions 

它是一种非常不同的东西，旨在提供性能极高的事务处理能力

1.19.01-1.19.06

so I'll see you on Thursday

So，周四再会



四十  阅举报
