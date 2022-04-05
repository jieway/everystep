6-01
0-0.05

all right well let's get started

好了，让我们开始吧

0.05-0.12

today and indeed today and tomorrow I'm gonna talk about raft

在今天和明天的课上，我会去讨论Raft相关的内容

0.12- 0.18

both because I hope it'll be helpful for you in implementing the labs 

因为我希望这对你们在实现lab的时候会有所帮助

0.18-0.25

and also because you know it's just a case study in the details of how to get state machine replication correct

并且，因为它是一个涉及如何正确获取replication 中state machine （状态）相关细节的学习案例


0.25-0.30

so we have introduction to the problem 

So，我们已经对其中会遇到的问题进行了介绍

0.30-0.35

you may have noticed a pattern in fault-tolerant systems that we've looked at so far

你可能已经注意到了目前为止我们所看过的fault-tolerant系统中的一种模式

到目前为止，我们已经看过一些关于fault-tolerant系统的模式

0.35-0.42

one is that MapReduce replicates computation

其中一种是MapReduce对计算进行复制

0.42-0.47

but the replication is controlled the whole computation is controlled by a single master 

但整个计算是由单个master节点所控制

0.47-0.52

another example I'd like to draw your attention to is 

另一个我在黑板上画的你们要注意的例子是

0.52-0.55

that GFS replicates data

即GFS对数据进行复制

0.55-0.59

right as this primary backup scheme for replicating the actual contents of files

通过Primary-Backup scheme来复制文件中的实际内容

0.59-1.04

but it relies on a single master to choose who the primary is for every piece of data

但是它依靠单点master选择primary去操作每一块数据

1.04-1.12

another example,, vmware ft replicates computational write on a primary virtual machine and a backup virtual machine

还有一个例子，通过vmware ft replicates在primary （主）虚拟机和backup（备）虚拟机上进行计算写入操作



1.12-1.15

but in order to figure out what to do next

但为了弄清楚下一步要做什么

1.15-1.17

if one of them seems to a fail

如果上述某一节点出现的问题

1.17-1.27

it relies on a single test and set server to help the choose to help it ensure that exactly one of the primary of the backup takes over, if there's some kind of failure 

当系统出现了点问题时，依赖一个单点的test-and-set server帮助服务器选择，帮助它确认backup（备）机中的一个来接管primary （主）机

1.27-1.30

so in all three of these cases 

So，在这三个案例中

1.30-1.32

sure there was a replication system

它们都有一种replication系统

对于一个replication系统

1.32-1.36 *******

but sort of tucked away in a corner in the replication system

但它们都隐藏在replication系统的角落里面

在这个replication系统的一个角落里

1.36-1.43 ********

there was some scheme where a single entity was required to make a critical decision about who the primary was

在某些方案中，需要一个实体对谁是primary做出关键决定

会有一个方案，即通过一个单独的实体来对谁是primary做出关键决定

1.43-1.44

 in the cases we care about 

这也是这些案例中我们所关心的东西

1.44-1.54

so a very nice thing about having a single entity decide who's gonna be the primary  is that it can't disagree with itself 

通过一个单个实体来决定谁是primary的好处在于它没法自己去做否决（知秋注：可以回顾下test-and-set server的设计）



1.54-1.55

right 



1.55-1.58

there's only one of it, makes some decision, that's the decision it made

这里只有它一个能做出某些决定



1.58-2.06  ！！！！！！！！

 but the bad thing about having a single entity decide like who the primary is is that it itself as a single point of failure

但使用一个单个实体来决定谁是primary的缺点就是会遇上单点故障（single point of failure）

2.06-2.16

 and so you can view these systems that we've looked at it sort of pushing the real heart of the fault tolerance machinery into a little corner

So，你们可以看到，在目前我们所看过的这些系统中，它们将容错机制的真正核心放在了一个小角落里面

2.16-2.21

that is the single entity that decides who's going to be the primary if there's a failure

即如果系统发生故障的话，通过一个单个实体来决定谁是primary

2.21-2.25

now this whole thing is about how to avoid split brain

整个操作就是为了避免脑裂(split brain)

2.25-2.32

the reason why we have to be extremely careful about making the decision about who should be the primary if there's a failure is that

这样做的理由是因为如果系统发生了故障，我们就要非常小心地决定谁是primary，

2.32-2.34

 otherwise we risks split brain 

否则我们会有脑裂（split brain ）的风险

2.34-2.38

and just make this point super clear

为了让这一点更加清楚


2.38-2.48

 I'm gonna just remind you what the problem is and why it's a serious problem

我要提醒你的是这到底是什么问题，为什么它很严重

2.48-2.49

so supposing for example 

我们做个假设

2.49-2.54

where we want to build ourselves a replicated test and set server 

我们想去构建一个具备replicated能力的test-and-set服务器

2.54-2.55

that is we're worried about the fact

同时这也是我们所关心的一点

2.55-3.00

 that vmware ft relies on this test and set server to choose who the primary is 

Vmware ft基于这个test-and-set服务器来选择哪个是primary

3.00-3.02

so let's build a replicated test and set server

So，我们来构建一个具备replicated能力的test-and-set服务器

3.02-3.03

I'm gonna do this

我会去构建这样一个服务器

3.03-3.04

it's gonna be broken

它可能会故障


3.04-3.11

 it's just an illustration for why it's difficult to get this split brain problem correctly

我只是用它来解释为什么我们很难正确地解决脑裂（split brain）问题




3.11-3.14

So you know we're gonna imagine we have a network 

So，想象一下，假设我们有一个网络环境

3.14-3.17

and maybe two servers

里面有两台服务器

3.17-3.22

which are supposed to be replicas of our test-and-set servers connected 

假设，它们是我们这个test-and-set服务器的两个relica（副本）

3.22-3.23

and you know maybe two clients

这里会有两个Client

3.23-3.25

they need to know who's the primary right now

它们需要知道现在哪个服务器是primary

3.25-3.32 

or actually maybe these clients in this case are the primary and the back up in vmware ft 

在这个例子中，这些Client端可能就是Vmware ft中的primary和backup

3.32-3.35

so if it's a test and set service

So，如果它是一个test-and-set服务


3.35-3.39

then you know both these databases mostly servers start out with their state 

这两个数据库服务器会以它们的状态开始运行

3.39-3.42

that is the state of this test-and-set back in zero

这个test-and-set的状态就是0

3.42-3.46

and the one operation their clients can send is the test and set operation 

它们的Client端所能发送的一条操作就是test-and-set操作

3.46-3.52

which is supposed to set the flag of the replicated service to one 

即将副本（replicated）服务的flag设置为1

3.52-3.56

so i should set both copies and then return the old value

So，我应该对两个副本都进行这样的设置，并返回原来的值

3.56-3.59

so it's essentially acts as a kind of simplified lock server

So，也就是说，这表现得和一个简化版的lock服务器差不多

3.59-4.01

 okay 



4.01-4.12

so the problem situation，we worried about split-brain arises when a client can talk to one of the servers but can't talk to the other

我们所担心脑裂（split brain）所引起的问题是，当一个Client可以和其中一个服务器进行通信，但它不能和其他服务器进行通信

4.12-4.16

so we're imagining either that when clients send a request they send it to both

So，我们可以想象这样一个场景，当Client端向两个服务器发送一个请求时

4.16-4.19

 I'm just gonna assume that now and almost doesn't matter 

我只是假设现在这种情况，不要在意某些细节

4.19-4.26

so let's assume that the protocol is that the clients supposed to send ordinarily any request to both servers

So，我们所假设的协议是，Client端可以向两个服务器发送任何请求

4.26-4.32

and somehow  we need think through what the clients should do，if one of the server's doesn't respond

如果其中一个服务器不响应的话，我们该思考Client应该去做什么

4.32-4.35

right or what the system should do if one of the server seems to gotten unresponsive

如果其中某台服务器无响应的话，那么系统应该做什么呢？



4.35-4.41

So let's imagine now the client one can contact server one but not server two 

让我们想象一下客户端C1能连通服务器S1但是不能连通S2

4.41-4.44

how should the system react

系统应如何响应

4.44-4.46

One possibility is for is that 

对此，其中一种可能是

4.46-4.48

we think well you know gosh

我们会这样想

4.48-4.50

we certainly don't want to just talk to client to server one

我们并不想让Client只和服务器S1进行通信


4.50-4.55

because that would leave the second replica inconsistent if we set this value to one， but didn't also set this value to one

因为如果我们将服务器S1的值设置为1，但没有将服务器S2的值也设置为1，那么就会导致第二个replica（服务器S2）与服务器S1不一致

4.55-4.57

so maybe the rule should be that

So，那么规则可能应该是这样

4.57-5.05

 the client is always required to talk to both replicas to both servers for any operation and shouldn't be allowed to just talk to one of them 

对于任何操作来说，我们要求Client去和两个服务器进行通信，而不是只和其中一个服务器进行通信

5.05-5.06

so why is that the wrong answer 

So，为什么这是错误答案呢？

5.06-5.17

so the rule is oh in our replicated system the clients always require to talk to both replicas in order to make progress

So，在我们的replicated系统中，我们总是要求Client端向两个replica进行通信，以此来取得进展

5.17-5.23

in fact，it’s not fault tolerance

事实上，这并不是容错

5.23-5.26

it's worse， it's worse than talking to a single server

这很糟糕，这要比和单个服务器进行通信还要糟糕

5.26-5.28

because now the system has a problem

因为现在我们的系统中存在了一个问题

5.28-5.33

if either of these servers is crashed or you can't talk to it 

如果其中某些服务器崩溃了，或者我们没法和它进行通信

5.33-5.36

at least with a non replicated service you're only depending on one server 

至少，在一个不具备复制能力的服务中，我们只能依赖一个服务器

5.36-5.38

but here we am both servers have to be alive

但这里，我们两个服务器都必须在线

5.38-5.40

if we require the client to talk to both servers

如果我们要让该Client端对这两个服务器端都进行通信

5.40-5.42

then both servers has to be live

那么这两个服务器都必须在线

5.42-5.48

so we can't possibly require the client to actually you know wait for both servers to respond

So，实际上，我们不可能让Client去等待两个服务器都对其进行响应

5.48-5.49

 if we don't have fault tolerance

如果我们不具备容错能力（fault tolerance）

5.49-5.51

We need it to be able to proceed 

我们需要它能够去处理这种问题

5.51-5.52

so another obvious answer is that

So，另一个很明显的答案是

5.52-5.55

 if the client can't talk to both

如果客户端不能同时和两个服务进行通信

5.55-5.56

well it just talks to the one who can talk to

Well，那它就会和能通信的进行通信

5.56-5.58

and figures the other ones dead

并指出另一个服务器已经跪了

5.58-6.03

So what's up why is that also not the right answer

So，为什么这也不是正确答案呢？

6.03-6.11

the troubling scenario is if the other server is actually alive

这个麻烦的场景是如果另一个服务器实际上没跪

6.11-6.15

so suppose the actual problem or encountering is not that this server crashed 

So，我们所遇上的实际问题并不是这个服务器跪了

6.15-6.17

Which would be good for us

对我们来说这是件好事




6.17-6.22

but the much worse issue that something went wrong with the network cable

但更加糟糕的情况就是，因为网线的问题，让某些东西出现了故障

6.22-6.27

 and that this client can talk to Client one can talk to server one but not server two 

Client 1可以和服务器S1进行通信，但没法和服务器S2进行通信

6.27-6.31

and there's maybe some other client out there that contact a server two but not server one

这也可能有一些其他Client，它们可以和服务器2进行通信，但没法和服务器1进行通信

6.31-6.33

so if we make the rule 

So，如果我们制定一条规则

6.33-6.36

that if a client can talk to both servers

一个客户端能和这两个服务器进行通信

6.36-6.40

that it's okay in order to be fault tolerant that I just talked to one

我只能对一个服务器进行通信，它就可以进行容错（fault tolerant）

为了能够容错，我只和一个服务器进行通信，这样是Ok的

6.40-6.44

then what's just inevitably gonna happen

然后这就会不可避免地发生某些事情

6.44-6.48

said this cable is gonna break，thus cutting the network in half 

比如，这条网线断了，这导致一半网络瘫痪了

6.48-6.52

client one is gonna send a test and set request to server one

Client 1会发送一个test-and-set请求给服务器S1


6.52-6.55

Server one will you know set its state to one 

服务器S1会将它的状态设置为1

6.55-6.58

and return the previous value of zero to client one 

并将前一个值（即0）返回给Client 1

6.58-7.00

and so that mean client one will think it has the lock 

So，这就意味着Client 1会认为它拿到了这个锁

7.00-7.03

and if it's a VMware ft

如果这是一个Vmware ft的话

7.03-7.05

server will think it can be takeovers primarily

服务器就会认为它能够接管primary的工作


7.05-7.07

 but this replica still of zero in it

但此处的replica中的值依然是0

7.07-7.15

all right so now if client two who've also sends a test and set request to you know what price to send them to both sees that server one appears to be down

那么如果Client 2也已经发送了一个test-and-set请求给两个服务器，但它看到服务器S1似乎挂掉了

7.15-7.18

 follows the rule that says why you just send to the one server but you can't talk to

遵循规则

按照规则来看，为什么你把请求发送给了一个你无法通信的服务器


7.18-7.25

then it will also think that it would either quiet because client 2 also think that it acquired the lock and

接着，Client 2也会认为它获取到了这把锁

7.25-7.32

so now you know if we were imagining this test and set server was going to be used with the and Vmware ft we have not

现在，我们可以想象一下，这个test-and-set server 被Vmware ft 用来确定谁是primary

7.32-7.41

 both replicas both of these VMware machines I think they could be primary by themselves without consulting the other server 

在没有询问其他服务器的情况下，这两个Vmware机器都会认为它们是primary

7.41-7.43

so that's a complete failure

So，这彻底就是一个故障了

7.43-7.51

So with this set up and two servers it seemed like we had this we just had to choose either you wait for both and you're not fault-tolerant 

So，对于这个设定，在这样的情况下要么等两个test-and-set server都做出选择，这样也就不是容错(fault-tolerant)了

7.51-7.55

or you wait for just one and you're not correct 

或者，你就只等来自一个服务器的响应，并且你得到的结果也是不正确的

7.55-7.59

and then our correct version it's often called split brain

而我们自己(client端)会认为结果是正确的(都觉得自己是primary)，这也就是我们经常说的脑裂(split brain)

7.59-8.01

So everybody see this 

So，你们都懂了吗？

8.10-8.14

well, so this was basically where things stood until the late 80s 

Well，这基本上是80年代末前的情况

8.14-8.19

and when people but people did want to build replicated systems 

当人们想去构建replicated系统时

80年代末，当人们想要去构建一个具备可复制能力的系统

8.19-8.22

you know like the computers that control telephone switches

比如能够控制电话交换机的电脑

你知道当时的电脑是那种需要电话交换机控制

系统，像电脑控制

8.22-8.24

or the computers that ran banks 

或者是负责银行业务的计算机

这些计算机运行了银行业务

电话交换机或者

8.24-8.28

you know there was placer when we spend a huge amount of money in order to have reliable service 

为了得到一个可靠的服务，在这个方面我们花费了大量的金钱

8.28-8.31

and so they would replicate they would build replicated systems

为此，他们会去构建replicated系统

8.31-8.37

and the way they would deal then way would that they would have replication but try to rule out of rule out split brain

他们想用replication这种处理方式，试着去排除脑裂这种问题



8.37-8.39

it's a couple of techniques

他们用到了一些技术

8.39-8.42

one is they would build a network 

其中一种方式是，他们搭建了网络环境

8.42-8.44

that could not fail

这个网络并不会发生故障

8.44-8.47

and so usually what that means 

So，通常情况下，这是什么意思呢

8.47-8.50

and in fact you guys use networks that essentially cannot fail all the time 

事实上，意味着你们所使用的网络永远不会挂掉

8.50-9.02

the wires inside your laptop you know connecting the CPU to the DRAM are effectively what you know a network that cannot fail between your CPU and DRAM 

你笔记本电脑内部的CPU和DRAM间的连接是高效的，你知道这个CPU与DRAM之间的通信是不可能失败的

9.02-9.06

so you know with reasonable assumptions and lots of money 

So，在合理的假设与大量金钱的作用下

9.06-9.10

and you know sort of carefully controlled physical situation

So，我们得对硬件状况进行仔细地维护

9.10-9.13

 like you don't want to have a cable snaking across the floor that somebody can step on 

你不会想把一条网线随意的放到地板上，一些人可能会踩到它

9.13-9.17

you know it's got to be carefully physically designed set up 

你得仔细地设计物理排线，避免出现其他类似的硬件问题

9.17-9.20

with a network that cannot fail，you can rule out split brain

在这种不会发生故障的网络中，我们可以排除脑裂（split brain）这种情况

9.20-9.21

it's bit of an assumption 

这只是一种假设

9.21-9.23

but with enough money

但在拥有钞能力的情况下

9.23-9.24

people get quite close to this 

人们就能解决这个问题

9.24-9.26

because if the network cannot fail

因为如果网络不会故障的话

9.26-9.29

that basically means that the client can't talk to a server two

简单来讲，如果Client无法和服务器S2进行通信

9.29-9.31

that means server 2 must be down

这就意味着服务器S2必然挂了

9.31-9.34

because it can't have been the network malfunctioning

因为这不可能是网络故障所引起的

9.34-9.40

So that was one way that people sort of built replication systems it didn't suffer from split brain

So，这就是人们构建这种无须遭受脑裂问题（ split brain）所影响的replication系统的一种方式



9.40-9.46

another possibility would be to have some human beings sort out the problem

另一种可能性就是通过人为手段来解决这个问题

9.46-9.48

that is don't automatically do anything

即不要自动去做任何事情

9.48-9.54

instead have the clients you know by default clients always have to wait for you know both replicas to respond or something

相反，默认情况下，Client端会一直等待两个服务器对其请求进行响应或者做其他一些事情

9.54-9.57

 never allowed to proceed with just one of them 

我们从不允许它们只对其中一个服务器进行处理



9.58-10.02

but you can you know call somebody's beeper to go off some human being goes to the machine room

但我们可以打某人电话，让他去机房看一下

10.02-10.08

and sort of looks at the two replicas and either turns one off to make sure it's definitely dead

看下这两个replica，并关闭其中一个，以此确保它肯定挂了



10.08-10.13

or verifies that one of them has indeed crashed and if the other is alive 

或者验证它们中其中一个确实崩溃了，如果另一个还活着的话

10.13-10.17

and so you're essentially using the human  as the tie-breaker 

也就是说，我们把工作人员当做断路器来使用

10.17-10.23

and the human is a you know if they were a computer it would be a single point of failures themselves

如果它们是计算机的话，它们自身就是一个单点故障（single point of failures ）

10.23-10.25

so for a long time

So，很长一段时间以来

10.25-10.28

people use one of the other these schemes in order to build replicated systems

人们会使用其他scheme来构建replicated系统

10.28-10.31

and it's not you know they can't be made to work 

然而你知道它们不能用来工作

10.31-10.32

the humans don't respond very quickly

人们没办法很迅速的做出反应

10.32-10.35

 and the network that cannot fail is expensive

为了不让网络发生故障，我们所要付出的代价是很昂贵的

10.35-10.38

but it's not not doable

但这并不可行

10.38-10.44

but it turned out that you can actually build automated failover systems

但事实证明，实际上，我们可以构建出自动故障切换系统

10.44-10.49

that can work correctly in the face of flaky networks

在面对不稳定的网络时，它可以正常工作

10.49-10.52

networks that could fail on the can partition

比如遇上那种网络分裂的情况，它也能正常工作


10.52-10.56

so this split of the network in half where the two sides operate they can't talk to each other

So，在这种网络一分为二的情况下，两边都没法互相进行通信

10.56-10.57

that's usually called a partition

这通常被叫做网络分裂

11.03-11.14

and the big insight that people came up with in order to build automated replication systems that don't suffer from split brain is the idea of a majority vote

人们为了构建不受脑裂现象困扰的自动复制系统而想到的重要想法是少数服从多数

11.14-11.25

 this is a concept that shows up in like every other sentence practically in the raft paper 

这是raft那篇论文中所提出的一种概念

11.25-11.30

sort of fundamental way of proceeding

这是某种基本的处理方式

11.30-11.34

the first step is to have an odd number of servers instead of an even number of servers

首先，我们的服务器数量得是奇数，而不是偶数


11.34-11.37

 like one flaw here is that it's a little bit too symmetric

就像这里的缺点一样，有点过于对称了

11.37-11.38

all right



11.38-11.40

the two sides of the split here just they just look the same 

此处被拆分的两侧，看起来就像是一模一样

11.40-11.42

so they run the same software 

So，它们运行相同的软件

11.42-11.43

they're gonna do the same thing 

做一样的事情

11.43-11.43

and that's not good

这并不好

11.43-11.45

but if you have an odd number of servers

但如果你所拥有的服务器数量是奇数的话

11.45-11.49

then it's not symmetric anymore

那么这就不再对称了

11.49-11.50

right 



11.50-11.57

at least a single network split will be presumably two servers on one side and  one server on the other side and they won't be symmetric at all 

至少，在遇上一次网络分裂的情况发生时，我们可以想象得出大致情况是这样，两个服务器在其中一侧，另一台服务器在另一侧，这样它们就不再对称了

11.57-12.03

and that's part of what majority vote majority voting schemes are appealing to

这就是Majority Voting scheme所吸引我们的地方

12.03-12.07

so basic ideas you have an odd number of servers 

So，它的基本思路就是我们的服务器数量得是奇数



12.08-12.12

in order to make progress of any kind，so in raft elect a leader or cause a log entry to be committed 

在raft选举一个leader或者提交日志项

So，为了能取得进展，raft得选出一个leader或者提交一个日志条目

12.12-12.14

in order to make any progress at each step

为了在每一步取得进展

12.14-12.21

you have to assemble a majority of the server's more than half more than half of all the servers 

你必须取得半数服务器以上的支持

12.21-12.27

in order to sort of approve that step, like vote for a leader or accept a new log entry and commit it

为了批准该步骤，我们得选出一个leader，或接受一个新的日志条目的提交

12.27-12.35

so you know the most straightforward way is that have two of three servers required to do anything

So，最简单的方法就是使用三台中的两台服务器来做这个事情（选leader）

2台或3台服务器来做任何事情

12.35-12.41

one reason this works of course is that

这种做法能奏效的其中一个理由是

12.41-12.42

if there's a partition

如果遇上了网络分裂

12.42-12.47

there can't be more than one partition with a majority of the servers in it 

那在分裂的几个分区中，不能有多个分区都拥有半数以上的服务器（有且只能有一个）

12.47-12.48 *********

that's one way to look at this

这是看这个的一种方式

我们通过一种方式来看这个

12.48-12.54

A partition can have one server in it which it's not a majority

在一个分区中，可以有一个服务器在里面，它代表的是少数服务器（即服务器中的很小一部分）

12.54-12.55

or maybe you can have two

或者，在这个区域里面你也可以有两个服务器

12.55-12.59

but if one partition has two, then the other partition has to have only one server in it

但如果一个分区中有两个服务器，另一个分区中必须只有一个服务器

12.59-13.03

 and therefore will never be able to assemble a majority and won't be able to make progress

因此，这样就永远没法取得多数支持，也没法取得任何进展

13.06-13.08

and just to be totally clear 

为了让你们都弄明白

13.08-13.10

when we're talking about a majority 

当我们在讨论majority（大多数）时

13.10-13.14

it's always a majority out of all of the server's not just a live servers

我们指的始终是所有服务器中的大多数服务器，而不是在线服务器中的大多数服务器（知秋注：其实就是如果是三个服务器，一个挂了，另外俩我还是按照三个的模式来投票，比如1 ，2，3,哪怕其中1挂了，2也可以投1一票,3也可以投1一票，我们要做的就是发起一次又一起选举，直到2或3拿到多数票）

13.14-13.17

 this is the point that confused me for a long time

这一点其实也困扰了我很长一段时间

13.17-13.19

but if you have a system with three servers

但如果，你的系统中有3个服务器

13.19-13.20

and maybe some of them have failed or something

它们其中某些服务器跪了，或者发生了其他某些事情

13.20-13.22

if you need to assemble in the majority 

如果你需要得到大多数的支持

13.22-13.23

it's always two out of three

那么，在3台服务器的情况下，你始终需要得到2台服务器的支持

13.23-13.25

 even if you know that one has failed 

即使你知道其中一台服务器挂了

13.25-13.28

the majority is always out of the total number of servers

但活着的服务器依然占了服务器总数的主要部分

13.28-13.31

 there's a more general formulation of this

对此，这有一个更加通用的公式能表达这一点


13.32-13.39

because a majority voting system in which two out of three are required to make progress it can survive the failure of one server

因为Majority Voting System只有在3票中取得2票的情况下才能取得进展，它能在遇上一个服务器挂掉的情况下，继续使用

13.39-13.41

right



13.41-13.44

any two servers are enough to make progress？

通过任意两台服务器就能继续进行下去么？

13.44-13.48

 if you need to be able to if you're you know you worried about how reliable your servers are

如果你们担心你的服务器的可靠性的话

13.48-13.52

or then you can build systems that have more servers

那么可以去构建一个使用更多服务器的系统

13.52-13.54

and so the more general formulation is

比较通用的公式是


13.54-13.58

if you have two f + 1 servers 

如果你有2f+1个服务器

13.58-14.06

then you can withstand f failures

那么你就可以承受f次故障

14.06- 14.07

you know so if it's three

So，如果它是3

14.07-14.08

that means F is one

那么这就意味着f是1

14.08-14.10

 and the system with three servers

这个系统使用了3台服务器

14.10-14.15

 you can tolerate F servers step one failure and still keep going

你可以容忍在1台服务器发生故障的情况下，该系统能够继续运行



意味着F是1，三个服务器

组成的这个系统你能容忍F个服务器

就是一个出错，仍能继续运行





14.18-14.21

all right 



14.21-14.23

often these are called quorum systems

通常，它们被叫做Quorum系统

14.23-14.27

 because the two out of three is sometimes held a quorum

三分之二的服务器有时会持有一个quorum

14.27-14.28

 okay 



14.28-14.33

so one property I've already mentioned about these majority voting systems is that

so 关于majority voting system，我已经提及的一个属性就是

14.33-14.37

 at most one partition can have a majority

最多只有一个分区是majority(多数)

14.37-14.39

 and therefore if the networks partitioned

所以如果网络被分裂

14.39-14.42

 we can't have both halves of the network making progress

我们不能让两个分裂的网络都能继续运作

14.42-14.44

 another more subtle thing that's going on here is that 

另一个比较微妙的事情是

14.44-14.51

if you always need a majority of the servers to proceed 

如果你始终需要在取得大多数服务器同意的情况下，去处理某事

14.51-14.55

and you go through a sort of succession of operations

你要经历一系列操作

14.55-14.57

 in which each operations somebody assembled a majority

在每一次操作中，有人取得了多数支持

14.57-15.02

like you know votes for leaders or let's say votes for leaders survived

比如给leader投票，或者说给存活的leader投票

15.02-15.05

 then at every step

然后，在每一步中

15.05-15.16

 the majority you assemble for that step must contain at least one server that was in the previous majority that is any two majorities overlap in at least one server

这个所谓的大多数，其实就是过半。两次大多数里面至少有一台服务器是两个term中共有的，也就是重叠的（知秋注：假如有三台服务器，大多数就是两台服务器，前后两次term选举的大多数中最少一台服务器是重叠的，如果是4台服务器，没有重叠的话，那就是2对2，如果是大多数的话，就是1:3，前后两次中的大多数，最少有一个服务器是重叠的）

15.16-15.25

 and it's really that property more than anything else that raft is relying on to avoid split brain

比起其他东西而言，raft更加依赖这个属性，以此来避免脑裂问题（split brain）

15.25-15.27

it's the fact that for example

例如

15.27-15.31

when you have a leader a successful leader election and leader assembles votes from a majority

当你成功选出了一个leader，该leader取得了多数投票

15.31-15.35

 its majority is guaranteed to overlap with the previous leader's majority 

这个多数就是投票总数过半（知秋注：体现就是上一个leader所获得的选票也有部分来自这次的投票服务器）

15.35-15.36

and so for example

So，例如

15.36-15.41

the new leader is guaranteed to know about the term number used by the previous leader

我们要保证新的leader能够知道前一个leader所使用的term号

15.41-15.45

because it's a majority overlaps with the previous leaders majority

因为两次选举中的majority（绝大多数）总会有重叠的服务器

15.45-15.50

and everybody in the previous leaders majority knew about the previous leaders term number

所有前一次选举中的majority中的每个服务器都知道前一次leader所代表的的term号

15.50-15.58

similarly anything the previous leader could have committed must be present in a majority of the servers in raft 

类似的，在Raft中，上一次majority中的服务器它们接受了上一次leader所提交的内容（分隔区域的另一侧并不一定会接收到上一次leader所提交的内容）

15.58-16.05

and therefore any new leader's majority must overlap at at least one server with every committed entry from the previous leader

因此，我们就可以以这个重叠的服务器为切入点来做一个新leader的选举

16.05-16.11

this is a big part of why it is that raft is correct

这就是raft为什么是正确的重要原因



16.11-16.21

any questions about the general concept of majority voting systems

有问题么？关于majority voting systems的概念

16.21-16.22

yeah

请问

16.22-

these muscle ad servers

可以添加服务器么？

16.31-16.40

it's possible in the section something maybe six in the paper explains how to add it or change the set of servers

可能在论文的第六部分，解释了如何添加服务器 或者 集群成员变更

16.40-16.43

and it's possible

这是可能的

16.43-16.45

you need to do it in a long-running system

你需要在一个长时间运行的系统中做这件事

16.45-16.48

if you're running your system for five ten years 

如果你运行你的系统5年，甚至10年

16.48-16.51

you know you're gonna need to replace the servers after a while

过段时间，你就得需要去更换服务器了

16.51-16.53

 you know one of them fails permanently

比如，其中某台服务器永久性地跪了

16.53-16.55

or you upgrade

或者，你对服务器进行了升级

16.55-16.57

 or you move machine rooms to a different machine room

或者，你将机房搬到了另一个机房

16.57-17.00

you really do need to be able to support changing sets of servers

你真正需要做的就是能够支持改变后的机组

17.00-17.02

so that's a it certainly doesn't happen every day

事实上，这种事情并不会每天发生

17.02-17.06

but it's a critical part of this or a long-term maintainability of these systems

但这就是对这些长期运行的系统进行维护的关键之处

17.06-17.14

 and you know the raft offers sort of pattern themselves on the back that they have a scheme that deals with this which as well they might 

raft在背后提供了某种方式，它们通过一种scheme来尽可能地处理这种问题

17.14-17.15

because it's complex

因为它很复杂

17.15-17.21

all right 



17.21-17.29

so using this idea in about 1990, also there were two systems proposed at about the same time 

大约在1990年，有两个系统在同一时间提出了它们让这个想法落地了

So，有人在1990年就将这个想法落地，也就是说有两个系统同一时间对它进行了使用

17.29-17.44

that realized that you could use this majority voting system to kind of get around the apparent impossibility of avoiding split brain by using basically by using three servers instead of two and taking majority votes 

你可以使用majority voting system，通过是用3个服务器取代2个服务器，发起majority votes来绕过不可避免的脑裂问题




17.44-17.49

and in one of these very early systems was called Paxos

其中一个比较早的系统，它的名字叫PAXOS

17.49-17.52

 the raft paper talks about this a lot 

在Raft那批论文中，对此谈论了许多

17.52-17.58

and another of these very early systems was called view stamp replication

还有另一个非常古老的系统，它叫做viewstamp replication（VSR）

17.58-18.01

abbreviation is VSR for view stamp replication 

它的缩写为 VSR

18.01-18.07

and even though Paxos is by far the more widely known system in this department

尽管在这个领域，PAXOS要远比VSR更广为人知



18.07-18.12

 raft is actually closer to design in design to view stamp replication

实际上，在设计上，raft更接近于这种VSR（view stamp replication）

18.12-18.15

which was invented by people at MIT

这是由MIT的人所发明的



viewstamp算法这个是MIT人发明的。

下面是老师抒发怨念。。。

18.15-18.21

 and so there's a sort of a long many decade history of these systems 

So，这里还有很多历史悠久的系统

18.21-18.30 ********************

and they only really came to the forefront and started being used a lot in deployed big distributed systems about 15 years ago

直到15年前，它们才真正走到最前沿并开始在已部署的大型分布式系统中大量使用

18.30-18.33

a good 15 years after they were originally invented 

对它们来说，这是自它们被发明出来后的黄金15年

18.33-18.37

okay 

##################################################################

18.37-18.40

so let me talk about Raft now

现在让我们谈谈raft

18.40-18.50

Raft is a takes the form of a library intended to be included in some service application 

Raft以一个库的形式被包含在某些服务应用程序中

18.50-18.52

so if you have a replicated service

So，如果你有一个replicated服务

18.52-19.00 ！！！！

that each of the replicas in the service is gonna be some application code which you know receives rpcs or something plus a raft library

在该服务中的每个replicas （副本）可以通过一个 raft 库再加点代码来接收RPC之类的请求

19.00-19.06

 and the raft libraries cooperate with each other to maintain replication

raft库彼此之间会进行合作，以此来维护replication

19.06-19.16

so sort of software overview of a single raft replica is that at the top we can think of the replicas having the application code 

对于一个单个的raft replica 软件，我们大致来思考下这个replica 所应具备的应用程序代码




19.17-19.20

so it might be for lab 3 a key-value server 

So，在lab 3中，我们可能会有一个key/value服务器



19.20-19.23

so maybe we have some key value server 

So，我们可能会有某种key/value服务器

19.23-19.29

and in a state the application has state that raft is helping it manage replicated state

应用程序会拥有某种state，raft则会帮助它管理replicated state



在应用程序中会有一个用raft 来帮助管理的replicated state

19.29-19.30

and for a key value server

对于一个key/value服务器来说


19.30-19.32

 it's going to be a table of keys and values

它里面会有一张key/value表

19.32-19.42

 the next layer down is a raft layer 

接下来，下面一层是raft层

19.42-19.48

so the key value server is gonna sort of make function calls into raft 

So，key/value服务器会在raft中进行函数调用

19.48-19.52

and they're gonna chitchat back and forth a little bit and raft keeps a little bit of state

它们会反复进行通信，通过raft 来保持state（状态）

19.50-



raft会保存一些state


19.52-19.54

you can see it in Figure 2 

在Figure 2中我们可以看到

19.54-20.01

and for our purposes really the most critical piece of state is that raft has a log of operations 

出于我们的目的，state中最关键的一部分就是，raft会保存一份关于操作的日志



一百二十七  阅举报
6-02
20.05-20.14

and a system with 3 replicas will  actually gonna have you know 3 servers that have exactly the same identical structure

有着三个replicas （副本）的系统，实际上这三个副本是有着完全相同结构的服务器

你知道的是三个有着完全相同结构的服务器

一个有着三个副本的系统，实际上指的是使用三台结构上完全一样的服务器


20.14-20.21

and hopefully the very same data sitting at both layers

期望数据都能在协议层和应用层保持一致

我们希望三个replicas（副本）在这两个层面所拥有的数据都是几乎一模一样的

20.21-20.34

right 


20.34-20.36

outside of this，there's gonna be clients 

集群系统外是客户端

除此以外，我们要说的就是Client端


20.36-20.41

and the game is that so we have you know client 1 and client two whole bunch of clients

游戏是这样的，假设我们有两个Client，即Client 1和2

20.41-20.48 ！！！！

 the clients don't really know the clients are you know just external code that needs to be able to use the service

客户端并不了解key-value 服务所引用的外部代码（raft library）

所谓的Client端，实际上指的就是需要能够使用该服务的外部代码（知秋注：该服务为我们平常的对外提供的表面业务服务，比如天气服务等）

20.48-20.53

 and the hope is the clients won't really need to be aware that they're talking to a replicated service 

我们希望这些Client意识不到它们是和一个有着replicated服务的服务器进行的通信（知秋注：即客户端与通过有着replicated服务的多台服务器组成的一个整体进行通信）

20.53-20.57

that to the clients that are looking almost like it's just one server and they talked with one server

对于Client端来说，这看起来就像是和一台服务器进行通信


20.59-21.09

and so the clients actually send client requests to the key to the application layer of the current leader， the replica that's the current leader in raft 

客户端发送一个处理key的请求给应用层，也就是当前副本的Leader，Raft的Leader

Client端实际上将请求发送给当前leader所在的应用层，即发送给raft中作为当前leader的那个副本（replica）



21.09-21.19

and so these are gonna be you know application level requests for a database for a key value server these might be putting get requests you know

你要知道的是对于一个数据库一个key-value服务，应用层面的需求可能是put或get请求，

So，这些可能是属于应用层面的请求，比如针对基于数据库或者是key/value服务器所发出的put或get请求

21.19-21.23

put takes a key and a value and updates the table 

通过put请求将一个key-value更新到表中


21.23-21.34

and get asked the service to get the current key current value corresponding to some key

通过get请求让服务去取得当前key所对应的value

21.34-21.36

so this like has nothing about to do with raft

So，这看起来我们所做之事和raft没啥关系

无须对raft做任何事情

21.36-21.39

 it's just sort of client-server interaction for whatever service we're building 

不管我们构建的服务是什么，这看起来只是客户端和服务器端之间的交互

21.39-21.46

but once one of these commands gets sent from the requests get sent from the clients to the server 

一旦这些命令之一从客户端请求发送到服务端

一旦这些请求从客户端发送到服务端

21.46-21.48

what actually happens is 

实际上所发生的事是

21.48-21.50

you know on a non replicated server

在一个非副本（non-replicated）服务器上

在一个没有复制服务（non-replicated）服务器上

21.50-21.53

the application code would like execute this request 

应用程序代码会去执行put这个请求

21.53-21.55

and say update the table and response to a put

更新这张表上的内容，并对这个put请求进行响应

21.55-21.58

but not in a raft replicated service

但这并不是在raft的副本（replicated）服务中进行的

但这个过程并没有复制（replicated）服务的存在

21.58-22.01

instead if assuming the client sends a request to leader

那存在该服务的话，如果假设Client端将一个请求发送给leader

22.01-22.09

what really happens is the application layer simply sends the request the clients request down into the raft layer

这里所要发生的事情就是，应用层会直接把Client端的请求下发给raft层

22.09-22.10

to say look you know here's a request

并对它说，这里有一个请求

22.10-22.16

please get it committed into the replicated log and tell me when you're done

请将它提交到replicated log里面，当你完成的时侯，请告诉我你做完了

22.16-22.17

 and so at this point

So，在此时


22.17-22.29 ！！

the rafts chitchat with each other until all the replicas are a majority the replicas get this new operation into their logs 

Raft会和每个副本进行通信，直到所有的副本中有半数以上的副本把这个新的操作添加到其日志中

22.29-22.30

said it is replicated

并表示，它已经复制完毕

22.30-22.35

and then when its leader knows that all of the replicas of a copy of this

那么Raft的Leader就知道所有已完成日志记录的副本

22.35-22.41

only then as a raft sent a notification up back up to the key/value they are saying 

只有在这个前提下，Raft 层会发送回key-value应用层一个通知

22.41-22.44

aha that operation you sent me I mean it go

嗨，你发给我操作，我已经做好日志记录了

22.44-22.47

it's been now committed into all the replicas 

它现在已经提交到所有的副本中了

22.47-22.49

and so it's safely replicated

所以它已经被安全的复制了

22.49-22.53

and at this point it's okay to execute that operation

这时应用层就可以执行这个（已记录日志的）操作了

22.53-22.58

So raft you know the client sends a request with the key value layer

Raft你知道，客户端发送请求给key-value层

22.58-23.00

key value layer does not execute it yet 

key-value层还没有执行请求

23.00-23.02

so we're not sure 

我们不确定

23.02-23.03

because it hasn't been replicated

因为这个请求没有被复制

23.03-23.08

only when it's in out and the logs of all the replicas

仅当这个请求都记录在所有副本的日志上时

23.08-23.12

then raft notifies the leader 

然后，raft会通知 leader

23.12-23.18

now the leader actually execute the operation which corresponds to you know for a put updating key value table yet

这时这个leader才会真正执行这个put请求，以此更新key-value表

更新key-value表的put命令

23.18-23.21

for a get, reading correct value out of the table 

或是这个读取key-value表的get命令

通过一个get请求来读取表中正确的数据

23.21-23.25

and then finally sends the reply back to the client 

最终发送返回结果给客户端

23.25-23.29

so that's the ordinary operation of it

以上就是一次普通的操作

以上就是一次普通操作所要经历的细节

23.29-23.36

if it's in a majority 



23.36-23.39

it's community with a majority and again the reason why I can't be all is that

当我在一个majority（少数服从多数）的社区里，一言堂是行不通的。

23.39-23.40

 if we want to build a fault-tolerant system

如果我们想去构建一个具备容错能力（fault-tolerant）的系统

23.40-23.44

it has to be able to make progress，even if some of the server's have failed 

即使某些服务器已经挂了，它也必须能够继续运行下去

23.44-23.52

so yeah so ever it's committed when it's in a majority

像黑板上所示，大多数副本都记录日志后，日志状态才能变为提交状态

24.09-24.11

yeah

忘讲数据提交了？ 抱歉

请问

24.11-24.14

in addition when operations finally committed

此外，当操作最终提交时

24.14-24.23

each of the replicas sends the operation up each of the raft library layer sends the operation up to the local application layer

每个副本（replica）会让raft层将操作向上发送给本地的应用层（知秋注：Java程序员思考下拦截器或者AOP即可，在执行真正的业务前，做一些切入处理，比如记录日志什么的，然后raft会有另一个线程服务来读取这些日志，并进行其他raft相关操作，比如可以在nginx后，raft拿到请求并落地日志，然后执行请求操作，primary会有一条线程读取并分发给其他backup，backup会有一条线程读取追加同步的日志并执行请求）

24.23-24.25

in the local application layer applies that operation to its state its state 

并在本地应用层执行该（业务）操作（知秋注：raft中所记录的state其实就是我们提交的这个业务操作，或者就是它的数据，比如redis里面的RDB，做的落地就是备份的它管理的数据）

24.25-24.31

and so they all so hopefully all the replicas seem the same stream of operations

So，我们希望所有的replica都能看到相同的操作流（知秋注：各个副本执行的都是一系列相同的操作，以保证备份效果）

24.31-24.37

 they show up in these upcalls in the same order, they get applied to the state in the same order 

它们以相同的顺序接收到这些操作，即它们接受到的state 的顺序是相同的（知秋注：再次强调，我们提交的这些业务操作，就是raft中讲的state）

并以相同的顺序改变它们的state

24.37-24.41

and you know assuming the operations are deterministic

假设这些操作都是确定性的

24.41-24.42

which they better be

我们也希望它们最好是这样

24.42-24.50

the state of the replicas replicated State will evolve in identically on all the replicas 

这些replicated state都会以相同的方式进行修改

即在所有这些replicas上，大家执行的State 最好都是一样的


24.50-24.57

so typically, this table is what the paper is talking about  when it talks about state

So，通常情况下，当paper讨论state的时候，指的就是在对这个表进行操作

24.57-25.04  ！！！！！！！！

 a different way of viewing this interaction

另一种看待这种交互的方式是

我们换一种方式来看这个交互过程

25.04-25.08

 and one that'll sort of notation that will come up a lot in this course is that

在本课程中会多次出现的一种概念是

25.08-25.12

 a sort of time diagram I'll draw you a time diagram of how the messages work

我将给你们画一种基于时间线的任务执行图来表示消息是如何传递工作的

25.12-25.18

 so let's imagine we have a client and server one is the leader

So，想象一下这样一个场景，我们有一个Client和服务器1，并且服务器1是leader


25.18-25.21

That we also have server 2, server 3

接着，我们还有服务器2和服务器3

25.21-25.25

and time flows downward on this diagram

在图中流程时间线用向下斜线表示


25.25-25.30

we imagine the client sending the original request to server one

想象一下，Client发送一个原始请求给服务器1

25.30-25.41

after that, server one's raft layer sends an append entries RPC to each of the two replicas 

随后服务器1的Raft层会发送一个AppendEntries （添加日志条目）RPC 请求给另外两个副本


25.41-25.45

this is just an ordinary I'll say a put request

这是一个普通的put请求

25.45-25.48

this is append entries requests

这是AppendEntries（添加日志条目）请求

25.48-25.52

the server is now waiting for replies

服务器现在正在等待回复

25.52-26.00

and the server's from other replicas as soon as replies from a majority arrive back including the leader itself 

等待其他副本和自己的Append Entries请求响应，等待一个majority的响应结果

一旦其他副本（replica）收到了来自majority（其中包括leader自身）的回复

这个S1(leader)会等待其他副本和自己的Append Entries请求结果响应（只要有绝大多数服务器响应即可，即majority响应）


26.00-26.12

so in a system with only three replicas because the leader only has to wait for one other replica to respond positively to an append entries as soon as it assembles positive responses from a majority 

所以在这个只有3个副本的系统里面，Leader服务器只需要等待1个副本的Append Entries响应算上自己的就能符合majority这个要求了


26.12-26.21

the leader execute a command figures out what the answer is like for get

leader会通过执行一条命令来弄清楚对于这个get请求，它该返回什么信息

leader会执行客户端的请求命令，得到Get/Put的执行结果


26.21-26.25

and sends the reply back to the client

然后将回复发送给Client端

26.25-26.31

I mean why of course you know if S3 who's actually alive it'll send back its response too

当然，S3如果实际上也在线的话，它会发送响应给S1

26.31-26.33

 but we're not waiting for it although 

但是，我们无须等待它的返回结果 （因为我们已经有majority结果了）

26.33-26.37

it's useful to know for figure 2

这个图对于知识的认识和理解很有用

这对于理解Figure 2来说非常有用


26.37-26.46

all right everybody see this is the sort of ordinary operation of the system no no failures here

大家看到的这个就是系统在没有异常情况下，所执行一串的普通操作

26.46-26.56

oh gosh yeah I like I left out important steps 

Oh，抱歉，我省略了重要的步骤

26.56-27.03

so you know this point the leader knows oh I got you know I'm majority if have put it in no log I can go ahead and execute it and reply yes to the client

在这个点，Leader就知道大多数副本已经把请求添加到日志中了，我可以继续做下面的事情，即执行来自客户端（c1）的请求并将结果响应给c1了

27.03-27.04

because it's committed 

因为已经提交了日志


27.04-27.06

but server two doesn't know anything yet

但是服务器2对此一无所知

27.06-27.09

it just knows well you know I got this request from the leader

它只知道它从leader那里拿到了请求

27.09-27.10

but I don't know if it's committed yet

但是不知道它（s2）的state（请求操作）是否已经被提交

27.10-27.16

depends on for example whether my reply got back to the leader for all， server to two knows its reply was dropped by the network

在这个例子里面，S2知道它通过网络是否回复响应给Leader了

例如，不管我是否收到了来自leader的回复，但因为网络丢包，服务器2知道它并没有接收到回复

例如，S2已经发送了响应给leader，但响应在网络传输中丢失了

27.16-27.19

 maybe the leader never heard the reply and never decided to commit this request 

Leader可能没有接收到回复，也就没有提交这次请求。

leader可能从未收到这个响应，也从未决定要提交这个请求

leader可能从未收到这个响应，也就根本不知道s2提交了这个请求


27.19-27.22

so there's actually another stage

So，实际上，这里有另一个阶段

27.22-27.28

once the server realizes that a request is committed

一旦Leader Server意识到一个请求被提交了(log state为已提交）

27.28-27.32

then needs to tell the other replicas that fact

然后，这就需要告诉其他副本（replica）这个事实



27.32-27.40

 and so there's an extra message here 

So，这里就会有一条额外的消息

27.40-27.44

exactly what that message is depends a little bit on what else is going on

这个额外的消息到底是怎么样子的，还要取决于其他条件

27.44-27.50

it's at least in raft there's not an explicit commit message

在Raft中 没有一个明确的提交报文

27.50-27.59

instead the information is piggybacked inside the next append entries that leader sends out

the next append entries RPC it sends out  for whatever reason

而是把这个信息装载在Leader发出来的下一个AppendEntries RPC请求中

27.59-28.03 （这句英文有问题）

 like there's a commit leader commit something filled in that RPC

信息以表格形式或者其它形式添加到这个append entries RPC 中

在append entries RPC中保存了一些诸如leaderCommit的标识信息

比如，leader会将某些信息放在该RPC请求中


28.03-28.11

and the next time the leader needs have to send a heartbeat or needs to send out a new client request

下个时间点leader需要发送一个心跳或发出一个新的客户端请求



28.11-28.18

because some different client requests or something it'll send out, the new higher leader commit value 

所以一些新的客户端请求或者其他诸如新的Leader竞选成功后提交的信息

因为Leader状态发生变化时（包括Leader的更替，日志状态更新等等），需要发送给replicas一些必要信息，如最新的leaderCommit，或做选举操作等



28.18-28.19

and at that point

此时


28.19-28.26

the replicas will execute the operation and apply it to their state

这些副本（replica）就会执行该操作，并修改它们的状态

28.26-28.28

yes

请问

28.38-28.45

oh yes so this is a protocol that has a quite a bit of chitchat in it

是的，这个协议下会有一定量的通信进行交互

28.45-28.49

and it's not super fast

这个协议下，响应不是秒回

28.49-28.52

indeed you know yeah client sends in request

如你所知那样，客户端发送请求

28.52-28.54

request has to get to the server 

请求必须到达服务器

28.54-29.00

the server talks to at least you know another instance that multiple messages has to wait for the responses send something back

服务器最少要与另一个服务实例进行通信，这些消息请求要等待响应发送回来

29.00-29.03

so there's a bunch of message round-trip times kind of embedded here

所以raft这个协议内含了很多条消息等待的时间（知秋注：用于每个rpc请求的超时机制）



29.11-29.16

yes if so this is up to you as the implementer actually exactly 

（学生提的啥问题？序列号的生成？信息的装载形式？）这个取决于你的实际实现

29.16-29.22

when the leader sends out the updated commit index

当leader发送更新后的commitIndex后



29.22-29.27

If client requests a comeback only very occasionally 

如果客户端只是偶尔发送一次请求

请求不是很频繁



29.27-29.34

then you know the leader may want to send out a heartbeat or send out a special append entries message

那么，leader会发送一个心跳或者发送一个特殊的append entries消息



29.34-29.38

if client requests come quite frequently 

如果客户端请求十分频繁



29.38-29.39

then it doesn't matter

那也没啥大不了的 



29.39-29.41

because if they come you know there's thousand arrive per second 

如果每秒进来数以千计的请求

29.41-29.43

and Jesus so it'll belong longer soon 

oh，上帝，那这就得花很长时间了

29.43-29.45

and so you can piggyback

So，我们将它们放在一个请求里面

29.45-29.47

so without generating an extra message which is somewhat expensive 

这样就不会生成其他消息，消息来回传输是贵的，造成资源浪费，一个Append Entries就搞定了

29.47-29.51

you can get the information out on the next message you were gonna send anyway

总之你能在下一消息中得到你所需要的信息

29.50-30.00

 in fact I don't think the time at which the replicas execute the request is critical 

实际上，我不认为副本（备机）提交请求的时间点有啥重要的。（只关注leader就可以了）

（append entries 内容，和majority能保证数据一致性，（其实数据可能会丢））

30.01-30.05

because nobody's waiting for it at least if there's no failures

如果没有错误，没人会等它响应

因为没有人会等它（指副本）响应，至少在没有故障发生的情况下是这样

30.06-30.12

If there's no failures, replicas executing the request isn't really on the critical path 

如果没有错误发生，副本执行请求，这个操作这并不是关键路径

如果没有故障发生，副本（replica）所执行的请求的结果并不会出现在关键路径上（例如，在vmware ft中，backup会伪造一个已经完成的假象告诉primary）

30.12-30.15

like the client isn't waiting for them the client saw me waiting for the leader to execute

就像客户端也不会操心这些服务器内部实现，等待这个leader执行了什么命令

这些Client端并不会等待副本（replica）对它们进行响应，而是去等待leader执行完它们的请求后对它们进行响应



30.16-30.26

so it may not be that  it may not affect client perceived latency sort of exactly how this gets staged

S3做的事儿，客户端是无视的，所以感受不到它的延时



30.37-30.45

all right one question you should ask is

这个问题你们应该问一下

其中一个你们应该问的问题是

30.45-30.52

why is the system so focused on logs ？what are the logs doing？

为什么系统如此关注日志，日志它做了什么事情

30.52-30.56

and it's sort of worth trying to come up with an explicit answers to that 

试着找出这个问题的答案是有价值的

30.57-31.01

one answer to why the system is totally focused on logs is that 

对于系统为什么专注于日志的问题，答案是

31:02-31:07

the log is the kind of mechanism by which the leader orders operations

日志是leader下达命令的一种机制

这个日志是一种机制，记录了leader按顺序所执行的操作

31:07-31:09

it's vital for these replicated state machines that

日志对于已经复制状态的机器是至关重要的

日志对于这些replicated state machine来说是至关重要的

31.10-31.15

all the replicas apply not just the same client operations to their start

所有的副本不但提交了相同客户端的操作

31.15-31.17

but the same operations in the same order 

而且连执行操作的顺序也都是一样的

31.18-31.22

but they all have to apply that these operations coming from the clients in the same order

这些副本都以相同的顺序提交来自客户端的操作

31.22-31.32

and the log among many other things is part of the machinery by which the leader assigns an order to the incoming client operations I give

日志以及其他许多东西只是该机制的一部分，通过leader来指定由Client端传入的操作的顺序



31.32-31.35

you know ten clients send operations to the leader at the same time

10个客户端同时发送操作指令给leader

比如，有10个Client端同时发送操作给leader

31.36-31.39

the leader has to pick an order make sure everybody all the replicas obey that order

leader 要确保 所有副本都执行了命令对应的Append Entries 操作

leader必须制定出某种顺序，以确保所有副本（replica）都是按照该顺序执行操作

31.40-31.48

 and the log is you know the fact that the log has numbered slots as part of half a leader expresses the order it's chosen

log实际上就是有数字标识的slot一部分是表示命令的顺序

日志会对执行的指令顺序进行标序，以此来表示leader所选择执行指令的顺序

31.50-31.54

another use of the log is that 

日志的另一种用途是


31.54-31.58

between this point and this point

另一个用处是在S3的这两个时间点

在S3的这里和那里

31.58-32.02

server 3 has received an operation that it is not yet sure is committed

服务器3接收到一个操作，它并不确定该操作是否已经被提交了

32.02*-32.04

and it cannot execute it yet 

服务器3还不能去执行该操作

32.04-32.07

it has to put the this operation aside somewhere 

S3 接收到一个操作，这个操作是否提交，是否能执行。都是不确定的，服务器3不得不把这次操作先放到某个地方

32.07- 32.11

until the increment to the leader commit value comes in

直到接收到leader 提交的新的状态值




32.11-32.14 ！！！！！！！

and so another thing that the log is doing is 

日志的另一个 用处就是为了followers

日志所做的另一件事情就是

32.14-32.19

that on the followers the log is the place where the follower sort of sets aside operations that are still tentative 

可以让follower 把一些待定的操作放到log上

在follower处，follower会将那些待定的操作放在日志中

32.19 - 32.21

that have arrived but are not yet known to be committed 

虽然我们(follower)已经收到了这些操作，但我们并不知道它们是否已经被提交了

32.22 - 32.23

and they may have to be thrown away as we'll see

我们将看到，log可能会被丢弃掉

这些操作可能会被丢弃，这种情况我们之后会看到

32.23-32.25

 so that's another use 

这就是log 的 另一个 用处

So，这就是日志的另一种用处

32.25-32.29

I'm the I sort of do love that use on the leader side

在leader视角上看log是很有用的

从leader的角度来看下，日志的作用有哪些呢

32.29-32.34

is that the leader needs to remember operations in its log

leader需要记录操作在他本地日志里

leader需要记住在它的日志中的那些操作

leader需要将他的操作记录在日志中。

32.35-32.38

 because it may need to retransmit them to followers

因为leader可能需要转发log给follower

因为leader可能需要将这些操作转发给follower

32.38-32.43

 if some followers offline, maybe it's something briefly happened to its network action or something misses some messages

如果某些follower处于离线状态，可能是因为网络操作造成短暂失联或者丢失了一些信息

32.44-32.48

the leader needs to be able to resend log messages that any followers missed

leader 需要重新发送给followers漏接的日志信息

leader需要能够将这些被任意follower所错过的日志消息重新发送给它们

32.49-32.53

and so the leader needs a place where can set aside copies of messages of client requests 

因此leader需要一个保存客户端请求信息副本的地方


32.54-32.56

even ones that it's already executed

即使这些请求已经被执行过了

32.56-32.58

 in order to be able to resend them to the client 

为了能够将这些操作重新发送给Client端，所以我们需要这样的地方来保存这些请求信息的副本

32.59-33.04

I mean we resend them to replicas that missed that operation

我的意思是，我们会将这些副本（replica）所错过的操作重新发送给副本（replica）

33.04-33.06

and a final reason for all of them to keep the log is that 

对于它们来说，保存日志的最后一个理由是

33.07-33.09

at least in the world of figure 2

至少在Figure 2中

33.09-33.14

 if a server crashes and restarts and wants to rejoin

如果一台服务器挂掉了，然后重启，并且它想要重新加入的话

33.15-33.21

and you really need if it you really want a server that crashes，in fact restart and rejoin the raft cluster

你真的想要把一个挂掉的服务器重新启动，并加入到raft集群中

33.21-33.24

otherwise you're now operating with only two out of three servers 

否则，你现在就只能操作三台服务器中的两台

33.24-33.26

and you can't survive any more failures

服务器就再也容不得半点错误了

33.26-33.29

we need to reincorporate failed and rebooted servers 

我们需要再次启用 已经出错并重新启动的 服务器

我们需要将之前挂掉且已经重新启动的服务器再次加入到这个raft集群中

33.30 -33.35

and the log is sort of where or what a server rebooted server uses the log persisted to its disk

重启的服务器的本地日志中保存了一份它跪之前的数据运行状态信息

重启后的服务器会使用它之前保存在它的磁盘中的日志

33.35-33.38

 because one of the rules is that

因为其中一条规则是这样的

33.38-33.44

 each raft server needs to write its log to its disk where it will still be after it crashes and restarts

因为每个raft服务器都需要把日志写入到本地磁盘，在它崩溃和重启后仍能访问

每个raft服务器都需要将它的日志写入到它的磁盘上，当该服务器其挂掉并重启后，也依然要这么做

33.44-33.52

that log is what the server uses or replays the operations in that log from the beginning to sort of create its state as of when it crashed 

重新启动后的服务器可以将日志中记录的操作从头开始全部重新执行一遍，直到到该服务器崩溃前的记录位置，以此来创建该服务器的状态

33.52-33.53

and then it carries on from there 

然后服务器会从那里开始继续执行任务

33.53 - 33.56

so the log is also used as part of the persistence plan

So，日志也被用于持久化这一方面

33.57 - 34.00

 as a sequence of commands to rebuild the state

通过一系列命令序列来重建状态

34.00-34.00

Yes.

请问

34.16 - 34.20

well ultimately okay so the question is

So，他的问题是



34.20 - 34.25

suppose the leader is capable of executing a thousand client commands a second

假设，leader能够每秒钟执行1000个Client端的命令

34.26 - 34.29

 and the followers are only capable of executing a hundred client commands per second 

然而，follower每秒只能执行100个Client端的命令

34.29 -34.32

that's sort of sustained rate you know full speed 

这是它们全速处理下的能力

34.34- 34.41

so one thing to note is that the 

我们要注意的其中一件事情是

34.41 - 34.45

the replicas the followers acknowledge commands before they execute them 

这些follower会在执行命令之前，先确认命令

34.45- 34.49

so they mate rate at which they acknowledge and accumulate stuff in their logs is not limited 

So，我们并不对它们在日志中所确认并累计的操作数量进行限制

34.49 - 34.52

so you know maybe they can acknowledge that a thousand requests per second

So，它们可以每秒钟确认1000个请求

34.52 - 34.55

 if they do that forever

如果它们永远这样做下去

34.55-34.58

 then they will build up unbounded size logs

那么，它们就会创建出大小无上限的日志文件

34.57 - 35.07

because their execution rate falls it will fall on an unbounded amount behind the rate at which the leader has given the messages sort of under the rules of our game

因为根据我们的游戏规则，follower的执行速度无限落后于leader给出消息的速度

35.07 - 35.11

and so what that means they will eventually run out of memory at some point 

So，这就意味着，在某些时候它们会耗尽自己服务器上的内存

35.12 - 35.16

so after they have a billion after they fall a billion log entries behind those

So，当follower落后于leader十亿条命令后

35.16 -35.20

just like they'll call the memory allocator for space for a new log entry and it will fail 

它们就会调用内存分配器来分配新的空间，以此容纳新的日志条目，但它会失败

35.22 - 35.30

so yeah and Raft doesn't have the flow controls  that's required to cope with this

So，raft并不具备解决该问题所需的流程控制能力



35.30-35.38

 so I think in a real system you would actually need  you know probably piggybacked and doesn't need to be real-time 

在实际系统中，实际上你的提交命令可能携带在下一次日志追加请求中，并不需要实时（提交执行）


35.39 - 35:44

but you probably need some kind of additional communication here

但你们在这里可能需要某些额外的通信

35.44 - 35.46

that says well here's how far I've gotten in execution 

以此来表示，这里是我目前的执行进度

 35.47 -  35.48

so that the leader can say 

So，leader就会这样说

35.48-35.54

well you know too many thousands of requests ahead of the point in which the followers have executed 

Well，我比follower所执行的进度要领先数千个请求

35.54 - 36.00

 yes I think there's probably you know in a production system that you're trying to push to the absolute max 

作为一个生产-消费模式，生产速度远远大于消费速度，这可能会引发存储生产元素的容器溢出

36.00-36.06

you might well need an extra message to throttle the leader if it got too far ahead

如果leader在执行进度上领先follower太多，那么你可能需要通过一条额外的消息来让leader刹刹车

36.31-36.36

okay so the question is if if one of these servers crashes

Ok，So，他的问题是，如果其中一个服务器挂掉了

36.37-36.39

 it has this log that it persisted to disk 

它将日志保存在了磁盘上

36.39-36.41

because that's one of the rules of figure two

因为这是Figure 2里面的一条规则

36.42 - 36.44

so the server will be able to be just logged back from disk 

So，服务器能够从磁盘中拿回日志

36.45 - 36.50

but of course that server doesn't know how far it got in executing the log

但当然，该服务器并不知道它所执行的日志进度到了哪里

36.50 - 36.57

 and also it doesn't know at least when it first reboots by the rule that figure two it doesn't even know how much of the log is committed

当该服务器第一次被重启后，根据Figure 2中的规则，它甚至并不清楚其中有多少条日志已经被提交了

36.58 - 37.00

so the first answer to your question is

So，你的问题的第一个答案是

37.00-37.06

that immediately after a restart you know after a server crashes and restarts and reads its log 

当一个服务器挂掉重启后，并当它读取它的日志时

37.06-37.08

it is not allowed to do anything with the log 

我们不允许它对日志做任何事情

37.08 - 37.13

because it does not know how far the system has committed in its log

因为该服务器并不知道，在它的日志中，该系统的提交进度是多少

37.13-37.18

maybe log has a thousand uncommitted entries and zero committed entries for all it notes

可能在日志中，它里面有1000条未提交的条目和0条已提交的条目



37.24 - 37.27

if a leader dies, support that doesn't help either 

那如果leader也挂了，这对此也就没有什么帮助了

37.27 - 37.29 ！！！！！！

but let's suppose they've all crashed

那我们假设它们全挂了

37.29 - 37.32

this is getting ahead of its getting a bit ahead of me

这有点超纲了

37.32 - 37.34

but we'll suppose they've all crashed 

但我们假设它们全挂了

37.34-37.40

and so all they have is the state that was marked as non-volatile in figure 2 

在Figure 2中，它们所拥有的状态被标记为非易失性的

37.40-37.43

which includes the log and maybe the latest term

它里面包括了日志，还可能包括了最新的term

37.43 - 37.46

and so they don't know some if there's a crash

如果发生了一次崩溃

37.46-37.47

if they all crash and they all restart 

如果这些服务器全挂了，并且全都重启了

37.48 - 37.54

none of them knows initially how far they had been have executed before the crash

这些服务器中没有哪个服务器知道，它们在挂掉前，它们所执行的进度到哪了

37.54 - 37.58

so what happens is that you leader election one of them gets picked as a leader 

So，接下来要发生的是，在我们进行leader选举的时候，选出了一个leader

37.58 - 38.06

and that leader if you sort of track through what figure 2 says about how AppendEntries is supposed to work 

如果你看下Figure 2里所讲的AppendEntries是如何工作的

38.07 -38.14

the leader will actually figure out as a by product of sending out  appendant or sending out the first heartbeat really

Leader实际上也会把AppendEntries作为心跳向外发送，

38.15 - 38:31

it'll figure out what the latest point is basically that  that all of the that a majority of the replicas agree on their logs

通过心跳，来确定Majority所包含的replicas 的最新的日志提交状况

38.31 -38.33

 because that's the commit point

因为那里就是提交点

38.33 - 38.38

another way of looking at it is that once you choose a leader. 

换种方式来看，一旦你选出了一个leader



38.39 - 38.43 

Through the append entries mechanism, the leader forces all of the other replicas to have identical logs to the leader 

通过这个AppendEntries机制，leader会强制所有其他副本（replica）所拥有的日志与leader的日志必须完全一致

38.44 - 38.47

and at that point plus a little bit of extra the paper explains at that point

在paper中，它里面稍微解释了下这一点

38.48 - 38.53

 since the leader knows that it's forced all the replicas to have logs that are identicals to it 

因为leader知道，它强制让所有的副本（replica）所拥有的日志与它完全相同

38.54 - 39.05

then it knows that all the replicas must also have a...

there must be a majority of replicas with... 

that  all those log Entries in that logs which are now are identical must also be committed

在日志中所有的执行日志条目现在必须完全相同，并且它们也都已经被提交了

39.05-39.09

because they're held on a majority of replicas 

因为它们是保存在大多数副本（replica）中的


39.09 - 39.18

and at that point a leader you know the append entries code described in Figure 2 for the leader will increment the leaders commit point

此时，在Figure 2中的AppendEntries部分中，

此时，如Figure 2所说的那样，leader会对它最后的那个log index进行加一

正如Figure 2 AppendEntries RPC所说的那样，我们可以根据leaderCommit来确定日志中的命令提交点

39.18 - 39.22

and everybody can now execute the entire log from the beginning 

现在，所有服务器就可以从头开始执行整个日志上的操作

39.22-39.29

and recreate their state from scratch possibly extremely robustly

从零开始重建它们的状态（大家用的都是同一套日志），这种方式是最稳的

39.29 - 39.32

so that's what figure two says

So，这就是Figure 2所说的东西

39.32-39.36

it's obviously this reexecuting from scratch is not very attractive

很明显，这种从头开始重新执行的方式并不是那么的吸引人

39.36-39.39

but it's where (what?) the basic protocol does

但这就是基本协议所做的事情

39.39 - 39.40

and we'll see tomorrow 

我们会在明天看到

39.40-39.46

the sort of version of this is more efficient to use as checkpoints and we'll talk about tomorrow

使用checkpoint的版本要比它来的更加高效，这个我们明天会讨论（知秋：比如redis中的AOF和RDB的关系，RDB可以认为是存档checkpoint，加载后，再读AOF的追加，这样更快）

39.46 - 39.49

 okay 



39.49-39.53

so this was a sequence in sort of ordinary non failure operation

So，这就是一次无故障操作的执行过程﻿



####################################################

39.55 - 40.00

another thing I want to briefly mention is what this interface looks like

我想简单谈下的另一件事情就是这个接口看起来是怎么样的

40.00 - 40.04

you've probably all seen a little bit of it due to working on the labs 

因为你们做过了lab，你们可能已经见过了它里面的一些东西

40.04 - 40.06

but roughly speaking

但粗略的讲


40.06-40.16

 if you have let's say that this key value layer with its state and the raft layer underneath it 

如图所示，上面是Key/Value层，里面包含了该副本的state，在它下面是raft层

40.16 - 40.20

there's on each replica  there's really two main pieces of the interface between them

在每个副本（replica）中，它们之间主要有两个接口

40.20 - 40.27

there's, this method by which the key value layer can relay if a client sends in a request the key value layer has to give it to raft

我画的这个方法是当Client端发送请求时，key-value层需要转发这个请求给Raft层



40.27 - 40.31

 and say please you know fit this request into the log somewhere

并表示，请将这个请求放在日志中的某个地方


40.31 - 40.39

and that's the start function that you'll see in raft.go

这个是start()函数，你们会在raft.go中看到这个


40.39-40.42

and really just takes one argument the client command

它仅接收一个参数，即来自客户端的命令（command）

40.42 - 40.48

the key value  they're saying please I got this command to get into the log and tell me when it's committed

key-value层表示，请把我接收到的这条命令记录到log中，然后当记录完成时告诉我一下



40.49 - 41.00

and the other piece of the interface is that by and by the raft layer will notify the key value layer  that  AHA that operation that you

sent to me in a start command a while ago 

另一个方法是，不久以后Raft层会告诉key-value层，嗨你刚才发给我的操作



40.56 -41.02

which may well not be the most recent start 

不是最新的start命令（知秋注：start其实就是执行，参数就是命令，appendentries每次携带的未提交命令才是最新的，但无法执行，只能执行它携带的committed命令）



一百二十二  阅举报
6-03

41.02-41.08

right there you know a hundred client commands could come in and cause calls to start before any of them are committed

当有100个Client端的命令传入时，并且在它们中任意命令被提交前，调用了Start()方法


41.08-41.22

so by and by this upward communication is takes the form of a message on a go channel that the raft library sends on and key value layer is supposed to read from

这个向上的通信会将一条消息放入一个Go channel中，这里是通过raft库将它放入channel，key/value层会从这个channel中对其进行读取

41.22-41.30

so there's this apply called the apply channel 

这里有个applyCh

41.30-41.35

and on it you send apply message

通过applyCh你可以发送ApplyMsg（老师在讲lab需要实现的代码）


41.35-41.47

this start and of course you need the the key value layer needs to be able to match up message that receives an apply channel with calls to start that it made

key/value层可以从一个apply channel中接收到的信息，该信息为我可以用来处理的命令，即该Start方法的传入参数

41.47-41.55

and so the start command actually returns enough information for that matchup to happen

it returns the index

START(Command) 实际上执行后返回的信息为这条命令的index



41.56 - 42.04

that start functions basically returns the index in the log where if this command is committed which it might not be it'll be committed at this index 

START(Command)返回的这个索引（index），就是如果该请求命令提交log后，该命令所在log中的索引号(Index)



42.05-42.09

and I think it also returns the current term and some other stuff we don't care about very much

我想START也会返回其他的信息如：当前的term版本，和一些我们不太关心的其他信息（如是否是leader）


42.08 - 42.26

 and then this apply message is going to contain the index command and both the commands

然后这个ApplyMsg结构体中，包含了index以及command

42.27-42.29

all the replicas will get these apply messages so they'll all know

所有的replicas将取得这些ApplyMsg信息，它们都会知道

42.29 - 42.35

 though I should apply this command figure out what this command means and apply it to my local State

我会提交这个命令，解析并将它提交到我的Local State中


42.36-42.38

 and they also get the index. The index is really only useful on the leader 

这些replicas也会得到index，Leader上的这个Index是真的很有用

42.39 - 42.44

so it can figure out what client would what client requests we're talking about

So，这样通过它(Index)就可以弄清楚我们所讨论的Client端请求是什么了



43.14-43.16

the answer a slightly different question

这个问题和之前的有些不一样

这个问题和之前有些不一样

43.16 - 43.20

let's suppose the client sends any request in 

让我们假设一下，client 发送进来一些请求

假设，Client端发送了一些请求

43.21 - 43.24

let's say it's a put or a get could be put or get. it doesn't really matter  I'd say it to get 

这里发送的是put 还是get 命令，都可以的。 那么就GET好了

这里请求可以是put请求，也可以是get请求。这都没关系，这里我就拿get请求来说好了


43.29 - 43.33

the point in which a client sends get and waits for a response 

在这个节点是Client发送命令并等待响应

此时，Client端发送了一个get请求，并等待响应

43.34 - 43.39

the point at which the leader will send a response at all is after the leader knows that command is committed

这个节点是leader在知道了command提交后，发送响应给Client

此时当leader知道该命令被提交后，它会发送一个响应给Client


43.40 - 43.48

 so this is going to be a sort of get reply 

所以这里将得到响应数据

So，这里会有一个对应刚才get请求的响应

43.48 - 43.50

so the client doesn't see anything back 

这样client没有看到任何返回值

So，假设Client并没有看到任何回复

43.51 - 43.56

I mean  and so that means in terms of the actual software stack 

我意思是，就实际的软件调用流程栈中

43.56-44.02

that means that the key value the RPC will arrive the key value layer will call the start function

key/value层接收到RPC命令，然后key/value层调用START函数(知秋注:就好比Java的spring web框架首先对请求进行解析，这里就可以看作是raft对请求的解析，拿到我们要真正执行的命令，再交由我们的业务处理执行)



44.02 - 44.08

 the start function will return to the key value layer, but the key/value layer will not yet reply to the client

START函数会将解析结果返回给key/value层响应，而在拿到解析结果后，key/value层并不会返回响应给Client



44.08 - 44.14 ！！！！！！

 because it does not know if it's good actually it hasn't executed the clients request now， it doesn't even know if it ever will

因为它并不清楚这个命令现在有没有被执行，会不会执行



44.15 - 44.18

because it's not sure if the request is going to be committed

因为它无法确定该请求是否已被提交

44.18-44.20

right in the situation which may not be committed

因为它不确定这个请求能否在未被提交的情况下，正常提交（不同client提交相同命令）

因为在这种情况下，该请求可能未被提交

44.20 - 44.25

if the key value layer you know guess gets the request,  calls start , 

如果key/value层获得该请求，调用START



44.25 - 44.26

and immediately after start turns to crashes 

当调用完Start后，leader就马上挂了

44.26-44.33

right certainly it hasn't sent out its apply what append messages or whatever nothing's be committed yep

然后key-value stub 突然崩溃了, 理所应当的它就没有发送出它提交追加的信息，或者什么都没提交

此时，它还来不及发出追加消息，或者说什么东西都没有被提交

44.33 - 44.44

so the  game is start returns time passes the relevant apply message corresponding to

that client request appears to the key value server on the apply channel 

So，只有在Start函数返回后（即master接收到绝大数响应后，知道请求已经预发到各个备机），该Client请求所对应的消息会出现在key/value服务器中的ApplyChannel中

44.44 - 44.51

and only then and that causes the key value server to execute the request  and send a reply

只有这样才会让key/value服务器去执行该请求，并发送回复消息给Client

44.58 - 45.00

and that's like all this is very important

我所讲的这些都很重要



45.00-45.03

 when it doesn't really matter if all everything goes well 

如果一切运行都正常的时候没什么好担心的



45:04 - 45:06

but if there's a failure 

但是在这个点出现了故障



45.06 - 45.14

we're now at the point where we start worrying about failures，I mean extremely interested in if there was a failure what did the client see

此时我们会开始担心此处发生的故障，我的意思是我对此非常感兴趣，如果这里发生了故障，Client端会看到什么呢？

45.11-45.15

all right 



45.15-45.25

and so one thing that does come up is that all of you should be familiar with this that

接下来要讲的一个东西，大伙应该对它都很熟悉

45.25-45.29

at least initially one interesting thing about the logs is that they may not be identical

其中一件比较有意思的事情就是，至少在一开始，这些日志可能并不是完全相同



45.29-45.32

there are a whole bunch of situations in which

这里面存在了各种各样的情况

45.32-45.39

at least for brief periods of time  the ends of the different replicas logs may diverge

这些不同的replica挂掉的时间不一样，这就会导致日志产生分歧

45.39-45.40

like. for example

例如

45.40-45.46

if a leader starts to send out a round of append messages, but crashes before it's able to send all them out

如果leader准备开始向Client发送一轮追加消息，但在它能够发出去之前，它挂掉了



45.46-45.51

you know that'll mean that some of the replicas that got the append message will append you know that new log entry 

这就意味着，某些拿到这些追加消息的副本（replica）就会追加新的日志条目



45.51-45.55

and the ones that didn't get that append messages RPC won't append them

那些没有拿到追加消息的副本（replica）就不会对它们进行追加

45.55-45.59

so it's easy to see that the logs are,  I'm gonna diverge sometimes

So，我们有时候就很容易看到这些日志会产生分歧



45.59-46.01

the good news is that

好消息是

46.01-46.07

the way a raft works actually ends up forcing the logs to be identical after a while 

实际上，经过一段时间，raft最终会强制让这些日志变得一模一样

46.07-46.10

there may be transient differences

这其中可能存在短暂的差异

46.10-46.12

but in the long run

但在长时间运行的情况下

46.12-46.18

all the logs will sort of be modified by the leader until the leader ensures there are all identical and only then are they executed 

所有的日志都会被leader所修改，直到leader确信它们都一样位置，只有这个时候，leader才会去执行它们

46.18-46.22

okay 

46.22-46.28

so I think the next there's really two big topics to talk about here for raft

So，接下来我要讲的是raft中两个很重要的主题

46.28-46.30

one is how leader election works 

其中一个主题是，leader选举的工作方式

46.30-46.32

which is lab two

这是lab2中的内容

46.32-46.38

and the other is how the leader deals with the different replicas logs particularly after failure 

我们要讨论的另一个主题就是leader该如何处理不同副本上的日志，特别是当出现故障的情况下

46.38-46.41

so first I want to talk about leader election

So，首先我想谈下leader选举

46.41-46.49

question to ask is how come the system even has a leader why do we need a leader

这里要问的问题是，系统是如何拥有一个leader的，我们为什么需要一个leader

46.49-46.54

the part of the answer is you do not need a leader to build a system like this

其中部分回答是，我们无须一个leader就能构建出像这样的系统



46:54 - 46.58

it is possible to build an agreement system

构建出一种协议系统是可能的

46.58-47.05

by which a cluster of servers agrees you know the sequence of entries in a log without having any kind of designated leader

在不使用任何指定leader的情况下，通过一个服务器集群来同意执行日志上的条目序列

47.05-47.06

and indeed

确实

47.06-47.11

 the original PAXOS system which the paper refers to original Paxos did not have a leader

在paper中所提到的原始Paxos系统中，它里面就没有用到leader



47.11-47.14

so it's possible

So，这是可能做到的

47.14-47.17

the reason why raft has a leader is basically  that 

简单来讲，之所以raft使用leader的原因是

47.17-47.19

there's probably a lot of reasons

这里面可能有很多理由

47.19-47.20

but one of the foremost reasons is that

但其中最重要的原因是

47.20-47.25

you can build a more efficient in the common case in which the server's don't fail 

我们可以构建出一个通常情况下更为高效的系统，这里面服务器并不会发生故障

47.25-47.29

it's possible to build a more efficient system if you have a leader

如果我们使用leader，那我们就有可能构建出一个更为高效的系统

47.29-47.30

because with a designated leader

因为通过使用一个指定的leader

47.30-47.32

everybody knows who the leader is 

每台服务器就会知道leader是哪个

47.32-47.40

you can basically get agreement on requests that with one round of messages per request

每个请求，你就可以基本上通过一轮消息取得对于这个请求处理意见

这样，对于每个请求，你只需通过一轮消息就可获知大家对于这个请求处理意见



47.40-47.43

where as leader of this systems have more of the flavor of

leader 让这个系统更为高效

47.43-47.43

Well



47.43-47.46

you need a first round to kind of agree on a temporary leader 

你需要在第一轮确认temporary leader 

47.46-47.49

and then a second round actually send out the requests 

然后，在第二轮的时候发出这些请求

47.49-47.56

so it's probably the case that use of a leader now speeds up the system by a factor two

So，在这种情况下，使用leader会让系统速度提升两倍

47.56-48.00

and it also makes it sort of easier to think about what's going on 

这也让我们能更容易地想清楚这里面发生了什么

48.00-48.06

raft goes through a sequence of leaders

raft会经历一系列的leader

48.06-48.14

and it uses these term numbers in order to sort of disambiguate which leader we're talking about

raft使用这些term号，来确定我们所讨论的是哪个leader



48.14 - 48.16

 it turns out that followers don't really need to know the identity of the leader

事实证明，follower不需要知道该leader的id是什么

48.16-48.19

they really just need to know what the current term number is

它们只需要知道当前的term号是什么就行了

48.19-48.24

each term has at most one leader

每一个term最多只有一个leader

48.24-48.25

that's a critical property

这是一个非常关键的属性

48.25-48.28

you know for every term there might be no leader during that term 

对于每个term来说，它里面可能并没有leader

48.28-48.30

or there might be one leader

或者，里面可能有一个leader

48.30-48.33

but there cannot be two leaders during the same term 

但在同一个term中，不可以有两个leader

48.33-48.35

every term has it must most one leader

在每个term中，它里面必须最多只能有一个leader

48.35-48.44

how do the leaders get created in the first place

我们该如何创建出leader呢？

48.44-48.48

every raft server keeps this election timer

每个raft服务器中会有一个election timer（选举计时器）

48.48-48.52

which is just a it's basically just time that it has recorded 

基本上来讲，它就是用来记录时间的

48.52-48.55

that says well if that time occurs, I'm going to do something 

如果到了某个时间点，那我就该做点什么了



48.55-48.57

and the something that it does is that

它所做的事情就是

48.57-49.05

if an entire leader election period expires without the server having heard any message from the current leader

在一段时间内（这段时间可以看作leader选举触发时间，如果过期，触发选举），如果服务器没有收到任何来自当前leader消息的情况下，



49.05-49.12

then the server assumes probably that the current leader is dead and starts an election

那么服务器就会假定当前的leader可能挂掉了，并且开始一次新的选举



49.12 - 49.13

so we have this election timer

So，我们有一个选举计时器


49.18 - 49.19

and if it expires

如果这个时间过期（知秋注：即超时，触发选举操作）


49.19-49.21

we start an election

我们就开始一次新的选举



49.28 - 49.33

and what it means to start an election is basically that

简单来讲，开始一次选举指的是


49.33 - 49.35

you increment the term

你将term号进行加一



49.35 - 49.39

the candidate the server that's decided it's going to be a candidate

服务器会作为candidate （Follower -> Candidate）





49.38 - 49.41

and sort of force a new election 

并且可以强制开始一次选举

发起新的一轮选举

49.41-49.42

first increments this term

首先先对term号进行加一

49.42-49.45

because it wants them to be a new leader namely itself

因为它想要自己成为新的Leader

49.45 - 49.50

and you know leader a term can't have more than one leader so we got to start a new term 

就像你们知道的那样，一个term中最多只能有一个leader。So，我们得开始一个新的term



49.50 - 49.51

in order to have a new leader

以此来得到一个新的leader


49.51 - 49.57

and then it sends out these requests votes rpc

然后，它会发送这些RequestVote RPC（请求投票的RPC请求）





50.00 - 50.02

I'm going to send out a full round of request votes 

我会发起一轮请求投票（给所有的replicas机器，哪怕它失联了）



50.02 - 50.06

and you may only have to send out n minus one requests votes

你们可能只能发送N-1个RequestVote



50.06-50.12

because one of the rules is that a new candidate always votes for itself in the election

因为其中一条规定表示，在选举中，一个新的candidate总是给它自己投票





50.12 - 50.15

so one thing to note about this is that

So，有件事情我们要注意一下



50.16 - 50.19

it's not quite the case that if the leader didn't fail we won't have an election

如果leader并没有挂掉，我们就不会开始一个新的选举。然而情况其实并非如此（知秋注：如果leader并没有挂，但和其他replicas断连了，成为了少数派也是不行的）



50.19 - 50.22

but if the leader does fail, then we will have a election

但如果leader确实挂了，那我们就会开始新的选举



50.22 - 50.24

and election assuming any other server is up 

在选举中，我们会假设其他服务器都活着



50.25 - 50.28

because some day the other servers election timers will go off

因为一段时间后，其他服务器就会出现election period过期，触发选举



50.28 - 50.32

but as leader didn't fail we might still unfortunately get an election

但当leader并没有挂掉的话，不幸的是，我们可能依然得开始进行选举



50.32 - 50.35

so if the network is slow or drops a few heartbeats or something

So，如果网络比较慢，或者丢掉了某些heartbeat或者其他之类的东西



50.37 - 50.38

we may end up having election timers go off 

最终选举计时器会过期



50.38 - 50.40

and even though there was a perfectly good leader

即便这里有一个很好（正常运行）的leader





50.40 - 50.42

we may nevertheless have a new election

尽管如此，我们可能还得开始一个新的选举



50.42 - 50.45

so we have to sort of keep that in mind when we're thinking about the correctness

So，当我们考虑正确性的时候，我们就得记住这点



50.46 - 50.49

and what that in turn means is  that if there's a new election

这意味着，如果这里有一个新的选举



50.50 - 50.52

it could easily be the case 

这种情况很容易发生

50.52-50.55

that the old leader is still hanging around and still thinks it's the leader

老的leader仍然在浪，它依然觉得它是leader



50.55 - 50.57

like if there's a network partition for example 

比如遇上网络分裂的情况



50.57 - 51.00

and the old leader is still alive and well in a minority partition

老的leader依然在少数派分区活地好好的



51.00 - 51.04

the majority partition may run an election 

多数派所在的分区可能就会进行一次选举



51.05 - 51.06

and indeed a successful election and choose a new leader

一次成功的选举，并选出一个新的leader



51.07 - 51.09

 all totally unknown to the previous leader

前一个leader完全不清楚其他分区所发生的事情



51.09 - 51.16

so we also have to worry about.. you know.. what's that previous leader gonna do since it does not know there was a new election 

So，我们就不得不为此担心，比如：前一个leader会做什么事情，因为它不知道这里又开始了一次新的选举



51.17

yes

请问





51.42 - 51.44

okay so the question is 

Ok，So他的问题是



51.44 - 51.46

are there can there be pathological cases in which 

会存在一些因为访问路径逻辑引发的问题



51.47- 51.53

for example one-way network communication can prevent the system from making progress

比如，单向网络通信可以阻止系统进行工作



51.53 - 51.54

 I believe the answer is yes

我相信答案是Yes



51.54 - 51.56

certainly so for example

So，例如



51.56 - 52.01

if the current leader if its network somehow half fails

如果当前leader所在的网络瘫痪了一半 （知秋注：提前剧透：客户端和leader失联，但leader可以和其他大多数replicas通信，这就没办法正常工作了）

52.01-52.03

in a way the current leader can send out heartbeats

当前的leader能以某种方式对外发送heartbeat



52.04 - 52.07

but can't receive any client requests

但它收不到任何Client端的请求

52.07-52.11

then the heartbeats that it sends out which are delivered 

心跳是可以对外发送的， 但是不能接受任何client的请求

它所发送的这些heartbeat，Client端是可以收到的



52.11 - 52.13

because it's outgoing network connection works 

这是因为leader对外网络连接是还可以工作的





52.13 - 52.20

its outgoing heartbeats will suppress any other server from starting an election

leader所发出的heartbeat会阻止其他任何服务器开始一场新的选举



52.20 - 52.27

but the fact that it's incoming Network why or apparently is broken will prevent it from hearing and executing any client commands

事实上是入口网络显然已经故障了，这将阻止leader接收和执行任何客户端命令



52.28 - 52.37

it's absolutely the case that raft is not proof against all sort of all crazy Network problems that can come up

raft绝对无法防范可能出现的各种可怕的网络问题



52.37 - 52.38

I believe the ones I've thought about

我相信我的想法

1149

52.38 - 52.41

I believe are fixable 

我觉得这些问题是可以被修复的



52.41 - 52.49

in the sense that the we could solve this one by having a sort of requiring a two-way heartbeat 

我们可以通过双向发送heartbeat的方法来解决这个问题





52.49 - 52.51

 in which if the leader sends out heartbeats

如果leader对外发送了这些heartbeat



52.51 - 52.56

but you know there were  in which followers are required to reply in some way to heartbeats 

我们要求follower以某种方式去回复这些heartbeat



52.56 - 52.58

I guess they are already required to reply 

我猜它们已经被要求回复这些heartbeat



52.58 - 53.02

if the leader stop seeing replies to its heartbeats

如果leader不再看到这些对于它所发出的heartbeat的回复



53.02 - 53.07

then after some amount of time  and which is seasonals replies the leader decides to step down

那么经过一段时间后，leader会决定下台



53.07 - 53.11

I feel like that specific issue can be fixed

我觉得这样做的话，这种问题可以被解决



53.12-53.13

and many others can too

其他问题也能被解决



53.14 - 53.16

you know you're absolutely right

你说的绝对没错

53.16-53.22

 that  very strange things can happen to networks including some that the protocol is not prepared for

很多非常奇怪的事情会发生在网络层面，这其中包括那些协议应对范围之外的问题



53.28 - 53.32

okay so we got these leader elections 

Ok，So，我们现在已经知道了leader选举是怎么一回事



53.32 - 53.35

we need to ensure that there is at most at most one meter per term

我们需要确保在每个term中最多只能有一个leader



53.35 - 53.36

how does Raft do that 

Raft是怎么做到的呢？



53.36 - 53.40

well Raft requires in order to be elected for a term 

Well，为了能让其中一台服务器在一个term中当选



53.40 - 53.44

Raft requires a candidate to get yes votes from a majority of the server's 

Raft需要让其中一个candidate获得大多数服务器的赞成票



53.46 - 53.51

the servers and each server will only cast one yes vote per term

每台服务器在每个term中只能投出一张赞成票



53.51 - 53.54

so in any given term

So，在任何给定的term中



53.54 - 54.00

you know it basically means that in any given term each server votes only once for only one candidate 

简单来讲，在任何给定的term中，每台服务器只能给一个candidate投票



54.01 - 54.03

you can't have two candidates both get a majority of votes

你不能让两个candidate都拿到同样多的赞成票

你不能让两个candidate都拿到绝大多数投票

54.04 - 54.06

 because everybody votes only once

因为每个服务器都只能投一次票



54.06 - 54.12

so the majority rule causes there to be at most one winning candidate

So，多数派规则表示，这里面最多只能有一个赢得选举的candidate



54.13 - 54.19

and so then we get at most one candidate elected per turn

So，每轮我们最多只能选出一个candidate



54.24 - 54.26

and in addition

此外

54.26-54.33

critically the majority rule means that  you can get elected even if some servers have crashed

严格的来讲，多数派规则还表示即使在某些服务器挂的的情况下，我们也能进行选举



54.34 - 54.37

right if a minority of servers are crashed aren't available and network problems

如果少数服务器挂掉不可用了，以及发生了些网络问题



54.37-54.38

we can still elect a leader

我们依然可以选出一个leader



54.39 - 54.42

if more than half a  crash or not available or in another partition or something 

如果超过半数的服务器挂掉或者不可用，陷入网络割裂之类的问题



54.42 - 54.46

then actually the system will just sit there trying again and again to elect a leader 

那么实际上系统就会在那里不断尝试选出一个leader



54.46-54.51

and never elect one， if it cannot in fact  they're not a majority of live servers

如果这部分存活的服务器并不占整个集群中的大多数，那么就永远选不出来



54.54 - 54.55

if an election succeeds 

如果选举成功

54.55-54.59

everybody would be great if everybody learned about it

如果所有服务器都知道了这点，那对它们来说都很好



54.58 - 55.03

need to ask ourselves how do all the parties learn what happened

我们需要去问自己该如何让这些服务器都知道发生了什么



55.03- 55.06

the server that wins an election assuming it doesn't crash 

假设赢得了这场选举的服务器并没有挂掉



55.06 - 55.16

the server  that wins election will actually see a majority or positive votes for its request vote from a majority of the other servers 

这个赢得选举的服务器，将会看到来自大多数服务器为它发起的RequestVote选举所投的支持票



55.17 - 55.19

so the candidates running the election that wins it 





55.19 - 55.23

the candidates that wins it the election will actually know directly uh I got a majority of votes 

赢得了这场选举的candidate实际上会直接知道，Oh，我得到了大多数的支持票



55.24 - 55.28

but nobody else directly knows who the winner was or whether anybody one 

但除此之外，没人能直接知道赢得了这场选举的是哪个candidate





55.28 - 55.32

so the way that the candidate informs other servers is that heartbeat

So，candidate通知其他服务器的方法就是通过heartbeat



55.33 - 55.34

the rules and figure 2 say oh

Figure 2中的规则表示，Oh

55.34-55.39 

 if you're in an election, you're immediately required to send out AppendEntries to all the other servers 

如果你参与了一场选举并获胜了，那你就需要立即向所有其他服务器发送AppendEntries



55.39 - 55.45

now the append entries that heartbeat append entries doesn't explicitly say I won the election 

AppendEntries中的heartbeat并不会显式说明，你赢得了这场选举



55.46- 55.48

you know I'm a leader for term 23 

比如说，我是term 23中的leader（如果使用显式的方式来说的话，是这种方式）



55.47 - 55.51

it's a little more subtle than that

它要比这种说法更加委婉



55.52 - 55.55

the way the information is communicated is that 

这种信息交流的方式是



55.56 - 56.01

no one is allowed to send out an append entries unless they're a leader for that term

除了该term中的leader以外，我们不允许任何人对外发送AppendEntries

56.02 - 56.05

so the fact that I I'm a you know I'm a server

比如，我是一个服务器

56.05 - 56.08

and I saw oh there's an election for term 19 

我看到这里是第19期选举



56.09 - 56.12

and then by-and-by I sent an append entries whose term is 19 

接着，我向每个服务器逐个发送AppendEntries，并询问哪个是term 19中的leader

接着，我向同是term 19中的服务器逐个发送AppendEntries

56.12 - 56.16

that tells me that somebody I don't know who but somebody won the election 

它们会告诉我，它并不清楚，但确实有某个candidate赢得了这场选举

以此来告诉这些服务器，我赢得了这场选举

56.18 - 56.19

so that's how the other servers knows 

So，这就是其他服务器知道的方式

1232

56.19 - 56.21

they were receiving append entries for that term

它们通过接收基于该term的AppendEntries来做到



56.21 - 56.28

and that append entries also has the effect of resetting everybody's election time timer 

AppendEntries也有重置每个服务器的选举计时器的作用



56.29 - 56.30

so as long as the leader is up 

所以只要leader是在线的



56.30 - 56.35

and it sends out heartbeat messages or append entries at least you know at the rate that's supposed to

那么它至少会发送心跳信息或者AppendEntries 请求

那么它至少会按照我们预设的频率来对外发送heartbeat消息或者是AppendEntries

56.36 - 56.38

 every time a server receives an append entries 

假设一个服务器以每次收到AppendEntries请求的频率

每当一台服务器收到一次AppendEntries

56.38 - 56.42

it'll reset its selection timer

重置自己的选举计时器



56.42 - 56.46

 and sort of suppress anybody from being a new candidate

那么leader就会达到阻止任何服务器成为一个新的candidate的效果

这样就能阻止其他人成为一个新的candidate了

56.46 - 56.51

 so as long as everything's functioning, the repeated heartbeats will prevent any further elections 

所以只要服务状态及其运行情况等一切正常，重复心跳包将避免任何更进一步的选举

So，只要这些所有东西都正常工作，那么通过重复发送heartbeat就能阻止任何更进一步的选举

56.52 - 56.56

of course it the network fails or packets are dropped there may nevertheless be an election 

当然，如果网络故障或者心跳包丢失，还是会发生选举的。





56.57- 56.59

but if all goes well, we're sort of unlikely to get an election

但如果这一切都没问题，我们也不希望再去举办一次选举

57.03 - 57.05

 this scheme could fail in the sense that

这种模式可能会在这种场景下出现问题



57.05 - 57.08

 it can't fail in the sense of electing 2 leaders for a term  

它不会出现在一个term中选出2个leader的情况



57.09- 57.12

but it can fail in the sense of electing zero leaders for a term

但它会在这种情况下出现问题，即在一个term中选出0个leader



57.13 - 57.14

 that's sort of morningway it may fail is that

有一些场景会使得选举一开始就失败



57.15 - 57.18

if too many servers are dead or unavailable or a bad network connection 

如果太多服务器挂掉了或者不可用，或者网络很差



57.19 - 57.22

so if you can't assemble a  majority, you can't be elected nothing happens

So，如果你不能集结大多数服务器，那么你就无法开启选举



57.23 - 57.26

 the more interesting way in which an election can fail is

在选举失败中更有趣的一件事是



57.27 - 57.28

 if everybody's up

如果所有服务器都在线

57.28-57.32

 you know there's no failures no packets are dropped 

即没有故障发生，也没有任何丢包出现



57.33 - 57.37

but two leaders become candidate close together enough in time that 

但可能会有两个想成为leader的candidate在几乎同一时间内发起选举



57:37 - 57:41

they split the vote between them or say three leaders

他们会去彼此那里去瓜分选票（也可以说是有三个成为leader的candidate同时做这个事情）





######## 下面将讲述随机超时避免candidates 瓜分 votes  的 scenes #####



57.45 - 57.46

so supposing we have three liters leaders

So，假设我们有3个发起想成为leader的candidate

57.46-57.48

supposing we have a three replica system

假设我们的系统有三个replica



57.50- 57.55

all their election timers go off at the same time every server both for itself

所有的选举计时器都在同一时间结束计时



57.54 - 57.58

and then when each of them receives a request vote from another server 

然后，当每个服务器都收到了来自另一个服务器的RequestVote



57.58 - 58.02

well it's already cast its vote for itself and so it says no

Well，该服务器已经为它自己都过票了。So，它会对此说：No



58.02 - 58.05

so that means that it all three of the server's needs to get one vote each

So，这就意味着，这三台服务器都需要得到一张票

58.05-58.07

nobody gets a majority and nobody's elected 

没人得到大多数的赞成票，并且没有人成为leader



58.08- 58.10

so then their election timers will go off again 

So，那么它们的选举计时器就会结束计时



58.11 - 58.14

because the election timers only reset if it gets an append entries

因为如果服务器收到AppendEntries，那么它的选举计时器才会重置

58.14-58.14

but there's no leader

但这里并没有leader

58.14-58.15

so no append entries 

So，这也就不会有AppendEntries了



58.14 - 58.17

they'll all have their election timers go off again 

这些服务器上的选举计时器就都会结束计时



58.17 - 58.19

and if we're unlucky

如果我们运气不好的话

58.19-58.20

 they'll all go off at the same time

它们会在同一时间结束计时



58.20 - 58.23

they'll all go for themselves nobody will get a majority 

这些服务器都为自己投票，没有任何服务器会取得大多数的赞成票



58.22 - 58.26

so so clearly

So，很明显



58.27 - 58.28

 I'm sure you're all aware at this point

我确信你们都意识到了这点



58.28 - 58.31

there's more to this story 

关于这个东西还有很多内容要讲







###############################################################







58.31 - 58.37

and the way Raft makes this possibility of split votes unlikely, but not impossible is by randomizing these election timers

使用随机选举超时时间（和leader交流超时等待的时间长短）的方式来确保很少会发生选票瓜分的情况（知秋注：因为这一个term我已经投完票了，没有拿到leader，剩下的就只能等leader来appendEntries了）





58.41 - 58.46

so the way to think of it and the randomization the way to think of it 

So，我们来思考下这种做法



58.46 - 58.51

 is that supposing you have some time line I'm gonna draw events on 

假设这里有某条时间线，我会在上面画些事件



58.51 - 58.56

there's some point at which everybody received the last append entries 

在上面的某处时间点上，每台服务器都收到了最后的AppendEntries



58.54 - 58.58

right and then maybe the server died 

然后，leader服务器可能就挂掉了



58.58 - 59.01

let's just assume the server send out a last heartbeat and then died 

我们假设在服务器对外发送完最后一个heartbeat后，它就挂掉了



59.03 - 59.13

well all of the followers have reset their election timers when they received at the same time 

当这些follower在同一时间收到这个heartbeat后，它们会重置它们的选举计时器


59.13 - 59.15

because they probably all receive this AppendEntries at the same time 

因为它们可能在同一时间都收到了这个AppendEntries



59.15 - 59.19

they all reset their election timers for some point in the future the future

它们之后在某个时间点就会重设它们的选举计时器



59.20 - 59.25

but they chose different random times in the future which then we're gonna go off

但它们会去选择不同且随机的时间来重设选举计时器



59.25 - 59.27

so it's suppose the dead leader server one

So，假设挂掉的leader是服务器1



59.27 - 59.33

 so now server two and server 3 at this point set their election timers for a random point in the future

服务器2和服务器3在收到AE后的随机时间点设置他们的选举计时器



59.33 - 59.38

let's say server to two set their election timer to go off here 

So，我们会说服务器2会在这个时间点将它的选举计时器进行重置


59.38 - 59.42

and server 3 set its election timer to go off there 

然后，服务器3在这个时间点将它的选举计时器重置



59.43 - 59.46

and the crucial point about this picture is that

这张图的关键点在于



59.46 - 59.48

assuming they picked different random numbers

假设它们选择了不同的时间点对它们的选举计时器进行重置



59.49- 59.53

one of them is first and the other one is second right 

其中一个会先重置，另一个会稍后进行重置



59.51 - 59.55

that's what's going on here

这就是这里所发生的事情


59.55 - 59.56

and the one that's first

这里服务器2是先重置它的选举计时器的



59.56 - 59.58

assuming this gap is big enough 

假设这个时间间隔足够大





59.59 - 01.00.02

the one that's first it's election timer will go off first  before the other ones election timer

服务器2的选举计时器会先进行重置，然后服务器3的选举计时器再进行重置



01.00.03 - 01.00.05

and if we're close were not unlucky

服务器2和3如果离得很近的话，也是不行的（知秋注：可能由于网络延迟，在服务器1的投票请求未到达前，服务器2就自行发起了投票请求）



01.00.06 - 01.00.10 

it'll have time to send out a full round of vote requests 

如果两者随机时间离得足够远，服务器2会有时间来发起一轮完整的VoteRequests



01.00.10 - 01.00.17

and get answers from everybody who everybody's alive, before the second election timer goes off from any other server 

并在其他服务器的选举计时器超时前，从所有活着的服务器处得到投票结果



八十六  阅举报
6-04


01:00:19 - 01:00:30

so does everybody see how the randomization desynchronizes these candidates 

So，在座的有没有人看出来这种随机化的方式是如何让这些candidate失去同步的

1.00.30-1.00.35

unfortunately there's a bit of art in setting the contents constants for these election timers

不巧的是，为选举计时器设置内容常量是有一些技巧的

1.00.35-1.00.39

there's some sort of competing requirements you might want to fulfill

你们可能需要去满足某些竞争要求

1.00.39-1.00.43

so one obvious requirement is that 

其中一个很明显的要求就是

1.00.43-1.00.48 ******** 

the election timer has to be at least as long as the expected interval between heartbeats

选举计时器必须至少与heartbeat之间的预期间隔一样长

1.00.48-1.00.49

you know this is pretty obvious 

这非常明显

1.00.49-1.00.53

that the leader sends out heartbeats every hundred milliseconds

leader会每隔100毫秒对外发送heartbeat

1.00.53-1.00.59 （复述1.00.43-1.00.48）

you better make sure there's no point， in having the election time or anybody's election time or ever go off for 100 milliseconds，

你最好确保，这个点所进行的选举或其他candidate的触发选举的超时时间不要小于100 ms，在心跳结束后的某个时间点触发选举操作 



1.00.59-1.01.04

because then it will go off before, you couldn't even expected new AppendEntries

如果心跳期结束（这期间没有再接收到新的心跳并重置选举定时器，也可以理解为心跳期维护定时器），那么你就不可能再接收到新的AppendEntries

因为这样在结束计时前，你都不能去期待有任何新的AppendEntries出现


1.01.04-1.01.09 （再次复述1.00.43-1.00.48）

the lower limit is certainly the lower limit is one heartbeat interval in fact

选举计时器的下限，实际上是心跳的一次间隔时间



1.01.09-1.01.11

because the network may drop packets

因为网络可能会发生丢包

1.01.11-1.01.18 *******

you probably want to have the minimum election timer value be a couple of times the heartbeat interval

你可能希望将选举计时器的最小值设置为heartbeat间隔的两倍（即最少等待两次heartbeat）

1.01.18-1.01.25

so for 100 millisecond heartbeats, you probably want to have the very shortest possible election timer be you know say 300 milliseconds

比如，heartbeat的间隔为100ms，你可能想要最短的选举计数器的最小时间为300ms



1.01.25-1.01.27

 you know three times the heartbeat interval

即3倍的心跳间隔


1.01.27-1.01.33

 so that's the sort of minimum is the heartbeat 

So，这里的最小值是心跳

1.01.33-1.01.37

so this frequent you want the minimum to be you know a couple of times that or here

So，你想要的最小频率值为此处时间的两倍（即心跳间隔的两倍）

1.01.37-1.01.40

 so what about the maximum

So，最大值是多少呢？

1.01.40-1.01.45

 you know you're gonna presumably randomize uniformly over some range of times 

你可以将最大值设置为某段时间的随机倍数值


1.01.45-1.01.52

you know where should we set the maximum timer randomizing over

我们可以将选举计时器的最大值随机设置在这里



1.01.52-1.01.57

there's a couple of considerations here

这其中有两种考量

1.01.57-1.01.59

in a real system 

在一个真实的系统中

1.01.59-1.02.07

you know this maximum time effect how quickly the system can recover from failure

这个最大时间影响的是系统从故障中恢复的速度

1.02.07-1.02.14

because remember from the time at which the server fails until the first election timer goes off 

别忘了，从系统发生故障到第一次选举计时器结束计时的这段时间内

1.02.14-1.02.16

the whole system is frozen

整个系统是冻结的

1.02.16-1.02.17

there's no leader 

这里面没有leader



1.02.17-1.02.19

you know the clients requests are being thrown away

来自Client端的请求都会被丢弃

1.02.19-1.02.20

 because there's no leader

因为这里没有leader

1.02.20-1.02.26 

and we're not assigning a new leader even though you know  presumably these other servers are up 

即使这些其他服务器都活着的情况下，我们也没有去指定一个新的leader

1.02.26-1.02.33

so the beer barrier we choose this maximum ，the long or delay we're imposing on clients before recovery occurs 

所以，我们选择这个最大值的屏障，是在故障恢复之前，我们强加给客户的等待时间



01.02.33 - 01.02.43

you know whether that's important depends on sort of how high performance we need this to be  and how often we think there will be failures

这是否重要取决于我们所需要的性能高低以及故障发生的频率如何



01.02.42 - 01.02.46

failures happen once a year then who cares

如果故障一年发生一次，那谁会去在意呢

01.02.46 - 01.02.50

we're expecting failures frequently we may care very much

如果故障经常发生，那我们对此就会非常在意

1.02.50-1.02.52

how long it takes to recover

以及系统要花长时间来恢复运行

01.02.52 - 01.02.53

 okay so that's one consideration

Ok，这就是其中一种考虑


01:02:53,670 - 01:02:56,130

the other consideration is that this gap

另一个考虑就是这段间隔



01:02:56,329 - 01:03.02

that is the expected gap in time between the first timer are going off and the second timer going off

即第一个计时器结束计时和第二个计时器结束计时之间会有一段预期的时间间隔

1.03.02-1.03.11

 this gap really in order to be useful, has to be longer than the time it takes for the candidate to assemble votes from everybody

要让这段时间间隔起些作用，就需要它大于candidate收集所有选票所花费的时间

1.03.11-1.03.18

that is longer than the expected round-trip time the amount of time it takes to send an RPC and get the response 

也要大于发送RPC并获得响应所消耗的预期往返时间



1.03.18-1.03.26

and so maybe it takes 10 milliseconds to send an RPC and get a response from all the other servers 

So，它发送一次RPC，并等到来自所有其他服务器响应的时间消耗可能要花10毫秒

1.0326-1.03.27

and if that's the case 

如果是这种情况

1.03.27-1.03.29

we need to make maximum at least long enough

我们最少需要让最大时间要足够长

1.03.29

 that there's pretty likely to be 10 milliseconds difference between the smallest random number and the next smallest random number

比如，该最小随机数和下个最小随机数之间要大概相差10ms



1.03.40-.03.42

and for you 

对于你们来说

1.03.42-1.03.56

the test code will get upset，if you don't recover from a leader failure in a couple seconds 

如果你们没法在几秒内从leader故障中恢复过来，那么你们就没法通过测试代码

1.03.56-1.04.00

and so just pragmatically you need to tune this maximum down

So，从务实的角度出发，你们应该将这个最大值往下调

1.04.00-1.04.05

so that it's highly likely that you'll be able to complete a leader election within a few seconds 

So，你们很有可能得能够在几秒内完成一次leader选举

1.04.05-1.04.08

but that's not a very tight constraint

但这并不是什么非常严格的约束

1.04.08--1.04.12

any questions about the election timeouts

对于心跳期超时触发选举的这方面，你们有任何疑问吗？



1.04.15 - 1.04.29

one tiny point is that  you want to choose new random timeouts every timers there's every time I node resets its election timer

其中一个小问题是，你想每个计时器选择一个新的随机超时时间（我）来设置选举计时器

其中有一个小点就是，我们会想为每个选举计时器每次选择一个新的随机超时时间



01.04.29 - 01.04.36

 that is don't choose a random number when the server is first created and then we reuse that same number over and over again

在第一次创建服务器的时候，不要设定随机数

那么我们就要一次次重复使用相同的随机数了

当第一次创建服务器后，请不要选择一个随机数，然后我们不断使用该数字一遍又一遍

千万不要在服务器第一次创建的时候选择一个随机数，并在未来的选举中重复使用该数字

01:04:36,090 - 01:04:39

 because you make an unlucky choice that is

因为这个处理方式有坑



01:04:39 - 01:04:44

you choose this one server happens by ill chance to choose the same random number as another server 

这样处理，倒霉的时候，一个服务器可能会选择与另一台服务器相同的随机数





01.04.44 - 01.04.49

that means that you're gonna have split votes over and over again forever

那么就会有人和你一直竞争选票，也就永远选不出leader

那么这就意味着，你就会一直重复投票



01.04.49 - 01:04.58

that's why you want to almost certainly choose a different a new fresh random number for the election timeout value every time you reset the timer

这也就是为什么，当你每次重置选举计时器的时候，一定要选择一个不同的新的随机数来设置超时触发选举时间的原因



01:05:02

all right



01.05.03 - 01.05.06

so the final issue about leader election

关于leader选举的最后一个问题





01:05:06,800 - 01:05:10

suppose we are in this situation where the old leaders partition

假设我们处于这种情况，即老的leader遇上网络割裂

1.05.10-1.05.12

 you know the network cable is broken

比如，网线断了

1.05.12-1.05.17

and the old leader is sort of out there with a couple clients and a minority of servers

其中，有两台服务器在一个网络分区里（其中一台是老leader），它们是这些服务器中的少数派



01:05:17,219 - 01:05:21

and there's a majority in the other half of the network 

服务器中的多数派则是在另一半网络中

1.05.21-1.05.23

and the majority of the new half of the network elects a new leader

在多数派所在的网络分区中，它们选出了一个新的leader



1.05.23-1.05.25

 what about the old leader

那原来老的leader会怎么样呢？

1.05.25-1.05.33

why won't the old leader cause incorrect execution

为什么老的leader不会引起错误的执行结果呢

1.06.06-1.06.07

yes

说的没错

1.06.07-1.06.09

two potential problems

这里面有两个潜在问题

1.06.09- 1.06.12

one some non problem is that

其中一个不是问题的问题是

1.06.12-1.06.14

if there's a leader off in another partition

如果在另一个分区中有一个leader

1.06.14-1.06.15

and it doesn't have a majority

并且那里面的服务器数量并不占服务器总数量的大多数

1.06.15-1.06.19

then the next time a client sends it a request 

接着，当下次，一个Client向这个leader发送一个请求时

1.06.19-1.06.26

that leader that you know in a partition with a minority yeah it'll send out append entries

少数派服务器所在分区中的leader会对外发送AppendEntries

1.06.26-1.06.28

but because it's in the minority partition

但因为该leader所在的分区是少数派服务器所在的分区

1.06.28-1.06.33

it won't be able to get responses back from a majority of the server's including itself 

它没法收到来自多数派服务器那边（包括它自己在内，它并不在多数派服务器所在的那个分区内）的响应

它接收到的响应数加上它自己达不到大多数这个指标

1.06.33-1.06.36

and so it will never commit the operation

So，leader就永远没法提交操作了

1.06.36-1.06.37

it will never execute it

它也就永远不会去执行操作

1.06.37-1.06.41

it'll never respond to the client saying that it executed it either

它也就永远不会对Client进行响应：即表示它已经执行了该操作

1.06.41-1.06.49

and so that means that yeah an old server often a different partition， many clients may send a request

So，这就意味着，如果老的leader在另一个分区，那么当许多Client发送请求时

1.06.49-1.06.50

 but they'll never get responses

它们永远不会得到任何响应



1.06.50-1.06.58

so no client will be fooled into thinking that old server executed anything for it 

So，没有任何Client会蠢到认为老的leader执行了任何操作



1.06.58-1.07.06

the other sort of more tricky issue which actually I'll talk about in a few minutes is

实际上我稍后几分钟要讨论的一个更为棘手的问题是

1.07.06-1.07.19

the possibility that before server fails, it sends out append entries to a subset of the servers and then crashes before making a commit decision 

有一种会发生的可能情况是，在leader挂掉前，它向一部分服务器发送了AppendEntries，接着在做出提交操作的决定前，它挂掉了



1.07.19-1.07.22

and as a very interesting question

这是一个非常有意思的问题



01.07.24 - 01.07.27

which I'll probably spend a good 45 minutes talking about

我可能要花45分钟来谈论它





1.07.28-1.07.35

and so actually before I turn to the back topic in general any more questions about in leader election 

So，在我回到之前的话题前，你们对于leader选举有任何问题吗

1.07.35-1.07.40

okay



1.07.40-1.07.45

so how about the contents of the logs

So，日志的内容是怎样的

1.07.45-1.07.55 ！！！

and how in particular how a newly elected leader possibly picking up the pieces after an awkward crash of the previous leader 

尤其是当前一个leader崩溃后，一个新的被选举出来的leader如何交接的



1.07.55-1.08.07

how does a newly elected leader sort out the possibly divergent logs on the different replicas in order to restore sort of consistent state in the system

为了恢复系统的一致性状态，这个新leader该如何解决replicas上日志中发生分歧的地方



1.08.07-1.08.14

all right 



1.08.14-1.08.21

so the first question is what can think this is this whole topic it's really only interesting after a server crashes

So，在这整个话题中，真正最令我们感兴趣的就是服务器挂掉后所发生的事情

1.08.21-1.08.23

right if the server stays up 

如果服务器依然处于在线状态

1.08.23-1.08.26

then relatively few things can go wrong

那么相对而言，它里面几乎没有什么东西发生故障

1.08.26-1.08.31

 if we have a server that's up and has a majority you know during the period of time when it's up and has a majority 

如果我们所拥有的服务器处于在线状态，并且在选举期间，它获得了大多数的投票

1.08.31-1.08.36

it just tells the followers what the logs should look like

它就会告诉它的follower，日志应该是怎么样的

1.08.36-1.08.38

and the followers are not allowed to disagree

follower无权去拒绝这些

1.08.38-1.08.43

they're required to accept they just do by the rules of figure two，if they've been more or less keeping up

如果它们或多或少跟上了进度，它们就会按照Figure 2上所写的规则去做



1.08.43-1.08.51

you know they just take whatever the leader sends them AppendEntries appended to the log and obey commit messages and execute there's hardly anything to go wrong 

不管leader发给它们什么AppendEntries，它们都无脑的添加到log中，遵守提交的消息并执行它，这么做怎么都不会错


1.08.51-1.09.00

the things that go wrong in raft go wrong when a the old leader crashes sort of midway through you know sending out messages 

当老的leader对外发送消息的途中，它挂了，那么在Raft中，这就会出错

1.09.00-1.09.08

or a new leader crashes you know sort of just after it's been elected but before it's done anything very useful

或者是，当新的leader选出来后，但在它还没做任何有用的事情之前，它就挂掉了，这也会让raft出错

1.09.08-1.09.14

 so one thing we're very interested in is what can the logs look like after some sequence of crashes

So，我们所非常感兴趣的一件事就是，当连续发生了很多次崩溃后，日志会变成什么样

1.09.14-1.009.16

 okay



1.09.16-1.09.18

so here's an example

So，这里有一个例子


1.09.18-1.09.23

supposing we have three servers

假设我们有3台服务器

1.09.23-1.09.27

and the way I'm gonna draw out these diagrams

这是我画这些图的方式

1.09.27-1.09.33

 because we're gonna be looking a lot of sort of situations where the logs look like this

因为我们会通过这张图来看日志在各种情况下的样子

1.09.33-1.09.37

and we're gonna be wondering is that possible and what happens if they do look like that 

我们会想知道，如果发生了这些情况，这会怎么样


1.09.37-1.09.39

so my notation is going to be

So，我这里的表示方式是

1.09.39-1.09.48

I'm gonna write out log entries for each of the servers sort of aligned to indicate slots corresponding slots in the log

我这里所写下的每个服务器的日志条目都是对齐的，以此来表示日志中所对应的slot

1.09.48-1.09.56

and the values I'm going to write here are the term numbers rather than client operations

这里我所写的值是term号，而不是Client端的操作

1.09.56-1.09.58

I'm going to you know this is slot one this is slot 2

这里是slot 1，那里是slot 2

1.09.58-1.10.03

everybody saw a command from term three in slot 1 

在Slot 1中，每台服务器都会看到term 3中的一条命令

1.10.03-1.10.08

and server two and server three saw command from also term three 

服务器2和3也在term 3中看到了指令


1.10.08-1.10.11

and the second slot the server one has nothing there at all 

在第二个slot中，服务器1并没有看到任何东西

1.10.11-1.10.21

and so question for this like the very first question is can this arrive ？could this setup arise and how？

那么像最早的那个第一个问题一样，我所画的这种情况是会出现吗，怎么出现的？



1.10.21-1.10.31

yes

有人能说出这是怎么一回事吗？

1.11.02-1.11.08

so you know maybe server 3 was the leader for just repeating what you said maybe server 3 is the leader for term 3

正如你所说的那样，服务器3可能是term 3中的leader

1.11.08-1.11.12

he got a command that sent out to everybody. everybody received AppendEntries at the log

它向每个服务器发出一条命令，每个服务器收到后，会将它放入日志

1.11.12-1.11.16

and then I got a server 3 got a second request from a client 

接着，服务器3得到了来自一个Client端的第二个请求


1.11.16-1.11.19

and maybe it sent it to all three servers 

它可能向这三个服务器都发送了消息

1.11.19-1.11.24

but the message got lost on the way to server one or maybe server was down at the time or something 

但在将消息发送给服务器1的时候，消息丢了。或者服务器1在当时挂掉了，亦或者发生了其他的事情

1.11.24-1.11.25

and so only server 2

So，只有服务器2收到了信息

1.11.25-1.11.30

 the leader always append new commands to its log before it sends out append entries

leader始终在对外发送AppendEntries之前，先将新的命令追加到它的日志里面

1.11.30-1.11.33

and maybe the append entry RPC only got to server 2

可能只有服务器2收到了这个AppendEntries RPC

1.11.33-1.11.38

so this situation you know it's like the simplest situation and was actually the logs are not different 

So，这种情况是所有情况中最简单的，即日志没有什么不同的情况



1.11.38-1.11.43

and we know how it could possibly arise

并且，我们知道它是如何出现的

1.11.43-1.11.46

so if server 3 which is a leadership crash now

So，如果leader（服务器3）现在挂掉了

1.11.46-1.11..50

 you know the next server they're gonna need to make sure server 1


1.11.50-1.11.51

well first of all

Well，首先

1.11.51-1.11.55

if server 3 crashes 

如果服务器3挂掉了

1.11.55-1.11.57

or we'll be at an election and some of the leader is chosen

或者，我们处于某个选举，并且选出了某个服务器作为leader

1.11.57-1.11.58

 you know two things have to happen 

要知道，这里面会有两件事情必然会发生


1.11.58-1.12.05

the new leader has got to recognize that this command could have committed 

新的leader必须认识到，这些命令已经被提交了

1.12.05-1.12.07

it's not allowed to throw it away

我们不允许让它将这些命令给丢掉


1.12.07-1.12.15

and it needs to make sure server one fills in this blank here with indeed this very same command that everybody else had in that slot

新的leader需要确保服务器1把这里的空白（slot2）用和其他服务器中几乎一模一样的命令给填上

1.12.15-1.12.17

 all right



1.12.17-1.12.18

 so after a crash

So，在一次崩溃发生后

1.12.18-1.12.23

somebody you know server 3 suppose another way this can come up is

另一种可能会发生的情况是

1.12.23-1.12.25

 server 3 might have sent out the append entries to the server 2 

服务器3可能会往服务器2发送AppendEntries

1.12.25-1.12.27

but then crashed before sending the append entries to server 3 

但服务器3在发送这个AppendEntries前挂掉了

1.12.27-1.12.31

so if were you know electing a new leader

So，这样我们选出了一个新的leader

1.12.31-1.12.34

it could because we got a crash before the message was sent

因为原来的leader在发送消息前挂掉了

1.12.34-1.12.37

here's another scenario to think about

这里我们要思考另一种场景

1.12.37-1.12.39

three servers again 

这里有三个服务器


1.12.39-1.12.47

now I mean a number the slots in the log

现在我要给日志中的slot进行标号


1.12.47-1.12.57

 and so we can refer to them got slot 10 11 12 13

So，我们可以使用10,11,12,13这些数字来指代这些slot


1.12.57-1.13.02

again it's same setup 

这里和之前例子中的设置一样

1.1302-1.13.10

except now we have in slot 12  we have server 2 as a command from term 4

除了在slot 12中，服务器2收到了term 4中的一个命令

1.13.10-1.13.13

and server 3 has a term command from term 5

服务器3收到了一个来自term 5的命令



01.13.15 - 01.13.24 *************************

so you know before we analyze these to figure out what would happen and what would a server do if it saw this we need to ask could this even occur

So，在我们分析这些信息以找出会发生什么以及如果服务器看到此情况，服务器将做什么之前，我们需要询问这是否可能发生

01.13.24 - 01.13.30

because sometimes the answer to the question oh jeez what would happen if this configuration arose 

因为有时如果出现这种情况，这会发生什么呢？



01.13.30 - 01.13.33

sometimes the answer is it cannot arise so we do not have to worry about it 

So，有时对此的答案是，因为这并不会出现这种情况。因此，我们无须担心

01.13.34 - 01.13.38

the question is could this arise and how

So，这里的问题是，这种情况会发生吗？是如何发生的？

1.13.38-1.13.41

yeah

请问

01.13.58 - 01.14.02

all right so any

So，还有人想说吗？




01.14.59 - 01.15.02

in brief we know this configuration can arise

简单来讲，我们知道这种情况是可以出现的

01.15.03 - 01.15.06

 and so the way we can then get the four and a five here is

So，我们可以让这里出现4和5的方式是




01.15.07 - 01.15.08

let's suppose in the next leader election

我们假设在下一次leader选举中

1.15.08-1.15.10

 server two is elected leader

服务器2被选中作为leader

1.15.10-1.15.12

now for term 4, its elected leader

服务器2是term 4中所选出来的leader


01.15.12 - 01.15.16

 because a request from a client, it appends it to its own log and crashes

因为它收到了一个来自Client端的请求，它将该请求追加到它自己的日志上，然后崩溃了


01.15.16 - 01.15.18

 so now we have this 

So，现在我们就出现有这样的情况

01.15.19

right



01.15.20- 01.15.21

 we need a new election because the leader just crashed

我们需要开启一场新的选举，因为leader刚挂了

01.15.22 - 01.15.25

 now in this election 

在这场选举中

01.15.25 - 01.15.29

and then so now we have to ask whether who could be elected or we have to give back of our heads 

现在我们需要去问下，谁能被选为leader，我们必须将主导权交给这个leader



01.15.30 - 01.15.31

oh gosh what could be elected

Oh，谁会被选为leader呢？

01.15.32 - 01.15.33

 so we're gonna claim server three could be elected 

So，这里我们会声明服务器3可以被选为leader

01.15.33 - 01:15:35

the reason why I could be elected is

之所以它能被选为leader的原因是



01:15:35 - 01:15:39

 because it only needs request vote responses from majority

因为它只需要收到来自多数派服务器那头的RequestVote响应


1.15.39-1.15.41

 that majority is server one and server three

这里的多数派服务器指的是服务器1和3

1.15.41-1.15.45

 you know there's no problem no conflict between these two logs

因为它俩的日志中并没有问题，也没有冲突

1.15.45-1.15.49

 so server three can be elected for term five, get a request from a client

So，服务器3能在term 5中被选为leader，并且得到一个来自Client的请求

1.15.49-1.15.51

append it to its own log and crash 

并将其追加到它自己的日志中，然后崩了

01.15.51 - 01.15.55

and that's how you get this  this configuration

这就是我们遇见这种情况的原因

01.15.55 - 01.16.03

 so you know you need to be able to to work through these things 

So，你们需要能够去解决这些问题



01.16.04 - 01.16.11

in order to get to the stage of saying yes this could happen and therefore raft must do something sensible as opposed to it cannot happen

这个异常场景是可以发生的，而不是不可能发生，因此Raft必须去做明智的决策



01.16.09 - 01.16.14

because some things can't happen

因为某些事情不会发生，raft也就无须去考虑了


01.16.17 - 01.16.25

all right so so what can happen now？ we know this can occur

So，现在会发生什么呢？我们知道这种情况会发生

01.16.26 - 01:16:32

so hopefully we can convince ourselves that raft actually does something sensible

So，希望我们可以说服自己，raft实际上做了些很明智的事情

1.16.32-1.16.40

now as for the range of things before we talk about what raft would actually do 

到目前为止，之前我们所谈论的是raft会做什么

1.16.40-1.16.45 ******************

we need to have some sense of what would be an acceptable outcome

我们需要对可以接受的结果有所了解

什么才是可以接受的结果，我们要有一些认识

1.16.45-1.16.47

right 


1.16.47-1.16.50

and just eyeballing this

我们只需盯着这个



1.16.50-1.16.58

 we know that the command in slot 10 since it's known by all the replicas

我们知道在slot 10中的这条命令，所有的副本（replica）都知道它

1.16.58-1.16.59

it could have been committed 

它必然已经被提交了

1.16.59-1.17.01

so we cannot throw it away

So，我们没法将它给抛掉


1.17.01-1.17.04

similarly the command in slot 11

类似的，在slot 11中的这条命令

1.17.04-1.17.05

since it's in a majority of the replicas

由于服务器中的大多数都收到了这条命令

1.17.05-1.17.07

it could for all we know have been committed 

我们也就知道，它已经被提交了

1.17.07-1.17.09

so we can't throw it away

So，我们也没法将它给抛掉

1.17.09-1.17.10

the command in slot 12

再来看下slot 12中的命令

1.17.10-1.17.13

 however neither of them could possibly have been committed

可以看到，它们中没有服务器提交了这条命令



1.17.13-1.17.20  (不知道Raft需要做什么 --> 老师制定一个方案）

so we're entitled we don't know haven't we'll actually do but raft is entitled to drop both of these

So，我们不知道服务器有没有提交这两条命令，但raft有权去将这两条命令给drop了

1.17.20-1.17.26

 even though it is not entitled to drop it and either of the commands in a 10 or 11

虽然raft并没有权利去drop slot 10和11中的命令（因为多数派服务器都将这两个命令给落地了）

1.17.26-1.17.31

this is entitled dropped it's not required to drop either one of them

此处，raft有权去drop掉这4和5两个命令，但我并没有说drop的是哪一个命令


1.17.31-1.17.33

but I mean oh it certainly must drop one at least one

但我的意思是，这里至少要drop一个

1.17.33-1.17.37

 because you have to have identical log contents in the end

因为我们必须让最后的日志内容完全一样




1.17.44-1.17.45

this could have been committed it

这个应该已经被提交了

1.17.45-1.17.53

 we can't tell by looking at the logs exactly how far the leader got before crashing 

根据这个日志，我们不能准确地说出leader在崩溃前，它执行的进度到哪了

1.17.53-1.17.55

so one possibility is that

So，其中一种可能是


1.17.55-1.17.58

for this command or even this command

对于这个命令，或者甚至是这个命令

1.17.58-1.18.03

one possibility is that leaders send out the append messages with a new command

其中一种可能是，leader对外发送一个追加消息，里面放了一个新的命令

1.18.03-1.18.04

and then immediately crashed

接着，就立即崩溃了

1.18.04-1.18.06

so it never got any response back

So，它就永远没法得到任何返回的响应了

1.18.06-1.18.07

because it crashed

因为它挂了

1.18.07-1.18.10

so the old leader did not know if it was committed

So，老的leader就不知道这条记录有没有被提交

1.18.10-1.18.13

 and if it didn't get a response back

如果它没有拿到返回的响应

1.18.13-1.18.15

 that means it didn't execute it

这意味着它并没有执行这条命令

1.18.15-1.18.21

 and it didn't send out, but you know it didn't send out that incremented committed index 

但你们也知道，它并没有将这个已经增加后的committed index发送出去

1.18.21-1.18.24

and so maybe the replicas didn't execute it either 

So，副本（replica）可能也并不会去执行它


1.18.24-1.18.28

so it's actually possible that this wasn't committed

So，实际上，这条命令没有被提交的情况是有可能发生的

1.18.28-1.18.30

 so even though raft doesn't know

So，即使Raft并不知道这个

1.18.30-1.18.36

it could be legal for raft

对于raft来说，这可能是合法的


1.18.36-1.18.39

if raft knew more than it does know

如果raft知道的比它所知道的来得更多



1.18.39-1.18.44

it might be legal to drop this log entry

那么对于raft来说，将这个日志条目drop掉可能是合法的

1.18.44-1.18.45

because it might not have been committed

因为它可能并没有被提交

1.18.45-1.18.47

but because on the evidence

但因为根据证据来说

1.18.47-1.18.52

there's no way to disprove it was committed based on this evidence

根据证据来说，我们没法否认它被提交了

1.18.52-1.18.54

it could have been committed 

该日志条目可能已经被提交了

1.18.54-1.18.55

and raft can't prove it wasn't

并且raft也无法证明它没有被提交

1.18.55-1.18.57

so it must treat it as committed 

So，raft必须将它当做已经被提交的情况来处理

1.18.57-1.19.00

because the leader might have received it 

因为leader可能已经接收到这个追加条目

1.19.00-1.19.06

might have crashed just after receiving the append entry replies and replying to the client 

也可能是在接收到该追加条目，并回复Client端后，leader才挂掉的

1.19.06-1.19.15

so just looking at this we can't rule out the possibility that either possibility that the leader responded to the client 

So，仅看这个，我们无法排除这两种leader对Client端进行响应的情况

1.19.15-1.19.17

in which case we cannot throw away this entry

在这个情况下，我们无法将这个条目给丢掉

1.19.17-1.19.17

because a client knows about it

因为Client都知道这条条目已经被提交了


1.19.17-1.19.25

or the possibility the leader never did and yeah we could you know， if we have to assume that it was committed

或者说可能Leader压根就没有提交它，这里我们假设它已经被提交了

是我们假定slot 11中的命令已经被提交，但leader并没有去执行它

1.19.25-1.19.26

question

有疑问吗？

1.19.46-1.19.52

no there's no this situation maybe the server crash before getting the response 

No，在这个情况下，服务器可能在得到响应之前就挂掉了

1.19.52-1.19.56

alright well let's continue this on Thursday

Well，我们在周四再继续讨论这个吧



七十一  阅举报
