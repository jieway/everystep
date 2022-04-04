# Lecture 3: GFS

## 1. 大型存储

事实证明存储是一个关键的抽象。一个简单的存储接口非常有用并且非常通用。所以用于构建分布式系统的很多想法也能用于设计存储系统或者其他表现良好的大型分布式存储系统。

## 2. 为什么读这篇论文？

如何设计出一个大型存储系统的优秀接口？如何设计存储系统的内部结构使其有良好的表现？

这篇论文涉及了大量会在6.824中出现的主题。例如，并行性能，容错，replication以及consistency（一致性）。

这篇论文中出现的一些东西理解起来也相当简单，并且也是一篇关于系统的优秀论文。其中讨论了在使用存储系统时从硬件到软件的各方面问题，而且这是一个现实中使用的成功设计。虽然是一篇发表在学术会议上的学术论文，但已经在实际中生活中运行了。

## 3. 为什么分布式难？

采用分布式通常是为了**性能**。

在分布式系统中需要将数据拆分，分散到多个机器上，也就是**分片**。

但将数据分片到数百上千台机器上很容易出现故障。需要系统能够自动修复而非人工介入，此时需要自动容错系统，也就**是容错性**。

通过**复制**来实现容错，例如保留 2 个或 3 个或者 n 个数据副本。其中某个出错那么立刻切换到另一个副本上。

但是副本会带来**数据不一致**的问题。上层的应用程序对于数据的一致性就很棘手。如果为了维护强一致性就会**降低性能**。此时就和初衷背离了。

总结一下，分布式系统是为了提高性能，分布式需要数据分片，为了容错需要复制数据产生多副本，多副本又出现了一致性的问题，为了维护强一致性又会导致性能降低。

## 4. 一个强一致性的直观模型

假设 c1,c2 两个客户端同时修改服务器中的某个值，而 c3,c4 分别读取该值会得到什么样的结果。

此时会有两个写请求同时发送给服务器，接着服务器会响应。但是并没有明确的顺序，而不同顺序下得到的值是不一样的。这就出现了歧义。

单个服务器的容错能力不行，一旦发生故障整个系统就崩溃了。实际中通常构建主从复制服务器。

例如目前有两台服务器，都保存了一份完整的数据，如果其中一台服务器故障那么可以直接切换到另一台服务器上读写。但是为了维护一致性，两台服务器都需要处理写入操作。而读取操作则是单个服务器处理，如果必须从两台服务器上读，那么就无法容忍服务器数据丢失。

Well，假设我们有client1和client2
它们两个都想进行写入操作
其中一个服务器进行write x1操作，另一个则执行write x2操作
So，客户端1向两个服务器都发出了write x1请求
因为我们想更新这两个服务器的数据
接着，客户端2会向这两个服务器发送write x2请求
So，这里会出现什么问题吗？
请说
没错，我们并没有做任何事情来保证这两个服务器是以同样的顺序来处理这两个请求的
这是一个糟糕的设计
如果服务器1先处理client 1的请求
执行完请求后，它表内的value就是1
接着，服务器1又接受到了client 2的请求
并将表内的value覆写为2
如果服务器2碰巧是以不同的顺序接收了网络数据包
那它就会先执行client 2的请求，并将表内value设置为2
然后它才会去处理client 1的请求，并将value设置为1
如果client 3碰巧从服务器1中读取数据
碰巧，client 4则是从另一台服务器上读取数据的话
那我们就会陷入这种可怕的情况
虽然我们直观的服务模型表示它们两个读取到的是相同的value，但它们读取的是不同的value，
这种情况也可能会以其他方式出现，假设我们试着让所有的client始终都从服务器1中读取数据来解决这个问题，如果服务器1故障了，那再从服务器2中读取数据
如果这种情况发生了
在一段时间内，两个client可能读取到的都是服务器1的value 2
但如果服务器1突然故障了
即使没有发生写入请求
我们的value值也会突然从2变成1
因为如果服务器1崩了
所有的client就会切换到服务器2去读取数据
但这种数据上的迷之改变和任何写入操作都不对应
这完全不是这种简单服务器模型中可能发生的事情（知秋注：对于单个服务器来说，我好好的啊，没问题的，我怎么会知道不对）
当然，我们可以解决这种情况
这种修复通常需要服务器之间或更复杂的地方进行更多的通信
因为不可避免的在复杂性上付出代价来获得强大的一致性
我们可以通过各种不同的解决方案来获得更好的一致性
人们对于一致性的可接受范围取决于他们对那些异常行为的可接受度（知秋注：可以妥协下追求最终一致性，或者是版本一致性）
对于这个灾难模型，你们中还有人对它有疑问吗
这就是我们在讨论GFS时所要涉及的东西
GFS所做的事情解决了这个问题
它们拥有更好但并不是那么完美的表现
GFS是2003所出现的东西，这距离现在已经有一定年份了
实际上，在那个时候起，网络就变得非常重要
人们会去构建大型网站
此外，那时候对于分布式系统已经有了数十年的研究了
至少从学术的层面来讲，人们知道该如何构建具备高度并行，容错之类的系统
但在行业内，几乎没有人去使用这些学术思想
但自从这篇论文发表出来后
像谷歌这样的大型网站开始实际使用这些思想来构建分布式系统
对于像我这样的人，就像一个小孩那样，在看到这些思想落地时，我会感到非常兴奋
谷歌拥有体积非常庞大的数据集，这些数据集大到无法保存在单个磁盘中，例如：一个完整的网站爬虫数据
或者是在发布了这篇论文后，它们拥有了大量的Youtube视频
他们通过一些中间文件来构建搜索索引
他们也会保留许多他们web服务器上的日志文件
这样他们就能日后分析这些文件了
他们拥有某些非常庞大的数据集
谷歌不得不使用非常非常多的磁盘来保存这些数据
他们需要能够快速地处理这些数据，例如通过MapReduce来处理
So，他们需要以高速并行的方式来访问这些海量数据
他们所追的目标是又大又快
他们也希望能有一种全局的文件系统，这样许多不同的应用程序都能从上面获取数据
构建大型存储系统的一种方法是，你知道自己有一些特定的应用程序，并且可以构建专门针对该应用程序的存储类型
如果隔壁办公室的某个人需要用到大型存储
那么这样他们就能构建自己的东西
如果我们有一个通用或者全局可复用的存储系统
这意味着如果我存储大量数据并说你知道我正在爬取网站
并且你想看我所爬取的网页
因为我们都在同一个沙盒下进行
我们用的都是同一个存储系统
你可以直接读取我的文件
这里面可能会有一些访问控制权限的问题
它的思想是通过构建一套文件系统，这样在谷歌的任何人都能通过它来命名和读取其中所共享的任何文件
为了获得更大的牢固性，他们需要将每一个文件数据由GFS自动拆分到很多服务器中
这样读写速度就会变得非常快
当你从许多client中读取一个文件时
你就会得到很高的吞吐量
这样也就能够读取比一个硬盘容量还大的单个文件了
因为我们是基于数百台服务器来构建的
我们想要拥有自动故障恢复的能力
我们不想去构建这种系统，运行着该系统的数百台服务器中的某台故障了，就得让人去机房，然后去修理服务器，并让它重新跑起来，或者去往服务器上面传输数据
Well，这就不仅仅是自主修复了
这里面还有些非功利目标
其中一点是，GFS是被设计用于运行在单个数据中心的系统
So，我们并没有去讨论在全世界范围内放置数据副本
单个GFS是运行在一个数据中心或者一个大型机房中的
副本间彼此相距遥远是一个有价值的目标，但很难
So，数据中心并不是一个面向消费者的服务
GFS是提供给Google工程师编写的应用程序内部使用
So，谷歌并不直接出售这项服务
谷歌会对外销售那些内部使用了GFS的服务，但他们不直接对外销售GFS
So，GFS只供内部使用
谷歌对其经过一系列的量身定制，以便用于大型连续文件的读取和写入
当然，这也能用于一些其他领域，例如某种针对小型数据优化的存储系统
就拿银行来说，它可能想要一个可以读写更新的数据库，正如你们知道的那样可以使用100byte大小的数据就能保存人们的银行余额
但GFS并不是这种系统
So，它适用于对那些大型数据（TB级或者GB级数据）的连续访问而不是随机访问的场景
这有点批处理的那种意思
谷歌在对降低访问延迟上并没有做太多努力
他们的重心是放在了大吞吐量上面，例如：几MB大小的操作
这篇论文是发表在2003年的顶级系统学术会议上
通常这种会议上的论文标准就是在它得包含大量新颖的研究
这篇论文并不一定满足这一类标准
这篇论文中某些特定的思想在当时并不是特别新颖
例如，分布式，切片，容错之类的想法其实非常好理解
但这篇论文所描述的系统是可以应用在由成百上千台机器所组成的大型集群上的
这要远比任何一篇学术论文中所构建的集群都要庞大
它已在工业中使用并反映了在现实世界中的使用经验，例如对于必须工作且必须具有成本效益的已部署系统实际上不起作用，
这篇论文中提出了一种非常异端但非常有价值的观点
即让存储系统具备弱一致性是ok的这种观点
当时的学术态度是，存储系统实际上应该具有良好的行为
就像在构建系统时，返回错误的数据这点
就像我这里糟糕的主备系统那样，为什么这样做，为什么不构建系统返回正确的数据而不是这些错误的数据
在这篇论文中，实际上它并没有保证返回的是正确数据
他们希望能够利用这点，以此来获得更好的性能
在这篇论文中，最后一件令我们感兴趣的事情就是，它使用了一个单个master节点
在某些学术论文中，你们可能看过一些具备容错，主从复制，自动故障恢复能力的master节点
也有可能，许多master将这些工作分开，每个负责不同的内容
但这篇论文则表示他们可以不再局限于单个master节点，也能很好地工作（知秋注：单个master可以让一致性更强，多个的话会减弱，但会带来别的提升）
不负责任地讲，没人会去注意投票数字的正确与否
或者，如果你用搜索引擎进行搜索
你们可能不会注意到返回的两万条结果里面丢了其中一条，或者说它们展示的顺序是错误的
可能确实不会去注意这些事情
这种系统对于错误数据的容忍度要远比银行之类的要高得多
这并不意味着所有的数据和网站可能都是错的
比如，如果你向人们收取广告展示费用，你最好展示的是正确的数字
但我想说的并不是这个
此外，GFS会通过某些方式来对应用程序中的奇怪数据进行修正
正如论文中所说的那样，应用程序应该在它们的数据中附加检查数量并且清楚的标记记录边界
这样应用程序就能从GFS中恢复这些数据，尽管数据可能并不是完全正确
它的基本结构请看论文中的Figure 1
So，假设我们现在有成百上千个客户端
我们有一个master
虽然可能还会有master的副本
master会维护文件名和数据保存位置之间的映射关系，这里确实会有两张表
接着，它里面可能还有数百台chunk服务器
每台chunk服务器中可能有1个或者2个磁盘
此处的master是用来命名文件和查询这些chunk的位置信息
chunk服务器是用来保存这些实际数据的
这是在这个设计中非常nice的一个方面
这种设计将这两个问题完全分离了开来
这样我们就可以分别来设计这两个部分了
master 知道每个文件对应的所有文件
master维护了一个chunks 的列表
块标识符（chunk identifier）包含该文件的连续片段
每个chunk都是64MB大小
如果我有1GB大小的文件
master就知道第一个chunk是存放在这个位置，第二个chunk是放在那个位置，第三个chunk就放在这个位置
如果我想去读取该文件中的某个部分
我需要去问master，哪一个服务器保存了这个chunk，然后我就会去和这个服务器进行通信
并读取这个chunk
简单来讲就是这样
说的更确切一点，我们需要去讨论系统是如何保证一致性，以及它是如何处理错误的
我们需要去深入了解master实际保存的东西是什么
在master数据中，我们主要关心两张表
其中一张表管理了文件名和chunk id数组（或chunk 句柄数组）之间的映射关系
这张表会告诉你到哪里去找这些数据或者这些chunk的标识符是什么
你可以通过chunk标识符来做到这点
但master中也有第二张表
它里面保存了每个chunk handle和chunk数据间的映射关系
So，其中一个是保存了这个数据副本的chunk服务器列表（知秋注：一份数据多个副本）
每个chunk会被保存在多个chunk服务器上
So，这里是chunk服务器列表
每个chunk都有一个当前版本号
So，master要去记住每个chunk的版本号
这里有一系列适合使用的chunks 
primary 是其中一个副本
so master 记住的是这些primary chunk 对应的chunk 服务器
也就是说，只有primary 才有资格和master去进行过期时间判断
master会去记住lease过期时间
所有的这些东西都是放在内存中的
如果master崩溃了，那么master凉了就凉了
So，为了能够去重启master，并保证不会丢失文件系统中的任何信息
实际上，master会将所有的信息都保存在磁盘上，不仅仅是保存在内存中
So，读操作是在内存中进行的
但写操作，至少对这部分数据来讲，它的写操作必须在磁盘中进行
实际上GFS的管理方式是，master会将所有的操作记录以日志的形式放在磁盘中
当每次修改数据时
它会在磁盘上所保存的log后面追加操作记录，并建立checkpoint
So，在这些东西里面，有部分需要保存在磁盘上，有些则不需要
我稍微猜测下，chunk handle数组必须放在磁盘上
So，这里我用nv来表示非易失性
它代表的就是磁盘之类的东西（知秋注：关于易失性存储和非易失性存储可以去看simviso所翻译的CMU15-445 数据库导论中的存储相关内容）
然而事实证明，chunk服务器列表则不需要保存在磁盘上
因为当master重启后，它会去和所有chunk服务器进行通信，并询问它们上面保存了哪些chunk
So，我觉得这种就不用写到磁盘上了
我们来猜一下，版本号是应该写到磁盘上，还是不写到磁盘上？
这需要去了解系统是如何工作的
我更倾向于将它写到磁盘这种非易失性存储设备里
我们可以在之后讨论系统的工作原理时，再去争论这个
事实证明，primary几乎不会写入到磁盘中
So，它是易失性的
理由是master重启后，它就会忘记哪一个是primary
由于它是易失性的，master会忘记这个chunk的primary到底是哪个
它可以简单地等待60秒过期时间
然后，master就会知道绝对没有任何primary可用于该chunk
然后它就可以为这个chunk安全地指定一个不同的primary
类似的，这个lease过期时间也是易失性的（知秋注：如果master挂掉，重启后并不知道之前的过期时间停留在几秒，重新刷新了）
这就意味着，当一个文件被追加了一个新的chunk，即文件大小又增加了64MB
或者版本号改变了
因为已经指定了新的primary
这就意味着master必须先在它的日志里面追加一条记录
简单来讲就是，Oh，我往这个文件里追加了这样一个chunk
或者，我只是改变了版本号
So，当我每次修改它们其中一个时，这都需要写到磁盘上
这篇论文并没有对此谈论太多

30.01-30.05

but you know there's limits the rate at which  the master can change things

但你们知道，这就限制了master修改数据时的速度

30.05-30.09

because you can only write your disk how many times per second 

因为你每秒钟写入磁盘的次数是有限的

30.09-30.14

and the reason for using a log rather than a database 

这里使用日志而不是数据库的原因是

30.14-30.22

you know some sort of b-tree or hash table on disk is that you can append to a log very efficiently 

在磁盘上它们有些是用B树或者哈希表来进行存储的，这样的话，你在对日志进行追加操作的时候会非常高效

30.22-30.35

because you only need you can take a bunch of recent log records  they need to be added and sort of write them all on a single write after a single rotation to whatever the point in the disk is that contains the end of the log file

因为当磁盘机械臂旋转一次到包含该日志文件末尾的地方时，你可以将近期需要添加的日志记录一次性追加到日志文件末尾

30.35-30.41

whereas if it were a sort of b-tree reflecting the real structure of this data 

否则，（在使用数据库的情况下），如果你想要表达出这个数据的真实结果，如果它是b-tree形式的话

30.41-30.45

then you would have to seek to a random place in the disk and do a little write

那么你就必须在磁盘上随机找个地方并写入一点数据（知秋注：因为数据库存储时并不考虑数据存储顺序，也就是说数据很散，要符合真实的btree就要通过上个数据节点的page id去做数据追加的）



30.45-30.52

so the log makes a little bit faster to write there to reflect operations on to the disk 

so log可以更快的在磁盘上实现这种数据形式的存储

30.52-30.58

however if the master crashes and has to reconstruct its state

但如果master崩了，并且它得重构它的状态

30.58-31.06 ******

you wouldn't want to have to reread its log file back starting from the beginning of time from  when the server was first installed  you know a few years ago 

你不需要从几年前首次安装服务器的时间开始重新读取其日志文件



31.06-31.17 ！！！

so， in addition， the master sometimes checkpoints its complete state to disk which takes some amount of time seconds maybe a minute or something

因此，此外，master时不时通过checkpoints将其完整状态写到磁盘，这需要花费一些时间，例如一分钟或一秒

31.17-31.28

and then when it restarts， what it does is goes back to the most recent checkpoint  and plays just the portion of a log that sort of starting at the point in time，when that checkpoint is created 

然后，当master重启时，它要做的就是回滚到最近的checkpoint处，即回滚到该日志中创建这个checkpoint的时间点



31.28-31.32

any questions about the master data 

对于master数据，你们中有人对此有疑问吗

31.32-31.37

okay

看来没有疑问

31.37-31.47

so with that in mind，I'm going to lay out the steps in a read and the steps in the write

So，将这些记在脑子里，等会我会去列出读操作的步骤和写操作的步骤

31.47-31.50

 where all this is heading is that I then want to discuss

这些标题都是我之后想去讨论的内容

31.50-31.57

you know for each failure， I can think of why does the system act directly after that failure 

在每次故障中，我可以去思考在故障后这些系统所扮演的角色

31.57-32.02

um but in order to do that，we need to understand the data and operations in the data 

为了做到这点，我们需要去理解这些数据以及对这些数据的操作

32.02-32.02

okay 




32.02-32.09

so if there's a read 

So，我们来看下读操作的步骤

32.09-32.18

the first step is that the client  and what a read means that the application has a file name in mind and an offset in the file that it wants to read some data from

第一步，Client端发出一个读请求，作为读操作，client端应用程序要通过一个文件名以及文件中的一个偏移量（Offset值）来找到它想读数据的开始点

32.18-32.22

so it sends the file name and the offset to the master

So，它将文件名和偏移量发送给了master

32.22-32.24

and the master looks up the file name in its file table 

master会在它的文件表中查找这个文件名

32.24-32.28

and then you know each chunk is 64 megabytes 

你们都知道每个chunk的大小是64mb

32.28-32.32

who can use the  offset divided by 64 megabytes to find which chunk 

我们通过使用偏移量除以64mb来找到我们要的那个chunk

32.32-32.42

and then it looks at that chunk in its chunk table finds the list of chunk servers that have replicas of that data

然后在chunk表中找到保存了该chunk数据副本chunk服务器列表

32.42-32.45

and returns that list to the client

并将该列表返回给Client


32.45-33.00

so the first step is so you know the file name  and the offset  the master

So，在第一步中我们要将文件名和偏移量发送给master

33.00-33.11

 and the master sends the chunk handle  let's say H  and the list of servers 

接着master会发送chunk handle，这里我们用H表示，以及服务器列表

33.11-33.12

so now we have some choice 

现在，我们有一些选择

33.12-33.15

we can ask any one of these servers pick one that's  

我们可以从其中一个服务器中获取这个chunk

33.15-33.19

and the paper says that clients try to guess which server is closest to them in the network maybe in the same rack 

这篇论文中说过，Client会试着去猜网络中哪一台服务器离它们最近，可能它们俩就在同一个机架上

33.19-33.25

and send the read request to that to that replica

接着Client就会向该副本数据发送读请求

33.25-33.37

the client actually caches this result 

实际上，Client会将该结果进行缓存

33.37-33.38

so that if it reads that chunk again 

如果我再次去读取该Chunk

33.38-33.46

and indeed the client might read a given chunk in you know one megabyte pieces or 64 kilobyte pieces or something 

那么Client可能读到的是一个已经给过的Chunk，可能读取的是其中1mb的片段，或者64Kb的片段之类的东西



33.46-33.51

so I may end up reading the same chunk different points successive regions of a chunk many times

So，我可能会多次读取到同一个chunk的不同的连续区域


33.51-33.57

and so caches which server to talk to you for giving chunks

对于已经给过的chunks来说，服务器通过缓存

so，所谓缓存，就是服务器针对已经给过的chunks来设定的

33.57-34.01

so it doesn't have to keep beating on the master asking the master for the same information over  and over

对于相同的信息，Client端无需一次又一次的去询问服务器来拿到数据

34.01-34.13

now the client talks to one of the chunk servers  tells us a chunk handling offset

Client端会和其中一个Chunk服务器进行通信，并告诉它我们这个Chunk handle的偏移量



34.13-34.17

and the chunk servers store these chunks

对于chunk服务器所保存这些chunks来说

34.17-34.22

each chunk in a separate Linux file on their hard drive in a ordinary Linux file system 

每个chunk会以单个Linux文件的形式保存在硬盘中的Linux文件系统中



34.22-34.26

and presumably the chunk files are just named by the handle 

每个chunk的文件名大概都是通过handle来命名

34.26-34.30

so all the chunk server has to do is go find the file with the right name 

So，所有的chunk服务器必须根据正确的文件名来找到该chunk文件

34.30-34.38

you know I'll give it that entire chunk  and then just read the desired range of bytes out of that file

找到这整个chunk后，服务器会去读取该文件中你所想要的字节范围


34.38-34.43

and return the data to the client 

并将该数据返回给Client

34.43-34.48

I hate question about how reads operate 

不要来问我关于如何执行读操作之类的问题，我讨厌这样

34.48-34.52

can I repeat number one？

你是想让我重新讲下第一步操作么？

34.52-35..04 ！！！！！！！！！

the step one is the application wants to read it  a particular file at a particular offset within the file or a particular range of bytes in the files 

在第一步中，应用程序想去读取某个文件内一个特定偏移量处的数据，或者说去读取该文件中某个特定区域字节的数据

35.04-35.05

and one thousand to two thousand 

例如，第1000 byte到2000byte处的数据

35.05-35.10

and so it just sends a name of the file and the beginning of the byte range to the master 

应用程序会发送文件名以及字节范围的起点给master

35.10-35.20

and then the master looks a file name and it's file table to find the chunk that contains that byte range for that file

然后，master会根据文件名找到这个文件，在它的文件表中找到包含该字节范围的chunk

35.20-35.23

so good

请问

35.34-35.36

so I don't know the exact details

So，我并不清楚具体细节



35.36-35.44

my impression is that the if the application wants to read more than 64 megabytes or even just two bytes but spanning a chunk boundary 

我的印象是，如果应用程序想要读取超过64兆字节，甚至只是两个字节，但跨越chunk 边界

35.44-35.53

that the library  so the applications linked with a library that sends RPC to the various servers 

有这么一个library （代码库），链接有该库的应用程序会通过RPC将请求发送到各个服务器

35.53-35.59

and that library would notice that the reads spanned a chunk boundary and break it into two separate reads 

该库将注意到读操作跨越了一个chunk边界，会将其分成两个单独的读取

35.59-36.04

and maybe talk to the master  I mean it may be that you could talk to the master once and get two results or something 

也许是与master通信，我的意思是你可以与master通信一次并得到两个结果或类似的结果

36.04-36.09

but logically at least it two requests to the master and then requests to two different chunk servers 

但从逻辑上来讲，应用程序至少向master发送两次请求，然后再向两个不同的chunk服务器发送请求

36.09-36.11

yes

请问

36.19-36.31

 well at least initially the client doesn't know for a given file what chunks they need what chunks

Well，在一开始Client并不清楚在给定的这个文件中，它所需要的Chunk是哪个

36.35-36.38

well it can calculate it needs the seventeenth chunk

Well，它可以计算出它需要第17个Chunk

36.38-36.43

but then it needs to know what chunk server holds the seventeenth chunk of that file 

但它需要去知道哪个Chunk服务器保存了该文件中的第17个Chunk

36.43-36.48

and for that it certainly needs for that it needs to talk to the master 

对于这种情况而言，它确实需要去和master进行通信

36.48-36.55

okay so all right



36.55-37.02

I'm not going to make a strong claim about which of them decides that it was the seventeenth chunk in the file 

我对决定这个文件的第17个chunk具体在他们中哪个服务器这件事不会有强烈的意愿

37.02-37.14

but it's the master that finds the identifier of the handle of the seventeenth chunk in the file looks that up in its table and figures out which chunk servers hold that chunk

这是master的事情，master在文件中找到第17个chunk的handle的标识符，在其表中查找并找出哪些chunk服务器持有该chunk

37.14-37.15

 yes

请问

37.34-37.39

how does that or you mean if the if the client asks for a range of bytes that spans a chunk boundary 

你的意思是，如果client 需求的字节范围跨越了一个chunk的边界

37.39-37.57

yeah so the the well you know the client will ask that well the clients linked with this library is a GFS library that noticed how to take read requests apart  and put them back together 

 与clients所链接的这个库是一个GFS库，该库会知道如何将读请求分开并将它们放回一起

37.57-38.06

and so that library would talk to the master  and the master would tell it well you know chunk seven is on this server  and chunk eight is on that server 

这样client端通过该library（库）就可以与master对话，而master可以很好地告诉你，你知道chunk 7在这台服务器上，并且chunk 8在那台服务器上

38.06-38.14

and then the library would just be able to say oh you know I need the last couple bytes of chunk seven and the first couple bytes of chunk eight 

然后library就会说，oh，你知道我需要chunk 7的最后几个字节和chunk 8的前几个字节

38.14-38.20

and then would fetch those put them together in a buffer and return them to the calling application

然后将其获取并将它们放到buffer中，并将它们返回给调用的应用程序

38.27-38.35

well the master tells it about chunks and the library kind of figures out where it should look in a given chunk to find the data of the application wanted

master告诉它有关chunks的信息，并且library指出在给定的chunk 服务器中查找应用程序所需数据的位置

38.35-38.40

the application only thinks in terms of file names and sort of just offsets in the entire file

该应用程序仅需要考虑文件名和整个文件中的偏移量

38.40-38.43

in the library and the master conspire to turn that into chunks

通过这个library 和master 服务器一起合力来定位到具体的chunk 服务器上

38.43-38.46

yeah 

请问

38.46-38.52

sorry let me get closer here 

抱歉，我还是走近点，刚刚听不清你说啥

38.52-38.56

you say again 

抱歉，你再说下你的问题

38.56-39.05

so the question is does it matter which chunk server you reach room 

这个问题是对访问到的chunk服务器所在的房间是否重要

39.05-39.10

so you know yes and no notionally they're all supposed to be replicas

So，不管对不对，从概念上来讲，拿到的都是副本数据



39.10-39.18

 in fact as you may have noticed  or as we'll talk about they're not you know they're not necessarily identical 

事实上，你可能已经注意到，其实我们之前也讨论过这些副本数据不一定完全相同

39.18-39.22

and applications are supposed to be able to tolerate this

应用程序都应该能够去容忍这一点

39.22-39.26

but the fact is that you make a slightly different data depending on which replicas you read 

但事实上，取决于你读取的副本数据版本上的不同，你所做出的数据就会有所不同

39.26-39.35

yeah so the paper says that clients try to read from the chunk server  that's in the same rack or on the same switch or something

论文中提过Client会试着从同一个机架或同一个交换机下的chunk服务器中读取副本数据

39.35-39.44

all right



39.44-39.46

So that's reads 

So，这就是读操作的步骤

#####################################################################

39.46-39.52

the writes are more complex and interesting

写操作的步骤就更加复杂也更令人感兴趣


39.52-40.04

 now the application interface for rights is pretty similar

应用程序对于写操作这块的步骤和读操作非常类似







六十一  阅举报
03-03
40.04-40.08

there's just some call some library you call to you make to the gfs 

这需要调用一个库，这里你可以调用gfs

40.08-40.17

client library saying look here's a file name and a range of bytes I'd like to write and the buffer of data  that I'd like you to write to that range

client library（其实就是客户端调用gfs这个库） 说，这里有一个文件名和一串字节，我想进行写请求，即我想要写的这些数据包含在一个buffer中

40.17-40.19

actually let me let me backpedal 

其实呢，让我再说下

40.19-40.21

I only want to talk about record appends

我只想谈谈关于记录的追加

40.21-40.32

and so I'm going to praise this the client interface as the client makes a library call that says here's a file name and I'd like to append this buffer of bytes to the file

所以我要称赞一下这个client 的interface，因为client进行了一个library（gfs）调用，说这有一个文件名，我想将包含了这么多字节的buffer内容追加到这个文件中

40.32-40.38

I said this is the record appends that the paper talks about 

这就是论文中所提到的记录追加

40.38-40.56

so again the client asks the master，look I want to append sends a master requesting what I would like to append to this named file please tell me where to look for the last chunk in the file 

Client端会向master发送请求，它想对某个文件进行追加操作，它会去问master该文件的最后一个chunk的位置在哪



40.38-41.01

because the client may not know how long the file is， if lots of clients are appending to the same file 

因为如果有许多Client端向同一个文件进行追加操作，那么Client端可能并不知道这个文件有多长

41.01-41.05

because we have some big file this logging stuff from a lot of different clients 

因为我们可能有某些体积庞大的日志文件，它记录了来自许多不同Client端的操作记录

41.05-41.12

may be you know no client will necessarily know how long the file is  and therefore which offset or which chunk it should be appending to

Client端无须去知道这个文件有多长，它只需要去了解在哪个偏移量或者Chunk处进行追加操作就可以了

41.12-41.20

so you can ask the master please tell me about the server's that hold the very last chunk current chunk in this file 

Client端可以询问master，请告诉我哪个服务器保存了该文件最后一个chunk

41.20-41.28

so unfortunately now the writing  if you're reading，you can read from any up-to-date replica 

如果你们是进行读操作，你可以从任何最新的数据副本中读取

41.28-41.31

for writing though，there needs to be a primary 

但如果是写操作，那就必须对Primary进行操作

41.31-41.37

so at this point on the file may or may not have a primary already designated by the master 

此时，在这个文件中可能有，也可能没有由master所指定的primary

41.37-41.43

so we need to consider the case of if there's no primary already，and all the master knows well there's no primary 

So，我们需要去考虑不存在primary的情况，即master知道这里并没有primary


41.43-41.52

so so one case is no primary

So，其中一个情况就是没有primary的情况

41.54-42.06

in that case the master needs to find out the set of chunk servers that have the most up-to-date copy of the chunk

在这个情况中，master需要去找到包含了最新Chunk副本数据的服务器集合

42.06-42.10

because know if you've been running the system for a long time

因为如果你们的系统已经运行了一段时间

42.10-42.18

 due to failures or whatever there may be chunk servers out there that have old copies of the chunk from you know yesterday or last week that I've been kept up to kept up to date 

但由于某些故障原因，Chunk服务器挂了，它上面所保存的Chunk副本对于昨天或者上一周而言是最新的

42.18-42.23

because maybe that server was dead for a couple days  and wasn't receiving updates 

因为服务器可能会挂一段时间，并且这段时间内它不会去接收任何更新

42.23-42.28

so there's you need to be able to tell the difference between up-to-date copies of the chunk and non up-to-date 

So，你需要能够去讲出副本数据的最新版本和非最新版本间的区别


42.28-42.37

so the first step is to find you know find up-to-date 

So，首先你要去找到最新的数据副本


42.37-42.38

this is all happening in the master 

这一切都是在master中发生的

42.38-42.44

because the client has asked the master told the master look I want to append this file

Client端会告诉master，它想去对这个文件进行追加操作

42.44-42.47

please tell me what chunk servers to talk to 

它会对master说，我该去和哪个Chunk服务器进行通信

42.47-42.50

so a part of the master trying to figure out what chunk servers the client should talk to

Master会去试着找到Client端想去通信的那个Chunk服务器


42.50-42.54

you so when we finally find up-to-date replicas 

So最后我们会找到最新的那个副本数据


42.54-43.07

and what update means is a replica whose version of the chunk is equal to the version number that the master knows is the most up-to-date version number 

所谓更新就是将chunk副本最近版本号的数据更新到master所知道的最新的版本号的数据

43.07-43.10

it's the master that hands out these version numbers 

master会分发这些版本号

43.10-43.14

the master remembers that

master会记住这些

43.14-43.23

 oh for this particular chunk you know the chunk server is only up to date，if it has version number 17

就拿这个Chunk为例，如果Chunk服务器上它的版本是17，那么它才是最新的

43.23

and this is why it has to be non-volatile stored on disk

这就是为什么它必须是非易失性的，并且要保存在磁盘上的原因了

43.23-43.33

because if it was lost in a crash，and there were chunk servers holding stale copies of chunks 

如果版本号在master崩溃时丢失，并且Chunk服务器保存了这些过时的Chunk数据副本的状态信息

43.33-43.38

the master wouldn't be able to distinguish between chunk servers holding stale copies of a chunk from last week  and a chunk server that holds the copy of the chunk that was up-to-date as of the crash 

master就不能够区分这些Chunk服务器上保存的chunk副本是上周的版本还是master崩溃时的最新版本



43.38-43.47

that's why the master members of version number on disk 

这就是为什么master将版本号放在磁盘上的原因了

43.37-43.38

yeah

请问

43.54-43.58

if you knew you were talking to all the chunk servers，

如果你们正在和所有的Chunk服务器进行通信

43.58-44.07

okay so the observation is the master has to talk to the chunk servers anyway，if it reboots in order to find which chunk server holds which chunk 

Ok，如果master重启了，为了去弄清楚哪些Chunk服务器保存了哪些Chunk，master必须去和所有的Chunk服务器进行通信



44.07-44.09

because the master doesn't remember that 

因为master并不记得那些信息了

44.09-44.14

so you might think that you could just take the maximum

So，你们可能会这样想，直接拿版本号最大的那个就行了

44.14-44.21

 you could just talk to the chunk servers find out what chunk and versions they hold and take the maximum for a given chunk overall the responding chunk servers 

你只需要和持有这些Chunk的Chunk服务器进行通信，并从响应的Chunk服务器中找出给定Chunk的最大版本号的那个版本

44.21-44.25

and that would work if all the chunk servers holding a chunk responded

如果所有持有Chunk的Chunk服务器都响应的话，这种方法是可行的

44.25-44.33

but the risk is that at the time the master reboots maybe some of the chunk servers are offline or disconnected or whatever themselves rebooting  and don't respond 

但此时的风险是，如果master重启了，或者说某些Chunk服务器处于离线状态或者失联之类的情况

44.33-44.40

and so all the master gets back is responses from chunk servers that have last week's copies of the block

那么，master从Chunk服务器中所接收到的想要响应返回的可能是上个星期的数据副本

44.40-44.45

and the chunk servers that have the current copy haven't finished rebooting or offline or something 

然而持有最新数据副本的Chunk服务器可能还没结束重启或者处于离线状态

44.45-44.51

but if the most recent servers are dead，then the data lost forever

但如果持有最新版本的Chunk服务器挂了，那么数据是不是永远丢了？

44.51-44.58

so ok oh yes if the server's holding the most recent copy are permanently dead

你说的没错，如果持有最新副本数据的Chunk服务器彻底死了

44.58-45.06

if you've lost all copies all of the most recent version of a chunk，then yes

那么你就会丢失掉该Chunk的所有版本或者最新版本，所以你说的没错

45.06-45.09

提问部分

45.09-45.10

 No 

45.10-45.19

okay so the question is the master knows that for this chunk is looking for version 17

Ok，So她的问题是master知道要找的这个Chunk的版本是17

45.19-45.26 

supposing it finds no chunk server  you know and it talks to the chunk servers periodically to sort of ask them what chunks do you have what versions you have

假设它没有找到持有该版本的Chunk服务器，它会周期性的去和Chunk服务器通信，以此来询问这些服务器上持有哪些Chunk以及它们的版本是什么

45.26-45.30

 supposing it finds no server with chunk 17 with version 17 for this chunk 

假设它在这些服务器上没有找到持有17这个版本的Chunk

45.30-45.41

then the master will either say well either not respond yet  and wait or it will tell the client look I can't answer that try again later 

那么master可能就不会响应，或者它会告诉Client端，目前它无法回答，请稍后再试

45.41-45.54

and this would come up like there was a power failure in the building and all the server's crashed and we're slowly rebooting the master  might come up first and you know some fraction of the chunk servers  might be up and other ones would reboot five minutes from now

这种情况就好像在遇上大楼供电故障，所有的服务器就会崩溃，接着我们就会缓慢重启master，这可能需要5分钟，然后某些Chunk服务器可能可以立即启动，也有部分五分钟后才能启动

45.54-46.00

but so we ask to be prepared to wait and it will wait forever

这样我们就不得不等待下去，可能会一直处于等待状态

46.00-46.05

because you don't want to use a stale version of that of a chunk

因为我们不想去使用该chunk的陈旧版本

46.05-46.11

okay so the master needs to assemble the list of chunk servers  that have the most recent version 

Ok，So，Master需要去组合出持有最新Chunk版本的Chunk服务器

46.11-46.14

the master knows the most recent versions stored on disk

master知道最新版本的Chunk所保存的磁盘位置

46.14-46.20

each chunk server along with each chunk as you pointed out also remembers the version number of the chunk  that it's stores

正如你所指出的那样，每个Chunk服务器都知道它上面所保存的Chunk的版本号

46.20-46.23

so that when chunk servers reported into the master 

So，当Chunk服务器向master报告时

46.23-46.31

saying look I have this chunk  the master can ignore the ones whose version does not match the version the master knows is the most recent 

说，看，我有这个版本的chunk，master可以忽略那些小于master已知最近版本的chunk

46.31-46.37

okay so remember we were the client want to append the master doesn't have a primary 

ok,so 请记住，我们是client，想要对一个文件做追加，但master没有手里没有对应的primary chunk

46.37-46.46

it figures out maybe you have to wait for the set of chunk servers that have the most recent version of that chunk 

你需要等待它（master）找出你需要的一组有着最近版本chunk的chunk servers



46.46-46.54

it picks a primary so I'm gonna pick one of them to be the primary 

它（master）从中选择一个来作为primary chunk 



46.54-46.59

and the others to be secondary servers among the replicas set at the most recent version 

其他chunk servers就作为副本来做辅助了，与此同时会将最近的版本设定到这些副本服务器中


46.59-47.12

the master  then increments the version number  and writes that to disk 

然后，master  就会增加版本数字，并写入到那些chunk服务器磁盘中

47.12-47.14

so it doesn't forget it the crashes

这样它就不会在崩溃时忘记这个版本号

47.14-47.17

and then it sends the primary and the secondaries 

它会向primary 和那些辅助副本chunk服务器发送一个信息

47.17-47.21

and that's each of them a message saying look for this chunk

所发的信息中会这么说，来看这个chunk服务器

47.21-47.22

here's the primary 

这个是primary 

47.22-47.23

here's the secondaries

这个是辅助副本

47.23-47.27

you know recipient maybe one of them 

你知道，信息的接收者可能是它们中的一个


47.27-47.29

and here's the new version number

接着，这是新的版本号


47.29-47.38

so then it tells primary secondaries this information plus the version number 

然后它会告诉primary 和辅助副本这个信息：要加上这个版本号

47.38-47.42

the primaries and secondaries  alright the version number to disk 

primary 和辅助副本会将这个版本号写入到磁盘

47.42-47.43

so they don't forget 

这样，它们就不会忘了

47.43-47.44

because you know if there's a power failure 

因为如果发生停电事故

47.44-47.48

whatever they have to report into the master with the actual version number  they hold 

它们必须向master报告它们所拥有的实际版本号

47.48-48.06

yes that's a great question

yes 这是一个很好的问题

48.06-48.11

so I don't know there's hints in the paper that I'm slightly wrong about this

我不知道paper中有暗示，对此我有点不认同

48.11-48.16

so the paper says I think your question was explaining something to me about the paper

我认为你的问题正在向我解释有关paper的问题

48.16-48.19

the paper says if the master reboots 

paper说如果master重启

48.19-48.22

and talks to chunk servers 

并与 chunk servers通信

48.22-48.28

and one of the chunk servers reboot reports a version number  that's higher than the version number the master remembers 

chunk servers其中一个重启并报告了一个版本号，这个版本号高于master自己脑子里记的

48.28-48.32

the master assumes that there was a failure

这会，master会假设这里存在了一个failure（事故）

48.32-48.34

while it was assigning a new primary 

这时，它会分配一个新的primary chunk 

48.34-48.38

and adopts the new the higher version number that it heard from a chunk server 

采用所知道的这个版本号更高的chunk 服务器


48.38-48.43

so it must be the case that in order to handle a master crash at this point 

so，在这种情况下，为了处理master崩溃，必须是这样的情况：

48.43-49.02

that the master writes its own version number to disk after telling the primary 

在告知primary之后，master将自己的版本号写入磁盘

49.02-49.03

there's a bit of a problem here though

这里有一个问题

49.03-49.10

because if the, was that ? is there an ACK

因为如果,什么？那是一个ACK(知秋注：确认字符)？

49.10-49.20

all right so maybe the master tells the primaries and backups  and their primaries  and secondaries

all right ，so 可能master向primary 和辅助副本发出一个信号

49.20-49.25

if they're a primary or secondary， tells him the new version number waits for the ACK and then writes to disk 

如果它们是primary 或辅助副本，告诉它新版本号并等待ACK，然后写入磁盘

49.25-49.28

  something unsatisfying about this

对此还有哪些地方不懂的？


学生提问

49.36-49.38

 I don't believe that works

我不相信它会起作用

49.38-49.44

because of the possibility that the chunk servers with the most recent version numbers being offline at the time 

因为当时最新版本号的chunk服务器当时处于离线状态

49.44-49.49

the master reboots we wouldn't want the master the master doesn't know the current version number 

master重新启动，master并不知道当前版本号

49.49-49.52

it'll just accept whatever highest version number adheres

它只会接受版本号最高的那个

49.52-49.54

which could be an old version number 

可能这个最高的版本号是一个老的版本号

49.54-49.57

all right so this is a an area of my ignorance 

all right so 这是我不了解的领域

49.57-50.01

I don't really understand whether the master update system version number on this first 

我真的不明白master是否会首先在此更新系统版本号

50.01-50.04

and then tells the primary secondary  or the other way around 

然后告诉primary、 secondary（辅助副本）或其他方式

50.04-50.08

and I'm not sure it works either way okay

我不确定这种方法可以

50.08-50.11

but in any case one way or another

但是无论哪种方式

50.11-50.17

 the master update is version number tells the primary secondary， look ，you！ primaries and secondaries， here's a new version number 

master更新的是版本号，它告诉primary 、secondary：朝这看！primary和secondaries，这是新的版本号。

50.17-50.20

and so now we have a primary which is able to accept writes

so 现在，我们有了一个primary，可以用来接受写操作了

50.20-50.23

all right that's what the primaries job is to take writes from clients 

Primary的工作就是接受这些Client端的写请求的

50.23-50.28

and organize applying writes to the various chunk servers 

并组织将这些写请求分配到不同的Chunk服务器上

50.28-50.48

and you know the reason for the version number stuff is so that the master will recognize the which servers have this new 

使用版本号的理由是，master能根据它整理出哪些Chunk服务器包含最新的Chunk

50.48-50.55

you know the master hands out the ability to be primary for some chunk server 

master能够授予某些Chunk服务器成为primary的能力

50.55-51.01

we want to be able to recognize，if the master crashes 

如果master崩溃了，我们想要去能够辨认出它们

51.01-51.08

you know that it was that was the primary that only that primary and it secondaries which were actually processed which were in charge of updating that chunk 

你们知道，只有该Chunk的primary和secondary才有能力去处理和更新该Chunk

你知道这是primary，只有primary及其实际处理的secondaries来负责更新该块

51.08-51.12

that only those primaries and secondaries are allowed to be chunk servers in the future 

在未来，我们只允许这些primary和secondaries去成为Chunk服务器

51.12-51.15

and the  way the master does this is with this version number logic

master通过版本号这种逻辑来做到这一点

51.15-51.18

okay 



51.18-51.24

so the master tells the primaries and secondaries that there it they're allowed to modify this block

So，master会告诉primary和secondary，它们能够去修改这个block

51.24-51.26

it also gives the primary a lease

master也会给primary一个租约或者合约之类的东西

51.26-51.33

 which basically tells the primary，look you're allowed to be primary for the next sixty seconds，after sixty Seconds you have to stop 

简单来讲就是，master告诉primary，看在下个60秒期间，我允许你是primary，但在60秒后，你就不是了

51.33-51.40

and this is part of the machinery for making sure that we don't end up with two primaries 

这其实是一种机制，它能确保我们最终不会有两个primary(知秋注：防止一个primary挂掉，没有过期机制，在另一个上位primary之后，挂掉的那只重启后起冲突)

51.40-51.42

I'll talk about a bit later 

稍后我会再多谈论点相关内容

51.42-51.44

okay



51.44-51.52

so now we were primary now the master tells the client who the primary and the secondary are

现在，master告诉Client端哪个是primary，哪个是secondary


51.52-52.01

and at this point we're executing in figure two in the paper

现在，我们要讨论的是论文中的Figure 2

52.01-5204

the client now knows who the primary secondaries are

现在，Client端知道哪些是primary，哪些是secondary

52.04-52.08

 in some order or another  and the paper explains a sort of clever way to manage this

对于写操作执行的先后，论文中提出了一种很聪明的方法来管理这个

52.08-52.16

in some order or another  the client sends a copy of the data，it wants to be appended to the primary in all the secondaries 

client 会发出一份数据拷贝，它希望可以追加到primary 和所有secondaries 中去

52.16-52.21

and the primary and the secondaries write that data to a temporary location 

Primary和Secondary会将这个数据写入一个临时区域

52.21-52.23

it's not appended to the file yet 

而不是追到到文件上

52.23-52.25

after they've all said yes we have the data

只有当它们说Yes，我们拿到了数据

52.25-52.26

 the client sends a message to the primary saying ，look， you know you and all the secondaries have the data I'd like to append it for this file

Client就会发一条消息给Primary，并表示，看，你和secondary都拿到了数据，我想将它追加到这个文件上

52.26-52.41

the primary maybe is receiving these requests from lots of different clients concurrently

primary可能会接收到来自大量不同Client端的并发发过来的请求

52.41-52.44

it picks some order execute the client request one at a time 

它会以某种顺序来执行Client端的请求，一次执行一个

52.44-52.56

and for each client append request，the primary looks at the offset that's the end of the file the current end of the current chunk makes sure there's enough remaining space in the chunk 

对于每个Client端发送过来的追加请求，primary会去查看当前Chunk的末尾偏移值，以此来保证在Chunk内有足够的空间来追加数据

52.56-53.01

and then tells then writes the clients record to the end of the current chunk 

接着，将Client端的记录写入到当前Chunk的末尾

53.01-53.11

and tells  all the secondaries to also write the clients data  to the end to the same offset the same offset in their chunks

并且也告诉所有的Secondary，将Client的数据写入到它们Chunk中相同的偏移量处

53.11-53.12

all right 


53.12-53.19

so the primary picks an offset 

So，Primary会选择一个偏移量

53.19-53.33

all the replicas including the primary are told to write the new appended record at offset 

所有的chunk副本服务器，包括Primary都会被告知将这个新的追加记录写入到那个偏移量处

53.33-53.39

the secondary's they may do it they may not do it 

然而，对于Secondary来说，它们可能会做，也可能不会做（知秋注：primary已经确定它可以搞定这个事情，然后才会告诉副本服务器来干的）

53.39-53.44

maybe  run out of space  maybe they crashed，maybe the network message was lost from the primary 

可能它们的可用空间用完了，也可能它们崩溃了，也可能丢失了来自primary所发送的网络消息

53.44-53.49

so if a secondary actually wrote the data to its disk at that offset 

So，如果一个Secondary将数据写入到磁盘上的那个偏移量处

53.49-53.51

it will reply yes to the primary 

它会回复一个Yes给primary

53.51-53.56

if the primary collects a yes answer from all of the secondaries

如果primary收到了来自所有secondary的yes回复

53.56-54.05

so if all of them managed to actually write and reply to the primary saying yes  I did it 

如果所有的Secondary确实将数据写入并回复yes给Primary来表示我做完了

54.05-54.11

then the primary is going to reply reply success to the client

然后，Primary会回复一个成功的消息给Client

54.11-54.21

if the primary doesn't get an answer from one of the secondaries 

如果Primary没得到其中一个secondary的响应

54.21-54.26

or the secondary reply sorry something bad happened I ran out of disk space my disk died I don't know what 

或者是Secondary表示这里发生了些不好的事情，例如，磁盘空间耗尽，磁盘坏了之类的事情


54.26-54.31

 then the primary replies no to the client 

然后，Primary就会回复No给Client端

54.31-54.41

and the paper says oh if the client gets an error like that back in the primary

论文中说过，如果Client端从primary处得到了一个错误

54.41-54.51

the client is supposed to reissue the entire append sequence starting again，talking to the master to find out the most grease the chunk at the end of the file

那么Client端就应该重新发起这个追加操作，并和master进行通信，让它找到该文件最后一个Chunk的所在位置

54.51-54.55

I want to know the client supposed to reissue the whole record append operation 

我想Client端应该去重新发起整个记录追加操作

54.55-55.02

ah you would think  but they don't 

你可能会这样想，但它们并没有

55.02-55.09

so the question is you know the the primary tells all the replicas to do the append 

So，他的问题是，primary会告诉所有的副本数据进行追加操作

55.09-55.11

yeah maybe some of them do some of them don't

可能有些会做，有些不会做

55.11-55.14

right if some of them don't，then we apply an error to the client 

如果部分没这么做，那我们返回给Client一个error即可

55.14-55.16

so the client thinks of the append didn't happen

那么，CLient端就会认为它们并没有执行追加

55.16-55.22

but those other replicas where appened succeeded they did append

但那些其他副本数据追加成功了

55.22- 55.25

 so now we have replicas dont the same data

So，现在我们所有的副本数据，它们所拥有的数据并不是一样的数据

55.25-55.28

one that returned in error didn't do the append 

其中一部分会返回error ，即没能成功执行追加操作

55.28-55.30

and the ones they returned yes did do the append 

还有一部分会返回Yes，它们成功执行了追加操作

55.30-55.33

so that is just the way GFS works

So，这就是GFS的工作方式

55.33-55.48

yeah so if a reader then reads this file

So，如果Client端读取了这个文件

55.48-55.55

they depending on what replica they be they may either see the appended record or they may not

这就取决于它们所读的副本数据是哪个了，可能是追加过记录的那个文件，也可能是追加前的文件

55.55-55.57

if the record append failed

如果记录追加失败

55.57-55.58

but if the record append succeeded 

但如果记录追加成功

55.58-56.01

if the client got a success message back

如果Client端得到了一个success的返回信息

56.01-56.05

then that means all of the replicas appended that record at the same offset

这就意味着所有的副本数据都在同一个offset上追加了该记录

56.05-56.08

if the client gets a no back

如果Client端得到的返回结果是No

56.08-56.18

 then zero or more of the replicas may have appended the record of that offset，and the other ones not 

那么就是，可能有0个或多个chunk副本在该偏移量处追加了记录，而其他剩余的Chunk副本并没有

56.18-56.26

so the client got a no  then that means that some replicas maybe some replicas have the record and some don't 

So，Client端得到了一个no，这也就意味着可能有一些Chunk副本追加了这个记录，而有些没有

56.26-56.30

so what you which were roughly read from，you know you may or may not see the record

So，粗略的来讲，取决于你读的那个Chunk副本是什么，那么你拿到的就可能是追加记录后的Chunk，也可能是没有追加的Chunk

56.30-56.31

 yeah

请问

56.44-56.47

oh that all the replicas are the same all the secondaries are the same version number 

所有的Chunk副本都相同，并且所有的Secondary的版本号都相同

56.47-56.54

so the version number only changes when the master assigns a new primary which would ordinarily happen

只有当master指定了一个新的primary时，版本号才会改变

56.54-56.56

and probably only happen if the primary failed 

只有当primary故障了，这才可能会发生

56.56-57.01

so what we're talking about is replicas that have the fresh version number all right 

So，我们现在正在讨论的是具有最新版本号的Chunk副本

57.01-57.06

and you can't tell from looking at them that they're missing that the replicas are different 

你无法从它们中看出其中它们之间的区别

57.06-57.09

but maybe they're different 

但可能它们就是不一样的

57.09-57.15

and the justification for this is that yeah you know maybe the replicas don't all have that the appended record 

这样做的理由是，可能并不是所有的Chunk副本都有这个追加记录

57.15-57.19

but that's the case in which the primary answer no to the clients 

但在这种情况下，primary就会回复no给Client端

57.19-57.21

and the client knows that the write failed 

Client端就知道了这个写请求失败了

57.21-57.27

and the reasoning behind this is that then the client library will reissue the append 

这样做背后的原因是Client端会重新发起追加请求



57.27-57.33

so the appended record will show up you know eventually the append succeed you would think

So，最终你会看到这个追加的请求会追加成功

57.33-57.38

 because the client I'll keep reissuing it until succeeds 

因为Client端会一直重新发起请求，直到请求成功为止

57.38-57.39

and then when it succeeds

然后，当它成功时

57.39-57.45 !!!!!!!!!!!!!!!!!!

that means there's gonna be some offset you know farther on in the file where that record actually occurs in all the replicas

这意味着你将更进一步地在文件中知道该记录的偏移量（offset值），这样就可以知道实际上所有应该存储该记录的副本（replicas）确实将之记录在册了



57.45-57.50

as well as offsets preceding that word only occurs in a few of the replicas

要知道这个offset之前仅发生在一些副本（replicas）中

57.50-57.50

yes

请问

58.09-58.11

oh this is a great question

Oh，这是一个很棒的问题

58.11-58.20

the exact path that the right  data takes might be quite important with respect to the underlying network and the paper somewhere says 

对于底层网络而言，数据所采用正确且确切的路径可能非常重要，并且论文的某处有说



58.21-58.24

even though  when the paper first talks about it 

当论文中第一次谈论这个的时候

58.24-58.27

it claims that the client sends the data to each replica

它要求Client端将数据发送给每个Chunk副本（replica）

58.27-58.34

 in fact， later on， it changes the tune  and says the client sends it to only the closest of the replicas 

实际上，随后它就改变了它的论调，并说客户端仅将其发送到与之最接近的副本

58.34-58.40

and then the replicas then that replica forwards the data to another replica along a sort of chained until all the replicas had the data 

然后该副本沿着一条链将数据转发到另一个副本，直到所有副本都具有数据



58.40-58.48

and that path of that chain is taken to sort of minimize crossing bottleneck inter-switch links in a data center

采用这种路径链来最大程度减少数据中心内部机器间数据交换的成本

58.48-58.51

 yes 



58.59-59.04

the version number only gets incremented if the master thinks there's no primary 

版本号（version number）只有在master不知道primary 是谁的情况下才会增加



59.04-59.08

so it's a so in the ordinary sequence 

正常顺序应该是这样：

59.08-59.16

there already be a primary for that chunk   the the the the master sort of will remember，

对于该chunk来说，已经存在了primary，master会将其记住，



59.16- 59.22

 oh， gosh， there's already a primary and secondary for that chunk and it'll just it won't go through this master selection， it won't increment the version number 

并说，哦，天哪，chunk已经有一个primary和secondary了，master是不会再进行primary选择的，也就不会增加版本号

 59.22-59.27

it'll just tell the client， look ，here's the primary with with no version number change

它只会告诉client，看一下，这是primary，没有版本号更改

59.42-59.46

my understanding is that if 

我的理解是如果。。

59.46-59.50

this is this I think you're asking a you're asking an interesting question 

我认为你问了一个很有意思的问题

59.50-59.54

so in this scenario in which the primaries isn't answered failure to the client 

so，在这种情况下，primary没有响应，则client失败

59.54-59.56

you might think something must be wrong with something

你可能认为绝对出了一些什么异常

59.56-59.58

and that it should be fixed before you proceed 

应该在实际操作之前解决该问题



59.58-1.00.06

in fact as far as I can tell the paper there's no immediate anything the client retries the append 

实际上，据我所知，paper中并没有说立即进行什么，client重试了追加请求

1.00.06-1.00.11

you know because maybe the problem was a network message got lost 

你知道，因为可能是网络消息丢失了





四十八  阅举报
03-04
so there's nothing to repair right， you know now we're gonna message got lost we should be transmitted

所以没有什么可以修复的，你知道现在我们应该传输的信息丢失了





 and this is sort of a complicated way of retransmitting the network message 

这是一种重新传输网络消息的复杂方式









maybe that's the most common kind of failure in that case just we don't change anything 

可能这是最常见的失败类型，只是我们什么都不做



it's still the same primary same secondaries 

此时，primary 还是那个primary ，secondaries 同样如此



01:00:26,750 --> 01:00:27,930

the client we tries maybe this time it'll work

client 会重试，兴许这次就好使了

01:00:28,130 --> 01:00:29,070

because the network doesn't discard a message 

因为网络不会丢弃消息

01:00:29,269 --> 01:00:31,289

it's an interesting question 

这是一个有趣的问题



01:00:31,489 --> 01:00:49,260

though that if what went wrong here is, that one of that there was a serious error or Fault in one of the secondaries, what we would like is for the master to reconfigure that set of replicas to drop that secondary that's not working 

尽管如果这里出了问题，即其中一个secondaries中存在严重错误或故障，我们希望的是master重新对该replicas组进行配置，以删除该无法正常工作的secondary



01:00:49,460 --> 01:00:50,700

and it would then because it's choosing a new primary in executing this code path 

因为这是又重新选择了一个新的primary 

01:00:50,900 --> 01:00:52,410

the master would then increment the version 

master 会增加版本号

01:00:52,610 --> 01:00:54,690

and then we have a new primary 

然后我们就有了一个新的primary 

01:00:54,889 --> 01:00:56,550

and new working secondaries with a new version 

也有了全新版本的可工作的secondaries 

01:00:56,750 --> 01:01:02,519

and this not-so-great secondary with an old version and a stale copy of the data

 这个不好的secondary，它带有旧版本和旧数据副本

01:01:02,719 --> 01:01:03,960

but because that has an old version 

但是因为它有一个旧版本

01:01:04,159 --> 01:01:06,800

the master will never never mistake it for being fresh 

master永远不会把它误认为是新的

01:01:09,260 -->  01:01:16,980

but there's no evidence in the paper that that happens immediately as far as what's said in the paper the client just retries and hopes it works again later

但在paper中并没有说，只要这种状况一发生，client就重试，并希望它稍后能再次工作

01:01:17,179 --> 01:01:23,789

eventually the master will if the secondary is dead eventually the master does ping all the trunk servers will realize that 

最终，master将在secondary已死的情况下，会对所有trunk服务器执行ping操作

01:01:23,989 -->  01:01:31,890

and will probably then change the set of primaries and secondaries and increment the version 

接着可能会对primary 和secondaries组成的集合进行改变，并增加版本号



01:01:32,090 --> 01:01:49,690

but only only later the lease the leases that the answer to the question what if the master thinks the primary is dead 

但只有在master认为primary 死掉的时候，才会考虑lease（知秋注：租约，可以理解为过期时间）的问题



01:01:49,889 --> 01:01:53,590

because it can't reach it right that's supposing we're in a situation where at some point

因为primary已经不可达了，假设我们处于这个场景之下，

01:01:55,469 --> 01:01:57,910

the master said you're the primary 

master 会说你是primary 

01:01:58,110 --> 01:01:59,740

and the master was like painting them all the service periodically to see if they're alive 

而master就像定期给它们提供粉刷服务一样（知秋注：定期访问一下，即keepalive），以查看它们是否还活着

01:02:01,260 --> 01:02:02,410

because if they're dead 

因为如果它们挂掉了

01:02:02,610 --> 01:02:04,960

and wants to pick a new primary 

接着想要去选一个新的primary 

01:02:05,159 --> 01:02:06,880

the master sends some pings to you， you're the primary 

master 会向你（你也就是primary ）发送一些ping命令

01:02:07,079 --> 01:02:09,490

and you don't respond right

你（primary）又没啥响应

01:02:09,690 --> 01:02:11,650

so you would think that at that point where gosh you're not responding to my pings

所以你（master）会认为在那一刻，你（primary）并没有对我（master）的ping进行回应

01:02:11,849 --> 01:02:13,860

then you might think the master at that point would designate a new primary

然后，你（听课的学生）可能想此时master要指定一个新的primary

01:02:16,559 --> 01:02:20,590

it turns out that by itself is a mistake 

事实证明，这本身就是一个错误

01:02:20,789 --> 01:02:23,620

and the reason for that the reason why it's a mistake to do that simple did 

原因是，为什么它会犯如此简单的错误

01:02:30,090 --> 01:02:32,200

you know use that simple design is that I may be pinging you 

你知道这里简单的设计，即我可能会去ping你

01:02:32,400 --> 01:02:33,670

and the reason why I'm not getting responses 

问题在于，为什么我收不到响应

is because then there's something wrong with a network between me and you 

因为你和我之间的网络可能哪里出了些问题

01:02:36,570 --> 01:02:37,990

so there's a possibility that you're alive you're the primary you're alive

有一种可能，你（master）活着，primary也活着

01:02:39,869 --> 01:02:41,019

I'm ping you the network is dropping that packets 

我（master）ping 你（primary），网络丢包了

01:02:41,219 --> 01:02:42,550

but you can talk to other clients 

但你（master）可以和其他clients 通信

01:02:42,750 --> 01:02:44,080

and you're serving requests from other clients 

你（master）可以接收服务来自其他clients 的请求

01:02:44,280 --> 01:02:46,120

you know and if I the master sort of designated a new primary for that chunk

你（听课的学生）知道，如果master给这个chunk指定了一个新的primary 

01:02:51,840 --> 01:02:54,400

now we'd have two primaries processing rights

现在我们会有两个primary 处理请求

01:02:54,599 --> 01:02:56,140

but two different copies of the data 

但现在有了两份不同的数据拷贝（知秋注：两个primary ）

01:02:56,340 --> 01:02:58,630

and so now we have totally diverging copies the data 

所以现在我们的数据被完全分散了

01:02:58,829 --> 01:03:02,170

and that's called that error having two primaries

这就是所谓的具有两个primary的错误

01:03:07,559 --> 01:03:10,570

or whatever processing requests without knowing each other 

或彼此不认识的两个primary在处理请求

01:03:10,769 --> 01:03:12,370

it's called squid brain 

这可以称之为脑裂

01:03:12,570 --> 01:03:16,510

and I'm writing this on board

我将这个写在黑板上

01:03:16,710 --> 01:03:19,240

because it's an important idea 

因为这是一个很重要的idea 

01:03:19,440 --> 01:03:22,960

and it'll come up again and it's caused 

它在后面还会再次出现

01:03:23,159 -->  01:03:34,060

or it's usually said to be caused by network partition that is some network error in which the master can't talk to the primary

通常是由网络分区引起的，即某些网络错误使得master无法与primary对话



01:03:34,260 --> 01:03:35,440

but the primary can talk to clients sort of partial network failure

但在这种分区网络故障中，primary可以与clients进行对话，

01:03:38,329 -->  01:03:46,269

and you know these are some of the these are the hardest problems to deal with and building these kind of storage systems 

你知道这些是构建这种存储系统要解决的最困难的问题



================================================================

01:03:46,469 --> 01:03:55,010

okay so that's the problem is we want to rule out the possibility of mistakingly designating two primary  for the same chunk

okay so，即我们想要去排除这种可能出现的错误地为同一个chunk指定两个primary的问题



01:03:56,210 --> 01:03:58,410

 the way the master achieves that is that when it designates a primary 

master实现的方式是指定primary

01:03:58,610 --> 01:04:03,120

it says it gives a primary lease which is basically the right to be primary until a certain time

它提供了一份primary租约（过期时间），基本上就是在说，在特定时间之前给你primary的权利



01:04:05,590 --> 01:04:08,789

the master knows it remembers and knows how long the lease lasts 

master 知道该lease （租约）会持续多长时间

01:04:08,989 --> 01:04:12,300

and the primary knows how long is lease lasts 

primary 也知道lease （租约）会持续多长时间

01:04:12,500 --> 01:04:14,760

if the lease expires the primary knows that it expires 

如果lease （租约）过期，primary 也知道它过期了

01:04:18,800 --> 01:04:20,370

and will simply stop executing client requests 

也就会很简单的停止执行client 端的请求了

01:04:20,570 --> 01:04:22,950

it'll ignore or reject client requests after the lease expired

它会在过期后直接忽略或拒绝客户端请求

01:04:24,829 --> 01:04:27,600

and therefore if the master can't talk to the primary 

因此，如果master无法和primary通信

01:04:27,800 --> 01:04:29,370

and the master would like to designate a new primary

master会分配一个新的primary

01:04:29,570 --> 01:04:31,019

the master must wait for the lease to expire for the previous primary 

master必须等前一个primary 的lease （租约）过期

01:04:33,829 --> 01:04:39,070

so that means master is going to sit on its hands for one lease period 60 seconds

so 这也意味着，master 会摊摊手，什么也不做，等待一个租约时间（60s）



01:04:39,070 --> 01:04:41,460

 after that it's guaranteed the old primary will stop operating its primary 

之后，可以确保旧的primary停止行使其作为primary的特权

01:04:41,659 --> 01:04:44,310

and now the master can see if he doesn't need a new primary without producing this terrible split brain situation

现在，master可以看到，如果它不需要一个新的primary，是不会产生这种可怕的split-brain（脑裂）情况的

01:05:02,298 -->01:05:17,879

oh so the question is why is designated a new primary bad，since the clients always ask the master first 

so 他的问题是为什么要指定一个新的有问题的primary，因为clients总是先请求master



01:05:18,079 --> 01:05:22,619

and so the master changes its mind then subsequent clients will direct the clients to the new primary 

so，master会改变主意，随后将clients引导到新的primary上去



01:05:22,818 --> 01:05:26,190

well one reason is that the clients cash for efficiency 

well 一个原因就是clients追求效率

01:05:26,389 --> 01:05:28,229

the clients cash the identity of the primary for at least for short periods of time

client会在短时间内兑现primary的身份

01:05:31,278 --> 01:05:40,440

even if they didn't though the bad sequence is that I'm the master you ask me who the primary is

即使clients的流程顺序是对的，即你去找master，问它，谁是primary 



01:05:40,639 --> 01:05:43,249

I send you a message saying the primary is server one  right

master会给你（clients）发送一条信息说，primary是server 1，right

01:05:46,369 --> 01:05:47,609

and that message is flight in the network 

这条消息还在网络传输中

01:05:47,809 --> 01:05:50,430

and then I'm the master I 

我作为master

01:05:50,630 --> 01:05:51,960

you know I think somebody's failed whatever I think that primary is failed 

你知道，我估计因为一些情况，primary 挂掉了

01:05:52,159 --> 01:05:53,068

I designated a new primary 

我指定了一个新的primary 

01:05:53,268 --> 01:05:55,019

and I send the primary message saying you're the primary 

我给这个primary 发了一条消息说，你现在是primary了！

01:05:56,208 --> 01:05:57,419

and I start answering other clients who ask the primary 

我开始回复其他请求我primary是谁的clients 

01:05:57,619 --> 01:06:00,149

is saying that that where is the primary 

primary 就是我刚指定完的那个

01:06:01,149 --> 01:06:01,200

while the message to you is still in flight 

此时之前那条信息（知秋注：讲server1是primary）还在网络传输中

01:06:03,018 --> 01:06:04,680

you receive the message saying the old primaries is primary 

你接收到得到信息说，老的那个primary 是primary 

01:06:04,880 --> 01:06:06,930

you think gosh I just got this from the master

你（client）会想，天！我就是刚从master处获取的primary 

01:06:07,130 --> 01:06:10,019

I'm gonna go talk to that primary 

我（client）会去和那个老的primary 通信

01:06:10,219 --> 01:06:11,430

and without some much more clever scheme

没有一些更聪明的计划

01:06:13,458 -->  01:06:19,109

there's no way you could realize that even though you just got this information from the master  it's already out of date 

你（client）没有其他渠道可以认知到它（和自己通信的这个primary）已经过时了，哪怕你是刚从master获取的信息



01:06:19,309 --> 01:06:21,479

and if that primary serves your modification requests 

如果老primary 执行了你（client）的修改请求



01:06:21,679 --> 01:06:24,210

now we have to and and respond success to you right

并回复给你（client）说执行成功

01:06:27,920 --> 01:06:35,349

then we have two conflicting replicas yes

然后我们就有了两份冲突的副本，yes

01:06:41,909 --> 01:06:50,510

again you've a new file and no replicas

你有一个新的文件，此时并没有replicas（文件副本服务器）

01:06:50,710 --> 01:06:53,210

okay so if you have a new file no replicas 

okay so如果 你有一个新的文件且没有replicas



01:06:53,409 --> 01:06:54,980

or even an existing file 

或者说，存在了一个文件

01:06:55,179 --> 01:06:59,930

and no replicas the you'll take the path I drew on the blackboard 

没有replicas ，你要获取一条我在黑板上所画的路径（知秋注：要存储操作的路径）



01:07:00,130 --> 01:07:01,940

the master will receive a request from a client saying

master 会从一个client收到一条请求，说

01:07:02,139 --> 01:07:04,070

oh I'd like to append to this file 

我（client）想要追加这个文件

01:07:04,269 --> 01:07:06,230

and then well I guess the master will first see there's no chunks associated with that file 

然后，well，我猜master 会先查看下这个文件有没有相关联的chunks ，没有

01:07:08,199 --> 01:07:11,510

and it will just make up a new chunk identifier 

他就会补建一个新的chunk identifier 

01:07:11,710 --> 01:07:13,370

or perhaps by calling the random number generator 

或者，也可能通调用随机数生成器生成一个数字

01:07:13,570 --> 01:07:15,530

and then it'll look in its chunk information table 

然后它会看它自己的 chunk信息表

01:07:17,920 --> 01:07:19,880

and see gosh I don't have any information about that chunk 

发现，老天！我竟然没有这个chunk的任何信息

01:07:20,079 --> 01:07:21,830

and it'll make up a new record saying 

它会创建一条新的记录，说

01:07:22,030 --> 01:07:24,530

but it must be special case code where it says 

它肯定是一段很特别的针对这种情况的代码，它会说

01:07:26,409 --> 01:07:28,519

well I don't know any version number this chunk doesn't exist 

well 我没有任何该chunk 的版本信息，它不存在

01:07:28,719 --> 01:07:30,650

I'm just gonna make up a new version number one

我会补建一个新版本号 1

01:07:30,849 --> 01:07:32,539

 pick a random primary 

随机选一个primary 

01:07:32,739 --> 01:07:35,180

and set of secondaries

并设定secondaries集

01:07:35,380 --> 01:07:37,700

and tell them， look， you are responsible for this new empty chunk 

告诉它们（primary 和secondaries），看，你们就是专为这个空chunk 来返回响应准备的

01:07:37,900 --> 01:07:41,160

please get to work 

可以去干活了



01:07:41,160 -->01:07:48,160

the paper says three replicas per chunk by default 

paper 中有说， 默认情况下，每个chunk对应了三个replicas 

01:07:48,019 --> 01:07:51,910

so typically a primary and two backups

so 通常是一个primary 和两个backups（知秋注：一主两备）

01:08:03,929 --> 01:08:13,070

okay okay so the maybe the most important thing 

okay so 可能是因为这个事情很重要

01:08:13,269 --> 01:08:19,890

here is just to repeat the discussion we had a few minutes ago

这里就花了一些时间反复讨论了下



01:08:21,539 --> 01:08:31,940

the intentional construction of GFS 

关于GFS 的构建示意

01:08:32,140 --> 01:08:33,590

we had these record a pens is that if we have three we have three replicas 

我们使用粉笔来画下，如果我们有三个replicas（副本）

01:08:33,789 --> 01:08:43,579

you know maybe a client sends  and a record a pen for record a 

你知道，一个client可能会发送一个记录请求A







01:08:43,779 --> 01:08:46,519

and all three replicas or the primary 

接着，所有的replicas（副本）或这说 primary 



01:08:46,719 --> 01:08:49,369 

and both of the secondaries successfully append the data the chunks 

和两个secondaries 成功追加chunk数据

01:08:52,119 --> 01:08:55,489

and maybe the first record in the trunk might be a in that case 

在这种情况下，可能trunk中第一个记录就是A



01:08:55,689 --> 01:08:57,730

and they all agree because they all did it

他们都同意，因为他们所有都这么做了

01:08:57,930 --> 01:08:59,840

supposing another client comes in says， look ，I want a pen record B 

假设另一个client 也来一次，说，看我想记录一个B

01:09:03,338 --> 01:09:06,050

but the message is lost to one of the replicas

但是信息在传送给replicas其中一个的途中丢失了

01:09:06,250 --> 01:09:08,210

the network whatever supposably the message by mistake 

反正网络在传输信息的时候出了点状况

01:09:08,409 --> 01:09:11,389

but the other two replicas get the message 

但其他两个replicas（副本）都获得了信息

01:09:11,588 --> 01:09:13,190

and one of them's a primary 

这两个中其中一个是primary 

01:09:13,390 --> 01:09:14,180

and my other secondaries they both apend  the file

另一个是secondary（两个备机中的一个）

01:09:16,000 --> 01:09:19,190

so now what we have is two the replicas that B 

so 现在，我们有两个拥有B的副本

01:09:19,390 --> 01:09:21,559

and the other one doesn't have anything 

另一个则没有B

01:09:21,759 --> 01:09:26,210

and then may be a third client wants to append C 

接着，可能有第三个客户端相应追加C

01:09:26,409 --> 01:09:28,909

and maybe the remember that this is the primary 

可能会记得这件事，即这个是primary 

01:09:29,109 --> 01:09:30,260

the primary picks the offset 

primary 会选择这个offset 

01:09:30,460 --> 01:09:43,250

since the primary just gonna tell the secondaries， look， in a right record C at this point in the chunk they all right C here 

primary 会告诉其他两个secondaries ，看，你们要在对应chunk中的这个位置来记录C



01:09:43,449 --> 01:09:44,840

now the client for be the rule for a client for B 

now，对于client来说，有个规则，拿B来讲

01:09:45,039 --> 01:09:47,630

that for the client that gets us error back from its request is that it will resend the request 

client 通过它的请求会得到一个error 返回，然后他会重新发送这个请求

01:09:50,439 --> 01:09:55,820

so now the client that asked to append record B will ask again to a pen record B 

so now client再次请求追加记录B



01:09:56,020 --> 01:09:57,440

and this time maybe there's no network losses 

可能这次就没有网络丢失问题了

01:09:57,640 --> 01:10:00,140

and all three replicas as a panel record B right 

所有这三个replicas（副本）都会记录B

01:10:05,039 --> 01:10:07,038

and they're all lives 

它们都活着

01:10:07,238 --> 01:10:09,670

they all have the most fresh version number 

它们都有最新的版本号

01:10:09,869 --> 01:10:12,949

and now if a client reads what they see depends on the track which replicas they look at 

now 一个client能看到什么取决于它们所获取的副本所在

01:10:17,819 --> 01:10:19,820

it's gonna see in total all three of the records 

它会看到所有这三个里面的记录

01:10:20,020 --> 01:10:22,729

but it'll see in different orders depending on which replica reads 

但取决于它所读的replica，它会看到不同的顺序

01:10:25,029 --> 01:10:28,550

it'll mean I'll see A B C 

拿这个来说，我会看到A B C

01:10:28,750 --> 01:10:31,670

and then a repeat of B 

然后是一个重复的B

01:10:31,869 --> 01:10:33,529

so if it reads this replica it'll see B 

如果client读这个replica ，它会看到B

01:10:33,729 --> 01:10:36,769

and then C ,if it reads this replica it'll see A

然后是C,如果client读的是这个replica ，它会看到A

01:10:36,969 --> 01:10:39,140

and then a blank space in the file padding 

然后是一个空白空间

01:10:39,340 --> 01:10:41,720

and then C and then B 

然后是C 接着是B

01:10:41,920 --> 01:10:43,998

so if you read here you see C then B 

so 如果你读这里，你会看到C，然后是B

01:10:44,198 --> 01:10:47,119

if you read here you see B and then C 

如果你读这里，你看到B，然后C

01:10:47,319 --> 01:10:49,150

so different readers will see different results 

so 不同的读操作，会看到不同的结果

01:10:49,350 --> 01:10:52,130

and maybe the worst situation is 

最坏的情形可能是

01:10:52,329 --> 01:10:54,288

it some client gets an error back from the primary 

一些客户端会从primary 获取到一个error

01:10:54,488 --> 01:10:58,159

because one of the secondaries failed to do the append 

因为secondaries中的一个文件追加失败

01:10:58,359 --> 01:10:59,958

and then the client dies before we sending the request 

然后在client 发送请求之前，挂掉了

01:11:02,260 --> 01:11:03,829

so then you might get a situation 

so 你可能就处于这个情形

where you have record D showing up in some of the replicas 

即你会有记录D在一些replicas（副本）中

01:11:07,029 --> 01:11:11,690

and completely not showing up anywhere in the other replicas 

然而其他的replicas（副本）中压根找不到

01:11:13,750 -->  01:11:25,420

so you know under this scheme we have good properties for appends  that the primary sent back a successful answer for  

so，你知道在此方案下，我们有good属性作为primary为追加成功所发送的响应



01:11:25,420 --> 01:11:31,269

and so not great properties for appends where the primary sent back of failure 

so，也有 not great属性用来作为primary 为追加失败所发送的响应

01:11:30,469 --> 01:11:37,748

and the records the replicas just absolutely be different all different sets of replicas

这里说的这些记录所针对的replicas 绝不是不同的replicas集合（知秋注：都是同一个文件下某个chunk所对应的一个replicas集）

01:11:44,399 --> 01:11:46,460

yes my reading in the paper is that the client starts at the very beginning of the process 

在paper 中写道，client 的读操作在最开始处理的时候

01:11:49,090 --> 01:11:51,110

and asked the master again

会请求master 

01:11:51,310 --> 01:11:53,989

what's the last chunk in this file 

该文件的最后一个chunk是什么

01:11:54,189 --> 01:11:57,510

you know because it might be might have changed if other people are apending in the file yes

你知道，因为它可能会被改变，如果有其他人在追加这个文件的话



01:11:57,510-01:12:18

提问



01:12:18,760 --> 01:12:21,090

so I can't you know I can't read the designers mind 

so 我无法知道设计者的想法

01:12:21,289 --> 01:12:27,520

so the observation is the system could have been designed to keep the replicas in precise sync 

so 从观察到来看，系统这样设计是为了使replicas保持精确同步

01:12:27,640 --> 01:12:30,619

it's absolutely true 

这是完全正确的

01:12:30,819 --> 01:12:32,900

and you will do it in labs 2 & 3 

你会在进行labs 2 & 3 时遇到

01:12:33,100 --> 01:12:34,730

so you guys are going to design a system that does replication that actually keeps the replicas in sync

so 你们要设计一个可复制的系统，该复制实际上要使replicas保持同步

01:12:36,880 -->  01:12:42,980

and you'll learn you know there's some various techniques various things you have to do in order to do that 

你在依次做这些lab的时候会学到各种各样的技术，各种东西



01:12:43,180 --> 01:12:47,539

and one of them is that there just has to be this rule if you want the replicas to stay in sync 

其中之一就是，如果你希望replicas(副本)保持同步，则只需要遵循此规则



01:12:47,739 --> 01:12:54,289

it has to be this rule that you can't have these partial operations that are applied to only some and not others 

所指规则即，你不能进行这样的分区操作，也就是这些操作仅应用于某些（副本），而不应用于（其他副本，它们其实都在同一个副本集中）



01:12:54,489 --> 01:12:56,210

and that means that there has to be some mechanism to like where the system 

这也就意味着系统某些地方需要类似的一些机制

01:12:58,630 --> 01:12:59,930

even if the client dies where the system says we don't wait a minute 

即使如果client 挂掉了，这个系统说我们不需要等了

01:13:01,899 --> 01:13:03,860

there was this operation 

这里还有一个操作

01:13:04,060 --> 01:13:07,190

I haven't finished it yet 

我还没有将之结束

01:13:29,390 --> 01:13:11,619

so you build systems in which the primary actually make sure the backups get every message

so 你构建的系统中的primary实际上可以确保备机（知秋注：默认是它的两个备机）得到每条消息


01:13:29,460 --> 01:13:34,190

if the first right b failed 

如果右侧第一个的b追加失败了

01:13:34,390 --> 01:13:37,739

you think the c should go with the b is

你想的是c应该跟着b才对（知秋注：添加只看offset值，chunk是不认识其他的）

01:13:37,770 --> 01:13:40,250

well it doesn't you may think it should

你无须这么去想

01:13:40,449 --> 01:13:41,930

but the way the system actually operates is that the primary will add C to the end of the chunk 

系统实际操作的方式是primary 会将C添加到chunk 的尾部

01:13:46,689 --> 01:13:57,529

and the after B yeah 

即在B之后

01:13:57,729 --> 01:13:59,690

I mean one reason for this is that at the time the right C comes in the  primary may not actually know what the fate of B  was

我是先说，对此一个原因是，在primary在追加c时，可能不知道B此时的命运如何

01:14:03,010 --> 01:14:05,510

 because we met multiple clients submitting append's concurrently

因为我们会遇到多个clients 并发提交追加请求的情况

01:14:07,510 --> 01:14:10,400

and you know for high performance 

你懂得，为了高性能

01:14:10,600 --> 01:14:14,690

you want the primary to start the append for B first 

你想要primary 首先开始对B的追加

01:14:14,890 --> 01:14:17,659

and then as soon as I can got the next stop set tell everybody did you see 

然后，然后我追加设置一结束就会告诉大家我做的事情

01:14:20,170 --> 01:14:21,550

so that all this stuff happens in parallel 

所有这些事情是并发发生的

01:14:21,750 -->  01:14:33,560

you know by slowing it down you could you know the primary could sort of decide that B is totally failed 

你知道在速度降下来时，你知道primary 可能会决定B完全失败





01:14:33,760 --> 01:14:35,360

and then send another round of messages 

然后将另一条信息发送一圈

01:14:35,560 --> 01:14:39,770

saying please undo the right of B

说，请撤销B

01:14:39,970 --> 01:14:43,159

and there'll be more complex  and slower 

这就会更复杂，更慢了

01:14:43,359 --> 01:14:48,529

I'm you know again the justification for this is that the design is pretty simple 

再次，这样做的理由是设计非常简单



01:14:48,729 --> 01:15:04,760

 you know it reveals some odd things to applications and the hope was that applications could be relatively easily written to tolerate records being in different orders or who knows what

它揭示了应用程序的一些奇怪之处，希望是可以相对容易地编写应用程序以容忍不同顺序的记录或其他什么？



01:15:04,960 -->01:15:13,100

or if they couldn't that applications could either make their own arrangements for picking an order themselves and writing you know sequence numbers in the files or something 

或者如果他们不能容忍，应用程序可以自行安排，自己选择写入顺序，并在文件或其他内容中写入你所知道的序列号





01:15:14,859 --> 01:15:17,538

or you could just have a if application really was very sensitive to order 

或者，如果application 真的很在意写入顺序

01:15:20,140 --> 01:15:21,710

you could just not have concurrent depends from different clients to the same file 

你可以不要使用不同的clients 来并发操作同一个文件

01:15:24,220 --> 01:15:27,320

right you could just you know files where order is very important 

right 你知道顺序对于有些文件十分重要

01:15:29,409 --> 01:15:31,190

like say it's a movie file 

就好比说有一个电影文件

01:15:31,390 --> 01:15:32,550

you know you don't want to scramble bytes in a movie file 

你知道你不想在电影文件中有干扰字节

01:15:32,750 --> 01:15:45,039

you just write the movie file you write the movie to the file by one client in sequential order and not with concurrent record depends

你仅通过一个client 按顺序将电影写入文件中，拒绝并发写入



01:15:49,149 --> 01:15:56,480

okay all right



01:15:56,680 --> 01:16:07,920

the somebody asked basically what would it take to turn this design into one which actually provided strong consistency consistency closer to our sort of single server model  where there's no surprises 

有人会问，将这种设计转变为实际上能提供更强一致性的设计，使其更接近于我们的那种单服务器模型，这没有什么可惊讶的



01:16:13,789 --> 01:16:18,480

I don't actually know because you know that requires an entire new complex design

我实际上不知道，因为你知道这需要全新的复杂设计

01:16:20,180 --> 01:16:22,140

it's not clear how to mutate GFS to be that design 

目前尚不清楚该如何将GFS演变为该设计

01:16:24,560 --> 01:16:26,130

but I can list for you lists for you some things that you would want to think about 

但我可以为你提供一些思路

01:16:27,439 --> 01:16:32,150

if you wanted to upgrade GFS to a assistance did have strong consistency

如果你想将GFS升级，使其确实具有很强的一致性的话

01:16:34,460 --> 01:16:37,170

one is that you probably need the primary to detect duplicate requests 

一个是你可能需要primary来检测重复的请求

01:16:40,939 --> 01:16:43,260

so that when this second b comes in the primary is aware that 

so 当这里第二个b来的时候，primary会注意到，

01:16:43,460 --> 01:16:44,760

oh actually you know we already saw that request earlier

oh，实际上我们之前已经看到了该请求

01:16:47,029 --> 01:16:50,369

and did it or didn't do it 

做或者不做

01:16:50,569 --> 01:16:51,960

and to try to make sure that B doesn't show up twice in the file 

要尝试确定B要不要做这个文件中出现两次

01:16:52,159 --> 01:16:56,140

so one is you're gonna need duplicate detection

so 一个建议是你需要去做重复检测

01:16:56,169 -->01:17:04,800

 another issues ，you probably if a secondary is acting a secondary， you really need to design the system 

另一个建议是，如果你需要一个secondary（知秋注：可理解为备机）这个角色的话，你真的需要设计系统





01:17:05,000 --> 01:17:12,360

so that if the primary tells a secondary to do something the secondary actually does it and doesn't just return error

这样，如果primary告诉secondary要做某事，则secondary实际上会去做，而不仅仅只是返回错误







01:17:12,560 --> 01:17:23,970

 right  for a strictly consistent system having the secondaries be able to just sort of blow off primary requests with really no compensation is not okay

对于具有secondaries的严格一致性的系统，仅在没有任何补偿的情况下就取消primary请求是不行的







01:17:24,170 --> 01:17:25,529

 so I think the secondaries have to accept requests  and execute them 

so我认为secondaries必须接受请求并执行

01:17:25,729 --> 01:17:28,260

or if a secondary has some sort of permanent damage 

或者secondary具有某种永久性损坏

01:17:28,460 --> 01:17:29,850

like it's disk got unplugged by mistake this 

就像是磁盘被误拔了

01:17:30,050 --> 01:17:31,980

you need to have a mechanism to like take the secondary out of the system 

你需要一种机制来将这个secondary退出系统

01:17:34,159 --> 01:17:36,000

so the primary can proceed with the remaining secondaries 

so primary可以继续处理其余的secondaries

01:17:39,140 --> 01:17:41,550

but GFS kind of doesn't either at least not right away

但是GFS的话至少可以看到，这个有问题的secondary不会立即消失，

01:17:45,199 --> 01:17:49,150

and so that also means that when the primary asks secondary's to append something 

so 这也意味着，当primary请求secondary追加某些内容时

01:17:50,909 --> 01:18:01,050

the secondaries have to be careful not to expose that data to readers until the primary is sure that all the secondaries really will be able to execute the append 

secondaries此时必须小心注意，不要在primary确保所有secondaries确实完成执行追加操作之前将数据暴露给进行读操作的client。



01:18:01,250 --> 01:18:05,110

so you might need sort of multiple phases in the write，

so，你可能需要在写操作中包含多个阶段

01:18:05,110--> 01:18:07,110

so first phase in which the primary asks the secondaries， 

so，第一阶段primary请求secondaries，

 01:18:07,110-->01:18:11,310

look ，you know I really like you to do this operation ，can you do it？

嘿，伙计，你知道我真的很想让你执行这个操作，你能做吗？

01:18:11,310 --> 01:18:13,360

but don't don't actually do it yet

但实际上还没有做

01:18:13,560 --> 01:18:15,610

and if all the secondaries answer with a promise to be able to do the operation

如果所有secondaries都答应能够执行该操作

01:18:17,670 --> 01:18:20,350

only then the primary says alright

然后只有在primary一声令下



01:18:20,550 --> 01:18:24,369

everybody go ahead and do that operation you promised 

每个人都继续执行那个所答应的操作



01:18:24,569 --> 01:18:27,010

and people you know that's the way a lot of real world systems strong consistent systems work 

这就是人们都知道的许多现实具备强一致性系统的工作方式

01:18:27,210 --> 01:18:31,750

and that trick it's called two-phase commit

这种可戏称为两阶段提交

01:18:32,630 --> 01:18:35,390

another issue is that if the primary crashes 

另一个建议是，如果primary崩溃了

01:18:35,390--> 01:18:40,210

there will have been some last set of operations that the primary had launched started to the secondaries 

此时，primary已启动到secondaries的最后一步操作（知秋注：即到了最后的执行提交阶段）

01:18:44,340 -->  01:18:48,699

but the primary crashed before it was sure whether those all the secondaries got there copied the operation or not 

但是primary在确定所有secondaries都复制完毕，这个操作完成之前崩溃了

01:18:51,659 --> 01:18:54,310

so if the primary crashes you know a new primary one of the secondaries is going to take over as primary 

so，如果primary崩溃，你就会知道secondaries中的一个新的Primary将接替primary

01:18:56,039 --> 01:18:57,579

but at that point the second the new primary 

但此时指向的是第二个，即这个新的primary 

01:18:57,779 --> 01:19:01,000

and the remaining secondaries may differ in the last few operations 

剩余的secondaries在最近的几次操作中可能会有所不同

01:19:03,239 --> 01:19:05,380

because maybe some of them didn't get the message before the primary crashed 

因为也许其中一些在老primary崩溃之前没有收到消息

01:19:07,199 --> 01:19:08,829

and so the new primary has to start by explicitly resynchronizing with the secondaries 

新的primary必须从与secondaries进行显式重新同步开始

01:19:15,300 --> 01:19:20,810

to make sure that the sort of the tail of their operation  histories are the same 

保证它们操作的历史记录的最后时刻是相同的



01:19:20,810 --> 01:19:23,329

finally to deal with this problem  

最后要解决的问题是

01:19:23,329 -->

oh you know there may be times when the secondaries defer 

oh，你知道有时secondaries会延迟

01:19:25,529 --> 01:19:32,800

or the client may have a slightly stale indication from the master：  which secondary to talk to 

或client可能会从master那里得到稍微陈旧的指示，即与某个secondary 进行通信







01:19:33,000 --> 01:19:35,739

the system either needs to send all client reads  through the primary 

系统可能需要通过primary发送所有client的读操作



01:19:35,939 --> 01:19:43,659

because only the primary is likely to know which operations have really happened 

因为只有primary才可能知道实际发生了哪些操作



01:19:43,859 --> 01:19:47,199

or we need a lease system for the secondaries just like we have for the primary 

或者我们像primary一样需要secondaries的租用系统



01:19:47,399 -->01:19:54,829

so that it's well understood that when secondary can't legally respond a client 

so，这就很容易理解了，当secondary无法合法响应client时





01:19:55,029 --> 01:20:02,029

and so these are the things I'm aware of that would have to be fixed in this system tor added complexity and chitchat to make it have strong consistency 

这些就是我所注意的必须要在此系统中进行修复，通过增加复杂性和彼此间的交流通信，来使其具备强一致性





01:20:02,229 --> 01:20:04,850

and you're actually the way I got that list was by thinking about the labs 

而实际上我就是通过思考这些labs而获得的这些想法

01:20:08,020 --> 01:20:09,739

you're gonna end up doing all the things 

最终你会做这些所有的事情

01:20:09,939 --> 01:20:13,788

I just talked about as part of labs two and three to build a strictly consistent system 

我只是在通过讨论labs 2和3来建立一个严格的强一致的系统







01:20:13,988 --> 01:20:18,739

okay so let me spend one minute 

ok so 让我再花一分钟时间

01:20:18,939 --> 01:20:32,570

on there's actually I have a link in the notes to a sort of retrospective interview about how well GFS played out over the first five or ten years of his life at Google 

实际上，我在笔记中有一个链接，该链接指向一个回顾性采访，内容涉及GFS在Google生命中的前五年或十年中的表现



01:20:32,770 --> 01:20:36,019

so the high-level summary is that the most is that was tremendously successful 

因此，高度概括一下，GFS真的很成功

01:20:37,689 --> 01:20:40,369

and many many Google applications used it in a number of Google infrastructure was built as a late like big file 

而且许多Google应用程序在许多Google基础架构中都使用了它，就像后来的大文件一样

01:20:45,250 --> 01:20:47,208

for example BigTable I mean was built as a layer on top of GFS 

例如BigTable，我的意思是它被构建为GFS之上的一层

01:20:47,408 --> 01:20:49,989

and MapReduce also

MapReduce 同样



01:20:50,189 --> 01:20:53,350

so widely used within Google 

它在Google中有如此广泛的使用

01:20:53,350-->  01:21:01,310

may be the most serious limitation is that there was a single master and the master had to have a table entry for every file in every chunk 

可能最严重的限制是只有一个master，而master必须为每个文件中都设定一个table-entry来链接每一个chunk



01:21:01,510 --> 01:21:11,779

and that means the GFS use grew and they're about more and more files 

这意味着随着GFS的使用量的增加，它们涉及的文件越来越多



the master just ran out of memory ran out of RAM to store the files 

master存储这些文件会将内存消耗完毕



01:21:11,979 --> 01:21:13,489

and you know you can put more RAM on 

你知道你可以添加更多的RAM

01:21:13,689 --> 01:21:18,109

but there's limits to how much RAM a single machine can have 

但是一台机器的RAM 可插数量终究是有限制的



01:21:18,309 --> 01:21:19,399

and so that was the most of the most immediate problem people ran into

所以这是最紧迫的问题

01:21:19,599 --> 01:21:27,829

 in addition the load on a single master from thousands of clients started to be too much in the master 

另外，对于单个master来说，成千上万个clients启动并请求master会给其造成极大的负载

01:21:28,029 --> 01:21:36,538

 you can only process however many hundreds of requests per second especially the write things to disk and pretty soon there got to be too many clients

你每秒只能处理数百个请求，特别是将内容写入磁盘，但是需要处理太多的clients请求

01:21:36,538 --> 01:21:41,208

 another problem with a some applications found it hard to deal with this kind of sort of odd semantics 

另一个问题，有些应用发现很难处理这种奇怪的语义



01:21:44,260 --> 01:21:54,199

and a final problem is that the master that was not an automatic storage for master failover in the original in the GFS paper as we read

最后一个问题是，我们从GFS论文中所读到的master并不是那种master故障转移自动存储



01:21:54,399 --> 01:21:56,239

 it like required human intervention to deal with a master that had sort of permanently  crashed 

就像需要人工干预来处理已经永久崩溃的master一样

01:21:59,170 --> 01:22:00,260

and needs to be replaced 

需要被更换

01:22:00,460 -->  01:22:05,779

and that could take tens of minutes or more I was just too long for failure recovery for some applications

可能要花几十分钟甚至更长的时间，对于某些应用程序的故障恢复来说，时间太长了



1.22.09-1.22.10

okay excellent 

Ok excellent 

1.22.10-1.22.14

I'll see you on Thursday

我们周四再见

1.22-.14-1.22.17

and we'll hear more about all these themes over the semester

我们会在这整个学期听到更多这类的话题





五十五  阅举报
