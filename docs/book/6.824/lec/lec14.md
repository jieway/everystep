14-01

0-0.05

I'd like to talk about farms today and optimistic concurrency control

今天我想来讨论下FaRM以及乐观锁并发控制

0.05-0.08

which is the main interesting technique that uses

这也是它所使用的技术中我们最感兴趣的一项

0.08-0.11

the reason we're talking about farm

我们讨论FaRM的原因是

0.11-0.17

 it's this the last paper in the series about transactions and replication and sharding 

因为它是事务和Replication以及数据分片这块中最后一篇paper

0.17-0.20

and this is still an open research area 

这依然是一个开放的研究领域

0.20-0.23

where people are totally not satisfied with performance 

人们在这块对性能依旧不满意

0.23-0.31

or in the kind of performance versus consistency trade-offs that are available 

或者说，在性能和一致性方面，人们想要做出一定的取舍

0.31-0.32

and they're still trying to do better

他们仍想做到更好

0.32-0.41

and in particular this particular paper is motivated by the huge performance potential of these new RDMA NICs

这些新的具备RDMA能力的NIC拥有巨大的性能潜力，从而激发了人们写出了这篇paper

0.41-0.43

so you may be wondering 

So，你们可能会在想

0.43-0.45

since we just read about spanner

因为我们只读过Spanner

0.45-0.47

how farm differs some spanner

与Spanner相比，FaRM有啥不同之处呢？

0.47-0.54

both of them after all replicate and they use two-phase commit for transactions of that level they seem pretty similar

在事务方面，它们俩都使用了复制和两阶段提交，从这个层面来看，它们非常相似

0.54-0.59

spanner  is a deployed systems been used a lot for a long time

Spanner这个系统已经被广泛使用很长一段时间了

0.59-1.02

its main focus is on Geographic replication

它的主要重心在于Geographic replication（地理区域级别的复制）

1.02-1.08

 that is to be able to have copies on there like east and west coasts and different data centers 

这使得我们能够在东海岸，西海岸的不同数据中心中建立副本

1.08-1.14

and be able to have reasonably efficient transactions that involve pieces of data in lots of different places

并且我们在处理涉及许多不同地方数据的事务的能力也很高效

1.14-1.23

 and the most innovative thing about it because in order to try to solve the problem of how long it takes to do two-phase commit over long distances  is

为了解决跨远程进行二阶段提交上的时间问题，其中最具创新的地方在于



1.23-1.31

 that it has a special optimization path for read-only transactions  using synchronized time 

对于只读事务，通过使用同步时间，它拥有一种特别的优化路线

1.31-1.36

and the performance you get out of spanner

对于Spanner所消耗的性能来说，

1.36-1.40

if you remember is that a read/write transaction takes 10 to 100 milliseconds

如果你还记得的话，一个读写型事务要花10到100毫秒才能完成

1.40-1.44

depending on how close together the different data centers are 

并且这也取决于不同数据中心的距离远近

1.44-1.51

farm makes a very different set of design decisions and targets a different kind of workloads

FaRm做出了一些非常不同的设计决策，并且针对的workload也非常不同

1.51-1.51

first of all

首先

1.51-1.53

 it's a research prototype

它是一种研究原型

1.53-1.55

so it's not by any means a finished product 

So，它并不是一个已经完善的产品

1.55-2.02

and the goal is to explore the potential of these new RDMA high speed networking hardware

其目标是在于探索这些新的RDMA高速网络硬件的潜力

2.02-2.07

so it's really still an exploratory system

So，它依然是一个探索性质的系统

2.07-2.10

 it assumes that all replicas are in the same data center

它所假设的情况是，所有的replica都在同一个数据中心

2.10-2.17

absolutely it doesn't wouldn't make sense the replicas were in even in different data centers let alone on East Coast versus West Coast

如果这些replica是在不同的数据中心，比如一部分在东海岸数据中心，一部分在西海岸数据中心，那么这就没有意义了

2.17-2.21

 so it's not trying to solve a problem that spanner is 

So，它并不会试着去解决Spanner所要解决的问题

2.21-2.24

about what happens if an entire data center goes down can I so get out my data

比如，如果整个数据中心都挂掉了，那我还能拿到我的数据吗

2.24-2.30

really that's does the extent that it has fault tolerance is for individual crashes or maybe 

它的容错能力的范围可能是针对单个服务器的崩溃

2.30-2.35

try to recover after a whole data center loses power and gets restored 

当一整个数据中心发生供电故障，之后供电恢复后，它会试着去恢复数据

2.35-2.38

again it uses this RDMA technique 

再说一遍，它使用了RDMA这项技术

2.38-2.39

which I'll talk about

这个我之后会讲

2.39-2.43

 but already may turns out to seriously restrict the design options

但这已经严重限制了设计选项

2.43-2.47

 and because of this， farm is forced to use optimistic concurrency control

因为这个原因，FaRM强制使用了乐观锁并发控制

2.47-2.50

 on the other hand

另一方面

2.50-2.54

the performance they get is far far higher than spanner

他们所获得的性能要远比Spanner高得多

2.54*-2.59

 farm can do a simple transaction in 58 microseconds

FaRm在58微秒内就可以完成一个简单事务


2.59-3.02

 and this is from figure 7 and section 6.3

关于这个你们可以去看下Figure 7以及Section 6.3

3.02-3.09

 so this is 58 microseconds versus to 10 milliseconds that the spanner takes 

比起Spanner处理一个简单事务需要10毫秒来说，FaRm处理一个简单事务只需要58微秒

3.09-3.12

is that's about a hundred times faster than spanner 

这要比Spanner快上100倍

3.12-3.18

so that's maybe the main huge differences that farm  how much higher performance

So，在性能方面这两者存在着巨大的差异，FaRm的性能比Spanner高出太多

3.18-3.22

but is not aimed at Geographic replication 

但它并不是用于解决Geographic replication的

3.22-3.28

so this you know farms performance is extremely impressive

So，FaRm的性能令人印象非常深刻

3.28-3.31

like how much faster than anything else

比如，它比其他系统快多少多少倍

3.31-3.34

another way to look at it is 

另一种看待它的方式是

3.34-3.36

that spanner and farm target different bottlenecks

Spanner和FaRm针对的是不同瓶颈

3.36-3.44

 and spanner are the main bottleneck the people worried about is the speed of light delays and network delays  between data centers

在Spanner中，人们所担心的主要瓶颈在于卫星信号传播上的延迟以及数据中心间的网络延迟

3.44-3.45

whereas in farm

然而，在FaRm中

3.45-3.53

the main bottlenecks that the design is worried about is is CPU time on the server's

该设计中存在的主要瓶颈在于服务器上的CPU时间

3.53-3.58

because they kind of wished away the speed of light and network delays by putting all the replicas in the same data center

因为他们希望通过将所有的replica放在同一个数据中心中，以此来消除卫星信号和网络传播所带来的延迟

3.58-3.59

all right



3.59-4.07

so sort of the background of how this fits into the 6824 sequence 

So，这就是为什么我们会在6.824中讲它的原因了

4.07-4.09

the setup in farm is that

FaRm中的设置是这样的

4.09-4.11

 you have it's all running in one datacenter

你将所有的replica放在同一个数据中心中运行

4.11-4.18

 there's a sort of configuration manager 

这里有一个配置管理器

4.18-4.21

this which we've seen before

这个我们以前就见过了

4.21-4.29

 and the configuration managers in charge of deciding which servers should be the primary in the backup before each shard of data 

配置管理器会去决定每个数据分片中哪台服务器是primary，哪台服务器是backup

4.29-4.31

and if you read carefully

如果你仔细读了paper

4.31-4.38

 you'll see that they use zookeeper in order to help them implement this configuration manager 

你就会知道，他们使用了ZooKeeper来帮助他们实现配置管理器

4.38-4.40

but it's not the focus of the paper at all

但这并不是这篇paper的重点


4.40-4.48

instead the interesting thing is that the data is sharded split up by key across a bunch of primary backup pairs

相反，我们感兴趣的东西是，他们根据key将数据进行分片并分散到一堆primary-backup pair上去


4.48-4.53

so I mean one shard goes on you know primary one server primary one backup one

So，我的意思是每个数据分片对应了一个primary服务器和一个backup服务器，这里是对应了P1和B1


4.53-4.57

 another shard one primary 2 backup 2 and so forth

另一个数据分片对应的则是P2和B2，以此类推

4.57-5.00

and that means that 

这意味着

5.00-5.04

anytime you update data you need to update it both on the primary and on the backup 

当你每次更新数据的时候，primary和backup上的数据你都得去进行更新

5.04-5.09

and these are not these primaries these replicas are not maintained by Paxos or anything like it 

这些replica并不是由Paxos之类的东西来进行维护的

5.09-5.10

instead 

相反

5.10-5.17

all the replicas of the data are updated whenever there's a change

当有一处发生了改变，那么该数据所属的所有replica都会进行更新

5.17-5.19

 and if you read，you always have to read from the primary

如果你要去读取数据，那么你始终得从primary处读取数据

5.19-5.22

 the reason for this replication of course is fault tolerance 

使用这种replication方式的理由当然就是为了具备容错能力

5.22-5.26

and the kind of fault tolerance they get is

他们所获得的容错能力是

5.26-5.30

that as long as one replicas of a given shard is available

只要给定数据分片中的一个replica是可用的

5.30-5.32

 then that shard will be available 

那么这个数据分片就是可用的

5.32-5.35

so they only require one living replica not a majority 

So，他们只需要一个活着的replica就行了，而不是大多数

5.35-5.41

and the system as a whole if there's say a data center while power failure

如果一个数据中心发生了供电故障

5.41-5.47

 it can recover as long as there's at least one replicas of every shard in the system

该系统中的每个数据分片里只要有一个replica可用，那么它就可以恢复过来

5.47-5.49

another way of putting that is

另一种方式是

5.49-5.52

if they have F plus one replicas

如果它们有f+1个replica

5.52-5.55

 then they can tolerate up to F failures for that shard

那么对于这个数据分片来说，它们就可以容忍f个replica发生故障

5.55-6.00

 in addition to the primary backup copies of each sort of data

除了每个数据分片所对应的primary-backup副本以外

6.00-6.03

 there's transaction coordinator that runs 

它还运行着事务协调器

6.03-6.10

it's maybe most convenient to think of the transaction coordinator is running as separate clients

为了方便起见，我们可以将事务协调器当做独立的client来看待

6.10-6.17

 in fact they run the transaction coordinator in their experiments on the same machines as the actual farm storage servers

事实上，在他们的实验中，他们将事务协调器和FaRm的存储服务器放在同一台机器上运行


6.17-6.24

 but I'll mostly think of them as being a separate set of clients

但我主要觉得它们会是一组独立的client

6.24-6.26

the clients are running transactions

这些client会去执行事务

6.26-6.36

 and the transactions need to read and write data objects that are stored in the sharded servers 

这些事务需要去对保存在数据分片上的数据对象进行读写

6.36-6.38

in addition

此外

6.38-6.41

these transaction these clients each client not only runs the transactions 

每个client除了执行事务以外

6.41-6.47

but also acts as that transaction coordinator for two-phase commit

它们还扮演了两阶段提交中事务协调器的角色

6.47-6.49

okay 



6.49-6.51

so it's the basic set up 

So，这就是它的基本设置

6.51-6.53

the way they get performance

这也是他们获得高性能的方式

6.53-6.58

because this really this is a paper all about how you can get high performance and still have transactions 

这就是paper中他们获得高性能的方式，同时它们依然可以对事务进行处理

6.58-7.02

one way they get high performances with sharding

他们获得高性能的其中一种方式就是对数据进行分片






7.02-7.11

in a sense the main way is through sharding 

某种意义上来讲，他们所使用的主要方式就是数据切片

7.11-7.12

in experiments 

在实验中

7.12-7.16

they shard their data over 90 ways for 90 servers or maybe it's 45 ways 

他们将他们的数据进行分片并拆分到90台服务器上，或者可能是45台服务器上

7.16-7.23

and not just if as long as the operations and different shards are more or less independent of each other 

只要这些操作和不同的数据分片彼此或多或少独立

只要在不同的数据分片上所进行的这些操作是彼此独立的

7.23-7.26

that just gets you an automatic 90 times speed up

那么你就能获得90倍左右的处理速度

7.26-7.30

because you can run whatever it is you're running in parallel on 90 servers

因为不管你执行的是什么操作，你都可以通过90台服务器来并行处理

7.30-7.33

this huge went from sharding 

这就是数据分片所带来的巨大好处


7.33- 7.37

another trick they play in order to get good performance

为了获得良好的性能，他们所玩的另一个技巧是

7.37-7.41

 as the data all has to fit in the RAM of the servers 

他们将所有的数据都放在了服务器的RAM中

7.41-7.43

they don't really store the data on disk

他们并没有真的将数据存放在磁盘上

7.43-7.46

it all has to fit in RAM

而是将数据都放在了RAM中

7.46-7.46

 and that means

这意味着

7.46-7.48

of course you can get out of pretty quickly 

你的速度就会变得非常快

7.48-7.51

another way that they get high performance is

他们获得高性能的另一种方式是

7.51-7.54

 they need to tolerate power failures

他们需要去容忍供电故障

7.54-7.55

 which means  that

这意味着

7.55-7.57

 they can't just be using RAM 

他们不能只使用RAM

7.57-7.59

because they need to recover the data after a power failure

因为当发生了供电故障，他们得去对数据进行恢复

7.59-8.02

 and RAM loses contents on a power failure

因为供电故障的缘故，RAM会丢失它里面的数据

8.02-8.11

 so they have a clever non-volatile Ram scheme for having the contents of RAM the data survived power failures 

So，他们使用了一种更好的NVRAM（非易失性RAM）方案来解决RAM因供电故障导致数据全丢的情况

8.11-8.15

this is in contrast to storing the data persistently on disk

这与将数据持久存储在磁盘上相反

8.15-8.17

its is much faster than disk 

这种做法要比使用磁盘来得更快

8.17-8.24

um another trick they play is they use this RDMA technique 

他们所使用的另一个技巧就是使用了RDMA技术

8.24-8.39

which essentially clever network interface cards that allow that accept packets that instruct that then that we're interface card to directly read and write the memory of the server without interrupting the server

简单来讲就是，在不对服务器发出中断信号的情况下，他们通过网络接口卡（NIC）接收数据包并通过指令直接对服务器内存中的数据进行读写


8.39-8.47

 I know that trick they play is what you often call kernel bypass

他们所玩的这种技巧通常叫做kernel bypass

8.47-8.50

which means

这意味着

8.50-9.01

 that the application level code can directly access the network interface card without getting the kernel involved 

在不涉及内核的情况下，应用层代码可以直接访问网络接口卡

9.01-9.01

okay 



9.01-9.08

so these are all the sort of clever tricks we're looking at out pour it that they used to get high performance 

So，我们所看的这些技术就是他们用来获得高性能的方式

9.08-9.12

and I'll talk about we've already talked about sharding a lot

关于数据分片这块我们已经 讨论过很多了

9.12-9.14

 but I'll talk about the rest in this lecture

但我会在这节课中讨论剩下的内容

9.14-9.16

okay 



9.16-9.20

so first I'll talk about non-volatile Ram

So，首先我要讨论下非易失性RAM

9.20-9.29

 I mean this is really a topic that doesn't doesn't really affect the rest of the design directly

这个主题并不会直接影响整个设计的其他部分

9.29-9.31

 as I said

正如我说的

9.31-9.35

 all the data for farm is stored in RAM

FaRm中所有的数据都是存放在RAM中的

9.35-9.38

 when you update it when a client transaction updates a piece of data

当一个client所执行的事务对一份数据进行更新时

9.38-9.39

 what that really means is

这意味着

9.39-9.45

 it reaches out to the relevant servers that store the data and causes those servers to modify the whatever object is

它会让存储这该数据的相关服务器去对数据对象进行修改

9.45-9.50

the transaction is modifying to object modify it right in RAM 

事务会在RAM中对该数据对象进行修改

9.50-9.53

and that's as far as the writes get they don't go to disk 

这样他们就无须跑到磁盘上对数据进行修改了

9.53-9.59

and this is you know contrast to your raft implementations for example which spent a lot of time persisting data to disk

与诸如raft之类的实现相比，这样就省去了将数据落地到磁盘时所花的大量时间

9.59-10.02

there's no persisting and in farm 

在FaRm中并不需要将数据持久化到磁盘

10.02-10..05

this is a big win

这是一个很大的好处

10.05-10.08

 writing stuff in RAM write a write to ram takes about 200 nanoseconds

将数据写入RAM只需要花200纳秒

10.08-10.15

 whereas a raid even to a solid state drive which is pretty fast a right to a stall seek drive takes about a hundred microseconds 

虽然固态硬盘的速度很快，但要将数据写入固态硬盘这得花100微秒

10.15-10.19

and a write to our hard drive takes about ten milliseconds

如果是普通的机械硬盘，那就得花10毫秒了

10.49-10.27

 so being able to write to ram is worth many many orders of magnitude and speed for transactions that modify things

So，从各种方面来说，将数据写入RAM还是很值的，比如事务修改数据的速度会大大提高

10.27-10.29

 but of course ram loses its content and a power failure 

Of course，如果遇上供电故障，RAM就会丢失它里面的东西

10.29-10.33

so it's not persistent by itself 

So，它并不是持久化的（无法将数据永久保存）

10.33-10.34

as a side

从一方面来看

10.34-10.47

you might think that writing modifications to the RAM of multiple servers that if you have replica servers and you update all the replicas，that might be persistent enough 

如果我们有多个replica服务器，那我们就得对这多台服务器RAM中的数据进行更新，持久性可能就很高

10.47-10.51

and so after all if you have F +1 replicas

So，如果你有f+1个replica

10.51-10.53

you can tolerate up to F failures 

那么你最多可以容忍f个replica发生故障

10.53-10.58

and the reason why just simply writing to Ram on multiple servers is not good enough is

将数据写入多个服务器上的RAM并不是那么好的原因是

10.58-11.02

that a site-wide power failure will destroy all of your servers

站点范围内的供电故障会摧毁你所有服务器上的数据

11.02-11.07

 and thus violating the assumption

因此，这就违反了我们所做的假设

11.07-11.10

 that the failures are in different servers are independent

即不同服务器所发生的故障都是互不相干的

11.10-11.12

 so we need a scheme 

So，我们需要一种方案

11.12-11.16

that it's gonna work even if power fails to the entire data center

即使整个数据中心的供电都出现了问题，系统依然能够工作

11.16-11.23

so what farm does is

So，FaRm所做的事情是

11.23-11.26

 it it puts a battery a big battery in every rack

它在每个机架上都放了一个大电池

11.26-11.29

 and runs the power supply system through the  batteries 

它将这些电池组成了一个供电系统，来为服务器进行供电

11.29-11.32

so the batteries automatically take over if there's a power failure

So，如果发生供电故障，这些电池会自动接手对服务器的供电工作

11.32-11.34

 and keep all their machines running

并让所有的机器继续运行

11.34-11.36

 at least until the battery fails 

至少这可以撑到电池出现问题为止（比如没电了）

11.36-11.39

but of course you know the battery is not very big 

但你知道的，这些电池的容量并不大

11.39-11.44

it may only be able to run their their machines for say 10 minutes or something

它只能够让他们的机器再坚持个10分钟左右

11.44-11.50

so the battery by itself is not enough to make this the system be able to withstand a lengthy power failure

So，电池自身并不足以让系统能够应对持续时间很长的供电故障

11.50-11.51

 so instead

So，相反

11.51-11.55

 the battery system when it sees that the main power is failed 

当电池系统看到主电源出现了故障

11.55-11.58

the battery system while it keeps the server's running

电池系统会让服务器继续运行

11.58-12.11

 also alerts the server's all the servers and with some kind of interrupt or message telling them look the powers just failed you know you only got 10 minutes left before the batteries fail also

接着，它就会向所有的服务器发出消息，并说，直到电池耗尽前，你们还剩下10分钟了

12.11-12.12

 so at that point

So，此时

12.12-12.20

the software on farms servers copies all of rain active stops all processing it for farm first

FaRm服务器上的软件会先去停止FaRm所做的所有操作

12.20-12.26

 and then copies each server copies all of its RAM to a solid-state drive attached to that server

接着，它会将每台服务器RAM中的所有数据复制到该服务器所挂载的固态硬盘上

12.26-12.29

 I'm what wished could take a couple minutes

我希望这个过程只需要花几分钟就好了

12.29-12.31

 and once all the RAM is copied to the solid-state drive

一旦RAM中所有的数据都复制到固态硬盘中

12.31-12.34

 then the machine shuts itself down and turns itself off 

然后，机器就会关机

12.34-12.41

so if all goes well there's a site-wide power failure ，all the machines save their RAM to disk

So，如果遇上大范围的供电故障，所有的机器会将它们RAM中的数据保存到磁盘

12.41-12.45

when the power comes back up in the datacenter，

当数据中心的供电恢复时

12.45-12.47

 all the machines will when they reboot

所有的机器就会进行重启

12.47- 12.53

 will read the memory image that was saved on disk restored into RAM

它们就会去读取保存在磁盘上的内存镜像，并恢复RAM中的数据

12.53-12.56

 and but there's some recovery that has to go on 

但这里也需要去做一些恢复工作

12.56-13.01

but basically they won't have lost any of their persistent state due to the power failure

简单来讲，它们不会因为供电故障而丢失它们已经持久化的状态

13.01-13.03

 and so what that really means is

So，这意味着

13.03-13.07

that the farm is using conventional Ram

FaRm使用的还是传统的RAM

13.07-13.17

but it's essentially made the RAM non-volatile being able to survive power failures with the this trick of using a battery

但本质上来讲，使用后备电源来做到RAM的非易失性，使得数据能够从供电故障中存活下来

非易失性RAM以及后备电源就能够从这种供电故障中存活下来

13.17-13.22

 having a battery alert the server having the server store the RAM content to solid-state drives 

后备电源系统会向服务器发出警告，让它们将RAM中的数据存储到服务器所挂载的固态硬盘中

13.22-13.26

any questions about the nvram scheme 

对于NVRAM这种方案，你们有任何问题吗？



13.26-13.34

alright this is a is a useful trick

这是一个很有用的技巧

13.34-13.42

 but it is worthwhile keeping mind that it really only helps if there's power failures

但要记住的是，这只对供电故障有效

13.42-13.51

that is the you know the whole sequence of events only it gets set in train when the battery notices that the main power is failed

也就是说，我们知道整个事件一个顺序，即只有当后备电源注意到主电源发生了故障，它才会顶替上去

13.51-13.53

 if there's some other reason causing the server to fail

如果有一些其他原因导致服务器发生了故障

13.53-13.55

 like something goes wrong with the hardware

比如硬件故障

13.55-13.58

or there's a bug in the software that causes a crash 

或者软件中存在的bug导致的崩溃

13.58-14.03

those crashes the non-volatile Ram system is just nothing to do with those crashes

使用NVRAM的系统对这些崩溃束手无策

14.03-14.08

 those crashes will cause the machine to reboot and lose the contents of its RAM 

这些崩溃会导致机器重启，并丢失它RAM中的所有内容

14.08-14.10

and it won't be able to recover them 

并且它没法恢复这些数据

14.10-14.15

so this NVRAM scheme is good for power failures but not other crashes 

So，这种NVRAM方案适用于供电故障，但对其他类型的崩溃并不适用

14.15-14.22

and so that's why in addition to the NVRAM farm also has multiple copies multiple replicas of each shard

So，这就是为什么除了使用NVRAM以外，FaRm还得为每个数据分片建立多个replica的原因所在了

14.22-14.35

 all right so this NVRAM scheme essentially eliminates persistence writes as a bottleneck in the performance of the system

本质上来讲，NVRAM方案消除了系统在持久化写操作方面的性能瓶颈

14.35-14.39

 leaving only as performance bottlenecks the network and the CPU 

那剩下的性能瓶颈就在网络和CPU这两个方面了

14.39-14.40

which is what we'll talk about next

这也是我们接下来要讲的东西

14.40-14.42

 ok so there's a question 

So，这里有一个问题

14.42-14.51

if the datacenter power fails and farm lose everything for solid-state drive 

如果数据中心出现了供电故障，并且FaRm丢失了固态硬盘中的所有数据

14.51-14.57

would it be possible to carry all the data to a different data center and continue operation there

我们是否有可能将所有数据转移到另一个数据中心并继续操作？

14.57-15.00

 in principle absolutely

从原则上来讲，这是绝对可以做到的

15.00-15.08

in practice I think would be would all certainly be easier to restore power to the data center 

在实战中，我觉得还是恢复数据中心的供电会来得比较容易

15.08-15.11

then to move the drives

然后再移动磁盘上的数据

15.11-15.14

 the problem is there's no power and the power in the dated old data center

现在的问题是，老的数据中心没有电了

15.14-15.18

 so you'd have to physically move the drives and the computers

So，那么你就得通过物理手段来移动磁盘以及服务器

15.18-15.20

 maybe just the drives to the new data center 

可能只需要将磁盘转移到新的数据中心就行了

15.20-15.22

so this was if you wanted to do this 

So，如果你想要这样做的话

15.22-15.24

it might be possible

这种做法确实是可能的（Amazon靠货车迁移数据）

15.24-15.29

 but it's certainly not it's not what the farm designers had in mind 

但这并不是FaRm的设计人员所考虑的情况

15.29-15.31

they assumed the power be restored

他们假设的是电源会恢复的情况

15.31-15.34

okay 



15.34-15.36

so that's NVRAM

So，这就是NVRAM的相关内容

15.36-15.41

 and at this point we can just ignore nvram for the rest of the design

此时，在FaRm中剩下的设计里面，我们可以将NVRAM给忽略掉

15.41-15.50

it doesn't really interact with the rest of the design except that we know we're have to worry about writing data to disk 

除了我们所关心的将数据写入磁盘以外，设计中的其他部分都不会和它有所交互

15.50-15.53

all right



15.53-15.57

so as I mentioned   the remaining bottlenecks 

So，正如我提到的那些剩下的性能瓶颈

15.57-16.00

once you eliminate having a great data to disk for persistence

一旦你消除了将数据持久化到磁盘的这个问题

16.00-16.03

 remaining bottlenecks have to do with the CPU and the network

那我们所需要应对的其他性能瓶颈就在CPU和网络这块了

16.03-16.11

 in fact in farm and indeed a lot of the systems that i've been involved with

事实上，在FaRm以及我所参与的许多系统中

16.11-16.17

 the a huge bottleneck has been the cpu time required to deal with network interactions

它们中存在了一个巨大的瓶颈，即我们需要通过CPU时间来处理网络交互

16.17-16.22

 so now we're can CPU are kind of joint bottlenecks here

So，此处CPU就成了性能上的一个综合瓶颈

16.22-16.25

farm doesn't have any kind of speed of light network problems

FaRm不存在任何网速上的问题

16.25-16.34

 it just has the problems or it just spends a lot of time eliminating bottlenecks having to do is getting network data into and out of the computers 

设计人员花了大量的时间和精力来消除服务器间数据交换的性能瓶颈

16.34-16.36

so first 

So，首先

16.36-16.38

as a background

我想先描述下背景

16.38-16.42

I want to lay out what the conventional architecture is

我想先说下这里的传统架构是什么

16.42-16.52

 for getting things like remote procedure call packets between applications and on different computers

比如不同服务器上应用程序间的RPC数据包的交换



16.52-16.57

just so that can we have an idea of why this approach that farm takes is more efficient 

这样我们就能知道FaRm所使用的这种方案为什么更为高效

16.57-16.59

so typically what's going on is 

So，通常这里所做的事情是

16.59-17.05

on one computer that maybe wants to send a procedure call message

一台服务器可能想去发送一条RPC消息


17.05-17.07

 you might have an application

你可能会有一个应用程序

17.07-17.12

 and then the application is running in user space

该应用程序在用户态空间中运行着


17.12-17.15

there's a user kernel boundary 

用户态和内核态之间存在着一条界限

17.15-17.21 ！！！！！！！

here the application makes system calls into the kernel which are not particularly cheap in order to send data

为了发送数据，应用程序得调用内核中的系统调用，但这样做的成本并不低

17.21-17.26

 and then there's a whole stack of software inside the kernel involved is sending data over the network

然后，在内核中还存在着一大堆软件，我们要通过它们在网络中发送数据

17.26-17.38

 there might be what's usually called a socket layer that does buffering which involves copying the data which takes time

通常，这会有一个叫做Socket层的东西，它的作用是对数据进行缓存，这涉及到了复制数据，这个操作需要花些时间


17.38-17.42

 there's typically a complex TCP the protocol stack 

通常这里还会有一个复杂的TCP协议栈

17.42-17.48

that knows all about things like retransmitting and sequence numbers and checksums and flow control

它知道所有关于重传，序列化，checksum以及flow control的所有相关事情

17.48-17.52

there's quite a bit of processing there

它要在这里进行很多处理

17.52-17.53

at the bottom

在底部

17.53-17.58

 there's a piece of hardware called the network interface card 

这里有一个叫做网络接口卡（NIC）的硬件

17.58-18.06

which is has a bunch of registers that the kernel can talk to can configure it 

内核可以对它上面的一堆寄存器进行通信和配置

18.06-18.09

and it has hardware required to send bits out over the cable onto the network

它上面还拥有能够通过电缆将bit信息发送到网络上的硬件


18.09-18.14

and so there's some sort of network interface card driver in the kernel 

So，在内核中存在着某种网络接口卡驱动

18.14-18.23

and then all self respecting that we're gonna network interface cards use direct memory access to move packets into and out of host memory 

接着，它所做的就是通过网络接口卡直接往主机内存读取和写入数据包

访问并移动主机内存中的数据包

18.23-18.29

so there's going to be things like queues of packets that the network interfaces card has DMA into memory

这里会有一个队列之类的东西，它里面放着网络接口卡通过DMA访问内存时所拿到的数据

18.29-18.31

the waiting for the kernel to read

并等待内核去读取这个队列中的数据包

18.31-18.36

and outgoing queues of the packets that the kernel would like then that network interface card to send as soon as convenient 

然后这里还有一个用于对外发送数据的数据包队列，这样的话，网络接口卡可以尽可能方便地将数据发送出去

18.38-18.41

all right so you want to send a message like an RPC request

So，你想去发送一条RPC请求之类的东西


18.41-18.45

 let's go down from the application through the stack

应用程序会一步步往下走

18.45-18.47

 network interface card sends the bits out on a cable

网络接口卡会通过网线发送bit信息

18.47-18.50

 and then there's the reverse stack on the other side

接着，在另外一边会有一个相反的栈

18.50-18.55

 There's an network interface Hardware here 

这里有一个网络接口卡


18.55-18.59

in the kernel then network interface might interrupt the kernel

接着，网络接口卡会发送一个中断信号给内核

18.59-19.03

 kernel runs driver Code which hands packets to the TCP protocol

内核会通过驱动程序将数据包发送给TCP协议进行处理

19.03-19.06

 which writes them into buffers

然后这些数据包会被写入buffer

19.06-19.09

 waiting for the application to read them

并等待应用程序去读取这些数据



19.09-19.17

at some point the application gets around reading them makes system calls into the kernel copies the data out of these buffers into user space

在某个时间点，应用程序会去读取这些数据，通过系统调用将内核buffer中的数据拷贝到用户态空间里

19.17-19.30

this is a lot of software it's a lot of processing and a lot of fairly expensive CPU operations like system calls and interrupts and copying data 

这里面存在着大量的软件，大量的处理以及很多十分消耗CPU资源的操作，比如：系统调用，interrupt中断以及复制数据

19.30-19.30

as a result

因此

19.30-19.34

so classical Network communication is relatively slow 

So，传统的网络通信的速度是比较慢的

19.34-19.38

it's quite hard to build an RPC system with the kind of traditional architecture

我们通过这种传统架构是很难构建出一个这种RPC系统，即

19.38-19.44

that can deliver more than say a few hundred thousand RPC messages per second 

在这种架构下很难做到每秒钟传输数十万条RPC消息

19.44-19.47

that might seem like a lot

这可能看起来很多

19.47-19.52

 but it's orders of magnitude too few for the kind of performance that farm is trying to target

但对于FaRm所要达到的性能目标来说，还是太少了



四十七  阅举报
14-02
19.52-20.04

and in general that couple hundred thousand RPC per second is far far less than the speed that the actual network hardware like Network wire in the network interface card is capable of 

基本上来讲，每秒钟传输数十万条RPC消息远远小于网络接口卡通过网线传输的上限



20.04-20.08

typically these cables run at things like 10 gigabits per second

通常来讲，这些网线传输的速度是每秒10Gbit

数据库通常需要使用的消息的大小很小，编写可以生成这种消息的RPC软件非常困难

20.08-20.30

 it's very very hard to write RPC software that can generate small messages of the kind that databases often need to use ，it's very hard to write software in this style that can generate or absorb anything like 10 gigabits per second of messages 

以这种风格去编写软件，我们很难实现每秒能够处理10Gbit大小的消息的能力

数据库通常需要使用的信息大小很小，在这种情况下，我们很难去写一个RPC软件，使之每秒能够生成10Gbit大小的消息

20.30-20.33

that's millions maybe tens of millions of messages per second

它的速度可能是每秒钟数百万条消息，也可能是每秒数千万条消息

20.33-20.34

ok 

==================================================================

20.34-20.40

so this is the plan that farm doesn't use and a sort of a reaction to to this plan 

So，FaRm并没有使用这种方案

20.40-20.54

instead farm uses 2 ideas to reduce the costs of pushing packets around

相反，FaRm通过两种思路来减少推送数据包的成本


20.54-20.57

the first one I'll call kernel bypass 

我将第一种方案叫做kernel bypass

20.57-21.02

and the idea here is that 

这里的思路是

21.02-21.13

instead of the application sending all its data down through a complex stack of kernel code 

与其让应用程序通过调用复杂的内核代码来发送所有数据

21.13-21.25

instead the application the kernel configures the protection machinery in the computer to allow the application direct access to network interface card

相反，通过对内核保护机制进行配置，以此来让应用程序直接访问网络接口卡



21.28-21.31

 so the application can actually reach out and touch the network interfaces registers and tell it what to do

So，应用程序实际上可以去访问网络接口卡上的寄存器，并告诉它该做什么

21.31-21.32

 in addition

此外

21.31-21.38

 the network interface card when it DMAs and this kernel bypass scheme

当使用这种DMA以及kernel Bypass方案时

21.38-21.41

 it DMAs directly into application memory 

通过DMA，它能直接访问应用程序内存

21.41-21.47

where the application can see the bytes arriving directly without kernel intervention

在不需要内核参与的情况下，应用程序可以直接看到那些到达的字节信息

21.47-21.48

 and when the application needs to send data 

当应用程序需要发送数据时


21.48-21.53

the application can create queues

应用程序可以去创建一些队列

21.53-21.58

 that the network interface card can directly read with DMA and send out over the wire

网络接口卡可以直接通过DMA来读取数据，并通过网线将数据发送出去

21.58-22.03

 so now we've completely eliminated all the kernel code involved in networking

So，现在我们就已经消除了所有涉及网络的内核代码调用

22.03-22.06

kernels just not involved there's no system calls there's no interrupts

即内核不会参与这些操作，这里也没有系统调用，也没有interrupt中断

22.06-22.10

the application just directly ead and write memory that the network interface card sees

应用程序可以直接对内存进行读写，网络接口卡可以直接看到这些内容

22.10-22.12

 and of course， the same thing on the other side 

Of course，对于另一边也是如此


22.12-22.28

and  this is an idea that is actually was not possible years ago with network interface cards

实际上，对于过去几年的网络接口卡来说，这种想法实际上是不切实际的

22.28-22.34

 but most modern serious network interface cards okay can be set up to do this 

但最新的网络接口卡是可以通过设置来做到这一点的

22.34-22.41

it does however require that the application you know you know all those things that TCP was doing for you

但是，它需要应用程序去做到TCP所为我们做到的那些事情

22.41-22.43

 like checksums or retransmission

比如，checksums或者重新传输

22.43-22.47

the application would now be in charge if we wanted to do this

如果我们想要这么做，那么这些东西都得是由应用程序来进行负责

22.47-22.50

you can actually do this yourself

实际上，你可以自己来做到这点

22.50-23.00

 kernel bypass using a toolkit that you can find on the way up called DP DK

kernel bypass使用了一个叫做DPDK的工具包，你们可以在网上找到

23.00-23.07

 and it's relatively easy to use and allows people to write extremely high performance networking applications

它使用起来相对简单，并且能够让人们写出性能非常高的网络应用程序

23.07-23.12

but and so so farm does use this

So，FaRm确实使用了这个工具


23.12-23.15

it's applications directly you talk to the NIC

应用程序可以直接和NIC进行通信

23.15-23.16

the NIC DMA see things write into application memory

NIC通过DMA能看到写入应用程序内存中的数据

23.16-23.20

 we have a student question

我们有一个学生要进行提问

23.20-23.21

 I'm sorry yes

抱歉，请问

23.21-23.27

 does this mean that farm machines run a modified operating system

这是否意味着Farm机器上运行的一个修改过的操作系统

23.27-23.32

 well I I don't know the actual answer that question

Well，我不清楚这个问题的正确答案

23.32-23.37

 I believe farm is runs on Windows some form of Windows

我相信FaRm是运行在某个版本的Windows系统上的

23.37- 23.41

 whether or not they had to modify Windows I do not know 

我也不知道他们是不是得对Windows进行修改

23.41-23.47

in the sort of Linux world in Linux world

在Linux的世界中

23.47-23.48

 there's already full support for this

它已经对这项技术做到了完全支持

23.48-23.50

it does require kernel intervention

它确实需要内核干预

23.50-23.58

because the kernel has to be willing to give ordinarily application code cannot do anything directly with devices

因为正常情况下，应用程序代码是不能直接对设备进行任何操作

23.58-24.08

 so Linux has had to be modified to allow the allow the kernel to delegate hardware access to applications

So，我们得对Linux进行修改，以此让内核将硬件访问的权限委派给应用程序

24.08-24.12

 so it does require kernel modifications

So，这确实需要对内核进行修改

24.12-24.15

 those modification are already in Linux and maybe already in Windows also

这些修改可能已经应用到Linux上，也可能已经应用到Windows上了

24.15-24.16

 in addition though

此外

24.16-24.21

 this depends on fairly intelligent NIC

这依赖于相当智能的NIC

24.21-24.25

because of course you're going to have multiple applications that want to play this game with a network interface card

因为你会拥有多个想要通过一个网络接口卡来玩这种技术的应用程序


24.25-24.30

 and so modern NICs actually know about talking to multiple distinct queues

So，现代的NIC实际上知道该如何和多个不同的队列进行通信

24.30-24.34

 so that you can have multiple applications each with its own set of queues and the the NIC knows about 

So，你可以运行多个应用程序，并且每个应用程序都有它自己的一组队列，NIC知道该如何跟它们进行通信

24.34-24.38

so it did it has required modification of a lot of things

So，这确实需要修改很多东西

24.38-24.41

 okay



24.41-24.48

so sort of step one is is Kernel bypass idea 

So，第一步是去使用Kernel Bypass这种方案

24.48-24.50

step two is even cleverer next 

第二步是一种更为聪明的办法

24.50-24.55

now we're starting to get into hardware that is not in wide use of the moment

现在我们要去讨论一种目前还没有广泛使用的硬件

24.55-24.57

you can buy it commercially

你可以买到它

24.57-25.01

 but it's not the default 

但这不是默认的

25.01-25.07

this RDMA scheme which is remote direct memory access

这种RDMA方案指的是远程直接内存访问

25.10-25.19

 and here this is sort of special kind of network interface cards 

这是一种特殊的网络接口卡

25.19-25.23

that support remote support RDMA

它支持RDMA

25.23-25.29

 so now we have an RDMA NIC

So，现在我们就有了一个支持RDMA的NIC

25.29-25.37

 both sides have to have these special network interface cards

这两边都得有这种特殊的网络接口卡

25.37-25.40

 so I'm drawing these is connected by a cable

So，在我画的这张图上，它们是通过网线连接的

25.40-25.44

 in fact always there's a switch here

事实上，这里会有一台交换机

25.44-25.51

 that has connections to many different servers and allows any server to talk to any server

有很多不同的服务器都和它连接在一起，通过它可以与任意服务器进行通信

25.51-25.51

 okay 



25.51-25.52

so we have these RDMA NICs

So，我们使用这些支持RDMA的NIC

25.52-25.56

and we had again we have the applications 

这里我们有一些应用程序

25.56-25.58

and applications'  memory

以及应用程序所使用的内存

25.58-26.10

 and now though the application can essentially send a special message through the NIC that asks

现在，应用程序可以通过NIC来发送一条特殊的消息

26.10-26.13

 so we have a an application on the source host 

So，我们在源主机这块运行着一个应用程序

26.13-26.18

and maybe we would call this the destination host

我们将另一边的主机叫做目标主机

26.16-26.34

 can send a special message through the RDMA system that tells this network interface card to directly read or write a byte some bytes of memory probably a cache line of memory in the target applications address space directly

它（源机）可以通过RDMA系统发送一条特殊的消息来告诉网络接口卡让它直接对目标应用程序地址空间中的内存直接进行读写操作

26.34-26.43

 so hardware and software on the network interface controller are doing a read and write read or write of the application target applications memory directly 

So，网络接口控制器上的硬件和软件会对目标应用程序的内存直接进行读写操作


26.43-26.49

and then so we have a sort of request going here that causes the read or write 

So，我们会将一个请求发送到这里，它会引起读操作或者写操作

26.49-26.57

and then sending the result back to really to other incoming queue on the source application

然后，目标应用程序会将响应结果返回给源应用程序的incoming queue中

26.57-26.59

 and the cool thing about this is that

对此，比较Cool的地方在于


26.59-27.05

 this computer's the CPU this application didn't know anything about the read or write

这台服务器上的CPU和应用程序对于刚刚所做的读操作或者写操作并不知情

27.05-27.12

the read or write is executed completely in firmware in the network interface card

读操作或者写操作完全是在网络接口卡的固件中执行的

27.12-27.18

so it's not there's no interrupts here，the application didn't have to think about the request or think about replying 

So，这里不会有interrupt中断发生，应用程序不用考虑请求或者响应之类的事情

27.18-27.22

network interface card just reads or writes a memory and sends a result back to the source application

目标主机上的网络接口卡只需要去对应用程序内存进行读取或写入操作，然后将结果返回给源应用程序即可

27.22-27.28

and this is much much lower overhead way of getting at of

这种做法的开销会很低很低

27.28-27.32

 all you need to do is read or write memory  and stuff in the RAM of the target application 

你所要做的是对目标应用程序RAM中的数据进行读写

27.32-27.42

this is a much faster way of doing a simple read or write than sending in RPC call even with magic kernel bypass networking

通过这种做法来进行简单的读写操作，要比使用kernel bypass networking来发送RPC调用来得更快

与使用RPC调用进行发送相比，使用魔术内核绕过网络，发送简单的读写操作要快得多

通过使用这种很神奇的kernel bypass networking，在进行简单的读和写的时候，它要远远比通过普通的RPC调用来发送信息的方式快得多

27.42-27.45

Ok is any question？

Ok，有任何问题吗

27.45-27.50

 does this mean that RDMA already may always require kernel bypass to work at all 

这是否意味着RDMA需要kernel bypass才能工作

27.50-27.55

you know I don't know the answer to that

你知道的，其实我也不清楚这个问题的答案

27.55-28.00

 I think I've only ever heard it used in conjunction with kernel bypass

因为我只听说过它和kernel bypass一起使用

28.00-28.08

 cuz you know the people who are interested in any of this or are interested in it only for tremendous performance

你知道的，人们只是对出色的性能感兴趣

28.08-28.13

 and I think you would waste you throw away a lot of the performance

我觉得你可能在性能方面抛弃了很多

28.13-28.18

I'm guessing you throw away a lot of the performance win if you had to send the requests through the kernel

我猜如果你通过内核来发送请求，那么你就会牺牲很多性能

28.18-28.23

 okay another question 

Ok，下一个问题

28.23-28.31

that the the question notes

有人问

28.31-28.40

TCP software's TCP supports in order delivery duplicate detection and a lot of other excellent properties which you actually need 

TCP软件为了能够支持重复检查（Duplicate detection）以及你实际所需的很多很棒的特性

28.40-28.49

and so it would actually be extremely awkward，if this setup sacrificed reliable delivery or in order delivery

如果这种设置牺牲了可靠的传输能力，那么它实际上就会很尴尬

28.49-29.00

 and so the answer the question is actually these RDMA NICs run their own reliable sequenced protocol  like TCP although not TCP between the NICs

So，这个问题的答案实际上就是，这些支持RDMA的NIC使用的是它们自己的可靠的sequenced protocol，这和NIC间使用的TCP很像，但又不是TCP

29.00-29.04

and so when you ask your RDMA NIC to do a read or write

So，当你去让你的RDMA NIC去进行读或者写操作的时候

29.04-29.11

it'll keep you transmitting until if the you know if the request is lost and keep reassurance meaning till it gets a response

直到你的请求丢失或者得到一个响应，它才不会继续传输数据

它会一直保持传送数据的状态，直到你的请求丢失或者它得到一个响应为止

29.11-29.16

and it actually tells the originating software did the request succeed or not

它会去询问这个软件该请求是成功还是失败了

29.16-29.19

 so you get an acknowledgment back finally

So，最后你会拿到一个确认信息

29.19-29.25

 so yeah you know in fact have to sacrifice most of TCP is good properties 

So，你知道的，事实上我们得去牺牲掉TCP中大多数很好的特性

29.25-29.28

now this stuff only works over a local network

这种东西只有在本地网络中才有用

29.28-29.35

I don't believe RDMA would be satisfactory like between distant data centers

我不觉得RDMA在远程数据中心间的性能也能像在本地网络中那样令我们满意

29.35-29.40

 so there's all tuned up for very low speed of light access 

So，这些都是为了访问速度很慢的情况而优化的

29.40-29.43

okay 


29.43-29.55

a particular piece of jargon that the paper uses is one-sided our DMA 

paper中使用了一个特定术语，那就是One-sided RDMA

29.55-29.58

and that's basically what I've just mentioned

这就是我已经刚才提到的东西

29.58-30.03

when application uses RDMA to read or write the memory of another

当应用程序通过RDMA对另一个机器上内存中的数据进行读写时

30.03-30.05

that's one-sided RDMA

这里使用的是one-sided RDMA

30.05-30.14

now in fact farm uses RDMA to send messages in an RPC like protocol

事实上，FaRm使用RDMA通过RPC之类的协议来发送信息

30.14-30.18

 so in fact sometimes farm directly reads with one-sided RDMA

So，事实上，FaRm有时候会通过one-sided RDMA来直接读取数据


30.18-30.26 ！！！！！！

but sometimes what farm is using RDMA for is to append a message to an incoming message queue inside the target

但FaRm有时候使用RDMA是用来给目标对象的incoming message queue追加消息的

30.26-30.31

so sometimes what the well actually always with writes 

So，实际上，这里追加的始终是写操作相关的消息

30.31-30.40

what farm is actually doing is using RDMA to write to append a new message to an incoming queue in the target

FaRm实际上会通过RDMA来给目标对象中的incoming queue追加一条新的消息

30.40-30.41

which the target will poll

目标机器会进行轮询

30.41-30.43

since there's nobody interrupts here

因为这里没有人发出interrupt信号


30.43-30.55

the way the destination of a message like this knows I got the messages that periodically checks one of these  queues in memory to see how have I gotten a recent message from anyone

在目标机器这块，我会对内存中所接收到的消息进行定期检查，来看看其他人在最近是否有给我发送消息

30.55-30.59

okay so once I did RDMA is just to read or write 

Ok，我使用RDMA是为了进行读和写

30.59-31.04

but using RDMA to send a message or append either to a message queue or to a log

我还可以用RDMA发送或追加一条消息给一个消息队列或者日志

31.04-31.10

 sometimes farm appends messages or log entries to a log in another server also uses RDMA

有时候，FaRm也会使用RDMA去给另一台服务器的日志追加消息或者日志条目


31.10-31.16

 and you know this memory that's being written into is all non-volatile

你知道的，我们往这块内存中所写入的数据都是不可丢失的

31.16-31.21

 so all of it the message queues it's all written to disk if there's a power failure

So，如果发生供电故障，那么这些消息队列中的数据都会被写入磁盘

31.16-31.37

 the performance of this is the figure 2 shows that you can get 10 million small RDMA reads and writes per second which is fantastic

Figure 2向我们展示了其性能，通过RDMA，我们每秒钟能够处理1000万次读写操作，这一点很棒

31.37-31.43

far far faster than you can send messages like RPC using TCP

这要比使用TCP来发送RPC之类的消息速度要快太多

31.43-31.48

 and the latency of using RDMA to do a simple read or write is about 5 microseconds

使用RDMA来进行简单的读或者写操作所导致的延迟只有5微秒

31.48-31.55

so again this is you know very very short 5 microseconds is

So，你知道的，5微秒非常非常短暂

31.55-31.58

 it's slower than accessing your own local memory

这要比你访问自己本地内存来得慢

31.58-32.02

 but it's faster than sort of anything else people do in networks

但这要比人们在网络中所做的其他任何事情都要来得快

32.02*-32.07

 ok so this is sort of a promise

So，这其实是一种期望

32.07-32.12

there's this fabulous RDMA technology that came out a while ago that at the farm people wanted to exploit 

搞FaRm的这群人想要去利用这种出现不久如同黑科技般的RDMA技术

32.12-32.18

you know the coolest possible thing that you could imagine doing with this

你可以想象通过使用它所能做到的最酷炫的事情就是

32.18-32.28

 is using RDMA one sided RDMA reads and writes to directly do all thereads and writes a records stored in database servers memory 

通过one-sided RDMA来直接对保存在数据库服务器内存中的记录进行读和写

32.28-32.41

so wouldn't be fantastic if we could just never talk to the database server CPU or software but just get at the data that we need you know in five microseconds a pop using direct one-sided RDMA reads and writes 

如果我们不需要去和数据库服务器的CPU或者软件进行通信，但通过使用one-sided RDMA能在5毫秒内就可以拿到我们需要的数据，并对其进行读写，这简直不要太棒

32.41-32.50

so in a sense this paper is about you know you you start there what do you have to do to actually build something useful 

你可以根据这篇paper来构建出一些很有用的东西

32.50-32.54

so an interesting question by the way is 

So，这里有一个令我们很感兴趣的问题

32.54-33.00

could you in fact implement transactions only using one-sided RDMA

我们能否只使用one-sided RDMA来实现事务

33.00-33.12

 that is you know anything we wanted to read or write data in server the only use RDMA and never actually send messages that have to be interpreted by the server software

即在不发送那些必须由服务器软件进行解释的消息的情况下，我们只使用RDMA来对服务器中的数据进行读或者写

33.12-33.16

it's worth thinking about

这值得我们去思考

33.16-33.21

in a sense farm is answering that question with a no 

某种意义上来讲，FaRm对于这个问题的答案是No

33.21-33.24

because that's not really how farm works

因为这并不是FaRm的工作方式

33.24-33.32

 but but it is absolutely worth thinking how come pure one-sided RDMA couldn't be made to work

但这个问题还是值得我们思考一下的，即为什么我们无法单纯地靠one-sided RDMA来做到这点

33.32-33.44

 alright so the challenges to using RDMA in a transactional system that has replication and sharding

在事务系统中使用RDMA的难题在于replication以及数据分片

33.44-33.51

 so that that's the challenge we have is how to combine already made with transactions sharding and replication

So，我们所面临的挑战就是该如何将事务、数据分片以及replication结合在一起

33.51-33.57

 because you need to have sharding and transactions replication to have a seriously useful database system

因为我们需要通过数据分片和事务复制才能做到一个严格意义上有用的数据库系统

33.57-33.59

 it turns out that

事实证明

33.59-34.07

 all the protocols we've seen so far for doing transactions replication require active participation by the server software

在我们目前为止看到的所有用来处理事务复制的协议，它们都需要服务器软件的参与

34.07-34.17

 that is the server has to be in all the protocols we've seen so far the server's actively involved in helping the clients get at read or write the data

在我们目前见过的所有协议中，服务器都得参与进来，帮助client对数据进行读取或写入

34.17-34.22

 so for example in the two-phase commit schemes we've seen 

So，例如我们所见过的两阶段提交方案中

34.22*-34.27

the server has to do things like decide whether a record is locked 

服务器得去判断一条记录上面是否有锁

34.27-34.29

and if it's not locked， set the lock on it right 

如果该记录上没有锁，那么我们就得给它加一把锁，以此来进行读操作或者写操作

34.29-34.33

it's not clear how you could do that with RDMA 

我们并不清楚如何通过RDMA来做到这点

34.33-34.39

the server has to do things like in spanner you know there's all these versions 

服务器得去做一些事情，比如在Spanner中，我们得有版本号之类的东西

34.39-34.42

it was the server that was thinking about how to find the latest version

服务器得去思考如何找到版本号最新的数据

34.42-34.46

 similarly if we have transactions in two-phase commit

类似地，如果我们在事务中使用两阶段提交

34.46-34.54

data on the server it's not just data there's committed data there's data that's been written but hasn't committed yet

服务器上的数据除了已经落地提交的数据以外，还有一些已经写入但未被提交的数据

34.54-35.01

 and again traditionally it's the server that sorts out whether data recently updated data is committed yet

一般来讲，服务器会去弄清楚最近更新的数据是否已被提交

35.01-35.07

and that's to sort of protect the clients from you know prevent them from seeing data that's locked or not yet known to be committed

这就可以防止client读到那些被锁住或者还未被提交的数据了

35.07-35.09

 and what that means is that

这意味着

35.09-35.11

 without some clever thought

在没有一些更好办法的情况下

35.11-35.22

RDMA or one-sided pure use of RDMA one-sided RDMA doesn't seem to be immediately compatible with transactions and replication 

RDMA或者one-sided RDMA似乎是无法直接兼容事务和replication的

35.22-35.32

and indeed while farm does use one-sided it reads to get out directly at data in the database

当FaRm使用one-sided RDMA去直接读取数据库中的数据时

35.32-35.36

 it is not not able to use one-sided writes to modify the data

它是没法使用one-sided RDMA来对该数据进行修改的

35.36-35.39

 okay 



35.39-5.46

so this leads us to optimistic concurrency control

So，这就会让我们去使用乐观锁并发控制了

35.46-35.47

 it turns out that

事实证明

35.47-36.04

 the main trick in a sense that farm uses to allow it both use RDMA and get transactions is by using optimistic concurrency control

为了让FaRm能够使用RDMA并且对事务进行支持，他们所使用的主要手段就是乐观锁并发控制

36.04-36.12

 so if you remember I mentioned earlier that

So，如果你还记得我之前所提到过的


36.12-36.17

concurrency control schemes are kind of divided into two broad categories

并发控制方案可以分为两大类

36.17-36.21

pessimistic and optimistic

即悲观和乐观


36.21-36.25

 pessimistic schemes use locks

悲观方案使用了锁

36.25-36.28

 and the idea is that

它的思路是

36.28-36.31

if you have a transaction that's gonna read or write some data

如果你有一个事务要去读取或写入某些数据

36.31-36.34

 before you can read or write the data or look at it at all

在你可以对该数据进行读取或写入前

36.34-36.36

 it must acquire a lock 

它必须得获取该数据所对应的锁

36.36-36.38

and it must wait for the lock

它必须等待获得这把锁


36.38-36.43

 and so you read about two-phase locking

So，你们得去读下两阶段锁相关的东西了

36.43-36.44

 for example

例如

36.44-36.47

 in that reading from 6033

你们可以去读下6.033中的相关阅读材料

36.47-36.49

 so before you use data you have to lock it 

So，在你使用数据前，你得先将数据锁住

36.49-36.53

and you hold the lock for the entire duration of the transaction

你在执行事务的这段时间内，你都得拿着这把锁

36.53-36.57

 and only if the transaction commits or aborts， do you release the lock 

只有当事务提交或者中止时，你才能将锁释放

36.57-36.59

and if there's conflicts

如果事务间存在着冲突


36.59-37.08

 because two transactions want to write the same data at the same time or one wants to read and one wants to write 

因为两个事务想在同一时间对同一个数据对象进行写入操作，或者一个事务想读取该数据对象，但是另一个想对该数据对象进行写入

37.08-37.09

they can't do it at the same time 

它们没法同时去执行它们的操作

37.09-37.11

one of them has to block 

其中一个事务就会被阻塞住

37.11-37.16

or all but one of the transactions that want you write some data missed a block wait for the lock to be released

或者这两个想要对数据进行写入操作的事务都会被阻塞，并等待锁被释放

37.16-37.21

 um and of course this locking scheme is the fact that the data has to be locked

事实上，在这个锁方案中，数据得被锁住

37.21-37.25

 and that somebody has to keep track of who owns the lock and when the lock is released  etcetera

有人得去跟踪谁持有该数据所对应的锁，什么时候该锁被释放等等



37.25-37.36

this is one thing that makes RDMA it's not clear how you can do rights or even reads using RDMA in a locking scheme

这是RDMA使用过程中并不清楚的一个地方，即我们在锁方案中该如何进行写或者读

37.36-37.41

because somebody has to enforce the locks I'm being a little tentative about this

因为有人得强制使用锁，我对这点持有疑问

37.41-37.51

because I suspect that with more clever RDMA NICs that could support a wider range of operations like atomic test and set

因为我怀疑那些更智能的具备RDMA能力的网络接口卡可以支持更多的操作，比如：原子性的test-and-set

37.51-37.58

you might someday be able to do a locking scheme with pure one-sided RDMA

你们可能某一天通过使用这种纯粹的one-sided RDMA就可以实现一套锁方案

37.58-38.00

but farm doesn't do it 

但FaRm并没有做这点

38.00-38.05

okay so what farm actually uses as an optimistic scheme

Ok，实际上，FaRm使用的是一种乐观锁机制

38.05-38.08

and here in an optimistic scheme

在这种乐观锁机制中

38.08-38.13

 you can use at least you can read without locking

至少，你可以在没有锁的情况下去读取数据


38.13-38.18

 you just read the data 

你只需要去读取数据就行了

38.18-38.27

you don't know yet whether you are allowed to read the data or whether somebody else is in the model middle of modifying it or anything you just read the data  and a transaction it uses what it whatever it happens to be

你不用去知道你是否有权去读取该数据，或者有没有正在对该数据进行修改之类的操作，这些你都不用管，只管去读取该事务执行时所需要的数据就行了


38.27-38.34

 and you also don't directly write the data in optimistic schemes

在使用这种乐观锁方案的情况下，你不会直接写入数据

38.34-38.34

 instead you buffered 

相反，你将它们缓存起来

38.34-38.41

so you buffer writes locally and in the client until the transaction finally ends

So，我们会将这些写操作缓存在client本地，直到事务最终结束

38.41-38.45

 and then when the transaction finally finishes 

接着，当事务最终结束的时候

38.45-38.46

and you want to try to commit it

你会试着去提交该事务

38.46-38.57

 there's a validate what's called a validation stage

这里会有一个验证阶段

38.57-39.04

 in which the transaction processing system tries to figure out whether the actual reads and writes you did were consistent with serializability 

事务处理系统会试着弄清楚你所做的读和写操作是否与执行顺序一致

39.04-39.05

that is they try to figure out 

它们会试着弄清楚

39.05-39.07

oh was somebody writing the data while I was reading it

Oh，当我在读取数据的时候，有人正在对该数据对象进行写操作

39.07-39.10

 and if they were boy we can't commit this transaction

如果是这样的话，那我们就没法提交该事务

39.10-39.15

 because it computed with garbage instead of consistent read values

因为它使用的是脏数据进行计算，而不是使用一致的读值进行计算

因为此时该数据对我来讲就是一个脏数据，我不能用它进行计算

39.15-39.19

 and so if the validation succeeds 

So，如果验证成功的话

39.19-39.21

then you commit 

那么你就可以提交该事务了

39.21-39.24

and if the validation doesn't succeed

如果验证失败

39.24-39.27

 if you detect somebody else was messing with the data while you were trying to use it

如果你发现在你试着使用数据的时候，有人弄乱了这个数据

39.27-39.28

at abort 

那么就中止这个事务

39.28-39.28

so that means that

So，这意味着

39.28-39.30

 if there's conflicts

如果这里面存在冲突

39.30-39.34

 if you're reading or writing data

如果你正在对某个数据进行读或者写

39.34-39.37

 and some other transactions also modifying at the same time

并且其他事务在同一时间也在对该数据对象进行修改


39.37-39.41

 optimistic schemes abort at that point

此时我们就不会去使用乐观锁机制了

39.41-39.45

because the computation is already incorrect  at the commit point

因为在提交的时候，计算的结果就已经是错的了

39.45-39.49

 that is you already read the damage data you weren't supposed to read 

你所读到的数据就是那些你不想读到的损坏数据

39.49-39.53

so there's no way to for example block you know until things are okay

So，直到解决这些问题后，系统才不会被阻塞

So，直到提交完成，它才不会被阻塞

39.53-40.00

instead ，the transactions already kind of poisoned and just has to abort and possibly retry

相反，事务已经被污染了，我们只能去中止它们，并去试着重新执行

40.00-40.02

 okay 



=======================================================================

40.02-40.04

so farm uses optimistic 

So，FaRm使用了乐观锁机制

40.04-40.09

because he wants to be able to use one-sided RDMA to just read whatever's there very quickly

因为它想去使用one-sided RDMA来对数据进行快速读取

 



四十三  阅举报
14-03

40.13-40.17

So this design was really forced by use of RDMA

So，在这个设计中确实是强制去使用RDMA

40.17-40.22

 this is often abbreviated OCC for optimistic concurrency control 

我们经常将乐观锁并发控制简写为OCC

40.22-40.26

all right 



40.26-40.30

and then the interesting thing an optimistic concurrency control protocols is

接着，关于乐观锁并发控制协议里其中有趣的一点是

40.30-40.31

 how validation works 

validation是如何工作的

40.31-40.35

how do you actually detect that somebody else was writing the data while you were trying to use it 

当你试着去操作一个数据对象的时候，你该如何检测出其他人也正在对该数据对象进行写入操作

40.35-40.40

and that's actually mainly gonna be what I talked about in the rest of this lecture

这实际上也是我们在这节课剩下时间里所主要讨论的东西

40.40-40.46

 and just again though just to retire this back to the top level of the design

我们回到这个设计的最顶层


40.46-40.48

 what this is doing for farm is that

它为FaRm所做的事情是


40.48-40.53

the reads can use one-sided RDMA 

我们的读操作可以去使用one-sided RDMA

40.53-40.57

because and therefore be extremely fast 

因此，读取速度就会超级快

40.57-41.02

because we're gonna check later whether the reads were okay

因为我们会在稍后去检查这些读操作是否成功读取到了数据

41.02-41.08

 all right



41.08-41.16

 farms a research prototype it doesn't support things like SQL

FaRm的研究原型并不支持SQL之类的东西

41.16-41.21

it supports a fairly simple API for transactions

它支持了用于事务方面的一个很简单的API

它使用了一个相当简单的API来支持事务

41.21-41.28

 this is the API just to give you a tease for what a transaction code might actually look like

调用这个API，你能够知道transaction code是什么

41.28-41.29

if you have a transaction

如果你有一个事务

41.29-41.32

 it's gotta to declare the start of the transaction

那么它会在事务开头处标记声明下事务要开始执行了

41.32-41.38

 because we need to say oh this particular set of reads and writes needs to occur as a complete transaction

因为我们得声明下，这一个完整的事务是由这些读操作和写操作所组成的


41.38-41.43

 the code declares a new transaction by calling TX create

我们通过调用txCreate()来声明一个新事务

41.43-41.50

this is all laid out by the way in the paper I think from 2014 a slightly earlier paper by the same authors

这个在2014年中的一篇paper中有提到，该paper是由同一个作者编写的

41.50-41.53

you create a new transaction

通过调用这个API，我们创建了一个新事务

41.53-41.57

and then you explicitly read those functions to read objects 

接着，你通过调用函数来显式读取对象


41.57-42.07

and you have to supply an object identifier an OID indicating what object you want to read

你得往里面传入一个对象标识符OID，以此来表示你想读取的对象是哪个

42.07-42.09

 then you get back some object

然后，你就会拿到某个对象

42.09-42.11

 and you can modify the object in local memory

你可以在本地内存中对该对象进行修改

42.11-42.13

 and we didn't  write it 

我们不会对它进行写入操作

42.13-42.18

you have a copy of it that you've read from the server the TX read back from the server 

通过调用txRead我们从服务器处拿到该对象的一个副本


42.18-42.22

so you know you might increment some field in the object

So，比如我们可能对这个对象中的某个字段的值加一

42.22-42.25

and then when you want to update an object

接着，当你想要更新一个对象的数据时


42.25-42.28

 you call this txWrite

那么你就可以去调用txWrite

42.28-42.36

and again you give it the object ID and the new object contents

然后，你得往里面传入OID以及要更新的对象内容

42.36-42.38

 and finally when you're through with all of this

当你做完这一切的时候

42.38-42.44

 you've got to tell the system to commit this transaction actually do validation

你得告诉系统去提交这个事务，并让它对这个事务进行验证

42.44-42.45

 and if it succeeds 

如果验证通过

42.45-42.47

cause the writes to really take effect and be visible

那么它就会这些写操作生效，并让其修改结果对外可见


42.47-42.53

 and you call this commit routine

然后，你调用txCommit


42.53-42.56

the commit team runs a whole bunch of stuff in figure 4 which we'll talk about

提交的时候，它做了很多事情，这个我们会在讨论Figure 4的时候讲一下

42.56-42.59

and it returns this okay value 

它会将ok的值返回给我们

42.59-43.04

and it's required to tell the application oh did the commit succeed or was it aborted

它需要告诉应用程序该事务提交是成功了，还是中止了

43.04-43.11

 so we need the return this okay return valued you know correctly indicate by the transaction succeeded

你知道的，如果事务提交成功，我们就得返回事务提交成功所对应的ok值

43.11-43.12

 okay



43.12-43.13

 there's some questions

这里有几个问题

43.13-43.19

 one is question since OCC aborts if there's contention

其中一个问题是，如果事务出现冲突，那么我们就会停止使用OCC

43.19-43.24

 question is whether retries involve exponential back-off

他的问题是，在重试的过程中是否会涉及指数补偿

43.24-43.29

 because otherwise it seems like if you just instantly retried

因为如果你立刻进行重试的话

43.29-43.38

 and that there were a lot of transactions all trying to update the same value at the same time they'd all aboort they'd all retry and waste a lot of time 

并且在同一时间有大量的事务试着去更新同一个值，那么这些事务就都会被中止，然后重新尝试更新，这样就会导致浪费大量的时间

43.38-43.40

and I don't know the answer to that question 

我不知道这个问题的答案是怎样的

43.40-43.44

I don't remember seeing them mentioning exponential back-off in the paper

我不记得有没有paper中有没有提到指数补偿这个东西

43.44-43.53

 but it would make a huge amount of sense to delay between retries and to increase the delay succeeding 

但对于重试间的延时并增加后续的延迟时间来说，会非常有意义

给这些重试增加延迟时间会非常有意义

43.53-44.00

 to give somebody a chance of this is much like the randomization of the raft collection times

这就像是Raft中的Randomization算法，通过给它们机会来让其重试成功

44.00-44.03

other question is 

另一个问题是

44.03-44.06

the farm API closer in spirit to a NoSQL database 

FaRm的API更接近于NoSQL数据库的API

44.06-44.10

yeah you know that's one way of viewing it 

你知道的，这是看待它的一种方式

44.10-44.18

it really that it doesn't have any of the fancy query stuff like joins for example that SQL has

它并没有那种查询中很花式的操作，例如SQL中的join操作

44.18-44.26

it's really a very low-level kind of readwrite interface plus the transaction support

它是一种很底层的readwrite接口加上对事务的支持

它的读写和事务支持的接口都是很底层的

44.26-44.31

 so you can sort of view it as a no sequel database maybe with transactions

So，你可以把它当做是带事务的NoSQL数据库

44.31-44.35

all right 


44.34-44.37

this is what a transaction looks like 

这就是一个事务的样子

44.37-44.43

and these are all these are library calls created read/write commit

这些都是库中调用的API，比如txCreate，txRead，txWrite，txCommit

44.43-44.50

commit as a sort of complex write recall that actually runs the transaction coordinator code first

txCommit作为一系列复杂的写调用，是很复杂的，它首先要去调用事务协调器的代码

44.50-44.53

what a rare variant of two-phase commit 

这是两阶段提交的一个比较少见的变种

44.53-44.54

this described in figure four 

figure 4中对此进行了描述

44.54-44.58

just repeat that

再重复一下


44.58-45.01

while the read call goes off and actually reads the relevant server 

当我们调用txRead时，它会去读取相关服务器上的数据

45.01-45.09

the write call just locally buffers  then the new the modified object

这里的txWrite只会对本地的buffer数据进行修改

45.09-45.12

and it's only in commit that the objects are sent to the servers 

只有当这个修改过的数据对象发送到服务器后，它才会去提交该事务

45.12*-45.18

these object IDs are actually compound identifiers for objects 

对象所对应的object id实际上是一个复合标识符

45.18-45.19

and they contain two parts 

它们由两部分组成


45.19-45.24

one is the identify a region 

其中一部分是用来识别区域的

45.24-45.29

which is that all the memory of all the servers is split up into these regions 

所有服务器上的内存会被拆分到不同的区域进行管理

45.29-45.35

and the configuration manager sort of tracks which servers replicate which region number 

配置管理器会去跟踪服务器所复制的区域编号是什么

45.35-45.37

so there's a region number in here

So，这里会有一个区域编号

45.37-45.46

 and then you know you client can look up in a table the current primary and backups for a given region number

那么你就知道，根据给定的区域编号，你的client可以根据当前primary和backup中的表进行查找


45.46-45.51

 and then there's an address such as the straight memory address within that region

接着，第二部分则是该区域中的内存地址

45.51-45.57

 and so the client uses the region number to pick the primary and the backup to talk to 

So，client通过地区编码来选择要去进行通信的primary和backup

45.57-46.00

and then it hands the address to the RDMA NIC

接着，它将地址告诉支持RDMA的NIC

46.00-46.06

 and tells it look please read at this address in order to get fetch this object

并跟它说，请从这个地址去获取这个对象

46.06-46.12

alright



46.12-46.17

another piece of detail we have to get out of the way is

我们得弄清楚的另一个细节就是

46.17-46.22

 to look at the server memory layout 

我们得去看下服务器的内存布局


46.22-46.30

I'm in any one server there's a bunch of stuff in memory 

在任意一台服务器的内存中都存放着一堆东西

46.30-46.33

so one part is 

So，其中一部分东西是

46.33-46.40

that the server has in its memory it's replicating one or more regions that has the actual regions 

服务器会将一个或多个区域的数据复制到它的内存中

在该服务器的内存中包含了一个或多个数据区域（知秋注：每个数据区域都可以看做是一个集合对象）


46.42-46.44

what a region contains is a whole bunch of these objects

一个区域包含了一堆的数据对象

46.44-46.51

 and each object there's a lot of objects objects sitting in memory 

它（这个区域）所在的内存中有很多数据对象

46.51-46.57

each object has in it a header

在每个对象的内部都有一个header

46.57-47.00

 which contains the version number 

它里面包含了该对象的版本号

47.00-47.02

so these are versioned objects 

So，这里的对象都打上了版本号

47.02-47.04

but each object only has one version at a time 

但每个对象一次只会有一个版本号

47.04-47.09

so this is version number

So，这就是版本号

47.09-47.15

 and in the high bit let me try again here

这里我重新画一下

47.15-47.17

 and the high bit of each version number is a lock flag

在每个版本号的高位处都会有一个lock标志位

47.17-47.24

so in the header of an object there's a lock flag in the high bit  and then a version number in a low bit

So，在每个对象的header中的高位处会有一个lock标志位，低位处则是放着该数据的版本号


47.24-47.27

 and then the actual data of the object 

然后就是该对象的实际数据了

47.27-47.37

so each object has the same servers memory it's the same layout a lock bit in the high bit and the current version number at low bit

So，每个对象在各个服务器中的内存布局都是相同的，在高位处会放一个lock标志位，在低位处则是放对象的当前版本号

47.37-47.40

every time the system writes modifies an object

每当系统对一个对象进行修改时

47.40-47.42

 it increases the version number

它会对该对象的版本号进行加1

47.42-47.45

 and let's see how the lock bits are used in a couple minutes

我们会在稍后看到这些lock标志位是如何使用的

47.45-47.46

in addition

此外

47.46-47.47

 in the server's memory

在服务器内存中

47.47-47.52

 there are pairs of queues pairs of message queues

这里面存放着多对消息队列

47.52-47.59

and logs one for every other computer in the system

在该系统中的其他服务器里，每个服务器都会有一份log日志

47.59-48.02

 so that means that 

So，这意味着

48.02-48.14

you know if there's four other servers in the system that are running  or if there's four servers that are running transactions

如果该系统中有4台服务器在执行事务

48.14-48.21

 there's going to be four logs sitting in memory that can be appended to with RDMA

在内存中就会有4份日志，它们可以通过RDMA来进行追加


48.21-48.22

 one for each of the other servers 

会为每台服务器都创建一份日志

48.22-48.26

and that means that one for each of the other computers can run transactions

这意味着每个日志记录着对应服务器所执行的事务

48.26-48.27

 so that means that the

So，这意味着


48.27*-48.32

transaction code running on you know so number of them 

So，我给这些队列编个号

48.32-48.36

you know it's the transaction code running on computer 2 

比如：以服务器2所执行的事务代码为例

48.36-48.47

when it wants to talk to this server and append to its log which as well see it's actually going to append to server twos log in this servers memory 

它这里要做的事情是，它要和这个服务器进行通信并追加日志，实际上它会将服务器2的日志追加到这个服务器的内存中




48.47-48.53

so there's a total N squared of these queues floating around in each servers memory

So，每个服务器的内存中总会有N^2个队列（知秋注：一台服务器和另一台服务器建立的channel中会有一个读队列RQ，还有一个写队列SQ）


48.53-49.01 !!!!!!!!!!!!!!!!!!!!!!!!!

 and it certainly seems like there's actually one set of logs which are meant to be I would non-volatile

实际上，这里有一组非易失性的日志

49.01-49.11

 and then also possibly a separate set of message queues which are used just for more RPC like communication 

然后，这里可能还有一组单独的消息队列，它们用于处理RPC那样的通信

49.11-49.16

again one in each server one queue message incoming message queue per other server  written with RDMA writes

在每个服务器上都会有其他服务器的incoming message queue，其他服务器通过RDMA来对它们所对应的队列进行写入操作

再次强调，在每个服务器上的incoming message queue，其他服务器可以通过RDMA来对它进行写入操作（知秋注：A和B通过RNIC建立channel，B对在A中建立的incoming message queue进行直接写入）

49.19-49.24

 all right


49.24-49.33

 actually the next thing to talk about is figure 4 in the paper

实际上，我们接下来要讲的就是paper中的figure 4

49.33-49.34

this is figure 4

这是Figure 4中的内容

49.34-49.444

and this explains the occ commit protocol that farm uses and

这张图解释了FaRm所使用的OCC提交协议

49.44-49.54

I'm gonna go through mostly steps one by one and actually to to begin with I'm gonna focus only on the concurrency control part of this

我会对这张图进行逐步讲解，并且我只会着重讲解并发控制这块

49.54-50.02

it turns out these steps also do replication as well as implement serializable transactions

事实证明，这些步骤中除了进行replication以外，它还实现了事务的有序执行

50.02-50.05

but we'll talk about the replication for fault tolerance a little bit later

但我们稍后会去讨论一点关于为容错而生的replication

50.05-50.05

okay



50.05-50.10

so the first thing that happens is  the execute phase

So，这里首先要经历的是执行阶段



50.10-50.12

 and this is the TX reads and TX writes

这里是事务进行读和写的地方

50.12-50.16

 the reads and writes that the client transaction is doing

这里是client端的事务所做的读和写

50.16-50.19

 and so each of these arrows here what this means is

So，这里的每个箭头所表示的意思是


50.19-50.21

that the transaction runs on computer C

这指的是在机器C上所执行的事务

50.21-50.24

and when needs to read something

当它需要去读取某些东西的时候

50.24-50.32

 it uses one-sided RDMA we to simply read it out of the relevant primary servers memory

它会去使用one-sided RDMA来读取相关primary服务器上内存中的数据

50.32-50.38

so what we got here was a primary backup primary backup primary backup for three different shards

So，对于这里的3个不同数据分片来说，它们各有一个primary服务器和backup服务器

50.38-50.47

 and we're imagining that our transaction read something from one object from each of these shards using one-sided RDMA reads

假设，我们的事务使用one-sided RDMA从每个数据分片上读取一个对象

50.47-50.51

that means these blindingly fast five microseconds each

这意味着，每次读取只需要花5毫秒

50.51*-50.52

 okay 



50.52-50.58

so the client reads everything it needs to read for the transaction，also anything that's going to write

So，client需要去读取事务所需要的所有数据，以及它要去写入的所有数据

50.58-51.00

 it first reads 

首先它得去读取数据


51.00-51.04

and it has to do it do this read has to first read

它首先得去读取这个

51.04-51.07

because it needs to get the version number the initial version number

因为它需要去获取初始版本号

51.07-51.09

 all right



51.09-51.10 ！！！！！！

so that's the execute phase

So，这就是执行阶段

51.10-51.15

 then when the transaction calls TX commits to indicate that it's totally done

接着，当事务调用txCommit来表示它已经执行完所有的操作了

51.15-51.30

 the library on the you know the TX commit call on the client acts as a transaction coordinator  and runs this whole protocol which is a kind of elaborate version of two-phase commit 

client处调用txCommit时扮演了事务协调器的角色，它所使用的整个协议可以看做是一种很精致的两阶段提交






51.31-51.39

the first phase and that's described in terms of rounds of messages

在第一阶段中，它们会来回发送消息

51.39-51.42

 so the transaction coordinator sends a bunch of lock messages and wait for them to reply 

So，事务协调器发送了lock消息给primary，并等待它们进行回复





51.43-51.46

and then validate messages and waits for the all the replies 

接着，它会去验证消息，然后等待所有的回复

51.46-51.51

so the first phase in the commit protocol is the lock phase

So，提交协议中第一个阶段是lock阶段

51.51-51.51

in this phase

在这个阶段中

51.51-52.01

 what the client is sending is it sends to each primary the identity of the object 

client会给每个primary发送它要访问的object id

52.01-52.05

for each object for clients written and needs to send that updated object to the relevant primary 

对于client要写入的每个对象来说，它需要将更新后的对象发送给相关的primary

52.05-52.18

so it sends the updated objects the primary and as a new log entry in the primaries log you know for this client

So，它会将更新后的对象发送给primary，并将其作为一个新的日志条目追加到primary的日志上


52.18-52.22

so the client really abusing already made to append to the primaries log 

So，client已经将日志条目追加到primary的日志上了

52.22-52.35

and what it's appending is the object ID of the write of the object wants to write， the version number that the client initially read when it read the object and the new value

它这里所要追加的东西是它想写入对象的object id，client一开始读取该对象时所获取的版本号，以及新的值

52.35-52.48

so it appends the object of your version number and new value to the primary log for the primary each of the shards that it's written an object in 

So，它会往它要写入的每个数据分片的primary上的日志中追加该对象的版本号以及该对象的新值


52.46-52.50

so these I guess what's going on here is that

So，我猜这里会发生的事情是

52.50-52.54

 the this transaction wrote two different objects

这个事务要对两个不同对象进行写入操作

52.54-52.56

 one on primary one and the other on primary 2

一个对象是在primary 1上，另一个是在primary 2上

52.56-52.58

 know when this is done

当这些操作完成的时候

52.58-53.08

when the transaction coordinator gets back the well alright so now the these new log records are sitting in the logs of the primaries

So，这些新的日志记录就已经落地到了这些primary上的日志里面

53.08-53.12

 the primary though has to actually actively process these log entries

实际上，primary得去主动处理这些日志条目

53.12-53.22 ！！！！！！

because it needs to check and they sort of do a number of checks involved with validation to see if the if this primary is part of the transaction can be allowed to commit 

因为它得做一大堆检查来验证该事务中这个primary所负责的部分能否进行提交




53.22*-53.24

so at this point 

此时

53.24-53.35

we have to wait for each primary to to poll the this clients log in the primaries memory  see that there's a new log entry and process that new log entry 

我们得等待每个primary对它自己内存中的client日志进行轮询，检查是否有新的日志条目，如果有新的日志条目，就对其进行处理

53.35-53.42

and then send a yes-or-no vote to say whether it is or is not willing to do its part of the transaction 

接着，发送Yes或者No来告诉client它能否去执行该事务中的这部分操作

53.42-53.43

all right



53.43-53.54

so what does the primary do when it's polling loop sees that an incoming log entry from a client

So，当primary去轮询从client处所拿到的日志条目时，它会去做什么呢？


53.54-53.55

first of all

首先

53.55-53.59

 if that object with the object ID is currently locked

如果该object id所对应的对象现在被锁上了

53.59-54.04

 then the primary rejects this log message 

那么primary就会拒绝这个log消息

54.04-54.13

and sends back a message to the client using RDMA saying no that this transaction cannot be allowed to proceed I'm voting no in two-phase commit 

并使用RDMA发送一条消息给client，它会说No，我无法处理这个事务，所以我在两阶段提交中选择No

54.13-54.15

 and that will cause the transaction coordinator to abort the transaction 

这就会导致事务协调器中止该事务

54.15-54.18

and the other is not locked

另一种情况则是该数据没有被锁

54.18-54.22

then the next thing the primary does is check the version numbers

那么，primary所做的另一件事就是去检查它的版本号

54.22-54.29

 it checks to make sure that the version number that the client sent it that is the version number of the client originally read is unchanged

它会去确保client发送给它的版本号和client一开始读取该数据时的版本号是一致的

54.29-54.32

 and if the version numbers changed 

如果版本号发生了改变

54.32-54.38

that means that between when our transaction read and when it wrote，somebody else wrote the object，

这意味着，当我们的事务在执行读和写的期间，其他人对该数据对象进行了写入操作

54.38-54.41

 if the version numbers changed and so the version numbers changed 

So，该数据对象的版本号就会发生改变

54.41-54.45

again the primary will respond no and forbid the transaction from continuing 

那么primary就会给client回复一个No，并禁止该事务继续执行

54.45-54.50

but if the version number is the same in the lock that's not set

但如果版本号没有改变，并且该数据对象没有上锁


54.50-55.01

and the primary will set the lock and return a positive response back to the client 

那么，primary就会对该数据对象加锁，并返回一个成功的信号给client

55.01-55.08

now because the primary's multi-threaded running on multiple CPUs

因为primary通过多CPU来执行多线程任务

55.08-55.10

and there may be other transactions

这里面可能也有一些其他事务

55.10-55.18

there may be other CPUs reading other incoming log queues from other clients at the same time on the same primary 

同一个primary上的其他CPU可能会去读取其他client在同一时间传入的log队列

55.18-55.21

there may be races between different transactions 

不同事务间可能存在着竞争的情况

55.21-55.28

or  lock record processing from different transactions trying to modify the same object

或者是，有几个不同的事务要试着对同一个对象进行修改所导致的抢锁

55.28-55.41

so the primary actually uses an atomic instruction a compare and swap instruction in order to both check the version number and lock

So，实际上，primary会使用一个原子指令（即compare-and-swap）来检查版本号以及锁

55.41-55.46

 and set the lock a bit on that version number as an atomic operation

然后，它会执行一个原子操作，即对该数据版本进行上锁

55.46-55.50

 and this is the reason why the lock of it has to be in the high bits of the version number 

So，这就是为什么要将lock标志位放在高位，而版本号放在低位的原因了

55.50-55.57

so that a single instruction can do a compare and swap on the version number and the lock bit 

So，这样我们就可以通过一条指令来对版本号和lock标志位进行compare-and-set操作了

55.57-56.02

okay now one thing to note is that

Ok，有一件事要注意一下

56.02-56.04

if the objects already locked

如果该对象已经被锁住了


56.04-56.09

there's no blocking there's no waiting for the lock to be released

那么这里就不会被阻塞住，也不用去等待该锁被释放

56.09-56.13

 the primary simply sends back a No if some other transaction has it locked

如果其他事务已经拿到这把锁了，那么primary直接返回一个No就可以了

56.13-56.19

 alright any questions about the lock phase of of Committee

对于提交这块的lock阶段，你们有任何疑问吗？

56.19-56.24

 all right back in the trend head in the client

我们回到client处的箭头这里

56.24-56.26

 which is acting his transaction coordinator 

它扮演了事务协调器的角色

56.26-56.34

it waits for responses from all the primaries from the primaries of the shard so for every object that the transaction modified

它会去等待该事务所修改对象的相关数据分片下的primary对它进行回复

56.34-56.36

 if any of them say no 

只要它们中有一个回复的是No

56.36-56.38

if they any of them reject the transaction

只要它们中有一个拒绝执行该事务

56.38-56.40

 then the transaction coordinator aborts the whole transaction

那么事务协调器就会中止整个事务

56.40-56.48

 and actually sends out messages to all the primaries saying I changed my mind I don't want to commit this transaction after all

然后它会向所有参与该事务的primary发送消息，并说：我改变主意了，我不想去提交这个事务

56.48-56.51

 but if they all answered yes of all the primaries answer yes 

但如果它们回复的都是Yes

56.51-56.58

then the transaction coordinator thinks that decides that the transaction can actually commit

那么事务协调器就会觉得实际上可以去提交这个事务

56.58-57.03

 but the primaries of course don't know whether they all voted yes or not

但primary并不知道其他primary投的是Yes还是No

57.03-57.10

 so the transaction coordinator has to notify all the primary so yes deed everybody voted yes 

So，事务协调器就得去通知所有primary告诉它们所有人投的都是Yes

57.10-57.12

so please do actually commit this 

并说，请你们去提交该事务

57.12-57.22

and the way the client does this is by appending another record to the logs of the primaries for each modified object 

对于每个修改过的对象来说，client通过对涉及该事务的primary上的日志添加另一条记录来做到这点

对于每个修改的对象来说，client会向该事务涉及的primary添加另一条记录来告诉它所有的人都投了Yes


57.22-57.26

this time it's a commit backup record that it's appending

此时它要去追加一个commit backup记录

57.26-57.36

and the this time the transaction coordinator I'm sorry I did commit primary I'm skipping over validate

这里我跳过了验证这一阶段

57.36-57.38

didn't commit backup for now I'll talk about those later 

我会在稍后去讨论commit backup这个阶段

57.38-57.40

so just ignore those for the moment

So，现在先忽略掉这些


57.40-57.43

 the transaction coordinator goes on to commit primary 

事务协调器会进入commit primary这一阶段

57.43-57.46

sends appends that commit primary to each primaries log

它会在commit primary阶段往每个primary的日志中追加日志条目

57.46-57.53

 and the transaction coordinator only has to wait for the hardware RDMA acknowledgments 

事务协调器只能去等待收到来自RDMA NIC的确认消息

57.53-57.59

it doesn't have to wait for the primary just actually process the log record 

它不用去等待primary去处理日志记录

57.59-58.05

the transaction coordinator it turns out as soon as it gets a single acknowledgment from any of the primaries

只要事务协调器收到任何primary所发送的确认信息

58.05-58.14

 it can return yes the okay equals true to the transactions signifying that the transaction succeeded 

它就可以返回Yes来表示这个事务已经执行成功

58.14-58.17

and then there's another stage later on 

在此之后，还有另一个阶段

58.17-58.25

where the  once the transaction coordinator knows that every primary knows that the transaction coordinated committed 

一旦所有primary知道事务协调器已经提交了这个事务

58.25-58.33

you can tell all the primaries that they can discard all the log entries for this transaction

那么你就可以告诉所有primary，它们可以丢掉与这个事务相关的日志条目了

58.33-58.38

okay now there's one last thing that has to happen 

Ok，现在最后要做的事情是

58.38-58.41

the primaries which are looking at the logs

primary会去查看这些日志

58.41*-58.43

 their polling the Logs

它们会对这些日志进行轮询

58.43-58.46

they'll notice that there's a commit primary record at some point 

它们会注意到在某一时刻有一个commit primary记录

58.46-58.59

and then the primary that receives the commit primary log entry will it knows that it had locked that object previously and that the object must still be locked 

收到这个commit primary日志条目的primary会知道，它之前将这个对象锁住了，并且这个对象必须依然被锁住

58.59-59.01

so what the primary will do is 

So，primary要做的事情就是

59.01-59.06

update the object in its memory with the new contents that were previously sent in the log message

使用先前收到的log消息中的新内容来更新其内存中的这个对象

59.06-59.09

I'm increment the version number associated with that object 

更新该对象相关的版本号

59.09-59.12

and finally clear the lock bit on that object 

最后清除该对象上的锁

59.13-59.14

and what that means is that

这意味着


59.14-59.20

as soon as a primary receives and processes a commit primary log message 

只要primary接收并处理了一条commit primary日志信息



59.20-59.28

it may since it clears the lock a bit and updates the data  it may well expose this new data to other transactions

它会对数据进行更新并将锁释放，它会将这个新数据暴露给其他事务




59.27-59.35

other transactions after this point are free to use it are free to use the object with its new value and new version number

在这个时间点后的其他事务就可以去使用这个具有新值和新版本号的对象

59.35-59.39

 all right

=======================================================================

59.39-59.47

 I'm gonna do an example any questions about the machinery before I start thinking about an example 

在我开始讲下一个例子之前，你们对此有任何疑问吗

59.47-59.53

feel free to ask questions any time 

只要你们有问题，那就尽管问吧

59.53-59.56

alright so how about an example

So，我们来看个例子吧

59.56-59.59

let's suppose we have two transactions

假设我们有两个事务

59.59-1.00.02

transaction one and transaction two 

T1和T2

1.00.02-1.00.03

and they're both trying to do the same thing 

它们都试着做相同的事情


1.00.03-1.00.09

they both just wanna increment X

它们都想对x进行加1

1.00.09-1.00.13

 X is the object sitting off in some servers memory

X是某个服务器内存中的一个对象

1.00.13-1.00.20

 so so both we got two transactions running through

So，我们要去执行这两个事务

1.00.20-1.00.22

this before we look into what actually happens

在我们看实际发生什么前

1.00.22-1.00.27

 we should remind ourselves what the valid possibilities are for the outcomes 

我们要提醒自己对于这些结果会有哪些可能性

1.00.27-1.00.33

so that's all about serializability  farm guaranteed serializability 

So，这些是关于FaRm所保证的执行顺序方面的东西



1.00.33-1.00.34

so that means that

So，这意味着

1.00.34-1.00.39

whatever farm actually does it has to be equivalent to some one at a time execution of these two transactions 

不管FaRm实际是怎么做的，它所执行的结果要和某一时间执行这两个事务所得的结果一致


1.00.39-1.00.46

so we're allowed to see was the results you would see if t1 ran and then strictly afterwards t2 ran

So，我们所允许看到的结果是当T1执行完后，然后才会执行T2






1.00.47-1.00.52

or we can see the results that could ensue if t2 ran and then t1 run

或者，我们可以看到T2先执行，T1再执行后所得到的结果

1.00.52-1.00.53

those are the only possibilities

这些是唯一的可能性

1.00.53-1.00.59

 now in fact farm is entitled to abort a transaction 

事实上，FaRm是有权去终止事务的

四十二  阅举报
14-04
1.00.59-1.01.05

so we also have to consider the possibility that one of the two transactions aborted or indeed that they both aborted 

So，我们得去思考下其中会发生的几种可能情况，即两个事务中有一个中止了，或者两个都中止了

1.01.05-1.01.08

since they're  doing the same thing

它们做的都是相同的事情


1.01.08-1.01.10

there's a certain amount of symmetry here 

这里的执行顺序是对称的

1.01.10-1.10.15

so one possibility is

So，其中一种可能是

1.10.15-1.01.16

 that they both committed 

这两个事务都提交了

1.01.16-1.01.20

and that means two increments happen 

这意味着，这两个加一都执行了

1.01.20-1.01.23

so one legal possibilities that X is equal to 2 and 

So，其中一种合法的可能就是x等于2

1.01.23-1.01.35

both then the TX it has to agree with whether things a bit or aborted or committed 

它得去判断这两个事务是都提交了，还是一个中止，一个提交

1.01.35-1.01.41

so that both transactions need to txCommit returned true in this case

So，在这个例子中，当x=2时，这两个事务需要看到txCommit所返回的结果为True

1.01.41-1.01.48

 another possibility is that only one of them transactions committed and the other aborted 

另一种可能则是只有其中一个事务提交了，另一个事务中止了


1.01.48-1.01.53

and then we want to see only one true

然后，我们想看到的是只有一个返回的是True


1.01.53-1.01.56

 and the other false

另一个返回的则是false

1.01.56-1.01.57

 and another possibilities maybe they both aborted

另一种可能则是它们都中止了

1.01.57-1.02.00

 we don't think this could necessarily happen

我们不认为这种事情一定会发生

1.02.00-1.02.01

 but it's actually legal

但实际上，如果发生的话，那也是合法的

1.02.01-1.02.04

 so that X isn't changed

So，X的值并未被改变


1.02.04-1.02.11

and we want both to get false back from txCommit 

我们想让txCommit给我们返回的都是false

1.02.11-1.02.17

so we better better not see anything other than these three options

So，我们不会看到除这三种选项以外的任何选项了

1.02.17-1.02.22

all right 



1.02.22-1.02.25

so of course what happens depends on the timing 

So，Of course，这里发生什么取决于发生的时间点

1.02.25-1.02.36

so I'm going to integrate out various different ways that the commit protocol could in early even 

So，我们通过结合这几种不同的情况来看看它的提交协议



1.02.36-1.02.43

for convenience I have a handy reminder of what the actual commit protocol is here

出于方便，我这里准备了一张方便参考的commit协议图

1.02.43-1.02.49

 so one possibility is

So，其中一种可能是

1.02.49-1.02.52

 that they run exactly in lockstep

它们在同一时间一起执行

1.02.52-1.02.56

 they both send all their messages at the same time

它们在同一时刻发送它们所有的消息

1.02.56-1.02.58

 they both read at the same time 

它们在同一时刻进行读取

1.02.57-1.02.59

I'm going to assume that X starts out as zero

这里我假设x的初始值为0

1.02.59-1.03.01

 if they both read at the same time

如果它们都在同一时间进行读取


1.03.01-1.03.02

that we're going to see zero

那我们读取到的就是0


1.03.02-1.03.05

 I assume they both sent out log messages at the same time

假设，它们都在同一时间发送log消息

1.03.05-1.03.11

and indeed they accompany their log messages with the value one

它们会在它们的log消息中附带的值为1

1.03.11-1.03.12

 since they're adding 1 to it 

因为它们要对x进行加一

1.03.12-1.03.14

and that if they commit

如果它们要进行提交操作

1.03.14*1.03.16

 if they log messages say yes

如果它们发送完log消息返回的是Yes

1.03.16-1.03.21

then they would if they did both commit at the same time

那么它们就会在同一时间提交事务

1.03.21-1.03.26

 so if this is the scenario 

So，如果是这种情况

1.03.26-1.03.27

what's going to happen

那么会发生什么呢？

1.03.27-1.03.28

 and why

以及这是为什么呢？

1.03.28-1.03.38

you they like to raise their hand and hazard a guess

你们举下手，猜一下这是为什么

1.03.38-1.03.50

well that's really both reads

Well，它们做的都是读操作

1.03.50-1.03.53

since that's a one-sided read can't possibly fail 

因为one-sided read是不可能失败的

1.03.53-1.04.03

they're both gonna send in fact identical log messages to whatever primary holds object X

事实上，它们将完全一样的log消息发送给持有对象x的这个primary

1.04.03-1.04.05

 and I both send the same version number

它们发送的版本号都是一样的

1.04.05-1.04.08

 but a version number they read is the same value

它们所读取的版本号都是一样的

1.04.08-1.04.16

 so the primaries gonna see 2 log meant 2 log messages in two different incoming logs

So，primary会在两个传入的日志中看到两条log消息

1.04.16-1.04.18

 assuming these are running on different clients 

假设，这两个事务是由不同的client执行的

1.04.18-1.04.27

and exactly what happens now is  slightly left up to our imagination by the paper 

现在所发生的事情有点超出我们的想象能力



1.04.27-1.04.33

but I think the two incoming log messages could be processed in parallel on different cores on the primary

但我觉得这两条传入的信息可以由这个primary上的不同CPU核心进行并行处理

1.04.33-1.04.40

 but the critical instruction of the primary is the atomic test and set or compare and swap 

但primary使用的关键指令是原子指令，即test-and-set或者compare-and-swap

1.04.40-1.04.49

exactly somebody's volunteer the answer that one of them will get to the compare and swap instruction first 

primary会对其中一个事务先使用compare-and-swap指令进行处理

1.04.49-1.05.00

and whichever core I guess the compare and swap instruction first it'll set the lock bit on that objects version

我猜不管是哪个CPU核心对其中一个事务先使用compare-and-set指令来设定该版本数据对象的lock标志位

1.05.00-1.05.02

 and will observe the lock bit wasn't previously set 

它会看到该对象的lock标志位之前并没有上锁

1.05.02-1.05.08

which everyone executes the atomic compare-and-swap second will observe the lock that's already set

当它对另一个事务执行原子命令compare-and-swap时，它会观察到该数据对象已经上锁了

1.05.08-1.05.13

 I mean he's the one of the two will return yes and the other two will fail the lock 

我的意思是，其中一个事务会返回Yes，另一个事务在设置锁的时候会失败

1.05.13-1.05.15

observe the lock is already set immature no

它会观察到该数据对象已经上锁了，所以会返回No

1.05.15-1.05.19

 and you know it for symmetry

你知道的，它们是对称的（知秋注：非对即错）

1.05.19-1.05.26

 I'm just going to imagine that transaction 2  the primary sends back a no 

假设T2从primary处拿到的回复是No

1.05.26-1.05.27

so the transaction 2 use client code will abort 

So，T2就会中止

1.05.28-1.05.33

transaction 1 I've got the lock got a yes back and it will actually commit 

T1已经拿到锁了，并且收到了primary所返回的Yes，所以它会去提交事务


1.05.33-1.05.35

when it commits

当它提交的时候

1.05.35-1.05.39

when the primary actually gets the commit message

当primary收到了commit消息后

1.05.39- 1.05.41

 it'll install the updated object

它会去更新这个对象

1.05.41-1.05.43

you know increments 2

将x变成2

1.05.43-1.05.47

to clear the lock bit increment the version and return true

接着将lock标志位清空（相当于释放），并对版本号加一，接着返回True


1.05.47-1.05.31

 this is gonna say true

So，这里返回的就是True


1.05.31-1.05.59！！！！！！！

 because the other primary sent back No that means that TX commits gonna return false here

primary给另一个事务返回的是No，这也就是说txCommit返回的结果是false

1.05.59-1.06.02

 and the final value would be x equals one 

x的最终结果为1

1.06.02-1.06.06

that was one of our allowed outcomes

这是我们允许的一个结果

1.06.06-1.06.08

 but of course it's not the only in are leaving 

但当然，这并不是我们所允许的唯一结果

1.06.08-1.06.16

any questions about how this played out or why executed the way it did

对于这个是如何发生的，或者它是如何执行的，你们有任何疑问吗

1.06.16-1.06.22

okay so there's other possible interleavings

Ok，这里还有一些其他的可能结果

1.06.22-1.06.27

 so how about this one

So，我们来看下这个

1.06.27-1.06.32

let's imagine that transaction 2 does the read first

假设T2先进行读操作


1.06.32-1.06.39

This doesn't really matter what the reads are concurrent  or not 

这里的读操作是并发执行的

1.06.39-1.06.40

then transaction one does read

接着，T1开始进行读操作

1.06.40-1.06.42

 and then transaction 1 a little bit faster 

T1的执行速度比T2更快

1.06.42-1.06.49

and it gets its log message in and a reply and gets a commit back

它发送了它的log消息，并收到了来自primary的回复，然后进行提交

1.06.49-1.06.55

 and then afterwards transaction two gets going again 

在此之后，T2才开始做这个事情

1.06.55-1.06.57

and sends a log message in

它给primary发送了一条log消息

1.06.57-1.07.01

 if it could，it commit 

如果它收到来自primary所返回的Yes，那它就可以提交

1.07.01-1.07.02

so what happens this time

So，此时这里发生了什么


1.07.18-1.07.22

well is this log message is gonna be succeed 

Well，这个log消息会被成功处理

1.07.22-1.07.25

because there's no reason to believe there's a lock bit is set

因为我们没有理由相信，该数据对象相关的lock标志位已经被设置了

1.07.25-1.07.29

because the second log message hasn't even been sent   lock message we'll set the lock 

因为T2此时还未发送lock消息去设置锁



1.07.29*1.07.33

the commit message this commit primary message should actually clear the lock a bit 

这个commit primary消息实际上会去清空该数据对象的lock标志位（即释放锁）




1.07.33-1.07.36

so the lock bit will be clear

So，这个lock标志位就会被清空

1.07.36-1.07.46

 by the time t2 sends inserts its lock entry in primaries log 

此时，T2会往primary的日志中追加lock条目




1.07.46-1.07.52

so this the primary won't see the lock a bit set at this point 

So，此时这个primary去查看这个数据对象时，它的lock标志位并没有被设置

1.07.52-1.07.59

yeah so somebody's volunteered that what this primary will see is that the version number

primary会看到该数据对象的版本号

1.07.59-1.08.04

 so the the log message contains the version number the transaction 2 originally read

So，这个log消息包含了T2一开始读到的该数据对象的版本号

1.08.04-1.08.10

 and so the primary is gonna see wait a minute this since commit primary increments of version number

因为commit primary会去增加该数据对象的版本号

1.08.10-1.08.13

 the the primary is gonna see that the version number is wrong

primary会看到T2所发的这个版本号是错误的

1.08.13-1.08.15

 there's numbers now higher on the real object 

该数据对象当前的版本号要比T2中的版本号要高

1.08.15-1.08.23

and so it's actually gonna send back a a no response to the coordinator

So，primary实际上会返回一个No给事务协调器

1.08.23-1.08.26

 and the coordinator is gonna abort this transaction and

事务协调器会去中止这个事务

1.08.26-1.08.29

again we're gonna get x equals 1

这里我们会拿到的x的值为1

1.08.29-1.08.32

 one of the transactions return true， the other returned false 

其中一个事务会返回True，另一个事务则返回False

1.08.32-1.08.37

which is the same final outcome as before 

它的最终结果和之前的结果是一样的

1.08.37-1.08.39

and it is allowed

这是我们所允许的结果

1.08.39-1.08.42

 any questions about how this played out？

对于这块是怎么一回事，你们有任何问题吗？

1.08.42-1.08.48

 a slightly different scenario would be as if

这里还有一种稍微不同的情况

1.08.48-1.08.53

and actually okay the slightly different scenario I was gonna think of think of was 

我觉得这种有点不同的情况是这样的




1.08.53-1.08.58

one in which the commit message was it happened after this lock

其中一种可能是这个commit消息是在这个lock消息发送之后发送的

1.08.58-1.09.01

 this is essentially the same as the first scenario

本质上来讲，这和第一种情况是一样的

1.09.01-1.09.08

 in which this transaction got the lock set in this transaction observed lock set

即T1拿到了锁，T2看到T1拿到了锁

1.09.08-1.09.09

okay



1.09.09-1.09.15

one last scenario 

我们来看最后一种情况




1.09.15-1.09.23

let's suppose we see this

假设我们看到的是这种情况




1.09.32-1.09.34

what's going to happen this time

此时会发生什么呢？

1.09.48-1.09.52

yeah somebody has a right answer 

有人知道了正确答案

1.09.52-1.09.53

at the of course the first transaction will go through 

Of course，T1会成功执行

1.09.53-1.09.55

because there's no contention in the first transaction

因为在T1中并不存在抢锁的情况

1.09.55-1.10.06

 the second transaction when it goes to read X will actually see the new version number as incremented by the commit primary processing on the primary

当T2去读取x的时候，它会看到一个（由T1在commit primary时候修改过的）新版本号

1.10.06-1.10.08

 so it'll see the new version number

So，它会看到新的版本号

1.10.08-1.10.11

 the lock that won't be set 

并且该lock标志位也没有被设置

1.10.11-1.10.16

and so then when it goes to send its lock log entry to the primary

So，接着当它给primary发送lock日志条目时

1.10.16-1.10.21

lock lock that locked processing code in the primary will see the locks not set

primary中处理锁的代码会看到这里的lock标志位并没有被设置

1.10.21-1.10.22

 and the version is the same 

它们的版本号是一样的




1.10.22-1.10.24

hasn't this is the latest version

这是最新的版本号

1.10.24-1.10.25

 and it allowed to commit

我们允许它去提交事务

1.10.25-1.10.28

 and so for this the outcome we're gonna see is x equals 2

So，在这种情况下，我们看到的x值是2




1.10.28-1.10.33

because this read not only read the new version um but actually read the new value which was one

因为这个读操作读取的不仅仅是新的版本号，它还读取了x的新值，即1

1.10.33-1.10.35

 so this is incorrect here 

So，这里写的不对

1.10.35-1.10.44

and both calls to txCommit will be true

它们调用txCommit返回的都是True

1.10.44-1.10.50

yes that's right both succeed it with x equals 2

没错，这两个事务都成功了，x的值等于2

1.10.50-1.10.52

all right



1.10.52-1.10.55

so you know this happened to work out in these cases

So，你知道的，在这些情况下，这些结果都是可能出现的

1.10.55-1.11.03

the intuition behind why optimistic concurrency control provides serializability

乐观锁并发控制为什么能提供有序执行呢？

1.11.03-1.11.12

why it basically checks that the execution that did happen is the same as a one at a time execution

简单来讲，它为什么会去检查该执行顺序和某一时刻的执行顺序是否一致呢？



1.11.12-1.11.15

 essentially the intuition is

从直觉上来讲

1.11.15-1.11.17

 that if there was no conflicting transaction 

如果事务间不存在冲突

1.11.17-1.11.19

then the version numbers and the lock bits won't have changed 

那么版本号和lock标志位就不会改变

1.11.19-1.11.21

if nobody else is messing with these objects

如果没有人弄乱这些对象

1.11.21-1.11.28

 you know I'll see the same version numbers at the end of the transaction as we did when we first read the object

你知道的，当我们第一次读取该对象时所拿到的版本号就会和上一个事务提交结束时的版本号相同

1.11.28-1.11.36

whereas if there is a conflicting transaction between when we read the object and when we try to commit a change

如果在我们读取一个数据对象和尝试提交修改之间存在了一个冲突事务

1.11.36-1.11.39

 and that conflicting transaction modified something 

这个冲突事务修改了某些东西

1.11.39-1.11.43

then if it actually started to commit 

然后，如果它实际开始进行提交了

1.11.43-1.11.46

we will see a new version number or a lock a bit set

那我们就会看到一个新版本号或者该lock标志位被设定上了

1.11.46-1.11.52

 so the comparison of the version numbers and lock bits between when you first read the object and when you finally commit 

So，在我们第一次读取该数据对象与最终提交事务这段时间内，通过比较该数据对象的版本号以及lock标志位

1.11.52-1.11.58

it kind of tells you whether some other commits to the objects snuck in while you were using them

它就会告诉你当你在使用这些东西的时候，是否有其他的提交也使用了这个对象



1.12.02-1.12.04

 all right and you know the cool thing to remember here is that 

这里要记住的一个很Cool的事情就是


1.12.04-1.12.10

this allowed us to do the reads

这允许我们去进行读操作

1.12.10-1.12.12

the use of this optimistic schema which we don't actually check the locks 

使用这种乐观锁方案时，实际上我们并不需要去检查锁

1.12.12-1.12.15

only when we first use the data 

当我们第一次使用该数据对象时

1.12.15-1.12.19

allowed us to use this extremely fast one sided RDMA reads to read the data

这允许我们使用速度超级快的one-sided RDMA来读取该数据对象

1.12.19-1.12.21

 and get high performance

并且获得很高的性能

1.12.21-1.12.23

 ok 



1.12.21-1.12.31

so the way I've explained it so far without validate and without commit back up is the way the system works

So，目前为止我所解释的这个系统是在没有验证和commit backup的情况下工作的

1.12.31-1.12.41

 but as I see validate is sort of an optimization for just reading an object but not writing it 

但正如我所见，对于读取对象来说，验证这一步骤是对它的一种优化，但对于写入操作来说，并不是

1.12.41-1.12.44

and commit backup as part of the scheme for fault tolerance

commit backup则是容错这方面的其中一部分方案

1.12.44-1.12.49

 I think I'm gonna a few minutes we have left I want to talk about validate

我们还剩几分钟，我想来讨论下验证

1.12.49-1.12.59

 so the validate stage is it's an optimization for to treat objects that we're only read by the transaction and I'm not written 

So，对于我们在事务中读取对象（并不是写入对象）来说，验证这一阶段是对它的一种优化

1.12.59-1.13.04

and it's going to be particularly interesting if it's a straight read-only transaction that modified nothing 

如果它就是一个不修改任何数据的简单只读事务，那么这就令我们很感兴趣了

1.13.04-1.13.07

and you know the optimization is that

你知道的，这里优化所做的事情是




1.13.07-1.13.13

 it's going to be that the transaction coordinator can execute the validate with a one-sided read

事务协调器可以通过one sided read来进行验证

1.13.13-1.13014

that's extremely fast

这样速度超级快

1.13.14-1.13.21

rather than having to put something on a log and wait for the primary to see our log entry and think about it 

这样我们就无须将东西放入日志并等待primary去查看我们的日志条目对其进行处理了

1.13.21-1.13.26

so this validates one-sided reads is going to be much much faster 

So，在验证这一阶段，使用one-sided read的话速度就会变得非常非常快

1.13.26-1.13.30

it's gonna essentially replace lock for objects that would only read it's gonna be much faster

本质上来讲，它代替了对象锁的作用它可以让只读变得更快


1.13.30-1.13.37

basically what's going on here is that

简单来讲，这里所发生的事情是

1.13.37-1.13.41

what the validate does is

验证阶段做的事情是




1.13.41-1.13.45

 the transaction coordinator refetch is the object header 

事务协调器会去刷新该对象的header

1.13.45-1.13.47

so you know it would have read an object say

So，它会去读取这个对象，并说

1.13.47-1.13.51

 this object in the execute phase when it's committing  it

在执行阶段，当它要提交事务的时候

1.13.51-1.13.53

 instead of sending a lock message

这里我们不会发送一个lock消息


1.13.53-1.14.03

 it refetches the object header  and checks whether the version number now is the same as the version number when it first read the object

它会去刷新该对象的header，并检查当前版本号是否和它一开始读取该对象时的版本号一致

1.14.03-1.14.05

and it also checks if the lock bit is clear

它也会去检查这里的锁是否被释放

1.14.05-1.14.10

 so so that's how it works

So，这就是它的工作方式

1.14.10-1.14.16

so instead of setting a lock message，send this validate message should be much faster for a read-only operation

So，对于一个只读事务来说，比起发送lock消息来说，发送一个validate消息的速度要来得更快

1.14.16-1.14.24

so let me put up another transaction example and run through it how it works

So，让我再来给你们看一个事务案例，并演示下它是如何工作的

1.14.24-1.14.25

let's suppose x and y are initially 0 

假设x和y一开始是0

1.14.25-1.14.27

we have two transactions 

我们有两个事务




1.14.27-1.14.37

t1 if X is equal to zero set y equal one

在T1中，如果x等于0，y等于1




1.14.37-1.14.46

 and T two says if Y is zero said x equals one

在T2中，如果y等于0，x等于1

1.14.46-1.14.52

 but this is a absolutely classic test for strong consistency 

这是强一致性中一个非常经典的案例

1.14.52-1.14.57

if the execution is serializable 

如果执行是有顺序的

1.14.57-1.15.04

it's going to be either t1 then t2 or t2 and t1 

那么它的执行顺序可以是先T1后T2，或者先T2再T1

1.15.05-1.15.11

it's get to see any you know corrected implementation has to get the same results  it's running them one at a time

你知道的，当在执行这些事务的时候，正确的实现应该在任意时间所得到的结果都是一致的



1.15.11-1.15.13

if you run T1 and then t2

如果你先运行T1再运行T2

1.15.13-1.15.19

 you're gonna get y equals 1 and x equals 0 

那么你得到的结果就是y等于1，x等于0




1.15.19-1.15.21

because the second if statement Y is already 1

因为在第一个if语句中y已经等于1了

1.15.21-1.15.23

the second if statement won't do anything

所以，第二个if语句就不会做任何事情

1.15.23-1.15.30

 and symmetrically this will give you x equals 1 and y equals 0

对称的来讲，第二种情况，我们所得到的结果是x等于1，y等于0

1.15.30-1.15.32

and it turns out that 

事实证明

1.15.32-1.15.34

if you if they both abort 

如果它们都中止了

1.15.34-1.15.36

you can get x equals 0 y equals 0

那么我们所得到的结果就是x等于0，y等于0




1.15.36-1.15.43

but what you are absolutely not allowed to get is x equals 1 y equals 1

但你绝对无法得到的结果就是x等于1，y等于1




1.15.43-1.15.45

 that's not allowed

这是不允许出现的

1.15.45-1.15.49

ok 



1.15.49-1.15.57

so we're looking for how I'm going to use this as a test see what happens with validate

So，我们会通过这个测试来看看验证阶段会发生什么

1.15.57-1.16.04

 and again we're gonna suppose these two transactions execute 

假设这两个事务会执行




1.16.04-1.16.08

most so obvious cases they execute it absolutely at the same time 

但在这个例子中，很明显它们肯定会同时执行

1.16.08-1.16.13

 that's the hardest case

这是最难的一个例子




1.16.13-1.16.20

 okay so as we have read of X and read of Y

So，我们要去读取x和y的值

1.16.20-1.16.28

wo gonna lock y

我们会去对y进行上锁




1.16.28-1.16.30

 because we wrote it and lock y here

因为我们对y进行了写入操作，所以这里对它进行上锁

1.16.30-1.16.33

 I sort of lock X here

这里对于x也是一样，我们也要对它进行上锁

1.16.33-1.16.38

but since now we're using this read-only a validation optimization

但因为这里我们使用的是对只读事务的验证优化




1.16.38-1.16.40

 that means this one has to validate y

这意味着T2得去对y进行验证

1.16.40-1.16.42

 this one has to validate X

T1需要对x进行验证

1.16.40-1.16.45

you know it's a read X but didn't write it so it's going to validate it 

你知道的，这里对x进行读取，但没有写入。So，它会去对x进行验证

1.16.45-1.16.45

much quicker 

这样的话，速度会更快




1.16.45-1.16.48

and maybe it's going to commit and maybe it's commit

最后它们可能会进行提交操作

1.16.48-1.16.49

 and so the question is

So，它的问题是

1.16.49-1.16.58

 if we use this validate as I described it that just checks the version number and lock but haven't the version number hasn't changed in the lock but isn't set

如果我们使用验证，正如我所描述的，它只是去检查版本号和lock标志位，看看版本号是否未被修改，lock标志位也没被设置

1.16.58-1.17.02

will we get a a correct answer

这样我们会得到一个正确的结果吗

1.17.20-1.17.24

and no actually 

实际上不会

1.17.24-1.17.27

both the validation is gonna fail for both

这两个验证操作都会失败

1.17.27-1.17.32

 because when these lock messages were processed by the relevant primaries

因为当这些lock消息被相关primary进行处理时

1.17.32-1.17.35

 they cause the lock bit just to be set 

这就会导致lock标志位被设定上

1.17.35-1.17.39

initially presumably the the reason okay did a cleared lock bit

假设一开始lock标志位并没有被设定上

1.17.39-1.17.41

 but when we come to validate

当我们要进行验证的时候

1.17.41-1.17.48

 even though the client is doing the one-sided read of the object header for X&Y

虽然client对x和y的header进行的是one-sided read

1.17.48-1.17.53

 it's gonna see the lock bit that was set by the processing of these lock requests

它会看到这些在处理lock请求时被设定上的lock标志符

1.17.53-1.18.00

and so they're both gonna see the lock bits set on the object that they merely read

So，它们会看到它们所读取的对象的lock标志位已经被设定上了




1.18.00-1.18.03

 and they're both going to abort

这两个事务都会中止




1.18.03-1.18.08

 and neither X nor Y will be modified

x或者y都不会被修改

1.18.08-1.18.10

 and so that was one of the legal outcomes

So，这是其中一个合法的结果

1.18.10-1.18.16

that's right somebody somebody notice this indeed both validates will fail

有人注意到这两个验证操作都会失败

1.18.16-1.18.21

another of course sometimes that a transaction can go through

Of course，有的时候，其中一个事务可以执行成功

1.18.21-1.18.28

 and here's a scenario  in which it does work out

这里有一种确实会出现的场景




1.18.28-1.18.31

this was transaction one is a little faster

T1会执行地稍微快点

1.18.31-1.18.33

 validates

接着，是验证操作

1.18.44-18.45

all right



18.44-1.18.50

 so what's going to happen a transaction one is a little bit faster

So，这里所发生的事情是，T1的执行速度会快一点

1.19.02-1.19.06

so this time it's validates gonna succeed

So，此时验证操作就会成功

1.19.06-1.19.10

 because nothing has happened to X between when transaction 1 read it and when it validated 

因为在T1读取x并对其进行验证这段时间里，没有人对x有任何操作

1.19.10-1.19.14

so presumably the lock also went through without any trouble

So，在没有发生任何麻烦的情况下，这个lock标志位（Ly）也被成功设定上了

1.19.14-1.19.15

because nobody's modified Y here either

因为这里也没有其他人对y进行修改

1.19.15-1.190.18

so the primary answered yes for this 

So，primary会对此响应Yes

1.19.18-1.19.24

the one-sided read revealed an unchanged version number and lock bit here 

通过one-sided read会看到一个未被修改的版本号以及lock标志位

1.19.24-1.19.25

and so transaction one can commit

So，T1可以进行提交

1.19.25-1.19.28

 and it will have incremented Y 

它会增加y的值

1.19.28-1.19.29

but by this point

但在此时




1.19.29-1.19.39

 if this is the order when the primary process is this actually when the primary process is lock of X 

当primary处理lock x的时候

1.19.39-1.19.40

this will also go through with no problem

这一步操作也会成功

1.19.40-1.19.41

 because nobody's modified X

因为没有人对x进行修改

1.19.41-1.19.48

 when the primary for Y processes the validate for Y though

当primary对y进行验证时

1.19.48-1.19.56

it's I'm sorry when the client running transaction two refetch is the version number lock bit for y

抱歉，我说错了，当client执行T2时，会去刷新y的锁标志位和版本号（知秋注：执行阶段是读到了最初的数据，验证阶段是刷新并对比数据，方便下一步进行）

1.19.56-1.20.01

 it's either gonna see this really depends on whether the committee's happen

它看到的情况取决于T1是否提交

1.20.01-1.2002

 if the commit hasn't happened yet

如果T1还未被提交




1.20.02-1.20.05

 this valid a will see that the lock bit is set 

这个验证操作就会看到y的lock标志位被设定了




1.20.05-1.20.05

because it was set back here

因为当T1提交后，这里又将lock标志位给设置回去了




1.20.06-1.20.08

 if the commit has happened already

如果事务已经提交了

1.20.08-1.20.10

 then the lock bit of will be clear 

那么这里的lock标志位就会被清空

1.20.10-1.20.17

but this validate one-sided reader will see a different version number than was originally seen

但在这个验证操作中，通过one-sided read会看到一个与它一开始看到的版本号所不同的一个版本号

1.20.17-1.20.19

and it needs somebody it's just this answer

它需要让其他人看到这个答案

1.20.19-1.20.22

 so one will commit， so that transaction one will commit 

So，T1会被提交

1.20.22-1.20.25

transaction 2 will abort

T2会被中止

1.20.25-1.20.28

and although I don't have time to talk about it here

我现在没有时间来讨论这个东西了

1.20.28- 1.20.30

 if there's a straight read-only transaction

如果这里有一个简单的只读事务

1.20.30-1.20.33

 then there doesn't need to be a locking phase 

那么这里就不会经历一个locking阶段

1.20.33--1.20.35

and there doesn't need to be a commit phase 

那么这也就不需要经历commit阶段了

1.20.35-1.20.42

pure read-only transactions can be done with just just reading blind reads for the reads sorry one-sided RDMA reads for the reads

我们可以通过one-sided RDMA来处理纯粹的只读事务

1.20.42-1.20.45

one-sided RDMA reads for the validates 

即在验证阶段使用one-sided RDMA进行读取

1.20.45-1.20.46

and so they're extremely fast

So，它们的速度会非常快

1.20.46-1.20.53

read-only transactions are and don't require any work any attention by the server

只读事务不需要服务器做太多工作

1.20.53-1.20.57

so and this is at the heart 

So，这就是核心

1.20.57-1.21.05

you know trends these reads and indeed though everything about farm is very streamlined

在FaRm中的所有东西都是非常精简的

1.21.05-1.21.06

partially due to RDMA

部分原因是因为RDMA

1.21.06-1.21.08

and it uses OCC 

并且它使用了OCC

1.21.08-1.21.14

because it's basically forced to in order to be able to do reads without checking locks 

简单来讲，这里强制它在不检查锁的情况下能够进行读取

1.21.14-1.21.17

there are a few brown downsides though

虽然它还有一些缺点

1.21.17-1.21.21

 it turns out optimistic concurrency control really works best if there's relatively few conflicts

事实证明，如果没有什么冲突发生，那么乐观锁并发控制的效果就会很棒

1.21.21-1.21.23

 if there's conflicts all the time

如果一直发生冲突的话

1.21.23-1.21.26

 then transactions will have to abort

那么事务就得被中止

1.21.26-1.21.30

and there's a you know a bunch of other restrictions I already mentioned

正如我已经提到的，这里面还存在着一系列限制

1.21.30-1.21.33

like on farm like the data must all fit in the RAM

比如在FaRm中，所有的数据都得放在内存中

1.21.33-1.21.35

 and all the computers must mean that the same data center

所有的服务器都得放在同一个数据中心

1.21.35-1.21.46

nevertheless this was viewed at the time and still as just a very surprisingly high-speed implementation of distributed transactions

然而，这仍被视为一种令人惊叹速度很快的分布式事务实现

1.21.46-1.21.53

  like just much faster than any system in sort of in production use

 这要比运用在生产中的任何系统都来得快

1.21.53-1.21.58

and it's true that Hardware involves a little bit exotic and really depends on this non-volatile Ram scheme 

而且硬件也有点异类，它非常依赖于NVRAM方案

1.21.58-1.22.01

and it depends on these special RDMA NICs and

它也基于这些特殊的RDMA NIC

1.22.01-1.22.04

those are not particularly pervasive now

现在这些东西都还不是特别普遍

1.22.04-1.22.07

 but you can get them

但你可以去使用它们

1.22.07-1.22.16

 and with performance like this it seems likely that they'll both in viewing and RDMA will eventually be pretty pervasive in data centers 

在性能方面，在数据中心里面RDMA非常流行

1.22.16-1.22.18

so that people can play these kind of games and 

So，这样人们就可以使用这些技术了

1.22.18-1.22.21

that's all I have to say about farm 

这就是我要说的关于FaRm的一切了

1.22.21-1.22.25

happy to take any questions if anybody has some

如果你们有任何问题的话，我很乐意为你们进行解答

1.22.25-1.22.29

 and if not I'll see you next week with a spark

如果没有什么问题要问的话，下周我会跟你们讲Spark

1.22.29-1.22.33

which is you may be happy to know absolutely not about transactions

你们肯定很想去了解这个，因为这里面没有事务

1.22.33-1.22.35

 I heard everyone bye-bye

回头再见

三十九  阅举报
