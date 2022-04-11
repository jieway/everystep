# 03 Database Storage I

## 1. 如何构建 DBMS 

如何在数据库中保存数据并允许从数据库中执行查询以及处理新数据。

![20220411234344](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220411234344.png)

上图是课程⼤纲，此前已经讨论了关系型数据库。现在要逐个学习该数据库的不同部分，也就是存储，查询执行，并发控制，恢复，最后是分布式数据库。本节主要讲磁盘管理，也就是如何讲数据存储到磁盘文件中。此后需要考虑提供哪些 API 给上层系统。最后开始添加功能，最终拥有一个 DBMS 。

## 2. 存储结构层次图

![20220412000026](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412000026.png)

从上至下，速度逐渐降低，容量逐渐增加，价格逐渐降低。

![20220412000302](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412000302.png)

划线之上的是易失性存储，之下的是非易失性存储。也就是非易失性存储断电后数据丢失，而非易失性存储断电后数据依旧存在。

使用数据的时候需要将数据从非易失性存储中移动到易失性存储中。在易失性存储中数据支持快速随机访问，也就是可以快速跳转到该存储设备中的任意位置。也就是访问不同位置数据的时间开销是一样的，但是在非易失性存储中，寻址是以块为单位，而非字节。字节寻址，例如想要读取第 64bit 位置的数据，那么只能读取到第 64 bit 位置中的数据。但是在非易失性存储中，如果想要读取第 64bit 的数据需要先获取存放该数据的页，一页 4kb ，然后再从中获取想要的数据。此外在非易失性存储中连续读取比随机读更高效，因为磁盘需要旋转定位。一般来说机械磁盘的工作方式是让磁头臂在磁盘上移动进而访问数据，每次访问新的位置的时候都需要移动磁头臂到那个位置，时间开销很大。SSD 没有这些问题，但是存在其他问题。

![20220412001429](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412001429.png)

通常来讲，分割线以上的东西成为内存，以下的称为磁盘。

![20220412002243](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412002243.png)

上图是不同设备访问一个 64bit 数据的耗时表，不同的表可能在数字上有所差异，但⼤体相同。最重要的是这些存储设备之间的访问耗时的不同。这门课主要研究如何最小化磁盘读取数据的影响。

数据库系统向应用程序提供一种整个数据库存在内存中的错觉。内存是有限的所以并不能将数据库全部放进入，这就需要来回交换了。通过一系列技巧来简化影响，例如同时允许多个线程读取，再例如增加缓存等。

## 3. 磁盘

![20220412003219](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412003219.png)

最底层的是磁盘。

![20220412003338](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412003338.png)

其内部是 page ，有时称为页面，有时称为块，二者是同一个东西。

![20220412003413](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412003413.png)

接下来在内存中的是缓冲池。系统中更高层的，例如执行引擎，查询引擎会向缓冲池发送请求。例如读取 page 2 的内容，如果该页面不在内存中那么回去磁盘中的 page 目录中查找然后将其加载到内存中。

![20220412003647](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412003647.png)

加载后的结果：

![20220412003726](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412003726.png)

接下来几节课要关注的部分：

![20220412003916](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220412003916.png)

## mmap

mmp 在操作系统中叫做文件映射，也就是直接从磁盘上获取文件，将文件页面映射到进程的地址空间中。

现在，我就可以对这些内存地址进⾏读写这并不是操作系统所引⼊的内存
我可以对它进⾏写⼊
接着，最后我可以让操作系统对其进⾏写⼊，并将其写回磁盘
接着，最终我可以让操作系统将之写出，通过执⾏⼀个 Sync并将其写回到磁盘上
So本质上来讲，我们放弃了数据在上内存以及硬盘上来回移动的控制权
⽽是让操作系统来帮我们管理这些
从⾼级层⾯来讲，它看起来像这样
在磁盘⽂件中，我们有⼀些page
接着，在内存中，操作系统有它⾃⼰的虚拟内存⻚⾯表以及物理内存
接下来会发⽣什么呢？
假设应⽤表示要去读取page 1
它就会去虚拟内存中进⾏查找
我们得到了个Page Fault（缺⻚异常）
并表示这些东⻄在物理内存中并没有备份
它仍然在磁盘⾥⾯
我们要将它取出来，并将它放到物理内存⻚⾯中去
然后，更新我们的page 表让它去指向该内存地址
So，如果我继续⾛下去，想去读取page 3
我会经历相同的过程
即我将它放⼊内存
接着，应⽤程序就可以做它想做的事情了
但现在假设我要去读取page 2
那现在的问题是什么
现在没有空闲的物理内存来存放这个page
因此，我需要判断这些⻚⾯中我该移除哪个
当我做这件事的时候，我不得不让数据库系统停⽌请求该page 的线程
因为，现在操作系统的磁盘调度程序要从磁盘中拿到这个数据，并将它放⼊内存中
我们可以从应⽤程序的⻆度来弄清楚，数据库可能要去读取某些并没有放在内存中的东⻄
因此，我可以将它交给另⼀条线程去做
so 这条线程会停下来，我不会
因为我始终想去试着做有⽤功
18.52-18.56
because I want to mitigate the stalls，when I have to go out the disk
因为我想减少停顿的时间，所以我不得从读取磁盘的⼯作中抽身出去
18.56-18.57
right
18.57-19.01
but essentially the operation doesn't know exactly what the hell we're doing
但实质上来讲，操作系统并不知道我们要做什么
19.01-19.02
doesn't know anything about what the database system is doing
它并不知道数据库系统正在做什么
19.02-19.05
it just sees a bunch of reads and writes to pages
它只是看到了对这些⻚⾯所进⾏的⼀系列读写操作

03-02
19.05-19.09
it doesn't understand any of the high-level semantics or what a query is, what data
wants to read
它也⽆须理解任何⾼级语义，或者查询要做什么，以及要去读取哪些数据
19.09-19.11
right
19.11-
so we want to by going with virtual memory by going with memory mapped files， we're
giving up controls or giving up knowledge that we have inside our database system over
to the OS. that's blind and doesn't know anything
so 我们想要虚拟内存通过mmap来映射到⽂件，我们⽆须⾃⼰控制，⽆须绞尽脑汁在我们的数
据库系统中⾃⼰来搞，交给操作系统就⾏了，⽆须关⼼它背后的任何事情
19.23-19.24
right
19.24-19.27
so if we're only reading data
So，如果我们只读取数据
19.27-19.31
there's a bunch of syscalls we can to mitigate some of these problems
那么我们就可以通过⼀系列系统调⽤来减少我们所遇到的⼀些问题
19.31-19.33
but if we start writing things
但如果我们开始写⼊某些东⻄
19.33-19.34
then it becomes problematic
那这就会变得很有问题
19.34-19.40
because now the OS doesn't know that certain pages have to be flushed out the disk
before other pages do
因为现在操作系统并不知道某些pages必须要在其他pages执⾏之前先从内存刷到磁盘中
19.40-19.44
again what we'll cover this later when we talk about logging and concurrency control
当我们讨论⽇志和并发控制时，再来介绍这个
19.44-19.47
but the OS sees yeah I need to write some data out
但OS表示我需要将某些数据写出（到磁盘）
19.47-19.48
means go ahead and write it out
意味着继续，写出到磁盘
19.48-19.50
it doesn‘t ’whether that was an okay thing to do or not
操作系统并不知道这么做ok不ok
19.50-20.01
so you get around this by giving it hints, like using madvise to tell it how you're gonna
access certain pages whether it's read sequential and random
so 你可以通过给它⼀些提示来解决该问题，例如使⽤madvise告诉它如何访问某些⻚⾯（⽆论
是顺序读取还是随机读取）
how to prevent pages from beginning paged out
如何通过mlock阻⽌pages被回收
20.01-20.06
although you can lock doesn't prevent it from getting written out which again could to
still be a problem
尽管你可以锁定但并不能阻⽌它被写出（到磁盘），这仍然可能是⼀个问题
20.06-20.08
and this is when you tell it to flush
这个 msync表示你在告诉它要将数据刷出到磁盘中
20.08-20.16
so I would say that memory map files of virtual memory sounds like a seductive thing we
want to use in our database system
我想说的是虚拟内存中的mmap听起来好像是⼀种⾮常诱⼈的东⻄，搞得我们很想将它运⽤在我
们的数据库系统中
20.16-20.19
and every year some student says why are we doing all this buffer pool thing
每年都有学⽣会问，为什么我们总做缓存池之类的东⻄
20.19-20.21
why can't we just let the os l do this for us
为什么不能让OS为我们做到这⼀点
20.21-20.23
and trust me you don't want to do this
相信我，你也不想让它来做这些
20.23-20.26
because it can be you have performance bottlenecks
因为你们可以会遇上性能瓶颈问题
因为你可能会在此处遇到性能瓶颈
20.26-20.27
and you'll have correct problems
你需要去解决这些问题
20.27-20.32
so there's not very many systems out there that actually use mmap
So，实际上并没有很多系统使⽤mmap
20.32-20.35
the most famous two are probably Monet DB and LM DB
最有名的两个可能就是Monet DB和 LMDB
20.35-20.38
level DB you ever heard of that from Google is another one
你以前所听过的⾕歌的level DB则是另⼀个例⼦
20.38-20.42
elastic search is a search engine or the document store
elasticsearch则是⼀个搜索引擎或者说是⽂档存储系统
20.43-20.47
then Raven DB is a JSON database at Israel
接着，Raven DB是⼀个JSON数据库
20.47-20.50
so all these guys use mmap
这些数据库都使⽤了mmap
20.50-20.55
but there's a bunch of extra stuff you have to do to prevent the OS from doing things
that are incorrect
但你仍然需要做⼀些额外的事情来防⽌操作系统做⼀些错误的事情
20.55-20.59
or there's certain limitations or assumptions you have to make about what the os is
allowed to do
或者你们必须做出⼀些限制或者假设来确保哪些事情操作系统可以做
20.59-21.01 砍掉不要
there's not right
这⾥并不正确
21.01-21.04
so this is like I mean there's a few more but there's not very many
看这⾥，是不是少了点什么，我的意思是应该有更多
21.04-21.06
so what's missing here
这⾥缺了什么呢？
21.06-21.08
we're missing all the major database systems
这⾥我们缺了所有的主流数据库系统
21.08-21.11
perhaps my sequel Oracle db2 sequel server
例如，MySQL，Oracle，DB2以及SQL server
21.11-21.12
none of those guys use mmap
这些数据库都没有使⽤mmap
21.12-21.13
cuz it's a bad idea
因为这是⼀个糟糕的想法
21.13-21.14
because you're giving up control
因为你们放弃了控制权
21.14-21.19
and the database can always do better then what the operating system could try to
figure out
并且数据库能⽐操作系统所做的要来得更好
21.19-21.23
so there's some systems that still use mmap in very limited cases
So，仍然有些系统在⾮常有限的情况下去使⽤mmap
21.23-21.26
this is actually out of date MIT I mean I talked to the guys last week
实际上，上个星期我还跟⼈讲过这个
21.26-21.28
memSQL got rid of mmap entirely
MemSQL已经完全摆脱了mmap
21.28-21.30
SQLite has a special engine
SQLite有⼀个特殊的引擎
21.30-21.35
you have to tell I want to use Mmap for some embedded devices that's what actually
you want to use
你必须告诉数据库你想在⼀些你所想使⽤的嵌⼊式设备上使⽤mmap
21.35-21.36
but default you don't get this
但默认情况下，你不会⽤到这个
21.36-21.39
influx DB only uses this for like read-only caches
Influx DB只有在只读缓存上才使⽤mmap
21.39-21.42
but the example I always like to give it talk about is MongoDB
但是我⼀直喜欢谈论的例⼦是MongoDB
21.42-21.45
everyone here has heard of MongoDB before right
在座的每个⼈之前应该都已经听说过MongoDB了
21.45-21.47
that's a famous JSON database system
这是⼀个⾮常著名的JSON数据库系统
21.47-21.53
so when they first started their default storage engine or storage manager was using
Mmap
当他们第⼀次开发他们的默认存储引擎或者存储管理器时，所⽤的就是mmap
21.53-21.56
and there's a bunch of crap they had to do to make that thing actually work
为了让这个引擎能够正常⼯作，他们做了很多⽆⽤功
21.56-22.00
but it was a it was a super button pimp was a big bottleneck for them
但对于它们来说，这是⼀个巨⼤的瓶颈
22.00-22.02
and then they raised put of money
接着，他们筹集了很多钱
22.02-22.06
and then the first thing they did was got rid of mmap and got it
他们⾸先⼲的事情就是摆脱mmap，并且他们做到了
22.06-22.09
you know bought this thing called wire tire which was a non-mmap storage engine
他们买了⼀个叫做WiredTiger的⾮mmap存储引擎
22.09-22.14
so if a map was a good idea， these guys had all the money in the world had some top
engineers they could have figured it out
如果mmap是⼀个好的想法，那么这群⼟豪⼿下的顶级⼯程师肯定能将它证明
22.14-22.15
but it was just it became untenable
但这种想法站不住脚
22.15-22.17
so if I die
So，如果我死了的话
22.17-22.22 （我太难了？？？）
in this class and you want to have a memorial something just say Andy hated Mmap
上这⻔课的同学可能会记住某事，那就是Andy痛恨mmap
22.22-22.24
you can you can even publicly say these things
你们可以公开说这些事情
22.24-22.24
okay
这没关系，Ok
22.24-22.29
we're actually working a paper at paper
实际上，我们正在写⼀篇论⽂
22.29-22.31
and they let this year and actually proving that is a bad idea
实际上，这篇论⽂的内容就是为了证明mmap是⼀个糟糕的想法
22.31-22.31
all right
22.31-22.37
so the main takeaway I want you to get from this is that the database system is oh it can
always do better
我想让你们从中得到的主要结论就是，数据库始终可以做得更好
22.37-22.40
it always knows exactly what the queries are trying to do
数据库总是很确定地知道查询要做什么
22.40-22.42
it knows what the workload looks like
它也知道⼯作负载是怎么样的
22.42-22.43
and therefore it can make the best decision
因此，它可以做出最佳选择
22.43-22.45
the operating system doesn't know anything
但是操作系统啥也不知道
22.45-22.48
it just sees a bunch of again reads and writes read and write calls
它只是看到了⼀些读写调⽤
22.48-22.54
so some of the things that we'll talk about maybe late in the semester that we can do if
we're not using mmap
我们会在这学期后⾯点的时候去讨论些东⻄，即如果我们不使⽤mmap，我们能做什么
22.54-22.57
is like prefetching，better replacement policies，better scheduling
例如：预取，更好的替换策略，更好的调度之类的东⻄
22.57-23.00
again the OS is sort of general purpose pick up truck
操作系统就像是⼀辆通⽤货⻋
23.00-23.05 **
whereas we can tune our system look like a Porsche or Ferrari to be exactly what we
want to do for application
然而我们可以像保时捷或法拉利那样调整我们的系统，使其完全符合我们的应用需求
23.05-23.09
so another main takeaway is that the operating system is not your friend
另⼀个主要想法则是，操作系统并不是你的朋友
23.09-23.11
we don't want to rely on up, we want try to avoid it as much as possible
我们并不想依赖操作系统，我们想试着尽可能的避开它
23.11-23.14
because it's gonna make decisions that could be hurtful to our database system
因为它可能会做出某些对我们的数据库系统有害的决策
23.14-23.16
so it's like a frenemy
因此，操作系统亦敌亦友
23.16-23.17
you need it to survive
你需要依靠它来存活
23.17-23.18
but ideally you don't want to talk to it
但理想情况下，你并不想和它说话
23.18-23.21
all right all right
23.21-23.23
so for database storage this is we're gonna focus on today
我们今天的重点就是数据库存储这块内容
23.23-23.26
so there's two main problems we have to take care of
此处我们必须关⼼的问题主要有两个
23.26-23.30
the first is how we're gonna represent the data on files on disk
第一个问题是是我们如何表示磁盘上文件中的数据
23.30-23.35
and the second is that how we actually manage the Move memory back and forth right
between the disk files and the buffer pool
第⼆个问题则是，我们实际该如何管理内存以及在硬盘间来回移动数据
23.35-23.40
so for this lecture today we're gonna focus on this problem
So，在今天这节课上，我们会重点讨论第⼀个问题
23.40-23.42
next class well stuff up in this problem
下堂课则会很好地解决这个问题
23.42-23.46
and then starting when we talk about buffer pools on Wednesday next week， we'll
focus on the second problem
接着，我们会在下周三讨论buffer 缓存池，并且重点关注第⼆个问题
23.46-23.46
okay
23.46-23.48
all right
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
23.48-23.50
so today's lecture again we're gonna go to that first question
So，今天这节课我们会去讨论第⼀个问题
23.50-23.54
how are we actually gonna represent the the database on files on disk
即我们实际该如何⽤磁盘上的⽂件来表示数据库
23.54-24.00
so we're first talk about how would organize the database across a sequence of pages
So，我们首先讨论如何在一系列页（pages）上组织数据库
24.00-24.04
now let's talk about how we're actually gonna store the pages inside those files
现在我们来讨论该如何将这些⻚存储在这些⽂件中
24.04-24.08
and then let's talk about what's actually the tuples look like inside those pages
然后，我们会去讨论这些⻚中的tuple看起来是什么样的
24.08-24.16
alright so we're gonna go sort of at a macro level and deep you know step down to you
know inside the data that we're actually storing
So，我们从宏观的⻆度出来，然后逐步深⼊到我们所存储的数据内部
24.16-24.18
all right
24.18-24.22
so at the end of the day, the database is just a bunch of files on disk
So，到头来，数据库其实就是磁盘上的⼀堆⽂件
24.22-24.25
some system stored the database as one file
某些系统⽤⼀个⽂件来保存数据库
某些系统将数据库存储为⼀个⽂件
24.25-24.26
like SQLite does that
例如SQLite就是这么⼲的
24.26-24.31
for the first homework you download that DB file that's the entire database and
capsulated it in that single file
你第⼀个作业中的db⽂件，其实就是整个数据库，SQLite将它封装在⼀个⽂件⾥⾯了
24.31-24.35
most other systems however store things in across multiple files
然⽽，其他⼤部分系统会将这些东⻄分为多个⽂件来保存
24.35-24.39
so here a look at like the the data directory from I see bone Postgres
So，来看下Postgres中的数据⽬录
24.39-24.41
you'll see a bunch of different directories and a bunch of files
你会看到⼀系列不同的⽬录以及⼀系列⽂件
24.41-24.41
right
24.41-24.45
you do this because you know databases could be very large like petabytes
你这样做是因为，数据库可能⾮常巨⼤，它⾥⾯可能有PB级别的数据量
24.45-24.50
and you don't want to you know you don't want to hit up the faucet faults and limitation
of a file into the size of a file
你不会想要对这样么⼤的⼀个⽂件来做错误修复（将所有数据局限在这么⼤的⼀个⽂件⾥）
24.50-24.54
so again the OS doesn't know anything about what's in these files
操作系统其实根本不知道这些⽂件⾥⾯有什么东⻄
24.54-24.57
it's just there's a bunch of binary data to the operating system
对于操作系统来说，这只是⼀堆⼆进制数据
24.57-24.57
they're not special
它们并没有什么特别之处
24.57-25.04
but the format for these data files are typically proprietary or specific to the database
management system
但这些数据⽂件的格式通常情况下都是专属于某个数据库管理系统的
25.04-25.09
so meaning you can't take a SQLite file plop it down inside a directory for MySQL
这就意味着，你⽆法将⼀个SQLite的⽂件导⼊MySQL中
25.09- 25.11
and I think MySQL is gonna not be able to read it
我觉得MySQL也没办法去读取该⽂件
25.11-25.14
right they're always specialized to whatever the software is
这些⽂件通常是专属于某些特定软件的
25.14-25.22
so these files for databse we're typically just gonna store them on top of the regular file
system that the OS provides us
这些数据库⽂件我们通常会存放在操作系统提供给我们的⽂件系统中
25.22-25.26
ext3 ext4 whatever windows net has now I forget
windows系统⽤的可能是Ex3或者Ex4，具体是什么我忘了
25.26-25.33
right these are just and the OS who sees a bunch of files and we rely on the file system
to provide us with basic readwrite api's
我们基于操作系统的⽂件系统所提供的基本读写API来对⽂件进⾏读写
25.33-25.42
in the 1980's, people did try to build database systems that use custom file systems on
raw storage devices
在1980年代，⼈们试着在裸存储设备上构建使⽤⾃定义⽂件系统的数据库系统
25.42-25.48
so like say you plop down a new hard drive instead of formatting it and you know setting
it up for NTFS or WinFS or xEt4
就好像是，你直接拿了⼀块新硬盘使⽤，⽽不是使⽤前先将它格式化并将它的格式设置为NTFS
或者WinFs或者ext4
25.48-25.55
for you say screw all that is give me the raw storage device and I'll manage what's
actually being stored in it myself
就好⽐说，直接给我裸存储设备，我⾃⼰来管理存储在上⾯的东⻄
25.55-26.03
some of the enterprise systems like that like enterprise meaning like high-end ones like
Oracle db2 and sequel server will still do this
某些⾼端的企业级数据库系统，例如：Oracle，DB2和SQL server依然这么做（知秋注：有⾃
⼰的⽂件管理系统）
26.03-26.09
but most of the new database startups are anything you gave him that's come out in the
last ten years or 15 years doesn't do this
但⼤部分近10年或者15年的新兴初创数据库企业并不会这么做
26.09-26.10
right
26.10-26.15
because it's the engineering effort to make your own custom file system for your
database system is not worth it
因为将⼯程师的精⼒都花在为你的数据库系统定制专属的⽂件系统，这并不值得
26.15-26.17
you get maybe like a 10% improvement
你在性能上可以得到10%左右的提升
26.17-26.21最后⼀个单词骂⼈被屏蔽了
but now you you know you're managing your own file system which is a big chaos
但现在你知道，你要⾃⼰去管理你⾃⼰的⽂件系统，这真的是个很⼤的坑
26.21-26.22
and it makes your thing less portable
这就⼤⼤降低了你东⻄的可移植性
26.22-26.27
cuz now you can't easily run it on Amazon and other other hardware providers
因为这样你就没办法将你的东⻄轻易地运⾏在Amazon服务器或者其它的硬件上了
26.27-26.32
so what we're building essentially is now again what is called a Storage Manager
现在我们所要构建的东⻄，本质上来讲，它被称为存储管理器
26.32-26.34
sometimes also called the storage engine
有时也被称为存储引擎
26.34-26.37
and then this is the piece of the software at the component in our database system
它是我们的数据库系统中的⼀个组件
26.37-26.43
that is responsible for maintaining our database files on disk
它负责维护我们在磁盘上的数据库⽂件
26.43-26.47
now we could do reads and writes
现在，我们可以进⾏读写操作
26.47-26.49
and let the OS schedule things
并让操作系统来进⾏调度⼯作
26.49-26.52
some of the more high-end database systems will actually have a shim layer above the
file system
某些⾼端数据库系统实际上在⽂件系统之上会有⼀个shim层
26.52-26.54
right right
26.54-26.58
that does allows the the database to do some disk scheduling
它允许数据库去做⼀些磁盘调度
26.58-27.03
you do this like I know I have a bunch of threads writing to blocks that are close to each
other
你这样做就像是通过⼀堆线程来对彼此邻近的区块进⾏写⼊
这就像是可以通过⼀堆线程来对彼此邻近的区块进⾏写⼊
27.03-27.06
I can maybe combine them together and do a single write request
我也可以将这些块合并，并做⼀次写⼊请求
27.06-27.08
right the OS can kind of do these things
操作系统可以做到这些事情
27.08-27.13
but again it doesn't know exactly what's above this doesn't know what the semantics of
the query above it
但操作系统并不知道在此之上的查询语义到底是什么
27.13-27.15
most systems don't do this and
⼤部分数据库系统不会去做这个shim层
27.15-27.17
then for the project we'll be working on here we don't do this
在我们所做的项⽬中，我们也不会去做
27.17-27.19
it's typically for the higher ones
通常这是在⾼级课程中做的东⻄
27.19-27.20
yes
请问
27.20-27.38
yes a question is I said that most databases and split up the file the database files into
multiple files
她的问题是，我之前说过⼤部分数据库会将数据库⽂件拆分为多个⽂件
27.38-27.41
because you don't hit the the file size limit of the operating system
因为你这样就不会遇上操作系统上的⽂件⼤⼩限制的问题了
27.41-27.44
is there any optimization for putting things in memory？
你想问的是，将东⻄放⼊内存时是否存在任何优化
27.44-27.55
yes just a file just the file have a limit for the amount of the size it can be in memory
她想问的是放⼊内存的⽂件⼤⼩是否有任何限制
27.55-27.59
with virtual memory，no
如果是虚拟内存，那就没有这种限制
27.59-28.04
when we talk to us to whatever the the swap size is what the OS could let you store
⽆论swap⼤⼩是多少，OS都会让你保存
28.04-28.08
but it's essentially limited the physical memory that's available to you
但本质上来讲，操作系统限制了你所能使⽤的物理内存的⼤⼩
28.08-28.19
her question is would be better to have a single file
她的问题是，使⽤⼀个⽂件是否要来得更好
28.19-28.23
because then you get the over you get rid of the overhead of having multiple files
因为这样你可以摆脱使⽤多⽂件所带来的开销
28.23-28.25
what you meaning the overhead
你所说的开销是什么？
28.25-28.30
like the inode that you're that you have to find it go open a file or what
例如：inode，你必须找到它，以此来打开⽂件的这种开销，或其他什么开销
28.30-28.40
okay
28.40-28.42
so you're talking like the metadata
So，你讨论的是元数据之类的东⻄
28.42-28.44
there I say minutes
这⾥我稍微讲下
28.44-28.45
if I have one file
如果我使⽤的是单⽂件存储这种情况
28.45-28.48
then I have one file name and I have one inode in my file system that points to it
那么，我就只有⼀个⽂件名，并且在我的⽂件系统中有⼀个指向它的inode
28.48-28.51
if I have multiple files that I have multiple inode entries
如果我使⽤的是多⽂件这种情况，那么我就会有多个inode
28.51-28.55
and each one has their own file name much a meditator you know referencing it
每个⽂件都有它们⾃⼰的⽂件名，这些inode会指向它们
28.55-28.57
but like that's what
但这看起来像是什么呢？
28.57-29.00
maybe a kilobyte of metadata it's nothing right
可能是1kb⼤⼩的元数据之类的东⻄，它很⼩，并且微不⾜道
29.00-29.01
if your database is one petabyte
如果你的数据库是1PB⼤⼩
29.01-29.03
who cares that you have a bunch of file names
谁会去在意你有这么多的⽂件名呢
29.03-29.03
right
29.03-29.08
I think really large scales it doesn't make a difference
我认为在⼤规模的情况下，这并不会造成什么差异
29.08-29.08
right
29.09-29.14
I think now for like for modern file systems it's not really an issue anymore
我认为这对于现代⽂件系统来说，这并不再是⼀个问题了
29.14-29.19
like you can have like exabyte you know single files are exabytes
例如，你的单个⽂件可以是EB级别⼤⼩的
29.19-29.21
but thinking like in the 90s or early 2000s
但在1990年代，或者是2000年代早期
29.21-29.23
when like you were running like fat32
当你使⽤的是FAT32格式的⽂件系统
29.23-29.24
you can only have a 4 gigabyte file
你⽂件的最⼤只能为4GB
29.24-29.25
right
29.25-29.29
that's back in the days, it mattered more ，not so much now
时光倒流，现在这已经不再是个问题了
对于以前来讲，这很是问题，对于现在就不是了
29.29-29.30
but even then the metadata doesn't matter
但对于元数据来讲根本就⽆关紧要（知秋注：元数据很⼩）
29.30-29.31
yes
请问
29.31-29.36
do operating system limit how many file like the process can create
操作系统是否会对进程所创建⽂件有数量限制
29.36-29.44
his statement doesn't limit the number of files that you can have open is usually open file
handles on them are things you can create
针对他所说的，这并不会限制⽂件创建的数量，你通常可能有打开你所创建的⽂件句柄数量的限
制（知秋注：Linux对单⼀进程会有⽂件打开数量限制，ext3⽂件系统下单个⽬录⾥的最⼤⽂件
数⽆特别的限制，是受限于所在⽂件系统的inode数）
29.44-29.45
and therefore you have to have permissions to do this
因此，你必须要有权限，才能这么做
29.45-29.46
that's really yes
29.46-29.50
and so if you go look at like the tuning guides or setup guides for a bunch of different
database systems
So，如果你看下不同数据库系统的调试指南或者设置指南
29.50-29.56
they'll talk about like tune this kernel parameter delight you have a bunch of you know
this number inode or file handles open
你可以根据指南所说，来调整inode或可打开⽂件句柄的数量所针对的内核参数，直到你满意为
⽌
29.56-29.57
absolutely yes
29.57-30.00
okay awesome
Ok，他的问题问的很好
30.00-30.02
all right
30.02-30.03
again so we're trying to build a storage manager
我们想试着去构建⼀个存储管理器
30.03-30.07
and the storage manager is responsible for maintaining these files on disk
该存储管理器负责维护磁盘上的⽂件
30.07-30.09
and whether it's one file or multiple files it doesn't matter
不管是管理⼀个⽂件还是多个⽂件，都没问题
30.09-30.16
so now within these files, we're going to organize them as a collection of pages
我们会将这些⽂件组织为⼀个page的集合
30.16-30.21
and so our Storage Manager is going to keep track of all the reads and writes we're
gonna do to these pages
So，我们的存储管理器将跟踪我们要在这些page上所执行的所有读取和写入操作
30.21-30.26 ！！！！！
as if you track a wood available space what space is available to us to store new data in
our pages
这就像是我们在跟踪我们的⻚（pages）中还有多少空间可允许我们往⾥⾯存储新的数据
30.26-30.32
so a page is essentially just a fixed size chunk or block of data
本质上来讲，⼀个page就是⼀个固定⼤⼩的数据块
30.32-30.36
that were just we're going to organize our file and you know into these chunks
我们将我们的⽂件组织为这些数据块
30.32-30.39
so a page can contain anything
⼀个page能够保存任何东⻄
30.39-30.43
right it contained the actual tuples the database itself
它⾥⾯可以保存数据库⾥⾯的tuple
30.43-30.46
contain metadata indexes log records
它也能保存元数据，索引，⽇志记录之类的东⻄
30.46-30.48 *******
from the storage management perspective，it doesn't really matter
从存储管理的角度来看，这并不重要
30.48-30.51
right but we always have to store things within a single page
但我们始终必须将东⻄保存在⼀个page
30.51-31.00
so now some database systems will require you that to have the page be self-contained
so，现在有些数据库系统会要求你的page是self-contained的
31.00-31.04
and what I mean by that is all the information you need to know how to interpret and
comprehend
我的意思是，所有的信息你都需要知道该如何去解释以及理解
31.04-31.08 *****
the contents of a page have to be stored within the page itself
page的内容必须存储在page本身内
31.08-31.10
so let me give an example
这⾥我给出个例⼦
31.10-31.14
let's say that I have a table and I have the table has 10 columns
假设我有⼀张表，表内有10列
31.14-31.15
they have different types
这些列有不同的类型
31.15-31.18
but I call create table and I create the table of different attributes
我创建的表具有不同的属性
31.18-31.22
so I could have the metadata about what's in that table stored in one page
So，我可以将有关该表内容的元数据存储在一个page中
31.22-31.27
and then all the tuples for that that table stored in another page
该表的所有tuple则保存在另⼀个page中
31.27-31.30
so the problem is now if I have a disk failure
So，现在的问题是如果我遇上磁盘故障
31.30-31.32
like my my data center catches on fire
例如，我的数据中⼼发⽣了⽕灾
31.32-31.38
my disks melt and I lose that one page that tells me what what the layout of the the
schema is
我的磁盘也烧了，并且我丢失了能告诉我数据库schema布局的那个page
31.38-31.42
now I don't know how to easily interpret what the contents are of my tubule pages
现在，我就不知道该如何简单地去解释保存了我tuple的那个page上的内容有什么了
31.42-31.49
and so some systems like Oracle for example require all the metadata about how to say
here's what's in that page has to be within the page itself
某些数据库系统，例如：Oracle就需要将描述该page中内容的所有元数据，和这些内容数据⼀
起保存在该page中
31.49-31.51
so that way if you lose any other page
这种情况下，如果你丢失了其他任何page
31.51-31.52
it doesn't affect
这并不会影响什么
31.51-31.55
you know you lose one page it doesn't affect any other pages
即使丢了⼀个page，这也不会影响其他page
31.55-31.58
you think it's a bit overhead to this that seems crazy
你们可能认为这似乎有点疯狂
31.58-32.00
well they do it for disaster recovery
这些系统通过这个来做到灾难恢复
32.00-32.03
again so now again the machine catches on fire
假设，现在机器着⽕了
32.03-32.04
and you lose a bunch of pages
你丢失了许多page
32.04-32.11
you can you you literally open up a hex editor and try to reconstruct what the database
was by looking one page at a time
你可以通过打开⼀个⼗六进制编辑器（恢复数据库神器），尝试通过通过一次查看一个page
来试着重建数据库
32.11-32.14
and all the metadata you need about what's in that page is stored within itself
你所需要的所有元数据就保存在page⾥⾯
32.14-32.14
alright
32.14-32.23 *****************
so all the things that's important understand is that we're not going to mix different
types types of data within a page
因此，所有需要了解的重要事情是，我们不会在page中混合使⽤不同类型的数据
32.23-32.26
there's some research systems that do this
有些研究系统会这么做
32.26-32.28
we could have you know one page have tuple data and log record data for our
purposes here
我们可以在⼀个page上存放tuple数据和⽇志记录数据来供我们使⽤
32.28-32.31
and most systems they don't do this
⼤部分系统不会这么做
32.31-32.33
it's like here's a page and only stores tuples
就⽐如说，这⾥有个page，但它⾥⾯只存了tuple
32.33-32.35
here's a page that only stores index information
另⼀个page上则只保存了索引信息
32.35-32.40
so now each page is going to be given a unique internal identifier
因此，每个page都会被赋予⼀个唯⼀的内部标识符
32.40-32.44
that the database system is gonna generate for us a page ID
数据库系统会为我们⽣成这些page ID
32.44-32.44
right
32.44-32.47
and we're gonna have then now have an indirection layer
然后，我们会有⼀个indirection层
32.47-32.49
and this is would be a reoccurring theme when we talk about storage
当我们讨论存储时，这是⼀个会反复提到的东⻄
32.49-32.56
we have an indirection layer that's gonna allow us to map a page ID to some location in
a file at some all set
indirection层允许我们将⼀个page ID映射到某个集合中⼀个⽂件中的某个位置 （知秋注：其实
就是记录⼀个相对位置，⽅便⽂件整体移动后，只要知道整体⽂件的初始位置，我依然可以通过
该相对位置即page ID找到某个⽂件某个位置的数据所对应的page，要知道⼀个⻚得到⼤⼩是固
定的，id数*⻚⼤⼩就找到了offset值）
32.56-32.58
right
32.58-33.00
and we want to do this
我们想这么做
33.00-33.02
because now underneath the covers we can start moving pages around
是因为在内部我们能够移动page
33.02-33.05
you know if we start compacting the disk or or set another disk
如果我们对磁盘进⾏压缩，或者设置使⽤另⼀块磁盘
33.05-33.07
and it doesn't change our page ID
这并不会改变我们的page id
33.07-33.09
cuz we have this this page directory
因为我们有page⽬录
33.09-33.11
say you want page 1 2 3 here's where to go find it
假设你想要page 1、2以及3，page⽬录就能告诉你哪⾥能找到它们
33.11-33.19
so there's a bunch of page concepts we need to talk about to put it in the context of
how real computers work
因此，我们需要讲很多page相关的概念，以便将它们放在真实计算机的工作环境中
33.19-33.22
so at the lowest level
因此，在最底层
33.22-33.23
we have what's called a hardware page
我们有hardware page
33.23-33.29
this is the page API or page access level you get from the actual storage device itself
这是你从实际存储设备本身获得的page相关的API或page访问级别
33.29-33.32
I just know what the SSD or spinning disk hard drive exposes
我只知道SSD或者机械硬盘会暴露这些
33.32-33.34
this is typically four kilobytes
通常这只有4kb⼤⼩
33.34-33.37
then above that you have an operating system page
然后，在此之上，我们有操作系统page
33.37-33.41
and again that's as you as you take things out of the storage device and put it into
memory
通过它，你可以从存储设备中取出数据，并放⼊内存中
33.41-33.42
right
33.42-33.44
they represent that as an internal page as well
它们也将其表示为内部page
33.44-33.48
and that's typically usually four kilobytes by default in Linux and Windows
默认情况下，在Linux和Windows中，这通常使⽤了4kb⼤⼩
33.48-33.51
there's things like huge pages where you turn it
当然也有占⽤空间很⼤的page
33.51-33.57
you can take one gigabyte page to be broken up to massive four kilobyte horror pages
你可以将⼀个⼤⼩位1GB的page，拆分成⽆数个⼤⼩为4kb的page
33.57-33.59
but for our purposes we don't care about
但出于我们的⽬的，我们并不在意这个
33.59-34.01
the thing we care about at the database page here
我们所关⼼的是此处的数据库page
34.01-34.01
right
34.01-34.05 ！！！！！！
and this is gonna bury between different systems
不同的数据库系统会有不同
34.05-34.08
so at the low end at 512 bytes
最低是512 bytes
34.08-34.11
that's like something like SQLite like an embedded system
就像像SQLite这种嵌⼊式的系统
34.11-34.14
but then at the high end you'll have like 16 kb
然后⾼的话你可以有16kb⼤⼩的page
34.14-34.14
that could be like MySQL
就像MySQL
34.14-34.17
so different database systems do different things
So，不同的数据库系统做不同的事情
34.17-34.19
and there's different trade-offs for all of these
所有这些数据库系统都有不同的权衡
34.19-34.20
all right
34.20-34.25
the main thing we're going to care about though is that the hardware page
我们所主要关⼼的是hardware page
34.25-34.30
is is the sort of the lowest level that we do atomic writes to the storage device
它是我们执行原子写入存储设备的最低底层的东西
34.30-34.32
and typically 4 kilobytes
通常是4kb⼤⼩
34.32-34.35
so what I mean my bad is say I need to modify a bunch of data
So，我的意思是，假设我需要区修改⼀些数据
34.35-34.45
the hardware can only guarantee that if I do a write and flush to the disk，it can only
guarantee that at 4 kilobyte of time it's gonna be atomic
如果我对磁盘进⾏ write和flush操作，存储设备只能保证每次写⼊4kb时是原⼦的
能保证每次写⼊是原⼦性操作
34.45-34.49
so what i mean by that
我这么说是什么意思呢？
34.49-34.51
so like if I say I need to write 16 kilobytes
就好⽐说，如果我需要写⼊16kb⼤⼩的数据
34.51-34.56
I could try to write the I say I tell the disk hey write 16 kilobytes for me
我想告诉磁盘为我写⼊16kb⼤⼩的数据
34.56-34.57
it might crash
它可能会故障崩溃
34.57-35.00
before you know if it writes the first 8 kilobytes
就⽐如，如果磁盘先写⼊8kb数据
35.00-35.03
then it crashes before writing the next 8 kilobytes
然后磁盘在写⼊下⼀个8kb数据前崩溃了
35.03-35.04
and then you come back
当磁盘恢复正常⼯作后继续
35.04-35.05
and now you have a torn right
现在，你就会得到⼀个分裂的数据
35.05-35.07
you only see the first half and the second half
你只能看到第⼀部分和第⼆部分
你只能看到第⼀半和第⼆半的数据（知秋注：虽然都写⼊了，但这两段数据不连续了，写⼊
16kb的操作不具备原⼦性，失败后不会回滚，也就是⼀份坏掉的数据）
35.07-35.10
because the hardware can only guarantee 4 kilobytes at a time
因为硬件⼀次只能保证4kb⼤⼩的数据没有问题
35.14-35.17 ？？？？
all right this will come up this we'll talk about this more later when we talk about logging
and commercial concurrency（应该是发⾳的问题）
我们会在之后讨论⽇志和并发的时候，再去讨论这个问题
35.17-35.20
but this is something we need to be mindful of
但这是我们需要注意的东⻄
35.20-35.22
and again there's different systems do different things
不同的系统会做不同的事情
35.22-35.29
the high end systems like an Oracle sequel server and db2 you can actually tune it
实际上，像Oracle、SQL server和DB2之类的⾼端系统，你可以对它们进⾏调整
35.29-35.30
so you say I want to start things there's 4 kilobytes 8 kilobytes or 16 kilobytes
就⽐如说，你想将它们的page设置为4kb、8kb或者16kb⼤⼩
35.30-35.35
you can even vary say for index pages store much larger page sizes
你甚⾄可以这样做，让索引page的⼤⼩变得更⼤，以此来存储更⼤的page
你甚⾄可以这么做，将index pages存储的⼤⼩更⼤
35.35-35.36
and then data page is sort of smaller
然后让数据page变得更⼩
35.36-35.38
you can go crazy and do much different things
你也可以更加激进，并做些更加不同的事情
35.38-35.40
all right
35.40-35.45
so now we want to talk about how we're gonna represent the the page storage
architecture
So，现在我们想去讨论下我们该如何表示page 存储架构
35.45-35.47
so again there's different ways to do this
So，要再说⼀下，我们可以通过很多不同的⽅法做到这点
35.47-35.48
there's different trade-offs for this
这⾥⾯也有许多不同的取舍
35.48-35.53
the most common one it's going to be the heap file organization
最常⻅的⽅式是使⽤Heap File Organization
35.53-35.54
so we'll focus on that
这也是我们要关注的东⻄
35.54-36.01
but the thing to understand is that at this point at this lowest level in the storage
manager we don't care about what's actually in our pages
但有件事情要理解的是，在存储管理器最底层的级别中，我们不⽤关⼼我们的page中到底有什
么
36.01-36.03
we don't care whether this indexes data or tuple data
我们不介意⾥⾯放的是索引数据还是tuple数据
36.03-36.05？？？
we don't care USS for a page
或是其他
36.05-36.09
we'll read that page or delete it
我们就可以对这个page进⾏read或delete操作
36.09-36.15
so database heap file is a unordered collection of pages
So，数据库中的heap⽂件是⼀个⽆序的page集合
36.15-36.19
where the tuples of the data can be stored in random order
即可以以随机的顺序把tuple数据保存在⾥⾯
36.19-36.25
so again the relational model doesn't have any orderings
So，要说⼀下，关系模型并没有任何排序
36.25-36.31
if I insert tuples one by one I'm not guaranteed that they're gonna be stored that way on
disk
如果我⼀个接⼀个地插⼊tuple，我并不能保证它们是按照我插⼊的顺序保存在磁盘上的
36.31-36.34
because it doesn't matter
这并没有什么关系
36.34-36.36
because I write sequel queries and that have no notion of ordering
因为在我写的SQL查询中并没有排序的概念
36.36-36.43
so the API we need to have again is be able to read and write and access pages at a
time
因此，我们所需要的API必须能够对page进⾏读写和访问
36.43-36.49
as well as being able to iterate over every single page that we have，in case we need to
do a sequential scan across the entire table
如果我们需要使⽤SQL来按顺序扫描整个表，那么我们也必须要有这种API，能够让我们遍历所
拥有的每个page
36.49-36.55
we'll have some additional metadata to keep track of what pages we have which ones
have free space
我们会使⽤⼀些额外的元数据来跟踪我们有哪些page，哪些page中是空余空间
36.55-36.58
so that if we need to insert new data we know where to find a page to go ahead and do
that
这样如果我们需要插⼊新数据时，我们就知道可以在哪个page上插⼊数据了
36.58-37.03
right and internally we can represent this heap file in a bunch of different ways
在内部，我们可以通过⼀系列不同的⽅式来表示heap⽂件
37.03-37.08
again at the lowest level we can organize these in pages
在最低层，我们将它们组织为page
37.03-37.11
and then within these pages we can represent them with different data structures
在这些page中，我们可以⽤不同的数据结构来表示它们
37.11-37.14
so let's first talk about doing linked lists
So，⾸先我们来谈论下链表这种⽅式
37.14-37.16
because that's sort of the dumb way to do this and nobody actually does this
这是⼀种愚蠢的⽅式，实际上也没⼈使⽤这种⽅式
37.16-37.17
but it exists
但确实可以⽤它来表示heap⽂件
37.17-37.20
and then we'll see the page directory way which is a better approach
之后，我们会去了解page⽬录这种⽅式，它是⼀种更好的⽅案
37.20-37.29
so the way we're gonna do this again the goal is we what we're trying to do here is we're
trying to figure out within my file I have a bunch of pages
我们所试着要做的是，假设在我的⽂件中，我有许多page
37.29-37.34
what pages you know what where those pages exist，and what kind of you know
whether they have data or not
在该⽂件中，存在着哪些page，哪些page⾥⾯保存了数据，哪些没有保存
37.34-37.36
where they have free space for me to store stuff
它们中是否有空余空间来让我保存数据
37.36-37.43 ！！！！！！！！！！！！！
so in the header of this this heap file said that for this linked list we're just gonna have
two pointers
在heap⽂件的header中，我们的链表⾥⾯有两个指针
37.43-37.47
we have one pointer that says here's the list of the free pages that I have in my file
我们使⽤⼀个指针来表示我⽂件中的空余page列表
37.47-37.51
and here's a list of the the pages that actually have completely for occupied
那这个指针就表示⼀个已经被数据完全占据的page 列表
37.51-37.54
right and then again this is just a linked list
这就是⼀个链表
37.54-37.56
so it doesn't matter where these pages are stored
这些数据放在哪都没关系
37.56-37.58
doesn't matter whether contiguous or not
不⽤管这些数据是否是连续存放的
37.58-38.06
I just I now have just pointers and say hey here's you know here's the data that you
know here's here's the first page my linked list that where they're occupied
我现在只有这些指针，看这⾥（下⾯那有数据的page图示），这是被数据占据page链表的第⼀
个page
38.06-38.07
and here's a pointer to the next one
这⾥有指向下⼀个page的指针
38.07-38.11
if I want to say find me a page a free page like a store stuff
如果我想去想找⼀个page来保存些东⻄
38.11-38.13
I can follow the free page list look in here
我可以在这些空余page的列表中进⾏查找
38.13-38.17
and you know in traverse long until I find something that has enough space for what I
want to store
遍历这些page，直到我找到⼀个有⾜够空间保存我想保存的数据的page
38.17-38.24
and because we need to go possibly an iterate in reverse order
因为我们可能需要以相反的顺序来遍历这些page
38.24-38.24
we need pointers on the way back as well
我们需要⼀个指向上⼀个page的指针（知秋注：也就是双向链表）
38.24-38.24
yes
请问
38.24-38.28
the question is why is the heap file unordered
他的问题是，为什么heap⽂件都是⽆序的
38.28-38.30
thinking at a high level
我们站在⼀个⾼级的层⾯来思考这个问题
38.30-38.36
like the data we're storing does not need to be ordered as we insert it
我们所保存的数据⽆须按照我们插⼊时的顺序进⾏保存
38.36-38.38
right
38.38-38.39
so if I insert like three tuples
如果我插⼊三个tuple
38.39-
I could insert I could in my page layout the actual inside the pages
我可以在page 布局中插⼊page 内部的实际内容
-38.47
I could have tuple three tuple two two and one
我可以有tuple 3、tuple 2和tuple 1
38.47-38.49
I'm not required to put them in order that are given
我⽆须将它们按照给定顺序排列
38.49-38.59
right so this question if you had to look for a particular page with these link list things
So，他的问题是，如果我们要在这些链表中找到某个特定的page
38.59-39.03
I have to reverse potentially entire link list if I want
我就必须根据我的需要来反转整个链表
39.03-39.04
one absolutely yes this sucks
没错，这很操蛋
39.04-39.06
this is a bad idea
这是⼀个糟糕的想法
39.06-39.07
and saintly yes
请问
39.07-39.13
his question is if it's ordered you can always search faster
他的问题是，如果是有序排列，这样搜索速度会不会更快点
39.13-39.13
right
39.13-39.15
so there's different trade-offs
这⾥⾯有些不同的取舍
39.15-39.19 ！！！！！！
so I have no metadata to say where I have free pages
我并没有元数据来表示在哪⾥可以找到free pages
39.19-39.22
so I need to insert something now
现在，我想插⼊些东⻄
39.22-39.24
where am I going to insert it
我要往哪⾥插⼊呢？
39.24-39.29
now I've been do a sequential scan and look at every single page until I find one that
has free space
现在，我可以进⾏循序扫描来查看每个page，直到我找到有空余空间的page为⽌（知秋注：⽐
如，有些数据⽐较⼩，page剩余空间刚好可以容纳，有些page虽然有剩余空间，但不⾜以容纳
这个数据，所以不确定到底是哪个page，需要遍历）
39.29-39.35
or in this approach here I'm not saying right at while this is the right way to do it I'm
saying this is how this works
我并没有说这种⽅法是对的，我说的只是它是如何⼯作的
39.35-39.42
if I need if I have this one here，then I get this go follow this pointer to find the first free
page and see whether it has enough space for what I want to store
如果我在这⾥，接着我要从这个指针开始来查找第⼀个free page，并看看它是否有⾜够的剩余
空间来存储我想存储的数据
39.42-39.44
it's a trade-off right
这是⼀种取舍
39.44-39.49
I can either go do you know almost binary search to find exactly the page that I want
我可以通过⼆分查找法来找到我想要的page
39.49-39.53
or I can just do I can do this linked list
或者我也可以通过链表的这种⽅式做到
39.53-40.02
statements you can maintain ordered sets of it free pages and fill pages
So，你的问题是，维护⼀个free page的有序集合，以此来填充page？
40.02-40.15
look he's ever usually linked lists use a tree
他想说的是使⽤树的结构，⽽不是链表
40.15-40.16
a linked list can still be ordered right
链表也能做到有序

03-03
14
00:53:00,380 --> 00:53:01,0
00:53:01,280 --> 00:53:04,019这是个
14488047
40.17-40.19
so you could say all right say I delete all the tuples from this page
你可以这么说，我删除了这个page上所有的tuple
40.19-40.21
and it's been its page two
它已经变成了page2
40.21-40.23
and this is page one， this is page three
这是page1，这是page3
40.23-40.24
so I could insert it in between these two guys
因此，我可以在这两个page之间插⼊
40.24-40.24
sure
没错
40.24-40.38
order like we make two different or one on the page ideally but again
-40.46
I think your your the page ID is just like it all set in it
我认为page id已经在⾥⾯设置好了
40.46-40.51
right it's not there's no sort of a logical thing built in top of the heap file
在heap⽂件⾥⾯，并没有内置什么逻辑上的东⻄
40.51-40.56
look let's we take this offline ，if you dont understand it
如果你不理解它的话，我们课后再讨论这个
40.56-40.58
this question over here or
那边的⼈是有问题吗？
40.58-40.59
okay
40.59-41.00
let's keep going
我们继续
41.00-41.02
if you have questionswe talked about it further
如果你还有问题，我们之后讨论
41.02-41.05
I mean the main opinion this is a bad idea
我的主要想表达的是这是⼀个bad idea
41.05-41.05
nobody does it
没有⼈会做么做
41.05-41.08
so I don't want to dwell on it too much
因此，我不想在它上⾯浪费过多时间
41.08-41.11
what people typically do is having a page directory
⼈们通常的做法是使⽤⼀个page⽬录
41.11-41.15
and for this one it's a we have a page now
对于这个，假设我们现在有⼀个page
41.15-41.22
again in the header of our file that's gonna maintain the a mapping from page IDs to
they're all set
在我们⽂件的header中，它⾥⾯维护了page id和它们所处位置的映射关系
41.22-41.27
and then we can also maintain some additional metadata in this directory
然后，我们也可以在这个⽬录中维护某些额外的元数据
41.27-41.31
to say hey here's the amount of free space that's available to me in a particular page
假设在这个page上有⼀些我可以使⽤的空闲空间
41.31-41.34
so now when I want to go say I want to insert some data
现在，当我想去插⼊⼀些数据时
41.34-41.37
I don't have to go you know scan the that list
我⽆须去扫描这个列表
41.37-41.39
I can just look my page directory and find everything that I need
我只需在我的page directory 中查找到我需要的东⻄（知秋注：⽐如这个directory中的每⼀个
⼩格中不仅有对应page所在位置，也包含了它剩余空间信息）
41.39-41.43
right so if my pages are just ordered sequentially like this
如果我的page像这样按顺序排列
41.43-41.46
and then this is just a mapping to with they're located
就像这样来映射到这些page所在的位置
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
41.46-41.54
right so the important thing about this going back to what we talked about the the
atomic rights for Hardware
so 接着回到之前我们谈及的关于Hardware的原⼦性操作这个很重要的事上⾯
41.54-41.56
so now I have much metadata
现在，我有许多元数据
41.56-42.00
that's a summarization of what's in my actual pages themselves
它其实就是我实际page中内容的概括
42.00-42.02
and I have to keep it in sync
⽽且我必须保持同步
42.02-42.03
but I actually can't guarantee that
但实际上我⽆法保证这点
42.03-42.09
because the hard can't guarantee that I can write two pages of exactly the same time
因为很难保证我可以同时写两page数据
42.09-42.12
so let's say that I delete a bunch of data here and my page
假设，我删除这⾥的⼀些数据和page
42.12-42.16
and then I update I want to update my page reference
接着我想去更新下我的page引⽤
42.16-42.17
and say oh I have this amount of free space
并表示，我有⼀定量的空闲空间
42.17-42.20
I made a bunch of data write that out
我想在这⾥写⼊⼀定量的数据
42.20-42.24
and then before I can update my page directory and write that out, I crash
接着，在我可以更新我的page⽬录并写⼊数据之前，系统崩溃了
42.24-42.26
so now I come back online
当我重新上线后
42.26-42.28
and say oh this I think this page is full
我发现这个page空间已经满了
42.28-42.30
and therefore I can't write any data to it
因此，我没办法往它⾥⾯写⼊任何数据
42.30-42.32
but I know it's actually not
但我知道，实际并不是这样
42.32-42.32
right
42.32-42.33
in reality it's not
实际上并不是
42.33-42.38
So you could say all right well when I boot back up， I'll just scan through all my pages
and figure out what's actually really there
当我启动备份时，我只需扫描我的所有page，就能弄清楚page⾥⾯实际上都有什么内容
42.38-42.41
but now again think in the extreme
但现在思考下极端情况
42.41-42.42
if I have one gigbyte the data
如果我有1GB数据
42.42-42.46
then that's gonna take forever or sorry one petabyte of data that's gonna take forever
to actually do this
抱歉说错了，如果是1PB数据的话，那么这种操作就会⼀直做下去，永远也停不下来
42.46-42.55
so the bunch of mechanisms will talk about later on or how we can maintain a log and
initial metadata in sort of special special files
因此，我们之后会谈论⼀些机制，即如何在⼀些特殊⽂件中维护⽇志以及初始元数据
42.55-42.59
so that if we crash to come back we know how to reconstruct what's inside all these
things
即使系统崩溃故障了，我们也知道该如何重建数据库⾥的东⻄
42.59-43.02
I think it is just a hash table
我认为它就像hash表那样
43.02-43.03
to say I want page 1 2 3
假设我想要page1,2以及3
43.03-43.04
here's where to go find it
我就可以从page⽬录中找到它们
43.04-43.06
and I just can get it
⽽且很容易就能找到
43.06-43.09
yes yes
请问
43.09-43.10
each page has the same size yes
每个page的⼤⼩都是⼀样的
43.10-43.15
what do you mean sorry
抱歉，你想表达什么？
43.15-43.20
these questions what is the size of a page in this world
这些问题所说的⼀个page的⼤⼩
43.20-43.23
right so this goes back through this diagram here
我们来回看下这⾥的图
43.23-4327
they do different systems do different things
不同的系统做了不同的事情
43.27-43.28
right
43.28-43.35
if fails afe is like you know we can write four kilobytes and because the hardware
guarantee that's atomic
我们每次可以写⼊4kb数据，因为硬件可以保证我们的写⼊操作是原⼦性操作
43.35-43.39
but now i need to write you know say my pages themselves are four kilobytes
但现在我需要让我的page的⼤⼩都是4kb
43.39-43.43
but i need to update one page they clean up clear out a bunch of data
但我需要去清除某个page上的⼀些数据
但我需要去更新⼀个page，清除它上⾯的⼀些数据
43.43-43.44
update the page directory
并且更新page⽬录
43.44-43.46
and say all right that page you've been cleared out
我们就可以说我们已经清理完这个page了
43.46-43.49
I can't guarantee the right both of those pages atomically
我⽆法保证在这两个page上的操作是原⼦性的
43.49-43.52
I can write one crash before I write the second one
在我对第⼆个page进⾏写⼊操作前，我在写⼊第⼀个page时可能系统就崩溃了
43.52-43.58
okay
43.58-44.01
all right so again
44.01-44.05
this is what the pages are gonna look like inside the yet certain files
这就是page在实际⽂件中的样⼦
44.05-44.14
so he says why do some pages you why do some data systems used larger pages
他想说的问题是，为什么某些数据库系统使⽤的是空间更⼤的page呢？
44.14-44.17
there's trade-offs
这其中有⼀些权衡
44.17-44.20
so internally inside my database system
在我的数据库系统内部
44.20-44.28！！！！！！！！！！！！！！！！！
I have to have this page directory in memory mapping pages to some location either
memory or on disk
我通过内存中的page⽬录将page映射到内存或者磁盘上的某个位置
44.28-44.31
but now if I can represent a larger amount of data with one page ID
但现在如果我使⽤⼀个page id来表示⼀个更⼤量的数据
44.31-44.34
then that size of that table goes down
然后，表格的所占⽤的⼤⼩就会变⼩（知秋注：固定容量下，⼀个id表达的数据量越⼤，所需要
的id数也就越少）
44.34-44.40
think of this is like in the TLB the translation lookaside buffer inside on the CPU
我们可以将之看作是CPU中的TLB(⻚表缓存)来看待
44.40-44.43
if I am trying to match all a bunch of pages
如果我试着去匹配所有的page
44.43-44.45
but it's my page tables get really large
我page table会变得⾮常的⼤
44.45-44.47
and now I'm gonna have cache misses
那我就会出现cache misses的现象（知秋注：page id表示的数据范围太⼩，没办法全部在⾼速
缓存中hold住）
44.47-44.52
so by you can represent more data in you know with few number of page IDs
So，你可以通过更少的page id来表示更多的数据
44.52-44.55
furthermore going back to talk about the difference being random and Sequential
access
此外，我们回过头来在讨论下随机访问和循序访问之间的区别
44.55-44.58
so now if I can write out contiguously you say four kilobyte pages to represent a 16
kilobyte database page
So，现在如果我能连续写出4个4kb的page，以此来表示⼀个16kb的数据库page
44.58-45.09
when I do a read I just read all that sequentially and bring it in， now I'm getting
potentially more useful data that I need
当我进⾏读取时，我会依次读取所有内容并将它们组合在⼀起，现在我获取到我所需要的更有⽤
的数据
45.09-45.13
but again it makes doing writes more expensive
但这让写⼊操作的代价变得更⾼
45.13-45.17
look at that now at this stage a bunch of crap ahead of time to prevent myself from
getting torn writes
看看现在，在写阶段要提前进⾏⼀堆烂糟逻辑，以防⽌⾃⼰写数据出问题（知秋注：就像前⾯说
的数据写⼀半写满⼀个page出问题了，后⼀半数据还没来得及写，要保证该数据的原⼦性和完
整性，就要多做很多⼯作）
45.17-45.19
so there's pros and cons for both of them
So，两者都有优点和缺点
45.19-45.22 ****
and this is why again the commercial systems allow you to tune them in different ways
based on what your application wants to do
这就是为什么商用数据库系统允许你根据应用程序想要做的事情以不同的方式对其进行
调整的原因
45.22-45.26
let's go question
问题环节，各位请问
45.26-45.26
yes
请问
45.26-45.39
so so his question is for self-contained pages would that solve this particular issue here
So，他的问题是，如果使⽤self-contained page，这是否能解决这个问题
45.39-45.39
no
并没有
45.39-45.47
so self-contained pages would mean like the contents of that inside the page I have all
the metadata that I need for it
self-contained page指的是我们所需要的所有元数据都在这个page上
45.47-45.53
I still have to have a page director to tell me where to find that page, if I want page 1 2 3
or 4 5 6
如果我想找到page 1、2、3或者4、5、6，那么我依然必须要通过page⽬录来告诉我在哪才能
找到我要的那个page
45.53-45.58
so it's not entirely self-contained at the higher levels in the system
从系统的更⾼层⾯来讲，这并不是完全self-contained
45.58-46.00
it's unavoidable at the bottom level
这在底层是不可避免的
46.00-46.02
so what we're at here
So，我们此处有什么呢？
46.02-46.06
might again we have any talk about what's actually inside this the page
可能我们需要再次来讨论下page⾥⾯实际有什么
46.06-46.10
but within the page directory，we can't guarantee that self-contained
但在page⽬录内，我们⽆法保证这是self-contained的
46.10-46.11
okay it doesn't make sense
这并没有什么意义
46.11-46.14
right yes
请问
46.14-46.34
yeah so this question is there any way to guarantee that the if a crash happens, when
you come back, you can identify that the crash happened
他的问题是，当系统崩溃了，当你恢复后，能否通过某种⽅式来定位崩溃发⽣的原因
46.34-46.35
yes
确实有
1274
46.35-45.36
so you knew checksums
So，你们应该知道checksum这个东⻄
45.36-46.42
right so say that I my database page is d3 pages here
假设我的数据库⾥⾯有3个page
46.42-46.44
in the header of the first page
在第⼀个page的header⾥⾯
46.44-46.44
I'll put a checksum
我会放⼀个checksum
46.44-46.54
and say all right the next from my starting point here, the next three pages the checksum
should be like a CRC or md5 should be this amount
从此处这个起点开始，接下来三个page中的checksum的CRC或者md5值应该是这个数
从此处这个起点开始，接下来三个page的checksum应该就像是⼀个CRC或者md5这样的⼀个
数
46.54-46.57
so I come back online and I after a crash
当我从故障中恢复过来后
46.56-47.00
I would look and say oh the last page when I went to compute the checksum doesn't
match
接着，在我去查看最后⼀个page中所计算出的checksum时，发现它的值和预定的值并不匹配
47.00-47.02
because this thing didn't get written out
因为数据并没有被写进去
47.02-47.04
so therefore I would do I have an error
因此，我就会得到⼀个报错
47.04-47.04
right
47.04-47.10
and then we'll talk about logging and no in a second
接着，过会我们会去谈论下⽇志⽅⾯的内容
47.10-47.12
but like you can log the operations you do to modify the pages
你可以通过⽇志的形式记录下你修改page时所进⾏的操作
47.12-47.15
and that's essentially what the databases worries about mostly
从本质上来讲，这也是数据库所最为关⼼的⼀部分
47.15-47.19
alright cool
Cool
47.19-47.22
so that's all I'll talk about what that actually looks like inside these pages
So，这就是我要谈论的这些page中实际所存在的内容了
47.22-47.26
again every page is gonna have a header
每个page中都有⼀个header
47.26-47.36
and it's sort of what he asked about，we're gonna have information what's the size of
the page the checksum what database version or the version of the software wrote this
data out
这也就是之前那位同学所问的内容，在header⾥⾯，我们有page⼤⼩，checksum，DBMS版本
之类的东⻄
47.37-47.41
what could happen is people can you know data is companies put out new releases
数据库公司会将新的发⾏版信息放在其中以供⼈们获取
47.41-47.43
Postgres puts out new releases every single time
Postgres每次都会发布新版本
47.43-47.45
you know the page layout may change
它的page layout 就有可能发⽣改变
47.45-47.51
so when you want to upgrade, you want to know am i looking at pages that are created
by the new software, the old software
当你想要升级的时候，你就会想去查看这些page是由新版软件所创建的还是由旧版软件创建的
47.51-47.53
and I can have different code paths to interpret them
我可以通过不同的代码来对它们进⾏解释
47.53-47.58
if you're doing compression like the dictionary compression or like lz4 gzip
如果你想进⾏压缩，例如使⽤字典压缩或者Lz4和gzip之类的⽅法进⾏压缩
47.58-47.59
you can store information about that
你可以通过这种压缩⽅式来保存数据
47.59-48.02
we all talked about this in the semester
我们会在这个学期⾥⾯讨论这个东⻄
48.02-48.08
but it's also information about you know what transactions or what queries modify this
data and whether other queries allowed to see it
也会讨论关于事务，数据的查询，修改和查询权限之类的东⻄
48.08-48.09
again
48.09-48.13
and then we've already talked about the issue of a maybe self-contained
我们回到⼀个已经讨论过的问题：self-contained
48.13-48.14
right
48.14-48.18
so now within a page we can represent data in two different ways
在⼀个page中，我们可以通过两种不同的⽅式来表示数据
48.18-48.22
so we can do this as a sort of a tuple oriented approach
So，我们可以通过⾯向tuple的⽅式来表示数据
48.22-48.24
and I'll explain what that means the next slide
我会在下⼀张幻灯⽚上解释这是什么意思
48.24-48.28
or we can do a log structured approach
我们还可以采⽤⼀种log-structured 的策略
48.28-48.31
so again it's within a page now
So，再次，在⼀个page中
48.31-48.36
assuming of a page directory to tell us how we need to get to that page，if we want
you know a particular page of one two three
假设，如果我们想要某个特定的page，例如，page 1、2和3，那么page⽬录就会告诉我们该如
何找到我们需要的那个page
48.36-48.39
now we're talking about what does it look like when you look inside the page
现在，我们来谈论下当我们在看page内部的时候，它⾥⾯是什么样的
48.39-48.41
what do you actually the data set I'm actually going to see
在page内部，我们实际会看到怎样的数据集合
48.41-48.45
so for this one let's just assume that we're storing tuples
So，在这个例⼦中，假设我们保存的是tuple
48.45-48.55
and let's say a really simple case, here a really simple strawman main idea is that, in our
page all we're gonna do is just insert tuples one after another
在这个简单的例⼦中，我们有⼀个⾮常简单的strawman（稻草⼈） idea，那就是在我们已有的
tuple后⾯再接着插⼊⼀个新tuple
48.55-48.59
right start from the beginning，we have a little header space and say here's the number
of tuples that we have
我们从这个page的上⾯开始讲起，在它上⾯我们有⼀个很⼩的header空间，这⾥⾯存放了我们
所保存的tuple数量
48.59-49.03
so we know what offset that we want to jump to， if we want to insert a new one
So，如果我们想插⼊⼀个新tuple，那我们就知道我们想要跳转的偏移量是多少
49.03-49.07
but it's super simple we just insert one at a time
这⾮常简单，因为我们⼀次就插⼊⼀个tuple
49.07-49.08
right
49.08-49.12
so say a third start three tuples assuming they're all fixed length
假设我们有3个tuple，它们的⻓度都是固定的
49.12-49.14
every single time I insert one
每次我插⼊⼀个tuple的时候
49.14-49.17
I just jump to the next off free offset looking and then update the counter
我只需找到下⼀个空闲的偏移量处插⼊该tuple，并更新计数器
49.17-49.20
so this is a bad idea
这其实是⼀个糟糕的注意
49.20-49.21
why
为什么呢？
49.21-49.27
perfect
回答的漂亮
49.27-49.28
so he says, yeah if you delete a tuple
这位同学表示，如果你删除⼀个tuple
49.28-49.29
you have to move everything
那你就得移动所有的tuple
49.29-49.31
well not necessarily right
Well，这其实并不是必须这么做
49.31-49.32
I could just do this
我可以这样做
49.32-49.33
all right
49.33-49.34
free the space up
释放掉原来tuple所在的空间
49.34-49.38
he says the external fragmentation
这位同学表示这会产⽣外部碎⽚
49.38-49.41
well why can't I just insert in there
Well，为什么我不能在这⾥⾯插⼊呢？
49.41-49.43
what‘s that？
你们想吐槽啥？
49.43-49.49
right so I made the assumption that their fixed length size, but he's absolutely right
虽然我假设这些tuple都是固定⻓度的，但这位同学说的没错
49.49-49.54
so this works great fixed everything's fixed Lane could I just shove it the new one
where the old one was
通过将之移到⼀个新的空间来取代这个⽼的空间就可以很好的⼯作了（知秋注：也就顺带做到了
压缩，懂Java的童鞋可以联想下GC）
49.54-49.55
but it's not fixed length
但如果它并不是固定⻓度的
49.55-50.00
then this slot may actually you know this location may not be big enough for what I
would insert
那么你想插⼊的那个位置可能就没有⾜够的空间去保存那个tuple
50.00-50.02
and now I got to try to put it down in here
现在，我试着将它放到下⾯
50.02-50.03
right
50.03-50.07
so so that's one issue
So这就是其中⼀个问题
50.07-50.11
I mean the other issue too is like every single time I need to go say I delete this thing
另⼀个问题是，每次当我需要去删除某个tuple的时候
50.11-50.14
I either maintain metadata at the top and
我需要去维护顶部的元数据
50.14-50.18
tell me hey here's a location in this page or you can write some data
元数据会告诉我们在这个page上的某个位置，我们可以写⼊数据
50.18-50.23
or I got a sequentially scan and look at every single tuple to figure out where I can go
或者我通过对这个page进⾏循序扫描，然后找到我能插⼊tuple的位置
50.23-50.24
right so this sucks
So这很操蛋
50.27-50.26
nobody does this
没⼈会这么⼲
50.26-50.30
instead what you do is what it calls slotted pages
相反，我们要⽤的东⻄被称为slotted page
50.30-50.32
so this is the most common scheme
这是⼀种最常⻅的scheme
50.32-50.37
that every disk in a database system will use
数据库系统会在它所⽤的所有磁盘上都使⽤这种scheme
50.37-50.39
the exact details of how they're going to represent these pages are we slightly different
数据库在表示这些page的具体实现细节上都有所不同
50.39-50.41
but at a high level this is what everyone does
但从⾼级层⾯来讲，所有的数据库系统都是这么做的
50.41-50.44
so the way things could work we're always gonna have our header
So，我们可以通过我们的header来做到这些
50.44-50.49
the header it can store that basic metadata about checksum or you know access times
and things like that
header⾥⾯能够保存基本的元数据，例如checksum或者访问时间之类的东⻄
50.49-50.54
and then we're gonna have to sort of regions of data we want to store
接着，我们必须有能够保存数据的区域
50.54-5056
at the top would have what's called a slot array
在顶部我们有⼀个称为slot数组的东⻄
50.56-51.00
and the bottom we're actually going to have the actual the data we want to store
底部的空间则是我们⽤来保存我们想保存的数据
51.00-51.03
these in again we're assuming we're doing tuples here
假设，我们在这⾥对我们的tuple进⾏操作
51.03-51.05
so then this one can be fixed length or variable length tuples
So，这⾥我们所保存的tuple可以是固定⻓度或者是可变⻓度的
51.05-51.07
it doesn't matter
我们并不在意这⾥⾯是可变⻓度还是固定⻓度的
51.07-51.14
so what the slot array basically is a mapping layer from a particular slot to some offset
in the page
So，本质上来讲，slot数组是将⼀个特定的slot映射到page上的某个偏移量上
51.14-51.18
Well， that's the starting location of the particular tuple that you want
即根据这个偏移量，你能找到你想要的那个tuple
51.18-51.20
right
51.20-51.23
and the reason why we want to have this indirection layers
我们之所以想要这个indirection层的原因是
51.23-51.28
because now we can start moving these within a page we can move these tuples around
any way that we want
因为我们现在就可以将这个page内的tuple移动到我们想要的任何地⽅
51.28-51.32
again the upper levels of the system don't care
再说⼀遍，上层系统并不在意这档⼦事
51.32-51.37
right they can always you know the record it's gonna the page ID and the slot number
你们要知道，⼀条记录的位置是由page id和slot number来⼀起确定的
51.37-51.41
and all i need to do is move these things around and just update the slot array
我所需要做的就是移动tuple，并更新slot数组
51.41-51.43
and say here's where you're actually pointing to
告诉这个slot数组，你实际应该指向tuple移动后的位置
51.43-51.48
and the way we're gonna fill up the page is that the slot array is gonna grow from the
beginning to the end
我们填充page的⽅式是从前往后对slot数组进⾏填充
51.48-51.51
and the data is gonna grow from the end to the beginning
然⽽数据则是从后到前进⾏填充
51.51-51.55
and at some point we'll reach in the middle where we can't store any new information
在某些时候，我们的数据占⽤了该⼀半⼤⼩的page，我们再也⽆法存⼊任何新信息了
51.55-51.56
and then that's what we say that our page is full
这就是我们所说的page已满
51.56-52.02
so yeah this means that there could be a small little gap in the middle
这就意味着，在中间部分可能存在了部分空隙
52.02-5203
where we can't store anything
这些空间太⼩，所以我们没办法存任何东⻄
52.03-52.07
but that's you know because we wanted to support very length tuples
但你们知道我们想去⽀持可变⻓度的tuple存储
52.07-52.08
we have to we have to do this
所以，我们不得不这么做
52.08-52.10
all right
52.10-52.16
we could do what's called a vacuum or compaction we could just scan through and
reorganize defragmentation
我们可以进⾏⼀种称为vaccum的操作(Postgres中的⼀个操作，⽤于整理数据库)或者压缩，也
可以对数据库进⾏扫描并整理碎⽚
52.16-52.20
and in our file systems we could do that in the background the database system we can
do it
我们可以在我们的⽂件系统后台这么做，也可以在数据库系统中进⾏这些操作
52.20-52.24
but for our purposes, this is what we end up
但这就是我们最终要完成的⽬标
52.24-52.25
with yes
请问
52.25-52.31
good point
观点不错
52.31-52.38
so his question is are we assuming here that the within a page we could have tuples
from different tables
So，他的问题是，我们假设能够在⼀个page内保存不同表的tuple
52.38-52.40
in practice nobody does that
在实际操作中，没有⼈这么⼲
52.40-52.45
because you would have to maintain some metadata, say this is from tuple want a table
one this is from table two
因为你就不得不去维护元数据，⽐如你就得说明，这个tuple来⾃表1，那个tuple来⾃表2
52.45-52.49
we'll see at the end that there is a way to there's some systems that do do this
我们会在这节课的最后看到有些系统确实有这种操作
52.49-52.51
but in general nobody does this
但⼀般情况来讲，没⼈会这么做
52.51-52.54
like if you open up SQLite、Postgres or whatever you call create table
如果你在SQLite，Postgres或者其他数据库中创建表时
52.54-52.57
it'll create pages and only tuples from those tables will go in those pages
数据库就会去创建page，这些表中只有这些表的tuple会保存在这些page中
52.57-53.01
it's good question what will come to that in a second
这是个好问题，我们稍后会看到
53.03-53.04
so these are tuple oriented pages
So，这就是⾯向tuple的page
53.04-53.08
and at the end day we're trying to store tuples inside these pages
在最后的课程我们会试着去往这些pages中存⼊tuples
53.08-53.10
and so you know when I do an insert I do an update
当我进⾏插⼊或者更新操作的时候
53.10-53.16
I want to find you know I take the contents of the tuple and just write it out in its
entirety in this page here
我想要将拿到的tuple的内容，整体写⼊到这个page中
53.16-53.27
in next class, we'll talk about for really large data like if you have a tree that's like you
want a store like a you know a video file in the database
在下节课中，我们会去讨论⼤型数据的存储，例如，我们想将⼀个视频⽂件保存在我们的数据
库中之类的例⼦
53.27-53.28
don't do that
请不要这么做
53.28-53.30
what's fine why later
我会在之后解释原因
53.30-53.33
but like for that case here，you couldn't store this because it won't fit in a single page
但对于这种例⼦来说，你没办法把视频存在数据库⾥⾯，因为单个page根本放不下它
53.33-53.38
so you have some extra metadata some pointers to say here's the pages that have the
rest of the data that you're looking for
So，你就必须通过⼀些额外的元数据和指针来表示我们所要查找的剩余部分的数据的page所在
位置
53.38-53.41
but in general we want us pack in the entire tuple in a single page
但⼀般来讲，我们想将⼀整个tuple放在⼀个单个page中
53.41-53.48
because now when we go access that, you need to access to the tuple it's one page
read to go get it and not a bunch of different ones
因为当我们想去访问这个tuple的时候，它就在这个page上，那我们直接读取就⾏，⽽不是分散
在多个page上
53.48-53.49
again
53.49-53.51
we'll break that assumption next class
在下节课中，我们会打破这个假设
53.51-53.54
but for our purposes here it's fine
但对于我们此处的⽬的⽽⾔，这没什么问题
53.54-54.06
so another way to store data and pages is it's our question
你有问题是吗？请讲
54.06-54.09
so his question is say I move the third tuple here
So，他的问题是，我将这第三个tuple移动到此处
54.09-54.10
right
54.10-54.11
what happens
这会发⽣什么呢？
54.11-54.15
well it depends I'll give it a minute in the class
这得看情况来说了，我稍后会在课上讲这个问题
54.15-54.17
some systems will actually compact it before it writes out the disk
某些系统在将数据写出到磁盘时，实际上它们会对数据进⾏压缩
54.17-54.19
some systems will just leave a gap here
也有些系统会在page中留下些空隙
54.19-54.21
and then if it gets full
如果page的容量满了的话
54.21-54.23
and you say oh I have some free space maybe I try to do compaction
你会说，诶，这⾥还有点空闲空间，我们可以应该试着压缩下数据
54.23-54.25
yes
请问
54.28-54.36
yes this question is the slot is pointing to the starting position of the tuple
他想表达的是slot指向的是tuple的起始位置
54.36-54.47
the question is what does a point so the question is what is the ordering of the storage
address within the slots
他的问题是这些slot的存储地址的顺序是怎么样的
54.53-54.56
not sure what you mean
我不太懂你在说什么
54.56-54.57
like I have say this is 4 kilobytes
我说过这个是4kb⼤⼩
54.57-55.02
I want to store a 1 kilobyte tuple for tuple 1
我想保存⼀个1kb⼤⼩的tuple 1
55.02-55.06
so from starting from the offset，I jump to the 1 kilobyte
So，我以这个偏移量为起点，我跳到1kb的位置
55.06-55.08
and then my slot right points of that
我想要找的slot就在此处
55.08-55.13
right yes
请问
55.13-55.21
the question is if I delete one tuple in the middle
你的问题是，如果我删除page中间位置的⼀个tuple
55.21-
again I see tuple 3 what do I do it up above nothing miss on array？
就好⽐这个tuple 3来说，如果我按照刚才说的做了，上⾯这个Slot Array的对应slot会指向⼀个
空（nothing）？
55.30-55.33
yes so again the header could different systems do different things
再说⼀遍，不同的系统做不同的事情
55.33-55.39
the header could have a bitmap and say you know here's the slots that are empty that
you could put point something in
在header中有⼀个位图，通过它你可以知道哪些slot是空的，这样你就能够在它⾥⾯放些东⻄
55.39-55.42
or I just squential scan and read it
或者我可以进⾏循序扫描，就可以读到哪些slot是空的
55.42-55.43
right it doesn't matter
right 这没什么的
55.43-55.54
the key thing though I think is that the other parts of the system don't know and don't
care that where I'm actually physically stored
我觉得关键事情在于系统的其他部分不知道也不在意我数据保存的物理位置在哪
55.54-55.59
like it first so for tuple 1 right this comes out of the slot here
⽐如说，tuple1是放在这个slot⾥⾯
55.,59-56.11
right so in the upper part of the system it would say Oh tuple one you find it in the page
one two three， at slot zero slot one depending on what your starting offset is
系统的上层部分表示我要找tuple1在page123中，那么这个tuple是在slot 0或slot 1处找到，具
体是slot 0还是1取决于你的起点偏移量（知秋注：数据存储的位置相对于开始位置的偏移量，
因为slot存储的是偏移量）
56.11-56.15
so now no matter how I reorganize my page and move tuple 1 around
现在，不管我如何整理我的page，也不管我怎么去移动tuple1
56.15-56.19
I know that I always want to go to the first slot to find where it's actually located
我知道我始终想去第⼀个slot处找到这个tuple1，这也是它实际所在的位置
56.19-56.21
and now if I reorganize
现在如果我整理page的话
56.21-56.23
I don't have to update my indexes on to update anything
我⽆须去更新我的索引，也不⽤去更新任何东⻄
56.23-56.26
and this is sort of what the page directory is trying to do as well
这也是page⽬录所试着做的事情
56.26-56.33
so no matter where I move the pages on the file either on disk or different look you know
on the network
So，不管我是将⽂件中的page移动到磁盘上还是⽹络上
56.33-56.37
other parts of the system don't care where it actually got moved to
系统的其他部分都不会关⼼这个page实际移动到了哪⾥
56.37-56.39
because I have a page once you know I have the page ID
因为你们知道我有page id
56.39-56.42
I can only use the page directory to find where it's actually main stored
我只能通过page⽬录来找到它实际所保存的位置
56.42-56.49
right these indirection layers avoid having to have updates propagate through all the
parts of the system
这些indirection层避免了这些位置更新信息传播到系统的其他上层部分（知秋注：上层只需要知
道⼀个page id就可以了，可以思考下GC，Java只保持对象间的引⽤关系就好，⾄于在对象到
底存在内存哪个位置，随着GC进⾏，是会发⽣变化的，此处的page ID就好⽐是维护引⽤关系
⼀样）
56.49-56.50
yes
请问
56.57-57.02
his question is how do I know that tuple one is stored in in slot one
他的问题是，我该如何知道tuple1就是保存在slot 1中的
57.14-57.17
so this is always in the last slide
So，这⼀般是最后⼀张幻灯⽚
57.17-57.18
but let's talk about it now
但我们现在就来讲下这个问题
57.18-57.24
so the way we identify tuples is through these record IDs or tuple IDs
我们识别tuple的⽅式是通过这些record id或者tuple id来做到的
57.24-57.35
and it's essentially a unique identifier to say here's the logical location or a logical
address of a tuple
本质上来讲，它是⼀个唯⼀标识符，⽤来表示⼀个tuple的逻辑地址
57.35-57.38
it's a blend of logical and physical
它是⼀种逻辑位置和物理位置的结合
57.38-57.42
but usually the page ID and like the offset or the slot
但通常情况下，我们是使⽤page id加offset值或者slot来进⾏表示
57.42-57.44
so all the parts of the system that we want to address tuple one
对于我们系统的所有部分来讲，我们想要去找到tuple 1的位置
57.44-57.47
right they don't know what tuple 1 is
但它们并不知道tuple 1是什么
57.47-57.48
they just know I have a page ID and a slot number
它们只知道我有⼀个page id以及⼀个slot number
57.48-57.52
and so I go to the page directory and say I want page 1 2 3
So，我跑去page⽬录那⾥，并表示我想要page123
57.52-57.54
the page directory says oh it's in this file and this offset jump to that page
⽬录就会表示它在这个⽂件中的这个offset值所在的地⽅
57.44-57.57
then I get to that page
然后，我就得到了这个page
57.57-57.59
now I say oh I want slot 1
现在，我表示我想要slot 1
57.59-58.01
I look at my slot array
于是我在我的slot数组中进⾏查找
58.01-58.03
and that tells me where in that page you can find the data that I want
它就会告诉我，我可以在page中的哪个位置找到我想要的数据
58.03-58.11
so other parts of the system like the indexes log records and other things they're going
to address tuples through these record IDs
So，对于dbms系统的其他部分，例如索引，⽇志或者其他东⻄来说，它们可以通过record id来
定位tuple的位置
58.11-58.15
that's separate from the page
1563
00:58:22,250 --> 00:58:34,810
like as well yes me it like
58.35-58.35
I'll give a demo
我会⽤⼀个demo来向你解释
58.35-58.44
hope let's make myself like say I want to find find that the salary find the the student
record or the professor record the name Andy
假设我想去找到某个名字叫Andy的学⽣或者教授的记录
58.44-58.46
I look in the index on the name
我会去看下索引上的名字
58.46-58.49
and something to say oh there's a professor named Andy
我表示，Oh，我看到这⾥有⼀个叫Andy的教授
58.49-58.53
and he has a record ID of page one two three offset slot one
他的record id是 page 123，偏移值是slot 1
58.53-58.55
that's what index gives me
这就是索引所给我的信息
58.55-58.57
so then I say it go to the page directory
接着，我跑到page⽬录那⾥
58.57-58.57
okay
58.57-59.01
Gav where do I find page one two three you go get it for me
并对它表示，我在哪⾥能找到page123，请你帮我找⼀下
59.01-59.02
it goes and gets it
page⽬录就会帮我找到它，并告诉我这个page的位置
59.02-59.03
now I have the pointer to the page
现在我就得到了指向这个page的指针
59.03-59.05
and say oh I want slot one
并表示，我想要slot 1中的数据
59.05-59.09
I look at my slot array and that tells me what offset the jump to that page to find that
need
于是我就在我的slot数组查找我所需要的数据在该page的偏移值是多少，然后跳到那个位置
59.09-59.13
right and so different database systems do different things
So，不同的数据库系统做不同的事情
59.13-59.17
the most common approach is the page ID and the slot number the offset
其中最常⻅的⽅法就是通过page id和偏移值slot number来确定tuple的位置
59.17-59.24
and again advantage of this is that if I start moving data around either moving the page
around or moving data within the page itself
这种做法的优势在于如果我移动数据，不管是移动page也好，还是在这个page内移动数据也罢
59.24-59.27
the index and all the other crap doesn't have to get updated
我们⽆须去更新这些索引和其他的⼀些东⻄
59.27-59.30
because they're still looking at page one two three offset one
因为它们依然会去page123和偏移量1的地⽅查找数据
59.30-59.36
so okay now let me I'll give a demo explain some more detail
So，我通过⼀个demo来解释下细节
59.36-59.38
so in different database systems do different things
So，不同的数据库系统做不同的事情
59.38-59.43
like in Postgres it'll be 4 bytes or equals 10 bytes，Oracle 10 bytes there's a bunch of
extra metadata that they store
例如，在Postgres中，CTID的⼤⼩是4byte。然⽽，在Oracle中的ROWID使⽤了10byte来保存
⼀系列元数据
59.43-59.45
and sequel Lite is 8 bytes
在SQLite中的ROWID则是8byte
========================================
59.45-59.47
so let's give a demo
So，我们来看个例⼦
59.47-59.49
because that's always fun
因为它总是很有趣
59.50-59.53
because I hate typing on the surface
因为我⾮常讨厌在surface上打字
59.53-59.56
and use my other laptop
算了，我还是⽤我另⼀台笔记本吧
将它们组合在⼀起到我所实际情况来所在
03-04
59.56-59.57
and I can see it better
这样看起来就好多了
59.57-1.00.02
alright so I'm gonna give an example again a what of how we can actually see what
these pages look like
我会给出⼀个例⼦，通过这个例⼦，我们就能看到这些page是什么样⼦了
1.00.02-1.00.06
because again the database system that stores this internally
因为数据库系统将这些page保存在内部
1.00.06-1.00.08
you're not supposed to see it
你们⼀般不会看到这些page
1.00.08-1.00.10
but there's different commands to do to actually to get at it
但此处通过⼀些不同的命令，我们就能看到它
1.00.10-1.00.15
I can't were in the back see that or is it too dark or too light
站在这⾥我没办法看到投影屏幕是太暗还是太亮
1.00.15-1.00.18
how's that better
这样好多了吗？
1.00.18-1.00.19
ok
1.00.19-1.00.25
alright so we're going to make a we're gonna make a simple table
这⾥我们来创建⼀张简单表
1.00.25-1.00.36
that has two columns ID and value
它⾥⾯有两列，即id和val
1.00.36-1.00.37
and we're gonna insert some tuples in it
这⾥我们要插⼊⼀些tuple
1.00.37-1.00.38
all right
1.00.38-1.00.39
so this is Postgres
这⾥我们⽤的是Postgres
1.00.39-1.00.43
right so you see ID and value
So，你们能看到这个表中的id和value数据
1.00.43-1.00.45
so Postgres has this thing called the CTID
Postgres将这个东⻄称为ctid
1.00.45-1.00.49
that is represents the physical location of the data
它表示了该数据所在的物理位置
1.00.49-1.00.53
so I can add this like virtual column here a CT ID
这⾥我可以添加⼀个叫ctid的虚拟列
1.00.53-1.00.55
and I get it in my output
并且我在我的输出结果中也看到了ctid的结果
1.00.55-1.01.01
so this now is a tuple there that's gonna have the page ID and the offset （Andy⼝误）
在ctid中，我们可以看到这⾥⾯有⼀个page id 0，以及对应的slot number
1.01.01-1.01.03
so again here's the data I started three tuples
这⾥是我刚插⼊的3条tuple
1.01.03-1.01.07
so now it's saying that at page zero slot one is the first tuple
我们的第⼀条tuple是放在page 0上的slot 1处
1.01.07-1.01.09
page zero slot 2 is the second tuple
(0,2)处的则是第⼆个tuple
1.01.09-1.01.11
page zero slot 3 is the third tuple
(0,3)则是第⼆个tuple
1.01.11-1.01.15
right so this again so that's not actually storing this data
So它实际上并没有保存这个数据
1.01.15-1.01.18
it can derive this when it runs the query
当我们执⾏这个查询时，它就能由此得出这些数据
1.01.18-1.01.20
because it says oh I look at my page I see the slots
因为它表示我在我的page上看到了这些slot
1.01.20-1.01.23
here's the tuple that are actually found
这是我们实际所找到的tuple
1.01.23-1.01.23
all right
1.01.23-1.01.26
so let's go ahead and delete one of these tuples
So，让我们继续，这⾥我们删掉其中⼀个tuple
1.01.26-1.01.29
let's say I delete the the second one
那让我来删掉第⼆个tuple
1.01.29-1.01.32
so I go back and look at my tuple
现在，我们再来看下我们的tuple
1.01.32-1.01.34
alright look at my data
来看下我们的数据
1.01.34-1.01.37
and you can see that it deleted the second tuple
你们可以看到，这⾥已经删掉了第⼆个tuple
1.01.37-1.01.39
but it didn't reorganize the page
但数据库系统并没有整理这个page
1.01.39-1.01.44
right the third tuple is still it you know page 0 offset 3 or slot 3
第三个tuple依然是在(0,3)这个位置上
1.01.44-1.01.50
alright so let's say now I go insert a new tuple
现在我们来插⼊⼀个新的tuple
1.01.50-1.01.53
in what do you think is gonna do
你们来思考下，这会发⽣什么
1.01.53-1.01.58
with that what
这⾥会发⽣什么呢？
1.01.58-1.02.00
so again I had a deleted a second tuple
之前我已经删除了第⼆个tuple
1.02.00-1.02.03
now I have a tuple slot one it slot three
我在slot 1和3上各有⼀个tuple
1.02.03-1.02.06
I started a new tuple is it gonna be slot two or slot 4
我所要插⼊的新tuple的位置会在slot 2还是slot 4上呢？
1.02.06-1.02.11
raise your hand it's a slot two half
如果觉得是在slot2上的⼈请举⼿，emmm有⼀半⼈
1.02.11-1.02.14
slot three are starting slot 4 less
⽀持slot4的⼈请举⼿，看起来少了点
1.02.14-1.02.16
slot four
答案是slot 4
1.02.16-1.02.19
right it's not wrong right
这其实并没有错
1.02.19-1.02.24
because for our purposes， the relational models that doesn't say anything about the
order of how we insert tuples
因为对于我们的⽬的⽽⾔，关系模型对于我们插⼊tuple的顺序并不在意
1.02.24-1.02.28
Postgres it's way to implement I decided to put it at the end
在Postgres的实现中，它会将我们插⼊的数据放到最后
1.02.28-1.02.31
so Postgres has this thing called the vacuum
在Postgres中有种被称为vaccum的东⻄
1.02.31-1.02.37
think of this again as like the garbage collector for my for the database
我们可以把它当成是数据库中的垃圾回收器
1.02.37-1.02.40
so it's gonna go through and reorganize all the pages
vaccum会去遍历这些page，然后整理这些page
1.02.40-1.02.44
and actually may take a while
这实际上会花些时间来完成
1.02.44-1.02.44
so I'll come back to that
So，我们之后再来看它
1.02.44-1.02.55
but when it does this it's gonna then say oh well I know that I have a free space in, so
I'm gonna compact the pages and write them out sequentially
当它执⾏此操作时，它会找到那些空出来的空间，然后将这些page进⾏压缩，并将数据按顺序
写⼊到这些page中
当它执⾏此操作时，它会说，咦，我知道这⾥还有⼀个空闲空间，然后它会将这些page进⾏压
缩，并将数据按顺序写⼊到这些page中
1.02.55-1.02.56
all right
1.02.56-1.02.58
it's gonna take a while let's look at other ones
我们还需要等⼀会，我们先来看下另⼀个
1.02.58-1.03.03
so we can do sequel server same thing
So，我们现在在SQL server中来进⾏相同操作
1.03.03-1.03.06
I have three tuples
这⾥我有三个tuple
1.03.06-1.03.09
let me drop the table start over
让我drop掉这张表，然后重新来过
1.03.09-1.03.22
so now I have three tuples
现在我有三个tuple
1.03.22-1.03.27
select * from r
select * from r
1.03.27-1.03.29
right one two three
我们现在有三条数据
1.03.29-1.03.32
so Postgres does start sequel server doesn't have the CT ID
SQL server中并没有ctid
1.03.32-1.03.37
it has this like other built-in function like this
它拥有像这样的其他内置函数
1.03.37-1.03.39
and it tells you here's the file ID
此处，它会告诉你，这⾥有个File id
1.03.39-1.03.42
here's the page number and here's the slot zero one two
此处可以看到所在的page数，以及slot 0,1和2
1.03.42-1.03.45
okay so let's do the same thing
Ok，让我们来做下和之前相同的事情
1.03.45-1.03.45
let's delete a tuple
我们来删掉⼀个tuple
1.03.45-1.03.49
insert a new one
并插⼊⼀个新的tuple
1.03.49-1.03.52
oh yeah we can look at the old one query
我们可以看到原来的查询结果现在变成了这样
1.03.52-1.03.57
and it didn't come back it still says you know uh zero one
原来的记录就没办法回来了，查询结果如图所示，我们能看到现在tuple的位置在slot 0和1处
1.03.57-1.03.59
actually no I didn't come back it sorry take that back
实际上是我没让它回来，现在我将那个tuple放回去
1.03.59-1.04.01
let's start this over again
我们再重来⼀遍
1.04.01-1.04.02
I missed that sorry
抱歉，我漏掉了那个
1.04.02-1.04.06
I always remember which one doesn't correctly or not
我⼀直记得有个tuple不对来着
1.04.06-1.04.09
again it's not correct which one does it that way
它看起来还是不对，我们再来⼀遍
1.04.09-1.04.12
so we insert three tuples
这⾥我们插⼊三个tuple
1.04.12-1.04.17
do a select
我们来做下查询操作
1.04.17-1.04.18
right 0 1 2
我们可以看到slot 0,1和2
1.04.18-1.04.21
now I delete the second tuple
现在我将第⼆个tuple删掉
1.04.21-1.04.25
do the same select
然后再做⼀次查询操作
1.04.25-1.04.28
oh did 0 2
我们所得到的结果是0和2
1.04.28-1.04.29
- I didn't come back
我好像没法回去了
1.04.29-1.04.34
yet sorry let's insert another one again
我们再来插⼊另⼀个tuple
1.04.34-1.04.40
0 1 2
我们所得到的结果是0,1和2
1.04.40-1.04.49
so so so this so this was the the the second tube this was 2
So此处我们之前得到的是2
1.04.49-1.04.50
now it's 1
现在它变成了1
1.04.50-1.04.51
it made this 2
在SQL server中，它变成了2
1.04.51-1.04.57
because what it did it says when it updated page says oh I have a free space, let me
compact it and write it out
因为当我们在更新page时，SQL server表示这⾥有可⽤空间，那它就会将page变得紧凑，然后
将数据进⾏写出到page上
1.04.57-1.05.01
right again from the high-level part of the system
从系统的⾼级层⾯来看
1.05.01-1.05.04
we don't know we don't care internally can do whatever it wanted
我们并不在意它内部是怎么做的
1.05.04-1.05.06
so going back to Postgres
So，回过头来看Postgres
1.05.06-1.05.08
was it one？
是这个窗⼝么？
1.05.08-1.05.11
Postgres when we inserted the new tuple I put it at the end
在Postgres中，当我们插⼊新的tuple时，它会往末尾去插⼊数据
1.05.11-1.05.13
but then I run the vacuum
接着，我执⾏vaccum
1.05.13-1.05.16
and that does basically compaction right now
基本上来讲，它所做的就是将数据进⾏压缩
1.05.16-1.05.20
if we organized a zero one three one two three
如果我们组织⼀下，这⾥就变成了1,2以及3
1.05.20-1.05.24
where that was one three four
此处原先是1,3,4
1.05.24-1.05.27
right so the last one I want to show is Oracle
So，最后我想展示的是Oracle
1.05.27-1.05.28
and although Oracle sponsor in the class
尽管来⾃Oracle的赞助商也在这堂课上
1.05.28-1.05.34
I will just say this their terminals
我还是要说他们的terminal真的是垃圾
1.05.34-1.05.35
you could like you can't hit up
你没法使⽤⽅向键中的向上键
1.05.35-1.05.37
there's no way to go back
这让我没办法回到之前所输的命令
1.05.37-1.05.42
and drop table r
这⾥我把表r给drop了
1.05.421.05.44
let's create a table
让我们来创建⼀张表
1.05.44-1.05.49
and you can't you can't so this is the nice shortcut
这是⼀个很棒的快捷键
1.05.49-1.05.51
like every database system like you do inserts
在每个数据库系统中，当你做插⼊操作的时候
1.05.51-1.05.54
like one insert query and then once two commas to separate it sort them all once
在insert查询中，你通过如图上所示使⽤两个逗号来将多个你想插⼊的记录分开，这样你可以⼀
次性插⼊你想插⼊的数据
1.05.54-1.05.56
Oracle doesn't let you do that
但Oracle并不⽀持你这么做
1.05.56-1.05.59
so I have to go do one by one
那我只能⼀个个的插⼊了
1.06.00-1.06.07
so Oracle has something called a row ID
Oracle中有个叫rowid的东⻄
1.06.07-1.06.11
again so this is an internal thing that Oracle's maintaining
这是Oracle中内部所维护的东⻄
1.06.11-1.06.15
you normally run queries you don't see this
通常你执⾏查询的时候不会看到这个
1.06.15-1.06.20
but if you just add the row ID column is that like a you know internal virtual column it
exposes this information
但如果如图中所示那样，你添加了ROWID这⼀内部虚拟列，Oracle就会暴露出这个信息
1.06.20-1.06.22
so this is some ten byte gibberish
这看起来有点像胡⾔乱语
1.06.22-1.06.24
I mean we don't have interpret this
我的意思是，我们⽆须去解释它
1.06.24-1.06.25
so there is a command
So，此处有条命令
1.06.25-1.06.27
there's a bunch of functions you can run
这⾥有⼀系列你可以运⾏的函数
1.06.27-1.06.30
again I found this in Internet I didn't write this
我在⽹上找到的这些，这些东⻄并不是我写的
1.06.30-1.06.32
the basically deciphered this
基本上是将它破译了
1.06.32-1.06.36
and now you get like here's the file number the block number and the row slot
现在，你就会得到如图所示的，FILENUM，BLOCKNUM以及ROWSLOT之类的东⻄
1.06.36-1.06.39
the same way we saw for before for SQL server
我们在之前的SQL server中就⻅过相同的东⻄
1.06.39-1.06.39
okay
1.06.39-1.06.42
let's do that let's delete the second guy
让我们把第⼆条记录给删掉
1.06.42-1.06.46
and go back can't do that
现在我们回去，emmm看来没法这么搞
1.06.46-1.06.57
so it was 0 1 2 for the slots
此处ROWSOLT分别是0、1和2
1.06.57-1.06.59
and out still at 0 2
现在则是0和2
1.06.59-1.07.02
let's go insert our new tuple
现在让我们来插⼊新的tuple
1.07.021.07.04
alright
1.07.04-1.07.10
so who says it's gonna be at slot 1 2
So，你们中有没有⼈表示这条记录的ROWSLOT会是1或者2的？
1.07.10-1.07.14
okay who says it's gonna be slot 4 or slot 3
Ok，有没有⼈表示这条记录的ROWSLOT会是4或者3的？
1.07.14-1.07.17
even less nobody knows
看起来没⼈知道
1.07.17-1.07.22
ok slot three
Ok，答案是ROWSLOT 3
1.07.22-1.07.24
right
1.07.24-1.07.29
so again the main to sql server compacted the page with we are wrote it back out
sql server会在我们写⼊数据的时候进⾏page的压缩
1.07.29-1.07.32
Oracle and Postgres just leave the empty slot there
Oracle和Postgres只会将空的slot放在那⾥，啥也不管
1.07.32-1.07.33
okay
1.07.33-1.07.37
again it doesn't matter to the other parts of the system
这对于系统的其他部分⽽⾔并没有什么关系
1.07.37-1.07.43
this is just something how the system is internally organizing tuples or slots within the
pages
这只是系统内部组织page内tuple或者slot的⽅式
1.07.43-1.07.43
okay
1.07.43-1.07.47
so let's go back
⾔归正传
1.07.47-1.07.52
alright
1.07.52-1.07.55
so did I answer your question I realize that was a long
So，你是否觉得我回答了你的问题？我觉得我说的可能有点⻓了
1.07.55-1.07.55
okay
Ok
1.07.55-1.08.02
yeah so let's talk about now are we doing time yes
请问
1.08.02*-1.08.06
this question is why do exposed to the API to the user
他的问题是为什么要将这个API暴露给⽤户
1.08.06-1.08.18
so database systems are very complex pieces of software
So，数据库系统是⼀类相当复杂的软件
1.08.18-1.08.21
people get paid as money to maintain them
⼈们需要花钱来维护它们
1.08.21-1.08.27
and so by exposing all the metadata you can to the end user like administrator
通过暴露所有你能暴露的元数据给终端⽤户，例如管理员
1.08.27-
it just potentially hyper help them to cipher why it's doing certain things
它可能会帮助他们弄清楚为什么它在做某些事情
-1.08.33
that's what I would say
这就是我想说的
1.08.33-1.08.37
but it you don't want to write your application using any of this
但你并不想在写你⾃⼰的应⽤程序时，⽤到这些中的任何⼀个
1.08.37-1.08.38
it's not reliable
这并不可靠
1.08.38-1.08.38
right
1.08.38-1.08.42
um let's use Postgres cuz i know how to do Postgres
这⾥让我们拿Postgres来举例，因为我知道在Postgres中该怎么做
1.08.42-1.08.46
so going back to this
So，回到此处
1.08.46-1.08.49
so Postgres again we've already done the compaction with the vacuum
在Postgres中，我们已经通过使⽤vaccum来把数据进⾏压实
1.08.49-1.08.52
but Postgres will actually let you do this
但Postgres实际上会让你这么做
1.08.52-1.08.58
you can say where CT ID let me put it up sorry
你可以这样写
1.08.58-1.09.03
where c tige equals and then 0 1
SQL语句如图所示
1.09.03-1.09.06
right
1.09.06-1.09.09
so I can access the tuple exactly based on its like stores location
So我可以基于存储位置就能访问到这个tuple
1.09.09-1.09.12
I don't want to do this in my application
我不想在我的应⽤中这么做
1.09.12-1.09.17
because again at any time the database systems allowed to reorganize it, I could end up
with a different CTID
因为在任意时候，数据库系统被允许去重新组织ctid，最终我会得到⼀个不同的ctid（知秋注：
和Java中的GC⼀样，对象的地址在GC后可能会发⽣改变，但依赖引⽤关系不变）
1.09.17-1.09.11
so it's unique like you know I can uniquely identify a tuple
So，这个ctid是唯⼀的，通过它我可以找到这个唯⼀的tuple
1.09.11-1.09.23
but I don't want to do that
但我不想这么做
1.09.23-1.09.25
because it'll I get it screwed up
因为我会搞砸它
1.09.25-1.09.31
again I think the answers is just exposing the internals of the system to allow
administrators to understand what's going on
我觉得答案是通过将系统内部这些东⻄暴露出来，使得管理员能够理解正在发⽣什么
1.09.31-1.09.34
yes
请问
1.09.34-1.09.45
boom his question is what happens if you have a if you try to name a column with that
他的问题是如果我们试着⽤这个来命名⼀个列，会发⽣什么
1.09.45-1.09.46
I might trying to name a table with that
我可能会试着⽤它来命名⼀张表
1.09.46-1.09.47
let's see that
我们来看⼀下
1.09.47-1.09.48
so drop table xxx
DROP TABLE xxx
1.09.48-1.09.58
create table xxx ID and CT ID int
SQL语句如图所示
1.09.58-1.10
look who says it'll be allowed to do this
有没有⼈认为系统会允许这么做？
1.10.00-1.10.01
yes or no
⾏还是不⾏
1.10.01-1.10.02
raise your hand yes
认为⾏的请举⼿
1.10.02-10.05
where you hand no
⽀持不⾏的请举⼿
1.10.05-1.10.07
yes you can't do that
是的，这么做不⾏
1.10.07-1.10.12
let's try Oracle
我们来试下Oracle
1.10.12-1.10.21
create table xxx id int and row ID int
SQL语句如图所示
1.10.21-1.10.22
nope
1.10.22-1.10.23
invalid
⽆效~
1.10.23-1.10.25
so yes, it's a reserved name
没错，这是⼀个保留名
1.10.25-1.10.33
there's a bunch of other things you can't like I can't name actually like I cant name a
column
实际上这⾥⾯还有⼀些其他的保留字，我们不能将它们作为列名来使⽤
1.10.33-1.10.37
this is SQLite sorry
抱歉，这是SQLite
1.10.36-1.10.41
SQL server thats Postgres
这是SQL server么？看起来并不是，它是Postgres
1.10.41-1.10.45
okay so let's try a create table like you can't name a column int I don't think
我们试着创建⼀张列名为INT的表
1.10.45-1.10.46
oh you can
tm居然能⾏？！
1.10.52-1.10.54
different database systems do different things
不同的数据库系统做不同的事
1.10.54-1.10.57
yeah okay
好吧
1.10.57-1.10.59
don't do that
请不要这么做
1.10.59-1.11.00
that's a bad idea
这是⼀个糟糕的想法
1.11.00-1.11.02
all right
1.11.02-1.1103
how we dont time
我来看下我们还剩多少时间
1.11.03-1.11.13
so so we're short in time
So，我们的时间似乎有点不够了
1.11.13-1.11.15
so let me quickly talk about tuple layouts
让我速度讲下tuple布局
1.11.15-1.11.21
and then that'll set up set it up what we're talking about for next class
这也是我们下堂课要讨论的内容
1.11.21-1.11.27
so a tuple in our world it's just a sequence of bytes
在我们的世界中，tuple只是⼀串字节
1.11.27-1.11.33
all right if we just we get a slot offset，we just write a bunch of sequence of bytes and
we're done
如果我们拿到了slot偏移量，我们往⾥⾯写⼊⼀些字节，这就完事了
1.11.33-1.11.37 ******
and so it's the job of the database to be able to interpret what those bytes actually mean
again
数据库的工作就是能够再次解释这些字节的实际含义
1.11.37-1.11.39
and that's where this schema comes in
这就是为什么要有schema的原因
1.11.39-1.11.41
so the scheme is gonna say I have an int it's 32 bits
schema表示我有⼀个int，它的⻓度是32位
1.11.41-1.11.42
I've an int 64 bits
我还有⼀个⻓度为64位的int
1.11.42-1.11.45
so when I look at my sequence of bytes
So，当我在查看我的字节序列时
1.11.45-1.11.48
I know how to jump to different offsets to find the columns that I want
我知道该如何跳转到不同的偏移量处来找到我想要的列
1.11.48-1.11.49
all right
1.11.49-1.11.51
so again it just looks like this
它看起来就像这样
1.11.51-1.11.56
and our tuple again this is like the starting location within an offset within our page
在我们的page中，根据相对于起始位置的偏移量来找到这个tuple
1.11.56-1.12.02
we'll have a header keep track of different things like what whether you know what what
transactional query modify this
我们通过⼀个header来跟踪⼀些不同的东⻄，例如哪⼀个事务查询修改了这个tuple
1.12.02-1.12.07
and then we'll have the actual the metadata about things, like Well we have null values
and they are actually tuples
然后我们还有类似于这样的元数据，例如null值实际上也是元数据
1.12.09-1.12.15
so we typically don't need to store the metadata about the tuple with in the tuple itself
So，通常，我们⽆须将该tuple的元数据保存在这个tuple⾥⾯
1.12.15-1.12.18
right so when we store tuple
当我们保存tuple时
1.12.18-1.12.20
but we don't say hey I have four columns and there are this type
我们没必要去说，我们有四列，它们的类型是这种类型
1.12.20-1.12.26
we store that and a higher-level metadata information either within the page or within
the catalog pages themselves
我们可以将这种更⾼级的元数据信息保存在这个page⾥，也可以放在catalog page⾥⾯
1.12.26-1.12.32
you have to do this in like JSON databases or schemas databases like MongoDB
你必须在⽀持JSON或者schema的数据库（例如，MongoDB）中做这件事
1.12.32-1.12.37
because every single tuple，every single record could be different， every document
could be different
因为每条tuple或者每条记录都可能不同，每个document 也可能不同
1.12.37-1.12.40
so you have to store what the metadata about what it's actually inside of it
So，你必须保存有关其实际内容的元数据
1.12.40-1.12.49
so the inside the tuple data itself you typically store them in the order that you created
the table
通常情况下，你是根据你创建表时的顺序来保存这些tuple数据
1.12.49-1.12.52
so if I say you know create table ABCDE
建表语句如图所示
1.12.52-1.12.56
I'll just usually most systems store in the order that they happened
通常⼤部分数据库系统会按照它们的创建时的顺序进⾏存储
1.12.56-1.12.57
right then that we got created
这样我们就创建完⼀张表了
1.12.57-1.13.00
you don't have to like relational model says you don't have to do this
关系模型表示你⽆须这么做
1.13.00-1.13.02
but typically most systems do this
但通常⼤部分系统都会这么做
1.13.02-1.13.06
if you get talked about sort of you know in memory systems that are trying to be cache
efficient
在内存型数据库系统中，它们会试着提⾼缓存效率
1.13.06-1.13.10 ！！！！！！
you can reorder this so that your word aligned for cache lines
你可以对数据进⾏重排序，这样你的数据就能字对⻬了
1.13.10-1.13.12
but for our purposes we don't care right
但就我们的⽬的⽽⾔，我们并不在意
1.13.12-1.13.22
so the last thing we talked about was his question before about storing data from
different tables inside the same page
So我们最后要讨论的问题是之前他提出的问题，即将来⾃不同表的数据保存在同⼀个page中
1.13.22-1.13.25
and I said most systems don't do this
我说过，⼤部分的系统都不会这么做
1.13.25-1.13.30
and the reason it the reason why you don't wanna do this is
之所以我们不想做这个的原因是
1.13.30-1.13.36
because again if you want the things to be self-contained, you don't want a bunch of
extra metadata about these different tables
因为如果你想让page变得独⽴，那么你就不会想去保存⼀⼤堆关于不同表的额外元数据
1.13.36-1.13.42
Well it does show up is when you denormalize tables or prejoin tables
当你在对表进⾏反范式化设计或者对表进⾏prejoin时，就会出现类似这种情况（知秋注：数据
冗余，在更新时要同时更新多张表，在这⾥的话，就是⼀个page中多个表数据，更新，删除或
压缩你懂得）
1.13.42-1.13.45
so we're not talking about normal forms or functional dependencies in this class
So，在这⻔课中，我们不会去讨论有关范式或者是函数依赖的东⻄
1.13.45-1.13.48
you don't know yet but you'll thank me when you're older
你现在虽然不了解，但当你⻓⼤后，你就会感谢我
1.13.48-1.13.52
because they're terrible people cry every single time you try to teach them
因为它们难的可怕，你每次教别⼈关于这些，他们应该都会被吓哭
1.13.52-1.13.54
most database classes to teach them I don't think they're important
虽然⼤部分数据库课程会教这个，但我觉得它们并不重要
1.13.54-1.13.58
nobody does this in reality in the practice
在现实⽣活中，⼏乎没有⼈将它⽤于实战
1.13.58-1.14.00
maybe some DBAs do
可能有些DBA会这么做
1.14.00-1.14.03
but almost nobody does
但⼤部分情况下，⼏乎没⼈这么⼲
1.14.03-1.14.07
so for that reason，when I first taught this class we did two whole lectures on normal
forms
基于这个理由，当我第⼀次教这⻔课的时候，我们花了两节课来讲范式
1.14.07-1.14.09
we don't need to do that
我们⽆须这么做
1.14.09-1.14.13
you just need to know what they exist that they that it exists and what it means
你只需要知道有这么个东⻄，以及它所意味着什么
1.14.13-1.14.15
so that's what this one slide is
这也就是这张幻灯⽚所讲的内容了
1.14.15-1.14.17
so we're gonna cuts like two lectures in one slide
So，我们相当于把两节课的内容放在了⼀张幻灯⽚上
1.14.17-1.14.17
okay
1.14.17-1.14.23
so normalization is basically how would we split up our database across different tables
数据库规范基本上来讲就是，关于我们如何将数据库拆分到不同的表中
1.14.23-1.14.26
and this sort of naturally happens when you have foreign keys
当你使⽤外键时，这种情况就⾃然⽽然地发⽣了
1.14.26-1.14.28
like I have artists and albums
例如，我有Artists表和Albums表
1.14.28-1.14.30
I could have you know foreign keys sort of break them up
我可以使⽤外键来将它们分开
1.14.30-1.14.36
and so we do this sort of happens naturally as we design our application
So，当我们在设计我们得应⽤程序时，我们就会⾃然⽽然地这么做了
1.14.36-1.14.41
now there's some cases where we actually want to embed one table inside another
在某些情况中，我们实际上想将⼀张表嵌⼊另⼀张表中
1.14.41-1.14.44
right if we want to avoid the overhead， it may be doing a join
如果我们想避免这种开销，我们就会使⽤join操作
1.14.44-1.14.49
we can say here's all the albums that artists put out which is inline them in its own tuple
我们可以将所有artist所发布的album在它⾃⼰的tuple中与artist进⾏内联
1.14.49-1.14.56
and in that case within a single page we could have data from two different tables
packed in the same page
在这种情况下，我们可以将两张不同表的数据放在同⼀个page中
1.14.56-1.14.58
so let's look really simple example
So，我们来看个⾮常简单的例⼦
1.14.58-1.14.59
I have two tables foo and bar
我有两张表，foo和bar
1.14.59-1.15.03
bar has a foreign key dependency reference to the foo table
在bar表中有⼀个来⾃于foo表中的外键依赖引⽤
1.15.03-1.15.06
so normally I would store my tuples like this
通常情况下，我会这样存储我的tuple
1.15.06-1.15.09
I would store them it's completely separate
我将它们完全分开存储
1.15.09-1.15.12
all the data for the bar tables stored in its page
所有bar表中的数据存在它⾃⼰的page中
1.15.12-1.15.14
and all the data for the foo table is stored in this page
所有foo表中的数据存在另⼀个page中
1.15.14-1.15.20
but if most of the time I'm trying to join these two tables together for every query, I want
to join these two tables together
在每次查询中，只有当我想将两张表进⾏join的时候，我才会进⾏join操作
1.15.20-1.15.24
right get me all the foods for give me all the bars for a given foo
即在给定的foo表记录后⾯跟着所有的bar记录
通过给定的foo来给我所有对应相关的bar记录（知秋注：两者信息都在，⼤家参考下join操作即
可）
1.15.24-1.15.30
then maybe what I want to do is just embed the bar tuples directly inside of the foo tuple
接着，我想做的是，将bar的tuple直接内嵌在foo的tuple中
1.15.30-1.15.32
so now if you go back here
如果我们回到这⾥
1.15.32-1.15.40
like I had I was replicating the a attribute for every single bar tuple
我为每个bar表中的tuple复制了a属性
1.15.40-1.15.42
but now if I pack it inside of it I don't need to repeat it
但现在如果我将它打包进foo表的tuple中，我⽆须这些重复记录
1.15.42-1.15.46
I just have the columns that are unique for the other table
我所拥有的这些列对于其他表来说是独⼀⽆⼆的
1.15.46-1.15.49
right so this is called denormalization
这被称为反范式化
1.15.49-1.15.52 ？？？？？
another I think about it's like pre joining
这就像是在提前进⾏join操作⼀样
1.15.52-1.15.54
I'm packing tuples inside of each other
我将tuple彼此包装在⼀起
1.15.54-1.15.57
I can either do this logically by rewriting my application
我既可以通过重写我的应⽤程序来在逻辑上做到这⼀点
1.15.57-1.15.58
and creating tables that way
并且以这种⽅式建表
1.15.58-1.16.00
or I can do this physically which is what we care about here
也可以通过物理的⽅式来做到这点，同时这也是我们此处所关⼼的⽅法
1.16.00-1.16.03
and underneath the covers we're storing our pages like this
在内部，我们会以这样的⽅式存储我们的page
1.16.03-1.16.06
the application can still tell us hey I have two separate tables
应⽤程序依然能够告诉我们，它⾥⾯有两张单独的表
1.16.06-1.16.10
but underneath the covers and our pages will actually combine them attach them
together
但在内部，我们的page实际上会将它们合并在⼀起
1.16.10-1.16.19 *********
right so this is the only time I think that systems actually try to store data from two
different tables inside the same tuples
So，实际上这是我唯⼀⼀次认为系统尝试将来⾃两个不同表的数据保存在同⼀个tuple中
1.16.19-1.16.19
okay
1.16.19-1.16.22
this is not a new idea
这并不是什么新的想法
1.16.22-1.16.23
it's super old
它⾮常古⽼
1.16.23-1.16.24
goes back to the 1970s
这可以追溯到1970年代
1.16.24-1.16.31
IBM first invented this when they invented the first database system or the first
relational database system at IBM
当IBM发明了他们第⼀个数据库系统，或者说第⼀个关系型数据库系统时，IBM⾸先就发明了这
个
1.16.31-1.16.35 有bbbbbbbbbb⾳
but it turned out to be a huge pick to maintain in the software
但事实证明，这需要花很多精⼒来维护使⽤这个东⻄的软件
1.16.35-1.16.38
and then they abandon it when they went off and made db2
当IBM做出了DB2后，他们就放弃了这种⽅式
1.16.38-1.16.41
so system R was the first relation one of the first relational databases that are out there
So，R系统是发布的第⼀个关系型数据库
1.16.41-1.16.43
but they never commercialized it never sold it
但IBM并没有将它商业化，也没有出售它
1.16.43-1.16.46
but they took up some of the code in the 1980s and created db2
但在1980年代时，IBM抽取了R系统中的某些代码，并作出了DB2
1.16.46-1.16.48
which is still around today
到现在为⽌，依然有⼈使⽤DB2
1.16.48-1.16.53
and so it actually is showing up in more modern systems today
So，它实际上在当今更现代的系统中也出现了
1.16.53-1.16.55
so if you get cloud spanner from Google
如果你使⽤⾕歌的Cloud Spanner数据库
1.16.55-1.16.59
right if you have it when you defined a protobufs API
如果你定义了⼀个Protobuf API
1.16.59-1.17.03
you can actually pack in it'll pack in the two different tables together in the same tuple
那么实际上你可以将两张不同表的数据合并在同⼀个tuple中
1.17.03-1.17.07
there was a start up a long time ago ten years ago called akiban
⼗年前有⼀个叫Akiban的初创企业
1.17.07-1.17.11
that basically sold a storage engine for MySQL that did this kind of denormalization
automatically
他们将这个存储引擎卖给了MySQL，MySQL就可以做到这种⾃动化反范式的操作
1.17.11-1.17.12
they got bought by foundation DB
接着，他们被Foundation DB所收购
1.17.12-1.17.14
even a foundation DB got bought by Apple
然后，Foundation DB⼜被苹果给收购了
1.17.14-1.17.17
so akiban doesn't exist anymore
因此，akiban现在已经不复存在了
1.17.17-1.17.22
and then a bunch of these document databases or JSON databases are essentially doing
the same thing
其实有⼀系列⽂档型数据库或者JSON数据库本质上也能做到同样的事情
1.17.22-1.17.29
right when you define your JSON document，you can pre join a pack in related
attributes within the JSON document itself
当你在定义你的JSON document时，你可以在该JSON document中预先对相关属性进⾏join操
作
1.17.29-1.17.32 *****
and that's essentially doing the same thing
这基本上就是在做同样的事情
1.17.32-1.17.33
okay
1.17.33-1.17.38
that again that's the only time people actually store tuples from different tables inside
the same pages
实际上，这是唯⼀⼀次，⼈们可以将来⾃不同表的tuple存储在同⼀个page上
1.17.38-1.17.39
okay
1.17.39-1.17.40
so we covered this
这个我们已经介绍过了
1.17.40-1.17.43
and we're done
这边的内容就结束了
1.17.43-1.17.43
all right
1.17.43-1.17.46
so again what do we talk about today
So，总结下今天我们讲了些什么呢？
1.17.46-1.17.48
databases are organized in pages
数据库是按照page来组织数据的
1.17.48-1.17.50
they're different ways to track the pages that are in our files
有⼏种不同的⽅式来跟踪我们⽂件中的page
1.17.50-1.17.55
and then within this pages we can store them different ways and store our tuples inside
the pages differently
接着，在这些page中，我们可以⽤不同的⽅式来存储tuple
1.17.55-1.18.02
so for the first assignment first programming project we will already take care of the
page layout for you
因此，在第⼀个项⽬中，我们已经为你们弄好了page布局
1.18.02-1.18.03
all right
1.18.03-1.18.05
so well and we already written the disk manager for you
我们已经为你们写好了磁盘管理器
1.18.05-1.18.08
it's when we get into the second project
当我们在做第⼆个项⽬的时候
1.18.08-1.18.12
you're actually gonna have to define what the page layout is for your index
你们必须定义你们关于索引的page layout
1.18.12-1.18.13
that you're gonna build
你们也要去构建你们⾃⼰的索引
1.18.13-1.18.14
okay
1.18.14-1.18.19
it's next class we'll talk about how you actually represent values inside the tuples
在下节课中，我们会去讨论你们该如何表示tuple内部的值
1.18.19-1.18.25
so we'll go inside of the byte sequences for tuples
So，我们会深⼊tuple的字节序列中去
1.18.22-1.18.25
you talk about what the maximal attribute look like
1.18.25-1.18.27
and then we'll talk about storage models
接着，我们会去讨论存储模型
1.18.27-1.18.34
how are we actually gonna represent how we organize tuples within a table itself
即我们该如何在⼀张表内组织我们的tuple
1.18.34-1.18.35
all right
1.18.35-1.18.36
any questions
有任何疑问吗？
1.18.36-1.18.37
yes
请说
1.18.37-1.18.47
her question is which is a awesome question
她提的问题很棒
1.18.47-1.18.50
what is test-driven development look like for databases
数据库中的测试驱动开发是怎样的
1.18.50-1.18.52
how do I know I'm running queries correctly
我怎么样才知道我执⾏的查询是否正确
1.18.53-1.18.54
huge topic
这是⼀个范围很⼤的话题
1.18.54-1.18.56
let's talk about afterwards
我们以后再说吧
1.18.56-1.18.58
that's I'm extremely interested in that
实际上我对此⾮常感兴趣
1.18.58-1.19.00
I'm actually trying to hire someone to do that for us
实际上，我正试着招⼈来帮我们做这个
1.19.00-1.19.04
if you can do testing in databases，I can give you job yesterday
如果你能对数据库系统进⾏测试，那我昨天就能给你⼀份⼯作
1.19.04-1.19.07 字幕不对，待修正
okay then you can see your value
Ok，这样你就能找到你的价值所在
1.19.07-1.19.09
and any questions？
还有其他问题吗？
1.19.09-1.19.13
guys see you on Monday
我们下周⼀再⻅