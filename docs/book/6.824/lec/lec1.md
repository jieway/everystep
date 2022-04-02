# lec1 

这节课主要讲性能和容错。

* 什么是分布式系统？

分布式系统是通过网络使得一群计算机相互通信进而完成一连串的任务。

* 为什么要使用分布式？

如果能用一台机器搞定就不要用多台机器。也就是能不用分布式就不用分布式，因为分布式不简单。

使用大量机器协作通过并行可以获得**高性能**。例如 CPU，内存，硬盘都能够并行运行。

此外分布式系统可以实现**容错**。例如两台机器做完全相同的事情，但是其中一台发生故障后可以马上却换到另一台机器上而不用从头开始，进而提高了效率。

物理空间上的**扩展**，两地转账，虽然处于不同的地域物理上是分散的，但是在这个系统内可以实现交互。

**隔离**：不信任某些代码，这些代码不会立即出现异常，可以将计算拆分，分散到不同的机器上计算，然通过网络协议进行通信从而实现隔离。

* 实现分布式系统的困难？

因为分布式由多部份组成，并且同时执行。这在并发上会有很大的问题，例如超时机制，熔断机制。这也是分布式系统难得原因。

另一个问题是，分布式系统中多个组件之间进行通信可能会产生意想不到的故障。例如电源故障，网络某些部分损坏，某些部分停止工作，其他继续工作。

构建分布式系统是为了获得高性能，但是会遇到很多难题，需要精心设计整个系统。

目前分布式已经在实际中投入使用的。例如某些大型网站。并且因为大型网络的兴起推动导致分布式系统变得很重。

虽然此前已经解决了很多的问题，但是目前依旧有很多的问题等待解决。

* 四个 lab 的介绍

Lab1 是让你去阅读论文，并实现你自己的简单 MapReduce 版本。

lab2 实现一个 raft 算法。Raft 通过复制实现了容错，当某个服务器出现故障后会选择其他备机进行主从切换.

lad3 使用自己实现的 Raft 算法实现具备容错功能的 key-value server,可以被复制和容错.

lab4 实现分片，分片是指将数据拆分为多个服务器之间的数据分区，以达到并行加速。将有可复制能力的主备 key-value 服务器克隆到多个独立的组中。然后你将你之前的key-value 存储系统中的数据分割并分别存储到这些独立的组中，以便通过运行多个这种可复制组来并行提高速度（每个组只存储对应自己的部分数据，所有组合起来是原来的一整份数据）

并且你还将负责在不同服务器之间来回移动各种数据块同时保证不会出现数据丢失（知秋注：数据分片到各个group中，group中的服务器内又会有主从复制）

lab 根据通过测试的次数来打分.本地的测试用例是全的，没有隐藏的测试。

debug 是很耗时间的，因为是分布式系统其中存在了大量的并发和通信，这就会导致在debug时会变得异常困难。

* 三种基础架构系统

存储，因为存储是一个定义明确且有用的对象，所以这是最为关注的一块。如何构建某种具有复制容错的高性能分布式存储实现。

计算，如何实现计算系统，例如 MapReduce 就是一种计算系统。

通信，分布式是构建在通信的基础之上。

对于存储和计算，目标是能够在分布式场景下发现可抽象的部分并设计成接口进而简化使用，最终在此基础上简化构建应用放入流程。也就是要从中隐含的分布式性质中构建出抽象来，构建出隐藏系统分布式性质的抽象。实际上这是难以完全实现的。

其实就是是一个超高性能容错的分布式系统，但是却提供和非分布式存储和计算同样的接口。

* 如何思考这些抽象？

首先是 RPC，目标是掩盖了通过不可靠网络进行通信的事实。

线程的使用，充分利用多核从而实现并发，线程简化了程序员的并发操作。在实现的时候需要考虑并发控制，例如锁。

* 性能

性能，分布式系统的目标是可扩展的提速，通过扩展进行加速。

什么是可扩展性？

例如一台机器能够解决的问题买两台机器能够节省一半时间，或者两台计算干的活是一台机器的两倍。也就是两倍的计算机或资使得具有两倍的性能或吞吐量。

通过增加机器的数量进而达到提高性能的目的，机器用钱就可以买到，不仅可以容灾还可以提高性能。但是和单机场景下花钱优化出更快的代码相比，后者显然要付出更昂贵的代价。

最终目的是希望用一千台机器来获得一百倍的吞吐量，但是必须要精心设计才能获得。

* 通过增加服务器实现性能加速的例子

例如某台计算机运行着数据库和 web 服务突然之间访问量加大，此时该怎么办？

一般来说是买更多的 web 服务器实现分流，一部分用户访问服务器一，另一部访问服务器二。也就是可以通过增加 web 服务器来实现并行加速的方法。

但并不能无线扩展。因为 web 服务器要访问同一个数据库，成百台 web 服务器访问数据库会使得数据库成为性能瓶颈，此时再增加 web 服务器就没用了。也就是无法通过无限制的增加电脑数量来提高性能，达到某个点就不起作用了。

此时可以拆分多个数据库，但是工作量很大。通常大型网站很容易耗尽单个服务器数据库或存储服务器的性能。

此时花很小的代价是不显示的，需要重新设计来实现可扩展性。

* 容错

单机系统稳定运行很多年是很正常的，但是使用成千上百条机器构建一个系统所有机器都稳定运行确是很难的。假设有一千台电脑通常意味着每天可能有三台电脑出现故障，一千台电脑所组成的系统中几乎每时每刻都会有东西损坏，例如崩溃，运行缓慢或者网络崩溃等问题。随着机器数量的增加，出现问题的概率也就变大了。

因为故障总是会出现，所以构建分布式系统时需要考虑整个系统能够处理这些故障。进而上层的程序员就不用考虑这些问题了。

* 容错：可用性

此外关于容错还有一种常见的思想是可用性，当系统遇到故障时能够正常运行并且提供完好的服务，但是当系统遇到很大的故障那么系统将不可用。例如有两份一样的数据，其中一个副本服务器挂掉了，因为副本的存在还能正常工作。当然也有可能全部故障，此时则无法保证可用性。

* 容错：自身可恢复性

自身可恢复性指系统出问题后可以被修复，修复前整个系统暂停，而修复后系统能够正常运行。和可用性相比，在故障修复前系统不会做任何事情。通常可恢复系统需要将最新的数据保存在硬盘上，恢复和再从硬盘中加载进来。

期待的可用系统是，遇到太多故障那么系统会暂停，修复足够多的问题后系统能够正常工作。其中有**非易失性存储**和**复制**两样东西很重要。

* 非易失性存储

非易失性存储是指断电后数据依旧不会丢失的设备，例如磁盘，SSD 等。而易失性存储反之，一旦断电数据就没了，例如内存。

使用非易失性存储可以将系统状态的检查点或者日志保存在硬盘，闪存，或者SSD之类的东西中。恢复后从磁盘中读取信息到达最新的状态并从该状态继续运行。缺点是更新成本很高，需要整个系统使用大量的技巧来避免过多的写入非易失性存储。

* 复制导致的一致性问题

因为和磁盘交互速度是很慢的，所以需要复制来提高性能。而复制又会带来一致性的问题。

通过复制可以获得容错能力，但是随着时间的推移复制之间会产生不一致的问题。

例如构建一个分布式 KV 存储系统，只支持 PUT，Get 两种操作，其中 PUT(key, value) 实现了将 key value 存入数据库中，系统内维护可一张 key 对应相应 value 的表，而 get(key) 则可以获得 key 对应的 value 。客户端发送一个 key 如果存在相应的 value 将会返回。

在非分布式系统中往往只有一个服务器和一张表，通常 put，get 操作不会出现歧义。

但在分布式系统中，通过复制和缓存从而获得了性能和容错，也就是存在多个副本，键值存在不同的版本。如果客户端发出一个 put 操作用于更新数据，但是存在多个副本，put 操作会将所有副本都进行更新。

假设更新副本时服务器出现了故障，出现了部分服务器的数据更新了，部分没有更新。

![20220402215248](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220402215248.png)

也就是说本次更新其中一些副本失败，一些副本更新成功，导致不同服务器上的数据不一致。

假设现在要通过 get 操作来进行数据读取，需要读取 key 相应的 value ，但是此时 value 不一致。

如果构建一个容错系统，有条规则，即你要始终先访问最上层的这个服务器，失败后再访问备用服务器。

但是因为旧数据的存在，未来某一天依旧有可能访问到旧数据。

如何在 put 和 get 的实现规则中保证一致性？

* 强一致性

强一致性：通过 get 获得最近 put 的数据。有时候弱一致性也非常有用，弱一致性无法保证 get 获得最新 put 所写的值，因为服务器中该值存在多个版本。

强一致性需要做大量细节的处理，需要消耗大量的通信才能实现。

* 强一致性实现

对于一个有些副本被更新但是有些副本没有被更新的情况可以采取用户读取所有副本。但是浪费很大因为读一个值需要浪费很多时间，可以进来尽量避免读取整个新的值，但是这样的话如果副本很远就相当于建立了一个弱系统。

使用副本来实现容错会带来很多问题，并且副本不能放在一个机房。假两个副本在同一个支架上，并且有人被电源线绊倒那么两个副本的数据都将丢失。所以副本尽量分开到不同的城市中。

* 弱一致性

强一致性需要消耗大量的通信，但是通过弱一致性可以获得高性能。

* MapReduce 简介

MapReduce 解决了以TB为单位运行大量计算的问题。例如创建网络所有内容的索引或分析链接整个网络的结构以便识别最重要的页面。或者你所知道的最权威的页面，对整个网络这段时间产生的数十亿兆字节的数据构建索引，基本上相当于对整个数据进行排序。单机来执行是非常耗时的，可能要数周，数年，数月来实现。

对 Google 来说购买大量计算机很值，所以能否通过增加机器来获得无穷的计算。

此时需要一个软件框架，对于普通程序员来说不需要考虑将工作分散到数千台计算机中的细节和怎样组织数据的细节，框架能够自动的处理各种故障。这个框架使得使得非专业人员不用知道分布式的任何知识也能够轻松开发和运行大型分布式计算系统。这就是 MapReduce 的全部意义所在。

将输入以某种方式分割为一大堆不同的文件或数据块

* MapReduce 执行流程

首先输入待处理的文件，然后 MapReduce 框架会将每个输入文件传入Map函数进行处理，Map 之间的并行的。Map 处理输入产生相应的输出，输出是一个 list 。Map函数生成了一个list的Key/Value键值对来作为函数的输出。以词频统计为例，输出的 key 是单词，value 则是该单词出现的次数。Key/Value对的集合作为中间输出。

接下来是 Reduce 阶段，从所有的 map 中遍历所有相同的 key 然后将其作为参数传给 Reduce 函数。在词频统计中，Reduce 函数只需要统计每项的个数。

![20220402230748](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220402230748.png)

整个计算流程被称为Job，任何一次Map/Reduce的调用都被称为Task 。因此，我们就有了完整的Job，它是由一系列MapTask和一系列ReduceTask所组成

* 如何实现 MapReduce 函数？

Map函数要做的就是拆分，其中 Key 是一个文件名，V 代表传入 Map 函数的输入文件的内容，其中包含了所有的文本。

![20220402231736](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220402231736.png)

首先将V的内容拆分为单词，然后对于每个 word 都会发出（emit）两个参数。也就是生成相应的键值对，例如 <"word", 1>

map 方法无须知道任何关于分布式或有多少台计算机或我们需要在网络上移动数据这个事实或一些其他分布式的系统的细节。

接下来是 Reduce 实现的功能，MapReduce 框架都会为每个给定key调用Reduce函数以接收它的所有实例。

Reduce 函数会根据这个key所关联的所有map对应的值得到一个vector数组，这个Key就是那个单词，value 只需要统计 vectore 的长度即可。

![20220402232327](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220402232327.png)

* GFS 

中间文件是存放在 GFS 中，GFS实际上与运行MapReduce的worker是在同一个服务器集上。在与运行MapReduce的worker服务器完全相同的一组worker上运行。

当你知道你读取文件是在GFS(即一个文件系统)的时候，GFS会自动地将你存储在它之上的任何大文件分割为很多64MBit大小的数据块，并将它们分散存储在许多服务器上

如果你爬取了10TB的网页内容，然后，你只需要将它们写入GFS即可，即使它是一个大文件，GFS也会自动将它拆分成无数个64kb大小的数据块，将它们均匀分布在谷歌所有可用的GFS服务器上。

此后要运行一个MapReduce job，它将整个已爬过的网站作为输入，数据已经根据某种方式拆分存储到了所有服务器中。

假设有一千台机器，启动 map worker 后将会有一千台 map worker 。每次就能读取一千个输入数据，并且这些worker能够从一千台GFS文件服务器中并行读取数据。此时吞吐量已经很大的了

GFS 和执行 MapReduce jobs 是如何交互的。随着谷歌对该系统的改进，答案已经发生的变化，一般来说大文件存储在大型网络文件系统中，需要通过通信才能恢复原来的数据。MapReduce 工作进程必须经常通过网络与正确的GFS服务器进行通信。这就是MapReduce在该论文中实际的工作方式。这样做会导致大量的网络通信，但是依然需要消耗大量的时间来移动数据。因此在2004年他们发表文章的时候，他们的MapReduce系统的最大瓶颈就是网络吞吐量。

因为和 CPU 以及内存的处理速度相比，网络通信是最慢的，所以设计的时候应当尽量避免使用网络传输。后来使用了一系列技巧来尽可能的避免通过网络传输。例如将GFS服务器和MapReduce Worker运行在同一组计算机集群中。也就是一千台机器上运行着GFS服务，并且将MapReduce也运行在这一千台机器上

例如当需要运行map的机器要读输入文件1时，需要对该文件执行 map 操作。

master 会很聪明地从GFS上找出实际保存该输入文件1所在的服务器

哪个服务器实际上在其本地磁盘上保存了这个输入文件1

1.12.49-1.12.56

and it would send the map for that input file to the MapReduce software on the same machine

然后，它会在该服务器上使用MapReduce软件来执行该输入文件所对应的map操作

1.12.56-1.13.04

 so that by default this arrow was actually local read from the local disk and did not involve the network

因此，默认情况下，这个箭头表示的是在本地硬盘中进行读取，这并不会涉及到任何网络相关的操作

1.13.04-1.13.09

 and you know depending on failures or load or whatever that couldn't always do that

你知道，由于网络失败或负载或其他一些原因导致这样的事情不可能百分百次次做到

1.13.09-1.13.21

 but almost all the maps would be run on the very same machine and stored the data，

但几乎所有的map 任务和它对应存储数据的地方都在同一台机器上

thus saving them vast amount of time that they would otherwise had to wait to move the input data across the network 

从而为它们节省了大量时间，否则它们将不得不等待在网络上移动输入数据

1.13.21-1.13.30

the next trick they played is that map as I mentioned before stores this output on the local disk of the machine that you run the map on

他们玩的下一个技巧是，如我之前提到的map，它会将它的输出存储在运行map的计算机的本地磁盘上

1.13.30-1.13.35

 so again storing the output of the map does not require network communication he's not immediately

因此再次存储map的输出不需要立马进行网络通信

1.13.35-1.13.37

because the output stored in the disk

因为输出结果是保存在硬盘里的

1.13.37-1.13.58

however we know for sure that one way or  another in order to group together all of you know 

可以肯定的是，为了将所有给定key相关的值组合到一起，总会有这样或那样的方法

by the way the MapReduce is defined in order to group together all of the values associated with the given key and pass them to a single invocation to produce on some machine

在MapReduce 中将给定key对应的所有这些值组合到一起后，将它们传给某些机器上的Reduce以供调用

1.13.58-1.13.59

this is going to require network communication

这就需要网络通信了

1.13.59-1.14.06

 we're gonna you know we want to need to fetch all these and give them a single machine that have to be moved across the network 

我们会想要获取所有这些数据，并通过网络将它们发送到一台机器上

1.14.08-1.14.21

and so this shuffle this movement of the keys from is kind of originally stored by row and on the same machine that ran the map 

这种shuffle 的过程键最初是按行移动存储的，并且与运行map同在一个机器上，

we need them essentially to be stored on by column on the machine that's going to be responsible for reduce

我们需要将这些按列存储在一台机器上以供Reduce使用

1.14.21-1.14.26

this transformation of row storage essentially column storage is called the paper calls a shuffle 

将行存储转换为列存储的过程，在论文中将之称为shuffle

1.14.26-1.14.35

and it really that required moving every piece of data across the network from the map that produced it to the reduce that would need it

确实需要将整个网络中的所有数据从生成它的map服务器转移到需要它的reduce服务器

1.14.35-1.14.39

and now it's like the expensive part of the MapReduce

这个过程也是MapReduce中非常消耗性能的一部分

1.14.39-1.14.45

 yeah  you're right ，you can imagine a different definition in which you have a more kind of streaming reduce.

yeah  你是对的，你可以想象一个不同的定义，在这个定义中你可以有一个更像stream的流式reduce操作。

1.14.56-1.15.03

I don't know I haven't thought this through I don't know why whether that would be feasible or not

我也不知道，我甚至都还没考虑过这个问题，因此，我也不知道这个是否可行

1.15.03-1.15.14

certainly as far as programmer interface like if the goal their number-one goal really was to be able to make it easy to program by people who just had no idea of what was going on in the system 

当然，就面向程序员使用的接口而言，他们的第一目标的目标就是能够使那些不了解系统内在正在发生什么的人们能够轻松进行编程

1.15.14-1.15.20

so it may be that you know this speck this is really the way reduce functions look 

这其实是就是reduce函数的样子

1.15.20-1.15.31

and you know in C++ or something like a streaming version of this is now starting to look I don't know how it look probably not this symbol

你知道，在C++或其他语言中有类似这样的流式处理实现可以做到类似这样的事情

1.15.31-1.15.34

 but you know maybe it could be done that way 

但你知道，它可能确实可以这样来做

1.15.34-1.15.43

and indeed many modern systems people got a lot more sophisticated with modern things that are the successors the MapReduce 

实际上，很多人们使用的现代系统为了处理现在的事情变得很复杂，但他们是MapReduce的衍生品

1.15.43-1.15.50

and they do indeed involve processing streams of data often rather than this very batch approach

和这种批处理相比，它们涉及数据的流式处理的机会确实更多

1.15.50-1.15.52

this is a batch approach in the sense  

这是一种批处理的方式

1.15.52-1.15.55

we wait until we get all the data and then we process it 

我们会等到直到得到所有数据，然后我们对它进行处理

1.15.55-1.15.59

so first of all that you then have to have a notion of finite inputs right

首先，你们要有一个有限输入的概念

1.15.59-1.16.11

modern systems often do indeed you streams and and are able to take advantage of some efficiencies do that MapReduce

现代系统通常会使用流处理来高效的进行MapReduce的工作



1.16.11-1.16.13

 okay 


1.16.13-1.16.19

so this is the point at which this shuffle

此处有一个Shuffle过程

1.16.19-

 is where all the network traffic happens

这里会产生网络流量

1.16.19-1.16.21

 this can actually be a vast amount of data

这里实际上会有大量的数据产生

1.16.21-1.16.22

so if you think about sort.

如果你考虑下排序

1.16.22-1.16.28

 if you're sorting the the output of the sort has the same size as the input to the sort

如果排序的输出和输入的大小是一样的

1.16.28-1.16.32

so that means that if you're you know if your input is 10 terabytes of data

这就意味着，如果你的输入数据大小为10TB

1.16.32-1.16.33

and you're running a sort

并且你在对它们进行排序时

1.16.33-1.16.37

 you're moving 10 terabytes of data across a network at this point 

此时，你通过网络去移动这10TB数据

1.16.37-1.16.39

and your output will also be 10 terabytes 

并且你的输出也会是10TB大小

1.16.39-1.16.41

and so this is quite a lot of data

因此，这其实是相当海量的数据

1.16.41-1.16.43

 and then indeed it is from any MapReduce jobs

它实际是由MapReduce所生成的

1.16.43-1.16.48

 although not all there's some that significantly reduce the amount of data at these stages

尽管并不是全部，但在这些阶段中会显著减少数据量

1.16.48-1.16.54

somebody mentioned Oh what if you want to feed the output of reduce into another MapReduce job

有些人可能会提到这种情况，即如果我们想将Reduce的结果再作为输入传入MapReduce作业

1.16.54-1.16.56

and indeed that was often what people wanted to do 

确实，这也是人们经常想去做的事情

1.16.56-1.16.59

and in case the output of the reduce might be enormous

这种情况下，reduce所产生的的输出可能非常巨大

1.16.59-1.17.01

 like for sort or web indexing

例如，排序或者对网页进行索引编排

1.17.01-1.17.05

 the output of the produces on ten terabytes of input

我们将产生的10TB大小数据作为输入

1.17.05-1.17.07

 the output of the reduces again gonna be ten terabytes

reduce所产生的的输出可能又是10TB

1.17.07-1.17.10

 so the output of the reduce is also stored on GFS 

So，reduce所产生的的输出也会存放在GFS中

1.17.10-1.17.14

and the system would you know reduce would just produce these key value pairs 

该系统在执行完reduce后，会生成这些键值对

1.17.14-1.17.22

but the MapReduce framework would gather them up and write them into giant files on GFS

MapReduce Framework会将它们整合在一起，将它们写入一些大型文件中，并保存到GFS中

1.17.22-1.17.34

and so there was another round of network communication required to get the output of each reduce to the GFS server that needed to store that reduce 

因此，这就需要另一轮网络通信，将每个reduce所生成的输出存放到需要存储reduce输出结果的GFS服务器上

1.17.34- 1.17.48

and because you might think that they could have played the same trick with the output of storing the output on the GFS server that happened to run the MapReduce worker that ran the reduce



由于你可能会认为它们可能会使用相同的技巧，将Reduce的输出也存储在运行Reduce worker的GFS服务器上





1.17.48-1.17.49

and maybe they did do that 

可能他们确实这么做了

1.17.49-1.17.56

but because GFS as well as splitting data for performance also keeps two or three copies for fault tolerance

但是因为GFS不仅为提高性能而拆分数据同时为了实现容错也保留了两三个副本

1.17.56-1.18.01

that means no matter what you need to write one copy of the data across a network to a different server

这意味着无论如何，你都需要通过网络将数据的一个副本写入到另一台不同的服务器


1.18.01-1.18.04

so there's a lot of network communication here

因此，这里就有大量的网络通信


1.18.04-1.18005

 and a bunch here also

此处同样也是

1.18.05-1.18.14

and I was this network communication that really limited the throughput in MapReduce in 2004

这种网络通信方式在2004年严重限制了MapReduce的吞吐量


1.18.14-1.18.23

in 2020 because this network arrangement was such a limiting factor for so many things people wanted to do in datacenters

在2020年，因为这种网络布局对于人们想要在数据中心中所做很多事情来说，是一个限制因素

1.18.23-1.18.27

 modern data center networks are a lot faster at the root than this was 

现代数据中心网络在根节点处的速度要远比这个快

1.18.27-1.18.35

and so you know one typical data center network you might see today actually has many root instead of a single root switch that everything has to go through

如今，你所可能见到的数据中心网络会有许多根节点，而不是只有一个要处理所有东西的根交换机

如今，你可能见到的一个典型的数据中心网络可能有许多根节点，而不是只有一个单个根交换机来处理所有事情


1.18.35-1.18.47

you might have you know many root switches and each rack switch has a connection to each of these sort of replicated root switches and the traffic is split up among the root switches 

你可能有很多根交换机，每一个机架交换机都和这些具有容灾能力的根交换机有连接，并且流量在这些根交换机之间分配

1.18.47-1.18.51

so modern data center networks have far more network throughput and

因此，现代数据中心网络具备了更大的网络吞吐量

1.18.51-1.18.58

because of that actually modern I think Google sort of stopped using MapReduce a few years ago 

由于这种现代化，我认为谷歌已经停止使用MapReduce有些年头了



1.19.00-1.19.08

but before they stopped using it the modern MapReduce actually no longer tried to run the maps on the same machine as the data stored on they were happy to vote the data from anywhere

但是在他们停止使用它之前，现代的MapReduce实际上不再尝试在存储数据的同一台计算机上运行map 任务，他们乐于从任何地方来获取数据

1.19.08-1.19.13

because they just assumed network was extremely fast

因为他们认为现在的网络非常快

1.19.13-1.19.14

okay



1.19.14-1.19.17

we're out of time for MapReduce

我们没时间继续去讲MapReduce了

1.19.17-1.19.22

we have a lab due at the end of next week

在下周结束时，我们有一个lab要交

1.19.22-1.19.26

in which you'll write your own somewhat simplified MapReduce 

你要写出你自己的简化版MapReduce

1.19.26-1.19.28

so have fun with that

So，好好享受它吧

1.19.28-end

and see you on Thursday

我们周四再会



一百零一  阅举报
