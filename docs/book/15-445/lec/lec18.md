18-01
18 - Timestamp Ordering Concurrency Control (CMU
Databases Systems _ Fall 2019)
00:20 - 00:27
all right so last lecture, I think Matt covered two-phase locking
So，我相信Matt在上节课的时候已经给你们介绍了两阶段锁⽅⾯的内容
00:28 - 00:36
And two-phase locking is a mechanism that the database can use to essentially
generate serializable schedules at runtime
两阶段锁是⼀种机制，数据库可以通过它在运⾏时⽣成Serializable schedule
00:36 - 00:39
and it relies on locks to be able to do that
它依靠锁才能做到这些
00:39 - 00:43
today we're going to be talking about is a collection of protocols that don't rely on locks,
今天我们要讨论的是⼀些不依靠锁的协议
0.43-0.45
but instead rely on on timestamps
相反，它们依靠的是时间戳
00:47 - 00:47
at a high level
从⼀个⾼级层⾯来讲
0.47-0.50
maybe with a good way to think about this is that two phase locking
兴许，我们使⽤⼆阶段锁来思考它会是⼀种不错的⽅式
0.50-0.58
assumes that there's gonna be a lot of contention inside of the transactions that are
executing inside in the database
假设数据库中所执⾏的事务⾥⾯存在着⼤量的争抢情况
00:58 - 01:01
right so if there's a lot of contention
So，如果其中存在着⼤量的争抢情况
1.01-1.06
then it's obviously I've edges to be defensive and take a lot of locks
那么，很明显，我就会变得很保守，并且使⽤⼤量的锁
01:06 - 01:09
so anytime you want to read or write into into a database object
So，每当你想对某个数据库对象执⾏读或者写操作时
1.09-1.11
You acquire these locks
你就会去获取这些锁
01:12 - 01:12
so in that sense
So，在这种情况下
1.12-1.13
it's quite pessimistic
这是⼀种相当悲观的情况
1.13-1.14
on the other hand
另⼀⽅⾯
1.14-1.19
you can view timestamp ordering based techniques as more optimistic right
你可以将基于时间戳顺序的⽅案视为⼀种更加乐观的⽅案
01:20 - 01:24
You allowed the database to operate ,and read and write data without actually acquiring
locks
你允许数据库在不获取锁的情况下对数据进⾏读和写操作
01:24 - 01:25
and at the end of the day
最后
1.25-1.31
you're able to correctly reconcile the correct serializable schedule at the end of the day
你能够正确地调整出正确的Serializable schedule
01:31 - 01:34
and we'll talk about how this is actually done inside of the database
我们稍后会讲数据库内部是如何做到这点的
01:36 - 01:41
there's actually going to be two times time ordering protocols, we're going to talk about
in this lecture
实际上，这节课上我们会讨论两种基于时间顺序的协议
01:41 - 01:44
One of them is actually called timestamp ordering or basic timestamp ordering
其中⼀种协议叫做timestamp ordering，或者叫做basic timestamp ordering
01:44 - 01:48
and another one is gonna be called the optimistic concurrency control
另⼀种叫做乐观并发控制
01:48 - 01:49
so it's a little bit confusing
So，这有点令⼈困惑
1.49-1.50
, because they're both optimistic
因为它们两个都属于乐观⽅案
1.50-1.51
and they're both timestamp ordering
并且它们两个都是根据时间戳来做的
1.51-1.55
,this is just the the nomenclature that the community has come up with
这其实是社区所提出的术语
01:56 - 1.57
all right
1.57-1.57
so let get started
So，我们开始上课吧
1.57-2.02
,the basic idea for these timestamp based protocols is that
这些基于时间戳的协议的基本思路是
2.02-2.03
it's a mechanism
它是⼀种机制
2.03-2.07
that the database can use to assign numeric values to timestamps
数据库可以通过这种机制来分配时间戳
2.07-2.11
that predefined the commit order of these transactions
以此来预定义这些事务的提交顺序
02:11 - 02:14
you can assume that there's going to be a new function here called TS
假设这⾥有⼀个叫做TS的新函数
2.14-2.18
,that given a transaction gives you the timestamp for that transaction
该函数会返回给我们该事务的时间戳
02:18 - 02:21
And so what the database tries to guarantee is that
So，数据库试着保证的东⻄是
2.21-2.25
if a transaction (Ti) has a timestamp that's less than the transaction (Tj)
如果事务Ti的时间戳⼩于事务Tj的时间戳
02:25 - 02:26
then in the serial schedule
那么，在Serial Schedule中
2.26-2.30
it's as if (Ti) had occurred before (Tj) inside of the database
在数据库中，Ti会在Tj之前执⾏
2.30-2.30
okay
02:32 - 02:34
So how is this done
So，这是如何做到的呢？
2.34-2.35
like what are these timestamps look like
这些时间戳⻓啥样呢？
2.35-2.40
the timestamps are sort of unique fixed numeric values
这些时间戳其实是唯⼀且固定数字
02:40 - 02:43
And they have a couple of interesting characteristics
并且，它们还有两种令我们感兴趣的特性
2.43-2.45
that characteristics that the database has to maintain
数据库必须维护这些特性
02:46 - 02:47
The first one is that
第⼀种特性就是
2.47-2.50
these timestamps have to be monotonically increasing
这些时间戳必须是单调增加的
02:50 - 02:53
okay so they have to always go forward in time and increase in time
So，它们的值必须随着时间的流逝⽽增加
02:54 - 02:55
the second thing is that
第⼆种特性则是
2.55-2.57
they have to be unique values right
它们的值必须是唯⼀的
02:57 - 03:00
so you can't ever have two transactions have the same timestamp
So，你永远不可以拥有两个具备相同时间戳的事务
03:01 - 03:03
because of this monotonically increasing characteristic
因为它的特性就是单调增加
03:04 - 03:08
so again assume that the database now has this new function this TS function
So，假设数据库现在有⼀个叫做TS的新函数
3.08-3.12
, that's able to take a transaction ID and return to you the timestamp for that transaction
它通过接收⼀个事务ID，它能够给我们返回该事务的时间戳
03:13 - 03:19
and these different timestamp protocols have different mechanisms
不同的时间戳协议它们拥有的机制也不同
3.19-3.25
by which at time points at which they actually assign these timestamps to the
transactions
从事务执⾏的时候，它们会将这些时间戳分配给事务
03:25 - 03:27
an important characteristic is that
⼀项重要的特性就是
3.27-3.30
these timestamps don't necessarily have to correspond to the wall clock time
这些时间戳不⼀定要和挂钟时间所对应
03:32 - 03:36
because they could be assigned to the transaction at any point during its execution
因为我们可以在事务执⾏期内的任意时间点给事务分配时间戳
3.36-3.38
not necessarily when it enters the system
不⼀定是要在刚拿到事务的时候给它分配时间戳
3.38-3.39
not even necessarily when it's about to commit
也不⼀定要在事务提交的时候分配时间戳
03:40 - 03:41
right so different protocols have different mechanisms
So，不同的协议有着不同的机制
3.41-3.45
by at time points at which they actually assign timestamps to transactions
它们会在某个时间点将时间戳分配给事务
03:47 - 03:52
there's a few different ways on how you actually source a timestamp for a transaction
实际上，你可以通过⼀些不同的⽅法来确定某个事务的时间戳是什么
03:53 - 03:55
okay and I've listed this a few listed here,
Ok，这⾥我已经列出了⼀些
3.55-3.57
the simplest thing you could do is just ask the CPU
最简单的办法就是去问CPU
03:57 - 03.58
okay what is the current time right,
当前时间是什么
3.58-3.59
because time is always increasing
因为时间总是在流逝的
3.59-4.02
you can assume that this kind of makes sense
你可以假设它是具备⼀定意义的
04:02 - 04:03
all right
4.03-4.05
but there's a few drawbacks
但这也存在着⼀些缺点
4.05-4.11
can anybody think about a few drawbacks for using wall clock time or a real time as a
timestamp
如果使⽤挂钟时间或真实时间作为时间戳的话，你们能思考下这⾥⾯存在着哪些缺点吗？
04:11 - 04:11
yeah
请讲
04:17 - 04:19
so that doesn't really matter
So，这并不重要
4.19-4.20
,as long as you're going to the same computer
只要你⽤的是同⼀台机器
4.20-4.23
and as long as the time is monotonically increasing
并且它上⾯的时间是单调增加的
4.23-4.24
then you should be okay
那么这就没什么问题
04:25 - 04:26
right so that's a good point right
So，你讲的不错
4.26-4.29
so if you have distributed database system
So，如果你使⽤的是分布式数据库系统
4.29-4.31
and it's difficult to keep these time points in sync
你就很难保证时间是同步的
04:31 - 04:33
what's another problem with using wall clock time
使⽤挂钟时间的另⼀个问题是什么？
04:37 - 04:39
you can turn back the clock
你可以将时间往回调
4.39-4.42
when would you actually turn back the clock
你在什么情况下才会将时间往回调？
04:48 - 04:48
Sure yeah
说的没错
4.48-4.52
so there could be some skew in the actual granularity which you track time
So，在你机器进⾏同步时间的时候，时间轴可能回调
4.52-5.06
is there another and another possible drawback, yeah
还有其他缺点吗？请讲
05:06 - 05:08
so you don't actually have to keep duration of time
So，实际上，你⽆须去保存这些持续时间
5.08-5.13
, you just need like one point like this is time point one time point two and it's increasing
你只需保存时间点即可，⽐如这是时间点1、时间点2，以此类推，它们的值是单调增加的
05:15 - 05:17
so it's not necessarily by duration is just about a point in time
So，你不⽤去保存这个事务持续的时间，你只需保存时间点即可
05:19 - 05:21
okay so a clue is that it's gonna happen this weekend
So，就好⽐这周的夏令时
05:23 - 05:24
yeah exactly
没错
5.24-5.29
yeah so a day like say day that daylight savings right, so it could be the case that you
know you're operating on the weekend
So，就拿这周的夏令时为例，你要在周末的时候调整下你的时钟
05:29 - 05:31
And then at random at a at a random point
在随机某个时间点
5.31-5.33
your clock back goes back an hour
你的时钟往回调了1⼩时
5.33-5.35
and your timestamps are pretty much screwed
那么你的时间戳就完蛋了
5.35-5.35
okay
懂了吧
05:38 - 05:41
another option is actually to use these logical counters right
另⼀个选项则是使⽤这些逻辑计数器
05:41 - 05:50
so you can think of having just a register and the CPU dedicated to having a mono time
monotonically increasing 32-bit 64-bit value
So，假设你CPU中有⼀个专⻔⽤来保存时间的寄存器，它⾥⾯的值是单调增加的，这些值的⻓
度是32位或者64位
05:50 - 05:54
are there any drawbacks or potential downfalls for this approach
这种⽅案是否存在任何缺点呢？
5.54-5.55
yeah
请讲
06:03 - 06:06
yeah so the distribution aspect is still an important factor
So，分布式⽅⾯依然是⼀个重要因素
06:07 - 06:09
but assume that there's one counter for the CPU
但假设CPU中有⼀个计数器
6.09-6.12
,and it's really fast to increment it without requiring locks
在不需要⽤到锁的情况下，它可以快速增加它的值
06:13 - 06:15
like you can do an atomic addition or something like that
⽐如，你可以进⾏原⼦性相加或者类似的操作
6.15-6.18
are there any problems with using this logical counter
在使⽤逻辑计数器时，还有什么问题吗
06:23 - 06:25
so I said 32 bits or 64 bits
So，我说了它的值⻓度是32位或者64位的
06:27 - 06:28
what happens if you run out of 32-bit values
如果你的值超过了32位，这会发⽣什么呢？
6.28-6.33
then you saturate your edition and you roll back right
那么，你就会⽤完你的时间戳，你可以将它回滚
06:33 - 06:34
so your counter is now going backwards in time
So，到了那个时候，你的计数器就会往回⾛了
06:35 - 06:37
so that's one of the problems with this approach
So，这是该⽅案中存在的其中⼀个问题
06:39 - 06:40
so most systems actually use this hybrid approach
So，实际上，⼤部分系统使⽤的都是混合⽅案
6.40-6.42
which is like a physiological thing
这就像是⽣理上的⼀种东⻄
6.42-6.47
and it sort of matches both the physical counter, and a logical counter to make sure that
everything sort of works out
通过让时间戳和物理计数器以及逻辑计数器进⾏匹配，以此确定所有东⻄都是正常⼯作的
06:52 - 06:55
so the system clock one problem is you have daylight savings times right
So，如果使⽤系统时钟，你会遇到的其中⼀个问题就是夏令时和冬令时导致的时间调整
06:55 - 06.58
so at a point in time one day like say daylight savings occurs
So，⽐如夏令时发⽣的那天
6.58-7.02
your time you time move backs or moves back an hour
你的时间就会往回调1⼩时
07:03 - 07:05
so now your time is not monotonically increasing it's not going back in time
So，现在你的时间就不再是单调增加的了，因为它往回调了⼀⼩时
07:08 - 07:08
okay
07:11 - 07:15
right so just to give you an idea of what the agenda is gonna be today
So，来给你们看下我们今天要讲的内容
07:15 - 07:18
So we're gonna talk about something called the basic timestamp ordering protocol
So，我们会先讲⼀个叫做basic timestamp ordering protocol的东⻄
7.18-7.22
,then we're going to talk about optimistic concurrency protocol
接着，我们会讨论乐观并发协议
7.22-7.24
,which is also a timestamp based protocol
它也是⼀个基于时间戳的协议
07:24 - 07:27
and then we're going to talk about a partition-based timestamp ordering protocol
接着，我们会讨论⼀个叫做partition-based timestamp ordering protocol的东⻄
7.27-7.31
which alleviates some of the bottlenecks than regular timestamp ordering protocols have
它缓解了那些基于时间戳顺序的协议所带来的瓶颈
07:31 - 07:33
and then we're going to talk about isolation levels
然后，我们会去讨论隔离级别
7.33-7.34
okay
07:35 - 07:35
so let's get started
So，我们开始吧
07:36 - 07:40
so with these timestamp ordering schemes, the general idea is that
So，这些基于时间戳顺序的⽅案的基本思想是
7.40-7.45
you want the transactions to proceed in the system ,reading and writing objects without
actually acquiring locks
在不获取锁的情况下，你想让系统中的事务能够对数据库中的对象进⾏读写操作
07:46 - 07:48
okay to make this possible
Ok，为了让它成为可能
7.48-7.53
you know you have to add some extra metadata to all of the database objects to make
this possible
你需要往所有的数据库对象中添加⼀些额外的元数据，以此来让它成为可能
07:53 - 07:58
specifically you have to add two extra timestamps to every single tuple in the system
特别是，你需要往数据库系统中每个tuple上都要添加两个时间戳
07:58 - 08:06
you have to add a read timestamp which represents timestamp of the transaction the
most recent transaction then read this item
你需要往该对象上添加⼀个read timestamp，它表示的是最近读取该对象的事务的时间戳
08:06 - 08:07
and a write timestamp
接着，你还要添加⼀个write timestamp
8.07-8.12
which is the timestamp of the most recent transaction ,that wrote into this this tuple and
in the system
它表示的是该系统中最近对该tuple进⾏写⼊操作的那个事务的时间戳
08:12 - 08:16
And then as the transaction is going through its operations
接着，当事务执⾏它⾥⾯的操作时
8.16-8.22
it's just going to make sure that it can actually read this tuple by leveraging the
timestamps that are associated with this tuple
它需要确保它可以利⽤与该tuple相关的时间戳来读取这个tuple
08:23 - 08:25
Okay now and I'll talk about how this is done
Ok，现在我来谈论下它是如何做到的
08:26 - 08:38
so for reads
So，对于读操作来说
8.38-8.33
there's an invariant that you have to make sure before you're actually allowed to read a
value from the database system
实际上，在你被允许从数据库系统中读取⼀个值前，你必须确保它是⼀个不变量
08:34 - 08:36
you have to ensure that the timestamp
你必须确保这个时间戳
8.36-8.38
,so you read your own timestamp for this transaction Ti
So，你要去读取事务Ti中你⾃⼰的时间戳
08:38 - 08:43
you have to make sure that it's less than the write timestamp for this tuple in the system
你需要确保这个时间戳不⼩于该系统中这个tuple所对应的write timestamp
08:44 - 08:46
okay does that make sense
Ok，你们懂了吗？
8.46-8.47
what does that mean,
这意味着什么呢
8.47-8.48 ！！！！…
that means
这意味着
8.48-8.52
that's essentially making sure that there's no other transaction that's written into the
system
本质上来讲，这确保了该系统中没有其他事务对该tuple进⾏写⼊操作
08:54 - 8.59
yeah there's no other transaction in the system ,that's wrote into this tuple,
没错，该系统中没有其他事务对该tuple进⾏写⼊操作
8.59-9.05
that should have read your ,but who's to say you're not reading a value of the tuple from
the future
你不会读取到该tuple未来的值
09:05 - 09:13
right so there's a transaction in the future ,that's overwritten the database value that you
should not be reading that's Essentially
So，在未来，某个事务会去覆写掉数据库中的这个值，你不应该读取到这个覆写后的值
09:13 - 09:14
but that's a problem
但这是⼀个问题
9.14-9.15
and when this happens
当这种情况发⽣的时候
9.15-9.16
you essentially have to abort
你就必须中⽌该事务
09:16 - 09:17
and when you abort
当你中⽌该事务的时候
9.17-9.18
you have to make sure that
你需要确保
9.18-9.24
you start with a newer transaction a newer timestamp, than the one that you had when
you initially began the transaction
你所开始执⾏的新事务所携带的新时间戳要⽐你⼀开始执⾏该事务时的时间戳要新
09:24 - 09:28
does everybody sort of understand why you need to assign a newer timestamp
你们是否明⽩我们为什么需要分配⼀个较新的时间戳？
09:29 - 09:32
what would happen if you had the same timestamp you had before
如果你使⽤的是和之前相同的时间戳，这会发⽣什么呢？
09:34 - 0934
exactly
没错
9.34-9.35
you'd run into the same problem right,
你会遇上同样的问题
9.35-9.39
you have to that's because mod because you have to ensure timestamps are
monotonically increasing
因为你必须确保时间戳是单调增加的
9.39-9.42
you have to get a new timestamp to avoid this problem, yeah
你必须使⽤⼀个新时间戳来避免这个问题
09:52 - 09:55
so if your timestamp is the same as a write timestamp
So，如果你的时间戳和write timestamp相同
9.55-9.56
what does that mean
这意味着什么呢？
09:58 - 09:58
exactly
没错
10:00 - 10:04
you can read it,you can read it right, it should be repeatable reads, it's perfectly fine,
yeah
你可以进⾏读取，这种情况是可重复读，这没什么问题
10:14 - 10:15
so in this scheme
So，在这种⽅案下
10.15-10.19
our timestamps are assigned when you begin that's when begin the transaction
我们会在事务开始的时候给它分配时间戳
10:21 - 10:21
okay
10.21-10.23
so if this invariant is invalidated
So，如果这个不变量⽆效了
10.23-10.25
you essentially have to abort
也就是说，你需要中⽌该事务
10:25 - 10:26
but on the other hand
但在另⼀⽅⾯
10.26-10.29
if you're actually allowed to perform the read
实际上，如果你被允许去执⾏这个读操作
10.29-10.40
then you modify the read timestamp for this tuple to take the maximum of whatever the
read timestamp is right now and what your own timestamp is
那么，你就会对该tuple的read timestamp进⾏修改，你会使⽤现在的read timestamp和你⾃⼰
的时间戳这两者间的最⼤值作为该tuple新的read timestamp
10:40 - 10:42
does anybody know why you have to take the maximum
有⼈知道我们为什么采⽤的是两者间的最⼤值么
10:47 - 10:49
timestamp have to be monotonically increasing right
时间戳必须是单调增加的
10.49-10.53
you could have a transaction that's newer than you， update the read timestamp
你可以使⽤⼀个较新的事务来更新read timestamp
10:53 - 10:56
but you can't set back the timestamp back to what you were
但你不能将时间戳设定为以前的时间
10.56-10.57
because you're older, right
因为你现在的时间戳是⽼时间戳
10:57 - 10:59
timestamp have to be monotonically increasing
时间戳需要是单向增加的
11:00 - 11:05
so you have to take the maximum or whatever it is right at this point in time when you
read it and what's your own timestamp is
你就必须在read timestamp和你⾃⼰的时间戳中选出那个最新的时间戳来进⾏更新
11:06 - 11:08
so this is important okay
So，这很重要
11:09 - 11:11
so once you've updated the timestamp
So，⼀旦你更新了时间戳
11.11-11.17
you now have to make a copy of this tuple into some local private workspace that's only
visible to you
你必须将该tuple的副本保存到⼀个只有你可⻅的本地私有⼯作空间中去
11:17 - 11:19
so that you can ensure that you get repeatable reads
这样的话，你就可以确保你可以做到可重复读
11:51 - 11:55
so assume that there's some tuple that you want to read right
So，假设你想读取某个tuple
11:55 - 12:59
and the write timestamp is from a transaction that's newer than you that's in the future
该事务的write timestamp要⽐你新，它的时间点是在未来
12:00 - 12:02
right you shouldn't be able to read that value right
你就不能读取这个值
12.02-12.06
you should be reading the value that existed before it wrote before the new transaction
wrote it
你所读取到的值应该是这个新事务执⾏写操作前就已经存在的值
12:06 - 12:08
so that's why it validates
So，这就是为什么它有效的原因
12:13 - 12:17
because you now appear in a different order in the serial order right
因为你在按顺序执⾏时，使⽤了⼀个不同的执⾏顺序
因为你在Serial Order中出现了⼀个不同的执⾏顺序
12:17 - 12:21
you shouldn't because your timestamp is newer than the one that wrote to it before .
因为你的时间戳要⽐之前它执⾏写操作时来得新
12.21-12.24
you logically appear after this transaction in the serial order
从逻辑上来讲，在Serial Order中，你是在这个事务之后出现的
12:29 - 12:31
yeah go ahead
你说
12:34 - 12:36
so this is not I don't think it's covered in the book
So，我不觉得书中有对它进⾏介绍
12.36-12.38
,but you have to make sure that you have to make a local copy
但你必须确保你制作了⼀份本地副本
12.38-12.40
,so that you can issue repeatable reads
这样的话，你就可以发起可重复读了
12:44 - 12:45
so you can imagine that
So，你可以想象⼀下
12.45-12.48
another transaction comes in and updates the system
当另⼀个事务进来并对系统中的数据进⾏更新操作时
12:49 - 12:51
but you have to be able to read the same value that you read initially
你必须能够读取到你最初读取的值
12:53 - 12.57
but if you allow another transaction to update the value here
但如果你允许另⼀个事务去更新这⾥的值
12.57-13.00
then you would invalidate this this this invariant at top
那么，你就要⽆效化顶部这个不变值
13:00 - 13:01
and you wouldn't able to read it
你不能读取这个值
13.01-*13.02
but you actually should be able to read it right
但实际上你应该能够读取这个值
13:03 - 13:06
because you wrote it you read it in a transaction inconsistent state
因为你在这个事务中读取到的是⼀个不⼀致状态
13:08 - 13:08
yeah
请讲
13:20 - 13:22
Yeah that's a that's a very good point
你说的这点⾮常不错
13.22-13.28
I think you're alluding to the fact that there could be starvation where you have
consistently consistent in aborts
我认为你所暗示的是这⾥会存在starvation的情况
在这⾥出现⼀致性中⽌的时候，我认为这⾥暗示了存在着starvation的情况
13:28 - 13:29
that's a drawback of this approach
这是该⽅案的⼀个缺点
13.29-13.33
and we'll get to that later in the presentation
我们稍后会提到它
13:33 - 13:35
okay so this is just for reads
Ok，这⾥讲的都是关于读操作的
13.35-13.37
you have a similar similar story for writes
对于写操作也是类似情况
13:38 - 13:39
Okay
13.39-13.48
so if your transaction I if your timestamp is less than the the read timestamp of the the
object that you're trying to write into
So，如果你事务的时间戳⼩于你试着写⼊的那个对象所携带的read timestamp
13:49 - 13:50
that means it's a newer transaction
这意味着，它是⼀个较新的事务
13.50-13.53
that read a stale value
它会读取到⼀个过时的值
13.53-13.56
a value that you that should have been coming from you as a transaction
这个值你应该在之前的事务中就已经看到过了
13.56-13.57
but as is not anymore
但它现在就不应该存在了
13:57 - 14:00
So that's a violation of the of this timestamp ordering protocol
So，这就违反了这个timestamp ordering协议
14:01 - 14:02
Similarly
类似的
14.02-14.10
if your timestamp is less than the write timestamp of another object
如果你的时间戳⼩于另⼀个对象的write timestamp
14.10-14.14
then again there's a new a transaction ,that essentially overrode your value
接着，⼀个新事务会覆盖掉你的值
14:14 - 14:15
and again that's a violation
这种情况违反了这个协议
14.15-14.16
and the idea is that
这⾥的思路是
14.16-14.19
if either of these conditions are true
如果其中⼀个条件为true
14:19 - 14:23
you have to abort and again start with a newer timestamp value and begin the entire
process again
那你就需要中⽌并重启该事务，你需要将新的时间戳分配给它，然后再次执⾏整个过程
14:25 - 14:26
if on the other hand
如果为false
14.26-14.29
these this is a it's a valid write
那么，这就是⼀次有效的写操作
14.29-14.32
then you have to update the write timestamp for the tuple
那么，你就需要去更新该tuple的write timestamp
14:32 - 14:39
and you essentially done you have to also make a local copy here in order to support
repeatable read
本质上来讲，这⾥你也必须要制作⼀个本地副本，以此来⽀持可重复读
14.39-14.44
, you read your local copy instead of going back to the in in to the databases global state
你会去读取你本地副本中的值，⽽不是回到数据库中去读取数据库中的值
14:46 - 14:46
okay okay
14:54 - 14:57
so let's walk through an example hopefully this will clear things up a little bit
So，我们来看个例⼦，希望这能让你们明⽩这些东⻄
14:58 - 15:00
so we have two transactions here
So，这⾥我们有两个事务
15.0-15.04
,and it's just assumed that you can only execute one transaction one operation at a time
假设你⼀次只能执⾏这些事务中的⼀个操作
15:04 - 15:05
So you can assume single core single thread
So，假设我们这⾥的场景是单核和单线程的情况
15:06 - 15:16
and in this database we now have annotated all of the the tuples we have, all of the
objects here with the read timestamp and a write timestamp
我们现在已经列出了该数据库中我们所拥有的所有tuple，以及它们所对应的read timestamp和
write timestamp
15:16 - 15:17
okay so let's get started
Ok，我们开始吧
15:17 - 15:19
So we have t1 and t2
So，我们有T1和T2这两个事务
15.19-15.22
when they entered the system
当它们进⼊系统时
15:22 - 15:23
they were assigned a timestamp
我们就会给它们分配⼀个时间戳
15.23-15.26
assume that T1 is assigned a timestamp of 1
假设我们分配给T1的时间戳是1
15.26-15.28
,and T2 is assigned a timestamp of 2
分配给T2的时间戳是2
15.28-15.30
,right pretty simple
很简单吧
15:30 - 15:31
then you do the read
接着，我们执⾏读操作
15.31-15.34
so T1 does a read of B
So，T1对B进⾏读取
15.34-15.36
you look at the write timestamp for B ,it's 0
可以看到B的write timestamp的值是0
15.36-15.37
1 is greater than 0
1⽐0⼤
15:38 - 15:40
so you update and the read timestamp to 1
So，你将B的read timestamp值更新为1
15:42 - 15:45
then we do a context switched into transaction 2
接着，我们将上下⽂切换到T2
15.45-15.48
and T2 now wants to do a read of B
T2现在想对B进⾏读取
15:48 - 15:49
if you look at the write timestamp
如果你去看下B的write timestamp
15.49-15.51
and you're good to go
看了下，没问题，我们可以继续执⾏我们的操作
15.51-15.57
so you update the read timestamp to take the maximum of what it was which is 1 and
the new timestamp 2 and you get 2
So，我们就可以对它的read timestamp进⾏更新，我们取它当前read timestamp和新时间戳这
两者间的最⼤值作为它的新read timestamp，即2
15:58 - 15.58
all right
15.58-16.01
now you do a write
现在，我们来执⾏写操作
16.01-16.03
,so T2 wants to do a write of B
So，T2想对B进⾏读取
16:04 - 16:06
you look at the write timestamp and the real timestamp your greater than both
通过查看B的write timestamp，我们发现我们真实的时间戳值要⼤于它
16.06-16.09
,so you update the write timestamp of B to 2
So，我们将B的write timestamp更新为2
16:11 - 16:15
Okay, now you do a context switch back into t1
现在，我们切换到T1
16.15-16.17
t1 wants to do a read of a
T1想对A进⾏读取
16.17-16.20
,it looks at the the write timestamp of a
它会去查看A的write timestamp
16.20-16.21
1 is greater than 0
它发现1⽐0⼤
16:22 - 16:30
so you update the read timestamp to be the maximum of 0 1 and you're good to go
sorry yeah you update the read timestamp to 1
So，这⾥的read timestamp应该是取0和1这两者间的最⼤值，我们将A的read timestamp更新
为1
16:31 - 16:33
now you come back over to transaction 2
现在，我们切换到T2
16.33-16.36
and T2 wants to do a read of a
T2想对A进⾏读取
16:36 - 16:37
you look at the write timestamp of a,
我们看了下A的write timestamp
16.37-16.39
2 is greater than 0
2⽐0⼤
16.39-16.42
you update read timestamp to 2 now
我们将A的read timestamp更新为2
16:42 - 16:47
And then finally, t2 wants to do a write of a
接着，最后，T2想对A进⾏写⼊操作
16:47 - 16:51
so it looks at both the read timestamp on the write timestamp of a, it's greater than both
of them
So，它会去查看A的read timestamp和write timestamp，我们的时间戳要⽐这个两个时间戳都
来得⼤
16:51 - 16:53
so that that's for the write is valid
这样的话，这个写操作就是有效的
16:53 - 16:58
and yeah so no validations exist no no no violations exists
So，这⾥不存在违反协议的情况
16:59 - 17:01
so both transactions are safe and you can commit both of them
So，这两个事务都是安全的，你可以提交它们
17:03 - 17:04
Alright this is this clear
你们懂了吗？
17:05 - 17:06
okay good
Ok，不错
17.06-17.10
so let's walk through another example
So，我们来看下另⼀个例⼦
17:11 - 17:13
so it's the same setup here
So，它和之前的设置完全相同
17.13-17.14
all the initial timestamps are 0
所有的时间戳都是0
17.14-17.17
T1 and T2 enter the system
T1和T2进⼊了系统
17:17 -17:20
T1 gets a timestamp 1
T1分配到的时间戳是1
17-.20-17.21
, T2 gets timestamp 2
T2分配到的时间戳是2
17:21 - 17:22
All right
17.22-17.23
so in this scenario
So，在这种情况下
17.23-17.25
T1 wants to do a read
T1想对A执⾏⼀次读操作
17.25-17.27
it's a good read
这⼀步读取操作并没有什么问题
17:27 - 17:30
so it updates the the read timestamp
So，T1会去更新read timestamp
17.30-17.31
do a context switch
接着，我们切换到T2
17:32 - 17:34
and now T2 wants to do a write of a
现在，T2想对A进⾏写⼊操作
17.34-17.36
it checks the read timestamp and the write timestamp,
它会检查A的read timestamp和write timestamp
17.36-17.37
it's valid
它们是有效的
17.37-17.39
so it updates the write timestamp to 2
So，它会将A的write timestamp更新为2
17:41 - 17:44
T1 now is trying to do a write of a
T1现在试着要对A进⾏写⼊操作
17:44 - 17:47
so checks the write timestamp and read timestamp
So，它会去检查A的write timestamp和read timestamp
17.47-17.48
it's no longer valid
它不再有效
17.48-17.50
,because you have it the timestamp of 1
因为A的read timestamp是1
17.50-17.54
,which is 1 is less than the write timestamp of a, which is 2
1⼩于A的write timestamp 2
17.54-17.57
this is a violation
这⾥就违反了我们说的东⻄
17:57 - 18:00
so T1 actually can't commit it has to abort
So，实际上，T1不能进⾏提交，我们需要中⽌它
18:03 - 18:04
It`s that clear
你们懂了吗
18.04-18.07
you can think about this as like in the serial order
你们可以想象⼀下，在Serial Order中
18.07-18.09
because T1 has timestamp 1 and T2 has timestamp 2
因为T1的时间戳是1，T2的时间戳是2
18:09 - 18:12
T1 should appear before T2 in the serial order
在Serial Order中，T1应该在T2之前出现，即T1的时间戳⽐较⼩
18:15 - 18:18
so this is obviously going to be a violation
So，显然，这违反了我们的规则
18.18-18.20
because this read here it's gonna be aborted
因为这⾥的读操作会被中⽌
18:22 - 18:24
okay sorry
18:26 - 18:31
so there's actually an optimization that we can make here to avoid aborting in this
specific scenario
So，实际上，这⾥我们可以进⾏优化，以防⽌在这种特定情况下出现事务中⽌的情况
18:32 - 18:35
right you can think about it
你们可以这样想
18.35-18.36
as in physical time what's happening
在物理时间上，这⾥发⽣了什么呢
18:36 - 18:38
right T2 is writing to something
T2正对某个东⻄进⾏写⼊操作
18.38-18.41
, but then it's being overwritten by T1
但接着，它所做的修改⼜被T1覆盖掉了
18:41 - 18:43
so do we really need this write
So，我们是否真的需要这个写操作呢？
18:44 - 18:47
no I think the observation is you actually don't need it
我觉得从我们的观察结果来看，我们实际并不需要它
18:48 - 18:49
what you could have is
我们所能做的事情是
18.49-18.54
because we've maintaining a local every transaction is maintaining a local copy of the
soup of the tuples
因为每个事务会为它所操作的tuple制作⼀份本地副本
18:54 - 18:57
this write here can can essentially be ignored by the system
本质上来讲，这个写操作就可以被系统所忽略了
18:58 - 19:02
right because externally ,this write is what's valid
因为从外部的⻆度来讲，这个写操作是有效的
19:03 - 19:05
and as long as this write is externally valid
从外部来看，只要这个写操作是有效的
19.05-19.07
then you don't actually need this one
那么，你实际就不需要这个写操作了
19:07 - 19:08
externally
从外部⻆度来讲是这样的
19.08-19.08
within the transaction
在事务内部
19.08-19.09
you still need this write
你依然需要这个写操作
19.09-19.11
because you have to be able to read your own writes
因为你需要能够读取到你⾃⼰写操作所做的修改
19:12 - 19:20
so this observation leads to an optimization that you you can apply in these timestamp
based systems call the Thomas Wright rule
So，我们从中观察到的⼀种能⽤于这种基于时间戳的系统所做的优化叫做托⻢斯写⼊规则
（Thomas Write Rule）
19:21 - 19:22
and the idea is that
它的思路是
19.22-19.24
if you're trying to write into an object X
如果你试着对对象X进⾏写⼊操作
19:26 - 19:27
as before
和之前⼀样
19.27-19.30
if your timestamp is less than the the read timestamp for that object
如果你的时间戳⼩于该对象的read timestamp
19.30-19.33
you still have to abort and start with a new a timestamp
你依然需要中⽌该事务，并开启⼀个携带新时间戳的事务
19:34 - 19:38
but if the timestamp is less than the write timestamp of the object
但如果该时间戳⼩于该对象的write timestamp
19.38-19.38
which means
这意味着
19.38-19.41
there's a newer transaction that wrote into this object
有⼀个较新的事务已经修改过该对象了
19:41 - 19:44
you can actually just ignore the write altogether
实际上，你可以忽略掉这个写操作
19:44 - 19:49
you have a local copy of the write that you can now read
你现在可以读取这个对象的本地存储副本
19.47-19.52
but externally it's okay to ignore this write
但从外界来看，将这个写操作忽略掉是Ok的
19:52 - 19:55
yeah yeah yes
请讲

18-02
18-02
20:02 - 20:05
so this write is only important to t1
So，这个写操作只对T1来说是重要的
20:05 - 20:05
right
20.05-20.09
so it's not it doesn't really I don't actually have to propagate it back to the database
实际上，我⽆须将它传播到数据库中
20.09-20.11
because it's gonna be overwritten by this right
因为它会被右边这个写操作所覆盖掉
20:11 - 20:13
because in the serial order
因为在Serial Order中
20.13-
this happens first and then this happens
T1先执⾏，然后T2再执⾏
20:15 - 20:16
okay
20.16-20.19
because this has a transaction timestamp of 1 this has a timestamp of 2
因为T1的时间戳是1，T2的时间戳是2
20:24 - 20:32
right yeah ,so this optimization and it's actually quite useful in this specific Scenario
So，实际上，在这种特定场景下，这种优化是⾮常有⽤的
20:34 - 20:39
it allows you to have the actually commit this schedule
这实际上允许你去提交这种schedule
20:44 - 20:46
so this is the same example as before
So，这是个和之前相同的例⼦
20.46-20.51
t1 begins reads a updates timestamp
T1开始对A进⾏读取，并更新它的时间戳
20:52 - 20:53
t2 begins does a write
T2开始对A进⾏写⼊操作
20.53-20.57
now we recognize that this write should normally be invalid
现在，我们意识到T1所执⾏的这个写操作正常来说应该是⽆效的
20:57 - 21:00
we actually but by applying the Thomas write rule ,
但根据托⻢斯写⼊规则（Thomas Write Rule）
21.00-21.03
we don't actually update the write timestamp or the value
实际上，我们不⽤去更新A的write timestamp或者它的值
21:03 - 21:06
hey but we just maintain this local copy
但我们会维护这份本地副本
21.06-21.08
we ignore it, and we allow T1 to continue
我们会忽略掉这个问题，，并让T1继续执⾏
21:08 - 21:17
All subsequent reads for this read, all subsequent reads of A in times in transaction 1,
occur in the local copy with this value
对于T1中所有对于A接下来的读操作所读取到的都是本地副本中的这个值
21:21 - 21:23
Okay
懂了吗
yeah yeah
21:33 - 21:36
so that's essentially basic timestamp ordering
So，本质上来讲，这就是⼀种基础的基于时间戳顺序的协议
21.36-24.45
like two-phase locking it's a mechanism for the database to generate conflict
serializable schedules，as long as you don't apply this to this Thomas Wright Rule
和两阶段锁类似，只要你不使⽤托⻢斯写⼊规则，数据库可以通过这种机制⽣成Conflict
Serializable Schedule
21:45- 21:46
okay
21:47 - 21:49
it does you can prevent it deadlocks altogether
通过使⽤这种⽅法你可以防⽌死锁问题
21.49-21.53
because as you're similar to how two-phase locking works
因为你有了解两阶段锁的⼯作机制
21.53-21.54
for every operation you're performing on the database
对于你在数据库中执⾏的每个操作来说
21.54-21.56
you're making sure that there's a this is a valid operation
你要确保这是⼀个有效的操作
21:57 - 21.58
it's sort of like deadlock prevention
这有点像是预防死锁
21.58-22.01
right you're incrementally generating this serialization graph
你会逐步⽣成这种serialization graph
22.01-22.03
and as soon as you detect a cycle
⼀旦你检测到有cycle的存在
22:03 - 22.06
You invalidated， you aborted in two-phase locking
你就会在两阶段锁中让这个事务⽆效，中⽌该事务
22.06-22.11
here you're incrementally checking for every operation whether it's valid or not based on
these timestamps
基于这些时间戳，你会逐步检查每个操作是否有效
22:11 - 22:13
and then aborting eagerly as eager as possible
接着，尽早中⽌它们
22.13-22.14
okay
22:16 - 22:19
one drawback to you which I think one of the students led to is,
之前有个学⽣提到的⼀个缺点，我觉得是
22.19-22.22
you could have a possible you have the possibility of starvation
你可能会遇上starvation的情况
22:23 - 22:26
right you have it you can think of a long transaction that's been running for a long time
假设，你有⼀个已经运⾏了很⻓⼀段时间的事务
22:26 - 22:28
and then you have these short transactions
接着，你还有⼀些执⾏时间很短的事务
22.28-22.33
that are performing, that exist for a very short period of time update a few tuples and
then commit and leave
它们存在的时间很短，只是对⼀些tuple进⾏更新，然后提交事务，就结束了
22:33 - 22:40
these are essentially going to invalidate all the old transactions causing conflicts,
causing a cyclical aborts
本质上来讲，它们会让那些引起冲突和连环中⽌的⽼事务⽆效化
22:42 - 22:43
okay
22.43-22.47
so so another thing that we should talk about here is
So，此处我们要谈论的另⼀件事情就是
22:47- 22:57
these timestamp ordering protocols they allow they permit schedules that are not
recoverable, okay
这些Timestamp Ordering协议规定了schedule是不可恢复的
22:57 - 22:58 ！！
so what is a recoverable schedule
So，什么是可恢复的schedule
22:59 - 23:09
so a schedule is recoverable ,if a transaction only commits if all the previous
transactions that it relied on data from also have committed
So，⼀个事务只有当它所依赖数据的对应事务已经都提交的情况下，它再进⾏提交，这样的
schedule是可恢复的
23:09 - 23:13
you can think of it as like they like cascading abort,right
你可以将这种情况想象为cascading aborts的情况
23:14 - 23:15
you want to make sure that
你想去确保
23.15-23.17
if you read a value from it that's updated by another transaction
如果你读取了另⼀个事务所更新的值
23.17-23.20
that that transaction commits before you commit
该事务能在你提交之前提交
23:21 - 23:24
basic timestamp ordering does not guarantee this for you
basic timestamp ordering并不能为你保证这⼀点
23:25 - 23:26
okay
23.26-23.33
so I want to talk about how this the specific characteristic is violated by a basic
timestamp ordering
So，我想讨论的是basic timestamp ordering是如何违反这种特性的
23:34 - 23:36
So imagine we have the same setup here
So，想象下，这⾥我们拥有⼀个和之前相同的设置
23.36-23.38
we have two transactions t1 and t2
我们有两个事务，即T1和T2
23:39 - 23:41
t1 has timestamp 1,t2 has timestamp 2
T1的时间戳是1，T2的时间戳是2
23:41 - 23:44
so t1 does a W(A)
So，T1执⾏了W(A)
23.44-23.46
t2 does a R(A) ,and then a W(B)
T2先执⾏了R(A)，接着⼜执⾏了W(B)
23:47 - 23:49
so in this serial order
So，在这种Serial Order的情况下
23.49-23.52
t1 occurs first and t2 occurs second
T1先执⾏，然后T2再执⾏
23:52 - 23:55
So this read, can now read this write
So，T2中的这个读操作是可以读取到T1中的这个写操作修改过的值
23.55-223.56
and that's okay
这是Ok的
23:57 - 23:59
it does some write of B which is OK in commits
然后，T2⼜执⾏了W(B)，这是Ok的，然后我们提交T2
24:00 - 24:02
right so t2 has committed at this point
So，我们在这个时间点提交了T2
24:02 - 24:08
but let's say later on in the in the system, this transaction has aborted
但假设，过了⼀会⼉后，在该系统中，T1被中⽌了
24:08- 24:09
the problem is that
这⾥的问题是
24.09-24.14
we've now notified the client, we've notified externally to the world ,that this transaction
is committed
我们现在意识到，对于外界来说，T2已经被提交了
24:15 - 24:18
but it read a value from a transaction that aborted
但它读取到了⼀个来⾃已经被中⽌的事务中的值
24:18 - 24:20
right so this is actually invalid
So，实际上，这是⽆效的
24.20-24.22
it's not a recoverable schedule
这不是⼀个可恢复的schedule
24.22-24.23
because when the system comes back
因为当系统恢复正常的时候
24:24 - 24:26
we have to recognize that this is aborted
我们必须意识到T1已经被中⽌了
24.26-24.28
and that we should not apply these writes
我们不应该将T2中的写操作落地
24:30 - 24:31
okay
24.31-24.34
so this is not a recoverable schedule
So，这不是⼀个 recoverable schedule
24.34-24.40
but it is permitted by the basic timestamp order concurrency protocol
但对于basic timestamp ordering并发协议来说，这种情况是允许发⽣的
24:40 - 24:43
all right yeah
24:43 - 24:44
So so t1 aborts after t2 is committed
So，当T2被提交了以后，T1就被中⽌了
24.44-24.48
and this violates the recoverable schedule requirement
这违反了recoverable schedule的需求
24:52 - 24.52
okay
24.52-24.56
so I think a lot of people are sort of picked up on this
So，我相信很多⼈都选择了这种协议
24.56-25.03
,but this this these basic timestamp ordering that the protocol has a lot of overhead,
right
但这种basic timestamp ordering协议的开销很⼤
25:03 - 25:05
so every time you do a write or read
So，每当你要执⾏写或者读操作的时候
25.05-25.08
,you need to now copy it into your local workspace
你需要将数据复制到你的本地⼯作空间中
25:09 - 25:11
so if you're updating or reading and writing billions of tuple
So，如果你要对数⼗亿的tuple进⾏更新、读取或者写⼊操作
25.11-25.16！！！
you have to make billions of billions of copies per transaction in a local memory space
right
那你就需要在本地内存空间中为每个事务制作数⼗亿个副本
25:16 - 25:18
and that's obviously a lot of overhead
很明显，这是⼀笔很⼤的开销
25:19 - 25:23
another thing that again was picked up by one of the students is that
某个学⽣所提出的另⼀件事情是
25.23-25.27
you could have starvation by from long running transactions
我们在执⾏那些⻓时间运⾏的事务时，会遇上starvation的状况
25.27-25.30
by short running transactions that quickly update one or two tuples
那些执⾏时间不⻓的事务会快速更新1个或2个tuple
25:31 - 25:36
and then require the long running transaction to abort and restart
这会让那些执⾏时间很⻓的事务被中⽌并重启
25:41 - 25:44
so so what can we do
So，我们该怎么做呢？
25:45 - 25:46
if you think about it right
如果我们思考⼀下
25.46-25.52
so two-phase locking and this basic timestamp ordering protocol that I just talked about
就拿两阶段锁和我刚才讨论的Timestamp Ordering协议来说
25:52 - 25:55
they're also somewhat pessimistic right
它们某种程度上都是悲观的
25:55 - 26:00
so in two-phase locking as soon as you read and write a value from the database
So，在两阶段锁中，只要当你对数据库中的值进⾏读写时
26:00 - 26:04
You have to acquire some block to protect yourself from other transactions in the
system
你必须获取某个lock，以防⽌数据库系统中其他事务来影响你
26:05 - 26:08
with basic timestamp order ,and you're kind of doing the same thing right
在Timestamp Ordering协议中，你做的其实也是⼀回事
26:08 - 26:10
every time you want to read and write a tuple
每当你想对某个tuple进⾏读写时
26.10-26.18
you have to make sure that the timestamps align just right so that you can perform the
operation that you want to perform right
你必须确保时间戳与你想要执⾏的那个操作对⻬
26:18 - 26:21
so they're both assuming that there's a lot of contention in the system
So，这两种⽅案都假设系统中存在着⼤量争抢锁的情况
26.21-26.27
and try to prevent something wrong from happening
并试着阻⽌那些错误的事情发⽣
26:27 - 26:28
but what if you make a different assumption
但如果你做出了⼀个不同的假设会怎么样呢？
26.28-26.32
what if you assume that there's not going to be a lot of contention in the system
如果我们假设系统中并没有这么很多锁争抢的情况出现呢？
26:32 - 26:41
What different types of optimizations can you apply, assuming that there that
transactions are essentially a very short-lived and are essentially conflict free
假设这些事务的存活周期很短，并且彼此没有冲突，那你会对它们进⾏怎样的优化呢？
26:42 - 26:45
right can you be even more optimistic than this stuff that we've talked about so far
你是否能想出⼀种⽐我们⽬前所谈论的协议还要乐观的⽅法呢？
26:46 - 26:48
and we'll talk about one example
我们会去讨论⼀个例⼦
26.48-26.52
one concurrency protocol that makes this assumption, and applies a lot of different
types of optimizations
这个例⼦中使⽤的并发协议就使⽤了这种假设，并且它运⽤了很多种不同的优化
26:53 - 26:59
okay and it's called as the name suggests optimistic concurrency control
Ok，它的名字叫做乐观并发控制
26:59 - 27:02
so it takes a very optimistic view of how the transactions run in the system
So，它是以乐观的⻆度来看待系统中事务执⾏的⽅式
27:02 - 27:09
so OCC optimistic concurrency control was was written here at CMU by HT Kung
So，乐观并发控制其实是由CMU的HT Kung所发明
27:10 - 27:11
this he's no longer professor here
他已经不再是CMU的教授了
27.11-27.12
I think he said at Harvard
他现在应该是哈佛的教授了
27:13 - 27:14
but it's pretty cool
但这个⾮常Cool
27.14-27.21
that one of the you know premier concurrency control protocols was actually written
here at CMU okay
你知道的，其中⼀种最初的并发控制协议居然是出⾃CMU⼈之⼿
27:21 - 27:23
Oops the the idea is
它的思路是
27.23-27.26
as in the basics timestamp ordering protocol
在基本的Timestamp Ordering协议中
27:26 - 27:36
every operation you perform what you do is you first make a local copy of that data into
a local thread local private workspace
每次你要执⾏⼀个操作的时候，你⾸先会将你要操作的那个数据的副本放⼊⼀个线程私有的⼯作
空间
27:36 - 27:36
okay
27.36-27.40
any time you want to read a copy ,any time you want to read an element from the
database
每当你想读取⼀个副本，每当你从数据库中读取某个元素时
27.40-27.42
you first make a copy from it and then you're good to go
你⾸先会去制作该数据的副本，然后对它进⾏操作
27:43 - 27:44
if you want to make an update to it
如果你想对该数据进⾏更新
27.44-27.46
you first make a copy of it into your local workspace
你⾸先会将它的副本放⼊你的本地⼯作空间中
27.46-27.48
and then you apply the update to your local copy
接着，你会对这个本地副本进⾏更新
27:49 - 27:52
okay you don't perform an in-place update anymore, all right
Ok，你不会在数据库中直接进⾏更新
27:53 - 27:55
then once all of this work is done
⼀旦所有的⼯作完成后
27.55-27.58
, that and you're ready to commit
你就做好了提交事务的准备
27:58 - 28:07
you have to essentially make sure, you have to validate that all the changes you make
are transactionally consistent with the rest of the transactions that are gone running in
the system concurrently with you
你必须去确保，你必须去验证你做的所有修改与数据库系统中并发执⾏的其他事务是相⼀致的
28:07 - 28:12
okay and I'll talk about how this is done specifically in the workspace in the following
slides sorry
Ok，我会在接下来的幻灯⽚中告诉你这是如何做到的
28:14 - 28:16
so after this validation step
So，在这个validation阶段后
28.16-28.21
after the database has ensured yeah hey listen your transaction is good to go
当数据库表示：hey，你的事务可以去提交了
28:21 - 28:26
We have to now install all the changes that are in your private workspace into the global
database system
我们现在需要将你在私有⼯作空间中所做的所有修改都落地到全局数据库空间中
28:26 - 28:28
and we have to do this atomically okay
我们需要以原⼦的⽅式做到这⼀点
28:28 - 28:31
and again I'll talk about how this is done in the system
稍后我会讨论在系统中该如何做到这点
28:33 - 28:34
okay
28.34-28.36 ！！！！
so the way the OCC works is that
So，OCC的⼯作⽅式是
28.36-28.38
it's split up into three phases
它由三个阶段组成
28:39 - 28:40
The first phase is called the read phase
第⼀个阶段叫做read phase
28.40-28.42
then you have the validation phase
接着，第⼆个阶段是validation phase
28.42-28.46
which is essentially gonna validate that this transaction is actually still valid, and doesn't
conflict with anything else
本质上来讲，它的作⽤是⽤来验证该事务是否依然有效，且不与其他东⻄产⽣冲突
28:46 - 28:48
And once a validation phase is done
当validation phase结束的时候
28.48-28.52
then you actually have to install your changes from a private workspace into the global
database
那么，你就必须将你在私有⼯作空间所做的修改落地到主数据库中
28:52 - 28:53
all right
28.53-28.55
so the read phase is a bit of a misnomer right
So，read phase其实是⼀种误称
28.55-28.58
you're actually allowed to do both reading and writing in it
实际上，在这个阶段中，你既可以做读取操作，也可以做写⼊操作
28:58 - 29:01
so I didn't want to make sure that that gets across
So，我不想让它的意思越界
29.01-29.03
I actually don't even like the phrase read phase
实际上，我并不喜欢read phase这个短语
29:03 - 29:05
I actually prefer work phase
实际上，我更倾向于使⽤work phase这个术语
29.05-29.07
where you're doing the actual work for the transaction
即在这个阶段中，你会执⾏该事务的操作
29:07 - 29:08
okay so in the work phase
So，在work phase中
29.08-29.14
you're making your reads and writes you're updating values, you're reading values all in
a private workspace
你所执⾏的读、写、更新操作都是在私有⼯作空间完成的
29:14 - 29:16
in the validation phase
在validation phase中
29.16-29.18
when the transaction is ready to commit
当事务准备好提交时
29:19 - 29:24
The database does a bunch of as you know sanity checks to make sure that's true this is
a valid transaction
数据库会进⾏⼀系列sanity(合理) check，以此来确保该事务是⼀个有效的事务
29:24 - 29:25
And then in the write phase
接着，在write phase中
29.25-29.28
you atomically install all your changes into the global database
你会以原⼦的⽅式将你的所有修改都落地到主数据库中
29:30 - 29:33
okay so let's just quickly walk through an example of how this is going to work
So，我们来快速看个例⼦，看看它是如何⼯作的
29:35 - 29:35
okay
29.35-29.37
so the first thing is that we have the same database ,we had before
So，⾸先，我们这⾥所拥有的数据库和之前是相同的
29.37-29.40
but we've removed read timestamp now
但我们移除了read timestamp
29.40-29.42
we just have a write timestamp
这⾥我们只有write timestamp
29:42 - 29:43
the second thing is
第⼆件要说的事情是
29.43-29.45
we've now demarcated the boundaries for all the phases
我们已经划定了所有阶段的边界
29:46 - 29:49
we've really just done this for illustration
出于展示，我们已经在图上标好了这些边界
29:49 - 29:51
the transaction is not going to specifically say
事务并不会特地去说
29.51-29.54
hey I want to start my read phase, I'm gonna start my valid a phase ,and then the
commit phase
Hey，我想去开始我的read phase，我会去开始我的valid phase，接着我会进⾏我的commit
phase
29:55 - 29.56
this is it's going to be done
这就完了
29.56-30.00
it's gonna be handled for you by the database system itself
数据库系统会帮你处理这些事情
30:00 - 30:04
much like how the two-phase locking protocol is implemented for you by the database
not by the transaction
这就像是数据库（⽽不是事务）为你实现的两阶段锁协议
30:04 - 30:07
right the transactions just doing a bunch of reads and writes
事务所做的就是⼀堆读和写操作
30:08 - 30:09
okay
30.09-30.12
so another thing I think I want to point out is that
So，我想指出的另⼀件事情是
30.12-30.15
,unlike basic timestamp ordering
和basic timestamp ordering不同的是
30:15 - 30:20
the transaction that timestamps aren't necessarily assigned ,when the transaction
entered the system
当事务进⼊系统的时候，我们不⼀定要给事务分配时间戳
30:20 - 30:20
okay
30.20-30.24
they're actually deferred to a later point in time and we'll get into how that's done
实际上，我们会在晚些时候给这些事务分配时间戳，我们稍后会讲这是如何做到的
30:28 - 30:29
okay
30.29-30.32
so we're ready to get started ,we begin transaction t1
So，我们开始执⾏T1
30.32-30.34
it now wants to a R(A)
T1现在想执⾏R(A)
30:35 - 30:37
so it constructs a private workspace
So，它构建了⼀个私有⼯作空间
30.37-30.40
that is essentially somewhat of a copy of the database
本质上来讲，就是数据库表中对应数据的⼀份副本
30:41 - 30:50
upon read it's going to read or make a copy of a into its private workspace along with
the write timestamp for whatever it read from the database system
它会去将A的副本放⼊它的私有⼯作空间中，该副本携带着它从数据库系统中所读取到的write
timestamp
30:51 - 30:54
now t2 begins and it begins its read phase
现在，T2开始了它的read phase
30.54-30.56
when it begins a read phase
当它开始它的read phase时
30.56-30.59
it has to construct this private workspace for transaction t2
它需要为T2构建这个私有⼯作空间
31:01 - 31:06
it does a R(A) into its private work space along the write timestamp
T2会在它的私有⼯作空间中执⾏R(A)，A会携带着它的write timestamp
31.06-31.08
and then we're good to go
接着，我们继续
31:08 - 31:11
So now we get to the validation phase
So，现在我们进⼊了validation phase
31:11 - 31:13
so this is essentially t2 saying to the database
So，T2对数据库表示
31.13-31.14
hey listen I'm ready to commit
听着，我准备好去提交了
31.14-31.15
what it does is
它所做的事情是
31.15-31.18
the the database will now enter the validation phase for T2
数据库现在会进⼊T2的validation phase
31:21 - 31:21
it's at this point
此时
31.21-31.25
that the timestamp is assigned to the to the transaction
数据库会将这个时间戳分配给该事务
31.25-31.25
okay
31:25 - 31:26
so so far
到⽬前为⽌
31.26-31.28
this transaction doesn't yet have a timestamp
我们还未将时间戳分配给T1
31.28-31.31
you can assume that its timestamp is infinity
你可以假设T1的时间戳是⽆穷⼤
31:31 - 31:33
here when and when t2 enters the validation phase
当T2进⼊validation phase的时候
31.33-31.36
it gets a timestamp of one, right
它所拿到的时间戳是1
31:39 - 31:40
so what does it do
So，它要做什么呢？
31.40-31.45
it now it doesn't have to do any any sort of validation
它⽆需做任何验证操作
31:45 - 31:48
because there's none nothing to do the validate it's a read-only transaction
因为它是⼀个只读事务，它不需要做任何验证⽅⾯的事情
31:49 - 31:52
so it begins the write it falls into the write phase
So，它会进⼊write phase
31.52-31.54
there's nothing to write
这⾥没有什么东⻄要写
31:54 - 31:55
and then it commits
然后，我们就提交T2
31.55-31.57
and everything is sort of done
这样就完事了
31:58 - 32:01
okay that's a pretty simple example
Ok，这是⼀个⾮常简单的例⼦
32:02 - 32:04
And we do a context switch back into t1
我们现在切换回T1
32.04-32.06
t1 now wants to do a write
T1现在想执⾏写操作
32:07 - 32:09
so it makes a modification to its local copy
So，T1对它的本地副本进⾏修改
32.09-32.14
and it assigns a timestamp of infinity
它的write timestamp就被设置为⽆穷⼤
32:14 - 32:14
okay
32.14-32.16
why does a timestamp have to be infinity
为什么它的时间戳必须是⽆穷⼤呢？
32:22 - 32:23
does this transaction have a timestamp yet
T1是否拥有⼀个时间戳呢？
32:26 - 32:27
it doesn't have a timestamp right
它并没有时间戳
32:28 - 32:31
because it has enter validation you only get a timestamp when you enter validation
因为只有当事务进⼊validation phase的时候，它才会得到⼀个时间戳
32:31 - 32:33
so if it doesn't have a timestamp
So，如果该事务没有时间戳
32.33-32.35
then it doesn't know what its timestamp is gonna be
那么，它也就不知道它的时间戳会是什么
32:35 - 32:36
so it assumes infinity, right
因此，我们假设它的时间戳是⽆穷⼤
32.36-32.40
and it will fill this in when it begins a validation phase
当事务进⼊validation phase的时候，我们就会给它分配⼀个时间戳
32:43 - 32:44
which is here
也就是这⾥
32.44-32.45
so it now begins a validation phase
So，现在它进⼊了validation phase
32.45-32.47
it gets a timestamp assigned to it 2
它所拿到的时间戳就是2
32:49 - 32:52
and then when there's no other concurrent transactions running in the system
系统中没有其他并发执⾏的事务
32.52-32.54
so the validation phase completes
So，这个validation phase就完成了
32:54 - 33:01
and in how now has to write its local copy all of its local changes into the global
database space
现在，它需要将它对本地副本所做的修改落地到主数据库中去
33:01 - 33:02
when it does this copy
当它对这个副本进⾏处理时
33.03-33.09
it has to update the write timestamp for this tuple a to the timestamp that it was
assigned when it began validation
它需要将tuple A的write timestamp更新为它开始进⾏验证时所分配的timestamp
33:09 - 33:12
so 2, so writes the write timestamp of 2 here
So，A的write timestamp就是2
33:14 -33:15
okay
33.15-33.16
this is a pretty simple example
这是⼀个⾮常简单的例⼦
33.16-33.19
it's like a happy path example of how transactions work
这就是⼀个happy path案例，它是关于事务是如何⼯作的
33:23 - 33:24
okay
33.24-33.26
so the work phase is sort of simple
So，work phase其实很简单
33.26-33.28
right anytime you want to read and write a value
每当你想去读取和写⼊⼀个值的时候
33.28-33.30
you make a copy of it into your local workspace
你会在你的本地⼯作空间中制作⼀份该数据的副本
33.30-33.32
and then you modify the local work space alone
接着，你会单独修改本地⼯作空间中的内容
33:33 - 33:35
Once you're done the work phase
⼀旦你完成了work phase中的⼯作
33.35-33.3
you've now begin the validation phase
你就会进⼊validation phase
33:37 - 33:38
The validation phase is
validation phase指的是
33.38-33.41
where the database ensures that the schedule that it can generate is serializable right
数据库要确保它所⽣成的schedule是Serializable的
33:42 - 33:43
it's conflict serializable
或者是Conflict Serializable的
33:44 - 33:45
the way that it does this is that
它所实现的⽅式是
33.45-33.47
for every transaction
对于每个事务来说
33.47-33.53
it has to make sure that the the read write set right so the set of things that it has
modified ,doesn't conflict
它需要去确保这些被修改的东⻄不存在任何冲突
33.53-33.57
doesn't have a read write conflict or a write write conflict with all other concurrent
transactions in the system
并且不会与系统中所有其他并发执⾏的事务产⽣读写冲突或者写写冲突
33:58 - 34:00
right and there's a mechanism for how to do this
这⾥有⼀种机制可以做到这⼀点
34:01 - 34:03
there's actually a couple of different mechanisms
实际上有两种不同的机制可以做到这⼀点
34:04 - 34:06
when these slides are a little bit out of order
这些幻灯⽚的顺序好像有点不对
34:08 - 34:15
so the way that the database can ensure that these transactions don't or like the the
sets are you know properly serializable
So，数据库保证这些事务是真正Serializable的⽅式是
34:16 - 34:20
is that it needs to have a global view of all active transactions running in the system
它需要能看到系统中所有正在运⾏的活跃事务的⼀种全局视野
它需要⼀种全局视野，能够看到系统中所有正在运⾏的活跃事务
34:20 - 34:23
if you have a global view of all transactions running in the system,
如果你拥有这种能看到系统中所有正在运⾏的事务的全局视野
34.23-34.28
you now have a global view of all of the the modifications every transaction has made in
the system
那么，你就能看到每个事务在系统中所做的所有修改
34:28 - 34:36
Okay and then you you use these readwrite sets as a mechanism to determine the
ordering of the transactions in the system
接着，你通过使⽤这种机制来决定系统中事务的执⾏顺序
34:39 - 34:48
so I think one of the things that we want to try to get across here to simplify ,the the the
entire protocol is said
So，我觉得我们想试着对整个协议进⾏简化的⼀个地⽅是
34.48-51
the this validation and writing happens serially
我们想让Validation和Write这两个阶段按顺序执⾏
34:51 - 35:01
so the entire system you can think about it as there's a giant latch over the the validation
phase, quote-unquote Kuala validation phase to ensure that there's only one transaction
performing validation at a time
So，在整个系统中，你可以想象在Validation阶段会有⼀个很⼤的latch，它⽤来确保⼀次只有
⼀个事务在执⾏验证操作
35:01 - 35:03
and this will simplify some of the protocols
这会让协议有所简化
35.03-35.07
we're gonna with this simplified some of the details we're talking about end up in the
protocol a little bit later on
我们稍后会去讨论该协议中被简化的那些细节
35:10 - 35:13
so yes when the read phase as I mentioned before
So，在我之前提到的read阶段中
35:14 - 35:17
Whenever you're trying to read and write in a value you make a local copy
当你试着要对某个值进⾏读写时，你会去制作它的副本
35:18 - 35:23
and you only update that local copy to ensure repeatable reads
并且你只会对该本地副本进⾏更新，以确保⽀持可重复读
35:24 - 35:25
and then in the validation phase
接着，在validation阶段中
35.25-35.28
is when you get is is when you get a timestamp
当你拿到⼀个时间戳后
35:29 - 35:32
and then you use this timestamp to look at all other concurrent transaction the system
接着，你就会使⽤这个时间戳去查看系统中所有其他并发执⾏的事务
35.32-35.37
to make sure that you don't intercept your read and write sets to intersect
以此来确保你的read set和write set不会相交
35.37-35.38
to make sure that you have a correct serial order
以此来确保你有⼀个正确的Serial Order
35:41 - 35:44
so you look at your timestamp which are it's for Ti
So，当你查看Ti的时间戳时
35:45 - 35:49
you find all other time a transactions in the system that are younger than you that are
newer than you
你发现系统中所有其他事务的时间戳要⽐你的时间戳来得新，即⼤于你的时间戳
35:50 - 35:52
and you have to make sure that a set of conditions holds
当你遇上这个情况的时候，你必须确保你满⾜这些条件
35:53 - 35:59
I mean the fact that we're using newer transactions isn't necessarily required, you could
also look at all the transactions
我的意思是，我们不⼀定要去看这些较新的事务，我们也可以去查看所有的事务
35:59 - 36:02
right there's no reason why we're specifically looking younger transactions
这⾥没有理由⾮要去查看这些较新的事务
36:02 - 36:05
but it simplifies it makes things a little bit simpler
但这让事情变得更为简单
36.05-36.08
but I'll talk about another approach that we can use that's slightly different than this one
但我稍后会去讨论⼀种和这有所不同的⽅案
36:09 - 36:12
so when you're ready to validate
So，当你准备好进⾏验证的时候
36.12-36.13
you essentially invoke the commit
本质上来讲，你就会去调⽤commit
36:13 - 36:15
and then the database performs a validation phase
接着，数据库就会执⾏validation阶段
36.15-36.18
, so it finds because it has a global view of all the transactions in the system
因为它能看到数据库系统中所有的事务
36:18 - 36:20
we can find all newer transactions ,and all the transactions
我们可以找到所有新来的事务，以及所有的事务
36.20-36.24
and make sure that everything's sort of is a fits together
并确保所有东⻄都能放在⼀起
36:25 - 36:27
and there's two types of validations that you can perform
你可以执⾏两种验证⽅式
36.27-36.31
,you can perform forward validation or backward validation
你可以执⾏forward validation，或者你也可以执⾏backward validation
36:31 - 36:34
right so what is the difference between these two types of validation techniques
So，这两种验证技术之间的区别是什么呢？
36:36 - 36:39
so in in in in in backwards validation
So，backward validation指的是
36.39-36.41
what you're looking at is when a transaction is ready to commit
当某个事务准备好提交的时候
36.41-36.43
let's assume that transaction t2 is ready to commit
假设T2准备好提交了
36:43 - 36:46
You look at all the older transaction in the system
你就会去查看该系统中所有较⽼的事务
36:47 - 36:47
okay
36.47-36.48
so t2 is ready to commit
So，T2准备好进⾏提交
36.48-36.50
its commit point is here
它的提交时间点是在这个位置
36.50-36.52
and you're doing backwards validation
如果你使⽤的是backward validation
36.52-36.59
you have to find all the transactions ,So transit different transactions whose timestamps
are less than this one And perform a validation
你就需要找到所有⽐T2时间戳⼩的那些不同事务，并对它们执⾏验证操作
36:59 - 37:03
right so we call this the the scope of things that we have to look at a validation scope
So，我们将我们查看的这部分区域叫做validation scope（验证作⽤域）
37:03 - 37:06
So this is the validation scope for t2, if we're doing backwards validation
如果我们对T2使⽤backward validation，那么这部分就是T2的validation scope
37:06 - 37:10
Because t1 and t2 are running concurrently,
因为T1和T2是并发执⾏的
37.10-37.13
and t1 committed before t2
T1在T2之前提交
37:13 - 37:15
so t1 is older than t2
So，T1⽐T2⽼（T1的提交时间戳⼩于T2的提交时间戳）
37:16 - 37:17
all right
37.17-37.19
because it could be the case
因为它可能是这种情况
37.19-37.22
that t1 made an update to something
T1更新了某个数据
37:24 - 37:26
that should have been read by t2， but we didn't
该数据应该被T2所读取到，但实际并没有
37.26-37.30
because T1 changes are made to a private copy
因为T1是对它的私有副本所做的修改
37:32 - 37:33
all right
37.33-37.34
so we could be the case that
So，我们可能遇上的是这种情况
37.34-37.38
we read something new from the database system ,that we should have been reading
from t1
我们从数据库系统中读取到了某个新数据，但这个数据其实我们应该在执⾏T1的时候就已经读
过了
37:38 - 37:40
but we actually read from the main database
但我们实际是从主数据库中读取的数据
37.40-37.44
because the t1 is making private changes to its own space
因为T1修改的是它⾃⼰空间中的那个副本
37:44 - 37:47
so we have to make sure that this this this doesn't happen
So，我们需要确保这种情况不会发⽣
37.47-37.48
and if it does
如果发⽣了这种情况
37.48-37.49
we have to actually abort t1
实际上，我们就需要中⽌T1
37:51 - 37:53
so this is backwards validation we're looking backwards
So，这就是backward validation，我们会去查看我们之前的事务
38:01 - 38:02
correct yeah
说的没错
38.02-38.03
because this is already committed
因为T1已经被提交了
38.03-38.06
right at this point we can't do anything about T1
此时，我们⽆法对T1做任何事情
38:07 - 38:08
okay
38.08-38.09
similarly
类似地
38.09-38.11
instead of going backwards，you could also look forwards
我们除了往回看，我们还可以向前看
38:12 - 38:15
so again we're trying to do the the validation for t2
So，这⾥我们再次试着对T2进⾏验证
38:16 - 38:20
we find all concurrently running transactions that have not committed yet
我们会找到所有并发执⾏但还未提交的那些事务
38:20 - 38:22
and we do a validation against those
我们会对它们进⾏验证操作
38:22 - 38:23
so in this specific scenario
So，在这种特殊的情况下
38.23-38.27
t3 is concurrently running
T3也在并发执⾏
38:27 - 38:30
and we have to make sure that this is transactionally safe
我们必须确保事务上的安全
38:30 - 38:32
because it could be the case
因为它可能是这种情况
38.32-38.33
that I made an update
即我更新了某个东⻄
38:32 - 38:36
so t2 made an update into its local private space
So，T2对它本地私有空间中的数据进⾏了更新
38.36-38.39
,but because it occurs before t3 in the serial order
但因为在Serial Order中，它在T3之前执⾏
38.39-38.42
this one has read as stale value from the database
T2已经从数据库中读取到了⼀个过时的值
38:43 - 38:44
it should have read something that I modified
即，它应该已经读到了某个数据，但我已经修改过了
38.44-38.47
like a maybe I modified it here and it has read it here
⽐如，兴许我在这⾥修改了某个数据，然后它在这⾥读取到了该数据
38:48 - 38:50
But it actually read a stale value
但实际上它读取到的是⼀个过时的值
38:51 - 38:53
and if that happens I have to abort myself
如果这种情况发⽣的话，我就必须中⽌该事务
38:55 - 38.56
okay
38.56-39.00
so these are just two techniques to two mechanisms in which we perform the validation
So，这是我们⽤来执⾏验证时所⽤到的两种机制
39:00 - 39:01
what's really important here is
这⾥真正重要的地⽅在于
39.01-39.06
that they all that the entire date that all transactions perform this validation in the same
direction
所有事务在执⾏验证的时候都是沿着同⼀⽅向进⾏的（要么向前，要么向后）
39:06 - 39:10
You can't have t1 performing forward validation and t2 performing backwards validation
你不能让T1执⾏forward validation，T2执⾏backward validation
39.10-39.12
because that's going to mess up the entire system
因为这会让整个系统产⽣混乱
39:13 - 39:13
yeah
请讲
39:35 - 39:37
so if the validation completes
So，如果验证操作完成的话
39.37-39.38
then you're essentially committed
那么，本质上来讲，你就会提交事务
39.38-39.39
you're ready to write your changes out
即你准备好将你所做的写操作落地了
39:48 - 39:49
even like a system goes down
即使是在系统宕机的情况下？
39:55 - 39.58
no yeah because the validation is successful
因为如果验证成功的话
39.58-40.00
that the database is saying
数据库就会表示
40.00-40.01
that this is a valid transaction,
这是⼀个有效的事务
40.01-40.02
it doesn't conflict with anything else
它不会与其他东⻄产⽣冲突

18-03
40:02 - 40:06
so it's a it should now be installed into the system
So，它现在应该被落地到系统中了
40:11 - 40:12
all right
40:14 - 40:14
So okay
40.14-40.15
so for the rest of this lecture
So，在这节课剩下的时间⾥
40.15-40.18
,let's just assume that we're always doing forward validation
假设，我们使⽤的始终是forward validation
40:18 - 40:19
so anytime you want to validate a transaction
So，每当你想对⼀个事务进⾏验证时
40.19-40.21
you find all newer transactions than you
你会找到所有⽐该事务时间戳更⼤的事务
40.21-40.23
and you perform this validation step
你就会执⾏这个验证步骤
40:26 - 40:29
okay,so there's a couple of different scenarios that we have to cover
So，我们需要介绍两种不同的情况
40:29 - 40:30
okay the first scenario is that
Ok，第⼀种情况是
40.30-40.32
if you find a transaction TJ
如果你找到⼀个事务Tj
40:34 - 40:42
where all your phases your read your would sorry,your work your that your validation in
your write steps happen before anything that TJ has done
你原有事务中的写操作要在Tj这个时间戳更⼤的事务执⾏任何操作前完成
40:42 - 40:45
all right this is sort of like the simple happy path case here here
这就如这⾥这个简单的例⼦所展示的
40:45 - 40:47
so this is an example
So，在这个例⼦中
40.47-40.48
you have t1 and t2
我们有两个事务，即T1和T2
40.48-40.52
,t1 completes all of its steps before t2 is then anything
在T2执⾏任何操作之前，T1就完成了它的所有步骤
40:53 - 40:55
okay so this is a really simple example
Ok，这是⼀个⾮常简单的例⼦
40.55-40.58
you could essentially collapse this into one and now you have a serial execution
本质上来讲，你可以将这些事务合并为⼀个，然后你就得到了⼀个Serial execution
40:59 - 41:00
so you dont only have to do anything
So，你⽆需去做任何事情
41.00-41.04
all that interesting here this is sort of given to you naturally
这⾥所有你感兴趣的东⻄都是默认很⾃然的提供给你的
41:06 - 41:11
the second scenario that we have to handle, is that
我们需要处理的第⼆种情况是
41.11-41.17
if t1 completes before TJ ,sorry TI completes before TJ begins its write phase
如果Tj在开始执⾏它的写阶段之前，Ti就完成了它的⼯作
41:18 - 41:19
okay
41.19-41.21
and we have to make sure in this scenario
我们需要确保，在这种情况下
41.21-41.28
that the stuff that we write the the write set in our transaction ,doesn't intersect with the
read set of the other transaction
我们事务中写操作要处理的东⻄不会与其他事务读操作涉及的东⻄相交
41:28 - 41:32
so the other transaction hasn't read anything that we're going to that we've written
即其他事务不会去读取任何我们要写⼊的东⻄
41:32 - 41:33
okay why is this important
为什么这点很重要呢？
41.33-41.35
so let's walk through an example
So，我们来看个例⼦
41:35 - 41:38
so in this scenario we have two transactions
So，在这个场景下，我们有两个事务
41.38-41.39
t1 is reading and writing a
T1对A进⾏读取和写⼊操作
41.39-41.42
t2 is reading a and doing nothing else
T2除了读取A以外，其他什么事也不做
41:42 - 41:46
so so this is the state of the database
So，这就是数据库的状态
41.46-41.50
so t1 has read a and written to it assume that is writing the same value 123
So，T1对A进⾏读取，并将它的值修改为123
41:51 - 41:52
and it's timestamp is infinity,
它的时间戳是⽆穷⼤
41.52-41.54
T2 is read a
T2对A进⾏读取
41.54-41.56
so it has a timestamp of 0 there
So，它的时间戳就是0
41.56-41.59
,and it has a local copy in its in its private workspace
在它的私有⼯作空间中，它保存了A的⼀份本地副本
41:59 - 42:02
and then you want to perform the the validation here
接着，我们想在这⾥执⾏下验证操作
42:03 - 42:05
right so t1 has to abort
So，这⾥需要中⽌T1
42.05-42.06
because it's read set
图标为它是read set
42:06 - 42:09
so it has a lower timestamp than t2
So，它的时间戳要⽐T2⼩
42.09-42.11
,because it begins validation first
因为它先开始进⾏验证操作
42:11 - 42:14
So it's write set intersects with the read set here
So，它的write set与此处的read set相交了
42:15 - 42:17
all right so that violates the invariant that we had before
So，这违反了我们之前拥有的不变量
42.17-42.21
so we have to abort this transaction
So，我们需要中⽌这个事务（T1）
42:22 - 42:23
okay
42.23-42.24
in the serial order
在Serial Order的情况下
42.24-42.26
t1 has to begin before t2,
T1必须在T2之前开始
42.26-42.28
but t2 has read a stale value
但T2读取到了⼀个过时的值
42:29 - 42:32
so we have to abort
So，我们需要中⽌事务
42:34 - 42:37
I think it's a pretty simple example
我觉得这是⼀个相当简单的例⼦
42:39 - 42:42
But now let's that slightly tweak it
现在让我们来稍微调整下这个例⼦
42.42-42.46
and now we'll have T2 begin validation before t1
我们让T2在T1之前先执⾏验证
42:46 - 42:50
so in the serial order t2 happens before t1
So，在Serial Order中，T2在T1之前执⾏
42:51 - 42:53
what's gonna happen in this in this case right
在这个例⼦中，这会发⽣什么呢？
42.53-42.58
,so t1 reads a ,begins validation, it doesn't have a write set
So，T1对A进⾏读取，接着开始验证，这⾥它并没有write set
42:58 - 43:01
so it doesn't it doesn't have anything to intersect with this transaction
So，它也就没有任何与这个事务相交的部分
43.01-43.02
,so so it commits
So，我们可以提交T1
43:03 - 43:04
t2 does the same thing
T2也做了相同的事情
43:09 - 43:17
it's write set ,doesn't intersect with the the read set of T, it doesn't intersect with any
other concurrent transaction
T2的write set不与其他并发事务中的操作相交
43:18 - 43:20
because it's what this one's all revalidated
因为它已经被重新验证了
43:21 - 43:23
so another thing at like nothing happens right
So，这⾥什么也没发⽣
43:23 - 43:23
So when the serial order
So，当我们是Serial Order的情况下
43.23-43.24
t2 happens before t1
T2在T1之前开始执⾏
43.24-43.28
it reads the value of a that initially existed before
它读取了A之前⼀开始就存在的值
43:28 - 43:31
This transaction is going to read the value of a there
该事务就会去读取A的值
43.31-43.34
make a local copy read write to it,
它会去制作A的⼀份本地副本，并对该副本进⾏读写操作
43.34-43.34
and everything's okay
所有东⻄都是ok的
43:39 - 43:43
all right,questions, yes
有问题吗？请问
43:50 - 43:51
so in this scenario
So，在这种情况下
43.51-43.54
because T2 begins validation first
因为T2先开始进⾏验证
43.54-43.56
it appears first in the serial order
它会先出现在Serial Order中
44:04 - 44:10
yeah yeah
44:16 - 44:20
so T1 has to abort
So，我们需要中⽌T1
44.20-44.24
because in the serial order what should have happened is that
因为在Serial Order中，这⾥应当会发⽣的事情是
44.24-44.27
T2 because it begins validation first
因为T2先开始进⾏验证
44.27-44.29
, it's the first to recognize that there's something wrong
它会⾸先注意到这⾥出了问题
44:30 - 44:36
so it recognizes something's wrong as soon as it begins a validation
So，只要当它开始验证时，它就会意识到这⾥有东⻄出了错
44:36 - 44:37
because it gets assigned a timestamp,
因为它被分配了⼀个时间戳
44.37-44.40
it sees a concurrent transactions that's read stale value
它看到了⼀个并发的事务，该事务读取到了⼀个过时的值
44.40-44.41
so it aborts
So，该事务被中⽌了
44:45 - 44:47
well when T2 goes to validate,
Well，当T2开始验证的时候
44.47-44.49
T1 note is no longer a valid transaction
T1被打上标记，它不再是⼀个有效的事务
44:49 - 44:51
So it won't see any concurrent transactions,
So，它不会看到任何并发的事务
44.51-44.55
there's nothing to intersect with also it's a read-only transaction
这样也就没有其他事务会与其相交，即便它是⼀个只读事务
44:55 - 44:56
so there's nothing to intersect with
So，这⾥不会有任何事务与它相交
45:16 - 45:22
T2 couldn't, no not until the stalls it's it's changes
No，T2不会去暂停它所做的修改
45.20-45.22
because it's a private private thing
因为它是⼀个私有的东⻄
45:25 - 45:28 - 45:28
yeah yeah yeah question
请讲
45:54 - 46:00
Yeah so when when this T1 begins its validate phase
你是说当T1开始执⾏它的验证阶段的时候？
46:00 - 46:02
you don't get a timestamp
你不会拿到时间戳
46.02-46.03
yeah I don't get I don't know 1 or 2 or something
你不会拿到1或者2之类的时间戳
46:04 - 46:07
but this T2 doesn't have a write timestamp yet
但T2⽬前还没有write timestamp
46:08 - 46:09
yeah I mean it's infinity.
我的意思是，它是⽆穷⼤的
46.09-46.11
we doesn't have any timestamp
我们还没有分配任何时间戳
46.11-46.12
because it hasn't begun validation yet
因为它还未开始验证操作
46:15 - 46:18
no no no so no no no no
No No No，你讲的不对
46:19 - 46:21
so the timestamp is at assigned to the transaction
So，我们会将时间戳分配给这个事务
46.21-46.30
it isn't assumed that it doesn't take whatever timestamp is from the the tuple
我们并不会去使⽤tuple所携带的任何时间戳
46:30 - 46:32
yeah so that's just a local copy
So，这只是⼀个本地副本
46:33 - 46:34 - 46:40 - 46:41
okay yeah yeah yeah
请说
46:56 - 46.57
are you saying
你说的是不是这么⼀回事
46.57-47.01
if t2 performs a write to this object A
如果T2对A执⾏写操作
47:02 - 47:08
it'll modify thewrite timestamp of its local copy to infinity
它会将它本地副本上的write timestamp修改为⽆穷⼤
47:10 - 47:10
yeah
47:25 - 47:26
Yeah so if it makes a write
So，如果它执⾏了这个写操作
47.26-47.29
it will get a local time it'll get a timestamp in' validation
它会在验证的时候拿到⼀个时间戳
47.29-47.34
and it'll update the write timestamp there，If there's no conflicts yeah
如果这⾥没有任何冲突的话，它会更新这⾥的write timestamp
47:58 - 47.58
no no
No No
47.58-48.00
you have to have this write be atomic
你所拥有的这个写操作必须是原⼦性的
48.00-48.04
so you write all all your changes back into into the database in this phase
So，你会在这个阶段将你所做的所有修改都写回数据库
48:11 - 48:14
that's just because of the schedule that we have here
这只是因为我们这⾥所拥有的这个schedule
48:14 - 48:17
so we have the device you can think of it as like we begin the validation
So，你可以想象⼀下，当我们开始验证的时候
48.17-48.19
we finish and do context switch here
当我们执⾏完毕，进⾏上下⽂切换到T1这⾥的时候
48.19-48.28
and now we begin the validation and the write phase
我们就会开始执⾏验证，以及这个写阶段
48:28 - 48:28
all right
48.28-48.30
so this is the second example
So，这是第⼆个例⼦
48.30-48.33
there's still one more to go
我们还要再看⼀个例⼦
48:34 - 48:34
in this one
在这个例⼦中
48.34-48.44
the transaction you have to ensure that the transaction TI completes its read phase
before transaction TJ,begins its read phase
你需要确保在Tj开始它的读阶段开始之前，Ti完成了它的读阶段
48:44 - 48:55
so we have to ensure that the write set of my transaction doesn't intersect with the the
read set and the write set of all these of the transactions that fall into this category or
the read phases are overlapping
So，我们需要确保我们事务中的write set不与其他事务的read set和write set相交，或者不与
读阶段重叠
48:56 - 49:01
and this is another example of how we can go through this
这是我们要看的另⼀个例⼦
49:02 - 49:04
so let's see in this scenario
So，在这个场景下
49.04-49.06
t1 is reading and writing a
T1对A进⾏读写操作
49:07 - 49:08
oops
不好意思，按错了
49.08-49.10
t2 is reading B and reading a,
T2先读取B，再读取A
49.10-49.14
t1 and begin that validation phase
T1开始执⾏它的验证阶段
49:14 - 49:16
so it gets a timestamp of 1
So，它拿到的时间戳是1
49.16-49.19
,and now I can commit it
我可以提交T1
49.19-49.27
,because my write set doesn't intersect with the read set of transaction t2 at this point
in time
因为T1中的write set此时并没有与T2中的read set相交
49:29 - 49:30
okay
49.30-49.34
so I can install my changes back into the into the database
So，我可以将我所做的修改落地到数据库中
49:35 - 49:38
I update 4 5 6 or update A with value 4 5 6
我将A的值更新为456
49.38-49.39
and I set my write timestamp to 1
并将它的write timestamp设置为1
49.39-49.45
which is the timestamp that I was assigned at validation phase
这也是我在验证阶段所分配的时间戳
49:45 - 49:45
okay
49.45-49.51
then when we come back down into we do a context switch back into t2
接着，我们将上下⽂切换到T2
49:51 - 49:54
t2 does a R(B) or sorry a R(A)
接着，T2对A进⾏读取
49.54-49.58
,and now it can go back to the main it goes to the to the main database
现在，它跑到主数据库那⾥
49:58 - 50:03
and does a local copy of the updated value of A made by t1
读取到由T1更新过的A的值的本地副本
50:04 - 50:06
and then it can validate and write successfully
接着，它可以进⾏验证，并成功写⼊数据
50.06-50.08
,because there are no concurrent transactions
因为这⾥并没有任何其他的并发事务
50:11 - 50:13
Good yeah
都懂了吧，请讲
50:22 - 50:26
so if you let's go back to this example
So，我们回到这个例⼦
50:28 - 50:30
so when you want to perform a write
So，当你想执⾏⼀次写操作的时候
50.30-50.36
right you make a local copy of the database object into your local private workspace
你会制作该数据库对象的⼀份副本，并保存到你的本地私有⼯作空间中
50:36 - 50:38
and then that's why you set the timestamp to infinity
这就是你将时间戳设置为⽆穷⼤的原因所在
50:38 - 50:39
you set it to infinity
你将它设置为⽆穷⼤的原因是
50.39-50.41
,because you don't know what your timestamp is going to be
因为你不知道你的时间戳会是什么
50:41 - 50:44
because you haven't been assigned one yet, right
因为你还未分配这个时间戳
50:45 - 50:49
it's zero here only for mainly for illustrative purposes
这⾥我们之所以写0，只是出于展示原因
50.49-50.55
, you can think about like there was some transaction with timestamps 0 ,that bulk
loaded all of these objects into the database
你可以想象⼀下这种场景，某个时间戳为0的事务将所有的对象加载到数据库中
50:55 - 50:57
so that's why the write timestamp is 0
So，这就是为什么write timestamp是0的原因了
51:00 - 51:00
when you read it
当你读取它的时候
51.00-51.11
you read it whatever timestamp is associated with the object at that point
该对象的read timestamp就与你读取它的时间相关
51:11 - 51:14
yeah so t2 does a R(A)
So，T2执⾏了R(A)
51.14-51.16
does a valid does a validation does a write
并执⾏了验证以及写操作
51.16-51.17
everything is good
这⼀切都没问题
51.17-51.18
because there's no concurrent transactions
因为这⾥并没有其他的并发事务
51:19 - 51:19
yeah
请讲
51:23 - 51:26
yeah these are all for validation yeah correct
这些都是为了进⾏验证，说的没错
51:34 - 51:37
yeah you still need to rely on the same timestamps
没错，你依然需要依靠这些相同的时间戳
51:44 - 51:53
yeah so that was essentially the I'm cup we've been kind of hind wavy on a couple of
things on, how you actually install the write atomicly, and how you do the validations in a
parallel way
So，我们已经讲了两个东⻄，即我们该如何保证我们的写操作原⼦性，以及我们该如何以并⾏
的⽅式进⾏验证
51:53 - 51:54
because in a real system
因为在⼀个真正的系统中
51.54-51.56
you have to do this parallel validation
你需要做这种并⾏验证
51:56 - 51:59
but I think hopefully the main idea has gotten across right
但我希望你们已经理解了这⾥⾯的主要思想
52:00 - 52:01
it's not too complicated
它并不是很复杂
52.01-52.03
there's some trickeries here
这⾥⾯有些棘⼿的地⽅
52.03-52.06
but generally it's it's pretty intuitive
但总的来讲，它还是⽐较直接的
52:07 - 52:10
so there's a few observations that we should try to make
So，我们从中学到了⼀些东⻄
52:11 - 52:18
all of these timestamp in optimistic concurrency protocols sort of work well when there's
very little conflict right
当没有什么冲突的情况下，乐观并发协议中这些基于时间戳的协议的效果⾮常好
52:18 - 52:25
because you allowed the transactions to proceed without acquiring locks without doing
that anything heavyweight it worked
因为这允许我们在不获取lock以及不做那些代价很⾼的操作的情况下，我们能够去处理这些事务
52.25-52.30
and at the end you do a sort of lightweight semi lightweight validation to make sure that
your transaction is still valid
在最后，我们会做些轻量级或者说半轻量级的验证来确保我们的事务是有效的
52:31 - 52:35
so if you have very few very few conflicts
So，如果你执⾏的事务中⼏乎没有什么冲突
52.35-52.41
even better if all your transactions are essentially just doing read-only work
更好的情况是，如果你的事务所做的都是只读型⼯作
52:41 - 52:43
and if the access disjoint sets of data
并且它们访问的都是不相交的数据集
52.43-52.45
then this these protocols work very well
那么，这些协议的效果就会⾮常好
52.45-52.48
because they're actually not doing much work at all aside from doing some local data
copying
因为它们除了会去制作本地数据副本以外，它们并不会做太多⼯作
52:49 - 52.53
Right, another way to think about this is that
思考它的另⼀种⽅法是
52.53-52.57
if you have a very large workspace and very small transactions
如果你的数据库很⼤，并且你要执⾏的事务数量也不多
52.57-53.02
and the probability of these transactions overlapping in the read and write set is very
low
同时，这些事务在read set和write set上重叠的可能性⼜⽐较低
53:02 - 53:03
in this specific scenario
在这种特定情况下
53.03-53.06
these optimistic concurrency protocols work very well
这些乐观并发控制协议的效果会⾮常好
53:07 - 53:08
on the other hand
另⼀⽅⾯
53.08-53.11
in very highly contentious workloads
在那些存在着很多冲突的workload中
53:11 - 53:12
what ends up happening is that
最终会发⽣的事情是
53.12-53.14
you have transactions consistently restarting right
你的事务始终会反复重启
53:14 - 53:19
so they do a lot of work in their work phase
So，在它们执⾏阶段，它们会做⼤量的⼯作
53:20 - 53:22
assuming if there is no contention
假设，如果这⾥⾯没有冲突的情况发⽣
53.22-53.27
and then and only at the very end do they figure out oh crap all this work that I've done
is kind of useless after we start
只有到了最后，它们发现：Oh，⾃我开始执⾏后，我所做的所有⼯作都是⽆谓的消耗
53:27 - 53:33
right so you're kind of deferring a lot of the heavy lifting towards the end
So，你就会将很多繁重的⼯作都放到最后去做
53.33-53.35
assuming that there won't be a lot of heavy lifting
假设这⾥并没有那么多繁重的⼯作
53:35 - 53:38
but in the contentious work though there is heavy lifting
但在冲突很多的workload中，这⾥⾯就存在着那些繁重的⼯作
53.38-53.41
because your sense they have to abort everything you've done
因为它们必须中⽌你已经完成的所有东⻄
53:41 - 53:44
so really I think the the the research sort of shows that
So，这⾥的研究表明
53.44-53.46
in contentious workloads
在这些冲突很多的workload中
53.46-53.53
both two-phase locking and optimistic concurrency protocols generally don't work,
两阶段锁和乐观并发协议通常来讲都不可⾏
53.53-53.54
they're sort of like almost equivalent
它们的效果⼏乎是⼀样的
53:54 - 53:58
so when 2PL simply acquiring there's there's a lot of contention on locks
So，在两阶段锁中，它⾥⾯存在着⼤量争抢锁的情况
53:59 - 54:02
so you have transactions waiting and these hot locks
So，你需要让事务去等待获取这些热⻔的lock
54.02-54.07
here you have transactions that are doing all their work almost wasteful work ,and then
aborting at the very end
这⾥你会遇上那些做了很多⽆⽤功的事务，它们在最后的时候被中⽌
54:07 - 54:10
so neither really work for contentious workloads
So，这对于那些存在着冲突的workload来说，该协议的效果并不好
54:11 - 54:13
but if your workload is it has very low contention
但如果你的workload中所存在的冲突数量并不多
54.13-54.17
, then in general these optimistic protocols work better
那么，通常来讲，使⽤这些乐观协议的效果会很不错
54:17 - 54:20
because they have no overhead
因为它们并没有什么开销
54.20-54.23
and very very minimal override aside from some local data copy
并且它们对本地数据副本也只做最⼩程度的覆写
54:23 - 54:25
okay whereas in the 2PL protocol
然⽽在两阶段锁中
54.25-54.26
you actually have to acquire locks
实际上，你必须去获取这些lock
54.26-54.30
, even if there's no logical reason that you should be acquiring these locks
即便没有什么逻辑上的理由，你也应该去获取这些lock
54:36 - 54:36
Yeah
54:53 - 54:56
so the timestamps are assigned at validation
So，我们会在验证的时候分配这些时间戳
54:57 - 54:57
yeah
55:19 - 55:22
I think what you're describing is essentially basic timestamp order ,right
我觉得你所描述的本质上来讲就是Basic Timestamp Ordering
55:23 - 55:27
so in basic timestamp ordering，you assign the timestamps when the transaction begins
So，在Basic Timestamp ordering中，你会在事务开始的时候分配时间戳
55:27 - 55:28
In OCC
在OCC中
55.28-55.34
the protocol dictates that you assign the timestamps at validation time
该协议会让你在验证阶段的时候分配时间戳
55:34 - 55:39
because you want to defer the work of doing the actual checking to when you're ready
to commit
因为你会将这些实际的检查⼯作延迟到你准备提交事务的时候再做
55:39 - 55:46
whereas basic timestamps ordering is saying ,every operation I'm going to perform, I
want to do a check to make sure that this is a valid operation
Basic timestamp ordering表示，我会对我要执⾏的每个操作进⾏检查，以确保这是⼀个有效操
作
55:47 - 55:48
so just how the protocol works
So，这就是该协议的⼯作⽅式
55:50 - 55:50
yeah
55:58 - 56:04
you still need to make a local copy even if you're reading to ensure repeatable reads
即使你是在进⾏读操作的时候，你也依然需要制作⼀份本地副本以⽀持可重复读
56:11 - 56:18
right so this slide is essentially just saying that for low contention workloads, these
optimistic concurrency protocols work very well
So，这张幻灯⽚上的内容是，当你workload中存在的冲突数量不多时，这些乐观并发协议的效
果就会很好
56:18 - 56:19
because they have very little overhead
因为它们⼏乎没有什么开销
56.19-56.22
in comparison to two-phase locking
⽐起两阶段锁来说
56.22-56.26
which you know even if you have disjoint working sets between transactions
即使你在事务间的working set是不相交的
56:26 - 56:28
you still have to have transactions require locks
你依然会要求这些事务去获取锁
56.28-56.31
,whereas here there's no locks at all
但如果是OCC的话，就根本不需要⽤到锁
56:45 - 56:47
this guy yeah you're right
你说的没错
56:47 - 56:50
so you don't have to acquire like a database of a lock
So，你不需要去获取数据库中的lock
56.50-56.51
, you still have to require latches
你依然需要去获取latch
56.51-5656
, you still have to make sure the integrity of the data structure is valid
你依然需要去确保该数据结构的完整性是有效的
56:56 - 56.59
Right you can't just blindly overwrite stuff in memory
你⽆法盲⽬地去覆写内存中的数据
56.59-57.02
,because there could be concurrent access to these structures
因为这可能存在着并发访问这些结构的情况
57:02 - 57:06
so I think you're kind of hitting on the point that we will talk about it I think in this slide
So，我觉得你讲到我们要讲的重点了，应该是在这个幻灯⽚上
57:08 - 57:12
yeah so there is a little bit of work overhead in OCC right
So，使⽤OCC的时候，我们会有⼀些开销
57:12 - 57:15
because you have to maintain local copies of everything that you want to read and write
因为你需要去维护你想要进⾏读写操作的那些对象的本地副本
57:15 - 57:16
so if you're updating a billion tuple
So，如果你要更新⼗亿个tuple
57.16-57.17
you have to make a billion copies
你就必须制作⼗亿个副本
57.17-57.20
every transaction has to make a billion copies
每个事务都必须制作⼗亿个副本
57:20 - 57:22
and so there's a lot of overhead here
So，这⾥⾯就存在着⼤量的开销
57:23 - 57:27
the other thing is that the validation and the write phase is, they were happening serially
right
另⼀件事情是，验证阶段和写阶段会按顺序执⾏
57:28 - 57:30
the only one transaction can be validating at a time
⼀次只会有⼀个事务进⾏验证
57:31 - 57:33
in reality you know in real systems
在真正的系统中
57.33-57.35
you have parallel validation and parallel writing
你可以进⾏并⾏验证和并⾏写
57:35 - 57:39
but again even those in those scenarios these phases become a big bottleneck
但在这些情况下，这些阶段会变成⼀个巨⼤的瓶颈
57:41 - 57:42
and lastly
最后
57.42-57.45
because we're being optimistic
因为我们使⽤的是乐观⽅案
57.45-57.51
we're assuming that we can perform all of the work with ,you know safely without being
interrupted by other transactions
我们假设我们执⾏的所有操作都不会被其他事务所打断
57:51 - 57:53
But in contentious workloads
但在那种存在冲突的workload中
57.53-57.54
that's not the case
这就不会是这种情况了
57.54-57.55
right that assumption is invalidated
这种假设就是⽆效的了
57:55 - 57:58
so in contentious workloads routing all this work upfront
So，在这些存在着冲突的workload中，我们会将所有的⼯作放在眼前
57:59 - 58:01
and then we could find out later that we actually have to abort
然后，我们就能找出我们需要中⽌的那些⼯作
58:01 - 58:03
so all of this work is wasted
So，所有这些被中⽌⼯作做的都是浪费的⽆⽤功
58.03-58.06
we're being optimistic and we're being wrong about that optimism
我们使⽤的是乐观⽅案，但我们对这种乐观的看法是错误的
58:11 - 58:13
so when a transaction commits
So，当⼀个事务要提交的时候
58.13-58.21
I think that the student was pointing this out correctly
我认为之前有学⽣正确地指出了这⼀点
58:21 - 58:25
even if the transactions logically don't overlap with each other
从逻辑上来讲，即使这些事务彼此不会重叠
58:26 - 58:31
you still have to make sure that you maintain the physical integrity of the data structure
you're gonna be looking at
你依然必须确保你要去维护你所查看的数据结构的物理正确性 (知秋注：不会因为并发操作，使
程序中的⼀个对象内部数据状态发⽣异常)
58:31 - 58:34
so as part of the validation phase
So，在执⾏验证阶段的时候
58.34-58.40
you have to look at oh I have you know all these other thousand transactions, I have to
look inside read and write sets in a consistent way
你会看到所有这些数以千计的事务，我不得不深⼊其中通过⼀种可以保证⼀致性的操作⽅式来查
看read和write set
58:41 - 58:45
I make this consistent by acquiring latches right
我通过获取latch来让它们保持⼀致
58:46 - 58:49
so this latch overhead it can actually play a big role
So，这种获取latch的开销实际上扮演了⼀个重要⻆⾊
58.49-58.52
even if they're logically just disjoint
即使从逻辑上来说，它们是不相交的
58.52-58.55
physically they're still contending on the same data structures
从物理上来讲，它们依然在抢夺同⼀个数据结构
58:55 - 58:59
right there so contending on the read and write data sets，even though logically they're
disconnected
即使在逻辑上read set和write set是不相交的，但它们依然存在着争抢问题(知秋注:如果并发验
证，那就会可能同时有多条线程查看同⼀个事务中本地保存的数据，这就会需要latch)
59:00 - 59:01
yes
请讲
59.01-59.03
so when I'm doing my validation right
So，当我在执⾏验证的时候
59:04 - 59:06
I have one transaction and me ,I'm ready to validate
我有⼀个准备进⾏验证的事务
59.06-59.09
I have to go into his read and write transaction set to make sure that we don't intersect
我必须去查看它的read set和write set，以确保它们是不相交的
59:10 - 59:10
all right
59.10-59.11
but he could be modifying it
但它可以对数据进⾏修改
59.11-59.14
because he's still running ,he or she's still running right
因为这个事务依然在执⾏
59:14 - 59:15
so I have to acquire latch
So，我需要去获取latch
59.15-59.20
read a consistent view of it ，perform the intersection to make sure I'm okay
并读取到该数据的⼀个⼀致的状态
以这种⼀致性的⽅式来对它操作，以保证可以执⾏的很OK
59:20 - 59:24
and this other transaction can't modify that that said while I'm reading it
当我正在读取这个数据的时候，其他事务⽆法对该数据进⾏修改
59:29 - 59:34
but I'm reading the local copy, I'm reading that transactions local copy of the working set
你说的是，如果我读取的是该事务⾃⼰的本地副本数据？
59:37 - 59:44
Because the table doesn't have all of the updates that have been applied that this
transaction has read and written to write
因为数据库表中并没有更新该事务所做的所有更新
59:44 - 59:46
the transaction has a local copy of reads and writes
该事务对本地副本进⾏了读写操作
59:46 - 59:50
so to see if this transaction has read a value that I'm writing to
So，为了弄清楚该事务读取到的值是否是我正在写⼊的那个值
59:51 - 59:53
I only know that by looking at his read write set
我只有通过查看该事务的read set和write set，我才能知道这个
59:54 - 59:55
I don't know that by looking at the table
看数据库表，我是看不出这些的

18-04
18-04
01:00:00 - 01:00:06
so I have to look at the local working copies for all the other transactions as part of my
validation
So，在我验证的时候，我需要查看其它所有事务的本地数据副本
01:00:07 - 01:00:09
and I do that and in order to do that in a consistent way
为了以⼀致的⽅式做到这点
1.00.09-1.00.10
I have to acquire latches
我需要去获取latch
1.00.10-1.00.13
,and this latch is these latches can have some overhead
使⽤这些latch会给我们带来⼀些开销
01:00:14 - 01:00:14
yeah
请讲
01:00:27 - 01:00:32
yeah there's this ,yeah there's there's a lot of techniques that you can use to reduce the
latch contention
我们可以使⽤很多技巧来减少这种latch的争抢
01:00:32 - 01:00:35
But at the end of the day like if you even if you have a parallel sighting
但最终如果你以并⾏的⻆度来看待这个的话
1.00.35-1.00.36
,there is some overhead ,right
这其实还是有⼀定开销的
01:00:40 - 01:00:44
so what if we take a slightly different view right
So，如果我们以⼀种略微不同的⻆度来看呢？
01:00:44 - 01:00:49
what if we partition the entire database
如果我们对整个数据库进⾏分区会怎么样呢？
01:00:50 - 01:00:51
so that
这样的话
1.00.51-1.0051
all of the stuff that one transaction has to work on is only within one transaction
⼀个事务需要处理的所有东⻄都是只局限在这个事务中的
⼀个事务所有的⼯作都只在⼀个分区上
01:00:54 - 01:01:00
and then I can remove all of my locks and latches altogether ,is that even possible
那么我就可以移除掉我所有的lock和latch，这种做法可⾏吗？
01:01:00 - 01:01:02
so it turns out that this is a valid technique
So，事实证明，这是⼀项有效的技术
1.01.02-1.01.06
and it's called partition-based T/O
它叫做Partition-Based Timestamp Ordering
01:01:06 - 01:01:07
the idea is
它的思路是
1.01.07-1.01.13
that I want to split up my database into these horizontal partitions, right
我想将我的数据库拆分为这些⽔平分区
01:01:13 - 01:01:19
and then I want to be able to use timestamps to order the transactions on a partition in
serial order
接着，我想能够通过时间戳来对该分区所涉及的事务进⾏排序，让它们以Serial Order的顺序执
⾏
01:01:20 - 01:01:23
right so if I have transactions executed executing serially
So，如果我的事务按顺序执⾏
1.01.23-1.01.28
then there's no reason, I'm sorry within a database there's no reason to have locks and
latches at all
那么在⼀个数据库中，我们根本也就没理由去使⽤lock和latch了
01:01:28 - 01:01:29
because there's no concurrent activity
因为这⾥⾯不存在并发
01:01:31 - 01:01:33
right if they're operating single-threaded,
如果它们是单线程执⾏的话
1.01.33-1.01.36
I don't need lights,I don't need locks, I don't need latches
我也就不需要⽤到lock和latch了
01:01:39 - 01:01:44
and then it gets a little bit complicated ,if you have to access multiple of these database
partitions
如果你需要访问多个数据库分区，那么情况就会变得有些复杂
01:01:44 - 01:01:47
but if you're only accessing all the data within one partition
但如果你访问的只是⼀个分区中的所有数据
1.01.47-1.01.50
then it can be potentially really really fast
那么，它的速度就会变得很快很快
01:01:50 - 01:01:53
and this is sort of what partition based time step ordering is trying to achieve
这就是Partition-Based Timestamp Ordering所试着做到的事情
01:01:54 - 01:01.56
let's let's walk through an example
我们来看个例⼦
1.01.56-1.01.56
,so imagine that
So，想象⼀下
1.01.56-1.02.00
I have this the schema
我拥有这样⼀个schema
1.0200-1.02.02
that represents some online store that I'm running
它表示的是我所运营的那个在线商城
01:02:02 - 01:02:06
I have customers, orders, and the the oitems,
我有三张表，即customer表，orders表以及oitems表
1.02.06-1.02.10
the items in the order for an order
oitems的意思是某个order所涉及的item
01:02:10 - 01:02:12
what I could potentially do is
我可以做的事情是
1.02.12-1.02.14
because I have these foreign key references
因为这⾥⾯我有⼀些外键引⽤
01:02:15 - 01:02:25
I can store within one partition of the table a set of customers all of their orders and all
of the items for their orders, by using this foreign key reference structure
通过使⽤这种外键引⽤结构，我可以将⼀些客户信息、他们所对应的订单信息以及订单中所涉及
的商品信息都保存在⼀个分区中
01:02:27 - 01:02:27
okay
1.02.27-1.02.28
so imagine that
So，想象⼀下
1.02.28-1.02.29
I have two databases now
现在我有两个数据库
1.02.29-1.02.36
where I have customers 1 - 1000 and 1001- 2000 in a separate database
我将c_id从1到1000的客户信息放在⼀个数据库中，c_id从1001到2000的客户信息放在另⼀个
数据库中
01:02:36 - 01:02:39
And I want to I don't know let's say, I want to update a customer's name
假设，我想去更新某个客户的名字
1.02.39-1.02.43
I want to add in order to one customer's order
我想对某个客户的订单信息进⾏修改
01:02:43 - 01:02:45
right what do I do
我该怎么做呢？
01:02:46 - 01:02:49
so a transaction I have an application here
So，这⾥我有⼀个应⽤程序
1.02.49-1.02.50
it begins a transaction
它开启了⼀个事务
1.02.50-1.02.50
and let's say that
假设
1.02.50-1.02.55
it's trying to update customer one ,it falls into this partition here
它试着去更新c_id为1的客户信息，它会落到这个分区中
01:02:56 - 01:02:59
so okay it's missing something
Ok，这⾥少写了点东⻄
01:02:59 - 01:03:06
so assume that in this line ,there's a there's an operation that says get me the name of
the customer whose ID is one
So，假设这条箭头上写了这样⼀个操作，该操作想去获取c_id为1的那个客户的名字
01:03:06 - 01:03:09
okay that's an operation that obviously falls into this partition
Ok，显然这个操作是在这个分区中执⾏的
1.03.09-1.03.10
because this customer belongs in this partition
因为这个客户属于这个分区
01:03:12 - 01:03:14
Right and then it does commit
接着，它提交事务
1.03.14-1.03.17
and it can safely do that right
它能够安全地做到这些
01:03:17 - 01:03:22
because all of these transactions get queued up and operated in a single thread in this
database
因为所有的事务都会放在⼀个队列中，在数据库中，我们会以单线程的⽅式来执⾏这些事务
01:03:22 - 01:03:24
there's no concurrent activity at all
这⾥⾯并不存在任何并发⾏为
01:03:25 - 01:03:25
Similarly
类似的
1.03.25-1.03.33
I can have another application server that wants to update the customer 1004 that'll go
here
接着，我有另⼀个应⽤程序服务器，它想去更新c_id为1004的customer，它应该跑到下⾯这个
分区这⾥
01:03:35 - 01:03:38
and these two transactions are totally disjoint
这两个事务是完全不相交的
1.03.38-1.03.39
they're operating on different customers
它们操作的是不同的customer
1.03.39-1.03.44
,that's one way that we get parallelism even though each database is operating single
threaded
这就是我们获得并⾏能⼒的⽅式，即便是每个数据库都只能操作⼀条线程，我们也可以做到
01:03:44 - 01:03:50
okay the finer grain that we can have these customers ,we can store these these
database partitions, the more parallelism we can get
如果我们将数据库分区分的粒度越细，那么我们所获得的并⾏性就越⾼
01:03:51 - 01:03:54
and that way each individual transaction runs much faster
这样的话，每个事务执⾏的速度就会变得更快
1.03.54-1.03.56
because we don't have to acquire locks and latches
因为我们不需要再去获取lock和latch了
01:03:57 - 01:04:02
and we get parallelism by having more of these transactions when it concurrently on
disjoint sets of the data
当更多事务以并发的⽅式去访问那些不相交的数据集时，我们的并⾏性就越⾼
01:04:04 - 01:04:05
is that clear
懂了吗
01:04:06 - 01:04:06
all right
01:04:09 - 01:04:11
so this turns out to be a very popular protocol
So，事实证明，这是⼀个很流⾏的协议
01:04:12 - 01:04:19
you still have to assign transactions and ID and then you queue them up by these IDs
你依然需要给这些事务分配id，接着，你需要根据这些id对这些事务进⾏排序
01:04:20 - 01:04:26
And the this type of partition based protocol has been actually very very very successful
实际上，这种基于分区的协议⾮常成功
01:04:27 - 01:04:29
so Andy worked on this system called H-store which is a commercial system
So，Andy以前开发的H-Store，它是⼀个商⽤数据库系统
01:04:31 - 01:04:33
that now get that got commercialized into VOLTDB
它的商业化产物就是VoltDB
1.04.33-1.04.37
and they're still using this type of partition based T/O
他们使⽤的依然是这种Partition-Based Timestamp Ordering
01:04:37 - 01:04:41
Andy worked with the someone called a professor called Daniel Abadi
Andy当时和⼀个叫做Daniel Abadi的教授⼀起⼯作
1.04.41-1.04.41
now,who's at I think Maryland
他是⻢⾥兰⼤学的教授
1.04.41-1.04.44
now who did some initial work on a system called Calvin
他为⼀个叫做Calvin的系统做了些初步⼯作
1.04.44-1.04.49
,that's now been commercialized into fauna that also uses something very similar to this
它的商业化产物叫做Fauna，该系统也使⽤了和它相类似的东⻄
01:04:49 - 01:04:51
And there's a system called KxDB
这⾥还有⼀个叫做KxDB的东⻄
1.04.511.04.52
which is of like a financial database
它是⾦融领域⽤的数据库
01:04:53 - 01:04.54
and they also use this technique
它们也使⽤了这种技术
1.04.54-1.04.59
and it's actually pretty successful if your work votes of supports this type of partition
based operation
实际上，如果你的系统也⽀持这种Partition-Based Timestamp Ordering的话，你的系统就会
⾮常成功
01:05:02 - 01:05:04
the way that you can view this is that
你看待这项技术的⽅式是
1.05.04-1.05.07
every single database essentially has a giant lock or a latch around it
本质上来讲，每个数据库上都被加了⼀个巨⼤的lock或者latch
01:05:07 - 01:05:09
and when a transaction is ready to commit
当⼀个事务准备好提交的时候
1.05.09-1.05.10
,it acquires this latch
它会获取这个latch
1.05.10-1.05.17
,and it begins execution within the database fully single threaded bare metal speed
它会以单线程的⽅式来执⾏对该数据库的操作，执⾏速度和裸机速度⼀样
01:05:17 - 01:05:19
And then as other transactions come up
当其他事务出现的时候
1.05.19-1.05.21
they queue up on this latch
它们会排队获取这个latch
1.05.21-1.05.22
, and they essentially get assigned a timestamp
本质上来讲，我们会给它们分配⼀个时间戳
01:05:23 - 01:05:25
And then as their timestamp gets gets ringed up
当轮到它们执⾏的时候
1.05.25-1.05.29
,they begin execution into this database into this into this database partition
它们就会开始对该数据库分区进⾏操作
01:05:34 - 01:05:36
okay yeah so that's it
Ok，这块就讲完了
1.05.36-1.05.38
so for reads
So，我们再来看下读操作⽅⾯的事情
01:05:41 - 01:05:47
The database that the transactions can essentially read whatever they want right now
safely without requiring latches
本质上来讲，在不获取latch的情况下，事务可以读取任何它们想读取的东⻄
01:05:47 - 01:05:51
because they came Garon the database system guarantees, that there's no other
transaction running in the system
因为数据库系统保证此时并没有其他事务在系统中运⾏
01:05:53 - 01:05:57
this is great if you only want to read stuff within one database partition
如果你只想在⼀个数据库分区中读取数据，那这就很棒
01:05:57 - 01:06:04
it gets complicated when you want to try to read rows that exist across partitions
当你想试着去读取存在于多个数据库分区中的⼏⾏数据时，情况就会变得复杂
01:06:04 - 01:06:11
so in the application server we had before, let's say that you want to modify within one
transaction customers from two different partitions ,that becomes complicated
So，假设我们之前的应⽤程序服务器想通过⼀个事务来对两个不同分区内的customer信息进⾏
修改，那么情况就会变得复杂
01:06:11 - 01:06:17
because now I have to acquire the lock for one partition ,and acquire a lock for the other
partition ,before I can do any sort of operation
在我可以执⾏任何操作之前，我必须要获取这个分区的lock，以及另⼀个分区的lock
01:06:17- 01:06:18
okay
1.06.18-1.06.23
and oftentimes it's not even possible to know a priori all of the partitions and have to
touch it
有时，它们甚⾄不⽤知道有哪些分区，也不⽤去接触它们
01:06:23 - 01:06:31
so some systems what they actually do is they'll run the system in sort of like a like a
speculative or like reconnaissance mode to figure out all the partitions I need to access
So，有些系统在它们运⾏的时候，它们会使⽤⼀种推测或者侦查模式来弄清楚我需要访问的分
区有哪些
01:06:31 - 01:06:36
and then rollback acquire all the locks ahead of time and then begin execution
接着，如果回滚的话，它提前需要获取到所有的lock，接着开始执⾏
01:06:36 - 01:06:39
all right,yeah
01:06:39 - 01:06:41
so that's essentially what this is talking about,
So，简单来讲，这就是这⾥所谈论的内容
1.06.41-1.06.45 ！！
if I have to access cross partitions across partition rows
如果我需要跨分区访问⼀些⾏数据
01:06:45 - 01:06:50
I have to abort and restart and acquire the new locks the new set of locks that I've
discovered during execution
那我就需要中⽌并重启该事务，然后获取新的lock
01:06:51 - 01:06:52
and this can be wasteful
这就很浪费性能了
01:06:52 - 01:06:56
so if you you have to be kind of careful about when you want to apply partition based
timestamp ordering
So，当你使⽤这种Partition-Based timestamp ordering技术的时候，你就需要注意这个问题
01:06:59 - 01:07:03
So in contrast to regular T/O and OCC
So，与常规的Timestamp Ordering协议和OCC相⽐
1.07.03-1.07.05
, I can now apply all my updates in place
我可以直接在数据库中提交我的修改
01:07:06 - 01:07:09
right so when OCC and basic T/O
So，当使⽤OCC和Basic Timestamp Ordering的时候
1.07.09-1.07.12
I had a private workspace that or data plot that I have to apply my updates
我需要在我的私有空间中对数据副本进⾏更新操作
01:07:12 - 01:07:18
so that I don't conflict with other transactions that are running concurrently that want to
read the same stuff that I'm writing
So，这样我就不会与其他并发执⾏的事务产⽣冲突，它们想去读取我正在修改的对象数据
01:07:18- 01:07:19
okay
1.07.19-1.07.23
but here the goods the system guarantees that there's only one transaction running at a
time
但在这⾥，该系统保证同⼀时间只有⼀个事务在执⾏
01:07:24 - 01:07:25
I can apply my updates in place
我可以在数据库中直接更新数据
01:07:26 - 01:07:27
and of course
1.07.27-1.07.30
I have some extra logic to ensure that when I abort I undo those changes
我需要⼀些额外逻辑来确保当我中⽌事务时，我要撤销这些已经执⾏的修改
01:07:30 - 01:07:32
but I can do this without making a local copy
但我可以在不需要制作本地副本的情况下做到这点
1.07.32-1.07.42
so I've reduced the data copying overhead that would normally exist in OCC systems
So，这样我就减少了通常存在于OCC系统中那些数据复制所带来的开销
01:07:42 - 01:07:49
and in the case if I try to modify a tuple that exists in a different partition than when I'm
running on right now
在某种情况下，如果我试着对⼀个tuple进⾏修改，它所在的分区与我事务所在的分区不是同⼀
个分区
01:07:49 - 01:07:50
I'll abort
我就会中⽌该事务
1.07.50-1.07.51
restart
并重启该事务
1.07.51-1.07.56
get a lock on both database partitions and then begin my execution
接着，我会去获取这两个数据库分区的lock，然后开始执⾏该事务
01:07:56 - 01:07:56
yeah
请讲
01:08:13 - 01:08:14
no no
NO
1.08.14-1.08.17
because every database has only one transaction execution thread
因为每个数据库都只有⼀个事务执⾏线程
1.08.17-1.08.21
,every partition has one transaction execution thread
每个分区都有⼀个事务执⾏线程
01:08:23 - 01:08:26
right that's sort of one reason why you want to do this
这就是你为什么想这样做的其中⼀个理由
1.08.26-1.08.28
because you by having only one thread
因为如果你只有⼀条线程
1.08.28-1.08.32
,you don't have to copy, you don't have to have a locks and latches
你就不需要去复制数据，并且也不需要去获取lock和latch
01:08:32 - 01:08:32
yes
请讲问讲
01:08:48 - 01:08:51
yeah so I think they're ways into the remedy
So，我觉得这有办法进⾏补救
1.08.51-1.08.54
, this way as you have if you if you have a deterministic order that you acquire the locks
So，如果你在获取lock时有确定的获取顺序
1.08.51-1.08.56
that's one way to alleviate this problem
这是减轻该问题的⼀种⽅式
01:08:56 - 01:08.58
but I think you're sort of alluding to the fact that
但我觉得你所暗示的东⻄是
1.08.58-1.08.59
,you could have the case
你可能会遇上这种情况
1.08.59-1.09.04
where you keep learning during execution that you have that you're touching different
partitions
在你执⾏事务的期间，你会去接触不同的分区
01:09:04 - 01:09:05
so you do a bit of work
So，当你做了⼀些⼯作后
1.09.05-1.09.10
,realize you have to acquire a lock for a partition that you don't have
你意识到你需要去获取⼀个你还未接触分区所对应的lock
01:09:10 - 01:09:12
abort retry get further in the execution
接着你会中⽌该事务，并重新执⾏该事务，接着取得⼀些进展
1.09.12-1.09.15
realize you have to acquire a different lock and a different partition
你意识到你需要去获取⼀个不同分区所对应的lock
1.09.15-1.09.16
abort and then restart
你会中⽌并重启该事务
01:09:16 - 01:09:20
and this you hope sort of incrementally grow the set of locks that you have to acquire
你希望你会逐步增加你需要获取的lock的数量
01:09:21 - 01:09:22
because you don't know a priorily
因为你事先不知道要获取哪些lock
01:09:51 - 01:09:58
yeah but you see so you solve that problem by having that these transactions acquire the
locks in a specific order ,and in a deterministic order
但你们能看到，如果我们以某种特定顺序来让这些事务去获取lock，我们就能解决这个问题
01:09:58 - 01:10:00
so you have let's say a partition a and B
So，假设我们有两个分区，即分区A和分区B
1.10.00-1.10.03
you have t1 t2 try to access s a and B
接着，我们有T1和T2两个事务，它们要试着去访问A和B这两个分区
01:10:04 - 01:10:05
they realize that they need different partitions
它们意识到它们需要去获取不同分区对应的锁
1.10.05-1.10.07
then they restart the abort
接着，它们中⽌并重启事务
01:10:07 - 01:10:09
and now they all acquire a and they all acquire B
现在，它们就会去获取到A分区对应的lock以及B分区对应的lock
1.10.09-1.10.10
,and then they get queued up
接着，它们就会进⼊⼀个队列排队
1.10.10-1.10.12
and they get executed in that order
它们就会以这个顺序执⾏事务
01:10:14 - 01:10:17
All right all right
1.10.17-1.10.21
so that's essentially partition based T/O
So，本质上来讲，这就是Partition Based Timestamp Ordering
01:10:21 - 01:10:23
This is sort of a visual illustration of what's going on
我们⽤图⽚来解释这⾥发⽣了什么
01:10:25 - 01:10:29
let's say you have two servers that are both trying to access some customer data in this
first partition
假设这⾥两个服务器都要试着去访问第⼀个分区中的某个客户数据
01:10:30 - 01:10:32
the issue a begin request
它们发起了⼀个BEGIN请求
1.10.32-1.10.33
they get queued up in this transaction queue
它们就会进⼊⼀个事务队列进⾏排队
1.10.33-1.10.35
they get assigned timestamps
它们就会被分配时间戳
1.10.35-1.10.37
assume that server one gets timestamp 100
假设服务器1拿到的时间戳是100
1.10.37-1.10.39
server 2 it gets timestamp 101
服务器2拿到的时间戳是101
01:10:42 - 01:10:43
obviously
显然
1.10.43-1.10.48
the database system will take the transaction with the lowest timestamp in this case the
the one from server1
数据库系统会先执⾏时间戳较低的那个事务，即这个例⼦中服务器1所发起的那个事务
01:10:48 - 01:10:49
it begins execution
它开始执⾏事务
1.10.49-1.10.53
acquired by acquiring a lock on this on this database partition
它会去获取这个数据库分区对应的lock
1.10.53-1.10.57
, it finishes its execution
接着，该事务执⾏完毕后
01:10:57 - 01:11:02
it does it sorry it's doing a bunch of work it's getting the customer ID, and it's updating
the stuff the animations are a little bit wonky
它这⾥做了⼀系列⼯作，它拿到了custome id，它对该tuple进⾏更新，这⾥的动画有点不对
01:11:02 - 01:11:03
But then it does a commit
但接着，服务器1提交了该事务
1.11.03-1.11.06
,it's safe
这样做是安全的
1.11.06-1.11.08
, because nothing else is running at the same time
因为同⼀时间没有其他东⻄在执⾏
01:11:08 - 01:11:15
so now this partition can now move up this this request from server2 up in the queue
So，现在服务器2所发出的这个请求就可以排到队列的前⾯
1.11.15-1.11.18
, begin execution acquire the lock
开始执⾏该事务，并获取lock
01:11:18 - 01:11:20
and then the whole cycle continues
然后执⾏这整个过程
01:11:22 - 01:11:22
all right
01:11:26 - 01:11:29
as we've sort of talked about a little bit,
因为我们已经讨论过⼀些关于Partitioned Timestamp Ordering的东⻄了
1.11.29-1.11.32
these systems obviously are not a silver bullet
这些系统显然并不是什么万⾦油
01:11:32 - 01:11:34
right they have some performance issues
它们存在着⼀些性能上的问题
01:11:34 - 01:11:42
so these systems are very fast, if the database knows what partitions the transaction
needs before even beginning execution
如果数据库在开始执⾏这些事务前就知道这些事务需要⽤到哪些分区，那么这些系统的速度就会
很快
01:11:43 - 01:11:46
that's not really possible in a sort of an interactive transaction protocol right
在这种指令式事务协议中，这种做法并不现实
01:11:47 - 01:11:50
but you can remedy this by having stored procedures,right
但你可以通过存储过程来补救⼀下
01:11:50 - 01:11:51
in store procedures
在存储过程中
1.11.51-1.11.57
you declare everything on you you don't have to do round trips back and forth
你⽆须来回发送请求
01:11:57 - 01:11.58
and the database runs everything on the server side,
数据库会在服务器端执⾏所有东⻄
1.11.58-1.12.06
so can determine much quicker all of the locks the system needs before enduring
execution
So，这样可以更快地确定在事务执⾏过程中事务需要的lock有哪些
01:12:06 - 01:12:12
and if the transaction only touches one partition
如果该事务只接触⼀个分区
1.12.12-1.12.13
then obviously it's gonna be really fast
那么，显然这样就会⾮常快
01:12:13 - 01:12:15
but if it has to touch multiple partitions
但如果该事务要接触多个分区
1.12.15-1.12.20
and you have to do some execution abort retry by acquiring more locks
你就必须先执⾏⼀下该事务，接着中⽌该事务，获取更多的lock并重新执⾏该事务
1.12.20-1.12.21
,and then continue execution is again right
接着，继续执⾏该事务
01:12:22 - 01:12:22
so it becomes slower
So，这样系统就会变得更慢
01:12:23 - 01:12:26
But if your transaction only touches data within one partition
但如果你的事务只接触⼀个分区中的数据
1.12.26-1.12.28
, then you're essentially running bare metal speed
本质上来讲，你的执⾏速度就是裸机的速度
01:12:28 - 01:12:31
because it's single threaded right
因为它就是单线程执⾏
01:12:31 - 01:12:33
there's no locks, no latches
这⾥⾯没有lock，也没有latch
01:12:34 - 01:12:35
the other drawback is that
另⼀个缺点则是
1.12.35-1.12.38
if you have this multi partition setup
如果你拥有这种多分区设置
1.12.38-1.12.42
you could have some partitions that are essentially idle
你的有些分区可能就处于闲置状态
1.12.42-1.12.45
because you have one hot partition
因为你只有⼀个分区在被⼈访问
01:12:49 - 01:12:49
okay
1.12.49-1.12.53
so that that was essentially partition based T/O
So，本质上来讲，这就是Partitioned-Based Timestamp Ordering
1.12.53-1.12.58
, try to get through this as fast as possible
我试着尽可能快地讲下这个
01:12:57 - 01:13:00
so one of the assumptions that we've been making throughout this work is that
So，这⾥我们之前已经做了⼀个假设
1.13.00-1.13.03
the as transactions execute
当事务执⾏的时候
01:13:03 - 01:13:05
they don't really insert new data
它们不会真正地插⼊新数据
1.13.05-1.13.08
, they only modify data ,and they read data
它们只是修改数据和读取数据
01:13:08 - 01:13:08
okay
1.13.08-1.13.10
so when you now add the requirement
So，当你要添加这样的需求时
1.13.10-1.13.17
the data can it can be inserted, and updated ,and deleted and inserted during execution
即在执⾏事务的过程中，数据可以被插⼊，被更新，被删除
01:13:17 - 01:13:21
it violates some of the assumptions that we've been there that we've made in our
protocols
这就违反了我们协议中所制定的那些假设
1.13.21-1.13.22
and we have to handle them
我们需要处理这些问题
01:13:22 - 01:13:23
okay
1.13.23-1.13.26
and specifically introduces an interesting problem
特别是，这⾥⾯引⼊了⼀个我们感兴趣的问题
01:13:27 - 01:13:29
that's called the phantom problem
这叫做幻读问题
01:13:29 - 01:13:30
so imagine that
So，想象⼀下
1.13.30-1.13.32
we have the same sequence of execution here,
这⾥我们拥有和之前相同的执⾏序列
1.13.32-1.13.35
but now I'm using SQL statements instead of regular read and write operations
但现在我这⾥使⽤的是SQL语句，⽽不是那些常规的读写操作
01:13:36 - 01:13:38
and we have these two transactions t1 and t2 ,
我们有两个事务，即T1和T2
1.13.38-1.13.44
and we have this database here of people that have you know name and age and some
status
我们⼀张people表，它⾥⾯的字段有name，age以及status
01:13:44 - 01:13:50
so a transaction t1 that's performing that's getting the maximum the the oldest person
whose status is lit, okay
So，T1所做的事情就是获取年纪最⼤且状态为lit的⼈
01:13:51- 01:13:55
so let's assume that I runs ,and it figures out that the maximum age is 72
So，假设我们执⾏了这条SQL语句，并且知道了年纪最⼤值为72
01:13:55 - 01:13.56
and then we have this transaction t2
接着，我们还有⼀个事务T2
1.13.56-1.14.03
,that's essentially going to insert it into the same database with a new person whose age
is 96 ,who also happens to be lit
本质上来讲，T2会往同⼀个数据库中插⼊⼀个年龄为96，状态为lit的新纪录
01:14:04 - 01:14:04
all right
1.14.04-1.14.06
and then we get back here
接着，我们切换回T1
1.14.06-1.14.10
so it's the same t1 tries to re-execute the same query
So，T1试着去执⾏和刚才相同的查询
01:14:11 - 01:14:15
and it gets a different version it gets a different result from this query
它所执⾏的这个查询得到的结果和它第⼀次执⾏该查询时不同
01:14:15 - 01:14:16
so got 96 here
So，它得到的结果是96
1.14.16-1.14.18
and it got 72 here
之前，它所得到的结果是72
1.14.18-*1.14.20
today this is clearly a problem,right
很明显，这就是⼀个问题
01:14:21 - 01:14:24
can2 phase locking solve this
两阶段锁能解决这个问题吗
01:14:36 - 01:14:37
assume tuple access
假设对tuple加锁
01:14:39 - 01:14:40
who said no
有谁说了No
1.14.40-1.14.41
,why do you say no
你为什么说No
01:14:49 - 01:14:52
yeah exactly that's it that's exactly right right
说得完全正确
01:14:52 - 01:14:56
you can only access locks on on tuples that that exists
只有当tuple上存在lock的时候，你才能访问该tuple
01:14:59 - 01:15:02
so because there was new transaction that inserted a new tuple
So，因为这⾥有⼀个新事务，它要往数据库中插⼊⼀个新tuple
1.15.02-1.15.05
they didn't even have something to acquire a lock on, right
它们中的操作不需要⽤到lock
01:15:06 - 01:15:07
and that's clearly a problem
这很明显就是⼀个问题
1.15.07-1.15.08
and how do we solve this
我们该如何解决这个问题
1.15.08-1.15.10
if I want to ensure it's a realisability
如果我想确保它是可实现的
01:15:10 - 01:15:14
I have to ensure that I can ensure I can ensure repeatable reads，so if you saw this
phantom problem
So，如果我遇上这种幻读问题，那我需要确保这⾥可以进⾏可重复读
01:15:15 - 01:15:16
okay
1.15.16-1.15.19
so what if instead of acquiring locks on tuples
So，我⽆须去获取tuple所对应的lock
1.15.19-1.15.22
,I can acquire locks on abstract objects
我可以去获取那些抽象对象对应的lock
01:15:22 - 01:15:28
what if I can acquire a lock on an expression status Lit ,would that solve the problem
如果我可以获取某个表达式上（status = "lit"）的lock，这能解决这个问题吗
01:15:29 - 01:15:33
if I had a lock on all tuples that satisfy the condition status is equal to lit
如果我拿到了所有满⾜该条件（status='lit'）tuple对应的lock
01:15:35 - 01:15:36
who says yes
谁说了Yes？
1.15.36-1.15.39
one person
有⼀个⼈
1.15.39-1.15.39
who says no
有谁说了No？
1.15.39-1.15.42
who says they don't know
你们中有谁说他们不知道的吗？
01:15:44 - 01:15:45
okay so the answer is yes
So，答案是Yes
1.15.45-1.15.48
if you could have a powerful enough locking system
如果你有⼀个⾜够强⼤的locking系统
1.15.48-1.15.52
that you can have an expression that says status is equal to lid
那么你就可以通过⼀个表达式来表示status='lit'
01:15:52 - 01:15:54
you can solve this problem
你就可以解决这个问题
1.15.54-1.15.55
that would solve it for you
这会为你解决这个问题
01:15:56 - 01:15.56
all right
1.15.56-1.16.00
but the problem and that the term that we're talking about here is called predicate
locking
这⾥我们讨论的术语叫做条件锁（predicate locking）
01:16:01 - 01:16:04
that it's very very expensive to be able to do this
实现它的成本⾮常⾮常的⾼
1.16.04-1.16.07
and in fact I don't think any systems actually do that type of really complex logic
事实上，我并不相信有任何系统实际做到了这种复杂的逻辑
01:16:07 - 01:16:09
because it's very complex right
因为它实在是太复杂了
01:16:10 - 01:16:11
I gave you one example of status='lit'
我之前给你们看过status='lit'这个例⼦
1.16.11-1.16.14
,but we're actually talking about it's a multi-dimensional problem
但我们实际讨论的是⼀个多维问题
1.16.14-1.16.17
because you could have any arbitrary complex expression
因为你可能会有某种任意复杂度的表达式
01:16:17 - 01:16:22
and you want to ensure that the expression you're evaluating doesn't intersect with this
multi-dimensional space
你想确保你评估的这个表达式不与这种多维空间相交
01:16:23 - 01:16:24
so it's non-trivial to implement
So，它实现起来并不容易
1.16.24-1.16.25
so most systems don't do that
So，⼤部分数据库系统都不会去使⽤它
1.16.25-1.16.27
yes
请讲
01:16:32 - 01:16:36
yeah so you could acquire like a table level lock or a page level lock
So，你可以去获取表级别的lock或者page级别的lock
01:16:43 - 01:16:48
yeah so you could use these hierarchy locks that's one way to definitely solve it
So，你可以使⽤这种层级锁（hierarchy lock），使⽤它你肯定能解决这个问题
01:16:48 - 01:16:48
the other way to solve it is
解决该问题的另⼀种⽅式是
1.16.48-1.16.51
is this predicate locking that I was talking about which is more general-purpose
就是使⽤我刚才讨论过的条件锁，它更加通⽤
01:16:53 - 01:16:56
And there's another one called index locking
这⾥还有另⼀个东⻄，它叫做index locking
01:16:56 - 01:16:58
so if I have an index on the system
So，如果在系统中，我有⼀个索引
01:16:58 - 01:17:00
right let's say I have an index on this on the status attribute
假设，我们在status这个字段上建⽴了索引
1.17.00-1.17.01
,what I could do is
我所能做的事情就是
1.17.01-1.17.06
take a lock on the slot in the index where status is equal to lit
我会对索引中status="lit"的slot加锁
01:17:06 - 01:17:10
so that any new insertions have to go through the index and make an update
So，任何新的插⼊操作都需要去遍历索引，并对索引进⾏更新
1.17.10-1.17.13
they can't acquire that lock
它们⽆法获取到那个lock
01:17:13 - 01:17:13
okay
1.17.13-1.17.15
so that's another way to solve it
So，这是解决该问题的另⼀种⽅式
1.17.15-1.17.18
if the status lit doesn't even exist in the index
如果status="lit"并不在存在该索引中
1.17.18-1.17.21
what I have to do is acquire what's called a gap-lock
我需要做的就是获取⼀个叫做Gap Lock（间隙锁）的东⻄
01:17:21 - 01:17:24
so a gap in the index I acquire a lock on that gap
So，在索引中有⼀个空隙，我获取了该空隙对应的lock
01:17:25 - 01:17:30
so that if another insertion comes in that tries to insert statuses is equal to lit in that
space in the index
So，如果另⼀个插⼊操作试图将符合（status='lit'）条件的tuple插⼊索引中的这个空隙
01:17:31 - 01:17:32
it's not allowed to do that
我们不允许它这么做
01:17:34 - 01:17:40
okay so this that's that's two essentially two ways to do it
Ok，本质上来讲，我们可以通过这两种⽅式来做到这点
01:17:43 - 01:17:46
yeah so this essentially goes back to the point that was made earlier ,
So，本质上来讲，这⼜回到我们之前说的⼀件事了
01:17:46 - 01:17:46
if you don't have an index
如果你没有索引
1.17.46-1.17.48
and you don't have predicate locks
如果你也没要Predicate lock（条件锁）
1.17.48-1.17.56
, you could do it by locking every every page ,or you could do it by locking the entire
table ,or yeah hierarchical locks
那么你可以通过对每个page、或者整张表加锁来做到这点，或者使⽤hierarchical lock（层级
锁）
01:17:57 - 01:18:00
so I saw you know the last way to solve this problem is
So，解决这个问题的最后⼀种⽅法是
1.18.00-1.18.05
through just by repeating the scans by by the committing sorry before committing
在事务提交前，我们反复进⾏扫描
01:18:05 - 01:18:09
so I think one of the most popular systems that does this is hekaton which is from
Microsoft
So，其中⼀个使⽤了这种做法的系统就是微软的hekaton
01:18:09 - 01:18:11
so essentially everything before you commit
So，本质上来讲，在你提交事务前
1.18.11-1.18.17
you have to make sure that everything you read before happens just before you commit
to make sure can see you have consistent reads
你必须确保你读取到的所有东⻄都是在你提交事务前读取的（知秋注：即读的数据在你提交这⼀
刻，它就是最新的，若不是，就重启事务），这样可以确保你读取到的内容是⼀致的
01:18:17 - 01:18:18
I think we're out of time
我觉得我们的时间到了
1.18.18-1.18.24
, the last section was weaker isolation levels maybe we'll cover that in the next lecture
最后要讲的⼀部分就是Weaker Isolation Level，我们可能会在下节课的时候讲
01:18:25 - 01:18:28
all right all right that's it
All right，我讲完了




# Lec19 多版本并发控制

给数据增加历史版本。

几乎所有的关系型数据库都支持 MVCC 。

并发控制，版本管理，垃圾回收，索引管理，删除。

## 1. 并发控制

1. 时间戳。
2. OCC 。
3. 两阶段锁。

## 2. 版本控制

链表来记录版本。

简单追加：在数据的表中简单追加一行记录。头插和尾插两种方式。

![20220324222312](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324222312.png)

时间旅行存储：将历史版本单独放到一个表中。

![20220324222442](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324222442.png)

简单增量：增量存储。没有存历史数据，而是存历史数据的增量。

![20220324222705](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220324222705.png)

## 3. 垃圾回收

回收历史版本。

行记录级别的垃圾清理：后台有个线程单独的进行清理。一个优化策略：扫描的时候扫描被更新过的页。

事务级别的垃圾清理：以事务为单位清理和事物相关的所有版本。

## 4. 索引

辅助索引，逻辑地址，物理地址。

https://www.bilibili.com/video/BV1Ja411z7mc/?spm_id_from=pageDriver