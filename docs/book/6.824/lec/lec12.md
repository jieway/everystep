12-01

0-0.04

all right today's topic is distributed transactions

All right，今天我要讲的课题式分布式事务

0.11-0.17

 and these come in really 2 implementation pieces

今天我要讲两个实现


0.17-0.21

 and that's how I'll cover them the first big piece of concurrency control 

首先我会讲下并发控制


0.27-0.29

the second is atomic commit

接着则是原子性提交

0.33-0.36

 and the reason why distributive transactions come up is

分布式事务出现的原因是

0.36-0.44

 that it's very frequent for people with large amounts of data to end up splitting or sharding the data over many different servers

对于人们来说，将大量的数据拆分到许多不同的服务器上，这种情况是很常见的

0.44-0.46

 so maybe if you're running a bank for example

So，比如，你在经营一家银行

0.46-0.54 ！！！！！！

 the bank balances for half your customers are one server and the bank balances for the other half are on a different server 

我们将一半客户的银行存款信息放在一台服务器上，另一半客户的银行存款信息放在另一台服务器上

0.54-0.58

let's do it like split the load both the processing load and the space requirements 

这样我们就可以降低处理压力以及存储空间上的需求

0.58-1.01

this comes up for other things too

它也会出现在其他情况里面

1.01-1.05

 maybe you're recording vote counts on articles at a website 

比如，你正在记录某个网站上文章的点赞数

1.05-1.13

you know the maybe there's so many millions millions of articles have the vote counts are and are on one server and half the vote counts on another

你知道的，这个网站上有数百万的文章都被点了赞，它们将一半的点赞数放在一台服务器，另一半的点赞数放在另一台服务器上

1.13-1.21

 but some operations require touching modifying or reading data on multiple different servers 

但有些操作需要对多个不同服务器上的数据进行修改或者读取

1.21-1.24

so if we're doing a bank transfer from one customer into another

So，如果我们让一个客户把钱转到另一个客户的账户中

1.24-1.26

well their balances may be on different servers

Well，他们的银行存款信息可能是放在不同服务器上的

1.26-1.28

 and therefore in order to do the balance 

为了做到转账

1.28-1.31

we have to modify data read and write data on two different servers

我们得在这两台不同的服务器上读取并修改数据

1.31-1.38

and we'd really like to or one way building these systems 

我们想通过一种方式来构建这些系统

1.38-1.40

and we'll see others later on in the course

我们会在之后的课上看到这方面的东西

1.40-1.46

 one way to build the system just try to hide the complexity of splitting this data across multiple servers

我们构建该系统的一种方式就是去试着隐藏将数据拆分到多个服务器上的复杂度

1.46-1.49

try to hide it from the application programmer

我们要尝试向应用程序开发人员隐藏这个复杂性

1.49-1.56

 and this is like traditionally has been a database concern for for many decades

这也是数据块方面数十年来所关心的问题

1.56-1.59

and so a lot of today's material originated with databases

So，今天要讲的很多都是都是源自于数据库

1.59-2.03

 but the ideas have been used much more widely in distributed systems

这些思想都被广泛运用在分布式系统中

2.03-2.08

which you wouldn't necessarily call a traditional database

这些东西你不一定会在传统数据库中看到


2.08-2.24

 the way people sort of usually package up concurrency control plus atomic commit is in abstraction called a transaction 

人们通常将并发控制和原子性提交这两个东西放在一起，抽象点来讲，其实就是事务


2.24-2.25

which we've seen before 

这个我们之前已经看到过了

2.30-2.32

and the idea is that 

这里的思路是

2.32-2.40

the programmer you know has a bunch of different operations may be on different records in the database

程序员可能会对数据库中所保存的不同记录进行一系列不同的操作

2.40-2.42

they'd like all those operations to be sort of a single unit 

他们想让这些操作变成一个操作单元

2.42-2.47

and not split by failures or by observation from other activities

这些操作不会因为故障而被分开，也不会被其他活动所观察到（即原子性）

2.47-2.57

 and the transaction processing system will require the programmer to mark the beginning and the end of that sequence of reading and writing and updating operations

事务处理系统会要求程序员去标记该操作序列的起点和终点，该操作序列中包含读取，写入以及更新操作

2.57-3.00

 in order to mark the beginning and end of the transaction

为了去标记事务开始和结束的位置

3.00-3.07

and the transaction processing system has certainly will provide certain guarantees about what happens between the beginning and the end

事务处理系统得为事务开始和结束之间所发生的事情提供一定的保证

3.07-3.09

so for example

So，例如

3.09-3.11

supposing we're running our bank

假设我们经营着一家银行

3.11-3.20

and we want to do a transfer from account of user X to the account of user y

我们想将用户X的钱转到用户Y的账户中


3.20-3.29

now these balances from both of them start out as 10 so initially X =10 y equals 10

假设他们的存款余额一开始都是10

3.29-3.32

and x and y I'm mean to be records in a database 

我的意思是，数据库中它们记录中的值就是10

3.32-3.36

and we want to transfer

我们想进行转账

3.36-3.42

 we will actually imagine that there's two transactions that might be running at the same time

实际上，我们可以想象得出这里可能会同时执行两个事务

3.42-3.45

one to transfer a dollar from account X to account Y 

其中一个事务是从X账户中转1美金给Y账户

3.45-3.54

and the other transaction to do an audit of of all the accounts at the bank to make sure that the total amount of money in the bank never changes

另一个事务则是用来对银行中所有账户的存款总和进行审计，以确保它们的总和不变

3.54-3.59

because after all if you do transfers you know the total shouldn't change  even if you move money between accounts

因为如果你进行了转账，那么它们的总金额不会因为你在两个账户间进行转账而发生变化

3.59-4.020

 in order to express this with transactions

为了通过事务来表达转账

4.02-4.05

 we might have two transactions

我们可能会有2个事务


4.05-4.07

 the first transaction call it t1

我们将第一个事务称之为T1

4.07-4.09

 is the transfer 

它是用来进行转账的


4.09-4.16

well mark the programmer is expected to mark the beginning of it with the begin transaction

程序员会在开始执行事务的时候标记下事务的起始位置


4.16-4.19

 which we write at the beginning x

这里我们写BEGIN_X



4.19-4.24

and then the operations on the two balances on the two records in the database

接着就是对数据库中这两条记录上的两个存款余额进行操作


4.24-4.33

 so we might add one might add one the balance X 

So，我们要对账户X的存款余额加一


4.33-4.39

and add -1 to Y 

然后对账户Y中的存款余额减一


4.39-4.45

and then we need to mark the end by the transaction

接着，我们需要去标记事务结束的位置

4.45-4.57

currently we might have a transaction that's going to check all the balance do an audit of all the balances find the sum or look at all the balances make sure they add up to the number that doesn't change despite transfers 

当前，我们还会通过另一个事务来审计并确保当前所有账户的存款总额不会因为转账而发生变化

4.57-5.03

so the second transaction I'm thinking about the audit transaction

So，第二个事务是用来进行审计的


5.03-5.09

also we need to mark the beginning and end

这里我们同样需要去标记事务开始和结束的地方


5.09-5.13

 this time we're just reading

这次我们要做的只是去读取数据

5.13-5.15

 there's a read-only transaction 

这是一个只读事务

5.15-5.20

we need to get the current balances of all the accounts

我们需要去获取当前所有账户的存款余额

5.20-5.22

they were just these two accounts for now

现在我们只有2个账户

5.22-5.25

 so we have two temporary variables we're gonna read

So，我们需要去读取两个临时变量


5.25-5.33

 the first one it's going to be the value of balance X

首先我们要去读取账户X的存款余额

5.33-5.35

just right get to mean we're reading that record

这里我们使用get来表示我们读取某条记录

5.35-5.37

 we also read Y

这里我们也需要去读取Y的存款余额

5.37-5.42

 and we print them both

我们将这两者的值打印出来


5.42-5.54

 and that's the end of the transaction

此时，这个事务就结束了

5.54-5.55

 the question is 

这里的问题是

5.55-5.58

what are legal results from these two transactions 

这两个事务所得出的合法结果是什么

5.58-6.00

that's the first thing we want to establish is

首先我们想要建立的第一个东西是


6.。00-6.05

 what are you know given the starting state namely the two balances for ten dollars

我们先要对这两个初始状态（即这两个存款余额）进行命名，即x=10，y=10

6.05-6.10

 and what could be the final results after you've run both these transactions maybe at the same time

接着，当我们同时执行完这两个事务后，它们的最终结果又是什么呢？

6.10-6.13

so we need a notion of what would be correct

So，我们需要一个概念来表示什么才是正确的

6.13-6.15

 and once we know that

一旦我们弄清楚这个

6.15-6.26

we need to be able to build machinery that will actually be able to execute these transactions and get only those correct answers despite concurrency and failures

我们需要能够去建立一种机制，在遇上并发和故障的情况下，我们也能够去执行事务并得到正确的结果

6.26-6.28

 so first what's correctness

So，首先，什么是正确


6.28-6.40

well databases usually have a notion of correctness called acid or bb-8 is acid 

Well，数据库通常将这种正确性概念叫做ACID


6.40-6.45

and it stands for atomic

A代表原子性（Atomic）

6.45-6.48

and this means that 

这意味着

6.48-6.51

a transaction that has multiple steps，you know maybe writes multiple different records

一个事务包含了多个步骤，你知道的，它可能要写入多条不同的记录

6.51-6.54

 if there's a failure despite failures

如果执行的时候发生了故障



6.54-6.57

either all of the write should be done or none of them

所有的写操作要么就执行完了，要么就全部不执行（知秋注：执行过程中所包含的事务执行完毕，或者执行过程中包含的事务里写操作全部不执行）

6.57-7.07

 it shouldn't be the case that a failure at an awkward time in the middle of a transaction should leave half the updates completed invisible and half the updates never done

我们不应该发生这种情况，即事务执行到一半的时候，发生了崩溃，更新操作执行了一半，另一半更新操作并没有被执行

7.07-7.08

 it's all or nothing

事务要么就执行完毕，要么就不执行


7.08-7.24

so this is all or none despite failures

So，在遇上故障的情况下，要么全执行，要么都不执行


7.24-7.26

the C stands for consistent

C代表的是一致性

7.26-7.32

 it's actually we're not going to worry about that 

实际上，我们并不需要去担心这个

7.32-7.41

that's usually meant to refer to the fact that database will enforce certain invariants declared by the application 

这通常指的是，数据库会强制让应用程序来声明某些不变量（知秋注：比如A账户和B账户的资金总和）

7.41-7.44

it's not really our concern today

这并不是我们今天所关心的重点

7.44-7.46

 the I though it's quite important 

这里的‘I’也相当重要


7.46-7.48

it usually stands for isolated

它通常代表的是隔离性

7.48-7.52

and this is a really a property

这是一个特性

7.52-7.59

 of whether or not two transactions that run at the same time can see each other's changes before the transactions have finished

两个事务在同时执行的时候，在它们执行完毕之前是否可以看到彼此所做的修改呢？

7.59-8.04

  whether or not they can see sort of intermediate updates and from the middle of another transaction 

它们是否能看到另一个事务执行到一半时的中间更新操作所做的结果呢？

8.04*-8.10

and your goal is know

你的目标就是对此了解就行

8.10-8.17

 and the sort of technical specific thing that most people generally mean by isolation is

人们通常所讲的隔离性是某种技术上的东西

8.17-8.20

that the transaction execution is serializable

事务执行是有顺序的


8.20-8.22

 and I'll explain what that means in a bit

我之后会稍微讲下这是什么意思

8.22-8.35

 but it boils down to transactions can't see each other's changes can't see intermediate states but only complete transaction results

但总而言之，当事务在执行的时候，它们彼此之间看不到对方所做的修改，也看不到那些中间值，它们只能看到执行完后的事务结果


8.35-8.37

and the final D stands for durable

最后，这里的D代表持久化

8.37-8.43

and this means that after a transaction commits 

这意味着，当这个事务被提交时

8.43-8.46

after the client or whatever program that submitted the transaction

当这个client端或者程序提交了这个事务

8.46-8.48

gets a reply back from the database

并从数据库处得到了一个回复

8.48-8.49

saying yes

数据库说：Yes

8.49-8.52

you know we've executed your transaction

我们已经执行完了你的事务

8.52-8.55

the D in acid means that 

ACID中的D意味着

8.55-8.59

the transactions modifications the database will be durable

数据库中事务所做的修改是持久的

8.59-9.03

 that they'll still be there they won't be erased by a some sort of failure

它们不会因为一些故障而消失

9.03-9.06

 and in practice that means

在实战中，这意味着

9.06-9.11

 that stuff has to be written into some non-volatile storage persistent storage like a disk

这些修改必须落地到某个非易失性存储设备上，比如磁盘

9.11-9.31

 and so today you are in fact for this whole course really our concerns are going to revolve around good behavior with respect to failure， good respect good behavior with respect to other from multiple parallel activities

So，我们今天的重点是围绕在面对发生故障的情况下，也能获得良好的性能。以及在面对有多个并行事件发生的情况下，也能获取到良好的性能

9.31-9.36

 and making sure that the data is there still they are after even if something crashes

并且得确保即使发生了崩溃，数据也依然还在磁盘上

9.36-9.48

 so the most interesting part of this for us is  the specific definition of  isolated or serializable

So，对于我们来说，最感兴趣的部分就是隔离性这块的serializable

So，对于我们来说，最感兴趣的部分就是隔离性或者序列化这方面的定义

9.48-9.56

 so I'm going to lay that out before before talking about how it actually applies to these transactions

So，在讨论它实际是如何应用到这些事务上之前，我会先对它进行介绍


9.56-10.06

so the isolated is usually and the definition for this

So，它的定义是

10.06-10.10

 if a set of transactions executes

如果我们要去执行一些事务

10.10-10.13

 you know concurrently more or less at the same time

你知道的，它们或多或少是在同一时间执行的

10.13-10.16

 they you are the set of results 

这里是它们的结果集

10.16-10.24

and here the results refer to both the new database records created by any modifications the transactions might do

此处的结果指的是由这些事务所做的修改所创建出的新的数据库记录

10.24-10.28

and in addition any output that the transaction produced

此外就是，任何由事务所生成的输出结果


10.28-10.33

 so our transactions these two adds since they change records their needs change records are part of the results

So，在我们的事务中，这里有两个add，它们需要去修改记录中的值，这两个值就是其中一部分结果

10.33-10.36

 and the output of this print statement is part of the results 

这里print语句所生成的数据也是结果的一部分

10.36-10.40

so the definition of serializable says 

So，这里serializable的定义指的是

10.40-10.43

the results are serializable

这些结果都是有序的


10.43-10.57

if there exists some order of execution of the transactions

如果此处的事务执行存在着某种顺序


11.20-11.26

 so we're gonna say a specific execution parallel concurrent execution of transactions is serializable

So，假设事务的并行和并发执行是有顺序的

11.26-11.29

 if there exists some serial order

如果这里存在着某种执行顺序


11.29-11.32 ！！！！！！！

 really emphasizing serial here

这里要强调下顺序

11.32-11.39

a serial order of execution of those same transactions that yields the same result as the actual execution 

以一定顺序执行这些相同事务在实际执行时会生成相同的结果

11.39-11.42

and the difference of here is the actual execution may have had a lot of parallelism in it 

这里不同的是，在实际执行的时候，里面存在着大量的并行性

11.42-11.51

but it's required to produce the same result as some one at a time execution of the same transactions

但它需要生成的结果要与某一时刻所执行的相同事务所得到的结果是一样的

11.51-12.01

 and so the way you check whether an execution is serializable whether some concurrent execution is serializable is you look at the results

So，我们检查一个执行是否有序或者一些并发的执行是否有序的方式就是去查看执行结果



12.01-12.08

 and see if you can find actually some one at a time execution of the same transactions that does produce the same results 

即查看在某一时刻，执行相同的事务时所生成的结果是否相同

12.08-12.11

so for our transaction up here

So，对于我们的事务来说

12.11-12.15

 there's only two orders

这里只有两种执行顺序

12.15-12.18

 there's only two one at a time serial orders available

这里只有两种可用的执行顺序

12.18-12.20

 transaction 1 then transaction 2 

先执行事务1，再执行事务2

12.20-12.23

or transaction 2 then transaction 1

或者先执行事务2，再执行事务1

12.23-12.27

 and so we can just look at the results that they would produce

So，我们只需要去查看它们所生成的结果就行

12.27-12.30

 if executed one at a time in each of these orders 

So，这两种顺序，我们都各执行一次看看效果

12.30-12.34

so if we execute t1 and then t2

So，如果我们先执行T1，再执行T2

12.36-12.44

then we get x equals 11，y equals 9

那么我们就会得到x等于11，y等于9

12.44-12.52

 and this print statement since t1 executed first this print statement sees these two updated values

因为这里T1先执行，所以print语句会打印出这两个更新后的值


12.52-12.57

and so it will print the string 11 9

So，它会打印出字符串11和9

12.57-13.01

 the other possible order is

另一种可能的执行顺序是

13.01-13.05

 that perhaps t2 ran first and then t1

先执行T2，再执行T1

13.05-13.06

 and in that case

在这个例子中

13.06-13.10

t2 will see that 2 records before they were modified 

T2会看到这两条记录修改前的值

13.10-13.13

but the modifications will still take place

但这里的修改依然会执行

13.13-13.14

 since t1 runs later

因为T1是在T2之后运行的

13.14-13.19

 so the final results will again be x equals 11 y equal 9 

So，最终T1执行完后的结果是x等于11，y等于9

13.19-13.25

but this time t2 saw before our values 

但此时，T2所看到的是我们修改前的值

13.25-13.31

so these are the two legal results for serializability

So，从顺序上来讲，这两个都是合法结果

13.31-13.36

 and if we ever see anything else from running these two transactions at the same time

如果我们在同时执行这两个事务时看到了任何其他东西

13.36-13.41

we'll know that the database were running against does not provide serializable execution

我们就会知道，数据库并没有提供有序执行

13.41-13.42

 it's doing something else 

它做了一些其他事情

13.42-13.54

and so while we're thinking through what would happen if will always be against these AHA these are the only two legal results 

So，我们来思考下当我们拿到的始终只是这两个合法结果时，这发生了什么呢？

13.54-13.57

we better be doing something that produces one or the other

我们最好得做点什么来确保生成的结果是第一个，或者是第二个

13.57-14.03

it's interesting to note that there's more than one possible result depending on the actual order 

有趣的是，根据实际的执行顺序，这可能会产生多种可能的结果

14.03-14.07

you if you you submit these two transactions at the same time 

如果你同时提交了这两个事务

14.07-14.10

you don't know whether it's gonna be t1 t2 or t2 t1 

那么你就不知道它们的执行顺序是先T1再T2，还是先T2再T1

14.10-14.15

so you have to be willing to expect more than one possible legal result

So，我们不得不期待这里可能会出现多个合法结果

14.15-14.17

 and as you have more or transactions running concurrently

当你并发执行多个事务时

14.17-14.18

 a more complicated

情况就会变得更为复杂

14.18-14.22

 there may be many many possible different correct results

这可能就会出现许许多多不同的正确结果

14.22-14.24

 that are all serializable

它们的执行都是有顺序的

14.24-14.27

 because of many many orders here 

因为这里存在着许许多多不同的执行顺序

14.27-14.29

that could be used to fulfill this requirement

它们都可以满足此处的这个要求

14.29-14.35

 okay so now that we have a definition of correctness

So，我们有一个关于正确性方面的定义

14.35-14.38

 and we even know what all the possible results are

我们甚至知道所有可能得到的结果是什么

14.38-14.40

we can ask a few questions 

这里我们可以问几个问题

14.40-14.45

so few what-if questions about how these could execute 

So，这里我们可以提一些关于它们是如何执行方面的假设性问题

14.45-14.46

so for example

So，例如

14.46-14.58

suppose that the way the system actually executed this was that it started transaction 2 and got as far as just after reading X

假设系统实际执行的方式是这样的，即它先执行T2，执行到读取完x的值时


14.58-15.03

 and then transaction one ran at this point 

此时，T1开始执行

15.03-15.08

and then after transaction one finished transaction 2 continue executing

接着，当T1执行完毕后，T2才继续执行

15.08-15.12

 now it turns out

事实证明

15.12-15.16

 in with different other transactions then this that might actually be legal

在执行其他不同的事务时，这种结果实际上可能是合法的

15.16-15.19

 but here we want to know， if it's legal

但此处我们想知道的是，如果这是合法的，那会发生什么

15.19-15.21

 so we're wondering gosh 

So，我们想知道

15.21-15.22

if we actually executed that way

如果我们实际这样执行的话

15.22-15.23

what results will we get

那么我们会得到怎样的结果


15.23-15.25

 and are they the same as either of these two 

执行的结果是否和下面这两种结果中其中一种相同呢？

15.25-15.29

well if we execute transaction one here 

Well，如果我们在此处执行T1

15.29-15.31

then t1 is gonna see value 10

那么我们在T2中会看到x的值为10

15.31-15.36

 t2 is gonna see the value after decrementing Y

T2会看到修改后的y值为9

15.36-15.38

 so t1 will be 10 t2 will be 9 

So，T1=10，T2=9

15.38-15.40

and what this print will be 10 9 

这里所打印出的值就是10和9


15.40-15.44

and that's neither of these two outputs here

它和这里的两个输出结果都不相同

15.44-15.45

 so that means

So，这意味着

15.45-15.48

executing in this way that I just drew is not serializable

这里我所画的执行方式并不是有序的

15.48-15.50

 it would not be legal 

这是不合法的

15.50-15.55

another interesting question is

另一个我们感兴趣的问题是

15.55-15.58

what if we started executing transaction 1

如果我们开始执行T1


15.58-16.00

and we got as far as just after the first add

当我们执行完T1中第一个add后

16.00-16.02

and then at that point 

然后，此时


16.02-16.05

all the transaction 2 executed right here 

T2在此处开始执行

16.05-16.09

so that would mean

So，这意味着

16.09-16.11

 at this point X is value 11

此时，x的值为11

16.11-16.16

 the transaction 2 would read 11

T2中它读取到x的值为11

16.16-6.17

10 

y的值为10

16.17-16.18

now print 11 10 

这里打印出的就是11和10

16.18-16.21

and 11 10 is not one of these two legal values 

这里所打印出的11和10并不是这两个合法值（10,10或11,9）中任意一个

16.21-16.24

so this execution is also not legal for these two transactions

So，对于这2个事务来说，这个执行就是不合法的

16.35-16.44

so the reason why serializable serializability is a popular and useful definition 

So，有序性是一个非常流行且有用的定义，这么说的原因是

16.44-16.48

of what it means for transactions to be correct for execution of transactions to be correct is

这能让我们正确执行事务

16.49-16.51

that it's a very easy model for programmers

对于程序员来讲，这是一个非常简单的模型

16.51-16.57

you can write complicated transactions without having to worry about what else may be running in the system

在不用去考虑系统中可能还会运行什么的情况下，我们就可以去编写复杂的事务

16.57-16.59

there may be lots of other transactions

这里面可能会有许多其他事务

16.59-17.01

 may be using the same data

它们所操作的可能是同一个数据对象

17.01-7.03

 as you may be reading trying to read and write it at the same time

可能你想在同一时间对该数据进行读写

17.03-7.05

 there might be failures who knows 

执行事务的期间也可能会出现故障


17.05-17.10

but the guarantee here is 

但这里的保证是

17.10-17.14

that it's safe to write your transactions as if nothing else was happening

如果没有其他事情发生的话，那么执行事务就是安全的

在执行该事务期间，如果没有其他影响该事务的事情发生的话，那么它就是安全的

17.14-17.24

because the final results have to be as if your transaction was executed by itself in this one-at-a-time order

因为它的最终结果其实就是你单独执行该事务时所产生的结果

17.24-17.26

 which is a very simple very nice programming model 

这是一个非常简单非常nice的编程模型

17.26-17.36

it's also nice that this definition allows truly parallel execution of transactions as long as they don't use the same data

只要事务执行的时候使用的不是相同数据，那么该定义就运行真正并行执行这些事务

该定义模型另一个很nice的地方是，如果事务执行的时候使用的不是相同数据对象，那么在该定义模型下就可以真正并行执行这些事务

17.36-17.38

so we run into trouble here

So，这里我们就遇上了麻烦

17.38-17.40

 because these two transactions are both reading x and y 

因为这两个事务都要去读取x和y的值

17.40-17.44

but if they were using completely disjoint database records

但如果它们使用的是完全不相干的数据库记录

17.44-17.54

they could it turns out this definition allows you to build a database system that would execute transactions to use disjoint data completely in parallel 

事实证明，这条定义允许我们去构建这样一个数据库系统，即它能够并行执行（使用完全不相干数据的）事务

17.54-17.56

and if you are a sharded system

如果你使用的是一个分片系统

17.56-18.00

 which is what we're sort of working up to today with the data different data is on different machines

这也是我们今天要讲的，即通过分片，在不同机器上处理不同数据

18.00-18.02

 you can get true parallel speed-up

我们可以获得真正的并行加速能力

18.02-18.06

 because maybe one transaction executes in the first shard on the first machine

一个事务可能在第一台机器上的第一个分片中执行

18.06-18.08

 and the other in parallel on the second machine 

另一个事务可能并行运行在第二个机器上


18.08-8.14

so there are opportunities here for good performance

So，我们有机会在这里获取良好的性能

18.14-18.21

before I dig into how to implement serializable transactions

在我深入讲解如何实现有序执行事务前

18.21-18.25

there's one more small point I want to bring up 

我还想讲一个小知识点

18.25-18.27

it turns out that

事实证明



18.27-18.31

 one of the things we need to be able to cope with is

我们需要能够应对的其中一个情况是

18.31-18.40

 that transactions may for one reason or another basically fail or decide to fail in the middle of the transaction

出于某种原因，事务执行的时候会发生崩溃，或者执行到一半的时候发生了崩溃


18.40-18.43

and this is usually called an abort 

这通常叫做事务中止（abort）

18.43-18.48

and you know for many transaction systems

在很多事务系统中

18.48-18.56

 we need to be prepared to handle Oh what should happen if a transaction tries to access a record that doesn't exist or divides by zero

我们需要去对这些情况有所准备，比如：当一个事务试着去访问一条不存在记录，或者遇上除以0之类的问题

18.56-19.02

 or maybe you know since some transaction implementation schemes use locking

你知道的，由于某些事务实现方案使用了锁

19.02-19.04

 maybe a transaction causes a locking deadlock

可能某个事务会引发死锁问题





19.04-19.12

and the only way to break the deadlock is to kill one of one or more of the transactions this participating in the deadlock 

干掉死锁的唯一办法就是干掉引起死锁的其中一个或多个事务

19.12-19.24

so one of the things that's going to be kind of hanging in the background and will come up is  the necessity of coping with transactions that all of a sudden in the middle decide they just cannot proceed 

So，其中一件会在后台发生的事情就是，我们需要去应对事务执行到一半无法继续处理的情况

19.24-19.29

and you know maybe really in the middle after they've done some work and started modifying things 

你知道的，在这些事务完成一些工作并修改一些东西的时候，中途崩溃了

19.29-19.35

we need to be able to kind of back out of these transactions and undo any modifications they've made

我们需要能够结束这些事务，并撤销这些事务已经做出的任何修改









四十六  阅举报
12-02
19.35-19.37

all right





19.37-19.43



the implementation strategy for transactions for these acid transactions



对于这些ACID事务的实现方案这块







19.43-19.47



 I'm gonna split into two big pieces



我会将它分为两大块来讲



19.47-19.49



 but and talk about both of them



我会对它们进行讨论



19.49-19.52



 the main topics in the lecture



它们是这节课的主要谈论主题



19.52-19.55



 the first big implementation topic is concurrency control



首先要讲的第一个重要实现主题就是并发控制



19.55-20.08



this is the main tool we use to provide serializability



这是我们用来提供有序性的主要工具



20.08-20.22



 the  isolation  so concurrency control bias isolation from other concurrent transactions that might be trying to use the same data



通过并发控制来将这些使用了同一数据对象的不同并发事务进行彼此隔离



20.22-20.25



 and the other big pieces I mentioned is atomic commit 



另一个我提到的主题就是原子性提交



20.25-20.32



and this is what's going to help us deal with the possibility 



它可以帮我们来处理这种可能性



20.34*-20.36



that oh yeah this transactions executing a long 



可能这些事务执行的时间有点长



20.36-20.37



and it's may be modified X 



它可能才修改完x



20.38-20.41



and then all of a sudden there's a failure 



然后，突然发生了故障



20.41-20.43



and one of the server's involved



其中一台服务器卷入了这场故障



20.43-20.47



but other servers that were maybe actually in other parts of the transaction 



但其他服务器可能正在执行该事务的其他部分



20.47-20.50



that is if x and y are in different machines



这里的x和y都保存在不同服务器上



20.50-20.56



 we need to be able to recover even if there's a partial failure of only some of the machines the transactions running off



如果部分执行该事务的服务器发生了崩溃，我们需要具备能够恢复它的能力



20.56-21.00



 and the big tool people use for that is this atomic commit



人们用来应对这种情况所主要使用的工具就是原子性提交



21.00-21.03



 you'll talk about



我们之后会讲



21.03-21.04



all right 







21.04-21.05



so first concurrency control



So，首先我们来讲并发控制



21.05-21.12



 there's really two classes two major approaches to concurrency control



对于并发控制来说，主要有两种方案



21.12-21.15



 I'll talk about both during the course 



在这门课中，我两种都会讲



21.15-



if they're just mean strategies 







21.21-21.22



the first strategy is



第一种方案是



21.22-21.31



 a pessimistic usually called pessimist pessimistic concurrency control



通常叫做悲观锁并发控制



21.31-21.37



and this is usually locking we've all done locking in the labs in the context of go program



这里我们通常用到的是锁，关于锁，我们已经通过lab编写Go程序的时候已经用过了



21.37-21.37



 so it turns out



So，事实证明



21.37-21.41



 databases transaction processing systems also used locking 



数据库事务处理系统也用到了锁



21.41-21.44



and the idea here is 



这里的思路是



21.44-21.47



 is the same as well you're quite familiar with this



你们对这个思路应该很熟悉，你们之前看过



21.47-21.51



 that before transaction uses any data it needs to acquire a lock on that data



即在事务使用任何数据前，它需要先去获取该数据所对应的锁



21.51-21.54



 and if some other transactions already using the data



如果有其他事务已经正在使用这个数据



21.54-21.55



 the lock will be held



那么这把锁现在就在该事务的手上



21.55-21.58



 and we'll have to wait before we can acquire the lock



我们得等，直到能获取这把锁才行



21.58-22.00



 wait for the other transaction to finish



即等待其他事务结束



22.00-22.03



 and in pessimistic systems



在悲观系统中



22.03-22.04



 if there's locking conflicts



如果发生了锁冲突



22.04-22.06



somebody else has the lock



其他人也持有锁



22.06-22.07



 it'll cause delays



这就会造成延迟



22.07-22.13



 so you're sort of treating performance for correctness



So，在应对正确性方面，我们得处理性能问题



﻿￼﻿



22.13-22.19



the other main approach is optimistic approaches



另一种主要方案是乐观方案



22.19-22.23



the basic idea here is



这里的基本思路是



22.23-22.28



 you don't worry about whether maybe some other transactions reading or writing the data at the same time as you



我们不需要去担心是否有其他事务和我们同时对数据进行读取



22.28-22.33



 you just go ahead and do whatever reads and writes you're gonna do although typically into some sort of temporary area 



你只管继续对数据进行读写，并将结果写入临时区域



22.33-22.35



and then only at the end 



只有到了最后



22.35-22.40



you go and check whether actually maybe some other transaction might have been interfering



我们再来检查是否有其他事务对我们所执行的这个事务产生影响



22.40-22.42



and if there's no other transaction



如果其他事务没有对我们所执行的这个事务产生影响



22.42-22.43



now you're done



那么我们就执行完了



22.43-22.47



 and you never had to go through any of the overhead or weighting of taking out locks



我们就不需要承受使用锁所带来的开销



22.47-22.49



 the locks are reasonably expensive to manipulate



使用锁的成本相当昂贵



22.49-22.57



 but if somebody else was modifying the data in a conflicting way at the same time



但如果其他人在同一时刻以一种冲突的方式去修改数据



22.57-23.00



 you were then you have to abort that transaction and retry 



那么你就得中止这个事务并重新尝试执行它



﻿￼﻿



23.00-23.09



and the abbreviation for this is often optimistic concurrency control 



对此（乐观锁并发控制）的缩写是OCC



23.09-2310



um it turns out that



事实证明



23.10-23.12



 under different circumstances 



在不同情况下



23.12-23.14



these two strategies one can be faster than the other



其中一种方案的速度会比另一种方案来得更快



23.14-23.17



if conflicts are very frequent 



如果经常发生冲突



23.17-23.21



you probably actually want to use pessimistic concurrency control



那么你可能会想去使用悲观锁并发控制



23.21-23.22



because of conflicts are frequent 



因为冲突经常发生



23.22-23.25



you're gonna get a lot of aborts due to conflicts for optimistic seems



如果你使用乐观锁并发控制，那么你就会遇上一大堆事务中止的情况



23.25-23.26



 if conflicts are rare



如果冲突很少发生



23.26-23.30



then optimistic concurrency control can be faster



那么乐观锁并发控制的速度就会更快



23.30-23.32



because it completely avoids locking overhead



因为这完全避免了锁带来的开销



﻿￼﻿



23.32-23.35



 today we will talk all about pessimistic concurrency control 



今天我们要讲的就是悲观锁并发控制



23.35-23.43



and then some later paper in particular farm in a couple weeks we'll deal with an optimistic scheme



我们会在之后的一两周去读一篇关于乐观锁并发控制的paper



23.43-23.46



 okay



﻿￼﻿



23.46-23.50



so today talking about pessimistic schemes 



So，今天我们来谈论悲观策略



23.50-23.52



refers basically to locking



简单来讲，这和锁有关



23.52-23.56



 and in particular for today the reading was about two-phase locking



今天我们要讲的是两阶段锁



﻿￼﻿



23.56-23.59



 which is the most common type of locking



这是最常见的锁类型



23.59-24.11



and the idea in two-phase locking for transactions is



在事务中，两阶段锁的思路是



24.11-24.15



 that transactions gonna use a bunch of Records like X&Y in our example



事务会去使用一堆记录，比如之前例子中说的x和y



24.15-24.17



the first rule is that 



第一条规则是



﻿￼﻿



24.17-24.32



you acquire a lock before using data any piece of data before reading or writing any record



在我们对任何数据进行读取或写入操作前，我们先去获取该数据对应的锁



24.32-24.36



 and the second rule for transactions is



事务的第二条规则就是



24.36-24.43



 that a transaction must hold any locks it acquires until after it commits or aborts



直到事务被提交或者中止后，事务才能释放掉它所获取的锁



24.43-24.45



 you're not allowed to give up locks in the middle of the transaction



你不允许在事务执行的过程中释放锁



24.45-24.46



 you have to hold them all



你得拿着这些锁



24.46-24.50



you can only accumulate them until you're done  until after you're done



在你执行完事务前，这些锁只能累积在你手上



你只能对这些锁进行累加操作，直到你结束事务（知秋注：即本来你的锁状态为1，你又获取了一下，它就变成了2，多次获取可能为n，你事务结束或者异常后，你要将该锁状态置为0，才算释放）



﻿￼﻿



24.50-24.58



so hold until completely done 



So，直到事务完成前，我们都得拿着锁



24.58-25.00



so this is two-phase locking



So，这就是两阶段锁



25.00-25.02



 the phases are the phases which we acquire locks 



在第一个阶段中，我们要去获取锁



25.02-25.07



and then phase in which we just hold onto them until we're done



在第二个阶段中，直到我们的事务结束，我们才会去释放锁



25.07-25.11



so for two phase locking



So，在两阶段锁中



25.11-25.15



 to sort of see why locking works



为了去弄明白锁是如何工作的



25.15-25.24



 your typical locking systems well there's a lot of variation typical locking systems associate a separate lock with each record in the database with each row in each table for example



锁系统有很多种变体，比如：数据库中对每张表上的每条记录所使用的行锁



25.24-25.26



 although they can be more more coarse-grained



虽然这些锁的粒度可以变得更大



﻿￼﻿



25.26-25.29



 these transactions start out holding no locks



这些事务一开始不会持有锁



25.29-25.32



 let's say transaction one starts out holding no locks



假设，事务1一开始的时候并没有持有锁



25.32-25.37



 when it first uses X before so I'll have to use it it has to acquire the lock on X



在我对x进行操作之前，我得先去获取x所对应的锁



25.37-25.38



 and it may have to wait



我们可能得等待获取这把锁



25.38-25.42



and when it first uses Y it acquires another lock the lock on Y



当它先使用y的时候，它得先去获取y所对应的锁



25.42-25.45



when it finishes after it's done 



当事务结束的时候



﻿￼﻿



25.45-25.46



it can release both



它就可以释放这两把锁



25.46-25.49



if we ran both these transactions at the same time



如果我们同时执行这两个事务



25.49-25.53



they're gonna basically race to get the lock on X 



简单来讲，这两个事务就会去抢x所对应的锁



25.53-25.57



and whichever of them gets the managed to get the lock on X  first



不管它俩谁先抢到x所对应的这把锁



25.57-26.00



 it will proceed and finish and commit



抢到锁的这个事务就会开始执行，执行完毕就会提交



26.00-26.02



meantime



与此同时



26.02-2605



 the other transaction that didn't manage to get the lock on X first



对于另一个没能先抢到x的锁的事务来说



26.05-26.11



 it's going to see if you're waiting before it what you does anything with x until I can acquire the lock



在它对x进行任何处理之前，它会去等待获取x所对应的这把锁



﻿￼﻿



26.11-26.13



 so transaction 2 actually got the lock first



So，实际上，事务2会先拿到这把锁



26.13-26.17



you would get the value of X get the value of y



你就会拿到x和y的值



26.17-26.22



 cuz transaction one hasn't gotten at this point hasn't locked Y yet



因为此时事务1还没有拿到y所对应的锁



26.22-26.25



it'll print and it will finish and release its locks 



事务2会打印出x和y的值。结束事务后，事务2会释放它所持有的锁



26.25-26.29



and only then transaction one will be able to acquire the lock on X 



只有这样，事务1才能够去获取x所对应的锁



26.29-26.30



and as you can see



你们可以看到



26.30-26.33



 that basically forces a serial order



简单来讲，这里强制制定了执行顺序



26.33-26.40



 because it forced in this case it force the order T two and then when T two finishes only then T 1 



因为在这个例子中，它强制指定了顺序，只有当事务2结束的时候，事务1才可以执行



26.40-26.44



so with it's explicitly forcing an order



So，这里我们明确指定了执行顺序



26.44-26.50



 which causes the that execution to follow the definition of serializability



这让此处的执行遵循有序性（serialization）的定义



26.50*-26.55



 that you know really is executing T 2 to completion and only then T 1 



你知道的，只有当事务2完成后，事务1才能开始执行



26.55-26.59



so we do get correct execution



So，我们做到了正确执行



27.07-27.08



all right 







27.08-27.14



so one question is 



So，其中一个问题是



27.14-27.18



why you need to hold the locks until the transactions completely finished 



为什么我们需要直到事务完全结束，我们才会释放锁



27.18-27.20



you might think 



你们可能会这样想



27.20-27.25



that you could just hold a lock while you are actually using the data 



当我们实际使用数据的时候，我们才会持有锁



27.25-27.26



and that would be more efficient



这样做会来得更为高效



27.26-27.27



and indeed it would



该策略确实会这样做



﻿￼﻿



27.27-27.35



 that is you know maybe only hold the lock for the period of time in which t2 is actually looking at record X 



你知道的，只有当事务2查看x的记录时，在这段时间内，它才会持有x所对应的锁



﻿￼﻿



27.35-27.40



or maybe only hold the lock on X here for the duration of the add operation



或者只有当执行add操作的期间，事务1才会拿着x所对应的锁



27.40-27.42



 and then immediately release it



接着，执行完操作，事务1就立刻将x所对应的这把锁给释放了



27.42-27.43



 and in that case that



在这个例子中



﻿￼﻿



27.43-27.45



 what if we transaction one immediately released a lock on X



如果事务1立刻释放了x所对应的锁



27.45-27.47



 there there by disobeying this rule of course



Of course，这就会违反第二条规则



27.47-27.50



 but if it immediately release the lock on X 



但如果它立刻释放了x所对应的锁



27.50-27.52



then transaction two might be able to start a little bit earlier 



那么，事务2就能够提早开始执行



27.57-27.54



we get more concurrency more higher performance 



我们就能获得更高的并发性，以及更高的性能



﻿￼﻿



27.54-27.58



so this rule definitely you know bad for performance



So，对于性能来说，这条规则必然就很糟糕了



27.58-28.03



so we want to make pretty sure that it's it's good for that's required for correctness



So，我们想去确保这条规则对于正确性来说是有利的



28.03-28.12



so what won't happen if transactions did actually release locks as early as possible



So，如果事务尽可能早地释放锁，那么会发生什么呢？



28.12-28.18



so suppose t2 here reads X and then im=========================================mediately releases this lock on X



So，假设事务2读取完x后，接着立刻释放了x所对应的锁



28.18-28.27



 that would allow t1 since at now at this point in the execution t2 doesn't hold any locks



这允许事务1在此时开始执行，因为事务2此时并没有持有任何锁



28.27-28.31



 because it's just released it illegally release the lock on X 



因为它非法释放了x所对应的锁



﻿￼﻿



28.31-28.36



since it holds a no locks， that means t1 could completely execute right here 



因为事务2现在不持有任何锁，这也就意味着事务1完全可以在这里执行



28.36-28.39



and we already knew from from before 



我们之前就已经知道



28.39-28.41



that this interleaving is not correct 



这种交织执行是不对的



﻿￼﻿



28.41-28.44



as it doesn't produce either these two outputs



因为它生成的结果和这两个输出结果都不一样



28.44-28.46



similarly 



类似的



28.46-28.54



if if t1 released this lock on X after finished adding one to X 



如果事务1在对x的值加完1后释放了x所对应的锁



28.54-28.58



that would allow all of t2 to slip in=

19.37-19.43

the implementation strategy for transactions for these acid transactions

对于这些ACID事务的实现方案这块



19.43-19.47

 I'm gonna split into two big pieces

我会将它分为两大块来讲

19.47-19.49

 but and talk about both of them

我会对它们进行讨论

19.49-19.52

 the main topics in the lecture

它们是这节课的主要谈论主题

19.52-19.55

 the first big implementation topic is concurrency control

首先要讲的第一个重要实现主题就是并发控制

19.55-20.08

this is the main tool we use to provide serializability

这是我们用来提供有序性的主要工具

20.08-20.22

 the  isolation  so concurrency control bias isolation from other concurrent transactions that might be trying to use the same data

通过并发控制来将这些使用了同一数据对象的不同并发事务进行彼此隔离

20.22-20.25

 and the other big pieces I mentioned is atomic commit 

另一个我提到的主题就是原子性提交

20.25-20.32

and this is what's going to help us deal with the possibility 

它可以帮我们来处理这种可能性

20.34*-20.36

that oh yeah this transactions executing a long 

可能这些事务执行的时间有点长

20.36-20.37

and it's may be modified X 

它可能才修改完x

20.38-20.41

and then all of a sudden there's a failure 

然后，突然发生了故障

20.41-20.43

and one of the server's involved

其中一台服务器卷入了这场故障

20.43-20.47

but other servers that were maybe actually in other parts of the transaction 

但其他服务器可能正在执行该事务的其他部分

20.47-20.50

that is if x and y are in different machines

这里的x和y都保存在不同服务器上

20.50-20.56

 we need to be able to recover even if there's a partial failure of only some of the machines the transactions running off

如果部分执行该事务的服务器发生了崩溃，我们需要具备能够恢复它的能力

20.56-21.00

 and the big tool people use for that is this atomic commit

人们用来应对这种情况所主要使用的工具就是原子性提交

21.00-21.03

 you'll talk about

我们之后会讲

21.03-21.04

all right 



21.04-21.05

so first concurrency control

So，首先我们来讲并发控制

21.05-21.12

 there's really two classes two major approaches to concurrency control

对于并发控制来说，主要有两种方案

21.12-21.15

 I'll talk about both during the course 

在这门课中，我两种都会讲

21.15-

if they're just mean strategies 



21.21-21.22

the first strategy is

第一种方案是

21.22-21.31

 a pessimistic usually called pessimist pessimistic concurrency control

通常叫做悲观锁并发控制

21.31-21.37

and this is usually locking we've all done locking in the labs in the context of go program

这里我们通常用到的是锁，关于锁，我们已经通过lab编写Go程序的时候已经用过了

21.37-21.37

 so it turns out

So，事实证明

21.37-21.41

 databases transaction processing systems also used locking 

数据库事务处理系统也用到了锁

21.41-21.44

and the idea here is 

这里的思路是

21.44-21.47

 is the same as well you're quite familiar with this

你们对这个思路应该很熟悉，你们之前看过

21.47-21.51

 that before transaction uses any data it needs to acquire a lock on that data

即在事务使用任何数据前，它需要先去获取该数据所对应的锁

21.51-21.54

 and if some other transactions already using the data

如果有其他事务已经正在使用这个数据

21.54-21.55

 the lock will be held

那么这把锁现在就在该事务的手上

21.55-21.58

 and we'll have to wait before we can acquire the lock

我们得等，直到能获取这把锁才行

21.58-22.00

 wait for the other transaction to finish

即等待其他事务结束

22.00-22.03

 and in pessimistic systems

在悲观系统中

22.03-22.04

 if there's locking conflicts

如果发生了锁冲突

22.04-22.06

somebody else has the lock

其他人也持有锁

22.06-22.07

 it'll cause delays

这就会造成延迟

22.07-22.13

 so you're sort of treating performance for correctness

So，在应对正确性方面，我们得处理性能问题


22.13-22.19

the other main approach is optimistic approaches

另一种主要方案是乐观方案

22.19-22.23

the basic idea here is

这里的基本思路是

22.23-22.28

 you don't worry about whether maybe some other transactions reading or writing the data at the same time as you

我们不需要去担心是否有其他事务和我们同时对数据进行读取

22.28-22.33

 you just go ahead and do whatever reads and writes you're gonna do although typically into some sort of temporary area 

你只管继续对数据进行读写，并将结果写入临时区域

22.33-22.35

and then only at the end 

只有到了最后

22.35-22.40

you go and check whether actually maybe some other transaction might have been interfering

我们再来检查是否有其他事务对我们所执行的这个事务产生影响

22.40-22.42

and if there's no other transaction

如果其他事务没有对我们所执行的这个事务产生影响

22.42-22.43

now you're done

那么我们就执行完了

22.43-22.47

 and you never had to go through any of the overhead or weighting of taking out locks

我们就不需要承受使用锁所带来的开销

22.47-22.49

 the locks are reasonably expensive to manipulate

使用锁的成本相当昂贵

22.49-22.57

 but if somebody else was modifying the data in a conflicting way at the same time

但如果其他人在同一时刻以一种冲突的方式去修改数据

22.57-23.00

 you were then you have to abort that transaction and retry 

那么你就得中止这个事务并重新尝试执行它


23.00-23.09

and the abbreviation for this is often optimistic concurrency control 

对此（乐观锁并发控制）的缩写是OCC

23.09-2310

um it turns out that

事实证明

23.10-23.12

 under different circumstances 

在不同情况下

23.12-23.14

these two strategies one can be faster than the other

其中一种方案的速度会比另一种方案来得更快

23.14-23.17

if conflicts are very frequent 

如果经常发生冲突

23.17-23.21

you probably actually want to use pessimistic concurrency control

那么你可能会想去使用悲观锁并发控制

23.21-23.22

because of conflicts are frequent 

因为冲突经常发生

23.22-23.25

you're gonna get a lot of aborts due to conflicts for optimistic seems

如果你使用乐观锁并发控制，那么你就会遇上一大堆事务中止的情况

23.25-23.26

 if conflicts are rare

如果冲突很少发生

23.26-23.30

then optimistic concurrency control can be faster

那么乐观锁并发控制的速度就会更快

23.30-23.32

because it completely avoids locking overhead

因为这完全避免了锁带来的开销


23.32-23.35

 today we will talk all about pessimistic concurrency control 

今天我们要讲的就是悲观锁并发控制

23.35-23.43

and then some later paper in particular farm in a couple weeks we'll deal with an optimistic scheme

我们会在之后的一两周去读一篇关于乐观锁并发控制的paper

23.43-23.46

 okay


23.46-23.50

so today talking about pessimistic schemes 

So，今天我们来谈论悲观策略

23.50-23.52

refers basically to locking

简单来讲，这和锁有关

23.52-23.56

 and in particular for today the reading was about two-phase locking

今天我们要讲的是两阶段锁


23.56-23.59

 which is the most common type of locking

这是最常见的锁类型

23.59-24.11

and the idea in two-phase locking for transactions is

在事务中，两阶段锁的思路是

24.11-24.15

 that transactions gonna use a bunch of Records like X&Y in our example

事务会去使用一堆记录，比如之前例子中说的x和y

24.15-24.17

the first rule is that 

第一条规则是


24.17-24.32

you acquire a lock before using data any piece of data before reading or writing any record

在我们对任何数据进行读取或写入操作前，我们先去获取该数据对应的锁

24.32-24.36

 and the second rule for transactions is

事务的第二条规则就是

24.36-24.43

 that a transaction must hold any locks it acquires until after it commits or aborts

直到事务被提交或者中止后，事务才能释放掉它所获取的锁

24.43-24.45

 you're not allowed to give up locks in the middle of the transaction

你不允许在事务执行的过程中释放锁

24.45-24.46

 you have to hold them all

你得拿着这些锁

24.46-24.50

you can only accumulate them until you're done  until after you're done

在你执行完事务前，这些锁只能累积在你手上

你只能对这些锁进行累加操作，直到你结束事务（知秋注：即本来你的锁状态为1，你又获取了一下，它就变成了2，多次获取可能为n，你事务结束或者异常后，你要将该锁状态置为0，才算释放）


24.50-24.58

so hold until completely done 

So，直到事务完成前，我们都得拿着锁

24.58-25.00

so this is two-phase locking

So，这就是两阶段锁

25.00-25.02

 the phases are the phases which we acquire locks 

在第一个阶段中，我们要去获取锁

25.02-25.07

and then phase in which we just hold onto them until we're done

在第二个阶段中，直到我们的事务结束，我们才会去释放锁

25.07-25.11

so for two phase locking

So，在两阶段锁中

25.11-25.15

 to sort of see why locking works

为了去弄明白锁是如何工作的

25.15-25.24

 your typical locking systems well there's a lot of variation typical locking systems associate a separate lock with each record in the database with each row in each table for example

锁系统有很多种变体，比如：数据库中对每张表上的每条记录所使用的行锁

25.24-25.26

 although they can be more more coarse-grained

虽然这些锁的粒度可以变得更大


25.26-25.29

 these transactions start out holding no locks

这些事务一开始不会持有锁

25.29-25.32

 let's say transaction one starts out holding no locks

假设，事务1一开始的时候并没有持有锁

25.32-25.37

 when it first uses X before so I'll have to use it it has to acquire the lock on X

在我对x进行操作之前，我得先去获取x所对应的锁

25.37-25.38

 and it may have to wait

我们可能得等待获取这把锁

25.38-25.42

and when it first uses Y it acquires another lock the lock on Y

当它先使用y的时候，它得先去获取y所对应的锁

25.42-25.45

when it finishes after it's done 

当事务结束的时候


25.45-25.46

it can release both

它就可以释放这两把锁

25.46-25.49

if we ran both these transactions at the same time

如果我们同时执行这两个事务

25.49-25.53

they're gonna basically race to get the lock on X 

简单来讲，这两个事务就会去抢x所对应的锁

25.53-25.57

and whichever of them gets the managed to get the lock on X  first

不管它俩谁先抢到x所对应的这把锁

25.57-26.00

 it will proceed and finish and commit

抢到锁的这个事务就会开始执行，执行完毕就会提交

26.00-26.02

meantime

与此同时

26.02-2605

 the other transaction that didn't manage to get the lock on X first

对于另一个没能先抢到x的锁的事务来说

26.05-26.11

 it's going to see if you're waiting before it what you does anything with x until I can acquire the lock

在它对x进行任何处理之前，它会去等待获取x所对应的这把锁


26.11-26.13

 so transaction 2 actually got the lock first

So，实际上，事务2会先拿到这把锁

26.13-26.17

you would get the value of X get the value of y

你就会拿到x和y的值

26.17-26.22

 cuz transaction one hasn't gotten at this point hasn't locked Y yet

因为此时事务1还没有拿到y所对应的锁

26.22-26.25

it'll print and it will finish and release its locks 

事务2会打印出x和y的值。结束事务后，事务2会释放它所持有的锁

26.25-26.29

and only then transaction one will be able to acquire the lock on X 

只有这样，事务1才能够去获取x所对应的锁

26.29-26.30

and as you can see

你们可以看到

26.30-26.33

 that basically forces a serial order

简单来讲，这里强制制定了执行顺序

26.33-26.40

 because it forced in this case it force the order T two and then when T two finishes only then T 1 

因为在这个例子中，它强制指定了顺序，只有当事务2结束的时候，事务1才可以执行

26.40-26.44

so with it's explicitly forcing an order

So，这里我们明确指定了执行顺序

26.44-26.50

 which causes the that execution to follow the definition of serializability

这让此处的执行遵循有序性（serialization）的定义

26.50*-26.55

 that you know really is executing T 2 to completion and only then T 1 

你知道的，只有当事务2完成后，事务1才能开始执行

26.55-26.59

so we do get correct execution

So，我们做到了正确执行

27.07-27.08

all right 



27.08-27.14

so one question is 

So，其中一个问题是

27.14-27.18

why you need to hold the locks until the transactions completely finished 

为什么我们需要直到事务完全结束，我们才会释放锁

27.18-27.20

you might think 

你们可能会这样想

27.20-27.25

that you could just hold a lock while you are actually using the data 

当我们实际使用数据的时候，我们才会持有锁

27.25-27.26

and that would be more efficient

这样做会来得更为高效

27.26-27.27

and indeed it would

该策略确实会这样做


27.27-27.35

 that is you know maybe only hold the lock for the period of time in which t2 is actually looking at record X 

你知道的，只有当事务2查看x的记录时，在这段时间内，它才会持有x所对应的锁


27.35-27.40

or maybe only hold the lock on X here for the duration of the add operation

或者只有当执行add操作的期间，事务1才会拿着x所对应的锁

27.40-27.42

 and then immediately release it

接着，执行完操作，事务1就立刻将x所对应的这把锁给释放了

27.42-27.43

 and in that case that

在这个例子中


27.43-27.45

 what if we transaction one immediately released a lock on X

如果事务1立刻释放了x所对应的锁

27.45-27.47

 there there by disobeying this rule of course

Of course，这就会违反第二条规则

27.47-27.50

 but if it immediately release the lock on X 

但如果它立刻释放了x所对应的锁

27.50-27.52

then transaction two might be able to start a little bit earlier 

那么，事务2就能够提早开始执行

27.57-27.54

we get more concurrency more higher performance 

我们就能获得更高的并发性，以及更高的性能


27.54-27.58

so this rule definitely you know bad for performance

So，对于性能来说，这条规则必然就很糟糕了

27.58-28.03

so we want to make pretty sure that it's it's good for that's required for correctness

So，我们想去确保这条规则对于正确性来说是有利的

28.03-28.12

so what won't happen if transactions did actually release locks as early as possible

So，如果事务尽可能早地释放锁，那么会发生什么呢？

28.12-28.18

so suppose t2 here reads X and then immediately releases this lock on X

So，假设事务2读取完x后，接着立刻释放了x所对应的锁

28.18-28.27

 that would allow t1 since at now at this point in the execution t2 doesn't hold any locks

这允许事务1在此时开始执行，因为事务2此时并没有持有任何锁

28.27-28.31

 because it's just released it illegally release the lock on X 

因为它非法释放了x所对应的锁


28.31-28.36

since it holds a no locks， that means t1 could completely execute right here 

因为事务2现在不持有任何锁，这也就意味着事务1完全可以在这里执行

28.36-28.39

and we already knew from from before 

我们之前就已经知道

28.39-28.41

that this interleaving is not correct 

这种交织执行是不对的


28.41-28.44

as it doesn't produce either these two outputs

因为它生成的结果和这两个输出结果都不一样

28.44-28.46

similarly 

类似的

28.46-28.54

if if t1 released this lock on X after finished adding one to X 

如果事务1在对x的值加完1后释放了x所对应的锁

28.54-28.58

that would allow all of t2 to slip in right here

这就会让事务2在这两个add操作之间插缝执行

28.58-29.10

 and we know also from before that that results in in illegal results

我们之前就知道这生成的结果并不合法

29.10-29.16

there's a an additional kind of problem that can come up with releasing locks after modifying data

在修改完数据后，释放了该数据所对应的锁，这时就会出现另一个问题


29.16-29.20

 if t1 were to release the lock on X

如果事务1在此处释放了x所对应的锁

29.20-29.24

it might allow t2 to see the modified version of X here

这可能会允许事务2看到这个修改后的x

29.24-29.26

 to see the X after adding 1 to it 

即看到这个加完1后的x

29.26-29.28

and to print that output

然后将这些结果打印出来

29.28-29.32

and then for t2 complete after printing the incremented value of x

当事务2完成的时候，它会打印出这个加一后的x的值

29.32-29.35

 if transaction one were to abort after that point 

如果事务1在两个add操作之间中止了

29.35-29.38

maybe because bank balance Y doesn't exist 

这可能是因为y的银行存款记录并不存在所导致的

29.38-29.42

or maybe bank bonds Y exists but its balance is zero

或者也可能是因为y的银行账户存在，但是它的存款为0

29.42-29.46

 and you know we're not allowed to decrement 0  for bank balances

你知道的，对于银行存款来说，我们不允许让它变为负数

29.46-29.47

because that's an overdraft 

因为这就透支了

29.47-29.50

so t1 might modify X then abort 

So，事务1可能在修改完x后，它就中止了

29.50-29.58

and part of the abort has to be undoing its update to X in order to maintain atomicity 

为了保证原子性，如果发生了中止，那我们就得撤销该事务对x所做的更新操作

29.58-29.59

and what that would mean

这意味着什么呢？

29.59-30.02

 if it released the locks is

如果事务1将锁释放了

30.02-30.04

 that transaction 2 would have seen this sort of phantom value of 11 

事务2会出现幻读的情况，它会读取到11这个值

30.04-30.06

that went away

这个值其实消失了

30.06-30.07

because t1 aborted 

因为事务1中止了

30.07*-30.12

you would have seen a value that according to the rules never existed right

根据规则来看，你们会看到一个不应该存在的值

30.12-30.16

because then the transaction 1 aborts

因为事务1发生了中止

30.16-30.18

 then it's as if it never existed 

那么这个值好像就不存在了

30.18-30.18

and so that means 

So，这意味着

30.18-30.24

the results from t2 had better be as if t2 ran by itself without t1 at all

事务2所生成的值最好是在不运行事务1的情况下所得到的

30.24-30.26

but if it sees the increment

但如果它看到这个增加后的值，即11

30.26-30.27

 that it's gonna print 11 for X 

它就会打印出x的值11

30.27-30.35

11 10 actually which is just doesn't correspond to any state in the database  given that 

实际上这个值跟数据库中所给出任何一条记录的状态都不对应

30.35-30.39

t1 didn't really complete

事务1其实并没有执行完毕

30.39-30.41

 okay



30.41-30.49

so that's why those are two dangers that are averted due to violations serializeability that are averted

So，通过遵守有序性，就可以规避这两种危险情况出现

30.49-30.51

 because transactions hold the locks until they're done

因为直到事务完成前，事务都会持有着执行操作所需要的锁

30.51-30.58

 a further thing to note about these rules 

对于这些规则来说，我还有一个更深层次的东西要讲

30.58-31.01

or that it's very easy for them to produce deadlock

对于它们来说，这很容易发生死锁问题

31.01-31.05

so you know for example

So，例如

31.05-31.07

 if we have two transactions

如果我们有两个事务


31.07-31.15

 one of them reads record x and reads record y

其中一个事务要去读取x和y的记录


31.15-31.21

and the other transaction reads Y and then X

另一个事务会先读取y的记录，再读取x的记录

31.24-31.27

 that's that's just a deadlock if they run at the same time

如果它们同时执行，那么就会造成死锁

31.27-31.35

 they each of them gets this lock on the record it first read they don't release till the transactions finish 

当它们开始读取记录的时候，它们就会拿到该记录所对应的锁，直到事务结束，才会将锁释放

31.35-31.40

so they both sit there waiting for the lock that's held by the other transaction

So，它们都在等另一个事务手上拿着的那个锁

31.40-31.46

 and unless the database does something clever which it will, they'll deadlock forever

除非数据库通过些聪明的办法来解决这个问题（它确实这么做了），不然这个死锁问题就会一直持续下去

31.46-31.48

 and in fact transactions have various strategies

事实上，在事务中，我们可以通过很多不同的策略来解决死锁问题


31.48-31.54

including tracing cycles or timeouts in order to detect that they've gone into the situation 

这里面包括跟踪周期，或者超时机制，通过这些方案来检测出死锁问题

31.54-31.56

the database will abort one of these two transactions

数据库就会中止这两个事务中的任意一个

31.56-31.57

 and undo all its changes

并撤销（中止的）这个事务所做的所有修改

31.57-32.00

and act as if that transaction that never occurred

这个事务就像从未执行过一样

32.00-32.02

okay 



32.02-32.06

so that's concurrency control with two-phase locking 

So，这就是两阶段锁中的并发控制

32.06-32.16******

and this is just completely standard database behavior so far

目前为止，我所讲的这些是完全标准的数据库行为

32.17-32.24

 and it's the same in a single machine databases as it will be

这和单机数据库的行为是完全一致的

=====================

32.24-32.28

and distributed databases that are a little more interest to us 

对于我们来说，我们还是对分布式数据库更感兴趣一点

32.24-32.36

but our next topic is a little is actually specific to building databases or storage systems

但我们接下来要讲的话题是针对如何构建数据库或者存储系统这方面的

32.36-32.41

in general that support transactions on distributed setting

一般来讲，它们可以支持分布式事务

32.41-32.43

 that is splitting the data over multiple machines

在这种情况下，它们会将数据分散到多个机器上

32.43-32.51

 so now the topic is how to build distributed transactions 

So，现在我们要讲的主题就是该如何构建分布式事务


32.53-32.57

and in particular how to cope with failures 

特别是，该如何应对这些故障

32.57-33.02

and more specifically the kind of partial failures of just one of many servers that you often see in distributed systems

特别是，你们在分布式系统中经常看到的部分故障，即许多服务器中的一台发生了故障

33.02-33.05

 so beyond distributed transactions 

So，除了上面这个分布式事务需要考虑的东西以外（即部分故障）

33.05-33.09

and we're worried about how they behave

我们还关心它们的行为是怎么样的

33.09-33.11

you make sure they're serializable

我们得确保它们是有顺序的

33.11-33.16

 and also have sort of all-or-nothing atomicity  even in the face of failures

并且它们还得具备原子性，即在遇上故障的情况下，对于该事务中的所有操作来说，要么全部执行，要么全不执行

33.16-33.27

so you know what the way this looks like is that we may have two servers 

So，我们有2台服务器

33.27-33.33

and we got server one and maybe it stores record X in our bank 

服务器1上面保存了我们银行中账户x的记录


33.33-33.36

and we have server two and maybe it's stores record Y

然后，这里是服务器2，它上面保存了账户y的记录


33.36-33.41

 so they all start out with value 10

So，这两条记录一开始的值都是10

33.41-33.42

 and we need to run these two transactions

我们需要去运行这两个事务

33.42-33.46

 that transaction 1 of course modifies both x and y 

Of course，事务1会对x和y这两个值进行修改


33.46-33.52

so now we need to send messages the database is saying oh please increment X please decrement Y

So，现在我们需要发送消息给数据库，并说Oh，请对x进行加一，对y进行减一

33.52-33.57

 but it would be easy if we weren't careful to get into a situation

但如果我们不够小心谨慎的话，很容易就会遇上这种情况

33.57-34.00

where we had told server 1 to increase the balance for X

即我们已经告诉服务器1去对x的账户进行加一

34.00-34.02

but then something failed 

但之后某个东西发生了故障

34.02*-34. 04

maybe the client sending the requests 

可能这是由于客户端给它发送了请求所导致的

34.04-34.07

or maybe the server 2 that's holding Y fails  or something and

或者可能保存着记录y的服务器2出现了故障之类的

34.07-34.12

we never managed to do the second update right 

那么我们也就永远没法去执行第二个更新操作

34.12-34.19

so that's one problem is failure somewhere may sort of cut the transaction in half 

So，这就是其中一个问题，即某处发生的故障可能会导致事务只执行了一半


34.19-34.28

and if we're not careful，cause only half of the transaction to actually take effect

如果我们不够小心谨慎的话，那么这就会导致该事务实际只会执行这一半操作，即对x进行加一

34.28-34.36

this can happen even without crashes

在没有发生崩溃的情况下，该事务剩下的部分也是可以执行的

34.36-34.39

 if X does its part in the transaction

如果我们执行完了x所对应的那部分操作

34.39-34.45

it could be that over on server 2，server 2 actually gets the request to decrement bank account y 

那么我们就会对服务器2发送一个请求，服务器2拿到这个请求后，就会对账户y进行减一


34.45-34.53

but maybe server 2 discovers this bank account doesn't exist or maybe it does exist and it's balance is already 0 when it can't be decrease

但我们可能会遇上这种情况，即服务器2发现这个账户不存在，或者说这个账户存在，但当它对账户y进行减一的时候，账户y的存款余额已经是0了

34.53-34.54

 and so it can't do its part of the transaction

So，这也就没办法执行这部分事务了

34.54-34.58

 but X look has already done its part of the transaction

但这里我们已经完成了事务中和x所对应的那部分操作

34.58-35.01

so that's a problem that needs to be dealt with

So，这就是一个需要我们去解决的问题

35.01-35.11

 so the the property we want as I mentioned before is 

So，正如我之前所提到的，我们想要的特性是

35.11-35.17

that all the pieces of the system either all the pieces of the system should do their part of the transaction or none

要么执行该事务中所有的操作（可能分布在不同的机器中），要么就不执行该事务中所有的操作


35.17-35.33

 right so you know the kind of the thing we violated here is what atomicity against crashes versus failure 

此处，之所以出现这种类型的故障，是因为它违反了这系列操作的原子性（知秋注：将这一系列操作看作是一个原子性操作）

35.33-35.43

where atomicity is all or not all parts of the transaction that we're trying to execute or none of them

原子性的意思是，我们要么执行该事务中所有操作，要么就不执行该事务中的所有操作



35.43-35.55 ！！！！！

and for you more the kind of solution we're going to be looking at is atomic commitments atomic commit protocols 

接下来我们要看的东西就是原子提交协议

35.55-36.02

and the general kind of flavor of atomic commit protocols is

原子提交协议的基本特性是

36.02-36.03

that you have a bunch of computers

假设我们有一堆电脑

36.03-36.05

they're all doing different parts of some larger task

它们各自负责某个大型任务中的不同部分

36.05-36.16

 and the atomic commit protocol is gonna help the computers decide that either they're all going to do they're they're all capable of doing their part and they're actually gonna do it

原子提交协议就是用来帮助这些电脑判断它们是否能够去完成这些任务

原子提交协议就是用来帮助这些电脑判断他们是否能够完成它们自己那部分的任务并真正执行该部分任务

36.1636.18

 or something has gone wrong and

或者，如果中间发生了什么错误

36.18-36.25

they're all going to agree that oh they're actually none of them are gonna do their part of the whatever the overall task is

这些参与者就会决定它们不去执行该事务所涉及的所有操作，不管这整个任务是什么

36.25-36.31

 and the big challenges are of course how to cope with various failures machine failures loss of messages

Of course，对于我们来说有几个巨大的挑战，那就是该如何应对不同的故障情况，比如机器故障，消息丢失之类的

36.31-36.38

 and it'll turn out that performance is also a little bit difficult to do a good job with

事实证明，我们要将性能这块做好其实也有点难度

36.38-36.45

the specific protocol we're gonna look at and is the protocol explained in a reading for today our two-phase commit

我们所看的这个协议就是今天paper中所讲的二阶段锁




36.54-36.55

this is an atomic commitment protocol

这是一个原子提交协议

36.58-37.07

and this is used both by distributed databases  and also by all kinds of other distributed systems that might not have first looked like traditional databases

该协议这被分布式数据库以及其他各种分布式系统所使用，乍看起来它们可能不像是传统数据库

37.07*-37.10

the general setting is we assume that 

这里我们做个假设

37.10-37.16

that in one way or another the task we need to perform is split up over multiple servers

我们将需要执行的任务通过某种方式拆分到多个服务器上去执行

37.16-37.20

 each of which needs to do some part a different part each one of them

每台服务器只需要执行该任务中的其中一部分

37.20-37.21

 so for example

So，例如


37.21-37.24

 because I'm setup I showed here

在我所展示的这个例子中

37.24-37.26

 which the it's really the data that split up 

这里我们将数据分散到两个服务器上

37.26-37.33

and so the tasks being split up our incrementing X and decrementing Y

So，我们将任务分为两个，其中一个就是对x进行加一，另一个任务就是对y减一

37.33-37.41

we're going to assume that there's one computer that's driving the transaction called the transaction coordinator

假设这里有一台电脑，它用来对事务进行协调，我们将其称为事务协调器（transaction coordinator）


37.41-37.58

 there's lots of ways of arranging how the transaction coordinator steps in

我们可以通过很多方法来让事务协调器介入事务的执行

37.58-38.02

but we'll just imagine it as a computer that is actually running the transaction 

但我们可以想象一下，这里有一台正在执行事务的服务器

38.02-38.10

there's one computer the transaction coordinator  that's executing the sort of code for the transaction like the puts and the gets and the adds 

我们将一台服务器当作事务协调器使用，它维护执行这些操作相关的事务代码，比如：put，get和add之类的操作

38.10-38.18

and it sends messages to the computers that hold the different pieces of data that need to actually execute the different parts 

它会向不同的服务器发送消息，这些服务器上保存着执行任务中不同部分所需的不同数据

38.19-38.21

so for our setup

So，在我们的设置中

38.21-38.24

 we're going to have one computer of the transaction coordinator

我们会在一台服务器上放事务协调器


38.24-38.32

and it's going to be these server one and server two that hold X&Y

这里有两个服务器，上面分别保存着x和y的记录

38.32-38.36

 transaction coordinator will send a message to server one

事务协调器会发送一条消息给服务器1

38.36-38.37

 saying oh please increment X

并说，Oh，请对x的值进行加一

38.37-38.40

send a message to server Y saying oh please decrement Y

接着，发一条消息给服务器2，并说，Oh，请对y的值减一

38.40-38.45

 and then there'll be more messages in order to make sure that either they both do it or neither than do it 

接着，我们需要通过多条消息来确保，这两条消息都被执行了，或者都没被执行

38.45-38.48

and that's where two-phase commit steps in

这就是两阶段提交所做的事情

38.48-38.51

 something to keep in the back your mind is 

你脑子里要记住的事情是

38.51-38.52

that in the full system

在整个系统中

38.52-38.55

there may be many different transactions running concurrently 

可能会以并发的形式执行很多不同的事务

38.55-39.01

and many transaction coordinators sort of executing their own transactions

并且很多事务协调器会去执行它们自己的事务

39.01-39.07

and so the various participants here need to keep track of oh you know this is a message for such-and-such a transaction

So，不同的事务参与者需要对信息进行跟踪，比如这是XXX事务所对应的消息

39.07-39.12

and where they keep state like these turns out these servers are going to maintain table of locks

事实证明，这些服务器会去维护一张lock表

39.12-39.13

 for example

例如

39.13-39.18

and they keep state like that they need to keep track of oh this is a lock that's being held for transactions 17

它们会对状态进行跟踪，比如它们所跟踪的这个锁是事务17的所拿着的锁

39.18-39.29

so there's a notion of transaction IDs or TID

So，这里会有事务id的概念

3930-39.31

and I'm just gonna assume

这里我会假设

39.31-39.33

 although you know I'm not actually show it 

实际上，虽然我这里并没有展示这点

39.33-39.39

that every message in the system is tagged with the transaction with the unique transaction ID of the transaction it applies to 

系统中每条消息都会打上相关事务的唯一事务id

39.39-39.43

and these IDs are chosen by the transaction coordinator when the transaction starts

事务协调器会在事务开始的时候去指定这些事务id


39.43-39.49

the transaction coordinator will send out oh this is a message for transaction id 95

事务协调器会发送一条信息给这个服务器，它会说，Oh，这条消息的唯一事务id是95



39.49-39.54

and it'll keep all its state here about the transaction will be tagged with 95

事务协调器这里会维护跟事务id 95相关的所有状态

39.54*-40.02

 and the various tables in the different participants in the transaction will be tagged with the transaction IDs

我们会对该事务中不同参与者的各个表用事务id进行标记

在这个事务中，不同参与者（不同服务器）所要操作的相关表会用这个事务id进行标记

40.02-40.06

 and so that's another piece of terminology  we got the transaction coordinator 

So，这是我们在事务协调器中遇到的另一个术语

40.06-40.14

and then the other servers that are doing parts of the transaction are called participants

负责执行事务中部分任务的服务器叫做参与者（participant）

40.19-40.21

all right



40.21-40.27

so let me draw out the two-phase commit protocol  example execution

So，这里我来给你们画一下两阶段提交协议


40.27-40.33

 so this is abbreviate this to PC for two-phase commit 

So，我们将两阶段提交简写为2PC

40.33-40.39

the parties involved are the transaction coordinator 

这里涉及了几方，其中一方是事务协调器

40.39-40.41

and we'll just say there's two participants

假设，这里有两个参与者

40.41-40.46

that is you know maybe we're executing the transactions I've shown x and y on different servers

比如，在我之前展示过的事务中，x和y是在不同服务器上的


40.46-40.52

 maybe we've got participant a and participant B 

这里我们有两个参与者，即A和B

40.52-40.56

these are two different servers holding data

这是两个服务器持有着不同的数据

40.56-41.00

so the transaction coordinator it's running the whole transaction

So，事务协调器会去运行整个事务

41.00-41.08

 it's it's gonna send puts and gets to a and B to tell them to you know read the value of x or y or add one to X

它会发送put和get请求给服务器A和B，以此告诉它们去读取x或者y的值，或者对x进行加一















三十七  阅举报
12-03
41.08-41.12

 so we're going to see at the beginning of the transaction

So，我们会在事务开始的时候看到

41.12-41.19

that the transaction coordinator is sending for example maybe a get requests to participant A

例如，事务协调器向参与者A发送了一个get请求


41.19-41.21

 and it gets a reply

它收到了一个来自A的回复


41.21-41.27

 and then maybe it sends that put for 

接着，它可能发送了一个put请求给参与者B

41.27-41.30

whatever I might see a long sequence of these，if there's a complicated transaction 

如果这里是一个复杂的事务，那么我可能会看到一连串这样的请求和响应



41.30-41.44

then when transaction coordinator gets to the end of the transaction and wants to commit it and be able to you know release all those locks  and make the transactions results visible to the outside world 

当事务协调器完成事务时，它想去提交该事务，并释放该事务中所用到的所有锁，以及让事务结果对外可见

41.44-41.47

and maybe reply to a client or a human user

它可能会对一个客户端或者用户进行回复

41.47-41.49

so they were assuming 

So，假设


41.49-41.54

there's a sort of external client or human that said oh please run this transaction

这里外部可能有一个客户端或者用户，它们说，请执行这个事务

41.54-41.56

 and it's waiting for a response

它就会等待事务协调器对它进行响应

41.56-41.59

 before we can do any of that

在我们进行任何事务之前

41.59-42.06

the transaction coordinator has to make sure that all the different participants can actually do their part of the transaction

事务协调器得去确保所有不同的事务参与者都能够执行它们负责的那部分事务

42.06-42.09

 and in particular if there were any puts in the transaction 

特别是，如果在该事务中出现了任何put请求

42.09-42.17

we need to make sure that the participants who are doing those puts well are actually still capable of doing the puts

我们需要去确保这些处理put请求的参与者确实具备处理这些put请求的能力

42.17-42.21

 so in order to find that out，

So，为了弄清楚这点

42.21-42.33

the transaction coordinator sends prepare messages to all of the participants 

事务协调器会发送prepare消息给所有的事务参与者

42.33-42.37

so we're going to send prepare messages to both a and B

So，我们会给A和B这两个参与者都发送prepare消息


42.37-42.45

and when a or B would receive a preparer message

当A和B收到了一条prepare消息

42.45-42.48

 you know they know the transaction is nearing completion but not not over yet

它们知道这个事务的进度已经接近完成了，但还没有完成

42.48-42.51

they look at their state 

它们会去查看它们的状态

42.51-42.54

and decide whether they are actually able to complete the transaction

并判断它们实际是否能够完成这个事务中的操作

42.54-43.06

 you know maybe they needed to abort it，break a deadlock or maybe they've crashed and restarted，but between you know when they did the last operation are now 

当它们在进行最后的操作时，它们可能需要去中断这个事务来干掉这个死锁，或者因为它们崩溃并重启了

43.06-43.06

and they've completely forgotten about the transaction and can't complete it 

它们就完全忘记了关于这个事务相关的事情，并且无法完成该事务

43.06-43.08

so a and B you know look at their state and say oh

So，A和B就会去查看它们的状态，并说：Oh

43.08-43.12

 I'm going to be able to or I'm not gonna be able to do this transaction

我能够或者我不能够去执行这个事务


43.12-43.18

and they respond with either yes or no

它们会对事务协调器回复Yes或者No

43.18-43.33

so the transaction coordinator is waiting for these yes or no votes from each of the participants

So，事务协调器就会等待每个事务参与者的回复，即这些Yes和No

43.33-43.35

if they all say yes

如果它们都回复Yes

43.35-43.46

 then the transaction can commit nothing goes wrong the transaction can commit 

那么这也就是说一切Ok，我们可以提交该事务


43.46-43.58

and the transaction coordinator sends out a commit message to each of the participants 

事务协调器就会给每个事务参与者发送一条commit消息

43.58-44.09

and then the participants usually reply with an acknowledgement saying yes we now know the outcome

然后，事务参与者就会对事务协调器回复一条确认信息：Yes，我们现在知道结果了

44.09-44.12

 this is called the acknowledgement

这被叫做确认信息

44.12-44.16

all right so they all transaction coordinator sends preparers

So，当事务协调器发送prepare消息时

44.16-44.19

if all the participants say yes  it can commit

如果该事务的所有参与者都说Yes，它可以进行提交

44.19-44.25

if anyone in any of them even a single one says no actually I cannot complete this transaction

如果其中一个参与者说：No，我没法完成这个事务

44.25-44.27

 because I had a failure 

因为这里我发生了一个故障

44.27-44.31

or there was an inconsistency like a missing record 

或者这里有不一致的地方存在，比如缺了一条记录

44.31-44.32

and I have to abort 

那我就得进行中断

44.32-44.35

even a single participant says no at this point 

此时，只要有一个参与者说No

44.35-44.37

then the transaction coordinator won't commit

那么事务协调器就不会发送commit消息

44.37-44.39

it'll send out a round of abort messages 

它会对所有参与者发送abort消息

44.39-44.45

saying oops please retract this transaction

并说，抱歉，请回滚此事务

44.45-44.49

either way the after the commit

在发送commit消息后

44.49-44.53

 sort of to two things happen of interest to us

对我们来说，我们对有两件事情很感兴趣

44.53-44.59

one is the transaction coordinator will emit whatever the transactions output is to the client or human that requested it

其中一件事情就是，事务协调器会向请求该事务结果的客户端或者用户发送该事务的执行结果

44.59-45.01

and say look oh yes the transactions finish

并说：看！这个事务已经完成了

45.01-45.03

and so now if it didn't abort 

So，如果该事务并没有中断

45.03-45.05

its committed it's durable

它就会被提交，并持久化到磁盘上

45.05-45.06

the other interesting thing is that 

另一件我们感兴趣的事情是


45.06-45.11

in order to obey these locking rules

为了去遵守这些锁规则


45.11-45.17

 the participants unlock when they see either commit or an abort 

当这些参与者看到commit消息或者abort消息时，它们就会释放这些锁

45.17-45.26

and indeed in order to obey the two phase locking rule 

为了去遵守二阶段锁的规则

45.26-45.34

each participant locked any data that it read as part of doing its part of the transaction

当参与者要去执行它所做的这部分事务时，它会去锁住它所要读取的这部分数据

45.34-45.36

so we're imagining that

So，我们来想象下，

45.36-45.41

in each participant there's a table of the locks associated with the data stored at that participant 

在每个参与者中都会有一张lock表，在它上面将锁与该事务所操作的数据对象关联起来    

锁与保存在该参与者的数据相关联

45.41-45.45

and the participant sort of lock things in those tables

参与者会将这些锁信息用这些lock表进行保存

45.45-45.50

remember oh this is you know this piece of data this record is locked for transaction twenty nine

它会说，这条被锁住的记录是事务id为29所需要的数据

请记住，在这条被锁住的记录上挂载的锁是由事务id为29的事务所持有的

45.50-45.56

 and one finally the commit or abort comes back transaction twenty-nine，the participant unlocks that data

最后当事务协调器返回给参与者commit或者abort消息时，参与者就会释放该数据所对应的锁

45.56-45.58

 and then other transactions can use 

然后，其他事务就可以使用这些数据


45.58-46.04

so we may have to wait here and this unlock may unblock other transactions

So，我们就得在这里等这些参与者释放锁，这样就可以解除对其他事务的阻塞了

46.04-46.11

 that's really part of the serializability machinery

这部分就是序列化机制中我想讲的内容


46.11-46.19

 so you know so far the reason why this is correct basically

So，为什么这个流程是正确的原因是

46.19-46.21

 is that the if everybody's following this protocol

如果所有参与者都遵循这个协议

46.21-46.22

there's no failures

并且没有故障发生

46.22-46.26

 then the two participants only commit if both of them commit 

那么这两个参与者只有在它们收到的都是commit消息时，它们才能进行commit操作

46.26-46.27

and if I them can't commit 

如果它们无法进行commit

46.27-46.30

if either them has to abort

如果它们中任何一个中止了

46.30-46.31

 then they both abort 

那么它们都得中止这个事务

46.31-46.35

so we get that either they all do it or none of them do it 

So，也就是说，要么它们都能提交，要么全都不能

46.35-46.45

result that we wanted  the atomicity result with this protocol so far without without thinking about failures 

在不考虑发生故障的情况下，我们想通过这个协议得到原子性的结果

46.45-46.47

and so now our job is to

So，我们现在的任务是

46.47-46.51

think through in our head all sort of the different kinds of failures that might occur 

我们要去思考各种可能会出现的故障

46.51-47.01

and figure out whether the protocol still provides atomicity either both do it or neither do it in the face of these failures

并弄清楚在面对这些故障的情况下，该协议是否还能为我们提供原子性



47.01-47.07

 and how we have to adjust or extend the protocol in order to cause it to do the right thing

以及我们该如何对协议进行调整或增强以便正确执行事务


47.07-47.12

so the first thing I want consider is  what it be crashes and restarts

So，首先我想讨论的是，如果参与者B发生了崩溃并重启，这会发生什么

47.12-47.28

I mean power failure or something be just some suddenly stops executing and then powers restored and it's brought back to life and run some maybe some sort of recovery software as part of the transaction processing system 

我指的是电源故障这种导致事务执行突然中断的情况，当供电恢复后，服务器重启完毕，然后运行事务处理系统中的恢复软件进行恢复

47.28-47.32

well，there's really two scenarios we have to worry about 

Well，这里我们得去考虑两种情景


47.32-47.39

one is B might have crashed before sending it's yes message back

其中一种场景是，B可能在将yes这条消息发回事务协调器前，它就已经崩溃了

47.39-47.45

so B crash before sending its yes message back

So，B在发送Yes消息之前就已经发生了崩溃

47.45-47.47

 then it never said yes

那么它就永远不会对事务协调器说Yes

47.47-47.54

so the transaction coordinator couldn't possibly have committed or be about to commit 

So，事务协调器就不可能发送commit消息给这些参与者

47.54-47.56

because it has to wait for a yes from all participants 

因为它得等待来自所有参与者对它说Yes

47.56-48.03

so if B can convince itself that it could not possibly have sent a yes back， that is a crash before sending the yes

So，如果在发送Yes之前，B所执行的这个事务部分就发生了崩溃，从它自身的角度来说，它就不可能再返回一个Yes了



48.03-48.09

then B is entitled to unilaterally abort the transaction itself and forget about it

那么B就有权中断该事务，并完全忘记该事务的相关内容

48.09-48.13

because it knows the transaction coordinator can't possibly commit it

因为它知道事务协调器不可能向它发送commit消息

48.13-48.21

 so there's you know a number of ways of implementing this

So，你知道的，我们可以通过很多种方式来对其进行实现

48.21-48.27

 one possibility is that all of B's information about transactions that haven't reached this point is in memory 

其中一种可能是，B中所有关于该事务的信息此时都放在内存中，还没有发回给事务协调器

48.27-48.29

and it simply lost it B crashes and reboots

如果B崩溃重启的话，那么我们就会很容易丢失这些数据

48.29-48.34

 so B just won't know anything about transactions，that haven't haven't sent yes back yet

So，B对于该事务也就一无所知，它目前也没将Yes发回给事务协调器


48.34-48.39

and then if the transaction coordinator sends a prepare message to a participant

然后，如果事务协调器发送了一条prepare消息给一个参与者

48.39-48.42

that doesn't know anything about the transaction 

B对该事务一无所知

48.42*-48.43

because it crashed before sending yes 

因为B在发送Yes前就崩溃了

48.43-48.47

the the participant will say no no I cannot possibly agree to that

参与者B就会说No，我没法同意这么做

48.47-48.49

you know please abort

你知道的，请中止这个事务

48.51-48.52

okay 



48.52-48.56

but of course maybe B crashed after sending a yes back

但当然也会有这种情况，即B发送完Yes给事务协调器后，它就崩溃了

48.56-49.01

 so that's a little more tricky

So，这处理起来就更加棘手了

49.01-49.03

 so wasn't in the crash

So，我们不在这里崩溃

49.03-49.07

this wasn't a B gets a prepare its it's happy it says yes I'm going to commit

B这里拿到了prepare消息，它就很高兴，它说Yes，我会去进行commit

49.07-49.13

and then it crashes before it gets the commit message from the transaction coordinator

然后，在它收到事务协调器所发的commit消息之前，它崩溃了

49.13-49.16

well now we had we're in a totally different situation 

Now，现在我们就遇上了一个完全不同的情况

49.16-49.19

B is promised to commit if told to do so 

如果事务协调器收到了B所发送的这个Yes，它会给B发送commit消息

49.19-49.21

because the send a yes back 

因为B发送了Yes给事务协调器

49.21-49.26

and for all knows and indeed the most likely thing that's happening is the transaction coordinator got yeses from a and B

目前我们所知道的是，事务协调器收到了来自A和B所发送的Yes

49.26-49.28

and sent a commit message to a 

然后，它发送了commit消息给A

49.28-49.33

so that a actually will do its part of the transaction and make it permanent and release locks 

So，A就会去执行它所负责的那部分事务，并将结果持久化到磁盘上，然后释放锁

49.33-49.35

and in that case 

在这个例子中

49.35-49.36

in order to honor all or nothing 

为了做到原子性


49.36-49.40

we're absolutely required it B should crash at this point

那么我们肯定得让B在这里崩溃

49.40-49.45

that on recovery that it be still prepared to complete its part of the transaction

当它恢复之后，它依然准备去完成它所负责的那部分事务

49.46-49.49

it doesn't actually know at that point whether you know because it hasn't received the commit yet

此时它并不知道任何事情，因为它还没有收到commit消息

49.49-49.51

and whether it should commit or not

它不知道它是否该进行commit操作

49.51-49.52

but it must still be prepared to commit 

但此处它依然准备好去进行commit操作

49.52-49.54

and what that means

这意味着什么呢？

49.54-50.00

the fact that we can't lose the state for a transaction across crashes and reboots

事实上，我们不能因为崩溃和重启而丢失了一个事务的状态


50.00-50.08

is that before B replies to a prepare

在对B回复这个prepare消息之前

50.08-50.22

 it must make the transaction state this sort of intermediate transaction state the memory of all of the changes that's made which may have to be undone if there's an abort plus the record of all the locks the transactions how it held

它首先得将该事务在内存中事务锁管理数据的中间状态（即它所做的这些修改）持久化到磁盘上，以防止可能发生的崩溃中止

以及该事务持有的所有锁的记录持久化到磁盘上。如果发生中止，那就只将锁相关的记录持久化到磁盘上

50.22-50.29

it must make that durable on disk in between it's almost always in a log on disk

它必须将这些东西持久化到磁盘上的日志中

50.29-50.36

 so before B replies yes before B sends yes in reply to a prepare message

So，在B发送Yes来回复事务协调器所发的prepare之前

50.36-50.43

 it first must write to disk in its log all the information required to commit that transaction

它必须得先将用于提交该事务所需的所有信息写入到磁盘上的日志


50.43-50.54

that is all the new values produced by put plus a full list of locks on the disk or some other persistent memory before applying with yes

在回复Yes给事务协调器之前，它会将执行put请求所生成的所有新值以及lock列表写入到磁盘或者其他非易失性存储设备上

50.54-50.57

 and then if there should be if it B's your crash after send  yes

如果B在发送完Yes后崩溃了

50.57-51.00

 that's part of recovery when it restarts

当它重启后，它就会进行恢复

51.00-51.05

 that a look at his it's log and say oh gosh I was in the middle of a transaction I had replied yes for transaction 92

然后，它会查看它的日志并说，Oh，我正在执行一个事务，我已经为事务92回复了Yes给事务协调器

51.05-51.10

I mean you know here's all the modifications it should make if committed and all the locks it held

我的意思是，这里是该事务所需要提交的所有修改以及它所持有的所有锁

51.10-51.12

I've restore that state 

我已经恢复了它所执行的那部分事务的状态

51.12-51.16

and then when B finally gets a commitment or an abort 

接着，当B最终收到commit或者abort消息时

51.16-51.21

it'll know from having read its log how to actually finish its part of the transaction

它就会去读取它的日志来弄清楚该如何结束它所负责的那部分事务

51.21-51.29

 so so this is an important thing I left out of the original laying out of this protocol is

So，我漏讲了关于该协议中一件重要的事情


51.29-51.。33

that B must write to its disk at this point

那就是B此时必须将它的日志写入到磁盘

51.33-51.38

and this is part of what makes two-phase commit a little bit slow is 

这就是造成二阶段提交速度有点慢的原因所在

51.38-51.42

that there's these necessary persisting of information here

这里我们有必要将信息保存到磁盘上的日志中

51.42-51.46

 okay 


51.46-51.52

so we also have to worry about okay and you know the final place I guess where you might crash is

So，这里我们最后可能会发生崩溃的地方是

51.52-52.01

you might crash be my crashed after receiving the commit or or after both you might crash after actually processing the commit 

我们可能在收到commit消息后，提交完事务后发生崩溃

52.01-52.02

and but in that case 

但在这种情况下

52.02*-52.15

it's made modifications that the transaction means to make permanent in its database presumably also on disk before after it received a commit message

在B收到commit消息后，它得将该事务所做的修改保存到它的数据库中，并且也要落地到磁盘上

52.15-52.19

 and in that case there's maybe not anything to do if it restarts

在这个例子中，当B重启后，它可能不需要做什么事情

52.19-52.20

because the transaction is finished 

因为事务已经结束了


52.20-52.23

so when B receives the commit message

So，当B收到commit消息时

52.23-52.31

it probably writes the copies the modifications from its log on to its permanent storage

它可能已经将事务所做的修改从它的日志中写入到了磁盘上

52.31-52.32

 releases this locks

释放了这些锁

52.32-52.37

erases the information about the transaction from its log and then replies

将该事务的相关信息从它的日志中移除，然后进行回复

52.37-52.42

and of course we have to worry about you know what if it receives a commit message twice

Of course，我们得去关心，如果它收到两次commit消息时会怎么办

52.42-52.45

probably the right thing to do is 

正确的做法可能是

52.45-52.49

either for B to remember about the transaction that takes memory

对于B来说，它会记住放在内存中的这个事务

52.49-52.50

so it turns out that

So，事实证明

52.50-52.54

 it B simply forgets about committed transactions that it's made durable on disk

B很容易就会忘记它提交的这些事务，这些事务它已经落地到磁盘上了

52.54-53.00

 it can reply to  repeated commit message if it doesn't know anything about that transaction 

如果它对该事务一无所知，那么它可以对这个重复发送的commit消息进行回复

53.00-53.02

by simply acknowledging it again 

即简单地再次通知该参与者即可

53.02-53.05

and that'll be an important a little bit later on

之后你们就会看到它的重要性

=======================================

53.05-53.07

 ok 



53.07-53.11

so that's the story of one of the participants crashes at various awkward points

So，这就是参与者在不同情况下崩溃所发生的故事

53.11-53.14

 what about the transaction coordinator

事务协调器是什么呢？

53.14-53.17

 it's also just a single computer

它其实就是一台服务器

53.17-53.19

 sorry you know if it fails might be a problem 

如果它出现了故障，那这可能就出现问题

53.19-53.24

okay 



53.24-53.30

so again the critical where things start getting critical is 

So，这里的关键在于

53.30-53.33

if any participants might have committed

如果有任意参与者已经进行了提交操作

53.33-53.37

 then we cannot forget about that

那么我们肯定不能忘记这些参与者已经做过提交操作了

53.37-53.41

 if any either of these participants might have committed

如果这其中任意一个参与者已经提交了该事务

53.41-53.44

or if the transaction coordinator might have replied to the client

或者，如果事务协调器已经对客户端回复过了

53.44-53.50

then we cannot have that transaction go away right

那么我们就不能丢掉这个事务

53.50-53.52

 if a is committed

如果A已经准备好要提交了（即发送了Yes给事务协调器）

53.52-53.55

 but maybe its transaction coordinator sent out a commit message to a 

但可能事务协调器这会儿给A发送了一条commit消息

53.55-53.59

but hadn't gotten around to sending a commitment to be the crashes at that point 

但是它还没将这条commit发送出去时，它就发生了崩溃

53.59-54.09

the transaction coordinator must be prepared on restart to resend the commit messages to make sure that both parties know that the transaction is committed 

那么事务协调器必须进行重启并重新发送该commit消息，以此确保两方都知道该事务可以被提交


54.09-54.18

so okay so you know whether that matters depends on where the transaction coordinator crashes

So，影响是否巨大取决于事务协调器在哪崩溃

54.18-54.22

 if the crash is before sending commit messages it doesn't really matter

如果崩溃是在发送commit消息之前发生，其实这并没有什么关系

54.22-54.28

neither party if you know since the transaction coordinator didn't send commit messages before crashing

你知道的，因为事务协调器在崩溃之前并没有发送任何commit消息给参与者

54.28-54.31

 it can just abort the transaction

它可以直接中止该事务

54.31-54.35

and if either participant asks about that transaction

如果有某个参与者询问该事务相关的信息

54.35-54.38

because they you know see it's in their log but they never got a commit message

你知道的，因为它们看了下它们的日志信息，但它们并没有看到这上面说它们收到了一条commit消息

54.38-54.40

the transaction coordinator can say

事务协调器会这么说

54.40-54.42

 I don't know anything about that transaction 

我并不清楚该事务的任何信息

54.42-54.44

it must have been aborted possibly due to a crash

由于崩溃的问题，它必然已经被中止了

54.44-54.49

 so that's what happens if the transaction coordinator crashes before the commit

So，这就是事务协调器在发送commit消息前发生崩溃时所发生的事情

54.49-54.53

 but if a crashes after sending one or more commits message

但如果是发送完一条或多条commit消息后，事务协调器发生了崩溃，这会怎么样呢？


54.59-55.03

 then it cannot transaction coordinator can't be allowed to forget about the transaction

那么我们不允许事务协调器忘记该事务的相关信息

55.03-55.06

 and what that means is that

这意味着


55.06-55.08

 at this point 

此时

55.08-55.14

when that after the transaction coordinator it's made its commit versus abort decision on the basis of these yes/no votes

当事务协调器根据参与者所发送的Yes和No做出该发送commit还是abort给参与者的决定后

55.14-55.17

 before sending out any commit messages

在发送任何commit消息之前

55.17-55.25！！！！！

it must first write information about the transaction to its log in persistent storage like a disk

事务协调器首先得将关于该事务的信息写入到它的日志中，并持久化到存储设备中，比如磁盘

55.25-55.28

 that will still be there if it crashes and restarts

如果崩溃重启了，那么这些信息依然还会在磁盘上，不会丢失

55.28-55.33

 so transaction coordinator after receives a full set of yeses or noes

So，当事务协调器收到一组yes或者no后

55.33-55.38

 writes the outcome and the transaction ID to its log on disk

它会将结果以及事务id写到它保存在磁盘上的日志中

55.38-55.40

 and only then it starts to send out commit messages 

只有这样，它才会开始发送commit消息

55.40-55.49

and that way if a crash is at any point  maybe before its end the first commit message or after its sent one or maybe even after sent all of them 

如果事务协调器在发送完第一条commit消息前或者发送完全部commit消息后崩溃了

55.49-55.50

if it crashes that point 

如果它在这个时候崩溃了

55.50-55.53

its recovery software will see in the log AHA 

它的恢复软件就会去查看它的日志并说

55.53-55.59

which is in the middle of a transaction the transaction was either known to have been committed or aborted

目前还处于执行一个事务的期间，根据日志我们知道该去提交这个事务还是中止这个事务

55.59-56.01

and as part of recovery

作为恢复处理的一部分

56.01-56.07

 it will resend commit messages to all the participants or abort messages whatever the decision was

它会根据实际情况向所有的参与者重新发送这个commit消息或者是abort消息



56.04-56.11

 in case  it hadn't sent them before it crashed

在这个例子中，在它崩溃前，它还没有将这些消息发送给参与者

56.11-56.17

 and that's one reason why the participants have to be prepared to receive duplicated commit messages

这就是参与者得做好接收重复的commit消息的其中一个原因

这就是为什么参与者得做好接收重复的commit消息准备的一个原因

56.17-56.22

 okay



56.22-56.33

so there's some other so those are the both main crash stories

So，发生崩溃的情况主要就是这两种

56.33-56.36

 we also have to worry about what happens if messages are lost in the network

我们也得去关心如果消息在发送的时候因为网络而丢失的话，会发生什么

56.36-56.39

 you might send a message maybe the message never got there

你可能发送了一条消息，但这条消息并未被人接收到

56.39-56.42

 you might send a message and be waiting for a reply 

你可能发送了一条消息，并等待对应的回复

56.42-56.44

maybe the reply was sent

可能这条回复已经发送出去了

56.44-56.45

 but the reply was dropped 

但这条回复信息丢失了

56.45-56.47

so any one of these messages may be dropped 

So，可能其中一条消息出现了丢失的情况

56.47-56.53

and need to think through what to actually do in each of these cases

我们得去思考如果遇上这些情况，我们该怎么办

56.53-56.56

 so for example

So，例如


56.56-56.59

supposing the transaction coordinator sent out prepare messages

假设事务协调器发送了prepare消息给参与者

56.59-57.03

 but hasn't gotten some of the yes or no replies from participants 

但它并没有收到某些参与者所发送的Yes或者No的回复

57.03-57.06

what are the transaction coordinator's options at that point

此时，事务协调器的选择是什么呢？

57.06-57.08

 well one thing I could do is 

Well，其中一件我能做的事情就是

57.08-57.11

send out a new set of prepare messages 

发出一组新的prepare消息

57.11-57.15

saying you know I didn't get your answer please tell me your answer yes or no 

我们会说，我并没有拿到你们的回复，请告诉我你们的答案是Yes还是No

57.15-57.17

and you know I could keep on doing that for a while

我可能每隔一段时间就会发送一条prepare消息，如果说没有得到回复的话

57.17-57.21

 but if one of the participants is down for a long time

但如果其中一个参与者掉线了很长一段时间

57.21-57.25

 we don't want to sit there waiting with locks held right

我们不想一直在那里等待去获取该参与者的锁

57.25-57.28

because you know supposing A is unresponsive

假设A无法响应

57.28-57.29

 but but B is up

但B是在线的

57.29-57.32

 but because that we haven't committed or aborted

但因为我们还没有发送commit或者abort消息

57.32-57.33

B is still holding locks

也就是说，B依然持有着锁

57.33-57.35

 and that may cause other transactions to be waiting

这可能就会导致其他事务处于等待状态

57.35-57.39

so we don't want to wait forever，if we can possibly avoid it 

So，如果我们可以避免这种情况的话，那么我们不想永远一直等待下去

57.37-57.45

so if the transaction coordinator hasn't gotten yes or no responses  after some amount of time from the participants

So，如果过了一段时间，事务协调器还没有从参与者处得到Yes或者No的回复

57.45-57.51

 then it can simply unilaterally decide we're gonna abort this transaction

那么它就可以单方面决定，我们要去中止这个事务

57.51-57.52

 because it knows

因为它知道

57.52-57.55

since it didn't get a full set of yes or no messages 

因为它没拿到一组完整的Yes或No消息

57.55-57.57

of course that can't possibly have sent a commit yet

Of course，它现在还没办法发送commit消息给参与者

57.57-57.59

so no participant could have committed 

也就是说，没有任何参与者可以提交该事务

57.59-58.05

so it's always valid to abort if the transaction coordinator hasn't yet committed

So，如果事务协调器还没有发送提交消息，那么中止该事务这种做法是始终有效的

58.05-58.08

so the transaction coordinator times out waiting for yes or no

So，如果事务协调器等不到这些Yes或者No，那么这就会触发超时

58.08-58.11

because this messages were lost or somebody crashed or something

因为这些消息可能因为网络的原因丢失了，或者某个参与者发生了崩溃

58.11-58.14

it can just decide alright we're aborting this transaction

事务协调器就可以决定去中止这个事务

58.14-58.17

 we'll send out a round of abort messages

我们就会将abort消息发送给参与者

58.17-58.19

 and if some participant comes back to life and says

如果那个发生崩溃的参与者恢复后，并说

58.19-58.23

oh you know I didn't hear back from you about transaction 95

Oh，我并没有从你那收到任何有关事务95的信息

58.23-58.28

 the transaction coordinator will see you oh well I don't know anything about transaction 95

事务协调器就会说，Oh，我不清楚关于事务95的任何信息

58.28-58.32

because it aborted it and erased its State for that transaction

因为事务协调器已经中止了该事务，并将该事务的状态从它所保存的表中移除

58.32-58.36

 and it will tell the participant you know you should abort this transaction  too

它会告诉该事务的参与者，你也应该中止这个事务

58.36-58.41

 similarly

类似的

58.41-58.45

 if one of the participants times out waiting for the preparer here

如果其中一个参与者在等待prepare消息的时候超时了


58.45-58.52

 then you know for participant hasn't received a preparer， that means it hasn't send a yes message back 

你知道的，对于这个还未收到prepare消息的参与者而言，这意味着，它还没发送yes给事务协调器

58.52-58.52

and that means

这意味着

58.52-58.55

 the coordinator can't possibly have sent any commit messages

事务协调器没法给任何参与者发送commit消息



58.55-58.59

so if participant times out here waiting for the preparer

So，如果参与者在等待prepare消息的时候超时了

58.59-59.05

 it's also always allowed to just bail out and decide to abort the transaction

我们始终会允许它去中止这个事务

59.05-59.10

 and if it's some future time the transaction coordinator comes back to life and sends out preparer messages 

如果事务协调器之后恢复后，它发送了prepare消息给参与者

59.10-59.14

then B will say no I don't know anything about that transaction 

接着，B就会说No，我对这个事务一无所知

59.14-5914

so I'm voting no

So，我投No

59.14-59.15

 and that's okay

这样是Ok的

59.15-59.19

 because it can't possibly have committed started to commit anywhere

因为它已经不可能去提交该事务

59.19-59.24

 so again if something goes wrong with the network or the transaction coordinator is down for a while

So，如果网络出现了问题或者事务协调器挂掉了一会儿


59.24-59.27

and the participants are still waiting for prepares 

这些参与者依然在等待prepare消息

59.27-59.34

it's always valid for participants to abort and thereby release the locks that other transactions may be waiting for

对于参与者来说，中止这些事务这种做法是始终有效的，从而就可以释放其他事务正在等待获取的那些锁

59.34- 59.37

 and that can be very important in a busy system

对于一个忙碌的系统来说，这点非常重要

59.37-59.49

so that's the good news about if the participants or the transaction coordinators time out waiting for messages from the other parties

So，如果参与者或者事务协调器正在等待收到来自其他人的消息时发生了超时，那么这种做法对于我们来说，是一个好消息

59.49-59.58

 however suppose participant B has received a preparer  and sent its yes 

但是，假设参与者B已经收到了prepare消息，并发出了Yes


59.58-1.00.01

and so is in somewhere around here 

So，在这边某处地方

1.00.01-1.00.03

but it hasn't received a commit 

它还没有收到commit消息

1.00.03-1.00.05

and it's waiting and waiting and it hasn't gotten to commit back

它等了又等，还是没收到commit消息

1.00.05-1.00.07

 maybe something's wrong with the network

可能这里发生了些网络问题

1.00.07-1.00.12

 maybe the transaction coordinator is its network connection has fallen out

事务协调器可能因为网络的问题掉线了

1.00.12-1.00.13

 or its powers failed or something

或者，这里出现了供电故障

1.00.13-1.00.14

 but for whatever reason

但不管出于什么原因

1.00.14-1.00.16

 B is waited a long time 

B会等待很长一段时间

1.00.16-1.00.17

and it still hasn't heard a commit 

但它依然没有收到commit信息

1.00.17-1.00.23

now but it's sitting there holding locks is still holding on to those locks for all the records that were used and it's part of the transaction and

但现在这个参与者依然拿着该事务所涉及的所有记录的锁



1.00.23-1.00.28

that means other transactions may be also blocked waiting for those locks to be released 

这意味着，其他事务依然在阻塞等待以获取这些锁





四十一  阅举报
12-04
流程

1.00.28-1.00.33

so we're like pretty eager to abort  if we possibly cant release the locks 

So，如果我们没法释放这些锁，那么我们很想去中止这个事务

1.00.33-1.00.34

and so the question is 

So，这里的问题是

1.00.34-1.00.38

if B has received prepare and replied with yes

如果B已经收到了prepare消息，并给事务协调器回复了Yes

1.00.38-1.00.46

isn't entitle to unilaterally abort after it's waited say you know 10 seconds or 10 minutes or something to get the commit message 

当它等了10秒或者10分钟后都没收到commit消息时，它是否有权单方面中止该事务

1.00.46-1.00.50

and the answer to that unfortunately is no

不幸的是，答案是No


1.00.50-1.00.54

 in this region 

在这个区域中

1.00.54-1.00.56

after receiving the prepare

当B接收到prepare消息后

1.00.56-1.00.58

 we're out really after sending the yes

然后我们发送了Yes给事务协调器

1.00.58-1.01.00

 and before getting the commit 

在收到commit消息之前

1.01.00-1.01.03

if your time out waiting for the commit 

如果你等待commit消息时超时了


1.01.03-1.01.07

you're not allowed to abort 

我们不允许它去中止该事务

1.01.07-1.01.08

you must keep waiting

你必须一直等下去


1.01.08-1.01.11

you must usually called block

这通常叫做阻塞

1.01.11-1.01.13

 so in this region of the protocol

So，在该协议的这个区域中

1.01.13-1.01.15

 if you don't receive the commit 

如果你没有收到commit消息

1.01.15-1.01.16

you have to wait indefinitely 

那你就得无限期地等待下去

1.01.16-1.01.18

and the reason is that

这里的原因是

1.01.18-1.01.20

since B sent back a yes

因为B发送了Yes给事务协调器

1.01.20-1.01.23

 that means the transaction coordinator may have received the yes

这意味着事务协调器可能已经收到了这个Yes

1.01.23-1.01.26

 it may have received yes from all of the participants

它可能已经收到了来自所有参与者的Yes

1.01.26-1.01.30

 and it may have started sending out commit messages to some of the participants 

它可能已经给部分参与者发送了commit消息

1.01.30-1.01.38

and that means that A may have actually seen the commit message and committed and made us changes permanent and unlocked and showing the changes to other transactions 

这意味着，A可能已经收到了commit消息，并且提交了该事务，将该事务所做的修改落地，并释放锁，然后将这些修改展示给其他事务

 1.01.38-1.01.41

and since that could be the case for all B knows

正因为这样，通过这个场景就可以知道B为什么要等待了


1.01.41-。01.43

 in this region of the protocol 

在该协议中的这部分区域里

1.01.43-1.01.46

B cannot unilaterally decide to abort at the times out

B不可能单方面因为超时而中止该事务

1.01.46-1.01.51

it must wait indefinitely to hear from the transaction coordinator 

那它就得无限期地等待事务协调器给它的回复

1.01.51-1.01.58

 as long as it takes  some human may have to come and repair the transaction coordinator  and finally get it started again and have it read this log 

遇上这种情况，就得让人来对事务协调器进行修复，并让它重启，然后读取它上面所保存的日志

1.01.59-1.02.01

and see oh yes you committed that transaction

 它会看到，Oh，你发送给我了一个Yes，即它做好了提交事务的准备

1.02.01-1.02.05

 and finally send long delayed commit messages 

最后，它发送了延迟很久都没发送的commit消息



1.02.05-1.02.14

so and similarly

类似的

1.02.14-1.02.25

 if on a time I you can't you can't unilaterally abort

当你某一时刻无法单方面中止事务时

1.02.25-1.02.27

 it turns out you can't unilaterally commit either

事实证明，你也不可能单方面去提交该事务

1.02.27-1.02.32

because for all B knows A might have voted no but B just hasn't got the abort message yet 

因为A可能已经投了No，但B还没有收到事务协调器所发送的abort消息






1.02.33-1.02.34

so you could in this region

So，在这个区域中

1.02.34-1.02.38

 you can either abort nor commit on a timeout 

在超时的情况下，其实你可以中止该事务也可以提交该事务

1.02.38-1.02.51

and so this actually this this blocking behavior is sort of critical property of two-phase commit

So，实际上，这个阻塞行为其实是二阶段提交的一个重要特性

1.02.51-1.02.54

and it's not a happy property

这并不是一个令我们高兴的特性

1.02.54-1.02.55

it means if things go wrong

这意味着，如果这里出了错

1.02.55-1.02.58

 you can easily be in the situation

你会很容易就陷入这种情况

1.02.58-1.03.02

 where you have to wait for a long time with locks held and holding up other transactions

即你就得等很长时间才能获取锁，这也就阻塞了其他事务的执行

1.03.03-1.03.11

and so among other things，people try really hard to make this part of two-phase commit acts as fast as humanly possible

So，在知道了这些后，人们努力地让二阶段提交中的这部分的速度变得尽可能快


1.03.11-1.03.21

 so that the window of time in which a failure might cause you to block with locks held for a long time is as small as possible

这样一来，故障所导致锁被参与者长时间持有而阻塞其他事务的时间就会尽可能的短

1.03.21-1.03.24

 so they try to make this part of the protocol very lightweight

So，他们试着让协议的这部分变得非常轻量

1.03.24-1.03.29

 or even have variants of the protocols that for certain special cases may not have to wait at all 

甚至该协议的某些变种，在某些特殊情况下，可能根本不需要去等待



1.03.29-1.03.33

okay



1.03.33-1.03.35

so that's the basic protocol

So，这是一个基本协议

1.03.35-1.03.38

one thing to notice about this

有一件要注意的事情是

1.03.38-1.03.52

 that is a fundamental part of why we're able to get to actually build a protocol that allows a and B to sort of both you know they both commit or they both have  abort 

之所以我们能够构建出一个能允许A和B同时提交或中止事务的协议的基础部分

1.03.52-。03.53

one reason for that is

其中一个原因是


1.03.53-1.03.59

 that really the decision is made by a single entity it's made by the transaction coordinator alone

这个决定是由一个单体所做的，即事务协调器

1.03.59-1.04.01

 a and B are neither of them

既不是A也不是B去做出提交或者中止事务的决定，而是事务协调器

1.04.01-1.04.10

 you know except that they vote no neither a nor B is deciding whether to commit or not 

你知道的，A或B都不会去决定要不要提交或者中止事务

1.04.10-1.04.18

and they certainly are not engaged in a conversation with each other to try to reach agreement about what is the other thinking or they thinking commit may be all commit too

它们（A和B）之间不会通过通信来试着达成一致，即是否要提交事务

1.04.18-1.04.29

 instead，we have this much is quite sort of fundamentally simple protocol in which only the transaction coordinator makes the decision a single entity 

相反，我们使用这种很基础又很简单的协议，即只有事务协调器才能决定是否要提交事务或者中止事务

1.04.29-1.04.32

and it just tells the other party here's my decision please go do it 

它就会告诉其他团体，这就是我所做的决定，请按照我说的去做

1.04.32-1.04.51

the penalty for that for having the transaction coordinator really the single entity make the final decision again is the fact that you have to block there's some points in which you have to block waiting for the transaction recording coordinator to tell you what the decision was

由事务协调器去做出最终决定的代价是，在某个时间点我们可能会被阻塞，我们要去等待事务协调器告诉我们是提交事务，还是中止事务

1.04.51-1.04.57

 one further question is that 

其中一个更深层次的问题是

1.04.57-1.05.03

we know the transaction coordinator must remember information about transactions in its log 

我们知道事务协调器必须将事务的有关信息保存在它的日志中

1.05.03-1.05.04

in case it crashes

万一它崩溃了，这样就可以避免事务丢失

1.05.04-1.05.06

 and so one question is

So，其中一个问题是

1.05.06-1.05.11

 when the transaction coordinator can forget about information in its log about transactions 

当事务协调器会忘记它日志中有关事务的信息时，会发生什么

1.05.11-1.05.12

and the answer to that is that

对此，答案是

1.05.12-1.05.17

 if it manages to get a full set of acknowledgments from the participants

如果它试着获取参与者所发送的所有确认信息

1.05.17-1.05.22

 then it knows that all the participants know that that transaction committed or aborted

那么它就会知道所有的参与者是都提交了这个事务，还是中止了这个事务

1.05.22-1.05.26

 that all the transactions no participants knew the fate of that transaction

所有的参与者都知道这个事务的命运

1.05.26-1.05.27

 and have done their part in it

并且它们已经完成了它们所负责的那部分事务

1.05.27-。05.31

 and will never need to know that information right  as they both acknowledged it 

当参与者都发送确认消息给事务协调器后，它也就不需要去知道该事务的相关信息了

1.05.31-1.05.34

so when the transaction coordinator gets acknowledgements 

So，当事务协调器收到确认消息后


1.05.34-1.05.38

it can erase all information all memory the transaction

它就可以擦除与该事务的所有信息

1.05.38-1.05.40

similarly

类似的

1.05.40-1.05.44

participants once they received a commit or abort message

一旦当参与者收到了commit或abort消息

1.05.44-1.05.49

 and done their part of the transaction  and made their updates permanent and released their locks 

并且它们已经执行完它们所负责的那部分事务，并将它们的更新落地，释放它们所持有的锁

1.05.49-1.05.50

 at that point 

此时

1.05.50-1.06.00

the participants also can completely forget about that transaction after they send their acknowledgment back to the transaction coordinator 

当参与者发送确认消息给事务协调器后，它们也可以完全忘记该事务的有关信息

1.06.02-1.06-05

now of course the transaction coordinator may not get their acknowledgement 

Of course，事务协调器可能没有收到它们的确认信息

1.06.05-1.06.10

and may send and may therefore decide to resend the commit message on the theory that maybe it was lost

根据理论上讲的，它可能会决定重新发送commit消息给它们

1.06.10-1.06.18

 and in that case，a participant if it receives a commit message for a transaction which it know nothing about because it's forgotten about it

在这个例子中，如果一个参与者收到了一个事务的commit消息，它对该事务并不清楚，因为它已经忘记了与该事务的信息

1.06.18-1.06.23

 then the participant can just send another acknowledgement back

那么，参与者发送另一个确认消息给事务协调器即可

1.06.23-1.06.27

because it knows that it gets a commit message for an unknown transaction  it must be

因为它知道它拿到了一个和未知事务相关的commit消息

1.06.27-1.06.29

 because it had forgotten about it 

因为它忘记了与该事务相关的信息

1.06.29-1.06.31

because it already knew whether it committed or aborted 

因为它已经知道它之前是否有提交事务还是中止事务（知秋注：按照之前所讲，如果来了一个commit，说明Yes已经发过去了，如果是参与者崩溃重启，自己读日志就ok ）

1.06.31-1.06.36

okay 



1.06.36-1.06.40

so that's two-phase commit for atomic commitment

So，这就是原子性提交中的两阶段提交

1.06.40-1.06.44

for a little perspective

从某个小观点来讲

1.06.44-1.06.49

 two-phase commit is used in a lot of sharded databases 

很多分片数据库都使用了两阶段提交

1.06.49-1.06.52

that have split up their data among multiple servers

它们将它们的数据拆分保存到多个服务器上

1.06.52-1.07.06

 and it's used specifically in databases or storage systems that need to support transactions in which records in which multiple records may be read or written

两阶段提交是主要用于数据库或者存储系统上的，它们需要支持可以读取或写入多条记录的事务

1.07.06-1.07.15

 there's a lot of some more specialized storage systems that don't allow you to have transactions on multiple records

还有很多更专业的存储系统不允许你在多条记录上使用事务

1.07.15-1.07.19

 and for them you don't need it you no need this kind of you don't need two-phase commit，if the storage system doesn't allow multi record transactions

如果这种系统不支持对多条记录进行操作的事务，那么我们就不需要使用两阶段提交

1.07.19-1.07。28

 but if you have multi record transactions and you shard the data across multiple servers

但如果你可以对多条记录使用事务，并且你将数据分片并保存到多台服务器上

1.07.28-1.07.35

then you need to support either toothpaste you need to support two phase commit，if you want to get asset transactions

 如果你想得到具备ACID特性的事务，那么你就需要去支持两阶段提交

1.07.35-1.07.40

however two-phase commit has an evil reputation

然而，两阶段提交有一个坏名声

1.07.40-1.07.45

 one reason is it's slow due to multiple rounds of messages

其中一个原因就是因为它的速度很慢，因为它得去发送好几轮消息


1.07.45-1.07.53

 there's a lot of chitchat here in order to get a transaction that involves multiple participants to finish

这里面存在着大量的通信，以此来让涉及多个参与者的事务执行完毕

1.07.53-1.08.02

 theirs in addition a lot of disk writes both a and B have to not just write data to their disk between the prepare and the sending of the yes 

此外，这里面还有大量的写入磁盘的操作，在A和B收到prepare消息和发送Yes消息这段时间内，它们除了要将数据写入到它们的磁盘以外

1.08.02-1.08.04

they have to wait for that disk write to finish

它们还得等待磁盘写入操作执行结束

1.08.04-1.08.15

 so certainly if you're using a mechanical Drive that takes 10 milliseconds to append to the log that puts a real serious limit on how fast participants can process transactions

So，如果你使用的是机械硬盘，它追加日志得花10毫秒，这就严重限制了参与者处理事务的速度

1.08.15-1.08.23

 you know 10 milliseconds means no without some cleverness you're limited to 100 transactions per second which is pretty slow

你知道的，10毫秒意味着，如果没有使用一些巧妙方法的情况下，你每秒钟只能最多处理100个事务，这样的话，速度非常慢

1.08.23-1.08.24

 and in addition

此外

1.08.24-1.08.34

 the transaction coordinator also has a point in which it must after it receives the last yes they must first write to its log  make sure the data is safe on disk 

当事务协调器收到最后一个Yes后，它们首先得将它写入到日志上，以此确保数据落地到磁盘是安全的

1.08.34-1.08.37

and only then is that allowed to send that commit messages 

只有这样，我们才允许它发送commit消息给参与者

1.08.37-1.08.40

and that's another 10 milliseconds 

这就又得花10毫秒了

1.08.40-1.08.45

and both of these are 10 millisecond periods in which locks are held in the participants

这两者都得花10毫秒，并且此时参与者都还拿着锁

1.08.45-1.08.47

and other transactions are slowed up

这也就拖慢了其他事务的速度

1.08.47-1.08.49

 and I keep mentioning that but it's very important

我虽然在反复提这一点，但它真的非常重要

1.08.49-1.08.52

 because in a busy transaction processing system

因为在一个忙碌的事务处理系统中

1.08.52-1.08.54

 there's lots and lots of transactions 

它里面有很多很多事务要去执行

1.08.54-1.08.57

and many of them may be waiting for the same data

它们中很多事务可能都在等待去获取同一个数据对象的锁

1.08.57-1.09.05

 and we'd really prefer not to hold locks over long periods of time  in which there's lots of messages going back and forth

我们不想长时间（事务协调器和参与者之间来回发送消息这段时间）拿着这些锁

1.09.05-1.09.07

then we have to wait for long disgrace

不然我们就得等待很长一段时间

1.09.07-1.09.10

but two-phase commit forces us to do those waits

但两阶段提交强制我们不得不进行等待

1.09.10-1.09.16

 and a further problem with it is that 

关于两阶段提交，另一个更深层次的问题是

1.09.16-1.09.17

if anything goes wrong 

如果这里出现问题

1.09.17-1.09.19

messages are lost，something crashes

比如消息丢失，或者出现崩溃

1.09.19-1.09.23

 then if you're not if you're a little bit unlucky

如果你运气有点差的话

1.09.23-1.09.26

then the participants have to wait for long times with locks held

那么参与者会拿着这些锁并等待很长一段时间

1.09.26- 1.09.28

so therefore

So，因此

1.09.28-1.09.35

 2phase  commit you really only see it within relatively small domains within a single machine room within a single organization

你只会在很小的范围内看到有人使用二阶段提交，比如一个机房，或者一个小组织

1.09.35-1.09.38

you don't see it

你不会在这些地方看到

1.09.37-1.09.38

for example

例如

1.09.37-1.09.42

 did you transfers between banks between different banks

当你在不同银行间进行转账时

1.09.42-1.09.43

you might possibly see it 

你可能会看到

1.09.43-1.09.44

within a bank

在一个银行中

1.09.44-1.09.46

 if it's a sharded database

如果它使用的是分片数据库

1.09.46-1.09.55

 but you would never see two phase commit can it run between distinct organizations that were maybe physically separate because of this blocking business

因为这些阻塞行为的存在，你永远不会看到不同的组织间（物理上独立）会使用二阶段提交



1.09.55-1.10.03

 you don't want to put the fate of you know your database and whether it's operational in the hands of some other organization

你不会想将你数据库的命运放在其他组织的手上

1.10.03-1.10.05

 where they crash at the wrong time

如果当它们在错误的时间发生了崩溃



1.10.05-1.10.08

 you're forced your database was forced to hold locks for a long time

那么你的数据库就会被迫强制长时间持有锁

1.10.08-1.10.13

 and because it's so slow 

因为二阶段提交的速度很慢

1.10.13-1.10.29

also there's a lot a lot of research has gone into either making it fast or relaxing the rules in various ways to allow to be faster or specializing two-phase commit for very specific situations

在很多研究中，人们会通过不同的方式让二阶段变得更快，比如：放宽它的规则，，或者针对特定情况来对它进行调整

1.10.29-1.10.34

 in which you know you can save a message or write to the disk or something off it 

你知道的，你可以节省一条消息，或者节省一次写入磁盘的操作，或者其他之类的事情

1.10.34-1.10.38

because you know you're only supporting a certain limited kind of transaction

你知道的，因为你支持的事务类型有限

1.10.38-1.10.41

 so well we'll see fair amount of this and the rest of the course

So，我们会在这门课的剩余时间里面会看到很多这方面的东西

1.10.41-1.10.46

 one question that comes up a lot

这里有一个经常出现的问题


1.10.46-1.10.56

this exchange here where you have a leader essentially and it sends these messages to the followers

把这里的东西换一下，假设有一个leader，它向它的follower发送这些信息

1.10.56-1.11.08

and you know we can only go forward if the leader can only proceed if it receives you know acknowledgments replies from enough of the followers

我们可以看到，如果leader收到了从follower处收到了足够多的确认信息，它才可以继续处理

1.11.08-1.11.13

this looks a lot like raft  this construction looks a lot like raft

这种构造看起来很像raft

1.11.13-1.11.21

however the properties of the protocol and what you get out of it turn out to be quite different from what we get out of raft 

但事实证明，我们从该协议从所学到的特性和我们之前在raft中学到的还是很不一样的

1.11.21-1.11.25

they solve very different problems

它们解决的问题也是非常不同的

1.11.25-1.11.28

so the way to think about it is 

So，你们可以这么思考

1.11.28-1.11.37

that you use raft to get high-availability by replicating data on multiple participants on multiple peers

你们使用raft来获得高可用性，即通过将数据复制到多个参与者来获得高可用性

1.11.37-1.11.39

 that is the point of raft is 

raft的作用是

1.11.39-1.11.45

to be able to operate even though some of the server's involved have crashed or are not reachable

即使某些服务器发生了崩溃或者无法响应时，我们也能去操作数据

1.11.45-1.11.47

 and you can do this in raft

你可以在raft中做到这点

1.11.47-。11.48

raft can do this 

raft可以做到这一点

1.11.48-。11.50

because all the service are doing the same thing

因为所有的服务做的事情都是相同的

1.11.50-。11.52

 they're doing the same thing

因为它们做的是同一件事情

1.11.52*-1.11.55

 so we don't need all of them to participate

So，我们不需要它们所有人都参与

1.11.55-1.11.57

 we only need a majority

只需要大多数人参与就行

1.11.57-1.12.00

 two-phase commit however 

但对于二阶段提交来说

1.12.00-1.12.03

the participants are not at all doing the same thing 

每个参与者所做的并不是同一件事情

1.12.03-1.12.06

the participants are each doing a different part of the transaction

每个参与者所做的都是一个事务的不同部分

1.12.06-。12.09

 you know a maybe incrementing record X

你知道的，A可能要对记录x中的值加一

1.12.09-1.12.12

 and B maybe decrementing record Y

B可能要对记录y中的值减一

1.12.12-1.12.17

 so two-phase commit  all the participant doing something different

So，在二阶段提交中，所有的参与者做的事情都是不同的

1.12.17-1.12.22

they all have to do their part in order for the transaction to finish

它们得做它们自己负责的那部分事务，来让整个事务执行完毕

1.12.22-1.12.27

you really need to wait for every single one of the participants to do their thing

So，我们就需要去等待每个参与者做完它们所负责的那部分

1.12.27-1.12.31

 so okay



1.12.31-1.12.36

so we got you know raft is replicating doesn't need everybody to do other thing

So，raft所做的就是复制，它不需要所有人都去做其他事情

1。12.36-1.12.37

two-phase commit

对于二阶段提交来说

1.12.37-。12.40

everybody's doing something different that has to get done

每个人都得去做不同的事情

1.12.40-1.12.45

 two-phase commit does not help at all with availability

对于可用性来说，二阶段提交并没有提供太多帮助

1.12.45-1.12.46

you know raft is all about availability

你知道的，raft是关于可用性方面的

1.12.46-。12.50

you can go on even if some of the participants are not responding

即使有一些参与者无法响应，我们依然能够继续执行下去

1.12.50-。12.56

two-phase commit is actually not at all available  it's not highly available at all

二阶段提交实际上跟高可用根本没有关系

1.12.56-1.12.58

if anything goes wrong

如果出现了任何故障

1.12.58-1.13.00

 we risk having to wait until that's repaired

那我们就得等到错误修复完毕，才能继续执行

1.13.00-。13.02

 if the transaction coordinator crashes at the wrong time

如果事务协调器在错误的时间崩溃了

1.13.02-。13.07

 we simply have to wait for to come up and read its log and send out the commit messages right

那我们就得等它恢复，然后读取日志，并发送commit消息

1.13.07-1.13.12

if one of these participants you know crashes at the wrong time

如果其中一个参与者在错误的时间崩溃了

1.13.12-1.13.14

 you know if we're lucky，we simply have to abort 

如果我们运气好的话，那我们（事务协调器发出）中止事务就行了

1.13.14-1.13.15

then we're not lucky

如果我们运气很差的话

1.13.15-1.13.18

 we have to say did you finish that did you finish that 

那我们就得去问这个参与者，你做完你所负责的那部分事务了吗

1.13.18-1.13.22

so two-phase commit is not at all about high availability

So，两阶段提交与高可用关系并不大

1.13.22-1.13.25

 in fact it's it's a it's quite low availability 

事实上，它的可用性很低

1.13.25-1.13.28

as such things go any crash can hold up the whole system

只要有任何崩溃发生，这都会拖累整个系统

1.13.28-1.13.38

and of course raft doesn't ensure that all the participants do whatever the operation is

Of course，Raft不能确保所有参与者都去执行某个操作

1.13.38-1.13.39

 it only requires a majority

它只需要大多数去执行该操作

1.13.39-1.13.41

there may be minority that totally didn't do the operation at all

可能有一些少数派根本不会去执行这个操作

1.13.41-1.13.45

 and that's how the fact that raft all the participants do the same thing 

在raft中，所有的参与者做的都是同一件事情

1.13.45-1.13.46

we don't have to wait for all of them

我们不需要去等待它们

1.13.46-1.13.48

 is why raft gets high availability

这就是为什么我们可以通过raft来获得高可用的原因了

1.13.48-1.13.52

 so these are quite different protocols

So，它们是两个非常不同的协议

1.13.52-1.13.58

 um it is however possible to to usefully combine them

我们是否有可能将这两个协议结合起来呢？

1.13.58-1.14.03

like two-phase commit is you know really vulnerable to failures 

你知道的，两阶段协议很容易出现故障

1.14.03-1.14.05

it's correct with failures

出现故障是很正常的

1.14.05-1.14.07

 but it's not available with the failures

但在发生故障的情况下，它就不可用了

1.14.07-1.14.07

so the question is 

So，这里的问题是

1.14.07-1.14.10

could you build some sort of combined system

我们是否能将它俩结合起来构建出一个系统

1.14.10-1.14.24

 that has the high availability of raft replication but has two phase commits ability to call as various different parties each to do their part of the transaction

该系统既具备raft进行复制所带来的高可用性，也拥有在使用二阶段提交时，让参与者去执行它们自己所负责的事务的这种能力


1.14.24-1.14.34

 and the construction you want actually is to use raft or paxos or some other protocol like that to  individually replicate each of the different parties

事实上，我们想要的结构是这样的，即通过使用raft或Paxos之类的协议来对每个不同的一方进行复制

1.14.34-1.14.38

 so then we would for this set up

So，在这种设置下

1.14.38-1.14.40

 we would have like three different clusters

我们会有3个不同的集群

1.14.40-1.14.47

 the transaction coordinator would actually be replicated service with you know three servers

实际上，我们通过三台服务器来为事务协调器提供复制服务


1.14.47-1.14.53

and you know we'd run raft on these three servers 

你知道的，我们在这三台服务器上运行raft

1.14.53-1.14.55

one will be elected as leader

我们从中选出一个leader

1.14.55-1.14.56

they'd have replicated state

它们都有replicated state

1.14.56-1.14.58

 they'd have a log that helped them replicate

它们通过一个日志来帮助它们进行复制

1.14.58-1.15.06

we really only have to wait for a majority the leader we'd only have to have a majority of these to be up in order for the transaction coordinator to do its work 

对于这个复制服务，我们只需要等待多数派对leader进行回复即可，以此来支持事务协调器去进行它的本职工作

1.15.07-1.15.07

and of course 

Of course

1.15.07-1.15.20

they would all and you know sort of execute through the various stages of the transaction in  the two-phase commit protocol by basically by appending relevant records to their logs 

你知道的，在二阶段提交协议中，在执行该事务的不同阶段，我们会将相关记录追加到它们的日志中


1.15.20-1.15.33

and then each of the participants would also be a cluster of raft replicated cluster

然后，每个参与者也都是一个运行着raft的集群

1.15.40-1.15.46

so we would end up and they would exchange messages back and forth 

So，它们之间会来回交换信息

1.15.46-1.15.55

you know we'd send a commit message from the replicated transaction coordinator service to the replicated a server and the replicated B server

我们会在具有replicated服务的事务协调器中发送一条commit消息给A的副本服务器和B的副本服务器

1.15.55-1.16.00

 and this is you know this is admittedly somewhat elaborate

你知道的，这有些复杂

1.16.00-1.16.05

 but it does show you that you can combine these ideas to get the combination of high availability

但它确实向我们表明，我们可以将这两个想法结合在一起，以此获得高可用性

1.16.05-1.16.07

 because any one of these servers can crash

因为如果其中任意一个服务器崩溃了

1.16.07-1.16.10

 and the remaining two you keep operating

我们依然可以通过剩下的这两个服务器继续我们的操作

1.16.10-1.16.17

plus we get on this atomic commitment of a and B are doing complete different parts of the same transaction 

接着，我们得到了参与者A和B的提交信息，它们各自负责的是同一个事务中完全不同的部分

1.16.17-1.16.26

and we can use two-phase commit to have the transaction coordinator ensure that you know that either both commit the whole thing or they both abort their parts of the transaction 

我们可以通过二阶段提交来让事务协调器去确保A和B都去提交事务，或都中止它们所负责的事务


1.16.26-1.16.32

you'll actually build something very much like

实际上，我们所构建出的东西和这个非常类似

1.16.32-1.16.34

this as part of lab form

这是你们lab的一部分



1.16.34-1.16.37

 which you will indeed build a shard database

你们要去构建一个分片数据库


1.16.37-1.16.39

 where each shard is replicated in this form 

每个分片都会以这种形式进行复制

1.16.39-1.16.42

and there's a basically a configuration manager

基本上，这里有一个配置管理器

1.16.42-1.16.53

 which will allow essentially transactional shifting of chunks of shards of data from one raft cluster to another under the control of something

这允许我们使用某种事务控制的方式将数据进行分片，即从一个raft集群移动到另一个raft集群中（知秋注：比如说，有两个服务器集群A和B，我要对A中的数据进行分片，A中有123456，然后将456移动到B中，那分片控制服务器要做的事其实就是在一个事务内对A进行减操作，对B进行加操作）

1.16.53-1.16.57

that looks a lot like a transaction coordinator

这看起来和事务协调器很像

1.16.57-1.17.01

 so lab 4 is like this

So，lab 4和这差不多

1.17.01-1.17.05

 and in addition

此外

1.17.05*-1.17.08

 in a little bit we'll be reading a paper called spanner

此外，我们还会去读一篇叫做spanner的paper

1.17.08-1.17.10

 which describes a real-life database used by Google 

它里面描述了谷歌在现实生活中所使用的数据库

1.17.12-1.17.17

that users also uses this construction in order to do transactional writes to a database 

用户使用这种构造来做到对数据库进行事务写操作

1.17.17-1.17.19

all right thank you

All right，感谢（摄像老哥）听我讲课，下课！



三十七  阅举报
