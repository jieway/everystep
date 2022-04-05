16-01
0-0.07

All right. Hello, everyone

大家好

0.07-0.17

 I'm today going to talk about this paper about how Facebook uses memcache in order to handle enormous load

今天我要讨论的paper是关于Facebook是如何使用memcache以此来处理海量的工作量（这里指的memcache和下文的memcacheD，说的都是运行着memcacheD的服务器）

0.17-0.20

 the reason we're reading this paper is that

我们读这篇paper的原因是

0.20-0.22

 it's an experience paper

这篇paper中存在着很多可以借鉴的经验

0.22-0.27

 there's not really any new concepts or ideas or techniques here

它里面并没有任何新的概念或者想法或者技术之类的东西

0.27-0.40

but it's kind of what a real live company ran into when they were trying to build very high capacity infrastructure

当那些公司试着去构建具备高负载能力的基础架构时，他们就会去使用这篇paper中提到的这些方法

0.40-0.42

there's a couple of ways you could read it

你可以去读下这篇paper中的两个地方



0.42-0.51

one is a sort of cautionary tale about what goes wrong if you don't take consistency seriously from the start

其中一个故事所带来的警示是，如果从一开始我们就不注重一致性，那么就会发生一些严重的问题

0.51-1.00

another way to read it is that it's an impressive story about how to get extremely high capacity from using mostly off-the-shelf software

另一个故事就是，如何通过现有的软件来获得超高的处理能力

1.00-1.05

another way to read it is that

要读的另一个地方是



1.05-1.14

it's a kind of illustration or the fundamental struggle that a lot of setups face between trying to get very high performance 

在试图获取超高性能的情况下，很多设置都要面临一种根本性的挣扎

1.14-1.22

which you do by things like replication and how to give consistency for which techniques like replication are really the enemy 

对于你所要获得的一致性来说，诸如replication之类的技术就是你的敌人

1.22-1.29

and so you know we can argue about whether we like their design or we think it's elegant or a good solution

So，你知道的我们可以去争论下他们的设计是否优雅，或者说是一个不错的解决方案

1.29-1.33

 but we can't really argue with how successful they've been

但我们无法争论他们现在到底有多成功

1.33-1.37

so we do need to take them seriously

So，我们得严肃对待他们

1.37-1.38

 and for me 

当我而言



1.38-1.41

actually this paper which I first read quite a few years ago

实际上，我第一次读这篇paper是好几年前的事情了

1.41-1.45

I thought about it a lot 

我对它做了很多思考

1.45-1.57

and it's been a source of sort of ideas and understanding about problems at many points

我从中得到了很多想法，并且给了我理解很多方面问题的灵感

1.57-1.59

all right



1.59-2.03

so before talking about Facebook proper 

So，在讨论Facebook之前

2.03-2.10

you know they're an example of a pattern that you see fairly often or that many people have experienced  in which they're trying to build a website to do something 

你知道的，他们在构建网站或者做其他一些事情时，使用了一种你们经常见到的模式，或者说这是一种许多人都见过的模式



2.10-2.21

and you know typically people who build websites are not interested in building high performance storage infrastructure

一般来讲，人们构建网站的时候，他们对于构建高性能的存储基础设施并不感兴趣

2.21-2.28

they're interested in building features that will make their users happy or selling more advertisements or something

他们对于构建让用户开心的功能或者贩卖更多的广告位之类的东西感兴趣

2.28-2.36

you know so they're not gonna start by spending a main year of effort or a whole lot of time building cool infrastructure 

你知道的，他们不会将一年中主要的精力都放在构建那些很Cool的基础设施上面

2.36-2.43

they're gonna start by building features in that they'll sort of make infrastructure better only to the extent that they really have to

他们只有在他们迫不得已的时候，才会去优化并让他们的基础设施变得更好

2.43-2.45

because you know that's the best use of their time 

你知道的，这才是他们对时间的最佳利用方式

2.45-2.45

alright 



2.45-2.53

so a typical starting scenario in a ways when a some website is very small is 

So，一些网站在它们规模还很小的时候，它们的场景是这样的

2.53-2.57

you know there's no point in starting with anything more than just a single machine

你知道的，在一开始的时候，使用多台服务器是没有意义的

2.57-3.02

 right you know maybe you started you only have a couple users sitting in front of their browsers 

你知道的，可能在你网站一开始的时候，只有一两个用户坐在电脑前通过浏览器来访问你的网站


3.02-3.07

and you know they talk over the internet here with your single machine

他们通过网络和你的那台服务器进行通信

3.07-3.15

your single machine is gonna maybe run the Apache web server

你的服务器上可能运行着Apache Web服务器

3.15-3.28

now maybe you write the scripts that produce web pages using PHP or Python or some other convenient easy to program sort of scripting style language

你可能会使用PHP，Python或者那些易于编程的脚本语言来生成网页

3.28-3.31

 and Facebook uses PHP

Facebook使用的是PHP

3.31-3.33

 you need to store your data somewhere 

你需要将你的数据保存在某个地方

3.33-3.37

or you can just download sort of standard database

或者，你可以去下载某种标准数据库

3.37-3.42

and Facebook happen to use MySQL

Facebook使用的是MySQL

3.42-3.43

MySQL is a good choice

MySQL是一个很好的选择

3.43-3.47

 because it implements the sequel query language is very powerful 

因为SQL查询语句非常强大

3.47-3.51

and acid transactions provides durable storage

ACID事务提供了持久化存储

3.51-3.54

 so this is like a very very nice set up

So，这是一种非常nice的设置

3.54-3.57

I am will take you a long way actually

实际上，我会花很多时间来告诉你这些事情

3.57-4.02

 but supposing you get successful，you get more and more users 

但假设如果你很成功的话，你的用户量变得越来越多的时候

4.02-4.12

you know you're gonna get more and more load， more and more people gonna be viewing your website and running whatever PHP stuff your website provides

你知道的，当越来越多的用户访问你的网站时，使用你用php所编写的服务时，你服务器所承受的负载就会越来越大

4.12-4.15

and so at some point

So，在某一时刻

4.15-4.22

almost certainly the first thing that's going to go wrong is that the PHP scripts are gonna take up too much CPU time

首先会出现问题的地方就在于，php脚本将会占用太多的CPU时间

4.22-4.27

 that's usually the first bottleneck people encounter， if they start with a single server 

如果他们一开始使用的是单台服务器，那么通常这就是他们所遇到的第一个性能瓶颈

4.27-4.32

so what you need is some way to get more horsepower for your PHP scripts 

So，你所需要做的就是为你的php脚本提供更多的马力（服务器资源）




4.32-4.37

and so that takes us to kind of architecture number two for websites

So，这就让我们转向了第二种网站架构

4.37-4.44

in which you know you have lots and lots of users right or more users than before

你知道的，你现在拥有的用户量远超以往

4.44-4.48

you need more CPU power for your PHP scripts 

So，你需要更多的CPU处理能力来执行你的php脚本




4.48-4.51

so you run a bunch of front end servers 

So，你运行了一堆前端服务器

4.51-4.55

whose only job is to run the web servers that users' browsers talk to 

它们只负责运行和用户浏览器进行通信的web服务器

4.55-5.00

and these are called front end servers

这些叫做前端服务器








5.00-5.07

so these are going to run Apache  webserver and the PHP scripts

So，这上面运行着Apache web服务器以及php脚本

5.07-5.12

now you know you users are going to talk to different servers at different times

你知道的，你的用户会在不同时间点和不同的服务器进行通信

5.12-5.16

maybe your users call to each other, they message each other

你的用户可能彼此间会打网络电话，或者互发消息

5.16-5.17

they need to see each other's posts or something

他们需要看到彼此间的推文

5.17-5.21

so all these front-end servers are going to need to see the same back-end data

So，所有这些前端服务器都需要看到相同的后端数据

5.21-5.27

and in order to do that

为了做到这点

5.27-5.30

 you probably can't just stick at least for a while

稍等一下

5.30-5.31

you can just stick with one database server

这里你可以放一个数据库服务器

5.31-5.41

 so you gonna have a single machine already MySQL that handles all of the database all queries and updates reads and writes from the frontend servers

So，你可以使用一个服务器来运行MySQL，它用来处理所有来自前端服务器对数据库的查询，更新，读取以及写入请求

5.41-5.44

 and if you possibly can， it's wise to use a single server here 

如果你可以这样做的话，那么这里使用一个服务器来专门处理这些工作是很明智的

5.44-5.50

because as soon as you go with two servers and somehow your data over multiple database servers

因为当你使用两个数据库服务器，并将你的数据以某种方式分散到多个数据库服务器中时

5.50-5.51

 like gets much more complicated

情况就会变得更为复杂

5.51-6.00

and you need to worry about things like do you need distributed transactions or how it has the PHP scripts decide which database server to talk to 

你就需要关心是否要使用分布式事务，或者该PHP脚本应该通过哪种方式来确定它要和哪个数据库服务器进行通信

6.00-6.04

and so again you can get a long way with this second architecture

So，在第二种架构中，你有很长的一段路要走

6.04-6.11

you have as much CPU power as you like by adding more front end servers and up to a point 

在一定程度上，你可以通过增加更多的前端服务器来获取更多的CPU处理能力

6.11-6.16

a single database server will actually be able to absorb the reads and writes of many front ends

实际上，单台数据库服务器能够处理来自许多前端服务器的读写请求

6.16-6.19

 but you know maybe you're very successful 

但你知道的，你可能会非常成功

6.19-6.21

you get even more users

因为你获得了更多的用户

6.21-6.26

 And so the question is what's gonna go wrong next 

So，问题在于下一个出错的地方是什么

6.26-6.26

and typically

一般来讲




6.26-6.30

what goes wrong next is that the database server

接下来会出问题的地方在于数据库服务器

6.30-6.33

since you can always add more CPU，more web servers

因为你可以一直增加CPU以及web服务器的数量

6.33-6.35

you know what inevitably goes wrong is

这里不可避免的问题在于



6.35-6.36

that after a while

过了一定时间后

6.36-6.39

the database server runs out of steam 

数据库服务器的处理能力到达上限

6.39-6.42

Okay



6.42-6.44

so what's the next architecture

So，下一种架构是什么呢？





6.44-6.50

this is web architecture 3

这是web架构3

6.50-6.54

and the kind of standard evolution of big websites

这是大型网站的一种标准演变


6.54-6.59

here we have the same if you know now thousands and thousands of users lots and lots of front ends 

如果我们的有成千上万个用户以及很多个前端服务器


6.59-7.09

and now we basically we know we're gonna have to have multiple database servers 

基本上来讲，我们知道，我们现在得拥有多个数据库服务器



7.09-7.15

so now behind the front ends， we have a whole rack of database servers

So，在这些前端服务器背后，我们有一排数据库服务器



7.15-7.18

each one of them running MySQL again

每台数据库服务器上都运行着MySQL



7.18-7.21

but we're going to shard the data

但我们要对数据进行分片



7.21-7.24

we're driven now to sharding the data over the database server 

我们要将数据进行拆分，并分散到这些数据库服务器上




7.24-7.31

so you know maybe the first one holds keys you know a through G 

So，可能第一个数据库服务器上保存的是key从a到g的相关数据





7.31-7.33

second one holds keys G through Q 

第二个数据库服务器上保存的是key从g到q的相关数据





7.33-7.36

and you know whatever the sharding happens to be 

以此类推



7.36-7.44

and now the front-end you know you have to teach your PHP scripts here to look at the data they need and try to figure out which database server they're going to talk to it 

现在，你得告诉前端服务器上的php脚本它们所需要查看的数据，并且试着弄清楚它们应该和哪个数据库服务器进行通信



7.44-7.45

you know in different times

你知道的，在不同的时间点



7.45-7.47

for different data they're going to talk to different servers

它们会通过和不同的数据库服务器进行通信来获取不同的数据



7.47-7.48

so this is sharding

So，这就是数据分片



7.48-7.52

and of course 





7.52-7.56

the reason why this gives you a boost is that

这样做能让网站提速的原因是





7.56-8.02

now the all the work of reading and writing has split up hopefully hopefully evenly split up between these servers

所有读和写的工作都已经分摊到这些数据库服务器上



8.02-8.05

since they hold different data

因为它们上面持有着不同的数据






8.05-8.07

now replicas sharding the data

我们对数据进行切片并存放到这些replica中



8.07-8.12

and they can execute in parallel and have big parallel capacity to read and write data

它们可以并行执行，并且拥有很强的并行读写数据的能力





8.12-8.15

it's a little bit painful

有点伤的地方在于



8.15-8.18

the PHP code has to know about the sharding

PHP代码需要知道数据分片相关的信息





8.18-8.21

if you change the setup of the database servers

如果你修改了数据库服务器的设置



8.23-8.26

or you realize you need to split up the keys differently 

或者，你意识到你需要以不同的方式对key进行拆分



8.26-8.35

you know now you need a you're gonna have to modify the software running on the front ends or something in order for them to understand about how to cut over to the new sharding

你知道的，你得对前端服务器上的软件进行修改以此来让它们去理解该如何切换到新的数据分片上



8.35-8.38

So there's some pain here

So，这里有些让我们忧伤的地方

8.38-8.40

there's also if you need transactions

如果你需要使用事务



8.40-8.42

and you know many people use them 

你知道的，很多人都使用事务

8.42-8.43

if you need transactions 

如果你需要使用事务



8.43-8.48

but the data involved in a single transaction is on more than one database server

但如果某个事务所涉及的数据存放在多个数据库服务器上

8.48-8.53

you're probably going to need two-phase commit or some other distributed transaction scheme

你可能会需要用到两阶段提交或者一些其他分布式事务方案



8.53-8.55

it's also a pain  and slow 

这让我们很受伤，并且这些方案的速度都很慢

8.55-8.58

all right



8.58-9.04

Well，you can get fairly far with this arrangement 

Well，这种安排可以让你的网站走的更远

9.04-9.07

however it's quite expensive

但这样做，成本有点高

9.07-9.13

MySQL or sort of you know fully featured database servers like people like to use

对于MySQL或者那些人们喜欢使用的功能完备的数据库服务器来说

9.13-9.15

it's not particularly fast

它们的速度不是特别的快



9.15-9.22

it can probably perform a couple hundred thousand reads per second and far fewer writes

它每秒可能可以处理10万个读操作，但每秒执行的写操作的数量就少得多

9.22-9.29

and you know web sites tend to be read heavy 

你知道的，对于网站来说，它们所做的更多是读操作

9.29-9.34

so it's likely that you're gonna run out of steam for reads before writes 

So，你可能在处理写操作之前，你已经将所有精力消耗在读操作处理上面了

9.34-9.40

That traffic will be that we load on the web servers will be dominated by reads 

Web服务器的主要工作量都是来自读请求



9.40-9.41

And so after a while 

So，过了一段时间



9.41-9.47

you know you can slice the data more and more thinly over more and more servers

你知道，你可以将数据切分得更细，并将它们分散到更多的服务器上

9.47-9.49

but two things go wrong with that

但对此，会出现两个问题

9.49-9.50

one is that

其中一点是

9.50-9.52

sometimes

有的时候

9.52-9.56

you have specific keys that are hot that are used a lot

你拥有的某些key对应的数据很热门，它们经常被使用



9.56-9.58

and no amount of slicing really helps there

数据切片对此并没有什么帮助




9.58-10.00

because each key is only on a single server

因为每个key所对应的数据只放在一台服务器上



10.00-10.07

so that keys very popular that servers can be overloaded，no matter how much you partition or shard the data 

So，不管你对你的数据切分得多细，那些保存着热门key所对应数据的服务器就会发生过载



10.07-10.16

and the other problem with adding lots and lots of my sequel database servers for sharding is that

添加大量MySQL数据库服务器来保存数据分片所导致的另一个问题是



10.17-10.19

it's really an expensive way to go  as it turns out 

事实证明，这样做的成本很高



10.19-10.23

and after a point you're gonna you're going to start to think that

之后，你会开始对这个问题进行思考



10.23-10.28

 well instead of spending a lot of money to add another database server running MySQL

Well，我们无须花大量的钱来添加另一台运行着MySQL的数据库服务器



10.28-10.34

I could take the same server run something much faster on it like as it happens memcached

我可以在同一台服务器上面运行些速度更快的东西，比如：memcached



10.34-10.40

and get a lot more reads per second out of the same Hardware using caching than using databases 

在相同的硬件上，使用缓存每秒读取的数据量要比使用数据库多得多



10.40-10.44

so the next architecture

So，下一个架构是



10.44-10.49

And this is now starting to resemble what Facebook is using 

我们所要说的这个架构就开始看起来和Facebook所正在使用的架构有点类似了




10.49-10.54

the next architecture still need users 

这里我们依然要画些圈来表示用户




10.54-11.01

we still have a bunch of front end servers running web servers in PHP 

我们依然要有一堆前端服务器，上面运行着用php写的web服务器

11.01-11.04

and by now maybe a vast number of front end servers

我们可能会有大量的前端服务器

11.04-11.06

we still have our database servers

我们依然会使用我们的数据库服务器

11.06-11.12

 because you know we need us a system that will store data safely on disk for us 

因为你知道，我们需要一个能为我们将数据安全保存在磁盘上的系统

11.12-11.15

and we'll provide things like transactions for us 

我们要为我们自己提供类似于事务之类的功能

11.15-11.19

and so you know probably want a database for that 

So，你知道的，为此，我们可能会想去使用一个数据库来做到这点

11.19-11.23

but in between we're gonna have a caching layer 

但在前端服务器和数据库服务器之间，我们会有一个缓存层

11.23-11.25

that's this is where memcached comes in

这就是memcached所处的位置

11.25-11.28

and of course there's other things you could use though

Of course，这里你也可以使用一些其他的东西

11.28-11.33

 the memcache but memcacheD happens to be an extremely popular caching scheme 

但memcached是一种非常流行的缓存方案

11.33-11.34

the idea now is 

现在的思路是

11.34-11.37

you have a whole bunch of these memcached servers

我们有一堆memcached服务器

11.37-11.42

and when a front-end needs to read some data

当前端服务器需要去读取一些数据

11.42-11.49

 the first thing it does is ask one of the memcache servers look do you have the data I need

它首先要做的是去询问其中一个memcache服务器，并说：你上面是否有保存我所需要的数据




11.49-11.53

so it'll send a get request with some key to one of the memcache servers

So，它会往其中一个memcache服务器发送一个get请求，该请求会携带某个key

11.53-11.57

and the memcache server will check it's got just a table in memory

memcache服务器会去检查它内存中的一张表

11.57-11.58

 it's in fact

事实上

11.58-12.00

memcache is extremely simple

memcache超级简单

12.00-12.03

 it's far far simpler than your lab 3

它比你所做的lab 3还要简单

12.03-12.05

 for example

例如

12.05-12.08

it just has a big hash table on memory

在内存中，它有一张大型hash table

12.08-12.09

it checks with that keys in the hash table

它会检查这个hash table中是否有这个key

12.09-12.10

 if it is

如果有的话

12.10-12.11

 it sends back the data

它就会将对应的数据返回给前端服务器

12.11-12.13

 saying oh yeah here's the value I've cashed for that

并说：Oh，我缓存了这个key所对应的value值

12.13-12.16

 and if the front end hits in this memcache server

如果前端服务器所请求的key命中了这个memcache服务器上所保存的缓存

12.16-12.17

great

那么这很棒

12.17-12.20

I can then produce the webpage with that data in it 

然后，我就可以通过这个数据来生成网页

12.20-12.22

if it misses in the webserver

如果并未命中memcache服务器中的缓存

12.22-12.28

 though the front-end has to then rerequest relevant database server 

那么前端服务器就得将请求重新发送给相关的数据库服务器

12.28-12.34

and the database server will say oh you know  here's the data you need 

数据库服务器就会说，这就是你所需要的数据

12.34-12.36

and at that point

此时

12.36-12.39

 in order to cache it in for the next front-end that needs it 

为了将这些数据进行缓存以供下一个需要使用它的前端服务器使用




12.39-12.47

the front end will send a put with the data it fashion the database into that memcache server 

前端服务器会发送一个put请求并携带它从数据库中所拿到的数据给memcache服务器



12.47-12.57

and because memcache runs at least 10 and maybe more than 10 times faster for reads than the database for a given  amount of hardware

因为在使用相同硬件的情况下，memcache的读取速度要比数据库的读取速度至少快10倍以上

12.57-13.03

it really pays off to use a fair amount some of that hardware for memcache as well as for the database servers

将相当一部分硬件用于memcache和数据库服务器是非常值得的

13.03-13.06

so people use this arrangement a lot 

So，人们经常使用这种架构

13.06-13.07

and it just saves them money

这节省了他们的金钱

13.07-13.11

 because memcache is so much faster for reads than a database server

因为在读操作方面，memcache要比数据库服务器的速度来得更快

13.11-13.13

still need to send writes to the database

但我们依然要将写操作发送给数据库

13.13-13.20

because you want writes to an updates to be stored durably on the database

因为你想将你所做的更新持久化到数据库上

13.20-13.23

 as this can still be there if there's a crash or something 

如果发生了崩溃之类的事情，这些更新依然存放在数据库中不会丢失

13.23-13.28

but you can send the reads to the cache very much more quickly 

但你可以将读操作交由memcache来处理，它的速度比数据库更加快

13.28-13.29

ok 



13.29-13.30

so we have a question

So，我们有一个问题

13.30-13.31

 the question is 

问题是

13.31-13.38

why wouldn't the memcache server actually hit the put on behalf of the front-end and cache the response before responding the front-end

为什么memcache服务器对于这个put操作，在响应前端服务器前，不先将响应缓存起来呢？

13.38-13.39

so that's a great question

So，这是一个好问题

13.39-13.40

you could imagine

你可以想象下




13.40-13.43

 a caching layer that you would send a get to it

你将一个get操作发送给缓存层

13.43-13.44

 and it would if it missed

如果它未能命中缓存

13.44-13.49

 the memcache layer would forward the request to the database

memcache层会将请求转发给数据库

13.49-13.51

database respond the memcache

数据库会对memcache进行响应

13.51-13.54

memcache would add the data to its tables and then respond 

memcache会将拿到的数据放入它的表中，并对前端服务器进行响应

13.54-13.56

and the reason for this is that 

这样做的理由是

13.56-14.01

memcache is like a completely separate piece of software

memcache就像是一个完全独立的软件

14.01-14.03

that it doesn't know anything about databases

它对数据库一无所知

14.03-14.08

 and it's actually not even necessarily used and combined in conjunction with the database 

实际上，我们也不一定要去使用它，并将它和数据库一起使用

14.08-14.09

although it often is

虽然我们经常将它和数据库放在一起使用

14.09-14.15

 so we can't bake in knowledge of the database into memcache

So，我们无法将数据库的知识应用到memcache中

14.15-14.18

and sort of deeper reason is that

更深层次的理由是

14.18-14.25

 the front ends are often not really storing one for one database records in memcache

前端服务器并不会将数据库中的每条记录都存放在memcache中

14.25-14.30

almost always or very frequently what's going on is that

这里经常所发生的事情是

14.30-14.32

the front-end will issue some requests to the database

前端服务器会将一些请求发送给数据库

14.32-14.35

 and then process the results somewhat

接着，它会对得到的结果进行某种处理

14.35-14.40

you know maybe take a few steps to turning it into HTML 

你知道的，它可能需要花几步来将结果转换为html

14.40-14.51

or sort of collect together you know results from on multiple rows in the database and in cached  partially processed information in memcache

或者，它会从数据库和缓存中收集结果，并在memcache中对部分信息进行处理

或者，它会从数据库的多行数据中获取结果，并将部分处理过的信息缓存到memcache中

14.51-14.55

just to save the next reader from having to do the same processing 

以此来节省下一个要执行相同操作的reader所要花的时间



14.55-14.56

and for that reason

出于这种理由

14.56-15.07

 memcache it doesn't really understand the relationship between what the frontends would like to see cached and how did you derive that data from the database

memcache并不理解前端服务器想看到哪些缓存数据，以及你是如何从数据库中衍生数据的

15.07-15.10

that knowledge is really only in the PHP code on the front end

这些逻辑都是放在前端服务器中的php代码里的

15.10-15.14

 so therefore even though it could be architecturally a good idea

So，从架构上来说，这是一个很不错的想法

15.14-15.21

We can't have this integration here sort of direct contact between memcache and the database 

我们不能做这种整合，即让memcache和数据库之间直接进行通信

15.21-15.26

although it might make the cache consistency story much more straightforward

虽然这会让缓存一致性变得更为简单

15.26-15.37

 and yes, this answer the next question that is the difference between a lookaside cash and a look through cache

这也回答了下一个问题，即look-aside cache和look-through cache间的区别是什么

15.37-15.40

the fact the lookaside business is that

look-aside cache的作用是




15.40-15.44

the front end sort of looks asides to the cache to see if the data is there 

前端服务器会先查看数据是否存在于缓存中

15.44-15.44

and if it's not

如果该数据并没有放在缓存中

15.44-15.49

it makes its own arrangements for getting the data on a miss

它就会从数据库中获取未缓存的数据

15.49-15.59

 you know a look-through cache my forward request of the database and directly and handle the response 

你知道的，如果使用的是look-through cache，那么就好通过memcache将我的请求转发给数据库，让数据库来处理响应（知秋注：即memcache与数据库有交互）

15.59-16.00

now part of the reason for the popularity in memcache is that

memcache流行的部分原因是

16.00-16.02

it is a look-aside cache

它使用的是look-aside cache

16.02-16.13

that is completely neutral about whether there's a database or what's in the database or the relationship between stuff in memcache and what's the items in the database

让web服务器作为中间方来对memcache中的数据和数据库中的数据进行操作（知秋注：即memcache不直接与数据库进行交互，通过web服务器来和数据库进行交互）

16.13-16.15

all right 





16.15-16.19

so this is very popular arrangement very widely used

So，这是一种非常流行的架构，它被广泛使用

16.19-16.21

it's cost effective

它性价比很高

16.21-16.24

because memcache is so much faster in the database

因为memcache的速度要比数据库快得多




16.24-16.26

it's a bit complex

它有点复杂

16.26-16.31

every website that makes serious you so this faces the problem

所有网站都会遇上这种问题

16.31-16.33

 that if you don't do something

如果你什么也不做

16.33-16.39

 the data that's stored in the caches will get out of sync with the data in the database

缓存中所保存的数据会与数据库中所保存的数据失去同步

16.39-16.41

and so everybody has to have a story

So，每个人都会遇上这种问题

16.41-16.44

 for how to make sure that when you modify something in the database

即当你对数据库中的数据进行修改时



16.44-16.49

 you do something to memcache to 

你也会对memcache中的数据做些操作



16.49-16.54

you know take care of the fact that memcache may then be storing stale data that doesn't reflect the updates

你知道的，你所关心的是，memcache中保存的可能是过时的数据，它并没有将数据与数据库中的数据进行同步 





16.54-16.58

and a lot of this papers about what Facebook story is for that 

paper中所提到的更多是关于Facebook是怎么做的

16.58-16.59

although other people had other plans

虽然其他人会有其他的做法 




17.00-17.07

this arrangement‘s also  potentially a bit fragile

这种架构可能也有点脆弱

17.07-17.13

 it allows you to scale up to far more users than you could have gone with databases alone

比起单独使用数据库来说，这种架构能让你去应对更多的用户

17.13-17.15

because memcache is so fast 

因为memcache的速度非常快

17.15-17.16

but what that means is that 

这意味着



17.16-17.27

you're gonna end up with the system that's sustaining a load that's far far higher you know orders of magnitude higher than what the databases could handle

该系统所能承受的工作量远远高于数据库的处理能力



17.27-17.28

and thus

因此



17.28-17.30

 if anything goes wrong

如果有东西出现问题





17.30-17.30

for example

例如



17.30-17.33

if one of your memcache servers were to fail

如果其中一个memcache服务器出现了故障




17.33-17.35

And meaning that

这意味着



17.35-17.37

 the front ends would now have to contact the database

前端服务器得和数据库进行通信



17.37-17.38

Because they didn't hit

因为它们并没有命中缓存




17.38-17.41

they couldn't use this to store data

他们不会使用memcache来存储数据

17.41-17.44

you're gonna be increasing a load in the databases dramatically

这会大大增加对数据库的负荷



17.44-17.51

right because memcached you know supposing it has a you know hit rate of 99 percent or whatever it happens to be

假设，memcached的缓存命中率是99%



17.51-17.56

 you know memcache is gonna be absorbing almost all the reads

你知道的，memcache几乎可以处理所有的读操作



17.56-18.01

the database backends only going to be seeing a few percent of the total reads

后端数据库只会看到很小一部分读操作




18.01-18.07

so any failure here is gonna increase that few percent of the reads

So，在memcache处所发生的任何故障都会增加数据库那一侧所处理的读请求数量



18.07-18.09

to maybe you know I don't know 50 percent of the reads or whatever 

数据库所要处理的读请求量可能会变成总读请求量的50%



18.09-18.12

Which is a huge huge order of magnitude increase

这是一个巨大的数量级增长



18.12-18.16

so as Facebook does 

So，正如Facebook所做的那样



18.16-18.18

once you've got to rely on this caching layer 

一旦你不得不依赖缓存层的时候





18.18-18.25

You need to be set up pretty serious measures 

你需要做些严谨的措施



18.25-18.37

to make sure that you never expose the database layer to the full anything like the full load  that the caching layer is seeing

以确保你的数据库层永远不会暴露给缓存层所看到的所有负载

你要确保永远不会让数据库层暴露并承担所有请求负载（知秋注：即失去缓存层）



18.37-18.38

and you know you see in facebook

你知道Facebook是如何做的



18.38-18.46

they have quite a bit of thought put into making sure the databases don't ever see anything like the full load

他们思考了很多东西，以此来确保不会让数据库来处理所有的工作

18.46-18.47

okay

============================================================

18.47-18.51

so far this is generic 

目前为止，这些都是很基本的东西





18.51-19.01

now I want to sort of switch to a big picture of what Facebook describes in the paper for their overall architecture 

我想换张纸来画下这篇paper中所提到的Facebook的整体架构



19.01-19.04

 of course



19.04-19.05

they have lots of users 

他们拥有大量的用户

19.05-19.07

every user has a friend list

每个用户都有一个好友列表

19.07-19.10

 and status and posts and likes and photos 

状态、推文、点赞记录以及照片之类的东西

19.10-19.17

but Facebook's very easy oritented towards showing data to users

但Facebook面向的是向用户展示数据

19.17-19.22

 and a super important aspect of that is that

其中一个非常重要的方面在于

19.22-19.28

 fresh data is not absolutely necessary in that circumstance 

在这种情况下，我们不一定需要那些新鲜的数据

19.28-19.33

you know suppose the reads are you know due to caching 

你知道的，由于缓存的原因

19.33-19.37

supposed to reads yield data that's a few seconds out of date 

假设读操作所获取到的数据是几秒前的数据

19.37-19.40

so you're showing your users data not the very latest data

So，你向你用户所展示的数据并不是最新的数据

19.40-19.41

but the data from a few seconds ago

但你向用户展示的可能是几秒前的数据

19.41-19.48

 you know what the users are extremely unlikely to notice except in special cases 

除了特殊情况以外，用户基本不可能注意到他所看到的数据是过时的

19.48-19.53

right if I'm looking at a news feed of today's you know today's news 

如果我去看下今天推送的新闻

19.53-19.57

you know if I see the news from a few times ago versus the news from now

如果我看到的新闻是几小时前发布的，以及刚刚发布的那些新闻

如果我看到的是几个小时前的新闻，而不是刚刚发布的新闻



19.57-19.59

 a big deal 

这不算啥大问题

19.59-20.01

nobody's gonna notice nobody's gonna complain 

没有人会去注意，也没有人会去抱怨这点

20.01-20.03

you know that's not always true for all data

对于所有数据来说，这种做法不一定总是对的

20.03-20.09

but for a lot of the data that they have to deal with sort of super up-to-date consistency

但对于他们所要处理的很多数据而言，会要求很强的一致性

20.09-20.12

 in the sense of like linearizability is not actually important

对他们来说，像线性一致性之类东西实际上并不重要

20.12-20.14

 what is important is that

重要的地方在于

20.14-20.17

you don't cache stale data indefinitely

你不会无限期地缓存已经过时的数据

20.17-20.27

you know what they can't do is by mistake have some data that they're showing users that's from yesterday or last week or even an hour ago 

你知道的，他们不可以做的事情就是，向用户错误地展示昨天或者上周，甚至只是一个小时前的数据

20.27-20.30

those users really will start to notice that

用户就会注意到这种错误

20.30-20.36

 so they don't care about consistency like second-by-second 

So，用户不在意那种秒级的一致性

20.36-20.45

but they care a lot about not being in cannot chewing stale data from more than well more than a little while ago 

但他们不希望获取到的过时数据的数量比最新数据的数量还要多

20.45-20.52

the other situation in which they need to provide consistency is if a user updates their own data 

另一种他们需要提供一致性的情况是，如果用户更新了他们自己的数据

20.53-20.55

or if a user updates almost any data

或者说，一个用户更新了某个数据

20.55-20.59

 and then reads that same data that the human knows that they just updated

接着，他们读取了同一份数据，他们知道这部分数据他们刚刚更新过

20.59-21.05

it's extremely confusing for the user to see stale data if they know they just changed it

如果用户知道他们刚刚修改了数据，但他们看到的是过时的数据，这就让他们非常困惑



21.05-21.07

and So in that specific case

So，在这个例子中

21.07-21.16

the Facebook design is also careful to make sure that if a user changes data that that user will see the change data

在Facebook的设计中，他们也仔细地确保了，如果一个用户修改了数据，那么他就会看到修改后的数据

21.16-21.23

ok so Facebook has multiple data centers

So，Facebook拥有多个数据中心

21.23-21.25

which they call regions

他们将这些数据中心称为region（区域）

21.25-21.31

 and I think at the time this paper was written they had two regions

我觉得，他们在写这篇paper的时候，他们只有两个数据中心

21.31-21.36

their sort of primary region was on the west coast California

他们的主数据中心是在加利福尼亚的西海岸那里





五十二  阅举报
16-02
21.36-21.41

 and their sort of secondary region was in the East Coast 

他们的第二数据中心是在东海岸




21.41-21.46

and the two data centers look pretty similar 

这两个数据中心看起来很相似

21.46-21.54

each one of them has a  set of database servers running MySQL

每个数据中心都有一组运行着MySQL的数据库服务器

21.54-21.58

 the sharded date over these MySQL database servers

他们将拆分好的数据分散到运行着MySQL的数据库服务器上




21.58-22.03

they had a bunch of memcacheD servers

数据中心里有一堆memcacheD服务器

22.03-22.07

which we'll see they are actually arranged in independent clusters 

我们可以看到实际上这些memcacheD服务器是放在单独的集群中的




22.07-22.11

and then they had a bunch of front ends

然后，他们还有一堆前端服务器

22.11-22.16

again sort of a separate arrangement in each data center 

在每个数据中心里都有这样一个单独的布置

22.16-22.21

and there's a couple reasons for this 

这样做有两个原因

22.21-22.22

one  is that

第一个原因是

22.22-22.25

 their customers were scattered all over the country

他们的客户遍布全国

22.25-22.27

 and it's nice just for a performance 

对于性能方面来说，这很nice

22.27-22.30

that people on the East Coast can talk to a nearby data center

东海岸的用户可以和就近的数据中心进行通信

22.30-22.33

and people on the west coast can also talk to a nearby database center

西海岸的用户也可以和就近的数据中心进行通信

22.33-22.35

it just makes internet delays less 

这使得网络延迟变得更低

22.35-22.44

now the the data centers were not symmetric 

数据中心并不是对称的

22.44-22.46

each of them held a complete copy of all the data

每个数据中心都各自持有一份所有数据的完整副本

22.46-22.49

they didn't sort of shard the data across the data centers 

他们并没有基于数据中心的数量来对数据进行分片（而是根据数据中心内部数据库服务器的数量进行分片）

22.49-22.52

so the West Coast I think was a primary

So，我觉得西海岸的这个是主数据中心

22.52-22.55

and it sort of had the real copy of the data

它拥有该数据的真正副本

22.55-22.59

and the East Coast was a secondary

东海岸数据中心则是第二数据中心

22.59-23.01

 and what that really means is 

这意味着

23.01-23.07

that all writes had to be sent to the relevant database and the primary database Center

所有的写操作都得被发送到主数据中心中的相关数据库中进行处理




23.07-23.13

so you know any right gets sent you know here

So，你知道的，任何写操作都会发往这里

23.13-23.14

 and they use a feature of MySQL

他们利用了MySQL所提供的一个功能

23.14-23.26

they serve asynchronous log replication scheme to have each database in the primary region send every update to the corresponding database in secondary region

MySQL提供了一种异步日志复制的机制，以此来让主数据中心中的每个数据库将每次的更新操作发送到副数据中心中对应的数据库中

23.26-23.37

 so that with a lag of maybe even a few seconds， these database servers would have identical content， the secondary database servers would have identical content to the primaries

So，这样的话，延迟的时间只有几秒，副数据中心里的数据库服务器就会拥有和主数据中心里的数据库服务器一样的数据了

23.37-23.38

reads though were local

这些读操作都是在本地进行的

23.38-23.41

so these front ends when they need to find some data

So，当这些前端服务器需要读取些数据时

23.41-23.41

in general

一般情况下

23.41-23.45

 would talk to memcache in that data center

它们会去和数据中心中的memcache服务器进行通信

23.45-23.48

and if they missed in memcache they talked to 

如果它们所要读取的数据未能在它们所通信的memcache服务器中找到



23.48-23.51

the they'd read from the database in that same data center

它们就会从同一数据中心里的数据库中读取数据

23.51-23.58

um again though the databases are complete replicas

虽然数据库是完整的replica

这些数据库都有对应的replica

23.58-24.02

 all the data's on both of these data center, these in both of these regions

所有的数据都放在这两个数据中心中

这两个数据中心每一个都拥有着所有的数据




24.02-24.06

that's the overall picture

这就是该架构的总体架构图了

2406-24.22

 the next thing I want to talk about is a few details about how they use you know with this look-aside caching actually looks like

我接下来想讨论的就是关于他们使用look-aside cache的一些细节




24.22-24.32

so there's really reads and writes and this is just what's shown in Figure two 

So，Figure 2向我们展示了一些读和写操作

24.32-24.32

for a read

对于读操作来说




24.32-24.36

which is executing on a front-end

它是在前端服务器上执行的

24.36-24.38

 the first thing 

首先要讲的是

24.38-24.40

if you read any data that might be cached

如果你所读取的是任何可能被缓存的数据

24.40-24.43

the first thing that code in the front-end does is 

前端代码首先要做的事情是




24.43-24.47

makes this get library call with the key of the data they want 

调用库中所提供的get，并传入他们想要读取数据所对应的key

24.47-24.51

and get just generates an RPC to the relevant memcache server

调用这个get会生成一个RPC请求，并将该请求发送给相关的memcache服务器

24.51-25.03

so they hash this library routine hashes on the client hashes the key to pick the memcache server and sends an RPC to that memcache server

So，它们会对传入的这个key进行hash，以此来选择要进行通信的memcache服务器，并发送一个RPC请求给该memcache服务器

25.03-25.05

memcache server reply yes here's your data

memcache服务器会回复Yes，这是你要的数据

25.05-25.09

or maybe it'll point nil saying I don't have that data 

或者memcache服务器会说No，我上面并没有保存这个数据

25.09-25.11

it's not cached 

它并没有被缓存




25.11-25.17

so  if V is nil

So，如果V是nil的话




25.17-25.29

then the front-end will issue whatever SQL query is required to fetch the data from the database

那么前端服务器就会向数据库发送用来获取该数据的SQL查询

25.29-25.42

 and then make another RPC call the relevant memcache server to install the fetch data in the memcache server 

接着，它会将另一个RPC请求发送给相关的memcache服务器，并将获取到的数据放入这个memcache服务器

25.42-25.45

so this is just the routine I talked through before

So，这是我之前给你们讲过的常规操作



25.45-25.49

it's kind of what lookaside caching does

这就是look-aside cache所做的事情

25.49-25.50

and for write

对于写操作来说

25.50-25.56

you know

你知道的




25.56-26.01

 V is the writing we have a key and a value we wanna write

我们要往write中传入一个key和一个value

26.01-26.12

and so library routine on an each front end we're gonna send the the new data to the database

So，我们会让每个前端服务器将新数据发送给数据库

26.12-26.15

and you know I as I mentioned before

正如我之前提到的

26.15-26.16

the Key and the value may be a little bit different 

key和value可能有点不同

26.16-26.23

you know what's stored in the database is often in a somewhat different form from what's stored in memcache see 

你知道的，数据库中所保存的数据的形式可能和memcache中所保存的形式有所不同

26.23-26.25

but we'll imagine for now the same

但现在，我们假设数据库和memcache服务器中保存的数据形式是一样的

26.25-26.26

 and once the database has the new data

一旦数据库拿到了新的数据




26.26-26.35

then the write library routine sends an RPC to memcacheD telling it look you got to delete this key

接着，通过调用write操作来发送一个RPC请求给memcacheD，并告诉它请删除这个key所对应的数据

26.35-26.43

so I want to write the writer is invalidating the key in memcacheD 

writer会让memcacheD中与这个key所对应的数据失效

26.43-26.45

you know what that means is that 

这意味着

26.45-26.52

the next front-end that tries to read that key from memcacheD is gonna get nil back

下一个试着从memcacheD中读取该key的前端服务器所拿到的是nil

26.52-26.53

because it's no longer cached

因为它不再放在缓存中了

26.53-26.58

 and will fetch the updated value from the database and install it into memcacheD

它会从数据库中获取更新后的值，并将它放入memcacheD中

26.58-27.01

all right 



27.01-27.03

so this is an invalidation scheme 

So，这就是失效策略（invalidation scheme）

27.03-27.04

in particular

特别是

27.04-27.09

it's not you could imagine a scheme that would send the new data to memcacheD at this point

你可以想象下有一种策略，此时它会将新数据发送给memcacheD

27.09-27.12

but it doesn't actually do that  instead of delete it

但实际上，它并不会将该数据删除

27.12-27.18

 and actually in the context of facebook scheme

实际上，在Facebook所使用的策略中




27.18-27.22

the real reason why this delete is needed is

我们需要这个delete操作的真正原因是

27.22-27.26

so that front-ends will see their own writes

前端服务器会看到它们发出的写请求所更新的结果

27.26-27.27

 because in fact

事实上

27.27-27.29

 in their scheme

在他们的策略中

27.29-27.33

 the memcache the MySQL server the database servers also send deletes

数据库服务器也会给memcache服务器发送delete操作

27.33-27.37

any the front end writes something in the database 

当任意前端服务器往数据库中写入数据时



27.37-27.46

the database with the mcsqueal mechanism the paper mentions well send the relevant deletes to the memcache servers that might hold this key 

正如paper中提到的，（具备mcsqueal机制）数据库会将相关的delete操作发送给持有该key数据的memcache服务器



27.46-27.53

so the database servers will actually invalidate stuff in memcache by-and-bye may take them a while 

So，数据库服务器会让memcache中保存的数据失效，这些操作需要花一点时间才能完成

27.53-27.55

um but because that might take a while

因为这些操作需要花一些时间才能完成

27.55-27.58

the front ends also delete the key said

前端服务器也会删除这些key相关的数据，并说

27.58-28.06

 that a front end won't see a stale value for data that it just updated

前端服务器不会看到它刚刚更新过的数据的以前的值

前端服务器在它刚刚更新过这个数据后，它不会看到该数据以前的值

28.06-28.12

okay



28.12-28.24

So that's all sort of the background of this is pretty much how everybody uses memcacheD

So，这就是大家平时使用memcacheD的方式

28.24-28.25

 there's nothing yet really very special here

这里并没有什么特别的东西

28.25-28.33

 now eventually you know the paper is all about on the surface all about solving consistency problems 

你知道的，这篇paper所讲的内容主要是关于解决一致性问题的

28.33-28.35

and indeed those are important

确实，这些内容很重要

28.35-28.41

 but the reason why they got where they ran into those consistency problems is 

但他们遇上一致性问题的原因是

28.41-28.49

in large part because they you know modify the design or set up a design that had extremely high performance

很大程度上是因为，他们所做的系统设计要拥有非常高的性能

28.49-28.50

because they had extremely high load 

因为他们要处理的工作量非常高

28.50-28.52

and say they were desperate to get performance 

他们渴望获得高性能

28.52-29.02

and kind of struggled along behind the performance improvements in order to retain a reasonable level of consistency

并且为了保持合理的一致性而在性能提升背后苦苦挣扎

29.02-29.04

and because the performance kind of came first for them

因为对他们来说，性能第一

29.04-29.15

I'm actually going to talk about their performance architecture before talking about how they fix the consistency

在去讨论他们如何搞定一致性问题前，我会先讨论下他们的架构性能

29.15-29.18

okay 



29.18-29.21

sorry there's been a bunch of questions here that I haven't seen

抱歉，我刚刚没看到你们提的这些问题

29.21-29.24

 let me take a peek

让我来看下你们提的问题

29.24-29.27

 okay 



29.27-29.29

so one question 

So，其中一个问题是

29.29-29.38

this means that the replicated updates from the primary MySQL database to the secondary must also issue deletes to ......

当我们把对主MySQL数据库所做的更新操作复制到副数据库时，副数据库是否也要向memcache服务器发送delete操作

29.38-29.42

 yeah so this is I think a reference to the previous architecture slide

So，我觉得这和上一个架构图有关

29.42-29.45

 the observation is that yes indeed

我们的结论是Yes

29.45-29.49

 when a front-end sends a write to the database server 

当一个前端服务器发送了一个write操作给数据库服务器

29.49-29.51

database server updates its data on disk 

数据库服务器会更新它保存在磁盘上的数据

29.51-30.03

and it will send an invalidate a delete to whatever memcache server there is in the local region the local data center that might have had the key that was just updated

它会向本地数据中心里保存着刚刚更新过的这个key所对应数据的memcache服务器发送一个用于数据失效的delete操作

30.03-30.14

 the database server also sends a sort of representation of the update to the corresponding database server in the other region which process it applies the write to its data on disk

数据库服务器也会向其他数据中心中与它相对应的那个数据库服务器发送这个更新操作，它会对磁盘上的数据执行这个写操作

30.14-30.26

it also using mcsqueal  sort of log reading apparatus figures out which memcache server might hold the key that was just updated

它会去使用mcsqueal机制来读取日志，以此弄清楚哪个memcache服务器可能持有着刚刚更新过的这个key所对应的旧数据

30.26-30.30

and sends it delete also to that memcache server 

并将这个delete操作发送给这个memcache服务器

30.30-30.38

so that the if it's the key is cached， is invalidated in in both data centers

So，如果这个key被缓存在memcache服务器中，那么通过这个delete操作，这两个数据中心中的memcache服务器中这个数据就会失效

30.38-30.39

 okay 



30.39-30.46

so another question what would happen if we delete first in the right and then send to the database

So，另一个问题是，在我们执行write操作时，如果我们先执行delete，再将数据发送给数据库时，这会发生什么






30.46-30.52

so that's or with reference to this thing here

So，我们来看下此处的代码

30.52-31.00

 would what if we did delete first you know if you do delete first

如果你先执行delete操作

31.00-31.03

 then you're increasing the chances that some other clients 

那么你就会增加其他client的机会（知秋注：这句直接忽略即可）




31.03-31.09

so supposing you delete and then send to database

So，假设你先进行delete操作，然后再将要写入的数据发送给数据库








31.11-31.12

right in here

此处

31.12-31.14

 if another client reads that same key 

如果有另一个client读取了同一个key所对应的数据




31.14-31.15

they're gonna miss at this point

此时就会发生缓存未命中的情况

31.15-31.19

 they're gonna fetch the old data from the database 

它们会从数据库中接收到旧数据

31.19-31.22

and they're gonna then insert it memcache 

接着，它们会将该数据插入memcache

31.22-31.27

and then you're going to update it leaving memcache for a while at least with stale data

接着，当你去更新这个数据时，memcache中的过时数据还会被保留一段时间

31.27-31.30

 and then if this the writing client reads it again

接着，如果这个进行写操作的client再次读取了这个数据

31.30-31.31

 it may see the stale data 

它可能会看到过时的数据

31.31-31.32

even though it just updated it 

即使它刚刚更新了这个数据

31.32-31.35

doing the delete second um

这里我们在第二步的时候执行了delete操作




31.35-31.42

you know these over the possibility that somebody will read during this period of time and see stale data 

你知道的，有人可能会在这段时间内读取数据，他们所看到的数据都是过时的

31.42-31.44

but they're not worried about stale data

但它们并不担心看到的是过时数据

31.44-31.51

 in general they're really most worried in this context about clients reading their own writes 

总的来讲，在这个情况下，他们最关心的是client读取它们自己所做的写操作的值

31.51-31.52

so on balance 

So，总的来说

31.52-31.55

even though there's a consistency problem by the way

虽然这里存在着一致性问题




31.55-32.02

 I'm doing the delete second ensures that clients will read their own writes

我这里第二步所做的delete操作是为了确保client能读取到它们自己写操作所更新后的值



32.03-32.03

in either case

不管在哪种情况下

32.03-32.12

 eventually the database server as I'm just mentioned will send a delete for the written keys

正如我所提到的，数据库服务器最终会将一个与写入key相关的delete操作发送给memcache

32.12-32.25

another question I'm confused on how writing the new value shows stale data

我所困惑的另一个问题是，我们更新了数据，但展示的还是旧数据

32.25-32.30

but deleting doesn't

但delete操作不是这样

32.30-32.37

 let me see

让我想一下

32.37-32.42

 I'm not really sure what the question is asking

我不确定这个问题要问的是什么




32.42-32.48

the if it's with reference to this code

我们来看下这段代码

32.48-32.50

once the writes done

一旦这个write操作执行完毕

32.50-32.53

 okay maybe the question is 

Ok，这个问题可能想表达的意思是这样的

32.54-32.55

it's really we didn't do delete at all

我们根本不用执行delete操作

32.55-33.03

 so that when a client，front end did or wanted to update data

So，当前端服务器想去更新数据时

33.03-33.08

would just tell the database， but not explicitly delete the data from memcache 

它会和数据库进行通信，但它不会从memcache中将这个数据进行显式删除

33.08-33.11

the problem with this is that 

这样做的问题在于




33.17-33.18

if the client sent this write to the database 

如果client将这个写操作发送给了数据库

33.18-33.20

and then immediately read the same data

接着，它又马上读取了这个数据（知秋注：比如异步读取）

33.20-33.23

 that read would come out of the memcache 

它所读取的值是来自memcache的

33.23-33.26

and because memcache still has the old data

因为memcache上保存的依然是老的数据

33.26-33.28

you know memcache hasn't seen this write yet 

你知道的，memcache还未见到这个写操作




33.29-33.31

a client that updated some data and then read it 

假设一个client刚更新了某个数据，接着去读取这个数据

33.31-33.33

you know updates it in the database

你知道的，它对数据库中该数据进行了更新

33.33-33.36

 but it reads the data if the stale data from memcache

但它是从memcache中进行读取，它拿到的就是过时数据

33.36-33.39

and then a client might update some data but still see the old data

即一个client可能对某个数据进行了更新，但它看到的依然是老数据

33.39-33.42

 and if you delete it from memcache

如果你将这个过时数据从memcache中删除

33.42-33.45

then if you do do this delete 

如果你进行了这个delete操作

33.45-33.50

then a client that writes some data and deletes it from memcache

如果一个client对数据库中这个数据进行更新，并将它从memcache中删除

33.50-33.51

and then reads it again

接着，它再去读取这个数据

33.51-33.52

it'll miss in memcache 

它无法在memcache中找到这个数据（缓存未命中）




33.52-33.53

because of the delete

因为这里我们执行了delete操作

33.53-33.56

 and they  have to go to the database and read the data 

它们就得去数据库中读取这个数据

33.56-33.57

and the database will give it fresh data 

数据库就会将最新的数据返回给它

33.57-34.03

okay so the question is

Ok，问题是






34.03-34.07

how come why do we delete here

我们这里为什么要进行delete操作呢？




34.07-34.21

gosh why don't we just instead of this delete have the client just directly since it knows the new data just send a set RPC to memcacheD

因为client已经知道了新数据，为什么我们不让它直接发一个set RPC给memcache呢，而是使用一个delete操作呢？

34.21-34.24

and this is a good question

这是一个好问题

34.24-34.28

and so here we're doing I have an invalidate scheme 

So，这里我们使用了一个失效策略（invalidate scheme）

34.26-34.30

this would often be called an update scheme 

这通常也被叫做更新策略（update scheme）

34.30-34.36

and let me try to cook up an example

我来给你们看个例子




34.36-34.40

 that shows that while this could probably be made to work 

这可能可以使它奏效

34.40-34.47

this update scheme it doesn't work out of the box 

这种更新策略并不是那种开箱即用的东西

34.47-34.50

and you wouldn't you need to do some careful design in order to make it work

你需要做一些仔细的设计才能使它正常工作

34.50-34.53

so this wasn't client wants supposing now we have two clients

So，假设我们现在有两个client

34.53-35.00

reading and writing the same key interleaved 

它们会对同一个key所对应的数据以交错的形式进行读和写操作




35.00-35.15

so let's say client one tells the database you know sends X plus plus to the database right

So，假设Client 1向数据库发送了x++这条命令

35.15-35.16

 just incrementing X 

即增加x的值

35.16-35.18

and then of course 

Of Course




35.18-35.24

or let me say it's going to increment X from zero to one 

这里我们稍微改下，我们把x值从0变成1

35.24-35.25

so set X to one 

So，我们将x的值设置为1

35.25-35.27

and then after that 

接着，在此之后

35.27-35.39

client one is going to call set of our key which is X and the value one  and write that at the memcacheD

Client 1会调用set命令，它往里面传入x和它的值1，并将结果写入memcacheD

35.39-35.44

supposing meanwhile client two also wants to increment X 

假设，此时Client 2也想增加x的值




35.44-35.48

so it's going to read this latest value in the database

So，它会从数据库中读取最新的值

35.48-35.52

and almost certainly these are in fact transactions

几乎可以肯定的是，这里用到了事务

35.52-35.54

so what if we were doing increment 

So，如果我们增加x的值

35.54-35.59

what client want to be sending would be some sort of increment transaction on the database for correctness

为保证正确性，Client就会将一个用于增加x值的事务发送给数据库

36.00-36.01

 because the database does support transactions 

因为数据库支持事务

36.01-36.03

so we're going to imagine

So，想象一下




36.03-36.05

 the client 2 increments the value of x to 2

假设Client 2将x的值设置到2




36.05-36.08

 sends that increment to the database

它将这条增加指令发送给了数据库

36.08-36.11

 and client two also is going to do this set 

Client 2也会去执行这个set操作




36.11-36.14

so it's going to set X to be two

So，它会将x设置为2

36.14-36.20

 but now what we're left with is the value of one in memcacheD

但现在memcacheD中x的值是1

36.20-36.22

even though the correct values in the database is 2

虽然数据库中正确的值是2

36.22-36.27

 which is to say if we do this update was set 

如果我们使用这个set操作来更新数据

36.27-36.29

even though it does save us some time right 

虽然它确实能节省我们一段时间

36.29-36.32

cuz now we're saving somebody a miss in the future

因为我们避免了以后有人请求这个数据时缓存未命中的情况

36.32-36.34

because we directly set instead of delete

因为我们直接使用了set，而不是delete

36.34-36.39

 we also run the risk if it's popular data of leaving stale data in the database

但我们会冒着这种风险，即数据库中热门数据的值是过时的（知秋注：因为网络的因素，set（x,1）可能比set（x,2）要后执行，所以会产生过时垃圾数据）

36.39-36.45

 it's not that you couldn't get this to work somehow 

你不能让这种事情发生

36.45-36.50

but it does require some careful thought to fix this problem

但这需要仔细思考才能解决这个问题

36.50-36.55

 all right 



36.55-36.59

so that was why they use invalidate and instead of update

So，这就是他们使用失效策略而不是去使用更新策略的原因了



==========================================




36.59-37.04

 okay so I was going to about performance

Ok，接下来，我要讲下性能方面的东西

37.04-37.14

this sort of route of how they get performance is through parallel parallelization parallel execution 

他们是通过并行执行来做到高性能的

37.14-37.22

and for a storage system just at a high level there's really two ways that you can get a good performance

对于存储系统来说，从高级层面来讲，你可以通过两种途径来获得不错的性能

37.22-37.24

one is by partition

其中一种是通过分区



37.24-37.27

which is sharding

即对数据进行分片

37.27-37.33

that is you take your data and you split it up over you know into ten pieces over ten servers 

即你对你的数据进行拆分，并分散到10台服务器上

37.33-37.35

and those ten servers can run independently hopefully 

我们希望这10台服务器可以独立运行

37.35-37.41

 the other way you can use extra hardware to get higher performance despite replication

另一种方式就是，虽然你使用了replication（复制），但你可以使用额外的硬件来获取更高的性能

37.41-37.48

at is have more than one copy of the data 

你可以对数据制作多个副本

37.48-37.51

and you kind of for a given amount of hardware 

对于给定数量的硬件

37.51-37.58

you can kind of choose whether to partition your data or replicate it in order to use that hardware

你可以选择将你的数据进行分区或者对你的数据进行复制，以此来使用你的硬件

37.58-38.12

and there's you know from memcache see what we're talking about here is is splitting the data over the available memcache servers by hashing the key 

我们这里所讨论的是，我们通过对key进行hash来讲我们的数据拆分到可用的memcache服务器上

38.12-38.15

so that every key sort of lives on one memcache server 

So，每个key所对应的数据会被存放在一个memcache服务器上

38.15-38.18

and from memcache what we would be talking about here is

关于memcache，我们这里所要讨论的是

38.18-38.23

having each front-end just talk to a single memcache server 

我们会让每个前端服务器只和一个memcache服务器进行通信

38.23-38.24

and send all its requests there 

并将该前端服务器的所有请求都发送给对应的memcache服务器

38.24-38.31

so that each memcache server serves only a subset of the front-ends and sort of serves all their needs

So，每个memcache服务器只需为一部分前端服务器提供服务，并处理它们的请求

38.31-38.38

and Facebook actually uses a combination of both partition and replication

实际上，Facebook将分区和复制这两种技术结合起来使用

38.38-38.43

for partition，the things that are in its favor

Facebook会根据一些偏好来对数据进行分区




38.43-38.44

one is that it's memory efficient

其中一点是内存效率

38.44-38.50

because you only store a single copy of each item a bit

因为你只保存每个item的一份副本

38.50-38.51

where's in replication

然而，使用复制的话

38.51-38.59

you're gonna store every piece of data maybe on every server 

你会在每台服务器上都保存该数据的一个副本

38.59-39.02

on the sort of downside partition is that

分区的缺点在于

39.02-39.07

it's as long as your keys are sort of equally roughly equally popular， works pretty well

如果你的key所对应的数据的使用频率都差不多一样热门，那么分区就能很好地工作

39.07-39.11

 but if there's some hot a few hot keys，

但如果有一些key所对应的数据很热门的话

39.11-39.17

partition doesn't really help you much， once you get those partition enough that those hot keys are on different servers

尽管你将这些热门key所对应的数据分散到不同服务器上时，但分区并不会对你有太多帮助

39.17-39.22

you know once the if there's a single hot key for example， no amount of partitioning helps you

假设这里有一个key所对应的数据很热门，那么不管你怎么分区，都没法帮到你

39.22-39.30

because no matter of how much you partition that hot key is still sitting on just one server

因为不管你分区的数量有多少，该热门key所对应的数据依然放在一台服务器上

39.30-39.37

the problem partition is that

分区问题指的是

39.37-39.44

 it doesn't mean that the front if front ends need to use lots of data lots of different keys 

如果前端服务器需要使用大量的数据，这些数据对应的key并不相同

39.44-39.48

it means in the end each front-end is probably going to talk to lots of partitions

这意味着，每个前端服务器可能要和大量的分区进行通信




39.48-39.54

 and at least if you use protocols like TCP that keep state

至少，如果你使用的是TCP之类的协议，它会去保持状态

39.54-40.07

there's significant overhead to as you add more and more sort of N squared communication

当你的通信数量越来越多时，这种开销就会非常明显

40.07-40.10

 for a replication，it's fantastic

复制，它太棒了

40.10-40.16

if your problem is that a few keys are popular 

如果你遇上的问题是，只有一些key所对应的数据是比较常用的

40.16-40.19

because now you know you're making replicas of those those hotkeys

你知道的，因为你对这些热门key制作了对应的replica

40.19-40.22

 and you can serve each replica the same key in parallel

那么你就可以向每个replica并行提供同一key所对应的数据

40.22-40.24

 it's good

这很棒

40.24-40.29

 because there's fewer this there's not n squared communication

因为这里建立的通信数量要小于N^2

40.29-40.31

 each front-end maybe only talks to one memcache server 

每个前端服务器可能只和一个memcache服务器进行通信




40.31-40.38

but the bad thing is

但糟糕的地方在于

40.38-40.40

there's a copy of data in every server 

每个服务器上都留有一份数据副本

40.40-40.48

you can cache far fewer distinct data items with replication then with partition

你可以通过复制，接着结合分区来缓存更少的不同data item




40.48-40.53

so there's less total data can be stored 

So，每个服务器要保存的总数据量就会变得更少

40.53-41.03

so these are just generic for pros and cons of these two main ways of using extra hardware to get higher performance 

So，这就是通过这两种途径使用额外的硬件来获得更高性能时的一些利弊











三十七  阅举报
16-03
41.03-41.16

alright so I want to talk a bit about there when one sort of context in which they use partition and replication is at the level of different regions 

So，我想谈一下他们在不同区域中使用分区和复制的情况（知秋注：每一个区域就是一个数据中心）

41.16-41.32

so I just want to talk through why it is that they decided to have separate regions and kind of separate complete data center with all the data in each of the regions

So，我想讨论下为什么他们会在每个数据中心保存所有数据，每个数据中心间是彼此独立的

41.32-41.35

so I before I do that，there's a question 

So，在我讨论这个东西之前，这里有一个问题要讲

41.35-41.39

why can't we cache the same amount of data with replication

为什么我们不能缓存（使用replication时）相同的数据量

为什么我们在使用replication时，不能去缓存相同的数据量

41.39-41.40

ok 



41.40-41.43

So supposing you have 10 machines

So，假设你有10台机器

41.43-41.45

each with a gigabyte of RAM

每台机器的内存都是1G

41.45-41.53

 and you can use these 10 machines each with a gigabyte of RAM for either replication or in a partitioning scheme

你可以将这10台内存1G的机器用于复制或者分区策略

41.53-41.55

 if you use a partitioning scheme 

如果你使用的是分区策略

41.55-41.59

where each server stores different data from the other servers

每台服务器所保存的数据都各不相同

41.59-42.07

that you can store a total of 10 gigabytes of distinct data objects on your 10 servers each with a gigabyte of RAM

那么，你就可以在这10台服务器（每台服务器的内存为1Gb）上保存总共10Gb大小的不同数据对象



42.07-42.08

so with partition

So，在使用分区的情况下

42.08-42.11

 you know each byte of ram is used for different data

内存中的每个byte都是用来保存不同的数据

42.11-42.17

 so you can look at the total amount of RAM you have that's how much distinct data you know different data items you can store

So，你可以去看下你所拥有的总内存量，这就是你所能保存的不同数据的总量

42.17-42.18

with replication

如果使用的是复制策略

42.18-42.23

 you know assuming your users are more or less looking at the same stuff

假设你的用户有可能都会去查看同一个数据

42.23-42.36

each cache replicas will end up storing roughly the same stuff as all the other caches 

每个cache replica最终会保存和其他cache replica上大致相同的内容



42.36-42.38

so you have 10 gigabytes of RAM still  and your 10 machines

So，假设你依然有10台机器，每台机器的内存都是1Gb

42.38-42.43

but each of those machines stores roughly the same data

但每台机器上所保存的内容都大致相同

42.43-42.49

 so would you end up with this 10 copies of the same gigabyte of items

So，最终你会得到10份同样大小的数据副本

42.49-42.51

so in  this particular example

So，在这个例子中

42.51-42.52

if you use replication

如果你使用的是复制策略

42.52-42.55

 you storing attempt as many distinct data items

你会去尝试保存尽可能多的不同data item

42.55-42.58

 and you know that may actually be a good idea 

你知道的，实际上这可能是个不错的想法

42.58-43.03

depending on you know sort of way your data is like

这取决于你数据长啥样

43.03-43.08

 but it does mean that replication gives you less total data that's cached

但这意味着，如果你使用复制，那么你可缓存的总数据量就会变少

43.08-43.15

and you know you can see  there's points in the paper word that they mention  this tension

在paper中，你们可以看到他们提出了几点内容

43.15-43.19

nominally they don't come down on one side of the other 

从名义上来讲，他们不会偏向任何一边

43.19-43.21

because they use both replication and sharding

因为复制和数据分片这两项技术，他们都使用了

43.21-43.25

 okay 



43.25-43.33

so the highest level at which they're playing this game is between regions

So，从最高层面来看，他们是在不同区域间使用这种技巧的

43.33-43.36

 and at this high level

从高级层面来看

43.36-43.38

 each region has a complete replica of all the data 

每个区域中都有一份关于所有数据的完整副本

43.38-43.39

right



43.39-43.42

they have a each region as a complete set of database servers 

每个区域中，他们都有一组完整的数据库服务器

43.42-43.46

each database corresponding database servers for the same data

每个数据库所对应的数据库服务器都保存着相同的数据

43.46-43.49

 and assuming users are looking at more or less the same stuff

假设用户会去查看同一份数据

43.49-43.50

that means

这意味着

43.50-44.01

the memcache servers in the different regions are also storing more or less basically replicating where we have yours replicating in both the database servers and the memcache servers

简单来讲，你要对数据库服务器和memcache服务器中的内容都进行复制

你要对不同区域内的memcache服务器中的内容或多或少会重逢都进行复制（知秋注：每个区域内的用户访问偏好不同，那该区域数据中心memcache中缓存的内容也不同）

不同区域内的memcache服务器中的内容或多或少会重复，而此时，我们要对数据库服务器和memcache服务器中的内容都进行复制（知秋注：每个区域内的用户访问偏好不同，那该区域数据中心memcache中缓存的内容也不同，当然两个数据中心间数据库中的数据是相同的）

44.01-44.13

 and the point again one point is to you want a complete copy of the site that's close to West Coast users in the internet load early in the internet 

此时你想让西海岸用户能够尽快加载该站点的一份完整副本

44.13-44.20

and another copy of the complete website this close to users on the East Coast close on the internet again

该网站的另一份副本则靠近东海岸的用户

44.20-44.23

 and the Internet's pretty fast 

我们的网速是很快的

44.23-44.28

but coast to coast is you know 50 milliseconds or something

但从东海岸到西海岸的延迟可能是50毫秒左右

44.28-44.33

 which if you do if users have to wait too many 50 millisecond intervals

如果用户不得不等待很多个50毫秒这样的时间间隔

44.33-44.35

 they'll start to notice that amount of time 

他们就会开始注意到这段等待时间

44.35-44.37

another reason is that

另一个理由是

44.37-*44.46

the you wanna a reason to replicate the data between the two regions is that 

之所以在两个区域间复制数据的原因是




44.46-44.56

these front ends to even create a single web page for user requests often dozens or hundreds of distinct data items from the cache or the databases

每当这些前端服务器要为用户创建一个页面时，它们通常会从缓存或者数据库中请求数十或上百个不同的data item

44.56-45.07

 and so the speed the latency the delay at which a front-end can fetch these hundreds of items from  from the memcacheD is quite important

So，前端服务器从memcache中获取这数百个item所造成的延迟就相当关键

45.07-45.16

 and so it's extremely important to have the front and only talk to only read local memcache servers and local databases

So，他们让前端服务器只从当地的memcache服务器和数据库中获取数据，这点非常关键

45.16-45.20

 so that you can do the hundreds of queries it needs to do for a web page very rapidly

So，这样你就可以很快速地完成该页面所需的这数百个查询

45.20-45.24

so if we have partitioned the data between the two regions

So，如果我们在这两个区域间数据进行拆分

45.20-45.31

 then a front-end you know if I'm looking at my friends and some of my friends are on the East Coast and some on the west coast

接着，如果我去查看我的好友列表，其中一部分好友是在东海岸，另一部分是在西海岸

45.31-45.31

 that means

这意味着

45.31-45.32

if we partitioned

如果我们对数据进行分区

45.32-45.38

 that would might require the front ends to actually make many requests 

这就可以会需要让前端去发起多个请求

45.38-45.42

you know 50 milliseconds each to the other data center 

你知道的，向另一个数据中心发送请求并得到想要需要花50毫秒

45.42-45.50

and users would see this kind of latency and be very upset 

用户会注意到这种延迟，用户会为此非常烦恼

45.50-45.53

so the reason to another reason to replicate is 

So，使用复制的另一个理由是

45.53-45.58

to keep the front ends always close to the data to all the data they need 

让前端服务器始终能尽可能靠近它们所需要的数据

45.58-46.00

of course



46.00-46.01

this makes writes more expensive

这使得写操作的成本变得更高

46.01-46.01

 because now

因为现在

46.01-46.06

if a front-end in the secondary region needs to write ，send the data all the way across the internet

如果这个前端服务器是位于第二数据中心，它需要去执行写操作时，它就得通过网络将数据发送给第一数据中心

46.06-46.10

the reads are far far more frequent than write

执行读操作的频率要远远高于写操作

46.10-46.12

so it's a good trade-off

So，从设计上来讲，这是一种很好的取舍

46.12-46.15

 although the paper doesn't mention it 

虽然paper并没有提到这一点

46.15-46.21

it's possible that another reason for complete replication between the two sites

对两个数据中心的数据进行完全复制的另一个原因是

46.21-46.24

so that if the primary site goes down

如果主数据中心挂掉了

46.24-46.27

 perhaps they could switch the whole operation to the secondary site

那么，他们可能会将所有操作交由副数据中心来处理

46.27-46.30

but I don't know if they had that in mind

但我不知道他们有没有这样做

46.30-46.36

okay



46.36-46.43

so this is the story between regions is basically a story of replication between the two data centers

So，简单来讲，这就是这俩数据中心间关于复制这方面所发生的事情

46.43-46.49

all right 



46.49-46.54

now within a data center within a region 

现在我们要来讲在一个数据中心中所发生的事情




46.54-47.00

so in each region

So，在每个数据中心中




47.00-47.04

there's a single set of database servers

他们都放了一组数据库服务器

47.04-47.09

so at the database level

So，从数据库层面来讲

47.09-47.13

the data is sharded

数据被分好了片

47.13-47.15

and not replicated inside each region

并且，在每个数据中心中，我们并没有对它们进行复制

47.15-47.19

 however at the memcache level

但是，从memcache的层面来讲

47.19-47.21

they actually use replication as well as sharding

实际上，它们既使用了复制，也使用了数据分片

47.21-47.23

so they had this notion of clusters

So，他们就有了一个关于集群的概念

47.23-47.31

 so a given regions actually supports multiple clusters of front-ends and database servers

So，在一个给定的区域，它实际上是支持拥有多个（前端服务器和数据库服务器的）集群




47.31-47.33

 so here I'm going to have two clusters in this region

So，在这个区域中，我会有2个集群




47.33-47.39

 this cluster has a you know a bunch of front ends and a bunch of memcache servers 

这个集群中包含了一堆前端服务器以及memcache服务器




47.39-47.46

and these are completely independent almost completely independent 

这两个集群几乎是完全独立的

47.46-47.52

so that a front-end in cluster one sends all its reads to the local memcache servers 

So，集群1中的某个前端服务器将它所有的读操作发送给本地（该集群内）的memcache服务器

47.52-47.53

and misses

此时，并没有命中缓存

47.53-47.55

 it needs to go to the one set of database servers 

它就得需要去其中一个数据库服务器组中获取数据

47.55-47.56

and similarly

类似地




47.56-48.06

each front-end in this cluster talks only to memcache servers in the same cluster 

该集群中的每个前端服务器只会和该集群下的memcache服务器进行通信

48.06-48.12

so why do they have this multiple clusters 

So，他们为什么要使用多集群呢？

48.12-48.22

why not just have you know essentially a single cluster a single set of front end servers and a single set of memcache server is shared by all those front ends 

为什么他们不使用单集群呢？该集群下有一组前端服务器以及所有前端服务器所共享的一组memcache服务器

48.22-48.23

one is that 

其中一个原因是

48.23-48.24

if you did that 

如果你这样做的话

48.24-48.26

and and that would mean 

这就意味着

48.26-48.33

you know if you need to scale up capacity you sort of be adding more and more memcache servers in front ends to the same cluster 

你知道的，如果你需要去提高处理能力，即往同一个集群中添加更多的其他memcache服务器以及前端服务器

48.33-48.40

you don't get any win therefore in performance for popular Keys

从性能上来说，这种方式对于那些热门key所对应的数据并没有什么提升

48.40-48.48

 you know so there the data sort of this memcache service is sort of a mix you know most of it is maybe only used by a small number of users 

对于memcache中所保存的大部分数据来说，它们只被很小一部分用户使用

48.48-48.51

but there's some stuff there that lots and lots of users need to look at

但对于某些数据来说，很多用户都会去查看它们

48.51-48.54

and by using replication as well as sharding

通过使用复制和数据分片

48.54-48.58

 they get you know multiple copies of the very popular keys

他们就会得到那些热门key所对应数据的多份副本

48.58-49.05

 and therefore they get sort of parallel serving of those keys between the different clusters

因此，他们就可以将这些key所对应的数据并行提供给不同的集群

49.05-49.14

 another reason to not want to increase the size of the cluster individual cluster too much is that 

我们另一个不想去让单个集群的大小变得太大的原因是

49.14-49.21

all the data within a cluster is spread over partitioned over all the memcache servers 

该集群内所有的数据都会被拆分到所有的memcache服务器上

49.21-49.29

and any one front end is typically actually going to need data from probably every single memcache server eventually 

通常，任意前端服务器可能会从每个memcache服务器上获取它们所需要的数据

49.29-49.31

and so this means

So，这意味着

49.31-49.35

 you have a sort of n-squared communication pattern between the front ends and the memcache servers 

在前端服务器和memcache服务器间，你会拥有N^2个通信连接

49.35-49.46

and to the extent that they're using TCP for the communication that involves a lot of overhead， a lot of sort of connection state for all the different TCP 

他们使用TCP来进行通信，这会产生大量的性能开销以及要去维护所有不同TCP连接的大量状态



49.46-49.48

so they wanted to limit

So，他们想对此进行限制

49.48-49.55

 so you know this is N squared TCP's

So，这里会有N^2个TCP连接

49.55-49.56

 they want to limit the growth of this

他们想限制这种增长

49.56-49.59

 and the way to do that is to make sure that no one cluster gets to be too big 

他们的解决方法就是不让任何集群的体积变得过大

49.59-50.02

so this N squared doesn't get too large

So，这样的话，这个数字就不会变得太大

50.02-50.13

and well related to that is 

Well，与之相关的是

50.13-50.16

this in caste congestion business they're talking about

在他们所讨论的这种繁忙业务中

50.16-50.19

 the if a frontend needs data from lots of memcache servers

如果某个前端服务器要从很多memcache服务器中获取数据

50.19-50.24

 it's actually it's gonna send out the requests more or less all at the same time 

实际上，它同时要发出很多个请求

50.24-50.25

and that means

这意味着

50.25-50.30

 this front-end is gonna get the responses from all the memcache servers to query it more or less the same time 

这个前端服务器会在同一时间收到所有memcache服务器所返回的响应

50.30-50.34

and that may mean dozens or hundreds of packets arriving here all at the same time

这意味着，在同一时间，它会收到数十或者数百个数据包

50.34-50.35

 which if you're not careful 

如果你不小心的话

50.35-50.37

we'll cause packet losses  that's in caste congestion

在繁忙的情况下。这会导致数据包丢失的情况发生

50.37-50.43

 and in order to limit how bad that was

为了限制这种糟糕的事情发生

50.43-50.45

that you had a bunch of techniques they talked about

你可以使用他们所谈论的一系列技术来解决这种问题




50.45-50.48

 but one of them was not making the clusters too large

其中一点就是不让集群变得太大

50.48-50.56

so that the number of memcache has given front-end tend to talk to and they might be contributing to the same cluster never got to be too large 

So，不要让同一个集群内前端服务器所通信的memcache服务器的数量过多，使得集群大小变得太大（知秋注：即分片数量要合理）

50.56-51.00

and a final reason the paper mentions is

这篇paper所提到的最后一个原因是

51.00-51.04

 that it's or behind this is is a big network in the data center

在数据中心存在着一个巨大的网络

51.04-51.15

 and it's hard to build networks that are both fast like many bits per second and can talk to lots and lots of different computers

要构建出那种网速很快，并且能和很多不同机器进行通信的网络是很难的

51.15-51.18

and by splitting the data center up into these clusters 

通过将数据中心拆分为这些集群

51.18-51.22

and having most of the communication go on just within each cluster

并让大部分通信都在每个集群内部进行处理

51.22-51.22

 that means 

这意味着

51.22-51.30

they need a smaller they need you know a modest size fast Network for this cluster  and a modest size you know reasonably fast network for this cluster

他们需要在这个集群中要有一个规模适中且速度很快的网络环境

51.30-51.38

but they don't have to build a single network that can sort of handle all of the traffic between among all the computers of the giant cluster 

但他们无须去构建一个能够处理大型集群中所有机器间通信的网络环境

51.38-51.43

so it limits how expensive underlying network is

So，这样就限制了基础网络所带来的成本

51.43-51.44

 on the other hand

另一方面

51.44-51.45

of course



51.45-51.47

they're replicating the data in the two clusters 

在这两个集群中，他们对数据进行了复制

51.47-51.51

and for items that aren't very popular

对于那些不怎么热门的数据来说

51.51-51.57

 and aren't really going to benefit from the performance win of having multiple copies

它们不会享受到（由多个副本所带来的）这种性能上的提升

51.57-52.00

 this it's wasteful to sit on all this RAM

将这种数据放在内存中是一种浪费

52.00-52.02

 and you know we're talking about hundreds or thousands of servers 

你知道的，我们所讨论的规模是成百上千台服务器这样的

52.02-52.07

so the amount of money they spent on RAM for the memcache servers is no joke

So，不开玩笑的说，他们在memcache服务器内存这块的花费真的很大

52.07-52.19

so in addition to the pool of memcache servers inside each cluster， there's also this regional pool of memcache servers

So，除了每个集群内的memcache服务器池以外，这里还会有一个放着memcache服务器的regional pool

52.19-52.23

 that's shared by all the clusters in a region

它会被该区域中所有集群所共享




52.23-52.26

and into this regional pool

在这个regional pool中




52.26-52.30

they then modify the software on the front end 

接着，当他们对前端服务器上的软件进行修改时

52.30-52.37

so that the software on the front end knows aha this key the data for this key actually not use that often

So，前端服务器上所运行的软件知道这个key所对应的数据的使用频率并不高

52.37-52.41

 instead of storing it on a memcache server my own cluster 

那么我就不会将这些数据保存在我集群中的memcache服务器里

52.41-52.50

I'm going to store this not very popular key in the appropriate memcache server of the regional pool 

而是将这些不是很热门的数据放在这个regional pool中合适的memcache服务器上




52.50-52.57

so this is the regional pool 

So，这个是regional pool

52.57-53.05

and this is just sort of an admission that some data is not popular enough to want to have lots of replicas of it

因为某些数据不够热门，所以我们就不想去对它们使用那么多相关数据副本了

53.05-53.08

 they can save money by only caching a single copy

他们只需缓存一个副本即可，这样能节省他们的成本

53.08-53.12

 all right



53.12-53.23

so that's how they get that's this kind of replication versus partitioning strategy they use inside each inside each region

So，这就是他们在每个区域中所使用的复制和分区策略

53.23-53.27

 a difficulty they had that they discuss is that 

他们所讨论的一个难点在于

53.27-53.32

when they want to create a new cluster in a data center

当他们想在一个数据中心中创建一个新集群时

53.32-53.37

they actually have a sort of temporary performance problem as they're getting that cluster going

当他们运行这个集群时，实际上，他们会遇上某种临时性的性能问题

53.37-53.46

 so you know supposing they decide to install you know couple hundred machines to be a new cluster with the front end new front ends new memcache servers

So，假设他们决定在一个集群中放入两百台机器来运行前端服务器和memcache服务器

53.46-53.48

and then they fire it up

接着，他们启动了这个集群

53.48-53.52

and you know maybe cause half the users to start using the new cluster

你知道的，这可能会将一半用户的流量导向这个新集群

53.52-53.54

 I'm gonna have to use the old cluster well 

我同时也会使用那个旧集群




53.54-53.58

in the beginning there's nothing in these memcache servers 

在一开始，这个集群中的memcache服务器里什么数据也没有

53.58-54.04

and all the front end servers are gonna miss on the memcache servers and have to go to the databases

所有前端服务器都会遇上缓存未命中的情况，它们就得去数据库中获取数据

54.04-54.11

and at least at the beginning until these memcache service gets populated with all the sort of data that's used a lot 

至少从这个新集群开始运行后，直到这些memcache服务器中填入了那些大量使用的数据

54.11-54.14

this is gonna increase the load on the database servers 

在这段时间内，这会增加数据库服务器的处理压力

54.14-54.15

absolutely enormous leap 

对于数据库服务器来说，它所承受的压力会变得非常大

54.15-54.18

because before we added the new clusters

因为在我们添加新集群之前

54.18-54.21

 maybe the database servers only saw one percent of the reads

数据库服务器可能只需要处理1%的读请求

54.21-54.26

 because maybe these memcache servers have a hit rate of say 99 percent for reads

对于读请求来说，这些memcache服务器的缓存命中率是99%

54.26-54.31

 the only one percent of all that means go to the database servers， before we added the new cluster

在我们添加新集群之前，可能只有1%的读请求会交由数据库服务器来进行处理

54.31-54.35

 if we add a new cluster with nothing in the memcache servers

如果我们添加了一个新集群，并且该集群中的memcache服务器里没有缓存任何数据

54.35-54.36

 and send half the traffic to it

然后，我们将一半的流量导向了这个新集群

54.36-54.39

 it's gonna get a hundred percent miss rate initially

那么一开始的缓存未命中率就是100%

54.39-54.44

right and so that'll mean you know

So，这就意味着

54.44-54.48

 we gone from and so the overall miss rate will now be 50 percent 

So，整体的缓存未命中率就是50%

54.48-54.55

so we've gone from these database servers serving one percent of the reads to them serving 50 percent of the reads

So，数据库服务器所要处理的读请求量就从原来总体的1%变成了50%

54.55-54.58

 so at least in this imaginary example

So，至少在这个例子中

54.58-55.00

 we've been quite firing up this new cluster

我们启动了这个新集群

55.00-55.03

 we may increase the load on the databases by a factor of 50 

我们可能会将数据库所要承受的压力提高到50倍

55.03-55.13

and chances are the database servers were running you know reasonably cost the capacity and certainly not a factor of 50 under capacity

你知道的，数据库服务器所要承受的压力可能并不会增加到50倍那么高

55.13-55.19

 and so this would be the absolute end of the world，if they just fired up a new cluster like that

如果他们像这样去启动一个新集群，那么对他们来说，这绝对是世界末日

55.19-55.21

 and so instead

相反

55.21-55.27

 they have this cold start idea

他们使用了一种cold start的思想

55.27-55.36

in which a new cluster is sort of marked by some flag somewhere as being in this cold start state

当新集群处于cold start状态时，我们会给它做一个标记




55.36-55.37

 and in that situation

在这种情况下

55.37-55.42

when a front end in the new cluster misses 

当新集群中的前端服务器遇到缓存未命中的情况

55.42-55.47

that actually first first it has its own local memcache

首先，前端服务器会去访问该集群本地的memcache服务器

55.47-55.49

 if that says no I don't have the data

如果该memcache服务器表示它上面没有前端服务器所要的这个数据

55.49-55.56

 then the front end we'll ask the corresponding memcache in another cluster in some warm cluster that already has the data for the data

那么前端服务器就会跑去另一个集群中对应的memcache服务器那里获取数据

55.56-55.58

if it's popular data 

如果这是热门数据

55.58-55.59

chances are it'll be cached

并且它被缓存了

55.59-56.02

 my front end will get its data

我的前端服务器就会拿到数据

56.02-56.06

 and then it will install it in the local memcache

接着，它会将该数据放入它所在集群中的本地memcache服务器中

56.06-56.12

 and it's only if both local memcache and the warm memcache don't have the data 

只有当本地memcache服务器，以及warm memcache服务器中没有它所要的数据时

56.12-*56.16

that this is front end in the new cluster will read from the database servers 

新集群中的这个前端服务器才会从数据库服务器中读取数据

56.16-56.23

and so they run in this kind of cold mode for a little while

So，他们会在这种cold mode下运行一段时间

56.23-56.31

the paper I think mentions a couple hours until the memcache servers source and the new clusters start to have all the popular data 

我觉得这个过程会持续一两个小时左右，直到新集群中的memcache服务器中缓存了所有热门数据为止



56.31-56.37

and then they can turn off this cold feature and just use the local cluster memcache alone

然后，他们就可以关闭这种cold mode，直接独立使用该集群本地的memcache服务器即可

56.37-56.41

all right

===========================================================================

56.41-56.48

so another load problem that the paper talks about

So，这篇paper所谈论的另一个负载问题是

56.48-56.58

 if they ran into and this is a load problem again deriving from this kind of look aside caching strategies is called the thundering herd

这个负载问题是由look-aside cache所衍生出的，它叫做惊群问题




56.58-57.07

and the the scenario is that

情景是这样的




57.07-57.15

 supposing we have some piece of data there's lotsa memcache servers but there's some piece of data stored on this memcache server 

假设memcache服务器上保存着一些数据

57.15-57.18

there's a whole bunch of front ends

这里有一堆前端服务器

57.18-57.24

 that are ordinarily reading that one piece of very popular data

它们通常会去读取一些很热门的数据

57.24-57.27

 so they're all sending constantly sending get requests for that data 

So，它们会发送get请求来从memcache中获取这些数据




57.27-57.29

the memcache server has it in the cache

如果memcache中保存着这些数据

57.29-57.30

it answers them

它就会对这些前端服务器进行响应

57.30-57.35

 and you know their memcache servers can serve like millions 2 million requests per second so 

你知道的，这些memcache服务器每秒可以处理一百万或两百万个请求



57.35-57.37

we're doing pretty good 

我们干得真棒

57.37-57.39

and of course 






57.39-57.42

there's some database server sitting back here that has the real copy of that data

在这些memcache服务器后面还放着一些数据库服务器，它们里面保存着这些数据的真正副本

57.42-57.43

but we're not bothering it 

但我们不用去管这些数据

57.43-57.44

because it is cached 

因为它们被缓存在memcache中了

57.44-57.50

well suppose some front-end comes along and modifies this very popular data 

假设某个前端服务器要去修改这些非常热门的数据

57.50-57.52

so it's going to send a write to the database with the new data 

So，它会将要写入的数据以及这个写操作发送给数据库




57.52-57.58

and then it's gonna send a delete to the memcache server

然后，它将delete操作发送给memcache服务器

57.58-57.59

 because that's the way writes work

因为这就是写操作的执行过程

57.59-58.01

 so now we've just deleted this extremely popular data

So，现在我们已经从memcache服务器中删除了这个非常热门的数据




58.01-58.05

we have all these front ends constantly sending gets for that data 

所有这些前端服务器会经常发送get请求来获取这个热门数据

58.05-58.09

they're all gonna miss all at the same time

此时，它们都会遇上缓存未命中的情况

58.09-58.20

 they're all gonna now having missed send a read request to the front end database all at the same time

在同一时间，它们都会发送一个读操作给数据库来获取该数据




58.20-58.25

and so now this front-end database is faced with maybe dozens or hundreds of simultaneous requests for this data

So，现在这个数据库就会面临数十或者数百个同时请求该数据的请求

58.25-58.27

 so the loads here is gonna be pretty high

So，此时数据库要处理的工作量就会变得非常大

58.27-58.31

and it's particularly disappointing

这令人相当失望

58.31-58.34

because we know that all these requests are for the same key 

因为我们知道，所有这些请求都是针对同一个key所对应的数据

58.34-58.51

so the database is going to do the same work over and over again to respond with the latest written copy of that key until finally the front ends get around to installing the new key in memcache and then people start hitting again 

So，数据库服务器会反复做相同的工作，即将该key所对应的最新数据副本返回给前端服务器，直到它们将这些key所对应的新数据放入memcache中为止，然后人们又开始新一轮查看新数据

58.51-58.54

and so this is the Thundering herd

So，这就是惊群效应（Thundering herd）





三十五  阅举报
16-04
58.54-59.02

 what we'd really like is a single you know if a miss if there's a write and the leads and a miss happens in memcache 

如果memcache发生缓存未命中的情况

59.02-59.05

we'd like what we'd like is

我们想要做到的是

59.05-59.07

the for the first front end that misses to fetch the data and install it 

当第一个前端服务器从memcache中请求数据发生缓存未命中的情况时，它会从数据库中获取数据，并放入memcache

59.07-59.12

and for the other front ends just like take a deep breath then wait until the new data is cached 

对于请求该数据的其他前端服务器来说，它们就得等待该数据被缓存到memcache中，再去获取它



59.12-59.16

and that's just what their design does

这就是他们所做的设计




59.16-59.21

 if you look at the if this thing called LEASE

如果你去看下有个叫做LEASE的东西

59.21-59.26

which is different from the LEASE were used to

它和我们以前讲过的LEASE并不相同

59.26-59.28

 but they call LEASE

但它们都叫做LEASE

59.28-59.31

 and we start from scratch in the scenario again

我们从这个场景开始讲起




59.31-59.36

 let's see so now suppose we have a popular piece of data

假设我们现在有一份非常热门的数据

59.36-59.49

 the first front end that asks for a data that's missing memcache Devo will send back an error saying， oh no I don't have the data in my cache but it will install LEASE

第一个前端服务器会先去询问memcache中是否存在这个数据，接着，memcache返回一个错误，并说：Oh，我缓存中并没有这个数据，但我会给你一个LEASE




59.49-59.52

which is a bit unique number 

它是一个有点独特的数据

59.52-59.56

it'll pick a lease number install it in a table

它会选一个lease号，并将它放入一张表中

59.56-59.59

 and the send this lease token back to the front end 

并将这个lease token返回给前端服务器

59.59-1.00.04

and then other front ends that come in and ask for the same key

然后，当其他前端服务器也来访问这个key所对应的数据时




1.00.04-1.00.08

they'll simply get a just be asked to wait 

memcache服务器会告诉它们，你们得等一下

1.00.08-1.00.13

you know a quarter of a second or whatever some reasonable amount of time by the memcacheD 

它们可能会等待0.25秒，具体等待时间由memcacheD来决定

1.00.13-1.00.17

because the memcacheD will see a haha I've already issued the lease for that key

因为memcacheD会看到，aha，我已经为这个key颁发了对应的lease

1.00.17-1.00.24

now there's at least potentially a lease key， the server will notice it's already issued at least for the can tell these ones to wait 

memcache服务器会注意到它已经颁发了该key所对应的lease，并告诉这些前端服务器你们要等一等

1.00.24-1.00.27

so only one of the server's gets the lease 

So，只有其中一个前端服务器会拿到这个lease




1.00.27-1.00.31

this server then asks for the data from the database 

接着，这个服务器会从数据库中请求这个数据

1.00.31-1.00.35

when you get the responds back

当你收到响应后




1.00.35-1.00.44

then it sends the put for the new data with a key and the value of get and the lease proved 

接着，它会发送一个put操作给memcache服务器，它里面携带了key、value以及lease

1.00.44-1.00.46

that it was the one who was allowed to write the data 

我们通过lease来表明它具备写入数据的权限

1.00.46-1.00.48

memcache people looking for lease today 

memcache会去查看下这个lease

1.00.48-1.00.53!!!!!

aha yeah you are the the person whose lease was granted and it'll actually do the install

并说，你所拿着的lease赋予了你写入数据的权限，接着，memcache服务器就会将数据插入缓存

1.00.53-1.00.58

by and by these other frontends who are told the wait will reissue their reads 

memcache服务器会告诉其他前端服务器，你们稍等一下，之后重新发起你们的读请求

1.00.58-1.01.00

now that it will be there 

现在，它们就能读取到缓存中的这个数据了

1.01.00-1.01.02

and so we all if all goes well

So，如果这一切照常进行

1.01.02-1.01.06

 get just one request to the database instead of dozens or hundreds

那么你只需向数据库发送一个请求来获取数据即可，而不是数十或者数百个请求

1.01.06-1.01.14

 and I think it's the sense in which is the lease is if the front-end fails at an awkward moment 

我觉得如果前端服务器在某一个尴尬的时刻发生了故障

1.01.14-1.01.19

and doesn't actually request the data from the database or doesn't get around it installing it memcache

即它并没有向数据库请求数据，或者并没有将数据插入memcache缓存

1.01.19-1.01.21

eventually memcacheD will delete the lease

那么，memcache最终会删除这个lease

1.01.21-1.01.22

 cuz it times out 

因为它超时了

1.01.22-1.01.26

and the next front end to ask will get a new lease

接着，下一个访问memcache的前端服务器会拿到一个新的lease

1.01.26-1.01.29

 and will hope that it will talk to the database and install new data

我们希望它会和数据库进行通信，并往memcache中插入新的数据

1.01.29-1.01.33

 so yes they answer the question

So，这个问题的答案是Yes

1.01.33-1.01.35

the lease does up a time out 

这个lease超时了

1.01.35-1.01.37

in case the first front end fails

在这种情况下，第一个前端服务器从数据库中获取数据时就失败了

1.01.37-1.01.38

 yes yes

就是这样

1.01.38-1.01.40

okay



1.01.40-1.01.46

so these leases are the their solution to the Thundering Herd problem

So，这些lease就是用来解决它们的惊群问题（Thundering Herd problem）

1.01.46-1.01.49

 um another problem they have is

他们所遇到的另一个问题是

1.01.49-1.01.52

 that if one of these memcache servers fails 

如果其中一个memcache服务器发生了故障

1.01.52-1.01.57

the most natural you-know-whats if they don't do anything special

你知道的，如果他们没有做什么特别的事情

1.01.57-1.01.59

 if the memcache server fails

如果memcache服务器发生了故障

1.01.59-1.02.00

 the front ends will send a request

当前端服务器向memcache服务器发送一个请求时

1.02.00-1.02.06

they'll get back a timeout and network will say jeez that you know I couldn't contact that host never got a response

它们就会遇上网络超时，并说：我无法和主机进行通信，并且无法收到任何响应

1.02.06-1.02.20

and what the real library software does is

这个软件库所做的事情是

1.02.20-1.02.12

 it then sends requests the database 

它会将请求发送给数据库来进行处理

1.02.12-1.02.14

so if a memcache server fails 

So，如果一个memcache服务器发生了故障

1.02.14-1.02.15

and we don't do anything special

并且我们也没有做什么特别处理

1.02.15-1.02.21

 the database is now going to be exposed directly to the reads all of these memcache server  was serving

数据库就会暴露在这些原本交由memcache所处理的读请求之下

1.02.21-1.02.25

this is the memcache server may well have been serving you know a million reads per second 

memcache服务器每秒钟可能会处理一百万个读请求



1.02.25-1.02.27

that may mean that

这可能意味着

1.02.27-1.02.31

 the database server would be then exposed to those million reads per second

数据库服务器可能就会被暴露在每秒数百万读请求的轰击之下

1.02.31-1.02.36

 then it's nowhere near fast enough to deal with all those reads

它的处理能力远远不足以处理这所有的读请求

1.02.36-1.02.40

 now Facebook they don't really talk about in the paper

Facebook并没有在这篇paper中讨论这一点

1.02.40-1.02.44

 but they do have automated machinery to replace a failed memcache server

但他们使用了一种自动化机制来替换发生故障的memcache服务器

1.02.44-1.02.56

 but that takes a while to sort of set up a new server a new memcache server and redirect all the front-end to the new server instead of the old server

但要设置一台新的memcache服务器，并将所有请求服务器的请求都重新导向这个新的memcache服务器处，这需要花一定时间

1.02.56-1.02.57

 so in the meantime

So，与此同时

1.02.57-1.02.59

they need a sort of temporary solution 

他们需要一种临时解决方案

1.02.59-1.03.01

and that's this gutter idea

即引入Gutter Server的思想

1.03.01-1.03.07

 so let's say the scoop is that 

So，假设这里的情况是这样的

1.03.07-1.03.09

we have our front ends

我们有一堆前端服务器

1.03.09-1.03.14

 we have the sort of ordinary set of memcache servers

我们有一组memcache服务器




1.03.14-1.03.20

the database 

这里是数据库

1.03.20-1.03.22

the one of the memcache service has failed

如果其中一个memcache服务器出现了故障

1.03.22-1.03.29

 we're kind of waiting until the automatic memcache server replacement system replaces this memcache server

我们得等待自动替换系统将这个发生故障的memcache服务器给替换掉

1.03.29-1.03.30

 in the meantime

与此同时

1.03.30-1.03.32

front ends are sending requests to it 

前端服务器向这个发生故障的memcache服务器发送请求

1.03.32-1.03.36

they get a sort of server did not respond error from the network

它们会接收到一个服务器不响应的错误




1.03.36-1.03.44

 and then there's a presumably small set of gutter servers

然后，这里会有一组gutter server

1.03.44-1.03.57

whose only purpose in life is to eye they must be idle except when a real memcache server fails

除了在memcache服务器出现故障的情况下，不然这些Gutter Server都处于闲置状态

1.03.57-1.04.02

 and when the frontend gets an error back saying that get couldn't contact the memcache server

当前端服务器收到一个错误，并说它们无法和memcache服务器进行通信




1.04.02-1.04.06

it'll send the same request to one of the gutter servers

它会将相同请求再发给其中一个Gutter Server

1.04.06-1.04.12

 and though the paper doesn't say， I imagine that the front end will again hash the key in order to choose which gutter server to talk to

虽然paper中并没有说，但我可以想象得出，前端服务器会对key进行hash以此来选择它要和哪个Gutter Server进行通信

1.04.12-1.04.18

and if the gutter server has the value，that's great

如果这个Gutter Server上保存着对应的数据，那这太棒了

1.04.18-1.04.19

otherwise 

否则

1.04.19-1.04.23

the front end server will contact the database server to read the value 

前端服务器就会和数据库服务器进行通信来读取数据

1.04.23-1.04.27

and then install it in the memcache server

并将该数据放入memcache服务器

1.04.27-1.04.29

 in case somebody else answer asks for the same data

万一其他人也去获取相同的数据，那就可以直接从memcache服务器处获取了

1.04.29-1.04.30

so while this means server is down

So，当memcache服务器发生了宕机

1.04.30-1.04.38

 the gutter servers will  basically handle its request 

简单来讲，这些Gutter Server就会去处理原本由这个memcache服务器所处理的请求

1.04.39-1.04.39

and so they'll be a miss

So，这里会发生缓存未命中的情况



1.04.39-1.04.42

 you know handled by lease leases the Thundering Herd

可能出现的惊群问题会由lease机制来解决

1.04.42-1.04.47

they'll be at least I need a Miss on each of the items that was a no-fail memcache server

如果在一个正常运转的memcache服务器上发生缓存未命中的情况

1.04.47-1.04.50

 so there will be some load in the database server

So，这会给数据库服务器带来一些工作量

1.04.50-1.04.59

 but then hopefully quickly this memcache server will I get all the data that's listen use and provide good service 

但我们希望这个memcache服务器会拿到所有需要用到的数据，并提供良好的服务

1.04.59-1.05.00

and then by and by 

接着

1.05.00-1.05.02

this will be replaced

这个发生故障的memcache服务器就会被替换掉

1.05.02-1.05.04

 and then the frontend will know to talk to a different replacement server

然后，前端服务器就会知道它们要去和一个不同的替换服务器进行通信




1.05.04-1.05.09

 and because they don't and this is today's question

今天有一个问题是这样的

1.05.09-1.05.14

I think that they don't send deletes to these gutter servers 

我觉得前端服务器不会将delete操作发送给这些Gutter Server

1.05.14-1.05.21

because since a gutter server could have taken over for anyone and maybe more than one of the ordinary memcache service

因为Gutter Server可以去接手一个或多个已经挂掉的memcache服务所处理的请求

1.05.21-1.05.26

 it could actually have cache the caching any key

实际上，它可以去缓存任何key所对应的数据

1.05.26-1.05.30

so that would mean that 

So，这意味着

1.05.30-1.05.32

and there may be you know frontends talking to it 

你知道的，可能会有前端服务器和它进行通信

1.05.32-1.05.34

that would mean that 

这意味着

1.05.34-1.05.37

whenever a front-end needs it to delete a key from memcache

当一个前端服务器需要从memcache中删除一个key所对应的数据时

1.05.37-1.05.44

or when the mcsqueal on the database sends a delete for any key to the relevant memcache server

或者数据库中的mcsqueal发送了一个delete操作给保存着某个key相关数据的memcache服务器




1.05.44-1.05.52

 yeah you know the the natural design would be that it would also send a copy of that delete to every one of the gutter servers 

你知道的，在这种设计中，它也会将这个delete操作的副本发送给每一个Gutter Server

1.05.52-1.05.56

and the same for front ends that are deleting data

对于要执行删除数据操作的前端服务器来说，也是同样如此

1.05.56-1.05.57

they would delete from the memcache servers

它们会将数据从memcache服务器中删除

1.05.57-1.06.02

but they would also delete potentially from any gutter server

它们也得从Gutter Server中删除这些数据

1.06.02-1.06.06

 that would double the amount of delete that had to be sent around 

这会使必须要发送的delete操作的数量增加一倍

1.06.06-1.06.10

even though most of the time these gutter servers aren't doing anything and don't cache anything  and it doesn't matter 

虽然大多数时候Gutter Server什么事也不做，也不缓存任何数据，所以它没啥关系

1.06.10-1.06.13

and so in order to avoid all these extra deletes

So，为了避免所有这些额外的delete操作

1.06.13-1.06.17

 they actually fix the gutter servers 

实际上，他们对Gutter Server进行了一些处理

1.06.17-1.06.25

so that they delete Keys very rapidly instead of hanging on to them until they're explicitly deleted

So，这样他们就能快速删除这些key的相关数据，而不是等到显式删除它们的时候才去删除

1.06.25-1.06.28

 that was answer to the question 

这就是这个问题的答案

1.06.28-1.06.32

all right

==========================================================

1.06.32-1.06.36

 so I wanna talk a bit about consistency

So，我想来讨论下一致性方面的内容

1.06.36-1.06.40

all this at a super high level

从一个很高的层面来讲

1.06.40-1.06.47

 you know the consistency problem is that there's lots of copies of the data

你知道的，一致性问题在于这里的数据存在着很多个副本

1.06.47-1.06.48

 for any given piece of data

对于任何给定数据来说

1.06.48-1.06.51

 you know there's a copy in the primary database

在主数据库中保存着它的一份副本

1.06.51-1.06.56

 there's a copy in the corresponding database server of each of the secondary regions 

在副数据中心的相关数据库服务器中也存有着它的副本

1.06.56-1.07.05

there's a copy of that key in each local cluster in one of the memcache keys in each local cluster

在每个本地集群中的memcache服务器里也存有着它的副本

1.07.05-1.07.08

 there may be copies of that key and the gutter servers 

在Gutter Server中可能也会留有它的副本

1.07.08-1.07.14

and there may be copies of the key in the memcache servers and the gutter memcache servers at each other region

在其他区域中的memcache服务器和Gutter Server上可能也保存这该key所对应的数据副本

1.07.14-1.07.18

so we have lots and lots of copies of every piece of data running around

So，我们每处运行的每个数据都存在着大量的副本

1.07.18-1.07.19

when a write comes in

当有一个写操作传入的时候

1.07.19-1.07.24

 you know the stuff has to happen on all those copies 

你知道的，这个写操作要应用到相关数据的所有这些副本上

1.07.24-1.07.25

and furthermore

此外

1.07.25-1.07.27

 the writes may come from multiple sources

这些写操作可能来源于多个地方

1.07.27-1.07.31

 the same key may be written at the same time by multiple front ends 

在同一时间，可能会有多个前端服务器对同一个key所对应的数据进行写入

1.07.31-1.07.33

and this region may be by frontends from other regions too

这些写操作可能来自于这个区域的前端服务器，也可能是来自其他区域的前端服务器

1.07.33-1.07.44

and so it's this concurrency and multiple copies and sort of multiple sources of writes since there's multiple front ends

由于并发、多副本以及来自多个前端服务器所做的写操作等原因

1.07.44-1.07.54

it creates a lot of opportunity for not just for there to be stale data but for stale data to be left in the system for long periods of time

这就会导致让过时的数据停留在系统中很长一段时间

1.07.54-1.08.03

 and so I want to illustrate what are those problems

So，我想解释下这些问题是什么

1.08.03-1.08.11

 actually in a sense we've already talked a bit about this  somebody asked why the front ends don't update why do they delete instead of updating 

实际上，有人在问为什么前端服务器使用的是delete操作而不是update的时候，我们对此讨论过一点

1.08.11-1.08.16

so that's certainly one instance of the kind of weather multiple sources of data 

So，这是因为多个数据源所导致的

1.08.16-1.08.20

and so we have trouble enforcing correct order 

So，我们在执行正确操作顺序的时候遇上了问题

1.08.20-1.08.27

but here's another example of a race an update race

这里我们来看个关于update race的案例（知秋注：即并发更新操作所产生的问题）

1.08.27-1.08.34

 that if they hadn't done something about，it would have left data indefinitely stale data and definitely in memcache

如果它们还未执行完操作，那么memcache中的数据肯定是过时的数据




1.08.34-1.08.39

it's going to be a similar flavor to the previous example 

这和前一个例子有点相似




1.08.39-1.08.52

so supposing we have client one， he wants to read a key but memcache says it doesn't have the data

So，假设我们这里有个Client 1，它想去读取某个key所对应的数据，但memcache表示它里面并没有这些数据



1.08.52-1.08.52

it's a Miss

此时它遇上了缓存未命中的情况




1.08.52-1.09.00

so C one's gonna read the data from the database

So，C1就会从数据库中读取数据




1.09.00-1.09.09

 and let's say it gets back some value that value 1

假设它取回的值是v1

1.09.09-1.09.11

meanwhile

与此同时

1.09.11-1.09.14

 client 2 wants to update this data 

C2想对该数据进行更新




1.09.14-1.09.23

so it sends you know its writes key equals v2 and sends that to the database

So，C2会将要修改的数据（v2）传入这个write操作，并发送给数据库

1.09.23-1.09.29

and then you know the rule for writes the code for writes that we saw is

你知道的，我们所看到的write的相关代码是这样的

1.09.29-1.09.32

 that the next thing we do is delete it from the database from memcache d

我们要做的另一件事情就是将原来的数据从memcache中删除

1.09.32-1.09.39

C2 is going to delete the key from the database

C2会将该key所对应的数据从数据库中删除

1.09.39-1.09.39

 oh that's safe right

这样做是安全的

1.09.39-1.09.43

 you know it was actually c2 doesn't really know what's in memcache d

你知道的，实际上，C2并不清楚memcache中有什么数据

1.09.43-1.09.45

but the delete was ever there is always safe 

但使用delete操作始终是正确的

1.09.45-1.09.52

because certainly not gonna cause a stale data to be， deleting won't cause to be stale data

因为delete操作不会导致过时数据的出现

1.09.52-1.09.57

 and this is the sense that the paper claims that delete is idempotent

paper中说过delete操作是幂等的

1.09.57-1.10.00

 said delete it's always safe to delete

所以使用delete始终是安全的

1.10.00-1.10.05

 but if you recall the pseudocode for what a read does 

但如果你回顾下之前看的跟读操作有关的那些伪代码

1.10.05-1.10.06

if you miss 

如果你遇上缓存未命中的情况

1.10.06-1.10.08

and you read the data from the database

那你就会从数据库中读取数据

1.10.08-1.10.10

 you're supposed to just insert that data into memcache

接着，你会将读取到的数据插入memcache中




1.10.10-1.10.20

 so client 1 you know may have been slow and finally gets around to sending a set RPC to memcache

So，假设C1的速度比较慢，它会发送一个set RPC给memcache服务器




1.10.20-1.10.21

but it read version 1 

它之前所读取到的是版本1时的值

1.10.21-1.10.26

and read a you know what is now an old outdated version of the data from the database

你知道的，它所读取到的是数据库中该数据已经过时的值了




1.10.26-1.10.34

 but it's going to set that into set this into memcache 

但它将这个值放入了memcache中

1.10.34-1.10.36

and yeah you know one other thing that happened is that 

这里所发生的另一件事情就是

1.10.36-1.10.40

we know the database is is whenever you write something in database

当你要往数据库中写入数据时

1.10.40-1.10.42

that sends deletes to memcacheD

数据库会往memcache中发送delete操作




1.10.42-1.10.50

so of course maybe at this point the database will also have sent a delete for k to memcache

So，此时，数据库会发送一个delete(k)操作给memcache



1.10.50-1.10.52

and so now we get 2 deletes

So，现在我们就会发送2个delete操作

1.10.52-1.10.52

 but it doesn't really matter right

但这并没有关系

1.10.52-1.10.57

these delete may already have happened by the time client one gets around to updating this key

当C1去更新该key所对应的数据时，这些delete操作可能就已经执行完了

1.10.57-1.11.00

and so at this point

So，此时

1.11.00-1.11.07

indefinitely the memcache will be caching a stale version of of this data

memcache缓存的一直是该数据的过时版本

1.11.07-1.11.13

and there's just no mechanism anymore or this is them if the system worked in just this way

如果系统是以这种方式工作的

1.11.13-1.11.21

there's no mechanism for the memcache to ever see to ever get the actual correct value

那么没有任何机制能让memcache拿到的是正确的值

1.11.21-1.11.25

it's gonna store and serve up stale data for key K forever

它所保存并向前端服务器提供的（与k相关的）数据始终是过时的

1.11.25-1.11.30

because they ran into this 

因为他们是以这种方式运行的

1.11.30-1.11.38

and while they're okay with data being somewhat out-of-date， they're not okay with data being out of date forever

对于他们来说，数据过时一会儿是ok的，但如果提供的始终是过时的数据，那么这就不ok了

1.11.38-1.11.40

because users will eventually notice that they're seeing ancient data 

因为用户最终会注意到他们所看到的数据是过时的

1.11.40-1.11.43

and so they had to solve this 

So，他们得解决这个问题




1.11.43-1.11.47

they had to make sure that this scenario didn't happen

他们得确保这种场景不会发生

1.11.47-1.11.53

they actually solved this this problem also with the lease mechanism 

他们实际上通过这种lease机制解决了这个问题




1.11.53-1.11.57

at the same lease mechanism that we describe for the Thundering herd

即我们在讨论惊群问题时所讨论过的lease机制

1.11.57-1.12.03

although there's an extension to the lease mechanism that makes this work

他们是通过对lease机制进行扩展，才解决了这个问题

1.12.03-1.12.04

so what happens is that

So，这里所发生的事情是

1.12.04-1.12.09

when memcache sends back a miss indication seeing the data wasn't in the cache

当memcache告诉我们，缓存中没有我们要的数据时（缓存未命中）

1.12.09-1.12.10

it's gonna grant the lease

它就会颁发lease

1.12.10-1.12.14

 so we get the Miss indication plus this lease

So，我们就会拿到这个miss指示，以及这个lease

1.12.14-1.12.18

which is basically just a big unique number

简单来讲，它是一个很大的数字，并且它是唯一的

1.12.18-1.12.23

and the memcache server is gonna remember that the association between this lease and this key 

memcache服务器会去记住这个lease和这个key之间的关系

1.12.23-1.12.29

it knows that somebody out there with a lease to update this key

它知道拿着这个lease的人，才有资格去更新这个key所对应的内容

1.12.29-1.12.31

the new rule is that

这里的新规则是这样的

1.12.31-1.12.38

when the memcache server gets a delete from either another client or from the database server 

当memcache服务器从另一个Client或者数据库那里收到一个delete操作时

1.12.38-1.12.44

the memcache server is gonna as well as deleting the item is going to invalidate this lease

它除了会删除这个数据以外，它还会使之前颁发的lease失效




1.12.44-1.12.47

so as soon as either these deletes come in

So，不管是哪个delete先到达memcache那里




1.12.47-1.12.48

 assuming that delete arrived first

假设这个delete操作先到达memcache




1.12.48-1.12.53

the memcache server is gonna delete this lease from its table

memcache服务器会将这个lease从它的表中删除

1.12.53-1.13.02

 about leases this set is the carry the lease back from the front end

这个set操作会携带前端服务器所拿到的lease

1.13.02-1.13.06

now when the set arrives the memcache server will look at the lease 

当这个set操作到达memcache服务器时，memcache会去查看这个lease

1.13.06-1.13.07

and say wait a minute 

并说，稍等一下

1.13.07-1.13.10

you don't have a lease for this key

你并没有拿着该key所相关的lease

1.13.10-1.13.13

 all right invalid for this key

你拿着的这个lease对于这个key来说是失效的

1.13.13-1.13.14

 I'm gonna ignore this set 

memcache会将这个set操作忽略

1.13.14-1.13.19

so because the lease has been because one of these if one of these deletes came in before the set 

如果其中一个delete操作在这个set操作之前到达memcache




1.13.19-1.13.22

this sees to be invalid in invalidated

它就会看到这个lease是失效的

1.13.22-1.13.25

 and the memcache server would ignore this set 

memcache服务器就会将这个set操作给忽略

1.13.25-1.13.27

and that would mean that

这就意味着

1.13.27-1.13.32

 the key would note just stay missing from memcache 

这个key所对应的数据并没有放在memcache中（缓存未命中）

1.13.32-1.13.36

and the next client that tried to read that key you'll get a Miss

下一个试着读取这个key的client就会遇上缓存未命中的情况

1.13.36-1.13.38

 would read the fresh data now from the database 

它就会从数据库中读取到最新的数据

1.13.38-1.13.41

and would install it in memcache

并将该数据放入memcache中

1.13.41-1.13.47

 and presumably the second time around the second readers lease would be valid

想必，第二个reader所拿着的lease就会是有效的

1.13.47-1.13.51

um you may and indeed you should ask what happened that the order is different

你们可能会问下，如果发生的顺序改变，那么会发生什么呢？

1.13.51-1.14.02

 so supposing these deletes instead of happening before the set these deletes were instead to have happen after the set

So，假设这些delete操作是在set操作之后才发生的

1.14.02-1.14.05

 I want to make sure this scheme still works then

 我想确保这种方案依然有效

1.14.05-1.14.08

and so how things would play out then is that

So，此时的场景是这样的

1.14.08-1.14.13

 since if these deletes were late happened after the set

如果这些delete操作是在set操作之后发生的

1.14.13-1.14.18

 the memcache server wouldn't delete these from its table of lease

memcache服务器并不会将这个lease从lease表中删除




1.14.18-1.14.20

lease would still be there when the set came 

当这个set操作到达memcache的时候，这个lease依然是有效的




1.14.20-1.14.22

and yes indeed we would still

确实，这个lease依然有效

1.14.22-1.14.28

 then it would accept the setting，we would be setting key to a stale value

那么它会接受这个set操作，即我们会将该key的值设置为一个过时的数据（v1）

1.14.28-1.14.31

 but our assumption was

但我们所做的假设是

1.14.31-1.14.33

 this time that the deletes had been late

此时的delete操作是在set之后发生的

1.14.33-1.14.35

 and that means the delete are yet to arrive 

这就意味着，这些delete操作还未到达memcache

1.14.35-1.14.36

when these deletes arrive

当这些delete操作到达memcache时

1.14.36-1.14.40

 then this stale data will be knocked out of the cache 

那么这个过时的数据就会从缓存中清除出去

1.14.40-1.14.42

and so the stale data will be in the cache a little bit longer 

So，这些过时数据呆在缓存中的时间会有点长

1.14.42-1.14.44

but we won't have this situation 

但我们不希望遇上这种情况

1.14.44-1.14.49

where stale data is sitting in the cache indefinitely and never deleted

即过时的数据一直呆在缓存中，从来没有被删除

1.14.49-1.14.56

any questions about this lease machinery

对于这个lease机制你们有任何疑问吗?

1.14.56-1.15.06

 okay um to wrap up

Ok，总结下今天的内容

1.15.06-1.15.19

it's certainly fair to view this system a lot of the complexity of the system as stemming from the fact that it was sort of put together out of pieces that didn't know about each other

该系统存在着大量的复杂性，因为它是由彼此并不了解的部分所拼接起来的

1.15.19-1.15.21

 like it would be nice

那这就会很nice

1.15.21-1.15.21

for example 

例如

1.15.21-1.15.29

memcached knew about the database I'm understand memcache and the database kind of cooperated in a consistency scheme 

memcache知道数据库方面的一些事情，并且它们能通过一种一致性方案一起协调工作

memcache承担了某些数据库方面的事情，所以需要一种一致性方案来让它们一起协调工作



1.15.29-1.15.41

and perhaps if Facebook could have at the very beginning you know predicted the how things would play out on what the problems would be 

如果Facebook在一开始就能预料到事态的发展，以及他们所要面临的问题

1.15.41-1.15.44

and if they have had enough engineers to work on it 

如果他们有足够的工程师去解决这些问题

1.15.44-1.15.55

they could have from the beginning built a system that could provide both all the things they needed high-performance multi data center replication partition and everything 

那么他们从一开始就能构建出高性能且能应用在多个数据中心的系统，并且支持复制和分区等功能

1.15.55-1.15.59

and they're having companies that have done that

在他们之前就已经有公司做到了

1.15.59-1.16.08

so the example I know of that sort of most directly comparable to the system in this paper is that 

So，我所知道的，能与paper中所提到的这个系统进行直接比较的例子是

1.16.08-1.16.09

if you care about this stuff

如果你对此比较关心的话

1.16.09-1.16.16

 you might want to look at it is Yahoo's peanuts storage system 

那你可能会想去看下Yahoo的PNUTS存储系统

1.16.16-1.16.23

which in a sort of designed from scratch and you know different in many details 

它是从头开始设计的，并且很多细节方面都和你知道的不同

1.16.23-1.16.30

but it does provide multi-site replication with consistency and good performance 

它提供了multi-site replication的能力，并且具备一致性和不错的性能

1.16.30-1.16.33

so it's possible to do better

So，我们有可能将它变得更好

1.16.33-1.16.40

 but you know all the issues are present that's just had a more integrated perhaps elegant set of solutions

但你知道所有存在的问题都有着一套更为优雅的解决方案



1.16.40-1.16.44

the takeaway so for us from this paper 

So，我们从这篇paper中所学到的东西是

1.16.44-1.16.47

one is that

其中一点是

1.16.47-1.16.55

 for them at least and for many big operations caching is vital absolutely vital for to survive high load 

对于那些大型操作来说，缓存是至关重要的，它能让我们的系统从高负载的情况下存活下来

1.16.55-1.16.58

and the caching is not so much about reducing latency 

对于降低延迟这方面来说，缓存并不是那么有帮助

1.16.58-1.17.07

it's much more about hiding enormous load from relatively slow storage servers 

它更多还是关于将那些高负载工作尽量对那些速度相对较慢的存储服务器屏蔽

1.17.07-1.17.14

that's what a cache is really doing for Facebook is hiding sort of concealing almost all the load from the database servers

Facebook通过缓存来避免让数据库直面这些负载

1.17.14-1.17.18

 another takeaway is

我们从中学到的另一个东西是

1.17.18-1.17.21

that you always in big systems

在大型系统中



1.17.21-1.17.27

you always need to be thinking about caching versus control versus sorry partition versus replication

你一直得去思考缓存，分区以及replication间的问题

1.17.27-1.17.38

 I mean you need ways of either formally or informally sort of deciding how much your resources are going to be devoted to partitioning and how much to replication

我的意思是，你得需要某种方式来决定在分区这块你要投入多少资源，replication这块你又要投入多少资源

1.17.38-1.17.41

 and finally

最后

1.17.41-1.17.50

 ideally you'd be able to do a better job in this paper about from the beginning integrating the different storage layers in order to achieve good consistency

理想情况下，在这篇paper中，你能够学会以更好的方式来整合不同的存储层，以此获取良好的一致性

okay that is all I have to say 

Ok，这就是我今天要讲的东西

please ask me questions if you have

如果你有问题，那就尽管问吧



三十六  阅举报
