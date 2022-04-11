09-01
09 - Multi-Threaded Index Concurrency Control
(CMU Databases Systems _ Fall 2019)
00:15 - 00:17
Okay, guys let's get started
Ok，孩⼉们我们上课吧
00:19 - 00:23
again Thank You DJ drop tables always always always keep it down
感谢DJ Drop Table每节课所为我们做的事情
00:25 - 00:26
how's your mixtape going oh it's going
你的专辑如何了
00:27 - 00:31
we'll release it at the end of semester hopefully
我们希望能在学期末听到你的作品吧
00:31 - 00:33
okay and it's all it's all like DJ drop table beats
都是你打的拍吗？
00:34 - 00:36
oh nothing with you and like your own stuff
还是你啥也没⼲，都是你的队友做的
############
00:40 - 00:42
Okay alright, so let's get started
Ok，我们开始上课吧
0.42-0.43
it's a beautiful day out
今天是美好的⼀天
0.43-0.51
and I think that's why the turnout here so low which sucks cuz my every lecture is all so
much here ,but this one I like a lot too
我觉得这就是为什么今天的到座率有点低的原因，这有点操蛋，因为我每节课都⼲货满满
00:52 - 00:55
Be before we get into the course material
但在我们开始上课之前
0.55-0.59
just to discuss real quickly what's on the schedule for you guys
快速讨论下我们接下来的规划
00:59 - 01:02
Project #1 is due this Friday at midnight
Project #1这周五结束前要上交
1.02-1.05
and again you should submit that on great scope
你们应该把它们提交到GreatScope上
01:05 - 01:09
Homework #2 is due on Monday at midnight also spindle grade scope
Homework 2是周⼀结束前截⽌，你们也要提交到GreatScope
01:09 - 01:13
So we'll send an announcement out on Piazza, but we've updated the PDF
So，我们会在Piazza上发布通知，但我们已经更新了PDF
01:14 - 01:17
So that you could drop the pictures in right into the the PDF
这样你们就可以将图⽚拖拽到PDF了
01:17 - 01:21
So you spitting that know ,so we give you a template for draw IO
So，我们给你们提供了⼀个模板⽤来画I/O
01:22 - 01:25
So it's an online tool to go quickly edit and modify the templates for your answers
So，它是⼀个在线⼯具，它能让你快速编辑与修改你的答案模板
01:26 - 01:28
So should we know handwritten drawings
So，这上⾯⽀持⼿写
1.28-1.29
and no photographs of like drawings
但你们不能⼿写完拍照上传给到上⾯
1.29-1.31
that everything should be done digitally
所有东⻄都应该以电⼦形式完成
01:31 - 01:35
And then we'll be releasing project #2 on this Monday as well
接着，我们也会在周⼀将Project #2放出来
1.35-1.40
and that'll II do think two or three weeks in October, okay
它的任务周期⼤概是要花2到3周
01:40 - 01:43
So any high-level questions about the project or homework 2
So，对于Project或者homework 2你们有任何⾼逼格的问题吗
01:47 - 01:49
Okay, so let's get in this
Ok，So 让我们上课吧
01:50 - 01:53
So the thing we need to talk about now is
So，我们现在需要讨论的是
1.53-1.57
that we spent the last three classes talking about data structures
我们花了三节课左右来讨论数据结构
01:57 - 02:02
We'd spend down hash tables and spent two days on B+tree,radix trees and other tree
data structures
我们已经讲了hash table，然后⼜花了两天在B+ Tree，Radix Tree以及其他树形结构上⾯
02:03 - 02:07
So for the most part during this entire conversation when we talk about these data
structures
So，在这整节课的⼤部分时间中，我们会讨论这些数据结构
02:08 - 02:13
We've assumed that they were only being accessed by a single thread
我们假设这些数据结构只能被⼀条线程⽽访问
02:14 - 02:17
But there was only one thread that could be reading and writing data to the data
structure at a time
但只有⼀条线程能够在同⼀时间对该数据结构进⾏读写数据
但在同⼀时间只有⼀条线程能够对该数据结构进⾏读写数据
02:18 - 02:20
And that simplified the discussion
这也就降低了我们的讨论难度
2.20-2.24
and so that you just understand what's the core essence of how these data structures
work
这样你们也就能够理解这些数据结构⼯作⽅式的核⼼本质了
02:24 - 02:25
But in a real System
但在⼀个真正的系统中
2.25-2.30
we obviously don't want to just have a single thread be you know only accessing the
data structure at a time
很明显，我们并不想同⼀时间只让⼀个线程去访问这个数据结构
02:31 - 02:32
We would allow multiple threads
我们想允许多个线程能在同⼀时间访问这些数据结构
2.32*-2.35 。。。。
because a modern CPUs there's a lot of CPU cores
因为在现代CPU中，它⾥⾯拥有⼤量的CPU Core
2.35-2.40
so therefore we can have multiple threads running queries and all updating our data
structures
因此，我们可以通过多线程来执⾏查询，并更新我们的数据结构
02:40 - 02:46
But also don't allow this the high disk stalls due to you know or stalls due to having to
go read read things from disk
同样，我们也不需要让cpu挂起等待从硬盘读取数据
2.46-2.50
because now if one thread is doing something and it reads a page that's not in memory
因为现在如果⼀条线程在做某些事情，⽐如读取⼀个不在内存中的page
02:50 - 02:53
It has to get stalled while the buffer pool manager brings that in
当buffer pool管理器将这个page放到buffer pool中时，这个线程就不得不停下来
2.53-2.55
and then we can let other threads keep running at the same time
那么，我们可以让其他线程在同⼀时间继续运⾏
02:56 - 2.59
So we're have a lot of threads running in our system
So，在我们的系统中运⾏着⼤量的线程
2.59-3.05
and we do this,because that maximizes parallelism or maximizes the reduces the latency
for the queries you want to execute
我们这样做的原因是，因为这可以最⼤化并⾏能⼒，或者是最⼤程度上减少我们想要执⾏查询时
的延迟
03:06 - 03:13
So for today we're now talked about up now we bring back multiple threads ,and want to
update ,and access our data structure what do we need to do to protect ourselves
So， 今天我们会去讨论多线程，我们想通过多线程来更新和访问我们的数据结构，我们该如何
保证线程安全呢？
03:14 - 03:15
So let's say as it a quick aside
So，让我们先说⼀下
3.15-3.17
so everything that we'll talk about today is
So，今天我们所讲的⼀切东⻄
3.17-3.20
what how most database systems actually work
都是关于⼤部分数据库系统实际如何⼯作的
03:20 - 03:22
Most database systems that support multiple threads
⼤部分数据库系统都⽀持多线程
3.22-3.26
will do the things that we're talking about today doing this latching stuff
我们今天会去讨论使⽤latch锁这个事
03:26 - 03:28
There are some particular systems that actually don't do any of this
有些特殊的数据库系统实际上并不会做这些事情
3.28-3.35
and only that single-threads has to access the data structures,and they still get really
good performance
即使只有单条线程能访问该数据结构，但它们依然可以获得良好的性能
03:35 - 03:38
So VOLTDB and Redis applied to 2 famous to do this miscreants one set dips
So，VOLTDB和Redis就是其中两个著名代表
03:38 - 03:39
So in case the Redis
So，以Redis为例
3.39-3.42
Redis only runs in one thread, it's a one threaded engine
Redis只在⼀条线程中运⾏，它是⼀个单线程引擎
03:42 - 03:43
In VOLTDB it's a multi-threaded engine
VoltDB则是⼀个多线程引擎
3.43-3.49
but they partition the database in such a way that every B+tree can only be accessed by
a single thread
但它们以某种⽅式将数据库进⾏分割，即每个B+ Tree只能由⼀条单个线程来进⾏访问
03:49 - 03:52
So you avoid all this latching stuff that we talked about today
So，这样你就避免了使⽤latch的情况，这也是我们今天要讨论的内容
3.52-3.54
and you get really great performance,
并且你也获得了⾮常优秀的性能
3.54-3.59
but obviously this means that it complicates scaling up to multiple cores or multiple
machines
但很明显，将它扩展到多核或多台机器上就会很复杂
03:59 - 04:03
But again we'll talk I'll just talk about these things later on in the semester
但我们会在这个学期稍后的时间⾥谈论这个
04:03 - 04:07
But the main idea now is that everybody pretty much does this things that we're talking
about
但现在主流的思想就是，所有数据库系统都有花⼤量精⼒在做我们所正在讨论的这些事情
04:09 - 04:14
So the way we're going to protect our data structures is through a concurrency protocol
a concurrency scheme
So，我们保护我们数据结构的⽅式就是通过⼀种并发协议或者并发⽅案来解决
04:14 - 04:22
And this is just the the method in which the database system guarantees the correctness
of the data structure
这是数据库系统⽤来保证数据结构正确性的⼀种⽅式
4.22-4.27
by enforcing all the threads to access the data structures, and using a certain protocol
or sort of certain way
即强制所有访问数据结构的线程都使⽤某种协议或者是某种⽅式
04:29 - 04:32
And so I'm putting the the word correct in quotes,
这⾥我给correct加了双引号
4.32-4.34
because that can mean about mean different things
因为这意味着⼀些不同的事情
04:34 - 04.38
And the kind of things were talking about they're accessing although we've been focused
on data structures,
虽然我们现在所讨论的是访问数据结构
4.38-4.41
but it really could be for any shared object in the system
但这真的可以适⽤于系统中的任何共享对象
04:41 - 04:47
Right, it could be for tuple, could be for an index ,could be for the page table ,and the
buffer pool,it doesn't matter
它也可以⽤于tuple，所以，page table以及buffer pool，这些都可以⽤到
04:48 - 04:55
So the two types of correctness we care about in concurrency control are logical
correctness and physical correctness
在并发控制中我们所关⼼的两种正确性类型是逻辑正确性和物理正确性
04:55 - 04.58
So logical correctness would be like a high level thing that says
So，逻辑正确性是⼀种⾼级层⾯的东⻄
4.58-5.01
if I'm accessing the data structure
如果我正在访问该数据结构
5.01-5.06
am I seeing the values or am I seeing the things that I expect to see
我是会看到值，还是会看到我希望看到的东⻄呢？
我希望看到的值是⾃⼰想看到的
05:06 - 05:07
So if I have a B+ tree index
So，如果我有⼀个B+ Tree索引
5.07-5.09
I insert the key five
我将key 5 插⼊
5.09-5.12
my thread that thread comes back and reads key five right away,
我的线程会回过头来，并⽴⻢读取key 5
5.12-5.13
it should see it
它应该可以看到它
5.13-5.16
right I should not get a should not get a false negative
它所得到的不应该是false或者negative
05:16 - 05:20
But that's a logical correctness thing that I'm seeing the things I that I expect to see
这就是所谓的逻辑正确性，即我看到了我希望看到的东⻄
05:21 - 05:24
The thing that we're gonna care about in this class is physical correctness
我们这⻔课中所关⼼的是物理正确性
05:24 - 05:28
But how do we protect the internal representation of the data structure
但我们该如何保护数据结构的内部表示呢？
5.28-5.32
how it maintains pointers and references to other pages and keys and values,
它该如何维护指针以及指向其他page的引⽤，还有key和value呢？
5.32-5.38
how do we make sure that as threads are reading writing this data that the integrity of
the data structure is sound
我们该如何确保线程读写数据时，该数据结构的可靠性呢？
05:39 - 05:44
So it's able to be we don't want the case where we're falling down traversing into the B+
tree
So，当我们向下遍历B+ Tree时
5.44-5.47
and when we jump to the next node, we have a pointer to that
当我们跳到下⼀个节点的时候，我们需要⼀个指向它的指针
05:47 -05:50
And then by the time we read the pointer figure out where we need to go
接着，当我们读取指针，以此来弄清楚我们需要往哪⾥⾛
05:50 - 05:51
And then then try to jump there,
然后，就试着跳到那个位置
5.51-5.54
somebody else modifies the data structure well
其他⼈也会去对该数据结构进⾏修改
5.54-5.58
now that pointer is pointing to a an invalid memory location,
现在，该指针指向了⼀个⽆效的内存位置
5.58-6.01
and we would get a Segmentation fault
现在，我们就会得到⼀个Segmentation fault（存储器区块错误，简称segfault）
06:01 - 06:02
So this is what we're trying to do today,
So，这就是我们今天所要试着解决的事情
6.02-6.06
we're trying to protect the internal data structure to allow multiple threads read and
write to it
我们会试着保护内部数据结构，并允许多条线程对其进⾏读写数据
6.06-6.11
and that they still that the data structure is behaving correctly
该数据结构依然能被正确使⽤
06:11 - 06:13
For the logical correctness
对于逻辑正确性来说
6.13-6.16
we'll worry about this more when we talk about transactions and concurrency control
当我们在谈论事务和并发控制时，我们会对此更为关⼼
06:16 - 06:19
All right, this is a whole another super interesting topic
这是另⼀个我们⾮常感兴趣的主题
6.19-6.24
but for today we say you know happy make sure that the data structures are thread safe
但今天我们要做的，就是确保该数据结构是线程安全的
06:24 - 06:30
So we'll begin by talking about what is actually a latch they're a bit more detailed than
we then we talked about so far, and how it's actually implemented
So，我们先会从什么是latch开始，这要⽐我们⽬前为⽌所讨论的内容来说，要更深⼊细节，并
且我们还会谈论它实际是如何实现的
06:31 - 06:37
And then we'll start off with an easy case of actually doing thread safe hash tables using
latches for those
接着，我们会去看⼀个简单的例⼦，即如何使⽤latch来保证hash table的线程安全
6.37-6.39
because that they're actually really simple to do
因为它们实际上⾮常简单
06:39 - 06:42
But then we'll spend most time talking about how to handle in B+tree
但之后我们会将⼤部分的时间⽤来讨论该如何在B+ Tree中进⾏这样的处理
6.42-6.49
and what's talking how do leaf node scans ,and other optimizations again when we have
multiple threads accessing things same time
然后，当我们使⽤多个线程同⼀时间访问这些东⻄时，我们会去讨论该如何对叶⼦节点进⾏扫
描，以及⼀些其他优化
06:49 - 06:49
Okay
06:51 - 06.53
All right,so I showed this slide last time
So，我上次已经向你们展示过了这张幻灯⽚
6.53-6.57
and I don't think everyone you know we only talked about very briefly
我们上次讲它的时候，只是⼤概讲了下
6.57-6.58
and I don't think everyone absorbed its on it
我并不觉得每个⼈都从中学到了什么
6.58-7.02
I want to spend more time talking about the difference between locks and latches
我想花更多的时间来讨论lock和latch之间的区别
07:03 - 07:06
So in the database world where I live
So，在我所在的数据库世界中
07:07 - 07:10
A lock is a higher level concept
lock是⼀种更⾼级层⾯的概念
7.10-7.14
that protects the logical contents of the database
它保护了数据库中的逻辑内容
07:14 - 07:20
So a logical content would be like a tuple or ,a set of tuples, or a table, a database
So，逻辑内容可以是⼀个tuple，或tuple的集合，或⼀张表，或者是数据库
07:21 -07:27
And we're having using these locks to protect these logical objects from other
transactions that are running at the same time
当同⼀时间有其他事务在运⾏时，我们会使⽤这些lock来保护这些逻辑对象
07:28 - 07:31
Like if I'm modifying something in a transaction
⽐如，如果我在⼀次事务中修改某些东⻄
7.31-7.36
and so I don't want anybody else to modify that tuple at the same time that I am
So，我不想让其他⼈在同⼀时刻也去修改该tuple
07:36 - 07:40
Right, you may for other reasons but for our purposes assume that we don't want that to
happen
但出于我们的⽬的，我们并不想让这种事情发⽣
07:41 - 07:46
So for these locks we're gonna hold them for the entire duration of the transaction
So，我们会在整个事务的执⾏期间持有这些lock
7.46-7.47
again that's not entirely true
再说⼀遍，这并不是完全正确
7.47-7.50
but again for our purposes just assume that's the case
但出于我们的⽬的，我们就以这种情况为例
07:50 - 07:56 ！！！
And then we need to be able to roll back any changes we make to the objects we modify
if we hold the locks for them
然后，我们需要能够将这些对象回滚到任何操作前的状态，如果我们持有它们的锁的话
07:57 - 08:00
So if I'm trying to transfer money from my account to her account
So，如果我试着将钱从我的账户转到她的账户
8.00-8.02
if I take the money out of my account
如果我将钱从我的账户取出
8.02-8.05
and then I crash before I put the money in her account,
在我将钱放⼊她的账户前，我遇上银⾏系统崩溃
8.05-8.08
when I come back, I want to reverse that change I made to my tuple
当我这⾥系统恢复正常后，我想要撤销对该tuple所进⾏的修改
08:09 - 08:13
So these so in that means the database system is responsible for knowing how to roll
back these changes
So，这就意味着，数据库系统要负责对这些修改的回滚
08:14 - 08:15
So notice up here
So，注意上⾯这⾥
8.15-8.18
I didn't say anything about threads or I'm talking my transactions
我并没有谈论任何关于线程的事情，我讨论的是事务
08:19 - 08:23
So a single transaction could be could be broken across multiple threads
So，⼀个单个事务可能会被多个线程破坏
8.23-8.26
and they could all be updating the same tuple
这些线程可以更新同⼀个tuple （知秋注：如果没有锁的话，就出⼤事了）
08:26 - 08:27
That's okay, that's allowed
这种是Ok的，我们也允许
8.27-8.29
because the transaction holds the lock
因为在执⾏事务的时候，我们持有锁
8.29-8.32
it doesn't matter what thread that that's actually doing the modification
所以在实际执⾏过程中，不管哪个线程进⾏修改，都没问题
08:32 - 08:42
Where we get down to the low level constructs that we care about protecting the
physical integrity of our data structures or the objects is latches
在低级层⾯，我们所关⼼的就是⽤来保护数据结构或对象的物理完整性的latch
08:42 -08:44
So in the operating system world
So，在操作系统的世界中
8.44-8.46
they this is what they call locks or mutexes,
它们将latch叫做lock或者是mutex
8.46-8.50
in our world there's latches because we need to distinguish them from locks
在我们的世界中，我们将它叫做latch，因为我们需要将它们和lock区分开来
08:50 - 08:53
So latches are going to protect the critical sections of the database systems
So，latch会去保护数据库系统的关键部分
8.53-9.00
internal data structures from other threads that are reading writing into that data
structure or that object at the same time
即latch可以保护内部数据结构免受其他线程对该数据结构或对象同⼀时刻进⾏读写所带来的问
题
09:00 - 09:07 ！！！！！
So we're only hold latch for a short period just for the duration that were in the critical
section to do whatever operation that we need to do
So，我们只会在⼀⼩段时间内持有latch，我们只会在对关键部分进⾏所需操作时持有这个latch
09:07 - 09:09
I want to update a page
⽐如，我想去更新⼀个page
9.09-9.13
I hold the latch on that page make the change then release the latch
在我对该page进⾏修改的时候，我会持有这个latch，修改完后，我会对它进⾏释放
09:13 - 09:15
We don't need to be able to roll back any changes here
这⾥我们不需要能够去回滚任何修改
9.15-9.21
because the operations we're trying to do are essentially meant to be atomic
因为我们所尝试要进⾏的操作，本质上来讲是原⼦性操作
09:21 - 09:23
So I hope I grabbed a latch from something
So，我希望我能抢到⼀个latch
9.23-9.24
I make whatever change I want
那我就可以做我想做的任何修改了
9.24-9.29
and then when I release the latch then the operations considered done,
接着，当我释放了这个latch后，那么这些操作就被认为是完成了
9.29-9.32
so all the changes are there
So，这样就执⾏了所有的修改
09:32 - 09:33
If I can't acquire the latch
如果我⽆法获取这个latch
9.33-9.35
then I'm not gonna do the operation anyway
那么我也就没法进⾏这些操作
9.35-9.38
so there's nothing to rollback
So，这也就⽆须回滚任何东⻄了
09:38 - 09:40
So another way to think about this is
So，另⼀种思考这个的⽅式是
9.40-9.46
this great table from the that that B+tree book I recommended a few lectures ago from
Goetz Graefe
这个表是我前⼏节课提到那本B+ Tree相关的书⾥所提供的，这本书是由Goetz Graefe编写的
09:46 - 09:50
We has this nice table that lays out again the distinction between locks and latches
这张表上列出了lock和latch之间的区别
09:51 - 09:54
So for locks we're gonna separate user transactions from each other
So，在lock中，我们会将⽤户的事务彼此之间分开
so，对于lock来说，我们会将彼此间的⽤户事务分开
09:54 - 09:59
And they're gonna be protecting the database contents, tuples, tables things like that
lock能⽤来保护数据库内容，tuple，表之类的东⻄
09:59 - 10:01
And we're gonna hold them for the entire duration of the transaction
在我们执⾏事务的整个期间内，我们都得持有lock
10.01-10.06
there's gonna be a bunch of different lock types that we can help hold on these objects
这⾥有⼀些不同类型的lock，我们可以在对对象进⾏修改时，持有它们
10:06 - 10:08
Again, we'll cover this in a few more lectures
这些我们会花⼏节课的时间来对此介绍
10:09 - 10:12
And then when it comes time to actually dealing with deadlock
当真正应对死锁问题的时候
10.12-10.22
we're gonna rely on some external coordinator a lock manager or transaction manager to
resolve any deadlock that could occur
我们会去依赖某些外部协调者，⽐如，lock管理器，事务管理器，以此来解决任何可能会发⽣的
死锁问题
10:22 - 10:25
And the methods we can use are waits-for timeout aborts or some other things
我们可以去使⽤这些⽅法，⽐如：Waits-for，Timeout，Aborts或者其他⽅法
10.25-10.26
and what we'll focus on these later
我们稍后会关注下这些
10:27 - 10:28
What we care about is over here
我们所关⼼的是这⾥
10:29 - 10:31
We have these latches they're gonna protect threads from each other
我们通过这些latch⽤于这些线程彼此间共享变量的保护
10.31-10.35
for our in-memory data structures
对于我们那些内存型数据结构来说
10:35 - 10:37
We're gonna protect the critical sections inside these data structures
我们会去保护这些数据结构中的关键部分
10.37-10.41
there's only going to be two lock modes read and write
latch只有两种模式，即读锁和写锁
10:41 - 10:47
And the way we're going to avoid deadlocks is to us being good good programmers
我们避免死锁的⽅式是让我们成为优秀的程序员
通过避免死锁来让我们成为⼀个优秀的程序员
10.47-10.50
which is nice for databases good equals expensive right
对于数据库来说这很nice，但这等于要付出昂贵的代价
10:50 - 10.55
So it's up for us to make sure that we write high-quality code in our data structures to
avoid deadlocks,
So，这就取决于我们，我们要确保我们在数据结构中编写⾼质量的代码，以此来避免死锁
10.55-11.01
because there is no external thing like a transaction manager or lock manager that's
going to rescue us if we have a deadlock
因为我们没法通过外部的东⻄，⽐如事务管理器或者是lock管理器来帮我们恢复，如果我们遇上
死锁问题的话
11:01 - 11:07
It's up for us to design and implement our data structure in such a way that deadlocks
cannot occur
我们得设计并实现出那种并不会发⽣死锁的数据结构
11.07-11.10
and we'll see what that looks like later on
我们之后会看到这种锁
11:10 - 11:12
So again our focus is on here
So，再说⼀遍，我们的重点是这⾥
11.12-11.18
we'll discuss all this lock stuff in lecture 17 after the midterm
我们会在期中考试后的第17节课上讨论Lock
11:18 - 11:20
Again, I find all the super fast thing
再说⼀遍，我所找到的这些东⻄，⽤起来速度都⾮常快
11.20-11.28
but this is like one but the the black arts of database systems, if you can you know
actually make this stuff work
但这就像是数据库系统中的⿊科技，如果你知道该怎么让它⼯作的话
11:28 - 11:31
All right, so let's talk about the latch modes work for that we can have
So，我们来谈下我们所能使⽤的latch模式
11:32 - 11:33
Again there's only two modes read and write
再说⼀遍，这⾥只有两种模式，即读模式和写模式
11:34 - 11:37
So the latch is being held in read mode
So，在进⾏读模式的时候，我们要持有latch
so，我们所持有的latch是读模式时
11.37-11.42
then multiple threads are allowed to share that read latch
那么我们就允许多条线程在同⼀时间去读取同⼀个对象
11:42 - 11:44
Right, because again it's a read-only operation
再说⼀遍，因为这是⼀个只读操作
11.44-11.47
so I can have multiple threads read the data structure at the same time
So，这样我就可以在同⼀时间让多条线程读取该数据结构
11.47-11.51
there's no conflict, there's no integrity issues that could occur
这⾥就不会起冲突问题，没有不会发⽣完整性问题
这⾥不会产⽣冲突问题，没有写操作的发⽣
11:51 - 11:52
So they can all share that
So，它们可以共享这个数据结构
11:53 - 11.55
If I take out the latch and write mode
如果我拿到的是写模式的latch
11.55-11.58
then I can only that's an exclusive latch
这是⼀种独占型的latch
11.58-12.01
only one thread can hold that latch in that mode at a time
在这个模式下，⼀次只有⼀条线程能持有这个latch
12:01 - 12:03
So if I hold it write latch
So，如果我持有write latch
12.03-12.07
I'm making changes nobody else can read that object that I'm protecting until I finish
我就会对该对象进⾏修改操作，直到我完成操作前，没有⼈可以读取该对象
12:09 - 12:11
All right, the only two modes we care about
这就是我们所关⼼的两种模式
12.11-12.14
think of this is like again multiple threads we share this one
再思考下，这种情况下（读模式），我们可以让多条线程访问这个对象
12.1412.16
this is this is an exclusive latch
在这种情况下（写模式），它就是⼀个独占型latch
12:17 - 12:20
All right, so let's talk actually how you implement a latch in a real system
So，现在我们来讨论下该如何在⼀个真正的系统中实现latch
12:21 - 12:25
So the first approach is probably the one you're most familiar with
So，第⼀种⽅式可能是你们最为熟悉的⼀种
12.25-12.28
you know when you take any kind of systems course or operating system course
当你们在学习任何⼀⻔系统相关的课程时，⽐如操作系统课程
12.28-12.31
it`s a blocking operating system mutex and blocking OS mutex
你们会学到Blocking OS Mutex
12:32 - 12:33
So this is the simplest thing to use
So，这是⽤起来最简单的东⻄
12.33-12.37
because it's sort of built into the language, like it like in C++
因为这是内置在语⾔中的东⻄，就⽐如：C++
12:37 -12:39
The standard template library has this thing std::mutex
它⾥⾯的标准模板库就有std::mutex
12.39-12.41
and it's really simple to use
并且使⽤起来真的很简单
12.41-12.42
you just declare it
你只需对它进⾏声明
12.42-12.46
then you call lock do something what you know on your the object you're protecting
with it
当你要对你的对象进⾏某些操作的时候，你可以调⽤lock对它进⾏保护
12.46-12.48
,and then you call unlock, and you're done
接着，你再调⽤unlock，这样操作就完成了
12:50 - 12:54
Right, so does anybody know how this actually works in the operating system
So，在座的有⼈知道这玩意是如何在操作系统中⼯作的吗？
12.54-12.56
in least some Linux
⾄少是在某些Linux系统中
12.56-12.57
how did the mutex like this work
mutex是如何⼯作的呢？
12.57-12.57
yes
请讲
12:58 - 13:00
He says Futex, what is a Futex
他说是使⽤了Futex，那么Futex是什么？
13:02 - 13:02
What's that
能说清楚点吗？
13:06 - 13:12
He said well, so he said Futex he's correct in Linux, Futex stands for fast userspace
mutex
Well，他说的没错，就是使⽤Futex，Futex指的是fast userspace mutex
13:12 - 13:13
The way it works is that
它的⼯作⽅式是
13.13-13.15
there is the in user space
它是在userspace中的
13.15-13.17
meaning in the address space of your process
也就是你的进程中的地址空间⾥⾯
13.17-13.23
there'll be a memory location that has you know a like a bit usually a byte also
它会占⽤⼀点内存地址，⽐如1bit或者1byte左右
13:23 - 13:29
But I'll have a memory location that you can then try to do a compare and swap on to to
acquire that that latch
但我会通过这个内存位置来尝试进⾏⼀次CAS操作，以获取这个latch
13:30 - 13:31
But then what happens is
但接着发⽣的事情是
13.31-13.32
if you don't acquire it
如果你没能获取到它
13.32-13.36
then you fall back to the the slower default mutex
那么，我们就会退⼀步使⽤速度更慢且默认使⽤的mutex
13.36-13.38
where that goes down into the operating system
这是操作系统层⾯的东⻄
13:38 - 13:39
So the idea is
So，这⾥的思路是
13.39-13.42
you do a quick compare and swap and in userspace
你在userspace中进⾏⼀次快速的CAS操作
13.42-13.43
if you acquire it you're done,
如果你获取到这个latch，那就⾏
13.43-13.47
if you don't acquire it, then you fall down to OS which is gonna be slower
如果你没能拿到，那你就会去使⽤速度相对很慢的OS层⾯的mutex
13:47 - 13:48
Because what happens is
因为这⾥所发⽣的事情是
13.48-13.52
if you go down OS and sit on a mutex inside the kernel
如果你到OS层⾯并调⽤内核中的mutex
13.52-13.56
then the OS aha well I know you're blocked on this mutex and you can't get it
然后OS就表示，我知道你被这个mutex给阻塞了，你没法拿到这个latch （知秋注：并将你放到
⼀个等待队列中，等待调度器调度）
13:56 - 13:59
So let me tell the scheduler to do schedule, so you don't actually run
So，让我告诉调度器来进⾏调度。这样你实际上就运⾏不了了
14:01 -14:02
And the reason why this is expensive
之所以这样做代价昂贵的原因是
14.02-14.07
because now the OS has its own internal data structures that is protecting with latches
因为OS有它⾃⼰的内部数据结构，会使⽤latch来保护它们
14:07 - 14:11
So you've got to go update now the discussion table to say this this process of this
thread can't run yet
so 你就会得知这个争抢失败的线程⽆法运⾏了
14:12 - 14:12
So he's correct
So，他说的没错
14.12-14.15
fast user-space mutex is will be fast
Futex的速度会很快
14.15-14.17
cuz that's just a spin latch we'll talk about the next slide
因为这是⼀种spin latch，这个我们在下⼀张幻灯⽚会讲
14:18 - 14:21
But he fall down to OS then then then you're screwed
但如果我们回退到OS层⾯，使⽤mutex
14:22 -14:25
So this is another great example were like we were trying to avoid the OS much as
possible,
So，这就是另⼀个很好的例⼦了，这⾥⾯我们会尽可能的避免使⽤OS层⾯的东⻄
14.25-14.28
for the first project you guys use this,because it's fine
在第⼀个project中，你们可以使⽤这个，因为这种做法并没有问题
14:28 - 14:29
But if you have a high contention system
但如果你使⽤的是⼀个⾼竞争系统
14.29-14.32
then everybody is going down to the OS and that's that's gonna be a problematic
那么，所有东⻄都使⽤OS层⾯的mutex，那么这就很成问题
14:34 - 14:39
So the alternative is to implement ourselves using a spin latch or test-and-set spin latch
(TAS)
So，另⼀种备选⽅案就是由我们⾃⼰去实现，即使⽤⼀个spin latch或者是TAS（test-andset，可以认为是CAS）spin latch
14:39 - 14:42
So this is extremely an extremely Efficient,
So，这种做法会⾮常⾼效
14.42-14.43
it's super fast
它的速度超级快
14.43-14.46
because on modern CPUs ,there's a single instruction
因为在我们的现代CPU中，它⾥⾯有⼀条指令
14.46-14.50
there's an instruction to do a single compare and swap on a memory address
使⽤这条指令可以在⼀个内存地址上进⾏单次CAS操作
14:50 - 14:53
I think it just like I check to see whether the value of this memory address is what I think
it is
即检查这个内存地址上的值是否和我认为的值相等
14:54 - 14:54
And if it is
如果相等
14.54-14.57
then I'm allowed to change it to my new value
那么我就允许它将原来的值变为新的值
14:57 - 14.59
So think of like the latch is set to 0
So，假设这个latch要将值设置为0
14.59-15.00
I check to see whether it's 0
我会去检查这⾥是不是0
15.00-15.01
and if it is
如果它是的话
15.01-15.02
then I set the 1
那么我将它设置为1
15.02-15.04
and that means I've acquired a latch
这就意味着我已经拿到了latch
15:04 - 15:07
And you can do that a modern CPUs and single instruction
你们可以通过现代CPU中的单条指令来完成
15:08 - 15:13
Right, you don't have to have you don't the write C code like if this then that ,it does it
all for you
你⽆须去编写这样的C代码，⽐如if then这样的语句，这条指令会帮你做这样的事情
15:14 - 15:21
So the way even implement this is in C++ is that you had this atomic keyword which is
templated ,you can put whatever you want there
你可以在C++中这样实现，使⽤这个atomic关键字，它是⼀种模板，你可以将它放在你想要的
任意位置
15:21 - 15:24
But they have a shortcut for you called atomic flag
但它们使⽤了⼀个快捷⽅式，即atomic_flag
15.24-15.27
which is just an alias for atomic<bool>
它其实是atomic<bool>的别名
15:27 - 15:30
And so inside this now it will when we want to acquire this latch
So，在这段代码⾥⾯，当我们想去获取这个latch时
15:30 - 15:32
We have to have this while loop
我们必须使⽤这个while循环
15.32-15.35
that says test-and-set the latch
在它的条件判断部分有⼀个latch.test_and_set()
15.35-15.36
if I acquire it
如果我获取到这个latch
15.36-15.38
then I jump out of the the while loop
那我就会跳出这个while循环
15.38-15.39
because I hold the Latch
因为我拿到了这个latch
15:39 - 15:41
If I don't
如果我没能拿到这个latch
15.41-15.42
fall into the while loop
那我就得进⼊这个while循环
15.42*-15.46
and now it has some logic to figure out what should we do
并通过⼀些逻辑来弄清楚我们该做什么
15:46 - 15:50
The simplest thing is just say all right let me just retry again loop back around and keep
trying it
So，最简单的做法就是我们重新试着获取这个latch，⼀直尝试去获取它就⾏
15:51 - 15:55
Right, the problem with that is though that's just me burning out your CPU you're not
burning out literally
这种问题在于会去燃尽你的CPU，虽然并不是字⾯上燃尽的意思
15:55 - 15.57
But you just burning cycles and your CPU,
但这会不停的循环，并且占⽤你的CPU
15.57-16.00
because you just keep trying to test that set test and set test the set
因为你会⼀直不断地尝试进⾏test-and-set
16.00-16.00
and it's always gonna fail
但这始终失败
16.00-16.03
and you keep spinning around and in this infinite loop
然后你就会⼀直在这个⽆限循环中⾃选等待
16:04 - 16:06
So the OS thinks you're actually doing useful work
So，实际上OS会认为你在做些有⽤功
16.06-16.08
because it doesn't know what instructions you're executing
因为它并不知道你在执⾏什么指令
16:08 - 16:11
So it says you keep executing instructions let me keep scheduling you
So，它表示，你先继续执⾏这些指令，我会为你继续调度
So，它表示，你要⼀直执⾏这个指令，让我持续给你传功吧！
16.11-16.13
and you're to spike the CPU
这样，CPU的使⽤率就会激增
16:14 - 16:17
So this this test and set thing is the same thing he said before about the fast user mutex,
So，这就是test-and-set了，它和之前他所说的Futex是⼀回事
16.17-16.23
this is the same thing the OS provides you in the Linux standard or the std::mutex on
Linux
这和OS所提供给你的效果是⼀回事，⽐如Linux中的std::mutex所提供的锁效果⼀样（但实现形
式不同，并不会⼀直⽆须循环进⾏TAS）
16:24 - 16:24
But maybe I don't want to burn my cycles
但可能我并不想去⼀直去榨⼲我的CPU Cycle
16:26 - 16:29
But he's keep retrying, maybe I want to yield back to the OS,
但它会不断重试，现在我可能就想回到OS层⾯来做些事情
16.29-16.32
let it schedule some other thread
让OS对其他线程进⾏调度
16.32-16.34
or maybe I try a thousand times
或者我尝试获取了1000次latch
16.34-16.37
and I'm saying I'm not gonna get this ,and I just up abort
如果我还没拿到这个latch，那就会进⾏中断
16:37 - 16:39
So this is a good example
So，这就是⼀个很好的例⼦
16.39-16.41
of where we as the database systems developer
我们作为数据库系统开发⼈员
16.41-16.47
we can be smart or we can tune the our implementation
我们⾮常聪明，我们可以对我们的实现进⾏调优
16.47-16.52
however using latches and our data structures to be mindful
但在使⽤latch和我们的数据结构时要注意
16.52-16.55
try to accommodate what we think the workloads gonna look like
不管我做什么操作，latch的获取与释放都应该很快
试着去想下我们的线程在TAS失败后会遇到的⼯作情况
16:55 - 17:00
If I think that this latch has to be like whatever the operation I'm doing the latches to be
super fast
不管我做什么操作，latch的获取与释放都应该很快
17.00-17.02
then it's probably faster for me to just keep retrying
那么对等待的线程来说进⾏重试的速度就可能很快
17.02-17.04
because whoever holds the latch will give it up real quickly
因为不管谁拿着latch，它都会很快放弃这个latch
17:04 - 17:06
But if I think the operation is going to be super long
但如果我觉得操作要花的时间太⻓了
17.06-17.12
then maybe I want to yield or for some amount of time or eventually abort
那么我可能会对线程进⾏yield操作，让其他的线程先执⾏，或者就直接中断操作
17:12 - 17:13
We can't do this in the blocking OS mutex
我们没法在blocking OS mutex中做这个
17.13-17.15
soon as we try to get it ,we can't get it
即当我们试着去获取锁的时候，我们没有办法让线程做让出cpu资源这个事⼉（yield操作）
17.15-17.18
the OS takes over ,and we're blocked
OS就会去接⼿，然后我们就阻塞了
17:18 - 17:18
yes
请问
17:21 - 17:23
The questions what is this
你的问题是这个吗？
17:25 -17:27
this ,oh this
Oh，这个啊
17:28 - 17:31
yeah like the primers would be like it's compare and swap
这⾥其实就是⼀个CAS操作
17.31-17.37
it says at this memory address check to see whether the value is this, like passing a zero
它表示，在这个内存位置，检查下该值是否是这个，⽐如这⾥传⼊⼀个0
17:37 - 17:39
If it if it equals zero， then set it to one
如果这⾥的值等于0，那么就将这个值设置为1
17:40 - 17:42
Right, and then there's different there's different API,
这⾥有些不同的API
17.42-17.44
sometimes you'll get back the old value
有时你会拿到⽼的值
17.44-17.45
you'll get back a true whether it's succeed
不管它CAS有没有成功，你拿到的都是true
17.45-17.47
there's a bunch different things
这⾥涉及到很多不同的东⻄
17:47 - 17:52
And then they have they have test and sets for you know for all the different types you
could you could be based on
接着，这⾥的test_and_set()⽅法，你可以⽤于各种类型的数据
17:55 -17.56
So again the main takeaway here is
So，这⾥的主要要点是
17.56-17.59
that again we we in the database system can do a better job than the OS,
再说⼀遍，我们在数据库系统中所做的可以⽐OS给我们所提供的要来得更好
17.59-18.02
because we would know in what context we be using this latch
因为我们知道在哪个上下⽂中，我们会去使⽤latch
18:05 - 18:07
So for these two examples
So，在这两个例⼦中
18.07-18.10
though the latch has just been you know do I hold it or not
我是否持有这个latch呢？
18:11 -18:12
as I said before
正如我之前所说
18.12-18.14
we have different modes
我们有不同的锁模式
18.14-18.20
so we need a reader writer latch that can support we have these different modes
So，我们需要⼀个reader-writer latch来⽀持这些不同的模式
18:20 - 18:27
the way we basically do this and we build on top of whatever our basic latching
primitive we have either the spin latch or the POSIX mutex
简单来讲，我们是通过在基础的latch原语之上构建出spin latch或者POSIX mutex这种东⻄
18:27 - 18:33
and then we manage different queues to keep track of how many threads are waiting
acquired to different types of latches
然后我们通过管理不同的队列来跟踪不同类型的latch有哪些线程在等待获取
18:34 - 18:36
right so it may be just mentioned some counters to say
So，它这⾥⾯可能会使⽤⼀些计数器
18.36-18.39
here's the number of threads that help hold the Latch, in this mode
计数器会表示，这⾥是持有该模式latch的线程数量
18.39-18.41
here's the number of threads that are waiting for it
这⾥是等待该latch的线程数量
18:41 - 18:45
so if a read thread shows up and says I want to get the read latch,
So，如果这⾥有⼀个读线程，它表示它想去获取read latch
18.45-18.46
well I look over here and say
Well，我看了下这⾥，并表示
18.46-18.50
nobody nobody holds the right latch and nobody is waiting for it
没有⼈持有这个latch，也没有⼈正在等待获取它
18:50 - 18:52
so I go ahead and and hand it out
So，我把这个read latch分发给这个线程
18.52-18.58
and I update my counter to say I have one thread that holds this latch
接着，我更新下我的counter，并表示我有⼀条持有这个latch的线程
18:58 - 19:00
another thread comes along
这时⼜来了另⼀条线程
19.00-19.01
and once also quite a Reed latches
它也想去获取⼀个read latch
19.01-19.04
again Reed latches are compatible or making me shared
再说⼀遍，我们能够共享read latch

09-02
19:04 - 19:10
So we just recognize that this guy already holds the reed latch so this guy can also
acquire it, and we just update our counter
So，我们已经认知到前⼀个线程已经持有了这个read latch，后⼀条线程也能去获取这个
latch，我们只需更新我们的计数器即可
19:11 - 19:15
So now the writer thread comes along what's the Write latch, it has to stall,
现在⼜来了⼀条写线程，它必须停下来等待获取write latch
19-.15-19:19
because the read latch is being held by other threads
因为read latch已经被其他线程所持有了
19:20 -19:22
And so we just add our counter here to say that we're waiting for this
So，这⾥我们只需更新下我们的计数器，并表示有⼀条线程正在等待获取write latch
19:23 - 19:28
So now if a read thread comes along and wants the read latch, what should happen
So，如果现在⼜来了⼀条读线程，并且它想获取read latch，这时会发⽣什么呢？
19:35 - 19.35
right
说的没错
19.35-19.36
so you says depends on what policy were using,
So，你说了，这取决于我们所使⽤的的策略是什么
19.36-19.43
we could just immediately let the say, uh read latches already is already being held go
ahead and also acquire it
我们可以这样说，read latch已经被⼏条线程所拿到了，并且其他线程也在获取它
19:43 - 19:44
But that could lead to starvation
但这会导致starvation
19.44-19.47
because the right on the right thread will never get to it
因为右边的线程永远不会拿到这个latch
19:47 - 19:48
So in this example here
So，在这个例⼦中
19.48-19.52
we could just stall it add it to the counter say we're waiting for this
我们只能将这条线程停下来，并将它添加到计数器的等待队列中去
19:52 - 19:56
And then eventually when the first two guys releases the latches
最终，当这前两条线程释放了这个latch后
19.56-19.58
the writer thread will get the latch
这条写线程就会拿到这个latch
19:58 - 20:01
Again this depends what policy we want to use
再说⼀遍，这取决于我们想要使⽤哪种策略
20.01-20.06
depends on in what context we the the latch is is being used
同时，这也取决于我们想将这个latch⽤在哪种上下⽂中
20:07 - 20:11
Right, if it's a data structure where there's not many writes, but the writes are really
important
如果我们有这样⼀种数据结构，它不会涉及太多的写⼊操作，但这些写⼊是⾮常重要的
20.15-20.15
then we want to give higher priority to the write of threads
那我们就会赋予写线程更⾼的优先级
20:15 - 20:17
Okay
20.17-20.27
and again we just build on top of our the data structures that are that the latching
primitives that I showed before to implement something like this
再说⼀遍，我们会在我们的数据结构之上使⽤这些我之前展示过的latch原语来实现这种类似的
东⻄
20:27 - 20:33
And you can still do this you still depending on how you organize the memory you can
still do this, most of the operations on this atomically
取决于你组织内存的⽅式，你依然可以做到这个，这⾥⾯⼤部分的操作都是原⼦性操作
20:35 - 20:35
Okay
20:37 - 20:40
All right, so let's now see how we take these latches and actually do something with
them
So，现在让我们来看下实际该如何⽤这些latch做些事情
20:41 -20:44
So the first thing is as I said well first talk about do hash tables
⾸先之前我已经说过该如何使⽤hash table来做这样的事情
so 第⼀件事就是⽤它（latch）来玩玩我之前聊过的hash table
20.44-20.46
because this is actually super easy to do
因为这实际很容易做到
20:47 - 20.49
And the reason why it's super easy to do
之所以很容易做到的原因是
20.49-20.55
because the ways in which threads can interact with our hash table is is limited
因为能与我们的hash table进⾏交互的线程的⽅式是有限的
因为多个线程间通过使⽤我们的hash table来进⾏交互的⽅式是有限的
20.55-21.00
meaning we probe into a for this one assuming we're doing like the static hashing table
对于这个，假设我们使⽤的是⼀个静态hash table
21:00 - 21:03
The extendable linear stuff that dynamic ones
extendable linear那些则是动态hash table
21.03-21.03
they're a bit more complicated
它们要来得更为复杂些
21.03-21.07
but the same principles apply here
但同样的原则这⾥也适⽤
21:07 - 21:09
But saying a linear probing hashing table
但这⾥我们还是以linear probing hash table为例好了
21:09 - 21:12
My key shows up ,I just hash it, I jump to some slot
当我插⼊key时，我要对它进⾏hash，然后跳到某个slot处
21.12-21.16
and then I just scan down in sequential order on the hash table
然后我会按照顺序往下扫描hash table
21.16-21.19
try find a thing what I'm looking for
以此来找到我正在查找的东⻄
21:20 - 21:22
And everybody every other thread is doing the same thing
其他的线程也会做同样的事情
21.22-21.26
they're always scanning top to bottom
它们始终会⾃上⽽下进⾏扫描
21:26 - 21:28
Eventually reach the bottom and loop back around
最终会扫描到hash table的底部，并反复扫描
21.28-21.30
but you think of that is just a circular buffer
但你可以将它认为是⼀个环形buffer
21.30-21.32
where you're essentially always scanning down
本质上来讲，你们始终会向下扫描
21:32 - 21:33
So in this case here
So，在这个例⼦中
21.33-21.34
deadlocks aren't possible
死锁是不可能发⽣的
21.34-21.36
because everybody is going in the same direction
因为所有线程的扫描⽅向都是往下的
21:36 - 21:38
Nobody's coming up in the other way
没有⼈会以相反的顺序进⾏扫描
21.38-21.40
and they hold a latch it up that I want
并且这些线程都持有我想要的那些latch
21.40-21.45
and it holds a latch that I want like, you can't have a deadlock
这些线程持有了那些我想要的latch，这样就不会遇上死锁问题了
21:45 - 21:46
So this makes it super super simple
So，这就变得超级超级简单了
21:47 - 21.50
So for a resize the table
So，对于调整hash table的size来说
so，如果需要重新对hash table的⼤⼩进⾏调整
21.50-21.54
this one we just take a global latch on the usually in the header page
我们通常会在header page上加⼀个全局latch
21.54-22.01
that just prevents anybody else from reading and writing the table until I complete the
resizing
这是为了在我完整对table进⾏resize之前，阻⽌其他⼈对该table进⾏读写操作
这是为了在我对table的resize调整结束前，阻⽌其他⼈对该table进⾏读写操作
22:02 - 22:06
But again that's if we size our table a large enough to in the very beginning
但如果我们的hash table的容量⼀开始就很⼤的话
22.06-22.08
like this is a rare occurrence
像这种情况很少⻅
22:08 - 22:12
Most of the time we're doing you know probes or insertions and that'll be fast
⼤部分时候，我们进⾏查找或插⼊操作的速度会⾮常快
22:13 - 22:17
Deletions also complicate this too， if you want to do compaction or move data around,
删除操作就会有些复杂，如果你想对数据进⾏压缩，或者是移动数据
22.17-22.20
but for that we can just ignore
但对于这个我们可以先将它忽略
22:20 - 22:25
So the two approaches to do this will differ on the granularity of the latches
So，应对这⽅⾯的问题有两种⽅法，它们的区别在于latch的粒度上
22:26 - 22:32
So the first approach you just have at a on each page you just have a single
reader/writer latch
So，第⼀种⽅法是，在每个page上，我们使⽤⼀个read/write latch
22:33 - 22:36
And so when a thread wants to do something you know do a lookup
So，当⼀条线程想对该page做某些事情的时候，⽐如进⾏查找
22:36 - 22:42
before it can read the page or access it ,it has to acquire the Write latch for that page
在它可以读取或访问page之前，它必须先获取该page的read/write latch
22:43 - 22:48
The other approach is be more fine-grain latching where you have a latch for every
single slot
另⼀种⽅式就是使⽤粒度更⼩的latch，即你可以在每个slot上使⽤latch
22:49 - 22:50
So that means as you're scanning down
So，这意味着，当你向下扫描时
22.50-22.52
you can acquire the next slot's latch
你可以去获取下⼀个slot的latch
22.52-22.56
and then you go into it and then do it look for whatever whatever you're looking for
接着，你可以进⼊这个slot，并查找你要的数据
22:56 - 23:00
So there's this trade-off between the computation the storage overhead between these
two approaches
So，这就是这两种⽅法间，计算和存储开销上的取舍了
23:00 - 23:04
Because the page latch we have to store less latches there's only one per page
因为如果使⽤page latch，我们所保存的latch数量就⽐较少，⼀个latch对应⼀个page
23:04 - 23:07
But now this can potentially reduce our parallelism
但这可能会降低我们并⾏性
23.07-23.13
because you know even though two threads might be operating on different slots
因为有两条线程会操作不同的slot的情况存在
23:13 - 23:16
Because it's in the same page, they can't run at the same time
并且，这两个slot是在同⼀个page中，这两条线程也就没法在同⼀时间执⾏任务了
23:16 - 23:19
In the case of having a latch per slot
在对每个slot使⽤latch的情况中
23.19-23.21
it's gonna lob for more parallelism
这就会有更⾼的并⾏性
23.21*23.23
because the latches are more fine-grain
因为latch的粒度更细
23:23 - 23:25
But now I'm storing more latches in every single slot
但现在我会因为⼀个个slot⽽保存更多的latch
23:26 - 23:31
And now it's also more expensive to you know - keep acquiring latches as I'm scanning
through
这样当我在进⾏扫描时，获取latch时要付出的代价会更⾼ （知秋注：不仅占空间，⽽且也会占
计算资源）
23.31-23.34
because I'm doing it for every single slot that I'm looking at
因为我在扫描每个slot时，都得去获取latch
23:34 - 23:36 ！！！
So let's look at some high-level example
So，我们来看些⾼级案例
23:36 - 23:38
So first one would be page latches
So，第⼀个例⼦是关于page latch的
23.38-23.43
so again say we have a simple three page table that has two slots per page
So，假设我们有三个简单的page table，每个⾥⾯都有2个slot
23:44 - 23:49
And so the first thread wants to find D, and say D hashes to this this position here this
slot
So，第⼀条线程想找到D，这⾥表示我们将D进⾏hash处理，它落到了这个位置
23:50 - 23:53
So before I can go look inside of it to see whether the thing I want is there
So，在我能够检查这⾥⾯的东⻄是否是我要的东⻄之前
23.53-23.56
I first have to get the read latch on it
我⾸先得拿到这个这个page的read latch
23:56 - 23:59
And then once I have that now my cursor can start looking at it
那么我才能让我的游标开始在⾥⾯进⾏查找
然后⼀旦我拿到这个latch，我的游标开始在⾥⾯进⾏查找
24:00 - 24:03
Now let's say another thread comes along, and they want to insert E
现在，假设⼜来了另⼀条线程，它想插⼊E
24.03-24.05
and E wants to hash to where C is
并且，E想hash到C所在的位置
24.05-24.08
,can it do that can actually start looking at it
它能做到这点吗？
24:08 - 24:09
No, right
No
24.09-24.13
because it wants to take a write latch on this page
因为这条线程想拿到这个page上的write latch
24:14 - 24:17
Because it doesn't know that C is is full
因为它并不知道C所在的位置是否满了
24.17-24.18
it doesn't know it's gonna have to scan
因为这条线程并不知道，所以它得去进⾏扫描
24.1824.20
but so before they can even look at it ,it needs the Write latch
So，在这条线程可以查看这个page之前，它需要拿到write latch
24:20 - 24:22
The Write latch is not compatible to read latch
它所拿到的write latch与左边那条线程所拿到的read latch并不匹配
24.22-24.24
so it has to stall and wait
So，右边的这条线程不得不停下来，并等待
24:25 - 24:27
So the first guy scans down he looks at C
So，第⼀条线程向下扫描，它看到了这个C
24.27-24.30
and now he needs to go look at this next page here
现在，这条线程需要去看下⼀个page
24:30 - 24:32
And again the way we figure out what page you look at
我们弄清楚我们所查看的是哪个page的⽅式是
再次说下，我们想要弄清楚我们所查看的page⾥包含了什么
24.32-24.38
is we just look you know we look in our the header for the hash table
就是从hash table的header中去获取查看信息
24.3824.40
and the headers gonna say here's all the pages that you're looking for
它的header就会告诉你你所查看的page有哪些
24:40 - 24:41
But logically they're order sequentially
但从逻辑上来就，它们都是按顺序排列的
24:42 - 24:44
Right, so like page 0 page 1 page 2
So，⽐如这⾥的page 0，1和2
24.44-24.49
so you look in the header and say where do I find page 2 for my hash table
So，你可以通过header来知道hash table的page 2的所在位置
24:49 - 24:51
And so in order to do this traversal
So，为了进⾏遍历
24.51-24.55
when I want to go from from page 1 and page 2
⽐如我想从page1遍历到page2
24:55 - 25.00
I actually don't need to hold the latch on 1 and in order for me to jump down to 2
实际上，为了让我跳转到page2，我不需要持有page 1的latch
25:00 - 25:02
Because my hash tables static
因为我的hash table是静态的
25.02-25.03
I'm not resizing
我不⽤对它进⾏调整⼤⼩
25.03-25.08
so this location is always gonna be the same
So，这⾥的位置始终是⼀样的
25:08 - 25:12
So I can immediately release the latch before I jump to this and allow anybody else to
keep running
So，在我跳到此处之前，我可以⽴即释放这个latch，并允许其他⼈获取并继续运⾏
25.12-25.16
and then I can go ahead and acquire the latch for this
然后，我就可以往下⾛，并获取这个page的latch
25:16 - 25:17
This is gonna be different when we talk about B+tree
这和我们所讨论的B+ Tree并不相同
25.17-25.22
B+tree you have to hold a latch on whatever node you're coming from before you jump
to the next node
在B+ Tree中，在你进⼊某个节点以及跳到下个节点前，这段时间内你必须持有⼀个latch
25:23 - 25:26
And it's only when you get to the next node do you then release the one behind you,
只有当你进⼊下⼀个node时，那么你就得将前⼀个node的latch给释放掉
25.26-25.26
yes
请讲
25:36 - 25:39
Yeah, so he proposed an optimization
So，他提出了⼀种优化⽅式
25.39-25.42
Well，in this case here for thread 2
Well，在这个例⼦中的线程2来说
25.42-25.50
instead of trying to acquire a write latch, could I just require a read latch figure out
whether the thing I actually want would be there or not
我能否先去获取⼀个read latch以此来弄清楚我想要查看的地⽅是否有东⻄存在，⽽不是去试着
获取⼀个write latch来弄清楚这点
25:50 - 25:51
And then if it is
如果那⾥有存在我所需要的东⻄的话
25.51-25.53
then I go back and try to acquire the write latch
那么我就会回过头去，并试着获取write latch
25.53-25.54
or I just jump down here
或者，我跳到下⾯去
25.54-25.55
and say
并表示
25.55-25.57
you know do the same thing
这⾥进⾏同样的事情
25.57-25.59
because I know it's the thing I'm look for is not here
因为我知道我要找的东⻄并不在这⾥
25:59 - 26:00
If there's no delete to no movement, yes
如果没有删除，那也就没有数据移动
26:03 - 26:05
We'll talk the same technique when we apply for B+tree
当我们在讨论B+ Tree的时候，我们讨论过相同的技术
26.05-26.09
,I'm doing it that sort of the the naive way, but yes you can actually do that
我会以⼀种简单的⽅式来做，但没错，你也可以使⽤你的⽅法来做
26:09 - 26:10
In general
⼀般来讲
26.10-26.12
you don't really do latch upgrades
你不能对latch的模式进⾏升级（即读锁升级为写锁）
26.12-26.14
you can't say I'm in read mode now put me in write mode
你不能这样做，⽐如我现在拥有的是读模式的latch，现在我想将它的模式变为写模式
26.14-26.16
you release the latch
你需要将这个模式的latch进⾏释放
26.16-26.21
and then in one mode and put and get acquired again another mode
并去获取另⼀个模式的latch
26:21 - 26:21
All right,
26.21-26.24
so this guy get read latch ，he can start reading this
So，左边的线程1拿到了read latch，那么它就可以开始读取这个page了
26.24-26.25
now this guy gets the Write latch,
现在，这条线程拿到了write latch
26.25-26.28
it C`s that C`s not what I want
这⾥是C，C并不是我要的东⻄
26:28 - 26:29
So wants to scan down here
So，我想向下扫描
26.29-26.31
and this time T1 has gone away
此时，T1已经结束了它的任务
26.31-26.33
so can go ahead and be the Write latch
So，线程2可以往下⾛，并拿到write latch
26.33-26.35
see that the thing there's this slots occupied
它看到这⾥的slot已经被占⽤了
26.35-26.37
come down here and do the insert
于是，再往下⾛，把E插到这个slot上
26:37 - 26:39
Again it's more coarse-grained
这种做法的粒度会更粗
26.37-26.40
because only one thread can be inside,
因为只有⼀条线程能在这⾥⾯
26.40-26.44
if they're doing if the the latch mode conflict
如果两条线程在此latch模式下冲突了
26.44-26.47
was only one thread at a time to be inside the the table
那么⼀次只有⼀条线程能在这个hash table中⼲活
26:49 - 26:51
But it makes it more simple to actually acquire these latches
但实际上这使得获取这些latch的⽅式变得更加简单
26.51-26.54
I don't not acquiring latches every single one
这样我就不⽤为每个slot获取latch了
26:54 - 26:57
So let's see how to do it in which slot latches
So，我们来看下slot latch是如何做的
26:58 - 27:03
So again T1 starts, it wants to do find D, it hashes to where A is
So，这⾥线程T1开始⼯作，它想去找到D，它对D进⾏hash，但是落到了A的位置
27:03 - 27:05
So it acquires the read latch on A
So，它获取了A上⾯的read latch
27.05-27.08
and then T2 starts
接着，线程T2开始⼯作
27.08-27.09
it wants to do a write
它想进⾏写操作
27:09 - 27:11
So acquires the Write latch on C
So，它获取了C上⾯的write latch
27:12 - 27:13
And at this point
此时
27.13-27.15
when T1 starts up again and tries to look at this
当T1再次执⾏任务时，它会试着去看A这⾥
27.15-27.17
it can't run
它没办法执⾏任务
27.17-27.18
because you can't get that latch
因为它没能拿到那个latch
27.18-27.20
whereas so he has to stall
So，它必须停下来
27.20-27.23
whereas this other thread can keep going down here
然⽽，另⼀条线程可以继续往下⾛
27:23 - 27:25
And then now this guy can then pick up me and keep going behind it
现在线程T1可以往下⾛，要去拿下⾯C的latch
27:26 - 27:28
Alright, so then eventually it has to stall too
接着，线程T1⼜得停下来
27.28-27.29
because they can't go here
因为它没法往下⾛
27.29-27.30
this guy moves on does his insert
线程T2继续往下⾛，并进⾏插⼊操作
27.30-27.32
and then this guy can then proceed
那么线程1就⼜可以继续处理了
27:32 - 27:34
Right, so we can do the exact same optimization that he said
So，我们可以使⽤他所讲的那种优化
27.34-27.38
and we'll see this in content sippy B+tree
我们会在B+ Tree中看到这个
27:38 - 27:41
I could just take the read latch and try find the spot that I want
我可以通过拿到read latch并试着找到我想要的那个spot
27.41-27.43
and then I try to acquire the read latch so what I want
然后，我会试着去获取我想要的那个read latch
27:43 - 27:44
But I do have to handle the case
但我必须处理这种情况
27.44-27.48
or I do take the read latch see this is the spot I want to go
我拿到read latch后，我们去看看这个spot是否是我想去的那个
27.47-27.50
then I release the read latch
接着，我释放了这个read latch
27.50-27.52
then come back and try to take the Write latch
然后，回过头来，试着获取write latch
27.52-27.54
and in between that time somebody might have inserted something in my slot
在此期间，某⼈可能会在我的slot中插⼊数据
27:55 - 27:57
And then I need to be able to handle that and keep scanning down below
那么，我需要能够去处理它，并继续往下扫描
27:58 - 28:02
So just that technique works with blue sector stuff you have to do
So，你得实现读线程（⽤蓝⾊标记的那部分）所⽤到的技术
so，你得去做蓝⾊标记指向这部分的相关⼯作
28:04 - 28:08
So again the main takeaway I want to get from all this ,there can't be a deadlock
So，我想从中得到的要点是，这⾥不能有死锁
so，这⾥最主要的关注点是，不能有死锁
28:09 - 28:11
Because everyone's scanning from the top to the bottom
因为所有线程都是从上往下进⾏扫描
28.11-28.14
that makes our life easier, there's nobody else coming in the other direction
这就让我们变得轻松，因为没⼈会从另⼀个⽅向进⾏扫描
28:15 - 28:18
So that's why also we can just release the latches before we jump to the next one
So，这也就是我们在跳到下⼀个slot之前，释放这个latch的原因所在了
28.18-28.25
because we're not worried about the location of the page W2 changing
因为我们不⽤担⼼W（指写线程）所修改的page的所在位置
因为我们⽆须担⼼这个page W2处的内容会发⽣改变（知秋注：即来⾃另⼀个⽅向的线程在我
争抢该处写锁前就将内容修改，⽆法保证数据⼀致性，即前⼀条线程刚修改完，但我之前刚通过
读锁读了数据，修改的数据是在原来的数据上进⾏的，此时，如果不重新读，事务会出现问题，
所以就需要做更多考虑了，如果都是从上往下的，那就⽆须考虑这点）
28:25 - 28:26
Okay
28.26-28.27
alright
=====================================================================
28.27-28.28
so let's talk about more complicated things
So，我们来谈论写更复杂的东⻄吧
28.28-28.30
let's talk we had to do this in a B+ tree
我们来谈下，在B+ Tree中我们该如何做到这些
28:31 - 28:34
So again we want to have multiple threads running at the same time
So，再说⼀遍，我们想在同⼀时间使⽤多线程来访问某种数据结构
28.34-28.43
and then we allow them to do reads and writes without having to lock the or latch the
entire tree or during that duration of the operation
然后，我们允许它们在执⾏操作的期间，在没有lock或者latch的情况下，对整个树进⾏读写操
作
28:43 - 28:46
So the two things we need to handle in our B+tree to make them thread safe
So，我们需要在我们的B+ Tree中做到两件事，这样才能确保线程安全
28.46-28.52
is that we need to handle the case where two threads are trying to modify the same
node at the same time
其中⼀件我们需要处理的事情就是，即有两条线程在同⼀时间都试着修改同⼀个节点的数据
28:53 - 28.56
And then we need to handle the case where one thread might be traversing the tree
接着，我们需要处理的另⼀个情况就是，其中有⼀条线程可能正在遍历B+ Tree
28.56-28.58
and then down below it
接着，在它下⾯
28.58-28.59
before it gets to the leaf node
在它到达叶⼦结点前
28.59-29.04
another thread does a modification that causes a split and merge
另⼀条线程对B+ Tree进⾏了修改，这引起了节点间的拆分与合并
29:04 - 29:09
And now the location of a page may end up a node may end up getting moved around,
现在，B+ Tree中节点的位置可能会有所移动
29.09-29.11
and the data I'm looking for is not there
我所查找的数据可能就并不在原来的位置上了
29.11-29.12
or in worst case scenario
甚⾄在最糟糕的情况下
29.1229.17
I have a pointer to now and in memory an invalid memory location
我的指针指向了内存中的⼀个⽆效内存地址
29:17 - 29:18
So let's look at high-level example here
So，我们来看下这个⾼级案例
29:19 - 29:22
So we're gonna focus on this side of the tree, I'm just labeled in ABCDE
So，我们会去关注这个B+Tree的这⼀边，这⾥我标记了ABCDE
29.22-29.24
and then so forth on the leaf nodes,
接着，叶⼦节点上也是如此，这⾥我标了FGHI
29.24-29.30
so say we want to do a delete on on 44 down to the bottom
So，假设，我们想去删除叶⼦结点上的44
29:30 - 29:32
So the first threads going to start at the top
So，第⼀条线程会从B+Tree的顶部（即根节点）处开始
29.32-39.34
again we just do the traversal we talked about so far
这⾥，我们只是做了我们到⽬前为⽌所谈论的遍历操作
29.34-29.35
we look at the separator keys
我们会去看下这些指向下⾯节点的指针
29.35-29.37
we figure out whether or you want to go left and right
以此来弄清楚我们是该往左⾛还是往右⾛
29.37-29.39
and we move down to the child node based on that
基于此，我们向下移动到孩⼦节点上
29:40 - 29:42
So then we may get down to this leaf node here
So，现在我们就可以往下进⼊到这⾥的叶⼦节点处了
29.42-29.44
and we can go ahead and delete our entry
然后，我们继续遍历，并删除我们要删除的条⽬，即44
29:45 - 29:48
But now we see that our node is less than half-full
但现在，我们可以看到我们的节点是⼩于半满的情况
29.48-29.50
in this case it's entirely empty
在这个例⼦中，这个节点中完全空了
29.50-29.52
so therefore we have to rebalance
So，我们得去重新平衡这个B+ Tree
29:53 - 29.56
And so we're gonna want to in this case here instead of doing a Merge
So，这个例⼦中，我们并不会去进⾏合并操作
29.56-30.00 ！！！！！
we'll just copy over a key from one of our siblings
我们只需从我们的兄弟节点中，复制⼀个key到这个空的节点中去
30:01 - 30:03
But let's say before we can do that rebalancing
但在我们进⾏重新平衡之前
30.03-30.08
the OS swaps out our thread
OS会将我们的线程交换出去
30.0830.11
and we get stall it and now another thread start running
这条线程就会停下来，于是现在就有另⼀条线程执⾏任务
30:11 - 30:14
And that other thread wants to do a lookup to try to find key 41
另⼀条线程想去进⾏查找，以此来试着找到key 41
30.14-30.16
,right down here at the bottom
key 41就在这个B+ Tree的底部
30:16 - 30:17
So that does the same thing
So，它会做相同的事情
30.17-30.19
it starts traversing the tree
线程2开始对Tree进⾏遍历
30.19-30.22
and then it gets down to this point here
接着，它遍历到了CD这⼀层
30:22 - 30:24
And it looks at the separator keys
然后，它会去查看该层中指向下⾯的指针
30.24-30.26
and figures out oh I want to go to this node
以此来弄清楚，我该⾛哪条路线才能到达我想去的那个节点
30:26 - 30:28
But then it get it stalls this
但然后，线程2会在这⾥停下来
30.28-30.31
switches back to our first thread
并切换回我们的线程1
30:32 - 30:34
And the first thread moves 41 over
然后，线程1将41移动到这个空的节点上
30.34-30.37
and then now when my other thread starts up running again
现在，当我的另⼀条线程再次执⾏的时候
30.37-30.42
I get down here, and the thing that I thought was there is no longer there
它到了H这个节点上，发现原本应该在这⾥的41，并不在这⾥了
30:42 - 30:51
Right, so that so that case scenario this is just you know we got a false negative here
So，在这种情况下，我们会得到⼀个false negative（假阴性）的回应
30.48-30.51
we thought key 41 does exist ,but the index told us it in exist
我们会认为41已经不存在于这个B+ Tree中了，但索引告诉我们该key还存在于这个B+ Tree⾥
⾯
30:51 - 30.55
That all the anomalies or issues were talked about today at the best-case scenario
今天我们所要讨论的都是在最好的情况下所出现的异常或者问题
30.55-30.58
,worst-case scenario was this node got moved around
最糟的情况是，这个节点移动到了其他的地⽅
30.58-31.00
and then now this pointer pointed to nothing
然后，现在指向该节点的指针所指的东⻄就不⻅了
31:00 - 31:03
And we went and we would get a seg fault and a program a crash
然后，我们就会遇上Segmetation fault并且程序就会崩溃
31:04 - 31:05
So the way we're gonna handle this
So，我们处理这种情况的⽅式是
31.05-31.09
it`s the classic technique called latch crabbing or latch coupling
就是去使⽤⼀种经典的技术，它被叫做latch crabbing/coupling
31.09-31.12
when I was a young lad when I was taught databases
当我在年轻时，教数据库的时候
31.12-31.16
I would be game I was told the term was called latch crabbing
我所告诉学⽣的术语是latch crabbing
31:17 - 31:18
I don't know what the textbook actually uses,
我并不知道现在的教科书上实际⽤的是什么
31.18-31.21
but the Wikipedia I think calls a lot latch coupling
但我觉得维基百科上⾯将它叫做latch coupling
31.21-31.23
it's all the same concept same thing
总之，它们讲的是同⼀个概念，它们是⼀回事
31:24 - 31:30
So latch crabbing is a technique that allows multiple threads to access the the B+tree at
the same time
So，Latch crabbing是⼀种技术，它允许多条线程在同⼀时间访问B+ Tree
31.30-31.32
and we're to protect things using latches
我们使⽤latch来保护这些东⻄
31:33 - 31:34
So the basic idea the way this works is that
So，它的基本⼯作原理是
31.34-31.36
anytime we're at a node
在任何时候，当我们在⼀个节点中时
31.36-31.40
we have to have a latch on node being in write mode or read mode
我们必须在该节点上挂⼀个latch，不管是写模式还是读模式的latch都可以
31:40 - 31:43
And then before we can jump to our child
接着，在我们跳到我们的孩⼦节点之前
31.43-31.48
we got to get the latch on our child the next the next node we're gonna we're gonna go
to
我们要拿到我们孩⼦节点上的latch，以及我们想要到达的下⼀个节点的latch
31:48 - 31.50
And then when we land on that on that child
然后，当我们落到那个孩⼦节点上时
31.50-31.52
we can then examine its contents
我们要对它⾥⾯的内容进⾏测试
31.52-31.56
and if we determine that the child node we just moved to is safe
如果我们判断出来移到到该孩⼦节点是安全的话
31.56-32.01
then it's okay for us to release the latch on our parent
那么，对我们来说将⽗节点上的latch释放掉是ok的
32:01 - 32:06
And so the term latch crabbing sort of has to do with the way like crabs walk like moving
one leg past another
latch crabbing处理事情的⽅式，其实就像是螃蟹⾛路那样，⾛的时候，⼀条腿迈过另⼀条腿
32.06-32.09
that's how we're going to acquire latches as we go down
这就是当我们往下⾛时，获取latch的⽅式
32:09 -32:11
So our definition of safe is
So，我们对safe的定义是
32.11-32.14
one where if we're doing a modification
如果我们要进⾏⼀次修改
32.14 - 32.22
the node we're sitting at will not have to do a split or merge，no matter what happens
below it in the tree
我们所在的节点⽆须进⾏拆分或合并操作，也不⽤去管在它下⾯所发⽣的事情
32:23 - 32:24
So that means that
So，这意味着
32.24-32.26
it's either not completely full
如果该节点并没有完全被填满
32.26-32.31
if we're trying to insert, we have room to accommodate any key that may come up to us
or any key that we're inserting
如果我们试着去插⼊东⻄时，我们要有⾜够的空间来容纳我们所要插⼊的key
32:32 - 32:33
And then if we were doing a delete
接着，如果我们进⾏删除操作
32.33-32.35
we know that it's more than half-full
并且我们知道该节点中元素的数量超过了该节点容量的⼀半
32.35-32.38
meaning we have to delete a key ,we're not gonna have to do a merge
这就意味着，我们得删除⼀个key，并且我们不需要进⾏合并操作
32:41 - 32:41
All right
32.41-32.43
so again the basic protocol worked like this
So，它基本协议（protocol）的⼯作⽅式看起来像这样
32.43-32.46
at the very root ,you acquire the Write latch you need
根据你的需要，在根节点处，去获取write latch
32:46 - 32:47
So in the case we're doing a fine
So，在这个例⼦中，我们做的没啥问题
32.47-32.49
it's all read latches all the way down
当我们往下⾛的时候，拿的都是read latch
32.49-32.52
again every single time we we get to the next node
每当我们要进⼊下⼀个node时
32.52-32.54
we release the latch on that parent where we came from
我们会释放⽗节点处的latch，即我们往下⾛时遇到的所有⽗节点上的latch
32:55 - 32:58
Okay again we're not making any modifications ,so every node is deemed safe
Ok，再说⼀遍，我们并没有做任何修改操作。So，每个节点都被认为是安全的
32:59 - 33:00
For inserts and deletes
对于插⼊和删除操作来说
33.00-33.02
we start off with getting Write latches all the way down
当我们从根节点往下⾛时，我们要获取的是write latch
33.02-33.06
and then please we recognize that the node we're at is considered safe
接着，我们意识到，我们所在的节点被认为是安全的
33.06-33.09
we can release any Write latch we have up above in the tree
这样，我们就可以释放我们在遍历这个B+Tree时，⼀路上所获取的任何write latch
33:09 - 33:14
Because again no matter what has below us ,they would not be affected
不管我们下⾯有什么，它们都不会被影响
33.14-33.14
they would not have to get changed
因为它们不会被修改
33:16 - 33:17
So let's look at some examples
So，我们来看些例⼦
33.17-31.21
so again find is super simple, I want to find key 38 at the bottom
So，查找操作永远是最简单的，我想到B+ Tree的底部找到key 38
33:22 - 33:23
So my thread starts off the beginning
So，我的线程会从根节点处开始查找
33.23-33.24
I get the read latch on A
我从根节点A处拿到了⼀个read latch
33.24-33.26
I come down to now B
现在，我往下⾛，来到了B节点
33.26-33.31
and now this point here again because it's read-only operation
此时，因为我们所做的是只读操作
33.31-33.35
it's a fine, it's safe for me to release the latch on A
所以，对我来说释放A节点处的latch是安全的
33:36 - 33:37
So as soon as I get down to B
So，⼀旦我到达B节点
33.37-33.38
I can release the latch on A,
我就可以释放A节点处的latch
33.38-33.41
and I'm good to go and now I keep scanning down and do the same thing
我可以继续往下进⾏扫描，并且进⾏相同的操作
33.41-33.43
get to D release on B
到达D节点时，释放B节点上的latch
33.43-33.45
get to H release on D
到达H节点时，释放D上的latch
33.45-33.48
and now I do my read and and I'm done
现在，我就可以进⾏我的读取操作，这样我的操作就完成了
33:48 - 33:50
Right pretty straightforward
⾮常简单，对吧
33:52 - 33:54
So let's see now if we want to do a delete
So，让我们来看下如果我们想进⾏删除操作该是怎么样的
33:55 - 33.57
So I start off with the Write latch on the Root
So，我现在根节点处获取⼀个write latch
33.57-34.01
I come down to B after I acquire the Write latch
在我获取到A节点处的write latch后，我往下⾛，到达了B节点
34:01 - 34:04
Now this point here is it is it safe for me to release the latch on A
此时，对我来说将A节点处的latch释放是安全的吗？
34:05 - 34:08
No why because I only have one key and B
No，这是因为在B节点处，我只有⼀个key
34:08 - 34:10
And so I don't know what's below me yet
So，我还不知道在B节点下⾯有什么东⻄存在
34.10-34.16
I'm going down and going I'm doing 38 ,so I'm going down here ,I don't know what these
other nodes look like yet
然后，我再往下⾛，到达D节点处，看到了key 38，但我并不知道它下⾯其他节点的样⼦
34:16 - 34:17
So if I do a delete
So，如果我进⾏删除操作
34.17-34.20
and I have to merge ,and I have to remove this key
我必须进⾏合并操作，⽽且必须移除这个key
34.20-34.23
,now I do like them you know make a change up to A
那么我就得将我所做出的修改传播⾄A
34:23 - 34:28
So in this case here we have to hold the latch on B, I'm sorry I hold the latch on A
So，在这个例⼦中，我们得持有A节点处的write latch，以及B节点处的write latch
34:28 - 34:30
So then we get the latch on D get down here
So，接着我们得拿到D节点处的write latch
34.30-34.34
and now we recognize that no matter what happens below D
现在我们意识到，不管D节点下⾯发⽣了什么
34.34-34.40
we know that we have room to accommodate or we can delete one key and I'll have to
merge
我们知道会有⾜够的空间来容纳⼀个key（删除了key 38，D中空了⼀个位置），那我得进⾏合
并操作
34:40 - 34:43
So we can at this point here ,we can release the latches on on A and B
So，在这个例⼦中，我们可以释放A节点和B节点处的latch
34:43 - 34:47
So essentially the threads are sort of keeping a stack of like here's all the latches on I'm
holding as I go down
So，基本上来讲，在B+ Tree中，当线程往下进⾏遍历时，线程会通过⼀个stack来保存它⼀路
上所持有的latch
34:48 - 34:51
So it knows at some point when I when I am at a safe node I just release everything up a
bumping
So，在某个时间点，当我在⼀个安全的节点处时，我就可以释放掉该节点之前所有节点上的
latch
34:53 - 34.54
Alright
34.54-34.55
so now I get down to H
So，现在我到达了H节点
34.55-34.57
I can release the latch on D,
我可以释放掉D节点处的latch
34.57-35.00
because H is is 100% full
因为H节点已经处于全满状态了
35.00-35.02
then I go ahead and do my delete,
接着，我就继续进⾏我的删除操作
35.02-35.04
and then when I'm done then I release the latch and go home
然后，当我完成删除操作后，我就释放掉这个latch，收⼯回家
35:07 - 35:08
Let's see now an insert
现在，我们来看下插⼊操作
35.08-35.09
same thing
和之前⼀样
35.09-35.11
start with the Write latch on A and the root,
在根节点A处拿到⼀个write latch
35.11-35.12
go down to B at this point here
接着，进⼊B节点
35.12-35.15
I recognize that B can accommodate any new insertion
我意识到，B节点处我们还能再插⼊⼀个key
35:16 - 35:17
So it's safe for me to release the latch on A
So，对于我来说，将A节点处latch给释放掉是安全的
35:18 - 35:22
So I'll go ahead and do that ,and then I go down to D, D is considered full
So，我会继续往下⾛，接着我到达了D节点，此时D节点已经是全满状态了
35:23 - 35:24
So I don't know what's gonna happen below me
So，我并不知道我下⽅的节点会发⽣什么事
35.24-35.27
and so I had to hold the latch on B
So，我得持有B节点处的latch
35:28 - 35:29
So then I get down to I
So，接着我往下进⼊I节点
35.29-35.32
and now I recognize that I can never split because as enough room
现在，我意识到，我不需要对I节点进⾏拆分，因为I节点拥有⾜够的空间让我进⾏插⼊操作
35:32 - 35:34
So before I do the update
So，在我进⾏更新操作之前
35.34-35.36
I release the latch on B and D
我会释放掉B节点和D节点处的latch
35.36-35.38
then I can do my insert
然后，我就可以进⾏我的插⼊操作
35:40 - 35:41
So for this
So，在这个例⼦中
35.41-35.48
the order in which you release the latches, doesn't matter from a correctness standpoint
从正确性的⻆度来讲，我们释放latch的顺序并不重要
35:48 - 35:52
right so back going back here, I have to release the latch on D and B
So，回到这⾥，这⾥我必须释放D节点和B节点处的latch
35:53 - 35:57
If I release latch on D Before B，that doesn't matter,
如果我释放D节点处的latch先于B节点，这并没有关系
35.57-35.58
because no one's gonna get to D anyway
因为反正没⼈进⼊D节点
35.58-35.59
because they can't get to B
因为它们都没法进⼊B节点
36:00 - 36:02
So from a correctness standpoint it doesn't matter
So，从正确性的⻆度来说，这没问题
36.02-36.03
but from a performance standpoint
但从性能的⻆度来看
36.03-36.05
we obviously want to release this one first
很明显，我们想去先释放B节点处的latch
36.05-36.10
because this covers no more leaf nodes
因为这不再涉及更多的叶⼦结点
36:10 - 36:13
So you want to release the higher up latches as soon as possible
So，我们想去尽可能快的释放更上层节点的latch
36:17 - 36:17
Okay
36:19 - 36:21
Let's look at one more example where there could be a split
我们再来看⼀个例⼦，这其中涉及了拆分操作
36:22 - 36:27
So I wanted to insert 25 same thing Write latch on on A,
So，我想插⼊25，同样，我们要获取A节点处的write latch
36.27-36.27
Write latch on B
接着，获取B节点上的write latch
36.27-36.29
B won't get over full
B节点并没有处于全满状态
36.29-36.31
I can release the latch on A
于是我就可以释放A节点处的latch
36.31-36.32
I come down to C
接着，我往下⾛，到达C节点处
36.32-36.34
C he's not gonna go get over full
C节点也没有处于全满状态
36:34 - 36:36
So I can release latch on B
So，我可以释放B节点处的latch
36.36-36.38
and then now I come down to F
接着，我来到F节点
36.38-36.40
and now I see I need I need to do a split
现在，我看到，因为F节点满了，所以我需要进⾏⼀次拆分操作
36:41 - 36:42
So in this case here
So，在这个例⼦中
36.42-36.47
I need to hold the latch on my parent node on C while I make the change
当我在进⾏修改时，我需要持有我⽗节点（C节点）处的latch
36:48 - 36:50
So I first insert 25 here
So，⾸先，我在这⾥插⼊25
36.50-36.54
take the spilt over page over here put 31 there
接着，我在F节点下⾯给它添加⼀个page，并将31放在⾥⾯
36.54*-36.59
and then update my parent node
接着，更新我的⽗节点
36:59 - 37:01
Do I need to have a latch on this new guy down here
我需要持有下⽅这个新page的latch吗？
37:04 - 37:06
What that says no why
你说No，能说下为什么吗？
37:11 - 37:12
He says no
这位同学表示No
37.12-37.16
we can access it, because you could have you have a latch on the parent
因为我们持有该⽗节点的latch，所以我们可以对这个新的page进⾏访问
37:16 - 37:20
That assumes that there's no sibling pointers which we'll talk about in a second
这得是在没有其他兄弟节点的情况下，这点我们稍后会讲
37:20 - 37:21
So in this example here
So，在这个例⼦中
37.21-37.22
for simplicity reasons
为了⽅便起⻅
37.22-37.23
I'm not going to acquire the latch
我并不会去获取latch
37.23-37.25
because everyone's going top of the bottom
因为每条线程都是从上⽽下对B+ Tree进⾏访问的
37:25 - 37:27
If I'm scanning along the leaf nodes
如果我沿着叶⼦节点进⾏扫描
37.27-37.29
then yeah someone can get to this and I have to protect it
那么某条线程会访问到这个新的page，那么我必须对它进⾏保护
37:30 - 37:32
But we'll get to that ,okay
不过，我们会做到这点
37:33 - 37:33
Yes
请讲
37:40 - 37:42
Yes Damon is I said
他所讲的是
37.42-37.47
that the threads have a stack of the of the latches they're acquiring us to go down
shouldn't be a Queue
在B+Tree中，线程会使⽤⼀个栈来保存它们向下遍历时所获取到的所有latch，⽽不是使⽤⼀个
队列来进⾏处理
37.47-37.47
yes
说的没错
37:50 - 37:52
First-in, first-out
队列是先进先出的
37:54 - 37:54
Okay, yes
请讲
38:09 - 38:09
Yes
38:20 - 38:25
say - I said come back to this table here
我们回到这张表看下
38.25-38.31
I said that you want to release the latches in the from the top to the bottom
我说过，在B+ Tree中，我们想⾃上⽽下释放latch
38:31 - 38:33
and you're saying it in the OS world
⽽你表示，在OS的世界中
38.33-38.36
you release them in reverse order
我们释放锁的顺序是⾃下⽽上
38:37 - 38:39
so again think about what we're doing in the data structure here
So，思考下我们在这个数据结构中所做的事情
38.39-38.45
at this point here like no one can get to D unless they go through B
此时，除⾮线程经过B节点，不然它们没法到达D节点

09-03
38:46 - 38:49
So me releasing the latch on D doesn't do anything
So，当我释放D节点处的latch时，并不做任何事情
38.49-38.51
because nobody's waiting to get that latch
因为没有任何线程在等待获取这个latch
38.51-38.55
up somebody up above could be waiting to get required B
在此节点之上（即A节点处的线程）可能正在等待获取B节点处的latch
38:55 - 38:57
So I want to release that latch as soon as possible
So，我想去尽快的释放这个latch
38:58 - 39:01
So it's because we know what the data structure how it's being use
因为我们知道该如何使⽤这种数据结构
39.01-39.03
we understand the context of how of your latches are being used 、
我们也理解latch在上下⽂中的使⽤⽅式
39.03-39.06
you want to release this one first
于是，我们想先释放这个latch（B节点处的latch）
39:06 - 39:09
Okay ,okay
#############################################################
39:13 - 39:14
So now I want to ask you guys
So，我现在我想问你们⼀个问题
39.14-39.21
what was the very first step I did for all those modifications and examples and the
inserts and deletes, what's the very first step you do
在这些进⾏修改操作的案例中（即插⼊和删除），⾸先我们要做的是什么呢？
39:25 - 39:25
Exactly
说的没错
39.25-39.28
you latch the root in exclusive mode or write mode
⾸先，我们要在根节点处使⽤独占模式的latch或者是写模式的latch对它进⾏加锁
39.28-39.30
that's problematic right
这其实是有问题的
39.30-39.33
because again write latches is exclusive
因为write latch是具备独占性的
39.33-39.39
no other thread can can acquire any other latch on that node
其他线程都不能获取该节点处任何其他latch
39:37 - 39:39
So this becomes a single point of contention, a single bottleneck
So，这就成为了⼀个⽭盾点，⼀个瓶颈
39.39-39.42
in order to get into the data structure
为了访问这个数据结构
39.42-39.44
everyone has acquired this W latches
每个⼈都要获取这个write latch
39.44-39.46
and only one thread can hold that W latches at a time
⼀次只能有⼀条线程持有该write latch
39:48 - 39:48
So this is a big problem,
So，这就成了⼀个⼤问题
39.48-39.52
this is gonna prevent us from getting high parallelism and high concurrency
这就妨碍我们获取⾼并⾏性以及⾼并发性
39:52 - 39:54
So we need something better
So，我们需要某些更好的东⻄来做这个事情
39.54-39.57
then just everyone acquire the W latches and soon as they go in
那么，⼀旦当这些线程访问该数据结构时，它们都会获取到write latch
39:58 - 40:00
And so what we're gonna actually give them to do is
So，实际上我们的解决⽅案就是
40.00-40.02
exactly what he proposed before from the hash table
就是这货在hash table之前所提出的东⻄
40.02-40.05
is make an optimistic assumption
即做出⼀种乐观的假设
40.05-40.11
that most threads are not gonna need to do splits or merges at the leaf nodes
即⼤部分的线程不需要对叶⼦结点进⾏拆分或者合并操作
40:11 - 40:16
So rather than taking write latches all the way down, I take read latches all the way down
So，在向下访问B+ Tree的时候，我所采⽤的是read latch，⽽不是write latch
40:17 - 40:19
And then I take a write latches on the leaf node
然后，我在对叶⼦节点进⾏处理时，会使⽤write latch
40:20 - 40:22
If I determine that I don't have to split
如果我判断出我并不需要进⾏拆分的话
40.22-40.24
then great，I got down with just read latches,
那么这样就很棒，当我往下访问时，只需要拿到read latch就⾏
40.24-40.26
and I can make whatever change I want
并且我可以执⾏我想要的任意修改
40:27 - 40:30
If I if I get it wrong and I do what this do a split or merge
如果我在进⾏拆分或合并操作时犯错了
40.30-40.31
then I just abort
那么，我直接终⽌操作
40.31-40.34
restart the operation in the beginning and take write latches down
并在根节点处重启该操作，在向下遍历的时候获取write latch
40:35 - 40:38
So this is a standard technique we do in systems
So，这是我们在系统中所使⽤的⼀种标准技术
40.38-40.41
where you optimistic versus pessimistic
即乐观与悲观
40.41-40.44
I'm optimistically gonna assume that I'm not gonna have to do a split
我乐观地假设我不会去进⾏任何拆分操作
40:44 - 40:47
So therefore I take the fast path and do do read latches
因此，这样我就可以上快⻋道并使⽤read latch
40:48 - 40:51
We'll see this in context of other things like for transactions later on,
我们会在其他东⻄的上下⽂中看到这个，⽐如之后我们要说的事务中就有
40.51-40.56
and for most data structures of most B+tree in the real world
对于现实世界中的⼤部分数据结构以及⼤部分B+ Tree⽽⾔
40.56-40.59
this is actually a pretty safe assumption
这实际上是⼀个⾮常安全的假设
40:59 - 41:00
Right in my example
在我的例⼦中
41.00-41.01
some shown nodes would have two keys in them
某些node中会有两个key
41.01-41.03
in a real database system
在实际的数据库系统中
41.03-41.06
your node is gonna be you know 8 kilobytes or 16 kilobytes
你的node的⼤⼩应该是8kb或者16kb
41.06-41.07
that's gonna have a lot of keys
这样，单个node就会有⼀⼤堆key
41:07 - 41:10
So most of the operations you're doing are not gonna have to do a split and merge
So，在你所做的⼤部分操作中并不会涉及拆分和合并操作
41:11 - 41:13
In the rare case that you do have to do a split merge
在很少的情况下，我们才会进⾏拆分和合并操作
41.13-41.18
and then again you just fall back to the standard latch crabbing technique that I showed
before
那么我们就会回退到使⽤我之前所讲那种latch crabbing技术了
41:18 - 41:23
So this is from a paper from 1977 from these German guys Bayer* and M.Schkolnick
So，这种技术是来⾃于⼀篇1977年的paper，它是由两个德国⼈所写的
41.23-41.25
this so there's no name for the algorithm
这个算法并没有名字
41.25-41.28
that people usually refer as better latching algorithm
⼈们通常⽤better latching算法来指代这个算法
41.28-41.31
we're optimistic a lot latch crabbing
我们会很乐观的希望有⼤量的latch crabbing出现
41:31 - 41:33 ！！！
All right, so let's say we wanna do that delete on 38
So，假设我们想去删除38
41:33 - 41:35
So again I don't take a W latches in the root
So，在根节点处，我并不会去获取⼀个write latch
41.35-41.38
I take a R latch all the way down
在往下⾛的时候，我始终拿的是read latch
41:38 - 41:41
And then when I get down to to D here
接着，当我到达D节点的时候
41:41 - 41:45
I acquire the W latches on H
我获取了H节点处的write latch
41.45-41.47
I recognize that I'm doing a delete
我意识到我要进⾏⼀次删除操作
41.47-41.49
therefore I'm not gonna do a split and merge
此处，我不会去进⾏拆分和合并操作
41:49 - 41:52
So therefore my gamble paid off ,
So，我赌赢了
41.52-41.54
and I don't need to to restart
我不需要重头开始我的这个删除操作
41.54-41.59
right I can do my delete without having to take W latches
我可以在不拿到write latch的情况下，进⾏我的删除操作（指的是到达该节点前，拿的都是
read latch，执⾏删除时，才会去获取当前节点的write latch）
42:00 - 42:00
Right
42:02 - 42:04
Same thing for insert
对于插⼊操作也是如此
42.04-42.05
so insert 25
So，我想插⼊25
42.05-42.07
I take the read latch on the way down
当我往下⾛的时候，我会⼀直去获取并持有read latch
42.07-42.08
I'm sorry
抱歉
42:08 - 42:11
I take a R latch, and do crabbing all the way down
在我往下⾛的时候，我拿到⼀个read latch，就会释放上⼀个节点的read latch（在安全的情况
下）
42.11-42.14
and then I eventually get to C here
然后，最终我到达了C节点处
42.14-42.16
well I take the W latches on F
然后，我获取了F节点的write latch
42.16-42.21
this one I recognize that I'm gonna have to do a split
此处，我意识到我必须得进⾏⼀次拆分操作
42:21 - 42:24
So I abort the operation and just restart it,
So，我中断了这次插⼊操作，并重新来过
42.24-42.28
start from beginning and take take W latches all the way down
从头开始执⾏该操作，当向下⾛的时候，拿的都是write latch
42:34 - 42:35
So he said
So，他表示
42.35-42.38
shouldn't you start at the point where you last released the latches on the way down
我们可不可以从我们最后⼀次释放latch的地⽅重新开始
42:38 - 42:41
So that would be in this case here at C, right
So，那在这个例⼦中，这个点是C
42:50 - 42:51
So question is so ......
So，他的问题是
42:52 -42:59
we need my two nodes like sibling, two keys, yes
43:04 - 43:04
Correct,yes
正确
43:12 - 43:14
But how do you get how do you get CEF again
但你该如何到达C、E和F节点呢？
43:20 - 43:20
You can't
你不能这么搞
43:22 - 43:25
He said I said you can maintain a stack of the pointers that way you got down here
他表示，当我们往下⾛的时候，我们可以维护⼀个关于指针的栈
43:25 - 43:26
I can't do that
但我没法做到这点
43.26-43.28
because I can't say page IDs
就拿page id来说吧
43.28-43.34
again these ABCDE these are the logical identifiers for these nodes
图上这些ABCDE都是这些节点的逻辑标识符
43:34 - 43:36
But they may end up being put into different pages
但它们最终可能会分散在不同的page中
43:36 - 43:39
So because I don't hold any latches on these things
因为我并没有持有这些东⻄上的latch
43.39-43.41
anybody can do anything
任何⼈都可以做任何事情
43.41-43.47
and therefore the location of the page ID for these these nodes may now be something
different
因此，这些节点的page id可能会是不同的东⻄
43:47 - 43:49
So now you see page 1 2 3 and 4 5 6, in my stack
So，假设，在我的栈中有page 123和page 456
43.49-43.54
I go look for page 1 2 3 ,and now it's something completely different
然后，我去查找page 123时，我看到的是完全不同的东⻄
43:54 - 43:59
Because we can't assume that the location of these nodes will always be the same,
unless I hold a latch on them
因为我们⽆法假定这些节点的位置内容始终不变，除⾮我在这些节点上⾯加了latch
44:00 - 44:03
The read latch prevents anybody from writing them and doing the splits
read latch会阻⽌任何⼈对这些节点进⾏写⼊和拆分操作
44.03-44.06
the write latch prevents anybody from ah else I also modifying them
write latch则是阻⽌除我之外的⼈对这些节点进⾏修改
44:06 - 44:07
You always have to restart
因此，你始终得重新开始你的操作
44:10 - 44:10
Yes
请讲
44:17 - 44:17 (提问的没听出来)
Write latch,keep on
44:28 - 44:35
So your statement is say forgetting ,so if I assume that is the start over sorry
算了，你能再说⼀遍吗，刚才你说的，我没有听懂
44:40 - 44:40
Yes
44:51 - 44:52
So your question is
So，你的问题是
44.52-44.57
if we're have if say we're like maybe like here
So，我们所遇到的情况，如图所示
44:58 - 44.59
So I hold the R latch on this
So，我拿着D节点上的read latch
44.59-45.02
and I hold the W latch on this
并且我也拿着H节点上的write latch
45.02-45.06
and then because I at this point I need to modify it
因为此时，我需要对H节点进⾏修改
45:06 - 45:12
But also I don't know whether someone's gonna change something that would cause this
thing to get modified as well
但同时，我并不清楚是否有⼈会进⾏某些修改操作，可以使得这⾥也被修改
45:12 - 45:15
But again everyone's going in the same direction, so they can't do that
但再说⼀遍，因为所有⼈⾛的⽅向是⼀样的。So，它们没办法做到这点
45:15 - 45:18
Right, they can't get to they can't make any change here
它们没法在这⾥进⾏任何修改
45.18-5.20
because I hold the read latch on that
因为我拿着该节点的read latch
45.20-45.24
so they can't modify this node
So，它们也就没法修改这个节点
45:24 - 45:24
Right
45:27-4528
yes
请讲
45:48 - 45.49
Yeah question is
So，她的问题是
45.49-45.50
in this example here
在这个例⼦中
45.50-45.53
when I got down here and took the W latch F to do the insert
当我往下⾛到这个F节点处，拿到了该节点的write latch，以此来进⾏插⼊操作
45.53-45.55
and when I recognized oh I got a split .
当我意识到我得进⾏拆分操作时
45.55-45.56
therefore I need the W latches on this
因此，我需要该节点的write latch
45.56-45.57
and there and I don't have it
此处，我并没有拿到它的write latch
45.57-46.00
so at the restart do you just hold this the whole time
So，我们就得重新执⾏该操作，那么我们得⼀直持有这个write latch么？
46.00-46.00
no
No
46:06 46:12 46:30 46:34 46:46
Yes yes yes yes yes
46:50 - 46.54
Yes ,she said so say I'd had this example here
So，看下我这个例⼦
46.54-46.55
I want to insert 25
我想插⼊25
46.55-46.57
I got to the leaf node
于是，我到了这个叶⼦结点上
46.57-46.58
and recognized oh I got a split
并且我意识到，我要去进⾏拆分操作
46.58-47.01
let me restart ,and take W latches down
让我重新执⾏该操作，往下⾛的时候要去获取write latch
47:01 - 47:04
But he needs between the time I restarted
但在我重新执⾏该操作的这段时间⾥
47.04-47.06
, somebody else came along and wants to insert 24
其他⼈会进来，并想插⼊24
47.06-47.07
and they're gonna have the same issue
它们也会遇上相同的问题
47.07-47.09
they also have to split this
它们也需要对该节点进⾏拆分
47:10 -47:11
So they come back as well
So，它们也回到根节点处
47.11-47.13
and take take W latches on the way down
然后在往下⾛的时候，它们会去拿write latch
去拿write latch，然后往下⾛
47:13 - 47:15
But now because both of them are taking W latches
但现在因为它们都要去拿write latch
47.15-47.17
only one of them is gonna proceed at a time
它们中⼀次只能有⼀条线程来进⾏处理
47:18 - 47:21
So now 25 say the guy that wants insert 25, he gets there first
So，对于想要插⼊25的那条线程来说，它会先到这个节点
47.21-47.23
he inserts this and splits
它会插⼊25，并对该节点进⾏拆分
47.23-47.25
then 24 is allowed to run
然后，我们才允许那条要插⼊24的线程去执⾏它的任务
47:25 - 47:29
It gets down here, it doesn't care that it already got split
当它到达这个节点时，它并不在意该节点是否已经被拆分了
47:30 - 47:34
Again this is a good example between the logical correctness and the logical view and
the physical view
再说⼀遍，对于逻辑视图和物理视图来说，这是⼀个很好的例⼦
47:35 - 47:38
I don't care my index where my key actually exists
我并不在意我的索引实际所在的位置在哪
47:39 - 47:42
So I don't care that like oh I try to put it here,so make sure I put it in this here the next
time
So，我不会关⼼这种情况：即我试着将key放到这个节点中，我想确保我下次还是将数据放在这
⾥。
47.42-47.45
because I couldn't do the first time, I want to go exactly this page
因为我第⼀次没能完成这个插⼊操作，所以我想下⼀次插⼊还是在这个page中
47:45 - 47:46
You don't care
你们不⽤关⼼这种情况
47.46-47.47
every single time you come into it
当你每次进⼊这个节点时
47.47-47.51
you're doing this traversal from scratch, you don't care how you got there before
当你从头开始遍历的时候，你不会去在意你之前是怎么到达这个节点的（因为你都重新开始了，
之前的遍历操作可以⽆视了）
47:52 - 47:57
So it doesn't matter that 25 inserts here at splits or maybe 24 came first and splits, it
doesn't matter
So，不管是插⼊25的那条线程先到这个节点，并对该节点进⾏拆分，还是插⼊24的那条线程先
到这个节点，并对它进⾏拆分，这都没有关系
47.57-47.59
it's still balanced and still correct
这个B+ Tree依然是平衡的，依然是正确的
48:00 - 48:00
Yes
请讲
48:05 - 48:05
Correct
正确
48.05-48.09
so he said the second traversal for 24, it doesn't need a W latches
So，它表示这条要插⼊24的线程在第⼆次进⾏遍历时，它往下遍历的时候不需要拿这个write
latch
48.09-48.10
because 25 already split it
因为要插⼊25的那条线程已经将该节点进⾏了拆分
48:11 - 48:14
Correct, that so that that's more expensive ,but what's the alternative
正确，So，这样要付出的代价会更加昂贵，但替代⽅案是什么呢？
48:15 - 48:18
Right, the alternative is to take write latches every single time
替代⽅案就是，每次拿的都是write latch
48:19 - 48:20
So optimistic is not perfect
So，乐观锁的机制并不完美
48.20-48.24
we're not guaranteed to always do the least amount of work we need to do
我们没法保证，我们需要做的⼯作量始终是最⼩的
48:24 - 48:27
Certainly if I'm again in this case here my nodes are really small
在这个例⼦中，我的节点其实⾮常⼩
48.27-48.29
so I'm splitting a lot if I'm inserting a lot
So，如果我要插⼊许多东⻄，那我就得对节点进⾏⼤量拆分操作
48:30 - 48:34
So I'd be wasting a lot of lot of cycles a lot doing wasted work
So，这样我就会做很多⽆⽤功
48.34-48.38
should reverse just to find out I need to come back and take write latches
因为我需要不断地回到根节点处，去获取write latch
48:38 - 48:39
So in practice
So，在实战中
48.39-48.41
if the contention rate is high
如果争⽤率很⾼的话
48.41-48.43
and therefore the optimistic assumption is incorrect
那么这种乐观假设就是错误的
48.43-48.47
you're going to actually be slower than this doing the pessimistic thing
实际上，这种做法要⽐悲观锁来得慢
48:47 - 48:51
But for these data structures in general probably talking right here
但⼀般来讲，对于这些我所讨论的数据结构来说
48.51-48.53
at the optimistic one actually works the best
实际上，使⽤这种乐观锁的机制，它的效果最好
48:53 - 48.56
The for the the hash table stuff
对于hash table来说
48.56-48.57
I actually haven't seen numbers
实际上我并不清楚它的性能如何
48.57-49.09
in that case the it's often times the the the pessimistic approach of taking latches on the
page is this is actually pretty good
通常情况下，在page上使⽤悲观锁，实际上效果⾮常好
49.09-49.10
because it's so simple
因为它⾮常简单
49:10 - 49:13
For this won't make more fine-grain and and and we get a big grain
So，在这个例⼦，我们并没有使⽤更细粒度的锁，这⾥我们使⽤的粒度⽐较⼤
49:14 - 49:15
But it depends on a lot of things
但这取决于很多东⻄
49.15-48.16
depends on what the workload is
这取决于我们的workload是哪种
49.16-49.19
are we insert heavy, lookup heavy, delete heavy
我们是插⼊的⼯作量很多，还是需要⼤量查找，或者是进⾏⼤量删除
49.19-49.22
It depends on you know the distribution our values
这也取决于我们值的分布情况
49.22-49.24
depends on how many cores we have
也取决于我们的CPU核⼼有多少
49.24-49.26
right it varies a lot
它受很多条件所影响
49:27 - 49:28
In practice
在实战中
49.28-49.30
though most database systems just pick one approach
虽然⼤部分数据库系统都只使⽤⼀种⽅案
49.30-49.31
they don't try to be adaptive
它们不会去试着变得具有适应性
49.31-49.34
because this is with from engineering standpoint it's way more complicated
因为从⼯程师的⻆度来看，这种⽅式更加复杂
49:35 - 49:35
Yes
请讲
49:43 - 49:43
So he says
So，他表示
49.43-49.45
for B+tree nodes
对于B+ Tree的节点来说
49.45-49.50
you can't use the low-level slot latches like you can in a page table
你不能使⽤低级层⾯的slot latch，但你可以在page table中使⽤这个
49:55 - 50:04
No ,because you could be modifying the in the physical structure of the index itself
No，因为你可以去修改索引的物理结构
50.04-50.06
so therefore I'm updating pointers
So，因此我得去更新指针
50:07 - 50:11
So if I need to have split merge
So，如果我需要进⾏拆分和合并操作
50.11-50.17
and I need to have latches for all the keys in this node in order to move them around
为了移动这些key，我需要拿到与该节点相关所有key的latch（也会拿到相关上层节点的latch）
50:17 - 50:19
So so in general you just take a latch entire page
So，⼀般来讲你需要拿到的latch是关于整个page的，⽽不是slot
50:20 - 50:22
I think that's true I could double check that though
我觉得这个说法应该是对的，我稍后会再仔细想⼀下
50:25 - 50:26
It makes things more complicated
如果latch放在slot上，这会使事情变得更复杂
50:29 - 50:34
Okay, so again this is just reiterate what we're trying to talk about
Ok，这⾥我重申了我们之前试着讨论的东⻄
50.34-50.40 ！！！！！！！！！！！！！！！！！
again for the this for the search with the better latching algorithm same as before
在 better latching算法中，搜索操作和以前⼀样，没有区别
50.40-50.43
insert, delete
对于插⼊和删除来说
50.43-50.44
it's giving you you take read latch all the way down
当你往下遍历的时候，你需要拿着read latch
50.44-50.45
if it fails
如果操作失败
50.45-50.47
then you just come back and restart
那么你就得回过头来，重新执⾏该操作
50:47 - 50:51
So again, this is what I was saying before
So，这就是我之前所讲的
50.51-50.57
about how we're assuming that most of the time taking the read latch on the way down
is going to be good enough, but we're not gonna have to restart
即我们假设，在我们进⾏操作并往下遍历B+ Tree时，我们⼤部分时候拿的都是read latch，⽽
且⾜够好⽤，没有出错，这样我们就⽆须重新执⾏该操作
50:58 - 51:03
Right, and therefore if we choose correctly with predict incorrectly
因此，如果我们⼀开始选了read latch，但预测错误（⽐如遇上之前的情况）
51.03-1.07
then you need that first time we went down is just wasted work
那么我们第⼀次向下遍历时所做的⼯作就都是⽆⽤功
51.07-51.08
we're just burning cycles
我们只是在燃烧CPU Cycle罢了
51:09 - 51:13
And so we're not gonna get the the better scalability or concurrency we may actually
want
So，我们并没有获得我们实际想要的更好的扩展性或者并发性
51:13 - 51:16
But I'll say in practice this is this is this usually worked out nicely
但我说了，在实战中，这通常效果还不错
51:17 - 51:23
Alright,so the next thing to talk about is how we actually support leaf node scans
好了，接下来我们要讲的就是我们实际该如何去⽀持对叶⼦节点进⾏扫描
51:23 - 51:26
So in the example I've shown so far with the B+tree
So，在我⽬前为⽌所展示的关于B+ Tree的例⼦中
51.26-51.27
just like in the hash table
就和hash table中⼀样
51.27-51.32
all the traversals were in one direction they always top to the bottom
所有的遍历操作都是⾃始⾄终以⼀个⽅向进⾏遍历，即⾃上⽽下
51:32 - 51:33
So there can never be any deadlock
So，这就永远不可能出现死锁问题
51.33-51.38
because I never had a thread trying to come up from the bottom to the top, in reverse
direction
因为我永远不可能遇到⼀个线程会对这两种数据结构进⾏⾃下⽽上的遍历
51.38-51.42
and try to hold latches that holds latches that another thread once
并去试着持有另⼀个线程已经拿到过的latch
51:42 - 51:47
Right,so if though now we want to start scanning on leaf nodes
So，如果我们现在从叶⼦结点开始扫描
51.47-51.48
things become more complicated
事情就会变得更加复杂
51.48-51.53
because now we have things coming from top to bottom and and also from left to right
因为我们现在就遇上了这种情况，即⼀条线程从上往下进⾏遍历，另⼀条线程则是在叶⼦结点上
从左到右进⾏扫描
51:53 - 51:54
So in this case deadlock could occur
So，在这个例⼦中，是有可能发⽣死锁的情况
51:56 - 51:57
So let's see how we handle this
So，我们来看下该如何处理这个
51:57 - 51.58
So the first thing I'll say is
So，⾸先我要说的事情是
51.58-52.00
the original I said this is before
我之前就讲过
52.00-52.03
the original B+tree did not have these sibling pointers on the leaf nodes
原始的B+ Tee的叶⼦结点上并没有这些兄弟指针
52:04 - 52:06
This is what how most B+tree have this now
现在⼤部分的B+ Tree都有这个兄弟指针
52.06-52.10
and this comes from the B-link-tree that was invented here at CMU
兄弟指针是来源于CMU所发明的B^link Tree
52:10 - 52:12
So let's say I had this really simple tree like this
So，我们以图上这个简单的B+ Tree为例
52.12-52.16
and I have thread one wants to find all keys less than 4
我想通过⼀条线程来找到所有⼩于4的key
52:16 - 52:18
So we take a R latch on the root
So，我们在根节点处获取⼀个read latch
52.18-52.22
come down here and get the R latch on C
往下⾛，到达C节点处，并去获取该节点的read latch
52:22 - 52:23
We can release the R latch on A
现在我们可以释放A节点处的read latch
52.23-52.26
and now we want to start scanning scanning across
现在我们想开始对叶⼦节点进⾏扫描
52:26 - 52:29
All right, so say we reverse order on all the keys in this node
All right, so 这⾥，我们这条线程会从相反的⽅向来扫这些key，从c这个node开始
52.29-52.32
but now we recognize that we got to keep going over here
但现在，我们意识到我们得从C跳到B进⾏扫描
52:32 - 52:36
Right, so just like before in case of crabbing
So，就像之前的crabbing那样
52.36-52.38
when we want to go horizontally
当我们进⾏⽔平扫描时
52.38-52.42
we don't release the latch that we hold until we acquire the latch that we want
直到我们获取到我们想要的latch时，我们才会将我们⼿上的latch进⾏释放
52:43 - 52:44
So in this case here
So，在这个例⼦中
52.44-52.46
in order to get the latch on B
为了拿到B节点上的read latch
52.46-52.48
I hold the latch on C
我现在拿着的是C节点上的read latch
52.48-52.49
once I acquire it
⼀旦我获取到B节点上的read latch
52.49-52.52
then I can swing around ,and then release the latch on C
那么我就可以跳到B节点这⾥，并释放C节点处的latch
52:54 - 52.55
So in this case here
So，在这个例⼦中
52.55-53.01
for all keys less than four is basically keys from less than 4 to that negative infinity
简单来讲，所有⼩于4的key指的是key值的区间为[-∞,4)
53:01 - 53:06
so we know that we're gonna have to hit the we want to get to this end of the the the
tree
So，我们就知道我们得从叶⼦结点的左边扫描到右边
53:07 - 53:10
There's other tricks you can do like having like fence keys or hint keys
你们可以使⽤其他的技巧来做到这点，⽐如fence key或hint key
53.10-53.14
basically to tell you for this node here what's the keys over on this side here
简单来讲，它们会告诉你有哪些key在这个节点中
53.14-53.17
and to tell you whether you even even need to jump there or not
并告诉你，你是否该跳到这个节点
53:17 - 53:19
But for this example we don't be worried about that
但在这个例⼦中，我们不需要关⼼这点
53:21 - 53:22
All right, so let's make it more complicated
So，我们把这个例⼦变得更加复杂些
53.22-53.27
say now we have another thread that wants to find all keys greater than one
假设，现在我们有另⼀条线程，它想找到所有⼤于1的key
53:27 - 53:28
Well okay that's fine,
Well，这没问题，我们来做吧
53.28-53.31
so the both of them start they both want acquire the R latch on A
So，当这两条线程都开始执⾏时，它们都想去获取A节点处的read latch
53.31-53.31
that can happen
这种情况是有可能发⽣的
53.31-53.33
because that can be shared amongst them
因为这两条线程可以共⽤这个read latch
53:34 - 53:36
And then they this guy gets to read latch on B
接着，左边这条线程拿到了B节点处的read latch
53.36-53.37
this guy gets a read latch on C
右边这条线程拿到了C节点处的read latch
53.37-53.38
that's fine
这没问题
53:38 - 53:40
Then they scan all the keys
这两条线程会去扫描所有的key
53.40-53.42
and they start going across
现在，它们开始进⾏扫描
53.42-53.44
and for this point here,
此时
53.44-53.46
B wants to latch on C
B节点处的这个线程想去获取C节点上的latch
53.46-53.47
C wants to latch on B
C节点上的线程想去获取B节点上的latch
53.47-53.50
that could be shared right because the R latches
因为它们拿的都是read latch，这是可以共享的
53:50 - 53:54
So at this point here they both acquire alternating one，so the different ones
So，此时它们都交替获得了对⾯节点的latch，这和它们⼿上的read latch并不相同（因为是两
个不同节点的latch）
53.54-53.55
, that's good
这样做没问题
53.55-53.56
then they slide over
然后，它们就滑动到图中所示的位置处
53.56-53.59
and now they release the latch of it it just came from
现在，它们就会释放掉，它们之前所遍历时所拿到的latch
53:59 - 54:02
So because the R latch can be shared ,there's no deadlocks
So，因为read latch可以被共享，这也就不存在死锁问题
54:03 - 54:05
Right so this works out fine
So，它们在执⾏任务时，就不会出现什么问题
54:07 - 54:10
So let's talk about now when we have Writes
So，我们来讨论下写⼊时的情况
54:10 - 54:12
So thread 1 wants to delete 4
So，线程1想去删除4
54.12-54.16
and thread 2 wants to find all keys greater than 1
线程2想去找到所有⼤于2的key
54:16 - 54:18
So at the very beginning they start off
So，它们从根节点处出发
54.18-54.21
they can both get the R latch on A,
它们都可以拿到A节点处的read latch
54.21-54.26
because we're doing that the optimistic latch coupling technique or latch crabbing
因为这⾥我们所使⽤的的是乐观锁机制latch coupling/crabbing技术
54.26-54.33
Well，at my root, I always acquire the R latch and only get the W latches only on the
child node
Well，在我的根节点处，我拿的始终是read latch，只有在孩⼦节点处我们才会去拿write latch
54:33 - 54:35
So the very beginning they both have a R latch, that's fine
So，在⼀开始它们在根节点处都拿到了read latch
54:36 - 54:38
And then they both go down here
接着，这两条线程都往下⾛
54.40-54.42
B gets the R latch on on sorry, thread one gets thread two gets the R latch B,
线程2拿到了B节点处的read latch
54.42*-54.44
thread one gets the W latches on C
线程1拿到了C节点出的write latch
54.44-54.46
because that's the entry that it wants to delete
因为它想删除的时4这个条⽬
54:48 - 54:52
So now let's say that T2 wants to scan across,
So，现在线程2想开始扫描叶⼦节点
54.52-54.54
because it's finding all keys greater than 1
因为它想去找到所有⼤于1的key
54:55 - 54.58
So before it can jump into into C
So，在它可以跳到C节点前
54.58-55.00
it has to get the W latch on C
它必须拿到C节点上的write latch
55.00-55.01
we're sorry to R latches on C
抱歉，是C节点处的read latch
55:02 - 55:03
But it can't do that
但我没法做到这点
55.03-55.07
because the first thread has the W latches on this node
因为线程1已经拿到了该节点上的write latch
55:09 - 55:10
So what should happen
So，这会发⽣什么呢？
55:14 - 55:17
What's that, he says sure wait
有同学说，线程2得等待获取这个read latch
55.17-55.19
what else ,could we do
我们还有其他的⽅法嘛？
55:21 - 55:22
There's three choices, right
其实有三种做法
55:22 - 55:23
We can wait
我们可以进⾏等待获取这个read latch
55:24 - 5524
All right
55.24-55.26
again think of that while that we just spin in that
思考下，当我们在那⾥进⾏旋转等待的时候
55.26-55.31
we could kill ourselves and just restart the operation,
我们可以结束并重启该操作
55.31-55.42
or it could be like a gangster and try to steal its you know take go over here shoot it in
the head, take his wallet, take its latch ,and then take over
或者，我们也可以流氓点，直接把对⾯爆头，抢他的钱包，拿它的latch，然后再还给它
55:42 - 55:44
Alright, so raise your hand if you think we should wait
So，如果你们觉得我们应该去等待，那么举起你们的⼿
55:46 - 55:47
En 25%
emmm，四分之⼀
55.47-55.49
raise your hand if you think we should just kill ourselves
如果你们觉得我们应该⾃杀（中断操作），请举⼿
55:52 - 55:52
Even less
更少⼈了
55.52-55.56
raise your hand if you think we should be a gangster and steal it,
如果你们觉得我们该变得流氓点，拿到这个latch，请举⼿
55.56-55.57
nobody
没⼈了
55:59 - 56:00
So what's the issue here
So，这⾥的问题是什么呢？
56:02 - 56:04
what is this thread know about this thread
左边这条线程对右边这条线程有什么了解么？
56:08 - 56:08
Nothing
⼀⽆所知
56:09 - 56:16
Right, because all the latches is just a little some bits in the data structure this ,and then
something someone requires it and either read mode or write mode
因为所有的latch只是数据结构中的⼏个bit罢了，然后，某⼈会去获取它，获取的可能是读模式
的latch，也可能是写模式的latch
56:16 - 56:21
So there's no global view in the system to tell you what this other thread is doing
So，在系统中，并不会使⽤⼀个全局的⻆度，来告诉你另⼀条线程正在做什么
56:22 - 56:27
The database is at a high level ,sure it says no I'm doing I'm doing delete on 4
从⾼级层⾯来看，数据库表示它正在对4进⾏删除
56:27 - 56:30
But at this lowest level inside the data structure
但从数据结构中的最低级的层⾯来看
56.30-56.31
as our threads are traversing through
当我们的线程进⾏遍历时
56.31-56.32
we don't have access to that information
我们⽆权去访问该信息
56.32-56.35
because that would be too expensive for us to go look up
因为对我们⽽⾔，去进⾏查找要付出的代价太昂贵了
56:36 - 56:38
Again we want these operations to be really fast,
再说⼀遍，我们想让这些操作变得很快
56.38-56.44
because we're holding this latch on this guy here you know while we're trying to get
that other latch
因为当我们试着去获取另⼀个latch的时候，我们正拿着B节点处的read latch
56:44 - 56:46
So we could wait
So，我们可以等
5646-56.48
but that could be a bad idea too,
但这可能也是⼀个糟糕的想法
56.48-56.52
because we don't know what this guy's doing
因为我们并不知道另⼀条线程在⼲啥
56:52 - 56:55
Right we don't know whether you know in this case here on our example
⽐如，在我们的例⼦中
56.55-56.58
it's just deleting this one record there's one key
它只是去删除这条记录，将4这个key删掉⽽已
56.58-56.59
and it meant then it's done
删完就完了
56:59 - 57:00
But we don't know that
但我们并不知道这点
57.00-57.03
it could also be trying to acquire the latch on B
右边这条线程也可以去试着获取B节点处的latch
57.03-57.05
and therefore I have a deadlock
因此，我就会遇上死锁问题（知秋注：读锁不释放，它获取不到写锁）
57:06 - 57:11
So the simplest thing turns out to be the best thing is this we say we don't want to live
anymore
So，事实证明，最简单的也就是最好的，我们不想再让线程2继续执⾏了
57.11-57.14
and we use abort and kill ourselves ,and just restart the operation
我们会去结束并重新执⾏这个操作
57:17 - 57:18
Right, this is the fastest thing to do
这是最快的做法
57.18-57.21
,because there's again these latches are super dumb
因为这些线程都是群蠢蛋
57.21-57.24
like there's no information about who's holding them and what they're doing
⽐如，它们并不清楚哪条线程拿到了latch，也不知道对⾯在⼲啥
57:24 - 57:29
So rather than try to reason about anything,we just want to mediately stop what we're
doing and restart
So，与其去解释为什么，我们不如还是⽴刻停⽌操作，并重新执⾏该操作
57:31 - 57:34
And assume they have time to come back then the last we want is now there ,yes
这是建⽴在假设它们能回来继续处理的前提下，然后最后我们能获取想要latch的情况下
09-04
57:36 - 57:37
Since how is it better than waiting
这种做法为什么要⽐等待来的更好呢？
57.37-57.40
so yeah you can wait a little bit with a timeout
因为你在进⾏等待的时候，可以设置⼀个timeout值
57:40 - 57:43
And then eventually that the latch you want is not available
如果最终你没拿到你想要的那个latch
57.43-57.45
then you just kill yourself
那么你就中断操作
57.45-57.46
that's a you could do that as well
你可以这么做
57.46-57.48
but like I'm talking like maybe wait microseconds
但就像我说的，等待的时候可能就只有⼏微秒
57:59 - 58:00
So his statement is
So，他说的是
58.00-58.00
back up here
我们先回到这⾥
58.00-58.04
he said if we're down here on c
如果我们到达了这个C节点
58.04-58.10
for thread 1 doesn't thread one have a W latch
对于线程T1来说，线程T1拿到了⼀个write latch
58:31 - 58:32
So his statement is that
So，他说的是
58.32-58.41
if C really wanted to go in this direction and do some modification would have to have a
W latch up above up
如果C节点处的线程1想以从右往左的顺序遍历，并且进⾏修改操作时，需要持有上⾯节点的
write latch
58.41-58.47
and therefore this thread would not been able to get down here to go across
因此，线程2就没办法往下⾛，并跨节点进⾏遍历
58:47 - 58:47
Well , right
58.47-58.50
so say the blue thread starts first
So，假设线程2先启动
58.50-58.54
it gets the R latch comes down here, and gets the R latch that it wants on B,
它会在根节点处先拿到read latch，接着往下⾛，到达B节点时，会去拿该节点的read latch
58.54-58.59
then T1 starts gets the W latch on A, right
然后，线程1启动了，它会去拿A节点上的write latch
58:59 - 59:00
And then gets the W latch on this
然后，它再去拿到C节点的write latch
59:02 - 59:06
So it doesn't know, you don't know this like it can come in any order
So，你并不清楚这⾥的发⽣顺序，多个线程的执⾏顺序可能是任意的
59:09 - 59:09
Yes
请讲
59:19 - 59:20
So his statement it is which is true,
So，他的说法是对的
59.20-59.21
we could have starvation here
这⾥我们可能会遇上starvation问题
59.21-59.24
where this thing here it says I don't you know I can't get what I want
如这⾥所示，我没法拿到我想要的latch
59.24-59.27
I'm gonna kill myself tries it again same as you ,yes
那我就得中断我的操作，并进⾏重试，这和你说的⼀样
59:29 - 59:32
And there's different ways to handle that that adds additional overhead
我们可以通过不同的⽅式来处理这个问题，这会增加额外的开销
59:35 - 59:42
In practice, I don't think MySQL and Postgres do anything,
在实战中，我不觉得MySQL和PostgreSQL做了这些事情
59.42-59.44
I don't know what the commercial guys
我并不清楚那些商⽤数据库系统有没有做这些
59:44 - 59:45
But you can do it
但你可以这么做
59.45-59.46
you imagine how to do it,
你可以去想象下该怎么做
59.46-59.47
it's just it's extra work
这是些额外⼯作
59.47-59.49
and it may not be worth
对于你们来说，去实现这个可能并不值得
59.49-59.50
it the simple thing might be doing the best thing
简单就是最好
59:51 - 59:51
yes
请讲
59:56 - 59:57
What do you like the whole program
你所说的整个程序是什么？
01:00:00 - 01:00:02
The process oh no no no no
你说的是过程？No no no
1.00.02-1.00.06
like ,it's like so it's like an operation
So，这是⼀种操作
1.00.06-1.00.10
so this like find all keys greater than one
⽐如这个，找到所有⼤于1的key
1.00.10-1.00.11
we restart that
我们会重启这个操作
01:00:12 - 01:00:16
Actually um actually perfect, next the next slide
算了，看下⼀张幻灯⽚
01:00:16 - 01:00:19
So the the way think about this is that
So，我们思考这个的⽅式是
1.00.19-1.00.20
we have this database system
我们有⼀个数据库系统
1.00.20-1.00.22
we have this execution engine that's invoking queries,
我们也有⼀个执⾏引擎，它会调⽤查询
1.00.22-1.00.27
and it says oh in order to get the tulpes ,I need for this query to answer this query
为了得到这个查询所要找的数据，以此来⽣成查询结果
1.00.27-1.00.31
I gotta go to the index and do find keys greater than one
我得先根据索引，找到⼤于1的key
01:00:31 - 01:00:33
So then it invokes that on the index
So，它会在索引上调⽤这个
1.00.33-1.00.36
and there's basically a retry loop that's inside the index
基本上来讲，在索引中会有⼀个retry循环
1.00.36-1.00.42
Well，I keep retrying that to do that operation on that index until it succeeds
我会在索引上不断重新执⾏这个操作，直到操作成功为⽌
01:00:43 - 01:00:48
For for inserts or things that could potentially violate an integrity constraint
对于插⼊操作，或者是可能违反完整性约束的东⻄来说
01:00:48 - 01:00:50
Yeah, you have a check to say
你必须要对此进⾏检查
1.00.50-1.00.52
you know I try to insert and I couldn't
我试着去插⼊，但我做不到
1.00.52-1.00.53
because it would violate the integrity constraint
这是因为它违反了完整性约束
1.00.53-1.00.55
not because I couldn't get the latch I wanted
⽽不是因为我没能拿到我想要的latch
01:00:55 - 01:00:56
And in that case
在这个例⼦中
1.00.56-1.00.59
you abort that operation
你中断了这个操作
01:00:59 - 01:00:59
But in general
但⼀般来讲
1.00.59-1.01.02
you just keep you trying this forever, because eventually it'll go through
你只要不停地重复进⾏，最终总会成功的
01:01:02 - 01:01:03
But to his point
但在他的观点中
1.01.03-1.01.07
you could lead to starvation or just burning a lot of cycles trying to you know traverse the
bottom
这会导致starvation的出现，或者浪费⼤量的CPU Cycle来遍历底部的数据
1.01.07-1.01.10
,and then try to acquire the latch that you never can acquire
然后，试着获取你永远获取不了的那个latch
01:01:10 - 01:01:13
But the main thing I main takeaway when you get at get out of this is that
但从中我们所得到的要点是
1.01.13-1.01.17
because there's a potential for deadlock here
因为这⾥可能会存在死锁问题
01:01:17 - 01:01:19
But we don't know there what the other thread is doing,
但我们并不清楚其他线程所做的事情
1.01.19-1.01.25
rather we wouldn't be super conservative and just kill ourselves immediately, we can wait
a little bit sure
我们可以等待⼀段时间，⽽不是过于保守，直接将操作终⽌
01:01:25 - 01:01:27
But we don't want to reason about what they're trying to do,
但我们并不想去解释它们在尝试做的事情
1.01.27-1.01.29
we just say we can't get in those latch and really retry
我直接就会说，我们没法拿到这些latch，于是我们重新执⾏这些操作
01:01:30 - 1.01.34
Because there's nothing else up above that's gonna say oh there's a deadlock when we
break it by killing one of you
因为在此之上并没有其他东⻄
因为此处有⼀个死锁，我们需要kill掉其中的⼀个，打破死锁
1.01.34-1.01.35
yes
请讲
01:01:40 - 01:01:41
The statement is
他说的是
1.01.41-1.01.44
it wouldn't matter what kind of latch the other thread is having
我们⽆须关⼼其他线程持有的latch类型是什么
01:01:44 - 01:01:45
Sure yes
确实如此
1.01.45-1.01.45
in this case here
在这个例⼦中
1.01.45-1.01.49
it's this guy has a W latch, I can't I can't get the R latch that fails
线程T1拿到了C的write latch，但它没法拿到B的read latch（需要等B释放），因此也就失败了
01:01:57 - 01:01.59
Right so that was the gangster one
So，这就是种流氓操作了
1.01.59-1.02.01
right so that was saying like this guy has the R latch
So，线程2拿到了read latch
1.02.01-1.02.06
maybe I prefer read reads or writes and therefore I want to kill this guy
可能我想要的是进⾏读写操作，因此，我想将线程1给杀死
01:02:06 - 01:02:08
Sure you can do that, but how do you actually implement that in your code
没错，你可以这么做，但你实际上该如何在你的代码中实现它呢？
01:02:09 - 01:02:13
Now you need to way to interrupt this guy, in whatever it's doing
现在，你需要将这个线程中断，不管它在⼲什么
1.02.13-1.02.14
then go steal the latch
然后偷⾛对⾯的latch
1.02.14-1.02.16
that's super hard ,
这做起来难度超级⾼
1.02.16-1.02.18
because again we're doing this these small critical sections
因为我们所处理的是这些关键细节部分
01:02:19 - 01:02:22
I don't want to check a global variable says did somebody hate me and I and I should die
我不想去对⼀个全局变量进⾏检查，并表示，是否有⼈恨我，我是不是应该去死
01:02:23 - 01:02:23
Right
01:02:26 - 01:02:28
So it's kinda corny that is just it's not worth it,
虽然这么说有点⽼套，但确实不值得这么做
1.02.28-1.02.30
in the back, yes
后⾯的那位同学请讲
01:02:51 - 01:02.51
Okay
1.02.51-1.02.52
so I think you said here
So，我觉得你所说的是
1.02.52-1.02.55
if if this thing actually when I do the delete
当我进⾏删除操作时
1.02.55-1.02.59
I had merged this，I had to modify the route
如果我要合并节点，那我就得修改这⾥的路线了
1.02.59-1.03.01
how would that work
这该如何⼯作呢
01:03:01 - 01:03:05
Well again like I would have to hell out the right ,so when I landed here using optimistic
latch crabbing
So，当我落到这个节点时，我会使⽤optimistic latch crabbing
01:03:06 - 01:03:07
I would recognize
我会意识到
1.03.07-1.03.09
oh I'm gonna have to merge and modify my parents,
Oh，我必须进⾏合并操作，以及对我的⽗节点进⾏修改
1.03.09-1.03.14
I got to go back , all the way to exclude latches all the way down
我得回到根节点处，然后往下⾛的时候，我得拿着独占型的latch
01:03:14 - 01:03:15
so that back, yes
So，后⾯的请讲
01:03:27 - 01:03:30
I say if we're in this situation here
如果我们处于这种情况
01:03:58 - 01:03.59
he's actually correct
实际上，他说的是对的
1.03.59-1.04.02
so so this is what that
你想说的是啥？
01:04:14 - 01:04:18
Right, so what you're saying
So，我来试着表达你说的东⻄
01:04:19 - 01:04:24
So if I know any split here and therefore I may have to split over here,
So，如果我知道这⾥会发⽣拆分，那么我可能就得在这⾥进⾏拆分操作了
1.04.24-1.04.26
I want to acquire a W latch on this
我想获取根节点处的write latch
1.04.26-1.04.30
and then I'm and then a W latch from all my all its children
接着，拿到所有根节点的write latch
01:04:31 - 01:04:33
And then that would allow me to do any modifications that I want to do
那么，这就允许我去进⾏我想做的任何修改了
1.04.33-1.04.37
which includes updating the sibling pointers which is tricky
这包括更新兄弟指针，这很棘⼿
01:04:38 - 01:04:40
And then you're saying that could cause a deadlock,
接着，你⼜说了，这会引起死锁问题
1.04.40-1.04.42
because someone could be coming in a different direction
因为其他线程可能会从不同的⽅向进⼊
01:04:58 - 01:04:59
Right, so you kill yourself
没错，So，你就把你⾃⼰⼲掉了
01:05:08 - 01:05:09
There's no point of acquiring locks
这⾥获取锁没有意义
01:05:11 - 01:05:16
Yeah so if this guy had a split, I have to update this sibling pointer too
So，如果这个节点要进⾏拆分，那么我就得更新我的兄弟指针了
01:05:17 - 01:05:18
So you do need to acquire a latch on this guy as well
So，你确实也需要去获取这个节点的latch了
01:05:19 - 01:05:20
But again the simplest thing is like
但最简单的做法是
1.05.20-1.05.24
another thing you can do to like say
你们可以做的另⼀件事就是
你也可以这么来做
1.05.24-1.05.27
two threads exactly same time to acquire exact same latches
⽐如，有两条线程在同⼀时间去获取同⼀个latch
01:05:27 - 01:05:28
In practice
在实战中
1.05.28-1.05.35 ！！！！！！！！
there's you know there's nothing there not me in absolute lockstep meaning like if you
bought them the same time to really come back and hit the same conflict
对我来说，可能会⽤到绝对同步，它的意思就是，让两个线程交给两个CPU核⼼同时执⾏任
务，同时返回结果，以此来应对冲突问题
1.05.35-1.05.37
they're gonna be slightly different each other
它们彼此得到的结果会有所不同(知秋注：通过返回结果来进⾏故障检测或校正之类的事情)
01:05:37 - 01:05:40
But even then you could say oh I've tried this before and I wasn't able to do it ,
但接着我表示，我之前已经试过这个了，但我没法做到这点
1.05.40-1.05.41
let me back off a little bit
让我稍微回退⼀点
1.05.41-1.05.44
and that way at least come in staggered
这样做⾄少能够错开时间
1.05.44-1.05.45
then I avoid that issue
那么我就会避免这种问题了
01:05:45 - 01:05:48
Again the simplest thing to say I didn't get the last I wanted to kill myself immediately
其中最简单的就是，如果我没能得到最后⼀条线程给我返回我想要的信息，那么就⾃杀重来
也就是说，最简单的⽅式是，如果我最后没能得到我想要的，我就⽴⻢⾃裁，重新来过
1.05.48-1.05.52
and that avoids all deadlocks
这样就避免了所有的死锁问题
01:05:52 - 01:05.56
And that's gonna be different when we talk about today's locking later on for
transactions,
这和我们稍后要谈的事务上的锁是不同的
1.05.56-1.06.01
because we will have something else can come and resolve deadlocks for us
因为我们可以通过其他⽅式来解决死锁问题
1.06.01-1.06.02
but we don't have that here
但这⾥我们不需要使⽤这些⽅法
01:06:04 - 01:06:14
Okay, so the last thing I want to finish up discussing is a is an additional optimization for
handing overflows
Ok，最后我想谈的⼀件事情就是在处理overflow情况时可以使⽤的⼀种额外优化⼿段
01:06:15 - 01:06:17
And this is this comes from the B link
这种优化⽅式是来源于B^link-Tree
1.06.17-1.06.20
again the B-link-trees want what went first invented the the sibling pointers
再说⼀遍，B^link-Tree是第⼀个发明了兄弟指针的数据结构
1.06.20-1.06.26
and then everybody does that now in a B+tree for the most part at least in one direction
于是，现在每个⼈都在B+Tree中使⽤这个兄弟指针，⼤部分情况下，这个指针都⾄少是⽀持⼀
个⽅向的（往左或往右⾛）
01:06:26 - 01:06:31
So normally every time you have to do an overflow you have to do a split in a node
So，通常情况下，每次我们不得不对节点进⾏overflow处理，或者拆分处理的时候
So，通常情况下，每当碰到节点发⽣overflow 的时候，我们不得不对它进⾏拆分处理
1.06.31-1.06.33
we have to update three nodes
我们必须得更新3个节点
1.06.33-1.06.35
we have to update the the node being split
我们必须去更新那个要被拆分的节点
1.06.35-1.06.38
we have to create a new node to overflow into
我们必须创建⼀个新的节点，以此来存放溢出的数据
需要被overflow的数据
01:06:38 - 01:06:42
And then we have to update at least one parent or one our ancestry
接着，我们必须⾄少更新⼀个⽗节点或者是⼀个祖先节点
1.06.42-1.06.46
to now accommodate that new separator key for the new node that we added
以此来容纳我们添加在这个新节点中的新的单独的key
以此来容纳我们新添加的这个节点的新的单独的key
01:06:46 - 01:06:49
So the B-link-tree guys came with optimization
So，提出B^link-Tree的那个⼈提出了⼀种优化⽅式
1.06.49-1.06.51
where any single time a leaf node overflows
当在任意时刻，某个叶⼦节点出现overflow的情况
1.06.51-1.06.55
you actually hold off on updating the parent node
实际上，我们会去延迟对⽗节点的更新操作
01:06:56 - 01:07:04
So that you don't want the restart and this restart the traversal and do the pessimistic W
latches all the way down
这样，我们就不⽤去重头开始并拿着write latch⼀路往下遍历了
01:07:04 - 01:07:10
You just update a little global information table for the for the tree
你只需要更新这棵树中全局信息表中的⼀点点内容就可以了
1.07.10-1.17.16
and says any time somebody comes through that part of the tree again here's how it
want you to update it
当在某⼀时刻，有⼈来遍历这棵树的时候，我们再去更新这个⽗节点
01:07:16 - 01:07:17
So let's look at example
So，我们来看个例⼦
1.07.17-1.07.19
so say I want to search key 25
So，假设我想去插⼊key 25（这⾥⼝误，并不是查找）
1.07.19-1.07.25
again I do the optimistic latch crabbing on the way down, I get R latches, I get to here on
C
这⾥我使⽤乐观锁机制，往下遍历的时候，我会去获取⼀路上的read latch，现在我到达了C节
点处
1.07.25-1.07.31
again I'm when I get the W latch on F
接着当我拿到F节点处的write latch时
1.07.31-1.07.35
I hear that I would recognize that I'm gonna have to split
我意识到我必须对这个节点进⾏拆分操作
01:07:35 - 01:07:41
But then rather than restarting and taking W latches, I just give up the R Latch C,
但此处我并不会去重头开始遍历，来获取到⼀路上的write latch，⽽是直接放弃⼿⾥握的C节点
上的read latch
1.07.41-1.07.47
I still do my insert and add the new node
我依然会去进⾏我的插⼊操作，并添加新的节点
01:07:48 - 01:07.50
But then rather than having to update this thing
但这⾥我并不会去更新C节点
1.07.50-1.07.55
I just have a little global table for the tree
这⾥我会使⽤该树的⼀个⼩的全局表来进⾏处理
1.07.55-1.07.58
that says if you if you ever take the W latch on this node C
这⾥我表示，如果你以前拿到过这个C节点的write latch
1.07.58-1.08.00
here's the change I want you I want you to add in
那么我想让你在此处进⾏添加这样的修改
这⾥有⼀个变化，我想要做⼀个添加操作
01:08:01 - 01:08:01
Right
01:08:03 - 01:08:06
And that way the next time somebody comes through and takes the W latch
当下次的时候，当某⼈遍历这棵树，并拿到write latch的时候
1.08.06-1.08.10
,they'll do some extra work and finish updating what we wanted
他们会去做些额外的⼯作，并进⾏我们想要的更新操作
01:08:10 - 01:08:11
And this is still correct this is still valid,
这依然正确，⽽且有效
1.08.11-1.08.16
because if I come along and now do a look-up on 31
因为此时，如果我要查找key 31（知秋注：此时如果没有更新c节点的情况下，也是可以找到
的）
01:08:16 - 01:08:19
Well I follow the the the pointers down
Well，我会沿着这些指针往下⾛
1.08.19-1.08.24
and my pointer for for all keys greater than 23 will put me here
这⾥我们所要查找的key⼤于23，于是我们会落到F这个位置
1.08.24-1.08.27
and now I have to know all right well I should have this overflow thing
现在，我意识到我有⼀个overflow node
1.08.27-1.08.28
if I'm looking for 31
如果我要查找key 31
1.08.28-1.08.29
scan along leaf node
然后沿着叶⼦结点进⾏扫描
1.08.29-1.08.32
and that's actually what I'm looking for
在这⾥⾯能找到我想要的东⻄
01:08:32 - 01:08:32
Yes
请问
01:08:40 - 01:08:44
Right, so basically so now there's now there's a in this global thing
So，现在此处有某个全局的东⻄
1.08.44-1.08.45
that anybody can see when they first start
每条线程第⼀次启动的时候，都可以看到这个东⻄
1.08.45-1.08.51
says oh by the way, if you you're doing a modification and you go um I see take a W
latch work
如果我们要去进⾏修改操作，我们就会明⽩要去拿⼀个write latch才⾏
01:08:52 - 01:08.53
So this guy wants to now insert 33
So，现在线程3想去插⼊key 33
1.08.53-1.08.57
I can do R latch all the way down to get to B
我可以拿着read latch，并往下⾛到达B节点处
1.08.57-1.09.01
and then but now for C I would know oh why I was told that I should take a W latch on
this
但当我们要进⼊C节点时，我被告知，我应该去拿⼀个write latch
1.09.01-1.09.03
let me go ahead and do that
我往下到达C节点处，并拿到⼀个write latch
01:09:03 - 01:09:06
Now I do I finished the propagation applying that change there
现在，我就完成了修改信息的传播，并修改了这⾥的内容
1.09.06-1.09.09
and then now the tree is considered considered valid
现在，我们就觉得这棵树是合法的
然后现在，这棵树会被认为是有效的（知秋注：对于这棵树来说，如果想要让它有效，需要把这
个点的处理加上就完整了）
1.09.09-1.09.12
right I take the W latching and complete my operation
我拿到了write latch，然后完成我的操作
01:09:12 - 01:09:15
So it's just it's like rather than having to do the restart
So，这样我们就不需要重新遍历再来进⾏操作了
1.09.15-1.09.17
you update this thing to say
即，在你更新这个东⻄的时候，你会说，
1.09.17-1.09.19
all right the next time you go through somebody else will take care of it for me
当下⼀次有⼈修改此处的时候，会帮我落实传播修改的（知秋注：⽐如这⾥对C的修改）
01:09:20 - 01:09:20
Yes
请讲
01:09:22 - 01:09:29
How would you identify C, and what you mean, like that like it's a page ID, right
该如何识别出C节点？你想表达的是什么？这其实是⼀个page id
01:09:29 - 01:09:31
Logical node id
逻辑节点id
1.09.31-1.09.35
if you're going to see you know page 123，by the way apply this change for me
⽐如，如果你找到了page 123，那就帮我进⾏这种修改
01:09:36 - 01:09:36
Yes
请讲
01:09:42 - 01:09:43
Do you obtain what sorry
能再说⼀遍吗
01:09:45 -01:09:51
So back here, yeah so yeah yes
So，回到这张幻灯⽚，你说的没错
01:09:51 - 01:09.52
And for simplicity reasons
为了⽅便起⻅
1.09.52-1.09.54
there's different ways to do this
我们可以使⽤不同的⽅法来做到这点
1.09.54-1.09.55
in this case here
在这个例⼦中
1.09.55-1.09.56
if we don't have the same parent
如果我们⽤的并不是同⼀个⽗节点
1.09.56-1.10.00
then we may not have a sibling pointer to go in the reverse direction
然后，我们可能并不会有⼀个指向反⽅向的兄弟指针
1.10.00-1.10.04
there's different implementations
它可以有不同的实现⽅式
01:10:04 - 01:10:07
But if you want to have bi-directional sibling pointers, yeah so you'd have to update that
但如果你想有双向的兄弟指针，那么你就必须更新这个东⻄
01:10:08 - 01:10:11
That makes things way more complicated then what I could show in a class
这会让事情变得更加复杂，我之后会在课上展示这个
01:10:21 - 01:10:23
Would like this thing
是这个吗？
01:10:23 - 01:10:24
That's just a sibling pointer
这只是⼀个兄弟指针
01:10:26 - 01:10:31
Oh yeah you need you have the update and say yes the sibling pointer the overflow thing
is not there anymore
你需要去更新这个兄弟指针，并表示兄弟指针所指向的这个overflow page已经不在那⾥了
你需要去更新这个兄弟指针，并表示，兄弟指针指向了⼀个全新的节点，溢出问题已经解决（知
秋注：在切分节点的时候，这个指针已经更新过了）
01:10:32 - 01:10:34
But it actually doesn't matter anymore actually
但实际上这并不重要
1.10.34-1.10.35
you actually can keep it right
实际上，你可以保留这个
实际上你不通过它就可以很轻松找到
1.10.35-1.10.37
because because up above
因为从上⾯来看
1.10.37*-1.10.41
if I'm looking for things greater than equal to 31
如果我要找⼤于31的东⻄
1.10.41-1.10.44
I'm never gonna get this node anyway, I'd always get to this one
我永远不需要跑到这个F节点，⽽是始终到它下⽅的这个overflow page上获取
我永远不需要跑到这个F节点，⽽是始终通过C的31跳到下⾯这个新加⼊的节点上找
01:10:44 - 01:10:46
So you don't actually have to update it
So，实际上，你并不需要去更新F这个节点
01:10:47 - 01:10:47
Yes
请讲
01:11:02 - 01:11:02
Correct
他说的没错
1.11.02-1.11.08
his statement is the first person for this for this position the first person that will update
C applies this change
他说的是，在这个例⼦中，在拆分并添加完新节点后，紧接着要进⾏下次修改的第⼀个⼈会接受
这个改变，对C节点的内容进⾏更新
1.11.08-1.11.11
and because they hold the write latch on it, it's an atomic operation
因为他拿着该节点的write latch，并且这是⼀个原⼦操作
01:11:15 - 01:11:16
Correct,yes, otherwise could be changed, yes
没错，否则，它可能会被修改
01:11:19 - 01:11:20
All right awesome
很好
01:11:21 - 01:11:23
All right so let's finish up
So，我们来快速总结下
01:11:24 - 01:11:29
So hopefully I've convinced you that uh you know you want to do the latching stuff
So，希望我已经说服你们，你们想去使⽤latch这样的东⻄
01:11:30 - 01:11:33
But it Centauri hard to do, right
但这很难去做
01:11:33 - 01:11:42
I cross over sibling pointers how to keep those in in sync that's a whole nother bag of we
don't talk about
如果我们丢掉了兄弟指针，那我们该如何保持同步呢？这就是另⼀个我们还没有谈的问题了
这⾥，我并没有谈如果通过兄弟指针来访问修改这个新加节点，我们该如何保持同步
1.11.41-1.11.42
that's super tricky
这超级棘⼿
01:11:43 - 01:11:44
But again as I said the good news is that,
但我想说的好消息是
1.11.44-1.11.45
because it's super hard
因为它超级难
1.11.45-1.11.47
and if you can do this
如果你们能做到这个
1.11.47-1.11.49
people pay you a lot of money to do this
⼈们会向你们付⼀⼤堆钱来让你们做这个
01:11:50 - 01:11.51
In practice
在实战中
1.11.51-1.11.55
I would say that you know there's there are those actually surprisingly
这实际上⾮常让⼈惊奇
1.11.55-1.11.59
I mean there's there's a bunch of concurrent data structure libraries that are out there
我的意思是说，世界上有那么多并发数据结构库在那⾥
1.11.59-1.12.03
the Intel thread building blocks is one of them，Facebook's folly
⽐如，intel的intel thread building block就是其中⼀个，还有Facebook的folly
01:12:03 - 01:12:09
So in general for low-level things like you know internal hash tables and things like that
So，⼀般来讲，对于这些低级层⾯的东⻄，⽐如内部的hash table之类的东⻄
1.12.09-1.12.14
that are being used as part of you in query processing and storing data as an index
这些东⻄并不会⽤在查询处理中，也不会⽤在索引中来保存数据
这些东⻄会作为你⽤于查询处理和⽤于索引中保存数据的⼀部分
1.12.14-1.12.16
off-the-shelf stuff is probably good enough
使⽤它们提供的开箱即⽤的api就⾜够了
1.12.16-1.12.21
all the commercial systems roll all the high-end systems roll their own data structures
for these things
所有⾼端的系统都会在它们⾃⼰的东⻄中使⽤它们⾃⼰的数据结构
01:12:21 - 01:12:22
But for table indexes
但对于表索引来说
1.12.22-1.12.27
I think that having to having building a data structure that's specific to your database
system is super important
我觉得构建⼀个专⽤于你⾃⼰的数据库系统的数据结构是超级重要的
1.12.27-1.12.30
because then you can tailor it towards whatever whatever your target operating
environment is
因为这样你就可以针对你的⽬标操作环境进⾏定制
01:12:31 - 01:12:35
So the other thing I'll point out to you is all that we talked a little bit about hash tables
我想指出的另⼀件事情就是，我们已经谈论了点关于hash table的东⻄
1.12.35-1.12.36
we spent most of time and talked about B+tree
我们花了⼤部分的时间来讨论B+ Tree
01:12:37 - 01:12:39
But the core ideas that I've talked about
但我已经讨论的核⼼思想是
1.12.39-1.12.42
like making sure threads are always going in one direction to avoid deadlocks
要确保所有的线程始终是沿着⼀个⽅向执⾏的，这样可以避免死锁
1.12.42-1.12.45
killing yourself right away, if you do encounter a deadlock
如果你遇上⼀个死锁，那么还是⾃裁吧
1.12.45-1.12.52
maybe optimistically assuming that you're not going to have to do modifications to the
structure
可能在乐观的情况下，我们不需要对数据结构进⾏修改
01:12:52 - 01:12:54
And therefore taking a fast path first
因此，我们就会优先采取这种快⻋道的⽅式
1.12.54-1.12.59
all these techniques are reused all throughout computer science and in systems in
general
⼀般来讲，所有的这些技巧都会重复⽤在计算机科学以及相关系统中
01:12:59 - 01:13:03
So it's not just B+tree , these techniques are applicable everywhere
So，不仅仅是B+ Tree，这些技巧能够⽤在各种地⽅
01:13:03 - 01:13:05
Ok
1.13.05-1.13.09
all right so any questions about that we talked about so far today
So，你们对我们今天所谈论的东⻄有任何疑问吗？
01:13:11 - 01:13:16
Alright, so the good news is that next class we we can finally start about how to actually
queries...
So，好消息是我们下节课终于可以开始讲关于如何进⾏查询了
01:13:16 - 01:13:17
We know how to store them
我们知道该如何进⾏存储
1.13.17-1.13.18
we know how to index them
我们知道该如何对它们进⾏索引
1.13.18-1.13.23
and now let's talk about actually how do you you know run queries on top of them, and
produce of results
现在，我们所要讲的就是该如何在它们之上执⾏查询，并⽣成结果
01:13:24 - 01:13:27
Okay, all right, have fun the weekend ,see you
Ok，好好享受周末吧，下周再会