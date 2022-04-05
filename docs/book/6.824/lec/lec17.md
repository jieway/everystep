17-01
0-0.05

alright hello everyone 

大家好

0.05-0.07

let's get started

让我们开始吧



0.07-0.14

 today the topic is causal consistency

今天的主题是因果一致性（causal consistency）

0.14-0.21

and then use the cops system

然后就是使用COPS系统

0.21-0.25

the COPS paper that we read today is a case study for causal consistency

我们今天要读的COPS paper就是关于因果一致性的一个案例研究

0.25-0.27

So the setting is actually familiar 

So，实际上你们会对这种设置非常熟悉

0.27-0.39

we're talking again about big websites that have data in multiple data centers 

我们今天会再次以大型网站为例，他们将数据放在多个数据中心

0.39-0.51

and they want to replicate the data in each of their all their data in each their data centers have to keep a copy close to users and for perhaps for fault tolerance 

他们想对他们每个数据中心中的数据进行复制，以此来让数据副本靠近他们的用户，这可能也有容错方面的考量

0.51-0.54

so as usual

So，在通常情况下




0.54-0.58

we have maybe I'll have three data centers

假设我们有3个数据中心

0.58-1.05

and you know because we're building big systems 

你知道的，我们构建的是一个大型系统

1.05-1.06

we're going to shard the data

我们要对数据进行分片

1.06-1.08

and every data center is going to have multiple servers

每个数据中心里都放着多台服务器




1.08-1.15

 with you know maybe all the keys that start with Z a through all the z corresponding shards of everywheres

这些服务器上面保存着key从a到z所对应的数据分片

1.15-1.24

 we've seen this for 

我们之前就已经遇到过这种场景

1.24-1.34

and you know the usual goals people have you know there's many different designs for how to make this work 

你知道人们通常想要达成的目标是什么，并且你也知道我们可以通过不同的设计来达成他们的目标

1.34-1.38

but you know you really like reads to be certainly like reads to be fast

你希望读操作的速度能够很快

1.38-1.41

 because these web workloads tend to be read dominated 

因为这些web workload往往是以处理读请求为主

1.41-1.49

and you know you'd like writes to work and you'd like to have us as much consistency as you can

你想要去做写工作，你会尽可能地去保证一致性

1.49-1.53

so the fast reads are interesting

So，我们对快速读取很感兴趣

1.53-1.56

 because the clients are typically web browsers

因为client通常都是web浏览器




1.56-2.03

so and there's web going to be some set of web browsers which all call clients

So，这里会有一些web浏览器，我们将它们称为client

2.03-2.08

 the clients the storage system but they're really web browsers talking to a user's browser 

和存储系统进行通信的client，其实就是用户的浏览器

2.08-2.10

so the typical arrangement is

So，通常的设置是这样的

2.10-2.15

 that the reads happen locally and writes might be little more complicated

读操作是在当地数据中心进行处理，写操作则要更为复杂

2.15-2.20

so one system that fits this pattern is spanner

So，有一种系统能够适用于这种模式，它就是Spanner

2.20-2.28

you remember that a spanner and spanner writes involved Paxos that runs across all the data centers 

如果你还记得Spanner的话，Spanner在处理写操作的时候，使用到了运行在所有数据中心上的Paxos

2.28-2.29

so if you do a write in paxos

So，如果你在Paxos中进行一次写操作

2.29-2.33

maybe a client in a data center needs to do a write

当数据中心中的某个client需要进行一次写操作的时候

2.33-2.39

the communication involve actually need requires Paxos

内在的沟通访问会需要Paxos协议

2.39-2.44

 maybe running on one of these servers to talk to at least a majority of the other data centers that are replicas 

比如可能dc1中的这个服务器沟通访问的至少是另一个数据中心replicas中绝大数派中的某个服务器

2.44-2.46

so the writes tend to be a little bit slow 

 So，执行写操作时的速度就会有点慢

2.46-2.51

but there very consistent 

但它的一致性却很高

2.51-2.51

in addition

此外

2.51-2.53

Spanner supports two-phase commit 

Spanner支持两阶段提交

2.53-2.54

so we had transactions

So，我们可以使用事务

2.54-2.57

and the reads are much faster 

并且读操作的速度会更加快

2.57-3.03

because the reads used a true time scheme that the spanner of paper described

因为处理读操作时用到了Spanner那个paper中所描述的true time方案

3.03-3.07

and read only consulted local replica

它只从本地replica中读取数据

3.07-3.09

we also read the Facebook memcache new paper 

我们之前也读过了Facebook所写的那篇关于memcache的paper

3.09-3.13

which is another design in this demo pattern

这是该demo中所使用的另一种设计

3.13-3.17

the Facebook memcache key paper there's a primary site

在Facebook的memcache paper中，他们使用了一个主数据中心

3.17-3.20

 that has the primary set of MySQL databases 

它里面放着一组运行着MySQL的数据库

3.20-3.22

so if a client wants to do a write

So，如果一个client想执行一次写操作




3.22-3.26

 I suppose the primary site this data center 3 does to send all rights to data center 3 

假设主数据中心将所有的写操作发送给数据中心3

3.26-3.32

and then data center 3 sends out new information or invalidations to the other data centers

然后，数据中心3会将新的信息或者失效信号发送给其他的数据中心

3.32-3.34

right so actually a little bit expensive

So，实际上，这样的成本有点高

3.34-3.37

and not unlike spanner 

并且它的做法和Spanner并不相似

3.37-3.38

on the other hand

另一方面

3.38-3.41

all the reads are local 

所有的读操作都在是本地数据中心进行的

3.41-3.42

when a client needs to do a read

当一个client需要进行一次读操作时

3.42-3.45

it could consult a memcache server in the local data center

它就可以从本地数据中心中的memcache服务器那里获取数据

3.45-3.51

 and there's memcache reads just blindingly fast

并且memcache处理读操作的速度非常快

3.51-3.57

 this the people reporting them a single memcache the server can serve a million reads per second 

人们之前就说过，memcache每秒能处理一百万次读操作

3.57-3.57

which is very fast

这种速度真的非常快

3.57-4.05

 so again the Facebook memcache scheme needs to involve cross data center of communication for rights

So，Facebook所使用的这种memcache方案在处理写操作时要涉及到跨数据中心间的通信

4.05-4.07

 but the reads are local

但读操作都是在本地数据中心里面处理的

4.07-4.12

 so the question for today and the question of the cops papers answering is 

So，今天关于COPS这篇paper的问题是

4.12-4.13

whether we can have a system

我们是否能拥有这样一种系统

4.13-4.18

 that allows writes to perceive purely locally 

它允许我们在本地数据中心执行写操作

4.18-4.20

and this from the clients point of views

从client的角度来说

4.20-4.22

that the client can talk to the for once it were write

当它要执行写操作的时候

4.22-4.30

 they can send the write to local replica in its own data center as well as some reads to just the local replicas 

它们可以将写操作发送给它自己所在的数据中心中的本地replica进行处理，读操作也可以从本地的replica中读取数据

4.30-4.33

and never have to wait for other data centers 

并且它们无须等待来自其他数据中心的回复

4.33-4.38

never have to talk to other data centers or wait for other data centers to do writes

并且它们也永远不需要和其他数据中心进行通信，或者等待其他数据中心来执行写操作








4.38-4.46

so what we really want is a system that can have local reads and local writes

So，我们真正想要的是一个能在本地处理读和写操作的系统

4.46-4.52

that's the big that's the big goal really a performance goal 

这是我们在性能方面想要达成的目标

4.52-4.58

this would help for performance of course cuz now unlike spanner and Facebook paper

从性能方面来讲，和Spanner以及Facebook的那篇paper不同的是

4.58-5.02

we had a purely local writes be much faster from the clients point of view

从client的角度来看，如果我们能在本地执行写操作的话，速度会更快

5.02-5.06

 um it might also help with fault tolerance，robustness 

这也对容错（fault tolerance），健壮性（robustness）来说会有所帮助

5.06-5.08

if writes can be done locally

如果写操作能在本地处理

5.08-5.13

then we don't have to worry about whether other data centers are up or whether we can talk to them quickly

那么我们就不需要担心其他数据中心是否活着，或者我们能否和它们快速通信

5.13-5.15

because the clients don't need to wait for them

因为client无须去等待它们的响应

5.15-5.22

 so we're gonna be looking for systems that have this this level of performance 

So，我们要去找到具备这种级别性能的系统

5.22-5.28

and in the end we're gonna let the consistency model 

最后我们还想具备一致性

5.28-5.29

you know cuz we're going to be worried about consistency

你知道的，因为我们对一致性非常关心

5.29-5.32

 if you only do the writes initially to the local replicas 

如果你刚开始只在本地的replica中执行写操作

5.32-5.35

you know what about other data centers replicas data 

那么其他数据中心中replica上的数据会怎么样呢？

5.35-5.37

so we'll certainly be worried about consistency

So，我们肯定会去关心一致性方面的事情

5.37-5.43

but the attitude for this lecture at least is that we're gonna let the consistency trail along behind the performance

但在这节课上，我们会优先考虑性能，其次再考虑一致性

5.43-5.47

 you know once we figure out how to get good performance will

一旦我们弄清楚该如何获得不错的性能

5.47-5.50

 well then sort of figure out how to define consistency

然后，我们才会去弄明白该如何定义一致性

5.50-5.52

think about whether it's good enough

并思考下它是不是足够的好

5.52-5.53

 okay 



5.53-5.55

so that's the overall strategy

So，这就是整体策略

5.55-6.07

 I'm gonna actually talk about two strawman designs to sort of okay but not great designs on the way to before we actually talk about how cops works

在我们实际讨论COPS的工作原理之前，我会先讲两个还算ok，但并不是特别好的设计

6.07-6.14

 so first i want to talk about a simplest design

So，首先我想讨论一种最简单的设计

6.14-6.17

 that follows this local writing strategy 

它遵循了这种local write策略




6.17-6.20

that I can think of I'll call this straw man 1

我将这种设计称作straw（稻草） man 1

6.20-6.26

 so in straw man one

So，在straw man 1中




6.26-6.32

we're going to have three data centers

我们会有3个数据中心

6.32-6.39

and let's just assume that the data is sharded two ways in each of them

我们假设在每个数据中心中，数据被拆分为两个分区

6.39-6.42

so key from maybe A to M

So，左边这个分区存放的可能是key从A到M所对应的数据



6.42-6.44

 and keys from N to Z

右边这个分区放着的可能是key从N到Z所对应的数据（这里只标出了A到M）

6.44-6.46

shard it the same way in each of the data centers 

每个数据中心里的数据是以相同的方式进行拆分



6.46-6.56

and the clients will read locally

client会从数据中心本地读取数据

6.56-6.59

 and if a client writes

如果client要进行写操作

6.59-7.02

so supposing a client needs to write it key that starts with M 

So，假设一个client要对以M开头的key所对应的数据进行写操作




7.02-7.13

the clients gonna send a write of key M to the shard server the local shard server that has its responsible key starting with M

client会发送一个携带这key M的write操作发送给本地（该数据中心内的）保存着该key对应数据的shard server




7.13-7.18

that shard server would return reply to the client immediately saying oh yes I did your write

该shard server就会立刻回复client并说：Yes，我执行了你的写操作

7.18-7.22

 but in addition

但除此之外

7.22-7.32

each server will maintain a queue of outstanding writes that have been sent to it recently got clients that it needs to send to other data centers

每个服务器会维护一个它从client那里所收到的未执行的write操作队列，它需要将这个队列发送给其他数据中心




7.32-7.40

 and it will stream these writes asynchronously in the background to the corresponding servers in the other data center

它会在后台以异步的方式将这些写操作推流给其他数据中心中对应的服务器

7.40-7.42

So after applying to the client

So，在它执行完client端所发送的写操作后




7.42-7.49

our shard server here will send a copy of the clients write to each of the other data centers

我们的shard server会发送该client的写操作的副本给所有其他数据中心

7.49-7.54

and you know those writes go through the network maybe they take a long time

你知道的，这些写操作会通过网络进行发送，这可能需要花很长一段时间

7.54-7.58

eventually they're gonna arrive at the target data set the other data centers 

最终它们会到达其他数据中心

7.58-8.02

and each of those shard servers will then apply the write to its local table of data 

每个shard server会对它本地数据表中的数据执行这些写操作

8.02-8.10

so this is a design that has very good performance right

So，这种设计拥有非常不错的性能

8.10-8.12

the reads and write are all done locally 

这些读和写操作都是在本地完成的

8.12-8.15

may never have two clients never have to wait

client就无须进行等待了

8.15-8.16

there's a lot of parallelism

这里面存在着大量的并行

8.16-8.22

because you know this shard server for A and the shard servers for M  more opportunity independently

因为保存着A相关数据的shard server和保存着M相关数据的shard server是彼此独立的

8.22-8.24

 if the shard server for A gets write

如果保存着A数据的shard server收到了一个写操作

8.24-8.28

 you know it has to push its data to the corresponding shard servers in other data centers

你知道的，它就得将它的数据推送给其他数据中心中它所对应的shard server



8.28-8.34

but it can do those pushes independently of other shard servers pushes

但它也可以单独将与其他shard server相关的写操作推送出去

8.34-8.39

 so there's parallelism both in serving and and pushing the writes around

So，执行写操作和将写操作推送到其他数据中心，这两者间是并行的

8.39-8.47

 if you think about it a little bit，this design also essentially effectively favors reads 

如果你稍微思考一下，本质上来讲，其实这个设计也是偏向于读操作

8.47-8.51

and the reads really never have any impact beyond the local data center 

读操作永远不会对本地数据中心产生任何影响

8.51-8.53

the writes though do a bit of work

处理写操作时则要多费些功夫

8.53-8.53

 whenever you do a write

当你进行写操作的时候

8.53-8.55

you know the client doesn't have to wait for it

client无须等待其他数据中心完成该写操作

8.55-8.59

 but the shard server then has to push the writes out to the other data centers

但shard server之后会将这些写操作推送给其他数据中心

8.59-9.04

and you know reads that new data the other data center then proceed very quickly 

你知道的，如果是读操作的话，那么其他数据中心就可以很快执行它

9.04-9.07

so reads involve less work than writes

So，读操作所涉及的工作要比写操作来得少

9.07-9.10

 and that's appropriate for a read heavy workload

这非常适合于那些涉及大量读操作的workload

9.10-9.13

 if you are more worried about write performance

如果你更在意写方面的性能



9.13-9.15

 you could imagine other designs 

你可以去想象下其他设计

9.15-9.16

for example

例如

9.16-9.21

you can imagine design in which reads actually have to consult multiple data centers and writes are purely local 

你可以想象下这种设计，即执行读操作的时候，我们要从多个数据中心中获取数据，然而写操作则是纯粹在本地执行

9.21-9.23

so you can imagine a scheme 

So，你可以想象下这种方案

9.23-9.24

in which you have when you do a read

当你进行一次读操作的时候

9.24-9.35

you actually read the data from each of the other date the current copy of the key you want from each of the other data centers and choose the one that's most recent perhaps 

实际上，你会从其他数据中心中读取该key所对应数据的当前副本，并从中读取版本号最新的那个数据

9.35-9.36

and then writes are very cheap 

那么，执行写操作的成本非常低

9.36-9.38

and reads are expensive

然而，执行读操作的成本就很高

9.38-9.41

 or you can imagine combinations of these two strategies

或者，你可以想象下将这两种策略结合在一起的情况

9.41-9.43

some sort of quorum overlap scheme

比如Quorum overlap方案

9.44-9.46

or you write a majority

或者你只将写操作发给多数派服务器来处理

9.46-9.49

and write a majority at the only a majority of data centers

执行写操作时，只需要多数派数据中心执行就可以了

9.49-9.50

and read a majority of data centers 

并且读取数据也是从多数派数据中心中读取

9.50-9.52

and rely on the overlap 

这依赖于重叠的那部分服务器

9.52-9.53

and in fact

事实上

9.53-10.00

there are real live systems that people use in commercially in real websites

在很多商业网站上，人们都将这种系统投入了使用

10.00-10.02

 that follow much this design

这些系统遵循了这种设计

10.02-10.05

so if you're interested in sort of a real world version of this

So，如果你们对这种设计的工业级版本感兴趣




10.05-10.13

you can look up Amazon's dynamo system or the open source Cassandra system

那么你可以去看下Amazon的Dynamo系统或者开源的Cassandra系统

10.13-10.18

there was much more elaborated than when I've sketched out here 

它们的设计要比我这里画的草图来得更为详细

10.18-10.21

but they follow the same basic pattern

但它们遵循的基本模式是相同的




10.21-10.27

 so the usual name for this kind of scheme is eventual consistency

So，这种方案通常叫做最终一致性（eventual consistency）

10.27-10.32

 and the reason for that is

之所以这么称呼它的原因是

10.32-10.38

that at least initially

至少在一开始的时候

10.38-10.41

 if you do a write

如果你执行一次写操作

10.41-10.46

 other readers and other data centers are not guaranteed to see this write

我们保证不让其他的reader和其他数据中心看到这个写操作



10.46-10.48

but they will someday

但它们终有一天会看到你所做的这个写操作

10.48-10.50

 because you're pushing out the writes

因为你会将这些写操作推送给它们

10.50-10.51

so they'll eventually see your data

So，它们最终会看到你的数据

10.51-10.54

 there's no guarantee about order

这对执行顺序无法保证

10.54-10.56

 so for example 

So，例如

10.56-10.59

if I'm a client and I write key starting with M

如果我是一个client，然后我要对M开头的key所对应的数据进行写入操作

10.59-11.01

and then I write a key starting with A

接着，我对A开头的key所对应的数据进行写入操作




11.01-11.08

sure you know M sends out it's my write to shards of a rim sends out one write

保存着M开头的key所对应数据的shard server会将这个写操作发送给其他数据中心

11.08-11.11

 and the server for A sends out my write for A

保存着A相关数据的shard server会将我的写操作发送给其他数据中心中对应的服务器

11.11-11.16

but you know these may travel at different speeds or different routes on the wide area network

但你知道的，这些写操作会以不同的速度或者路线在广域网中传播




11.16-11.19

 and  maybe the client wrote M first  and then A

可能是这个write M先到达，接着再是这个write A

11.19-11.23

but maybe if they for A arrives first and then the update for M 

但也可能是write A先到达，再是write M

11.23-11.28

and maybe I arrive at the opposite order other datacenter

可能这两个写操作到达其他数据中心的顺序是相反的

11.28-11.32

so different clients are gonna observe updates in different orders 

So，不同的client观察到的更新顺序也是不同的

11.32-11.37

so there's you know no order guarantee

So，这不保证顺序

11.37-11.45

the sense the sort of ultimate meaning eventual consistency is that 

最终一致性意味着

11.45-11.49

if things settle down and people stop writing and

如果事情都安顿下来，人们也不再写入数据了

11.49-11.54

all of these write messages finally arrive at their destinations and processed

所有的写操作消息最终都到达了目标位置并被处理

11.54-12.08

then an eventually consistent system ought to end up with the same value stored at all of the replicas

那么最终一致性系统中所有replica上保存的值最终都是相同的

12.08-12.13

 that's the sense of which it's eventually consistent

这就是最终一致性的意思

12.13-12.15

 if you wait for the dust to settle 

等到尘埃落定的时候

12.15-12.18

you're gonna end up with everybody having the same data

所有人手上的数据最终都是相同的

12.18-12.21

and that's a pretty weak spec，that's a very weak spec

但这是一个很弱的标准

12.21-12.25

 but you know because it's a loose spec

但你知道的，因为它是一个宽松的标准

12.25-12.27

 there's a lot of freedom in the implementation

我们可以非常自由地对它进行实现

12.27-12.30

 and a lot of opportunities to get good performance

我们在很多地方可以对其进行改进，以获得良好的性能

12.30-12.37

because the system basically doesn't require you to instantly do anything or to observe any ordering rules

简单来讲，该系统并不要求你立即做任何事情，或者遵循某种顺序规则

12.37--12.42

 it's quite different from most of the consistency schemes we've seen so far

这和我们目前所看到的大部分一致性方案都不相同

12.42-12.43

 again as I mentioned

正如我所提到的

12.43-12.45

it's used in deployed systems eventual consistency is

不少已部署的系统中都使用了最终一致性

12.45-12.50

 but it can be quite tricky for application programmers

但对于那些应用程序开发人员来说，它可能非常棘手

12.50-12.56

so let me sketch out a an example of something you might want to do in a web and the website

So，我来画个例子，它所展示的事情可能是你们在一些网站中想做的事情



12.56-13.01

 where you would have to be pretty careful

你们得对此非常小心

13.01-13.07

 you might be surprised

你们可能会感到惊讶




13.07-13.11

this is an eventual consistency app example

这是一个使用了最终一致性的App案例

13.11-13.15

 suppose we're building a website that stores photos

假设我们构建了一个保存图片的网站

13.15-13.23

 and every user has a you know set of photo photos stored as you know key value pairs with some sort of unique ID is the key 

每个用户都在这个网站上保存了一些图片，这些图片以key/value 的形式进行保存，他们使用唯一ID作为key来使用

13.23-13.32

and every user has a list of maintains a list of their public photos that they allow other people to see 

每个用户都有一个允许他人查看的公开相簿

13.32-13.35

so supposing I take a photograph

So，假设我拍了一张照

13.35-13.39

 and I want to insert it into this system

我想通过插入操作将它放入这个系统

13.39-13.42

 or you know I human contact  the web server 

我会与web服务器进行通信

13.42-13.46

and the web server runs code that's gonna insert my photo into the storage system

web服务器会运行代码，即将我的照片插入到存储系统中

13.46-13.51

 and then add a reference to my photo to my photo list

接着，将这张图片的引用链接添加到我的相簿中




13.51-13.57

so maybe run maybe this happens we'll say it happens on clients c1 

So，假设它是在Client C1上发生的

13.57-14.00

which is the web server I'm talking to  and maybe 

它是我所通信的web服务器

14.00-14.02

but the code looks like is

但代码看起来是这样的




14.02-14.06

 there's a code calls the put operation for my photo

这里我调用了一个put操作，并往里面传入了我要插入的照片

14.06-14.14

and it really should be a key and a value， I'm just gonna candidates just a key plus value

这里要传入的其实应该是一个key和一个value



14.14-14.15

 so I insert my photograph

So，我插入了我的图片



14.15-14.17

 and then when this put finishes

接着，当put操作完成的时候




14.17-14.21

 then I add the photo to my list

接着，我要将我的照片添加到我的相册中

14.21-14.26

right that's what my my clients code looks like 

这就是我在Client端要执行的代码的样子

14.26-14.29

somebody else is looking at my photographs list

其他人会去查看我的相册

14.29-14.32

they gonna look fetch a copy of my list of photos 

他们会去获取我的相册副本

14.32-14.36

and then they're gonna look at the photos that are on the list

然后，他们会去查看该列表中的照片


14.36-14.44

 so client 2 maybe calls get for my list  and then looks down the list

So，C2可能会去调用get(list)，然后查看我的相册

14.44-14.49

 and then calls get on that photo

接着，它会调用get(photo)

14.49-14.51

maybe they see the photo I just uploaded it on the list

他们所查看的照片可能是我刚刚更新到相册中的那张




14.51-14.55

and they're gonna do a get it for the you know key for that photo

他们会往这个get操作中传入该照片所对应的key

14.55-14.59

 yeah so this is like totally straightforward code

So，这些代码看起来非常简单

14.59-15.01

looks like it ought to work

看起来是可行的

15.01-15.04

 but in an eventually consistent system

但在一个最终一致性系统中

15.04-15.07

 it's not necessarily going to work

这种做法不一定可行




15.07-15.11

 and the problem is that  these two puts

这里的问题在于这两个put操作

15.11-15.13

 even though the client did them in such an obvious order

尽管client是以这种很明显的执行顺序来执行它们的

15.13-15.15

 first insert the photo and

即先插入照片

15.15-15.18

then add a reference to that photo to my list of photos

接着，将该照片的引用链接添加到我的相册中

15.18-15.19

 the fact is that

事实上

15.19-15.23

 in this eventually consistent scheme that I outlined

在我概述的这个最终一致性方案中

15.23-15.29 ！！！！！

 this second put could arrive at other data centers before the first put

在其他数据中心中，第二个put操作可能会在第一个put操作之前到达

15.29-15.33

so this other client if it's reading at a different data center 

So，如果其他client是从一个不同的数据中心读取数据

15.33-15.37

 might see the updated list with my new photo in it 

它可能会看到这个更新后的相册，它里面放着我新添加的照片

15.37-15.43

but when that other client in another data center goes to fetch the photo that's in the list 

但当另一个数据中心的其他client去获取该相册中的这张照片时

15.43-15.44

this photo may not exist yet

这张照片可能并不存在

15.44-15.53

because the first write may not have arrived over the wire of the network client 2‘s data center

因为第一个写操作（put(photo)）可能还并未到达C2所在的数据中心

15.53-15.59

so if this is just gonna be routine occurrence in an eventually consistent system 

So，如果这是最终一致性系统中经常发生的事情

so，如果在这个最终一致性系统中，使用的是一个异步并发执行方式的话

15.59-16.05

if we don't sort of think of anything more clever

如果我们不去思考些巧妙的办法来解决这个问题

16.05-16.10

this kind of behavior where it sort of looks like the code out of work  you know at some intuitive level 

从直觉上来讲，这种情况看起来像是这些代码失效了

16.10-16.13

but when you actually go and read the spec for the system

但当你去阅读下该系统的标准

16.13-16.14

 which is to say 

它上面说了

16.14-16.15

no guarantees 

并不保证这些东西的正确性

16.15-16.21

you realize that ah you know this obviously this correct looking code may totally not do it I think it's going to do

你就会意识到，这些看起来正确的代码可能根本没按照我想的那样执行




16.21-16.24

 these are often called anomalies 

这些通常叫做异常

16.24-16.33

you know the way to think about it is not necessarily that this behavior 

你知道的，我们所思考的不一定就是这种情况

16.33-16.36

you know you saw the list third on a list but the photo didn't exist yet

即你拿到了这个相册，但这张照片并不存在于这个相册中

16.36-16.37

it's not an error

这并不是什么错误

16.37-16.38

 it's not incorrect

也不是什么不正确的情况

16.38-16.43

 because after all the system never guaranteed that this code was gonna do that

因为所有的系统都从来没有保证过代码会按照你想的那么执行




16.43-16.46

 it's gonna actually yield the photo here 

它实际上会在这里生成图片（即你拿到图片）

16.46-16.47

so it's not that it's incorrect

So，这并不是说它是不正确的

16.47-16.53

 it's just that it's weaker than you might have hoped

这里的一致性只是比你所希望的要弱

16.53-16.56

so it's still possible to program such a system

So，编写这样一个系统依然是可能的

16.56-16.58

 and people do it all the time

人们一直都在编写这样的系统

16.58-17.01

 and there's a whole lot of tricks you can use

在编写的过程中，你可以使用很多技巧

17.01-17.02

 for example

例如




17.02-17.10

 you know a defensive programmer might observe programmer might write code knowing that well if you say something I mean list

程序员可能会写出这种代码，比如你往get中传入这个list

17.10-17.11

 it may not really exist yet

这个list可能并不是真的存在

17.11-17.13

and so if you see a reference to a photo in the list 

So，如果你看到相册中该图片的引用链接

17.13-17.14

you get a photograph

那你就可以拿到这张照片

17.14-17.16

 that's not there

如果它不在那里面




17.16-17.17

you just retry

你只需重试即可

17.17-17.19

 just wait a little bit and retry

你只需等待一小会，然后重新执行这个操作即可

17.19-17.22

because by and by the photo will probably show up

因为这张照片可能过了一会儿就会出现

17.22-17.22

 and if it doesn't 

如果它没有出现

17.22-17.25

we'll just skip it and don't display it to the user

那么我们跳过它即可，并且不用向用户展示这张照片

17.25-17.29

 so it's totally possible to program in this style 

So，我们以这种风格进行编程时完全可能的

17.29-17.36

but we could definitely hope for behavior from the storage system that's more intuitive than this

但我们肯定希望存储系统的行为要比这种来得更为直观

17.36-17.39

 that would make the programmers life easier 

这就会让开发人员更好过一点

17.39-17.49

sort of we could imagine systems that have fewer anomalies then a very simple eventually consistent system 

我们可以想象下那些异常更少的系统，即一个非常简单的最终一致性系统

17.49-17.49

okay 

======================================================================

17.49-17.56

before I go on to talking about how to maybe make the consistency a little bit better

在我讨论如何让一致性变得更好之前

17.56-18.02

I want to discuss something important I left out about this current eventual consistency system

我想讨论一下我遗漏的有关当前最终一致性系统的一些重要信息

18.02-18.06

 and that's how to decide on which write is most recent 

它是关于如何判断哪个写操作才是最近的写操作

18.06-18.09

so for some data.

So，对于某些数据而言

18.09-18.14

 if data might ever be written by more than one party

如果某个数据曾经被多方进行写入修改

18.14-18.22

 there's the possibility that we might have to decide which data item is newer 

这里存在着这种可能情况，即我们可能得去判断哪个data item是比较新的

18.22-18.27

so suppose we have some key or call k

So，假设我们有一个key，我们将它称为k

18.27-18.30

and 2 writes for it 

这里有两个针对它的写操作

18.30-18.34

you know 2 clients want to do writes for K 

你知道的，有两个client想对k执行写操作




18.34-18.38

so one client writes a value one，another client writes a value of two 

So，一个client写入的值是1，另一个要写入的值是2

18.38-18.43

we need to set up a system

我们需要建立一个系统



18.43-18.51

so that all three data centers agree on what the final value of key K is 

So，这样的话，这三个数据中心就能对于key K的最终值达成一致



18.51-18.53

because after all we're at least guaranteeing eventual consistency

因为我们至少要保证最终的一致性

18.53-18.54

when the dust settles

当尘埃落定的时候

18.54-18.56

 all the data centers all have the same data 

所有数据中心中所保存的数据都是相同的




18.56-19.00

so you know data center three is gonna get these two writes 

So，你知道的，数据中心3会收到这两个写操作



19.01-19.03

and it's gonna pick one of them as the final value for K

它会选择其中一个作为k的最终值

19.03-19.04

 well of course 




19.04-19.07

 datacenter 2 sees the same writes right

数据中心2也看到这两个写操作

19.07-19.08

it sees its own write plus that from data center 1

它会看到它自己所发出的写操作以及数据中心1所发出的写操作

19.12-19.14

 so they're all seeing this pair writes

So，它们都看到了这对写操作

19.14-19.23

 and they all had better make the same decision about which one that'd be the final value regardless and the order that they arrived in 

不管这两个操作的到达顺序是怎么样的，它们最好得对哪个才是最终结果有一个相同的判断

19.23-19.29

right because we don't know you know the data center three may observe these to arrive in one order

你知道的，因为数据中心3看到这两个写操作到达的顺序可能是这种

四十二  阅举报
17-02
19.29-19.32

and some other data center may observe them to arrive in a different order

其他数据中心可能观察到的这些写操作的到达顺序又是另外一种

19.32-19.35

 we can't just accept the second one and have that be the final value

我们不能只接受第二种到达顺序，并将其作为最终结果

19.35-19.43

meet a more robust scheme for deciding what the final the most recent value is for a key 

我们需要一种更强大的方案来判断该key的最终值是什么

19.43-19.48

so we're gonna need some notion of version numbers

So，我们需要用到版本号这种概念

19.48-19.55

 and the most straightforward way to assign version numbers is to use the wall clock time 

分配版本号的最简单方法就是去使用wall-clock time（挂钟时间）




19.55-2001

so why not wall clock time

So，为什么使用的是挂钟时间呢？

20.01-20.03

 and the idea is

这里的想法是

20.03-20.05

 that when a client generates a put 

当一个client生成一个put操作时

20.05-20.10

either it or the shard server the local shard server talks to will look at the current time

当它和本地的shard server进行通信时，它会去查看下当前时间

20.10-20.14

 oh it's you know it's 1:25 right now

比如说，现在是1:25

20.14-20.20

 and it'll sort of associate that time as a version number on its version of the key 

它会将这个时间作为该key的版本号



20.20-20.25

so then we'd annotate these write messages

So，接着我们会给这些写操作消息进行标注



20.25-20.33

these actually both store the timestamp in the database and annotate these write messages sent between data centers with the time 

实际上，我们会将这些时间戳保存在数据库中，并在发送这些写操作给其他数据中心的时候，会让它们携带这些时间戳








20.34-20.37

so you know maybe this one was written at 102 

So，Wk1可能是在1:02的时候执行的




20.37-20.39

and this write occurred at 103

这个写操作（Wk2）则是在1:03的时候执行的

20.39- 20.49

and so if if 102 writer or suppose the 1:03 write arrives first 

假设1:03这个写操作（Wk2）先到达数据中心3

20.49-20.57

then the data center three will put in its database this key and the timestamp 1:03

那么数据中心3就会将这个key以及时间戳1:03放入数据库




20.57-21.00

and when the write for 1:02 arrives

当1:02这个写操作（Wk1）到达数据中心3时

21.00-21.04

the data Center will say oh actually that's an older write

数据中心就会表示，Oh，这是一个比较久远的写操作

21.04-21.05

I'm just gonna ignore this write

我会将这个写操作给忽略掉

21.05-21.08

because it has a lower timestamp  and the time step I already have

因为它所关联的时间戳比Wk2的时间戳来得小

21:08-21.10

 and of course if they arrive in the other order

Of Course，如果他们是以另一种顺序到达的(知秋注：1:02的key先到，1:03的后到)

21.10-21.17

did a sentence we would have actually stored this write briefly until the write with the higher timestamp arrived

我们会将这个写操作（Wk1）保存在数据库中，直到具备更高时间戳的写操作到达

21.17-21.18

 but then it would replace it 

此时Wk2就会取代Wk1

21.18-21.20

I mean since everybody sees it some timestamps 

因为所有人都会看到这些时间戳



21.20-21.27

at least you know when they finally receive whatever all these write messages over the Internet

当他们最终从网络上收到所有这些写操作消息时

21.27-21.34

they're all gonna end up with the databases that have  highest numbered value

最终，数据库保存的是版本号最高的那个写操作所写入的值

21.34-21.36

okay 



21.36-21.39

so this almost works with it 

So，这基本可行



21.39-21.42

 and there's two problems with it

对此，它有两个问题

21.42-21.45

one is that

其中一个问题是




21.45-21.49

the two data centers if they do writes at the same time 

如果这两个数据中心在同一时间执行写操作



21.49-21.51

may actually assign this same time stamp

那它们给写操作分配的时间戳可能是相同的

21.51-21.52

this is relatively easy to solve 

这个问题解决起来相对来说还是比较容易的

21.52-21.56

and the way it's typically done is

通常的解决办法是

21.56-22.04

 the time stamps are actually pairs of time or whatever and the High bits essentially and some sort of identifier 

时间戳其实是由时间和另一些东西组成的一个pair，在高位部分就是时间戳，另一部分可以是某种标识符

22.04-22.07

could actually be almost anything as long as it's unique

只要这个东西是唯一的，那这部分可以是任何东西

22.07-22.13

 some sort of identifier like the data center name or ID or something in the low bits 

在低位部分的标识符可以是数据中心名字，或者id之类的东西



22.15-22.21

just to cause all timestamps from different data centers or different servers to be you want 

这样可以让来自不同数据中心或者不同服务器的时间戳变成你想要的那种

22.21-22.28

and then if two writes arrive with the same time in them from different data centers， are gonna have different low bits

如果两个来自不同数据中心的写操作携带的时间是相同的，但它们的低位部分则是不同的

22.28-22.32

and these low bits will be used to disambiguate

我们通过这些低位信息来消除歧义



22.32-22.42

which of the two write says is the lower timestamp  and therefore should yield to the other with the higher timestamp

如果两个写操作中，有一个时间戳更小，我们应该选择时间戳更高的那个写操作来执行






22.42-22.46

okay so we're gonna stick some sort of ID in the bottom bits 

So，我们应该在低位部分贴上某种id之类的东西

22.46-22.48

and the paper actually talks about doing this

实际上，paper中有讨论过使用这种方案

22.48-22.48

it's very common

这种方案非常常见

22.48-22.50

 the other problem is that

另一个问题是

22.50-22.57

this system works okay，if all of the data centers are exactly synchronized in time

如果所有这些数据中心时间上都是完全同步的，那么这个系统运行起来就没什么问题

22.57-23.01

 and this is something a spanner paper stressed a great length 

这是Spanner那篇paper中所着重强调的部分

23.01-23.05

so if the clocks on all the servers that all the data centers agree

So，如果所有数据中心中服务器里的时钟都是同步的

23.05-23.09

and this is gonna be okay

那么这就是Ok的

23.09-23.12

but if the clocks are off by seconds or maybe even minutes

但如果时钟不是很准，差个几秒，甚至几分钟的话

23.12-23.14

 then we have a serious problem here

那么我们这里就会遇上一个严重问题

23.14-23.19

 one not so important problem is that 

一个不是那么重要的问题是

23.22-23.26

writes that come earlier in time 

如果某个写操作到达的时间比较早

23.26-23.28

you know that should be overwritten by later write

你知道的，这个写操作应该会被后到的写操作所覆盖掉

23.28-23.32

so it could be the writes that came earlier in real time are 

so 真实时间下，这个写操作可能来的更早一点




23.32-23.36 ！！！！

because the clocks are on are assigned high time stamps 

因为给该写操作分配的时间戳的值较高

23.36-23.41

and therefore not superseded by writes that came later in time

因此先到达的写操作不会被后到的写操作所取代

23.41-23.45

 now we never made any guarantees about this

对此，我们从来不做任何保证

23.45-23.54

in eventual consistency and we never said oh writes that come later in time we're gonna win over write come earlier

在最终一致性中，我们从来没承诺过晚到的写操作会将先到的写操作给覆盖掉

23.54-23.59

we dont really owe any the clients need things in department 

我们并没有欠client什么，它所需要的我们都提供了



23.59-24.03

nevertheless we don't want to be  already the system has been weak enough consistency 

但是，该系统的一致性已经足够的弱了



24.04-24.08

we don't want to have it have needlessly strange behavior

我们不希望让它出现那些不必要的奇怪行为

24.08-24.10

like users really well notice

用户会很容易注意到这些奇怪行为

24.10-24.15

 they update something and then they updated later doesn't seem to take effect 

他们更新了某个数据，接着他们又再次更新了数据，但这似乎没什么效果

24.15-24.19

because the earlier update was assigned timestamps it's too large

这是因为先前执行的更新操作它所被分配的时间戳实在是太大了

24.19-24.20

in addition

此外



24.20-24.25

 if some servers clock is too high and it doesn't right

如果某个服务器上的时钟走的太快，时间不准的话

24.25-24.28

 you know if its clock  say a minute fast

如果它上面的时钟比其他服务器上的时钟走快1分钟

24.28-24.30

then it'll be a whole minute

那么走快的就是整整一分钟

24.30-24.32

 when no other write can configure fact，because no other write can have timestamp consistency

其他所有写操作都无法更改这个事实，因为其他写操作的时间戳都不具备一致性

24.36-24.44

we have to wait for all the servers' clocks to catch up to the minute fast servers clock before anybody else can do the write about key

在其他人能对该key进行写操作前，我们得等待其他服务器上的时钟追上这个时钟走快的服务器才行



24.44-24.47

in order to solve that problem

为了解决这个问题




24.47-24.53

 one way to solve that problem is this idea called Lamport clocks

解决这个问题的其中一种思路叫做Lamport Clocks

24.53-24.56

the paper talks about this

paper中讨论了这个东西

24.56-25.01

although the paper doesn't really say why they use the Lamport clocks

虽然paper中并没有说他们为什么要使用Lamport Clocks

25.01-25.05

I'm guessing it's at least partially for the reason I  just guideline

我猜测部分原因可能是因为大家都在使用这个方案



25.05-25.12

Lamport clock is a way to assigned timestamps that are related to real time

Lamport Clock是一种用来分配时间戳的方式，它们和现实时间有关

25.12-25.17

but which hope would this problem at some servers having clocks that are running too fast 

这是用来解决某些服务器上的时钟跑得太快所产生的问题




25.17-25.25

so every server keeps a value called this Tmax

So，每个服务器会保存一个叫做Tmax的值




25.25-25.31

which is the highest version number it seems so far from anywhere else

它是每个服务器目前从所有地方所看到的那个最高的版本号



25.35-25.38

so if somebody else is generating timestamps that are you know ahead of real-time 

So，如果某个服务器所生成的时间戳大于现实时间

25.38-25.44

you know the other servers see this timestamps their Tmax will reflect ahead of real time

其他服务器就会看到这个时间戳，它们就会通过这个Tmax反映出这个大于现实时间的时间戳

25.44-25.51

 and then when a server needs to assign a timestamp of version number to a new put

接着，当一个服务器需要为一个新的put操作分配一个时间戳作为它的版本号时

25.51-25.53

 the way it will do that is 

它所采用的方法是

25.53-26.08

it'll take the max of this team ax plus one and the wall clock time the real-time 

它会使用这个公式来计算时间戳，即max(Tmax+1, real time)

26.08-26.09

so that means that

So，这意味着




26.09-26.18

new version number so this is the version numbers that we need to accompany the values in our eventually consistent system

这就是我们最终一致性系统中分配给这个put操作的版本号值

26.18-26.24

so each new version number is going to be higher than the highest version number seen

So，每个新版本号都会比它之前所看到的最高版本号要来得高

26.24-26.30

so higher than whatever the last write was for example to the data that we're updating 

So，它要比最后一次对数据进行更新时的写操作的版本号还要高




26.30-26.32

and at least as high as real-time

该版本号至少也是和现实时间一样大

26.32-26.39

 so if nobody's clock is ahead，this Tmax plus one will probably actually be smaller than real time

So，如果所有服务器的时钟都是正常走的，那么这个Tmax+1的值实际就会比现实时间来得小

26.39-26.42

and the timestamp will end up in real time

那么这个Tmax的值就是现实时间

26.42-26.44

if some server has a crazy clock that's too fast 

如果某个服务器上的时钟走得飞快

26.44-26.51

then that will cause all other servers all the ones it's updates advanced the Tmax 

这就会导致其他服务器在执行更新操作的时候，版本号就会使用到Tmax

26.51-26.53

so that when they allocate new version numbers

So，当它们分配版本号的时候

26.53-27.00

 higher than the version number of whatever ladies writes they saw from the server whose clock is too fast 

它们的版本号就会比那个时钟走的飞快的服务器所发出的写操作的版本号来得高（Tmax+1）



27.00-27.03

okay 



27.03-27.04

so this is Lamport clocks 

So，这就是Lamport Clocks

27.04-27.10

and this is how the paper assigns version numbers

这就是paper中分配时间戳的做法

27.10-27.13

 come up all the time in distributed systems 

这种做法在分布式系统中你们能经常见到

27.13-27.16

all right



27.16-27.25

so another problem I want to bring up about our eventually consistent system is

So，关于最终一致性系统我想提出的另一个问题就是

27.25-27.29

the problem of what to do about concurrent writes to the same key

即对同一个key所对应的数据进行并发写入



27.29-27.33

 it's actually even worse

实际上，这会更糟

27.33-27.42

the possibility that concurrent writes might carry might both carry important information that ought to be preserved

有一种可能情况是这样的，这些并发写操作可能都携带应保留的重要信息

 




27.42-27.45

so for example

So，例如




27.45-27.47

if we have 2 data centers

如果我们有两个数据中心




27.47-27.52

did both of these you know different clients  client one and client 2

这里有2个不同的client，即C1和C2




27.54-27.59

they both issue a put to the same key

它们对同一个key发起了put操作




27.59-28.11

and both of these let's get sent it to datacenter 3 

它们都将这个put操作发送给了数据中心3

28.11-28.14

the question is

这里的问题是




28.14-28.18

what's a data center 3 do about the information here and the information here 

数据中心3该选这两个put操作中的哪一个的结果作为最终结果呢？

28.18-28.24

this is a real puzzle

这是一个难题

28.24-28.26

 actually there's not a good answer

实际上，我对此也没有什么好的答案

28.26-28.29

but what the paper uses is the Last-write-wins

但paper中所使用的办法是Last-write-wins




28.29-28.34

 that is datacenter 3 is gonna look at the version number that is assigned here and the version number is assigned here 

数据中心会去查看这两个操作所携带的版本号

28.34-28.35

one of them will be higher 

其中一个put操作的版本号要比另一个稍微高点

28.35-28.38

you know because slightly later in time

你知道的，因为在时间上，有一个put操作可能会比另一个要略微晚到些



28.38-28.41

or maybe data center ID  a little bit higher or something

或者可能是数据中心id比另一个要高之类的

28.41-28.50

a datacenter 3 you will simply throw away the data with the lower timestamp and accept the data with the higher timestamp

数据中心3就会将较低时间戳的数据给丢弃，并接受时间戳较高的那个数据




28.50-28.55

and that's it，so it's using this last Raider wins policy 

So，这就是paper中所使用的Last-write-wins策略

28.55-29.05

and that has the virtue that it's deterministic 

它是确定性的

29.05-29.06

and everybody's gonna get the same answer

所有人都会拿到相同的答案

29.06-29.09

because everybody is looking at the same timestamp

因为每个人看到的都是相同的时间戳



29.09-29.14

you know thats eventual consistency

这就是最终一致性

29.14-29.15

 you can think of examples

你可以思考个例子

29.15-29.18

for example

例如

29.18-29.21

 supposing what these puts are trying to do is increment a counter 

假设这些put操作所试着做的事情就是增加counter值

29.21-*29.27

so these clients both saw the counter with value 10

So，这些client所看到的counter值都是10

29.27-29.28

 they both add one

它们对它都进行加一




29.28-29.30

 and maybe we've put 11 

这里我们设置的值是11



29.30-29.34

right and but you know what we really wanted to do is have them both increment the counter 

但你知道的，我们真正想做的就是让这两个put操作都对counter的值进行加一

29.34-29.35

and have it had value 12

即让counter值变成12

29.35-29.36

so in that case

So，在这种情况下

29.36-29.39

 last-write-wins is really not that great

Last-write-wins的效果并不好

29.39-29.46

what we really would have wanted was for datacenter 3 to sort of combine this increment and that increment end up with the value of 12 

我们真正想做的事情是，让数据中心3对这两个操作都进行处理，我们最终希望得到的结果是12

29.46-29.56

so you know these systems are really generally powerful enough to do that

So，你知道的，这些系统有足够的能力去做到这一点




29.56-30.06

but we would like better what we'd really like is more sophisticated conflict resolution

但我们真正想要的是面对更为复杂的冲突时的解决方案

30.12-30.17

the way other systems we've seen saw this，the most powerful system to support real transactions 

我们已经在其他的系统中见到过这个，最为强大的系统支持真正的事务

30.17-30.20

so instead of ，you know a database like MySQL

So，就以MySQL为例

30.20-30.22

just having put and get 

它拥有put和get的功能

30.22-30.23

actually has increment operators

它实际上拥有increment operator

30.23-30.26

 that do atomic transactional increments on the data

通过这个操作符，它可以对数据进行原子事务级别的增加操作

30.26-30.29

 increments weren't lost

这些增加操作不会丢失

30.29-30.36

 and that's sort of a transactions of maybe the most powerful way of doing resolving conflicting updates 

使用事务可能是解决这些存在冲突的更新操作的最为有效的手段

30.36-30.40

we've also seen some systems that support a notion of mini transactions 

我们也见过一些支持mini transaction的系统

30.40-30.44

where at least on a single piece of data you can have atomic operations like atomic increment or atomic test and set

至少你可以对某一份数据执行原子操作，比如atomic increment或者atomic test-and-set

30.44-30.57

 you can also imagine wanting to have a system that does come sort of custom conflict resolution

你也可以想象下这里有一种系统，使用的是自定义的冲突解决方案

30.57-31.00

So supposing this value that we're keeping here is a shopping cart

So，假设我们这里保存的这个值是购物车的商品数量

31.00-31.02

you know with a bunch of items in it 

你知道的，这个购物车里面有一堆商品

31.02-31.07

and our user may because they're running you know two windows in the web browser

你知道的，我们的用户可能在浏览器中开了两个窗口

31.07-31.12

adds two different items to their shopping cart from two different web servers

他们在两个不同的web服务器中往他们的购物车中添加了两个不同的商品

31.12-31.16

we'd like these two conflicting writes to the same shopping cart

我们想对同一个购物车执行两个冲突的写操作

31.16-31.24

to resolve probably by taking set union of the two shopping carts involved  instead of throwing one away and accepting the other

解决这个问题的方法可能就是取两个购物车的并集作为结果，而不是将一个写操作丢掉，去接收并执行另一个写操作

 



31.24-31.28

 I'm bringing this up

我要提一下这个问题

31.28-31.36

because of satisfying solution，indeed the paper doesn't really propose much of a solution 

因为对于这个问题，我们有一个很满意的解决方案，虽然paper中并没有对这个解决方案提太多

因为对于这个问题，事实上paper中并没有给出一个令人满意的解决方案

31.36-31.40

it's just a drawback of weakly consistent systems 

这是弱一致性系统的一个缺陷

31.40-31.45

that it's easy to get into a situation 

它很容易陷入这种情况

31.45-31.47

where you might have conflicting writes to the same data

在对同一个数据进行写入时，你可能会遇上写操作冲突

31.47-31.54

that you would like to have sophisticated sort of application specific resolution to

你可能会想要那种专门针对复杂应用程序的解决方案

31.54-31.56

but it's generally quite hard 

但通常来讲，这很难

31.56-32.01

and it's just like a thorn in people's sides that has to be lived with typically 

这就像是人们不得不忍受的一根刺那样

32.01-32.07

and that that goes for both the eventual consistency  my straw man here  and for the paper

这存在于最终一致性、我的稻草人论证以及paper中

32.07-32.12

  the paper  and a couple of paragraphs said

该paper中有两小段内容表示

32.12-32.13

it could be used to do better

它可能能够做得更好

32.13-32.15

they don't really explore that

但他们并没有对此进行探索

32.15-32.17

 because it's difficult

因为这个问题很难

32.17-32.19

 okay



32.19-32.22

back to eventual consistency

回到最终一致性这个话题上

32.22-32.28

 my straw man system if you recall

如果你回想下我这个strawman系统

32.28-32.35

 it had a real problem with even very simple this very simple scenario

即使在一个非常简单的情景下，它也会遇上一个问题

32.35-32.39

I know we did put a photo and put a photo list

假设我要将一张图片放入一个相册

32.39-32.43

 and then somebody else in a different data center and it reads the new this 

接着，其他数据中心的人要读取这张新的图片

32.43-32.44

but when they read the photo

但当他们读取这张图片时

32.44-32.46

 they find there's nothing there 

他们没找到这张图片

32.46-32.48

so can we do better

So，我们能否做得更好

32.48-32.53

 can we build a system of it's still allows local reads and local writes

我们能否构建出这样一种系统，它依然支持在本地进行读和写操作

32.53-33.01

but is has slightly may be less anomalies

但它里面存在的异常可能会更少



33.01-33.03

I'm going to propose one 

我会提出一种方案

33.03-33.07

that's strong me into this kind of one step closer to papers upon to

这种方案更接近于paper中所提到的方案

33.07-33.09

so this is straw man 2

So，这个是稻草人论证2

33.09-33.16

and in this scheme

在这个方案中




33.16-33.24

 I'm gonna propose a new operator not just put and get but also a sync operator that clients can use

除了put和get以外，我还会提出一种新的操作符，也就是client所可以使用的sync




33.24-33.32

and the sync operator will do will be the key and a version number 

我们可以往sync操作符中传入key，以及一个版本号

33.32-33.36

and what sync does when a client calls it

当client调用sync时，sync所做的事情是



33.36-33.45

sync waits until all data centers copies of key K are at least up to date as of the specified version number 

它会等到直到所有数据中心中key k的副本的版本号都至少和这个指定版本号一致

sync 会一直等待，直到所有数据中心中key k副本的版本号都至少和这个指定版本号一致



33.45-33.49

so it's a way of forcing order 

So，这是一种强制指定执行顺序的方式



33.49-33.52

the client can say look I'm gonna wait as well everybody knows about this value

client会说：看，我在等你们的版本号和我所指定的版本号同步（即所有人的值都相等）



33.52-33.58

 and I wanna only see after every one everything is data center knows about this value

我只想看到一个结果，即所有数据中心都知道这个值

33.58-34.04

 and in order for clients to know what version numbers to to pass the sync

为了让client知道要传入sync的版本号是什么

34.04-34.07

 we're gonna change the put call a bit

我们会对put进行一些改造

34.07-34.12

 so that you say put key value

So，当你调用put(k, v)的时候

34.12-34.16

 and put returns the version number of this updated K

这个put操作会返回这个更新后k的版本号

34.16-34.26

you could call this sync is asking that acting is a sort of a barrier offense 

这个sync扮演了屏障的角色




34.26-34.42

we could call this eventual consistency plus barriers sync calls the barrier

这个稻草人论证2用到了最终一致性以及屏障sync 

34.42-34.49

I'm gonna talk about how  users in a moment

我稍后会讨论用户这块的内容

34.49-34.49

 but just keep in mind

但要记住的是



34.49-34.51

this sync calls likely to be pretty slow

这个sync调用的执行速度相当慢

34.51-34.55

because the natural implementation of it is that

因为它的自然实现是这样的

34.55-34.58

it actually goes out and talks to all the other data centers

当调用了sync之后，它会和其他数据中心进行通信




34.58-35.04

 and asked them you know is your version of key k up to at least you know this version number

并询问它们，它们中key k的版本号是否大于等于这个版本号





35.04-35.07

and then have to wait booth for the data centers to respond

接着，我们得等待数据中心对我们进行响应

35.07-35.08

 and if any of them say no

如果其中某个数据中心表示No

35.08-35.12

it's got to then wait  that data center saies yes

那我们就得等，直到这个数据中心回复Yes



35.12-35.13

all right so how would you use this

So，我们该如何使用sync呢？

35.13-35.16

well again for our photo list

Well，对于我们这个相册的例子来说

35.16-35.20

now maybe client one that's updating photos

假设C1正在更新图片

35.20-35.23

 it's going to call put to insert the photo

它会调用put来插入图片




35.23-35.24

 it's gonna get a version number 

此时我们会得到一个版本号

35.29-35.37

now you know the programmer now has to keep in mind and hi there's a danger here that about update photo list

程序员就会想到，在更新相册的时候，会有一个危险的地方





35.38-35.41

but you know what if some other data center you know hasn't seen my photo yet 

但如果其他数据中心还未看到我的图片会怎么样呢？

35.41-35.45

so then the programmer is gonna say sync

So，接着，程序员就会去调用sync




35.45-35.50

 and you're gonna sync the photo

你会去执行sync(photo)操作

35.50-35.54

wait for all data centers to have that version number that was returned by put 

并等待所有的数据中心中所保存的该数据版本和该put操作所返回的数据版本一致




即调用sync，并等待直到所有的数据中心中该照片的版本号变成该put操作所返回的版本号为止

35.54-36.01

and only after the sync return will， client one call put update update the photo list 

只有当sync返回的时候，C1才会去调用put来更新相册

36.01-36.06

and now if client two comes along，I must read the photo list  and read the photo

如果现在C2要来读取相册，以及其中的照片时

36.06-36.10

you know who knows client two is going to do a get of the photo list 

C2会去调用get(list)来获取相册内容

36.10-36.17

let's say time is passing the same for them

假设，我们这里给它们传入的时间都是一样的




36.17-36.20

it's gonna do a get at the photo list

它会调用get(list)来获取相册内容



36.20-36.21

 and if it sees the photo on that list

如果它看到了该相册中的照片




36.21-36.27

 it'll do a get you know again in its local data center of the photo

它会在本地数据中心中调用get(photo)来获取这张照片

36.27-36.30

 and now we're actually in much better situation

现在我们所面临的情况要比之前好得多

36.30-36.37

 if client 2 in a different data center saw the photo in this list

如果C2在不同的数据中心所保存的相册中看到了这个照片

36.37-36.43

 then that means that 

那么这就意味着




36.43-36.46

client 1 had already called put on this list

C1已经调用了这个put(list)

36.46-36.49

because it's this put that adds the photo to the list

因为它通过这个put操作将照片插入了这个相册

36.49-36.51

 if client 1 already called put on this list 

如果C1已经调用了put(list)

36.51-36.52

that means 

这意味着




36.52-36.55

the client one now given the way this code works

C1执行了这些代码

36.55-36.57

 right had already called sync

它已经调用了这个sync操作

36.57-37.00

and sync doesn't return until the photo is present at all data centers 

直到这张照片已经放在所有的数据中心了，sync才会返回结果

37.00-37.02

so that means that

So，这意味着

37.02-37.08

client 2 can the programmer for client 2 can rely on well the photos in the list

C2的程序员可以去依赖sync这个特性，并很好地去使用相册中的这些图片

37.08-37.09

 that means

这意味着

37.09-37.12

this whoever added the photo to the list

不管是谁将照片添加到这个相册

37.12-37.13

 their sync completed

当他们的sync操作完成后

37.13-37.17

 and the fact that this sync completed means 

这个sync操作完成意味着

37.17-37.18

the photo is present everywhere 

我们所添加的这张图片已经保存在所有的数据中心了




37.18-37.21

and therefore we can rely on this get photo

因此，我们可以信任这个get(photo)

37.21-37.23

actually returning the photograph

它实际上会返回这张照片给我们

37.23-37.28

ok



37.28-37.30

so this works

So，这种做法可行

37.30-37.34

and it's actually reasonably practical 

并且实际上这种做法很合理

37.34-37.39

it does require fairly careful thought on the part of the program

这确实要对该程序的部分地方进行仔细思考




37.39-37.42

the programmer you know has to think aha I need a sync here

程序员得去思考：aha，这里我需要一个sync操作

37.42-37.46

 I need to put sync put in order for things to work out right 

这里我需要使用put、sync、put这三个操作，来让流程正常执行



37.46-37.49

the reader for the readers much faster

对于reader来说，他们的执行速度会更快

37.47-37.50

but the reader still needs to think 

但reader也需要进行思考




37.50-37.57

oh you know I'm gonna at least tested that the programmer has to you know check with it

程序员得对它进行检查

37.57-38.01

if programmer does a get list and then I get photo from that list

如果程序员调用了get(list)来获取相册，接着又调用了get(photo)来获取该相册内的某张照片

38.01-38.08

 that uh you know verify that indeed the code modified the list called sync before adding some things for list 

再为这个相册添加内容之前，我们得先验证调用了sync之后，我们是否对这个相册进行了修改



38.08-38.10

that is quite a bit of thought

这需要一定的思考

38.10-38.15

with this is all about the sync cause all about is enforcing order

Well，调用这个sync时，它会强制指定执行顺序




38.15-38.18

make sure that this completely finishes before this happens

以此来确保只有当第一个put操作完成后，才会执行第二个put操作

38.18-38.25

 the readers so that sync and sort of explicitly forces order for writers 

So，sync操作会显式强制指定writer的执行顺序

38.25-38.27

readers also have to think about order

reader也得去思考关于执行顺序方面的东西

38.27-38.30

 the order is actually obvious in this example

在这个例子，这里的执行顺序显而易见

38.30-38.31

but it is true that

但这是对的

38.31-38.35

 if the writer did put then sync and then put of a second thing

如果writer先执行put(photo)，再执行sync操作，接着执行put(list)



38.35-38.40

 then almost always readers need to read the second thing and then read the first thing 

那么对于reader来说，它始终得先去读取list，再去读取它所要查看的photo



38.40-38.46

because guarantees you get out of this out of this sync scheme these barriers is that

因为这就是这个sync方案所为你提供的保证

因为这个sync方案可以为我们提供一个保证




38.46-38.50

if a reader sees the second piece of data

即如果reader看到了第二部分数据，也就是这个list

38.50-38.53

 then they're guaranteed to also see the first piece of data

那么这也保证了，它们会看到第一部分数据，即这个photo（知秋注：即这个list中只要有该photo，那铁定执行了c1的sync）

38.53-38.53

 so that means

So，这意味着

38.53-38.59

the reader sort of need to be the second piece of data first and then and then the first item of data

reader会先去读取第二部分数据（list），再去读取第一个数据（photo）

38.59-39.03

 okay 



39.03-39.05

so there's a question about fault tolerance

So，这里有一个关于容错方面的问题

39.05-39.07

mainly at if one data center goes down

如果其中一个数据中心出现了故障

39.07-39.08

that means

这意味着

39.08-39.10

 the sync blocks until the other data centers brought up

sync会产生阻塞，直到其他数据中心恢复为止



39.10-39.11

that's absolutely right 

这样做绝对没错

39.11-39.14

so you're totally correct

So，你做的完全正确

39.14-39*.17

 this is not a great scheme

这并不是一个特别好的解决方案

39.17-39.18

all right



39.18-39.21

this is sort of a straw man on the way the COPS

这是关于COPS的一个稻草人论证

39.21-39.23

 this sync called would block

这个sync调用会产生阻塞

39.23-39.34

the way this actually that sort of version of this that people use in the real world to avoid this problem will you know whatever data centers down will the sync block forever is that 

当人们在现实生活中使用这种方案时，为了避免因某个数据中心发生故障而导致调用sync时产生阻塞，他们的解决办法是

39.34-39.39

puts and gets both actually consult a quorum of data center 

put和get操作实际上都会和使用Quorum的数据中心进行协商

39.39-39.52

this sync will only wait for you know say a majority of data centers to acknowledge that they have the latest version of the photo

sync操作只会去等待来自多数派数据中心的通知（即多数派数据中心拥有该照片的最新版本）

39.52-39.59

 and it get will actually have to consult an overlapping majority of data centers in order to get the data 

它的get操作实际上会和多数派数据中心中重叠的那部分进行通信，以此来获得数据

39.59-40.05

so things are not really real versions of this are not perhaps as rosy aasaiya as I may be implying 

So，这里我所说的东西可能在实际的生产环境中并不是这么用的



三十三  阅举报
17-03
40.08-40.20

again the the systems that work in this way is you're interested it's dynamo and Cassandra

那些以我们感兴趣的这种方式工作的系统有Dynamo和Cassandra



40.20-40.24

 and they use quorums to avoid the fault tolerance problem

它们使用Quorum来避免容错方面的问题

40.24-40.28

 okay okay 



40.28-40.30

So this is a straightforward design

So，这是一个简单直接的设计

40.30-40.32

 and has decent semantics 

并且拥有合适的语义

40.32-40.33

even though it's slow

虽然它的速度很慢

40.33-40.35

and this as you observe not very fault tolerant

并且正如你所观察的那样，它的容错能力不是特别好

40.35-40.37

 the read performance is outstanding

它处理读操作方面的性能非常棒

40.37-40.40

 because the reads are still for local 

因为这些读操作依然是在本地处理的

40.40-40.44

at least if the quorum setup is read one write all 

如果Quorum的设置是这样的，即从一个服务器上读取数据，写操作则要由所有的服务器来进行处理

40.44-40.47

and the write performance is not great

处理写操作方面的性能不是特别好

40.47-40.51

 but it's okay  if you don't write very much or if you don't mind great waiting

但如果你要执行的写操作数量不是特别多，或者你不在意等待太长时间，那么它还是ok的

40.51-40.58

 and the reason why you can maybe convince yourself that the write performance is not a disaster is that

你之所以可以说服自己处理写操作方面的性能不是很糟糕的原因是

40.58-41.03

 after all the Facebook memcache D paper has to send all writes through the primary data center 

正如Facebook那篇关于memcacheD的paper中所描述的，他们会将所有的写操作发送给主数据中心

41.03-41.05

so yeah you know Facebook runs multiple data centers

So，你知道的，Facebook运行着多个数据中心

41.05-41.07

 and clients talk to all of them

他们的client会和所有数据中心进行通信

41.07-41.13

 but the writes have to all be sent to the MySQL databases at the one primary data center

但所有的写操作都得发送给主数据中心的MySQL数据库来进行处理

41.13-41.14

similarly

类似的

41.14-41.21

 spanner writes have to wait for a majority of replica sites to acknowledge the writes before the clients thought to proceed

在Spanner中，我们必须等待大部分replica确认这个写操作后，client才能去执行这个写操作



41.21-41.26 ！！！！

 so the notion that clients might have that the writes might have to wait to talk to other data centers

So，client处会有这么一个概念，即执行写操作时，我们得等待和其他数据中心进行通信

41.26-41.32

 in order to allow the reads to be fast is  does not appear to be outrageous in practice 

以此来让Spanner处理读操作的速度不那么离谱

为了让读操作很快且不离谱



41.35-41.39

you know you might like to nevertheless have a system that does better than this

你知道的，你可能想要一种比它更好的系统

41.39-41.42

to somehow have semantics of sync that sort of 

它拥有sync之类的语义




41.42-41.49

or sync is forcing this put definitely appears to everyone to happen before the second put 

通过调用sync，它会强制让所有人看到的执行顺序都是一样的，即第一个put操作在第二个put操作之前发生



41.49-41.54

you might like to have that  without the cost

你可能希望在不用付出任何代价的情况下，拥有这种功能

41.54-41.57

 so we'll be interested in systems

So，我们会对这些系统感兴趣

41.57-41.58

and this is starting to get close to what cops does

这已经和COPS所做的事情开始接近了

41.58-42.01

interested in systems in

我们对这类系统感兴趣的地方在于




42.01-42.04

which instead of sort of forcing the clients to wait at this point

在调用sync的时候，我们不需要强制让client进行等待

42.04-42.10

we somehow just encode the order as a piece of information that we're going to tell the readers or tell the other data centers and 

我们通过某种方式将执行顺序作为一部分信息来告诉reader或者其他数据中心



42.10-42.24

a simple way to do that which the paper mentions as a non scalable implementation is that 

paper中提到了一种简单的做法，它是一种不可扩展的实现

42.24-42.27

at each data center 

在每个数据中心中




42.27-42.28

so this is a logging approach

So，这里有一种logging方案

42.28-42.40

 at each data center instead of having the different shard servers talk to their counterparts in other data servers sort of independently 

在每个数据中心中，我们不需要让不同的shard server和其他数据中心里它们所对应的shard server单独进行通信

42.40-42.41

instead

相反



42.41-42.43

 at every data center 

在每个数据中心里

42.43-42.45

we're gonna have a designated log server

我们会有一个指定的日志服务器




42.45-42.52

 that's in charge of communicating of sending writes to the other data center 

它负责将写操作发送给其他数据中心



42.52-42.52

so that means

So，这意味着

42.52-42.57

if a client does it write，does it put to its local shard

如果一个client执行了一次写操作，即发送了一个put操作给本地shard server



42.57-43.03

 and that's chart that shard instead of just sending that the data out sort of separately to the other data centers

这个shard server不会只将数据单独发送给其他数据中心

43.03-43.07

it will talk to its local log server

而是会和它本地的log服务器进行通信

43.07-43.14

 and append the write to the one log that this data center is accumulating

并将这个写操作追加到该数据中心所累积的日志中

43.14-43.18

 and then if a client say does a write to a different key

接着，如果某个client对一个不同的key执行了写操作




43.18-43.21

 maybe we're writing key a and key B here

这里，我们可能对key A和B执行了写操作







43.21-43.28

again instead of this shard server sending the write to key B sort of independently

我们不会让这个shard server将对key B所做的写操作单独发给其他数据中心




43.28-43.35

it's gonna tell the local log server to append the write to the log 

它会告诉本地的log服务器将这两个写操作追加到日志上

43.35-43.41

and then the log server send out their log to the other data centers in log order 

接着，日志服务器会将它们的日志上的操作以日志上的顺序发送给其他数据中心

43.41-43.47

so that all data centers are guaranteed to see the write to a first

So，这就保证了所有的数据中心先看到的都是对key A所做的写操作

43.47-43.50

and they're gonna hope process that write to a first

它们会希望先处理对key A的这个写操作

43.50-43.53

 and then all data centers are going to see our write to B

然后所有数据中心才会看到我们对key B所做的这个写操作

43.53-43.54

 that means

这意味着

43.54-43.55

 if a client does a write to a first

如果client先对A执行写操作

43.55-43.57

 and then does it write to B

接着，它再对B执行写操作




43.57-43.59

 the writes will show up in that order 

那么，这两个写操作的执行顺序就如同我这里所展示的一样

43.59-44.02

and it in its log A and B

在日志中，它们的顺序是先执行A再执行B




44.02-44.06

and they'll be sent the write to a first and then the write to B to each of the data centers

So，它们会先发送那个针对key A的那个写操作给其他数据中心，再发送那个针对key B的写操作给其他数据中心








44.06-44.12

and they probably actually have to be sent to a kind of single log receiving server

实际上，它们可能会被发送到一个单独用来接收日志的服务器上




44.12-44.18

 which plays out the writes one at a time as they arrive in log order 

然后我们就可以通过log日志上所记录的执行顺序来逐个执行这些写操作

44.18-44.22

so this is the logging strategy the paper criticizes

So，这就是paper所讨论的logging方案






44.22-44.27

it's actually regain some of the performance we want

实际上，它重新获得了我们想要的一些性能

44.27-44.32

because now clients we're no longer we now eliminate the sync

因为我们现在已经移消除了sync操作

44.32-44.36

 the clients can go back to this going put of a and then put B

client可以回过头去直接执行put(A)和put(B)（中间不再有sync操作了）

44.36-44.44

client puts can return as soon as the data is sitting in the log at the local log server

只要数据落地到本地的日志服务器，那么client所执行的put操作就能立即返回结果

44.44-44.48

 so now client puts and gets are now quite fast again

So，现在client执行put和get操作的速度又变得很快了




44.48-44.58

but we're preserving order sort of by basically through the sequence numbers of the entries and the logs rather than by having the clients wait 

基本上，我们是通过日志条目的序号来保证执行顺序，而不是通过调用sync操作让client进行等待来保证执行顺序

44.58-45.00

so that's nice 

So，这很nice

45.00-45.01

we get the order

于是我们就有了执行顺序

45.01-45.05

 you know now we're forcing ordered writes

你知道的，现在我们就强行指定了写操作的执行顺序

45.05-45.09

 and we're causing the writes to show up in order at the other data center

我们这样做也让这些写操作按照日志中记录的顺序出现在其他数据中心

45.09-45.11

 so that reading clients will see them in order

So，那些在读取数据的client就会按顺序看到这些写操作

45.11-45.16

 and so my example application might actually work them out with this scheme

So，我例子中的应用程序实际上就是按照这套方案走的

45.16-45.24

the drawback that the paper points to about this style of solution is that

关于这个解决方案，paper中提到了它的缺点

45.24-45.28

 the log server now all the writes have to go through this one log server 

所有的写操作都会经过这个log服务器

45.28-45.37

and so if we have a big big database with maybe hundreds of servers serving at least in total a reasonably high workload

So，如果我们有一个大型数据库，它可能要服务于数百台服务器，它要承受的负载相当高

45.37-45.40

 the write workload all the writes have to go through this log server 

所有的写操作都得经过这个日志服务器

45.40-45.50

and possibly all the writes have to be played out through a single receiving log server at the far end 

可能所有的写操作都得通过远程的这个接收日志的服务器来进行处理

45.50-45.53

and a single log server as the system grows there get to be more and more shards 

随着系统中shard server数量的增加

45.53-45.58

a single log server may stop being fast enough to process all these writes

单台log服务器的处理这些所有写操作的速度可能就不是那么的快了

45.58-46.09

and so cops does not follow this approach to conveying the order constraints to other data centers

So，COPS并没有遵循这种方案来将执行顺序方面的限制条件传给其他数据中心

46.09-46.12

okay 



46.12-46.15

so we want to build a system

So，我们想去构建一个系统

46.15-46.19

that can at least from the clients point of view， process writes and reads purely locally 

至少从client的角度来讲，处理写操作和读操作都完全是在本地进行的

46.19-46.21

we don't want to have to wait

我们不想去等待

46.21-46.23

you don't want clients to wait in order to get order

你不想让client通过等待来做到有序执行

46.23-46.30

we want a forward we like the fact that these writes are being forward asynchronously

我们想将这些写操作以异步的形式进行转发

46.30-46.36

but we somehow want to eliminate the central log server

但我们想以某种方式来消除中央日志服务器

46.36-46.44

so we want to somehow convey order information to other data centers without having to funnel all our writess through a single log server

So，我们想通过某种方式将执行顺序的相关信息传给其他数据中心，而不是将所有的写操作都交由单个日志服务器来进行处理

46.44-46.45

all right



46.45-46.49

So now that brings us to what cops is actually up to 

So，这使我们现在要去了解COPS实际所做的事情

===========================================================

46.49-46.53

so when I can talk about now is starting to be what COPS does 

So，现在我要开始讨论的是COPS所做的事情

46.53-47.01

and what I'm talking about though is the non GTE version of cops cops without get transactions

我现在所要讨论的是不使用事务的COPS

47.01-47.10

 ok so the cops is the basic strategy here is 

So，这里的基本方案是

47.10-47.13

that when cops clients read and write locally

当COPS client在本地执行读和写操作的时候

47.13-47.17

they accumulate information about the order in which they're doing things

它们会将它们所做事情的顺序信息累积起来

47.17-47.21

that's a little more fine-grain than the logging scheme

这种方案的粒度要比logging方案来得更加细

47.21-47.27

and that information is sent to the remote data centers whenever a client does put

当client执行put操作的时候，这些信息会被发送到远程数据中心




47.27-47.31

 so this we have this notion of client context

So，我们有client context这种概念

47.31-47.36

 and as a client does get and puts

当client执行get和put操作时




47.36-47.44

 you know maybe a client has a get of X and then  get of Y

假设client先执行get(X)，再执行get(Y)




47.44-47.49

and then a put of Z with some value

接着，再执行一个put(Z, -)操作（“-”代表某个值）

47.49-48.02

the context the library that the client uses that implements put and get is going to be accumulated in this context information on the side as the puts and gets occur

client会使用某个库来实现put和get操作，当put和get操作执行的时候，这些信息就会被累积在这个上下文信息中

48.02-48.04

 so if a client does a get

So，如果一个client执行了一次get操作




48.04-48.07

and that yields some value with version 2

它生成了某个值，该值的版本号是v2

48.07-48.15

 I'm just going to save that as an example maybe get returns the current value of x  and that current value with version 2 

在这个例子中，get操作所返回的是x的当前值以及它的当前版本号v2




48.15-48.22

and maybe Y returns the current value of version 4

get(Y)所返回的当前值的版本号是v4




48.22-48.26

what's going to be accumulated in the context is that

我们要积累在上下文中的信息是

48.26-48.34

that this client has read X and a got version 2

该client对x进行了读取操作，并且得到的版本号是v2

48.34-48.36

 then after the get for y

接着，它又对y进行了读取

48.36-48.47

the cops client libraries gonna add to the context so that it's not just we've read X and gotten version 2 but also now we've read Y and gotten version 4

COPS client库会将这些信息添加到上下文中，即我们读取到了x的值以及它的版本号v2，还有y的值以及它的版本号v4

48.47-48.52

and when the client does a put

当client执行put操作的时候




48.52-49.07

the information that's sent to the local shard server is not just put key and whatever the value is but also these dependencies 

我们要将put操作的相关信息（不仅仅只有key和value，还有这些dependency）发送给本地的shard server

49.07-49.12

so we're going to tell the local shard server for Z

So，我们会告诉本地shard server关于Z的一些信息



49.12-49.23

 that this client has already read before doing the put X and got version 2 and Y and got version 4

该client在执行put操作之前，它已经通过get(X)拿到了x的版本号v2以及通过get(Y)拿到了Y的版本号v4



49.23-49.26

and you know what's going on here is

这里所发生的事情是

49.26-49.31

that we're telling where the client is expressing this ordering information

client正在描述执行顺序方面的信息

49.31-49.38

that this put to Z now the client had seemed X version 2 and Y version 4 before doing the put

在执行这个put操作之前，该client就已经拿到x的值以及它的版本号v2，和y的值以及y的版本号v4

49.38-49.45

so anybody else who reads this version of Z had also better be seeing X&Y with the release versions 

So，当有人读取z的版本时，他们最好也能看到x和y的版本号

49.45-49.47

and similarly

类似地




49.47-49.55

 if the client then does a put of something else say Q

假设client之后又执行了一个put操作，即put(Q, -)

49.55-50.08

what's going to be sent to the local shard server is not just the Q and this but also the fact that this client had previously done some gets input 

我们除了要将Q和-发送给本地shard server以外，我们还要将该client之前所做的一些get操作信息发送给这个本地shard server




50.08-50.13

so let's suppose this put yields version 3 

So，假设这个put操作生成的版本号是v3

50.13-50.17

you know the local shard server says a high assigned version three to your new value for Z

本地shard server表示，这里Z的新值已经被分配了一个版本号v3

50.17-50.23

 then when we come to do the put of Q is going to be accompanied with dependency information

当我们执行put(Q,-)时，这会伴随着一些dependency信息

50.23-50.23

 that says 

这些信息表示




50.23-50.30

this put comes after this put of Q comes after the put of Z that created Z version three

这个put(Q,-)是在（创建了Z，并且版本号为v3）的put(Z,-)操作之后发生的

50.30-50.41

 and at least notionally the rest of the context ought to be passed as well

至少从概念上来讲，其余的上下文信息也应该传进来




50.41-50.46

although we'll see that for various reasons

出于各种理由，我们会看到



50.46-50.49

COPS can optimize away this information 

COPS能够优化掉这部分信息

50.49-50.51

and if there's a proceeding put

如果这里有一个正在处理的put操作




50.51-50.53

 only sends the version information for the put

那么它只会发送该put操作的版本信息

50.53-50.57

so the question is 

So，这里的问题是

50.57-50.59

is it important for the context to be ordered 

上下文有序是否重要

50.59-51.04

I don't believe so

我不这么认为

51.04-51.22

I think it's sufficient to treat the context or at least the information that's sent in the put as just a big bag of dependencies for at least non-transactional cops

我觉得，至少对于非事务性COPS来说，使用put操作中的这部分信息（即这一大堆dependency）就足够了

51.22-51.25

 okay 



51.25-51.29

so the clients are communicate this context and basically send the context with each put

So，client进行通信的时候会传递上下文信息，简单来讲，发送每个put操作所对应的上下文信息

51.29-51.35

and the context is encoding this order information  that

我们会将这些执行顺序信息编入上下文中



51.35-51.41

 in my previous straw man straw man 2 was sort of forced by sync instead of doing that 

在我的稻草人论证2中，这些执行顺序是通过sync来强制指定的，而不是我刚才所做的那样

51.41-51.44

we're not waiting for accompanying these puts with

我们不会等待这些put操作和它前面的一些值

51.44-51.44

 oh this put needs to come after these previous values and this put needs to come after these previous values 

比如，这个put需要在这些前面的值出现后再执行，或者那个put需要在这些前面的值出现后再执行



51.51-52.03

COPS calls these relationships that this put needs to come after these previous values of dependency

COPS将上面所提到的这种关系叫做dependency（依赖）



52.03-52.12

and dependency and it writes it as

我们将它写作dependency




52.12-52.15

supposing this put produces Z version 3

假设这个put操作生成了Z，以及它的版本号v3

52.15-52.19

 we express it as 

我们将它表示为。。。。

52.19-52.22

really there's two actually two dependencies here

实际上这里有两个dependency

52.22-52.24

one is that 

其中一个是




52.24-52.31

X version two comes before Z version three

xv2会在zv3之前出现




52.31-52.39

 and the other is that Y version four comes before Z version 3

另一个则是Yv4在Zv3之前出现

52.39-52.53

and these are it's just definition or notation that the paper uses to talk about these individual pieces of order information that cops needs to enforce

这些（dependency）只是paper中用来讨论COPS所需要的执行信息的定义或者概念

52.53-52.54

all right



52.54-53.02

so then what is this dependency information this passed to the local shard server

So，传入本地shard server中的dependency信息是什么呢？

53.02-53.06

 what does that actually cause COPS to  do

COPS实际上做了哪些事情呢？

53.06-53.13

 well each cops shard server when it receives a put from a local client

Well，对于每个COPS shard server来说，当它收到一个来自本地client的put操作时

53.13-53.15

first it assigns the new version number 

首先，它会分配一个新的版本号

53.15-53.31

then it stores the new value you know it stores for Z this new value along with the version number that it long version number that allocated

接着，它会将这个刚分配的版本号和Z的新值一起保存起来




53.31-53.34

and then it sends the whole mess to each of the other data center 

然后，它就会将这一团东西发送给其他所有数据中心

53.34-53.42

so at least some non GT cops the local shard server only remembers the key value and latest version number 

So，至少对于那些non GT COPS来说，本地shard server只会去记住那些key/value以及对应的最新版本号

53.42-53.44

doesn't actually remember the dependencies

实际上，它不会去记住这些dependency

53.44-53.47

 and only forwards them across the network to the other data centers 

它只会将这些dependency通过网络转发给其他数据中心



53.47-53.54

so now the position were in is that

So，我们现在讲到了。。。。




53.54-54.09!!!!!!

let's say we had a client produced a put of Z and some value it was assigned version number v3 

假设，我们有一个client，它生成了一个关于Z的put操作，它被分配了一个版本号v3




54.09-54.10

and it had these dependencies

它有着这些dependency

54.10-54.16

Xv2 and Yv4

即Xv2和Yv4



54.16-54.21

 right and this is sent from datacenter 1 

这是从数据中心1那里发过来的

54.21-54.23

let's say to the other data center 

假设数据中心1要将这个put操作发送给其他数据中心




54.23-54.27

so we got a datacenter 2 and datacenter 3 both receive this

So，数据中心2和3都收到了这个put操作

54.27-54.29

now in fact 

事实上

54.29-54.33

this information is sent from The Shard server for Z

这段信息是从Z所对应的shard server发送出来的



54.33-54.35

so there's lots of shard servers 

So，这里有很多shard server

54.35-54.39

but only the shard server for Z is involved in this

但这里只涉及了Z相关的shard server

54.39-54.43

so here datacenter 3 

So，这里是数据中心3




54.43-54.51

the shard server for Z is going to receive this put from sent by the client

Z所在的那个shard server会去接收由这个client所发出的这个put操作

54.51-54.53

 shard server forwards it

这个shard server会将dependency转发给它

54.53-55.04

this shard server the the with this dependency information that you know Xv2 and Yv4 come before Zv3 

从这些dependency信息中可以看到，Xv2和Yv4是在Zv3之前出现的

55.04-55.05

but that really means is

但这意味着

55.05-55.23

operationally is that this new version of Z can't be revealed to clients until its dependencies these versions of x and y have already been revealed to clients in datacenter 3

从操作上来讲，只有当它这些dependency（即x和y）展示给了数据中心3对应的client后（这些client访问的本地数据中心服务器为DC3），新版本的Z才能展现给client

55.23-55.24

 so that means that 

So，这意味着






55.24-55.28

the shard server of Z must hold this write

保存着Z对应数据的shard server必须拿着这个写操作

55.28-55.35

 must delay applying this write to Z until it knows that these 2 dependencies are visible in the local data center

直到该shard server知道这两个dependency在本地数据中心可见时，它才能去Z执行这个写操作

55.35-55.36

so that means that

So，这意味着

55.36-55.38

 Z has to go off 

Z所在的shard server就会将这个写操作丢弃




55.38-55.43

let's say the you know we have these shard server for X and the shard server for Y

我们有保存着X和Y所对应数据的这些shard server




55.43-55.48

Z's gotta actually send a message to the shard server for X and the shard server for Y saying

Z所在的这个shard server实际上会发送一条消息给X和Y所在的shard server，并说

55.48-55.54

 you know what's the version number for a current version for a number for x and y 

请告诉我X和Y的当前版本号是什么？




55.54-55.56

and has to wait for the result 

然后，它得等待结果返回




55.56-56.03

if both of these shards servers say oh you know they give a version number that's 2 or higher or 4 or higher for Y

如果这两个shard server告诉我们的结果是，X的当前版本号是v2，Y的当前版本号是v4




56.03-56.07

 then Z can go ahead and apply to put to its local table of data

那么Z所在的这个shard server就会将这些结果放入它本地的数据表中

56.07-56.19

however you know maybe these two shard servers haven't received the updates that correspond to version 2 of x and version 4 of Y 

但你知道的，这两个shard server可能还没有接收到Xv2和Yv4所对应的更新

56.19-56.22

and that case Z has to hold on to this update

在这个例子中，Z所在的shard server得拿着这个更新信息

56.22-56.24

 the shard server of Z has to hold on to this update

Z所在的这个shard server得一直拿着这个更新信息

56.24-56.31

until the indicated versions of X or Y ever actually arrived and been installed on these two shard servers 

直到X或者Y的指定版本数据到达，并被更新到这两个shard server上为止

56.31-56.33

so there may be some delays now

So，这里面可能存在着些延迟

56.33-56.38

 and only after these dependencies are visible at datacenter 3

只有当这些dependency在数据中心3可见后

56.38-56.38

only then

只有这样的话

56.38-56.44

 can the shard server of Z go ahead and write updated the table for Z to have version 3

Z所在的这个shard server才会往表中更新Z，将它的版本号设定为v3

56.44-56.51

 ok 



56.51-56.53

and  what that means of course is that

这意味着

56.53-56.57

 if a client the datacenter 3 does a read for Z and sees version 3 

如果数据中心3中的某个client对Z进行读取操作，它看到Z的版本是v3

56.57-56.59

then because Z already waited

因为Z已经放在这个shard server中了

56.59-57.02

 that means if that client then reads X or Y 

这意味着，如果该client之后去读取X或者Y

57.02-57.07

it's guaranteed to see at least version 2 of X and at least version 4 of Y

这里保证了，它所看到的X的版本至少是v2，Y的版本至少是v4

57.07-57.15

 because Z didn't reveal the shards or didn't reveal Z until it was sure the dependencies would be visible 

直到这个shard server确定这些dependency可见后，它才会去展示Z

57.15-57.19

ok 



57.19-57.25

so question what if x and y never get their values perhaps due to a network partition with the Z shard block forever

So，问题来了，如果因为网络分裂，Z所在的shard server一直阻塞住了，永远拿不到X和Y的值，那这会发生什么

57.25-57.31

yeah the um the semantics require the Z shard to block forever

这些语义会让Z所在的shard server一直阻塞下去

57.31-57.35

 that's absolutely true

这绝对是真的

57.35-57.37

 so you know there's certainly an assumption here

So，这里肯定有一个假设

57.37-57.43

 that well they're you know two ways that that might turn out ok

事实证明，这里有两种方法可以解决这个问题

57.43.-57.47

 one is somebody repairs the network or repairs whatever was broken 

其中一种方式是，有人去修复了网络或者某处坏掉的地方

57.47-57.50

and x and y do eventually get their updates

X和Y最终会拿到它们的更新值

57.50-57.51

 that be one way to fix this

这是解决这个问题的其中一个办法

57.51-57.54

 and then z will finally be able to apply the update

那么，Z最终就能够进行更新

57.54-57.55

might have to wait a long time 

这可能需要等很长一段时间

57.55-57.58

the other possibility is

另一种可能是

57.58-58.00

 maybe the data center is entirely destroyed

这个数据中心被完全破坏了

58.00-58.02

you mean the building burns down 

可能它所在的大楼遇上了火灾被烧毁了

58.02-58.04

and so we don't have to worry about this at all

So，我们根本不需要担心这种可能



58.04-58.08

but it does point out a problem

但它确实指出了一个问题

58.08-58.12

 that's real criticism of causal consistency 

这是对因果一致性的一种真正批判




58.12-58.20

and that's that these delays can actually be quite nasty

这些延迟实际上令人相当讨厌

58.20-58.21

because you can imagine 

因为你可以想象得到

58.21-58.24

oh you know Z is waiting for the correct value for X to arrive 

这里Z所在shard server正等待着X的正确值的到来

58.24-58.27

you know even if there's no failures and nothing burns down

你知道的，如果没有任何故障发生，也没有火灾发生

58.27-58.31

 even mere slowness can be irritating

这种速度很慢的情况也会让人很讨厌

58.31-58.32

 Z may have to wait for X to show up well 

Z所在的shard server可能也得等待X出现

58.32-58.36

it could be that X has already showed up

这里可能X已经出现了，只是没更新到位




58.36-58.39

 and has arrived at this shard server

即它已经到达了这个shard server

58.39-58.42

but it itself had dependencies maybe on key a

但它（X）自身有一些关于key A的dependency

58.42-58.47

 and so this shard server can't install it until the update for a arrives 

So，只有当对A的更新到达时，这个shard server才能将X的信息插入表中

58.47-58.51

because X this put of X depended on some key a

因为这个X相关的put操作依赖于key A

58.51-58.53

 and Z still has to wait for that

Z依然得去等待这个




58.53-58.58

 because what Z's waiting for is for this version of X to be visible to client

因为Z正在等待这个版本的X对client可见

58.58-58.59

 so it has to be installed

So，X得更新到这个shard server上

58.59-59.01

so if it's arrived  if the update for X is arrived

So，如果X相关的更新操作指令到达的话

59.01-59.04

but itself is waiting for some other dependency

但它自身正在等待其他的dependency

59.04-59.08

 then we may get these cascading dependency waits

那么我们可能会遇上这些级联的dependency等待的情况

那么我们可能会遇上要等待这些一连串dependency就位的情况

59.04-59.10

 and in real life

在现实生活中

59.10-59.13

 actually these you know these probably would happen 

实际上，这些是可能发生的

59.13-59.25

and it's one of the problems that people bring up and you know against calls consistency when you try to persuade them， it's a good idea 

人们所提的其中一个问题就是一致性方面的问题

这是人们针对一致性所提出的问题之一，想要去理解这个问题，这是一个不错的例子





59.25-59.28

this problem of cascading delays 

对于这种一连串的延迟来说

59.28-59.29

so that's too bad

So，这实在太糟糕了



59.29-39

um although on that note it is true that the authors of the cops paper have a follow on P actually a couple of interesting follow-on papers 

实际上，COPS这篇paper的作者还有后续2篇令我们感兴趣的paper

59.39-59.44

but one of them has some mitigations for this cascading wait problem

其中一篇paper就提到了如何缓解这种cascading wait（级联等待）的问题

59.44-59.46

 okay 



59.46-59.48

so for a photo example

So，在这个照片的例子中

59.48-59.52

 this is the scheme this cop scheme will actually solve our photo example

实际上，这种COPS方案能解决这个例子中的问题

59.52-59.53

and the reason is that

理由是




59.53-59.56

you know this put we're talking about is the put for the photo list 

你知道的，我们这里所讨论的这个put操作是和相册有关的

59.57-1.00.03

the dependencies is gonna have and its dependency list is the insert of the photo 

它这里的dependency list中包含了插入图片的操作

1.00.03-1.00.05

and that means that 

这意味着

1.00.05-1.00.08

when the put for the photo list arrives at the remote site

当这个针对相册的put操作到达远程站点的时候

1.00.08-1.00.17

 the remote shard server is essentially going to wait for the photo to be inserted and visible before it updates the photo list

在远程shard server更新相册内容前，它会去等待目标照片被插入且处于可见状态







四十二  阅举报
17-04
1.00.17-1.00.24

so any client in a remote site that is able to see the new photo of the updated photo list is guaranteed to be able to see the photo as well 

So，这保证了远程数据中心中的任意client都能够看到这个更新后相册中的新照片



1.00.24-1.00.32

so this COPS scheme fixes the photo and photo list example

So，这种COPS方案解决了这个相册案例中存在的问题




1.00.32-1.00.43

this the scheme the cops is implementing is usually called causal consistency

这种COPS实现方案通常叫做因果一致性（causal consistency）

1.00.43-1.00.54

so there's a question is 

So，这里有个问题

1.00.54-1.00.58

is it still for the programmer to specify the dependencies

程序员是否依然能够去指定这些dependency

1.00.58-1.00.59

no 

No

1.00.59-1.01.00

it turns out that

事实证明




1.01.00-1.01.06

 though that context information this context information that's accumulated here 

这些上下文信息会被累积在这里

1.01.06-1.01.11

the cops client library can accumulate it automatically

COPS client库可以将这些信息自动累积在这里

1.01.11-1.01.16

so the program only does gets and puts

So，这个程序只会去执行get和put操作

1.01.16-1.01.23

and may not even need to see the version numbers

可能甚至都不需要去看到这些版本号

1.01.23-1.01.26

 so simple program we just do gets and puts

So，对于简单的程序来讲，我们只会去做get和put操作

1.01.26-1.01.33

 and internally the cops library maintains these contexts and adds this extra information to the put rpcs

COPS库内部维护了这些上下文信息，并将这些额外的信息添加到put RPC中

1.01.33-1.01.39

so that the programmer just does gets and puts 

So，程序员只需执行get和put就行了

1.01.39-1.01.44

and system kind of automatically tracks the dependency information 

系统会自动跟踪这些dependency信息

1.01.44-1.01.47

so that's very convenient 

So，这很方便

1.01.47-1.01.52

I mean just a you know pop up a level for a moment

上升一个层面来讲

1.01.52-1.02.02

 you know we now built a system that's that is as semantics powerful enough to make the photo example code work out correctly

我们现在所构建的这个系统，它的语义足够强大能让这个照片案例中的代码正确工作

1.02.02-1.02.06

 to have it sort of had the expected result instead of anomalous results

以此来让它所产生的是我们所期望的结果，而不是异常结果



1.02.07-1.02.09

and at least arguably it's reasonably efficient 

至少可以说，这种做法相当有效

1.02.09-1.02.14

because nobody was you know the client never has to wait for writes to complete

因为client永远不需要去等待写操作完成

1.02.14-1.02.15

 there's none of this sync business

这里并没有任何sync操作

1.02.15-1.02.19

 and also the communication is mostly independent

并且通信也是几乎独立的

1.02.19-1.02.20

there's no central log server

这里也没有中央log服务器

1.02.20-1.02.23

so arguably this is both reasonably high performance

So，可以说它的性能真的非常高了

1.02.23-1.02.29

 and has reasonably good semantics reasonably good consistency

并且它还拥有合理的语义，以及合理的一致性

1.02.29-1.02.38

 so the the consistency that this design produces is usually called causal consistency

So，该设计所产生的的一致性通常叫做因果一致性

1.02.38-1.02.44

 and it's actually a much older idea than this paper

实际上，这种思想要比这篇paper所提出的思想还要古老

1.02.44-1.02.50

 there's been a bunch of casual consistency schemes before this paper

在这篇paper出现之前，实际上已经有一系列因果一致性的相关方案了

1.02.50-1.02.51

 indeed a bunch of follow-on work

以及一堆后续研究工作

1.02.51-1.02.54

 so it's a treating idea that people like a lot

So，这是一个人们很喜欢的思想

1.02.54*1.02.58

what causal consistency is

因果一致性是什么呢？

1.02.58-1.02.59

 what it sort of means 

它意味着什么呢？




1.02.59-1.03.04

and here I am putting up I think a copy of figure two from the paper

这里我放了一张paper中figure 2的图

1.03.04-1.03.08

the sort of what the definition says is

它的定义所说的是

1.03.08-1.03.12

that the clients actions induce dependencies

client的动作引起了一系列dependency的出现

1.03.12-1.03.17

 so there's two ways that dependencies are induced 

So，这里有两种会诱发dependency的方式

1.03.17-1.03.17

one is 

其中一种是




1.03.17-1.03.25

if a given client there's a put and then I get does it get and then a PUD or a put and then a put

假设这里有个client，它先执行了一个put操作，再执行了一个put操作，接着，又执行了一个put操作

1.03.25-1.03.27

 then we say that

那么我们就会说

1.03.27-01.03.31

the put depends on the previous put or get

这个put操作依赖于前一个put或者get操作

1.03.31-1.03.32

so that in this case 

So，在这个例子中

1.03.32-1.03.36

put of y and 2 depends on the put of X of one

put(y,2)依赖于put(x,1)

1.03.36-1.03.38

 so that's one form of dependency

So，这是dependency的其中一种形式

1.03.38-1.03.41

 another form of dependency 

dependency的另一种形式是

1.03.41-1.03.45

if is if one client reads a value out of the storage system

如果某个client从存储系统中读取了一个值

1.03.45-1.03.46

then we say that

那么我们就会说




1.03.46-1.03.55

 that the get that that second client issued depends on the corresponding put that actually inserted the value from a previous client 

第二个client所发起的get操作依赖于前一个client所执行的put(y,2)这个插入操作

1.03.55-1.03.56

and furthermore

此外

1.03.56-1.04.01

 we say that the dependency relationship is transitive 

依赖关系是可传递的




1.04.01-1.04.05

so that you know this put depends on that get

So，你知道的，这个put(y,2)依赖于这个put(x,1)操作（这里口误，不是get操作）




1.04.05-1.04.10

 this get by client two depends on the put by client one

client 2中的这个get(y)依赖着client 1的put(y, 2)

1.04.10-1.04.11

 and by transitivity 

通过传递性

1.04.11-1.04.18

in addition we can conclude that the client two's get depends on client ones get

此外，我们可以得出结论，client 2的get操作依赖着client 1中的put操作

1.04.18-1.04.20

and so that means that

So，这意味着

1.04.20-1.04.28

 this last put of by client three for example depends on all of these previous operations 

client 3中所执行的最后一个put操作依赖着之前所有的操作



1.04.28-1.04.34

so that's a definition of causal dependency

So，这就是因果一致性的定义

1.04.34-1.04.40

and then a causally consistent system says that says that

因果一致性系统表示




1.04.40-1.04.51

through the definition of dependency I just outlined， a depends on B sorry B depends on a 

根据我刚刚列出的dependency定义，这里B依赖于A



1.04.51-1.04.53

and a client reads B

假设某个client读取了B的值

1.04.53-1.04.59

 then the client must subsequently also see A the dependency

通过依赖关系，client接下来必然会看到A

1.04.59-1.05.06

so if client ever sees through a second of two ordered operations， operations ordered by dependency

So，如果client看到了两个有序操作中的第二个操作，这些操作根据dependency进行排序

1.05.06-1.05.15

and the client is also then after that， guaranteed to be able to see the everything that that operation depended all

在它看到这第二个操作之后，这就保证了它能够看到此操作所依赖的所有操作



1.05.15-1.05.19

you know so that's the definition 

So，这就是定义

1.05.19-1.05.25

and it's you know in a sense kind of directly derived from what the system actually does 

这是从该系统实际所做的事情中直接推导出来的东西

1.05.25-1.05.29

so this is very nice

So，这真的很nice

1.05.29-1.05.31

 when updates are causally related 

当这些更新操作间存在着因果关系时

1.05.31-1.05.36

that is if yeah you know these clients and in some sense they're talking to each other

你知道的，从某种意义上来讲，这些client会彼此进行通信

1.05.36-1.05.38

you know indirectly through the storage system 

你知道的，它们间接通过存储系统来进行通信

1.05.38-1.05.42

and so the clients are I kind of weired that of you know 

So，这些client有点奇怪




1.05.42-1.05.45

if we somebody reads this value  and sees five

如果有人读取到了这个值，即z的值为5

1.05.45-1.05.55

 and inspects the code，you know they can conclude that really really you know this there's a sense in which this put definitely must have come before this last put

通过审查代码，他们可以总结出put(x, 1)必然是在put(z, 5)之前出现的

1.05.55-1.05.57

 and so if you see last put

So，如果你看到这最后一个put操作

1.05.57-1.05.59

you really gosh you really just deserve to see this first put 

那你就会看到这第一个put操作

1.05.59-1.06.00

so in that sense

So，在这种情况下

1.06.00-1.06.15

causal consistency gives you this programmers kind of a sort of well behaved visas allows them to see well behave values coming out of the storage system

通过因果一致性可以让程序员们从存储系统中很好地看到几个值之间的行为传递

1.06.15-1.06.20

 another thing that's good about causal consistency is that

因果一致性中比较好的另一点是

1.06.20-1.06.21

 when it updates

当执行更新操作的时候

1.06.21-1.06.26

 when two values in the system are not two updates are not causally related 

当该系统中的两个值所对应的两个更新操作没有因果关系的时候

1.06.26-1.06.36

the causal consistency system you know the cops storage system has no obligation is about maintaining order between updates that are not causally related 

那么因果一致性系统（即COPS存储系统）就没有义务去维护这两个没有因果关系的更新操作间的执行顺序

1.06.36-1.06.38

so for example 

So，例如

1.06.38-1.06.42

if I mean that's good for performance 

我的意思是，这对性能来说很不错

1.06.42-1.06.42

so example

So，例如




1.06.42-1.06.49

 if we have you know client one does a put of X and then I put Z 

假设Client 1执行了put x，然后又执行了put z

1.06.49-1.6.50

and then around the same time 

与此同时




1.06.50-1.06.53

client two does a put of y

client 2执行了put y

1.06.53-1.06.57

there's a you know there's no causal relationship between these 

你知道的，这些操作之前不存在因果关系

1.06.57-1.06.58

and therefore

因此




1.06.58-1.07.04

you know sorry there's no causal relationship between the put of Y and any of the actions of client one

你知道的，put y和client 1所做的任何操作都没有因果关系

1.07.04-1.07.14 ！！！

 and so the cops is allowed to do all the work associated with the put of Y completely independently for client ones puts 

So，我们允许COPS执行put y时它所做的所有工作都和client 1中执行put操作时的工作完全独立

so，通过COPS可以知道在C2执行put y时它所做的所有工作都和client 1中执行put操作时的工作完全独立

1.07.14-1.07.16

and the way that plays out is that it's done

它所使用的做法是

1.07.16-1.07.24

and the put of Y is sort of entirely happens in the servers that for the shard of y

这个put y操作只会在Y所对应的shard server上执行

1.07.24-1.07.30

 these two puts are only involve servers for the shards that X and Z are in

这两个put操作只涉及X和Z所在的shard server

1.07.30-1.07.32

 it may require some interaction here

此处，它可能需要某些交互

1.07.32-1.07.39

 because the remote servers for Z may have to wait for this put to arrive

因为Z所在的shard server可能得等待put x到达

1.07.39-1.07.43

but they don't have to talk to the servers that are in charge of of Y

但它们无须去和y所在的服务器进行通信

1.07.43-1.07.49

 so if that's a sense in which causal consistency  allows parallelism and good performance

So，这就是因果一致性所允许的并行性，并且带来了不错的性能

1.07.49-1.07.56

 and you know this is different from potentially from linearizable systems

你知道的，这和线性一致性系统不同

1.07.56-1.07.57

 like linearizable system

以线性一致性系统为例

1.07.57-1.08.00

 the fact that this put Y came after the put of X in real time

从时间上来讲，如果这个put y是在put x之后执行

1.08.00-1.08.03

 actually imposes some requirements on the linearizable storage system

实际上，这会对线性存储系统有一些需求

1.08.03-1.08.08

 but there's no such requirements here for causal consistency

但对于因果一致性来说，却没有这种需求

1.08.08-1.08.15

 and so you might be able to build a causal consistency causally consistent system that's faster than a linearizable system

So，你可能能够构建出比线性系统速度还要快的因果一致性系统

1.08.15-1.08.18

 okay 



1.08.18-1.08.19

there's a question

这里有个问题

1.08.19-1.08.23

 would cops gain any more information by including puts in the client context

通过将这些put操作相关的信息放在client的上下文中，COPS是否能获得更多信息

1.08.23-1.08.24

 okay 



1.08.24-1.08.29

so it's this may be a reference to the today's lecture question

这可能引用了今天课上的一个问题

1.08.29-1.08.31

 it is the case 

它是这种情况

1.08.31-1.08.37

So I wanna explain the answer for the lecture question

So，我想来解释下课上这个问题的答案




1.08.37-1.08.45

 the if a client does get of X

如果client执行了get(X)

1.08.45-1.08.47

I mean look at its context 

来看下这里的context中的信息

1.08.47-1.08.50

does the get of X

这里执行了get(X)




1.08.50-1.08.52

 maybe and then put to Y 

接着，它又执行了put(Y)



1.08.52-1.08.55

and then a put to Z 

然后是put(Z)




1.08.55-1.09.00

in the context initially is X version something

在上下文中，一开始的时候是X+它的版本号

1.09.00-1.09.04

 you know that when we client sends the puts to the server

你知道的，当client将这些put操作发送给服务器时

1.09.04-1.09.06

 it's gonna include this context along with it

它会携带这些上下文信息

1.09.06-1.09.08

but in the actual system

但在实际的系统中

1.09.08-1.09.10

 there's this optimization

这里有一种优化

1.09.10-1.09.11

 that after a put 

当执行完一个put后




1.09.11-1.09.22

the context is replaced by simply the version number for the put

我们通过该put操作的版本号来替换上下文信息

1.09.22-1.09.29

 and any previous stuff in the context like namely this information about X is erase from the from the clients context

该上下文中任何之前的内容（比如Xv？之类的东西）会从client的上下文中移除

1.09.29-1.09.35

so we dont need includes after put ，the context is just replaced with version number returned from the put 

so，我们不需要将它包含在后续put传入的内容中（即此处只传put(z，Yv7),而不是put(z，Yv7，Xv?)），上下文就是将put操作返回的版本号替换下而已






1.09.35-1.09.42

that so isn't this returns you know version version seven of Y

So，这里返回的y的版本号是7

1.09.42-1.09.52

 and the reason why this is correct and doesn't lose any information for the non-transactional cops is that

对于非事务性COPS来说，为什么这样做是正确的，并且不会丢掉任何信息

1.09.52-1.09.59

 for this when this put is sent out to all the remote sites

当这个put(Y)被发送到所有远程服务器上时

1.09.59-1.10.05

 the put is accompanied by X version whatever in the dependency list 

这个put会携带依赖列表中的X以及它的版本号

1.10.05-1.10.12

so this put won't be applied until at all and each data center until this X is also applied 

So，直到这个X被提交到所有数据中心后，这个put才会被执行




1.10.12-1.10.17

so then when if the client then does this put right 

So，如果这个client执行了这个put(Z)

1.10.17-1.10.26

what this turns into is sent to other data centers is really a put with Z and some value and the dependency is just Y version seven

当我将put(Z)发送到其他数据中心后，它们在执行put(Z)时就会等待Yv7就位

1.10.26-1.10.36

 all the other data centers are going to wait for they're gonna check before applying Z they're gonna check that Y version seven has been applied at their data center

 在将Z落地到所有数据中心前，它们会去检查Yv7是否已经落地到它们的数据中心了

1.10.36-1.10.44

well we know the Y version seven won't be applied at their data center until X version whatever is supplied at that data center 

我们知道，只有在Xv？落地到本地数据中心了，Yv7才会落地到数据中心本地

1.10.44-1.10.46

so there's sort of a cascading delays here

So，这里存在着cascading delay的情况

1.10.46-1.10.53

where that is telling other data centers to wait for Y version seven to be installed

即告诉其他数据中心要等待Yv7落地到这些数据中心中

1.10.53-1.10.54

implies that

这暗示着

1.10.54-1.10.59

 they must also already be waiting for whatever Y version seven depended on

它们也必须已经在等待Yv7的相关dependency的到达

1.10.59-1.11.01

and because of that

因为这个原因

1.11.01-1.11.08

we don't need to also include X version the X version and this dependency list

我们不需要包括X以及它的版本号，还有这个dependency list

1.11.08-1.11.11

because those data centers will already be waiting for that version of X 

因为这些数据中心已经在等待获取这个版本的X了

1.11.11-1.11.14

so the answer the question is no

So，这个问题的答案就是No

1.11.14-1.11.23

 cops call the non-transactional cops doesn't need to have anything doesn't need to remember the gets in the context after it's done put

对于非事务性COPS来说，当它执行完put操作后，后面的put操作就不需要记住上下文中的这些get操作

1.11.23-1.11.28

all right 



1.11.28-1.11.34

a final thing to note about this scheme is that

关于这个方案最后有一点要注意的事情是

1.11.34-1.11.42

COPS only see certain relationships it's only aware of certain causal relationships

COPS只会注意到这些因果关系

1.11.42-1.11.48

that is it only you know cops is aware that

COPS会注意到

1.11.48-1.11.51

 if a single client thread does a put and then another put 

如果有一个client线程执行了一个put操作，接着又执行了另一个put操作

1.11.51-1.11.53

client you know cops record

COPS就会记录下

1.11.55-1.11.56

Oh this the second put depends on the first put

Oh，第二个put操作依赖于第一个put操作

1.11.56-1.11.57

 furthermore

此外




1.11.57-1.12.00

 cops is aware that 

COPS会注意到这里




1.12.00-1.12.08

oh what a client does a read of a certain value that it's depending on I'm the one to put the created that value

client 2这里所做的get操作所要读取的值依赖于client 1所做的put操作所生成的值

1.12.08-1.12.10

and therefore depending on anything that that depended on 

因而这个操作又有前一步的依赖

1.12.10-1.12.13

so you know cops is directly aware of these dependencies here

So，COPS会直接注意到这些dependency

1.12.13-1.12.14

 however 

但是

1.12.14-1.12.20

it could it is often the case

我们经常会遇到这种情况

1.12.20-1.12.26

 that causality in the larger sense is conveyed through channels that cops is not aware of 

从广义层面来讲，因果关系是以CPOS所无法注意到的方式进行传播的

1.12.26-1.12.28

so for example

So，例如




1.12.28-1.12.34

 you know if client one does a put of X 

如果client 1执行了put(X)

1.12.34-1.12.45

and then the human you know who's controlling client one calls up client 2 on the telephone  or it's you know email or something that

接着，控制着client 1的人给控制着client 2的人打了个电话，或者发了邮件

1.12.45-1.12.48

says look you know I just updated the database with some new information 

并说，你看我刚更新了数据库中的数据

1.12.48-1.12.48

why don't you go look at it

为什么你不去看下数据库

1.12.48-1.12.55

right and then client 2 you know does it get of X

接着，client 2执行了get(X)

1.12.55-1.12.58

 sort of in a larger sense

从广义层面来讲

1.12.58-1.13.03

causality would you know suggest the client 2 really ought to see the updated X 

根据因果关系表明，client 2确实会看到这个更新后X的值

1.13.03-1.13.08

because client 2 knew from the telephone call  that X had been updated

因为控制着client 2的人从电话中就已经知道X已经被更新了

1.13.08-1.13.12

 and so if cops had known about the telephone call 

So，如果COPS已经知道这通电话中的内容

1.13.12-1.13.19

it would have actually included 

它实际上应该包括。。。。

1.13.19-1.13.25

the it would have actually caused the extra sorry 

抱歉

1.13.25-1.13.29

if the telephone call had been itself a put 

如果电话中包含了一个put操作




1.13.29-1.13.33

right you know it would have been a put of telephone call here

你知道的，如果（client 1打的）这通电话里面讲到了一个put操作

1.13.33-1.13.34

 and I get of telephone call here 

然后，Client 2在电话中知道了，并调用了一个get操作


1.13.36-1.13.37

and if this get had seen that put

如果这个get操作已经看到了这个put操作



1.13.37-1.13.42

 cops would know enough to arrange that this get would see that put

当COPS知道足够多的信息后，它会安排这个get操作看到这个put操作

 

1.13.42-1.13.46

but because cops was totally unaware of the telephone call

因为COPS完全不会注意到这通电话

1.13.46-1.13.50

there's no reason to expect that this get would actually yield the put value

我们没有理由去期望通过调用这个get操作一下子就拿到这个put操作的值



1.13.50-1.13.57

 so cops is sort of enforcing causal consistency

So，COPS属于某种强制的因果一致性

1.13.57-1.14.03

 but only for the sources the kinds of causation the COPS is directly aware of 

但COPS只适用于它直接知道来源的因果关系



1.14.03-1.14.05

and that means that

这意味着

1.14.05-1.14.12

 the sense in which cops is causal consistency sort of eliminates anomalous behavior 

COPS的因果一致性消除了异常行为

1.14.12-1.14.22

well it only eliminates anomalous behavior if you restrict your notion of causality to what cops can see it

Well，如果你限制了COPS所能看到的因果关系，它只会去消除那些异常行为

1.14.22-1.14.23

 in the larger sense you're going to still see odd behavior 

从广义层面来讲，你依然会看到这些奇怪的行为



1.14.23-1.14.24

you definitely going to see situations

你肯定会看到这些情况

1.14.24-1.14.30

where you know someone believes that a values been updated and yet they do not see the updated value

即有人相信某个值已经被更新过了，但他们还没有看到更新后的值

1.14.30-1.14.35

that's because their belief was caused by something that COPS wasn't aware of

这是因为他们的这种看法是由COPS所不曾注意到的东西所引起的

1.14.35-1.14.40

 all right



1.14.40-1.14.48！！！！！

another potential problem which I'm not gonna talk about is that

另一个我还未讨论的潜在问题是

1.14.48-1.14.53

 the remember for the photo example with the photo list 

还记得照片案例中的那个相册么

1.14.53-1.14.56

there was a particular order of the adding a photo

往相册中添加一张照片时有一个特定的顺序

1.14.56-1.15.00

 and that particular different order of looking at photos

查看相册中的照片时使用的又是另一种执行顺序

1.15.00-1.15.04

that made the system work with causal consistency 

这使得系统以因果一致性的方式进行工作

1.15.04-1.15.08

as we're definitely relying on the there being sort of 

因为我们绝对会依靠这些。。。

1.15.08-1.15.12

if the reader reads the photo list and then reads the photo in that order 

如果reader以这个顺序，它先读取了相册的内容，然后又读取了这张照片

1.15.12-1.15.15

that the fact that a photos refer to photo list means

照片存在于这个相册，这意味着

1.15.15-1.15.17

 that the read of the photo will succeed

我们就能成功读取这个照片

1.15.17-1.15.19

 it is however

但是

1.15.19-1.15.32

 the case that there are situations where no one order of reading or combination of orders of reading or writing will cause sort of the behavior we want 

在这个例子中，有几种情况下，没有任何一种读操作的执行顺序，或者写操作的执行顺序能够符合我们所希望的行为

1.15.32-1.15.35

and that but this is leading into transactions

但这会引入事务

1.15.35-1.15.37

which I'm not gonna have time enough to explain 

虽然我没时间去解释这个了 



1.15.37-1.15.41

but at least I want to mention the problems the paper set up 

但我至少想说下paper中所涉及的一些问题



1.15.41-1.15.48

so supposing we have our photo list

So，假设我们有一个相册



1.15.48-1.15.50

And it's protected by an access control list 

并且它被一个访问控制列表（access control list）所保护



1.15.50-1.15.58

and an access control this is basically a list of usernames that are allowed to look at the photos on my list does 

简单来讲，访问权限列表指的是允许查看我这个相册的用户列表



1.15.58-1.15.58

that means that

这意味着

1.15.58-1.16.05

the software that implements these photo lists with access control list

该软件通过ACL（access control list）实现了这些相册的功能

1.16.05-1.16.08

needs to be able to you know read the list

你知道的，它需要能够去读这些相册中的内容



1.16.08-1.16.10

 and then read the access control list 

接着读取访问控制列表

1.16.10-1.16.14

and see if the user trying to do the read is in the access control list 

并检查试着进行读取操作的这个用户是否在访问控制列表上

1.16.14-1.16.15

and however

但是

1.16.15-1.16.21

neither order of getting the access control list and the list of photos works out 

没有任何一种执行顺序能让获取访问控制列表和相册的代码正确工作




1.16.21-1.16.25

so if the client code first gets the access control list

So，如果client端代码首先拿到访问控制列表的内容




1.16.25-1.16.30

 and then gets the list of photos 

接着，拿到相册内容

1.16.30-1.16.33

that order actually doesn't always work so well 

这种执行顺序实际上并不是总是可行

1.16.33-1.16.38

because supposing my client read access control list 

假设我的client先读取访问控制列表

1.16.38-1.16.40

and sees that I'm on the list

并检查我是否在该列表中




1.16.40-1.16.42

 but then right here

但接着，在此处这个位置的时候

1.16.42-1.16.47

 the owner of this photo list deletes me from the access control list

该相册的拥有者将我从访问控制列表中删除

1.16.42-1.16.52

and inserts a new photograph that I'm not supposed to see in the list

并插入一张我不允许在相册中看到的新照片




1.16.52-1.16.58

right so c2 does a you know a put of access control is to delete me

So，client 2执行了一个put操作，将我从访问控制列表中删除




1.16.58-1.17.03

 and then a put of the photo list to add a photo I'm not allowed to see

接着，它对相册执行了一个put操作，并插入了一张不允许我看到的照片

1.17.03-1.17.07

 then my client gets around to the second get

接着，我的client就去执行第二个get操作

1.17.07-1.17.08

it sees this list

它读取到了这个相册

1.17.08-1.17.12

 you may see this list which is the now the updated list that has the photo I'm not allowed to see 

你可能会看到这个刚更新后的相册，它里面放着不允许我看到的那张照片

1.17.12-1.17.15

but my client thinks aha I'm in the access control list

但我的Client会觉得，它在这个访问控制列表中

1.17.15*1.17.16

 because it's reading an old one

因为它读取到的是旧的访问控制列表

1.17.16-1.17.21

and here's this photo so I'm allowed to see

So，它允许我去读取这张我所不能看到的照片

1.17.21-1.17.23

 you so in that case

So，在这个例子中



1.17.23-1.17.26

 you know we're getting an inconsistent

你知道的，我们陷入了数据不一致的情况






1.17.26-1.17.32

 what we know to be an inconsistent sort of combination of a new list and an old access control list

 我们就会陷入新相册和旧的访问控制列表这两者引发的（权限）不一致问题



1.17.32-1.17.35

but there was really nothing 

但这其实没什么

1.17.35-1.17.37

but causal consistency allows this

但因果一致性允许这种情况发生



1.17.37-1.17.40

 casual consistency only says

因果一致性只表示

1.17.40-1.17.445

 well you're gonna see data that's at least as new as the dependencies 

Well，你所能看到的数据至少和那些dependency一样新

1.17.45-1.17.47

every time you do a get

每当你执行get操作时

1.17.47-1.17.52

so and indeed if you know as the paper points out

正如paper所指出的那样




1.17.52-1.18.01

 if you think it through it's also not correct for the reading client to first read the list of photos and then read the access control list

如果你觉得client先读取相册，再读取访问控制列表，这种执行顺序也不正确

1.18.01-1.18.06

 because sneaking in between this 

因为这两个get操作之间又潜入了一些其他client的操作

1.18.06-

though this might have a this that I



1.18.06-1.18.10

the list I read may have a photo I'm not allowed to see 

因为这个相册中可能包含了不允许我去查看的一张照片



1.18.10-1.18.13

and at that time maybe the access control list didn't include me 

可能在那个时候，访问控制列表并没有将我包括进去

1.18.13-1.18.14

but at this point

但在此时

1.18.14-1.18.19

 the owner of the list may delete the private photo add me to the access control list

该相册的拥有者可能会将这张隐私照片删除，并将我添加到访问控制列表中




1.18.19-1.18.21

 and then I may see myself in the list

那么，我可能就会看到我自己是在这张访问控制列表中了

1.18.21-1.18.23

 so again if we do it in this order

So，如果我们是以这个顺序执行的

1.18.23-1.18.24

 it's also not right

那么这样做也不正确

1.18.24-1.18.30

because we might get an old list and a new access control list

因为我们拿到的可能是一个旧的列表，和一个新的ACL

1.18.30-1.18.37

 so causal consistency as I've described it so far  isn't powerful enough to deal with this situation

So，正如我目前所描述的，因果一致性还未强大到处理这种情况




1.18.37-1.18.43

you know we need some notion of being able to get a mutually consistent list and access control lists

你知道的，我们需要通过某种方式来让相册和访问控制列表的权限保持一致

1.18.43-1.18.49

through either sort of both before some update or both after

不管是更新前还是更新后

1.18.49-1.18.53

and cops GT actually provides a way of doing this

实际上，COPS-GT提供了一种方式，它能够做到这点




1.18.53-1.18.59

 it by essentially doing both gets

本质上来讲，它会执行这两个get操作

1.18.57-1.19.05

but cops GT sends the full set of dependencies back to the client when it does get 

当client执行这两个get操作的时候，COPS-GT会将一组完整的dependency发送给这个client

1.19.05-1.19.05

and that means that

这意味着




1.19.05-1.19.12

 the client in a position to actually check the dependencies of both of these return values

实际上，client会在这个位置去检查这两个返回值的dependency

1.19.12-1.19.25

 and see that aha you know there's a dependency for list that is a version of these sorry for that there might be a the dependency list for the access control list

对于访问控制列表来说，这里可能会有一个dependency list

1.19.25-1.19.27

 me mention that

我之前提到过

1.19.27-1.19.32

 it depends on a version of list that's in the farther ahead than the version of Lists that actually gotten

它所依赖的这个相册的版本要远比它实际拿到的版本要老

1.19.32-1.19.35

and in that case，COPS-GT would be fetch the data

在这个例子中，COPS-GT会去获取数据

1.19.35-1.19.39

all right



1.19.39-1.19.43

 with one question is

有一个问题是

1.19.43-1.19.45

is it related to the thread of execution

这是否和线程的执行有关

1.19.45-1.19.47

yeah so it's true

说的没错



1.19.47-1.19.54

causal consistency doesn't really it's not about wall clock time

因果一致性和挂钟时间无关

1.19.54-1.19.57

so it has no notion of wall clock time

So，它里面并没有涉及挂钟时间这种概念

1.19.57-1.20.05

 there's only the only sort of forms of order that it's obeying that are even a little bit related to wall clock time 

它唯一遵寻的就是执行顺序这种形式，这和挂钟时间有点相关

1.20.05-1.20.08

or that if a single thread does one thing and then another and another

如果一条线程做了一件事，接着做了另一件事，然后又做了另一件事




1.20.09-1.20.14

then causal consistency does consider these three operations to be in that order

那么因果一致性就会认为这三个操作是以这种顺序执行的

1.20.14-1.20.18

 but it's because one client thread did these sequence of things 

因为这个client是在一条线程内执行这三个操作的

1.20.18-1.20.21

and not because there was a real time relationship

而不是因为它们之间存在着时间上的关系

1.20.21-1.20.24

 so just a wrap up here 

So，总结一下

1.20.24-1.20.28

to sort of put this into a kind of larger world context

我们将它放在一个更大的环境中

1.20.28-1.20.38

 causal consistency has been an is like a very kind of promising research area

因果一致性已经是一种非常有前途的研究领域

1.20.38-1.20.39

 and has been for a long time

并且它已经出现了很长一段时间

1.20.39-1.20.50

 because it does seem like it might provide you with good enough consistency but also opportunities more opportunities and linearizability to get high performance

因为它除了给你提供足够好的一致性以外，它还为你提供了线性一致性的能力，以获取更高的性能

1.20.50-1.20.55

however it hasn't actually gotten much traction in the real world

但是在现实世界中，它并没有那么吸引人

1.20.55-1.20.58

people use eventual consistency systems

人们使用最终一致性系统

1.20.58-1.21.00

and they use strongly consistent systems

以及强一致性系统

1.21.00-1.21.04

but it's very rare to see a deployed system and as causal consistency

但我们很少在已经部署的系统中看到使用因果一致性的

1.21.04-1.21.06

 and there's a bunch of reasons

这其中存在着很多原因

1.21.06-1.21.08

 potential reasons for that 

其中可能的原因是

1.21.08-1.21.15

you know it's always hard to tell exactly why people do or don't use some technology for real-world systems

你知道的，我们很难讲出为什么人们在现实世界的系统中使用或者不使用某种技术

1.21.15-1.21.18

 one reason is that

其中一个理由是

1.21.18-1.21.24

 it can be awkward to track per client causality 

跟踪每个client的因果关系可能会很尴尬

1.21.24-1.21.29

in the real world a user and browser are likely to contact different web servers at different times 

在现实世界中，一个用户的浏览器可能会在不同的时间点和不同的web服务器进行通信

1.21.29-1.21.31

and that means

这意味着

1.21.31-1.21.35

 it's not enough for a single web server to keep users context

只通过单个web服务器去保存用户的上下文是不够的

1.21.35-1.21.41

 we need some way to stitch together context for a single user as they visit different web servers at the same website 

当用户在访问同一网站的不同web服务器时，我们需要某种方式将单个用户的上下文缝合在一起

1.21.41-1.21.42

so that's painful

So，这令我们很痛苦

1.21.42-1.21.50

I know there is this problem that cops doesn't doesn't track only tracks causal dependencies it knows about

我知道的另一个问题是，COPS只会去跟踪它所知道的因果依赖

1.21.50-1.21.51

 and that means

这意味着

1.21.51-1.21.54

 it doesn't have a sort of ironclad solution

它并没有一种固定的解决方案

1.21.54-1.21.57

 or doesn't sort of provide ironclad causality

或者说，它并不提供铁定的因果关系

1.21.57-1.2205

 and only sort of certain kinds of causality which is well sort of limits how appealing it is

它只提供了一定程度上的因果关系，这限制了它对我们的吸引力

1.22.05-1.22.07

another is that 

另一个问题是

1.22.07-1.22.14

the you know eventual and causal consistent systems can provide only the most limited notion of transactions 

最终一致性系统和因果一致性系统对事务的支持非常有限

1.22.14-1.22.22

and people more and more I think as time goes on are sort of wishing that their storage systems had transactions

我觉得，随着时间的流逝，越来越多的人会希望他们的存储系统能够支持事务

1.22.22-1.22.24

finally 

最后

1.22.24-1.22.32

the amount of overhead required to push around a track and store all that dependency information can be quite significant 

用来推送、跟踪以及存储这些依赖信息所需要的开销是非常明显的

1.22.32-1.22.39

and you know I was unable to kind of detect this in the performance section of the paper 

我没法在这篇paper中关于性能那一章节中看到这点

1.22.39-1.22.43

but the fact is it's quite a lot of information that has to be stored and pushed around and it 

但事实就是，这里要保存和推送一大堆信息

1.22.43-1.22.48

you know if you were hoping for the sort of millions of operations per second level of performance

如果你希望做到每秒能处理数百万个操作的那种级别的性能

1.22.48-1.22.51

 that at least Facebook was getting out of memcacheD

至少Facebook通过memcache做到过这种程度

1.22.51-1.23.00

the kind of overhead that you would have to pay to use causal consistency might be extremely significant for the performance

使用因果一致性所产生的开销对于性能方面的影响非常显著



1.23.00-1.23.09

so those are reasons why I'm causal consistency maybe hasn't currently caught on although maybe someday it will be 

So，这些就是为什么因果一致性目前还未流行的原因，但总有一天它会流行起来的

1.23.09-1.23.13

okay that's all I have to say 

Ok，这就是我今天所要讲的东西

1.23.13-1.23.23

and actually starting next lecture we'll be switching gears away from storage and sequence of three lectures that involve block chains 

实际上，从下节课开始，我们就不在讨论存储相关的内容，接下来的三节课都是和区块链相关的

1.23.23-end

so I'll see you on Thursday

So，周四再会



三十七  阅举报
