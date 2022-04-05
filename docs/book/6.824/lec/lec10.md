10-01
0-0.03

all right everybody let's get started

all right，娃儿们，我们开始上课吧

0.03-0.11

today the paper for todays I'm is aunt Aurora paper 

今天我们要读的paper是Aurora

0.11-0.20

which is all about how to get a high-performance reliable database going as a piece of cloud infrastructure

它的内容是关于如何让一个高性能高可靠的数据库作为云基础架构的一部分


0.20-0.25

 and itself built out of infrastructure that Amazon itself makes available 

而且该数据库自身是由Amazon本身提供的基础架构所构建出的

0.25-0.30

so the reason why we're reading this paper

So，我们阅读该paper的原因是

0.30-0.35

is that first of all it's a very successful recent cloud service from Amazon

首先，Aurora是近来由Amazon所提供的一个非常成功的云服务

0.35-0.37

 a lot of their customers use it

他们的很多客户都使用Aurora

0.37-0.45

it shows sort of in its own way an example of a very big payoff from clever design

它以自己的方式为例子向我们展示了它这种巧妙设计所带来的巨大回报


0.45-0.52

table one which sort of summarizes the performance shows that relative to some other system which is not very well explained

Table 1通过和其他系统进行对比，总结了它性能上的优势，虽然这张图并不能很好的说明什么

0.52-0.57

 the paper claims to get a thirty five times speed up in transaction throughput 

该paper表示，Aurora获得了相较于MySQL 35倍事务吞吐量上的提升

0.57-0.59

which is extremely impressive

这令我们非常印象深刻

0.59-1.07

 this paper also kind of explores the limits of how well you can do for performance and fault tolerance using general-purpose storage

该paper还探讨了在使用通用存储的情况下，在性能和容错方面，Aurora的局限性有哪些

1.07-1.11

because one of the themes of the papers they basically abandoned general-purpose storage 

因为在paper里所写的其中一个主题中，他们抛弃使用通用存储

1.11-1.18

they switch from a design in which they were using their Amazon's own general-purpose storage infrastructure，decided it was not good enough

他们一开始使用的是Amazon自家的通用存储基础架构，他们发现这样做性能还不够好

1.18-1.22

 and basically built totally application-specific storage

简单来讲，他们构建并使用了针对应用程序的存储



1.22-1.23

furthermore

此外

1.23-1.30

 the paper has a lot of little tidbits about what turned out to be important in this and the kind of cloud infrastructure world

该paper也提到了哪些才是云架构世界中重要的方面

1.30-1.33

 so before talking about aurora 

So，在谈论Aurora之前

1.33-1.37

i want to spend a bit of time kind of going over the back history 

我想花点时间和你们讲下历史

1.37-1.42

or what my impression is about the story that led up to the design of aurora

以及，我对关于Aurora它自身设计来源的一些印象

1.42-1.47

 because it's you know the sort of m f-- way that amazon has in mind that

因为Amazon已经意识到

1.47-1.53

 you ought to build that their cloud customers ought to build databases on amazon's infrastructure

他们的云客户应该在Amazon的基础架构平台上构建数据库

1.53-1.55

so in the beginning

So，在一开始

1.55-2.11

 amazon had basically their very first cloud offering to websites support people who wanted to build but using Amazon's hardware and in Amazon's machine room

简单来讲，Amazon一开始是为网站提供了首个云服务，以此来支持那些想要开网站的人，但使用的是Amazon的硬件和机房


2.11-2.14

 their first offering was something called ec2

他们提供的第一个云服务产品叫做EC2

2.14-2.19

for elastic cloud apparently 2

即Elastic Cloud 2

2.19-2.23

and the idea here is that Amazon had big machine rooms full of servers

他们的想法是，Amazon有一个全是服务器的超大机房

2.23-2.25

 and they ran virtual machine monitors on their servers 

他们在他们的服务器上运行虚拟机监视器

2.25-2.28

and they'd rent out virtual machines to their customers

他们将这些虚拟机租给他们的客户

2.28-2.34

 and their customers would then you know rent a bunch of virtual machines 

接着，他们的客户租了一堆虚拟机

2.34-2.40

and run web servers and databases and whatever ever all else they needed to run inside these ec2 instances 

并在这些EC2实例上运行Web服务器，数据库以及其他他们所需要运行的东西

2.40-2.46

so the picture of one physical server looked like this

So，一台物理服务器看起来应该是这样的


2.46-2.52

Amazon we control the virtual machine monitor on this hardware server

我们在硬件服务器上运行虚拟机监视器

2.52-2.56

 and then there'd be a bunch of guests a bunch of ec2 instances

在此之上还有一堆EC2实例

2.56-2.59

 each one rented out to a different cloud customer 

每个实例都会租给不同的云客户

2.59-3.01

each of these would just run a standard operating system 

每个实例都会运行一个标准的操作系统


3.01-3.02

like Linux 

比如：Linux


3.02-3.11

and then you know a web server or maybe a database server

接着，上面会运行一个web服务器，或者数据库服务器

3.11-3.15

and these were relatively cheap relatively easy to set up

这些使用起来价格便宜，且易于设置

3.15-3.18

 and as a very successful service

这是一个非常成功的服务

3.18-3.23

 so one little detail that's extremely important for us

So，有一个小细节对我们来说非常重要

3.23-3.32

 is that initially the way you get storage the way you've got storage if you rented an ec2 instance was that

我们获得存储的方式就是去租一个EC2实例

3.32-3.37

 every one of their servers had a disk attached a physical disk attached 

每台服务器都会挂载一个物理磁盘


3.37-345

and each one of these instances that they rented to their customers will get us you know a slice of the disk

每个租给客户的实例都会获得一部分磁盘空间

3.45-3.48

 so they said locally attached storage 

So，他们说这是一个本地挂载的存储设备

3.48-3.55

and you got a bit of locally attached storage  which itself just look like a hard drive  an emulated hard drive to the virtual machine guests

你会得到一个本地挂载的存储，对于虚拟机访客来说，它就像是一个模拟硬盘那样

3.55-4.02

ec2 is like perfect for web servers for stateless web servers 

EC2对于无状态web服务器来说，是很完美的

4.02-4.09

you know your customers with their web browsers would connect to a bunch of rented ec2 instances that ran a web server

你的客户会通过web浏览器来连接一堆运行着Web服务器的租用过来的EC2

4.09-4.12

and if you added all of a sudden more customers

如果你突然增加了更多客户

4.12-4.16

you could just instantly rent more ec2 instances from Amazon

那么你只需要从Amazon那里租更多的EC2实例即可

4.16-4.18

 and fire up web servers on them

并在上面启动web服务器

4.18-4.22

and sort of an easy way to scale up your ability to handle web load 

通过这种简单的方式可以去扩展处理web负载的能力

4.22-4.24

so it was good for web servers

So，对于Web服务器来说，这很棒

4.24-4.30

but the other main thing that people ran in ec2 instance this was databases

但人们在EC2实例上运行的另一个重要的东西就是数据库

4.30-4.34

because usually a website is constructed of a set of stateless web servers

因为通常来讲，一个网站是由一堆无状态web服务器所构成

4.34-4.40

 that anytime they need to get out permanent data go talk to a back-end database 

当他们需要获取那些持久化数据的时候，那就得去和后端数据库进行通信


4.40-4.51

so what you would get is is maybe a bunch of client browsers in the outside world outside of Amazon's web infrastructure

So，你会遇到的是一堆外界客户端浏览器（Amazon web基础架构平台外）对你服务的访问

4.51-5.00

and then a number of ec2 web server instances as many as you need it to run the sort of logic of the website

接着，你需要许多EC2 web服务器实例，以此来运行你的网站业务逻辑


5.00-5.02

this is now inside Amazon 

这些实例是在Amazon内部运行的

5.02-5.12

and then also some also typically one ec2 instance running a database 

接着，通常情况下，有一台EC2实例是用来运行数据库的

5.12-5.15

your web servers would talk to your database instance

你的web服务器会和你的数据库实例进行通信

5.15-5.17

 and ask it to read and write records in the database 

并对数据库进行数据的读取和写入

5.17-5.18

unfortunately

不幸的是

5.18-5.25

ec2 wasn't perfect was it nearly as well-suited to running a database as it was to running web servers 

比起运行web服务器来说，在EC2上跑数据库的效果并不是特别完美

5.25-5.26

and the most immediate reason is 

最直接的原因是

5.26-5.43

that the storage or the sort of main easy way to get storage for your ec2 database instance was on the locally attached disk attached to whatever a piece of hardware your database instance was currently running on

获取EC2数据库实例存储空间的最简单主要的办法就是使用运行着数据库实例的硬件上挂载的本地磁盘

5.43-5.45

 in fact hardware crashed 

事实上，如果当硬件崩溃了

5.45-5.49

then you also lost access to whatever what is on its hard drive 

那你也就无法访问EC2实例上所挂载的硬盘了


5.49-5.51

so if it's a hardware 

So，如果它是一个硬件

5.51-5.55

that it was actually implementing a web server crashed no problem at all 

实际上，如果这里部署了一个web服务器，崩溃的话，并没有什么问题

5.55-5.57

because there's really keeps no state itself 

因为这里并没有保存任何状态

5.57-6.00

you just fire up a new web server on a new ec2 instance

你只需要在一个新的EC2实例上启动一个新的web服务器就行


6.00-6.05

 if the ec2 instance it's a hardware running it  crashes have become unavailable 

如果运行着该EC2实例的服务器崩溃了，那我们就无法访问它了



6.05-6.10

you have a serious problem，if the data is stored on the locally attached disk

如果数据是存储在本地挂载的磁盘上，那我们就会遇到一个严重的问题

6.10-6.24

 so initially at least there wasn't sort of a lot of help for doing this one thing that did work out well is that Amazon did provide this sort of large scheme for storing large chunks of data called S3

我通过Amazon中一个叫做S3的云服务来帮助我们解决这个问题（S3是一个用来存储大数据的服务）

6.24-6.25

 and you could take snapshots

你可以做个快照

6.25-6.32

 you could take periodic snapshots if you need a basis state and stored in s3  and use that for sort of backup disaster recovery

如果你需要保存一个基本状态并将它保存在S3中，你可以定期保存快照，以此用于备份和灾难恢复

6.32-6.37

 but you know that style of periodic snapshots means

 但这种定期制作快照意味着

6.37-6.41

 you're gonna lose updates that happen between the periodic backups

那你就会丢失定期备份之间所发生的更新

6.41-6.43

 all right



6.43-6.49 ！！！！！！！

so the next thing that came along that's that's relevant to the sort of Aurora database story 

So，我们下一个要讲的东西和Aurora数据库的故事相关

6.49-6.58

is that in order to provide their customers with disks for their ec2 instances that didn't go away if there was a failure

如果发生故障，为了让他们EC2实例中的磁盘数据不会出现问题而消失

6.58-7.03

that is more sort of fault tolerant long-term storage was guaranteed to be there 

那Amazon就得保证提供容错能力且可以长期运行的存储服务

7.03-7.06

Amazon introduced the service called EBS 

Amazon引入了一个叫做EBS的服务

7.06-7.10

and this stands for elastic block store

它的全称是elastic block store

7.10-7.12

so what EBS is is a service

So，EBS就是一个服务


7.12-7.18

that looks to an ec2 instances it looks to one of these instances one of these guest virtual machines

它会去寻找一个EC2实例，寻找其中一个Guest虚拟机

7.19-7.21

So just as if it were a hard drive 

它就像是一块硬盘

7.21-7.28

an ordinary way you could format it as a hard drive  but a file system like ext3 or whatever Linux file system  you like on this thing

你可以通过平常我们用的文件系统来对其进行格式化，比如Ext3或其他你喜欢的Linux文件系统

7.28-7.31

that looks to be guest just like a hard drive

对于Guest来说，这就像是一个硬盘

7.31-7.36

 but the way it's actually implemented is as a replicated pair of storage servers 

但实际的实现方式是使用了一组replicated存储服务器


7.36-7.43

so this is the local this is one of local storage look like

So，这看起来就好像是一个本地存储（知秋注：对于使用者来讲，你在使用它时，把它看作是一个本地存储来用就是了）

7.43-7.46

if when EBS came out

当EBS推出的时候

7.46-7.49

 then you could rent an EBS volume

那么我们就可以去租用一定容量的EBS

7.49-7.51

 which this thing that looks just like an ordinary hard drive

我们所租借的这个EBS看起来就像是一块普通硬盘那样

7.51-8.01

 but it's actually implemented as a pair  so these are EBS servers a pair of EBS servers

但它实际上是通过一对EBS服务器所实现的


8.01-8.06

 each with an attached hard drive 

每个EBS服务器上都挂载了一块硬盘

8.06-8.11

so if your software here maybe you're running a database now

So，如果你在上面运行了软件，比如数据库

8.11-8.15

and your databases mount's one of these EBS volumes as its storage

你的数据库将其中一个EBS volumn挂载为它的存储容器

8.15-8.16

 when the database server does write

当数据库服务器进行写入操作时

8.16-8.17

 what that actually means is 

这实际上意味着

8.17-8.21

that the write to send out over the network and using chain replication which we talked about last week 

数据库服务器将这个写入请求通过网络发送给EBS服务器，这里使用的是我们上周谈论过的链式复制

8.21-8.27

your write is you know first written to the EBS server one

你的写请求首先会传入EBS服务器1，并进行写入


8.27-8.30

 on the first EBS server that's backing your volume 

我们会通过第一个EBS服务器来备份你volumn中的数据

8.30-8.31

and then the second one and

接着再用第二个EBS服务器来备份你的数据

8.31-8.32

finally you get the reply 

最后，我们会得到回复

8.32-8.33

and similarly 

与此类似

8.33-8.34

when you do a read

当你进行一次读请求

8.34-8.38

 I guess some chain replication you'll be the last of the chain c

如果这里使用的是链式复制，那么我们就会从链的tail处读取数据

8.38-8.44

so now database is running on ec2 instances had available a storage system

So，当下运行在EC2实例上的数据库会有一个可用的存储系统

8.44-8.49

that actually would survive the crash of or the you know death of the hardware that they were running on

实际上，该存储系统会从崩溃或者在它们所运行的硬件损坏的情况下幸存下来



8.49-8.52

if this physical server died

即如果这个物理服务器挂掉了

8.52-8.56

 you could just get another ec2 instance fire up your database 

你可以通过另一台EC2实例来启动你的数据库

8.56-9.04

and have it attached to the same old EBS volume  that the sort of previous version of your database was attached to

将它连接到原来数据库所连接的同一个EBS volumn上

9.04-9.08

 and it would see all the old data just as it had been left off by the previous database

接着，它就会看到前一个数据库所留下的老数据了

9.08-9.12

 just like you moved a hard drive from one machine to another

就好比是，你将一块硬盘从一台机器移动到另一台机器

9.12-9.17

so EBS was like really a good deal for people who need it to keep permanent state

So，对于需要保存永久数据的人来说，EBS就是一个很好的方案

9.17-9.19

 like people running databases

比如，人们所运行的数据库

9.19-9.32

 one thing to that is sort of important for us about EBS is that

对于我们来说，关于EBS有一点很重要

9.32-9.35

 it's really it's not a system for sharing 

它其实不是一个用于共享的系统

9.35- 9.43

at any one time only one ec2 instance only one virtual machine can mount a given EBS volume 

在任何时候，对于一个给定的EBS volumn来说，都只能有一台EC2实例或者一台虚拟机挂载

9.43-9.50

so the EBS volumes are implemented on a huge fleet of you know hundreds or whatever storage servers with disks at Amazon 

So，EBS volumn是基于Amazon所提供的数百台存储服务器上所实现的

9.50-9.56

and they're all you know everybody's EBS volumes are stored on this big pool of servers

所有人的EBS volumn都保存在这个大型服务器集群中

9.56-10.06

 but each one of each EBS volume can only be used by only one ec2 instance only one customer

但每个EBS volumn只能由一个EC2实例所使用，仅提供给一个用户

10.06-10.09

all right 



10.09-10.12

still EBS was a big step up

EBS的出现虽然是一个巨大的进步

10.12-10.14

but it had still has some problems 

但它依然存在着一些问题

10.14-10.20

so there's still some things that are not quite as perfect as it could be

So，EBS仍然有些方面不尽如人意

10.20-10.22

one is that 

其中一点是

10.22-10.24

if you run a database on EBS 

如果你在EBS上运行一个数据库

10.24-10.28

it ends up sending large volumes of data across the network 

它最终会通过网络发送大量的数据


10.28-10.35

and this is uh we're now starting to sort of sneak up on figure 2 in the the paper 

现在，我们来看下paper中的figure 2

10.35-10.43

where they start complaining about how many writes it takes if you run a database on top of a network storage system

如果你在一个网络存储系统上运行一个数据库，那么他们就会开始抱怨数据库所要进行的写操作的次数

10.43-10.49

so there's the database on EBS ended up generating a lot of network traffic 

So，在EBS上运行数据库会导致生成大量的网络流量

10.49-10.55

and one of the kind of things in the paper that the paper implies is 

paper中暗示了一点

10.55-11.01

that they're as much network limited as they are CPU or storage limited

它们受网络限制的程度与受CPU或存储限制的程度一样（知秋注：即将对网络的需求放在与CPU、存储一样重要的位置）

11.01-11.08

that is they pay a huge amount of attention to reducing the Aurora paper sends a huge amount of attention for reducing the network load that the database generates

Amazon的工程师花了很多精力来减少由数据库所产生的网络负载

11.08-11.14

and seems to be worrying less about how much CPU time or disk space is being consumed

并且我们似乎不用太过担心CPU时间或者磁盘空间上的消耗（知秋注：Amazon说，硬件我给你管够！）

11.14-11.18

that's a sort of a hint at what they think is important 

这暗示着，他们觉得网络这块内容很重要

11.18-11.22

the other problem with EBS is not very fault tolerant

EBS的另一个问题就是，它们的容错能力不是特别好

11.22-11.24

 it turns out that for performance reasons

事实证明，出于性能的原因

11.24-11.30

Amazon would always put both of the replicas of your EBS volume in the same data center

Amazon始终将你的EBS volumn所在的两个replica放在同一个数据中心

11.30-11.33

and so we have a single server crashed

So，如果我们有单个服务器崩溃了

11.33-11.36

 if you know one of the two EBS servers that you're using crashed it's okay 

如果你所使用的两个EBS服务器中有一个崩溃了，这并没有什么大不了的

11.36-11.38

because you switch to the other one

因为我们切换到另一个服务器就行了

11.38-11.42

 but there was just no story at all for what happens if an entire data center went down 

但如果整个数据中心挂掉了，我们也不知道会发生什么事情

11.42-11.58

and and apparently a lot of customers really wanted a story that would allow their data to survive an outage of an entire data center

如果一整个数据中心挂掉了，很多客户依然希望他们的数据或服务能从这种灾难中幸存下来

11.58-12.00

maybe it lost his network connection 

这里可能发生了网络连接断开

12.00-12.05

it was a fire in the building or a power failure to the whole building or something 

也可能是大楼起火或者大楼供电故障之类的事情

12.05-12.11

people really wanted to have at least the option if they're willing to pay more of having their data stored in a way they hid they could still get at it

至少如果有选择的话，人们会愿意花更多的钱来保证数据的可用性

12.11-12.15

 I'm even if one data center goes down 

如果发生故障的话

12.15-12.23

and the way that Amazon described this 

Amazon表示

12.23-12.32

there is that both an instance and 2  EBS replicas are in the same ability veil ability zone

他们会将一个实例与2个EBS replica放在同一个可用区域

12.32-12.36

and an Amazon jargon an availability zone is a particular data center 

Amazon表示，一个可用区域就是一个数据中心

12.36-12.38

and the way they structure their data centers is

他们构建他们数据中心的方式是

12.38-12.47

that there's usually multiple independent data centers in more or less the same city or relatively close to each other 

通常他们会在同一个城市或者彼此距离相近的地方有多个独立数据中心



12.47-12.57

and all the multiple availability zones maybe two or three that are near by each other are all connected by redundant high speed networks 

所有多个可用区域可能是由（通过冗余高速网络连接的）2个或3个数据中心构成

所有多个可用区域（可能彼此相邻的两个或三个）都通过冗余高速网络连接

12.57-13.01

so there's always pairs or triples of nearby availability centers

So，这始终是由2个或3个附近的数据中心组成一个可用中心

So，附近总是有2个或3个可用的数据中心

13.01-13.03

 and we'll see the by that's important in a little bit

我们之后会看到为什么这一点很重要

13.03-13.04

 but at least for EBS

但至少对于EBS来说

13.04-13.08

 in order to keep the sort of costs of using chain replication down

为了降低使用链式复制的成本

13.08-13.14

 they required the two replicas to be in the same availability zone

他们就需要将两个replica放在同一个可用区域

13.14-13.18

all right 



13.18-13.26

um before I dive into more into how Aurora actually works

在我深入讲解Aurora实际的工作方式之前

13.26-13.28

 it turns out that

事实证明

13.28-13.32

 the details of the design in order to understand them

为了去理解该设计的细节

13.32-13.36

 we first have to know a fair amount about the sort of design of typical databases

我们首先得去了解下标准数据库的设计

13.36-13.42

because what they taken is  sort of the main machinery of a database  MySQL as it happens

因为他们所采用的是MySQL的主要机制

13.42-13.45

and split it up in an interesting way 

并将其功能以某种我们感兴趣的方式进行拆分

13.45-13.47

so we need to know sort of what it but it is a database does 

So，我们得需要知道数据库做了哪些事情

13.47-13.50

so we can understand how they split it up 

So，这样我们就能理解他们是如何拆分的

13.50-13.54

so this is really a kind of database tutorial 

So，明明是讲分布式系统，我居然还得给你们讲数据库

13.54-14.05

really focusing on what it takes to implement transactions crashed recoverable transactions

我要讲的重点是它如何实现能从崩溃中恢复的事务


14.05-14.11

 so what I really care about is transactions and crash recovery 

So，我真正在意的是事务和崩溃恢复

14.11-14.17

and there's a lot else going on in databases

在数据库中还有许多其他方面的内容（知秋注：可以去看simviso翻译的CMU 15-445数据库导论）

14.17-14.19

but this is really the part that matters for this paper

但这两部分才是该paper中的重点

14.19-14.23

 so first what's a transaction 

So，首先什么是事务

14.23-14.28

you know transaction is just a way of wrapping multiple operations on maybe different pieces of data 

事务其实是一种方式，它将在不同部分的数据之上所进行的多个操作进行包装

14.28-14.37

and declare that's entire sequence of operations should appear Atomic to anyone else who's reading or writing the data

并声明，对于所有正在读取或写入数据的人来说，这整个操作序列都应该具备原子性

14.37-14.43

so you might see supposing we're running a bank and we want to do transfers between different accounts 

So，假设我们经营了一家银行，我们想在不同的账户间进行转账


14.43-14.50

maybe you would say well we would see code or you know see a transaction looks like this is

你们所看到的事务可能是这样的

14.50-14.55

you have to declare the beginning of the sequence of instructions that you want to be atomic in transaction

你得在事务开头声明你想执行的原子性指令序列

14.55-15.00

 maybe we're going to transfer money from account Y to account X 

可能我们想从账户Y转钱到账户X

15.00-15.06

so we might see where I'll just pretend X is a bank balance store in the database

So，这里我用X代表数据库中账户X的存款余额


15.06-15.09

 you might see the transaction looks like oh can I add $10 to X's account

你们可能看到的事务是这样的，我要往账户X中转$10


15.09-15.14

 and deduct the same ten dollars from Y account

并从账户Y中减去$10

15.14-15.17

 and that's the end of the transaction

然后，我们的事务就结束了

15.17-15.25

I want the database to just do them both without allowing anybody else to sneak in and see the state between these two statements 

在不允许其他人介入并查看这两个语句之间状态的情况下，我想让数据库去执行这两个操作

15.25-15.27

and also with respect to crashes 

同样，对于崩溃这方面


15.27-15.30

if there's a crash at this point somewhere in here

如果在这里某处发生了崩溃

15.30-15.33

we're going to make sure that after the crash and recovery that 

我们得确保，在发生崩溃和恢复后

15.33-15.38

either the entire transactions worth the modifications are visible or none of them are 

整个事务和修改都是可见的，或者就是没有被修改成功

15.38-15.41

so that's the effect we want from transactions 

So，这就是我们希望事务所做到的效果

15.41-15.53

there's additionally people expect database users expect that the database will tell them tell the client that submitted the transaction whether the transaction really finished and committed or not 

此外，数据库用户希望数据库会告诉提交该事务的client，该事务是否已经结束，或者是否被提交了

15.53-15.54

and if a transaction is committed

如果一个事务被提交了

15.54-15.59

 we expect clients expect that the transaction will be permanent will be durable

我们希望该事务被持久化了

15.59-16.02

 still there even if the database should crash and reboot 

即使数据库崩溃重启了，它也依然在那里

16.02-16.06

um one thing it's a bit important is that

其中一件重要的事情就是

16.06-16.09

 the usual way these are implemented is that

通常的实现方式是

16.09-16.13

the transaction locks each piece of data before it uses it 

事务在使用数据前，会将这段数据锁定

16.13-16.16

so you can view 

So，你们可以看到


16.16-16.21

the they're being locks x and y for the duration of the transaction

在事务执行期间，它们会锁定X和Y

16.21-16.28

 and these are only released after the transaction finally commits that is known to be permanent 

只有当事务被提交后，这些锁才会被释放，这就是我们所知道的永久性

16.28-16.29

this is important

这些很重要

16.29-16.41

 if you for some of the things that you have to if you some of the details in the paper really only makes sense if you realize that the database is actually locking out other access to the data during the life of a transaction 

如果你意识到这个，paper中的某些细节才会有意义。即在事务执行期间，实际上数据库会阻止其他人对数据进行访问

16.41-16.44

so how this actually implemented

So，这实际上该如何实现呢？

16.44-16.45

 it turns out

事实证明

16.45-16.54

the database consists of at least for the simple database model 

对于一个简单的数据库模型来说

16.54-16.59

where the databases are typically written to run on a single server with you know some storage directly attached

数据库通常是运行在一个直接挂载了存储设备的单台服务器上的

16.59-17.01

 and a game that the Aurora paper is playing is 

Aurora paper中所玩的一个把戏是

17.01-17.08

sort of moving that software only modestly revised in order to run on a much more complex network system

他们对软件进行了适当的修改，以便在更复杂的网络系统上运行


17.08-17.14

 but the starting point is we just assume we have a database with a attached to a disk 

但在一开始，我们假设我们有一个挂载了磁盘的数据库

17.14-17.23

the on disk structure that stores these records is some kind of indexing structure like a b-tree maybe

我们在磁盘上使用了某种索引结构来存储这些记录，比如：B-Tree

17.23-17.32

 so there's a sort of pages with the paper calls data pages that holds us you know real data of the of the database 

So，这里我们使用page来保存数据库中的数据，这些page在paper中被称为data page


17.32-17.35

you know maybe this is X balances and this is Y balance

这里是X的账户存款，旁边是Y的账户存款

17.35-17.38

 these data pages typically hold lots and lots of records

这些data page通常会保存很多很多的记录

17.38-17.45

whereas X and y are typically just a couple bytes on some page in the database 

X和Y的记录通常只是占了数据库中某个page上的几个byte大小的空间而已

17.45-17.55

so on the disk  there's the actual data plus on the disk there's also a write ahead log  or wal 

So，在磁盘上保存了实际的数据以及预写式日志（WAL）

17.55-18.01

and the write ahead logs are a critical part of why the system is gonna be fault tolerant 

预写式日志（WAL）是让该系统实现容错能力的关键部分

18.01-18.03

inside the database server

在数据库服务器内部

18.03-18.04

there's the database software

有一个数据库软件

18.04-18.12

 the database typically has a cache of pages that it's read from the disk  that it's recently used

数据库里通常保存了它从磁盘中读取到的page缓存，这些page是它最近所用到的

18.12-18.14

 when you execute a transaction

当你执行一个事务的时候


18.14-18.16

 what that actually executes these statements 

实际上，我们执行的是这些语句

18.16-18.17

what that really means is 

这意味着

18.17-18.19

you know what x equals x plus 10

比如这里的X=X+10

18.19-18.21

turns into the runtime is 

在运行的时候就会是这样

18.21-18.27

that the database reads the current page holding X from the disk  and adds 10 to it 

数据库从磁盘中读取当前保存X的那个page，并往X的记录中加10

18.27-18.30

but so far until the transaction commits

但直到事务提交前

18.30-18.33

it only makes the modifications in the local cache not on the disk 

它只会对本地缓存中的数据进行修改，而不是磁盘中的数据

18.33-18.36

because we don't want to expose we don't want to write on the disk yet 

因为我们现在还不想将数据写到磁盘上

18.36-18.39

and the part possibly expose a partial transaction

这就可能暴露部分事务

这部分就可能需要对外暴露出一个事务设定（知秋注：在执行出现异常的时候方便日志回滚到该事务声明位置处）

18.39-18.50

so while then when the database but before because the database wants to sort of predeclare the complete transaction

因为数据库想要预先声明这个完整的事务

18.50-18.55

so it's available to the software after a crash and during recovery 

So，在发生崩溃后，和恢复的期间，这个事务是对软件可见的

18.55-18.59

before the database is allowed to modify the real data pages on disk

在我们允许数据库去修改磁盘上真正的data page之前



18.59-19.01

 its first required to add log entries 

它首先得需要去为日志添加条目

19.01-19.05

that describe the transaction

这些日志条目用来描述事务

19.05-19.07

 so it has to in order before it can commit the transaction

So，在数据库可以提交事务前

19.07-19.12

 it needs to put a complete set of log ahead entries in the write ahead log on disk

它需要在磁盘上的WAL（预写式日志）中放入一组完整的预写日志条目

19.12-19.14

I'm describing all the databases modification

我描述了这里所发生的数据库修改方面的东西


19.14-19.16

 so let's suppose here that

So，假设这里

19.16-19.23

 x and y start out as say 500 and y starts out as 750 

X的帐户余额为500，Y的账户余额则为750

19.16-19.25

and we want to execute this transaction

并且我们想去执行这个事务

19.25-19.29

 before committing and before writing the pages 

在提交这个事务和写入数据前

19.29-19.32

the database is going to add at least typically 3 log records 

数据库通常至少会添加3个日志条目


19.32-19.40

1 this that says well as part of this transaction， I'm modifying X and it's old value is 500 

我会在该事务的其中一部分里面，我要去修改X的值，它原来的值是500

19.40-19.44

make more room here

这里我多画点格子

19.44-19.49

 this is the on disk log 

这是磁盘上的日志

19.49-19.51

so each log entry might say 

So，每个日志条目会说

19.51-19.53

here's the value I'm modifying

这里是我要更新的值

19.53-19.56

 here's the old value  and we're adding

这里是我们原来的值，我们要往它里面加10


19.556-19.59

  and here's the new value say five ten

这里是新的值，即510

19.59-20.01

 so that's one log record 

So，这就是一个日志条目

20.01-20.02

another for y

另一个是Y的日志条目

20.02-20.04

may be old value is 750

它原来的值是750

20.04-20.06

 we're subtracting 10 

我们减掉10


20.06-20.08

so the new value is 740

So，新的值就是740

20.08-20.14

and then when the database if it actually manages to get to the end of the transaction before crashing

实际上，如果数据库在发生崩溃前执行完了这个事务

20.14-20.15

 its gonna write a commit record 

它就会去写入一个提交记录

20.15-20.22

saying and typically these are all tagged with some sort with a transaction ID

通常这些日志条目上会标记一个事务id

20.22-20.29

so that the recovery software eventually will know how this commit record refers to these log records

So，恢复软件最终就会知道这个提交记录指向的是这些日志条目

20.29-20.30

 yes

请问


20.37-20.41

in a simple database will be enough to just store the new values 

在一个简单的数据库中，它有足够的空间来存储这些新的值

20.41-20.42

and say well if it is a crash 

如果这里有一个崩溃发生

20.42-20.45

we're gonna just reapply all the new values

我们就会重新提交所有这些新的值

20.45-20.51

 the reason most serious databases store the old as well as a new value is 

数据库存储这些旧值和新值的最重要的原因是

20.51-20.54

to give them freedom to



464

00:20:52,380 --> 00:20:56,230

20.57-20.57

 even for a long-running traction for a long-running transaction

对于一个长事务来说

20.57-20.59

 even before the transaction is finished

在这个事务结束前


20.59-21.05

it gives the database the freedom to write the updated page to disk with the new value 740

它使数据库可以自由地去更新page（视频中所画那个方格所在的page），即将新值740写入磁盘（知秋注：以日志的方式写入磁盘）

21.05-21.12

let's say  from an uncompleted transaction as long as it's written the log record to disk 

也就是说，对于一个未完成的事务来说，只是将日志记录落地到磁盘

21.12-21.13

and then if there's a crash  before the commit 

接着，如果在提交前发生了崩溃

21.13-21.15

the recovery software always say aha well

恢复软件就会说







五十九  阅举报
10-02
21.15-21.18

this transaction never finished

当该事务出现异常永远完不成的时候

21.15-21.19

therefore we have to undo all of its changes

因此，我们得撤销它所有的修改

21.19-21.26

 and these values these old values are the values you need in order to undo a transaction  that's been partially written to the data pages

这些旧值是我们进行事务撤销时要对data page已写入部分进行撤销的相关数据

撤消已部分写入data page的事务时所需的值

21.26-21.37

 so the aurora indeed uses undo redo logging to be able to undo partially applied transactions

So，Aurora使用这种撤销重做日志的方式来做到撤销部分应用的事务所带来的修改

21.37-21.39

 okay 



21.39-21.44

so if the database managers get as far as getting the transactions log records on the disk 

So，如果数据库管理器能最大限度地获取磁盘上的事务日志记录

21.44-21.46

and the commit record marking is finished

同时获取到这个提交记录（commit record）的标志，意味着事务结束了

21.46-21.51

then it is entitled to apply to the client we said the transactions committed 

那么它就有权告诉client，该事务已经被提交了

21.51-21.52

the database can reply to the client 

数据库可以对client进行回复

21.52-21.57

and the client can be assured that its transaction will be sort of visible forever

Client可以放心，它的事务将永远可见

21.57-22.00

and now one of two things happens 

这里发生的一件事情是

22.00-22.02

the database server doesn't crash

如果数据库并没有崩溃

22.02-22.12

 then eventually so it's modified in its cache these these X&Y records to be 510 and 740

那么它就会将它缓存中X和Y进行落地修改

22.12-22.21

 eventually the database will write it's cached updated blocks to their real places on the disk over writing you know these B-tree nodes or something

最终，数据库会将这些数据修改更新到它的缓存、磁盘对应的Block以及B-Tree节点之类的地方之上


22.21-22.24

and then the database can reuse this part of the log

那么，数据库就可以复用这部分日志

22.24-22.28

so databases tend to be lazy about that 

So，数据库对这方面就比较懒（迟延）

22.28-22.33

because they like to accumulate you know maybe there'll be many updates to these pages in the cache

因为它们总想将对这些page所进行的许多更新都累积在缓存中

22.33-22.38

it's nice to accumulate a lot of updates before being forced to write the disk 

如果能在数据被强制写入磁盘前，我们积累了大量的更新，那么这就会很nice

22.38-22.43

if the database server crashes before writing these pages to the disk

如果数据库服务器在将这些page写入到磁盘前崩溃了


22.43-22.45

 so they still have their old values 

So，磁盘上保存的还是老的值

22.45-22.48

then it's guaranteed that 

那么这就保证了


22.48-22.53

the recovery software when you restart that database scan the log 

当你重启数据库时，恢复软件就会扫描日志

22.53-22.54

see these records for the transaction

它会看到这些事务相关的记录

22.54-22.56

 see that that transaction was committed 

它会看到事务中这条提交记录

22.56-23.03

and apply the new values to the to the stored data

并将新的值覆写到保存的数据中

23.03-23.06

and that's called a redo

这就叫做重做

23.06-23.09

it basically reads all the writes in the transaction

简单来讲，它就是去读取该事务中所有写操作

23.09-23.17

so that's how transactional databases work in a nutshell 

So，总而言之，这就是事务型数据库的工作方式

23.17-23.26

and so this is a sort of very extremely abbreviated version of how for example the MySQL database works 

So，这就是一个超简略版MySQL这类数据库的工作方式

23.26-23.32

that an Aurora is based on this open source software thing called database called MySQL

Aurora是基于开源的MySQL所做出来的

23.32-23.36

which does crash recovery transaction and crash recovery in much this way

并且，它使用的就是我们所说的这种崩溃恢复事务

==========================================================





23.36-23.51

 ok so the next step in Amazon's development a better and better database infrastructure for its cloud customers is something called RDS 

So，Amazon的下一步发展就是为它的云客户提供更好的数据库基础架构平台，于是它推出了RDS

23.51-23.54

and I'm only talking about RDS

这里我只讨论RDS

23.54-23.55

because it turns out

事实证明

23.55-23.59

that even though the paper doesn't quite mention it

虽然paper里面并没有怎么提到这个

23.59-24.00

figure 2 in the paper is basically a description of RDS

基本上来讲，paper中的figure 2描述的就是RDS

24.00-24.02

 so what's going on

So，这里面发生了什么呢

24.02-24.09

and RDS is that it was a first attempt to get a database that was replicated in multiple availability zones 

RDS就是Amazon所做的第一次尝试，它将一个数据库复制到多个可用地区，以供使用

24.09-24.11

so that if an entire data center went down 

So，如果一整个数据中心出现问题挂掉了

24.11-24.16

you could get back your database contents without missing any writes 

在不丢失任何写入操作的情况下，你也可以拿到你整个数据库的内容

24.16-24.20

 so that deal with RDS is that

So，RDS的工作方式是


24.20-24.22

 there's one you have one ec2 instance 

这里我们有一个EC2实例

24.22-24.24

that's the database server

它是一个数据库服务器

24.24-24.26

you just have one you just want to running one database

这里我们只想去运行一个数据库

24.26-24.35

 it stores its data pages and log  just basically with this instead of on the local disk  its stores them in EBS 

它将它的data page和日志保存在EBS中，而不是本地磁盘中

24.35-24.38

so whenever the database does a log write or page write or whatever 

So，当数据库要进行一次日志写入，或者对page进行写入之类的操作


24.38-24.48

those writes actually go to these two EBS volumes  EBS replicas

实际上，这些写操作会进入这两个EBS volumn中，也就是这两个EBS replica中


24.48-24.52

in addition so and so this is in one availability zone 

So，这就是一个可用区域

24.52-24.56

in addition for every write that the database software does

此外，对于数据库软件所做的每个写操作来说

24.56-25.08

Amazon would transparently without the database even realizing necessarily this was happened  also send those writes to a special setup in a second availability zone in a second machine room 

在数据库没有意识到这些写操作发生的情况下，Amazon会透明地将这些写操作发送到第二个机房中的第二个可用区域里的一个特定设备中

25.08-25.16

- just going from figure 2 to apparently a separate computer or ec2 instance or something 

根据figure 2上讲的那样，显然，Amazon会将这些写操作传到一个单独的机器中，比如：EC2实例之类的东西

25.16-25.21

whose job was just a mirror writes that the main database did 

它的职责就是复制主数据库中所做的那些写操作


25.21-25.28

so this other sort of mirroring server would then just copy these writes to a second pair of EBS servers 

这个镜像服务器会将这些写操作复制到第二组EBS服务器上

25.28-25.35

and so with this set up with this RDS set up and that's what figure 2

So，这就是Figure 2中所说的RDS设置

25.35-25.39

 every time the database appends to the log or writes to one of its pages

每当数据库要对日志进行追加或者对其中一个page进行写入


25.39-25.44

 it has to the data has to be sent to these two replicas

数据得发送到这两个replica中

25.44-25.52

 has to be sent on the network connection across the other availability zone on the other side of town  sent to this mirroring server 

还得通过网络连接发送到另一个镇上的可用区域中的镜像服务器中

25.52-25.56

which would then send it to it's two separate EBS replicas 

然后这个镜像服务器将这些写操作再发送给它的两个EBS replica

25.56-25.57

and then finally

接着，最后


25.57* 26。01

 this reply would come back and then only then with the write be finished 

镜像服务器就会回复这个服务器，只有到了这个时候，这个写操作才算是完成

26.01-26.04

with a database see aha my writes finished

数据库就会看到，Aha，我的写操作完成了

26.04-26.09

 I can you know count this log record it was really being appendage of the log or whatever

于是我就知道这段日志条目确实是日志中的附属内容（知秋注：即板上钉钉的日志内容了，相当于事务提交了，相当于将这一系列操作以事务的方式组织起来的）

26.09-26.14

so this RDS arrangement gets you betcha better fault tolerance

So，这种RDS的安排方式能让我们获得更好的容错能力

26.14-26.17

 because now you have a complete up-to-date copy of the database 

因为我们现在就拥有了一个完整的最新的数据库备份了

26.17-26.21

like seeing them all the very latest writes in a separate availability zone

那么我们就可以在一个单独的可用区域看到所有这些最新的写操作了

26.21-26.25

 even if you know fire burns down this entire data center boom 

即使这整个数据中心因为火灾炸了

26.25-26.33

you can weaken you can run the database in a new instance in the second availability zone and lose no data at all

你可以在第二个可用区域里的一个新实例上运行数据库，并且根本不会丢任何数据

26.33-26.34

 yes

请问

26.46-26.49

um I don't know how to answer that

我不知道该如何回答这点

26.49-26.51

 I mean that is just not what they do

我的意思是，这并不是它们要做的事情

26.51-26.52

 and my guess is that

我的猜测是这样的

26.52-27.01

it would be that for most EBS customers it would be too painfully slow to forward every write across two separate data center

对于大多数EBS用户来说，将每个写请求在两个数据中心间进行转发，速度实在是太慢了

27.01-27.03

I'm not really sure what's going on

我并不确定这里会发生什么

27.03-27.06

but I think the main answers they don't do that

但我觉得答案是，他们不会选择这种方案

27.06-27.18

 and this is sort of a a little bit of a workaround for the way EBS works too kind of tricky EBS and actually producing and sort of using the existing EBS infrastructure unchanged

这对于EBS的工作方式来说有点棘手。实际上，在不更改现有EBS基础架构的情况下，进行生产和使用，那就很困难

27.18-27.21

 I still want to  chose

我依然想选择这个来讲

27.21-27.25

 this turns out to be extremely expensive 

这种做法要付出的代价非常昂贵

27.25-27.29

or anyway it's expensive as you might think

总之，你们可能会觉得这样做要付出的代价很高

27.29-27.32

you know we're writing fairly large volumes of data

你知道的，我们要写入大量的数据


27.32-27.38

 because you know even this transaction which seems like it just modifies two integers

因为即使这个事务看起来只需要修改两个数字就完了

27.38-27.41

 like maybe eight bytes or I don't know what sixteen who knows 

它们可能就8 byte或16byte左右

27.41-27.47

only a few bytes of data are being modified here  what that translates to as far as the database reading and writing the disk is 

此处只有一点点数据要被修改，这相当于只是数据库读写磁盘的程度



27.47-27.51

actually these log records are that also quite small 

实际上这些日志记录的体积也相当小

27.51-27.54

so this these two log records might themself only be dozens of bytes long

So，这俩日志记录可能就只有几十个byte大小

27.54-27.55

so that's nice

So，这就很nice

27.55-28.02

but the reads and writes of the actual data pages are likely to be much much larger than just a couple of dozen bytes 

但对这些data page的读写操作要远比几十个byte大得多

28.02-28.10

because each of these pages is going to be you know eight kilobytes or 16 kilobytes or some relatively large number the file system or disk block size 

因为文件系统或磁盘区块中每个page的大小可能是8kb或16kb这种数字比较大的体积

28.10-28.19

and it means that just to read and write these two numbers when it comes time to update the data pages

这意味着，当我们对这两个数字进行读写来更新这个data page时

28.19-28.23

 there's a lot of data being pushed around on to the disk 

那么我们就得将很多数据推到本地磁盘上

28.23-28.24

a locally attached disk  now it's reasonably fast 

本地连接的磁盘速度应该相当快

28.24-28.37

but I guess what they found is when they start sending those big 8 kilobyte writes across the network that used up too much network capacity to be supported

但我猜他们有发现，当他们通过网络发送大量的8kb大小的写入数据，它们占据了太多的网络容量，这也就无法支持做到这点

28.37-28.44

 and so this arrangement this figure 2 arrangement evidently was too slow 

So，Figure 2中的这种方式显然太慢了



28.44 - 28.45

yes

请问


28.51 - 28.56

so in this figure 2 set up

So，在Figure 2所展示的这种情况下

28.56-28.59

 the you know unknown to the database server 

在不了解数据库服务器的情况下

28.59-29.07

every time it called write rotated its EBS disk a copy of every write went over across availabilities zones  

每次当数据库服务器调用write操作的时候，它会通过网络将每个写请求发送给这些可用区域的服务器

29.07-29.12

and had to was written to the both of these EBS servers

它得将这两个写请求发给这两个EBS服务器




29.11-29.13

 and then acknowledged 

然后，进行确认

29.13-29.17

and only then did the write appear to complete to the database 

只有这样，对于数据库来说，这个写操作才算完成

29.17-29.25

so I really had to wait for all the fall for copies to be updated  and for the data to be sent on the link across to the other availability zone 

So，对于这个写操作的完成，我得等到所有的副本都被更新完毕，以及所有的数据都通过网络发送给其他可用地区才算结束


29.25-29.35

and you know as far as table one it's concerned that first performance table 

就Table 1而言，它是文中第一个关于性能对比方面的表格

29.35-29.46

the reason why the slow the mirrored MySQL line is much much slower than the Aurora line is

Mirrored MySQL比Aurora with Replicas这一行慢很多的原因是

29.46-29.52

 basically that it sends huge amounts of data over these relatively slow Network links

简单来讲，Mirrored MySQL通过相对很慢的网络发送了海量的数据

29.52-29.55

and that was the problem that was the performance problem they're really trying to fix 

这就是他们所试着解决的性能问题

29.55-29.57

so this is good for fault tolerance

So，对于容错来说，这很好

29.57-30.00

because now we have a second copy and another availability zone 

因为我们有第二个副本以及另一个可用地区

30.00-30.03

but it was bad news for performance

但对于性能来说，这是个糟糕的消息

30.03-30.04

 all right



30.04-30.10

the way Aurora and the next step after this is Aurora and to set up there

Aurora接下来所做的事情是

30.10-30.15

 the high level view is we still have a database server

从一个高级层面来看，我们这里依然有一个数据库服务器

30.15-30.21

although now it's running custom software that Amazon supplies 

虽然它上面运行的是Amazon所提供的定制化软件

30.21-30.23

so I can rent an Aurora server from Amazon 

So，我可以从Amazon那里租一个Aurora服务器

30.23-30.26

but it's not I'm not running my software on it

我并没有在服务器上面运行我的软件

30.26-30.31

 I'm renting a server running Amazon's Aurora database software on it

我租了一个服务器，上面运行着Amazon的Aurora数据库软件

30.31-30.34

rent an Aurora database server from them

我们从Amazon处租了一个Aurora数据库服务器

30.34-30.37

and it's just one instance 

它只是一个实例

30.37-30.40

it sits in some availability zone

它位于某个可用区域

30.40-30.47

 and there's two interesting things about the way it's set up 

在这种设置中，有两点我们很感兴趣

30.47-30.48

first of all is that

首先

30.48-30.58

 the data you know it's replacement basically for EBS involves six replicas now

简单来讲，我们通过6个replica来替换EBS中的数据

30.58-31.12

2 in each of three availability zones for super fault tolerance

为了具备超强的容错能力，我们有3个可用区域，每个区域中有2个replica

31.12-31.15

 and so every time the database complicated we'll talk

So，每当我们讨论复杂的数据库时

31.15-31.16

but basically when the database writes or reads

但简单来讲，当数据库进行读或者写的时候

31.16-31.17

 when the database writes 

当数据库进行写操作的时候

31.17-31.23

it's we're not sure exactly how its managed

我们不清楚它具体是如何管理这些写操作的

31.23-31.29

but it more or less needs to send a write one way or another writes have to get sent to all six of these replicas

但总之它得通过某种方式发送写请求，并且得将这些写请求发送到这6个replica中

31.29-31.33

the key to making

做到这点的关键是

31.33-31.34

 and so this looks like more replicas 

So，这看起来有很多replica


31.34-31.36

gosh you know why isn't it slower

你们知道为什么这种做法的速度并不慢吗？


31.36-31.39

 why isn't it slower than this previous scheme which only had four replicas

为什么它要比前一个例子中使用了4个replica的方案来得更快呢？

31.39-31.41

 and the answer to that is that

对此，答案是



31.41-31.45

what's being the only thing being written over the network is the log records 

因为这里通过网络传输的只是这些日志记录

31.45-31.48

so that's really the key to success

So，我们成功的关键是

31.48-31.57

 is that the data that goes over these links send to the replicas it's just the log records log entries

我们通过线路所发送的数据其实就是这些日志记录，或者说日志条目


32.00-32.00

and as you can see 

正如你们所看到的


32.00-32.05

you know a log entry here you know at least and this is a simple example now

正如这个简单例子中的日志条目那样

32.05-32.06

 it's not quite this small

它不一定有这么小

32.06-32.14

 but it's really not vastly more than a couple of dozen bytes needed to store the old value and the new value for the piece of data we're writing

但实际上，对于我们所写入得这段数据而言，我们所存储的旧值和新值的大小不超过几十个byte

32.14-32.16

 so the log entries tend to be quite small

So，日志条目就会变得相当小

32.16-32.22

whereas when the database you know we had a database that thought it was writing a local disk 

假设我们有一个数据库，它是往本地磁盘上去写数据的

32.22-32.24

and it was updating its data pages

当它正在更新它的data page时

32.24-32.25

these tended to be enormous

这些page的大小是很大的

32.25-32.28

 like doesn't really say in the paper 

虽然paper中并没有说到这个

32.28-32.30

I don't think that eight kilobytes or more 

但我觉得应该有8kb甚至更大

32.30-32.37

so this set up here was sending for each transaction was sending multiple 8 kilobyte pages across to the replicas 

So，对于每个事务来说，这种方式所做的就是，发送多个8kb大小的page给这些replica


32.37-32.41

whereas this set up is just sending these small log entries to more replicas 

然而，这种方式所做的，是将这些体积很小的日志条目发送给更多的replica



32.41 - 32.45

but the log entries are so very much smaller than 8k pages 

比起8kb大小的page来说，日志条目的体积要小太多了

32.45-32.47

that it's a net performance win 

在网络性能上就彻底碾压前者了

32.47-32.57

okay so that's one this is like one of their big insights is just in the log entries

So，使用这种日志条目的方式就是他们其中一个重要见解

32.57-33.00

of course a fallout from this is

Of course，使用这种方式的一个后果就是

33.00-33.02

that their storage system is now not very general purpose

他们的存储系统并不具备通用性

33.02-33.08

 this is a storage system that understands what to do with MySQL log entries

该系统知道该如何处理MySQL的日志条目

33.08-

 right it's not just you know



731

33.09 - 33.11

EBS was a very general purpose

EBS具有很高的通用性

33.11-33.13

 just emulated to disk

它会模拟成磁盘

33.13-33.14

 you read and write blocks

你可以对里面的block进行读写

33.14-33.16

 doesn't understand anything about anything except for blocks

除了block以外，你不用去理解任何其他东西

33.16-33.21

this is a storage system that really understands that it's sitting underneath the database

这是一个位于数据库之下的存储系统

33.21-33.29

 so that's one thing they've done is ditched general-purpose storage and switched to a very application specific storage system

So，他们所做的一件事情就是，放弃通用存储系统，并切换到针对应用程序的存储系统

33.29-33.35

the other big thing I'll also go into in more detail is 

我要深入讲解的另一件事情是


33.35-33.44

that they don't require that the writes be acknowledged by all six replicas in order for the database server to continue

为了让数据库继续处理，它们并不需要让所有这6个replica都去确认所有这些写请求

33.44-33.46

 instead

相反

33.46-33.50

 the database server can continue as long as a QUORUM

只要有Quorum（达到法定确认人数），数据库服务器就可以继续运行

33.50-33.54

and which turns out to be 4 as long as any four of these servers responds 

事实证明，只要其中任意4个replica对这些写请求进行响应，数据库就可以继续运行

33.54-34.06！！！！

so if one of these availability zones is offline or maybe the network connection to it is slow or maybe even just these servers just happen to be slow doing something else at the moment we're trying to write

So，如果其中一个可用区域掉线了，或者网络连接速度很慢，或者在我们试着去进行写入操作的时候，服务器在做其他事情，导致速度变慢



34.06 - 34.15

 the database server can basically ignore the two slowest or the two most dead of the server's when it's doing it write

简单来讲，在数据库处理写操作的时候，它可以忽略两个最慢的或者基本死掉的服务器

34.15-34.18

so it only requires acknowledgments from any four out of six

So，它只需要收到6个replica中4个的确认就行了

34.18-34.19

and then it can continue

接着，它就可以继续下去

34.19-34.35

 and so this quorum scheme is the other big trick they use to help them have more replicas in more availability zones  and yet not pay a huge performance penalty 

So，这种Quorum方案就是他们所使用的另一个技巧，可以帮助他们在更多的可用区域中使用更多的replica，并且不用牺牲太多的性能

34.35-34.37

because they never have to wait for all of them

因为他们永远不需要去等待所有的replica对他们进行响应

34.37-34.40

just the four fastest of the six replicas 

只要6个replica中有4个速度最快的replica进行响应就行了

34.40-34.51

so the rest of the lecture is gonna be explaining first quorums and then log entries and then this idea of just sending log entries basically

So，在这节课剩下的时间里我会先去解释Quorum，接着是日志条目，然后简单讲下发送日志条目的思路


34.51-34.54

 table one summarizes the result

Table 1总结了Aurora和MySQL在性能上的比较结果

34.54-35.05

 if you look at table one by switching from this architecture in which they send the big data pages to four places to this Aurora schema sending just the log entries to six replicas

通过Table 1中Mirrored MySQL（将多个大的 data page发送到四个EBS服务器中）与Aurora with Replica（将多个log entries发送到6个replica中）之间的对比


35.05-35.17

 they get a amazing 35 times performance increase over some other system，you know this system over here but by playing these two tricks

通过使用这两种技巧，与其他系统相比（左边这种，即Mirrored MySQL），Aurora with replicas这种方案在性能上惊人地提升了35倍



35.17-35.24

 and paper is not very good about explaining how much of the performance is due to quorums and how much is due to just sending log entries

这篇paper并没有解释清楚，在使用了Quorum和发送日志条目这两种方式后，系统的性能分别提升了多少

35.24-35.32

 but anyway you slice it 35 times improvement performance is very respectable

但总之，这种性能上35倍的提升还是非常可观的

35.32-35.35

 and of course extremely valuable to their customers and to them

Of course，对于他们的客户和他们自身来说，非常有价值

35.35-35.40

and it's like transformative I am sure for many of Amazon's customers 

我敢肯定的是，对于许多Amazon的客户来说，这是非常具有变革性的

35.40-35.43

all right



35.43-35.51

okay so the first thing I want to talk about in in detail is their quorum arrangement 

Ok，首先我想深入谈论的就是他们的Quorum机制

35.51-35.53

what they actually mean by quorums 

Quorum是什么意思呢

35.53-35.54

so first of all

So，首先


35.54-36.00

 the quorums is all about the arrangement of this fault-tolerant storage

Quorum用于对这种具备容错能力的存储设备的安排

36.00-36.06

 so it's worth thinking a little bit about what their fault tolerance goals were

So，对于他们的容错目标是什么，这一点还是值得思考的

36.06-36.13

 so this is like fault tolerance goals 

So，我们来讲下他们的容错目标

36.13-36.23

they wanted to be able to do writes even if one reads， and writes even if one availability zone was completely dead

他们想要做到的是，即使在读取的时候，也能进行写入操作。或者即使一个可用地区彻底不可用了，他们也能进行写入操作


36.23-36.33

 so they're gonna write you know even with one dead AZ

So，他们想要在即使一个可用地区彻底挂掉的情况下，他们也想进行写入操作

36.33-36.44

they are able to read even if there was one dead availability zone plus one other dead server 

在一个可用地区挂掉加上另一台服务器也挂掉的情况下，他们也能够去读取数据

36.44-36.47

and the reason for this is

这样做的原因是

36.47-36.54

 that an availability zone might be offline for quite a while  because maybe it's you know was suffered from a flood or something 

因为一个可用地区可能由于洪水之类的问题，它会掉线一会儿

36.54-36.57

and while it's down for a couple of days or a week or something

它可能会故障个几天，几周，这段时间它就是不可用的

36.57-36.59

well people prepare the damage from the flood

Well，人们会为洪水之类导致事故所做好准备

36.59-37.03

 we're now reliant on just you know the servers and the other two availability zones

现在，我们仅依靠的是这些服务器和其他两个可用地区


37.03-37.04

 if one of them should go down

如果其中一个可用地区挂掉了

37.04-37.06

 we still we don't want it to be a disaster

我们不想这成为一种灾难

37.06-37.12

so they're going to be able to write with one even with one dead availability zone 

So，即使有一个可用区域挂掉的情况下，他们也能够进行写入操作


37.12-37.20

they furthermore they wanted to be able to read with one dead availability zone plus one other dead server 

此外，在一个可用区域和另一个服务器都挂掉的情况下，他们也想能够去进行读取

37.20-37.31

so they wanted to be able to still read you know and get the correct data even if there was one dead availability zone plus one other server and the live availability zones were dead 

So，即使在一个可用区域和另一个服务器挂掉的情况下，他们仍然想要进行读取并获得正确的数据

37.31-37.39

so you know they we have to sort of take it for granted that they know what their they know their own business

So，你知道的，他们自己当然清楚自己的业务


37.39-37.44

and that this is really you know kind of a sweet spot for how fault-tolerant you want to be

这些确实是我们想要做到容错的最佳方案

37.44-37.47

 um and in addition

此外

37.47-37.53

 I already mentioned they want to be able to tolerant to this write out temporarily slow replicas 

我已经提到过，我们可以容忍有两个速度比较慢的replica临时不能用

37.53-37.59

I think from a lot of sources it's clear that

从一大堆资料来看

37.59-38.01

 the if you read and write EBS for example

例如，如果你对EBS进行读写操作

38.01-38.04

you don't get consistently high performance all the time

你不会一直获得始终如一的高性能

38.04-38.05

 sometimes there's little glitches

有时你还会遇到一些小故障

38.05-38.07

 because maybe some part of the network is overloaded 

比如某部分网络过载

38.07-38.10

or something is doing a software upgrade or whatever 

或者遇上了软件升级之类的事情

38.10-38.11

and it's temporarily slow 

这就会让速度临时变慢

38.11-38.27

so they want to be able to just keep going despite transiently slow or maybe briefly unavailable storage servers 

So，即使在存储服务器变慢或者暂时不可用的情况下，他们希望服务也依然能够继续运行

38.27-38.29

and a final requirement is

最后一个需求就是

38.29-38.32

 that if something if a storage server should fail

如果一个存储服务器会发生故障

38.22-38.40

it's a bit of a race against time  before the next storage server fails sort of always the case 

在下一个存储服务器出现故障前，我们需要和时间赛跑

38.40-38.44

and it's not the statistics are not as favorable as you might hope

数据可能不如你所希望的那样

38.44-

because typically you buy basically



38.47-38.52

because server failure is often not independent 

因为通常服务器故障不是单独发生的

38.52-38.54

like the fact that one server is down 

比如，一台服务器挂掉了

38.54-38.56

often means that 

这通常意味着

38.56-39.00

there's a much increased probability that another one of your servers will soon go down

这会让你的另一台服务器很快就会出现故障的可能性大大增加

39.00-39.08

 because it's identical Hardware may be bought from the same company came off the same production line one after another 

因为它们是完全相同的硬件，可能是从同一个公司买来，而且是同一台生产线同一批次的产物

39.08-39.09

and so a flaw

So，这就是一个缺点

39.09-39.13

 and one of them is extremely likely to be reflected in a flaw and another one

 只要其中一个有缺陷，另一个也肯定有缺陷

39.13-39.15

 so people always nervous

So，人们对此总是很紧张

39.15-39.18

 off there's one failure boy there could be a second failure very soon

如果这里发生了一个故障，那么很快就会发生第二个故障

39.18-39.20

 and in a system like this

在这样的系统中

39.20-39.22

 well it turns out in these quorum systems  

事实证明，在Quorum系统中


39.22-39.26

you know you can only recover it's a little bit like raft 

它和Raft有点像

39.26-39.30

you can recover as long as not too many of the replicas fail

只要没有太多的replica出现故障，那么我们就可以恢复过来

 


39.31-39.36

so they really needed to have fast re-replication

So，它们真的需要这种快速重新复制（fast re-replication）的能力

39.36-39.38

 that is of one server seems permanently dead 

假设一个服务器看起来彻底死掉了

39.38-39.43

we'd like to be able to generate a new replica as fast as possible from the remaining replicas

我们希望能够通过剩下的replica来尽快生成一个新的replica

39.43-39.46

I mean a fast re-replication

我指的是快速重新复制（fast re-replication）的能力

39.46-39.51

these are the main fault tolerance goals the paper lays out 

这些就是paper所列出的主要的容错目标

39.51-39.55

and by the way

顺带说一下

39.55-39.58

this discussion is only about the storage servers

我这里的讨论只针对存储服务器

39.58-40.02

and you know what their failure character is how do you know the failures how to recover 

如果你知道它们的故障原因是什么，那么你就知道该如何恢复

40.02-40.07

and it's a completely separate topic what to do if the database server fails 

这是一个完全独立的主题，即如果服务器故障了，那我们该做什么

40.07-40.22

and Aurora has a totally different set of machinery for noticing a database servers fail creating a new instance running in a new database server on the new instance

Aurora具有一套完全不同的机制。当数据库服务器崩溃时，它会发出一个通知并创建一个新的实例，在其之上运行一个新的数据库服务器

40.22-40.26

 it's not what I'm talking about right now we'll talk about it a little bit later on 

这并不是我现在所讨论的东西，但我之后会去讨论它



40.26-40.33

right now it's just gonna build a storage system that's a lot that's where the storage system is fault tolerant

现在，我们要去构建一个具备容错能力的存储系统

40.33-40.36

 okay 





============================================================

40.36-0.38

so they use this idea called quorums

So，Amazon使用了一种叫做Quorum的思想

40.38-40.47

 and for a little while now I'm going to describe the sort of classic quorum idea 

 现在，我要去花点时间来描述下这种经典的Quorum思想

40.47-40.50

which is dates back to the late 70s

这还得从上世纪70年代末说起


40.50-40.55

 so this is quorum replicate quorum replication

So，我要讲的是Quorum replication

40.55-40.59

 I'm gonna describe to you this abstract quorum idea

我要向你们描述这种抽象的Quorum思想

40.59-41.05

 they use a variant of what I'm gonna explain

Amazon使用了一种Quorum的变体，这个我之后会讲

41.05-41.09

and the idea of behind quorum systems is to be able to build storage systems

我们可以通过Quorum系统背后的思想来构建存储系统

41.09-41.12

 that provide fault tolerance storage using replications

通过使用复制来为我们提供具备容错能力的存储系统

41.12-41.16

and guarantee that even if some of the replicas fail 

这就保证了，即使在某些replica出现故障的情况下

41.16-41.19

your that reads will still see the most recent writes 

你的读请求也能看到最近所写入的数据

41.19-41.27

and typically quorum systems are sort of simple readwrite systems put get systems 

通常来讲，Quorum系统是种简单的读写系统，或者说put/get系统

41.27-41.32

and they don't typically directly support more complex operations 

他们一般不支持那些较为复杂的操作

41.32-41.37

just you can read，you could have objects you can read an object or you can overwrite an entire object

假设你有一些对象，你可以对对象进行读取或者覆写整个对象


41.37-41.39

 and so the idea is you have n replicas

So，它的思路是，我们有n个replica

4146-41.50

 if you want to write or you have to get you have to in order to write

为了进行写入操作

41.50-41.53

 you have to make sure your write is acknowledged by W

你得确保你的写入被W个replica（W代表负责处理写操作的replica的数量）所确认了

41.53-41.55

 where W is less than n of the replicas 

W小于replica的数量n

41.55-42.04

so W write you have to send each write to these W are the replicas

你得将每个写请求发送给这W个replica

42.04-42.05

 and if you want to do a read 

如果你想做一次读请求

42.05-42.13

you have to get read information from at least R replicas

那你就得从这些R个replica中读取信息

42.16-42.19

925

00:42:14,949 --> 00:42:20,039

and so a typical setup 

So，这就是一个典型的设置

42.19-42.20

that's so well first of all 

Well，首先

42.21-42.24

the key thing here is 

这里的关键是

42.24-42.28

that W and R have to be set relative to n

此处的W和R的设置都与N相关







五十一  阅举报
10-03
42.28-42.39

so that any quorum of W servers that you manage to send a write to must necessarily overlap with any quorum of R servers that any future reader might read from

Quorum中负责处理写请求的服务器必须得和Quorum中负责读请求的服务器有所重叠

42.39-42.41

and so what that means is

So，这意味着


42.41-42.50

that R plus W has to be greater than n

R+W得大于N

42.50-42.57

 so that any W servers must overlap in at least one server with any R servers

也就是说，负责处理写请求的W服务器和负责处理读请求的R服务器至少得有一台服务器重叠（既负责写，也负责读）




42.57-43.06

and so you might have three we can imagine there's three servers  s1 s2 s3

So，假设我们有3台服务器，即S1，S2，S3

43.06-43.10

each of them holds I say we just have one object that we're updating 

假设我们要更新一个对象

43.10-43.14

we send out a write maybe we want to set the value of our object to 23 

我们发出一个写请求，我们想将我们对象的值设置为23

43.14-43.16

well in order to do a write 

Well，为了进行一次写操作

43.16-43.23

we need to get our new value on to at least W of the replicas

我们至少得从我们的W replica中获取到新的值


43.23-43.28

 let's say for this system that R and W are both equals 2 

假设在这个系统中，R和W的数量都等于2

43.28-43.30

and n is equal to 3

N等于3

43.30-43.31

that's the setup

这就是我们这里的设置

43.31-43.32

 to do a write 

为了进行一次写操作


43.32-43.37

we need to get our new value onto a quorum onto at least 2 the server 

我们需要从Quorum中至少这两个服务器处拿到新的值（知秋注：进行版本号对比，即CAS，对比成功才能写入）

43.37-43.40

so maybe we get our write onto these two

So，我们可能得在这两个服务器处进行写操作


43.40-43.45

 so they both now know that the value of the of our data object is 23

现在，这俩服务器都知道我们的对象数据的值为23

43.45-43.50

 if somebody comes along and reads

如果有人来进行读取

43.50-43.55

a read it also requires that the reader check with at least a read quorum of the servers

它至少得去访问其中一个read Quorum（负责处理读请求的服务器）

43.55-43.57

so that's also 2 in this setup

So，在我们的例子中，里面也有两台服务器处理读请求的服务器

43.57-44.01

so you know that quorum could include a server that didn't see the write

你知道的，Quorum中可以包含一个没有看到该写请求的服务器

44.01-44.04

but it has to include at least one other in order to get too

为了处理读请求，它至少得包含另一个处理写的服务器（知秋注：该写服务器也处理读请求）


44.04-44.06

so that means

So，这意味着

44.06-44.12

 the any future read must for example consult both this server that didn't see the write plus at least one that did

例如，对于以后收到的读请求，它们是由这两个服务器进行处理的，即一个没有看到写请求的服务器以及至少一个看到写请求的服务器



44.12 - 44.17

that is a requirement of write quorum and read quorum must overlap in at least one server 

这里有一个要求，那就是write Quorum和read Quorum间必须至少有一台服务器重叠（它既属于Read Quorum，也属于Write Quorum）

44.17 - 44.20

so any read must consult a server that saw any previous write

So，任何读请求都必须通过一个（看到最近一个写请求的）服务器进行协商处理



44.20 - 44.32

now what's cool about this 

这里面最酷的一点是什么呢

44.32-44.36

well actually there's still one critical missing piece here 

Well，实际上，这里我还漏讲了一个关键点


44.36-44.42

the reader is gonna get back R results possibly are different results 

reader所读取到的结果可能是不同的结果

44.42-44.45

because and the question is

这里的问题是

44.45-44.50

 how does a reader know which of the R results it got back from the R servers in its Quorum

reader怎么知道它从Quorum服务器中拿到的结果里它该选哪个呢？

44.50-44.53

 which one actually uses the correct value

哪一个结果才是正确的呢？



44.55 - 44.57

something that doesn't work is voting

其中一种没什么作用的方法就是使用投票



44.57 - 45.01

like just voting by popularity of the different values it gets back

比如：统计reader所拿到的不同值对应的个数

45.01-45.02

 it turns out not to work

事实证明，这种方法并不可行

45.02-45.07

because we're only guaranteed that our reader overlaps of the writer  in at most one server 

因为我们只保证reader和writer会有重叠部分（最多重叠一台服务器）

45.07-45.08

so that could mean that

So，这意味着

45.08-45.14

the correct value is only represented by one of the servers that the reader consulted 

正确的值仅由reader所查询过的其中一个服务器所提供

45.11 - 45.17

and you know in a system with say six replicas 

一个Quorum系统是由6个replica所组成

45.17-45.20

you know you might have read Quorum might be four

你的Read Quorum可能是由4个replica所组成

45.20-45.23

you might get back 4 answers 

你可能会拿到4个答案

45.23-45.31

and only one of them is the answer that is the correct answer from the server in which you overlap with the previous write

只有那个重叠的服务器所给出的答案才是唯一正确的答案

45.31-45.32

 so you can't use voting

So，我们不能使用投票这种方法

45.32-45.35

 and instead these quorum systems need version numbers 

相反，这些Quorum系统需要用到版本号

45.35-45.38

so every write every time you do a write 

So，每当我们要发起一次写请求的时候

45.38-45.43

you need to accompany your new value with you know an increasing version number

你需要给你的新值加上一个版本号，这个版本号会不断增加

45.43-45.47

 and then the reader it gets back a bunch of different values from the read quorum

接着，reader从read Quorum处拿到了一堆不同的值



45.47 - 45.50

 and it can just use them only the highest version number

我们只允许它使用版本号最高的那个值


45.51 - 45.53

 I'm said that means that this 21 here you know 

比如，这里是23（老师口误，实际是23，不是21）




45.53-45.58

maybe s2 had a old value of 20

可能S2上保存的是旧值20

45.58-46.01

each of these needs to be tagged with a version number 

这每个值上面都需要标上版本号

46.01-46.02

so maybe this is version number three 

So，这里的版本号可能是3


46.02-46.04

this was also version number three 

这里的版本号可能也是3

46.04-46.05

because it came from the same original write

因为S1和S3的版本号都来自同一个写请求

46.05-46.10

and we're imagining that this server that didn't see the write is gonna have version number two

假设，S2并没有看到这个写请求，那么它上面的版本号就是2


46.10-46.13

then the reader gets back these two values  these two version numbers

接着，reader拿到了这两个版本号



46.13 - 46.16

fix the version were the highest the value with the highest version number

它会使用版本号最高的那个值来修复版本

46.16-46.24

 and in Aurora this was essentially about well never mind about Aurora for a moment

在Aurora中，我们永远不需要担心这个问题

46.24-46.29

okay 



46.29-46.31

furthermore

此外

46.31-46.36

if you can't talk to if you can't actually contact a quorum or a read or write 

实际上，如果你无法和Quorum系统中的read服务器和write服务器进行通信

46.36-46.46

you really just have to keep trying those are the rules so keep trying until the server's are brought back up or connected again 

你就得不停地尝试和服务器进行通信，直到服务器和你的连接恢复为止



46.46-46.52

so the reason why this is preferable to something like chain replication is

So，它比链式复制来得更好的原因是

46.52-47.00

 that it can easily ride out temporary dead or disconnected or slow servers 

它可以轻易地摆脱暂时挂掉或者失联或者速度很慢的服务器

47.00-47.00

so in fact

So，事实上

47.00-47.02

 the way it would work is

它的工作方式是

47.02-47.03

 that if you want to read or write

 如果你想要进行读或者写


47.03-47.04

 if you want to write

如果你想进行写操作

47.04-47.12

you would saying your newly written about you would send the newly written value plus its version number to all of the servers to all n of the servers

那你就得将这个新写入的值和它的版本号发送给所有的服务器（即这N个replica）

47.12-47.15

but only wait for W of them to respond

但我们只等待其中负责处理写请求的服务器（即其中的W个服务器）对我们进行响应

47.15-47.17

 and similarly

类似的

47.17 - 47.18

if you want to read

如果你想进行读取

47.18-47.20

you would in a quorum system you would send the read to all the servers 

那么在Quorum系统中，你得将所有的读请求发送给所有的服务器

47.20-47.23

and only wait for a quorum for R of the servers to respond

我们只需要等待Read Quorum对我们响应就可以了



47.23 - 47.28

and that and because you only have to wait for R out of N of them 

因为你只需要去等待里面Read Quorum的响应就行了

47.28-47.29

that means 

这意味着

47.29-47.35

that you can continue after the fastest R have responded or the fastest W and

你可以在接收到最快的那个Read或Write服务器响应后即可继续



47.35 - 47.38

you don't have to wait for a slow server or a server that's dead

我们不需要去等待速度缓慢或者挂掉的服务器对我们进行响应

47.38-47.46

and there's not any you know the machinery for ignoring slow or dead servers is completely implicit 

对于那些速度缓慢和挂掉的服务器，它会隐式将其完全忽略

47.46-47.53

there's nothing here or about oh we have to sort of make decisions about which servers are up or down or elect leaders or anything

我们不需要担心哪些服务器活着或者死了，或者选举leader之类的事情

47.53-47.58

it just kind of automatically proceeds as long as the quorum is available 

只要Quorum可用，那么这些事情就会被自动处理

47.58-48.05

so we get very smooth handling of dead or slow servers

So，我们就可以非常丝滑地处理挂掉或者速度很慢的服务器

48.05-48.06

 in addition

此外

48.06-48.08

there's not much leeway for it here

这里其实并没有太多余地

48.08-48.11

 well actually you even in this simple case 

实际上，在这个例子中

48.11-48.17

you can adjust the R and W to make either reads to favor either reads or writes 

你可以对R和W进行调整，以此来调节读和写的工作量，是偏向读还是偏向写

48.17-48.18

so here we could actually say that

So，此处我们可以这么说


48.18-48.20

 well the write Quorum is three

假设Write Quorum中replica的数量是3

48.20-48.22

every write has to go to all three servers 

所有的写请求都得发给这3个服务器

48.22-48.23

and in that case

在这个例子中

48.23-48.24 ！！！！！！！！！

the read quorum can be one

Read Quorum中服务器的数量可以是1

48.24-48.28

so you could if you wanted to favored reads

So，如果你所处理的请求大部分都是读请求

48.28-48.29

 with this setup

通过使用这种设置


48.29-48.33

 you could have read equals one write equals three

负责处理读请求的服务器数量为1，处理写请求的服务器数量为3

48.33-48.34

maybe are much faster 

可能这样做，处理起来速度会更快

48.34-48.36

they only have to wait for one server

因为它们只需要去等待一台服务器进行响应就行了

48.36-48.37

 but then return the writes are slow

但相对而言，处理写请求这方面就会慢很多



48.37 - 48.38

 if you wanted to favor write

如果你的请求大多数是写请求


48.38 - 48.41

you could say that Oh any reader has to be from all of them

对于读请求来说，那我们就得等到所有服务器对我们进行响应



48.41- 48.42

but a writer only has to write one 

但对于写请求来说，我们只需要等待一个服务器对我们进行响应就行了



48.42 - 48.47

so I mean the only one server might have the latest value

So，这也就是说，只有一台服务器上保存了最新的值

48.47-48.50

but readers have to consult all three

但reader得和这三台服务器进行通信


48.53-48.56

but they're guaranteed that their three will overlap with this

但这三台负责处理读请求的服务器必然有一台和处理写的服务器重叠（知秋注：即这三台处理读请求的服务器中有一台是用来同时处理读和写的服务器）

48.56-48.56

of course

Of Course


48.56-49.01

these particular values makes writes not fault tolerant 

但这种设定使得Write Quorum不再具备容错能力


49.01-49.03

and here reads not fault tolerant 

下面则是，Read Quorum不再具备容错能力

49.03-49.05

because all the server's have to be up

因为所有服务器都得活着才行（知秋注：否则它达不到成功获取数据的标准限制，比如，读请求时，三个服务器的数据版本的比较，拿到最高版本，因为你并不知道是否是读写都处理的那个服务器挂了）

49.05-49.07

 so you probably wouldn't want to do this in real life 

So，在现实生活中，你们可能不会想去这么做

49.07-49。10

you might have you would have as Auoara does

正如Aurora所做的那样

49.10-49.16

 a larger number of servers and sort of intermediate numbers of read and write quorums

它使用了大量的服务器，并且平衡了Read Quorum和Write Quorum之间的数量

49.16-49.33

Aurora in order to achieve its goals here of being able to write with one dead availability zone and read with one dead availability zone plus one other server

Aurora为了达到它的目标，即在一个可用区域挂掉的情况下，也能进行写操作。以及在一个可用区域和另一个服务器都挂掉的情况下，也能进行读操作

49.33-49.45

 it uses a quorum system with N equals 6 w equals 4 and R equals 3

它使用了一个Quorum系统，它的设置为N等于6，W等于4，R等于3

49.45-49.47

so the W equals 4 means

So，W等于4意味着

49.47-49.51

 that it can do a write with one dead availability zone

这样就可以在一个可用地区挂掉的情况下，进行写操作


49.51-49.53

if this availability zone can't be contacted

如果我们无法和AZ3进行通信

49.53-4957

 well these other four servers are enough to complete write

Well，剩下的这4台服务器也足以让我们处理这个写请求了

49.57-49.59

the read quorum is 3

Read Quorum中的服务器数量为3


49.59-50.01

so 4 plus 3 so 7 

So，4+3=7

50.01-50.03

so they definitely guaranteed overlap

So，它们肯定有一台服务器重叠了

50.03-50.05

 a read quorum of 3  means 

R等于3意味着


50.05-50.08

that even if one availability is zone is dead plus one more server

即使一个可用地区以及另一台服务器挂了

50.08-50.10

 the three remaining servers are enough to serve a read

剩下的三台服务器也足以处理读请求了






50.11- 50.15

now in this case we're three servers are now down

在这个例子中，我们挂掉了三台服务器



50.15 - 50.17

the system can do reads 

该系统可以进行读取

50.17-50.21

and as you know can reconstruct the confine the current state of the database

你知道的，我们可以去重建这个数据库的当前状态（知秋注：我们同步的只是日志，这里replica可以根据日志重新启动一个新的数据库实例）

50.21-50.24

but it can't do writes without further work

但在没有进一步处理的情况下，它是无法处理写操作的

50.24-50.26

so if they were in a situation

So，如果它们遇上了这种情况


50.26-50.30

where there was three dead servers 

即这里面挂掉了3台服务器

50.30-50.37

there they have enough of a quorum to be able to read the data  and reconstruct more replicas

如果我们拥有足够的服务器，达到Quorum所要求的标准，我们能够通过它来读取数据，并重建更多的replica

50.37-50.42

 but until they've created more replicas ，basically replace these dead ones 

但直到它们创建完更多的replica后，它们才会将这些挂掉的服务器给替换掉

50.42-50.44

they can't serve as writes

这些挂掉的服务器无法处理写请求

50.49-50.56

and also the quorum system as I explained before allows them to ride out these transient slow replicas 

正如我之前解释过，我们允许Quorum系统中可以有两个速度比较慢的replica临时不能用

50.56-51.02

all right



51.02 - 51.07

as it happens as explained before

正如我之前解释过的那样


51.07-51.14

 what the writes in Aurora aren't really over writing objects as in a sort of classic quorum system 

在一个经典的Quorum系统中，Aurora中的写操作并不会真的将对象覆写掉

51.14-51.19

what Aurora  in fact its writes never overwrite anything 

事实上，在Aurora中，它的写操作永远不会覆写任何东西

51.19-51.23

its writes just append log entries to the current log

它会将这些写操作通过日志条目的形式追加到当前日志

51.23 - 51.25

so the way it's using quorums is basically to say 

So，简单来讲，Aurora使用Quorum的方式是

51.25-51.29

well when the database sends out our new log record 

Well，当数据库对外发送新的日志条目时

51.29-51.31

because it's executing some transaction

因为它要去执行某个事务

51.31-51.42

it needs to make sure that that log record is present on at least four of its storage servers before it's allowed to proceed with the transaction are committed 

它需要去确保，在我们允许该事务被提交前，这条日志记录已经落地到至少其中4台服务器上面



51.42 - 51.46

so that's really the meaning of its Aurora write quorum its that

So，这就是Aurora中Write Quorum的意义所在



51.46 - 51.55

each new log record has to be appended to the storage and at least 4 the replicas before the write can be considered to to have completed

在写操作被认为完成前，它所对应的每条新日志条目得至少追加到其中4个replica上


52.00-52.04

 and when Aurora gets to the end of a transaction

当Aurora执行完这个事务的时候

52.04-52.10

 before it can reply to the client until the client tell the client a hi you know your transaction is committed and finished and durable

直到你的事务被完成并提交且落地到磁盘的时候，它才会对client进行响应



52.10-52.19

Aurora has to wait for acknowledgments from a write quorum for each of the log records that made up that transaction

Aurora得等待一个Write Quorum的通知，即组成该事务的每个日志记录都落地了



52.19-52.25

and in fact because if there were a crash in a recovery

事实上，因为如果在恢复的过程中发生了崩溃

52.25-52.34

 you're not allowed to recover one transaction if preceding transactions don't aren't also recovered

如果前面的事务无法恢复，那么我们就不允许恢复后面的事务

52.34-52.35

in practice

在实战中

52.35-52.38

 Aurora has before Aurora can acknowledge a transaction

在Aurora可以确认一个事务之前

52.38-52.48

 it has to wait for a write quorum of storage servers to respond for all previously committed transaction and the transaction of interest

它得等待Write Quorum中的存储服务器对之前所有提交的事务响应了后，才能轮到它所感兴趣的这个事务响应



52.48-52.50

 and then can respond to the client

然后它才可以对client进行响应

5250-52.55

okay 



52.55-53.00

so  these storage servers are getting incoming log records

So，这些存储服务器会获取到传入的日志记录

53.00-53.02

that's what writes look like to them

这也是写操作所写入的东西

53.02-53.04

 and so what do they actually do

So，它们实际做了哪些事情呢？

53.04-53.07

 you know they're not getting new data pages from the database server

你知道的，它们并没有从数据库服务器处获取到新的data page

53.07-53.12

 they're just getting log records that just describe changes to the data pages 

它们所拿到的只是用来描述对data page进行修改的那些日志条目

53.12-53.21

so internally one of these storage servers 

So，在其中一个存储服务器内部

53.21-53.33

it has internally it has copies of all that data of all the data pages at some point in the database data pages evolution

在该服务器内部保存了数据库中所有的data page在某一时刻的数据（即缓存）

53.33-53.36

 so it has maybe in its cache on its disk

So，在它的磁盘上会放着这些data page的缓存

53.36-53.41

 a whole bunch of these pages 

即这些page的缓存


53.41-53.45

you know page 1 page 2 so forth 

page 1，page 2，以此类推

53.45-53.48

when a new write comes in

当一个新的写请求传入的时候

53.48-53.56

 the storage server would when a new log record when a new write arrives carrying with it just a log record

当传入一个新的写请求的时候，该写请求携带的只是一个日志记录

53.56-53.59

 what has to happen some day but not right away is

以后会发生但不会现在发生的事情是

53.59-54.04

that the changes in that log record the new value here has to be applied to the relevant page

该日志记录命令想要写的数据，也就是新值必须得提交到相关的page上

54.04-54.13

 but we don't at the source of it doesn't have to do that until someone asks just until the database server or the recovery software asks to see that page 

但只有到数据库服务器或恢复软件要去查看该page时，我们才会将该值提交到该page上

54.13-54.21

so immediately what happens to a new log record is that the log records are just appended to lists of log records that effect each page 

So，对于一条新的日志记录来说，它只是被追加到了日志记录的列表中（可以影响到每个page）



54.20 -54.25

so for every page that the storage server stores

So，对于存储服务器所保存的每个page来说

54.25-54.30

 if it's been recently modified by a log record by a transaction

如果它最近已经被一条日志记录或者一个事务所修改

54.30-54.44 ******

what the storage server will actually store is an old version of the page plus the string of the sequence of log records that have come in from the database server since that page was last brought up to date

存储服务器实际上存储的是一个旧版本的page加上自该page最近更新以来从数据库服务器输入的日志记录的字符串序列

54.44-54.46

 so if nothing else happens

So，如果啥也没发生

54.46-54.51

 the storage server just stores these old pages plus lists of log records

那么存储服务器所保存的就是这些老的page加上日志记录列表

54.51-54.57

 if the database server later you know evict the page from its cache

如果数据库服务器之后将这个page从它的缓存中移除

54.57-55.00

 and then needs to read the page again for a future transaction 

然后，它为了以后的事务，它需要再次读取该page

55.00-55.04

it'll send a read request out to one of the storage servers  and say

它会向其中一个存储服务器发出一个读请求，并说

55.04-55.07

 look you know I need a copy I need an updated copy a page one

我需要一个page 1更新后的副本



55.07-55.07

and at that point 

此时

55.07-55.13

the storage server will apply these log records to the page

存储服务器会将这些日志记录应用到该page上


55.13-55.22

you know do do these writes of new data that are implied that are described in the log records and then send that updated page back to the database server

将这些隐含在日志记录中的新数据写入到page中，并将更新后的page发回给数据库服务器



55.22-55.34

and presumably maybe then like a array  list and just store the newly updated page although it's not quite that simple

这里所存放的可能是一个数组列表，里面保存了最近更新的page。虽然这可能并没有我说的那么容易



55.35 - 55.37

all right 



55.37-55.43

so the storage servers just store these strings of log records plus old log page versions

So，存储服务器所保存的就是这些日志记录的字符串加上老的log page版本

55.43-55.55

 now the database server as I mentioned sometimes needs to read pages 

正如我提到的那样，数据库服务器有时得需要去读取page

55.55-55.57

so by the way one thing to observe is 

So，顺带我们要观察的一点是

55.57-56.01

that the database server is writing log records but it's reading data pages

数据库服务器写入的是日志记录，但它读取的是data page

56.01-56.08

 so there's also different my Quorum system in the sense that the sort of things that are being read and written are quite different

So，在Quorum系统中，读和写的处理是相当不同的

56.08-56.09

 in addition

此外

56.09-56.12

it turns out that in ordinary operation

事实证明，在普通的操作中

56.12-56.18 ！！！

the database server knows doesn't have to send quorum reads

数据库服务器知道，它无需发送Quorum读请求

56.18-56.31

because the database server tracks for each one of the storage servers how far how much of the prefix of the log that storage server is actually received

因为数据库服务器会去追踪每个存储服务器实际接收到的日志前缀的大小（知秋注：即跟踪日志的条数）


56.31-56.35

 so the database server is keeping track of these six numbers 

So，数据库服务器会跟踪这6台服务器

56.35-56.37

so so first of all log entries are numbered

So，首先，所有的日志条目都是编好号的

56.37-56.38

 just one two three four five

按照12345这样进行编号

56.38-56.43

 the database server sends that new log entries to all the storage servers

数据库服务器发送新的日志条目给所有的存储服务器

56.43-56.47

 the storage servers that receive them respond saying oh yeah I got log entries 79

存储服务器接收到这些日志条目，并响应，它们说，Oh，我拿到了第79个日志条目

56.47-56.51

 and furthermore you know I have every log entry before 79 also

此外，我上面还保存了79之前的每个日志条目

56.51-57.03

 the database server keeps track of these numbers how far each server has gotten or what the highest sort of contiguous log entry number is that each of the servers has gotten

数据库服务器会跟踪每台服务器收到了多少条日志条目，或者是每个服务器已经拿到的最长连续的日志条目号是什么

57.03-57.06

 so that way when the database server needs to do a read

So，当数据库服务器需要进行读取时

57.06-57.15

it just picks a storage server that's up to date  and sends the read request for the page it wants just to that storage server

它就会去选择一个存储了最新数据的服务器，并将读请求发送到存储服务器以读取所需page

57.15-57.19

so the database server does have to do quorum writes

So，数据库服务器确实得让Quorum去处理写请求

57.19-57.23

but it basically doesn't ordinarily have to do quorum reads

但它并不需要让Quorum来处理读请求

57.23-57.25

 and knows which of these storage servers are up to date

数据库服务器知道哪些存储服务器上存储的数据是最新的

57.25-57.26

 and just reads from one of them 

并从其中一个服务器上读取数据

57.26-57.29

so the read much cheaper than they would be 

So，读取数据的成本要低很多

57.29-57.31

in a that just reads one copy of the page

它只是去读取该page的一个副本

57.31-57.34

and doesn't have to go through the expense of a quorum read

它不需要考虑从Quorum中读取数据的成本

57.34-57.40

now it does sometimes use quorum reads

它有时候会从Quorum系统中进行读取

57.40-57.42

it turns out that during crash recovery

事实证明，在崩溃恢复的过程中

57.42-57.46

you know if the crash during crash recovery of the database server

在数据库服务器崩溃恢复的过程中

57.46-57.50

 and so this is different from a crash recovery of the storage service

这和存储服务的崩溃恢复不同

57.50-57.53

 if the database server itself crash

如果数据库服务器自身崩溃了

57.53-57.58

 because the it's running in an ec2 instance on some piece of hardware some real piece of hardware 

因为数据库服务器是运行在一个EC2实例上的，该实例是在运行在某个硬件之上

57.58-58.00

may be that piece of hardware suffers a failure 

可能这个硬件发生了故障

58.00-58.02

the database server crashes

数据库服务器也就崩溃了

58.02-58.04

 there's some monitoring infrastructure at Amazon

Amazon上提供了某种监控基础设施

58.04-58.05

 that says oh wait a minute 

它会说，稍等一下

58.05-58.10

you know the database the Aurora database server over running for a customer or whatever just crashed 

某个客户的Aurora数据库服务器刚刚崩溃了

58.10-58.20

and Amazon will automatically fire up a new ec2 instance start up the database software and that ec2 instance 

Amazon会自动启动一个新的EC2实例，并在上面启动数据库软件

58.20-58.27

and sort of tell it look your data is sitting on this particular volume this set of storage systems 

并告诉客户，你的数据都放在了这组存储系统中

58.27-58.37

please clean up any partially executed transactions that are evident in the logs stored in these storage servers and continue 

请清除这些存储服务器所保存的日志中所有任何未完成执行的事务，然后继续运行

58.37-58.48

so we have to and that's the point at which Aurora uses quorum logic for reads

在这个时候，Aurora就会通过Quorum来处理读请求（知秋注：因为事务失败，你日志长度长是没什么用的）

58.48-58.54

because this database server when the old when the previous database server crashed

因为如果前一个数据库服务器崩溃了

58.54-58.59

 it was almost certainly partway through executing some set of transactions

几乎可以肯定的是，在它崩溃的时候，它肯定处于执行某组事务的过程中

58.59-59.03

so the state of play at the time of the crash was well it's completed some transactions and committed them

So，对于此时的数据库状态来讲，它已经完成并提交了一些事务

59.03-59.07

and their log entries are on a quorum 

这些提交的事务都已经在Quorum中了



59.07-59.11

plus it's in the middle of executing some other set of transactions

以及还有一些执行到一半的事务

59.11-59.14

which also may have log entries on on a quorum

在Quorum中可能也会有这部分日志条目

59.14-59.18

 but because a database server crashed midway through those transactions

因为数据库服务器在执行这些事务时，中途崩溃了

59.18-59.19

they can never be completed 

这些事务也就永远完不成了

59.19-59.25

and for those transactions that haven't completed

对于这些还未完成的事务来说

59.25-59.26

 in addition

此外

59.26-59.29

there may be you know we may have a situation

我们可能会遇上这种情况


59.29-59.34

 in which you know maybe log entry this server has log entry 101

比如，这个服务器上有日志条目101


59.34-59.36

and the server has log entry 102

这台服务器上保存的是日志条目102


59.36-59.38

 and there's a hundred and four somewhere

这台服务器上某处保存了日志条目104

59.38-59.44

 but no you know for I as yet uncommitted transaction before the crash

对于崩溃前还未提交的事务来说

59.44-59.49

maybe know server got a copy of log entry 103

服务器可能拿到了一个日志条目103的副本

59.49-59.50

so after a crash 

So，在崩溃发生后

59.50-59.54

and remember the new database service recovering

当新的数据库服务在进行恢复的时候

59.54-1.00.04

it does quorum reads to basically find the point in the log the highest log number for which every preceding log entry exists somewhere in the storage service

它在做Quorum Read时，会在这些存储服务器中的某个上找到日志编号最高的那个条目


1.00.04-1.00.10

so basically it finds the first missing the number of the first missing log entry which is 103 

So，简单来讲，它发现这里第一个缺失的日志条目的编号是103

1.00.10-1.00.11

and says well and 

也就是说

1.00.11-1.00.13

so we're missing a log entry

So，我们丢了一个日志条目

1.00.13-1.00.16

 we can't do anything with a log after this point 

我们无法对这个日志条目之后的日志做任何事情



1.00.16 - 1.00.18

because we're like missing an update

因为我们少了一个更新

1.00.18-1.00.22

so the database server does these quorum reads

So，数据库服务器会进行Quorum read

1.00.22-

it finds a hundred and three is the



1320

1.00.23 - 1.00.27

first entry that's MIT that's I can't



1.00.27 - 1.00.30

you know I look at my quorum the server's I can reach 

我看了下我Quorum中所有能看的服务器上的数据

1.00.30-1.00.31

and 103 is not there

日志条目103并不在里面（知秋注：quorum write必须所有W服务器都到位后才会返回提交事务）



1.00.31-1.00.35

 and the database server will send out a message to all the server saying look 

数据库服务器会对所有的服务器发送一条消息，并说，看



1.00.35-1.00.38

please just discard every log entry from 103 onwards 

请丢弃从日志条目103起的所有日志条目

1.00.38-1.00.44

and those must necessarily not include log entries from committed transactions 

但我们知道，这肯定不包括那些已经提交事务中的那些日志条目

1.00.44 - 1.00.48

because we know a transaction can't commit until all of its entries are on a right corner 

因为我们知道，只有当所有的日志条目到位后，该事务才能被提交

1.00.48-1.00.50

so we would be guaranteed to see them 

So，这样我们就可以保证看到它们



1.00.50 - 1.00.55

so we're only discarding log entries from uncommitted transactions 

So，我们只会丢掉那些未提交事务中的日志条目



1.00.55 - 1.00.56

of course 

of course 


1.00.56- 1.01.03

so we're sort of cutting off the log here log entry 102

So，我们在此处（日志条目102处）切分下日志

1.01.03-1.01.10

these log entries that we're preserving now may actually include log entries from uncommitted transactions from transactions that were interrupted by the crash

我们现在保留的这些日志条目实际上可能包括来自因崩溃中断而导致未提交事务的日志条目

1.08.10-1.01.12

 and the database server actually has to detect those 

实际上，数据库服务器得去检测出这些日志条目

1.01.12-1.01.19

which you can by seeing oop you know a certain transaction there's it has update entries in the log but no commit record

你们可以看到某个事务中它已经更新了日志条目，但它并没有提交记录（commit record）的标志

1.01.19-1.01.26

the database server will find the full set of those uncompleted transactions and basically issue undo operations

数据库服务器会找到这些未完成的事务，并发起撤销操作

 

1.01.26-1.01.36

 I sort of knew log entries that undo all of the changes that those uncommitted transactions made

即撤销这些未提交事务所做的所有修改







三十八  阅举报
10-04

1.01.35-1.01.42

and you know that's the point at which Aurora needs this these old values in the log entries

 这就是为什么Aurora需要在它的日志条目中保存这些旧值的原因了

1.01.42-1.01.51

so that a server that's doing recovery after a crash can sort of back out of partially completed transactions

So，当发生崩溃后，一台服务器进行恢复时就对这个未完成的事务进行回滚（知秋注：即回滚到旧值的状态）

1.01.51-1.01.59

 all right 

1.01.59-1.02.02

one another thing I'd like to talk about is

我想谈的另一件事情是

1.02.02-1.02.08

how Aurora deals with big databases 

Aurora是如何应对大型数据库的

1.02.08-1.02.14

so far I've explained the storage setup

到目前为止，我已经解释过了存储这部分的设置


1.02.14-1.02.19

as if the database just has these six replicas of its storage 

如果这个数据库的存储是由这6个replica所组成

1.02.19-1.02.27

and if that was all there was to it basically a database couldn't be you know each of these just a computer with a disk or two or something attached to it

每个replica其实就是一个挂载着一个或两个硬盘的服务器

1.02.27-1.02.31

 if this were the way the full situation 

如果这就是整体情况

1.02.31-1.02.36

then we couldn't have a database that was bigger than the amount of storage that you could put on a single machine 

那么我们数据库的存储容量不能超过单台服务器上的存储容量

1.02.36-1.02.40

there's the fact that we have six machines doesn't give us six times as much usable storage

事实上，这里我们有6台服务器，这并不是说给了我们6倍的存储空间

1.02.40-1.02.43

 because each one I'm storing a replica of the same old data again and again

因为我一次又一次地在每个replica上保存相同的旧数据


1.02.43-1.02.52

and you know so I want to use solid-state drives or something we can put you know terabytes of storage on a single machine

So，比如我想使用SSD，然后我们可以往单台机器中放TB级大小的数据量

1.02.52-1.02.55

but we can't put you know hundreds of terabytes on a single machine 

但你知道的，我们没法在单台机器上存放数百TB数据

1.02.55-1.03.04

so in order to support customers who need like more than ten terabytes who need to have vast databases 

So，为了支持这种需要存储超过10TB或者使用大型数据库的客户需求

1.03.04-1.03.07

Amazon is happy

Amazon看到这种金主爸爸会感到很高兴

1.03.07-1.03.14

 Amazon will split up the databases data onto multiple sets of six replicas

Amazon会将这种大客户的数据库数据拆分到多组服务器中去，每组服务器由6个replica组成

1.03.14-1.03.23

 so and the kind of unit of sharding the unit of splitting up the data I think is 10 gigabytes

我觉得这种分割的数据块大小应该是10Gb左右

1.03.23-1.03.28

so a database that needs 20 gigabytes of data will use two protection groups 

So，如果一个数据库需要保存20Gb数据，那它就会使用2个PG（Protection Group）


1.03.28-1.03.47

these PG things to its data you know sit on half of it will sit on the six servers of protection Group one and then they'll be another six servers you know possibly a different set of six storage servers

这两个PG各负责保存一半数据，每个PG是由6个服务器所组成

1.03.47-1.03.50

 because Amazon's running and like a huge fleet of these storage servers

 因为Amazon所运行的是由这些存储服务器所组成的庞大集群

1.30.50-1.03.53

 that are jointly used by all of its Aurora customers

这些服务器由其Aurora客户所共同使用


1.03.53-1.04.05

 the second ten gigabytes of the databases 20 gigabytes of data we'll be replicated on another set of you know typically different 

数据库中另一半数据将会被保存在另一个PG中，该PG通常是由6台服务器（与另一个PG所拥有的服务器通常情况下是不共享，且独立的6台）所组成

1.04.05-1.04.07

I'll you know there could be overlap between these 

你知道的，这两个PG中可能会有重叠的部分

1.04.07-1.04.10

but typically just a different set of six server 

但通常情况下就是由6个服务器所组成的一个不同集群

1.04.10-1.04.12

so now we get 20 gigabytes data

So，现在我们就有了20Gb数据

1.04.12-1.04.17

and we have more of these as a database goes bigger 

随着数据库体积的变大，我们就会有更多这样的PG

1.04.17-1.04.21

one interesting piece of fallout from this is that 

一个我们所感兴趣的结果是


1.04.21-1.04.30

while it's clear that you can take the data pages and split them up over multiple independent protection groups

很明显，我们可以将这些data page拆分到多个PG中去

1.04.30-1.04.34

 maybe you know odd numbered data pages from your b-tree go on PG one

比如，我们将B-Tree中编号为奇数的data page放到PG 1中

1.04.34-1.04.37

 and even number pages go on PG2

将偶数编号的page放到PG2中

1.04.37-1.04.40

it's good you can shard split up the data pages

如果我们将这些data page进行拆分，那就很棒

1.04.40-1.04.42

 it's not immediately obvious what to do with a log 

对于如何处理日志这块，我们现在还不是很清楚

1.04.42-1.04.50

all right how do you split up the log， if you have two of these two protection groups or more in a protection group 

如果我们有2个或更多个PG，那我们该如何拆分日志呢？

1.04.50-1.04.51

and the answer 

答案是

1.04.51-1.04.56

that amazon does is that that that Aurora uses is that the database server when it's sending out a log record

Aurora所使用的方法是，当数据库服务器发送一条日志记录时

1.04.56-1.05.00

 it looks at the data that the log record modifies

它会去查看该日志记录所修改的数据

1.05.00-1.05.04

 and figures out which protection groups store that data

并弄清楚这份数据是保存在哪个PG中的

1.05.04-1.05.13

 and it sends each log record just to the protection groups that store data  that's mentioned that's modified in the log entry

它会将每条日志记录发送到存储该（在日志条目中被修改的）数据的PG中



1.05.013-1.05.24

 and so that means that each of these protection groups store some fraction of the data pages plus all the log records  that apply to those data pages 

So，这意味着，每个PG都存储了部分data page外加所有对这部分data page进行提交的日志记录

1.05.24-1.05.29

see these protection groups stores a subset of a log that's relevant to its pages 

这些PG上存储了和它对应page相关的一些日志

1.05.29-1.05.42

so final maybe I erase the fault tolurent requirements 

这里我可能把容错方面的需求给擦掉了

1.05.42-1.05.45

but a final requirement is

但这里的最后需求是

1.05.45-1.05.49

that if  one of these storage servers crashes 

如果其中一个存储服务器崩溃了

1.05.49-1.05.53

we want to be able to replace it as soon as possible right

我们想要能够尽可能快的对它进行替换



1.05.53 - 1.05.55

because you know if we wait too long

因为如果我们等待的时间太长

1.05.55-1.06.02

then we risk maybe three of them or four of them crashing and a four of them crash then we actually can't recover

那么我们可能就遇上了其中三个或四个服务器崩溃的情况，那么实际上我们也就没法对其进行恢复

1.06.02-1.06.03

because then we don't have a record anymore

因为这样我们就不再拥有这些记录了

1.06.03-1.06.07

 so we need to regain replication as soon as possible

So，我们需要尽快恢复这些副本

1.06.07-1.06.16

 if you think about any one storage server sure this this storage server is storing 10 gigabytes for you know my databases protection group 

假设我们有一台存储服务器，它上面保存了我数据库的PG中的10Gb数据



1.06.16 - 1.06.25

but in fact the physical thing you know the physical setup of any one of these servers is that it has a you know maybe a one or two or something terabyte disk on it 

但事实上，每个服务器上都有一个或两个TB级别大小的磁盘

1.06.25-1.06.33

that's storing 10 gigabyte segments of a hundred or more different Aurora instances

它上面保存了一百个或更多个不同Aurora实例的10Gb数据块片段

1.06.33-1.06.38

 so what's on this physical machine is 

So，在这些物理机上有什么呢？

1.06.38-1.06.42

you know 10 terabyte era byte or 10 terabytes or whatever of data in total

你知道的，一台服务器上面总共存了10TB左右的数据

1.06.42-1.06.46

so when there's a when one of these storage servers crashes

So，当其中一台存储服务器崩溃了

1.06.46-1.06.55

 it's taking with it not just the 10 gigabytes from my database but also 10 gigabytes from a hundred other people's databases as well

这不仅会导致我数据库中10Gb数据不可用，也会导致其他数百个客户的数据库里的10GB数据不可用

1.06.55-1.06.59

and what has to be replicated is not just my 10 gigabytes 

我们得复制的不仅仅是我的10GB数据

1.06.59-1.07.06

but the entire terabyte or whatever or more that's stored on this servers solid-state drive

而是这整个SSD上的所有数据

1.07.06-1.07.11

and if you think through the numbers you know maybe we have 10 gigabyte per second network interface

如果我们从数据的角度来看，假设我们的网速是10Gb/s

1.07.11-1.07.20

if we need to move 10 terabytes across a 10 gigabyte per second network interface from one machine to another

如果我们要将10TB的数据通过网络（网速为10Gb/s）从一台机器转移到另一台

1.07.20-1.07.27

 it's gonna take I don't know a thousand seconds ten thousand seconds  maybe ten thousand seconds 

这可能得花10000秒

1.07.27-1.07.31

and that's way too long right 

这样做的话，等待的时间太长了

1.07.31-1.07.33

we don't want to have to sit there and wait

我们不想坐在这里干等着啥也不干

1.07.33-1.07.38

you know it we don't want to have a strategy in which the way we weak 

你知道的，我们不想使用这种方式

1.07.38-1.07.42

we can reconstruct this is to find is to have another machine that was replicating everything on it

我们可以通过找到另一台复制了所有数据的机器，来对此进行重建

1.07.42-1.07.47

 and had that machine send 10 terabytes to a replacement machine

我们让那台机器发送10TB数据给这台备用机器

1.07.47-1.07.50

 we're gonna be able to reconstruct the data far faster than that

我们就能够更快地去重建这些数据

1.07.50-1.07.53

 and so the actual setup they use is

So，他们的实际使用方式是


1.07.53-1.07.57

that if I have a particular storage server

如果我有一个特定的存储服务器

1.07.57-1.08.05

it stores many many segments  you know replicas of many 10 gigabyte protection groups

它里面保存了来自其他PG的很多很多10Gb大小的数据片段

1.08.05-1.08.19

 so maybe this protection group maybe this segment that it's storing data for the other.. for this one the other replicas are you know these five other machines

so 对于这个PG来说，这个数据片段和其他5台replica是一个pg里的

1.08.19-1.08.20

 all right 


1.08.20-1.08.24

so these are all storing segments of protection group a

So，这里所保存的都是PG A中的数据片段

1.08.24-1.08.27

 and so you know there's a whole bunch of other ones that we're also storing

So，我们还存储了些其他东西

1.08.27-1.08.34

 so I mean we may be this particular machine also stores a replica for protecting group B

So，这台机器上可能也保存了PG B中的一个replica的数据

1.08.34-1.08.39

but the other copies of the data for B are going to be put on a disjoint set of servers 

但PG B中其他的数据副本会被放在一组不相交的服务器上


1.08.39-1.08.44

right so now there's five servers that have the other copies of B

So，这里我们通过另外5台服务器来保存B的其他副本

1.08.44-1.08.55

and so on for all of the segments that this server that are sitting on this storage servers hard drive for you know many many different Aurora instances

对于这个存储服务器上所保存的所有数据片段都是来源于许多不同的Aurora实例

1.08.55-1.08.56

 so that means

So，这意味着


1.08.56-1.08.57

 that this machine goes down

当这台机器挂掉的时候

1.0857-1.09.01

the replacement strategy is that we pick

我们所使用的替换策略会这样做

1.09.01-1.09.03

if we're say we're storing a hundred of these segments on it 

如果我们在这台机器上保存了100个数据片段

1.09.03-1.09.08

we pick a hundred different storage servers

然后，我们再选择100台不同的存储服务器

1.09.08- 1.09.13

each of which is gonna pick up one new segment

从每台服务器中去选择一个新的数据片段（知秋注：用于存储，将丢失那个，进行分散备份到这些选择的机器中）

1.09.13-1.09.17

 that is each of which is going to now be participating in one more protection group

这样每个数据片段就会被存入另一个PG中了

这些数据片段用于参与存储来自各个PG的数据

1.09.17-1.09.23

 so one one we miss like one server to be replicate on for each of these ten gigabytes segments 

so 我们丢失的每个数据片段，比如这个服务器上用于复制的每一个10g的数据片段


1.09.23-1.09.28

and now we have you know maybe 100 sort of different segment servers 

现在，我们可能有100台服务器，上面存了不同的数据片段



1.09.28 - 1.09.30

and you know I probably storing other stuff 

你知道的，我在上面可能也存储了其他东西

1.09.30-1.09.31

but they have a little bit of free disk space 

但总之，这些服务器上面有一些空闲的磁盘空间


1.09.31-1.09.34

and then for each of these

接着，对于这每个replica来说

1.09.34-1.09.40

 we pick one machine one of the replicas that we're going to copy the data from one of the remaining replicas

我们从剩下的其中一个replica上复制数据


1.09.40-1.09.42

so maybe for a we're going to copy from there

So，对于A来说，我们会从这个replica中复制数据

1.09.42-。09.43

 for B from here 

对于B，我们会从这个replica中复制数据

1.09.43-1.09.45

you know if we have five other copies with C

你知道的，如果我们有关于C的5个其他副本

1.09.45-1.09.50

 we pick a different server for C 

我们会为C选择其中一个不同的服务器


1.09.50-1.09.53

and so we have we copy a from this server to that server

So，我们将A中的数据从这个服务器复制到下方这个服务器



1.09.53 - 1.09.55

and B like this 

我们将B的数据复制到下方第二个服务器处


1.09.55-1.09.57

and C like this

我们将C的数据复制到下方第三个服务器处

1.09.57-1.10.05

and so now we have a hundred different 10 gigabyte copies going on in parallel across the network

So，现在我们在网络上并行运行着100个不同的10GB大小的副本



1.10.05-1.10.08

 and assuming you know we have enough servers

假设我们有足够的服务器


1.10.08-1.10.10

 that these can all be disjoint 

那么这些数据就不会相交

1.10.10-1.10.15

and we have plenty of bandwidth in switching network that connects them 

我们拥有足够的带宽，可以通过网络来连接它们

1.10.15-1.10.31

now we can copy our terabyte or 10 terabytes or whatever of data in total in parallel with a hundredfold parallelism and the whole thing will take you know 10 seconds or something instead of taking a thousand seconds if there were just two machines involved

现在我们可以以数百倍的速度来并行复制TB级的数据（比如：10TB大小的数据），整个过程只需要10s左右。如果只使用两台机器的话，那就得花1000秒来完成了

1.10.31-1.10.35

 anyway so this is this is the strategies they use

总之，这就是他们所使用的策略

1.10.35-1.10.44 !!!!

 and it means that they can recover you know for machine dies they can recover in parallel from one machine's death extremely quickly

这意味着，如果有服务器挂掉了，那么他们可以以并行的方式非常迅速地恢复服务器

1.10.44-1.10.48

 if lots of machines diets doesn't work as well

如果有太多服务器发生了故障，那么这种做法也不奏效

1.10.48-1.10.50

 but they can recover from single

但他们可以通过单台服务器进行恢复

1.10.50-1.10.53

they can be replicate from single machine crashes extremely quickly 

他们可以通过复制来快速恢复单台机器



1.10.53-1.10.59

alright so a final thing that the paper mentions

So，paper所提到的最后一件事情就是


1.10.59-1.11.01

 if you look at figure three

如果你看下figure 3

1.11.01-1.11.06

 you'll see that not only do they have this main database

你们会看到，他们不仅有这个主数据库

1.11.06-1.11.07

 but they also have replica databases

他们还有副本数据库（replica databases）

1.11.07-1.11.17

 so for many of their customers many of their customers see far more read-only queries than they see readwrite queries

So，对于他们的许多客户来说，他们所遇到的，更多是只读型查询，而不是读写查询

1.11.17-1.11.18

 that is if you think about a web server

如果你从web服务器的角度思考

1.11.18-1.11.21

 if you just view a web page on some website

如果你只是访问某个网站的一个网页

1.11.21-1.11.30

then chances are the web server you connected to has to read lots and lots and stuff in order to generate all the things that are shown on the page to you

那么你所连接的这个web服务器就得去读取大量的数据，以此来为你生成页面上所展示的所有东西

1.11.30-1.11.35

maybe hundreds of different items have to be read out of the database or so out of some database

它可能得从一个或多个数据库中读取数百个不同的东西

1.11.35-1.11.39

 but the number of writes for a typical web page view is usually much much smaller 

但对于一个普通网页来说，写请求的数量通常是很小很小的

1.11.39-1.11.43

maybe some statistics have to be updated or a little bit of history for you or something

可能只有很少数据需要更新

1.11.43-1.11.46

 so you might have a hundred to one ratio of reads to writes

So，你的读写比例可能就是100:1

1.11.46-1.11.55

 that is you may typically have a large large large number of straight read only database queries 

通常，你所遇到的往往是大量的简单只读查询


1.11.55-1.11.57

now with this set up 

在这种配置的情况下

1.11.57-1.12.00

the writes can only go through the one database server

写操作只能往一个数据库服务器中传

1.12.00-1.12.04

 because we really can only support one writer for this storage strategy 

因为对于这种存储策略而言，我们只能支持让一个服务器进行写操作

1.12.04-1.12.08

and I think you know one place where the rubber really hits the road 

你知道的，在关键情况下

1.12.08-1.12.11

there is that the log entries have to be numbered sequentially

这些日志条目必须按顺序进行编号

1.12.11-1.12.14

 and that's easy to do if all the writes go through a single server

如果所有写操作都传给一个服务器，那么做起来就很容易

1.12.14-1.12.20

 and extremely difficult if we have lots of different servers all sort of writing in an uncoordinated way to the same database 

如果我们通过许多不同的服务器以一种不协调的方式处理对同一个数据库所进行的所有写操作，那么做起来就会超级难

1.12.20-1.12.23

so the writes really have to be go through one database

So，这些写操作最好只由一个数据库来处理

1.12.23-1.12.26

 but we could set up

但我们可以这样做

1.12.26-1.12.31

 and indeed Amazon does set up a situation where we have read only database replicas

确实Amazon也是按照我们想法那样做的，即我们可以使用只用于读的数据库副本


1.12.31-1.12.34

 that can read from these storage servers

它可以从这些存储服务器上读取数据


1.12.34-1.12.38

 and so the full glory of figure three is that

So，在figure 3中

1.12.38-1.12.42

 in addition to the main database server that handles the write requests

我们除了有用来处理写请求的主数据库以外


1.12.42-1.12.49

 there's also a set of read-only databases

我们也有一组只读数据库

1.12.49-1.12.52

 and they say they can support up to 15

Amazon表示他们最多可以支持15个这样的只读数据库

1.12.52-1.12.59

 so you can actually get a lot of you know if your see we'd have read workload  a lot of it can be

如果我们有大量的read workload

1.12.59-1.13.03

 you know most of it can be sort of hived off to a whole bunch of these read-only databases

大部分任务都可以由这些只读数据库来分散处理



1.13.03-1.13.06

and when a client sends a read request to read only database

当一个client发送了一个读请求给这个只读数据库

1.13.06-1.13.07

 what happens is

这里所会发生的事情是



1.13.07-1.13.19

the read only database figures out you know what data pages it needs to serve that request  and sends reads into the directly into the storage system without bothering the main readwrite database 

只读数据库就会去弄清楚它用来处理这个读请求所需的data page是哪个。在不麻烦主读写数据库的情况下，它将该读请求直接发送给存储系统


1.13.19-1.13.26

so the the read-only replica database send page requests read requests directly the storage servers

So，这个只读的replica将读请求直接发给存储服务器

1.13.26-1.13.31

 and then they'll be  cache those pages 

接着，它们就会对这些page进行缓存

1.13.31-。13.35

so that they can you know respond to future read requests right out of their cache 

So，这样它们就可以通过它们的缓存来响应以后的读请求了

1.13.35-1.13.37

of course they need to be able to update those caches

Of course，它们也需要能够去更新这些缓存

1.13.37-。13.38

 and for that reason 

出于这个原因

1.13.38-1.13.47

Aurora also the main database sends a copy of its log to each of the read-only databases 

Aurora，也就是主数据库会将它自己的日志的副本发送给每个只读数据库


1.13.47-1.13.52

and that's the horizontal lines you see between the blue boxes in figure three

这也就是你们在figure 3中所看到的蓝色方块之间的横线

1.13.52-1.13.56

 that the main database sends all the log entries do these read-only databases 

主数据库会将所有的日志条目都发送给这些只读数据库

1.13.56-1.14.05

which they use to update their cached copies to reflect recent transactions in the database

它们会通过这些日志条目来更新它们的缓存备份，以此反映出数据库中最近的事务

1.14.05-1.14.10

 and it means it does mean that the read only database is lag a little bit behind the main database 

这意味着，这些只读数据库上的数据会略微落后于主数据库

1.14.10-1.14.13

but it turns out for a lot of read-only workloads that's okay

事实证明，这对于要应对大量的read-only workload来说，是ok的

1.14.13-1.14.17

 if you look at a web page and it's you know 20 milliseconds out of date

如果你去查看一个网页，上面的数据过时了20毫秒

1.14.17-1.14.19

 that's usually not a big problem

这通常并不是什么大问题


1.14.19-1.14.25

 there are some complexities from this

这里有一些复杂

1.14.25-1.14.27

 like one problem is 

其中一个问题是

1.14.27-1.14.32

that we don't want these read-only databases to see data from uncommitted transactions yet

我们不希望这些只读数据库从未提交的事务中读取数据


1.14.32-1.14.35

 and so in this stream of log entries

So，在这个日志条目流中

1.14.35-1.14.41

 the database may need to be sort of denotes which transactions have committed 

数据库可能得需要将这些已经提交的事务标记出来

1.14.41-1.14.50

and they're read-only databases are careful not to apply uncommitted transactions to their caches they wait till the transactions commit

这些只读数据库会很仔细，直到这些未提交的事务被提交后，它们才会将这些事务应用到它们的缓存中

1.14.50-1.14.57

the other complexity that these read-only replicas impose is that

这些只读副本带来的其他复杂性是


1.14.57-1.15.05

these structures he of these under structures are quite complex

这些底层的结构相当复杂

1.15.05-1.15.06

 this might be a b-tree 

这里用的可能是B-Tree

1.15.06-1.15.08

it might need to be rebalanced periodically

它可能得需要去定期重新平衡下

1.15.08-1.15.09

 for example 

例如

1.15.09-1.15.14

I'm the rebalancing is quite a complex operation  in which a lot of the tree to be modified in atomically   has

对树进行重新平衡是一个相当复杂的操作，我们需要以原子的方式去对这些树进行修改

1.15.14-1.15.18

and so the tree is incorrect while it's being be rebalanced

So，当它正在重新平衡的时候，这棵树是不可用的（知秋注：这是一个加锁同步的过程）

1.15.18-1.15.20

 and you only allowed to look at it after the rebalancing is done

只有当重新平衡完的时候，我们才允许你去查看这棵树上的数据

1.15.20-1.15.25

if these read-only replicas directly read the pages out of the database

如果这些只读的replica直接去从主数据库中读取data page （知秋注：即类似于Redis的RDB模式，直接把内存中的数据拿过来）

1.15.25-1.15.26

 there's a risk they might see 

它们可能就会遇上这种风险

1.15.26-1.15.36

the B-tree that the database that's being stored here in these data pages they may see the B-tree in the middle of a rebalancing or some other operation

这些replica可能会看到主数据库中存储这些data page的B-Tree正在进行重新平衡或者其他一些操作

1.15.36-1.15.38

 and the data is just totally illegal 

这期间它们所看到的这些数据都是非法的

1.15.38-。15.41

and they might crash or just malfunction

这些只读数据库可能就会崩溃或者只是发生点故障

1.15.41-1.15.49

 and when the paper talks about mini transactions and the vdl vs vcl distinction 

当paper讨论mini-transaction和VDL vs VCL之间的区别时

1.15.49-1.15.52

what it's talking about is the machinery

它所讨论的其实是一种机制

1.15.52-1.15.55

by which the database server can tell the storage servers

数据库服务器可以通过这种机制来告诉存储服务器

1.15.55-1.16.06

 look this complex sequence of log entries must only be revealed all or nothing' atomically to any read-only transactions

对于这些只读事务来说，要么完整显示这些复杂的日志条目序列，要么什么也不显示（知秋注：即那些正在执行的写事务压根不要显示，哪怕你RDB复制了，我也可以根据本地日志回滚到最近完成的事务时那个状态）



1.16.06-1.16.09

 that's what the mini transactions  and VDL are about 

这就是所谓的mini-transaction和VDL

1.16.09-1.16.15

and basically the read when a read only database asks to see data a data page from a storage server

简单来讲，当一个只读数据库从一个存储服务器处读取一个data page时

1.16.15-1.16.26

the storage server is careful to either show it data from just before one of these sequence many transaction sequences of log entries or just after，but not in the middle

存储服务器要对此小心翼翼，它要么展示这些已完成事务后日志条目对应的数据，但绝对不能是未完成事务中的数据

1.16.26-1.16.29

 all right



1.16.29-1.16.34

 so that's the all the technical stuff I have to talk about 

So，这就是我所需要讨论的所有技术内容了

1.16.34-1.16.38

just to kind of summarize what's interesting about the paper and what can be learned from the paper 

总结一下这篇paper中我们所感兴趣，以及我们所能学到的东西

1.16.38-1.16.41

one thing to learn

有一个要学的东西就是

1.16.41-1.16.44

 which is just good in general not specific to this paper

这个东西是很通用的，并不只是针对这个paper，这点很好

1.16.44-1.16.59

 but everybody in systems should know is the basics of how transaction processing databases work and the sort of impact that the interaction between transaction processing databases and the storage systems 

但每个人都应该了解，在系统中事务处理型数据库是如何工作的，以及事务处理型数据库与存储系统之间交互所产生的影响

1.16.59-1.17.00

because this comes up a lot 

因为这些东西经常出现

1.17.00-1.17.02

it's like a pervasive 

它无处不在

1.17.02-1.17.11

you know the performance and crash recoverability，complexity of running a real database just comes up over and over again in systems design

你知道的，性能和崩溃恢复以及运行一个真正的数据库的复杂性在系统设计中会反复出现



1.17.11 - 1.17.13

 another thing to learn this paper is 

我们从paper中还要学的一点就是

1.17.13-1.17.23

this idea of quorums and overlap the technique of overlapping read/write quorums in order to always be able to see the latest data  but also get fault tolerance

那就是为了始终能看到最新的数据，以及获得容错能力，我们要去学习Quorum这种思想和这种重叠的Read/Write Quorum技术

1.17.23-1.17.25

 and of course this comes up in raft 

Of course，这也会在Raft中出现

1.17.25-1.17.28

also raft has a strong kind of quorum flavor to it

Raft中也有这种很强的Quorum思想 （知秋注：raft中的多数和Quorum还是有区别的，别混为一谈）

1.17.28-1.17.32

another interesting thought from this paper is

这篇paper中另一个我们很感兴趣的一点就是

1.17.32-1.17.38

 that the database and the storage system are basically co-designed as kind of an integrated

基本上来讲，数据库和存储系统是一起设计的

1.17.38-1.17.40

 there's integration across the database layer and the storage layer 

他们将数据库层和存储层整合集成起来

1.17.40-1.17.43

or nearly redesigned to try to design systems

几乎就是试着重新设计系统

1.17.43-1.17.51

so they have you know good separation between consumers of services and the sort of infrastructure services

So，他们在服务消费者和基础设施服务之间做到了良好的隔离

1.17.51-1.17.56

 like typically storage is very general-purpose not aimed at a particular application

比如，他们的存储就是具备很高的通用性，并不是针对某个特定的应用程序

1.17.56-1.17.59

 just you know because that's a pleasant design

因为这是一个令人愉悦的设计

1.17.59-1.18.03

 and it also means that lots of different uses can be made of the same infrastructure

这也意味着相同的基础架构可以有很多不同的用途


1.18.04-1.18.06

but here the performance issues were so extreme

但此处的性能问题也很极端


1.18.06-1.18.12

you know they would have to get a 35 times performance improvement by sort of blurring this boundary 

你知道的，他们得通过模糊这种边界，以此来获得35倍的性能提升

1.18.12-1.18.18

this was a situation in which general-purpose storage was actually really not advantageous

实际上，这也是通用存储所不具备优势的地方

1.18.18-1.18.21

 and they got a big win by abandoning that idea

他们放弃了这种思想，所以获得了巨大的成功

1.18.21-1.18.24

 and a final set of things to get out of the papers

我们从paper中最后所得出的东西是

1.18.24-1.18.38

 all the interesting sometimes kind of implicit information about what was valuable to these Amazon engineers who you know really know what they're doing about what concerns they had about cloud infrastructure

这里面还隐藏了一些我们所感兴趣的信息，这些信息对Amazon工程师而言非常具有价值。他们真的知道他们在做什么，以及他们对云基础架构的关注点

1.18.38-1.18.45

like the amount of worry that they put into the possibility of an entire availability zone might fail

比如，他们会关心整个可用区域出现故障的可能性

1.18.45-1.18.48

 it's an important tidbit

这是一个很重要的花絮

1.18.48-1.18.56

 the fact that transient slowness of individual storage servers was important is another thing that actually also comes up a lot 

事实上，另一件经常出现的事情就是个别存储服务器的速度会暂时变慢

1.18.56-1.19.02

and finally the implication that the network is the main bottleneck

最后，paper中暗示了网络是其最主要的瓶颈所在

1.19.02-1.19.06

 because after all they were it went to extreme lengths to send less data over the network

他们会尽最大努力来减小通过网络所发送的数据量



1.19.06-1.19.09

but in return the storage servers have to do more work

但存储服务器这边还得做更多工作

1.19.06-1.19.13

 and they put it they're willing to you know 6 copies the data

他们会存有6份数据副本

1.19.13-1.19.20

and have 6 CPUs all replicating the execution of applying these redo log entries apparently

他们通过6个CPU来复制这些重新执行日志后的结果

1.19.20-。19.23

CPU is relatively cheap for them

CPU对于他们来说相对很廉价

1.19.23-1.19.26

 whereas the network capacity was extremely important

然而，网络容量对他们来说则是非常重要



1.19.26-1.19.29

all right that's all I have to say and

All right，这就是我想说的全部内容了

1.19.29-end

see you next week

下周再见



三十六  阅举报
