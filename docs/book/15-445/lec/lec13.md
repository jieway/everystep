13-01
13 - Query Execution II
00:15 - 00:16
okay let's get started
Ok，孩⼉们我们开始吧
00:18 - 00:19
a lot to discuss today
今天要讨论的内容有很多
00:19 - 00:23
so again Thank You DJ drop tables for having us out today
So，感谢Drop Table为我们今天所做的⼀切
00:24 - 00:26
so you're flying out immediately after class
So，这节课上完你就要去赶⻜机了
0.26-0.27
right where are you going
你要去哪
00:28 -00:32
my boy Debbie Steve's got a hedge fund
我朋友买了⼀个对冲基⾦
00:32 - 00:34
your boy has a hedge fund
你朋友买了对冲基⾦？
00:34 - 00:38
yeah Jenny
00:38 - 00:44
blocking chain？
区块链？
00:45- 00:47
that's not sketchy yeah all right
总之，你朋友翻⻋了
00:49 - 00:51
Okay all right so that's his problem
Ok，这就是他的问题了
0.51-0.54
all right Your problems are these things
你们要⾯对的是这些问题
00:54 - 00:59
So homework three is into today at midnight
So，Homework 3今天晚上截⽌
01:00 - 01:04
The mid-term exam will be in class a week from today ,here
期中考试会在这周课上举⾏
01:04 - 01:11
Again the the end of this lecture we'll do a review of what the you know the outline was
expected of you for the midterm
然后，这节课快下课的时候，我们会复习下期中考试要考的内容
01:12 - 01:15
And then project two will be due on at mid-term on Sun Oct 20th
然后，Project 2会在10⽉20号的时候截⽌
01:17 - 01:19
Anyhow little questions about any of these things
对于这些你们有任何问题吗？
01:21 - 01:23
Okay,so let's jump into it
Ok，孩⼉们，让我们进⼊正题吧
01:24 - 01:28
So the last class we started talking about query execution
So，我们在上节课讨论了查询执⾏
01:28 - 01:33
And we said that we were gonna have these operators in our query plan
我们说过，在我们的查询计划中会有这些operator
01:33 - 01:38
And then we showed different ways to either move data from the top to the bottom,
bottom to the top
然后，我们展示了通过不同的⽅式将数据从上到下移动，或者⾃下⽽上移动
01:38 - 01:45
And then we also showed that sometimes you could send a single tuple ,you can send a
batch of tuple or all the tuples from one operators to the next
接着，我们⼜讲了，我们可以将⼀个tuple从⼀个operator传给下⼀个operator，你也可以传⼀
批tuple或者是所有的tuple
01:46 - 01:48
And so during this discussion
So，在这场讨论中
1.48-1.52
we've made this big assumption or I didn't even talk about
我们做了这个很⼤的假设，虽然我并没有讨论这个假设
1.52-1.56
you know how these operators are being executed
即，这些operator是如何执⾏的
01:56 - 1.57
We just sort of set it at a high level
我们站在⼀个⾼级层⾯来看
1.57-2.00
there's these functions that call next() to each other and they pass data around
这些函数通过互相调⽤next来传递数据
02:00 - 02:06
So now we're gonna talk about today is how is the database system actually gonna
execute these things
So，今天我们要讨论的内容就是，数据库系统是如何执⾏这些东⻄的
02:06 - 02:13
Right, what are these you know we're gonna have these workers ,they can take these
operators and and execute them and produce some result
你知道的，假设我们有⼀些worker，它们拿到这些operator，然后执⾏并⽣成⼀些结果
02:14 - 02:20
And so for the most part in last class, we just you could just assume that we were
talking about single threaded execution
So，在上节课我们将⼤部分时间花在了讨论单线程执⾏这块
so,在上节课，我们是以假设在单线程执⾏的前提下进⾏的⼤部分讨论
02:20 - 02:21
Meaning
这意味着
2.21-2.23
there was me one thread
这⾥有⼀条线程
2.23-2.24
that was gonna call next at the root
它会在根节点处调⽤next
2.24-2.25
assuming you're doing the iterator model
假设你是⽤的是iterator model
2.25-2.29
going from top down, and call next going below ,until got some data
它会⾃上⽽下去调⽤next函数，直到获取到⼀些数据
2.29-2.31
and then just you know one thread did everything
你知道的，它是⼀条线程包揽了全部⼯作
02:31 - 02:38
But as we spent a bunch of other lectures talking about we know how to build threadsafe concurrent data structures
但我们也花了⼏堂课来讨论该如何去构建线程安全的并发数据结构
2.38-2.45
where we could have multiple workers or multiple threads or processes operating or
executing these tasks for us at simultaneously
我们可以通过多线程来同时处理这些任务
02:46 - 02:52
And then at the end we you know we put combine it all together to put it into a a single
result
然后，在最后我们将这些结果合并为⼀个结果
2.52-2.56
that we hand back to the application or the terminal whoever whoever invoked the query
并将该结果返回给调⽤这个查询的应⽤程序或者terminal
02:56 - 2.57
So that's what we talked about today
So，这就是我们今天要讲的内容
2.57-3.01
talk about how do we actually execute queries in parallel
今天我们要来讲该如何并⾏执⾏这些查询
03:02 - 03:07
So it showed us to be sort of obvious why you would care about parallel execution right
So，我们为什么关⼼并⾏执⾏呢？
3.07*-3.16
in the modern era of what CPUs look like today,or GPUs for that matter as well ,like we
have a lot more cores that are available to us
不管是现代的CPU也好，还是GPU也好，它⾥⾯都有很多可⽤的Core
03:16 - 03:17
And so we want to be able take advantage of them
So，我们想去利⽤多核这⼀能⼒
03:18 - 03:20
And so the benefit were to get in a database system
So，我们想在数据库系统中利⽤这些优势
3.20-3.29
if we can support parallel execution is that we're get honestly better performance not
always, but usually is the case or you want this to be the case
So，在数据库中如果我们能⽀持并⾏执⾏这⼀能⼒，坦率地讲，我们就可以获得更好的性能，
虽然这并不是绝对，但通常情况下，我们想要的就是更好的性能
03:29 - 03:31
And this could be in terms of better throughput
更⾼的吞吐量
3.31-3.37
meaning we can run more queries per second， process more data per second，we will
get better latency
这意味着，我们每秒可以执⾏更多的查询，或者说每秒可以处理更多的数据，我们会获得更⼩的
延迟
03:37 - 03:42
Meaning the time it takes for us to execute a single query can be cut down in time
对于我们来说，这意味着单个查询所要花的执⾏时间可以变得更少
03:42 - 03:44
Because we can get in between one things in parallel
因为我们可以并⾏去执⾏这个查询
03:45 - 03:50
The other advantage of this is that we'll get also better responsiveness or availability of
the system
这样做的另⼀个好处是，我们可以获得更好的系统响应能⼒或者可⽤性
3.50-3.57
meaning you know the system will feel more lively and what and respond more quickly to
our requests
这意味着，系统能够对我们的请求进⾏更快地响应
03:58 - 04:01
Again think about remember we're talking about disk oriented database systems
要记住，我们讨论的是⾯向磁盘的数据库系统
04:01 - 04:07
Hey remember I said that anytime for all these data structures that we talked about so
far or like the table heap
要记住，对于我之前所讲过的数据结构或者table heap来说
4.074.12
anytime a query could be accessing a page, that's not in memory, it's not in the buffer
pool
在任何时候，如果⼀个查询所访问的page并不是放在内存中的，也不是放在buffer pool中的
04:12 - 04:17
And therefore it has to stall while the you know we go fetch it from disk and bring it into
our buffer pool
那么，你知道的，当我们将从磁盘中获取page，并将它放⼊我们的buffer pool中，在这期间该
查询就会停滞下来
04:18 - 04:22
So if we only had one thread executing in our system or one process for our entire
system
So，在我们整个系统中，如果我们只通过⼀条线程来执⾏查询
04:23 - 04:25
Every single time we had to touch the data from disk
因为每次我们都得从磁盘中获取数据
4.25-4.29
it would to be this long pause while we go and get the data we need
当我们去获取我们需要的数据时，这就会造成停顿很⻓⼀段时间
04:29 - 04:31
So this the system would look unresponsive
So，这个系统看起来就有点反应迟钝了
4.31-4.35
but so but allowing us to have concurrent operations or concurrent execution
但我们能够以并发的⽅式来执⾏操作
04:35 - 04:37
We can have one thread block
我们可以将⼀条线程阻塞住
4.37-4.38
because it's gathering get some a disk
因为它要从磁盘中获取数据
4.38-4.39
other threads can keep running
其他线程可以继续执⾏
4.39-4.41
and hopefully operate on what's already in memory
我们希望它们是对那些已经放在内存中的数据进⾏处理
4.41-4.43
And and still make forward progress
并且取得⼀些进展
04:45 - 04:53
And at the end of the day what this is all gonna add up to is that it's gonna reduce the
total cost of ownership or TCO of our database system
归根到底，这会减少我们数据库系统⾃身的总成本（TCO）
04:53 - 04:58
So TCO is usually how people in an enterprise world think about the cost of a database
system
So，TCO通常是⼈们在企业中⽤来考虑⼀个数据库系统成本⽅⾯的术语
04:58 - 05:02
right， It's not just like the cost of buying the machine or the cost of paying for the
software license
它指的不仅仅是购买机器，或者购买软件许可证之类的成本
5.02-5.06
it's the total cost of actually running this thing for you know for some period of time
它指的是某⼀段时间内，我们运⾏这个数据库所要花的总成本
05:06 - 05:09
So that includes the software license includes the hardware
So，这包括软件许可证和硬件
5.09-5.11
it also includes the the labor costs
这也包括⼈⼯成本
5.11-5.15
actually set up the software set up the machine, the energy costs to actually run the
servers
⽐如：软件安装费⽤，机器安装费⽤，还有运⾏服务器的电费
05:16 - 05:19
And so if we can do more work with less Hardware
So，如果我们可以以更少的硬件来做更多的⼯作
5.19-5.22
then this is going to cut this down significantly
那么TCO这个成本数字就会下降⼀⼤截
05:22 - 05:24
So this is also a big win for us as well
So，对于我们来说，这是⼀个天⼤的好处
5.24-5.27
so it means that if we buy a new machine that has a lot more cores
So，这意味着，如果我们买了⼀台有很多核的新机器
05:28 - 05:30
We want our database system would take advantage of it
我们希望我们的数据库系统能够利⽤这⼀优势
05:32 - 05:41
So the thing we need also distinguish - before we start talking about parallel situation
today, is to be able to distinguish it between distributed execution or distributed
databases
So，在我们开始今天的讨论之前，我们要能够区分数据库系统的并⾏执⾏和分布式数据库系统
的分布式执⾏之间的区别
05:42 - 05:44
So at a high level the both trying to do the same thing
So，从⼀个⾼级层⾯来讲，它们俩所试着做的都是同⼀件事情
05:45 - 5.48
So in a parallel DBMS system and distributed database system,
So，在⼀个并⾏数据库系统和分布式数据库系统中
5.48-5.52
the idea is that you have a database that's spread across multiple resources
它的思路是，我们将⼀个数据库分散到多个资源上
5.52-6.00
that allow you to have improves different characteristics of the database system, again
performance，cost latency things like that
这能让我们改善数据库系统中的不同⽅⾯，⽐如：性能，成本，延迟之类的东⻄
06:01 - 06:03
And so I'm highlighting the word resources here
So，这⾥我强调了资源（resources）这个单词
6.03-6.07
because I'm not necessarily saying that this means another machine or multi machines
我这⾥所说的并不⼀定是另⼀台机器或者多台机器
06:08 - 06:11
Right, it could be multiple CPUs ,could be multiple disks
它可以是多个CPU，也可以是多块磁盘
06:12 - 06:16
Alright, all these things are would commerce a distributed parallel DBMS system
所有这些都能⽤来提升分布式并⾏数据库系统
06:17 - 06:20
So the from the applications perspective
So，从应⽤程序的⻆度来看
6.20-6.25
like for the from the person actually you know opening the terminal, and writing a single
query ,and sending it to our database system
我们打开terminal，然后编写⼀条sql查询语句，并将它发送给我们的数据库系统
06:25 - 06:32
They should know ,shouldn't care whether we are a parallel distributed database system
or a single node database system
它们不会在意我们使⽤的是⼀个并⾏分布式数据库系统还是⼀个单机数据库系统
06:32 - 06:35
Right,again is the beauty of a declarative language of SQL
再说⼀遍，这就是SQL这种声明式语⾔的魅⼒所在
06:35 - 06:36
I write my select statement
我编写我的select语句
6.36-6.39
I don't care where where my data is actually being stored
我并不在意我的数据是存放在哪⾥的
06:39 - 06:43
I don't care whether it has to join you know move data across the network or move data
across different sockets
我不在意这⾥⾯是否有join操作，也不在意是否通过⽹络来移动数据，或在不同的socket之间移
动数据
06:44 - 06:47
Again the SQL query is is not to be thing
再说⼀遍，SQL查询语句不会去管这种事情
06:47 - 06:50
So if we have a single new database system
So，如果我们有⼀个单个数据库系统
6.50-6.53
and then we start scaling it out to make it parallel or distributed
然后，我们对其进⾏扩展，来让它做到并⾏或者分布式
06:53 - 06:59
Then we shouldn't have to go tweet we shouldn't have to go back and rewrite our
application rewrite all the SQL statements, everything should still just work
我们不需要回过头去重写我们的应⽤程序以及所有的SQL语句，所有的东⻄都应该能够正常⼯作
07:00 - 07:02
So that's the ultimate goal what we're trying to do here
So，这就是我们所尝试达到的终极⽬标
7.02-7.07
again having the disk connection or the abstraction layer of the logical versus the
physical
我们连接的磁盘可能是⼀个逻辑抽象层，这个逻辑抽象层可能是由很多物理硬盘所组成(知秋
注：⽐如底层连接的是分布式存储系统，对外看起来就是⼀块硬盘，我们的dbms程序跑在上层)
07:07 - 07:11
We can move the physical stuff around as needed ,and the logical part doesn't change
我们可以根据需要去对物理层⾯的东⻄进⾏改动，但逻辑部分则不需要变
07:12 - 07:14
And that's and it seems sort of obvious right now to us
对我们来说，这点显⽽易⻅，理当如此
7.14-7.19
but like that was a big deal actually, it's a big deal with inner SQL systems a few years
ago as well
但实际上，对于若⼲年前的SQL系统来说，这也是个⼤问题
07:19 - 07:21
But it's big deal in the 1970s
但在1970年代来说，这是个⼤问题
07:23 - 07:26
All right, so the difference between a distributed and a Parallel of database is the
following
分布式DBMS和并⾏DBMS的区别如下
07:26 - 07:29
So this is my definition, I don't know what the textbook says
So，这是我对它们的定义，我不清楚教科书上是怎么说的
07:29 - 07:31
But to me this makes the most sense
但对我来说，这样的解释就很到位
7.31-7.35
and this sort of follows along with what's in the academic literature
这些定义和学术⽂献中所给出的定义相符
07:35 - 07:39
The term parallel vs distributed is usually the terms are often mixed together
并⾏和分布式这两个术语通常混在⼀起使⽤
07:40 - 07:44
But for the most part people mean, most people have these kind of systems, but a lot of
systems are still distributed
但对于⼤多数⼈⽽⾔，他们所使⽤的就是分布式DBMS
07:46 - 07:53
So parallel DBMS is one where the the resources that are available to us in the system
are going to be physically close to each other
So，并⾏型DBMS指的是，在⼀个系统中，它的可⽤资源在物理意义上是彼此相邻的
07:53 - 07:59
Right, think of like a single rack unit machine, that has two CPU sockets
⽐如，⼀个机架上的机器，它上⾯有两个CPU socket
08:00 - 08:04
Right, so the CPU sockets are have the core execute queries for us
So，我们可以往CPU插槽中插⼊CPU，通过其中的多核来为我们执⾏查询
8.04-8.05
those things are really close together
这些资源彼此之间距离都很相近
8.05-8.09
because they're going over our really fast and high bandwidth interconnect
因为它们的速度真的很快，并且我们通过内部的⾼速总线来进⾏通信
08:09 - 08:11
So that's how the resources are gonna communicate with each other
So，这就是资源（cpu 内存 硬盘）间彼此通信的⽅式
08:12 - 08:15
Again whether it's CPU what's compute or storage It doesn't matter for now
再说⼀遍，我们现在不在意CPU是什么，也不在意⽤的是什么存储设备
08:17 - 08:20
And then the thing that matters the most for this discussion today
对于今天这场讨论来说，最为重要的地⽅在于
8.20-8.24
is that we are going to assume that the communication between these different
resources
假设我们在不同的资源间进⾏通信
8.24-8.27
it`s gonna be not only fast and cheap to do
我们不仅要做到速度快，成本低
08:28 - 08:28
But also reliable
我们还得做到可靠
8.28-8.33
meaning if I send a message from one CPU socket to another CPU socket
这意味着，如果我将⼀条信息从⼀个CPU socket发送到另⼀个CPU socket
8.33-8.35
it's not gonna get dropped
它不会丢失
08:35 - 08:39
Right because that means like I'm losing cache traffic on my interconnect
因为如果在内部通信时缓存数据丢失了
08:39 - 08:44
And I have a whole bunch of other problems then just losing database messages, like the
whole system is falling apart ,all right
那么我们就会产⽣⼀⼤堆的问题，⽐如因为数据库消息的丢失⽽导致整个系统看起来像崩溃⼀样
08:45 - 08:49
In a distributed DBMS ,the resources can be far from each other
在⼀个分布式DBMS中，资源间的距离可以很远
08:50 - 08:51
So that could either mean
So，这意味着
8.51-8.53
like different machines in the same rack
⽐如说：同⼀机架上的不同机器
8.53-8.54
different machines in the same data center
同⼀数据中⼼的不同机器
8.54-8.56
or different machines of different parts of the world
或者不同地区的不同机器
08:56 - 08:59
Right,East Coast versus West Coast data centers in the in the US
⽐如，⼀台机器在美国的东海岸，另⼀台机器在美国的⻄海岸
09:00 - 09:03
And therefore the in order to communicate between different resources
因此，为了做到让不同的资源能够彼此间进⾏通信
9.03-9.05
we have to go through a slower communication channel
我们就得使⽤⼀个速度⽐较慢的通信信道
9.05-9.08
like the public wide area network
⽐如，公共⼴域⽹
09:08 - 09:12
And where is this thing can be like interconnects between CPU sockets which is way
faster
这也可以是CPU socket之间的通信，这样做速度更快
从某种意义上来讲，这有点类似于CPU socket之间的通信，只不过后者速度更快
09:13 - 09:17
And therefore because we're going over this unreliable interconnect
因为这⾥我们使⽤的是不可靠的互连⽅式（知秋注：基于⽹络协议进⾏的通信）
09:19 - 09:25
We can't assume that our old messages are gonna show up really quickly and show up in
the right order that we expect them to or you show up at all
我们不能确保我们已经发送的信息能够按照我们所期待的顺序快速展示在⼈们的⾯前
09:26 - 09:32
So there's a whole bunch of other hard problems we have to deal with ,when we talk
about distributed DBMS at the end the semesters
当我们在学期末讨论分布式DBMS的时候，我们还得去处理⼀⼤堆其他的难题
09:32 - 09:36
So we're gonna ignore all that for now, and we're going to focus on parallel DBMSs
So，现在我们先将这些问题放在⼀边，我们先专注于并⾏DBMS
09:37 - 09:44
And for this you can just assume, that it's a it's a machine that has a bunch of sockets a
bunch of cores that can all operate at the same time
对此，你可以假设，这⾥有⼀台机器，上⾯有⼀⼤堆插槽，可以插⼀⼤堆CPU，它们可以在同
⼀时间执⾏任务
09:45 - 09:49
I may be talking also to the same disk that's local bot that's local to it
我可能会和同⼀个磁盘进⾏通信，对于该机器来说，它是个本地磁盘
09:49 - 09:49
Okay
09:51 - 09:51
All right
09:53 - 09:55
So today we're first talk about the the process model
So，今天我们⾸先要来讲下进程模型
09:56 - 10:00
This is how we're gonna organize the system to order to actually have workers to
execute our queries
这实际上是我们通过组织系统来让worker去执⾏查询的⽅式
10:01 - 10:05
And then we'll talk about how we actually support parallel execution for our query plans
然后，我们会去讨论该如何⽀持我们的查询计划做到并⾏执⾏
10:06 - 10:09
And then we'll talk about alternative parallelism IO parallelism
然后，我们会去讨论另⼀种parallelism，即I/O parallelism
10:10 - 10:13
I deserted the existing compute versus storage between these two guys
这两者之间会存在着计算和存储的⼯作
10.13-10.20
then as I said we'll finish up at the end talking doing a quick review on what's expected
in the midterm
接着，正如我刚才所说的，在这节课最后我们会去复习下我们期中考试要出现的东⻄
10:20 - 10:20
Ok
10:22 - 10:32 ！！！！！！
Yeah, right so the DBMS`s process model is how we're gonna organize or architect the
system to have multiple workers running concurrent requests
So，DBMS中的进程模型其实就是我们如何组织系统来通过多个worker来处理并发请求的⽅式
10:33 - 10:35
And the reason we have to do this is
我们之所以这样做的原因是
10.35-10.41
,because we could either have an application send really big requests, that we want to
split up across multiple workers
因为我们可能会遇上这种情况，即⼀个应⽤程序发送了⼀个很⼤的请求给我们的数据库系统，我
们想将这个请求分散给多个worker去处理
10:41 - 10:47
Or we could have the application to send multiple requests at the same time, that again
we want to divide up across the different workers
或者它同⼀时间发送了多个请求给我们，我们想将这些请求交给不同的worker去处理
10:47 - 10:49
So in the case of OLTP
So，在OLTP中
10.49-10.52
it's gonna be a bunch of small requests
我们可能会收到⼀堆⼩请求
10.52-10.53
so we want to be run those in parallel
So，我们想并⾏处理这些请求
10:54 - 10.54
In OLAP
在OLAP中
10.54-10.58
it's it's traditionally you know a small number of requests
⼀般来讲，我们收到的请求数较少
10.58-11.01
but those requests then we want to break up and run in parallel at the same time
但我们想将这些请求拆开，以并⾏的⽅式去同时处理这些请求
11:01 - 11:04
So we'll talk about the distinction of this type of parallelism later on
So，我们之后会讨论这种并⾏性间的区别
11.04-11.06
that's the general idea
这是⼀种常⻅思想
11.06-11.09
we want to take requests and run them across multiple workers
我们想拿到请求，然后通过多个worker对它们进⾏处理
11:09 - 11:19
And so I'm using the term worker just a means some component of the System,that's
able to take tasks that some other part decision is telling to do
So，这⾥我使⽤worker这个术语的意思是，DBMS中的某个组件，它能够拿到任务并处理
11.19-11.21
like the network layer gets a request
⽐如，⽹络层可以拿到⼀个请求
11:22 - 11:24
We run it through the query optimizer
我们将它放⼊查询优化器中执⾏
11.24-11.24
and now we have a query plan
现在，我们就拿到了⼀个查询计划
11.24-11.31
and the query plan is a task that we want to hand off to a worker or workers, and have
them execute this thing
查询计划就是⼀个任务，我们想将它交给⼀个worker或多个worker，让它们去执⾏这个查询计
划
11:31 - 11:32
So the reason why I'm using the term worker
So，我这⾥使⽤worker这个术语的原因是
11.32-11.34
because it could be a process, it could be a thread
因为它可以是⼀个进程，也可以是⼀个线程
11:35 - 11:39
I we could be either in, but I love the basic idea is still the same
可以是其中任意⼀个，但它们的基本思想是相同的
11:39 - 11:44
And the workers traditionally responsible for a given task
按传统来讲，worker是负责处理⼀个给定任务的
11:44 - 11:49
there's something that would hand it off back to the application ,and say you know
here's the result of the query you executed
当它执⾏完任务后，会将结果返回给应⽤程序，并说，这就是你执⾏查询所得到的结果
11:51 - 11:53
So there's three process models we could have
So，这⾥我们可以使⽤三种进程模型
11:54 -11:57
Yes yes
请问
11:57 - 11:59
You see question is can we say a workers a thread ,yes
他的问题是，我们能将worker说成线程吗？没错可以
12:00 - 12:04
Workers gonna be either a process or a thread ,dependent process model you use, yes
Worker既可以是⼀个进程，也可以是⼀条线程，这取决于你使⽤的进程模型，请问
12:08 - 12:12
This question to the application necessarily mean you need abilities or no, could be
他的这个问题对于你去理解这个应⽤程序⽽⾔是很有必要的
12:13 - 12:14
but for OLTP, yes
但对于OLTP来说，是这样的
12:15 - 12:18
I think of like I have a web page ,I have multiple users accessing a web page
假设我有⼀个⽹⻚，我有多个⽤户要去访问这个⽹⻚
12.18-12.24
every single page load is gonna fire off a bunch of code on the server side like PHP,
JavaScript, Python
每次加载⻚⾯时，这都会触发服务端的⼀堆代码，⽐如Php，JavaScript还有Python
12:24 - 12:31
And that code is gonna do a bunch of requests to get data from the database, and then
render the HTML back to you
这些代码将会发起⼀堆请求来从数据库中获取数据，然后将渲染后的html返回给我们
12:31 - 12:33
So I'm having multiple users accessing my web page
So，我有多个⽤户正在访问我的⽹⻚
12.33-12.36
each of those are then flying off this code, and then fire off different requests
他们每个⼈都会触发这些代码，然后就会向服务器发起不同的请求
12:37 - 12:42
Or it could be like a single dashboard or analytical application
或者，这可能是⼀个dashboard或者分析型应⽤程序
12.42-12.45
where it's one user submitting much of queries you know at one at a time
⼀个⽤户会⼀次提交多个查询
12:45 - 12:48
But then we want to run those in parallel to be either one
但我们想并⾏执⾏这些查询
12:51 - 12:55
So there's three different process models we could have in our in our database system
So，在我们的数据库系统中，我们可以使⽤三种不同的进程模型
12:55 - 12:57
The first is that we'll have a single process per worker
第⼀种处理模型是Process per DBMS Worker，⼀个进程就是⼀个worker
12.57- 12.59
then we have could have a process pool
接着，我们也可以使⽤Process Pool
13:00 - 13:04
And then the spoiler be that the most common one is the last one here at least, in newer
systems
然后，在⼀些新系统中最常⽤的就是最后⼀种处理模型，即Thread per DBMS Worker
13.04-13.08
we're actually a multi-threaded system we have multiple one thread per worker
实际上，我们使⽤的是⼀个多线程系统，⼀个线程就是⼀个worker
13:08 - 13:10
So we'll go through each of these examples one by one
So，我们会逐⼀介绍这些⽅案
13:12 - 13:16
So the process per worker is sort of the most basic one approach
So，Process per worker是⼀种最基本的⽅案
13.16-13.22
where we're going to have a single worker be represented by a single OS process
我们使⽤单个OS进程来作为⼀个worker使⽤
13:22 - 13:24
So what happens is
So，这⾥所发⽣的事情是
13.24-13.28
your application sends a request to say, hey I want to execute a query and open the
connection to the database system
你的应⽤程序发送了⼀个请求，并说：Hey，我想要执⾏这个查询，请打开与数据库系统的连接
13:28 - 13:32
And some centralized coordinator a dispatcher that gets that initial request
中⼼调度器会得到这个初始请求
13:32 - 13:35
And then can fork off now a worker
然后fork出⼀个进程作为worker对它进⾏处理
13.35-13.41
which is gonna get as a separate process ,that is gonna be responsible for handling this
connection
这⾥我们通过⼀个单独的进程来处理这个连接
13:41 - 13:46
So now the what happens as the dispatcher says ,all right I got you a worker ,here's the
port number where you can go communicate with with
So，dispatcher就会说，这⾥有⼀个worker，你可以通过这个端⼝号和它进⾏通信
13:47 - 13:50
And then now the the application only communicates directly with the worker
现在，应⽤程序只需要和worker直接通信就可以了
13.50-13.56
and the worker is responsible for doing whatever you know executing whatever request
that the query wants
worker⽤来负责执⾏你想执⾏的任何查询请求
13:56 - 13.56
All right
13.56-14.04
so the issues gonna be is that we have multiple workers ,there to be separate processes
So，这⾥的问题是我们有多个worker，这⾥是多个单独的进程
14:05 - 14:08
And now they again assuming we're a disk-oriented system
假设我们使⽤的是⼀个⾯向磁盘的数据库系统
14.08-14.13
now that could be having in their own buffer pool ,and going fetching pages from disk
and bringing them to memory
它有它⾃⼰的buffer pool，它会从磁盘中拿到page，并将这些page放⼊内存
14:13 - 14:19
But of course now we don't want to have multiple copies of the same page in these
separate processes
Of course，我们不希望在这些单独的进程中使⽤同⼀个page的多个副本
Of course，我们不希望在这些进程中的每⼀个上都有同⼀个page的副本（知秋注：即同⼀个
page会有多个副本在多个进程中）
14:19 - 14:21
Because now we have to like query across them
因为我们现在得在它们上⾯执⾏查询
14.21-14.24
and that's gonna be expensive， if you're the send messages back and forth
如果你来回发送消息，那么这样成本就会很⾼
14:24 - 14:26
And that's just sort of wasting memory
这样就是在浪费内存
14.26-14.27
because we're going up again we've done two copies of things
因为我们已经有该page的两份副本了
14:28 - 14:30
So the way to get around there that issue is
So，解决这个问题的⽅式是
14.30-14.32
that every you can use shared memory
你可以去使⽤共享内存
14.32-14.37 ******
that it can allow these different processes that normally have their own separate address
spaces in memory
它可以允许这些不同的进程在内存中通常具有各⾃独⽴的地址空间
14:37 - 14:39
A lot of them share access to these global data structures
很多进程可以对这些全局数据结构进⾏共享
14:40 -14:42
Right, and the OS is what facilitates that
OS可以帮我们做到这点
14:44 - 14:48
So the the one advantage you can also get from this approach
So，我们能从这个⽅案中所获得的⼀个优势是
14:48 - 14:51
If you are worried about the resiliency of your system is that
如果你担⼼你系统的可承受性（resiliency）
14.51-14.55
,if you have a bug in your worker code ,and it crashes
如果你在你的worker代码中有⼀个bug，然后这个worker崩溃了
14.55-14.57
it doesn't end up taking down the whole system
它并不会导致整个系统发⽣崩溃
14:58 - 14.59
Because just this one process crashed
因为只是这个进程崩溃了
14.59-15.02
like the OS knows it was forked off from the dispatcher
OS知道，这个进程是从dispatcher那⾥fork出来的
15:03 - 15:06
But it doesn't take down the whole system, if there's one guy fails
但这并不会导致整个系统崩溃（如果其中⼀个进程崩溃的话）
15:07 - 15:16
Yes yes
请讲
15:18 - 15:23
Right, so shared memory is a do they cover that in 15-513 /213 or no ,yeah okay
你们在15-213/513中有学过共享内存吗？好了，我知道了
15:24 - 15:26
So shared memory is a contract the operating system provides
So，共享内存是操作系统所提供的⼀个合约
15.26-15.29
that says here's some region of memory
⽐如，这⾥有⼀段内存区域
15:29 - 15:31
So normally when I call malloc in my process
So，通常情况下，我会在我的进程中调⽤malloc
15.31-15.35
that is my that's in my private address space, only I can read/write to that memory
这是我⾃⼰所私有的⼀块内存空间，只有我可以对这块内存进⾏读写
15:35 - 15:36
With shared memory
如果是共享内存
15.36-15.38
you tell the OS hey malloc me a bunch of space
我们会告诉OS，请给我分配⼀些内存空间
15:39 - 15:43
And then anybody in that shared memory group that has permissions is allowed to also
read and write to as well
在共享内存组中的⽤户有权去对这块共享内存进⾏读写
15:44 - 15:46
Right, normally the OS would not let you do, that
通常情况下，OS不会让你这么做
15.46-
that's it's one of the protections of the OS provides
这是OS所提供的⼀种保护
15:48 - 15:51
But this is allows you to now have a block of memory to be shared across multiple
processes
但这允许你将⼀块内存共享给多个进程
15:52 - 15:57
So if unless I have shared memory, then every single worker is gonna have its own buffer
pool
So，除⾮我使⽤共享内存，不然每个worker都会有它⾃⼰的buffer pool
15:57 - 15.58
And it's gonna bring in pages
它会将page放⼊它⾃⼰的buffer pool中
15.58-16.03
that are just be copied in other worker pools or other workers that they are bringing in
the same pages
其他的worker中的buffer pool中也有该page的副本，这些worker放⼊⾃⼰buffer pool中的
page是同⼀个page
16:05 - 16:09
So this approach is used in and pretty much every old database system
So，基本每个很⽼的数据库系统都使⽤了这种⽅案
16:09 - 16:16
Every Database system in bed with made in the 1970s 1980s, maybe early 1990s is
using this approach
所有1970,1980甚⾄1990年代早期的数据库系统都使⽤了这种⽅案
16:16 - 16:18
Anybody take a guess why
你们来猜下这是为什么
16:20 - 16:22
Why would you process these ever threads
为什么它们使⽤的是进程⽽不是线程
16:27 - 16:29
He says maybe there's no thread yet ,very close
他说那时候还没有线程，答案⾮常接近
16:30 - 16:34
So there were threads back then not as good as we have one tab now
So，那时候有线程，但是和我们现在的线程没法⽐
16:34 - 16:36
But there was no standard thread API
那时候没有标准的Thread API
16.36-16.40
discipline like this like 1980s before POSIX before P threads
这其实就是1980年代，POSIX和pthread推出之前是这样的
16:41 - 16:45
Right, so they had all these different variants of UNIX all these different various of
operating systems
So，他们那时候有各种Unix的变种，各种各样的操作系统
16:45 - 16:46
So if I have my database system
So，如果我有⼀个数据库系统
16.46-16.50
and I wanted to have it run on alt you know own backs and all these other OS's
并且我想在所有系统上都可以运⾏我这个数据库系统
16:51 - 16:57
I had to rewrite my database system to use the threading API for all those different
operating systems
那我就得通过所有这些不同的操作系统中thread API来重写我的数据库系统
16:57 - 17:01
Now with pthreads and sort of Linux being the the dominant UNIX variant that everyone
uses
现在，通过使⽤pthread，Linux就占据了主导地位，它是Unix的⼀个变体，每个⼈都使⽤它
17:02 - 17:03
That's good enough for everyone
对于每个⼈来说，这就⾜够了
17:04 - 17:06
So back in the day it wasn't like we have now
So，那个年代和我们现在不同
17.06-17.09
everyone had their own threading package and it wasn't a standard API, and we have to
rewrite everything
那个时候，每个⼈都有⼀套他们⾃⼰的Thread包，它并不是⼀个标准API，我们得重写所有东⻄
17:09 - 17:11
So but everyone had fork ,and join
但每个⼈都有fork和join
17:11 - 17:14
Right now was the basic operating system primitives
这是操作系统所提供的基本原语
17:15 - 17:19
So if you built a database system using this process model
So，如果你使⽤这种进程模型来构建⼀个数据库系统
17.19-17.21
then it would work pretty much everywhere
那么它能在各种地⽅运⾏
17:24 - 17:26
So a extension of this it's called the process pool
So，对此，它有⼀个扩展版本，我们叫它Process Pool
17:27 - 17:28
So in this case here
So，在这个例⼦中
17.28-17.30
we're still working our processes
我们依然使⽤进程来作为worker使⽤
17.30-17.31
but the idea is that
但这⾥的思路是
17.31-17.35
instead of forking off a process for every single connection that comes along
这⾥我们不会为进来的每个连接去创建⼀个进程
17:35 - 17:38
We just have a bunch of workers that are sitting around
这⾥我们会有⼀个Process Pool，⾥⾯放了⼀堆worker
17.38-17.42
and our dispatcher can sit can pick one of them say ,all right now you're in charge of
executing this query
我们的dispatcher就会从中选⼀个worker出来，并说，你去执⾏这个查询吧
17:43 - 17:45
And then what you can now also do
然后，你还能做什么呢？
17.45-17.46
because you have a pool
因为我们有⼀个process pool
17.46-17.49
and you're aware that there's other processes around, they help you to do work
我们会意识到，这⾥⾯还有其他的进程存在，它们可以帮我们来执⾏任务
17:50 - 17:54
Now you can actually do some get some query parallelism
实际上，现在我们就可以做到并⾏执⾏查询
17.54-17.55
because now you can say
因为，现在你可以这样说
17.55-17.56
well I need to execute this Query
Well，我需要去执⾏这个查询
17.56-17.58
and it's gonna take too much work for me to do
但对我来说，这个查询要做的⼯作太多了
17:58 - 18:01
So maybe I'll give half of the work to another process, and let it let it run
So，我想将⼀半的⼯作量交给另⼀个进程，让它去处理这部分
18:02 - 18:07
Right, when the single process model for per worker in the last slide
在上⼀张幻灯⽚⾥的Process per worker处理模型中
18:07 - 18:09
You're not aware of what else is running
你不会意识到有没有其他的进程在运⾏
18.09-18.12
and you want to fork you know a process while you're running as well
当你在执⾏任务的时候，你会想去fork
18.12-18.13
because that's gonna be expensive
因为这样做的话，代价会很⾼
18:13 - 18:16
whereas this guy has things around that reliably reuse
于是我们就会思考下，能否⽐较合理地复⽤这个进程
18:17 - 18:19
so yes
请问
18:25 - 18:25
so his question is
So，他的问题是
18.25*-18.28
like what is the database system
什么是数据库系统
18.28-18.33
database system would be sort of everything over here, all of this
数据库系统其实就是由这边所有东⻄所组成的
18:33 - 18:34
this is the application
这个是应⽤程序
18.34-18.39
this is like this is like your website, this is whatever you know that's application that talks
to the database
就好⽐说，你的⽹站，或者是其他和数据库进⾏通信的应⽤程序
18:39 - 18:40
so this is sending SQL queries
So，这⾥是在发送SQL查询
18.40-18.42
and the dispatcher is the one we're handing with them all
dispatcher则是⽤来处理它们的
18:42 - 18:44
Yes, thinking that there's a division line here
你可以想象这⾥有条分割线
18:45 - 18:47
that says everything over the side of the database system
分割线右侧的东⻄就都是数据库系统⽅⾯的东⻄
18:47 - 18:53
so the important thing about this though in the case of this slide and the previous slide
So，这张幻灯⽚和前⼀张幻灯⽚中重要的事情是
18.53-18.56
these are again these are full fledge OS processes
这些都是功能完备的OS进程
13-02
18:56 - 18:59
so we're not doing any scheduling ourselves in the database system
So，我们不会在数据库系统中进⾏任何调度操作
18:59 - 19:01
the OS is responsible for doing all that scheduling
OS负责进⾏调度
19:02 - 19:04
now we can give it nice flag，thats a priority flag
Now，我们可以给它⼀个优先级标志位
19.04-19.08
and try to say this one is should get higher priority or more runtime than the other
process
我们会试着说，这个进程的优先级应该⽐其他进程更⾼
19:08 - 19:11
but at high level we can't control what gets scheduled
但从⾼级层⾯来讲，我们⽆法控制调度的东⻄是什么
19:11 - 19:13
right so once we hand off the work it just runs
So，⼀旦我们提交了任务，它就会开始执⾏
19.13-19.14
Yes
请问
19:17 - 19:18
this question
他的问题是
19.18-19.24
do you have idea where you have more than one worker pool no, you just have one
我们是否有多个worker pool？No，你只有⼀个
19:24 - 19:25
Correct
没错
19.25-19.27
and your question is you have a fix of our processes in the worker pool, yes
你的问题是，我们的worker pool的进程数量是不是固定的，没错
19:27 - 19:33
so this is something you would define when you turn on the database system you say
how many worker processes I may have
这是你在运⾏数据库系统时定义的东⻄，你可以去指定你想使⽤的worker进程数量
19:34 - 19:38
Because it is full forever
如果这些进程都被占满了（知秋注：池中的进程消耗完毕）
19.36-19.38
if we have connections in and then the system get overwhelmed
此时如果我们有连接进来的话，那么系统就会不堪重负
19:39 - 19:40
and then typically what you do is
⼀般情况下，你要做的事情是
19.40-19.46
you always have one in real systems you always have one worker be like the special
worker
在⼀个真正的数据库系统下，你始终会将⼀个worker作为⼀个特殊worker
19:47 - 19:49
So that if you get the system gets locked up
So，如果这个系统被锁住了
19.49-19.53
there's always one worker that can take a incoming request from the administrative
account
那么始终有⼀个worker可以拿到来⾃管理员账户所传⼊的请求
19:53 - 19:55
so they can start killing things and clean things up
So，它们就可以去⼲掉并清理某些东⻄
19:58 - 20:00
He says what does the process deal with how many work to do
他问的是，⼀个进程要处理多少任务
20.03-20.04
it sits and just waits, right
它只需要呆在那⾥等待执⾏任务就⾏
20:04 - 20:13
And actually this is um, we actually talked about this in our developer meeting yesterday
for the database what we're building
实际上，在昨天的开发讨论会上，我们在讨论我们构建的数据库系统时讲到过这个
20:14 - 20:16
in our old system we were building at CMU
在我们以前在CMU所构建的⽼数据库系统中
20:17 - 20:19
we had this issue before we threw all the code away
在我们抛弃所有⽼代码前，我们确实有这个问题
20.19-20.20
in the old system
在⽼系统中
20.21-20.23
if there was no work to do
如果没有⼯作要做的话
20.22-20.24
our CPU would still spin to like 60%
我们的CPU占⽤率始终在60%左右
20.24-20.26
like this is doing useless stuff it's pulling on something
这样就是在做些⽆⽤功
20:26 - 20:32
ideally you want this like if there's no work to do you want the the CPU utilization to be
like 1% 2%
理想情况下，如果没有⼯作要做，我们想让CPU的利⽤率变成1%或者2%之类的
20:34 - 20:36
and for one system I use for all the demos
对于我⽤来给你们做demo演示⽤的数据库系统来说
20.36-20.42
I'm running like SQL server, I'm running a MongoDB, I'm running Postgres MySQL
MariaDB,
我⽤过SQL server，MongoDB，PostgreSQL，MySQL，MariaDB这些系统
20.42-20.47
and you don't you know some of them like the CPU spikes are like 10% when there's
doing nothing
你知道的，当它们啥事也不⼲的时候，它们的CPU峰值也就10%
20:47 - 20:48
most of the ones are like running at 1%
其中⼤部分数据库系统的CPU占⽤率也就1%
20:48 - 20:50
so it's still doing something
So，它们依然在做⼀些事情
20.50-20.52
just because it's checking say hey is there work for me to do
因为它正在进⾏⼀些检查，并说：Hey，这⾥我有⼀些⼯作要做
20:52 - 20:54
but you don't want to burn cycles
但你不想去耗尽CPU时钟周期
但你不想将CPU使⽤率变得很⾼
20:56 - 20:56
yes
请问
21:01 - 21:05
Yes His question is do some do some worker pool to use work stealing
它的问题是，某些worker pool会具备work-stealing（⼯作窃取）的能⼒吗
21:08 - 21:14
in the high-end systems typically what happens is, I should make us laugh at us
在⾼端系统中，通常会发⽣的事情是，emmmmm
21:14 - 21:19
At high-end system like the dispatcher or the coordinator, it knows who's doing what
work
在⾼端的数据库系统中，dispatcher或coordinator知道谁要去⼲哪些⼯作
21:19 - 21:22
so if it can on the fly recognize
So，如果它在运⾏时能够意识到
21.22-21.25
oh this one worker is maybe, it's taking a long time to read a bunch of data ,
Oh，这个worker读取这堆数据花了太⻓时间
21.25-21.28
and it has a bunch of stuff in the queue and he needs to process
这还有⼀堆它需要处理的⼯作积压在它的队列中
21:28 - 21:30
So maybe I'll take it to work out and hand it to somebody else
So，我可能就会从它⼿上拿⾛⼀些⼯作，交给其他⼈去处理
21:30 - 21:32
yeah the high-end systems can do that
⾼端的数据库系统是可以做到这点的
21:34 - 21:35
all right
=============
21.35-21.43
so this is the approach that use this use an IBM db2 Postgres switch to this model in
2015
So，IBM的DB2使⽤了这个⽅案（process pool），PostgreSQL则是在2015年时才切换到这个
处理模型
21.43-21.44
is going back to previous slide here, right
回到上⼀张幻灯⽚
21:45 - 21:51
again Postgres Oracle and and and DB2 these are all older systems like from the 1980s
and 70s
PostgreSQL，Oracle以及DB2这些都是很⽼的数据库系统，它们是在1980年代和1970年代出
现的
21:52 - 21:56
I think Sybase and the formics might also work this way again also from the 1980s
我觉得Sybase和另⼀个数据库系统从1980年代开始，使⽤的也是这种处理模型
21:58 - 22:01
most of the modern systems do the last approach was the multi-threading one
⼤多数现代数据库系统则会使⽤最后⼀种⽅案，也就是多线程的这个，即⼀个线程就是⼀个
worker
22:02 - 22:04
and so the basic idea is now is
So，它的基本思想是
22.04-22.08
that we just instead of having a bunch of processes, that are all doing different different
tasks
我们不再使⽤⼀堆进程来处理不同⼯作
22:08 - 22:12
we just have one process for the database system, and inside it it has its own threads
我们会使⽤⼀个进程来运⾏数据库系统，在进程⾥⾯，它有它⾃⼰的线程
22:12 - 22:15
and they can decide how to dispatch things as needed
它们可以根据需要去对任务进⾏调度
22:16 - 22:21
Like again this is just using pthreads ,or whatever the the same thing as in Windows
它们使⽤pthread或者使⽤了windows平台下和pthread相同的东⻄
22:22 - 22:27
so the in this environment what's gonna happen now is that
So，在这种情况下所要发⽣的事情是
22.27-22.32
because we now we have full control over what is, we know what the tasks are, we know
what threads we have
因为在这种情况下，我们完全占据了主导权，我们知道这些任务是什么，我们也知道我们能使⽤
哪些线程
22:33 - 22:34
we can now do a better job
使⽤这种处理模型，我们可以处理得更好
22.34-22.42
and have an easier understanding or a global view of what all the thread are different
doing or doing what are the tasks are available to us
我们也就能更好地理解这些线程在做哪些不同的⼯作，或者我们能去处理哪些⼯作
22:42 - 22:45
and then we now make scheduling decisions on individual threads
那么我们就可以对多个线程上进⾏任务的调度
22:45 -22:46
run the process model
使⽤这种进程模型
22.46-22.50
we're sort of giving stuff up to the OS and let OS figure things out
我们会将东⻄交给OS，让OS帮我们弄清楚该怎么做（知秋注：线程执⾏的背后有很多条条道
道，这些都是交由OS⾃⼰去扛吧）
22:51 - 22:56
so in my opinion the the multi-threaded model is the way to go
So，在我的观念中，这种多线程模型才是正确的做法
22:57 - 22.58
It just from an engineering standpoint
从⼀名⼯程师的⻆度来讲
22.58-23.00
this is easier to handle
这样处理起来更加容易
23.00-23.06
because not you're not dealing with this all these OS semantics for shared memory or
dealing with process management
因为你不⽤去管OS中的共享内存或者进程管理之类的东⻄
23:07 - 23:12
The overhead I'm also doing a context switch in this in a multi-threaded environment is
much lower
我在这种多线程环境下所做的上下⽂切换带来的开销会更低
23:12 - 23:16
if you still pay a penalty when the OS switches from one thread to the next ,and then the
same process
在同⼀个进程中，当OS从⼀个线程切换到另⼀个线程时，你依然得⽀付⼀定代价
23:16 - 23:22
But it's not as heavyweight as in a in a gun from one process to another process
但这要⽐进程间的切换轻得多
23:22 - 23:30
because of all the security and protection mechanisms they need to have in memory
representation or in memory storage of the process
因为进程使⽤的是OS所提供的共享内存空间，我们很难做到保护（知秋注：⼀个进程下的多个
线程共享的是该进程内部所管理的空间）
23:30 - 23:33
so in a I can't prove this scientifically
So，我⽆法科学地证明这⼀点
23.33-23.37
but in general a multi-threaded process will be where a DBMS will be faster than a multiprocess one
但总之，在DBMS中使⽤多线程来执⾏任务要⽐使⽤进程速度更快
23:39 - 23:41
so the thing to point out though is
So，这⾥要指出的是
23.41-23.45 ！！！！！！！
just because we're going to a multi-threaded process model approach
因为这⾥我们要去使⽤多线程进程模型这种⽅案
23:45 - 23:49
does not mean we're gonna get automatically parallel query execution
这并不意味着，我们能够⾃动并⾏执⾏查询
23:50 - 23:52
in particular we may not necessarily get intra-query parallelism
我们可能也不⼀定要做到intra-query parallelism
23.52-23.54
which I'll talk about that in a few more slides
我会在接下来⼏张幻灯⽚中对此进⾏讨论
23.54-24.00
meaning like there is no guarantee that even though our DBMS can run with multiple
threads
这意味着它并不保证我们DBMS内部的任务⼀定可以使⽤多线程来处理
24:00 - 24:01
if I give it a single query
如果我让它去执⾏⼀个查询
24.01-24.04
it can't break that query up across multiple threads that run all those in parallel
它⽆法将这个查询进⾏拆分来让多个线程并⾏执⾏这些任务
24:05 - 24:08
so MySQL 5.7 is a multi-threaded database system
So， MySQL 5.7是⼀个多线程数据库系统
24:09 - 24:10
but it can't do intra-query parallelism
但它没法做到intra-query parallelism
24:11 - 24:14
This might been fixed in 8 I forgot the check before today
这点可能在MySQL 8中已经修复，我上课前忘记去确认这点
24:15 -24:15
alright
24:16 - 24:20
and for me like my understanding what's out there in a database world
从我的理解来说，数据库世界中有什么东⻄呢
24:21 - 24:29
there's no database system that I'm aware of that's been built in the last ten years either
from an academic standpoint or from a commercial like a startup enterprise system
就我所知道的，⽆论是学术⻆度，还是初创企业的数据库系统，在这过去的⼗年间，并没有任何
新的数据库系统使⽤这种多进程处理模型
24:30 - 24:32
there's no system that I'm aware of that's gone to the multi-process model unless
they're using a fork up Postgres
就我所知道的，没有系统使⽤了这种多进程模型，除⾮他们fork的是PostgreSQL，使⽤
PostgreSQL魔改出来的系统
24:33 - 24:38
which is up to a very common approach that everyone does
多线程处理模型这种⽅案是⼀种很常⻅的⽅案，每个⼈都会去使⽤它
24:39 - 24:44
like there's a lot of database systems ,but they'll take Postgres BSD license so you can
do whatever you want with it
许多数据库系统⽤的其实都是PostgreSQL，因为它的许可证是BSD，So，你想怎么改造都⾏
24:45 - 24:48
and it's actually pretty well written compared to MySQL
⽐起MySQL来说，它的代码是真的好
24:48 - 24:52
but you can then rewrite the parts of Postgres that are slow for your particular
application
但你可以去重写PostgreSQL中对于特定应⽤程序处理速度较慢的那⼀部分
24:53 - 24:55
And and have that be your new database system
这样就成了你所写的新数据库系统
24.55-24.59
like Vertica, Greenplum, time scale all these all these do this
像Vertica，Greenplum，TimeScaleDB都是这么来的
24:59 - 25:00
and so what happens is that
So，它们所做的就是
25.00-
they inherit the legacy process model architecture up Postgres, if you go down this
route
它们从PostgreSQL那⾥继承了这种传统的进程模型，如果你按照PostgreSQL的路⾛，也是这
样的
25:04 - 25:09
but anybody that starting from scratch for the new code base is gonna almost always
end up being multi-threaded
但任何从头开始使⽤新代码库去编写数据库系统的⼈最终都会去使⽤这种多线程处理模型
25:12 - 25:13
all right
==================================================================
25.13-25.18
so the other thing we briefly talked about which we don't have time to go into today is
scheduling
So，我们要简单讨论下的另⼀个东⻄就是调度，虽然我们今天没时间去讨论它
25:19 - 25:20
we all talk we've told us a little bit about
我们之前已经稍微谈论过这⽅⾯的内容了
25.20-25.27
the you have a dispatcher a coordinator can understand what the tasks are that I need to
execute, what resources or workers are available to me
Dispatcher或Coordinator能够知道我需要执⾏的任务有哪些，哪些资源或worker对我是可⽤的
25:28 - 25:31
and then it can decide you know how many tasks to split up a query into
然后，它就可以去决定该将⼀个查询拆分成多少个任务
25.31-25.37
where you know what CPU core we execute do those tasks ,what thread should pause
for another thread
它可以去决定使⽤哪个CPU core来执⾏这些任务，哪条线程要等其他相关线程执⾏完后再继续
往前执⾏
25:37 - 25:40
right and then once it produces the output of a task where does that output actually go
接着，⼀旦某⼀个线程所执⾏的任务⽣成了结果，那么该输出结果该往哪⾥放呢
25:41 - 25:45
all right, all these things we have to worry about if we want to do in a parallel database
system
如果我们想去做⼀个并⾏型数据库系统，那么这些就是我们需要去关⼼的事情
25:47 - 25:50
but you know in general there's not one way that's better than another
但你知道的，我并没有说哪种⽅法要⽐别的⽅法来得更好
25:50 - 25:52
it depends on the environment you're working in
这取决于你的⼯作环境
25.52-25.55
depends on what kind of target workload you you want to support
也取决于你想要⽀持的⽬标workload类型
25:56 - 25.58
but as I said multiple times throughout the semester,
但正如我在学期中反复唠叨的那样
25.58-26.00
the DBMS always been knows better than the OS
DBMS知道的东⻄始终要⽐OS来得更多
这些东⻄交由DBMS来控制要⽐OS来得更好
26:00 - 26:02
so we can always make better decisions about all these things
这样，我们就可以对这些事情做出更好的决策
26.02-26.02
yes
请讲
26:07 - 26:07
say it again
再说⼀遍
26:13 - 26:13
this question is
他的问题是
26.13-26.20
isn't it the case that the for a given thread ,the OS decides what core runs on, No
对于⼀个给定的线程来说，OS会去决定⽤哪个core来运⾏它吗？并不是这样的
26:20 - 26:23
this is called neumann control in error test set in Linux
在Linux的错误测试集中，这叫做Neumann control
26:23 - 26:28
you can have complete control to know say my threads gonna run on this core or these
cores ,right
你可以让你的线程在这个core或者这些core上运⾏，它的控制权完全在你⼿上
26:28 - 26:30
the OS won't force that for you
OS不会为你强制做这些
26:31 - 26:32
if you don't do anything
如果你什么也不做
26.32-26.41
then the the OS will try to figure out like well you're accessing memory and this, you
know system Multi multi socket CPU gives 2 CPU sockets
举个例⼦来说，当你在访问内存的时候，OS会提供给你2个CPU socket以供使⽤
那么OS可能会去这么做，举个例⼦来说，当你访问内存的时候，如果OS提供了2个CPU socket
供你使⽤
26:41 - 26:45
and in the modern like numerous systems a CPU socket has local memory
在现代的众多系统中，⼀个CPU socket中有它⾃⼰的本地内存
26:45 - 26:46
right the dimms that are close to it
即和它邻近的DIMM存储模块(知秋注:就是内存插槽上的内存)
26:47 - 26:50
So if your thread is running here and you're accessing memory on this other socket
So，如果你的线程是在这个Core上运⾏，并且你正在访问另⼀个CPU socket上的内存
26:51 - 26:53
the OS or the CPU could automatically migrate you over
OS或者CPU会⾃动将你迁移到那个CPU core上⾯去
26:54 - 26:57
but in a high-end system we know exactly what data were going to touch
但在⾼端的数据库系统中，我们能够准确地知道我们所接触的数据有哪些
26:57 - 27:04
we can pin ourselves ahead of time or force ourselves and say, all right we know we
have this thread running this core, it can only read memory read data from this memory
location
我们可以提前强制让这个任务所在的线程在这个Core上执⾏，它只能从这块内存区域上读取数
据
27:04 - 27:07
so all tasks that touch that memory location go there
So，所有任务所涉及到的内存都在这块内存区域上
27:07 - 27:10！！！！
we can do all that ourselves
我们可以⾃⼰来调度这些任务
27.10-27.12
and we can do a better job than the OS can do
我们可以做的⽐OS来的更好
27:14 - 27:16
all right,so let's talk about parallel queries
So，我们来讨论下并⾏查询
27:17 - 27:19
so there's a two type of parallelize we're going to support
So，这⾥我们要去⽀持两种并⾏⽅式
27:19 - 27:22
there's inter-query parallelism and inter-query parallelism
即inter-quey parallelism和intra-query parallelism
27:22 - 27:24
so I'll go through both of these
So，这两个我都会讲
27.24-27.27
but we're gonna spend most of our time today talking about this one
但我们今天主要要去讲的是Intra-query这种
27:27 - 27:33
Right,so inter-query parallelism is that we can execute multiple queries that are doing
distinct things at the same time
So，inter-query parallelism指的是，我们可以在同⼀时间执⾏多个做不同事情的查询
27:33 - 27:37
and again this is going to improve our throughput and latency of our system
再说⼀遍，这改善了我们系统的吞吐量以及延迟
27:38 - 27:48
and then for intra-query parallelism take one query ,and break it up to subtasks or
fragments and run those in parallel on different resources at the same time
然后，对于intra-query parallelism来说，它是将⼀个查询拆分为多个⼦任务或者⽚段，然后在
不同的资源上同时并⾏执⾏这些任务
27:49 - 27:53
so again inter-query parallelism is what I've already said ,the idea is
So，正如我所说的，inter-query parallelism的思想是
27.53-27.56
that we have multiple requests coming in from our application
我们从我们的应⽤程序那⾥收到多个请求
27:56 - 27:59
and instead of running them one after another on a single thread
这⾥我们并不会通过⼀个线程来逐个处理这些请求
27:59 - 28:03
we're to have multiple workers or multiple threads run them simultaneously
我们会通过多个worker（多线程）来同时处理这些请求
28:04 - 28:09
and then that way we get a response more quickly to the you know to the application
with the result they were looking for
然后我们就可以更快地将应⽤程序所需要的结果返回给它
28:10 - 28:13
so if all the queries we need to execute are read-only
如果我们所需要执⾏的所有查询都是只读查询
28.13-28.16
meaning they're not doing insert update or deletes
这意味着，它们不会去做插⼊，更新或者删除之类的操作
28:16 - 28:20
they're just just doing select statements ,then this is super easy to do
那么它们执⾏的就只是select语句，这样做起来就超级容易
28:21 - 28:24
because there's no not gonna be any conflicts
因为这不会发⽣任何冲突
28.24-28.28
there's not gonna be any issues of you know I'm trying to update the same hash table
while you're reading it
这⾥不会出现这种问题：即当你正在读取⼀个hash table时，我则要去试着对这个hash table进
⾏更新
28:29 - 28:31
everything just sort of works very nicely
这⼀切都能很好的⼯作
28:32 - 28:33
so this is super easy
So，这种情况处理起来超级简单
28:33 - 28:35
But this isn't always that common
但这种情况并不总是那么普遍
28:35 - 28:37
the thing that's gonna be super hard for us is that
对于我们来说，处理起来超级难的事情是
28.37-28.41
if we have multiple threads updating the database at the same time
如果我们有多条线程同时对数据库进⾏更新操作
28:42 - 28:46
and now we got to worry about all the concurrent row stuff we talked about for the
B+tree and the hash table
现在我们就得去考虑我们之前在B+ Tree和Hash table中谈论过的那些问题
28:47 - 28:50
But now I just have to worry about this for the actual data itself
但我现在只需要担⼼数据本身即可
28.50-28.54
like you have two queries try to update the same tuple at the same time, what should
happen
⽐如，你有两个查询，它们都试着对同⼀个tuple同时进⾏更新操作，这会发⽣什么呢？
28:56 - 28:59
So they're good news for you guys we're gonna punt on this until after the midterm
So，对于你们来说，⼀个好消息就是，你们会在期中考试后碰到这个
29:00 - 29:03
because this is a whole you know ball of wax we got to deal with
因为我们得去处理其中的全部细节
29.03-29.04
which is super hard and super awesome
它超级难，但也超级棒
29:05 - 29:09
and so we're gonna spend basically two weeks discussing this in exhaustion
So，简单来讲，我们会花两周来全⼒讨论这个东⻄
29:09 - 29:11
And this is the thing I'm super excited about
这也是最令我兴奋的东⻄
29.11-29.13
this is like there's one my favorite part about database systems is
这是数据库系统中我最喜欢的⼀部分
29.13-29.16
that they can do these these concurrent operations at the same time
它们可以在同⼀时间执⾏并发操作
29:17 - 29:18
but it's super hard to do
但做起来超级难
29:19 - 29:20
so we'll cover this after the midterm
So，我们会在期中考试后对此进⾏介绍
29:21 - 29:25
all right so for this class like I said we're focused on inter-query parallelism
So，正如我说的，这节课我们的重点是intra-query parallelism
29:25 - 29:27
so this is gonna be useful for for analytical queries
这对于分析型查询来说⾮常有⽤
29.27-29.32
where we have multiple resources or multiple workers available to us
我们可以使⽤多个资源或多个worker
29:32 - 29:36
and we're gonna split it up with these the query into fragments or subtasks
我们将这个查询拆分为多个⼦任务
29.36-29.38
and run them in parallel at the same time
同⼀时间以并⾏的⽅式执⾏这些任务
29:39 - 29:40
so for this discussion here
So，在这场讨论中
29.40-29.42
we're gonna focus on compute parallelism
我们会将重点放在并⾏计算上
29.42-29.49
meaning I have multiple workers that have multiple threads or cores that are available to
me I'm gonna I'm gonna use them for the same query
这意味着，我有多个worker，它⾥⾯有多个线程或者CPU core，我可以使⽤它们来执⾏同⼀个
查询
29:51 - 29:53
So a way to think about how we're gonna organize this is
So，思考我们该如何组织这些的⽅式是
so，我们来思考下该如何组织这些东⻄
29.53-29.57
it is that in our query plan we have these operators
假设，在我们的查询计划中，我们有⼀些operator
29:58 - 30:04
we've already discussed how they have this next function that can move data you know
you ask next ,and it gives you back a chunk of data or single tuple
这点我们已经讨论过了，它们通过调⽤next函数来移动数据，即你调⽤next，它就会返回给你⼀
堆数据或者⼀条tuple
30:05 - 30:08
and so we can think of that in terms of a gap producer-consumer paradigm
So，我们可以⽤⽣产者-消费者模式来思考这个
30.08-30.16
where each operator is a not only a producer of data like if you call a next on it I'll
produce some data for you
每个operator不仅仅是数据的⽣产者，即如果你调⽤next，它就会为了⽣成⼀些数据
30:16 - 30:20
but it's also consume data potentially from some operator running below it
它同时也是数据的消费者，它会去消费那些在它下⽅的operator所传递过来的数据
30:21 - 30:26
and so we can think about how we're going to organize in our query plan in this
producer-consumer model
So，我们可以去思考下我们该如何在这种⽣产者-消费者模型下组织我们的查询计划
30.26-30.29
and we see how we can then run these things in parallel in different ways
我们可以去弄清楚我们该如何以不同的⽅式并⾏执⾏这些任务
30:31 - 30:35
so the first thing I'll say to for all the operator algorithms that we talked about
So，⾸先我要讲的东⻄是，对于这些我们所讨论过的所有operator算法来说
30.35-30.37
there are parallel versions of all of them
它们都有对应的并⾏版本的算法
30:38 - 30:46
but they're gonna differ based on whether you are having multiple threads updating
some centralized data structure at the same time
当我们使⽤多线程来同时更新中⼼数据结构时，它们的并发⽅式会有所不同
当我们使⽤多条线程同时对同⼀个中⼼数据结构进⾏更新的时候，我们的处理⽅式可能会有所不
同
30:47 - 30:49
like if I'm doing a join hash joint in parallel
⽐如，如果我以并⾏的⽅式去进⾏hash join
30.49-30.53
I could have multiple threads update and build out my hash table
我可以通过多条线程来更新并构建我的hash table
30:53 - 30.56
and then multiple threads could probe that hash table
然后，我们可以通过多条线程来对我们的hash table进⾏检测
30.56-31.02
or I could split it up a partition my input data that I'm consuming from my the the
operators below me
或者，我可以将我从下⽅的operator处所拿到的输⼊数据进⾏分区
31:02 - 31:07
and have them each work on siloed or individualized chunks of data or partitions of data
然后通过多线程来分别处理这些数据分区
31:08 - 31:12
And then now I don't need to coordinate across these different workers running at the
same time
那么现在我就不需要对这些同时⼯作的不同worker进⾏协调了
31:14 - 31:16
so the conceptually this is pretty easy to think about right
So，从概念上来讲，这种我们很容易想到
31.16-31.22
so this is the same, it's the same hash join we talked about before the partition of grace
hash join
So，这和我们以前讨论过的hash join是⼀样的，即grace hash join
31:22 - 31:24
and before what I said was
我之前说过
31.24-31.29
we would have this hash function on both sides on the inner and the outer table
我们会在inner table和outer table这两边都会使⽤同⼀个hash函数进⾏hash处理
31:30 - 31:33
and they would hash into these buckets at these different levels
这些数据会被hash到不同层的这些bucket中
31:33 - 31:37
so now we wanted to do a join to combine these these buckets
So，我们想通过join来将这些bucket合并在⼀起
31.37-31.42
we would just have to have this, you know we'd only have examined the tuples in this
level with the tuples in the same level on the other side
你知道的，我们只能将这⼀侧这⼀层的tuple和另⼀侧同⼀层的tuple进⾏匹配，符合条件就进⾏
join
31:43 - 31:44
because we sort of partition this
因为我们对数据进⾏了分区
31:45 - 31:48
so in a way to run this in parallel now is super easy
So，我们就可以通过某种⽅式让它并⾏执⾏，这⾮常容易
31.48-31.51
we just have a single worker just take its own level
我们让⼀个worker去对⼀层bucket进⾏处理
31:52 - 31:54
and now do the join I produce the output
然后，进⾏join操作，并⽣成输出结果
31:55 - 31.58
so you can sort of see how we can do is for all the different things that we talked about
before
So，这样你们就知道我们该如何对我们以前所讨论过的东⻄做到并⾏⽀持
51.58-32.00
the sort merge join，any kind of sequential scan
⽐如：sort-merge join，循序扫描之类的
32:01 - 32:05
we can break it up and and and divide the work up and have them run in parallel
我们可以将⼀个任务拆分为多个⼦任务，然后并⾏执⾏这些任务
32:07 - 32:09
the tricky thing though is now putting this this data back together and the different ways
to do that
现在棘⼿的问题在于将这些数据组合在⼀起，并且我们要通过不同的⽅式做到这点
现在棘⼿的问题在于我们如何通过不同的⽅式将返回的数据组合在⼀起
32.09-32.13
so that's what we're going to focus on
这也是我们关注的重点
32:13 - 32:16
so the three types of intra-query parallelism could have
So，我们可以使⽤3中intra-quey parallelism⽅案
32.16-32.19
is intra-operator parallelism also known as horizontal parallelism
intra-operator parallelism也叫作horizontal parallelism（⽔平并⾏）
32:19 - 32:23
inter-operator is vertical parallelism
inter-operator也叫作vertical parallelism
32:23 - 32:27
and then bushy parallelism which I think is in the textbook ,it's just an extension of these
other ones
接着就是教科书中所提到过的bushy parallelism，它是其中⼀种⽅式的扩展
32:27 - 32:31
but I think it's worth this to to show you quickly what it is in case you see it again
但我觉得还是值得向你们展示⼀下它的
32:32 - 32:36
and I'll say too is that for all these approaches, they're not mutually exclusive
对于所有这些策略⽽⾔，它们并不是互斥的
32:36 - 32:38
meaning if you want to run queries in parallel
这意味着，如果你想以并⾏的⽅式执⾏查询
32.38-32.41
you know you don't pick one of these three ,you can actually do a combination of all of
them
你知道的，你不⼀定要从这三种⽅案中选⼀种来使⽤。实际上，你可以将它们结合起来使⽤
32:42 - 32:44
and this is what the DBMS can figure out for you
DBMS可以为你搞定这⼀切
32.44-32.49
say all right my hardware looks like this, my data looks like this, my query looks like this
⽐如，我的硬件是这样的，我的数据⻓那样，我的查询要⼲的事情是这样的
32:49 - 32:54
I can use some different combinations of these techniques to get the best performance,
you know for my workload
你知道的，对于我的workload来说，我可以通过对这些技术⽅案进⾏组合以达到最佳性能
32:56 - 32:57
so again let's go through the each of these one by one
So，我们会对这些⽅案逐个讲解
32:58 - 33:05
so in intra-operator parallelism is where we're gonna decompose the operators into
independent fragments
So，intra-operator parallelism指的是，我们将⼀个完整的操作拆分为多个平⾏的操作，即我
们将操作的数据分为多段（fragments），每⼀段执⾏的函数都是⼀样的
33:07 - 33:13
And each fragment is gonna do whatever it is that the operator wants us to do on some
portion of our input data
每个fragment都会去执⾏我们想让operator对部分输⼊数据所进⾏的操作
我们会对每个fragment执⾏相同的操作，这⾥的fragment中的数据属于我们所输⼊数据的⼀部
分
33:15 - 33:18
Alright, so if I have a scan operator on a table
So，如果我要对⼀张表进⾏扫描
33:18 - 33:22
I could have multiple instances of that scan
我可以去使⽤该scan operator的多个实例
32.22-32.24
running a separate fragments on separate threads
并在不同的线程上执⾏不同的fragment
我们会使⽤不同的线程来对不同的fragment进⾏相同的处理
33:24 - 33:27
and they're each going to scan a different portion of the table
每条线程都会去扫描表中的不同部分
33:28 - 33:30
and they're all gonna sort of funnel the data up
它们会将数据收集在⼀起
33:31 - 33:35
so the way we're gonna combine this data now, is to what is called an exchange operator
So，这⾥我们使⽤⼀个叫做exchange的operator来将这些结果组合在⼀起
33:36 - 33:39
the exchange operator is a location in the query plan
exchange operator会放在查询计划中的某个位置
33.39-33.45
that the the DBMS sort of injects artificially
DBMS会对此进⾏⼈为⼲预
33.45-33.50
like as it produces the query plan, that says all right here's the points where I can have
parallel fragments
当它⽣成了查询计划，它会说：All right，在这些地⽅，我可以对这些fragment进⾏并⾏处理
33:50 - 33:53
and here's the exchange operator I need to be able to combine their results together
这⾥我则会去放置⽤来能够将fragment所⽣成的结果组合起来的exchange operator
这⾥我会去放⼀个exchange operator，它能够将我们处理完的fragment的结果结合在⼀起
33.53-34.00
because I'm gonna need a single stream or single data data flow going up to the next
operator
因为我需要将⼀个数据流传递给下⼀个operator
34:00 - 34:13
So the exchange operator was actually invented by a the same guy that came up the
volcano iterator model from we talked about last class, query graphy the same guy who
did the B+tree paper or B but B+tree book that I was I was raving about
So，实际上，这个exchange operator是由我们之前所提到过的发明了volcano iterator模型以
及写了B+ Tree的那个⼈所发明的
34:14 - 34:19
but he has a paper in 1980 1990, that presents this exchange operator
他在1990年发表了⼀篇关于exchange operator的论⽂
34:19 - 34:27
and this is pretty much the same this this approach here is what every single DBMS is
doing parallel execution, or even distribute execution is doing something like this
所有DBMS都是通过这种⽅式来做到并⾏执⾏，甚⾄分布式DBMS也是按照这种套路来并⾏执⾏
34:28 - 34:31
although they may not always call it exactly the exchange operator
虽然这个operator并不⼀定总是叫做exchange operator
34:32 - 34:34
so let's look at real a simple example here
So，我们来看⼀个⾮常简单的例⼦
34:34 - 34:40
so we have a single select statement select a from from select * from a where A.value is
greater than 99
So，如图所示，我们有⼀条select语句
34:40 - 34:42
So the query plan is super simple
So，这个查询计划⾮常简单
34.42-34.46
sequential scan on A, and we feed that into our filter operator
我们对A进⾏循序扫描，然后将结果传⼊filter operator
34:47 - 34:55
so to run this in parallel which we do is we would divide up now, the the query plan
across different fragments or the scan with a scan and the filter
So，为了做到并⾏执⾏这个查询，我们将这个查询计划分为3个不同的fragment，每个
fragment中都有⼀个scan operator以及filter operator
34:56 - 35:00
and then we'll split the database up now ,which is already you know in general it already
is
然后，我们会对数据库进⾏拆分，实际上⼀般它已经被拆分好了
35.00-35.02
,because it's a it's already divided up into pages
因为它已经被拆分成多个page了
35:03 - 35:04
and so what we can have now
So，我们现在可以做什么呢？
35.04-35.06
within a given plan fragment
在⼀个给定计划的fragment中
35:06 - 35:11
we can have it operate on a sorry ,the distinct page
我们可以对不同的page进⾏操作
35:11 - 35:17
so the exchange operator up above is has its own next function just like any other
operator
So，上⽅的exchange operator和其他的operator⼀样，有它⾃⼰的next函数
35:17 - 35:22
so if we're doing the volcano model or iterator model or we're calling next and going
down
So，如果我们使⽤的是volcano iterator model，然后我们在根节点（exchange operator）处
调⽤next，并往下⾛
35:22 - 35:26
the exchange operators say I call next on my operator here which then calls next on the
scan
exchange operator说，我在我⾃⼰这⾥调⽤了next，然后在scan operator处调⽤了next
35:27 - 35:31
and then now I'm gonna start feeding up data that I'm gonna retrieve from a particular
page
然后，我会将从⼀个特定page上所拿到的数据开始向上传递
35:33 - 35:35
and we do this for all the other other fragments as well
我们会对其他所有的fragment做同样的处理
35:36 - 35:38
right,it's going to operate on its separate pages
它会对每个单独的page都进⾏这样的操作
35:39 - 35:47
Right,and then the exchange operators can coalesce the data it's getting from these
three different fragments these three different workers
然后，exchange operator就可以将它从这三个不同的任务碎⽚中所得到的结果进⾏合并
35:47 - 35:51
and then combined them to into a single result that we then spit out as the output to the
application
然后，将这些结果合并为⼀个结果，并将其作为输出返回给应⽤程序
35:53 - 35:56
right because the end result of the query always needs to be a you know a single result
因为该查询的最终结果得是⼀个单个结果
35:57 - 35.59
we can't say your data over here, here and here
我们不能说你的数据是在这，在那之类的话
35.59-36.00
because they had three different workers
因为这⾥有3个不同的worker
36.00-36.02
we have to always produce a single result
我们始终得去⽣成⼀个单个结果
36:02 - 36:02
yes
请问
36:07 - 36:08
NO NO NO
No No No
36.08-36.09
so quion statement is
So，他的问题是
36.09-36.12
how is exchange calling next hear
exchange operator在这⾥是如何调⽤next函数的
36.12-36.13
it's calling them in parallel
它是以并⾏的⽅式调⽤这些next函数
36.14-36.16
it knows I have three fragments below me
它知道它下⾯是有三个fragment
36:17 - 36:19
and therefore I need to call next on all of them
因此，我需要在它们三个上⾯都调⽤Next
36:19 - 36:21
and it fires them off in different workers
然后让不同的worker去执⾏这些⼯作
36:23 - 36:23
yes
请问
36:37 - 36:38
yes so his question is
So，他的问题是
36.38-36.39
like if I call next once here
如果我调⽤这⾥的Next⼀次
36.39-36.43
how's that been percolating down to these other ones
那它怎么传给其他⼈呢
36:43 - 36:44
You could have a coordinator up above
在这上⾯你可以放⼀个coordinator
36.44-36.49
and say like I know I need to get data from all these other guys, and keep calling the
next one until they produce nothing
并说，我知道我需要从这⼏个fragment中获取数据，我会⼀直调⽤Next，直到它们没有数据可
以⽣成为⽌
36:57 - 37:04
right so think it like the fragment here, this is running sort of separately
可以看到，这⾥它们都是单独运⾏的
37:05 - 37:08
Right, and it's like a producer consumer
这就像是⽣产者-消费者模型
37.08-37.13
this thing is a secret of saying ,hey give me some data and then they fires off and goes
and produces the result
这就像是消费者在对⽣产者说悄悄话，hey，请给我⼀些数据，然后消费者就会去消费并产⽣⼀
些结果
37:13 - 37:15
And then something else they'll have to come back to I go get more data
接着，它们就会返回结果，并向⽣产者去请求更多的数据
37:17 - 37:20
yeah yes
没错
37:21 - 37:22
Yeah think of these are like almost like streams
你们可以将它想象为数据流
37:23 - 37:26
right that were producing results shoving up to the next guy
我们⽣成结果，然后将结果向上传给下⼀个operator
37:27 - 37:28
and depending on how its implemented
这取决于它的实现⽅式
37.28-37.31
this thing could no I'm gonna keep shoving up data until someone tells me to stop
我可以不断向上传递数据，直到有⼈跟我说别再传了，停下来吧
37.31-37.34
or I can do it whenever I'm invoked
或者，我可以在被调⽤的时候，再去传递数据
37:34 -37:36
Different systems do different things
不同的系统做法也不⼀样
37.36-37.37
yes
请讲
37:40 - 37:41
this question is
他的问题是
37.41-37.44
the call the fragments like this part here is this in parallel,yes
对这些fragment所做的调⽤是并⾏的吗？没错
37:44 - 37:46
could you want them to run in parallel
你是想让它们并⾏执⾏吗？

13-03
37:50 - 37:50
like this
像这样？
37:54 - 38:01
right so like again like this is it they're all getting fired off in parallel, they're all doing
work at the same time simultaneously on different cores
So，像这⾥，它们会在同⼀时间在不同的CPU core上并⾏执⾏这些任务
38:05 - 38:10
oh yeah so this question is how do I make sure, that they're not reading the same page
So，他的问题是，我该如何确保它俩读的不是同⼀个page
38:10 - 38:12
so as part of this query planning here
So，作为该查询计划的⼀部分
38.12-38.14
where there's two ways to do this
有两种⽅法做到这⼀点
38.14-38.17
one you could say here's the cue a bunch of work I need to do
其中⼀种⽅式是，你会说，这⾥有⼀堆任务需要去做
38:17 - 38.19
So let's say that in this case here
So，假设在这个例⼦中
38.19-38.22
the the first and second thread finished up these pages
第⼀条和第⼆条线程已经获取完它们之前所负责的那些page了
38.22-38.24
and they say all right let me go to the queueing if the next pages I read
它们会说，让我去队列中获取下⼀个我要读取的page
38:24 - 38:28
right and that you just keep doing that until you run out of pages then you stop
你会⼀直持续这样做下去，直到你读取完所有的page中的数据，然后，你就会停下来
38.28-38.32
or you can you actually do pre partitioning which we'll talk about later on
或者，你可以进⾏提前分区，这个我们之后会讲
38:32 - 38:36
you could say well the the first guy is gonna operate on 1 2 & 3
你可以说，Well，第⼀条线程会去操作page 1 2 3
38:36 - 38:39
the second guy operating 4 5 & 6 and so forth
第⼆条线程会去操作page 4 5 6，以此类推
38:39 - 38:41
and that's just sort of blindly grabbing different pages
它们只管去获取不同的page就⾏了
38.41-38.45
or you can understand the semantics so actually what's in the table
或者，你可以去理解其中的语义，即表中实际上有哪些东⻄
38:45 - 38:50
and say well I want to look at this is a small table
假设这是⼀张⼩表
38:50 - 38:56
so say like I want to have one thread process all the data where the values are less than
a thousand
So，⽐如，我想通过⼀条线程来获取所有值⼩于1000的数据
38.56-38.59
and then one process all that potato or values less than 2,000 ,right
然后我想⽤另⼀条线程去处理值⼩于2000⼤于1000这个范围内的数据
38:59 - 39:01
and then they could be reading the same page
这两条线程可能会去读取同⼀个page
39.01-39.04
but now that is processing different portions of the data
但它们处理的是相同数据的不同部分
39:06 -39:07
there's Different ways to do all these things
这就是处理这些事情的不同⽅式
39:08 - 39:14
the main takeaway what you have is understand is like this exchange operator is a way
to coalesce or break up the data further
我们从中主要学到的是，exchange operator其实是⼀种进⼀步将数据收集或者分开的⽅式
39:17 - 39:17
yes
请讲
39:25 - 39:26
Guarantee ordering on what
保证什么的顺序？
39:35 - 39:36
we don't
我们不这样做
39:42 - 39:47
well if the sort order matters and you're clustered index on your cluster table
如果你对顺序很在意的话，你可以在你的表上使⽤聚簇索引
39:49 - 39:53
if this were at the order of how you process data matters
如果你处理数据的顺序很重要的话
39.53-39.55
then you wouldn't want to do this parallel stuff
那么你就不会选择去并⾏执⾏你的查询
39:56 - 40:02
right because if I can't like I can't process page two, until process page one is processed
⽐如说，直到我们处理完page 1，我们才能够去处理page 2
40.02-40.04
well that's Serial execution anyway
Well，总之它会串⾏执⾏任务
40:04 - 40:06
so I don't do any of this set up all these threads,
So，我不会去使⽤多线程来进⾏处理
40.06-40.07
because that's this waste of time
因为这是在浪费时间
40.07-40.12
wait you know wasting resources to do something you know I have one thing block on
another
这也是在浪费资源，你知道的，我正在处理⼀个任务时，把另⼀个任务给阻塞住了
40:16 - 40:21
Alright, so the exchange operator I showed you was the basic one called the gather
我刚刚向你们展示的是exchange operator的⼀种基本类型，它叫做Gather（收集）
40:22 - 40:29
and the basic idea is that we're combining results from different worker threads,
different outputs, that these operators are generating
它的基本思想是，我们将不同的worker线程执⾏任务所得到的结果，或者是这些operator所⽣
成的不同输出进⾏合并
40:29 - 40:33
and then we're going to produce a single output stream that we Hand up above
然后，我们会去⽣成⼀个单⼀的输出流，并向上传给下⼀个operator
40:34 - 40:35
so again in my last example here
So，来看下我之前给你们看的这个例⼦
40.35-40.40
like this is the output that we send to to the client whoever invoked that query
这个就是我们要发送给调⽤这个查询的client的输出结果
40:40 - 40:43
so that always needs to be combined together into a single output
So，这⾥它始终得将这些结果合并在⼀起变成⼀个单个输出结果
40:44 - 40:49
there are other times where maybe you want to take a bunch of output streams
我们也会有这样的时候，即我们想去拿到⼀堆输出流
40:50 - 40:52
and then reshuffle them based on what the data looks like
然后，根据数据，对这些数据流重新梳理
40.52-40.54
and then hand them out to other worker threads now
然后，将它们传递给其他的worker线程进⾏处理
40:55 - 40.57
so let's say if I'm doing the scan in parallel
So，假设我以并⾏的⽅式进⾏扫描
40.57-40.59
and I'm going to divide about based on the range of the values
然后，我根据值域来对数据进⾏划分（知秋注：即将数据按区间进⾏分块）
40.59-41.02
I can run the scan in parallel
这样我就我可以进⾏并⾏扫描
41:02 - 41:03
and then put it through a repartition exchange
然后，将它们放进repartition exchange operator中进⾏处理
41:04 - 41:07
and then now had that then be what's splitted up based on the actual values that I'm
seeing
这⾥会根据我所看到的值来进⾏拆分
41:09 - 41:11
And then the last one is to do distribute
然后，最后⼀种就是distribute
41.11-41.17
where we have a single input stream that then going to divide up and hand out two
different output streams
⽐如说，当我们拿到了⼀个输⼊流后，我们将它进⾏拆分变成2个不同的输出流
41:17 - 41:20
so that could be what we did for the the grace hash join
这⾥也可以是我们之前所⽤的Grace Hash join
41.20-41.22
right when we started off with a single input stream from our table
我们从我们的表中获取⼀个单个输⼊流
41:22 - 41:23
We built the hash table
然后，构建hash table
41.23-41.28
and now that spread out the different levels of the hash buckets to different threads
接着，将不同层的hash bucket交由不同的线程进⾏处理
41:29 - 41:31
so for there's parlance I'm using here
So，对于这⾥我的说法⽽⾔
41.31-41.35
so this nomenclature this is actually what SQL server uses
实际上，SQL server就使⽤了这个专⻔术语
41:35 - 41:40
because SQL server explicitly shows you the exchange operator in the query plan and
their documentation
因为SQL server在查询计划和它们的⽂档中明确展示了exchange operator
41:40 - 41:42
so for me this is the easiest way to reason about it
So，对于我来说，这是解释起来最为简单的⽅式
41:43 - 41:48
Oracle,DB2,Postgres all the high end you know that support parallel execution
Oracle，DB2和PostgreSQL所有这些⾼端系统都⽀持并⾏执⾏
41.48-41.50
they all have something that looks like exchange
它们都有⼀种看起来和exchange operator很像的东⻄
41.50-41.54
and just may not use exactly this terminology
只是它们使⽤的可能并不是这个术语
41:54 - 41:56
but at high level all it works the same way
但从⾼级层⾯来讲，它们的⼯作⽅式都是相同的
41.56-41.56
yes
请问
41:59 - 42:01
right the question is what is repartition
他的问题是什么是repartition
42:01 - 42:16
so say like say I had something about this in my query plan, that wanted to now do a
group by based on the values
So，假设在我的查询计划中，我想根据值来进⾏Group By操作
42:16 - 42:24
and so if this exchange pulls out a single single stream, then I'm gonna have one worker
thread do that group by
So，如果这个exchange operator⽣成了⼀个数据流，那么我就会使⽤另⼀个worker来对这个
数据流进⾏Group By操作
So，如果这个exchange operator要去⽣成⼀个单个数据流，那么我就会需要⼀个worker线程
来做Group By操作（知秋注：将来⾃各个⽅向的数据进⾏groupBy）
42:25 - 42:29
but maybe what instead what I could do is I could then split up ,and say
但相反，这⾥我所能做的就是将查询计划拆开，并说
42.29-42.36
well if the value is even，go this direction。 if value is odd ，go that direction
Well，如果值是偶数，那么它就⾛这⾥。如果值是奇数，它就会⾛另⼀个⽅向
42:36 - 42:39
and now I have a separate worker threads that can do group by or those things
现在，我通过⼀条单独的worker线程来进⾏Group By操作或者其他操作
42.39-42.42
I don't need a coordinator, because I'm doing group by
我并不需要⼀个coordinator（协调器），因为我做的是Group By操作
42:42 - 42:45
and then I have another exchange above them that combines the result to a single output
然后我在上⾯放另⼀个exchange operator，它⽤来将这些结果进⾏合并变成⼀个单个结果
42:46 - 42:49
it's a way I take multiple streams and produce some new other multiple streams
这⾥我拿到了多个数据流，然后⽣成了多个新的其他数据流
42.49-42.51
but split up in different ways
但我可以通过不同的办法来对数据流进⾏拆分
=====================================================================
=
42:55 - 42:58
alright so let's look a little slightly more complicated example here
So，我们来看个更为复杂的例⼦
42:58 - 43:01
so now we're doing a two way join between A and B
So，这⾥我们对A和B进⾏2-way join
43:02 - 43:06
and so the first thing we want to do is do this a scan in parallel
So，⾸先我们想做的事情就是对A进⾏并⾏扫描
43:06 - 43:10
so we'll assign these two three different worker threads
So，我们会分配三条不同的worker线程来执⾏⼯作
43:10 - 43:18
and then inside our plan fragment will actually do the, you know will do the scan do the
filter, and then they'll build the hash table
在我们的查询计划任务的fragment中，我们要对fragment进⾏scan操作，然后filter操作，接
着，它们会去构建hash table
43:19 - 43:24
and this hash table could either be a in this case here, it has to be a global hash table
在这个例⼦中，这个hash table得是⼀个全局hash table（知秋注：这三个fragment共同维护的
hash table）
43.24-43.30
because I don't know what values are gonna be in the table as I'm scanning them
因为当我在扫描的时候，我不清楚这个表中会有哪些数据
43:30 - 43:34
so if I have different hash tables for each fragment
So，如果我为每个fragment都构建⼀个不同的hash table
43.34-43.35
then when I do a join
然后，当我进⾏join的时候
43.35-43.37
I gotta check all the hash tables
我就会去对所有的hash table进⾏检查
43.37-43.39
and that's gonna be expensive that's gonna be slow
这样做的代价很⾼，⽽且速度也很慢
43:40 - 43:41
so these are all building the same hash table
So，它们会对同⼀个hash table进⾏构建
43.41-43.43
but then I have exchange operator
但我这⾥会有⼀个exchange operator
43.43-43.46
that basically says I wait until they all update my hash table， I'm done
简单来讲，直到它们都更新完我的hash table后，这部分任务就结束了
简单来讲，我得等待，直到它们都更新完我这个hash table后，我才能结束
43:48 - 43:49
Then now to do the scan on B
然后，我要对B进⾏扫描
43.49-43.52
I can run that maybe on two cores or took two worker threads
我可以通过2条worker线程来执⾏任务
43.52-43.56
they just do the filter and now they're going to partition and split up the data
它们会先进⾏过滤，然后通过分区来拆分数据
43:56 - 43:57
and now they have their own exchange operator
这两个任务都有它们⾃⼰的exchange operator
43:58 - 44:00
and then now I have I do the join
接着，我来进⾏join操作
44.00-44.04
and could be a this could be either single-threaded ,or I could do it multi-threaded
我可以使⽤单线程来进⾏join操作，也可以使⽤多线程来做
44.04-44.07
in this case here let's make it multi-threaded
在这个例⼦中，我使⽤多线程来进⾏join操作
44:07 - 44:09
so now I can split up inside this at the join
So，现在我可以在join⾥⾯将任务进⾏拆分
44.09-44.14
I can have their different threads now do the probe for the partitions over here
现在我就可以通过不同的线程来对这边的分区进⾏检测
44:14 - 44:18
Alright, so you can see how you can compose these things together
So，你们从这⾥可以看到它是如何将这些东⻄组合在⼀起的
44.18-44.22
we can have these different workers generate these these outputs
我们可以通过这些不同的worker来⽣成这些输出结果
44:22 - 44:24
that are then split across multiple threads
然后，我们将任务进⾏拆分，并交由多个线程进⾏处理
即我们要将数据进⾏拆分，并交由多个线程来执⾏相同的业务逻辑
44.24-44.26
and then you can combine them together and put them back up
然后，你可以将这些线程执⾏所得到的结果进⾏合并
44:26 - 44:31
and you can compose them to this news giant ,you know tree structure that can now run
in parallel
你可以将这些过程整合为⼀个很⼤的树形结构，这样我们就可以并⾏执⾏了
44:35 - 4435
all right
44.35-44.37
so this is intra-operator parallelism
So，这就是intra-operator parallelism
44.37-44.38
again the idea is that
它的思路是
44.38-44.41
within a single operator
在单个operator中
44.41-44.42
like a single scan on A
⽐如：对A进⾏扫描
44:42 - 44:45
I can have that run in parallel in different fragments
我可以将这个任务分成多个fragment，以此做到并⾏执⾏
44:47 - 44:49
Inter-operator parallelism is
inter-operator parallelism指的是
44.49-44.54
where we're going to have different operators run in separate threads at the same time
不同的线程在同⼀时间执⾏不同的operator
44:54 - 44.56
Right
44.56-44.58
and this is also called vertical parallelism
这也叫做vertical parallelism（垂直并⾏）
44.58-45.02
because the idea is that we can sort of for every single operator tree
对于每个operator tree来说
45:02 - 45:03
we could have them run as a separate worker
我们可以将每个operator作为⼀个单独的worker来执⾏
45.03-45.05
and there is feeding data
这⾥我们要去传⼊数据
45.05-45.07
you know the output of one is fed into the input of the other
你知道的，⼀个operator的执⾏结果是下⼀个operator的输⼊
45:09 - 45:11
so basically works like this
So，简单来讲，它的⼯作⽅式是这样的
45.11-45.14
so we say for the for the join part here
So，对于此处的join操作来说
45:15 - 45:19
I could have one Core one worker just do the join, right
我可以使⽤⼀个CPU core或者说⼀个worker来执⾏这个join操作
45:19 - 45:22
it's just getting data from its children operators
它只需要从它的⼦operator处获取数据即可
45:23 - 45:24
and then it does the join
然后它进⾏join操作
45.24-45.25
and then as soon as it does the join
只要它完成了join操作
45.25-45.27
it emits it up into another worker
它会将结果发送给另⼀个worker
45.27-45.30
that just takes whatever this guy sends it
上⾯这个operator会拿到join operator所发送给它的数据
45:30 - 45:34
and then does the predicate or does does the projection
接着，这⾥就会进⾏条件判断或者projection操作
45:35 - 45:37
and then sends that up further up in the query plan
然后将⽣成的结果进⼀步传给查询计划
45:37 - 45:39
So now these guys are just spinning
So，执⾏这些operator操作的线程都在⾃旋等待数据的传⼊（知秋注：即读⼀波数据处理完，
如果需要的话，再读下⼀波，没有返回结果的时候，就等待状态）
45.41-45.41
this is the producer consumer model
这是⽣产者-消费者模型
45.41-45.43
this guy's spinning on the input it's getting from guys below it
这些operator都在⾃旋等待接收它们下⽅⼦operator所⽣成的输出结果
45:44 - 45:47
and then it hands off any tuple that matches up to this guy we then spin the waits for
that
然后，它将这些匹配的tuple传给这个正在⾃旋等待的operator
45:50 - 45.52
so this is again this is where the coordination stuff actually matters a lot
So，再说⼀遍，这就是coordinator实际最为关⼼的地⽅
45.52-46.01
because if the number of tuples other things gonna spit out, it's gonna be really low
因为如果⽣成的tuple数量很多，那么速度就会很慢（知秋注：假设两条线程使⽤同⼀个数组容
器，那么它就会⽤到锁，这样就会导致⼀条线程在读的时候，另⼀条线程就没法写。或者，⼀条
线程在写的时候，另⼀条线程就没法去读，当然，可以通过类似于Java中ConcurrentHashMap
中的分段锁的⽅式或环形队列+锁的⽅式进⾏改善）
46:01 - 46:03
then this thing's basically gonna sit for a long time and do nothing
那么它就只能眼巴巴地等待那⾥，啥也不⼲
46:03 - 46:05
so now I've assigned a task to a core
So，现在我已经将⼀个任务分配给了⼀个CPU core
46.05-46.07
it's not gonna waste cycles
它不会去浪费CPU时钟周期
46.07-46.09
because it comes to block on whatever incoming queue is
因为它要往队列⾥⾯写数据，所以这⾥会发⽣阻塞
46:11 - 46:14
But it's taking up a task
但是你可以将它变成⼀个任务
46.14-46.22
if you resources would've been better just to combine these two together and into a
single pipeline
即将这两个操作进⾏合并，变成⼀个单独的任务流⽔线
46:22 - 46:26
again I they're not logical skews, I can do the horizontal and vertical together
我们并不会只单独使⽤某⼀种⽅式，我们可以将这两种⽅式结合在⼀起使⽤
46:26 - 46:35
I could have this join be combined with you know be broken up with vertical parallelism
with the projection here
我可以在这个join operator上使⽤⽔平并⾏，然后通过垂直并⾏将它和这个projection操作整合
在⼀起（知秋注：标准就是在⼀个线程中任务⾼内聚，多个线程间低耦合）
46:35 - 46:38
but I could have multiple workers all doing this at the same time as well
我可以让多个worker来同时执⾏这个⼯作
============================================================
46:42 - 46:44 ！！！！！！！
all right the last one I'm talking about is bushy parallelism
最后我要讨论的是bushy parallelism
46.44-46.45
again in my opinion
在我的观念中
46.45-46.47
this is just an extension of inter operator parallelism,
它只是inter-operator parallelism的⼀种扩展版本
46.47-46.48
it's not something distinct
它没有什么不同
46:49 - 46:53
but again I think the textbook and other other guys online talk about this
但我想教科书和其他在线讲座有提到过这个
46:53 - 46:54
so the basic idea is that
So，它的基本思路是
46.54-46.59
we just had different workers operating on different portions of the query plan at the
same time
我们让不同的worker在同⼀时刻对⼀个查询计划的不同部分进⾏操作
46:59 - 47:03
And we're still using exchange operators to to as an interchange to move data between
them
这⾥我们依然使⽤exchange operator来在这些operator之间移动数据
47:04 - 47:08
let's say I'm doing a really stupid four-way join on three three tables
假设，我对这三个表使⽤了⼀种很蠢的4-way join操作
47:08 - 47:09
So what I could have is
So，我可以做的事情是
47.09-47.11
if I'm composed my join algorithm like this
如果我像图上这种⽅式来整合我的join算法
47.11-47.18
I could have this portion of the query plan as a fragment execute on one worker
我可以将查询计划中的这部分作为⼀个fragment，并交由⼀个worker来进⾏处理
47:18 - 47:21
and then this these two joins over here execute on another worker
然后，这边的两个join操作则是由另⼀个worker来处理
47.21-47.25
and they're just running in parallel shoving data up into our exchange operators all above
它们会并⾏处理这些fragment，并将处理完的结果向上传递给exchange operator
47:25 - 47:26
And then we have other workers operating on them
然后我们再通过其他的worker来对它们进⾏处理
47:29 - 47:34
again this is why I'm saying it's to me this is just an extension of the inner operator
parallelism
这就是为什么我说，对我来说，它只是inner-operator parallelism的扩展版本
47.34-47.41
because it's just different portions of the the query plan running at the same time
因为这⾥只是去同时执⾏⼀个查询计划的不同部分
47:41 - 47:41
Ok yes
请问
47:50 - 47:50
question is
他的问题是
47.50-47.58
do you that the third and fourth workers up here do they stop there is a wait to the
result of one or two yes ,in this case ,yes
这⾥的worker 3和4是否停在那⾥等待worker 1和2所处理的结果，在这个例⼦中，是这样的
47:58 - 48:03
it depends on again well depends how the exchange is set up, right
这取决于exchange operator是如何设置的
48:03 - 48:04
so any after you do the join
So，当你做完join操作后
48.04-48.08
anything that this generates out, then it gets shoved up to this guy
下⾯的worker所执⾏得到的结果会传到上⾯这个operator中
48.09-48.13
it could start building the hash table with tuples as it gets out
它就可以使⽤它所拿到的tuple来构建hash table
48:13 - 48:17
you could wait you don't need to be don't have to depends how it's set up,
你可以进⾏等待，也可以不等待，这取决于exchange operator是怎么设置的
48:17 - 48:18
yes
请问
48.18-48.21
this one
这个吗？
48:25 - 48:27
so this is one so the question is
So，他的问题是
48.27-48.29
where does the parallel where's the parallelism here
此处在哪⾥进⾏了并⾏执⾏
48:29 - 48:34
so I have one worker that's running this the join, have another worker that's running the
projection
So，这⾥我让⼀个worker来执⾏join，另⼀个worker来执⾏projection
48:35 - 48:37
so this thing's spinning and doing doing the join
So，这个worker会进⾏⾃旋等待，并执⾏join操作
48.37-48.45
and everything they'll find it find the matches,it hands off the tuple as it as its output
,hands it off to this guy who can then now start doing the projection
它会对符合条件的tuple进⾏join操作，并将结果发送给这个operator去执⾏projection操作
48:45 - 48:47
and projections like super simple operations
projection其实是⼀个很简单的操作
48.47-48.48
so it's not that expensive
So，使⽤它的成本并不⾼
48.48-48.49
but the idea is that
这⾥的思路是
48.49-48.55
instead of having this thing do to join then do the projection，then go back and do the
next join
这⾥我们并不会先进⾏join再进⾏projection。然后回过头去再进⾏下⼀个join
48:55- 48:59
while this thing hands off to do the projection up here, it can go back and do the next
join
当它将结果传给上⾯的projection operator去进⾏处理时，它就可以回过头去，做下⼀个join
49:03 - 49:03
Yes
请问
49:17 - 49:21
question is like coming back here with this hash there
我们先回到这张幻灯⽚
49:24 - 49:27
he says only one thread can update hashing about the same time,no, right
他说，同⼀时间只有⼀条线程可以去更新hash table，并不是这样
49:27 - 49:31
because they're talking they're accessing different pages, I can do that in parallel
因为这些线程访问的是不同page，我可以去并⾏执⾏这些任务
49:34 - 49:40
right so again so you can either do every one upstate same hash table or you can do the
partition one
So，你可以对同⼀个hash table进⾏更新，或者也可以对分区1进⾏更新
So，我们可以对这个hash table中的每个分区进⾏并⾏更新（知秋注：如果说两条线程更新的都
是同⼀个分区，那么它会阻塞，类似于JDK中ConcurrentHashMap的分段锁）
49:41 - 49:44
right and now like now you're doing multiple stages
这样做，你需要经历多个阶段
49.44-49.51
so now I could have the the first pass I mean it still you're still accessing the same page
though
这⾥你依然在访问同⼀个page
49.51-49.52
like in the first pass
⽐如，在第⼀轮中
49:52 - 49:53
Sorry it's alright still accessing the same hash table
抱歉，说错了，我说的应该是依然在访问同⼀个hash table
42.53-49.57
,but like the first pass you have the different threads update the different buckets
在第⼀轮中，我们通过不同的线程去对不同的bucket进⾏更新
49:58 - 50:03
Right, but as you hash it, but then you may end up hashing you know two threads might
hash into the same bucket
但当你进⾏hash处理的时候，你最终可能会将两条线程hash到同⼀个bucket中
50:03 - 50:05
then you have to deal with that, that's unavoidable
那么你就得去处理这种情况，这种情况是我们⽆法避免的
50:05 - 50:09
then the next phase though you can run a parallel, but not have the coordinator across
any of them
接着，在下⼀个阶段，我们就可以进⾏并⾏执⾏，但这⾥不需要在它们上⾯使⽤任何
coordinator
50:10 - 50:18
or alternatively you could just do the you know one thread could take a pass build out
that the hash buckets, then you parallelism that
或者，在⼀轮中，你可以先让⼀条线程去构建出hash bucket，然后你再去并⾏执⾏任务
50:19 - 50:20
different systems do different things
不同的系统做法不同
50:23 - 50:26
if you assume your disk is super slow and that not everything fits in memory
假设如果你的磁盘速度超级慢，并且你的数据也没法全部放在内存中
50:27 - 50:32
then having a single thread build the hash-table doing that first， scan is probably the
better approach
那么使⽤单线程来构建hash table并对其进⾏扫描这种⽅式可能会更好
50:33 - 50:36
because that way the you're just doing as much sequential i/o as possible
因为通过这种⽅式，在我们循序扫描时，我们⼀次能够尽可能多的获取数据
50.36-50.38
and the the disk head isn't jumping around
这就省去了磁头移动的时间
50:38 - 50:41
with an SSD you can do multiple simultaneous requests
如果使⽤的是SSD，那么你就可以同时处理多个请求
50:42 - 50:44
So therefore you could you do want to do build a hash table in parallel
So，那么你就可以并⾏构建hash table了
50:46 - 50:46
yes
请讲
50:50 - 50:53
so I said is there any reason we're not building the hash table in B here
So，出于什么原因，我不在B这⾥构建hash table？
50:58 - 51:00
Like that's what sort of partition is
这就是所谓的分区
51.00-51.05
like partition is sort of breaking this up dividing up ,and then multiple streams now can
do the probe
分区指的就是，我们将数据拆分到不同的分区中，然后我们就可以对多个数据流进⾏检测
51:05 - 51:10
so this is like this is just breaking the data up ，do different save for partitions
So，这其实就是将数据进⾏拆分，然后对这些分区做不同的操作
51:11 - 51:13
it's like this is like the grace hashed join
这和grace hash join很像
51:13 - 51:15
but we're still accessing a single hash table
但我们访问的依然是单个hash table
51.15-51.16
yes
请问
51:21 - 51:23
which is what's difference between the inner operator and the bushy join
他的问题是，inter-operator和bushy之间有啥区别
51:24 - 51:25
so that's what I'm saying it
So，正如我所说的
51.25-51.26
to me it's the same thing
对我来说，它们是⼀回事
51.26-51.29
the definition of bushy operator bushy parallelism is that
bushy parallelism的定义是
51:30 - 51:33
there's one part of the tree ,right
这是树的⼀部分
51.33-51.36
since turn bushy because it's so complete tree
因为它变得有些浓密，所以它是⼀棵完整的树
因为它的线程分配模式更像是⼀棵完整的树
51:36 - 51:38
this will make more sense when we talk about joins next class,
当我们下节课讨论join的时候，你们会更加清楚这个
51.38-51.41
but if there's right deep left deep trees ,right
左边有⼀个exchange⼦树，右边也有⼀个exchange⼦树
51:41 - 51:42
but this is like a bushy tree
但这就像是⼀棵bushy tree
51.42-51.46
because I'm doing join joining two tables over here, and joining two tables over here
因为我对左边两张表进⾏join操作，然后我⼜对右边两张表进⾏join操作
51:46 - 51:52
so I can have one thread do this join over here ,and another thought I do this join over
there
So，我可以使⽤⼀条线程来负责左边的join操作，另⼀条线程负责右边的join操作
51:52 - 51:54
and I don't need a coordinator between the two of them
在这两者之间我不需要使⽤coordinator
51.54-51.57
at this point up until we get after the exchange
直到进⼊了exchange operator后，我们才需要使⽤coordinator
51:57 - 52:04
so yes to me this is the same thing as what I showed here of the inter-operative
parallelism
So，没错，对于我来说，这和我之前所展示的inter-operator parallelism是⼀回事
52:04 - 52:07
but is calling it bushy parallelism
但这⾥我们叫它bushy parallelism
52:09 - 52:10
Correct, yeah
没错
52.10-52.15
yeah we're having one operator be its own worker
这个operator就是它⾃⼰的worker
52:15 - 52:19
This approach you see a lot like this kind of like every operator is its own worker
在这种策略中你会看到，每个operator就是它⾃⼰的worker
52:19 - 52:21
you see this a lot in like streaming systems
你会在数据流处理系统中会经常看到这种东⻄
52.21-52.29
like spark streaming Apache Hive flink or storm or Kafka,they have this is the
architecture they typically use
⽐如，Spark，Streaming，Apache Hive，Flink，Storm，或Kafka这些系统通常使⽤的都是这
种架构
52:29 - 52:33
but you can do it in database systems are probably gonna be do something more bushy
但在数据库系统中，我们可能就会做⼀些更bushy的事情
52:33 - 52:39 *********
because you want to have a you know single tasks you much work with the tuples as
much as possible going up as far as you can up into the tree
当你将数据往树上⽅上传的时候，我们想尽可能多传⼀点tuple上去
52:40 - 52:40
yes
请问
52:46 - 52:46
Correct
说的没错
52.46-52.47
yes
请问
52:49 - 52:50
this question is
他的问题是
52.50-52.53
in this exchange operator here for this one exchange
对于此处的这个exchange operator来说
52.53-52.57
it could either be shoving data up into this operator or into this operator how do I
decide
它既可以将数据传递给这个operator，也可以传给另⼀个operator，我该如何选择呢？
52:58 - 53:00
so this is something that we baked into the query plan
So，这也是我们纳⼊查询计划中的⼀部分
53.00-53.06
you would say you know here's I want to partition my database on this attribute just do
round-robin, just do hashing
你会说，这⾥我想基于我数据库表中这个属性来对数据进⾏分区，我想通过round-robin或者
hash处理来进⾏判断，即该将数据传给哪个operator
53:06 - 53:09
we'll talk a little bit about this at the in the class
我们会在课上稍微讨论下这个
53:10 - 53:13
but there's some logic in here to decide just they help you decide where to wrap the
data
这⾥会存在着某种逻辑，它能够帮你判断该如何处理数据
53.13-53.16
easy thing to do is just round-robin
⼀种简单的做法就是使⽤round-robin
53:20 - 53:21
but actually for this particular example
但实际上在这个例⼦中
53.21-53.26
you wouldn't want to do round-robin
你不会想去使⽤round-robin
53.26-53.31
because you need to know that there's some tuple over here that's coming on this side，
if it's gonna match for the tube over here
因为你需要知道左侧这边的tuple如果和右侧的tuple匹配上了
53:31 - 53:37
you want them to go to the same partition not you know not not different ones
你就会想让它们都去⼀个分区⾥呆着，⽽不是不同分区
53.37-53.39
cause otherwise you'll have false negatives
如果我的数据落地到不同的分区，这可能就会造成假阴性的效果（知秋注：就是为了⽅便使⽤布
隆过滤器）
53:41 - 53:44
yeah I should put next I'll fix the slide to make that more clear later
我之后会修下这张幻灯⽚，让它表达的意思更明⽩些
53:46 - 53:46
okay
53.46-53.51
so the right so that that's it for compute parallelism
So，这就是compute parallelism
53:51 - 53.52
again at a high level
从⼀个⾼级层⾯来看
53.52-53.57
the every database system that supports query parallelism in different manners
每个数据库系统都以不同的⽅式⽀持并⾏查询
53.57-54.01
is going to support exchange operator ,and in some form of it
它们都会⽀持某种形式的exchange operator
54.01-54.06
in how sophisticated they are depends on how complex the system is
它们的复杂程度取决于系统的复杂程度
54:06 - 54.10
The the thing though that I mentioned is that
之前我提到过
54.09-54.15
if we're running on slow disk and all our threads are getting blocked
如果我们所⽤的磁盘速度都很慢，并且我们的线程都被阻塞住了
54.15-54.18
because the things they need aren't in the buffer pool, and we have to go to disk and get
them
因为它们所需要的数据都不在buffer pool中，我们得去磁盘中获取这些数据
54:18 - 54:22
then all these extra cores and all this extra exchange operators we're doing is not going
to help us at all
我们所使⽤的所有这些额外的CPU core以及exchange operator在这件事上都不会对我们有所
帮助
在这种状况下，我们所使⽤的线程来做到并⾏所消耗的资源，并不会让我们变得更快，反⽽是⼀
种浪费
54:23 - 54:26
because we're always going to be bottleneck on doing that doing that request
因为我们在处理这个请求时，硬盘这个瓶颈始终存在
54:27 - 54:31
and so the way to get around this is through IO parallelism
So，解决这个问题的⽅法就是使⽤I/O parallelism
54:32 - 54:33
the basic idea here is
它的基本思想是
54.33-54.41
that we're going to break up the database systems files and data ,across different
locations on storage devices
我们会对数据库系统的⽂件和数据进⾏拆分，将它们分散到存储设备上的不同位置处
54:42 - 54:43
and we can do this a bunch of ways
我们可以通过⼀系列⽅法来做到这点
54.43-54.46
we could have multiple disks per database
⽐如，multiple disks per database （⼀个数据库放在多个磁盘上）
54:46 - 54:49
you can do it one database per disk
one database per disk（⼀个磁盘放⼀个数据库）
54:49 - 54:51
we do one one relation per disk.
one relation per disk（⼀个磁盘放⼀种关系）
54.51-54.52
split relation across multiple disk
以及将关系拆分到多个磁盘上
54:53 - 54:56
Again from the SQL standpoint from the application standpoint
从SQL和应⽤程序的⻆度出发
54:56 - 54.59
we don't know we don't care how this is all being set up
我们不知道，也不在意它们是怎么设置的
54.59-55.03
the database system hides all of us for us
数据库系统为我们隐藏了这⼀切
55:03 - 55:05
it's quite discussed is this like raid ,yes
这看起来像RAID吗？没错
55:05 - 55:09
so who here has heard a raid most of you okay
So，在座的有谁听过RAID？看来你们⼤部分⼈都听说过
55:10 - 55:13
so ray stands for a redundant array of
So，RAID的全称是emmm
55:15 - 55:17
so I know what it used to be call it ,I don't know what it's called now
So，我知道它以前叫什么，但它现在叫什么我不知道
55:18 - 55:20
it's Redundant Arrays of Independent Disks
它的全称是Redundant Arrays of Independent Disks（独⽴磁盘构成的具有冗余能⼒的阵列）
55.20-55.24
it used to be called we're done a array of in expensive disks
我们以前是⽤价格昂贵的磁盘来做RAID
55:23 - 55:28
and then the disk manufacturers want to use RAID, but didn't like to be calling in
expensive
磁盘⽣产商想去使⽤RAID，但不想成本太⾼
55.28-55.29
because they wanted to make their products for being cheap
因为他们想让他们的产品变得廉价
55:30 - 55:34
so they went back and had a change to be independent
So，他们现在就将他们的磁盘变得性价⽐很⾼
55:34 - 55:34
you see the idea here is that
通过幻灯⽚可以看到，这⾥的思路是
55.34-55.43
we can configure the system such that multiple storage devices are going to appear as a
single logical device to to the database system
我们可以对系统进⾏配置，我们让多个存储设备以单个逻辑设备的形式来供数据库系统使⽤


13-04
55:44 - 55:47
and we can do this either through a special hardware controller that's on our
motherboard
我们可以通过主板上的⼀个特殊硬件控制器来做到这点
55:47 - 55:49
We can do this through software itself
我们也可以通过软件⾃身来做到这⼀点
55.49-55.51
like the Linux kernel supports RAID configurations
⽐如Linux的内核就⽀持对RAID进⾏配置
55.51-55.53
or we have like a storage appliances
或者我们可以使⽤存储设备
55:54 - 55:56
that just provides this functionality for us
它可以为我们提供这种功能
55.56-55.59
and we have a fast interconnect direct to our system
我们可以将它直接和我们的系统连接起来，并且速度很快
56:00 - 56:01
But the main takeaway is that
我们从中所看到的事情是
56.01-56.06
for the most part for the RAID setup, this is gonna be completely independent to the
database system
在⼤多数情况下，对于RAID设置来说，它和数据库系统是完全独⽴的
56:07 - 56:13
it doesn't know doesn't care that the database broke up to multiple devices, or the my
storage is broken across multiple devices
它不知道，也不在意数据库有没有被拆分到多个设备上，或者我的存储有没有被拆分到多个设备
上
56:13 - 56:14
in this case over here
在这个例⼦中
56.14-56.16
this is something that database system manages
这些是由数据库系统所管理的东⻄
56.16-56.20
and therefore it can be smart and make decisions about how its gonna plan its queries
因此，它就可以很智能地做出决策，即该如何执⾏它的查询计划
56:21 - 56:24
Because it knows how the data is actually being laid out on different devices
因为它知道数据是如何排列在不同的设备上的
56.24-56.26
and it knows the speed of those devices
并且它也知道这些设备的速度是多少
=====================================================================
==
56:26 - 56:28
So let's say we have a really simple example here
So，这⾥我们来看个很简单的例⼦
56.28-56.32
we have a database that has six pages
我们有⼀个数据库，它⾥⾯有6个page
56:33 - 56:34
so this is an example of RAID 0
So，这是个RAID 0的例⼦
56:35 - 56:37
it's just it's just called striping
我们将它叫做Stripping（数据分条技术）
56:37 - 56:38
so what happens is that
So，这⾥所发⽣的事情是
56.38-56.40
as the database system creates these pages and write to them
当数据库系统创建了这些page，并往它们写⼊数据时
56:40 - 56:42
there's some RAID controller up in here
这⾥会存在这某种RAID控制器
56.42-56.49
that then decides or you go here, you go there, I decide them as a round-robin
approach which device to write it to
接着，它会根据Round-Robin策略来决定你该往哪个存储设备上写数据
56:49 - 56:56
and it knows internally it has its own metadata to say oh I need page 1, I know it's on
this disk let me let me go get it
在它内部有⼀个元数据，它会说：Oh，我需要page 1，我知道它在这个磁盘上，那我去拿到这
个page
56:58 - 57:00
but again the databases system doesn't know these things
但是数据库系统不知道这些东⻄
57:01 - 57:04
another most common approach is to do Mirroring
另⼀种常⻅的做法就是Mirroring（磁盘镜像）
57.04-57.08
and basically that now every single device has a complete copy of every single page
简单来讲，每个存储设备上⾯都会保存⼀份该page的副本
57:08 - 57:16
and do you have some Erasure Coding or other other methods to make sure that you
know if one disk goes goes down，you can recreate it by it from the other pages
如果其中⼀个磁盘挂掉了，那么你可以通过某种纠错码或者其他⽅法来从从其他磁盘上的page
你可以通过某种纠错码或者其他⽅法来确保在⼀个磁盘挂掉的情况下，你可以通过它从其他磁盘
上保存的page来重新创建该page
57:18 - 57:18
yes
请问
57:21 - 57:22
this question is
他的问题是
57.22-57.26
is RAID 1 end up being a bit slow for writes yes for reads no
RAID 1的速度是不是有点慢，对于数据写⼊是这样的，对于数据读取就很快
57:26 - 57:30
because for reads I can say, alright well I assume my hardware is Ok
对于数据读取来说，假设我的硬件没有任何问题
57:30 - 57:31
so I can go to any one of these
So，我可以从其中任意⼀个磁盘上读取数据
57.31-57.37
and now I could have one one thread reading page one, another thread reading page
two, on separate devices and that's all fine
我可以让⼀个线程去读取page 1，另⼀个线程去读取page 2，它们可以通过不同的设备上进⾏
读取，这样是ok的
57:37 - 57:38
For the write
对于写⼊数据来说
57.38-57.43
I need to make sure that that it's propagated across all of them ,that makes that more
expensive
我得确保这些写⼊的数据传播到所有的磁盘上，这就使得写⼊的代价很昂贵了
57:43 - 57:46
there's way more this is like the most basic thing you need know about RAID
这些就是关于RAID你所需要去知道的最基本的东⻄
57.46-57.49
there's way more complicated setups like RAID 5 RAID 10
这其中还存在着更复杂的设置，⽐如RAID 5和RAID 10
57:49 - 57:52
but they can do you know combinations of these different things
但你知道的，我们可以结合着来⽤它们
57:53 -57:53
yes
请问
57:55 - 57:59
round-robin is just like like you're dealing cards
Round-Robin其实有点像是你在给⼈发牌
58:00 - 58:01
you just everybody gets one
每个⼈都会拿到⼀张牌
58:01 - 58:04
and then when you reach the end you go back round and do it all over again
当你发完⼀轮后，开始发下⼀轮牌
58:05 - 58:08
right I don't know what the round rock, I don't know what the Robin stands for this like
其实我不清楚这个robin指的是啥
58:09 - 58:14
Let me play like kids growing up we play games you round robin just you know hand out
things and in that order
但简单来讲，这就像是我们⻓⼤后所玩的那种轮流发牌的游戏
58:15 - 58:17
yeah I really that's an American colloquialism
这是⼀种美式⼝语
58:19 - 58:19
okay
58:21 - 58:25
so the RAID stuff we just talked about that's all transparent to the DBMS
So，对于DBMS来说，我们所讨论的这些RAID的内容，它是看不⻅的
58:26 - 58:30
the thing that we can be smart about though is is the partitioning stuff that we talk
about a little bit so far
关于分区这块内容，⽬前为⽌，我们已经讨论过⼀些了
58:31 - 58:33
so the idea with database partitioning is that
So，数据库分区的思路是
58.33-58.41
we going to be able to split the database up into disjoint subsets, that can then be
assigned to discrete disks
我们可以将数据库中的数据拆分为不相交的⼦集，然后将它们分配给离散的磁盘
58:42 - 58:43
and then what happens is now
那么，现在所发⽣的事情是
58.43-58.46
the DBMS buffer pool manager knows that if I need to read a page
DBMS buffer pool管理器知道，如果我需要去读取⼀个page
58.46-58.51
it knows what partition or what disk location is going to have that the data that is
looking for
它知道我们所查找的那个数据是存放在哪个分区或者磁盘位置上的
58:53 - 58.55
so the easiest way to do this kind of partitioning
So，实现这种分区的最简单⽅法是
58.55-58.57
if your database system supports
如果你的数据库系统⽀持的话
58.57-59.01
you know one database per one file per database，one directory for database
你知道的，⽐如⼀个⽂件就是⼀个数据库，或者⼀个⽬录就是⼀个数据库
59.01-59.06
is that you're going to set ups in links to to have the these different directories point to
different disks
你可以设置软链接或者硬链接，来让这些不同的⽬录指向不同的磁盘
59:08 - 59:12
The high end systems actually can know about those different devices that can do that
mapping for you
实际上，⾼端的数据库系统可以为你做到这种映射
59.12-59.17
and you know and within like a centralized location as an administrator
这个⾼端数据库系统就像是⼀个数据中⼼管理员，它可以根据软链接或者硬链接来将数据分配到
不同的磁盘上（知秋注：就好⽐我们的windows⽂件系统，它就像是数据中⼼管理员，我们⽆须
关⼼底层是⼏块硬盘，你要往c盘存储时，系统会将数据存储到c盘，c中也可以放置指向d盘某
个位置的快捷⽅式，即软链接，根据这个快捷⽅式就直达d盘这个位置了，⽽d盘可能在另⼀块
物理硬盘上）
59:18 - 59:23
but a quick and dirty thing like for MySQL for example, is just move data around and
puts in links set up
以MySQL这样的系统为例，我们将这些数据放到所对应的位置，我们通过这些链接（快捷⽅
式）来和这些数据联系起来
59:24 - 59:25
the log file though is the tricky part
对于log⽇志⽂件这种，处理起来也是相当棘⼿
59.25-59.27
we‘ll talk about what a log file is later on
我们之后会去讨论该如何处理log⽂件
59.27-59.30
but that's basically the record of all the changes we made
但简单来讲，log⽂件上保存的是我们对记录所做的所有修改
59:30 - 59:33
and that usually needs to be stored in the centralized location
通常情况下，log⽇志这种东⻄是需要被存放在中央位置的
59.33-59.36
but if you're now if you have different devices
但如果你有多个不同的存储设备
59:36 - 59:38
And you need to shard your log file
那么就需要对log⽂件进⾏分⽚
59.38-59.39
that's something a DBMS has to do for you
DBMS得为你做到这点
59.39-59.41
it's not something you can fake out with a file system
这并不是你可以通过⽂件系统所可以伪造的东⻄
59:43 - 59:46
so let's quickly talk about partitioning a little bit
So，我们来快速讨论下分区相关的内容
59.46-59.49
that'll help understand how we're dividing up the work for exchange operators
这能有助于我们去理解该如何为exchange operator去分配任务
59:49 - 59:52
and then we'll spend more time talking about this in distributed databases
然后，我们会花更多的时间在分布式数据库中讨论这个问题
59.52-59.54
because this is the key idea that they take advantage of
因为这是他们在分布式数据库系统中所使⽤的关键思想
59:55 - 59:59
so the idea of partitioning is that we want to take a single logical table And then split up
to disjoint subsets
So，分区的思想在于，我们想去拿到⼀张单个逻辑表，并将该表中的数据拆分为不相交的⼦集
59:59 - 01:00:05
, that can then be stored and managed separately on our different storage devices
然后，我们将这些⼦集分别存放在不同的存储设备上，并对它们进⾏管理
01:00:07 - 01:00:08
and ideally
理想情况下
1.00.08-1.00.11
we want our partition to be transparent to the application
我们希望我们的应⽤程序是看不到这些分区的
1.00.11-1.00.14
sometimes we'll let you tell it how you want to partition things
有时我们会让你告诉数据库系统你想对它⾥⾯的数据进⾏怎样的分区
1.00.14-1.00.17
all the systems will do it for you automatically
所有系统会⾃动为你做到这⼀点
01:00:17 - 01:00:24
and we don't want to have to have somebody be cognizant of when they write a SQL
query of where their data is actually being located
当别⼈在写SQL查询的时候，我们不希望他们知道他们的数据实际上是放在哪⾥的
01:00:25 - 01:00:27
it's not always the case in distributed databases
在分布式数据库中，我们并不会总是遇上这种情况
1.00.27-1.00.31
because it's good to know that if I'm running doing join between two tables
如果我们对两张表进⾏join操作
01:00:32 - 01:00:35
and that table one another's tables is in a remote location
表1保存在⼀台远程服务器上
1.00.35-1.00.36
maybe I don't want to write that SQL query
可能我并不想编写涉及到该表的SQL查询语句
1.00.36-1.00.39
because that's going to take me a long time to get the data that I need to process it
因为我得花很⻓时间才能拿到我需要处理的数据
01:00:40 - 01:00:41
but in general
但⼀般来讲
1.00.41-1.00.46
we don't want our any users to have to be know anything about where the data is
actually being stored
我们不想让我们的⽤户知道数据实际的保存位置
01:00:47 - 01:00:49
so there's two approaches to partitioning
So，我们可以通过两种⽅法来进⾏分区
01:00:50 - 01:00:52
there's vertical partitioning and horizontal partitioning
即垂直分区和⽔平分区
01:00:52 - 01:00:54
horizontal partitioning is what people are most familiar of
⽔平分区是⼈们最为熟悉的⼀种分区⽅法
1.00.54-1.00.57
if you know about distributed databases you know about sharding
如果你了解分布式数据库以及数据库分⽚的话
1.00.57-1.00.59
that's what horizontal partitioning is
那么这就是所谓的⽔平分区
01:01:00 - 01:01:03
Vertical partitioning is just the column store stuff that we've already talked about before
垂直分区其实就是我们之前所讲的列式存储⽅⾯的东⻄
01:01:03 - 01:01:05
so I have a table it has four attributes
So，假设我有⼀张表，它⾥⾯有4个属性
01:01:06 - 01:01:10
so I could take this attribute here, and just store that in a separate partition
So，我可以拿⾛该表中的⼀个属性，并将它保存在⼀个单独的分区中
01:01:11 - 01:01:11
all right
1.01.11-1.01.14
and a separate file on a separate disk and separate storage device
即将以⼀个单独的⽂件放在⼀个单独的磁盘或存储设备上
01:01:15 - 01:01:16
and so what will happen is
So，这样做会发⽣的事情是
1.01.16-1.01.23
if most of my queries only need touch data over here ,and these between three
attributes things are super fast
如果我的⼤部分查询只需要涉及分区1中的数据，即这三个属性的数据，那么就会⾮常快
01:01:21 - 01:01:23
because I'm just reading exactly data that I need
因为我只读取了我所需要的数据
01:01:23 - 01:01:27
but anytime I have a query that wants to combine these two things just like in a column
store
但有时候，在列式存储数据库中，我想通过查询将这两个分区的数据合并起来
01:01:27 - 01:01:31
I got to go do fetches of these separate locations ,and stitch it back together to its
original form
那么我就得跑到这两个分区中去获取数据，然后将这两个分区中的数据粘起来变回它原来的形式
01:01:33 - 01:01:36
so some systems support vertical partitioning
So，有些数据库系统⽀持垂直分区
1.01.36-1.01.39
as a way to sort of approximate what a column store is
它们所使⽤的是⼀种类似于列式存储的⽅式
01:01:40 - 01:01:41
but it's not exactly the same
但并不完全相同
1.01.41-1.01.49
because the the systems that do this don't take advantage of like you know these
columns are all the same values, and give you compression
因为这些系统并不会利⽤⼀些东⻄（⽐如：如果这些列中的值都是相同的，那么就可以对这些列
进⾏压缩）来做到这点
01:01:49 - 01:01:54
and have a you know the query execution approach is can be optimized or do operating
on column-store
你知道的，我们可以对这些查询执⾏策略针对列式存储来进⾏优化
01:01:54 - 01:01:59
but this is sort of a halfway point to get you some of the benefits of a column store
它只是给我们提供了⼀些列式存储的好处罢了
1.01.59-1.02.01
but not entirely the same thing
但它们所提供给你的并不是完全相同的东⻄
01:02:01 - 01:02:04
there again as I said the most common approach is to do horizontal partitioning
正如我所说过的那样，⽔平分区是我们最常⻅的⼀种分区⽅式
01:02:06 - 01:02:11
and this is where we're going to split up the table based on some attribute value
我们根据表中的某些属性值来对表进⾏拆分
01:02:11 - 01:02:16
and so that all the data for a single tuple will be located together within a single partition
So，⼀个tuple中的所有数据就会被放在⼀个分区中
01:02:17 - 01:02:22
so now if query says go get me tuple #1, I go just this partition and get it
So，如果有⼀个查询要去找到tuple 1，那我就会去这个分区1中找到这个tuple
01:02:22 - 01:02:25
if I have another query says go give me partition or tuple #3, I go to this partition to get
it
如果另⼀个查询要找到tuple 3，那么我就会去这个分区2中找到这个tuple 3
01:02:26 - 01:02:32
and now I could have multiple workers running in parallel, and both operating on these
different partitions at the same time
那么我就可以通过多个worker同时对这些不同的分区并⾏处理
01:02:33 - 01:02:37
So now how you do this horizontal partitioning can vary across these different systems
So，在不同的数据库系统中，⽔平分区会怎么样呢？
01:02:38 - 01:02:42
again we'll cover more about this in when we talk about it distributed databases
当我们谈论分布式数据库的时候，我们会对此深⼊介绍
01:02:44 - 01:02:46
right just to finish up quickly
快速总结下
1.02.46-.02.47
so parallel execution is important
So，并⾏执⾏很重要
1.02.47-1.02.48
it's everywhere
它⽆处不在
01:02:48-1.02.54
Every single major system is going to support some variants of parallel execution
每个主流数据库系统都⽀持⼀些并⾏执⾏的变体实现
01:02:55 - 01:02:59
And whether that means running multiple queries at the same time or taking one query
and dividing it up
⽐如：同⼀时间执⾏多个查询，或者将⼀个查询分为多个⼦任务来并⾏执⾏
01:02:59 - 01:03:03
and how you divide it up could be the intra-operator parallelism, inter-operator parallels
and the bushy stuff
你们可能会去使⽤intra-operator parallelism，inter-operator parallelism或者bushy
parallelism
01:03:05 - 01:03:12
the things that are super hard to get right are things that we've covered out we covered
so far, in the semester and we'll cover more later on and going forward
⽬前为⽌，我们已经对这些超级难的东⻄有所介绍了，我们会在这学期之后对这些东⻄进⾏深⼊
介绍
01:03:12 - 01:03:18
Is how do we coordinate multiple threads doing you know operating on the same thing at
the same time ,without in any other incorrect results
⽐如：在不产⽣任何错误结果的情况下，我们会去对同⼀时间操作相同数据的多线程进⾏协调
01:03:19 - 01:03:23
again we'll focus this way more when we talk about transactions concurrency control
再说⼀遍，我们会在讨论事务和并发控制的时候，我们会将重⼼放在协调上⾯
1.03.23-1.03.26
but for read-only stuff this is not that not that big of a deal
但对于只读操作来说，这并不是什么⼤问题
01:03:28 - 01:03:31
All right, any high-level questions for the parallel execution
对于并⾏执⾏你们有什么⾼逼格的问题吗
01:03:36 - 01:03:38
this question is what is it between the column store and vertical partition
他的问题是，列式存储和垂直分区有啥联系
01:03:39 - 01:03:41
it's like it's like a
01:03:43 - 01:03:45
yeah but you still can do that in a column store
你依然可以在列式存储中做到这点
1.03.45-1.03.47
it's it's just at a high level it's the same thing
从⾼级层⾯来讲，它们是⼀回事
01:03:48 - 01:03:50
But usually what happens is
但通常这⾥所发⽣的事情是
1.03.50-1.03.55
vertical partitioning will be you can do this in a row store system
你可以在⾏存储数据库系统中进⾏垂直分区
01:03:56 - 01:03.59
but you'll do this but like when you actually process the queries
但当你处理查询时
1.03.59-1.04.02
you're not doing it in a way that's efficient for for a column store
对于列式存储来说，这种做法并不⾼效
01:04:03 -01:04:06
like you may be still doing the iterator model going one tuple at a time
可能你使⽤的依然是iterator model，⼀次只获取⼀个tuple
01:04:07 - 01:04:08
or you don't compress this data
或者，你不⽤去压缩数据
1.04.08-1.04.09
because you know it's all the same value
因为你知道它们的值都是⼀样的
1.04.09-1.04.12
it just says I just tell my attributes you go here you go there ,
我会告诉我的属性，这个属性应该在这个分区，然后那个属性应该在那个分区
1.04.12-1.04.15
and then everything up above still looks the same
那么这上⾯所有东⻄看起来都是⼀样的
01:04:30 -01:04:33
your question is to partition ...... sorry repeat your question
麻烦重复下你的问题
01:04:44 - 01:04:45
No no no no
你讲的有问题
1.04.45-1.04.51
so you question is how do I figure out where divide this thing up
So，你的问题是，我该如何对表进⾏分区
01:04:51 - 01:04:54
you know this, you know that you know the schema is
你知道schema是什么
1.04.54-1.04.56
you know that oh I want to partition attribute four
你知道的，我想通过属性attr4来进⾏分区
1.04.56-1.04.58
I know for every tuple here's the offset for it
我知道每个tuple都有offset值
我知道attr4在每个tuple中offset值的位置
01:04:59 - 01:05:01
so I know exactly how to split it up and move it over there
So，我知道该如何对表进⾏拆分，然后将这部分移动到这个分区中
01:05:02 - 01:05:04
you're not gonna split this thing up in half accidentally
你不会不⼩⼼将这张表分成两半
01:05:06 - 01:05:07
right you're doing this on a per tubule basis
你是根据每个tuple来进⾏拆分的
1.05.07-1.05.10
you're not blind knees taking a chunk of data
你不会盲⽬地去获取⼤量数据
1.05.10-1.05.12
I think of this as continuous memory continuou page
我认为它们是在⼀段连续的内存中，或者连续的page中的
01:05:13 - 01:05:18
so I know how to jump to this offset for tuple one, we stayed over here, and do the same
thing for all the other ones
So，我知道如何根据offset值来跳转到tuple 1内部中的位置，对其他tuple也是⼀样的
01:05:19 - 01:05:19
yes
请问
01:05:23 - 01:05:23
it's question is
他的问题是
1.05.23-1.05.28
is this user define or is it something a database system can automatically do, this is
typically user defined
这些东⻄是由⽤户定义的，还是数据库系统为我们⾃动做的，这通常是由⽤户定义的
01:05:28 - 01:05:29
there's no reason it couldn't be automatic
我们没有理由让它⾃动去做这种事情
1.05.29-1.05.33
and so the high end systems have tools to help with this
So，⾼端的数据库系统都会为我们提供⼯具来帮我们做到这点
01:05:33 - 01:05:35
but in general this is user defined
但通常来讲，这是⽤户定义的
1.05.35-1.05.36
same thing for this one here
对于⽔平分区来说也是⼀样的
1.05.36-1.05.38
this is usually a user defined
这通常是由⽤户定义的
1.05.38-1.05.39
but doesn't have to be
但也可以是数据库系统定义的
01:05:42 - 01:05:46
Alright, the midterm, let's talk about that that's fun right
好了，我们来讲下期中考试吧
01:05:48 - 01:05:49
um so who needs to take it you
谁要参加这场考试呢？不⽤说，就是你们了
01:05:50 - 01:05:51
what are your to take midterm exam
你们要做什么呢？期中考试！
1.05.51-1.05.54
when next Wednesday 12 o'clock in this room
时间地点，下周三12点，这个房间
1.05.54-1.05.56
and why
Why
1.05.56-1.05.58
this video will answer all the questions in life ,okay
这个视频会解答你们的所有问题
01:05:59 - 01:06:06
so the exam will cover everything up to and including everything we talked about today
query execution part two
So，考试内容包括⽬前为⽌我所讲的所有内容，这也包括我们今天所讨论的查询执⾏的第⼆部
分
01:06:06 - 01:06:10
it will not include anything on query optimization that we talk on Monday, okay
但这并不包括我们下周⼀要讲的查询优化⽅⾯的知识
01:06:10 - 01:06:12
if you need special accommodations
如果你需要特殊照顾
1.06.12-1.06.13
please contact me as soon as possible
请尽快联系我
1.06.13-1.06.16
some of you already done this ,and what will take care of you
你们中有些⼈已经这么做了，我们会照顾你的
01:06:16 - 01:06:20
and then there's a if you go to this URL here
如果你访问这个⽹址
1.06.20-1.06.25
this will take you to the sort of it's the same information I'm showing here a study guide
它会向你们展示的信息和我所展示的学习指南⼀样
01:06:25 - 01:06:28
it'll also include a practice exam with the solutions
它还会提供⼀份例题以及对应的答案
1.06.28-1.06.32
that I'll upload later today later tonight ,I haven't done that yet, okay
我今晚会上传这个，现在我还没做好
01:06:34 - 01:06:38
all right so what do you need to bring, your CMU ID ,you need to bring a calculator
So，你们参加考试需要带哪些东⻄呢？你的学⽣卡，你还要带⼀个计算器
01:06:38 - 01:06:39
right because if you've done the homework
如果你已经做完了作业
1.06.39-1.06.42
so you know that you have to do some basic logs to compute the math
So，那么你就会知道，你得做些基本的log运算
01:06:43 - 01:06:50
and then you're allowed to have a one by you know standard 8.5x11`` pape of
handwritten notes (double-sided)
我允许你们带⼀张8.5*11⼤⼩的双⾯⼿写笔记
01:06:51 - 01:06:54
No taking the the slides you should write down super small
你们不能带幻灯⽚这种东⻄，你们应该将它写下来
1.06.54-1.06.55
everything has to be handwritten
所有笔记都得是⼿写的
1.06.55-1.06.58
and again you can use both sides put anything you want on it,okay
再说⼀遍，这张纸的两⾯都能写笔记，你们想写什么都⾏
01:06:59 - 01:07:01
so this list keeps expanding every year
So，这份列表中的内容每年都在增加
1.07.01-1.07.02
here's what not to bring
这部分所展示的是你们不应该携带的东⻄
1.07.02-1.07.05
first year 20 brought a live animal did you not do that
第⼀年有⼈带了活体动物来考试，你们别这么搞事情
01:07:07 - 01:07:10
last year somebody brought their wet laundry or two years ago there's a wet laundry
去年还不知道是前年，有⼈考试的时候带了湿的⾐服
01:07:11 - 01:07:11
it was kind of weird
这很奇怪啊
1.07.11-1.07.14
he's like oh oh you have laundry why you bring this
明明你有洗⾐机，为什么还要把洗的⾐服带到考场
1.07.14-1.07.19
oh because I wash my clothes ,I didn't time put the dryer I didn't leave it there before the
exam
他说因为我正在洗我的⾐服，在考试前，我没时间将这些洗好的⾐服放进烘⼲机
01:07:19 - 01:07:23
and so he starts spreading out his clothes on don't do that
于是他把他的⾐服摊开在桌⼦上，emm，你们懂的，不要瞎搞事情
01:07:24 - 01:07:31
last year this kid brought uh I knew this existed, it's like a it's like a holy candle, but it
has Jennifer Lopez on it
我还记得去年有个娃，带了⾹烛过来，但上⾯的不是耶稣，⽽是Jennifer Lopez
01:07:32 - 01:07:36
don't bring that, he was internal AC like I like the smell
不要把这种东⻄带过来，虽然我很喜欢那个蜡烛的味道
01:07:38 - 01:07:40
don't do that,okay
但还是别这么做
01:07:41 - 01:07:42
All right so what do you need to know
So，你们需要知道些什么呢？
1.07.42-1.07.46
for you need to understand the basis of the relational model relational algebra
你们需要去理解关系模型和关系代数的⼀些基本知识
01:07:47 - 01:07:49
we focus on the integrity constraints
我们的重点是integrity constraints（完整性约束）
1.07.49-1.07.50
what does it mean for a foreign key
⽐如，对于外键来说，这意味着什么
1.07.50-1.07.56
what does it mean to have a you know primary key ,secondary key, I some basic things
我们还会涉及主键，次要键之类基本的东⻄
01:07:57 - 01:07.58
for SQL
对于SQL这块
1.07.58-1.08.02
we not going to ask you to write raw SQL on on the exam, because that's the paymaster
grade
我们不会要求你们在考试中写SQL语句，因为它很基础
01:08:02 - 01:08:07
But if we show you a SQL statement you should understand what it does and what it
means
但如果我向你们展示⼀个SQL语句，你们得知道它是⼲什么⽤的
01:08:08 - 01:08:08
right
01:08:09 - 01:08:16
so the more complex operations were going to care about will be the joins the
aggregations and the common table expressions
So，我们还去关⼼些更复杂的操作，⽐如：Join，聚合操作，公共表表达式（common table
expressions）
01:08:16 - 01:08:20
you don't need to worry about window functions ,CTE sub queries and things like that
你不需要去关⼼window函数，cte⼦查询之类的东⻄
01:08:22 - 01:08:22
for storage
对于存储这块
1.08.22-1.08.26
we talked about different replacement policies for for the buffer pool management
我们讨论了buffer pool管理这块的⼏种不同替换策略
1.08.26-1.08.28
LRU MRU and clock
⽐如，LRU，MRU和Clock这⼏种算法
1.08.28-1.08.32
we talked about different ways to represent the the heap file
我们也讨论了表达heap⽂件的⼏种不同⽅式
01:08:32 - 01:08:37
or so on-disk file this is you can either gonna be table heaps or the linked list
我们可以通过table heaps或链表来表示磁盘上的⽂件组织结构
01:08:38 - 01:08:41
and then for the page layout it can be either the slotted pages or the log structured
接着，对于page layout来说，它可以是slotted page，也可以是log-structured所组成的
01:08:42 - 01:08:47
And again this would be like high-level questions about the implications of one versus
the other
这⾥⾯会有⼀些⾼级问题，⽐如，两者之间的关系
1.08.47-1.08.51
not like, you know draw me a diagram of what a log structure page looks like, or what I
want a slotted page looks like
我不会让你们去画log-structured page的结构图，或者slotted page的结构图
01:08:53 - 01:08:57
for our hash table we talked about with static hashing and dynamic hashing schemes
对于hash table这块，我们讨论了static hashing和dynamic hashing这两种⽅案
01:08:58 - 01:09:02
so we talked about the linear probing hashing with the Robin hood hashing and the
cuckoo hashing
在static hashing中，我们讨论了linear probing hashing，Robin hood，以及cuckoo hashing
01:09:02 - 01:09:07
what are the what are the implications of these ,why is one better than other, what
problem they trying to solve
我们讨论了它们的影响，为什么⼀个要⽐另⼀个好，以及它们所试着解决的问题是什么
01:09:08 - 01:09:11
right are they better for reads or writes
对于读操作或者写操作来说，是不是来的更好
1.09.11-1.09.12
dynamic hashing schemes
在dynamic hashing这种⽅案⾥
1.09.12-1.09.17
extendable hashing ,linear hashing ,and then bucket hashing should be in there as well I'll
fix that, right
我们讨论了extendible hashing，linear hashing以及bucket hashing，虽然我这⾥没有写
bucket hashing，但我之后会补上
01:09:17 - 01:09:19
look if why would you want to use one of these versus another
我会问这些问题，⽐如：为什么你会想⽤这种hash table⽽不是另⼀种
1.09.19-1.09.24
when would you want to use one in join, when when would you want to use one for an
index
为什么你想在join中使⽤这种hashing，为什么你想在索引中使⽤另外⼀种hashing
01:09:24 - 01:09:26
Like high level questions about these things
我会问⼀些有关这⽅⾯的⾼级问题
01:09:27 - 01:09:29
we talked a lot about tree indexes
我们讨论了⼤量关于tree index⽅⾯的内容
1.09.29-1.09.30
in particularly the B+tree
特别是，B+ Tree
1.09.30-1.09.33
how to do insertions/deletions and we'll split and merges
如果进⾏插⼊和删除，以及节点的拆分和合并
01:09:34 - 01:09:37
the difference between a B+tree and a B-tree
还讨论了B+ Tree和B- Tree之间的区别
01:09:38 - 01:09:42
again what are the performance implications of that in a disk or in a database system
where everything may not fit in memory
如果数据没法都放在内存中，那么放在磁盘上的话，对于数据库系统来说，性能⽅⾯有什么影响
呢
01:09:43 - 01:09:44
how did you latch crabbing and coupling
如何进⾏latch crabbing和latch coupling
1.09.44-1.09.48
and how to do tranversal or scans along leaf nodes
如何进⾏遍历，或者说，沿着叶⼦结点进⾏扫描
01:09:48 - 01:09:50
Right,how to deal with deadlocks
如何应对死锁问题
1.09.50-1.09.53
and we talked a little bit about radix trees or suffix trees
我们还谈论了点关于Radix tree和Suffix tree相关的内容
01:09:53 - 01:09:57
again will ask you high-level questions not like you know draw me an exact diagram of
something
再说⼀遍，我会去问你们⼀些⾼级问题，⽽不是那种画张图之类的简单问题
01:09:59 - 01:10:00
for sorting
对于排序这块
1.10.00-1.10.01
we talked about different algorithms
我们讨论了不同的排序算法
1.10.01-1.10.04
that the 2-way external merge sort and the general merge sort
⽐如，2-way external merge sort和通⽤的external merge sort
01:10:04 - 01:10:11
so understand the cost if I give you a bunch of buffer pages, that give you a bunch of
data pages, what is the cost of doing that sort
So，你们还得去理解这样做的成本是多少。如果我给你⼀堆buffer page，和⼀堆data page，
那么进⾏排序的成本你们要能够算出来
01:10:13 - 01:10:13
for the joins
对于join这块
1.10.13-1.10.19
the different variants of them Nested loop join the sort-merge join， hash join again
what are the cost of doing these joins
我们讨论了它的不同变种，⽐如：nested loop join，sort merge join，以及hash join。我们还
讨论了不同join算法的成本是多少
01:10:19 - 01:10:20
when is one better than other
什么时候⼀个算法要⽐另⼀个来得好
1.10.20-1.10.25
one of extreme cases like if everything is all the same value, which one would be better
than another
⽐如在某种极端情况下，如果所有东⻄的值都是⼀样的，那么哪个算法才会更好呢？
01:10:27 - 01:10:32
right how do we do multiple keys, or composite keys and who joins in these things
我们该如何根据多个key或者composite key来进⾏join呢
01:10:34 - 01:10.36
and then the thing we finished up today would be the processing models
然后就是我们今天所讨论完的处理模型
1.10.36-1.10.43
what are the advantages and disadvantages of the iterator model versus ,the
materialization model, versus the vectorized model
我们讨论过iterator model，materialization model以及vectorized model这三者间的优缺点
01:10:43 - 01:10:44
top-down versus bottom-up
我们还对top-down和bottom-up这两者进⾏了⽐较
1.10.44-1.10.53
and what the different advantages are different approaches of doing parallel query
execution Intra-operator parallelism inter-operator parallelism and the bushy parallelism
在做并⾏执⾏查询时所使⽤的不同策略（intra-operator parallelism， inter-operator
parallelism 以及bushy parallelism），它们各⾃的优点是什么
01:10:54 - 01:10:57
ok ,any questions about the midterm ,yes
对于期中考试你们还有什么问题吗？请问
01:11:01 - 01:11:09
this question is it this question is what do you think this question is are we responsible
or any C++ code, what do you think the answer is, right
他的问题是，我们要不要去写C++代码？你觉得呢？
01:11:09 - 01:11:10
because I how am I gonna grade that right
你不写我怎么给你打分呢？
1.11.10-1.11.14
run for it like 90-something kids run that through a compiler, I'm not doing that
不过我不会使⽤编译器来运⾏这些代码
01:11:17 - 01:11:18
not that cool, okay
没这么Cool
01:11:19 - 01:11:22
any other questions ,yes
还有其他问题吗？请问
01:11:24 - 01:11:27
do I write in person that's what moms do you read it ,No
01:11:30 - 01:11:30
yes
请讲
01:11:32 - 01:11:35
I'll try to put the sample up later tonight, yeah
我之后会将例题放出来
01:11:36 - 01:11:42
again and what do you need to bring, CMU ID, calculator, if you need it ,not your phone
like a regular standalone calculator
考试的时候你们需要携带这些东⻄，CMU学⽣卡。如果你需要的话，计算器也可以，不要拿你
的⼿机当计算器，你们只能带那种科学计算器
01:11:43 - 01:11:51
and a one in a pie lab mashite of handwritten notes you can use both sides, what not to
bring live animals ,candles, wet laundry
你可以带⼀张双⾯写满笔记的纸，你们可别带活体动物，蜡烛，湿的⾐服之类的东⻄
01:11:52 - 01:11:54
you can bring food if you want, I don't care
如果你想带吃的，那就带吧。我不在意
01:11:55 - 01:11:57
All right next class we're talk about query planning & Optimization
All right，下节课我们会去讨论查询计划和查询优化
01:11:58 - 01:12:03
Now so we're putting it all together and Findly taking a SQL query and generateing
these query plans ， we'll see how to do that
So，我们会将我们讲的东⻄都放在⼀起，以⼀个SQL查询为例，⽣成这些查询计划。我们会看
看这些是如何做到的
01:12:04 - 01:12:07
okay ,guys, see you on Monday
Ok，周⼀再会