04-01
00:19 - 00:23
Oh guys let's get started again,hit it up for DJ chop tables
好了，孩⼉们我们开始吧，有请我们的DJ Drop Tables
00:26 - 00:27
How would you weekend?
你周末过的如何
00:27 - 00:40
DJ: 没听出来。
who's having whippets
DJ: 没听出来。
00:40 - 00:42
Don't do that,okay all right
请不要搞事情，Ok
00:42 - 00:51
So other announcements other than huffing whippets,is that homework #1 is due on
Monday at midnight
So，我们来说下其他事情，Homework1将在周⼀的11.59PM时截⽌
00:51 - 00:55
It should be a little spin oh great script a bunch of you've already completed it,who has
not started
它其实蛮简单的，我想你们都已经完成了才是，有谁还没开始吗？请举个⼿
00:58 - 01:03
Wednesday,what did I say Monday,yeah it is Monday,Wednesday whenever the 11th is
抱歉我说错了，11号是周三，周三截⽌
01:03 - 01:05
Right, who is not starting?
好了，有谁没开始吗，请举个⼿
01:08 - 01:10
Start,just make sure okay
好了我们上课吧，我这样问只是确保你们都开始做了
01:11 - 01:18
And the other thing we will be releasing project number one on on on Wednesday as well
我要说的另⼀件事就是我们会在周三放出Project 1的相关信息
01:18 - 01:22
Again,the lecture on Wednesday will be all about what your toes to implement in project
#1
在周三的课上我们会去讨论你们要在Project 1中所实现的东⻄
01:22 - 01:28
And then so at the end we'll talk about those sort of logistics of how you're gonna go
about and do this in the source code
在最后我们会去讨论在源码中你该去怎么实现某些逻辑
01:28 - 01:32
And then again that will be spending on great scope as well
讲这些会占⽤很多时间
Impira Talk 这⼀项没听出来。
01:32 - 01:41
Okay all right,so the other things that might be interesting to you,or we have some
upcoming database talks that are sort of somewhat relevant to what we talked about in
the course
Ok，其他令你们感兴趣的事情就是，我们会有⼀些数据库的讲座，它的内容与我们课程中所讲
的内容息息相关
01:42 - 01:48
This Friday over in the CIC building,we will have a talk from people from SalesForce
我们会在周五的CIC楼中，有⼀场SalesForce的⼈所举办的讲座
01:48 - 01:55
This is public Salesforce is building a brand new database manager system to shoot at
database system based on PostgreSQL
这是⼀场公开演讲，SalesForce基于PostgreSQL构建了⼀套新的数据库管理系统
01:55 - 02:04
A lot of my former students people have taken this class are now working on it,in San
Francisco in the brand-new buildings which are amazing
许多以前上过我课的学⽣现在都在旧⾦⼭那边新的公司⼤楼⾥⾯为此⼯作，这令⼈⾮常惊叹
02:04 - 02:08
And then next week at the database group meeting on Monday
接着，在下周周⼀的数据库周会上
02:08 - 02:16
We'll have Ankur Goyal who is CMU alum, he was the former VP of engineering at
memory SQL which is an in-memory database that we can talk about later in semester
我们的嘉宾是CMU的校友Ankur Goyal，他曾是memSQL的副总裁，他会给我们带来内存型数
据库的⼀些内容，这也是我们这学期之后要讲的内容
02:17 - 02:21
she has a new start up doing analytic database stuff
他有⼀家在做分析型数据库的初创公司
02:21 - 02:23
And he'll be talking on Monday next week
他会在下周⼀说这个事情
02:23 - 02:25
And then the following Monday so two weeks from now
接着，在下下周⼀
02:25 - 02:29
We'll have somebody from Vertica come give a talks to
我们会有某个来⾃Vertica公司的⼈来给我们进⾏讲座
02:29 - 02:32
So Vertica is a column store database system one of the more famous ones
Vertica是⼀个⽐较著名的列存储数据库系统
2.32-2.37
that was invented by my grad school advisors and got sold by HP
它是由我毕业学校的教授所开发的，之后卖给了惠普
2.37-2.40
And they got sold off to a holding company a few years ago
他们⼏年前将它卖给了某个控股公司
02:40 - 02:43
But believe it not they actually have an office in Pittsburgh
但实际上，他们在匹兹堡有⼀个办公室
02:43 - 02:47
And so he's gonna come and give a talk about what,you know the kind of stuff they're
doing here
他会来我们这⾥向我们谈论他们所正在做的事情
02:47 - 02:50
And when we one of the newer things Vertica is doing
即Veritca所在做的事情
02:50 - 02:53
So if I have stated work columnstore it won't make sense
当我谈到列式存储的时候，你们可能没啥感觉
2.53-2.55
right now,It should make sense by the end of this this lecture
但我相信在这节课末尾的时候，你们就应该对此很有感觉了
02:55 - 02.57
Okay,because what will describe what that is,
Ok，因为我会在这节课上讲它是什么
2.57-3.01
and actually try to give it up and running to give a demo,like too many installation errors I
gave Up
实际上你们会去试着放弃它，因为我在安装时遇上太多安装错误，所以我放弃了！
03:01 - 03:04
Okay so again,these are all free to the public
Ok，再说⼀遍，这些都是免费的公开课
3.04-3.08
there's pizza at this one and these like fruit,So you can plan your meals accordingly
这些讲座⾥都会提供披萨，或者⽔果之后的东⻄，So，你们可以计划性的去⽩嫖了
03:10 - 03:18
All right,so last class we started talking about how we would want to design a Disk
Oriented Database Management Systems
So，在上节课我们讨论了该如何去设计⼀个⾯向磁盘的数据库管理系统
03:18 - 03:25
And again,I said a Disk Oriented Database Management Systems is one where the
database system assumes,that the primary search location of the database is on disk
我说过，⾯向磁盘型数据库是假定数据库系统的主要搜索位置都是位于磁盘上的
03:25 - 03:34
And so we spent time talking on how we're actually going to organize the database at
different levels within files within pages and then within those pages within tuples
因此，我们花了⼀些时间讨论在实际情况下如何通过数据库在不同层次之上组织包含这些pages
的⽂件以及这些page所包含的tuples
⽂件，在⽂件所包含的pages，然后在这些pages中tuples的这些不同层次之上组织数据库。
03:34 - 03:42 ****
And so the reason why we want to do all this is,because we want to be able to support
databases that are larger than the amount of memory that's available to us on a single
machine
我们想这么做的原因，是因为我们希望能够支持比一台机器上可用的内存量更大的数据库
03:42 - 03:47
And yes,I know you can go distribute it,you can go across multiple nodes for now we can
ignore all that
没错，我知道你们可以使⽤分布式，通过多个节点来解决这个问题，但现在我们将它们统统抛
开
03:47 - 03:52
Just saying you have a single box, how do we bring data in, when we can't fit it all in d
trance
假设我们现在有⼀个盒⼦，当我们没办法将数据全放在这⾥⾯时，那我们该怎么做呢？
03:52 - 03:58
And so we finished up talking about a lot of pages,this just a quick refresher
So，之前我们已经谈论过许多page相关的知识了，这⾥只是为了快速回顾下
03:58 - 04:02
So a slotted page was how we're gonna organize tuples inside of a page
Slotted page指的是我们该如何组织⼀个page内的tuples
04:02 - 04:07
So that we can move things around and we start packing in as many tuples as possible
这样，我们就可以将⾥⾯的东⻄移来移去，并在page内打包尽可能多的tuples
并将它们尽可能多的打包成tuple
04:07 - 04:12
So we have the slot array at the top the fix and a very lank tuple at the bottom
So，在page顶部我们有⼀个Slot数组，在底部则是tuple数据
04:12 - 04:19
And we just keep adding things from the end to the beginning,and from beginning to the
end,Until we reach to add we don't have any more space
我们是按照从后往前的顺序添加tuple，然后按照从前往后的顺序添加Slot数组内的元素，直到
我们占⽤了page空间的⼀半时，我们就没办法使⽤更多的空间了
我们是按照从后往前的顺序添加tuple，然后按照从前往后的顺序添加Slot数组内的元素,直到
page内空间耗尽
04:19 - 04:24
And so I said,this is the primary way most database management systems out there
我之前说过，这是⼤部分数据库管理系统所采⽤的主要⽅式
4.24-4.28
that are most of systems which again I'll explain where that is in a second
我们在时候解释是哪些数据库使⽤这个
我等会再次对这种⽅式进⾏⼀波解释
04:28 - 04:32
This is primarily the way most database systems actually do this
实际上，这是⼤部分数据库系统所采⽤的主流⽅式
04:32 - 04:34
But it's not the only way
但这并不是唯⼀的⽅式
4.34-4.37
and we ran out of time we didn't discuss the other way
因为我们上节课没时间了，所以没能来得及讨论其他⽅法
4.37-4.39
And so I'm gonna briefly talk about that
So，我等会会去简单说下这些
04:39 - 04:43
So just again this is put it in context，most what we'll talk about this semester will be
this organization
So，本学期我们讨论最多的就是这种Organization
04:42 - 04:47
The database system you'll be working on for your projects will use this type of
organization
在你们项⽬中所要⽤到的数据库也会使⽤这种类型的Organization
04:47 - 04:49
But again it's not the only way
但再说⼀遍，这绝不是唯⼀的⽅式
04:49 - 04:53
Another way is to do is called Log-Structured File Organization
另⼀种⽅式就是⼀种被称为Log-structured的⽂件组织
04:54 - 05:01
So the way this works is that instead of storing the full tuple inside our pages
这种⽅式的做法并不是将所有的tuple都存放在我们的page中
05:01 - 05:08
We're instead just going to store the the information about how that tuple was created
or modified
⽽是去存储这些如何创建tuple以及修改tuple的相关信息
05:09 - 05:11
Right,so what I mean by that,
So，我这么说的意思是什么呢？
5.11-5.15
so let's say in our page,we're just going to start appending these log records
So，在我们的page中，我们只需去追加这些log记录
05:15 - 05:20
And I'll think of it like mall records like a text file that are read by humans think is a log
record
我们会以⽂本⽂件的形式来保存这些记录，⼈们读起来的时候就像是在读⽇志记录⼀样
5.20-5.23
that's a some binary representation of what the change was
某些修改是通过⼆进制来表示的
05:25 - 05:28
So we record like,I inserted this tuple,I updated this tube,I deleted this tuple
So，我们可以像图中这样来表示，即insert xxx，update xxx，delete xxxx
05:29 - 05:36
Right,and we just all we have to do is just keep appending every,you know every time
you flip the Page,we could go create a new one and start pending more logs to that
我们只需⼀直追加下去即可，当翻到这个要操作的page时，我们可以去创建⼀个新的记录，然
后在这条记录的后⾯继续追加log记录
05:37 - 05:41
Anybody I guess why you want to do something like this
有⼈能猜⼀下为什么我想这么做吗？
05:43 - 05:44
Yes
请讲
5.44-5.50
it's easy to what he says, it's easy to roll back
他的答案是，这样回滚起来很⽅便
05:50 - 05.54
Potentially,yes
回答的部分正确
5.54-6.00
yeah like,if I have a Thousand,if I have a thousand columns and I update one
如果我有1000列，并且我更新了其中⼀个
6.00-6.02
if I need to roll back,I did blow away the single update record
如果我需要回滚，我只需将这个更新记录删掉就⾏了
06:02 - 06:04
yeah that's one
So，这就是其中⼀个原因
6.04-6.05
yes
请讲
6.05-6.07
she says fast,right absolutely yes
她说这样操作很快，确实说的没错
06:08 - 06:13
So memory said that in specially spinning discs hard drives but even modern SSDs
我们之前说过，不但在机械硬盘上，同时SSD上也有这种情况
06:13 - 06:18
It's much faster to do sequential right sequential read sequential access than random
access
即循序写⼊，循序读取和循序访问的速度要远⽐随机访问快得多
06:19 - 06:23
So if I'm back in this mode,and let's say I update you know ten tuples
如果我使⽤这种模式，假设我要去更新10个tuple
06:23 - 06:25
But they're all in different pages
但它们在不同的page上
6.25-6.29
now I have to go write and update the the tuple owned across ten different pages
那我就必须在这个10个page上来写⼊并更新这些tuple
06:29 - 06:32
But if I'm doing the logs structure organization
但如果我使⽤的是这种log-structured组织
6.32-6.37
then I put my ten writes into my single page,and I can write that out in one go
那我将这10条更新语句写在单个page上，我⼀次就能搞定全部了
06:37 - 06:39
So you see ,so this idea is not new
这种想法其实并不新颖
6.39-6.42
like it came out late 1980s early 1990s
它是在1980年代末，1990年代初出现的
6.42-6.44
Log-Structured file systems or Log-Structured merge trees
它被称为⽇志结构⽂件系统或者是⽇志结构合并树
06:45 - 06:48
But it's really applying the ten years that this has taken off
但这项技术确实在过去⼗年间已经起⻜了
06:49 - 06:56
And part this is because there, you know things like HDFS or s3
例如，在HDFS或者S3之类的东⻄中
06:56 - 06.59
Right,there's all these distributed file systems where there are append only
这些分布式⽂件系统就只⽀持这种追加的⽅式
6.59-7.02
you can't do random updates,you can only keep appending records
你没办法去进⾏随机更新，你所能做的就是追加记录
07:02 - 07:06
So this style of storing your tuples is it works great for that
这种保存tuple的⻛格⾮常适⽤于这种情况
07:07 - 07:10
So what's one obvious downside with this
So，它其中⼀个明显缺陷是什么，你们能看出来吗
07:12 - 07:13
She said read it absolutely yes
她的答案是读取，说的没错
07:13 - 07:16
So if I have to read a tuple now
So，如果我现在需要去读取某个tuple
07:16 - 07:25
I gotta go back in time and look at the logs and try to figure out,whatthe tuple look
like,wait what what was the final result of the tuple
那我就会回过头去在⽇志中查找，试着找到这个tuple在哪，以及它的最终结果是什么
07:25 - 07:27
Right,so if my look see I'm updating so tuple here
So，如果我看到我在此处更新了tuple
7.27-7.29
and I have a thousand columns,but I don't update one of them
我有1000个列，但我不想去更新它们中的任何⼀列
07:29 - 07:35
I got to go back,and try to find where it inserted updated the other thousand columns to
put it back into the form that you want
那我就得会去看⽇志，试着找到它是在哪⾥插⼊、更新那些属于这1000列操作，以此将它变回
你想要的形式
07:36 - 07:39
All right,so there's ways to sort of speed that up
So，有⼏种⽅式可以提⾼这种⽅式的速度
07:39 - 07:43
All right,you can build indexes and say, well if I'm looking for a particular tuple
你可以建⽴索引，并表示我想找到这个tuple
07:43 - 07:47 ！！！
Here's how to jump to the particular offset in the log,that has the data that I want
接着跳到⽇志中特定的偏移量处就能找到我想要的数据
07:47 - 07:59
Or another thing you could do is say,just go actually replay the log,and compact it
down,and to just it's you know just the one record per tuple
另⼀件事你可以做下，即重新把这个log⾛⼀遍，对它⾥⾯内容进⾏筛选压缩，对于每个tuple，
你只需知道⼀条记录即可
86
07:59 - 08:05
Right,so I can take all these guys,and then just convert it back into just,you know is there
a tuple form
Right,so 我就可以将这些东⻄，给它转换成这种tuple形式
08:05 - 08:08
So as I said,this is more common in more recent systems
我之前说过，这种做法在较新的数据库系统中都⽐较常⻅
8.08-8.11
some of these you probably heard about HBase,Cassandra
你们可能听过这些，例如HBase，Cassandra
08:11 - 08:19
There's a bunch of these distributive systems that are out there that I written and
go,things like CockroachDB where they're all using RocksDB,as the underlying Storage
Manager
许多分布式数据库系统都使⽤这种技术并且是⽤Go写的，例如CockroachDB使⽤了RocksDB存
储管理器作为底层（注：CockroachDB,可实现跨数据中心同步的可伸缩开源数据库。RocksDB是一个为
更快速存储而生的,可嵌入的持久型的key-value存储。）
08:19 - 08:22
All right,so the distributed execution layer is all and Go
So，分布式执⾏层都是使⽤Go来写的
08:22 - 08:25
But then underneath the covers RocksDB and C++
但在它们内部使⽤的RocksDB是使⽤C++编写的
08:25 - 08:29
And so rather than writing their own storage manager that is relying on this like as an
embedded system
so，相对于写⾃⼰的存储管理，他们依赖使⽤了这个内嵌的系统
08:29 - 08:32
So RocksDB came from Facebook
So，RocksDB是由FaceBook所推出的
08:32 - 08:34
Facebook actually RocksDB is rigidly based on levelDB
实际上RocksDB是基于LevelDB改进后的产物
08:34 - 08:36
levelDB was written by Google
LevelDB是由⾕歌所编写的
08:36 - 08:40
Then Facebook took it,first thing they did was remove mmap
然后，Facebook将它拿过来，⾸先他们做的事情就是将mmap移除掉
08:40 - 08:43
Right,and then they really released it as RocksDB
然后他们将它作为RocksDB放出
08:43 - 08:47
So levelDB still out there but pretty much everyone uses RocksDB
So，LevelDB依然活着，但许多⼈都使⽤的是LevelDB
08:48 - 08:51
So again like so we're not really going to cover this the rest of this semester
So，我们并不会在这学期剩下的时间⾥⾯介绍这些
8.51-8.54
it'll show up when we talk about distributed databases later on at the end
当我们在最后讨论分布式系统时，我会向你们展示下它们
08:54 - 08:59
But for our purposes，we'll just assume that we're dealing with tirely slotted page
systems
但出于我们的⽬的，我们假设我们⾯对的是slotted page型数据库系统
08:59 - 09:09
Okay all right,so for today's class,we want to now go a little bit deeper,and talk about
how we're actually gonna represent the data in tuples
Ok，So在今天这节课上，我们会对此继续深⼊，我们会来讨论下该如何使⽤tuple来表示数据
09:09 - 09:13
So again,we said the database is represented by a bunch of pages
So，我们之前说过数据库是通过⼀系列page来表示的
09:13 - 09:16
So then we discussed or how to break up the heap file into pages
So，接着我们讨论了如何将heap⽂件拆分为page
09:16 - 09:20
And then when these page we talked about how to represent the slotted array
然后我们⼜讨论了如何使⽤slot数组来表示这些page
然后，当我们谈到这些page的时候，我聊了如何表示这个slot数组
09:20 - 09:24
And then we said roughly inside each slot of the array,you have these slots,then then you
have your tuples have a header
接着，我们⼜简单说了下，在每个slot数组中，我们有slot，tuple以及⼀个header
我⼤致说了下数组中每个slot⾥⾯的东⻄，你有了这些slots，然后你就有了tuples ，还有⼀个
header（注：这⾥针对的是page来说的）
09:25 - 09:30
And now inside the tuples we want to say,what does the data actually look like for
individual attributes or columns
现在，在tuple中，我们想去知道各个属性或列的数据实际看起来是什么样的
9.30-9.32
how are we actually gonna represent that
以及我们实际上该怎么去表示它们
09:32 - 09:38
Then we'll go on and talk about how we actually store the metadata about what our
tables look like
然后我们会去讨论实际上我们该如何保存我们表的元数据
09:38 - 09:41
And then we'll talk about the storage model the rows store versus column store stuff
然后，我们会去讨论存储模型，即⾏存储和列存储相关的东⻄
09:42 - 09:50
Okay,so at a High-level,a tuple is just a sequence of byte,it's just a byte array
Ok，从⾼级层⾯来讲，⼀个tuple就是⼀个字节序列，就是⼀个字节数组
09:50 - 10:00
Right,and it's up to the database management system to be able to interpret that byte
array and make sense of it and say,Oh yeah,it's if this is an integer,this is a this is a
float,this is a string care you know attribute
这就取决于DBMS如何去解释它的意思，以及弄清楚它的类型，就⽐如说，Oh这是⼀个
Integer，这是⼀个float，这⾥⼜是⼀个字符串属性之类的东⻄
10:00 - 10:02
So that's essentially all what we're doing here
So，本质上来讲，这就是我们今天这节课要做的事情
10.02-10.05
we're just organizing our tuples as if these byte arrays
我们需要将我们的tuple组织为字节数组
我们要将这些字节数组组织成我们的tuples
10:05 - 10:11
And then when it comes time to execute a query, we need to interpret what's actually in
those byte arrays to produce the answer that we're looking for
然后，当数据库系统执⾏查询时，我们需要去解释下这些字节数组中的实际内容，以此来⽣成我
们所寻找的答案
10:11 - 10:14
And so if this is what the catalog stuff will talk about in a second
So，这是我们之后要讨论的catalog的相关内容
10:14 - 10:20
This is how they're gonna figure out , Oh,I have 10 columns what first one is a 32-bit
integer,the next one is 64-bit float
这样我们就能弄清楚它们是什么，⽐如说：Oh，我有10列，第⼀列是⼀个32位的Integer，下⼀
列是64位的Float
10:20 - 10:24
It uses that information decide how to interpret and decipher those bytes
数据库使⽤这些信息来解释以及解密这些字节
10:25 - 10:41
So the way we're gonna use for most database systems away,we're going to represent
data is for fixed length things like integers and floats, is usually the same way that we
would represent this in like C or C++
So，在⼤部分数据库系统中，例如Integer和Float这些固定⻓度的东⻄，我们所使⽤的表达⽅式
是与C和C++使⽤的⽅式是⼀样的
10:41 - 10:48
This is usually defined by what's called IEEE 754 standard,who here is heard of that
before the IEEE 754 standard
注：IEEE⼆进制浮点数算术标准（IEEE 754）
这通常是由⼀种被称为IEEE-754的标准所定义的，在座的有谁之前听过这个标准？
10:48 - 10:50
All right a little bit less than last year
好吧，看起来听过的⼈要⽐去年少得多
10:50 - 11:01
So the I took the IEEE 754 standards basically,It's a for the Industry,it's the specification
of how to represent numbers and CPUs
基本上来讲，IEEE-754是⼀种⾏业标准，它是⼀种⽤来表示数字和CPU的规范
11.01-11.03
like integers,and floats,and things,like that
例如，Integer，float或者其他之类的东⻄
11.03-11.09
how many bits,you know where you know is it in big-endian,little-endian,you know have
the two's complement in the front
这些东⻄有多少字节呢，你知道的，xxx.xxx这个数字形式，包括点号左侧（⼤端）和右侧（⼩
端），你知道在操作系统⾯前所看到的是⼀个⼆进制补码（知秋注：在计算机系统中，数值⼀律
⽤补码来表示和存储）
11.09-11.12
all that is represented in that in that standard
所有的这些东⻄都是以这种标准来表示的
11:12 - 11:20
So for fixed-length types and integers big and small and tinyints, and then
floating/Reals,we'll just follow the IEEE 754 Standard
对于固定⻓度的类型，INTEGER，BIGINT，SMALLINT，TINYINT，FLOAT/REAL这类遵循的
就是IEEE-754标准
11:20 - 11:22
We'll discuss in a second about the Fixed-point Decimals
我们会在稍后讨论下Fixed-point Decimals类型
11:23 - 11:24
But basically these are floating point
但基本上来讲，这些是浮点数（float/real）
11.24-11.25
and then these are fixed point
然后这些是定点数(numberic/decimal)
11.25-11.29
and this is something we and the data system will have to implement
这些是我们在数据库系统中必须去实现的东⻄
11:29 - 11:32
For varied-length things varchars,varbinary,texts and blobs
对于那些可变⻓度的类型，例如varchar，varbinary，text以及blob来说
11.32-11.34
typically there's a header
通常情况下，它们⾥⾯都有⼀个header
11.34-11.42
that says,you know you know here's here's the the length of the blob I'm storing or the
blob at the varied-length followed storing
它⾥⾯会保存我所保存的blob的⻓度
11:42 - 11:45
May be a checksum if it's a really big big value
如果它是⼀个很⼤很⼤的值，那后⾯还会跟⼀个checksum
11.45-11.47
and then you have the the sequence of bytes
接着，后⾯就跟的是字节序列
11:48 - 11:51
So this is different than representing strings in C where you have the null Terminator
character
So，这和在C语⾔中表示字符串有所不同，C⾥⾯你还会有⼀个空终⽌符（'\0'是字符串的结束
符）
11:51 - 11:55
We're instead could have a prefix that tells us how big it is actually going to be
此处，我们则是使⽤⼀个前缀来告诉我们这些东⻄的体积有多⼤
11:56 - 11.58
For Dates and Timestamps
对于Date和TimeStamp类型来说
11.58-12.01
this varies wildly across different database systems
在不同的数据库中，它们的实现可以千差万别
12.01-12.02
right there's no one way to actually do this
So，实现的⽅法实际上不⽌⼀种
12:03 - 12:14
Most of the systems usually just store the number of seconds or microseconds or
milliseconds,since the UNIX epoch which is like January 1st 1970
⼤多数系统通常是这样处理的，它们会去保存从1970年1⽉1⽇起的秒数或毫秒数或者微秒数来
处理时间
12:14 - 12:16
For Windows,I don't know what they do
对于Windows来说，我也不清楚他们是怎么做的
12:18 - 12:26
And so in a bunch of systems - also you can say,oh I want the date without the time or,I
want the time without the date，underneath the covers are still going to store the full
timestamp
So，在⼀⼤堆数据库系统中，你们可以这样说，我想要不带时间的⽇期，或者说我想要不带⽇
期的时间，本质上来讲，这些数据库系统保存的依然是完整的时间戳
12:26 - 12:31
It's just the API that you use to access that data knows that strip out whatever part you
don't need
你们通过使⽤API来访问这些数据，同时你们可以去掉数据中那些不需要的部分
12:31 - 12:38
All right,so some systems will actually just pack in just the date,and we store that as a
smaller smaller value，a bunch of systems actually don't do anything
So，某些系统会直接将它们以Date的形式进⾏保存，这样我们所保存的就是⼀个很⼩的值，但
是，许多系统实际上对它们不进⾏任何处理
12:38 - 12:44
So again this is something we have in our database system,this is something we
implement our database System
So，这是我们数据库系统中所有的东⻄，并且也是我们要在我们的数据库系统中实现的东⻄
12.44-12.50
but the for the fixed point values this will just rely on,you know whatever c++ gives us
which should be underlying hardware
但对于定点数字来说，它就⾮常依赖于C++或者底层硬件所提供给我们的数字了
12:50 - 12:59
All right,so the thing we're gonna go talk about now,there's more interesting is again how
do we actually compare these to the fixed-point Decimals
现在，接下来我们所讨论的令我们感兴趣的事情就是，我们该如何进⾏这些（float/real）与
fixed-point Decimals之间的对⽐
让定点精度数和可变精度浮点数进⾏⽐较
12:59 - 13:03
So if you want to have float, Real/double or variable precision numbers
So，如果你有float, Real/double或可变精度数字
13:06 - 13:09
These are inexact numbers that the CPU gives us or like your C++ gives us
这些都是CPU或者C++给我们的不精确数字
13:09 - 13:14
Because you have a C program and I call you know a declared variable float whatever
and give it a variable name
⽐如说，你有⼀个C语⾔程序，我调⽤了⾥⾯其中⼀个声明过的float类型的变量或者其他类型的
变量，我给了它⼀个变量名
13:14 - 13:22
that's what we're getting when we declare a real or double or float in our database
system as like the SQL type
这就是当我们在我们的数据库系统中定义⼀个REAL或DOUBLE或者FLOAT类型的变量时所得到
的东⻄，就像是SQL中的类型那样
13:22 - 13:27
Again this is specified how you actually represent this like the decimal point,and the
scope in the precision
它明确了你该如何表示⼩数点以及数字的精度范围
13.27-13.30
all that's defined by the 754 standard
这些都是由IEEE-754标准所定义的
13:30 - 13:39
So these are gonna be much faster to executors to operate on than the fix point
decimals the databases system provides
这些执⾏起来的速度要⽐数据库系统所提供的定点⼗进制数来的快得多
对可变精度数字执⾏操作的速度要⽐任意精度数字快得多（注：定点数的精度是任意的，即它的
范围是没办法确定的，好⽐银⾏账户⾥的钱，可以超过int表示的范围，也可以在它的范围⾥，
⽽且为避免双精度数字计算产⽣数字的误差操作，其实内部就需要⼀波转换操作）
13:39 - 13:43
Because the CPU has instructions to operate on these very efficiently
因为CPU拥有能够⾼效执⾏这些操作的指令
13:43 - 13:49
Right,one instruction to take 2 floats and add them together or subtract them
CPU通过⼀条指令就能对两个浮点数进⾏相加或者相减
13:49 - 13:56
But when we talk about dealing with the fixed point ones，that's a whole bunch of stuff
we have to write,and that's mean way more instructions
但当我们讨论如何处理定点数时，我们需要写⼀⼤堆东⻄来对它们进⾏处理，这就意味着需要更
多的指令才能处理它们
13:56 - 14:00
So this sounds like what we'd want to use right,because it's fast
So，这样看起来我们更倾向于使⽤可变精度数，因为它处理起来速度更快
14:00 - 14:02
The problem is though there's gonna be rounding errors
但问题在于，这⾥⾯会存在舍⼊误差
14:03 - 14:09
Because the 754 standard like there's no way to exactly store decimals in in hardware
因为在IEEE-754标准中，并没有任何办法将⼗进制数准确地存⼊硬件
14:09 - 14:11
So they have to approximate this
So它们只能使⽤⼀个⼤概的数字
14:12 - 14:13
Right,so here's a really simple C program
So，这⾥有个⾮常简单的C程序
14.13-14.16
I normally don't like the show code in class other than SQL
通常来讲，除了SQL以外，我并不想在课上展示任何代码
14:16 - 14:21
But this is simple enough I think,you know you should be able to comprehend it from
your seat
但我觉得这段代码太简单了，从你们的⻆度应该很容易就能理解
14:21 - 14:25
So all we're gonna do is we have two floats X and Y
在这段代码中我们有两个float类型变量，x和y
14:25 - 14:28
And then we're gonna print out the value of X plus Y
然后，我们打印出x+y的值
14:28 - 14:31
And then we're just gonna print out the constant 0.3
接着，我们去打印出⼀个常量0.3
14:31 - 14:36
So you pick your favorite compiler, I use GCC,and when you compile it you get this
answer here
So，你们可以使⽤你们喜欢的编译器，这⾥我使⽤的是GCC，当我编译这段代码时，我得到的
答案如图所示
14:36 - 14:39
Right,that looks you know that's correct right that's we would expect
可以看到这⾥的答案是正确的，这和我们所期望的⼀样
14:39 - 14:48
But all I'm doing is just doing your %.20f, I'm just asking that the languages to print out
the the floating-point
我这⾥所做的是按照%.20f的格式来打印这个浮点数
14:49 - 14:50
And let it do whatever rounding it wants to do
让它根据它⾃身来做四舍五⼊
14:51 - 14:54
When you specify what precision you actually want
当你在指定你实际想要的精度的时候
14:55 - 14:57
So I'm gonna go into 20 decimal points
So，这⾥我想要的精度是⼩数点后20位
14:57 - 15:00
Then you see that you get a totally different number
这样，你就会看到我们得到了⼀个完全不同的数字
15:00 - 15:07
Same exact code,same exact values,it's just when I represent it in a human readable
form now I'm seeing,I'm way off
可以看到这两段代码完全相同，⾥⾯的值也完全相同，当我以⼈类可读的⽅式表示的时候，我就
看到了图上这种情况，答案完全不同
15:07 - 15:10
Right,I can't even get 0.3 correct
我没办法得到正确的答案0.3
15:11 - 15:20
Right,I can this is because the hardware can't exactly represent floating-point numbers
to you know precisely
这是因为硬件没办法去精确表示浮点数
15:20 - 15:25
Right,so again this will be faster for us to execute, but we're gonna have rounding errors
So，对于我们来说执⾏速度会很快，但我们会遇上舍⼊误差
15:25 - 15:30
So now you know this means you may think,all right 0.3 my little example here who cares
where there's a rounding error
现在，你们可能会想，在我这个⼩例⼦中，我们知道答案是0.3，这就够了，谁会去在意舍⼊误
差呢
15:30 - 15:33
But if it's your bank account then you start to care
但如果是你们的银⾏账号的话，那你们绝对锱铢必较
15:33 - 15:35
Right,
我讲的是不是很有道理
15.35-15.41
or if it's a scientific you know instrument where you trying to send something into
space,these round errors cause real problems
如果是在科学计算上遇上这种问题，那么当你试着将某物送⼊太空时，如果你发出的指令上有这
种舍⼊误差，那么这就会引发现实问题了
15:42 - 15:43
So to avoid this
So，为了避免这种事情发送
15.43-15.48
you use what are called fixed precision numbers or fixed point decimal numbers
我们会去使⽤⼀种称为固定精度数字的数字
15:48 - 15:52
So again,these are something that the databases system has to implement to represent
these values
So，这些东⻄是我们必须在数据库系统中实现的，以此来表示这些值
15:52 - 16:01
It's a bunch of extra code that can take care of all the,you know arithmetic operations or
aggregations you normally wouldn't want to do on any kind of number
这需要⼀堆额外的代码来处理这些，你知道，我们通常不希望对任何数字执⾏的算术运算或聚合
16:01 - 16:07
Right,so the way you know show how Postgres is gonna do this in a second
我稍后会在PostgreSQL中展示这⼀点
16:07 - 16:17
But the basic idea to think about,this is you're gonna store that value as like a
varchar,the actual like human readable representation of the value
但这个问题的基本思路就是你将这个值作为varchar类型来存储，即⽤⼈类实际可读的值的形式
来表示
16:16 - 16:23
And then some extra metadata to say,here's what the decimal point is,here is what the
scope is,here's the rounding Information
接着，通过⼀些元数据来表示，这⾥是⼩数点，那⾥是精度范围，接着另外⼀边是四舍五⼊信息
16:23 - 16:27
Right,and that's all packed in with the tuple itself,just as part of that that byte array
这些东⻄都要放在tuple⾥⾯，并且它是该字节数组的⼀部分
16:28 - 16:32
So,I always give this demo every year of Postgres and SQL server
我每年⼀直都是使⽤PostgreSQL以及SQL server来演示demo的
16:32 - 16:34
Right,normally I given Postgres
通常情况下，我是⽤PostgreSQL来做示范
16:34 - 16:39
But we'll try for Oracle and SQL server as well
但我们也会拿Oracle和SQL server来示范
16:39 - 16:50
So let's see what the performance difference is for these different types,turns off ,all
right, is that readable
So，让我们来看下这些不同类型间在性能上的差异，这⾥我把灯关掉，你们能看得清了吗？
16:50 - 16:55
All right, so what I've done is I've created a,I wrote a simple Python script
So，这⾥我写了⼀段简单的Python代码
16:55 - 17:02
And all it did was create a giant CSV file
它所做的事情就是创建了⼀个巨⼤的csv⽂件
17:02 - 17:05
That has ten million rows of to floating-point numbers
该⽂件包含了1000万⾏浮点数字
17:05 - 17:08
Right,that's all it is you just put random numbers
这⾥⾯我们所放的都是随机数字
17:08 - 17:12
so I can load this I'm gonna create two tables in Postgres
So，此处我在PostgreSQL中创建了两张表
17:13 - 17:19
I'm gonna create one that uses reals,and one that uses the the fixed point decimals
其中⼀张表中我使⽤的类型是REAL，另⼀张表我使⽤的则是 fixed point decimals
17:20 - 17:24
All right,so there's one for reals,there's one for decimals
So，这张表中⽤的是REAL，另⼀张表⽤的是DECIMAL
17:24 - 17:33
And then Postgres has a nice command called copy
在PostgreSQL中有⼀个很nice的命令，那就是copy
17.33-17.36
that will take a file that's on local disk，And then take the output and write it into the
table
copy命令可以将本地磁盘上的数据⽂件导⼊到PostgreSQL中，并将它写⼊到表中
17:36 - 17:40
Various database systems have various commands
不同的数据库系统会有不同的命令
17:40 - 17:45
And SQL servers called bulk,in in MySQL it's called load into whatever
在SQL server中则是bulk，MySQL则是load
17:45 - 17:48
Oracle was was a pain to set up,but I got it working
Oracle装起来太麻烦了，但总之我让它跑起来了
17:48 - 17:56
So now we're going to do is we're gonna run a query,that just takes the two numbers
and add them together
现在我们要做的就是执⾏⼀条查询，该查询要做的就是将两个数字进⾏相加
17:56 - 17:58
So let me turn on timing as well
So，这⾥我使⽤\timing命令来查看本次查询所要的时间
17:59 - 18:04
And then because this is Postgres 10,Postgres 10 added support for parallel queries
因为我们使⽤的版本时PostgreSQL 10，这个版本⽀持并⾏查询
18:04 - 18:09
So like you know take a single query,and split up across multiple CPUs,and run them in
parallel
它可以将单个查询交给多个CPU以并⾏的⽅式来执⾏
18:09 - 18:14
So I'm gonna turn that off as well,just so we see like the performance of a row you know
a single CPU
So，我将这个功能关掉，我们来看下单个CPU的性能如何
18:14 - 18:17
I'm gonna do this for all the other systems as well
当然，我对其他数据库也会进⾏同样的操作
18:17 - 18:21
So let's see how longs would take if I do it with the reals
So，让我们来看下处理REAL类型时，它需要花多少时间
18:24 - 18:27
So if you've never seen this，let me go back to the syntax sorry
So，如果你们没看到过这个，抱歉让我先回到上⼀步
18:27 - 18:36
So populate says explain analyze,so if you never seen explain what explain does and put
it in front of any SQL query
这⾥我们使⽤了EXPLAIN ANALYZE，如果你们以前没见过这个东西，也不知道它放在SQL查询
语句前是做什么的
18:36 - 18:42
And instead of actually running the SQL query ,It tells you what query plan it's gonna use
to execute this query
相对于实际去运⾏SQL查询，这个语句会告诉你执⾏这个查询的查询计划（query plan）
18:42 - 18:45
All right doesn't actually run it says,here's what I'm gonna do if I ran it
它不会实际去执⾏查询，⽽是给出运⾏时它该怎么去执⾏
18:45 - 18:49
Different data systems have different syntax that's what Postgres and MySQL do
不同的数据库系统使⽤的语法也不同，这种是PostgreSQL和MySQL所⽤的语法
18:49 - 18:51
Right,we'll explain what a query plan is
通过使⽤explain 这个语法，我们可以说明我们的查询计划是怎样的
18.51-18.55
well I'm gonna optimize it maze optimizer optimizer is late in the semester
Well，我会在这学期后⾯去讲optimizer这块的内容
18:55 - 18:59
But basically what happened,you know just saying like you wanna run this query here's
how we're gonna do it
但基本上来讲，这⾥所发⽣的就是，我们想去执⾏这个查询，使⽤这个语法时，数据库就会给出
它会如何去执⾏这个查询
18:59 - 19:02
So but if I add the analyse calls in front of it
但如果我在语句前⾯加了ANALYZE
19.02-19.06
then this is actually gonna give you the query plan,and also run it for real
那么它不仅会给你查询计划，也会实际去执⾏查询
19:09 - 19:14
So you see that it basically took twelve twelve twelve hundred milliseconds,so 1.2
seconds to run this
So，你们可以看到它花了1.2秒才完成查询
19:14 - 19:19
And then to show you,if it's not a caching effect,I can just keep executing over and over
again
这并不是缓存带来的效果，这⾥我可以通过⼀次⼜⼀次的演示来向你们证明这⼀点
19:19 - 19:22
And the performance I got little faster,because it got in the cache
因为这⾥的结果被缓存了，所以我查询速度⽐之前快了点
19:22 - 19:25
But it should stabilize,yeah about 800 milliseconds
但它稳定下来后，差不多花了800毫秒
19:25 - 19:29
All right,so let's do the same thing now for the decimal one
好了，现在我们来对使⽤DECIMAL类型的那张表进⾏相同操作
19:35 - 19:36
So 2.4 seconds
So，差不多花了2.4秒
19.36-19.38
I run it again,we should get a little faster cuz,it's in cache
我再运⾏⼀遍，这次应该快点，因为刚才的结果被缓存了
19:40 - 19:40
not much
差的不是很多
19.40-19.45
Right,so again to same values,same data set loaded it as different data types
So，使⽤相同的值，相同的数据集，但数据类型不同时
19:46 - 19:50
But though the one query is is twice as slow
根据我们所得出的结果来看，它们所花的时间相差⼀倍
19.50-19.55
because we're doing all this extra stuff to deal with the rounding and other things
因为我们所做的额外⼯作是⽤来处理精度以及其他问题的
19:55 -20:00
All right,and you see that let me see,if I try to run again can getting the same values
你们可以看到如果我再运⾏⼀遍，我们能否得到相同的结果
20:01 -20:02
All right,they're getting given values here
此处它们给出了数值
20.02-20.05
Right,because there's some rounding issue issues
因为这⾥⾯存在了⼀些精度问题

04-02
20:05 - 20:12
So we can try to cast this there's a decimal,and then it'll be human readable
So，我们可以试着将它强转为DECIMAL，然后它就是⼈类可读的形式了
20:16 - 20:19
Right,so this is much different than this one here
So，此处给出的结果与之前那个相⽐很不⼀样
20:19 - 20:23
Right,this is you know one and this starts with it with a nine
可以看到这⾥的结果，⼀个是1开头，⽽这个是以9开头
20:25 - 20:28
So the real one is having rounding issues
So，在使⽤的类型是REAL时，会出现精度问题
20:28 - 20:33
So let's try the same thing in SQL server,the data is already loaded
So，我们在SQL server也做下同样的事情，这⾥我已经将数据加载了进去
20:33 - 20:36
So we don't need to bother loading it again
我们⽆须再去将它加载⼀遍了
20:39 - 20:42
So let me run this,so this will be with the reals
So，让我来执⾏下这个查询，这⾥我们使⽤的是REAL类型
20:44 - 20:48
Produced as a result,and told me it took 1.5 seconds
这⾥SQL server给了我⼀个结果，并告诉我它花了1.5秒才完成
20.48-20.51
Just try it again just see whether it gets faster
我们再来试⼀下，看看它有没有变快
20:53 - 20.54
Not much
差的不是很多
20.54-21.02
and then I'll run the same thing now with the on decimals,and it should be slower
接着，我们再来看下DECIMAL的情况，它执⾏起来的速度应该会慢点
21:05 - 21:06
yeah twice as slow
没错，慢了差不多⼀倍时间
21.06-21.10
we run again disapprove
我们再来跑⼀遍看看吧
21:10 - 21:15
Right,and there's this little maxdop it's the degree of parallelism
此处的MAXDOP指的是最⼤并⾏度
21.15-21.17
it's basically telling SQL server again run it with one one thread
这⾥我们所设置的是让SQL server使⽤⼀条线程来执⾏查询
21:18 - 21:20
The last one on my show is Oracle
最后，我想使⽤Oracle来演示
21.20-21.25
and I had a breakthrough this weekend,I figured out how to get the up keyed at work
这周末我取得了突破性进展，我总算知道我的向上键该怎么⽤了（我太难了）
21:25 - 21:29
So it was not by default
默认情况下我没法使⽤向上键
21:29 - 21:34
All right,so it's already loaded,I'll do the same thing where is it Oracle
Ok，数据已经加载完了，我接着来做相同的操作，emmm我的Oracle在哪呢？
21:35 - 21:37
So we'll turn timing on
So，我们启动计时功能
21:40 - 21:41
Run it with the Reals
So，我们先来看下Real的情况
21:43 - 21:45
And you get 0.53
花了0.53秒完成查询
21.45-21.48
run about decimals
再来看下DECIMAL
21.48-21.56
the same,slightly faster even
emm，⼀样，甚⾄还要快点
22:00- 22:04
So the way what's happening here is that Oracle actually gives you the fixed point
decimal no matter what
之所以会有这样的结果，是因为Oracle不管怎样默认都是使⽤定点数进⾏处理
22:04 - 22:09
You need ask you with the real,or the decimal,it always just gives you the decimal
不管你是⽤的REAL类型，还是DECIMAL，Oracle给你的始终是按照DECIMAL进⾏处理
22:10 - 22:14
Right,and before you say,oh look how much faster Oracle is any other ones
在你问Oracle的速度⽐其他数据库快多少前
22.14-22.17
again for this one here like I didn't turn off multi-threading
这⾥我并没有关闭多线程的功能
22:18 - 22:21
But also looks like is rounding off a lot
但看起来这⾥的精度问题也很严重
22:21 - 22:24
Right,this looks way off than what we'd expect from Postgres and SQL server
这看起来和我们在PostgreSql以及SQL server中所期望的不同
22:24 - 22:33
And that's,because Oracle has this thing where if the size of the output is not doesn't fit
in whatever characters you specify
那是因为在Oracle内有这样⼀件事，如果输出的⼤⼩不符合你指定的字符范围，
22:33 - 22:36
But there's none with thing then it rounds it for you automatically
然后它就会为你⾃动做四舍五⼊
22.36-22.37
took me a while to figure that one out
我需要花点时间来证明这点
22:37 - 22:39
But here's actually what you get when you have the real number
但当你使⽤的是REAL类型的数字，那么此处你就会得到⼀个real number
22:39 - 22:40
So that looks like what we expect
它会是我们所期望的结果
22:41 - 22:43
So again this is something that just be mindful that
这⾥有些东⻄你要注意
22.43-22.46
you know this is we have to implement in our database system
你知道这是必须在我们的数据库系统中实现这些东⻄
22.46-22.52
this is not something that,you know will magic go faster it's not something that we can
rely on hardward to provide for us
这⾥⾯并没有什么神奇的东⻄能让执⾏速度变得更快，这并不是硬件能提供给我们的什么东⻄
22:53 - 22.53
Yes
请问
22.58-23.01
question is it doing rounding along the way is it round only at the end
So，他的问题是在这个过程中我们对结果是⼀直四舍五⼊，还是在最后才四舍五⼊
23:01- 23:02
As far as note here
注意下这⾥
23.02-23.05
but this stupid numb lip thing it's rounding on the client side
它是在Client端进⾏四舍五⼊的
23:05 - 23:10
So the server is giving you this,and then it rounds when it lands on the client
So，服务器端会给你这个数据，但是当发送到Client端时，就会四舍五⼊了
23.10-23.12
why for whatever reason I don't know
为什么会这样，其实我也不知道
23:13 - 23:14
Right
23.14-23.24
and in Postgres ,in MySQL you can are,sorry Postgres in SQl server like you can specify
the round,there's a round function we could do on the server side
在PostgreSQL和SQL server中，我们可以在服务器定义⼀个round函数，以此来明确该怎么四
舍五⼊
23:24 - 23:34
So I think we can do something like this round,and then you say what precision you
wants it like 2
这⾥我们四舍五⼊到2位⼩数
23.34-23.35
No
有点蛋疼
23:36 - 23:39
Difference isn't that different thing is that I think that's MySQL syntax I don't know I
don't know what Postgres
不同的数据库系统语法也不⼀样，这个应该是MySQL⾥的语法，我不清楚PostgreSQL中这个函
数是怎么样的
23:39 - 23:40
All right,so you do neut but ,in your application you want to do it client-side or,sorry
server-side you want the server to do for,you don't want to assume the clients gonna be
formatting whatever for you
在我们的应⽤程序中，我们想让服务器端去为我们做这类事情，⽽不是让Client端去进⾏这种四
舍五⼊的处理
23:50 - 23:51
Yes
请问
23.51-23.57
so it looks like in the Oracle one that the decimals is giving the same values at the reals
in PostgreS
在Oracle中，DECIMAL的那个例⼦所给出的结果和Postgres 中的REAL是⼀样的
23:58 - 24:05
So his question is it looks like Oracle is giving us the value of the real,and not the
floating box
So，他的问题好像是说Oracle DECIMAL所给我们的是REAL的结果，不是定点的（floating
box ）
24:06 - 24:08
yeah hold up let's see those 3
我们来看下Oracle
注：这个3是代表 Oracle
24:10 - 24:18
that's Oracle and this,let's try SQL server
这个是Oracle，我们来试下SQL server
24:29 - 24:32
So that's who we'll assume that's correct,because it's SQL server
So，我们假设这样做是对的，因为它是SQL server
24:33 - 24:40
But so that was nine something,and let's see what this gives us,nine something it looks
the same,right,
但这⾥它返回给我们的是9xxxx之类的东⻄，我们再来看下这个它返回给我们的是什么，也是
9xxx之类的，看起来⼀样
24:40 - 24:48
yeah that's different than what the reals gave us
这和REAL那个例⼦给我们的结果是不同的
24.49-24.52
I think reals was giving us like seven point seven and this is seven point five
REAL所给我们的答案是.77xxxxx，⽽这⾥则是.75xxxx
24:54 - 25:05
So going back to Oracle,are say that's press too many terminals
So回到Oracle这⾥，不好意思按到PostgreSQL的terminal了，我这⾥开太多Terminal了
25:12 - 25:18
Yeah,but it's the same,hmm,
但答案看起来是⼀样的
25.18-25.22
I don't I don't just type it as live
25:22 - 25:28
But link to,so maybe that it that is it's always a decimal
这⾥可能返回的始终是DECIMAL的答案
25:28 - 25:30
Sorry it's always a real not the fix point
抱歉，应该始终是REAL的答案，⽽不是定点数的结果
25:32 - 25:39
Okay,I'll double-check,that
算了，我有空再确认下
25.39-25.39
I declare it,yeah I definitely declare it as a decimal
我确实将它声明为DECIMAL了
25:39 - 25:40
All right
25.40-25.42
let me figure what's going on I'll play some Piazza ,okay
我会在Piazza上公布这个，Ok
25.42-25.45
any questions,all right cool
有任何疑问吗？没有，Cool！
============================================================‘
25:47 - 25:49
So let's look,so what PostgreSQL actually doing
So，我们来看下PostgreSQL实际做了什么
25.49-25.52
SQL server and Oracle are not open source
SQL server和Oracle都是闭源的
25.52-25.54
PostgreSQL is actually we can look at it
不过，PostgreSQL是开源的，我们可以来看下它的代码
25:53 - 25:57
So this is actually from the Postgres source code version 9.6 I think
实际上我所展示的代码是PostgreSQL中的⼀段源码，它的版本是9.6
25:57 - 26:00
And so when you declare a fixed point Decimal
当你声明⼀个Fixed point DECIMAL时
26.00-26.03
This is what it stores this struct
这就是我在PostgreSQL中所保存的样⼦，PostgreSQL按照这个幻灯⽚的⽅式来存储这个struct
26:03 - 26:09
So you have all this extra metadata about what the decimal is, what the sign is and so
forth
可以看到，这⾥⾯包含了关于Decimal的⼀些额外的元数据（metadata），⽐如说，它的符号
是什么，等等属性
26:10 - 26:17
And then this part here as I said, this is just a string representation of what the Real
value actually is
接着，看我这边⽤红⾊标注出来的部分，其实是⼀个⽤来表示Real 类型值的字符串
26:17 - 26:26
And then at runtime, they know how to take this and decipher it based on what these
values are set to to ensure that you have the correct computation
然后在运⾏时，它们知道如何进⾏处理，并根据设置的这些值对其进⾏解密，以确保你进⾏正确
的计算
26:26 - 26:30
So now why is it running twice as slow
So，为什么它运⾏起来会慢两倍呢？
26:30 - 26:34
So we're gonna yak again,and look at the source code to say how is actually doing
addition
So，我们通过源码中来看下，它实际上是如何做加法的
26:34 - 26:37
You see it's not just,you know one instruction,you know number plus number
你们可以看到，这并不是⽤⼀条指令就能完成的，并不是1+1这么简单的事情
26.37-26.44
it's just giant switched a bunch of stuff to try to figure out,you know if it's negative or
non-negative it's zero or if they're equal to each other
它需要通过⼀系列switch条件才能完成，⽐如说，要判断它的正负，是不是0，或者两个数字是
否相等
26:44 - 26:45
Right,so what we're executing this
So，这就是我们要执⾏的东⻄
26.45-26.49
for every single time we compute those,you know number plus number
So，当我们每次计算这些，如数字加数字时
26:49 - 26:53
Whereas if it's a real is if it's a floating point number,it's one instruction on the CPU
如果它是Real或者是⼀个浮点数时，那么CPU只需要⼀条指令就能完成加法操作
26:53 - 26.58
So you know we don't have the source code for SQL server an Oracle,
So，你们知道，我们并没有SQL server和Oracle的源码
26.58-27.01
But I guarantee they're doing something something similar roughly
但粗略的来讲，它们所做的事情都⼤差不差
27:03 -- 27:04
Okay,so is this clear
Ok，你们懂了吗？
27.04-27.09
okay,so if we don't want to lose data due to imprecision
Ok，如果我们不想因为精度问题⽽丢失数据
27:09 - 27:10
We use a fixed point decimal
那我们就使⽤Fixed point decimal
27.10-27.13
But this is something we have to implement in our database system for us
但我们需要在我们的数据库系统中实现这个
27:15 - 27:22
Okay,so now we will talk about what happens when the value of the trying to store is too
large and doesn't fit in a single page
Ok，So现在我们要来讨论，当我们想要保存的东⻄因为体积太⼤⽽⽆法放在⼀个单个page上时
所发⽣的情况
27:22 - 27:25
There's two ways to do this
有两种⽅法可以解决
27:25 -27:27
So in general as I said last time
So，⼀般来讲，正如我上次所说
27.27-27.32
the size of a page is going to be fixed throughout the entire table mostly throughout the
entire database
⼤多数情况下，在整个表中或者是整个数据库中，⼀个page的体积是固定的
27:32 - 27:37
This is something you set when you turn the system all and you say,I want to have you
know 4KB pages or 8KB pages
这是你在使⽤系统时所设置的，⽐如说，你想要将page设置为4kb或者8kb⼤⼩
27:38 - 27:43
DB2 allows you to play around with the page size per buffer pool,but in general for let's
assume that's the case
DB2允许我们去设置page⼤⼩以及buffer池⼤⼩，但⼤体来说，我们以这种情况为例
27:43 - 27:47
So now what do we do if the thing we're trying to store doesn't fit in a single page
So，现在我们的要做的事是，如果我们所要保存的东⻄没办法保存在⼀个单个page下的话
27:48 - 27:52
Right, well an obvious thing to do is have what's called an overflow page
我们可以通过overflow page来解决这个问题
27:52 - 27:57
So basically in our tuple， let's say this value this attribute C here doesn't fit in the page
So，假设在我们的tuple中，属性c的值⽆法放在这个page中
27:57 - 28:03
So we'll just have a pointer now to some other overflow page that'll have the data that
we want
So，现在我们通过⼀个指针来指向保存了我们想要数据的那个overflow page
28:04 - 28:12
So this could just be another record ID like a page number and an offset to tell us where
to find this particular data that we need
So，这就像是另⼀个record id，通过page number和slot id来告诉我们该去哪⾥找到我们需要
的那个数据
28:12 - 28:14
So then if we now have a query
如果我们现在有⼀个查询
28.14-28.18
and we need this attribute or value as part of the output
我们想要将这个属性或者值作为我们输出的⼀部分
28.18-28.22
we'd have to follow this pointer and go bring that page and copy the data out and
produces an output
我们就必须根据这个指针，找到这个page，从它上⾯把数据拷⻉下来，并⽣成⼀个输出结果
28:22 - 28:26
Now this data isn't fit in this page by itself too
现在，这条数据也没法放在这个page内
28.26-28.30
You can have another,you know overflow page pointer to some other thing out you know
some other page and
我们可以通过overflow page指针来指向某些其他东⻄，例如，某些其他page
28.30-28.34
We just you know chain them all together to produce the output that we're looking for
我们可以将它们链接在⼀起，以此来⽣成我们想要的输出结果
28:34- 28:37
So different database systems have different names for this
So，不同的数据库系统对此有不同的命名
28.37-28.39
In PostgreSQL is called TOAST
在PostgreSQL中，它被称为TOAST
28.39-8.42
in SQL server and MySQL called overflow pages
在SQL server和MySQL中则称为overflow pages
28:42 - 28:47
And they have different specifications that when they would actually use something like
this
当它们像这样在实际使⽤的时候，它们有不同的specification（规格）
28:47 - 28:51
So in PostgreSQL if the value trying to store is larger than 2KB
So，在PostgreSQL中，如果我们要试着保存的值的⼤⼩⼤于2kb
28.51-28.54
then it always goes to this other thing
那么它就会始终将这个数据存放到其他地⽅
28:54 - 29:00
In SQL server, it's just tuple doesn't fit in the page, it pulls it out and put them to another
page
在SQL server中，如果tuple没法放在⼀个page内，它就会将这个tuple拿出来，并将它放在另⼀
个page中
29:00 - 29:02
And MySQL is half the page
在MySQL中是tuple的体积⼤于该page的⼀半
29:04 - 29:08
So the reason why you'd want to do something like this
为什么我们想这么做的原因是
29:08 - 29:14
It is because you get all the protections you normally would get,when these overflow
pages with your regular data
因为当这些overflow pages中包含了你的常规数据，那么针对这些数据，你要得到常规下所有
你应该具备的保护措施（知秋注：正常情况下，overflow pages你⽆法通过常规⼿段进⾏操作
的，也就是会有麻烦，所以，要尽量避免）
29.14-29.17
meaning if I'm writing to this overflow page and I crash and come back
这意味着，如果我在写⼊这个overflow page时，系统崩溃了，接着恢复后
29.17-29.18
I don't I don't want to lose anything
我不想失去任何数据
29:20 - 29:26
Right, there's all the optimizations,you can do with the overflow pages that aren't easy to
do in the regular slot pages as well
Right, 如果你要做到与常规的slot pages⼀样的话，你可以对overflow pages进⾏各种各样的优
化，但这些优化都很不容易做到
29.26-29.32
like in PostgreSQL for example, since most of the time these overflow pages are readonly or read mostly
例如，在PostgreSQL中，⼤部分时候，这些overflow page是只读或者⼏乎都⽤来读，很少往
上⾯写东⻄
29:32 - 29:34
You know think of like a Wikipedia，
拿维基百科为例
29.34-29.38
You update you know an article or update an entry, but most the time people just
reading it
你可以去更新⼀篇⽂章或者⼀个条⽬，但⼤部分时候，⼈们对它只进⾏读操作
29:39 - 29:43
So therefore I could just compress this, when I put out the disk for keeping in memory
So，因此当我将它从磁盘中取出，并在存⼊内存时，可以将它进⾏压缩
29.43-29.46
And because the most time I'm never gonna have to decompress it to update it
因为⼤部分时候，我都⽆须将它解压，并对它进⾏更新
29:47 - 29:55
So the most of optimizations like that,and they all come under the same protections as
you normally would with regular data pages or regular tuple pages
So，⼤部分像这样的优化，它们都受到与常规data page或者tuple page⼀样的保护
29:56 - 30:01
Another alternative instead of storing it directly inside the database is the use what's
called external storage
除了将数据直接保存在数据库中，还有另⼀种⽅案可以使⽤，它被称作外部存储
30:01 - 30:08
And the basic idea here is that, we're not actually gonna store the data for this particular
attribute in the tuple itself
其基本思路就是，我们实际上不会将该属性的数据保存在tuple内部
30:08 - 30:19
We're just gonna store a pointer,or a file path to somewhere in on the local disk,or a
network storage,or some external storage device where this this data can be found
⽽是往⾥⾯保存⼀个指针或者是⼀个⽂件路径，它们指向能找到该数据的本地磁盘，或者⽹络存
储，亦或是某些外部存储设备
30:20 - 30:22
Right,so in this case here going from C
So，在这个例⼦中，我们以c为例
30.2230.24
this could be a file path on the local disk
它⾥⾯存放的可以是本地磁盘上的⼀个⽂件路径
30.24-30.28
So say you know here's where to find this particular attribute if you ever need it
即当你需要该数据的时候，你可以根据这个属性来找到这个数据
30:29 - 30:35
Right,so in the systems that do support this like Oracle and DB2 and Microsoft
So，有些系统对此进⾏了⽀持，例如，Oracle，DB2，以及微软
30:35 - 30:39
You can't actually modify what's in this file
实际上你⽆法修改该⽂件中的内容
30:40 -30:42
Right, you can read it,but you can't manipulate it right
你可以读取数据，但你⽆法操作数据
30.42-30.45
yes
请问
30:46 - 30:57
Students:(提问)
30:57 - 31:03
So his great question is or statement is for the overflow page disk is brought into
memory,just like a regular tuple page
So，他的问题很好，对于overflow page来说，磁盘将它放⼊内存，就像是对⼀个普通tuple
page所做的操作⼀样
31:03 -31:04
Correct,
没错
31.04-31.07
in the case of these external files where do these things reside
在这个外部⽂件的例⼦中，这些就是数据所存放的地⽅
31:07 - 31:13
So if you run a query like select star run this tuple here
So，如果你执⾏⼀个查询时，就像此处select *
31.13-31.18
and sees in this external file,if I need to produce it as an output, I gotta go read it in
如果我需要将它作为输出结果，那我就得去这些外部⽂件中查找并读取这些数据
31:19 - 31:23
So it could page it in just like another another tuple or other tuple pages
So，它可能放在另⼀个tuple中或者其他tuple page中
31:23 -31.28
It could be ephemeral meaning like I'm gonna read it,and then immediately discard it
rather than polluting my cache
它可能很短暂，我的意思是，我得到这些数据后，⽴⻢就将它丢弃，⽽不是让它来污染我的缓存
31.28-31.30
there's a bunch of different ways to do this
我们可以通过⼀系列不同的⽅法来做到这点
31:30 - 31:34
But the key thing to think about is like
但我们所要考虑的关键事情是
31.34-31.41
if someone in now outside the database system modifies this file， will see that change
inside of our database any time we go to read it
如果有⼈现在在数据库系统之外对该⽂件进⾏修改，那么当我们任何时候从我们的数据库中读取
该⽂件的时候，我们就能看到其中的变化
31:41 - 31:45
Because there's outside the control or the protections of our database system
因为这点超出了我们数据库系统的控制范围或保护范围
31:46 - 31:52
All right,so everything I guess why do you want to do something like this
So，我们来猜⼀下为什么我们想要来做这样的事情
31.52-31.56
Well what's an example of a file maybe don't want to store in the database system
以⽂件来举例，为什么我们不想将它保存在我们的数据库系统中
31:59 - 32:00
Say you're building website right
假设，你在构建⽹站
32.00-32.01
and you have you have a bunch of video files
你有⼀⼤堆视频⽂件
32:03 - 32:06
you have a tuple that says, you know this person uploaded this video
你有这样⼀条tuple，上⾯保存了有⼈上传视频的记录
32:06 - 32:08
You don't store the video in the database itself
你不会将视频保存在数据库⾥⾯
32.08-32.10
because that could be you know gigabytes
因为视频⽂件可能有数GB⼤⼩
32:10 - 32:13
I said it's very common to see that and those kind of things
对于视频⽂件来说，这种体积很常⻅
32:15 - 32:25
Right,the the application frameworks like Django,Node.js and things like that they have
you know built-in ways to store data outside the database system for images and other
things
注：Django是一个开放源代码的Web应用框架，由Python写成
某些应⽤框架，例如Djang，Node.js之类的框架，它们⾥⾯有些内置的⽅式，可以将数据保存
在数据库系统之外，其中也包括了图⽚或者其他东⻄
32:27 - 32:40
So there's there's no sort of set in stone rule to say ,how big a file should be you know
to put it out as an external file versus keeping it an overflow page
So，我们并没有什么固定的规则，不管是多⼤的⽂件，都可以放在外部⽂件中，⽽不是将它放
在 overflow page中
32:40 - 32:44
I'll say also to for the overflow pages, this is transparent to you as the application
对于overflow page来说，它对于你是透明的，你看不⻅它
32:44 - 32:46
So you don't know that you've gone to an overflow page
So，你不会知道你已经使⽤了overflow page
32:46 -32:55 ****
Right,you can go do what we did before,and look at the actual layout of in low-level
information about where our data is actually stored
你们可以执行之前的操作，并查看有关数据实际存储位置的底层信息的实际布局
32.55-32.58
like we did with the CTID and Postgres and the other Systems
就像我们之前在PostgreSQL以及其他系统中看过的ctid
32:58 - 33:02
But most applications don't know don't care that's stored in an overflow page
但⼤部分应⽤程序不知道，也不关⼼这些是否保存在⼀个overflow page中
33.02-33.03
like I just wanted to get my data out
我们想做的只是拿到我们的数据
33:03 - 33:09
For this thing again,you depending on how you actually how actually implemented it
对于这种东⻄来说，它取决于你实际是如何实现它的
33.09-33.10
You could go through the database system
你可以通过数据库来进⾏
33.10-33.14
Or you could just jump to the file and go get it directly if you wanted to
或者如果你想的话，你可以（根据数据库中存的地址）跳到这个⽂件，并直接拿到它的数据
33:14 - 33:22
So the there was a paper written almost 10 years ago over 10 years ago
So，这⾥有⼀份⼗年前的论⽂
33:22 - 33:25
By some famous database people at Microsoft
它是由许多在微软⼯作的数据库专家所撰写的
33.25-33.29
name of the article was To BLOB or Not To BLOB
这篇论⽂的标题是To BLOB or Not To BLOB
33.29-33.31
blob is a binary large object
BLOB的意思是⼆进制⼤型对象
33.31-33.34
just it's a variable length binary data
它是可变⻓度的⼆进制数据
33:34 - 33:42
And they basically found back in the 2000s,that anything below 256KB you want to store
as an overflow page
这可以追溯到2000年代，任何⼩于256kb的东⻄，我们会想将它保存在⼀个overflow page上
33.42-33.47
Anything larger than that you want to store in the,you know an external file storage
任何⼤于256kb的，我们就会想将它保存在外部⽂件中
33:47 - 33:53
We had the guy that mented SQLite come to CMU a few years ago came give a talk here
之前有个⼈是做SQLite相关⼯作的，他⼏年前来到CMU，并进⾏了⼀场讲座
33:53 - 33.57
And he said that for a lot of cell phone applications
他表示对于许多⼿机应⽤来说
33.57-34.04
It`s actually better off to store the the thumbnails from images even up to 1MB inside the
database system
实际上最好将图像的缩略图存储在数据库系统中，某些图⽚的⼤⼩甚⾄有1MB
34:04 - 34:08
Because it would that was much faster to read those records from the database system
因为从数据库系统中读取这些记录要来得更快
34:08 - 34:10
Because they already had the file open
因为它们已经将⽂件打开
34.10-34.16
Rather than having to follow this pointer to the file system and then do the you do the
f.open to go get the data
这样就不⽤去根据指针在⽂件系统中查找⽂件，然后使⽤f.open来打开⽂件获取数据了
34:16 - 34:20
So again there's no hard and fast rule what to do
So，这⾥并没有什么硬性规则来让我们该怎么做
34:20 - 34:26
This is also more common when you know the database storage is super expensive
这种做法⾮常常⻅，你们知道数据库存储的代价是很⾼的
34:26 - 34:31
Right,if you really care about your data on your database ，you're gonna run out on
high-end hardware
如果你真的很想要你的数据存放于你的数据库中，你可以将它运⾏在⾼端硬件之上
34:31 - 34:38
And therefore storing like a bunch of video files in some really high-end enterprise disk
is probably not a good use of your money
因此，将⼀⼤堆视频⽂件保存在⾼端的企业磁盘上，这种做法可能就是在浪费你们的钱
34:38 - 34:42
So you can take this you know these files chuck it in HDFS or cheaper stores s3
So，你们可以将这些⽂件chuck（块），保存在HDFS或者使⽤更便宜的⽹络存储服务AWS的s3
上⾯
34.42-34.47
and then now the database system hasn't is not overburdened with trying to maintain
your files
那么，数据库系统就不会因为为了维护你的⽂件⽽负担过重了
34:49 -34:54
So again, it's not just performance reasons the other economical reasons why'd you
want to do something like this
这不仅是有性能上的考量，同时也有经济上的⼀些考量，使你想去做这些事情
34:54 - 34:58
But this paper I think summarizes a bunch of the issues that's why I like it
但这篇论⽂总结了这些问题，这就是我喜欢它的原因
34:58 - 35:01
So again, so any questions how about represent data
So，你们有⼈对如何表示数据有任何问题吗？
35:01 - 35:06
Most of the times you know for fixed length data it's just whatever the programming
environment gives us
在⼤部分时候，编程环境会提供给我们固定⻓度的数据（知秋注：⽐如Java中对int long的字节
⻓度的限定）
35.06-35.14
for anything that's variable Length,or if we want fixed point precision that stuff will help
implement ourselves
对于那些可变⻓度的数据或者固定精度
来帮助我们⾃⼰对那些可变⻓度的数据或者固定精度的东⻄进⾏实现
35:17 -35:24
Okay,so now let's talk about how we actually figure out what our tuples look like
Ok，So 现在我们来仔细看下我们的tuple是什么样的
35:24 - 35:26
So again this is what the system catalogs are for
这张幻灯⽚上所展示的是system catalog的⽤途
35.26-35.34
It's the metadata about the data metadata about the database,what comes I have
whether table names or indexes I have and so forth
它是关于数据库相关信息的元数据，它⾥⾯存放了表名，索引等等
35:34 -35:39
As well as some other things like,you know user permissions and security stuff which I
don't care about
当然也有其他⼀些东⻄，例如，⽤户权限，安全相关，这⽅⾯我并不太在意
35.39-35.42
and then this will come up later on when we talk about query optimization
这个我们会在谈论查询优化的时候会提到
35:42 - 35:46
But also internal statistics about what your data looks like
我们也会去讲有关你保存数据的内部数据统计
35.46-35.50
How many you know how many unique values do I have,what does the distribution of
those values look like
例如，⾥⾯有多少个唯⼀值，这些值的分布情况⼜是怎样的
35:51 -36:00
So pretty much every single database system is going to store their catalog inside itself
as just just another table
很多数据库系统都会将它们的Catalog⽤另⼀张表来保存
36:00 - 36:03
So like eating your own dog food,
So，吃⾃⼰的狗粮（就好⽐是软件公司⽤⾃家软件，这⾥是数据库⾃⼰来搞⼀张表来存这些，
这张表可以看作是狗粮，之前⽤来存数据信息的也是⼀张表，结合上⼀集所讲回顾）
36.03-36.06
so I'm gonna store all the metadata about my tables in just table themselves
So，我将这些关于我的表的所有元数据都存⼊这个表内
36:08 - 36:11
All right,and so inside the source code
So，在源码中
36.11-36.14
You obviously don't want to write SQL query to say,you know what's the name of this
table
很明显，你们不会想去写SQL来查询这张表的名字是什么
36.14-36.16
because it's chicken for the egg problem
因为这就是⼀个鸡⽣蛋，蛋⽣鸡这种问题（知秋注：是先有表定义元数据还是先有这张表）
36.16-36.20
like how do I do a SQL query on a table to find out the table name,if I need to know a
table name
⽐如说，如果我需要去知道⼀个表名，那我该如何为这张表写⼀个SQL查询语句来弄清楚这个表
名是什么
36:20 -36:32
Right,so you usually have like some,you know C++ code whatever your database system
is programmed in to wrap around the low-level access methods to go access the
catalog
So，不管你的数据库系统是⽤什么语⾔编写的，⾥⾯都会通过某种底层⽅法来访问catalog
36:33 - 36:41
So the most database system will expose the catalog through the standard
Information_schema API
So，⼤部分数据库系统会通过STANDARD INFORMATION_SCHEMA API把catalog暴露出来
36:41 - 36:48
So in the 1980s,all these different database systems,all had their own way of
saying,here's my catalog here so,here's how to access it
So，在1980年代，所有不同的数据库系统都有它们⾃⼰的catalog，以及它们⾃⼰访问catalog
的⽅式
36:48 - 36:50
And that became a real pain in the ass
这就像痔疮那么难受
36.50-36.53
now if you want to take your application and port it to there from one database system
to another
如果你想将你的应⽤程序从⼀个数据库迁移到另⼀个数据库
36:52 - 36:57
Because now all the catalog stuff is different and you got to rewrite all your code again
因为所有的catalog都不⼀样，你就不得不去重写你的代码
36:57 - 37:01
So in the ANSI standard and I think also in the SQL standard by now
So，在ANSI标准以及SQL标准中
37:01 - 37:04
They'd specify this thing called the information_schema
它们定义了⼀种称为INFORMATION_SCHEMA的东⻄
37.04-37.06
that that every database system has to support to
每个数据库系统都必须⽀持它
37.06-39.09
say,here's the the metadata that about my tables
这样它们就可以说，这是关于我的表的元数据
37:11 - 37:14
But we'll see in a second they always exposed the same information in these tables
但我们稍后就会看到，它们始终在这些表中暴露出相同的信息
37:15 - 37:21
All the database system was all gonna have their own what sort of shortcut ways to go
get this information as well
所有的数据库系统都有它们⾃⼰的快捷⽅式来拿到这些信息
37:23 - 37:27
So for example say,if you want to get the all the tables we have
⽐如说，如果你想获得我们所拥有的所有表
37:27 - 37:34
So the SQL standard would say,you write it with this information_schema dot tables
which is just a view on top of the real catalog
So，使⽤SQL标准的话，你可以这样（information_schema.tables）来写，以此来获得数据库
所有表信息，它其实就是catalog的顶层视图
37.34-37.37
and you give it the catalog name,right or the database name
你将catalog名或者数据库名给它就能获得这些信息
37:37 - 37:38
In Postgres you use \d;
在PostgreSQL中，我们使⽤\d;
37.38-37.40
and MySQL you show tables;
在MySQL中，我们使⽤SHOW TABLES;
37.40-37.42
SQLits tables;
在SQLite中，我们使⽤.tables;
37:42 - 37:44
And then again all the data systems all have their own shortcuts
再说⼀遍，所有的数据库系统都有它们⾃⼰的快捷⽅式来获取这些信息
37.44-37.50
and essentially what they're doing underneath the covers is converting this command
into something like this
本质上来讲，它们内部所做的就是将这种命令转换为图上这段SQL语句
37:52 - 37:54
Same thing now if I want to get this schema for a table
如果我想得到某张表的schema，那原理也是⼀样的
37:55 - 37.58
So again this is how we do it in the ANSI standard
So，这是我们在ANSI标准下如何获取SCHEMA的⽅法
37.58-38.03
,and then the various systems all have their own own way of doing this
不同的系统有它们⾃⼰的⽅式来做到这点
38:03 - 38:06
So I want to go a quick demo of Postgres and MySQL
So，我想通过PostgreSQL和MySQL来快速演示下
38:09 - 38:11
Again just to show you what's actually going on
这⾥只是为你演示下实际发⽣了什么
38:28 - 38:35
All right,so it's again Postgres if I do \d,I get the list of all my tables
So，在PostgreSQL中，如果我使⽤'\d'，我就能得到我所有表的列表
38:35 - 38:38
I can do \d plus and get more information
使⽤'\d+’，我就能得到更多信息
38:37 - 38:40
And then if I pick a table
接着，如果我后⾯再跟⼀个表名
38.40-38.43
it'll tell me what you know what the metadata looks like
它就会告诉我这张表内的元数据是什么样的
38:44 - 38:46
So here's all the columns that I have
So，这⾥是表中的所有的列
38.46-38.47
here's the types I have
这⾥是表中的类型
3847-38.49
something now when I run my query
现在，当我执⾏我的查询时
38:48 - 38:53
I look at this information say all right,at the first attribute is an integer I asking me 32 bits
从这上⾯的信息中，我可以看到，第⼀个属性的类型是Integer，它的⻓度是32位
38.53-38.55
the next attribute is also an integer that's gonna be 32 bits
下⼀个属性的类型也是Integer，⻓度也是32位
38:55 - 39:08
And then I have code inside to say all right,if I'm operating ones tuple what is the
schema I know how to again do the conversion of the raw bytes of the byte array for
that tuple,and put it to the form that it expect
然后，我⾥⾯（DBMS）有对应的代码，通过使⽤schema将该tuple的字节数组的原始字节转换
为我们想要的形式
39:09 - 39:15
All right, so let me see,if I can do this for MySQL,I think I just destroyed MySQL
So，让我来看下MySQL，我好像把这⾥的MySQL窗⼝弄炸了
39:21 - 39:24
Let me do this on a another Machine
我换台机器来操作
39:24- 39:35
So, I can say show tables and tells me tables I have
这⾥我输⼊了show tables;，告诉我当前数据库下我拥有的表
39:35 - 39:40
I can say show databases same thing
我再输⼊下show databases;
39.40-39.42
here's all the different different databases they have
这⾥所展示的就是它⾥⾯的所有不同数据库
39:44 - 39:49
And then for a given table, I can say describe knobs
对于⼀个给定的表，我可以使⽤describe命令，来查看它的schema
39:50 - 39:56
Right,and I'll just say again same information,here's the name of the field,here's the type
and then some extra metadata
这⾥可以看到，我们得到了⼀样的信息，这⾥⾯有字段名，类型，以及某些额外元数据
39:56 - 39.59
So this is MySQL 5.7,
So，这是MySQL 5.7
39.59-40.06
the newer version actually stores the tables in the catalog itself service the catalog and
the tables itself
在新版本中，实际上就可以通过catalog⾃身来存储表信息，并服务catalog和表⾃身（知秋注：
类似Postgres中那样）
40:06 - 40:09
In this version here they didn't do that,、
在5.7这个版本中，它们并没有这么做
40.09-40.15
all they would do for the catalog is just read the directory of where the the database is
stored
他们为catalog所做的就是读取数据库的存储⽬录
40.15-40.20
and use that to figure out what databases are there,and what what tables are there
通过这个⽬录来弄清楚数据库在哪，那⾥有哪些数据库
40:20 - 40:26 *****
And so we can actually break it or fake it out by putting things that shouldn't be there in
that directory
So，我们实际上可以通过将不该存在的内容放到该目录中来破解或伪造它
04-03
40:26 - 40:29
All right,so if you go back here,let's split it
So，如果你回到这⾥，让我先分个屏
40:32 - 40:33
So do show databases;
So，这⾥我们输⼊show databases;
40.33-40.37
and it thinks I thinks I have a bunch of these here
这样我就得到了⼀系列信息
40:37 - 40:40
Right,so now if I go back to this machine
So，现在如果我回到这台机器上
40.40-40.44
login as root
切换为root⽤户
40.44-40.51
go into where MySQL stores its data live MySQL
进⼊MySQL保存数据的⽬录
40:51 -40:58
Right,and roughly you see that there's a bunch of,you know there's a bunch of
directories here for the databases that it knows about
⼤致看⼀下，这⾥有⼀⼤堆数据库⽂件⽬录
40:58 - 41:01
But the database is called tests,there's a directory called test
注：⼀个数据库对应⼀个⽂件夹
有⼀个叫做test数据库，它的⽬录也叫test
41:01 - 41:04
So what happens if I call now mkdir xxx
So，如果我输⼊mkdir xxx，此时会发⽣什么呢
41:06 - 41:08
Well,I want to go back up here
Well，我先回到此处并输⼊show databases;
41.08-41.11
MySQL thinks there's a directory called xxx
MySQL会觉得这⾥有个叫xxx的⽬录
41:11 - 41:18
So so this is a good example of where if we rely on things X terms of the database
system,we can't fully control that
So，这就是⼀个很好的例⼦，这说明了如果我们依赖于数据库系统的某些东⻄，我们没办法完
全控制它
41:20 - 41:24 ！！！！！！！！！！！！
So MySQL can't prevent anybody from going to that directory,and putting better at once
in there
So，MySQL⽆法阻⽌任何⼈跑去那个⽬录并放些东⻄在这个⽬录下
41:25 - 41:29
But if it's but it's relying on that to figure out what's in my database
但它依赖于这点，以此来弄清楚我的数据库中有哪些东⻄
41:29 - 41:33
So from an implementation standpoint，it might be easier
So，从实现的⻆度出发，这可能会更容易
41:33 - 41:36
But from a correctness standpoint that's problematic
但从正确性的⻆度来看，这就很成问题了
41:36 - 41:40
They may say who's gonna be stupid enough to go create directories to screw around
with MySQL
有⼈可能会讲，谁会蠢到跑去MySQL的⽬录下创建⽬录，把MySQL弄得⼀团糟呢
41:40 - 41:43
Well what about other things like I'm writing the files
Well，我们再来看些其他事，⽐如我正在对⼀些⽂件进⾏写操作 （知秋注：通过⽇志保护）
41.43-41.47
then you know that I don't have the regular protection I would for my regular data
我并没有对我的普通数据进⾏常规保护
41.47-41.50
because I'm logging things correctly
因为我对这些东⻄正确地记录了⽇志
41:50 - 41:52
Right,we want to put as much as possible inside the database system
我们可以尽可能多的将我们想要的东⻄放到数据库系统⾥⾯
41.52-41.56****
because then we can rely on that to perform correctly for us
因为这样我们可以依靠它（日志来）为我们正确执行
41:56 - 41.57
Okay
41.57-41.59
all right
41.59-42.08
so that's it that's all we really need a cover for catalogs,this semester
So，这学期我们会去介绍catalog
42.08-42.14
just be aware that there's something that inside the database system keep track what
our schema looks like
要注意下，在数据库内部有某个东⻄，
通过关注数据库中的这个东⻄，可以⽤它来跟踪查看我们的schema是什么样⼦
42:14 - 42:22
And that's we're gonna use that when we ask you queries,use that when we build
indexes to determine, you know what should we actually be doing
当我们去查询以及构建索引时，会⽤到它，并决定我们应该怎么做
42:22 - 42:30
And the way to think about this in different types is that in the,and there's easiest way to
implement this
可以思考下它（知秋注：schema中定义的各种不同类型）之于这些（知秋注：查询和构建索
引），可以有很简单的⽅式来实现这些（知秋注：查询和构建索引）
42.30-42.36
and you'll see this in the Bushub code that you guys work on,when you look at the type
system it's me a giant switch statement
你们会在Bushub的代码中看到这个，当你们看到类型系统那部分时，它其实就是⼀个庞⼤的
switch语句
42:36 - 42:39
Right,if the type is integer do this if the type is to float do that
如果类型是integer，那就这样做。如果是float，那就那样做 （知秋注：要知道，每条表中数据
都对应磁盘的⼀个sloted-page，按照数据排列，每个数据多⼤字节，就都能计算，通过相应类
型的offset就可以解读所有数据）
42:40 - 42:43
And so you're doing that for every single tuple,and that's actually gonna be really slow,
So，如果你对每个单个tuple做这样的操作，那实际上就会很慢
42.43-42.47
because they're actually interpreting you know what the layout should be
因为它们实际上在解释这些数据的布局该是什么样⼦的（参考上⼀条知秋注）
42:47 - 42:56
And in the more advanced systems,you can actually compile or do code generation to
compile on the fly like just-in-time compilation in the JVM to actually compile those
operations
在更⾼级的系统中，实际上你可以在运⾏时进⾏编译或者是代码⽣成，⽐如说通过JVM中的
JIT(Just-in-time)编译来对这些操作进⾏编译
42:56 - 42:59
So that you don't have to do that interpretation every single time
这样你就⽆须每次都要进⾏这种解释操作了
42:59 - 43:00
MySQL doesn't do that
MySQL并没有这样做
43.00-43.01
new versions Postgres does that
新版PostgreSQL则是采⽤了这种做法
43.01-43.06
but Oracle and SQL server should do that as well,all the major commercial systems do
that
但Oracle和SQL server也应该使⽤了这种做法，所有的主流商⽤系统都应该⽤了
43:06 - 43:08
That's not something we're to cover in this class
在这⻔课中，我们并不会对此专⻔介绍
43.08-43.12
but when we cover a query execution， I'll bring that up to say,this is a way to write to
make this run faster
但当我们介绍查询执⾏时，我会对此提⼀下，这是⼀种能够让我们的查询速度更快的⽅式
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
43:14 - 43:20
All right,so the next thing we'll talk about is this for storage models
So，接下来我们要讲的东⻄是存储模型
43:20 - 43:31
It`s the first thing if they realize that we'd covered in the first lecture,is that the the
relational model doesn't say anything about how we actually want to store data
有个东⻄我们在第⼀节课的时候就提到过，它就是关系模型。它并没有说明我们实际该如何去存
储数据
43:31 - 43:35
Doesn't know about types, doesn't know about you know byte up byte arrays and so
forth
它也没有提到类型、字节数组、等等之类的东⻄
43:36 - 43:45
And it doesn't necessarily even say, that we have to store all the attributes of a tuple
together either in memory or on disk
它甚⾄⽆需去说，我们必须将⼀个tuple所有的属性保存在内存或者磁盘中
43:45 - 43:46
Right
43.46-43.56
and so again anytime we you know so far in the class when we visualize databases now
I'm saying ,here's the row here's all the attributes for it,right for a tuple
到⽬前为⽌，在课堂上当我们可视化数据库时，我会说，这是⾏(row)，这是某个tuple(也可以是
某⾏)的所有属性
43:56 - 43:59
But that's not that may not be the best way to do that for some workloads
但对于某些workload来说，这可能并不是最好的处理⽅式
44:01 - 44:03
So let's look at a really simple database example here
So，此处我们来看⼀个⾮常简单的数据库案例
44:03 - 44:07
Right, this is actually derived from the MediaWiki software that runs Wikipedia
这实际上是运⾏Wikipedia的MediaWiki软件所派⽣出的产物
44.07-44.10
like, if you go look at look at their source code,it's all PHP with MySQL
如果你去看下它们的源码，它全是由php写的，数据库使⽤的是MySQL
44.10-44.14
you look at the DDL file,the SQL file it'll look roughly like this
如果你去看下DDL⽂件，或者是SQL⽂件，粗略来看它就⻓图上这样
44:14 - 44:17
So we have three tables,we have user account pages and revisions
So，我们有三张表，useract、pages以及revisions
44:18 - 44:23
And so the revisions table is where we're going to store all the new updates for every
single article
So，在revisions表中，我们要保存的是每篇⽂章的新更新记录
44:23 - 44:27 ****
So it's a kind of a foreign key reference to the user that created that made the change
此处的userID是对那些创建更改的⽤户的外键引⽤
44:27 - 44:30
And then a page ID that corresponds to the article or the page
接着这⾥的pageID对应的是pages表中的pageID
44:30 - 44:34
And this guy then also has a foreign key reference to say
这⾥也是⼀个外键引⽤
44.34-44.37
here's the latest revision for this particular page
表示，这是该page的最新版本
44:37 - 44:40
So you don't to do a scan you just can jump in directly to it
So，你⽆须进⾏扫描，你可以直接跳到这⾥拿到数据
44:40 - 44:43
Again this is a certain approximation a cleaned up version of what Wikipedia actually
does
这实际上是Wikipedia的⼀个简化版本
44.43-44.46
but for our purposes in this lecture here it's fine
但对于我们这堂课的⽬的⽽⾔，它够⽤了
44:48 - 44.54
So there's two sort of general class of workloads we're gonna care about in database
Systems
So，在我们的数据库系统中，我们所关⼼的workload有两类
44.54-45.00
you know they're certainly not the only ones as machine learning and streaming stuff,but
for now is this focus on just two
对于机器学习和流式处理来说，它们所要关⼼的可能不⽌这两种，但对于我们来说，⽬前关⼼
这两种就⾜够了
45:01 - 45:05
So the first is called online transaction processing or OLTP
So，第⼀类被称为联机事务处理，简称为OLTP
45.05-45.07
who here has ever heard that term before OLTP
在座的有谁之前听过OLTP？
45:08 - 45:09
few,okay good
看起来知道的⼈并不多，Ok
45:09 - 45:17
So this is usually what you're gonna get end up with this type of application any single
time you you know building a new application
So，这通常是你在构建⼀个新应⽤程序时就会遇到它
45:18 - 45:23
Right,and if I'm building a new website,I'm building a new iPhone app or whatever,you're
typically gonna building one of these
如果我去构建⼀个新⽹站，或者iPhone app程序或者其他之类的东⻄，总之你们通常会去构建
其中某⼀种程序
45:24 - 45:28
And so for a transaction OLTP On-line Transaction Processing
So，对于OLTP来说
45:28 - 45:34
The idea is that this is where we're getting new information,we're ingesting new data
from the outside world and putting it to our database system
它的思路是，我们从外⾯的世界拿到新数据后，将它们放⼊我们的数据库系统
45:35 - 45:37
Right,so these queries can be really simple
So，这些查询真的⾮常简单
45.37-45.41
they're only gonna read a small amount of data or update a small amount of data
它们只会去读取⼀⼩部分数据或者更新⼀⼩部分数据
45.41-45.44
every do be doing those same operations over and over again
不断地去重复进⾏相同的操作
45:44 - 45:48
So the example,I always like to give is it's like the Amazon storefront
So，我通常⽐较喜欢给出的例⼦就是Amazon的storefront
45:49 - 45:53
All right,the website you go to when you buy stuff, that's considered OLTP to the
application
当你在⽹站上买东⻄的时候，你们就可以把它当做是对应⽤程序的OLTP(联机事务处理)
45:53 - 45:58
Because I'm adding stuff to my cart,I'm making purchases,I'm updating my account
information
因为我往我的购物⻋⾥⾯添加商品，然后结账，接着更新我的账户信息
45:58 - 46:03
I'm,you know for each of those single operations，they're doing a lot of them, because I
have a lot of people buying stuff
它们会处理⼤量的这种操作，因为购物⽹站通常会有很多⼈去买东⻄
46:03 - 46:06
But for you as just you as one customer
但作为⼀名顾客来说
46.06-46.07
you're not updating a lot of data
你不会去更新太多数据
46.07-46.11
you know you're updating,your account information,you're updating things are your
shopping cart
你更新的是你的账户信息，以及你的购物⻋信息
46:11 - 46:17
So the queries that are running are only doing a small,you know the only, you know
accessing the small portion of the database
这些查询所做的只是更新很⼩⼀部分数据，或者访问数据库中很⼩⼀部分信息
46:19 - 46:23 ！！！！！！！
So then I said the type of queries you would see again going back to the ppt example
So，接着回到幻灯⽚上这个例⼦
46:23 - 46:27
So here's go get the,here's ago get the current revision for given page
So，通过这个SQL可以拿到给定的page当前的revision
46.27-46.32
here update my user account to say, that when I logged in
中间这段SQL表示的是，当我登录了我的账号后，更新我的账号登录信息
46.32-46.35
and here's here's a you know simple insert query to insert a new revision
最下⾯这段SQL就很简单了，它表示的是在revision表中插⼊⼀个新的记录
46:36 - 46:43
Right,each of those the these things are accessing a small number smaller number tuples
at a time
这些操作每次都会访问⼩部分tuple
46.41-46.43
and we're but we're doing these things over and over again
但我们会去不断地重复做这些事情
46:45 - 46:49
So now the other type of workload is called OLAP or On-line Analytical Processing
So，另⼀种workload被称为联机分析处理OLAP
46:49 - 46:53
And this is when you've already collected a bunch of data from your OLTP application
当你们已经从OLTP应⽤程序中收集到⼀⼤堆数据时
46.53-46.57
and now you want to analyze it,and extrapolate new information from it
现在，你们想去分析它，并从中推断出新的信息
46:57 - 47:09
Right,this is sometimes called you know not only say data science,but that realm of like
taking a bunch of data you have and trying to derive new information from it
这种东⻄有时被称为数据科学，即从你拥有的数据中试着派⽣出新的信息
47:09 - 47:12
Students:(提问)
47:12 - 47:12
What that?
你说啥？
47.12-47.21
yeah I mean,it's in the name on-line analytic processing,a business intelligence there's
another phrase for this
对，它的名字是叫做联机分析处理，商务智能是对它的另⼀种解释
47.21-47.23
decision support is another one
同样，决策⽀持也是它的别名
47.23-47.24
big data if you want to call it that
如果你们想将它称为⼤数据，那也没问题
47:24 -47:30
Right,again I've in this workload in this environment were not updating data
在这种环境下，我们不会去更新数据
47:31 - 47:36
Right, there's a whole tree saw it's getting that new information for us,and now we're
trying to make sense of it
它所做的就是给我们提供新的信息，我们就会试着让这些信息变得有意义
47:37 - 47:40
So a query might be on a Wikipedia example
我们以Wikipedia中的查询为例
47.40-47.48
say you want to count the number of people that have Login per month that where their
hostname and what ended with %.gov
假设，我们想去统计每个⽉的主机名以.gov结尾的⽤户登录数量
47:48 - 48:00
There was a scandal a few years ago,where they found members of Congress were
painting or having their employees go to Wikipedia and scrub them clean to remove all
like,you know whatever scandals the congressman was involved in
在⼏年前有这么⼀段丑闻，他们发现有国会成员想让他们的员⼯去删掉Wikipedia上那些涉及国
会成员的相关⽂章
48:00 - 48:00
Right
48.00-48.05
So you want to figure out all the people that are logging in from from sitting at the at the
government doing this
So，我们想去弄清楚有多少在政府⼯作的⼈想要来做这种事情
48:06 - 48:09
So these types of queries are gonna be read-only
So，这种类型的查询就是只读的
48:09 - 48:14
They're gonna read a lot of data like,I'm gonna scan the entire table
它们会去读取⼤量的数据，⽐如说，我会去扫描整张表
48:14 -48:19
Right,as opposed to OLTP where I'm updating one thing,I'm gonna just do a lot of joins
与在OLTP(联机事务处理)中，我只会去更新⼀个东⻄相⽐，⽽对于（OLAP）这种情况，我要去
做⼤量的join
48:19 - 48:22
Right,I know it's me you you you you usually don't see a lot of joins
我知道，通常情况下，你们不会看到许多join
48:23 - 48:41
So one way to get to grossly characterize these workloads is that one acts as you say
how complex are the queries are they're really simple,
So，我们可以通过⼀种⽅式来粗略的表达这些workload的操作复杂度，⽐如说，这些查询有多
复杂，或者有多简单
48.35-48.41
like they're you know you're only accessing a simgle table,or are they doing complex
joins,and then what are their write heavy or read heavy
⽐如，在你访问单个表时，是否存在很多join操作，你的查询是侧⽤于写还是侧重于读
就好⽐，你知道它们只是访问了以简单的表，或者他们在做复杂join操作，然后去看它们写的量
或读的量
48:41 - 48:43
So OLTP would be down on this
So，在这张图上，OLTP是在最下⾯的
48.43-48.48
this and the spectrum,they're pretty simple queries and but they're doing a lot of writes
从图上可以知道，OLTP擅⻓简单的查询，但是会做⼤量的写⼊操作
48:48 - 48:51
OLAP would be doing a lot of reads,but they're more complex
OLAP则会读取⼤量的数据，并且它们在操作上更加复杂
OLAP则会做⼤量的读操作，但它们会更复杂
48:51 - 48:55
And then this sort of this new class of workload called H tab or hyper transaction
analytical processing
图上还有⼀种新的workload，它被称为混合事务分析处理HTAP
48.55-48.58
that's sort of is trying to do both of them
它会试着将OLTP和OLAP的事情⼀起做了
48:58 - 49:02
Right,you still want to ingest new data,but you want to analyze it as it comes in
即你依然想要提取数据，并且当拿到数据时，你想对它进⾏分析
49:02 - 49:11
Now you see this a lot in,anybody wants to do decision-making on the fly,you know as
people are browsing websites,you see this a lot in like internet advertising companies
你们会有很多⼈想⽴即做出决策，⽐如在访问⽹站时，你们会看到很多这⽅⾯的应⽤（查询分析
推荐），这种在⽹络⼴告商公司中使⽤⽐较多
49:12 - 49:17
So now given that we know about these different Workloads
So，根据给出的信息，我们已经对这些不同的workload有所了解了
49.17-49.23
now we can talk about what is the right storage model to support these workloads more
efficiently
现在，我们可以来讨论什么样的存储模型才能更有效地⽀持这些workload
49:25 - 49:30
So again the relational model doesn't say anything about the layout
So，再说⼀遍，关系模型并没有说明有关布局的任何东⻄
49:30 - 49:33
But we can be mindful of this，when we decide how we want to build our data system
当我们在决定如何构建我们的数据库系统时，要记住这⼀点
49.33-49.33
Yes
请问
49:34 - 49:46
Students:(提问)
这段跳过不⽤算在时间内
49:46 - 49:52
okay,so this question is what is the relation of OLAP to NoSQL or NewSQL systems
Ok，So 他的问题是OLAP和NoSQL或NewSQL系统间的关系是什么？
49:52 - 49:59
So I would say,so then wonder what NoSQL is who here doesn't know what NoSQL
So，我想先问下，在座的有谁知道NoSQL是什么，有⼈不知道NoSQL的吗？
50:00 - 50:04
Ok,so and most we haven't heard of NoSQL or NewSQL
Ok，看起来⼤部分⼈都没听过NoSQL或者说NewSQL
50:04 - 50:07
So these are workload types
So，图上的这些是workload的类型
50:07 - 50:14
So and what you're describing NewSQL versus NoSQL those are sort of system
categories
你们所描述的NoSQl和NewSQL，它们指代的是DBMS系统类别
50:15 - 50:20
So the other question is we know what is MongoDB for what,you know what is the
NoSQL good for
So，另⼀个问题则是，MongoDB是⽤来⼲啥的吗，NoSQL⽐较适⽤于做什么？
50:20 - 50:29
So that the traditional NoSQL Systems,MongoDB,Cassandra,Redis they would be at this
end of the spectrum,they're about ingesting new data
对于传统的NoSQL系统，MongoDB、Cassandra以及Redis来说，它们应该是属于靠近图中最
底层的部分（即OLTP）那块，我们主要往它们⾥⾯塞⼊新数据
50:30 - 50:34
Right, Mongo has some support to do some Analytics
在某些分析⽅⾯，MongoDB对此做了部分⽀持
50.34-50.39
but when we talk about the the column store stuff，there not a column store
当我们讨论列存储时，虽然这⾥并没有列存储
50:39 - 50:42
They're gonna get crushed by any you know column store database
它们会被你知道的任何列存储数据库所⼲掉
50:42 - 50:45
So you wouldn't want to do hardcore analytics on a MongoDB
So，你们不会想在MongoDB上⼲些硬核的分析
50.45-50.46
you can will support some queries to do this
你们可以通过⽀持某些查询来做到这点
50:46 - 50:51
MySQL PostgreSQL support some queries that that would fall under the OLAP category
MySQL和PostgreSQL⽀持⼀些属于OLAP类别的查询
50:51 - 50:55
But they're not going to be as efficient as as running on a column store system
但⽐起列存储数据库来说，它们就没有那么⾼效了
50:56 - 51:03
So NoSQL basically there was this movement in the in the late 2000
基本上来讲，NoSQL是在2000年末的时候出现的
51.03-51.10
where all these companies are basically saying look Google made it make is making a
ton of money
有很多公司，⽐如⾕歌就为此投⼊了⼤量的资⾦
51:10- 51:16
And they put out this system called HBase or BigTable,and this thing called Hadoop
他们推出了名为HBase的系统以及BigTable和Hadoop
51:16 - 51:20
And they're not doing SQL,they're not doing transactions,they're not doing joins
他们并不去执⾏SQL，也不会进⾏事务处理，更不会进⾏Join操作
51.20-51.21
and that's how they able to scale
这就是它们能扩展的原因
51:22 - 51:25
So all these people ended up building these NoSQL systems like Mongo and Cassandra
So，最终这些⼈构建出了NoSQL数据库系统，例如，MongoDB和Cassandra
51.25-51.36
that sort of fall dunder you know to try to follow those EDX design patterns and to
support, you know sort of modern,you know software 2.0 or web 2.0 Applications
它们都试着遵循某种设计模式，以此来⽀持现代的软件2.0或者Web 2.0应⽤程序
51:36 - 51:39
Right,but they would follow on fall under this
它们会去遵循这张图上的内容
51:39 - 51:41
Hadoop is OLAP
Hadoop具备在线分析处理的能⼒(OLAP)
51.41-51.46
but like BigTable, Cassandra, MongoDB and those guys are over here
但像BigTable，Cassandra，MongoDB以及其他⼀些数据库具备的则是OLTP联机事务处理的
能⼒
51:46 - 51:53
Then what happened is people realize,oh well I actually do want transactions,I do want
SQL,I do want to do some joins
然后，⼈们意识到他们想要处理事务的能⼒，想要SQL，也想去进⾏某些Join操作
51:53 - 51:55
And that's where the NewSQL movement came along
So，NewSQL因此应运⽽⽣
51.55-51.57
and this is what I was working on when I was in grad school
这就是我在我读研究⽣时所做的各种
51:57 - 52:00
And actually if you go read the Wikipedia article for a NewSQL
实际上，如果你们去读下Wikipedia上关于NewSQL那部分内容
52.00-52.04
he talked about my system was the first one of the one of the first NewSQL systems
它上⾯提到的第⼀个NewSQL系统，其实是我开发的（H-Store）
52:05 - 52:08
Right,and this is because I wrote the NewSQL article Wikipedia,so I could say whatever I
wanted
其实这是因为是这个Wikipedia上的⽂章是我写的，所以我可以为所欲为
52:09 - 52:10
Students :(哈~哈~哈~)
52:11 - 52:21
But the idea was they were trying to do,you know they're trying to do fast transaction
processing and OLTP without giving up transactions,or giving up joins the way the
NoSQL guys did
但他们所想实现的想法是，他们想试着在不放弃事务下，拥有快速处理事务的能⼒和OLTP，或
者像NoSQL那群⼈那样放弃Join
52:21 - 52:32
Now there's other NoSQL systems you could say or like,you know again the there's a
bunch of systems out there that don't do relational model that you want do analytic so
on
当然也有⼀些其他的NoSQL系统，这些系统不使⽤关系模型，所以你想要对其进⾏OLAP分析
52:32 - 52:34
But primarily most people think of it thinking of these guys down here
但绝⼤多数⼈的想法⾥，这些数据库是处于下⾯这个位置的（OLTP那个圈圈⾥）
52:37 - 52:44
I would say that the claim NoSQL they you know first they're like,oh we're not gonna do
SQL SQL stupid
搞NoSQL的那批⼈⼀开始表示，我们不会去使⽤SQL，SQL太垃圾了
52.44-52.48
and then it came out everybody,but Mongo now supports some variant of SQL
除了MongoDB⽀持某些SQL的变体，其他的系统都不⽀持SQL
52:48 -52:51
So then they said oh NoSQL overly me is not only SQL
因此，他们⼜改⼝说NoSQL的意思是不⽌于SQL
52:51 - 52:54
Students :(哈~哈~哈~)
52:54 - 53:00
But and some of them actually are starting at transactions like MongoDB has support for
a full fledge distribute transactions
但它们有些系统开始⽀持事务，⽐如MongoDB就⽀持功能完整的分布式事务
53:00 -53:06
So all the things they claimed that were a bad idea,you know ten years ago turns out it is
a good idea
事实证明，过去这帮⼈所认为的糟糕想法，⼗年后，⼈们都觉得这些才是好的想法
53:06 -53:10
SQL not gonna die anytime soon,people have tried to replace it
SQL并不会很快消失，虽然⼈们已经在试着取代它了
53:10 - 53:16
Right, they've been people are thought with a bad idea in the 1970s 80s 90s and
2000's,it always comes back
⼈们在1970年代，1980年代，1990年代以及2000年代都觉得SQL是⼀种糟糕的东⻄，但它⼀
直没有退出历史舞台
53:17 -53:23
Right,it's what people want,it's not the grim I like it,because you know this is what I
would I grew up with
因为它是⼈们想要的东⻄。我喜欢它是因为它是伴随我⻓⼤的东⻄
53:23 - 53:26
But there's certainly ways to improvements people try to do this
但⼈们确实试着通过某些⽅式来对它进⾏改进
53:26 - 53:35
But it's a core idea of declarative language on top of your data is I think this is even one
of the major contributions of Ted Codd's work in the 1970s
但我认为声明式语⾔的核⼼思想最主要的贡献还是来源于Ted Cood在1970年代所发表的那篇论
⽂
53:38 -53:41
Yeah,I did that there's a long soliloquy does that answer your question
好了，我⾃⾔⾃语了这么久，不知道是否回答了你的问题
53:41 - 53:45
Okay,we can talk offline about if you want my opinion of other systems
Ok，如果你想知道我对其他系统的观点，我们可以线下讨论
53:46 -53:49
okay,okay everything we talked about so far
Ok，到⽬前为⽌我们讨论的所有东⻄
53.49-53.54
when we took when we show rows and tuples sorry Tuples like this is why I'd want to
use a turn row,
当我们展示tuple时，我总是想⽤⾏的形式展示
53:52 - 53:56
because when we talk about a column store，it doesn't make any sense
因为当我们讨论列存储的时候，这没有任何意义
53:57 - 53:59
But every time I showed a tuple,I showed it as a row
但每次我向你们展示的tuple的时候，我都是将它以⾏的形式展示
54:00 - 54:02
Right,and this is called the N-ARY storage model
这被称为N-ary存储模型
54:04 -54:10
And so basically idea here is that we take all the attributes for a single tuple,and we
store them continuously in our pages
So，这⾥的基本思路是，我们将单个tuple中的所有属性取出，并将它们连续地存储在我们的
page中
54:10 - 54:16
Now again we can have the overflow pages ,you know for large larger objects
对于体积较⼤的对象，我们可以使⽤overflow page
54.16-54.18
but in general it's all going to be aligned together
但⼀般来讲，它们需要被对⻬
54:19 - 54:22
Right,so this is going to be an idea for OLTP
So，这是关于OLTP的⼀个想法
54.22-54.29 ？？？？？？？？？？？？？
because began the amount of data we're going to access is gonna be small in these old
speed queries
因为我们要去访问的数据量在粒度上要⾜够的⼩（知秋注：⼀次取⼀⾏数据，然后这⼀⾏数据会
按定义连续存储，所以可以将之看为⼀整块，简称粒度）
54:29 - 54:34
And it's gonna be accessing for single entities,go get my account information,go get my
orders
这样就能去访问单个实体，并拿到我的账户信息，我的订单信息
54.34-54.38
and I want all the data for that you know you know for my account
这样就能拿到有关我账号的所有信息
54:39 - 54:42
I don't care about all the other you know millions of customers, I did want my information
我并不关⼼其他⼏百万客户的信息，我只想要我的信息
54:42 -54:44
So if a rows， that's actually really efficient
如果它是⼀⾏数据，那实际上就会⾮常⾼效
54.44-54.48
because I just jump to the one page that has my data I get it and I'm done
因为我只需跳到那个page，找到那个数据，就完事了
54:50 -54:51
All right,so let's see what this looks like
So，我们来看下它是怎么样的
54:51 - 54:53
So again using the Wikipedia example
So，我们再以Wikipedia为例
54:53 - 54.55
So say this is a single page
So，假设我们有⼀个page
54.55-55.00
so we have a header,I can assume this is in the slotted page format
So，我们有⼀个header，这⾥我假设我们使⽤的是slotted page的格式
55:00 - 55:05
We have our header,and then we have the userID, userName, userPass, hostname,
lastLogin again
我们有header，接着userID，userName，userPass，hostname以及lastLogin
55:05 -55:11
And so only after that we have the,you know last attribute for our tuple
只要当我们拿到了我们tuple中的最后⼀个属性
55.11-55.13
then we have all the other tuple Data
那我们就拿到了该tuple的所有其他数据
55:13 -55:16
Right,everything is continuous to each other
所有东⻄都是连续排列的
55:16 - 55:19
So again,so now if I store this in my database
So，现在如果我想将这些保存进我的数据库
55.19-55.21
I can represent this in a single page
我可以⽤⼀个page来表示它
55:21 - 55:25
So now if I have a query that says, get all the account information for a given user name
and password
假设我要进⾏⼀次查询，我想根据给定的⽤户名和密码拿到所有的账号信息
55:27 -55:31
I can do a lookup and an index which we'll cover in in lecture seven
我可以根据索引来进⾏查找，关于索引，我会在第七节课的时候对它进⾏介绍
55:31 -55:36
But that's basically they tell me,hey here's the page ID and slot number that has the tuple
that you want
但基本上来讲，数据库会告诉我们，我们想要tuple所在的page id和slot number
55:36 - 55:39
I do one Seek,I do one reading fetch that page bring him to memory
我通过⼀次查找和读取，将该page放⼊内存中
55.39-55.42
and I can jump to exactly to the location that has the data that I want
然后我可以直接跳到我想要的那个数据所在的位置
55:43 -55:50
Right,so again although it's we workloads are gonna look a lot like this，go getting the
data for single entities or small number entities
我们的workload看起来就像图上这样，拿到单个或者多个实体的数据
55:50 -55:57
So having all the data for a tuple contiguously each other is the most efficient way to do
this
So，让⼀个tuple的所有数据连续地放在⼀起是读取数据时最有效的⽅式
55:58 -56:00
All right,same thing about one do an insert
对于插⼊操作也是同样如此
56.00-56.04
my insert query is gonna have all the data contiguous anyway
我在插⼊查询时需要将插⼊的数据连续地放在⼀起
56:04 -56:05
So I just find a free slot
So，我只需找到⼀个空闲slot
56.05-56.07
and there's write at all all at once
并将所有数据⼀次性写⼊
56.07-56.12
,and then flush this out,and it's one disk right，it going a log
接着将它刷⼊磁盘，并记录⽇志
56.12-56.12
Yes
请问
56:12 - 56:17
Students:(提问)
56:17 -56:22
So this question is for what purpose would be useful to segregate the data into pages
So，他的问题是，出于何种⽬的，将数据分离到多个page上是有好处的
56:22 - 56:27
Okay,so let's look at why this is the bad idea for some queries
Ok，So，让我们来看下为什么这样做对于某些查询来说是个糟糕的想法
56.27-56.28
and then we'll see why it's a good idea to segregate it
然后，我们再来看将数据分离为什么是个好的想法
56:29 - 56:32
Alright when we talk about the decomposition storage model the columns for stuff
当我们在讨论列式存储模型的时候会说这些
56:33 - 56:36
All right,so let's look at example where the row store is a bad idea
So，我们来看个例⼦，通过这个例⼦来明⽩为什么⾏存储是⼀个糟糕的想法
56:36 -56:38
So let's taking that query I showed in the beginning
So，我们来看下我⼀开始所展示的查询语句
56.38-56.44
where we want to get all the people from the government that are modifying Wikipedia
pages when they shouldn't
即我们想去获取所有想去修改Wikipedia⻚⾯的政府⼈员的信息
56:44 -56:47
So we break down this query,right we look at it
So，我们将这个查询分解开来看下
56:48 -56:50
We realize we're actually gonna need to touch all the Data
我们意识到，实际上我们需要去获取全部数据
56:50 -57:01
Right,because there's a full sequential scan across the user account table to find all the
people that you know look at all the user accounts look at their hostnames
因为我们要对整个⽤户账号表进⾏循序扫描，根据他们的hostname，以此来找到所有的政府⼈
员的账号
56.59-57.00
I assume we don't have an index
假设我们并不使⽤索引
57:01 -57:06
For OLAP，you usually don't have indexes for for these types of Queries
在OLAP的情况下，对于这种类型的查询，我们通常是没有索引的
57:06 -57:12
All right,so now if I go read say the first page I read is this one,again we're in a row store
here
So，现在如果我去读取第⼀个page上的这条数据，这⾥我们使⽤的是⾏存储
57:13 -57:21
So I look at my query,I want to first do a where clause is to look up the hostname,and try
to match up my pattern if it ends with %.gov
在我的查询语句中，可以看到，在where⼦句中要去找到所有hostname是以%.gov结尾的数据
57:21 - 57:24
So that means I basically just want you know these values here
So，基本上来讲，我就是只需要知道此处hostname字段下的值即可
57:24 - 57:31
So as I'm scanning along,I look at my catalog and says well,I know I have for this table,I
have five attributes
当我在扫描的时候，我看到在我的catalog⾥⾯，我知道这张表上有5个属性
57:31 -57:35
And you want the host name,so that's that this offset, so I go read them that I want
我们想要的是hostname，它在这个偏移量处，我找到这个偏移量所在的位置，并读取我想要的
数据
57:35 - 57:38
And then I get to the end,and I'll jump to the next one,and so forth
然后，当我读完时，我会跳到下⼀条数据所在的地⽅，以此类推
57:39 - 57:44
The other part of my query is that I have this group by where I want to aggregate them
together based on the login
在我的查询语句中，我还根据lastLogin这个字段进⾏分组，将这些数据聚合起来
57:45 -57:47
Because I want to get it per month
因为我想得到每个⽉的数据
57:48 - 57:51
And then all right,and then produced that as my final output
紧接着，我就能得到我最终的输出结果了
57.51-57.54
it's the count number of government employees that are logging in for each month
即每个⽉政府员⼯登录的次数
57:55 -58:01
So satisfy this part of the query,I only need this column here,this attribute just the last
login field
为了满⾜查询中这⼀部分，我仅需要最后⼀列的数据，即lastLogin字段下的数据
58:01 - 58:03
So what's the problem,
So，这⾥有什么问题呢？
58:03 - 58:08
Students:(提问)
58:08 - 58:08
what's that?
你说啥
58:08 - 58:11
Students:(重复⼀遍)
58:11 - 58:11
exactly
没错
58:11 -58:13
So so I had to read this whole entire page
So，我不得不去读取整个page
58.13-58.20
again, I can't and in memory,I said in non-volatile storage devices,it's a block based API
在⾮易失性存储设备中，它是⼀个基于阻塞的API
58:20 -58:26
So I can't just say just get me exactly these this data,I gotta go bring in the entire page
So，我没办法直接得到这些数据，我需要拿到整个page才⾏
58:26 - 58:32
So now you have all this these columns here that I'd never even access at all， in order
to execute this query
So，现在为了执⾏这条查询，我们就有了这些我们根本不会去访问的列
58:32 - 58:38
But I had to bring it into memory from disk to in order to get the two columns that I
actually needed
但为了得到我实际需要的两列，我不得不从磁盘中拿到它们并将它们放⼊内存中
58:40 -58:45
So doing analytics on a row store is is gonna be painful if you have a lot of data
如果你有⼤量的数据，那么在对⾏存储的数据进⾏分析时会很痛苦
58:45 - 58:48
Right,my example here I have six pages who cares
在我的例⼦中，我只有6个page，没⼈会去在意这点东⻄
58:48 - 58:51
But if I have you know petabyte data
但如果我有PB级数据的话
58.51-58.57
in this case here three out of the five columns that I'm bringing in I'm bringing in is
useless for the particular query
在这个例⼦中，在我要放⼊内存中的数据中，5列⾥⾯有3列对于这个查询来说是没有⽤的
58:57 - 59:02
Then that's a bad idea,that's an inefficient use of the Hardware
那么这就是⼀个糟糕的想法了，它浪费了硬件的性能
59:02 -59:13
So again the N-ARY storage model,the row storage model, is we really fast or any
inserts,or updates,or deletes,when we're accessing the entire tuple
在N-ARY存储模型，也就是⾏存储模型中，当我们访问整个tuple的时候，插⼊，更新以及删除
数据时的速度很快
59:14 -59:18
All right,we want all the attributes for a single tuple and is usually just a small number of
tuples at a time
因为我们想⼀次获取单个tuple的全部属性，通常情况下是获取多个tuple的全部属性（知秋注：
通常我们执⾏的是⼀个任务集）
59:18 -59:24
But if you have to do analytical queries,and the OLAP workloads， we want to scan large
portions at the table then this is gonna Suck
但如果我们要进⾏⼀些分析型的查询以及做些OLAP⼯作，并且我们想要去扫描整张表⼤部分的
内容时，这种就会变得很操蛋了
59:24 -59:29
Because we're gonna bring a bunch of data in that we don't may not actually need for
our query
因为我们需要往内存⾥⾯塞⼀⼤堆数据，但对于我们的查询来说，很多数据是我们不需要的
59:30 -59:32
So now it should be a sort of obvious
So，现在你们应该对此有所明⽩了
59.32-59.34
that this is where the column stuff comes in
这就是为什么会有列存储的原因了
59.34-59.40
where instead of storing the all the attributes for a single tuple together in a single page
我们并不会将单个tuple的全部属性放在单个page上
59:40 -59:46
We're actually going to store all the values for a single attribute across all tuples in a
single page
实际上，我们会将横跨所有tuple中单个属性的所有值保存在单个page上
59:46 -59:52
I sort it's in this is where the column name is we're just storing all the columns together
continuously
这其实是我们将该列名对应的所有的列连续地保存在⼀起
59:52 - 59:54
Sorry all the values within a single column Continuously
是将单个列的所有值连续的保存在⼀起
59:55 -59.58
So this is me fantastic for our OLAP workloads
So，对于我们的OLAP(联机分析处理)来说简直是太棒了
59.58-1.00.06
where we're read-only and we only want to read up a subset of the attributes for a given
table
即我们只须读取给定表中部分属性的集合即可
04-04
01:00:06 - 01:00:09
Right,so again going back to our example here
So，回到我们这⾥的例⼦
01:00:09 - 01:00:11
So this is what it looks like as a row store
So，这⾥所展示的是⾏存储的样⼦
01:00:11 - 01:00:14
But so say now we just take every single column
但现在，我们将每个列拿出来
01:00:15 - 01:00:18
And we're going to split that up and now then within a single page
我们将它拆分开来，并放在单个page内
1.00.18-1.00.20
we have just the data for that column
我们只有该列的数据
01:00:21 - 01:00:22
So here's all the host names together
So，这就是所有hostname的数据了
1.00.22-1.00.26
and we had the same thing where user ID lastlogin and the other attributes for this table
here
当然，userID，lastLogin以及这张表上的其他属性也是以同样的⽅式进⾏保存的
01:00:27 - 01:00:28
alright so forth like that
以此类推
01:00:29 - 01:00:32
So now I come back to this query we had before
现在，我们来回看下我们之前这个查询语句
01:00:32 - 01:00:35
So the first thing I need to do is do my where clause on hostname
⾸先我需要做的事情就是对where⼦句中的hostname进⾏处理
01:00:36 - 01:00:42
So now I just need to know all I have to do is go bring in the hostname page wrong color
but ignore that
So，现在我需要做的就是拿到hostname所在的page，这⾥我颜⾊标错了，但不要在意
01:00:42 -01:00:50
I just bring the hostname page in,I can then rip through that quickly say look at every
single hostname and do my my predicates
我拿到hostname所在的page（并放⼊内存中），然后对每个hostname进⾏扫描以及条件判断
01:00:50 - 01:00:53
Now I have a bunch of tuples that matched
现在，我就得到了⼀系列匹配的tuple
01:00:53 - 01:00.58
So then I go back and bring in the bring in the lastLogin page,
接着，我将lastLogin所在的page放⼊内存
1.00.58-1.01.01
and just jump to the locations that I need within that
然后跳到这个page中我所需要数据的那个位置
1.01.01-1.01.05
and get the lastlogin information that I want to produce my answer
并拿到我想⽤来⽣成我答案的那个最后登录的信息
并拿到我想⽤来⽣成我答案的lastlogin信息
01:01:05 - 01:01:12
So say in a real simple case here that one lastlogin data is one page, the hostname is
another page
So，在这个简单的例⼦中，这⾥⽤了⼀个page专⻔放lastLogin的数据，另⼀个page⽤来专⻔
放hostname的数据
01:01:12 - 01:01:14
So before I had to scan all the pages
So，和之前我必须扫描所有pages相⽐
1.01.14-1.01.16
and this one I do only have to scan two
这个我只需要扫描两个pages即可
01:01:16 - 01:01:19
again think of in extremes if I'm talking about billions of pages
考虑下极端情况，如果我有数⼗亿个page
01:01:20 - 01:01:22
All right, then that's a big difference
那这就会有很⼤的不同
1.01.22-1.01.23
Yes
请问
01:01:23 - 1:01:27
Students:(提问)
1:01:27 - 01:01:29
So this question is are we storing the primary key with each columns
So，他的问题是我们是否会将主键和每个列⼀起保存
1.01.29-1.01.33
your real question is,how do I figure out I had the hostnames that match
你的问题是，我该如何弄清楚这些hostname所对应的是哪个tuple
1.01.33-1.01.37
how do I then go look up in the last login column and figure out how they match
当我在lastLogin列中查找时，该怎么让它们和tuple对应
01:01:37 - 01:01:41
Next slide,perfect ,and any questions
问的好，下⼀个，你们还有任何问题么
01:01:43 - 01:01:46
So the blows are other stuff we can do with this that we're not gonna cover in this class
So，我们还可以通过其他⽅法来做到这⼀点，但我们在堂课上并不会去介绍
01:01:46 - 01:01:52
But the most of other advantages you can get,and actually if you come to the vertica
talk in two weeks,Vertica is super famous for this
如果你们参加两周后由Vertica公司所举办的讲座，你们能够从他们的讲座中收获到很多，
Vertica公司在这⽅⾯绝对超级有名
01:01:53 - 01:02:04
So with the the row stored model, all the values within or the attributes within the
tuple,they're all you know roughly different domains
在⾏存储模型中，对于tuple内的所有属性，粗略的来讲，它们都有不同的领域（知秋注：每个
属性所占空间可能都不⼀样）
01:02:04 - 01:02:09
Right this is gonna be a username,this is gonna be hostnames,it's me lastLogin,we're
just gonna look a timestamp
⽐如说，这⾥是username，那⾥是hostname，这边是lastLogin，我可以在这⾥⾯看到时间戳
01:02:09 - 01:02:11
Right,it's all sort of jumbled together
它们都纠缠在⼀起，看起来杂乱⽆章（知秋注：所占空间每⼀块对于每⼀⾏数据来说往往都不均
匀，⼤⼩不⼀）
01:02:13 - 01:02:17
And so if I can then pack them all this data together that are the same column
So，如果我可以将同⼀列的数据都打包放在⼀起
01:02:17 - 01:02:20
Now that's one of compression techniques I can do
我可以通过⼀种压缩技术来做
01:02:21 - 01:02:24
Because I know they're gonna be all the the same type
因为我知道它们的类型都⼀模⼀样
01:02:24 - 01:02:30
Right, so let's say let's say that I'm storing temperatures of the room
假设，我们要去保存房间温度的数据
01:02:30 - 01:02:35
And you know it's it's 70 degrees now,maybe 70 point one,seven seventy point two,
⽐如说，70度，70.1度或者70.2度
1.02.35-1.02.36
like it's not gonna fluctuate that much
这些温度并没有太⼤波动
1.02.36-1.02.40
instead of storing that that's the full temperature every single time
这样我们⽆须每次都去保存完整的温度
01:02:40 - 01:02:45
What right is shorter a small Delta of of what the base temperature was when we first
started taking measurements
我们可以将我们第⼀次记录的温度作为标准，然后每次记录新的温度数据和该标准的差值即可
01:02:46 - 01:02:51
And now I don't need to store the entire value all over again,I just store you know that's
smaller representation
现在，我就⽆须去保存完整的值了，我只需要保存这些更⼩的值即可
01:02:52 - 01:02:57
I think I mean think of like you know if you run like gzip or snappy or whatever your
favorite compression algorithm is
你们可以去使⽤Gzip、Snappy或者其他你喜欢的压缩算法
01:02:57 - 01:03:01
You can't compress an mp3 really well,because there's already sort of compressed
你们⽆法去压缩⼀个mp3⽂件，因为它其实已经被压缩过了
01:03:01 - 01:03:02
But if it's a text file
但如果它是⼀个⽂本⽂件
1.03.02-1.03.05
that you can compress the hell out of that
那么你们就可以对其进⾏压缩
1.03.05-1.03.06
because there's gonna be a bunch of characters repeating over and over again
因为在这⾥⾯有⼤量重复的字符存在
01:03:07 - 01:03:11
So if you have repeated values in your attribute
如果在你们的属性中有重复的值存在
1.03.11-1.03.14
then you can compress the hell out of it and get much better performance
那么你们就可以将其压缩，以此获得更好的性能
01:03:15 - 01:03:16
So now when I go want to go to a read
So，现在当我想去进⾏读取时
1.03.16-1.03.23
again,with every page fetch instead of maybe getting a thousand tuples,I could get like
ten thousand tuples,because in compressed form
原本每个page上只能放1000个tuple，但因为现在进⾏了压缩，那么⼀个page上我可能放
10000个tuple
01:03:24 - 01:03:30
And some systems actually can operate directly on compressed data without you without
getting uncompressor which is the big win
实际上，在没有解压的情况下，某些系统可以直接对压缩数据进⾏操作，这是⼀种很⼤的优势
01:03:32 -01:03:34
Okay,we don't cover we're not gonna cover compression in this class
Ok，在这⻔课中，我们并不会去介绍压缩相关的东⻄
1.03.34-1.03.38
we spent a whole lecture in the advanced class, but I'm happy to talk about more about
it if you want
我们会在⾼级课程中花⼀整节课的时间去讲解这⽅⾯的内容，但如果你们想听的话，我也很乐意
去多谈论些这⽅⾯的事情
01:03:40 - 01:03:47
Okay,so now the his question is how do I figure out I had a match in one page,how do I
find a match in another page
Okay,他的问题是我该怎样从⼀个page中找到⼀个匹配项，怎样从另⼀个page中找到⼀个匹配
项
01:03:47 - 01:03:52
So in general there's two approaches,but everyone pretty much does the first one
So，通常情况下，我们有两种⽅案，但许多⼈都会选择第⼀种
01:03:53 -01:03:55
So the first choice is to have fixed-length offsets
So，第⼀种⽅案是使⽤固定⻓度的偏移值
01:03:56 - 01:04:03
So that means that for every single value in a column,it's always going to be a fixed
length
这就意味着，对于⼀列中的每个值来说，它们的⻓度始终是固定的
01:04:04 - 01:04:06
So again think simple a 32-bit integer
稍微思考下，假设是32位的integer
01:04:07 - 01:04:09
So all these are going to be each of these values to be 32 bits
So，这些数据的⻓度都是32位
01:04:10 - 01:04:11
So now if I have a match say
So，如果现在我要去进⾏匹配
1.04.11-1.04.15
in this column at offset 1
在这⼀列，
这⼀列在offset值为1的地⽅（开始）
1.04.15-1.04.18
and I'm again need to find the corresponding tuple in this column
我现在需要在这个列中找到对应的tuple
1.04.18-1.04.21
I know that say this comes also 32 bits
我知道这个值的⻓度也是32位
01:04:21 - 01:04:23
And I can just do a simple arithmetic and say
我可以进⾏⼀些简单的算术运算
1.04.23-1.04.27
I want offset 1 times the size of each attribute
我想让offset值为1处的东⻄乘以每个属性的容量？？？
我可以将offset 1*每⼀个属性的size
1.04.27-1.04.29
and then I know exactly where I need to jump to
然后我就知道我需要跳到的位置在哪了
1.04.29-1.04.35
or translate that to the row ID,or the the page number and slot number that has the data
that I'm looking for
或者将它翻译为row id，或者是page number和slot number这样的东⻄，这样我就知道我正在
寻找的数据在哪了
01:04:35 - 01:04:37
So that this is probably the most standard approach
So，这可能是最标准的⽅案
01:04:37 - 01:04:42
Of course now the tricky thing is say,well what if I have a bunch of strings that are varied
length field
当然，我们也会遇上些棘⼿的事情，那就是如果我有⼀⼤堆字符串，这些字符串的⻓度都是可变
的
01:04:42 - 01:04:48
Then you get into like alright can I compress it to a fixed length field or kind it's padded
outs as always fits in whatever the max size is
然后，你们可能会去想，我们能否将它压缩为⼀个固定⻓度的数据，或者是对字符串进⾏填充，
让它的⻓度变成我们所允许的最⼤⻓度
01:04:48 - 01:04:50
Different database systems do different things
不同的数据库系统做不同的事
1.04.50-1.04.53
but overall this is this is the most common approach
但总⽽⾔之，这是最常⻅的⽅法
01:04:54 - 01:05:01
The other approach which I forget there's like one system that does this which I think is
a bad idea,they might have gotten rid of it,but I forget who it is
此外还有另外⼀种⽅法，有某个系统使⽤了这种⽅法，虽然我忘了它的名字，但我觉得这是种糟
糕的想法，它们现在可能已经不⽤这种⽅法了
01:05:02 - 01:05:10
Where you actually store for each value in the column,you store a the primary key or an
identifier for it
在这种⽅法中，对于列中的每个值，我们会为每个值都保存⼀个主键或者是标识符
01:05:10 - 01:05:14
So then you say alright,I'm at it for the column one,I'm looking at tuple 1
然后，我们想在Column A中找到tuple 1
1.05.14-1.05.16
and I want to get to tuple 1 and column B
我想拿到Column B中的tuple 1
01:05:16 - 01:05:24
I have another map eagerly to do a lookup and say,how to go find the offset location for
that particular tuple in this column
根据这个列中的这个tuple，我该如何找到这个tuple所在的offset值
我有另⼀个map急需要去查找，我该如何找到这个列中指定tuple所在的offset位置（知秋注：你
要确定key和value两个⼀起的⼤⼩，然后再计算对应的offset值）
01:05:25 - 01:05:27
Of course obviously this has huge storage overhead
Of course，很明显我们能看出，这会造成⾮常⼤的存储开销
1.05.27-1.05.36
because you're storing this for there's you know this extra 32 bit or 64 that value or our
ID for every single value which is wasteful
因为我们得为每个值都得⽤额外的32位或者64位空间来保存它们的id，这就是种⾮常浪费的做
法了
01:05:37 - 01:05:40
All right,all right
1.05.40-1.05.47
so the advantages of the column store is that we can reduce amount of waste I/O for
these OLAP queries
列式存储的好处在于，当我们进⾏OLAP查询时，我们可以降低这种垃圾I/O的数量
1.05.47-1.05.50
because we're only reading the the bearment amount of data we actually need
因为我们只会去读取我们实际所需要的数据量
01:05:50 - 01:05:52
We're not bringing in things we're never gonna need it all
我们不会去读取哪些我们根本不需要的东⻄
01:05:54 - 01:05:55
Will get better compression
这样就能更好的压缩数据
1.05.55-1.05.59
will give it a bet better query processing which we will cover and a few more lectures
这样在查询处理上的性能就会更好，关于这点我们会多花⼏节课来介绍
01:05:59 - 01:06:02
Because we know we're operating on columnar data
因为我们是在列数据上进⾏操作的
01:06:04 - 01:06:09
The the downside is obviously that for anything that needs access a single tuple
这种做法的缺点也很明显，那就是在读取⼀个tuple的时候就很慢
01:06:09 - 01:06:11
It becomes more expensive
这种代价就变得很⾼
1.06.11-1.06.19
because now you essentially need to put together the the tuple from the different
columns back together, whereas in the row store it's all just in one location for you
因为你就必须得把不同列的数据拼在⼀起，这样你才能拿到⼀个完整的tuple，然⽽在⾏存储的
情况下，这些数据都是在⼀个tuple⾥，直接拿就⾏
01:06:20 - 01:06:24
And anytime you update or in sort of delete this, becomes more expensive, because
again,because it you get to split it all up
你在任何时候对tuple进⾏更新或者删除，代价也会更加⾼，因为你将列都分开了
01:06:25 - 01:06:29
So I would say that column stores are not a new idea
So，列式存储其实并不是什么新的想法
01:06:30 - 01:06:31
They go back to the 1970s
这得从1970年代说起
1.06.31-1.06.41
there was like the Swedish military division built this thing called Cantor which essentially
was ,they didn't call it a database system,because they used different language back
1970s
瑞⼠军⽅当时构建了⼀个叫做Cantor的系统，他们并没有将它称作数据库系统，因为在1970年
代时，他们使⽤了别的语⾔来编写的这个系统
01:06:41 - 01:06:46
But if you go sort of read between the lines it at his essence it is a column store
database System
但如果你们仔细看的话，它其实就是个列式存储数据库
01:06:46 - 01:06:51
It was never released never made public was this it was the only this internal project
它并没有被放出来，也并没有开源，因为它是⼀个内部项⽬
01:06:51 - 01:06:54
But that's the first known implementation of a column store
但它是第⼀个已知的列存储数据库的实现
01:06:55 - 01:07:00
The 1980s there was a paper that describes the decomposition storage model and more
for more details to say
在1980年代，有⼀篇论⽂提到了列存储模型，并且⾥⾯提到了更多的细节
1.07.00-1.07.05
you know what's the short format look like,what is the implications of having this storage
model
⽐如说，短格式（short format）的样⼦是什么样的，这种存储模型的意义是什么
01:07:06 - 01:07:12
The some of the probably most famous commercial implementation among the first
commercial implementations was this thing called SybaseIQ
注：Sybase IQ是Sybase公司推出的特别为数据仓库设计的关系型数据库，IQ的架构与大多数关系型数据库不同，特
别的设计用以支持大量并发用户的即时查询。
可能最著名也是第⼀个商⽤列存储数据库实现应该是Sybase IQ
01:07:12 - 01:07:22
It was an in-memory columnstore that Sybase released as an accelerator for their
regular row store database system, sort of have had have you actually worked at HTAP -
and in sync
这是⼀种内存型列存储数据库，Sybase将它作为他们普通的⾏存储数据库系统的加速器放出，
这样他们就可以进⾏HTAP(混合事务/分析)处理并且具备同步的能⼒
01:07:23 - 01:07:25
And there never really got big adoption
但它并没有⼴泛采⽤
1.07.25-1.07.30
because again it was sold as a add-on to the rows store database rather than a
standalone thing
因为它被当做⾏存储数据库的插件来卖，⽽不是作为⼀个独⽴的产品
01:07:30 - 01:07:33
But it was the 2000s when the column store stuff really took off
但到了2000年代，列存储数据库才真正起⻜
1.07.33-1.07.37
Vertica again was founded by Michael Stonebraker the guy admitted Postgres and
ingress
Vertica是由Michael Stonebraker所创⽴，他曾参与PostgreSQL和Ingress这些数据库的研发
01:07:37 - 01:07:44
That was his company that got bought by HP, VectorWise is a in-memory version of
MonetDB
注：MonetDB是一个开源的面向列的数据库管理系统。MonetDB被设计用来为较大规模数据（如几百万行和数百列
的数据库表）提供高性能查询的支持。
之后他的公司被HP收购了，VectorWise是MonetDB的内存版
01:07:44 - 01:07:48
MonetDB they out of Europe it's academic project ,but still around today
MonetDB以前是欧洲的⼀个学术项⽬，但现在到处都有在⽤它
01:07:48 - 01:07:52
I see he's asserted the first sort of columns store systems that were ever made in 2000's
它是在2000年代出现的第⼀个列存储数据库系统
01:07:52 - 01:07:58
But then it quickly became obvious that this is the right way to build data systems to for
analytics
但之后列存储很快就变得⾮常出名，因为这是构建⽤于数据分析型数据库系统的正确⽅式
01:07:58 - 01:08:02
So pretty much everyone now has their own column store system
So很多公司现在都有了他们⾃⼰的列存储系统
01:08:03 - 01:08:06
And actually I wanted to give a demo of Vertica today, I couldn't get it running
实际上今天我想给你们演示下Vertica，但我没法运⾏它
01:08:06 - 01:08:12
I did get the MonetDB column store working,and stephannie column store doesn't mean
it's actually good
不过MonetDB还是可以运⾏的，但使⽤列存储不代表实际上它就很好
01:08:13 - 01:08:16
So there's a bunch of stuff we'll cover as we go along for query optimization in query
execution
但随着我们介绍查询执⾏中的查询优化时，我们会介绍很多这⽅⾯的内容
1.08.16-1.08.19
just because your columns or doesn't mean you're magically gonna go faster
列存储并不会让你执⾏起来变得更快
01:08:20 - 01:08:25
I was actually able to get Postgres to be the column store for analytical queries
实际上，我能够让PostgreSQL在做分析型查询时使⽤列存储进⾏
01:08:25 - 01:08:32
Because you know of how you actually queries,how you actually look at the data and
what the query plan looks like
因为你们知道，我们实际如何进⾏查询，如何查看这些数据，以及这些查询计划看起来是什么样
的
01:08:32 - 01:08:35
So the bunch of stuff we have to do it that we'll cover throughout the semester
So，这⾥⾯我们需要做的事情有很多，我会在这个学期中向你们介绍
1.08.35-1.08.40
that you have to that you want to do if,you know dirt if you're a column store that not
everyone does
如果你们想做列存储的话，那你们可能做，但不是所有⼈都必须做的
01:08:40 - 01:08:43
Okay, so any question about column stores
Ok，你们有⼈对列存储还有问题吗？
01:08:43 - 01:08:46
So if you go off and leave graduate from CMU
So，如果你们从CMU毕业了
1.08.46-1.08.51
and you want to do analytics and some was like let's do it on post grass, but it's a row
store， don't do that
你们想去做分析类的⼯作，某些⼈可能会想去使⽤PostgreSQL去做，但它是⾏存储型数据库，
请不要去霍霍它
01:08:51 -01:08.57
Right,there's enough columns store systems that are out there that will they do you want
to look at
明明有那么多我们可以使⽤的列存储数据库系统在那⾥
1.08.57-1.08.58
they're not cheap though
尽管它们并不便宜
1.08..58-1.08.59
at least for the commercial ones
⾄少对于商⽤系统来说是这样的
1.08.59-1.09.01
but there's some decent open-source ones
但当然这些数据库系统也有些是正经开源的
01:09:02 --1.09.04
Okay all right cool
1.09.04-1.09.10
so the the main takeaways from this is that as we show
因此，我们的主要收获是，正如我们所展示的那样
1.09.10-1.09.20
the underlying representation of the storage of the database is not something we can
just sort of put in our storage manager and not expose to any other part of the system
对于数据库存储的底层表示并不是那种我们可以放⼊存储管理器中的东⻄，并且不暴露给系统的
任何其他部分
01:09:21 - 01:09:24
As we go out the rest of the semester, you'll see that a lot of times
在我们剩下的学期中，你们会经常看到这个
01:09:24 - 01:09:26
I'll say like Alright,this is the way to do it if you're a row store
我会说，如果你们使⽤的是⾏存储，那么就使⽤OLTP
1.09.26-1.09.29
this is the way to do it if you‘re column store
如果你们使⽤的是列存储，那就使⽤OLAP
01:09:29 - 01:09:34
And that's because again we if we know the data system knows more about what it's
actually doing what what the data looks like,
因为如果数据库系统知道它实际要做什么，数据看起来是什么样的
1.09.34-1.09.40
it's gonna make better decisions and better design choices and in order to get ,you know
more efficient execution
数据库系统就会去做出更好的判断以及更好的设计选择，以便于能够更有效的执⾏查询
01:09:41 - 01:09:44
The other thing to also remember to basically for OLTP
我们要记住的另⼀个东⻄就是OLTP
01:09:44 - 01:09:46
You want to use a row store 。for OLAP,you want to use a column store
在OLTP中，我们会想去使⽤⾏存储。然⽽在OLAP中，我们会想去使⽤列存储
01:09:46 -01:09:53
But these this simple rule will carry you out through the rest your life and make your life
easier
这些简单的规则会伴你⼀⽣，并且让你的职业⽣涯更加轻松
01:09:53 - 01:10:01
Alright,so now the last two classes we covered the this problem here how to actually
represent the data in the database
在前两节课中，我们讨论了这个问题，即如何在数据库中表示数据
01:10:01 - 01:10:10
So now on starting on Wednesday, we'll talk about what do we add we actually bring the
data in ,and bring them to memory and manage that
接着在周三，讨论了如何将数据放⼊内存，并对它们进⾏管理
1.10.10-1.10.10
yes
请问
01:10:11 - 01:10:13
Students:(提问)
01:10:13 - 01:10:15
This question is there any good reason to do a mix of the two
他的问题是，有没有很好的理由来将两者混合在⼀起
01:10:15 - 01:10:19
So we actually built our database system that did a mix of the two
实际上在构建我们的数据库系统时（知秋注：这个课上cmu所开发的这个数据库），确实将它们
两个混合在了⼀起
01:10:20 - 01:10:23
We threw that away and started over,because it's a bad idea
后⾯，我们将这种想法抛弃，并从头开始，因为它是个糟糕的想法
1.10.23-1.10.24
it was too much engineering overhead
它在⼯程上消耗太多时间了
01:10:24 - 01:10:33
There are some database systems will give you both they'll expose like some MySQL for
example you can say ,create this table in it and it's a row store or create this other table
on its a column store
有些系统会向我们提供这两种。例如，在MySQL中，我们在创建表时可以告诉它⽤⾏存储，创
建另⼀张表时告诉它使⽤列存储
01:10:34 - 01:10:39
And they have essentially two separate storage managers,two separate execution
engines to operate on them
本质上来讲，它们有两种独⽴的存储管理器，以及两种独⽴的执⾏引擎来对它们进⾏处理
01:10:40 - 01:10:44
So those are sort of called hybrid storage systems hybrid databases systems
So，这种系统被称为混合存储系统，或者说混合数据库系统
01:10:45 - 01:10:48
We were all in I thought that was a good idea, I think it's a bad idea now
有⼈觉得这是种好想法，也有⼈觉得这种想法很糟糕
01:10:51 - 01:10:56
For in-memory we actually can do,we think we can do fast enough transactions on a
column store
对于内存型数据库，我认为我们在列存储上能够⾜够快的执⾏事务处理
1.10.56-1.10.57
for disk it's a little more complicated
对于磁盘来说，就要稍微复杂点了
01:10:59 -01:11:06
So there are systems that do both they're not they didn't really take off as much
虽然有些数据库对于OLTP和OLAP都⽀持，但真正⽜逼⻜起的没⼏个
01:11:06 -01:11:07
So usually you see things like
So，通常你们会看到这样的东⻄
1.11.07-1.11.10
you could have a single interface
你们有⼀个简单的接⼝
1.11.10-1.11.16
where they have you write one query and then underneath it covers it figures out what
you want to go the row store column store aside
当你写了⼀个查询时，在它内部它会去弄清楚你想⽤的是⾏存储还是列存储
01:11:17 - 01:11:18
There's ways to do that
有多种⽅式可以做到这点
1.11.18-1.11.24
but having a single server for architecture that can manage both I think is rough
但单引擎架构很难同时做到这两点
01:11:24 - 01:11:26
Students:(提问)
01:11:27- 01:11:32
He says why don't we store two copies of the same data ,great think of it extremes my
database is one petabyte
他想问的是，为什么我们不将同⼀份数据保存两份，问得好，我们考虑下极端情况，假设我的数
据库数据有1PB
01:11:34 - 01:11:39
So well I'm slides ready ,but like I can easily find
虽然我的幻灯⽚已经放完了，但是我还是能很轻松的回答你的问题
01:11:39 - 01:11:41
But I can cover this next class
但我可以在下节课讲这个
1.11.41-1.11.49
but basically with what people do is you have your front end OLTP systems and that's
running MySQL ,MongoDB or whatever you want
但基本上来讲，⼈们在前端OLTP系统中所运⾏的是MySQL、MongoDB或者其他你们想⽤的数
据库系统
01:11:49 - 01:11:53
And then you stream the data out over time to a back-end data warehouse
接着，你把你的数据传输给后端数据仓库
01:11:53 - 01:12:01
And then you basically can prune out the latest data on the old data on the OLTP side
when you know you don't need it anymore
然后你基本上就可以将OLTP 这块的⽼的数据给修剪掉了，当它们不再被需要的时候
01:12:01 - 01:12:03
So you see this in like eBay ,
So，你可以在eBay之类的⽹站上看到这个
01:12:03 - 01:12:07
eBay only retains the last 90 days of auctions
eBay只保留最近90天的拍卖
1.12.07-1.12.08
and after that，they print it out
在此之后，它们将它打印出来
1.12.08-1.12.12
and that's because they want to keep the OLTP side nice and trim and fast
之所以这么做是因为它们希望保持OLTP这边运⾏⾜够好，减少不必要的数据可以运⾏更快
01:12:12 - 01:12:17
But then they still retain everything else in the backend data warehouse would they do all
the analytics to figure out what people are buying what when what they're doing
但之后，他们依然将所有数据保存在数据仓库内，这样他们能够对这些数据进⾏分析，并弄清楚
⼈们买了些什么，以及⼈们做了什么
01:12:18 -01:12:20
that's the standard setup everyone does
这是所有⼈所做的标准设置
01:12:21 - 01:12:27
Right, and whether or not that's like you Know MySQL plus vertical like two separate
database installations
⽐如，我们可以通过MySQL+Vertica这两个独⽴的数据库来做到
1.12.27-1.12.33
or whether it's a single hybrid database like splice machine can do this or MySQL could
do this
或者使⽤单个混合型数据库，Splice machine可以做，MySQL也能做
01:12:33 - 01:12:37
Depends on what you want,you know how much money you have what you're willing to
do
这就取决于你有多少钱，你想要做什么了
01:12:37 - 01:12:49
I think that what we found for our own system is that building having a super single
Storage Manager try to manage both of these things was a bad idea among other things
我觉得如果我们要来构建⼀个试着管理这两种东⻄的单存储管理器，这会是⼀个很糟糕的想法
01:12:51 - 01:12:56
Okay, someone brought up testing last time and I really want to spend time to talk about
that
Ok，上次有⼈提到了测试这⽅⾯的事情，我也真的很想花时间来谈论这个
01:12:56 - 01:12:58
But I wouldn't have any time today
但我今天确实没什么时间了
01:12:58 - 01:13:03
But again next class we'll start talking on the buffer pool and hopefully,we talk about
testing a little bit at the end okay
但下节课，我们会去讨论buffer池，希望我们在那节课末尾时有时间来谈论点测试⽅⾯的事情
01:13:03 - 01:13:06
And the other questions hit it
这句不要了