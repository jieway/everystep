11-01
0-0.14

today the paper I'm going to discuss this frangipani 

今天我要去讨论的paper是frangipani 

0.14-0.18

this is a fairly old distributed file system paper 

这是一篇相当古老的分布式系统paper

0.18-0.19

the reason why were reading it though is

我选择阅读它的原因是

0.19-0.32

because it has a lot of interesting and good design having to do with cache coherence and distributed transactions and distributed crash recovery as well as the interactions between them

因为它具有大量令我们感兴趣的优秀设计，这与缓存一致性，分布式事务，分布式崩溃恢复以及它们之间的交互有关

0.32-0.38

 so those are the really the ideas behind this that we're gonna try to tease out

So，我们要试着梳理出这其中背后的思路


0.38-0.50

so these are it's really a lot of our caching coherence is really the idea of 

So，它其中的一个思想就是缓存一致性

0.50-0.56

if I have something cached that nevertheless if you modify it despite me having a cache  you know something will happen 

如果我缓存了一点东西，尽管我对这些数据进行了缓存，但如果你对它进行了修改，那么就会发生些事情

0.56-0.58

so I can see your modifications

So，这样我就可以看到你所做的修改

0.58-1.04

 and we also have distributed transaction

我们也有分布式事务

1.04-1.10

 which are needed internally to file systems to be able to make complex updates to the file system data structures 

我们需要通过它来对文件系统中的数据结构进行复杂的更新操作

1.10-1.17

and because the file system is essentially split up among a bunch of servers

因为本质上来讲，分布式文件系统是由一堆服务器所组成


1.17-1.29

 it's critical to be able to recover from crashes and those servers

关键是它能够让这些服务器从崩溃中恢复过来

1.29-1.33 

 the overall design a Frangipani

这就是Frangipani的整体设计了

1.33-1.34

 it's a network file system 

它是一个网络文件系统

1.34-1.40

it's intended to look to existing applications  this is intended to work with existing applications 

它是用来服务现有的应用程序

1.40-1.45

like UNIX programs ordinary UNIX programs  we're running on people's workstations

就像我们运行在工作站上的普通的UNIX程序

1.45-1.49

much like Athena's AFS

这就像是Athena上的AFS

1.49-1.57

 lets you get at your Athena home directory and various project directories from any Athena workstation

你可以在从任何Athena工作站上获取到你自己的Athena home目录以及不同的项目目录

1.57-2.00

so the kind of overall picture is

So，整个来讲它是这个样子的

2.00-2.01

that you have a bunch of users

我们有一堆用户

2.01-2.07

each user in the papers world is sitting in front of a workstation

假设他们坐在一个工作站前干活

2.07-2.10

which is you know real not a laptop in those days 

我说的是台式机，不是如今的笔记本

2.10-2.13

but sort of computer with a keyboard and display in a mouse and Windows system at all

其实就是一台主机配一个键盘，一个显示器，外加一个鼠标和一个Windows系统

2.13-2.17

so each one is sitting front of a computer workstation

So，每个人都坐在一台工作站前


2.17-2.23

I'm gonna call the workstations you know workstation one，workstation 2

我将这些工作站进行编号，工作站1，工作站2，以此类推

2.23-2.28

each workstation runs an instance of the frangipani server 。

每台工作站上都运行着一个frangipani服务器实例

2.28-2.41

I meant so a huge amount of the you know almost all of the stuff that happens in this paper goes on in the frangipani software in each workstation

So，这篇paper中发生的所有事情几乎都是在每台工作站上的frangipani软件上发生的

2.41-2.44

 so maybe they're sitting in front of a workstation

So，人们可能坐在一台工作站之前

2.44-2.46

 and they might be running ordinary programs

他们在工作站上面可能运行了一些程序

2.46-2.49

like a text editor  that's reading and writing files

比如，一个用来读取和写入文件的文本编辑器

2.49-2.53

and maybe when they finished editing a source file they run it through the compiler  that the read source file 

当他们编辑完一个源文件，然后通过编译器对它进行编译

2.53-2.58

when these ordinary programs make file system calls 

当这些普通程序调用文件系统时

2.58-3.01

inside the kernel  there's a frangipani module 

在内核中有一个frangipani模块

3.07-3.11

that implements the file system inside of all of these workstations

它在所有这些工作站内实现了文件系统


3.11-3.14

each other own a copy 

每一个工作站上都有这样一个模块



3.15-3.19

and then the real storage of the file system data structures

该模块上面保存了该文件系统的数据结构

3.19-3.23

 things like certainly file contents but also inodes and directories and a list of files 

比如，文件内容，inode，目录，文件列表

3.23-3.29

and each directory and the information about what inodes and what blocks are free

上面还保存了一些信息，该信息描述了哪些inode和block是未被使用的


3.29-3.34

all that's stored in a shared virtual disk surface called petal 

所有这些东西都存储在一个叫做Petal的共享虚拟磁盘上

3.34-3.38

it's on a separate set of machines

它是放在一组单独的机器中的

3.38-3.43

that are you know probably server machines and a machine room rather than workstations on people's desks

这些机器可能是放在一个机房中的，而不是放在那些人们桌子上的工作站

3.43-3.46

petal among many other things replicates data

我们可以通过Petal在许多机器中来复制数据


3.46-3.51

so you can sort of think of petal servers is coming in pairs

So，你们可以想象下，petal服务器是成对出现的

3.51-3.56

 and one crashes we can still get at our data 

如果一台petal服务器崩溃了，那么我们依然能从另一台petal服务器上获得我们的数据

3.56-4.01

and so when frangipani needs to read or write a you know read a directory or something

So，当frangipani需要进行读取或者写入的时候，比如读取一个目录

4.01-4.07

 it sends a remote procedure call off to the correct petal server to say well here's the block that I need 

它会发送一个RPC请求给正确的petal服务器，并说：这里有一个我需要的block

4.07-4.09

you know please read it for me please return that block

请为我读取这个block，并将数据返回给我

4.09-4.15

and for the most part，petal is acting like a disk drive

在大多数场景下，petal扮演了一个磁盘的角色

4.15-4.24

 you can think of it as a kind of shared as a shared disk drive that all these frangipins talk to

你可以将它想象成一个共享磁盘，所有的frangipani服务器都会和它进行通信


4.24-4.27

and it's called a virtual disk 

它叫做虚拟磁盘

4.32-4。33

from our point of view

从我们的观点来看

4.33-4.34

 for most of this discussion

在这场讨论的大部分时间里

4.34-4.40

 we're just going to imagine petal is just being a disk drive that's used over the network by all these frangipani

我们会将petal想象成一个磁盘，我们通过网络将它共享给所有的frangipani

4.40-4.47

 and so it has you read and write it by giving it a block number or an address on the disk 

我们通过该磁盘给出的一个block号或者地址来对文件进行读写

4.47-4.51

and seem like I'd like to read that block just like an ordinary hard drive

这看起来就像是我们从一个普通的磁盘上读取block

4.51-4.56

 okay

4.56-5.06

so the intended use for this file so the use that the authors intended is actually reasonably important driver in the design

So，在这篇paper中，作者实际想表达的是，在设计中，驱动（driver）实际上非常重要

5.07-5.10

 what they wanted was to support their own activities

他们想做的就是去对他们的活动进行支持

5.10-5.14

 and what they were were were members of a research lab 

他们是一个研究实验室的成员

5.14-5.17

of maybe say 50 people in this research lab

这个研究室可能有50个人

5.18-5.20

 and they were used to shared infrastructure 

他们习惯去共用基础设施

5.20-5.30

things like time sharing machines or workstations using previous network file systems to share files among cooperating groups of researchers

比如通过之前的网络文件系统来共享工作站上的文件给不同组的研究人员

5.29-5.38

 so they both wanted they they wanted a file system that they could use to store their own home directories in as well as storing shared project files

So，他们想要这样一个文件系统，即除了保存他们自己的home目录以外，还保存了共享的项目文件

5.38-5.39

 and so that meant 

So，这意味着

5.39-5.40

that if I edit a file

如果我编辑了一个文件

5.40-5.45

 I'd really like the other people my work and the other people I work with to be able to read the file I just edited

我想让和我一起干活的人也能读取到我刚刚编辑的文件

5.45-5.48

so we want that kind of sharing

So，我们想要这种共享能力

5.48-5.50

and in addition

此外

5.50-6.02

it's great if I can sit down at any workstation my workstation your workstation a public workstation in the library and still get at all of the files of all my home directory everything I need in my environment 

如果我可以在任何工作站上都能拿到我home目录上的所有文件以及我所需要的所有东西，那么这就很棒

6.02-6.10

so they're really interested in a shared file system for human users in a relatively small organization

对于那种相对很小的用户群体来说，他们对这种共享文件系统真的很感兴趣

6.10-6.14

small enough that everybody was trusted all the people all the computers so really

该群体的人都彼此信任，所有的电脑也是可信的

6.14-6.18

the design has essentially nothing to say about security

简单来讲，在这个设计中并没有提到任何关于安全方面的东西

6.18-6.22

 and indeed arguably would not work in an environment like Athena

可以说，在Athena这样的环境下，这种方案不可行

6.22-6.25

 where you can't really trust the users or the workstations

因为你不能去相信其他用户或者机器

6.25-6.31

so it's really very much designed for their environment 

So，对于这种可信任的小群体来说，这是个很棒的设计

6.31-6.34

now as far as performance

就性能而言

6.34-6.36

their environment was also important

它们的环境因素也很重要

6.36-6.37

 you know it turns out that

事实证明

6.37-6.42

 the way most people use computers are leased workstations they sit in front of is that they mostly read and write their own files

人们用电脑或者工作站最常干的事情就是，坐在电脑前对他们自己的文件进行读写

6.42-6.45

 and they may read some shared files

他们可能也会去读取一些共享文件

6.42-6.49

you know programs or some project files or something

比如共享程序，或者一些共享项目之类的东西

6.49-6.52

 but most of the time I'm reading and writing my files

但在大部分时候，我是对我的文件进行读写

6.52-6.54

 and you're reading and writing your files on your workstation 

你在你的机器上对你的文件进行读写

6.54-6.58

and you know it's really the exception that we're actively sharing files

此时，当我们在共享文件的时候，就会出现异常

6.58-7.07

 so it makes a huge amount of sense to be able to one way or another even though officially the real copies of files are stored in this shared disk 

如果我们能将正式文件的副本保存在这个共享磁盘上，那么这就会很有意义

7.07-7.09

it's fantastic if we can have some kind of caching

如果我们可以使用缓存，那这就很棒

7.09-7.15

so that after I log in and I use my files for a while they're locally cached here 

当我登陆进去，然后我对我的文件做了点操作后，它们就会被缓存在本地

7.15-7.22

so they can be gotten that  and you know microseconds instead of milliseconds  if we have to fetch them from the file servers

So，当我们得从文件服务器上获取这些文件时，我们只需要几微秒就能拿到，而不是几毫秒



7.22-7.26

 ok 



7.26-7.28

so Frangipani supported this this kind of caching

So，Frangipani支持这种缓存方式

7.28-7.31

furthermore it supported write-back caching

此外，它还支持write-back caching


7.31-7.40

 not only caching in each workstation and each frangipani server

Frangipani不仅在每个工作站和每个frangipani服务器上进行缓存

7.40-7.42

 we also have writet back caching 

我们也有write-back caching

7.42-7.43

which means that

这意味着


7.43-7.47

 if I want to modify something 

如果我想去修改某些东西

7.47-7.59

if I modify a file or even create a file in a directory or delete a file or basically do any other operation  as long as nobody else no other workstation needs to see it

只要没有人或者工作站去查看这个文件，那么我可以对文件进行修改，在目录下创建或删除一个文件，或者做一些其他操作



7.59-8.02

frangipani acts with a write back cache

frangipani使用的cache机制是write back

8.02-8.03

and that means that 

这意味着


8.03-8.06

my writes stay only local in the cache

我的写操作只会缓存在本地

8.06-8.07

if I create a file

如果我创建一个文件

8.07-8.11

 at least initially the information about the newly created file said 

至少在一开始这个新创建文件的信息就会表示

8.11-8.14

a newly allocated inode with initialized contents 

它这里面新分配了一个inode，里面保存了一些初始化内容

8.14-8.20

and you know a new entry added to a new name add to my home directory 

你知道的，给一个新条目添加一个新的名字，并放到我的home目录中


8.20-8.23

all those modifications initially are just done in the cache

所有这些修改一开始都会在缓存中完成

8.20-8.28

and therefore things like creating a file can be done extremely rapidly 

因此，创建文件之类的事情可以非常快速地完成

8.28-8.32

they just require modifying local memory in this machine's disk cache

他们只需要修改本地机器磁盘缓存中的本地内存就行了

8.32-8.35

and they're not written back in general to petal until later

一般来讲，直到过了一会，这些修改才会被写回到petal

8.35-8.36

 so at least initially 

So，至少在一开始

8.36-8.44

we can do all kinds of modifications to the file system at least to my own directories my own files completely locally 

我们可以在文件系统中进行各种修改，至少我可以在本地对我自己的目录和文件进行各种修改

8.44-8.47

and that's enormously helpful for performance

对于性能来说，这帮助真的特别大

8.47-8.55

it's like a you know factor of a thousand difference being able to modify something in local memory versus having to send a remote procedure calls to send server

你知道的，其中一个很不一样的因素就是，我们可以在本地内存上修改一些东西，这个过程无须通过给服务器发送RPC请求来做到

8.55-9.05

 now one serious consequence of that  it's extremely determinative of the architecture here is 

这个因素的影响很大，意义很强，它直接决定了这个架构的走向



9.05-9.07

that that meant

这意味着

9.07-9.17*********

that the logic of the file system has to be in each workstation in order for my workstation to be able to implement things like create a file just operating at its local cache

文件系统的业务逻辑必须存在于每个工作站中，以便我的工作站能够实现诸如创建仅在其本地缓存之外运行的文件之类的操作

文件系统的逻辑必须在每个工作站中，以便我的工作站能够实现诸如可以仅需在其本地缓存中进行文件创建之类的操作

9.17-9.23

it means all the logic all the intelligence for the file system has to be sitting here in my workstation

这意味着该文件系统的所有逻辑上的相关信息都得放在我的工作站中

9.23-9.33

 and in their design basically to a first frangipani information the petal shared storage system knows absolutely nothing about file systems or files or directories

简单来讲，在他们的设计中，对于U1这个frangipani信息来说，petal这个共享存储系统根本不会知道它（U1）上面的文件系统或者文件以及目录信息的



petal这个共享文件系统对于这些文件系统或文件或目录一无所知




9.33-9.37

all that logic this is a very in a sense very straightforward simple system

对于所有这些逻辑，从感觉上来说，这是一个非常简单的系统

9.37-9.42

 and all the complexity is here in the frangipani in each client 

所有的复杂性都放在了每个client端的frangipani中

9.42-9.48

so it's a very kind of decentralized scheme 

So，这是一种去中心化方案（decentralized scheme）

9.48-9.50

and one of the reasons is 

其中一个原因是

9.50-9.53

because that's what you really need 

因为这就是我们所需要的

9.53-9.59

or these that was a design they could think of to allow them to do modifications purely locally in each workstation 

因为他们觉得这种设计能让他们在每一个本地工作站上进行修改操作

9.59-10.01

it does have the nice side effect 

它确实有很nice的副产物（side-effect）


10.01-10.07

though that I'm since most of the complexity and most of the CPU time spent is spent here 

它将复杂性和大部分CPU时间都花在了client端

10.07-10.08

it means that 

这意味着

10.08-10.10

as you add workstations as you add users to the system

当你添加工作站，即当你为该系统添加用户时

10.10-10.17

 you automatically get more CPU capacity to run those new users file system operations

你就会自动获得更多的CPU处理能力，以此来执行这些新用户对文件系统的操作

10.17-10.22

because most file system operations happen just locally in the workstation

因为大部分文件系统操作都是在本地工作站进行的

10.22-10.24

 that's most of the CPU time is spent here 。

大部分的CPU时间都花在了这块上

10.24-10.30

so the system does have a certain degree of natural scaling scalability as you add workstations 

So，当你添加工作站时，该系统具有一定程度的自然扩展性

10.30-10.33

each new workstation is a bit more load from a new user 

作为一个新的用户，每一个新的工作站会带来一点更多的负载（知秋注：提供数据存储服务的中央存储系统会增加存储负载）

10.33-10.37

but it's also a bit more available CPU time to run that users file system operations 

但这也会增加一点可用的CPU时间来执行用户在文件系统中的操作（知秋注：客户端，即工作站端增加cpu算力）

10.37-10.44

of course at some point you're gonna run out of gas here in the central storage system 

Of course，在某一时刻，你会用尽中央存储系统的存储空间

10.44-10.47

and you know then you may need to add more storage servers too

那么，你知道的，你可能也需要去增加更多存储服务器

10.47-10.51

 all right



10.51-10.58

so okay 



10.58-11.00

so we have the system that does serious caching here

So，该系统确实做了严格的缓存

11.00-11.01

 and furthermore

此外

11.01-11.09 ！！！！！！！！！

does the modifications in the cache that actually these immediately to some serious challenges in the design 

在缓存中所进行的这些修改实际上给设计带来了严峻的挑战

11.09-11.13

and the design is mostly about solving the challenges I'm about to lay out

该设计主要是为了解决这里我所列出的这些挑战


11.13-11.24

 these are largely count challenges of that's come from caching

这些挑战很大程度上是来自于缓存这块

11.24-11.31

 and this sort of decentralized architecture where most of the intelligence is sitting in the clients 

这种去中心化架构主要逻辑是放在client端这块

11.31-11.41

so the first challenge is

So，第一个难题是

11.41-11.49

 that suppose workstation one creates a file

假设工作站1创建了一个文件


11.49-11.57

in you know maybe a file say /a a new file /a 

即/A（知秋注：在“/”这个文件目录下创建一个文件A）

11.57-12.00

and initially it just creates this in its local cache 

一开始它是在它的本地缓存中创建了这个文件

12.00-12.06

so that you know first it may need to fetch the current contents of the slash directory from petal 

So，你知道的，工作站1可能得先从Petal处的/目录下获取当前的内容

12.06-12.09

 but then when it creates a file just modifies its cached copy 

但当工作站1创建一个文件，其实只需要对它所缓存的这个副本进行修改即可

12.09-12.11

and doesn't immediately send it back to petal

它并不会立即将修改后的内容发回给petal

12.11-12.15 *****

then there's an immediate problem here 

那么这里就会有一个迫在眉睫的问题摆在我们面前

12.15-12.21

suppose the user on workstation 2 tries to get a directory listing of the directory slash right 

假设，工作站2的用户试着去获取目录/下的文件列表

12.21-12.25

we'd really like to be able to this user see the newly created file right

我们想让这个用户看到这个新创建出的文件

12.25-12.28

 and that's what users are gonna expect 

这是用户所期待看的事情

12.28-12.33

and users will be very confused if you know person down the hall from me created a file

用户会感到很困惑，如果他旁边的人创建了一个文件

12.33-12.33

 and said oh

并说：Oh

12.33-12.36

you know I put all this interesting information in this new file /a 

我往这个/目录下的新文件A中放入了一些我们感兴趣的信息

12.36-12.37

why don't you go read it 

为什么你不去读取下这个文件A呢


12.37-12.39

and then I try to read it and it's totally not there

然后，我试着去读取这个文件，但它完全不在这里

12.39-12.44

 so we absolutely want very strong consistency

So，我们真的很想去具备很强的一致性

12.44-12.45

if the person down the hall says 

如果旁边的人说

12.45-12.46

they've done something in the file system

他们在文件系统中干了点事情

12.46-12.47

 I should be able to see it 

那我应该能看到他们所做的事情

12.47-2.50

and if I edit a file on one work station

如果我在一个工作站上编辑了一个文件

12.50-12.54

 and then maybe compile it on a computer server

接着，我在一台服务器上对它进行编译

12.54-12.59

on another computer I want the compiler to see the modifications I just made to my file

我想让另一台电脑上的编译器看到我刚对我文件所做的修改

12.59-12.59

which means that

这意味着

12.59-13.07

 the file system has to do something to ensure that readers see even the most recent writes

文件系统得做些工作来确保这些reader看到这些最近所做的写操作

1307-13.16

so we've been talking about this as we've been calling this you know strong strong consistency and linearize ability before

So，我们之前已经讨论过这个了，我们将它叫做强一致性，或者线性一致性

13.16-13.21

and that's basically what we want in the context of caches though

简单来讲，这是我们在缓存的上下文中所想具备的能力

13.21-13.24

 like the issue here is not really about the storage server necessarily 

这里的问题和存储服务器没什么太多关系

13.24-13.28

it's about the fact that there was a modification here that needs to be seen somewhere else

这里的问题是，我们想让此处所做的修改能在其他地方所看到

13.28-13.30

 and now for historical reasons

由于历史原因

13.30-13.32

 that's usually called cache coherence 

这通常叫做缓存一致性


13.32-13.40

that is the property of a caching system

这是一个缓存系统的特性

13.40-13.44

that even if I have an old version of something cached

如果我缓存了某个东西的老版本数据

13.44-13.47

 if someone else modifies it in their cache

如果有人在他们的缓存中对该数据进行了修改

13.47-13.51

 then my cache will automatically reflect their modifications 

那么在我的缓存中，这部分数据就会立刻反映出其他人所做的修改

13.51-13.54

so we want this cache coherence property

So，我们想要拥有这种缓存一致性的特性

13.54-13.59

 another issue you have is

另一个我们所遇到的问题是


13.59-14.04

 that the you know everything all the files and directories are shared

这里所有的文件和目录都是共享的

14.04-14.06

 we could easily have a situation 

我们会很容易碰到这样一种情况

14.06-14.11

where two different workstations are modifying the same directory at the same time

即两个不同的工作站会在同一个时刻对同一个目录进行修改

14.11-14.13

 so suppose again maybe

So，假设

14.13-14.17

 the user one on their workstation wants to create a file /a

用户1想在他的工作站上的/目录下创建一个文件A

14.17-14.20

 which is a new file in the directory slash in the new in the root directory

即他想在根结点处创建一个新文件


14.20-14.26

and at the same time user two wants to create a new file called slash B

与此同时，用户2也想在根节点处创建一个文件B

14.26-14.28

 so at some level 

So，在某种层面上来讲

14.28-14.30

you know they're creating different files alright a and B 

他们创建的是不同文件，即文件A和文件B

14.30-14.36

but they both need to modify the root directory to add a new name to the root directory

但他们都需要去对根目录进行修改，并添加一个新的文件名字

14.3614.37

and so the question is 

So，这里的问题是

14.37-14.45

even if they do this simultaneously you know to file creations of differently named files but in the same directory from different workstations

即使他们同时创建名字不同的文件，但是这些文件是在不同工作站上的相同名字的目录下

14.45-14.54

 will the system be able to sort out these concurrent modifications to the same directory and arrive at some sensible result 

那么该系统是否能够支持这种对同一目录所进行的并发修改，并得出一些合理的结果

14.54-14.56

and of course the sensible result we want is

Of course，我们所想要的合理结果是

14.56-14.58

 that both a and B end up existing 

即文件A和文件B最后都能被创建出来，并存在于根目录下

14.58-15.01

we don't want to end up with some you know situation 

我们不想最终遇上这种情况

15.01-15.04

in which only one of them ends up existing

即最终只有一个文件被创建出来，并放在根目录下

即我们不想根目录下最终只有一个文件被创建出来

15.04-15.11

because the second modification overwrote  and sort of superseded the first modification

因为第二个修改将第一个修改给覆盖取代了



15.11-15.20

and so this is again it goes by a lot of different names

So，这种东西的叫法有很多


15.20-15.24

 but we'll call it atomicity

但我们将它叫做原子性

15.24-15.28

we want operations such as create a file delete a file

我们一般会想去做这些操作，比如：创建/删除文件

15.28-15.41

 to act as if they just are instantaneous time and therefore don't ever interfere with operations that occur at similar times by other workstations

如果这些操作瞬间就完成了，那么这就永远不会干扰其他工作站在临近时间点所做的其他操作

15.41-15.46

well things to happen just at a point in time and not be spread over

Well，这些事情都是在相近时间点前后发生的，发生的间隔不会太长

15.46-15.49

 even if they're complex operations and involve touching a lot of state

即使它们是很复杂的操作。并且里面包含了许多状态

15.49-15.54

 we want them to appear as if they occur instantaneously

我们也希望它们看起来像是瞬间发生的

15.54-15.59

at a final problem we have is

我们最后一个问题是

15.59-16.05

 suppose you know my workstation is modified a lot of stuff 

假设我在我的工作站上修改了一堆东西

16.05-16.11

and maybe it's modifications are or many of its modifications are done only in the local cache

可能大多数的修改都只是在本地缓存中进行的

16.11-16.13

 because of this write back caching

因为这里使用的是write-back caching

16.13-16.18

if my workstation crashes after having modified some stuff in its local cache

如果我的工作站在修改完它本地缓存的时候，它崩溃了

16.18-16.23

and maybe reflected some but not all those modifications back to storage petal

这可能会影响到一些文件，所有的这些修改并不都会返回给petal

16.23-16.28

 other workstations are still executing

其他工作站依然会执行操作

16.28-16.31

 and they still need to be able to make sense of the file system 

对于文件系统来说，这些工作站所做的依然有意义

16.31-16.35

so the fact that my workstation crashed while I was in the middle of something

So，假设我的工作站处理工作到一半的时候发生了崩溃

16.35-16.40

 had better not wreck the entire file system for everybody else  or even any part of it 

对于其他人来说，我们希望这件事情最好不会去破坏整个文件系统或者部分系统

16.40-16.43

so that means

So，这意味着

16.43-16.49

 what we need is crash recovery of individual servers 

我们所需要的是单台服务器的崩溃恢复能力

16.49-16.56

we won't be able to have my workstation crash without disturbing the activity of anybody else using the same shared system 

我们不希望因为我工作站发生的崩溃，导致其他使用同一个共享系统的用户也受到影响

16.56-16.58

even if they look at my directory in my files

即便如果他们去查看我目录下的文件

16.58-16.59

 they should see something sensible

他们也应该会看到一些合理的东西

16.59-17.01

 maybe it won't include the very last things I did 

可能这些东西中并不包含我所最新修改的那些数据

17.01-17.07

but they should see a consistent file system  and not a wreck file system data structure

它们看到的应该是一致的文件系统，而不是一个损害的文件系统数据结构


17.07-17.15

 so we want crash recovery

So，我们想要崩溃恢复的能力

17.15-17.17

as always with distributed systems that's made more complex

和其他分布式系统相比，这要来得更为复杂

17.17-17.20

because we can easily have a situation

因为我们能够很容易遇上这种情况

17.20-17.22

where only one of the servers crashes

即其中一个服务器崩溃了

17.22-17.24

but the others are running

但其他服务器依然还在运行



17.27-17.31

and again for all of these things for all three of these challenges they're really challenged 

对于我们来说，这三点真的极具挑战性

17.31-17.33

we're in this discussion 

在这场讨论中

17.33-17.36

their challenges about how frangipani works

这些是关于frangipani工作时要面临的挑战

17.36-17.41

  and how these frangipani software inside the workstations work

即frangipani是如何在这些工作站中工作的

17.41-17.42

and so when I talk about a crash

So，当我讨论崩溃的时候

17.42-17.45

 I'm talking about a crash of a workstation and its frangipani 

我讨论的是一台工作站以及它内部运行的frangipani的崩溃

17.45-17.51

you know the petal virtual disk has many similar questions associated with it

你知道的，petal虚拟磁盘也会遇上许多与之相关的类似问题

17.51-17.53

 but there are not really the focus today 

但这并不是今天的重点

17.53-18.02

it has a completely separate set of R'lyeh fault tolerance machinery built into petal

Petal内置了一套完全独立的容错机制

18.02-18.08

and it's actually a lot like the chain replication kind of systems we talked about earlier 

实际上，它很像我们之前所讨论过的使用了链式复制那类分布式系统





===========================================================

18.08-18.14

ok so I'm going to talk about each of these challenges in turn

Ok，现在我要对每个难点逐个讨论下

18.14-18.18

the first challenge is cache coherence

第一个难点是缓存一致性

18.18-18.32

and the game here is to get both the benefits of both linearizeability that is

此处我们想做的是去具备缓存一致性以及线性一致性的能力

18.32-18.39

 when I read when I look at anything in the filesystem I always see fresh data I always see the very latest data

当我每次查看文件系统中的任何数据的时候，我始终看到的都是最新的数据

18.39-18.43

so we got both linearizeability and caching 

So，我们要同时具备线性一致和可缓存性

18.43-18.47

not caching，that's good caching as we can get for performance

不单单只是缓存，这里的缓存一致性指的是，在性能允许的情况下，我们所能做到的最佳缓存

18.47-18.51

 so somehow we you know we need to get the benefits of both of these

So，我们得通过某种方式来获得来自线性一致性和缓存一致性所带来的好处

18.51-19.02

 and the kind of that people implement cache coherence that is using what are called cache coherence protocols

人们通过一种叫做缓存一致性的协议实现了缓存一致性



19.02-19.05

 and it turns out these protocols are used a lot in many different situations 

事实证明，很多不同的场景下都使用了这些协议

19.05-19.17

not just distributed file systems， but also things like the caches in multi-core the per core caches in multi core processors also use cache coherence protocols 

不仅仅是分布式文件系统使用了这些协议，多核处理器也使用了缓存一致性协议

19.17-19.22

which are going to be not unlike the protocols I'm going to describe for frangipani

这和我所要讲的frangipani所使用的协议并不相似



19.22-19.23

 all right



19.23-19.33

so it turns out that frangipani's cache coherence is driven by its use of locks

So，事实证明frangipani中的缓存一致性是通过锁来实现的

19.33-19.38

and we'll see locks come up later in both actually for both atomicity and crash recovery

实际上，我们也会在之后要讲的原子性和崩溃恢复中看到锁

19.38-19.41

 but the particular use of locks I'm going to talk about for now is

但现在我要讲一种锁的特定使用方式是

19.41-19.43

 a use of locks to drive cache coherence

通过锁来做到缓存一致性

19.43-19.48

 to help workstations ensure that even though they're caching data they're caching the latest data 

以便让工作站确保它们所缓存的数据是最新的数据

19.48-19.59

so as well as the frangipani servers and workstations and petal servers there's a third kind of server in the frangipani system

除了运行了frangipani这个服务的工作站，以及petal服务器，在frangipani系统中还有第3种服务器

19.59-20.01

there's lock servers 

即lock服务器

20.01-20.08

and so we're I'm just gonna pretend there's one lock server although you could shard the locks over multiple servers

So，这里我们会假装有一个lock服务器，这样你就可以对多个服务器进行加锁


20.08-20.11

 so here's a lock server

So，这里有一个lock服务器

20.11-20.19

 it's a separate you know it's logically at least a separate computer 

从逻辑上来讲，至少它是一台单独的服务器

20.19-20.21

although I think they ran the on the same hardware as the petal servers

虽然我觉得它们能和petal服务器在同一个机器上运行

20.21-20.27

 but it basically just has a table of named locks

但简单来讲，它里面有一张表，表上保存了锁的名字

20.27-20.30

 and locks are named

我们会对这些锁命名

六十七  阅举报
11-02
20.30-20.37

we'll consider them to be named after a named as after file names although in fact they're named after i-number

我们会使用i-number对这些文件进行命名




20.37-20.44

 so we have for every file we have a lock potentially

So，我们可能会为每一个文件都配一个锁

20.44-20.50

 and each lock is possibly owned by some owner 

每把锁可能是由某个持有者所持有

20.50-20.51

for this discussion

在这场讨论中

20.51-20.56

I'm just gonna assume I'm gonna describe it as if the locks were exclusive locks

我所要讲的是独占锁

20.56-21.00

although in fact frangipani has a more complicated scheme for locks

事实上，fragnipani有一个更为复杂的锁方案

21.00-21.04

that allow either one writer or multiple readers 

它允许一个writer或者多个reader对文件进行操作

21.04-21.04

so for example 

So，例如

21.04-21.10

maybe file X has recently been used by workstation 1 

工作站1最近使用了文件X

21.10-21.13

and workstation 1 has a lock on it 

工作站1就会在X上加一把锁

21.13-21.18

and maybe file Y is recently used by workstation 2

然后，工作站2可能最近用到了文件Y


21.18-21.20

and workstation 2 has a lock on it 

工作站2就会对文件Y进行加锁

21.20-21.21

and the lock server will remember

这个lock服务器就会记住，并说

21.21-21.25

Oh each file who has the lock if anyone maybe nobody does on that file

如果有人最近对文件做了什么，那么这个文件就会加上锁。如果没人对这个文件进行操作，那就啥也没有

21.25-21.29

 and then in each workstation

接着，在每个工作站中

21.29-21.35

each workstation keeps track of which locks it holds 

每个工作站会去跟踪它所持有的锁是哪个

21.35-21.39

and this is tightly tied to it I'm keeping track of cache data as well

这些锁和它所跟踪的缓存数据息息相关


21.39-21.43

so in each workstations frangipani module

So，在每个工作站上的frangipani模块中

21.43-21.47

 there's also a lock table

这里面也有一个lock表

21.47-22.01

and record what file，the what session to lock for，what kind of lock it has 

这上面记录了对应文件的锁session，即使用的是哪种锁


22.01-22.03

and the contents the cached contents of that file

以及所缓存的文件内容

22.03-22.06

 so that might be a whole bunch of data blocks

So，这可能是一堆数据块

22.06-22.07

 or maybe directory contents

或者可能是目录内容

22.07-22.11

for example so there's a lot of content here

例如，这里有大量的数据内容

22.11-22.20

 so when frangipani server decides oh it needs to read it needs to use the directory slash or look at the file a or look at an inode 

So，当frangipani服务器决定它需要去读取/目录，或者查看文件A，或者查看一个inode

22.20-22.25

it first gets asked the lock server for a lock on whatever it's about to use 

它首先会去找lock服务器去获取它要使用的文件所对应的锁

22.25-22.33

and then it asks petal to get the data for whatever that file or directory or whatever it is and it needs to read 

接着，它会去询问petal，以此来获取它所需要读取的文件或者目录

22.33-22.35

and then the workstation remembers oh 

然后，工作站就会记得，Oh


22.35-22.39

ho you know I have a copy of file X

我上面保存了一份文件X的副本

22.39-22.43

 its content is whatever the content of file X is cached

它上面缓存了文件X的内容

22.43-22.46

and it turns out 

事实证明

22.46-22.51

that workstations can have a lock in at least two different modes

工作站所持有的一把锁至少可以有两种不同的模式

22.51-22.57

what the workstation can be actively reading or writing whatever that file or directory is right now

工作站可以正在对某个文件或目录进行读取或写入

22.57-23.04

that it's in the middle of a file creation operation or deletion or rename or something 

它可能正处于创建文件，或删除，或者重命名的过程中

23.03-23.05

so in that case

So，在这个例子中


23.05-23.12

I'll say that the lock is held by the workstation and is busy 

假设，这个锁是由这个工作站所持有，并且它的状态是busy


23.12-23.16

it could also be after a workstation has done some operation 

当工作站做完了一些操作后

23.16-23.19

like create a file or maybe read a file

比如创建一个文件，或读取一个文件

23.19-23.23

you know then release the lock as soon as it's done with that system call 

当它结束这个系统调用的时候，它就会释放这个锁

23.23-23.25

whatever system call like rename or read or write or create 

这个系统调用可以是重命名，读取，写入或者创建文件

23.25-23.26

as soon as the system calls over 

只要系统调用结束

23.26-23.28

the workstation will give up the lock

工作站就会放弃这把锁

23.28-23.34

at least internally it's not actively using that file anymore

至少在它内部，它不再使用这个文件了


23.34-23.38

but it'll as far as the lock server is concerned the workstation will hold the lock

但就lock服务器角度来看，这个工作站持有了这把锁

23.38-23.44

but the workstation notes for it its own use that it's not actively using that lock anymore

但该工作站会标记它所使用的这把锁不再使用了

但该工作站将它正在使用的这把锁标记为idle（闲置）

23.44-23.48

 as well call that the lock is still held by the workstation

这个锁依然被该工作站所持有


23.48-23.52

I'm just 

这里我改一下

23.52-23.55

but the workstation isn't really using it

但实际上，工作站1不再使用文件Y了

23.55-23.57

and that'll be important in a moment

这点很重要

23.57-23.58

 okay 


23.58-24.02

so I think these two are set up consistently

So，我觉得这两个设置是一样的



24.02-24.04

if we assume this is workstation one 

如果我们假设这个是工作站1

24.04-24.06

the lock server knows 

lock服务器就会知道


24.06-24.07

Oh locks for x and y exists

文件X和Y上都有锁

24.07-24.08

 and they're both held by workstation one

这两把锁都是由工作站1所持有

24.08-24.12

workstation one has equivalent information in its table

工作站1上的lock表和lock服务器上的lock表的信息是相同的

24.12-24.14

 it knows it's holding these two locks

它知道它现在持有着这两把锁

24.14-24.15

and furthermore

此外

24.15-24.22

it has the it's remembering the content is cached for the files of directories that the two locks cover

它会记住这两个锁所对应的目录下的缓存文件内容

24.22-24.30

there's a number of rules here that in that frangipani follows

frangipani遵循了一系列规则

24.30-24.34

 that caused it to use locks in a way 

这使得它以这种方式来使用锁

24.34-24.36

that provide cache coherence

以此来提供缓存一致性

24.36-24.39

 then sure nobody's ever meaning using stale data from their cache 

那么这样就能确保没有人会使用它们缓存中的那些过期数据

24.39-24.44

so these are basically rules

So，基本上，这些就是规则

24.46-24.50

that are using conjunction with the locks and cache data

它将锁和缓存数据结合起来使用


24.50-24.57

so one the really overriding invariant here is that 

So，有一条不变的规则就是

24.57-25.05

no workstation is allowed to cache data to hold any cached data unless it also holds the lock associated with that data

除非工作站持有该数据所对应的锁，我们才允许它去对数据进行缓存

25.05-25.18

so basically it's no cache data without a lock without the lock that protects that data

So，简单来讲，在没有锁保护数据的情况下，我们是不会对数据进行缓存的

25.18-25.22

 and operationally，what this means

从操作上来讲，这意味着

25.22-25.29

 is a workstation before it uses data it first acquires the lock on the data from the lock server 

一台工作站在使用数据前，它首先会从lock服务器处获取该数据的锁

25.29-25.31

and after the workstation has the lock 

当这个工作站拿到了锁后

25.31-25.37

only then does the workstation read the data from petal and  put it in its cache

只有这样，工作站才能从petal处读取数据，并将数据放入它的缓存


25.37-25.41

so the sequence is

So，整个流程的顺序是

25.41-25.43

you can acquire a lock

你可以先去获取一把锁

25.43-25.45

 and then read from petal

接着从petal中读取数据

25.51-25.52

I'll tell you at the lock

So，我和你们讲过锁

25.52-25.57

 of course you know you wont caching the data you want to cache the data you first got to get the lock

Of course，如果你想去缓存数据，那么你就先得拿到它的锁

25.57-25.59

and only strictly afterwards read from petal

只有这样，它才能从petal中读取数据

25.59-26.04

and if you ever release a lock

如果你释放了一把锁

26.04-26.06

then the rule is 

那么这里的规则就是

26.06-26.07

that before releasing a lock

在释放锁之前

26.07-26.12

you first have to write if you modified the lock data in your cache

如果你对你缓存中的用锁保护的数据进行了修改

26.12-26.17

before you release the lock you have to write the data back to modify data back to petal

那么，在你释放锁前，你得先将修改后的数据写回到petal

26.17-26.20

 and then only when petals as yes I got the data

只有当petal说：Yes，我拿到了数据

26.20-26.23

only then you'll have to release the lock

只有这样你才能去释放锁

26.23-26.24

 that is gives a lock back to the lock server 

并将这把锁还给lock服务器

26.24-26.27

so the sequence is always

So，它的流程顺序始终是这样的


26.27-26.33

first you write the cache data to the petal storage system 

首先，你将缓存数据写入到petal存储系统中


26.34-26.36

and then release the lock

接着释放锁

26.36-26.44

and erase the entry 

然后移除这些条目


26.44-26.48 

erase the entry on the cache data from your from that workstations lock table

将这些（代表缓存数据的）条目从该工作站的lock表中移除



26.48-27.03 ！！！！！！

what this results in the the protocol between the lock server and between the workstations and the lock server  consists of four different kinds of messages

lock服务器和工作站之间的这种协议包含了4种不同的消息

要达到这种缓存一致性的效果，即这里所描述的这些结果，需要通过lock服务器与工作站之间这种协议所包含的4种不同消息来做到


27.03-27.05

 this is the coherence protocol 

这就是一致性协议

27.1127.15

these are just network you can think of them as essentially sort of one-way Network messages

你可以将它想象为一个单向的网络消息


27.15-27.23

 there's a request message from workstations to the lock server

工作站会向lock服务器发送一条请求消息

27.23-27.26

request message says 

请求消息会说

27.26-27.28

oh hey lock server I'd like to get this lock 

Hey，lock服务器，我想拿到这把锁

27.28-27.34

when the lock server is willing to give you the lock

当lock服务器想给你一把锁的时候

27.34-27.38

and of course if somebody else holds the lock，server can't immediately give you the lock

Of course，如果有人正持有这把锁，那么lock服务器肯定无法立即将这把锁给你

27.38-27.40

 but if when the lock becomes free

但当没有人持有这把锁的时候


27.40-27.44

 the lock server will respond  we have a grant message

lock服务器就会对我们进行响应，并发送一条授权信息

27.44-27.51

 then the lock server back to the workstation in response to an earlier request 

接着，lock服务器就会对该工作站之前所发的一条请求进行响应

27.51-27.54

well if you request a lock for the lock server

Well，如果你从lock服务器处请求一把锁

27.54-27.55

and someone else holds the lock right now

但现在其他人正持有着这把锁

27.55-27.59

 that other workstation has to first give up the lock 

其他的工作站，首先得去放弃这把锁

27.59-28.01

we can't have two people owning the same lock

我们不允许两个人持有相同的一把锁

28.01-28.05

 so how are we going to get that workstation get the lock

So，我们如何才能让这个工作站获取到这把锁

28.05-28.07

 well what I said here is that

Well，这里我所说的是

28.07-28.11

when a workstation is you know when it's actually using the lock actively reading or writing something

当一个工作站正持有这把锁，并对文件进行读取或者写入操作时


28.11-28.12

 and it has the lock 

它持有着锁

28.12-28.13

and it's marked it busy

并且该锁的状态为busy

28.13-28.18

 but the workstations don't give up their locks ordinarily，when they're done using them

但当工作站已经处理完它们的工作后，通常它们并不会放弃它们手上的锁

28.18-28.23

 so if I if I create a file and then create system call finishes

So，当我创建完一个文件后，create（这个系统调用）就已经结束了

28.23-28.30

 I'll still have that file that new file locked and also own the lock for that my workstation will still all in the lock for that file

我的工作站依然持有该文件的锁

28.30-28.33

 it'll just be in state idle instead of busy

该锁的状态就变成了idle而不是busy

28.33-28.36

 but as far as the lock server is concerned well my workstation still has the lock

但就lock服务器而言，我的工作站依然持有这把锁

28.36-28.41

and the reason for this the reason to be lazy about handing locks back to the lock server is that

我们将锁延后还给lock服务器的原因是

28.41-28.44

 if I create a file called Y on my workstation

如果我在我的工作站上创建了一个文件Y

28.44-28.48

I'm almost certainly going to be about to use Y for other purposes

几乎可以肯定的是，我会将文件Y用于其他方面

28.48-28.50

 like maybe write some data to it 

比如，往它里面写入数据

28.50-28.51

or read from it or something 

或者从它里面读取数据

28.51-29.00

so it's extremely advantageous for the workstation to sort of accumulate locks for all of the recently used files in the workstation 

So，对于工作站来说，将最近所使用过的文件上的锁累积起来再归还给lock服务器，这样做是非常有利的

29.00-29.03

and not give them back unless it really has to

除非到工作站不得不释放锁的时候，它才会将这些锁还给lock服务器

29.03-29.05

and so in the ordinary in the common case

So，在通常情况下

29.05-29.08

 in which I use a bunch of files in my home directory

我会用到我home目录下的一大堆文件

29.08-29.11

 and nobody else on any other workstation ever looks at them 

其他工作站的用户并不会看到我的这些文件

29.11-29.16

my workstation ends up accumulating dozens or hundreds of locks in idle state for my files 

我的工作站最终会累积成百上千个状态为idle的锁

29.16-29.19

but if somebody else does look at one of my files

但如果其他人来查看我其中的一个文件

29.19-2921

 they need to first get the lock 

他们首先得获取到该文件的锁

29.21-29.22

and I have to give up the lock 

我得放弃这个文件的锁

29.22-29.24

so the way that works is

So，这里的工作方式是

29.24-29.27

 that if the lock server receives a lock request

如果lock服务器接收到了一个获取lock的请求


29.27-29.30

and it sees in the lock server table AHA

它会查看lock服务器上的lock表，并说：aha

29.30-29.323

you know that lock is currently owned by workstation 1 

该锁目前是由工作站1所持有

29.323-29.42

the lock server will send a revoke message to whoever the workstation that currently owns that lock

lock服务器就会向当前持有该锁的工作站发送一条revoke消息

29.42-29.44

 saying look you know somebody else wants it 

并说，有人想获取这把锁

29.44-29.45

please give up the lock

请释放该文件对应的这把锁

29.45-29.49

 when a workstation receives a revoke request 

当一台工作站收到这个revoke请求

29.49-29.50

if the lock is idle

如果该锁的状态是idle

29.50-29.55

 then if the cache data is dirty

如果缓存数据是脏数据

29.55-30.02

 the workstation will first write the dirty data that modified data from his cache back to petal

工作站首先会将缓存中修改后的数据写回petal


30.02-30.03

because the rule says

因为这里的规则表示

30.03-30.06

 the rule that in order to never cache data without a lock

在没有锁的情况下，不会对数据进行缓存

30.06-30.10

says we got our write the modify data back to petal before releasing

还有就是，在释放锁前，我们得先将修改过的数据写回petal

30.10-30.12

 so if the locks idle 

So，如果锁的状态是idle

30.12-30.16

would first write back the data if it's modified back to petal

如果数据被修改了，那么我们得先将修改过的数据，写回petal

30.16-30.23

and only then send a message back to the lock server and saying

只有这样，它才会给lock服务器进行响应，并说

30.23-30.25

 it's okay we give up this lock 

我们可以去释放这把锁


30.33-30.38

so the response to revoke send to a workstation is theworkstation sends it released

So，工作站会对lock服务器进行响应，并表示它释放掉了这把锁

30.38-30.39

 of course 

Of course

30.39-30.42

if the workstation gets a revoke  while it's actively using a lock

如果工作站正在使用锁的时候，收到了revoke请求

30.42-30.49

 while it's in the middle of a delete or rename or something that affects the locked file

并且它处于对（该锁所对应的）文件进行删除或者重命名之类操作的时候

30.49-30.57

the workstation will not give us a lock until it's it's done using and until it's finished that file system operation whatever system call it was that was using this file

直到工作站结束了它针对该文件所调用的文件系统操作，它才会将锁给我们

30.58-31.02

and then the lock in the workstations lock state will transition to idle 

接着，工作站中该锁的状态就会变为idle


31.02-31.08

and then you'll be able to pay attention to the revoke request 

然后，我们就可以将注意力放在revoke请求上

31.08-31.11

and after writing to petal if need be released the lock

如果需要释放锁，我们就会将缓存数据写入petal



31.12-31.18

alright so this is the is the coherence protocol

So，这就是一致性协议

31.18-31.24

that fringe that well this is a simplification of the coherence protocol that frangipani uses

Well，这就是frangipani所使用的一致性协议的简化版本

31.24-31.25

 as I mentioned before

正如我之前提到过的

31.25-31.32

 what's missing from all this is the fact that locks can be either exclusive for writers or shared for read-only access 

这里我少讲的东西就是，锁有两种，一种是用于写操作的独占锁，另一种是用于只读访问的共享锁

31.32-31.40

and just like petal is a block server

就像petal是一个block（数据块）服务器

31.40-31.42

 and doesn't understand anything about file systems 

它无须去理解任何关于文件系统方面的东西

31.42-31.47

the lock server also

lock服务器也是如此


31.47-31.48 ！！！！！！！！！

 these IDs these are really lock identifiers 

这些id其实就是锁标识符（lock id）

31.48-31.53

and the locks are doesn't know anything about files or directories or file system

这些锁并不清楚关于文件、目录或者文件系统的任何事情

31.53-32.01

 it just has these it's just has this table with opaque IDs  and who owns you know that name locks  and who owns those locks

它里面有一张表，表中有Opaque id以及锁持有者的名字

32.01-3208

 and it's frangipani that knows ah you know the lock  that I associate was he given a file has such and such an identifier

根据id，frangipani知道是这些锁是与哪些文件关联的

32.08-32.17

 and as it happens frangipani uses unix-style i-numbers or the numbers associated with files instead of names for locks

frangipani使用了unix风格的i-number（信息节点编号）与文件进行关联，而不是使用锁的名字

32.17-32.32

 so just to make this coherence protocol concrete and to illustrate again the relationship between petal operations and lock server operations

So，为了更具体地讲解一致性协议，以及petal操作和lock服务器操作之间的关系

32.32-32.35

 let me just run through what happens

让我通过举例来说明这里面发生了什么

32.35-32.38

 if one workstation modifies some file system data

如果一个工作站修改了文件系统中的一些数据

32.38-32.42

 and then in another workstation means to look at it

接着，另一台工作站要去查看这些数据


32.42-32.46

so we have two workstations  the lock server 

So，假设我们有2台工作站（WS），以及一个lock服务器

32.49-32.52

so the way the protocol plays out 

该协议所玩的套路是

32.52-33.01

if workstation one wants to read since a workstation one wants to read  and then modify files Z

假设，工作站1想去读取并修改文件Z

33.01-33.04

so before it can even read anything about Z from petal

So，在它可以从petal处读取Z相关的数据之前


33.04-33.11

it must first acquire the lock for Z 

它首先得去获取Z所对应的锁

33.11-33.13

so it sends an acquire request to the lock server

So，它向lock服务器发送了一个获取锁的请求

33.13-33.14

 maybe nobody holds the lock

可能现在没有人拿着这把锁

33.14-33.16

 or lock servers never heard anything about it

lock服务器可能对这个锁也并不清楚，因为lock表上没有这个锁

或者说，lock服务器从来就没听过关于Z这个文件任何信息（知秋注：即lock表上没有关于这个锁的记录）

33.16-33.22

so the lock server makes a new entry for Z and its table returns our reply saying

So，lock服务器就会在它的lock表上添加一个关于Z的新条目，并对我们进行响应


33.22-33.32

yes you own the grant for lock Z

它会说，Yes，你拿到了Z这把锁

33.32-33.33

 and at this point

此时

33.33-33.39

 the workstation says it has the lock on file Z it is entitled to read information about it from petal

工作站表示，它拿到了文件Z所对应的锁，它有权从petal上读取相关信息

33.39-33.41

 so at this point

So，此时

33.41-33.46

 we're gonna read Z from petal

我们会从petal处读取文件Z


33.46-33.57

and indeed workstation one can modify it locally in their cache

工作站1可以在它的本地缓存中对文件Z进行修改

33.57-34.07

at some later point maybe the human being and sitting in front of workstation two wants to also to read file Z，while the workstation two doesn't have the lock for file Z

可能过了一会儿，有人坐在工作站2前，他也想去读取文件Z，然而工作站2并没有持有文件Z所对应的锁

34.07-34.08

the very first thing it needs to do is

它首先需要做的事情就是

34.08-34.10

 send a message the lock server saying 

向lock服务器发送一条消息，并说

34.10-34.15

oh yeah I'd like to get the lock for file Z 

我想去获取文件Z所对应的锁

34.15-34.18

the lock server knows it can't reply yes yet

lock服务器知道，它目前不能对工作站2回复Yes

34.18-34.21

 because somebody else has the lock  namely workstation one

因为工作站1已经拿到这这把锁


34.21-34.33

 my lock server sends in response a revoke the workstation one

我的lock服务器发送了一个revoke请求给工作站1

34.33-34.38

 workstation one not allowed to give up the lock until it writes any modified data back to the petal

工作站1只有将修改过的数据写回到petal中，我们才允许它将锁释放


34.38-34.48

 so it's now gonna write the model anything modified content the actual contents of the file with always modified back to petal

So，它现在得将修改后的文件内容写回到petal

34.48-35.01

only then is workstation one allowed to send a release back to the lock server 

只有这样，我们才允许服务器1发送release给lock服务器

35.01-35.05

the lock server with must have kept a record in some table 

lock服务器必须在它的lock表上保存一条记录

35.05-35.07

saying well you know there's somebody waiting for lock Z 

并说，现在有一个人正在等待获取锁Z

35.07-35.10

as soon as its current holder releases

只要该锁的当前持有者将该锁释放

35.10-35.12

 that we need to reply

lock服务器就需要对工作站2进行回复


35.15-35.18

 and so this receipt of this release will cause the lock server to update its tables

So，此处的这个release请求会让lock服务器去更新它的lock表


35.18-35.20

 and finally send the grant back to workstation two

并最后将锁拥有权发送给工作站2

35.20-35.34

 and at this point now workstation two can finally read file Z from petal

此时，工作站2就可以读取petal上的文件Z了



35.34-35.39

 this is how the cache coherence protocol plays out 

这就是缓存一致性协议所玩的套路

35.39-35.55

to ensure that everybody who does a read doesn't read the data until whoever the previous until anybody who might have had the data modified privately in their cache first writes the data back to petal

为了去确保每个人都能去读取数据，它会让前一个持有锁的人先将它们修改过的数据写回petal，这样才去让后面的人去读取数据

35.55-35.58

all right



35.58-36.04

so the locking machinery forces reads to see the latest write

So，这种锁机制会强制让读操作看到最新写入的值

================================================

36.04-36.05

so what's going on

So，接下来要讲什么呢？



36.05-36.16

 there's a number of the optimizations that are possible in these kind of cache coherence protocols

我们可以对这类缓存一致性协议进行一系列可能做的优化

36.16-36.19

I mean I've actually already described one

其实我已经介绍过其中一种了

36.19-36.20

 this idle state

来看这里的状态idle

36.20-36.25

 the fact that workstations hold onto locks that they're not using right now instead of immediately releasing them

当工作站处理完它的工作后，依然会持有着对应的锁，而不是将锁立刻释放

36.25-36.29

 that's already an optimization to the simplest protocol you can think of 

这已经是我们所能想到的，对该协议所做的一种最简单的优化

36.29-36。34

and the other main optimization is

另一种主要的优化方式是

36.34-36.40 ！！！！！！

 that the frangipani has is that it has a notion of shared versus shared read locks versus exclusive write locks 

那就是frangipani有一种概念，即可共享的读锁（shared read lock） vs 独占型写锁（exclusive-write lock）

36.40-36.45

so have lots and lots of workstations need to be the same file，but nobody's writing it

So，我们会有这种情况，即许多工作站需要去读取同一个文件，但它们并不对该文件进行写操作

36.45-36.48

they can all have a lock a read lock on that file 

他们可以去共享这个文件的读锁

36.48-36.53

and if somebody does come along and try to write this file that's widely cached

如果有人来试着对这个被缓存的文件进行写入操作

36.53-36.57

they first need to first revoke everybody's read lock

他们首先得去回收所有人的读锁（read lock）

36.57-36.59

so that everybody gives up their cached copy

So，这样所有人就会放弃它们的缓存副本

36.59-37.03

and only then is a write or allowed to write the file

只有这样我们才允许writer去对文件进行写入操作

37.03-37.03

but it's okay now 

但这是Ok的

37.03-37.05

because nobody has a cache copy anymore

因为现在所有人都没有该文件的缓存副本了

37.05-37.09

so nobody could be reading stale data while it's being written

So，没有人可以在写入时读取过时的数据

37.09-37.11

all right



37.11-37.23

so that's a cache coherence story driven by the locking protocol 

So，这就是缓存一致性，它是由锁协议所驱动的

37.23-37.28

next up in our list of 

我们接下来要讲的是

37.28-37.28

yes

请讲

37.35-37.36

yes that's a good question

这是一个很好的问题

37.36-37.43

in fact there's a risk here in the scheme I described  that

事实上，在我描述的这个方案中存在着一个风险

37.43-34.76

 if I modify a file on my workstation

如果我在我的工作站上修改了一个文件

34.76-37.50

 and nobody else reads it for nobody else reads it 

并且没有人去读取这个文件

37.50-37.59

that the only copy of the modified file maybe have some precious information  is in the cache in RAM on my workstation

修改后文件的唯一副本上保存了一些有价值的信息，这些都放在我工作站上RAM中的缓存中

37.59-38.01

 and my workstation were to crash

然后，我的工作站发生了崩溃

38.01-38.04

 then and you know we hadn't done anything special 

你知道的，我们并没有做什么特别的事情

38.04-38.07

then it would have crashed with the only copy of the data

然后，它就和该数据的唯一副本一起崩溃了

38.07-38.08

and the data would be lost

数据就会丢失

38.08-38.11

so in order to forestall this

So，为了防止这种事情发生

38.11-38.20

 no matter what all these workstations write back anything that's in their cache any modified stuff in their cache every 30 seconds

我们会每30秒让这些工作站将它们缓存中修改过的数据写回petal

38.20-38.26

 so that if my workstation crash is unexpectedly I may lose the last 30 seconds at work but no more 

So，这样的话，如果我的工作站崩溃了，那么我丢失的也就是这30秒内我所做的修改，仅此而已

38.26-38.30

there's actually just mimics the way ordinary Linux or UNIX works

实际上，这只是在模仿Linux或Unix平常的工作方式

38.30-38.47

indeed all of this a lot of the story is about in the context of a distributed file system trying to mimic the properties that ordinary unix-style workstations have

我所讲的这些都是关于分布式文件系统方面的，frangipani想试着去模仿普通的Unix风格工作站所具备的特性

38.47-38.51

 so that users won't be surprised by frangipani

这样用户就不会对frangipani感到惊讶

38.51-38.54

it just sort of works much the same way that they're already used

它的工作方式和用户之前用过的Unix非常相似

==========================================================



38.58-39.00

all right so our next challenge is

So，我们下一个难题就是

39.00-39.01

how do you get  atomicity

我们该如何做到原子性

39.01-39.06

that is how to make it so even though when I do a complex operation 

So，当我在进行一个复杂操作的时候

39.06-39.07

like creating a file

比如，创建一个文件

39.07-39.17

which after all involves marking a new inode knowed as allocated initializing the inode  the inode a little piece of data that describes each file

这里面（创建文件）包括了分配一个新的inode，即通过一小段描述文件的数据来初始化这个inode



39.17-39.19

 maybe allocating space for the file

可能也会有给该文件分配一些空间这个操作

39.19-39.22

 adding a new name in the directory for my new file

在目录下，为我的新文件添加一个新名字

39.22-39.23

there's many steps

这个过程中包含了很多步骤

39.23-39.24

so many things that have to be updated

So，我们得去更新很多很多东西

39.24-39.28

 we don't want anybody to see any of the intermediate steps

我们不想让任何人看到这些中间步骤

39.28-39.35

 we want people you know other workstations to either see the file not exist or completely exist，but not something in between

我们想让其他工作站看到的是这些文件存在或者不存在，而不是这些中间操作步骤（薛定谔的猫）


39.35-39.46

we want atomic multi-step operations

我们想要的是具备原子性的多步骤操作

39.55-39.56

 alright



39.56-39.58

so in order to implement this 

So，为了去实现这点

39.58-40.00

in order to make multi-step operations 

为了做到这种多步骤操作

40.00-40.05

 like file create or rename or delete atomic as far as other workstations are concerned

比如，就其他工作站而言，让它们看到的创建文件，重命名，删除这类操作具备原子性

40.05-40.09

frangipani has a implement the notion of transactions 

frangipani有实现事务这一概念


40.09-40.18

that is as a complete sort of database style transaction system inside it again driven by the locks

它里面内置了一个数据库风格的事务系统，该系统是由锁所驱动

40.18-40.21

furthermore

此外


40.21-40.27

this is actually distributed transaction system

实际上，这是一个分布式事务系统

40.27-40.31

and we'll see more we'll hear more about distributed transaction systems later in the course

我们会在课程稍后的内容中看到更多关于分布式事务系统的相关内容

40.31-40.36

there are like a very common requirement in distributed systems

在分布式系统中，这是一个非常普遍的需求

40.36-40.40

 the basic story here is 

这里所要讲的是

4040-40.43

that frangipani makes it 

frangipani实现了这个需求

40.43-40.48

so that other workstations can't see my modifications until completely done by an operation

即直到我的修改完成后，其他的工作站才能看到我所做的修改

40.48-41.02

by first acquiring all the locks on all the data that I'm going to need to read or write during my operation and not releasing any of those locks until it's finished with the complete operation

在我执行操作的期间，首先我要去获取我所要读取或写入数据所需的全部锁，直到我完成了操作，我才会对这些锁进行释放



41.02-41.08

and of course following the coherence rule，written all of the modified data back to petal

Of course，这得遵循一致性协议，我们得将所有修改后的数据写回petal

41.08-41.16

so before I do an operation like renaming like moving a file from one directory to another

So，在我做这样的操作之前，比如，重命名，或者将一个文件从一个目录移动到另一个目录

41.16-41.21

 which after all modifies both directories and I don't want anybody to see the file being in either directory or something in the middle of the operation

当对这两个目录修改完后，我不想让其他人看到文件还在前一个目录里，或者是让他们看到操作过程中所发生的事情

41.21-41.24

 in order to do this 

为了做到这点









四十七  阅举报
11-03

41.24-41.32

frangipani first acquires all the locks for the operation

frangipani会先去获取该操作所需的所有锁

41.32-41.36

then do everything

接着，进行所有操作


41.36-41.50

 like all the updates right the frangipani so I write to petal 

比如进行所有的更新操作，并将修改后的数据写到petal上

41.50-41.51

and then release

接着，释放锁

41.51-41.57

 and of course this is easy 

Of course，这很简单


41.57-42.01

now you know since we already had the locking server any way in order to drive the cache coherence protocol

Now，你知道的，我们通过lock服务器获得了缓存一致性

42.03-42.08

 we buy just by you know making sure we hold all the locks for the entire duration of an operation

我们通过确保在执行一个多步操作的过程中的原子性，我们持有着该过程所需的全部锁（知秋注：比如移动一个文件夹，那就要获取包括文件夹中所有文件的锁）

42.08-42.15

we get these indivisible atomic transactions almost for free

因此，我们不费吹灰之力，得到了这些不可分割的事务（事务的原子性）



42.15-42.19

so an interesting thing to know 

So，我们对一件事情感兴趣

42.19-42.26

and that's basically all there is to say about making operations atomic and frangipani hold all the locks

这里所讲的都是关于如何让操作具备原子性，以及frangipani持有全部锁相关的事情

42.26-42. 29

 an interesting thing about this use of locks is that 

我们对锁使用这方面感兴趣的一点是

42.29-42.33

frangipani using locks for 2 almost opposite purposes

frangipani在两个几乎相悖的目的上使用了锁

42.33-42.35

for cache coherence

在缓存一致性方面

42.35-42.42

frangipani uses the locks to make sure that writes are visible immediately to anybody who wants to read them

frangipani通过使用锁来确保这些刚写入的数据能立刻被那些想要读取该数据的人所看到


42.42-42.47

 so this is all about using locks essentially to kind of make sure people can see writes

So，这块所讲的内容都是关于通过使用锁来确保人们可以看到最新写入的数据


42.47-42.55

 this use the blocks is all about making sure people don't see the writes until I'm finished with an operation

这块所讲的则是，我们要去确保，只有当我结束了我的操作，人们才能看到这些写入的东西

42.55-43.00

 because I hold all the locks until all the writes have been done

因为只有当所有的写操作完成后，我才会去释放锁

43.00-43.05

 so they're sort of playing an interesting trick here by reusing the locks

So，他们在这里通过重用这些锁来做到这个令我们感兴趣的小把戏

43.05-43.10

 they would have had to have any way for transactions in order to drive cache coherence

在事务方面，他们会想尽办法来做到缓存一致性

43.10-4313

all right 



43.13-43.16

so the next interesting thing is crash recovery 

So，我们感兴趣的下一件事情就是崩溃恢复

43.16-43.25

we need to cope with the possibility

我们需要去应对这种可能出现的情况

43.25-43.28

 the most interesting possibility is that

最令我们感兴趣的一种可能会发生的情况是

43.28-43.36

 a workstation crashes while holding locks and while in the middle of some sort of complex set of updates

即一台工作站在持有锁，并且在进行一组复杂的更新操作时，它发生了崩溃

43.36-43.38

that is a workstation acquired a bunch of locks

假设，这个工作站获取了一堆锁

43.38-43.42

 it's writing a whole lot of data to maybe create or delete files or something

它正在写入一大堆数据，比如：正在进行创建文件，或者删除文件之类的操作

43.42-43.52

 has possibly written some of those modifications back to petal because maybe it was gonna soon release locks or had been asked by the lock server to release locks

因为lock服务器可能已经要求它去释放锁，所以它可能已经将部分修改写回到了petal

43.52-43.57

 so it's maybe done some of the writes back to petal for its complex operations

So，它可能已经将这个复杂操作中部分写操作写回了petal

43.57-43.58

 but not all of them

但并不是全部的写操作

43.58-44.01

 and then crashes before giving up the locks

然后，在它将锁释放前，它崩溃了

44.01-44.06

 so that's the interesting situation for crash recovery

So，这就是崩溃恢复中我们所感兴趣的情况

44.06-44.12

so there's a number of things that that don't work very well for workstation crashes 

So，如果工作站发生了崩溃，那么就会有一大堆东西不能很好地工作


44.12-44.27

crashing with locks

在持有锁的时候，发生了崩溃

44.27-44.36

one thing that doesn't work very well is to just observe the workstations crashed and just release all its locks

我们不能很好地注意到这些工作站已经崩溃了，并释放它所持有的所有锁

44.36-44.40

 because then if it's done something

因为如果该工作站做完了某些事情

44.40-44.42

 like created a new file

比如创建了一个新文件

44.42-44.47

 and it's written the files directory entry its name back to petal

并且它将该文件目录条目下该文件的名字写回到了petal

44.47-44.52

but it hasn't yet written the initialized inode that describes the file

但它并没有将用来描述该文件的初始化inode写回petal

44.52-44.58

 the inode may still be filled with garbage or the previous file some previous files information in petal

这个inode里面放的可能是一些垃圾数据或者petal中之前的文件信息

44.58-45.01

 and yet we've already written the directory entry

并且我们还没有将它写入到目录条目中

45.01-45.07

 so it's not okay to just release a crashed file servers release of crash workstations locks 

So，在这种情况下，去释放（发生崩溃的）工作站所持有的锁是不ok的

45.07-45.15

another thing that's not okay is  to not release the crashed workstations locks 

另一件不ok的事情就是，不去释放这个已经崩溃的工作站所持有的锁

45.14-45.16

you know that would be correct

你知道的，这其实是正确的

45.16-45.22

because you know if it crashed while in the middle of writing out some of this modifications

因为你知道的，如果工作站进行修改操作到一半的时候，它崩溃了

45.22-45.25

 the fact that it hadn't written out all of them

也就是说，它并没有完成所有的修改

45.25-45.26

means it can't release its locks yet

这意味着，它还不能去释放它的锁

45.26-45.29

so simply not releasing its locks is correct

So，简单来讲，不去释放锁其实是正确的

45.29-45.33

 because it would hide the this partial update from any readers 

因为它会对任何要来读取这段数据的reader隐藏这个部分更新

45.33-45.39

and so nobody would ever be confused by seeing partially updated data structures in petal

So，这样也就没有人会因为在petal中看到这个部分更新的数据结构而感到奇怪了

45.39-45.39

 on the other hand 

另一方面

45.39-45.46

you know then anybody you needed to use those files would have to wait forever for the locks，if we simply didn't give them up 

你知道的，如果我们不释放这些锁，那么任何想去读取这些文件的人就得一直等下去，直到拿到这些锁

45.46-45.54

so we absolutely have to give up the locks in order that other workstations can use the system can use those same files and directories

So，我们肯定得将这些锁释放，以便其他工作站可以去使用该系统下的这些文件和目录

45.54-46.01

but we have to do something about the fact that the workstation might have done some of the writes but not all for its operations

所以我们得为这种情况做些什么，即该工作站已经完成了一些写操作，但并没有完成全部操作

46.03-46.15

so frangipani has like almost every other system that needs to implement crashed recoverable transactions uses write ahead logging

So，就和几乎所有其他系统一样，frangipani使用了预写式日志（write-ahead logging）来实现这种崩溃后可恢复的事务

46.15-46.31

this is something we've seen at least one instance of the last lecture with with aurora

其实我们在上节课讲Aurora的时候讲到过

46.31-46.34

 i was also using write-ahead logging 

它用的也是这种预写式日志（write-ahead logging）

46.34-46.40

so the idea is that 

So，它的思路是

46.40-46.47 ！！！

if a workstation needs to do a complex operation that involves touching updating many pieces of data in petal in the file system

如果一个工作站需要去执行一个复杂的操作，该操作涉及了要更新petal服务器上文件系统中的很多处数据

46.47-46.54

 the workstation well first before it makes any writes to petal

Well，首先，在该工作站要发送任何写请求给petal之前

46.54-47.03

 append a log entry to his log in petal describing the full set of operations  it's about to do 

它会先往petal中它的日志里面追加日志条目，该日志条目描述了它所要做的这完整的一组操作

47.03-47.10

and only when that log entry describing the full set of operations is safely in petal

只有当描述这组操作的日志条目已经安全落地到petal中

47.10-47.12

where now anybody else can see it

即所有人都能看到这条日志

47.12-47.17

 only then will the workstation start to send the writes for the operation out to petal

只有这样，工作站才会开始发送写操作给petal服务器

47.17-47.25

if it workstation could ever reveal even the one of its writes for an operation to the petal

如果工作站能看到它发送给petal的其中一个写操作

47.25-47.33

 it must have already put the log entry describing the whole operation all of the updates must already exist in petal 

那么，它必然已经将描述这所有更新操作的日志条目落地到了petal中

47.33-47.36

so this is very standard

So，这是一种非常标准的做法

47.36-47.38

 this is just a description of write ahead logging

这就是我要讲的预写式日志（Write-Ahead Logging）

47.38-47.48

but there's a couple of odd aspects of how frangipani implements write-ahead logging

但frangipani在实现预写式日志这上面有两个奇怪的方面

47.48-47.50

the first one is

第一点是

47.50-47.53

 that in most transaction systems 

在大部分事务系统中

47.53-48.01

there's just one log and all the transactions in the system you know they're all sitting there in

one log in one place

在这些系统中，它们只有一个日志，并且所有的事务都是放在这个日志中的

48.01-48.09

 so there's a crash and there's more than one operation that affects the same piece of data

So，一次崩溃或者多个操作都可以影响这段数据

48.09-48.15

 we have all of those operations for that piece of data and everything else right there in the single log sequence

我们将这段数据相关的所有操作以及其他东西都放在这单个日志序列中

48.15-48.16

and so we know for example 

So，例如

48.16-48.21

which is the most recent update to a given piece of data

对这段给定的数据所做的最近更新

48.21-48.22

but frangipani doesn't do that this

但frangipani并没有这样做


48.22-48.29

it has per workstation logs as one log per work station

它所使用的方案是，每个工作站都使用它自己的那份日志

48.29-48.33

and there's separate logs

即每个工作站所使用的日志都是分开的

48.33-48.37

 the other very interesting thing about frangipane's logging system is 

在frangipani日志系统中我们所非常感兴趣的另一件事情是

48.37-48.42

that workstation logs are stored in petal and not on local disk

工作站的日志都是存放在petal上，而不是工作站自己的本地磁盘上

48.42-48.45

 in almost every system that uses logging

在几乎所有使用日志的系统中

48.45-48.49

 the log is tightly associated with whatever computer is running the transactions 

日志和执行事务的那台电脑是紧密联系在一起的

48.49-48.52

that it's almost always kept on a local disk 

日志基本上都是存储在本地磁盘上的

48.52-48.57

but for extremely good reasons

但出于某种很好的理由

48.57-49.02

frangipani workstations store their logs in petal in the shared storage

frangipani中的工作站会将它们的日志存储到petal这个共享存储服务器中

49.02-49.05

 each workstation had its own sort of semi-private log 

每个工作站都有它自己的半私有日志

49。05-49.08

but it's stored in petal storage

但它是存放在petal上的

49.08-49.10

 where if the workstation crashes

如果工作站崩溃了

49.10-49.13

 its log can be gotten that by other workstations

那么其他工作站可以拿到它的日志


49.13-49.22

 so the logs are in petal

So，日志都是存放在petal中的

49.22-49.31

 and this is this is like separate logs for workstation stored somewhere else in public sort of shared storage

即每个工作站的日志都是放在这种公共共享存储服务器上的

49.31-49.33

so like a very interesting and unusual arrangement

So，这是一种非常有趣且不同寻常的安排

49.33-49.35

all right


49.35-49.40

so we kind of need to know roughly what's in the log what's in a log entry

So，现在我们需要粗略地知道日志中有什么，一条日志条目中有什么

49.51-49.56

and unfortunately the papers not super explicit about the format of a log entry

不幸的是，这篇paper并没有很明显地讲出一个日志条目的格式是什么



49.56-49.58

but we can imagine that

但我们可以想象一下

49.58-50.06

 the well the paper does say that each workstations log sits in a known place a known range of block numbers in petal

Well，paper中说过，petal会使用一些block来存储每个工作站的日志，这些block都是有编号的

50.06-50.07

 and furthermore

此外

50.07-50.12

that each workstation uses its log space on petal on a kind of in a circular way 

每个工作站会以环形的方式来使用petal上它所对应的日志空间（知秋注：即以一个环形队列的方式来使用这段分配的空间）

50.12-50.16

that it is all write log entries along from the beginning and

它会从日志空间的起点处写入日志

50.16-50.16

when it hits the end 

当它用完日志空间时（知秋注：即走到这个环形队列最后一个位置）

50.16-50.23

the workstation will go back and reuse its log space back at the beginning of its log area

工作站会回过头去复用它的日志区域

50.23-50.28

and of course that means  that workstations need to be able to you know clean their logs 

Of course，这意味着，工作站需要能够去清空它们的日志

50.28-50.34

so that sort of ensure that a log entry isn't needed before that space is reused

So，在复用该区域前，它们得确保该区域的这个日志条目不再被需要了（知秋注：文件数据已经落地，即该日志条目已经在petal中执行过了）

50.34-50.36

 and I'll talk about that in a bit

我之后会稍微讲下它

50.36-50.40

 but each a log consists of a sequence of log entries 

每个日志都包含了一系列日志条目


50.40-50.47

each log entry has a log sequence number

每个日志条目都有一个日志序列号

50.47-50.48

it's just an increasing number 

它是一个会增加的数字

50.48-50.52

each workstation numbers it's log entries 1 2 3 4 5 

每个工作站上的日志条目号是按照1 2 3 4 5这样编的

50.52-50.56

and the immediate reason for this 

这样做的直接原因可能是

50.56-50.57

may be the only reason for this

可能这样做的唯一理由是

50.57-50.59

 that the paper mentions 

paper中有提到

50.59-51.07

is that the the way that frangipani just detects the end of a workstation's log if the workstation crashes

如果工作站崩溃了，frangipani会去检测它日志的尾部

51.07-51.15

is by scanning forwards in its log in petal until it sees the increasing sequence stop increasing

它会在petal中对该工作站的日志进行扫描，直到它看到日志序列号不再增加为止

51.15-51.25

and it knows then that the log entry with the highest log sequence number must be the very last entry as it needs to be able to detect the end of the log

那么，它就知道这个拥有最高日志序列号的日志条目必然是它所能检测到的日志末尾处最后一个日志条目

51.25-51.28

 ok so we have this log sequence number

Ok，这里我们有日志序列号

51.28-51.39

and then I believe each log actually has an an array of descriptions of model aughh entry has an array of the descriptions of the modifications

我相信，实际上每个日志都有一个用于描述这些修改的数组

51.39-51.47

all the different modifications that were involved in a particular operation or an operation of some a file system system call

这里面包含了一个特定操作或某个系统调用所涉及的所有不同修改


51.47-51.55

 so each entry in the array is going to have a block number  it's a block number in petal 

So，在数组中的每个条目都会有一个petal上的block号


51.55-52.00

there's a version number

这里有一个版本号

52.00-52.02

 which we'll get to in a bit

这个我们之后会讲


52.02-52.11

and then there's the data to be written

接着就是要写入的数据

52.11-52.22

 and so there's a bunch of these required to describe operations that might touch more than one piece of data in the file system

So，我们需要通过一堆东西来描述这个操作，该操作需要涉及文件系统中的多个数据

52.22-52.23

one thing to notice is

有一件事要注意

52.23-52.38

 that the log only contains information about changes to metadata  that is to directories and inodes and allocation bitmaps in the file system 

日志只包含对文件系统中目录，inode以及allocation bitmap的元数据的修改信息

52.38-52.42

the log doesn't actually contain the data that is written to the contents of files

实际上，日志中并不包含写入到文件内容的数据

52.42-52.44

 it doesn't contain the user's data

它里面并不包含用户数据

52.44-52.51

it just contains information enough information to make the file systems structures recoverable after a crash 

这里面只包含了（当崩溃发生后）用来恢复文件系统结构的足够信息

52.51-52.54

so for example

So，例如

52.54-52.57

 if I create a file called F in a directory

如果我在目录中创建了一个文件F

52.57-53.04

 that's gonna result in a new log entry that has two little descriptions of modifications in it

日志中就会添加一个新的日志条目，它里面包含了两条关于修改的描述

53.04-53.08

 one a description of how to initialize the new files inode

其中一个描述是关于如何初始化新文件的inode

53.08-53.14

 and in another description of a new name to be placed in the new files directory

另一个描述则是关于该文件所在目录下的新名字

53.14-53.21

alright so one thing I didn't mention

So，有一个我没提到的东西是


53.21-53.24

so of course the log is really a sequence of these log entries

Of course，日志实际上就是由一系列日志条目所组成的

53.29-53.35

initially in order to be able to do modifications as fast as possible

一开始，为了能够尽可能快地进行修改

53.35-53.43

initially a frangipani workstations log is only stored inside the workstations own memory

一开始，frangipani工作站中的日志只会被存储在该工作站自己的内存中

53.43-53.46

 and won't be written back to petal until it has to be 

直到它不得不将日志写到petal中，它才会将日志写回petal

53.46-53.52

and that's so that you know writing anything including log entries to petal you know it takes a long time 

So，你知道的，将所有这些东西（包括日志条目）写回petal，这样做要花费很长一段时间

53.52-54.00

so we want to avoid even writing log entries back to petal as well as writing dirty data or modified blocks back to petal 

So，我们想去避免将日志条目，脏数据或者修改过的block写回petal

54.00-54.03

we'd like to avoid doing that as long as possible

我们想去尽可能避免做这种事情

54.03-54.15

 so the real full story for what happens when a workstation gets a revoke message from the lock server 

So，当工作站收到来自lock服务器的revoke消息时

54.15-54.21

saying that it has to give up a certain lock

lock服务器对这个工作站说，你得去释放这把锁


54.21-54.36

so on right now this is the same you know this is though conherence  protocols revoke message

So，这和一致性协议中的revoke消息是一样的

54.36-54.40

if the workstation gets a revoke message

如果工作站收到了一个revoke消息

54.40-54.42

the series of steps it must take is

它所必须做的步骤是

54.42-54.50

first it's write that's the write any parts of its log that are only in memory and haven't yet been written to petal

首先，它需要将某些部分的日志写到petal中，这些要写的日志只存在于它的内存中，并未写到petal

54.50-54.54

it's got to make sure as log is complete in petal 

它得去确保petal中的日志是完整的


54.54-55.00

as the first step so it writes its log to petal 

在第一步中，它要将它的日志写入petal中

55.00-55.06

and only then

然后


55.06-55.32

does it write any updated blocks that are covered by the lock that's being revoked，so write modified blocks just for that revoke to lock

So，我们要对revoke消息所对应的lock的那些修改的block进行写入

So，当进行revoke时，它要对锁相关的数据块进行写更新的操作




55.32-55.43

and then send a release message

然后，发送一个release消息给lock服务器

55.43-55.52

 and the reason for this sequencing and for this strict then is

这种执行顺序的原因是

之所以要以这种顺序的方式来严格执行的原因是

55.52-55.55

 that these modifications if we write them to petal

如果我们将这些修改写到petal中

55.55-56.00

you know their modifications to the data structure  the file system data structure 

你知道，这些修改是针对文件系统数据结构的



56.00-56.02

and if we were to crash midway through baby news box

如果我们在执行到一半的时候，崩溃了

56.02-56.04

 just as usual

通常情况下

56.04-56.15

 we want to make sure that some other workstation somebody else there's enough information to be able to complete the set of modifications that the workstation is made

我们希望去确保，其他工作站能拥有足够的信息来完成这个已经崩溃的工作站所要做的这组修改操作（知秋注：比如我创建一个文件，并往里面添加了内容，在崩溃的时候，往petal中写的日志条目中，这个文件创建的日志条目是完整的，那就可以用，某些正在进行修改且未做保存操作的日志条目就可以无视了）

56.15-56.16

 even though the workstation has crashed

即使这个工作站已经崩溃了

56.16-56.18

 and maybe didn't finish doing these writes

它可能也没有完成这些写操作


56.18-56.21

 and writing the log first

此处的第一步，即先将日志写到petal

56.21*-56.25

it's gonna be what allows us to accomplish it

这一步能够允许我们去实现我们的目标

56.25-56.27

these log records are a complete description of what these modifications are going to be

这些日志条目描述了这组完整的修改所要做的事情

56.27-56.33

 so first we you know first we write though the complete log to petal 

首先我们要将这个完整的日志写入到petal中

56.33-56.37

and then we workstation can start writing its modified blocks 

接着，工作站就可以开始对它要修改的block（数据块）进行写入

56.37-56.39

you know maybe it crashes maybe doesn't hopefully not 

在这期间，它可能会发生崩溃，但我们希望最好不要发生这种事情

56.39-56.42

and if it finishes writing as modified blocks 

如果它修改完了这些数据块

56.42-56.44

then it could send the release back to the lock server 

接着，它就可以发送release请求给lock服务器

56.44-56.47

so you know if my workstation has modified a bunch of files 

So，你知道的，如果我的工作站已经修改了一堆文件

56.47-56.50

and then some other workstation wants to read one of those files

接着，另一台服务器想来读取其中（修改过的）一个文件


56.50-56.51

 this is the sequence that happens 

这就是发生的顺序

56.51-56.56

lock server asked me for my locks， my workstation write back its log

lock服务器会找我拿锁，我的工作站就会将它的日志写回petal

56.56-57.01

then write back writes the dirty modified blocks to petal

接着，将这些修改过的数据块写回petal

57.01-57.03

 and only then releases 

只有这样才可以去释放锁

57.03-57.06

and then the other workstation can acquire the lock and read these blocks 

然后，其他工作站就可以去获取这把锁，并去读取这些block了

57.06-57.10

so that's sort of the non crash you know if a crash doesn't happen

So，如果没有发生崩溃的话

57.10-57.14

that is the sequence

那么这就是它发生的顺序

57.14-57.19

of course it's only interesting if a crash happens

Of course，我们只对发生崩溃的情况感兴趣

57.19-57.19

 yes

请问

57.35-57.36

okay


57.36-57.40

so for the log you're absolutely right it writes the entire log 

So，对于日志来说，你肯定得将完整的日志写到petal中

57.40-57.46

and yeah so so if if we get a revoke for a particular file

So，如果我们对某个文件Z发起了revoke请求

57.46-57.48

 the workstation will write its entire log 

工作站就会将它整个日志写入到petal中


57.48-57.56

and then only it's only because it's only giving up the lock for Z 

因为只有这样它才会释放文件Z所对应的锁

57.56-58.01

it only needs to write back data that's covered by Z

该工作站只需要将Z相关的数据写回到petal就行

58.01-58.06

So I have to write the whole log just the data that's covered by the lock that we needed to give up

So，我只需要将我们所需要释放的那把锁所对应的日志写回petal就行了

so，我只需要将想要数据对应锁的所有相关日志写回petal就行了（知秋注：比如，该锁在某一个复杂操作内，那就要包括这个复杂操作，保证原子性）

58.06-58.08

and then we can release that lock 

然后，我们就可以释放这把锁

58.08-58.13

so yeah you know maybe this writing the whole log might be overkill

So，你知道的，如果将整个日志写回petal，那么这样做可能过于糟糕了


58.13-58.18

 like you if it turned out you know so here's an optimization that you might or might not care about 

So，此处有一个优化，你们可能会注意到，也可能不会注意到


58.18-58.23

if the last modification for file Z for the lock were giving up is this one

对于我们所要释放的目标锁对应的文件Z来说，如果它最后的修改是这个


58.23-58.26

but subsequent entries in my log didn't modify that file

但我日志中之后的条目并没有涉及到对该文件的修改（知秋注：每个日志条目会对应一个原子性操作，一个日志条目会对应一个操作数组，该操作数组可能包含对多个文件的操作，通过这种方式来保证每条日志的原子性）

58.26-58.31

 then I could just write just this prefix of my in-memory log back to petal 

那么，我可以只将内存中和这个文件有关的日志写回到petal（知秋注：它这里应该会有一张以文件对应的lock命名前缀为key，以其相关日志条目号为value表，这样，可以通过锁命名前缀来找到对应的相关日志条目，方便写出到petal中）



58.31-58.34

and you know be lazy about writing the rest 

你知道的，将剩余部分延后写回到petal

58.34-58.37

and that might see me sometime

我们有时候就会看到这种做法

58.37-58.40

I might have to write the log back

我可能得将日志写回petal

58.40-58.43

 it's actually not clear I would save us a lot of time 

实际上，我说的可能并不清楚，但这样做会节省我们很多时间

58.43-58.45

we have to write the log back at some point anyway

在某个时候我们得将日志写回petal

58.45-58.49

 and yeah I think petal just writes the whole thing

我觉得petal会写入这些东西

==========================================================

58.49-58.53

 okay okay 



58.53-58.59

so now we can talk about what happens when a workstation crashes while holding locks

So，现在我们可以来讨论下当工作站持有锁的时候崩溃了，这会发生什么呢？

58.59-59.04

 right it's you know needs to modify something rename a file create a file whatever

你知道的，当你需要去进行修改数据，重命名文件，创建文件之类的操作时

59.04-59.07

 it's acquired all the locks it needs

它得去获取执行这些操作时所需要的锁

59.07-59.14

 it's modified some stuff in its own cache to reflect these operations

它得在它自己的缓存中进行修改，以此反映出执行这些操作所做的效果

59.14-59.19

 maybe written some stuff back to petal  and then crashed

它可能会将某些数据写回到petal，然后就崩溃了

59.19-59.21

may possibly midway through writing 

可能就是在写到一半的时候，就崩溃了

59.21-59.25

so there's a number of points at which it could crash

So，这里有几个可能会发生崩溃的时间点


59.25-59.27

right because this is always the sequence

因为我们始终是按照这个顺序进行的

59.27-59.35

 it always just always before writing modified blocks from the cache back

在工作站将缓存中这些修改过的block写回到petal之前

59.35-59.39

the frangipani will always have written its log to petal first

frangipani会始终先将它的日志写入到petal中

59.39-59.50

 that means that if a crash happens  it's either while the workstation is writing ts log back to petal，but before it's written any modified file or directory' blocks back

这意味着，如果当工作站将它的日志写回petal时发生了崩溃，或者在它将任何修改过的文件或者目录写回petal时发生了崩溃



59.50-59.52

or it crashes while it's writing these modified block back

或者，当它将这些修改过的数据块写回petal的时候，发生了崩溃（知秋注：即petal根据日志修改它内部的数据块时，ws崩溃了）


59.52-59.56

 but therefore definitely after it's written in its entire log 

因此，这肯定是在它将整个日志写回petal后发生的

59.56-59.58

and so that's a very important you know

So，这点很重要

59.58-1.00.02

 but or maybe the crash happened after it's completely finished all of this 

但也有可能，崩溃时发生在它执行完这些操作后

1.00.02-1.00.11

so you know there's only because of the sequencing there's only a limited number of kind of scenarios  we made me worried about for the crash

因为这里执行顺序的原因，所以我们需要关心的崩溃发生的原因数量有限

1.00.11-1.00.15

 okay 



1.00.15-1.00.20

so the workstations crashed its crashed you know for like to be exciting let's crash while Holdings locks

So，我们对工作站持有锁时发生崩溃这一情况感到很兴奋

1.00.20-1.00.24

 the first thing that happens the lock server sends it a revoke request

这里首先会发生的就是，lock服务器会向工作站发送一个revoke请求

1.00.24-1.00.26

and the lock server gets no response

然而，lock服务器并没有收到任何来自该工作站的响应

1.00.26-1.00.28

 all right that's what starts to trigger anything

这就是触发任何故障的原因所在

1.00.28-1.00.31

 where did nobody ever asked for the lock

如果没有任何人去获取这把锁

1.00.31-1.00.35

basically nobody's ever going to notice that the workstation crashed

简单来讲，这也就没有人注意到这个工作站崩溃了

1.00.35-1.00.41

so let's assume somebody else wanted one of the locks that the workstation had while it was crashed 

So，假设有人想去获取该工作组所持有的一把锁，但这个工作站崩溃了



1.00.41-1.00.43

and the lock server sent revoke 

lock服务器发送了一条revoke消息

1.00.43-1.00.46

and it will never get a release back from the workstation

但它永远不会收到该工作站所返回的release消息

1.00.46-1.00.48

after a certain amount of time has passed 

当过了一段时间以后（即超时）















五十  阅举报
11-04
1.00.48-1.00.53

and it turns out frangipani locks use leases for a number of reasons

事实证明，出于一些理由，frangipani在锁方面使用了lease（租约）

出于这些原因， frangipani 的lock使用了lease（租约）设定

1.00.53-1.00.55

  so you know after the lease time has expired

So，当超过了规定时间（lease time）

1.00.55-1.01.01

 the lock server will decide that the workstation must have crashed

lock服务器就会判定，这个工作站肯定崩溃了

1.01.01-1.01.02

 and it will initiate recovery 

它将开始做恢复的初始工作

1.01.02-1.01.03

and what that really means is 

这意味着

1.01.03-1.01.08

telling a different workstation the lock server will tell some other live workstation

lock服务器会告诉其他还活着的工作站



1.01.08-1.01.09

 look

看！

1.01.09-1.01.11

workstation one seems to have crashed 

工作站1似乎已经崩溃了

1.01.11-1.01.13

please go read it's log 

请去读取它的日志

1.01.13-1.01.19

and replay all of its recent operations to make sure they're complete

并重演它近来所有的操作，以确保它们都是完整的（知秋注：即每条日志所包含的操作都是完整的）



1.01.19-1.01.21

 and tell me when you're done

当你们完成的时候，请告诉我

1.01.21-1.01.23

 and only then the lock servers going to release the locks

只有这样，lock服务器才会去释放锁

1.01.23-1.01.29

so okay

Ok


1.01.29-1.01.34

and and this is the point at which it was critical that the logs are in petal

在这一步中，日志都会被写入petal

1.01.34-1.01.40

because some other workstation is going to inspect the crash workstations log in petal

因为其他工作站会去petal中检查已经崩溃的那个工作站的日志

1.01.40-1.01.43

all right 



1.01.43-1.01.46

so what are the possibilities

So，这里会有哪些可能呢？

1.01.46-1.01.49

one is that the workstation can crash before it ever wrote anything back

一种情况就是，工作站在将数据写回到petal前，它就崩溃了(知秋注：此时工作站还没开始往petal写数据，它就崩溃了)

1.01.49-1.01.50

 and so that means

这意味着


1.01.50-1.01.54

 this other work station doing recovery will look at the crash workstation this log 

其他进行恢复工作的工作站会去查看这个发生崩溃的工作站的日志

1.01.54-1.01.56

see that maybe there's nothing in it at all

它们可能会看到日志里面啥也没有

1.01.56-1.01.58

 and do nothing

于是，它们就什么也不做

1.01.58-1.02.00

 and then release the locks the workstation held

接着，就把该工作站所持有的锁给释放了

1.02.00-1.02.04

 now the workstation may have modified all kinds of things in its cache

Now，该工作站可能已经在它自己的缓存中修改了各种数据

1.02.04-1.02.08

 but if it didn't write anything to its log area 

 但如果它没有将任何东西写到它的日志区域


1.02.08-1.02.14

then it couldn't possibly have written any of the blocks that have modified during these operations

那么在执行这些操作的期间，它不可能将这些修改过的数据块写入到petal

那么它就不可能将它在执行这些操作期间对相关数据块的修改写入到petal

1.02.14-1.02.15

 right 



1.02.15-1.02.20

and so well we will have lost the last few operations that the workstation did 

So，我们可能会丢掉该工作站所做的最后几个操作

1.02.20-1.02.29

the file system is going to be consistent with the point in time before that crashed workstation started to modify anything

文件系统会将数据同步到（已经发生崩溃的）这个工作站开始修改任何数据之前的时间点的状态


1.02.29-1.02.34

because apparently the workstation never even got to the point where it was writing log entries

很明显，因为工作站永远不可能到达将日志条目写入petal的这一步

1.02.34-1.02.38

 the next possibilities of the workstation wrote some log entries the log area

下一种可能发生的情况就是，工作站会将一些日志条目写入日志区域的情况

1.02.38-1.02.40

 and in that case

在这个情况下


1.02.40-1.02.49

 the recovering workstation will scan forward from the beginning of log until it's stopped seeing the log sequence numbers increasing

进行恢复工作的工作站会从日志的开头开始扫描，直到它看到日志序号不再增加为止，即扫描完毕

1.02.49-1.02.52

 that's the point of where's the log must end

因为此处就是日志结束的地方

1.02.52-1.02.58

 and the recovering workstation we'll look at each of these descriptions of a change 

进行恢复工作的工作站就会去查看日志中每个修改描述

1.02.58-1.03.01

and basically play that change back into petal

简单来讲，它会将这些修改应用到petal中

1.03.01-1.03.02

 I'll say oh

我会说，Oh

1.03.02-1.03.05

you know there's certain block number in petal 

你知道的，在petal中有一个block号


1.03.05-1.03.08

needs to have some certain data written to it

我们需要往这里面写入一些数据

1.03.08-1.03.15

 which is just the same modification that the crashed workstation did in its own local cache

这里所做的修改和发生崩溃的工作站在它本地缓存中所做的一样

1.03.15-1.03.25

so the recovering workstation we'll just consider each of these and replay each of the crashed workstation‘s log entries back into petal

So，进行恢复工作的工作站会去查看发生崩溃的工作站上的每条日志条目，并对它们进行重演，将它们落地到petal中

1.03.25-1.03.31

 and when it's done that all the way to the end of a crashed workstations log 

当它处理完这个崩溃的工作站上的日志时

1.03.31-1.03.33

as it exists in petal

当这些日志落地到petal时

1.03.33-1.03.36

it'll tell the lock server

它会告诉lock服务器

1.03.36-1.03.39

 and the lock server will release the crashed workstations locks

lock服务器就会释放掉这个崩溃的服务器所持有的锁

1.03.39-1.03.51

and that will bring the petal up to date with some prefix of the operations the crash workstation had done before crashing

通过（已经发生崩溃的）这个工作站在崩溃前所做的操作的前缀，来让petal上的数据保持最新

1.03.51-1.03.52

 maybe not all of them 

可能并不是全部的操作

1.03.52-1.03.54

because maybe it didn't write out all of its log 

因为它可能并没有将它所有的日志都写入日志区

1.03.54-1.04.02

but the recovery workstation won't replay anything in a log entry unless it has the complete log entry in petal

但除非petal中这条日志条目是完整的，不然进行恢复工作的工作站不会去重演这个日志条目中的操作

1.04.02-1.04.08

 and so you know implicitly that means  there's gonna be some sort of checksum arrangement or something 

So，这里面其实也隐含了checksum之类的东西

1.04.08-1.04.14

so the recovery work station will know aha this log entry is complete and not like partially written

So，进行恢复工作的工作站就会知道，aha，这个日志条目是完整的，并不是只写了一半的那种

1.04.14-1.04.15

 that's quite important

这相当重要

1.04.15-1.04.22

because the whole point of this is to make sure that only complete operations are visible in petal

因为这里我们要去确保petal中只能看到完整的操作

1.04.22-1.04.25

and never a partial operation

它永远不会看到一个做到一半的操作

1.04.25-1.04.33

so it's also important that all the writes for a given operation or a group together in the log 

对于一个给定的操作来说，将所有的写操作聚合在一个日志条目中，这点很重要

1.04.33-1.04.40

so that on recovery the recovery workstation can do all of the writes for an operation or none of them 

So，进行恢复工作的工作站就可以执行该操作中的所有写操作，或者不执行这些写操作（因为事务不完整）

1.04.40-1.04.43

never half of them

它永远不会去执行这些只进行了一半的操作日志

其中的部分写操作

1.04.43-1.04.46

 ok



1.04.46-1.04.52

so that's what happens if the crash happens while the log is being written back to petal

So，这就是当日志被写回petal后，工作站发生崩溃时所发生的事情

1.04.52-1.04.57

 another interesting possibility is 

另一种我们所感兴趣的可能是

1.04.57-1.05.01

that the crash workstation crashed after writing its log

即这个要崩溃的工作站在将它的日志写入到petal后，它发生了崩溃

1.05.01-1.05.05

 and also after writing some of the blocks back itself and then crashed

也可以说，当它将一些数据块写回petal后，它发生了崩溃（知秋注：log日志的传输应该是一段一段offset传输过去的，可能在传输完某一段日志后，它崩溃了）

1.05.05-1.05.09

and then skimming over some extremely important details

接着，我们来看一些非常重要的细节

1.05.09-。05.10

 which I'll get to in a moment 

这个我之后会讲到


1.05.10-1.05.11

then what will happen is again

接着，这里所会发生的事情是

1.05.11-。05.16

the recovery workstation of course the recovery workstation doesn't know really the point at which the workstation crashed

进行恢复工作的这个工作站并不清楚这个已经崩溃的工作站发生崩溃的时间点（知秋注：崩溃的工作站已经将日志写到petal中，自己在执行Release时挂了，lock只会在timeout后才发通知让其他工作站执行恢复工作，或者在传输完一段日志后崩溃了，我们也不清楚它发生崩溃的时间点）

1.05.16-1.05.19

 all it sees is

它所看到的是

1.05.19-1.05.20

 oh here's some log entries

Oh，这里有些日志条目

1.05.20-1.05.24

 and again the recovery workstation will replay the log in the same way

再说一遍，进行恢复工作的工作站会以相同的方式来重演这些日志

1.05.24-1.05.30

 and more or less what's going on is 

这里大致所会发生的事情是

1.05.30-1.05.32

that yeah even if the modifications were already done in petal

即使有些修改已经落地到了petal

1.05.32-。05.35

we're replaying the same modifications here

我们也会去重新执行这些修改

1.05.35-1.05.38

  the recovery workstation were replaying the same modifications

进行恢复工作的工作站会重新执行这些修改操作

1.05.38-1.05.41

 it just writes the same data the same place

它会在相同的地方写入相同的数据

1.05.41-1.05.47

again and presumably not really changing the value for the writes that had already been completed

它并不会真正改变已经完成写入的值

1.05.47-1.05.50

 but if the crash workstation hadn't done some of its writes

但如果发生崩溃的这个工作站某条日志中的写操作并没有完成收尾工作（知秋注：某条日志涉及的写操作没有传输完毕）

1.05.50-1.05.56

 then some of these writes were not sure which will actually change the data to complete the operations

那么我们就无法确定是否要将这部分写操作应用于数据的修改，以完成该条日志涉及的这组操作

1.05.56-1.06.01

 all right



1.06.01-1.06.07

that's not actually as it turns out the full story 

我所讲的这些并不代表全部

1.06.07-1.06.10

and today's question

今天的问题是

1.06.10-1.06.13

sets up a particular scenario

假设我们有这样一个场景

1.06.13-1.06.18

for which a little bit of added complexity is necessary

我们要为这个场景增加点复杂度

1.06.18-1.06.24

in particular the possibility that 

这里所发生的可能情况是

1.6.24-1.06.30

the crashed workstation had actually gotten through this entire sequence before crashing

这个发生崩溃的工作站在发生崩溃前，它已经走完这些步骤了

1.06.30-1.06.32

and in fact released some of its locks 

事实上，它也释放掉了部分锁

1.06.32-1.06.41

or so that it wasn't the last person the last workstation to modify a particular piece of data 

So，它并不是那个最后修改这段数据的工作站

1.06.41-1.06.43

so an example of this is

So，我来举例说一下

1.06.43-1.06.45

what happens if we have some workstation 

假设我们有某个工作站


1.06.45-1.06.58

and it executes say a delete file it deletes a file say a file F and directory D 

它删除了目录d下面的一个文件f

1.06.58-1.07.10

and then there's some other workstation which after this delete，creates a new file with the same name

当删除完这个文件后，另一个工作站创建了一个名字相同的文件f

1.07.10-1.07.12

but of course it's a different file now

但显然，这是个不同的文件

1.070.12-1.07.25

so workstation 1 I'm sorry workstation two later create create same file same file name 

So，工作站2稍后创建了一个名字相同的文件f

11.07.25-1.07.28

and then after that workstation 1 crashes 

接着，等工作站2创建完这个文件后，工作站1就崩溃了

1.07.28-1.07.36

so we're going to need you to do recovery on workstation ones log 

So，我们就需要对工作站1的日志进行恢复

1.07.36-1.07.41

and so at this point in time you know maybe there's a third workstation doing the recovery

So，此时我们使用第三台工作站来进行恢复工作


1.07.46-1.07.55

so now workstation 3 is doing a recover on workstation ones log

So，现在工作站3就对工作站1的日志进行恢复工作

1.07.55-1.07.57

 so the sequence says

So，这里的顺序是

1.07.57-。07.58

 workstation 1 deleted a file 

工作站1先删除了一个文件

1.07.58-。07.59

workstation 2 created a file

接着，工作站2创建了一个文件

1.07.59-1.08.01

 workstation 3 does recovery

然后，工作站3进行恢复工作

1.08.01-1.08.07

 well you know could be that this delete is still in workstation ones log 

Well，你知道的，这个删除操作依然存在于工作站1的日志中


1.08.07-1.08.13

so workstation two may you know workstation 1 crash just going to go or station 3 is going to look at its log

So，你知道的，工作站1崩溃了。接着，工作站3会去查看它的日志

1.08.13-。08.18

that's going to replay all the updates in workstation ones log

它会去重演工作站1日志中所有的更新操作

1.08.18-1.08.25

this delete may the updates for this delete the entry for this delete may still be in workstation ones log

这个删除操作所对应的日志条目可能依然存在于工作站1的日志中

1.08.25-1.08.30

 so unless we do something clever， workstation 3 is going to delete this file 

So，除非我们设定了些聪明的逻辑，否则工作站3就会去删除这个文件

1.08.30-1.08.36

you know because this this operation erased the relevant entry from the directory

你知道的，因为这个操作从该目录相关的日志条目中移除掉了


1.08.36-1.08.40

thus actually erasing deleting this file

因此，实际上它会去删除（工作站2所创建的）这个文件

1.08.40-1.08.44

 that's it's a different file that workstation 2 created afterwards

这个文件是工作站2之后创建的另一个文件

1.08.44-1.08.45

 so that's completely wrong

So，这样做的话，那肯定就完蛋了

1.08.45-1.08.49

 alright what we want you know the how come we want is

你知道的，我们想要达到的是这种效果


1.08.49-1.08.51

you know workstation one deleted a file

工作站1删除了一个文件

1.08.51-1.08.52

 that file should be deleted

我们应该删除的是工作站1上的文件f

1.08.52-1.08.55

 but a new file that if her name should not be deleted

但具有相同名称的不同文件不应该被删除

1.08.55-1.08.59

 just because it was a crash in a restart  cuz this create happen after delete 

因为这个创建操作是在删除操作之后才发生的

1.08.59-1.09.06

all right so we cannot just replay workstation ones log without further thought

So，我们不能在没有深思熟虑的情况下，只是去重新走一遍工作站1的日志

1.09.06-1.09.15

 because it may it may essentially a log entry in workstations one log may be out of date by the time it's we played during recovery 

本质上来讲，在我们进行恢复的过程中，工作站1的日志条目可能会过时

1.09.15-1.09.20

some other workstation may have modified the same data in some other way subsequently 

其他的工作站可能随后以其他方式对同一个数据进行了修改

1.09.20-1.09.23

so we can't blindly replay the log entries

So，我们不能盲目地去重新执行这些日志条目

1.09.23-1.09.28

 and so this is  today's question

So，这就是今天的问题



1.09.28-1.09.32

and the way frangipani solves this is 

frangipani解决这个问题的方式是

1.09.32-1.09.39

by associating version numbers with every piece of data in the file system as stored in petal

它会使用版本号将存储在petal文件系统中的每个数据关联起来

1.09.39-1.09.47

and also associating the same version number with every update  that's described in the log

它也会将同一个版本号和日志中所描述的每个更新操作关联起来

1.09.47-

 so every log entry when well first I don't have any that's



1.09.55-1.10.00

you know say in petal 

在petal中

1.09.58-1.10.15

I'll just say in petal every piece of metadata every inode every every piece of data that's like the contents of a directory for example every block of data metadata in stored in petal has a version number

对于petal中所保存的数据来说（比如：元数据，目录内容，数据块之类的），它们都有一个版本号

1.10.15-1.10.21

when a workstation needs to modify a piece of metadata in petal

当一台工作站需要去修改petal中的一块元数据时

1.10.21-1.10.24

 it first reads that metadata from petal into its memory

首先，它会将petal中的这个元数据读取到它自己的内存中


1.10.24-1.10.28

 and then looks at the existing version number

接着它会去查看现有的版本号

1.10.28-1.10.32

and then when it's creating the log file describing its modification

然后，当它去创建描述该修改操作的日志文件时

1.10.32-1.10.37

 it puts the existing version number plus one into the log entry

它会对现有的版本号加一，然后放入日志条目中

1.10.37-1.10.43

 and then when it in if it does get a chance to write the data back

接着，如果工作站有机会将数据写回petal

1.10.43-1.10.47

it'll write the data back with the new increased version number

它会将数据和新增的这个版本号一起写回petal

1.10.47-1.10.49

 so if workstation hasn't crashed

So，如果工作站还没有发生崩溃

1.10.49-1.10.54

 and it did or if it did manage to write some data back before it crashed 

那么它就会设法在它发生崩溃前，将一些数据写回petal

1.10.54-1.11.04

then the version number has stored in petal for the effected metadata it will be at least as high or higher than the version numbers stored in the log entry

然后，对于这个受影响的元数据来说，这个已经存入petal的版本号至少要比它保存在日志条目中的那个版本号来得高（知秋注：因为其他工作站会去重演，重演时就会做版本号增加的操作）

1.11.04-1.11.08

 there will be higher some other workstations subsequently modified

其他工作站之后修改锁得到的版本号也会比这个刚存入的版本号来得高

1.11.08-1.11.11

 so what will actually happen here is 

So，这里实际上所会发生的事情是

1.11.11-1.11.16

that the workstation 3 we'll see is

工作站3会看到


1.11.16-1.11.26

 that the log entry for workstations one delete operation will have a particular version number stored in the log entry

工作站1所做的这个删除操作所对应的日志条目中会有一个特定的版本号

1.11.26-1.11.29

 that associated with the modification to the directory

将该版本号与对目录所进行的修改相关联


1.11.29-1.11.38

let's say and the log entry will say well the version number for the directory and the new version number created by this log entry is version number three

假设，这条日志条目所创建的目录的版本号是3

1.11.38-1.11.42

 in order for workstation two to subsequently change the directory

为了之后让工作站2在该目录下进行修改

1.11.42-1.11.45

that is to add a file  f

即在该目录下添加文件f

1.11.45-1.11.46

 in fact before it crashed

事实上，在工作站1发生崩溃之前

1.11.46-1.11.49

 the workstation one must have given up the lock in the directory

工作站1必然已经释放了该目录下的锁

1.11.49-1.11.54

 and that's probably why the log entry even exists in petal 

这可能就是为什么该日志条目存在于petal中的原因所在了

1.11.54-1.11.57

so workstation 1 must have given up the lock apparently

So，显然，工作站1必然已经释放了这把锁

1.11.57-。11.58

workstation two got the lock 

工作站2拿到了这把锁

1.11.58-1.12.02

and read the current metadata for the directory

并且它读取了该目录当前的元数据

1.12.02-。12.04

saw that the version number was three now

它看到现在的版本号是3


1.12.04-。12.09

 and when workstation two writes this data 

当工作站2写入这个数据时


1.12.09-1.12.18

it will set the version number of the directory in petal to be 4

它会将petal中这个目录的版本号设置为4

1.12.18-1.12.21

 ok so the that means

So，这意味着

1.12.21-1.12.26

 the log entry for this delete operation is going to have version number 3 in it 

该删除操作所对应的日志条目的版本号是3

1.12.26-1.12.33

now when the  recovery software on workstation 3 replays workstation ones log

现在，当工作站3上的恢复软件去重演工作站1的日志时

1.12.33-1.12.36

 it looks at the version numbers first 

它首先会去查看版本号

1.12.36-1.12.38

so it'll look at the version number the log entry

So，它会去查看日志条目中的版本号

1.12.38-1.12.43

it'll read the block from petal look at the version number in the block

它会从petal中读取该数据块，并查看该数据块中的版本号

1.12.43-。12.49

and if the version number in the block in petal is greater than or equal to the version number in the log entry 

如果petal中该数据块的版本号大于或等于日志条目中的版本号

1.12.49-。12.54

the recovery software will simply ignore that update in the log entry and not do it 

恢复软件就会忽略掉该日志条目中的更新操作，即不执行该更新操作

1.12.54-1.13.00

because clearly the block had already been written back by the crash workstation

很明显，因为发生崩溃的这个工作站已经将这个数据块写回过petal了

1.13.00-。13.03

 and then maybe subsequently modified by other workstations 

之后，该数据块可能会被其他工作站所修改

1.13.03-。13.11

so the replay is actually selectively based on this version number

So，实际上，恢复软件会根据版本号有选择地去进行重演日志

1.13.11-。13.24

 that replay it's a recovery only writes only replays are right in the log if that write is actually newer write in the log entry is newer than the data that's already stored in petal

如果该日志条目中写操作的版本要比已经落地到petal中的数据的版本号要来得更新，那么它就会重新执行这个日志条目

1.13.24-1.13.33

 so one sort of irritating question here maybe is 

So，这里比较烦人的问题是

1.13.33-1.13.38

that workstation three is running this recovery software 

当工作站3在运行恢复软件时

1.13.38-13.45

while other workstations are still reading and writing in the file system actively and have locks  and knows what to petal 

其他的工作站依然在对petal上的文件系统进行读取和写入操作，并且它们持有着执行操作时所需要的锁

1.13.45-1.13.54

so the replay it's gonna go on while workstation 2 which that doesn't know anything about the recovery still active

So，工作站2并不清楚工作站3依然在进行恢复工作


1.13.54-1.14.02

and indeed workstation two may have the lock for this directory while recoveries going on 

当工作站3在进行恢复工作的时候，工作站2可能持有着该目录所对应的锁

1.14.02-1.14.05

so recovery may be scanning the log

So，恢复软件可能正在对日志进行扫描


1.14.05-1.14.13

 and you no need to read or write this directories data in petal while workstation two still has the lock on this data

当工作站2依然持有着该数据的锁的情况下，你不需要对petal中该目录下的数据进行读取或者写入

1.14.13-。14.16

 the question is how you know how do we sort this out

这里的问题是，我们该如何解决这种情况

1.14.16-1.14.21

like one possibility which actually turns out not to work is

实际上，一种已经被证明不可行的方案是

1.14.21-1.14.31

 for the recovery software to first acquire the lock on anything that it needs to look at in petal before while it's replaying the log

在恢复软件去重演日志前，它得先去获取它在petal中要查看数据所对应的锁

1.14.31-1.14.37

 and the the you know one good reason why that doesn't work is

之所以这种做法不可行的其中一个很好的理由就是

1.14.37-1.14.42

 that it could be that we're running recovery after a system-wide power failure  for example 

比如说，当发生了系统级的供电故障后，我们进行恢复工作

1.14.42-1.14.45

in which all knowledge of who had what locks is lost

在这种情况下，对于锁的持有者，这方面的信息就全部丢失了

1.14.45-1.14.53

 and therefore we cannot write the recovery software to sort of participate in the locking protocol 

因此，我们不能将恢复软件放入我们的锁协议中

1.14.53-1.14.59

because you know all knowledge of what's locked my slot not locked may have been lost in the power failure

因为谁持有锁，或者谁没有锁，这些信息会因为供电故障的原因而丢失

1.14.59-1.15.01

um but luckily it turns out that 

但幸运的是，事实证明

1.15.01-1.15.12

the recovery software can just go ahead and read or write blocks in petal without worrying about sorry read or write data in petal without worrying at all about locks

恢复软件可以在不关心锁的情况下，对petal中的数据进行读写



1.15.13-1.15.14

and the reason is that

之所以可以这样做的原因是


1.15.14-1.15.21

 if the recovery software you know the recovery software wants to replay this log entry and possibly modify the data associated with this directory

如果该恢复软件想去重演该日志条目时，它可能去修改与该目录相关的数据

1.15.21-1.15.26

 it just goes ahead and reads whatever's there for the directory out of petal right now

它会从petal上读取该目录的数据

1.15.26-1.15.28

 and there's really only two cases

这里只会出现两种情况



1.15.28-1.15.31

either the crash workstation one had given up its lock

即，要么发生崩溃的工作站1释放了它的锁

1.15.31-1.15.34

 or it hadn't if it hadn't given up this lock

要么就是它还没释放这把锁

1.15.34-1.15.36

 then nobody else can have a directory locked

那么也就没有人可以获取到这个目录的锁

1.15.36-1.15.37

 and so there's no problem 

So，这样并没有什么问题

1.15.37-1.15.39

if it had given up its lock 

如果它已经释放了这把锁

1.15.39-1.15.42

then before I gave it up its lock

那么在我释放这把锁之前

1.15.42-1.15.48

it must have written that it's data for the directory back to petal

它必须将该目录下这些数据写回到petal

1.15.48-1.15.50

 and that means

这意味着

1.15.50-1.15.56

that the version number stored in petal must be at least as high as the version number in the crashed workstations log entry

保存在petal中的版本号必须至少得和已经发生崩溃的工作站中的日志条目里的版本号一样高才行

1.15.56-1.16.04

 and therefore when recovery software compares the log entry version number with the version number of the data in petal 

因此，当恢复软件对已经崩溃的工作站上日志条目中的版本号和petal中该数据所对应的版本号进行比较时

1.16.04-1.16.07

it'll see that the log entry version number is not higher 

它发现发生崩溃的工作站上的那个日志条目中的版本号并没有比petal中的版本号来得更高

1.16.07-1.16.11

and therefore won't replay the log entry

因此，我们也就不用去重演这条日志条目

1.16.11-1.16.15

 so yeah the recovery software will have read the block without holding the lock

So，恢复软件就可以在不需要持有锁的情况下去读取这个数据块了

1.16.15-1.16.16

but it's not going to modify it 

但它不会对该数据块进行修改

1.16.16-1.16.19

because if the locked was released 

因为如果这个锁被释放了

1.16.19-1.16.30

the version number will be high enough to show that the log entry had already been sort of processing to petal before the crashed workstation crashed

那么版本号就会足够的高，也就是说在该工作站发生崩溃前，这个日志条目就已经落地到了petal中

1.16.30-1.1632

 so there's no locking issue

So，这也就没有锁相关的问题了

1.16.32-1.16.37

 alright



1.16.37-1.16.45

this is the I've gone over that kind of main guts of what petal is up to

我已经讲完了petal的主要作用

1.16.45-1.16.51

 Nam it's cache coherence it's distributed transactions and it's distributed crash recovery

这里面包括缓存一致性，分布式事务以及分布式崩溃恢复

1.16.51-1.16.55

 the other things to think about are 

其他我们需要思考的东西是

1.16.55-。16.57

the the paper talks a bit about performance 

paper中提到了关于性能方面的一点东西

1.16.57-1.17.03

it's actually very hard after over 20 years to interpret performance numbers 

实际上，过了20年再来解释这个性能数字其实真的很难

1.17.03-1.17.09

because they brand their performance numbers on very different Hardware in a very different environment from you see today 

因为如果将它放在现在的硬件上去运行，所得到的性能数字比起过去来说，天差地别

1.17.09-1.17.10

roughly speaking

粗略地来讲

1.17.10-1.17.20

 the performance numbers they show or that as you add more and more frangipani and work stations ，the system basically doesn't get slower 

随着你添加的frangipani以及工作站的数量越来越多，简单来讲，系统并不会因此变慢

11.17.20-1.17.27

that is each new workstation  even if it's actively doing file system operations doesn't slow down the existing workstation 

即使工作站正在进行文件系统操作，它也不会去降低现有工作站的处理速度

1.17.27-

so in that sense

So，在这种情况下

1.17.29-1.17.32

the system you know at least for the application state look at 

至少对于应用程序状态来说

1.17.32-1。17.35

the system was giving them reasonable scalability

该系统赋予了它们合理的扩展能力

1.17.35-1.17.42

 they could add more workstations without slowing existing users down

在不降低现有用户速度的情况下，他们可以去添加更多的工作站

1.17.42-1.17.43

 looking backwards

总结一下

1.17.43-1.17.49

although frangipani is full of like very interesting techniques that are worth remembering 

虽然frangipani充满了各种我们非常感兴趣也值得记住的技术





1.17.50-1.17.57

it didn't have too much influence in on how on the evolution of storage systems

但它对存储系统的演进并没有太大影响

1.17.57-1.17.58

 part of the reason is

部分原因是

1.17.58-1.18.07

that the environment for which is aimed that is small workgroups people sitting in front of workstations on their desks and sharing files

它所提供的环境是为小团体而使用，人们坐在工作站前，通过它来共享文件

1.18.07-1.18.10

 that environment well it still exists in some places

现在依然有些地方使用这套环境

1.18.10-1.18.13

 isn't really where the action is in distributed storage

它并没有真正运用到分布式存储中



1.18.13-1.18.20

 the action the real action is moved into sort of big data center or big websites big data computations 

分布式存储主要运用于大型数据中心或者大型网站以及大型数据计算中



1.18.20-1.18.23

and there you know in that world

你知道的，在这个领域中

1.18.23-1.18.24

first of all

首先

1.18.24-1.18.27

the file system interface just isn't very useful compared to databases

比起数据库来说，文件系统接口并不是非常有用

1.18.27-1.18.31

 like people really like transactions in the big website world

比如说，人们很喜欢在大型网站中使用事务

1.18.31-1.18.34

 but they need them for very small items of data 

他们需要在很小的几条数据上使用事务

1.18.34-1.18.42

the kind of data that you would store in a database rather than the kind of data that would you would naturally store in a file system

我们会将这种类型的数据存放在数据库中，而不是存放在文件系统中

1.18.42-1.18.50

so you know some of this technology might sort of you can see echoes of it in modern systems 

So，你知道的，你现在还能在某些现代系统中看到这些技术的身影

1.18.50-1.18.52

but it usually takes the form of some database

但这通常是采用某种数据库的形式出现

1.18.52-1.18.54

the other big kind of storage this out there

另一种主要的存储是

1.18.54-1.19.00

 is storing big files as needed for big data computations

即根据需要来存储文件，以便用于大型计算

1.19.00-1.19.00

 like MapReduce 

比如：MapReduce

1.19.00-1.19.06

and indeed GFS is a you know to some extent looks like a file system

你知道的，GFS在某种程度上看起来就像是一种文件系统

1.19.06--1.19.09

 and is the kind of storage system you want for MapReduce

你想在MapReduce上使用这种分布式存储系统

1.19.09-1.19.13

but for GFS and for big data computations

但对于GFS和大型计算来说

1.19.13-1.19.19

 frangipane you know focus on local caching and workstations

你知道的，frangipani的重点是在本地缓存以及工作站上

1.19.19-1.19.24

and very close attention to cache coherence and locking

并且它将重心放在了缓存一致性和锁上面

1.19.24-1.19.28

 it's just not very useful you know for both the data read and write

对读取数据和写入数据来说，这并不是非常有用

1.19.28-1.19.34

typically caching is not useful at all right

通常来讲，缓存根本没有什么用

1.19.34-1.19.37

 if you're reading through ten terabytes of data

如果你要去读取10TB数据

1.19.37-1.19.41

 it's really counterproductive almost to cache it 

对这10TB数据进行缓存，其实是适得其反

1.19.41-

so a lot of the focus in frangipani is sort of time is pass it by a little bit 

So，frangipani中的很多东西其实有点过时了

-1.19.49

it's still useful in some situations 

但它在某些场景下依然有用

1.19.49-1.19.55

but it's not what people are really thinking about in designing new systems for 

但人们在设计新系统的时候并不会去考虑使用它

1.19.55-1.19.58

all right that is it

All right，我讲完了！



三十六  阅举报
