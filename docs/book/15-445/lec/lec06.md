06-01
06 Hash Tables
(CMU Databases Systems _ Fall 2019)
00:16 - 00:17
Alright, let's get started
好了，让我们开始吧
00:18 - 00:21
Okay, let's uh again give it up for DJ Drop Tables
Ok，让我们把时间交给我们的DJ Drop Tables
00:22 - 00:24
Thanks boys, how was your weekend
你周末过得怎样
00:25 - 00:29
Good you know I was recruiting what TLC, but I don`t have a DJ jobs
还⾏吧，我最近被TLC雇佣了，但我⼲的并不是DJ的⼯作
00:29 - 00:30
Don`t have a DJ jobs
没能拿到DJ⼯作么
0.30-0.31
that's hard right
这太难了，对吧
0.31-0.36
actually I found out Salesforce has in the lobby, in the main building San Francisco
实际上，我知道SalesForce在旧⾦⼭的主楼的⼤堂⾥⾯
00:36 - 00:38
They have a DJ every morning
每天都会有⼀个DJ在那
0.38-0.39
and it rotates
打碟
00:39 - 00:42
oh do you want to figure out, how to get you that job or what
你想知道该怎样拿到那份⼯作不？
00:43 - 00:44
okay yeah I guess you gonna do
Ok，我想你可以的
00:45 - 00:49
okay so I think most people are at the TOC today
Ok，我觉得今天⼤部分⼈都在TOC
0.51-0.54
Because this is one of my favorite lectures hash tables right
因为hash table是我最喜欢讲的⼀节课
00:54 - 00:57
So we have a lot to discuss, let's get right through it
随着我们深⼊，我们会去讨论⼤量的内容
00:57 - 01:06
So real quickly and then reminders for what's on the docket for you guys what's due
,project #1 is due next week on Fri at 27th at midnight
So，快速提醒你们⼀下，Project 1 你们要在下周五午夜12点前交出来
01:06 - 01:14
And then homework #2 which will be releasing later today, that'll be due the 30th the
Monday after the project
然后，Homework 2我们今天会放出来，你们要在30号那天交出来
01:15 - 01:17
So any quick high-level questions about project #1
So，对于Project 1，你们有任何逼格⽐较⾼的问题吗？
01:21 - 01:22
say again to what
麻烦再说⼀遍
01:23 - 01:25
The question is when with the autograder be released
So，他的问题是⾃动打分器什么时候放出来
1.25-1.28
I mean so it's live on great scope now,you can submit things today
它现在已经在GreatScope上线了，你今天就可以往上⾯提交东⻄
01:30 - 01:33
But we're not giving you the source code for the test, obviously,because that's means
that the grade
但我们不会将测试源码也交给你们，因为这事关分数问题
01:34 - 01:35
Yes sir it should be live
我觉得它现在应该上线了
01:35 - 01:39
if you submit it doesn't work please post on Piazza
如果你提交了你的项⽬进⾏测试，但测试不奏效的话，请到Piazza上发帖
01:40 - 01:42
Okay,and the other high level questions
Ok，还有其他⾼逼格的问题吗？
01:45 - 01:55
Okay, so we're at now for the course is that we've spent the first couple weeks ,again
starting at the bottom of the stack of a database system architecture and walking our
way up
Ok，⽬前为⽌我们已经花了两周时间从数据库系统架构的底层讲起，并逐渐向上进⾏探索
01:55 - 01:59
So we've discussed how to store data on disk the pages on disk
So，我们已经讨论了该如何往磁盘上存储数据，以及如何在磁盘上表示page
01:59 - 02:03
Then we talked about how to bring those pages into memory and our buffer pool or
buffer cache
接着，我们讨论了该如何将这些page放⼊内存以及buffer pool或者buffer cache
02:04 - 02:09
And having a policy decide when it's time to evict something and how to pin things when
I do writes
并且通过⼀种策略来决定何时将page从buffer pool中移除，以及当我们在做写操作时，该如何
锁住东⻄
02:10 - 02:14
So now we're going above the buffer pool manager and we start talking about access
methods
So，现在我们要来讨论下buffer pool管理器之上的东⻄，即Access methods
02:14 - 02:24
So these an access method is a way we're going to you know get essentially read or
write the data that in our database that's stored in the pages that are stored out on disk
本质上来讲，Access method 是⼀种我们⽤来对数据库数据进⾏读或写的⽅式，数据库是存放
在存储在磁盘上的page中的
02:25 - 02:36
So today we're talk about ,today we begin of a of a set of lectures, we're going to do on
data structures that we're gonna maintain internally inside the database system
So，从今天开始，在接下来的⼏堂课上，我们会去讨论数据库系统内部所维护的数据结构
02:36 - 02:41
And we're gonna split it up between two discussions between hash tables and and order
preserving trees
我们会将数据结构拆开来讲，⼀节课讨论hash table，另⼀节课讨论order-preserving tree
02:42 -02:44
So each of them have different trade-offs
So，它们每个在设计上都有所取舍
2.44-2.46
if you because you've taken an algorithms course by now
因为如果你们上过算法课
02:46 - 02:48
So you understand the implications for both of these
那么你们就明⽩了它们两者之间的含义了
02:48 - 02:52 ****
But we're gonna describe what matters to us in the context of database systems
但是我们会基于数据库系统的背景下描述对我们来说重要的事情
02:53 - 03:00
Because just because you have a tree versus a hash table maybe understand how to do
proofs on it ,or write algorithms to interact with it
因为假设如果你们有⼀个tree和hash table，你们可能知道该如何去证明它们是tree还是hash
table，或者也明⽩该如何通过算法和它们进⾏交互
03:00 - 03:04
Now let's talk about what happens when we actually put it inside a database system and
actually try to use it
现在，我们来讨论下当我们将这些数据结构放⼊数据库系统中并试着使⽤时，会发⽣什么呢？
03:05 - 03:12
So data structures are used all throughout the database management System,right for a
variety of purposes
出于许多不同的⽬的，在数据库管理系统中，数据结构⽆处不在
03:12 - 03:20
So one thing we've talked about so far we turn how to use data structures for
maintaining the internal metadata about what's in our database
So，⽬前为⽌我们已经讨论过⼀件事了，那就是我们该如何使⽤数据结构来维护我们数据库中
的内部元数据
03:20 - 03:23
When we talk about there being a page table or a page directory,
当我们在讨论page表或者page⽬录时
3.23-3.33
and that was a hash table to do lookups between a hash id or ,sorry a page to a page ID
to a frame, or a page ID to some location on disk
其实它们就是⼀个hash table，我们通过传⼊⼀个page id，能找到对应的frame，或者是传⼊⼀
个page id，能找到磁盘上所对应的位置
03:35 - 03:39
The next thing we can use them for is actually just the core data storage of the
database itself
接下来，我们能使⽤到这些数据结构的地⽅就是数据库⾃身的核⼼数据存储
接下来，我们可以将它们⽤于数据库⾃身的核⼼数据的存储
03:40 -03:43
So what I mean by that is instead of as having on order to heap a bunch of pages
So，我的意思是，这样我们就⽆须去维护⼀堆page的顺序了
03:44 - 03:50
We can actually organize them at a higher level to be a hash table or a B+ tree or tree
data structure
实际上，我们可以站在⼀个⾼级层⾯，将它们组织为⼀个hash table或者是B+ tree或者其他树
形结构
3.50-3.55
and have the the values in the data structure actually be tuples
在这些数据结构中的值实际上就是tuple
03:55 - 03.57
So this is very common in a lot of systems
So，这在许多系统中都很常⻅
3.57-4.01
like like memcache for example essentially is a giant hash table
⽐如，memcache本质上来讲就是⼀个超⼤的hash table
04:01 - 04:04
Or MySQL innodb engine is just a B+ tree
或者，MySQL的innodb引擎使⽤的也是B+ tree
4.04-4.09
where they store the tuples themselves inside of the side of the leaf nodes of the tree
它们将tuple存储在B+ tree的叶⼦节点上
04:09 - 04:12
We can also use data structures to maintain temporary data
我们也可以使⽤数据结构来维护临时数据（知秋注：临时数据⼤家想成缓存就ok了，当然需要
⼀个数据结构来对这些数据进⾏存储管理）
04:12 - 04:14
So this would be like if we're running a query
如果我们执⾏⼀个查询
4.14-4.17
and we need to compute something very efficiently
我们需要去⾼效地计算某些东⻄
04:17 - 04:19
We could build a data structure on the fly
我们可以在运⾏时构建⼀个数据结构
4.19-4.21
populated with whatever data we need
放⼊我们所需的任何数据
4.21-4.23
,finished executing the query,
完成执⾏查询
4.23-4.26
and then this throw away that data structure and be done with it
然后将这个数据结构丢弃，它的使命就已经完成了
04:26 - 04:31
And the last one that's why you you're most familiar with is using these data structures
for table indexes
我们所要讲的最后⼀个，同时也是你们最为熟悉的那就是，把这些数据结构⽤在表索引（table
index）上
04:32 - 04:36
Right, essentially building a glossary over keys inside of our tuples
本质上来讲，就是使⽤我们tuple中的key来构建⼀个词汇表（想成我们书中的⽬录就对了）
04:36 - 04:40
And allows how to do you know quick lookups to find individual elements that we want
这样允许我们快速找到我们想要的单个元素
4.40-4.43
rather than having to do a sequential scan throughout the entire database
这样就⽆须使⽤循序扫描整个数据库来找到我们想要的数据了
04:43 - 04:47
So for all these purpose again you need good data structures to do all these things
So，出于这些⽬的，我们就需要良好的数据结构来做些事情
04:49 - 04:50
So the things we want to care about
So，我们想去关⼼的事情是
4.50-4.52
how we design our data structures
那就是我们该如何设计我们的数据结构
4.524.54
is the two following things
它需要满⾜以下两点
04:55 - 04.57
So the first is we care about what the data organization is
So，我们所关⼼的第⼀件事就是数据结构是怎样的
4.57-5.06
we need how are we gonna represent the key value pairs are the elements of the data
that we're storing in either in memory or on pages that were storing on disk
我们需要知道，我们该如何对我们存放在内存或者是磁盘中page上的这些（key/value键值对）
元素进⾏表示
表示key/value pair这些数据元素，我们将它们存放在内存或者是磁盘中的page上
05:06 - 05:08
And we do this in an efficient way
我们要以⼀种⾼效的⽅式做到这点
5.08-5.18
that can support fast reads and writes without having to your major overhaul ,or maybe
restructuring of the entire data structure every single time
在⽆须对数据结构进⾏⼤改或者是每次要重构整个数据结构的情况下，它⽀持快速读写
即在⽆须对数据结构进⾏⼤改或者是每次要重新转换整个数据结构的情况下，⽀持快速读写（知
秋注：Java程序员都知道，我们在⾯向对象编程时，每次都会将表中⼀⾏数据转换为⼀个数据
结构POJO）
05:19 - 05:25
The second issue is that how we're going to allow multiple threads to access our data
structure, or multiple queries access to the our data structure
第⼆个问题就是，我们该如何让多个线程或多个查询去访问我们的数据结构
05:26 - 05:31
At the same time without causing any physical violations to the internal representation of
the data
与此同时，它们不会对数据的内在表示造成任何物理上的问题
与此同时，在此环境下，该数据结构表示的数据并不会在物理存储层⾯出现问题（知秋注：多线
程下内存中数据访问修改可能出现的问题，对多线程编程熟悉的都懂）
05:32 - 05:32
So what I mean by that is
我这么说的意思是
5.32-5.38
we don't want to have maybe one thread update a memory address while another thread
it's reading that address
我们不希望这种情况发⽣，即当⼀个线程正在读取该内存地址上的数据，然⽽另⼀个线程对这个
内存地址上的数据进⾏更新
05:39 - 05:42
And then they see some torn white or some corrupt version of that address,
然后，它们就会看到该地址上的数据是有问题的（脏数据）
05:42 - 05:46
And now that points to some invalid page or some invalid memory location
这会指向某些⽆效的page或者是某些⽆效的内存位置
5.46-5.49
where we end up producing incorrect results
这会导致我们最终⽣成错误的结果
05:49 - 05:54
So we'll see how we actually handle this we'll talk a little bit long as we go along today
So，今天我们会去花点时间来讨论实际该如何处理这些东⻄
05:54 - 06:01
But we'll spend a whole lecture while discussing how to do concurrency control inside of
indexes inside of these data structures
但我们之后会花⼀整节课时间来讨论该如何在这些数据结构内部进⾏并发控制
06:01 - 06:05
But for our purposes today but you sort of simplify the discussion just assume we only
have a single thread
但出于我们今天的⽬的，我们会讨论的稍微简单些，我们假设我们只有⼀个线程
06:06 - 06:08
And because this is going to matter later on also to when we talk about transactions
因为这对于我们之后要讨论的事务⾮常重要
06:08 - 06:14
Because the type of things we'll talk about here we'll use latches to protect the physical
data structure
因为我们能使⽤此处所讨论的latch来保护物理数据结构
6.14-6.19
that prevents from again reading invalid memory addresses or invalid page locations
它能防⽌我们去读取某些⽆效的内存地址或是⽆效的page位置
06:19 - 06:23 ******
There's also a higher level concept of what's the logical correctness of our data structure
关于数据结构的逻辑正确性还有⼀个更⾼层次的概念
6.23-6.27
that we need to care about as well and that'll come later on in the semester
我们也需要去关⼼这点，我们会在这学期稍后⼀段时间去讨论它
06:27 - 06:31
So it says what I mean by that is to say, I have an index, I delete a key
我的意思是说，假设我们⼀个索引，然后我删掉了⼀个key
06:31 - 06:34
If I come back， my thread comes back and tries to retrieve that key again
如果我的线程回过头来试着查找这个key
06:35 - 06:36
I shouldn't get it, because I know it's been deleted
我应该拿不到这个key，因为我知道它已经被删除了
06:37 - 06:39
Even though the physical bit still may be there,
即使该key的physical bit依然在那个位置上
6.39-6.43
because I I'll do some background garbage to clean up later on
因为我之后会在后台进⾏垃圾回收
06:43 - 06:46
But logically my key should be gone even though physically it's not
但从逻辑上来讲，这个key应该GG了，即使从物理上讲它还在那⾥
06:46 - 06:48
So that this topic is very complicated
So，这个课题其实⾮常难
06:48 - 06:50
And so we'll touch on a little bit today,
So，我们今天会稍微接触下
6.50-6.57
but mostly care about the physical integrity of the data structure rather than the logical
one
但我们最关⼼的还是数据结构的物理完整性，⽽不是逻辑上的
06:57 - 07:01
Okay, today again we're going to focus on hash tables
Ok，今天我们要讲的重点是hash table
07:02 - 07:11
So a hash table is a abstract data type that we're going to use to provide a unordered
associative array implementation API
So，hash table是⼀个抽象数据类型，我们通过它来提供⽆序的关联数组实现API
07:12 - 07:16
And all that means that we're able to map arbitrary keys, to arbitrary values
这就意味着，我们能够将任意的key映射到对应的值上⾯
07:17 - 07:20
All right, there's no ordering to this thing like we're gonna see in trees
在hash table中并没有顺序这个说法，但我们会在树形数据结构中看到这点
07:21 - 07:25
And so the way we're gonna be able to do this these fast look ups to find elements that
we want
So，我们能够在hash table中快速查找我们想要的元素
07:25 - 07:29
It`s that we're gonna use a hash function, that's gonna take in our key
我们会使⽤⼀个hash函数，并将我们的key作为参数传⼊
07:29 - 07:34
And then compute some offset in some way to some location in my array
然后以某种⽅式计算出数组中某个位置的offset值
07:35 - 07:39
And that's gonna tell me either exactly the element looking for
这就会告诉我，我所要找的元素的具体位置在哪
7.39-7.45
,or I can roughly look around close to by where I land after I use my hash function to find
the thing that I'm looking for
或者当我使⽤我的hash函数找到我所要找的数据后，我也可以⼤致看下周围的东⻄
07:45 -07:48
So the hash function isn't always gonna get us exactly where we want
So，hash函数并不会⼀直让我们精确地找到我们想要的东⻄（知秋注：因为会产⽣hash碰撞）
07:48 - 07:50
But at least get us in the right location
但⾄少它能让我们找到正确的位置
7.50-7.53
and we know how to then look around to find the thing that we are looking for
然后我们知道该如何在周围找到我们想要的那个数据
07:54 - 07:57
So again so this none of this should be new you should all take an algorithms class
So，这些东⻄并不是什么新知识，你们应该在算法课上都学过了
07:58 - 08:03
So the space complexity in the worst case of a hash table is is Big O(n)
So，hash table中空间复杂度最糟糕的情况是O(n)
8.03-8.06
that means that we for every single key we want to store
这就意味着对于每个我们想去存储的key
08:06 - 08:10
We least have one one entry for it in our hash table
在我们的hash table中⾄少有⼀个与它对应的entry
08:10 - 08:12
So that allocate that amount of memory amount of space
So，我们会给它分配⼀定量的内存空间
08:13 - 08:15
The operational complexity is interesting
接着，我们所感兴趣的是操作上的复杂度
8.15-8.18
because on average we're gonna get o one lookups,
因为从平均上⽽⾔，我们查找的复杂度是O(1)
8.18-8.24
meaning we in one step in constant time you can find exactly the thing that we're
looking for
这意味着在常数时间内，我们只需⼀步就能准确地找到我们想要的那个数据
08:24 - 08:28
Worst case scenario and we'll see why this happens when we in a few seconds
最糟糕的情况指的是，我们需要花⼀定时间才能找到我们想要的那个数据
08:29 - 08:31
The worst case scenario will get Big O(n)
最糟糕情况下的操作复杂度就是O(n)
8.31-8.38
meaning we'll have to do a sequential scan or a linear search to find to look every single
possible key to find that the key that we're looking for
这意味着我们必须进⾏循序查找或者是线性搜索来对每个可能的key进⾏查找，以此找到我们所
查找的key（知秋注：key通过hash都碰撞到⼀起，放在⼀个数组或者队列或者链表中了，遍历
查找想要的那个key）
08:39 - 08:40
So you may be thinking alright this this is great
So，你们可能觉得这会很棒
08:41 - 08:46
Any hash function or any hash table will do ,because I'm always gonna get O(1) for the
most part
任何hash函数或是hash table都会做到这点，因为⼤部分情况下，复杂度都是O(1)
08:46 - 08:53
In practice even though this is super fast, in the real world where money's involved
constant factors actually matter a lot
实践表明，尽管它是⾮常之快的，但有句⽼话讲得好，时间就是⾦钱
08:53 - 08:56
And so we'll see this when we just look at functions
So，当我们在看这些函数时，我们会看到这个
08:56 - 09:00
Right, hash functions what we, you know sometimes it'll be it would still be super fast
hash函数有时依然会超级快
09:00 - 09:04
But there'll be some hash function, that'll be twice as fast or three times as fast as other
hash functions
但某些hash函数要⽐其他hash函数快2到3倍
09:05 -09:07
So you may say all right for one hashing who cares
So，你们可能会这样说，⼀个hash函数⽽已，谁会在意
09:07 - 09:09
But if now I'm hashing a billion things
但现在如果我对10亿数据进⾏hash处理
9.09-9.13
and my crappy hash function takes a second slower than the fastest one
对于⼀条数据来讲，我的垃圾hash函数所花的时间要⽐最快的那个慢1秒
09:13 -09:16
Now that's I'm spending a billion seconds to do this lookup
现在，我就需要多花10亿秒去进⾏查询了
09:16 - 09:21
So when there's real money involved when we're looking at large-scale the constant
factors actually matter
当我们在⾯对这种超⼤规模基数的时候，我们要付出⼤量的⾦钱（知秋注：⽐如商业交易，每⼀
秒都是⼤量的⾦钱消耗，这⾥原⽂中的constant factor如果为1，也就是⼀条查询多浪费1秒，
那么⼀个亿*1那就真的有问题了）
09:21 - 09:26
We take your algorithms class there's like, O(1) we don't care about anything else the
constants don't matter
我们通过 O(1)这种级别的算法来使得我们⽆须担⼼
9.26-9.28
in our world it does
在我们数据库的世界中，这很重要
09:29 - 09:32
All right, so let's look at the most simplest hash table you could ever build
So，我们来看下你们所能构建的最简单的hash table是怎样的吧
09:33 - 09:38
Right, and all it is is just a a giant array which is now like a big chunk of memory
它其实就是⼀个巨⼤的数组，它看起来就像是⼀⼤块内存
09:38 - 09:45
And then we're gonna say that every single offset in our array corresponds to a given
element
接着，我们会说我们数组中每个offset位置都对应了⼀个给定的元素
09:46 - 09:51
And so for this to work we're gonna assume that we know exactly the number of keys
are gonna have ahead of time
So，为了让这个能正常使⽤，我们会假设我们提前已经知道了key的具体数量
09:51 - 09:56
And we know exactly what there with the reduced we shouldn't their values are with what
their actual values are
我们也知道这些key所对应的实际值是什么
09:57 - 10:00
Right, so now to find any key in my hash table
So，现在，我要在我的hash table中找某⼀个key
10:01 - 10:06
I just take a hash on the key mod it by the number of elements that I have
我通过对key进⾏hash，即我将该key与所有的元素数量进⾏取模操作（知秋注：如果该key对应
这数组的下标）
10:07 - 10:09
And then that's going to get me to some offset,
然后，我就会得到它对应的offset值
10.09-10.12
and this is exactly the thing that I'm looking for
这也正是我正在找的那个东⻄
10:15 - 10:16
So let's look at and see how this works
So，我们来看下它的⼯作原理是怎么样的
10:16 - 10:21
So let's say that and we have three keys abc Ø def xyz
So，假设我们有三个key，即abc，def以及xyz
10:21 - 10:25
So again I can just take this thing ABC hash it,
So，我可以通过对abc进⾏hash处理
10.25-10.31
and then that'll tell me I know I'm at offset zero is exactly the thing I'm looking for
然后hash函数告诉我在offset值为0的位置上，有我所想要找的东⻄
10:31 - 10:35
So this is not exactly what our hash table is actually could look like
So，这并不完全是我们hash table实际上看起来的样⼦
10.35-10.37
this is just storing the original keys
它⾥⾯只是保存了这些原始的key
10:37 - 10:44
in practice what we're gonna need to have is actually store pointers to where the original
you know some other location where that original keys is located
实际上，我们需要去保存⼀些指向这些原始的key所在位置的指针
10:44 - 10:46
Again think of this like a table index
你们将它当做了⼀个表索引
10:46 - 10:49
I don't want to store the keys maybe in might my hash table,
我不想将这些key保存在我的hash table中
10.49-10.51
I want to store it a pointer to where the key is found
我想将它保存为指针，指向key所在的位置
10:53 - 10:59
All right ,so what are some problems to be sometimes we made with this kind of hash
table
So，对于这种hash table⽽⾔，我们有时候会遇上的某些问题是什么呢？
11:03 - 11:04
Yes, in the back
后⾯的那位同学，请问
11:06 - 11:07
Correctly,
没错
11.07-11.11
you say that we know the number elements ahead of time in the first place that's one
我们提前知道了hash table中元素的数量，这是其中⼀点
11.11-11.12
what's the second assumption
第⼆个假设是什么呢？
11:17 - 11:19
Is all the values are near each other in the cache
在cache中的所有值是否都是挨个放在⼀起？
11.19-11.20
for this purpose that doesn't matter here
出于此处的⽬的，这并不重要
11:24 - 11:25
But he says there's no collision between keys
他表示在key与key之间没有碰撞（collision）
11:26 - 11:26
So what is a collision
So，碰撞（collision）是什么？
11:29 - 11:30
He says the hashing the same slot ,exactly, right
他想说的是，我们所得到的hash后的结果指向了同⼀个slot，没错，确实这样
11:31 - 11:36
So this really simple hash table this is actually the fastest hash table you could ever
possibly build
这种简单的hash table实际上是你们所能构建的最快的hash table
11:36 - 11:39
But you have to make these assumptions in order to make to work
但为了能让它⼯作，你们必须做出这些假设
11:39 - 11:43
Right, so the first is that as he said we need to know exactly the number of elements
that we had ahead of time
So，⾸先正如他所说，我们需要提前知道元素的数量
11:43 - 11:47
So we know exactly how many slots we want to allocate in our array,
So，我们就知道了我们想在我们的数组中分配多少个slot
11.47-11.51
and in practice that's not always going to be the case
实际上，这并不是什么问题
11:51 - 11:56
All right, if I'm building a I'm using my hash table as a hash index on a table,
如果我使⽤我的hash table作为⼀张表的hash index来使⽤
11.56-11.59
when I create the table, I don't have any data in there in the first place
当我创建这个表时，我并没有放任何数据
11:59 - 12:01
And as I started inserting things
当我开始插⼊数据时
12.01-12.03
then the number of slots I need actually grows
接着，我实际所需要的slot的数量就会增加
12:05 - 12:08
The other assumption that we mixed was that, we said every hash or every key is unique
另⼀个我们需要作出的假设就是，我们说过每次hash的结果，或者是每个key都是唯⼀的
12.08-12.11
and that's what he's saying that there's no collision
这就是他所说的没有碰撞（collision）
12:11 - 12:12
So we're assuming that every time we hash it
So，假设我们每次对key进⾏hash处理
12:12 - 12:16
It's always gonna land into a unique slot for that one key
它始终会落到属于该key所对应的唯⼀的slot处
12.16-12.22
and only that key ever to be able to exactly find the thing that we're looking for
只有通过这个key，我们才能准确地找到我们所要找的东⻄
12:22 - 12:24
And so because we know all the keys ahead of time
So，因为我们提前知道了所有的key
12:25 - 12:27
And because we know that they're unique
因为我们知道这些key是唯⼀的
12.27-12.29
when we hash them
当我们对这些key进⾏hash时
12.29-12.32
, this is using what is called a perfect hash function
我们使⽤的这种被称为完美的hash函数
12:32 - 12:36
So a perfect hash function is like this if theoretical thing it exists in the research
literature
So，实际上完美hash函数是⼀种存在于研究⽂献中的⼀种理论上的东⻄
12:37 - 12:38
But in practice nobody actually does this,
在实际⽣活中，实际上没⼈去这样做
12.38-12.40
because it's impractical you can't actually do this
因为这是不切实际的，实际上我们⽆法做到这点
12:41 - 12:43
And a perfect hash function just means that
完美hash函数指的是
12.43-12.46
if I have two keys that are not they're not equivalent,
如果我有两个不相等的key
12.46-12.52
then whatever hash I generate for them is also not gonna be equivalent
接着，我不管对它们进⾏怎样的hash处理，它们hash后的结果也不会相等
12:52 - 12:55
So for every unique key I generate an exactly unique hash value
So，对于每个唯⼀的key来说，我就会⽣成⼀个唯⼀的hash值
12:56 - 13:01
And again you can't actually do that there's no magic hash function that exists today
that can guarantee this
再说⼀遍，实际上你没法做到这个，因为现在并不存在任何能保证唯⼀结果的神奇hash函数
13:01 - 13:08
The way you would actually implement a perfect hash function is actually use another
hash table to map a key to another you know the hash value
实际上，你们所实现完美hash函数的⽅式是通过另⼀张hash table将⼀个key映射到另⼀个hash
值上⾯（知秋注：Java程序员可以思考下concurrentHashmap，第⼀次hash是为了分区，第⼆
次hash是为了确定具体位置，但也不能保证完美）
13:08 - 13:11
Which is kind of you know stupid cuz now you have a hash table for your hash table
虽然我们知道这样很蠢，因为你要为你的hash table再搞⼀张hash table
13:11 - 13:14
It's so nobody actually does this in practice
So，在实战中实际上没⼈会这么做
13:15 - 13:17
So the thing that we're gonna talk about today is,
So，我们今天要讨论的事情就是
13.17-13.25
how do we actually build a hash table in the real world to not have to make these
assumptions, and be able to use them in a database system
在现实⽣活中，在不⽤管这些假设的前提下，我们实际该如何构建出⼀个hash table，并且能将
它们运⽤在数据库系统中
13:25 - 13:27
So when people say, I have a hash table
So，当⼈们说，他有⼀个hash table时
13:28 - 13:32
They essentially mean it's it's a data structure comprised of two parts
他们本质上讲的是，⼀种由两部分组成的数据结构
13:32 - 13:34
The first is the hash function
第⼀部分是hash函数
13.34-13.42
which is a way to take any arbitrary key, and map you know a map it to a integer value
in a smaller domain
该函数将任意的key映射到⼀个较⼩范围的interger值上⾯
13:42 - 13:46
Right, so I can take any string and the integer and you float ,doesn't matter
So，我可以使⽤任意字符串，整数（Integer），浮点数（float）之类的作为key，具体是什么
都没什么关系
13:46 - 13:47
I throw it to my hash function ,
我将这个key丢给我的hash函数
13.47-13.55
and it's gonna produce either a 32-bit or 64-bit hash unique hash value integer or not
unique, so I hash hash integer
接着，该函数就会为我⽣成⼀个32位或64位⻓度的唯⼀hash值，也可能不是唯⼀的，总之就是
个hash数字
13:56 - 14:04
So there's gonna be this big trade off and and what kind of hash function we're gonna
use between how fast it is and the collision rate
在我们所使⽤的hash函数中，在它的速度和hash碰撞率之间存在了巨⼤的取舍
14:04 - 14:08
Because again if we have different keys mapped to the same slot,
因为如果我们将不同的key映射到了同⼀个slot上
14.08-14.09
that's a collision
这就会导致⼀次hash碰撞
14.09-14.11
and now we have to deal with that in our hashing scheme
现在，我们就必须在我们的hashing scheme中处理这个问题
14:12 - 14:14
So what's the fastest hash function I could ever build
So，我所能构建的最快的hash函数是什么呢？
14:16 - 14:16
What that
能再说⼀遍吗？
14:18 - 14:19
It`s mod prime number even faster
他说的是，⽤质数来取模，在速度上甚⾄会更快点
14:23 - 14:23
What that
你想说啥
14:24 - 14:26
He said that value itself
得到的结果就是它⾃⼰
14.26-14.26
you're close
你的说法很接近正确答案
14.26-14.27
but what does that mean,
但这是什么意思呢？
14.27-14.30
if I have a string how do I return back that value and then put it into my slot
如果我有⼀个字符串，我该如何返回它的值，并将它放进我的slot中呢
14:32 - 14:32
Even faster
甚⾄更快
14:36 - 14:37
There's bits of memory to give it if it's a large string
如果它是⼀个很⼤的字符串，拿到它的内存位⼆进制表示
14:40 - 14:42
He said mod if there's a mod nur,
使⽤⼆进制运算取模
14.42-14.43
yes
请问
14:43 - 14:46
Constant, one, right
使⽤常量 1
14:46 - 14:49
No matter what key you give me I return back the number one
不管你给我什么key，我返回给你的始终是数字1（知秋注：任何key模1都为0，Andy⼜调⽪
了）
14:49 - 14:50
That's gonna be super fast
这样做肯定超级快
14.50-14.53
because that's gonna be on the stack, that's gonna be impossibly fast
它不可能不快
14:53 - 14:54
But your collision rate is BBBBBB
但你的碰撞率绝对会炸的
14:55 - 14:57
Because it always goes to the same slot
因为这样做会导致所有的key都映射到同⼀个slot上
14:58 - 15:00
So in the other end of spectrum is that perfect hash function
So，与之相反的就是完美hash函数
15:00 - 15:03
But I said I need I need another hash table to make that work
但我说过，我需要另⼀个hash table才能让它奏效
15.03-15.04
max like the worst case scenario
就像是那种最糟的情况那样
15:04 - 15:08
So my collision rate is is zero ,but that's the slowest
So，我的碰撞率是0，但它的速度是最慢的
15:08 - 15:09
So we want something in the middle
So，我们想在两者之间取得平衡
15:10 - 15:11
Okay
15.11-15.12
all right
######################################################################
15.12*-15.14 ！！！！！！！！
so the next piece is the hashing scheme
So，我们接下来要讲的东⻄是Hashing scheme
15:14 - 15:19
The hashing scheme is essentially the the mechanism or procedure we're going to use,
when we encounter our collision in our hash table
本质上来讲，hashing scheme是当我们在我们的hash table中遇上hash碰撞时，我们⽤来处理
这种问题的⼀种机制或者步骤
15:20 - 15:26
Right, so again there's this trade-off between memory and and compute
So，再说⼀遍，在内存和计算之间存在了取舍
15.26-15.28
which is the classic trade-off in computer science
这是计算机科学中⼀个经典的取舍问题
15:28 - 15:35
So if I allocate an impossibly large you know slot array like you know two to the 64 slots
如果我分配⼀个⾮常⾮常庞⼤的slot 数组，⾥⾯有2的64次⽅个slot
15:35 - 15:37
Because that's all the memory you have them on my machine,
因为这是你机器上的全部内存
15.37-15.40
then my collision rate is gonna be practically zero
那么我的碰撞率⼏乎为0
15:40 - 15:42
Of course, now I can't do anything else in my database ,
当然，现在我没法在我的数据库中做其它事情了
15.42-15.45
because I've used all my memory for my hash table that's barely even full
因为我已经将我的所有内存都给了我的hash table，⼏乎没有任何空余空间了
15:45 - 15:47
But my collision rate is gonna be amazing
但我的碰撞率就会⾮常惊⼈
15:48 - 15:51
If I have a slot array of size 1 my clear rates can be terrible
如果我的slot array的⼤⼩为1，那么我的碰撞率就会很可怕
15:53 - 15:56
And if I have to do a bunch of extra instructions to deal with those collisions
那么我需要做⼀些额外的指令来处理这些碰撞问题
15:56 - 15:59
But my storage overhead is is the minimum
但我的存储开销是最⼩的
15:59 - 16:01
So again, there's this we want to be sort of in the middle here
So，再说⼀遍，我们想在两者之间取得平衡
16.01-16.06
we want to balance the amount of memory, we're using or amount of storage, we're
using for a hash table
在我们使⽤⼀个hash table时，我们想在我们所使⽤的内存量和存储空间取得平衡
16.06-16.11
with the extra instructions you have to do when we have a collision
当我们遇上碰撞问题时，我们需要通过⼀些额外的指令来解决它们
16:12 - 16:17
All right, so today we're gonna focus on again the the the with we start beginnings are
still about hash functions
So，我们今天⾸先依然要谈的重点就是hash函数
16:18 - 16:22
Just get to show you what what hash functions are out there the modern ones that
people are using
我会向你们展示有哪些hash函数，以及⼈们现在使⽤的是哪些
16:22 - 16:24
And then we're talk about two type of hashing schemes,
然后我们会去讨论两类hashing scheme
16.24-16.26
the first is static hashing
⾸先要讲的是static hashing scheme
16.26-16.31
is where you have an approximation of what the size of the keys are trying to store the
key set
你可以⼤致估算出我们所试着要保存的key的集合的⼤⼩
16:31 - 16:32
And then we'll talk about dynamic hashing
接着，我们会讨论dynamic hashing
16.32-16.37
where you can have a hash table that can incrementally grow without having to reshuffle
everything
我们有这样⼀个hash table，它可以在不需要将所有存储条⽬重新打乱再做⼀次hash的情况下进
⾏扩容
16:38 - 16:43
Again the combination of a hash function and hashing scheme is what people mean
when they say I have a hash table
当⼈们说他们有⼀个hash table时，他们所说的其实就是由⼀个hash函数和hashing scheme所
结合的产物
16:45 - 16:57
Alright, so again a hash function is just this really fast function that we want to take any
arbitrary byte array or any arbitrary key, and then spit back a 32 bit or a 64-bit integer
So，hash函数其实就是⼀个速度很快的函数，我们将任意的byte array或任意的key传⼊函数，
然后它就会返回⼀个32位或64位⻓度的integer
16:58 - 17:01
So can anybody name a hash function maybe one they've used before.
So，你们有⼈能说出⼀个hash函数的名字吗，可以是你们以前⽤过的
17:02 - 17:06
He says sha what sha-256, that's one can name another one
他说的是SHA-256，这是⼀个，有⼈能说下别的吗？
17:07 - 17:09
Yes, md5 perfect, all right
MD5，不错
17:09 - 17:10
This is actually a great example
这实际上是⼀个很棒的例⼦
17:10 - 17:13
So he said sha-256,he said md5
So，他们⼀个说了SHA-256，另⼀个⼈说了MD5
17.13-17.19
sha-256 is a cryptographic hash function that's actually reversible
sha-256是实际上可逆的加密hash函数
17:19 - 17:21
Right, it's a public/private key thing
它是⼀种使⽤了公钥/私钥的东⻄
17:21 - 17:23
So given a key I can hash it
So，对于⼀个给定的key，我可以对它进⾏hash
17.23-17.26
and then I know how to take that key and reverse and get back the original value
然后，我知道该如何将这个key变为原来的值
17:26 - 17:32
He said md5 which takes any arbitrary key and fist back a 32 character unique hash
他刚说了MD5，我们可以将任意的key传⼊它的hash函数，然后会返回给我们⼀个32位的唯⼀
hash值
17:32 - 17:37
That in it's not supposed to be reversible it is now cuz people cracked it
它本来应该是不可逆的，但现在因为有⼈破解了它，所以可逆
17:37 - 17:39
But that's something where it's of one way hash,
但这是⼀种hash的⽅式
17.39-17.41
hisses hisses of reversible hash
这是⼀种可逆的hash
17:41 - 17:46
So in our database system we do not care about cryptography, for when we do we're
doing hash tables
So，在我们数据库系统中，当我们在做我们⾃⼰的hash table时，我们并不在意加密性
17:47 - 17:52
Now that's you know you you can encrypt the data when you store it on on disk or on
your public cloud infrastructure
要知道，当你们将数据保存在磁盘或者是你们的公共云设备上时，你们可以对数据进⾏加密
17:52 -17.56
But when we're doing our hash join or and building our hash table,
但当我们在进⾏hash join操作，或者是构建我们的hash table时
17.56-17.58
we're not gonna care about cryptography
我们并不会去在意加密性
17.57-18.02
we're not gonna care about leaking information about our keys
我们不在意泄露我们key的相关信息
18:02 - 18:06
Because we're just trying to build this hash you know build our hash tip hashing data
structure
因为我们只是试着去构建hash型数据结构
18:06 - 18:08
So we're not gonna use something like like sha-256,
So，我们不会去试着使⽤诸如SHA-256之类的东⻄
18.08-18.11
because one we don't care about the cryptographic guarantees it provides
因为我们并不在意它所提供的加密性保证
18:11 - 18:13
It's also super slow so we're not gonna use it at all
并且它的速度也超慢，因此，我们根本不会去⽤它
18:14 - 18:17
MD5 is a one-way hash
MD5是⼀种one-way hash（单向散列）
18.17-18.23
and that's something we could use for a hash function we don't,because it's super slow
we'll see other ones that are that are faster
我们可以将它作为我们的hash函数，但我们不会这样做，因为它还是⾮常慢，稍后我们会去介
绍写其他⽐这更快的hash函数
18:23 - 18:25
And it's also sweet one way, but people have rainbow tables to reverse it
它也是不安全的，因为⼈们可以通过彩虹表对它进⾏破解
18:26 - 18:28
So that has doesn't we have good cryptographic guarantees
So，它也不能为我们提供良好的加密保证
18:29 - 18:35
All right,so again we care about something that's fast, we care something that has a low
collision rate
So，再说⼀遍，我们所关⼼的是速度和碰撞率
18:36 - 18:42
So this is just sort of a list of some of the hash functions that are people are using today
So，幻灯⽚上所列的是⼈们现在所⽤的部分hash函数
18:43 - 18:49
So CRC is used in the networking world it was originally you know a Menten in 1975
CRC是⽤在⽹络世界的⼀种hash函数，它在1975年被⼈发明出来
18:49 - 18:52
I don't remember whether it was 32 bits or 16 bits back then
我不记得当时它是32位还是16位加密了
18:52 - 18:56
But now if you want to use CRC there's a 64 bit version and you would use something
like that
但现在如果你使⽤CRC，它现在有64位版本，你们会使⽤某种和它类似的东⻄
18:57 - 19:04
So again this will produce something with a reasonable collision rate and,but it's gonna
be super super slow
So，它所⽣成的数据的碰撞率虽然合理，但是它的速度⾮常⾮常慢
19:04 - 19:05
So we nobody actually does this in practice
实际上，现在在实战中，我们没⼈会去使⽤它
19:06 - 19:12
So this is sort of MurmurHash sort of again from a database perspective this enters the
era of modern hashing functions
接着要说的是MurmurHash，从数据库层⾯来讲，它的诞⽣进⼊了现代hash函数的时代
19.12-19.14
and these are the ones that we're gonna care about
这也是我们所关⼼的⼀种hash函数
19:14 - 19:17
So murmur hash came out in 2008,
So，MurmurHash在2008年诞⽣
19.17-19.22
it was just some dude on the internet posted up his general-purpose hashing code on
github
⽹上有位⼤兄弟将他的通⽤型hash代码发到了Github上
19:22 - 19:24
And then people picked it up and then started using it
接着，⼈们看到了这个，然后开始⽤起了它
19:26 - 19:30
Google then took murmur hash in in the early 2010's,
⾕歌在2010年早期采⽤了Murmurhash
19.30-19.34
modified it to be a faster on shorter keys
并对其修改，使得⻓度更短的key可以获得更快的速度
19:34 - 19:36
And then they released something called Cityhash
然后，⾕歌放出了某种叫做CityHash的东⻄
19:37 - 19:38
And then later on in 2014
然后，在2014年时
19.38-19.41
they've modified this again to have FarmHash
他们⼜对此进⾏修改得到了FarmHash
19.41-19.44
that has a better collision rate than CityHash
它的碰撞率要⽐CityHash来的更低
19:44 - 19:47
So farm hashes Cityhash are pretty common in some systems
So，FarmHash和CityHash在某些系统中很常⻅
19:48 - 19:54
What is now considered to be the state of your art and the fastest, and has the best
collision rate in four hash functions today
So，在这如今的四个hash函数中，哪个函数的速度最快，并且碰撞率最低呢？
19:54 - 19:56
It`s actually Facebook's xx hash
实际上是FaceBook的XXHash
19:56 - 19.59
And not the the original one 2012
我们说的并不是2012年那个原始版本
19.59-20.01
there's a xxhash 3,
现在已经有了XXHash3
20.01-20.06
that is actively under active under active development now ,I think it came out in 2019
它现在依然还处于开发中，我觉得它会在2019年推出
20:06 - 20:10
So right now this is the fastest and has the best collision rate of all these hash functions
So，XXHash是这些hash函数中速度最快，碰撞率最低的那个
20:10 - 20:13
So if you're building a database system today, you want to be using xx hash
So，如果你们现在想构建⼀个数据库系统，那么你们会想去使⽤XXHash
20:14 - 20:18
So again we don't care so much how this is actually implemented
So，我们不会在意它实际上是如何实现的
20:18 - 20:21
Right, I don't this is not an algorithms class, I don't care about the internals are
我给你们上的这节课并不是算法课，我并不在意内部是怎么做的
20:21 - 20:25
Again,all I care about is how fast it is ,and what the collision rate is
我所关⼼的是它的速度有多快，它的碰撞率是怎么样的
20.25-20.30
,and there's benchmarks to measure and the quality of the collisions rates all these
algorithms
我们会对这些算法进⾏测试，看下其中的碰撞率是怎么样的

06-02
20:31 - 20:34
So this is a benchmark Micromanager like I've run you every year
这个是我们每年⽤来对hash函数进⾏评分的软件
20:34 - 20:37
So this is like an open-source framework that I took I modified that,
它是⼀个开源框架，我将它拿过来修改了⼀下
20.37-20.41
just scales up the number of keys you throw into the hash function
随着我们所放⼊hash函数的key的数量的增加
20:41 - 20:44
And see how fast it can actually compute hashes on things
然后我们可以看出这⼏个hash函数计算hash的速度有多快
20:44 - 20:47
So this here we're looking at from one to eight bytes for the key sizes
So，这⾥我们所测试的Key的⼤⼩是从1 byte到 8 byte
20.47-20.52
which is pretty small, right when you think about essentially a 64-bit integer
如果我们将它和64位⻓度的integer相⽐，它们是真的很⼩
20:52 - 20:55
But you want this is beyond what like email keys or URLs it will be
但它要⽐email key和URL⻓的多
20:56 - 21:02
So at the really smallest level right, the the CRC actually does the fastest here
从图上来看，当key的⼤⼩为最⼩（1 byte）时，实际上CRC计算的速度是最快的
21:02- 21:04
But then of course as you scale up,
但之后，随着key的⼤⼩的增加
21.04-21.10
the the FarmHash, CityHash and the Facebook XXhash do you know are getting much
better
FarmHash，CityHash以及Facebook的XXHash的计算速度变得越来越快
21:11 - 21:14
What really matters is one we want actually looking larger key sizes which is something
like this
但真正重要的是，我们实际想看的是计算具有更⼤体积的key的情况，就像这张幻灯⽚所展示的
那样
21:15 - 21:22
So now you see the CRCHash sucks ass and no matter how much bigger the key is the
throughput rate is is essentially the same
从图上可以看到，CRCHash其实很操蛋，不管这个key的⼤⼩有多⼤，本质上来讲，它的速度
基本没什么变化，始终⼀样
21:23 - 21:30
But you see these really nice spikes here for at 32 bytes and 64 bytes for farmhash
CityHash and xxHash3
但我们从图上可以看到，当key的⼤⼩为32 byte和64 byte时，farmhash、CityHash以及
XXHash3的图像上都出现了⾮常漂亮的尖峰
21:30 - 21:38
Alright, and this is because the key that they're processing that they're computing on fits
within a single cache line
这是因为它们所进⾏计算处理的key都刚好填满单个cache line（Cache Line 是 CPU 和主存
之间数据传输的最小单位）
21:39 - 21:45
So as I see you a single fetch into memory, I'm bringing in 64 bytes into my cache
So，当我们从内存中读取⼀次数据时，我将64 byte⼤⼩的key放⼊我的cache中
21:45 - 21:52
And I can operate on you know for that single fetch I'm operating on all the data within
that cache lookup
这样我就可以⼀次性操作所有从该缓存中找到的数据（即⼀次操作⼀整个cache line中的数据）
21:53 - 21:55
So that's why there's sort of the solitude pattern here
So，这就是为什么会出现这么漂亮的尖峰的原因所在了（知秋注：数据刚好对⻬，数据吞吐量
刚好达到最佳，即⼀次拿到并处理的就是我想要的数据）
21:55 - 22:01
And then beyond this I think after 64 byte CityHash or FarmHash switch to a different
algorithm and then it's be different
当key的⼤⼩超过64 byte后，CityHash或FarmHash会切换到另⼀种不同的算法上，这就会导致
速度上的不同
22:03 - 22:07
You see different properties whereas xxhash still does quite well
你们可以看到对于不同⼤⼩的key，XXHash依然能做的很好
22:07 - 22:09
So again I'm not showing the collision right here
So，这⾥我并没有向你们展示碰撞率
22:09 - 22:12
But there's benchmarks online they can show you that
但⽹上的benchmark能向你们展示这类数据
22.12-22.14
even though XXHash is actually the fastest here
虽然XXHash是这⾥⾯速度最快的那个
22:14 - 22:19
It actually still gets a as good as a collision rate as CityHash and FarmHash
但实际上和CityHash以及FarmHash相⽐，它的碰撞率依然⾮常不错
22:20 - 22:24
So in our own system today we're using XXHash as much as possible
So，在我们⾃⼰的数据库系统中，我们会尽可能多的去使⽤XXHash
22:25 -22:30
So any questions about that kind of hash function just takes a arbitrary key spits back a
value, yes
So，Hash函数其实就是拿到⼀个任意的key，然后计算出⼀个值返回给我们，你们对此有任何
疑问吗？请问
22:43 - 22:47
His statement which is when I'm not heard before is that
他所说的内容我之前并未听过
22:48 - 22:59
It's possible that someone could give a data in such a way, they know the values would
always hash to the same thing
他说的确实是可能的，有⼈会以某种⽅式给出⼀个数据，他们知道这些值经过hash后，始终会
得到相同的东⻄
23:00 - 23:04
And therefore you would have a potential denial service attack ,
因此，你们可能会遇到DOS攻击（服务拒绝攻击，DDOS：分布式服务拒绝攻击）
23.04-23.10
because you're causing the collision rate to be super large
因为你让碰撞率变得超级⼤(知秋注:在知道这些值hash后得到相同结果后，拿来做攻击，造成请
求处理排队，但这些⼜不是同⼀个请求)
23.10-23.12
and now for it's taking longer to run your queries
So，它就得花更⻓时间来执⾏你的查询了
23:12 - 23:13
All right,let's talk about this
好了，让我们来讨论下这个
23:14 - 23:17
So one is in the database world at least the database stuff we're talk about here
So，在数据库系统的世界⾥，⾄少在我们所讨论的数据库中
23:18 - 23:21
The users are trusted
⽤户都是受信任的
23.21-23.25
meaning I'm running Postgres in own shop or whatever system in my own hardware
这意味着当我在我⾃⼰的硬件上运⾏PostgreSQL时
23.25-23.29
whoever is supposed to give me access to that has already betted me and trusted me
给我访问权限的那个⼈已经赌我这个⼈是可信的，他相信我
23:29 - 23:31
So I'm not gonna be that malicious
他觉得我不是那种恶意的⼈
23:31 - 23:35
Two you also provided a seed when you do these hashing
第⼆点，当你们在进⾏hash的时候，你们也要提供了⼀个seed(知秋注:种⼦，具体⻓成什么样，
造成什么影响，我们不知道)
23.35-23.39
so that one unless that's hard code you may not know exactly what that is
对于这个seed，你们可能并不清楚⾥⾯具体是什么东⻄
23:39 -23:47
And then three you may say all right what if I'm in a cloud system, and I you know
someone is malicious that way
然后，第三点，如果我们使⽤了某个云系统，并且你知道有些⼈是怀着恶意的
23:47 -23:51
Well Google doesn't care or Amazon don't care, because you're the one paying for the
hardware
Well，⾕歌不在意，Amazon也不在意，因为你是为硬件掏钱的⼈
23:51 - 23:52
So if you give me keys
So，如果你把key给了我
23.52--23.55
then hash to the same thing and your collision rate is super long
如果我想hash到同⼀个值，并且你的碰撞率⼜很低
然后hash到同⼀个值，并且你的碰撞率极⾼，产⽣的处理链会很⻓
23:55 - 23:59
Now your query takes a long time and they're just clocking your money
现在你查询花了很⻓⼀段时间才完成，这些云服务商会对你进⾏计费（有些云服务器商是按照时
间算钱）
24:00 - 24:04
So I'm sure you could think of attack that does this
So，我觉得你们可以将其认为是某种攻击所造成的
24:04 - 24:07
But for what we're talking here in terms of the system, nobody cares
但对我们现在所讨论的这种系统⽽⾔，没⼈会去在意这个
24:07 - 24:13
Again there's databases that will encrypt the data at rest on s3 or EBS buckets
S3或EBS bucket上的数据库会对数据进⾏加密
24:13 - 24:14
That's a whole separate thing from this
它是与之完全分离的东⻄
这是⼀个完全独⽴的东⻄，和我们聊的不是⼀个东⻄
24:17 - 24:18
There's another question or now
你们现在有其他问题吗？
24:19 - 24:19
Okay
24:21 - 24:27
Again, there are encrypted databases. People are spending a lot of money to worry
about these things
这些都是加密型数据库，⼈们会在安全上⾯花费⼤量的⾦钱
24:27 - 24:30
Because databases are a big deal, I don't care at this point my life
因为数据库安全是件很重要的事情，但我并不在意
24:30 - 24:33
I'll get point and then they don't care,but now I don't care
我曾经对这些⼈提过出我的观点，但他们并不在意，所以我现在也不在意
24:34 - 24:37
Alright, so again we're not writing hash functions,
So，再说⼀遍，我们不会去⼿写hash函数
24.37-24.43
we're just gonna take one of these three or what you know in general we wanna take
xxHash and that'll be good enough
我们会从这三个中挑⼀个来⽤，⼀般来讲，我们会想去使⽤XXHash，对我们来说这就⾜够好⽤
了
24:43 - 24:46
Okay,don't write your own hash function, it's not worth your time
Ok，请不要去写你⾃⼰的hash函数，对你来说这是浪费时间
24:48 - 24:54
All right, so let's talk about now how do we use our hash function in our hashing scheme
to deal with collisions
So，现在我们来谈论下该如何在我们的hashing scheme中使⽤我们的hash函数来处理hash碰
撞问题
24:54 -24:58
So again what we're talking about here it doesn't matter what hashing function we're
using
So，再说⼀遍，此处我们所讨论的内容与我们所使⽤的hash函数并没有什么关系
24:59 - 25:03
Right, could be the slowest wanted to be the fastest one, all these hashing schemes will
still work the same
我们所使⽤的hash函数可以是最慢的那个，也可以是最快的那个，所有的hashing scheme的⼯
作⽅式其实都是⼀样的
25:04 - 25:07
Because this is what we're doing after we'd hash it after we jump to some location
因为这是在我们做完hash计算，跳转到某个位置时才做的
25:08 - 25:12
And now we got to figure out how do we deal with collisions or how to find that thing
that we're looking for
现在，我们要去弄清楚我们该如何处理碰撞问题，或者该如何找到我们要找的那个东⻄
25:13 - 25:17
So we're gonna first talk about be the most basic hash table you can have it called linear
probe hashing
So，现在我们⾸先要讨论的是我们所使⽤的最基本的hashing scheme，它叫做Linear Probe
hashing
25:18 - 25:25
And then we'll talk about some variants to improve on this potentially called Robin Hood
hashing and cuckoo hashing ,but they're all roughly based on on linear hashing
然后，我们会去谈论下它的⼀些变种，这些变种是在它的基础上进⾏改进，它们叫做Robin
Hood hashing和cuckoo hashing，它们全都是基于Linear hashing所修改的
25:25 -25:27
And again these are all static hashing schemes,
再说⼀遍，这些都是static hashing scheme
25.27-25.35
meaning we have to be told at the beginning when we when we allocate memory here's
the number keys that I expect a store
这意味着，当我们分配内存时，我们⼀开始就得知道我们希望保存的key的数量
25:35 - 25:38
And so that in some cases you actually can guess what this is
So，在某些情况下，你实际上可以去猜这个数字有多⼤
实际上，在某些情况下，我们可以猜出这个hash取模的基数有多⼤（知秋注：key模n，n就是这
个基数）
25:39 - 25:43
So when we do query processing and we're doing we're using the hash table to do joins
So，当我们在进⾏查询处理的时候，或者当我们使⽤hash table进⾏join操作时
25:43 - 25:50
I roughly know i hope to know, that how many keys I'm gonna have to hash a my hash
table and then i can allocate accordingly
我希望知道在我的hash table中我⼤概要对多少个key进⾏hash，然后我就可以进⾏内存分配了
25:50 - 25:52
If our hash table gets too full,
如果我们的hash table容量快满了
25.52-25.57
and we'll see what that means essentially means we have an infinite loop or all our slots
are filled
本质上来讲，我们是遇到了⼀个⽆限循环，或者是填满了所有的slot
也就是说，我们有⼀个⽆限循环，或者我们hash table中所有的slot被填满了
25:58 - 26:04
Then that means that we have to double we have to increase the size and essentially
double the size of the hash table
这意味着，我们必须对hash table的容量进⾏扩容，本质上来讲是将hash table的容量扩展到原
来的两倍
26:04 - 26:11
And then basically take all the keys in the first hash table and copy them over to the
second hash table which is obviously super expensive to do
基本上来讲，就是将第⼀个hash table中的所有key复制到第⼆个hash table上，很明显，这样
做的代价超级⾼（知秋注：所有元素要重新打散并hash存储，代价很⾼）
26:12 - 26:19
So ideally we can have a good approximation of you know what the upper bound is for
our hash table size
So，理想情况下，我们可以⼤概知道hash table的容量上限是多少
26.19-26.25
so that we don't have to do this to do this regrowth or rebuilding
这样我们就⽆须去做这种扩容的操作了
26:25 -26:29
All right, so again linear probe hashing sometimes called open addressing
So Linear probe hashing有时也被叫做open addressing（开地址法）
26:29 - 26:31
This is sort of the most basic hash table you can have
这是我们所能使⽤的最基本的hash table
26:32 - 26:36
And all it is it's just a giant table of slots
它就是⼀个⼤型的slot表
26:37 - 26:41
And we use our hash function to jump to some offset or add some slot in that table
我们会通过我们的hash函数来跳转到该表中的某个offset值上，或者是在该表中添加⼀些slot
26:42 - 26:45
So if you use Python and you allocate a dictionary
So，如果你在使⽤Python时，分配⼀个Dictionary（字典，⼀种可变容器）
26:45 - 26:50
This is essentially the same data structure you're gonna get underneath the dictionary,
it's gonna be a linear probe hashing table
本质上来讲，在Dictionary背后，它的数据结构和Hash table其实是⼀模⼀样的，它其实就是⼀
个使⽤了linear probe hashing的hash table
26:51 - 26:57
So the way we're gonna resolve collisions is that if we hash into a slot and we find
something that's already there
So，我们解决hash碰撞的⽅法是，如果我们进⾏hash计算所得到的slot位置上已经有数据在上
⾯了
26:58 - 27:00
if I try to insert something there
如果我试着往⾥⾯插⼊数据
27.00-27.06
we just keep scanning down to the next position and keep going until we find the first
open slot
我们会挨着这条数据往下扫描，直到我们遇到下⼀个能够插⼊数据的空slot为⽌
27:06 - 27:10
And then that's where we insert our the entry we're trying to add
然后，我们就将我们试着添加的那个entry插到这个slot上
27:10 - 27:12
So now when I want to do a lookup,
So，现在当我想做⼀次查找时
27.12-27.15
I would then land at the slot where I should have been
我会先找到hash函数所计算出的那个offset值所在的地⽅
27.15-27.18
and I keep scanning down till I either find an empty slot
接着我会继续往下扫描，直到我找到⼀个空的slot（知秋注：如果找到的是⼀个空的slot，即没
有找到key所对应的value）
27.18-27.22
meaning the thing I'm looking for is not there or I find the thing that I was looking for
这意味着，我要找的东⻄并不在那个位置上，或者是我找到了我要找的东⻄
27:22 - 27:25
Right, it's it's it's pretty basic. It's pretty straightforward
这⾮常基本也⾮常简单
27:26 - 27:28
All right, so again so let's say that these are the keys we want to add
So，假设这⾥是我们想要添加的key
27:29 - 27:35
All right, we have some hashing function that's gonna take these keys and map them to
our slot to a slot in our hash table
然后，我们通过某种hash函数将这些key映射到我们hash table上的slot中
27:35 - 27:38
All right, so this first one we hash A, that it lands here
So，⾸先我们对A进⾏hash，接着，我们将A放在hash table中这个位置
27:38 - 27:45
And again inside of this thing it's a <key>|<value> pair we have the original key that we
inserted plus whatever the value that we wanted to be
这个slot上存放的东⻄我们称之为key/value pair（键值对），它上⾯保存了我们所插⼊的原始
key以及我们想要的值
27:45 - 27:50
So it's a pointer to another tuple will turn another page or you know some other arbitrary
value
So，它是指向另⼀个page上tuple或任意值的⼀个指针
27.50-27.51
it doesn't matter
这没关系
27:51 - 27.55
The reason why we have to store the key the original keys
之所以我们必须保存原始key的原因是
27.55-28.00
because when we start doing lookups and we have to scan down, you know start looking
at multiple entries
因为当我们开始查找时，如果有多个entry的话，我们必须往下扫描
28:00 - 28:04
We need to know whether the thing we're actually looking for were in a slot is the key
that we actually want
我们需要知道在该slot中所存放数据中的key是否是我们实际想要的那个
28:04 - 28:08
Because it's not always guaranteed to be exactly where we hash into the table
因为这没法⼀直保证我们根据hash所计算到的表中的位置就是我们想要的那个准确位置
28:09 - 28:10
So if we hash B
So，如果我们对B进⾏hash
28.10-28.11
B lands here
B就会落在hash table中这个位置
28.11-28.14
now we hash C, C lands here
现在我们对C进⾏hash，C就落在了这个位置
28.14-28.18
but again A is occupied the slot where it c wants to go
但A已经占⽤了C想要的那个slot
28:18 - 28:23
So all we do is just jump down to the next position and then insert our entry into there
So，我们所做的就是跳到下⼀个位置，然后将我们的entry插到那个位置上
28:25 - 28:25
Same thing for D
对D也是如此
28.25-28.27
D once we go over C is, so we put it here,
D想放在C当前所在的位置，但是该位置被C占了，So，我们只能将它放在这⾥
28.27-28.29
E wants to go where A is, it can't
E想放到A所在的位置，但它没办法做到
28.29-28.30
because A is there
因为A已经在那⾥了
28.30-28.31
can't go over C is,
它也不能去C的位置
28.31-28.32
can't go over D is,
更没法去D的位置
28.32-28.33
so it ends in here
So，它最终只能放在这⾥
28.34-28.36
,and the last one for F down here
最后剩下的那个位置就是留给F的了
28:36 - 28:39
Right, pretty straightforward,
⾮常简单
28.39-28.41
and this is actually really fast to do
这实际上速度⾮常快
28:41 -28:43
So I'm not showing the relations between pages here
So，我并没有展示这些page间的关系
28.43-28.46
but you just think of this is like I have allocated a bunch of pages
但你们可以这样想，我分配了⼀堆page
28:47 - 28:50
And I know how to go from one position to the next
我知道如何从⼀个位置跳到下⼀个位置
28.50-28.52
I know that if I'm in the last slot in my page
我知道如果我处于该page的最后⼀个slot处时
28:53 - 28:56
I know what the next page is to jump to continue the search
我知道要跳转的下⼀个page，以便继续搜索
28:57 - 28:57
yes
请问
29:02 - 29:02
yes
没错
29:06 - 29:07
Yeah, so because this is a circularbuffer
SO，因为这是⼀个圆形buffer
29:08 - 29:09
So if I see his question is say,
So，他的问题是
29.09-29.10
I want to insert G ,
假设我想去搜索G
29.10-29.12
G wants to go E
G想放在E所在的位置上
29.12-29.14
so it goes here it can't go there
So，它发现那⾥已经被E占了，所以没办法放在那个位置上
29.14-29.17
it looks back around and continues here
它只能往回看，然后看到这⾥有个空位，于是插到这⾥⾯
29:17 - 29:18
All right,yes
请问
29:23 - 29:24
yes
没错
29:26 - 29:28
The question is what if I delete a value
So，他的问题是如果我删除了⼀个value会怎么样
29.28-29.28
boom
Boom！
29.28-29.28
next slide
下⼀位
29.28-29.30
excellent okay
很棒
29:30 - 29:34
So let's say that we want to delete C,what do we do
So，假设我们想删除C，那我们该怎么做呢？
29:34 - 29:35
Again we hash it,
我们对它进⾏hash
29.35-29.38
we with land where a is, that's not what we want
hash完后，我们找到的是A所在的位置，这并不是我们想删除的那个数据
29.38-29.41
cuz ,again now we this is why we have the exact key in there
这就是为什么我们这⾥⾯要放具体的key在这⾥的原因了
29:41 - 29:42
So you can say a is not equal to C
So，我们就可以这么说，A并不等于C
29.42-29.43
this is not what I want
这并不是我们想要的那个数据
29.43-29.44
scan down ah C equals C
继续往下扫描，Oh，C等于C
29.44-29.48
that's the one I want, this is what I wanted to delete
这是我想要去删掉的那条
29:48 - 29:51
So let's say I just do something really simple, and just remove it
So，假设我想做些很简单的事情，⽐如直接将C移除
29:53 - 29:54
What's the problem with this
这⾥的问题是什么呢？
29:58 - 29.59
exactly
没错
29.59-30.00
I do a lookup on D
当我根据D进⾏查找时
30.00-30.03
I look in here, I see empty slot
此处我看到了⼀个空的slot
30.03-30.08
and I think all right my search is done it's not what I want, even though it's the next slot
down
我认为我的搜索已经完成了，但这个并不是我想要的那个，即便这个D所对应的数据是在下⾯的
slot中
30:08 - 30:10
So there's two ways to handle deletes
So，有两种⽅式能处理删除操作
30:11 - 30:14
So the first is that you just add a tombstone marker
So，第⼀种⽅式就是添加⼀个tombstone（墓碑）标记
30:14 - 30:21
You basically take wherever C used to be just a little tombstone that says, there's not an
entry there's not a logical entry here
基本上来讲，我们在C原来在的位置上放⼀个tombstone标记，并表示，这⾥并没有⼀个logic
entry
30:21 - 30:25
But physically consider this slot occupied
但从物理上来讲，我们认为这个slot是被占⽤了
30:25 - 30:27
So that one I do a lookup and I land here I say,
So，当我查找D的时候，我会落到这个有tombstone标记的slot上⾯
30.27-30.31
well there's no data here, but it's not really an empty slot,
Well，这个slot中并没有数据，但它确实不是⼀个空的slot
30.31-30.36
let me jump down to the next one and that's the thing that I wanted
让我往下跳到下⼀个slot上，这⾥⾯放的才是我想要的东⻄
30:36 - 30:37
Of course, what's the problem with this,
这⾥⾯的问题是什么呢？
30.37-30.41
now we are you know we're wasting space,
现在，正如你们所看到的，我们浪费了空间
30.41-30.44
you know we have to go clean this up later on eventually
我们稍后得将这个给清理掉
30.44-30.47
so this is going to contribute to our fill factor
So，这就得⽤上我们的fill factor（填充因⼦）
30:48 - 30:52
The other option is do data movement essentially recognize that I have an empty slot
here
另⼀个选项就是进⾏数据移动，本质上来讲就是意识到这⾥我有⼀个空的slot
30:52 - 30:56
And just move everybody up,one
然后将所有的数据往上移动即可
30:57 - 30:59
And then that way I land exactly where I want to go
然后我就能准确地找到我想要的那个数据了
31:01 - 31:02
Now in this example
在这个例⼦中
31.02-31.03
this is this works fine,
这样做没问题
31.03-31.06
because E maps exactly to where E would be found
因为E准确地映射到了E应该在的位置
31.06-31.08
F maps exactly where it would be found
F准确地映射到了F所在的位置
31:08 - 31:10
But again remember I said it's a Circular buffer
但要记住，我说过这是⼀个圆形Buffer
31:11 - 31:15
So technically B might actually want to go here
So，从技术上来讲，B实际上应该是在这⾥
31:16 - 31:20
Because it is it is technically comes after F even though physically it doesn't
因为从技术上来讲，它应该是在F后⾯的，虽然物理上不是
31:22 - 31:23
So in this case here
So，在这个例⼦中
31.23-31.27
if I end up moving B around, this was gonna be bad, this is gonna be incorrect
如果我最终将B移到这个位置，那么这可能会很糟糕，这可能会导致某些错误发⽣
31:27 - 31:31
Because B hashes in that location
因为我们对B进⾏hash后，得到的位置是在上⾯那个位置
31:31 - 31:35
So had I moved it here I would then do a lookup and B and find nothing
So，如果我将B移到下⾯，然后当我进⾏查找的时候，找到B原来所在的位置，我会看到那⾥什
么东⻄也没有
31:36 - 31:37
Because as I scan down
因为当我向下扫描时
31.37-31.39
I'm going down this direction
我们会沿着这个⽅向向下
31.39-31.42
I would not know to loop back around and look at the previous entry
我不会去回过头去看之前的entry
31:42 - 31:46
So in practice mostly we'll just do tombstones
So，在实战中，⼤部分情况下，我们就会标记⼀个tombstone（墓碑）
31:47 - 31:49
Because it's this data movement thing is actually complicated
因为数据移动这种⽅式实际上⾮常复杂
31:49 - 31:52
There's another good example of why you want to have the original key in here
这就是另⼀个很好的例⼦，这就是为什么我们要在这⾥⾯放原始的key的原因了
31:52 - 31:55
Because in order to figure out whether it's okay for me to move this up by one
因为为了弄清楚将数据往上移⼀格对我来说是否Ok
31:56 - 32:05
I need to go to a hash and decide whether the thing the location where it should be is
less than or up above where I want to move it to
我需要进⾏hash计算，并判断它所在的位置是在我想要移动的位置的上⾯还是下⾯
32:05 - 32:08
Because if I now go above it
因为如果我现在将它上移
32.08-32.13
then I'll get false negatives, all hash the thing and not actually find it
那么我们就会得到⼀个错误的移动⽅向，在hash之后，我们就没办法真正的找到我们想找的那
个值
32:16 - 32:23
So for some operations or some instances of a hash table in our database system
So，对于我数据库系统中的某些操作或者hash table的某些实例来说
32:23 - 32:25
We don't worry about deletes at all
我们根本不担⼼删除这种问题
32:26 - 32:29
Again, if I'm building a temporary data structure to do a query
如果我构建⼀个临时数据结构来进⾏查询
32.29-32.30
I'm not gonna delete
我不会进⾏删除操作
32:30 - 32:34
So I'm just gonna scan my input data populate my hash table and then start using it
So，我扫描下我的输⼊数据，并填充到我的hash table中，然后开始使⽤它
32:34 - 32:37
If you're using as a hash index though
如果你们使⽤⼀个hash索引
32.37-32.38
then we could have deletes,
那么我们就可以进⾏删除
32.38-32.40
and we have to account for this
并且我们需要对此进⾏计数
32.40-32.42
and tombstones is probably the most easiest way to do this
tombstone可能是我们⽤来处理这个问题时所⽤到的最简单的⽅法
32:43 - 32:43
yes
请问
32:54 - 33:00
Yeah, so his statement is, he said movement is probably the worst way to handle this,
So，他想说的是数据移动可能是处理这种问题的最糟糕的⽅式
33.00-33.03
because I can't say it again I can't move things I'm above it up
再说⼀遍，我没法把数据往上移？你想说的是这样？
33:07 - 33:07
Why Not
为什么不？
33:14 - 33:14
But that's okay
这没问题
33.14-33.16
so if you go back here when we first start of it right
So，我们回到这⾥，回到我们刚开始的地⽅
33:21 - 33:22
Correct
正确
33.22-33.25
so right no not necessarily right so so F wanted to go here
So，F想跑到E所在的这个slot
33:26 - 33:27
But E's there
但E已经占了那个位置
33.27-33.28
So it's okay to move that up by one
So，将这些往上移动⼀格是Ok的
33:29 - 33:31
E wanted to go here
E想要放到这个位置
33.31-33.31
but I can't
但我没法这么做
33.31-33.33
so I it's okay for moving up by one,
So，将它们往上移⼀格是Ok的
33.33-33.34
and then D wanted to go here
然后，D想跑到这⾥
33.34-33.35
It can
它可以做到
33.35-
So move up by one
So，将D上移⼀格
33:36 - 33:41
So my toy example here, it's it is perfectly safe for me to move up everybody up by one
So，在我这个例⼦中，对我⽽⾔，将每条数据往上移动⼀格是安全的
33:42 - 33:44
But the point I'm trying to make is we can't actually move B,
但实际上我们没法去移动B
33.44-33.46
because b actually wants to hash to there,
因为实际上我们通过对B进⾏hash，它想呆的位置是在上⾯
33.46-33.49
physically it's not contiguous logically it is
从物理上来讲，它不是连续存放的，但逻辑上讲它是连续存放的（圆形buffer）
33:49 - 33:50
So I should have have to moved it here,
So，我应该将它移动到下⾯这个位置
33.50-33.55
but exactly as you said I had to hash it in check to see, oh is it safe for me to move it
down here,
但我必须对它进⾏hash计算，这样就能知道对我来说将它移动到下⾯是否安全了
33.55-33.56
in this case no
在这个例⼦中，很明显答案是No
33.56-33.58
because the hash actually wants to go there
因为我们hash出的位置实际上是在上⾯这⾥
33:58 - 34:02
So as I go down one by one I have to say is it okay for me to move it up
So，如果我将它们每个都往下移⼀格，那么对我来说将它们往上移是Ok的。
So，像这样之前⼀次接⼀个下移存储的，那么对我来说将它们往上移是Ok的
34:04 - 34:04
Yes
请问
34:20 - 34:24
Yes question is in mice against super similar example here
他的问题其实和这个例⼦很相似
34:25 - 34:27
It's sort of you know I only have six keys
这⾥我只有6个key
34.27-34.30
I can kind of estimate what the keys that slots I need
我可以预测出我所需要的slot的数量
34:30 - 34:33
In practice how do you actually estimate how many slots you need
在实战中，我们该如何预测出需要多少个slot呢？
34:34 - 34:35
In practice it's 2n
在实战中，它的⼤⼩为2n（n为我们所要保存的key的数量）
34.35-34.37
you have 2n the slots of the number of keys
即你的slot数量是你key数量的两倍
34.37-34.39
or n number of keys that you want put into it
或者slot的数量和你所放⼊key的数量⼀样，就是n
34:40 - 34:44
All right, and we'll see in in cuckoo hashing it's slightly different,
在Cuckoo hashing中，这有所不同
34.44-34.45
because they have two hash tables
因为它有两个hash table
34.45-34.47
but it practices 2N
但实战中，我们hash table的容量为2n
34:47 - 34:48
And then what happens is
接着，这⾥所发⽣的事是
34.48-34.50
when you if this gets too full this is now that filled
当这张表已经差不多被填满的时候
34.50-34.51
when you resize
即当你要对其进⾏扩容时
34.51-34.54
you double the number of slots，you goes up by two
你会将slot的数量变为原来的两倍
34:57 - 34:57
yes
请问
34:57 - 35:10 (学⽣提问，就能听出这些)
could you also like just track like the number of ships
35:10 - 35:14
All right, so his statement which you guys are amazing sideways
他的说法有点令我惊讶
35:14 - 35:20
He's saying couldn't I also just record the position aware how many steps I am away
from my original position
他说的是，我们能否记录下我们需要移动多少次才能从真正所在的位置回到我们原本应该在的位
置
35.20-35.22
and use that to determine whether say for me to move it
并通过这个来决定我是否该移动数据
35:23 - 35:26
Yes, this is called Robin Hood hashing, but we'll get to that in a second
没错，这被称为Robin hood hashing，我们稍后会讲这个
==========================================================
35:28 - 35:34
All right, the nice thing I want to talk about non-unique keys as well, and then we'll get
to his point about Robin Hood hashing
好了，接下来我想讲下⾮唯⼀key，然后再去讲下他所提的Robin hood hashing
35:35 - 35:39
So again in your algorithm class you probably when you discuss hash tables
So，在你们的算法课上，当你们讨论hash table时
35:39 - 35:41
You just assumed all the keys were unique,
你只会假设所有的key都是唯⼀的
35.41-35.43
for primary indexes this is fine,
对于主索引（primary index）来说，这是Ok的
35.43-35.46
but in practice in real data sets
但在实际的数据集中
35:47 - 35:48
We can't assume that the keys are unique
我们⽆法假设所有的key都是唯⼀的
35:48 - 35:50
So now we need handle them in our hash table
So，我们需要在我们的hash table中对它们进⾏处理
35:51 - 35:52
So there's two ways to do this
So，有两种⽅式可以做到这点
35.52-35.57
and I'll say that the two ways I'm describing can be used for any of the hashing schemes
that we're talking about today
这两种⽅式能⽤在我们今天所讲的任何⼀种hashing scheme上
35:57 - 35:59
They're not specific to linear hashing you can use them for anything
它们并不是主要应⽤在线性hashing上的，你可以将它们⽤在任何⽅⾯
36:00 - 36:04
So the first approach is just you maintain a separate linked list with all the values
So，第⼀种⽅法是，你维护⼀个单独的链表，上⾯保存了所有的值
36:04 - 36:09
So that you have say your key in whatever your hash table is in your slot
So，不管你hash table中的key是哪⼀个
36:10 - 36:22
And then set up pointing to the the underlying tuple whatever the thing that should be
pointing to, it instead points to the separate linked lists that have the values that of
course put the head off I will have the same key
然后这个key就会指向属于该key的单独链表，该链表上所保存的value对应的都是同⼀个key
36:23 - 36:29
So if I want to say the give me all the key value pairs for the key XYZ
So，⽐如说请给我key为xyz的所有key/value pair（键值对）
36:29 - 36:34
I just jump along this that follow this pointer, and then I know that everything inside there
has that key
我只需跟着这个指针，然后我们知道key为xyz的所有东⻄了
36:35 - 36:39
The other approach which is probably the most common approach is just to store
redundant keys
我们再来看下另⼀种⽅法，它也是最常⻅的⼀种⽅法，即保存冗余的key
36:39 - 36:45
So all you do now is just in your slot array, you're just duplicating the keys over and over
again
So，你们所做的就是在你的slot数组中，不断复制这个key
36:46 - 36:48
Right, so the key XYZ ABC appears multiple times
So，XYZ和ABC之类的key会多次出现
36.48-36.51
and each one has a unique value I'm just recording that multiple times
它们每个都有⼀个唯⼀值，我只是多次记录到它们
36:51 - 36:53
And So linear probing everything still works
So，使⽤linear probing hashing，所有东⻄都能正常⼯作
36.53-36.58
that you know if I'm looking for something, I do my lookup
如果我要查找某个东⻄
36:58- 37:05
and I just keep scanning down until I find either empty slot or the thing that or yet I find
empty slot, but I know my search is done
我会⼀直往下扫描，直到我扫描到了⼀个空slot为⽌，但我知道我的查询已经结束了
37:06 - 37:11
So if I'm saying find me one key incident with Elif key value key equals XYZ
So，假设我想去找到key为XYZ所对应的数据
37.11-37.13
I just could jump here and find exactly what I want
我只需跳到这⾥，并准确地找到我想要的那个数据
37:13 - 37:17
But if I want all of them, I got to keep scanning down until I hit an empty slot
但如果我想要对应key的全部数据，那我就得继续往下扫描，直到我扫到⼀个空slot为⽌
37:18 - 37:22
Again, in practice everyone does the the second one
在实战中，所有⼈都使⽤的是第⼆种⽅式
37.22-37.26
even though it's you know slightly wasted storage,
虽然它稍微浪费存储空间
37.26-37.27
because you're repeating the key multiple times
因为我们会多次记录重复的key
37.27-37.31
where is it that top one you only store the key once
然⽽在第⼀种⽅法中，我们只需记录这个key⼀次即可
37:31 - 37:34
All right, so let's talk about the what he was sort of proposing to do
So，现在让我们来谈论下他之前想做的事情
37:35 - 37:46
we want to see this in a slightly different way rather than deciding when to shift around
rather than deciding how to move bulk movement they had a bulk moving of keys
through our hash table
我们想换种⽅式来移动key，⽽不是使⽤之前那种环形hash的⽅式来移动这些keys
37:46 - 37:50
Let's look at how to use these positions to move individual keys
让我们来看下该如何使⽤这些位置来移动这些单独的key
37:51 - 37:55
So Robin Hood hashing was proposed in in 1985
So，Robin hood hashing是在1985年被⼈提出的
37:56 - 37:58
It's one of those papers that came out that no one really paid attention to
这是出⾃当时⼀篇⽆⼈问津的paper
37:59 - 38:02
And then in the last decade or so it's showed up on Hacker News a couple times
然后在过去⼗年，它在Hacker News上出现过⼏次
38.02-38.06
, and now people are trying out in the different systems
现在，⼈们试着在不同的系统上对它进⾏试验
38:06 - 38:17
So again Robin Hood is this folklore tale from England about this this rogue who would
steal from rich people , and give it to the poor people in immediate medieval England
Robin hood（罗宾汉）是⼀个英国的⺠间传说，讲述的是⼀个劫富济贫的侠盗的故事
38:17 - 38:19
So that's essentially what we're doing here in our hash table
So，本质上来讲，这也是我们在我们的hash table中所做的的事情
38.19-38.22
we're gonna have poor keys steals slots from rich keys
我们会让那些"poor" key从"rich" key⼿上偷取slot
38:22 - 38:24
And I'm defining poor versus rich
我来定义⼀下rich和poor
38.24-38.30
meaning the number of positions you are from a way from where you should have been
when you first hash into the hash table
Number of positions（距离数）表示的是你所在的位置与你第⼀次进⾏hash所计算出的位置间
的距离差
38:30 - 38:32
Right ,so to do this
So，为了做到这点
38.32-38.33
the basic idea is that ,
它的基本思路是
38.33-38.42
we're trying to balance out throughout the entire hash table to minimize the likelihood
that we have one key that's really far away from where it should have been
我们会试着对整个hash table进⾏平衡，试着让每个key尽可能靠近它原本所在的位置
38:43 - 38:46
So that we overall were sort of balanced and everybody's equal
So，这样我们就能做到每个key都是平等的了
So，这样我们就可以做到每个key是相对平衡的（知秋注：即对所有的key来讲，在全局状态
下，尽可能快的找到它们，⽽不是针对于某⼀个）
38:47 - 38:50
So let's say this, so again we want to sort these same six keys
So，我们想将和之前⼀样的6个key插⼊到hash table中
38.50-38.51
A goes here
我们将A放在这个位置
38:52 - 38:54
But now as he was suggesting
但现在正如他所提议的那样
38.54-38.59
we're also can now store the the number of jumps, we are from our original position
when we first hashed into this
我们也可以记录下我们实际所在的位置与第⼀次hash所算出的原始位置所差的跳转次数
38:59 - 39:02
So our table was empty in the beginning
So，在⼀开始，我们的hash table上什么也没有
39:02 - 39:03
So when we hashed A
So，当我们对A进⾏hash处理时
39.03-39.06
it landed this position here, it was exactly where it should have been
我们就会将它放在这个位置，这其实也是它原本应该呆的位置
39:06 - 39:08
So we said it's it's it's number jumps to be zero
So，它的跳转次数就是0
39:09 - 39:10
Same thing with B
我们对B也进⾏同样的操作
39.10-39.15
B hashes here, it lands at the top, so its position is zero
我们对B进⾏hash，然后B就放在hash table的顶部，So，它的位置就是0
39:16 - 39:17
So now we insert C
So，现在我们将C插⼊到hash table中
39.17-39.21
and A occupies the slot where it wants to go
然⽽，A占⽤了C所去的那个slot
39:22 - 39:24
But in the very beginning
但在最开始
39.24-39.29
The number jumps of A is from his optimal position is zero
A当前所在的位置距离它原本所在的位置的距离是0
39:29 - 39:31
And at the beginning C landed here,
在⼀开始，C应该是放在这⾥的
39.31-39.35
so at this point C's number of slots where C is from where it wants to go is 0
So，此时，C所想在的位置与计算出的slot的位置的距离就是0
39:35 - 39:40
Since 0 equals 0, we're gonna leave A alone, and make C go down to the next slot and
take that
因为0等于0，我们将A放在那⾥，然后把C放到下⾯的⼀个slot上（知秋注：距离相等，就往下
⼀位放置）
39:41 - 39:44
And now we see we updated its position counter to be one step
现在，我们可以看到，我们要去更新它的距离counter，将counter值设置为1
39:44 - 39:48
So it's one step away from where it should have been when it first hashed into the table
So，它当前所在的位置距离它第⼀次通过hash所得出的位置相差1个单位
39:50 - 39:53
So now we do this with D ,D lands here
So，现在我们对D也进⾏同样的操作，D会落在这个位置上
39:53 - 39:56
E wants to go in this slot, but C occupies that
E想放在这个slot中，但C已经占⽤了
39:56 - 40:01
But C's counter is 1 and 1 is greater than 0
但C的counter中的数字是1，1⽐0⼤
40:01 - 40:04
So a higher counter means you're more poor
So，counter中的数字越⼤，这也就表示你越"poor"
40.04-40.05
I mean you're farther away from where you want to be
即你离你原本想在的位置越远
40:05 - 40:11
so C would be farther away from where from its where it wants to go, where D would go
if D took this position
So，C的距离counter中的值⽐D想要落在此处的距离counter的值要⼤（即C[1]>D[0]）
40:11 - 40:14
so we don't let D take this slot, and we make it go down here
So，我们不会让D使⽤这个slot，⽽是让它使⽤下⾯的slot
40:16 - 40:18
so now I look at E
So，现在我们来看下E
40.18-40.20
E started up once go A is
E所想放的位置已经被A占了
40.20-40.21
again 0 equals 0,
这⾥0等于0
40.21-40.22
so we leave A alone
So，我们将A放在那⾥
40.22-40.24
1 equals 1
接着，1等于1
40:24 - 40:25
so we leave C alone
So，我们将C留在那⾥
40.25-40.28
but now E's counter is 2
但现在E的counter的数字是2
40.28-40.32
because this it's you know 0 1 2 jumps away from where it wants to go
正如你所看到的那样，它需要跳转2次才能到达它原本该在的位置
40:33 - 40:37
so 2 is less than Suze greater than then 1
So，2⽐1⼤
40:37 - 40:40
so 2 is considered more poor than D
So，E要⽐D更"poor"
40:40 - 40:46
so it's it shoots D in the head steals its wallet steals its slot inserts itself here
So，所以说E就要去偷D所在的slot位置，并插⼊其中
40:46 - 40:49
and then now the insertion continues as D goes down to here
那么现在我们只能将D插⼊到E的下⾯了
40:49 - 40:50
and now we update its counter to be 2
现在我们将D的counter中的值更新为2
06-03
40:51 - 40.56
So again before we had A C D E
So，在此之前，我们已经将A、C、D和E放在了hash table中
40.56-40.58
but now on a Robin Hood hashing
但现在在Robin Hood Hashing中
40.58-41.00
E now closer where it wants to be
E当前所在的位置就和它想在的位置靠的更近
41.00-41.05
and D is as far the way than when it should have been
D⽐它应该在的位置更远
41:04 - 41:07
Because overall now and now we're more balanced
因为从整体来说，这样更加平衡
41:08 - 41:10
Same thing for f where f go here
对于F也是同样如此，F会跑到这⾥
41.10-41.14
2 is greater than 0
2⽐0⼤
41.14-41.17
so D stays where it wants to go, and F goes down here
So，我们把D放在D想在的位置，F则往下放
41:17 - 41:18
in the back yes
后⾯那位同学，请问
41:26 - 41:28
Yeah,statement is on a Robin Hood hashing
她想说的是，在Robin Hood Hashing中
41.28-41.31
the algorithm says
该算法表示
41.31-41.40
that it's better to have two keys be one position away from where they should have
been, rather than having one key be two positions and one key be zero positions
让两个key距离它们原本所应该在的位置⼀个单位远，⽽不是让其中⼀个key距离原来位置2个单
位远，另⼀个key则就在原来的位置上
41:40 - 41:41
Yes
所以，说的没错
41.41-41.43
I'm not saying this is the right thing to do
我并没有说这样做是对的
41.43-41.48
I'm saying this is this is one approach to handle collisions a different way
我只是说，这是⽤来处理hash碰撞的另⼀种不同的⽅式
41:48 - 41:53
I mean you're essentially trading off reads or writes
我的意思是，你们会在读或者写上⾯进⾏权衡
41:53 - 41:57
So now when I want to do a lookup on any of these guys Alright, any of these keys,
So，当我现在想在这些key中进⾏查找时（知秋注：指CEDF这四个key）
41:57 - 42:01
it's there's nothing one key that's gonna be all the way you know wrap around all the way
你知道它们（CEDF）中没有⼀个key是放在它最应该在的位置上
42:02 - 42:04
Right, everyone's gonna be on average the same distance
每个key所距离它应该在的地⽅的平均距离应该是⼀样
42:06 - 42:08
But in order to do that
但为了做到这点
42.08-42.13
that's making writes more expensive or inserts more expensive cuz now I have to write
more things
这会使得写⼊或者插⼊的代价更⾼，因为现在我需要写⼊更多的东⻄
42:13 - 42:14
So when I did this stealing here
当我在这⾥做打劫动作的时候
42:15 - 42:20
Let's say that I have to update this page, right there's a page split right here
我必须更新这个page，这个page在这⾥被拆分了
42:20 - 42:25
So I update this slot here on the first page to install e,so that's one write
So，我更新第⼀个page上的这个slot，在这个slot中插⼊E。So，这就是⼀次写⼊
42:26 - 42:29
And then now I got to come down here and do another write to insert D into this page
接着，我来到下⾯这⾥，这⾥我通过另⼀次写⼊，来将D插⼊到这个page上
42:30 - 42:33
Had I left alone like on a regular linear probe hashing
在常规的linear probe hashing这个⽅式中
42.33-42.35
I would only don't want one write to the page
我想表达的是只对该page做⼀次写⼊操作（后⾯就不需要再动了）
42:36 - 42:39
So again this seems like a really nice idea
So，这看起来似乎是⼀个很nice的想法
42.39-42.41
the research at least the modern research shows that
⾄少，现代研究表明（基于 Robin Hood Hashing算法的情况下）
42.41-42.46
especially for in-memory data structures that you pay a big penalty for a branch
misprediction
尤其是对内存中的数据结构来说，只要有⼀次条件误判，你就会付出巨⼤的代价
42:46 - 42:50
Because you have more conditionals to do these checks to see whether one should take
it from another one
因为在基于 Robin Hood Hashing算法的情况下，我们需要对更多的条件进⾏检查，看看能否将
⼀个放到另⼀个的位置上
42.50-42.52
and you're doing more writes and that's more cache invalidation
这样，我们就要做更多的写⼊操作，这导致更多的缓存⽆效
42:52 - 42:55
So in practice linear probing crushes everything still
So，在实战中，linear probing hashing依然碾压⼀切
42:56 - 42:58
It's still the fastest way to do this
在这⽅⾯，它依然是最快的⽅法
42:58 - 43:00
I think we're disk it's the same thing
我觉得我们磁盘所做的也是同样的事情
43:02 - 43:02
Ok
######################################################################
#####
43:05 - 43:08
Another approach to deal with collisions is
另⼀种处理hash碰撞的⽅法是
43.08-43.14
instead of doing linear probing and just keep scanning down, and possibly swapping
things as a Robin Hood hashing
这⾥我们不使⽤linear probe hashing，⽽是继续往下扫描，和Robin Hood Hashing所做的那样
去尽可能的交换位置
43:14 - 43:16
Well we just have multiple hash tables
Well，我们只是使⽤了多个hash table
43:17 - 43:22
And then we decide where we know which hash table to insert our key ,
然后，我们去决定我们该往哪个hash table中插⼊我们的key
43.22-43.25
you know is whatever which one has a free slot for us
即哪个hash table能提供给我们⼀个空余的slot
43:26 - 43:28
So that we don't have to do these potentially long scans
这样，我们就⽆须进⾏这些潜在的⽤时很⻓的扫描了
43:29 - 43:30
So that's what cuckoo hashing is
So，这就是Cuckoo hashing
43:31 - 43:36
So I've always mistakenly said cuckoo hashing was named after like a cuckoo clock
where the the the hand goes back and forth
So，以前我总是说错，我以为Cuckoo hashing的名字来源是布⾕⻦钟，它的钟摆会来回移动
43:37 - 43:43
And actually do with a cuckoo bird, the cuckoo bird is is known to to move itself from
one nest to another
实际上，它的名字是源⾃布⾕⻦，众所周知，布⾕⻦喜欢将它⾃⼰的蛋移到别的⻦巢⾥
43:43 - 43:46
But it steals another nest from another bird ,and that bird has to then move something
else
它喜欢偷借别的⻦的⻦巢来孵化⾃⼰的蛋
43:46 - 43:49
So we'll see how that works in a hash-table ,so that's what it means
So，我们来看下在hash table中这是如何做到的，这样你们就能理解它的意思
43:50 - 43.54
So lookups and deletions and under cuckoo hashing is always gonna be O(1)
So，在Cuckoo hashing中，查找和删除的时间复杂度始终是O(1)
43.54-44.03
meaning we're always gonna jump and when we do a look up, we're always jump to there
are hash tables and find exactly whether the thing we want is there or not
这意味着，当我们进⾏查找时，我们始终会跳转到hash table上，准确地找到我们想要的数据是
否在那⾥
44:04 - 44:05
We don't have to do any additional scans
我们⽆须做任何额外的扫描操作
44:05 - 44:07
But the inserts could be more expensive
但插⼊操作的代价可能会更加昂贵
44.07-44.11 ！！！！！
because now we may have again ping-pong or move keys all around
因为我们可能需要再次 ping-pong或移动keys（知秋注：要判断是在hashTable1中还是2中进
⾏存储等⼀些动作）
44:12 - 44:16
So let's look an extremely simple example with two hash tables
So，让我们来看下⼀个⾮常简单的例⼦，它⾥⾯⽤到了两个hash table
44:16 - 44:20
Again in practice most people use this just use two
再说⼀遍，在实战中，⼤多数⼈在使⽤Cuckoo hashing时，都只使⽤两个hash table
44:20 - 44:24
There are some people that use three beyond that it's sort of impractical and it's
unnecessary
有些⼈会⽤到3个hash table，这是不切实际的，⽽且也没必要
44:24 - 44:26
So two is always sort of the right number
So，我们使⽤两个hash table是绝对没有任何问题的
44:27 - 44:28
So let's say I want to insert a
So，假设我想插⼊A
44:29 - 44:33
So for every hash table I have in my cuckoo hashing setup
So，对于我的Cuckoo hashing中的每个hash table来说
44:33 - 44:36
I have to have a separate hash seed for my hash function
我必须为我的hash函数提供⼀个单独的hash seed
44:37 - 44:40
So I'm gonna take this key and hash it twice
So，我拿到这个key，然后对它hash两次
44.40-44.43
it's gonna be the same hash function like murmur or xx hash
这⾥我们可以使⽤同⼀个hash函数，⽐如Murmurhash或者XXHash
44:43 - 44:46
But I'm just gonna give it a different seed
但我会给它⼀个不同的seed
44.46-44.50
so that the for a given key it produces a different hash value
这样做的话，对于⼀个给定的key，它会⽣成不同的hash值
44:50 - 44:52
So I'm gonna hash A twice
So，我对A进⾏两次hash处理
44.52-44.53
my two CD hash functions
使⽤此处两个不同的hash函数来对其进⾏处理
44.53-44.55
and the first one's gonna land this position
So，使⽤第⼀个hash函数对A进⾏处理后，它会落在第⼀个hash table的这个位置上
44.55-44.57
and the second one's gonna land of this position
使⽤第⼆个hash函数对A进⾏处理，则落在第⼆个hash table上的这个位置
44:57 - 44:59
So at this point here my hash tables are empty
So，此时我的hash table⾥⾯什么也没有
45:00 - 45:01
So I can insert in either one
So，我可以将数据插在两个hash table中任意⼀个上⾯
45:02 - 45:02
So for our purposes
So，出于我们的⽬的
45.02-45.06
we'll just flip a coin we'll slide let's insert it in the first hash table here
我们会抛硬币来决定该在哪个hash table上插⼊数据，⽐如说我们将它插⼊到第⼀个hash table
上
45:07 - 45:08
In practice
在实战中
45.08-45.09
you can do more complicated things
你可以做些更加复杂的事情
45.09-45.12
you can say like ,alright well what's the fill factor for my hash table
⽐如，我的hash table中的fill factor（填充因⼦）是什么
45.12-45.15
maybe always choose the one that's less full
可能我们始终会选择那个不是那么满的hash table
45.15-45.21
or if you have metadata about the collision rate for your hash tables, you can make a
better decision
或者如果你有关于你的hash table相关的hash碰撞率相关的元数据，那么你就可以做出更好的选
择
45:21 - 45:23
As far as you know everyone just flips a coin, and that's good enough
据我所知，每个⼈都通过抛硬币来决定，这其实就很Ok了
45:23 - 45:26
Right, random is actually very good for a lot of things
实际上，对于很多事情来说，随机真的⾮常好
45:27 - 45:28
Alright, so I'll say I wanted insert B
So，假设我想插⼊B
45.28-45.31
same thing I'm gonna hash it twice
这⾥我进⾏相同的操作，我对它进⾏两次hash
45:31 - 45:33
First one goes to this slot where a is already Stored
我们计算完第⼀次hash后所得到的slot已经被A所占了
45.33-45.36
but the second one goes to an empty slot
但第⼆个hash函数所计算出的是第⼆个hash table上的⼀个空slot
45:36 - 45:38
So in this case here my choice is obvious right
So，在这个例⼦中，我的选择很明显
45.38-45.40
I always want to go to the one that's empty,
我始终想将我的数据插⼊到那个有空的slot的hash table
45.40-45.45
because I don't have to move anybody I just insert it there and I'm done
因为这样做，我就⽆须移动任何数据，我直接往空的slot中插⼊数据就⾏，这样就完事了
45:45 - 45:48
So that's our insert C, same thing I had it twice
So，我们再来插⼊C，我们对C进⾏同样的操作，对它进⾏两次hash
45:48 - 45:54
Well now the first hash function that's to this slot where A is ,and second hash function
maps to where B is
Well，现在我们在计算完第⼀个hash函数后所得到的slot上已经有A了，计算第⼆个hash函数所
得到的的slot被B占了
45:55- 45:57
So now I need to make decision which one I want to kill
So，现在我需要去决定我该杀死哪个
45:57 - 45.59
Again, let's just flip a coin
So，让我们抛硬币来决定吧
45.59-46.01
that's gonna be good enough
这样⾮常公平
46.01-46.04
and to make the demo work I'll pick this one, right
为了让demo能够正常⼯作，我选择这个
46:05 - 46:09
So we'll go now steal that slot from B and insert C
So，现在我们从B⼿上打劫⾛slot，并在该位置上插⼊C
46:10 - 46:12
So now I think B out
So，现在我觉得B已经不在原来的位置了
46.12-46.15
now I gotta go put it back in the other hash table
现在，我需要将它放到另⼀个hash table中
46:15 - 46:17
So I'm gonna hash it with the first hash function
So，我使⽤第⼀个hash函数对B进⾏hash
46.17-46.19
and that's gonna tell me where I go to insert it
通过这个函数，它就会告诉我该把B插在哪⾥
46.19-46.23
but we as we saw when we try to insert it before it one of the go where air a was
但在我们试着将它插⼊之前，A已经占了那个位置
46:24 - 46:29
And so we have to now steal its slot put B there and now put A in the other one
So，现在我们就应该去抢⾛A的slot，将B放上去，然后将A放到其他地⽅
46:30 - 46:34
So we hashed that it comes over here, and now we've landed to an empty slot
So，我们对它hash⼀下，然后将它放到这个空的slot中
46:34 - 46:36
And so now our insert is to C is Done
So，现在我们对C的插⼊就已经完成了
46.36-46.39
because everybody has landed in a free slot
因为我们将所有数据都放进了⼀个空闲的slot中
46:40 - 46:40
Yes
请问
46:44 - 46:50
His question is which is absolutely the answer is yes, can this have cyclic behavior, can
you be stuck in an infinite loop, absolutely, yes
他的问题是，我们所使⽤的这种⽅案是否也具备环形hash的特点，我们是否会在⼀个⽆限循环
中卡住，说的没错，确实如此 （知秋注：即递归碰撞，也有可能在碰到最后⼀个元素后，⼜碰
到最初那个元素去了）
46:51 - 46:54
So in that case you have to recognize where what your starting point was
So，在这个例⼦中，你必须分辨出你的起点在哪
46:54 - 46.57
So if you come back around see wait a min I've seen this slot before
如果你回过头来看下，你会说：我之前已经看到过这个slot了
46.57-46.59
and there's something there and I can't put anything in there
并且这个slot中已经有东⻄了，我没法将其他东⻄也放在⾥⾯
46.59-47.02
I'm stuck in an infinite loop,so that's when you resize
因此，我就会卡在这个⽆限循环中。so，这需要我们进⾏扩容
47:06 - 47:07
Okay
47.07-47.11
so again in practice
So，在实战中
47.11-47.12
everyone always does just two hash tables
所有⼈始终只使⽤两个hash table来做这些
47.12-47.22
and you want to allocate this in such a way that, you know the likelihood that you have a
cycle is minimized
我们想以这种⽅式来进⾏分配，即将这种循环尽可能最⼩化
你想以这种⽅式来进⾏分配的话，你知道你需要去尽可能最⼩化递归碰撞所带来的影响
47:22 -47:22
Okay
47:24 - 47:29
So now all of the hash tables that we talked about so far are, again where static hash
tables
So，⽬前为⽌我们所讨论的所有hash table都是静态hash table
47.29-47.34
meaning I need to know approximately the size of the number keys I want to store
ahead of time
这意味着，我需要提前知道我想要保存的key的⼤概数量
47:34 - 47:45
So I know how to allocate it, you know allocate it to be large enough today that I
minimize collisions, and I don't have infinite loops or get completely full
这样我就知道该如何进⾏分配，我所分配的hash table⾜够⼤能够容纳下这些key，并且最⼩化
hash碰撞，这样我也不会遇上⽆限循环或者是hash table被完全填满的情况了
47:46 - 47:48
Alright, so again as he's pointed out before
正如他之前所指出的那样
47.48-47.50
if you now have to resize it
如果你需要调整hash table的⼤⼩
47.50-47.54
either grow larger which is more common ,but also shrinking if you want to reduce the
size
要么进⾏扩容（这是较常⻅的做法），或者就是缩容（如果你想减⼩hash table的容量的话）
47:54 - 47:57
You essentially have to rebuild the hash table entirely
也就是说，你必须重建整个hash table
47:58 - 47.59
Right, we'll talk about consistent hashing
So，我们以后会去讨论⼀致性hash算法
47.59-48.04
There's hashing schemes we are hashing functions or methods, we can talk about later
in the semester when we talk about distributed databases
有些hashing scheme或者hash函数之类的，我们会在这学期稍后⼀段时间讨论分布式数据库的
时候对它们进⾏讨论
48.04-47.07
that don't have to resize the whole thing
我们⽆须调整它们整个的⼤⼩
48:07 -48:12
But for a hash tables inside our database system, we are got to rehash everything
但对于我们数据库系统⾥⾯的hash table，我们就得对⾥⾯的所有东⻄重新hash⼀遍
48:12 -48:14
I rebuild our hash table
我得重构我们的hash table
48.14-48.19
because now we change the number of elements when we mod n the hash value
因为我们已经修改了我们在取模时所⽤到的n的⼤⼩（n代表的是元素的数量）
48.19-48.24
that means things aren't that you know, we're in one bucket or one location before one
slot ,now could be in another slot
这就意味着我们之前是将数据在某个bucket或者某个slot上的，但现在，这些数据可能就放在另
⼀个slot中了
48:24 - 48:26
And I you know everything's gonna go out of whack
这样⼀切就会出问题
48:26 - 48:28
So in practice you have to rebuild from scratch
So，在实战中，我们必须从头开始重新构建
48:29 - 48:31
So this is what dynamic hash tables are trying to solve
So，这也是动态hash table所试着解决的问题
48.31-48.38
that they're gonna be able to resize themselves on demand without having to rebuild the
entire thing
它们能够在⽆须重建整个东⻄的情况下，根据需要调整⼤⼩
48:38 - 48:40
Most basic one is a chained hash table
其中最基本的案例就是chained hash table
48.40-48.43
and this is what people most think of when they have a hash table
这也是⼈们最常使⽤的hash table
48:43 - 48:45
But I want to talk about 2 more complicated scenes
但我想谈论的是两个更为复杂的例⼦
48.45-48.49 ！！！！！！！
from the 1980s that are still used today extendable hashing and linear hashing
从1980年代到现在依然被使⽤的就是extendible hashing和linear hashing
48:51 - 48:55
All right, so chained hashing or chained hash table or bucket hash table
So,chained hashing也叫chained hash table或者bucket hash table
48:56 - 49:05
It`s an dynamic hash table we're gonna maintain linkedlist of buckets, for values that
map to the same ,or keys that map to the same dies that are part of the same key
对于⼀个动态hash table ，我们会维护⼀个包含了buckets的linkedlist ，通过将具有相同hash
key的所有元素放⼊相同的bucket解决冲突。
49:06 - 49:13
So when you allocate a hash map and Java and the JVM, you get one of these this is the
the default data structure that they use
So，当你在Java或者JVM中分配⼀个hashmap时，这就是它们所使⽤的默认数据结构
49:14 - 49:17
So the way they're gonna deal with collisions is that
So，它们处理hash碰撞的⽅法是
49.17-49.21
they're gonna just keep appending to the end of this bucket list
它们会在该bucket list的末尾继续追加
49.21-49.23
so each bucket chain can grow forever
So，每个bucketchain都可以永远扩容下去
49:23 - 49:26
Because you just keep adding more and more buckets, the linked list gets even larger
因为我们只是不停地添加bucket，链表就会变得越来越⼤
49:26 - 49:27
And of course
Of Course
49.27-49.32
this can obviously degenerate to a essentially a sequential scan
很明显，这也就是说这可以退化为循序扫描
49.32-49.36
because all my keys map to the same bucket A bucket chain
因为我的所有key都映射到了同⼀个bucket或者⼀个bucket chain上
49:36 - 49:37
then my bucket grows forever
然后，我的bucket就可以永远扩容下去
49.37-49.39
and then I'm just doing a linear search
那么我只需进⾏线性搜索即可
49.39-49.42
and I'm no better than just you know reading from a table
这种做法⼏乎等同于从⼀张表中读取数据
49:42 - 49:44
So insertions and deletions are pretty straightforward
So，插⼊和删除操作都相当简单
49.44-49.49
because you're just modifying the buckets, you're not actually modifying the slot array
因为你修改的只是bucket，你实际上不会去修改slot array
49:49 - 49:51
All right, so again it just looks like this,
So，它看起来像这样
49.51-49.53
we have our slot array these map to buckets
我们将我们的slot array映射到bucket上⾯
49.53-49.58
and then any single time I want to do an insert saying to this this bucket chain here
然后，当我每次想去做⼀次插⼊操作时，⽐如将之插⼊到这个bucket chain中
49:58 - 50:00
If my last bucket is full
如果我最后⼀个bucket满了的话
50.00-50.01
I just allocate a new one
那我就再分配⼀个新的bucket
50.01-50.06
and I keep appending things until here until I to know till I run out of space and allocate
the next one
我会在这后⾯继续追加东⻄，直到我的新分配的bucket⼜满了位置，那么我再分配下⼀个
bucket就⾏
50:06 - 50:08
So you can think of these buckets are just pages
So，你们可以将这些bucket当作是page
50:09 - 50:12
Right, in the table heap or on the heap file,
在table heap或heap⽂件中
50.12-50.18
and I was allocated new pages and chain them together using page IDs to figure out how
to you know traversal along it
我会分配新的page，并将它们链接在⼀起，通过使⽤page id来弄清楚该如何遍历它们
50:19 - 50:22
Yeah, this is pretty straightforward this is pretty easy to implement
这种做法⾮常容易，也⾮常容易去实现
50:23 - 50:26
This is actually pretty easy also to make thread safe
实际上，我们也很容易做到线程安全（thread safe）
50.26-50.37
because all I do is just take a latch on either the slot which is the the easiest thing to do,
or just the individual page, anytime I'm modifying it
因为在我任何时间对其修改的时候，我可以在slot上加⼀个latch，这是最简单的做法，或者是在
单独的page上加latch
50:37 - 50:38
So let's look at more complicated schemes
So，我们来看下更为复杂的scheme
50:39 - 50:42
So with extendible hashing
So，在extendible hashing中
50.42-50.45
We're gonna take the chained-hashing approach with the buckets
我们会采⽤使⽤bucket的这种chained-hashing⽅法
50:45 - 50:53？？？？？？
But instead of letting the linkedlist just grow forever, We're going to want to split them
我们会将bucket逐步拆分，⽽不是让它⾥⾯的链接永远扩容下去
与其让linkedlist永远增⻓下去，我们想要将它们逐步拆分
50:54 - 50.58
And the key difference here between rebuilding splitting and rebuilding is that
在这⾥，拆分和重建之间的重要区别是(知秋注:正常情况下，我们觉得既然拆分了，是不是要进
⾏⼀波扩容并全部重新hash，此处其实也差不多，只不过是对某个独⽴的局部进⾏的操作)
50.58-51.06
we're only gonna split the the chain that overflowed, rather than the entire data structure
entire hash table
我们只会将那些overflowed的chain进⾏拆分，⽽不是将整个数据结构（即整个hash table）进
⾏拆分
51:07 -51:08
So in order to make this work
So，为了让其正常⼯作
51.08-51.14
we're not allowed multiple slot locations in our slot array to point to the same bucket
chain
对于将overflowed bucket切分后的结果来讲，我们不允许该结果对应的slot array中的这⼏个
slot位置指向的是同⼀个bucket chain（知秋注：每⼀个bucket代表⼀个page，图中左侧所谓
的slot array其中存放的都是page id，它代表了它⾃身所管理的slot所属的范围，并在左侧数组
中进⾏数据范围体现）
51:14 -51:17
And that it'll make more sense when I show that in the next slide
当我在下⼀张幻灯⽚上展示时，你们会对此更有感觉
51:18 - 51:26
And the advantages again is that when we have to move data around, we're only moving
the the bucket that overflowed and not all the other buckets
它的优势在于，当我们不得不移动数据时，我们只移动那些overflowed的bucket，⽽不是所有
其他bucket
51:27 - 51:32
All right,so it's gonna look like a chain hash table instead I'm gonna add some additional
information
So，它看起来就像是⼀个chained hash table，但我⽆须添加⼀些额外信息
51:33 - 51:38
So the first I'm gonna have is this global counter that corresponds to the number of bits
So，⾸先，我要有⼀个全局counter，它负责bit的数量
51:38 - 51:44
We have to consider when we want to figure out what bucket to look at, what slot to
look at in our hash function
通过使⽤我们的hash函数，我们可以弄清楚我们要找的是哪个bucket，或者哪个slot
51:45 - 51:47
So in this example here we'll start with a global counter two
So，在这个例⼦中，我们将全局couter设置为2，并以此开始
51:48 - 51:53
And then for each bucket chain or each bucket, we're gonna have a local counter
接着，对于每个bucket chain或者是每个bucket，我们会给它们⼀个局部counter
51.53-51.57
that corresponds to the number of bits that we use to get to that location
它⾥⾯所记录的数字表示的是，我们需要看⼏个bit才能找到该位置
51:58 - 52:03
So in this case here, this first bucket has a local counter of one
So，在这个例⼦中，第⼀个bucket中的局部counter的值是1
52:04 - 52:07
So that means that we only need to look at one bit to address into it
So，这意味着，我们只需要看1 bit就能定位到这个bucket
52:08 - 52:11
And this is why if you look at 0 0 and 0 1
这就是为什么当你们在看00和01时
52.11-52.13
both of these guys map to the same bucket
它们俩都会映射到同⼀个bucket
52:14 - 52:16
Because the first bit 0 is the same
因为它们第⼀个bit都是0
52:16 - 52:19
Because this bucket has a number overflow we haven't had a split it yep
因为这个bucket存在overflow的情况，我们还没有对它进⾏拆分
52:19 - 52:22
Whereas the the other two buckets have 10 11
然⽽，另外两个bucket所拥有的分别是10和11
52.22-52.24
and that because they're local counters 2
因为它们的局部counter的值是2(这⾥的局部，请看PPT中的local)
52.24-52.25
that says we have to look at two bits
这也就是说我们得看两个bit才⾏
52:26 - 52:30
So the global counter you need to figure out what how many bits you need to look at
So，我们需要通过全局counter来弄清楚我们需要看⼏个bit来确定对应的counter
52:30 - 52:37
The local counter it's just for your own sanity internally to understand what the you
know, how did you get to the location where you're at
局部counter的作⽤是为了让你理解你该如何找到你要找的那个位置
52:38 - 52:42
Right, but you don't actually need this to figure out you know how did you look up in the
slot array right
但实际上，你在slot array中进⾏查找时，不需要⽤到这个
52:42 - 52:45
Because obviously you can't know what this is until you do the look up through the slot
array right
很明显，因为直到你在slot array中进⾏查找时，你才知道这个⼲什么⽤的
52:47 - 52:48
All right, so let's say I want to find A
So，假设我想查找A
52:49 - 52:50
So then again I'm gonna hash it,
So，我对A进⾏hash处理
52.50-52.54
I'm gonna produce some a bit sequence for my hash value
我所⽣成的hash值是⼀堆bit序列
52:54 - 52.56
And then I look at my global counter
接着，我来看下我的全局counter
52.56-53.02
and it says, how many bits do I want to examine in my hash function from a hash value
decide where do I want to jump to
它会表示，我想让它检查我的hash函数所⽣成的hash值中的前多少位，以此来决定我想跳转的
位置在哪
53:02 - 53:04
So my global counter is two
So，我的全局counter的值为2
5304-53.07
so I only need to look at the first two bits 0 1
So，我只需查看前两个bit，即01
53.07-53.09
I do my look up in my slot array
我在我的slot array中进⾏查找
53.09-53.11
look at 01
找到01
53.11-53.14
I follow the pointer and then I land to the bucket that I want
接着，我跟着指针，然后我就找到了我想要的那个bucket
53:14 - 53:17
And now I just do a sequential scan to find the entry that I'm looking for
现在，我只需进⾏⼀次循序扫描，以此来找到我想找的那个entry
53:20 - 53:21
So now let's say I want to insert B
So，假设我想插⼊B
53:22 - 53:24
So again global counter is 2
So，全局counter的值为2
53.24-53.25
I only need to look in the first 2 bits
我只需要看前两个bit
53.25-53.28
I land here follow slot array
根据slot array，我是落在了这个位置上
53.28-53.29
this guy had a free location
这个bucket上有⼀个空的位置
53:30 - 53:32
So it's safe for me to go ahead and sort that is never flow
在它没有溢出前，对我来讲，放就是，很安全！
53:34 - 53:36
But now I want to insert C
但现在我想插⼊C
53:37 - 53:39
First 2 bits are 10
它的前两个bit是10
53.39-53.41
follow this I land here
我根据slot array中所指向的位置，我落在了这⾥
53.41-53.44
but now I see that I don't have any more free entries in my bucket
但现在我可以看到，在我的bucket中，我并没有任何空余的entry⽤来保存数据了
53:45 - 53:46
I'm gonna overflow
这⾥就会发⽣overflow(溢出)
53:47 - 53:48
So now I have to split this
So，现在我必须对它进⾏拆分
53:49 - 53:53
So then the splitting process is I look at my global counter,and it's now set to 2
So，在拆分的过程中，我看到我的全局counter的值现在是2
53:53 - 53:55
So I'm going to increase that to 3
So，我想在将它增加到3
53:56 - 53:57
So that means I need to examine three bits
So，这意味着我需要去检查前3个bit了
53:57 - 54:02
So now I'm gonna double the size of my slot array to now count for 3 bits
So，现在我对我的slot array扩容到原来的两倍，现在就可以处理3bit的情况了
54:03 - 54:05
Again, this operation is cheap
这种操作的代价很低
54.05-54.07
because this is just an array of pointers
因为这只是⼀个指针数组
54:07 - 54:10
So I take a latch on that protect it, resize it, and then put it back in
So，我可以在上⾯⽤⼀个latch来保护它，调整完⼤⼩，再将数据放回去
54:11 - 54:14
So it's not like I need to move around any of the data here which is the more expensive
part
So，我⽆须移动bucket中的数据，也就⽆须花费很⼤代价
54:15 - 54:17
So now like my global counter is 3
So，现在我的全局counter的值是3
54:18 - 54:24
And I'm gonna split this by then now examining the 3 bits instead of 2
现在，我想将这个bucket进⾏拆分，这⾥我所使⽤的是前3个bit⽽不是前两个bit
54:24 - 54:28
And to figure out which hash table or slot they belong to
以此来弄清楚它们是属于哪个bucket或者是slot
54:28 - 54:31
So this guy just slides down, I restructure this thing
So，变化如图所示，我对此处的bucket进⾏了重构
54.31-54.35
I just split the data that was stored between that single page
我将保存在这些单个page上的数据进⾏拆分
54:35 - 54:39
I remap everybody based on the the local counter
根据局部counter中的值，我将它们重新映射
54:40 - 54:44
So this guy up here and we still only care about one bit
So，对于此处的这个，我们依然只看第1个bit
54.44-54.46
so there's two slots that map to it up there
So，这⾥有两个slot映射到右边局部counter为1的bucket上
54.46-54.49
and two slots down here that also map to where again where the first bit is zero
下⾯也有两个slot映射到这个bucket上，它们的第⼀个bit都是0
54:51 - 54:54
So then now it's now I want to go back and try to insert C
So，现在我想回过头去试着将C插进去
54:54 - 54.56
So now I look at three bits
So，现在我们来试着使⽤3个bit来找到C所插⼊的位置
54.56-55.02
that tells me I want to look at this position here, I follow the pointer and then I'm be able
to insert into it
我会告诉我想插⼊的位置在哪，我跟着它的指针，然后我就能找到插⼊的位置了
55:02 - 55:06
So again this this movement here look like it was kind of expensive like sliding around
这种来回滑动所付出的代价看起来很昂贵
55:07 - 55:11
But all I'm doing is just splitting that one page I had before to make another page
但我所做的其实就是拆分我之前拥有的那个page，然后弄出另⼀个page
55:11 - 55:16
So it's 2 page writes plus the pages you have to update for the slot array
So，这⾥要对两个page进⾏写⼊，以及我们要对相应的slot array（这俩page的）进⾏更新
55.16-55.17
in the back,Yes
后⾯那位同学，请问
55:22 - 55:27
Her question is is it not considered to be expensive to remap the slot array to all the new
pages
她的问题是，将slot array上的slot与所有新的page进⾏重新映射，这样做的代价是否昂贵
55:28 - 55:28
No
No
55.28-55.34
because all I'm really doing like these are still at the same page ID in the files on disk
因为它们依然保存在磁盘⽂件中的同⼀个page id下
55:34 - 55:44
So now I'm just updating this again it's a single array updating the values now point to
,you know where the data is actually stored
So，现在我做的只是更新这个slot array中所指向的数据的实际存储位置
55:44 - 55:47
So this operation is cheap, moving pages is expensive
So，这种操作的代价是很低的，但移动page的代价是很⾼的
55:49 - 55:58
yes yes
请问
55:58 - 56:01
So her question is what if say the first one fills up
So，她的问题是，假设第⼀个page被填满了
56.01-56.03
what would happen
这会发⽣什么呢？
56.03-56.05
well now I would split it
Well，我会对其进⾏拆分
56.05-56.07
and again the local counter is one
再说⼀遍，这⾥的local counter的值是1
56:08 - 56:10
So we would increment that to two
So，我们会将其增加到2
56:11 - 56:13
Now yeah, so now it's split on two
So，现在它会根据两个bit来进⾏拆分
56:13 - 56:18
So now it would be 00, 01, 00, 01
So，现在就变成了00，01，00，01
56:18 - 56:24
So anybody with 00 here, these two entries would point to the same thing and 0101
point of the same thing
So，任何以00开头的值会指向这个bucket，任何以01开头的值会指向另⼀个bucket
56:27 - 56:33
Ok, humors like ,ok we'll get to that, deletes, yes deletes are basic reverses this
没错，删除操作其实就是将插⼊操作进⾏逆向执⾏
56.33-56.34
the back yes
后⾯的同学，请问
56:41 - 56:46
His question is are you storing the entire page ID page in the slot array here or is it just
a page ID
So，他的问题是我们是将整个page的slot array还是只是存个page id？
56:46 - 56:47
It's just a page ID
我们只保存page id
56:48 - 56:53
In the bucket this is this each bucket would be a page
每个bucket就是⼀个page
56:54 - 56:54
yes
请问
57:03 - 57:05。。。。。
This question is what is it relation to be in a hash table and a buffer pool
他的问题是hash table和buffer pool之间的关系是什么
57:05 - 57:08
So at a high level I'm ignoring that
So，从⼀个⾼级层⾯来讲，我是将它们忽略的
57:09 - 57:13
In practice, depending on whether you want it to be durable to disk
在实践中，这取决于你是否想将它持久化在磁盘上⾯
57:14 - 57:19
You would allocate a page just as you would for a a table Right, a slotted page
你会为⼀个table来分配⼀个slotted page
57:18 - 57:21
In your buffer pool and you can store a bucket page in there
在你的buffer pool中，你可以保存⼀个bucket page在⾥⾯
57:22 - 57:24
Same thing, the buffer pool doesn't know doesn't care
同样，buffer pool 不知道也不在意你⾥⾯放的是什么
57:25 - 57:27
You just say give me a page
你只需说，给我⼀个page
57.27-57.31
here's the page ID and hand you back some memory address and you write some data in
there
它就会给你⼀个page id，以及内存地址，你可以在上⾯写⼊⼀些数据
57:31 - 57:36
It doesn't know whether it's part of a table or a part of a hash table like this, like a data
table or a hash table
它也不知道，这是⼀个数据表的⼀部分，还是⼀个hash table的⼀部分（知秋注：buffer pool中
可能存储的是⼀张表下涉及的多个page的数据条⽬，也可能是多个表下的部分数据条⽬）
57:39 - 57:41
So again all the same eviction algorithms you would use
你们会使⽤相同的移除算法（eviction algorithm）
57:41 - 57:45
Now you want to see like, how we're jumping around this and accessing our hash table
现在，你们想看的是，我们该如何跳到这个附近，以及该如何访问我们的hash table
57.45-57.50
It certainly look a lot different than how we jump through, and do the sequential scans in
a data table
这和我们如何在⼀张数据表内进⾏跳转和进⾏循序扫描时有很⼤的不同
57:50 - 57:52
So maybe you want different caching policies for them or eviction policies
So，你们可能会想使⽤不同的缓存策略或者是移除策略
57:54 - 57:54
Yes
请问
58:03 - 58:08
The statement is and I'm using three bits at this point here to map hash values to slots
他说的是，我这⾥使⽤了前三个bit将hash值映射到slot上
58:09 - 58:13
And then it tells me what offset to jump into, right
然后，它告诉我我该跳转到哪个offset值处
58:13 - 58:18
And then within that slot in this array, I would have a page ID that I can then follow to get
to the bucket
然后，在这个数组的slot中，我会有⼀个page id，我可以根据这个page id找到这个bucket
58:22 - 58:25
How's the mapping from page IDs to buckets work
page id该如何映射到bucket？
58:27 - 58:28
yeah,it should be one by one. yeah it is like
它应该是1对1的关系，没错，确实这样
58:29 - 58:32
There's I'm using the term bucket again instead of a page
这⾥我所使⽤的术语是bucket⽽不是page
58.32-58.35
because it this could be in memory it could be back by disk
因为它可以放在内存中，也可以放在磁盘上
58.35-58.36
it doesn't matter
这都没什么关系
58:36 - 58:41
But you can think of if it was backed by disk, then this these are the page IDs
但你可以这样想，如果它被写回到磁盘上，那么这些就是page id
58:42 - 58:45
And the bucket is a page, and they're synonymous
⼀个bucket就是⼀个page，它们是同义词
58:45 - 58:47
So the only thing I need to store here is page IDs
So，这⾥我唯⼀需要保存的东⻄就是page id
58:55 - 58.58
Absolutely statement is again going back up here
So，我们先回到这⾥
58.58-59.02
at this here my global bit counter is two
此处，我的全局counter的值是2
59:03 - 59:06
But I know that I haven't split this first page here it's local counters one
但我知道我还没有将此处第⼀个page进⾏拆分，它的局部counter值为1
59:07 - 59:10
So even though if I wanted to look up, I can look at two bits
So，即使如果我想去进⾏查找，我可以只看前两个bit
59.10-59.15
but in practice I only care about the first bit for this page here
但在实战中，我只关⼼这个page的第⼀个bit
59:15 - 59:18
So that's why these guys have the same page ID ,bucket id whatever you want
So，这就是为什么你们会有相同的page id和bucket id的原因了
59:20 - 59:22
They can map to the same location,
它们可以映射到同⼀个位置
59.22-59.23
because they have not split yet
因为它们还没有被拆分
59:26 - 59:27
It's quite
说的不错
59.27-59.28
the statement is which is correct
他说的是正确的
59.28-59.34
it`s after we do a reach a page, we just do a linear scan to find the thing we want,
absolutely, yes
当我们找到⼀个page时，我们会通过⼀次线性扫描来找到我们想要的东⻄。So，你说的没错
59:36 - 59:37
Saving this isn't that expensive
这样做代价是否昂贵？
59:39 - 59:41
Again, if I have a billion tuples
再说⼀遍，如果我有⼗亿个tuple
59.41-59.46
then doing that lookup to scan eight kilobyte page is nothing
然后，我去对8kb⼤⼩的page进⾏扫描，其实根本不算什么
59:46 -59:50
And they say all right, I want to be a bit more crafty, you've got smarter
我想设计更多的策略，这样你可以变得更加的智能（知秋注：通过这些策略可以快速的找到我）
59.50-59.55
Well maybe I store a filter or some little precomputed information at the top
可能我要在顶层存储⼀些过滤算法（hash算法之类的）或者预先计算好的信息（page id所管理
的hash后值的范围）
59:55 - 59:58
It says the key look you know here's the list of keys that I have
假设这⾥是我所拥有的key的列表
59:59 - 01:00:01
It doesn't tell you where they are, it says that you have them
它不会告诉我们它们在哪，它只是说我们有这些东⻄
01:00:01 - 01:00:02
So you do that quick lookup to see whether it's there
So，我们可以通过上⾯聊的这种⽅式进⾏快速查找，⽤来确定它们是不是在那⾥
01:00:03 - 01:00:08
But like that linear scan is going to be super cheap compared to reading it from disk, or
having sequential scan entire data set
但⽐起从磁盘中读取数据或者是按顺序扫描整个数据集来说，这种线性扫描所付出的代价⾮常的
低（知秋注：⾸先确定了它在哪个page id所管理的slot array⾥⾯，在对该slot array进⾏⼀个
线性扫描，代价很低）