19-01



0-0.08

okay so we're in the middle of explaining Bitcoin design

关于比特币的设计，我们已经讲了一半了

0.08-0.17

 and I've gotten to the point of ask of wanting there to be a global published record of all the transactions 

现在我要问的问题是，我想让所有交易记录向全世界公开

0.17-0.22

all right



0.22-0.24

 okay



0.24-0.31

this is this requirement is very similar to the requirement for certificate transparency from last week

这个需求和上周讲的certificate transparency的需求非常相似

0.31-0.39

 and the solution is somewhat reminiscent although more sophisticated  then certificate transparency solution

它的解决方案要比certificate transparency的解决方法还要复杂

0.39-0.44

 and a name we want a public log this is often also called a public ledger

public log通常也叫作public ledger（共享账本）

0.44-0.45

 okay 



0.45-0.47

so how are we going to build ourselves a public ledger 

So，我们该如何构建出我们的共享账本呢？

0.47-0.51

so that everybody agrees on all the transactions that have already happened 

So，这样所有人就会同意已经发生过的那些交易了

0.51-0.55

and furthermore they agree on the order of the transactions

此外，他们也会对这些交易的执行顺序达成一致

0.55-1.01

 because if Y tries to send this coin to both Z and Q at the same time 

因为如果Y试着在同一时间向Z和Q打钱

1.01-1.04

you know we want the first one to win and the second one to be ignored

你知道的，我们想让第一笔交易成功，并忽略掉第二笔交易（知秋注：因为是同时发生两笔交易，如果总共手里就5块钱，第一笔成功了，花了5块钱，那第二笔交易必须取消，没钱了）

1.04-1.09

whatever Yellin which one want which transaction was came first  and which came second

不管是第一笔交易先到达，还是第二笔交易先到达

1.09-1.10

 and should be ignored okay

后到的那笔交易应当被忽略掉




1.10-1.15

so how to make a ledger

So，如何制作一个账本呢？

1.15-1.16

 so here's a bad idea

So，这里有个不太好的想法

1.16-1.27

well a good idea actually have the most simplest idea is to just pick somebody who everybody trusts and have that somebody maintain the ledger for you

Well，实际上这是个好想法，最简单的想法就是选一个你信任的人去为你维护这个账本

1.27-1.29

every time you want to do transaction

每当你想进行交易的时候

1.29-1.32

you tell the trusted entity what the transaction is 

你会告诉这个可信实体这笔交易是什么

1.32-1.33

it just accumulates a log

它只需往一份日志中追加内容即可

1.33-1.36

and it's willing to give a copy of that log to anyone 

它也愿意将该日志的副本提供给所有人

1.36-1.38

so anyone can inspect it and see if coins already been spent

So，每个人都可以检查这份日志，并看看这些比特币是否被花掉了

1.38-1.41

 and that actually is a good idea

实际上，这是一个不错的想法

1.41-1.44

 and if you could possibly do it，you should

如果你能这样做的话，那么你也应当这么做

1.44-1.45

 for various reasons

出于各种理由

1.45-1.49

 the Bitcoin designers rejected this very obvious straightforward idea

比特币设计者拒绝了这种非常明显又简单的想法

1.49-1.53

 and the fundamental reason is

根本原因在于

1.53-1.55

 that in a big system in a worldwide system 

在一个大型系统中，或者说在一个世界级规模的系统中

1.55-2.04

there's unlikely to be any single entity that everyone trusts and that is indeed trustworthy and has no corrupt employees for example

并不存在那种每个人都信任的实体，例如，那种没有任何腐败的员工的组织

2.04-2.06

 and in a global system

在一个全球性质的系统中

2.06-2.07

 you know that means that

这意味着

2.07-2.12

we can't have the United States you know government I'm the trusted entity 

我们不能让美国政府成为这个可信实体

2.12-2.14

because there's plenty of governments in the world too

因为政府的数量实际上太多了

2.14-2.16

don't necessarily trust the United States

我们不一定要去信任美国政府

2.16-2.19

 similarly for any other individual government

对于其他政府来说，也是类似的理由

2.19-2.21

 so really for a global system

So，对于一个全球系统来说

2.21-2.27

 there's no it's it's easy to argue against the idea of having a single central trusted entity 

我们很容易去反对这种想法，即使用一个中央可信任实体

2.27-2.34

so that leaves us way as well we want to run the system make a system that's built out of mutually untrusting participants

So，我们想运行这样一个系统，该系统是由相互不信任的团体一起构建的

2.34-2.42

 where we can survive malice by their participants 

在这个系统中，我们可以从这些参与者的恶意行为下存活下来

2.42-2.43

okay 



2.43-2.45

so here's a bad possibility

So，这里有一种比较坏的可能性

2.45-2.51

 let's just let anybody let's build a system on which anybody can join

我们来构建一种所有人都可以参与的系统

2.51-2.54

 so it's gonna have thousands maybe if computers

So，这里会有数千台机器




2.54-2.55

we'll call them peers 

我们将它们称为peer

2.55-2.56

they're scattered all over the Internet

它们分散在整个互联网上

2.56-3.04

and each one of them is going to be running the software to for our new cryptocurrency system

每台机器都运行着我们这个新加密货币系统的软件

3.04-3.10

 anytime somebody wants to have a new transaction 

每当有人想进行一笔新的交易时

3.10-3.16

like Y wants to send a coin to Z

比如，Y想发一枚比特币给Z




3.16-3.24

 Y floods their new transaction  sends their new transaction to all the peers  to send them directly

Y将它们的这笔新交易直接发送给所有peer

3.24-3.30

or another design which is actually what Bitcoin uses is that Y sends a new transaction to a couple the peers

另一种设计，同时也是比特币所使用的设计，它的做法是，Y将一笔新的交易发送给了两个peer

3.30-3.39

 and then the peers afford it sort of over individual TCP links to the entire rest of the system 

然后，这两个peer通过单独的TCP连接发送给该系统中的其他所有peer

3.39-3.42

so in every transaction ends up being sent to all the peers 

So，最终每笔交易会被发送到所有peer的手上

3.42-3.44

and the peers what they're trying to do is

peer所试着做的事情就是

3.44-3.49

 each of them maintain a complete copy of the log of all transactions 

每个peer都会维护一份关于所有交易的完整日志副本

3.49-3.51

and what we really want is

我们真正想要的是

3.51-3.57

for all the peers used all the honest peers for their transaction logs to be identical

所有诚信的peer手上的交易日志中的内容都是相同的

3.57-4.00

 they'll agree on which transactions exist 

它们将就存在哪些交易达成协议

它们都认可日志中存在的这些交易

4.00-4.03

and just as important on the order of those transactions 

同样，这些交易的执行顺序同等重要

4.03-4.11

so how can we arrange for all these peers to end up processing the adding transactions they're logs in the same order 

So，我们该如何让这些peer以相同的顺序将这些交易添加到它们的日志中呢？

4.11-4.13

remember

要记住

4.13-4.13

 of course



4.13-4.15

Y may have sent the transaction to Z

Y可能已经将这笔交易发送给了Z








4.15-4.23

 you know to these peers and at the same time sent its transaction to Q to some other set of peers

你知道的，它同时还将这笔交易发送给了其他peer，比如Q

4.23-4.33

 and we want to make sure that despite that  the peers end up with the same with identical logs even if Y is trying to trick

我们想确保这些peer手上的日志内容最终都是相同的，即使Y试图进行欺骗



4.33-4.37

 well I actually don't know how to design this 

Well，实际上我也不清楚该如何设计这种东西

4.37-4.42

one possibility that you can imagine is that

你们所能想到的一种可能性是

4.42-4.47

 the peers would somehow talk to each other about each new transaction

这些peer彼此之间会通过某种方式进行通信，以此来讨论关于每笔新交易的内容

4.47-4.52

 and for each new slot in the log would vote on what transaction should fill that slot

对于日志中每个新的slot来说，这些peer要对该slot中放哪笔交易而进行投票

4.52-5.00

and have the majority you know since they may disagree legitimately if they received different transactions 

如果它们收到了不同的交易，那么它们可能会合理地投反对票

如果它们收到了不同的交易，那么它们可能会不认同该交易的合法性（即投反对票）

5.00-5.01

we have a majority rule 

我们有一条少数服从多数的规则

5.01-5.04

that says well we're gonna all the peers are gonna look at all the votes

Well，我们要让所有peer去查看所有的投票

5.04-5.09

 and the transaction that gets the most votes is the one that will go in the next slot in the log

该日志中下一个slot中所放的那笔交易是得到票数最多的那笔交易

5.09-5.11

 and then they'll vote again on the next slot 

然后，它们会对下下一个slot代表的交易合法性进行投票

5.11-5.18

and you know maybe you could get this to work 

这种做法可能是可行的

5.18-5.21

you'd have to know who all the other peers are in order to know what a majority is

为了知道多数派是什么，你得知道有哪些其他peer

5.21-5.23

 you don't have to know how many peers there are

你无须知道这里有多少个peer

5.23-5.28

 and you really want to make sure that you never count any peer more than once

我们想确保，对于每个peer来说，我们永远不会多计一票

5.28-5.31

 but in a completely open system like Bitcoin

但在一个像比特币这样完全开放的系统来说

5.31-5.35

actually we can't do either of those things

实际上，我们不能做这些事情

5.35-5.37

 we don't know how many participants there are in Bitcoin

我们不知道比特币系统中有多少参与者

5.37-5.38

 and furthermore

此外

5.38-5.42

 the number changes all the time as people peers join and leave the system

当peer加入和离开系统的时候，peer的数量也会发生改变

5.42-5.44

 so we don't know how many peers are 

So，我们不知道这里面有多少peer

5.44-5.46

so we don't know what a majority would be

So，我们也就不知道这个多数派中有多少个peer

5.46-5.47

furthermore

此外

5.47-5.50

 we don't have a way to reliably count votes

我们没有可靠的办法去统计票数

5.50-5.54

such that each participant only gets one vote，even assuming that was desirable

即使这种假设是可取的，即每个参与者只能投一张票

5.54-5.57

 for example

例如

5.57-6.00

so we can't use IP addresses in order to decide it's distinct votes

我们不能通过使用IP地址来区分不同的选票

6.00-6.07

we can't say well each IP address gets one vote or at most one vote 

我们不能这样规定，即每个IP地址只能投一票

6.07-6.19

because it turns out to be extremely easy to either forge IP addresses or by breaking into people's computers to accumulate tens of thousands of real computers that you can control

因为事实证明，伪造IP地址或者入侵人们的电脑是非常容易的，这样的话，你就可以控制成百上千台电脑

6.19-6.28！！！！

and you of course would you can get them all to vote on your and you can get them all the vote in the system

Of course，你可以让该系统中这些被你控制的电脑都把票都投给你

6.28-6.36

so an attacker could probably accumulate a majority of votes relatively easily in a sort of straightforward design like this

So，在这种简单设计中，攻击者可以能够相对容易地积累起多数选票

6.36-6.39

and if an attacker can get a majority of the votes 

如果攻击者可以拿到多数选票

6.39-6.50

then it can use this majority to sit to sort of say different things conflicting things but with the majority each time

那么，在每次都有多数选票支持的情况下，他就能够做一些冲突的事情

6.50-6.52

so if Z asks the system

So，如果Z询问系统

6.52-6.59

oh you know with which of the two transactions came first

Oh，你知道哪笔交易先到达么

6.59-7.03

 cuz you know that remember the problem we worried about is 

因为我们所关心的问题是

7.03-7.04

that y is gonna double spend some coin

Y会花费两倍的比特币

7.04-7.08

 so it's gonna spend the same coin to Q 

So，它会将同一笔比特币转给Q

7.08-7.09

wants Q to believe that and

它想让Q相信这一点

7.09-7.13

it's gonna send that same Q's coin to Z

它也会将要发送给Q的这个比特币发送给Z

7.13-7.14

want Z to believe that 

它想让Z相信这一点

7.14-7.17

so maybe when Q asks what's the next transaction to log

So，可能在当Q询问日志中下一笔交易是什么的时候

7.17-7.20

the majority controlled by the attacker can say oh 

由攻击者所控制的多数派可能会说：Oh

7.20-7.23

you know Y transfer to Q is the very next one in the log

日志中下一笔交易就是Y转账给Q这笔

7.23-7.26

and that comes before this transaction

它比Y转给Z这笔交易先到达

7.26-7.27

 and when Z asks 

当Z询问的时候

7.27-7.31

maybe the attackers majority will say well you know the transfer Z comes first 

攻击者所控制的多数派就会说：Well，关于Z的这笔交易其实是先出现在日志中的

7.31-7.34

and this other transaction to Q comes second

关于Q的这笔交易则是在它之后出现在日志中的

7.34-7.36

 and that would mean the

这意味着

7.36-7.42

attacker can trick q + Z into accepting the same coin

攻击者能够欺骗Q和Z去接受同一笔比特币了

7.42-7.44

 that's a double spend

这就是双重支付

7.44-7.46

 and that's a disaster

这是一场灾难

7.46-7.49

so without some very clever idea

So，在没有使用一些非常巧妙的思想的情况下

7.49-7.50

 it's very hard to build an open system

我们很难去构建出这样一种开放的系统

7.50-7.55

you know without a controlled memberships 

你知道的，在没有受控会员的情况下

7.55-8.00

very hard to build an open system in which you have reliable voting

建立一个具有可靠投票权的开放系统是非常困难的

8.00-8.02

okay 



8.02-8.03 ！！！！！

but in fact 

但事实上

8.03-8.07

Bitcoin doesn't quite use voting 

比特币中并没有怎么使用投票这种方案

8.07-8.10

but it nevertheless manages to solve this problem 

但除非它没法解决这个问题，才会去使用这种方案

8.10-8.16

of how to get agreement on a single ledger despite malice 

即在存在恶意行为的情况下，该如何对单个账簿上的交易达成共识

8.16-8.19

so this is the Bitcoin blockchain

So，这就是比特币，区块链

8.19-8.30

and at this point there's a lot of different blockchain systems out there

与此同时，世界上有大量不同的区块链系统

8.30-8.37

 so actually I'm not even sure what blockchain as a term refers to but I'm only talking about Bitcoin right now

So，实际上，我也不确定区块链指的是什么，但在这节课上它指的就是比特币

8.37-8.40

 okay 



8.40-8.41

so the goal is

So，我们的目标是



8.41-8.45 

 we want agreement on a single transaction log

我们想对单份交易日志上的内容达成一致

8.45-8.47

 again because we want to prevent double spending

因为我们想防止这种双重支付的情况发生

8.47-8.53

 and this we're going to be building Bitcoin builds this thing called the blockchain

我们要去构建比特币，要去构建一种叫做区块链的东西

8.53-8.57

 that contains all the transactions on all the coins

它里面包含了所有比特币涉及的所有交易

8.57-9.00

 so it's a single blockchain 

So，它是一个单个区块链

9.00-9.04

that describes all the transactions in the system

它描述了该系统中的所有交易

9.04-9.07

 again as with the previous system

在之前的系统中

9.07-9.08

there's going to be many peers 

它里面有很多peer

9.07-9.11

so we still have this kind of overlay network

So，我们依然使用这种覆盖网络




9.11-9.20

a peer each peer is kind of building a copy of the log and a complete copy of the transaction log in its own memory

每个peer都会在它自己的内存中构建一份完整的交易日志副本

9.20-9.26

and we don't know how many peers they are 

我们不清楚这里面有多少个peer

9.26-9.28

or who they are

或者说，这些peer都是谁

9.28-9.33

but they form a sort of in one of these overlay networks spotted with TCP connections

但它们构成了一种使用TCP连接的覆盖网络

9.33-9.36

 and anytime a peer hears about a new transaction

每当一个peer收到有关一个新交易的信息

9.36-9.40

 like when Y wants to submit a payment transaction to Z or Q

比如，当Y想向Z或者Q提交一笔付款交易

9.40-9.42

 it's gonna send it to one or more peers

它会将该交易发送到一个或多个peer上




9.42-9.46

 and that peers gonna flood the transaction over the whole system

这些peer会将该交易传播到整个系统上

9.46-9.49

the way the log is built up

构建日志的方式是

9.49-9.52

 the way that blockchain is built up is

区块链构建的方式是

9.52-9.58

that each of the peers accumulates transactions and packs many transactions thousands into a block 

每个peer会将这些交易累积在一起，并将很多笔交易打包成一个区块

9.58-10.04 ！！！！！！

and then it's entire new blocks of transactions that are really appended to the ledger 

然后，就将这些新的交易区块追加到账簿上



10.04-10.08

again by flooding new blocks over the whole system 

并将这些区块传播到整个系统中

10.08-10.10

so that at least in theory

So，至少从理论上来讲

10.10-10.11

 every peer sees every new blocks 

每个peer都会看到每个新的区块

10.11-10.18

so the blockchains consists of blocks 

So，区块链中包含了区块



10.18-10.21

what each block looks like 

每个区块看起来是什么样的呢？

10.21-10.28

is the hash the previous block

它里面包含了前一个区块的hash值

它会对前一个区块进行hash




10.28-10.36

 it's a bit like my previous transaction  block broken transaction system 

这有点像我之前的那个区块交易系统

10.36-10.38

so we have the hash the previous block

So，我们对前一个区块进行hash加密

10.38-10.43

 like cryptographic hash the previous block 

即对前一个区块进行加密hash处理

10.43-10.45

there's a set of transactions

这里有一组交易

10.45-10.53

so these are individual spends from you know Y is trying to pay Q or whatever it happens to be

So，这里存在着一些个人支出，比如Y试着向Q支付钱款之类的

10.53-10.58

a couple hundred of whole thousand individual transactions 

这里面存在着几百或几千笔交易

10.58-11.06！！！

and each transaction is actually much as I described before it has the hash of the previous transaction for that coin

正如我之前描述的，每笔交易中包含了对该比特币前一笔交易进行hash得到的值

11.06-11.08

 

通常它会存在于前一个区块中




11.06-11.14

which is going to exist in a previous block typically it has deprived a signature by the private key of the previous owner of that coin 

它通过使用该比特币的前拥有者的private key来剥夺这个签名

通常我们会使用该比特币的前拥有者的private key对当前这笔交易的hash值进行签名（知秋注：表示这个比特币是由我交易给你的，有点类似于我签了一张支票给你）

11.14-11.15

and it is the public key of the new owner 

它是该public key的新所有者

当前交易的public key属于这个比特币的新拥有者

11.15-11.20

so this transaction would have that transfers money from Y the Q

So，这笔交易做的事情就是将钱从Y转到Q

11.20-11.31

 would contain Q's public key and a signature by with Y‘s private key plus a hash of a previous transaction in a previous block 

这里面会包括Q的public key，基于Y的private key所做的签名加上前一个区块中前一笔交易的hash值




11.31-11.40

as well as these transactions there's a nonce

这些交易中会携带一个nonce值

11.40-11.40

which I'll talk about in a moment

我稍后会讨论它

11.40-11.41

 it's just a 32-bit number 

它就是一个32位数字而已

11.41-11.44！！

and then the current time  roughly

接着就是当前的时间




11.44-11.50

 the way the system works is 

该系统的工作方式是

11.50-11.53

that the peers accumulate new transactions

这些peer会将新交易都累积起来

11.53-11.56

 and roughly every 10 minutes one of them produces a new block

差不多每10分钟，其中一个peer就会生成一个新的区块

11.56-11.58

 that should be the successor block

这应该是一个后继区块

11.58-12.05

 containing all the transactions that have been sort of sent into the system in the ten minutes roughly since the previous block was created 

它里面包含了由前一个区块创建后这十分钟内所有发送给该系统的交易

由前一个区块创建的一个区块，该新区块包含了在这十分钟之内该比特币发送到系统中的所有交易

12.06-12.12

and if you're if somebody tells you they're paying you Bitcoin

如果有人告诉你，他们正在向你支付比特币

12.12-12.15

 then before you accept that they've really done it 

在他们向你支付完毕之前

12.15-12.18

you need to watch the blockchain as it involves

你需要去看下这里涉及的区块链

12.18-12.20

 and you know blocks new blocks are sit everywhere

你知道的，这些新区块坐落在各个地方

12.20--12.21

 so the blockchain is quite public

So，区块链是相当开放的

12.21-12.25

 if you think somebody claims to have paid you 

如果有人声称已经向你付了钱

12.25-12.27

you need to watch the blockchain

你需要去查看这个区块链

12.27-12.28

 until you see a new block 

直到你看到一个新区块

12.28-12.39

that contains the transaction that you're expecting from the person that claimed to sent you money and with your public key at them

它包含了你希望的来自于这个人的针对你的这笔交易，该交易携带着你的public key

12.39-12.41

 that looks a valid you know correctly signed

它看起来是有效的，并且被正确签名

12.41-12.42

okay 



12.42-12.47！！

so everybody has to watch the blockchain for payments to them

So，所有人得去查看向他们付款的那个区块链

12.47-12.52

 all right



12.52-12.54

 so who creates each block

So，这些区块是谁创建的呢？



12.54-12.58

 this action of creating a new block is called mining

这种创造一个新区块的行为叫做挖矿

12.58-13.03

 and the technique that's used to produce a new block is often also called proof of work 

这种用来生成一个新区块的技术也通常叫做工作证明（Proof of Work）

13.03-13.09

in the sense that it requires a lot of CPU time to produce a new block

某种程度上来讲，它需要大量的CPU时间来生成一个新的区块

13.09-13.14

 and so the production of a new block essentially proves that you control a real live CPU

So，一个新区块的生成本质上证明了你控制了一个真正的CPU

13.14-13.19

 and you're not just mining new blocks on a fake computer 

而不是在一个虚假的电脑上对新区块进行挖矿

13.19-13.29

the new block in order to be valid

为了让这个新的区块是有效的

13.29-13.36

 a new block when you hash it，has to have a certain number of zeros at the beginning of the hash of the block

当你对一个新的区块进行hash操作时，在该区块的hash值的开头处得有一些0

13.36-13.38

 now of course 



13.38-13.43 

if you just take a bunch of arbitrary transactions and you do a cryptographic hash on it

如果你拿了一堆任意的交易，并对它们进行加密hash处理

13.43-13.54

 it's highly unlikely that the hash of some just whatever data is gonna have more than one or two or three zeros at the beginning of the cryptographic hash

在这些加密hash值的开头，几乎所有数据的hash值的开头都不太可能具有超过1个，2个或3个0

13.54-13.55

however

但是

13.55- 14.04

the computer that's mining the block can put any value it likes here for the nonce

那些正在挖矿的机器可以将任何它喜欢的值作为nonce值

14.04-14.06

 and so what the mining computers do is

So，这些矿机所做的事情是

14.06-14.09

 that they try different random values for the nonce

它们会试着随机猜测这个nonce值

14.09-14.12

just pick one with a random number generator

也就是从一个随机数生成器中选一个随机数

14.12-14.15

 that'll stick it in there copy of the block they're trying to mine

它们会试着将这个值贴到它们正试着挖掘的这个区块的副本中

14.15-14.16

then they'll compute the hash on the block

接着，它们会去计算该区块的hash值

14.16-14.22

and they'll check how many zeros how many leading zeros are in the hash with this particular nonce

它们会去通过这个nonce值去检查该hash值中前面有多少个0

14.22-14.23

 if it's enough leading zeros

如果前面有足够的0

14.23-14.25

 I don't know how many it is

我不知道这里面有多少0

14.25-14.28

 but it's you know sort of on the order of dozens

但你知道的，可能是数十个

14.28-14.29

 if there's enough leading zeros

如果该hash值前面有足够多的0

14.29-14.31

 and it's a valid mine a valid block

它就是一个有效的矿，一个有效的区块

1431-14.36

and the whatever peer it was that found this nonce

不管是哪个peer算出了这个nonce值

14.36-14.41

 that caused the block hash to have lots of leading zeros can flood this block over the network

那这就会让这个区块的hash值前面拥有很多个0，并且会将这个区块传播到网络中

这会将这个拥有着很多0开头hash值的区块传播到网络中

14.41-14.46

and you know all that's being equal that'll be the new next blockchain

如果所有东西都相等，那它就是下一个新的区块链

这也就是在等于说，这代表着下一个全新的区块链

14.46-14.47

 but typically

但通常来讲

14.47-14.54

the hash of the block with any given nonce you know won't have enough leading zeros

具备任意给定nonce值的区块的hash值前面并不会拥有足够多的0

在使用任意给定nonce值所计算出的某个区块的hash值中，该hash值前面可能并没有足够多的0

14.54-15.04

 and the mining the peer will have to try another nonce another random nonce keep doing that until it gets a block that hashes to a hash with enough leading zeros 

这个正在挖矿的peer就得去尝试别的随机nonce值，它得一直尝试，直到它找到一个开头拥有足够多0的hash值的区块

15.04-15.06

and so this takes a lot of CPU time

So，这要花大量的CPU时间

15.06-15.08

 it takes oh you know it's a random process

你知道的，这是一个随机过程

15.08-15.12

 but the system is sort of tuned

但该系统以某种方式进行了调优

15.12-15.19

and the number of zeros that are required to exist at the beginning of the hash of the block is set 

我们要对该区块的hash值开头存在的0的数量进行设置

15.19-15.22

so that it takes about ten minutes

So，这个过程要花10分钟左右

15.22-15.26

 you know with all the different peer， hundreds of thousands peers out there who are doing Bitcoin mining

对于所有那些正在进行挖比特币的peer来说

15.26-15.37

the average amount of time before the first one of them finds a nonce for a block that has enough leading zeros is set up to be ten minutes

它们中第一个找到符合条件的新区块的nonce值（它能让该区块的hash值中开头处拥有足够多的0）的平均耗时被设置为10分钟

15.37-15.39

okay 



15.39-15.47

so question how do peers or new peers discover other peers to communicate with 

So，这里的问题是，peer或者那些新peer是如何发现其他peer，并与它们进行通信的

15.47-15.48

yeah it's a great question

这是一个很棒的问题




15.48-15.53

 so this is sort of a reference to the this network of Bitcoin peers

So，这和比特币peer网络相关

15.53-15.55

 if I'm a new peer

如果我是一个新的peer

15.55-15.58

 you know I've install a new computer 

我装了一台新的电脑

15.58-16.00

I get Bitcoin software installed on my computer

我在我的电脑上安装了比特币软件

16.00-16.02

 and I want to join the Bitcoin network

我想加入比特币网络

16.02-16.04

 how do I know who to talk to 

我该如何知道，我该和谁进行通信呢？

16.04-16.08

and how do I know

我该如何知道。。。

16.08-16.08

Well 

Well

16.08-16.09

so the straightforward answer to that is

So，对于该问题来说，最直白的答案就是

16.09-16.16

 that the Bitcoin software has built into it on the IP addresses of a whole bunch of current peers

比特币软件中就已经内置了一堆当前peer的IP地址

16.16-16.22

 and so your software when you first fire it up into the binary the source whatever the

So，当你第一次启动你的软件时

16.22-16.25

Bitcoin software you know has a whole bunch of IP addresses 

比特币软件中保存着一大堆IP地址

16.25-16.31

and you try to make TCP connections to those existing peers

并且，你会试着和这些现存的peer去建立TCP连接

16.31-16.32

 and if all goes well

如果这一切良好

16.32-16.33

 you'll be able to connect to them

那你就能够连接到它们

16.33-16.36

 and you'll say look I'm new please give me a copy of the blockchain as it exists now 

你就会说，看，我是新来的，请给我一份现存的区块链副本

16.36-16.40

and they'll send you the current blockchain

它们就会将当前的区块链发送给你

16.40-16.43

which is about a couple hundred gigabytes right now 

现在的话，它的副本差不多是数百GB那么大

16.43-16.46

so that's if all goes well

如果一切没问题的话，那就是这样了

16.46-16.48

if all doesn't go well

如果这一切并不是那么顺利的话

16.48-16.51

 then you may run into problems

那么，你可能就会遇上问题

16.51-16.52

 like for example

比如

16.52-17.01

 if your copy of the software has been modified by somebody malicious to have a list of IP addresses that are all controlled by the attacker

如果你所拿着的软件副本被心怀恶意的人所修改，它里面保存的IP地址都是由攻击者所控制的

17.01-17.05

 or the attacker controls your computer network

或者，攻击者控制了你的电脑网络

17.05-17.08

so that regardless of who you try to connect to 

So，不管你要尝试连接到谁

17.08-17.10

you end up actually talking to the attackers machines

实际上，你最终会和攻击者的机器进行通信




17.10-17.16

 it may be that the attacker is running you know their own isolated network 

攻击者可能正在运行他们自己的隔离网络

17.16-17.22

and that you know you think your newly installed software thinks it's made a bunch of connections the Bitcoin nodes

你会认为，你新安装的这个软件是和比特币网络中的节点建立了一大堆连接

17.22-17.24

 but whoops they're all attackers nodes

但它们其实都是攻击者那一方的节点

17.24-17.25

 in that case

在这个例子中

17.25-17.29

 a blockchain you'll get will be watching controlled by the attacker

你所查看的区块链则是由攻击者所控制的

17.29-17.31

and you may well you will be in trouble

你可能会遇上麻烦

17.31-17.38

and you know there's pick one of some defenses against this

对于这种情况，你得使用一些防范手段



17.42-17.43

well

Well



17.43-17.48

if you downloaded correct Bitcoin software

如果你下载了正确的比特币软件

17.48-17.53

the correct Bitcoin software has built-in hashes of recent blocks in the blockchain 

软件内部就内置了该区块链中最近一些区块的hash值

17.53-17.54

and that means that

这意味着

17.54-17.58

 if you connect to some attackers in your running proper Bitcoin software

如果当你在运行比特币软件时，你和某些攻击者建立了连接

17.58-18.08

 at least the blockchain has to start with the first however many thousand blockchains have to be correct

至少前几千个区块链得是正确的

18.08-18.12

if you download it absolutely wrong software modified by the attacker

如果你下载的是由攻击者所修改过的错误软件

18.12-18.15

 then there's just nothing Bitcoin can do to help you

那么，比特币就对你无能为力

18.15-18.19

 then this is a potential weakness in the system

这是该系统中的一个潜在弱点

18.19-18.22

I haven't necessarily heard of anybody exploiting this

我不清楚有没有人利用这个弱点干坏事

18.22-18.27

but it's definitely something to think about

但我们肯定得去思考下它

18.27-18.29

ok 



18.29-18.31

back to mining

回到挖矿这块

18.31-18.31

ok



18.31-18.34

so the if you want to create a new block

So，如果你想要去创建一个新的区块

18.34-18.35

 you gotta find a nonce

你得找到一个nonce值

18.35-18.41

 that causes the new block you're trying to produce  causes hash to have lots of leading zeros

这会使得你试着生成的新区块的hash值前面拥有大量的0



18.41-18.43

 for an individual machine

对于单台机器来说

18.43-18.55

 you know the amount of time for an individual ordinary computer to find a nonce that satisfies this requirement is like at least in a months of CPU time

要找到一个满足要求的nonce值，CPU至少得花一个月的时间

18.55-18.59

but there's a very large number of Bitcoin miners out there

这其中存在着海量的比特币矿机

18.59-19.02

 and so even though any one of them would take a very long time to find a new block

虽然它们中任意一个都会花很长一段时间来找到一个新的区块

19.02-19.08

 or we really care about is the time for the very first one of them to find a block

或者说，我们真正在意的是它们中第一个找到一个区块的时间

19.08-19.11

and since they're all making these sort of random choices of nonce

因为它们都在随机尝试nonce的值

19.11-19.19

 one of them is gonna find a a nonce that fulfills the requirements relatively soon

它们中其中一个会以相对较快的速度找到满足要求的nonce值

19.19-19.31

 and the number a Bitcoin adjusts the number of required leading zeros in the hash in response to how fast new blocks seemed to be appearing

比特币系统可以调整hash值开头处所需的0的数量，以响应新区块出现的速度



19.31-19.36

so if new blocks are appearing much faster than once every 10 minutes 

So，如果新区块出现的速度比每十分钟出现一个还要来得快的话



19.36-19.40

Bitcoin will automatically increase the number of leading zeros that's required

比特币就会自动增加hash值前面所需要的0的个数

19.40-19.46

 and that'll make it correspondingly harder and take longer for the miners to find a a new block 

这会相应增加矿工挖矿的难度，并且要花更长的时间来找到一个新的区块

19.46-19.50

blocks are of course arriving slower than every 10 minutes over a sustained period of time 

Of course，如果在一定时间内，这些区块出现的速度比每十分钟一个来得慢

19.50-19.54

then Bitcoin will adjust the required number of leading zeroes in the hash to be smaller 

那么，比特币就会将hash值前面所需要的0的个数变小

19.54-19.56

and that means

这意味着

六十四  阅举报
19-02
19.56-19.58

it'll be easier quicker to find new blocks

这样就能更容易并且更快的找到新区块

19.58-20.07

to the sort of an adaptive scheme there to us blocks to new blocks show up run once every ten minutes roughly

通过这种自适应方案，这样就能大概每十分钟出现一个新区块

20.07-20.08

okay 



20.08-20.11

so this is the proof-of-work scheme

So，这就是Proof-Of-Work方案

20.11-20.22

 and this is essentially a solution and all in a funny way to the that voting problem I mentioned a few minutes ago 

本质上来讲，这是我几分钟前提到过的投票问题的一种有趣解决方案

20.22-20.27

where you can't really have some practice I have majority votes 

你不能确定多数票有多少

20.27-20.30

because we're not sure who the participants are or how many there are

因为我们不确定有哪些参与者，或者有多少个参与者

20.30-20.36

because people may sort of create fake computers fake IP addresses whatever it will 

因为人们可能会干伪造电脑以及伪造IP地址之类的事情




20.36-20.40

here You have to use CPU time

此处你得去使用CPU时间



20.40-20.46

which is a sort of real resource that cannot be faked in order to contribute a new block

为了贡献一个新区块，CPU时间是一种无法被伪造的真正的资源

20.46-20.48

 and that means that um

这意味着

20.48-20.51

 you know while it's not really a voting scheme 

你知道的，虽然这并不是一种真正的投票方案

20.51-20.54

the what it's essentially doing is 

它本质上所做的事情是

20.54-21.04

the new block gets to come from a effectively random choice over the different computers that are involved in mining 

新区块是来源于这些正在挖矿的不同机器，它会从中随机选一个

21.04-21.06

so this scheme is

So，这种方案其实是

21.06-21.16

 it's a sort of a random sort of cryptographically reasonably strong random selection process for who gets to choose the next block

这是一种密码学上合理的随机选择过程，通过该过程我们来决定下一个区块由谁挖出来的

21.16-21.18

 and so if there's a small number of attackers

So，如果这里有少量攻击者

21.18-21.24

they're highly unlikely to be selected by this process in order to contribute the next block

他们不太可能被该过程选中以此来贡献下一个区块

在该选择过程中，他们不太会被选中，以此来贡献下一个区块

21.24-21.25

 now what that means is

这意味着

21.25-21.32

 that if most of the participants or most of the CPU power in the system is controlled by non malicious people

如果大部分的参与者或者是该系统中大部分CPU算力是由不怀恶意的人所控制

21.32-21.36

 then most of the new blocks will be found by non malicious people

那么，大部分的新区块就会由那些不怀恶意的人所找到

21.36-21.40

 and that's not an immediate solution to double spending

这并不是双重消费的直接解决方案

21.40-21.42

 but we'll see that it

但我们之后会看到

21.42-21.45

 that it's the key to the double spending defense

它是防范双重消费的关键

21.45-21.50

 okay



21.50-21.53

all right 



21.53-21.55

so let's go back to our example

So，回到我们的例子

21.55-21.57

 we have a blockchain

我们有一个区块链

21.57-22.03

 that maybe looks like we currently block five

当前我们有一个区块5

22.03-22.07

block 5 has been published to everybody 

所有人都能看到这个区块5

22.07-22.14

all the peers are working on mining a potential block six

所有的peer都在挖掘潜在的区块6








22.15-22.16

and we don't know what's going to be yet

我们不知道这会发生什么

22.16-22.22

because the miners are still working on finding about nonce

因为这些矿工依然在对nonce值进行尝试

22.22-22.26

but you know we know that it has a bunch of transactions in it 

但你知道的，我们知道在这个区块中存在着很多笔交易

22.26-22.27

well if at this point 

Well，如果在此时

22.27-22.31

Y broadcasts you know say it's payment to Z

Y对外广播的他的这笔交易，即向Z进行付款

22.31-22.34

 well the the miner is already working on this block

Well，那些矿工已经在这个区块（B6）上进行挖矿了

22.34-22.38

so Y's new transaction and even if it sends it out

So，对于Y的这笔新交易来说，即使它已经对外发送出去了




22.38-22.41

so now probably not going to be incorporated in the block has been currently mind 

So，现在这笔交易可能还不打算被合并到这个区块（B6）中



22.41-22.46

but all the miners will kind of keep this new transaction and a buffer on the side

但所有的矿工都会保留这个新交易，并将它放在旁边的buffer中




22.46-22.51

and when one of them does find a new block for block 6 

当其中一个矿工找到了一个新区块，即区块6




22.51-23.01

then Y's transaction will be incorporated into the attempts to mine block 7 as soon as somebody does mine block 7

只要有人挖到了区块7，那么Y的这笔交易就会被放入这个区块7

23.01-*23.05

this Y arrow Z will actually be really in the blockchain 

实际上，这个Y->Z就会真正放在这个区块链中（知秋注：其实就是确定该链条属于最长链，才会在这条链上落地交易信息，关于这点参考后面内容）



23.06-23.09

all right 



23.09-23.15

so one question is

So，其中一个问题是

23.15-23.19

 could there be two different successors to block six

对于区块6来说，它是否可以拥有2个不同的后继区块




23.19-23.26

 could there be sort of a block seven and a block seven prime right

这里是否可以有一个区块7和区块7’

23.26-23.33

what prevents this structure from arising

是什么阻止了这种结构的出现呢？

23.33-23.35

 and of course the reason why we're interested in this

Of course，我们对此感兴趣的原因是

23.35-23.36

 is that if the structure could arise .

如果这种结构能够出现的话




23.36-23.45

then these two maybe seven prime B seven double prime

我们将一个区块叫做B7'，另一个区块叫做B7''

23.45-23.52

 then these two different b7s two different successive successors to b6 might have different transfers from Y

那么区块6的这两个不同后继区块（即B7'和B7''）中可能会包含来自Y的不同转账记录

23.52-23.55

and so if you were aware of just b7 prime

So，如果你只注意到了B7'这个区块

23.55-23.58

 you'd think Y paid it's Bitcoin to Z

那么，你就会觉得Y向Z支付了它的比特币



23.58-24.00

if you were we're only a b7 prime prime 

如果你只注意到了B7''这个区块

24.00-24.05

you this would click a totally legitimate payment from Y to Q

那么，你就会认为这里有一个完全合法的付款信息，即Y向Q付了钱

24.05-24.05

 my question is

我的问题是

24.05-24.08

 can there be two different successors to a block

一个区块可以有两个不同的后继区块么

24.08-24.12

 it turns out the answer is yes

事实证明，答案是Yes

24.12-24.16

 and it's actually does happen reasonably frequently 

实际上确实经常发生这种事情

24.16-24.17

and the reason is

原因是

24.17-24.22

 that there's you know thousands of peers out there Mining away

这里有数千个peer在进行挖矿

24.22-24.24

trying to find the successors to block six

并试着找到区块6的后继区块

24.24-24.27

 and they're likely mining

他们可能正在挖矿

24.27-24.31

 it's you know trying to produce somewhat different blocks with different sets of transactions in them

你知道的，它们正试着以某种方式生成那些保存着不同交易信息的不同区块



24.31-24.33

so it's easy to imagine a situation 

So，我们很容易想象出这种情况

24.33-24.37

in which some of the peers you know they happen to see just

某些peer碰巧看到的东西是。。。。

24.37-24.39

because of the way the transactions move through the network 

因为这些交易是通过网络移动的



24.39-24.42

they happen to see Y it's transferred to Z first and

它们碰巧先看到了Y给Z转账这个交易

24.42-24.44

incorporated into block their mining

并将这笔交易纳入它们正在进行采矿的那个区块




24.44-24.48

and other peers you know for sort of the same successors

对于正在挖掘同一个后继区块的其他peer来说

24.48-24.52

 but the their version of the block their mining as a successor to six

它们所正在挖掘的那个版本的区块才是区块6的后继区块

24.52-24.54

just happen to have seen this transaction first 

它们恰好先看到这笔交易（Y->Q）

24.54-24.55

and included that in the block 

并将它放入区块B7''



24.55-25.01

so we can easily get different miners trying to work in a way trying to produce different successors to be six

So，我们很容易遇上这种情况，即不同的矿工会以某种方式试着生成区块6的不同后继区块



25.01-25.08

if two of them happen to find a nonce that satisfies the leading zeros in the hash rule at the same time

如果它们碰巧同时找到了一个满足hash值规则中hash值开头处有关0的个数要求





25.08-25.10

that means

这意味着

25.10-25.11

 we have two different blocks

我们就会有两个不同的情况

25.11-25.14

2 totally valid blocks produced at the same time

同一时间会生成2个完全有效的区块

25.13-25.16

 and they're both going to send those blocks out into the network

它们会将这些区块发送到网络中

25.16-25.23

and they'll be seeing that you know on roughly the same time by all the other peers 

这些区块大致会在同一时间被所有其他peer所看到

25.23-25.25

so it could easily be the case

So，这很容易就会变成这种情况

25.25-25.33

 that two different two quite different successors to block six may arise

即区块6可能会有两个相当不同的后继区块




25.33-25.35

 and it's called the fork

我们将其称为分支（Fork）

25.35-25.44

and so we're very interested in what happens to Forks

So，我们对这些分支中会发生什么非常感兴趣

25.44-25.47

 because this can and does arise 

因为这种情况确实会出现

25.47-25.50

well the most immediate rule is that

Well，最直接的规则是

25.50-25.54

 as soon as any peer sees a successor 

只要任何peer看到这个后继区块

25.54-25.55

oh you know

Oh，正如你知道的

25.55-25.59

 all the peers are trying to mine a successor to block six

所有的peer都试着去挖掘区块6的后继区块

25.59-26.07

as soon as than ever any of them sees a new successor block be flooded from some peer that did successfully mine

只要它们中任意一个peer看到由其他peer所成功挖掘并传播到网络的那个新后继区块时

26.07-26.10

it'll stop working on six and

它就会停止对区块6所进行的挖矿工作

26.10-26.15

immediately switch to trying to work on a successor from b7

并立即切换到它（B6）的后继区块（即B7'）上试着进行挖矿

26.15-26.20

 so initially every peer as soon as it sees a successor block 

So，在一开始，只要有一个peer看到一个后继区块

26.20-26.23

switches to mining a successor for that successor block

它就会切换到这个后继区块上，并去挖掘该后继区块的后继区块

26.23-26.24

 so in this situation

So，在这种情况下




26.24-26.26

 some of the peers will see B7' first 

有些peer会先看到B7'

26.26-26.29

and start working on a successor to that

并去挖掘B7'的后继区块

26.29-26.34

 then other peers will start mine will see B7'' first

接着，其他的peer可能会先看到B7''

26.34-26.36

it's just depending on you know what they happen to see first

这取决于它们先看到哪个区块

26.36-26.39

if these two are mined at the same time

如果这两个区块被同时挖掘出来

26.39-26.42

 and they'll start working on a successor to b7 prime prime 

那么这些peer就会开始去挖掘B7''的后继区块

26.42-26.47

so now we got some of the peers working on sort of extending this fork in the blockchain

So，有些peer就会在该区块链延伸出来的分支（B7''）上进行挖矿




26.47-26.52

 and the other peers working on extending this fork in the blockchain

其他peer就会在该区块链的另一条分支（B7'）上进行挖矿

26.52-26.57

 however

但是

26.57-27.01

 another critical rule is

另一条关键规则是




27.01-27.11

 that if somebody's mining away on this trying to make one of these blocks 

如果有人正尝试在其中一个区块上进行挖矿

27.11-27.16

and it sees a new block for a different fork

他看到一条不同分支上有一个新的区块

27.16-27.17

 that's longer

这条分支比另一条分支还要长

27.17-27.24

then anybody working on extending this fork will switch to extending this longer fork 

那么，任何在下面这条分支（B7'）上进行挖矿的人就会切换到这条更长的分支（B7''）上进行挖矿





27.24-27.27

so that's a rule in the software

So，这就是该软件中的一条规则

27.27-27.31

that everybody is supposed to favor the longest chain

所有人都更倾向于在这条最长的链上进行工作

27.31-27.33

 so at least initially

So，至少在一开始的时候

27.33-27.37

if we have some of the peers mining away on one fork

如果某些peer正在其中一条分支上进行挖矿

27.37-27.39

 and the other and there's the same length 

另一条分支的长度和该分支相同

27.39-27.40

and others mining on the other fork 

其他peer则是在另一条分支上进行挖矿

27.40-27.42

it turns out

事实证明

27.42-27.46

 the variance in how long it takes to produce a valid nonce is pretty high

产生一个有效nonce值所花时间的变化幅度是很大的

27.46-27.52

so even if there's equal number of peers mining both Forks

So，即使这两条分支上进行挖矿的peer的数量相同

27.52-27.58

 it's highly likely that one of them will find a successor significantly before the other

其中一条分支上正在进行挖矿的某个peer很可能比另一条分支上正在进行挖矿的某个peer要更先找到一个后续区块

27.58-28.01

and so this successor will be flooded to a bunch of nodes

So，这个后继区块会被广播到一系列节点上




28.01-28.04

 appears that were working on this successor

并出现在所有正在这个后继区块上进行工作的peer面前

28.04-28.05

 and they'll all switch to the longer Fork 

这些peer就都会切换到这个更长的分支上进行挖矿

28.05-28.07

and so that means that

So，这意味着

28.07-28.11

 there's sort of an asymmetry here 

这里有点不对称

28.11-28.13

that causes

这导致了

28.13-28.22

 us a slight you know with if this Fork gets extended by the miner slightly before this fork

如果下面这个分支上的矿工让这个分支变得比上面这个分支长了一点


28.22-28.25

 then that'll contract miners over onto this fork

那么，这就会让这些矿工转移到这个分支上

28/.25-28.28

 it'll be more and more miners mining on this Fork

这样就会有越来越多的矿工会在下面这个分支上进行挖矿

28.28-28.33

 and so the new blocks will be found more and more rapidly on the winning fork

So，我们在这条获胜的分支上找到新区块的速度会越来越快

28.33-28.40

so there's a tendency sort of reinforced success  that's the longer fork gets longer and pretty soon 

So，这里有一种加强成功的趋势，即长度更长的分支会变得更长，并且速度更快



28.40-28.43

once all the miners have heard about this longer fork

一旦所有的矿工都知道这个长度更长的分支后




28.43-28.45

nobody will be left the mining on this fork

那么，就没人会留在这个分支上进行挖矿

28.45-28.47

 everybody will ignore it

所有人就会忽略这条分支

28.47-28.53

 and everybody will only treat this longest fork as the real chain

所有人都只会将这条最长的分支作为真正的链，以此来在上面进行挖矿

28.53-28.56

 okay



28.56-29.08

so it's highly likely that one   of the there's a fork that one of the two Forks will see an x-block first will be longer

So，这里很有可能发生的情况是，这两个分支中最先看到区块X（未知的区块）的那个分支会变得更长

29.08-29.10

 everybody all the peers will switch to mining on it 

那么，所有peer就会切换到该分支上进行挖矿

29.10-29.13

and that everybody will rapidly agree that one of the other is the longest fork 

这样，所有人就会迅速同意这条分支才是最长的分支

29.13-29.15

of course



29.15-29.28

the transactions on the abandoned fork you know usually most of the transactions usually these two competing forks have you know pretty much pretty similar set of transactions

你知道的，在这两个处于竞争关系的分支上存在着很多相似的交易信息





29.28-29.31

but there may well be  a few transactions here that were not there 

但这条分支上可能并不包含另一条分支上的某些交易信息

29.31-29.33

and certainly if somebody's trying，that will double spend 

如果某人试图进行消费，这可能会造成双重消费

29.33-29.39

but if there are transactions in the abandoned fork that didn't happen also to be in the winning fork 

但如果在这个废弃分支中有未执行的交易，那么它们也会出现在这个获胜的分支中

29.39-29.42

then these transactions they just go away 

然后，这些废弃分支上的交易信息就会被丢弃

29.42-29.48

there's no attempt in the sort of blockchain system itself to try to carry over these transactions now 

区块链系统自身不会试着去结转这些交易（即把这些交易信息从一个分支转移到另一个分支）

29.48-29.53

with it or there's no attempt to kind of directly merge the two forks 

我们不会试图去将这两个分支直接进行合并

29.53-29.53

now in fact

事实上

29.53-29.56

you know if you don't see your transaction show up

如果你没看到你的交易信息出现在这个分支上

29.56-29.58

you maybe reissue it

你可能会重新发起这笔交易

29.58-30.02

and you know because the blockchain is public  it'll become apparent

你知道的，因为区块链是公开透明的

30.02-30.04

that your transaction needs to be reissued

你需要重新发起你的交易

30.04-30.07

because it wasn't incorporated more in the winning fork

因为它之前并没有被打包进这个获胜的分支中

30.07-30.09

 however

然而

30.09-30.11

 it is also the case that

情况也许是这样的

30.11-30.14

 for a brief period of time

在短时间内




30.14-30.18

both of these transactions were in the blockchain

这两条分支上的交易都在该区块链中

30.18-30.21

 right so for a brief period of time

So，在一小段时间内

30.21-30.25

 there was a double spending of Y‘s coin in the blockchain

在该区块链中Y会发生双重消费的情况

30.25-30.30

 and that you know that's like a little bit of a dangerous situation

你知道的，这是一种有点危险的情况

30.30-30.31

 in fact

事实上

30.31-30.32

 you know it's an extremely dangerous situation

你知道的，这是一种极度危险的情况

30.32-30.35

right since the whole point was to avoid blockchains right 

因为这里的关键在于去避免区块链中发生这种情况



30.35-30.42

until one of these two chains got longer， now it was totally unclear  which of these two chains to believe 

直到这两条链中的某一条比另一条长的时候，它才能完全确定该去相信使用哪条链

30.42-30.45

and then these some of the peers may only know about one of them or the other of them 

那么，这些peer可能只知道其中一条链，或者是另一条链

30.45-30.49

so this raises a sort of unhappy question

So，这就出现了一个让我们讨厌的问题

30.49-30.55

 about how Q or Z you know what procedure should they use to be sure that they've actually been paid

即Q或者Z该使用什么办法来确保已经有人向他们付了钱



30.56-31.04

right apparently it's not enough for Z to say well as soon as the transaction appears in the blockchain  then I'm sure I‘ve been paid

对于Z来说，只要该交易出现在区块链中，它就能确定有人向他付了钱，显然，这样是不够的



31.04-31.05

 because that's not true

因为这并不正确

31.05-31.09

right  maybe this blockchain would end up being a shorter one

因为这个链最终可能会变成较短的那条链

31.09-31.11

 and the Y paies to Q blockchain will win

Y->Q所在的这条分支链最终会赢得胜利

31.11-31.12

similarly

类似的



31.12-31.20

 P you can't just look at oh you know my transaction showed up in this block and the blockchain  therefore it's a valid transaction 

你不能因为这笔交易出现在这个区块链中，因此就说它就是一笔有效的交易



31.20-31.23

because it may end up being abandoned due to being on a shorter fork

因为它可能变成那个较短的分支，而导致它被废弃

31.23-31.25

and so this is the reason for the rule

So，这就是这条规则所做的事情

31.25-31.33

in that people who care don't really believe in transactions until there's a couple of blocks after them in the blockchain 

直到包含他们交易信息的那个区块后面又多出了两个区块后，人们才会相信这些交易成功了



31.33-31.39

as the longer chain gets longer and longer 

随着更长的那条链变得越来越长

31.39-31.41

or as what you think is the longer chain gets longer and longer

或者，当你觉得更长的那条链变得越来越长时

31.41-31.50

 the chances that there might be some other chain that will become longer in it longer than it could vanishingly small 

那么，对于其他链来说，它们可能变长的机会就会越发渺小

31.49-31.52

because if you're on a slightly longer chain

如果你呆在一条稍微比较长的链条上的话

31.52-31.54

 that's going to attract miners to mining on it 

这条链就会去吸引矿工来它上面进行挖矿

31.54-31.57

so no other chain can grow very rapidly 

So，其他链就没法以很快的速度进行增长

31.57-31.58

and of course



31.58-32.08

the you know the rate in which a chain a particular fork can grow is proportional to the number of peers that are mining on that chain

这条链增长的速度与该链上正在进行挖矿的peer数量成正比



32.08-32.11

all right 



32.11-32.18

so this is the mechanism that prevents with it 

So，这种机制阻止了这种情况的发生

32.18-32.23

makes it so that if Y sends out two conflicting transaction  that's at the same time 

即如果Y同时对外发送了两个存在冲突的交易



32.23-32.27

even though there can be a brief double spend if there's a fork

如果存在分支的情况，那么这里会短暂出现双重支付的情况

32.27-32.33

 it will rapidly be only one or the other of the two transactions will be in the longest chain 

很快，这个最长的链中最终只会保留这两个交易中的其中一个

32.33-32.36

and so one of them will win in the sort of official chain

So，其中一笔交易会留在这个官方链中

32.36-32.47

 now and you know indeed if if this second transaction shows up is sent to peers later on after the Y transfer to Z in the chain 

如果第二笔交易是在链中Y->Z这笔交易落地后，才被发送到那些peer手上



32.47-33.00

then all the peers will ignore newly arriving transactions that for coins that have already been spent in a transaction on the chain on the fork that they're mining for 

那么，所有的peer就会忽略掉与该比特币相关的新交易，该比特币已经在他们所正在挖掘的那个分支上的交易中花掉了




33.00-33.09

so Y can't you know send out this transaction again after the first transactions shows up in the chain in the blockchain 

So，当第一笔交易（Y->Z）出现在区块链中后，Y就没法再次对外发送这笔交易（Y->Q）了

33.09-33.12

okay 



33.12-33.18

okay so you know there's some other attacks you might wonder about

Ok，这里还有一些你想要知道的其他攻击方式

33.18-33.20

 one question is

其中一个问题是

33.20-33.24

whether you know let's suppose that this

假设




33.24-33.28

is the this is the chain 

这是一个区块链

33.28-33.32

if Y is colluding with some peers 

如果Y与某些peer勾结在一起

33.32-33.36

and this is the official b7 and we have a b8 etc 

这里是官方区块B7以及B8，以此类推



33.36-33.36

you know

你知道的

33.36-33.42

supposing Y is league with some of the peers could appear take this block 7

假设Y与区块B7中的某些peer勾结在一起




33.42-33.44

it's now you know in the middle of the chain

你知道的，区块B7位于这条链的中间部分

33.44-33.51

 and change it to produce just a different block that doesn't have this transaction in it 

我们对B7进行修改以生成一个不同的区块，该区块中并不包含这笔交易




33.51-33.57

and just sort of substitute this new block for the old block seven

我们使用一个新区块来代替老区块B7

33.57-33.59

 and sort of pretend that block 8 refers to it 

假设区块B8引用了这个新区块




33.59-34.04

and now block this new block seven doesn't have a transaction

So，现在这个新区块B7'中并没有这笔交易

34.04-34.10

 and so that sort of very straightforward changing of a single block doesn't work 

So，这种对单个区块所进行的简单修改并不会奏效

34.10-34.10

and the reason is

理由是




34.10-34.15

that these arrows here are really really means

这些箭头所代表的意思是

34.15-34.20

 that there's a cryptographic hash in block 8 that is the hash of the block seven it refers to

区块B8中的这个加密hash值其实是区块7的hash值

34.20-34.26

 and so this hashing block 8 you know for for a block 7 that already exists 

So，在区块B8中，它里面之前就已经放着区块B7的hash值

34.26-34.29

this hash of block 8 is a hash of the original block seven

区块B8中的这个hash值其实是原来那个区块B7的hash值

34.29-34.31

if someone changes this content

如果有人修改了这部分内容

34.31-34.32

it's gonna have a different hash

它就会拥有一个不同的hash值

34.32-34.39

 and so this block 8 hash  if you try to pawn off this modified block on somebody who knows about block 8

So，如果你试图将这个修改过的区块提供给那些知道区块B8的人



34.39-34.47

they're gonna say we didn't have our keys you know hash doesn't hash to the same no block this block seven prime doesn't hash to the same value that's embedded in Block 8

他们就会说，区块B7'的hash值与区块B8中所保存的上一个区块的hash值并不相等



34.47-34.54

so you can't trick anybody who knows about subsequent blocks into accepting a modified intermediate block

So，你没办法去欺骗那些知道连续区块信息的人去接受一个中间被修改的区块

34.54-34.56

 all right， question

有个问题要问

34.56-34.58

I see Y is a Q’s store buy his coffee 

假设Y去Q的咖啡店买了杯咖啡

34.59-35.02

it shows up in one of the blocks

这笔交易出现在了其中一个区块中

35.02-35.06

oh I see

Oh，我知道该怎么讲了

35.06-35.09

 ok so this is a let me just back up a little bit 

So，我们稍微往前看一下

35.09-35.12

so I think the scenario we have is that

So，我觉得我们所遇到的场景是

35.12-35.13

 you know there was a blockchain

这里有一个区块链




35.13-35.18

 and then a brief fork

接着，这里短暂出现了分支的情况

35.18-35.19

and in that brief fork

在这种短暂出现的分支情况中




35.19-35.29

Y pay the same coin to two different parties 

Y将同一笔钱支付给了两个不同的团体




35.29-35.34

and let's say this is block 7 prime prime

假设，这个区块是B7''




35.34-35.38

 and it's block 7 that wins 

然后，这个是获胜的那个区块B7'

35.38-35.40

and is on the main chain

它位于主链之上

35.40-35.44

 and block 7 '' is it's just forgotten and ignored 

区块B7''就会被直接忽略掉

35.44-35.45

and the question is jeez

这里的问题是

35.45-35.51

you know for briefly at least Q saw this transaction show up in the chain and gave the cup of coffee to Y

当Q看到这笔交易出现在链中时，他会将这杯咖啡交给Y

35.51-35.53

and then Y left the store

接着，Y离开了商店

35.53-35.55

but then you know this part of the chain is discarded

但你知道的，链的这部分就会被废弃

35.55-35.57

 and Q is left with no money 

Q什么钱也没拿到

35.57-35.58

they've given away some coffee 

他们已经将这些咖啡送了人

35.58-35.59

but they did not get paid

并且他们并没有拿到任何付款

35.59-36.02

 and that just is what happens in this scenario

这就是这种情况下所发生的事情

36.02-36.03

 all right 



36.03-36.11

if Q was willing to handle with a cup of coffee after seeing the transaction in just the last block in the blockchain 

当Q看到这笔交易是出现在该区块链中最后一个区块中时，如果他愿意去卖这杯咖啡

36.11-36.13

then they'd risk this scenario

那么，他们就会冒着这种情况所带来的风险（即不一定能拿到钱）

36.13-36.14

 and there's nothing they can do about it 

对于这种情况，他们无能为力

36.14-36.16

and they can't get the money back

他们没法拿回钱

36.16-36.17

 I mean

我的意思是

36.17-36.18

unless you run down the street

除非你跑到大街上

36.18-36.20

 catch up with the person and

抓到这个人

36.20-36.21

take the cup of coffee away

并拿走他所拿的这杯咖啡

36.21-36.29

 and that is the reason why for high-value transactions your Starbucks trolley doesn't care very much right

星巴克不会太过在意这种情况

36.29-36.32

 that cup of coffee really only cost like you know 50 cents to make 

这杯咖啡的成本可能就是50美分

36.32-36.36

like if they occasionally you know these Forks don't happen that often

如果这些分支情况并不经常出现

36.36-36.38

 they occasionally lose a cup of coffee well 

他们也就只是偶尔丢掉一杯咖啡的钱

36.38-36.41

they can probably willing to deal with that

他们可能会愿意去处理这种情况

36.41-36.47

 but if Y was buying a car from Q for you know $20,000 Bitcoin

但如果Y从Q处花了价值20000美金的比特币来买一辆车

36.47-36.56

then Q probably would rather not let Y walk off  with this level of assurance that being paid 

那么，在没有获得付款保证的情况下，Q可能不愿意让Y离开



36.56-37.05

and that's the reason why if you care you'll wait until multiple blocks show up after the block in which your transaction was in 

如果你担心这种风险的话，那你就要等到你那笔交易所在的区块后再出现多个区块为止，这就是原因所在



37.05-37.10

so Z won't actually him if it's a high-value transactions

如果这是一笔高价值的交易

37.10-37.18

Z won't hand over the goods until there's at least some number five six blocks showing up after the block transaction shown upon

直到该交易所在的区块后面出现5个或者6个情况后，Z才会交货



37.18-37.29

and it's very unlikely that a a fork could be extended at five or six times like over a period of an hour now

在一个小时内，一条链不太可能出现被扩展5次或者6次的情况

37.29-37.31

the block's show up only every ten minutes 

因为每十分钟才会出现一个新的区块




37.31-37.35

and then turn out to be the shortest not the longest chain

那么，它（B7''）会被证实为最短的分支链，而不是最长的分支链

37.35-37.36

because that means that

因为这意味着



37.36-37.42

there was some other fork that was extending faster 

其他一些分支的扩展速度会更快

37.42-37.47

and the only way some other fork could extend faster is that if a majority of the cpu power was working on it

只有当大部分CPU算力都集中在这条链上时，那么这条分支的扩展速度才可能比其他分支来得更快



37.47-37.52

and we're assuming that a majority the cpu power is non-malicious

我们假设大部分CPU算力的控制者都是非恶意的

37.52-37.56

 and therefore switching to the current longest chain 

因此，我们就会切换到这个当前最长的链上进行挖矿

37.56-37.59

all right 



37.59-38.04

so this is you have to be if you're doing large value transactions you have to be careful

So，如果你在进行一些价值很高的交易时，你就得小心谨慎

38.04-38.08

 and wait till a chain goes long and after your transaction shows up

这得等到该链变长，并且直到你的交易出现在区块中为止

38.08-.38.14

 okay 

====================

38.14-38.16

so okay



38.16-38.20

so I explained why you can't simply modify a block in the middle of the chain

So，我解释过了你为啥没办法去简单修改下区块链中部的区块





38.20-38.22

there's a related question

这里有一个相关的问题

38.22-38.25

which is supposing there's an existing blockchain

假设这里有一个现存的区块链




38.25-38.30

you know that's something that long

这个区块链有点长

38.30-38.38

and your transaction Y arrow transaction Y to Z shows up here in the blockchain

Y->Z这笔交易出现在该区块链中的这个地方




38.38-38.43

 and you want to get rid you want to hide that transaction now

你现在想去隐藏这笔交易

38.43-38.45

somehow make it so it doesn't exist

以某种方式让它看起来不存在

38.45-38.46

 well gosh 

Well，天哪




38.46-38.50

why don't you produce a new sort of alternate chain

为什么你不去生成一个新的备选链呢？

38.50-38.54

 that you know is mostly identical to the main the real chain

你知道的，它和主链看起来几乎就一模一样

38.54-38.56

 but it's longer

但它的长度要更长

38.56-39.01

 and just happens to omit Y is transferred to Z 

并且它碰巧忽略了Y转钱给Z这笔交易

39.01-39.05

and instead includes Y is transferred to Q 

相反，它里面包括的是Y转钱给Q这笔交易

39.05-39.06

and if you do the mining correctly for this 

如果你在这条链上进行正确的挖矿工作

39.06-39.09

and the hashes work out your chains longer 

根据hash值，我们算出你的链更长

39.09-39.11

and it just will be accepted under the rules of Bitcoin

根据比特币规则，它就会去接受这条更长的链




39.11-39.15

which everybody supposed to switch to the longest chain 

即所有人都应该切换到这个更长的链上

39.15-39.17

so how come you can't do this

So，为什么你不能这么做呢？

39.17-39.27

and this you know this would also allow you to double spend by essentially unspent in a previous spent quantity and

你知道的，通过消费那些上一笔交易中未消费的比特币，这会让你出现双重支付的情况

你知道的，通过这种方式可以让你做到双重支付的效果（知秋注：即在第一个链中交易了一次，随后又在伪造的链中又消费了一次，两次都落地了，参考之前讲的在等待几个区块之后，落地交易）

四十四  阅举报
19-03
39.27-39.33

my earlier comment about oh you're supposed to wait you know Z was to wait until the blockchain gets extended

在我之前的评论中我说过，Z得等到该区块链被扩展的时候才行

39.33-39.38

you know this is now a way to defeat Z waiting for the blockchain to extend it

这是一种能解决Z等待区块链被扩展的方法

39.38-39.43

so we're really because serious trouble if you could make this work

So，如果你能使这种方法奏效，那么我们就会遇上很大的麻烦

39.43-39.45

 okay 





39.45-39.48

so and somewhat well the answer is yes

Well，答案是Yes




39.48-39.49

 this can be made to work

这种方法可以奏效

39.49-39.52

 and here's how to do it

我们来讲下该怎么做吧

39.52-39.59

you know the main blockchain is being extended by the non malicious participants at some rate

你知道的，这些非恶意的参与者以某种速度对主区块链进行扩展

39.59-40.02

 right they have enough CPU power to you know produce a new block every 10 minutes

他们拥有足够的CPU算力，每十分钟就能生成一个新区块

40.02-40.03

if you're the attacker

如果你是攻击者

40.03-40.09

 and you have more CPU power than the entire non-malicious set appears

并且你的CPU算力要大于所有非恶意参与者的算力




40.09-40.13 

 then you're going to be able to generate blocks faster than the real chain 

那么你生成新区块的速度要比真正的区块链中生成区块的速度还要快

40.13-40.17

so your block makes your you know chain may start out shorter

So，你知道的，你的链一开始可能会更短

40.17-40.19

 and I may take you a while to generate each block

你要花些时间来生成每个区块




40.19-40.21

but you know maybe you can generate two blocks every ten minutes 

你知道的，你每十分钟可以生成2个区块

40.21-40.26

whereas the main chain is only capable of generating one block every ten minutes

然而，主链每十分钟只能生成一个区块

40.26-40.27

so that means that 

So，这意味着

40.27-40.28

for a while 

过了一段时间

40.28-40.33

you'll have caught up and exceeded the length of the main chain the main fork 

你生成的那条链会赶上并超过主链（主分支）的长度

40.33-40.35

and by the rules of Bitcoin

根据比特币的规则，

40.35-40.42

 everyone you non-malicious totally correct Bitcoin peers they'll all switch to your longer chain

那些非恶意的正确比特币peer就会都切换到你所制作的那条更长链上进行挖矿

40.42-40.42

 and that means

这意味着




40.42-40.47

 they'll all effectively forget this transaction and except this other transaction

除了Y->Q这笔交易以外，他们全员就会将Y->Z这笔交易给遗忘掉

40.47-40.49

this second spend of the same coin 

这就会让同一笔钱被消费两次

40.49-40.50

so if you're an attacker

So，如果你是攻击者

40.50-40.54

and you have more CPU power than the entire rest of the network

并且你所拥有的CPU算力要大于该网络中的剩余算力




40.54-40.55

you can produce this chain

那你就可以生成这条链

40.55-40.56

 and it means

这意味着

40.56-40.57

you can double spend

你可以进行双重消费攻击

40.57-41.02

 and you know 

你知道的

41.02-41.06

that's certainly you know something to think about

这里有些东西值得你去思考

41.06-41.15  

 but the reason why you might hope more be sort of somewhat confident that it couldn't arise is that 

但你希望这种情况不会出现的那种自信是来源于

41.15-41.18

in a big system with lots of participants

在一个拥有大量参与者的大型系统中

41.18-41.24

it might be very hard to assemble more CPU power than the entire rest of the system

我们很难去获得比整个系统剩余部分还要强大的CPU算力



41.24-41.26

so once the  Bitcoin grew big

So，一旦比特币系统变得很大的时候

41.26-41.28

 you know

你知道的

41.28-41.31

 people were somewhat confident

人们的自信来源于

41.31-41.34

 that the main sort of non-malicious system had enough cpu power 

这种非恶意系统中有足够的CPU算力

41.34-41.41

that it would be expensive for an attacker to assemble more CPU power than the rest of the system 

对于攻击者来说，组织起比系统中剩余CPU算力还要多的CPU算力的代价实在是太高了



41.41-41.42-

of course 



41.42-41.49 

for new cryptocurrencies that don't yet have very large mining operations going

对于那些新的加密货币，它们中还没有进行那种很大规模的挖矿行为

41.49-41.51

they're actually easy to shoot down 

实际上，它们很容易被干沉并破坏殆尽

41.51-42.00

it's easy for a new cryptocurrency like Bitcoin it's easy for an attacker you know for whatever reason to put it out of business by getting more CPU power

对于像比特币这样的新型加密货币系统来说，作为攻击者，如果你有足够多的CPU算力，那你就很容易将这种系统干沉并破坏殆尽



42.00-42.01

but for a big system like Bitcoin

但对于像比特币这样的大型系统来说

42.01-42.03

 it's somewhat difficult

做起来就有点困难了

42.03-42.05

 now that said the

它表示

42.05-42.13 

people who've looked into tried to figure out who controls mining CPU power 

人们会试着找出控制用于挖矿的CPU算力的那些人

42.13-42.25

and Bitcoin suspect that the biggest players have fractions of the total that are not that far from 50% 

比特币系统猜测，若最大的游戏玩家所掌控的算力与总算力的50%相差不远的话

42.25-42.32

and that certainly if you know two or three of the largest mining operations combined forces

如果这些玩家参与了该系统中2次或者3次最大规模的采矿行为

42.32-42.35

 that they would have a majority of the mining power in Bitcoin 

他们就掌握了比特币中绝大多数的算力

42.35-42.38

and could produce alternate Forks like this 

他们就能够生成像这样的备选分支

42.38-42.49

so that's a somewhat troubling development you know whether there'd be motivated to do something bad 

So，这是一种令人不安的发展，不管是否有人有动力去干坏事

42.49-42.52

especially since sort of everything that's done in Bitcoin is public

因为比特币系统中所发生的一切事情都是公开的

42.52-42.57

 that's what people would really notice that oh gosh that was a long chain 

人们就会注意到，Oh，这里有一条长链

42.57-43.00

and then we switch to a chain that started way far back

那么，我们就会切换到它之上

43.00-43.01

 boy would people ever notice that 

人们就会注意到这一点



43.01-43.06

and that would you know destroy confidence in Bitcoin

你知道的，这就会摧毁比特币给人们带来的自信

43.06-43.10

 and may undermine anything that the malicious parties were hoping to achieve

这可能也是那些恶意团体所希望做到的事情

43.10-43.13

so since you know it is very expensive actually

你知道的，这样做的代价其实十分昂贵

43.13-43.20

 you know the big players in mining in Bitcoin I spent a huge amount of money to buy the mining hardware that they owned 

那些挖比特币的大玩家会斥巨资去购买他们所拥有的那些矿机

43.20-43.23

and so they probably wouldn't want to undermine people's trust in Bitcoin

So，他们可能不希望去破坏人们对比特币的信任

43.23-43.27

because that would destroy the value of their vast collections hardware

因为这也会破坏他们所大量收藏的那些硬件的价值

43.27-43.30

all right 



43.30-43.32

any questions about the machinery here

对于这里的机制你们有任何问题吗

43.32-43.40

 all right 



43.40-43.45

so I have a couple of questions that I can ask and answer

So，这里我有两个问题可以问，并且我可以解答的



43.45-43.46

one question is 

其中一个问题是

43.46-43.50

that the ten minutes between blocks is actually a serious annoyance

实际上，生成新区块所需要的这十分钟间隔是一个很令我们烦恼的东西

43.50-43.51

it means that

这意味着

43.51-43.52

 if I want to buy something

如果我想去买个东西

43.52-43.53

it takes up to 10 minutes before the transaction shows up in the blockchain at all

在该交易彻底落地到区块链中之前，这个过程最多得花10分钟

43.53-44.00

even even in the first block

即使是该交易是在第一个区块中，也是如此

44.00-44.05

 and you know either I have to wait around for 10 minutes to get my cup of coffee

你知道的，我得等10分钟左右才能拿到我的那杯咖啡

44.05-44.11

 or the store owner has to give me my cup of coffee before the transactions in the blockchain at all

或者，在该交易落地到区块链之前，店家就得把我的咖啡给我

44.11-44.13

thus having to trust me

因此，他得相信我才行

44.13-44.18

so why can't we make the 10 minutes much shorter

So，为什么我们不能让这个10分钟变得短一点呢？

44.18-44.24

and you know actually the 10 minutes probably could be made shorter

你知道的，实际上，我们可以让这种10分钟长的间隔变得更短一点

44.24-44.28

 the practical reasons why it isn't shorter is that

为什么不能让这个间隔缩短的实际原因在于

44.28-44.32

 it actually it takes a while for new blocks to be flooded over the system 

实际上，我们需要花点时间将新区块的信息广播到整个系统中

44.32-44.34

right after a miner finds the next block

当某个矿工找到了下一个区块

44.34-44.40

 it has to be sent thousands of peers Bitcoin over possibly slow network connections

它就得将这个区块信息通过网速较慢的网络连接发送给比特币系统中的上千个peer手里

44.40-44.44

 and it may take quite a while before that block is known to all the other peers 

在该区块被其他所有peer所知道之前，这可能得花一些时间

44.44-44.46

and that means that

这意味着

44.46-44.50

there's some period of time in which other peers are mining on blocks 

在某段时间内，其他的peer正在在一些区块上进行挖矿

44.50-45.00

or wasting their time mining blocks that are I've been superseded by a block that hasn't yet beached them

或者，他们在浪费时间去挖掘那些我已经挖出来的区块，但他们还并不知道该区块的相关信息

45.00-45.04

basically 

基本上来讲

45.04-45.18  ！！！！！！ 

the fraction of time you spend mining wasting of trying mining blocks that have been superseded is related to how long it takes to mine each block compared to how long it takes to flood the block 

你浪费在那些已经被人挖掘出来的区块上的时间与每个被新挖出来的区块被广播到其他peer那里所花的时间有关

45.18-45.22

and so if you make the inter block interval shorter and shorter

So，如果你让这种区块生成的时间间隔变得越来越短



45.22-45.26

 then it starts to it gets small enough that

当这个间隔变得足够小的时候

45.26-45.28

it approaches the amount of time it takes the flood new blocks 

这个时间就会接近它广播这些新区块所需要的时间

45.28-45.33

and that would cause most peers to waste most of their mining effort

这就会让大部分peer浪费他们挖矿时所做的努力

45.33-45.36

 and since the miners are actually making money making Bitcoin by mining

因为这些矿工实际上是通过挖矿来赚比特币的

45.36-45.40

because there's a little reward to the successful miner of each block 

因为对于每个区块，成功挖到矿的那些矿工都会拿到一些小奖励

45.40-45.50

the miners are very uninterested in wasting resources mining for blocks that are have been superseded

对于矿工来说，浪费资源去开采那些已被取代的区块，这种事情他们不感兴趣

45.50-45.56

 and so they're very uninterested in this 10-minutes be much shorter than it it's now

So，对于让这种10分钟间隔变得比现在更短这种想法，他们非常不感兴趣

45.56-45.59

 and you know that's a significant constraint

你知道的，这是一种很大的限制

45.59-46.03

 so there's a question

So，这里有一个问题

46.03-46.10

 what prevents Y from double spending much in a much later block when peers might have forgotten about the first transaction

当这些peer可能已经忘记了Y所做的第一笔交易的情况，是什么阻止了Y在很后面的一个区块中出现双重消费的情况

46.10-46.12

 and so you know the question is 

So，这个问题是

46.12-46.15

oh you know in a very early block 

假设在一个非常早期出现的区块中




46.15-46.17

Y transferred a coin to Z

Y向Z转了一枚比特币




46.17-46.19

 and then there are thousand blocks later

接着，在这个区块后面又跟了数千个区块




46.19-46.26

Y tries to transfer the same coin to Q  you know like a year later or something

大概在一年之后，Y试着将同一枚比特币转给了Q

46.26-46.30

the answer to how this plays out is that

答案是这样的

46.30-46.32

all the peers remember this forever

所有peer都会永远记住这笔交易（Y->Z）




46.32-46.38

they absolutely remember every unspent transaction forever 

他们绝对会永远记住所有那些未消费的交易

46.38-46.39

and that means that

这意味着

46.39-46.47

actually that can't be the first right



46.47-46.53

I think nominally to tell you the truth I don't understand all the ins and outs of this 

实话实说，我也不理解这里面的来龙去脉

46.53-46.56

but one way the most straightforward way to solve this problem is

但解决这个问题的最简单办法就是

46.56-46.58

 for all peers to remember every transaction forever 

让所有peer永远记住每笔交易

46.58-47.02

and every incoming transaction  they check 

他们会对所有传入的交易进行检查

47.02-47.05

to make sure that the coin hasn't been spent yet

以此来确定这枚比特币是否被花掉了

47.05-47.09

they just the Of course create a database or index or something

Of course，他们可能创建了数据库或者索引之类的东西对这些进行管理

47.09-47.15

 but allows them to essentially check every record to see if this coin has already been spent

但本质上来讲，这使得他们去对每条记录进行检查，以此来确定这枚比特币是否被花掉了

47.15-47.20

 and I think you can although I don't fully understand this

虽然我并未完全理解这里面发生的事情

47.20-47.30

I think peers can discard a lot of though a lot of this information by only remembering information about unspent transactions

我觉得peer只需要去记住那些未消费的交易即可，并将其他很多信息丢掉就行了

47.30-47.32

so they keep a database of unspent transactions

So，他们维护了一个关于未消费交易的数据库

47.32-*47.36

 but it doesn't include spent coins

但这里面并不包含那些已经消费掉的比特币

47.36-47.40

 and if a new transactions coin isn't in the database of unspent transactions

如果一笔新交易所涉及的比特币并未包含在这个关于未消费交易的数据库中

47.40-47.42

 then it's just ignored、

那么，它就会被忽略掉

47.42-47.47

but this you know this database has to be every peer has to keep this database forever

但你知道的，所有peer都得永远去维护这个数据库



47.47-47.52

 so you know just of course 

of course

47.52-47.54

this is a in a way a very expensive system

从某种程度来讲，这是一个成本很高的系统

47.54-47.56

because what we're talking about is

因为我们所讨论的是

47.56-47.59

 you know maintaining a record of every transaction essentially forever

本质上来讲，我们要去永远维护每笔交易的相关记录

47.59-48.05

 and you know if you think about how many transactions there are per second or per year on earth

如果你去思考下世界上每秒或者每年所发生的交易数量

48.05-48.07

it's a vast number

这是一个庞大的数字

48.07-48.13

and so people really were serious about using Bitcoin they used it for everything in the way they use cash now

So，人们会很严谨地去使用比特币，当下现金能买的东西，比特币也能去买

48.13-48.18

 it would you know it would be an enormous system

它会是一个庞大的系统

48.18-48.21

 and there would be enormous performance streams on the system 

该系统拥有庞大的性能

48.21-48.27

and indeed Bitcoin is not really capable of supporting every transaction

比特币并不是真的能够支持所有交易

48.27-48.33

you couldn't run the entire financial system of the world on Bitcoin as it exists today

你不能将现今存在的整个交易系统都搬到比特币上面

48.33-48.36

there's a bunch of limits 

这里面存在着大量的限制

48.36-48.39

you know one limit is that

其中一个限制是

48.39-48.43

the full Bitcoin database already consumes a couple hundred gigabytes 

完整的比特币数据库已经占用了一两百Gb大小的空间

48.43-48.44

yeah that's actually not so bad

实际上，这并不算太糟

48.44-48.45

 because you can fit it on a disk

因为你能够将它保存在一个磁盘上

48.45-48.47

 but if it was a thousand times larger

但如果它的体积变成现在的一千倍那么大

48.47-48.52

it would start to be a serious problem to even store it  let alone search for stuff in it

就算是能够保存这些数据，那么搜索这里面的数据也会逐渐变成一个严重的问题



48.52-48.56

 the most immediate problem

最为直接的问题是

48.56-48.59

and it turns out that processing that transactions it's not terribly expensive

事实证明，处理这些交易的成本并没有那么昂贵

48.59-49.02

because for the peers it's mostly about hashing

因为对于peer来说，基本就是进行hash计算而已

49.02-49.04

 and these cryptographic hashes are pretty quick

计算这些加密hash的速度是很快的

49.04-49.11

 but the sort of most current you know ugly restriction is that

但当下

49.04-49.11

but the sort of most current you know ugly restriction is that

但当下尴尬的限制在于



49.11-49.16

these block cuz there's a limit to how big these blocks can be 

这些区块的体积能够有多大

这些区块的体积是有限制的，它们的大小可能只有1-2MB左右



49.19-49.23

and new blocks appear only every ten minutes

并且，每隔10分钟才会有新的区块出现



49.23-49.25

and so that means

So，这意味着



49.25-49.29

you only get you know less than a megabyte of new transactions per minute

你每分钟只能收到不到1Mb大小的新交易信息

49.29-49.38

 each transaction the sort of Val you know is very way various ways of abbreviating them

你知道的，我们会以不同的方式来缩写它们

49.38-49.40

 but you know each transaction is at least dozens or a hundred bytes

但你知道的，每笔交易的体积大小至少也是数十或者100 byte

49.40-49.42

 and that means that 

这意味着

49.42-49.48

the system can really only because of this block size limit  and the ten minute limit 

因为存在着区块大小方面的限制以及这种10分钟长度的间隔限制

49.48-49.53

the system can only process sort of thousands or tens of thousands of transactions

该系统只能处理数千或者上万笔交易

49.53-49.58

well I'm not sure I can divide properly

Well，我不确定我能够正确区分

49.58-50.09

 but it's not nearly enough to run the current way that Bitcoin set up is not nearly high-capacity enough to run the world all the world's financial transactions are

比特币系统现有的处理能力还不足以应对全世界的金融交易

50.09-50.13

 and so you know people change it，it evolves 

So，你知道的，人们对它进行了修改，它也随之演进了

50.17-50.18

but it's not really fast enough for everything 

但它处理交易的速度还是不够快

50.18-50.19

of course 



50.19-50.21

nobody's really using it for commerce

没有人会将它真正应用在商业之上

50.21-50.25

 it's mostly used for speculation as far as anyone can tell 

据我们所知，它主要用于投机

50.25-50.26

so it's not yet a problem

So，这还不算是一个问题

50.26-50.28

 but from a design point

但从一个设计的角度来看

50.28-50.30

that there needs to be some things fixed

这里面有些东西需要被修复

50.30-50.34

 okay 



50.34-50.36

so I mentioned before

So，我之前提到过

50.36-50.40

that the Bitcoin software adjusts the hardness of finding nonces

比特币软件会调整寻找nonce值的难度

50.40-50.43

that is the number of required leading zeros in the block hash

我们通过它找到符合条件（即该值前面有足够多的0）的区块hash值

50.43-50.50

 adjusts that dynamically to cause there to be ten minutes for block 

通过动态调整寻找nonce值的难度，以此来做到每隔10分钟生成一个新区块

50.50-50.55

one thing that has to be the case though is

必须要解决的一件事情是

50.55-51.00

 that all the participants have to agree on the required number of leading zeros

所有的参与者都得对该hash值中前面有多少个0这上面达成共识

51.00-51.02

 they actually all have to agree on the hardness of finding a nonce

实际上，在寻找一个nonce值的难度方面，他们得达成共识

51.02-51.08

and so if one peer sort of looks at the rate at which blocks have been produced

So，如果一个peer知道了区块的生成速度

51.08-51.12

and decides that it's too slow

并且觉得这个速度太慢了

51.12-51.15

 and it should make the require fewer leading zeros

那么它就会减少hash值中前面所需要0的数量

51.15-51.18

but the other peers haven't made the same decision

但其他peer还未做出相同的决定

51.18-51.23

then that first peers will be generating blocks that are rejected by the other peers

 那么第一个peer所生成的区块就会被其他peer所拒绝

51.23-51.29

because all the peers demand what they think is the correct number of leading zeros in the hash 

因为所有peer会共同去决定他们所认为hash值中前面0的个数的正确值是多少



51.30-51.37

so there has to be agreement on the hardness of finding a nonce

So，他们得在寻找nonce值的难度上达成共识

51.37-51.41

that the the peers have to agree exactly and what the current hardness is

这些peer都得对当前寻找nonce的难度上达成共识

51.41-51.42

otherwise they'll reject each other's blocks 

否则，他们就会拒绝彼此找到的情况



51.43-51.45

so how do they reach that agreement

So，它们该如何达成共识呢？

51.45-51.51

 it turns out actually to be totally straightforward 

事实证明，实际上，这真的很容易

51.51-51.55

they all are looking at the same blockchain after all

他们查看的都是同一个区块链

51.55-51.56

that was the whole point is  that 

这里的关键在于

51.56-51.58

you know except for temporary Forks 

你知道的，除了临时的分支链以外

51.58-52.03

there's just one blockchain everybody has a copy of the exact same bits in the blockchain 

这里就只有一条区块链，每个人手上的区块链副本中的内容都完全相同



52.03-52.09

and so the Bitcoin just defines a deterministic function

So，比特币定义了一个确定性函数

52.09-52.12

 that takes the current blockchain as its argument 

它将当前的区块链当做参数传入

52.12-52.19

and uses that to deterministically produce the current hardness of finding a nonce

并通过该函数来生成寻找一个nonce值的当前难度，这个结果是确定性的

52.19-52.20

 and the way it does that is

它的工作方式是

52.20-52.28

 basically it looks at the timestamps in the blocks to decide how fast the recent blocks have been produced

简单来讲，它会去查看该区块中的时间戳，以此来判断近来这些区块的生成速度

52.28-52.35

 but since everybody's looking at the same blocks and the same timestamps and is running the same function to adjust the hardness 

但因为所有人查看的都是相同的区块，相同的时间戳，并且使用的是同一个函数来调整难度

52.35-52.42

they all come to exactly the same conclusion about what the hardness ought to be for each successive block in the blockchain

它们就会得到完全相同的结论，即该区块链中找到每个连续的区块的难度系数是什么

52.42-52.46

so there's a kind of interesting agreement that's being enforced there

So，这里执行了一种我们感兴趣的协议

52.46-52.49

 because they all see the identical same logs

因为它们看到的都是完全相同的日志



52.49-52.51

all right



52.51-52.54

another interesting question is that

另一个我们感兴趣的问题是

52.54-52.59

one of the motivations that some people have for being interested in new cryptocurrencies is that 

有些人对新加密货币感兴趣的动机之一是

52.59-5302

they might be more anonymous than credit cards

比起信用卡来说，这些加密货币更具匿名性

53.02-53.05

and indeed credit cards are deeply non-anonymous

信用卡并不是匿名的

53.05-53.09

 since the credit card company knows exactly what you're up to

因为信用卡公司准确知道你是谁

53.09-53.10

I keeps a record of it

他们保存了这些记录

53.10-53.17

 whereas Bitcoin at least on the face of it you know Bitcoin there was nothing about a Bitcoin transaction that say had my name on it

至少从表面上来讲，比特币交易里面并不包含我的名字



53.17-53.20

now you might think

现在，你可能会想

53.20-53.22

 well each Bitcoin transaction has my public key in it

Well，每笔比特币交易中都包含了我的public key

53.22-53.23

man that's true

这是真的

53.23-53.25

if I don't change my public key 

如果我不去修改我的public key

53.25-53.27

and I always use the same public key

那么我始终用的就是同一个public key

53.27-53.32

 then once somebody figures out my public key is just relatively easy 

那么，人们就会相对容易地知道我的public key是什么

53.32-53.34

since whenever I pay somebody

因为当我向某人付钱时

53.34-53.36

they get to know my public key

他们就会知道我的public key是什么



53.36-53.42

 then people can track my activities by looking for my public key or my signature in the Bitcoin block

那么，人们就可以通过查找我的public key或者比特币区块中我的签名来跟踪我的活动

53.42-53.44

 and it's a public log

它是一份公开的日志

53.44-53.46

 so anybody can look

So，任何人都可以去查看它

53.46-53.49

now people everybody who cares

对于那些在意这点的人来说

53.49-53.54

 and I think most Bitcoin wallets offer actually generates fresh public keys for each transaction 

我觉得大多数比特币钱包实际上会为每笔交易都生成一个新的public key

53.54-53.55

I'm said

我说过

53.55-53.57

 anytime if somebody wants to pay me money

每当有人想付我钱时

53.57-54.01

 my wallet will generate a new never used before public private key pair

我的钱包就会生成一个之前从未被使用的public/private key pair

54.01-54.03

remember the private key

并记住这个private key

54.03-54.06

 then give the public key to the person who wants to send me money

接着，将这个public key交给想要发我钱的那个人

54.06-54.10

 and that makes the tracking harder 

这使得跟踪变得困难起来

54.10-54.13

but it turns out that

但事实证明

54.13-54.19

if you're up against determined sleuth

如果你就是要追查

54.19-54.24

there's you know there's enough clues if you make transactions often enough 

如果你经常要和人做交易，那么这就会留下足够多的线索

54.25-54.27

since the transactions are often tied to your real identity

因为这些交易通常是和你真正的身份标识绑定在一起的

54.27-54.30

 like if you buy something from Amazon with Bitcoin

比如，你使用比特币在亚马逊上买了东西

54.30-54.33

 yeah maybe the Bitcoin transaction it's not clear it's you

对于你来说，你可能并不清楚这笔交易的细节

54.33-54.37

but it probably needs to be shipped to you by FedEx to your home address

但它可能需要将货物通过FedEx发到你家

54.37-54.39

 and that's a little piece of identifying information there 

这上面有一些用于识别身份的信息

54.39-54.44

and that will allow somebody to figure out it was you who spent that money

这能够让人知道是你花了这笔钱买了这个商品

54.44-54.50

 and they'll be able to straight track backwards to see where that money came from to get another clue about who you are and what you're up to

他们就能够去跟踪这笔钱的来源，以及知道你是谁



54.50-54.51

so in fact

So，事实上

54.51-55.01

against amateurs Bitcoin is reasonably anonymous against serious adversaries

业余选手手上的比特币比起那些职业玩家来说，是相对匿名的

55.01-55.05

 a Bitcoin has turned out not to be particularly anonymous

事实证明，比特币的匿名性并不是那么高

55.05-55.08

okay



55.08-55.20

a little bit disappointing from a little bit disappointing for people who are interested in privacy or doing drug deals or financing illegal activity

对于那些从事隐私交易、毒品交易或者非法金融活动的人来说，他们对比特币还是有点小失望的

55.20-55.24

all right



55.24-55.27

sum up 

总结一下

55.27-55.28

the sort of key idea here is the

这里的关键思想是

55.28-55.32

blockchain like a public ledger that everybody agrees on

区块链就像是一个大家都认可的公共账本

55.32-55.35

 and that has every transaction on it  

上面记录了每笔交易

55.35-55.37

and all that has a lot of problems 

它也存在着许多问题

55.37-55.38

like with scalability

比如规模方面的

55.38-55.40

 if you can make it work

如果你能做到

55.40-55.41

 it's a great idea

那这就是个很棒的想法

55.41-55.44

another sort of key technical problem is

另一个技术方面的关键问题是

55.44-55.47

how to do this without any centralization

在没有任何中心机构参与的情况下，该如何做到这点

55.47-55.54

 now whether the centralization or decentralization of valuable property is kind of not really a technical question

将那些有价值的财产中心化保存或者是分散式保存，这都不是一个技术上的问题

55.54-55.55

 but if you value it

但如果你重视它

55.55-55.57

then it's just really cool and amazing

那么，它就真的很Cool，并且令人惊叹

55.57-56.08

but it's possible to have agreement on a single log with no central trust and I'm using participants many of whom are actively malicious 

但在没有可信任的中央机构的情况下，并且其中很多参与者都是恶意的，我们是有可能对单份日志上的内容达成共识的



56.08-56.10

and the final key idea is

最后一个关键想法是

56.10-56.14

 that is the idea of mining a proof-of-work

即挖矿中的Proof-Of-Work（工作证明）这种想法

56.14-56.15

 where it too has problems

它存在着太多的问题了

56.15-56.17

but it's very surprising 

但这个想法令人非常惊讶

56.17-56.28

that a technique existed at all that allowed agreement in a way that can't be fooled by these sort of fake IP address attacks

存在着这样一种技术，它允许以某种方式达成协议，并且它不会受到伪造IP地址这种攻击的欺骗

56.28-56.30

that doesn't suffer the same problems that voting suffers

并且它也不用去忍受投票场景下的相同问题

56.30-56.34

 that was a very surprising and interesting development

这是一种非常令人惊叹并且令我们感兴趣的发展

56.34-56.35

all right 



56.35-56.37

that's all I have to say 

这就是我要讲的全部内容了

56.37-56.42

the actually sent kind of continuing some of this line of thought 

实际上，我会继续沿着这条思路讲下去

56.42-end

and the next lecture which is a sort of different kind of decentralized system partially built on top of Bitcoin

下节课要讲的内容是一种有点不同的去中心化系统，它是部分基于比特币构建出的





五十  阅举报
