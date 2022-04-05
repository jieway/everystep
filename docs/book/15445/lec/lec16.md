16-01
16 - Concurrency Control Theory
(CMU Databases Systems Fall 2019)
00:16 - 00:22
all right again Thank You DJ drop table for keep things fresh
感谢DJ Drop Table每次为我们做的事情
00:22 - 00:27
all right,so we'd love to talk about real quickly again for the assignments
So，我们先快速讨论下你们的assignment
00:27 - 00:31
project three hits been put out and that'll be due on Sunday November 17th
我们已经将Project 3放出了，你们在11⽉17号的时候上交
00:31 - 00:33
and I'll talk about that briefly at the end of this class
我会在这节课结束的时候，简单讨论下它
00:34 - 00:41
and then project or sorry homework 4 should be four not three, four will be released next
week
这边我写错了，这⾥应该是Homework 4，它会在下周放出
00:42 - 00:45
and that will be then better we due on on the thirteenth, okay
你们要在13号的时候上交
00:46 - 00:49
and as I said，my wife is going we're going to hospital tonight
我之前说过，我⽼婆今晚要去医院待产了
00:50 - 00:51
it's gonna happen like nine hours from now
这是9⼩时以后的事情
00:51 - 00:53
so I'm gonna be gone for two weeks
So，我有两周不在
0.53-0.55
I won't have office hours next week or the following week
下两周我都不在办公室
00:56 - 0.57
and then next week we will still have classes
下周我们依然有课
0.57-1.01
my PG students will what we take care of those classes
我的研究⽣会带着你们上课
01:01 - 01:02
Then the following Monday
然后，下周⼀的时候
1.02-1.07
we'll be getting one more PG student, and then we'll have no class on October 30th
我会让更多的研究⽣给你们上课，10⽉30号的时候，我们不上课
01:07 - 01:09
and then the schedule correctly reflects this, okay
这些规划已经反映了这点
你们可以从我的这些⽇程安排上看出这点
01:10 - 01:12
So any questions about any of this
So，对此，你们有任何疑问吗？
01:13 - 01:19
and that would make arrangements with my admin about having all the midterms in her
office
我会与我的课程管理员在她的办公室⼀起安排下期中相关的事宜
01:19 - 01:23
and then we'll figure out some time you'd go come her office and check out your your
midterm
然后，你们可以挑个时间去她办公室查下你们的期中考试成绩
01:23 - 01:26
again just bring your student ID ,so she knows who you are
带好你的学⽣卡，这样她就知道你是谁了
01:26 - 01:27
Okay
1.27-1.31
and then if you want something regraded，take a photo
如果你想要重新评分，那就给你的卷⼦拍个照
1.31-1.35
you can't take your midterm with you just take a photo the page you want me regraded
and email me
你只需拍下你想让我重新打分的地⽅，然后以邮件的形式发给我即可
01:35 - 01:37
and we'll take care of it okay
我们会处理它的
01:38 - 01:44
all right, so we're right now in the course is that we've covered the entire stack
就⽬前来讲，我们已经将整个技术栈都介绍了⼀遍
01:44 - 01:45
we've covered how to store things on disk
我们已经讨论过如果将数据保存在磁盘
1.45-1.48
we covered how to put things in a buffer pool
我们也介绍了如何将数据放⼊buffer pool
01:48 - 01:52
the access method scans how to execute operators and how to do query planning
我们也讨论了access method，如何执⾏这些operator以及该怎么制定查询计划
01:53 - 01:56
so now we're gonna actually can look look at for the next four weeks
So，在接下来的四周时间⾥
1.56-1.59
we're gonna go back and look at the entire architecture all over again
我们会回过头去，再看下这整个架构体系
01:59 - 02:05
and now consider two important components ,concurrency control and recovery
然后，我们要去思考两个重要组件，即并发控制和故障恢复
02:05 - 02:09
and these concepts actually permeate all throughout the entire system
实际上，这些概念在整个系统中⽆处不在
02:10 - 02:11
we kinda need to understand the basics first
我们⾸先需要去理解这些基础概念
2.11-2.14
and that's why we went through without discussing any of these things
这就是为什么我们先讨论了这些，才开始讨论这两个东⻄
02:14 - 02:17
and now we're going back ,and seeing how we wouldn't
现在我们回过头来再看这些东⻄
2.17-2.21
you know if you want to enforce concurrency control or make sure that our databases
can be stored on disk safely
你知道的，如果你想使⽤并发控制，或者确保我们的数据库可以被安全地保存在磁盘上
02:21 - 02:26
how do we make sure that how do we modify what we've already talked about to
account for these things and take care of it
我们该如何通过调整我们已经讨论过的东⻄来解决这些问题呢？
02:27 - 02:34
so again concurrency control and recovery are all you know they're not like should be
separate things on the side with a buffer pool manager or an index
So，你知道的，并发控制和故障恢复并不是独⽴于buffer pool管理器或者索引之外的东⻄
02:35 - 02:41
the entire system needs you aware of how it's gonna be durable, how transactions are
gonna run safely
在整个系统中，你需要去知道该如何将数据持久化，以及如何让事务安全地执⾏
02:41 - 02:47
and so that's why we're going we're covering this at the at the second half of the
semester
So，这就是我们要在下半学期所讲的东⻄
02:47 - 02:50
and I would say also to once we have these two things
我要说的是，⼀旦我们有了这两个东⻄
2.50-2.52
that you can go off the world and build your own database system
那你就拥有了全世界，你可以去构建你⾃⼰的数据库系统
02:52 - 02:56
but these are the last two things we need to actually build an database system
这就是我们构建⼀个数据库系统时所需的最后两个东⻄
2.56-2.59
that can run transactions correctly and make sure that everything is safe
它可以让事务正确地执⾏，并且确保所有东⻄都是安全的
03:00 - 03:01
so we're almost there
So，学会这些，我们就基本实现了⼀个数据库系统
03:02 - 03:06
so to motivate why we want to talk about concurrency control and recovery
So，我们想讨论并发控制和故障恢复的动机是
3.06-3.08
let's look at two simple scenarios
我们来看两个简单场景
03:08 - 03:10
so let's say that I have an application
So，假设我有⼀个应⽤程序
3.10-3.17
where I want to have two threads try to update the same record in the same table at
exactly the same time
我想通过两条线程来试着同时对同⼀张表上的同⼀条记录进⾏更新
03:19 - 03:23
how to make a decision about which one should you succeed， well which one should
be our final change
我们该如何决定哪条线程的操作会成功，哪条线程所做的修改才是我们的最终修改
03:23 - 03:24
and there's a race condition here
这⾥就会出现条件竞争（race condition）
03:25 - 03:28
I would have want to come slight before the for another
我想让⼀条线程略微先于另⼀条线程执⾏操作
03:29 - 03:30
the other scenario is that
另⼀个场景是
3.30-3.33
let's say that I have an application that for my bank
假设我有⼀个银⾏应⽤程序
03:34 - 03:38
and I want to transfer a hundred dollars out of my account into your account
我想从我的账户转100美⾦到你的账户
03:38 - 03:43
but let's say you know before I you know after I take the money out of my account ,but
before I can put it in your account
但假设，当我从我的账户中取出钱后，在我将钱放⼊你的账户前
03:44 - 03:48
the the building the data center gets struck by lightning
数据中⼼所在的⼤楼被雷劈了
3.48-3.51
the the lose all power our machine crashes or database system crashes
⼤楼就断电了，我们的机器发⽣了崩溃，或者数据库系统发⽣了崩溃
03:52 - 03:53
so when we come back
So，当供电恢复的时候
3.53-3.55
what should be the correct state of the database
那么数据库的正确状态应该是什么呢？
03:55 - 03:57
But what should we actually see
但我们实际应该看到的是什么呢？
03:58 - 04:02
so the first problem that I'm talking about here at the top
So，这就是这⾥我所要讨论的第⼀个问题
04:03 - 04:05
this is an example of a lost update
这是⼀个关于丢失更新操作的案例
4.05-4.07
or I have two transactions
假设我有两个事务
4.07.4.09
two threads trying to make an update to the same record at the same time
有两条线程试着在同⼀时间对同⼀记录进⾏更新
04:09 - 04:11
I couldn't have end up missing one
我不能丢失其中任何⼀个事务所做的操作
04:12 - 04:14
all right how to make sure that doesn't happen
我该如何确保避免这种情况的发⽣呢？
04:14 - 04:18
and the way we're gonna use ensure that these things happen correctly
我们确保这些东⻄正确执⾏的⽅式是
4.18-4.23
it`s through a concurrency control mechanism，a concurrency control protocol
使⽤⼀种并发控制机制，或者⼀种并发控制协议
04:23 - 04:24
for the second scenario
在第⼆种情况中
4.24-4.28
where my machine my my my data center catches on fire
假设我的数据中⼼着⽕了
04:28 - 04:31
and I you know my I lose power and my machine crashes
并且断了电，我的机器也发⽣了崩溃
04:32 - 04:36
we're gonna use the recovery mechanism in the database system to ensure Durability
我们会在数据库系统中使⽤崩溃恢复机制来确保持久化
04:37 - 04:44
so these concurrency control and durability are one of the main selling points of a
database management system
So，并发控制和持久化是⼀个数据库管理系统的主要卖点之⼀
04:45 - 04:50
this is why if you're building an application whether it's in the cloud or on a cell phone or
on a desktop
如果你构建了⼀个应⽤程序，不管它是运⾏在云端还是⼿机或者是台式机上的
04:51 - 04:55
You don't want to be in the business of doing these things yourself in your application
你不想在你的应⽤程序中亲⾃来做这些事情
04:56 - 4.57
because you're probably gonna get it wrong
因为你可能会搞出问题
4.57-4.59
and you can have losing data or have incorrect data
你可能会丢失数据或者得到错误的数据
05:00 - 05:02
This is why you want to use a database management system
这就是为什么你想要使⽤DBMS的原因所在了
5.02-5.07
because they have really smart people that have been spending a lot of time to make
sure that these things happen correctly
因为它是由很多聪明的⼈花了⼤量的时间来开发的，以此来确保这些⾏为都是正确的
05:08 - 05:10
if you also think about it to it like if you're a startup
假设，如果你是⼀家初创企业
5.10-5.14
you know the if you're shipping an application
如果你正在交付⼀个应⽤程序
05:14 - 05:21
it doesn't matter you know the end of the day what's with what's not gonna sell your
product is oh I can I can recover the database after a crash
如果你的数据库系统出现了崩溃，你说你可以恢复其中的数据，这种说法并不会有助于卖出你的
产品
05:22 - 05:24
right you need that as a feature you absolutely have to have
因为这是你必须要有的⼀个功能
05:25 - 05:28
but that's not a differentiating aspect of your application versus your competitors
但这⽆法让你应⽤程序和你竞争对⼿所提供的产品产⽣差异
05:29 - 05:35
all right, so you don't want to get if you don't want any business of writing a database
management system from yourself unless that is your job
So，你不会想要⾃⼰去写⼀个DBMS，除⾮这是你的⼯作
05:35 - 05:38
for everything else people should rely on
⼈们应该还有去依靠些其他东⻄
5.38-5.44
you know high quality software database system software that is vetted to do these
things
⽐如，那些⾼质量软件、数据库软件通过审查才能去做这些事情
05:44 - 05:57
so the core concept, that we're going to use through the next four weeks discussing this
these, you know running the our system to make sure that things are running in the
correct order or that all our changes are so durable
So，为了确保我们系统中⼀切东⻄都是按正确顺序执⾏，或者所有修改都被持久化，我们接下
来四周在讨论我们运⾏系统时使⽤的核⼼思想是
05:57 - 05.59
is this idea of transactions
那就是事务的思想
5.59-6.03
that are gonna run with ACID guarantees or ACID properties
它会和ACID这种特性⼀起使⽤
06:03 - 06:06
So there's a quick show of hands who here has heard of the acronym ACID before
So，在座的快速举下⼿，你们有谁之前听过ACID吗
06:07 - 06:08
all right ,about half okay
Ok，半数都听过
06:08 - 06:10
so we'll cover that
So，我们之后会介绍它
06:10 - 06:12
So before we can talk about ACID
So，在我们讨论ACID之前
6.12-6.13
let's talk about what a transaction is
我们先来讨论下什么是事务
06:14 - 06:16
so in our world today
So，在我们如今的世界中
6.16-6.19
if we're talk about in this lecture
⽤我们课堂上的话讲
6.19-6.27
the transaction is gonna be the execution of a sequence of operations on a database
system to perform some higher-level function
事务其实就是，通过在数据库系统中执⾏⼀系列操作来执⾏某种更⾼级的功能
06:27 - 06:32
and so these operations you can sort of think about as SQL queries or the reads and
writes we're doing to the database
So，你可以将这些操作想象成SQL查询或者是我们对数据库所做的读和写操作
06:33 - 06:44
And by higher-level function I mean something like that reputation you know some
feature we want our application to perform the steps
我所说的更⾼级的功能指的是，我们想让我们的应⽤程序所执⾏的某种功能
06:45 - 06:47
Like transfer money from my account into your account
⽐如：从我的账户上转钱给你的账户
6.47-6.49
that would be a high-level function
这就是⼀个⾼级功能
06:49 - 06:52
because it's suppity program in a transaction in our application
因为这就是我们程序中的⼀个事务
06:53 - 06:58
No database systems gonna have that did that feature that like that single function can
call you know move money
没有任何数据库系统会拥有这种的功能，即通过调⽤单个函数来实现转账的效果
06:58 - 07:01
this is something you would write in your application up above
这种功能是你写在你的应⽤程序中的
07:02 - 07:06
so transactions are going to be the basic unit of change in our database management
system
So，事务其实是我们数据库管理系统中关于修改操作⽅⾯的⼀个基本单位
7.06-7.07
meaning
这意味着
7.07-7.13
this is well how all changes are going to occur in the in the wrapped inside of a
transaction
这意味着所有要做的修改会被包裹在⼀个事务中
07:13 - 07:16
right whether it's if it's multiple queries or a single query
不管它是多个查询还是⼀个查询
7.16-7.18
it's always going to be a transaction
它始终都是⼀个事务
07:19 - 07:22
I suppose you can have a zero query transaction
假设，你有⼀个零查询事务
7.22-7.23
, but that doesn't really mean anything right
但它其实啥也不是
07:23 - 07:27
but it's assumed that it's one or more operations we want to do
但假设该事务中包含了我们想去执⾏的⼀个或多个操作
07:28 - 07:30
and so the key concept though about transactions is that
So，事务中的核⼼概念是
7.30-7.32
we're not going to allow for partial transactions
对于执⾏事务来说，我们不允许只执⾏该事务中的部分操作的情况出现
7.32-7.35
where transactions are always going to be atomic
事务始终得具备原⼦性
07:35 - 07:36
but that means that
但这意味着
7.36-7.39
if I have a sequence of five updates I want to do
如果该事务中包含了我想执⾏的5个更新操作
7.39-7.43
either all five occur or none of them occur
要么这5个更新操作都执⾏成功，要么就都不执⾏
07:43 - 07:47
I can't have you know some like you know maybe the first three out of five succeed and
the other two fail
我不能让这种情况发⽣，即这5个操作中只有3个成功执⾏，剩下2个执⾏失败了
07:48 - 07:49
right it's either all or nothing
即要么全部执⾏，要么全不执⾏
07:50 - 07:53
and even if you have a single query transaction a single operation transaction
如果你有⼀个只包含单个操作的查询事务
7.53-7.56
say I have an update query that updates five tuples
假设我有⼀条更新语句，它会去更新5个tuple
07:57 - 07.58
all right,still one query
All right，它依然是⼀个查询
7.58-8.00
but within that I'm updating five things
但在这个查询中，我要对5个数据进⾏更新
08:01 - 08:04
all five had to get updated not not some subset of them
这个5个数据都要被成功更新，不能只是部分更新成功
08:06 - 08:10
So the transaction example would be that the one I talked about before
So，这个事务例⼦其实就是我之前讲过的⼀个例⼦
8.10-8.14
I want to move a hundred dollars out of my bank account into my shady promoters
account
我想将100美⾦从我的账户转到⼀个推⼴者的账户中
08:14 - 08:17
so the database system doesn't provide this functionality
So，数据库系统并没有提供这种功能
8.17-8.19
in my application code ,I would write the steps to perform this
我会在我的应⽤程序代码中写出该功能的执⾏步骤
08:20 - 08:22
right so in the first step
So，在第⼀步中
8.22-8.26
I would say well check to see whether Andy has $100 he probably doesn't, right
我会说，先检查下Andy账户中有没有100美⾦，他账户中可能并没有这么多钱
08:26 - 08:28
but then if I do
但当我检查完后
8.28-8.30
then you can take the hundred dollars out of my account
那么你就可以从我的账户中取出这100美⾦
08:30 - 08:32
and then put the hundred dollars into his account
然后，将这100美⾦放⼊他的账户中
08:33 - 08:34
all right
8.34-8.35
again these are separate steps
这些是单独的步骤
8.35-8.44
there's no magic way to just materialize money in a single at the lowest level the
hardware to automatically update something ,and another thing at the exact same time
没有任何⿊科技可以在最底层（硬件层⾯）做到⾃动更新某个值，然后在同⼀时间更新另⼀个值
08:44 - 08:48
All right, there's a bunch of extra stuff we have to do to make sure that this happens
atomically
我们还得做⼀些额外的步骤来保证这些操作的原⼦性
08:48 - 08:50
but from the applications perspective
但从应⽤程序的⻆度来说
8.50-8.54
you know they invoke this transaction and this will all happen or none of it happens
你知道的，它们执⾏了这个事务，要么这个事务中的操作被全部执⾏，要么就都不执⾏
08:56 - 09:01 ！！！！
so let's talk about a really simple database system we could build that could do this for
us
So，我们来讨论下我们可以构建出来的⼀个可以为我们做到这点的很简单的数据库系统
09:02 - 09:06
So let's say we have a database system that has only supports a single thread
So，假设我们有⼀个只⽀持单线程的数据库系统
9.06-9.11
meaning only one transaction and only one query can run at a single time
这意味着，⼀次只能执⾏⼀个事务或者⼀个查询
09:12 - 09:16
And you know if multiple queries are multiple transactions show up in the system
如果该系统要去执⾏多个事务
09:16 - 09:17
it just puts them in a queue
它会将这些事务放在⼀个队列中
9.17-9.20
and there's one thread pulling things off that queue and running them one by one
然后通过⼀条线程从队列中拉取并逐个执⾏这些事务
09:21 - 09:24
so now before transaction starts Executing
So，在开始执⾏事务前
9.24-9.25
what they're gonna do is
它们要做的事情是
9.25-9.30
they're gonna copy the entire database file or set of files what however it's architected
它们会去复制整个数据库⽂件或者⼀组⽂件，这取决于它的架构是什么
09:30 - 09:33
it's gonna make a second copy of the database
它会去制作该数据库的第⼆个副本
9.33-9.36
make all the changes that wants to make to that copy
并将所有的修改应⽤到该副本上
09:36 - 09:37
and then if it succeeds
如果修改成功
9.37-9.39
and we want to save all our changes
并且我们想保存我们所做的所有修改
9.39-9.45
then we just flip a pointer to say now the new version of the database is the second file
I just created
那么我们只需重新设定下我们的指针，将它指向我刚创建的第⼆个⽂件（该数据库的新版数据）
即可
09:45 - 09:46
all right
9.46-9.50
so this guarantees that atomicity is to be propagated is mentioned
So，这保证了原⼦性会被传播出去
9.50-9.53
because if I make the copy to the database
因为如果我制作了该数据库的副本
09:53 - 9.55
and then I'm doing five writes
接着，我进⾏了5次写操作
9.55-9.57
but then the first three happen,and then I crash
但只执⾏了前三个写操作后，然后系统就发⽣了崩溃
9.57-9.58
when I come back
当系统恢复后
9.58-10.00
I still have my original copy of the database
我依然留有该数据库的原始副本
10.00-10.01
because I didn't affect that
因为我并没有对它产⽣影响
10:02 - 10:05
I said that you know so everything is still correct there that's fine
So，所有数据依然是正确的，没啥问题
10:06 - 10:07
Things are being written to disk
这些数据都会被写回磁盘
10.07-10.09
so if I crash
So，如果数据库系统发⽣了崩溃
10.09-10.11
I could come back and those my disks didn't die
当系统恢复正常后，并且我的磁盘也没有挂掉的话
10.11-10.12
all my data is still there
那么我的所有数据依然保存在磁盘中
10:15 - 10:16
So would this actually work
So，这种做法实际可⾏吗？
10:18 - 10:18
he says yes
这位同学表示Yes
10:19 - 10:19
would this be fast
这种做法速度很快吗？
10.19-10.24
says no why,you said no ,so why
你说了No，那你能说下这是为什么吗？
10:34 - 10:35
if something to the UH please doesn't matter ,right,
10.34-10.39
the amount of the matter updates I'm doing in my transaction it doesn't matter
不管我的事务中有多少个更新操作，这都没关系
10:39 - 10:41
Because I'm copying the file every single time
因为每次我都会复制这个⽂件
10:41 - 10:42
so I copy entire file
So，我复制了整个⽂件
10.42-10.46
and make one change versus a thousand changes like that copy cost is always the same
不管我对该⽂件进⾏1次修改还是1000次修改，复制⽂件的成本始终是相同的
10:47 - 10:49
But you're right， the copy part is expensive
但你说的是对的，复制这⼀步骤的成本很⾼
10:49 - 10:54
if it's a one kilobyte or starting a four kilobyte page for my database
如果我对数据库中的⼀个4kb⼤⼩的page进⾏操作
10.54-10.55
who cares
谁会在意这种成本呢？
10.55-10.57
that's one Hardware read and write, I can I do that pretty quickly
我只需做⼀次硬件层⾯的读和写操作，我可以很快速地完成这些操作
10:57 - 11:00
but if I have one petabyte of data
但如果我的数据⼤⼩是1PB
11.00-11.00
now for every single transaction
那么，在执⾏每个事务的时候
11.00-11.03
I'm copping one petabyte every single time
那我每次都得复制这1PB数据
11.03-11.04
making my changes
将我所做的修改应⽤到该数据副本上
11.04-11.06
and then updating the pointer
然后更新指针
11:07 - 11:09
so this is a good example
So，这是⼀个很好的例⼦
11.09-11.10
Well，we design a system
我们设计了⼀种系统
11.10-11.14
that had the properties that we want and particularly acid properties that we'll talk about
它拥有我们想要的属性，特别是我们之后要谈论的ACID
11:14 - 11:17
But this is going to be super slow to do it this way
但使⽤这种⽅式的话，速度就会超级慢
11:18 - 11:19
the other issue is that
另⼀个问题是
11.19-11.20
we're also running with a single thread
我们系统使⽤的是单线程运⾏
11:21 - 11:25
so I didn't say anything about whether the database fits in memory or not
So，我并没有说这个数据库⽂件是否放在内存中
11:25 - 11:29
right so now if I'm running with a single thread and tries to touch data that's not in
memory, but it's in disk
如果我所运⾏的系统是单线程的，并且我们试着访问的数据并没有放在内存中，⽽是放在了磁盘
中
11:30 - 11:32
I have to stall my thread until I go fetch it
我就得阻塞我的线程，直到我拿到这些数据
11:33 - 11:34
and I can't run anything else
并且我就不能执⾏其他东⻄了
11.34-11.35
because I only have one thread that can do this at a time
因为我⼀次只能通过⼀条线程来⼲活
11:37 - 11:44
so what we're gonna talk about today and for the next couple weeks is a potentially
better approach
So，我们今天和接下来两周要讨论的是⼀种可能更好的⽅案
11.44-11.50
where we're going to allow transactions to run simultaneously at the same time
即我们允许在同⼀时间同时执⾏多个事务
11:50 - 11:54
and then we're gonna come up with a way to try to put potentially interleave their
operations
我们会试着想出⼀种⽅式，以此来交错执⾏它们的操作
11:55 - 11.56
in such a way that
通过这种⽅法
11.56-11.57
we maximize our parallelism
我们最⼤化了我们的并⾏能⼒
11.57-12.02
but still get all the safety guarantees that they want ,and correctness guarantees that we
want in our database system
但我们依然获得了他们想要的安全性保证，以及我们想在数据库系统中获得的正确性保证
12:03 - 12:06
right and again it's obvious why we want to do this
我们想要这样做的原因显⽽易⻅
12.06-12.10
because we talked about two before, when we talked about latching,we talked about
query execution
在我们讨论latch和查询执⾏的时候，我们就已经讨论过这两点了
12:11 - 12:14
if we can get we can allow multiple queries that run at the same time
如果我们可以同时执⾏多个查询
12:15 - 12:17
we're gonna get better utilization of our Hardware
我们就可以更好地去利⽤我们的硬件
12.17-12.20
better throughput meaning we can do more more work in a same amount of time
更⾼的吞吐量意味着，在相同的时间内，我们可以做更多的⼯作
12:21 - 12:24 ！！
and then the system's gonna look more responsive and snappy
然后，系统的响应速度看起来就会更快
12.24-12.31
because now I don't have to wait in that single queue until my quick transaction gets to
the front, and then I can run
因为我现在不需要等待我的事务⾛到队列的前⾯后，才去执⾏我的事务
12.31-12.34
I could potentially start running right away
我现在可以直接执⾏这个事务了
12:34 - 12:37
but now the tricky thing is gonna be is that
但现在棘⼿的地⽅在于
12.37-12.38
how do we actually do this interleaving
我们实际该如何交错执⾏这些操作
12.38-12.43
you know such a way that we don't violate any better correctness guarantees of our
system
你知道的，以⼀种不违反我们系统正确性保证的⽅式来交错执⾏这些操作
12:43 - 12:51
and that we don't starve any one transaction you know from taking all the resources and
other transactions can't do anything
我们不能让任何⼀个事务执⾏的时候占据了全部资源，这会让其他事务什么事情也做不了
12:52 - 12.57
so concurrency control we're talk about today is a is an old concept that goes back to
the 1970s
So，我们今天所谈论的并发控制是⼀个很古⽼的概念，这得从1970年代说起
12.57-13.02
so when IBM built system R, this is one of the first things they also invented
So，这是IBM在构建System R时，这是他们最先发明的⼀个东⻄
13:02 - 13:05
And so in a disk based system
So，在⼀个基于磁盘的数据库系统中
13.05-13.06
back then
在那个时候
13.06-13.07
of course
13.07-13.09
because memory was limited
因为可使⽤的内存量有限
13.09-13.12
and any time transaction actually could touch data that's on disk and on a memory
每当事务要去使⽤存放在磁盘和内存中的数据时
13:12 - 13:16
and therefore it would stall and then now you could let other transaction to run at the
same time
因此，这个事务会停下来，那么现在你可以在同⼀时间去执⾏其他事务
13:17 - 13:19
in modern systems today
在当下的数据库系统中
13.19-13.21
usually for all it to be applications
通常对于所有的应⽤程序来说
13.21-13.23
they're not that big the databases aren't that big
它们所使⽤的数据库数据⼤⼩并不⼤
13:23 - 13:26
so we have enough memory where we could put the entire database in memory
So，我们有⾜够的内存，我们可以将整个数据库放⼊内存中
13:27 - 13:30
For analytics，you still go to disk ,but that we're not doing transactions there
对于分析型任务来说，你依然得从磁盘中获取数据，但我们不会在磁盘中执⾏事务
13:31 - 13:33
so in a modern system
So，在⼀个现代系统中
13.33-13.35
most mostly ultimate databases can fit memory
⼤多数数据库都能放⼊内存中
13:36 - 13:38
but now Intel is giving us more and more cores
但现在，Intel赋予我们使⽤更多CPU核⼼的能⼒
13:39 - 13:42
so now we're gonna allow transactions around in different cores at the same time
So，我们允许多个事务同时在不同的CPU核⼼上执⾏
13:42 - 13:44
And then we still need to guarantee all these things
并且我们依然需要去保证这上⾯所提到的所有东⻄
13:45 - 13:49
so even though the hardware is different from when how people first invented
concurrency control back in the day
So，虽然当下的硬件和⼈们当时发明并发控制时的硬件已经不可同⽇⽽语
13.49-13.50
we still have the same problem
但我们依然⾯临着相同的问题
13:50 - 13:52
So you still want to maximize parallelism
So，我们依然想去最⼤化并⾏能⼒
13:53 - 13.55
and as I said a couple times already
我之前已经说过这个好⼏次了
13.55-13.57
this is gonna be really hard to do
这做起来真的很难
13.57-13.58
and as I said last class
正如我上节课所讲的那样
13.58-14.02
this is probably the second hardest thing to do in database systems to do concurrency
control
这可能是在数据库系统中使⽤并发控制时所遇到的第⼆⼤难题
14:03 - 14:08
and this is part of the reason why the NoSQL guys when they first came out ten years
ago, they were like we're not doing transactions
这就是为什么⼗年前搞NoSQL那批⼈不想使⽤事务的部分原因了
14:08 - 14:09
okay that's too hard
这个问题太难解决了
14.09-14.10
because they want to run faster
因为他们想要运⾏地更快
14:11 - 14:16
so it's gonna be super hard for us to guarantee correctness with transactions
对我们来说，要保证事务的正确性真的是太难了
14:17 - 14:17
all right
14.17-14.24
so if I we have $100 in my bank account ,and I try to give money to people at the exact
same time， what should happen
So，如果我想将我账户中的100美⾦转到别⼈的账户，这会发⽣什么呢？
14:24 - 14:28
because I don't want to you know assuming that banks not gonna let me overdraft
假设银⾏不允许我透⽀我的账户
14.28-14.31
you know I don't wanna be giving out money I don't actually have
你知道的，我不想将我实际没有的钱给出去
14:32 - 14:34
and then it's also gonna be hard to execute this very efficiently
并且，我们也难以⾼效地去执⾏这个操作
14.34-14.38
because again if I do the serial execution case that I talked about in the beginning
如果我使⽤的是我⼀开始讨论过的按顺序执⾏
14.38-14.40
then that's gonna be always correct
那么它的执⾏结果始终是正确的
14.40-14.42
because only one transaction is running at a time
因为⼀次只执⾏⼀个事务
14:42 - 14:44
And then how many worries about any interleaving
那么我们也不⽤担⼼交错执⾏
14:45 - 14:46
but for now I do want to interleave them
但现在我想要交错执⾏这些事务
14.46-14.51
I want to bet to be as efficient as possible to be to figure out whether I'm running
correct still correctly
我想尽可能⾼效地去弄清楚我的执⾏结果是否依然正确
14:52 - 14:54
I just there's me some overhead to figure these things out
我通过⼀些额外开销来弄清楚这些事情
14:56 - 15:01
so what we're essentially trying to do today, and for the next three or four lectures is
So，本质上来讲，我们今天以及接下来三四节课所试着做的事情是
15.01-15.06
allow for these interleaving the operations of transactions
我们允许这些事务中的操作交织执⾏
15:06 - 15:07
and that well as we see is that
正如我们所⻅到的
15.07-15.09
when we start doing these interleaving
当我们开始交错执⾏这些操作时
15.09-15.10
we can end up with inconsistent databases
我们最终可能会导致数据库数据不⼀致
15:12 - 15:14
and sometimes it's okay ,sometimes it's not okay
有时这是Ok的，有时这并不Ok
15:16 - 15:19
so some inconsistencies will be okay,because they're temporary
So，有些数据不⼀致可能是ok的，因为它们是临时数据
15:19- 15:20
so for example
So，例如
15.20-15.23
if I'm taking money out of my account putting in your account
如果我将我的钱从我的账户转到你的账户
15:23 - 15:26
again I can't do that atomically at the hardware level
我⽆法在硬件层⾯做到原⼦性
15.26-15.29
I have to do that with you know multiple instructions or multiple operations
我得通过多条指令或者多个操作才能做到这点
15:29 - 15:40
So there will be a brief period in time where I take the $100 out of my account and then
before I put it in your account ,that hundred dollars it doesn't exist anywhere
在我将这些钱从我的账户转⼊你的账户前，在⼀段时间内，这100美⾦不存在于任何地⽅
15:40 - 15:41
so that's okay
So，这是Ok的
15.41-15.43
because that's temporary it's unavoidable
因为它是临时的，这是不可避免的
15:44 - 15:47
the outside world will not see potentially not see that inconsistency
外界可能不会看到这种数据不⼀致
15.47-15.50
and we'll do some protection mechanisms make sure that they can't see this
我们得做些保护机制，以此来确保外部⽆法看到这些东⻄
15:51 - 15:55
and so because we're gonna allow this，this is gonna last actually make this all work
So，因为我们通过允许这个临时数据，最终会使所有的⼀切都⼯作正常
15:56 - 15.58
but the thing we want to avoid permanent inconsistencies
但我们想去避免永久不⼀致的情况
15.58-16.00
well again if I take the hundred dollars out
Well，如果我取出了这100美⾦
16.00+-16.01
and then I crash
然后数据库系统发⽣了崩溃
16.01-16.03
and I come back that hundred dollars better not be missing
当数据库系统恢复正常后，我希望这100美⾦最好没有丢失
16:04 - 16:07
all right,a better it better be in the other account or my account ,it can't just disappear
它最好在另⼀个账户（即我们的转账⽬标账户）或者是我的账户，它不能消失
16:09 - 16:12
so in order for us to understand whether we're doing the right thing
So，为了让我们去理解我们所做的事情是否正确
16.12-16.18
whether we're coming out with the interleaving of our transactions that are actually
correct
以及我们所交织执⾏的事务是否正常
16:19 - 16:22
we need a more formal definition of what actually means to be correct
我们需要⼀种更加正式的定义，即什么才是正确的
16:22 - 16:24
because it's sort of obvious for us right yeah
显⽽易⻅
16.24-16.28
if I take a hundred dollars of my account, and before I put it in your account we crash
如果我从我的账户中取了100美⾦，在我将它放⼊你的账户前，我们发⽣了崩溃
16:28- 16:32
like that sort of obvious we know that we don't want to lose a hundred dollars or any
amount of money
在遇上这种情况，很明显，我们不想丢掉这100美⾦或者说任意⾦额
16:33 - 16:34
but from the database systems perspective
但从数据库系统的⻆度来看
16.34-16.38
it doesn't know that it's operating no money just sees a bunch of bytes and it's moving
them around
它并不知道它是对钱进⾏操作，它只是看到了⼀些byte，然后对它们进⾏移动
16:39 - 16:42
so we need a way for us to reason about whether we're doing the correct thing
So，我们需要通过⼀种⽅式来解释我们所做的事情是否正确
16:44 - 16:48
so the first thing we need to find what are these operations that we're actually doing
So，⾸先我们要弄清楚的是我们执⾏的这些操作实际做了什么
16:48 - 16:49
So as I said already
So，正如我之前说过的那样
16.49-16.52
a transactions may contain of one or more operations
⼀个事务中可能包含了⼀个或多个操作
16:55 - 16.56
but at a high level
但从⼀个⾼级层⾯来讲
16.56-17.02
the database the application could be you know update this insert that make these
changes
应⽤程序可以对数据库中的数据进⾏更新和插⼊操作
17:02 - 17:04
but from the database systems perspective
但从数据库系统的⻆度来说
17.04-17.06
it doesn't know about those high-level queries
它并不明⽩这些⾼级查询的意思是什么
17.06-17.09
it just knows that I'm doing low-level reads and writes
它只是知道，我正在做底层的读写操作
17:10 - 17:14
and so the only thing that we can reason about are the things that happened to our
database
So，我们唯⼀能解释的东⻄就是在数据库中所发⽣的事情
17:15 - 17:16
so that means that
So，这意味着
17.16-17.23
if our transaction involves additional steps or procedures or operations, that aren't
reads and writes on the database
如果我们的事务涉及了⼀些额外的步骤、过程或者操作，这些并不是对数据库进⾏读和写的操作
17:24 - 17:26
this is outside our purview
这就超出了我们的权限
17.26-17.26
,this is outside our control
超出了我们的控制范围
17.26-17.28
and we can't do anything about it
我们⽆法对它对任何事情
17:30 - 17:31
so to give an example
So，来看个例⼦
17.31-17.34
let's say that I'm gonna take a hundred dollars out of my account, I put it in your
account
假设我从我的账户中转100美⾦到你的账户
17:35 - 17:39
and then I send an email to you to say the transfer succeeded
然后，我发了⼀封邮件给你，以此告诉你转账成功了
17:39 - 17:41
and that we want that to happen in the transaction
我们希望这个操作是在这个事务中发⽣的
17:42 - 17:47
but then before I can go commit and save my changes,there's a crash
但在我提交这个事务并保存我的修改前，突然发⽣了崩溃
17:48 - 17:49
so I've sent the email
So，我已经发送了邮件
17.49-17.51
but then I crashed before I save all the changes
但在我将这些修改保存前，我就崩溃了
17.51-17.53
that email is gone up on the network
邮件已经通过⽹络发送出去了
17.53-17.55
it's outside the database now
这超出了数据库的控制范围
17:55 - 17:56
it's gone out in the real world
它已经进⼊了现实世界（即发送出去了）
17.56-17.58
we can't retract that
我们⽆法收回这封邮件
17:59 - 18:05
So we can only reason about and roll back and persist things that are these low-level
reads and writes to our database
So，我们只能对数据库中那些底层的读和写操作进⾏解释、回滚以及持久化
18:05 - 18:10
if we make a call to you know to an outside system or whatever like that's beyond us
如果我们调⽤了外部系统中的东⻄，那这就超出了我们的控制范围
18:11 - 18:12
no system can handle that
没有系统可以处理这点
18.12-18.16
at least we're talking out here so far
⾄少我们讨论过的都没法做到
18:16 - 18:16
okay
18:18 - 18:27
so the database that were going to be worried about today is going to be defined as a
fixed set of arbitrary data objects
So，我们今天所关⼼的数据库其实是由任意数据对象所组成的固定集合
18:27 - 18:30
that are each going to have a label or a name
每个数据对象都有⼀个标签或者名字
18:30 - 18:31
so in this case here
So，在这个例⼦中
18.31-18.32
we'll just use ABCD
我们就使⽤ABCD来命名
18.32-18.34
but we'll just use alphabet characters
我们只需使⽤这些字⺟来命名即可
18:35 - 18:37
So the two things to point out here are
So，这⾥要指出的两件事情是
18.37-18.40
one I'm not defining what a database object is
第⼀点是，我并没有定义database object是什么
18:41 - 18:46
it could be an attribute, it could be a tuple, could be a page ,could be a table, could be a
database it doesn't matter
它可以是⼀个属性，⼀个tuple，⼀个page，⼀张表，也可以是⼀个数据库，这些都可以
18:46 - 18:53
all the same things that we'll talk about today ,and for the next couple couple classes
they're all still work on different granularities
我们今天以及下两节课所讨论的所有东⻄，它们能⽤在不同粒度上的
18:54 - 18:55
In practice
在实战中
18.55-18.57
most the time it's going to be based on a tuple
⼤部分情况下，它都是基于tuple的
18:58 - 19:03
but we'll see in some cases you can take locks ,you can try to protect databases and
tables
但在有些例⼦中，你们可以试着⽤锁来保护数据库和表
19:03 - 19:07
nobody exercise protect single fields that becomes too expensive
没有⼈会对单个字段进⾏保护，这样做的成本太⾼了
19:08 - 19:09
The other thing to point out too is that
另⼀件要说的事情是
19.09-19.12
I'm saying the database is a fixed size
假设，数据库中的数据量⼤⼩是固定的
19:12 - 19:13
So that means
So，这意味着
19.13-19.16
that the only operations we're gonna do are reads and writes
我们唯⼀要做的操作就是读和写
19.16-19.19
reads or updates of existing things
即对现有的数据进⾏读取或者更新
19:19 - 19:21
we're not gonna talk about inserts today
今天我们不会去讨论插⼊操作
19.21-19.22
we're not going to talk about deletes
我们也不会去讨论删除操作
19.22-19.25
the database system always has the same number of things
数据库系统中的数据数量是相同的
19:25 - 19:25
Because that's gonna complicate things
不然，这会让事情变得复杂
19:27 - 19:30
and we'll cover that on Monday next week
我们会在下周⼀介绍这个
19:30 - 19:33
so for today just assume that we've always have the same number objects
So，就今天⽽⾔，我们会假设我们操作的对象的数量是不变的
19:34 - 19:40
and so now what the database is gonna see is just the sequence of read and write
operations on these named Object up above
So，现在，数据库所看到的就是对这些named data object所做的⼀连串读写操作
19:40 - 19:44
so we're to say we use the function R for a read ,and the function of W for a write
So，这⾥我们⽤函数R代表读操作，函数W代表写操作
19:44 - 19:48
so this is the only thing that we can see in our database system
So，这是在我们数据库系统中我们唯⼀能看到的东⻄
19.48-19.53
we can't see anything else，any program logic, that the application may be running for
the transaction
我们⽆法看到其他东⻄，⽐如应⽤程序执⾏事务时的程序逻辑
19:54 - 19.56
And that's gonna limit the amount of parallels and we're be able to get
这就会限制我们所能达到的并⾏量
19.56-20.02
because we don't understand some kind of high-level meaning with what the transaction
is actually trying to do
因为我们⽆法理解事务在⾼级层⾯所试着做的事情

16-02
16-02
20:02 - 20:03
we'll see one case
我们会看⼀个例⼦
20.03-20.05
where if you can get better parallelism
即如果你可以获得更好的并⾏能⼒
20.05-20.07
but in practice nobody does this
但在实战中，没⼈能做到这点
20.07-20.09
and we'll get to that later
我们之后会对此进⾏介绍
=======================
20:11 - 20:13
so now from a practical standpoint
So，从实战的⻆度来说
20.13-20.17
how do you actually implement or use transactions in applications and database systems
today
我们实际该如何在应⽤程序和数据库系统中实现或使⽤事务呢？
20:17 - 20:18
so in the SQL standard
So，在SQL标准中
20.18-20.22
you have these extra keywords begin commit and abort
我们拥有这些额外的关键字，即BEGIN，COMMIT以及ABORT
20:22 - 20:24
some systems use roll back instead of abort
有些系统使⽤的是ROLLBACK⽽不是ABORT
20.24-20.27
I think Postgres MySQL support both
我觉得PostgreSQL和MySQL对这两者都⽀持
20:27 - 20:32
so we're gonna explicitly start a new transaction with the begin keyword
So，我们会通过BEGIN关键字来显式声明开始⼀个新事务
20:33 - 20:37
and then what happens is we make we any queries we then execute or a part of that
transaction
接着我们要做的就是写出我们要做的任意查询，并作为⼀个事务的⼀部分来执⾏
20:37 - 20:41
and then the other call I want to commit or abort
然后我可以通过调⽤COMMIT或者ABORT来决定是否提交这个事务，还是中⽌这个事务
20:42 - 20:45
so if the user says I want to commit, then two things can happen
So，如果⽤户说：我想要提交事务，那么这⾥就会发⽣两件事情
20:46 - 20:48
either the transaction does commit
如果该事务被提交了
20.48-20.50
the database saves all the changes that you made
那么数据库就会保存你所做的所有修改
20.50-20.53
and returns back in acknowledgments is to say they're successful
并返回⼀个确认消息，以此表示该事务执⾏成功
20:54 - 20:58
or the database systems can say, you can't actually commit
或者数据库系统表示，你不能进⾏提交
20:58 - 21:01
I'm not gonna let you make those changes
我不会让你做的这些修改⽣效
21.01-21.03
and I'm gonna go ahead and shoot you and abort you and you have the rollback
我会中⽌这个事务，并回滚该事务所做的所有操作
21.03-21.05
and you get a notification that your transaction failed
然后，你就会收到⼀个事务执⾏失败的通知
21:07 - 21:11
right so just because the application calls commit, doesn't mean you're actually gonna
commit
So，因为应⽤程序调⽤COMMIT并不意味着你就会提交这个事务
21:12 - 21:14
again,that's a very important concept that we can rely on later on
这是⼀个⾮常重要的概念，我们之后可以⽤到
21:16 - 21:17
if the transaction gets aborted
如果这个事务被中⽌
21.17-21.22
then any changes that we made since we called begin will get roll back
任何⾃BEGIN处开始我们所做的修改都会被回滚
21.22-21.25
and it'll appear as if the transaction never ran at all
这就像是这个事务从未被执⾏⼀样
21:25 - 21:29
so that's how we guarantee if I'm moving hundred dollars out of my account to your
account
So，如果我从我的账户转100美⾦到你的账户
21:29 - 21:32
if the thing fails before we put the money in your account
如果在我将钱打⼊你账户前，某个地⽅出现了问题
21.32-21.34
the transaction gets abort to come back,
那么该事务就会中⽌执⾏
21.34-21.37
and if we go back to the state we were before we started our transaction
并且状态会变回我们开始执⾏事务前的状态
21:38 - 21:40
right,this is how we guarantee that there's no partial transactions
这就是我们保证不存在那种只执⾏部分操作的事务的⽅式
21.40-21.40
yes
请问
21:44 - 21:45
His question is
他的问题是
21.45-21.47
why would do we want to tell the DBMS you want to abort
为什么我们想告诉DBMS你想中⽌这个事务
21:48 - 21:57
so a lot of times there's application code where you say take take take for example ,take
the money out of my account, or I'm transferring money
我就拿转账这个例⼦为例，我将钱从我的账户中取出，或者我转钱给其他⼈
21:58 - 21.59
so I go look at my account first
So，我⾸先会去看下我的账户
21.59-22.02
,I read that do I have $100, yes
我会检查我的账户⾥⾯是否有100美⾦，查出来确实有
22:02 - 22:04
now go take a hundred as my account
于是就从我的账户中取出100美⾦
22.04-22.05
but then I'll go read your account
接着，我会去读取你的账户
22.05-22.08
and your bank's your accounts my flag fraud
我发现你的账户是个欺诈账户
22:08 - 22:11
so now I want to abort and roll that back
So，现在我想中⽌这个事务，并回滚所有的修改
22:11 - 22:13
right ,the simple reason
这是个很简单的原因
22:15 - 22:17
I don't know how often that occurs
我不清楚它的发⽣频率有多⾼
22:21 - 22:24
I always say I mean most code I want to commit they want to go to commit ,right
我的意思是，我想进⾏中⽌的时候，它们就会中⽌
我的意思是说，我想要去提交我想提交的东⻄
22:25 - 22:27
but we have to be able support this
但这个提交的过程得能够⽀持这⼀点（知秋注：万⼀你是个欺诈账户的话，你就得回滚事务）
22:29 - 22:31
So again the main thing to point out here is
So，这⾥主要指出的⼀点是
22.31-22.34
this abort could either be self-inflicted
事务的中⽌可能是⾃我引发的
22.34-22.38
meaning we tell us if we want abort or the database system tells you you have to abort
这意味着，如果我们想中⽌这个事务，或者数据库系统告诉你，你得中⽌这个事务
22:38 - 22:42
and then if you system comes back says you have to abort are you got aborted
那么，如果系统回过头来告诉你，你得中⽌这个事务，那这个事务就会被中⽌
22:42 - 22:48
then it's up for you in the application code to catch that you get like an exception back,
and says you know your transaction failed
这取决于你是否要在应⽤程序代码中去捕获这种异常，并说，你的事务执⾏失败了
22:49 - 22:51
and it'll suggest that you retry it
它会建议你重新执⾏这个事务
22.51-22.54
and you have to go back in application code if you actually care about this and retry
again
如果你在意这⼀点，你就得回到应⽤程序代码这⾥，并试着重新执⾏这个事务
22:55 - 22:55
all right
22:57 - 23:06
so the correctness criteria we're going to use now ,for this lecture and going forth
through the rest of the semester is going to be defined in terms of this acid acronym
So，我们这节课以及这学期剩下的时间⾥所要使⽤的正确性标准就是ACID
23:07 - 23:11
so ACID stands for atomicity consistency isolation and durability
So，ACID的意思是原⼦性、⼀致性、隔离性以及持久性
23:11 - 23:14
so atomicity is what we already talked about
So，原⼦性这块我们之前已经讲过了
23.14-23.17
where we say all that the operations of a transaction have to occur or none of them
occur
我们说过，对于⼀个事务中的所有操作来说，要么全部执⾏，要么全不执⾏
23:17 - 23:19
right no partial transactions
不存在这个事务只执⾏其中部分操作的情况
23:20 - 23:22
consistency is sort of a weird one
⼀致性是其中⽐较奇怪的⼀个东⻄
23.22-23.24
I'll briefly talk about it
我之后会简单讲下它
23.24-23.28
but it's very handy how it actually means
但它⾮常便利
23.28-23.29
at least for a single node database system
⾄少对于⼀个单节点数据库系统来说是这样的
23:30 - 23:31
so it just says that
So，它的意思是这样的
23.31-23.37
if the transaction is consistent ,like doorbell ,sorry I forget
如果事务是⼀致的，不好意思，闹铃响了，我忘记开静⾳了
23:38 - 23:42
if the transaction is consistent ,and the database system is consistent
如果事务是⼀致的，并且数据库系统也是⼀致的
23.42-23.48
then when the transaction executes ,then the database and state will be consistent
那么当事务执⾏的时候，数据库的状态也会是⼀致的
23:48 - 23:50
so now you're like what is consistent mean
So，所谓的⼀致是什么呢？
23.50-23.52
well at a high level it means correctness
Well，从⾼级层⾯来看，它的意思是正确性
23:53 - 23:54
but then what does that mean
但这意味着什么呢？
23:55 - 23:57
so again we'll cover this in a few more slides
So，我们会在接下来的⼏张幻灯⽚中对此进⾏介绍
23:59 - 24:03
this one again as it was originally defined by the guy that invented this this acronym
再说⼀遍，它⼀开始是由发明这个缩略词的⼈所定义的
24:04 - 24:05
this one was always a really handy one
它⼀直是⼀个很⽅便的东⻄
24.05-24.12
it's some people feel like he sort of forced this one in here in order to get that the
acronym to work out
有些会强制做到这点，以此来具备ACID的特性
24:12 - 24:14
the other thing too is that
对此，另⼀件事情是
24.14-24.18
the database law is that he made this thing up to make fun of his wife
他所创造的这个数据库法则是⽤来取悦他⽼婆⽤的
24:19 - 24:22
Because like his wife didn't like candy or she was like a bitter woman or something
因为他的妻⼦并不喜欢糖果，或者说她喜欢苦味的东⻄
24:22 - 24:24
so he named it after her,
So，他将这个命名为ACID
24.24-24.26
I don't know whether that was true he's Germans and maybe
我不知道这是不是真的，他可能是德国⼈
24:27 - 24:29
but there's another one called base
但这⾥有⼀个叫做BASE的东⻄（Basically Available, Soft State, Eventual consistency）
24.29-24.31
which is for distributed systems or NoSQL systems
这是对于分布式系统或者NoSQL系统来说的
24.31-34.33
and we'll cover that and a few more lectures
我们会在稍后的课上对它进⾏介绍
24:33 - 24:36
so there's acid is what we care about here base will cover later
So，今天我们会讲ACID，BASE的话，我们之后再讲
24:37 - 24:38
isolation is another important one
另⼀个重要的东⻄就是隔离性
24.38-24.39
that means that
这意味着
24.39-24.41
the when our transaction executes
当我们执⾏我们的事务时
24:42 - 24:43
it should have the isolation
它应当具备隔离性
24.43-24.47
that it's running by itself even though other transactions may be running at the same
time
即使在同⼀时间其他事务也在执⾏，该事务与它们是隔离开来的
在同⼀时间有⼏个事务在同时运⾏，事务间是彼此隔离开的
24:47 - 24:51
and the database system will provide that that isolation for it
数据库系统会为该事务提供隔离性
24:51 - 24:53
and then durability is
持久性指的是
24.53-24.55
if our transaction commits，all our changes get saved,
如果我们的事务都提交了，并且所有的修改都被保存了
24.55-24.58
and we get back at on acknowledgment that transaction committed
然后，我们就会收到该事务被提交的通知
24:59 - 25:05
then no matter what happens to the database whether you know it the Machine crashes,
it's not OS crashes ,the machine catches on fire
不管我们的数据库发⽣什么都没有关系，⽐如：遇上机器崩溃，OS崩溃，机器起⽕之类的事情
25:06 - 25:08
then all our changes should be persistent
我们所做的所有修改都应该是持久化的
25.08-25.11
maybe she always could be able to come back and see our changes
当系统恢复正常后，它应该能看到我们所做的修改
25:11 - 25:13
our changes may get overwritten
我们所做的修改可能会被覆盖
25.13-25.14
that's okay
这是Ok的
25:14 - 25:16
but for least for our transaction
但⾄少对于我们的事务来说
25.16-25.18
you know we know that all has changes got persistent
我们知道，所有的修改都会被持久化
25:20 - 25:23
So another shorthand way of looking at these things you would say
So，快速记住这些东⻄的⽅式是
25.23-25.27
Atomicity just means all or nothing no parts of transactions
Atomicity指的是All or Nothing，即我们在执⾏⼀个事务的时候，不会只执⾏其中的部分操作
25:27 - 25:30
because consistency means it looks correct to me and correct will be in quotes
⼀致性的意思是，对于我来说，这个数据看起来是正确的，这个正确要打个引号
25:31 - 25:32
Isolation means
隔离性的意思是
25.32-25.33
you're running as if you're alone
你执⾏事务的时候，仿佛只有你⼀个⼈在执⾏事务
25.33-25.36
and then durability means that you're going to survive all failures
接着，持久性的意思是，你的数据会从各种故障下存活下来
25:37 - 25:38
so for today's class
So，在今天的课上
25.38-25.39
we're going to go through each of these one by one
我们会对它们逐个进⾏讲解
25:40 - 25:42
and describe at a high level
并从⼀个⾼级层⾯来描述它们
25.42-25.49
what it means to determine whether we are achieving the ACID guarantee with a given
property of each letter
我们会来看下我们所实现的ACID中这四个字⺟分别代表的意思
25:49 - 25:51
we're gonna mostly focus on atomicity and isolation
我们会将重⼼主要放在原⼦性和隔离性上⾯
25.51-25.53
I'll briefly talk about consistency here
我会简单讨论下⼀致性
25.53-25.55
it doesn't really make that much sense for a single node system
对于单节点系统来说，这没有太多意义
25.55-25.56
it matters more for distributed systems
对于分布式系统来说，它很重要
25:57 - 26:00
and then for durability we're also not really going to talk about it too much
对于持久性这块内容，我们也不打算讨论太多
26:00 - 26:07
because we'll spend that whole two lectures after after I come back on on checkpoints
and logging
在我回来讲完checkpoint和logging这俩内容后，我们会花两节课来讲这块内容
26.07-26.07
because that's how they're gonna achieve that
因为这是我们如何实现它们的⽅式
26:09 - 26:10
okay
26.10-26.19
and I'll say also to that acid is what you would get in a if a relational DBMS says they
support transactions
如果你们使⽤的关系型DBMS⽀持事务的话，那你们就会遇上ACID
26:19 - 26:21
this is typically what I mean
也就是我通常所说的这些东⻄
26:22 - 26:23
the NoSQL systems that don't do transactions
对于那些不使⽤事务的NoSQL数据库系统来说
26.23-26.32
they're typically going to sacrifice often Atomicity、isolation ,and consistency actually
some of them do get rid of everything
它们通常会牺牲掉原⼦性、隔离性以及⼀致性。实际上有些NoSQL数据库直接不使⽤ACID
26:32 - 26:33
but we'll take that offline
但我们课下再讲这个
26:34 - 26:36
all right let's talk about atomicity
我们来讨论下原⼦性
26:36 - 26:37
so as I said already
So，我之前就已经讲过
26.37-26.40
there are two outcomes of our transaction
我们事务执⾏的结果有两种
26:40 - 26:45
either it commits and all our changes get get % or get could apply to the database all at
once
要么我们在事务中所做的所有修改都被提交并落地到数据库中
26.45-26.47
or it gets aborted
或者，就是该事务被中⽌了
26.47-26.52
because of some you know either database says so or application says so
因为这可能是数据库中⽌了该事务，也可能是应⽤程序中⽌了该事务
26:52 - 26:56
so again what we're providing the guarantee were providing to our application is
So，我们为我们的应⽤程序所提供的保证是
26.56-26.58
that that any transaction that we execute
对于我们所执⾏的任意事务来说
26:59 - 27:00
all the changes will be atomic
所有的修改都是原⼦的
27.00-27.01
meaning
这意味着
27.01-27.04
they'll all appears that they happen exactly at the same time
这些事务看起来像是在同⼀时间发⽣的
27:05 - 27:06
So again it just means that
So，这意味着
27.06-27.07
either everything happens or none of it happens
某个事务要么全部执⾏，要么全不执⾏
27:08 - 27:11
so no matter what happens if I say I commit then I know everything got got saved
So，不管发⽣什么，如果我说我这个事务提交了，那么我就知道所有修改都落地了
27:12 - :27:14
so let's look at two scenarios
So，我们来看两种情况
27.14-27.17
where we could have problems atomicity
我们可能会在原⼦性⽅⾯遇上问题
27.17-27.19
and then we'll see how I actually want to solve it
接着，我们来看下我们实际该如何解决它
27:20 - 27:22
so again my beloved example
So，以我喜欢的这个例⼦为例
27.22-27.24
I'm taking a hundred dollars out of my account and putting it to another account
我从我的账户中取100美⾦，并放⼊另⼀个账户
27:25 - 27:31
but then we we take the money out of my account ,but then the transaction gets aborted
当我从我的账户中将钱取出后，接着，该事务被中⽌了
27:31 - 27:35
the machine doesn't crash, the database system doesn`t crash we just get aborted
该机器和数据库系统并没有发⽣崩溃，只是我们的这个事务被中⽌了
27:35- 27:36
the second scenario is
第⼆种情景是
27.36-27.38
when you can take the hundred hours out,
当你取出这100美⾦后
27.38-27.40
but now there's a power failure
但现在我们遇上了断电
27.40-27.43
and everything that the database systems running is lost
数据库系统中的所有东⻄都丢失了
27:44 - 27:46
we come back and what should be the correct state of the database
当系统恢复正常的时候，它的正确状态是什么呢？
27:47 - 27:47
All right
27:49 - 27:50
so there's two ways we could possibly handle this
So，我们有两种⽅法可以处理这种情况
27:52 - 27:54
the most common approach is to do logging
最常⻅的⽅案就是做⽇志（Logging）
27:54 - 27.55
so when I say logging
So，当我说logging的时候
27.55-28.00
I don't mean like you know the log debug messages you're using for your projects
我指的并不是你在你项⽬中⽤来进⾏debug的log消息
28:00 - 28:02
right I mean something like write ahead logging
我指的是预写式⽇志之类的东⻄（Write Ahead Logging）
28.02-28.05
but we're actually recording our file on disk
但实际上，我们会将⽂件记录在磁盘上
28.05-28.07
here's all just that we're making
这实际就是我们所做的事情
28:07 - 28:08
so what will happen is
So，这⾥所发⽣的事情是
28.08-28.15
the database system gonna run ,and as it runs a transaction every for every change I
make to the database every update or write I do to the database
对于我对数据库所做的每次修改来说
28:16 - 28:20
I'm gonna make a copy of what the old value was that I'm overwriting
我会对我要覆写掉的旧值制作⼀份副本
28:21 - 28:24
and then that way if I crash or my transaction gets aborted
如果我遇上了崩溃或者事务中⽌的情况
28.24-28.27
I had the old value sitting around
我还留有旧值的副本
28.27-28.29
and I can go back and put it back in place
我可以回过头去，将它恢复原状
28:30 - 28:33
so that when my transaction gets cleaned up after an abort
So，当我的事务被中⽌并清理的时候
28.33-28.36
all the original value were still there
所有原来的值都还在那⾥
28:39 - 28:41
and so the way this is going to work is that
So，它的⼯作⽅式是
28.41-28.45
this is going to be we're gonna maintain these undo records both in memory and on disk
在内存和磁盘中，我们都要去维护这些Undo Record
28:46 - 28:51
and that way again if we crash while if the transaction is aborted ,while we're running
如果当我们执⾏事务的时候，事务被中⽌了
28.51-28.54
then if it's in memory we just go reverse things real quickly
如果这些Undo Record是放在内存中的，那我们就能很快将修改过的部分变回原来的值
28:54 - 28:57
but if Stuff written a disk and then we crash
但如果这些Undo Record是放在磁盘上的，接着我们遇上了崩溃
28:58 - 29:03
then we have our log records on disk that we can then load back in when we turn the
database system on
当我们再打开数据库系统的时候，我们可以将这些保存在磁盘上的⽇志记录加载回来
29.03-29.06
and reconcile put us back in the correct state
并使我们回到正确的状态
29:07 - 29:11
so in a high level you can sort of think of the log as the black box and an airplane
So，从⾼级层⾯来讲，你可以将⽇志视作是⻜机上的⿊盒⼦
29.11-29.15
like if there's a major any airplane crash as a major crash
不管怎么说，⻜机出事就是⼤事
29:15 - 29:20
but if an airplane crashes, what the government goes and looks at the black-Box
但如果⻜机出了事，政府就会去查看⻜机上⿊盒⼦中的内容
29:20 - 29:20
all right
29.20-29.27
because that's gonna record information about what actually is you know what happened
in the plane at the moment that it crashed
因为⿊盒⼦⾥⾯记录了⻜机出事时所有发⽣的事情
29:27 - 29:30
and then it tries to figure out what was the error what was the malfunction
接着，它会试着弄清楚错误是什么，故障⼜是什么
29:31 - 29:32
now in the in the airplane case
在这个⻜机案例中
29.32-29.33
they can't put the airplane back together
他们没法将⻜机恢复原状
29.33-29.34
and the database can
但数据库可以
29.34-29.35
okay so we can put it back together
So，我们可以将数据库恢复原状
29.35-29.37
all right that's what we're gonna use that form
这就是我们使⽤logging的原因所在了
29:38 - 29:45
so logging at a high level ,right will be used by almost everything we'll make database
system that's out there
So，从⼀个⾼级层⾯来讲，我们所⻅到的所有数据库系统⼏乎都⽤到了logging
29:46 - 29:52
any database system that says that they're durable to disk ,chances are they're using
logging
所有数据库都表示它们会通过使⽤logging的⽅式将数据持久化到磁盘
29:52 - 29:58
so in addition to you know having the ability to roll back things and guarantee atomicity
So，此外，为了能够做到回滚，以及保证原⼦性
29:58 - 30:07
Logging gonna provide us additional benefits in terms of both performance ,and high
level concept of high level criteria we may have for application on organization
Logging为我们提供了⼀些额外好处，不管是在性能上，还是在应⽤程序的组织结构上
30:08 - 30:09
So it's going to turn out that
So，事实证明
30.09-30.11
when we start talking about logging
当我们开始讨论logging的时候
30.11-30.14
since no disk are expensive write to,
因为磁盘写⼊的成本很⾼
30.14-30.18
we can turn random writes into sequential writes through a log
通过⽇志，我们可以将随机写⼊变成循序写⼊
30:18 - 30:20
all right and that'll make the system run faster
这会使得系统跑得更快
30:20 - 30:21
and then for other applications
对于其他应⽤程序来说
30.21-30.28
the log is actually essentially going to be, you know a audit trail every single thing your
application did
实际上，⽇志可以⽤来跟踪审计你应⽤程序所做的每⼀件事
30:29 - 30:31
then you can use that to figure out what was happening,
你可以通过⽇志来弄清楚之前发⽣了什么
30.31-30.36
if you ever have an audit or to have questions about know my application did this at this
time
如果你对你应⽤程序在这个时间点所做的事情有疑问
30:36 - 30:41
because and then there was a breach what data I got read or what data I got written
我们可以通过⽇志来弄清楚我在这个时间点读取了什么数据，以及写⼊了什么数据
30:42 - 30:44
so in a lot of financial companies
So，在很多⾦融公司中
30.44-30.48
they have to maintain the the log that database system generate for the last seven years
他们必须维护过去七年间数据库系统所⽣成的⽇志
30.48-30.50
because of a government regulation
这是因为政府法规的缘故
30:50 - 30:51
So this is a good example
So，这是⼀个很好的例⼦
30.51-30.57
where I can use the log for atomicity, but also get additional benefit from it
我可以通过⽇志来保证原⼦性，并且也能从中获得其他好处
30:57 - 31:00
so the other approach to guarantee atomicity that's less common is called shadow
paging
So，另⼀种⽐较少⻅⽤来保证原⼦性的⽅案叫做shadow paging
31:01 - 31:04
and this is actually the example that I mentioned the beginning the class
实际上，我在这节课开始的时候提到过这个例⼦
31.04-31.05
where I said for every single transaction
我说过，对于每个事务来说
31.05-31.07
I'm gonna make a copy of the database file on disk
我会在磁盘上制作⼀份该数据库⽂件的副本
31:08 - 31:10
all my changes go to that copy
我会将我所有的修改都放在这个副本上执⾏
31.10-31.11
and then when my transaction commits
当我的事务提交的时候
31.11-31.16
I just swing a pointer and say this is now the master version
我只需要让指针指向这个副本即可，并表示，现在这个副本就是该数据的主版本
31:16 - 31:17
so that's essentially what shadow paging is
So，本质上来讲，这就是shadow paging所做的事情
31:18 - 31:21
but instead of copying the single file every single time
但我们⽆须每次都去复制⼀份⽂件
31.21-31.26
they'll just copy the individual pages that the transaction modifies when it runs
当事务运⾏的时候，它们只需去复制该事务所修改的那些page
31:26 - 31:27
and then when the transaction commits again
接着，当事务提交的时候
31.27-31.28
you swing a pointer, and say
你只需修改下指针指向的东⻄，并说
31.28-31.33
all right all of these shadow copy pages are now the master copy pages
所有这些影⼦副本page现在就是主副本page
31:33 - 31:35
So this is the one of the oldest ideas in database systems
So，这是数据库系统中⼀个最为古⽼的思想
31.35-31.38
this was invented about IBM in the 1970s in system R
这是IBM在1970年代为System R所发明的东⻄
31:41 - 31:47
this turns out to be super slow ,and problematic for managing data on disk
事实证明，它的速度⾮常慢，⽽且在管理磁盘数据⽅⾯很有问题
31:47 - 31:49
and when IBM went to go build DB2
当IBM去构建DB2的时候
31.49-31.53
which is the second relational database system they built after system R
DB2是他们⾃System R之后构建的第⼆个关系型数据库系统
31:53 - 31:55
they didn't do any of this， they went with the logging approach
他们并没有去使⽤Shadow Paging这种⽅案，他们选择去使⽤Logging这种⽅案
31:56 - 32:01
because you end up with fragmentation,and it with unordered data sets,
因为你最终会⾯临磁盘碎⽚和⽆序数据集的问题
32.01-32.03
and it gets slower
这会让它的速度越变越慢
32:04 - 32:06
so as far as you know today
So，就当下我们所知道的
32.06-32.13
the only two database systems that actually do this is shadow paging approach is
CouchDB ,and LMDB
唯⼆使⽤这种shadow paging⽅案的数据库系统就是CouchDB和LMDB
32:16 - 32:17
they say it's for performance reasons
他们表示，这是出于性能⽅⾯的原因
32.17-32.18
it's not that common
这并不常⻅
32.18-32.20
everyone else is gonna do is gonna do logging
其他所有⼈使⽤的都是Logging这种⽅案
32:22 - 32:24
so this is question, yes
有问题吗？请问
32:28 - 32:32
oh yes this one keep going this one
你问的是这张幻灯⽚上的内容吗？
32:37 - 32:40
So for this one is it's the same operation
So，这个例⼦中，它执⾏的操作其实是相同的
32.40-32.42
take money around account put in your account
即将钱从我的账户放⼊你的账户
32:42 - 32:44
this is like we get a aborted
在第⼀个例⼦中，我们的事务被中⽌了
32.44-32.46
like the user says abort my transaction
⽐如：⽤户表示：请终⽌我的事务
32:47 - 32:50
everything's still in memory how do I roll that back,
所有的数据依然存放在内存中，我该如何将它们回滚呢？
32.50-32.54
this is like a hard crash how do I come back from that
这是⼀种hard crash，我该如何从中恢复正常呢？
32:54- 32.56
and so the point I was trying to make here was
So，此时我尝试要做的事情是
32.56-33.02
the log information is gonna reside both in memory ,and eventually also get written out
to disk
这些⽇志信息会放在内存中，并最终也会被写⼊磁盘
33:03 - 33:04
because if it's in memory
因为如果这些⽇志信息是在内存中的话
33.04-33.08
then I can quickly go get it and you know flip back the old buttons，right if I abort
如果事务中⽌了，那么我可以迅速从内存中获取到这些信息，并将数据变回原状
33:08 - 33:10
if I do a hard crash if it's on disk
如果我遇上的是hard crash，并且这些⽇志信息是在磁盘上
33.10-33.15
then I can reverse things potentially,right when I load the system backup
那么，当我加载系统备份的时候，我也可以将这些数据恢复原状
33:15 -33:16
because again after a hard crash
因为当经历了hard crash之后
33.16-33.18
all the contents of a buffer pool are gone
buffer pool中的所有内容就会消失不⻅
33:19 - 33:24
and we in you know we need to figure out what was happening at the system at the time
crash to put us back in the correct state
你知道的，我们需要弄清楚系统在崩溃的时候发⽣了什么，以此来让数据回归正轨
33.24-33.25
,yes
请问
33:29 - 33:29
so this question is
So，这个问题是
33.29-33.31
does this require writing to disk reads transaction
这是否需要将读取事务也写⼊到磁盘
33.32-33.33
yes
没错
33:33 - 33:36
if you care about this okay if you care about not losing data,yes
如果你在意不丢数据的话，那么就将它写⼊到磁盘吧
33:37 - 33:38
we'll cover that later
我们会之后对此进⾏介绍
33:46 - 33:49
LMDB,this question is
他的问题是
33.49-33.53
is there any why would you ever why you want to do this
为什么我们想去使⽤shadow paging
33:58 - 33:59
I'd,if you
34:03 - 34:04
it doesn't work
这不可⾏
34.04-34.07
right so a few years ago
So，在⼏年前的时候
34.07-34.15
my first my first PG student he and I started building a new system using like the new
Intel non-volatile memory devices
我的第⼀个研究⽣学⽣和我⼀起使⽤了intel的新型⾮易失性内存设备来构建⼀个新系统
34:15 - 34:17
and we thought at the time
在那个时候我们思考了⼀下
34.17-34.23
that with really fast storage like non-volatile memory he's like almost as fast as DRAM
⾮易失性内存的速度⼏乎和DRAM差不多快
34.23-34.26
with really fast storage to do random access
我们使⽤这种速度很快的存储设备来做随机访问
34:26 - 34:29
that shadow paging would actually turn out to be a better approach
事实证明，shadow paging这种⽅案其实更好
34.29-34.33
like taking an old idea from the 70s, and running on like today's hardware
这就像是将⼀个1970年代的想法，放在当下的硬件上进⾏实验
34:33 - 34:34
it doesn't work
这并不可⾏
34.34-34.35
write ahead logging always move faster
预写式⽇志的速度始终更快
34.35-34.37
because you can do these sequential writes
因为你可以进⾏这些循序写⼊操作
34.37-34.39
you know you can batch a bunch of things together
你知道的，你可以将⼀堆东⻄放在⼀起批量处理
34:39 - 34:41
and then shove amount all the disk at once
然后，将这些东⻄⼀次性写⼊磁盘
34.41-34.42
with shadow paging
如果使⽤shadow paging
34.42-34.42
it's all this fragmentation
就会产⽣磁盘碎⽚
34.42-34.46
you're copying things every single time,it becomes very expensive
你每次都要去复制些东⻄，这样成本就会变得⾮常昂贵
34:48 - 34:52
we'll see multi-version concurrency control which is sort of like this
我们之后会看到多版本并发控制，它有点像这个
34.52-34.58
but instead of copying an entire page before I make a change，I maybe just copy a
tuple or a subset of the tuple
在我进⾏⼀次修改操作之前，我⽆须去复制⼀整个page，我可能只需要复制⼀个tuple或者⼀组
tuple就可以了
34:58 - 35:03
so shadow paging is sort of how multiple version concurrency control works
So，shadow paging其实就是多版本并发控制的⼯作⽅式
35:03 - 35:08
but its shadow paging as defined by IBM is nobody does except for these guys
但IBM所定义的shadow paging其实并没有什么⼈使⽤，除了这两个
35.07-35.08
yes
请问
35:15 - 35:16
To their logging stuff
关于logging这⽅⾯？
35.16-35.20
yes so I don't spend too much time on running out the disk
So，我不会在磁盘上⾯浪费太多时间
35:20 -35:20
but the question is
但这⾥的问题是
35.20-35.24
is it the case that I if I do much changes
假设我们的场景是这样的，如果我进⾏了⼤量的修改操作
35.24-35.28
I create some some undo undo records that are in memory
我在内存中创建了⼀些Undo Records（撤销记录）
35:28 - 35:31
but then I crash before it's written out the disk is that a problem
但在我们将它写回到磁盘中之前，然后我就发⽣了崩溃，这会造成问题吗？
35:32 - 35:32
no
并不会
35.32-35.54
because when I come back
因为当我恢复过来的时候
35.54-35.36
all my memories gone
我内存中的数据就全丢失了
35:37 - 35:42
and the therefore I'm going to load the database back up based on how it was on disk
因此，当我加载数据库的时候，我数据库中的内容取决于当前磁盘上它所保存的内容
35:42 - 35:44
and so because those changes never got persisted to disk
So，因为这些修改并没有落地到磁盘上
35.44-35.48
they're there as if they never happened
也就是说，这些修改并没有⽣效
35:49 - 35.52
so his question which is which is a good point is that
So，他所提的问题中有⼀个很不错的地⽅就是
35.52-35.56
do I have is this mean have to do if I know if I want to say my transaction is committed
如果我想说，我的事务已经被提交了
35.56-36.01
do I have to do an Sync ,do I do a flush every single time my transaction commits
每当我事务提交的时候，我是否得进⾏同步并将它刷到磁盘上
36:01 - 36:02
and I answer is yes
我的答案是Yes
36.02-36.04
but you don't really do it on every single commit
但你不需要对每次提交都进⾏这种操作
36:04 - 36:06
you batch a bunch together
你可以将它们累积在⼀起
36.06-36.08
and then do a group commit when you flush them out all together
当你要将它们都刷出去的时候，你可以做⼀次组提交（Group Commit）
36.08-36.10
that advertises the Fsync costs over time
这就解决了Fsync所带来的开销问题
36:10 - 36:15
but if you dare if you want to guarantee that your data is actually durable
但如果你想确保你的数据都已经被持久化了
36:15 - 36:16
You happen you have to write the disk
那你就得将它们写⼊磁盘
36:17 - 36:21
so but the tricky thing is gonna be in what order you write to disk,
但这⾥棘⼿的地⽅在于你将这些数据写⼊磁盘的顺序是什么
36.21-36.23
it's gonna matter a lot too
这点⾮常重要
36:23 - 36:28
so you have to make sure you write the log record that correspond to a change to a data
page first， before you write the data page to disk
在你将该data page写⼊磁盘前，你需要先确保你写⼊的⽇志记录对应着该data page上的⼀次
修改操作
36:28 - 36:31
we'll cover what's in a whole day on this as well
我们会花⼀整天来介绍这个
36:32 - 36:37
and at the point of checking make I made about like oh well the NoSQL guys don't
always provide acid
我之前提到过，NoSQL那帮⼈不想去提供ACID这种特性
36:39 - 36:46
some of them would actually not even flush to disk when if they had transactions they
would not flush a disk exactly when you say you know complete my transaction
除⾮当我表示我的事务执⾏完毕了，那么他们才会将事务刷到磁盘上
36:47 - 36:49
they were sort of every do it every 60 seconds
他们会每隔60秒将数据刷回磁盘
36:49 - 36:50
so that means
So，这意味着
36.50-36.52
you could crash and lose the last 60 seconds of data
如果你发⽣了崩溃，你也就只是丢掉最后60秒的数据
36:53 - 36:55
some systems were even worse than this
有些系统甚⾄⽐这还糟糕
36.55-36.57
I'll just say it straight up Mongo right
就⽐如说，MongoDB
36:57 - 37:00
the early version of Mongo is when you do a write
在早期版本的MongoDB中，当你执⾏⼀次写操作时
37.00-37.04
it would immediately come back ,and say yeah I got your write,but in actually being do
the write
它可能会⽴即返回，并说：我拿到了你的写操作，但它实际上正在执⾏这个写操作
37:04 - 37:05
it's a network layer said
⽹络层表示
37.05-37.06
yeah I got it
我拿到了这个写操作
37.06-37.09
and if you wanted to make sure that your write actually occurred
如果你想确保你的写操作实际已经执⾏了
37.09-37.11
you have to come back a second time, and say did you actually do that
你必须回过头来去询问DBMS是否执⾏了这个写操作
37:11 - 37:13
that was the default for them for like four or five years
他们使⽤这种默认⽅案⼤概持续了四五年
37.13-37.15
and their early benchmark moments were amazing
他们早期的评测分数⾮常令⼈惊叹
37.15-37.19
because like they would do these writes, and of course it's like yeah I get it no problem
分数⾼的原因是这样的，⽐如说：它们会去执⾏这些写操作，然后Mongo表示我执⾏了这些写
操作
37:19 - 37:22
right but didn't actually do it
但实际上它们并没有执⾏这些写操作
37:22 - 37:26
there's some Mongo fix that company fall anymore
Mongo已经修复了这个问题，现在不会再出现这种情况了
37:27 - 37:29
okay so any questions by atomicity
Ok，关于原⼦性这块，你们有任何疑问吗？
37:31 - 37:35
again what we'll cover that how we actually guarantee this in a second
我们稍后会介绍我们实际该如何保证原⼦性
37:37 - 37:43
So consistency as I said before is this nebulous term about correctness of the database
So，我之前讲过，⼀致性是⽤来描述数据库正确性的⼀个模糊术语
37:44 - 37:47
so at a high level the way to think about this
So，从⼀个⾼级层⾯来思考这⼀点
37.47-37.52
what a database actually is is trying to model some some concept or aspect of the real
world
数据库实际上所试着做的事情就是对现实世界中的某些概念或者⽅⾯进⾏建模
37:53 - 37:59
like my my database for my bank is trying to model the old days of a bank where
somebody would sit in a ledger
就⽐如我的银⾏数据库就试着对银⾏过去⼈⼯所做的事情进⾏建模
37:59 - 38:01
And record how much money you actually had in your account
并记录你账户中有多少钱
38:01 - 38:04
right it's modeling some some process in the real world
它对现实世界中某些过程进⾏建模
38:05 - 38:11
so we're gonna say that if we have our database be logically correct
So，假设我们数据库是逻辑正确的
38:13 - 38:13
meaning
这意味着
38.13-38.15
we don't care has actually actually physically stored
我们⽆须在意物理存储实际是怎么样的
38.15-38.20
but the data integrity the referential integrity all those things are correct
但只要数据完整性和引⽤完整性之类的东⻄都是正确的就⾏了
38:20 - 38:25
then any questions we asked about that our database will produce correct results
那么，当我们询问数据库任何问题的时候，它都会给我们⽣成正确的结果
38:27 - 38:28
and again that sounds very vague
这听起来⾮常模糊
38.28-38.30
so let me go into more detail
So，我们来深⼊了解下其中的细节
38.30-38.32
there's two types of consistency we could possibly have
这⾥我们有两种⼀致性
38:32 - 38:34
now database consistency and transaction consistency
即Database Consistency（数据库⼀致性）和Transaction Consistency（事务⼀致性）
38:35 - 38:38
the spoiler would be database consistency is the one we actually care about
我们实际上关⼼的是数据库⼀致性
38.38-38.40
we can actually we can't do the second one,
实际上，我们没法做到第⼆点
38.40-38.42
and we'll see why in a second
我们稍后会看下为什么
===============
38:43 - 38:47
so again the our correctness criteria is that
So，我们的正确性标准是
38.47-38.50
our database actually reflects what the real world looks like
我们的数据库实际反映了现实世界的样⼦
38:50 - 38:53
and so how do we actually enforce that
So，我们实际该如何强制做到这点呢？
38.53-38.55
well we provide the database system with integrity constraints
Well，我们会为数据库系统提供完整性约束（integrity constraint）
38.55-38.59
to say this is what it means to for us to have correct data
以此表示，这就是我们拥有正确数据的意义
这意味着，通过它，我们可以保证拥有正确的数据
38:59 - 38:59
so for example
So，例如
38.59-39.03
if I have a table of people or students
如果我有⼀张学⽣表
39.03-39.05
and I'm keeping track of their age
我可以跟踪他们的年龄
39.05-39.09
I can have an integrity constraint that says nobody's age could be less than zero
这⾥我有⼀个完整性约束，它表示所有⼈的年龄都不能⼩于0
39:09 - 39:11
all right there's no negative ages
这⾥的年龄都不能为负
39:12 - 39:14
and so the database system could enforce that
So，数据库系统可以强制做到这点
39.14-39.15
it sometimes insert something with a negative age
有时候它所插⼊的记录中包含了⼀个值为负数的年龄
39.15-39.18
you can say that's you can't have that in the real world
你们会说，在现实⽣活中，不可能有这种情况发⽣
39:19 - 39:20
I can't let you insert that data
我不会让你插⼊这个数据
39:22 - 39:24
the other way to think about to also is that the
思考这个的另⼀个⽅式是
39.24-39.29
so now in addition to these have experience
39.29-3932
now as transactions to start making changes to the database
因为事务现在开始对数据库中的数据进⾏修改
39:33 - 39:42
that any transaction that excuse in the future should be able to see the changes the
correct changes that a transaction in the past made
任何未来执⾏的事务都应该能看到以前某个事务所做的正确修改
39:44 - 39:45
so what does that mean
So，这意味着什么呢？
39.45-39.47
so if I of transaction say I want run transaction right now
So，如果我想执⾏事务
39:48 - 39:50
and I make some change in the database
并且我对数据库进⾏了某种修改
39:50 - 39:54
if you now run a transaction one minute later long as nobody has overwritten my
changes
如果你在⼀分钟后执⾏了事务1，在此之前，如果没有⼈覆盖我所做的修改
39:55 - 39:57
you should be able to see my updates
那么，在执⾏事务⼀的过程中，你应该能看到我所做的修改
40:00 - 40:01
so in a single node database
So，在⼀个单节点数据库中
40.01-40.04
this is not that big you know this is not that big of a deal
这没什么⼤不了的
16-03
16-03
40:04 - 40:05
all right
40.05-40.06
so my transaction commits
So，当我的事务提交了
40.06-40.08
I give back the acknowledgement that I committed
我就会给出我提交了该事务的确认信息
40:08 - 40:11
then you come along and now do another transaction on that same machine
接着，你在同⼀台机器上执⾏另⼀个事务
40.11-40.15
and you read might you should we're gonna read my writes right away
你应该会读取到我写操作所做的修改
40:15 - 40:17
so for a single node database
So，对于⼀个单节点数据库系统来说
40.17-40.19
this is not that big this is not really an issue
这并不是什么⼤问题
40.19-40.21
when this matters more is the distributed databases
分布式数据库中会更为关⼼这个东⻄
40:22 - 40:25
so now if I'm trying to guarantee strong consistency in my distributed database
So，如果我现在试着保证我分布式数据库中的强⼀致性
40.25-40.29
if I do a write and I update some account
如果我执⾏⼀次写操作，并对某个账户进⾏更新
40:31 - 40:40
And then you come one millisecond later on another machine for the same logical
Database, but on the separate physical machine and you start you now do a read
接着，在1毫秒之后，你在另⼀台物理机上对同⼀个逻辑数据库中的数据进⾏了⼀次读操作
40:40 - 40:45
you should be able to see my change，if I told the outside world that my transaction
committed
如果我已经告诉外界，我的事务已经提交了，那么你应该能够看到我所做的修改
40:45 - 40:47
All right
40.47-40.50
so this will matter more for the distributed databases
So，这在分布式系统中更为重要
40:50 - 40:53
because the NoSQL guys will have this thing called advanced concurrency control
那群使⽤NoSQL的⼈表示他们有⼀个叫做⾼级并发控制的东⻄
40.53-40.56
will say I'll propagate changes eventually
他们会说，我最终会传播这些修改
40:56 - 40:59
and not guarantee that everyone sees the exact same state of the DBMS at the exact
same time
但并且不保证所有⼈在同⼀时刻看到的DBMS状态都是完全相同的
41:00 - 41:01
But for our purposes today
但出于我们今天的⽬的
41.01-4104
a single ndoe database it doesn't really make sense,
对于单节点数据库来说，这并没有什么意义
41.04-41.05
it won't be an issue
它不会遇上这种问题
41:07 - 41:10
so the other type of consistency is transaction consistency
So，另⼀种⼀致性叫做事务⼀致性
41:11 - 41:12
and this one again is very hard way
这⼜是⼀个很难的东⻄
41.12-41.14
but it basically says that
但简单来讲
41.14-41.16
if the database is consistent before transaction runs
如果数据库在执⾏事务前，它是⼀致的
41:17 - 41:19
and our transaction is consistent
并且我们的事务也是⼀致的
41.19-41.21
then after we run our transaction
当我们执⾏完我们的事务后
41.21-41.23
the end state of the database should be consistent
数据库的最终状态也应该是⼀致的
41:25 - 41:26
All right
41.26-41.29
so what does it mean to be you know consistent correct
So，⼀致性正确是什么意思呢
41:29 - 41:33
right that's a higher level concept that we can't reason about in our database
这是我们⽆法在数据库中所解释的⼀个⾼级概念
41:35 - 41:38
right we can try to enforce some integrity constraints
我们可以试着强制使⽤⼀些完整性约束
41.38-41.43
,and we prevent the transaction from doing you know making some changes
我们可以防⽌事务去做某些修改
41:43 - 41:45
but you know
但你知道的
41.45-41.47
if my application says
如果我的应⽤程序表示
41.47-41.54
there should be no customer with an account that has you know @cmu.edu
email address
它⾥⾯不应存在邮箱后缀为@cmu.edu的客户账号
41:55 - 41:58
and my transaction goes ahead and actually tries to do that
然后，我的事务会尝试去做这件事（知秋注：添加⼀条这个后缀的客户账号数据）
41:59 - 42:00
I I can't stop that in my database
我⽆法在我的数据库中阻⽌这件事情的发⽣
42.00-42.02
that's not a bad it's not a good example
这不是⼀个好例⼦
42.02-42.06
, because I you know let me rephrase that
让我重新组织下语⾔
42:06 - 42:08
let's say there's the application says
假设，应⽤程序表示
42.08-42.13
that nobody taking this class is allowed to have an account on this one system
没有学习这⻔课的⼈是不允许拥有该系统的账号
42:13 - 42:17
but my database doesn't have access to whether you're enrolled in this class or not
但我的数据库⽆权去访问你是否选了这⻔课
42:17 - 42:19
So the transaction allowed to go ahead and do that
So，我们允许事务去做这件事
42.19-42.22
,and the database says okay sure you want to do this in sir, I'm allowed to do that
数据库表示，Ok，我允许你做这件事，你去做吧
42:23 - 42:26
but that's this high level concept, this higher level constraint
但这是⼀种⾼级层⾯的概念，来⾃更⾼级层⾯的限制
42.26-42.28
but the database system doesn't know anything about it
但数据库系统对此⼀⽆所知
42:28 - 42:31
So therefore the transaction can consistent
因此，事务可以是⼀致的
42.31-42.33
, and therefore we can't stop that
因此，我们⽆法阻⽌它
42:34 - 42:38
so you know this is something that we can't simply just can't do in our database system
So，你知道的，这种事情我们⽆法简单地在数据库系统中做到
42:38 - 42:41
we can enforce integrity constraints a referential integrity constraints
我们可以强制使⽤完整性约束和引⽤完整性约束
42.41-42.43
we can't afford this high level things
我们⽆法承受这种⾼级层⾯的东⻄
42.43-42.44
because we just don't know
因为我们对它⼀⽆所知
42:45- 42:47
because it's a human value judgment
因为这是⼀种⼈为判断
42.47-42.50
that we can't codify in our system
我们⽆法在系统中编写这些东⻄
42:50 - 42:56
so there's nothing really else to say about this like if you understand the high level what
I'm talking about, and that's it
So，关于这个，我们没有什么要讲的，如果你理解我所讲的⾼级层⾯的东⻄是什么的话，那你
就懂了
42:56 - 42:58
right that's all that matters okay
这些才是重要的东⻄
43:00 - 43:02
all right so the moment the other one we care about today is also isolation
So，我们今天所关⼼的另⼀个东⻄就是隔离性
43:03 - 43:04
So isolation again is saying that
So，隔离性指的是
43.04-43.09
if our transaction, if we if we have our user submitting users many more transactions
如果⽤户提交了许多事务
43:09 - 43:13
we want each of them to run assuming that they're running by themself
我们想让每个事务⾃⼰做⾃⼰的事
43:14 - 43:17
and the reason why we want to provide this this guarantee is that,
我们之所以希望提供这种保障，
43.17-43.23
it makes it way easier to programmer application our logic in our transactions
原因是这能使得我们能更加容易地将我们的逻辑编写到我们的事务中
43:22 - 43:23
if that's the case,
如果是这样的话
43.23-43.25
we assume that we have exclusive access to the database
假设我们拥有对数据库的独占访问权限
43:26 - 43:31
we don't have to worry about any intermediate data we could be reading from other
transactions
我们不需要关⼼我们从其他事务中所读取到的任何中间值
43:32 - 43:35
then you know we just write our single-threaded code and that's fine
我们只需去编写我们的单线程代码，这就⾜够了
43.35-43.36
And it makes life easier
这会让我们处理起来更加容易
43:38 - 43:45
so we can achieve that we can achieve this by doing again my straw man approach in
the beginning
So，我们可以通过我们在⼀开始提的strawman⽅案来做到这点
43.45-43.47
where I just have a single thread actually execute one by one
即我通过单线程来逐个执⾏这些事务
43:47 - 43:48
but I said that
但我说过
43.48-43.53
we want to be able to interleave transactions to achieve better parallelism at
concurrency
我们想能够在并发的时候通过交错执⾏这些事务以获得更好的并⾏性
43:56 - 43.58
and so we see if you want to be able guarantee this isolation property
So，如果我们想保证这种隔离性
43.58-44.00
, but we still want to interleave
但我们依然想交错执⾏这些事务
44.00-44.02
this that becomes difficult
那这就变得困难起来了
44:03 -44:08
and so the way we're going to provide this way we're going to do this is through a
concurrency control protocol
So，我们通过并发控制协议来做到这点
44:09 - 44:13
So we've already talked about concurrency control protocols slightly when we talked
about index latching
So，当我们讨论index latch的时候，我们已经稍微讨论了下并发控制协议
44:14 - 44:18
maybe we would have a single data structure and allow multiple threads to access it at
the same time
我们可能会有这样⼀种数据结构，即我们允许多条线程同时访问该数据结构
44:18 - 44:22
and we use our latches to enforce the the correctness of our data structure
我们通过使⽤latch来强制保证我们数据结构的正确性
44:23 - 44:25
So now we're gonna do the same thing but for our database objects
So，我们会对我们的数据库对象做相同的处理
44:26 - 44:29
this is why I was making the distinguish between locks and latches
这就是我我为什么要去区分lock和latch的原因
44:29 - 44:31
so latches are protecting the internals of the data structure
So，latch⽤来保护数据结构中的内部信息
44.31-44.35
locks are gonna protect these database objects
lock则⽤来保护这些数据库对象
44:35 - 44:40
so you think I'll call as like the traffic cop for for the database system
So，你可以将它们想象为数据库系统中的交警
44:40 - 44:44
right it's sitting saying this we can let this operation go,
它表示，我们可以让这个操作执⾏
44.44-44.45
this operation has to wait
这个操作需要等待执⾏
44.45-44.46
or this operation has to abort,
或者，这个操作需要被中⽌
44.46-44.51
it's trying to figure out how to interleave things in a way that we end up with a correct
state
它会试着去弄清楚我们该以何种⽅式交错执⾏这些操作，并最终得到正确的结果
44:52 - 44:55
So there's two categories of protocols that we're gonna care about
So，这⾥我们关⼼两种并发控制协议
44.55-44.59
, and then this will this we'll cover on on next week
我们会在下周的时候介绍这个
45:00 - 45:01
right Italy both of these
这两种我们都会讲
45:02 - 45:04
so the first one is a pessimistic protocol
So，第⼀种是悲观协议
45.04-45.08
,where we're gonna assume that our transactions are going to conflict to cause problems
我们会假设我们的事务在执⾏的时候会产⽣冲突，导致问题的出现
45:09 - 45:14
so we require them to acquire locks before it allowed to do anything
So，在我们允许这些事务执⾏操作之前，我们会先要求它们去获取lock
45:15 - 45:19
right,you assume that you know you're pessimistic we assume that there's many
Problems
假设我们使⽤的是悲观协议，假设这些事务执⾏的时候会有各种问题
45:19 - 45:25
you make sure that things go in the correct order by using locks
通过使⽤lock，你会确保这些事务以正确的顺序执⾏
45:26 - 45:28
optimistic concurrency control is
乐观并发控制指的是
45.28-45.29
where you assume that the conflicts are rare,
我们假设这些冲突问题很少会出现
45.29-45.32
most of the time my transactions aren't going to conflict
⼤部分情况下，我们的事务间不会产⽣冲突
45:32 - 45:38
so rather than making them stall and acquire it locks at the very beginning, I just let them
run,and do whatever they want
So，我只是让这些事务直接执⾏，⼲它们想⼲的事情，⽽不是让它们在⼀开始的时候停下来去
获取lock
45:37 - 45:40
and then when they go to commit
接着，当它们提交的时候
45.40-45.44
,go back and figure out whether that was actually the right thing to do, whether there
was a conflict
它们会回过头去看看它们做的事情是否正确，执⾏期间是否存在冲突
45:45 - 45:48
so Monday's class next week will be on two-phase locking
So，下周⼀的时候，我们会讲两阶段锁
45.48-45.49
,that's a pessimistic protocol
这是⼀个悲观协议
45:50 - 45:52
Wednesday's class next week will be on timestamp ordering
下周三我们会讲⼀种基于时间戳顺序的协议
45.52-45.54
, that's considered an optimistic protocol
它被认为是⼀种乐观协议
45:54 - 45:58
and optimistic concurrency control protocol was actually better here at CMU in the
1980s
实际上，在1980年代，CMU的乐观并发控制协议⽐其他⼈的更好
46:00 - 46:01
All right
46.01-46.06
so let's look now at some real examples understanding what it actually mean to have
complex
So，我们会通过⼀些真实案例来理解下它实际为什么复杂
46:07 - 46:10
So again this is my bank account example
So，这是⼀个关于银⾏转账的例⼦
46.10-46.14
where we have two accounts A and B ,it's Andy and its bookie
我们有A和B两个账户，⼀个是Andy的，另⼀个是他的博彩账户
46:14 - 46:18
and so we want to transfer 100 dollars out of my account into my bookies account
So，我想从我的⼀个账户上转100美⾦到另⼀个账户上
46:18 - 46:20
but then at the same time
但与此同时
46.20-46.25
the bank runs transaction where it's going to update the the monthly interest of all the
bank accounts
银⾏的数据库系统试着执⾏某个事务，该事务会去更新所有银⾏账户的⽉利息
46:25 - 46:28
So we're going to update every account with an add 6% interest
So，我们会为所有账户都增加6%的利息
46:29 - 46:33
I so transaction one is taking hundred dollars out of A, put a hundred dollars and B
So，T1所做的事情就是从A中取100美⾦，并转给B
46.33-46.38
and then transaction two is just computing ,you're incrementing both accounts by
adding 6%
T2⼲的事情就是将所有账户中的钱乘以1.06
46:40 - 46:44
so if we assume that again both bank accounts have a thousand dollars
So，我们假设这两个账户中都有1000美⾦
46:45 - 46:47
and we want to execute these two transactions
我们想去执⾏这两个事务
46.47-46.51
what are the possible outcomes we could have for the state of the database
数据库可能出现的状态是什么？
46:53 - 46:55
all right assuming we have arbitrary interleavings
假设，我们会交错执⾏这些操作
46:57 - 46.59
well many
Well，我们会得到很多结果
46.59-47.04
right, because we could have t1 maybe go do run run in one query then switch over to
t2, then back and forth
因为T1可能是在某个查询中执⾏的，接着我们切换到了T2，如此反复
47:05 - 47:09
right there's a bunch of rdifferent ways we can end up with these interleavings
通过这种交错执⾏，我们最终会得到⼀堆不同的结果
47:09 - 47:12
but the important thing to point out though is that
但此处重要的地⽅在于
47.12-47.18
at the end of the day after we execute transaction t1 and t2 in any possible order
到头来，我们以任意可能的顺序执⾏完T1和T2后
47:18 - 47:21
,to know that our database state is correct
为了知道我们数据库的状态是否正确
47.21-47.26
the final result when we add both the accounts together, should be 2120
当我们将这些账户中的钱加在⼀起时，最终结果应该是2120
47:26 - 47:28
Because I have a thousand dollars on A
因为A账户中我有1000美⾦
47.28-47.28
thousand dollars to B
B账户中也有1000美⾦
47.28-47.30
add that together
将它们加在⼀起
47.30-47.30
that's two thousand
它们的总和就是2000美⾦
47.30-47.33
,and then the second transaction wants to add 6% interest
接着，第⼆个事务想去增加6%的利息
47:34 - 47:39
so we want to guarantee that no matter how we order or interleave our operations
So，我们想去保证，不管我们以什么顺序交错执⾏我们的操作
47.39-47.42
we always at the end after executing t1 and t2
当我们执⾏完T1和T2后
47:42 - 47:44
we end up with 2120
我们的最终结果是2120
47:45 - 47:48
so this is a very important property about transactions and database systems,
So，这是事务和数据库系统中⼀个⾮常重要的特性
47.48-47.54
that's gonna be slightly different than maybe how you you know or have experienced
parallel programming before
这可能和你们以前学过的并发编程有所不同
47:55 - 47:59
so in a database system that we're talk about here
So，在我们这⾥所讨论的数据库系统中
48:00 - 48:04
even though t1 may be submitted to the database system first followed by t2
即使T1先被递交给数据库系统，紧接着T2被递交给数据库系统
48:05 - 48:08
there's no guarantee the database system is gonna run t1 first
数据库系统也不会去保证它会先执⾏T1
48:11 - 48:13
right and the reason why we're gonna do this is
我们这样做的原因是
48.13-48.17
because we can have any possible interleaving or any any possible ordering
因为我们可能会以任意可能的⽅式交错执⾏
48:18 - 48:23
then this is gonna allow us to open up more opportunities to do interleaving to get better
parallelism
这就会让我们有更多机会去交错执⾏这些操作，以获得更好的并⾏性
48:25 - 48:31
if I care my application absolutely had to care say well t1 absolutely execute first, then
followed by t2
如果我的应⽤程序表示，T1必须先执⾏，接着才去执⾏T2
48:32 - 48:33
the way you would write that code is
你编写这种代码的⽅式是
48.33-48.34
you submit t1
你先递交T1给数据库系统
48.34-48.37
and then only when you get back to your knowledge meant that t1 committed
只有当你收到T1已经被提交的通知时
48.37-48.41
then you submit T2
然后，你才会去递交T2
48:41 - 48:42
Because the you can't guarantee that
因为你⽆法保证它们的执⾏顺序，所以只能以这种⽅式保证它们的执⾏顺序
48.42-48.43
,now in practice
在实战中
48.43-48.44
if you submit t1
如果你向数据库系统递交了T1
48.44-48.46
you know it takes a minute
T1花了1分钟执⾏完它的⼯作
48.46-48.47
, then you submit t2
然后，你再递交T2
48.47-48.48
that's basically the same thing
简单来讲，这是⼀回事
48:48 - 48:51
but if I submit them at exactly the same time
但如果我在同⼀时间将它们递交给数据库系统
48.51-48.56
then the database system could interleave them and it anyway it wants
那么，数据库系统就会以它想要的⽅式来交错执⾏它们的操作
48:56 - 48.59
but what we're gonna care about those that
但我们这⾥所在意的事情是
48.59-49.00
for any arbitrary interleaving
对于任意交错执⾏的顺序来说
49:00 - 49:08
we want the end state of the database to be equivalent to one where we execute these
transactions in Serial order with a single thread
我们希望该数据库的最终状态与我们在单线程中按照顺序执⾏这些事务所得到的结果相同
49:09 - 49:11
either t1 followed by t2, or t2 followed by t1
不管是先执⾏T1再执⾏T2，或者是先执⾏T2再执⾏T1
49:12 - 49:14
The end state of the database system has to look like that
数据库系统的最终状态必须看起来像这样
49:16 - 49:17
so now that means that
So，这意味着
49.17-49.23
the number of possible outcomes we could have are for the state A and B could be
different
在不同的执⾏顺序下，我们拥有的A和B的状态可能是不同的
49:23 - 49:26
right so if I have say t1 go first all by t2
So，如果T1先执⾏，再执⾏T2
49:27 - 49:31
I'll have 954 dollars in a ,and and 1166 dollars and B
那么，A账户中就会有954美⾦，B账户中就会有1166美⾦
49:31 - 49:33
but I go the other order
但如果我以另⼀种顺序执⾏
49.33-49.35
I'll have 960 and 1160
那么，A账户中就是960美⾦，B账户就是1160美⾦
49:36 - 49:38
but again if I add both of these together
但如果我将两个账户中的钱加起来
49.38-49.39
I always get 2120
我得到的结果始终是2120
49.39-49.44
,and that's again that's equivalent to one where execute in serial order
该结果等同于我们按照顺序执⾏的结果
49:47- 49:47
so is this clear
So，你们懂了吗
49:50 - 49:50
all right
49.50-49.53
so let's actually look at what the database sees
So，我们来实际看下数据库中是怎么样的
49:53 - 49.56
so for this this is this is called a schedule
So，这种东⻄叫做Schedule
49.56-50.02
for our transactions, in a way to read this is that going from the top to bottom for time
我们的事务会以某种⽅式随着时间⾃上⽽下执⾏这些操作
50:02 - 50:05
and then for each of these columns here we have the transactions
接着，这⾥的每⼀列就是⼀个事务
50.05-50.07
,and we have the operations that they're actually doing
这⾥⾯放着这些事务实际⼲的事情
50:07 - 50:09
so I call began on t1
So，我通过调⽤BEGIN来开始执⾏T1
50.09-50.10
I take a hundred dollars out of A
我先从A账户中取100美⾦
50.10-50.12
, take put a hundred dollars in B,
将这100美⾦放⼊B账户中
50.12-50.13
and I call commit
然后，我调⽤COMMIT提交T1
50:13 - 50:16
and then now next time I do a context switch over here
接着，我进⾏上下⽂切换到T2
50.16-50.19
and now I call it t2 and it computes the interest in these guys
我开始执⾏T2，让它去计算这两个账户的利息
50:19 - 50:19
so for this
So，在这个例⼦中
50.19-50.23
assume that we only have a single thread that can with a single program counter
我们假设我们只有⼀条线程，它⾥⾯有⼀个程序计数器
50.23-50.26
,and we can only actually one operation at a time
并且我们⼀次只能执⾏⼀个操作
50:26 - 50:28
like we can interleave them of these different transactions
我们可以交错执⾏这些不同的事务
50.28-50.32
but at any given time， we going do one thing
但在任何给定的时间中，我们只能做⼀件事
50:32 - 50:33
So in this case here
So，在这个例⼦中
50.33-50.35
, if we execute t1 followed by t2
如果我们先执⾏T1再执⾏T2
50.35-50.38
we end up with this this amounts for A and B
那么，我们最终A账号和B账户中的钱如图所示
50:38 - 50:40
if he asked you t2 first followed by t1
如果我们先执⾏T2再执⾏T1
50.40-50.41
, we end with these amounts here
最终它们账户中的⾦额是这样的
50:42 - 50:44
so again A doesn't match
So，这两个A的结果并不相同
50.44-50.47
,A`s 954 over here at 960 over here
左边的A账号中的钱是954美⾦，右边则是960美⾦
50:47 - 50:52
so they're technically different from a finite exact amount
So，从技术上来讲，这两个账户中的钱是不⼀样的
50:52 - 50:54
But from a databases consistency perspective
但从数据库⼀致性⽅⾯来讲
50.54-50.56
for what we're caring about with transactions,
这也是我们在事务中所关⼼的东⻄
50.56-50.58
you add them both up and you always get 2120
当我们将A和B的钱相加，我们得到的始终是2120
50:59 - 51:04
so both of these interleavings are both of these orderings are still are equivalent to each
other, they're correct
So，这两种交错执⾏得到的结果是等同的，它们是正确的
51:06 -51:06
yes
请问
51:16 - 51:18
sorry your question is
你的问题是
51.18-51.21 ！！
if you know that you have you 2 transactions exactly the same time
如果我们知道我们同⼀时间有两个事务在执⾏
51.21-51.23
could you do it we're like you could you combine them
我们是否能将这两个事务合并为⼀个事务
51:30 - 51:30
yes
其实是可以的
51.30-51.32
but nobody does it that way
但没有⼈会这样做
51.32-51.34
and I think that would complicate things right now
我觉得这样会让事情变得复杂
51:35 - 51:37
let's just assume that this is the case
我们就假设这种情况是存在的
51.37-51.39
also say to what I'm showing here or like
就以我这⾥所展示的例⼦来说
51:40 - 51:42
yeah here's why you can't really do that
这就是你没法这样做的原因
这⾥为什么不能那样来做
51:42 - 51:46
So when I'm gonna talk about here today are like the the schedule is fixed
So，我今天所讨论的schedule是固定的
51.46-51.50
meaning I know ahead of time exactly what all the transactions actually want to do
这意味着我提前知道了所有事务想要⼲的事情
51:50 - 51:51
In a real system
在⼀个真正的DBMS中
51.51-51.52
it's not like that
它并不是这样的
51.52-51.52
in a real system
在⼀个真正的系统中
51.52-51.57
you have like you know transactions are showing up they're calling you know a client
opens connection calls begin
当事务出现在DBMS中的时候，某个client打开了与DBMS的连接，并调⽤BEGIN
51:58 - 51.59
and then it starts executing a bunch of queries
接着，它开始执⾏⼀系列查询
51.59-52.01
and you don't know what the next query is
并且你并不会知道下⼀个查询是什么
52:02 - 52:04
In this case here
在这个例⼦中
52.04-52.05
sort of to reason about correctness
我们是为了解释正确性
52:06 - 52:07
you see everything all at once
你⼀下就能看到所有的信息
52:08 - 52.09
right
52.09-52.10
so on Monday
So，在周⼀的时候
52.10-52.11
when we talk about two-phase locking,
我们会讨论两阶段锁
52.11-2.14
that's a dynamic conquerer protocol
它是⼀个动态分治协议
52.14-52.17
where you don't know what the queries are gonna be ahead of time
即你不会提前知道要执⾏哪些查询
52:17 - 52:19
now there's some cases
这⾥有⼀些例⼦
52.19-52.22
where if you have some introspection but with the applications actually trying to do
我程序内部有实际要尝试去做的⼀些事
52.22-52.23
then you can actually do what you propose
那么，你实际可以去做你打算做的事情
52:24 - 52:26
but that's hard nobody actually does that
但这很难做到，实际没⼈会这样做
52:37 - 52:38
will get that too
我们之后会讲这个
52.38-52.40
so his question is which is correct
So，他提的问题很正确
52.40-52.41
,I said before
我之前说过
52.41-52.43
the database system only sees reads and writes
数据库系统只会看到这些读和写操作
52.43-52.47
like this A equals a minus 100 right
就⽐如这⾥的A=A-100
52:47 - 52:49
yes that will get translated to a read followed by write
然后，它会被翻译为⼀个读操作，后⾯紧跟着⼀个写操作
52:49 - 52:51
I'll see that in a sec yes
我们稍后会看到这个
52:53 - 53:02
yes yeah
请问
53:05 - 53:08
Yeah we'll get to that yes question is
So，他的问题是
53:09 - 53:12
So this A=A-100,
So，我们来看下这个A=A-100
53.12-53.13
what is it actually gonna look like
它看起来是怎么样的呢
53.13-53.14
well in the program logic
Well，在程序逻辑中
53.12-53.16
I would say do a get on A, you're reading A
我们会去获取A，然后读取A
53.16-53.18
have a copy my local variable
并拥有⼀份A的本地变量副本
53:18 - 53:19
then I can manipulate it
然后，我就可以对它进⾏操作
53.19-53.21
and and write it back to the database
并将它写回数据库
53:21 - 53:25
So each of these transactions would have their own local variables ,that aren't shared
So，每个事务都会有⾃⼰的本地变量，事务彼此之间不会共享这些变量
53:29 - 53:30
his questions
他的问题是
53.30-*53.32
can you interleave the operation between transactions ,yes we'll get there exactly yes
我们是否交错执⾏事务的操作，没错，我们可以做到
53:47 - 53:48
the question is
她的问题是
53.48-53.50
if I have two transactions
如果我有两个事务
53.50-53.53
that are touching completely different objects not tuples， objects
它们涉及的是完全不同的对象，是对象，不是tuple
53:56 - 53:57
do I need to still serialize this
我是否依然需要按顺序执⾏？
53.57-53.59
I mean
我的意思是
54:04 - 54:06
so for this one I'm just try toshow equivalency
So，在这个例⼦中，我们只是向你们展示这种相等性
54:07 - 54:09
If they touch clearly different things
如果这些事务涉及的都是不同的东⻄
54.09-54.10
and there's no conflicts,
它们也就不会产⽣任何冲突
54.10-54.12
then you can interleave them any way you want absolutely, yes
那么你就可以以你喜欢的顺序去交错执⾏这些事务，请问
54:19 - 54:19
her question is
她的问题是
54.19-54.22
how do I know whether another transaction is touching the same thing, I'm touching
我如何知道另⼀个事务涉及的对象和我涉及的是否是相同的对象
54:23 - 54:26
again but this is a high-level example
这是⼀个⾼级层⾯的例⼦
54.26-54.28
the database sees and reads and writes
数据库看到的是这些读操作和写操作
54:28 - 54:30
so I do a read on an object A
So，我对对象A进⾏读取
54.30-54.32
you do a read an object A
你对对象A进⾏读取
54.32-54.35
in order for me to serve your read request ask me to read it for you
为了处理你的读请求，我会为你读取对象A
54:35 - 54:36
so I see everything
So，我看到了所有的东⻄
54:37 - 54:38
But I don't see high-level things
但我并没有看到这些⾼级层⾯的东⻄
54.38-54.44
like I don't see that your your that you're going to take the value of a ,and then add 6%
to it
我们不会看到这种东⻄，⽐如，你要拿到A的值，然后给它增加6%
54:47 - 54:53
so again what everyone's sort of getting up to now is be able to interleave, these these
transactions really the operations
So，我们现在要做的就是去交错执⾏这些事务，其实是交错执⾏这些操作
54:53 - 54:54
and we've already covered this
我们已经介绍过这个了
54.54-54.54
we want to do this
我们想要做到这点
54.54-54.59
because this is slow and we have a lot of CPU cores
因为它的速度很慢，我们拥有很多CPU核⼼
54:59 - 55:00
and so the idea here is again
So，这⾥的思路是
55.00-55.08
that instead of having the, you know if we have to go to disk to get something or wait
to acquire a latch on something
如果我们需要跑到磁盘上去获取某个东⻄，或者等待获取某个对象的latch
55:08 - 55:10
we could have one transaction stall
我们可以让其中⼀个事务停下来
55.10-55.13
another transaction keep on running and still make forward progress
另⼀个事务继续执⾏，并取得了⼀些进展
55:13 - 55.19
so we're trying to figure out a schedule or interleaving such that we maximize the
performance of the system
So，我们试着找到⼀种schedule（调度⽅案），以此来最⼤化系统的性能
55.19-55.20
and we get the best utilization of our hardware
这样我们就能将我们的硬件性能发挥到极致
55:21 - 55:23
So if we go back here now to our example
So，我们回过头来看下我们的例⼦
55:24 - 55:26
So now I‘m interleaving our transactions ,right
So，我交错执⾏了我们的事务
55:27 - 55:29
going start takes 100 out of A
⾸先我们从A中取100美⾦
55.29-55.32
then then does a context switch t2 starts
接着，切换上下⽂，开始执⾏T2
55.32-55.34
put compute 6% on A
将A乘以1.06
55.34-55.35
then we go back
接着，我们回过头去
55.35-55.37
and take put the hundred dollars back on B
将这100美⾦放到B的账户中去
55.37-55.38
,and go back here
然后，回到这⾥
55.38-55.40
compute the interest on that
去计算B的利息
55.40-55.41
and then we go commit
然后，我们提交事务
55:41 - 55:45
so now again now it's not one transaction running in its entirety at a time
So，现在同⼀时间有多个事务在运⾏
55:46 - 55:48
Right we're now able to actually interleave things
实际上，现在我们能够做到交错执⾏
55:48 - 55:49
and this example here
在这个例⼦中
55.49-55.50
this is correct
这样是正确的
55.50-55.51
this is fine
这样做没问题
55.51-55.56
because this is equivalent to a serial ordering of our transactions
因为这和我们按照顺序执⾏事务的效果是相同的
55:57 -55:59
right the end state of the database is equivalent
数据库的最终状态是相等的
56:01 -56:04
Alright,and so the key thing to point out here is
So，这⾥要指出的关键地⽅在于
56.04-56.06
that the reason why this worked out okay
为什么这样做是可⾏的，它的理由是什么
56:06 - 56:07
and then we end up equivalent is that
并且我们最终结果是相等的
56.07-56.18
we always make sure that we did the operations on t1 first on a given object before we
did that operation on on t2 for that same object
我们始终确信在T2对同⼀个对象执⾏操作前，T1会先对该对象进⾏操作
56:19 - 56:20
so I took $100 on a
So，我从A那⾥取100美⾦
56.20-56.23
and then I keep you to the interest on a
接着，我去计算A的利息
56.23-56.24
and then I put $100 back and B
接着，我将这100美⾦放到B的账户中去
56.24-56.26
and then a compute interest on B
然后去计算B的利息
56:28 - 56:32
right so for this interleaving here is
So，对于此处这种交错执⾏来说
56.32-56.34
we violate that
我们违反了这⼀点
56.34-56.37
so I take $100 a ,I compute there's interest on a
So，我从A中先取了100美⾦，然后我去计算A的利息
56:37 - 56:39
then I compute the interest on B
接着，我⼜去计算B的利息
56.39-56.41
then I put $100 back on B
然后，我将100美⾦放到B的账户中
56:41 - 56:43
so now in this case here
So，在这个例⼦中
56.43-56.45
the when I add up these two values together
当我将这两个值相加在⼀起
56.45-56.48
I don't get 2120,I get 2014
我得到的并不是2120，⽽是2014
56:48 - 56:53
so the bank lost you know $106
So，银⾏损失了106美⾦
56:54 - 56:54
all right
56:56 - 56.58
now here's the hundreds of dollars
虽说这⾥损失的只是100美⾦左右
56.58-56.59
but it's a billion dollars
但如果是10亿美⾦的话，那就很可怕了
56.59-57.00
all right guys it's your account hundred dollars is a lot
对于你们的账户来说，100美⾦算是不少了
57:01 - 57:05
but like you know this is why we want to guarantee that we always have correctness for
transactions
这就是我们想保证事务正确性的原因所在了
57:06 - 57:08
especially when you're doing and ending involves money
特别是，当我们涉及跟钱有关的事情更是如此
57:09 - 57:11
there's a famous example a few years ago
在⼏年前有⼀个⾮常著名的案例
57.11-57.14
where some Bitcoin exchange I forget where in the world was running on MongoDB
我记得不是特别清楚了，当时某个⽐特币交易所使⽤的是MongoDB
57:15 - 57:18
MongoDB did at the time didn't have support transactions
他们那时候使⽤的MongoDB并不⽀持事务
57:18 - 57:26
and so some hacker figured out that you can have you can manipulate the the API and
have it drain out everyone's account
某个⿊客通过操纵API榨⼲了所有⼈账户上的⽐特币
57:26 - 57:31
so they wiped out the Bitcoin exchange in a single day
So，他们⼀天之内就毁掉了这个⽐特币交易所
57:32 - 57:35
Because MongoDB wasn't doing transactions, that's part of the story
因为MongoDB不⽀持事务，这是导致这事情发⽣的部分原因
57:35 - 57:39
but they didn't have transactions that's a bad idea
他们不使⽤事务，这是个糟糕的想法
57:40 - 57:41
so came back to his point
So，回到这⾥
57.41-57.43
well what if the database system actually seen
Well，数据库系统实际看到了什么呢？
57.43-57.45
again,it doesn't see these higher-level operations
它并没有看到这些更⾼级的操作
57.45-57.47
it just sees these reads and writes
它所看到的就是这些读写操作
57:48 - 57:49
and so essentially we're trying to do is
So，本质上来讲，我们所试着做的事情是
57.49-57.55
make sure that for any object that does a read or does a write or read on an object
我们要确保当我们对任意对象进⾏读或者写操作的时候
57:56 - 57.57
if another transaction is doing the same thing
如果另⼀个事务也在做相同的操作
57.57-58.03
we're always going in the right order to determine whether our schedule is correct
我们始终会通过正确的执⾏顺序来判断我们的调度是否正确
58:04 - 58:10
so the way we're going to figure this out, the way we're going to find correctness for
what we're talking about here today is
我们今天所讨论的保证正确性的⽅式是
58.10-58.20
well say that a schedule of any arbitrary ordering of operations is correct，if it is
equivalent to one of serial schedule
如果某个schedule的执⾏结果等同于按顺序执⾏的结果，那么我们就会说这种执⾏顺序的
schedule是正确的
58:21 - 58:23
so the serial schedule we've already talked about
So，我们已经讨论过了什么是Serial Schedule
58.23-58.24
serial schedules just saying that
Serial Schedule的意思是
58.24-58.27
we actually transactions one after another ,and no interleaving
我们实际会逐个执⾏事务，⽽不是交错执⾏它们
58:27 - 58:29
and then the equivalent policy says that
等效策略指的是
58.29-58.39
if the final state of the database is of the the objects is equivalent
如果数据库中这些对象的最终状态是相等的
58.39-58.44
or it has actually the same values of another database state
或者是，它和另⼀个数据库状态中的值是相等的
58.44-58.46
then they are equivalent
那么，它们的执⾏效果就是相同的
58:46 - 59.00
so a a ordering of a schedule well it could be equivalent to at least one exactly one serial
ordering I'm not exactly one one or more serial orderings，if the database is still the
same state
So，Serial Schedule是包含在具有正确结果的Ordering Schedule之中的，我不确定到底是其中
的哪⼀个，但它们最终都会有⼀个相同的状态
59:00 - 59:03
but a given schedule could be correct
但对于⼀个给定的Schedule来说，它可能是正确的
59.03-59.07
it could still be serializable by being equivalent to any possible serial ordering
它可能依然是Serializable的，它等价于任何可能的Serial Ordering Schedule
59:09 - 59:12
so this is the formal of property we're going to care about for our schedules
serializability
这就是我们在Serializable schedule中所要关⼼的⼀种重要属性
==============
59:13 - 59:14
okay it just says that
这⾥表示
59.14-59.17
a schedule is that is equivalent to some serial execution
如果⼀个schedule的执⾏结果等同于某种按顺序执⾏的结果
59.17-59.20
doesn't matter which one it has to be it has to be one of them
不管它是按照哪种顺序执⾏
59:20 - 59:22
if that it's equivalent that serial ordering
如果该schedule的执⾏结果等于按顺序执⾏的结果
59.22-59.25
then whatever schedule what we're looking at is considered to be serializable
那么，不管我们看的这个schedule是什么，它都是Serializable的
59:26 - 59:29
And this is the gold standard of what you want to get in a DBMS
这就是你想在DBMS中做到的⻩⾦准则
59.29-59.35
this is guaranteeing almost guaranteeing all the protections you could ever want
基于该保证，你可以获得你想要的所有保护⼿段
59:35 - 59:37
the only one who doesn't guarantee is that
它唯⼀不保证的东⻄就是
59.37-59.42
if your transaction is t1 shows up first followed by t2， t1 will commit first
如果T1先执⾏，后⾯紧跟着T2，T1会先被提交
59:42 - 59:45
that's called a strict serializeability or external consistency.
这个叫做Strict Serialzability，或者叫外部⼀致性
59.45-59.47
we don't care about that here
这⾥我们并不关⼼这个
59.47-59.48
most systems don't provide that
⼤部分系统也不提供这种东⻄
59:48 - 59:51
the only system to provide that that I'm aware of is Google spanner
据我所知唯⼀提供该功能的系统就是Google的Spanner
59:51 - 59:56
and they need it for some global ads thing, most systems don't do that
他们在全球⼴告⽅⾯会⽤到这个东⻄，但⼤多数数据库系统不会⽤到它
59:57 - 01:00:02
most of systems if they say the support Serializability they're Getting you're getting what
I'm defining here
如果⼤部分系统表示他们⽀持有序执⾏，他们所说的其实就是我这⾥定义的东⻄

16-04
16-04
01:00:02 - 01:00:02
okay
01:00:05 - 01:00:10
so again coming if you come over background from parallel programming
So，如果你有并发编程的背景
01:00:10 - 01:00:12
this might seem kind of weird
这看起来有点奇怪
1.00.12-1.00.13
that I could say all right
我所能说的是
1.00.13-1.00.18
well I can have the you know there's not one single state of the database
数据库的状态不只⼀个
1.00.18-1.00.21
that I could say this is what it exactly should be to determine whether it's correct
我可以说这个状态才是它应该有的状态，通过它，我来判断数据库的状态是否正确
01:00:21 - 01:00:23
right it could be any possible thing
它可以是任何东⻄
01:00:23 - 01:00:25
and the reason why we want to do this is
我们想这样做的原因是
1.00.25-1.00.34
because if we have multiple choices for how we want to interleave our operations and
multiple serial orderings, that we could that we get a aspire to achieve
因为如果在交错执⾏我们的操作上我们有多种选择，并且我们可以有多种按顺序执⾏的
Schedule
01:00:35 - 01:00:40
then that gives us more options to decide how we want to schedule our operations for
our transactions
在我们事务中的操作进⾏调度时，我们就有了更多的选择
01:00:42 - 01:00:44
so to understand this bit better
So，为了更好地理解这点
1.00.44-1.00.52
we now need a formal way to determine what it means to have a conflict that could
violate the serial ordering or serializability of a transaction
我们需要⼀种正式的⽅式来确定当某个冲突违反了事务的有序性时，这会发⽣什么
01:00:52 - 01:00:55
so we're gonna say is that two transactions or two operations are going to conflict
So，我们假设这⾥有两个会产⽣冲突的事务或操作
01:00:56 - 01:00:59
if they're if they're being run by different transactions at the same time
如果这两个不同的事务在同⼀时刻同时执⾏
01:01:00 - 01:01:03
and they're both operating on the same object
并且它们要对同⼀个对象进⾏操作
1.01.03-1.01.06
and at least one of those operations is a write
并且⾄少其中⼀个操作是⼀个写操作
01:01:09 - 01:01:12
so there's three types on anomalies we're gonna care about
So，这是我们所关⼼的3种冲突类型
01:01:12 - 01:01:15
we have read-write, write-read and write-write
即读写冲突，写读冲突，以及写写冲突
01:01:16 - 01:01:18
again why know read-read conflicts
知道为什么没有读读冲突么
01:01:21 - 01:01:27
just yeah it doesn't matter ,who cares like if you read something and I read something
,we read the same thing, that's fine who cares
没关系的，没⼈在乎，你读我也读，我们读的都是同⼀份数据，这不会造成任何影响
01:01:27 - 01:01:29
it's when we have writes
当我们进⾏写操作的时候
1.01.29-1.01.32
and when we it's one of the operations as a writes ,when we have problems
当我们拥有的其中⼀个操作是写操作的时候，我们就会遇上问题
01:01:32 - 01:01:34
but so let's go through each of these one by one
So，我们来挨个看下是怎么回事吧
01:01:35 - 01:01:37
so the first one is read-write conflicts
So，第⼀种冲突是读写冲突
1.01.37-1.01.38
all right
1.01.38-1.01.41
this is also sometimes called Unrepeatable read
这有时也被叫做不可重复读（Unrepeatable Read）
01:01:41 - 01:01:43
so let's say I have two transactions t1 t2
So，假设我有两个事务（即T1和T2）
1.01.43-1.01.46
t1 do a R(A), and then R(A) again
T1先对A进⾏读取，接着，再对A进⾏读取
1.01.46-1.01.49
t2 is gonna R(A) follow by a W(A)
T2会先对A进⾏读取，紧接着⼜对A进⾏写⼊操作
01:01:49 - 01:01:51
so let's say I actually run this
So，假设我执⾏了这些事务
1.01.51-1.01.55
t1 starts does the R(A) gets $10 out of my bank account
T1对A进⾏了读取操作，看到我的账上有10美⾦
01:01:55 - 01:01.57
then there's a context switch
这⾥存在着上下⽂切换
1.01.57-1.01.58
we start running t2
接着，我们开始执⾏T2
1.01.58-1.02.01
t2 R(A) sees $10
T2对A进⾏读取，它看到A⾥⾯有10美⾦
1.02.01-1.02.02
that's that's fine
这没什么问题
01:02:02 - 01:02:05
but then it writes back $19
但接着，它A账户中的钱修改为$19
1.02.05-1.02.06
then it goes heads and commits
接着，提交T2这个事务
01:02:07 - 01:02:11
and we get back to your knowledge but from the database system to say that our
transaction committed
然后，我们收到了来⾃我们数据库的通知，即T2已经被提交
01:02:12 - 01:02:16
but then now our transaction switches back the context switch back over to t1
接着，上下⽂切回T1
1.02.16-1.02.18
t1 now does it read
T1开始它的读操作
01:02:18 - 01:02:20
and again gets back 19
它所得到的值为19
01:02:22 - 01:02:24
but the first time I read a ,I got 10
但在⼀开始读取A的时候，我得到的值是10
01:02:25 - 01:02:28
so I'm trying to read the same object ,I'm not getting the same value
So，当我试着去读取同⼀个对象时，我得到的值并不相同
01:02:28 - 01:02:30
so that's unrepeatable read
So，这就是不可重复读（unrepeatable read）
1.02.30-1.02.31
I try to read something
当我试着去读取同⼀个东⻄的时候
1.02.31-1.02.33
I'm not seeing the same thing over and over again
我看到的结果始终是不同的
01:02:33 - 01:02:36
and again if we're trying to guarantee isolation
如果我们试着去保证隔离性
1.02.36-1.02.37
and for our transactions
对于我们的事务来说
01:02:38 - 01:02:40
it should not see this this change over here
它这⾥不应该看到这个修改
1.02.40-1.02.43
because if we're running this was in serial ordering
因为如果我们是按顺序执⾏事务
1.02.43-1.02.47
t1 should've just run completely and then finish and then t2 would run
那么T1完全执⾏完毕后，接着才会执⾏T2
01:02:49 - 01:02:52
right so that that couldn't happen under a serial order
So，在按顺序执⾏的情况下，这种情况是不可能发⽣的
01:02:54 - 01:02:58
next conflict is write read also sometimes called dirty reads
下⼀种冲突叫做读写冲突，有时也叫作脏读（Dirty Reads）
01:02:58 - 01:03:01
so so now T1 we do a R(A) follow by W(A)
So，T1先执⾏R(A)，紧接着执⾏W(A)
1.03.01-1.03.04
and the T2 gonna do also do a R(A) followed by W(A)
T2也是先执⾏R(A)，紧接着执⾏W(A)
01:03:05 - 01:03:06
T1 R(A) sees $10
T1读取A时，它所看到的值是$10
1.03.06-1.03.08
then it writes back $12
接着，它将A的值更新为$12
1.03.08-1.03.12
now t2 R(A)
现在，T2对A进⾏读取
1.03.12-1.03.14
and it sees the $12 that the first guy put in
它看到了T1所写⼊的$12
01:03:15 - 01:03:17
right but then now it writes back $14
但现在它将A的值更新为$14
01:03:18 - 01:03:20
then the goes to commits
接着，提交T2
1.03.20-1.03.25
and then you know we get back acknowledgment from the database system say yeah
you committed you're good to go
接着，我们收到了来⾃数据库系统的通知，它表示：该事务已经提交成功，你可以去⼲别的了
01:03:25 - 01:03:27
but now we do our context switch
但现在，我们进⾏上下⽂切换
1.03.27-1.03.27
we come back over here
我们切换回T1
1.03.27-1.03.30
and now our first guy aborts
现在，T1被中⽌了
01:03:31 - 01:03:33
so we said there's no partial transactions
So，我们说过不能出现partial transaction的情况
1.03.33-1.03.35
so this guy has to abort
So，T1就会被中⽌
01:03:35 - 01:03:37
So we need to roll back our update
So，我们得回滚我们的更新操作
01:03:38 - 01:03:40
but the problem was that
这⾥的问题是
1.03.40-1.03.43
this other transaction here ,already read my update
另⼀个事务已经读取到了我更新后的值
01:03:44 - 01:03:45
and then committed
并且这个事务还被提交了
1.03.45-1.03.48
and it's told the outside world ,but yeah when I read a I saw $12
并且它告诉外界，当我读取A的时候，它的值是$12
01:03:50 - 01:03:51
but that shouldn't have happened
但这种情况不应该发⽣
1.03.51-1.03.55
because again we can't that's a temporary inconsistent inconsistency
因为这是⼀种临时不⼀致
1.03.55-1.03.56
we made a change to a
我们对A进⾏了修改
01:03:58 - 01:04:02
that mean we have to make the change in order to actually you know apply the change
of the database
这意味着，我们需要做出这些修改，以此来将这些修改提交给数据库
01:04:02 - 01:04:04
But nobody should have been able to see that change
但所有⼈都不应该看到这个修改
1.04.04-1.04.05
because our transaction didn't commit
因为我们并未提交该事务
1.04.05-1.04.07
and furthermore, because we aborted
此外，因为我们中⽌了该事务
01:04:08 - 01:04:11
now we leak something into the outside world that shouldn't have appeared
现在，我们向外界泄露了本不该出现的信息
01:04:14 - 01:04:16
the last conflict is write-write
最后⼀种冲突是写写冲突
1.04.16-1.04.19
and this is overwriting uncommitted data
即覆写掉未提交的数据
01:04:19 - 01:04:22
so t1 does it W(A) puts in $10
So，T1对A进⾏写⼊操作，将A的值变为$10
1.04.22-1.04.26
t2 does a W(A) puts in $19 without reading it
T2对A进⾏写⼊操作，在没有读取A的值的情况下，将值修改为$19
1.04.26-1.04.28
then obviously B puts an Andy
接着将B修改为Andy
01:04:28 - 01:04:29
and then over here
接着，回到T1这⾥
1.04.29-1.04.31
t1 starts running again
这⾥我们再次开始执⾏T1
1.04.31-1.04.33
and it writes in Bieber
它将B修改为Bieber
01:04:34 - 01:04:36
so now when we go to commit
So，当我们现在提交事务的话
1.04.36-1.04.37
what's the issue
会出现什么问题呢？
01:04:37 - 01:04:39
well I have two objects A and B
Well，我有两个对象，即A和B
01:04:40 - 01:04:43
and so for A
So，对于对象A来讲
1.04.43-1.04.48
I'm seeing the the write that the T2 put in there, it put in $19
我看到了T2执⾏的写操作所做的修改，即A的值是$19
01:04:48 - 01:04:49
but for object B
但对于对象B来说
1.04.49-1.04.51
I'm seeing Justin Bieber
我看到的值是Justin Bieber
1.04.51-1.04.52
because that's what t1 put in
因为这是T1写⼊的值
01:04:53 - 01:04.54
So I have a torn update
So，我遇上了更新撕裂的情况
1.04.54-1.05.00
right I have I have data that I have two objects they've been modified by two different
transactions
我有两个对象，它们被两个不同的事务所修改
1.05.00-1.05.05
they both shouldn't modified atomically by one transaction
它们两个都不应该被其中某个事务进⾏原⼦性修改
01:05:05 - 01:05:06
and this occurred
但这种情况发⽣了
1.05.06-1.05.11
because you know this guy got to go got to go running while this guy was still running
因为T1在执⾏的时候，T2也在执⾏
01:05:12 - 01:05:14
and that shouldn't happen if we were trying to guarantee you serial ordering
如果我们要试着去保证顺序执⾏的话，那这种情况不应该发⽣
01:05:17 - 01:05:19
so now given these conflicts
So，在这些给定的冲突情况⾥
1.05.19-1.05.25
we need to understand more formally you know how do we prove whether something's
actually Serializable
我们需要去正式理解我们该如何证明这些东⻄是Serializable的
01:05:25 - 01:05:26
so in the sake of time
So，为了赶时间
1.05.26-1.05.30
I'm gonna skip conflict Serializability or sorry
我会跳过Conflict Serializability这部分，抱歉
01:05:30 - 01:05:32
we did you definitely know Conflict Serializability
你们肯定已经知道什么是Conflict Serializability
1.05.32-1.05.34
I'm gonna I'm gonna skip View Serializability,
我会跳过View Serializability这部分
1.05.34-1.05.39
Conflict Serializability it's what you need to know for the homeworks
在做Homework的时候，Conflict Serializability是你们需要去了解的东⻄
01:05:39 - 01:05:45
I'll post on on Piazza the link to the lecture from last class, last year what that talks like
we Serializability
我会在Piazza上贴下去年关于Serializability那节课的链接
1.05.45-1.05.49
it's the same material that would have cover, but we're out of time
讲的内容是⼀样的，但我们现在没时间去讲了
01:05:49 - 01:05:53
right so most database systems are going to try to give you this
So，⼤多数数据库系统都会试着去⽀持Conflict Serializability
1.05.53-1.05.57
if they say these supports Serializable execution of transactions, the serializable
isolation level
如果它们表示它们⽀持按顺序执⾏事务以及serializable隔离级别
01:05:57 - 01:05.58
they'll give you this
它们会为你提供这个
1.05.58-1.05.59
nobody does this one
但没⼈⽀持View Serializability
1.05.59-1.06.02
because this requires high-level information about what the applications trying to do
因为这需要⼀些⾼级信息（关于应⽤程序所要试着做的事情）
1.06.02-1.06.04
and we can't get that automatically
我们⽆法⾃动获取这项功能
01:06:06 - 01:06:07
all right
1.06.07-1.06.10
so now we're going to find out a new term
So，这⾥我们有⼀个新术语
1.06.10-1.06.13
and say that two schedules are considered to be conflict equivalent
如果两个schedule被认为是冲突等价的（conflict equivalent）
01:06:13 - 01:06:19
if and only if they are involved in the same set of operations and transactions running in
at the same time
仅当它们涉及到同时运⾏的是同⼀组操作和事务中时
01:06:20 - 01:06:25
and then every pair of conflicting transactions are ordered in the same way
那么，每对conflicting transaction会按照相同的⽅式进⾏编排
01:06:25 - 01:06:30
so again a conflicting transactions when were they're actually trying to update turn to a
read or write on an object
So，当⼀个conflicting transaction要试着对某个对象进⾏更新，这就会发⽣对某个对象进⾏读
取或写⼊操作
01:06:31 - 01:06:35
Right, 2 transactions, ones either read or write and ones either a read or write
假设，这⾥有两个事务，其中⼀个事务中涉及了读操作或者写操作，另⼀个事务中也涉及了读操
作或者写操作
01:06:35 - 01:06:37
they always have to have at least one write
它们中始终⾄少得有⼀个写操作
01:06:38 - 01:06:40
so we'll say a schedule S is conflict serializable
So，假设Schedule S是Conflict Serializable的
1.06.40-1.06.43
if it's Conflict equivalent to some serial schedule
如果S和某种Serial Schedule是冲突等价的
01:06:44 - 01:06:51
so the way we're going to figure out how to determine whether something's conflict
serializable
So，我们弄清楚某个Schedule是否Conflict Serializable的⽅式是
1.06.51-1.06.55
is by just swapping the order of non-conflicting operations
即通过交换那些不冲突操作的顺序来弄清楚该Schedule是否是Conflict Serializable的
01:06:55 - 01:06.55
the idea is that
这⾥的思路是
1.06.55-1.06.58
we can do these swapping steps on operations
我们可以交换操作的执⾏顺序
1.06.58-1.07.06
and that'll to push a bunch of operations to the top for one transaction put a bunch of
operations to the bottom for another transaction, until we end up with a serial order
即我们将某个事务中的⼀些操作的执⾏顺序提前，接着将另⼀个事务中某些操作的顺序延后（即
将事务1的⼀些操作放在事务2⼀些操作之前执⾏），直到它们的执⾏结果与按顺序执⾏所得到
的结果⼀致为⽌
01:07:07 - 01:07:09
so going back to this example here
So，回到这个例⼦
1.07.09-1.07.14
so we do a R(A) follow by W(A) and read them a R(B) follow by R(B) for t1 and t2
So，在T1和T2中，我们先执⾏R(A)，紧接着执⾏W(A)，然后执⾏R(B)和W(B)
01:07:14 - 01:07:17
so we have here we want to start swapping here
So，我们想在这⾥进⾏交换
1.07.17-1.07.19
so we have a R(B) and a W(A)
So，这⾥我们要交换的操作是R(B)和W(A)
01:07:19 - 01:07:23
so this case here, they're not touching the same object
So，在这个例⼦中，这俩操作涉及的并不是同⼀个对象
01:07:24 - 01:07:25
so I can go ahead and swap their order
So，我可以去交换它们的执⾏顺序
1.07.25-1.07.28
I can make read a R(B) happen before the W(A)
我可以让R(B)在W(A)之前执⾏
01:07:29 - 01:07:30
same thing the next one here
对于这⾥也是如此
1.07.30-1.07.32
the R(B) can happen before the R(A)
R(B)可以在R(A)之前执⾏
1.07.32-1.07.34
I can swap their order that's fine
我可以交换它们的执⾏顺序，这是ok的
01:07:35 - 01:07:36
Now I can do the same thing with other one
对这⾥，我也可以做相同操作
1.07.36-1.07.39
the W(B) could happen before the W(A)
W(B)可以在W(A)之前执⾏
1.07.39-1.07.40
swap that
我们对它们进⾏交换
01:07:40 - 01:07:42
The W(B) can happen before the R(A)
W(B)可以在R(A)之前执⾏
1.07.42--1.07.44
can swap, so I can do that
So，我可以对它们进⾏交换
01:07:44 - 01:07:46
so now I end up with a serial ordering
So，最终我会得到⼀个按顺序执⾏的schedule
01:07:47 - 01:07:49
it's got equipment to this one here
它等同于右边这个Schedule
01:07:51 - 01:07:53
so this is the one where you can't do this
So，在这个例⼦中，你没法这么⼲
1.07.53-1.07.54
so in this case here
So，在这个例⼦中
1.07.54-1.07.56
I have a W(A) follow by W(A)
W(A)后⾯紧跟着W(A)
1.07.56-1.07.57
I can't swap their order
我没法去交换它们的顺序
01:07:58 - 01:08:02
so therefore it's it's not equivalent to a serial ordering
因此，它的执⾏效果与Serial Schedule并不相同
01:08:03 - 01:08:05
right this is pretty straightforward
这个例⼦你们很容易就能明⽩
01:08:06 - 01:08:08
but of course now this is kind of like stupid to do
但很明显，这种事情太愚蠢了
1.08.18-1.08.13
right like what if I have a lot of transactions And I have a lot of operations
但如果我要执⾏⼤量的事务，并且⾥⾯包含了⼤量的操作
01:08:13 - 01:08:14
this is gonna be very expensive for me to do
那么，对于我来说，这样做的成本太昂贵的
01:08:15 - 01:08:23
so we need a better way to figure out to determine whether something is is gonna be
serializable or not without having to do this the swapping thing
So，在不交换操作执⾏顺序的情况下，我们需要⼀种更好的⽅式来判断该Schedule是否是
Serializable的
01:08:23 - 01:08:26
and so the way we can do this is through a dependency graph
So，我们的做法就是使⽤依赖图（Dependency Graph）
01:08:27 - 01:08:29
and the textbook I think calls this a precedence graph
我觉得教科书中的叫法是precedence graph（优先图）
01:08:30 - 01:08:31
So dependency graph is just gonna say
So，依赖图表示的是
1.08.31-1.08.35
we're have a node for every single transaction in our schedule
在我们的schedule中，每个事务就是⼀个节点
01:08:35 - 01:08:44
and that will have an edge between two transactions,if there's some operation in one
transaction conflicts with another operation in the other transaction
如果⼀个事务中的某个操作会与其他事务中的另⼀个操作产⽣冲突，那么这两个事务间就会有⼀
条线
01:08:45 - 01:08:50
and the first operation of occurs earlier,and then schedule than the other other
transaction
在这个Schedule中第⼀个操作执⾏的要⽐其他事务来得更早
01:08:52 - 01:08.53
right
1.08.53-1.08.56
and so if I look at my entire schedule
So，如果我去查看整个schedule
1.08.56-1.08.58
and I generate my dependency graph
并⽣成了我的依赖图
1.08.58-1.09.00
if I see a cycle
如果我看到⾥⾯存在着⼀个环
01:09:01 - 01:09:03
then I know that it's not serializable
那么，我就知道它并不是serializable的
1.09.03-1.09.05
because I won't be able to swap their ordering
因为我不能够交换它们的执⾏顺序
01:09:05 - 01:09:07
but if there's no cycles
但如果这⾥⾯不存在环
1.09.07-1.09.08
then it is conflict serializable
那么，它就是Conflict Serializable
01:09:10 - 01:09:11
so let's look at this example here that we had before
So，来看下我们之前看过的⼀个例⼦
01:09:12 - 01:09:13
so in this case here
So，在这个例⼦中
1.19.13-1.19.16
I have a W(A) followed by a R(A)
我先对A执⾏写操作，然后紧接着对A进⾏读取
01:09:16 - 01:09:19
so the W(A) conflicts with a R(A) obviously
So，很明显，W(A)会与R(A)发⽣冲突
1.09.19-1.09.22
and the W(A) in T1 happens before the R(A) in T2
T1中的W(A)在T2中的R(A)之前执⾏
01:09:22 - 01:09:25
so I'll have an edge from t1 to t2
So，我会有⼀条从T1到T2的箭头
1.09.25-1.09.26
and I label it for the object A
在它上⾯我标记了⼀个A
01:09:28 - 01:09:29
same thing here
此处也是⼀样的
1.09.29-1.09.32
I have a W(B) for B
这⾥我会对B执⾏写操作
1.09.32-1.09.34
so I have an edge from t2 to t1 on B
So，我会有⼀个线，它从T2指向T1，即图中的B
01:09:34 - 01:09:37
and now at this point I have a cycle
此时，我就有了⼀个cycle
01:09:37 - 01:09:39
so therefore I know that this this ordering is not conflict serializable
因此，我知道，这个执⾏顺序并不是Conflict Serializable的
01:09:40 - 01:09:41
again just looking at the code
通过查看代码
1.09.41-1.09.43
this is the the justin beiber example I have before
这⾥我⽤之前那个Justin Bieber的那个例⼦为例
1.09.43-1.09.46
I do a R(A) follow by W(A) here
这⾥我先执⾏R(A)，紧接着再执⾏W(A)
1.09.46-1.09.49
then R(A) a follow W(A) ,R(B) follow that W(B)
接着就是R(A)后⾯紧跟着W(A)，R(B)后⾯紧跟着W(B)
1.09.49-1.09.50
then R(B) follow by W(B)
然后就是R(B)后⾯紧跟着W(B)
01:09:51 - 01:09:56
so I would have the update to B occur from t1 ,and the update to A would occur at t2
So，我对B的更新是在T1中执⾏的，我对A的更新则是在T2中执⾏的
So，我会在T1中对B执⾏更新，我也会在T2中对A进⾏更新
1.09.56-1.09.57
and that's a torn update
这就是更新撕裂
01:10:00 - 01:10:02
so let's get even crazier now
So，我们来看些更加疯狂的场景
1.10.02-1.10.04
we'd have an arbitrary number of transactions
假设，我们有任意数量的事务
01:10:04- 01:10:05
so in this case here
So，在这个例⼦中
1.10.05-1.10.07
I have a R(B) and a W(B)
我有R(B)和W(B)这两个操作
01:10:08 - 01:10:09
so I have an edge from t2 to t1 on B
So，T我会有⼀条从T2指向T1的线，即图中的B
1.10.09-1.10.12
and just keep going down the line one by one right
接着，我们继续往下，将它们⼀个个⽤线连起来
1.10.12-1.10.15
and then we end up something like this
那么，我们最终会得到像这样⼀个东⻄
01:10:15 - 01:10:16
So the question is
So，这⾥的问题是
1.10.16-1.10.18
is this considered equivalent
这是否等同于按顺序执⾏的效果
01:10:18 - 01:10:18
yes
没错
1.10.18-1.10.22
because we can take any arbitrary take or during t2 t1 t3
这⾥我们执⾏事务的顺序是T2，T1，T3
1.10.22-1.10.25
and that'll end up with the correct serial ordering what we want it
最终它产⽣的结果和我们按照顺序执⾏所得到的结果是⼀样的
01:10:26 - 01:10:30
so but if we generate the dependency graph just look to see whether we have a cycle
So，但如果我们在我们⽣成的依赖图中看到了⼀个cycle
1.10.30-1.10.32
that'll tell us whether we're conflicts serializable or not
这就会告诉我们这是否是Conflict Serializable的
01:10:36 - 01:10:39
Okay, all right we have a little more time we keep going,okay
Ok，我们还有点时间，我们继续来讲点东⻄
01:10:40 - 01:10:45
um let's look let's bring back now,the operations we had before
我们回看下我们之前的那些操作
1.10.45-1.10.47
these high-level things that the application may want to do
这些可能是那些应⽤程序想执⾏的操作
01:10:47 - 01:10:49
so now we still have our reads writes
So，这⾥⾯我们依然有读操作和写操作
1.10.49-1.10.52
, but now I'm showing you like what the program actually program logic is actually doing
但这⾥我想向你们展示的是这段程序逻辑实际要做什么事情
01:10:52 - 01:10.54
so the reads and writes are always going to the database
So，数据库中执⾏的始终是这些读和写操作
1.10.54-1.11.00
but any of these other operations like you know B=B+10 these are happening within the
transaction state
但诸如B=B+10这些操作都是发⽣在事务状态中的
01:11:00 - 01:11:04
so any change I make the B is not written to the database into I have to do the W(B)
So，我对B所做的任何修改都不会被写⼊数据库，只有W(B)这个操作会被写⼊数据库
01:11:05 - 01:11:07
all right so in this case here
So，在这个例⼦中
1.11.07-1.11.09
I never going to point out too is like
这⾥我没指出的⼀点是
1.11.09-1.11.12
what we're doing and this one here we're taking ten dollars at a one account
这⾥我们从⼀个账户中取出10美⾦
01:11:12 - 01:11:14
and then putting ten dollars in this account
接着，将这10美⾦放⼊这个账户
01:11:14 - 01:11:19
the second transaction I just want to compute the sum of the total amount of money that
are in A and B
在第⼆个事务中，我想去计算A和B这两个账户中的⾦钱总和
01:11:20 -01:11:22
and then this is like this fake echo command
这是⼀个伪造的ECHO命令
1.11.22-1.11.22
, this is not a real thing
它不是真正的ECHO命令
1.11.22-1.11.23
I'm just showing this for demonstration purposes
这⾥我只是出于展示的⽬的才使⽤它
1.11.23-1.11.28
this is just printing out to you returning the actual sum of the two values
它只是⽤来打印你所返回的这两个值的和
01:11:28 - 01:11:29
so in this case here
So，在这个例⼦中
1.11.29-1.11.32
right we want to generate a dependency graph
我们想去⽣成⼀个依赖图
1.11.32-1.11.34
we have a W(A) and R(A)
这⾥我们有W(A)和R(A)
1.11.34-1.11.36
,so we have an edge from t1 to t2 on a
So，我们会有⼀条关于A的从T1指向T2的线
1.11.36-1.11.37
down here
在下⾯
1.11.37-1.11.39
we have W(B) and a R(B)
我们有W(B)和R(B)这两个操作
01:11:39 - 01:11:43
so we would have an edge going the other direction on B
So，我们会有⼀条关于B的线，它的⽅向和上⾯那条线是相反的
01:11:43 - 01:11:44
so we have a cycle
So，我们就有了⼀个cycle
1.11.44-1.11.47
so therefore this is not conflict serializable
So，因此，这就不是Conflict Serializable的
01:11:47 - 01:11:58
but there is actually a way for first if we can modern we could potentially modify this
application and do something different than just computing the sum this way
我们可以修改这个应⽤程序，做些除了计算总和以外的不同事情
01:11:59 - 01:12:06
where we could end up with something that would still follow in the same state as a
serial ordering of a transaction
最终我们会得到与按顺序执⾏事务结果所相同的状态
01:12:06 - 01:12:10
but it would actually not be conflict serializable because of this cycle up here
但因为这个cycle的缘故，它实际上并不是Conflict Serializable的
01:12:12 - 01:12:18
so instead of just me going reading a ,and then adding to my sum and reading B added
to my sum
So，我不⽤去读取A的值，然后将A的值添加进sum，接着读取B，将B的值放⼊sum
01:12:18 - 01:12:21
what if instead of actually giving them the exact sum for both accounts
如果我不给出这两个账户的实际总和
1.12.21-1.12.29
what do I just want to know what are the total number accounts ,that have more than
zero dollars
我想知道的是这两个账户的总额是否⼤于0美⾦
01:12:29 - 01:12:32
I'm computing the number accounts that are greater than greater than zero
我会去计算这两个账户的钱是否⼤于0美⾦
01:12:33 - 01:12:35
so if I rewrote my application to say
So，如果我重写我的应⽤程序，并表示
1.12.35-1.12.37
if a greater than equal to zero
如果A⼤于0
1.12.37-1.12.39
add one to my counter
我会往我的计数器中加1
01:12:39 - 01:12:41
Then in that case
接着，在这个例⼦中
1.12.41-1.12.42
when I print out my count
当我打印出我的count值
1.12.42-1.12.50
sure ,even though I interleaved my transaction while t1 was still running and that money
was missing
尽管我交错执⾏了我的事务，当T1依然在运⾏的时候，此时，切换到了T2，发现这笔钱丢了
（知秋注：对于T2来讲，因为做的是计算账户总⾦额，那此时A少了10美⾦，打印出的总数也
就少了10美⾦）
1.12.50-1.12.52
assuming That I did have exactly $10
假设，我确实拥有这10美⾦
01:12:53 - 01:12:54
and they didn't go negative
并且它们不能变成负数
1.12.54-1.12.57
then this thing would actually still produce the correct result
实际上这⾥它所⽣成的结果依然是正确的
01:12:59 - 01:13:00
so what's up with that
So，这是怎么⼀回事呢？
1.13.00-1.13.01
,that's kind of weird right
这有点奇怪，对吧
1.13.01-1.13.03
I said conflict serializability says that
Conflict Serializability表示
1.13.03-1.13.08
I need to end up the same state of the database so the same result as if I was running a
serial ordering
我需要让我的数据库状态和结果最终等同于我按顺序执⾏事务的结果
01:13:08 - 01:13:09
but in this case here
但在这个例⼦中
1.13.09-1.13.11
I'm not conflict serializable
这⾥并不是Conflict Serializable的
1.13.11-1.13.21
but I'm still getting the same result on the same state of database as if I was running in
a Serial ordering
但我依然得到了与按顺序执⾏事务时相同的结果和相同的数据库状态
01:13:21 - 01:13:24
So this is what view serializability is
So，这就是所谓的View Serializability（知秋注：在这个例⼦中，我们屏幕打印看到的结果和实
际最终的结果不⼀样，所以要追求看到的和实际的⼀致，所以这叫View Serializability）
01:13:24 - 01:13:27
and again the spoiler is that nobody actually does this
实际上，并没有⼈这样做
1.13.27-1.13.31
because it requires us to have some reasoning about ,what the hell's the application or
transaction that you're trying to do here
因为这要求我们去解释该应⽤程序或者该事务所要试着做的是什么
1.13.31-1.13.37
to know whether it's okay for me to interleave them by plopping these guys in the
middle of these other ones here
以此来知道我是否能交错执⾏它们
01:13:37 - 01:13:39
so this what I was saying nobody actually does this
So，这就是我说为什么没⼈使⽤它的原因
1.13.39-1.13.41
but it's actually a really interesting concept
但实际上，它是⼀个我们很感兴趣的概念
01:13:41 - 01:13:43
and eventually you know maybe 50 years from now
可能50年以后
1.13.43-1.13.46
people have better programming models and programming application frameworks
⼈们可能就会拥有更好的编程模型以及应⽤程序框架
1.13.46-1.13.48
where we could actually do use view serializability
到了那时我们可能就可以使⽤View Serializability
01:13:48 - 01:13:51
but it does it doesn't exist today ,it's only theoretical
但它当下并不存在，它还处于理论阶段
01:13:52 - 01:13:54 ！！！！
so let's look another example here
So，我们来看下另⼀个例⼦
01:13:55 - 01:13.57
so we have three transactions running
So，这⾥我们有3个事务正在执⾏
1.13.57-1.14.00
T1 do a R(A) a follow W(A)
T1先对A进⾏读取，紧接着对A进⾏写⼊操作
1.14.00-1.14.03
and then T 2 and T 3 are doing what I call blind W(A)
接着，T2和T3对A进⾏盲写
01:14:03 - 01:14:07
so we're writing to A without actually reading it first, which we could do
即我们在不读取A当前值的情况下，对它进⾏写⼊操作，我们可以这么做
01:14:08 - 01:14:11
so again if I just go through and generate my dependency graph
So，如果我检查并⽣成我的依赖图
1.14.11-1.14.16
we're gonna generate a bunch edges, and we have a cycle
我们会⽣成由这些线所组成的依赖图，这⾥⾯存在着⼀个环
01:14:16 - 01:14:19
so we therefore we know that it's that it's not conflict serializable
因此，我们知道它并不是Conflict Serializable的
01:14:20 - 01:14:22
but if I just actually look at the transaction a little bit
但如果我去看下这个事务
1.14.22-1.14.29
well I see well assuming that these are the only transactions that are running at this
right now which we said that was the case
假设，在这个例⼦中，现在只有这些事务在执⾏
01:14:31 - 01:14:33
T 1 does R(A) follow W(A)
T1先对A进⾏读取，紧接着对A进⾏写⼊操作
1.14.33-1.14.34
T2 does W(A)
T2对A进⾏写⼊操作
01:14:35 - 01:14:36
but in the end the day
但到头来
1.14.36-1.1440.
the answer to database the only thing that matters is this last write on T3
对于数据库来说，它唯⼀在意的是T3所执⾏的这最后⼀个写操作
01:14:42 - 01:14:50
so this ordering here is actually views view equivalent to one where I execute tthem in
this order like this
So，实际上，从视觉⻆度来看，这两种执⾏顺序所达到的效果是等同的
01:14:51 - 01:14:56
so as long as T3 is the last write that gets persisted to the database of A
So，只要T3所做的这最后⼀个关于A的写操作被持久化到数据库
1.14.56-1.14.59
who cares how these other ones up here about interleaved
那么，谁还会去在意这上⾯其他操作是如何交织执⾏的呢
01:15:00 - 01:15:02
but I need to know that
但我需要去知道
1.15.02-1.15.05
in my application it's ok for this thing to be the last writer
在我的应⽤程序中，如果T3所执⾏的这个写操作是最后⼀个写操作，那么这是Ok的
01:15:06 - 01:15:07
and as I said
正如我所说的
1.15.07-1.15.09
next class when we talk about two phase locking
当我们下节课讨论两阶段锁的时候
1.15.09-1.15.14
transactions are showing up in arbitrary orderings at different times that you know
during execution
在我们执⾏事务的时候，事务会以任意顺序在不同时间点出现
01:15:15 - 01:15:19
and you don't know exactly what they're gonna be doing ahead of time
你⽆法提前准确知道这些事务会做什么
1.15.18-1.15.19
so you can't guarantee this
So，你⽆法保证这点
01:15:22 - 01:15:25
so just real quickly skip all this
So，快速跳过这些内容
01:15:26 - 01:15:30
the way to think about the these schedules that we talked about is that
我们思考我们之前讨论过的这些schedule
1.15.30-1.15.37
you have this universe of all possible orderings of schedule, or all possible schedule
orderings you could have for any transaction in your application
这个集合中包含了你应⽤程序中所有可能的事务执⾏顺序的schedule
01:15:38 - 01:15:40
right that's this giant space here
这是⼀个很⼤的范围
1.15.40-1.15.40
it's any possible ordering
这⾥⾯存在着任何可能的顺序
1.15.40-1.15.44
but but you're not in regarding you're not even considering what it means to be correct
or not
你不会去考虑它们所⽣成的答案是正确还是错误
01:15:45 - 01:15:49
the then you a smaller portion here of serial ordering
这其中有⼀⼩部分是Serial Schedule
01:15:50 - 01:15:52
all right these are ones where executing transactions one after another
这些是⼀个接⼀个，按顺序执⾏事务的Schedule
01:15:53 - 01:15.55
and then around that would be conflict serializable
接着，在它外⾯所包围的是Conflict Serializable
1.15.55-1.15.59
where again these are some interleave that may not be serial
这⾥⾯存在着⼀些交错执⾏的情况，它们可能并不是按顺序执⾏的
1.15.59-1.16.00
it includes all serial orderings
它⾥⾯包含了所有Serial Schedule
1.16.00-1.16.02
but includes ones that aren't
但也包含了那些不是Serial的Schedule
01:16:02 - 01:16:06
and then around that will be the view serializable orderings
接着，在它外⾯就是View Serializable
1.16.06-1.16.07
yes
请问
01:16:07-1.16.11
yes coming back
回到这⾥
01:16:19 - 01:16:22
cuz again so say the this is what I'm given
So，这⾥是我给出的情况
1.16.22-1.16.24
,and I would say run these transactions
我会说，执⾏这些事务
01:16:25 - 01:16:28
again I'm not worrying about transaction showing up arbitrarily
再说⼀遍，我并不担⼼事务是以任意顺序出现的
1.16.28-1.16.30
it's saying this is what I have I want to run this right now
这是我现在想执⾏事务的顺序
01:16:31 - 01:16:34
what's the end there's only one object in the database
在数据库中只有⼀个对象
01:16:35 - 01:16:40
so the only thing I'm gonna see after I run these transactions is what's this what's the
value of a
当我执⾏完这些事务后，我唯⼀想看到的是A的值是什么
01:16:41 - 01:16:45
and so who cares that t1 and t2 wrote a
So，没⼈会去在意T1和T2对A所做的写⼊操作
1.16.45-1.16.47
because t3 is gonna overwrite it
因为T3会将它覆盖掉
01:16:47 - 01:16:51
so at the end of day all what matters is whatever this guy wrote, who cares what these
guys actually did
So，最后我们只会关⼼T3所做的这个写操作，不会去在意其他线程所做的写操作
01:16:55 - 01:16:56
what correct
说的没错
1.16.56-1.16.59
this one not work in the first example what is the first example
这在第⼀个例⼦中，并不奏效，说起来，第⼀个例⼦是什么来着？
01:17:01 - 01:17:06
yeah taking money I don't want to count put in another account computing the interest
yes
转账还有计算利息那个例⼦，说的没错
01:17:10 - 01:17:12
this is just meant to illustrate the concept
这个只是⽤来解释这个例⼦罢了
01:17:12- 01:17:13
okay
1.17.13-1.17.16
so I'm gonna skip all this
So，跳过这些
1.17.16-1.17.19
for transaction durability we've already covered this
对于事务持久化这⽅⾯，我们之前已经介绍过了
1.17.19-1.17.20
that's the log itself
这与⽇志相关
1.17.20-1.17.21
and we'll spend a whole week on this
我们会花⼀周来讲这个
01:17:22 - 01:17:25
The ACID properties we've already covered Atomicity、Consistency、Isolation
关于ACID四⼤特性，我们已经介绍了原⼦性、⼀致性以及隔离性
1.17.25-1.17.28
today moves to focus on these two
今天我们主要讲了原⼦性和隔离性
1.17.28-1.17.29
we'll cover this more distributed databases
我们会在讲分布式数据库的时候，讲更多关于⼀致性⽅⾯的东⻄
1.17.29-1.17.31
we'll cover this for logging checkpoints
我们会在讲logging和checkpoint的时候去讲下持久化⽅⾯的东⻄
01:17:31 - 01:17:34
but for next week we're gonna focus on these these two further
在下周的时候，我们会深⼊讲解这两个
01:17:34 - 01:17:36
so the the last thing I'll just sort of say too is that
So，我最后要讲的东⻄是
1.17.36-1.17.39
concurrency control is hard
并发控制是⼀个难点
1.17.39-1.17.40
it's hard to get correct
我们很难去保证得到的结果是正确的
1.17.40-1.17.41
hard to get performed well.
也难以保证它会表现得很好
1.17.41-1.17.49
this is why a lot of newer database systems that come along except for more recently,
they initially did not support transactions
这就是为什么最近很多新出来的数据库系统⼀开始并不⽀持事务的原因所在
01:17:49 - 01:17:50
because they said
因为他们表示
1.17.50-1.17.51
they want to get best performance
他们想获得最佳性能
1.17.51-1.17.55
and they didn't worry about you know running transaction
他们并不关⼼执⾏事务⽅⾯的事情
01:17:55 - 01:17.56
they wanted to make sure the system was always available
他们想确保系统始终是可⽤的
1.17.56-1.18.01
and you know they didn't want to burden themself with transactions
他们不想因为事务⽽增加⾃⼰的负担
01:18:02 - 01:18:06
and so the the thing I always like to point out though is
So，我总是想指出的⼀点是
1.18.06-1.18.14
Google in the 2004 2005 ,they were sort of the Harbinger or the vanguard of the
newSQL system
Google在04、05年的时候，推出了⼀个NewSQL系统
01:18:14 - 01:18:15
they put out this thing called BigTable
他们所推出的东⻄叫做BigTable
1.18.15-1.18.18
they said joins are slow, SQL slow, transactions are slow
他们表示join很慢、SQL很慢、事务也很慢
1.18.18-1.18.19
we're not gonna do any of that
他们不会做任何有关这些的事情
01:18:20 - 01:18:23
And then like seven or eight years later
接着，过了七⼋年
1.18.23-1.18.31
after everyone's sort of copied what Google had done like Cassandra ,Mongo a bunch of
other key value stores ,HBase
诸如，Cassandra、MongoDB以及⼀系列Key/Value存储，HBase之类的都借鉴了Google这种
做法
01:18:32 - 01:18:33
they came out this paper called on spanner
他们发表了⼀篇叫做Spanner的paper
1.18.33-1.18.36
which is their transactional database system that they use internally
这是他们内部所使⽤的事务型数据库系统
01:18:36 - 01:18:39
and there's this great line in the paper that says that
paper中有⼀句很棒的话
1.18.39-1.18.43
for their programmers
对于他们的程序员来说
1.18.43-1.18.48
they think it's better to provide an abstraction or programming model that uses
transactions
他们认为提供⼀种使⽤事务的编程模型会来得更好
01:18:48 - 01:18:55
because that's easier for them the reason about the correctness of the program of
whether the rachie doing the write operations in the right order
因为对于他们来说，这样更容易去解释程序执⾏的正确性，即是否以正确的顺序执⾏写操作
01:18:56 - 01:19:02
it's better for the have baby you know the the the unwashed massages your average you
know Rando, javascript program or whatever they're using
你⽆须在意你该使⽤什么语⾔
01:19:03 - 01:19:06
you have them all program to using the transaction programming model
你可以使⽤任何语⾔来实现这个事务编程模型
01:19:06 - 01:19:10
And then instead you have a bunch of really smart people that can do the systems
development like Jeff Dean
有很多像Jeff Dean那样聪明的⼈可以去做这种系统开发
01:19:11 - 01:19:14
their jobs that worried about how to make those transactions go faster
他们的⼯作就是如何以更快的速度执⾏事务
01:19:14 - 01:19:16
so transactions are super important
So，事务超级重要
19.16-1.19.20
every system that they didn't have them before is now trying to start to add them
之前不⽀持事务的那些系统现在也开始逐步⽀持事务
01:19:21 - 01:19:26
because again it provides all these nice guarantees that you want to have in your system
因为事务为你提供了你想在系统中拥有的所有这些nice的保证
1.19.25-1.19.26
okay
01:19:27 - 01:19:29
again I'm rushing I apologize
今天我讲的有点赶，对于这点，我很抱歉
1.19.29-1.19.31
but I won't quickly when I get through a project 3 real quickly
我快速讲下Project 3中你们要做的事情
01:19:31 - 01:19:36
all right,so project 3 reads out which your building is the query execution engine for
bustub
So，你们在Project 3中要做的就是为BusTub构建⼀个查询执⾏引擎
01:19:36 - 01:19:42
so what you're gonna end up implementing is the executors for the actual query plan
operators
So，你们最终要实现的是实际查询计划中operator所对应的executor
01:19:42 - 01:19:45
so say you have a query pan like this
So，假设你有这样⼀个查询计划
1.19.45-1.19.47
then for each of these operators you're going to generate this executor
然后，你要为每个operator⽣成这种executor
01:19:48 - 01:19:50
that's gonna follow the iterator model that we talked about
这遵循我们所讨论过的iterator model
1.19.50-1.19.52
where they'll all have an next function that shoves up
它们都有⼀个⽤来传递数据的next函数
1.19.52-1.19.54
you know you call next on the executor
你知道的，你在executor中调⽤next
01:19:55 - 01:20:00
And it gives you back either the next tuple that it has or a null pointer to say that it's it's
done
它会给你返回下⼀个tuple，或者⼀个空指针，这表示它已经完成了

16-05
16-05
01:20:01 - 01:20:01
okay
1.20.01-1.20.05
so you guys are doing it could be single threaded execution，no exchange operators
So，你们可以使⽤单线程执⾏来做到这点，不需要使⽤exchange operator
01:20:06 - 01:20:07
and you don't have to worry about transactions
你们不需要去关⼼事务⽅⾯的东⻄
1.20.07-1.20.10
you don't have to worry about you know doing updates or deletes
你们也不⽤去担⼼更新或者删除之类的操作
01:20:11 - 01:20:14
so what do you have to build
So，你们得去构建什么呢？
01:20:14 - 01:20:16
so the first thing we're asking you to do is build out the catalog
So，我们⾸先要求你做的事情就是构建出catalog
1.20.16-1.20.19
there's allows you to install tables into the database
这允许你将表加载到数据库中
01:20:19 - 01:20:24
and then go back and get those tables back from the Catalog using the name or the
internal identifier
通过使⽤name或内部标识符（我们常说的id）来从catalog中拿到这些表
01:20:24 - 01:20:27
And then you're building executors for insert ,sequential scans, hash join and hash
aggregation
然后，你要为插⼊，循序扫描，hash join以及hash聚合这些操作构建executor
01:20:28 - 01:20:30
for the hash join
对于hash join
1.20.30-1.20.36
you can implement it first using a you know in-memory hash table that will provide you
你可以先通过我们提供给你的内存型hash table来实现它
01:20:36 - 01:20:37
but the ultimate goal is that
但最终⽬标是
1.20.37-1.20.40
you want to use your linear probe hash table that you built from project two
你想去使⽤你Project 2所构建出的linear probe hash table
01:20:40 - 01:20:43
Because that allow you to do joins on tables that don't fit in disk
因为这能让你对不放在磁盘中的表进⾏join
因为这允许你在不将表放⼊磁盘的情况下，对这些表进⾏join
因为这能让你在⽆须将数据放⼊磁盘的情况下对表进⾏join操作
01:20:43 - 01:20:48
So you can do the first two tasks without having to do that working linear probe hash
table
So，你可以在不使⽤linear probe hash table的情况下，先去完成前两个任务
1.20.48-1.20.50
the last one will require you to have that one working
最后⼀个任务则需要你去使⽤你⾃⼰Project 2中所构建的linear probe hash table
01:20:51 - 01:20:55
so even up the catalog， implement insert executor first
So，除了catalog，你们还得先实现insert executor
1.20.55-1.20.58
because obviously you can't do sequential scans unless you have data in your database
因为很明显，除⾮你的数据库中有数据，不然你没法进⾏循序扫描
01:20:59 - 01:21:01
you don't need to worry about any transactions.
你也不需要担⼼任何事务⽅⾯的事情
1.21.01-1.21.04
and then when posted this on Piazza and I'll just emphasize this again
当我把这个贴到Piazza上的时候，我会再强调⼀遍
1.21.04-1.21.07
GradeScope is not meant to be for debugging
GradeScope并不是帮你们⽤来对代码进⾏debug的
01:21:07 - 01:21:09
right if you submit it
如果你将你的代码提交到GradeScope
1.21.09-1.21.11
and it takes a half an hour or for starts running
它需要花半个⼩时来运⾏这段程序
1.21.11-1.21.12
we can't fix that, right
我们没法修复这个
01:21:12 - 01:21:13
that's up to GradeScope
这取决于GradeScope
1.21.13-1.21.19
there's a queue of other students with100 students in the class, you not gonna run right
away
它会有⼀个队列，⽐如说，我们课上总共有100名学⽣，它会按个对你们的作业进⾏测试，你没
法提交完就⽴⻢进⾏测试
01:21:19 - 01:21:23
so we provide some basic tests as a framework to figure out how to write more tests
So，我们提供了⼀些基本测试，将它们作为⼀个框架来帮你们弄清楚如何写更多的测试⽤例
01:21:23 - 01:21:28
but you should doing as much as all the development want to figure out what your
problem is to be done locally
但你应当在本地尽可能多地进⾏测试，以此来弄清楚你的问题在哪
01:21:29 - 01:21:32
and then if you find this thing timing out, because it's running too slow
如果你出现运⾏超时的情况，这是因为它的运⾏速度太慢所导致的
01:21:32 - 01:21:34
you should figure out why your system is running slow locally
你应该去弄清楚你的系统本地运⾏速度为什么这么慢
1.21.34-1.21.38
don't make a bunch of you know minor changes, and keep submitting them to great
scope ,and try to measure how long GradeScope takes
不要每改动⼀点点地⽅，你就把代码提交到GradeScope上，并试着测出GradeScope测试⼀次
所要花的时间
01:21:38 - 01:21:40
you can figure these things out locally
你可以在本地对你的系统进⾏测试
01:21:41 - 01:21:42
so we've already covered this
So，我们已经介绍过这个了
1.21.42-1.21.46
don't change any file and then once we give you
除了你提交到Gradescope上的⽂件以外，不要修改任何⽂件
01:21:46 - 01:21:49
you want to rebase over the BusTub master there's instruction Piazza how to do this
然后，你们要对最新的BusTub的master分⽀进⾏rebase操作，Piazza上有写该如何进⾏操作
01:21:49 - 01:21:51
And then come to office hours if you have questions
然后，如果你们有问题，那就在办公时间来找我
01:21:51 - 01:21:52
I always have to say this
我总是得反复提下这个
1.21.51-1.21.53
don't plagiarize
不要抄袭
1.21.53-1.21.55
we will destroy you right
不然我们会举报你抄袭
1.21.55-1.21.58
because what'll happen is if we do plagiarize new copy from other people
因为如果你抄了别⼈的作业
01:21:58 -01:21.59
University comes back to me say
学校就会来找我，并问我
1.21.59-1.22.01
hey did you tell your students not to plagiarize
你有没有告诉你的学⽣不要抄袭
1.22.01-1.22.02
and I show them the video
我就会向他们展示这段录像
1.22.02-1.22.05
and I guess here's me telling you not to plagiarize ,don't plagiarize
我会在这段录像中记录我跟你们说不要抄袭的对话
01:22:05 - 01:22:07
and that's evidence against you're screwed ,okay
我会保留这些证据，防⽌翻⻋
01:22:07 - 01:22:15
all right next class again I will be gone, yes no we go on,it's how we good
emmm，下节课我不在
01:22:15 - 01:22:20
all right we'll cover two-phase locking and that'll build upon what we talked about today
okay
我们会介绍两阶段锁，这个是建⽴在我们今天谈论的内容之上的
01:22:21 - 01:22:23
Bye guys, enjoy your Wednesday
好好享受你们的周三吧