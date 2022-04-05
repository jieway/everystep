05-01
05 - Buffer Pool s + Memory Management
(CMU Databases Systems _ Fall 2019)
资料：https://15445 courses cs cmu edu/fall2019/notes/05-bufferpool pdf
Pdf: https://15445 courses cs cmu edu/fall2019/slides/05-bufferpool pdf
00:16 - 00:19
All right, hey done
00:19 - 00:21
Grab
00:21- 00:23
Your wrap you look down,what's wrong
你今天看起来好丧，出什么问题了？
00:23 - 00:26
City women woman problems
感情问题？
00:26 - 00:36
What do you say women problems
What are your problems
不是？那是什么问题
00:36 - 00:43
They were saying your beats are too fresh and they can't handle it
他们说你的beats（节奏）太前卫（此处是反语贬低）了，他们⽆法认同
00:43 - 00:48
I'm not qualified to help ,I'm sorry okay
sorry，对此我⽆能⽆⼒
00:48 - 00:50
All right, so let's talk about databases system
⾔归正传，我们来讨论数据库系统吧
00:50 - 00:57
All right, so a quick reminder Homework #1 is due tonight
So，提醒你们⼀下Homework 1今晚就截⽌了
00:58 - 01:01
And then Project #1 is going out today
接着，我今天会把Project 1放出来
1.01-1.05
I'll sit at the end of the class there's actually the website now the source code is online
我会在这节课结束的时候放出来，实际上我已经将源码放在⽹上了
1.05-1.08
but I'll discuss what it is, what you're required to do today
但我会去解释下它是什么，以及你们今天要做什么
01:09 - 01:15
And then just like before you're submitted some great scope,and you know everything
will be auto graded
和以前⼀样，你们将东⻄上传上去，然后⽹站会⾃动帮你们打分
01:16 - 01:19 (视频剪切问题，YouTube也是)
All right ,um I do want to spend some time talking ……
这句不要了
01:19 -01:23
Whatever lab workloads is where after you've collected a bunch of data in the OLTP side
当你从OLTP处收集到⼀堆数据后
01:23 - 01:26
Now you want to start analyzing it to extrapolate new information
现在，我们想去开始对这些数据进⾏分析，以此推断出新的信息
01:26 - 01:30
Like people in the city of Pittsburgh are more likely to buy this kind of product
⽐如说，匹兹堡的⼈更喜欢买这种产品
01:30 - 01:36
I said you can use that information, then you know push information to the OLTP side to
get people to do things you want them to do
你就可以将这个信息推送到OLTP处，让⼈们去做你想让他们做的事情（知秋注：⼈们会通过查
询得到这条信息，然后你就可以迷惑对⽅了）
01:37 - 01:44
And then the Hybrid Transaction Analytical Processing HTAP workloads,this is sort of a
new buzzword that Gartner invented a few years ago
接着就是HTAP （混合事务分析处理），它是⼏年前Gartner所发明的⼀个新流⾏词
1.44-1.47
basically describing these database systems that try to do both of them
基本上来讲，它所描述的是既做OLTP，⼜做OLAP的数据库系统
01:48 -01:52
So a typical setup you'll see often is like this
So，你们通常会⻅到这种标准设置
01:52 - 01:57
You'll have your front end OLTP databases and then you have your giant back-end data
warehouse
你们会有前端OLTP数据库，以及后端⼤型数据仓库
01:57 - 1.59
So these are sometimes called Data Silos
这些有时候被称为Data silo(数据孤岛，即相互独⽴的数据存储区)
1.59-2.03
because you can do a bunch of updates into them sort of one database instance
因为你们可以对其中⼀个数据库实例进⾏⼀系列更新操作
02:03 - 02:07
Whether it's a single node or should be doesn't matter, because it's a single logical
database
不管它是不是单个节点都没关系，因为它是⼀个单个逻辑数据库
02:07 - 02:10
And then you apply your changes here
然后，你将你的修改应⽤到此处的单个逻辑数据库（Data silo）上
2.10-2.14
but they don't really communicate with each other，each one is sort of an island by Itself
但它们彼此之间并不会真的交流，每个数据库⾃身都是⼀个孤岛
02:14 - 02:18
So then you can do what's called extract transform load or ETL
So，然后你就可以进⾏某种被称为ETL的操作（ETL是将业务系统的数据经过抽取、清洗转换之
后加载到数据仓库的过程）
02:18 - 02:28
And this is sort of a the term you use is described taking data out of these front
ends,cleaning it up processing it,and then putting it to the back end data warehouse
它所表达的意思是，我们从前端数据库中取出数据，将数据进⾏清洗处理，接着将处理后的数据
传⼊后端数据仓库
02:28 - 02:30
So the example, I like to get for this is like Zynga
此处我想以Zynga为例（Zynga⼀家游戏公司）
2.30-2.34
the farmville people they buy a lot of gaming startups
Zynga收购了许多游戏初创公司，例如：FarmVille
02:35 - 02:36
And then when they buy them
然后，当他们买这些公司时
2.36-2.38
they all run their own front end OLTP database
他们会去运⾏他们⾃⼰的前端OLTP数据库
2.38-2.42
but then when they want to put it in their back-end giant data warehouse
但当他们想将这些数据放⼊他们的后端⼤型数据仓库时
02:42 - 02:45
So they can do analyze things to make you buy crap on farmville better
这样他们就能更好地分析出如何让你们在farmville上买东⻄
02:45 - 02:53
Right and so ,because say like in one database，the first name of a customer will be F
name ,another database we you know F first underscore name
因为在⼀个数据库中，客户的First name是f开头，在另⼀个数据库中，则是f_
02:53 - 02:59
Right ,so it's the same concept or same entity just with different syntax and
nomenclature
So，这两个是相同的实体，只是使⽤了不同的语法和命名法⽽已
02:59 - 03:01
So this ETL process cleans all that up
So，ETL会对这些数据进⾏清洗处理
3.01-3.04
you shove it to your data warehouse, you do all your analytics here
你将它们推⼊你的数据仓库，并在那⾥进⾏所有的分析
03:04 - 03:07
And then whatever new information you have，you push it to the front
接着，不管你拿到什么新信息(分析后的)，你将它们推到前端OLTP数据库就⾏
03:08 - 03:12
All right, and when you see things like people that bought this item also bought this item
当你看到⼈们买了这个东⻄，⼜买了那个东⻄
3.12-3.14
that's that doing that on the OLAP side
这是在OLAP处进⾏的
03:14 - 03:17
And then they shove it to the front end to expose that through the OLTP application
接着，将数据推送到前端，并将其暴露给OLTP应⽤程序
接着，将数据推送到前端，并通过OLTP 应⽤程序进⾏对外暴露
03:18 - 03:24
So HTAP basically says, let's just also do some of the integral queries that we can
normally only do on the OLAP side
So，HTAP基本上是在说，让我们也来做⼀些平常只能在OLAP端所做的
03:24 - 03:26 ！！！！！！！！
We can do it on the front end Data Silos
我们可以在前端的Data silo⾥⾯做这些
03:26 - 03:30
You still want this giant thing your giant data warehouse
我们依然想使⽤这个⼤型数据仓库
3.30-3.35
because you want to be able to look at all your Data Silos put together
因为我们想能够看到我们所有的Data silo放在⼀起的样⼦
03:35 - 03:38
But now instead of waiting for things to be propagated to the backend
但现在，不⽤等待将数据传播到后端
03:38 - 03:40
You can do some things on the front-end
我们就可以在前端来做些事情了
03:40 - 03:41
So that's basically what HTAP is
So，基本上来讲这就是HTAP所⼲的事情
03:41 - 03:45
So again this could be like your MySQL,does your Postgres ,MongoDB whatever you
want
So，再次，这个你可以⽤MySQL，也可以⽤PostgreSQL或者MongoDB这类数据库来做，或者
也可以选你想要的数据库来做
03:45 - 03:52
And then your back-end data warehouse would be Hadoop
stuff,Spark,Greenplum,Vertica
接着，你的后端数据仓库可以⽤Hadoop，Spark，Greenplum或者是Vertica来做
3.52-3.57
there's large enterprise data warehouse systems ,Redshift or Snowflake your other cloud
ones
这些都是⼤型企业级数据仓库系统，你们也可以使⽤RedShift或者Snowflake这些云端的数据库
系统
03:57 - 03:58
Okay,so this is clear
Ok，So这样你们应该清楚了
03:59 - 04:09
Okay, so the main topic today,we're talking about is now given that we've already spent
two previous lectures on deciding how we're actually gonna represent the database in on
disk
Ok，之前我们已经花了两节课时间来决定我们该如何在磁盘上表示数据库
04:10 - 04:18
Now we want to talk about what we actually do to bring the database from those files on
disk the pages on disk and bring them into memory ,so that we can operate on them
今天我们想去讲的内容就是，我们该如何将磁盘中的数据库⽂件或page放到内存中，以便我们
可以对它们进⾏操作
04:18 - 04:23
Right, so remember that we the database system can't operate directly on disk
So，要记住数据库系统⽆法直接在磁盘上进⾏操作
04:24 - 04:27
We can't do reads and writes without having to bring into memory first
我们没办法在不将它们先放⼊内存的情况下对这些数据进⾏读写
4.27-4.29
that that's the von-Neumann architecture
这是冯诺依曼架构
04:29 - 04:34
Now there are some new hardware coming out you can push execution logic down to the
disks
现在也推出了⼀些新的硬件，我们可以将这些处理逻辑推送到磁盘上
04:35 - 04:36
But we can ignore that for now
但现在，我们可以将它抛之脑后
04:37 - 04:40
So we're trying to figure out how do we want to bring that those pages in the disk
So，现在我们想试着弄清楚如何将这些page放回磁盘中
04:41 - 04:45 *******************
And we want to do this and be able to support a database that exceeds the amount of
memory that we have
我们希望做到这⼀点，并且想要能够去⽀持超出我们所拥有的内存容量⼤⼩的数据库
04:45 - 04:52
And we want to minimize the impact the slowdown or the problems of having queries tap
that touch data on disk
我们想去最⼩化在磁盘上执⾏查询速度缓慢带来的影响
4.52-4.54
we want to make it appear as if everything's in memory
我们想让这些操作看起来就像在内存中执⾏那样
04:54 - 05:00
So another way to think a problem is also in terms of Spatial versus Temporal Control
So，我们也可以从空间和时间的管理上来思考这个问题
05:00 - 05:05
So Spatial Control is you know where are we physically gonna write this data on disk
空间管理指的是我们实际是在哪⾥将数据写⼊磁盘
05:06 - 05:11
Right, meaning like we know that these pages are can be used together often possibly
one after another
这意味着，我们想要尽可能的将这些经常使⽤的page⼀个挨着⼀个的放
05:11 - 05:13
So when we write those pages out , we want to write them sequentially
So，当我们写出这些page时，我们想按顺序对它们进⾏写⼊
05:13 - 05:15
So that when we go read them again
So，当我们再去读取它们时
5.15-5.23
physically close to each other and we don't have to do long seeks to find different spots
on disk
它们是⼀个挨着⼀个放的，所以它们在物理位置上彼此靠近，这样我们就⽆须花很⻓时间在磁盘
上找到这些不同的地⽅
05:23 - 05:24
We also care about temporal control
我们也会去关⼼时间上的管理
5.24-5.30
and this is where we make decisions about when do we read pages into memory, what
time we do this
即我们会决定该在什么时候将pages读⼊内存
05:30 - 05:34
And then at some point we have to write it back out if it's been written, if it's been
modified
接着，在某些时候，如果它们被修改了，我们必须得将它们写回磁盘
05:34 - 05:37
And we don't make a decision of when we actually go ahead and do that
但我们不会对何时进⾏这种操作做出决定
05:37 - 05:42
And yeah this is the overarching goal of trying to minimize the number of stalls we have
这就是为了试着最⼩化我们所⾯对的烂摊⼦的总体⽬标
总体⽬标就是尝试最⼩化我们所⾯对的烂摊⼦
05:42 - 05:45
Because our queries try to read data that we didn't have in memory
因为我们的查询会试着读取那些不放在内存中的数据
5.45-5.48
and we had it write up, you know that was out on disk we had to go fetch it
我们必须将它写下来，你们都知道，这些数据是放在磁盘上的，所以我们得去拿到它
05:48 - 05:53
So this is the overall architecture of the lower store manager,but I showed in the
beginning
So，这就是我⼀开始所展示的底层存储管理器的整体架构
05:54 - 05:55
So we've sort of covered this part already
So，我们已经介绍过这部分了
05:55 - 05:59
So now we know how to have a database file or files on disk
So，我们知道如何在磁盘上保存数据库⽂件
05:59 - 06:01
We know how to represent the page directory to find the data we need
我们也知道如何表示page⽬录，以此来找到我们需要的数据
06:01 - 06:05
And then we have a bunch of pages sloted pages log structure pages ,it doesn't matter
接着，我们有⼀⼤堆page，不管是slotted page还是log-structured page，这都⽆所谓
06:05- 06:08
We have a bunch of pages on disk and we know how to jump to them to find them
我们在磁盘上有⼀⼤堆page，我们知道该如何跳到它们所在的位置，并找到它们
06:08 - 06:11
So now we're talking about this part up here at the Buffer Pool
So，现在我们要去讨论幻灯⽚上Buffer池这⼀部分
06:11 - 06:16
Right ,when something else in the system like the execution engine the thing executing
queries comes along says,I want to read page two
当系统中的执⾏引擎想去执⾏查询时，它会说：我想去读取page 2
06:17 - 06:20
We got to know how to fetch the page directory into memory ,figure out what's in there
我们知道如何将page⽬录放到内存中，并弄清楚⾥⾯有什么
06:20 - 06:23
And then go find the page that we want and fetch that into memory
接着，从⾥⾯找到我们想要的那个page，并将它放⼊内存
06:24 - 06:29
And then the tricky thing is going to be ,if we don't have enough space now free memory
to bring that page we need in
接着，棘⼿的事情出现了，那就是我们没有⾜够的空余内存来容纳我们需要的那个page
6.29-6.31
we have to make decision what page to write out
我们必须决定对哪⼀个page进⾏写出
06:31 - 06:35
So that's you know this is what we're trying to solve today
这就是我们今天要解决的问题
06:35 - 06:43
Right, and then the other parts of the system don't need to know or really care about
what's in memory with not in memory
系统的其他部分⽆须去知道或者去关⼼哪些东⻄在内存⾥⾯，哪些东⻄不在内存⾥⾯
6.43-6.48
there's going to wait until you get the thing you need and give you back a pointer to let
you do whatever it is that you wanted to do
它会等到你拿到你需要的东⻄，然后返回给你⼀个指针，以此让你做你想做的事情
06:48-6.49
Okay
06:50 - 06:55 ！！！
So the things were talked about today is essentially just how to build what a Buffer Pool
manager actually gonna do
So，今天我们要讨论的东⻄就是如何去构建⼀个Buffer池管理器（Buffer Pool Manager）
06:56 - 07:01
In some comedies the term Buffer Pool manager,some systems will call this a buffer
cache it's the same thing
在有些场景下，某些系统会将Buffer池管理器叫做buffer缓存，它们是⼀回事
07:01 - 07:04
Right, it's memory manage by the database system
它是由数据库系统管理的内存
07:04 - 07:12
Then we'll talk about how we actually can do different policies that decide what pages
we want to write out the disk, if you need to free up space
然后，我们会去讨论，当我们需要释放内存空间时，我们该如何使⽤不同的策略来决定我们想让
哪些pages写出到磁盘上
7.12-7.16
additional optimizations We can do to minimize this impact
然后会讨论我们可以通过哪些额外的优化来最⼩化这种影响
07:16 - 07:21
and then we'll finish up talking about two other pieces of the database system that may
need memory ,Okay
然后，我们会结束讨论数据库系统中其他两个需要⽤到内存的部分，Ok
07:23 - 07:29
So again the Buffer Pool is essentially just a large memory region that we're gonna
allocate inside our database system
本质上来讲，Buffer Pool需要我们在数据库系统内部分配的⼀块很⼤的内存区域
07:29 - 07:30
We're gonna call malloc
我们会去调⽤malloc
07:30 - 07:35
I want to get some chunk of memory,and that's we're gonna put all our pages that we
fetch from disk
我想要拿到⼀些内存块，并将我们从磁盘中读取到的所有page放⼊⾥⾯
07:35 - 07:42
And so this is again ,this is all entirely managed by the database system other than
having go to the operating system and ask for the memory
So，再说⼀遍，这段内存完全是由数据库系统来控制的，⽽不是操作系统来分配这些内存的
07:42 - 07:46
Right, we have to use malloc there's ,we handed malloc allocate memory on our own
此处我们使⽤malloc，由我们⾃⼰来⼿动分配内存
07:46 - 07:47
So we know OS can provide us this
我们知道操作系统可以为我们提供这个
07:48 - 07:55
But then we're gonna break up this memory region into fixed size or page size chunks
called frames
但之后，我们将这段内存区域分成⼀个个固定⼤⼩的chunk，它被称为frame
07:56 - 08:01
And this is you know frame seems kind of unusual why don't I just say page or block or
whatever
这⾥我为什么将它叫做frame，⽽不是把它叫做page或者是block或者其他名字呢
08:01 - 08:05******
There's so many different terms in database systems to roughly describing the same
thing
数据库系统中有太多不同的术语可以粗略地描述同一件事
08:06 - 08:11
Frames correspond to slots in the or see I use the term slot when use that
Frame对应的是我们之前⽤的slot
08:11 - 08:16
Frames correspond to regions or chunks in the Buffer Pool memory region that we can
put pages in
frame对应的是Buffer池内存区域中的区块或者Chunk，我们可以将page放在⾥⾯
08:16 - 08:20
Right, and we slot is the thing we put things into pages within for tuples
slot是我们在page中⽤来放置tuple（知秋注：slot存储的是对应的offset值，但其实对外来看，
它指代了⼀段存储区域）
08:20 - 08:23
So for Buffer Pool , it's frames for on the page it'll be slots
So，对于Buffer池来说，它叫frame。对于Page来说，它就是slot
08:24 - 08:30
So what happens is when the database system calls makes a request and say I want a
page
当数据库系统发出⼀个请求，表示我想要⼀个page时，会发⽣什么呢？
08:30 - 08:33
Right, we're gonna look to see whether it's already in our Buffer Pool
我们会去看我们的Buffer池中是否存在这个page
8.33-8.38
if not，then we go out in the disk make a copy of it fetch that put it into memory
如果不存在，那我们就从磁盘中拷⻉⼀份出来，并将它放到内存中去
08:38 - 08:42
So this is a straight one-to-one copy, we're not doing any D civilization
这就是很简单的⼀对⼀拷⻉，我们并没有做其他事情
08:43 - 08:44
All right, we can ignore compression for now
我们现在可以将压缩放在⼀边，暂时⽆视
8.44-8.49
but whatever however it's represented on disk is exactly how it'll be represented in
memory
但它在磁盘中是如何表示的，那么它在内存中也是⼀样如此
08:49 - 08:50
We're not doing any marshaling of the data
我们不会对数据做任何封装序列化处理
08:50 - 08:53
We just take it from the disk and put it directly in the memory
我们只是将它从磁盘中取出，然后直接放⼊内存
08:53 - 08:57
All right,we keep doing this row all the other pages that that that we may need
All right，我们会对我们可能需要的其他page也进⾏这种操作
08:58 - 09:01
Right, so the in my earlier example
So，在我之前的例⼦中
9.01-9.04
when I showed how the execution ender says,hey I want a page 2
当我展示执⾏时，我表示我想要page 2
09:05 - 09:09 ！！！！！！
Right, it manually you know buffer pool manager magic figured out what page two is
Buffer池会很神奇地告诉我们page 2是什么
09:10 - 09:14
So if we're just organizing these things as frames
So，如果我们将这些东⻄整理为frame
09:16 - 09:20
Pages can go in any order in the frames that they want,right
Page可以以它们想要的任何顺序放在frame中
09:20 - 09:28
In this case here even though it's page one page 1, 2, 3 ,in my Buffer Pool its page 1,3,
that's not in the same order that it's out on disk
在这个例⼦中，在磁盘上我们有page1、2和3，但在我的Buffer池中的是page1和3，Buffer池
中page的顺序和磁盘上的顺序并不⼀致
09:28 - 09:34
So we need an extra indirection layer above this to figure out ,if I want a particular page
what frame has the one I want
So，在此之上，我们需要⼀个额外的indirection层，如果我想要某个特定的page，通过这个
indirection层我就知道它在哪个frame中了
09:34 - 09:38
Because it's not going to match exactly the same order that it is on disk
因为它并不会完全匹配磁盘上的排列顺序
09:38 - 09:40
So this is the page table was
So，这就是page表
09:40 - 09:45
Page table is just a hash table, that's going to keep track of what pages we have in
memory
Page表其实就是⼀个hash表，它⽤来跟踪我们在内存中有哪些page
09:45 - 09:50
And if you ask for a particular page ID ,it'll tell you what frame that is located in ,all right
如果我们想找⼀个特定的page，通过page表和page id，我们就可以知道这个page在哪个
frame中
09:52 - 10:02
And so the database systems can have to maintain some additional metadata to keep
track of what's going on with the pages that it currently has in its Buffer Pool
So，数据库系统必须维护⼀些额外的元数据，以此来跟踪当前Buffer池中page的发⽣了什么
10:03 - 10:06
So the first thing we got to keep track of is called the Dirty Flag
So，⾸先我们要跟踪的东⻄被称为Dirty Flag
10:06 - 10:11
And this is just a flag single bit that tells us whether the page has been modified since
it's been read from disk
这个flag其实就是⽤来告诉我们，当我们从磁盘中读取到这个page后，这个page是否被修改
10.11-10.16
did some query，some transaction make a change to it
是否有查询或者事务对它进⾏修改
10:17 - 10:21
The other thing that I keep track of also is called a pin count or a reference counter
我想追踪的另外⼀个东⻄叫做Pin count或者说引⽤计数
10:22 - 10:30
And this is just keeping track of the number of threads or queries that are currently
running that want this page to remain in memory
它⽤来跟踪希望该page保留在内存中的当前运⾏线程数或者是查询的数量
它⽤来跟踪想要使⽤该page的当前线程数量或者是正在查询该page的数量
10.30-10.33
meaning we don't want it written out to disk
这意味着我们并不想将该page写出到磁盘上(知秋注：还在被强引⽤使⽤，Java程序员可这么理
解)
10:33 - 10:35
Right, it could be because I'm gonna update it
因为我可能会去对它进⾏更新
10:35 - 10:38
So I do my fetch, I go fetch the page, I need bring into my Buffer Pool
So，我拿到page，我需要将它放⼊我的buffer池
10:38 - 10:41
Then I'm gonna go ahead and modify
然后我对这个page进⾏修改
10:41 - 10:47
I don't want that page to get evicted or swapped out back at the disk in between the
time it's been brought in and before I can actually do my update to it
从该page被放⼊内存到我对它进⾏更新前这段时间内，我不想让该page被移除或者是交换回磁
盘
10:48 - 10:54
There's also gonna prevent us from evicting pages that have not been safely written
back to disk yet
这也将阻⽌我们去移除那些还未被安全写回磁盘的page
10:56 - 10.58
Alright, so again, so like I get pinned page and say
如图所示，我可以将该page固定住，并表示
10.58-11.03
I don't want this thing in to ever be removed from the Buffer Pool for now
当下，我不想让这个page从buffer池中移除掉
11:03 - 11:05
And then say I'm reading a page here
接着我表示，我正在从这⾥读取⼀个page
11:05 - 11:07
Sorry, I want to read a page that's not currently memory
抱歉，我想说的是，我想去读取⼀个不在当前内存中的page
11:08 - 11:11
I want to put a latch on this entry in the hash table
我想在hash表中这⼀项上加个latch(锁)
11:11 - 11:14
So that I can go fetch the page and then update the page what I point to it
这样我就可以去拿到这个page，然后更新这个我所指向的page
11:14 - 11:18
Right, and I have to do this, because multiple threads were running at the same time
我必须这么做，因为同⼀时间可能有多个线程在运⾏
11:18 - 11:21
I can't assume that I'm the only person, I'm looking at the page table
我⽆法保证只有我正在访问这个page表
11:21 - 11:25
So I want to rent somebody else from taking this this entry in my page table
So，我想将我的page表中的这⼀项也让别⼈来使⽤
11:25 - 11:28
And while I'm fetching the page that I need, they come and steal it from me and put
something else in
当我正在接收那个我需要的page时，其他⼈会从我⼿中偷⾛这⼀项，并往⾥⾯放些其他东⻄
11:29 - 11:34
Alright, so again is theirs well see this as we go along later in the semester
Well，我们会在这学期内晚些时候看到这个
11:34 - 11:38
But there's a bunch of extra stuff we have to do to keep track of what pages have been
modified
但我们必须做⼀些额外的事情，以此来跟踪哪些page被修改了
11:38 - 11:40
So the dirty bit is just sort of one piece of it
So，这个Dirty-Flag只是其中的⼀部分
11:40 - 11:44
We also need keep track of who actually made the modification
我们也需要去追踪是谁进⾏了这项修改
11:44 - 11:48
So because we want to write a log record to say ,here's the change that was made
So，我们想通过⽇志来记录做了哪些修改
11.48-11.51
we're gonna make sure that log records written first before our page is written
我们要去确保我们在先写完⽇志后，再去修改我们的page
11:51 - 11:54
This is another example,why mmap is a bad idea
这是另⼀个例⼦，它可以说明为什么mmap是⼀个糟糕的想法
11.54-11.59
because I can't guarantee the operating system is not gonna write my page out the disk
before I want it to
因为我⽆法保证操作系统在我想让它这样做之前，不会将我的page写出到磁盘上
因为我⽆法保证操作系统在我想将page写到磁盘之前，不去做这件事情(知秋注：⾃⼰⽆法控
制，OS可能会提前将page写出到磁盘)
11:59 - 12:02
Okay, that's it doesn't prevent you from doing that
Ok，它不会阻⽌你这样做
12:03 - 12:08
At least on FreeBSD can let you do this ,but windows and Linux don't much prevent this
⾄少在FreeBSD上，它允许你这样做，Windows和Linux上不会阻⽌这么做
12:09 - 12:11
Alright, so is this clear what we're trying to do here
So，你们应该明⽩我们此处试着要做的事情了
12:11 - 12:18
Right, basically managing our own memory ,but we're keeping track of how the
transactions or queries are modifying the pages
基本上来讲，就是管理我们⾃⼰的内存，但我们也要去跟踪事务或查询是如何修改page的
12:18 - 12:27
And we have to protect ourselves and the page table to prevent anybody else ,and you
know addicting things overwriting stuff, before we're done with with what we wanted
need to do
在我们想做任何事之前，我们必须保护page表免受其他⼈污染或者是被其他⼈覆写⾥⾯的东⻄
12:29- 12:31
Any questions,okay
有任何问题吗？Ok，看起来没有
12:33 - 12:38
So I need to make a very important distinction now about the difference being locks and
latches
关于Lock和Latch，我需要说下它们之间的⾮常明显的区别
12:39 - 12:43
So this will come up later on you have to do this for the first project as well
So，这会在之后出现，你们也会在你们第⼀个Project中遇到这个
12:43 - 12:45
If you're coming from an operating system background
如果你们之前有学过操作系统
12:46 - 12:50
in there word a lock is what we call a latch
以操作系统来看的话，所谓的lock，我们将之称为latch
12:50 - 12:57
So let me try both of them in the context of databases,and I'll see us to describe how
they map into the OS world
So，我会试着以数据库的⻆度来解释它们两个，我会让你们看到它们是如何与操作系统对应起
来的
12:58 - 13:03
So a lock in the database world is some higher-level logical primitive
So，在数据库的世界中，lock是某种更⾼级的逻辑原语
13.03-13.09
that's going to protect the contents of the database,the logical contents like a tuple,a
table, a database
它会去保护数据库中的逻辑内容，例如：tuple，表以及数据库
13:11 - 13:16
All right, and the Transaction is gonna hold this lock for its duration and while it's running
事务会在运⾏的时候去持有这个lock
13.16-13.18
which means could be multiple queries
这就意味着可以有多个查询
13:18 -13:21
This could be you know multiple milliseconds or multiple seconds even
它们可能许多⼏毫秒或者甚⾄是⼏秒钟来完成
13.21-13.24
or even in minutes or hours if it's a really long running query
如果它真的是⼀个耗时很⻓的查询，那就可能得花⼏分钟或者⼏⼩时才完成
13:25 - 13:33
So in that word again this is something that database systems can provide to us and
expose to you as like the application programmer
So，换句话讲，数据库系统可以为我们提供这些东⻄，它能够将这些暴露给我们这些应⽤程序
开发⼈员
13:33 - 13:35
You even see what locks are being held for as you run queries
你甚⾄可以在你运⾏查询时看到持有的是什么lock
13:35 - 13:39
Latches are the low-level protection primitives
Latch是⼀种底层保护原语
13.39-13.43
that we use for the critical sections of the internals of the database systems
我们使⽤它来保护数据库系统内部的关键部分
13.43-13.48
like protecting data structure, protecting regions of memory
⽐如，保护数据结构和保护内存区域
13:50 - 13.54 ！！！
And so for these, these latches we're gonna hold for just the duration of the operation
that we're making
So，在我们执⾏操作的期间内，我们会持有这些latch，⽤来保护某些东⻄
13.54-13.55
like if I go update my page table
⽐如说，如果我去更新我的page表
13.55-14.02
I take a latch on the entry on the location of that I'm gonna modify make the change and
then I release the latch
我会在我要去修改的地⽅加上⼀个latch，修改完后，我会将它释放
14:04 - 14:08
All right and we don't need to worry about rolling back any changes in the same way we
do for locks
All right，我们⽆须去担⼼回滚到修改应⽤前的情况，我们在使⽤Lock时，也是以相同的⽅式操
作的
Alright，我们以同样的⽅式使⽤lock(知秋注：这⾥应该是latch)，我们⽆需去担⼼对改变进⾏的
回滚操作
14:08 - 14:13
Because it's an internal thing or updating the physical data structure of the database
system
因为它是⼀个内部的东⻄，它会去更新数据库系统的物理数据结构
14:13 - 14:16
I make the change and if I can't actually get the latch I want
在我进⾏修改时，如果我没能拿到我想要的Latch
14.16-14.19
then I did abort and don't worry about rolling back
那我就会终⽌操作，并且不需要担⼼回滚问题
14.19-14.20
yes
请问
14:20 - 14:22
Student:(提问)
14:22 -14:25
Okay so he says ,rolling back changes this will come later on we talk about concurrency
control
Ok，他想问的是回滚修改这⽅⾯的问题，这会在我们之后讨论并发控制的时候提到
14:25 - 14:30
But basically say like I wanna take money out of my bank account and put it in your bank
account
但基本上来讲，这就像是我从我的银⾏账户中取钱，然后将钱放⼊你的银⾏账户那样
14:30 - 14:34
So we take money out of my bank account ,but then the system crashes before I put the
money in your account
So，当我从我的账号中取到钱后，在我要将钱打⼊你的账户时，系统崩溃了
14:34 - 14:36
I want to roll back the change I made to my account
我想将我的账号回滚到我对我的账号操作之前的样⼦
14.36-14.37
because I don't want to lose that money
因为我不想丢掉这些钱
14.37-14.39
that's not to me like that
我不想遇到这种情况
14:39 - 14:42
Right, this will discuss a whole lecture on concurrency control ,it's awesome trust me
So，我们会花⼀整节课来讨论并发控制，相信我，这块内容很棒
14:43 - 14:45
But for now the main thing we're focused on this thing here
但现在，我们主要关注的还是这块内容(Lock和Latch)
14:45 - 14:52
Right, so again in the operating system world this would allow should be something like a
Mutex
So，在操作系统中，此处的Latch就像是它⾥⾯的Mutex
14:52 - 14:57
We're actually going to use mutexes in our database system to protect the critical
sections of things
实际上，我们会在我们的数据库系统中使⽤mutex来保护其中的关键内容
14:57 - 15.00
So I will try to be very careful and always say latch when I mean latch
So，当我在讲Latch的时候就会使⽤Latch⽽不是其他词汇，我会谨慎措辞
15.00-15.04
but occasionally I slip up and we'll use lock
但偶尔我会翻⻋，我会将Latch讲成lock
15.04-15.08
but I said it's an internal thing we mean latch
但如果是内部的东⻄，那我们讲的lock就是latch
15:08 - 15:09
It's also very confusing too
这也让⼈⾮常困惑
15.09-15.14
because the mutex implementation you would use to protect you for the latch is called a
spin lock
因为我们要在latch中所使⽤的mutex实现被称为spin lock(⾃旋锁)
15:14 - 15:16
Alright, but it's really you know this thing is not this thing
但你们要知道此物⾮彼物
15:17 - 15:19
ok all right
Ok
15:20 - 15:25
So the other think we want to make is the difference between the page directory and the
page table
另⼀个我们要去区分的就是page⽬录和page表
15:25 - 15:32
So remember the page directory is what we're going to use to figure out where to find
pages in our files
So，要记住，page⽬录的作⽤是⽤来找到page在我们数据库⽂件中的位置
15:32 - 15:34
So we want page 123
So，假设我们想要page 123
15.34-15.40
it'll tell us what file at what all offset or what's what set of files have what we're looking
for
它会告诉我们我们要找的那个page在这些数据库⽂件中什么地⽅，page中所有offset值（即slot
数组）有哪些
15:40 - 15:44
So all the changes we're gonna make to the page directory have to be durable
So，我们对page⽬录做出的所有改变都必须持久化
15.44-15.45
they have to be written out the disk
它们必须被写到磁盘上
15.45-15.49
because if we crash, come back we want to know where to find the pages that we have
因为如果系统崩溃了，恢复后我们想要知道该在哪⾥可以找到我们拥有的page
15:50 - 15:53
The page table is an internal in memory map
page表则是内存中的内部映射
15.53-15.58
that just maps page IDs to where the frames of they are in the Buffer Pool
它将page id映射到它们在Buffer池中frame的位置
15:58 - 16:01
So this thing can be literally ephemeral
So，这个东⻄可以是暂时的
16.01-16.02
and we don't need to backup by disk
我们⽆须在磁盘上对它进⾏备份
16.02-16.07
because if we crash and come back our Buffer Pool is blown away anyway, so who cares
因为如果我们遇上系统崩溃，然后恢复后，我们的buffer池⾥的东⻄就灰⻜烟灭了，So没⼈会去
在意⾥⾯有什么
16:07 - 16:13
So this page directory has to be durable, the page table does not have to be
So，page⽬录必须持久化，但page表则⽆需这么做
16:13-16:18
And that means we just used whatever your favorite hash map or hash table
implementation you want
这就意味着我们可以使⽤我们喜欢的hashmap或者我们想要的hashtable实现
16:18 - 16:22
Right for project 1 you're just used to be a std map that's fine
在Project 1中，你们也可以使⽤std::map，这没问题
16:23 - 16:26
Because again we don't have to worry about this thing being durable
因为我们⽆须去担⼼它是否要持久化
16:26 - 16:30
We have to make sure it's thread safe certainly, but not durable
我们必须确保它是线程安全的，它不需要是持久化的
######################################################################
##
16:31 - 16:37
All right ,so now when we start talking about how we want to allocate memory in our
database for the Buffer Pool
So，现在我们要开始讨论该如何为我们数据库中的Buffer池分配内存了
16:37 - 16:40
We will we start to think about this in two different ways
我们可以以两种不同的⽅式来思考这个问题
16:40 -16:44
So the first is that we can choose what I call a sort of global policies
我们可以选择的第⼀种⽅式，我将它称为全局策略(Global Policies)
16.44-16.51
where we're trying to make decisions that benefit the entire workload that we're trying to
execute
即我们所试着做出的决策能够使整个我们要试着执⾏的worklaod都受益
16:51 - 16:55
We look at all the queries, all the transactions that are going on in the system
我们会去查看所有运⾏在该系统上的查询和事务
16:55 - 17:01
We try to say at this point in time what's the right thing I should do for choosing what
should be in memory versus not memory
我们试图在此讲出我应该做的正确的事情，以选择该内容是否应该存储在内存中
17:02 - 17:09
An alternative is to use a local policy,we're on for each single query or each single
transaction we're running
另⼀种⽅案就是使⽤局部策略，即针对每个单个查询或者单个事务来进⾏
17:10 - 17:14
We try to say what the best thing to do to make my one query,one transaction go faster
我们尝试讲出可以让我的⼀个查询，⼀个事务进⾏得更快的最佳⽅法
17.14-17.20
even though for the global system that actually, might be a bad a bad choice
即使对于整个系统⽽⾔，这实际上可能是个糟糕的想法
17:21 - 17:25
So the there's no one way that's better than another
So，我并没有说这种策略要⽐另⼀种策略要来得更好
17.25-17.29
obviously there's optimization you can do ,if you have a global view versus a local view
很明显，如果你知道全局的样⼦或者局部的样⼦，你就可以进⾏优化
17:28 - 17:33
But then for each integer query, you might be more tailored to what they want to do to
make that run fast
但是，对于每个整数查询，你可能会去选择更适合它们的优化，以使其运⾏起来更快
17:33 - 17:37
So as we've seen a much of these examples as we go along for optimizations
So，正如我们在讲解优化这块内容时所看到的很多例子一样
17:38 - 17:41
The most systems will probably try to do accommodation of the two of them
⼤多数系统可能会试着尽量同时使⽤着两种优化
17:42 -17:45
What you'll be implementing for the first project is considered a global policy
我觉得你们在实现第⼀个Project时使⽤全局策略⽐较好
17.45-17.49
because there's just looking at ,you know what's the least recently used page and
removing that
因为它只需要找到最近最少使⽤的page，将它移除即可
17.49-17.52
even though that make me bad for one particular query
即便它对于某个特定查询来说会变得很糟糕
17:54 - 17:58
All right ,so that basically all you really need to know about how to build a Buffer Pool
So，简单来讲，你们这群⼈真的需要去了解如何去构建⼀个Buffer池
17:59 - 18:02
Right it's just you have a page table that map's page IDs to frames
你需要有⼀个page表，它将page id映射到frame处
18.02-18.09
and then you look in the offset in the allocated memory, and that tells you here's the
page that you were looking for
接着你根据我们所分配内存中的offset值，它会告诉你我们所查找的page的位置
18:09 - 18:11
It seems pretty simple right
这看起来真的很简单，对吧
18:12 - 18:21
So now we want to talk about how to actually make this thing be super awesome or
super tailored for the application that we're trying to run or the work over trying to run
inside of our database system
So，现在我们要讨论的是，如何针对我们要运⾏的应⽤程序真正使它变得超赞或超量身定制，
或者如何使其在数据库系统内部运⾏
18:21 -18:25
And this is gonna allow us to do certain things that the operating system can't do
这就允许我们去做⼀些操作系统没办法做的事情
18.25-18.27
because it doesn't know anything about what kind of queries you're running
因为操作系统不知道我们要运⾏的查询是哪⼀种
18:27 - 18:30
It doesn't know what data they're touching,what are they're gonna touch next
它不知道它要去接触哪些数据，也不知道接下来要接触什么
18:30 - 18:36
All right ,so now we can talk about what we can do to make this thing do better than
what sort of a naive scheme would do
So，现在我们要来讨论，我们该如何做才能⽐幼稚的scheme来的更好
18:36 - 18:42
So talk about how to handle multiple Buffer Pools ,prefetching the scan sharing and then
the last one be Buffer Pool bypass
So，我们会去讨论如何处理多Buffer池、Pre-fetching(预取)、扫描共享以及Buffer Pool
bypass
18:43 - 18:49
Okay, so in my example that I showed, I referred to the Buffer Pool as a single entity
Ok，So在我之前展示的例⼦中，我将Buffer池当做⼀个单个实体
18:50 - 18:51
And the database system has one Buffer Pool
数据库系统有⼀个Buffer池
18:52 - 18:55
In actuality you can have multiple Buffer Pools
实际上，我们可以有多个Buffer池
18:55 - 18:58
So you have multiple regions of memory you've allocated
So，我们可以分配多块内存区域
18:58 - 18.59
They each have their own page table
每个区域都有它们⾃⼰的page表
18.59-19.04
they each have their own been mapping to from page IDs to frame IDs or frames
它们每⼀个都有⾃⼰的⼀套page id和frame的映射关系
19:05 - 19:06
All right
19.06-19.08
and the reason why you want to do this is
我们想这么做的原因是
19.08-19.13
now, you can have for each Buffer Pool,you can actually have local policy for that Buffer
Pool
实际上我们可以在每个Buffer池上使⽤局部策略
19.13-19.16
that's tailored for whatever is the data that you're putting into it
这样可以为你所放⼊的数据进⾏量身定制
19:16 - 19:22
You know so for Example, I could have a a single Buffer Pool for each table
例如，我可以让每⼀个表都有⼀个Buffer池
19:22 - 19:25
Because maybe some tables I'm doing a bunch of sequential scans
因为可能在有些表中我要进⾏⼀系列循序扫描
19.25-19.29 ！！！！！！！
and some tables I'm doing pointer queries or I'm jumping to single pages at a time
在某些表中我会进⾏指针查询（知秋注：其实就是索引查询），或者每次我要跳转到某个单个
page上（知秋注：表中查询）
19:29 - 19:34
And I can have different cashman policies or different placement policies to decide
based on the two workload types
我可以根据这两种workload类型来决定使⽤不同的替换策略
19:35 - 19:38
But I can't do that easily if it's a giant just a giant a Buffer Pool
但如果它是⼀个⾮常巨⼤的Buffer池，那我就没法轻易地这么做了
19:39 -19:42
Well, let's say I have it I can have a Buffer Pool for an index and Buffer Pool for tables
Well，假设我可以让⼀个Buffer池来处理索引，另⼀个Buffer池⽤来处理表
19:42 - 19:44
And then they have different access patterns
它们有不同的访问模式
19:44 - 19:46
And then I can have different policies for each of those
那么我就可以针对它们每个使⽤不同的策略
19:46 - 19:55
The other big advantage you also get is that it's gonna end up reducing latch contention
for the different threads that are trying to access it
我们还可以获得另⼀个很⼤的优点，这样做将最终减少那些试图访问Buffer池的不同线程间争抢
Latch的情况发⽣
19:55 - 19.57
Right, so when I do that look up in the page table
So，当我在page表中进⾏查找时
19.57-20.00
I have to take a latch on the entry that I'm looking at
我必须在我所查看的那⼀项上⾯加⼀个latch
20:00 - 20:02
As I go find the frame that has the data that I want
当我找到那个存放着我想要的数据的frame时
20.02-20.04
and I'll make sure that nobody else swaps that out
我要确保没⼈会将它交换出去
20:04 - 20:09
But you know from the time ,I do the lookup from the time ,I go get the page that I want
即从我查找它，到我拿到我想要的那个page时，没⼈去动它
20:09 - 20:14
And so that means that I could have a bunch of threads call contending on the same latch
这就意味着我会遇上⼀堆线程争抢同⼀个latch的情况
20.14-20.16
that could they're all accessing the same page table
它们会访问同⼀个page表
20:17 - 20:19
So no matter how many cores, I have on my brand-new machine
So，不管我全新的电脑上有多少个Core
20:19 - 20:21
I'm not getting good scalability
我在可扩展性这块并没有得到好的提升
20.21-20.25
because everything's contended on these critical sections
因为在这些关键部分，任何东⻄都会被争抢
20:26 - 20:28
But now if I just have multiple page tables
但现在如果我有多个page表
20.28-20.34
each thread ,you know they could be accessing different page tables at the same time
每条线程就能在同⼀时间访问不同的page表
20:34 - 20:36
And therefore they're not contending on those latches
因此，它们就不会去争抢这些latch
20.36-20.38
and now I get better scalability
这样，我就得到了更好的可扩展性
20:38 - 20:40
Now still could be still bottlenecks on the disk feed
现在，磁盘可能依然是性能瓶颈
20.40-20.41
which is always a big problem
它⼀直是个⼤问题
20.41-20.46
at least internally now, I'm not worried about them you know trying to all acquire the
same latch
⾄少现在，我不会去担⼼这些线程都去获取同⼀个latch

05-02
20:48 - 20:52
So this is something you see mostly in the enterprise or expensive database systems
So，你会在某些企业级数据库系统或者说昂贵的数据库系统经常看到这些东⻄
20:52 - 20:59
So Oracle ,DB2, Sybase and Informix ,SQL Server, all support this ability to have multiple
buffer pools
So，Oracle、DB2、Sybase、Informix、SQL server这些全都⽀持多Buffer池
21:00 - 21:01
DB2 you do all sorts of crazy things
在DB2，我们可以做各种疯狂的事情
21:01 - 21:03
You can create multiple multiple buffer pools
我们可以创建多个Buffer池
21:03 -21:04
You can assign them different tables
我们可以分配给它们不同的表
21:04 -21:06
You can have different cache policies for all them
并且你可以对它们使⽤不同的缓存策略
21:06- 21:09
If you set them to be their different page sizes
如果你将它们设置为不同的page⼤⼩
21:10 - 21:13
MySQL even though it's open source actually has this as well
虽然MySQL是开源的，但实际上它也有这个
21:13 - 21:15
it's not that as sophisticated
它并没有那么复杂
21.15-21.17
you just say how many buffer pool instances you want
你只需说你想要多少个buffer池实例即可
21:18 - 21:27
And then they just do round-robin hashing to decide if you'll for a given page id, where's
the data that I'm looking for, what buffer pool has it
接着，对于⼀个给定的page id，它们会通过Round-robin hash来判断我要找的数据在哪，它放
在了哪个buffer池⾥⾯
21:28 -21:30
So there's two ways to use these things ,right,
So，有两种⽅式来使⽤这些东⻄
21:31 - 21:36 ！！！！
They've to map the thing that you're looking for to a buffer pool that has the page that
you want
它们将你所查找的东⻄映射到buffer池中你想要的那个page上
21:36 - 21:37
I said typically what happens is,
我说的是通常情况它是这么搞的
21.37-21.38
if you have multiple buffer pools
如果你有多个buffer池
21.38-21.43
you can have a page in one ,you know in buffer pool one this time
此时，你可以将⼀个page放在buffer池1中，你知道这次操作的是buffer池 1
21:43 - 21:45
And then when you fetch about the disk later on, it comes out another one
然后当你稍后从磁盘中获取⼀个page数据时，它就会到另⼀个buffer池中
21:45 - 21:47
It always wants to be in the same location
page始终想呆在同⼀个位置上
21:47 - 21:48
So you know how you know how to find it quickly
So，这样你就知道该如何快速找到它了
21:50 - 21:58
So the first approach is that,you can actually extend the record ID to now include
additional metadata about what database object,this buffer pool is managing
So，第⼀种⽅案就是你可以对record id进⾏扩展增强，往它⾥⾯放些额外的元数据，这些元数
据是关于该buffer池所正在管理的数据库对象的信息
Buffer池通过将数据库对象的record id维护管理起来，以此来管理数据库对象（database
object）（知秋注：即将数据库对象的record id维护到⼀个列表中，这样就能根据每个id找到对
应的对象条⽬）
21:59 - 22:05
So if you recall when we looked at the record IDs of Oracle and SQL Server
So，如果你回想下我们当时所看的Oracle和SQL server的record id
22:05 - 22:09
They had extra columns extra information that PostgreSQL didn't have
它们通过额外的列来保存额外的信息，但PostgreSQL并没有
22:09 - 22:11
PostgreSQL had the page and the slot number
PostgreSQL有的是page和slot number
22:12 - 22:16
Oracle have like the object number ,page number and a slot number
Oracle则是object number（知秋注：即record id），page number以及slot number
22:17 -22:19
So we could use that additional object number
So，我们可以使⽤这个额外的object number
22.19-22.21
,they didn't have another map that says
它并没有其他映射关系
22:21- 22:26
All right, for object you know XYZ ,you canit's in this buffer pool or that buffer pool
假设，对于对象xyz，它可以放在这个buffer池，或者另⼀个buffer池
22:28 - 22:32
And so now the requests from upper level of the system you're saying, give me you know
give me a record 123
So，现在有个来⾃上层系统的请求表示，请把record 123给我
22:33 -22:38
And I know how to split that up and find out what object it corresponds to ,and what
buffer pool will maintain that data
我知道该如何去解析这个请求，找到所对应的对象，以及维护该数据的那个buffer池
22:40 - 22:43
For the hashing approach again, I think that's what MySQL does it's pretty simple
我们来看下这种hash的⽅法，我觉得MySQL中所做的就⾮常简单
22.43-22.48
you just take the record ID ,you hash it and mod n by the number of buffer pools you
have
你传⼊record id，对它进⾏hash，并使⽤它（record id）对你所拥有的buffer池的数量n进⾏取
模（知秋注：两次操作，通过hash来确定这buffer池中的位置，通过取模来确定在哪个池⾥）
22:48 - 22:50
And that just tells you where to go get the data do you want
然后，它就告诉你你能在哪⾥找到你想要的数据
22:51 - 22:54
And this you do is really quickly really fast
通过这个⽅式，你可以快速的找到你要的数据
22.54-22.55
it's not an expensive operation
这并不是⼀个代价很⾼的操作
22.55-22.57
actually for either there's it's not an expensive operation
实际上，它们俩都不是执⾏代价很⾼的操作
23:00 - 23:03
All right,the next optimization we can do is to do PRE-FETCHING
下⼀个我们能做的优化就是pre-fetching（预取）
23:04 - 23:11
So the idea here is that again, we want to minimize the stalls and the database system
due to having to go to disk or read data
这⾥的想法是，我们想去最⼩化数据库系统中的停顿，它是我们不得不从磁盘中读取数据所带来
的影响
23:11 - 23:15
So if we start doing like a scan and our buffer pool is emptying
如果我们现在进⾏扫描之类的操作，并且我们的buffer池是空的
23:16 - 23:19
This query wants to read page0
这个查询想去读取page 0上的数据
23.19-23.21
,page0 there is not in memory , not in our buffer pool
然⽽，page 0并不在内存中，也不在我们的buffer池中
23:22 -23:27
So we have to stall that thread until we go out the disk fetch it,and then put it into our
buffer pool
So，我们不得不让那个线程停下来，知道我们从磁盘中拿到那个数据，并将它放到我们的buffer
池中
23:27 - 23:30
Then once it's in our buffer pool
接着，⼀旦它出现在我们的buffer池⾥⾯
23.30-23.34
then we hand back the pointer to the upper-level system say,the page you wanted is
now here in our memory
然后，我们将这个指针传给上层系统，并表示你想要的这个page现在已经在我们的内存中了
23:35 - 23:36
Go do whatever it is that you want to do
去做你想做的事情吧
23:38 - 23:43
So the way to think about this is like it's a you can think of this arrow is like a cursor
So，你可以将这个箭头想象成⼀个游标
23:43 - 23:47
So internally a database system is gonna keep track of this thing kind of cursor
数据库系统内部会跟踪这种游标
23.47-23.51
like as you iterate over every single page for that your query needs
当你在遍历每个你查询所需要的page时
23:51 - 23:53
You just know where you left off the last time
你就会知道你上次离开的位置在哪
23.53-23.54
so when you go back and said give me the next page
So，当你回来的时候并说请给我下⼀个page
23.54-23.57
it doesn't start at the beginning it jumps where you were you left off
此时并不会从开始的地⽅再开始，⽽是从我们上次离开时的地⽅再开始进⾏查询
23:58 - 24:00
So in this case here, I get page zero ,I'm done
So，在这个例⼦中，我拿到了page 0的数据，我完成了我要⼲的事情
24:01 - 24:02
Right, now I start reading page one
接着，我想在开始去读取page 1
24.02-24.04
same thing I have to stall
现在，我遇上了和之前⼀样的问题，所以我不得不停下来
24.04-24.06
because it's not in memory the disk goes and gets it
因为这个page并不在内存中，⽽是在磁盘中，我们得去磁盘⾥⾯拿到它
24:06 - 24:07
We've put it in our buffer pool
我们将它放⼊我们的buffer池
24.07-24.11
and then once I have that now I can proceed operating their own
然后，⼀旦我拿到它，我就可以对它们进⾏操作了
24:11 - 24:15
So let's say this query here wants to scan the entire table
So，假设这⾥的查询要做的是想去扫描整个表
24:15 -24:17
Alright, these are for our table here, here's all the pages
这⾥是我们的表，这是⾥⾯所有的page
24:17 - 24:24
So at this point, the database system probably recognize,oh I know you're gonna end up
scanning the entire table
此时，数据库系统可能会意识到，Oh，我知道你想去扫描整个表
24:24 - 24:28
So rather than just wait with me waiting for you to ask each page one after another
So，与其让我等你问我⼀个接⼀个的拿到每个page
24:29 - 24:33
Let me go ahead and jump ahead and say,oh I think you're also going to need page2 and
3
不如让我继续扫描下去，并表示，我觉得你需要page 2和page 3
24:34 - 24:37
So let me go prefetch that for you,put into the buffer pool
So，让我为你将这些数据预读到buffer池中去
24:38 - 24:43
So by the time you finished processing page 1 ,and now you go ask me for page 2 or
page 3
当你处理完page 1后，现在你跑来问我要page 2或者page 3的数据
24:43 - 24:45
It's already there, now you don't have a stall
我已经将它放在buffer池中了，现在你就⽆须停顿了
24:47 - 24:49
And again based on how I laid out these pages on disk
根据我在磁盘上排列这些page的⽅式
24.49-24.53
and that might have been a sequential read which is super fast
如果是循序读取，那么速度就超级快
24:54 - 24:59
So by prefetching things ahead of time I ,you know I'm minimizing the amount of random
I/O that I'm doing
So，通过将东⻄提前进⾏预取（pre-fetching），这样我们就可以最⼩化随机I/O所造成的影响
了
25:01 - 25:04
Right,let's keep going this down and prefetch everything's that again,
So，让我们继续扫描下去，将所有东⻄都预取（prefetch）到buffer池⾥
25.04-25.08
that minimizes the impact of these stall
这就能减少停顿带来的影响
25:08 - 25:10
So this example is pretty simple
So，这个例⼦其实⾮常简单
25:12 - 25:18
Right, the operating system at you could figure this out too,now and mmap will actually
do this for you
你们的操作系统就能搞定这个，实际上它通过mmap来帮我们做到这点
25:19 - 25:23
Right,so an mmap you can pat the flag say,I'm gonna do a special read on these pages
on disk
So，mmap可以在这⾥放⼀个flag，并表示，我要在磁盘上对这些page进⾏特殊读取
25.23-25.27
and it'll go ahead and prefetch a bunch of them ahead of time
mmap就会继续下去，并提前预取（prefetch）⼀些page
25:27 - 25:31 ！！！！！！！！
And so again that will minimize the stalls having,because because you had to read
something from disk
So，这样可以减少停顿产⽣的影响，这些停顿是因为我们不得不从磁盘中读取数据所带来的
25:32 - 25:37
So mmap can figure this out,without even knowing anything out what the queries trying
to do
So，甚⾄在不知道查询要试着做什么的情况下，mmap就能做到这点
25:37 - 25:40
And the data system knows what the query wants to do and can go prefetch ahead of
time
数据库系统知道查询想要去做什么，并且能够提前进⾏预取（prefetch）
25:41 - 25:45
But now there's to be some queries where the operating system is not going to be able
to know what to do
但现在有⼀些这样的查询，让操作系统不知道该去怎么做
25:45 - 25:48
But we do in the database system, because we know what the query wants
但我们可以在数据库系统中做到，因为我们知道查询想去做什么
25:49 - 25:52
So you so an example of this would be like an index game
So，这个例⼦看起来就像是个index game（知秋注：⽤我们的话讲，就是找啊找啊找朋友）
25:52 - 25:54
So let's say, I want to do a scan on this table
So，假设我想去对这张表进⾏扫描
25:54 - 25.56
And I want to get all the values
我想拿到所有的值
25.56-26.02
I want to find all the tuples with the value is between 100 and 250
我想去找到tuple中value值在100到250之间的所有tuple
26:02 - 26:06
So now let's say that I have an index on that value
So，现在我会在这个value前加上⼀个索引
26:06 - 26:07
And I've explained what an index is
我已经解释过了索引是什么
26.07-26.10
it's just think of this as like a glossary in your textbook,
你可以将它想象成我们教科书中的词汇表（知秋注：想成我们书中的⽬录就对了）
26.10-26.13
it allows you to jump to a particular page that has the data that you want
它允许你跳到某个特定的page，它上⾯包含了你想要的数据
26:13 - 26:16
All right so right,so instead of doing sequential scan
So，这⾥并不是按顺序扫描
26:16 - 26:19
I can just jump through the index and find exactly what I'm looking for
我可以通过索引进⾏跳转，以此来找到我想找的那个数据
26:19 - 26:22
So let's say that in our index pages
假设在我们的索引⻚（index page）中
26:23 - 26:25
Right, we know ahead of time what the ranges are
我们提前知道了这个范围是多少
26:26 -26:28
So when my query starts to do that scan
So，当我的查询开始扫描的时候
26.28-26.32
I always got to read the first page for the index, because that's the route
我始终得去读取索引的第⼀⻚，因为它上⾯有路线（索引）
26:32 -26:34
Alright, so you know I have to jump to there
我必须跳到那个位置
26:34 - 26:40
But now I'm gonna do a lookup and say, well I'm looking for my query was between 100
and 250
但现在我想去进⾏查找，我想去找到value范围在100到250的所有结果
26:40 - 26:47
So I know that all the pages,I need or the values I want where it's greater than equal to
100 or gonna start on this side of the tree
我知道我想要去获取⼤于或等于100的value，它是从树的这⼀侧开始的
26:48 -26:51
So now I'm gonna jump down into a page 1 and read that
So，现在我会跳到page 1，并读取到这个数据
26:51 - 26:53
Right, that's still sequential at this point
此时，这依然是顺序读取
26.53-26.55
so again the operating system could probably figure this out
So，操作系统可能可以做到这个
26:55 - 26:58
But now I'm gonna branch and go down here
但现在我们选择这个分⽀，并往下⾛
26:59 - 27:02
And I'm gonna scan across the leaf nodes
我会去扫描整个叶⼦节点
27:02 - 27:08
But this is index-page3, index-page5,they're not contiguous with each other on on disk
但index-page 3和index-page 5，它们在磁盘上并没有连续排列在⼀起
27:09 - 27:12
And so the operating system may try to end up prefetching page2 and page3,
So，操作系统可能最终会试着去预取（prefetch）page 2和3
27:12 - 27:15
But I don't need page2 that's wasted
但我不需要page 2，因为它没什么⽤
27.15-27.17
and I need page5 ,and it didn't prefetch that
我需要的是page 5，但它并没有预取（prefetch）到它
27:17 - 27:20
So because we know what the queries gonna do
因为我们知道查询要去做什么
27:20 - 27:25
We can go ahead and prefetch exactly the pages that we want and bring them into our
buffer pool
我们可以提前去预取（prefetch）到我们想要的那些page，并将它们放⼊我们的buffer池中
27:26 - 27:33
Because we can we understand what the what's actually the context What are the
context of the query and what do these pages actually representing
因为我们理解查询中的上下⽂实际是什么意思，也知道这些page实际表达的是什么东⻄
27:34 - 27:36
Because the operating system does see these pages,it doesn't know what's in them
因为操作系统也能看到这些page，但它并不知道这些page⾥有什么内容
27:37 -27:38
But we know because we wrote this code
但我们知道这⾥⾯是什么，因为是我们写了这些代码
27.38-27.42
we know that these are index pages and they're connect together in some way
我们知道这些是index-page，它们以某种⽅式连接在⼀起
27:42 -27:44
So we know how to do this traversal
So，我们知道该如何遍历这个
27:44 - 27:45
So this doesn't come for free
So，这种做法不是没有代价的
27:45 - 27:47
Right there's some extra metadata we had to keep track of
我们必须去跟踪⼀些额外的元数据
27.47-27.53
in these pages to say like, here's the sibling ,here's my starting point or my end point
here's his starting point
在这些page中，可以这么理解，这是我的兄弟节点，这⾥是我的起点或是我的终点，这⾥是他
的起点
27:53 - 27:55
So I know whether I'm gonna scan across over here
于是，我就知道我是否该在这⾥进⾏扫描
27:56 - 27:59
And actually I can't know whether I need 5 before I look at 3
实际上，在我看到page 3之前，我都不知道我是否需要page 5
27:59 - 28:02
So you know this I'm not saying this is like super easy to do
我并没有说这样做起来超级容易
28:02 - 28:04
But you can kind of see again
但你可以从中看出
28.04-28.10
how we may not be jumping exactly through the pages sequentially in a way that the
operating systems not be able to find
我们可能没办法以操作系统所能找到的⽅式去按顺序在这些page中跳转
28:13 - 28:18
Again this to me this is the classic example of what we can do in our database system
that operating system cannot do
对我⽽⾔这是⼀个经典的例⼦，这种事情我们可以在数据库系统中做到，但是操作系统没法做到
28:18 -28:23
Because it doesn't know about what's in the data,it just sees a bunch of region writes
因为它并不知道数据⾥⾯有什么，它只看到了要对⼀堆区域进⾏写⼊操作
28:26 - 28:28
All right the next optimization, we can do is called scan sharing
下⼀个我们能做的优化被称为扫描共享（scan sharing）
28:29 - 28:34
So the idea here is that,we can have queries piggyback off each other
so 关于这个idea，可以这么说，我们可以有⼀些可以利⽤彼此结果的查询（知秋注：
piggyback off这⾥可以理解为搭别⼈的顺⻛⻋）
28:34 - 28:41
And reuse the data that there that one query is reading from disk and use that for its
query
并复⽤某个查询从磁盘中读取到的数据，将该数据⽤于其他查询
28:42 - 28:46
so this is different than result caching
So，这和结果缓存（result caching）的⽅式并不同
28:46 - 28:47
result caching is say I run exactly the same query
结果缓存（result caching）指的是，当我运⾏完全相同的查询时
28:47 - 28:48
and I compute some answer
我计算出了某些答案
28:48 - 28:51
and I cache that results of that，same query shows up again
我将它的结果缓存起来，再遇上相同的查询时就再展示出来
28:51 - 28:53
I can just rather rerunning the query
⽽不是去重新执⾏这个查询
28:53- 28:54
I just give you the answer I had before
我只是将我以前的答案再给你⽽已
28:55 -29:01
This is at a lower level at the buffer manager in the storage layer
这种是在⼀种低级层⾯，也就是存储层的buffer管理器中做的
28.58-29.02
where we're now and just have this cursor accessing pages
我们现在只是通过这个游标来访问这些pages
29:02 - 29:05
We can then reuse the pages, we're getting out from one thread for another thread
然后我们可以复⽤这些page，将从⼀个线程中拿到的这些数据给另⼀个线程使⽤
29:06 -29:11
So way it's gonna work is that when allow multiple queries to attach to a single cursor,
So，它的⼯作⽅式是，当我们允许多个查询附加到⼀个单个游标上时（知秋注：即将这些查询
注册到这个游标数据结构管理的⼀个集合中）
29.11-29.13
that's scanning through our pages and putting them to the buffer pool
扫描我们的pages，并将它们放⼊buffer池
29:13 -29:15
It's almost like a pub sub thing where we say,
这⼏乎就像是Pub/Sub（发布/订阅）之类的东⻄
29.15-29.18
I want to know whether you get a new page
我想知道你是否拿到了⼀个新的page
29.18-29.20
and then you can notify whatever thread that may be waiting for it
然后你就可以去通知可能在等待这个page的那条线程
29.20-29.22
even though they're not the one that actually did the read
即便它们并不是那个实际要去读取数据的那条线程
29:22 - 29:26
So depending on the implementation,
So，取决于具体实现
29.26-29.27
the queries do not need to be exactly the same
查询没必要完全相同
29:27 -29:31
Typically in result caching they do
通常情况下，在结果缓存（result cache）中，查询必须⼀样
29:31 - 29:31
in our world here They don't have to be
但在查询共享（Scan sharing）中，它们就不⼀定要⼀样
29.31-29.34
just I need to know whether I'm reading the same pages
我只需知道我是否正在读取了相同的pages
29:34 - 29:36
And then in some cases to also
在某些例⼦中
29.36-29.39
if they're computing the similar result
如果它们在计算相似的结果
29.39-29.43
we could share those immediate results and across different threads
我们可以横跨不同的线程来共享这些即时结果
29:43 - 29:48
So most like a it's called a materialized view, we'll cover this later in the semester
So，像这种东⻄被称为物化视图（materialized view），之后我们会在这学期内介绍这个
29:48 - 29:51
But for our purposes here with this game, we're just looking at page accesses
但出于我们的⽬的，在这个游戏中，我们只关注page访问
29:52 - 29:55
So again, the way it works is that if a query starts a scan
So，DBMS开始⼯作后，如果⼀个查询开始了⼀次扫描
29:56 -30:01
And then it recognizes that there's another query also doing the same scan
然后，它意识到这⾥有另⼀个查询也在做相同的扫描
30:02 - 30:04
It just attaches itself to the first guy's cursor
它就将它⾃⼰附加到第⼀个查询的游标上
30:04 - 30:07
And then as it gets pages
当这个查询拿到page时
30.07-30.12
we get notified that page came in and we can we can access it as well
它就通知我们该查询拿到了这个page，我们也就可以去访问它了
30:12 -30:18
So the important thing to know is that, we have to keep track of where the second query
came along sort of got on the train for the cursor
有件重要的事情要知道，我们必须跟踪第⼆个查询出现的位置，并搭上这个游标的顺⻛⻋（知秋
注：记录位置后，拿到数据可以返回，继续⾛原来的剩余逻辑）
30:19 - 30:21
So that we know if the cursor ends for the first query,
So，如果我们知道第⼀个查询结束时的光标在哪
30.21-30.23
there may be other data we have to go back and read
那⾥可能还有其他数据需要我们回去读取
30:24 - 30:26
I said we can if we want to look at everything
如果我们想去读取所有数据
30.26-30.29
we start halfway ,we want to know where we started
我们从中途开始扫描，我们想知道我们从哪开始扫描（知秋注：因为这个中途的数据包含在我们
所要的数据中了，拿到后回到之前那个点上，去获取剩余数据）
30:29 - 30:30
so we can come back and see the rest
So，我们可以回过头看，看下剩下的数据
30:31 - 30:37
So as far as I know, this technique is fully supported only in DB2 and SQL Server
据我所知，这项技术只有DB2和SQL server才完全⽀持
30:37 - 30:38
It's super hard to get correct
要正确⽀持它是件⾮常难的事情
30.38-30.39
it seems like kind of trivial
这项技术看起来有点繁琐
30.39-30.43
but it can get pretty gnarly based on what the the queries doing
但根据查询所做的事情，它可以变得⾮常粗糙
它让查询做的事情变得很复杂
30:43 - 30:49 ！！！
Oracle supports has a basic scan shaning,they call cursor sharing
Oracle⽀持⼀种基本的扫描共享（Scan sharing）技术，他们称之为游标共享（Cursor
sharing）
30:49 - 30:53
And then but it only works if you have two exact queries running exact same time
但只有当你有两个查询在同⼀时刻执⾏时，它才会有效
30:54 - 30:58
Whereas these guys can extrapolate based on the query that,you know I need I know
you're reading this table
这些家伙（知秋注：指图中的⼏个数据库，这⾥是在讲⼤家的共同的⾏为）可以从这个查询推断
出，我知道你正在读取这张表
30:58 - 31:00
I need to read the same thing and jump on it
我需要去读同样的东⻄，接着就跳到它上⾯
31.00-31.03
this thing has to say, I have two queries I'm doing the exact same thing
这⾥表示，我有两个查询在做同样的事情
31:03 - 31:04
So let's look an example
So，让我们来看个例⼦
31:05 -31:08
So say we have our first query here,it's computing the sum on A
假设，我们第⼀个查询要去计算出表A中的总和
31:09 - 31:16
So the queries cursors are going to start,and it's just gonna start scanning through the
table looking at each page
So，该查询的光标开始移动，它会开始扫描该表上的每个page
31:17 -31:21
All right, so now let's say at this point here,it wants to read page 3
假设，现在它想去读取page 3
31:21 -31:24
We don't have any a free frame in our buffer pool
在我们的buffer池中，我们并没有任何空余的frame
31:24 - 31:29
So we run our replacement policy algorithm to decide which of these pages we want to
remove
So，我们去运⾏我们的替换策略算法，以此来决定我们想去移除哪个page
31:29 - 31:30
In this case here
在这个例⼦中
31.30-31.31
we'll do something simple and say,
我们会去做⼀些简单的事情
31.31-31.37
well page 0 was the last page that the page that was the oldest since I've accessed it
这⾥我们表示，page 0是⾃我们访问page以来，最早访问的那个page
31:37 -31:42
So let me go ahead and replace that with page 3 and then now I continue scanning
让我将它替换为page 3，接着现在我就可以继续扫描了
31:43 - 31:47
But now let's say after this happens after we swap out page 0 at page 3
但现在，当我们替换完后，即将page 0 换为page 3
31:47 - 31:53
A second query shows up that also wants to do a sequential scan on this table
这⾥所出现的第⼆个查询它也想去对这张表进⾏循序扫描
31:53 -31:55
So without scan sharing
So，在没有扫描共享（scan sharing）的情况下
31.55-32.00
it'll just start at the beginning like the first guy,and just scaning all the way down
它就会和第⼀个查询那样从头开始扫描，然后⼀路往下扫描
32:00 - 32:01
But this is actually the worst thing for us
但实际上这对我们来说是件最糟糕的事情
32.01-32.06
because the first thing is going to read is page 0,but we just threw that out on disk
因为⾸先要去读取的东⻄是page 0，但我们已经将它扔回磁盘了
32:06 - 32:10
So now we can end up thrashing, because this guy can't proceed until page 0 is in
So，现在我们就GG玩不下去了，因为只有page 0在buffer池中的时候，它才能继续处理
32:10 - 32:13
so this is gonna you know it has to store to go fetch it back in
So，它必须将page 0拿到，并放回buffer池⾥⾯才⾏
32:13 - 32:16
but I just had it in memory ,but I got rid of it ,so that's bad
虽然我之前将它放在了内存中，但后来我⼜将它移除了，So，这样就很糟糕了
32:17 -32:19
So with scan sharing
So，在扫描共享（scan sharing）的情况下
32.19-32.21
this guy just hops along for the ride
这个家伙（游标）所做的只是跳来跳去
33.21-33.24
and read the same thing that Q1 reads
并且去读取Q1要读的相同数据
32:24 - 32:29
And you know produces you compute whatever enemy resulting needs for the part of the
data is looking at
并计算出我们所找的那部分数据的结果
32:30 -32:31
So now at this point Q1 is done
So，此时查询1已经结束了查询
32:32 - 32:34
So it's cursor goes away
So，它的游标就消失了
32.34-32.36
and then Q2 starts over at the beginning
然后，查询2从头开始进⾏查询
32.36-32.39
and those nodes that I started when you were reading page 3
这也就是在说，当你在读page 3 时，我开始了
32:39 - 32:43
So this is how long I need to scan down until I get my final result
So，这就是直到我获取到我的最终结果时，扫描所进⾏的路径
32.43-32.57
Yes?
请问
32:57 - 33:06
This question is each query is computing also intermediate results as it reads this data
他的问题是，每个查询在读取数据的同时也在计算中间结果
33:07 - 33:13
So they also now need a memory region to put this data in that's separate from this
buffer pool
So，它们也需要⼀块内存区域去放这些数据，这块区域是和这个buffer池分开的
33:14 -33:17
Yes, so we'll see this an example on PostgreSQL in a second
说的没错，我们会在稍后的PostgreSQL的例⼦中看到这个
33:17 - 33:22
But the typically that memory will also be backed by a buffer pool
但通常情况下，这块内存区域也是由⼀个buffer池所⽀持的
33:23 - 33:32
Right, and because like if I end up computing something you know say ,I'm computing a
join and the output of that joint operator doesn't fit in Memory
因为如果我去计算⼀个join操作，该join操作所⽣成的输出⽆法放在内存中的话
33:32 - 33:35
I need B it started evict those pages out to disk
那我就需要将这些pages移除回磁盘
33:36 - 33:39
So so any ephemeral memory like that would still be backed by a buffer pool
So，任何这种短暂的内存数据也依然使⽤⼀个buffer池来做
33:39 - 33:44
But whether it's in the global buffer pool whether it's a private one for the query,it
depends on the implementation
但它到底是在⼀个全局buffer池还是在该查询所私有的buffer池中，这还得取决于具体实现
33:49 - 33:50
His question same it is
他的问题和刚才那个问题问的东⻄是⼀样的
33.50-33.54
I don't need to bring pages from disk in for that query in memory of buffer pool
我⽆须为了这个查询将page从磁盘中取出，并放⼊内存中的buffer池中
33:59 -34:02
yeah yeah So as I'm writing data
So，当我在写数据时
34.02-34.05
like so this guy and this is Traversal table,because the average is it's a scaler
就好像这个Q2，它会遍历整个table，因为这是⼀个求平均值的函数
34:05 - 34:09
Right,let's say this is you know some really complex computation
假设这是某种⾮常复杂的计算
34:09 - 34:12
As I'm generating ，as I'm scanning this data,I'm updating my intermediate result
就像我在⽣成.。。。就像我扫描这些数据（Buffer pool中的），并更新我的中间结果
34:12 - 34:16
I may overflow memory and those gets swapped out the disk
我可能会遇上内存溢出，这些数据会被刷回磁盘（知秋注：为了腾出空间保留中间结果，将
Buffer pool中的page数据刷出到磁盘）
34:16 - 34:20
So I'm writing to memory and then they would just get to get written out the disk as
needed
So，我将数据写⼊内存，然后根据需要，这些数据会被写出到磁盘
34:20 - 34:23
But it's not like I would read for my query
但对于我的查询来说，我还是要将之读出来的，这就不爽了
34:24 - 34:25
Yeah,it doesn't make sense
对，这并没有意义
34.25-34.30
because anything you need free from like the low-level data is pages
因为你要从内存中释放的数据是那些低级别的数据：pages
34:28 - 34:31
You're gonna put in the buffer pool that everyone can see
你需要将它放到buffer池，以便每个⼈都能看到
34:31 - 34:34
All right so again,this is another good point,this is a shared data structure
All right ，再次强调，这是另⼀个好想法，这是⼀种共享数据结构
34:34 - 34:41
Right,so it did like Q1 is was reading pages and putting to the buffer pool
So，之前查询1在读取page时，将page放⼊了buffer池
34:41 -34:45
Any other thread that need these pages is allowed to go ahead and read it
我们允许其他需要这些page的线程去读取这些
34:46 - 34:50
Alright, the pin latch the pin that just tells you that,hey don't swap this out the disk
此处的latch所固定的地⽅会告诉你，请不要将这个数据放回磁盘
34:50 - 34:54
The doesn't prevent anybody else aren't reading at the same time you are
但这并不阻⽌其他⼈在同⼀时间去读取这个数据
34:54 - 35:00
There's higher level things like the locks that keep track of what pages you're allowed to
read and write from,or what would you know with database objects
有⼀些更⾼层次的东⻄，例如通过locks你可以对⼀些pages进⾏跟踪管理是否允许对这些pages
读和写，或者是将lock(知秋注：这⾥应该是latch)应⽤于你所知道的数据库对象上（database
objects）
35:01 - 35:04
This is the pinned spacing says,hey I'm operating on this don't swap it out
这个被固定住的地⽅表示，hey，我正在操作这块地⽅，不要将它刷出去
35:05 - 35:06
So is that answered your question
So，这个是否回答了你的问题
35:08 -35:13
Okay,so there's another good example what's awesome about the relational model
Ok，这⾥有另⼀个关于关系模型的很好的例⼦
35:13 - 35:15
Because the relational model is unordered
因为关系模型是⽆序的
35:15 - 35:23
Meaning like it doesn't like I can actually have Q2 start anywhere for some queries
这意味着，对于某些查询来说，我实际上可以让查询2从任意地⽅开始进⾏查询
35:23 - 35:28
And the answer I'm gonna produce may be different from based on when I execute it
我所要⽣成的答案可能与我执⾏时⽣成的答案会有所不同
35:28 - 35:30
But it still considered correct
但它依然被认为是正确的
35:31 - 35:36
So if I changed this query to put compute the average and I limit it to a hundred
So，如果我将这个查询的内容修改下，让它去计算100条数据的平均value值
35.36-35.39
meaning I only want me to be the average of 100 tuples
这意味着，我只想要这100条tuple的平均值
35:39 - 35:43
It doesn't specify that I can only, I have to look at the first 100 tuples
这并没有明确我要的是否是前100个tuple的数据
35:43 - 35:48
So I could start here at page 3 with my scan sharing on this cursor
So，因为我扫描共享（scan sharing）的光标在page 2处，所以我可以从page 3开始
35:48 - 35:51
And see the first hundred tuples in these first three pages
然后看下这前三个page中前100个tuple
35:51 - 35:54
And then that's that's enough for me to compute the result
这对于我来说，⾜以计算出结果了
35:55 - 35:58
If I started now at the beginning,I may actually get a different result
如果我从头开始扫描并计算，那我实际可能会得到⼀个不同的结果
35:58- 36:01
But according to the relational model that's still fine
但根据关系模型，这是没问题的
36:02 -36:03
Because the database is unordered,
因为数据库是⽆序的
36.03-36.04
yes
请问
36:10 -36:10
Yes, so he perfect
Yes，他说的很棒
36:11 - 36:18
So he says would it also still be valid if we rather than having the cursor say,all right well
let's go look my disk pages is start fetching them
因此，他说，如果我们不像游标所搞的那样，那还是有效的，well ，让我们来看⼀下我的disk
pages示例图，来开始获取下这些pages
36:18 - 36:20
What do I go check out the buffer pool and figure out what's actually a memory
然后我会去检查下buffer池，弄清楚实际上有哪些东⻄在内存中
36:20 - 36:25
and compute the aggregation of this particular query which with what's a memory,
absolutely, yes
接着基于这个内存中内容来计算下这个特定聚合函数的查询操作，那就绝对能确定了
36:25 - 36:27
And the smartest systems can do that
最智能的系统就可以做到这点
36:30 -36:32
Okay, it doesn't matter right
Ok，这并没有什么关系
36:32 - 36:36
In memory as long as I see a hundred tuples then that this query is still correct
在内存中，只要我看到了100个tuple，那么这个查询的结果依然是正确的（知秋注：不管它的
游标是从哪⾥开始的，数够100个放到buffer pool中就ok）
36:38 - 36:45
Now this is I don't know like you wouldn't want to write this, but it's yeah it's still valid
虽然我不知道，但你肯定不想去写这个，虽然它依然是有效的
######################################################################
#####
36:46 - 36:50
All right the last optimization we'll talk about is the buffer pool bypass
最后我们想谈的优化就是buffer pool bypass
36:51 -36:56
So this sort of related his question before about like the intermediate result memory
So，这个和他之前问的关于中间结果内存的问题有些相关，
36:56 - 37:01
But let's say that I have some queries where we're doing sequential scans
假设我有某些查询，我们要去做循序扫描
37:01 - 37.06
And the I don't want to pay the penalty of having to go look up in the page table,
我不想花⼤量精⼒去 page table中查找，
37.06-37:11
and look at my buffer pool to go figure out whether the page I'm looking for is in
memory
我要从我的buffer pool中来找我所要的page是否在内存中
37:11 -37:13
Furthermore I also don't want to pollute the cache
此外，我不想去污染缓存
37.13-37.18
,and it may be reading some data that I'm not going to need in the near future
它可能会去读取某些我近期不需要的数据
37:18 - 37:24
So the the buffer pool bypass or buffer cache bypass depending what system it is
So，具体是叫buffer pool bypass还是buffer cache bypass，这就取决于是什么系统了
37:23 -37:31
The idea is that you allocate a small amount of memory to the your query a thread
running it
它的思路是，我们分配⼀⼩块内存给执⾏你查询的那条线程
37:31 - 37:33
And then as it reads pages from disk
然后，当它从磁盘中读取page时
37:33 - 37:34
Right,if it's not in the buffer pool
如果该page不在buffer池中
37.34-37.39
it has to go to disk to get it rather than putting it in the buffer pool it just puts it in its
local memory
那么它必须从磁盘中拿到该page，这⾥并不会将它放⼊buffer池中，⽽是将它放⼊本地内存
37.39-37.44
and then when the queries done, all that just gets dropped and thrown away
当查询完成时，所有这些page就会被丢弃
37:44 - 37:47
All right,and you do this again ,because you want to avoid the overhead of going to the
page table
再次强调，你之所以这么做的原因，是因为你们想去避免去page表中进⾏查询所带来的开销
（知秋注：page表中对应的条⽬是带锁的）
37:47 - 37:49
we'll just yeah it's a hash table
Page表就是⼀个hash表
37.49-37.54
it has latches,it's not it's not it's not super expensive,but it's not free,it's not cheap
它⾥⾯有latch，使⽤它的代价并不特别⾼，但也要付出⼀定的代价
37:54 - 37.56
So informix these are called light scans
So，在informix中，这被称为light scan
37.56-38.01
but pretty much every single again major database system supports something like this
但主流的数据库系统都⽀持这种东⻄
38:01 - 38:04
I don't know I don't know whether MySQL 8 does ,I don't think 5.7 does
我不知道MySQL 8是否⽀持这个，但我不觉得MySQL 5.7⽀持
38:06 -38:14
And then again if you recognize that you know,that you only really want to do this,if you
know the intermediate result or their thing you're scanning is not huge
如果你真的想这么做，只有当你操作的是中间结果和你扫描的量不⼤的时候才⾏（知秋注：可以
暂存于bypass中）
38:14 - 38:17
If you're doing a sort, that's gonna be you know terabytes of memory
如果你在执⾏排序，它可能需要TB级⼤⼩的内存
38.17-38.19
then you want to be back by the buffer pool
那么你就会想去使⽤buffer池
38.19-38.21
because that thing can get paid up to disk as needed
因为这样我们可以根据需要将⼀些pages放回到disk中以腾出空间，然后循环往复，直到排序完
成
38:24 -38:30
All right, the last thing to sort of understand also too is what's actually going on below
the database system
最后⼀件我们要去理解的事情就是，数据库系统内部实际做了什么
38.30-38.34
what's happening as we read pages from the operations,
当我们在通过这些操作读取page时，发⽣了什么
38.34-38.36
and what is the operation actually doing
以及操作实际做了什么
38:36 - 38:42
So again all our disk operations are gonna be going through the OS API at the lowest
level the F of them every to fright
So，我们所有的磁盘操作都是通过最底层的OS API来做的，fopen, fread, fwrite
38:44 38:46
You know we're not going to access the raw disk themselves
你知道，我们不会去访问裸设备
38:46 - 38:48
So because we're now going through the operating system
So，因为现在我们是通过操作系统来做
38:49 - 38:50
By default
默认情况下
38.50-38.54
the operating system is gonna maintain its own separate cache for the file system
操作系统会去维护它⾃⼰的⽂件系统缓存
38:54 - 38:56
All right,this is called the OS page cache
这被称为OS page缓存
38:57 - 39:00
So that means again as I read a page from from disk
这意味着，当我从磁盘中读取⼀个page时
39:01 - 39:04
The OS is gonna keep a cap copy of it in his file system cache or OS page cache,
OS会去在它的⽂件系统缓存或者是OS page缓存中保存⼀份副本
39.04-39.08
and then I'll have another copy of it in my buffer pool
然后，我就会在我的buffer池中有另⼀个副本
39:08 - 39:12
So most database systems do not want you to do this
So，⼤部分数据库系统不想让你去这么做
39.12-39.14
no the operating system to do this
不想让操作系统去做这个
39:14 - 39:15
So when you open a file
So，当你打开⼀个⽂件时
39.15-39.19
you pass in the POSIX flag O_direct or direct I/O
你可以通过direct I/O（直接内存I/O）来做，
39.19-39.23
where you have the OS not do any of that caching itself
不让操作系统对该⽂件进⾏任何缓存处理
39:23 - 39:26
And you manage what's in memory on your own
由我们⾃⼰来管理内存中的内容
39:27 -39:32
So pretty much every single database system,when you go to read the manual they
would tell you that make sure you can actually turn this on
So，当你去阅读每个数据库系统的⼿册时，它会告诉你，确保你可以将这个功能打开
39:34 - 39:38
The only database system that does this is its Postgres
唯⼀利⽤os page cache的就是PostgreSQL
39.38-39.42
as far as you know the only major database system send that relies on the os page
cache is Postgres
在主流数据库中唯⼀依赖os page cache的就是PostgreSQL
39:42 -39:45
And so the reason they said they do this
So，他们这样做的理由是
39.45-39.49
because they claim that from engineering standpoint
他们表示从⼯程师的⻆度来看
39.49-39.53
it's one less additional cache thing,they have to manage
他们就⽆须再管理⼀个额外的缓存
39:53 - 39:55
They still has their own buffer pool ,but it's not gonna be as big
他们依然有他们⾃⼰的buffer池，但没有那么的⼤
39:55 - 40:01
It's not gonna use all the memory on the system, like MySQL or Oracle would use
这样就不会去使⽤系统中的所有内存，但像MySQL或者是Oracle就会去使⽤所有内存
40:01 - 40:03
But let the OS do with some additional management themselves
它们会让操作系统做⼀些额外管理
40:04 - 40:05
So from an engineering perspective
So，从⼯程的⻆度⽽⾔
40.05-40.09 ***************
it's less overhead on their part from actually maintaining that that piece of the system
实际维护该系统的那部分方面的开销就减少了
实际上维护该系统这部分的开销就会变得更少
这实际上可以减少维护系统该部分的开销
40:09 -40:13 *********
And it's a minor performance penalty to rely on this which we'll see in a second
依靠这⼀点会降低性能，我们将在稍后看到
05-03
40:14 - 40:17
Okay, so I like using PostgreSQL for demos
Ok，我喜欢使⽤PostgreSQL来作为示范
40.17-40.22
because it's almost like a textbook imitation of a database system
因为它⼏乎就像是教科书般的数据库系统
40:22 - 40:29
And you actually exposes a lot of the important concepts that we're talking about pretty
pretty easily
实际上，你们可以从中⼀⽬了然就看出我们所讨论的许多重要概念
40:30 -40:32
Okay all right,
40.32-40.38
so this is running again a machine back in the lab,let me turn on the lights
So，我们现在⽤的是lab中的机器，让我开下灯
40:45 - 40:50
And I type in those laptop cuz it's a pain to type on the on the surface,I hate the
keyboard
我之所以在这台笔记本上打字的原因是因为，在surface上打字实在是太痛苦了，我讨厌它的键
盘
40:52 - 40:58
Alright,so this is running this is just running Htop,it's a better version of top
So，现在这上⾯正在运⾏htop（监测Linux系统性能的⼀种⼯具），它是top的⼀种更优版本
40:58 - 41:05
And the thing I want to focus on is is the memory you should stuff up here
此处我想强调的东⻄是这上⾯的内存
41:06 - 41:11
So the green bars are telling you what's the resident set size of the processes running on
this machine
这个绿条所告诉你的是该计算机上运⾏的进程的实际使⽤物理内存（resident set size）
41:11 -41:14
Right,it's the memory they've malloc
即已分配内存⼤⼩
41:14 - 41:19
The the orange bar here,that's the filesystem page cache,
这⾥橙⾊条所代表的是⽂件系统的page缓存
41.19-42.21
that's the operating systems page cache
即操作系统page缓存
41:21 -41:32
So again as whatever processes are running on this machine,as they go read,if they're
not using direct I/O,if they go read a page from a file
so 再次，⽆论这台机器上跑的是什么进程，如果它们没有使⽤direct I/O，然后它们从⼀个本地
⽂件中读⼀个page
41:33 - 41:35
The OS is also going to cache it as well
那么，OS就会将它缓存起来
41:36 -41:37
So we can blow this all away
So，我们可以将之清空
41:38 - 42:39
So this is running on Linux
So，这是运⾏在Linux上的
42:39 -41:42
So in Linux we can do a ……
So，在Linux中我们可以做，emmmmmmmm
41:45 - 41:49
That's not,……Oh for sorry
emmmmmmmmmmmmmmm
41:52 - 41.53
So we can run this command
So，我们可以运⾏这个命令
41.53-42.02
that we basically passive we we think the OS the filesystem some cache,
我们觉得OS使⽤了⽂件系统缓存
42.02-42.08
and we passed this flag three into the proc file system to allow us to force the
operating system to flush our page cache
我们通过将这个3传⼊这个drop_caches中，这样允许我们强制让操作系统将我们的page缓存刷
出到磁盘上
42:11 -42:13
So now if we go back and look at htop
So，现在如果我们回去看下htop
42:13 - 42:18
Now we see that the total amount of memory beat buying used,but the machine went
down to three gigs
我们可以看到这台机器所使⽤的的总内存已经下降到了3GB左右
42:18 -42:21
Right,so had 32 gigs before, but now it's down to three gigs
之前使⽤了32G内存，现在下降到只有3G
42:21 - 42:23
So we blew away the file system cache entirely
So，我们将⽂件系统缓存完全清除掉了
42:24 - 42:29
Ok, so now let's go bring up PostgreSQL
Ok，So现在让我们打开PostgreSQL
42:31 - 42:34
The first thing I want to do though is restart it
⾸先我想做的事情就是去重启它
42:35 - 42:41
And so by restarting it we're going to blow away it's it's its buffer pool
So，为了重启它，我们要先将它的buffer池清空⼀下
42:45 - 42:48
All right so now bring this up
So，现在我们可以打开了
42:48 - 42:49
And then reconnect
重新连接
42.49-42.50
,we're turn on timing
我们将timing功能打开
42:51 - 42:53
And then we'll turn off the parallel threads
然后，我们把多线程并⾏给关了
42:55 - 42.59
So we're going to use that same table I showed them last class
So，我们会去使⽤上节课我所展示的同⼀张表
42.59-43.02
ten million entries of a bunch of decimals
上⾯有1000万条DECIMAL数据
43:03 - 43:05
So we can run this query
So，我们可以执⾏这个查询
43.05-43.08
and now what I'm gonna do is I'm gonna use explain again
现在，我要做的就是去使⽤explain
43:08 - 43:12
But I'm gonna pass and analyze two flags analyze and buffers
但这⾥⾯我插⼊了两个参数，即ANALYZE和BUFFERS
43:12 - 43:16
So analyze again is gonna actually run the query and also show you the query plan what
happened
So，这⾥的ANALYZE是会去实际执⾏查询，并向我们展示查询计划所做了什么
43:16 - 43:21
This buffers flag is going to tell you how much data it read from disk,
这⾥的BUFFERS会告诉我们它从磁盘中读取了多少数据
43.21-43.25 ！！！
what percentage of the pages it was reading rating the buffer pool verses on on disk
它所读取的page数量的百分⽐是多少，即buffer池中的page数量与磁盘上page数量的⽐例
43:25 -43:28
And so because we blew away the file system cache
So，因为我们移除了⽂件系统缓存
43:28 - 43:30
We blew away the buffer pool because we restarted the database system
因为我们将数据库系统重启了，所以我们将buffer池也清空了
43.30-43.33
it should the hit should be zero
这⾥的hit（缓存命中率）应该是0
43:34 - 43:41
Right, and you see that it said that for the buffer pool,it had to read 44248 pages
你们可以看到这⾥的buffer池中，它已经读到了44248个page
43:43 -43:49
It had to read the table from disk and it took 1300 milliseconds,1.3 seconds
它需要从磁盘上读取到表花了1300毫秒，也就是1.3秒
43:49 - 43:51
So if I run the same query again
So，如果我再去执⾏同⼀个查询
43:53 - 43:55
Now you see it says that the hit was 32
现在，你们就可以看到这⾥hit变为了32
43:56 -44:00
So it was able to read 32 pages that were already in the buffer pool,
So，它能够读取32个page，这些page已经放在了buffer池中
44.00-44.04
and then the rest it had been reaping disk
然后，剩下的page还放在磁盘中
44:04 - 44:06
Alright, the reason why I wasn't all the pages is
之所以没把所有的page放在buffer池中的理由是
44.06-44.15
because PostgreSQL maintains a buffer pool sort of a small buffer pool ring per query
that's 32 pages
因为PostgreSQL维护了⼀个⼩buffer池，每个查询会有⼀个⼩buffer池，它⾥⾯有32个page
44:15 - 44:16
So for this one
So，在这个例⼦中
44.16-44.18
it was allowed to read 32 pages from the last time it ran
⾃上次执⾏查询后，该buffer池被允许读取32个page
44.18-44.22
I run this again it should go to thank the 64
如果我再运⾏⼀遍，那么这个数字应该变成64
44:22 - 44:25
Yes,so it keeps growing in size as,I'm executing queries over never again
没错，随着我⼀遍⼜⼀遍执⾏这个查询，buffer池⾥的page数量也在变⼤
44:25 - 44:34
Because it recognizes that,oh the data that I need is is it's not my buffer pool,let me
increase the size of its cache
因为它意识到我所需要的数据并没有在我的buffer池⾥⾯，那么我就增加它的缓存⼤⼩
44:35 - 44:43
Alright, so now what we can do is we can force the database system to put everything in
into into memory
So，我们现在能做的就是强制让数据库将所有东⻄都放⼊内存
44:44 - 44:49
So they have this extension of PostgreSQL comes by default when you install it called
pg_prewarm
默认情况下，当你安装PostgreSQL时，他们就会安装这个叫做pg_prewarm的扩展程序
44:50 - 44:59
And all this does is that it's a function that we invoke on the database system to say, hey
go take all the pages for this table and bring it to a buffer pool
这个扩展程序所做的就是，当我们在数据库系统中调⽤这个函数，它就会将该表所有的page放
⼊⼀个buffer池
45:00 - 45:06
Right, and tells you that I ran I did that and I read 44248 pages
它就会告诉你，我执⾏完了，我读取到了44248个page
45:06 -45:12
Remember when I ran the query the first time ,the it said had to read 44248 pages from
disk
还记得我当时第⼀次执⾏这个查询时，它表示它需要从磁盘中读取44248个page
45:12 - 45:16
Because it's getting exactly you know that's the the number pages of this table
这个函数会得到该表中page的具体数量
45:18 - 45:20
He says there's six more pages already there
这位同学表示，这⾥⾯已经有6个page了
45:20 - 45:21
Right, so this is like forcing just read everything
So，这就像是强制让它去读取所有数据
45:22 - 45:24
And I think those 64 pages might have been
我觉得这64个page可能已经，emmmmm
45:27 - 45:30
Yeah, I think it doesn't look to see what's in memory,it just says,I'm gonna get everything
emmm，我觉得它不会去看内存中有什么，但它表示，我会拿到所有东⻄
45:31 - 45:32
cuz i if I do it again
因为如果我再执⾏⼀次
45.32-45.33
it should give me the same number
它应该会返回给我相同的数字
45:33 - 45:35
Yeah,just reads everything
没错，它读取了所有东⻄
45:36 - 45:40
Alright, so now if I go and run that query again
So，现在如果我再去运⾏这个查询
45:45 - 45:46
I'm doing a little bit better
我所得到的结果要⽐之前更好
45.46-45.52
by hit a 16000 pages I needed were in memory
这⾥它命中了16000多个我所需要的page，并放⼊了内存中
在内存中命中了我需要的16000 pages
45:52 -45:56
So I hit hit had it hit in the buffer pool,but I started read a bunch some disk
So，我将它们放在了buffer池中，但我依然从磁盘中读到了⼀些
so，这是我在buffer池中所命中的数量，但我在磁盘上从开始到现在读了这么多数据（知秋注：
27932，远多于buffer池中的16316）
45:59 - 46:00
And we take a guess why?
我们来猜⼀下这是为什么
46:02 -46:03
Yes
请问
46.03-46.12
why not loading everything into the buffer pool
为什么没有⼀股脑将所有东⻄都加载到buffer池中去
46:12 - 46:14
Depends on the size of the buffer pool right
这取决于buffer池的⼤⼩
46:14 - 46:16
So we can do this in PostgreSQL,
So，我们可以在PostgreSQL中做这件事
46.16-46.22
so PostgreSQL has a flag called shared buffers
PostgreSQL中有⼀个叫做shared buffers的参数
46:22 -46:25
And it tells me that it's currently set to 128 MB
它告诉我，它的当前值是128MB
46:26 - 46:30
Right,but the size was about 44248
但这⾥page的数量是44248
46.30-46.35
so select,you can use gimme you I'll updated you can use them as a calculator
So，这⾥我们可以将select语句当做⼀个计算器来使⽤
46:35 - 46:37
So 44248 times 8
So 44248乘以8
46:44 -46:49
Divided by 1024 about giving MB
接着除以1024，结果的单位是MB
46:49 - 46:54
So the size of my table I'm reading is 345 MB
So，我所读取的表的⼤⼩为345MB
46:55 - 47:00
So again the shared buffer is 128,but my size my table is 345
So，shared buffer的⼤⼩为128MB，然⽽我表的⼤⼩是345MB
47:00 - 47:03
So I can go to the PostgreSQL configuration
So，我可以跑到PostgreSQL的配置⾥去看下
47:05 - 47:11
In theory for this is PostgreSQL 11
我的应该是PostgreSQL 11，应该是这个⽬录
47:12 - 47:17
And then go find that particular parameter
接着，找到那个特定参数
47.17-47.20
and lo behold it's 128 MB
这⾥设置的⼤⼩是128MB
47:21 -47:28
So let me set it to,let's be generous,let's say 360 MB
So，让我们来豪⽓⼀把，设个360MB吧
47:28 - 47:31
Right, so now we will restart PostgreSQL
So，现在我们重启下PostgreSQL
47:34 - 47:37
We will blow a our file system cache from the operating system,
我们现在将操作系统的⽂件系统缓存给清除掉
47.37-47.42
because again as we read that page in actually we go back to htop
因为我们要再去读取那个page，我们回到htop这⾥看下
47:42 - 47:45
It got I mean it's hard to see, we've got a little bit bigger
这⾥的数据看起来要⽐之前⼤⼀点
47:45 - 47:47
Hmm, like if you see there's one bar there,
如果你看的话，这⾥有⼀个竖线
47.47-47.51
because that's our table we were reading in
因为这代表的是我们所读取表的资源占⽤率
47:51 - 47:54
So let me go blow away the file system cache
So，让我把⽂件系统缓存清除
47:55 - 47:59
And now go back to PostgreSQL, I need to reconnect
现在，回到PostgreSQL这⾥，我需要重新连⼀下它
48:01 - 48:02
Turn on timing,
打开timing功能
48.02-48.06
set that to this
将它设置为这样
48.06-48.10
to turn up parallel threads,check to see that shared buffers is now
关闭parallel threads，检查下现在的shared buffer
48:13 - 48:15
Oh, I'm an idiot right sorry
我智障了下，抱歉
48:17 - 48:21
Server 10,Client 11, too many co-stars installation sorry
服务器那边版本是10，Client端版本是11，这边看起来有点问题
48:22 - 48:25
So go back here is this
So，回到这⾥
48:31 - 48:34
put about the 128, I said about 360
这⾥我把128改360
48:38 - 48:40
Now we start PostgreSQL
现在我们启动PostgreSQL
48:43 - 48:47
go back here reconnect 360 ,okay good
回到这⾥，重新连接下，嗯，360，没错
48:48 - 48:49
Turn on timing,
打开timing
48.49-48.51
turn on parallel threads
将parallel threads改为0
48.51-48.57
pg_prewarm
这⾥调⽤下pg_prewarm
48:57 - 49:01
We got it 44248 pages and now I've run that query again
我们得到了44248个page，现在我们再来运⾏下那个查询
49:05 - 49:07
And now my hit is 44248
现在我的hit（缓存命中）为44248
49:08 - 49:10
So I gave it database system the right amount of memory
So，我给了数据库系统合适⼤⼩的内存量
49:10 -49:11
I prefetch everything ,
我预取（prefetch）了所有数据
49.11-49.13
and now everything is hitting the buffer pool
现在，所有数据都命中了buffer池
现在，我们在buffer pool中命中了所有的数据
49:13 - 49:16
I had I didn't that touch a disk at all for this particular query
对于这个查询⽽⾔，我就⽆需再去和磁盘打交道了
49:16 - 49:23 ！！
I do every lookup every page and I need to access, I'm going looking in that but in that
page table ,and finding the page reference in a frame
我会查找每⼀个page并对其访问，我会从page table中查找，找对应page下的那个frame
49:23 - 49:24
But everything is in memory here
但现在所有东⻄都在内存中了
49:26 - 49:32
So how can we prove that the database system, PostgreSQL is using relying on the file
system cache
So，我们该如何去证明PostgreSQL使⽤的是⽂件系统缓存呢？
49:32 - 49:35
So let's turn off this explain everything here
So，让我们把这些都删除掉
49.35-49.36
and let's see how long it actually takes
让我们来看下，它实际要花多⻓时间
49:37 - 49:44
Right, it's actually so the first time was 1250 and they got a little faster then it's 733
So，第⼀次它花了1250毫秒，第⼆次稍微快点733毫秒左右
49:48 - 49:50
Alright, so it takes me roughly 700 ms
So，现在差不多花了我700毫秒左右
49:50 - 49:55
So what we can do is go restart PostgreSQL
So，现在我们可以重启下PostgreSQL
50:01 -50:02
And then that blows away the buffer pool
然后，清空buffer池
50:04 -50:08
And now if I come back and reconnect the PostgreSQL
现在，如果回过头来重新连接下PostgreSQL
50.08-50.11
which I think I need to yep
我觉得我需要emmmmmmm
50:11 - 50:12
So now I'm now I'm reconnected
So，现在我已经重新连接上了
50:14 - 50:17
I still a good turn on timing turn off parallel threads
我依然需要将timing功能开启（演示的时候关闭了，应该是⼿误），然后将parallel threads设置
为0
50:19 - 50:21
I run that same query
接着执⾏跟之前⼀样的查询
50.21-50.26
,before when everything was out on disk,I think it took 1.3s
当所有数据都放在磁盘上时，我觉得这次查询⼤概花1.3秒
50:26 -50:30
So this one and then with everything's in the buffer pool, it took 700ms
当所有东⻄都放在buffer池⾥⾯，查询⼤概需要花700毫秒
50:30 - 50:35
So this one should be roughly little bits where timing was all sorry
emmm，不好意思，我⼿误把timing给关掉了
50:35 - 50:36
Well that ruined the demo fuck
Fuck，我⼜得重来⼀遍demo
50:38 - 50:42
So go back I go back this restart this,
So，回到这个窗⼝，我再重启⼀下
50.42-50.47
go back to this ,reconnect
回到这⾥，重新连接
50.47-50..52
timing is on,yeah that's one yeah I got it
现在timing总算打开了
50.52-50.55
,parallel threads are off
把parallel threads设置为0
50:55 - 50.56
Again, so I'm gonna run this query
So，我要去执⾏这个查询
50.56-51.00
I restarted the database system that blows with the buffer pool
我重启了数据库系统，这样把buffer池给清空了
51:00 - 51:03
But the operating system still has its file system cache
但操作系统依然还有它⾃⼰的⽂件系统缓存
51:03 - 51:04
So now that I run this query
So，现在我去运⾏下这个查询
51.04-51.07
we're gonna have a bunch of buffer pool misses
我们就会遇上⼀堆未命中buffer池的情况
51:09 - 51:10
Because nothing is in memory
因为在内存中什么也没有
51:10 - 51:12
but it's still not going to take the full time
但这依然不会去花太久的时间
51:15 - 51:18
Right, took 800ms instead instead of 1.3 seconds
你们看，这⾥花了800毫秒，⽽不是1.3秒
51:18 - 51:21
because the data that it needed was in the file system cache
因为它所需要的数据已经在⽂件系统缓存⾥⾯了
51:22 - 51:25
If I run this again I should get now 700 ms
如果我再运⾏下这个查询，我现在得到的应该是700毫秒
51.25-51.25
no
并没有
51:29 - 51:31
There goes let's go figure what happened
算了，就让它跑吧，我们来看下这发⽣了什么
51:39 - 51:40
Still reading data from disk
看起来它依然是从磁盘读取数据
51.40-51.43
, why is that?
为什么呢？
51:47 - 51:56
Well, it's still running fast even though that time,I think it's because that time slower
,because I think it's running explain analyze
Well，它现在运⾏起来依然很快，我觉得那时候慢的原因是因为使⽤了explain和analyze
51:59 - 52:02
It'll slowly get faster as it creases the cache size for that query
当数据库系统为这个查询进⾏缓存后，它的查询速度就会逐渐变快
52:02 - 52:05
I think it's a query cache thing rather than the global thing
我觉得它缓存的是该查询的结果，⽽不是全局的
52:05 -52:13
But again the main takeaway we showed is that ,we had to give it a decent enough
memory
但是，我们主要想展示的是，我们必须给它⾜够的内存
52:08 - 52:09
and put everything into our buffer pool
将所有的东⻄放⼊我们的buffer池
52:09 - 52:14
and then we were able to get the full speed performance
然后我们可以获得全速性能
52:14 -52:15
All right,so any questions, yes
So，有任何问题吗？请问
52:22 - 52:24
pre run twice? what you mean
预运⾏两次？你想表达什么？
52:26 - 52:27
Oh, that's the file system cache
Oh，这是⽂件系统缓存
52.27-52.29
,that's about the OS cashe,
这是OS缓存
52.29-52.30
question ,yes
请问
52:35 - 52:42
Yes , yes
52:54 - 52.56
So the very first time I did this,
So，在我⼀开始这样做的时候
52.56-53..02
the the buffer pool size was 120 MB, the table size is 345 MB
buffer池的⼤⼩是120MB，表的⼤⼩是345MB
53:06 - 53:06
It didn't
并不是
53.06-53.10
that's why I had to lookups in read from disk
这就是为什么我要从磁盘上去查找数据
53:15 - 53:16
In the very beginning
在最开始？
53:17 - 53:17
Huh,
53:19 - 53:22
there's not we spending all our time this is this is walk through
我们不在此浪费我们的时间了，重新来过
53:24 - 53:26
Right, so let's do this, go back,
So，让我们来做这个，先回到这⾥
53.26-53.30
we're going to blow away the file system cache, restart PostgreSQL
清空⽂件系统缓存，重启PostgreSQL
53:31 -53:34
You know now we go look and and in our
现在我们去看下htop
53:36-53.38
I mean that that bar is not a trivial potentially for PostgreSQL
我的意思是，这个竖线并不重要，它代表的可能是PostgreSQL
53.38-53.42
like there's other things running on the System
也可能是这个系统上还运⾏了些其他东⻄
53:42 - 53:44
But I blew away the ffile system cache
但我清空了⽂件系统缓存
53.44-53.46
I've restarted PostgreSQL now there's nothing in memory
我已经重启了PostgreSQL，现在内存中没有任何数据
53:47 - 53:51
So I go back to the PostgreSQL, you need to reconnect turn off parallel threads
So，我回到PostgreSQL这⾥，我们需要重连⼀下，然后关掉parallel threads
53:53 - 53:55
And so if I run the query now the first time
So，如果我想再去运⾏这个查询，这是我第⼀次运⾏
54:02 - 54:03
Great nothing's in memory
很好，现在内存⾥什么也没有
54.03-54.06
I had to read 44,000 pages
我需要去读取44000个page
54:06 - 54:08
Okay, so that's expected
Ok，这是我们所期望的
54:11 - 54:16
pg_prewarm tells the database system to go read everything that's on disk for that table
,bring to my buffer pool
pg_prewarm会告诉数据库系统去读取磁盘上该表的所有数据，并将它放⼊我的buffer池中
54:20 -54:22
All 44,000 pages yes
没错，将整个44000个page都放到buffer池中
54:22 - 54:23
I can do this again
我可以再做⼀遍
54:29 - 54:31
Right, it read 44,000 pages, now I run the same query
它读取了44000个page，现在我再执⾏⼀次相同的查询
54:35 - 54:37
And now my hit is exactly 44,000
现在，我的hit就是44000
54:37 - 54:41
hit means like it was hit I the thing I was looking for was found in the buffer pool
hit的意思是我所找的东⻄能在buffer池中找到的数量
54:42 - 54:45
So I forced the database system bring everything back in the memory
So，我强制让数据库系统将所有数据放⼊内存
54:46 - 54:48
And the first example, I only had 120 MB
在第⼀个例⼦中，buffer池的⼤⼩只有120MB
54:48 - 54:50
So I couldn't put everything on,
So，我没办法将所有数据放在这个buffer池⾥⾯
54.50-54.51
yes
请问
54:55- 54:55
Yes,
没错
55:07 - 55:07
great
很棒
55.07-55.15
so our question is, so I said in the beginning that the PostgreSQL is the only system that
that does you the only major system that relies on the OS page cache
So，我们的问题是，我在开始的时候讲过PostgreSQL是主流数据库系统中唯⼀⼀个依赖OS
page cache 的
55:15 - 55:18
Why doesn't everybody else do this
为什么其他数据库系统不这么做呢？
55:18 - 55:22
Well because now ,I'm gonna have two copies of every single page potentially
Well，假设现在每个单个page我可能都有两份副本
55:23 - 55:26
So, I could have a page in the OS page cache
So，我可以在OS page cache中放⼀个page
55.26-55.29
then I'm gonna have a copy of that page in my buffer pool
然后，我可以在我的buffer池中放⼊该page的⼀份副本
55:29 - 55:33
because now if I modify that page now it's not exact copy anymore
因为如果我想在去修改这个page，那它就不再是⼀个副本了
55:34 - 55:36
So the OS has the old one and I have the new one
So，OS page cache中保存的是⽼的page，⽽我所拥有的是新的page
55:36 - 55:37
So it's redundant data
So，这就是多余的数据了
55:37 - 55:41
So you're more efficient in terms of memory usage ,if you manage everything yourself
So，如果你⾃⼰去管理所有数据，那么你在内存使⽤上就会变得更加⾼效
55:42 - 55:45
Furthermore to,
此外
55.45-55.52
you know think of like in a different database system,I mean most database system
support Linux now, right
我们想象下，对于⼀个不同OS系统下的数据库系统，我的意思是⼤部分数据库系统现在都⽀持
Linux
55:54 - 55.58
But like the major ones they got to support Windows ,BSD ,all these different operating
systems
但某些主流数据库系统它们⽀持Windows，BSD等所有这些操作系统
55.58-56.02
where the OS page cache may have different performance implications or different
policies
这些系统中的OS page cache可能在性能上有所差异，或者使⽤的策略也不同
56:02 - 56:08
And so to guarantee consistent performance or consistent behavior across different OS's
,you just manage everything yourself
So，为了保证跨OS间的⼀致性，你必须由你⾃⼰来管理⼀切
56:10 - 56:11
It's a good question,yes
这是⼀个很好的问题，请问
56:14 -56.15
There's number of pages
这是page的数量
56.15-56.20
but again so like I PostgreSQL 8 kilobyte pages
So，⽐如PostgreSQL的page⼤⼩是8kb
56:20 - 56:26
I take this number multiply 8 divided by 1024, that tells me them are MB of my thing
我将这个数字乘以8除以1024，这就会告诉我我的数据有多少MB
56:26 - 56:30
I set my buffer pool size to that size and that can guarantee everything fits,
我将我的buffer池⼤⼩设置为那个⼤⼩，这样就能保证所有东⻄都能放在buffer池⾥⾯了
56.30-56.31
yes
请问
56:35 - 56:38
Of course question is how does buffer pool interact with the OS page cache
他的问题是，buffer池是如何与OS page缓存进⾏交互的
56:40 -56:42
Again be it's like
这句不要了
56:49 - 56:52
These question is like are there different options how to use it?
他的问题是，我们这⾥有⼀些其他选项，我们该怎么去使⽤它
56:54 -56.57
No, like so it's transparent to the program
No，它对于程序来说是透明的
56.57-57.02
like, I call read fread go read a page from disk
就好像我要调⽤fread函数去从磁盘中读⼀个page
57:02 - 57:07
If the OS has a page cache that serves me that page ,otherwise it goes out and disk
gets it
如果OS能提供给我这个page的缓存，那我就可以直接使⽤，不然我得去磁盘中获取这个page
57:08 - 57:09
That's all transparent to me,
这⼀切对我来说都是透明的
57.09-57.11
if I pass that flag direct I/O
如果我传⼊的是Direct I/O
57.11-57.14
that tells the operating system do not cache anything,
这就会告诉操作系统不要去缓存任何东⻄
57.14-57.15
and it's always gonna go to disk and get it
这样数据库系统就始终得跑到磁盘上获取数据了
57:15- 57:19
It's quite yes,
你说的很对
57.19-57.24
say it as the OS page cache is in between the sort of the disk and the database
OS page缓存是磁盘和数据库之间的东⻄
57.24-57.25
absolutely yes
你说的确实没错
57:25 -57:27
It's gonna matter also to a lot when we start doing writes
当我们进⾏写操作的时候，这也很重要
57:27- 57:29
If you call like you write a C program,
如果你写了⼀个C语⾔程序
57.29-57.30
you call Fwrite,
接着，你调⽤了fwrite
57.30-57.33
does is the operations actually gonna write that right away
该操作真的会将数据⽴⻢写⼊磁盘吗？
57:33 - 57:35
No, puts it in the page cache,
No，它是将数据放⼊了page缓存
57.35-57.38
and at some later point the disk schedule says, all right I'm gonna go write this out
但在稍后的某个时刻，磁盘调度器表示，我需要将这个东⻄写出到磁盘
57:38 - 57:41
It's only mine I call sync when is when actually it's written
实际上，只有当我调⽤sync的时候，它才会真正地写出到磁盘上
57:42 - 57:44
But if I want a complete control of how I'm writing everything out the disk ,
但如果我想完全控制将所有数据写出到磁盘的⽅式
57.44-57.45
I want to use direct I/O
我想去使⽤Direct I/O
57.45-57.48
and most database systems do that
⼤多数数据库系统也是这么做的
57.48-57.48
yes
请问
57:53 - 57:56 (学⽣提问)
Yes, all the t-80 and v60 and be into the book
57:57 - 58:06(学⽣提问)
What would happen the first 128 and we would have been overwritten how many you did
sir clearly you got hit ,but many times the query you have started from the starting
58:06 - 58:14(学⽣提问)
So you should have got it ,because the memory presence was the later 128MB let's
58:14 -58:17
I want to get through the thing for the project,
我想在做project时再去说这个
58.17-58.19
but let's let me talk about it wherefore it's okay
但我们等会再去讨论这个吧，Ok？
###################################################################
58:20 - 58:25
Alright, so the thing we want to talk about now quickly is the buffer placement policy
So，现在我们想去快速讨论的东⻄就是buffer替换策略
58:25 - 58:31
So again we talked about how to find a page we want based on the page ID and the
page table
So，我们已经讨论过根据page id和page表，我们就能找到我们想要的那个page
58:32 -58:34
But now you know am all my examples we had enough memory mostly
但现在，在我所有的例⼦中，我们的内存⼏乎都是⾜够的
58:34 - 58:39
And so now we want to talk about what happens if I need to bring a page in and I don't
have space for it, what do I do
So，现在我们想去讨论的情况是，如果我需要将⼀个page放⼊内存中，但是内存⾥没空间放
它，那我该怎么办呢？
58:40 - 58:44
So the things what we care about and a replacement policy are obviously correctness
So，在替换策略中，我们所关⼼的很明显就是正确性
58:44 - 58:49
Right, we don't want to write out data or evict data that someone pinned before they're
actually done with it
如果说某个数据我们并没有真正地使⽤完，那么我们不想将它写出或移除
58:49 - 58:50
We're gonna care about accuracy
我们要去关⼼准确度
58.50-58.54
,because we're gonna make sure that we evict pages that are very unlikely be used in the
future
因为我们要去确保我们所移除的page是在未来不太会被⽤到的那些page
58:54 - 58:56
So we minimize the number of disk seeks we have
So，我们会去最⼩化我们进⾏磁盘查找的速度
So，我们将磁盘寻道的数量减⾄最少
58:57 - 58:58 ******
We want overplay some policy to be fast
我们希望能快速执⾏某些策略
58:58 - 59:02
because we don't you know the as we're doing a lookup in the page table，we're holding
latches
因为当我们在page表中进⾏查找时，我们会持有latch
59:03 - 59:07
And we don't want have to run some MD complete algorithm to figure out what page to
evict
我们不想去运⾏某些算法来弄清楚该移除哪个page
59:07 - 59:10
Right, because that may take longer than actually reading the page anyway
因为实际上这要⽐读取page时所花的世界要⻓
59:10 - 59:15
And of course obviously we don't want to have a lot of metadata overhead and keeping
track all this additional data
当然，很明显的是，我们不想拥有⼤量元数据所带来的的开销，也不想去跟踪所有这些额外数据
59:15 - 59:22
we don't want to have the metadata for a page keep track of how likely it's going to be
used to be larger than the page itself
我们不想让我们所跟踪的⼀个page的元数据⽐page本身体积还要⼤
59:23 - 59:25
So these replacement policies again
So，对于这些替换策略来说
59.25-59.32
as another good example, what distinguishes between the high end very expensive
enterprise databases and the open-source guys
我们以另⼀个很好的例⼦为例，那就是那些⾮常⾼端、价格很昂贵的企业级数据库和开源数据库
间有什么区别呢？
59:33 - 59:37
Because the high end ones have very sophisticated replacement policies
因为那些⾼端数据库拥有⾮常复杂的替换策略
59:37 - 59:39
They track statistics of how pages were being used
它们会跟踪统计page的相关使⽤数据
59:39 - 59:44
They try to extrapolate from what the queries are actually doing, and to try to make the
best decision
它们会试着从查询实际所做的事情中推断出最好的决定
59:45 - 59:50
Whereas in the the open source guys and the newer systems not saying they're bad
然⽽，在开源数据库的某些较新的系统中，虽然我并没有说它们很糟糕
59:50 - 59:55
But they don't have you know millions of dollars in decades spent trying to make this
thing run fast as possible
但在过去数⼗年间，这些数据库系统并没有⼏百万美元这样的资⾦来让它们变得尽可能的快
59:56 - 59.58
And so the you know they'll do something more simple
So，这些数据库系统就只能去做些简单版的东⻄了
59.58-1.00.00
which is what we're gonna talk about here
这也是我们这⾥要讨论的内容
01:00:01 - 01:00:03
This is like one of the oldest problems in CS,
这就像是在计算机科学中最为古⽼的⼀个问题
这像是⼀个在计算机科学中经久不衰的话题⼀样
1.00.03-
like everybody their uncle has a paper in the over the years on how to do caching and
things like that
在这么多年中，有很多⼈都写了关于如何进⾏缓存等类似这样事情的论⽂
-1.00.09
I have one
我就曾写过⼀篇
01:00:10 - 01:00:15
Right, like this is like one of the oldest problems in computer science there's a ton a long
history of this
这个问题在计算机科学中经久不衰，很早就开始了
05-04
01:00:17 - 01:00:17
All right,
1.00.17-1.00.19
so the easiest technique the use
So，这⾥有⼀种使⽤起来超简单的技术
1.00.19-1.00.23
and pretty much everyone does the first time is LRU or at least recently used
并且有相当⼀部分⼈第⼀次使⽤的就是这种技术，它被称为LRU（最近最少使⽤，least
recently used）
01:00:23 - 01:00:28
So all we do here just keep track of a timestamp of when the last time a page was
accessed
So，此处我们所做的就是跟踪⼀个page最后⼀次被访问时的时间戳
01:00:29 -01:00:31
And then we have to go figure out what page you will go evict
然后，我们必须去弄清楚哪个page应该被移除
01:00:31 -01:00:36
We just look to see which page has that oldest timestamp ,and that's the one we go
ahead and remove
我们仅需去看哪个page拥有的时间戳是最⽼的，它就是我们要去删除的那个
01:00:36 - 01:00:38
So way to speed this up
So，让这种⽅法变得更快的⽅式是
1.00.38-1.00.42
instead just keeping a track of you know a timestamp per page
与⼀直去跟踪每个page的时间戳相反，
01:00:42 - 01:00:46
because then we have to do a sequential scan across all our pages in the buffer pool to
figure out which one has the lowest timestamp
因为之后我们必须对我们buffer池中所有的page进⾏循序扫描，以此来弄清楚哪个page的时间
戳最古⽼
01:00:46 - 01:00:49
We can just maintain a separate data structure like a queue,
我们就可以维护⼀个单独的数据结构，⽐如：Queue（队列）
1.00.49-1.00.53
that there's that's sorted by the their timestamps
它是根据page的时间戳进⾏排序
01:00:53 - 01:00:55
So anytime somebody reads and writes a page
So，在某个时候，有⼈对⼀个page进⾏读或者写
01:00:56 -01:01:01
We just pull it out of the queue and put it back to the end, because it's a first-in firstout
我们只需把该page从队列中拿出来，然后处理完后放到队列的末尾，因为队列是先进先出的
01:01:02 - 01:01:06
What you guys will have to implement in the project is an approximation of LRU called
clock
你们必须在项⽬中要实现的⼀个LRU的近似算法，它被称为Clock
01:01:06 - 01:01:10
Actually quick show of hands who who here has heard a clock before
快速举下⼿，在座的有⼈之前听说过Clock这个东⻄吗
01:01:11 - 01:01:14
Nobody awesome, okay cool here ,so I mean LRU implementation should know, right,
okay ,good
看起来没有⼈，Ok，LRU实现我想你们应该已经了解了，很好
01:01:15 - 01:01:18
So clock ,so LRU is an exact least recently used
So，LRU指的是最近最少使⽤
01:01:19 - 01:01:20
Clock is an approximation of this
Clock则是它的⼀种近似算法
01:01:21 - 01:01:25
We don't have to track the timestamp exactlyfor every single page
我们⽆须去追踪每个单个page的时间戳
01:01:26 - 01:01:30
So instead we're all，the only information we need to keep track of It`s a single
reference bit per page
So，相反，我们唯⼀需要去跟踪的信息就是每个page的标志位（reference bit ）
01:01:30 - 01:01:35
that tells you whether that page was access since the last time you checked it
它会告诉你⾃从你上次检查过该page后，这个page是否被访问了
01:01:35 - 01:01:39
So you're gonna organize your pages in a circular buffer like a clock
So，你要将你的page组织为⼀个环形buffer，就像是⼀个时钟那样（知秋注：核⼼是，在某个
时间段内，即⼀圈时钟，如果标志位未变化，就可以从buffer pool中移除该page）
01:01:39 - 01:01:44
And then you have a clock hand that goes around and does sweeps and check to see
whether that reference bit is set to 1 or 0
然后，我们有⼀个能够旋转的指针，它能够去检查这个标志位（reference bit）是被设置为1还
是0
01:01:45 - 01:01:49
And if it's set to 0 that you know has been access since the last time you checked it
,and therefore it can be evicted
如果它被设置为0，那么你就知道⾃从上次我们检查过它后，该page没有被访问了，因此我们可
以将该page从这个环形buffer中移除
01:01:50 -01:01:52
All right, so say I page pages 1 2 3 4
So，假设我现在有page 1、2、3和4
01:01:53 - 01:01:57
Again each one has their own reference bit, in the very beginning the reference bit is set
to 0
每个page都有它⾃⼰的标志位（reference bit），在⼀开始标志位都是设置为0
01:01:58 - 01:02:01
So let's say that some some query accesses page 1
So，假设某些查询访问了page 1
01:02:02 - 01:02:04
So I'm gonna go ahead and flip its reference bit to 1
So，我会继续⾛下去，并将它的标志位（reference bit）设置为1
01:02:04 - 01:02:07
and no matter how many times somebody accesses this this page
⽆论任何⼈访问这个page多少次
01:02:07 - 01:02:10
It's always set to 1 it's not a counter
这⾥的值始终会被设置为1，这⾥的标志位（reference bit）充当的并不是计数器的作⽤
01:02:10 - 01:02:12
So now, now I need evict page,
So，现在我需要去移除page
1.02.12-1.02.14
because I don't have any more space
因为我的buffer池中没有任何空余的空间了
01:02:14 - 01:02:16
So my clock hands gonna start this first one
So，我的时针会从这个地⽅开始⾛起来
01:02:16 - 01:02:18
I see that it's reference bit set the one,
我看到了此处它的标志位（reference bit）被设置为了1
1.02.18-1.02.20
and therefore it's been accessed
因此，它被访问了
1.02.20-1.02.21
and therefore I should not have evict it
因此，我不该将它从我的buffer池中移除
01:02:22 - 01:02:24
But now I reset its reference bit to zero
但现在我将它的标志位（reference bit）设置为0
01:02:25 - 01:02:27
And then go on to the to the next one
然后转向下⼀个page
01:02:27 - 01:02:32
And I'm gonna sweep around if I come back around and set to the zero ,then I know I
can evict it
如果我时针转了⼀圈回来，发现这⾥的标志位（reference bit）是0，那么我就知道我可以将这
个page从⾥⾯移除
01:02:32 - 01:02:34
So this guy here his bit is set to zero
So，这⾥它的标志位（reference bit）就会被设置为0
01:02:34 - 01:02:39
So we can go ahead and evict it remove it and replace it with a new page
So，我们可以继续下去，将这个page从这⾥⾯移除，并⽤⼀个新的page将其替换
01:02:39 - 01:02:43
And then we don't set its reference to one we just set it zero,
接着，我们不⽤将这个新的page的标志位（reference bit）设置为1，只需将它设置为0即可
1.02.43-1.02.45
and then move on to the next one
然后我们转向下⼀个page
01:02:45 - 01:02:47
So let's say now page three and four have been access
So，假设现在page 3和4已经被访问了
01:02:48 - 01:02:50
So we check that, reset it to zero check that, reset to zero
当我们检查它们俩的时候，将它们俩的标志位（reference bit）都设置为0
1.02.50-1.02.52
, now we've come back to the page one was the first one we checked
现在，我们已经回到了page 1，这也是我们当时第⼀个检查的page
01:02:53 - 01:02:55
It`s reference it was zero since the last time we checked
⾃我们上次检查过后，它的标志位（reference bit）就是0
01:02:55 - 01:02:56
So therefore it can be evicted
So，它可以被移除
01:02:57 - 01:03:01
So again reason why this is an approximation is,
之所以说它是LRU的⼀种近似算法的原因是
1.03.01-1.03.07
because as we can evict pages ,I'm not evicting exactly the one that's the most least
recently used
因为当我们可以移除page的时候，我不会去精确地移除最近最少使⽤的那个page
01:03:07 - 01:03:10
It's sort of you know it's the same within some time window
即在⼀段时间内，它们都是⼀样的
01:03:11 - 01:03:16
These pages have not been used and therefore it's if there's I go ahead and evict them
这些page都没被使⽤，因此如果我继续⾛下去，就将它们移除
01:03:16 - 01:03:20
And the intuition here is that,if the page hasn't been used in a while,
直观的来讲，如果这些page在⼀定时间内没被使⽤
1.03.20-1.03.24
then it's probably not gonna be used again in the near future
那么它可能最近都不会再被使⽤
01:03:24 - 01:03:26
So therefore it's something I can go ahead in a bit
So，因此我可以继续⾛下去，并将它的标志位设置为0
01:03:26 - 01:03:29
Right right ,
1.03.29-1.03.33
so that assumption works a lot works well for simple things
So，这种假设⽤在某些简单的情况上效果会⾮常好
1.03.33-1.03.37
like doing point queries to go access single things
⽐如在进⾏点查询（point query）时访问单个东⻄
01:03:37 - 01:03:41
But clock and LRU are susceptible to what is called sequential flooding
但Clock和LRU都容易受到sequential flooding所带来的影响
01:03:42 - 01:03:46
And what this means is that when we have a special scan that's gonna read every single
page
这就意味着，当我们进⾏⼀种特殊扫描时，它会读取每个单个page
01:03:46 - 01:03:48
That's gonna pollute our page cache
这可能会去污染我们的page缓存
1.03.48-1.03.58
and that's gonna end up having We can end up evicting pages that maybe we do really
want, that argument use very right and in the near future
这可能会将我们接下来真的要使⽤的page从buffer pool中移除掉
01:03:58 - 01:03.59
But because that scan read a bunch of pages
但因为它扫描并读取了⼀堆page
1.03.59-1.04.06
all those pages are gonna have newer timestamps and than the page I actually do want
所有这些page的时间戳都会⽐我实际想要的那个page要新
01:04:06 -01:04:13
Right, in this case here the most recently page use page, it`s actually the one I want to
Evict, not the least recently used
在这个例⼦中，实际上我想移除的page是那些最近被使⽤的，⽽不是那些最近最少被使⽤的
01:04:14 - 01:04:15
So there's another good example
So，这⾥有另⼀个很好的例⼦
1.04.15-1.04.19
where you, if you could have different buffer pools or different tables
如果你有不同的buffer池或者不同的表
1.04.19-1.04.20
based on how queries are going to access them
基于查询对它们进⾏访问的⽅式
01:04:21 - 01:04:24
Maybe one I want to use most recently used in another one, I want to use least recently
used
可能我想要的其中⼀个是最近使⽤过的，然⽽另⼀个我想要使⽤的是最近最少被使⽤的
01:04:25 - 01:04:26
So let's look at example
So，我们来看下例⼦
01:04:27 - 01:04:29
Let's say I have one query that's doing a point lookup
假设，我有⼀个在做点查询（point query）的查询
1.04.29-1.04.34
where ID equals 1, and it reads page 0
当id等于0时，查询读取了page 0
01:04:35 - 01:04:37
So go ahead and fetch that into my buffer pool and I'm fine
So，它将page 0 放⼊了我的buffer池
01:04:38 - 01:04:40
So then now have another query that's gonna do a sequential scan
So，接着，现在我有另⼀个查询，它要去进⾏顺序查询
01:04:40 - 01:04:44
So it's gonna read through all my pages
So，它会读取我的所有page
01:04:45 - 01:04:46
And they want to once and make space for page 3
它们想要在buffer池中给page 3分配⼀个空间
01:04:47 - 01:04:49
If again we're using least recently used
如果这⾥我们使⽤的是LRU（最近最少使⽤）算法
01:04:50 - 01:04:53
Then it would figure out that,Oh page 0 is the least recently used
那么它就会指出，Oh，page 0是buffer池中最近最少使⽤的page
1.04.53-1.04.56
let me go ahead and evict that and put in page 3
让我将page 0从buffer池中移除，并将page 3放进去
01:04:57 - 01:04.59
But in my workload,
但在我的workload中
1.04.59-1.05.03
I'm executing queries that look like the first one over and over again
我会不断地去执⾏类似于第⼀个查询那样的查询
01:05:03 - 01:05:05
So now if I execute this query all over again, now I read zero
如果我不断的执⾏这个查询，现在我读取到了page 0
01:05:07 - 01:05:09
I just evicted it and now I'm screwed,
我之前将它从buffer池中移除，于是我现在就搞砸了
1.05.09-1.05.11
because now I got to go out and disk and get it
因为现在我得去磁盘中拿到这个page
01:05:11 - 01:05:15
Okay, so what I really wanna should have done is is evicted one or two ,
Ok，So现在我真正应该做的是将page 1或者2从buffer池中移除
1.05.15-1.05.18
because this scans gonna go through a read more data
因为这个扫描会去读取更多的数据
01:05:18 - 01:05:21
And it's unlikely anybody else is going to come and read this thing here
⽽且其他查询并不会到buffer池中读取这些数据
01:05:24 - 01:05:28
So the way there's three ways to get around this
So，此处有三种⽅法可以解决这个问题
01:05:29 - 01:05:31
Let me sort of cover some of these so far
到⽬前为⽌我已经介绍过⼀些了
01:05:32 - 01:05:35
So the first is to do it's called LRU-K
So，第⼀种⽅法被称为LRU-K
1.05.35-1.05.42 ！！！！！！！！
where K is just you keep track of the number of times a multiple timestamps, every
single time this the page is accessed
其中K指的意思是每次访问该page时，所跟踪的多个时间戳的次数
其中K是指需要对于单个page对应缓存数据的访问进⾏计数的次数（知秋注：核⼼思路是将最近
使⽤过1次的判断标准扩展为最近使⽤过K次，也就是说没有到达K次访问的数据并不会被缓存，
访问记录不能⽆限记录，当访问次数达到K次后，将数据索引从历史队列移到缓存队列中）
01:05:43 - 01:05:45
So now when you want to say which which one should I remove
So，当我们想去问我们该移除哪个page时
1.05.45-1.05.47
you don't look to see which one has the lowest timestamps
我们不⽤去看哪个page所拥有的是最⽼的时间戳
01:05:47 - 01:05:50
You go look at the intervals between those timestamps
我们所看的是这些时间戳之间的间隔
01:05:51 - 01:05:55
And you say which one has the longest amount of time between one access to the next
access
然后，我们就会问，哪⼀个page的上⼀次和下⼀次访问的间隔时间最⻓
01:05:56 - 01:06:00
And then can use that to figure out which one's the least likely to be used
然后，我们可以根据这个来弄清楚哪个page才是最近最少被使⽤的
01:06:01 - 01:06:09
So this because we're using the history to estimate ,when it's can be accessed again to
make help us make a better decision about what pages should be evicted
因为我们使⽤的是历史记录来预测这个page何时会被再次访问，以此来帮助我们更好的判断哪
个page应该被移除
01:06:09 - 01:06:17
So LRU-K is what's used in the ,if the more sophisticated database systems says ,we'll
do something like this
越复杂的数据库系统会表示，我们会采取类似于LRU-K的做法
01:06:17 - 01:06:21
I think MySQL might use this, I don't I don't remember
我认为MySQL可能会使⽤这个，但我并不记得
01:06:23 - 01:06:30
All right the next optimization we can do which we sort of already talked about with
having multiple buffer pools is to have localization per query
我们所能做的下⼀个优化就是使⽤多个buffer池，让每个查询本地化，这个我们以前已经谈过了
01:06:30 - 01:06:36
So rather than have that ,you know as I'm scanning the table and putting it into the
global buffer pool
So，并不是将我所扫描的这张表，放到全局buffer池中
01:06:36 - 01:06:42
If I have a small little set aside some pages in the buffer pool ,that are satisfied my query
如果我在buffer池放⼊了满⾜我查询的⼀⼩部分page
01:06:42 - 01:06:44
Everybody will read them
每个⼈都会去读取到它们
01:06:44 - 01:06:46
But it's I'm keeping track of how I'm using pages
但我要去跟踪我所使⽤的page
01:06:47 - 01:06:52
So then then when I want to make a decision what to evict from my query
So，接着当我想去判断我该从我的查询中移除哪个page时
1.06.52-1.06.56
,I evict the ones that are least recently used for me not the global view
我会去移除对我⽽⾔最近最少使⽤的那个page，⽽不是从全局的⻆度来看（谁使⽤的最少）
01:06:56 - 01:06.59
So we saw this in PostgreSQL,
So，我们在PostgreSQL中看下这个
1.06.59-1.07.03
PostgreSQL had that hit memory show the hit was like 32 then with the 64
在PostgreSQL中，之前它的内存命中率是32，然后变成了64
01:07:03 - 01:07:10
Right, that's this little ring buffer that they're keeping track of what pages that queries
accessing they make decisions what what to evict
此处会有⼀个⼩的ring buffer（环形buffer），这⾥⾯存放了它们所跟踪的（查询所访问的）
page，然后它们会去判断该移除哪个page
01:07:12 - 01:07:14
All right, the last one is priority hints
最后⼀种优化就是priority hints（优先级提示）
01:07:14 - 01:07:20
Again this is where we talked about before when we have we have indexes, we know
how they're scanning data know what pages different access
这个之前我们就讲过，当我们有索引的时候，我们知道查询是如何进⾏扫描的，也知道哪些不同
的page被访问了
01:07:20 - 01:07:23
So we can use that information to make decisions about what to evict
So，我们可以使⽤这个信息来判断该移除哪些page
01:07:24 - 01:07:28
So let's say we have our B+tree or whatever tree data structure we want
So，假设我们的数据结构是B+树或者是其他我们想要的树形结构
01:07:28 - 01:07:31
And they have a bunch of queries they're gonna insert data
这⾥有⼀堆要去插⼊数据的查询
1.07.31-1.07.38
where there's a global counter for this table or just incrementing it by one and inserting
over and over again, like a serial key or auto increment key
该表中有⼀个全局计数器，当每次插⼊时，它就会加1，它看起来就像是⼀个序列键或者是⾃增
键⼀样
01:07:38 - 01:07:43
So if we're now sorted on this index is sorted on ID from min to max
如果我们根据这个id从⼩到⼤进⾏排序
1.07.43-1.07.45
we know that every single time we do an insert
我们知道在我们每次做插⼊时
01:07:46 - 01:07:50
The ID value is always going to be one more than the last one we just inserted
所⽣成的id值始终要⽐我们上⼀次插⼊时⼤1
01:07:50 - 01:07:54
So that means we're always gonna be going down the right side of the tree and touching
these pages
So，这就意味着我们始终是沿着树的右侧往下⾛，去拿到这些page的
01:07:55 - 01:08:00
So therefore we should have hints up into the buffer manager and say, these pages
should try to stay in memory
So，因此我们应该提示buffer管理器，我们表示这些page应该试着待在内存中
01:08:00 - 01:08:02
I don't care about these ,So much about these other ones here
但我并不介意这边的其他东⻄
01:08:04 - 01:08:09
Or likewise, if I have a query that does lookups on on different IDs
或者同样，如果我有⼀个基于不同id进⾏的查询
1.08.09-1.08.11
or actually any query that does a lookup on this index
或者任何根据索引进⾏的查询
01:08:11 - 01:08:16
I know I'm always gonna be going through the blue page, because that's how I enter this
index I have to go through that
我知道我始终得从这个蓝⾊的page进⼊，因为这样我才知道该如何进⼊这个索引，我必须从这
⾥进⼊
01:08:16 - 01:08:19
So therefore I want to make sure that's always pinned in memory that always stays there
So，因此我想确保它始终固定在内存中，并且⼀直呆在那⾥
01:08:20 - 01:08:25
Right, because otherwise if I get to the bottom and I need space and I evict this thing
因为如果我进⼊底部，我就需要⼀些空间，那我就得把这个东⻄移除
01:08:25 - 01:08:28
It's a bad idea, because that's the least recently used
这就是⼀个糟糕的想法了，因为被移除的这个是最近最少使⽤的东⻄
01:08:28 - 01:08:31
but I know that the next queries gonna come through it and go to exactly for that Page
但我知道下个查询会通过它进⼊，以此来准确地拿到这个page
01:08:32 - 01:08:37
So again this is what the commercial systems can do provide you some extra
information up above
So，这就是商⽤系统所能为我们提供的某些额外信息
01:08:39 - 01:08:45
Alright,the last thing to talk about is how do we actually handle dirty pages
So，我们要谈论的最后⼀个东⻄就是我们实际该如何处理Dirty page
01:08:46 - 01:08:56
So remember that there's a dirty bit and the page that says ,whether a query has
modified the contents of that page since the last time It it's in since since it was
brought into the buffer pool
So，要记住，在page上有⼀个dirty bit，它会告诉我们⾃从上次它被放⼊buffer池以后，是否有
查询对该page的内容进⾏了修改
01:08:57 - 01:09:01
So when we make a decision what page to evict to bring a new page in
So，当我们要去判断哪个page该被移除，并放⼊新的page时
01:09:02 - 01:09:07
The fastest thing we could do is just find a page that was that's not marked dirty
我们能做的最快⽅法就是找到⼀个未被标记为dirty的page
01:09:07 - 01:09:08
and immediately just drop it
并将它⽴即移除
1.09.08-1.09.13
and you know use its frame for a new ，buffer pool
把它的frame交给新的buffer池
将⼀个新的frame 放在buffer pool 的这个位置
01:09:13 - 01:09:22
The slower thing we have to do is if a page is dirty ,we have to write it back out the disk
safely ,before we can reuse that space for our new page
我们所能采⽤的另⼀种⽐较慢的⽅式是，如果page是dirty的话，在我们可以将该空间重新⽤于
新的page之前，我们必须将它安全地写回磁盘，
01:09:23 - 01:09:26
So now there's this trade-off we have to make in our replacement policy decide
So，现在我们必须在我们的替换策略上做出某种取舍
01:09:26 - 01:09:31
well there's a bunch of pages that are all that are all clean, and I could drop them super
easily
Well，这⾥有⼀堆未被标记为dirty的page，我可以将它们轻易地drop掉
01:09:31 - 01:09:34
But they actually may be needed in the near future
但实际上它们可能会在最近被需要⽤到
01:09:35 - 01:09:36
So, I don't want to actually drop them
So，实际上我不想去将它们drop掉
1.09.36-1.09.39
instead I want to pay the penalty to write out a dirty page
相反，我想付出⼀定的代价，以此写出⼀个dirty page
那我就想要花费点代价将⼀个dirty page写出去（知秋注：保留那些接下来要⽤到的⾮dirty
page）
1.09.39-1.09.43
flush it, remove it from my buffer pool and reuse its space
将它刷出去，从我们的buffer池中移除，并复⽤它的空间
01:09:43 - 01:09:45
So how you actually balance them is is super hard
So，我们该如何在它们之间取得平衡是⾮常困难的
01:09:46 - 01:09:52
Right, because again I in this case here to do a disk read ,if I had to write out a dirty
page, it's 2 disk I/Os
因为在这个例⼦中，如果我要到磁盘中进⾏读取，并写出⼀个dirty page，这就要2次磁盘I/O了
01:09:52 - 01:09:54
One IO to write out the dirty page
⼀次I/O是⽤来写出dirty page
1.09.54-1.09.57
then remove it from the buffer pool,and then another IO to read a page that I want
然后将它从buffer池中移除，接着另⼀个I/O则是读取我想要的那个page
01:09:58 - 01:10:01
In this case here it's one IO to just go read the page that I want
在这个例⼦中，这⾥有⼀次I/O来读取我想要的那个page
1.10.01-1.10.03
cuz I can drop the the page that's already in the buffer pool
因为我可以将已经在buffer池中的page移除掉
因为我可以移除buffer pool中已经存在的⼀个page
01:10:04 - 01:10:05
So how you actually figure that out
So，你们实际该如何弄清楚这⼀点呢？
1.10.05-1.10.07
again it's super hard
它真的是⾮常的难
1.10.07-1.10.10
and this is what the commercial systems my opinion do better than the open-source
ones
以我的观点来看，这就是为什么商⽤系统要做的⽐开源更好的原因
01:10:11 - 1.10.18
So way to get around this，to avoid that the problem of having to write a page out as
soon as I need it for free space in my buffer pool
So，为了解决这个问题，即为了避免*必须⽴即*将page写出以便在buffer池中释放可⽤空间的
问题
01:10:19 - 01:10:20
I can do background writing
我可以进⾏后台写操作
01:10:21 - 01:10:23
So periodically that database systems gonna have a thread
So，在数据库系统中有⼀条执⾏定时任务的线程
1.10.23-1.10.26
they're gonna look through my buffer pool figure out what pages are marked dirty,
它会去我的buffer池中找出那些被标记为dirty的page
1.10.26-1.10.28
and just write them out to disk
将它们写出到磁盘上
01:10:29 - 01:10:32
So that way I can flip them to be marked it's clean
So，以此，我可以将这些page再标记为clean
01:10:32 - 01:10:35
And now when I do from my replacement policy just decide what page to remove
现在，当我使⽤我的替换策略去决定该移除哪个page时
01:10:36 - 01:10:39
I have a bunch of clean pages I can I can drop,right away
我有⼀堆clean page可以让我drop掉
01:10:40 - 01:10:42
So you gotta be careful when you do this ,
So，当你在做这个的时候，⼀定要⼩⼼
1.10.42-1.10.49
because you don't want to write out dirty pages ,before the log of records that
correspond to modifying them to make them dirty
因为在该dirty page对应的修改操作写⼊⽇志之前，我们不希望将这些dirty pages写出到磁盘
01:10:50 - 01:10:53
You make sure they're the log were custom written out to disk first, before you write out
the dirty pages
在写出 dirty pages 之前，请确保先将操作⽇志写出到磁盘
01:10:54 - 01:10:56
We'll have a whole lecture on why that's the case later on in the semester
我们会在这个学期中稍后⼀段时间⾥花⼀整节课的时间来讨论这个例⼦为什么会这样
01:10:57 - 01:11:00
But just know there's like it's not just like I can blindly write any page I want
但要知道，这并不是说我可以随意地对我想要的任何page进⾏写操作
01:11:00 - 01:11:04
I have to do some extra step protection to make sure I'm writing things in the right order
我必须做些额外的保护措施，以确保我以正确的顺序写⼊数据
01:11:04 - 01:11:06
This is something that mmap cannot do
这是mmap所⽆法做到的事情
01:11:08 - 01:11:09
All right,so I'm gonna skip this
So，这⾥我就跳过了
1.11.09-1.11.13
for the other memory pools ,just we've already sort of covered this
对于其他内存池来讲，其实我们已经介绍过这个了
01:11:13 - 01:11:15
It's more than just the pages from tables or indexes
它⾥⾯所包含的不仅仅是表中的page或者索引（index）
01:11:16 - 01:11:20
There's when we run queries, we also needed to generate some information
当我们执⾏查询时，我们也需要去⽣成某些信息
01:11:21 - 01:11:29
All right, so the again, the the whole point of this lecture was to talk about how we can
manage memory better than the OS
So，再次强调下，这节课讨论的重点在于我们该如何去管理内存并做的⽐OS来得更好
01:11:30 - 01:11:31
Because we know what queries are doing
因为我们知道查询所在做的事情
01:11:31 - 01:11:32
we know what's in the pages
我们知道page中有什么
01:11:32 -01:11:33
we know how things are being accessed
我们知道这些东⻄如何被访问
01:11:33 -01:11:35
and we can make better decisions
这样我们就可以做出更好的决定
01:11:35 - 01:11:41
And essentially we're gonna use information on what in the query to,you know for all
these different things that we talked about
本质上来讲，我们会去使⽤查询中的信息应⽤到我们所讨论的各种不同东⻄上⾯
本质上来讲，我们所讨论的所有这些不同的东⻄，都是为了应对查询中涉及的各种信息
1.11.41-1.11.44
and a bunch of optimization we can apply to help us make this work better
我们可以使⽤⼀系列优化来让它更好地⼯作
01:11:44 - 01:11:46
All right, so any questions about buffer pool
So，关于buffer pool ，你们还有任何问题吗？
01:11:49 - 01:11:51
All right here's what you really care about project one right
好了，到了你们所关⼼的部分了，Project 1
01:11:52 - 01:11:54
So the for the first project ,
So，在第⼀个项⽬中
1.11.54-1.11.58
you're me building your own buffer pool manager and replacement policy
你们要去构建你们⾃⼰的buffer pool 管理器以及替换策略
01:11:58 - 01:12:02
So this will all be done in our new database system called BusHub
So，你们要在我们的新数据库系统Bushub中来做这些⼯作
01:12:03 - 01:12:06
Which is it's an open source system, it's disk based again
它是⼀个开源的数据库系统，它是基于磁盘的
01:12:07 - 01:12:11
It's you will see this will be stub files in the code that you would download from github,
你会在你从Github上所下载的代码中看到这些stub⽂件
1.12.11-1.12.13
then a clearly show here's the function need to write
然后你们就能很清晰地看到需要编写哪些函数
01:12:13 - 01:12:17
And here's how to actually you know implement that what we're asking you to do
这样你就知道该如何去实现我们要求你去实现的东⻄了
01:12:18 - 01:12:23
So the project is the write up is available online the grade scope isn't been set up yet
we'll do that later today
So，这个project我们已经在⽹上放出了，但评分体系我们还没设置，不过我们会在今天稍后完
成
01:12:23 - 01:12:28
But if you can finish this project in a single day come talk to me, because we wouldn't
want to do other things
但如果你⼀天内就结束了这个project，请过来告诉我，因为我们不想让你去做些其他事情
01:12:31 - 01:12:34
So we are gonna already provide you to disk manager and already the page layouts
So，我们已经为你们提供了磁盘管理器以及page layouts
01:12:35 - 01:12:36
So you don't worry about that ,
So，你们⽆须担⼼这个
1.12.36-1.12.39
we just will give you a block-pages
我们会给你⼀块块的pages
01:12:39 - 01:12:42
And it's up for you to decide how to store them in memory
该如何将它们保存进内存，这就取决于你们⾃⼰了
01:12:42 - 01:12:45
And then and and invoke the disk manager to write them out as needed
根据需要调⽤磁盘管理器将这些数据写出到磁盘
01:12:46 - 01:12:50
So for the first one we have a separate class called ClockReplacer
So，在第⼀个任务中，我们有⼀个单独的类，它叫做ClockReplacer
01:12:50 - 01:12:54
And you'll be implementing the clock policy that I talked about here today
你们要去实现我今天所讲的Clock策略
01:12:54 - 01:12.57
Again it's an approximation of of LRU,
它是LRU算法的⼀种变体
1.12.57-1.13.01
we just sweep the hand and flip these reference reference bits
我们只需清理buffer空间，并翻转下标志位（reference bit）即可
01:13:01 - 01:13:05
So that means you need keep track of as pages are being accessed
So，这就意味着，你需要去跟踪被访问的page
1.13.05-1.13.07
,because you'll see this in the buffer pool API
因为你会在buffer池API中看到这个
01:13:07 - 01:13:10
You have to know that when I say read a page or write a page
你必须知道，当我在去读取⼀个page或者写⼊⼀个page时
1.13.10-1.13.14
,that you go update the reference bit inside of your LRU replacer, sorry your
ClockReplacer
你就得去更新你的ClockReplacer中的标志位（reference bit）
01:13:16 - 01:13:20
So the one thing to be important to know is that
So，有件重要的事情你需要知道
1.13.20-1.13.21
if you do a sweep
如果你进⾏清除操作
01:13:21 - 01:13:29
And all the pages have been modified then you just pick whatever one has the lowest
frame ID
如果所有的page都已经被修改了，那么我们就选择frame_id最⼩的那个page进⾏移除
01:13:29 - 01:13:32
if all the pages are pinned and you can't free one
如果所有page的状态都是pinned（加了锁），那么你就没法释放任何page
1.13.32-1.13.34
then you pick them on the lowest page ID
那么你就得移除page id最⼩的那个page
01:13:34 - 01:13:35
Right, cuz otherwise you just spin forever,
否则，你就要⼀直等下去（知秋注：直到cas抢到操作权）
1.13.35-1.13.38
and this will be in the write-up
这会是你们lab要写的内容
01:13:39 - 01:13:41
The major effort will be on the on the buffer pool manager
你们主要的⼯作在于buffer pool 管理器上⾯
01:13:41 - 01:13:43
So you implement the clock replace your algorithm first
So，你们⾸先要去在ClockReplacer中实现你们的Clock算法
01:13:44 - 01:13:46
And then you hook that into your buffer pool manager
然后，你将这个算法挂钩到你的buffer池管理器上去
01:13:46 - 01:13:50
And for this one, it's again it's up for you to decide,how you actually want to maintain
your Memory,
对于这个，就得取决于你实际想要怎么去维护你的内存了
1.13.50-1.13.53
how you decide what internal data structures
你该如何决定内部的数据结构
取决于你该如何设计你内部的数据结构
01:13:53 - 01:13:59
you want to keep track of,what pages that are available, what pages are are dirty, what
pages are being pinned
你所想跟踪的page是否可⽤，哪些page是dirty，哪些page的状态是pinned（加了锁的）
01:13:59 - 01:14:00
Right, you can do whatever you want
你可以做你想做的任何事情
1.14.00-1.14.03
it's just you have to implement the API that we expose to you
你必须去实现我们所暴露给你的API
01:14:04 - 01:14:11
So it's means super the thing that always tricks up students every year, it`s to make sure
you get the ordering of the operations of how to pin pages correct
So，当我们锁住⼀个page的时候，你要去保证你操作顺序的准确性
01:14:12 - 01:14:17
Right, so we'll do multi-threading graded test will try to read a page and pin at the same
time
So，我们会使⽤多线程来对你的系统进⾏测试评分，我们会试着读取⼀个page，并同时将它锁
住
01:14:17 - 01:14:19
And you'll make sure that everything turns out in the right order
你需要确保所有东⻄都是以正确的顺序进⾏的
01:14:20 - 01:14:23
And this would be more clear when you look at the right up and see what we're asking
you to do
当你们看幻灯⽚右上⻆的图时，你们就会明⽩我们要你所做的是什么了
01:14:25 - 01:14:26
So how do you get started
So，你们该如何开始做这个项⽬呢
01:14:26 - 01:14:28
So again everything is available on github
So，你们能在Github上找到这⼀切东⻄
01:14:28 - 01:14:35
You want to go to your ,if you don't have it a github account sign up one, it's free there's
also I think an educational one that you get extra stuff
如果你们没有⾃⼰的Github，那就去注册⼀个，它是免费的。你们也可以去注册⼀个教育版的
账号，你们能拿到些额外的东⻄（教育优惠）
01:14:36 - 01:14:39
But basically you'll go to the github page for the the database system
但基本上来讲，你们应该跑到Bushub这个项⽬的⻚⾯上去
1.14.39-1.14.42
and could be a little fork button and you fork it into your private repo
你将这个项⽬fork到你的私⼈仓库中去
01:14:43 - 01:14:46
A fokin is your own private repo is private so nothing's public,
你将东⻄fork到你的私⼈仓库中的话，那就只有你⼀个⼈能看⻅⾥⾯的东⻄
1.14.46-1.14.49
and then just do all your changes in there
然后，你就可以在你的仓库⾥各种搞事情了
01:14:49 - 01:14:54
If you sign up for the github account, you can get free private forked repos
如果你注册了Github，那么你就能得到4次fork到私⼈仓库的机会
01:14:55 - 01:14:59
Right, because if you put everything public, then other students can see what you're
doing, and then potentially copy from you
因为如果你将你的代码公开，那么其他学⽣可能就会看到并抄袭你的代码
01:15:01 - 01:15:10
The very first thing you should try to do today or tomorrow, as soon as possible be super
helpful try to get the software to build on your whatever machine you're gonna do your
development on
今天或者明天，⾸先你要做的就是去搭建你们的开发环境
01:15:10 - 01:15:19
So it works on Ubuntu, it works on OSX, it works on Windows with the Windows server
or server like Linux whatever this package you can download install
这个项⽬能在Ubuntu，OSX以及Windows（WSL2）上运⾏
01:15:21 - 01:15:26
The thing though for OSX is not gonna support the clang formatting stuff that we'll talk
about in a second
OSX并不⽀持clang format之类的命令，我们稍后会讲这些
01:15:27 - 01:15:29
So grade scope will run this for you，you can run it in docker,
So，我们会为你们提供Grade Scope（⽤来评分），你们可以在Docker中运⾏它
1.15.29-1.15.33
if you this is a problem we can also give you a VM image
如果你有问题，我们可以给你⼀个VM镜像
01:15:33 - 01:15:37
But you'll have to you don't have to figure this out on your own, we'll have instruction to
try to help us out
你们不⽤⾃⼰去摸索该怎么使⽤，我们会提供操作指南给你们
01:15:38 - 01:15:39
It does not compile an Andrews machine
它没办法在Andrews machine上进⾏编译
01:15:40 - 01:15:41
We tried it it doesn't work
我们试了⼀下，但并没有什么⽤
1.15.41-1.15.43
the software they have on there is too slow
它上⾯的软件速度实在是太慢了
01:15:44 - 01:15:47
If this is a problem, you don't have your laptop please email me and we'll figure
something out
如果你没有笔记本，那请发邮件告诉我，我们来帮你搞定
01:15:48 - 01:15:53
Ok, so things to note should not change any file that other than what you must hand in
Ok，有些事情你要注意，除了你必须提交的⽂件以外，你不能去修改其他任何⽂件
01:15:53 - 01:15:57
Because we're basically to blow everything away there's four files you have to turn in
因为除了你上传的那四个⽂件以外，我们基本上会删除所有⽂件，
01:15:57 - 01:16:04
We blow everything else away, and plop your code on top of the latest version of the the
system and run all your tests
我们会将其他⼀切⽂件都删掉，然后将你的⽂件放⼊最新版的系统中，并跑下测试
01:16:05 - 01:16:08
The projects are cumulative meaning ,if you bomb this one you're gonna have problems
later on
这个项⽬是渐进式的，如果你其中⼀次搞炸了，那么你之后做的时候就会有⼤问题
01:16:08 - 01:16:14
because you know the next project is actually we use the buffer pool manager that you
built today,I build now
因为在下⼀个项⽬中，我们会去使⽤你们今天所构建的buffer池管理器
01:16:14 - 01:16:17
We're also not gonna be providing solutions at the beginning
我们也不会在⼀开始就提供给你们答案
01:16:18 - 01:16:21
And then we're not gonna happy debug and your code on Piazza
我们更不愿意在Piazza上帮你们debug你们的代码
01:16:22 - 01:16:25
Another thing we're doing new this year is that we're requiring you to write good-looking
code
今年我们要你们所做的另⼀件事，就是需要你们去写出美观的代码
01:16:26 - 01:16:27
Normally people like fit code
⼀般来讲，⼈们都喜欢看起来舒服的代码
01:16:27 - 01:16:32
And so now we all want to check to make sure it actually conforms to a good style guide
So，现在我们想去检查你的代码，并保证你所写的代码符合良好的⻛格指南
01:16:32 - 01:16:34
So we followed the google C++ style guide
So，我们遵循⾕歌的C++编码⻛格指南
1.16.34-1.16.37
and we also followed the Doxgen in Javadoc style guide
我们也会去遵循Doxgen的Javadoc⻛格指南
01:16:38 - 01:16:40
So we have checks already in place that will check all these things for you,
我们已经为你们准备了检查⼯具，它们可以帮助你们对代码进⾏检查
1.16.40-1.16.42
like if you call make format
⽐如，如果你调⽤make format
1.16.42-1.16.45
it'll make sure your code looks pretty in the C++ style guide
它会让你的代码符合C++编码⻛格指南
01:16:46 - 01:16:51
but there's a bunch of other things like how you allocate memory how you set up your
for loops and so forth
但这⾥还有⼀些其他的东⻄，⽐如，你如何去分配内存，如何去设置你的for循环等等之类的事
情
1.16.51-1.16.56
that we use clang tidy and clang format to to enforce more more detail
我们会去使⽤clang-tidy和clang-format来确保这些细节
01:16:56 - 01:17:01
So you'll run these commands like check-clang-tidy collect check-censored, check lint
So，你们要去运⾏这些命令，⽐如check-clang-tidy，check-censored，check-lint
01:17:01 - 01:17:05
It will throw errors they won't correct it for you or throw errors and say, your code looks
crappy here's how to fix it
当你执⾏这些命令的时候，它会给你抛出错误，并告诉你，你的代码看起来很糟糕，你该如何去
修复它
01:17:06 - 01:17:09
Ok, and we're gonna run though some gradescope so when you turn it in
So，当你们提交你们作业的时候，我们会⽤GradeScope去审查你们的作业
01:17:10 - 01:17:13
If you write crappy code you'll get you'll get a zero score ,because you'll fail these tests
如果你写了很垃圾的代码，那么你就会得0分，因为你没能通过这些测试
01:17:14 - 01:17:18
so this what I'm saying so Linux and Windows I think this works
So，正如我所说的，对于Linux和Windows，这是可以⽤的
01:17:18 - 01:17:22
for OSX I don't think this works ,but we can we can provide you a VM you can do all
your development in there
但对于OSX，我不觉得能⽤，但我们可以给你们提供虚拟机，你们可以在上⾯进⾏开发
01:17:22 - 01:17:25
Ok, last thing, don't plagiarize
Ok，最后⼀件事，那就是不要抄袭
01:17:25 - 01:17:30
We will run your code through moss, there's some people in China that take the code
and implemented some stuff
我们会在Moss上运⾏你们的代码，有些中国⼈会⽩嫖⾛这些代码，并去实现某些功能
01:17:30 - 01:17:32
There's is all crap we've run it doesn't work
这张幻灯⽚上都是我写的⼀些废话，因为你们都懂，但还是要说下
01:17:34 - 01:17:36
Don't make your stuff again, don't put your stuff on the public repo
不要把你们的代码发到公共仓库中去
01:17:36 - 01:17:40
Because if I run your stuff and someone copies from you, because your account was
public
因为如果我去运⾏你们的代码，然⽽因为你的代码是公开的，这会让有的⼈抄了你的代码
01:17:41 - 01:17:46
We run the moss and you both come up as being duplicates of each other, I don't know
who stole from who
我们在Moss上跑你们的代码的时候，我发现你们的代码彼此重复，我也不知道你们谁抄了谁
01:17:46 - 01:17:48
All right, so you broke they're gonna fail ok
So，这样我就会让你们都挂科
01:17:49 - 01:17:50
So don't put any of your code public
So，不要把你们的代码都公开放出来
01:17:50 - 01:17:55
You can do this thing then this semester ,because I know you want to go in the job
market me like ,oh here's what I did
你可以在这学期完成这个项⽬，因为我知道你们想在求职的时候去跟⼈说，Oh，这是我做的项
⽬
01:17:56 - 01:17:58
In this class, truth be told no one's actually gonna care
在这堂课上，没⼈会关⼼你讲的是不是真的
01:17:58 - 01:18:00
because everyone's implementing the same thing
因为每个⼈都在实现同样的事情
1.18.00-1.18.03
it's not like an independent study where you you make some breaks it could break
through
这并不是⼀项你能单靠⼀⼰之⼒就完成的作业（知秋注：这个项⽬包含了很多东⻄，⾃⼰做的只
是⼀⼩部分）
01:18:03 - 01:18:07
So employers they don't care that much that you have your project online
So，雇主们并不在意你的项⽬是否上线
01:18:08 - 01:18:11
But if you want to do it in the semester if we're fine with that ok
但如果你想要在这个学期靠这个去求职的话，我觉得也是没问题的
01:18:11 - 01:18:12
Any questions
有任何疑问吗？
1.18.12-1.18.15
next for hashtable, hit it
下节课我们讲hash table，散会！