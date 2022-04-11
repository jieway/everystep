17-01
17 - Two-Phase Locking Concurrency Control (CMU Databases
Systems _ Fall 2019)
00:19 - 00:22
so as hopefully you've noticed, I'm not Andy
So，希望你们注意到，我并不是Andy
00:25 - 00:28
Andy and KB welcomed their first child last week
Andy和KB在上周迎来了他们的第⼀个孩⼦
0.28-0.30
everyone's doing well
⼤家都过得不错
0.30-0.37
and we're just we're extremely thrilled to see the Andy Pavlo parenting experiment
我们都很期待Andy传授下他的育⼉经
00:37 - 00:42
so the clicker stopped working
遥控器好像出问题了
00:45 - 00:50
so last class Andy talked a lot about acid properties of transactions
So，上节课的时候，Andy讨论了关于事务ACID特性⽅⾯的⼤量内容
0.50-0.53
focusing a lot on isolation
并且着重讲了很多关于隔离性（isolation）⽅⾯的内容
0.53-0.58
in particular reasoning about whether schedules are serializable
特别是，Andy解释了关于Schedule是否是Serializable这⽅⾯的东⻄
00:58 - 01:02
and we talked about conflict serializability and view serializability
我们讨论了Conflict Serializability和View Serializability
01:03 - 01:05
and with conflict serializability
对于Conflict Serializability来说
1.05-1.13
we were able to to verify whether a schedule was serializable based on being able to
swap operations around or looking at the dependency graph
通过交换操作执⾏顺序或者是查看依赖图，我们就能够验证该Schedule是否是Serializable的
1.13-1.17
and being able to say,yes this this schedule is serializable
并能够说出，Yes，这个Schedule是Serializable的
1.17-1.22
or whether it would violate the serializability guaranteed
或者能够说出它是否违反了我们所保证的serializability
01:22 - 01:25
and then there was this other notion of view serializability
接着，这⾥有另⼀种叫做View Serializability的概念
1.25-1.29
which most applications are actually no systems really support
实际上，没有任何系统真正⽀持这个
01:29 - 01:35
because it's this this concept of being able to produce results to the application that
look right to the application
因为这种概念能够⽣成处对于应⽤程序来说看起来正确的结果
01:35 - 01:40
but actually aren't serializable as we've defined them it wouldn't be conflict serializable
但正如我们之前定义的那样，它们实际上并不是Conflict Serializable的
01:40 - 01:42
so I think he gave a couple examples
So，我觉得Andy给了我们两个例⼦
1.42-1.49
one would be like counting all the number of accounts that had a positive balance while
he was shuffling money around between the accounts
其中⼀个例⼦是，当有⼈在多个账户之间转钱时，我们要数出所有银⾏存款为正的账户数量
01:50 - 01:51
and because the accounts never dropped negative
因为账户中的存款余额永远不为负数
1.51-1.53
we got the correct result
我们会得到正确的答案
01:53 - 01:56
but it wouldn't technically be a conflict serializable schedule
但从技术上来说，它不会是⼀个Conflict Serializable的Schedule
01:57 - 0158
I think another one was
我觉得另⼀个例⼦是
1.58-2.00
just doing blind writes in two accounts
对两个账户中的数据进⾏blind write（即在不读取当前数据的情况下，对该数据进⾏修改）
2.00-2.04
and because the last write that we cared about was the one that got executed
因为我们在意的是最后执⾏的那个写操作
02:04 - 02:05
It counts as serializable
这个例⼦是Serializable的
2.05-2.08
but it's not actually conflict serializable
但它实际上并不是Conflict Serializable的
02:10 - 02:13
so there was a lot of time spent on like how do you verify these schedules
So，我们会在这上⾯花费⼤量的时间，⽐如你该如何验证这些schedule
02:14 - 02:16
but now we want to care about is
但我们现在想关⼼的东⻄是
2.16-2.18
how do you do this stuff in real time
我们如何实时做到这些
2.18-2.22
because he's got an example here
Andy这⾥放了⼀个例⼦
02:22 - 02:27
so an example of this is not conflict serializable
这个Schedule并不是Conflict Serializable的
2.27-2.31
because of we have this W(A) ,and then another R(A)
因为这⾥我们有⼀个W(A)，然后还有⼀个R(A)
02:31 - 02:33
unrepeatable read
这是⼀个不可重复读的情况
2.33-2.35
this is not conflict serializable
So，这个Schedule并不是Conflict Serializable的
02:35 - 02:38
So that's basically what Andy talked about in the last lecture
So，简单来讲，这就是Andy上节课讲的内容
02:40 - 02:41
I'm gonna try to make up for time here
我要试着赶下时间
2.41-2.43
because we're starting a little late
因为我们开始的有点晚
02:45 - 02:45
so as I was saying、
So，正如我所说的
2.45-2.48
we need a way to do this on the fly in a real system
在⼀个真正的系统中，我们需要⼀种⽅式在运⾏时做到这点
02:48 - 02:51
we don't get the full schedules of transactions when they're submitted
当事务被递交给数据库系统执⾏的时候，我们并不会得到该事务的所有Schedule
2.51-2.55
when clients connect to the database and they start a transaction
当client连接到数据库，并开始执⾏⼀个事务的时候
02:55 - 02:57
we don't know what the queries are going to be aa priori
我们不清楚这些查询要做什么
02:57 - 03:04
so we can't look at what the clients going to do and predict whether their operations are
going to be serializable or not
So，我们没法去查看client要去做什么，以及预测它们的操作是否是Serializable的
03:04 - 03:05
So we need a protocol
So，我们需要⼀种协议
3.05-3.11
we need a system that's going to allow us to execute these transactions in parallel
我们需要⼀种能让我们并⾏执⾏这些事务的系统
3.11-3.13
,because we want parallelism in the system
因为我们想在系统中获得并⾏性
03:13 - 03:16
but we still need to guarantee isolation between these transactions
但我们依然需要保证事务间的隔离性
03:19 - 03:23
So I think Andy briefly mentioned ,this idea
So，我觉得Andy之前应该简要提过了这个想法
3.23-3.26
there are pessimistic approaches and optimistic approaches
即悲观⽅案和乐观⽅案
03:26 - 03:27
today we're going to look at two phase locking
今天我们要去研究下两阶段锁
3.27-3.29
we're going to use locks in the system
我们会在系统中使⽤锁
03:30 - 03:31
this is a pessimistic approach
这是⼀种悲观⽅案
3.31-3.39
because basically you're gonna have to ask for permission from the system before every
operation
简单来讲，在执⾏任何操作前，你都得去让系统给你相应的权限
03:39 - 03:43
so before you can do a read or a write on a tuple
So，在你可以对⼀个tuple进⾏读写操作之前
3.43-3.46
you're gonna have to ask for a lock on that object
你必须先去获取该对象的锁
03:47 - 03:50
optimistic we will get optimistic stuff in the next couple lectures
我们会在下两节课的时候，讨论下乐观⽅案中的⼀些东⻄
3.50-3.53
but today it's all about pessimism with locks
但今天我们所讨论的东⻄都是和悲观锁相关的
03:56 - 04:01
so this is just a kind of just a high-level what I was just describing
So，这⾥我以⼀种⾼级层⾯的⽅式来描述我所讲的东⻄
04:03 - 04:06 ！！！
an example of before we can do a R(A)
在这个例⼦中，在我们能执⾏R(A)之前
4.06-4.10
we're gonna go to a lock manager, and say I want to lock on a
我们会先去lock管理器那边，和它说：我想要获取关于A的锁
4.10-4.16
this lock managers sort of your central authority on on whether you're allowed to access
a tuple or not
该lock管理器会去判断你是否有权去访问这个tuple
04:16 - 04:18
it maintains metadata about who holds locks
它维护了⼀些（关于谁持有着锁的）元数据
4.18-4.23
and and enforces the the lock protocol in the system
并在系统中强制使⽤锁协议
04:24 - 04:25
so T1's gonna begin
So，当T1开始执⾏的时候
4.25-4.28
it's going to request a lock from the lock manager on a
它会从lock管理器那⾥请求⼀把关于A的锁
04:29 - 04:31
it gets the lock as no one else holds it
因为没有⼈拿着这把锁，所以它会拿到这把锁
4.31-4.33
t2 begins
接着，T2开始执⾏
4.33-4.35
let's imagine we're in a single threaded environments
想象⼀下，假设我们处于⼀个单线程环境下
04:35 - 04:40
so we're only executing one of these transactions，we're only making progress on one
of these transactions at a time
So，同⼀时间，我们只会执⾏其中⼀个事务
04:40 - 04:42
so t1 begins gets the lock on a
So，T1开始执⾏，并获得A对应的锁
4.42-4.44
we switch to t2
接着，我们切换到T2
4.44-4.45
it begins
T2开始执⾏
4.45-4.46
it wants the lock on a
它想去获取A所对应的那把锁
4.46-4.48
because it's eventually going to do a read and a write down here
因为它最终要在这⾥执⾏R(A)和W(A)
04:49 - 04:51
and it's denied by the lock manager
但它被lock管理器拒绝了
4.51-4.52
because t1 already holds that lock
因为T1已经拿着这把锁了
04:55 - 4.58
the only thing t2 can do here is stall
T2唯⼀能做的事情就是等待
4.58-5.02
what the behavior is is is kind of up to the implementation
具体⾏为取决于实现
05:02 - 05:05
but there's gonna have to be some sort of stall
但这⾥还是得等待⼀会⼉
5.05-5.06
because you can't get the lock that you want
因为你没法拿到你想要的那把锁
05:08 - 05:11
t1 proceeds does its write, does its read, releases its lock
T1执⾏了它的写操作，读操作，然后释放了这把锁
5.11-5.15
the lock managers now going to basically tell t2
接着，lock管理器就会去告诉T2
05:15 - 05:16
you can get the lock that you want on a
你可以去获取你想要的（A所对应的）那把锁
5.16-5.18
it's gonna grant it
lock管理器会将这把锁颁发给T2
5.18-5.20
T2 is going to do it it needs to do
T2就会去做它需要做的事情
05:21 - 05:22
and then it's going to release the lock
接着，它就会释放掉这把锁
05:23 - 05:23
So conceptually
So，从概念上来讲
5.23-5.26
that's how we're gonna use locking in the system
这就是我们在系统中使⽤锁的⽅式
5.26-5.28
there's a little bit more nuance to it than that
除此之外，还有⼀些细微的差别
5.28-5.33
and we'll go through that through the rest of the lecture
我们会在这节课剩下的时间⾥对它进⾏探索
05:33 - 05:34
make sense
你们懂了吗？
5.34-5.35
we're good
看起来还⾏
05:37 - 05:40
so today we're gonna look at the lock types first
So，今天我们⾸先要看的是锁的类型
5.40-5.42
we're gonna start with two basic lock types
我们会从两个基本的锁类型开始讲起
05:43 - 05:49
and then we're gonna get into our first proper ,concurrency control protocol two-phase
locking
然后，我们会去看下我们第⼀种并发控制协议，即两阶段锁
05:49 - 05:55
we're going to talk about how we reason about deadlocks ,and how we're gonna solve
that problem
我们会去讨论下，我们该如何推断出死锁原因，以及该如何解决它
05:56 - 06:00
and then we're gonna introduce the notion of hierarchical locking
然后，我们会介绍下hierarchical locking（层级锁）的概念
6.00-6.04
which is going to allow us to take fewer locks in the system to be a little bit more
efficient about how we use locks
通过它，我们可以减少在系统中使⽤锁的数量，以此来让我们更⾼效地使⽤锁
06:05 - 06:10
and then the last thing that actually is a mistake ,we're not gonna get to isolation levels
today,
其实最后⼀点写错了，今天我们不会去讨论隔离性⽅⾯的东⻄
6.10-6.11
he did make it last year
这是Andy去年写的ppt
6.11-6.14
and they're not in these slides anymore
它们以后不会出现在这些幻灯⽚中了
06:14 - 06:17
so we'll get to isolation levels I think we'll handle them in the next lecture
So，我觉得我们会在下节课的时候讲隔离级别
06:19 - 06:27
so I think you've seen this slide before Andy presented this this is from work by Goetz
Graefe
So，我觉得你们之前就在Andy展示过的幻灯⽚上看过这个了。它是来⾃于Goetz Graefe所写的
⼀篇paper
06:28 - 06:33
he showed it when you were talking about protecting concurrent data structures with
latches
当我们在讨论⽤来保护并发数据结构的latch时，Andy向我们展示了这个
06:33 - 06:36
so I think concurrent B+tree indexes, hash indexes things like that
So，我所认为的并发数据结构是B+ Tree索引，hash索引之类的东⻄
06:38 - 06:42
and I'm pretty sure this slide exists just to get Dave Anderson to stop making fun of us
我⾮常确信，Andy把这张图放在这⾥的原因是为了防⽌David Anderson（Oracle⾸席⼯程师）
来吐槽我们
06:42 - 06:45
because he says database people are weird for calling locks latches and
因为他表示搞数据库开发的那批⼈对于lock和latch这两种称呼感到⾮常奇怪
06:46 - 06.48
But they are distinct terms in our world
但在我们的世界中，它们是两个不同的术语
6.48-7.00
before he was talking about and he was talking about like I said laches to protect
threads from kind of trashing the the memory of your concurrent data structures
我说过latch是⽤来保护线程所访问的当前数据结构所在的内存不被瞎嚯嚯
避免浪费你并发数据结构中的内存
07:00 - 07:02
Today we're talking about locks
今天我们要讨论的是lock
7.02-7.04
which are protecting logical constructs in the database
它是⽤来保护数据库中的逻辑结构
07:04 - 07:07
so things like databases tables tuples
⽐如数据库表中的那些tuple
07:08 - 07:12
they're designed to protect transactions from conflicting with each other
它们旨在防⽌事务彼此间发⽣冲突
07:12 - 07:15
and probably the the key distinguishing part is that
它们两者间关键区别在于
7.15-7.18
in with latches
通过使⽤latch
7.18-7.22
we avoided dead locks with programming discipline
我们避免了编程时遇到的死锁问题
07:22 - 07:27
we were writing the logic on how these latches were acquired with things like latch
grabbing in the B+ tree
我们会去编写如何在B+ Tree中获取latch的相关逻辑
7.27-7.32
we could reason about what the operations were doing
我们可以去诊断这些操作所做的事情
07:32 - 07:34
so we knew how to safely acquire latches in one order
So，我们知道该如何以某种顺序安全地获取这些latch
7.34-7.40
and then make sure we respected that order and release them in the correct order as
well to avoid deadlocks
然后，我们要确保我们遵守了这个执⾏顺序，并且以正确的顺序释放这些锁以避免死锁问题
07:40 - 07:42
with locks we can't do that
如果使⽤的是lock，那我们没法做到这点
7.42-7.46
,because we don't know what the what the transactions are gonna do ,what queries
they're gonna run
因为我们不知道这些事务要做什么事情，这些查询要⼲什么事情
07:46 - 07:54
so we need to be able to handle the clients issuing queries to the system ,that would
result in a deadlock
So，我们需要能够去处理client向系统所发起的（可能会引起死锁问题的）查询
7.54-7.56
and and we need to talk about like what are we gonna do then
我们需要去讨论我们应该如何处理它们
07:57 - 08:03
Because it's it's pretty simple to as well shown a demo a little bit later in the lecture ,it's
pretty easy to put the system into a deadlock
之后我会向你们展示⼀个demo，其实这很容易会让系统陷⼊死锁问题
08:06 - 08:06
yeah
08:10 - 08:10
so like I said
So，正如我说的
8.10-8.12
we'll start with two basic lock types
我们会从两个基本的锁类型开始讲起
8.12-8.15
we have shared locks and exclusive locks
我们有共享锁（Shared Lock）和独占锁（Exclusive Lock）
08:16 - 08:17
Shared locks are used for reads
共享锁是⽤来处理读操作的
8.17-8.19
exclusive locks are used for writes
独占锁是⽤来处理写操作的
8.19-8.26
these are kind of similar to the readwrite latches, I think that we're talked about in the
concurrent data structures
我觉得这就和我们之前讨论并发数据结构时所说的Read latch和Write Latch⾮常相似
08:26 - 08:28
The compatibility matrix kind of represents
这个兼容性表格表示
8.28-8.30
if you already have a shared latch
如果你已经有了⼀个某个对象所对应的shared latch
8.30-8.32
can you hand out more shared latches to that
你是否能发放更多该对象的shared latch呢？
8.32-8.33
yes
答案是Yes
08:34 - 08:38
exclusive latches are more or less incompatible with any other latch types
Exclusive Latch⽆法其他类型的latch相兼容
08:38 - 08:40
so you can't hand out multiple exclusive latches
So，你不能发放关于某个对象的多个exclusive latch
8.40-8.43
you can't hand out an exclusive latch to something that already has a shared latch
在某个对象已经有了⼀个shared latch的情况下，你不能再去发放该对象的exclusive latch
08:45 - 08:50
that's the basic compatibility of these latches
这就是这些latch的基本兼容性
08:54 - 08:56
are excuse me these these locks
抱歉，我要说的是lock，⽽不是latch
8.56-8.57
I shouldn't call them latches
我不应该将它们叫做latch
8.57-8.59
because Andy will get mad at me
因为Andy会宰了我的
09:01 - 09:05
so the basic semantics of how we're going to work with locks is
So，我们使⽤lock的基本语义是
9.05-9.06
as I was describing for with that example
我会结合案例来描述它们
09:07 - 09:10
you're gonna go to a lock manager and you're gonna say hey can I get a lock on this
object
你会找到lock管理器，并说：我能拿到这个对象的lock吗？
09:10 - 09:16
the lock manager is gonna decide based on its internal metadata whether you're allowed
to have that lock or not
lock管理器会基于它内部的元数据来决定你是否有权去拥有这个lock
09:17 - 09:19
and then it's up to the transaction to release the lock when it's done
当事务完成的时候，取决于该事务是否要去释放这个lock
09:20 - 09:32
The transaction managers or excuse me the lock managers ,not necessarily putting any
sort of constraints on how long necessarily you have that lock for
lock管理器不⼀定会对你持有该lock的时间⻓度有所限制
09:32 - 09:39
So it's up to the transaction to make sure they come back release the locks when they're
done with it
So，这取决于事务，我们要去确保当事务完成的时候，它们会回过头释放掉这个lock
9.39-9.39
and then it updates an internal metadata
接着，lock管理器就会去更新内部元数据
09:39 - 09:44
I don't think there's a there's a Andy's not doing a lock manager project this semester
我觉得，Andy这学期并没有让你们做lock管理器相关的project
9.44-9.45
we've done one in the past
我们之前做过⼀个
09:45 - 09:47
but like the basic implementation is
但它的基本实现是
9.47-9.49
there's an internal table
这⾥会有⼀张内部表
9.49-9.50
probably a hash table
它可能是⼀个hash table
9.50-9.55
that keeps track of all the possible locks and that are taken in the system
它⽤来跟踪系统中所使⽤的所有lock
09:55 - 9.57
and then as requests come in
当请求进来的时候
9.57-9.58
you put them into a queue
你会将请求放在⼀个队列中
9.58-9.59
you process them off the queue
你会处理队列中的这些请求
9.59-10.01
and you go forward from there
你可以从中学到⼀些东⻄
10:01- 10:05
so it's a cool project
So，这是⼀个很Cool的project
10.05-10.06
,but I don't think you're doing one this year
但我不觉得你们今年会做这个project
10:09 - 10:17
so let's look at an example with these shared exclusive locks that we defined before
So，我们来看个例⼦，它⾥⾯涉及了我们之前定义的Shared Lock和Exclusive Lock
10:18 - 10:18
so t1 begins
So，T1开始执⾏
10.18-10.21
it wants to do both a read and a W(A)
它想对A进⾏读和写操作
10:21 - 10:23
so it's going to go straight for the exclusive lock
So，它会直接去使⽤exclusive lock
10:23 - 10:24
so it's going to go to the lock manager,
So，它会找到lock管理器，并说
10.24-10.27
give me the exclusive lock
请给我A所对应的exclusive lock
10.27-10.29
lock managers like sure no one else has a lock on a
lock管理器表示现在没有⼈拿着A所对应的exclusive lock
10:31 - 10:32
it's all yours
它是你的了
10:33 - 10:38
t1 completes the operations it needs to do on on tuple a
T1完成了它需要对tuple A所做的操作
10:38- 10:39
releases the lock
它会将lock释放
10.39-10.40
,because it's done,
因为它完事了
10.40-10.43
t2 comes along and says I want to do a W(A)
接着，T2开始执⾏，它表示，它想对A进⾏写操作
10:44 - 10:45
so it wants the exclusive lock now
So，它现在想去获取A对应的那个exclusive lock
10.45-10.48
lock managers like sure no one's got that lock
lock管理器表示现在没⼈拿着这个lock
10.48-10.48
it's all yours
它是你的了
10.48-10.50
do whatever you want
拿着它去⼲你想⼲的事情吧
10:50 - 10:51
it does its write
T2会去执⾏W(A)
10:51 - 10:52
it unlocks a
接着，T2释放了A对应的这个exclusive lock
10.52-10.55
and then t1 wants to come back and just do a read
接着，T1想去读取A的内容
10:56 - 10.57
so we only need a shared lock
So，我们只需要⼀个shared lock即可
10.57-11.01
once again ask the lock manager, give me the lock
我们会再次找到lock管理器，并让它给我们这个shared lock
11.01-11.02
does its operation
执⾏它的操作
11.02-11.03
releases the lock
并释放这个lock
11:03 - 11:04 ！！
so as we described in the last slide
So，正如我们上⼀张幻灯⽚所说的那样
11.04-11.08
transactions are responsible for for locking and unlocking
事务负责去获取和释放锁
11:08 - 11:13
the lock managers just kind of here to kind of direct traffic and make sure everyone's
doing what they're supposed to be doing
lock管理器负责分发这些lock来确保所有⼈都在做它们应该做的事情
11:15 - 11:19
does anything jump out as a problem with this schedule
对于这个schedule有什么问题吗？
11.19-11.21
what's up
这是怎么回事呢？
11:22 - 11:23
right it's not isolated
这⾥并没有隔离
11.23-11.25
so in particular
So，特别是
11.25-11.28
when t1 at the end does it does another read
T1在最后⼜对A进⾏了另⼀次读取
11:28 - 11:30
it's it's getting an unrepeatable read
它会遇上不可重复读的情况
11.30-11.32
it read tuple a it did a W(A)
它先读取了A，再对A进⾏写⼊操作
11.32-11.35
but then it goes back and it R(A)
接着，它⼜回过头来，再读取了A
11.35-11.37
and it's actually seeing the the the value that t2 wrote
实际上，它看到了T2所写⼊的值
11:37 - 11:40
so we have an unrepeatable read， anomaly we can't have that
So，我们会遇上不可重复读的情况，这是我们不想拥有的异常
11:41 - 11:45
so we're gonna need to be a little bit smarter with with with what we do with our locks
So，我们需要更加巧妙地去使⽤我们的lock
11:45 - 11:51
we're going to need a little bit more discipline and a protocol applied to to what we're
doing here
我们需要些更多的规范以及⼀个适⽤于我们所做东⻄的协议
11:54 - 11.57
right so Andy added one more cool animation to show
So，Andy这⾥⼜添加了⼀个更Cool的动画
11.57-11.58
this is a problem
这就是这⾥存在的问题
11.58-12.00
this is here's your here's your unrepeatable read
这⾥发⽣了不可重复读的情况
12:02 - 12:05
so we're going to use is is a protocol called two-phase locking
So，这⾥我们要使⽤的协议叫做两阶段锁
12:06 - 12:14
And it's gonna allow the database system to hand out locks in a manner that always
guarantees conflict serializable schedules
它允许数据库系统始终以保证Conflict Serializable schedule的情况下来分发lock
12:14 - 12:15
this is a big deal
这很重要
12.15-12.20
because now we don't have to try to limit the parallelism in the system
因为我们现在⽆须去尝试限制系统中的并⾏性
12.020-12.22
we can try to run multiple transactions at the same time
我们可以试着在同⼀时间执⾏多个事务
12:24 - 12:31
and we don't need to know what the transactions are gonna do ahead of time to be able
to decide, if they're conflict serializable where the system can run
我们⽆须提前知道这些事务会去做什么，以此来判断该系统中所执⾏的这些事务是否是Conflict
Serializable的
12:31 - 12:32
we can do operations
我们可以执⾏这些操作
12.32-12.41
and we can hopefully get high throughput on transactions ,without generating
unserializable schedules or violating our isolation requirements
在不⽣成那些unserializable schedule或者违反我们隔离性要求的情况下，我们希望获得事务⽅
⾯的⾼吞吐量
12:42 - 12:49
this is all work that came out of IBM in mid 70s for the system R project
这些都是IBM在上世纪70年代中期在System R中所得出的成果
12.49-12.50
it was led by Jim Gray
它是由Jim Gray所主导的
12.50-12.52
who later went on to win a Turing Award
他在之后获得了图灵奖
12:53 - 12:55
so this is pretty groundbreaking stuff,
So，这是个⾮常具有开创性的东⻄
12.55-12.56
this is at the time
在那个时候
12.56-12.59
they were building one of the first relational database management systems
他们构建出了第⼀个关系型数据库管理系统
12:59 - 13:02
so there was no textbook on how to do this stuff
So，当时并没有任何⼀本教科书讲如何实现这种东⻄
13:02 - 13:05
two-phase locking is what they came up with ,turns out it's a pretty good idea,
事实证明，他们所提出的两阶段锁是⼀个⾮常不错的想法
13.05-13.07
most systems use two phase locking now
当下⼤多数系统都使⽤了两阶段锁
13:12 - 13:17
so you're probably not surprised to see that two phase locking has two phases
So，你们可能不太会对两阶段锁有两个阶段⽽感到惊讶
13:17 - 13:20
there's the growing phase and then there's the shrinking phase
⼀个是Growing阶段，另⼀个是Shrinking阶段
13:20 - 13:22
so in the growing phase of a transaction
So，在事务的growing阶段中
13.22-13.25
it's allowed to acquire whatever Lock it needs
我们允许该事务去获取它需要的那个lock
13.25-13.28
,it goes to Lock manager gets everything that it needs
它会去跑到lock管理器那⾥获取它需要的所有东⻄
13:28 - 13:31
and then it performs all of its operations
接着，它会去执⾏它的所有操作
13:31- 13:33
and then the second it releases a lock
然后，它会去释放这个lock
13.33-13.35
tells the Lock manager I'm done with this lock
并告诉lock管理器，我⽤完这个lock了
13:36 - 13:37
the transaction is now in a shrinking Phase
现在，这个事务就会处于Shrinking阶段
13.37-13.40
it is no longer allowed to acquire anymore locks
我们不再允许它取获取更多的lock了
13:41 - 13:42
so in an example
So，我们会通过⼀个例⼦
13.42-13.47
we'll see how this how this helped us out how this prevents the anomalies, we're
concerned about
来看看它是如何帮助我们防⽌这些我们所关⼼的异常情况的
13:50 - 13:53
and I think yeah
13:53 - 13.55
so get another way to think about it is this this visualization
So，另⼀种思考它的⽅式是通过这种图来进⾏
13.55-13.57
x-axis is time
x轴所代表的是时间
13.57-13.59
this is the lifetime of a single transaction
它是单个事务的⼀⽣
13.59-14.01
y-axis is the number of locks held by that transaction
y轴代表的是该事务持有lock的数量
14:02 - 14:03
so in the growing phase
So，在growing阶段中
14.03-14.05
it can continue to accumulate as many locks as it needs
它可以去积累它所需要使⽤的lock的数量
14:06 - 14:07
the second it releases a lock
在第⼆阶段，它会去释放lock
14.07-14.09
it's gonna go into the shrinking phase you get no more locks
在shrinking阶段，它不再拥有任何lock
14:13 - 14:18
so this is this is an example of a violation of two-phase locking
So，这是⼀个违反了两阶段锁的例⼦
14:19 - 14:21
because the transaction released some locks and I went back and acquired some more,
因为这个事务释放了⼀部分lock，然后它⼜去获取了⼀些lock
14.21-14.23
We can't have that
我们不允许这种情况发⽣
14:25 - 14:29
yeah it it would cause the same sort of problems, we saw in the previous example
这会引起我们在上⼀个例⼦中所看到的相同问题
14.29-14.30
where we had an unrepeatable read
即不可重复读的情况
14.30-14.32
where you release the lock when they went back acquired a lock
当你释放掉lock后，你⼜回过头来获取⼀个lock
14:33 - 14:36
and and you get anomalies because of that
因为这个原因，你就会遇上异常情况（不可重复读）
14:39 - 14:42
so here's an example with two phase locking
So，这⾥有⼀个关于两阶段锁的例⼦
14:43 - 14:44
transaction one's gonna begin
T1开始执⾏
14.44-14.48
like before it needs an exclusive lock, because it wants to do both a read and a write on
the tuple
在它开始执⾏操作前，它需要去获取⼀个exclusive lock，因为它想对该tuple进⾏读和写操作
14:50 - 14:52
it could start with a shared lock and upgrade it
它⼀开始可以先使⽤⼀个shared lock，然后对其进⾏升级
14.52-14.53
there was a notion on an earlier slide of upgrading
在之前的幻灯⽚中有⼀个关于升级的概念
14:54 - 14.57
we'll talk about upgrading a little bit more later in the lecture ,
我们会在这节课稍后的时间⾥讨论下升级相关的事情
14.57-14.59
but we're gonna start for now with an exclusive lock
但我们现在会从⼀个exclusive lock开始讲起
14.59-15.02
goes the lock manager gets the lock
跑到lock管理器那⾥获得这个lock
15:03 - 15:06
t2 wants the exclusive lock
T2也想要A所对应的这个exclusive lock
15:07 - 15:08
It can't have it
它没法得到这个lock
15.08-15.09
because t1 still holds it
因为T1依然持有着这个lock
15:09 - 15:12
so we're gonna keep holding onto that lock till we're done with all of our operations
So，我们会⼀直拿着这个lock，直到我们执⾏完与它相关的所有操作
15:13 - 15:15
we're gonna do the extra read that we wanted in t1
在T1中，我们会去执⾏我们想做的另⼀次读操作
15.15-15.17
then we're gonna release the lock
接着，我们会释放掉这个lock
15:18 - 15:21
t2 has been stalled this whole time not able to make any progress
T2在这段时间内停滞住了，它⽆法执⾏任何操作
15.21-15.23
because it didn't get the lock on on a
因为它并没有获取到A对应的那把锁
15:24 - 15:28
lock managers gonna say ok t2 you get what you want, do you're write
接着，lock管理器表示：Ok，T2你可以去那你要的那个lock了，去执⾏你的写操作吧
15.28-15.3.3
and then t2 is gonna unlock and then commit
接着，当T2执⾏完的时候，它会释放掉锁，接着进⾏提交
15:40 - 15:41
So the great thing about two-phase locking is
So，两阶段锁中最棒的地⽅在于
15.41-15.43
if you follow this protocol,
如果你遵循这个协议
15.43-15.45
you will get conflict serializable schedules
你就会得到Conflict Serializable的schedule
15:47 - 15:50
The there get the dependency graphs are guaranteed to be acyclic
我们保证这些依赖图是cyclic的
这就保证了这个依赖图是acyclic的（即⽆环的）
15.50-15.52
this is great this is exactly what we want
这很棒，这就是我们想要的东⻄
15:53 - 15:55
it does have a slight problem though
它虽然还有点⼩问题
15.55-15.57
and that is cascading abort
即cascading abort（级联中⽌）
15:58 - 16:01
so we'll give an example on the next slide
So，我们会在下⼀个幻灯⽚中给出⼀个例⼦
16.01-16.02
but the idea is it can
但这⾥的思路是
16.02-16.07
,because two phase locking alone does not guarantee that you don't get dirty reads
因为单独使⽤两阶段锁并不保证你不会遇上脏读的情况
16:07 - 16:10
you can lead to cascading aborts
你会遇上cascading abort的情况
16:16 - 16:18
so this is the same schedule as before
So，这个schedule和前⼀个例⼦中的schedule⻓得⼀样
16:20 - 16:26
we're going to access 2 different tuples
我们要去访问2个不同的tuple
16:27 - 16:30
we're gonna get the exclusive lock on a, and the exclusive lock at B
我们会去分别获取A和B的exclusive lock
16.30-16.33
that's because all the way down here, we're gonna do operations on B
因为这⾥从上到下（T1），我们要对B进⾏操作
16:33 - 16:35
and we have to get all of our locks before we start unlocking anything
在我们开始释放锁前，我们必须拿到我们所需要的所有lock
16.35-16.36
because we're in two-phase locking
因为我们使⽤的是两阶段锁
16:37 - 16:40
so t1 does the operations it needs
So，T1执⾏了它所需要执⾏的操作
16.40-16.41
releases lock on a
它释放了A对应的lock
16.41-16.46
,t2 gets the lock on a ,does a read, and then also does a write
T2拿到了A对应的lock，它先对A进⾏读取，接着进⾏写⼊操作
16:49 - 16:51
and then t1 abort
接着，T1发⽣了中⽌的情况
16:51 - 16:53
but there's this problem now
但现在，这⾥有个问题
16.53-16.57
that t2 read a value that from t1
T2读取了⼀个来⾃T1的值
16:58 - 17:00
that is now not actually in the system
实际上，现在它并不存在于系统中
17.00-17.03
because the transaction aborted it didn't commit
因为这个事务被中⽌了，它并没有被提交
17:03 - 17:05
So we have this dependency now
So，现在我们的依赖是这样的
17.05-17.07
that because t1 aborted
因为T1被中⽌了
17.07-17.08
you now have to abort t2 as well
我们现在也必须将T2中⽌
17.08-17.11
because it read a value that isn't valid anymore
因为它读取的那个值并不再有效
17:11 - 17:16
so that's what we mean by by saying two-phase locking is susceptible to cascading
aborts
So，这就是为什么我们会说两阶段锁容易导致cascading aborts的原因所在了
17:19 - 17:23
this is the reason this is a problem is
说这是⼀个问题的原因在于
之所以强调这个问题
17.23-17.25
because you could be wasting a lot of work
因为你会浪费⼤量的努⼒
17:25 - 17:29
so t2 could have you know because it read a value in t1
你知道的，因为T2读取了T1中的某个值
17.29-17.31
,it could have done a bunch of operations on the system
它可能会使⽤这个值来对系统中的数据做⼀系列操作
17:31 - 17:34
and now because t2 has to abort as well
因为T2也得被中⽌
17.34-17.37
you're increasing the complexity of your rollback logic
这样你就增加了回滚逻辑的复杂性
17:37 - 17:39
more and more stuff needs to be rolled back in the system
系统中越来越多的东⻄需要被回滚
17.39-17.42
just because one transaction aborted it leads to another transaction abort
因为⼀个事务的中⽌会导致另⼀个事务的中⽌
17:43 - 17:44
you can kind of see how this could Domino through the system
这就是系统中的多⽶诺效应
17.44-17.45
if you have a bunch of transactions running
如果你在执⾏⼀系列事务
17.45-17.49
that are simultaneously reading values from each other
它们同时去读取彼此中的值
17.49-17.49
and then one of aborts
接着，其中⼀个事务中⽌了
17:53 - 17:55
so another thing worth pointing out is
So，值得指出的另⼀件事情是
17.55-17.59
this is a valid schedule under two-phase locking
这是在使⽤两阶段锁时的⼀个有效schedule
18:05 - 18:07
yeah it's basically kind of what I stated already
正如我之前陈述的那样
18.07-18.10
you can't let information from t1 leak to the outside world
你不能让T1中的信息泄露到外界
18.10-18.11
,because it aborted
因为它被中⽌了
18:11 - 18:13
but it would be a permissible schedule under two-phase locking
但这是处于两阶段锁下的⼀个合法的schedule
18:14 - 18:16
so we're gonna have to solve this somehow
So，我们需要通过某种⽅式来解决这个问题
18:19 - 18:21
and yeah like I said this is all wasted work
正如我说的，这都是些⽆⽤功
18.21-18.25
t2 could have done a bunch of complicated logic, and a bunch of more writes into the
system
T2已经执⾏了⼀堆复杂的逻辑，并对系统执⾏了⼀⼤堆写操作
18:25 - 18:26
And because we have to abort it
因为我们必须中⽌这个事务
18.26-18.27
we wasted a bunch of time
所以，我们也就浪费了⼤量的时间
18:33 - 18:37
so a couple other things about about two-phase locking that we want to point out
So，我们想指出关于两阶段锁的另外两件事情就是
18:37 - 18:42
there are schedules that are serializable that two phase locking actually won't allow
有些schedule是serializable的，但在两阶段锁中并不允许
18:42 - 18:49
two phase locking is a little bit more, I guess I'll say conservative or
我想说两阶段锁其实是有点保守
18:50 - 18:52
Yeah we'll use that word ,
Yeah，我们会使⽤保守这个词来形容它
18.52-18.58
because there are serializable schedules that two phase locking will try to will we would
not be allowed
因为有些Serializable的schedule在两阶段锁中是不允许出现的
18:59 - 19:00
and because of the locking
因为⽤到了锁
19.00-19.02
we're gonna limit the concurrency the system slightly
我们就会略微限制系统的并发性
19:03 - 19:04
as I mentioned
正如我提到过的
19.04-19.08
we have this problem with with dirty dirty reads that can lead to cascading aborts
当遇上脏读情况的时候，这可能会导致cascading aborts
19:08 - 19:16
we're gonna solve that with a modification to two phase locking called strong strict two
phase locking
我们会使⽤两阶段锁的变体来解决这个问题，它的名称叫做强严格两阶段锁（strong strict
two phase locking）
19.14-19.16
it's also called rigorous two phase locking
它也被叫做严格两阶段锁（rigorous two phase locking）
19:17 - 19:21
the terms are kind of used interchangeably, I think the textbook refers to both
这两个术语是可以互换使⽤的，我觉得教科书上这两个都⽤了
19:22 - 19:23
and we have this other problem
我们还有另⼀个问题
19.23-19.28
which is common with a lot of locking protocols that we can lead to dead locks
这也是很多锁协议常遇⻅的问题，即死锁
19:28 - 19:33
so we're gonna need to solve that problem with either a detection mechanism,
So，我们需要⼀种检测机制来解决这个问题
19.33-19.35
Well， we can detect when we enter into a deadlock State
当我们进⼊死锁状态的时候，我们可以检出这个问题
19.35-19.38
or some sort of extension of the protocol
或者，我们对协议进⾏某种扩展增强
19.38-19.42
where we prevent ourselves from ever being able to go into a deadlock state
以此防⽌我们进⼊死锁状态
19:42 - 19:46
so again going back to kind of what we did with laches with concurrent data structures
So，回过头来看我们之前在并发数据结构中所使⽤的latch
19:47 - 19:55
we make sure we acquire the locks in a very specific way that makes it, so that we can
guarantee we're never going to enter into a deadlock scenario
我们确保我们以某种特定的⽅式获取lock，这样我们就能保证我们永远不会陷⼊死锁的情况
===========================

17-02
20:06 - 20:07
so we're going to tackle the first 1 first ,
So，我们先来应对下第⼀个例⼦
20.07-20.10
we're going to talk about strong strict two-phase locking
我们要来讨论下强严格两阶段锁（SS2PL）
20:13 - 20:14
it's sort of a misnomer
这⾥有点⽤词不当
20.14-20.17
because the second phase doesn't really exist anymore
因为这⾥第⼆个阶段并不存在了
20:18 - 20:20
all strong strict two phase locking says is
强严格两阶段锁的意思是
20.20-20.24
you don't release any of your locks until the end of the transaction ,when you're going
to commit
当你执⾏完该事务，要提交该事务时，你才会去释放你的锁
20:25 - 20:27
the growing phase is exactly the same
这⾥的growing阶段和之前完全⼀样
20.27-20.29
you keep acquiring locks as you need them
根据需要，你去不断地获取锁
20:29 - 20:34
but you don't release any locks until commit time
直到你要提交事务的时候，你才会去释放这些锁
20:35 - 20:41
and this is going to allow us to prevent any unrepeatable or excuse me any dirty reads
from propagating across transactions
这可以防⽌我们遇上跨事务时所遇到的脏读问题
20.41-20.44
which is also going to solve the cascading aborts problem for us
这也会为我们解决cascading aborts问题
20:47 - 20:49
so yeah the figure is kind of updated
So，这张图确实被换过了
20.49-20.50
but as you can see like
但你们可以看到的是
20.50-20.51
the shrinking phase
在shrinking阶段中
20.51-20.57
wherever you want to define it as like the last lock you acquired is the start of the
shrinking phase
你获取最后⼀把锁的时间就是shrinking阶段开始的时间
20:58 - 20.59
but basically there is no shrinking phase
但简单来讲，这⾥没有shrinking阶段
20.59-21.02
everything gets released at once at the end of the transaction
所有的锁都会在事务结束的时候释放掉
21:05 - 21:05
yeah
21:08 - 21:13
and the the word strict does have a specific meaning in when we're talking about
concurrency control
当我们在讨论并发控制的时候，strict这个单词拥有特定的意义
21:13 - 21:14
it basically means
简单来讲，它的意思是
21.14-21.27
anything that you wrote none of your writes are going to be visible to to any other asset
any other area of the system, any other transactions things like that until you commit
直到你提交事务的时候，该事务所做的修改才会被系统中其他执⾏的事务所看到
21:27 - 21:28
so so in this context
So，在这个语境中
21.28-21.30
strict has a very specific meaning
strict有⼀个⾮常特别的意思
21.30-21.32
and like I said that
正如我所说的
21.32-21.34
solves our cascade cascading aborts problem
这解决了我们的cascading aborts问题
21:34 - 21:38
because no other transactions are gonna see values that aren't committed to the system
yet
因为没有任何事务会看到那些还未提交给系统的值
21:38 - 21:40
so they're only looking at committed data
So，他们看到的只会是这些提交后的数据
21.40-21.42
everyone's happy
所有⼈都很⾼兴
21:44 - 21:46
and and like I mentioned before
就像我之前提到过的
21.46-21.48
this simplifies your abort logic
这简化了你的中⽌逻辑
21.48-21.52
because aborted transactions only have to put back their values
因为那些中⽌的事务必须要将它们所操作的值变回原样
21:52 - 21:58
you don't need to worry about all these transactions in the system potentially reading
uncommitted data
这样的话，你就⽆须去担⼼系统中的这些事务会去读取那些未提交的值了
21:59 - 22:08
and then they each kind of have to store their own ,metadata almost or methods to be
able to roll back the the work that they've done
否则，它们就得保存它们⾃⼰的元数据，或者通过某种⽅法回滚它们之前所做的修改
22:08 - 22:12
The simplifies things a lot by not having to reason about multiple versions in the system
在不探究系统中数据多版本的情况下，这简化了太多东⻄
22:12 - 22:15
you only have one undo to do if you if you wrote a value
如果你只写⼊了⼀个值，那你也只需撤销它即可
22:19 - 22:22
so we're gonna look at a simple example
SO，我们来看个简单案例
22:23 - 22:25
andy owes his bookie money I guess
emmm，我猜Andy⽋了点赌债
22:26 - 22:29
so he's gonna move a hundred dollars to is to his bookies account
So，他会转100美⾦到他的博彩账户中去
22:29 - 22:32
and then the second transaction is just gonna gonna compute the sum
接着，T2会去计算总和
22:32 - 22:35
This echo command is is made up it's not a real statement
这个ECHO我们编造的⼀条命令，它并不是⼀条真正的命令
22.35-22.39
he just wants to demonstrate that you're reading these values out
他只是想去演示你们读取了这些值
22:40 - 22:42
we could have done something more complicated,
我们可以做些更为复杂的事情
22.42-22.45
but we want to keep the example fairly simple
但我们想让这个例⼦简单些
22:45 - 22:50
first we're gonna look at it with I think just basic locking， then two-phase locking, and
then strong strict 2 phase locking .
⾸先，我们会去看下基本的锁⽅案，接着是，两阶段锁，然后是强严格两阶段锁
22:51 - 22:56
so with the two locks that we defined at the beginning, and we're not if we're not using
two phase locking
So，我们先来看下不使⽤两阶段锁会是什么样⼦
22:57 - 23:02
we can see spoiler alert you're gonna get a you're gonna get a wrong output from this
你会得到⼀个错误的输出结果
23:03 - 23:05
So we're start with a thousand dollars in each account
So，在⼀开始的时候，这两个账户中分别都有1000美⾦
23:08 - 23:10
t1 already gets the exclusive lock does a read
T1已经拿到了A所对应的exclusive lock，并对A进⾏读取
23.10-23.14
because it needs to decrement his his balance by a hundred bucks
因为T1需要需要对他的银⾏存款减去100美⾦
23:16 - 23:17
t2 wants to get the shared lock
T2想去获取A对应的shared lock
23.17-23.19
because it's trying to compute the sum
因为T2要试着计算出总和
23.19-23.20
it can't get it
它没法获得这个lock
23:20 - 23:21
so it just starts waiting
So，它只能开始等待获取这个lock
23:22 - 23:26
t1 finishes his operation to decrement unlocks a
T1结束了它的操作，并释放了A对应的锁
23.26-23.27
at that time
与此同时
23.27-23.30
t2 gets the lock on a and performs its read
T2拿到了A对应的shared lock，并对A的值进⾏读取
23:31 - 23:32
And then unlocks it
接着，T2释放了锁
23.32-23.33
, because again we're not in two phase locking here
再说⼀遍，因为我们这⾥并没有使⽤两阶段锁
23:34 - 23:36
so you're free to acquire and release locks as you need them
So，根据你的需要，你可以⾃由地去获取和释放锁
23:39 - 23:41
it also t2 also gets the shared lock on B
T2也会去获得B对应的shared lock
23.41-23.45
, because it needs to do a read on that which leads t1 to stall
因为它需要去读取B的值，这会导致T1停下来
23:44 - 23:48
Because it can't do the operation or it can't access that tuple yet
因为T1⽆法执⾏该操作，或者说它⽆法访问该tuple
23:49 - 23:52
eventually t2 releases the lock
最终，T2释放了这把锁
23.52-23.54
t1 gets the lock on B
T1拿到了B对应的exclusive lock
23.54-23.58
finishes moving the money over to the bookies account unlocks commits
它将钱移动到博彩账户，接着释放锁并提交事务
23:59 - 24:02
and t2 gives us a wrong output
这⾥T2给了我们⼀个错误的输出结果
24.02-24.05
,because did it read an inconsistent state
因为它读取到了⼀个不⼀致的状态
24:05 - 24:09
It read part of the work that t1 had done
它读取到了T1已经完成的部分⼯作结果
24.09-24.12
and t1 leaked that information to the rest of the system
T1将该信息泄露到了系统的其他地⽅
24.12-24.14
,and said okay this bank account balances 900 bucks
并说：该银⾏账户中的余额是900美⾦
24:15 - 24:20
But it that hundred dollars was missing at that point when t2 came along and got the
locks that it needed
但当T2执⾏并获取它需要的lock时，这100美⾦消失了
24:22 - 24:23
so with two-phase locking
So，在两阶段锁中
24.23-24.29
the key thing to notice here is
这⾥要注意的关键在于
24.29-24.31
it starts the same,
它们在同⼀时间开始执⾏
24.31-24.35
t1 gets its exclusive lock on a ,performs the operation it needs
T1获取了A对应的exclusive lock，并执⾏了它需要执⾏的操作
24:35 - 24:37
But before it unlocks a
但在它释放A对应的这把锁之前
24.37-24.39
,which would put it into the shrinking phase
即在T1进⼊shrinking阶段之前
24:39 - 24:42
it acquires the lock it needs on B all the way down here
它去获取了它需要⽤到的B对应的exclusive lock
24:43 - 24:45
so it gets the exclusive lock on b
So，它拿到了B对应的exclusive lock
24.45-24.48
, t2 stuck waiting around waiting for the locks that it needs
T2原地等待获取它需要的那些lock
24:50 - 24:52
because this isn't strong strict two-phase locking
因为这⾥使⽤的并不是强严格两阶段锁
24:53 - 24:58
t1 actually unlocks ,it well yeah
实际上，T1释放了锁
24:59 - 25:00
if this were strong strict
如果这⾥使⽤的是强严格两阶段锁
25.00-25.02
it would be down here at commit time
它会到提交的时候再释放锁
25:02 - 25:06
so it dont unlocks a, finishes this operation on on object B
So，它不会释放A对应的锁，直到它对B的操作执⾏完毕
25:07 - 25:08
and then releases the locks
然后，它才会去释放锁
25.05-25.11
,and this actually gives us a correct output
实际上，这会给我们⼀个正确的输出结果
25:13 - 25:16
Same example with strong trick two-phase locking like I said
我们来看个相同的例⼦，这⾥使⽤的是强严格两阶段锁，正如我说的
25.16-25.19
the unlocking happens at the end right before commit,
释放锁的操作会在事务最后提交前执⾏
25.19-25.21
so yeah t1 gets its lock
So，T1拿到了锁
25:21 - 25:23
t2 has to wait the entire time
T2需要等待⼀整个T1事务执⾏时间（等到T1被提交时才⾏）
25:25 - 25:32
you can sort of see how strong strict two-phase locking is effectively forcing a serial
ordering for these transactions
你们可以看到强严格两阶段锁有效地强制了事务的有序执⾏
25:33 - 25:37
by basically acquiring all your locks ,holding on to them until you get to commit time
简单来讲，事务会去获取你所需要⽤到的所有锁，⼀直拿着这些锁，直到你提交该事务的时候
25:37 - 25:44
you're guaranteeing that that any of the operations that that t2 would have that would
conflict are going to be forced in a serial ordering
你会保证T2中所存在的任何会引起冲突的操作会被强制按照某种顺序执⾏
25:46 - 25:47
make sense
懂了吗？
25:51 - 25:52
I'll go with yes
我猜你们懂了
25:54 - 25:57
and then the correct output again as well
那么，正确的结果就是2000
25:57 - 26:03
so I think I think Andy showed this slide before in the universe of schedules
So，我相信Andy之前已经向你们展示过这个张图了
26:03 - 26:09
he showed Serial schedules ,conflict serializable schedules ,View serializable
他展示了serial schedule、Conflict Serializable Schedule、View Schedule
26.09-26.11
and then I don't know if he had cascading aborts in there
我不知道他有没有向你们展示这个cascading aborts
26:11 - 26:15
so this slide actually I think is he mentions it last year is actually incomplete
So，实际上我认为Andy去年提到的这个幻灯⽚是处于未完成状态
26.15-26.23
what he mentioned to show is where two-phase locking ,and strong strict two phase
locking live in this hierarchy
在这个层次结构图中，他想展示的是两阶段锁和强严格两阶段锁
26:23 - 26:27
and I'll see, if I can at least use the laser pointer
如果我能使⽤激光笔就好了
26.27-26.31
because a clicker doesn't seem to be doing anything ,nope
因为遥控器好像坏了
26:32 - 26:38
so two-phase locking is gonna live in kind of this area right here
So，两阶段锁所处的位置是在这个区域
26:39 - 26:41
it's guaranteed to generate conflict serializable schedules
它会保证⽣成Conflict Serializable的Schedule
26:42 - 26:44
but it's going to be susceptible to cascading aborts
但它也容易导致cascading aborts的情况发⽣
26:47 - 26:51
I'll see if we can get this slide updated for the ones that actually get published on the
site
如果这张幻灯⽚后续更新的话，那我会将它贴到⽹站上
26:51- 26:54
so we actually see better than just a laser pointer on the video
So，这要⽐我⽤激光笔在上⾯指来指去要来得好
26:54 - 26.56
But yeah two phase locking would be here
但总之，两阶段锁是在这个位置
26.56-26.57
and then inside of this box
它在这个⽅框⾥⾯
26.57-27.00
and a round serial
在Serial这个⽅框周围
27.00-27.01
you would have strong trick two-phase locking
我们会有强严格两阶段锁
27:02 - 27:04
because it's guaranteed not to have cascading aborts
因为它保证我们不会出现cascading aborts的情况
27.04-27.06
we get conflict serializable schedules
我们会得到Conflict Serializable的schedule
27.06-27.08
we're happy
我们会为此感到⾼兴
27.08-27.10
makes sense
懂了吗？
27:13 - 27:17
so now let's talk about the other problem with two-phase locking
So，我们现在来讨论下使⽤两阶段锁时遇到的另⼀个问题
27.17-27.19
which is that it leads to dead locks
它会导致死锁的出现
27.19-27.20
and like I mentioned before
正如我之前所提到的
27:20 - 27:23
there's a couple different ways we can try to solve this problem
我们可以通过两种不同的⽅式来试着解决死锁问题
27:23 - 27:31
we can be kind of lazy about it, and wait use a detection algorithm to to find a deadlock
我们可以对它进⾏懒处理，使⽤⼀种检测算法来发现死锁
27.31-27.33
or we can kind of be a little bit more proactive about things
或者，我们可以主动出击
27.33-27.35
and try to prevent them from ever happening in the first place
在死锁问题发⽣之前就防范于未然
27:43 - 27:44
so you've probably seen dead locks before
So，你们之前可能已经⻅过死锁了
27.44-27.49
it's a fairly common concept in computer systems
它是计算机系统中⼀个相当常⻅的概念
27:50 - 27:52
But we'll give a basic example anyway
但总之，这⾥我们会给出⼀个很基本的例⼦
27:52 - 27:55
so t1 wants an exclusive lock on a
So，T1想去获取A所对应的exclusive lock
27.55-27.58
lock managers like sure you can have that no one else has that lock
lock管理器表示你可以去拿这个lock，现在没有⼈拿着它
27:58 - 28:00
t2 gets the lock on B,
T2拿到了B所对应的shared lock
28.00-28.01
because no one else has that lock
因为没有⼈拿着它
28:02 - 28:03
now t2 says
现在T2表示
28.03-28.04
I want the lock on a
我想获取A对应的shared lock
28.04-28.07
lock managers like no you don't get that
lock管理器表示：No，你拿不到这个lock
28:07 - 28:10
but t2 is gonna sit around and wait for that lock
但T2会坐在原地等待获取这个lock
28.10-28.13
and t1 now wants the exclusive lock on B
T1现在想去获取B对应的exclusive lock
28:14 - 28:15
and it's gonna wait as well
它也会原地等待获取这个lock
28.15-28.16
we have a problem now
我们现在就遇上了⼀个问题
28:17 - 28:22
both these transactions are waiting for locks that the other transaction holds
这两个事务都在等待获取彼此⼿上的lock
28:22 - 28:23
so we need to break this somehow
SO，我们需要通过某种⽅式打破这种僵局
28:27 - 28:32
Yeah,nice animation we have a problem
我们摊上问题了
28:37 - 28:39
yeah so like I said
So，就像我说的
28.39-28.49
deadlocks are a when you have a dependency cycle between transactions with where
they're holding locks and
死锁其实就是事务间彼此依赖成环，它们都在等待对⾯释放它们所需要的锁
28:49 - 28:53
and we have a couple ways of dealing with them detection and prevention
我们有两种办法可以解决死锁问题，即检测和预防
28:58 - 29:00
so with deadlock detection
So，我们来讲下死锁检测
29.00-29.02
the systems gonna do with like a background thread
系统会使⽤⼀个后台线程来进⾏死锁检测
29:02 - 29:05
you're basically gonna look at the lock managers metadata
简单来讲，你会去查看lock管理器中的元数据
29.05-29.07
and you're gonna build a waits-for graph
你会去构建⼀个waits-for图
29:07 - 29:08
so idea is
So，这⾥的思路是
29.08-29.10
every node is it is a transaction
图中每⼀个节点就是⼀个事务
29.10-29.19
and every edge is pointing to another node that holds a lock that that transaction wants
每⼀条线会指向另⼀个节点，该节点持有着另⼀端那个节点想要获取的锁
29:19 - 29:20
this is all going to be done in the background
这些都会在后台完成
29.20-29.23
you can balance out how frequently this gets done
你可以去平衡下这些操作执⾏的频率
29.23-29.25
we'll talk about that in a minute
我们稍后会对它进⾏讨论
29:25 - 29:26
but the idea is
但这⾥的思路是
29.26-29.27
it's a background task
它是⼀个后台任务
29.27-29.30
that inspects the state of the lock manager
它会去检查lock管理器的状态
29.30-29.36
,and says hey are there any deadlocks use your favorite cycle detection algorithm
并说：hey，⽼兄，你⽤你喜欢的循环依赖检测算法是否找出了死锁？
29:36 - 29:41
And you have to decide what you're then gonna do with that deadlock
接着，你必须决定你接下来该如何处理这个找出的死锁
29:42 - 29:46
so let's look at a simple example of what these with these waits for graphs look like
So，我们来看个简单的例⼦，看看这些waits-for图是⻓啥样的
29:49 - 29:58
we'll start with T1 wants a shared lock that T2 already holds on holds an exclusive lock
for
T1想获取B所对应的⼀个shared lock，但T2已经拿到了B所对应的exclusive lock
29:58 - 30:01
so T1 gets an edge pointing to T2
So，T1会有⼀条指向T2的线
30:03 - 30:05
T2 is going to end up with an edge pointing to t3
T2最终会有⼀条指向T3的线
30.05-30.06
because as you can see here
因为，你们这⾥可以看到
30.06-30.09
it wants an exclusive lock that T3 already holds a shared lock on
T2想去获取B所对应的exclusive lock，但T3已经拿到了B所对应的shared lock
30:10 - 30:11
those are incompatible
它们是不兼容的
30.11-30.12
so we're just stuck waiting
So，我们只能进⾏等待了
30.12-30.15
,and then lastly T3 is gonna end up with an edge pointing to T1
在最后，T3会有⼀条指向T1的线
30:16 - 30:18
because it wants an exclusive lock that T 1 has a shared lock on
因为T3想获取A所对应的exclusive lock，但T1已经拿到了A所对应的shared lock
30:19 - 30:22
we have a deadlock
我们遇上了死锁
30:23 - 30:25
so we have to do something about this
So，我们必须对它做些什么
30.25-30.27
questions
有问题吗？
30:30 - 30:31
what's that
你说的是啥？
30:35 - 30:41
so deadlock handling is kind of simple
So，死锁处理有点简单
30.41-30.43
pick a victim, kill it
选择⼀个牺牲者（victim），⼲掉它，就像
30:44 - 30:46
you choose a transaction and you roll it back
你选择⼀个事务，然后将它回滚
30.46-30.51
how far you roll that back is a kind of implementation to find it's possible
回滚多少内容取决于具体实现
30:51 - 30:54
You don't and I think this is this is a later slide
你不需要去考虑这些，这个会在之后的幻灯⽚中出现
30:54 - 31:00
but you may not have to to abort the entire transaction ,may not have to undo all the
queries that it did
你可能⽆须中⽌整个事务，也⽆须去撤销所有查询已经做的事情
31:00 - 31:09
you maybe only you may only need to partially rollback some of the queries to release
the locks that you need to remove the deadlock , and make forward progress in the
system
你可能只需回滚部分查询来释放锁，以此移除死锁，并在系统中取得进展
31:11 - 31:14
The the last point here is basically saying that
简单来讲，此处最后⼀点讲的是
31.14-31.19 ！！！
you have a trade-off in the system with how frequently you're gonna build these waitsfor graphs
在系统中你得权衡下构建这些waits-for图的频率
31:19 - 31:22
if the way you're dealing with deadlocks is detection
如果你检测处理死锁的⽅式是使⽤检测
31:23 - 31:26
you have this background task it's building these graphs checking for deadlocks
你需要运⾏这个后台任务来构建这些图，以⽤于检测死锁
31:27 - 31:30
it's up to you how frequently you want that task done
这个任务的执⾏频率取决于你
31.30-31.32
you could do it every microsecond, if you want
如果你想的话，你可以每微秒都执⾏它
31:32 - 31:38
but you're gonna burn a bunch of CPU cycles constantly building these graphs ,and
potentially not finding any any deadlocks
但你可能会浪费CPU周期来构建这些图，并且你可能也检测不出什么死锁
31:39 - 31:41
so what you may want to reason about is
So，你可能想推断出的东⻄是
31:41 - 31:44
okay maybe I want to check for deadlocks less frequently
Ok，我想让检查死锁的频率变低⼀些
31:44 - 31:45
and if I do enter in a deadlock state
如果我陷⼊死锁的状态
31.45-31.50
you know how long do I want to make those transactions wait
我想让这些事务等待的时间有多⻓
31.50-31.57
what's an acceptable time out that I could sit in a deadlock state, without detecting it
right away
在不检测死锁的情况下，我陷⼊死锁状态的可接受时常是多少
31:57 - 32:00
so these are always going to be tunable parameters in your database system
So，这些都是你可以在你数据库系统中进⾏调整的参数
32:00 - 32:04
because different workloads are gonna manifest different deadlock behaviors
因为不同的workload会表现出不同的死锁⾏为
32:04 - 32:12
so we want to make sure, we're not being too aggressive, it may be fine just to leave the
system in a deadlock state for ten seconds even
So，我们想确保我们不会太过激进，让系统处于死锁状态10秒可能也不是什么⼤事
32:12 - 32:15
but it depends on what the responsiveness of the system needs to be
但这取决于系统的响应能⼒
32:21 - 32:23
so victim selection
So，我们来讲下Victim Selection
32.23-32.27
there's a lot of different things you can look at here
你可以在这⾥看到很多不同的东⻄
32.27-32.31
and certain systems get very elaborate with what they do
某些系统会⾮常详细地描述它们所做的事情
32:31 - 32:33
But there's all sorts of different heuristics you can look at
但你可以看到这⾥有各种不同的启发式规则
32:34 - 32:39
the first is look at look at the age of the transaction，when you're trying to find a victim
that you're going to kill
⾸先，当你要试着⼲掉某个victim（牺牲者）时，我们可以去看下时间戳最⼩的那个事务
32:39 - 32:41
Because at the end of the day you have this cycle ,you got to pick one
因为到最后，你会有⼀个cycle，你可以从中选⼀个事务来⼲掉
32:43 - 32:44
you can start with the timestamp
你可以从时间戳开始⼊⼿
32.44-32.50
, you can look about how much work it's done ,how many how many queries has it
executed ,how big progress is a
你可以去查看下它已经完成的⼯作量，或者它已经执⾏的查询数量
32.50-32.54
you don't know how close it is being done
你不知道它距离完成还有多久
32:54 - 32:56
but you can at least reason about how much work it's done
但⾄少你能推断出它已经完成了多少⼯作量
32:58 - 32:59
How many locks it already holds
接着就是，它⼿上已经拿了多少个lock
33:02 - 33:04
let's see
我们再来看看。。。
33.04-33.13
that's it's possible that you would have to look at the number of transactions, you have
to roll back that would be in the case of,if you have cascading abort
如果你遇上cascading abort问题的话，你得去看下你需要回滚的事务数量
33:13 - 33:14
I don't think I mentioned before
我不觉得我之前有提到过
33.14-33.17
you don't have to do strong strict two-phase locking
你不⼀定要去使⽤强严格两阶段锁
33.17-33.19
some systems may just do two-phase locking
某些系统可能就只是做到了两阶段锁
33.19-33.23
and live with the possibility of a cascading abort
并且它们有可能会遇上cascading abort的问题
33:23 - 33:27
again it's gonna be workload dependant
这取决于workload是什么
33:29 - 33:35
you can decide if the workload is not very susceptible to cascading aborts or dirty reads
如果这些workload并不容易导致cascading aborts或者脏读的情况
33:35 - 33:37
you can just say two-phase locking is fine
那你就能说，两阶段锁够⽤了
33.37-33.38
I can release my lock sooner
我可以以更快的速度去释放我的锁
33.38-33.40
that may result in higher throughput in the system
这可能会让系统的吞吐量变得更⾼
33:40 - 33:43
Again that's often gonna be something that that's configurable
我们通常可以通过配置某些选项来做到这点
33:43 - 34:43
yeah
请问
33.54-34.03
so we'll talk about a couple different ways to decide a little bit later on about about
which transaction gets killed
So，我们之后会去讨论两种不同的⽅式来决定哪个事务该被⼲掉
34:03 - 34:07
there there are a couple different solutions
我们有两种不同的⽅案可以做到这点
34.07-34.09
but the other one is
但另⼀点是
34:14 - 34:16
yeah this is typically going to be a combination of things
通常我们会将这些东⻄结合起来使⽤
34:16 - 34:21
it's not necessarily always going to be just the age of the transaction is going to be what
determines whether you get killed or not often
我们不⼀定总是根据时间戳来判断我们该杀死哪个事务
34:22 - 34:28
one of the biggest things is going to be the number of times you've already been killed
which is, yeah then the last one says there
最重要的⼀点，也就是这⾥最后⼀点所说的东⻄，即我们应该考虑某个事务已经被重启的次数
34:28 - 34:30
because you do want to make sure you make progress in the system
因为你想去确保你在系统中取得了⼀些进展
34.30-34.32
you need to prevent starvation for these transactions
你需要去防⽌这些事务可能会导致的starvation情况
34:34 - 34:40
and I'm not saying like any one of these is exactly what you're going to use to kill a
transaction
我并没有说你们⼀定要根据上⾯列出的东⻄来⼲掉⼀个事务
34:40 - 34:51
the commercial systems get rather elaborate and can build predictive models even to try
to figure out like ,which transaction they should try to kill and answer a deadlock
scenario based on all these different heuristics
商⽤数据库系统相当复杂，它们甚⾄构建了预测模型来试着弄清楚它们该⼲掉哪个事务，并基于
所有这些不同的启发式规则来解决死锁场景
34:53 - 34:54
so it's typically a combination
So，我们通常会将它们结合起来使⽤
34.54-34.58
it's not just the timestamp I guess is a long way of answering hopefully your question
我猜他们使⽤的不仅仅只是时间戳，希望我的回答对你的问题有所帮助
35:22 - 35:23
okay,so your question is
So，你的问题是
35.23-35.27
why would you, sorry I want to make sure I repeat back for the video
为了确保录制的视频没问题，我要重复下你的问题
35:27 - 35:27
your question is
你的问题是
35.27-35.32
why would you always want to kill ,it what scenarios would you want to kill the
transaction with the lowest timestamp always
在哪种场景下，我们总是想去⼲掉时间戳最⼩的那个事务
35:39 - 35:51
yeah I suspect it's it's still always going to depend on the workload , depending on
what's causing the deadlock ,what sort of a situation is causing it ,but
我猜这依然取决于workload是什么、还有引起死锁的原因，以及在什么场景下会引起死锁问题
35:53 - 35:59
yeah we'll formalize a little bit like in a few slides on what gets killed and and why
我们会通过⼀些幻灯⽚来正式讲下它，即哪些事务会被⼲掉，以及为什么会被⼲掉
35:59 - 36:05
but I think in the case of Postgres in the example
以PostgreSQL为例
36.05-36.08
we'll see the highest time stamp gets killed
时间戳最⼤的那些事务会被⼲掉
36:08 - 36:10
I think I think it's just it's just an example
这只是我举得⼀个例⼦
36.10-36.13
I'm just saying like one you're a stick you could look at.
我只是想表达的是，这是个你们要去看的例⼦
36:17 - 36:19
And like I mentioned before
就像我之前提到的
36.19-36.22
it's possible you don't need to abort the entire transaction
你可能不需要去中⽌整个事务
36:22 - 36:23
you could completely abort it
你可以将它完全中⽌
36.23-36.25
or you could do some sort of minimal abort
或者，你可以最⼩程度地中⽌它
36.25-36.29
where you only rollback the number of queries in that transaction
即仅回滚该事务中的个别查询所做的修改
36.29-36.30
that will allow you to release the deadlock
这会让你脱离死锁的情况
36:31 - 36:32
And make forward progress in the system
并且能让你在系统中取得进展
36:33 - 36:37
again this is something that's going to depend on the workload, how much work you're
throwing away
这取决于你的workload是什么，以及你要丢弃多少⼯作进度
36:38 - 36:42
and whether it just makes sense to have transactions resubmit all their queries
并让这些事务重新递交它们所有的查询这是否有意义
36:43 - 36:51
or if you can slowly unwind parts of it in order to to free the system up in the deadlock
and make forward progress
或者你可以缓慢地释放部分锁，以此来让系统脱离死锁，并取得⼀些进展
=============
36:56 - 36:58
let's see if we can get a demo working
我们来看个demo
37:15 - 37:16
pardon
稍等⼀下
37.16-37.19
my typing on this surface keyboard
我⽤surface的键盘打字⽐较慢
37:32 - 37:34
cool looks like it's working
Cool，看起来奏效了
37:37 - 37:38
so we'll start with MySQL
So，我们先从MySQL开始
37.38-373.43
we'll have two terminals open
这⾥我们开了两个terminal
37:43 - 37:48
We have a pretty basic table set up called transaction demo
这⾥我们有⼀个很简单的表，它叫做txn_demo
37.48-37.49
, that's horrible
这有点糟糕
37.49-37.51
you can't see what's happening there
你们没法看到这⾥发⽣了什么
37:51 - 37:52
But basically we have two tuples in it
但基本上来讲，这张表中我们有两个tuple
37.52-37.55
primary key ID one and two
主键是id，⾥⾯有两个值，即1和2
37.55-37.57
,and the values 100 and 200
val分别是100和200
37:57- 37.58
pretty simple
这⾥⾯的东⻄相当简单
37.58-38.00
we have two tuples
我们有两个tuple
38.00-38.03
this should be really easy to put to put us into a deadlock State
这应该很容易让我们进⼊死锁状态
38:04 - 38:04
so
请问
38:06 - 38:10
I have no idea which ones those are
我也不清楚它们哪个是哪个
38:17 - 38:19
I'm glad I was standing next to you we got that on tape
我很⾼兴我站在你旁边
38:27 - 38:28
producer one everyone
38:35 - 38:39
so we've got these these two tuples in our table transaction demo
So，在txn_demo中，我们有2个tuple
38:39 - 38:44
first thing we're gonna do is set our timeout here
⾸先我们要做的是设置我们的超时时间
38:48- 38:49
so like I was saying before
So，像我之前说的
38.49-38.52
you can adjust things like like how frequently you're gonna detect for deadlocks
你可以去调整下你检测死锁的频率
38:52 - 38:53
so in this case
So，在这个例⼦中
38.53-38.58
we're gonna try to change the the lock_wait_timeout here
我们会试着去修改innodb_lock_wait_timeout的值
38:59 - 39:08
InnoDB is the storage engine for MySQL as of I don't know MySQL five I think or
something like that
我记得InnodeDB是MySQL 5.x的存储引擎来着
39:08 -39:11
so the first terminal will begin a transaction
So，我们在第⼀个terminal中开始执⾏⼀个事务
39:12 - 39:18
the first thing we're gonna do is try to update the value of tuple one
我们⾸先要做的事情是，试着去更新tuple 1中的值
39:20 - 39:23
oh actually I missed a step
Oh，实际上，我漏了⼀个步骤
39:24 - 39:27
we need to explicitly tell MySQL
我们需要显式告诉MySQL
39:27 - 39:30
We want to run in the serializable isolation level
我们想在隔离级别为Serializable的情况下执⾏事务
39:30 - 39:33
so that's going to give us conflict serializable schedules
So，MySQL就会给我们Conflict Serializable的schedule
39:33 - 39:34
We haven't talked about isolation levels yet
我们⽬前还未讨论过隔离级别⽅⾯的东⻄
39.34-39.37
like I said I think that's going to be in the next lecture
我之前说过，我会在下节课的时候讲它
39:38 - 39:44
but we need to tell the system, we want serializable isolation level
但我们需要告诉系统，我们想要的隔离级别是Serializable的
39:49- 39.50
go back
回到之前
39.50-39.52
begin our transaction
开始执⾏我们的事务
39.52-40..00
and we're gonna like I said update the value on tuple one
假设，我要对tuple 1中的值进⾏更新
40:02 - 40:03
switch to our other terminal
切换到我们的另⼀个terminal
40:04 - 40:05
we're going to start a transaction
我们要开始执⾏⼀个事务
40.05-40.07
we're going to update the value on tuple two
我们要去更新tuple 2中的值

17-03
40:15 - 40:17
so so far no conflicts yet
So，⽬前为⽌，还没有什么冲突
40.17-40.19
t1 holds a lock on tuple 1
T1拿着tuple 1对应的锁
40.19-40.21
t2 holds a lock on tuple 2
T2拿着tuple 2对应的锁
40:22 - 40:24
we're gonna go back to transaction 1 here,
我们回到这⾥的T1
40.24-40.29
and we're gonna say okay I want to update the value on where IDs 2
我想更新id为2的tuple中的val值
40:29 - 40:30
and it just waits
它就会进⼊等待状态
40.30-40.32
all I can do is stall it's waiting for the lock
我所能做的就是原地等待获取这把锁
40:34 - 40:35
and then we can go back to t2
接着，我们回到T2这⾥
40.35-40.37
and say I want update the value on one
并说：我想对tuple 1中的值进⾏更新
40.37-40.39
, t1 holds that lock already
T1已经拿着tuple 1所对应的锁了
40.39-40.40
we should get a deadlock
我们现在应当是陷⼊死锁了
40:40 - 40:42
and sure enough
确实如此
40.42-40.44
we get a deadlock MySQL yieldat us rather quickly
MySQL迅速为我们⽣成了⼀个死锁错误
40.44-40.49
, not a ton of debugging information
⽽不是⼀⼤堆debug信息
40:49 - 40:53
But deadlock found while trying to get the lock ,try restarting the application
当MySQL试着去获取锁的时候，它发现其中存在着死锁的情况，它会试着重启事务（图中写的
是事务）
40:54 - 41:00
And you'll notice that t1 which was waiting for the lock on on value 2
你会注意到T1正在等待获取tuple 2对应的锁
41:01 - 41:04
as soon as it does the system detected a deadlock with t2
只要系统检测到该死锁与T2有关
41.04-41.06
it killed that transaction
它就会⼲掉T2
41.06-41.09
t1 got the lock and made the progress that it need
T1就会拿到这把锁，并执⾏它需要执⾏的操作
41:21 - 41:24
what do you mean why there was no I there was no isolation
你所说的没有隔离性是什么意思
41:28 - 41:28
we can check
我们可以来检查⼀下
41.28-41.32
so I'm just gonna kill ,but I'm gonna roll both of these back
So，我会⼲掉它俩，这⾥我将它们都进⾏回滚
41:35 - 41:39
and we'll begin, and
开始执⾏事务
41:41 - 41:44
we're gonna update the value in ID 1 ,
我们先更新id为1那个tuple中的值
41.44-41.53
we'll go down to t2 ,begin a transaction ,update the value or ID is 2
接着，我们跑到下⾯执⾏T2，我们来更新id为2的tuple中的值
41:53 - 41:59
and then we're gonna just do a select * from txn_demo in t1
接着，我们在T1中执⾏SELECT * from txn_demo;
42:01 - 42:06
ah so it can't get the latch or excuse me the lock
So，它没法拿到lock
42:07 - 42:10
And it's just gonna it's just gonna hang there
它在这⾥挂起了
42:14 - 42:15
if we do a rollback
如果我们回滚⼀下
42.15-42.20
we see that the value t2 was never written to the table
我们可以看到T2从未将值写⼊到表中
42.20-42.21
,because it didn't commit
因为T2并没有被提交
42:22 - 42:26
and t1 was able to make its forward progress by getting the shared lock ,cool
当T1得到这个shared lock的时候，它就能够去执⾏它需要执⾏的操作
42:27 - 42:27
good question
问的不错
42:32 - 42:36
yeah,yeah I mean in practice
我的意思是，在实战中
42:37 - 42:41
you're probably gonna see strong strict two-phase locking
你可能会看到强严格两阶段锁
42.41-42.46
because the system can't reason about whether it should sort of eagerly start releasing
locks
因为系统⽆法推断出是否应该⽴⻢释放锁
42:46 - 42:48
because it doesn't know what the client's gonna do next
因为它不知道client下⼀步要去做什么
42:49 - 42:50
so you could
So，你可以这么做
42.50-42.51
but I don't think any systems do this
但我不觉得有任何系统会这样做
42.51-42.55
you could speculate about starting to release locks early
你可以去早点释放锁
42:55 - 42.56
but you might get it wrong
但你可能会出错
42.56-42.59
we can't be wrong,
我们不能出错
42.59-43.05
like we have to make sure ,we guarantee these these isolation guarantees
我们得确保这些隔离性保证
43:10 - 43:13
Sure, well that's that's not actually true
Well，你说的并不完全对
43.13-43.15
so like like I said
So，正如我说的
43.15-43.18
we'll talk about isolation levels in the next lecture too
我们会在下节课的时候讨论隔离级别
43:18 - 43:22
there are scenarios where you may be willing to run with with lower isolation guarantees
在某些情况下，你可能愿意以较低的隔离级别去运⾏你的事务
43.22-43.26
and you can start to introduce certain anomalies back into the system
你可以开始将某些异常引⼊系统
43:26 - 43:28
if you are comfortable with them
如果你能够处理它们
43.28-43.32
or if at the application layer ,you have your own logic to reason about that sort of stuff
或者，如果在应⽤程序层，你能通过⾃⼰的逻辑去推断出这些东⻄
43:32 - 43:37
you can lower isolation guarantees, if it improves the performance of your system
如果这样做提⾼了你的系统性能，那你可以降低隔离级别
43:46 - 43:51
yeah strong so strong strict two-phase locking or rigorous two-phase locking
So，对于强严格两阶段锁来说
43:51 - 43:56
it`s one we need to use,if we want to guarantee, we don't get any dirty reads that could
result in cascading aborts as well
我们需要使⽤它来确保我们不会遇上任何脏读导致的cascading aborts问题
44:02 - 44:03
so that's MySQL
So，这就是MySQL中的情况
44.03-44.06
we can take a look at Postgres real fast
我们可以快速看下PostgreSQL中是怎么样的
44:09 - 44:14
and we'll do a similar demo
我们来做个类似的demo
44.14-44.17
Postgres there is one other cool thing we can do here
我们可以在PostgreSQL中做另⼀件很Cool的事情
44:18 - 44:19
so we're going to set the deadlock timeout to 10 seconds
So，我们将deadlock_timeout设置为10秒
44:23 - 44:28
the demo itself is is, let me just make sure I created this table
让我来看看我有没有创建这张表
44:35 - 44:42
Cool same table exists two values
Cool，PostgreSQL也有这张表
44.42-44.43 ！！！
with Postgres
在PostgreSQL中
44.43-44.50
we're going to begin each transaction by saying we want isolation level serializable
我们会在开始执⾏每个事务的时候，可以去设置该事务的隔离级别，这⾥我们设置为
Serializable
44:50 - 44:52
you can actually it's not not necessarily a session wide setting
实际上，你不⼀定要进⾏session级别的设置
44.52-44.57
you can actually add a transaction granularity define which isolation level you want to run
at
实际上，你可以像我这样（对事务粒度进⾏定义）对你每个想执⾏的事务单独定义隔离级别
44:58 - 45:03
and again I keep saying isolation levels, we'll talk about that in a future lecture
再说⼀遍，我们会在之后的课中讨论下隔离级别
45:08 - 45:09
t1 is going to begin
T1开始执⾏事务
45.09-45.11
,Oh already begin
Oh，我们已经输过BEGIN命令了
45.11-45.12
that's right
这才对
45:13 - 45:15
we're just gonna do the same operation
这⾥我们执⾏相同的操作
45:15 - 45:19
we're gonna update value for ID is 1
我们会对id为1的tuple的值进⾏更新
45:19 - 45:25
we're gonna go down here, do the same thing where value equals 2
我们对下⾯也执⾏相同的操作，我们对id为2的tuple的值进⾏更新
45.25-45.26
, go back to t1
我们回到T1这⾥
45.26-45.27
, try to update 2
我们来试着对tuple 2进⾏更新
45:27 - 45:30
we wait looking for the lock that we don't have yet
我们正等待获取我们还未获取到的那把锁
45:31 - 45:35
and then we're gonna force a deadlock by asking t2 to update the value related to 1
通过让T2去更新tuple 1中的值，我们强制遇上了死锁的情况
45:37 - 45:40
and there was a slight lag there
这⾥有些许延迟
45.40-45.41
, I don't know if you saw it
如果你看到的话，我也不清楚是什么原因
45.41-45.42
,but it compared to MySQL
但⽐起MySQL来说
45.42-45.45
which instantly it was like this is a deadlock,
这⾥有⼀个死锁
45.45-45.49
Postgres kind of waited a little bit before it was it yelled at us ,
在PostgreSQL向我们报告这个错误之前，PostgreSQL等待了⼀段时间
45.49-45.50
and said hey you have a deadlock in the system
并说：你的系统中出现了⼀个死锁
45:50 - 45:51
So like I said
So，正如我说的
45.51-45.57
these are tunable parameters you can adjust how aggressive the database systems
gonna be with looking for dead locks
这⾥有⼀些可调参数，你可以通过调整它们来改变数据库系统寻找死锁的主动性
45:57 - 46:00
Postgres gives us a lot more information
PostgreSQL给了我们⼤量的信息
46.00-46.07
it tells us exactly which process was waiting for what kind of lock held by another
transaction, which is another process
它告诉我们该进程正在等待获取另⼀个事务（这⾥是另⼀个进程）⼿上拿着的某种锁
46:10 - 46:15
Postgres I think this is this is a big reason and he loves referring to Postgres
我觉得这是Andy喜欢使⽤PostgreSQL举例的⼀个重要原因
46:15 - 46:18
because it's basically a text book implementation
简单来讲，因为PostgreSQL就是教科书式的模范实现
46.18-46.23
in the wording you get back out of the system is exactly what you would see out of a
database textbook
系统所返回的这些话和你在数据库教科书上看到的没有任何区别
46.23-46.27
and kind of the behavior that would help us kind of understand what's going on here
这种⾏为使得有助于我们理解这⾥发⽣了什么
46:29 - 46:31
there's one more thing we can try
这⾥还有另⼀个东⻄我们可以去试⼀下
46.31-46.35
,and getting low on time
时间有点不够了
46.35-46.37
, but I will do one more thing
但我还会带你们看另⼀个东⻄
46:39 - 46:41
so I'm going to roll both of these back
So，我先将它们回滚
46:48 - 46:51
I'm going to set the timeout to 20 seconds
我会将这⾥的超时时间设置为20秒
46.51-46.54
because there's one more thing we want to try to see
因为我们这⾥还想看另⼀个东⻄
47:03 - 47:10
let's see, if I can get one more terminal
我再开⼀个terminal好了
47:14 - 47:15
cool
Cool
47.15-47.19
hopefully this still plays it may be tough
希望这没啥问题，虽然有点艰难
47:28 - 47:30
The deadlock timeout do the same thing,
这⾥我们将deadlock_timeout也设置为20秒
47.30-47.37
begin transaction and serializable on to the terminals
SQL语句如图所示
47:37 - 47:42
this is going to be slight race against the deadlock detection algorithm
这⾥会使⽤⼀个死锁检测算法
47:44 - 47:53
so what I try to do here is is demonstrate some of the internal metadata that Postgres
presents to you
So，这⾥我想向你们演示的是PostgreSQL向你们展示的那些内部元数据
47:58 - 48:01
and how it's tracking these sorts of things do that
它是如何跟踪这些东⻄的呢
48:06 - 48:08
and did my team accession just died
我来看看我的terminal是不是挂了
48:14 - 48:14
it died
确实挂了
48:16 - 48:16
cool
Cool
48:20 - 48:21
this still have a connection
这⾥的连接还没断么？
48:22 - 48:23
No
它也断了
48.23-48.25
interesting
有趣
48.25-48.27
well, that's that demo
Well，这就是这个demo
48.27-48.27
cool
Cool
48.27-48.29
we're a long time anyway
我们花了很⻓⼀段时间
48:29 - 48:31
but the idea is
但这⾥的思路是
48.31-48.33
if we'd been able to put the system into a deadlock state
如果我们能够让系统进⼊死锁状态
48:33 - 48:35
I was going to query the catalog
我会去查询catalog
48.35-48.39
and it was gonna be able to show ,which transactions were holding locks
它能够显示出哪些事务持有着锁
48.39-48.40
which locks they're waiting on
它们正在等待哪些锁
48.40-48.44
which transactions and processes those belong to
这些锁属于哪些事务和进程
48:44 - 48:45
Postgres is great
PostgreSQL很棒
48:47 - 48:51
let's go back to This stuff
让我们回到这⾥
48:59 - 49:00
so like we talked about before
So，正如我们之前谈论过的
49.00-49.07
the alternative to doing a detection algorithm is to prevent yourself from other ever
going into a deadlock State in the first place
相对于使⽤检测算法，另⼀种备选⽅案是把防⽌⾃⼰陷⼊死锁状态放在⾸位
49:07 - 49:10
if we can come up with some sort of system that prevents this from happening
如果有些系统可以阻⽌死锁的发⽣
49:11 - 49:13
we don't never need to build waits for graphs
我们也就不再需要去构建waits-for图了
49.13-49.15
we don't need this background task that
我们也就不再需要这个后台任务了
49.15-49.20
that then needs to make decisions about,which process we're gonna kill ,and or which
transaction we're gonna kill
那么也就不再需要去决定我们该杀死哪个进程或事务了
49:22 - 49:27
and I suspect this is probably what MySQL was doing
我猜这可能是MySQL的做法
49.27-49.33
because MySQL immediately yelled at us that we had a deadlock or immediately
detected
因为MySQL会⽴⻢告诉我们，它在这⾥检测出了⼀个死锁
49:33 - 49:34
it didn't prevent the deadlock
它并不预防死锁
49.34-49.37
but it immediately detected it as opposed to the Postgres
但和PostgreSQL相⽐，它会⽴⻢检测出死锁
49.37-49.39
which kind of had a bit of a lag to it with the detection
⽐起MySQL，PostgreSQL在检测死锁上会有⼀些延迟
49:41 - 49:48
so a very simple way to do this is to assign priorities based on timestamp
So，⼀种很简单的做法就是根据时间戳来分配优先级
49:48 - 49:51
so older transactions are considered higher priority
So，那些较⽼的事务会拥有更⾼的优先级
49:51 - 49:54
and then you kind of have two different protocols you can follow
你可以使⽤两种不同的协议
49:54 - 49.56
you have this wait die system
你可以使⽤这种Wait-die⽅案
49.56-50.00
which basically just means old transactions wait for young transactions
简单来讲，这意味着⽼的事务会等待年轻的事务
50:00 - 50:03
so if the requesting transaction has a higher priority
So，如果requesting transaction具备更⾼的优先级
50.03-
it's gonna for a been a holding transaction
50:07 - 50:09
so holding transaction is younger than it
So，holding transaction要⽐它年轻
50:10 - 50:11
but the older transaction wants its lock
但这个年纪较⼤的事务想获取它⼿上的锁
50.11-50.16
then the requesting transaction is just gonna sit around and wait
那么，这个requesting transaction就会原地等待获取这把锁
50:17 - 50:20
otherwise the the requesting transaction is going to abort
否则，这个requesting transaction就会被中⽌
50.20-50.22
,the other system is called wound-wait
还有⼀种系统称之为Wound-Wait情况
50:22 - 50:24
you can think of it as young waits for the old
你可以将它想象为年轻⼈等待⽼年⼈(知秋注:PPT中写的wait die是⽼⼈等待年轻⼈，但此处
wound wait是假如是年轻⼈等⽼年⼈，且年轻⼈优先级⾼的话，⽼年⼈就中⽌了，主看优先
级，如果⽼年⼈优先级⾼，年轻⼈等待)
50.24-50.30
requesting transactions they have a higher priority than the holding transaction,
requesting transaction拥有⽐holding transaction更⾼的优先级
50:30- 50:31
the holding transaction aborts
holding transaction会被中⽌
50:31 - 50:32
so basically
So，简单来讲
50.32-50.36
the requesting transaction comes in steals your lock, and makes forward progress
requesting transaction开始执⾏的时候，会偷⾛你的锁，并去执⾏它的⼯作
50.36-50.39
alternatively the requesting transaction just wait
或者，requesting transaction会去等待
50:39 - 50:40
so this is probably confusing
So，这可能会让你们有点困惑
50.40-50.44
it's it's a little bit clearer, I think on an example on the next slide
我觉得你们看了下⼀张幻灯⽚后，你们就会对此更加清楚了
50:46 - 50:47
so we have these two scenarios
So，我们有这两种场景
50.47-50.50
these two schedules we want to look at
我们想去看下这两种schedule
50.50-50.51
we'll look at the first one first.
我们⾸先来看第⼀种
50.51-50.54
t1 and t2 t1 begins first
T1先开始执⾏
50:54 - 50:56
so t1 is gonna have the higher priority than t2
So，T1的优先级⽐T2⾼
50.56-50.59
but t2 gets the lock first
但T2先拿到锁
51:00 - 51:03
so t2 gets an exclusive lock on a
So，T2拿到了A对应的exclusive lock
51.03-51.05
,t1 wants the exclusive lock on a
T1也想拿到A对应的exclusive lock
51:06 - 51:08
it's the older transaction it has higher priority
它是较⽼的那个事务，它的优先级更⾼
51:09 - 51:10
so under wait-die
So，在Wait-Die⽅案下
51.10-51.12
T1 gonna wait for that lock
T1会等待获取这个锁
51.12-51.15
and under wound-wait
在Wound-Wait⽅案下
51.15-51.19
t1 is basically going to come in kill T2 steal it's lunch money
简单来讲，T1会去⼲掉T2，顺带偷⾛它的午餐费
51:19 - 51:22
And t2 has to restart
T2需要进⾏重启
51.22-51.31
or whatever it needs to do whatever the application needs to do with that applicate
transaction
应⽤程序需要对这个事务做些处理
51:31 - 51:31
In the second schedule
在第⼆种schedule中
51.31-51.36
t1 once again begins before t2
T1还是⽐T2先开始执⾏
51:36 - 51:37
so it has an older timestamp
So，它所拥有的时间戳较⽼
51.37-51.38
it's higher priority
它的优先级更⾼
51.38-51.40
but it got the lock first
但它会先拿到这个锁
51:40 - 51:42
t2 wants that lock
T2也想获取这把锁
51.42-51.43
under wait-die
在Wait-Die⽅案下
51:45 - 51:47
t2 is gonna abort
T2会被中⽌
51.47-51.49
and under wound-wait
在Wound-Wait的情况下
51.49-51.51
t2 is just gonna wait
T2就会在原地等待
51:51 - 51:53
so what these two policies are doing is
So，这两种策略所做的事情就是
51.53-52.03
they're basically defining the same sort of logic that we used for latching and concurrent
data structures
简单来讲，它们定义了我们在使⽤latch和并发数据结构时相同的逻辑
51:56 - 52:06
,where this concept of we only take latches in one direction
即我们只会沿着⼀个⽅向使⽤latch
52:06 - 52:09
and we release them in a discipline manner as well
我们也按规矩释放这些latch
52.09-52.14
,like if you can apply some sort of ordering to how you acquire your locks
如果你们能以某种顺序去获取你的lock
52.14-52.16
which is effectively what this is doing
这就会让它变得很⾼效
52:16 - 52:19
you you can avoid deadlocks entirely
你就可以完全避开死锁问题
52:19 - 52:23
so wait-dies basically saying
So，Wait-Die表示
52.23-52.28
okay we're gonna order our timestamps in one direction and how we hand out locks
Ok，我们会以时间戳的顺序来发放lock
52.28-52.30
and then in wound-wait it's basically just the opposite
Wound-Wait则相反
52:30 - 52:31
as long as we're consistent
只要我们保持⼀致
52.31-52.32
you can't mix these things
你就不能将这些东⻄混在⼀起
52.32-52.33
if you start mixing them
如果你将这些东⻄混在⼀起
52.33-52.36
,you're gonna get dead locks in why you're even doing this
那你就会遇上死锁问题
52:37 - 52:41
because then you would need a deadlock detection algorithm, and you you you didn't
solve any problems
那么，你就会需要使⽤⼀种死锁检测算法，并且你⽆法解决任何问题
52:49 - 52:49
So the question is
So，她的问题是
52.49-52.54
why is this called wound-wait as opposed to some sort of opposite of wait-die
为什么这个叫做Wound-Wait，以及还有与之相对应的Wait-Die
52:54- 52:55
I have no idea
我也不清楚
52.55-52.57
,I really don't like the naming of this
我不喜欢这种命名
52.57-52.58
I find it very confusing
我觉得它让我很困惑
53:00 - 53:01
yeah if you're confusing,
如果你也很困惑
53.01-53.03
but if yeah if you're confused by the naming
如果你对这种命名感到困惑
53:04 - 53:05
I I'm with you
其实我和你们是⼀样的
53.05-53.14
I think that's why Andy kind of adds this just sort of simplification of like old waits for
young or young waits for old
我觉得这就是Andy在这⾥放这两句话的原因了
53:15 - 53:20
because yeah wait-die wound wait it's it's a weird nomenclature
因为Wait-Die和Wound-Wait是种奇怪的术语
53:21 - 53:22
any other questions
还有其他问题吗？
53:27 - 53:29
so this was sort of what I was talking about before
So，这就是我之前谈论的东⻄
53:30 - 53:32
these schemes guarantee no deadlocks
这些⽅案保证系统中不会出现死锁
53.32-53.37
cuz you're basically enforcing locks being handed out in a single direction
简单来讲，因为你只会发放⼀个类型的lock
53.37-53.40
or locks even being able to be stolen in a single direction
同种类型的lock甚⾄可能会被偷
53:40 - 53:46
so if yeah ,we've talked about this already
我们已经讨论过这个了
53:46 - 53:47
so when a transaction restarts
So，当⼀个事务重启的时候
53.47-54.51
what would its new priority be
它的新优先级是多少？
53.51-53.53
anyone guess
有⼈猜⼀下吗？
53:55 - 53:56
what would its timestamp be
它的时间戳会是什么？
54:05 - 54:08
it's got to be the original, any guesses why
它的时间戳和原来⼀样，有⼈能猜下原因吗？
54:14 - 54.17
if you have a transaction you start
如果你开始执⾏⼀个事务
54.17-54.18
and then it gets killed by another transaction coming in
然后它被后来的事务给⼲掉了
54.18-54.22
let's say ,because it's priority will increase the older it is
假设因为它的age越⼤，它的权限越⾼
54.22-54.23
you want to maintain its age
你想去维护它的age
54:24 - 54:24
yeah
54:26 - 54:30
right so in that's right
So，你说的没错
54.30-54.32
in one word starvation
⽤⼀个词来解释就是starvation
54:32 - 54:35
we can't have we can't have transactions being starved
我们不能让事务陷⼊starvation的状态
54:35 - 54:36
So when you restart the transaction
So，当你重启事务的时候
54.36-54.38
we want to make sure ,it's still used with the same timestamp
我们想确保它依然使⽤的是和之前相同的时间戳
54.38-54.44
so that eventually with with which it which Eve which ever deadlock prevention ordering
we're going with
不管我们使⽤的是哪种⽅式去预防死锁
54:44 - 54:47
we want to make sure progress gets made at one point another the other
我们想确保事务在执⾏⽅⾯有所进展
54:51 - 54:53
so we have ten minutes
So，我们还剩⼗分钟
54.53-
so this is we'll see how far we get
So，这是我们⽬前所学到的内容
54:59 - 55:00
so far
到⽬前为⽌
55.00-55.02
this doesn't seem very efficient
这看起来似乎并不是特别⾼效
55.02-55.04
like what if we have a transaction that needs to update a billion tuples
如果我们有⼀个事务，它需要对⼗亿个tuple进⾏更新
55:05 - 55:07
we're gonna lock manager a billion times
我们的lock管理器就得发放10亿次锁
55.07-55.09
like going to the lock manager is not cheap
让lock管理器发放锁的成本并不低
55.09-55.10
you're not implementing one this semester
你们这学期并不会去实现lock管理器
55:10 - 55:12
but you can envision
但你可以想象得出
55.12-55.13
if you had to implement this in a system
如果你需要在⼀个系统中实现它
55:14 - 55:16
you're going to need data structures that are protected by latches
你就需要些由latch所包含的数据结构
55.16-55.18
it has to be concurrent
它需要⽀持并发
55:19 - 55:22
it's on the critical path of what every transaction is doing
每次事务都要去做我们所聊的这些锁管理⽅式（知秋注：每⼀条线程往往代表着⼀个事务的执
⾏）
55:23 - 55:25
we can't make all these trips to the lock manager
我们不可能将所有这些都交给lock管理器
55:26 - 55:28
so what we're going to try to do is
So，我们试着做的事情是
55.28-55.34
introduce some some sort of hierarchy ,or grant, or change the granularity ,or allow
different granularity of locks in the system
往系统中引⼊某种hierarchy，或者是使⽤不同粒度的lock
55:36 - 55:41
so we can apply locks to tuples, pages, tables
So，我们可以在tuple、page以及table上都可以使⽤锁
55:43 - 55:48
if you knew you needed to do a billion updates on a single table
如果你需要对⼀张表上10亿条tuple进⾏更新操作
55.48-55.52
maybe it makes sense to just ask for the single exclusive lock on the entire table
兴许，你只需要对整张表使⽤⼀个exclusive lock就可以了
55:52 - 55:54
you are going to prevent other transactions from accessing it
你要去防⽌其他事务访问这张表
55.54-55.56
,but maybe that's what you want to do
可能这就是你想⼲的事情
55:57 - 56:02
the goal is to reduce the number of total trips to the lock manager possible by using this
hierarchical model
我们的⽬标是通过这种hierarchical model减少访问lock管理器所操⼼事务锁的总数量
56:03 - 56:04
so to do that
So，为了做到这点
56.04-56.09
we're gonna have to introduce a few more lock types, and then this notion of a
hierarchy
我们需要引⼊⼀些锁类型，以及hierarchy的概念
56:12 - 56:12
so conceptually
So，从概念上来讲
56.12-56.13
like I was describing
正如我所描述的
56.13-56.17
you can now take locks at different levels in the system
你可以在系统的不同层⾯使⽤这些lock
56:17 - 56:19
So database can have multiple tables
So，数据库中可以有不同的表
56.19-56.22
different tables can have multiple tuples
不同的表中可以有多个tuple
56.22-56.24
and within different tuples you can have multiple attributes
在不同的表中，你会有多个属性
56:24 - 56:28
so you want to acquire the fewest number of locks possible to do the work that you
need to do
So，你想通过获取最少数量的lock来完成你需要做的⼯作
56:30 - 56:33
so if T 1 takes the lock on table 1
So，T1拿到了表1对应的lock
56:35 - 56:38
if it explicitly takes a lock on table 1
如果它以显式的⽅式对该表加锁
56.38-56.43
,it now implicitly locks everything below it in this tree
它现在就会以隐式的⽅式锁住这棵树下的所有东⻄
56:43 - 56:49
this trees again it's a slightly abstract concept concept
它是⼀种略微抽象的概念
56.49-56.50
this isn't like a B+ tree or something like that
它和B+ Tree之类的东⻄并不相同
56:50 - 56:56
it's just in the hierarchy of the database system of all the tables and tuples you've
inserted into the system
数据库系统以这种层次结构来表示你往它⾥⾯插⼊的那些表和tuple
56:57 - 57:01
it's sort of a conceptual hierarchy in the system
它是系统中的⼀种概念上的层次结构
57:04 - 57:09
so Andy's trying to get the balance of his shady off-shore bank account
So，Andy想试着获取他隐藏的海外银⾏账户中的余额
57:10 - 57:13
and he's giving me 1% interest at the same time cool
与此同时，他会给我1%的利息，Cool
57:18 - 57:25
this is sort of demonstrating in this this conceptual tree that we have ,what sort of locks
do we need to take
这⾥只是⽤来展示，在我们的概念树中，我们需要使⽤哪些lock
57:25 - 57:29
we need all sorts of different types of locks, we need exclusive locks
我们需要所有各种不同类型的lock，我们需要exclusive lock
57:29 - 57:33
because my bank account balance is changing
因为我的银⾏账户余额正在进⾏修改
57:34 - 57:36
Andy's gonna need shared locks
Andy则需要shared lock
57.36-57.39
and then there's this notion of an intention lock
接着，这⾥有⼀个关于intention lock的概念
57.39-57.42
which I think is defined on the next slide
我觉得它的定义是写在下⼀张幻灯⽚上的
57:42 - 57:45
you basically give hints in this tree
简单来讲，你会在这棵树上给出⼀些提示
57.45-57.51
you basically take intention locks at higher levels to give hints to other transactions
about, what you're doing in lower levels of the system
简单来讲，你会在树的较⾼层处使⽤intention lock，以此来提示其他事务你会在该系统的较低
层⾯做什么事情
57:51 - 57:54
that's gonna try to increase the the parallelism of the system
它会试着增加该系统的并⾏性
57:59 - 57.59
so like I said
So，正如我说的
57.59-58.03
an intention lock is is a is a hint other transactions
对于其他事务来说，intention lock是⼀种提示
58.03-58.06
and and it'll get clearer with it with an example
我向你们演示⼀个例⼦，你们就能明⽩它是做什么的
58:06 - 58:07
but the basic idea
但这⾥的基本思路是
58.07-58.09
like if you have an intention shared lock in this tree
如果你在这棵树上有⼀个intention shared lock
58:10 - 58:12
the subtree rooted at that node
⼦树的根节点就是在这个节点上
58.13-58.16
there is an explicit shared lock somewhere underneath that
该节点下⽅某处会有⼀个显式的shared lock
58:16 - 58:18
same thing with an intention exclusive lock
对于intention exclusive lock也是如此
58.18-58.24
somewhere in that subtree rooted at that in that node，there's an explicit exclusive lock
在⼦树根节点下⽅某处，会有⼀个显式的exclusive lock
58:28 - 58:31
we're gonna add three more lock types
我们会再添加3中锁类型
58.31-58.33
intention shared
第⼀种是Intention-Shared
58.33-58.35
which is like I described
就像我之前描述的
58:35 - 58:38
somewhere in the subtree rooted at that node ,there's an explicit shared lock
以该节点为根节点的⼦树下⽅某处会有⼀个显式的shared lock
58:39 - 58:40
Intention exclusive same idea
intention-exclusive也是如此
58.40-58.44
somewhere in that subtree there's an explicit exclusive lock
在该⼦树下⽅某处会有⼀个显式的exclusive lock
58:44 - 58:48
and then there's one kind of tricky one ,shared+intention-exclusive
接着，这⾥还有⼀种更为棘⼿的锁类型，即shared+intention-exclusive
58.48-58.53
this is an explicit shared lock on this node
在这个节点上有⼀个显式的shared lock
58.53-58.53
which means that
这意味着
58.53-58.57
so you have shared lock on everything below it in its subtree
So，在⼦树下⽅的所有东⻄上，你都会有⼀个与之对应的shared lock
58:57 - 59:03
and somewhere in that subtree ,you also have an explicit exclusive lock
在⼦树下⽅的某处地⽅。你也会有⼀个显式的exclusive lock
59:03 - 59:04
so you can imagine
So，你可以想象下
59.04-59.07
if you wanted to do a read on an entire table
如果你想对整表做⼀次读取
59.07-59.09
and then maybe update one value
接着，你可能去更新其中某个值
59.09-59.12
,you would get a shared intention exclusive on that table
你就会对该表使⽤⼀个shared+intention exclusive lock
59:12 - 59:13
because you're gonna take a shared lock on the entire table
因为你可以在整表上使⽤⼀个shared lock
59.13-59.17
and say I'm reading all the values of this tuple or of this table
并说：我正在读取该表中的所有值
59:18 - 59:19
but I'm only gonna update one value
但我只会去更新其中某个值
59:19 - 59:23
So you have an exclusive lock on one tuple further down
So，你会在某个tuple上使⽤exclusive lock
59.23-59.25
, it'll make more sense with with an actual example I think
我觉得使⽤⼀个实际案例来讲会更有意义
59:26 - 59:30
but are there any questions first example
但对于第⼀个例⼦你们有任何问题吗？
59:31 - 59:34
Our compatibility matrix gets a little bit more complicated
我们的Compatibility Matrix会变得有点复杂
59:37 - 59:42
not a lot to say about this other than I think the tree actually seeing an example is a little
bit more clear
与其去解释这个，我觉得⽤例⼦来进⾏讲解，你们会更加清楚
59:42 - 59:47
but basically the semantics are similar to to shared exclusive lock
但简单来讲，这些语义和shared/exclusive lock那张表上的语义很相似
59.47-59.52
compatibility just apply do it to a tree
我们只是以⼀棵树的形式来讲解compatibility
59:55 - 59.57
the LOCKING protocol is basically just saying
简单来讲，locking协议讲的内容是
59.57-59.58
in order to get a shared lock
为了获得⼀个shared lock
59.58-1.00.05
you have to hint at least in the parent node that you have an intention shared lock
你⾄少得在⽗节点处提示下，你有⼀个intention-shared lock
01:00:06 - 01:00:07
same thing with exclusive
对于exclusive lock也是如此
1.00.07-1.00.11
to get an exclusive ,intention exclusive, shared intention exclusive
为了获取⼀个exclusive lock或intention-exclusive lock或shared+intention-exclusive lock
01:00:11 - 01:00:14
You have to hold an intention exclusive on the parent node
你需要在⽗节点处加⼀把intention-exclusive lock
17-04
17-04
01:00:14 - 01:00:17
again let's let's do an example
我们来看个例⼦
1.00.17-1.00.19
because I think that's going to make things a little bit clearer we have five minutes
因为我觉得这样能让你们更明⽩这些东⻄，我们还剩5分钟左右的时间
01:00:21 - 01:00:23
very simple table
这⾥有⼀张⾮常简单的表
1.00.23-1.00.27
or a very simple example ,two levels, there's a table, there's a bunch of tuples
这是⼀个很简单的例⼦，它⾥⾯有⼀张表和⼀些tuple
01:00:30 - 01:00:33
we want to check Andy bank account
我们想去检查Andy的银⾏账户
01:00:33 - 01:00:35
he wants to do a read on tuple one
他想读取Tuple 1
01:00:35 - 01:00:40
so he he wants, he's gonna want just a shared lock on this one to do a read
这⾥他会在Tuple 1上加⼀个shared lock，以此来读取Tuple 1的内容
01:00:41 - 01:00:45
but we're gonna have to take an intention shared at the parent node first
但我们会先在⽗节点上加⼀个intention-shared lock
1.00.45-1.00.46
basically as a hint to say
这⾥会作为⼀个提示，即，
1.00.46-1.00.47
,hey below this node
在该节点下⾯
1.00.47-1.00.51
I'm gonna take an explicit shared lock
我会使⽤⼀个显式的shared lock
01:00:53 - 01:00:55
t2 comes along
接着，T2开始执⾏
1.00.55-1.00.59
we want to update my bank balance by one percent
我们想去更新我的银⾏存款（即存款值乘以1.01）
01:01:00 - 01:01:05
so we want an explicit exclusive lock on this tuple
So，我们想在这个tuple上加上⼀把显式的exclusive lock
01:01:08 - 01:01:11
so we're gonna try to get
01:01:14 - 01:01:18
yeah we get our intention exclusive lock on the parent node
我们打算在我们的⽗节点上加⼀把intention exclusive lock
1.01.18-1.01.20
and we get our exclusive lock on the individual tuple
我们在单个tuple上加上我们的exclusive lock
01:01:23 - 01:01:24
now things will get a little bit more interesting
这⾥所发⽣的事情就逐渐令我们感兴趣起来
1.01.24-1.01.28
I think t1 is basically doing the scenario I described before
我觉得T1这⾥所做的事情就是我之前所描述的那样
1.01.28-1.01.31
where you're going to do a bunch of reads, and then you're going to update one tuple
即进⾏⼤量读取，接着再去更新某个tuple
01:01:31 - 01:01:32
T2 is gonna read a single tuple
T2会去读取单个tuple
1.01.32-1.01.34
t3 is going to scan all of them
T3会对表中所有数据进⾏扫描
01:01:35 - 01:01:37
I apologize for going a little fast
抱歉，我讲的速度可能有点快
01:01:37 - 01:01:39
I realize this is probably a little confusing
我讲的可能会有点让你们感到困惑
1.01.39-1.01.42
but we're getting a long time
我们已经浪费了不少时间
01:01:43 - 01:01:46
so t1 like I said
So，正如我所说的
1.01.46-1.01.48
it wants to read all the tuples and do an update on one
T1想去读取所有的tuple，并对其中⼀个tuple进⾏更新
01:01:49 - 01:01:51
so it's gonna get a shared intention exclusive
So，它会去获取⼀个shared+intention-exclusive lock
1.01.51-1.01.52
this means
这意味着
1.01.52-1.01.55
I'm taking a shared lock on the entire table
我给整张表加了⼀个shared lock
01:01:55 - 01:01:58
so I can read all the attributes they're in all the tuples in this table
So，我可以读取该表中所有tuple中的所有属性
01:01:59 - 01:02:01
and the intention exclusive part means
intention-exclusive这部分的意思是
1.02.01-1.02.04
I'm gonna update at least one of these tuples down there
我⾄少会去更新下⽅其中⼀个tuple
01:02:08 - 01:02:09
in this case it's tuple n
在这个例⼦中，我们要更新的是Tuple n
1.02.09-1.12.12
so because this is shared intention exclusive
So，因为这⾥使⽤的是shared+intention-exclusive lock
01:02:13 - 01:02:15
all these tuples are implicitly locked in shared mode
我们会在所有tuple上隐式加上⼀个shared lock
01:02:16 - 01:02:19
And then this is the only one we actually have to take an explicit exclusive lock on,
此处是我们唯⼀需要显式加上exclusive lock的地⽅
1.02.19-1.02.21
because that's the only one being updated
因为这是我们唯⼀要更新的地⽅
01:02:22 - 01:02:24
t2 wants to read a single tuple
T2想去读取表中某个tuple
1.02.24-1.02.27
we're gonna need the shared lock on this guy,
我们需要⽤到tuple 1对应的那个shared lock
1.02.27-1.02.34
which means we need intention shared at this level
这意味着，我们需要在这⼀层使⽤intention-shared lock
01:02:34 - 01:02:35
that's all good we can do that
没问题，我们可以这么⼲
01:02:36 - 01:02:39
the last transaction is the one that's gonna have problems
在执⾏最后⼀个事务的时候，我们会遇上问题
01:02:39 - 01:02:41
it wants to do a read on all of them
它想对表中所有数据进⾏读取
1.02.41-1.02.49
it's gonna want to shared exclusive shared law ,excuse me explicit shared lock on the
table
它想对这张表显示使⽤shared lock
01:02:49 - 01:02:50
can't get that
它没法做到
1.02.50-1.02.54
because it's not going to be compatible with the shared intention exclusive
因为它⽆法与shared+intention-exclusive lock相兼容
01:02:54 - 01:02:59
because there's a write happening on lower in the table ,t3 has to wait
因为这张表中正在执⾏写操作，T3只能进⾏等待
01:02:59 - 01:03:05
so basically it wants this explicit shared lock on the table
So，简单来讲，它想去获取整张表的shared lock
1.03.05-1.03.06
can't have that all can do is wait
除了等待以外，它没有别的办法
01:03:29 - 01:03:30
so I may have gone too quickly
So，我讲得可能太快了
1.03.30-1.03.34
the the example operations changed when I got to this one with three transactions
当我在看这个例⼦中的三个事务时，⾥⾯的操作变了
01:03:35 - 01:03:39
this is no longer doing like the read Andy's bank balance out bump my account balance
by 1%
这不是Andy查他存款余额并给我1%利息那个例⼦了
01:03:39 - 01:03:43
T1's reading all of the tuples and then modifying one
T1会读取所有tuple，接着修改其中⼀个tuple
01:03:44 - 01:03:47
t2 was just doing a read on a single one
T2这⾥做的是对某个tuple进⾏读取
1.03.47-1.03.51
,and then t3 is the one that's trying to read the entire table
接着，T3会试着读取整张表
01:03:51 - 01:03:52
so yeah it's a different example
So，它是⼀个不同的案例
1.03.52-1.03.54
I'm sorry about that if I went kind of quickly
对此我表示抱歉，我讲得太快了
01:04:07 - 01:04:09
so in practice it seemed complicated
So，在实战中，它的情况更为复杂
1.04.09-1.04.10
, but it's actually pretty helpful
但实际上它⾮常有⽤
1.04.10-1.04.16
because you can reduce the number of locks that go or the number of trips to the lock
manager ,you you reduce the number of lock requests dramatically
因为你可以减少锁的数量，并且显著减少锁请求的数量
01:04:18 - 01:04:20
and like we mentioned before
就像我们之前提到的
1.04.20-1.04.22
there's this concept of lock escalation
这⾥有⼀个lock escalation（锁升级）的概念
01:04:22 - 01:04:24
so if you already have locks and shared mode
So，如果你的lock是shared模式
1.04.24-1.04.26
you want to bump them to exclusive locks
你想将它们升级为exclusive lock
1.04.26-1.04.28
because you've decided you want to do it write on the tuple
因为你决定你想对这个tuple执⾏写操作
01:04:28 - 01:04:28
You can do that
你可以这么做
1.04.28-1.04.29
once again
再说⼀遍
1.04.29-1.04.34
this is designed to reduce the number of trips the lock manager and also doesn't violate
two-phase locking
这是旨在减少lock管理器的⼯作量以及不违反两阶段锁
01:04:34 - 01:04:37
because you can upgrade your locks you don't actually release the lock
因为你可以在不释放锁的情况下，对锁进⾏升级
01:04:41 - 01:04:43
so in practice in real systems
So，在真正的系统中
1.04.03-1.04.46
you're not sitting there telling it which tuples to lock
你不会坐在那⾥并告诉系统该对哪个tuple上锁
01:04:47 - 01:04:48
you can give hints
你可以给出提示
1.04.48-1.04.48
like I said
正如我说的
1.04.48-1.04.53
if you know you're gonna do a bunch of operations on a table
如果你知道你要对⼀张表进⾏⼀系列操作
1.04.53-1.04.55
and you want to hold the lock the entire time
在执⾏的过程中，你想⼀直拿着锁
1.04.55-1.04.57
you can't explicitly lock the table
你不能显式锁住这张表
01:04:57 - 01:04.59
so it's not part of the SQL standard
So，这并不是SQL标准中的东⻄
1.04.59-1.05.05
,but here's examples on how to do it in like Postgres ,Oracle, DB2, SQL Server, MySQL
但这⾥有个例⼦，它告诉你该如何在PostgreSQL、Oracle、DB2、SQL Server以及MySQL中
做这些事情
01:05:07 - 01:05:10
these guys all use the nomenclature that we're learning about now
它们都使⽤了我们现在所学的术语
1.05.10-1.05.11
which is shared and exclusive
即shared和exclusive
01:05:11 - 01:05:12
And because MySQL loves to be different
因为MySQL就喜欢不⾛寻常路
1.05.12-1.05.14
they call them read and write locks
MySQL将它们称为读锁和写锁
1.05.14-1.05.16
because they want to be different
因为他们想要与众不同
01:05:18 - 01:05:20
there's also this notion of select for updates
这⾥还有⼀个Select .... For Update的概念
01:05:20 - 01:05:23
so if you're doing a read on a tuple that you eventually want to update
So，如果你读取了某个tuple，最终你想对其进⾏更新
1.05.23-1.05.24
you can give a hint to the database system that says
你可以给数据库系统⼀个暗示，并表示
1.05.24-1.05.28
look I know, because you're doing a read ,you're gonna request a shared lock
因为我知道你正在执⾏读操作，你会去请求⼀个shared lock
01:05:29 - 01:05:30
I'm gonna do a write later on
我之后会执⾏⼀次写操作
1.05.30-1.05.33
just take the exclusive lock now and hold it for me
现在，你可以帮我拿⼀个exclusive lock
01:05:33 - 01:05:39
so you can do select and add this for update
So，你可以在SELECT语句后⾯加⼀个FOR UPDATE
1.05.39-1.05.40
that basically tells the system
简单来讲，它会告诉系统
01:05:41 - 01:05:44
take the right lock or excuse me take the exclusive lock right now
现在去拿⼀个exclusive lock
01:05:45 - 01:05:48
and you can also tell it just to take a shared lock
你也可以去告诉它拿⼀个shared lock
1.05.48-1.05.49
,I don't know why you would ever do that,
我不清楚为什么有⼈会想这么做
1.05.49-1.05.52
because by default it probably should just take a shared lock if you're doing a read
因为默认情况下，如果你执⾏的是读操作，它可能拿的就是⼀个shared lock
01:05:57 - 01:05.57
to finish things up
总结⼀下
1.05.57-1.06.00
like the slide says
正如幻灯⽚所说的
1.06.00-1.06.02
it's used in almost every system out there
⼏乎所有的DBMS都⽤到了它
1.06.02-1.06.08
at least most most widely deployed to commercial systems SQL server ,MySQL,
Postgres
⾄少那些部署最多的商⽤系统都⽤到了它，⽐如SQL server、MySQL和PostgreSQL
01:06:08 - 01:06:11
two phase locking is is big deal
两阶段锁是很重要的⼀个东⻄
01:06:11 - 01:06:14
but it's also not too difficult to implement
但它实现起来也并不困难
1.06.14-1.06.15
and it gives us exactly what we want
它给了我们想要的东⻄
1.06.15-1.06.17
gives us our serializable schedules
它给了我们Serializable Schedule
01:06:18 - 01:06:22
we just have to be disciplined about whether we're gonna try to detect our deadlocks
and handle them
我们需要明确我们是否该试着去检测并处理死锁
1.06.22-1.06.27
or we're gonna try to prevent them entirely in the first place
或者，我们会试着将预防它们放在⾸位
01:06:27 - 01:06:34
next class I think it's going to be Dana talking to you guys about time stamp ordering
which is good
下节课的话，我觉得应该是Dana会带你们去看下以时间戳为顺序的并发控制，这个东⻄很不错



# Lec18 时间戳顺序并发控制

> https://www.bilibili.com/video/BV1Cp4y1C7dv?p=18
> https://www.bilibili.com/video/BV1ti4y197EG/?spm_id_from=333.788

2PL 是并发控制的一种实现，这是一种悲观的实现，在问题出现之前阻止问题的发生。存在的问题是控制的太严导致并发度降低。

而基于时间戳顺序的并发控制则是乐观的。大致流程是根据事务的时间戳来决定事务的执行顺序。

给每一个事物赋予一个时间戳，可以用系统时钟，逻辑计数器，混合（系统时钟加逻辑计数器）三种实现方式。

本文将介绍三种并发控制方法：基础的时间戳协议，乐观的基于时间戳顺序并发控制方法(OCC)，隔离级别。

基础的时间戳顺序并发控制方法：

在这种方法中，事物读写对象不加锁。

数据库中的每一个对象（一般来说就是一行数据，也就是 Tuple）都分别记录读写时间戳，例如读时间戳记录了上一个读该记录的事物序号，而写时间戳记录了上一个写该事务的序号。每一行数据后都记录有这两个信息。

每次事务执行操作的时候都要比较读写时间戳，宗旨是不能操纵未来的数据。

* 读的情况：

事务的读时间戳应当大于事务的写时间戳才可以读，否则回滚。以读取一个事务为例：一个时间戳为 5 的事务读取一条数据时发现该数据被时间戳为 6 的事务写过了，显然不合理，回滚。反之如果时间戳为 5 的事务读取数据的时候发现该数据是被时间戳为 3 的事务写过了，那么时间戳为 5 的事务可以读取该数据。当读取完毕后，接下来要更新这条数据的读时间戳，维持到最新。然后将数据本地备份，因为该数据后续可能要被别的事务更改。


* 写的情况：

如果当前事务的时间戳小于该数据的读时间戳或写时间戳，那么立刻回滚。因为不能操纵未来的数据。否则正常操纵该数据，也就是事务的时间戳均大于该数据的读写时间戳，然后保存到本地实现可重复读。

![20220324195319](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324195319.png)

一个优化的点：在上述例子中，因为 T2 写入 A 后 T1 再次写入 A 但 T1 的时间戳低于 T2 进而导致 T1 回滚，但此时 T1 写入与否对整个业务其实没有影响，不需要回滚。

这个优化叫做托马斯写规则，也就是当前事务的时间戳小于数据的读时间戳就回滚，但是小于该数据的写时间戳时事务可以继续执行，因为后续都会被写覆盖掉。

这种算法没有死锁，因为事务没有等待。但是可能造成饥饿，以为读写都可能被未来堵死。

T2 读取的数据是建立在 T1 写好的基础上。一旦数据崩溃 T1 撤销，此时 T2 就读取的数据就不是有效数据了。

如果确定事务冲突比较少并且存活时间比较短，那么可以确定这种无锁的方法很好。

解析下来还有一种很好的优化方法：OCC 。

OCC:

读的所有数据都保存在本地，但是修改的数据都不写入磁盘，等到事务真正提交的时候再比较。

1. 读：读取过的数据都复制走，为了可重复读。
2. 校验：和别的事物比较看有没有问题。
3. 写：写入。

一个 OCC 的例子：

![20220324211713](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324211713.png)

读取过的数据都复制走，为了可重复读。

校验的时候分配一个时间戳，保证序列化。校验分为向后校验和向前校验。

向后校验：

![20220324211958](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324211958.png)

向前校验，校验和未来事物交叠部分是否冲突：

![20220324212034](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324212034.png)

如果两个事务真的串行，那么不需要校验。

![20220324212227](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324212227.png)

Ti 在 Tj 写阶段之前提交。Ti 写和 Tj 读之间是空集。

> 没看懂

校验复杂，写入的时候需要锁表。

最终目的都是为了可串行化。

## 幻读

幻读：第二次读到了一个第一次读时不存在的东西，也就是中间数据发生了更新。

![20220324214222](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324214222.png)

2PL 不能阻止幻读，因为只能锁住现存的事务，无法控制新插入的事务。

幻读有三种解决方案：

1. 重新扫描：数据执行完后重新扫描一遍相关数据看有没有出现幻读。扫描了两遍性能低。
2. 谓词锁：Where 加锁，其中 Select 加共享锁，而 Update，Insert，Delete 加互斥锁。索引加锁禁止插入。

![20220324214927](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324214927.png)

间隙锁。

串行化是最高的隔离级别，但是性能受影响。

降低隔离的程度，提高性能，但是存在一系列的问题：

脏读：读为提交，读取的数据是另一个事务还未写入的数据。

不可重复读：两次读取的数据不一样。

幻读：两次读取数据后，数据变多了导致数据不一致。

1. 串行化，可重复读，没有幻读，没有脏读。
2. 可重复读，但是允许幻读。
3. 读已提交，有可能幻读，有可能不可重复读，
4. 所有的问题都有可能发生。

![20220324220733](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324220733.png)

隔离级别的分类：

![20220324220846](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324220846.png)

实现方式:

![20220324220949](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324220949.png)

大多数任务最高的隔离级别是没有必要的。

