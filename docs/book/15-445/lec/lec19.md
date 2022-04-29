19-01
19 - Multi-Version Concurrency Control
00:18 - 00:19
hi my name is Dana
Hi，我叫Dana
0.19-0.23
so I'm another one if Andy's PhD students
So，我是Andy的另⼀个Phd学⽣
0.23-0.29
and probably going to be the last of his PhD students to present to you, before he gets
back
我也可能是他回来之前，给你们上课的最后⼀个Phd学⽣了
00:30 - 00:35
so today I'm going to be presenting very last lecture on concurrency control
So，今天我要给你们上的是关于并发控制的最后⼀节课
00:37- 00:39
so before we start
So，在我们开始之前
0.39-0.39
a couple of reminders
要提醒你们两件事
0.39-0.45
the first is the project 3 is is due on Sun Nov 17th before midnight
⾸先要讲的是Project 3会在11⽉17号截⽌
00:46 - 00:48
we also released homework 4 last week
上周我们也放出了Homework 4的相关内容
0.48-0.52
,and then will be due on Nov 13th before midnight
它的截⽌⽇期是在11⽉13号
00:54 - 00:56
any questions before we begin
在我们开始之前，你们还有任何问题吗？
01:03 - 01:03
all right
1.03-1.08
so um today we are going to talk about Multi-Version Concurrency Control ,
So，今天我们要讨论的是多版本并发控制
1.08-
just make sure I just this here
01:11 - 01:16
so the first thing I want to point out about multi-version concurrency controls
So，关于多版本并发控制，我⾸先要指出的⼀点是
1.16-1.20
that its name is a misnomer and this may cause some confusion
它的名字有点⽤词不当，并且可能会引发⼀些误解
01:21 - 01:31
because it's not actually a concurrency control protocol like the ones that you've been
learning about in the past two lectures, which are timestamp ordering, OCC and twophase locking
因为实际上它并不是你们上两节课所学的那种并发控制协议，它并不是Timestamp Ordering、
OCC或者两阶段锁之类的东⻄
01:33 - 01:42
rather it's a way to architect the system when you have concurrent transactions running
by maintaining multiple versions
相反，它是构建系统的⼀种⽅式，即通过维护多版本数据来做到并发执⾏事务
01:42 - 01:46
so recall from last week your discussion of optimistic currency control
So，回想下上节课我们关于乐观并发控制的讨论
1.46-1.49
where transactions maintain a private workspace
我们的事务维护了⼀个私有空间
01:50 - 01:52
and anytime they read or wrote to an object
每当它们对⼀个对象进⾏读或者写操作的时候
1.52-1.56
it will copy that object into that private workspace
它会将该对象复制到它的私有空间中
01:57 - 02:01
well in the multi-version concurrency control is similar to that idea
Well，多版本并发控制的思路其实和这个思路很类似
02:01 - 02:08
except here instead of having a private workspace for each transactions where we
maintain these different versions
不同的地⽅在于，我们维护的是这些对象的不同物理版本，⽽不是为每个事务创建⼀个私有⼯作
空间
02:09 - 02:12 ！！！！
we're now going to have the version to be part of a global database
对于这个全局数据库部分数据，我们会有若⼲版本
02:13 - 02:19
and we're going to determine whether some version of it is visible to a particular
transaction
我们会明确该逻辑对象的某个物理版本是否对某个特定事务可⻅
我们会明确是否将某个版本数据对⼀个特定事务可⻅
02:23 - 02:33
so MVCC is used by almost every new database system that's been built in the past ten
years or some variant top of it
So，最近⼗年所出现的新数据库系统基本都⽤到了MVCC或者是它的变种
02:34 - 02:35
But it's not a new idea
但它并不是什么新的想法
02:35 - 02:39
so it's actually decades old,
So，实际上它已经出现⼏⼗年了
2.39-2.49
and the first reference to the idea was in a dissertation by PhD student MIT in 1978
它最先是由MIT的某个Phd学⽣在1978年的时候所提出的
02:48 - 02:57
so it wasn't until the early 80s at the first ,that the first implementations of it actually
came out
So，直到1980年代的时候，它的第⼀个实现才出现
02:58 - 03:00
and those came out of a company called DEC
这是由⼀个叫DEC的公司所实现的
3.00-3.03
and they were called Rdb/VMS
它们以前叫做Rdb/VMS
3.03-3.10
which stood for relational database for VMS or VAX ,which was an old operating system
它的全称是Relation Database for VMS/VAX，VAX是⼀种很古⽼的操作系统
03:10 - 03:13
and the other product was called InterBase
另⼀个产品叫做InterBase
03:13 - 03:16
so Dec used to be a major computer company
So，DEC过去曾是⼀个主流计算机公司
3.16-3.23
it was bought out by a Compaq in the late 90s, and then a few years later bought out by
HP
它在90年代末期先是被Compaq所收购，接着，过了⼏年，Compaq⼜被HP所收购
03:23 - 03:24
so it's no longer around
So，它已经不复存在了
3.24-3.28
but it did some major pioneering work in database systems
但它在数据库系统⽅⾯做了些先驱性⼯作
03:31 - 03:36
So both RDB/VMS and InterBase were built by a guy named Jim Starkey
So，RDB/VMS和InterBase都是由⼀个叫做Jim Starkey的⼈所构建的
3.36-3.41
who was also credited as being the inventor of Blobsand Triggers
他同样是Blob和Trigger的发明者
03:41 - 03:42
so he's a big deal
So，他很了不起
03:43 - 0345
He later went on to co-founder NuoDB
他之后成为了NuoDB的联合创始⼈
3.45-3.47
which is a new database startup
它是⼀个新的数据库初创公司
3.47-3.50
and it also happens to use in MVCC
NuoDB也⽤到了MVCC
03:52 - 03.56
so Dec RDB/VMS was bought up by Oracle
So，DEC的RDB/VMS被Oracle所收购
3.56-3.59
and is now known as Oracle Rdb
它现在被⼈所熟知的名字是Oracle RDB
04:01 - 04:06
and it was an InterBase
再来说说InterBase
4.06-4.10
,was eventually sold by Dec
它最终被DEC卖掉了
4.10-4.12
it went through a few different holding companies
它被多家不同的公司所接⼿
4.12-4.15
and finally was open sourced
最终，它被开源了
04:16 - 04:20
and so now it's known under a different name now it's called Firebird
So，现在它换了个名字，它叫做Firebird
04:20 - 04:23
so it may not be as well-known as MySQL or Postgres,
So，它可能并不如MySQL或者PostgreSQL那么有名
4.23-4.26
but there's one of the earliest open-source databases out there
但它是最早被开源出来的其中⼀个数据库
04:28 - 04:31
and Andy had this little fun fact in there from last year
Andy去年在这上⾯闹了个⼩笑话
4.31-4.33
or so I'll go ahead and say it
我稍后会讲
04:33 - 04:40
so if you've ever wonder why Firefox web-browser is named Firefox
So，如果你们想知道⽕狐浏览器的名字为什么叫⽕狐
04:41 - 04:44
it's because they were originally called Phoenix
这是因为它⼀开始被叫做Phoenix（凤凰）
4.44-4.45
,but then they had to change that name,
但之后，他们必须修改浏览器的名字
4.45-4.49
because it conflicted you know with another system or another product
因为这个名字和其他系统或者其他产品冲突了
04:50 - 04:51
so they changed it to Firebird
So，他们将浏览器的名字改为Firebird
4.51-4.52
but then they had to change it again
但接着，他们⼜得改名
4.52-4.54
because it conflicted with this database system
因为这个名字⼜和这个数据库系统的名字产⽣了冲突
04:55 - 04:57
so finally it was called Firefox
So，最终它的名字被定为Firefox（⽕狐）
05:05 - 05:09
so the main benefit again like what you have to understand about MVCC is
So，MVCC中你需要了解的主要好处在于
5.09-5.14 ！！！
that writers don't block the readers ,and the readers don't block the writers
writer不会阻塞reader，reader不会阻塞writer
05:15 - 05:19
so it's only when you have two transactions trying to write to the object at the same time
So，只有当你有两个事务同时要对同⼀个对象试着进⾏写⼊操作的时候
05:20 - 05:26
they have to fall back and rely on one of the concurrency control protocols like twophase locking
它们就得退⼀步，去使⽤某种并发控制协议，⽐如：两阶段锁
05:27 - 05:31
so again you only need to do this when you have a write write conflict
So，当你遇上Write-Write Conflict的时候，你才需要⽤到它
05:32 - 05:33
so with a high level
So，从⾼级层⾯来看
5.33-5.35
,the way this works is
它的⼯作⽅式是
5.35-5.40
we're going to assign timestamps to transactions when they arrive in the system
当事务进⼊系统的时候，我们要给它们分配时间戳
05:41 - 05:49
and then we're going to provide it with a consistent snapshot of the database as it
existed at the time that that transaction arrived
接着，当事务到达的时候，我们会为事务提供该数据库的⼀份⼀致的snapshot（快照）
05:52 - 5.53
so this means that
So，这意味着
5.53-6.00
they won't see changes from transactions that have not yet been committed in their
snapshot
它们不会看到那些还未在它们快照中进⾏提交的事务所做的那些修改
06:01 - 06:02
and just to clarify
我要澄清⼀下
6.02-6.06
this is a virtual snapshot
这是⼀份虚拟快照
06:06 - 06:07
so it shouldn't be confused with
So，它不应该被搞混
6.07-6.13
you know if a physical snapshot or copying the the full database to another location
如果我们将整个数据库复制到另⼀个位置
6.13-6.15
and then running that transaction on it
接着，我们在这个副本上执⾏事务
06:16 - 06:18
so again this is um this is just virtual
So，再说⼀遍，这个副本是虚拟的
06:19 - 06:24
so MVCC is really useful for read-only transactions
So，对于只读事务来说，MVCC真的很有⽤
6.24-6.30
because the SQL dialect allows you to declare when a transaction is read-only
因为SQL dialect允许你声明该事务是否是只读事务
06:31 - 06:32
and if you do this
如果你这样做的话
6.32-6.38
then the database system does not require you to get any locks or maintain the read
write sets
那么，数据库系统就不要求你去获取任何lock或者维护read set或write set
06:39 - 06:40
and this works again
这种⽅式奏效的原因是
6.40-6.42
because it has a consistent snapshot
因为它有⼀个⼀致的快照
6.42-6.47
,and will only see the changes that existed at the moment it started
它只会看到该事务开始时已存在的那些修改
06:47 - 06:52 …！！！
and this makes these read-only transactions really efficient and also really fast to do
这使得那些只读事务变得⾮常⾼效，且执⾏速度也很快
06:54 - 06:54
yes
请讲
06:58 - 07:01
I'm even just like I mentioned a minute ago
就像我⼀分钟前提到的那样
7.01-7.08
like it's essentially just maintaining like a version table or version made it data
information
本质上来讲，它就是在维护⼀个版本信息表之类的东⻄
07:09 - 07:12
and it's very similar the OCC where you understand the read and write sets
这就像是你所理解的OCC中那些read set和write set
07:12 - 07:16
and we're going to clearly go over this in a lot of detail in the following slides
我们会在接下来的幻灯⽚中对它们进⾏深⼊了解
07:16 - 07:19
this is gonna be the the topic of this lecture ,
这也是这节课的主题所在
7.19-7.20
yeah
请讲
07:34 - 07:36
so it's the we're talking about two reads here
So，假设这⾥⾯有两个读操作
7.36-7.40
they will read the the same snapshot the same version
它们会读取同⼀份快照，或者说同⼀版本的数据
07:41 - 07:48
So snapshot you know it's more commonly I think referred to as the version, you know
the tuple or database object
So，你知道的，我更想将snapshot称之为版本，即tuple或数据库对象的版本
07:55 - 08:02
Well can so if you so bear with me for just like you know three minutes probably less
Well，你先听我讲三分钟再说
8.02-8.04
,and we'll actually that is the first thing we're gonna cover
你问的东⻄实际上是我们⾸先要讲的东⻄
08:06 - 08:09
and I'll answer any other questions you have afterward
稍后我再回答你提出的任何问题
08:20 - 08:21
all right
8.21-824
so just to finish up on the slide
So，为了结束这张幻灯⽚上的内容，我要讲的是
8.24-8.26
another advantage of MVCC is that
MVCC的另⼀个优点在于
8.26-8.32
you're able to support something called time-travel queries
你能够⽀持⼀种叫做Time-Travel Query的东⻄
08:32 - 08:43
so these are queries to actually let you ask the database system for example what was
the state of the database you know three days ago, three years ago
So，实际上，通过这种查询，你可以问数据库它三天前的状态是什么，或者三年前的状态是什
么
08:43 - 08:50
and using these and using this versioning, they can actually answer these sort of queries
使⽤这种多版本，它们实际可以回答这些查询
08:55-8.56
all right,
8.56-9.03
so the idea of time travel queries was first was an idea of Postgres
So，这种Time-Travel Query的思想⾸先是在PostgreSQL中出现的
9.03-9.06
and it originated from Postgres in the 1980s
PostgreSQL在1980年代提出了这个东⻄
09:06 - 09:16
but PostgreSQL actually removed these time travel queries from their current product .
但实际上，PostgreSQL将这种Tim-Travel Query从他们当下的产品中移除了
9.16-9.22
like, as soon as you know people outside of academia, I started using Postgres more
heavily
除了学术界以外的⼈，我现在使⽤PostgreSQL的次数越来越多了
9.22-9.23
can anybody guess why
你们能猜下这是为什么吗？
09:26 - 09:26
well
Well
9.26-9.28
so the reason why is
So，理由是
9.28-9.36
because essentially what you have to do to actually support time travel queries is you
never throw away old versions
因为本质上来讲，如果你要⽀持Time-Travel Query，那你就永远不能将⽼版本的数据给丢掉
09:36 - 09:39
so you never garbage collect, right
即永远不做垃圾回收
09:39 - 09:39
so over time
So，随着时间的流逝
9.39-9.44
you're you know the more and more transactions that commit
事务提交的数量会越来越多
09:44 - 09:47
your your disk base will be filling up very quickly,
你的磁盘空间很快就会满了
9.47-9.50
and eventually it will be full
最终，你的磁盘就会满了
9.50-9.54
and probably very quickly depending on the speed of your transactions
你的磁盘很可能⻢上就会满，这取决于你执⾏事务的速度
09:56 - 9.58
and the the other thing is that
另⼀件事情是
9.58-10.02
time travel queries are not really needed by a lot of applications
并不是很多应⽤程序都需要使⽤Time-Travel Query
10.02-10.09
like you can't ,you never really look at you never go to a website, and say like ok I want
to know what this webpage looked like three days ago
你从来不会这么⼲，⽐如：你跑到某个⽹站上说，你想知道该⽹⻚三天前的样⼦
10.09-10.11
well I'm not the most use cases
Well，这并不是⼀个常⻅案例
10:12 - 10:20
but Andy mentions that like one common use case for these time travelling queries is in
the financial industry
但Andy提过⼀个关于Time-Travel Query很常⻅的使⽤案例，那就是⾦融领域⽅⾯
10:22 - 10:23
so the reason is
So，理由是
10.23-10.30
because you know do to, I know pursuit you know whatever rules and regulations they
have to follow
不管他们要遵守什么规则和条例
10:30 - 10:33
they have to actually maintain in the past seven years of transaction history
实际上，他们必须维护过去七年间的交易历史
10:34 - 10:45
so these time-travel queries actually allow them to very easily query the database
So，这些Time-Travel Query就能让他们很容易地查询数据库中的内容
10.45-10.51
and figure out why ,you know some of money what their what their total revenue was or
whatever they want to look up you know over the past seven years
并弄清楚过去七年间他们的总利润是多少，或者任何他们想查找的
10:55 - 10.56
all right
10.56-11.00
so um and the next few slides we're going to go over two examples
So，在接下来的⼏张幻灯⽚中，我们要去查看两个例⼦
11:01 - 11:04
And what I really want to emphasize here before we start is that
在我们开始之前，我这⾥真正想强调的东⻄是
11.04-11.10
MVCC is independent from concurrency control protocols
MVCC不依赖于并发控制协议
11:10 - 11:12
so the purpose of these examples is
So，向你们展示这些案例的⽬的在于
11.12-11.19
just to basically show you ,how we you know update versions and timestamps in the
table
简单来讲，就是向你们展示如何更新表中的这些版本号和时间戳
11:20 - 11:36
and also basically like how we figure out which version how we figure out which version
is to is visible to the particular transaction ,
还有就是，我们该如何弄清楚哪个版本的数据对特定的事务可⻅
11:36 - 11:39
right which version of the tuple is visible
即该tuple的哪个版本是可⻅的
11:40 - 11:43
so this first example we'll see how this is going to work
So，我们会在第⼀个例⼦中看下它是如何⼯作的
11:45 - 11:48
so right now like the first thing to point out is that
So，我们现在要指出的东⻄是
11.48-11.51
,now we have this version field right
这⾥我们有⼀个version字段
11:51 - 11:56
so we can see in this version field ,but it's assigned to A0
So，我们可以看到，在这个version字段中，我们分配了⼀个A0
11:56 - 12:00
So this means object A version zero, right
So，这意味着对象A的版本号是0
12:00 - 12:02
so we can assume that
So，我们可以假设
12.02-12.08
some other transaction has written the value 123 to the database
某个事务将值123写⼊到了数据库中
12.08-12.10
and whatever transaction wrote it
不管是哪个事务写⼊了这个值
12:10 - 12:13
timestamp was assigned a timestamp of zero
这⾥我们所分配的时间戳就是0
12.13-12.14
and we'll go over why in one second
我们稍后会讲这是为什么
12:15 - 12:19
so we also have a begin and end fields
So，我们还有begin和end字段
12:19 - 12:21
and so these are just timestamps
So，这⾥⾯放着的都是时间戳
12.21-12.25
it doesn't matter if they're logical physical hybrid
你不需要在意它们是逻辑的还是物理的，或者两者混合
12:25 - 12:28
as long as they you know they're always increasing
你知道的，它们的值始终是增加的
12.28-12.34
and follow the other you know and I guess our our valid timestamps
并遵循我们的其他时间戳
12:34 - 12:35
right like you learned in the past few lectures
就⽐如你前⼏节课中学到的那样
12:41-12.42
alright
12.42-12.45
so let's begin
So，我们开始吧
12.45-12.48
so when a new transaction arrives
So，当⼀个新事务到达的时候
12.48-12.52
we're going to be looking at transactions t1 and t2
我们要去查看T1和T2
12:52 - 12:57
so here T t1 arrives and it's assigned a timestamp of 1
So，当T1到达的时候，我们会将时间戳1分配给它
12:58 - 13:01
right so now we're going to begin, okay
So，我们开始吧
13:01 - 13:05
so for the first thing we want to do is what I do a R(A)
So，⾸先我们想做的事情是，我想执⾏R(A)
13:05 - 13:07
so what we're going to do is
So，我们接下来要做的事情是
13.07-13.13
we're going to consider you know time transaction 1's timestamp which is 1
你知道的T1的时间戳是1
13:13 - 13:14
and we're going to take a look at our table
我们要去查看下我们的表
13.14-13.27
and figure out which tuple is visible to it by finding you know where its current
timestamp is between beginning and End
通过弄清楚当前时间戳处于开始时间和结束时间中的哪个位置，我们以此来决定哪个tuple对它
是可⻅的
13:27 - 13:28
so in this example
So，在这个例⼦中
13.28-13.31
the beginning is 0
开始时间是0
13.31-13.36
and the timestamp of 1 is between 0 and the end which is infinity, right
时间戳1是在0和⽆穷⼤之间
13:36 - 13:39
so it's going to go ahead and breed version a 0
So，它就会将A的版本号设置为A0
13:40 - 13:40
all right
13:42 - 13:42
all right
13.42-13.45
so now we have transaction t2
So，现在我们有⼀个事务T2
13.45-13.48
and we're going to assign the timestamp 2
我们给它分配的时间戳是2
13:48 - 13:50
so the first thing we want to do here is
So，这⾥我们⾸先想做的事情是
13.50-13.52
we want to write a
我们想对A执⾏写操作
13:52 - 13.54
so at this point
So，此时
13.54-13.54
what we're going to do is
我们要做的事情是
13.54-14.00
we're going to create a completely new version of a,
我们要创建A的⼀个全新版本
14.00-14.01
which will be a 1
即A1
14:02 - 14:04
right because we're just incrementing the version counter
因为这⾥我们做的只是去增加版本号计数器
14:06 - 14:10
and right and so what we're going to do here is
So，我们这⾥要做的事情是
14.10-14.15
the beginning timestamp is going to be set to the timestamp of t2
我们要将A1的begin timestamp设置为T2的时间戳
14:15 - 14:18
the end timestamp again be set to infinity
它的end timestamp被设置为⽆穷⼤
14:18 - 14:20
and then the last thing we're going to do is
接着，我们要做的最后⼀件事情就是
14.20-14.30
we're going to update the end timestamp of version a 0 to also be a timestamp of 2
right for transaction 2
在T2中，我们要将A0的end timestamp也设置为2
14:33 - 14:33
all right
14.33-14.36
so one thing you might have noticed that
So，你们可能已经注意到⼀件事情了
14.36-14.46
we're missing so far is like with with just either the information that we had so far,
before this transaction status table popped up
在填充事务状态表前，我们⽬前已经有了这么多信息
14:46 - 14:47
the one thing that we're missing is that
这⾥我们忘说的⼀个东⻄就是
14.47-14.51
we don't really know the current state of the transactions in the database
我们并不清楚数据库中这些事务的当前状态
14:51 - 14:52
so for example
So，例如
14.52-14.56
you know the transactions here are currently active
你知道的，这些事务当前处于活跃状态
14:56 - 14.58
but what if they abort
但如果它们被中⽌的话
14.58-15.05
you know then you would have to go back and reverse the timestamps accordingly if it
was aborted
如果这些事务被中⽌的话，那么你就需要回过头去，将这些时间戳恢复原样
15:12 - 15:14
right so as you can see
So，正如你们所看到的
15.14-15.19
,here we're just going to start filling out the transaction status table
此时我们开始填充事务状态表中的信息
15.19-15.23
at this point both transactions are active
此时，这两个事务的状态都是active（活跃）
15:23 - 15:25
then finally we're going to do this R(A)
接着，我们要去执⾏这个R(A)
15:25 - 15:28
so what version is it going to read
So，T1所要读取到的A版本是什么呢？
15:29 - 15:32
anyone right
有⼈知道答案吗？
15:33 - 15:34
A sub-zero
A0，对吧
15.34-15.38
because again it's timestamp still lies between the beginning and end here
因为它的时间戳依然是在begin timestamp和end timestamp之间
15:39 - 15:41
So it's gonna go ahead and read version a0,
So，它会读取到的版本是A0
15.41-15.46
oh and finally its gonna commit
最后，它会被提交
15:46 - 15:47
so at the very end
So，在最后的时候
15.47-15.48
after this commits
当T1提交了之后
15.48-15.51
then the then transaction t2 will commit
接着，T2会进⾏提交
15.51-15.52
will update the status table
它会去更新状态表
15.52-15.55
and we can blow it away eventually
最终我们可以将它丢掉
15:57 - 16:00
so for the second example
So，在第⼆个例⼦中
16.00-16.03
we're gonna start with sort of the same setup right
我们这⾥的设置和第⼀个例⼦相同
16:04 - 16:08
so we have transaction t1 with a timestamp of 1
So，T1的时间戳是1
16:08 - 16:11
and transaction t2 we're assigning a timestamp of 2
我们分配给T2的时间戳是2
16:11 - 16:16
and it's the same state in the in the database table
数据库中的状态和前⼀个例⼦中是相同的
16.16-16.20
and so far we're just starting transaction t1
⽬前为⽌，我们只开始执⾏T1
16:20 - 16:23
we're saying it's timestamp to 1 and it's status is active
我们这⾥表示T1的时间戳是1，它的状态是active
16:25 - 16:27
so first we're going to do a R(A)
So，⾸先，我们要执⾏R(A)
16.27-16.34
I think at this point it's pretty clear that we're going to read version a0
我觉得，此时很明显，我们要读取的版本是A0
16:35 - 16:37
and next we're gonna do a W(A)
接着，我们要执⾏W(A)
16:37 - 16:38
so again just like in the last slide
就和上⼀张幻灯⽚⼀样
16.38-16.41
we're going to create a completely new version
我们要创建⼀个全新版本的A
16:41 - 16:43
I'm inserting in our database table
我将它插⼊我们的数据库表中
16.43-16.47
where it's gonna be version a 1 with value 4 5 6
它的版本是A1，它的值是456
16.47-16.52
,and the beginning timestamp will be 1 ,right it will be whatever this timestamp is
它的begin timestamp是1或者是其他值
16:52- 16:54
and the end we will assign to infinity again
这⾥我们将它的end timestamp设置为⽆穷⼤
16:55 - 16.58
and the last thing to not forget is that
我们不要忘记做最后⼀件事
16.58-17.00
we need to go up to a0 ,
我们需要跑到A0这⾥
17.00-17.05
and assign the end timestamp to be the current timestamp of transaction t1 which is 1
我们要将它的end timestamp设置为T1的当前时间戳，即1
17:07 - 17:10
alright so now we're going to begin transaction 2
So，现在我们开始执⾏T2
17:10 - 17:13
so the first thing we're going to do is a R(A)
So，我们⾸先要做的事情是执⾏R(A)
17:13 - 17:15
so in this case
So，在这个例⼦中
17.15-17.25
which transaction is it going to read or sorry which version is it gonna read excuse me
T2要读取的是A的哪个版本呢？
17.25-17.25
a 1
A1
17.25-17.26
and why is that
为什么是这样呢？
17:32 - 17:33
right yeah somebody I guess yeah
有⼈猜是这样的
17.33-17.34
so in this case
So，在这个例⼦中
17.34-17.39
um it's gonna be oh sorry for a yes
抱歉，我说错了
17:40 - 17:42
so one thing that we have to pay attention to
So，我们需要注意的⼀件事情是
17.42-17.44
and this is a little tricky right now
现在，它有点棘⼿
17:44 - 17:46
one thing I forgot to mention that the start is
我⼀开始忘记提的⼀个东⻄是
17.46-17.49
I understand you guys didn't have time to go over isolation levels
我理解你们没时间去看隔离级别⽅⾯的东⻄
17:51 - 17:55
so Andy wanted you guys to just review the slides and also the lecture from last year
So，Andy想要你们去回顾下去年对应的幻灯⽚和课程
17:56 - 18:03
so I'm just gonna provide some high-level hints for isolation levels for when you go over
those slides and the homeworks, right
So，当你们去看这些幻灯⽚和做Homework的时候，我会为你们提供⼀些隔离级别⽅⾯的提示
18:03 - 18:06
but it might not make full sense at this point
但此时讲的话，可能并没有太多意义
18:06 - 18:08
but basically like at a very high level
但从⼀个⾼级层⾯来讲
18.08-18.10
depending on the isolation level you have
取决于你所使⽤的隔离级别
18:12 - 18:15
it may choose either version a 0 a 1
它选择的可能是A0或者A1
18:15 - 18:23
but let's assume it's sort of it's the strict serializable or ,excuse me serializable isolation
但假设它的隔离级别是Serializable
18.23-18.26
which is sort of what you guys have been using up until this point
你们应该都已经使⽤过这个了
18:26 - 18:27
and this point
此时
18.27-18.30
it will it has to read a 0 ,
它需要读取A0
18.30-18.31
because a 1 has not yet committed
因为A1还未被提交
18:33 - 18:34
alright
18.34-18.36
so now we're gonna do a W(A)
So，现在我们要执⾏W(A)
18.36-18.38
,and so in this case
So，在这个例⼦中
18.38-18.39
what's gonna happen next
接下来要发⽣什么事情呢？
18:40 - 18:43
well again here we have a write write conflict right
Well，这⾥我们遇上了Write-Write Conflict
18:43 - 18:48
so assuming we're using 2PL
So，假设我们使⽤的是2PL（两阶段锁）
18.48-18.51
t2 is gonna have to stall until t1 commits
T2必须等到T1提交后，才会继续执⾏
18:51 - 18:51
all right
18.51- 18.55
so let's keep this going
So，我们继续
18.55-18.56
so now we're back to t1
So，我们切换回T1
18.56-18.57
we're going to do a R(A)
我们执⾏R(A)
18:58 - 18.59
and in this case
在这个例⼦中
18.59-19.03
it's gonna just read the same version that it wrote couple minutes ago right
T1会去读取它前⼏分钟刚修改过的版本，即A1
19:04 - 19:06
and it's gonna go ahead and commit
然后，提交T1
19:07 - 19:08
alright
19.08-19.09
so now we can go back here
So，现在我们可以回到T2
19.09-19.16
and we can go ahead and now we're going to create the new version a 2 with value 789
现在，我们要去创建A的新版本，即A2，它的值是789
19:16 - 19:20
we're going to assign it the timestamp of 2 with an end time step of infinity
我们将A2的begin timestamp设置为2，end timestamp设置为⽆穷⼤
19:20 - 19:25
and we're going to update the end timestamp of A1 to 2 as well right
接着，我们要将A1的end timestamp设置为2
19:25 - 19:26
so at this point
So，此时
19.26-19.37
you know whether t2 actually commits or not ,is really dependent on the concurrency
control protocol as well as the isolation level
实际上，T2是否被提交，这取决于并发控制协议和隔离级别
19:37 - 19:38
so that's something to keep in mind
So，这是你们要记在脑⼦⾥的东⻄
19:39 - 19:48
but really this this example ,the purpose of this example is just to show you how we
update the object versions， maintain the transaction status table
但向你们展示这个例⼦的⽬的在于，我们该如何更新这些对象的版本号，以及维护事务的状态表
19:48 - 19:51
and also figure out which tuples are visible ,all right
并弄清楚哪些tuple是可⻅的
19:52 - 19:53
Any questions on this
对此有任何问题吗？


19-02
20:03 - 20:04
all right
20.04-20.04
so as I mentioned
So，正如我提到的
20.04-20.06
if you say oh yes
请讲
20:28 - 20:28
And you say
20:41 - 20:45
oh well so this again this is a very high-level example right now
Oh，Well，这是⼀个⾼级层⾯的例⼦
20:45 - 20:51
and there's actually we're going to go into how you actually store this information later
on in this lecture
实际上，我们稍后会在这节课上讨论实际如何存储这些信息
20:51 - 20:55
so that's with you like ,so that will answer the question
So，我觉得你听了之后，就知道这个问题的答案了
20:56 - 20.56
basically
简单来讲
20.56-20.58
it's in some cases
在某些例⼦中
20.58-21.01
yes, you do need to consider locks
你确实需要思考锁⽅⾯的问题
21:01 - 21:05
it really depends on how you're actually storing this version information
这取决于你实际是如何保存这些版本信息
21:06 - 21:09
so we don't cover it in a few slides
So，我们不会⽤⼏张幻灯⽚来介绍下它的话
21.09-21.11
, because there's multiple ways to do this
因为我们可以通过多种⽅法来做到这点
21:11 - 21:13
so I don't want to just list them all out now
So，现在我并不想将它们都列出来
21.13-21.15
we don't cover it in few slides
我们不会通过⼀些幻灯⽚来介绍它
21.15-21.16
please ask your question again
请再次提下你的问题
21:22 - 21:23
all right
21.23-21.30
so um so again like MVCC or its variants are used in almost all new database systems
So，⼏乎所有新的数据库系统都使⽤了MVCC或者它的变体
21:30 - 21:35
and these are just you know some examples of the systems that use MVCC
这些是使⽤了MVCC的⼀些数据库系统
21:36 - 21:40
but what we really want to emphasize for the rest of this lecture, is that
但我们想在这节课上剩余时间⾥强调的东⻄是
21.40-21.46
MVCC is a lot more than just maintaining the timestamps that I showed you in the
previous two examples
除了我们前两个例⼦中维护时间戳这⽅⾯事情以外，MVCC还有很多其他东⻄
21:47 - 21:53
there's a whole bunch of other design decisions, that you have to make in order to
actually implement a system that supports MVCC
实际上，为了实现⼀个⽀持MVCC的系统，你还需要做⼀些其他⽅⾯的设计决策
21:53 - 21:55
so we're gonna go over those next
So，接下来，我们会去看下这些东⻄
21:55 - 21:58
so what exactly are these design decisions
So，这些设计决策有哪些呢？
21:59 - 22:03
specifically it's what concurrency protocol you're going to use
特别是，你要去使⽤什么并发协议呢？
22:03 - 22:06
how you're going to maintain and store the different versions
你要如何维护并存储这些不同的数据版本
22.06-22.08
, which relates to the question that was previously asked
这也和你之前问的问题相关
22:10 - 22:15
how are you're going to clean up the old versions ,once they're not visible to any
transactions anymore
⼀旦某些⽼版本数据不再对这些事务可⻅，我们该如何清理这些⽼版本数据呢？
22:16 - 22:20
and how you're going to ensure that the indexes point to the correct version
你该如何确保这些索引指向的是该数据的正确版本呢？
22:23 - 22:24
all right
22.24-22.27
so the first thing we'll cover is
So，⾸先我们要介绍的是
22.27-22.30
a skip that one okay
我点错了
22:30 - 22:36
so that's what I thought okay, so the first thing we're going to cover is concurrency
control protocol
So，我们⾸先要介绍的是并发控制协议
22:41 - 22:45
right so this is basically I'm looking at the ,sorry
抱歉，我点错幻灯⽚了
22:46 - 22:48
I'm not used to this presenter view my bad ,okay
我不应该使⽤这种演讲者模式，这是我的错
22:51 - 22:52 ！！
concurrency control protocol
来说下并发控制协议
22.52-22.56
this is our first consideration right,for our design decisions
这是我们设计决策中要⾸先考虑的⼀个东⻄
22:57 - 23:05
so these are the concurrency control protocols that you guys have been studying for the
past two weeks in the past two lectures
So，你们在前两周的课上已经学过了这些并发控制协议
23:05 - 23:09
And again when you encounter a write write conflict
当你遇上Write-Write Conflict时
23.09-23.11
you need to use one of these protocols
你需要使⽤其中⼀种协议
23:11 - 23:15
whether it be two phase locking，OCC or timestamp ordering
它可以是两阶段锁、OCC或者是Timestamp Ordering
23.15-23.21
to figure out which transaction should be allowed to write to that object
以此来弄清楚哪个事务能对该对象进⾏写⼊操作
23:21 - 23:23
and what isolation level you're running at
以及你使⽤的隔离级别是什么
23:23 - 23:26
so we're not going to go into much detail on this
So，我们不会对此太过深⼊
23.26-23.29
since you've just been covering it very recently
因为你们最近已经学过了
23:30 - 23:33
so the next consideration is version storage
So，我们下⼀个要考虑的东⻄是Version Storage（版本存储）
23:34 - 23:37
so for version storage what we need to do is
So，对于版本存储来说，我们要做的事情是
23.37-23.44 ！！！
figure out for a particular tuple version ,what should actually be visible to us, right
我们需要弄清楚某个tuple的哪个版本对我们来说是可⻅的
23:45 - 23:50
so let's assume for now that we're doing a sequential scan on the entire table
So，假设我们要对整张表进⾏循序扫描
23.50-23.55
, and we want to know where to find the version of a tuple that we want
我们想知道我们该在哪找到我们想要的那个版本的tuple
23:55 - 23.56
so the way we're going to implement this is
So，我们实现这个功能的⽅式是
23.56-23.59
we're going to maintain an internal pointer field
我们会去维护⼀个internal pointer字段
23.59-24.03
, that will allow us to find the previous or next version
这使得我们能找到该tuple的前⼀个版本或者下⼀个版本
24:03 - 24:07
we'll go into that more for this particular logical tuple
我们会对这个逻辑tuple的不同版本进⾏深⼊
24:07 - 24:10
so you can think of this is sort of a linked list
So，你可以将其想作是⼀个链表
24.1024.17
where you know you can jump on into you jump on it and land on the head
你知道的，你可以跳到这个链表中，你可以找到它的头结点
24:17 - 24:25
and then you can follow the the pointers in the linked list to find all of the different
versions they're currently being maintained
接着，你可以通过该链表中的指针来找到它们当前所维护的该数据的不同版本
24:29 - 24:33
so indexes always point to the head of the chain
So，索引指向的始终是该链表的头节点
24:36 - 24:40
and oh my I did it again ,I'm so sorry okay
抱歉，我⼜出错了
24:44 - 24:46
technical difficulties
技术性问题emmm
24:52 - 24:54
all right so um
24:55 - 24.58 ！！
indexes like it says here will always point to the head of the chain,
正如我说的，索引指向的始终是该链的头节点
24.58-25.03
whether the head is the oldest version that the newest version of that tuple depends on
the implementation
取决于具体实现，这个头节点可以是该tuple的最⽼版本，也可以是它的最新版本
25:04 - 25:09
so there's different approaches determine how we're going to store these different
versions
So，不同的⽅案决定了我们存储这些不同版本的⽅式
25:09 - 25:11
so we'll go more into that next
So，我们稍后会对此进⾏深⼊
25:19 - 25:24
so the first simplest approach is called append-only storage
So，⾸先要讲的最简单⽅案叫做Append-Only Storage
25:24 - 25:24
all right
25.24-25.27
so this just means that
So，这意味着
25.27-25.30
every time we create a new version
每当我们创建某个数据的新版本时
25:30 - 25:36
we just copy the old version as a new physical tuple in our tablespace and update it
我们只需复制该tuple的⽼版本，并将该副本作为我们表空间中的⼀个新物理tuple，并对其进⾏
更新
25:37 - 25:40
so then we update pointers to say
So，接着，我们更新指针并说
25.40-25.40
here's the next version
这是该tuple的下⼀个版本
25.40-25.44
and we're going to go over examples of all three of these in the next few slides
在接下来的⼀些幻灯⽚中，我们会去看下关于这三种⽅案所对应的案例
25:45 - 25:49
so the next approach is called time-travel storage
So，下⼀种⽅案叫做Time-Travel Storage
25.49-25.52
and this is where you have one master version table
在这种⽅案中，我们有⼀个master version table
25:54 - 25:59
that there's always duringstoring the latest version of the object or tuple
它⾥⾯所保存的始终是对象或者tuple的最新版本
26:00 - 26:04
then you copy out older versions into a separate table
然后，我们会将这些⽼版本数据复制到⼀张单独的表上
26.04-26.06
that we're going to call the time-travel table
我们将这张表叫做Time-Travel表
26:06 - 26:08
and then at that point
在此时
26.08-26.14
you just maintain the pointers from the master version of the table with the latest tuples
to the time-travel table
你需要做的就是去维护master version表中指向Time-Travel表的指针
26:16 - 26:22
and so the last approach which is the one Andy prefers and things as best is called delta
storage
So，最后⼀种是Andy所倾向的⼀种⽅案，同时它也是最佳⽅案，它叫做Delta Storage
26:23 - 26:27
so you can think of this as a Gives and get
So，你可以将它想象为是⼀种Gives and Get策略
26.27-26.31
, we're instead of just copying the old version every single time and updating it
我们不⽤每次都去复制这些⽼版本数据，然后在它们的副本上进⾏更新
26:31 - 26:37
, you're just going to maintain you know a small delta of the modifications from the
previous version .
我们只需去维护那些对前⼀个版本所做的修改即可
26:39 - 26:43
so well first go over in an example of the append-only storage
So，⾸先我们来看下这个关于Append-Only Storage的例⼦
26:44 - 26:45
so again this is the simplest approach
So，这是⼀种最简单的⽅案
26.45-26.47
and this is also what Postgres uses
这也是PostgreSQL所使⽤的⽅案
26:48 - 26:54
so each physical version is just a new tuple in the main table
So，每个物理版本其实就是Main Table中的⼀个新tuple
26:56 - 27:00
so let's say we have a transaction here that wants to update object a ,right
So，假设我们有⼀个事务，它想去更新对象A
27:01 - 27:03
So the first thing that's going to do is
So，⾸先它要去做的事情是
27.03-27.08
it's going to find an empty slot in the tablespace
它会在表空间中找到⼀个空的slot
27:08 - 27:12
and then copy the values from the current value of A which is A1
接着，它会去复制A的当前值，即A1
27.12-27.13
, all right that's the most recent value
All right，这是A的最近值
27:14 - 27:17
I into that table slot
并将这个值放⼊表中这个空的slot中
27:18 - 27:24
and then next it's going to copy the modified value into that table slot
接着，它会将这个修改后的值放⼊表中这个slot中
27:26 - 27:27
and are we done yet
我们完事了吗？
27.27-27.27
not quite
还没有
27.27-27.29
the final thing we need to actually do is
实际上，我们需要做的最后⼀件事情就是
27.29-27.37
update the pointer to point from the older version to the newest version that we
currently installed
我们要去更新指针，并让它指向我们当前插⼊的最新版本数据
27:51 - 27:51
okay
27.51-27.56
so another aspect we must consider your in order to store this version
So，为了保存这些版本，我们必须考虑的另⼀个⽅⾯是
27.56-
so
27:56 - 27.57
Oh in this example
在这个例⼦中
27.57-28.05
A is considered the head of the version chain
A被认作是该version chain的头节点
28:06 - 28:07
and in this example
在这个例⼦中
28.07-28.11
we're specifically ordering these oldest to youngest ,right
我们会根据从旧到新的顺序对这些版本进⾏排序
28:11 - 28:15
so an alternative would be you can order them youngest to oldest
So，你也可以按照从新到旧的顺序对它们进⾏排序
28:17 - 28:22
so if you're looking for the newest tuple in this case
So，在这个例⼦中，如果你要查找某个tuple的最新版本
28:22 - 28:29
you actually get to the point of where your get to version A zero
实际上，进⼊这张表的时候，你所拿到的版本是A0
28:29 - 28:33
and again you have to follow the pointers ,all the way down to the newest version A2
你必须沿着这些指针⼀路向下，找到A的最新版本A2
28.33-28.34
so make sense？
So，懂了吗
28:38 - 28:39
all right
28.39-28.42
so um so like I just said
So，正如我说的
28.42-28.45
the previous example used oldest to newest
上⼀个例⼦中，我们是按照从旧到新的顺序进⾏排序
28:45 - 28:47
but you could also use newest to oldest
但你也可以按照从新到旧的顺序进⾏排序
28.47-28.51
and there's performance implications and trade offs for both of them right
对于它们来说，这存在着性能上的影响和权衡
28:52 - 28.53
so with oldest to newest
So，如果你⽤的是从旧到新这种
28.53-28.57
,all you need to do
你所需要做的事情是
28.57-29.02
when there's a new version is to just append to the end of the version chain right
当该数据的新版本追加到这个version chain的末尾时
29:02 - 29:10
this is very simple append the new tuple and update the pointer to point to the the newer
version from the older version to the newer version
我们可以很容易地追加这个新tuple，让原本指向⽼版本的指针更新，从较⽼版本指向该tuple的
新版本
29:11 - 29:14
and this is a really easy operation to do
这是⼀个很容易执⾏的操作
29:17 - 29:18
but if you do newest to oldest
但如果你使⽤的是从新到旧的⽅式
29.18-29.21
then what this means is that
那么，这意味着
29.21-29.23
you have to add the entry
你添加这个条⽬的时候（即这个tuple的新版本）
29.23-29.26
,and update its pointer to point to the old head ,right
要将该条⽬的指针指向原来那个头节点
29:26 - 29:31
but now you have to actually update all of the indexes to point to your new version
但现在你需要更新全部索引，让它们指向你的新版本
29.31-29.33
so it's again like we said a few slides ago
So，就像我们前⼏张幻灯⽚中所讲的那样
29:34 - 29:38
indexes always point to the head of the version chain, right
索引指向的始终是version chain的头节点
29:38 - 29:41
so this means a lot more updates in some cases
So，这意味着，在某些情况下，我们要做⼤量更新
29:43 - 29:44
all right
29.44-29.47
so for time-travels storage
So，来讲下Time-Travel Storage
29.47-29.49
this is the next approach we'll cover
这是我们要讲的下⼀种⽅案
29.49-29.51
and here we're going to have a main table
这⾥我们有⼀个Main表
29.51-29.54
that always has to latest version of each tuple
它上⾯保存的始终是每个tuple的最新版本
29:55 - 29:58
and then we'll have another table called the time travel table
接着，我们还有另⼀张叫做Time-Travel的表
29:59 - 30:06
and this is where we're going to maintain older versions and copy older versions as they
get modified in the database,right
当数据库中的tuple被修改的时候，我们要将旧版本数据复制到这张表上，并维护这些旧版本数
据
30:07 - 30:08
so for this example
So，在这个例⼦中
30.08-30.15
let's say the transaction wants to update object A again same as last example
和上⼀个例⼦⼀样，假设事务想去更新对象A
30:15 - 30:21
then we're going to copy A2 into the free spot in the time travel table
接着，我们将A2复制到Time-Travel表的空闲位置
30:21 - 30:26
and then update the version pointer to point to the oldest version of tuple a
接着，我们要去更新版本指针，以此来让它指向tuple A的最⽼版本
30:28 - 30:32 ！！！！！
then we're going to overwrite the master version in the main table to be the new version
value
接着，我们会覆盖Main表中的master version，将它变为新的版本号
30:34 - 30:39
and finally we need to update the air diversion by
30:34 - 30:49
and then finally we need to update the pointer to point from the new version A3 to the
version that we just installed in the time travel table which is A2
最后我们需要更新指针，将指向A3的指针指向我们刚在Time-Travel表中插⼊的A2
30:57 - 30:57
yes
请讲
31:04 - 31:06
it would be an append table
它会有⼀个Append表
31:12 - 31:13
all right
31.13-31.20
so now we'll move on to the the last approach that we're going to consider which is
Delta storage
So，现在我们来看下最后⼀种⽅案，即Delta Storage
31:21 - 31:24
which again this is used by both MySQL and Oracle
MySQL和Oracle都使⽤了这种⽅案
31.24-31.26
, and like I mentioned
正如我所提到的
31.26-31.29
it's the one Andy thinks is the best option
Andy觉得这才是最佳⽅案
31:30 - 31:31
so what's gonna happen here is
So，这⾥所发⽣的事情是
31.31-31.32
every time you do an update
每当你要更新数据时
31.32-31.39
you're just going to copy the values that were modified into this separate Delta storage
segment that you see over here
你只需将那些修改过的值复制到这张单独的Delta Storage Segment中即可
31:40 - 31:43
so to update a ,
So，为了更新A
31.43-31.46
we're first going to update its version value
我们⾸先要去更新它的版本号
31:49 - 31:52
into the Delta storage right, so we're gonna copy over its value
So，我们要将这个值复制到右边的Delta Storage Segment表上
31:52 - 31.54
so instead of storing the entire tuple
So，我们⽆须去保存完整的tuple
31.54-31.03
we're just going to call we're just going to create a delta the States, you know which
part which attributes in the tuple were actually modified
我们只需去创建⼀个delta值，这⾥⾯存放的是该tuple中实际被修改的属性值
32:03 - 32:04
so in this case
So，在这个例⼦中
32.04-32.05
there's one attribute
我们只有⼀个属性
32.05-32.10
,so that that was now reflected in the Delta storage segment
So，这⼀点已经在Delta Storage segment中反映出来了
32:11 - 32:15
then we're going to update the actual value in the main table
接着，我们会在Main表中更新实际的值
32.15-32.21
,and also update the pointer from the new value into our Delta storage
并且，我们要去更新指针，让它从这个新值指向我们的Delta Storage对应的位置
32:22 - 32:23
so similarly
So，类似地
32.23-32.30
if we want to now install a new value ,And new version
如果我们现在想插⼊⼀个新值和⼀个新版本号
32:30 - 32:34
then we need to do something similar to the time travel table scenario
那么，我们需要做些和Time-Travel Table那种情况类似的事情
32.34-32.38
, which is specifically we append the new version
我们会去追加新的版本号
32.38-32.39
, update the value, again
并更新值
32.39-32.42
and now we're seeing its version A3, right
现在，我们看到它的值就变成了A3
32:42 - 32:50
but we have but we also need to update the pointer from A3 to now point to the most
current value of A2
但我们也需要更新A3的指针，让它指向A2的当前值
32:50 - 32:51
and additionally
此外
32.51-32.56
we need to update the pointer of A2 to the point to the older version now A1
我们需要去更新A2的指针，让它指向A的⽼版本，即A1
32.56-33.03
This is the time travel example
这就是关于Time-Travel的例⼦
33:03 - 33:08
so when you want to read an old version
So，当你想读取某个数据的⽼版本时
33.08-33.11
, well you really what you essentially have to do is
Well，你本质上必须要做的事情是
33.11-33.17
you have to replay the deltas to put the tuple back into its original form
你必须通过这些delta值来将tuple恢复原状
33:17 - 33:19
so in this case
So，在这个例⼦中
33.19-33.22
if we wanted to read A1
如果我们想读取A1
33.22-33.25
we would start with the value of A3
我们就需要从A3值开始处理
33:25 - 33:28
and then we would follow the pointer that A2 apply the delta on A2
接着，我们会沿着指针找到A2，然后使⽤delta值来对A2进⾏处理
33:28 - 33:32
and then apply the Delt A1
接着，使⽤delta值来处理A1
33.32-33.34
and that would get us back to the original value
这就会让我们知道该值⼀开始是什么
33:38 - 33:43
so this is another good example of the trade-offs between reads and writes
So，这是另⼀个关于在读操作和写操作间进⾏取舍的例⼦
33:43 - 33:47
so reading old versions and the append-only approach is really easy
So，从读取旧版本数据来看，这种append-only⽅案是⾮常简单的
33.47-33.49
which is one nice thing about it
这是该⽅案中⼀个很nice的地⽅
33.49-33.50
it's easy to implement right
并且实现起来也很容易
33:52 - 33:57
because you just find the version and the tuple is already ready to be turn
因为你只需找到该版本以及tuple就⾏了
33:57 - 33.59
so in addition to being easy to implement
So，除了易于实现以外
33.59-34.02
,you also don't have to put the tuple back together
你也不需要将tuple变回原样
34.02-34.06
,you don't have to apply Delta's to get it back to its correct state
你也⽆须通过delta值来让它变回正确的状态
34:06 - 34:10
but with Delta storage， writes are going to be much faster
但如果使⽤delta storage，那么写操作的速度就会更快
34:10 - 34:16
because we don't have to copy the entire tuple, if we only make a change to a subset of
the attributes
因为如果我们只对该tuple的⼀⼩部分属性进⾏修改，我们也就不需要复制整个tuple
34:16 - 34:19
so you know if you just have one attribute like we do here
So，如果你只有⼀个属性，就像我们这⾥例⼦中所展示的那样
34.19-34.22
, this is you know clearly a trivial optimization
这显然是⼀个微不⾜道的优化
34:22 - 34:23
but in many tables
但在很多表中
34.23-34.27
you might have you know dozens of columns
你可能会有数⼗个列
34.27-34.35
in which case this can matter a lot
在这种情况下，这种优化就变得很重要了
34:35 - 34:40
but again yes with the Delta storage the that is the benefit
但这就是Delta storage所带来的好处
34:40 - 34:43
but the disadvantage is that
但它的缺点在于
34.43-34.49
you have to replay the deltas again to put the tubule back together into its correct value
你必须重演这些delta值，以此来将tuple变回原来正确的值
34:49 -34:51
so one takeaway you can go from this is
So，你们从中能学到的⼀点是
34.51-34.54
like we mentioned earlier Postgres
正如我们之前提到过的PostgreSQL
34:56 - 34:58
Postgres will be faster for reads right
PostgreSQL在处理读操作⽅⾯会更快
34.58-35.04
because
因为。。。
35:05 - 35:07
Well PostgreSQL will be faster for reads
Well，PostgreSQL在处理读操作⽅⾯更快
35.07-35.12
and the and MySQL will be faster for writes for this exact reason
出于这个理由，MySQL处理写操作的速度会更快
35:15 - 35:15
alright
35:18 - 35:22
so the third thing that we need to know about on our list is garbage collection
So，在我们的列表上我们需要知道的第三个东⻄就是垃圾回收
35:23 - 35:28
so all of these old versions are accumulating as transactions are running and finishing
当这些事务在执⾏和结束的时候，所有这些⽼版本数据都会累积在⼀起
35.28-35.29
and at some point
在某个时候
35:29 - 35:36
we know that the particular version is not being is not visible to any other active
transactions ,right
我们知道某个特定版本数据不会对其他任何活跃的事务可⻅
35:36 - 35:37
so what this means is
So，这意味着
35.37-35.44
if you're thinking about the table with the begin and end timestamps and the timestamp
version
如果你思考下表中的begin timestamp和end timestamp以及时间戳版本
35:44 - 35:45
it means that
这意味着
35.45-35.53
there are no active transactions with a timestamps that fit between that begin and end
range right from older versions
就没有活跃事务的时间戳在这些⽼版本数据的begin timestamp和end timestamp的范围之内
35:53 - 35:54
so at this point
So，此时
35.54-35.58
we want to go ahead and garbage collect these versions in order to reclaim space
我们想去回收这些数据，以此来释放这些空间
36:01 - 36:04
so two additional things that we have to worry about are
So，这⾥我们还需要关⼼两件事
36.04-36.06
how we're going to look for expired versions
即我们该如何查找那些过期的版本数据
36.06-36.10
, and when it's safe to reclaim them
以及何时回收它们才是安全的
36:10 - 36:13
so these are topics that we're not going to cover in this class
So，我们不会在这⻔课上介绍这些内容
36.13-36.19
, but they are covered in the advanced class if you do choose to take it
但如果你选择上15-721的话，你们就会学到这些内容
36:19 - 36:21
so there's two approaches that
So，这⾥有两种⽅案
36:25 - 36:32
so these two approaches that we're going to look at specifically the first one is tuplelevel garbage collection
So，我们要看的第⼀种垃圾回收是tuple级别的垃圾回收
36:32 - 36:33
and the second one is transaction-level
第⼆种则是事务级别的垃圾回收
36:34 - 36:36
so tuple-level means
So，tuple级别意味着
36.36-36.39
that we're essentially going to do sequential scan on our tables
本质上来讲，我们会对我们的表进⾏循序扫描
36.39-36.46
and use the version timestamps and set of active transactions to figure out whether the
version is expired
通过使⽤版本时间戳和那些活跃的事务来弄清楚这些版本是否过期
36:47 - 36:48
and if it is
如果它过期了
36.48-36.49
then we go ahead and prune it
那么我们就会将它清除
36:49 - 36:52
so the reason why this is actually complicated
实际上，这很复杂
36.52-36.56
because we not only do we have to actually look at the pages in memory
因为我们不仅要去查看内存中的那些page数据
36:56 - 37:00
but we also need to look at the pages that we've swapped out to disk
我们还要去查看那些交换到磁盘上的那些page
37:01 - 37:04
because again we want to vacuum everything right
因为我们想去清除所有垃圾
37:04 - 37:10
so we'll go for a background vacuuming and cooperative cleaning in the next slide
So，我们会在下⼀张幻灯⽚中讨论background vacuuming和cooperative cleaning
37:11 - 37:14
so the second approach is transaction-level
So，第⼆种⽅案是事务级别的垃圾回收
37.14-37.17
which we're really not going to go into much detail about
我们不会对它太过深⼊
37:18 - 37:19
but the general idea is that
但它的基本思路是
37.19-37.22
you have transactions that maintain their read write sets
你的事务会去维护它们的read set和write set
37:23 - 37:24
and you know when they commit
当这些事务提交的时候
37.24-
,so the versions are right
37:27 - 37:29
so in this case
So，在这个例⼦中
37.29-37.30
you have the transactions
你有这些事务
37.30-37.34
again they're maintaining read write set
它们会去维护它们的read set和write set
37:34 - 37:36
so you know exactly when they commit
So，当这些事务提交的时候
37.36-37.40
and thus you can figure out when they're no longer visible and can vacuum them
你可以弄清楚，当它们不再可⻅的时候，你就可以清理它们了
37:42 - 37:47
so the first will first go over an example of how a tuple level garbage collection works
So，我们先要看的例⼦是关于tuple级别的垃圾回收是如何⼯作的
37:48 - 37:53
so let's say we have two threads running in the system where
So，假设我们系统中有两条线程正在执⾏
37:54 - 37.58
so transaction t1 is assigned the timestamp of 12
So，T1的时间戳是12
37.58-38.03
,and transaction t2 is assigned timestamp of 25
T2的时间戳是25
38:03 - 38:04
and then over in our version table
在我们的version表中
38.04-38.07
you can see we have object a
你可以看到，我们有⼀个对象A
38.07-38.09
,which is assigned version 100
它的版本号是100
38.09-38.12
has a begin timestamp of 1 and an end timestamp of 9
它的begin timestamp是1，end timestamp是9
38:13 - 38:17
and then we have a few other versions in there for object B
接着，我们所拥有的对象B还有⼀些其他版本
38:19 - 38:22
so with background vacuuming
So，通过使⽤background vacuuming
38.22-38.23
what we're going to do is
我们要做的事情是
38.23-38.27
we have sort of a set of threads that run in the background
我们在后台有⼀些线程在运⾏
38:27 - 38:30
and they perform this vacuuming
它们会执⾏这种清理
38.30-38.33
where they periodically just do a full table scan of the table
它们会定期对表进⾏全表扫描
38:35 - 38:39
and look for which versions are cleanable
并查看哪些版本是可以被清理的
38:40 - 38:43
and it works with any type of storage here
它可以和任意类型的Storage⼀起使⽤
38:44 - 38:47
So for background so here
So，此处
38:49 - 38:50
see have background thread
这⾥会有⼀些后台线程
38.50-38.57
there goes to the transaction thread in and says what
它们会去查看这些事务，并表示
38:57 - 39:01
and it basically queries what the current transaction timestamps are
简单来讲，它会去查询当前事务的时间戳
39:01 - 39:02
so in this case
So，在这个例⼦中
39.02-39.04
it's gonna be 12 and 25, right
T1的时间戳是12，T2的时间戳是25
39:06 - 39:14
then it's going to do a sequential scan on the table to figure out whether the tuples
would ever be visible to them
它会对这张表进⾏循序扫描，以此来弄清楚这些tuple是否对它们可⻅
39:14 - 39:15
All right
39.15-39.18
so A100 be visible to them
So，A100对它们可⻅
39:22 - 39:22
hard to say
这⾥有点难讲
39.22-39.26
because we don't know yet ,what they're reading or writing
因为我们还不知道它们所读取或写⼊的是什么东⻄
39.23-39.26
but
39:32 - 39:34
oh I see okay sorry
Oh，我懂了
39.34-39.34
let me back up
让我恢复⼀下
39:35 - 39:37
so again sorry in this example
So，在这个例⼦中
39.37-39.41
we're just looking at at the beginning end timestamps here
我们会去查看这⾥的begin timestamp和end timestamp
39:41 - 39:49
so here we gather the timestamps of 12 and 25 from these two transactions
So，我们从这两个事务中拿到了两个时间戳，即12和25
39:49 - 39:52
and then we again look at the beginning and end timestamp
接着，我们会去查看begin timestamp和end timestamp
39:52 - 39:56
so they will never be able to use A100 or B100
So，它们永远不能够使⽤A100或者B100
39.56-39.58
because the timestamp does not fall between 1 and 9
因为这两个时间戳不属于1到9这个范围内
39:59 - 40:05
whereas they do follow well the timestamp of transaction t1 falls between 10 and 20
Well，T1的时间戳是在10和20之间


19-03
40:05 - 40:08
so I could potentially use that value
So，我可能可以使⽤这个值
40:11 - 40:12
and at this point
此时
40.12-40.15
we know those two tuples are safe to reclaim
我们知道我们可以安全回收这两个tuple
40:15 - 40:16
so we go ahead and do,So um
So，我们继续
40:19 - 40:20
so one optimization here
So，这⾥我们可以对其进⾏⼀种优化
40:28 - 40:31
well one obvious optimization here that we can do is
Well，我们这⾥可以使⽤的⼀种优化⽅式是
40.31-40.36
we can actually maintain a bitmap for dirty pages
实际上，我们可以为那些dirty page维护⼀个bitmap
40:36 - 40:38
and so anytime you modify it
So，每当你更新数据时
40.38-40.41
,you can just flip the bit of the page that you modified
你可以翻转你所修改的那个page对应的bit
40:41 - 40:47
so again we're maintaining a bitmap for all of the pages in the database pages
specifically
So，我们会为数据库中的所有page去维护⼀个bitmap
40:48 - 40:49
if we modify a page
如果我们修改了某个page
40.49-40.53
we'll flip that particular bit which indicates that that page is dirty
我们就会翻转它所对应的bit，以此来表示这个page变dirty了
40:54 - 40:58
so this you know takes a little bit extra storage
So，你知道的，这需要占些额外存储空间
40:58 - 41:01
But it's just a single bit for all of the pages in the database
但对于数据库中的所有page来说，它们共⽤⼀个bitmap
41:02 - 41:06
And anytime you want it in ,so when the vacuumer comes around
So，当清理器开始清理的时候
41:06 - 41:09
it immediately knows which pages it actually needs to vacuum right
它就能⽴刻知道哪些page需要被清理
41:10 - 41:12
so it will go ahead and vacuum that page
So，它就会去清理这个page
41.12-41.13
and then reset the bit to zero
并将该page对应的bit重置为0
41:17 - 41:25
so vacuuming again is typically ran as sort of a cron job that runs periodically
So，垃圾清理通常是⼀个定时任务
41:25 - 41:28
but in some database systems for example Postgres
但在某些数据库系统中，以PostgreSQL为例
41:29 - 41:36
you can actually invoke vacuum manually from the SQL prompt for example
实际上，你可以在SQL prompt中⼿动调⽤vaccum进⾏垃圾清理
41:36 - 41:41
And it also has configuration parameters that you can set
你也可以对它⾥⾯的⼀些配置参数进⾏设置
41.41-41.51
such that ,it will the system will basically start up a vacuum thread，if over you know
20% of the pages are dirty for example
简单来讲，⽐如说，如果超过20%的page是dirty的，系统就会启动⼀个vaccum线程对这些
page进⾏清理
41:52 - 41:54
so there's different way to implement this
So，我们可以通过不同的⽅式来实现这点
41.54-41.58
there's different ways to optimize it for different workloads
我们可以针对不同的workload使⽤不同的⽅式进⾏优化
42:04 - 42:05
okay
42.05-42.13
so the other approach we're going to look at is cooperative cleaning alright
So，我们要查看的另⼀种⽅案就是Cooperative Cleaning
42:14 - 42:18
so this is basically where the threads as they're executing queries
So，简单来讲，当这些线程在执⾏查询的时候
42.18-42.20
when they come across old versions
当它们遇到旧版本数据的时候
42:21 - 42:23
that they know are not visible to anybody else
它们知道，对于其他⼈来说，这些数据是不会再⽤的
42.23-42.27
it's their job to actually clean them up as they go along
它们的⼯作就是，当它们遇上这些旧版本数据的时候，就把这些数据清理掉
42:28 - 42:32
so again these are threads are actually executing transactions
So，实际上，当这些线程正在执⾏事务的时候
42:33 - 42:44
they're going to actually check the versions ,that they that they Traverse across whether
that space is ready to be reclaimed
当它们在遍历的时候，它们会对这些数据的版本进⾏检查，并看看能否去回收这些空间
42:45 - 42:48
because they're not visible to any transactions anymore
因为这些数据不再对任何事务可⽤
42.48-42.48
and if it is
如果确实如此的话
42.48-42.50
they will go ahead and reclaim that space
这些线程就会回收这些空间
42:51 - 42.54
so one thing to note is
So，这⾥要注意的⼀件事情是
42.54-43.01
if you consider the two orderings that we discussed earlier ,oldest to newest ,and
newest to oldest
如果你思考下我们之前讨论过的两种顺序，即从旧到新，从新到旧
43.01-43.05
would would this approach work for both of those
这种⽅案是否适⽤于这两种顺序呢？
43:06 - 43:07
no
答案是No
43.07-43.08
right why is that
原因是什么呢？
43:16 - 43:18
that's it that's exactly right yeah
说的没错
43:18 - 43:21
so in the case of newest to oldest
So，如果是按照从新到旧的顺序
43.21-43.24
,you're not going to be looking at any of the old transactions
你就没办法去查看那些旧的事务了(知秋注:直接找到⽬标值了，⼲嘛还要⽆⽤功遍历其他数据)
43:24 - 43:27
so you will actually never end up reclaiming those
So，实际上，你也就永远没法去回收这些空间了
43:28 - 43:33
so it's important to note that a cooperative cleaning only works with oldest to newest
ordering
So，你们要记住Cooperative Cleaning只适⽤于从旧到新这种顺序，这点很重要
43:34 - 43:35
all right
43.35-43.38
so now we'll just go through a similar example here
So，我们来看个类似的例⼦
43:38 - 43:39
so let's say that
So，假设
43.39-43.46
the wave in index in transaction t1 wants to do a look-up on object A now
T1想通过索引来找到对象A
43:48 - 43:52
so again it's going to land on the head of the version chain
So，它会落在version chain的头节点处
43.52-43.54
, which is the oldest value
即A的最旧值处
43:55 - 44:00
and then it's going to scan along until it figures out which versions are actually visible to
it
接着，它会沿着这个对象的version chain进⾏扫描，来弄清楚实际该数据的哪个版本对其可⻅
44:01 - 44:12
so if it recognizes a version that it's looking if it recognizes that one of the versions that
it's currently traversing it's not visible to any other transactions
如果T1意识到它正在遍历的某个版本对于其他事务来说，都是⽆视的
44:13 - 44:16
then we'll go ahead and mark them as deleted and reclaim the space
那么，我们就会将这些标记为deleted，并回收它们所占⽤的空间
44:17 - 44:25
and then at the very end of us also update the index to point to the new head of the
version chain
在最后，我们会更新索引，让它指向这个version chain的新头节点
44:25 - 44:28
so we'll just go through these steps
So，我们会来看下这些步骤
44.28-44.31
so here we find the value
So，我们在此处找到了值
44:33 - 44:39
right and so we can see the version A1 is can be reclaimed
So，我们可以看到A1是可以被回收的
44:41 - 44:48
and then we reattach and then we recreate the pointer from the index to the new version
head right
接着，我们重新创建⼀个指针，让它从索引指向这些version chain的新头节点
44:49 - 44:52
so ordering is is actually important here
So，实际上，顺序在这⾥很重要
44.52-44.57
,and the ordering that's actually done on the that's actually on this slide is not quite
correct
实际上，幻灯⽚上所展示的这些顺序并不完全正确
44:57 - 45:02
so when you actually perform these operations
So，当你实际执⾏这些操作的时候
45.02-45.10
what you would do first is actually update, so the first thing you would do is mark them
as deleted right
So，⾸先你要做的就是将这些对其他事务不可⻅的版本数据打上deleted标记
45:10 - 45:12
but you're not actually reclaiming the space yet
但你实际还不会去回收这些空间
45:12 - 45:14
the next important thing is that
接下来⼀件重要的事情是
45.14-45.21
you actually update the index pointer to point to A2 before physically deleting them,
right or claiming that space
在物理删除这些数据或者回收这些空间之前，实际上你可以更新索引指针，让它指向A2，
45:21 - 45:25
because otherwise if you have other transactions running concurrently
否则，如果你同时有其他的事务正在执⾏
45.25-45.29
, they might find an empty pointer that points to nothing
它们可能会看到⼀个什么也不指向的空指针
45.29-45.30
yes
请讲
45:43 - 45:44
Yes yeah essentially yeah
说的没错
45:45 - 45:46
so it's going to maintain some information
So，它会去维护⼀些信息
45.46-45.47
so they can figure out
So，它们可以去弄清楚。。。
45:47 - 45:56
so it's going to know the set of active transactions, and be able to compare those
timestamps with the begin and end timestamps that in the version table
So，通过这些处于活跃状态的事务，我们能够去⽐较version表中那些begin timestamp和end
timestamp来⽐较时间戳
通过这些活跃的事务，我们可以拿到它们的timestamps，来和version表中的beign timestamp
和end timestamp进⾏⽐较
45.55-45.56
correct
你说的没错
46:01 - 46:02
all right
46.02-46.07
so again transaction-level GC
So，我们来讲下事务级别的垃圾回收
46:06 - 46:10
we here we just maintain the read/write sets of transactions
我们只需去维护事务的read/write set
46:10 - 46:13
and we use them to figure out what versions are not visible anymore
我们通过它们来弄清楚哪些版本数据不再可⽤
46.16-46.16
and then we claim the space
然后，我们去回收这些空间
46.16-46.22
and that's really all we're going to say about about transaction-level GC
关于事务级别的垃圾回收，这就是我们要讲的东⻄
46:22 - 46:26
so any questions on GC or anything else up until this point
So，对于垃圾回收⽅⾯或者到⽬前为⽌我们所讲的内容，你们有任何问题吗
46:28 - 46:29
all right
46.29-46.38
so now we're going to move on to our final topic in design decision which is index
management
So，现在我们要讲的就是最后⼀个主题，即索引管理
46:39 - 46:41
so as I mentioned before
So，我之前提到过
46.41-46.45
the primary key index is always going to point to the head of the version chain
主键索引指向的永远是version chain的头节点
46:46 - 46:49
anytime we create a new version
每当我们去创建某个新版本数据时
46.49-46.51
we have to update the version chain
我们需要去更新该数据对应的version chain
46:51 - 46:57
or we have to update well we have to update the index to point to the new heads at the
version chain right
Well，我们需要对索引进⾏更新，以让它指向该version chain的新头节点
46:57 - 47:00
so this gets tricky when updating the primary key
So，当更新主键时，这会变得有点棘⼿
47:00 - 47:07
because now it's actually possible that you could have two version chains for the same
logical tuple
因为对于同⼀个逻辑tuple来说，实际上，我们是有可能会出现两个version(新的和之前的旧的)
47:08 - 47:10
the way you implement this is
你实现这个的⽅式是
47.10-47.16
,when if you want to delete the primary ,when you want to update the primary key
当你想去更新主键时
47:16 - 47:21
you did this as a delete followed by an insert of a new logical tuple
你先执⾏delete，紧接着再插⼊⼀个新的逻辑tuple
47:21 - 47:24
and there's some bookkeeping you need to maintain and
你需要维护⼀些bookkeeping信息
47:26 - 47:30
and you also need to understand like how and when to rollback when necessary
你也需要理解，当你需要的进⾏回滚的时候，该怎么去做
47:31 - 47:33
but for secondary indexes
但对于Secondary index来说
47.33-47.35
this is actually more complicated
这实际上更为复杂
47.35-47.40
and this will be what we'll talk a little bit more about
我们会稍微讲下关于这⽅⾯的内容
47:40 - 47:47
so with secondary indexes the two approaches
So，对于Secondary index，我们有两种⽅案
47:48 - 47:58
we use to make sure that our indexes reflect the the correct value in the version chain
are to maintain a logical pointer
我们通过维护⼀个逻辑指针来确保我们的索引反映了version chain中的正确值
47:59 - 48:08
and here so here you have some kind of false identifier for the tuple or some kind of
unique identifier for the tuple, that does not change
So，每个tuple都会有⼀个唯⼀标识符，它是不会改变的
48:08- 48:11
and then you have some layer of indirection
接着，你会有⼀个indirection layer（间接层）
48.11-48.16
an indirection layer that map's the logical ID to the physical location in the database
间接层所做的事情是将tuple的逻辑id映射到数据库中的物理位置
48.16-48.19
and anytime you update the version chain
每当你要更新version chain的时候
48:19 - 48:25
you just have to update the indirection layer rather than actually updating every single
index
你只需要去更新这个间接层即可，⽽⽆需去更新每个索引
48:25 - 48:26
all right
48.26-48.35
so the actual approach is I think it was I used in some of the slides earlier I think, which
is to actually use physical pointers
我觉得我在前⼏张幻灯⽚中使⽤过⼀种⽅案，即物理指针这种⽅案
48:36 - 48:39
which is when you just point directly to the head of a new version chain
即它直接指向的是version chain的头节点
48:40 - 48:42
so every time the version chain gets updated
So，每当version chain更新的时候
48.42-48.44
you have to update every single index ,right
你需要更新每个索引
48:45 - 48:53
so the difference between the physical between using physical pointers and logical is you
basically have this indirection table
So，简单来讲，物理指针和逻辑指针之间的区别就是逻辑指针中有⼀个间接表
48:53 - 48.56
and the benefit of the indirection table is that
这种间接表的好处在于
48.56-49.03
you do not have to update every single index， every time you update your version chain
每当你更新你的version chain的时候，你⽆须去更新每个索引
49:04 - 49:09
so all right so in this example
So，在这个例⼦中
49:09 - 49:11
we'll say we have a simple database
假设，我们有⼀个简单数据库
49.11-49.17
and we're using a pendant version chain which is running newest to oldest right
这⾥我们使⽤version chain将该数据的所有版本串联在⼀起，从最新到最⽼
49:21 - 49:27
so for the primary key index if I'm going to do a lookup on object a
So，如果我使⽤主键索引来查找对象A
49:27 - 49:36
then this will just be a physical address right for the for the primary key which will be
just a page ID and offset
对于主键来说，它其实就是⼀个物理地址，它由page id和offset所组成
49:36 - 49:40
so you know which page to go to and then you take the offset that's typically what this
is
So，通过page id，我们知道这个对象在哪个page上，通过offset，我们知道它在该page的哪个
位置上
49:40 - 49:43
it's going to point again to the head of the version chain right
它会指向版本链的头节点
49:44 - 49:45
and anytime you create a new version
每当你创建某个数据的新版本时
49.45-49.49
you always update that the primary key ,right
你始终要去更新你的主键
49:54 - 49:55
all right
49.55-50.00
so for secondary indexes again you could use the physical address
So，你也可以使⽤物理地址来作为secondary index（⾮主键索引）使⽤
50:00 - 50:02
but there's the same issue
但这⾥我们也会遇上相同的问题
50.02-50.10
anytime you update the tuple， you have to update the secondary index to point to this
每当你更新某个tuple时，你必须对⾮主键索引进⾏更新，让它也指向这条链的头结点
50:10 - 50:18
and you know this is again like this is similar to some of the two sort of the Delta
storage idea that we saw a few slides ago
你知道的，这和我们之前⼏张幻灯⽚上看到的Delta Storage思想有点类似
50:19 - 50:21
yes if you have one attribute
如果你有⼀个属性
50.21-50.24
or if you have one index or one secondary index
或者，你有⼀个索引或者⼀个⾮主键索引
50.24-50.25
then this is not a big deal
那么这不是什么⼤问题
50:26 - 50:38
but it's very common for OLTP databases in particular to have many some secondary
indexes on a single table
但对于OLTP数据库来说，⼀张表上有多个⾮主键索引，这种事情⾮常常⻅
50:38 - 50:40
so every time you update the version chain
So，每当你更新version chain的时候
50.40-50.44
you have to update all of those secondary indexes
你就需要更新所有的⾮主键索引
50.44-50.45
which for OLTP
对于OLTP来说
50.45-50.51
you can imagine might be 12 or you know a few dozen mmm
你可以想象得出⼀张表上会有12或者数⼗个⾮主键索引
50:51 - 50.53
um and this of course is expensive
Of course，这种做法成本很⾼
50.53-50.55
, because for example
例如
50.55-50.56
if it's a B+ tree
如果它是⼀个B+ Tree
50.56-51.01
, then youare traversing the B+ tree you're taking latches as you go
当你遍历B+ Tree的时候，你就会去获取latch
51:01 - 51:03
and then finally you have to apply the update
接着，最后你需要提交这些更新
51:05 - 51:15
so again like we said the previous slide instead of storing the physical address in the
secondary index, we're going to look at two alternatives
so 就像我们前⼀张幻灯⽚所说的，与其在⾮主键索引中存储的是物理地址，不如存逻辑指针，
我们来看第⼆种⽅案
51:15 - 51:18
so the first is to just store the primary key
So，第⼀种⽅案就是只保存主键
51.18-51.24 ！！！！！！
which is literally just a copy of the primary key as the value
从字⾯上来讲，就是将主键副本作为值保存
51:24 - 51:34
and the secondary index first of all the dress, here we go
对于Secondary index来讲，如图所示
51:34 - 51:42
right so here we're going to have the actual value that we're going to store in the
secondary index is going to be a pointer to the primary key index
So，这⾥我们在⾮主键索引中保存的值会指向主键索引
So，这⾥我们通过⾮主键索引来指向主键索引
51:44 - 51:46
so now when you want to find a tuple
So，当你现在想找⼀个tuple的时候
51.46-51.52
um you just get you first got the primary key index other than the secondary index
⾸先你需要通过主键索引查找，⽽不是⾮主键索引
51:52 - 51:59
and then you do a lookup on the primary key index just as you would to figure out what
the physical address is
当你想知道物理地址是什么的时候事情，你需要在主键索引中进⾏查找
51:59 - 52:03
and then every proceeds as in the first example with the physical address
所有的操作流程都与第⼀个例⼦中的物理地址相关部分相同
52:05 - 52:10
so anytime I update the tuple and the head of the version chain
So，每当我更新tuple和它所对应的version chain的头节点时
52:10 - 52:16
you can just update the primary index and automatically updates all of the secondary
indexes right
你可以只更新主键索引，也就⾃动更新了所有的⾮主键索引
52:16 - 52:21
so this is one example of logical pointers
So，这就是逻辑指针的⼀个例⼦
52:23 - 52:25
and this is what MySQL does
这也是MySQL的做法
52.25-52.29
and Postgres actually stores the physical address
实际上，PostgreSQL保存的是物理地址
52:32 - 52:32
yes
请讲
52:37 - 52:46
um,a secondary index see if your your primary key index right which stores like the key
for your immediate table
如果你看下你的主键索引，它保存的其实是你表中的这些key
52:46- 52:53
,so your secondary index is going to I guess be a reference to that case
So，我猜你的⾮主键索引会引⽤这些东⻄
52:54 - 52:54
so
52:59 - 53:01
yeah so in this case so like if you
53:02 - 53:07
so if you have a table A right and the ID is your primary key
So，假设你有⼀张A表，id是你的主键
53:08 - 53:09
then maybe in table B,
接着，兴许，在B表中
53.09-53.15
you have a reference to table a to to table a.ID,
它⾥⾯保存了⼀个指向A表id这个属性的引⽤
53.15-53.17
right a the attribute column in that table, right
即A表中的某个属性
53:18 - 53:23
and so you might create a second this is what's called a secondary index on that
particular item
So，你可能会在这个属性上创建⼀个⾮主键索引（secondary index）
53:23 - 53:26
so if you want to think about something more concrete
So，如果你想思考⼀些更具体的情况
53.26-53.28
you have a table of users your user has an ID
假设，你有⼀张user表，它⾥⾯有个id属性
53:29 - 53:33
your user has a list of items that it has purchased
每个⽤户会有⼀个列表，该列表上保存了他们所购买的东⻄
53:34 - 53:43
so for each of those items you might store the user's ID in it or you know something that
it's just typically used for tracking
So，你可能会在这些商品中保存购买该商品的⽤户id或者其他⼀些⽤来跟踪的信息
53:43 - 53:46
okay any other questions
Ok，有任何疑问吗？
53:54 - 53:58
hmm think of my beginning of him I said here okay
我想下我这⾥开头所说的
53:58 - 54:02
so the last approach which is also another example of using a logical ID
So，来讲下最后⼀种⽅案，它是逻辑id的另⼀个案例
54:03 - 54:04
It`s basically
简单来讲
54.04-54.08
you just have some synthetic values it's like a tuple ID
你有那种像tuple id那样的合成值
54:08 - 54:15
so this would typically be you know an incrementing counter to serve as the tuple ID
So，这通常会有⼀个计数器来增加你的tuple id值
54:15 - 54:17
and then you have a hash table
接着，你还有⼀个hash table
54.17-54.22
that says how to map from that tuple ID to the address
我们通过它将tuple id映射到对应的地址上
54:22 - 54:24
so basically
So，简单来讲
54.24-54.27
you're going to get the tuple ID out of the secondary index right
你会通过⾮主键索引来获取tuple id
54:31 - 54:35
buying a dress yes, so you're going to get the tuple id of the secondary index
So，你会通过⾮主键索引来获取tuple id
54.35-54.39
and then you're gonna ,and then you're going to figure out where the physical address is
接着，你通过tuple id来弄清楚它的物理地址是什么
54:39 - 54:46
and then the hash table here will point you to the location of the physical address ,so
you can read that value
这⾥的hash table会告诉你该tuple的物理地址是什么，So，你可以去读取这个值
54:48 - 54:57
and again similar to the approach we looked at where we were just storing the primary
the primary key index
这种⽅案和我们只保存主键索引那个⽅案很类似
54:58 - 55:01
this is another example of logical pointers
这是逻辑指针的另⼀个例⼦
55.01-55.01
which means that
这意味着
55.01-55.07
if each time we have a new version or each time we update the version chain
每当我们要更新version chain的时候
55:07 - 55:12
we can actually avoid having to update all of the secondary index right
实际上，我们能够避免更新所有的⾮主键索引
55:12 - 55:18
so we the only thing we have to update in this case is the hash table ,and the pointers
So，在这个例⼦中，我们唯⼀要去更新的就是这个hash table和这些指针
55.18-55.20
,that make sense
懂了吗
55:26 - 55:27
all right
55.27-55.30
so this table is actually really interesting
So，实际上，我们对这张表中的内容⾮常感兴趣
55:31 - 55:37
um so this is a table from a paper that was published by Andy and a few other students
So，这张表是来⾃某篇paper，这篇paper是由Andy和⼀些其他学⽣⼀起完成的
55:38 - 55:39
I think a couple years ago
这篇paper发表已经有⼀两年了
55:40 - 55:41
so what they actually did is
So，实际上，他们在这篇paper中所做的事情是
55.41-55.45
they looked at a number of systems
他们查看了⼤量的系统
55.45-55.46
so they looked at some older systems
So，他们也看了⼀些⽐较⽼的系统
55.46-55.48
you know like Oracle, Postgres, MySQL
⽐如：Oracle、PostgreSQL和MySQL
55:49 - 55:53
and they also looked at some much newer systems within the past ten years
他们还查看了⼀些近⼗年来出现的⼀些较新的数据库系统
55:53 - 55:54
so for example
So，例如
55.54-55.56
like HyPer and Nuodb
HyPer和NuoDB
55.56-55.59
HyPer would be an example of an academic system
Hyper是学术⽤数据库系统中的⼀个案例
55:59 - 56:02
so they tried to get a variety of systems here
So，他们试着对⼀系列数据库系统进⾏研究
56:02 - 56:09
and and the table lists which of these design decisions each of these database system
makes
这张表中列出了他们所研究的每种数据库系统的设计决策
56:10 - 56:16
so let's see if Andy has any exciting things
So，我们看看Andy有没有放什么令我们兴奋的东⻄
56:16 - 56:23
so I guess he says the spoiler if you guys want the spoiler
So，如果你们想让我剧透下的话
56:25 - 56:38
is the or the take away the spoiler is that Oracle and MySQL the way they do in MVCC
they actually found like Andy and some students actually found this way to be the fastest
for OLTP workloads specifically
实际上，Andy和其他学⽣发现Oracle和MySQL这两者在MVCC⽅⾯所做的设计对于OLTP
workload来说，是最快的
56:40 - 56:42
and actually found Postgres to be the slowest
他们发现PostgreSQL在这⽅⾯的速度是最慢的
56.42-56.48
although personally as both the user of MySQL and Postgres ,I like Postgres quite a bit
从我个⼈⻆度来说，虽然我是MySQL和PostgreSQL的⽤户，但我更喜欢PostgreSQL
56:48 - 56:57
but I'm also not running you know commercial database systems with the production
workload traces
但我并没有在⽣产环境下对商⽤数据库系统进⾏workload⽅⾯的跟踪
56:57 - 56.59
so you know once you get at that scale
So，你知道的，⼀旦你的规模变得很⼤
56.59-57.00
it probably matters
这可能就会很重要
57.00-57.02
all well it definitely matters a lot
Well，应该是⾮常重要
57:03 - 57:06
so okay so this brings us to the conclusion
So，我们来做下总结
57:07 - 57:09
so today again we talked about MVCC
So，今天我们讨论了MVCC
57.09-57.13
and again as you just saw in the past few slides
就如你们在之前⼏张幻灯⽚中看到的那样
57:13 - 57:23
there's a lot more to this than just figuring out you know what timestamps to assign ,and
what versions are visible to the different transactions
除了如何分配时间戳，如何让不同的事务看到对应的版本这些事情以外，我们还需要了解很多东
⻄
57:25 - 57:33
so you know of course you need to figure out how to store the versions how to update
them how to update the indexes correctly ,and the other items that we covered here
Of course，你需要弄清楚该如何保存多版本，如何更新它们，如何正确地更新索引，等等。这
⼀系列东⻄我们这节课上都介绍了
57:35 - 57:44
so right for next class just to just as a reminder don't come to class on Wednesday,
because nobody will be here
So，你们要记住，下节课你们不⽤来教室，因为没⼈在这⾥
57:44 - 57:46
so you guys have next ones day off
So，我们下⼀节课没课
57.46-57.51
and then I think the following week ,Andy will probably be back although that's not
certain
我认为Andy可能下周会回来，虽然我也不确定
57:51 - 57:53
but we will start logging in recovery
但我们会开始讲Logging和Recovery

