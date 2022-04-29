

00:16 - 00:21
they're an event I'm missing on campus or so what is today 
我是不是错过了今天学校的活动？
00:22 - 00:22
free cake
免费的蛋糕？
0.22-0.25
that's pretty weak
这没啥吸引力
0.25-0.27
 ,all right DJ drop tables thank you always 
感谢DJ Drop Table一直以来的节奏
00:27 - 00:33
all right let's those are here let's look at through this 
我们来看下今天要讲的东西


00:33 - 00:39
so again this is just the outline for the many things for you guys in the semester 
So，这是你们这学期要经历的一些东西
00:40 - 00:42
again these dates are all available on the website 
它们的截止日期我都贴在网站上了
00:43 - 00:50
and then the first feedback review of the extra credit what we do this Sunday 
我们会在这周日的时候对你们Extra Credit作业给出第一次反馈
00:50 - 00:53
and then I also post on Piazza last night 
这个我昨晚就在Piazza上贴出来了
00:53 - 00:54
if you haven't done this to already 
如果你还没完成
0.54-0.58
please go vote for what database systems you want me to cover on the last day
请先去投一下你想让我最后一天要讲的数据库系统
0.58-0.58
yes 
请问
01:09 - 01:13
Bi~ result of what sorry, the result of what sorry 
什么东西的结果？
01:14 - 01:18
Bi~ result oh yeah right yeah no I have not heard back yet
亲子鉴定的结果，其实我现在也还不知道
01:19 - 01:23
I will try if it comes in I will announce on the last day of class
如果报告能在最后一节课前出来的话，我就会在那个时候宣布
01:25 - 01:30
I send a send on Monday
我在周一递交的
1.30-1.31
I don't it takes whatever week or two or something 
检测可能需要花一两周的时间
01:31 - 01:34
so well see, any other questions related to class 
So，关于这门课，你们还有其他问题吗？
01:37 - 01:39
again I don't think it looks like me
我觉得我小孩长得不像我
01:41 - 01:46
Bi~ alright this is say my wife lives a certain lifestyle where I would have questions ,ok 
这其实在说我对我老婆的生活作风抱有疑问



01:47 - 01:54
so last class we talked about it was an introduction to distribute databases 
So，上节课我们对分布式上节课进行了介绍
01:55 - 01.58
and sort of the main three things we focus on was
我们主要关注了三个东西
1.58-2.01
 what the system architecture of a system looks like
一个系统的系统架构是怎么样的
02:01 - 02:03
right we talked about shared memory shared disk show nothing 
我们讨论了shared-memory、shared-disk以及shared-nothing这三种架构
02:03 - 02:04
and I said that
我之前说过
2.04-2.11
most distributed databases are actually every distributed databases out there, is either gonna be shared disk or shared nothing 
几乎所有的分布式数据库系统使用的要么是shared-disk，要么就是shared-nothing
02:11 - 02:16
shared nothing is traditionally the more popular approach people take with distributed databases
一般来讲，在分布式数据库系统中，人们更倾向于使用shared-nothing这种方案
02:16 - 02:20
but shared disk is becoming more prevalent in cloud architectures
但shared-disk这种方案在云架构中变得越来越常见
02:20 - 02:22
then we talk about are you partitioning /sharding
接着，我们讨论了partitioning/sharding方面的事情
2.22-2.25
the hash partitioning, range partitioning, round robin 
我们讨论了hash partitioning、rang partitioning和Round Robin这三种分区方案
02:25 - 02:31
just in a way to take a database to break it up into disjoint subsets
通过这些分区方式，我们以此将数据库拆分为多个不相交的子集
2.31-2.33
that we assigned to different nodes 
然后，我们将这些子集分配给不同的节点
02:33 - 02:37
and then we talked a little bit about how we want to make transaction coordination 
接着，我们讨论了如何对事务进行协调
2.37-2.39
of whether we have a centralized approach 
一种是中心化方案
02:40 - 02:46
that has a global view of what's going on throughout the entire system in the context of what transactions are trying to do 
对于整个系统会发生什么、这些事务试着去做什么，它会有一个全局视角
我会有一个全局的视角，来获知整个系统在发生什么、这些事务试着去做什么
02:46 - 02:48
or a decentralized approach 
或者就是一种去中心化方案
2.48-2.53
where the the nodes themselves are responsible for figuring out, you know whether things are allowed to commit or not 
节点自身会去弄清楚这些事务是否允许去提交
02:54 - 03:02
so the last class all these topics are sort of except for transaction coordination
So，上节课的时候，除了事务协调以外，这些东西我都讲了
03:02 - 03:08
but it for the most part everything, I talked about last class or applicable to both distributed databases that are designed to run transactions 
但我上节课所讲的所有东西几乎都能用在用于分布式数据库的事务执行上
03:10 - 03:12
or distributed databases are trying to run designed around analytics 
也能用于那些执行分析任务的分布式数据库上
03:12 - 03:16
so for this class and then Monday's class next week 
So，在这节课以及下周一的那节课上
03:16 - 03:20
we're now going to buy it up talking about specific issues for each of those two classes or workloads 
我们会去讨论这两种workeload中的特定问题
03:21 - 03:23
because there's different trade-offs that they're gonna make that
因为在这两种workload中，我们会做出不同的取舍
3.23-3.26
, may be good for transactions, but not good for analytics and vice-versa 
有的可能对于事务来说不错，但对于分析任务来说并不好，或者反过来也是一样


03:26 - 03:33！！！
it's again just as a reminder for what I mean when I say transaction processing, we're just an analytical processing OLTP OLAP
这里要提醒下，当我说事务处理的时候，我讲的是OLTP，当我讲分析处理的时候，我讲的是OLAP
03:33 - 03:35
again I think we've covered this a couple times throughout the semester
我们已经在这整个学期中对此介绍过几次
3.35-3.40
just to reiterate this the dichotomy, so that everyone's on the same page 
这里只是重申下它们两者，以确保所有人都能跟上
03:40 - 03:41
and in OLTP workloads
在OLTP workload中
3.41-3.49
we're worrying about operations that are trying to update or read a small amount of data in the database 
我们所关心的是那些试着更新或读取数据库中少量数据的操作
03:49 - 03:52
so again using Amazon as an example
So，这里以Amazon为例
3.52-3.53
when you go to the Amazon website 
当你访问Amazon网站时
03:54 - 03:55
you add things to your cart
你会往你的购物车中添加东西
3.55-3.56
you make purchases for your account
你会为你账户中的东西买单
3.56-3.57
you update your payment information 
你会去更新你的支付信息
03:58 - 04:00
all those operations are transactions 
所有这些操作都是事务
4.00-4.04
that are only touching, you know as we know when you invoke those changes
当你执行这些修改时
4.04-4.05
, they're only touching your data 
它们只会去接触你的数据
04:06 - 04:08
so the Amazon database is quite large 
So，Amazon的数据库是相当大的
04:08 - 04:14
but for your transactions to update you know do your operations the amount of data you're touching is small 
但对于你的事务来说，它们更新操作所涉及的数据量非常小
04:15 - 04:16
and essentially
本质上来讲
4.16-4.18
the database system is doing the same set of operations over and over again
数据库系统会去反复执行相同的一系列操作
04:19 - 04:23
because you're going through the website application code 
因为当你遍历网站程序代码时
04:23 - 04:26
that you know when you click on you know Add to Cart
当你点击添加到购物车时
04:26 - 04:27
that invokes a function on the application code
它会去调用应用程序中的一个函数
4.27-4.31
which then goes through and execute queries to make those changes 
接着，它会去执行这个查询，并应用这些修改
04:31 - 04:32
in OLAP workload 
在OLAP workload中
4.32-4.40 !!!!!!!
this is where we're now started doing analytics to try to extrapolate new information from all the data we've ingested on the OLTP side 
我们现在开始在其中对数据进行分析，并试着从OLTP端提取的所有数据中推断出新信息
04:40 - 04:42
so again using Amazon as example 
So，这里我们再以Amazon为例
04:42 - 04:55
an analytical workload would be something like trying to figure out, what was the most popular item for Carnegie Mellon students during the month of November， when the temperature was you know above 30 degrees 
分析型workload指的是，我们要去弄清楚当温度在30度（华氏，即中国的零下一度）以上，CMU学生在11月时购买最多的商品是什么

04:55 - 04.56
so that's not something you do in OLTP
So，不会在OLTP中做这种事情
4.56-5.00
 because that's you know that's not a transactional thing 
因为这和事务无关
5.00-5.01
,this is something you do in the OLAP side
这是你要在OLAP中所做的事情
05:02 - 05:05
so these workloads are the queries much running longer
So，处理这些workload的时候，查询运行的时间会更长
5.05-5.06
because they're touching more data 
因为它们会接触更多数据
05:06 - 05:08
they're doing joins and doing aggregations
它们会去执行join，会去执行聚合操作
5.08-5.11
 and oftentimes they are one-off queries 
它们有时候会去执行one-off query（一次性查询）
05:11 - 05:14
because someone's trying to say you know answer that question
因为有时候有人会去试着让你回答这种问题
5.14-5.17
oh what's the most bought item for a particular group of people 
比如：对于这群人来说，他们买的最多的东西是什么
05:17 - 05:23
and you know they're filling out some dashboard or using a analytical tool to compose the query 
他们会去借助某种dashboard或者分析型工具来编写查询语句
05:23 - 05:27
and then firing that off, and maybe the data that may never see that query ever again 
当执行了这个查询后，这些数据可能就不会再看到这个查询了
05:27 - 05:29
so again for today's class
So，在今天这节课上
5.29-5.31
we're going to focus on the first part OLTP
我们会将重心放在第一部分OLTP上
5.31-5.33
 next class we'll talk about OLAP 
下节课我们再讨论OLAP


05:34 - 05:40
so the again just to go at a high level to discuss what we're talking about in the distributed database 
So，我们会从高级层面来讨论分布式数据库
5.40-5.42
so we're going to focus on today 
So，这也是我们今天讨论的重点
05:42 - 05:44
we talked to the set up before 
我们之前讨论过这种设置
05:44 - 05:45
we have some partitioned database
这里我们有一些数据库分区
5.45-5.48
whether it's logical partitioning or physical partitioning
这里不管它使用的是逻辑分区还是物理分区
5.48-5.51
 meaning is it shared nothing or shared disk 
也不去管它使用的是shared-nothing架构还是shared-disk架构
05:52 - 05:55
we you know I'm not explaining just yet
我现在还未对此进行解释
5.55-5.56
 it doesn't matter for what we're talking about here today 
对于我们今天这里所讨论的东西来说，这都不重要


05:57 - 05.59
but the scenario we're concerned about is 
但我们所关心的情况是
5.59-6.02
we have an application server that wants invoking transaction 
这里我们有一个应用程序服务器，它想去执行事务
06:03 - 06:05
it picks some partition node to be the master one 
它会将某个分区节点作为master节点使用
06:05 - 06:08
so it tells that guy hey I want to execute a transaction 
So，它告诉这个节点：hey，我想去执行一个事务


06:08 - 06:13
then it goes ahead and does a bunch of updates or reads a bunch of data on our various partitions 
接着，它就会对我们不同分区中的数据进行更新或者读取


06:14 - 06:15
and then now when a transaction complete
接着，当一个事务完成的时候
6.15-6.17
it goes to the master guy
它就会跑到master节点处
6.17-6.19
 that it started off with and says, hey I want to go ahead and commit
并对该节点说：hey，我想提交这个事务
06:20 - 06:22
and assuming this is a decentralized architecture 
假设这是一个去中心化架构
6.22-6.24
,meaning we don't have that middleware 
这意味着我们并没有那种中间件结构
06:24 - 06:27
we don't have that the TP monitor that's coordinating all our transactions
我们并没有那种用于协调所有事务的TP monitor



06:28 - 06:33
now these nodes at the figure out amongst themselves whether they're allowed to commit this transaction 
这些节点自身就会去弄清楚它们是否能提交该事务
06:33 - 06:37
so last class I was very vague about this step here,
So，在上节课的时候，这一步我讲得很含糊
6.37-6.40
 how to determine whether it's safe to commit
即如何判断提交该事务是否是安全的
06:40 - 06:41
and what does it mean 
这是什么意思呢？
6.41-6.44
to say hey we're all going to go ahead and commit this transaction 
这里表示：hey，我们要去提交这个事务
06:44 - 06:46
so this is what we're primarily going to focus on today,
So，这就是我们今天主要讲的内容
6.46-6.48
this last step here 
即这里的最后一步


06:49 - 06:51
and so essentially what we're trying to do is
So，本质上来讲，我们试着做的事情是
6.51-6.58
in our database system, we're trying to have all the nodes agree that we should commit a transaction 
我们试着让数据库系统中所有的节点都同意我们去提交一个事务
06:58 - 07:00
and if everyone agrees that we commit this transaction
如果所有节点都同意我们去提交这个事务
7.00-7.01
 and we go ahead and commit it 
我们就会去提交这个事务
07:02 - 07:08
we don't want any sort of  nomaly a weird reversal of you know one node-set is gonna commit 
我们不想遇上这种奇怪的异常，即一个节点同意我们提交这个事务
07:08 - 07:10
and then an all sudden it doesn't，that transaction got rollback 
然后其他节点突然不同意我们提交这个事务，接着该事务被回滚了
07:11 - 07:13
once everyone agrees that we're gonna go to commit
一旦所有节点都同意我们去提交事务
7.13-7.14
, then we go ahead and commit this 
那么，我们就会去提交这个事务
07:15 - 07:21
so now there are many issues we have to deal with in order to make this happen correctly and safely 
为了让它正确且安全地执行，我们需要处理很多问题
07:21 - 07:23
when we were on a shared everything system
当我们使用的是一个shared-everything系统
7.23-7.26
 meaning we our database system was running on a single box 
意思是我们的数据库系统是在一个单机环境下运行
07:26 - 07:30
and we wanted to do our you know validation protocol for OCC concurrency control
我们想去使用乐观并发控制（OCC）下的验证协议
07:31 - 07:38
all the participants in deciding whether this things allowed to commit was running together in a single machine 
所有用来判断该事务是否能被提交的参与者都是在同一台机器中运行的
07:38 - 07:40
all in the same memory possibly 
它们可能都在同一块内存中
7.40-7.44
,and it was really fast and for us to figure out whether we're allowed to go ahead and commit 
这能让我们快速弄清楚是否能提交这个事务
07:44 - 07:45
and then if we said commit
接着，如果我们说要进行提交
7.45-7.47
 and it truly was committed 
该事务就会被真正提交
7.47-7.48
,because we know everything was on that single box 
因为我们知道所有东西都是在这个单机环境中的
07:49 - 07:51
but now in distribute environment 
但在分布式环境下
7.51-7.52
we have the issue of
我们会有这种问题
7.52-7.53
let's say we go ahead and say to commit 
假设我们要去进行提交
07:54 - 07.55
everyone comes back and says we go commit
所有节点都告诉我们，我们可以进行提交了
7.55-7.57
and then maybe I you know during that time
在这段时间里
7.57-7.58
 one node goes down
某个节点挂掉了
7.58-8.00
what should happen 
这会发生什么呢？
08:00 - 08:03
I know all the same ACID properties we talked about before
我知道我们之前讨论过的所有ACID特性
8.03-8.07
then we don't need partial updates that you're persisting to our database 
我们不想让这种部分更新落地到我们数据库的情况发生

08:07 - 08:08
all of those things we have to account for 
我们必须解决所有事情
08:09 - 08:10
so if a node goes down 
So，如果一个节点挂掉了
8.10-8.11
I've got to deal with that
我必须去处理这个问题
8.11-8.13
but what if the node doesn't go down 
但如果该节点并没有挂掉呢？
08:15 - 08:17
and instead our commit messages just shorter show up late 
而是我们的commit消息出现的时间晚了点
08:18 - 08:22
right the packet got delayed somehow on the network on the way over 
该数据包通过网络传输的时候，延迟了一会
08:22 - 08:24
or which is probably more common say 
或者，这里还有一种更常见的情况
8.24-8.29
our database system was you know using the JVM like it's written in Java ,written in Scala ,it's using the JVM 
我们的数据库系统是使用Java或Scale之类的语言编写的，它会使用JVM
08:30 - 08:33
and all sudden the JVM decides to do a real expensive garbage collection sweet 
突然，JVM决定要进行一次成本很高的垃圾回收时
08:33 - 08:35
and now our process pauses 
那么，我们的进度就会被暂停
08:36 - 08:41
and so we're gonna look like we're unavailable while during this GC pass 
当JVM在进行垃圾回收的时候，我们的系统看起来就会是不可用的状态
08:41 - 08:43
and then all of a sudden we come back after the GC
当垃圾回收结束后，我们的系统突然恢复了正常
8.43-8.44
and now our messages are arrived
现在，我们的消息到达了
8.44-8.46
 ,and it's you know a second has passed
你知道的，时间已经过去了1秒钟
08:48 - 08:56
and then what happens if we decide that  how we determine, how many nodes have to agree that we're gonna commit a transaction to decide that we committed the transaction 
我们该如何判断有多少节点同意我们提交该事务
08:58 - 08:59
Should be all of them, should it be some of them
是所有节点都同意我们提交该事务呢？还是部分节点同意就行了
09:01 - 09:03
right so these the things that we're gonna worry about today 
So，这些就是我们今天要关心的东西


09:04 - 09:09
so one important assumption we're gonna make about this entire lecture 
So，在这整节课上，我们要做的一个重要假设是
09:09 - 09:16
is that we are going to assume that the software running on the nodes in our distributed database are our friends
我们会假设运行着我们分布式数据库的那些节点都是友好的，值得信任的，非恶意节点
09:16 - 09:17
meaning gonna be well behaved 
这意味着，它们的行为值得信任
9.17-9.19
,they're not gonna trying to screw us over, right 
它们并不会搞砸我们的事情
09:19 - 09:23
there it's software that we we as the database system developer 
我们作为数据库系统开发人员
9.23-9.24
,software that we wrote 
是我们编写了这些软件
09:25 - 09:27
and that we've deployed on the same administrative domain 
我们会将这些软件部署在同一个管理域之下
09:27 - 09:31
so we asked a transaction, we asked the node to commit a transaction
So，当我们让一个节点去提交一个事务时
9.31-9.33
 ,and they come back so yeah we're going to commit that 
它们就会回过头来跟我们说：我们会去提交这个事务
09:33 - 09:39
we assume you know a modulo hardware failure or you know software bug
假设我们遇上了一个硬件故障，或者是软件bug
09:39 - 09:41
we assume if a node tells us they're going to commit a transaction 
假设一个节点告诉我们，它们要去提交一个事务
9.41-9.43
they will commit that transaction 
那么，它们就会去提交一个事务
09:44 - 09:44
all right
9.44-9.48
 that's going to simplify in some ways how we're gonna do our commit protocol 
某种程度上，这会简化我们的提交协议
09:48 - 09:51
if you assume that the nodes could be bad actors 
如果你假设这些节点是些糟糕的演员（知秋注：比如伪造的节点）
09:52 - 09:55
right if they say yeah we committed that，with our screw you we're not actually do that 
如果它们表示它们提交了这个事务，但实际它们并没有提交
09:56 - 9.58
then you don't need some of the things we'll talk about today
那么，你就不需要用到我们今天所谈论的部分东西
9.58-10.01
you actually need what it's called a byzantine fault tolerant protocol 
实际上，你需要用到一种叫做Byzantine fault tolerant协议的东西
10:01 - 10:04
and this is essentially what the blockchain is under Bitcoin 
本质上来讲，这就是比特币中的区块链
10:05 - 10:09
Right, a blockchain is essentially just a distributed database
本质上来讲，一个区块链就是一个分布式数据库
10:09 - 10:12
it's just a log you append things but transactions 
它其实就是一个日志，你往日志中追加的就是这些事务
10:12 - 10:14
but in that environment you soon
但在这种环境下
10.14-10.16
 ,because there's Bitcoin mining right or whatever you're trying to do
你们要去挖比特币或者干类似的事情
10:16 - 10:20
that the participants in your distributed database are not your friend 
在这个分布式数据库中的其他参与者并不是你信任的节点
10.20-10.22
and they can lie to you 
他们可以对你撒谎
10:22 - 10:23
so you need a way to deal with that
So，你需要一种能够处理它的方式


10.23-10.25
we are not in that world 
我们并不是处于这种环境下（彼此信任的环境下）
10:25 - 10:28
most DBMS, distributed DBMS are not in this world 
大部分DBMS，或者说分布式DBMS都不是处于这种环境下的
10:28 - 10:33
most DBMS can assume that everybody is gonna play alone Correctly
大部分DBMS都会假设所有人都会独自正确地执行操作
10:35 - 10:36
most people don't need a blockchain
大部分人都不需要用到区块链
10.36-10.38
 very few things need a blockchain 
很少地方才会需要用到区块链
10:38 - 10:39
so if you think you're building something and you use a blockchain
So，如果你在构建某个东西的时候用到了区块链
10.39-10.42
 you rethink your life ,okay
你要重新思考下你的做法


10:43 - 10:44
all right

10.44-10.47
so the things were talked about today are listed here 
So，这里列出的就是我们今天要讨论的东西
10:47 - 10:49
so yeah I didn't say this last class I wanna sort of say it again 
So，有些东西我们上节课并没有讲，但我今天要讲
10:50 - 10:52
I'm trying to cover in three lectures
我会试着用三节课的时间来对此进行介绍
10.52-10.57
what would normally be like an entire year of studying distributed databases 
通常这三节课要讲的东西相当于你花一整年来学习分布式数据库要学的知识
10:57 - 10.59
so we can't obviously cover everything in detail
So，我们显然没法详细地介绍所有东西
10.59-11.09
 and I consider my goal here so just to expose you to like the issues, the problems, the difficulties of building a distributed database, even using a distributed database system 
这里我的目标就是向你们展示构建分布式数据库或者使用分布式数据库时所遇见的那些问题和难点

11:09 - 11:12
so that you know when you leave CMU and you go out in the real world 
So，当你离开CMU，踏入社会的时候
11:12 - 11:17
if you find yourself in a situation where you think you either need a distributed database 
如果你发现你需要用到分布式数据库时
11:17 - 11:20
or you think you want to build one,
或者你想去构建一个分布式数据库时
11.20-11.22
 usually know what are the issues you should be thinking about and
通常你应该去考虑我列出来的这些问题
11:22 - 11:25
so you can reason about you know whether you're doing the right thing 
So，你可以推断出你做的事情是否正确
11:26 - 11:27
and also to say upfront 
这里我要提前说的东西是
11.27-11.29
that most people probably don't need distributed database,
大部分人可能不需要分布式数据库
11.29-11.32
 there's obviously some useful cases 
显然，这里有些有用的案例
11:32 - 11:34
but I would say I mean I can't prove this
但我的意思是我无法证明这一点
11.34-11.37
 but 90% of the world's databases comes running on a single box 
但世界上90%的数据库系统都是在单机环境下运行
11:37 - 11:41
now I should have replication and once you bring that in that becomes a distributed database 
现在对于该数据库，我应该拥有复制（replication）容错的功能，一旦你想将此功能引入，你的数据库就会变为一个分布式数据库
11:41 - 11:42
but most the times 
但大多数情况下
11.42-11.42
you don't need a partition database
你无须对数据库进行分区
11.42-11.47
 most workloads can be handled on a single box 
大部分workload可以在单机环境下进行处理
11:47 - 11:51
right alright so let's talk about atomic commit protocol 
So，我们来讨论下原子提交协议
11.51-11.52！！！！！！
is how do you get everyone to agree that we're gonna commit 
我们如何让所有人都同意我们去提交事务呢？
11:53 - 11:56
how do we handle replication to make sure that we have multiple copies of our data 
我们该如何去进行replication (复制)，以保证我们拥有多个数据副本
11:56 - 11:58
so we can always stay online 
这样，我们的服务就可以一直在线了
11:58 - 12:00
then we'll get into the CAP theorem I'm talking about consistency issues 
然后，我们会深入CAP定理，我会去聊一致性问题
12:00 - 12:08
how do we you know what kind of guarantees can distribute database, and provide for us given our commit protocol 
这个一致性协议是用来保证我们分布式数据库提交的
12:08 - 12:12
and then we have time at the end well quickly talking about federated databases 
如果我们在最后有时间的话，我们可以快速讨论下联合数据库
12:12 - 12:15
the idea of composing distribute databases together, and to make a single database instance 
它的思路是将分布式数据库放在一起让它变成单个数据库实例
12:16 - 12:16
okay 


12:18 - 12:23
alright so that example I showed in the beginning of when we went to go ahead and commit the transaction
在一开始，我通过ppt中examples展示的这些东西，我们可以借助它们来实现分布式事务的提交，首先，当我想要提交事务的时候，
12:23 - 12:26
and then the the one know how to talk to the other nodes
接着，某个节点知道该如何与其他节点进行通信
12.26-12.27
 and say hey is it safe to commit 
并说：现在提交事务是否安全？
12:28 - 12:31
this is what is called an atomic commit protocol 
这种东西叫做原子提交协议
12:31 - 12:32
the idea here is that
这里的思路是
12.32-12.41
 we want to get everyone's feedback that participated in our transaction to decide ,whether it's okay to commit that transaction 
我们想收到参与该事务的所有人的反馈，以此来判断是否能够提交该事务
12:41 - 12:46
and then  if one node or enough nodes depending what protocol are using 
取决于我们使用的协议
12:47 - 12:54
if a certain amount of nodes above the threshold that we're gonna define in our protocol all agree that we should commit this transaction 
如果一定数量的节点都同意我们去提交这个事务（节点数量超过我们协议中所定义的阈值）
12:54 - 12:56
then we tell everyone we will commit this transaction ,
然后，我们会告诉所有节点，我们会提交这个事务
12.56-12.59
and then it becomes committed 
那么，这个事务就会被提交
12:59 - 13:03
so there's a bunch of different variants of atomic commit protocol ,that you can use
So，你可以去使用原子提交协议的很多变种
13:03 - 13:06
so the two that we're going to focus on is two-phase commit and Paxos
So，我们的重心是其中两种，即两阶段提交和Paxos
13.06-13.08
two-phase commit is probably the most prevalent one 
两阶段提交可能是其中最流行的一种
13:09 - 13:11
right goes back into the 1980s
在1980年代
13.11-13.14
paxos has certain guarantees that two-phase commit cannot provide 
Paxos提供了一种两阶段锁无法提供的保证
13:15 - 13:16
some systems can use this 
有些系统使用了Paxos
13.16-13.20
,but it's this is sort of a degenerate case of this
但两阶段提交其实是Paxos的降级版
13:20 - 13:21
there's also a three-phase commit
这里还有一个三阶段提交
13.21-13.23
 that was actually developed by Mike Stonebraker
实际上，它是由Mike Stonebraker所开发
13.23-13.25
 the guy had invented Postgres in the 1980s 
他在1980年代发明了PostgreSQL
13:25 - 13:27
no one actually ever does this
实际上没有人使用这种三阶段提交
13.27-*13.31
there's too much you know too much network traffic 
你知道的，因为网络流量太大了
13:31 - 13:34
there's actually a four phase commit as well from Microsoft 
实际上，这里还有微软所提出的四阶段提交
13.34-13.37
they using in this distributed database called FaRM 
他们在一个叫做FaRM的分布式数据库中使用了这个
13:37 - 13:38
they have to do that
他们必须这么做
13.38-13.41
 because they're using RDMA sort of special remote memory access
因为他们使用了RDMA（远程内存访问）这种东西
13.41-13.42
again we're not going to cover that 
我们这里不会去介绍它 （知秋注：若想了解，可以前往simviso翻译的MIT 6.824分布式系统）
13:43 - 13:44
okay Paxos 
Ok，我们讲完了Paxos
13.44-13.50
so we'll talk about raft is was developed by Stanford about ten years ago
So，Raft是十年前由斯坦福的人所开发出来的东西
13.50-13.54
, as a more easily understood variant of paxos 
它是Paxos的一种更简单易懂的变体
13:54 - 13:55
but it basically provides the same guarantees
但基本上来讲，它提供了与Paxos相同的保证
13.55-13.59
, raft actually shows up a lot more often in newer distributed systems
实际上，Raft在一些较新的分布式数据库系统中出现的次数非常多
13:59 - 14:04
because there's a lot of existing or that people basically wrote like Lib raft, right 
因为有很多人写了像Raft之类的库
14:05 - 14:06
they were at libraries that implement raft
有一些库实现了Raft
14.06-14.11
that you can then incorporate into their database for a ton of different languages,
你可以使用不同的编程语言将Raft放入你们的数据库中使用
14.11-14.13
 like there's no Lib Paxos that everyone can use
但并没有那种可供使用的Paxos库
14:13 - 14:16
Zab was developed for Apache zookeeper
Zab则是为Apache ZooKeeper所开发的
14:17 - 14:19
and the viewstamped replication is not that common 
Viewstamped Replication并不常见
14:19 - 14:23
but this actually turned out to be the first purely correct atomic commit protocol
但实际上，它被认作是第一个真正正确的原子提交协议
14.23-14.25
, it actually came out before Paxos 
实际上，它在Paxos之前出现
14:25 - 14:30
but people didn't recognize that the properties of this thing had until paxos came along much later 
但人们直到Paxos出现很长一段时间后，才认知到Viewstamped Replication的特性


14:30 - 14:34
so again for distributed databases that are not the blockchain
So，对于那些非区块链的分布式数据库来说
14.34-14.38
that are actually you probably an encounter in the real world 
实际上，你们可能在现实生活中已经遇到它们了
14:38 - 14:41
use mostly you most likely see two-phase commit or paxos 
你们最常见的可能就是两阶段提交或者Paxos
14:41 - 14:43
and then from new system apply raft
对于那些新系统来说，它们会使用raft
14.43-14.43
 ,but for this lecture 
但在这节课上
14.43-14.45
I will just cover those two there
我只会去介绍其中的两个
14.45-14.47
they're the two phase commit and  Paxos
即两阶段锁和Paxos


14:48 - 14:51
so actual quick show of hands who here has ever heard of two-phase commit before 
So，你们之前有谁听过两阶段提交，快速举下手，让我看下
14:51 - 14:53
alright,less than half okay 
看来只有不到一半的人知道
14:54 - 14:59
so two-phase commit sounds exactly the way you know it sounds like it's a two-phase commit protocol has two phases
So，两阶段提交的意思就如同它名字一样，它有两个阶段
15:00 - 15:01 ！！！！！！
so let's look an example here
So，我们来看个例子
15.01-15.04
 where we're gonna have everyone agreed to commit a transaction 
在所有节点都同意我们提交事务的情况下，我们才会提交事务
15:04 - 15:05
so assume at this point
So，假设在此时
15.05-15.11
the application server has executed whatever queries that it wants to make changes on the database
应用程序服务器执行了一些查询，这些查询想对数据库中的数据进行修改
15.11-15.14
or read whatever data once on our different nodes 
或者去读取我们不同节点中的数据
15:14 - 15:16
and it wants to go ahead and commit 
接着，它想去提交该事务


15:16 - 15:19
so it's gonna send a commit message to this guy here 
So，应用程序服务器会发送一条commit消息给这个节点
15.19-15.20
,assume this is the master node 
假设这是一个master节点


15:21 - 15:23
so under two-phase commit
So，在两阶段提交中
15.23-15.26
 a vernacular we are gonna say this guy is going to be centered the coordinator 
这里我们假设节点1是协调器
15:26 - 15:33
so that's in charge of asking around to its friends involved in the transaction ,whether it's allowed to commit this transaction 
So，它的作用就是询问涉及该事务的其他同伴，它是否能提交该事务


15:34 - 15:36
and then the other two nodes here we call participants 
接着，这里的两个节点我们将它们称为参与者（participant）
15:37 - 15:39
now I'm not going to show examples of this,
我不会去展示这个例子
15.39-15.44
 but the node that participant node itself can also be a participant 
但node1节点自身也可以是一个参与者



15:44 - 15:48
right this node here could also have been modified by this transaction 
假设这个节点中的数据已经被该事务所修改
15:48 - 15:50
and then it's involved in this two-phase commit process
那么，它就会参与到这个两阶段提交的过程中
15.50-15.52
 or simplicity assume
或者，我们简单假设下
15.52-15.56
that this transaction here only modified data on the two other nodes 
该事务只修改了其他两个节点上的数据



15:58 - 16:00
so in the first phase called prepare phase
So，第一个阶段叫做准备阶段
16:00 - 16:06
we sent out a network message to our participants from the coordinator to participants
我们会让协调器发送一条网络消息给该事务的参与者
16.06-16.08
 to ask them hey here's this transaction, we think you know about it
并告诉它们，这里有一个事务，我们觉得你们应该知道这个事务
16:09 - 16:11
is it okay to commit 
我们是否能提交该事务呢？
16:11 - 16:14
and they're gonna do whatever validation 
这两个节点就会执行某种验证
16.14-16.16
, or whatever they need to do to determine whether this transaction allowed to commit
它们就需要去决定这个事务是否允许被提交
16.16-16.18
and if they determine that it's okay 
如果它们决定提交该事务是ok的


16:18 - 16:21
then they send back an okay message 
那么，这两个节点就会返回一条OK消息


16:22 - 16:25
then now once you get back the okay's from all the participants
一旦你收到了来自所有参与者所发送的OK消息
16.25-16.29
, the coordinator goes into the second phase called the commit phase
协调器就会进入第二个阶段，即提交阶段
16:29 - 16:36
where it tells the all the participants hey good news ,everybody said we can commit this transaction go ahead and commit this 
它就会告诉该事务的所有参与者：hey，这里有个好消息，我们可以提交该事务。然后，它就提交了这个事务


16:36 - 16:38
and then likewise
接着，同样
16.38-16.39
 these guys now have to send a response
这些参与者现在必须发送一个响应给协调器
16.39-16.41
, and say okay we did that this transaction is committed 
并说：Ok，我们已经提交了这个事务
16:41 - 16:43
and then at this point here
接着，在此处
16.43-16.47
 when we get back and in the second phase ,the okay's from all our participants 
当我们处于第二阶段时，收到了所有参与者所发送的OK消息


16:47 - 16:51
we can then go tell the outside world that our transaction has successfully committed 
那么，我们就可以告诉外界，该事务已经被成功提交了
16:54 - 16:56
so there's one thing I'm not showing here
So，这里我有一个东西并没有展示出来
16.56-16.58
and I think that the textbook talks about this 
我觉得教科书讨论了这个东西


16:59 - 17:03
is that at every step of the protocol on every single node involved in it 
在执行该协议的每一步骤时，对于参与事务的每个节点来说
17:04 - 17:10
we're writing out log messages to keep track of what messages we got and what responses we sent out 
我们会记录下日志消息，以此来跟踪我们收到了哪些消息，以及我们发出了哪些响应


17:11 - 17:12
so at this point here
So，在此处
17.12-17.15
 when I sent hey we'll go ahead and commit this 
当我说我们要提交这个事务时
17:15 - 17:16
these guys are gonna write a log message
这些节点就会写下一条日志记录
17.16-17.18
, and say hey for this transaction,
并表示，在这个事务中
17.18-17.20
 I saw I entered the commit phase,.
我进入了提交阶段
17.20-17.21
 and I said that was okay to do 
该节点表示提交该事务是Ok的
17:23 - 17:25
right so that way if we crash and come back 
So，如果我们遇上系统崩溃，并进行回滚恢复
17.25-17.27
we would say oh we were involved in this transaction 
我们就会说：Oh，我们之前参与过这个事务
17:28 - 17:33
how far and in the two-phase commit process did we get to determine whether we need to undo it or redo it
并且我们知道我们执行该事务的进度到哪里了，我们可以去决定我们是否要撤销该事务所做的修改，或者是重新执行该事务
17:36 - 17:38
and so another point distinguish about this
So，这里有一点要区别一下
17.38-17.39
 and this will differ from Paxos
这与Paxos不同
17.39-17.40
 and a few more slides is that 
我们会通过一些幻灯片来讲这个
17:41 - 17:46
all of the nodes prevent all participant nodes in the commit protocol for this transaction
对于两阶段提交协议中所有参与该事务的节点来说
17:46 - 17:49
they all have to say we have to commit this transaction
它们全员必须表示：我们需要提交这个事务
17:50 - 17:52
it's either everyone or no one 
要么全员同意，要么一个都不同意
17:55 - 17:56
so we go to the next sample here
So，我们来看下一个例子
17.56-17.58
when we already have an abort 
即当我们遇上事务中止的话，这会怎么样呢？


17:58 - 18:00
it's again the same thing transaction finishes 
这里同样，事务执行结束
18:00 - 18:02
I send a commit request to my coordinator 
我发送了一个commit请求给我的协调器


18:03 - 18:04
the coordinator enters the first phase 
协调器进入了第一阶段
18.04-18.07
sent the prepare message to the participant nodes 
它向参与者节点发送了prepare消息


18:07 - 18:14
let's say this bottom guy here for whatever reason, you know for its concurrency control protocols ,the size that we cannot commit this transaction 
假设节点3不知道出了什么问题导致我们无法提交这个事务
18:15 - 18:17
so it sends back an abort message 
So，它返回了一条abort消息
18:18 - 18:22
so as soon as the coordinator gets the first abort message from any of the participants 
So，一旦协调器收到了来自任意参与者节点所发送的第一条abort消息
18:22 - 18:24
it is no longer in the prepare phase
协调器就不会再处于准备阶段了
18.24-18.27
and now it immediately goes into the next phase
它现在就会立刻进入下一阶段
18.27-18.28
 in this case we're for the abort 
在这个例子中，我们来看下中止阶段


18:29 - 18:30
and so at this point
So，在此时
18.30-18.36
 we can really go back to our client our application ,and say hey this transaction can't finish we're going to abort 
我们会告诉我们的应用程序，并说：这个事务无法结束，我们会中止该事务
18:36 - 18:40
even before we and go to the second phase or even from before we hear back from anybody else 
在我们进入第二阶段之前，或者在我们收到来自任何参与者返回的消息之前
18:40 - 18:42
one abort message will kill this entire thing 
一条abort消息就会干掉这整个过程


18:43 - 18:45
so now in the abort phase
So，在中止阶段中
18.45-18.46
we say hey we're aborting this
我们表示：hey，我们中止了这个事务


18:46 - 18:49
and then everyone comes back says okay we've aborted 
然后，每一个参与者都会返回响应，说，OK，我们已经中止了
18:50 - 18:52
and at this point the the transaction is done 
在此时，这个事务就完事了
18:54 - 18:59
so the idea is here that we need to network round trips to get everyone to agree that were to commit this transaction 
这里的想法是，我们需要通过网络来让每一个参与者都同意提交这个事务
18:59 - 19:04
and then we go ahead and our commit or abort this transaction ,and we go ahead ,and then apply that change, yes 
然后，我们就可以去提交或中止这个事务，同意，那就落地这个事务所发生的修改（知秋注：日志先行！）


19:11 - 19:20
so this question for the abort commit, the question is do I need this second round here, to tell that the, do I need to go to the nodes here and say yes you've committed ，
他问的是我在这里是否需要发起第二轮请求，我是否需要去这里这些节点处，告诉它们，说，yes ，你已经提交了
19:20 -19:23
Before I tell the application run before I tell who
这个请求是在我告诉Application Server你可以继续运行之前，还是在我告诉这些节点之前？



19:34 - 19:39
Right ,so his question is same here ,I'm in the prepare phase this rule action should commit 
他的问题同样在这里，在准备阶段，这里的规则动作是是不是准备好提交了


19:39 - 19:43
a semi semi prepare request these guys send back okay 
如果准备好了，那这些节点就会返回OK






19:45 - 19:53
is do I really need to wait for the next round trip to say ,okay go ahead and commit this and get here back from them ,before I can tell the application I need to commit 
在我要告诉Application Server我已经提交之前，我是否真的需要去等下一轮请求去问到底落地了没，并从它们那里得到肯定的回答
19:54 - 19:59
in practice no, for absolute correctness ,yes 
在实际生产中，no！不需要等待，真实状况就是这样，毋庸置疑！





40:01 - 40:03
Yes What`s that 

40:09 - 40:10
how would that work yeah 
它是如何工作的
40.10-40.13
,so if one of these acceptors sees n+1
So，如果其中一个acceptor看到了n+1
40.13-40.15
 ,they have to reject n 
它们就会去拒绝n
40:16 - 40:16
yeah 

40:17 - 40:22
I think they cover Paxos in the distributed DBMS class,
我觉得他们在分布式DBMS课上介绍了Paxos
40.22-40.25
right the guys actually implement it 
这货实际实现了Paxos
40:24 - 40:26
so I'm going through this very briefly,
So，我会简单带你们过下这个
40.26-40.32
 just to show the distinction between two-phase commit and and Paxos that like 
并向你们展示下两阶段提交和Paxos之间的区别
40:32 - 40:35
yeah the high level idea is the same
从高级层面来讲，它们的思想是相同的
40.35-40.40
 except that under Paxos yeah you still get rejected in the second phase, and you have a majority have to agree 
除了在Paxos中第二阶段时你必须获得多数派的同意，不然你的事务依然会被拒绝提交
40:42 - 40:45
so now her question is or her observation is 
So，她的问题是，
40:45 - 40:52
it could not get started forever, if I just have two proposers clobbering each other by posing you know n+1 n+2 n+3 
如果两个proposer互相讨价还价，一个提n+1，一个提n+2，以此类推，这样就永远没法开始执行
40:52 - 40:55
and everything just keeps getting rejected absolutely 
所有事务就会都处于被拒绝的状态


40:55 - 40:58
so the way you handle this is called multi-Paxos 
So，我们处理这个问题的方式叫做multi-Paxos
40:58 - 41:00
so the idea with multi-Paxos is that 
So，multi-Paxos的思路是
41.00-41.05
you select some node to become the leader for your Paxos group 
你会选择某个节点作为一个Paxos group的leader
41:06 - 41:11
and then it's the sole node responsible for proposing changes to commit transactions 
该节点负责提出修改以提交事务
41:12 - 41:19
they think of this it could delegate it or designate it as the almost like the coordinator or the middleware piece 
他们觉得这个节点充当了协调器或者中间件的角色
41:19 - 41:23
that everybody has to go to determine whether they're allowed to commit or not
所有人都需要跑到它那里来确定是否允许它们提交事务
41:25 - 41:30
and you have a lease on being designated as a leader like you know some 60 seconds or so 
当该节点被指定为一个leader时，它会有一个lease，时间长度可能是60秒之类
41:30 - 41:32
and then after that 60 seconds is up
当这60秒到了之后
41.32-41.34
you do a round of voting
你会进行一轮投票
41.34-41.39
, which is another round of Paxos to determine who the next leader is going to be 
通过这一轮投票，我们来决定这个Paxos Group中的下一个leader是什么

41:41 - 41:43
and then once that that's resolved 
接着，一旦选出了leader
41:43 - 41:50
then you go ahead and have you know that that new designated leader be the responsible for all for applying all the changes 
那么这个新委派的leader就会负责去提交这些修改
41:50 - 41:52
so this avoids that that starving issue
So，这种方案避免了starving问题
41.52-41.56
because the leaders have been the only one proposing changes 
因为只有leader才能对这些修改进行提案
41:58 - 41:58
yes
请讲
42:05 - 42:05
correct
没错
42.05-
 so she's like isn't just moving the problem ,because now couldn't get starving for the leader election right 
so 处理过程的前进不会再是问题，因为现在有leader选举制度的存在，我们不会再因为协调器角色的挂掉而要一直等它恢复了（知秋注：starving 问题）
42:10 - 42:12
So yeah we assume our nodes are friendly 
So，我们假设我们的节点都是友好的
42:13 - 42:14
so we just have right in our database system 
So，我们在我们的数据库系统中有这样的权力
42:15 - 42:18
you say all right well the after my lease is over 
你表示：Well，当我的lease到期后
42:18 - 42:25
I'll try to be the only one to to ,you know vote myself or propose that I can be the new leader 
我会试着给我自己投票来让我称为新的leader
42:25 - 42:27
how do you handle two guys clapping same time
你该怎样去处理俩proposer在同一时间互相讨价还价
42.27-42.29
 yes ,but you serve back off 
是的，退一步海阔天空即可
42:29 - 42:31
so I tried I got rejected
So，我试着这样做，但我被拒绝了
42.31-42.35
, so  said to merely try to reject or merely try to propose it something new 
在只是去尝试拒绝（reject ）或者只是尝试提议一些新的东西
42.35-42.36
maybe I'll wait 10 milliseconds 
可能我会等待10毫秒
42:36 - 42:37
if I propose again
如果我再次进行提案
42.37-
 I get rejected maybe I wait 20 just do it that way 
我可能要等20ms才会去做拒绝动作
42:41 - 42:41
yes 
请问
42:44 - 42:46
the question is how many proposers can you have 
他的问题是，我们可以有多少个proposer
42:47 - 42:48
and then as you want
你想要多少就可以有多少
42:49 - 42:51
yeah algorithm doesn't say anything about limitation
算法中对此并没有任何限制
42.51-42.52
in practice
在实战中
42.52-42.55
 it's like getting for it they'll call in a Paxos group 
在一个Paxos Group中

42:56 - 43:00
you typically would have one under multi-Paxos to avoid this start starvation issue 
使用multi-Paxos这种方案时，通常你只会有一个proposer，以避免这种starvation问题
43:01 - 43:05
if we cover spanner at the end of the semester of an system potpourri 
如果我们在这学期最后介绍Potpourri的时候介绍Spanner的话
43.05-43.06
which every year we always do
实际上，我们每年都会去介绍下它
43:06 - 43:09
I'll show you how you can do Paxos with that 
我会向你们展示如何在Spanner中使用Paxos
43:10 - 43:12
question over here okay 
有问题吗？Ok


43:14 - 43:19
so the the main takeaway from this is that 
So，我们从中主要学到的东西是
43.19-43.21
so with two-phase commit and paxos 
So，对于两阶段提交和Paxos来说
43:21 - 43:23
you can both use them to commit transactions 
这两种协议都可以用来提交事务
43:24 - 43:27
so to determine whether everyone agrees , we want to go ahead and commit transactions
So，以此来确定每个人是否同意我们去提交事务
43:28 - 43:28
in practice
在实战中
43.28-43.34
 usually for distributed DBMSs that are local to each other 
通常对于那些在本地的彼此相邻的分布式DBMS来说
43:34 - 43:36
like meaning, they're running under the same data center 
我的意思是它们在同一个数据中心下运行
43.36-43.38
where they're not like you know or widespread geographic regions 
它们并不是分区在全球的
43:39 - 43:41
two-phase commit it's what people mostly use,
人们最常使用的是两阶段锁
43.41-43.46
because the number of round trips could be less 
因为这种来回发送信息的次数可能会更少
43:46 - 43:50
and you assume that maybe the nodes are going to be crash less often
并且你假设这些节点发生崩溃的频率也很低
43:50 -43:50
Okay

43.50-43.57
there's much extra failure scenario, you have to deal with failure handle code to deal with like, you know the coordinator goes down, participant goes down 
你需要去处理一些额外的故障场景，比如：协调器崩掉了，或者参与者节点挂掉了
43:57 - 44:01
so it's you know even though it would be slightly faster than paxos 
虽然，它的速度可能要比Paxos来得更快
44:01 - 44:06
it's still there's so much of your stuff you have to do to make sure that ,you don't the whole system doesn't go down and you don't lose data
你依然需要做些额外工作以确保整个系统不会挂掉，并且你也不会丢失数据
44:07 - 44:08
as I said before 
我之前说过
44.08-44.13
the inventor of paxos Leslie Lamport and Jim Gray the guide have been two phase locking 
Paxos的发明者是Leslie Lamport，两阶段锁的发明者则是Jim Gary
44:13 - 44:16
they had a paper in early 2000s before Jim disappeared 
在Jim去世前，他们在2000年代早期的时候写了一篇paper
44:18 - 44:24
that showed that two phase commit is a degenerative case of two phase locking ,right
该paper表示，两阶段提交其实是两阶段锁的退化版本
44:24 - 44:28
sort of like I was talking to degenerative case of Paxos, right
抱歉，我说错了，两阶段提交是Paxos的退化版本
44:28 - 44:35
the the coordinator it's the same Paxos round of a voting, it's just everyone has agree rather than the majority 
两阶段提交中的协调器和Paxos的投票其实是一回事，只是两阶段提交要让所有人同意才能提交事务，Paxos只需要大多数同意就可以提交事务
44:36 - 44:36
okay 


44:40 - 44:40
all Right

44.40-44.41！！！！！！！
so let's talk about replication now,
So，我们现在来讨论下replication
44.41-44.42
 as I said in beginning 
正如我一开始所说
44.42-44.50
most people don't need a sort of a partitioned distributed DBMS to handle the workload 
大部分人并不需要对分布式DBMS进行分区以处理workload
大多数人不需要某种分区形式的分布式DBMS来处理workload
44:50 - 44:55
most the DBMS you play and count the real world while probably using , you know some kind of replication 
你在平时所使用的大部分DBMS可能会去使用某种具备复制容错（replication）方式就足够了
44:55 - 44:57
and I would say that still counts as a distributed DBMS
其实我想说，这依然算是一种分布式DBMS
44:58 - 45:00
so the idea here it should be
So，这里的思路是
45.00-
 a DBMS, replicated with the application is that 
对于一个具备复制（replicated）能力的dbms，
45.03-45.06
we want to make multiple copies of every object 
我们想去为每个对象制作多个副本
45.06-45.09
whether it's a page, or a tuple, a table whatever you want 
不管这个对象是一个page还是一个tuple，或者是一个table
45:09 - 45:11
and store them on multiple nodes
并将它们保存在多个节点上
45.11-45.13
 so that if one of those nodes goes down 
So，如果一个节点挂掉了
45:13 - 45:15
we have a backup available for us 
我们还有一个可供使用的备份
45:15 - 45:19
so we don't have to wait for the system to reboot and replay the log to put us back in the correct state 
So，我们不需要等待系统重启并重新执行日志上的内容，以此来让我们到恢复正确的数据库状态
45:20 - 45:28
we could just failover using paxos to decide who to failover to, to determine what becomes that ,you know the new location for writing data 
我们可以通过使用paxos来设计故障转移，以此决定在一个节点出故障时，启用哪个节点来作为一个新的用于接收数据写入的leader
45:29 - 45:33
so there's a bunch of design decisions we have to think about when we want to build our replication scheme 
So，当我们想去构建我们的replication方案时，我们必须考虑一堆设计决策
45:33 - 45:35
so we'll go through each of these one by one
So，我们会逐个讲下这些东西


45:37 - 45:46
so the first issue is, what however after you can configure the replicas in the systems, and where do the reads and writes go to
对于第一条这个Master-Replica,是指你在系统中配置了一堆备机（replicas）后，你的读和写请求该落在哪台机器上
45:47 - 45:52
so the most common approach is used what is called master replicas replication 
so 最常使用的方案就是主从复制（master replicas replication）
45:52 - 45:56
sometimes called leader-follower used to be called master-slave 
有时候也叫 leader-follower，也可以称之为master-slave
45:56 - 45:58
But people try to avoid that term 
但人们正在避免使用这俩词汇，你懂得
45:58 - 46:05
and the idea here is that there's some designated master for that form for a given object in the database 
这里的思路是，在数据库中指定一个主节点
46:06 - 46:09
and all the writes are going to go to that master node 
所有的写请求都会落到主节点上去
46:10 - 46:14
and the master node is then responsible for propagating those changes 
主节点负责传播这些修改
46:14 - 46:16
The updates to its replicas 
将这些修改落地到它的从节点（replicas）上去
46:19 - 46:23
and all the reads can go either to the master or some systems that can also go to the replicas 
所有的读请求既可以落在master上，也可以落在replicas上
46:23 - 46:27
so you can offload the work you have to do in the massacres, the writes could be very expensive 
这样，你在流量高峰期就可以降低你的工作压力，但写请求就可能付出很高的代价了
46:28 - 46:30
and so as I said if now the master goes down 
so 如果现在master挂掉了
46:31 - 46:37
then we hold up axis around to do a leader election to determine, which replica becomes the new master ,and that's where all the writes go to
那我们就会去进行一场leader选举，以确定剩下的哪个replica可以成为新的master，这个新的master会是所有写请求的落脚点
46:37 - 46:37
question 
请讲
46:41 - 46:44
this question is well this is a venture persistency, no we'll get there
他的问题是这会有持久化的风险，no，我们等会会说到这块儿的
46:46 - 46:52
do not necessarily, no no no not true,a few more slides
没必要，no no no 不对，在后面的ppt中会看到
46:54 - 47:04
okay the other approach is do multi-master ,where we have replicas stored in different machines ,and transactions are allowed to write to any of those replicas 
ok，另一种方案是multi-master，我们在不同的机器中有多个副本（replica），事务可以被允许写入其中任何一个副本中
47:05 - 47:07
all right some sometimes called multi-home 
有时候这也叫做multi-home 
47:07 - 47:12
and then now that it's the replicas are responsible for determining 
然后，现在，这些副本（replica）负责确定的是，
47:12 - 47:17
if you have two transactions that try to update the same thing, running the two different replicas 
如果你有两个在尝试更新同一对象的事务，且基于对象，我们有运行了两个不同的副本
47:17 - 47:21
how do you actually coordinate from decide, which one should actually commit, which one should abort, how do you actually with conflicts 
我们该怎样去彼此协作，谁应该去commit，谁应该中止（abort），该怎样去处理这种冲突


47:23 - 47:28
so let's look at these visual ease again master replicas, yeah you have a master node 
 so我们再来看下 master replicas，这里，你有一个master节点


47:28 - 47:33
all your writes go to this guy and in some systems all the reads go here as well 
你所有的写请求都会进入这个节点，在一些系统中，所有的读请求也会落在这里



47:34 - 47:41
and then this just then propagates over the network the update information to it to its replicas so that can get applied 
然后通过网络将修改信息进行传播并落地到它的replicas上




47:42 - 47:46
and for some systems again you can have the reads go to the replicas 
对于一些系统来说，你可以将读请求落地在这些replicas上
47:46 - 47:49
so that you produce the amount of work you're doing on the front end 
so 如果你这前端有大量的工作请求
47:49 - 47:54
so if your reads don't need to have the most up-to-date latest information 
如果你的读请求不需要强调最新的数据信息
47:54 - 47:57
then you can all flow them to these other guys here 
那你就可以将它们引导到这些节点身上
47:58 - 48:04
all right this is still be potentially consistent, by meaning like I can if I have snapshot isolation
这仍然可能是一致的，意思是，如果我具有快照隔离，
48:04 - 48:09
I can be guaranteed that I'm not seeing torn updates or partial updates from transactions still running on this guy here 
我可以保证，我不会看到来自运行在这个节点上事务所造成的混乱或部分更新
48:09 - 48:14
so I still can guarantee the consistency are the data I'm reading on my replicas 
我仍然可以保证我在replicas上读取的数据的一致性的
48:15 - 48:19
it just may be the case that I'm not seeing the little latest information that's on the master 
因为我可能并没有看到master上最新的更新信息


48:21 - 48:26
the multi-master approach is that again we have transactions can you read the writes to any copy of the data 
对于multi-master方案，我们的事务，无论是读请求还是写请求，都可以落在任何一个数据副本（replicas）上


48:26 - 48:30
and then there's some procedure to resolve the conflict 
不过需要通过一些方式来解决潜在的冲突
48:30 - 48:37
again using Paxos or two-phase committee to decide ,you know to have overlapping changes on these two replicas, what should be the latest version 
再次，使用Paxos或两阶段提交来确定关于这两个replicas上的冲突修改，我们用的是最新的版本号这种方式
48:39 - 48:47
so just as a quick anecdote Facebook originally used to use this multi-master replica setup for their giant data center 
就像Facebook最初为什么要将multi-master副本设置用于其大型数据中心，
48:47 - 48:50
right the main data center was I think you know in California 
假如主数据中心在California 
48:51 - 48:54
and then across the different around the world 
然后在世界的不同地方
48:54 - 48:57
they would have replicas that would follower along, the 
它们有很多replicas 作为该主数据中心的从机
48:57 - 49:02
you know  the master and get updates to you know to propagate the changes, so that you can see things 
当master更新后，它要将这些更新传播到这些从机上去
49:02 - 49:08
and the way they would fake it out to make it look like your changes happen real fast locally, like if you updated your timeline 
他们通过伪造的方式，使你的修改看起来像是在本地快速发生，就像你在你这个时间点直接得到更新结果一样
49:09 - 49:13
they would store that as a cookie information in your browser 
他们会将其作为Cookie信息存储在你的浏览器中
49:13 - 49:20
so that if you refresh the page you would see your update ,even though have may not been propagated to the to the replicas ,where you're reading your timeline from
如果你刷新页面，你会看到你的更新结果，尽管他们可能并没有传播到那些replicas中
49:20 - 49:24
right because it takes a bit of is late for the write to show up here ,and then pushed out to the replicas 
因为要将写操作落地到这里是会有点延迟的，（知秋注：如果你读的话，那就是本地这个，那读的数据就和master的数据是不一致的，有些延时的）
49:25 - 49:29
and now probably five-six years ago now they do the multi-master set up 
可能是在五到六年前，他们做了 multi-master方案的设置


49:32 - 49:36
so an important concept in our with replicas yes 
对于我们的replicas，有一个很重要的概念，请讲
49:42 - 49:47
you could react so there's a lot of pumpkin permission map this four years ago 
在四年前，他们为此做了很多工作
49:47 - 49:50
so the way like if I write a post like you know in my timeline 
so 它那会的方式，就好比如果当前我有一个post写请求提交到后台
49:50 - 49:54
if I refresh the page, and if I'm saying I'm in Brazil 
如果我刷新下这个浏览器页面，如果当前我所在的区域在Brazil 
49:54 - 49:58
and I'm reading Brazil my local data center has a replica of the master 
接着，我就会将读请求发送到Brazil 本地的数据中心（它是master的一个从机）
49:58 - 50:04
so now if I refresh my page and come back, I wouldn't see my post, because it has been propagated from the master to the replica 
so 现在，如果我刷新我的浏览器页面，在数据返回后，我并没有看到我的提交，因为它需要从master传播到replica 
50:04 - 50:06
because there's always delay for this 
因为这就是会产生延迟的
50:07 - 50:12
so people would then  they want to avoid the issue of someone posting in their timeline hitting refresh 
他们想要避免这种在当前时间点做修改提交所产生的刷新问题

50:12 - 50:15
and then thinking they're their post went missing, because now you're reading from this 
然后，他们就会觉得他们的修改提交丢失了，因为你是从本地数据中心副本读取的数据
50:15 - 50:20
right so the way they would handle that is they would actually store ,what she wrote in your browser cookie 
so，他们通过这种方式来处理那些实际存储到master上来，但没更新到本地数据中心产生的错位问题，即将post请求成功后，顺带将数据写到本地浏览器cookie 中
50:21 - 50:24
and then fill that in as if it was coming from the database 
然后，这就会让人觉得，它是来自数据库中的数据一样
50:26 - 50:26
it's not

50:34 - 50:34
yes 

50:35 - 50:38
if they quit their browser and assuming the cookies got blown away
如果他们把浏览器关了，假设cookies也消失了
50:39 - 50:47
and you cut but even better scenario, I make a change my time on this machine, and I have another machine next to it 
有一个更好的场景例子，我在这台机器上将时间做了一个修改，它旁边我还有另一台机器
50:47 - 50:52
and I hit refresh on that machine, it would go to the replica database, down in Brazil it would not see your post 
有个人在这台机器上更新了数据，这个人要去这个副本（replica）数据库读数据，这个副本数据库就在Brazil ，这个人不会看到你的提交
50:52 - 50:56
you know it'd be a couple hundred milliseconds before they actually got propagated 
在数据传播到位之前，可能有100ms的延时
50:57 - 51:01
but they would say you know we'll still like to hit someone could hit refresh on the two machines they're exact same time 
但他们（Facebook）说，我们还是想要在第一时间拿到它们在这两台机器上的更新（哪怕自己所在的本地数据中心有延时没有落地到位）
51:02 - 51:03
yes
请讲
51:12 - 51:16
Correct, question is is that in my scenario with Facebook 
他的问题是这是不是就是类似于那个Facebook的场景，对的，确实是，
51:16 - 51:20
if the replicas Brazil ,this is in California , when I actually did the post does 
如果备机副本是Brazil，这个是在California 的master，当我发出一个post请求
51:20 - 51:25
that mean the application server needs to communicate with the database back in California from Brazil, yes 
这意味着， application server需要和在California 的数据库进行通信，数据读取应该从本地的Brazil数据中心查找
51:28 - 51:31
DBMS is that's a huge bottle absolutely and that's why they did the cookie thing to hide it 
这就会成为DBMS一个很大的瓶颈，这也是为什么我们要做cookie中做这些事情来掩盖它
51:32 - 51:34
because doing this is  hard 
因为做这个Multi-Master太难了
51:35 - 51:40
right they had to build that and to get that write is not easy 
他们不得不要去构建那种。。。要做到写操作落地到位太难了
51:41 - 51:41
yes 

51:44 - 51:50
his question is receiving, again using the Facebook example, if someone comments on that post I will never see that 
关于他的问题，我们这里再次使用Facebook 的这个例子，如果有些人对某条朋友圈发出的评论我并没有看到
51:50 - 51:54
no because again it's just the deal with you at the person writing the post
因为它就只是针对发出post写请求那个人来做的设定（写在他的cookie中，并不针对其他看的人）
51:54 - 52:01
if you hit refresh it would pull it from the cookie, so that you would think you got it from me from the master 
如果你提交post请求刷新后，你会从cookie获取数据，这样，从你的脑子里，你会认为，你是从master处获取的数据
52:01 - 52:05
but you really got it from the replica, it fills in the missing information that knows it should exist for you 
但其实你会从这个replica处获取数据，它（通过cookie这种方式）填补了你本应存在但却丢失的数据
52:05 - 52:09
eventually it the master will get propagated to the replica 
最终master会将数据修改传播到这个replica 上
52:10 - 52:13
and then now if I do a refresh instead of coming at the cookie, I'll come from my replica 
现在，如果我不通过cookie，来做一次刷新，我将从我的replica 上获取数据
52:14 - 52:18
so Zimmer and post my comment,  it'll be a delay before I can see it 
so 在我提交了我对某条动态的评论后，在我能看到该评论之前，我需要等一会
52:22 - 52:25
correct in the old system, yes, and the new system, yes, everything is 
没错，在老系统，没问题，在新系统，没问题，都是如此
52:26 - 52:32
now we're getting the GPDR world which I don't wanna get into， like where can data actually live
现在，我们不想进入有GPDR 规范限制的国家，因为在这些国家，我们的数据实际该存放在哪里（注：GDPR ：《通用数据保护条例》，是在欧盟法律中对所有欧盟个人关于数据保护和隐私的规范，涉及了欧洲境外的个人数据出口。GDPR 主要目标为取回个人对于个人数据的控制，以及为了国际商务而简化在欧盟内的统一规范）
52:32 - 52:38
but in generally think of yes, like think of this is like Brazil America u.s. 
但，基本来说，我觉得没问题，你可以把它们的所在地放在巴西，美国等这些地方
52:39 - 52:41
everyone has a complete copy in entire database 
每个地方的数据中心都有整个数据库对应的完整副本
52:41 - 52:44
whether Facebook actually does that anymore I don't know
Facebook是否真的这样做了，我并不知道
52:45 - 52:50
again this big think of this as this is a good example of it's sort of like MP3  right 
怎么来思考它呢，这里有一个很好的例子，拿MP3来讲，
52:50 - 52:56
MP3 take advantage of author humans of what we can proceed in audio 
作为创作人员，利用MP3的优势，可以让我们在音频中进行处理
52:56 - 53:00
and they can compress down you know wavelengths that we can't see 
他们可以压缩我们看不到的波长
53:00 - 53:05
by a throws away data that we humans are never going to be able to hear to compress  the actual file 
通过扔掉我们人类永远听不到的数据来压缩实际文件
53:05 - 53:07
so it's sort of like the same thing right 
这和我们讨论的有点像同一件事
53:07 - 53:15
they know that if it takes me a hundred milliseconds to get a comment on my post, get from the master the replica 
你知道，如果post提交的评论内容从master传播到replica ，最后我们从replica 上获取到需要100ms
53:16 - 53:20
who cares if it takes me a hundred milliseconds to see your comment about my stupid picture, right 
你会在意这100ms间出现的评论么
53:21 - 53:25
the thing they were trying to avoid was someone posting ,and then immediately not seen what they posted 
他们尝试做的就是屏蔽一些人的提交，没必要第一时间看到他们提交的评论
53:26 - 53:31
so that's why they were doing that cookie trick, but for everything else you do have to wait till gets propagated 
so 这也是为什么他们要做的cookie策略，但对其他人来说，想要看到，你还得等待该修改内容传播到自己本地的数据中心副本上
53:31 - 53:34
and again if it's a hunter milliseconds to see a comment from your friend who cares 
对于你的小伙伴来说，他们是不会在意这100ms的延时的
53:35 - 53:55
yes yes

54:00 - 54:05
yes so just repeat his comment like for this one I'm showing p1 the partition P1
so，再次重复下他的问题，这里，就好比是我此处展示的p1
54:05 - 54:07
and I'm assuming everyone has a complete copy of this 
假设，每个数据中心都有一份关于它的完整的副本拷贝
54:07 - 54:12
but now you can think of like in a really large distributed DBMS with a lot of data 
但，现在，你可以想象一下，你在一个拥有这大量数据的超级大的分布式DBMS中
54:13 - 54:16
I'm gonna maybe want to replicate p1 multiple times 
我可能想要对p1复制很多次
54:16 - 54:18
so there be multiple copies of p1
so 那就会有多个p1的副本拷贝
54:19 - 54:26
and so maybe if all my data is down in if I'm down in Brazil, then I'll keep more copies of my data in Brazil
so 如果我为了防止在巴西的副本机器宕机而丢失了所有数据，那么我将在巴西设定更多数据副本
54:26 - 54:29
because I can update them more quickly if anybody's posting my comment Brazil
因为我想如果在巴西，有人提交了朋友圈动态评论，我能尽可能快的去更新它
54:29 - 54:35
now if anybody updates something in California ,that has to then get propagated down to Brazil ,so that when I refresh I can see it ,yes 
如果有人更新了California 数据中心副本上的内容，然后它会将修改传播到巴西的主机副本上去，so，当我们刷新网页的时候，我们就可以看到它了
54:35 - 54:37
they handle all that 
他们就是通过这种方式进将所有这些进行处理的
54:39 - 54:43
yeah the Facebook architecture actually means ,it's all based on MySQL at the end 
Facebook 这种架构，它的底层，都是基于MySQL的
54:44 - 54:50
that is like the core storage engine of their giant distributed DBMS system is MySQL 
这就像是，他们的这个巨型分布式DBMS系统的核心存储引擎是MySQL
54:50 - 54:54
they're getting rid of InnerDB and eventually replacing with RocksDB
他们扔掉了InnoDB，最终被RocksDB取代
54:55 - 55:01
but all the layers above that are sort of independent of what the actual underlying storage is,but the azure storage
但是上方的所有层都与实际底层存储无关，彼此独立的
55:01 - 55:05 
doesn't look all that coordination stuff of like keeping the multi multi-master stuff in sync 
但这看起来并没有像保持multi-master同步那样的协调能力
55:05 - 55:06
that's all written by Facebook
这都是由Facebook所写的


55:09 - 55:14
all right so an important property we care about in a replicated environment is this notion of K-safety 
我们在复制环境中关心的一个重要属性就是这种K-safety的概念
55:14 - 55:21
and the idea here is just keeping track of the number of copies of an object you have to have in order for our system to remain online
这里的主要思路就是通过监控一个数据对象所对应的拷贝数量，来得知我们系统中存活的replica的数量
55:22 - 55:29
so I don't know whether K-safety is a standardized term , this is something that Mike Stonebreaker uses ,when describing verticaDB 
我不知道K-safety是否是标准化术语，这是Mike Stonebreaker在描述verticaDB时使用的东西
55:29 - 55:32
and basically it's a human defined threshold to say 
基本上这是一个人为定义的阈值
55:32 - 55:38
I need to have at least K copies of particular object at all time in my distributed DBMS , and if I ever go below that K
在我的分布式DBMS中，无论什么时候，我需要至少拥有K个特定对象的拷贝，如果少于K个
55:38 - 55:40
then I grind the system to a halt 
我就会判定这个系统宕机了
55:40 - 55:47
and I stop until either I can bring up a new copy of that data, or you know Hughes or the human comes in and makes a correction 
我就会停下来，直到一个关于此对象一个新的副本加入，或者人为来进行干预修正
55:48 - 55:54
the idea here is is that we want to avoid losing data ,so obviously I want my K-safety beat to be at least 1
这里的想法是，我们就是想要去避免丢失数据，so 很明显，我的K-safety 值至少为1
55:54 - 56:00
right because if I have if I lose one you know if I lose one node that has the only copy of that of a piece of data
因为如果这个1变为0了，也就是它对应的节点（唯一用有该数据拷贝的节点）挂掉了
56:00 - 56:05
then I'm screwed, now I could have false negatives or false positives for different queries, and my database is incorrect 
然后我就搞砸了，现在对于不同的查询我可能会有假阴性或假阳性，而且我的数据库不正确（知秋注：节点数量不够，可能数据是老的，也可能查的数据是对的，但不符合阈值，判定还是错的）
56:06 - 56:12
so what this threshold actually depends on you know how paranoid you are about keeping things online 
这个阈值实际上取决于你想保持多少个在线节点的取舍
56:13 - 56:21
and then you can also you know vary this by saying like in my example,what like I have more copy down in Brazil , maybe one copy up in up in and you know in the US 
这就像我们这个例子，我在巴西有多个副本，可能我在美国就只有一个副本
56:21 - 56:25
because I want to make you know I care about keeping local copies down in Brazil 
因为我想让你知道我更关心在巴西本地的副本


56:27 - 56:33
all right so now we want to get it what are we actually propagating, or how we're actually propagating our changes to have replicas 
so 现在我们想知道的是我们实际是如何传播的，或者这么说，我们实际是怎么将我们的修改传播到这些replicas上的
56:34 - 56:39
and he sort of asked about this like does this mean we're doing eventual consistency, and I mention was no, you'll see why 
他刚才问的关于这里的问题，就和我要做的最终一致性相关，我说了no，你会看到为什么
56:40 - 56:49
so the propagation scheme is when should we how long do we have to wait, or how many when should we tell the outside world that our transaction has committed 
propagation（传播)方案是指，当 一个事务提交到一个具有复制能力的dmbs上，我们应该等待多长时间，或者我们应该何时告诉外界我们的事务提交已经完成
56:51 - 56:53
and this is somewhat independent of the two-phase commit stuff
这部分是独立于两阶段提交的
56:53 - 57:05
right this is saying like with my replicas, should I wait until the replica acknowledges that they got my change and have safety stored in a disk, before I tell the outside world that I've actually committed 
这就是像是在说，在我向外界大声宣布我确实已经将事务提交之前，我是否应该等到replica给我返回的ack确认信息，即拿到我给它的修改信息，并安全的落地在磁盘中了

57:06 - 57:08
and in general the two approaches of using synchronous or asynchronous 
通常，使用同步或异步的两种方案
57:09 - 57:16
synchronous will give you what's called strong consistency, which means I can guarantee that if I tell the outside world of my transaction has committed 
同步将为我们提供所谓的强一致性，这意味着我可以保证，如果我告诉外界我的事务已经提交了
57:16 - 57:21
if I go read that data from any replicas, I'm guaranteed to see the changes of that turn action 
如果我从这任何一个副本中读取数据，都可以保证看到这些修改
57:21 - 57:26
with eventual consistency, the idea is that the change will eventually get propagated to my replicas 
对于最终一致性，要表达的是，修改最终将传播到我的副本中
57:27 - 57:33
so if I go if I hear back my transaction is committed, and I immediately go try to read it on a replica, I may not actually see it 
如果我得知我的事务已提交的情况了，此时，我立即去尝试在某个replica上读取它，则实际上有可能看不到它


57:35 - 57:37
so again look at this visually 
来看个图的


57:37 - 57:42
so with synchronous, we have say two nodes assuming we're doing a master replica set up 
对于同步来说，我们有两个节点，假设我们做的是一个master-replica 方案设定
57:43 - 57:46
we say we want to commit on  our master 
我们想要在我们的master上来做提交（commit ）
57:46 - 57:57
and then we have to go to the replica, and say hey yeah we sent you a bunch of log messages or updates about this transaction made, go ahead and flush it 

接着，我们必须将修改传播到replica上，然后对replica说，hey，我们向你发送了一些有关此事务的日志消息或更新，请将它刷出到你的磁盘中



57:57 - 58:06
and then we pause and we wait until we hear a response back from our replicas, to say that our transaction has successfully been committed, and then it's durable, and disk
然后，我们停下来，等待，直到听到副本发出的响应，即我们的事务已成功提交（也就是日志落地了），然后就是持久化到磁盘


58:06 - 58:08
and then once  it's done flushing 
然后，一旦他结束数据刷盘，即持久化完毕



58:08 - 58:12
we send back the acknowledgment and at that point, we can tell the outside world, that we've committed 
我们就返回ack确认信息，此时，我们可以告诉外界，我们的事务已经提交了
58:12 - 58:17
so again at this point here when we get back the ACK knowledge meant if we try to read whatever this thing modified 
同样，在此时，即当我们拿到ack信息的时候，也就意味着如果我们尝试去任意一个replica上读取这个修改

58:18 - 58:25
we're guaranteed to see that change correct, you know see that the change we'd expect on both the master and any replicas
我们都能看到正确的数据，你会看到修改已经同时落地到master和所有的replica上了



58:27 - 58:31
with asynchronous you don't wait for that response 
对于异步来说，你不需要等待这种响应



58:31 - 58:36
so I go ahead say I want to commit, then I say hey go but go ahead and flush the change 
so 我会说我想要去commit，在master完事儿后，然后，我对replica说，hey，请将这些修改刷到你的本地磁盘
58:37 - 58:40
but then I can Neely come back into the application say my transaction has committed 
然后，我就可以给前台应用程序说，我的事务已经提交了
58:42 - 58:47
and then now at some later point you know this thing with eventual get flushed 
然后，在一段时间后，这个修改会最终刷出到replica的磁盘中去
58:47 - 58:52
but I don't really need to be told on the master ,be nice to know, but I technically I don't have to be told 
但我不需要去告诉master，最好还是让它知道，但从技术上来讲，我没有必要去告诉它
58:54 - 59:04
so this is one of the good distinctions between distributed DBMS ,sorry that the traditional transactional relational DBMS and the NoSQL guys 
传统的事务关系DBMS和那些NoSQL 很容易去选择适合自己的方案，

59:05 - 59:10
in the transactional DBMS, we don't wanna lose any data, we don't want to have any inconsistent reads 
在事务型的DBMS中，我们不想丢失任何数据，我们不想有任何不一致的读取
59:10 - 59:13
so we would always do synchronous replication 
so 我们将始终进行同步复制
59:13 - 59:16
denote the NoSQL guys would do this one here
NoSQL家伙会在这里做这个（异步复制）
59:17 - 59:21
because the idea is that eventually this thing I'll get propagated to my replicas
因为异步复制想法是，最终我会将这些修改传播到我的replicas中
59:21 - 59:27
and so maybe in the small window like 50 milliseconds, I can maybe get a stale read on my replica 
也许在这50毫秒的窗口期中，你可能会在replica上读到过时的信息
59:27 - 59:28
that's who cares
但谁又会在意这些（知秋注：要注意nosql大多数的应用场景，比如最常见的redis，更多是作为缓存）
59:29 - 59:37
maybe it's a website of stupid cat food cat photos with comments, who cares you know I can't see the last 50 milliseconds of Cat Cat comments 
也许它存储的是一个网站中对猫图片的评论数据，你会在意50ms内的没有更新到位的这些评论？
59:38 - 59:39
it's probably good enough
它可能足够好了
59:39 - 59:41
I have money certainly I want to use this 
如果我有足够多的钱，我当然想要使用上面这个同步方案
59:42 - 59:44
because what could happen here
在这里可能会发生什么呢
59:44 - 59:48
I tell my transaction commits, I tell the outside world I committed 
当我说我的事务提交了，我就告诉外界我事务提交了
59:49 - 59:51
but then this guy crashes and this guy crashes 
但下面这种方案，这家伙（主）崩溃了，从也就崩溃了
59:51 - 59:57
and say this guy didn't flush anything to disk, and this guy didn't get the message yet or didn't apply it 
也就是说，这家伙（主）不能将任何东西刷入到磁盘中了，然后这个从机就不能得到消息，也就不能落地修改了
59:57 - 59:59
now I want to come back my transactions gone
现在，我想返回信息，但我的事务已经没了




01:00:03 - 01:00:07
so as an aside come and I'll say that 
顺便说一句，我会说
01:00:08 - 01:00:11
a lot of the NoSQL systems from 10 years ago 
10年前的许多NoSQL系统
01:00:12 - 01:00:16
that all said we were a shoe SQL ,they were going to avoid joins ,avoid transactions 
它们会避免join操作，避免事务
01:00:17 - 01:00:21
a majority of them have added transactions, the majority of them have added SQL and joins 
其中大多数添加了事务，其中大多数添加了SQL和Join
01:00:22 - 01:00:29
right so it's not to say that certain aspects NoSQL systems are invalid
并不是说NoSQL系统的某些方面是不好的
01:00:29 - 01:00:33
there are certainly use cases like website we don't really need to have strong consistency 
当然有像一些用例，比如有些网站，我们实际上并不需要很强的一致性
01:00:34 - 01:00:39
but in general I mean there's enough application out there ,where this matters a lot because you don't lose any data 
但一般来说，有很多的应用程序，它们很介意这点，因为你不想丢失任何数据
01:00:43 - 01:00:48
so let's say like if I get this commit message here, and I immediately come back and say I acknowledgment 
如果我在这里（ppt中下面这个异步图）收到此commit 消息，我立即返回并说我确认提交了
01:00:49 - 01:00:50
and I don't log anything here 
我并不会在这里记录任何日志
01:00:51 - 01:00:53
actually, see the need I did log something right.
实际上，我需要在这里记录点日志么
01:00:54 - 01:00:55
say I log to disk that we commit  this transaction 
即，我在日志中说，我提交了这个事务
01:00:56 - 01:00:59
but now this machine catches on fire those disk milk-like 
但现在这台机器（master）着火了
01:01:01 - 01:01:07
so now this guy crashes too, but he just crashed he comes back, he looks in this log
现在，这台机器（备机）也挂了，但他在挂了之后立马进行恢复，它会查看它的log
01:01:07 - 01:01:10
he didn't get the flush message, so that didn't show up in time 
它没有发现flush记录，也就是没有可能落地了
01:01:10 - 01:01:15
so I told the outside world I committed, but this guy never solved the change and I crashed 
我（master）已经告诉外界说我已经提交了，但这个备机并没有解决这个修改落地，它说它崩溃了
01:01:15 - 01:01:17
So I come back now the transactions gone 
在我回过神来的时候，事务已经没了
01:01:22 - 01:01:25
in that if that's your bank account with that money transfer you're pissed 
如果那是你转帐的银行帐户，你会很生气
01:01:26 - 01:01:26
all right

01:01:29 - 01:01:32
so it's up to the application to decide what trade-offs they want to make 
so 这取决于应用程序要做哪种权衡了
01:01:32 - 01:01:36
do they care about alright are you super conservative and don't lose any data 
就看你是不是超级保守，不想丢失任何数据
01:01:37 - 01:01:38
then synchronous replication is the way to go 
那么就采用同步复制的方式
01:01:39 - 01:01:43
if you're okay with maybe losing the last ten five you know 50 milliseconds of data 
如果你觉得丢失50ms的数据无伤大雅
01:01:44 - 01:01:45
And this is the way to go 
那你就按照异步最终一致性的方式
01:01:48 - 01:01:48
Okay


01:01:50 - 01:01:56
the next issue is when we actually  send changes, oh and what do these changes actually look like 
下一个问题是当我们实际发送修改时，这些修改实际上该是什么样的
01:01:58 - 01:02:06
so one approach is to have the master continuously send all the updates that transactions make as they occur 
一种方法是让master服务器在事务发生时连续发送所有更新
01:02:07 - 01:02:11
think of this is like it's attached to the write-ahead log  
这就像是它在追加修改到预写日志中
01:02:11 -01:02:14
so anytime I create a log record that I'm gonna put you know I want to write out the disk 
每当我创建一条想要写出磁盘的日志记录时
01:02:14 - 01:02:18
I also send it out in the network to my replicas 
我也会将其通过网络发送到我的replicas中
01:02:18 - 01:02:21
and they can start applying the changes as they come in 
他们可以开始应用这些修改
01:02:21 - 01:02:24
of course this means now I only need to send a commit message 
这意味着，我们现在不仅需要发送一个commit 消息
01:02:24 - 01:02:28
but I also need to send an abort message, just as they would if I'm replaying the write-ahead log
也需要钱发送一条abort信息，这样，如果我重演预写日志（write-ahead log）的时候就能用到了
01:02:28 - 01:02:31
because I need to know what changes I need to rollback 
因为我需要知道哪些修改我需要去回滚
01:02:32 - 01:02:39
the other approach is to only send the log messages when the transaction actually goes into commit 
另一种方法是仅在事务实际进行提交时才发送日志消息
01:02:39 - 01:02:44
so we just buffer all our log messages in memory on the master node
so 我们只是将所有日志消息缓存在主节点上的内存中
01:02:44 - 01:02:49
then we get  abort who cares, we just drop it, we don't  send anything over the network
然后我们发生了中止abort，谁会在意呢，我们就是放弃掉就好了，我们不会通过网络发送任何内容
01:02:49 - 01:02:55
if we go ahead and commit, then we push everything to our master, or sorry to our replicas 
如果我们继续进行并提交，那么我们会将所有内容推送到replicas中
01:02:57 - 01:03:03
alright and the advantage of this one is that you're not wasting time sending log messages, that are gonna get aborted from transactions, they're gonna abort
这样做的好处是你不会浪费时间去发送日志消息，因为日志消息会被事务中止，它们会中止
01:03:04 - 01:03:08
but of course, this means now if I need it if I'm doing synchronous replication 
当然，这意味着如果我正在执行同步复制，
01:03:08 - 01:03:13
and I need to wait until this guy acknowledges the replicas knowledge is that it's applied all this changes 
我需要去等，直到replicas 去ack确认说它已经接受了所有的修改
01:03:13 - 01:03:16
then if I'm sending this huge batch of updates all at once 
然后，如果我一次发送这一大批次的更新信息
01:03:16 - 01:03:19
I have to wait till they all get flushed, whereas in this one I can do it incrementally 
我必须等到它们全部刷出到磁盘才行，在此过程中，我只能逐步进行
01:03:20 - 01:03:23
so far you know most systems will do the first one here
到目前为止，你知道大多数系统选择这里的第一个方案


01:03:25 - 01:03:27
all right the last one is a bit more nuanced 
最后一个东西其实有点微妙
01:03:29 - 01:03:31
but it's what 

01:03:33 - 01:03:39
it's determining, what the changes were actually gonna apply to the system on our replicas 
它是为了确定，我们实际该怎样将修改落地到我们的replica上
01:03:40 - 01:03:47
and so again in new databases a lot of times the terminology is vague or people use different things, or to describe different things 
在数据库中，很多时候人们使用术语来表示不同的事物，或描述不同的事物
01:03:49 - 01:03:53
but I think active-passive versus active-active is standardized enough that this makes sense 
我认为active-passive vs active-active之间的标准化足以表述到位了
01:03:53 - 01:03:55
I don't know what the textbook covers this 
我不知道课本有没有涵盖这些
01:03:56 - 01:04:03
so think of this is like with active-active, the idea is that our transaction who's gonna run independently 
so 对于这个active-active，它的核心是，我们的​​事务是彼此独立进行的
01:04:03 - 01:04:07
on on each of our replicas 
在我们的每一个replicas 是彼此独立进行的
01:04:08 - 01:04:12
so say we have a transaction want to update for tuples
so，可以这么说，我们有一个事务，想要去更新这些tuples
01:04:12 - 01:04:16
we're gonna run that transaction on the master I run that transaction on the replicas 
我们将在master服务器上运行该事务，我在replica上也运行着这个事务
01:04:16 - 01:04:20
or if we're doing multi-master again it runs on each copy of the node 
或者，如果我们使用的是multi-master结构，这个事务会运行在每一个node副本上
01:04:20 - 01:04:26
and so they're gonna when they commit all we need to do determine whether we've committed correctly 
他们在提交所有内容时需要去确定我们是否已正确提交
01:04:26 - 01:04:30
is that we use need to check to see whether they all produce the same result
我们需要检查它们是否都产生相同的结果
01:04:31 - 01:04:38
now this is not easy to do if you're doing a non-deterministic control scheme like two-phase locking
now，如果你正在执行诸如两阶段锁等这种具备不确定性控制的方案（因为要争抢），这就很不容易做了
01:04:38 - 01:04:41
and you know timestamp ordering all the things we talked about before 
你知道的，我们之前有讨论的时间戳排序
01:04:41 - 01:04:49
because now you can be guaranteed that the transactions are running in the same order, on our two replicas without checking for every single query 
因为现在你可以确保事务在我们的两个副本上以相同的顺序运行，而无需检查每个查询
01:04:50 - 01:04:55
so we talked about the partition timestamp  ordering scheme, when Prashant talked that tell that lecture 
so 我们有讨论过数据库分区时间戳排序方案（partition timestamp ordering scheme），这节课是Prashant讲的（Timestamp Ordering Concurrency Control那一讲）
01:04:55 - 01:05:04
in that case,  you can use that for deterministic disjoint （subsets）and guarantee, that you know transactions run their operations in the exact same order on both sides 
在这种情况下，你可以使用那些不相交的子集，并以此来保证事务在两边的副本分区上以完全相同的顺序运行

01:05:05 - 01:05:07
so active-active is not that common 
active-active并不常见
01:05:08 - 01:05:12
because you have to do a better exercise a run exactly the same 
因为你必须将精力花在如何更好地以完全相同的顺序运行事务
01:05:12 - 01:05:17
what is more common is active-passive where the transactions can execute on one location
更常见的是active-passive，每一个事务在一个单独的本地执行
01:05:17 - 01:05:19 
the one master node 
首先是在master节点上
01:05:19 - 01:05:22
and then they're gonna propagate their changes to the replicas 
然后将修改传播到replica上
01:05:23 - 01:05:27
and these changes could either be like write-ahead log 
这些修改的到replica的方式和预写式日志（write-ahead log）的方式很像（知秋注：具体前面有讲的）
01:05:27 - 01:05:34
you can either send out the physical updates to the actual tuples themselves or the bytes the low-low bytes we changed 
你可以发送对实际tuples更新的物理结果（即我们修改结果的二进制字节码）
01:05:34 - 01:05:38
or we could also send out the SQL queries that they did, and just replay the single queries, and our replicas 
或者你也可以发送SQL查询语句，这样，在我们的Replicas上面对每一条查询都重新执行一下就ok了
01:05:40 - 01:05:44
there's advantages of both of them just as we talked about before between you know for the recovery time
这两者都有他们自己的优点，我们之前在讲 recovery time的时候讨论过了
01:05:45 - 01:05:49
physical replication is usually the most common ,because all you're really doing is just sending up a lot the write ahead log just 
物理复制往往最通用，因为你真正要做的就是发送大量的预写式日志
01:05:50 - 01:05:51
and then the replicas replay down 
然后replicas重演日志就好了
01:05:53 - 01:05:55
so is this clear,yes 
so 还有不明白的么，请讲
01:06:03 - 01:06:09
question is if you send the yeah ,his statement is yeah I actually would agree that 
他的问题是，
01:06:09 - 01:06:17
a statement is if you're sending the SQL queries, isn't that the same thing as  active-active 
如果你发送了一statement 的sql查询，它们在active-active下会是一样的么
01:06:17 - 01:06:23
I'm thinking in terms of active-passive where I run the SQL query  on the master 
我想在active-passive情况下，这样我在master上运行一个sql 查询
01:06:23 - 01:06:26
and then the log message comes out as the SQL query 
然后输出SQL查询时出现的日志消息
01:06:27 - 01:06:33
active-active in context of store procedures think of like , two transactions running in their entirety, independently on the two replicas 
active-active在上下文的存储过程，即，两个事务各自独立分别完整地运行在两个replica上
01:06:34 - 01:06:40
but in your example yeah, this what I'm saying the terms are like nebulous, I would agree that would be active-active 
但在你的问题中，这就是我说的这些术语所模糊的地方，我同意可以是active-active
01:06:40 - 01:06:45
even though it's done after like active-passive as I  run it on the master 
尽管我在master上使用的是 active-passive来运行这些sql
01:06:46 - 01:06:51
and then only after I run on the master, and then I sent to the replicas, but you could say alright I've run this query 
只要在master执行后，我将二进制日志或者查询语句发送给replicas，但你可以说我已经执行了这个查询
01:06:51 - 01:06:57
and then right before you run it on the master, you send it over to the replicas, is that active-active mmm-hmm
这里，我可以在你在master上执行sql 语句之前，同时把它发送到replica上面，也就是用active-active方式
01:06:57 - 01:06:58
I would agree yes 
我同意
01:07:01 - 01:07:06
alright um we have like eight minutes left 
我们还剩八分钟


01:07:07 - 01:07:08
and this is like one of the hardest things 
这是最难的一个知识点
01:07:09 - 01:07:11
let's roll the dice let's see we can do it okay 
让我们掷把骰子，让我们看看是否可以hold住
01:07:12 - 01:07:17
so there's this thing called a cap theorem, that people apply for the distributed databases 
这个东西叫做CAP定理，人们将它应用于分布式数据库
01:07:17 - 01:07:27
and this is a way to characterize and understand, what are the properties or guarantees ,that a distributed database can provide for you
通过它，可以知道分布式数据库为我们提供了哪些属性或保证
01:07:29 - 01:07:34
and it's broken up to three parts, consistency are consistent always available and Network partition tolerant 
它分为三部分，一致性、始终可用、网络分区容错性
01:07:35 - 01:07:42
so this was originally posed as a conjecture by a Berkeley professor named Eric Brewer in the late 1990s 
这最初是由1990年代末伯克利大学教授埃里克·布鲁尔（Eric Brewer）提出的
01:07:42 - 01:07:49
and then it was formally proved at MIT that this is actually correct this is a true theorem in 2002 
然后在麻省理工学院正式证明这是正确的，这是2002年的一个真实定理


01:07:49 - 01:07:53
and the basic idea is that all these three things if you're going to have it distributed DBMS
基本的想法是，如果要使用分布式DBMS，对于这三件事，
01:07:54 - 01:07:57
you have to pick two of these you get two out of three 
你需要完成这三者中的两个
01:07:58 - 01:08:04
right it's kind of like if you want it's like you know if you looking for a husband or a wife
这就好比，如果你正常找一个对象谈恋爱
01:08:05 - 01:08:09
you can pick someone's either smart good-looking or not crazy, but you can get me a two out of three of those things right
你可以选择某人的聪明帅气或老实，但你可以让我从这三个特征中选出两个来作为择偶标准
01:08:10 - 01:08:12
same thing for distributed databases 
对分布式数据库来说是一个道理
01:08:12 - 01:08:13
So let's go footsies one by one
让我们一个个的来了解下


01:08:13 - 01:08:20
again the idea is that it's this sort of Venn diagram, where you have C A P, which you can never be in the middle of here 
我们来看这个文森图，这就是CAP，这三者中间相交的这部分你永远不可能做到
01:08:20 - 01:08:22
you can never get a system has guarantees all these things 
你永远找不到这样一个可以同时兼顾这三者的系统


01:08:23 - 01:08:28
so the consistency just means linearizability thinking this is a stronger version of serializability
 一致性就是指线性一致性，你可以把它想象成是可序列化的增强版本（知秋注：其实就是强一致性）


01:08:29 - 01:08:35
availability means that at any given time, we can access any node and get any data in our system 
availability（可用性）是指在任意给定时间，我们可以访问任何节点并获取系统中的任何数据（知秋注:但是不保证获取的数据为最新数据）


01:08:35 - 01:08:39
and then partition tolerant this means that if we start losing messages 
分区容错性（Partition tolerance）意思是，如果我们有丢失消息
01:08:39 - 01:08:45
because the network goes down a machine goes down, that we can still process any response that we could ever want
因为可能会遇到网络故障，机器故障，在这种情况下，我们仍然可以处理并得到我们想要的任何响应
01:08:46 - 01:08:55
so the NoSQL guys, they are going to be AP, they're gonna try to provide availability and partition tolerance 
so 对于NoSQL这些家伙们，他们走的都是AP路线，他们会尝试提供可用性和分区容错
01:08:56 - 01:08:59
in exchange for giving up consistency like, that's the eventual consistency thing 
作为交换，它们放弃了强一致性，选择了最终一致性
01:08:59 - 01:09:04
like I can't guarantee that if I tell you I made your a ,I tell you that you're right it's exceeded, 
就像我不能保证，如果我告诉你它执行了
01:09:04 - 01:09:06
that I guarantee that everyone's gonna see that right 
我无法保证每个人都能看到正确的数据
01:09:07 - 01:09:11
in the sort of newSQL or the traditional transactional distributed of DBMS
在newSQL或传统的事务型分布式数据库
01:09:11 - 01:09:14
they're gonna try to do CP or CA 
他们选择的要么是CP，要么是CA
01:09:15 - 01:09:20
and then their award if like I can't talk to a node rather than keep on running, I just shut the whole thing down
如果我不能和一个节点通信，与其继续运行，我要做的就是关闭整个事情


01:09:21 - 01:09:24
and in that case I give up I give up a bell Doty 
 看ppt中的骷髅头


01:09:25 - 01:09:28
all right so let's go through these one by one ,I think we've covered most of these already
让我们一个接一个地讲解这些，我想我们已经涵盖了其中大多数
01:09:28 - 01:09:31
but just to show them visually to understand what they actually mean 
这里通过例子来直观地展示它们，以了解它们的实际含义
01:09:32 - 01:09:37
so again with consistency, the idea is that, if we do a write on one machine that everyone should see that right 
对于consistency，它的指的是，如果我们在一台机器上进行写操作，那么每个人都应该看到正确的
01:09:38 - 01:09:40
before we tell the outside world that are right it succeeded 
即在我们告诉外界它成功之前




01:09:40 - 01:09:45
so our transaction is running on this application server here, it wants to set A=2 
我们的事务正在此application server上运行，它想 set A=2



01:09:45 - 01:09:48
and then we're going to propagate that change to this replica
然后我们需要将该修改传播到这个replica上，


01:09:48 - 01:09:51
and then we can tell the outside world that we did acknowledge there right 
然后我们告诉外界，我们做到了，即发出了ack
01:09:52 - 01:09:59
and at this point whether we read a on the replica or on the master will see A=2
 此时，不管你访问的是replica还是master，你得到的结果都是A=2


01:09:59 - 01:10:04
right so another application server can immediately see after this right has succeeded, I can see A=2 
so 另一个 application server在此执行成功后，立即查看，看到的结果也是A=2 



01:10:05 - 01:10:07
and I get back the correct response partition 
我从分区上得到的相应结果是正确的


01:10:09 - 01:10:14
tolerance sorry availability says that if this replica it goes down
 availability 是指，如果这个replica挂掉了


01:10:14 - 01:10:21
then either the mat this application server or this other application server can read and write to anything that at once here 
无论这个 application server还是另一个 application server都能在master这里进行读和写
01:10:23 - 01:10:23
all right 



01:10:26 - 01:10:31 
and then the last one is partition tolerance the idea here is that, say the network goes down
对于最后一个partition tolerance来说，它的主要思想是，如果这里的网络挂掉了
01:10:31 - 01:10:34
the network that I'm using to communicate between these two machines goes down 
即用于这两台机器通信的网络GG了


01:10:34 - 01:10:40
the machines don't go down, but it never goes down, or my messages my packets are getting lost in the network 
但机器没有挂掉，我们的信息数据包在网络中丢失了
01:10:40 - 01:10:41
so now what's gonna happen here 
so now 这会发生什么
01:10:42 - 01:10:45
well soon again before we had master replicas set up 
在我们建立master replicas模式之前
01:10:45 - 01:10:49
and I said with master up like I set up, you run Paxos to decide who then who the master is 
我说过，我们通过Paxos 来选举得到谁才是master
01:10:51 - 01:10:53
and then that's where all the updates are gonna go 
然后，这就是接下来要做的事情，即选master
01:10:53 - 01:10:57
so at this point, there's that there's a network partition
此时，就会出现一个网络分区（脑裂了）
01:10:57 - 01:11:01
so these guys can't communicate, but they know they're so up like you know you're still alive 
这些家伙无法通信，但是这些机器依然活得好好的
 


01:11:02 - 01:11:06
so now you run Paxos, and you find out oh I'm still alive now I'm the new master 
现在你运行Paxos选举，这个家伙就会说，哈哈，我成了新的master了


01:11:08 - 01:11:13
all right so now if my two application servers send at the exact same time updates to my database 
如果这两个 application server同一时间发送了更新请求到我的数据库中


01:11:13 - 01:11:16
this guy's set A=2, this guy's set A=3 
这个家伙做的是set A=2，这家伙做的是set A=3
01:11:16 - 01:11:22
both of these nodes think that their master because they ran packs those that was fine  you know no one else about loaded us where the master 
这俩节点都会以为它自己是master，他们可以接收并处理请求

01:11:22 - 01:11:25
so we said okay it's okay for me to go ahead and make this change 
so 我们说，ok，对我来说我可以执行此修改


01:11:25 - 01:11:27
we send the acknowledgment that we made that change 
在修改落地后，我向Application Server发出了ACK信息


01:11:27 - 01:11:33
but now at some point, the network comes back, and I need to reconcile this change in synchronizing 
现在，在这个点，网络恢复了，我需要对协调同步此更改


01:11:34 - 01:11:37
and now you're screwed, because now one guy set A=2, and this other guy set A=3 
现在，你就懵圈了，因为这家伙set A=2，另一个家伙set A=3 
01:11:37 - 01:11:40
and we told the outside world that those rights succeeded 
我们都告诉外界我们落地成功了
01:11:42 - 01:11:43
so yes 
请讲
01:11:49 - 01:11:53
so question is when  you have CP you mM you can't really 
so 他的问题是当你具有CP特性时，你不能。。。
01:11:56 - 01:11:56
take the back
再重复一下
01:11:58 - 01:12:00
yeah so this what I'm saying it's sort of 
 so 这就是我所说的


01:12:00 - 01:12:04
so what would CP look like, CP said what the network goes down 
cp是指在网络挂了之后
01:12:05 - 01:12:10
I can't communicate these two nodes, what should I do
这俩节点无法通行了，我该怎么做
01:12:10 - 01:12:19
so if I'm doing like a K-safety thing, where I say, I need to have three copies of the data at all times 
so 如果我做了诸如K-safety这样的事情，我会说，我需要一直存在关于此数据对象的三个副本
01:12:19 - 01:12:21
and say I have another node over here
也就是我在这里还有一个节点
01:12:22 - 01:12:28
so these two guys would you say hey we have at least two copies, we're fine, we do leader election, this guy says he's the master
这俩节点会说我们至少得有俩副本才行，我们来搞个选举吧，这家伙说它是master
01:12:29 - 01:12:31
so now anybody can do writes here and then that's fine
so 现在，每个人都可以在这里进行写操作，然后万事大吉
01:12:32 - 01:12:35
this guy over here say well K-safety is two 
这家伙，会说，K-safety 是2
01:12:35 - 01:12:41
but I only have one, so I have to shut down, I can't run anything, so therefore I'm giving up availability
但只有我自己一个，so，我得shut down，我不能运行任何东西，因此我放弃了可用性
01:12:41 - 01:12:49
so in that case I can have I'm technically handling the partition in the network, by being not available on that side 
在这个例子中，我可以通过技术手段来处理网络割裂，让那一边的机器不再可用
01:12:49 - 01:12:50
but this sides okay 
但这边的机器是ok的
01:12:51 - 01:12:58
so this is called split-brain initiative systems like, I have two sides like two brain size the brain can't communicate, and they both think they're their king of the world 
so这就是所谓的系统脑裂（split-brain），我这两遍边就像两个大脑，无法通信，它们都觉得他们是这个世界的王


01:13:01 - 01:13:05
so again in a traditional transactional DBMS  
so 在传统的事务型DBMS中
01:13:05 - 01:13:10
they basically stop the system when you realize you can't communicate with everyone 
当你意识到你无法与所有人交流时，它们基本上会停止系统
01:13:11 - 01:13:14
right or if you have a majority then you say I'm the new master
如果你在一个绝大多数分区中，然后你会说，我是新的master


01:13:14 - 01:13:17
and so in this example here if say this guy came back up 
 在这个例子中，如果这个家伙归来了


01:13:19 - 01:13:23
well assuming that seeming this guy if this guy was allowed to make changes
假设这个家伙可以进行修改
01:13:25 - 01:13:28
because it had its K-safety case a factor was enough 
 因为它的K-safety条件满足了


01:13:28 - 01:13:32
then when I came back, I would have to have a new human come in and resolved this change 
当网络恢复后，我需要人工解决这个修改冲突的问题
01:13:32 - 01:13:36
we can't magically just do that in our system 
我们不能很简单地在我们的系统中做到这一点
01:13:36 - 01:13:42
and in that case we again we stopped the world and we go offline until someone comes in and fixes us, yes 
在那种情况下，我们再次全部停下来，然后离线，直到有人进来修复
01:13:49 - 01:13:49
yes 

01:13:58 - 01:14:04
correct so his calm is how do I avoid the split-brain, well if your case safety factor is half the node plus one 
他的问题我们该如何做才能避免脑裂（split-brain）,如果你的safety因子的大小为node数量的一半+1
01:14:04 - 01:14:06
that means that at least you're always guaranteed to have 
也就是意味着至少你要一直保证的是
01:14:07 - 01:14:13
yeah only one side could be the master and the other guy fails, yes 
只有一侧可以出现master，另一侧就失败咯
01:14:15 - 01:14:17
that's it there's no magic, right 
这没什么可神奇的
01:14:19 - 01:14:22
and again so going back to the NoSQL guys 
让我们的关注点回到NoSQL 


01:14:23 - 01:14:30
in their world again, they're dealing with like in it traditionally with dealing with like websites, that you want to have been online 24/7 
在NoSQL 眼里，他们处理类似传统的网站，即你想让它们7*24在线
01:14:30 - 01:14:36
so in their world, they would rather have the system be available and still serve the request 
在他们眼里，他们更喜欢让系统可用并一直提供请求服务
01:14:36 - 01:14:40 
albeit maybe they're there they're slightly wrong or delayed in getting that all the changes 
在获取所有的修改数据时，可能会有一点点数据上的错误或延时
01:14:40 - 01:14:43
but that was better than being completely online 
但有些不适合这个场景
01:14:43 - 01:14:50
if you're dealing with money, and you can't, you don't want, I don't want to give out you know a million dollars to you that I don't have 
如果你处理的是钱，你当然不想发生数据异常，你懂得，一百万美金可能就没了
01:14:50 - 01:14:52
and again a million dollars ever here from you know because I have a split-brain 
一百万美金可能在这里，因为发生了脑裂，所以可能你看到的是美金消失了
01:14:53 - 01:14:56
in their role, they can't have that happen, so they'd rather take the whole thing down 
在这种情况下，我们是不允许这种事情发生的，所以他们更倾向于直接让所有事情停下来
01:14:56 - 01:15:03
so I'm not saying one is better than another, I'm saying for certain application scenarios, one is preferred preferable 
so 我没有说一个比另一个更好，我说的是在合适的情况下选择最适合的方案
01:15:06 - 01:15:11
but it's just sort of good understand like, when you start to design your distributed DBMS, what trade-offs are you actually making
在你开始设计你的分布式dmbs的时候，你要根据实际情况来做衡量选择的


01:15:15 - 01:15:15
okay 

01:15:17 - 01:15:20
so let's just finish out quickly about federated DB
So，让我们快速结束 异构联合数据库的内容
1.15.20-01:15:26
so the cap theorem again, it's include to be correct in the late 2000s some years ago
so，cap定理是在2000年后被证明是正确的

01:15:27 - 01:15:29
if you go Google the phrase like defeated cap theorem 
如果你去Google一下cap 定理
01:15:29 - 01:15:34
there's a bunch of people making wild claims about, how their database is defeated a cap theorem 
有一堆人大肆宣称，他们的数据库是如何如何打破了CAP定理
01:15:34 - 01:15:36
and they were presently put down as being stupid 
他们是真的是够蠢的
01:15:37 - 01:15:41
its second you can't have it you distributed DBMS, you can have at your distributed DBMS, that can do everything
你无法让你的分布式DBMS面面俱到的
01:15:41 - 01:15:52
you can do a bunch of extra stuff to try to mitigate the bottleneck sort of the issues you would have, by having these various these, you know machine know down and things like that so redundancy 

你可以做很多额外的事情来尝试降低瓶颈，例如，通过解决这些问题，比如，你知道机器已经崩溃了，那就对它进行冗余，来降低崩溃的瓶颈


01:15:52 - 01:15:58
so that you can you know reduce the likelihood of a network partition or things like that 
So，你可以降低网络割裂或者其他类似事情发生的可能性
01:15:58 - 01:16:00
but in the end of the day, they're unavoidable 
但最终，这些东西都是不可避免的
01:16:01 - 01:16:02
at some point, you're gonna run out of money 
在某一时刻，你可能会烧光你手里所有的钱
1.16.02-1.16.03
or the system gonna get you slow
或者，系统可能会变慢
1.16.03-1.16.07
, and you're gonna become beholden to it
然后你就迷恋上这种调优了
01:16:07 - 01:16:08
all right 

1.16.08-1.16.09
so let's just finish up quickly 
So，我们快点结束吧
01:16:09 - 01:16:14
so I just want to briefly mention what a federated database is
So，我想简单提下什么是异构联合数据库
1.16.14-1.16.18
so that if you ever see one or think about building one 
So，如果你曾经见过这种数据库或者想去构建这种数据库
01:16:18 - 01:16:19
you just know what it is 
你需要知道它是什么样的
01:16:20 - 01:16:24
so in all this distributed DBMS, we talked about so far 
So，在目前为止，在我们所讨论的分布式DBMS中
01:16:24 - 01:16:29
we have assumed that all the nodes are running the exact same DBMS  software 
我们假设所有节点运行着的是同一套DBMS软件
01:16:29 - 01:16:34
right it's in here it's distributed version of MySQL, distributed version of CockroachDB or whatever 
它可以是分布式版的MySQL，也可以是分布式版的CockroachDB
01:16:35 - 01:16:38
but sometimes in some systems in sort of large organizations 
但有时候，在某种大型组织所使用的系统中
01:16:39 - 01:16:46
you have these sort of applications that are using, you know this kind of DBMS, and then it's other applications using this other type of DBMS  
你可能会遇上这种情况，即这种应用程序会使用这种DBMS，其他的应用程序则是由另一种DBMS
01:16:46 - 01:16:51
and they need a way to sort of do maybe transactions across all of them, do queries across all of them 
它们需要通过某种方式在这些数据库之上执行事务，或者进行查询
01:16:51 - 01:16:53
so they appear as a single database instance
So，它们对外以一个数据库实例的形式出现
1.16.53-1.16.57
even though underneath the covers they're running completely different software
虽然在底层，它们运行的是完全不同的软件 


01:16:58 - 01:17:03
so this is what a federated database is designed to solve 
So，这就是异构联合数据库被设计出来要去解决的问题


01:17:03 - 01:17:04
the idea is that
这里的思路是
1.17.04-1.17.07
 we provide a single logical database instance 
我们提供一个单个逻辑数据库实例
01:17:07 - 01:17:11
and we know how to take a single query on that single database instance 
我们知道该如何在单个数据库实例上执行单个查询 
01:17:11 - 01:17:14
and break it up into plan fragments
将这个查询拆分为计划碎片
1.17.14-1.17.17
 that we can then possibly execute on the separate machines 
这样我们就可以在单独的机器上执行这些任务
01:17:17 - 01:17:19
and we have a way to sort of put it all back together 
我们会通过某种方式将这些执行结果组合在一起
01:17:19 - 01:17:23
so this was a big thing in the late 1980s early 1990s
So，这是1980年代末和1990年代初所出现的一个重要东西
01:17:24 - 01:17:26
right as companies and organizations got larger 
当这些公司和组织的规模变得更大时
1.17.26-1.17.28
and there were more database deployments 
它们就要部署更多的数据库
01:17:28 - 01:17:31
you think would it be great we had a single interface for all our databases 
如果我们通过单独一个的接口来调用我们所有的数据库，你就会觉得这很棒
01:17:31 - 01:17:32
it didn't pan out
但这进展并不顺利
1.17.32-1.17.38
because you end up designing a system that has to do with the lowest common denominator of all your systems
因为你最终设计出来的系统必须能够做到实现你所有数据库系统的最小通用功能
01:17:38 - 01:17:39
all right

1.17.39-1.17.40
this system doesn't do the transaction
比如：这个系统不能执行事务
1.17.40-1.17.41
or this doesn't do these type of queries
或者，它不能执行这类查询
1.17.41-1.17.43
so we can't do that for other systems 
So，我们也就不能在其他系统中做这些事情
01:17:44 - 01:17:44
all right

1.17.44-1.17.46
so again people try this, people still try this 
So，人们依然在尝试探索这方面的东西
01:17:50 - 01:17:51
it's usually a bad idea
通常来讲，这是一个糟糕的想法
1.17.51-1.17.52
 it's not gonna end well 
人们依然在继续探索中
01:17:52 - 01:17:54
you do simple things
你可以做些简单的事情
1.17.54-1.17.54
but you know having this is beautiful all in the one federated databases, it's not gonna work
但你想将所有的功能都放入一个异构联合数据库中，这是不可行的



01:17:58 - 01:18:00
so again basic ideas like this
So，它的基本思想是这样的
1.18.00-*1.18.01
you have your application server 
这里我们有一个应用程序服务器
01:18:01 - 01:18:04
you have your middleware system and your separate backend databases 
接着，这里是我们的中间件系统，然后这里是我们的后端数据库



01:18:04 - 01:18:06
so single query goes to the middleware
So，我们会将查询请求发送到中间件这里
1.08.06-1.18.09
and then it recognizes what all these different systems can actually support 
接着，中间件系统会意识到哪些不同的系统能支持处理这个查询
01:18:09 - 01:18:14
and so it rewrite the portion of the query that you want to run on these different machines for their different APIs
So，它会重写该查询中的部分内容，这样我们就能在不同的机器上使用不同的API对其进行处理
01:18:14 - 01:18:15
right so MySQL does SQL
So，MySQL使用的是SQL
1.18.15-1.18.18
MongoDB does JSON queries
MongoDB使用的是JSON查询
1.18.18-1.18.22
Redis does its own thing in the subway is whatever
Redis则是使用它自己的处理逻辑
01:18:23 - 01:18:23
alright

1.18.23-1.18.27
so it knows how to take all those queries break it up and run on those separate machines 
So，它知道该如何将这些查询进行拆分，并在不同的机器上执行这些查询
01:18:28 - 01:18:29
and then you get back the result 
然后，它们会将结果返回给我们


01:18:29 - 01:18:32 
so these things are usually call connectors  
So，这些东西通常叫做connectors
01:18:32 - 01:18:37
they have the ability to communicate with these different databases and pull them into the single system 
它们有能力和这些不同的数据库进行通信，并将这些数据库放入一个系统中使用


01:18:38 - 01:18:45
the one database that is the the best positioned to do a federated databases architecture is actually PostgreSQL
其中一种能做的最好的这种类型的异构联合数据库架构的DBMS就是PostgreSQL
01:18:46 - 01:18:48
so PostgreSQL has this thing called the foreign data wrappers 
So，PostgreSQL有一种叫做Foreign Data Wrappers的东西
01:18:48 - 01:18:50
think of this is like an API
你可以将它想象为一种API
1.18.50-1.18.52
 oh you can plug in different data sources
你可以将它用于不同的数据源上面
1.18.52-1.18.56
that are outside the normal PostgreSQL storage
对外展示的则是这种普通的PostgreSQL存储
01:18:56 - 01:19:01
so there's do foreign data wrappers for you know for Mongo and all these other systems 
So，我们可以对Mongo和其他所有的数据库系统都使用这种foreign data wrapper
01:19:01 - 01:19:04
so I write all MySQL queries into PostgreSQL 
So，我可以在PostgreSQL中编写MySQL查询语句
01:19:04 - 01:19:09
then the foreign-data wrapper knows how to go out to these individual systems, and suck the data in
foreign data wrapper知道该如何跑到这些数据库系统中，并往里面塞入数据
1.19.09-1.19.11
 which I think is pretty cool 
这点我觉得很Cool
01:19:11 - 01:19:11
okay 

01:19:13 - 01:19:15
so any question about any of this
So，对此你们有任何问题吗？
1.19.15-1.19.17
as I said yes, in the back
后面那位，请讲


01:19:23 - 01:19:24
alright so question is
So，这里的问题是
1.19.24-1.19.29
 can I recommend any distributed OLAP or OLTP system, OLAP
你要我推荐的是分布式OLAP系统，还是OLTP系统？是OLAP对吧
01:19:29 - 01:19:31
let's take this offline
我们课后再讲
1.19.31-1.19.32
 because it's a complicated question
因为这是一个复杂的问题
1.19.32-1.19.33
 depends on what are you trying to do,
这取决于你要试图做什么
1.19.33-1.19.35
 what does your data look like
你的数据长什么样
1.19.35-1.19.37
, how much data do you have 
以及你的数据量多大
01:19:37 - 01:19:39
do you want SQL or NoSQL 
你想使用SQL还是NoSQL
01:19:42 - 01:19:42
why 
为什么呢？
01:19:46 - 01:19:53
I mean there's like, you seen dbdb.io, there are 680 databases
你之前应该看过dbdb.io，上面有680多个数据库系统
1.19.53-
 to some 260 whatever like 

01:19:55 - 01:19:59
there's not gonna be this one magic thing that solves all the world's problems 
这里面不存在那种能够解决世界上所有问题的数据库系统




01:19:59 - 01:20:01
you have to look at your application requirements 
你需要去结合你应用程序的实际需求
01:20:01 - 01:20:05
and end up making compromises about what you know ,what features you need ,what features you don't need 
最后，你需要做出取舍，找出哪些是你需要的功能，哪些是你不需要的功能
01:20:05 - 01:20:07
how much money you will spend 
以及你的预算是多少
01:20:08 - 01:20:08
right 

01:20:13 - 01:20:15
so let's cover this next class
So，我们会在下节课的时候介绍这个
1.20.15-1.20.17
 is a popular distributed OLAP DBMS will come at next class 
我们会在下节课的时候介绍一个很流行的分布式OLAP DBMS
01:20:18 - 01:20:20
some popular distributed OLTP systems 
对于那些流行的分布式OLTP系统来说
01:20:21 - 01:20:26
so all the the major vendors SQL server,DB2 and and Oracle
So，对于所有那些主流的数据库厂商（SQL Server、DB2以及Oracle）来说
01:20:26 - 01:20:29
they all have their own distributed DBMS
它们都有它们自己的分布式DBMS
01:20:29 - 01:20:29
all right
1.20.29-1.20.37
there's newer startups like Cockroach,TiDB , Yugabyte, Fauna ,Mongo's distributed 
当然这里也有一些新兴的数据库初创企业，比如Cockroach、TiDB、Yugabyte、Fauna以及Mongo的分布式DBMS
01:20:37 - 01:20:40
right they all make you know they all have different trade-offs 
它们在这上面都做了不同的权衡
01:20:41 - 01:20:45
well covered I'll list out some OLAP system next class and actually
我会在下节课的时候列出一些OLAP系统
01:20:46 - 01:20:47
let's talk let's talk offline
我们课后再去讨论
1.20.47-1.20.49
maybe there's some of your cover at the potpourri in the last class 
我们可能会在最后一节课讨论Potpourri的时候介绍下
01:20:50 - 01:2050
all right


1.20.50-1.20.53
so again the main takeaway I saw from beginning is that 
So，我们从本堂课学到的主要是
1.20.53-1.20.57
we assumed all our database nodes in our system are friendly 
我们假设我们系统中所有的数据库节点都是可信的
01:20:57 - 01:21:00
that makes our life easier of how we do commits and transactions and Replication
这使我们在处理事务提交、事务以及Replication方面变得更为轻松
01:21:01 - 01:21:01
if they're not friendly 
如果这些节点并不可信
1.21.01-1.21.03
then that's what the blockchain is
就拿区块链为例
1.21.03-1.21.05
and the blockchain worked
区块链的工作方式是
1.21.05-1.21.06
 if they do to prove
如果它们要进行证明
1.21.06-1.21.07
that when we say commit transactions 
当我们说要提交事务的时候
01:21:07 - 01:21:10
we want to commit a transaction ,that everybody actually committed transaction
当我们想提交事务的时候，所有人实际都已经提交了事务
01:21:11 - 01:21:14
and in case a Bitcoin that's all the hashing stuff they do with the Merkle trees 
在比特币的例子中，他们使用的是Merkle tree来进行hash处理
01:21:15 - 01:21:15
okay


01:21:16 - 01:21:22
all right so Monday's class next week will be the last lecture on the distributed databases will cover distributed OLAP systems 
下周一那节课是分布式数据库的最后一堂课，我们会去介绍分布式OLAP系统
01:21:22 - 01:21:26
I think that'll be the end of the material for the for the semester
我认为这是这学期我们最后要讲的内容
01:21:26 - 01:21:29
that'll be covered on the final 
这在期末考试的时候也会有所涉及
1.21.29-1.21.31
on when we come back after Thanksgiving
当感恩节假期结束的时候
1.21.31-1.21.32
, that'll be the guest lecture from Oracle 
Oracle的人会给我们进行一场客座演讲
01:21:33 - 01:21:35
and then the system potpourri in the final review, okay 
Potpourri则是放在最后一节课
01:21:36 - 01:21:36 
any questions 
有任何问题吗
01:21:38 - 01:21:38
all right guys have good weekend see you
下周再见




