10-01
00:15 - 00:16
Oh guys let's start it
好了，我们开始吧
00:17 - 00:22
What the president again ,Thank You DJ drop tables or keeps keeping everything for us
00:24 - 00:27
Alright, so before we get into today's lecture
So，在我们今天上课之前
0.27-0.32
just go through real quickly what's on the schedule for you guys coming up in the next
two weeks
我来快速讲下你们接下来两周的规划
00:32 - 00:34
So homework #3 is out today
So，homework 3会在今天放出来
0.34-0.37
it should be on the website well
你们应该能在⽹站上看到这条信息了
0.37-0.40
we'll set up great scripts so you can submit later today
我们会设置好脚本，这样你们今天就可以提交了
00:40 - 00:42
And so that'll be due next week on Wednesday Oct 9th
So，它会在下周三截⽌
00:44 - 00:50
In two weeks we will have the the midterm exam, project #2 going out today
在这两周的时间⾥⾯，我们会有期中考试，Project 2今天也会放出来
0.50-0.53
so I'll talk about a little I'll talk about that at the end of this lecture
So，我会在这节课结束的时候稍微说下这⽅⾯的事情
00:54 - 00.55
But that'll be due after the midterm
但这是在期中考试后才截⽌的东⻄
0.55-1.01
the midterm will be on Wednesday Oct 16th in this room at the normal class time
期中考试会在10⽉16号，也就是下下周三，这个房间，这个时间点举⾏
1.01-1.03
it'll be you know an hour and 20 minute exam
考试时⻓1⼩时20分钟
01:04 - 01:08
So this will cover everything up to and including next week's lectures
So，考试内容包括了我们⽬前已经学的东⻄，以及下周的课堂内容
01:09 - 01:14
So on Wednesday Oct 9th the midterm will cover that lecture and everything prior to that
So，期中考试的范围会包括10⽉9号的课堂内容，以及之前所教的⼀切
01:14 - 01:14
Ok
01:16 - 01:18
Any questions about any of these expectations
对于这些计划你们有任何问题吗？
01:19 - 01:22
So homework #3 knock that out before the midterm
So。homework 3要在期中考试前做完
01:23 - 01:25
And then this thing project #2
接着是project 2
1.25-1.29
it'll encompass some of the material that we talked about that'll be relevant to the
midterm,
它包含了⼀些我们之前讨论过的内容。这些内容会和期中考试相关
1.29-1.33
but it won't we do officially until after the midterm
Project 2我们会在期中考试后才开始正式进⾏
01:33 - 01:36
So you space space things out for you guys ,okay
So，你们就有⾜够的时间去搞这个project 2
01:38 - 01:47
Okay, so where we're at now in the semester is that we've again going up to this
architecture layers, we know how to store things on disk
So，我们来看下这张架构图，在这个学期中，我们已经知道该如何将东⻄保存在磁盘上
01:48 - 01:52
In pages we know how to then copy them into memory into our buffer pool manager as
needed
我们也知道该如何根据需要将page复制到内存中的buffer pool管理器中
1.52-1.54
then we talked about how we actually access them
接着，我们⼜讨论了实际该如何访问它们
01:55 - 01:58
So we can build indexes on top of them or we can do sequential scans
So，我们可以在它们之上构建索引，或者是进⾏循序扫描
01:58 - 02:03
And so now where we're at is up above, now we actually want to start executing queries
So，现在我们要来学习它之上的东⻄，即开始学执⾏查询这块的内容
02:04 - 02:08
We actually want to be able to take SQL queries, generate query plans for them
实际上，我们想去能够拿到SQL查询，并为它们⽣成查询计划
02:08 - 02:13
And then have them use the access methods to get access to the data that we need,
okay
然后让它们使⽤access methods去获取我们需要的数据
02:14 - 02:16
So for the next two weeks
So，在接下来的两周中
2.16-2.21
we're going to first talk about how what how we actually implement the algorithms for
our operators and queries
我们⾸先会去说实际如何实现operator和查询的算法
02:21 - 02:24
Then we'll talk about different ways to process queries themselves
接着，我们会去讨论处理查询的不同⽅法
2.24-2.28
like it's the how to move data from one operator to the next
⽐如，我们该如何将⼀个operator所得到的数据移动到另⼀个operator中
02:28 - 02:32
And then we'll talk about also to the more system architecture
接着，我们还会讨论更多关于系统架构⽅⾯的东⻄
2.32-2.35**************
was the runtime architecture of the system for threads or processes
⽐如线程或进程的系统运行时架构
2.35-2.39
and how do we organize them to run you know queries in parallel
以及我们该如何组织它们来进⾏并⾏查询
02:39 - 02:44
So I'm not gonna go into detail what a query plan looks like just yet
此处我并不会去讲查询计划是⻓啥样之类的细节
02:44 - 02:46
I just want to show you what one potentially looks like
我今天只是想向你们展示它⼤概的样⼦是什么
2.46-2.51
just to frame that a conversation where we're going today and the next class
以及跟你们说下今天以及下节课我们所要谈论的东⻄
02:51 - 02:55
And then we'll go into way more detail about what query plan and execution looks like
next week
然后，在下周的时候，我们会对查询计划以及执⾏进⾏深⼊了解
02:55 - 02:58
And then when we talk about query optimization query planning further
此外，我们还会讨论对查询计划进⾏查询优化
02:58 - 03:07
So a query plan is essentially the the instructions or the high-level direction of how the
database system is going to execute a given query
So，简单来讲，查询计划指的是指令，或者是数据库系统该如何执⾏⼀个给定查询的⽅式
03:08 - 03:15
And we're gonna organize the query plan into an in a tree tree structure or an acyclic
directed graph
我们会将查询计划整理为⼀个树形结构或者是⼀个有向⽆环图
03:15 - 03:19
So we take the SQL query like this or doing a join with a filter on table A and B
So，我们的SQL语句如图所示，这⾥我们对table A和B中的数据进⾏过滤查询
03:20 - 03:22
We can represent it as a query plan like this
我们可以⽤图上这种查询计划的⽅式来对它进⾏表示
我们可以将⼀个查询计划按照图上这种⽅式来表示
3.22-3.26
where at the leaf nodes ,we're doing our scans or accessing the the tables
在这个树中的叶⼦结点上，我们会对表进⾏扫描或者访问
03:27 - 03:31 (03:29 up处有电⾳)
And then we were moving tuples up to the next operator to do whatever it wants to do
然后，我们将tuple上移到下⼀个operator处，以此来让该operator想做的事（知秋注：注意看
图，将得到的结果上移并交给对应的操作，其实就是将结果作为参数传递给对应的操作）
03:32 - 03:33
So in this case here we scan A
So，在这个例⼦中我们对table A进⾏扫描
3.33-3.37
and since we don't have any filter on it，we just feed it right into our join operator
由于我们并不需要对table A中的tuple进⾏过滤，所以我们直接将扫描结果传给join operator即
可
03:38 - 03:39
And then for the scan on B
接着，我们来扫描table B
3.39-3.44
well first apply the filter to limit out any values less than 100
Well，⾸先我们对B中的结果进⾏过滤，排除所有⼩于100的数据
03:44 - 03:46
And then we feed that into our join operator
然后，我们将它传给我们的join operator
03:46 - 03:50
and then this now produces some output that's then fed into the projection operator
然后，join operator⼜⽣成了某些输出结果，接着将结果传⼊projection operator
03:51 - 03:56
So what I'm showing here is what what we call it as a logical plan
So，我这⾥所展示的叫做logical plan（逻辑计划）
03:57 - 04:03
meaning I'm not saying anything about how we're what albs are we're gonna use to
implement all these different operators
意思就是，我不会去说任何关于怎么去实现这些不同operator的事情
04:03 - 04:05
I'm just saying this is at a high level what I want to do
我只会站在⼀个⾼级层⾯来说，我想要做的事情有哪些
4.05-4.08
it`s the most like a direct translation of the relational algebra
其实这更像是对关系代数进⾏翻译
04:08- 04:09
I want to do a join,
⽐如，我想进⾏join操作
4.09-4.12
I'm not telling you how I want what to do to join
我不会告诉你我想怎么进⾏join
4.12-4.13
I just want to do one on A and B
我只是想将A和B，join在⼀起⽽已
04:13 - 04:14
I want to get tuple some A
我想从table A中拿到tuple
4.14-4.19
I didn't tell you whether to do sequential scan or index scan, I'm just saying just get
tuples from A
我不会告诉你，我是通过循序扫描还是索引扫描来获取这些tuple的，我只是说我从table A中拿
到了tuple
04:19 - 04:21
So what we're focusing on today is
So，我们今天所关注的内容是
4.21-4.24
now to talk about what these algorithms actually are
我们会去讨论这些算法实际会是什么样的
04:24 - 04:25
And then we'll put it all together
然后，我们将它们都放在⼀起
4.25-4.27
when we talk about query planning query optimization to say,
当我们讨论查询计划和查询优化时会说这些东⻄
4.27-4.29
now we need to make a decision of
现在，我们需要作出决定
4.29-4.32
here the different choices of algorithms ,I could use or different access methods ,I could
use for my query
⽐如，这⾥是在该查询中我可以使⽤的不同算法以及访问⽅法
4.33-4.35
which one is gonna be the best for me
那么，哪种才是最适合我的
04:35 - 04:39
So today's lecture is really focusing on and-and-and and for Wednesday's lecture as
well for this week
So，这就是今天这节课以及这周三那节课所关注的重点
4.39-4..44
what are the different algorithms we can implement for the physical operators in our
query plan
对于我们查询计划中的这些物理operator来说，我们能有哪些不同的算法对它们进⾏实现？
04:45 - 04:45 ！！！！！！
But at a high level
但从⼀个⾼级层⾯来讲
4.45-4.50
we're assuming that it's in this tree structure where we're moving tuples from one
Operator to the next
在这个树形结构中，我们会假定将⼀个operator中所得到的tuple移动到下⼀个operator
04:51 - 04:52
So this Clear
So，你们懂了吗？
4.52-4.57
alright this is essentially what what you know what any any query engine is going to do
简单来讲，这就是所有查询引擎所做的事情
04:58 - 05:00
Right they're gonna represent as a tree as a data flows tree
它们会将SQL转换为这种树的形式或者数据流树的形式
它们会将SQL使⽤这种树或者数据流树的形式来表示
5.00-5.02
and they moving tuples between them
然后，它们将这些tuple在这些树中的节点进⾏移动
05:04 - 05:05
So the tricky thing though now
So，现在⽐较棘⼿的问题是
5.05-5.13
that for us when we start deciding what we know how do we actually implement the
algorithms for these operators is that
对于我们来说，我们该如何实现这些operator所对应的算法，相当棘⼿
05:13 - 05:20
again we this entire semester is focusing on the system that's assuming that data
doesn't fit entirely in memory
再说⼀遍，这整个学期我们的重点是⾯向磁盘型的数据库，即数据并不会完全放在内存中
05:21 - 05:28
So just like within our disk or new database system, just like we can't assume that tables
fit entirely memory where indexes can't fit entiredly memory
So，我们⽆法假定表能够完整的放在内存中，索引也不能完整的放在内存中
05:29 - 05:35
We now need to be worried about that the intermediate results between those operators,
cannot actually fit entirely in main memory
现在，我们需要担⼼的是，这些operator之间所产⽣的中间结果也没法完整的放在内存中
05:36 - 05:43
So therefore when we design the algorithms we're going to use to execute you know the
operator we need
因此，我们要去设计我们要使⽤的算法，以此来执⾏我们需要的operator
05:43 - 05:47
we need to pick ones that actually know how to write data at the disk
我们需要选⼀种算法，它知道该如何将数据写⼊到磁盘
我们需要选出⼏种算法，它们知道该如何往磁盘中写⼊数据
5.47-5.49
and be mindful that we may have to read and write data from disk
要注意，我们可能必须得对磁盘中的数据进⾏读写操作
05:49 - 05:53 ********
And therefore we'll make certain design decision in those algorithms to to accommodate
them
因此，我们将在这些算法中做出某些设计决策来适应这些东⻄
05:54 - 05:58
Right, so just as a quick example, I'm doing a join here on A and B
So，我们快速看下这个例⼦，这⾥我对table A和table B的数据进⾏了join操作
05:59 - 06:02
The hash table or depending what you know what what join algorithm I'm going to use
取决于我要使⽤的join算法
06:03 - 06:04
I may have to spill the disk
我可能不得不将数据溢出到磁盘
我的数据可能得溢出到磁盘
6.04-6.07
like A doesn't fit in memory ,B doesn't fit in memory
⽐如，A中的数据没法放在内存中，B中的数据也没法放在内存中
6.07-6.12
,so I need to join algorithm that can handle, you know inputs where the entire data set
may not fit in memory
So，我需要⼀种能够处理这种输⼊（体积⼤到内存⽆法装下的数据集）的join算法
06:12 - 06:15
Furthermore the output also may not fit entirely main memory
此外，输出可能也没法完整的放在内存中
06:16 - 06:21
So again we're gonna use our buffer pool manager that we built in the first project we
talked about before
So，我们会去使⽤我们在第⼀个project中所构建的buffer pool管理器
06:21 - 06:26！！！！！
that's how we're gonna be able to accommodate algorithms that need more memory
than is actually available
当算法所需要使⽤的内存⽐实际可⽤内存来的更多的时候，我们就可以通过它来解决
06:27 - 06:33
So we're not using for tables ,not using it for for for indexes, we can use it for
intermediate results
So，我们并不会将buffer pool管理器⽤在table或者索引上，⽽是⽤在中间结果这⽅⾯
06:34 - 06:36
And this again goes back to why I was saying before
这就是我以前所说的
6.36-6.41
this is why the you know if the database system ends just a memory instead of letting
the OS do it
这就是为什么数据库系统要⾃⼰来管理内存，⽽不是让OS来管理内存的原因了
06:41 - 06:46
The OS can oh oh this page is for an ephemeral data structure to do whatever my query
is
OS会表示，这个page是⽤来保存临时数据的，⽤于执⾏我的查询
6.46-6.48
and I'm gonna throw immediately after the queries over
当查询结束了，我就⽴⻢将这个page给扔了
06:49 - 06:50
And maybe I want to do different things
我可能会想去做不同的事情.
6.50-6.52
or have different replacement policies, or different strategies
或者使⽤不同的替换策略，或者是不同的⽅案
6.52-6.59
for those kind of pages, and those kind of data versus the data coming from from the
underlying tables
对于这些page，⾥⾯的这些来⾃基础表的数据来说
06:59 - 07:01
Whereas the OS doesn't see that
OS并不会看到这些东⻄
7.01-7.04
OS doesn't know anything about what's inside these pages or how they're being used
OS并不知道page中有哪些东⻄，或者该如何使⽤这些page
07:05 - 07:09
So again we're gonna use our buffer manager that spill to a disk
So，再说⼀遍，我们会使⽤我们的buffer pool管理器来处理溢出到磁盘的情况(知秋注:中间结果
消耗的内存⼤于当前分配的内存，需要进⾏⼀些落盘操作)
07:09 - 07:16
and therefore we're gonna design algorithms of prefer algorithms they're gonna
maximize the amount of sequential I/O that we can do
因此，我们会设计出某种偏好算法，它们能最⼤化我们进⾏循序I/O获取数据的数量
07:17 - 07:20
And this is gonna be different than any algorithms course you've taken potentially before,
这和你们之前所学过的任何算法课都不同
7.20-7.23
where you assume that you're just reading writing into memory
我们假定，我们要对内存进⾏读写操作
7.23-7.24
and everything has uniform access
我们对所有数据都有统⼀的访问⽅式
对其中所有都采⽤统⼀的访问⽅式
07:26 - 07:30
And now we need be mindful of what's actually in memory， when we design these
approaches
现在，当我们在设计这些⽅法的时候，我们要注意内存中实际有什么东⻄
07:32 - 07:35
So we're gonna first start off talking about the external merge sort algorithm
So，⾸先我们要来谈下External Merge Sort（外部归并排序）算法
07:36 - 07:42
And what will come out of this discussion you will see some high-level strategies for
essentially doing divide and conquer,
在我们这节课的讨论中，你们会学到某些⾼级层⾯的策略，⽐如说分治（divide and conquer）
7.42-7.47
that allow us to then that we can apply to other methods or other operators we want to
implement
这让我们可以将其应⽤到想要实现的⽅法或者是operator上
07:48 - 07:53
And then we'll finish up talking about how to do aggregations which can rely on sorting
algorithm
然后，我们会去讨论如何进⾏聚合操作，它可以基于排序算法来做
07:54 - 08:00
But then it also sort of Segway and into the join algorithm stuff we talked about next
week about hash joins
然后会将之应⽤到我们要谈的join algorithm(算法)之类中，我们下周会谈hash join
08:00 - 08:06
So there's sort of this trade-off between sorting versus hashing as the two different
methods, you can used to exude algorithms in your database system
So，在sorting和hash这两种不同的⽅法之间存在了某种取舍，你可以将这些算法渗透到你的数
据库系统中
08:07 - 08:08
We're going to first talk about sorting
⾸先，我们会去讨论sorting
8.08-8.11
and then we'll add in hashing at the end
然后，在最后我们会讲hashing
08:12 - 08:12
Okay
08:14 - 08:14
All right,
8.14-8.19
so it's sort of obvious that you know why we need to sort
So，我们需要排序的原因显⽽易⻅
8.19-8.22
but just make sure that everyone puts this in the correct context
我们要确保所有的数据都放在了正确的环境中
08:23 - 08:28
In relational model, the tuples in our relations are inherently unsorted
从本质上来讲，在关系模型中，所有的tuple都是⽆序的
08:29 - 08:30
Right, it's set algebra
它是种集合代数
8.30-8.31
there's no sort order
它⾥⾯并没有顺序
8.31-8.36
so we can't assume that the the data as we read them is gonna in any one particular
order
So，我们⽆法假定，我们所读取的数据是按照某种特定的顺序进⾏的
08:36 - 08:39
Now there's clustering indexes that we talked about before
我们之前讲过聚簇索引（clustering index）
8.39-8.40
it was talked about again today
我们今天⼜得来讲⼀讲它
8.40-8.47
which then you know provide you a enforces of sort order based on some index
你们可以基于某种索引来提供⼀种强制排序顺序
08:47 - 08:49
But in general we can't assume that's always gonna be the case
但⼀般来讲，我们不能假定情况总是这样
08:49 - 08:50
And furthermore
此外
8.50-8.54
we could have an index，our table could be clustered on one particular key
我们可以使⽤索引，我们可以在我们表中的某个特定的key上使⽤聚簇索引
08:54 - 08:55
But now we need to sort it on another key
但现在我们需要根据另⼀个key来进⾏排序
8.55-9.00
so that you know being pre-sorted doesn't actually help us in that scenario
这样你们也就知道，在这种情况下，预排序实际上并不会对我们有所帮助
09:00 - 09:07
So in addition to also now being able to you know someone calls an order by and we
want to sort the output
为了做到这点，有的⼈会去使⽤Order By对输出结果进⾏排序
当我们想去对输出结果进⾏排序时，有的⼈会选择调⽤Order By
09:07 - 09:09
if our data is sorted
如果我们的数据已经排好序了
9.09-9.15
there's a bunch of other optimizations, we can do for other utility things, we want to do
or queries, we want to execute in our database system
那么我们可以为我们想在数据库系统中执⾏的查询做些其他优化
09:15 - 09:20
So if our table is sorted or outputs or keys are sorted
So，如果我们的表是有序的，或者输出结果是有序的，或者key是有序的
9.20-9.24
,then it's really easy to do duplicate elimination
那么我们就很容易进⾏去重
09:24 - 09:26
Because now I just scan through the table once,
现在我只需要扫描⼀次表
9.26-9.29
and if I see that's the thing I'm looking at is the same as ,when I saw the last thing I
looked at that
如果我现在看到的东⻄和我前⼀次看到的东⻄是⼀样的
9.29-9.31
I know is a duplicate and I just throw it away
那么，我就知道它重复了，那么我就可以将重复的那个东⻄扔掉了
09:32 - 09:34
For group by this is the same thing,
对于Group By来说，同样如此
9.34-9.36
I can if everything is pre-sorted,
如果所有数据都被预先排好序
9.36-9.41
then I can generate the aggregations by just scanning through the table once, and
computing the running totals as needed
那么我就可以通过扫描⼀次表，然后根据需要计算出running total，以此来⽣成聚合结果
09:41 - 09:44
And then we talked about optimization of doing bulk
接着，我们会讨论该如何对bulk进⾏优化
9.44-9.45
so bulk loading in a B+tree
⽐如，B+ Tree中的bulk loading（加载⼤量数据）
9.44-9.48
where you pre sort all the data along the leaf nodes
你沿着叶⼦结点对所有数据进⾏预排序
9.48-9.52
and then you build the index from the from the bottom up rather than top down
然后，我们⾃下⽽上去构建索引，⽽不是⾃上⽽下
9.52-9.54
and that's way more efficient
这种⽅式会更加⾼效
09:55 - 10:00
So again sorting is a useful utility operation that we need in our database system
So，sorting是我们在数据库系统中所需要的⼀种很有⽤的操作
10:00 - 10:03
But we need to be able to accommodate one where we doesn't fit entirely in memory
但我们需要⼀个能够容纳下（内存中⽆法容纳下的数据量）数据的地⽅
我们需要的这个算法可以处理超过内存量的数据
10:04 - 10:05
Because it fits in memory
如果数据能放在内存中
10.05-10.12
then we just pick whatever your favorite sorting algorithm that you you know and love
from your intro classes ,and that works just fine for us
那么我们就可以使⽤任何你们喜欢的或者课上学到的排序算法，这都是可⾏的
10:12 - 10:18
Quick-sort ,heap-sort if you crazy bubble sort right ,but we don't care ,it's in memory
⽐如，快排，堆排序，冒泡排序，但我们并不在意你⽤的是什么排序算法，因为这些数据是放在
内存中的
10:18 - 10:23
So all the things that we learned before in intro talgorithm class ,work just fine
So，所有我们在算法课上学到的东⻄，⽤在这⾥都是可⾏的
10:24 - 10:25
But then the issues now
但现在的问题是
10.25-10.28
if it doesn't fit in memory, quick-sort can be terrible for us
如果数据没法放在内存中，那么对我们来说，快排就是个糟糕的选项
10:28 - 10:29
Because what does quick-sort doing
快排所做的是什么呢？
10.29-10.33
quick-sort is doing bunch of random pivots jumping around to memory in different
locations
快排会进⾏⼤量的随机跳转，它会随机跳转到内存中不同的位置上
10.33-10.35
that's random I/O and our role
它所做的是随机I/O
10:35 - 10:39
Because those pages we're jumping into may not actually fit in memory
因为我们所要跳转的page可能实际并不是放在内存中的
10.39-10.41
and the worst case scenario
在最糟糕的情况下
10.41-10.47
we're having one IO cost per change to the the data set
每对数据集进⾏⼀次修改，就要进⾏⼀次I/O
10:49 - 10:55
So instead we want an algorithm that is mindful of the potential cost of reading writing
data in disk
So，我们想要⼀种能将在磁盘上进⾏读写数据所消耗成本考虑进去的算法
10:56 - 11:01
And therefore make certain the design decisions that try to maximize the amount of
sequential IO
因此，我们要做出某种设计决策，以此试着最⼤化循序I/O所获取数据的数量
11:01 - 11:07
Sequential I/O even on faster SSDs is to be more efficient than than random I/O
即使是在速度更快的SSD上，循序IO的效率也远⽐随机IO来的要更⾼
11.07-11.12
because you can bring a lot more data in with a single and there's no seek in an SSD
因为你可以通过⼀次I/O就可以拿到⼤量的数据，并且在SSD中我们并没有磁盘寻道
11:12 - 11:19
But within a single you know with a single read operation or write operation down into
the device, you can get more data coming back
也就是说，对设备进⾏⼀次读或者写操作，我们可以拿到更多的数据
11:20 - 11:31
Right, so the I'm going to use and and at a high level this is what every is what every
single database and does that supports out-memory sorting
从⾼级层⾯来讲，这也是每个数据库所做的，它们⽀持在内存外进⾏排序
11.31-11.33
it`s a called the external merge sort
这叫做外部归并排序
11:33 - 11:38
Alright, sometimes you‘ll see external sort merge, and it be really confusing
有时你会看到external sort-merge，它真的令⼈很困惑
11.38-11.40
because they'll be there's the external merge sort algorithm
因为有⼀种external sort-merge算法
11:40 - 11:45
And then we'll see a sort merge join which could use the merge sort algorithm ,right
之后我们会看到sort-merge join，它可以使⽤这种merge-sort算法
11:45 - 11:49
But I'll try to make it more clear when we talk about joins what we're actually doing
但当我们讨论join以及实际该怎么做的时候，我会试着让你们弄清楚
11:50 - 11:52
So as I said this is a divide and conquer approach
So，正如我所说的，这是⼀种分治办法
11.52-11.58
where we're gonna basically split the data set that we want to sort up into these smaller
chunks called runs
简单来讲，我们将我们想要排序的数据集分成更⼩的数据块，我们叫它runs
11:59 - 12:02
And then we're going to sort those runs Individually
然后，我们对这些runs分别排序
12:02 - 12:06
Right, all the keys within a given run or are sorted
在⼀个给定的run中，所有的key都是有序的
12.06-12.10
and this the runs are disjoint subsets of the entire Keys that we want to sort
这些runs属于我们想要排序的整个key集合中彼此不相交的⼦集
12:11 - 12:13
And so then we're gonna sort these little these little runs
So，我们会对这些体积很⼩的runs进⾏排序
12.13-12.19
and then we're gonna start combining them together to create larger sorted runs
然后，我们会开始将它们合并在⼀起，以此来⽣成更⼤的排好序的runs
12:20 -12:25
And we keep doing this and doing this until we get the full data set the full key set that
we want sorted
我们会⼀直重复操作，直到我们想要排序的整个key集合排好序为⽌
12:26 - 12:28
So there's two phases for this
So，对此，这有两个阶段
12:28 - 12:34
So the first phase again we're gonna take as many blocks as we can fit in memory sort
them ,and then write them back out the disk
So，第⼀阶段，我们会将尽可能多的数据块放⼊内存，并对它们进⾏排序，然后将排完序的结
果写回磁盘
12:35 - 12:36
Then in the second phase
接着，在第⼆阶段
12.36-12.41
again that's when you go combine these sub-sorted runs into larger sort of runs
我们会将这些排好序的runs合并为更⼤的runs
12.41-12.45
,and then write them out
接着，并将它们写出
12.45-12.45
and you keep doing this over and over until you have the entire things sorted
你需要不断重复这个过程，直到你完成排序为⽌
12:45 - 12:51
So this is gonna end to end up taking potentially multiple passes through the data set
that we're trying to sort
So，我们可能需要对我们试着要排序的数据集进⾏多次排序
12.51-12.54
but in the end we end up with a complete sort of run
但在最后，我们会得到⼀个完整的排好序的run
12:56 - 12:59
So let's start with a simple example called a 2-way merge sort
So，我们来看个简单的例⼦，它叫2-way external merge sort
13:00 - 13:06
It's a 2-way means that were where the number two is that it's the number of sort of
runs we're gonna merge together for every single pass
这⾥的2-way指的是，在每⼀轮中我们要合并的run的数量为2，即将2个run合并为⼀个新的run
13:07 - 13:08
Alright, so within a pass
So，在⼀轮中
13.08-13.14
we're gonna go grab two runs merge them together ,and produce a new run
我们会去拿到两个run，然后将它们合并在⼀起，⽣成⼀个新的run
13.14-13.18
that's the combination of the two smaller ones that were our input
我们将这个两个run的组合作为我们的输⼊
13:18 - 13:21
So our data set is gonna be broken up into N pages
So，我们的数据集会被拆分到N个page中
13:21 - 13:25
And then what's now important for us when we consider what how algorithms going to
work
接着，现在对于我们来说，重要的事情是，我们得思考下算法是如何⼯作的
13:25 - 13:32
because we need to know how much memory is available to us to buffer things in
memory to do our sorting
因为我们需要知道我们可⽤的内存量有多少，以此将数据缓存在内存中，并对其进⾏排序
13:33 - 13:34
Because again if everything fits in memory,
因为如果所有东⻄都放在内存中的话
13.34-13.38
then we don't need to do any of this we just do quick-sort
那么，我们就不需要做其他事情了，直接快速排序即可
13:38 - 13:42
But we need to be told ahead of time how much memory we're allowed to use for sorting
但我们必须提前知道我们能⽤来排序的内存有多少
13:43 - 13:45
And this is actually something you can configure in database systems
实际上，你可以在数据库系统中对其进⾏配置
13:46 - 13:47
So in Postgres it's called working memory
So，在PostgreSQL中，它被称为working memory
13:47 - 13:55
you basically say how much memory the one particularly query is allowed to use for
whatever kind of intermediate operation wants to do
简单来讲就是，对于⼀个特定的查询来说，working memory就是它在进⾏中间操作时被允许使
⽤的内存量
13:55 - 13:59
Building a hash table, doing sorting and other things like that
可以在其（可⽤内存）之上构建⼀个hash table，做排序⼯作或者做些其他类似的事情
13:59 - 14:02
So we're told this we're always told this be ahead of time
So，我们得始终提前知道这个可⽤内存的⼤⼩
14:04 - 14:06
So let's look at sort of visual examples
So，我们来看⼀些可视化案例
14.06-14.07
so in pass 0
So，在pass#0中
14.07-14.11
you're gonna read every B pages from the table into memory
我们每次要从表中读B个page到内存中
14:11 - 14:15
and then you're gonna sort them in place in memory, and then write them out
接着，你要在内存中对它们进⾏排序，接着将排完序后的结果写出到磁盘
14:16 - 14:17
So let's really say for example
So，我们来看下案例
14.17-14.18
I have a disk
我有⼀个磁盘
14.18-14.20
on disk I have my data set
磁盘上存放着我的数据集
14.20-14.21
I have two pages
它⾥⾯有两个page
14:21 - 14:22
So let's say this case here
So，在这个例⼦中
14.22-14.29
I can only have I can I can bring in the first page sort that in place ,and now that's a
sorted run
我可以将page 1放到内存中进⾏排序，现在它就是⼀个排好序的run
14:29 - 14:31
and then I write that sort of run out the disk
然后，我将排好序的这个run写回到磁盘上
14:32 - 14:37
And I'm gonna do this one at a time assuming I must have a single thread, I'm gonna do
this one at a time for all my other pages
假设我只能使⽤⼀条线程，那么我⼀次只能处理⼀个page，我对所有其他page也进⾏同样的处
理
14:38 - 14:41
Right, so now so this is sort of step one,
So，这就是第⼀步
14.41-14.43
and then now we're here I'm reading the other page
接着，在此处我们读取另⼀个page
14.43-14.48
I bring that into memory sort it ,and then I write that out
我将它放到内存中并对其进⾏排序，然后将它写出到磁盘
14:48 - 14:50
So now that's the end of pass #0
So，这样pass#0就完事了
14.50-14.58
that I've taken all the the my sort of runs ,sorry all my my I grab a run that's the size of
B pages
我拿到了⼀个run，它的⼤⼩是B个page的总和
14:58 - 15:00
I sort that in memory
我在内存中对其进⾏排序
15.00-15.02
because B pages I'm allowed to use a memory, so I'm sorting that in place
因为我只能在内存中放B个page，所以我在内存中对这B个page中的内容进⾏排序
15:02 - 15:04
and then I'm writing it back out
然后，我将排序完的结果写出到磁盘上
15.04-15.06
and then I go to the next run once after that's done
当这个结束后，我就会开始对下⼀个run进⾏处理
15:08 - 15:10
So now in the subsequent passes
So，在连续的⼏轮处理后
15.10-15.15
we're going to recursive merges of all the runs we sorted so far
我们会对⽬前为⽌我们所排好序的run进⾏递归合并
15:15 - 15:19
and we're gonna combine them together to produce runs that are double the size of my
input
然后，我们会将这些结果合并到⼀起，我们所⽣成的run的⼤⼩是我输⼊的两倍⼤
15:20 - 15:25
Right, and so for this approach ,I need at least three buffer pages
对于这种⽅法来说，我⾄少需要3个buffer page
15:26 - 15:31
Because I need to have 2 buffer pages for each of the two runs that I'm bringing into
memory
因为我需要⽤2个buffer page来保存我放⼊内存中的run，⼀个run对应⼀个buffer page
15:32 - 15:35
And then another buffer page for the output that I'm writing out
然后，我需要另⼀个buffer page来保存我要写出的输出结果
15:37 - 15:38
So in this case here
So，在这个例⼦中
15.38-15.43
I could say I want to sort these these that you sorta guys ,so I bring those in memory
我想对这两个run进⾏排序，So，我将它俩扔到内存中去
15:44 - 15:48
And now I have one other page where I can write out the the combination of these two
guys
现在，我还有另⼀个buffer page，我可以将它们俩排序后的结果写到这个page中
15:48 - 15:51
But I you know this is two pages long
但你们知道，这个结果是有2个page那么⼤
15.51-15.52
but I only have one page
但我只有1个page
15:52 - 16:00
So I'm just gonna scan through each of these and compare them one by one to see
which one is greater than the other ,sorry which was less than the other depending what
order you're going
So，我只能对这些page中的数据进⾏扫描并⽐较，看看谁⽐谁⼤，或者谁⽐谁⼩，这取决于你
想要的是升序还是降序
16:01 - 16:04
And then I just write that out into a sorted page like this
然后我将排好序的page写出
16:04 - 16:08
And then once that's full then I write that out the disk
⼀旦这个page写满了，那么我就将它写出到磁盘
16:09 - 16:15
And then my merging continues where I keep going down think of 2 cursors are scanning
through these guys comparing them one by one
然后我会继续合并，我会使⽤2个游标来扫描这些page上的内容，并逐个⽐较
16:15 - 16:19
then I continue down with the other data set and I write that write that page out
然后我会引⼊其他数据集，并将该page写出
16:20 - 16:23
And then once I've reached the end then I have then I'm done
⼀旦我扫描到page底部，那么我的⼯作就完成了
16:27 - 16:28
So，is this clear
So，你们弄懂了吗
16.28-16.29
yes
请问
16:37 - 16:38
So her question is
So，她的问题是
16.38-16.40
if the memory in this case here memory can hold three pages
在这个例⼦中，如果内存中可以存放3个page
16.40-16.43
why not is do exactly what I just did here first
为什么我不先做这个呢？
16:45 - 16:47
Yeah you could think of like
你可以这样想
16.47-16.49
and then this is sort of simple example
在这个例⼦中
16.49-16.54
you can think of like I could bring, I could bring the two unsorted pages in memory
我可以将两个未排序的page放⼊内存
16:55 - 16.56
sort them in place
然后在内存中对它们进⾏排序
16.56-17.00
then do the combination without having to write them back out of the disk, yes
在不需要将数据写回磁盘的情况下，我们可以对它们进⾏合并
17:00- 17:01
But in general
但⼀般来讲
17.01-17.04
that's like that this is a trivial example general that's not you can't do that
这是⼀个简单的例⼦，但通常来讲我们不能这么做
17:09 - 17:10
This is also sort of oversimplification too
其实这也有点过于简化了
17.10*-17.18
because think of these are like the data pages of the tuple or the table, right there these
are tuples in them
因为在这些page上有很多tuple
17:18 - 17:22
You're actually really can't kind of do this the the in-place sorting like this
实际上你没法在内存中进⾏这样的排序
17.22-17.24
because that would be modifying the actual table itself
因为这会去对实际的表进⾏修改（即对表中数据进⾏重新排序，写出）
17.24-17.25
and you don't want to do that
你们不会想这么⼲
17:26 - 17:27
So in general
So，⼀般来讲
17.27-17.32
usually like you're not going to do this one step here where I was sorting them in place
通常你们不会在这⾥做这⼀步，我们会在这⾥进⾏排序
17.32-17.34
you'd make another copy and then write that out
然后拷⻉⼀份，并将它写出
17:35 - 17:35
So in that case
So，在这个例⼦中
17.35-17.36
that wouldn't work
这是不可⾏的
17.36-17.39
because you would need at most four pages in memory
因为在内存中你最多只能有4个page
17:43 - 17:43
Okay
17:46 - 17:49
So so this is sort again this is a sort of a simplification
So，这是⼀种简化的过程
17.49-17.52
but looks like you work through the math now see what actually what happens
但我们来通过数字来看下这⾥实际发⽣了什么吧
17:52 - 17:55
So let's go through a more a more fine-grain example here
So，我们来看个粒度良好的例⼦
17:57 - 18:04
So the way the math works out is the number of passes we need for this 2-way merge
sort is 1+[log2N]
对于这个2-way merge sort来说，这⾥的Number of passes的计算公式如图所示
18:05 - 18:10
Right, and the first one here the one that's for that's for the first pass
这⾥的第⼀个1指的是first pass
18:10 - 18:13
And then the log2N is is as you as you keep dividing up the
这⾥的log2N指的是
18.13-18.19
in each pass
在每⼀轮中
18.19-18.23
you're sort of getting a larger and larger runs until you reach the total size of the data
set
随着你扫描数据集中的内容越多，你的runs就会变得越来越⼤
18:24 - 18:27
Right, the last pass
在最后⼀轮中
18.27-18.35
the two runs that you're sorting will will be you know at most half the size of the total
data set
对我们所排序的这两个run来说，它们每个的体积最⼤是这整个数据集⼀半⼤
18:35 - 18:40
So the total I/O cost doing external merging sort is 2N .( # of passes)
So，这⾥进⾏external merge sort的总体I/O成本是2N*（# of passes）
18.40-18.41
and this is 2N
之所以这⾥是2N
18.41-18.44
because I always have to read it in and write it out
是因为我们得读⼀次数据，再写⼀次数据
18:44 - 18:45
Right, for every pass
对于每⼀轮来说
18.45-18.47
it's one read in and then one write out
我们要进⾏⼀次读取，然后再做⼀次写出
18:48 - 18:56
So and means also in every pass at most I'm reading ,I'm reading and writing every
record every key that I'm trying to sort exactly once
这意味着，在我对每条记录或每个key进⾏读取和写⼊操作时，我试着⼀次完成排序
18.56-18.59
once in and once back out
⼀进⼀出
18:59 - 19:01
So let's look at an example like this
So，我们来看这样⼀个例⼦
19:02 - 19:05
Alright, so we have a bunch of pages and each page we have two keys in them
So，我们有⼀堆page，每个page⾥我们有两个key
19:05-19.09
So yeah and then this little marker to say here's the end of file
这⾥有⼀个⼩标记，它表示这⾥是⽂件的末尾
19:09 - 19:11
So in the first pass
So，在第⼀轮中
19.11-19.17
we're just gonna read in every page sort it ,and then write it back out
我们会读取每个page，并对他们进⾏排序，然后将它们写回去
19:18 - 19:20
So we're not examining data across different pages
So，我们不会跨page来测试数据
19.20-19.21
these are actually runs
这⾥实际上是runs
19.21-19.23
but it's it's a one page run
但这是⼀个page⼤⼩的run
19:24 - 19:25
Then in the next pass
然后在下⼀轮中
19.25-19.30
I'm gonna go grab two sorted runs that are next to each other
我会去拿两个排好序的runs，它们之间彼此相邻
19:30 - 19:31
bring them to memory
将这两个runs放到内存中
19.31-19.35
sort them globally within within the two pages
在这两个page中，进⾏全局排序
19.35-19.36
,and then write those guys out
然后将结果写出
19:36 - 19:37
So in this case here
So，在这个例⼦中
19.37-19.41
the output of the second pass will be runs of size two pages
第⼆轮输出结果中的每个runs⼤⼩是2个page⼤
19:44 - 19:46
And then I do this keep is going down
然后我继续往下重复操作
19.46-19.48
second page now I have four rot four page runs
现在⼀个run就是4个page⼤
19.48-19.50
and the last one I have an eight page run
到最后⼀轮的时候，我的run⼤⼩为8个page
19:50 - 19:51
And then here point I'm done
此时我就完成了排序
19.51-19.59
,because now my output run is the total size of of the number of keys that I have
现在我所输出的run的⼤⼩就是我所拥有的key集合的⼤⼩
20:04 - 20:04
Okay
20:06 - 20:112
so what I've shown you so far ,all right for the two-way merge sort
⽬前我所向你们展示的就是2-way merge sort
20.12-20.14
as I said it only requires three buffer pages
正如我说的那样，这只需要3个buffer page
20.14-20.16
two for the input, one for the output
输⼊要⽤2个buffer page，输出要⽤1个buffer page
20:17 - 20:18
so back going back here
So，回到这⾥
20.18-20.21
when I was creating this this you know
当我创建这个的时候
20.21-20.23
now creating a run that's two pages
我创建了⼀个run，它⾥⾯有两个page
20.23-20.25
actually use this example
实际我该使⽤这个例⼦
20:25 - 20:27
so now I'm creating a run that has four pages
现在，在我所创建的run中，它⾥⾯有4个page
20.27-20.29
I can only have three pages in memory
我只能在内存中放3个page
10-02
20:30 - 20:35
All right, so I have I'm gonna have one for the the right side, or the left side one for the
right side
So，左边我们要⽤⼀个buffer page，右边我们也要⽤⼀个buffer page
20:35 - 20:37
So again you think I'll just have a cursor
So，你们可以想象，我有⼀个游标
20:37 - 20:41
I'm just scanning through each of the pages on the two sides
我会去扫描这两边的page
20:41 - 20:43
And then compare to see whether one is greater than the other
接着，⽐较看看谁⽐谁⼤
20:44 - 20:46
And if the one is less than the other
如果这个⽐另⼀个⼩
20.46-20.49
then that's what I write out to my output, and then move that cursor down
那么，我就将它写到我的输⼊中去，然后下移游标
20.49-20.51
and then I do the same comparison
接着，我再进⾏同样的⽐较操作
20:52 - 20:57
Right, so I keep going step by step until I reach the end the cursor reach to the ends of
both of them, yes
So，我会往下进⾏同样的操作，直到我的游标到达两边page的底部
21:00 - 21:00
Her question is
她的问题是
21.00-21.05
and what is my what am I showing here are ？these numbers consider tuples, yes
这⾥我所展示的是什么？这⾥我所展示的是tuple，你可以将这些数字看成是tuple
21:05 - 21:06
I'm showing the simplification their keys
我这⾥就是简单的将代表这条tuple的key展示出来
21.06-21.09
but in actuality in a real system
但实际上在真实的系统中
21.09-21.13
you'd have like the key you trying to sort on, and then the record id where it came from
你所试着排序的key，它也就是record id的来源
你所尝试⽤来进⾏排序的key，可以通过它来获取到对应tuple的record id
21:14 - 21:14
Yes
请问
21:19 - 21:21
In this example here each square is a page
在这个例⼦中，每个⽅块就是⼀个page
21:22 - 21:27
Right, but I'm there's only two keys in the page for simplicity, yeah
但⽅便起⻅，这⾥⼀个page中只有两个key
21:31 - 21:31
Okay
21:33 - 21:38 ！！！！！！！
So again for this example here we only have we only need two pages
So，在这个例⼦中，我们只需要两个page
21:39 - 21:40
But the problem is
但这⾥的问题在于
21.40-21.43
say I said I'll give you more pages
假设我要给你更多的buffer page
21:43 - 21:46
In what I'm showing so far you're not actually gonna get any better
在我⽬前所展示的东⻄中，实际上我们没法获得更好的效果
21:48 - 21:48
Right
21:50 - 21:50
Why
为什么呢？
21:54 - 21:55
He's right
他说的没错
21.55-21.56
the I/O remains the same
我们的I/O成本还是⼀样的
21.56-21.59
because what am I doing, I'm going fetching two pages
因为我要做的就是去获取两个page
21:59 - 22:01
And then I have this cursor it's gonna walk through them
然后我通过⼀个游标来遍历它们
22:01 - 22:07
And then whatever one has the you has the lower key that gets written out to the third
page
接着，只要游标所指向的其中⼀个page的上的key⽐另⼀个page上的key要⼩，那我们就把这个
较⼩的key写出到第三个page上
22:08 - 22:11
Having more pages in memory doesn't really help us
在内存中使⽤更多的page并不会真的对我们有帮助
22.11-22.15
because you know eventually I'm only can doing comparison you know two pages at a
time
因为你们知道的，最终我⼀次只能在两个page间进⾏⽐较
22:17 - 22:26
So a really simple optimization to to minimize this this this I/O Cost is to do Prefetching
So，我们可以通过prefetch（预取）来最⼩化I/O成本，这是⼀种很简单的优化⽅式
22:26 - 22:28
So this technique is called double buffering
So，这种技术叫做double buffering
22:28 - 22:30
The idea is that
它的思路是
22.30-22.34
when you go and start merging say two other pages
当你们要对其他两个page进⾏合并时
22:34 - 22:42
you have a bunch of shadow pages or shadow buffers where you start fetching in the the
next run you need to sort, or the next page you need to sort
你通过使⽤shadow page或者shadow buffer来接收你所要排序的下⼀个run或者是page
22:43 - 22:49
So it requires you to have deuce asynchronous I/O to have something in the background
go and fetch the the next pages you're going to need
So，它需要让你减少异步I/O的数量，以此在后台取获取我们接下来需要的page
22:49 - 22:54
So that when the cursor reads that reaches the end of the current page that's operating
on
So，当游标读完并到达当前所操作的page末尾时
22:55 - 22:56
The next page that it needs is there
它所需要的下⼀个page就在那⾥
22:57 - 22.59
If it's single threaded and every everything synchronous
如果这是单线程的情况，那么所有东⻄都是同步的
22.59-23.01
then you have this ping-pong effect
那么我们就会看到乒乓效应
23.01-23.05
where I'm gonna be CPU bound and disk bound, and CPU bound the disk bound
这⾥我可能会是CPU密集型和磁盘密集型（知秋注：即计算型和I/O型）
23:05 - 23:07
Because I'm gonna bring the page in and wait for that
因为我要将page放⼊内存，等待获取page
因为我要等待将所需page放⼊内存中
23.07-23.09
then do my sorting that's all CPU
然后进⾏排序，这都是CPU的⼯作
23.09-23.12
then I'm done that doing that sorting or done doing the merging
然后我就完成了排序或者合并⼯作
23.12-23.15
and now I have to get to the next page and I'm I'm blocked on that
现在，我就得去拿下⼀个page，然后我就会因为它⽽阻塞住
23:15 - 23:17
Right, so really simple example here
So，这⾥有个简单的例⼦
23.17-23.18
I want to sort one
我想对page 1进⾏排序
23:19 - 23:22
And then while I'm doing that， in the background I go fetch page two
然后，在我对page 1进⾏排序的时候，我就在后台获取page 2
23:23 - 23:27
And then by the time I'm sorting this one ,then when that's done
当我对page 1结束排序后
23.27-23.29
then when this guy's ready to go for me
那么我就能去处理page 2了
23:34 - 23:42
Okay, right so this is this you know the 2-way merge sort is a sort of most simple way to
consider this
2-way merge sort是⼀种最简单的排序⽅式
23:43 - 23:49
We need to consider that what how this works with a general you know general anyway
sort or K-way sort
我们需要思考下它如何运⽤在通⽤的场景下或者变成K-way的形式
我们需要去思考，在⼤多数情况下，K-way sort是怎么⼯作的
23:50 - 23:51
Yes, sorry
请讲
23:57 - 23.57
So his question is
So，他的问题是
23.57-24.01
how do you do this optimization Here
我们该如何在这⾥进⾏优化
24.01-24.09
how do you can have the thread sorting while on the background there's it's going
fetching data
我们该如何使⽤多线程来做到⼀边进⾏排序，另⼀边在后台获取数据呢？
24:09 - 24:11
Well this is actually the operating system helps us, right
Well，实际上操作系统可以帮我们做到这点
24:11 - 24:14
So we make a request from the operating system go read this for us
So，我们请求操作系统为我们读取数据
24:15 - 24:20
And then there has another thread that's called asynchronous I/O, in the background it
goes fetch the data we need
然后，这⾥我们会通过另⼀条线程在后台去获取我们需要的数据，这叫做异步I/O
24.20-24.22
we tell it where we're to put it
我们会告诉这条线程，拿到的数据该放在哪
24:24 - 24:26
And then that way I through I can do all the computation as well
这样我就可以完成所有计算⼯作
24:26 - 24:29
Actually the Database system we can do this, well you actually don't need the OS
实际上数据库也能帮我们做这些，我们实际上并不需要OS来帮我们做
24:29 - 24:33
In a real system you would have like a IO dispatcher thread
在⼀个真正的系统中，我们会有⼀个IO调度线程之类的东⻄
24:33 - 24:35
So you say I want this request get me this page
So，你表示我想通过这个请求去拿到这个page
24.35-24.38
and then give me you know here's a call up to tell me when it's actually ready
这⾥我通过调⽤⼀个东⻄，它可以告诉我这个page什么时候ready
24.38-24.40
then it goes and does that
然后，它就会去处理这个page
24:40 - 24:42
Your thread can do whatever computation at once
你的线程此时就可以⽴刻进⾏任何计算
24.42*-24.44
and then when it's done， it's available for you
当它结束任务后，这条线程就是可⽤的了
24:45 - 24:47
Yeah yeah they have two threads ,yeah
没错，这⾥⽤到了两条线程
24:50 - 24:58
Okay, so let's quickly go over how to generalize this algorithm beyond just having just do
two you know standard two ways sort
So，我们来快速总结下这个算法，⽽不是只是去使⽤这种2-way sort
24:58 - 25:01
So with the general K-way sort it's still the same
So，在K-way sort中，我们做的⽅式也是⼀样
25:01 - 25:04
We're to use B buffer pools
我们要去使⽤B个buffer pool
25.04-25.05
and then in the first pass
然后，在第⼀轮中
25.05-25.10
we're gonna produce and divide it be the ceiling of that sorted runs of size B
我们会将这B个buffer page切分成N/B个排好序的runs，每个run的⼤⼩为B
25:10 - 25:12
Because that's what we're doing the in-place sorting
因为我们要做的是就地进⾏排序
25:13 - 25:14 ！！！！！！
And then in the subsequent passes
然后，在接下来的⼏轮中
25.14-25.18
we're gonna do we're gonna generate B-1 runs at a time,right
我们会⼀次合并B-1个run
25:19 - 25:20
And it's always -1
这⾥始终是减⼀
25.20-25.22
because we always need one buffer for the output
因为我们始终需要⼀个⽤来保存输出的buffer
25:22 - 25:24
Having additional output buffers doesn't help us
使⽤额外的output buffer并不会对我们有帮助
25.24-25.29
because you really only write to one with one thread ,but only write the one output buffer
at a time
因为我们只能使⽤⼀条线程来对这个page进⾏写操作，并且⼀次也只能对⼀个output buffer进
⾏写操作
25:29 - 25:30
So that's why it's B-1
So，这就是为什么是B-1的原因了
25:31 - 25:34
So the way the math works out is just an extension of what we showed before
So，这⾥所展示的数学公式只是我们对之前公式的扩展
25.34-25.39
we're set up now saying log2N or log2, it's log B-1
我们将原来的log以2为底，变成了现在的 log，以B-1为底
25.39-25.42
and then you take the ceiling of N/B
然后，我们将这⾥的上限变为N/B
25:42 - 25:46
But still the the I/O Cost is 2N.(# of passes)
但这⾥的I/O成本还是2N(# of passes)
25:47 - 25:48
So this is very plugging chuggy
So，这依然很糟糕
25.48-25.52
you'll see this when you do the homework, right
当你在做作业的时候，你就会碰到这个
25:52 - 25:55
You fill in the B fill in the ends and the numbers work out
你把B带进去计算，你就会看到这个数字有多⼤
你可以去指定公式⾥的B和N去计算
25:56 - 25:58
So let's just walk through a really quick example here
So，这⾥我们来快速看个例⼦
25:58 - 26:04
So we're gonna sort 108 pages with with five buffers pages we can use
So，我们使⽤5个buffer oage来对108个page上的数据进⾏排序
26:05 - 26:07
So N=108 ,B=5
So N=108 ,B=5
26:07 - 26:09
So in the first pass right
So，在第⼀轮中
26.09-26.13
the the amount of I/O that we're going to do is
我们所要做的I/O数量是
26.13-26.15
we're trying to compute how many runs we're going to generate
我们要试着算出我们要⽣成多少个runs
26:15 - 26:18
So it's the ceiling of 108/5
So，它的上限是108/5
26:18 - 26:23
So that's gonna generate to 22 sorted runs of 5 pages each
So，我们要⽣成22个runs，⼀个run中包含5个page
26:23 - 26:27
Right and then the last page the last run is only 3 pages
最后⼀个run中只包含3个page
26:27 - 26:29
So that's why you have to take the ceiling
So，这就是为什么我们取上限的原因了
26:30 - 26:32
Right because you don't want a fractional cost
因为我们不想去⽤⼀个分数来计算
26:33 - 26:34
And then going down in the subsequent passes
然后在接下来的⼏轮中
26.34-26.39
now you're taking the the number of runs you want you generate at the previous pass
我们使⽤在前⼀轮算出的runs数量来进⾏计算
26:39 - 26:44
and dividing that by the number of the size of the run you're going to generate before
然后⽤22去除以4
26:44 - 26:46
Right, so now it was two, now it's 4
So，现在是4
26:47 - 26:49
So this generates 6 sorted runs of 20 pages
So，这⼀轮它⽣成了6个排好序的runs，每个runs中有20个page
26.49-26.52
where the last run is only 8 pages
最后⼀个run中只包含了8个page
26:52 - 26.57
And then just sort of going down just keep applying over and over again, until you reach
the very end
接着，我们不断重复操作，直到处理完毕为⽌
26.57-27.03
where you have now a the data set is exactly the same size as the original one
现在我们所拥有的数据集⼤⼩和原始的⼤⼩⼀模⼀样
27:04 - 27:04
Yes
请讲
27:08 - 27:10
His question is are we assuming here this sort of done in place
他的问题是，我们是否假设这些操作会⽴刻完成
他的问题是，我们是否可以假设这些操作会在buffer中就地完成排序（知秋注：在排序过程中⽆
须写回磁盘，排好序再写回）
27.10-27.12
for the first pass, yes
对于第⼀轮来说，确实如此
27.12-27.13
for the subsequent passes, no
对于接下来的⼏轮，就不是这样
27:15 - 27:17
But as if this is what the textbook does
这就是教科书中的做法
27:17 - 27:19
In a real system you wouldn't do that
在真正的系统中，我们不会这么做
27.19-27.23
because again the the depending on how where you're reading the data from
因为这取决于你们从哪⾥读取数据
27:24 - 27:28
It could if it's coming directly from the table itself, then you can't modify that
如果它是直接来源于表⾃身，那么你们就没法修改它
27:29 - 27:32
If it's coming from another operator, then you can do that
如果它是来⾃另⼀个operator，那么你就可以对它进⾏修改
27:33 - 27:34
Yes, yeah
请讲
27:37 - 27:41
The -1 close it ,because you always have the one one buffer page for the output, yeah
这⾥的减⼀的意思就是，因为我们每次都得⽤⼀个buffer page来保存输出
27:45 - 27:48
So yeah indeed in the general case
在⼀般情况下
27:50 - 27:52
It was three, right
它的值是3
27:54 - 27:57
Whatever it's two for the input, one for the output, yeah
输⼊要⽤两个buffer page，输出要⽤⼀个buffer page
28:05 - 28:07
This question is why am I using five here
他的问题是，这⾥我为什么使⽤5
28:08 - 28:09
So you're sorting
So，这⾥我们正在排序
28:13 - 28:19
Yes, sorry it makes it so before I was sorting two runs at a time
So，在此之前，我们⼀次是对两个run进⾏排序
28:21 - 28:23
This is now sorting multiple runs at a time
现在则是⼀次对多个run进⾏排序
28:23 - 28:28
Right, so I'm so say with B=5, I bought five buffer pages
So，假设B=5，也就是说这⾥我有5个buffer page
28:28 - 28:30
So for each of the sorted runs
So，对于每个排好序的run来说
28.30-28.33
I'm gonna five sorted runs I'm gonna try to merge at the same time
我会有5个排好序的run，我会同时对它们5个进⾏合并
28:34 - 28:38
And again all I need to do is just have a cursor sit at each one and walk through them
one by one
我所需要做的事情就是在每个run中通过⼀个游标，来逐个遍历它们中的内容
28.38-28.40
and just do a comparison across all that
然后，对它们中的数据进⾏横向⽐较
28.40-28.45
and say which one is the which one is the smallest， write that out
如果在⽐较的过程中，发现最⼩的那个数据，那就将它写到输出
28:45 - 28:48
And then now we have four cursors and one output ,yes
现在我们有4个游标和⼀个输出，说的没错
28:49 - 28:51
Yeah, I should visualize that sorry
我应该将它⽤图⽚展示出来，不好意思，我没做这个
28:52 - 28:55
Again, this wife record I'll remember to do that next year
这个我记⼀下，我会在明年的幻灯⽚上补上
28:58 - 28:59
Or is this clear
你们懂了吗？
29:01 - 29:02
Okay
===========================================================
29.02-29.04
so that's external merge sort
So，刚才讲的就是external merge sort
29.04-29.11
they said this is this is the exact details of how you actually implement this will vary from
system to system
这就是你们实际该如何实现的细节了，这也因系统⽽异
29:11 - 29:14
There's obviously some other optimizations we can think about
我们也可以想出⼀些其他的优化
29.14-29.20
like some hints to say oh I know the min value of the max value if my sort of run is is this
an that
⽐如，我们可以提示下，我知道这个排好序的run中的最⼤值和最⼩值是什么
29:20 -29:22
And my min max value for this other sort of run is that
然后另⼀个排好序的run中的最⼤值和最⼩值是别的什么东⻄
29.22-29.29
so therefore if I know that the the min value is is greater than the max value this other
sort of run
So，因此我知道这个run中的最⼩值要⼤于另⼀个排好序的run中的最⼤值
29:29 - 29:32
I don't need to do the merge, I just append on top of them,right
我不需要进⾏合并，直接在另⼀个run上⾯进⾏追加就可以了
29:33 - 29:35
So there's some optimizations you can do like that
So，你们可以做像这样的⼀些优化
29.35-29.36
but in general
但总的来讲
29.36-29.39
what I've shown here today is
对于我今天这⾥所展示的东⻄来说
29.39-
works you know works well for for for most data sets assuming uniform distribution of
the values
它适⽤于⼤部分数据集，前提是这些数据集中的值都是分布均匀的
29:47 - 29:53
There's no sort of there's no locality to enter the data ,it's just completely random this
works fine
即数据没有经过排序，也就是数据完全随机分布的情况下最适合我们展示的算法
29:54 - 29.56
If you know that something more about my your data
如果你对你的数据了解的更多
29.56-29.57
like it's skewed in a certain way
⽐如，你了解这部分数据某⼀⽅⾯的东⻄
29.57-30.01
then you can apply some simple techniques to speed this thing up
那么，你就可以使⽤⼀些简单的技术，将速度提上去
30:01 - 30:05
But this is what I've shown today is just like the pickup truck version of it a generalpurpose version of it
但就我今天所展示的东⻄来说，它更像是⼀种通⽤的版本
30:07 - 30:16
So instead of actually just doing the sort of brute first brute force mergesort, that I
showed here now
So，⽐起我刚刚所使⽤的第⼀种暴⼒排序合并法来说
30:17 - 30:22
There may be some cases where we can actually use the B+tree to speed up our sorting
operation
在有些情况下，我们实际可以使⽤B+ Tree来提升我们排序操作的速度
30:23 - 30:28
So in general the sorting and join algorithms ,those are actually the most expensive
things to do
So，⼀般来讲，对于sorting和join算法来说，这实际上要付出的代价是最⼤的
30:29 - 30:34
oh so if there's any way we can speed these things up, this is always gonna be a good
choice for us
So，如果有某种⽅式可以让我们加快这些操作，那么对于我们来说它就⼀直会是⼀个好的选择
30:35 - 30:37
So what did the B+tree essentially doing
So，B+ Tree实际在这⾥⾯扮演了什么样的⻆⾊呢？
30.37-30.43
well it's maintaining the sort order for our keys in the data structure
它在数据结构中让我们的key变得有序
30:43 - 30:51
So we're paying you know the penalty to maintain update do splits emerges as needed
on our B+tree as the table gets modified
当表被修改的时候，根据需要，我们在我们的B+ Tree上进⾏拆分和合并⼯作，这需要我们付出
点代价去维护它
30:52 - 30:59
But now we can then possibly piggyback off of that work we've already done to speed
up by sorting, but not having to do sorting at all
但现在我们可以将这部分已经完成的⼯作通过排序来进⾏加速，⽽不是只进⾏排序
但现在我们可以通过已经排好序的东⻄（⽐如B+tree）来完成我们的⼯作（⽐如范围查询），
⽽⽆须再去做排序操作
31:00 - 31:03
So if our sorting operation that we need
So，对于我们所需要的这个排序操作来说
31.03-31.06
if the keys we want to sort on are the same keys that are B+tree is indexed on
如果我们想要排序的key和B+ Tree上索引中的key是⼀样的
31.06-31.09
then we can potentially just reuse the B+tree
那么，我们就可以复⽤这个B+ Tree
31.09-31.13
and not go through that whole looks from merge sort and with multiple passes that I just
showed
我们就不⽤像之前我所展示的K-way merge sort那样去遍历整个数据了
31:15 - 31:18
But it only works if we have a cluster B+tree
但这只适⽤于我们拥有cluster B+ Tree的情况
31:20 - 31:23
Again we showed an example of that I think two classes ago
我们在前两节课的时候展示过关于这⽅⾯的⼀个例⼦
31:24 - 31:27
But now we showed it more visual example what actually is going on
但现在，我们会去⽤过⼀个更直观的例⼦来告诉你们这⾥实际发⽣了什么
31.27-31.29
and you'll see why this makes sense for sorting
然后，你们就会明⽩这（cluster B+ Tree，聚簇索引）为什么对排序来说很有意义
31:29 - 31:31
But not for the uncluttered one
但这并不适⽤于unclustered B+ Tree
31:32 - 31:35
So the clustered B+tree a clustered index just means that the
So，clustered B+ Tree（聚簇索引）指的是
31.35-31.48
the sort order or the physical location of the tuples on our pages, will match the sort
order defined in the index
我们page中tuple的物理位置和我们在索引中定义的顺序相匹配
31:48 - 31.52
So if I have a index on key foo
So，如果我在key foo上有⼀个索引
31.52-32.00 ！！！！！！
then along my pages will be the the the tuples we sorted in pages based based on that
order of foo
那么我们会根据foo在索引中的顺序来对page中对应的tuple进⾏排序
32:01 - 32:05
So now if I want to do a sort on that key
So，如果我现在想根据这个key来进⾏排序
32:06 - 32:07
I don't need to do external merge sort
我不需要去使⽤external merge sort
32.07-32.11
because all I need to do is is get down to my leaf pages in my B+tree
因为我所需要做的就是跑到我的B+ Tree底部的leaf page上
32:12 - 32:19
Because now the the sort order of the key will match the sort order of the of how the
data is found
因为现在根据该key所得到的顺序会匹配数据在B+ tree中所找到的顺序
32:21 - 32:26
So I don't need you any extra computation to to go sort it ,it's already sorted for me
So，我不需要通过任何额外的计算来进⾏排序，因为它已经为我排好了序
32:28 -3229
So this again this is another example
So，这就是另外⼀个例⼦了
32.29-32.35
where the database system the query planner that we'll talk about after the midterm or
the class before the midterm
我们会在期中考试前⼀节课或者是期中考试后来讲数据库系统中的查询计划
32:35 - 32:41
The the query optimizer can figure out oh you want to do a sort on this key, I already
have a clustered index on that key
查询优化器可以帮我们弄清楚这⼀点，⽐如，如果我们想基于这个key进⾏排序，它表示，我已
经有了关于这个key的聚簇索引
32:41 - 32:46
Let me go use that to generate the correct sort order, and not even bother running
external merge sort
它就会去使⽤这个聚簇索引来⽣成正确的排序顺序，⽽不是再去执⾏external merge sort
32:48 - 32:50
But as we saw in the case of Postgres,
但在PostgreSQL中
32.50-32.52
they can't they don't enforce this
它们并不会强制使⽤这个
32.52-32.56
you tell me I want a B+ tree cluster on an index on a given key
你告诉我，你想要这个给定key所在的对应聚簇B+ tree索引所指定的节点(可以理解为page)
32:56 - 32:57
They're not gonna maintain that's sort ordering
PostgreSQL不会去维护这⾥⾯的排序顺序（知秋注：即并不会对节点内tuple进⾏排序）
32.57-52.59
other systems will do this
其他系统可能会去维护
32:59 - 33:03
So now if you have an uncluttered index unclustered B+tree
So，如果现在你拥有的是⼀个uncluster B+ Tree索引（知秋注：即叶⼦节点不保存整条tuple数
据，只保存索引对应字段数据）
33:03 - 33:08
This is actually the worst possible thing to use for trying to generate a sort order
对于我们试着去排序来说，这实际上是⽤起来最糟糕的东⻄
33:09 - 33:10
And we think I guess why
你们可以猜下这是为什么
33.10-33.11
it should be obvious
答案应该显⽽易⻅
33:14 - 33:14
What's that
你说的是啥？
33:17 - 33:18
Great, you have one I/O per record
说得好，对每个记录，你都得进⾏⼀次I/O操作
33.18-33.23
so again I traverse the index to be gentle to the left side of the tree, and I want scan
across
我会从树的左边开始遍历索引，然后跨叶⼦节点进⾏扫描
33.23-33.25
and because that's how my my keys are sorted
因为这是我key的排序⽅式
33:25 - 33:31
But the data has no connection to how it's being sorted in the index
但我所需求数据的顺序与索引中数据排列的顺序并没有什么关系
33:31 - 33:36
So for every single record I got to go get and generate as my output
So，我要去获取每个record，并⽤它们⽣成输出
33.36-33.37
I may be doing another disk I/O
我可能需要进⾏另⼀次磁盘I/O
33.37-33.40
because the page I need is not in memory
因为我需要的page并不在内存中
33:40 - 33:42
I go to disk and get it bring my buffer pool
我跑到磁盘去获取它，然后将它放⼊我的buffer pool中
33.42-33.45
, and then now that very next key it I look at is in another page
然后，我所查看的后⾯的key是在另⼀个page上的
33.45-33.48
and it's evict one I just brought in, and bring him the next one
那我就得把刚刚放到buffer pool中的page移除，并将这下⼀个page放⼊buffer pool
33:49 - 33:49
Yes
请讲
33:57 - 33:59
The question is what does it mean for tree to be
他的问题是
34:01 - 34:05
You wouldn't say it is a you don't say the trees clustered, the tables clustered
我们不会去说这些tree是clustered，或者这些table是clustered
34:06 - 34:08
Again, I wouldn't call it that like
再说⼀遍，我不会这么讲这种东⻄
34.08-34.10
if I was writing you know coming with those terms I would call it
如果我遇到这些术语，我会这么叫它
34.10-34.13
oh it's a sorted table， for whatever reason they call it a cluster table
它是⼀个sorted table，不管出于什么原因，其他⼈会将它叫做clustered table
34:13 - 34:18
Right, because it's basically the the tuples that are that are similar to each other are
clustered together on the page
因为，简单来讲，彼此间相似的tuple都会被聚集在⼀个page上
34:18 - 34:20
Right, so again back here
So，回到这⾥
34.20-34.26
this the sort order of the how the tuples was actually being stored matches the sort
order the key
这⾥tuple实际所保存的顺序和根据key排序的顺序相匹配
34:26 - 34:29
So this is this would be a clustered index, all right
So，这就是⼀个clustered index
34:30 - 34:31
In this case here
在这个例⼦中
34.31-34.32
we just call create index
我们只是创建了索引
34.32-34.33
this is what you normally get
这也是你们通常所做的
34.33-34.39
the keys just you know the actual where the records actually being stored has no relation
to how they're being sorted
正如你们知道的那样，这些record的存储顺序和它们的排序顺序⽆关（知秋注：我排序⽤的
record data并不是索引字段的数据）
34:43 - 34:44
Questions what is the information in the tree
他的问题是，在tree中的信息是什么样的
34.44-34.46
it's just the B+ tree we talked about before
它就是我们之前讨论过的B+ Tree
34:46 - 34:49
Right, so create index on on on key foo
So，我们在key foo上创建索引
34:50 - 34:56
So to build that index I'm doing sequential scan looking at every single tuple getting their
value of foo inserting that into my tree
So，为了构建索引，我要进⾏循序扫描，以此得到每个tuple中key foo上的值，然后将它们插⼊
我的tree中
34:57 - 35:00
And the key value pair is the value of foo
这⾥的key/value pair就是foo的值
35:01 - 35:04
And then the the value is the record id the pointer to the tuple
然后，这⾥的value是这个record id所指向的tuple
35:06 - 35:11
All right, this is different than the index organized indexes or any index organized tables
we talked about
这和我们之前所讲的index-organized table不同
35.11-35.14
where the tuple pages are actually in the leaf nodes themselves
index-organized table的tuple pages实际上是在叶⼦结点中的
35:15 - 35:19
In that case that is a clustered index ,but it's also index organized table
在这个例⼦中，它不仅是⼀个clustered index，它也是⼀个index-organized table
35:20 - 35:23
This is like if there's they're not you're not storing the data in the leaf nodes themselves
如果你不将数据保存在叶⼦节点中
35.23-35.26
if it's disconnective
如果它们是不连续的
35.26-35.27
then it's either cluster and uncluster
那么它就可能是clustered index，也可能是unclustered index
35:28 - 35:28
Yes
请讲
35:48 - 35:49
Yeah, so his statement is
他想说的是
35.49-36.00
instead of actually every single time I encounter a key immediately go fetch it, what if I
get all the keys that I need and their record IDs
如果我去拿到我所需要的全部key以及它们的id，⽽不是每遇到⼀个key，就去获取它
36:00 - 36:02
and then now do combine the lookup
现在，我们将它与查找进⾏结合
36.02-36.06
so that I get all the ones from page 101 first, and all the ones on page 102
这样我就可以先拿到page 101中的全部数据，然后page 102中的全部数据
36.06-36.07
yes
是这样
36:07 - 36:12
There we'll talk about two weeks or next week for scans
对于扫描这块内容，我们会在下周或者两周后进⾏讨论
36:10 - 36:14
that's a common optimization
这是⼀种常规优化
36:15 - 36:20
But that assumes that you can fit like the yeah the key set and
有对应于你说的，⽐如类似的key set
36:22 - 36:26
There are some algorithms where you actually can start producing outputs sooner rather
than later
实际上，有些算法可以让你更早开始进⾏⽣成输出
36:28 - 36:29
This is like an all-or-nothing
这实际上有点孤注⼀掷的意思
36.29-36.31
this is like what I've shown so far is
在我⽬前为⽌所展示的东⻄中
36.31-36.35
I'm gonna get all you know this operator asked me to get this data in sort of order
你知道的，这个operator让我以某种顺序拿到这些数据
36.35-36.37
so I'm gonna get it all now
So，现在我拿到了全部数据
36.37-36.40
and then I don't move on to the next operator until I get everything
接着，直到我拿到了所有数据，我才会让下⼀个operator进⾏处理
36:41 - 36:43
There are some streaming operators where you could say
我们可以使⽤⼀些流式operator
36.43-36.45
all right to start streaming data out as you get it
当我们拿到数据，就开始流式⽣产数据
36:46 - 36:48
Because I'd rather have it sooner rather than later
因为我更希望更早拥有这些数据
36.48-36.50
because there's other optimizations that I can do up in the tree
因为我可以对这棵树进⾏些其他优化
36:50 - 36:51
So in that case
So，在这个例⼦中
36.51-36.54
you're you know your best approach won't work in that environment
在这种环境下，你的最佳策略并不奏效
36:55 - 36:59
But that that is a common optimization we'll see this in like next week
但这是⼀种常规优化，我们会在下周看到
37:02 - 37:02
Okay
37:05 - 37:08
All right, so again the main takeaway of this is
So，这⾥的重点是
37.08-37.08
if it's a cluster index
如果这是⼀个clustered index
37.08-37.14
and and the query needs it to be sorted on the key that the index is based on
查询需要根据索引所基于的key对数据进⾏排序
37.14-37.16
then you just you just use the clustered index
那么你使⽤clustered index就⾏了
37:17 - 37:20
If it's not a clustered index then you just almost never want to use it
如果它不是⼀个clustered index，那么你⼏乎不会想去⽤它
37:23 - 37:25
All right, so that's basically it for discussing sorting
So，基本上来讲，这就是排序相关的东⻄了
==============================================================
37:26 - 37:28
So let's talk about do some other operations
So，我们现在来讨论些其他操作
37:29 - 37:33
So imitator we're now going to focus on aggregations
So，现在我们将重⼼放在聚合操作上⾯
37:33 - 37:41
Because for aggregations is another good is another good example of, or it is an
example of a type of operator,
因为聚合操作是另⼀个关于操作符的很好案例
37.41-37.47
where we can make you a choice between sorting versus hashing as our for our algorithm
因为你可以在sorting和hashing之间作出选择，并⽤于我们的算法中
37:48 - 37:51
And then have different trade-offs and have different performance characteristics
它们之间有不同的取舍，并且性能上也有所不同
37:52 - 37:56
Because one is essentially you know trying to do a lot of sequential access someone's
trying to do random access
因为sorting所做的是⼤量的循序访问，hashing所做的则是随机访问
37:57 - 37:59
So maybe certain scenarios where one might be better than another
So，在有的情况下可能会出现⼀个⽐另⼀个性能来的更好
38:00 - 38:02 ****
In general as a spoiler what I'll say is that
⼀般来讲，作为破坏者，我想说的是
38.02-
and no one was always in the case no matter how fast the disk is ,oftentimes the the
hashing approach will work better
不管磁盘的速度有多快，通常情况下hashing这种⽅式的效果会更好
38:11 - 38:19
And we'll see an example of how we can actually make the hashing aggregation do more
sequential I/O rather than random I/O
之后我们会看⼀个例⼦，在这个例⼦中我们会让hashing aggregation做更多循序I/O⽽不是随机
I/O
38:20 - 38:23
All right, so if you take the advanced class in the spring
So，如果你们在春季学期上了⾼级课的话
38.23-38.25
this is another big thing too
这就是另⼀个重点
38.25-38.28
is like hashing always works super fast,because everything is in memory
那就是，hashing的速度⼀直都很快，因为所有数据都是在内存中的
38:29 - 38:32
All right, so how would you use sorting do an aggregation
So，在进⾏聚合操作的时候，我们该如何进⾏sorting呢？
38:32 - 38:33
Well again what does an aggregation doing
Well，聚合操作做的是什么呢？
38.33-38.40
you're basically taking a bunch of values, and you're coalescing them to produce a single
scalar value
简单来讲就是，我们拿到⼀堆值，然后将它们合并在⼀起，然后⽣成⼀个标量值
38:40 - 38:42
So with sorting the nice thing about it is that
So，在sorting中最棒的事情就是
38.42-38.43
because the data is sorted
那就是数据都是排好序的
38.43-38.46
as I said when we take a pass now through the sorted output
正如我之前说的，当我们对排好序的输出结果进⾏扫描时
38:47 - 38:50
We don't have to backtrack to compute aggregation
我们不需要回过头去进⾏聚合计算
38.50-38.53
and we only do one pass to find to compute whatever the answer it is that we want
我们只需要⾛⼀轮就能算出我们想要的答案
38:55 - 38.56
So let's see a real simple query here
So，我们来看下这个很简单的例⼦
38.56-39.01
we want to do it we're doing we're doing a scan on the enrolled Table
我们想对enrolled表进⾏扫描
39:01 - 39:04
All right, a bunch of students erolled in the classes the database classes at CMU
可以看到有⼀群学⽣上了CMU的数据库课程
39:05 - 39:12
And we would we always want to get the all the distinct course IDs from any class where
a student either got a B or C in it
我们想拿到任意⼀⻔课下，学⽣拿到的成绩为B或者C的所有不同的course id
39:12 - 39:14
And we want the output to be sorted based on the course ID
我们想得到的输出结果是根据course id进⾏排序的
39:15 - 39:20
So the very first thing we're going to do in our query plan tree is do the filter
So，在我们的查询计划树中最先要做的事情就是过滤
39:20 - 39:25
So we're gonna first filter out all the tuples where the grade is not B or C
So，⾸先我们要过滤出所有grade不是B或者C的tuple
39:26 - 39:30
Then the next step we're going to do is remove all the columns we don't need in our
output
接着，下⼀步我们要做的就是移除我们输出结果中不需要的列
39:31 - 39:32
Right, we only need the course ID
我们只需要course id这⼀列
39:33 - 39:36
We only need the course ID to do the order by and for the distinct clause
我们只需要course id，并⽤它来进⾏Order By操作，以及⽤在DISTINCT⼦句上⾯
39:37 - 39:39
Because for our filter it access the grade table
因为对于我们的filter来说，它访问了grade表
39.39-39.41
at that point we know in our query plan ,
此时，我们知道，在我们的查询计划中
39:41 - 39:44
We don't need to ever look at the grade column anymore,
我们不需要去看grade列
39:44 - 39:46
We don't need to look up a student ID anymore
我们也不需要再去查找student id
39:46 - 39:49
So if we can strip all that out before we move on to the next operator
在我们进⾏下⼀个operator操作前，我们可以将这些不需要的列给移除
39:51 - 39.56
And then we finish off now by sorting on sample column here
现在，我们就已经对这⾥的示例列完成了排序
39.56-40.00
and because we're doing a distinct aggregation or distinct clause
因为这⾥我们做了distinct聚合操作或者说⽤了distinct⼦句
40.00-40.03
we want to remove any duplicate values
我们想移除所有重复值
40:03 - 40:06
So all we need to do is just have our cursor scan through this
So，我们所要做的就是通过游标去扫描这⼀列
40:06 - 40:11
And any time it finds a value where that was same same as the one I just looked at
只要它找到的值和我之前看到过的值⼀样
40.11-40.12
that knows it can throw it away
那么，它就可以将看到的这个值给丢掉了
40.12-40.16
and strip that out and that's our final output
去掉这些重复的值，剩下的就是我们的最终输出结果
40:18 - 40:24
So we'll go into this more next week when we talk about query planning
So，在下周讨论查询计划的时候，我们会对它进⾏深⼊讲解
40:24 - 40:29
But just one obvious thing during this in this pipeline we execute the query that I did,
was
但当我们在执⾏查询的这个pipeline 中，有⼀点很明显
40.29-40.35
I try to strip out as much useless data as possible sooner in my pipeline rather than later
我会试着在我的pipeline中尽早的去移除尽可能多的⽆⽤数据
40:36 - 40:38
So the very first thing I did was the filter
So，所以我在⼀开始就做了过滤处理
40.38-40.42
so say you know say this table had a billion records in it
假设，这个表中有10亿个record
40:42 - 40:47
But only five of them match or 4 of them match for my predicate
但只有其中的四五个record符合我的条件
40:47 - 40:52
So rather than me sorting a billion records first then going back and filtering it
So，与其我先对这10个record进⾏排序，然后再进⾏过滤
40:52 - 40:57
It was better for me to filter it first, then move the data on to the next operators
那还不如先过滤，再把数据传给下⼀个operator，这样做会更好
40:58 - 41:00
Same thing for the projection, right
对于projection也是同样如此
41:00 - 41:02
This is a row stored it's not a column store in my example
在我的例⼦中，我们⽤的是⾏存储⽽不是列存储
10-03
41:03 - 41:08
So in order for me to go get the data I need to do you know whatever the sorting I want
to do
So，为了能让我拿到⽤来进⾏我想做的任意排序的所需数据
41:08 - 41:11
I gotta go get the entire I mean the entire record
我会去拿到整个record
41.11-41.12
because that's gonna be packed together in a single page
因为它们被⼀起打包在⼀个单个page中
41:13 - 41:14
But if I can do a projection
但如果我能做projection （知秋注：即Select要查的那⼏个属性映射的数据）
41.14-41.18
i can strip out all the columns I don't need or the attributes, they don't need
我就可以剥离出所有我不需要的列或者属性
41:18 - 41:22
And then now when I'm doing my sorting ,I'm not copying around a bunch of extra Data
接着，当我进⾏排序时，我并不会去复制这些额外的数据
41:22 - 41:26
So my sort of sort of simple examples and was related to her question
So，我这个简单的案例其实是和她的问题有关联的
41:27 - 41:30
The you know what a might be actually passing around
这⾥实际可能是什么呢？
41.30-41.37
it could be the record ID ,it could actually be the entire tuple itself, depending on how I
want to materialize things
这⾥可能是record id，也可能是整个tuple⾃身，这取决于我想怎么实现
41:37 - 41:39
So the projection here allows me to throw away columns I don't need
So，projection允许我将不需要的列给扔掉
41:40 - 41:42
So now when I'm doing my sorting
So，现在当我进⾏排序时
41.42-41.48
I'm copying things that just related to what's needed for the rest of the query plan
我只复制查询计划剩下部分所需要的数据
41:49 - 41:49
Yes
请讲
42:12 - 42:14
So his question is
So，他的问题是
42.14-42.18
I mean it's not really this query, you're talking like a count query
你说的并不是这个查询，⽽是查询count
42:18 - 42:19
So this question is
So，他的问题是
42.19-42:30
the the grade column is has a fixed domain ，meaning, it's a B C D or E ,I don't think
see me a S does it in this place,right
这⾥的grade列是⼀个固定的字段，它⾥⾯的值是A，B，C，D或者E，这⾥应该没有S
42:29 - 42:30
You have an completes, right
42:30 - 42:31
But it's fixed
但它是固定的
42.31-42.34
oh there's another S one that's whatever
它这⾥⾯可能还有⼀个S，但不管了
42:34 - 42:39
The problem is when I go putting your grades, I can't tell whether you're an undergrad or
graduate student
现在问题在于，当我去填你们的分数的时候，我没法说出你是⼀个本科⽣还是⼀个研究⽣
42:39 - 42:42
So I'm like oh this student got you know did awesome to get an A+
但我会这么说，这个学⽣很⽜逼，拿到了⼀个A+的成绩
42:42 - 42:43
But then it throws an error
但之后这⾥就抛出了⼀个错误
42.43-42.50
because they're an undergrad, undergrads can‘t get A+, unless you're ECE which I think
you can,it's a nightmare, but anyway
因为他们是本科⽣，本科⽣不可能拿到A+。除⾮你是ECE专业的学⽣，那么我觉得你可以拿到
A+，虽然这算是⼀种噩梦对你们来说
42:50 - 42.52
So his question is all right
So，他的问题是
42.52-43.01
so couldn't I have some kind of sid table that has a tally that keeps track of every single
time I inserted a tuple with one of these values
So，这⾥我能否通过⼀个sid表来跟踪每次我插⼊tuple时它⾥⾯的值？
So，我有⼀张sid表，我是否可以有⼀个东⻄⽤来跟踪往表中插⼊的每⼀个tuple,
43:01 - 43:04
I'm trying to maintain a counter number I increment that counter by one
我会试着维护⼀个counter，每插⼊⼀次，counter值就加⼀
43:14 - 43:15
Within a page
是在⼀个page内
43:25 - 43:29
All right, so what he's saying is
So，他所说的是
43.29-43.31
say this was stored in a page
他表示，这张表是存储在⼀个page内的
43:33 - 43:35
This this little example here is in one page
因为这是⼀个⼩例⼦，所以它是放在⼀个page内的
43:36 - 43:37
And then for the grade column
接着，对于这个grade列来说
43.37-43.41
I could keep track of the Min and Max value ,so this case B or C
我可以去跟踪它⾥⾯的最⼤值和最⼩值，在这个例⼦中是B和C（这个范围是我们⾃⼰定的）
43:42 - 43:45
So now if I'm say I'm looking for all people that have the grade A
So，假设现在我想去找到所有成绩为A的⼈
43:45 - 43:47
If I get to that page
如果我拿到这个page
43.47-43.50
and I look say oh why it's only between B and C
为什么上⾯的⼈成绩只有B和C呢？
43.50-43.52
because nobody has an A in that page
因为在这⼀个page上，没有⼈拿到A
43.52-4.357
I don't mean even bother looking at the column that's what you're saying, right
我甚⾄都不需要去看这⼀列了，这是不是就是你要说的？
43:57 - 44:02
Okay, I I think we are talking about the same thing what you're describing called zone
maps
Ok，我觉得我们讨论的是⼀回事，你所描述的东⻄叫做Zone Maps
44:02 - 44:08
Right, well we will talk about this I think next week or this week I forget when
Well，我们会在这周或者下周来讨论这个，具体看时间来定
44:08 - 44:14
But basically there's a way to keep track of yourself on auxiliary data structure on the
side that he looked at that first
基本上来说，你可以通过设定⼀个辅助数据结构来让你知道这是否需要在这个page上去遍历
44:15 - 44:17
And then you check the page, yes
然后，你就会去检查这个page
44:17 - 44:18
So that's a zone map
So，这就是⼀个Zone map
44.18-44.24
you could or could not be in the same page you could have a separate page ,but within
the page
Zone map可以在同⼀个page中，也可以在多个分离的page中，但在这个page中
44:24 - 44:29
But it's basically a precomputed information to say the data you here's the range of data
that could possibly exist for each attribute
但简单来讲，这⾥预先计算好的信息会告诉你每个属性可能存在的数据范围是多少
44:29 - 44:33
And you refer to that first and make decisions whether you didn't even go further
然后，你会先通过它看⼀看，然后再决定是不是要进⾏更进⼀步操作
44:33 - 44:38
Yes, so those are called zone maps, they're called pre, Oracles called zone maps
So，这些叫做Zone maps，在Oracle中是这么叫的
44:38 - 44:46
Tremendous a call a pre computed pre-compute materialized aggregation sometimes,
different systems do different things
有时这也叫做 pre-compute materialized aggregation，不同的系统有不同的叫法
44:46 - 44:48
But that does exist, we'll cover that later, yes
这个属于我们要讲的范畴，之后我们会对它进⾏介绍
44:55 - 44.55
That's an index,
这是⼀个索引
44.55-44.58
right, that's what it index does
这是索引所做的事情
44.58-45.02
you talk about how my something more fine like like not an index, I think right
我觉得你更多讨论的并不是索引⽅⾯所做的事情
45:03 - 45:05
Yeah, that's a zone map when you're describing is in index
这其实是Zone map所做的事情，但你把它当作索引来描述了
45:08 - 45:13
And again the the beauty of a declarative language like SQL is that
拿SQL来讲，这种声明式语⾔的美妙之处在于
45.13-45.15
I write My SQL query like this
⽐如我写了这样⼀个SQL查询
45:15 - 45:17
I don't know whether I'm using zone maps
我不清楚我是否要去使⽤Zone Map
45.17-45.19
I don't know whether I'm using an index
我也不知道我要不要去使⽤索引
45.19-45.20
I don't care
我并不清楚这些
45.20-45.24
the databases will figure out what's the best strategy for me to go find the data that I
want
数据库会帮我们弄清楚查找我想要的数据的最佳策略
45:24 - 45:31
Right, so just trying to try never move is is crap quickly as possible, that's the whole goal
of all this
它会尽可能快的放弃那些⽆须去看的策略，这就是它的⽬标所在
45:34 - 45:37
Alright, so that was a change about zone maps we'll cover that later
我们会在后⾯去涉及zone maps
45:39 - 45:41
The main point I want the main takeaway from this was
我们从此处可以学到的重点是
45.41-45.45
if I'm sorted ，I do one pass and I can eliminate the duplicates
如果我花了⼀轮时间来排序，那么我就可以消除重复项
45:46 - 45:48
All right, in this example here
在这个例⼦中
45.48-45.52
this worked out great for us, because the output need to be sorted on a course ID
这种做法对我们来说很棒，因为我们需要根据course id来对输出进⾏排序
45:52 - 45:59
So I was it was two for one, I did my sorting, because that's the output I needed ,but
then I'm also in the sort order I need for my output
so 我需要对这两步得到的结果进⾏排序，得到的输出就是我想要的结果
46:00 - 46:00
Right
46:01 - 46:02
So in this case here
So，在这个例⼦中
46.02-46.06
doing a sorting based aggregation is a definite win for us
这就是我们完成基于这个聚合函数所做的排序
46:06 - 46:08
But in many cases
但在许多例⼦中
46.08-46.09
we don't actually need the output to be sorted
实际上，我们并不需要排好序的输出结果
46:11 - 46:11
Right
46:12 - 46:14
So again you still can use sorting for this
So，你依然可以对输出结果进⾏排序
46.14-46.18
like you can do for group by and and and doing distinct stuff
这⾥，你可以使⽤GROUP BY，也可以使⽤DISTINCT
46:18 - 46:20
But if you don't need to be sorted
但如果你不需要排序
46.20-46.21
then this actually might be more expensive
那么这实际上代价会更加昂贵
46.21-46.24
because again the sorting process itself is not cheap
因为它⾃身排序过程所付出的代价并不低（知秋注：这种⽅式下，GROUP BY与DISTINCT内部
也是会进⾏排序操作的，如果事先做好排序了，也就不需要进⾏它们内部这些排序操作了）
46:25 - 46:27
So this is where hashing can help us
So，对此场景，hashing能帮助我们
46:29 - 46:36
So hashing is a way for us to be able to sort of again another divide and conquer
approach
So，hashing是另⼀种分治的⽅法
46.36-46.38
where we can split up the data set
通过它，我们可以对数据集进⾏拆分
46.38-46.45 ******
and guide the tuples or the keys that were examining to particular pages
并将正在检查的tuple或key引导到特定page中
46:45 - 46:48
And then do our processing in memory on those pages
然后，在内存中对这些page进⾏我们想要的处理
46:49 - 46.55
But again hashing removes all all locality all any sort ordering
但hashing这种⽅式会移除所有的局部性，以及排序顺序
46.55-46.58
because it's taking any key and do you know doing some hash function on it
因为它会拿到key，然后对该key进⾏hash处理
46.58-
and now it's going to jump to some random location
接着，它就会跳到某个随机位置
47:01 - 47:03
So this works great
So，这种⽅式很棒
47.03-47.03
if we don't need sorting
如果我们不需要排序
47.03-47.06
we don't think don't need things to be ordered
那么，我们就不需要让这些数据是有序的了
47:07 - 47:09
So the way we can do a hashing aggregate is
So，我们进⾏hashing聚合操作的⽅法是
47.09-47.17
we're gonna populate an ephemeral hash table, as the database system of some scans
the table or scans whatever our input is
当DBMS对表进⾏扫描时，我们会把这些输⼊填充到⼀个临时的hash table
我们会将从DBMS对表进⾏扫描所得到的输⼊，填充到⼀个临时的hash table中
47:17 - 47:22
Hey and then say we you know when we do our lookup
当我们进⾏查找时
47.22-47..24
depending on what kind of aggregation we're doing
取决于我们所做的聚合操作类型
47:25 - 47:28
If we do an insert and the key is not there, then we populate it
如果在插⼊⼀个key时，key并不在⾥⾯，那么我们就将它填充到这个临时hash table中去
47:28 - 47:30
If it is there
如果key在那⾥的话
47.30-47.35
then we may want to modify it ,or modify its value to compute whatever the aggregation
that it is that we want
那么，我们可能会想去对它进⾏修改，或者对它的值进⾏修改，以此来计算出我们想要执⾏的聚
合操作的结果
47:35 - 47:37
Right, for distinct
在DISTINCT中
47.37-47.40
it just a hash see whether it's in there
它是通过hash的⽅式来看这个key是否在⾥⾯
47.40-4742
if it's is,then I know it's already I it's a duplicate
如果它在⾥⾯，那么我就知道这是⼀个重复的key
47.42-47.44
so I don't bother inserting it
So，我不⽤再将它插⼊了
47:44 - 47:45
For the group by queries
在⽤到GROUP BY的查询中
47.45-47.47
for the others other aggregations
以及其他聚合操作来说
47.47-47.52
you may have to update a running total and what we'll see an example of this
你们可能会去更新RUNNING_TOTAL，之后我们会看到关于这个的⼀个例⼦
47:52 - 47:56
So this approach is fantastic if everything fits in memory
So，如果所有数据都能放在内存中进⾏处理，那么这种⽅法就很棒
47:58 - 48:00
So the key thing I'm saying up above
So，我之前就说过⼀个很重要的事情
48.00-48.03
I'm saying it's an ephemeral hash table not an emery hash table
我说过，它是⼀个临时（ephemeral ）的hash table，它并不是⼀个永久的hash table
48:03 - 48:05
So ephemeral or transient means that
So，ephemeral或transient（短暂）意味着
48.05-48.08
this is a hash table I'm gonna build through my one query
我所构建出的这个hash table只⽤于这个查询中
48:09 - 48:11
And then when that query is done I throw it all away
当这个查询结束的时候，那我就可以把它给扔了
48.11-48.13
I'm gonna do this for every single query
我可以对每个查询都做这种事情
48:14 - 48:16
I said that we said in the very beginning
我在⼀开始的时候就说了
48.16-48.18
we use data structures in different ways of the database system
我们会在数据库系统的各个⽅⾯使⽤数据结构
48.18-48.20
so there's the example of a transient data structure
So，这就是⼀个关于临时数据结构的案例
48:20 - 48:23
I need it for just my one query, I do whatever I want then I throw it away
我只会在⼀个查询中使⽤这个临时数据结构，当我做完我要做的事情，我就可以将这个数据结构
扔了
48:24 - 48:25
So if everything is in memory
So，如果所有东⻄都在内存中
48.25-48.26
the hash tables fantastic
那么使⽤hash table就会很棒
48.26-48.31
because it's O(1) lookups to go update things
因为它在查找和更新这⽅⾯的复杂度是O(1)
48:31 - 48:33
Right, in this case you're also not doing deletes
在我这个幻灯⽚上的例⼦中并没有做删除操作
48:34 - 48:36
Right, it's just inserting things or updating things
这⾥只涉及了插⼊和更新操作
48:37 - 48:40
If we need to spill a disk though
如果我们需要将数据溢出到磁盘
48.40-48.41
now we're screwed
那我们就完蛋了
48.41-48.44
because now that this random randomness is gonna hurt us
因为这种随机性对我们来说很糟糕
48:44 - 48:48
Because now I'm jumping around to different pages or blocks in my hash table
因为我现在要跳到我的hash table中的不同page或者是block中
48.48-48.50
and each one could be incurring an I/O
每跳转⼀次可能都会引起⼀次I/O
48:51 - 48:53
So we want to be a bit smarter about this
So，对此，我们需要点更加聪明的处理⽅式
48.53-48.58
and trying to maximize the amount of work we can do for every single page we bring
into memory
我们要试着最⼤化我们对每个放⼊内存中的page所做的⼯作量
49:00 - 49:02
So this is what external hashing aggregate does
So，这就是external hashing聚合操作所做的事情
49:03 - 49:08
And it's again the high level is the same way as the same technique that we did for
external merge sort
从⾼级层⾯来看，这和我们在外部归并排序中⽤到的是相同的技术
49.08-49.11
it's a divide and conquer approach
这是⼀种分治策略
49:11 - 49:13
So the first thing we're to go through to take a pass through our data
So，⾸先我们要做的就是传⼊我们的数据
49:14 - 49:16
And we're to split it up into a partition into buckets
然后，我们将数据拆分开来，并放⼊⼀个个bucket中
49.16-49.26
where so that all the tuples that are either the same that all tuples that are the same
had the same key will land in the same partition
所有具有相同key的tuple都会被放在同⼀个分区中
49:27 - 49:30
And then we go back through in the second phase
然后，我们进⼊第⼆个阶段
49:30 - 49:32
And now for each partition
现在，在每个分区中
49.32-49.33
we're gonna build an in-memory hash table
我们会去构建⼀个内存中的hash table
49.33-49.38
that we can then do whatever it is that the aggregation that we want to do
然后，我们就可以进⾏我们想做的任何聚合操作了
49:38 - 49:39
Then we produce our final output
然后，我们⽣成出我们的最终输出结果
49.39-49.42
throw that that a memory hash table away
并将这个内存中的hash table给扔掉
49.42-49.43
and then move on to the next partition
接着就去处理下⼀个分区
49:46 - 49:48
Ok, we're maximizing the amount of sequential I/O that we're doing
Ok，这样我们就最⼤化了我们所做的循序I/O的⼯作量
49:49 - 49:52
And for every single page we every single I/O we have to do to bring something into
memory
在进⾏每次I/O的时候，我们必须将数据放⼊内存
49:53 - 49:57
Then we do all the work we need to do on that one page before we move on to the to
the next ones
接着，在我们移动到下⼀个page之前，我们会在当前该page上做所有我们需要做的事情
49:58 - 50:00
So we never again never we never have to backtrack
So，我们永远不需要进⾏回溯（backtrack）
50:02 - 50:03
So let's go through these two phases
So，我们来看下这两个过程
50:04 - 50:05
So in the first phase again
So，在第⼀个阶段中
50.05-50.07
what we're trying to do is we're going to split the tuples up into partitions,
我们所试着做的事情就是将这些tuple拆分到不同的分区中去
50.07-50.10
that we can then write out the disk as needed
根据需要，我们可以将其写到磁盘中
50:11 - 50:13
So we're gonna use our first hash function it's just to split things up
So，我们要去使⽤我们的第⼀个hash函数来将数据进⾏拆分
50.13-50.19
,and again we use murmurhash ,city hash, xx hash 3 whatever it doesn't matter
我们可以去使⽤Murmurhash，CityHash，XXHash 3，但不管⽤什么都⽆所谓
50:19 - 50:21
And so the reason why we're doing this is that
So，我们之所以这样做的原因是
50.21-50.25
because our hash table hash function is deterministic
因为我们的hash函数是确定性的
50:25 - 50:29
meaning the same key will always be given the same hashed value output
意味着，对同⼀个key进⾏hash所得到的hash值永远是⼀样的
50:29 - 50:33
that means that tuples that have the same key will land in the same partition
这意味着具有相同key的tuple会落在同⼀个分区
50:34 - 50:39
And we don't need to hunt around for other parts of the the tablespace at the table to
find the same key
我们不需要去表中其他的表空间去寻找具有相同key的tuple
50.39-50.43
they're always gonna be in our one partition
这些具有相同key的tuple始终会在同⼀个分区中
50:43 - 50:47
Our partitions can just spill to disk using the buffer manager, when they get full
当这些分区存满了之后，我们可以通过buffer管理器，将它们写出到磁盘上
50:47 - 50:52
So so we have a page that we're storing the the current partition data
So，我们通过⼀个page来保存当前分区中的数据
50.52-50.53
when that gets full
当这个page满了
50.53-50.56
we just write that out to disk and start filling in the next page
我们会将这个page写出到磁盘上，并开始填充下⼀个page
50:57 - 50.58
So in this case here
So，在这个例⼦中
50.58-51.00
we're gonna assume we have B buffers
我们假设我们有B个buffer
51.00-51.03 ！！！！
and we're gonna use B-1 buffers for the partitions
然后，我们使⽤B-1个Buffer⽤来保存分区内容
51.03-51.05
and at least 1 buffer for the input
并使⽤⾄少1个Buffer来保存输⼊
51:07 - 51:09
So I'm gonna bring in one page from my table
So，我会从我的表中拿到⼀个page
51:09 - 51:12
And I'm going to ask sequential scan on that page look at every single tuple
然后，我会对该page进⾏循序扫描，以此来查看每个tuple
51:12 - 51:16
And then it's gonna write it out to B-1 partitions
接着，将它们写出到这B-1个分区中
51:17 - 51:21
Alright, because you need to have at least 1 buffer in memory for each partition
因为对于每个分区来说，你必须⾄少使⽤内存中的1个buffer来保存它
51.21-51.21
yes
请问
51:25 - 51:32
So if say I'm doing I'm gonna doing a group by on the course ID
So，如果我在Course id上使⽤Group By
51.32-51.35
here next slide
看这个幻灯⽚
51:35 - 51:39
I'm doing a group by on the course ID, I'm doing aggregation
我在Course id上进⾏了Group By，然后做聚合操作
51:40 - 51:44
So I'm gonna hash this course ID for every single tuple
So，我会对每个tuple的course id进⾏hash处理
51:44 - 51:47
If I had the same course ID, it's gonna Lane that in the same partition, so it's gonna live
there
如果是相同的course id，我就会让这些具有相同course id的tuple都放在同⼀个分区中
51:48 - 51:50
Right, reside live stored
就放在同⼀个分区中
51:51 - 51.55
And then that way when I want to go now do that in this case the duplicate elimination,
在这个例⼦中我想做的是去重
51.55-51.56
when I come back the second time,
当我再回来的时候
51.56-52.02
I know that the the tuples that go have the same key has to be in the same partition
我知道具有相同key的tuple会被放在同⼀个分区之中
52:02 - 52:04
There's not gonna be some other random place
它们不可能会放在其他的随机位置
52:06 - 52:07
His question is
他的问题是
52.07-52.11
it's partition to page no partition would be like it's a logical thing
这个分区其实看起来有点像是⼀个逻辑上的东⻄
52.11-52.16
take the hash value modded by the number of partitions and that were you write into
我们对key进⾏hash处理（通过使⽤分区的数量来对key进⾏取模）
52.16-52.18
and these partition can have multiple pages
这些分区可以使⽤多个page
52:21 - 52:25
Alright, so again we do our filter do as we did before, we remove our projection columns
So，在此我们进⾏以前做过的过滤操作，将其他列移除掉
52:26 - 52:31
And then now we take our all the output of here, we're gonna run it through our hash
function
然后将这⾥我们过滤出的值⽤第⼀个hash函数进⾏hash处理
52:31 - 52:34
And we write it out to the partition pages
然后我们将数据写⼊到它所对应的分区中的page⾥⾯
52:35 - 52:36
So in this case here，I'd B-1
So，在这个例⼦中，应该有B-1个分区
52.36-52.40
so say there's like four or five ,I'm showing three here
So，这⾥应该有4或5个分区，但我只展示了3个
52:40 - 52:46
So all the 15-445 keys land here,all the 15-826 land here ,at 15-721 lend here
So，所有key为15-445的数据会落在这⾥，15-826会落在第⼆个分区，15-721会落在第三个
分区
52:47 - 52:50
So again you could be smart about this
So，你们应该可以聪明的处理这个
52.50-52.52
and say alright well I know I'm doing doing distinct
Well，这⾥我使⽤了DISTINCT去重
52:52 - 52:53
So within my page
So，在我的page中
52.53-52.58
if I see the same thing then don't bother putting it into it
如果我看到了相同的东⻄，那么我就不⽤费⼼去将它放进这个分区了
52:58 - 52.59
But for simplicity reasons
但为了⽅便起⻅
52.59-53.01
we're blindly just putting it in
我们就把这些东⻄都塞进去就⾏了
53.01-53.02
yes
请讲
53:05 - 53:07
Question is what is it partition
她的问题是，分区是什么
53:08 - 53:15
You can think of like a partition is thinking like it's like the the bucket chain and the
chain hash table
你可以将⼀个分区当成⼀个bucket chain，或者是chain hash table（知秋注：参考Java中
hashmap通过Entry这个接⼝实现的node所做chain）
53.15-53.19
you just have within a chain you could have multiple pages
在⼀个chain中，你可以有多个page
53:19 - 53:22
But I only have one page in memory as I'm populating this
但当我进⾏填充数据时，在内存中我只有⼀个page
53:23 - 53:27
Because again for everything every single time I'm gonna cache something and insert it
into this
因为每次我进⾏缓存并往缓存⾥⾯插⼊数据时
53.27-53.29
I'm only inserting into one page
我只会往⼀个page中插⼊数据
53.29-53.30
and when this gets full
当这个page满了的时候
53.30-53.32
I guess again written out to disk
我会将这个page写出到磁盘
53:32 - 53:35
And I now allocate another one that I start filling up
现在，我就得再分配另⼀个page，然后往⾥⾯填充数据
53:35 - 53:39
So within memory why I'm doing this first phases, I only need B-1 pages
在内存中，执⾏第⼀阶段的时候，为什么我只需要B-1个page呢？
53.39-53.40
because I'd B-1 partitions
因为我的分区数量是B-1
53.40-53.51
what is the number of distinct course id is larger than the number of buffer in the
memory？
如果去重后的course id的数量⼤于内存中buffer的数量会怎么样？
53:51 - 53:55
So this question is what if the number of distinct course IDs
So，他的问题是如果去重后的course id数量.......
53.55-54.00
I dont have enough buffer for the distinct course id. So。。。
我并没有⾜够的buffer来保存去重后的course id。So。。。
53:59 - 54:01
You do, because you're hashing it, right
你有啊，因为你对它做了hash处理
54:02 - 54:06
You're dating - mod to take this hash value mod by B-1
因为你对key进⾏了hash处理，使⽤B-1对它进⾏取模
54:07 - 54:10
So in this example here I'm only showing three distinct keys
So，在这个例⼦中，我只展示了3个去重后的key
54:11 - 54:12
But like I have another class
但⽐如我有另⼀⻔课
54.12-54.17
15-410 back at land in the same bucket as 15-445
15-410这⻔课的tuple也落在了跟15-445同⼀个bucket中
54:18 - 54:21
I don't need to have a partition for every distinct key
我不需要⽤⼀个分区来保存每个去重后的key所对应的数据
54:22 - 54:25
The hashing allows them to go into the same thing
hash处理会允许它们都落到⼀个位置上
54:27 - 54:29
Your face looks like you'd like this confused by this
从你的表情我可能看出你对于这个很困惑
54:31 - 54:36
Right, again so I have 15-410, I'm gonna hash it,
再说⼀遍，我有15-410，我对它进⾏hash处理
54.36-54.40
I'm mod on it by B-1 ,it lands in partition 0
我使⽤B-1对它进⾏取模，它落在分区0上⾯
54:41 - 54:44
And so I just append it to this to this page
So，我将它追加到这个page上
54:45 - 54:50
Right, and then the main thing is that 15-410 can't exist in any other page,
接着，现在的主要问题在于15-410不能存在于其他任何page中
54.50-54.57
because the hash function always guarantee that it's always gonna point to this one
因为hash函数始终保证15-410指向的始终是分区0这个位置
54:57 - 55:00
If the current page with this partition overflows
如果该分区的当前page溢出了
55.00*-55.02
,I write it out the disk,
我就会将这个page写出到磁盘
55.02-55.04
and I allocate a new page and start filling that up
然后分配⼀个新的page，并对它开始填充数据
55:10 - 55:13
Yeah, flush the page allocate a new one, yes
没错，将page刷到磁盘，并分配⼀个新的page
55:15 - 55:19
And again like at this phase all we're doing is this partitioning
再说⼀遍，在这个阶段，我们所做的就是分区
55:19 - 55:23
So I don't care like I can be smart and say oh I'm doing duplicate elimination,
So，我可以这么说，我正在进⾏去重操作
55.23-55.25
I know I already have 15-445 over here,.
我知道我在那⾥已经有了15-445
55.25-55.26
I put it in
并且我将它放在了这个分区⾥
55.26-55.27
ignore that for now
现在先将它忽略
55:27 - 55:33
Right,it's just I'm blindly putting things into this to the pages and writing them out
现在我只是盲⽬的将东⻄放到page中，并将page写出到磁盘
55:38 - 55:38
Yes
没错
55:42 - 55:43
Yes so so this question is
So，他的问题是
55.43-55.50
it's getting written out the disk where am I storing the metadata that says oh partition 0
has these pages
当page写出到磁盘的时候，我该将元数据放在哪，该元数据表示分区0中有这些page
当page写出到磁盘的时候，我该将元数据放在哪，我会说，oh，分区0中有这些page
55:50 - 55:53
You had that in memory data structure
在内存中的数据结构⾥，你会有这个元数据
你可以通过内存中的数据结构来获知
55.53-55.56
you keep track of like partition 0 here's the page 4
当你查看这个元数据时，你会看到，⽐如在分区0中，这⾥是page 4
当你查看后，你会看到，⽐如在分区0中，这⾥是page 4
55.56-55.58
partition 1 here's the pages for it
然后，这⾥是属于分区1的page
55:58 - 56:00
But that's small right that's like that's nothing
但这个元数据很⼩，⼏乎不占什么地⽅
但这个内存数据结构很⼩，⼏乎不占什么地⽅
56:03 - 56:05
This question is are we not considering collisions
他的问题是我们要不要考虑hash碰撞
56.05-57.07
we don't care at this point
现在我们并不⽤关⼼这个
56:09 - 56:09
Right
56:10 - 56:14
It's in actually maybe use another table than distinct maybe that's following people
实际上我们可能会去⽤另⼀个表
56:15 - 56:17
But if I'm doing a you know a count
但如果我做的是COUNT
56:19 - 56:21
Again, you can do that more efficiently as well
再说⼀遍，你可以做的更加⾼效
56.21-56.24
but like like I don't care putting in inside of this,
但我并不在意将东⻄放在这⾥⾯
56.24-56.25
I don't care this collision scope,
我也不在意碰撞范围
56.25-56.28
because I'm gonna resolve that in the second phase, when I rehash things
因为我会在第⼆个阶段的时候解决这个问题，即当我进⾏重新hash的时候
56:35 - 56:39
Your question is where is this number coming from B-1
你的问题是，B-1这个数字是哪来的
56:40 - 56:43
So that's the database system telling this query
So，这个数字是由数据库系统告诉这个查询的
56.43-56.45
that's whatever thread or worker that's existing these queries,
不管这些查询中有多少线程或者是worker（知秋注：在线程池中我们会包装worker⽤于任务调
度）
56.45-56.48
you have this amount of memory to use for query processing
在查询处理这块，你所使⽤的内存量得有这么多
56:57 - 57:06
Yeah, so like the database system says you're allowed to have B equals 100 pages to do
whatever you want to do for execute the query to execute this algorithm
So，数据库系统表示，它允许你使⽤B个buffer（总共包含100个page）来执⾏你想在该查询或
算法中所做的事情
57:06 - 57:11
I'm gonna use B-1 to store my part I'll B-1 partitions
我会使⽤B-1个分区
57.11-57.12
because these partition will have one page
因为每个分区都会有⼀个page
57:15 - 57:19
Yeah, it sucks yeah your question is if B is really small---,yes
你的问题是，如果B真的很⼩的话，确实会发⽣这种情况
57:21 - 57:22
Right, there's nothing you can do
对此，你⽆能为⼒
57.22-57.27
it's not it's not like you might you know you can't magically just add more memory right
justifying that resource
你没法⽆中⽣有地去添加更多内存，你只能去调整资源
57:28 - 57:35
The database system you know is the is is doing resource management it's deciding, oh I
have a lot of queries that need to execute at the same time
数据库系统会去进⾏资源管理，⽐如：它会说，在同⼀时间它需要去执⾏⼤量的查询
57:35 - 57:37
So therefore I can't let them all have a lot of memory
因此，我不能让它们都使⽤⼤量的内存
57:38 - 57:41
So this gets into the tuning side of things which is actually very difficult as well
So，这就属于调优⽅⾯的内容了，实际上这块内容也⾮常难
57:42 - 57:42
Yes
请讲
57:51 - 57:53
Ok so he says
So，他表示
57.53-57.55
and I don't have slides with this we'll do it next class
尽管我并没有关于他所提问问题的幻灯⽚，但这个我们下节课会看到
57:55 - 57.57
He said that
他表示
57.57-58.01
you're screwed let me rephrase what you said
你这说的有点混乱，让我重新组织下你说的东⻄
58.01-58.06
you're screwed are you better if everything hashes is this bucket
如果所有的东⻄都hash到了这个bucket中
58:07 - 58:12
So say this is this is most popular course on Campus everyone's taking 15-445, right
So，⽐⽅说， 15-445是校内最热⻔的课程，每个⼈都学这⻔课
58:13 - 58:16
Then as I hash everyone lands there then I'm screwed,right
然后，我将所有数据进⾏hash，然后它们都落在15-445所对应的bucket中，然后我就凌乱了
58:17 - 58:19
But again this gets into the query planning side of things
但再说⼀遍，这是查询计划中的内容
58.19-58.27
the database system could look at ,and say oh I know what the distribution of values are
for for this column and everyone is taken 15-445
数据库系统会去查看，并表示它知道该列的值的分布情况，所有⼈都学了15-445
58:27 - 58:29
So therefore if I do this technique
因此，如果我使⽤了这个技术
58.29-58.33
then I'm it's not gonna get any benefit
那么我不会得到任何好处
58.33-58.35
because everything's gonna hash to this and it's always to work
因为所有东⻄始终会hash到这个分区中，并且这始终有效
58:35 - 58:37
I might as well just do ask seqential scan
我可能会去进⾏循序扫描
58:40 - 58:41
This question is
他的问题是
58.41-58.42
you always don't know about the data
我们永远都不知道这数据是什么
58.42-58.46
like you know a good database system will know something
⼀个优秀的数据库系统会知道⼀些事情
58:46 - 58:49
It won't be entirely accurate ,but it'll know something
虽然它所知道的东⻄并不完全准确，但它确实知道些东⻄
59:02 - 59:04
So this statement is
So，他想说的是
59.04-59.09
like with the full data set, these can be this be unskilled ,but then this is skilled
像这种全都hash到⼀个分区的data set，这些好像不好处理，但处理起来没问题的
59:10 - 59:12
Again this is this is next week or two weeks
这是下周或者下下周的内容
59:14 - 59:18
The database system can maintain metadata about every single column
数据库系统可以对每个列的元数据进⾏维护
59.18-59.24
histogram sketches I do an approximation of what the distribution of value being about
looked like
⽐如，我可以使⽤直⽅图，草图之类的来⼤致看下值的分布情况
59:24 - 59:28
Again for skewed workloads that's harder
如果是不均匀的workload，那就更难了
59.28-59.29
you got a call
你有来电？（知秋注：提问的学⽣出去接电话了）
59:29 - 59:35
All right, he's got a call yeah all right sorry
他去接电话了
59:35 - 59:37
All right, so for simplicity
⽅便起⻅
59.37-59.40
I'm just saying assume uniform distribution
我会假设它们分布的⽐较均匀
59:40 - 59:41
Okay
59.41-59.43
for skewed work
对于某些不均匀的workload来说
59.43-59.46
again they'll be assert up to a certain point where this technique won't work
在某种程度上，这种技术并不起效
59.46-59.49
and sequential scan will be the better approach
循序扫描则会是更好的⽅案
59:49 - 59:49
Yes
请问
59:53 - 59:56
This question is what is the overhead of removing columns
他的问题是，移除列的开销是怎么样的
59:57 - 01:00:02
So in in this example here
So，在这个例⼦中
1.00.02-1.00.08
I'm showing this as like discrete steps like filter and then remove
这⾥我所展示的步骤并不是⼀⽓呵成的，这⾥我先进⾏过滤，再进⾏移除
1.00.08-1.00.11
you can inline a combine these together
你们可以将这两个步骤放在⼀起处理
01:00:11 - 01:00:13
But again this is another great example there's a trade-off
但再说⼀遍，这是另⼀个很棒的例⼦，它⾥⾯存在着某种取舍
01:00:13 - 01:00:16
So if my table is massive
So，如果我的表很⼤
1.00.16-1.00.22
and I know that I don't need all the columns up above a tree
我知道这⼀点，并且我不需要这棵树上的全部的列
1.00.22-1.00.26
, then it's totally worth it to me to pay the penalty to do this projection
对我来说，为了去做这个projection⽽付出代价是完全值得的
1.00.26-1.00.28
because essentially copping data
因为本质上来讲，就是拷⻉数据
01:00:28 - 01:00:29
But if I only have one tuple
但如果我只有⼀个tuple
1.00.29-1.00.34
then I'll delay that that may be the projection as late as possible
那么我就会尽可能延迟projection操作
1.00.34-1.00.37
because that's gonna be it's just cheaper to do at the very end
因为在最后进⾏这种操作的话，代价会更低
01:00:38 - 01:00:42
All right,there's a tree how wide and how tall the table is,
这是⼀颗树，它表示了这张表有多宽和多⾼
1.00.42-1.00.46
and again the database system can figure this out attempt to
数据库系统会去试着弄清楚这⼀点
01:00:48 - 01:00:51
Ok, so what we're doing here in the first phase
Ok，So我们在第⼀阶段所做的事情是
1.00.51-1.00.56
where we're taking the course ID, we're hashing it, we're putting into these pages for
the partitions
我们拿到course id，并对其进⾏hash处理，然后将它放⼊分区中的这些page⾥⾯
01:00:57 - 01:01:02
so now in the second phase we rehash for every single partition
So，在第⼆个阶段中，我们会对每个分区进⾏重新hash
01:01:03 - 01:01:07
now,we're gonna bring them bring the the pages in right
我们将这些page放⼊内存
01:01:07 - 01:01:14
and then we're gonna build an in-memory hash table, that we can then use to find that
the same keys
接着，我们会在内存中构建⼀个hash table，这样我们就可以⽤来找这些相同的key
01:01:16 - 01:01:17
so we don't have to do this
So，我们不需要这样做
1.01.17-1.01.20
we could just bring in every single partition and do sequential scan on them
我们可以进⼊每个分区，并对每个分区进⾏循序扫描
01:01:20 - 01:01:22
but because we're doing aggregations
但因为我们正在做聚合操作
1.01.22-1.01.30
we know that we don't need to have all of the duplicate keys in memory at the same
time
我们知道，我们不需要将所有重复的key都同时存放在内存中
10-04
01:01:31 - 01:01:34
So we're using a hash table to summarize it
So，我们会使⽤⼀个hash table来对它进⾏总结
1.01.34-1.01.40 ***
and could condense it down to just the bare minimum information that we need to
compute our result
我们可以将其压缩为我们要计算结果所需的最少信息
01:01:40 - 01:01:43
And again the reason why we did the partitioning first is that
再说⼀遍，之所以我们要先进⾏分区的原因是
1.01.43-1.01.46
when we go back in the second phase and we do rehashing
但我们进⼊第⼆个阶段，进⾏重新hash的时候
01:01:46 - 01:01:50
We know that all the keys that are the same will exist in the same partition
我们知道，所有相同的key都会在同⼀个分区（知秋注：这个分区⾥包含的key可能会有所不
同，但相同的key铁定在这同⼀个分区⾥，这⾥的⼀个分区⾥只有这⼀种key）
01:01:50 - 01:01:54
So once we go through all the pages within that partition
So，⼀旦我们扫描该分区内的所有page时
1.01.54-1.01.56
we compute whatever the answer that is that we want
我们会去计算我们想要的答案
01:01:57 - 01:01:59
We can potentially throw it that hash table away
然后我们可以将这个hash table扔掉
01:02:00 - 01:02:02
Because we know that already produce it as an output
因为我们知道它已经⽣成了⼀个结果
01:02:02 - 01:02:09
Because there's no that it's the keys that we've updated so far through that one partition
will never get updated again from any other partition
因为我们在该分区所更新过的key，永远不会在其他分区中被更新了
01:02:11 - 01:02:13
Because the hashing guarantees locality for us
因为hash处理为我们保证了局部性
01:02:14 - 01:02:16
All right, so back here
So，回到这⾥
1.02.16-1.02.18
right these are all the buckets we generated in the first phase
这些是我们在第⼀阶段⽣成的bucket
01:02:19 - 01:02:29
So let's say now that we can bring in ,you know we can bring in you know ,these two
pages or all the partitions for well we can process these two partitions in memory at the
same time
我们可以在内存中同时处理这两个分区
01:02:30 - 01:02:32
So all we're gonna do is just have a cursor
So，我们通过使⽤⼀个游标来处理
1.02.32-1.02.34
that can just scan through them
通过游标，我们可以扫描⾥⾯的数据
1.02.34-1.02.37
and every single key you're gonna hash it and populate the hash table
然后，对⾥⾯的每个key进⾏hash处理，并填充到这个hash table中
01:02:39 - 01:02:42
And I keep the scanning down and do the same thing for everything else
接着，我继续向下扫描，并对其他所有东⻄进⾏相同处理
01:02:43 - 01:02:46
And then now I produce this as my final result
现在，我就根据这个⽣成我的最终结果了
01:02:46 - 01:02:49
Again for some realize that may be confusing
对于某些⼈来说，这有点令他们困惑
1.02.49-1.02.52
the final result of this hash table or the is the same as this one
这个hash table的最终结果和另⼀个是⼀样的
01:02:53 - 01:02.59
But you know and the main takeaway is that we're gonna throw this away, when we
move on to the next the next partitions
但这⾥的要点在于，当我们移动到下⼀个分区时，我们就会把上⼀个分区的hash table给扔掉
1.02.59-1.03.01
right and this one we keep around
我们会去保留下⼀个分区的hash table
01:03:02 - 01:03:04
Distinct is like a little bit too simple,
Distinct可能看起来有点简单
1.03.04-1.03.08
but like I was trying to pick something, I just distill down the core ideas
但这⾥我只是想去提取出⼀些核⼼思想
01:03:08 - 01:03:10
Alright, so now we got this other partition here
So，此处我们还有⼀些其他的分区
01:03:10 - 01:03:15
So again we blow away that the hash table from the first the second first of partitions
So，⾸先我们要将之前的hash table给扔掉
1.03.15-1.03.18
we do the same thing build an im-memory hash table for this guy
接着，我们重复之前的操作，在内存中为这个分区构建⼀个hash table
01:03:18 - 01:03:20
And then we just when it's done with minutes populate this thing
当我们完成操作后，将数据填充到最终结果⾥⾯去
01:03:23 - 01:03:24
Yes
请问
01:03:28 - 01:03:29
A question her statement is
她想说的是
1.03.29-1.03.31
assuming we're not gonna have collisions in the second hash function
假设我们在使⽤第⼆个hash函数的时候，并不会遇上hash碰撞这种情况
01:03:33 - 01:03:35
You yes that we can,right
但其实我们是会遇上的
01:03:45 - 01:03:49
Her so her statement is question is what does that mean you be overriding this
So，她的问题是，我们是否会覆盖这个hash table
01:03:53 - 01:03:57
But it so that that does the collision handling schemes that we talked about we talked
about hash tables
你所问的东⻄，其实我们在讨论hash table的时候就讲过如何处理hash碰撞这类问题了
01:03:57 - 01:04:02
So it's either linear probing ,cuckoo hash whatever the Robin Hood stuff
So，我们可以⽤linear probing，Cuckoo hash或者Robin Hood之类的⽅法来处理这些
1.04.02-1.04.05
right that's all the internal to the hash table
这些都是hash table内部的东⻄
01:04:05 - 01:04:06
We're sort of above it now
我们现在所讨论的是在此之上的东⻄
1.04.06-1.04.11
we're saying your hash table I can write things into key value pairs and it'll it'll store them
for me
即，我们往hash table⾥⾯写⼊key/value pair，它会为我们保存这些数据
01:04:13 - 01:04:16
I don't know and I don't really care at this point how it handles collisions
我不知道，也不关⼼此时它是如何处理hash碰撞的
01:04:17 -01:04:17
Okay
01:04:18 - 01:04:22
Again, distinct is a really stupid simple example,
再说⼀遍，DISTINCT这个例⼦其实真的很简单
1.04.22-1.04.27
but you know going through those processes is it was main thing I what you guys get
但这些处理过程才是我想让你们今天学到的东⻄
01:04:30 - 01:04:35
His statement is the question is how is this faster than sorting
他的问题是，DISTINCT为什么要⽐排序来的更快
1.04.35-1.04.38
for this particular query probably not
对于这个查询来说，可能并不是这样
01:04:42 - 01:04:48
It depends on the turns on the size of the data
这取决于数据量
01:04:52 - 01:04.57
I'll cover those let me leave really punt on that question until next week
让我们把这个问题留到下周再解决
1.04.57-1.04.59
and be more clear when you start seeing like the different join algorithms
当你看到其他不同的join算法时，你会更加清楚这是怎么⼀回事
01:05:00 - 01:05:00
Yes
请讲
01:05:04 - 01:05:07
Yeah, so again because his question is
他的问题是
1.05.07-1.05.10
why do we need this ,when it's just this one is write into this
当hash table中的内容写⼊到这个final result的时候，我们为什么需要这个
1.05.10-1.05.12
in that example, yes
在这个例⼦中，确实是这样
01:05:12 - 01:05:16
But like I was trying to show that you look you have an ephemeral hash table as you
build and populate
但这⾥我想展示的是，当你构建并填充⼀个临时hash table的时候
1.05.16-1.15.18
and then when you're done， then you shove it into this thing
当你处理完数据，那么你就将处理完的数据塞进最终结果就⾏
01:05:18 - 01:05:21
For distinct it's stupid doesn't make sense
对于DISTINCT来说，这很蠢，⽽且没有意义
1.05.21-1.05.24
for aggregations you could potentially do that as well
对于聚合操作来说，你也可以那么做
01:05:26 - 01:05:30
Right,because again this like this may not fit in memory
因为此处的最终结果可能没法放在内存中（因为体积的问题）
01:05:33 - 01:05:34
Yes
请讲
01:05:38 - 01:05:40
Oh so yes so I should be clear
没错，我应该说⼀下这个
1.05.40-1.05.44
this is this is a different seed same, so you know MurmurHash has the difference sedd
这个hash函数⽤的是不同的hash seed，⽐如在MurmurHash中，它就会使⽤不同的hash seed
01:05:53 - 01:05.53
This question is
他的问题是
1.05.53-1.05.57
like say I built this first hash table
⽐如，这⾥我创建了第⼀个hash table
1.05.57-1.06.00
and I use that one seed for the hash function
我在这个hash table中使⽤了⼀个hash seed
1.06.00-1.06.04
now down here do I need to use can I use a different seed
接着，到了下⾯这个分区，我能换个hash seed来进⾏hash处理吗？
1.06.04-1.06.05
I don't think it matters
我觉得这其实不重要
01:06:06 - 01:06:06
Right
01:06:07 - 01:06:10
If you're writing into this if you're writing into the same hash table
如果你当下就要将数据写⼊到了同⼀个hash table中
1.06.10-1.06.11
you have to be have to use the same seed
那你就必须使⽤同⼀个hash seed
01:06:11 - 01:06:14
If you're just gonna merge that in later on, it doesn't matter
如果你打算之后再将它们合并起来，那就⽆所谓
01:06:15 - 01:06:15
No
No
01:06:16 - 01:06:18
Yeah, yes
请讲
01:06:22 - 01:06:27
Yes the final result,final result on the database
01:06:27 - 01:06:31
I'm sorry a final result of an operator ,it`s always gonna be a relation
操作符的最终结果其实就是⼀种关系
01:06:33 - 01:06:39
So this is it could be a hash table, it could be just a buffer of pages, depends on
implementation
So，它可以是⼀个hash table，也可以是⼀个有很多page的buffer，这就取决于具体实现了
01:06:40 - 01:06:43
I realized that like it's the same shapes
这⾥我画的形状是⼀样的（都是hash table）
01:06:44 - 01:06:45
Yeah sorry
不好意思
01:06:46 - 01:06:48
Alright, so finish up
So，总结⼀下
01:06:49 - 01:06:51
Let's talk about it do something more complicated
我们来讨论些更复杂的东⻄
1.06.511.06.58
it's actually had to do you know aggregation were you know the actual producing a real
result
⽐如，通过聚合操作来⽣成⼀个真实的结果
01:06:58 - 01:07:04
So for this one they the intermediate hash-table after ever using for the the second
phase
So，对于此处第⼆阶段中⽤过的中间hash table⽽⾔
01:07:04 - 01:07:12
We're actually going to use that to maintain the running total of whatever it is the
competition we're trying to do in our aggregate function
实际上，我们⽤它来维护我们在聚合函数中的Running_Total
01:07:13 - 01:07:19
Right, and so this running value would depend on what the aggregation you're actually
trying to do
So，这⾥的RunningVal的值取决于你实际所做的聚合操作是什么
01:07:20 - 01:07:21
So it's going back here
So，回到这个幻灯⽚上
01:07:22 - 01:07:28
So saying all of these guys now I'm doing a I'm getting the the course ID and I'm doing
the average GPA
So，如图所示，我拿到了course id，并且我想去算出每⻔课的平均GPA
01:07:28 - 01:07:31
So in the hash table that I could be generating for all of these
So，在hash table中，我可以为每⻔课都⽣成它们的平均GPA
01:07:32 - 01:07:36
I'm gonna have the the key map to this like tuple value
我可以将key映射到对应的tuple值上
1.07.36-1.07.44
that's going to keep the running count of the number of keys that I've seen with there
sorry ,number of tuples was I've seen with the same key
然后就会去统计我所⻅过的具有相同key的tuple数量
01:07:44 - 01:07:47
And then just the summation of of their GPAs
接着就是去求它们GPA的总和
01:07:49 - 01:07:52
Right, and then I just take this thing
然后我拿到value这部分
1.07.52-1.07.54
and then when I went to compute its produced a final output
接着，当我想去计算出最终结果时
1.07.54-1.07.59
I take the running total divided by the number of tuples and that's how I get my average
我会使⽤Running_Total除以tuple的个数，这就是我计算平均数的⽅法
01:07:59 - 01:08:02
So for all the different hash different aggregation functions
So，对于所有不同的聚合函数来说
1.08.02-1.08.12
and generally just keep track of you know a single scalar value, account you're just
adding one every single time you see your new key or key of the same value
⼀般来讲，就是去跟踪单个标量值，每当遇⻅⼀个新的具有相同值的key（单纯指key），就加1
01:08:12 - 01:08:14
And then for sum, you just keep adding values together
如果是求和，那么就将所有的值（key对应的value）加在⼀起
01:08:14 - 01:08:19
For the average you you can compute that with with the number of the count plus the
sum
如果是求平均数，那么你就得⽤上tuple的数量和这些值的和
01:08:19 - 01:08:25
Standard deviation or other other aggregation functions you you maintain a little more
information
对于标准差或者其他聚合函数来说，你就得多维护⼀些信息了
01:08:25 - 01:08:27
So now basically what happens in our hash table,
So，简单来讲，在我们的hash table中所发⽣的事是
1.08.27-1.08.30
when we want when we want to update the hash table
当我们想去更新hash table时
01:08:30 - 01:08:33
We do an insert if it's not there we just add it
在我们进⾏插⼊的时候，如果hash table中没有，那我们就将数据加进去
1.08.33-1.08.34
if it is there
如果它⾥⾯有的话
1.08.34-1.08.37
then we need to be able to modify this in place
那么我们就需要能够去修改这个地⽅的值
1.08.37-1.08.40
or do a delete followed by an insert to update it
或者是先删除后插⼊，以此来进⾏更新
01:08:42 - 01:08:43
So this clear
So，你们懂了吗？
01:08:45 - 01:08:47
And again if you were doing this with sorting
如果你是在进⾏排序
1.08.47-1.08.49
you could do the same thing you would have this on the side
你也可以做相同的事情，你可以将这个放在⾥⾯
01:08:50 - 01:08:52
And then as your scan through
接着，当你扫描的时候
1.08.52-1.08.53
and in the final sort of output
在最后排好序的输出结果中
1.08.53-1.08.56
you wouldn't you could update these totals and produce the final output
你可以对这些Running_Total进⾏更新，并⽣成最终输出结果
01:08:59 - 01:09:03
All right, so I'm gonna skip this for now
So，现在我会跳过这部分
1.09.03-1.09.08
this will this will make more sense for next week we do hash joins
在下周我们学习hash join的时候，再来看这个会更有意义
01:09:08 - 01:09:10
Essentially a hash joins would be essentially do the same thing
简单来讲，hash join做的也是⼀样的事情
1.09.10-1.09.15
that we're gonna build this ephemeral hash table with on on the keys, we want to do a
join on
即，我们根据我们想进⾏join操作的key来建⽴⼀个临时的hash table
01:09:16 - 01:09:18
And then we probe in that and see whether we have a match
然后，我们检查下hash table，看看⾥⾯是否有匹配项存在
1.09.18-1.09.21
and we produce our final output of the operator
然后，我们⽣成该操作符的最终输出结果
01:09:22 - 01:09:30
Okay, so let's let's get this, and then we'll focus well we'll discuss this again next week
when we or next to next Wednesday we do hash join okay
So，我们会在下周学hash join的时候，再来看这个
01:09:32 - 01:09:34
All right,so in conclusion
So，总结⼀下
1.09.34-1.09.38
so what I show today is this sort of the trade-offs between sorting and hashing
So，今天我所展示的是排序和hash处理之间的取舍问题
01:09:40 - 01:09:45
And again we'll go to more details about which one is better than the other, when we talk
about joins next week
当我们下周讨论join的时候，我们会更深⼊的去讨论谁⽐谁更好
01:09:48 - 01:09:52
The high level techniques that we talked about here are we applicable for all the parts of
the database system
这⾥我们所讨论的⾼级技术适⽤于数据库系统的各个部分
01:09:52 - 01:10:00
So this partitioning approach this divide and conquer approach all that is useful for other
algorithms other methods we have we we care about in our system
我们所讨论的这种分治算法对于我们的系统⽽⾔，⾮常有⽤
01:10:00 - 01:10:03
So we'll see this recurring theme throughout the rest of semester
So，我们会在这个学期剩下的时间⾥反复看到这个
1.10.03-1.10.05
that splitting things up into smaller units of work
它将⼀些⼤的任务拆分为更⼩的任务
1.10.05-1.10.09
and trying to operate on that small small chunk of data or small problem
并试着去对这些⼩数据块进⾏处理或者是解决⼩问题
1.10.09-1.10.11
it`s gonna be very very useful technique
这会是⼀种⾮常有⽤的技术
01:10:12 - 01:10:15
Okay, all right so let's know what project #2
So，我们来讲下Project 2的内容
01:10:16 - 01:10:21
So project #2 you are going to be building a thread safe linear probing hash table
So，在Project 2中，你们要去构建⼀个线程安全的linear probing hash table
01:10:22 - 01:10:25
So this is me built on top of a buffer pool you built in the first project
So，这个要建⽴在你第⼀个Project中所构建的buffer pool上
01:10:26 - 01:10:29
So it's not an in-memory hash table it has we backed by disk pages
So，它并不是⼀个内存中的hash table，它要由磁盘page进⾏保存
01:10:30 - 01:10:35
So we're not gonna do anything that we talked about here in this class ,we're doing
trying to maximize sequential I/O
So，我们并不会去做我们这节课所讲的内容，我们要做的是试着最⼤化循序I/O
01:10:35 - 01:10:42
It's just you do random I/O ,and you go grab pages and from your buffer pool manager
as needed ,right to do to do inserts and deletes
就像你做随机I/O那样，从buffer pool管理器中拿到page，然后进⾏插⼊和删除操作
01:10:43 - 01:10:45
So your are going to support resizing
So，你们也得去⽀持resize这种功能
01:10:45 - 01:10:48
So again linear probing hash table assumes it's a static hash table
So，假设Linear probing hash table是⼀个静态hash table
1.10.48-1.10.49
but when it gets full
但当它满的时候
1.10.49-1.10.53
then you need to take a latch on it, and then resize the entire thing
那么你就得在它上⾯加个latch，然后调整它的整个⼤⼩
01:10:53 - 01:10.54
So you need to support resizing as well
So，你们也需要去⽀持调整⼤⼩
1.10.54-1.11.01
and you need to support doing this resizing when multiple threads could be accessing
the the hash table at the same time
你们除了需要⽀持调整⼤⼩这个功能以外，你们也得⽀持多线程同时访问这个hash table
01:11:01 - 01:11:04
So the the website is up
So，⽹站已经上线了
1.11.04-1.11.09
the it's not announced yet on Piazza
虽然这还没有在Piazza上宣布
1.11.09-1.11.12
what will remain there's some final adjustments we're doing for the source code before
release to you guys
在将⽂件发布给你们之前，我们会对源码进⾏最终调整
1.11.12-1.11.14
but we hope to this will be later today
但我们希望今天能够放出来
01:11:16 - 01:11:18
I don't know let's our animations, alright
01:11:18 - 01:11:20
So there's four tasks you're gonna have to do
So，在Project中，你们要完成四个任务
01:11:20 - 01:11:26
The first is that you're responsible for designing the page layout of the hash-table
blocks
第⼀个任务是，你们要负责设计hash table block的page layout
01:11:26 - 01:11:30
So this is the header page and then the actual block page is where the actual key values
are stored
So，⽐如，这⾥是header page，然后是真正⽤来存放key/value数据的block page
01:11:31 - 01:11:39
So this is a useful exercise to get you to understand what it means to take a page from
the buffer pool manager
So，对你们⽽⾔，这是⼀个⾮常有⽤的练习，它能帮助你们理解如何将page从buffer pool管理
器中取出
01:11:39 - 01:11:43
And then be able to interpret it in such a way that stores the data exactly that you want
接着，你们要能够去以某种你们想要的⽅式去解释它⾥⾯所保存的数据
01:11:43 - 01:11:45
All right, it's not your just malloc in some space
你们并不是去使⽤malloc()去分配⼀些空间
1.11.45-1.11.47
you're going to buffer manager and says give me a page
我们要跑到buffer pool管理器中，并表示，给我⼀个page
1.11.47-1.11.50
and you say oh this is a this is a hash table block page
接着，你会说，Oh，这是⼀个hash table block page
1.11.50-1.11.52
,here's the offsets to find the data that I'm looking for
这⾥⾯有⼀些offset值，我们以此来找到我们所查找的数据
1.11.52-1.11.55
how do you do a reinterpret cast on that data
然后，我们得对上⾯的数据进⾏重新解释
01:11:56 - 01:11.57
So your first implement those two classes
So，⾸先你们要去实现这两个类
1.11.57-1.11.59
they do the header page and then the block pages
它们⼀个负责header page，另⼀个负责block page
1.11.59-1.12.05
then you want to implement the basic hash table itself Right, to do inserts and deletes
接着，你们得去实现基本的hash table，以此来进⾏插⼊和删除操作
01:12:06 - 01:12:13
And they get also support concurrent operations using a reader writer latch which we
provide you ,and then also support resizing
通过使⽤我们提供给你的read/write latch，以此让它们⽀持并发操作，然后，它们也得⽀持调
整⼤⼩
01:12:14 - 01:12:16
You take a latch in the entire table
你可以通过在整个表上加个latch，
1.12.16-1.12.18
double the size of it and then rehash everything
然后将它的⼤⼩变为原来的两倍，然后重新hash表中的所有东⻄
01:12:18 - 01:12:20
So you need you need to be able to support that
So，你们得需要能够⽀持这点
01:12:22 - 01:12:30
So you should follow the the textbook semantics and algorithms for how they do the
various operations
So，你们应该看下教科书中语义和算法那块的内容，看看它们是如何实现这些不同的操作
01:12:31 - 01:12:36
I think the lecture I gave on hash table follows the textbook pretty closely
我觉得我之前所讲的hash table那节课的内容和教科书上的⾮常接近
01:12:36 - 01:12:40
And the linear hash table doesn't have that many you know different design decisions
you have to make
对于linear hash table来说，你们并没有那么多不同的设计决策需要考量
1.12.40-1.12.43
it's just sort of going through these X steps
你只需按部就班即可
01:12:43 - 01:12:46
I advise you to first obviously work on the page layout
我建议你们先去做page layout这块
1.12.46-1.12.49 ****
because you can't have a hash table that you can stored in pages anyway
因为你无法拥有可以存储在page中的hash table
01:12:49 - 01:12:55
But you should make sure that your pages work perfectly before you move on to actually
building the hash table itself
但你们应该确保，在你们构建hash table之前，你们的page能够正常⼯作
01:12:55 - 01:13:01
So we'll provide you some basic test cases again to do some rudimentary checks for
your page layouts
So，我们会为你们提供⼀些基本测试案例，来对你们的page layout做⼀些基本检查
01:13:01 - 01:13:05
But it's up for you to guys to make sure that it's actually you know do you simply more
rigorous
但实际上，这取决于你们是否要让这些测试案例变得更加严格
01:13:05 - 01:13:11
Because if your page layout gets up, and then now you start doing your hash table on
that it's like building a house on sand
因为如果你的page layout有问题，那么当你开始构建hash table的时候，⽆异于在沙⼦上造房
⼦
01:13:11 - 01:13:16
Because now you're like my hash table is not working, and it could it could because the
your pages aren't working correctly
如果你的hash table不能正常⼯作，这很有可能是因为你的page没法正常⼯作
01:13:17 - 01:13:19
So get this down solid before moving to the next thing
So，在做下⼀件事情之前，先把上⼀件事做好
01:13:21 - 01:13:24
Then when you actually build the hash table itself
然后，当你构建hash table的时候
1.13.24-1.13.26
don't worry about making it thread safe
不要去在意能不能让它线程安全
1.13.26-1.13.31
focus on the single-threaded support first
⾸先要把重⼼放在⽀持单线程访问上⾯
01:13:31 - 01:13:33
This is a common design approach in database systems
这是数据库系统中的⼀种常⽤设计⽅式
01:13:34 - 01:13:36
This is the approach I take with my own research
我在我⾃⼰的研究中会使⽤这种⽅法
1.13.36-1.13.40
and in practice I think this is not every company follows this
我觉得，在实际情况中，并不是每个公司都会遵循这⼀点
1.13.40-1.13.43
he's wearing the shirt for the company that does not follow this
这位穿着公司⽂化衫的⼩伙伴就没有遵守这点
01:13:45 - 01:13:49
The focus on correctness first, don't worry about it being slow
⾸先，我们的重点应该是在正确性上，我们不要去担⼼速度慢的问题
01:13:50 - 01:13:53
So make it you know make sure that it works exactly what you think it should work
So，要确保数据库系统是按照你想的那样⼯作的
01:13:53 - 01:13.58
Then go back and now start doing up the optimizations that some of the things he
suggested some things we talked about in class
然后，我们再回过头去，在数据库系统上使⽤⼀些我们在课上所讨论的优化
1.13.58-1.14.04
to be you know to do optimistic latching be more more crafty on how you release latches
⽐如，在使⽤乐观锁的时候，在释放latch的时候更加谨慎
01:14:04 - 01:14:06
Right make sure it works correct first
要确保它⾸先能正确⼯作
1.14.06-1.14.08
have test cases to prove that it works correctly for you
通过测试案例来证明，它能正常⼯作
01:14:08 - 01:14:10
Then when you go start trying to make it go faster
然后，我们才会试着让它的速度变得更快
1.14.10-1.14.13
because we'll have a leaderboard to see who has the fastest hash-table
因为我们会有⼀个排⾏榜，上⾯能看到谁的hash table是最快的
01:14:13 - 01:14:18
then you know then you know that you're working with a again a solid implementation
然后，你就知道，你是在⼀个稳定的实现上进⾏⼯作的
01:14:19 - 01:14:19
Okay
01:14:22 - 01:14:26
All right, so just like before you don't need to change any other files in the system
So，和之前⼀样，你们不需要修改系统中的任何⽂件
1.14.26-1.14.28
other than the ones that you have to submit on great scope
除⾮你已经将⽂件提交到了GreatScope上⾯
01:14:29 - 01:14:30
This is what we're working on now
这是我们现在在做的东⻄
01:14:31 -01:14:36
So we'll announced on Piazza that you want to rebase your existing code on top of the
latest master
我们会在Piazza上宣布这个，你们得将你们现有的代码rebase到最新的master分⽀上去
01:14:36 - 01:14:45
Because that I'll bring in the new the sample header files and the sample test cases for
you, will provide instruction exactly what you need to do the rebase
因为我要提供给你们新的示例header⽂件以及新的测试案例，我还会告诉你们，你们在进⾏
rebase的时候该怎么做
01:14:45 - 01:14:49
Obviously makes you know since you can blow away your source code on github
因为你们可以删除你们在github上的源码
1.14.49-1.14.53
very easily with a Porsche push force
使⽤push --force就可以轻易做到
01:14:53 - 01:14:58
Make sure you make a backup of your if your copy the first before you start doing the
rebase
在你们进⾏rebase之前，请确保你们对之前的代码做好了备份⼯作
01:14:59 - 01:15:04
And then as always post your questions on Piazza and and come to office hours
顺带，如果你们有问题，请把问题发到Piazza上，然后有空的话可以到办公室来问问题
01:15:06 - 01:15:06
Yes
请讲
01:15:13 - 01:15:14
This question is
他的问题是
1.15.14-1.15.17
if we assume if you get a hundred cent score on the first project,
假设，如果你在第⼀个project中得了满分
1.15.17-1.15.22
can you assume that your buffer pool implementation is solid to support hash table
你们能假定你们所实现的buffer pool能够可靠的⽀持hash table吗？
01:15:24 - 01:15:27
I could be wrong, but we we think we tested,right
我说的可能是错的，但是我们认为我们已经测试过了
01:15:30 - 01:15:37
But I would say like there was a blog last year that that exact problem showed up that's
all the unresolved
但去年有⼈写了⼀个博客，提到了我刚说的那些问题，这些都还没被解决
01:15:38 - 01:15:40
So I think if you've passed our test it should be solid
So，我觉得，如果你们通过了我们的测试，那么你们的实现就是可靠的
01:15:44 - 01:15:49
This question is can we now releases that？I cannot do that ,
他的问题是，我们现在能将那个放出来么？现在不⾏
1.15.46-1.15.49
because there's some people that are still haven't submitted yet
因为有些⼈还没提交他们的作业
01:15:54 - 01:15:54
Let's take that all fine
让我们岁⽉静好
01:15:57 - 01:15:57
In the back, yes
后⾯那位，请问
01:16:02 - 01:16:04
For the sorry for the first project
第⼀个project？
01:16:05 - 01:16:06
You can submit as much as you want yeah
你想提交⼏次就⼏次
01:16:07 - 01:16:10
Yeah what is the whatever whenever whatever the highest score you got from the last
不管你上⼀次所拿到的最⾼分是多少
1.16.10-1.16.15
I see great scope of let you activate what you scored you want ,right, I think
我觉得Greatscope激起了你们对拿⾼分的欲望
01:16:15 - 01:16:18
But it's whatever the highest score up into the deadline is what we'll use
但我们只会将你们在deadline之前所得到的最⾼分作为你们的分数
01:16:19 - 01:16:19
Yeah
01:16:21 - 01:16:22
Yeah you submitted is all you want
没错，你想提交⼏次就⼏次
1.16.22-1.16.26
you like if you get if you had an eighty before and have a hunter after the deadline, you
have an eighty score
如果你在deadline之前得到了80分，但是在deadline之后，你再提交时，拿到了100分，但你的
分数还是80分
01:16:27 - 01:16:32
You play the game with it like the late days,but that you know yeah
就⽐如，你晚玩了⼏天游戏，但你知道攻略，完美通关了那样
01:16:40 - 01:16:45
Again your question is what if you change your invitation after the fact for from project
one
你的问题是，如果你修改了你project 1的代码
01:16:45 - 01:16:51
The it would still be you so submitted on great scope the old project for project one
你依然得在Greatscope上上传你的⽼项⽬代码，也就是project 1的代码
01:16:52 - 01:16.56
We could just have it throw in the first test as well if you want to that make it easier
如果你想简单点，那么就把代码扔进第⼀个project的测试⾥⾯就⾏
1.16.56-1.16.59
like it'll run all the tests from the first project
Greatscope会去运⾏第⼀个project的所有代码
1.16.59-1.17.02
you won't get a score for that,but it does be there
你的分数并不会因此⽽改变，但它还是会给你⼀个分数
01:17:02 - 01:17:04
We could do that well fix that, okay
我们会修复你说的问题
01:17:05 - 01:17:05
What's that
你说的是啥
01:17:07 - 01:17:08
You know make it slower ,that's the only thing
这会让Greatscope变慢，但这是唯⼀的问题
01:17:12 -01:17:12
Yeah
01:17:13 - 01:17:16
But you can still be able to submit for the first one
但你们依然能提交第⼀个project的⽂件
01:17:17 - 01:17:19
Okay,do not plagiarize
Ok，不要抄袭
01:17:20 - 01:17:22
We won that we're gonna run this emboss
我们会去运⾏emboss
1.17.22-1.17.24
this is we're doing that this week for your first project
我们会在这周⽤它去检测你们的第⼀个project
1.17.24-1.17.28
if you plagiarize well --- ever worn a hole you'd be kicked out okay
如果你抄袭了，那么你就完蛋了
01:17:28 - 01:17:28
Don't do that
不要那么搞
01:17:29 - 01:17:33
next class we're doing joins ,Nested Loop Join ,Sort-Merge Join and Hash Join, okay
下节课我们会学关于Join⽅⾯的东⻄，⽐如：Nested Loop Join，Sort-Merge Join以及Hash
Join
01:17:34 - 01:17:37
Alright, he's got a call here, guys ,see you
散会！