15-01
00:15 - 00:16
okay let's start it
Ok，孩⼉们我们开始吧
00:17 - 00:20
All right,again Thank You DJ drop tables
感谢DJ Drop Table
00:21 - 00:27
okay so real quick some announcements for the course in terms of projects
So，我要快速讲下关于project的事情
0.27-0.31
project 3 will be released today ish tomorrow ish
Project 3可能会在今天或者明天放出来
00:31 - 00:34
and that'll be due in November on Sunday
然后，你们要在11⽉17号的时候上交
00:35 - 00:40
I just be doing the 15th I've updated it yesterday announced due on the Sunday on the
17th
这点我在15号的时候已经更新过了，昨天我刚宣布你们的Project 3的截⽌⽇期是11⽉17号
00:40 - 00:43
Homework 3 will be released next week ,so I went to worry about that yet
Homework 3我会在下周放出，So，你们还不⽤去管它
00:44 - 00:47
But that'll be due before the before project 3
但它会在Project 3之前截⽌
00:48 - 00:50
the other major announcement too is that
我要宣布的另⼀件重要事情就是
0.50-0.53
with my as I said in beginning of the semester
正如我在这学期开始时说的
0.53-0.54
my wife is pregnant
我⽼婆怀孕了
00:54 - 00:56
I think it's mine
我觉得是我的种
00:59 - 01:04
and so they are taking it out of her on on Wednesday night
So，医⽣会在周三晚上帮我⽼婆接⽣
01:05 - 01:08
I had him schedule it after the Sigma deadline on Tuesday which is the big database
conference
周⼆我还要参与⼀个⼤型数据库会议
01:08 - 01:10
so it's happening on Wednesday
我们周三有课
01:10 - 01:12
so next week I won't be here
So，下周我不在学校
1.12-1.14
DJ drop tables will be here
DJ Drop Table会在这⾥
1.14-1.17
and then my PG students will will teach those two lectures
我的研究⽣学⽣会给你们上两节课
01:18 - 01:20
and then depending on what happens
视情况⽽定
1.20-1.22
I should be back maybe the following week or so
我可能会在下下周才回来
1.22-
we may adjust there's that
01:25 - 01:28
I think we wait they told me originated was coming up to 30th
他们当时告诉我这件事的时候都快30号了
1.28-1.30
so I canceled class on the 30th
So，我当时只能取消了30号的课
1.30-1.32
but now it's coming out whatever this Wednesday is or Thursday
但现在我知道他们是在这周三或者周四举⾏
01:33 - 01:36
so I might adjust whatever that that day off is
So，我得调整下那天的时间规划
1.36-1.43
but the goal is to get all the material you'll need to do homework number 3 and in the
next two weeks ,okay
但我的⽬标是在接下来两周，让你们掌握你们在Homework 3中所需要⽤到的⼀切
01:43 - 01:45
any questions about this
对此有任何疑问吗？
1.45-1.50
I will post this on Piazza with you know more information
对此，我会在Piazza上贴出相关详细信息
01:51 - 01:52
it's real
我说的是真的
01:55 - 1.57
alright the other change also too is that
还有⼀个变化就是
1.57-2.05
the original schedule was that last class before the midterm was all about query
optimization ,we obviously ran out of time
原定计划是我们要在期中考试前的最后⼀节课上讲完查询优化的，但很明显，我们时间不够
02:05 - 02:10
so I've decided to split that lecture now into two parts ,so this is part two
So，我决定将查询计划这节课分成两节，So，今天要讲的是查询优化的第⼆部分
02:10 - 02:14
and then I've dropped the lecture on embedded database logic
那么，我就不会去讲嵌⼊式数据库系统逻辑这块内容
2.14-2.18
which is not really something we need to note in or the build of database system
在构建我们的数据库系统的时候，我们并不⽤去在意这个东⻄
02:18 - 02:26
it's sort of just a with you for you guys to understand like oh there's other things you can
do other than just throwing SQL at the database
对于你们来说，你们还要去理解⼀些其他东⻄，⽽不是只是将SQL语句往数据库系统⾥⾯⼀扔就
完事了
02:27 - 02:28
so if you're curious about that
So，如果你对它⽐较好奇
2.28-2.33
you know I'll send the postal link on Piazza ,you can watch last last year's lecture on
that topic
我会在Piazza上贴下前⼏年关于这个课题的链接
02:34 - 02:35
query optimization is kind of more important
查询优化要⽐它重要得多
02:35 - 02:38
so I think it's better to spend more time on this
So，我觉得在查询优化上⾯花更多时间会来得更好
02:38 - 02:38
okay
02:40 - 02:40
all right
2.40-2.46
so last class when we started talk about query optimization, we focus on this first part
here
So，上节课我们讨论查询优化的时候，我们的重点是这第⼀部分
02:47 - 02:53
right how to do apply rules and heuristics to make changes to the to the query plan
即如何通过这些规则来修改查询计划
02:54 - 03:00
Without having to examine the data or understand what the database actually looks like
on the inside
在⽆须测试数据或理解数据库内部真实数据的情况下
03:00 - 03:06
we may need to look at the catalog to understand what our attributes are whether
they're unique or not, and whether we have foreign keys
我们可能只需要去看Catalog中的表中属性，看看它们是不是唯⼀的，或者这⾥⾯有没有外键存
在
03:06 - 03:13
but we don't need to know anything about you know our distribution of values in the
tables look look a certain way, or we have this number of tuples
但我们不需要去知道表中这些值的分布情况或者是表中tuple的数量
03:14 - 03:20
all right so these are all rules that we could do without actually looking at understand
,you know what are tuples look like
So，我们使⽤这些规则的时候，我们⽆须去理解这些tuple具体是怎么样的
03:21 - 03:25 ！！！！！
so today now we're gonna focus on the second part here ,which is the more complicated
part
So，今天我们的重点是这第⼆部分，它也是最难的⼀部分
03:26 - 03:36
where we're now we're going to use a cost model to allow us to assess the quality, or
the amount of work we're gonna have to do for a query plan without before we even
actually run it
现在我们要做的事情是，在不实际执⾏该查询计划的情况下，我们通过成本模型来估算该查询计
划中我们要做的⼯作量有多少
03:37 - 03:38
and the idea here is that
这⾥的思路是
3.38-3.41
we want to be able to enumerate as many query plans as possible
我们想能够列出尽可能多的查询计划
03:42 - 03:44
and then pick whatever which one we think is the best
然后从中选出我们认为最好的那个查询计划
03:45 - 03:50
and so the more accurate our cost model is the more accurate our selection will be for
what the best query plan is
So，我们的成本模型越准确，那么我们所选出的查询计划也就更好
03:50 - 03:55
but as there seems to go along ,it's this is super hard and everybody's gonna get this
wrong
但随着我们的深⼊，你会发现它⾮常难，⽽且每个⼈在这⽅⾯都会犯错
03:55 - 3.57
and then what I'll teach you today is
今天我要教你们的是
3.57-4.02
a way so the textbook shows, it tells you how to do it which is which is really really
wrong
其实教科书上⾯向我们展示的东⻄其实错的很彻底
04:03 - 04:05
but we'll talk about little help we could possibly fix these things
但我们会讨论该如何修正这些东⻄
04:05 - 04:06
but this is something we can recover in the advanced class
这些东⻄我们会在⾼级课上重新讲
4.06-4.09
or if you take more
如果你在这上⾯花的时间更多
如果你想在这⽅⾯探索更多
4.09-4.14
you know you can do people have done dissertations on this kind of thing, and it's still
still a unsolved problem
你知道的，⼈们对此做了⼤量的研究，但这依然是个未解决的问题
04:14 - 04:19 ！！！
alright so today's agenda we're going to first talk about how to do again plan cost
estimation with our cost model
So，今天我们⾸先要讲的东⻄是，我们如何通过我们的成本模型来对查询计划进⾏成本估算
04:19 - 04:20
then we talk about how to do enumeration
接着，我们会去讨论如何根据（逻辑）计划进⾏（执⾏计划）枚举
4.20-4.28
how we're actually going to IntelliJ intelligently iterate or different possible query plans
in order to find the one that we think is the best
即我们实际该如何智能地列出所有不同的查询计划，以此来找到我们所认为的最佳⽅案
04:28 - 04:30
right,because again this is np-hard
再说⼀遍，因为这是NP-hard
4.30-4.31
we can't do an exhaustive search
对此，我们没法进⾏详尽的搜索
4.31-4.34
so we we need to be smart about what we're at looking at
So，我们要对我们所查看的东⻄⼼中有数
04:34 - 0436
and then we'll finish up talking about Nested sub-queries
然后，我们会结束关于nested sub-queries（内嵌⼦查询）的相关讨论
4.36-4.39
because this is slightly different than everything else
因为它和其他东⻄⽐起来有所不同
4.39-4.45
and there's rules we can use to to rewrite them and to make them more efficient
我们可以通过规则来对它们进⾏重写，并使其变得更为⾼效
04:45 - 04:47
so we already talked about this last class
So，我们已经在上节课的时候讨论过这个了
4.47-4.52
we talked this we said that you know what is a cost estimation what is our cost model
actually doing
上节课我们说过什么是成本预测，以及我们的成本模型实际做了哪些事情
04:52 - 05:00
and again it is essentially it's a way to approximate how much work or how long it's
gonna take to execute a query
本质上来讲，它是⽤来估测你执⾏⼀个查询时所要做的⼯作量或者所花时间的⼀种⽅式
05:01 - 05:04
And in general you always want to pick the one that's gonna have the lowest cost
⼀般来讲，你总是想去选择那个成本最低的执⾏⽅案
05:04 - 05:09
So this cost could be a combination of a bunch of different underlying hardware metrics
So，这种成本可能是由⼀堆不同的基础硬件性能指数所组成的
05:09 - 05:12
you know because that corresponds to the work we're actually going to do
因为这和我们实际要做的⼯作相关
05:13 - 05:15
so it could just be how much CPU were actually gonna use
So，它可以是我们在执⾏该查询时的CPU使⽤率
05:15 - 05:17
this is typically very hard to do
这通常做起来超级难
5.17-5.18
and we don't do this for a disk based system
我们不会在⾯向磁盘的数据库系统中做这种事情
5.18-5.20
because the disk is the major bottleneck
因为磁盘才是主要瓶颈
5.20-5.21
but an in-memory system would care about this
但在内存型数据库系统中，我们就不会去在意这种问题
05:23 - 05:27
we've already talked about how to do counting disk i/o for our join algorithm the sort
algorithms
我们已经讨论过如何在join算法以及sort算法中计算磁盘I/O次数
5.27-5.29
this is probably the major thing that we're going to focus on
这可能是我们接下来关注的重点
05:30 - 05:31
we also care about how much memory we're gonna use
我们也会去在意我们要使⽤的内存量
5.31-5.35
there could be one algorithm uses a lot of memory and gets faster performance
可能会有这样⼀个算法，它要使⽤⼤量的内存，并且它在速度上会更快
05:35 - 05:37
but we may not have that much memory actually use
但我们实际可能并没有那么多内存可供使⽤
5.37-5.41
so therefore we want to choose a slower algorithm that uses less memory
因此，我们就会想去使⽤另⼀个算法。虽然它的速度较慢，但它使⽤的内存量会更少的
05:42 - 05:44
Because that'll be less pressure on the system
因为这样对系统的负担也会更少
05:44 - 05.46
and then for distributed databases
接着，对于分布式数据库来说
5.46-5.49
it's again it's the number of Network messages is the high pole in the ten
它们所要发送和接收的⽹络消息的数量⾮常⼤
5.49-5.54
because sending things over the wire to between machines is always expensive
因为机器之间通过⽹线发送数据的成本⼀直都很⾼
05:54 - 5.56
And so in general at a high level
So，总的来说，从⾼级层⾯来讲
5.56-6.03
these are all going to be a proxy for are we gonna use the number of tuples we're gonna
access as a proxy for all these things
我们将我们要访问的tuple数量作为成本中的参考值进⾏使⽤
06:03 - 06:08
right essentially determining how much data we're going to pass from one operator the
next
本质上来讲，就是我们要去确定数据从⼀个operator传到下⼀个operator时，所传数据量的⼤⼩
06:08 - 06:10
And we can use that to derive which one we think is the best
我们可以根据它来推导出我们所认为的最佳⽅案
06:11 - 06:11
so as I said
So，正如我说的
6.11-6.20
we can't just you know the way to get the most accurate estimation of what a query
plan is gonna do is actually just execute the query plan
你知道的，我们没办法对查询计划所要做的事情做到最为准确的预测
06:20 - 06:24
but if we're looking at thousands and thousands of different possible query plans
但如果我们去查看成千上万种可能的查询计划时
6.24-6.25
we can't possibly execute every single one
我们不可能把每个查询计划都执⾏⼀遍
06:26 - 06:29
so we need a way to to approximate this
So，我们需要⼀种⽅式来估算它的成本
06:30 - 06:31
and this is what our cost model is going to do
这就是成本模型所做的事情
06:32 - 06:43
And the underlying concept we're going to use our underlying component in our
database system we're going to use to do these estimations, is the internal statistics
catalogs of the database system
在DBMS中，我们⽤来估算成本时所使⽤的基础组件就是DBMS内部的statistics catalog
06:44 - 06:47
so every database system that does has a query optimizer
So，每个数据库系统都有⼀个查询优化器
06:47 - 06:49
that is using a cost-based search
它们使⽤了cost-based search
6.49-6.51
it`s gonna have this statistics module
它会有⼀个statistics模块
6.51-6.59
which is gonna allow it to collect information about what the tables look like ，what are
actually inside of the tuples
这允许我们去收集表相关的信息，即tuple中所保存内容的相关信息
06:59 - 07:02
and how you collect this information can vary based on the implementation
我们收集信息的⽅式取决于DBMS中对此的具体实现
07:03 - 07:08
so all the major systems have a way to force the database system to collect new
statistics, right
So，所有主流的数据库系统都会通过某种命令来强制收集新的统计信息
07:09 - 07:11
Analyze, analyze table, update statistics, runstats
⽐如：ANALYZE，ANALYZE TABLE，UPDATE STATISTICS和RUNSTATS
7.11-7.17
this tells the database system, hey do a sequential scan on my table ,and update my
statistics information
这会告诉数据库系统，Hey，对我的表进⾏循序扫描并更新下我的统计信息
07:18 - 07:22
some systems also come from this and cron jobs like every every so often periodically
just do a pass
某些系统会设置定时任务，它会经常定期去更新这些统计信息
07:23 - 07:25
other systems can piggyback off the queries as they run
其他系统可以在它们执⾏查询的时候，顺带更新这些统计信息
07:25 - 07:30
and say all right as I'm doing sequential scan，I'll also update my statistics as I go along
当我执⾏循序扫描的时候，我也会去更新我的statistics（统计信息）
07:30 - 07:40
other systems have triggers to say if the 10% of my or 20% my table has changed, let
me go fire off the RUNSTATS command and update things
其他系统会通过触发器来做到这点，⽐如说，如果我的表中有10%或者20%的数据发⽣了改
变，那么它就会去执⾏RUNSTATS命令来更新统计信息
07:40 - 07:43
right， there's no one way to do this better than another
我们没法说某个数据库系统的做法要⽐另⼀个来得更好
7.43-7.48
a common setup would be you like if you're running an OLTP system
如果你运⾏的是⼀个OLTP系统
07:48 - 07:52
You would disable this during the day, when you're doing most your transactions
当你在执⾏事务的时候，⽩天你可能会将这个功能禁⽤
07:52 - 07:55
But then at night time you can take passes through and update your stats
但在晚上的时候，你就可以启动这个功能，并更新你的统计信息
07:55 - 07:57
So during the day it's gonna be slightly off
So，在⽩天的时候，你可以暂时关闭这个功能
07:58 - 07:59
but that's still gonna be okay
但这是Ok的
08:00 - 08:02
because this is expensive to do
因为执⾏这个命令的成本很⾼
8.02-8..07
because this thing and this is a sequential scan on the entire table
因为它要对整表进⾏扫描
08:07 - 08:11 ！！！！！！！！
so let's gabble in a little math, but it's Andy math not hard math
So，我们要⽤到⼀点数学，但我要讲的数学并不是很难的那种数学
08:11 - 08:14
so everyone should be able to follow this
So，每个⼈应该都能看得懂
08:14 - 08:22
so the basic main information we're gonna maintain about every table, it's just the
number of tuples that they have
So，每个表中我们所要维护的主要基本信息就是每个表中所保存的tuple个数
So，我们会去维护每张表中的基本主要信息，也就是每张表中的tuple数量
08:22 - 08:27 *****
and the the number of distinct values we're gonna have for every single attribute within
our table
以及我们表中每个属性中不同值的数量
08:28 - 08:30
so we're actually gonna maintain this as a separate counter
So，我们会⽤⼀个单独的counter对它进⾏维护
08:31 - 08:39
because we just can't assume that you know I have X number of pages, and therefore I
can fit X you know y tuples in each page and it's x times y
因为我不能做这种假设，即我有x个page，每个page可以保存y个tuple，那么tuple的数量就是
x*y，这样是不⾏的
08:39 - 08:42
because again not every slot in every page will be full
因为并不是所有page上的每个slot都会存满数据
08:43 - 08:45
and then we talk about multi-version concurrency control
接着，我们会讨论多版本并发控制
8.45-8.49
we have multiple physical copies ,or multiple physical versions of every single logical
tuple
对于每个logical tuple来说，我们会保存它的多个物理副本或者是多个物理版本号
08:50 - 08:52
so we can't just you know count the number of blocks we have
So，我们没法去统计我们的block数量来作为我们的tuple数量
8.52-8.54
we're actually want to maintain this as a separate count
实际上，我们想通过⼀个单独的count值来对它进⾏维护
08:55 - 09:03
and then we'll talk about how we're actually going to compute the or maintain this
information to get the the number of distinct values for every single attribute
然后，我们会去讨论该怎么去计算或者维护这个信息，以此来获得每个属性中不同值的数量
09:04 - 09:06
so now with this basic information
So，通过这个基本信息
09:07 - 09:13
we can now derive a new statistic called the selection Cardinality defined by this
function SC
我们可以⼀个新的数据信息，我们将它称为Selection Cardinality（选择基数），这⾥我们定义
⼀个叫做SC的函数
09:14 - 09:21
and this is just gonna be compute the average number of records we're going to have or
give an attribute with that same value
我们通过tuple数量除以属性A下去重后的值的数量来计算出选择基数
09:22 - 09:28
so for every single distinct value I would say you know here's how many times that it
occurs
So，我想知道该属性中每⼀个去重后的值所出现的次数
09:29 - 09:31
so we just take the number of tuples that we have
So，我拿到我们所拥有的tuple数量
09:31 - 09:34
and we divided by the number of unique attributes that we have
然后除以我们所拥有的字段下去重后的值的出现次数
09:34 - 09:37
and that tells us for every single attribute how many times it occurs
该结果就会告诉我们它在每个属性中出现的次数
09:39 - 09:40
what's wrong with this
这⾥⾯有什么问题吗？
09:45 - 09:52
His says one like so he says one could be a thousand one could be one ,and this formula
clearly misses it, absolutely
So，他表示：如果我们的tuple数量是1000，另⼀个值是1，那么很明显，这个公式会错过某些
东⻄，确实如此
09:52 - 09:55
So this is one of the big assumptions we're going to make throughout the entire lecture
So，这就是我们在这节课上所要做的其中⼀个重要假设
09:56 - 09:58
and that is we're an assumed that we have uniform data
即我们假设我们的数据分布均匀
09:59 - 10:01
so this formula basically just saying
So，这个公式基本要表达的东⻄是
10.01-10.07 ！！！！
every single value occurs every C if every unique value that I have in my table for this
attribute
对于我表中这个属性中出现的每个去重后的值来说
10:07 - 10:10
it occurs it's the same number of times as all other values
它出现的次数和所有其他值出现的次数是相同的
10:11 - 10:13
But we know that's not how the real world works
但我们知道，现实世界中并不会出现这种情况
10:14 - 10:14
all right
10.14-10.16
so take like CMU for example
So，以CMU为例
10.16-10.20
CMU roughly has 10,000 students it's more than that, but it's simple math
粗略的来讲，CMU有10000名学⽣，实际学⽣的数量当然⽐这更多，但这⾥为了⽅便计算，我
们选10000
10:20 - 10:22
and it roughly has I think actually does have 10 colleges
假设CMU有10个学院
10:23 - 10:25
so if you assume you have uniform data
So，如果你假设你的数据分布很均匀
10.25-10.27
then you would say for all of 10,000 students
接着，你就会说，这⾥我们有10000个学⽣
10.27-10.29
you take 10,000 divided by 10
你会⽤10000除以10
10.29-10.31
and that's the number of students that are in college
然后，我们就会得出学院中学⽣的数量
10:32 - 10:34
it's exactly the same for every college
对于每个学院来说，数字都是完全⼀样的
10:34 - 10:35
but we know that's not the case,right
但我们知道实际并不是这样
10:36 - 10:37
this school computer science where I'm in
假设这是我所在的CS学院
10.37-10.41
that has way more students than the school Finance
它所拥有的学⽣要⽐⾦融学院的学⽣更多
10:42 - 10:44
it's a real-world data is skewed
So，这是现实⽣活中的数据偏斜
10.44-10.47
but to make our math easier for what we're talking about today
但为了让我们要讨论的东⻄计算起来更简单些
10:47 - 10:49
we're gonna assume that everything is uniform
我们会假设所有数据都均匀分布
10:50 - 10:51
but again this is another example
但再说⼀遍，这是另⼀个例⼦
10.51-10.52
where the real world doesn't work this way
在现实⽣活中不会出现这种情况
10.52-10.55
real world systems have to account for this
现实⽣活中的数据库系统必须考虑到这⼀点
10:55 - 10:57
and we'll briefly talk about how to do that
我们会简要谈论下该怎么做
10:58 - 10.58
all right
10.58-11.01
so with this selection cardinality what can we do with this
So，通过这个选择基数，我们能做哪些事情呢
11:01 - 11:02
well
11.02-11.11
the goal is for us to now figure out how many tuples were actually going to select during
our scans using our predicates
对于我们来说，现在的⽬标是：当我们进⾏扫描的时候，我们要弄清楚我们能找到多少符合我们
条件的tuple
11:12 - 11:17
Because that's when we need to figure out how many tuples each operator is going to
spit out, and feeding to the next operator
因为我们要弄清楚每个operator传给下⼀个operator的tuple数量有多少
11:17 - 11:22
and then we can use that to figure out how much work they're actually going to do, how
much disk they're going to use, how much memory they're going to use
那么，通过它，我们就可以知道它们实际的⼯作量有多少，要使⽤的磁盘空间有多少，以及内存
量有多少
11:23 - 11:32
so we're using the selection cardinality to figure out for the given input we're provided
from our children operators how much data is coming out of us
So，我们通过使⽤选择基数来计算children operator要提供给我们的数据量有多少
11:33 - 11:38
so if we want to get for an equality predicate on a unique key
So，如果我们想在⼀个unique key上使⽤equality predicate（等价判断）
11:38 - 11:41
this is the easiest thing to do and our math will work out great
对我们来说，这做起来超级容易，并且我们计算起来也很简单
11:42 - 11:44
right so say we have a simple table the people table
So，假设我们有⼀张简单表，即people表
11:45 - 11:47
we have an ID column that's the primary key
其中id是这张表的主键
11:47 - 11:54
so if I have a lookup says id=123 ,then that's easy, I know the cardinality is gonna be one
So，假设我要查找id为123的tuple，那么这就很容易，我知道它的基数是1
11:54 - 12:00
I'm gonna have one tuple that's gonna match for no matter how many tuples I actually
have in my table
不管我的表中有多少个tuple，我知道其中会有⼀个tuple符合我的条件
12:00 - 12:03
because it's a primary key it's unique
因为这⾥⽤的是主键，它是唯⼀的
12:03 - 12:09
where things go get hard is now when you have more complex predicates like range
predicates or conjunctions
现在的难点在于，当你的判断条件变得更为复杂的时候，⽐如：范围条件或者交集运算之类的东
⻄
12:09 - 12:16
because now I need to be able to combine the selection cardinality for these different
predicates in a certain and non-trivial ways
因为现在我需要能够将不同判断条件所对应的选择基数以⼀种特别的⽅式结合起来
12:18 - 12:19
so oh sorry
不好意思，按错键了
12:21 - 12:24
so the based on the selection cardinality
So，基于选择基数
12.24-12.28
now we're going to produce this idea of selectivity of a single predicate
我们就可以计算出单个条件的选择率（selectivity）了
12:29 - 12:32
so selectivity is basically a function
So，简单来讲，选择率就是⼀个函数
12.32-12.39
says for a given predicate on a table, what is again what are the number of tuples that
are actually gonna qualify
对于针对该表的⼀个给定条件来说，它会算出该表中有多少符合该条件的tuple
12:39 - 12:44
so the form that we're gonna use to compute this will depend on what kind of operation
that we're actually doing
So，我们⽤于计算的⽅式取决于我们实际执⾏的操作类型
12:45 - 12:45
All right
12.45-12.49
the last one I just showed you was an equality predicate on a unique attribute
我刚刚向你们展示的那个例⼦就是对⼀个唯⼀属性使⽤等价判断
12:50 - 12:56
but you know now we need to account for the case ,when it may not be unique oh we're
looking at non you know inequalities or ranges
但你知道的，我们需要考虑这种情况，即该属性并不是唯⼀属性或者遇上的不是等价判断的情况
12:58 - 13:00
so let's look at some simple examples here
So，这⾥我们来看⼏个简单例⼦
13:01 - 13:07
so assume now in our people table for the age column we only have five unique values
So，假设在我们的people表中的age列⾥⾯，我们只有5个不同值
13:07 - 13:09
right 0 through 4
从0到4
13:09 - 13:14
I said the thing of this is like instead of storing the exact age of somebody, we're putting
them into two groups
我说过，我们不会去保存某个⼈的准确年龄，相反，我们会将它们划分为两组
13.14-13.17
like internet advertising or advertisers do this all the time
⽹络推销⼀直⼲的就是这种事情
13.17-13.21
like people under the age 18 ,18 to 35, 35 to 50 and so forth
他们会将⼈们的年龄进⾏范围划分，⽐如：18岁以下，18到35岁，35到50岁，以此类推
13:22 - 13:27
So we have five distinct values and for our table here we have these five people
So，我们有5个不同值，并且我们的表中有与之对应的5个⼈的记录
13:28 - 13:31
So if we want to compute now the selectivity of an equality predicate
So，如果我们现在想去计算⼀个equality predicate的selectivity（选择率）
13:32 - 13:36！！！！
right you know where something equals a constant
⽐如这⾥的age=2
13.36-13.42
then we just take the selection cardinality of our predicate divide that by the number of
tuples that we have
然后我们使⽤SC(P)除以我们所拥有的tuple数量
13.42-13.47
and that's going to tell us what percentage of the tuple are going to match In our table
这个公式所计算出来的结果会告诉我们，我们表中符合条件的tuple的⽐例有多少
13:47 - 13:51
okay so in this case here for a selectivity of age = 2
So，在这个例⼦中，age = 2的选择率是这样计算的
13:51 - 13.55
Assume we have a simple histogram of all the tuples we have
假设我们有⼀张关于我们所拥有的所有tuple的直⽅图
13.55-14.00
and since we said that we are assuming that our distribution of values is uniform
正如我们说过的那样，我们假设我们的值分布情况是⼀致的
14:00 - 14:05
every distinct age has an exact value or same number of occurrences
每个不同的age都会有⼀个准确值或者相同的出现次数
14:06 - 14:07
so to compute the selectivity
为了计算出选择率
14.07-14.12
it's just taking this, which is the selection cardinality of age =2
它会去使⽤这个（age=2的）选择基数
14.12-14.16
because it's only one you're only looking at one value
因为你会去查看这⼀个值
14.16-14.19
we just look in our histogram you find exactly you know the number of currencies of this
通过查看我们的直⽅图，我们就能准确地知道它的出现次数
14:20 - 14:21
right so it's just one over five
So，结果是五分之⼀
14:22 - 14:26
again so this one here we're assuming uniform distribution
So，在这个例⼦中，我们假设数据是均匀分布的
14.46-14.31
and we're assuming that you would know exactly what this value is
假设我们是能准确知道这个值是什么
14:31 - 14:33
and therefore this math works out great
因此，我们就能很容易算出选择率
14:33 - 14:34
right this is exactly what we want
这就是我们想要做的
14:36 - 14:40
But we now so do some more complex things like getting a range predicate
但现在我们要来做⼀些更为复杂的事情，⽐如计算range predicate的选择率
14:40 - 14:43
so now we say we're age is greater than equal to two
So，假设我们要计算age>=2的选择率
14:44 - 14:45
well the formula is
Well，这⾥的公式是
14.45-14.53
assumes here that we're only looking at integers that are continuous we have a
continuous range of values where you look at
假设这⾥我们所查看的是⼀段连续的范围值
14:53 - 15:00
so you just take the max value divided by the minus the one you're looking forward
divided by the the range of the max minus min
So，这⾥我们使⽤(A_max-a)/(A_max-A_min)
15:00 - 15:02
and that'll tell you what roughly with the selectivity is
这个公司就会粗略地告诉我们这个选择率是多少
15:03 - 15:06
so in this case here we're looking for everybody that's two or greater
So，在这个例⼦中，我们所要查找的是age⼤于等于2的people信息
15:07 - 15:10
so we take the min and the max subtract that that's four,
So，我们拿到最⼤值（4）和最⼩值（0）进⾏相减得到4
15.10-15.14
then we just take the the value we're looking for and the high value that we want
然后我们拿到我们所查找的值（2）以及我们想要的最⼤值（4）
15:14 - 15:17
and it's 4 minus 2 that's 1 1 over 2
我们将数据代⼊公式所得到的结果是1/2
15:18 - 15:20
so this is wrong, right
So，这个结果是有问题的
15:20 - 15:22
the real answer is actually 3/5
正确答案其实是3/5
15.22-15.26
but the way the formula works out we get 1/2
但根据公式，我们所得到的结果是1/2
15:26 - 15:27
So this is a good example
So，这是⼀个很好的例⼦
15.27-15.31
where like these formulas don't always work correctly and they're going to produce
errors
这是因为根据这些公式所计算出的结果不⼀定总是正确的，我们也会得出错误的结果
15:32 - 15:37
in this case here we're under estimating the the selectivity it should be 3/5 not 1/2
在这个例⼦中，我们预估的选择率是3/5⽽不是1/2
15:38 - 15:46
So this is gonna be problems when you know when you start doing, you know
estimations of a complex queries that have a bunch of different predicates and about
different operators
So，当你对（包含⼀堆不同条件和operator的）复杂查询进⾏这种预测的时候，这就会出现很
多问题
15:46 - 15:48
because now we have errors built on errors built on errors
因为我们的答案是建⽴在错误之上的
15:49 - 15:52
so say this is like we're doing the scan at the bottom of the tree
So，假设我们从查询计划树的底部进⾏扫描
15.52-15.56
and now we have an underestimation of the number of tuples we're gonna we're gonna
produce as our output
Now，我们低估了我们输出结果中所⽣成的tuple数量
15:57 - 15.59
now when we do calculations up above
当我们对查询计划树上⽅进⾏计算的时候
15.59-16.03
now we're taking wrong inputs or wrong estimations as our input to our operators
我们将错误的输⼊或者估算作为输⼊传给我们的operator
16:04 - 16:07
and then doing more wrong math on them and producing more errors
然后，我们就会进⾏更多错误计算，产⽣更多的错误
16:08 - 16:11
so in many cases or the research shows that
So，很多研究表明
16.11-16.15
for almost actually for every single database system they evaluated for this one
particular paper
实际上，对于他们所评估的所有数据库系统⽽⾔
16:15 - 16:19
Everybody underestimates the selectivity of all these operators
这些数据库系统都低估了所有这些operator的选择率
16:20 - 16:23
and you may say oh who cares that how's that why is that big of a big deal
你们可能会说谁会在意这种事情
16:23 - 16:30
but now when you start sizing up you know your data structures you like your hash
tables for joins
但当你对你的数据结构容量进⾏调整的时候，⽐如对你的hash table进⾏join操作
16:30 - 16:31
your buffers for sorting
在buffer中进⾏排序
16:31 - 16:34
now you're gonna underestimate what these sizes are
现在，你低估了这些数据量
16:34 - 16:38
and you may have to correct that once you realize I have more data than they actually
not expected
⼀旦你意识到你拿到的数据要⽐预期的多得多，那你可能就得对它纠正⼀下了
16:39 - 16:43
so these have real runtime implications for in systems
So，当系统运⾏的时候，这些东⻄会对系统产⽣影响
16:43 - 16:48
and also too we're making now wrong estimations about you know what plan might be
better than another
这也会让我们在评判查询计划好坏时做出错误的预测
16:50 - 16:50
all right
16.50-16.53
the last thing I want to look at are negation
最后我想讲的东⻄是negation（⾮）
16.53-16.54
this one's pretty straightforward ,right
这个相当简单
16.54-16.56
it's just one minus whatever the selectivity of the predicate that we want
它其实就是1减去我们想要的这个条件的选择率
16:57 - 16.58
right so in this case here
So，在这个例⼦中
16.58-17.01
the selection cardinality of age equals two is one
age=2的选择基数是1
17:01 - 17:04
so the negation is just the boundaries outside of that
So，age!=2的范围则0到1与3到4这两个区间
17:05 - 17:08
right and you get 4/5 which is the correct answer for this one
对此，我们所得到的正确答案是4/5
17:08 - 17:10
Right because assuming that something equals something
17:12 - 17:15
so the major observation we can make about this, is that
So，我们这⾥主要得出的结论是
17.15-17.21
this selectivity estimate for predicates is basically the same thing as a probability
简单来讲，我们所估测的条件选择率和概率是⼀回事
17:22 - 17:27
right it's just saying what is worth the probability that a tuple is gonna match my given
predicate
也就是说，某个tuple符合我给定条件的概率是多少
17:28 - 17:30
so if we make this assumption
So，如果我们作出了这种假设
17.30-17.42
now we can use all the the tricks that we we learned from you know statistics 101 to
start combining together these predicates in more complex ways
那么，我们就可以通过我们从统计⼊⻔中学到的所有技巧来将这些条件以更复杂的⽅式结合在⼀
起
17:42 - 17:44
so let's say that now we want to have a conjunction
假设我们想得到⼀个交集
17:45 - 17:50
you know age equals 2 an named like you know a wild card
即我们想拿到符合age=2和name为A开头的任意字符这两个条件的tuple
17:50 - 17:54
so we would have this computing selectivity on the first predicate age=2
So，我们会去计算第⼀个条件（age=2）的选择率
17.54-17.57
compute the second selectivity on the second predicate
然后去计算第⼆个条件的选择率
17:58 - 18:04
And then now we just combine them or multiply B to the two probabilities together
接着，我们会将这两个概率进⾏相乘来将这两个条件结合在⼀起
18:04 - 18:06
and we get our intersection here
于是，我们得到了它们的交集
18:06 - 18:12
right this is where you know we'd say it has to be an exact match oh ,sorry we have to
match both and would be this inner part here
So，这两个条件我们都得符合才⾏，我们取的是⾥⾯这⼀块的数据
18:13 - 18:16
right and so same thing for disjunction
So，对于disjunction（析取，交集的反义词）也是如此
18.16-18.18
disjunction that the form is slightly different
disjunction所⽣成的范围和junction有所不同
18:18 - 18:26
But you're getting you're just assuming that the that they're independent
但假设它们是彼此独⽴的
18.26-18.26
and therefore you can use the standard math trick to figure out what the union is here
因此，你就可以使⽤简单的数学技巧来弄清楚它们的并集是什么
18:28 - 18:31
so I've talked about two assumptions so far
So，⽬前我已经讨论了两种假设
18.31-18.32
that are problematic
它们是有问题的
18:33 - 18:35
but this again this is what the way every textbook covers it
但这是每本教科书所介绍的内容
18:37 - 18:40
the first is that we assume that our data is uniform
我们⾸先假设了我们的数据是统⼀的
18.40-18.42
but I showed a simple example where that's not the case
但我所展示的⼀个简单案例却不是这种情况
18:42 - 18:48
And then here now we're assuming that predicates are independent
这⾥我们假设我们的条件都是独⽴的
18:50 - 18:51
that's also not always the case too
我们所遇上的也不⼀定是这种情况
18:52 - 18:55
there's actually a third assumption they're always going to make that's problematic
他们其实还做了第三种有问题的假设
18.55-18.57
it's called the join inclusion principle
它叫做join inclusion principle
18:57 - 19:02
so again so there's much assumptions we're making about computing the cardinality of
our predicates
So，我们在计算条件选择率时有很多假设前提
19.02-19.03
that make the math easier
这使得计算变得更简单
19.03-19.06
but are going to end up having us produce incorrect approximations
但这会让我们得出错误的预测结果
19:07 - 19:12
so again uniform data assumes that everything is always going to be the curve the same
probability
So，Uniform data假设的是所有数据的出现概率都是相同的
19:13 - 19:15
the way to get around that for heavy hitter
解决heavy-hitter的⽅法是
19.15-19.17
so heavy hitter would be like
So，heavy-hitter指的是
19.17-19.18
if you're really skewed data
如果你有⼀些skewed（倾斜） data
19.18-19.23
and there's like ten columns or ten values that occur you know majority of the time
它在10列中都有出现，或者说它出现了10次，它出现频率⾮常⾼
19:23 - 19:27
you can maintain a separate hash table or histogram to keep track of those guys,
你可以通过维护⼀个单独的hash table或者直⽅图来跟踪这些东⻄
19.27-19.34
and then everyone else you just assume this uniform and derive the cardinality estimates
based on that
对于其他的数据来说，你可以假设它们的出现频率是统⼀的，你可以根据这个来预测基数
（cardinality）
19:34 - 19:36
so that's the standard trick to get around the uniform data issue
So，这是⽤来解决这种均匀数据问题的标准⼿段
19:37 - 19:40
then we talked about the independent predicates
接着，我们讨论了independent predicates（独⽴的判断条件）
19.39-19.40
so that allows me to take two predicates
So，这允许我去使⽤两个判断条件
19:41 - 19:42
and if there's a conjunction
如果这⾥是交集
19.42-19.48
just multiply them together to produce the combined cardinality
那么将它们两个进⾏相乘来⽣成组合基数
19:48 - 19:50
And then the inclusion principle says that
inclusion principle（嵌套原则）表示
19.50-19.53
if I'm doing a join the two tables
如果我对两张表进⾏join操作
19.53-19.56
then for every single tuple in my inner table
然后，对于我inner table中的每个tuple来说
19.56-20.00
I'll have a tuple that matches in the outer table
在outer table中会有⼀个与之对应的tuple
20:00 - 20:01
right but that's not always the case
但我们遇上的并不会总是这种情况（知秋注：可能会发⽣没有与之对应的tuple）

15-02
20:02 - 20:04
but you know a way to think about this is like
但我们可以这样去思考
20.04-20.05
why would I join two tables,
当我对两张表就⾏join时
20.06-20.08
if there's no way to actually join them
实际上，如果没有办法对这两张表进⾏join
20.08-20.10
there's no actually corresponding values that would match
即没有对应的值可以进⾏匹配
20:10 - 20:12
so we make that assumption
So，我们作出了这种假设
20.12-20.13
but in the real world
但在现实⽣活中
20.13-20.14
it's not always gonna be the case
我们不会总是遇上这种情况
20.14-20.20
could you get you could have dangling you know uh you could have references that don't
you know exist anymore in the outer table
你可能会有些不存在与outer tabler的⼀些引⽤
在outer table中，你可能会有⼀些并不存在的引⽤
20:21 - 20:24
so these two are the ones that are probably most problematic
So，这两种假设可能会很有问题
20.24-20.29
this one occurs in more advanced things, we don't need to worry about
第三种假设会在那些更⾼级的东⻄中出现，我们不需要关⼼这个
=======================
20:29 - 20:36
so I always like to show this one example to sort of emphasize and show exactly why
this is problematic
So，我总喜欢通过这个例⼦来强调为什么它很有问题
20:37 - 20:41
and this comes from a blog article written by a former IBM researcher
这个例⼦是来⾃于⼀个IBM研究员所写的⼀篇博⽂
20:41 - 20:48
and so guy lemon worked on like the early one of the early IBM optimizers from the late
1980s or 1990s
So，这位⽼兄⾃1980年代末或者1990年代起就开始负责IBM早期的⼀个优化器了
20.48-20.50
there's actually still used today in DB2
到现在为⽌，DB2依然在使⽤这个
20:50 - 20:51
it was pretty influential
它⾮常具有影响⼒
20:51 - 20:52
so he has a blog article
So，他写了⼀篇博⽂
20.52-20.56
but he likes to show you here's why the assumptions we're making here are problematic
他在博⽂中向我们展示了为什么我们所做出的这些假设很有问题
20:58 - 21:01
let's say we have a database with a single table of cars
假设我们有⼀个数据库，⾥⾯有⼀张跟汽⻋有关的表
21:01 - 21:04
and we have two attributes we have the the make and the model
我们有两个属性，即make和model
21:04 - 21:08
So the make would be like Honda, Toyota, Tesla
So，make指的是Honda，Toyota，Telsa这些汽⻋⽣产商
21.08-21.12
the model would be like Camry, Accord you know escort
model指的是Camry，Accord，Escort这些型号
21:13 - 21:18
and then say we have a query that says where make = Honda and model = Accord
假设我们有这样⼀个查询，它的where⼦句部分是where make =‘Honda’ and model
=‘Accord’
21:19 - 21:22
so if you make the assumption about the week that we've made so far
So，如果你做出了我们这周⽬前为⽌所做的假设
21.22-21.26
the two assumptions about the independence and uniformity of our data
即数据的独⽴性和均匀性这两个⽅⾯的假设
21:26 - 21:29
then when we combine these two predicates together
当我们将这两个条件结合在⼀起的时候
21.29-21.35
we would say one over ten, because that's that we have ten makes and Honda's 1 so
that's 1 over 10
这⾥是1/10的原因是，我们有10个汽⻋⽣产商，Honda只是其中⼀个，所以是1/10
21:35 - 21:39
and then we have 1 over 100 models,because we have a hundred models accord is one
of them
这⾥是1/100的原因是，我们有100个型号，Accord只是其中的⼀个
21:39 - 21:41
so we'd multiply them together
So，我们将它们进⾏相乘
21.41-21.44
and our cardinality estimate would be 0.001
我们的选择率就会是0.001
21:46 - 21:47
but we as humans know
但从⼈类的⻆度来说
21.47-21.49
that these values are actually correlated
实际上，这些值是相关的
21.49-21.51
or these two predicates are correlated
或者说，这两个条件是相关的
21.51-21.56
like you can't make an accord ,like there's no other car manufacturer that's gonna make
an accord, it's only a Honda
⽐⽅说，只有Honda才会⽣产Accord这个型号的⻋
21:56 - 22:03
so if you know the model = accord, you can then know that the the make has to be
Honda
So，如果你知道model是Accord的话，那么你就知道make只可能是Honda
22:04 - 22:08
and so the correct selectivity for this particular query is actually 1 over 100
So，实际上，该查询的正确选择率是1/100
22:09 - 22:16
so we're order of magnitude off from what the the formula would actually tell us what we
think we are，from what we actually should be
So，公式告诉我们的结果和我们实际得到的结果差了⼀个数量级
22:18 - 22:18
yes
请问
22:28 - 22:29
so a question is
So，她的问题是
22.29-22.32
if you had a foreign key would that make your life easier
如果使⽤外键的话，处理起来会不会变得容易点
22:35 - 22:35
no
并不会
22.35-22.45
but you would happen no， whether the foreign-key child is unique
这处理起来可能并不会变得容易，⽆论外键是不是unique的
22:45 - 22:47
because it could be one to N or one to one
因为外键可以是⼀对多，也可以是⼀对⼀
22.47-22.48
you have to know something about that
你得对它有所了解
22:48 - 22:53
but even then the foreign key I think for this particular example ,doesn't help you
但即使你使⽤了外键，对于这个例⼦来说，这不会对你有所帮助
22:55 - 22:56
I think about though
我是这么觉得的
22:57 - 22.58
but if it is one it's one table
但这是⼀张表
22.58-23.04
,like this is just like one table give me all the cars or the make equals Honda and the
model equals Accord
我想从这张表中找到所有⽣产商是Honda，型号为Accord的⻋的相关信息
23:04 - 23:07
when it has nothing to it like you know we're doing a join,right
⽐如，当我们进⾏join操作的时候
23:09 - 23:13
I need to think that whether foreign keys that help of that,
我需要去思考外键对此有没有帮助
23.13-23.14
but we can take that offline
但我们可以线下讨论这点
23:14 - 23:21
so again like we automatically start making estimations about how much work we
actually have to do for our query plan
So，我们会开始⾃动估算，在执⾏我们的查询计划时，我们实际所做的⼯作量⼤⼩
23:21 - 23:25
and sizing up our intermediate data structures and our buffers
并对我们的中间数据结构以及buffer进⾏调整
23:25- 23:26
and we're going to be weigh off
我们要进⾏权衡
23:27 - 23:32
So the independent assumption and it's going to cause us to underestimate how much
work we're actually going to do
So，对于独⽴性假设⽽⾔，这会让我们低估我们实际要做的⼯作量
23:34 - 23:36
So the way to get around this particular issue
So，解决这个问题的⽅法是。。
23.36-23.39
and this is something that the only I think the high-end commercial systems actually do
实际上，我觉得只有⾼端的商⽤数据库才会做到这点
23.39-23.41
it`s to do correlated column statistics
即对相关列进⾏数据统计
23:42 - 23:46
so I can tell the database system, all right model is correlated to make
So，我可以告诉数据库系统，model和make是相关的
23:46 - 23:52 ！！！！
right I can't make an accord, if I if I know that my model is an accord I know what my
make it
如果我知道我的model是Accord，那么我知道它所对应的make是什么
23:52 - 23.54
Another example would be like
另⼀个例⼦则是
23.54-23.58
if I know my zip code of an address field, is 15217
假设我知道我的邮编是15217
23.58*24.01
that I know the state has to be Pennsylvania
那么我就知道它所对应的州是宾夕法尼亚
24:02 - 24:05
so if you declare these columns as being correlated
So，如果你声明这些列是相关的
24:06 - 24:12
now the database system can you know special case it's estimations to avoid these
pitfalls
数据库系统就可以将它们当做特殊案例来进⾏处理，以避免这些陷阱
24:13 - 24:15
it can know that these things are correlated
它能知道这些东⻄都是相关的
24.14-24.18
therefore it can use the right formula to derive the selectivity of it
因此，我们就可以使⽤正确的公式来计算出该判断条件的选择率了
24:19 - 24:21
but as I said only the high end system do this
但正如我说的，只有⾼端的数据库系统才会做这些
24.21-24.21
yes
请问
24:25 - 24:26
her question is
她的问题是
24.26-24.29
save it is it doesn't need to know how it's correlated just that they are correlated
DBMS不需要知道这些列之间的关系如何，它只需要知道它们是相关的就⾏了
24:29 - 24:31
I have to go look to see what the syntax and supports
我得去看下语法是否⽀持这⼀点
24.31-24.34
I think you just say they are correlated and it should figure it out
我觉得你只需要说，这些列是相关的，DBMS应该就能⾃⼰搞定
24:34 - 24:34
yeah
24:36 - 24:43
like I think only Oracle ,SQL server, DB2, Teradata maybe snowflake can do this
我觉得只有Oracle，SQL Server，DB2和Teradata可以做到这点，Snowflake可能也可以
24.43-26.45
but like MySQL and Postgres can't do this as far as I know
但就我所知，MySQL和PostgreSQL是做不到的
24:46 - 24:48
SQLite sort of I can't do this
SQLite也做不到这点
24:50 - 24:50
alright
24.50-24.54
so let's talk about now how we're actually going to get this information
So，我们现在来讨论下该如何获得这个信息
24.54-25.00
that tells us like the number makes a number model think the number occurrences of
every value
So，该信息告诉我们每个值出现的次数
25:00 - 25:01
So I've already sort of mentioned this before
So，我之前就已经提到过这点了
25.01-25.09
but the the database system is going to maintain histograms on the inside to keep track
of these statistics
但数据库系统会在内部维护这些直⽅图来跟踪这些数据信息
25:09 - 25:15
So the most simplest histogram would be for every single distinct value that I have in my
column I just count the number of occurrences that I have
最简单的直⽅图是⻓这样的，即我只需要统计我列中每个不同值的出现次数
25:16 - 25:17
right so in this case here
So，在这个例⼦中
25.17-25.19
this is our uniform data
这⾥是我们均匀分布的数据
25.19-25.20
So I have 15 unique values
So，我有15个不同的值
25.20-25.23
and you know each one occurs five times
你知道的，每个值都出现了5次
25:25 - 25:26
and so now we want to say
So，现在，我们想说的是
25.26-25.31
you know what's the number of tuples that are gonna match, you know just something
equal five
符合我们条件的tuple数量为5
25:31 - 25:33
I could look at this and say I know it's exactly you know five
通过这张表，我就可以准确的说出，这个数字是5
25:34 - 25:36
but in real data doesn't look like this
但真实数据不会是这种样⼦的
25.36-25.39
data is more skewed
数据更具有倾向性
25:39 - 25:42
and so now again if we have a histogram in like this
So，如果我们的直⽅图⻓这样
25.42-25.43
this is fine
这没问题
25.43-25.47
because now we can say you know how many tuples have five, we would know the exact
value
因为我们现在能准确地说出值为5的tuple数量
25:49 - 25:50
what's the problem with this though
这⾥⾯存在着什么问题吗？
25:54 - 25:56
For every single value I have in my column
对于我列中的每个值来说
25.56-25.58
I'm storing an entry in my hash table from a histogram
我将直⽅图中的数据存储到我的hash table中
26:00 - 26:00
that's gonna be a lot
这⾥⾯有很多数据
26.00-26.03
I assume that this if this count here is like 32 bits
假设这⾥的数据⼤⼩为32 bit
26:04 - 26:05
so my simple example here
So，在我这个简单例⼦中
26.05-26.07
I have 15 unique values
我有15个不同的值
26:07 - 26:14
so you know 15 times 32 bits ,roughly 50 60 kilobytes or 50 sorry 50 60 bytes its
nothing
So，15乘以32 bit，粗略计算就是50-60 byte，这点⼤⼩啥也不算
26:15 - 26:21
But now if I have a billion that unique values and I'm a 32-bit integer for every single
unique value
但现在如果我有⼗亿个不同的值，每个值都是32位integer
26:21 - 26:24
now 1 billion times 32 bits is 4 gigabytes
10亿乘以32 bit，那就是4Gb
26:25 - 26:26
all right
26.26-26.29
that's just the sit that's just as the histogram from one column
这只是⼀个列所对应的直⽅图的数据⼤⼩
26:30 - 26:31
so now I do this for every single column
So，现在我要对每⼀个列都进⾏这样的操作
26:32 - 26:34
so nobody's actually going to store exact values like this
So，实际上，没有⼈会像这样来保存准确的值
26.34-26.37
except for the heavy-hitter stuff that I talked about before
除了我之前提到过的heavy-hitter才会这么做
26:37 - 26:39
So the heavy-hitter you would have the exact value
So，heavy-hitter会去保存这些准确的值
26:40 - 26:44
but you only store maybe like the top 10 or 20 unique values for every single column
但我们只可能会去保存每列中前10或者前20个不同的值
26.44-26.45
you're not storing this for every single possible one
我们不会去保存每个可能的值
26:47 - 26:52
So the way to get around this is to start combining together ,these values into buckets
So，解决这个问题的做法就是将这些数据划分到不同的bucket中
26:53 - 27:00
so that we only store a single value for the bucket rather than an individual value for
every single element of the bucket
So，我们不会让⼀个bucket只保存⼀个元素的相关值
So，⼀个bucket中我们只会保存⼀个值，我们不会为⼀个bucket中的每个元素都保存⼀个值
27:01 - 27:03
right so this would be called an Equi-width Histogram
So，这被叫做equi-width Histogram（等宽直⽅图）
27:03 - 27:07
so basically was take the every three values here
So，简单来讲，这⾥我们以每3个值为⼀组
27.07-27.13
compute whatever the count is the sum of all the occurrences for every single value in
that bucket
然后计算这个bucket中每个值出现次数的总和
27:13 - 27:16
And then now my new histogram just has that aggregate value
那么，现在，我的新直⽅图中显示的就是这些聚合后的值
27:16- 27:18
all right
27.18-27.20
so I'm doing I'm doing buckets a size 3
So，这⾥我使⽤的bucket⼤⼩为3
27.20-27.24
but you can even you didn't size them anyway you want
但你也可以将bucket的⼤⼩调整为你想要的⼤⼩
27:24 - 27:29
so now the way to get an estimate to say you know how many times does say the
number number 2 occur,
So，假设现在我要对某个值出现的次数进⾏预测，这⾥以2为例
27.29-27.33
I would look to see what what bucket is my value that I'm looking for fall into
我会去查看我要预测的这个值是在哪个bucket中
27:33 - 27:35
so 2 is between 1 and 3
So，2是在1-3这个区间的bucket中
27:35 - 27:37
and then I would say what's the count here
接着，我会去查看这个bucket的count值是多少
27.37-27.39
so in this case roughly 9
So，在这个例⼦中，粗略来看是9
27.39-27.41
I have 3 values, so I take 9 divided by 3
因为这个区间中有3个值，所以我⽤9除以3
27:42 - 27:46
and now I'm estimating that 2 occurs you know three times
现在，我预测2出现的次数是3次
27:48 - 27:52
so again we're saving space for saving computational overhead of maintaining our
histogram
So，通过这种⽅法，我们节省了⽤来维护直⽅图时的计算开销
27:52 - 27:55
but now we're again we're introducing more errors in our approximations
但现在，我们往我们的预测中引⼊了更多的错误
27:55 - 27:59
because we there's no other way to get around this other than storing exact values
因为除了保存精确值以外，我们没有其他办法去解决这个
28:01 - 28:03
so this is not so great either
So，这种⽅法也并不是特别好
28.03-28.05
because now I could have going back here
我们先回过头来看下上⼀张图
28:05- 28:08
between this bucket,right ，8 had a high count
在这个bucket中，8出现的次数较多
28.08-28.10
7 and 9 were much lower
7和9的出现次数则较低
28.10-28.12
but then when I'm combine them together
但当我将它们的出现次数合并在⼀起
28.12-28.15
I don't know which one actually had the high count
那么我就不知道这些值中哪个值的出现次数会⽐较⾼
28:16 - 28:18
all right my heavy-hitter could handle that we can ignore that for now
heavy-hitter可以搞定这个，但我们现在将这个忽略
28:20 - 28:23
so a better way to do this is actually use quantiles
So，解决这个问题的⼀种更好⽅法就是使⽤quantiles（分位数）
28:23 - 28:24
so with this one
So，在这个例⼦中
28.24-28.29
we're going to do is we're gonna have the we're going to vary the width of our buckets
我们会去改变我们bucket的宽度
28:29 - 28:31
so the last one the buckets are always the same width
So，从上张图中可以看到的最后⼀点是，每个bucket的宽度始终是相等的
28:32 - 28:39
but now we're going to vary the width such that the the sum of the counts for each
bucket is roughly the same
现在我们要去调整bucket的宽度，使每个bucket的count总和都⼤致相等
28:40 - 28:41
so in this case here
So，在这个例⼦中
28.41-28.44
I can have the first bucket would have values from 1 to 5
第⼀个bucket的值域范围是1到5
28.44-28.47
the count goes to 12
总count值就是12
28.47-28.52
6 7 & 8 has has 3 3 values for the counts 12 sorry counsel 12 accounts 12
6、7和8这3个值所组成的bucket的count值是12
28.52-
9 and 12
28:53 - 28:56
and so now I have variable length buckets
So，我现在拥有不同宽度的bucket
28:57 - 29:02
but now I could potentially have more accurate estimations of the the occurrences of
values within those buckets
但现在，我可以对这些bucket中每个值所出现的次数做出更为精准的预测
29:04 - 29:06
and then this one here I'm showing quantiles
在这个例⼦中，我使⽤的是分位数
29.06-29.08
you can do the deciles and other other grouping sizes
你也可以使⽤deciles（⼗分位数）或者其他⼤⼩的分组区间
29:11 - 29:12
so any questions about this
So，对此，你们有任何疑问吗？
29.12-29.13
again, this is what we're going to populate
这就是我们要去填充的数据
29.13-29.16
when we run analyze or run stats in our database system
当我们在我们的数据库系统中使⽤analyze或者stats时
29.16-29.20
it's going to generate this information for us and store this in our catalog
它会为我们⽣成这种信息，并将这些信息保存在我们的catalog中
29:20 - 29:22
and it's durable on disk
并且它会持久化到磁盘上
29.22-29.23
when we restart the system we come back
当我们重启数据库系统后
29.23-29.27
we don't run analyze again， all of our statistics are still there
我们不⽤去再执⾏analyze，我们所有的统计信息依然保存在磁盘上
29:27 - 29:27
yes
请问
29:36 - 29:38
this question is
这⾥的问题是
29.38/-29.41
if I add now if I add 10 more 10 more values to 5
如果我给5的出现次数加10次
29.41-29.45
so now it shoots up ,what will happen in my histogram
那么我的直⽅图会变成什么样呢？
29:45 - 29:46
so this is blown away
So，这张图就会被废掉
29.46-29.49
every single time I run analyze I recompute everything
当每次我执⾏analyze，我就会重新计算所有数据
29:50 - 29:54
so yes in that case it could could vary the now the size of the of the bucket
So，没错，在这种情况下，它会去调整bucket的⼤⼩
29:55 - 29:56
correct
没错
29:58 - 29.59
so as far as you know in most systems
So，在你所知道的⼤多数数据库系统中
29.59-30.02
they don't maintain these things as you do inserts and updates
当你进⾏插⼊和更新操作的时候，它们不会去维护这些东⻄
30.02-30.03
because it's just too expensive
因为这样做的成本太⾼了
30:03 - 30:06
because again well talk about transactions on Wednesday
我们会在周三的时候讨论事务相关的内容
30:06 - 30:08
But when I'm running a transaction
当我执⾏⼀个事务的时候
30.08-30.11
I want to minimize the amount of work I have to do
我想去最⼩化我需要做的⼯作量
30:11 - 30:13
so anything that's not important right now
So，对于那些当前不是很重要的⼯作
30:13 - 30:15
I wanted I'm gonna put off till later
我想放到之后再做
30.15-30.18
because I'm holding locks on on tuples
因为我正拿着这些tuple对应的锁
30:19 - 30:21
and that's interfering with other other transactions running at the same time
这会⼲扰其他同时执⾏的事务
30:22 - 30:24
So I don't want to maintain this as I go along
So，我不想在做这些事情的时候，去维护这些统计信息
30:24 - 30:31
now you could say all right I could have like a separate background thread could look at
recent changes from the log, and then go apply these changes
现在，你们可能会说，我可以通过⼀个单独的后台线程来对这些东⻄进⾏处理，即查看⽇志中最
近的修改记录，然后对这些修改进⾏处理
30.31-30.33
yes you can do that some systems might do that
没错，你可以这么做，有些系统可能会这样做
30:34 - 30:34
but in general
但⼀般来讲
30.34-30.36
everyone blows away and research from scratch
数据库系统会将这种信息直接丢掉，然后从头开始计算
30:37 - 30:44
the one system that does try to do the updates on the fly was was IBM DB2 leo the
learning optimizer
其中⼀个试着在运⾏时对这些信息进⾏更新的系统，那就是IBM的DB2 leo（即learning
optimizer）
30:44 - 30:48
they were big it would run a scan ,they can go back and update this thing
它们会去执⾏⼀次扫描，然后回过头来去更新这些信息
30:48 - 30:50
but you know it has issues
但你知道的，它是有问题的
30:53 - 30:53
ok
30:55 - 31:01
so histograms and these and the sketches
So，对于直⽅图和sketch来说
31.01-31.01
and we didn't talk about sketching
虽然我们还没有讨论过sketch
31.01-31.03
but like these histograms and heavy-hitter stuff
但像这些直⽅图和heavy-hitter
31.03-31.07
that's the way you know this is sort of the most data system to do this
⼤部分数据库系统所使⽤它们来解决这些问题
31:07 - 31:09
Another alternative
另⼀种备选⽅案就是
31.09-31.14
instead of using these these these these additional data structures is that,
在不使⽤这些额外数据结构的情况下
31.14-31.18
we could just maintain a sample of the table and derive our statistics from from the
sample
我们可以去维护⼀张样本表，然后根据该样本来衍⽣出统计信息
31:19 - 31:28
so anything about the histograms is like it's a essentially a lower-resolution copy of the
database of the tables
So，从本质上来讲，直⽅图就像是数据库中表数据的⼀种低解析度副本
31:29 - 31:31 ！！！！
right it's an approximation of other contents
它是对其他内容的⼀种近似缩略表达
31:32 - 31:36
so but rather than having these histograms and try to derive the statistics from them
So，在不通过使⽤直⽅图来衍⽣统计信息的情况下
31.36-31.40
what do we actually just took a copy a smaller copy of the table itself
那么我们实际该如何拿到基于该表本身的⼀个更⼩副本呢？
31:41 - 31:44
And then ran our predicates on that smaller copy
然后，我们对这个副本中的数据进⾏条件判断
31:44 - 31:51
and then assumed that the distribution of values within that sample is the same as it
exists in the real table
接着，假设该样本中值的分布情况和表中真正的值分布情况是相同的
31:51 - 31:51
and therefore
因此
31.51-31.57
any our selectivity estimates we derived from the sample will accurately reflect what's in
the real table
我们根据样本所预测的选择率就会反映出表中的真实情况
31:58 - 32:01
so let's say we have and our people table ,we have a billion tuples
So，假设我们有⼀张people表，表中有10亿条数据
32:02 - 32:04
and then but let's say we just take a sample
然后，我们从表中进⾏取样
32.04-32.10
we're just going to get every other tuple and copy it into a sample table
我们会拿到⼀些tuple，并将它们复制到⼀个样本表中
32:10 - 32:13
but there's obviously more sophisticated sampling algorithms you can use
很明显，此处你可以使⽤⼀些更为复杂的取样算法
32:13 - 32:14
but for a purposes now this is fine
但出于我们的⽬的，这样就可以了
32:15 - 32:16
so now when my query comes along
So，当我进⾏查询的时候
32.16-32.23
and I want to compute me the selectivity of age equals greater age greater than 50
我想去计算age>50的选择率
32:23 - 32:27
I go to my sample and I say well Obama over the age of 50
我跑到我的样本表处，并说：Well，Obama的年龄⼤于50
32:28 - 32:30
so therefore it's it's 1/3
因此，选择率是1/3
32.20-32.35
and therefore I can assume that the different values in my full table will match that
因此，我可以假设，在完整的表中，不同值的选择率会与之相符
32:38 - 32:39
And in this case here
在这个例⼦中
32.39-32.41
just like in the histograms
在直⽅图中
32.41-32.44
we could meet we could maintain this as we go along, right
当我们在进⾏查询的时候，我们可以对此进⾏维护
32:44 - 32:47
as as you know it periodically refresh it
你知道的，它会定期刷新这些数据
32.47-32.53
or we could trigger it whenever you know we know that a large portion of the table has
changed or would you all bulk load a bulk bulk delete
或者，当表中有很⼤⼀部分数据发⽣改变，⽐如批量加载表中数据，或者批量删除表中数据，此
时就可以触发刷新这些数据了
32:54 - 32:55
but the idea here again is that
但这⾥的思路是
32.55-32.58
rather than maintaining histograms who may could be inaccurate
与其去维护这些可能不准确的直⽅图
32:59 - 33:00
we just maintain a sample
我们只需维护这些样本即可
33:02 - 33:05
so this only occurs as far as they know in the high-end systems
So，只有⾼端的数据库系统才会做这些事情
33:06 - 33:09
so SQL server over most famously does this ,and their optimizer is probably the best one
So，诸如SQL server这些⾮常知名的数据库系统会做这种事情，并且它们的优化器可能是其中
最好的⼀种
33:11 - 33:14
I do they but they actually do a combination of the histograms and and the sampling
但实际上，它们是将直⽅图和采样法结合在⼀起使⽤
33:16 - 33:17
which I think is the right thing to do
我觉得这是正确的做法
33:19 - 33:19
okay
33:20 - 33:20
yes
请问
33:27 - 33:28
say it again
再说⼀遍
33.28-33.29
what makes this more difficult than what
什么使它⽐.......变得更难？
33:33 - 33:34
this question is
他的问题是
33.34-33.42
why is this the case that only like the high-end commercial enterprise systems actually
do this versus the you know the open-source guys
以这个例⼦为例，为什么只有⾼端的商⽤企业级数据库系统才会这样做，然⽽开源数据库系统就
不会这样做
33:43 - 33:43
good question
好问题
33:49 - 33:54
I think the yeah actually good question
没错，这确实是个好问题
33:53 - 33.56
if you already have analyzed
如果你已经调⽤了analyze
33.56-34.00
you're gonna do a sequential scan anyway to compete your histograms
你会通过循序扫描来完成你的直⽅图
34:00 - 34:02
might as well just generate this thing
它可能会⽣成出这种东⻄
34.02-34.04
you actually don't have an answer
实际上，对此你并没有什么答案
34:05 - 34:06
it may be the case that
它可能是这种情况
34.06-34.09
just like the histogram of ways the way it's always been done
即直⽅图已经⽣成完毕了
34:10 - 34:12
right it's not a very satisfying answer
它和答案并不相符
34:17 - 34:18
I mean
我的意思是
34:21 - 34:22
here's one thing
这⾥有⼀点要说
34.22-34.25
so I think like with the histograms
So，我觉得通过这些直⽅图
34.25-34.28
you in the way you have in your optimizer, you just have this cost mode
在我们的优化器中，我们会有这种成本模型
34.28-34.32
l actually here's tell you the right answer the histograms we will up way faster
通过这些直⽅图，我们就可以快速知道成本
34:32 - 34:36
right because again I'm enumerating all these possible different query plans
因为我正在枚举所有可能不同的查询计划
34:36 - 34:37
I can go to my histogram real quickly
我可以快速查看下我的直⽅图
34.37-34.43
and derive is the the statistics I need to estimate the the selectivity of a predicate or an
operator
以此来衍⽣出我预测某个条件或者operator的选择率所需的统计信息
34:43 - 34:48
where's this thing to compute the selectivity estimate I have to do a sequential scan on it
为了对选择率进⾏估算，我得对表进⾏循序扫描
34:49 - 34:52
that's definitely gonna be slower than the running through the histogram
在速度上，这肯定要⽐查看直⽅图来得慢
34:53 - 34:58
right so we can cover this in the advanced class
So，我们可以在15-721⾼级课上对它进⾏介绍
34.58-34.59
that the play pilot works in SQL server
SQL server有做⽅⾯的⼯作
34:59 - 35:00
SQL server replies says
SQL server表示
35.00-35.05
if I recognize my query is super simple, just use the histograms
如果我意识到我的查询很简单，那么直接使⽤直⽅图就可以了
35:05 - 35:07
If I think it's gonna be a lot of work
如果我觉得这个查询涉及的⼯作量很⼤
35.07-35.09
like it's gonna take maybe minutes or hours to run
⽐如，执⾏这个查询计划要花数分钟或者数⼩时
35.09-35.14
then who cares if I spend an extra couple seconds doing my sampling technique
那么谁会在意我去多花⼏秒来使⽤采样法呢？
35:14 - 35:16
because that'll make a you know big difference one actually run the query,
因为这样做的话，⽐起实际去执⾏这个查询就要会很⼤的不同
35.16-35.20
because that's the reason
因为这就是理由
35:20 - 35:23
The histograms gonna be faster this one takes more work
使⽤直⽅图的话，速度会更快，但使⽤采样法，我们就得多花些功夫
35:23 - 35:24
and it's also sort of weird too
有⼀点也很奇怪
35.24-35.28
because like you're like you're doing a scan on something while you're running the
optimizer it
因为当你在运⾏你的优化器的时候，你也在对某个东⻄进⾏扫描
35:29 - 35:31
so it's like a from engineering standpoint it might be hard to set up
So，从⼯程师的⻆度⽽⾔，这很难做到
35:56 - 36:01
like this is the model like this is super simple like like it's
我们这⾥使⽤的这个模型⾮常简单
36:02 - 36:05
You know what's the selectivity of this predicate
你知道的这个条件的选择率是什么
36.05-36.14
that component of the cost model itself is independent I think of whether it's a
histogram versus a sample
我觉得成本模型组件本身是独⽴的，不管是直⽅图也好，还是采样法也好
36:14 - 36:17
but yeah the yeah so up above is the formula today it'll say
但根据今天所讲的公式来说
36.17-36.22
I'm gonna do this man a disk IO I'm gonna you know this hash join is better than this
other join
当我进⾏磁盘I/O的时候，使⽤hash join要⽐使⽤其他join来得更好
36:22 - 36:26
yeah if that's not of all that other parts not very sophisticated they may be this doesn't
matter
如果其他部分都不是很复杂，那么就没什么关系
36:28 - 36:29
Question over here or yes
请问
36:38 - 36:39
so his question is
So，他的问题是
36.39-36.41
how do you actually create a sample
我们实际该如何进⾏采样
36.41-36.46
that is gonna be accurate for every single query ,that you can ever possibly throw on it
采样只对每个查询来说是准确的，⽤完你就可以丢掉了
36:48 - 36:51
my stupid sampling here is every other one
这⾥我采样的⽅式就是每隔⼀个进⾏采样
36:51 - 36.52
but clearly
但很明显
36.52-36.53
that's like we know it's stupid
我们知道这样做很蠢
36.53-36.56
because maybe data inserts arise at different times
因为数据可能会在不同的时间点插⼊这张表
36.56-37.01
and therefore the the data that I insert today first of the data is sort of yesterday has
different distribution
因为我今天插⼊的数据会让昨天数据的分布情况发⽣变化
37:01 - 37:03
and so I may want to sample differently
So，我想以不同的⽅式进⾏采样
37.03-37.04
or I could look at my predicate, and say
或者，我可以去查看我的条件，并说
37.04-37.09
well I its I'm only looking at you know data that was inserted today
Well，我只查看今天插⼊的数据
37:09 - 37:11
so therefore I make sure my sample only includes that
因此，我可以确保我的样本只包含今天所插⼊的数据
37:12 - 37:14
this is this is where it gets hard
这就是它的难点所在
37.14-37.19
again probably the reason why the advanced systems do this better than or do this, and
the open source guys don't do
这可能就是为什么⾼端的数据库系统可以做这种事情，⽽开源数据库系统不做这种事情的原因了
37:20 - 37:22
Like there's the reservoir sampling so much other sampling
⽐如，这⾥还有蓄⽔池抽样法（reservoir sampling）以及许多其他的抽样法
37.22-37.27
there's a lot of sampling techniques to try to come up with ways to do this
我们可以通过很多不同的取样法来试着做到这点
37:27 - 37:29
I don't know what the commercial systems actually do
我不知道实际哪个商⽤数据库系统做了这种事情
37:31 - 37:34
but hopefully you can see why this is a query optimization super hard
但我希望你们能明⽩为什么查询优化⾮常难
37.34-37.40
because like now you need some you know some gnarly math to figure out like what is
the right way to sample this
因为你们需要⼀些数学⽅⾯的知识来弄清楚该以哪种⽅式进⾏取样
37:40 - 37:42
and after you write get depend on the query
这取决于查询是什么
37.42-37.44
some queries you know uniform sampling might be perfect
对于某些查询来说，使⽤统⼀抽样法可能会⽐较完美
37.44-37.47
other sampling techniques might be better for others
对于其他查询来说，使⽤其他抽样法可能会更好
37:47 - 37:47
yes
请问
38:01 - 38:04
So his statement from an engineering standpoint, this could be hard
So，从⼯程师的⻆度来讲，这很难
38.04-38.10
because like now you have a separate table ,and then you want to be able to a
sequential scan on it
假设你有⼀张单独的表，然后你想能够对它进⾏循序扫描
38:10 - 38:10
And ideally
理想情况下
38.10-38.16
use the same execution code that you have to do sequential scans and in order to put
these statistics
为了将这些统计信息放在⼀起，你⽤来执⾏循序扫描的代码是相同的
38:16 - 38:23
yeah it is it is like a chicken for the egg
这有点像是先有鸡还是先有蛋
38.18-38.19
I can't run a query until I have a query plan
即直到我有了⼀个查询计划，那么我才能执⾏这个查询
38.19-38.24
but I can't get a query plan until I can run a query that can compute sample
但直到我执⾏⼀个查询并计算样本后，我才能拿到⼀个查询计划
38:24 - 38:24
yeah
38:28 - 38:32
okay so this point what we have
So，我们从中学到了哪些呢？
38.32-38.42
we can now roughly you know emphasize them roughly we can roughly estimate the
selectivity of our predicates what do we actually want to do with them
我们可以粗略估计这些条件的选择率，通过它们，我们实际能做到什么呢？
38:43 - 38:44
and again as I said in the beginning
正如我⼀开始所说的
38.44-38.49
this is where we're gonna do our cost model or cost based search to do query
optimization
我们通过我们的成本模型或者cost-based search来进⾏查询优化
38:49 - 38:51
so for this one
So，对于这种情况来说
38.51-38.53
again in the pipeline
在pipeline中
38.53-38.56
after we do all those those rewrites with just the rules
当我们通过这些规则来对这些东⻄重写完后
38:56 - 39:04
now we're gonna run enter this this cost model search, cost based search to try to figure
out how to convert the logical plan into a physical plan
现在，我们会通过cost-based search来试着弄清楚，该如何将逻辑计划转换为⼀个物理计划
39:04 - 39:05
all right
39.05-39.07
the physical plan is what the data system actually executes
数据库系统实际执⾏是根据物理计划执⾏的
39:07 - 39:09
so the logical plan that says I want to join these two tables
So，逻辑计划表示，我想对这两个表进⾏join操作
39.09-39.10
the physical plan says
物理计划表示
39.10-39.15 ！！
join these two tables with this hour ,and this buffer in this sort order ,and all that good
stuff
⽐如：我们可以通过这个hour字段，对这两张表进⾏join，我们使⽤这个buffer，以这种顺序进
⾏join，我们选⽤的都是最优的东⻄
39:16 - 39:19
so for single relations
So，对于单⼀关系来说
39.19-39.20
it's pretty straightforward
它⾮常简单
39.20-39.21
we'll briefly talk about it
我们会简单谈论⼀下它
39:22 - 39:27
the one we're gonna spend most of our time which is the hardest one is the multi
relations or anyway joins
我们要将我们⼤部分的时间花在最难的⼀部分上，即多重关系，或者any-way join
39:27 - 39:32
because now it's not only worrying about the the you know what join algorithm I want to
use，But what order I want to do my join
因为现在我们不仅要关⼼我想要使⽤哪个join算法，我们还要去关⼼我进⾏join操作的顺序
39:33 - 39:36
and remember I said last class
还记得我上节课所说的
39.36-39.39
the number possible query plans we could have this 4^N
我们在进⾏join操作时，可能的查询计划的数量是4^N
39.39-39.41
where n is the number of tables Were joining
N代表的是我们要进⾏join操作时涉及的表数量
39:41 - 39:43
right guys again it's for all my different join algorithms
对于我所有不同的join算法来说
39.43-39.45
I can again join them in different orders
我能以不同的顺序对它们进⾏join
39.45-39.47
and I can join them either one with the inner versus the outer
我可以将inner table和outer table互换下⻆⾊，再对它们进⾏join
39:48 - 39:50
right so the search base explodes
So，要查找的可⾏join数量会多得爆炸
39:51 - 39:55
so because this is incomplete and np-complete
So，因为这是np-complete
39.55-39.57
we don't want to actually do an exhaustive search
实际上，我们并不想进⾏详尽搜索
39:57 - 39:59
because we're never actually going to complete
因为我们实际上永远不会完成这种搜索
39:59 - 40:05
does it make sense to run our query optimizer for an hour ,if our query is only gonna
take you know one minute to run
如果我们的查询只需花1分钟就能完成，那么花1⼩时来为它运⾏查询优化器是否值得呢？
40.04-40.05
that's not a good trade-off
这并不是⼀种好的取舍
15-03
15-03
40:05 - 40:13
so we need a way to figure out how to sort of shield work or cut off query plans
So，我们需要⼀种⽅式来弄清楚该如何切断查询计划
40.13-40.14
and we don't want to examine
我们不想去测试那么多查询计划
40:14- 40:17
to reduce our search space so we can make this problem more tractable
So，通过减少我们查找的范围，我们就让这个问题更易处理
=====================
40:19 - 40:20
so let's first talk about how we want to handle single relations
So，我们先来讨论下我们该如何处理单⼀关系的情况
40.20-40.24
and the most of time we talk about multiple relations
在⼤多数情况下，我们讨论的是多重关系的情况
40:24 - 40:26
so for single relation query plans
So，对于单⼀关系的查询计划来说
40.26-40.33
the hardest problem we have to deal with is picking our access method
我们得处理的最难问题就是选出我们的access method
40:33 - 40:36
right the fallback option is always a sequential scan
我们的备胎选项始终是循序扫描
40.36-40.37
it's the slowest
它的速度是最慢的
40.37-40.39
but it's always it's always correct
但它得出的结果始终是正确的
40:39 - 40:41
then we can maybe one do a binary search
我们也可以进⾏⼆分查找
40.41-40.47
and we have a cluster index or pick ,and put pick you know one or two one or multiple
indexes to use for index scan
我们可以使⽤聚簇索引或者多个索引⽤来进⾏索引扫描
40:49 - 40:53
the other thing we can care about also is the order in which we evaluate predicates
我们关⼼的另⼀件事情就是我们评估条件时的顺序
40:53 - 40:55
like I have something and something
假设，我有xxx和xxx
40:56 - 41:00
if the second predicate is more selective than the first one, maybe I want to evaluate
that one first
如果第⼆个条件⽐第⼀个条件更具选择性（知秋注：获取的收益更⼤），那我可能会想先对第⼆
个条件进⾏评估
41:00 - 41:03
so I throw away more data sooner other than later
So，我就可以提前丢掉更多数据，⽽不是之后再丢掉这些数据
41:04 - 41:07
and maybe the second predicate evaluates always you know always true
兴许，我们在评估第⼆个判断条件时得到的结果始终为true
41.07-41.09
so we you know we don't we want to put that as the the second one
So，我们就想将它放在后⾯进⾏评估
41:10 - 41:13
so in most new database systems
So，在⼤部分新型数据库系统中
41.13-41.17
like there's all these startups all these new databases coming along the last ten years
在过去10年间出现了很多DBMS初创企业以及各种新型数据库系统
41:17 - 41:19
if they have a query optimizer
如果他们有⼀个查询优化器
41.19-41.23
they're probably and they're you know they're probably using heuristics that in order to
pick these things
你知道的，他们可能会去使⽤启发式规则来做到这些事情
41:24 - 41:27
but you don't actually truly need a sophisticated cost model to do this
实际上，你真的不需要去使⽤⼀个复杂的成本模型来做到这些事情
41:28 - 41:30
I just say you know what index is the most selective
我只会这样说，你知道哪个索引最具选择性
41.30-41.31
and that's the one I always want to pick
我始终想选的就是这种最具选择性的索引
41.31-41.35
or what predicates most to selective，that's the one I always want to pick
或者说，哪个判断条件最具选择性，那么我就会选它
41:36 - 41:39
so for all these queries， this is especially easy to do
So，对于所有查询来说，这种做法做起来最为简单
41:39 - 41:42
because they're not going to access much data
因为它们访问的数据量并不多
41.42-41.45
and then you know they're doing you know single table lookups for the most part
你知道的，⼤部分情况下，它们都是对单表进⾏查询
41:47 - 41:48
and so for OLTP queries
So，对于OLTP查询来说
41.48-41.54
the query planning we're going to do is essentially try to identify whether a query is
sargable
本质上来讲，我们所要做的就是试着是鉴定这个查询是否是sargable（Search Argument
Able）的
41:55 - 41:58
and this is some terms in the 80s ,I don't know who invented it
这是⼀个1980年代所出现的术语，我不清楚是谁发明了它
41:58 - 42:00
all right,sargable we'll just means Search Argument Able
sargable的意思是search argument able
42:01 - 42:03
and all that basically means is that
简单来讲，这意味着
42.03-42.06
there's an index we could pick for our query
在执⾏我们的查询时，我们可以使⽤⼀个索引来帮助我们的查询
42.06-42.07
we know that's the best one to use
我们知道，对于这个查询来说，使⽤这个索引是我们的最佳选择
42:08 - 42:09
that's it
这就是sargable
42:10 - 42:12
so again we don't need to have an exhaustive search
So，再说⼀遍，这⾥我们不需要进⾏暴⼒搜索
42.12-42.19
we just look it up all our query plans are sorry, we look at all of our possible indexes that
could satisfy our query
我们会去查看所有适⽤于我们查询的索引
42:19 - 42:22
and pick the one that has the best selectivity
然后选出那个具有最佳选择率的索引
42:23 - 42:25
Because that's gonna route us to the data more quickly
因为这能让我们更快找到我们要找的数据
42:26 - 42:27
again really simple
来看个很简单的例⼦
42.27-42.30
have my select star from people where ID = 123;
SQL语句如图所示
42:31 - 42:35
I just have a heuristic that says oh I have a primary key on ID
这⾥我有⼀个启发式规则，它表示：id是⼀个主键
42:35 - 42:37
but therefore I have an index， done
因此我拥有⼀个索引，⽤它就完事了
42.37-42.40
I just pick that as my I'm doing index scan on that on that index
我可以使⽤这个索引来进⾏索引扫描
42:42 - 42:48
Right, again, most newer systems that come along that are doing transactions are doing
OLTP stuff
⼤多数较新的数据库系统都会去做事务或者OLTP之类的东⻄
42:49 - 42:50
this is what they support first
这就是它们⾸先要去⽀持的东⻄
42:53 - 42:54
for the joins though
对于join来说
42.54-42.56
that for that that's one things is hard
这其实是个很难的东⻄
42:57 - 43:03
so again the as the number tables were going to join our table, then I'm alternative plans
are gonna grow
So，再说⼀遍，随着我们要join的表的数量增加，join操作时产⽣的备选⽅案数量也会增加
43:03 - 43:05
so therefore we need a way to prune that down
So，因此，我们需要对这些⽅案的数量进⾏剪枝
43:06 - 43:10
so we're gonna rely on what I'll talk about here
这⾥我要讲的是
43.10-43.12
we're gonna rely on a core assumption
我们会依赖于⼀个核⼼假设
43.12-43.17
that the IBM people did back in the 1970s with the system R when they built the first
query optimizer
这个假设是IBM在1970年代开发System R中第⼀个查询优化器时所做的
43:18 - 43:21
and that is they are going to only consider left deep join trees
他们只会考虑左深连接树（left-deep join tree）的情况
43:22 - 43:23
so that means that
So，这意味着
43.23-43.25
any other alternative join tree structure
对于任何其他备选的join tree结构来说
43.25-43.28
I'll show that looks like in the next slide
So，我会在下⼀张幻灯⽚中向你们展示它们
43:29 - 43:32
they're just not gonna bother doing any search or cost estimation
他们不去做任何搜索或者成本估算⽅⾯的事情
43.32-43.34
another say that's we're not even gonna consider it
也就是说，我们不需要去考虑它
43:35 - 43:37
so a left deep trees like this
So，left-deep join tree⻓这样
43.37-43.43
where along the on the left side of the tree, that's we're doing all our joins
我们会沿着这棵树的左边来进⾏join操作
43:43 - 43:44
Right so we join A and B
So，我们先对A和B进⾏join
43.44-43.49
and then the output of this join A B is then joined with with the input of C ,the scan on C
然后，我们将A和B的join结果与C的输⼊数据进⾏join
43.49-43.51
and so forth
以此类推
43:51 - 43:53
all right this middle guy here is sort of a hodgepodge
中间这棵树看起来有点像是个⼤杂烩
43.53-43.57
right it's you know someone on the left some on the right
有的是在左边进⾏join，有的是在右边进⾏join
43:57 - 43.59
right and this one here is called a bushy tree
So，第三种叫做bushy tree
43.59-44.02
where I do the joins on you know C and D
我对C和D进⾏join
44.02-44.03
, and then do the joins in A B
然后对A和B进⾏join
44.03-44.06
and then the output of those two joins are then then joined together at the end
接着，最后我们再对这两个join操作的结果进⾏join
44:08 - 44:10
so IBM in the system R
So，在IBM所做的System R中
44.10-44.12
they're just gonna not even consider these other guys here
他们不会考虑其他两种join tree
44:13 - 44:14
they're only gonna look at this one
他们只关注第⼀种tree
44:15 - 44:15
yes
请问
44:18 - 44:20
yeah this is actually again ,so his statement is
So，他说的是
44.20-44.21
the result is always the same
join的结果始终是⼀样的
44.21-44.23
yes this is the beauty of relational algebra
没错，这就是关系代数的魅⼒所在
44:24 - 44:27
so the join operator is commutative
So，join operator的顺序是可交换的
44.27-44.30
so I can put, I can join these things in any way that they want,
So，我们可以以他们想要的任意顺序来进⾏join
44.30-44.33
and the final result is always the same, it's always correct
最终的结果始终是相同且正确的
44:33 - 44:36
so therefore it is perfectly safe for me to go ahead and do this
So，因此对于我们来说，这样做是很安全的
44:38 - 44:43
everything I guess why they do this other than just reducing the number of plans they
have to look at
你们可以猜下他们为什么选择这样做，⽽不是去减少他们所要查看的执⾏计划的数量
44:46 - 44:48
think back to when we talk about query processing models
回想下我们当时讨论查询处理模型时所讲的东⻄
44:49 - 44:52
all right, so back then they were doing the iterator model the volcano model
So，在当时，他们使⽤的是iterator model和volcano model
44:53 - 44:54
The else are called what
剩下⼀种叫做什么呢？
44:56 - 44:57
the pipeline model
pipeline model
44:58 - 45.00
so in this case here at the left deep join tree
So，这个例⼦中使⽤的是left-deep join tree
45:00 - 45:04
I don't have to materialize any output from a join operator
我们⽆须将⼀个join operator的输出延后⽣成
我不需要延后⽣成某个join operator的输出结果
45:05 - 45:07
right it's always then fed into the next join operator
它始终是下⼀个join operator的输⼊
45:07 - 45:08
so I do my join A and B
So，我对A和B进⾏join
4508-45.11
then I take the output of that join
然后，我拿到这个join操作的输出结果
45.11-45.15
and I now build my hash table to do or you know do whatever kinda join I want to do on C
我现在构建出我的hash table，并以此使⽤任何我喜欢的join⽅式来对C进⾏join
45:15 - 45:17
if I have this bushy tree here
如果我使⽤的是这种bushy tree
45.17-45.19
I would do the join on C and D
我会对C和D进⾏join
45.19-45.23
that output then gets written out to like a temp file on disk
我们会将该join的输出结果写到磁盘上的⼀个临时⽂件中
45:23 - 45:26
because now I need to go back over here and now do join A and B
现在我需要回过头去对A和B进⾏join
45:27 - 45:31
and then now I go back and feed back back in the the join I just did over here
然后，我再将这两个输出结果进⾏join
45:31 - 45:35
you know read that back in， build my hash table do whatever I want to do,
我们读取这些数据，并以此构建hash table来做我想做的事情
45.35-45.38
and then do the join with this other guy here
然后，和其他数据进⾏join操作
45:38 - 45:43
so left deep join trees not or not always gonna be pipelined
So，left-deep join tree⽤的不⼀定是pipeline模型
45:43 - 45:46
but it makes your life easier
但这会让你处理起来变得更为容易
45.46-45.47
and back in the 1970s
回到1970年代
45.47-45.48
they didn't have a lot of memory
他们能使⽤的内存量并不多
45.48-45.50
so they would have to spill to disk a lot
So，他们得将⼤量的数据溢出到磁盘上
45:50 - 45:54
so you can minimize them out amount of work if that amount of data to write the disk in
order if you always go left deep
So，如果你⽤的始终是left-deep join tree，那么你可以最⼩化写⼊磁盘的数据量
45:57 - 45:59
right,so this is a thing I just said here
So，这就是我这⾥所讲的东⻄
46:00 - 46:04
So in today's systems，not everyone makes this assumption
So，在当下的数据库系统中，并不是所有的数据库系统都使⽤了这种假设
46:05 - 46:07
but again I think every textbook talks about this
但我认为，所有教科书上都讨论了这个
46.07-46.09
that you know they cut these things out
你知道的，它们将这块内容删掉了
46:11 - 46:16
all right so how are we actually going to enumerate our query plans
So，我们实际该如何枚举我们的查询计划呢？
46:16 - 46:25
so the first thing we just do is enumerate at the logical level all the different orderings
of our of our tables we could possibly join
So，⾸先我们要做的就是从逻辑层⾯来枚举所有可能的不同的执⾏join操作的顺序
46.20-46.28
to see join our RST, I could join R and S first,
假设我们对R、S和T这三张表进⾏join，我可以先对R和S进⾏join
46:25 -46:29
maybe you know T and S first
你知道的，我们也可以先对T和S进⾏join
46.29-46.30
I enumerate all those things
我会将这些东⻄都枚举出来
46:31 - 46:37
and then if each of those ,I could then now enumerate all the different possible join
algorithm I could use
我可以列出所有我可以使⽤的不同join算法
46.37-46.41
hash join ,Sort-Merge join, nested loop join
⽐如：hash join，sort-merge join和nested-loop join
46:41 - 46:42
and then for all those now
有了这些
46.42-46.47
I can then also now in enumerate all the possible query plans like what I could have
那么，我就可以去枚举出所有我可能会拥有的查询计划
46:47 - 46:50
all right you can see how this is like search space is exploding
你们可以看到，我们要查找的范围⼤得爆炸
46:51 - 46.57
so what the IBM guys came up with in the 1970s was to use a technique called dynamic
programming
So，IBM那群⼈在1970年代提出了⼀种叫做动态编程的技术
46.57-47.03
to make it more tractable by breaking it up into smaller discrete problems
通过将⼀个⼤问题分解为⼀些较⼩的⼩问题，以此来让问题变得更易解决
47:03 - 47:04
and we solved the smaller problems first,
我们先解决这些较⼩的问题
47.04-47.07
and at the very end we combined everything all together
在最后的时候，我们将所有⼩问题的结果都结合在⼀起
47:08 - 47:10
So let's look at really simple example here
So，我们来看个简单案例
47:10 - 47:13
so let's say I want to join three tables, R S T
So，假设我想对R、S和T这三张表进⾏join
47:14 - 47:16
so the way to think about this is like
So，我们思考这个问题的⽅式是
47.16-47.18
it's like a sort of search tree that I'm showing horizontally
这⾥我以⽔平的⽅式向你们展示这棵查找树
47:19 - 47:23
so this is our starting point here for our logical plan, where none of the tables are joined
So，这是我们逻辑计划⼀开始的样⼦，我们还没有对任何表进⾏join
47:23 - 47:26
and then our end goal is end up here
然后，我们的最终要达成的效果是这样的
47.26-47.28
where we have R S and T joined together
即将R、S和T这三张表join在⼀起
47:29 - 47:32
so in the first step
So，在第⼀步中
47.32-47.35
we want to figure out you know what's the first join ordering we want to do
我们想弄清楚我们想要的第⼀次join的顺序是什么
我们想弄清楚我们第⼀次该先对哪两张表进⾏join
47:36 - 47:39
so we could possibly join R and S first or T and S first
So，我们可以先对R和S进⾏join，或者先对T和S进⾏join
47.39-47.42
and then for the sake of space I'm not showing all the other ones
因为空间有限，我没法去展示其他的可能情况
47:42 - 47:47
but for all other possible join orderings for this first join we want to do，We enumerate
them down here
但我们会在下⾯将第⼀次进⾏join操作时所有可能出现的顺序都列举出来
47:49 - 48:00
and then now what we're going to do is we're now going to have a compute the the cost
of doing whatever join were specifying here in the first step with our different join
algorithms
然后，现在我们要做的就是去计算出，在使⽤不同的join算法的情况下，第⼀步的成本是多少
48:01 - 48:03
so again for sake of simplicity
So，为了简单起⻅
48.03-48.06
we're saying we can either do a SortMerge join or a hash join
我们可以使⽤Sort-Merge join，也可以使⽤hash join
48:07 - 48:14
and then now we just used all this formulas that we talked about before to now compute
the cost of executing each of these join operators
接着，我们通过以前讲过的那些公式来计算出这些join操作符的执⾏成本
48:15 - 48:15
All right
48.15-48.18
again in approximating the amount of disk IO we're gonna have to do
我们需要去预测我们所要做的磁盘I/O次数
48:19 - 48:23
and so for each node we have in the first step
So，对于我们第⼀步中的每个节点来说
48.23-48.26
we're just gonna pick whatever path actually has the lowest cost
我们只需选择执⾏成本最低的那条路线即可
48:27 - 48:30
whatever join algorithms can actually have the lowest cost, and that's the one we retain
即我们只保留执⾏成本最低的那个join算法
48:31 - 48:34
And then now starting from each of these nodes of the next step
接着，我们从下⼀步所涉及的每个节点处出发
48.34-48.40
we do the same thing and try to compute the estimated cost for doing different joins to
get to our end goal here
我们会进⾏相同的操作，并试着算出不同join操作的执⾏成本，以此来达到我们的最终⽬标
48:42 - 48:42
right
48.42-48.50
and then we just end up throwing way for each node here we end up only keeping the
one with the lowest cost to get to our end point here
最终，我们只会保留到达我们最终⽬标时那些执⾏成本最低的节点所组成的那条路线
48:50 - 48:52
and now we go back
现在，我们会回过头去
48.52-48.56
and try to figure out which path is gonna have the the lowest cost for us
我们会去弄清楚执⾏成本最低的那条路线
并试着弄清楚对于我们来说，哪条路线的执⾏成本最低
48:57 - 48:59
and that's the one we'll end up using for this query plan
这就是我们这个查询计划最终使⽤的执⾏⽅案
49:01 - 49:04
this is an over simplification of actually how this actually works
实际上，我们这⾥极度简化了这整个执⾏过程
49.04-49.10
but this is the general idea from system R, that they've been in for dynamic
programming
但这是他们在System R的动态编程下所使⽤的基本思想
49:10 - 49:12
and at a high level
从⾼级层⾯来看
49.12-49.15
there's sort of two categories of query optimizers
我们有两类查询优化器
49.15-49.16
we're only talking about one of them
我们只谈论了其中的⼀种
49.16-49.17
this one's the most common
这是最常⻅的⼀种
49:17 - 49:19
Most systems should operate this way
⼤多数数据库系统应该都使⽤这种⽅案
49.19-49.22
Postgres does it this way, MySQL does it this way, Oracle does it this way
PostgreSQL、MySQL以及Oracle都是这么做的
49:23 - 49:24
all right
49.24-49.28
you start with the first node is always the starting point when nothing's joined
我们始终是从第⼀个节点出发的，在这个节点中，我们不会对任何表进⾏join
49:29 - 49:33
and then you work from the beginning to the end to figure out how to get to my end goal
那么，我们会从头到尾⾛⼀遍，以此弄清楚该如何达到我的最终⽬标
49.32-49.33
where everything's joined together
即将这些表都join在⼀起
49:35 - 49:37
the other thing also over simplifying here
这⾥我们还极度简化了另⼀个东⻄
49.37-49.44
there's no information that tell me about what I'm showing you about the physical
properties of the data we're emitting from one operator to the next
这⾥也没有任何信息告诉我们关于我们从⼀个operator传给下⼀个operator时所发送数据的物理
属性
49:45 - 49:49
so I'm not keeping track of whether things need to be sorted ,whether things are
compressed a row-store or a column-store
So，我并没有去跟踪这些信息，⽐如这些数据是否需要进⾏排序，或者它们有没有被压缩，这
⾥使⽤的是⾏存储还是列存储
49.49-49.53
,all that extra kind of information getting you have to consider in your search algorithm
here
你得在你的查找算法中考虑所有这些额外信息
49:53 - 49:56
but for our purposes we're ignoring that
但出于我们的⽬的，这⾥我们将它忽略
49:58 - 49.59
all right
49.59-50.02
so let's walk through this example more concretely
So，我们再来更为具体地看下这个例⼦
50:02 -50:12
so that's it that's the dynamic approach arrived we're going to build out our search to try
to figure out which one has ,you know what what path to get me to the end goal of
everything's joined together ,that's gonna have the lowest cost
So，通过这种动态编程的⽅案，我们可以找出那条实现我们最终⽬标（即将表join在⼀起）且成
本最低的执⾏路线
50:13 - 50:16
but let's now start it all put this all together and do the three steps we talked about
但现在我们将这些东⻄放在⼀起，并做下我们所谈论的这三个步骤
50:17 - 50:21
so we want to enumerate all the join orderings ,all the algorithms and all the access
methods
So，我们想去列出所有的join顺序、join算法以及access method
50:21 - 50:23
and again emphasizes
再次强调下
50.23-50.26
no database system does exactly the way I'm showing here, it's way more complicated
没有任何数据库会完全按照这⾥我所展示的来做，它们所做的⽅案要更为复杂
50:26 - 50:27
but at a high level
但从⼀个⾼级层⾯来看
50.27-50.29
you hopefully if you understand this
我希望，如果你们能够理解这些东⻄的话
50.29-50.32
you can then see how to apply it to more sophisticated configurations and setups
那么你就可以弄清楚该如何将它们⽤于更加复杂的配置和设置
50:34 - 50:37
so the very first step to join join R S and T
So，在对R、S和T这三张表进⾏join时，⼀开始要做的事情是
50.37-50.40
I'm just going to enumerate all the possible join ordering that I have
我只需列出所有我可能使⽤的join顺序即可
50:42 - 50:43
but we said that
但我们说过
50.43-50.47
for system R
对于System R来说
50.47-50.52
we're gonna prune anything that is is either a cross product
我们要去修剪掉任何cross-products之类的东⻄
50.52-50.54
but that's not a left outer join
但这并不是left outer join
50:54 - 50:56
are those things we can just drop immediately
我们可以将这些东⻄⽴刻丢掉
50:57 - 50:59
so then for each of these guys
So，对于这些东⻄来说
50:59 - 51:01
so let's pick this one here
So，我们这⾥选⼀个
51.01-51.04
for each of these query plans now we're gonna go inside of that
我们会去查看这每个查询计划
51:04 - 51:08
and now start and enumerating all the different join algorithms we could possibly have
我们会去列出所有我们可以使⽤的不同join算法
51:09 - 51:12
right so for to do this join， Rand S and then followed by T
So，为了进⾏join，我们会先对R和S进⾏join，然后再和T进⾏join
51:13 - 51:15
I can either do Nested loop join, I could do a hash join
我可以使⽤Nested Loop join，也可以使⽤hash join
51:15 - 51:18
so now I'm going to enumerate again all possible configurations of those
So，现在我要去列出所有可能的配置
51:19 - 51:24
and those are my edges going in that dynamic program graph, those are my edges going
from one step to the next
在这张动态编程图中，我列出了从当前这⼀步到下⼀步时会出现的所有可能配置
51:26 - 51:30
and then we do the same thing for all the other the join orderings from the previous slide
接着，我们会对上⼀张幻灯⽚中所有其他不同的join执⾏顺序也做相同的事情
51:31 - 51:34
so then now we're gonna pick one of these guys
So，现在我们会从中选出⼀个来
51:34 - 51:39
and now I try to you know enumerate all bit different possible access methods you can
have
现在，我会试着去列出所有我们可以使⽤的不同access method
51:40 - 51:42
so we can either do a sequential scan or index scan
So，我们既可以使⽤循序扫描，也可以使⽤索引扫描
51.42-51.47
and then for each index scan become you know for each index we could possibly have
,we'd have another enumeration of that
我们也得列出所有我们可以使⽤的索引
51:49 - 51:52
So again you sort of keep fanning out and having more and more options
So，这样的话，我们的选项就会变得越来越多
51.52-52.00
and then you use the dynamic programming technique to figure out what the cheapest
path is
然后，我们使⽤动态编程技术，来弄清楚执⾏成本最低的那条路线
52:00 - 52:03
okay so is this clear roughly how this works
So，你们明⽩⼤致的⼯作流程是什么了吗？
52:05 - 52:05
All right
52.05-52.07
so I always like to show this every year
So，我每年都会去展示这个东⻄
52.07-52.12
so again I'm gonna show you Postgres has a specialized optimizer
So，PostgreSQL有⼀个专⻔的优化器
52:12 - 52:15
but in general what I've described here is
但总的来讲，我这⾥所描述的是
52.15-52.20
at a high level how every system R based query optimizer works
我会从⾼级层⾯来讲System R中查询优化器所做的事情
52:20 - 52:21
they have a cost model
它们有⼀个成本模型
52.21-52.26
that allows an estimation of as they're doing dynamic programming search to get to the
end goal
这允许他们通过动态编程来找到达到最终⽬标所需要的执⾏成本
52:28 - 52:30
Postgres actually has two optimizer search algorithms
实际上，PostgreSQL拥有2种优化器实现
52:31 - 52:33
Against do they have the system R one that I just talked about
它们拥有⼀个我刚刚在System R中所提到的算法
52:34 - 52:35
but then they also have this special one
但它们也有⼀个特别的算法
52.35-52.36
called the genetic optimizer
它叫做遗传优化器
52.36-52.38
are the GEQ
即GEQ
52.38-52.43
genetic query optimizer GEQO
遗传查询优化器，即GEQO
52:43 - 52:45
and what happens is that
这⾥所发⽣的事情是
52.45-52.48
if you have a query that has less than 12 tables
如果你有⼀个查询，它所涉及的表的数量⼩于12
52:48 - 52:50
they used the system R approach
PostgreSQL就会使⽤System R的⽅案
52:50 - 52:52
and then if you have 13 or more
如果该查询所涉及的表的数量⼤于等于13
52.52-52.54
then you start using this genetic algorithm
那么，你就会使⽤这种遗传算法
52:54 - 52:56
because they can deal with you know a larger search base
因为它们能够应对更⼤的搜索范围
52:58 - 53:02
so with Postgres they're gonna support all different types of join orderings
So，在PostgreSQL中，它们⽀持所有不同的join顺序
53:02 - 53:04
so left-deep, right-deep, bushing, doesn't matter
So，left-deep，right-deep，bushing，不管哪种都没问题
53:05 - 53:06
and as I said
正如我所说的
53.06-53.09
a and then they'll fall back to this genetic one when it gets too complex
当查询过于复杂的时候，它们会去选择使⽤这种遗传算法
53:10 - 53:15
so at a high level this works as your standard genetic search algorithm
So，从⾼级层⾯来看，它会去使⽤标准的遗传查找算法来进⾏处理
53:15 - 53:16
so my first generation
So，在1st Generation
53.16-53.20
I'm just gonna have enumerate a bunch of different random configurations of my query
plan
我会去列出我查询计划相关的⼀堆不同的随机配置
53:20 - 53:26
right and that's the join ordering plus the the index scan or sequential scan plus the
actual join algorithm I want to use
这些配置包括join的顺序、索引/循序扫描，以及我实际想使⽤的join算法
53:26 - 53:28
and then for each of these I'm gonna compute the cost
然后，我们会计算出这些配置的执⾏成本
53:30 - 53:31
and then what happens is
这⾥所发⽣的事情是
53.31-53.32
I pick whatever which one is the best
我会选出其中的最佳⽅案
53:33 - 53:34
all right so this one has the lowest cost
So，这个配置的执⾏成本是最低的
53.34-53..38
I'll keep track of that up above and say here's the best plan I've ever seen
我会继续跟踪，并说，这是我所⻅过的最佳执⾏计划
53:39 - 53:42
and then I'm gonna throw away the one that has the lowest cost
接着，我会将执⾏成本最⾼的那个执⾏计划给丢弃
53:42 - 53:50
And then now do a mix up of the traits of the ones that weren't thrown away
然后，我会将这两个并未丢弃的执⾏计划的特征结合在⼀起
53:50 - 53:58
So now I'm gonna do random flips of the the genes if you will, all the the components of
the query plan to produce new query plans
即，现在我会基于此对该查询计划的所有部分进⾏重新洗牌，以此⽣成新的查询计划
53:59 - 54:02
right and so it's sort of like a random work
So，这有点像是随机处理
54.02-54.05
so now I'm do the same thing in my second generation
So，我在2nd Generation中进⾏相同的操作
54:05 - 54:07
I find the one that has the lowest cost
我找到了这个成本最低的执⾏⽅案
54.07-54.07
in this case here
在这个例⼦中
54.07-54.08
this one up here has a cost eighty
最上⾯的成本是80
54.08-54.11
that now becomes the new best class I've ever seen
这就成了我所⻅过的最佳执⾏计划
54:11 - 54:13
I throw away the one that has the lowest cost
我将这个成本最⾼的执⾏⽅案丢弃
54.13-54.17
then I do a random mix up of the plans that are kept around
然后，我将这两个⽅案随机混合在⼀起
54:17 - 54:20
And I generate the next generation
我们会⽣成下⼀代⽅案
54:21 - 54:24
and they'll keep doing this for until a certain amount of time there's a time out says
它们会⼀直这样做下去，直到超时为⽌，并说
54.24-54.34
I'm not I haven't seen anything else or I haven't seen anything better than what the the
best one I've seen so far in a certain mount of time exhaust my fixed time limit
在⼀定时间内，我并没有看到任何⽐我所⻅过的最佳⽅案还要好的⽅案
54:34 - 54:38
and then whatever comes out of this is the best is that it's one I'm gonna use
该算法所得出的结果就是我要使⽤的最佳⽅案
54:39 - 54:39
yes
请问
54:45 - 54:46
yeah a question is
她的问题是
54.46-54.48
for simplicity reasons
出于⽅便起⻅
54.48-54.49
I'm only showing you left-deep trees
这⾥我只向你们展示了left-deep tree的情况
54.49-54.53.
you could mix it up with right-deep and bushy trees
这⾥⾯你们可以放⼊right-deep tree和bushy tree
54:53 - 54.55
but you make this is only three tables
这个例⼦中，我们只有3张表
54.55-54.57
we'd imagine you had another three tables you want to join
假设你还想对另外3张表进⾏join
54.57-55.00
and maybe one part of it is right-deep one part is left-deep
可能其中⼀部分⽤的是right-deep tree，另⼀部分⽤的是left-deep tree
55.00-55.02
I can mix and match them as needed
根据需要，我可以将它们混合在⼀起，并进⾏⽐较得出结论
55:04 - 55:05
yeah but it's hard to draw that
但这很难画出来
55:12 - 55:13
so the question
So，这⾥的问题是
55.13-55.15
the first generation how's it generate this
我们是如何⽣成1st Generation中的东⻄的
55.15-55.16
random
随机⽣成
55:28 - 55:29
yeah yeah so your question is
So，你的问题是
55.29-55.32
how many candidates
这⾥⾯会有多少个candidate
55.32-55.35
I don't know how things probably figure well ,I don't know I don't know the number is
我不知道这个该怎么说，我也不清楚具体有多少candidate
55:35 - 55:37
but yeah it can't be everyone
但这⾥不可能将所有candidate都列举出来
55:38 - 55:43
yeah it's it's it's some percentage of big actually probably some fixed amount, I don't
know what it is
这⾥只是列出了其中部分candidate，我不清楚总共到底有多少个candidate
55:45 - 55:48
but again the this cost estimation is the same thing we already talked about before
但成本估算和我们之前讨论的东⻄是⼀回事
55.48-55.51
right this is it's the same histograms or sampling
它⽤的同样是直⽅图或者是采样法
55.51-55.53
and you're just applying this as you go across
当你遇到的时候，直接⽤就好了
55:55 - 56:00
right,Postgres is the only one that I know that actually does this
据我所知，PostgreSQL是唯⼀⼀个使⽤了这种遗传算法的数据库系统
56:02 - 56:05
there was some work doing simulated annealing other techniques,
这⾥⽤到了⼀种叫做模拟淬⽕（simulated annealing）的技术
56.05-56.06
this is like a random algorithm
这有点像是⼀个随机算法
56:06 - 56:12
right again because it's looking it's not guaranteed to converge you're not guaranteed to
see exactly the best possible option
因为这不保证收敛，也不保证我们⼀定会看到最佳选项
56:12 - 56:14
you're doing a random work in the solution space
我们在⼀堆可⽤的解决⽅案内进⾏随机查找
56.14-56.18
and hopefully you land on something that that's reasonable
我们希望我们能找到⼀个合理的解决⽅案
56:18 - 56:19
so actually to his point
So，从他的观点来看
56.19-56.25
you obviously want to pick things that are and your initial candidate should be you know
reasonably good
很明显，你想选择那些看起来还不错的candidate作为初始candidate
56.26-56.27
how they actually do that I don't know
我并不清楚他们实际是怎么做的
56:28 - 56:29
because if you have all crap here
因为如果你在1st Generation处都是些没什么⽤的candidate的话
56.29-56.34
you have ugly children in big first step then you have ugly children the second step it's
not gonna be good
如果你第⼀步中的孩⼦不是特别好，那么第⼆步中的孩⼦也就很糟糕，这样就不是很好了
56:34 - 56:37
so there's probably some way to figure out what your initial candidate should be
So，这⾥可能会有某种⽅式可以弄清楚你的初始candidate应该是什么
56:40 - 56:42
all right so any questions about this, yes
对此有任何问题吗？请问
56:45 - 56:46
okay so this question is
So，这⾥的问题是
56.46-56.51
how often you often you get queries to have 13 or more joins
我们遇上对13张或13张以上表进⾏join的频率有多⾼
56:53 - 56:54
very often
经常遇到
56:55 - 57:03
uh it depends for OLTP you Walt, for analytics it's quite quite often ,yes
对于OLTP和数据分析来说，你会经常遇到这种情况
57:06 - 57:07
all right so think about this
So，考虑下这种情况
57:09 - 57:14
so in a data warehouse a very common set up does have what's called a snowflake
schema
So，这是⼀种在数据仓库中⾮常常⻅的⼀种设置，它叫做雪花模型（snowflake schema）
57:15 - 57:16
and the idea is
它的思路是
57.16-57.19
that you have this single table that's called your fact table
假设，我们有⼀张表，它叫做fact
57:19 - 57:22
and then you have dimension tables that are that are around it
然后，我们还有⼀张dimension表
57.22-57.24
so a fact table using Walmart as example
So，我们以沃尔玛为例
57:24 - 57:27
Walmart has a fact table, that's every single item that anyone's ever bought at Walmart
沃尔玛有⼀张fact表，它上⾯保存了所有⼈在沃尔玛购买过的商品记录
57:27 - 57:30
So that table is massive it's billions of billions of things
So，这张表⾮常⼤，它上⾯有⼏⼗亿条数据
57:30 - 57:35
but you don't want to store like the name of every single product the price and so forth
但你不会想去保存诸如每个产品的名字，价格之类的东⻄
57:35 - 57:37
so you have these dimension tables on the side
So，我们就会有这些dimension表
57.37-57.40
that says you know here's the product they bought here's what store， his location
上⾯保存着他们所购买的商品，他们在哪个商店买的，以及商店位置之类的信息
57:40 - 57:42
so those are all your dimension tables
So，这就是你的dimension表
57.42-57.42
so when you do a join and say
So，当你进⾏join操作时，并说
57.42-57.52
find me all the the find me the best-selling item in the state of Pennsylvania during the
winter for this month range for people you know over the age of 35
请为我找到对于35岁以上的⼈来说，本⽉冬季宾夕法尼亚州最畅销的商品
57:52 - 57:54
those are all joins now with his dimension tables
将这些和dimension表进⾏join
57:55 - 57:56 ？？？
so that thing can rack up very very quickly
So，这些数据就可以很快地堆积起来
57:57 - 57.58
the other thing I'll say too is like
另⼀个我要说的东⻄是
57.58-58.01
I always talk to the database companies
我⼀直有和数据库公司讨论⼀些东⻄
58.01-58.03
and I ask them like you know about the query optimizer
我会问他们诸如查询优化器之类的东⻄
58.03-58.06
because that's the part I'm most interested about
因为这是我最感兴趣的⼀部分内容
58:06 - 58:10
and the metric they always give me in terms of like Oh our query optimizer is good
他们给我的反馈总是说：Oh，他们的查询优化器很好
58:11 - 58:13
they always claim the number joins that they can support
他们总是说他们的数据库系统⽀持多种join⽅式
58:14 - 58:15
and I don't think this is a good metric
我不觉得这是⼀个好指标
58.15-58.19
but like I've noticed that this is cars every single time I ask Math
但我每次都会去询问这些数字
58:19 - 58:24
so I think like memSQL told me once that they could do 35 table joins
So，有次MemSQL的⼯作⼈员对我说，他们可以对35张表进⾏join
58:26 - 58:28
and somebody else somebody to give you 75
其他⼈告诉我，他们对75张表进⾏join
58.28-58.31
and then splice machine told me they can do 135
Splice machine的⼯作⼈员告诉我，他们能对135张表进⾏join
58:31 - 58:32
snowflakes they can do thousands
Snowflask可以对数千张表进⾏join
58:33 - 58:35
and they have customers that actually do that
他们确实有客户这么⼲
58:38- 58:40
it's hard right yaaa
太难了
59:05 - 59:08
you're ready to deeply into the ordering things
你已经准备好去深⼊有关执⾏顺序⽅⾯的内容了
59.08-59.10
it like again joins are commutative
join的顺序是可换的
59.10-59.12
you can join them in any any possible order you want
你可以以任何可能的顺序对它们进⾏join操作
59:24 - 59:27
you could from you them any way you want ,yes
你可以以任何你想要的顺序进⾏join操作
59:28 - 59:30
now I thought what you're going is
我觉得你的想法是这样的
59.30-59.34
there like I've shown you 2-way join algorithms like 2 for loops
我之前向你们展示过2-way join算法，⽐如：⽤两个for循环进⾏join
59:34 - 59:36
there are multi way joins
我们还有multi-way join
59.36-59.40
where you can say I'm joining R S andT on exactly the same attribute
假设，我根据同⼀个属性来对R、S和T三张表进⾏join
59:40 - 59:42
let me join them exactly the same time
我要在同⼀时间对它们进⾏join
59.42-59.43
that's hard
这很难做到
59.43-59.46
and only the expensive database can do that
只有昂贵的数据库系统才可以做到
59:46 - 59:48
Postgres MySQL don't do this
PostgreSQL和MySQL就不会做这种事情
59.48-59.49
yes
请问


15-04
59:57 - 59:59
what the same wishes that wouldn't be made
01:00:15 - 01:00:17
so this is actually something that's the human accurate
So，实际上这种东⻄叫做human accurate
01:00:17 - 01:00:19
oh I'll cover this maybe next class
我可能会在下节课的时候介绍这个
1.00.19-1.00.22
or I could post something on its own on our Piazza
或者我可能会在Piazza上放出些资料
01:00:23 - 01:00:28
like you would like a human would have to design the database to say
那些设计数据库的⼈会说
1.00.28-1.00.32
here's my fact table, here's my dimension table ,it's not something we automatically
figure out
这是我的fact表和dimension表，这不是我们所⾃动⽣成的东⻄
01:00:32 - 01:00:33
I'm using the term dimension table
这⾥我使⽤了dimension table这个术语
1.00.33-1.00.38
that's the vernacular for describing what that table looks like in a snowflake schema
这是雪花模式中⽤来描述该表样⼦的⼀种⽅⾔
01:00:38 - 01:00:40
you have a fact table in the middle
其中还有⼀个fact table
1.00.40-1.00.42
and then the things around it are the called dimension tables
有个围绕着它转的叫做dimension的 table
01:00:42 - 01:00:44
but there's from the databases perspective
但从数据库⽅⾯来看
1.00.44-1.00.49
unless it's our system design for OLAP queries or analytical queries
除⾮我们的系统是专为OLAP查询或者分析型查询⽽设计的
01:00:50 - 01:00:55
it there's no special designation in SQL to say oh you're a dimension table or oh you're a
fact table
在SQL不存在那种特殊的名称，即⽐如说：这个是dimension table，那个是fact table
01:00:55 - 01:00:56
it's just as humans we use that term
这只是我们⼈类所使⽤的术语
01:00:57 - 01:01:03
yeah I'll send slides from last class or from this advanced class I'll post on Piazza, yes
我会将上节课或者是⾼级课中的幻灯⽚发到Piazza上，请问
01:01:12 - 01:01:15
Yes，so the idea here is like
So，这⾥的思路是
1.01.15-1.01.18
there's like again it's a random map to randomized algorithm
这是⼀个随机化算法
01:01:18 - 01:01:20
so the algorithm says
So，这个算法表示
1.01.20-1.01.21 ！！
this thing has the lowest cost
这种做法的成本最⾼ （知秋注：Andy⼝误，表达为了最低，应该是最⾼才对）
01:01:21 - 01:01:23
I don't know why this is the worst
我不清楚为什么它是最糟糕的
01:01:24 - 01:01:25
but there's something about it it's bad
但它⾥⾯有些东⻄可能有点糟糕
01:01:26 - 01:01:32
so rather than propagating through the next generation ,wherever it's bad you know
deformed genes are
So，我们不会将它传播到下⼀个Generation中，不管它哪⾥不好，你只需知道它⾥⾯有不良基
因
01:01:32 - 01:01:35
right I'm just gonna throw it away
我只需将它丢弃即可
1.01.35-1.01.40
and then so something about this one has the lowest cost that I want to propagate
forward
接着，我想将这个具备最低成本的选项传播下去
01:01:40 - 01:01:44
So that's why I'll let this thing you know get friendly with this guy
So，这就是为什么我想将第⼆个和第三个的特征混合在⼀起的原因
01:01:45 - 01:01:50
Right, and then before you know you got to go to the hospital Wednesday and your
wife's giving birth, right like it's ,alright
就好⽐，我周三要去医院陪我⽼婆⽣孩⼦那样 （知秋注：找成本最低的时间点来做这件事）
01:01:52 - 01:01:52
Yeah
01:02:01 - 01:02:02
your question is
你的问题是
1.02.02-1.02.05
the sorry how is what different
其中有什么区别？
01:02:08 - 01:02:10
how's this different than this
这两个之间有什么区别
1.02.10-1.02.12
well this is doing this is this is right deep that's left-deep
Well，它们⼀个使⽤的是right-deep tree，另⼀个使⽤的是left-deep tree
01:02:15 - 01:02:16
no no
你不能这样想
1.02.16-1.02.19
that's that's the outer table, this this is the inner table
这⾥它是作为outer table，那⾥则是作为inner table
01:02:21 - 01:02:22
so I'm doing hash join
So，这⾥我使⽤了hash join
1.02.22-
I'm building hash table on T
我在T上构建了hash table
01:02:24 - 01:02:26
and I'm probing with T down here
我在下⾯对T中的数据进⾏检测
01:02:27 - 01:02:29
Join matter, the order matters
join很重要，join的顺序也很重要
1.02.29-1.02.29
yes
请问
01:02:38 - 01:02:42
Oh yep yep that should be here
它应该在这⾥
1.02.42-1.02.43
yeah that's mistake, yeah
这是我的失误
01:02:43 - 01:02:49
this is just saying that this thing, this guy is allowed to propagate forward that should be
down there
他说的是，传播过来的这个东⻄应该是放在这下⾯的
1.02.48-1.02.49
I'll fix that, sorry
我会修复这个问题，不好意思
01:02:52 - 01:02:55
okay so let's finish up quickly at nested sub-queries
OK，我们快速结束下关于Nested sub-queries这块的内容
01:02:56 - 01:02:59
so this is something we'll cover more in the advanced class if you take that
So，如果你选了15-721的话，我们会在15-721中对此介绍更多内容
01:02:59 - 01:03:02
but the the main way to think about this is that
但我们思考它的主要⽅式是
1.03.02-1.03.05
the it's not like a join
它和join并不像
1.03.05-1.03.07
because it's a sub-query
因为它是⼀个⼦查询
01:03:07 - 01:03:10
and we want to be smart about how we're actually going to evaluate it
我们想知道实际该如何对它进⾏评估
01:03:11 - 01:03:11
all right
1.03.11-1.03.13
because the dumbest thing we could do
因为我们所能做的最蠢的事情是
1.03.13-1.03.19
it`s just evaluate that inner query the sub query for every single tuple what we're looking
at in the outer query
对我们分别将每⼀个在外部查询中所看到的tuple放置到这个内部查询去做评估
01:03:19 - 01:03:21
right MySQL used to do that and it needs to be awful
MySQL以前是这样做的，这太可怕了
01:03:22 - 01:03:24
so there's two approaches we can do this
So，我们通过两种⽅法做到这⼀点
1.03.24-1.03.26
and the idea here is
这⾥的思路是
1.03.26-1.03.30
some of these we can do these without having to run a cost based search
在不执⾏基于成本进⾏查找的情况下，我们就可以做到这点
01:03:30 - 01:03:32
we can do this in part of our rewriting phase
我们可以在对查询进⾏重写的时候做到这⼀点
01:03:33 - 01:03:34
so the first of that
So，⾸先
1.03.34-1.03.38
we can rewrite the query to to de-correlate and/or flatten it out
我们可以通过重写查询来去掉彼此关联性，即将它扁平化处理
1.03.38-1.03.43
or we can extract the inner query and run that separately as its own query
或者，我们可以将这个内部查询提取出来，将它作为⼀个单独的查询来执⾏
01:03:43 - 01:03:46
and then feed its result into the first query
然后将这个查询的结果传⼊第⼀个查询
01:03:47 - 01:03:48
so let's look a more complicated example here
So，我们来看个更为复杂的例⼦
01:03:48 - 01:03:55
so this query here we're trying to get all of the say we have a table keeps track of sailors
So，在这个查询中，我们想去获取sailors表中的name数据
01:03:55 - 01:04:01
so this is from when we used to use the old textbook from Wisconsin in Wisconsin a
sailing club
So，这是我们⽼教科书上的⼀个例⼦，假设威斯康⾟有⼀家帆船俱乐部
1.04.00-1.04.01
that's what this is from
这是这个例⼦的出处
01:04:01 - 01:04:07
so basically we're trying to get all the sailors ,the name of the sailors where they have
reserved a boat on it on a given date
So，简单来讲，我们试着通过这个查询拿到在给定⽇期预订船只的那些⽔⼿的名字
01:04:09 - 01:04:11
so we had this inner query here
So，这⾥我们有⼀个inner query
1.04.11-1.04.20
well now we see we're referencing from our inner query, a record from the outer query
Well，这⾥我们可以看到，我们引⽤了我们inner query中的东⻄，以及outer query中的⼀条记
录
01:04:20 - 01:04:21
so in that case here
So，在这个例⼦中
1.04.21-1.04.24
we know that they're correlated
我们知道这两个查询是相关联的
01:04:24 - 01:04:27
right because they're referencing each other,
因为它们彼此间互相引⽤
so we need to rewrite this as a join
So，我们需要将它重写为join
01:04:29 - 01:04:30
so again we can do this in rewriting phase
So，再说⼀遍，我们可以在重写阶段进⾏这⼀步操作
1.04.30-1.04.35
we can recognize that we have this pedak up here ,and we can rewrite it like this
我们意识到，我们可以将上⾯这部分重写为下⾯这个样⼦
01:04:35 - 01:04:39
and then we just do our cost-based search to figure out whether the right-join order is
as before
接着，我们通过cost-based search来看看它的join顺序和之前是否⼀样
01:04:40 - 01:04:41
let's look more complicated example
我们来看个更为复杂的例⼦
1.04.41-1.04.43
so this one here
So，在这个例⼦中
1.04.43-1.04.49
we're trying to find for every single sailor, free sail with the highest rating ,overall our
sailors get the two reservations for red boats
我们试着找到在所有⽔⼿中评分最⾼的那个⽔⼿，同时它订了红⾊的船
01:04:49 - 01:04:53
and then find the sail ID with the earliest date in which the sailors reservation was on the
red boat
接着，找到最早订红船的那个⽔⼿的id
01:04:53 - 01:04.55
so we had the main thing is that
So，这⾥我们主要做的事情是
1.04.55-1.04.56
we had this inner query here
这⾥我们有⼀个inner query
1.04.56-1.05.03
where we're just trying to get the max sailor rating or ranking for all sailors
通过它，我们要试着找到⽔⼿所获得的最⼤评分是什么
01:05:03 - 01:05:04
So worst case scenario
So，最糟糕的情况是
1.05.04-1.05.07
as we do this lookup here we're rating equals ,and then the center query,
但我们在这⾥进⾏查找的时候（S.rating=(SELECT MAX(S2.rating) FROM sailors S2)）
1.05.07-1.05.11
for every single tuple on the outer table on the sailor table
对于outer table（即sailor表）上的每个tuple来说
01:05:11 - 01:05:13
We just rerun this thing over and over again
我们只需不断反复执⾏这些逻辑即可（知秋注：针对每⼀个tuple都要重新查找⼀遍）
01:05:14 - 01:05:16
but that would be slow that that would suck
但这速度很慢，也很操蛋
01:05:16 - 01:05:18
and so what we can do is
So，我们所能做的是
1.05.18-1.05.25
then extract that out or rewrite it to so that we don't have to have that you know we run
that every single time
将它提取出来，或者对其进⾏重写，这样的话，我们就⽆须每次都执⾏⼀遍了
01:05:26 - 01:05:29
so the first approach could be just take this out
So，第⼀种⽅案就是将这个拿出来
01:05:29 - 01:05:34
this nested block run it up here, store it in some kind of variable
我们将这个内嵌区块拿出来，然后保存为某个变量
1.05.34-1.05.38
and then substitute that value down below
接着，⽤这个变量去替换这个东⻄
01:05:38 - 01:05:40
So the main thing I'm trying to show here is that,
So，这⾥我试着要展示的主要东⻄是
1.05.40-1.05.45
the query optimizer doesn't necessarily have to take a single query, and only treat it as a
single query
查询优化器不⼀定要将它所拿到的这个单个查询就视作单个查询来进⾏处理
01:05:46 - 01:05:52
We could rewrite it and execute them you know one after another in order to fill in the
values that we actually need
我们可以对它进⾏重写，并挨个执⾏它们，以此来填充我们实际需要的值
01:05:54 - 01:05:57
And this is something that the more sophisticated systems can do
这是⼀些更为复杂的系统才能做的事情
01:05:58 - 01:06:01
all right this is saying this is the outer block and that's the inner block up above
这个是outer block，那个是inner block
01:06:02- 01:06:02
okay
01:06:05 - 01:06:05
all right
1.06.05-1.06.12
so the that's the ball that's this is what we can talk about for a query optimization for
the rest of the semester
这就是我们在这学期剩下的时间⾥所能讨论的关于查询优化器⽅⾯的内容
01:06:12 - 01:06:12
as I said
正如我说的
1.06.12-1.06.14
this is something that I'm really interested in
这是我⾮常感兴趣的⼀种东⻄
1.06.14-1.06.17
and I plan to cover more in the advanced class
我计划在⾼级课中对此介绍更多东⻄
1.06.17-1.06.20
is this there's something during cheating getting involved in
会涉及更多东⻄
01:06:20 - 01:06:21
and when I get started on this
当我开始讲这块内容的时候
1.06.21-1.06.24
you know this is you contact me
你可以来联系我
1.06.24-1.06.28
because this would guarantee a seat in the advanced class as well
因为这能保证我会在讲15-721这块⼉时候给你留个位⼦
01:06:28 - 01:06:29
So we talk about how to selectivity estimations
So，我们讨论了该如何对选择率进⾏估测
1.06.29-1.06.32
we talked about the major assumptions we made about the uniformity independence
我们讨论了关于uniformity（均匀分布）、independence这块我们所做的主要假设
01:06:33 - 01:06:34
and the problems with this
对于此处所出现的问题
1.06.34-1.06.37
we talked about how to do dynamic programming for did you join orderings
我们讨论了如何通过动态编程来解决join执⾏顺序⽅⾯的问题
01:06:38 - 01:06:40
and then we we can do simple techniques to rewrite nested queries
接着，我们可以使⽤简单的技术来重写内嵌查询
01:06:42 - 01:06:44
all right any questions about any of this
All right，对此，你们有任何问题吗？
01:06:45 - 01:06:50
so again every single time you fire off a query in SQLite or Postgres or MySQL whatever
database you're using
So，不管你使⽤的数据库系统是什么（⽐如：SQLite、PostgreSQL或者MySQL之类的），当
你执⾏⼀次查询的时候
01:06:51 - 01:06:52
it's going through all of this
我们就会经历这⼀整个过程
1.06.52-1.06.57
which is amazing how fast it actually is
这条查询的执⾏速度令⼈⾮常惊叹
01:06:55 - 01:06:57
I even though it's a really complex problem
即使查询优化是⼀个很复杂的问题
01:06:59 - 01:07:01
All right so next class I will be here
So，下节课，我会在这⾥
01:07:03 - 01:07:05
And we're gonna start talking about concurrency control
我们会开始讨论并发控制
01:07:05 - 01:07:08
so this is the second hardest thing in database systems
So，这是数据库系统中第⼆难的东⻄
01:07:08 - 01:07:10
this is also something if you're really good at，you can also get a job
如果你擅⻓这个东⻄，那么你也能获得⼀份⼯作
01:07:12 - 01:07:18
this will cover it so we're on Monday or sorry and Wednesday this week we'll cover the
basics of control theory
So，我们会在这周三介绍下并发控制理论的⼀些基础知识
01:07:19 - 01:07:20
again Andy theory not real theory
再说⼀遍，我的理论不⼀定是正确的
1.07.20-1.07.24
and then Monday next week and Wednesday next week
接着，在下周⼀和下周三的时候
01:07:24 - 01:07:27
I'll have the PG students cover two-phase locking and timestamp ordering
我会让研究⽣来给你们介绍两阶段锁并发控制和以时间戳为顺序的并发控制
1.07.27-1.07.30
because those would be the two things you'll need for the the fourth homework
assignment, okay
因为你们会在Homework 4中⽤到这两个东⻄
01:07:32 - 01:07:38
okay but I was gonna do extra credit
Ok，我来讲下额外分相关的事情
01:07:41 - 01:07:43
hmm hold up let me get the slides
让我找下幻灯⽚
01:07:44 - 01:07:47
so releasing the extra credit assignment here today
So，我们来讲下你们怎么去获取额外分数
01:07:48 - 01:07:52
so you can earn 10% extra credit for your final grade
So，你可以为你的期末成绩多拿10%的分数
01:07:52 - 01:07:55
right not for the exams not for the project， for the final grade of an entire semester
这10%并不是考试和project⽅⾯的，⽽是给你这⻔课成绩多加10%的分数
01:07:56 - 01:07:59
if you write a article about a database management system
如果你写了⼀篇关于某个DBMS的⽂章
01:08:00 - 01:08:05
and so you can pick any database instance when you want ,other than the ones that
students have written about before
So，你可以选任何你想选的数据库系统，⽽不是学⽣以前写过相关⽂章的那些数据库
01:08:06 - 01:08:07
the way you think about this is
你可以这样想
1.08.07-1.08.09
you're writing like in the encyclopedia article
你可以以百科⽂章的⽅式进⾏编写
01:08:09 - 01:08:13
where is that a writing free form text like you would in Wikipedia
即按照Wikipedia的⽅式去写这些⽂章
01:08:13 - 01:08:17
it's set up so that you can specify exactly how different parts of the system are
implemented,
So，你可以具体写下该系统的不同部分是如何实现的
1.08.17-1.08.20
there's options to choose like how it does concurrency control ,what kind of indexes it
has
你可以选⼀些主题来写，⽐如，它是如何进⾏并发控制，它使⽤了什么索引
01:08:21 - 01:08:25
and then you can write information in like a description of what actually it actually does
接着，你可以对它做了哪些事情写⼀份描述信息
01:08:26 - 01:08:29
so for this one you have to provide citations for everything you do
So，对此，你得为你写的所有东⻄提供引证
01:08:29 - 01:08:32
but again everything wiII be explained on the website
但我讲的所有这些，⽹站上都有解释
01:08:32 - 01:08:37
so I've created this website called the database of databases dbdb.io
So，我创建了⼀个数据库相关的⽹站，⽹址是dbdb.io
01:08:37 - 01:08:38
I wanted to DB2 io
我本打算使⽤db2.io作为域名来使⽤
1.08.38-1.08.40
but then that's asking for a lawsuit from IBM
但这这样做，我就会收到IBM给我的律师函警告
1.08.40-1.08.41
so we didn't do that
So，我们没有这么做
01:08:42 - 01:08:44
so the way it basically works is that
So，简单来讲，该⽹站的⼯作⽅式是
1.08.44-1.08.49
has about different ways to categorize different database systems to find what you're
looking for
它通过不同的⽅式来给不同的数据库系统进⾏分类，以此你可以找到你要找的那个数据库系统
01:08:49 - 01:08:50
so in this case here
So，在这个例⼦中
1.08.50-1.08.52
these are all the database systems that are implemented in rust
这⾥我所展示的是由Rust所实现的所有数据库系统
01:08:52 - 01:08:56
and then there's again there's an article here at the describes exactly how everything
works,and there's citations for everything
这⾥⾯有⼀篇描述它⼯作原理的⽂章，以及⽂章中出现的引⽂
01:08:57 - 01:08.57
Okay
1.08.57-1.09.05
so I will post a sign-up sheet on Piazza for you to spell to select what database system
you want to use
So，我会在Piazza上贴⼀份登记表，我想看看你们会去使⽤哪些数据库系统
01:09:05 - 01:09:07
again,people this is the second year we've done this
这是我们第⼆年这样做了
1.09.07-1.09.12
so they'll be not every single system will active you available to you
So，我并不会在这上⾯将所有的数据库系统都给你们列出来
01:09:12 - 01:09:17
but there's enough of them out there that everyone shouldn't have a problem to actually
pick what you want
但我还是会给出你们⾜够的选择来让你们选出你们想选的那些数据库系统
01:09:18 - 01:09:19
so to be first come first serve
So，先到先得
1.09.19-1.09.25
so when I post it online when I post the sign-up sheet online, I will announce it on Piazza
So，当我开放注册的时候，我会在Piazza上宣布这个事情
01:09:25 - 01:09:31
And then whoever gets there first you know get to whatever system， a lot have been
approved
先注册的⼈就可以先选⾃⼰想写的数据库系统，其中很多系统都已经被核查过了
01:09:31 - 01:09:36
so the way think about this that if you pick a system that's widely known and used like
Oracle
So，如果你选了⼀个⼴为⼈知的系统，⽐如Oracle
01:09:36 - 01:09:39
Then there's a lot of documentation, there's a lot of information about actually how it
works
那么你就能找到关于它的很多相关⽂档以及它⼯作原理⽅⾯的相关信息
1.09.39-1.09.42
so you expect to write something that's very comprehensive with a lot of citations
So，我希望你能通过引⽤⼤量的⽂章来写出⼀些⾮常全⾯的东⻄
01:09:43 - 01:09:44
if you pick an obscure system
如果你选了⼀个不常⻅的数据库系统
01:09:45 - 01:09:47
then this might be problematic
那这就可能会有点问题
1.09.47-1.09.49
because it may not be as much documentation available
因为它可能并没有那么多⽂档供你阅读
01:09:50 - 01:09:51
so in that case
So，在这种情况下
1.09.51-1.09.54
I can either get you in touch with the people that actually implementing it, and they can
provide the information
我可以为你提供和实现这个DBMS的⼈有接触的机会，他们可以为你提供相关信息
01:09:54 - 01:09:58
I've had previous students post on the message boards or message people on Twitter
我之前有学⽣就是在推特上和这些⼈进⾏私聊
01:09:58 - 01:10:01
They askin from information how this assumed actually works
他们去问这些开发⼈员这些DBMS的⼯作原理之类的问题
01:10:01 - 01:10:05
one student last year picked a system that only existed for three years in the 1980s
去年有个学⽣选了⼀个1980年代只存在了3年的数据库系统
1.10.05-1.10.07
and then she reached out to the guy that actually wrote it
然后，她找到了编写这个数据库系统的⼈
1.10.07-1.10.08
because he was MIT alum
因为这个⼈是MIT的校友
01:10:09 - 01:10:12
right,it's actually kinda pressable people try to get get this information
对于获取这种DBMS的相关信息，我们还是很有压⼒的
01:10:13 - 01:10:17
and so what you get is sign up and get an account ,and it'll be a page like this you can
go edit
So，你们要做的就是去注册账号，然后你们会有这样⼀个编辑⻚⾯
01:10:18 - 01:10:19
again you can see that
你们可以看到
1.10.19-1.10.20
it's not free form text for everything
这⾥的⽂本并不是所有都能进⾏⾃由编辑
1.10.20-1.10.24
you can select exactly how you know different parts of the system or actually implement
it
你可以去选择系统是如何实现不同部分功能作为课题
01:10:25 - 01:10:28
so it may be Andy what database system I am I gonna pick
So，你们可能会这样问我：Andy，我该选哪个数据库系统
01:10:29 - 01:10:32
right and I'll just say that there's enough of them there
我想说的是，我给你们提供了⾜够多的选项来供你们选择
1.10.32-1.10.35
that you should have no problem finding one that you want
这样你们应该能找到你们想选的那个数据库系统
01:10:35 - 01:10:41
so I think I am currently I am currently aware of 636 different database systems
So，我⽬前知道有636个不同的数据库系统
01:10:41 - 01:10:45
So distributed systems ,embedded systems, systems written in different languages
⽐如：分布式数据库系统，嵌⼊式数据库系统，这些数据库系统由不同的语⾔进⾏编写
1.10.46-1.10.48
going back to the 1968
在1968年的时候
01:10:48 - 01:10:50
we have 165
我们有165个数据库系统
01:10:51 - 01:10:56
so again you should have no problem finding a database systems that picks whatever
your real interest is
So，你们应该能在这些选项中找到你们感兴趣的数据库系统
1.10.56-1.10.57
okay
01:10:57 - 01:10:57
yes
请问
01:10:59 - 01:11:02
what's up wait some giggles yeah yeah I know
01:11:04 - 01:11:05
it's not real yeah
这说的并不正确
1.11.05-1.11.09
this is actually it's not even all this is this is still a subset
实际上，这并不是所有的数据库系统，这只是其中⼀部分
1.11.09-1.11.10
this is probably me like 400 of them
这可能只是其中400个数据库系统
1.11.10-1.11.13
there's another 230 that I know about
我还知道其他230个数据库系统
01:11:13 - 01:11:15
okay so how can you solve the system you want to pick
So，你们该如何选择数据库系统呢
01:11:16 - 01:11:21
you pick the country of origin, if you care about you know database is written in Brazil or
China or India
你可以根据国家来选，⽐如你可以选巴⻄、中国、印度这些国家的数据库系统
01:11:21 - 01:11:24
we have those right based on popularity
我们也可以基于流⾏度来选择
01:11:25 - 01:11:28
so I know I keep track of what pages get to view the most
So，我跟踪了那些访问数量最多的⻚⾯
01:11:28 - 01:11:30
right I can tell you which one you put you should watch you look at
我可以告诉你，你应该去看哪个（流⾏的）数据库系统
1.11.30-1.11.37
there's this one in France written in Java or JavaScript ,whatever reason Google picks us
picks us up, we get a lot of traffic for that
⽐如法国有⼀个由JavaScript编写的数据库系统，不知道出于什么原因，有很多⼈访问这个数据
库所对应的⻚⾯
01:11:37 - 01:11:43
whatever programming language your isn't into then, if you like rust you like go, you're
like C, we have a database in written in bash
你们也可以根据编程语⾔来选择数据库系统，⽐如Rust、Go、C或者Bash
01:11:43 - 01:11:44
Right
1.11.44-1.11.46
like whatever you want, we have something for that
不管你想要什么⽅⾯的数据库系统，我们都能为你提供符合你要求的数据库系统
1.11.46-1.11.53
you want to distributed databases embedded databases single node databases, we have
those Disk vs memory ， row versus column store， commercial versus open source or
enterprise
不管是分布式数据库系统，嵌⼊式数据库系统，单节点数据库系统，磁盘型，内存型，⾏存储，
列存储，或者商⽤数据库系统和开源数据库系统，我们都有记录
01:11:54 - 01:11:56
we have it we have we have it all
我们有各种各样的数据库系统
01:11:56 - 01:11.56
if we have time
如果我们有时间的话
1.11.56-1.11.59
we can look at the leaderboard and see which which one systems actually appear the
most
我们可以去看下leaderboard上哪个数据库系统才是最受欢迎的
1.11.59-1.12.01
which you know what programming language which country
以及哪种语⾔编写的数据库和哪个国家的数据库最受欢迎
01:12:02 - 01:12:02
all right
1.12.02-1.12.04
I got to say this
我要说下这个
1.12.04-1.12.06
because Lea shared this didn't happen
01:12:06 - 01:12:08
So do not plagiarize
So，不要抄袭
01:12:08 - 01:12:11
so there'll be two parts you split it in two parts
So，这⾥有两部分要讲
1.12.11-1.12.14
the first part will be like a checkpoint maybe after after Thanksgiving
⾸先要讲的是，我们可能会在感恩节后对你们的东⻄进⾏检查
1.12.14-1.12.20
well we'll look over it and give you feedback whether you're on the right track to you
know if you're doing the right thing
Well，我们会去帮你看⼀下，看看你有没有⾛错路，做的东⻄对不对
01:12:20 - 01:12:23
And then there'll be the final submission during finals week and that's where you get your
final grade
接着，在最后⼀周的时候，你们得最后提交⼀下你们的东⻄，然后，你们就知道你们的分数是什
么了
01:12:23 - 01:12:26
for both of those submissions do not plagiarize
对于这两个作业，你们不要抄袭
01:12:26 - 01:12:29
last year we had somebody cotton pasted from Wikipedia
去年我们有个学⽣就是从维基百科上复制粘贴
01:12:29 - 01:12:30
and they put that in there
然后他们将⽂本复制在上⾯
1.12.30-1.12.31
and the reason why we caught them is,
我们逮到他们抄袭的原因是
1.12.31-1.12.35
because they didn't go delete all the brackets you know for the citations
他们并没有删除所有引⽂中的括号
01:12:35 - 01:12:37
so we had to go reporting to Warner Hall
So，我们举报了他们的抄袭⾏为
01:12:37 - 01:12:40
it was very very messy, okay
这很糟糕
01:12:40 - 01:12:45
so do not plagiarize, do not copy anything, do not copy images from the internet
So，不要抄袭，不要复制任何东⻄，也不要从⽹上复制任何图⽚
1.12.45-1.12.51
don't assume that it's Someone describes the system that their expert they know better
than you
不要觉得别⼈是专家，他们对某个数据库系统所描述的内容要⽐你写得好
1.12.48-1.12.51
and therefore you feel wrong rewriting it
因此，如果你觉得他写得有问题，你要对它进⾏重写
01:12:51 - 01:12:52
I don't care
我不在意这个
1.12.52-1.12.52
do not copy anything
不要复制任何东⻄
1.12.52-1.12.55
because your name's gonna go in on this this this is public on the Internet
因为这些东⻄在⽹上都是公开的
01:12:56 - 01:12.58
so you know if you plagiarize
So，如果你抄袭
1.12.58-1.12.59
we have to go report you, okay
那我们就得举报你了
1.12.59-1.13.00
yes
请问
01:13:02 - 01:13:03
the question is
她的问题是
1.13.03-1.13.08
if you cited image I've rather not you can get by without images
你可以不⽤放图
1.13.08-1.13.09
yes
请问
01:13:19 - 01:13:21
I wouldn't worry too much my images yeah
我对图⽚并不是很关⼼
01:13:23 - 01:13:23
yes
请问
01:13:31 - 01:13:35
so it's a way to work is since students I've done this in the past
SO，就我过去教过的学⽣⽽⾔
1.13.35-1.13.38
I will they're not they don't want all had the same quality
他们所做的质量并不相同
01:13:38 - 01:13:40
so I will provide a list the ones you should not pick from
So，我会给你们提供⼀个列表，你们应该避开上⾯列出的数据库系统
01:13:45 - 01:13:51
so yeah if I got guys for this you should pick the one you should always assume the
latest version
你们选的数据库系统版本应该是最新版
01:13:52 - 01:13:55
right so if they did something like five years ago and got fixed
So，如果他们修复了他们数据库系统中5年前的bug
1.13.55-1.13.57
I don't care about five years ago just describe what it does now
我不在意五年前发⽣的事情，你只需要描述它现在是怎么样的就可以了
01:13:57 - 01:13:59
you can mention they used to do in a certain way
你可以提下他们过去是怎么做的
01:13:59 - 01:14:03
but I would focus if you just focus on what how it exists now, yes
但你要将你的重点放在你所研究的数据库当前的情况即可
01:14:07 - 01:14:10
I'll be dead or you'll be gone like don't worry about don't worry about it ,yeah
不要在意那个
01:14:11 - 01:14:16
actually we've had some companies reached out to us, and we allow them to edit the
page
实际上，有些公司和我们进⾏了接触，我们允许它们去编辑这些⻚⾯
01:14:16 - 01:14:18
but again it's like I'm like curating it,
但我喜欢对它进⾏策划
1.14.18-1.14.21
I wanted them to avoid like marketing
我不想让他们进⾏商业推⼴之类的事情
1.14.21-1.14.22
like we're the fastest database
我们喜欢速度最快的数据库
1.14.22-1.14.24
like all that crap we keep it very scientific, yes
我们会以⾮常科学的⽅式来对它们进⾏检测，请问
01:14:33 - 01:14:34
keep it on case by case basis
具体情况具体分析
1.14.34-1.14.36
there any system, you're in particular tooth in your mouth
01:14:36 - 01:14:39
because I'm the Mongol one's actually pretty good already
因为Mongo其实很优秀
01:14:39 - 01:14:43
okay um, so if you gotta go you can go,
Ok，如果你有事要⾛，那你可以先⾛
1.14.43-1.14.45
but let's we can quickly look at the website and
但我们来快速看下⼀个⽹站
01:14:47 - 01:14:51
All right so what date what country has has created the most database systems
So，哪个国家的数据库系统的数量最多呢？
01:14:52 - 01:14:53
USA, who's number two
美国，那哪个国家拥有的数据库数量是第⼆多的呢？
01:14:57 - 01:14:58
he said Russia
他说俄罗斯
01:14:59 - 01:14:59
It`s China
是中国吗？
01:15:06 - 01:15:07
France and India ,okay
法国和印度？
01:15:10 - 01:15:12
all right so this the website
So，来看下这个⽹站
01:15:12 - 01:15:14
so we go to the leader boards
So，我们来看下leaderboard
1.15.14-1.15.16
actually let's do that ,so like again you can click on any database system
我们来随便看个数据库系统
01:15:19 - 01:15:20
and then over here
看下这⾥
1.15.20-1.15.21
like it has the country of origin
它上⾯有原产国这个选项
1.15.21-1.15.22
so somebody said China
So，有⼈说来看下中国有哪些数据库系统
01:15:22 - 01:15:29
so to tell you how many do since China has, so China has 28
So，点击这个CN，它会告诉你中国有多少个数据库系统，中国有28个
01:15:30 - 01:15:41
US has 300
美国有300多个数据库系统
01:15:46 - 01:15:52
somebody said what was that what said India what is with the Indian code in
有⼈想看印度有多少个数据库系统
01:15:54 - 01:15:54
5
5个
01:15:59 - 01:16:03
Russia ru ,21
俄罗斯则有21个数据库系统
01:16:05 - 01:16:09
you're missing it Germany 44
德国44个数据库系统
01:16:10 - 01:16:10
right
01:16:13 - 01:16:13
France is less
法国的数据库系统要少⼀点
01:16:14 - 01:16:17
all right so again like I can click on this
So，我点下这个链接
01:16:17 - 01:16:20
and then I can click like programming language is to implement it
接着，我可以看下实现该数据库系统的编程语⾔
01:16:20 - 01:16:22
so this one's written in C++
它是C++编写的
01:16:22 - 01:16:24
right to 101
⼀共有101个数据库系统是由C++编写的
01:16:25 - 01:16:28
what is probably most common programming language used for database system
最常⽤来数据库系统的编程语⾔是什么呢？
01:16:29 - 01:16:32
everyone said C++ C
所有⼈都说是C++和C
01:16:33 - 01:16:35
The combination C/C++ yes
没错，就是C和C++
01:16:38 - 01:16:39
Java
我们来看下Java
1.16.39-1.16.44
,right so we go to write this leaderboard thing here it says a breakdown of right
So，我们来看下leaderboard
01:16:44 - 01:16:46
so here's the breakdown of the countries
So，这是每个国家拥有的数据库系统数量
01:16:46 - 01:16:48
right Germany is number two
德国的数据库系统数量是第⼆多的
01:16:49 - 01:16:51
Java the most common programming language
Java是编写数据库系统时最常⽤的编程语⾔
1.16.51-1.16.53
but again if you combine C++ and and C
但如果你将C++和C的结果放在⼀起
01:16:54 - 01:16:55
all right then it passes it
那么，它们实现的数据库数量就会超过Java
1.16.55-1.17.00
and then also we keep track of like what database systems use other database systems
我们也跟踪了哪些数据库系统使⽤的是其他数据库系统
01:17:00 - 01:17:01
so these are these embedded databases
So，这⾥有些嵌⼊式数据库系统
1.17.01-1.17.07
there's like RocksDB, a bunch of systems like CockroachDB use RocksDB as the
internal storage
⽐如CockroachDB就使⽤了RocksDB作为内部存储
01:17:07 - 01:17:09
And then they have a go thing on top of it
CockroachDB是建⽴在RocksDB之上来做些事情的
01:17:09 - 01:17:14
there's also systems that have forked other systems and use that as the implementation
有些数据库系统fork了其他数据库系统来作为实现使⽤
01:17:14 - 01:17:20
so there's a lot of companies that have forked Postgres ,and use that and as well as
MySQL
很多公司fork并使⽤了PostgreSQL，MySQL也是如此
01:17:21 - 01:17:22
there's the most two common ones
这是最常⻅的两个例⼦
01:17:23 - 01:17:26
so again you see why are we trying to keep track of all these things right
So，我们为什么要试着去跟踪这些东⻄呢？
01:17:28 - 01:17:33
and so I'm aware of in total as I said 630 whatever
正如我说的，我记得总共有630多个数据库系统
01:17:33 - 01:17:35
um so if you find a system
So，如果你发现了⼀个数据库系统
1.17.35-1.17.39
I think this would be super helpful if you're you know if you're from India or China or
whatever country you come from
我觉得这会超级有⽤，不管你是来⾃哪个国家，中国也好，印度也罢
01:17:39 - 01:17:44
and there's a database system that's written in that language that I don't know about, let
me know, right
如果你发现了⼀个我所不知道的以某种语⾔所编写的数据库系统，那么请告诉我
01:17:44 - 01:17:45
because I want to know
因为我想要知道
1.17.45-1.17.47
like this thing just goes on forever and ever
因为这件事情永⽆⽌境
01:17:47 - 01:17:50
I there's there's tons ,oh okay
有太多需要知道的
01:17:50 - 01:17:55
so I'll post is the Piazza today, project 3 will be announced either today or tomorrow
So，我会在Piazza上贴出这个，我会在今天或者明天宣布Project 3的相关信息
01:17:56 - 01:18:00
and then well you know better we'll get a grade script set up for that
我们会设置⼀个评分脚本
01:18:00 - 01:18:01
and then we'll have class on Wednesday,
我们在周三会有⼀堂课
1.18.01-1.18.07
and then when next week starting Monday next week will be my grad students
下周⼀开始是由我的研究⽣给你们上课
01:18:07 - 01:18:10
I'll have office hours immediately after this if you want to see your midterm exam
如果你们想看下你们的期中考试成绩，那么等会来我办公室
01:18:10 - 01:18:13
but I won't be around later in the week okay
但我这周晚些时候应该不在学校
01:18:13 - 01:18:15
Okay ,guys see you thank you
Ok，回头再⻅

