4-01
0-0.09

all right today I want to talk about bit more about fault tolerance and replication

好吧，今天我想谈谈更多关于容错和复制的东西



0.09-0.14

and then look into the details of today's paper about vmware ft

接着，我们要去看下今天我们所要读的paper Vmware FT里的一些细节



0.14-0.18

the topics still fault tolerance  to provide high availability

今天的主题依然是通过容错来提供高可用性方面的内容



0.18-0.20

that is you want to build a server 

我们想去构建一个服务器

0.20-0.23

that even if some hardware you know computer crashes is involved in the service

即使在服务的过程中遇上了硬件故障，比如计算机崩溃



0.23-0.25

we still like to provide the service

我们仍然想去提供服务

0.25-0.30

and to the extent we can we'd like to provide our service also if there's network problems 

如果出现网络问题，我们想在一定程度上依然能够提供我们的服务



0.30-0.34

and the tool we're using its replication for this part of the course

在这门课上，我们所使用的工具就是复制(Replication)



0.34-0.41

 so it's worth asking what kind of failures replication can be expected to deal with

So，值得一问的是，复制有望解决什么样的故障



0.41-0.45

because it's not everything by any means

因为从各种意义上来讲，它不是万能的


0.45-1.01

so maybe the easiest way to characterize the kind of failures we're talking about is fail stop failures of a single computer

在我们谈论fail-stop这类故障时，最简单的说法就是单个计算机发生了故障


1.01-1.11

 and what I mean by fail stop

我所说的fail-stop是什么意思呢？



1.11-1.14

it's a sort of generic term  in fault tolerance 

它是容错里面的一种通用术语

1.14-1.20

is that if something goes wrong， would say the computer simply stops executing 

如果某个东西突然出错，我们就会说计算机停止了执行

1.20-1.25

it just stops， if anything goes wrong 

如果有东西出错，那么计算机就歇菜了



1.25-1.30

and in particular it doesn't compute incorrect results 

特别是，它不会去计算错误的结果

1.30-1.34

so if somebody kicks the power cable out of your server

So，如果有人踹断了你服务器的电源线

1.34-1.37

 that's probably gonna generate a fail stop failure

这就可能会导致fail-stop故障的发生

1.37-1.44

 similarly if they unplug your servers network connection， even though the server is still running

类似的，如果他们把你服务器的网线拔了，即使你的服务器依旧在运行，也会遇上这种问题



1.44-1.45

 so this is a little bit funny 

So，这听上去有点搞笑

1.45-1.47

you know be totally cut off from the network

你们懂得，这样就完全切断了网络

1.47-1.49

 so it looks at me outside like it just stopped

外界看来，这就像是计算机停止运转了

1.49-1.54

so it's really these failures we can deal with replication 

So，这类故障我们可以通过备机（replication，复制，此处翻译为备机更恰当）来解决



1.54-1.59

this also covers some hardware problems

这类故障也包括硬件所引起的问题

1.59-2.01

 like you know maybe if the fan on your server breaks 

比如说，你服务器的风扇坏了

2.01-2.03

because it you know it cost 50 cents

它的价值可能就是50美分

2.03-2.06

maybe that'll cause the CPU to overheat

它可能会导致CPU过热

2.06-2.11

 and the CPU will shut itself down cleanly and just stop executing

这就会引起CPU过热保护，然后计算机直接歇菜了，不干活了

2.11-2.28

what's not covered by the kind of replication systems we're talking about is things like bugs in software or design defects in hardware

我们所讨论的这类Replication系统无法解决的问题是软件中存在的bug或者是硬件中的设计缺陷

我们所讨论的这类Replication系统不包含诸如软件中的bug或硬件中的设计缺陷


2.28-2.32

so basically not bugs

So，基本上来讲，这些bug没法解决

so，我们所涵盖的基本上来说不包含这些bugs

2.32-2.36

because if we take some service， you know say you're a MapReduce master for example

因为如果我们去提供某些服务，例如：MapReduce中的master

2.36-2.39

you know we replicated and run it on two computers

我们对它进行复制，并将它运行在两台计算机上

2.39-2.42

you know if there's a bug in your MapReduce master or my MapReduce master

如果在你们的MapReduce master或者是我的MapReduce master中存在了一个bug

2.42-2.45

let's say replications not going to help us

那么Replication并不会帮我们解决这个bug所引起的问题

2.45-2.52

we're going to compute the same incorrect result on both of our copies of our MapReduce master

我们还是会在我们的两个MapReduce master副本中计算出同样的错误结果

2.52-2.54

 and everything looked fine 

并且这一切看起来都没有什么问题



2.54-2.56

they'll agree you just happen to be the wrong answer 

我们只是碰巧得出了错误的答案

2.56-3.01

so we can't defending against bugs in the replicated software

So，我们无法在这种Replication软件中防范这种bug

3.01-3.06

and we can't defend against bugs in the whatever scheme we're using to manage the replication

不管我们用什么方案来管理replication，我们都无法防范这种bug

3.06-3.09

and similarly as I mentioned before

类似的，就像我之前提过的那样



3.09-3.14

we can't expect to deal with bugs in the hardware 

我们不指望去处理硬件中存在的bug



3.14-3.17

the hardware it computes incorrectly that's just that's the end for us

硬件所计算出的结果是错误的话，这对我们来说很致命

3.17-3.19

at least with this kind of technique

至少对于这种技术来讲是这样



3.19-3.24

although you know that said there are definitely hardware and software bugs

尽管这里说道，这里肯定存在硬件和软件上的bug

3.24-3.29

that replication might if you're lucky might be able to cope it 

如果你们足够幸运，复制可能能够应付得了这种问题

3.29-3.32

so if there's some unrelated software running in your server 

So，如果有一些不相干的软件在你的服务器上运行



3.32-3.34

and it causes the server to crash 

并且它让你的服务器崩溃

3.34-3.36

maybe because your kernel to panic and reboot 

因为你的内核可能会发生错误，并且重启

3.36-3.41

or something it has nothing to do with the service you're replicating

或者发生了一些与你复制的服务所无关的事情



3.41-3.46

then that kind of failure for us for your service will may well be fail stop

对于我们来说，遇上这种故障，你们的服务可能就会因为故障而停止



3.46-3.52

you know the kernel will panic and the backup replicas will take over 

你们懂的，主服务所在机器发生内核错误，那么备用replica就会顶上去接管

3.52-4.02

similarly some kinds of hardware errors can be turned into fail stop errors 

类似的，某些硬件错误会导致fail-stop错误



4.02-4.06

for example if you send a packet over the network

例如，如果你通过网络发送数据包



4.06-4.09

and the network corrupts，it just flips a bit in your packet

接着，网络出现了点问题，传输的过程中，你的数据包中某些东西出了点问题

4.09-4.12

that will almost certainly be caught by the checksum on the packet

这个错误肯定会被数据包中的checksum所捕获

4.12-4.14

 same thing for a disk block

对于磁盘中的block块来说也是如此

4.14-4.17

if you write some data to disk and read it back a month later

如果你往磁盘中写入数据，然后一个月后再去读取这些数据时

4.17-4.23

you know maybe the magnetic surface isn't perfect and you know one of the disk couple of bits were wrong in the block

由于磁表面并不完美，其中一块磁盘中某个block处的某几个bit可能会出问题



4.23-4.25

 as it's right back it's actually error correcting code

实际上通过检错码，我们就能正确地将它读取



4.25-4.28

that up to a certain point will fix errors in disk blocks

它能在一定程度上修复磁盘block中的错误

4.28-4.35

that you'll be turning you know random hardware errors into as either correcting them 

这种随机硬件错误，我们可能可以将它们修复

4.35-4.42

if you're super lucky, or at least detecting them and turning random corruption into a detected fault

如果运气超好，至少能检测出这些问题，并将这种随机损坏的地方转为一个可检测到的错误

4.42-4.51

 which you know the software then knows that something that wrong and can turn it into a fail stop fault by stopping executing or take some other remedial action

然后软件就知道某处有错误，可以通过停止执行或者采取其他补救措施将其转变为fail-stop故障

4.51-4.59

 but in general we really can only expect to handle fail stop faults

但一般来讲，我们真的只能期待出现的错误是这种可处理的fail-stop错误（知秋注：而不是软件中的bug或硬件本身设计缺陷）

可以处理这种fail-stop错误



4.59-5.03

 there's other limits to replication too

对于Replication来说，它还有其它一些限制

5.03-5.10

you know the failures in the if we have a primary in the back of our two replicas or whatever 

有这么一种故障，如果我们有一个primary（主）和两个replica（备机）

5.10-5.14

we're really assuming that failures in the two are independent

我们更希望这两个replica中可能发生的故障是彼此独立互不相干的

5.14-5.18

right if there tend to have correlated failures

如果它们中出现的是相干的故障（知秋注：发生的是同一种故障）

5.18-5.20

then replication is not going to help us

那么Replication也无法帮我们解决问题

5.20-5.28

so for example, if we're a big outfit and we buy thousands of computers batches of thousands of computers identical computers from the same manufacturer 

例如，如果我们从同一个生产商那里购买了成百上千台完全一样的计算机

5.28-5.34

and we run you know our replicas is on all on those computers we bought at the same time from the same place

我们在同一地点同一时刻将我们的replica运行在我们所买的这些计算机上

5.34-5.36

 that's a bit of a risk

这就存在了点风险



5.36-5.40

maybe because presumably if one of them has a manufacturing defect in it 

因为如果其中一台里面有制造缺陷的话

5.40-5.42

there's a good chance that the other ones do too

那么其他计算机中也可能存在这种制造缺陷

5.42-5.49

you know one of them's prone to overheating because the manufacturer you know didn't provide enough airflow well

假设因为制造商并没有提供足够的散热能力，这让其中一台机器容易出现过热的情况



5.49-5.51

it probably all had that problem

那么对于所有我们买的计算机而言，它们都可能存在这个问题



5.51-5.53

and so one of them overheats and dies

So，其中一台过热并且死机或者关机的话



5.53-5.56

 it's a good chance that the other ones will too

那么对于其他计算机来说，它们也会发生这种事情



5.56-6.00

 so that's one kind of correlated failure you just have to be careful of 

So，这就是一种你们需要注意的关联性故障



6.00-6.06

another one is that you know if there's an earthquake，and the city where our datacenter is probably gonna take out the whole data center 

另一种你需要注意的是，如果遇上了地震，那么受到地震影响的那个城市的数据中心可能就全废了

6.06-6.09

you know we can have all the replication we like inside that data center 

你们知道，我们喜欢将所有的副本都放在这个数据中心

6.09-6.10

it's not going to help us

这对我们来说并没有什么用

这也就做不到它的本职工作了

6.10-6.19

because the failure caused by an earthquake or a citywide power failure or something the building burning down is like it's correlated failure between our replicas if they're on that building

因为如果我们的replica都在同一个楼里面，遇上这种由地震，城市供电故障或者大楼发生火灾所引起的故障，那么这就是一种相干的故障了

6.19-6.22

so if we care about dealing with earthquakes

So，如果我们去关心如何处理由地震对我们产生的影响

6.22-6.33

then we need to put our replicas in maybe in just different cities at least physically separate enough that they have separate power unlikely to be affected by the same natural disaster

那么，我们就需要将我们的replica放在不同的城市，至少是在物理意义上的分开，这样它们使用的就是独立的供电，这样它们就不会因为同一场自然灾害而受到影响了



6.33-6.36

okay 



6.36-6.42

but that's all sort of covering in the background for this discussion where we're talking about the technology you might use 

这就是本次要讨论的相关背景知识，我们所讨论的就是你可能用到的技术

这些是我们所讨论的你可能用到的技术所涵盖的相关背景知识

6.42-6.47

another question about replication is whether it's worthwhile

关于replication（复制）的另一个问题就是，它是否值得使用



6.47-6.57

you may ask yourself gosh you know this literally uses these replication schemes use twice as much or three times as much computer resources

你可能会问自己，我们知道使用这种复制方案会使用2倍或者3倍的计算机资源



6.57-7.02

right we need to have you know GFS had three copies of every blocks， we have to buy three times as much disk space

正如你们知道的那样，GFS会为每个block保存三份副本，那我们就不得不多买3倍的磁盘空间



7.02-7.06

 the paper for today you know replicates just once

在今天的paper中，我们知道只需要一份副本即可



7.06-7.09

but that means we have twice as many computers and CPUs and RAM

但这就意味着，我们需要买两倍数量的计算机、CPU和RAM



7.09-7.10

 it's all for expensive

这些都很贵

7.10-7.12

like is that really worth it that expense 

我们这种花费是否值得呢？



7.12-7.17

and you know that's not something we can answer technically

你们知道，这些事情我们无法从技术的角度来回答



7.17-7.19

right it's an economic question

这是一个经济上的问题

7.19-7.22

 it depends on the value of having an available service 

它取决于可用服务的价值



7.22-7.24

you know if you're running a bank

如果你们正在经营一家银行

7.24-7.30

and if the consequence is the computer failing is that your customer you can't serve your customers and you can't generate revenue

如果你们的服务器出现故障，你无法为你的客户提供服务，而且你也无法产生收入



7.30-7.32

and your customers all hate you

那么你的客户就会痛恨你

7.32-7.38

then it may well be worth it to blow you know an extra ten or twenty thousand bucks on a second computer 

那么这对于你来说，为第二台服务器多花1万或者2万是值得的

7.38-7.40

so you can have a replica

So，这样你们就可以使用replica了

7.40-7.44

on the other hand if you're me and you're running the 6824 web server

另一方面，如果你是我的话，并且上面运行着6.824相关程序的web服务器

7.44-7.51

I don't consider it worthwhile to have a hot backup of the 6824 web server 

我不觉得对这个服务器进行热备份是值得的



7.51-7.53

because the consequences of failure are very low 

因为故障所带来的后果是非常小的

7.53-8.09

so the whether the replication is worthwhile on how many replicas you ought to have and how much you're willing to spend on it is all about how much cost and inconvenience failure would  cause you

replication是否值得取决于你想要多少个replica，你想花多少钱，以及遭受故障后会对你产生多少影响，它是由这些来决定的

8.09-8.18

 all right this paper sort of in the beginning mentions as there's a couple of different approaches to replication 

这篇paper在一开始就提到我们可以使用两种不同的方法来进行replication

8.18-8.20

really mentions two 

它里面提到了两种方案


8.20-8.28

one calls state transfer 

一种被称为state transfer （状态转移）



8.23-8.31

and the other calls replicated state machine 

另一种被称为Replicated State Machine 

8.31-8.37

most of the schemes we're going to talk about in this class are replicated state machines

我们在这门课中讨论最多的方案就是Replicated State Machine 


8.37-8.42

but I'll talk about both anyway

但总之我两者都会讨论

8.42-8.44

 the idea behind state transfer's 

状态转移（state transfer）背后的思路是



8.44-8.47

that if we have two replicas of a server 

如果我们一个服务器有两个replica

8.47-8.54

the way you cause them to be to stay in sync that is to be actual replicas

我们让它们保持同步的方式就是让它们变成replica

作为replicas，你要做的就是让它们与该主服务器保持同步

8.54-9.00

so that the backup can has everything it needs to take over if the primary fails

如果primary故障了，那么backup（备机）就能接管它所需要的一切东西

9.00-9.05

 in a state transfer scheme， the way that works is that the primary sends a copy of its entire state

在状态转移（state transfer）方案中，它的工作原理是让primary发送一个它整个状态的副本给backup



9.05-9.09

 that is for example the contents of its RAM to the backup 

例如，将它RAM中的内容发送给backup

9.09- 9.12

and the backup just sort of stores the latest state

backup会去保存最新的状态



9.12-9.20

 and so it's all there the primary fails in the backup can start executing with this last state it got， if the primary fails

如果primary发生了故障，那么backup（备机）就能从它所拥有的最近的状态开始执行



9.20-9.24

 so this is all about sending the state of the primary

So，这就是关于将primary的状态发送给backup所发生的事了

9.24-9.29

if today's paper worked as a state transfer system which it doesn't 

如果今天paper中主要提的内容是状态转移系统（虽然它并没有）

9.29-9.35

then the state we'd be talking about would be the contents of the RAM the contents of the memory of the primary

那么我们要讨论的状态指的就是primary内存中的内容

9.35-9.41

 so maybe every once while the primary would just you know make a big copy of its memory and send it across the network to the backup

So，primary可能会将它的内存进行拷贝，并将拷贝后的东西通过网络发送给backup（备机）

9.41-9.43

you can imagine if you wanted to be efficient you know

你们可以想象下如果你们想变得高效

9.43-9.49

maybe you would only send the parts of the memory that it's changed since the last time you sent in memory to the backup 

那么我们只需发送内存中上次发送后修改过的部分给backup（备机）就可以了

9.49-10.02

the replicated state machine, this approach observes that most services are most computer things we want to replicate have some internal operation

在Replicated state machine这种方法中，我们想去复制的是大部分服务中的某些内部操作

对于Replicated state machine，我们想要复制的是某些内部操作

10.02-10..08

that's deterministic except when external input comes in 

除非有外部输入介入，不然它就是确定性的

10.08-10.12

right you know ordinarily if there's no external influences on a computer 

你们知道，通常情况下，如果一台计算机没有受到任何外部影响

10.12-10.14

it just executes one instruction after another

那么它会执行完一条指令后，执行另一条指令



10.14-10.20

and what each instruction does is a deterministic function of what's in the memory and the registers of the computer

每条指令所做的就是去执行一个确定的函数，即通过内存中和寄存器中的内容来得到一个结果

10.20-10.26

and it's only when external events intervene，that something unexpected may happen

只有当外部事件介入时，才会发生某些预料之外的事情



10.26-10.33

like a packet arrives of a some random time and that causes the server to start doing something differently

比如，服务器在随机某个时间点接收到了一个数据包，这就会让服务器开始做一些不同的事情

10.33-10.40

so replicated state machine schemes don't send the state between the replicas 

So， 在Replicated state machine方案下，它不会往replica之间发送状态

10.40-10.42

instead，they just send those external events

相反，它们只会发送那些外部事件

10.42-10.47

they just send maybe from a primary to a backup again

即将这些外部事件从primary（主）发送到backup（备机）

10.47-10.57

just send things like arriving input from the outside world that the backup needs to know

即发送给backup（备机）那些它需要知道的来自于外界的输入

10.53-10.58

and the observation is that you know if you have two computers and they start from the same state

如果你有两台计算机，并且它们是从同一个状态开始运行的

10.58-11.05

and they see the same inputs that in the same order or at the same time

它们以相同的顺序或者是同一时间看到了相同的输入

11.05-11.13 ****

the two computers will continue to be replicas of each other and sort of execute identically as long as they both see the same inputs at the same time

只要两台计算机同时看到相同的输入，两台计算机彼此之间就继续互为replica，并执行相同的操作


11.13-11.18

so this transfers probably memory

So，在状态转移中转移的可能是内存中的内容

11.18-11.28

 and this transfer some primary backup just operations from clients or external inputs or external events 

这里primary（主）发送给backup（备机）的只是来自Client端或者是外部输入或外部事件的操作

11.28-11.40

and you know the reason why people tend to favor a replicated state machine is that usually operations are smaller than the state

人们更倾向于使用Replicated state machine的原因是操作的大小要远小于状态的大小

11.40-11.46

but this you know the state of a server if it's a database server might be the entire database might be you know gigabytes

但你们要知道，一个服务器的状态，如果它是一个数据库服务器，那么你就得发送整个数据库，它可能有GB级大小

11.46-11.53

 whereas the operations are just some clients sending and you know please read or write key 27 operations are usually small 

然而这些Client端发送过来的操作都很小，比如说，读取或写入Key为27的那个东西，总之，操作的大小通常都很小

11.53-11.57

the states usually large so replicate a state machine usually looks attractive 

然而，状态的体积通常都很大，So，Replicated state machine通常看起来更加吸引人



11.57-12.08

and slight downside is that the schemes tend to be quite a bit more complicated and rely on sort of more assumptions about how the computers operate

就是这种方案（Replicated state machine）做起来往往复杂得多，而且它基于更多有关计算机如何操作的假设

12.08-12.10

whereas this is a really heavy handed

对于状态转移（state transfer）而言，其实蛮简单的，纯体力活



12.10-12.14

I'm just gonna send you my whole state sort of a nothing to worry about

我只需将我的整个状态发送过去，你其他啥也不用想，接收就行

12.14-12.16

any questions about these strategies

对于这些策略有任何疑问吗？

12.16-12.27

 yes

请问



12.27-12.36

well, ok so the question is suppose something went wrong with our scheme and the backup was not actually identical to the primary

Well，Ok，他的问题是假设我们的方案出现了点问题，backup（备机）实际上和primary（主）并不完全一致

12.36-12.45

so you know you're suppose we were running GFS master 

假设我们正在运行GFS master

12.45-12.52

and it's the primary it just handed out a lease to chunk server one

primary（主）刚给Chunk服务器1颁发了一份lease租约

它给primary（主）也就是Chunk服务器1颁发了一份lease租约

12.52-13.01

but because the two you know because we've allowed the states of the primary back to drift out of sync the backup, did not issue a lease to anybody

因为我们已经允许primary（主）的状态可以不同步

backup（备机）不会向其他人发出一个lease

因为我们允许primary（主）的状态与backup（备机）的状态不同步，所以没有向任何人发出租约

13.01-13.03

it wasn't even away or anybody had asked for the lease

它也不会让其他人拿到这个lease

13.03-13.07

so now the primary thinks you know chunks server 1 has lease  for some chunk in the backup doesn't

So，现在primary（主）会这么想，Chunk服务器1中的某些Chunk已经有了lease，然而，backup（备机）并没有

So，现在primary（主）会这么想，即Chunk服务器1有某些Chunk的lease，而其他backup（备机）并没有

13.07-13.10

 the primary fails，backup takes over 

如果primary（主）发生故障，那backup（备机）就会去接手

13.10-13.13

right now chunk server 1 thinks it has a lease for some chunk

现在，Chunk服务器1（即primary）觉得它拥有某些chunk的lease（知秋注：虽然出问题了，但没挂）



13.13-13.18

but then the current master doesn't 

但当前的master并不这么认为

13.18-1.20

and is happy to hand out the lease to some other chunk server 

它乐于去将lease颁发给其他Chunk服务器（知秋注：又设立了一个新的primary）

13.20-13.22

now we have 2 chunk servers serving the same lease

现在，我们有2个Chunk服务器，它们都有相同的lease



13.22-13.25

okay so that's just a close to home example

Ok，这个和我们作业中的例子很像

13.25-13.35

but really you know almost any bad thing and kind of I think you construct any bad scenario by just imagining some service that confuse the wrong answer

我觉得你们可以想象下某些会产生错误答案的服务，这样你们就可以构造出任何糟糕的情形了

13.35-13.37

because the state's leverage

因为这就是状态带来的影响

13.37-13.43

yes

请问



13.43-13.45

so you're asking about randomization

So，你是在问随机化的问题吗？



13.45-13.55

yeah oh I'll talk about this a bit later on

Oh，我会在之后谈论这个

13.55-13.56

 but it is good

但它确实是个好问题



13.56-14.02

that the replicated state scheme definitely makes the most sense

Replicated state策略绝对很有意义

14.02-14.08

 when the instructions that the primary in the backup of our executing do the same thing as long as there's no external events 

只要没有外部事件介入的情况，primary（主）和backup（备机）就会去做一模一样的事情



14.08-14.10

right and that's almost true right

只要没有外部事件发生，那几乎就是对的， 



14.10-14.14

you know for an add instruction or something yeah you know

对于add指令或者其他指令来说就是这样

14.14-14.16

if the registers or memory are the same 

如果寄存器或内存中的内容相同

14.16-14.18

and they both execute an add instruction 

它们都执行一个add指令

14.18-14.20

they had insurgents kind of the same inputs and the same outputs

它们有相同的输入，就会得到相同的输出结果

14.20-14.26

but they're in some instructions as you point out that don't like maybe there's an instruction that gets the current time of day

但在执行某些指令的时候，它们得到的结果可能不一样，比如说，让它们去执行一个获取当前时间的指令

14.26-14.29

 now probably be executed at slightly different times

因为执行的时间上可能有轻微差异

14.29-14.35

 or an instruction that gets the current processors unique ID and a serial number it's going to yield the different answers 

或者我们所要执行的指令是用来获取当前处理器的唯一ID和序列号之类的，那么它们俩生成的答案就会不同

14.35-14.40

and the uniform answered the questions that sound like this

对于解决这些问题的统一答案听起来应该是这样的

14.40-14.45

 is that the primary does it and sends the answer to the backup

即primary（主）完成执行后，将答案发送给backup（备机）

14.45-14.47

 and the backup does not execute that instruction

backup（备机）不会去执行该指令



14.47-14.51

but instead at the point where it would execute that instruction

但相反，此时它会去执行该指令

以此来代替它（备机）去执行该指令

14.51-14.57

it listens for the primary to tell it what the right answer would be and just sort of fakes that answer to the software

它会去监听primary（主）并告诉它正确答案是什么，并将该答案发给软件（知秋注：让你错觉是我自己执行了）

14.57-15.02

I'll talk about you know how the VMware scheme does that

我会去讨论VMware他们的方案是如何做的



15.02-15.04

okay 



15.01-15.06

interestingly enough 

有趣的是

15.06-15.10

though today's paper is all about a replicated state machine

尽管今天的paper全都是关于replicated state machine


15.10-15.14

you may have noticed that today's paper only deals with you know processors 

你们可能已经注意到，今天的paper只针对单处理器的机器

15.14-15.21

and it's not that clear how it could be extended to a multi-core machine

它并没有明确指出该如何扩展到多核机器上

15.21-15.26

where the interleavings of the instructions from the two cores are non-deterministic

来自两个core所交错执行的指令的顺序是不确定的

15.26-15.29

 all right so we no longer have this situation on a multi-core machine 

So，我们并不支持在多核机器上使用这种方案

15.29-15.31

Well if we just let the primary and backup execute

Well，如果我们让primary（主）和backup（备机）都执行

15.31-15.34

they're you know all else being equal they're going to be the same

在其他条件都相同的情况下，那么它们执行的结果也是相同的

15.34-15.36

 because they won't execute on multiple cores

因为它们并没有在多核机器上执行

15.36-15.43

 VMware has since come out with a new possibly completely different replication system that does work on multi-core

Vmware实际上已经推出了一套新的完全不同的Replication系统，它能够运用在多核机器上



15.43-15.50

and the new system appears to me to be using state transfer instead of replicated state machine

在我看来，这种新系统似乎正在使用的是状态转移（state transfer）而不是Replicated state machine



15.50-15.55

 because state transferred is more robust in the face  of multi-core and parallelism

因为状态转移（state transfer）在处理多核和并行这些方面来说更加强大

15.55-16.03 ！！！！

if you use the machine and send the memory over you know that the memory image is just the state of the machine 

如果你在使用一台机器时，将它内存中的内容（即该机器的状态）发送出去

16.03-16.05

and sort of it doesn't matter that there was parallelism

它并不在意这里是否并行

16.05-16.09

whereas the replicated state machine scheme really has a problem with the parallelism

然而，Replicated state machine这套方案在处理并行上就会出现问题

16.09-16.16

you know on the other hand I'm guessing that this new multi-core scheme is more expensive

另一方面，我猜测这种新的多核方案使用起来的代价会更加得高

16.16-16.19

okay



16.19-16.22

all right 



16.22-16.26

so if we want to build a replicated state machine scheme 

So，如果我们想去构建一套replicated state machine方案



16.26-16.28

we got a number of questions to answer 

那我们需要回答一大堆问题

16.28-16.33

so we need to decide at what level we're gonna replicate state

So，我们需要判断我们该在哪个层面进行状态复制


16.33-16.44

 right so what state what do we mean by state

So，我们所说的状态是什么呢？

16.44-16.49

we have to worry about how closely synchronized the primary and backup have to be

我们需要去考虑primary（主）和backup（备机）的同步程度是要多紧密

16.49-16.49

right



16.49-16.56

because it's likely the primary will execute a little bit ahead of the backup after all it it's the primary that sees the inputs 

因为当primary（主）接收到输入后，它要比backup（备机）略微提前点执行操作

16.56-16.58

so the backup almost necessarily must lag

So，backup（备机）必定总是会有一定的延迟

16.58-17.07

that means there's an opportunity if the primary fails for the backup not to be fully caught up 

这就意味着，如果primary（主）发生了故障，那么backup（备机）就不一定能完全赶上primary的进度

17.07-17.14

having the backup actually executes really in lockstep with the primaries for expensive 

实际上要让backup（备机）和primary（主）完全同步，这要付出的代价会非常大


17.14-17.15

because it requires a lot of chitchat

因为这就需要大量的通信了

17.15-17.25

so a lot of designs a lot of what people sweat about is how close the synchronization is

人们在关于同步的紧密程度上要付出大量的努力

so 在如何保持紧密同步上人们进行了大量设计，付出了大量精力

17.25-17.30

if the primary fails or you know actually if the backup fails too

如果primary（主）发生了故障或者backup（备机）也发生了故障

17.30-17.32

but it's more exciting if the primary fails 

但如果primary（主）发生了故障，那会让我们更兴奋

17.32-17.34

there has to be some scheme for switching over

那么我们就必须切换为某些方案


17.34-17.47

 and the clients have to know oh gosh I instead of talking to the old primary on server one I should now be talking to the backup on server 2

Client就必须知道它们不应该和服务器1上这个老的primary（主）进行通信，而是和服务器2上的backup（备机）进行通信

17.47-17.49

all the clients have to somehow figure this out 

所有Client端就必须通过某种方式来解决这个问题

17.49-18.00

the switch over almost certainly it's almost impossible maybe impossible to design a cut over system in which no anomalies are ever visible 

在没有异常可见的情况下，去设计一种切换系统几乎是不可能的事情

18.00-18.02

you know in this sort of ideal world

在理想情况下

18.02-18.03

if the primary fails

如果primary（主）发生了故障

18.03-18.06

 we'd like nobody to ever notice none of the clients to notice

我们希望没人去注意到这个故障，没有任何Client端会注意到这个故障



18.06-18.10

 turns out that's basically unattainable

事实证明这基本上是不可能的


18.10-18.17

so there's going to be anomalies during the cut over and we've gotta figure out a way to cope with them

So，在备机切换到主机的过程中会出现异常，我们必须想出一种方法来应对它们

18.17-18.21

 and finally if the one of the two, if one of our replicas fails

最后，如果我们其中一个replica发生了故障



18.21-18.24

 we really need to have a new replica right

那我们真的需要一个新的replica



18.24-18.27

if we have a two replicas and one fails

如果我们有两个replica，然而其中一个发生了故障

18.27-18.29

 we're just living on borrowed time right

我们只能继续苟延残喘

18.29-18.32

because the second replica may fail at some point

因为第二个replica可能会在某个时候发生故障

18.32-18.38

so we absolutely need to get a new replica back online as fast as possible

So，我们必须尽可能快的拿到一个新的replica，并让它上线



18.38-18.42

 so that can be very expensive 

这样做代价可能非常昂贵



18.42-18.43

the state is big 

状态的体积会很大

18.43-18.49

you know you know  the reason we like to replicated state machine was because we thought state transfer would be expensive

你们要知道，我们之所以喜欢Replicated state machine的原因是因为，我们觉得状态转移（state transfer）的代价太高了

18.49-18.53

 but the two replicas in a replicated state machine still need to have full state

但在使用Replicated state machine的情况下，两个replica依然需要有完整的状态

18.53-18.56

right we just had a cheap way of keeping them both in sync

我们通过这种代价很低的方式来让它们保持同步



18.56-18.58

 if we need to create a new replica

如果我们需要去创建一个新的replica

18.58-19.02

we actually have no choice but state transfer to create the new replicas

实际上，我们别无选择，只能使用状态转移（state transfer）来创建一个新的replica

19.02-19.04

the new replica needs to have a complete copy of the state 

新的replica需要有一个该状态的完整拷贝



19.04-19.08

so it's going to be expensive to create new replicas

So，创建一个新的replica的代价很高




19.08-19.18

 and this is often people spending well actually people spend a lot of time worrying about all these questions 

实际上，人们经常会在所有这些问题上花大量的时间去思考

实际上，人们经常会花大量精力来思考这些问题

19.18-19.23

and you know we'll see them again as we look at other replicated state machine schemes

当我们在看到其他Replicated state machine方案时，我们会再次看到这个







==========================================================================


19.23-19.35

 so on the topic of what state to replicate，the today's paper has a very interesting answer to this question

关于我们该去复制什么样的状态，今天的paper中给出了一个令我们很感兴趣的答案

19.35-19.38

 it replicates the full state of the machine

它复制了该机器的全部状态



19.38-19.43

that is all of memory and all the Machine registers

即复制了内存中所有的内容以及机器寄存器中的所有内容

19.43-19.47

it's like a very very detailed replication scheme

这就像是一种非常细节性的复制方案

19.47-19.53

 just no difference at the even of the lowest levels between the primary and the backup

完全一模一样，甚至连primary和backup的底层也是如此

19.53-19.56

that's quite rare for replication schemes

在众多Replication 方案中，这种真的相当少见

19.56-19.59

almost always you see something that's more like GFS

你几乎只能在GFS这样的东西中看到部分实现

19.59-20.02

Well GFS absolutely did not replicate

Well，GFS绝对没做这种复制

20.02-20.10

you know they had replication but it wasn't replicating every single you know bit of memory between the primaries and the backups

它们确实做了复制，但它们并不会去复制primary（主）和backup（备机）中每个内存中的东西

20.10-20.15

it was replicating much more application level table of chunks

它所做的，更多的是复制应用程序层面的Chunk表



20.15-20.18

I had this abstraction of you know chunks and chunk identifiers and that's what it was replicating

我有chunk和chunk id的抽象，这才是它要复制的东西

20.18-20.27

 it wasn't replicating sort of everything else wasn't going to the expense of replicating every single other thing that machines we're doing

它不会去复制所有东西，它不会去复制我们机器所正在干的事情以外的东西

20.27-20.35

okay as long as they had the same sort of application visible set of of chunks

Ok，它们所要做的只是拿到并拥有对该应用程序可见的相同Chunk集合

20.35-20.40

so most replication schemes out there go the GFS route 

So，大多数复制方案中都采用GFS路线

20.40-20.48

in fact almost everything except pretty much this paper and a few handful of similar systems

实际上几乎所有东西，除了paper上谈到的Remus和少数类似系统

20.48-20.54

almost everything uses application at some level application level of replication 

几乎所有系统都在应用程序级别上使用了某种程度的复制



20.54-20.56

because it can be much more efficient 

因为它可以更加高效







一百一十四  阅举报
你上次在这里
4-02
20.56-21.06

because we don't have to go to the trouble of for example making sure that interrupts occur at exactly the same point in the execution of the primary and backup

我们无须去考虑这种情况：即primary和backup在执行的同一时刻，突然发生了中断问题



21.06-21.08

GFS does not sweat that at all 

GFS一点也不担心这点



21.08-21.10

but this paper has to do 

但在这个paper中，他们必须考虑这点

21.10-21.12

because it replicates at such a low level

因为它所复制的是很底层的东西

因为这里它所进行的复制处于系统很低的级别

21.12-21.17

so most people build efficient systems with applications specific replication 

So，大多数人所构建的高效系统，都是特定于应用程序层面级别的复制



21.17-21.22

the consequence of that though is that the replication has to be built into the application

这样做的后果就是，这种复制必须内置在应用程序内部



21.22-21.27

right if you're getting a feed of application level operations for example

例如，如果我们拿到了一系列应用程序级别的操作

21.27-21.30

you really need to have the application participate in that 

那么我们就需要让应用程序参与到其中

21.30-21.39

because some generic replication thing like today's paper doesn't really can't understand the semantics of what needs to be replicated

因为正如今天的paper中那样，机器并不能理解哪些东西需要被复制的语义

21.39-21.43

so anyways

但总之

21.43-21.48

so most teams are application specific like GFS and every other paper what we're going to read on this topic 

So，大多数团队所做的都是针对应用程序层面的，例如GFS。我们之后要读的关于这类话题的paper也是如此





21.50-21.51

 today's paper is unique

今天的这篇paper比较特别

21.51-21.54

in that it replicates at the level of the machine

它所复制的是机器层面的东西

21.54-21.57

 and therefore does not care what software you run on it

因此，它并不在意我们在它之上运行的是什么软件

21.57-22.01

 right it replicates the low-level memory and machine registers 

它会去复制底层内存中的东西，以及机器寄存器中的东西

它会去复制操作系统低级层面内存和机器寄存器中的东西

22.01-22.03

you can run any software you like on it

你可以在其之上运行任何你想要的软件

22.03-22.05

as long as it runs on that kind of microprocessor

只要它能在这种微处理器上运行

22.05-22.08

that's being represented this replication scheme applies to 

那它就能使用这种复制方案



22.08-22.10

the software can be anything

它可以是任何软件



22.10-22.16

and you know the downside is that it's not that efficient necessarily

你们懂的，它的缺点就是没那么高效

22.16-22.19

the upside is that you can take any existing piece of software

它的优点是我们可以使用任何现有的软件

22.19-22.23

maybe you don't even have source code for it or understand how it works 

可能你甚至都不需要有它的源码或者理解它的工作方式



22.23-22.29

and you know do within some limits you can just run it under VMware this replication scheme 

我们可以在VMware中使用这种复制方案来运行软件

22.29-22.30

and it'll just work

并且它能跑的起来



22.30-22.37

which is sort of magic fault-tolerance wand for arbitrary software

对于任何软件来说，这种容错能力实在是太神奇了



22.37-22.42

 all right 



22.42-22.50

now let me talk about how this is VMware Ft works 

现在，让我来谈论下Vmware Ft是如何工作的

22.50-22.51

first of all

首先



22.51-22.53

VMware is a virtual machine company

VMware是一家虚拟机公司

22.53-22.59

 they're what their business is a lot of their business is selling virtual machine technology

他们的大多数业务是销售虚拟机技术



22.59-23.01

and what virtual machines refer to

虚拟机指的是



23.01-23.06

 is the idea of you know you buy a single computer

假设你买了一台电脑



23.06-23.11

and instead of booting an operating system like Linux on the hardware you boot

我们并不是像往常那样通过硬件来启动操作系统，例如：Linux


23.11-23.18

we'll call a virtual machine monitor or hypervisor on the hardware 

我们会在硬件之上去调用一个虚拟机监视器（VMM）或者Hypervisor

23.18-23.27

and the hypervisor's job is actually to simulate multiple multiple computers multiple virtual computers on this piece of hardware

Hypervisor的工作实际上就是在硬件上模拟多个虚拟计算机

23.27-23.33

so the virtual machine monitor may boot up you know one instance of Linux

So，虚拟机监视器（VMM）可能会启动一个Linux实例

23.33-23.35

may be multiple instances of Linux

也可能会是多个Linux实例

23.35-23.38

may be a Windows machine 

也可能是个Windows实例

23.38-23.45

you can the virtual machine monitor on this one computer can run a bunch of different operating systems 

通过这台电脑上的虚拟机监视器（VMM），我们可以在上面运行一系列不同的操作系统

23.45-23.53

you know each of these as is itself some sort of operating system kernel and then applications

你们知道，它们每个本身就是某种操作系统内核，然后就是程序



23.53-23.57

so this is the technology they're starting with

So，这就是他们所开始使用的技术

23.57-24.00

and you know the reason for this is 

这么做的原因是

24.00-24.09

that if you know you need to it just turns out there's many many reasons why it's very convenient to kind of interpose this level of indirection between the hardware and the operating systems 

事实证明，有很多很多的好处，在硬件和操作系统间插入这种间接层对于我们来说会非常方便

24.09-24.13

and means that we can buy one computer and run lots of different operating systems on it

这就意味着，我们可以买一台电脑，然后在上面运行很多不同的操作系统



24.13-24.17

we can have each if we run lots and lots of little services

如果我们要运行很多很多的小服务

24.17-24.20

instead of having to have lots and lots of computers on per service

我们无须使用大量的电脑来运行每个服务

24.20-24.21

you can just buy one computer

我们只需买一台电脑即可



24.21-24.27

and run each service in the operate system that it needs using this virtual machine

通过使用虚拟机来在它们所需的操作系统上运行每个服务



24.27-24.28

so this was their starting point

So，这就是他们的出发点

24.28-24.37

they already had this stuff and a lot of sophisticated things built around it at the start of designing vmware ft 

在设计Vmware FT之初，他们就已经有了这个东西，并且围绕它构建了许多复杂的东西



24.37-24.39

so this is just virtual machines 

So，这就是虚拟机

24.39-24.48

um what the papers doing is that it's gonna set up one machine 

paper中所做的就是去设置一台机器



24.48-24.53

oH they did requires two physical machines

Oh，抱歉，他们需要的是两台物理机器



24.53-25.01

 because there's no point in running the primary and backup software in different virtual machines on the same physical machine

因为没有必要将primary(主)和backup(备机)软件运行在同一个物理机上的不同虚拟机中



25.01-25.04

because we're trying to guard against hardware failures

因为我们正试着努力去防范这种硬件故障

25.04-25.11

so you're gonna to at least you know you have two machines running their virtual machine monitors 

So，我们在两台机器上运行虚拟机监视器（VMM）

25.11-25.16

and the primary it's going to run on one 

其中一台机器用来运行primary

25.16-25.17

the backups in the other

backup则运行在其他机器上

25.17-25.22 ！！！

so on one of these machines we have a guest

So，在其中一台机器上，我们有一个guest（知秋注：客体机，其实就是我们操作系统中运行的一个虚拟机）



25.22-25.26

 you know we only it might be running a lot of virtual machines, we only care about one of them

你们知道，我们可能会运行很多个虚拟机，但我们只关心其中一个虚拟机


25.22-25.32

 it's gonna be running some guest operating system and some sort of server application

它将用来运行某些guest operating system（客体操作系统，即虚拟机所装操作系统）以及某些服务器应用程序



25.29-25.36

 maybe a database server MapReduce master or something 

可能它是一个数据库服务器，MapReduce master或者其他东西


25.36-25.39

so I'll call this the primary 

So，我将它称为primary(主)

25.39-25.40

and there'll be a second machine

这里有第二台机器

25.40-25.49

that you know runs the same virtual machine monitor and an identical virtual machine holding the backup

它上面运行着相同的虚拟机监视器（VMM），以及一个完全相同的虚拟机，该虚拟机上运行着backup

25.49-25.54

so we have the same whatever the operating system is exactly the same 

该虚拟机上的操作系统和primary上的完全一样

25.54-26.01

and the virtual machine is you know giving these guest operating systems the primary and backup a each range of memory

我们给primary和backup上运行的虚拟机中的这些guest operating system（客体操作系统）分配一些内存

26.01-26.03

 and this memory images will be identical 

我们所分配的内存要完全一样



26.03-26.07

or the goal is to make them identical in the primary in the backup

我们的目标是让primary（主）和backup（备机）中的东西完全一样



26.07-26.10

 we have two physical machines

我们有两台物理机器

26.10-26.17

 each one of them running a virtual machine guest with a its own copy of the service we care about

每台物理机上都运行着一个客体虚拟机，在虚拟机上运行着我们所关心的服务副本


26.17-26.23

we're assuming that there's a network connecting these two machines 

假设我们通过网络来连接这两台机器

26.23-26.29

and in addition on this network there's some set of clients

此外，在这个局域网中还有一些Client



26.29-26.31

really they don't have to be clients

它们其实不一定是Client

26.31-26.36

they're just maybe other computers that our replicated service needs to talk with some of them

它们可能只是我们replicated服务需要通信的其他电脑



26.36-26.38

 our clients sending requests 

我们的Client端会发送请求

26.38-26.43

it turns out in this paper 

事实证明，在这篇paper中



26.43-26.47

there the replicated service actually doesn't use a local disk 

实际上这些replicated服务并不使用本地磁盘

26.47-26.53

and instead assumes that there's some sort of disk server that it talks to them

而是假设这里，它会和某些磁盘服务器进行通信



26.53-26.57

although it's a little bit hard to realize this from the paper

尽管从这篇paper中，我们很难意识到这点


26.57-27.04

the scheme actually does not really treat the server particularly especially 

该scheme并没有特指是什么具体的服务器

27.04-27.07

it's just another external source of packets

它只是另一个数据包的来源

27.07-27.13

and place that the replicated state machine may send packets do not very much different from clients

replicated state machine所发送的数据包可能与Client端所发送的并没有什么区别

27.13-27.16

 okay 



27.16-27.19

so the basic scheme is 

So，基本方案是

27.19-27.28

that we assume that these two replicas the two virtual machines primary and backup are our exact replicas

我们假设primary（主）和backup（备机）这两个虚拟机是精确复制

27.28-27.35

some client you know database client who knows who has some client of our replicated server sends a request to the primary

某些Client，比如：数据库客户端或者我们replicated服务器的某些客户端会发送一个请求给primary（主）



27.35-27.39 *******

 and that really takes the form of a network packet that's what we're talking about

这实际上就是我们所说的以网络数据包的形式

27.39-27.41

that generates an interrupt

这会生成一个中断

27.41-27.44

and this interrupts actually goes to the virtual machine monitor

实际上，这种中断会发送给虚拟机监视器（VMM）


27.44-27.46 ！！！！！！！！！

at least in the first instance

我们来看这个primary实例

27.46-27.49

the virtual machine monitor sees a hot 

虚拟机监视器（VMM）看到了这个数据包

27.49-27.53

here's the input for this replicated service 

这里有一个该replicated服务的输入

27.53-27.55

and so the virtual machine monitor does two things 

So，这个虚拟机监视器（VMM）会做两件事情

27.55-28.08

one is it sort of simulates a network packet arrival interrupt into the primary guest operating system to deliver it to the primary copy of the application

其中一件事就是，它会去模拟一个网络数据包的到达中断给primary（主）上的 guest operating system（客体操作系统），以此将这个数据包发送给primary上的这个应用程序的副本

28.08-28.09

 and in addition

此外

28.09-28.14

the virtual machine monitor you know knows that this is an input to a replicated virtual machine 

虚拟机监视器（VMM）知道这个输入是要传给一个replicated虚拟机的



28.14-28.21

so it sends back out on the network a copy of that packet to the backup virtual machine monitor

接着，它将这个数据包的副本通过网络传给backup（备机）虚拟机监视器（VMM）


28.21-28.30

and backup virtual machine monitor knows Oh is a packet for this particular replicated state machine

backup（备机）虚拟机监视器（VMM）知道这个数据包是给这个Replicated state machine的



28.30-28.37

and it also fakes a sort of network packet arrival interrupt at the backup and delivers the packet 

它也会在backup（备机）中伪造一个网络数据包的到达中断，并将该数据包发给应用程序副本



28.37-28.41

so now both the primary and the backup have a copy this packet

So 现在，primary（主）和backup（备机）都有了这个数据包的副本



28.41-28.42

they looks at the same input 

它们看到了相同的输入

28.42-28.48

you know with a lot of details are gonna process it in the same way and stay synchronized

它们会对很多的细节进行相同的处理，并保持同步

28.48-28.53

because the service is probably going to reply to the client on the primary

primary（主）上的服务可能会对Client端进行回复

28.53-29.04

the service will generate a reply packet and send it on the NIC that the virtual machine monitor is emulating 

该服务会生成一个应答包，并通过虚拟机监视器（VMM）所模拟的NIC（网络接口卡）将它发送出去

29.04-29.09

and then the virtual machine monitor will see that output packet on the primary

然后，虚拟机监视器（VMM）会看到primary（主）所输出的数据包

29.09-29.13

they'll actually send the reply back out on the network to the client

实际上，虚拟机监视器（VMM）会将这个应答包通过网络发回给Client端

29.13-29.17

because the backup is running exactly the same sequence of instructions

因为backup（备机）也在执行完全相同的指令序列

29.17-29.21

 it also generates a reply packet back to the client 

它也会生成一个要返回给Client端的应答数据包



29.21-29.25

and sends that reply packet on its emulated NIC

并通过它所模拟的NIC发送这个应答数据包

29.25-29.30

it's the virtual machine monitor that's emulating that network interface card

NIC指的是由虚拟机监视器（VMM）所模拟出的网络接口卡(network interface card)

29.30-29.34

and it says aha you know the virtual machine monitor says I know this was the backup

虚拟机监视器（VMM）表示，我知道这是来自backup（备机）的数据包

29.34-29.36

only the primary is allowed to generate output 

只有primary（主）才被允许生成这个数据包


29.36-29.41

and the virtual machine monitor drops the reply packet 

虚拟机监视器（VMM）会将backup（备机）所发出的应答数据包丢弃

29.41-29.45

so both of them see inputs and only the primary generates outputs 

So，它们两个都拿到了输入，但只有primary（主）才会生成应答数据包



29.45-30.05

as far as terminology goes the paper calls this stream of input events and other things other events we'll talk about from the stream is called the logging Channel

就术语而言，paper中将我们所谈论的这种输入事件和其他事件流称为Logging Channel



30.05-30.08

it all goes over the same network presumably 

它通过同一个网络进行传输


30.08-30.23

but these events the primary sends the back of our called log events on the log Channel

但这些由primary（主）通过log Channel发送回去的事件，我们将它称为日志事件



30.23-30.28

where the fault tolerance comes in is that those the primary crashes

在primary 崩溃时，fault tolerance（容错）机制就要起作用了

30.28-30.39

what the backup is going to see is that it stops getting stuff on the stops getting log entries a log entry stops getting log entries on the logging channel 

作为backup（备机），它会看到它无法从logging channel中接收到任何log entry


30.39-30.47

and we know it turns out that the backup can expect to get many per second

事实上，backup（备机）期望能每秒得到许多log entry

30.47-30.55

because one of the things that generates log entries is periodic timer interrupts in the primary

因为在primary（主）中，会通过周期性的时钟中断（ Periodic timer interrupt）来生成log entry

30.55-30.58

each one of which turns out every interrupt generates a log entries into the backup

事实证明，每次中断会生成一个log entry放到backup（备机）中

30.58-31.01

these timer interrupts are going to happen like 100 times a second 

这种时钟中断会每秒发生100次



31.01-31.08

so the backups can certainly expect to see a lot of chitchat on the logging Channel if the primaries up

如果primary（主）正在运行，那么backup（备机）就可以期待在logging Channel中看到大量的通信

31.08-31.09

if the primary crashes

如果primary（主）发生了故障

31.09-31.17

then the virtual machine monitored over here will say gosh you know I haven't received anything on the logging channel for like a second or however long

那么这里的虚拟机监视器（VMM）就会表示，Oh我的老天，我已经在有1秒钟或者一定时间内没从logging channel中收到任何东西了

31.17-31.21

the primary must be dead or or something

那么primary必定是崩了，或者发生了其他什么事情


31.21-31.24

and in that case

在这种情况下

31.24-31.29

when the backup stop seeing log entries from the primary 

当backup（备机）不再看到从primary（主）发出的log entry时


31.29-31.34

the way the paper phrase it is that the backup goes live

他们在paper中表示，这就需要让backup上线（Go live）

31.34-31.44

 and what that means is that it stops waiting for these input events on the logging Channel from the primary

这就意味着，backup（备机）就会停止等待这些来自primary（主）发送到logging Channel上的输入事件



31.44-31.57

and instead，this virtual machine monitor just lets this backup execute freely without waiting for without being driven by input events from the primary

相反，虚拟机监视器（VMM）就会允许这个backup（备机）自由执行而无需等待来自primary（主）的输入事件


31.57-32.04

the vmm does something to the network to cause future client requests to go to the backup instead of the primary

虚拟机监视器（VMM）会让网络中接下来来自Client端的请求都发送给backup（备机）而不是primary（主）



32.04-32.15

and the VMM here stops discarding the backup personnel it's the primary not the backup stops discarding output from this virtual machine

此处的虚拟机监视器（VMM）就不再会去丢弃backup（备机）中虚拟机所生成的输出数据包



32.15-32.17

so now this virtual machine directly gets the inputs 

So，现在此处的这个虚拟机就能直接拿到输入

32.17-32.19

and there's a lot of produce output 

并且会生成大量的输出数据包

32.19-32.21

and now our backup is taken over

现在，原来primary（主）的工作就被backup（备机）所接管了

32.21-32.24

and similarly you know that this is less interesting

同样你知道，这并没有让我们特别感兴趣

32.24-32.26

but has to work correctly

但我们必须让它正确工作



32.26-32.27

if the backup fails 

如果backup（备机）发生了故障

32.27-32.32

a similar primary has to use a similar process to abandon the backup

primary（主）就必须使用类似的处理方式来放弃这个backup（备机）



32.32-32.34

 stop sending it events

停止向backup（备机）发送事件

32.34-32.38

 and just sort of act much more like a single non replicated server

它就表现得更像一个单个服务器，而不是副本服务器



32.38- 32.45

 so either one of them can go live if the other one appears to be dead，stops you know stops generating network traffic

如果一个虚拟机似乎出现死机之类的情况，并且停止产生网络流量的话，那么另一个虚拟机就可以来接管它的工作

32.45-32.51

yes

请问

32.51-32.52

magic 



32.52-32.59

now it depends you know depends on what the networking technology is

这取决于我们使用的网络技术是什么

32.59-33.04

I think with the paper 

我觉得在这篇paper中

33.04-33.08

one possibility is that this is sitting on Ethernet 

可是基于以太网来（Ethernet ）进行的

33.08-33.14

every physical computer on the Internet or really every NIC has a 48 bit unique ID

因特网上的每台物理机器上的每个NIC（网络接口卡）都有一个48位唯一ID（MAC地址）



33.14-33.19

I'm making this up now

让我现在整理下我要说的话

33.19-33.26

the it could be that in fact instead of each physical computer having a unique ID, each virtual machine does

实际上，这里说的不是每个物理计算机都有唯一的ID，而是每个虚拟机（虚拟机的id是虚拟的，默认是由虚拟机的UUID生成，物理网卡的ID是由厂家确定并保证唯一性）

33.26-33.31

 and when the backup takes over

当backup（备机）接管时



33.31-33.38

 it essentially claims the primary's Ethernet ID as its own 

本质上来讲，它会声明primary（主）上的以太网地址（MAC地址）是它自己的

33.38-33.41

and it starts saying you know I'm the owner of that ID

它会开始说，我是这个MAC地址的所有者



33.41-33.44

and then other people on the ethernet will start sending us packets

然后这个以太网中的其他人就会开始向我们发送数据包



33.44-33.47

that's my interpretation

这就是我的解释

33.54-34.04

the designers believed they had identified all such sources

设计者们认为他们已经识别了所有数据包的来源

34.04-34.14

and for each one of them, the primary does whatever it is you know executes the random number generator instruction or takes an interrupt at some time 

对于其中的每一个数据包，primary会执行你知道的所有操作，如，执行随机数生成器指令或在某个时间中断

34.14-34.16

the backup does not

而backup（备机）并不会

34.16-34.23

and the backup of virtual machine monitor sort of detects any such instruction and intercepts that and doesn't do it 

backup（备机）上的虚拟机监视器（VMM）会检测到任何这样的指令，并对其拦截，但什么也不做



34.23-34.27

and he said the backup waits for an event on the logging Channel

backup（备机）会等待logging channel上的一个事件

34.27-34.32

saying this instruction number you know the random number was whatever it was on the primary

告诉backup（备机）这个指令在primary上产生的随机数

34.32-34.40

yes yes

你说的没错



34.40-34.54

yeah the paper hints that they got Intel to add features to the microprocessor to support exactly this 

没错，这篇paper暗示了intel为它们的处理器添加特性以此来完全支持此功能



34.54-34.55

but they don't say what it was

但他们并没有说这个是什么

34.55-35.02

 okay



35.02-35.06

okay so on that topic

Ok，So关于这个话题

35.06-35.20

the so far that you know the story is sort of assumed that as long as the backup to sees the packets from the clients, it'll execute in identically to the primary

到目前为止，我们所知道的某种假设是，只要backup（备机）看到来自Client端的数据包，它所执行的方式就会和primary（主）一模一样



35.20-35.25

 and that's actually glossing over some huge and important details 

这实际上掩盖了某些非常重要的细节



35.25-35.35

so one problem is that as a couple of people have mentioned there are some things that are non-deterministic

So，其中一个问题是，有两个人已经提到了这其中某些东西是不确定性的



35.35-35.36

now it's not the case

虽然并不是这样

35.36-35.42

that every single thing that happens in the computer is a deterministic function of the contents of the memory of the computer

在计算机中发生的每一件事都是一个确定的函数，即根据你电脑内存中的内容，这就会得到一个确定的结果



35.42-35.46

 it is for a sort of straight line code execution often

通常这就是执行一行很简单的代码

35.46-35.47

but certainly not always

但肯定不总是这样

35.47-35.53

so all worried about is things that may happen that are not a strict function of the current state 

so 所担心的事情无非就是当前state可能不是严格的函数



35.53-35.57

that is that might be different, if we're not careful on the primary and backup

如果我们对primary（主）和backup（备机）并没有仔细处理，那么这就有可能有所不同


35.57-36.02

so these are sort of non-deterministic events that may happen 

So，这就是可能会发生的非确定性事件

36.02-36.06

so the designers had to sit down and like figure out what they all work

So，设计者们不得不坐下来，去弄清楚他们要做什么

36.06-36.12

 and here are the ones here's the kind of stuff they talked about 

接下来我要讲的，就是他们所讨论的东西

36.12-36.20

so one is inputs from external sources like clients which arrive just whenever they arrive right 

其中一种是来自外界（例如Client端）的输入，这些输入可能会在任何时候到达



36.20-36.24

they're not predictable there are no sense in which the time at which a client request arrives

它们是不可预测的，我们也不知道某个来自Client端的请求会何时到来

36.24-36.27

or its content isnt a deterministic function of the services state

我也不知道我要服务的状态是不是一个确定性的函数

36.27-36.29

because it's not 

因为它不可预知

36.29-36.38

so these actually this system is really dedicated to a world in which services only talk over the network 

这个系统是真正服务于其中的服务只能通过网络来进行通信的世界

这个系统是专门用于一个领域：即我的服务仅通过网络通信来进行

36.38-36.48

and so the only really basically the only form of input or output in this system is supported by this system seems to be network packets coming and going

So，基本上来讲，在该系统中唯一支持的输入和输出形式就是通过发送和接收网络数据包



36.48-36.51

 so we didn't put arrives at what that really means it's a packet arrives

So，我们所说的到达的真正含义其实是数据包到达




36.52-37.06

 and what a packet really consists of for us is the data in the packet plus the interrupt that's signaled that the packet had arrived

一个数据包中所包含的除了要发给我们的数据以外，还包含了一个用来通知数据包已到达的中断信号

37.06-37.08

 so that's quite important

So，这相当重要

37.08-37.09

 so when a packet arrives

So，当一个数据包到达时

37.09-37.18

ordinarily the NIC DMA is the packet contents into memory

通常情况下，NIC会通过DMA将数据包内容放入内存

37.18-37.22

and then raises an interrupt which the operating system feels

接着，它会发起一个操作系统能感知到的中断信号

37.22-37.25

and the interrupt happens at some point in the instruction stream

这个中断会在指令流的某个地方发生

37.25-37.30

and so both of those have to look identical on the primary and backup 

So，这两者必须在primary（主）和backup（备机）上看起来一模一样

37.30-37.34

or else we're gonna have they're also executions gonna diverge 

不然，primary（主）和backup（备机）会在执行上有分歧

37.34-37.36

and so you know the real issue is 

So，真正的问题在于

37.36-37.43

when the interrupt occurs exactly at which instruction the interrupts happen to occur and better be the same on the primary in the backup

当中断恰好发生在哪条指令处时，backup最好和primary是一样的



37.43-37.47

otherwise their execution is different and their states are gonna diverge

否则，它们在执行上就会不同，并且它们的状态也不同

37.47-37.51

 and so we care about the content of the packet and the timing of the interrupt

So，我们所关心的就是数据包中的内容和中断的时机



37.51-37.55

 and then as a couple of people have mentioned

接着，有两个人已经提到


37.55-38.12

 there's a few instructions that that behave differently on different computers or differently depending on something like there's maybe a random number generator instruction

有些指令在不同的电脑上所表现的结果会很不一样，例如随机数生成指令

38.12-38.20

there's I get time-of-day instructions that will yield different answers have called at different times  and unique ID instructions

比如，在不同的时间调用获取时间的指令所生成的结果就是不同的，或者生成唯一ID的指令所生成的结果也是不同的


38.20-38.29

 another huge source of non determinism which the paper basically rules out is multi-core parallelism 

paper上所提到的另一个非确定性因素的主要来源就是多核并行



38.29-38.35

this is a unit process or only system there's no multi-core in this world

这里所讲的都是在一个单核处理器环境下



38.35-38.38

the reason for this is that if it allowed multi-core

之所以这么做的原因是，如果允许它在多核环境下

38.38-38.41

then the service would be running on multiple cores

那么服务就会在多个核上运行



38.41-38.49

and the instructions of the service the rest of you know the different cores are interleaved in some way which is not predictable 

服务中的指令会在不同的Core上以某种方式交错执行，执行顺序是不可预测的

38.49-38.54

and so really if we run the same code on the backup server

So，如果我们在backup（备机）服务器上运行相同的代码

38.54-38.56

 if it's parallel code running on a multi-core

如果它是一段运行在多核平台上的并行代码

38.56-39.01

the tubo interleave the instructions in the two cores in different ways  the hardware will 

硬件会以不同的方式在这两个Core上交错执行这些指令

39.01-39.04

and that can just cause different results 

这可能会导致出现不同的结果

39.04-39.11

because you know supposing the code and the two cores you know they both asked for a lock on some data 

因为假设这两个Core上所运行的代码，在遇上某些数据的时候要去拿到一个锁

39.11-39.15

well on the master you know core one may get the lock before Core 2

Well，在master上，Core 1可能会在Core 2之前拿到这个锁



39.15-39.20

on the slave just because of a tiny timing difference core2  may got the lock first 

在Backup（备机）上，因为可能时间上的差异，导致Core 2先拿到了这个锁



39.20-39.22

and the you know execution results are totally different 

那么执行结果可能就完全不同

39.22-39.26

likely to be totally different if different threads get the lock

如果是不同的线程拿到了这把锁，那么导致的结果也可能会完全不一样



39.26-39.34

so multi-core is the grim source of non-determinism man is just totally outlawed in this paper's world 

so 多核是最能造成不确定的根源所在，所以在这个paper中被完全屏蔽了



39.34-39.43

and indeed like as far as I can tell the techniques are not really applicable

到目前为止我所讲的技术并不是真的那么适用

39.58-40.03

the service can't use multi-core parallel parallelism

该服务没法使用多核并行的能力

40.03-40.06

the hardware is almost certainly multi-core parallel 

几乎可以肯定的是，硬件是可以多核并行的

40.06-40.10  ！！！！！！！

but that's the hardware sitting underneath the virtual machine monitor 

但硬件是置于虚拟机监视器（VMM）之下的

40.10-40.20

the machine that the virtual machine monitor exposes to one of the guest operating systems that runs the primary backup that emulated virtual machine is a unicore

运行在primary和backup上 模拟虚拟机 单核

虚拟机监视器（VMM）对外暴露的primary和backup模拟的是一个单核心的虚拟机器

40.20-40.23

it's a unicore processor machine in this paper

在这篇paper中，它是一个单核处理器的机器



40.23-40.33

and I'm guessing there's not an easy way for them to adapt this design to multi-core virtual machines

我猜测，对于他们来说，想找到适配多核虚拟机的设计并不容易



40.33-40.41

okay 




40.41-40.46

so these are really it's these events that go over the logging channel

So这些事件会通过logging channel来传送


40.46-40.58

and so the format of a log record a log log entry they don't quite say but I'm guessing that there's really three things in a log entry

他们虽然没有说log record或者说log entry的格式是什么，但我猜测，在一个log entry中应该有3个东西



40.58-41.02

there's the instruction number at which the event occurred

这里面应该有一个事件发生时的指令号

41.02-41.05

 because  if you're delivering an interrupt or you know input or whatever

因为如果你要发出一个中断信号或者输入之类的东西

41.05-41.09

it better be delivered at exactly the same place in the primary backup 

最好 primary与backup是精确到一样的地方执行的

41.09-41.11

so we need to know the instruction number

So，我们需要去知道指令号

41.11-41.16

 and by instruction number I mean you know the number of instructions since the Machine booted

我所说的指令号指的是自机器启动时起该指令是第几个指令



41.16-41.18

 not the instruction address

我说的并不是指令地址

41.18-41.22

but like oh or executing the four billion and 79th instructions since boot

比如说，执行自启动起第40亿零79号指令

41.22-41.26

so log entry is going to have instruction number

So，Log entry会有一个指令号


41.26-41.36 ！！！

for an interrupt for input it's going to be the instruction at which the interrupt was delivered on the primary 

拿一个输入中断来讲，它会给primary传递一个中断指令

41.36-41.40

and for a weird instruction like get at time of day

对于某个奇怪的指令，比如获取一天的时间

41.40-41.47

it's going to be the instruction number of the instruction of the get time of day  or whatever instruction that was executed on the primary

它就是获取某天时间的指令的指令号

通过这条获取某天时间的指令或其他任何在primary（主）上面执行的指令的指令号



41.47-41.53

 so that you know the backup knows where to call this event to occur

通过这个指令号，backup（备机）就知道该在哪里调用这个事件了


41.53-41.59

 okay so there's gonna be a type you know network input whatever a weird instruction

Ok，So这里会有一个类型，可能是网络输入或者是某条奇怪的指令之类的


41.59-42.01

and then there's I'm gonna be data

接着，这里还有数据

42.01-42.04

for a packet arrival it's gonna be the packet data

对于一个到达的数据包来说，它里面就有数据包的数据

42.04-42.09

 for one of these weird instructions, it's going to be the result of the instruction when it was executed on the primary 

对于一个奇怪的指令而言，那就是该指令在primary（主）上所执行的结果

42.09-42.16

so that the backup virtual machine can sort of fake the instruction and supply that same result

So，backup（备机）上的虚拟机就可以伪造该指令，并提供相同的执行结果

42.16-46.23

okay



42.23-42.26

so as an example

So，举个例子

42.26-42.40

 the both of these operating systems guest operating system assumes requires that the hardware in this case emulated hardware

在这个例子中，假设guest operating system需要的硬件是模拟硬件

42.40-42.44

virtual machine has a timer that ticks say a hundred times a second 

虚拟机中有一个时钟，假如它每秒会滴答100次

42.44-42.48

and causes interrupts to the operating system 

并引起操作系统中断

42.48-42.52

and that's how the operating system keeps track of time it's by counting these timer interrupts 

这就是操作系统如何跟踪时间的方法，即统计这些时钟中断的次数

42.52-42.59

so the way that plays out those  timer interrupts have to happen at exactly the same place in the primary and backup

这些timer interrupts必须要很精确地在primary和backup中的同一个地方发生

42.59-43.03

 otherwise they don't execute the same no diverge

 否则，它们就不会执行相同的命令，这样就会产生分歧

否则，它们所执行的就不是相同的命令，这样就会有分歧



四十一  阅举报
4-03

43.03-43.11

so what really happens is that there's a timer on the physical machine

So，此处物理机器上有一个timer



43.11-43.14

that's running the Ft virtual machine monitor

这上面运行着FT虚拟机监视器（VMM）

43.14-43.22

and the timer on the physical machine ticks and delivers an interrupt a timer interrupt the virtual machine monitor on the primary 

物理机器上的时钟滴答一下，并发送了一个timer interrupt信号给primary（主）上的虚拟机监视器（VMM）

43.22-43.35

the virtual machine monitor at you know the appropriate moment stops the execution of the primary, writes down the instruction number that it was at you know instruction since boot

虚拟机监视器（VMM）会在合适的时候停止primary（主）的执行，并写下从启动到现在为止该指令的指令号

43.35-43.44

and then delivers sort of fake simulates interrupts into the guest operating system in the primary 

并发送伪造好的模拟中断信号给primary（主）上的guest operating system

43.44-43.48

and that instruction number saying oh you know you're emulating the timer Hardware just ticked there's the interrupt

这个指令号表示，我们所正在模拟的那个硬件时钟刚滴答了一下，表示这里有次中断



43.48-43.58

 and then the primary virtual machine monitor sends that instruction number which the interrupt happened you know to the backup 

然后，primary（主）中的虚拟机监视器（VMM）将发生中断的那个指令号发送给backup（备机）



43.58-44.02

the backup of course it's virtual machine monitor is also taking timer interrupts from its physical timer 

当然，backup（备机）上的虚拟机监视器（VMM）也从它的物理机器上的时钟处拿到了这个时钟的中断信号



44.02-44.10

and it's not giving them it's not giving it's a real physical timer interrupts to the backup operating system 

它并不会将真正的物理时钟中断给backup （备机）操作系统



44.10-44.11

it's just ignoring them 

它只是将它们忽略了


44.11-44.17

when the log entry for the primaries timer interrupts arrives here

当primary（主）中携带时钟中断信号的log entry到达此处时



44.17-44.21

then the backup virtual machine monitor will arrange with the CPU 

接着，backup（备机）虚拟机监视器（VMM）就会对CPU进行安排

44.21-44.35

and this requires special CPU support to cause the physical machine to interrupt at the same instruction number at the timer interrupts tapped into the primary 

这就需要有特殊的CPU支持，以此来让物理机器与primary（主）在同一个指令号下进行中断

44.35-44.39

at that point the virtual machine monitor gets control again from the guest

此时，虚拟机监视器（VMM）就会从guest operating system处重新拿回控制权

44.39-44.45

and then fakes the timer interrupts into the backup operating system

然后，伪造timer interrupt给backup（备机）上的操作系统

44.45-44.48

now exact exactly the same instruction number as it occurred on the primary

它所执行的指令号与primary上的一模一样

44.48-45.15

yeah

请问

45.15-45.20

well yeah so the observation is that this relies on the CPU having some special hardware in it 

So，我们的观察结果就是，这依赖于CPU中所包含的某种特殊硬件

45.20-45.27

where the vmm can tell the hardware CPU please interrupt a thousand instructions from now 

Well，VMM可以告诉CPU，请中断从现在起的第1000条指令



45.27-45.35

and then the vmm you know where so that you know it'll interrupt at the right instruction number the same instruction as the primary did

然后，backup（备机）中的VMM就会和primary（主）中的VMM在相同的指令号处进行中断

45.35-45.40

and then the vmm just tells the cpu to start resume executing again in the backup

然后，VMM就告诉CPU在backup（备机）中将该指令号内容再次执行一次

45.40-45.46

and exactly a thousand instructions later, the CPU will force an interrupt into the virtual machine monitor

确实在1000条指令后，CPU会在虚拟机监视器（VMM）中进行强制中断



45.46-45.51

and that's special hardware but it turns out it's you know on all Intel chips

这是种特殊的硬件，但事实证明，所有的intel芯片上都有它

45.51-45.54

 so it's not it's not that special anymore you know

So，这就不再那么特别了



45.54-45.58

15 years ago it was exotic now it's totally normal

15年前，它还比较异端，但现在就很普通

45.58-46.01

and it turns out there's a lot of other uses for it

事实证明，还有许多其他的东西也用到了它

46.01-46.04

like um if you want to do profiling you wanna do CPU time profiling 

例如，如果我们想去做CPU性能分析

46.04-46.10

what you'd really like or one way to do CPU time profiling is to have the microprocessor interrupt every thousand instructions

对CPU进行性能分析的其中一种方式就是让微处理器每执行1000条指令后进行一次打断（BogoMIPS是Linux操作系统中衡量计算机处理器运行速度的的一种尺度，	只能用来粗略计算处理器的性能，并不十分精确）

46.10-46.11

 right



46.11-46.19

and this is the hardware that's this Hardware also this is the same hardware that would cause the microprocessor to generate an interrupt every thousand instructions

这里用到的是相同的硬件，它能引起微处理器每执行1000条指令就进行一次中断



46.19-46.24

so it's a very natural sort of gadget to want in your CPU

这是一种你CPU中存在的小工具

46.24-46.35

all right 



46.35-46.54

yes

请问



46.54-46.57

So the question is what if the backup gets ahead of the primary

So，他的问题是，如果backup（备机）的状态领先primary（主）会怎么样


46.57-47.06

so you know we standing above know that oh you know the primary is about to take an interrupt at the millionth instruction

So，假设primary（主）会在第100万条指令时发生中断

47.06-47.13

but the backup is already you know executed the millionth and first instruction

但如果backup（备机）已经执行了100万零1条指令

47.13-47.15

so it's gonna be if we let this happen

So，如果我们让这种事情发生

47.15-47.18

it's gonna be too late to deliver the interrupts

那么此时向backup（备机）发出中断信号已经太晚了

47.18-47.21

 if we let the backup execute the ahead of the primary 

如果我们让backup（备机）比primary（主）先执行指令

47.21-47.29

it's going to be too late to deliver the interrupts at the same point in the primary instruction stream and the backup of the instruction stream

那么对于从primary（主）到backup（备机）的所发出的指令流中的同一点处中断信号来说，就太晚了

47.29-47.31

so we cannot let that happen

So，我们不能让它发生

47.31-47.34

we cannot let the backup get ahead of the primary in execution

So，我们不能让backup（备机）在执行上优先于primary（主）



47.34-47.41

and the way VMware ft does that is that 

Vmware ft解决该问题的方式是


47.41-47.50

the backup virtual machine monitor it actually keeps a buffer of waiting events that have arrived from the primary

实际上，backup（备机）上的虚拟机监视器（VMM）会维护了一个buffer（缓冲区），用于存储等待执行来自primary（主）的所发事件

47.50-47.58

and it will not let to the backup execute unless there's at least one event in that buffer

除非在这个buffer中至少有一个事件，它才会让backup（备机）去执行



47.58-48.00

 and if there's one event in that buffer

如果在这个buffer中有一个事件

48.00-48.09

 then it will know from the instruction number the place at which it's got a force the backup to stop executing

那么它就能根据指令号来决定backup在什么位置强制停止执行



48.09-48.21

so always the backup is executing with the CPU being told exactly where the next stopping point the next instruction number of a stopping point is 

So，backup（备机）在执行时，会告知CPU下一个停止点的指令号是什么



48.21-48.27

because the backup only executes if it has a an event here that tells it where to stop next 

因为backup（备机）只有在它有一个事件告诉它下一个停止执行的点在哪，它才会去执行



48.27-48.31

so that means it starts up after the primary

So，这就意味着，它会在primary（主）之后启动

48.31-48.37

because the backup can't even start executing until the primary has generated the first event and that event has arrived at the backup 

因为只有primary（主）生成了第一个事件，并且该事件已经到达了backup（备机）处，backup（备机）才会开始执行

48.37-48.42

so the backup sort of always one event basically behind the at least one event behind the primary

So，backup（备机）始终要比primary（主）在执行上至少晚一个事件

48.42-48.44

and if it's slower for some other whatever reason 

如果因为某些其他原因导致它的执行速度变慢

48.44-48.47

maybe there's other stuff running on that physical machine

可能是有其他的东西也运行在这个物理机器上

48.47-48.51

then the backup might get you know multiple events behind at the primary

那么backup（备机）可能就会比primary（主）晚执行多个事件

48.51-48.59

alright 

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

48.59-49.10 *********

there's a one little piece of mess about arriving the specific case of arriving packets 

关于到达数据包的具体情况这里有点混乱

49.10-49.18

ordinarily when a packet arrives from a network interface card

通常情况下，当一个数据包从网络接口卡（NIC）发出时

49.18-49.19

if we weren't running a virtual machine

如果我们并没有运行一个虚拟机的话

49.19-49.32

the network interface card would DMA the packet content into the memory of the computer that it's attached to sort of as the data arrives from the network interface card

当数据到达网络接口卡处（NIC）时，NIC会通过DMA的方式将数据包的内容放入计算机的内存中

49.32-49.35

and that means you know you should never write software like this 

这意味着，你们可能从未写过这样的软件

49.35-49.46

but it could be that the operating system that's running on a computer might actually see the data of a packet as its DMA or copied from the network interface card into memory

但运行在一台计算机中的操作系统实际上可能会看到这个数据包的数据，它是通过DMA的方式从网络接口卡（NIC）拷贝到内存中的



-+

49.46-49.46

 right



49.46-49.51

you know this is and you know we don't know what operating this system is designed 

你知道，我们并不知道这个系统的操作是怎么设计的

49.51-50.00

so that it can support any operating system and cost maybe there is an operating system that watches arriving packets in memory as they're copied into memory

它可以支持任何操作系统并节省成本，也许有一个操作系统可以监视到达的数据包并将它拷贝到内存中

50.00-50.02

 so we can't let that happen

So，我们不能让这种事情发生

50.02-50.06

 because if the primary happens to be playing that trick

因为如果primary（主）要去玩弄这个技巧



50.06-50.15

 it's gonna see you know if we allowed the network interface card to directly DMA incoming packets into the memory of the primary

如果我们允许NIC直接以DMA的方式将到达的数据包放入primary（主）的内存中去



50.15-50.22

 the primary we don't have any control over the exact timing of when the network interface card copies data into memory

我们没办法去控制NIC在确切的时间点来将数据拷贝到内存中去



50.22-50.32

 and so we're not going to know sort of at what times the primary did or didn't observe data from the packet arriving

So，我们也就不会知道primary（主）在哪个时间点会看到到达数据包中的数据


50.32-50.42

and so what that means is that in fact the NIC copies incoming packets into private memory of the virtual machine monitor

So，这意味着NIC会将传入的数据包复制到虚拟机监视器（VMM）的私有内存中



50.32-50.45

and then the network interface card interrupts the virtual machine monitor

接着，网络接口卡（NIC）会对虚拟机监视器（VMM）发出中断信号



50.45-50.47

 and says oh a packet has arrived

并表示，有一个数据包已经到达



50.47-50.51

at that point the virtual machine monitor will suspend the primary 

此时，虚拟机监视器（VMM）会将primary（主）挂起

50.51-50.54

and remember what instruction number had suspended at

并记住，它是在哪个指令号处将primary（主）挂起的

50.54-51.01

 copy the entire packet into the primaries' memory while the primary suspended and not looking at this copy

它会在primary（主）挂起并且没有看这个副本的时候，将整个数据包复制到primary的内存中去

51.01-51.05

and then emulate a network interface card interrupt into the primary

然后，模拟一个网络接口卡（NIC）中断信号给primary（主）



51.05-51.12

and then send the packet and the instruction number to the backup

然后，将数据包和指令号发送给backup（备机）

51.12-51.14

the backup will also suspend

backup（备机）也会挂起



51.14-51.21

the backup you know virtual machine monitor will suspend the backup at that instruction number  copy the entire packet 

backup（备机）上的虚拟机监视器（VMM）会在处理那个指令号时将backup（备机）挂起，并复制整个数据包



51.21-51.24

and again to the back-up is guaranteed not to be watching the data arrive 

再次，对于backup（备机）来说，VMM同样确保它不会看到数据到达

51.24-51.28

and then faking interrupts at the same instruction numbers the primary

然后VMM伪造一个和primary一模一样的指令号中断给它（backup）

51.28-51.35

and this is the something the bounce buffer mechanism explained in the paper

这就是paper中所解释的Bounce buffer机制

51.35-51.57

 okay yeah the the

请问



51.57-52.04 ！！

the only instructions and that result in logging channel traffic are weird instructions

唯一导致logging channel流量有问题的是那些奇怪的指令

5204-52.04

 which are rare

它们很少见

52.04-52.12

 no its instructions that might yield a different result if executed on the primary and backup

在primary（主）和backup（备机）上所执行的指令可能会产生不同的结果



52.12-52.18

 like instruction to get the current time of day or current processor number or ask how many instructions have been executed or

比如，得到今天的当前时间，或者是当前处理器的号码，以及询问已经执行多少个指令之类的指令



52.18-52.20

 and those actually turn out to be relatively rare 

事实证明，这些指令相对稀少



52.20-52.27

there's also one them to get random tasks when some machines to ask or a hardware generated random number for cryptography or something

比如说，让机器去做些随机性的任务，例如某些机器会要求硬件去生成随机数字用于加密或者其他用途

52.27-52.30

and but those are not everyday instructions

但这些并不是日常要用到的那些指令

52.30-52.34

 most instructions like add instructions they're gonna get the same result on primary and backup

大部分例如add这样的指令，在primary（主）和backup（备机）上执行时会得到相同的结果



52.34-52.50

学生提问

like some http request

 that go



yeah so the way those get replicated on the back up is just by forwarding that's

是的，因此备份中复制这些文件的方式只是转发

是的，因此，在backup上得到这些内容的方式只能通过转发 

52.50-52.51

exactly 

完全正确

52.51-52.54

right each network packet just it's packaged up and forwarded out

每个网络数据包被打包好，并转发出去（知秋注：到backup）

52.54-53.01

as it is as a network packet and is interpreted by the tcp/ip stack on both you know 

因为它是一个网络数据包，所以它能被TCP/IP协议栈所解释

53.01-53.09

so I'm expecting 99.99% of the logging channel traffic to be incoming packets

So，我希望logging channel中99.99%的流量是传入的数据包

53.09-53.15

and only a tiny fraction to be results from special non-deterministic instructions 

只有很小的一部分是来自某些特殊的非确定性指令的执行结果

53.15-53.23

and so we can kind of guess what the traffic load is likely to be for a server that serves clients

So，我们可以猜下服务于Client端的服务器的流量负载可能是什么

53.23-53.25

 basically it's a copy of every client packet

基本上来讲，它就是每个Client端数据包的副本

53.25-53.31

 and then we'll sort of know what the logging channel how fast the logging channel has to be

然后，我们就知道logging channel的速度是有多快了



53.31-53.36

 all right 



53.36-53.43

so um so it's worth talking a little bit about how output works

关于output是如何工作的，这点还是值得一提

53.43-53.49

and in this system really the only what output basically means only is sending packets

在这个系统中，output基本上来讲指的就是发送数据包

53.49-53.51

 that client send requests in as network packets

Client端以网络数据包的形式将请求发送出去

53.51-53.56

 the response goes back out as network packets

响应则是以网络数据包的形式返回

53.56-53.58

 and there's really no other form of output

并且这也没有其他形式的output了



53.58-54.04

as I mentioned the you know both primary and backup compute the output packet they want to send 

正如我之前所提到的，primary（主）和backup（备机）会计算出它们想发送的输出数据包



54.04-54.08

and that sort of asks that simulated next to send the packet it's really sent on the primary

接着告诉模拟器来发送这个数据包，它只发送在primary上的这个数据包

54.08-54.12

and simply discard the output packet discarded on the backup

并且，将backup（备机）处的输出数据包直接丢弃

54.12-54.16

 okay 



54.16-54.19

but it turns out is a little more complicated than that

但事实证明，这要比刚说的要复杂点



54.19-54.26

 so supposing what we're running is a some sort of simple database server

假设，我们所正在运行的是某种简单的数据库服务器



54.26-54.31

and the operation the client operation that our database server supports is increment 

我们数据包服务器所支持的Client端操作就是增量操作



54.31-54.33

and ideas the client sends an increment requests

比如，Client端发送了一个增量请求

54.33-54.38

the database server increments the value and sends back the new value 

数据库就会对该值进行增量，并将新的值返回给Client端




54.38-54.41

so maybe on the primary 

So，可能在primary（主）这里

54.41-54.46

well let's say everything's fine so far and the primary backup both have value 10 in memory

假设，primary（主）和backup（备机）到目前为止都没什么问题，它们的内存中都有一个值10

54.46-54.49

and that's the current value at the counter

这是counter中的当前值


54.49-55.00

and some client on the local area network sends a you know an increment request to the primary

局域网中的某些Client端向primary（主）发送了一个增量请求

55.00-55.04

 that packet is you know delivered to the primary

该数据包被发送到了primary（主）处

55.04-55.08

 it's you know it's executed the primary server software

它被primary（主）上的服务器软件所执行

55.08- 55.12

 and the primary says oh you know current values 10 I'm gonna change to 11 

primary（主）表示，Oh，当前的值为10，我现在将它改为11



55.12-55.18

and send a you know response packet back to the client saying saying 11 as their reply

接着我会向Client端返回一个响应数据包，并表示，这里我们将11作为返回信息




55.18-55.25

 the same request as I mentioned gonna supposed to be sent to the backup will also be processed here

我将刚提到的这个同样的请求发送给backup（备机）进行处理



55.25-55.28

it's going to change this 10 to 11 also generate a reply

Backup（备机）会将它里面的10修改为11，并且也生成一个返回信息

55.28-55.29 ！！！

 and we'll throw it away

然后，我们将它丢弃

55.29-55.31

that's what's supposed to happen the output

这就是output中所应该发生的事情

55.31-55.39

however you also need to ask yourself what happens if there's a failure at an awkward time

但是，我们也需要问我们自己，如果在某个尴尬的时间出现了故障，这会发生什么呢？



55.39-55.47

if you should always in this class should always ask yourself what's the most awkward time to have a failure and what would happen you to failure occurred then 

你们上这门课的人应该一直问自己，如果在最尴尬的时候发生了故障，那么这会发生什么



55.47-55.59

so suppose the primary does indeed generate the reply here back to the client

So，假设primary（主）确实会生成返回信息返回给Client端

55.59-56.05

 but the primary crashes just after sending the its reply to the client

但primary（主）将返回信息发送给Client端后，它就故障了

56.05-56.08

 and furthermore and much worse

此外，更糟糕的是

56.08-56.12 ！！！！

it turns out that you know this is just a network it doesn't guarantee to deliver packets

你知道这只是一个网络传输，它无法保证数据包的传递



56.12-56.21

let's suppose this log entry on the logging channel got dropped also when the primary died

假设当primary（主）跪了，logging channel上的log entry也会被丢弃

56.21-56.25

 so now the state of play is the client received a reply saying 11 

So，现在的情况是Client端接收到了一个返回信息，它里面的数据是11

56.25-56.29

but the backup did not get the client request

但backup（备机）并没有得到Client端的请求


56.29-56.31

so its state is still 10 

So，它的状态依然是10

56.31-56.35

 now the backup takes over

现在backup（备机）接管了primary（主）的工作



56.35-56.38

because it sees the primary is dead

因为它看到primary（主）挂掉了

56.38-56.42

 and this client or maybe some other client sends an increment request to the new backup 

这个Client端或者其他Client端会发送一个增量请求给这个新的backup（备机）



56.42-56.44

and now it's really processing these requests 

现在，backup（备机）会真正去处理这些请求

56.44-56.50

and so the new backup when it gets the next increment requests，you know it's now going to change its state to 11

当这个新的backup（备机）拿到下一个增量请求时，它会去将它的状态修改为11



56.50-56.56

and generate a second 11 response 

并生成第二个值为11的响应



56.56-56.59

maybe the same client maybe to a different client 

发送请求的可能是同一个Client端，也可能是一个不同的Client端

56.59-57.05

which if the clients compare notes or if it's the same client it's just obviously cannot happened

backup（备机）会去比较注意，如果这是同一个client端发送的，那很明显这种情况我们是不会让它发生的

57.05-57.10

so you know because we have to support unmodified software

因为我们必须去支持某些不可修改的软件

57.10-57.14

 that does not understand there's any funny business of replication going on 

这些软件并不理解replication所犯的任何低级可笑的业务

57.14-

that means we do not have the opportunity to you know you can imagine the client could go you know we could change the client to realize something funny it happened with the fault tolerance and do I don't know what

也就是说，我们没有机会去让client 来认知到一些由容错（fault tolerance）而引发的低级可笑的事情，并去做一些我不知道的事情



57.25-57.26

but we don't have that option here 

但我们没有这种选择

57.26-57.30

because this whole system really only makes sense, if we're running unmodified software

因为当这些不可修改的软件正常运行时，整个系统才有意义



57.30-57.35

so so this was a big this is a disaster 

So，这就是一场大灾难

57.35-57.37

we can't have let this happen

我们不能让这种情况发生

57.37-57.44

 does anybody remember from the paper how they prevent this from happening

在座的有人知道paper中是如何防止这种事情发生的吗？



57.44-57.47

 the output rule

输出规则（output rule）

57.47-57.47

 yeah

说得对


57.47-57.59

 so you want to do you know yeah so the output rules is the their solution to this problem

对于这个问题，他们的解决方案就是强制使用特定的输出规则


57.49-58.09

and the idea is that the client is not allowed to generate you know and generate any output 

它的思路是，不允许Client端生成任何输出

58.09-58.12

the primary's not allowed to generate any output

我们也不允许primary（主）生成任何输出


58.12-58.22

and what we're talking about now is this output here until the backup acknowledges that it has received all log records up to this point 

我们现在所谈论的是，直到backup（备机）确认它已经接收到了此时所有的log record，我们才允许primary（主）对外发送输出



58.22-58.25

so the real sequence at the primary

So，在primary（主）中的实际状态序列是

58.25-58.30

 then let's now undone crash  the primary 

现在，让我们撤销primary中发生的这个故障


58.30-58.32

go back to them starting at 10

我们让它们的状态都变回10



58.32-58.40

the real sequence now when the output rule is that the input arrives 

现在，当输出规则是输入到达



58.40-58.48

at the time the input arrives， that's when the virtual machine monitor sends a copy of the input to the backup

输入到达的时间指的是，当虚拟机监视器（VMM）发送输入的副本给backup（备机）的时候



58.48-55.57

 so the the sort of time at which this log message with the input is sent is strictly before the primary generates the output 

So，严格来说，这个时间指的是在primary（主）生成输出之前，带有输入的log消息被发送的时候

58.57-58.59

sort of obvious 

这样看起来很明显

58.59-59.05 ****

then after firing this log entry off across a network 

接着，通过网络触发这个log entry后

59.05-59.07

and now it's heading towards the backup

现在，它就会发往backup（备机）处

59.07-59.10 

but I'd have been lost my not 

不要了



59.10-59.17

the virtual machine monitor delivers a request to the primary，server software it generates the output 

虚拟机监视器（VMM）向primary（主）发送了一个请求，服务器软件会生成输出信息

59.17-59.27

so now the replicated you know the primary has actually generated change the state to 11 and generated an output packet

So，现在，实际上primary已经将它的状态变为了11，并生成了一个输出数据包

59.27-59.27

 that says eleven

并表示它的值为11

59.27-59.29

but the virtual machine monitor says oh wait a minute

但虚拟机监视器表示，稍等一下

59.29-59.33

 we're not allowed to generate that output until all previous log records have been acknowledged by the backup 

直到所有之前的log record被backup（备机）确认（ack）后，我们才允许你生成输出数据包

59.33-59.37

so you know this is the most recent previous log message 

So，你们要知道，这个是最近的上一个log消息

59.37-59.49

so this output is held by the virtual machine monitor until the this log entry containing the input packet from the client is delivered to the virtual machine monitor and buffered by the virtual machine monitor 

so 此输出由虚拟机监视器保留握在手里，直到包含来自client的输入数据包的log entry传递到backup虚拟机监视器并由虚拟机监视器buffer管理为止

59.49-59.51

but do not necessarily execute it 

但没必要去执行它

59.51-59.56

it may be just waiting for the backup to get to that point in the instruction stream

它这可能会等待backup执行指令流到属于它这个点


59.56-1.00.00

and then the virtual machine monitor here will send an active packet back

然后，这个虚拟机监视器（VMM）会返回一个活动的数据包

1.00.00-1.00.1

 saying yes I did get that input 

并表示，Yes，我拿到了这个输入

1.00.1-1.00.04

and when the acknowledgment comes back 

当ack返回

1.00.04-1.00.09

only then will the virtual machine monitor here release the packet out onto the network 

只有这样，接下来这里的虚拟机监视器（VMM）才会释放输出数据包到网络中

1.00.09-1.00.14

and so the idea is that if the client could have seen the reply

So，这里的思路是，如果Client端能看到这个回复

1.00.14-1.00.19

 then necessarily the backup must have seen the request and at least buffered it

那么backup（备机）必然看到了这个请求，并且至少将它放进buffer区

1.00.19-1.00.27

and so we no longer get this weird situation in which a client can see a reply 

这样，我们也就不会在当client端看到一个回复时，进入到这种糟糕的境地

1.00.27-1.00.32

and then there's a failure and a cut over and the replica didn't know anything about that reply 

然后，这里有一个失败，在主备切换时，backup（备机）不知道任何关于这个回复的事情

1.00.32-1.00.39

if the you know there's also a situation maybe this message was lost

这里也存在着一种情况，即这个信息丢失了

1.00.39-1.00.41

 and if this log entry was lost 

如果这个log entry丢失了

1.00.41-1.00.45

and then the primary crashes

然后，这个primary发生了故障

1.00.45-1.00.46

 well since it hadn't been delivered

Well，由于这个log entry并没有被发送到这里

1.00.46-1.00.49

 so the backup hadn't sent the ack that means if the primary crashed

so backup 并没有发送ack，这也就意味着，如果primary崩溃了

1.00.50-1.00.57

you know this log entry was brought in the primary crashed it must have crashed before the virtual machine monitor or at least the output packet

发出这个 log entry的primary 在虚拟机监视器（VMM）发出输出数据包之前崩溃了

1.00.57-1.01.01

 and prayer for this client couldn't have gotten the reply

这个client 是获取不到这个回复的



1.01.01-1.01.07

 and so it's not in a position to spot any irregularities

so 这样就无法发现任何违规行为

1.01.07-1.01.11

 they're already happy with the output rule

它们对这个输出规则很满意

1.01.11-.01.14

yeah

请问

1.01.29-1.01.30

 I don't know 

我也不知道

1.01.30-1.01.35

paper doesn't mention how the virtual machine monitor is implemented 

paper中并没有提到虚拟机监视器（VMM）是如何实现的

1.01.35-1.01.37

I mean it's pretty low level stuff

它是一个很底层的东西

1.01.37-1.01.48

because you know it's sitting there allocating memory and figuring page tables and talking to device drivers and intercepting instructions and understanding what instructions the guest was executing 

你们要知道，它要去分配内存，page表，并且要和设备驱动进行通信，拦截指令，并理解guest operating system所执行的指令是什么

1.01.48-1.01.54

so we're talking about low-level stuff what language is written in you know traditionally C or C++

So，我们所讨论的底层东西，通常是由C或C++所编写的

1.01.54-1.01.55

 but I don't actually know

但我实际上并不清楚

1.01.55-1.01.59

 okay 



1.01.59-1.02.08

this of the primary has to delay at this point waiting for the backup  to say that it's up to date

此时，primary（主）必须停下来等待backup（备机）来说它的状态是最新的

1.02.08-*1.02.15

 this is a real performance thorn in the side of just about every replication scheme

这是每种replication方案中都存在的性能难题

1.02.15-1.02.21

 this sort of synchronous wait where the we can't let the primary get too far ahead of the backup

在这种同步等待中，我们不能让primary（主）在执行上超过backup（备机）太多

1.02.21-1.02.23

because if the primary failed while it was ahead 

因为如果primary（主）在执行上比backup（备机）领先太多，然后它发生了故障

1.02.23-1.02.28

that would be the backup lagging lagging behind clients right

这就会导致backup（备机）的状态远远落后于Client端

1.02.28-1.02.31

so just about every replication system has this problem 

So，每个Replication系统都存在着这个问题

1.02.31-1.02.35

that at some point the primary has to stall waiting for the backup

即在某个时候，primary（主）必须停下来，等下backup（备机）

1.02.35-1.02.37

 and it's a real limit on performance 

这就是性能上的一个真正限制

1.02.37-1.02.40

even if the machines are like side-by-side and adjacent racks 

即使机器是并排放置或者放在邻近的机架上

1.02.40-1.02.48

it's still you know we're talking about a half a millisecond or something to send messages back and forth with a primary stalled 

那么这依然会发生我们所谈论的这个问题，即便来回发送信息只要半毫秒，primary（主）依然会停顿

1.02.48-1.02.52

and if we wanna like withstand earthquakes or citywide power failures

如果我们想去承受地震或城市供电故障所带来的后果

1.02.52-1.02.54

you know the primary and the backup have to be in different cities

primary（主）和backup（备机）必须放在不同的城市

1.02.54-1.03.02

that's probably five milliseconds apart every time we produce output if we replicate in the two replicas in different city every packet

如果我们将每个数据包复制到两个不同城市的replica中，那每次都会有5毫秒左右的延迟

1.03.02-1.03.10

that it produces this output has to first wait the five milliseconds or whatever to have the last log entry get to the backup

primary（主）所生成的每个输出数据包必须先等待5毫秒，以此让backup（备机）拿到最后一个log entry

1.03.10-1.03.11

and have the acknowledgment come back 

并发出ack返回

1.03.11-1.03.13

and then we can release a packet

然后，我们就可以让VMM释放这个数据包了

1.03.13-1.03.17

 and you know for sort of low intensity services, that's not a problem

对于那些低强度服务来说，这并没有什么问题

1.03.17-1.03.21

 but if we're building a you know database server

但如果我们构建的是数据库服务器

1.03.21-1.03.25

 that we would like to you know that if it weren't for this could process millions of requests per second

如果它不能每秒钟处理数百万条请求









四十一  阅举报
4-04
1.03.25-1.03.28

 then that's just unbelievably damaging for performance

那么，这会是令人不敢想象的性能损失



1.03.28-1.03.32

and this is a big reason why people you know 

这就是一个重要的原因

1.03.32-1.03.42

if they possibly can use a replication scheme that's operating at a higher level and kind of understands the semantics of operations

如果人们能在高级层面使用replication方式，并且能够理解操作的语义

如果人们有一个能在高级层面使用的replication方案，并且能够理解操作的语义

1.03.42-1.03.44

 and so it doesn't have to stall on every packet 

那么就无须在每个数据包上停顿了

1.03.44-1.03.48

you know it could stall on every high level operation

它可能会在每个高级操作处停顿

1.03.48-1.03.51

or even notice that well you know read-only operations don't have to stall at all

或者是，在只读操作上它不会停顿

1.03.51-1.03.53

 it's only write so that just all or something 

它只会在写操作或者其他操作上停顿

1.03.53-1.03.57

but you have to there has to be an application level replication scheme to to realize that 

但这必须通过应用程序级别的replication方案来对此进行认知

1.04.04-1.04.05

you're absolutely right 

你说的非常正确

1.04.05-1.04.08

so the observation is that you don't have to stall the execution of the primary

此处的意见是，我们无须停顿primary（主）上面的执行（知秋注：还是原来的vmware的老方案，只是primary不停）

1.04.08-1.04.10

you only have to hold the output

我们只需要保留输出就行

1.04.10-1.04.14

 and so maybe that's not as bad as it could be

So，这也许并没有想象的那么糟

1.04.14-1.04.14

but nevertheless 

尽管如此

1.04.14-1.04.21

it means that every you know in a service that could otherwise have responded in a couple of microseconds to the client

这意味着，在一个服务中，它可能需要花几微秒的时间来对Client端进行响应

1.04.21-1.04.31

 you know if we have to first update the replicas in the next city, we turn to 10 micro second interaction into it 10 millisecond interactions possibly

如果我们必须先更新另一个城市中的replica，我们需要花10微秒去对它进行交互，当然也可能是10毫秒

1.04.35-1.04.41

 if you have vast numbers of clients submitting concurrent requests

如果你们有大量的Client端提交并发请求

1.04.41-1.04.45

then you may be able to maintain high throughput even with high latency

那么即使是在高延迟的情况下，你们可能也得能够去保持高吞吐量

1.04.45-1.04.49

 but you have to be lucky to or very clever designer to get that

但你们必须得是个很聪明的设计者才能做到这点

1.05.02-1.05.03

that's a great idea

这是一个很好的想法

1.05.03-1.05.06

 but if you log in the memory of the primary

但如果你把log放在primary（主）中的内存中

1.05.06-1.05.08

 that log will disappear when the primary crashes

那么当primary（主）发生了故障，那么log也就丢失了

1.05.08-1.05.15

or that's usual semantics of a server failing is that you lose everything inside the box

server failing这个语义通常指的是我们丢失了这个盒子中的一切东西

1.05.15-1.05.17

like the contents of memory 

比如内存中的内容



1.05.17-1.05.24

or you know if even if you didn't if the failure is that somebody unplugged the power cable accidentally from the primary

如果这个故障是因为某个人不小心把primary（主）的电源线拔掉了



1.05.27-1.05.28

 even if the primary just has battery backed up RAM

即使primary（主）上面有断电保护，将数据备份在RAM中

1.05.28-1.05.28

or I don't know what

虽然我并不知道那是什么

1.05.28-1.05.30

 you can't get at it

但你没办法做到这点

1.05.30-1.05.32

all right the backup can't get at it

So，backup（备机）没办法拿到这个内容

1.05.32-1.05.39

 so in fact this system does log the output and the place it logs it is in the memory of the backup 

事实上，这个系统确实通过log记录了输出，并将它记录到backup（备机）中的内存里



1.05.39-1.05.44

and in order to reliably log it there，you have to observe the output rule and wait for the acknowledgment 

为了可靠地将它记录在备机上，我们必须观察输出规则并等待ack



1.05.44-1.05.49

so it's entirely correct idea just can't use the primary's memory for it 

虽然这是个完全正确的想法，但我们不能使用primary（主）中的内存来做这件事



1.05.49-1.05.53

yes

请问



1.05.53-1.06.00

say it again

请再说一遍

1.06.00-1.06.06

 that's a clever idea

这是一个很聪明的想法

1.06.06-1.06.12

so the question is maybe input should go to the primary but output should come from the backup

So，他的问题是我们是不是应该让primary（主）去处理输入，然后输出则是由backup（备机）负责



1.06.12-.06.15

I completely haven't thought this through

我完全没想过这点



1.06.15-1.06.16

 that might work 

这可能可行

1.06.16-1.06.19

that I don't know 

虽然我并不清楚

1.06.19-1.06.20

that's interesting

但这很令人感兴趣



1.06.20-1.06.30

yeah maybe I will

可能我会去试一下

1.06.30-1.06.43

okay 



1.06.43-1.06.59

one possibility this does expose though is that the situation you know maybe the a primary crashes after its output is released

这其中暴露出的一种可能情况就是，当primary发送输出数据后，primary就发生了故障

1.06.59-1.07.02

 so the client does receive the reply 

So，Client端确实收到了回复信息

1.07.02-1.07.03

then the primary crashes

然后，primary（主）就跪了

1.07.03-1.07.13

 the backups input is still in this event buffer in the virtual machine monitor of the backup

backup（备机）中收到的输入依然还在backup（备机）上的虚拟机监视器（VMM）中的事件buffer区中



1.07.13-1.07.16

 it hasn't been delivered to the actual replicated service

该输入还未被发送到实际的replicated服务中



1.07.16-1.07.20

 when the backup goes live after the crash of the primary

当primary（主）跪了之后，backup（备机）上线

1.07.20-1.07.28

 the backup first has to consume all of the sort of log records that are lying around that it hasn't consumed 

backup（备机）首先必须处理所有它还未处理的log record

1.07.28-1.07.30

because it has to catch up to the primary 

因为它必须赶上primary（主）的进度

1.07.30-1.07.32

otherwise it won't take over with the same state

否则，backup（备机）就无法以相同的状态去接手primary的工作

1.07.32-1.07.36

so before the backup can go live, it actually has to consume all these entries

So，在backup（备机）能够上线前，实际上它必须先处理这些log entry

1.07.36-1.07.41

 the last entry is presumably the request from the client 

最后一个log entry大概是来自Client端的请求

1.07.41-1.07.51

so the backup will be live after the interrupt that delivers the request from the client 

当这个来自Client端的中断请求发送到backup（备机）上时，backup（备机）就上线了


1.07.51-1.07.56

and that means that the backup well you know increment its counter to eleven

这意味着，backup（备机）会将它counter里面的数字变为11

1.07.56-1.07.58

 and then generate an output packet

然后，生成一个输出数据包

1.07-.58-1.07.59

 and since it's live at this point 

由于此时backup是上线的

1.07.59-1.08.02

it will generate the output packet 

它会生成输出数据包

1.08.02-1.08.06

and the client will get 2 eleven replies

Client端就会拿到两个值为11的返回信息（知秋注：之前已经通过老的primary拿到过一次了）

1.08.06-1.08.11

 which is also if that really happened

如果这种情况真的发生了

1.08.11-1.08.16

 would be anomalous 

这就会是一种异常

1.08.16-1.18.21

like possibly not something that could happen， if there was only one server

如果这里只有一台服务器，那么这种事情一般不太可能会发生

1.18.21-1.08.29

the good news is that  the almost certainly the client is talking to this service using TCP

好消息就是，几乎可以肯定的是Client端使用TCP来和这个服务进行通信



1.08.29-1.08.33

and that this is the request and the response go back and forth on a TCP Channel

请求和响应通过一个TCP Channel来回传递



1.08.33-1.08.35

 the when the backup takes over

当backup（备机）接管时

1.08.35-1.08.38

 the backup since the state is identical to the primaries 

由于backup（备机）和primary（主）的状态完全相同



1.08.38-1.08.42

it knows all about that TCP connection and whether all the sequence numbers are and whatnot 

它知道所有的TCP连接，以及其所有的序列号



1.08.42-1.08.45

and when it generates this packet

当它生成这个数据包时

1.08.45-1.08.51 ******

 it will generate it with the same TCP sequence number as an original packet 

它将使用与原始数据包相同的TCP序列号生成它

1.08.51-1.08.55

and the TCP stack on the client will say oh wait a minute that's a duplicate packet

Client端上的TCP stack看到这个数据包就会表示，Oh 等一下，这是一个重复的数据包

1.08.55-1.08.58

we'll discard the duplicate packet at the TCP level

我们会在TCP层面将这个重复的数据包丢弃

1.08.58-1.09.01

 and the user level software will just never see this duplicate

用户层面的软件就永远不会看到这个重复的数据包

1.09.01-1.09.11 ******

 and so this system really you know you can view this as a kind of accidental or clever trick

你可以将其视为一种偶然或巧妙的把戏

1.09.11-1.09.14

 but the fact is for any replication system

但事实上是，对于任何Replication系统来说

1.09.14-1.09.19

 where cutover can happen which is to say pretty much any replication system

这种切换情况可能会在任何Replication系统中发生

1.09.19-1.09.29

 it's essentially impossible to design them in a way that they are guaranteed not to generate duplicated output 

本质上来讲，这种确保它们不会产生重复输出的方案是不可能设计出的



1.09.29-1.09.34

basically you know you well you can err on either side I'm not even either not generate the output at all 

基本上，有一边发生的错误，我甚至都不能再产生输出（知秋注：如果backup挂掉，没办法再返回ack，也就不会再产生输出）

1.09.34-1.09.37

which would be bad which would be terrible

这可能会很糟糕，也会很可怕

1.09.37-1.09.41

or you can generate the output twice on a cutover

或者，你可以在切换时生成两个输出

1.09.41-1.09.48

that's basically no way to generate it guaranteed generated only once everybody errors on the side of possibly generating duplicate output

这种基本上没有办法去保证输出只生成一次，每种方案都可能在backup端转正后生成重复输出的错误

1.09.48-1.09.56

 and that means that at some level you know the client side of all replication schemes need some sort of duplicate detection scheme 

这意味着，在某些层面，Client端处所有的Replication方案需要某种检测重复的方案

1.09.56-1.09.58

here we get to use TCP 

这里我们使用TCP

1.09.58-1.10.03

that we didn't have TCP, that would have to be something else maybe application level sequence numbers or I don't know what

这里如果我们不使用TCP的方案，我们还可以去使用某些应用程序层面的序列号或者其他我所不知道的东西

1.10.03-1.10.05

and you'll see all of this 

你们以后会看到这一切

1.10.05-1.10.12

and actually you'll see versions of essentially everything I've talked about like the output rule  for example

比如将我谈及的每件事情进行版本号设计来作为输出规则

1.10.12-1.10.18

 in labs 2 & 3，you'll design your own replicated state machine 

在lab2和3中，你们会去设计你们自己的replicated state machine

1.10.18-1.10.19

yes

请问



1.10.44-1.10.47

yes to the first part

对于第一部分来说确实如此

1.10.47-1.10.49

so the scenario is 

So，这种场景是

1.10.49-1.10.51

the primary sends the reply

primary会发送回复信息

1.10.51-1.10.58

 and then either the primary send the close packet， or the client closes the connect the TCP connection after it receives the primary's reply

或者primary（主）发送了一个关闭连接的数据包，当Client端收到primary（主）的这个回复信息后，它就会关闭TCP连接

1.10.58-1.11.00

so now there's like no connection at client side

So，现在在Client端就没有连接了

1.11.00-1.11.02

There is a connection at backup side

在backup（备机）处有一个连接

1.11.02-1.11.09

so now the backup consumes the very last log entry that as the input is now live 

So，现在backup（备机）会去对最后一个log entry作为输入进行消费处理，并上线



1.11.09-1.11.14

so we're not responsible for replicating anything at this point right

So，我们不会对此时所复制的任何东西进行负责

1.11.14-1.11.15

 because the backup now live

因为backup（备机）现在已经上线了

1.11.15-1.11.18

 there's no other replica as the primary died

因为primary（主）跪了，所以现在没有其他replica



1.11.18-1.11.24

 so there's no like if if we don't if the backup fails to execute in lockstep with the primary 

So，如果backup（备机）没法在执行上和primary（主）同步



1.11.24-1.11.25

that's fine  actually 

实际上这没关系

1.11.25-1.11.27

because the primary is dead

因为primary（主）已经挂了



1.11.27-1.11.29

and we do not want to execute in lockstep with it 

我们不想与其同步执行

1.11.29-1.11.33

okay so the primary is now not it's live

Ok，现在primary（主）并不在线，然而backup（备机）是在线的

1.11.33-1.11.39

 it generates an output on this TCP connection that isn't closed yet from the backup point of view

backup（备机）会在这个还未关闭连接的TCP连接上生成一个输出数据包（以backup的角度来看，这个连接并未关闭）



1.11.39-1.11.45

this packet arrives the client on a TCP connection that doesn't exist anymore from the clients point of view

这个数据包会通过TCP连接到达Client端处（从Client的角度来看，这个TCP连接已经不存在了）



1.11.45-1.11.46

like no big whoopee on the client right

就好像这玩意对客户没什么大不了一样

1.11.46-1.11.50

 he's just going to throw away the packet as if nothing happened the application won't know

Client就会像什么事情都没发生那样，直接将这个数据包丢弃，并且应用程序不会知道这件事

1.11.50-1.11.57

 the client may send a reset something like a TCP error or whatever packet back to the backup 

Client端可能会发送一个TCP error之类的数据包返回给backup（备机）

1.11.57-1.11.57

and the backup does something or other with it 

然后，backup（备机）会对这个数据包进行某些处理

1.11.58-1.11.59

but it doesn't matter

但这没关系

1.11.59-1.12.02 ！！！！

because we're not diverging from anything

因为我们并没有因为任何东西而产生分歧

1.12.02-1.12.03

 because there's no primary to diverge from

因为这里primary（主）已经挂掉了，所以不会产生分歧

1.12.03-1.12.07

you can just handle a stray we said

你处理的不过是一个没用的东西而已

1.12.07-1.12.11

 however it likes and what it'll in fact do is basically ignore 

但事实上，我们的做法就是将它忽略



1.12.11-1.12.15

but there's no now the backup has gone live

现在，backup（备机）已经上线

1.12.15-1.12.19

 there's just no we don't owe anybody anything as far as replication

就Replication而言，我们不再欠别人任何东西（所有要处理的请求都处理完了）

1.12.19-1.12.20

 yeah

请问

1.12.20-1.12.36

学生提问





1.12.36-1.12.41

well you can bet since the backups memory image is identical to the primaries image

Well，你说得对，由于backup（备机）内存镜像和primary（主）内存镜像完全一样

1.12.41-1.12.46

 that they're sending packets with the very same source TCP number 

他们所发送的数据包上的TCP序号一模一样

1.12.46-1.12.49

and they're very same everything 

它们的一切都一模一样

1.12.49-1.12.51

they're sending bit for bit identical packets

它们会一点一点的发送完全相同的数据包

1.12.51-1.13.02

 you know at this level the server's don't have IP addresses 

你要知道，在这个层面上，服务器并不知道IP地址

1.13.02-1.13.09

for our purposes, the virtual machines you know the primary and the backup virtual machines have IP addresses

就我们的目的而言，primary和backup上的虚拟机是有IP地址的

1.13.09-1.13.17

but the physical computer and the vmm are transparent to the network

但物理计算机和虚拟机监视器(VMM)对于网络来说是透明的

1.13.17-1.13.18

 it's not entirely true 

尽管这么说并不完全正确



1.13.18-1.13.26

but it's basically the case that the virtual machine monitor in the physical machine don't really have identity of their own on the network

但基本上来讲，在这个情况下，物理机器上的虚拟机监视器（VMM）在网络上并没有它们自己的身份id



1.13.26-1.13.29

because you can configure that  then that way 

因为我们可以对其那样配置

1.13.29-1.13.35

instead these they're not you know the virtual machine with its own operating system in its own TCP stack

相反，在虚拟机上所运行的操作系统在它（虚拟机）自己的TCP stack中

1.13.35-1.13.36

 it doesn't IP address

它并没有IP地址

1.13.36-1.13.37

 underneath there an address 

在它下面有一个IP地址（虚拟机的）

1.13.37-1.13.39

and all this other stuff which is identical between the primary and the backup

primary（主）和backup（备机）中的所有其他东西都一模一样

1.13.39-1.13.41

and when it sends a packet

当它发送一个数据包时

1.13.41-1.13.44

 it sends it with the virtual machines IP address and Ethernet address

它在发送数据包时，会将虚拟机IP地址和以太网地址一起发送

1.13.44-1.13.52

 and those bits at least in my mental model are just simply passed through on to the local area network

至少在我看来，这些东西会通过局域网来简单地传输

1.13.52--1.13.54

 it's exactly what we want

这就是我们想要的

1.13.54-1.13.59

and so I think he doesn't generate exactly the same packets that the primary would have generated

So，我认为backup（备机）不会生成和primary（主）完全一样的数据包



1.13.59-1.14.02

 there's maybe a little bit of trickery

这可能有点挂羊头卖狗肉的意思

1.14.02-1.14.05

you know what the we if this is these are actually plugged into an Ethernet switch 

如果这些东西实际上是连接到了一个以太网交换机上

1.14.05-1.14.09

the physical machines maybe plugged into two different ports of an Ethernet switch 

这两台物理机器可能会插入到了这台以太网交换机的两个不同的端口上



1.14.10-1.14.20

and we'd like the Ethernet switch to change its mind about which of these two machines that delivers packets with replicated services Ethernet address 

我们希望通过以太网交换机来改变其运行方式，用以太网地址来进行这两台机器复制（replicated）服务的数据包传递

1.14.20-1.14.22

and so there's a little bit of funny business there 

So，此处的业务有点有趣

1.14.22-1.14.26

for the most part they're just generating identical packets

对于大多数情况下，它们就只生成完全一样的数据包

1.14.26-1.14.27

 so let me just send them out

并将这些数据包发送出来



1.14.27-1.14.30

okay



1.14.30-1.14.36

so another little detail I've been glossing over is that

So，我另一个一直在讲的细节就是

1.14.36-1.14.40

 I've been assuming that the primary just fails or the backup just fails 

我之前已经假设过，primary（主）发生故障或者是backup（备机）发生故障的情况



1.14.40-1.14.42

that is fail stop right 

这就是fail-stop



1.14.42-1.14.44

but that's not the only option

但这并不是唯一的情况

1.14.44-1.14.47

 another very common situation that has to be dealt with is 

另一种非常常见且必须被处理的的情况就是



1.14.47-1.14.51

if the two machines are still up and running and executing

如果这两台机器依然在线运行并且执行任务



1.14.51-1.14.53

but there's something funny happen on the network

但在网络中发生了某些有趣的事情

1.14.53-1.14.57

 that causes them not to be able to talk to each other

这导致这两台机器没法互相通信



1.14.57-1.14.59

 but to still be able to talk to some clients

但它们依然能够和某些Client端进行通信

1.14.59-1.15.02

 so if that happened

So，如果这种情况发生的话

1.15.02-1.15.04

 if the primary backup couldn't talk to each other

如果primary（主）和backup（备机）彼此之间无法通信

1.15.04-1.15.06

but they could still talk to the clients 

但它们依然能够和Client端进行通信

1.15.06-1.15.08

they would both think oh the other replicas dead 

它们就都会认为对方已经跪了



1.15.08-1.15.10

I better take over and go live

我最好应该接手对方的工作，并上线

1.15.10-1.15.13

and so now we have two machines going live with this service

So，现在我们有两台运行该服务的机器可以上线



1.15.13-1.15.17

 and now you know they're no longer sending each other log events or anything

现在，你们要知道，它们不再向对方发送log事件或者是其他东西



1.15.17-1.15.18

they're just diverging

它们就会产生分歧

1.15.18-1.15.22

 maybe they're accepting different client inputs and changes their states in different ways

它们可能会去接收来自不同Client端的输入，并且以不同的方式修改它们的状态



1.15.22-1.15.24

 so now we have a split brain disaster

So，现在我们就遇上了脑裂（split brain ）问题

1.15.24-1.15.27

 if we let the primary and the backup go live

如果我们让primary（主）和backup（备机）上线

1.15.27-1.15.32

because it was a network that has some kind of failure instead of these machines 

因为这是网络中存在的故障，而不是机器发生了故障

1.15.32-1.15.36

and the way that this paper solves it 

这篇paper中所提出的解决方式是

1.15.36-1.15.46

I mean is by appealing to an outside authority to make the decision about which of the primary of the backup is allowed to be live

通过让一个外界权威来决定到底是primary（主）上线还是backup（备机）上线



1.15.46-1.15.56

 and so  you know it turns out that their storage is actually not on local disk 

So，事实证明它们的存储实际上并不是放在本地磁盘上的

1.15.56-1.15.57

this almost doesn't matter

基本上来讲，这样做没啥大问题

1.15.57-1.16.00

 but their storage is on some external disk server

但它们的存储是放在某些外部磁盘服务器上的



1.16.00-1.16.04

 and as well as being in this server as a like totally separate service

这就像是一个完全独立的服务一样位于该服务器中

1.16.04-1.16.05

 there's nothing to do with disks

这个决定谁主的操作与磁盘无关


1.16.05-1.16.15

 there this server happens to abort this test  and set  test and set service over the network

接着，这个权威服务器会终止这个网络上的test-and-set（检查并设置）服务



1.16.15-1.16.19

 where you can send a test and set request to it 

我们可以向它发送一个test-and-set请求给它



1.16.19-1.16.21

and there's some flag it's keeping in memory 

在它的内存中会保存某个标记符flag （知秋注：利用cas来实现）

1.16.21-1.16.24

and it'll set the flag and return what the old value was

它会对这个flag进行设置，并返回原来的值

1.16.24-1.16.29

 so both primary and backup have to sort of acquire this test and set flag

So，primary（主）和backup（备机）都必须获取这个test-and-set flag

1.16.29-1.16.30

 it's a little bit like a lock

这个flag就有点像锁



1.16.30-1.16.37

in order to go live they both may be send test and set requests at the same time to this test and set server 

为了能够上线，它们两个可能会在同一时间向这个test-and-set server发送test-and-set请求



1.16.37-1.16.41

the first one gets back a reply that says oh the flag used to be zero now it's one

第一个请求会拿到一个返回信息，它里面表示flag之前是0，现在它的值是1



1.16.41-1.16.45

 this second request to arrive the response from the testing set server 

第二个到达test-and-set服务器的请求所拿到的响应表示



1.16.45-1.16.48

is Oh actually the flag was already one when your request arrived 

Oh，当第二个请求到达时，这里的flag的值已经是1了

1.16.48-1.16.52

so so basically you're not allowed to be primary

So，基本上来讲，我们就不允许让它变为primary（主）

1.16.52-1.16.59

and so this this test and set server and we can think of it as a single machine is the arbitrator 

So，我们可以将这个test-and-set服务器当成是一个仲裁员

1.16.59-1.17.06

that decides which of the two should go live if they both think the other ones dead due to a network partition

如果由于network partition的问题，这两台机器认为它们中另一台机器出现了问题，那么这个仲裁员就会决定这两台机器中哪一台该上线，



1.17.06-1.17.10

 any questions about this mechanism

你们有人对这个机制有任何疑问吗？

1.17.10-1.17.15

 you're bursted 

那你就炸了

1.17.15-1.17.20

yeah if the test and set server should be dead at the critical moment

如果这个test-and-set服务器在某个关键时刻跪了

1.17.20-1.17.24

 when and so actually even if there's not a network partition

实际上，即使这里没有发生network partition这种问题

1.17.24-1.17.28

 under all circumstances in which one or the other of these wants to go live

 在所有情况下，这两台机器中其中一台想上线



1.17.28-1.17.30

 because it thinks the others dead 

因为它认为另一个机器已经跪了

1.17.30-1.17.31

even when the other one really is dead 

甚至当另一台机器真的挂掉了

1.17.31-1.17.35

the one that wants to be alive still has to acquire the test and set lock

这台想要去上线的机器依然必须获取到test-and-set这把锁



1.17.35-1.17.45

because one of like the deep rules of 6824  game is that you cannot tell whether or another computer is dead or not

因为在6.824这个游戏中其中一条深奥的规则那就是我们无法判断另一台机器是否挂掉了

1.17.45-1.17.48

 all you know is that you stopped receiving packets from it 

你所知道的就是你停止了从它那里接收数据包

1.17.48-1.17.51

and you don't know whether it's because the other computer is dead 

因为其他计算机挂掉了，所以你也不知道发生了什么情况

1.17.51-1.17.56

or because something has gone wrong with the network between you and the other computer

或者是因为你和其他电脑间的网络出现了问题

1.17.56-1.18.01

 so all the backup see well I've stuck in packets maybe the primary is dead maybe it's live

So，所有的backup（备机）会看到发送数据包时卡住了，primary（主）可能挂掉了，也可能还在线

1.18.01-1.18.03

primary probably sees the same thing

primary也可能看到了同样的事情

1.18.03-1.18.04

 so if there's a network partition

So，如果这里发生了一个network partition问题

1.18.04-1.18.08

they certainly have to ask the test-and-set server  but since they don't know  if it's a network partition

它们就不得不去询问test-and-set服务器，这里是否存在network partition这种问题，因为它们也不清楚



1.18.08-1.18.13

 they have to ask the test and set server regardless of whether it's a partition or not 

不管有没有发生network partition，它们都必须去询问test and set服务器

1.18.13-1.18.15

so anytime either wants to go live

So，在任何时候，它们中其中一台想要上线的话

1.18.15-1.18.17

 the test and set server also has to be alive

那么这个test-and-set服务器也必须是在线状态

1.18.17-1.18.20

because they always have to acquire this testing set lock 

因为它们始终必须获取到这个test-and-set锁

1.18.20-1.18.24

so the test and set server sounds like a single point of failure

So，这个test-and-set服务器听起来就像是一个单点故障（指系统中一旦失效，就会让整个系统无法运作的部件）



1.18.24-1.18.29

they were trying to build a replicated fault tolerant whatever thing

他们想试着去构建一个具备复制容错能力的东西


1.18.29-1.18.32

 but in the end you know we can't failover unless this is alive 

但在最后，除非这个test-and-set服务器处于在线状态，不然我们没办法进行容错

1.18.32-1.18.36

so that's a bit of a bummer

So，这有点无聊

1.18.36-1.18.39

 I'm guessing though

虽然是我猜的

1.18.39-1.18.45

 I'm making a strong guess that the test and set server is actually itself a replicated service and is fault tolerant 

我强烈怀疑这个test-and-set服务器实际上它本身就是一个replicated服务，并且具备容错能力

1.18.45-1.18.46

right 



1.18.46-1.18.57

it's almost certainly I mean these people Vmware they're like happy to sell you a million dollar highly available storage system that uses enormous amounts of replication internally

我几乎可以肯定的是，Vmware这群人肯定乐意向你们出售价值百万美金的高可用存储系统，该系统内部使用了大量的replication

1.18.57-1.19.02

 um since the testing set thing is on this server I'm guessing it's replicated too 

因为我猜测，这台服务器上这个test-and-set服务也具备replicated能力


1.19.02-1.19.11

and the stuff you'll be doing in lab 2 in lab 3 is more than powerful enough for you to build your own fault-tolerant test-and-set server 

你们在lab2和3中所做的东西足够的强大，它能让你们来构建你自己的fault-tolerant的test-and-set 服务器



1.19.11-end

so this problem can easily be eliminated

So，这个问题就能被轻易解决了





三十四  阅举报
