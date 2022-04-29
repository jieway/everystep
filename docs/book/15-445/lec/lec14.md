14-01
14 - Query Planning & Optimization I
18:48 之前都没带⻨ 有的地⽅听不出来
00:15 - 00:19
okay let`s start it ,right.....into it
Ok，孩⼉们，上课吧
00:21 - 00:31
so the schedule for you guys, the major thing obviously two days from now on
Wednesday in this classroom, we will have the mid-term exam
So，我们接下来的安排是，两天后的周三，我们会在这个教室举⾏期中考试
00:32 - 00:36
study guide who's been online since last week ,but also the practice exam
我上周在⽹上发布了学习指南，还有样卷
00:37 - 00:43
I've also uploaded all the lectures all the lecture notes and all the slides from everything
that's covered in exam over this weekend
上周末我还上传了跟考试相关的所有课程视频，笔记以及幻灯⽚
00:44 - 00:51
and then there's additional problems in the textbook ... solutions for the odd ones are
available online
然后我还传了⼀些教科书中的额外问题，以及对应的答案
00:52 - 00:54
so any high-level questions about the mid-term
So，对于期中考试，你们还有任何⾼级点的问题吗
00:56 - 01:01
you need to bring your CMU ID, because it's a class of a hundred people, I don't know
everyone
你需要带着你的学⽣卡，因为这⻔课⼀百来号⼈，我认不全你们每个⼈
01:01 - 01:04
you should bring a calculator ,if you can't do logs in your head
如果你没法⼼算log，那么你可以带个计算器
1.04-1.12
and you're not have a one one eight half I let me sheet of paper ,double-sided with
handwritten notes
你们可以带⼀张双⾯的⼿写笔记
01:12 - 01:19
No shrunk it down slides hows hunker down, let your notes know slowly shrunken down
textbook ,everything I'll be written by hand ,you'll get more out of that way
你带的笔记不能是打印的，只能是⼿写的
01:20 - 01:22
So any question about any of these things
So，对此你们有任何问题吗
01:24 - 01:32
okay good, and then project two will be due on on Sunday at midnight as well
Ok， Project 2会在周⽇晚上截⽌
01:32 - 01:37
I'd like you I posted on Piazza what questions things like that right ,and then the TAs are
helping as needed
我已经在Piazza上贴了⼀些相关的问题，如果你们有需要的话，可以找助教帮你们解答问题
01:38 - 01:38
okay
01:40 - 01:43
all right so we have a lot to discuss today, I don't think I'm gonna get through all of it
So，今天我们讨论的内容有很多，我不觉得今天都能讲完
01:43 - 01:50
so it might spill over to next week after the exam plot there and see what happens
So，讲不完的部分我就延后到下周再讲
01:51 - 01:53
so today we're talk about query optimization and query planning
So，今天我们要讲的内容是查询优化和查询计划
01:54 - 02:00
so the high-level idea what we're trying to do today is that given that SQL was
Declarative
So，我们今天所要讲的⾼级思想就是，SQL是声明式的
2.00-2.04
meaning the the application that sent us the query
这意味着，当应⽤程序向数据库系统发送查询时
02:04 - 02:08
the query says what answer they want us to compute,right
该查询中包含了它们想让数据库系统去计算哪些东⻄
该查询会告诉它们想让数据库系统去计算并返回对应的数据
02:08 - 02:13
select this from this table ,produce all the employees that have this particular attribute
即返回该表中满⾜该属性条件的所有employee信息
02:14 - 02:18
Right, and they and it's not telling us how we actually supposed to compute this
它并没有告诉我们实际该如何计算这些
02:19 - 02:25
right doesn't say do a hash join ,let's look join, although you can do hints like that ,but
we can ignore that for now
这⾥并没有说我们进⾏的是hash join，这⾥只是说进⾏join操作，虽然你可以根据提示来使⽤
hash join，但我们现在将它忽略
02:25 - 02:28
right it's it's just them telling us what answer they want
这⾥它只是告诉我们它们想要的结果是什么
02:28 - 02:33
and so it's up for us now inside the database system people actually building a database
system software
实际上，⼈们在系统内部构建了数据库系统软件
02:34 - 02:41
it's our responsibility to take that SQL query and figure out the the best way the most
efficient way to execute it
我们的任务就是拿到SQL查询语句，并弄清楚执⾏该语句的最佳⽅案
02:43 - 02:49
and so if we saw from from last week or the previous weeks when we talked about join
algorithms
So，根据我们上节课或者前⼀周我们所讨论过的join算法来看
02:49 - 02:53
but they can be quite a big difference in performance, depending on what algorithm you
choose
根据你选择的算法不同，它们在性能上的差别也不是⼀点半点
02:53 - 02:58
we had stupid nested loop join would take one point three hours for a table of six
megabytes
如果我们要对6MB⼤⼩的表使⽤nested-loop join，那么这就要花1.3⼩时才能完成
02:58 - 03:03
but if you do it in the hash join worst case scenario was 0.5 seconds
但如果我们使⽤的是hash join，那么在最糟糕的情况下，我们也只需要0.5秒就能搞定⼀切
03:04 - 03:08
so you know eight spits for this one it's pretty obvious right
So，在这个例⼦中，这种性能上的差异⾮常明显
3.08-3.10
we don't wanna do the stupid thing we can figure this out
我们不想通过愚蠢的⽅式来进⾏join操作
3.10-3.13
when we start getting more complex queries more complex joining
当我们去做些更为复杂的查询和join操作时
3.13-3.18
these then figuring out how exactly go from this to this it's not always obvious
不同⽅法间的性能差距可能就不是那么明显了
03:18 - 03:30 ！！！！！
and that's why in this new this is what's going to separate the the high end database
systems that are very expensive the Oracle, the DB2 the Teradata is, the SQL servers
,Versus like the source ones are the free ones
这就是⾼端数据库系统（诸如：Oracle，DB2，Teradata和SQL server）和开源数据库系统的
区别所在了，贵有贵的道理
03:30 - 03:31
Postgres is still very good
PostgreSQL依然很优秀
3.31-3.38
but it's no where the query optimizer is nowhere as sophisticated as SQL servers for
example
但它的查询优化器并不如SQL server那样来得成熟
03:40 - 03:44
so the idea about query optimizer goes back to the 1970s
说起查询优化器，这得从1970年代讲起
03:44 - 03:49
so I think I've talked about system R in this class a little bit but I said why
So，我之前已经在课上和你们讨论过System R相关的⼀些东⻄了
03:49 - 03:54
but back in you know in the 1970s when Ted Cod and wrote the first paper on the
relational model
回到1970年代，当时Ted Cod写出了第⼀篇关于关系模型的paper
03:54 - 03.58
there was basically two people or two groups that picked it up and try to actually
implement it
简单来讲，但是只有两个⼈或者说两组⼈z选择并尝试对该paper进⾏实现
3.58-4.01
because getting Ted Cod was a theoretician it was a mathematician
因为Ted Cod是⼀个理论家，同时也是⼀个数学家
04:01 - 04:05
So he didn't have to have it in software
So，他⽆须通过软件的形式对其进⾏实现
4.05-4.06
,he just proposed an idea relational model
他只是提出了关系模型这个想法
4.05-4.07
said this is the right way to actually build software
并说，这是构建软件的正确⽅式
04:08 - 04:14
And then there was a group at IBM in San Jose, and then a group at UC Berkeley
接着，在当时有两伙⼈，⼀伙⼈是IBM的，另外⼀伙是UC Berkeley的
04:15 - 04:21
Who ended up taking that payment actually built the you know the first two relational
database management system at least most famous ones
他们两伙⼈构建出了史上前两个关系型数据库系统，并且是最为知名的那种
04:21 - 04:23
no one at Berkeley was called ingress
伯克利那批⼈开发出来的东⻄叫做Ingres
4.23*-4.32
that was you know my postgres is called Postgres, the same guy that made ingress also
be Postgres ,because it's post ingress
你知道的，Postgres之所以叫Postgres，是因为它是由写Ingres的那个⼈所写的，作为Ingres的
后继产品
04:32 - 04:33
that's what the name comes from
这就是它名字的由来
4.33-4.37
right, think he was my advisor when I was in graduate school
当我在上研究⽣的时候，开发它的⼈是我的导师
04:38 - 04:43
and then be the IBM guys, they build this thing called system R
然后，IBM那群⼈开发出的东⻄叫做System R
04:44 - 04:46
and the project is actually fascinating
这个项⽬实际上很有趣
4.46-4.50
,because they got like eight or nine people that all had PhDs in math and computer
science
开发这个项⽬的⼈总共有8或9个⼈，他们都是数学和计算机科学⽅⾯的Phd
04:50 - 04:51
again this is early computer science
这是最早时期的那种计算机科学
4.51-4.54
but there wasn't many people that had graduate degrees in computer science
当时并没有太多⼈获得计算机科学⽅⾯的硕⼠学位
04:54 - 4.57
they put them out of room says we're gonna build a relational database system
有⼈将他们拉到⼀起说，我们去搞⼀个关系型数据库吧
4.57-5.01
and then every person of the PhDs are carved off the room and part of the problem
每个Phd都各⾃负责其中⼀部分问题
05:01 - 05:06
One person who worked on the storage layer,one person worked on the execution
engine, one person worked on concurrency control
⽐如说：⼀个⼈负责存储层，另⼀个⼈负责执⾏引擎，还有的⼈负责并发控制
05:07 - 05:13
and there was one people person pass cylinder she kept query optimization Krita query
optimizer
有⼀个⼈负责的是查询优化这块
05:14 - 05:23
And so back then the idea that you could have a DBMS take a query a declarative
language like SQL
So，在那个时候，DBMS执⾏查询时所⽤的是类似于SQL的声明式语⾔
5.23-5.26
get Ted Cod never actually proposed a language initially with relational model
Ted Codd实际上在⼀开始提出关系模型的时候，并没有提出相关的语⾔
05:27 - 05:28
SQL came later on
SQL是之后才出现的
5.28-5.29
because it was embedded by IBM
因为这是IBM所引⼊的
5.29-5.35
the Berkeley guys had this other thing called quel which looks a lot like SQL, but the
syntax is different
伯克利那批⼈使⽤的是⼀种叫做Quel的东⻄，它看起来很像SQL，但语法并不相同
05:35 - 05:42
Michael Stonebraker the guy wouldn't be dressed would he claims Quel was superior to
SQL, I disagree
Michael Stonebraker表示Quel要⽐SQL来得更为优秀，但我不同意这点
注：Michael Stonebraker因“对现代数据库系统底层的概念与实践所做出的基础性贡献”⽽获得2014年图灵奖。
05:42 - 05:43
but you know nobody writes it well now
但你知道的，现在并没有⼈使⽤Quel
05:43 - 05:56
so but in the back then people argued that there's no way of DBMS gonna take a highlevel language like a SQL or quel and generate a query plan as efficient and what a
human could do writing by my hand
So，但在那个时候，⼈们认为DBMS不可能去使⽤SQL或者Quel之类的⾼级语⾔并⽣成那种如
同⼈⼿写那么⾼效的查询计划
05:56 - 5.58
cuz that's what people were doing before the rational model
因为这是⼈们在关系模型出现前所做的事情
5.58-6.03
if you were writing this these query plans by hand like writing the for loops and do joins
and scans by hand
如果你⼿写这些查询计划，⽐如⼿写for循环，join操作，然后⼿动扫描
06:04 - 06:10
and so in the same way that people will argued when the the C language came out
So，当C语⾔推出的时候，⼈们当时也是这样认为的
06:10 - 06:11
people was saying
⼈们表示
6.11-6.12
oh C's too high-level
Oh，C语⾔太过⾼级了
6.12-6.19
it's the compiler is never gonna generate machine code as efficient than what humans
can write today or a human humans could write an assembly
编译器没法⽣成⽐⼈⼿写来得更为⾼效的机器码，或者汇编代码
06:19 - 06:22
and of course now we know nobody writes for the most part assembly by hand
Of course，我们知道现在⼤部分的汇编都不需要⼈去⼿写了
6.22-6.25
everyone writes in higher-level languages even higher than C
⼈们使⽤的是更⾼级的编程语⾔去编写代码，这些语⾔⽐C还⾼级
06:25 - 06:27
and compilers do a pretty good job
⽽且编译器做得很好
6.27-6.30
in those cases they can do even better than what the average human can do
在这些语⾔中，⼀般来说，它们（编译器）所做的⼯作要⽐⼈来得更好
06:30 - 06:35
this is what IBM prove back in the 1970s that you could take a declared language like
SQL
于是IBM在1970年代推出了查询优化器，这使得你可以去使⽤像SQL那样的声明式语⾔
06:36 - 06:46
and have the query optimizer or the planner generate a query plan that was as good if
not better than what a human can actually do or at least the average human
他们通过查询优化器能够⽣成跟⼈⼿写⼀样好或者差不多好的查询计划
06:47 - 06:50
right so well talk about how the system optimizer works
So，我们会去讨论查询优化器是如何⼯作的
06:51 - 6.52
but what I'll say
但我要说的是
6.52-6.57
as we go along and talk about different leading up to it actually how we do the cost
based search
我们会去讨论进⾏cost-based search的不同⽅法
6.57-7.00
that IBM invented back in the 1970s
这其实是IBM在1970年代所发明的东⻄
07:00 - 07:10
A lot of the designing decisions and assumptions that they made about what the data
looks like, and what the query plans look like, to simplify the problem to make it tractable
他们根据数据和查询计划做出了很多设计决策和假设，以此来简化问题，使其能够易于解决
7.10-7.13
are still actually used in practice today
这种⽅式到了今天我们也依然在使⽤
07:13 - 07:16
all right and I'll go through what those are as we go along
All right，我会对它们进⾏逐个讲解
07:17 - 07:20
so with query optimization there's essentially two approaches to doing this
So，在查询优化这块，本质上来讲，有两种策略可以使⽤
07:21 - 07:27
and again this is also gets into like what distinguishes the good optimizer bad optimizers
这也是好的优化器和差的优化器的区别所在
07:28 - 07:32
so the first approach is use static rules or heuristics
So，第⼀种⽅案是使⽤静态规则或者条件触发
07:33 - 07:34
so the idea here is that
So，这⾥的思路是
7.34-7.36
we can look at our query plan
当我们查看我们的查询计划时
7.36-7.42
and that matches a certain pattern like a portion of the query time matches a pattern
that we know about
如果我们查询中的某些部分满⾜了我们知道的某种条件
07:43 - 07:44
then we fire off a rule
那么，我们就会触发⼀条规则
7.44-7.50
that I do some kind of transformation or rewriting of the query plan took to make it
more often more
这样我就可以对该查询做⼀些改造或者重写
07:51 - 07:56
right maybe like if you define stupid things where one equals zero
⽐如，你定义了某些愚蠢的东⻄，例如：1 = 0
07:56 - 08:00
right then you can have a rule can strip that out very easily
那么你就可以通过⼀条规则将它去除
08:02 - 08:05
so the important thing I'm saying on these rules that
So，对于这些规则⽽⾔，有⼀点很重要
8.05-8.12
we may need to look at the catalog the system kalam that tells us what our database
looks like what our tables looks like
我们可能需要去查看System Catalog，我们得通过它来知道我们的数据库⻓啥样，我们的表⻓
啥样
8.12-8.18
,that the catalog an is the metadata about the data ,what tables do I have, what columns
do they have ,what attributes that they have so forth
catalog中所放的是⼀堆元数据，它描述了我有哪些表，哪些列，表中的属性有哪些
08:19 - 08:20
so for these rules
So，对于这些规则来说
8.20-8.26
you may have look at a catalog consult enough to understand you know what our
underlying tables that should look like
我们得去查看Catalog来理解我们底层的那些表中有哪些东⻄
08:26 - 08:29
but we never actually have a actual data itself
但实际上我们并不需要去查看这些数据是什么
08:31 - 08:38
right we can fire off these rules without actually going to the table say ,well what did it
put to be what am tuple was actually contained
在不需要实际去查看表的情况下，我们通过这些规则就可以知道这⾥⾯tuple实际包含的定义信
息
08:39 - 08:39
right
08:41 - 08:44
be the alternative is cost-based search
另⼀种⽅案就是cost-based search
8.44-8.48
which is instead of you know you don't look at the data
你知道的，你不需要去查看数据
08:48 - 08:51
this one you are gonna have to look at the data in some way
如果使⽤的是这种⽅式，那么你就得以某种⽅式去查看数据
08:51 - 08.53
see the idea what the cost base search is that
这种cost-based search的思想是
8.53-9.04
we`ll gonna do a ,we're going to enumerate a bunch of different plans and different ways
and ideally intelligent manner around looking at redundant or stupid things
我们会去枚举该SQL所有可能的不同查询⽅案，并通过某种智能的⽅式去掉那些多余或者愚蠢的
⽅案
09:04 - 09:09
or with enumerator a bunch of different plans for us that we could choose to execute our
SQL query
我们从这些枚举出来的这些不同中执⾏⽅案选出⼀个来执⾏我们的SQL查询语句
它会列出⼀堆不同的查询计划供我们选择执⾏我们的SQL查询
09:09 - 09:16
and then we're going to use some kind of cost model to approximate, which one is the
execution cost all these different plans
然后，我们会通过使⽤某种成本模型来预估所有这些不同⽅案的执⾏成本
09:17 - 09:20
of course the idea is that we want to always pick the one that has the lowest cost
Of course，我们总是会选那个成本最低的执⾏⽅案
09:22 - 09:28
so obviously getting the bat that cost minor if you have accurate estimations is super
hard ,we'll see why as we go along
So，很明显，如果我们要进⾏准确地估算，这会超级难，原因我们稍后会讲
09:28 - 09:32
and then also in the way you enumerate the plans is difficult too
同样，如果你要去枚举所有的执⾏⽅案，那也是很难的
09:32 - 09:32
because as I said
因为正如我说的
9.32-9.37
you don't want to look at you have a finite amount of time to look at about different
options
你查看这些不同选项的时间是有限的
9.37-9.44
and you don't want to spend you know hours and hours doing a branch of bound search
for a query that may take one second to run
你不想花太多时间来找⼀个执⾏只需要1秒的执⾏⽅案
你绝对不会为⼀个执⾏起来只需要1秒的⽅案在⽅案查找上⾯浪费太多时间
09:45 - 09:48
it's actually quite amazing how how how fast these things can actually be
对于这些东⻄的实际速度能有多快，我们还是很惊讶的
9.48-9.51
like every time in this class and we'll show some demos later on
就⽐如我每次在课上展示的那些Demo
09:51 - 09:57
every single time I open up the quickly in the terminal ,I wrote a SQL query, I hit enter it
was doing both of these things in milliseconds
每次当我打开terminal时，然后编写SQL查询语句，接着按下回⻋，数据库系统就会为我们在⼏
毫秒之内做完这些东⻄
09:58 - 10:04
now again for our queries we look at they're pretty simple, so it's not that mind blowing
对于那些我们所查看的查询来说，它们都⾮常简单，并没有那么烧脑
10:04 - 10:11
but even still you know you can't run anything forever and find it you know the best
possible plan are you try to approximate it
你知道的，你没办法⼀直像这样为执⾏找到最佳的查询计划，你得试着去找到跟它类似的查询计
划
10:13 - 10:18
so the pipeline for our query optimization path it was looking at the following
So，如图所示，我们查询优化中的pipeline是⻓这样的
10:18 - 10:20
so the very beginning we have an application
So，在⼀开始，我们有⼀个应⽤程序
10.20-10.22
the application is connected to the database system
该应⽤程序和数据库系统建⽴了连接
10:23 - 10:25
and then it's going to send us a SQL query
然后，它发送给我们⼀条SQL查询
10:25 - 10:30
so the first stage would go through our optimization pipeline is called the SQL rewriter
So，我们optimization pipeline中的第⼀个要经历的阶段叫做SQL rewriter
10:31 - 10:33
so the idea here is
So，这⾥的思路是
10.33-10.34
that we're given SQL
这⾥我们给出了⼀条SQL语句
10.34-10.40
we can have some transformation rules that allow us to rewrite the SQL in certain ways
我们可以通过某些转换规则来让我们以某种⽅式对SQL语句进⾏重写
10:40 - 10:45
So sometimes this occurs for distributing databases or if you have views
So，有时候分布式数据库中就得做这个，如果你看过的话
10.45-10.50
like The Hobbit ale is for a table name and this thing can say oh I see this table name
maybe you write it to be something else
⽐如：如果这⾥它看到⼀个表名，它会说，Oh，我认识这个表名，可能你要为它写点其他东⻄
10:50 - 10:56 ！！！！！！
let me annotate it with additional information to say this particular table can be found on
this node over here or this disk over here
我会使⽤⼀些额外的信息对它进⾏标记，表示你可以在这个服务器节点或者这个磁盘上找到这张
表
10:57 - 10.58
so this is optional
So，这个是可选的
10.58-11.04
right this is not that common I don't think most database system don't want to operate
directly on SQL
这个东⻄其实并不常⻅，我不觉得⼤多数数据库系统会通过SQL这么直接操作
11:05 - 11:08
but you know this is something you could do to do ,so traditional optimization here
但这是你们可以做的⼀种传统优化
11:10 - 11:14
then we take the SQL query that comes out of this, if we have it， otherwise you go
back through the application
然后如果有解析器的话，我们将SQL查询传⼊解析器中，不然我们就得回到应⽤程序中了（没法
继续往下⼲了）
11:14 - 11:16
and they passed it through our SQL parser
我们将它传⼊SQL解析器中
11:16 - 11:20
and this is just getting the lexer token stuff you can you read a compiler class
如果你们学过编译原理的话，那么你就知道，SQL查询会被分解为lexer token之类的东⻄
11.20-11.23
there's nothing there's no fancy stuff we're doing here
这⾥我们不需要秀什么操作
11:23 - 11:28
we're just converting a SQL string into the abstract syntax tree
这⾥我们只是将SQL字符串转换为抽象语法树
11:29 - 11:32
so then now we see the syntax tree into our binder
So，接着我们会看到，这⾥我们将抽象语法树传⼊了binder中
11.32-11.41
and a binder is responsible for converting the named objects referenced in our SQL
query to some kind of internal identifier
binder是负责将我们SQL查询中所引⽤的那些命名对象转换为某种内部标识符
11:41 - 11:44
So really dude is like consulting the Catalog
So，我们通过询问System catalog来做到这点
11:44 - 11:46
so I have a query it select star from table foo
So，假设我有⼀条SQL查询语句，即select * from foo
11.46-11.50
I don't want to have the rest of my query plan and have to operate on the string foo
我不想让我查询计划中的剩下部分对字符串foo进⾏处理
11:51 - 11:54
I go to the catalog and say hey do you have a table called foo
我得跑到System Catalog处询问有没有⼀张叫foo的表
11:54 - 11:58
if yes give me some internal identify or to allow me to find it later on
如果存在的话，那么请将它的内部标识符给我，这使得我之后能够找到这张表
11:59 - 12:00
or if it doesn't have it
或者，如果这张表不存在的话
12.00-12.03
like it says you know table foo doesn't exist
它就会说foo表并不存在
12.03-12.04
at this point we could throw an error
此时，我们可能就得抛出⼀个错误
12.04-12.08
,and say you know you looking up a table, we don't have or the column, we don't have
并说，我们并没有你所要查找的那张表或者那个列
12:09 - 12:13
so now that the binder is gonna emit is a logical plan
So，现在binder所要输出的东⻄叫做逻辑计划（logic plan）
12:14 - 12:15
well explain look where do you tell what this is in a second
Well，我之后会向你们解释这个
12:15 - 12:18
but the high level I think what this is
但从⾼级层⾯来讲，我是这样想的
12.18-12.19
there's a logical plan and the physical plan
这⾥有逻辑计划和物理计划
12.19-12.23
a logical plan could say at a high level what the query wants to do
逻辑计划指的是，从⼀个⾼级层⾯来讲，这个查询想⼲的事情是什么
12:23 - 12:26
I want to scan this table ,I want to read data from this table
⽐如：我想对这张表进⾏扫描，从这张表上读取数据
12:26 - 12:28
I'm gonna join these two tables
我想对两张表进⾏join
12:28 - 12:30
it doesn't say how all you're actually going to do that
逻辑计划中并不会说我们实际该怎么执⾏该查询
12.30-12.31
that's the physical plan
这是物理计划所要⼲的事情
12.31-12.35
actually specification with the algorithm you're using comes later on
它会去为我们指定我们之后执⾏查询计划时具体要使⽤的算法是什么
12:35 - 12:42
so the binders without a logical plan it's basically a conversion the converted form of the
syntax tree now of internal IDs
So，在没有逻辑计划的情况下，binder所做的就是将语法树中的名字转换为internal id（内部标
识符）
12:42 - 12:45
And we have someone in a relational algebra approximation
这⾥我们会有⼀些类似于关系代数的东⻄
12:46 - 12:49
and then we can feed this now into a tree rewriter
然后，我们将它传⼊⼀个Tree rewriter
12:49 - 12:50
again this is optional
再说⼀遍，这⼀步处理是可选的
12.50-12.53
this actually is more common than the SQL rewriter
实际上，这要⽐SQL rewriter更为常⻅
12.53-12.54
this one actually most of database systems provides
实际上，⼤部分的数据库系统都提供了Tree rewriter
12:54 - 12:56
Because these are the static rules
因为这些都是静态规则
12:57 - 12.59
so to do the tree right rewriting
So，为了对抽象语法树进⾏重写
12.59-13.04
we have to go to the Catalog potentialy and ask them, hey what does our tables look
like what are our attributes look like
我们得去问System Catalog，我们的表⻓啥样，它⾥⾯有哪些属性
13:05 - 13:08
um but yeah we don't have to go to the cost model
但这⾥我们不需要跑到成本模型（cost model）那⾥计算成本
13.08-13.15
we can do this as use your static rule that you want to do for every query ,no matter
what the actual data looks like
我们可以通过这些静态规则对每个查询都进⾏改写，不管实际的数据是什么
13:15 - 13:21
so then the tree rewriter gets picked up still the same logical plan that binder spit out
接着，Tree Rewriter这边会⽣成和binder处所输出的相同的逻辑计划
13:21 - 13:24
so then now we feed this into our query optimizer,right
So，然后我们将逻辑计划传⼊我们的查询优化器
13:24 - 13:26
this is like the black magic part
这部分就是个⿊科技
13.26-13.31
this is where we're actually gonna do the search to try to use a cost model to figure out
what the best plan for us is
我们会在这部分通过使⽤成本模型（cost model）来找出适合我们的最佳⽅案
13:32 - 13:40
so they've been using a combination of schema information that the catalog provides us
as well as some of these s these estimates that our cost model could provide us
So，查询优化器会⽤到System catalog所提供给我们的schema信息以及通过提供给我们的成本
模型来对这些⽅案进⾏成本估算
成本模型所提供给我们的⼀些成本预测来帮我们选出最佳⽅案
13:41 - 13:45
All right this query plan is going to take X amount of times other party plans meant a Y
amount of time
⽐如，使⽤这个查询计划需要消耗x秒，选另⼀个查询计划则需要花费y秒
13:45 - 13:47
X is less than Y I want to pick this other one
x要⽐y⼩，所以我想选x这种⽅案
13:49 - 13:59
well we'll see as we go along this this cost model is going to be a typically ,it's a
synthetic number that the database system computes internally
Well，我们会看到通过成本模型可以得到⼀个数据库系统内部已经计算好的综合数字
13:59 - 14:01
it has no meaning to be outside world
对于外界来说，这些数字没有什么⽤处
14.01-14.07
you can't take a cost model estimate say oh that's really 20 seconds that's me you know
20 minutes
成本模型所算出来的东⻄对于外界来说并没有什么⽤，⽐如说，它算出来这个查询计划需要20
分钟才能执⾏完
14:07 - 14:11
it's just internal thing that say this query plan is better than another
对于数据库系统内部来说，这就是⼀个指标，通过这个指标，它可以判断出这个查询计划要优于
另⼀个查询计划
14.11-14.16
so just used to compare relatively inside big database system between different plans
So，⼤型数据库系统内部会通过这个数据来对不同的查询计划进⾏⽐较
14:16 - 14:18
and has no bearing to the outside world
这与外界⽆关，属于内部的⼯作
14:19 - 14:23
so if you think Postgres this cost model it spits out a number, MySQL cost model spit
out a number
如果你去看下PostgreSQL，它的成本模型会输出⼀个数字，MySQL的成本模型也会输出⼀个数
字
14:24 - 14:27
you can't ... apples and oranges you can't compare them
你不能在不同的数据库系统间⽐较这两个数字
14:28 - 14:33
some systems will try to have the class amount of estimates B term to the actual time
有些系统会去试着估计这些执⾏计划的实际运⾏时间
14:33 - 14:36
but that that's tricky and usually not reliable
但这做起来很棘⼿，通常也并不可靠
14:37 - 14:41
Because hardware changes and the environment changes and so forth
因为硬件会变，环境也会变，还有很多其他因素的存在
14:42 - 14:45
all right - now the optimizer is going to spit out a physical plan
Now，优化器现在就可以⽣成⼀个物理计划
14:45 - 14:48
and the physical plan is what our database system can actually execute
物理计划实际上就是数据库系统实际执⾏查询语句的⽅式
14:48 - 14.51
so when we talk about query execution I show these plans
So，在我们讨论查询执⾏的时候，我展示了⼀些查询计划
14.51-14.53
like it's the hash join
⽐如，就拿hash join来说
14.53-14.56
that you know yeah doing sequential scans, right index scans feeding the hash join
你通过循序扫描或者索引扫描来得到数据，并将这些数据传⼊hash join
14.56-15.02
their choppers drawings, do my hash aggregation or sorting aggregation that
specification happens here
然后我们在此处进⾏hash聚合或者排序聚合之类的操作
15:02 - 15:08
so once we get outside the optimizer then there's not really anything else we have to do
until none of them is executed the query plan
⼀旦我们结束了优化这⼀步骤，直到要去执⾏该查询计划时，我们才会去做些其他事情
15:10 - 15:13
so again and a high level of this is how every single DBMS implements it
So，从⾼级层⾯来讲，这就是每个数据库系统实现查询优化的⽅式
15:13 - 15:18
some things like a SQL rewriter，Tree Rewriter , you don't necessarily have to have
⽐如SQL rewriter或Tree Rewriter之类的东⻄，你不⼀定要有它们（知秋注：因为它们是可选
的）
15:19 - 15:22
but the parts of binder and optimizer is this the standard package
但binder和optimizer这两块是必须的
15:25 - 15:27
so just to reiterate between the logic versus physical
So，再重申下逻辑计划和物理计划这块的东⻄
15:28 - 15:31
again the the the way to think about is
我们要去思考的是
15.31-15.34
that the DBMS generate a logical plan
DBMS会⽣成⼀个逻辑计划
15.34-15.40
that is roughly equivalent to the the relational algebra expressions within our query
粗略地讲，这等同于我们查询中的关系代数表达式
15:42 - 15:43
it's not always a 1:1 mapping
虽然这并不能⼀⼀对应
15.43-15.45
but at a high level you can think of it that way
但从⾼级层⾯来看，你可以以这种⽅式去思考
15:45 - 15:49
I want to do a selection on this table, I'm gonna do a filter, I wanna do a projection ,I
would do a join
⽐如，我想对该表进⾏select操作，filter操作，projection操作或者join操作
15:50 - 15:52
right those are all be contained in a logical plan
这些都包含在逻辑计划中
15.52-15.56
and all those query plan trees that I showed before way I sort of just had the relational
algebra symbols
在我之前所展示的那些查询计划树中，它们中都包含了这些关系代数的符号
15:57 - 15.58
it didn't annotate it and say what algorithm I was using
这并不代表我要去使⽤哪种算法
15.58-16.00
and those have we considered logical plans
我们将这些视为逻辑计划
16:02 - 16:11
the physical operators the physical plan, that's where we actually specifically define what
execution strategy we're going to use for those different operators in our query plan
对于物理计划来说，实际上，这才是我们⽤来定义查询计划中执⾏⽅案的地⽅，即我们要在查询
计划中如何使⽤这些不同的operator
16:12 - 16:14
I'm gonna do an index scan using this index
⽐如：我使⽤这个索引来进⾏索引扫描
16.14-16.19
in this order we're gonna feed my output an index scan into a hash join operator
我们将我们索引扫描所得到的输出结果以⼀定顺序传给hash join operator
16:20 - 16:24
right it's all the low-level details of how we actually execute it
这些都是我们实际执⾏时的底层细节
16:25 -16:31
and so that the bunch of different metadata we have maintain attention a physical plan
that we don't be care about at this point or this class
So，我们在维护⼀个物理计划时，会遇上⼀堆不同的元数据，但在这⻔课上我们不会去关⼼它
们
16:31 - 16:35
But like if I know I have a order by up above
但如果我知道我的查询计划中有⼀个Order By操作
16.35-16.40
and I give you a sort-merge join on the same join key the same Order By key
我就会在Order By所使⽤的key上使⽤sort merge join
我发现sort-merge join使⽤的key和Order By使⽤的key是相同的
16:40 - 16:47
then I can annotate my physical operators and my query plan to say this data that I'm
spitting out is Order by way is sorted based on this key
那么，我可以对我的物理操作符和查询计划进⾏标记，并说：对于这个我所拆分的数据来说，我
想根据这个key来进⾏Order by排序
那么我就可以告诉我的物理操作符和我的查询计划，我的输出数据已经按照这个key排过序了，
这个key和Order By操作的key⼀模⼀样
16:48 - 16:52
so then you can reason and that you can drop the order by up above
So，那么你就可以丢掉上⾯的Order By了
16:53 - 17:02
it's probably a 1:1 mapping from the relational algebra to the to the logical plan
我们或许⽆法将关系代数和逻辑计划⼀⼀对应起来
17.02-17.04
not always true, but high level it is
虽然这种说法不⼀定始终正确，但从⾼级层⾯来看是这样的
17:05 - 17:10
but for the physical plan we can't assume it's a 1:1 mapping from the logic which is the
physical
但对于物理计划来说，我们没法让它和逻辑计划⼀⼀对应起来
17:11 - 17:14
right again if I could have a join plus an order by
如果我有⼀个join operator以及⼀个Order By operator
17.14-17.17
but if I do sort-merge join in my physical operator
如果我在我的physical operator中使⽤了sort-merge join
17.17-17.23
then I can get rid of the order by operator up above
那么我在上⾯就不需要使⽤Order By operator了
17:23 - 17:26
so the the way to think about this is
So，我们可以思考⼀下
17.26-17.31
that the rewriting stuff we'll talk about, and then we get to the cost based search
我们之后会说下重写这块的内容，然后我们会去讲下cost-based search
17:31 - 17:33
those are all operating on logical plans
所有的操作都是基于逻辑计划进⾏的
17:35 - 17:38
but the final is always e needs to be a physical plan
但最终还是需要变为⼀个物理计划的
17:39 - 17:39
okay
17:41 - 17:46
So before we get into the nitty-gritty details ,I mean to say that this is super hard
So，在我们深⼊这些细节之前，我提前声明，这部分超级超级难
17:46 - 17:48
this is the hardest part about database systems
这是数据库系统中最难的地⽅
17.48-17.50
this is actually the part I know the least amount
实际上，这也是我最不熟悉的地⽅
17:51 - 17:52
this is why I'm so fascinated
这也就是我为什么对它所着迷的原因
17.52-17.54
and I always want to try to do more
我⼀直想在这⽅⾯做更多努⼒
17.54-17.56
because like I don't know it ,I don't understand it
因为我对这块知之甚少
17:57 - 18:00
if you can do this, if you if you're good at doing query optimization
如果你对查询优化这块⾮常了解
18:01 - 18:02
you can get a job immediately
那么你就能⽴⻢拿到⼀份⼯作
18.02-18.04
move people pay BBBB you some money to do this
⼈们会很乐意花钱让你来做这⽅⾯的事情
18:05 - 18:07
because like as I said
正如我说的那样
18.07-18.10
IBM made stuff in the 1970s
IBM在1970年代就做了这种东⻄
18:10 - 18:14
there was a lot of query optimization worked under late eighties early early nineties
在上世纪80年代早期或者90年代早期，很多⼈都在研究查询优化这块
18:15 - 18:17
But now it's all like crusty old people,Right
但现在他们都是群脾⽓暴躁的⽼⼈了
18:18 - 18:28
we're all like retiring or moving on you know what 21 year 21 year old knows about
Query optimization other than my students right
除了我的学⽣以外，有谁能在21岁的时候就对查询优化有所了解呢
18:28 - 18:30
If you can do this
如果你能做这块的话
18.30-18.31
you can got a job immediately
那么你就⽴⻢能找到⼀份⼯作
18.31-18.33
that's the one email I always get
我天天都能收到这⽅⾯的⼯作邮件
18.33-18.35
I should share that I should show screenshots of this
我应该给你们看下邮件截图
18:35 - 18:41
The email I always get from from people friends at database companies BBBB ,I'm not
wearing a mic
我总是收到某数据库⼤⼚的邮件，他们想找我内推⼈才，我居然忘记带⻨克⻛了
18:46 - 18:47
maybe I pick up most of it
18:48 - 18:52
right right so if you can do this
So，如果你可以做这部分⼯作
18.52-18.54
you'll get paid a lot of money
那么你就能拿到⼀⼤笔钱
18.54-18.55
because it's like super hard
因为这块内容实在是太难了
18:56 - 18.57
and it's hard to hire people to do this kind of stuff
⽽且确实很难招到这⽅⾯的⼈
18.57-19.02
one database system company told me that if they can find people that have a PL
background， they can do this
其中⼀家数据库系统公司告诉我，如果他们能找到有PL背景的⼈来搞这块，那么他们愿意付⼀
⼤笔钱
19:02 - 19:09
,another database company told me that they have people that have backgrounds in
high energy physics,can can do query optimization
另⼀家数据库公司告诉我，他们中有员⼯的背景是⾼能物理，这名员⼯负责的就是查询优化
19:10 - 19:15
so this is joke in databases that says like people always say Oh query optimization is as
hard as rocket science
So，这其实是数据库系统中的⼀个玩笑，⼈们总说，数据库系统中的查询优化难得就跟造⽕箭
似的
19:16 - 19:17
and the joke is that
这⾥的玩笑是
19.17-19.22
no if you fail at doing query optimization, your backup career plan could do rocket
science
如果你不擅⻓查询优化，那么你的第⼆职业计划可以是去造⽕箭
19.22-19.23
, because there's so even harder than that right
因为没有⽐这玩意更难了
19:24 - 19:30
and this is what's gonna separate the high end guys versus the the open-source guys or
the the the smaller systems
这就是⾼端数据库系统和开源数据库系统以及那些⼩型数据库系统之间的区别了
19:31 - 19:37
Oracle ,SQL server and IBM and Teradata and all the the the enterprise systems around
for a long time
Oracle，SQL server，IBM以及Teradata这些所有企业级数据库系统都在这上⾯花了很多精⼒
19:37 - 19:41
they have spent millions and millions of dollars have hired hundreds to hundreds of
people to work on these things
他们花了⽆数的⾦钱雇佣了上百号⼈去负责这⽅⾯的事情
19:42 - 19:44
and they're quite sophisticated
查询优化这块实在是太难了
19:45 - 19:52
and so if you know if you can do this kind of stuff you'll you in demand
So，如果你能做这块的⼯作，那么你就是他们所需要的⼈
19:53 - 19.56
So another way you talk we're gonna talk about this class is that
So，我们要在课上谈论的另⼀件事情就是
19.56-20.01
you may say, all right well this is like super hard ,can machine learning solve this so can
a AI solve it
你们可能会问，Well，这块既然这么难，那么我们能否使⽤机器学习或者AI来解决呢？
20:02 - 20:02
no but yes right
半对半错
20.02-20.09
so people have tried applying machine learning PR try apply machine learning now more
recently
⼈们最近已经尝试在这⽅⾯使⽤机器学习了
20:10 - 20:11
And seeing some promising results
并且他们也看到了⼀些有希望的结果
20.11-20.16
but it's still not not no anywhere near what the you know the commercial systems can do
但这还没有应⽤到商业数据库系统中
20:17 - 20:21
IBM actually tried something similar back in the early 2000s this thing called leo
实际上，IBM在2000年代初期就已经尝试做出类似的东⻄了，它叫做Leo
20:21 - 20:22
the learning optimizer
即learning optimizer
20.22-20.24
turns out it was it sucked
事实证明，它很垃圾
20.24-20.27
and everybody you know they shifted in production
他们将这玩意投⼊了⽣产
20:27 - 20:32
but every db2 DBA I've ever talked to says the first thing they do when they install db2 is
turn off that learning crap
但每个DB2的DBA跟我吐槽过，每次安装DB2的时候，他们⼲的第⼀件事，就是关掉这玩意
20.32-20.33
cuz it never worked， make things worse
因为这东⻄没啥⽤，甚⾄还让整个系统变得更垃圾
20:34 - 20:39
so just machine learning is a potential way to improve things
So，对查询优化来说，机器学习确实是⼀种潜在的改善⼿段
20.39-20.42
but it's not going to be you know a magic bullet to solve everything
但它并不是那种能够解决⼀切问题的⿊科技
20:43 - 20:44
so as I said
So，正如我所说的
20.44-20.48
this is the one thing about database systems that I'm most excited about and know the
least about
这是数据库系统中我最为兴奋的⼀个地⽅，同时也是我了解最少的地⽅
20:49 - 20:52
last semester we covered in the advanced class we did three lectures on this
在上学期的15-721上，我们花了三节课的时间来讲这个
20.52-20.55
I think I'm expanding that to make four or five next semester just ,
我觉得我可能下学期得花4到5节课来讲这块内容
20.55-20.58
because like we build our own query optimizer at CMU
因为我们在CMU的数据库系统中构建了我们⾃⼰的查询优化器
20:58 - 21:00
it's super hard for me to get students come work on it
对我来说，其实很难去带学⽣⼀起去做这个


14-02
14-02
21:02 - 21:04
but they all get jobs immediately
但他们都很快就拿到了⼯作
21:04 - 21:08
but like this is this is something we'll call a cover more in the advanced class
但我们之后会在15-721⾼级数据库系统这⻔课中对此进⾏深⼊介绍
21:09 - 21:16
so yeah I don't know bad-mouthing any other systems, some systems are they'll create
optimizer total crap
So，我不清楚其他系统是怎么样的，但有些数据库系统中的优化器就是个垃圾
21:19 - 21:20
you know cover that later at all fine okay
我之后会对此进⾏介绍
21:22 - 21:22
All right
21.22-21.24
so we have a lot to cover today
So，我们今天要讲的内容有很多
21.24-21.25
and like I said I don't think we're to get through all of it
正如我说的，我不觉得我们今天能够讲完这些内容
21:26 - 21:28
so what this might spill over into next week
So，讲不完的内容我会放在下周再讲
21.28-21.33
I don't know why I just didn't break it up to two semesters or to two lectures before this
虽然我也不知道为什么我之前将这节课的内容变成两节来讲
21.33-21.34
but it is what it is
但这就是我今天要讲的内容
21:34 - 21:36
so first we'll talk about relational algebra equivalencies
So，⾸先我们要来讲等价关系代数（relational algebra equivalencies）
21.36-21.43
the core underlying concept that's an allow us to do manipulation and
transformations,our query plans to find better alternatives
它的核⼼基础概念是让我们去对我们的查询计划进⾏操作和转换以此来找到更好的备选⽅案
21:43 - 21:45
then we'll talk about how we do at cost estimation
接着，我们会去讨论该如何做成本估算
21.45-21.51
how do we take a query plan and and in our cost model estimator how much work we
have to do to execute it
即我们拿到⼀个查询计划，然后通过我们的成本模型来估计我们所需要做的⼯作量有多少
21:51 - 21:53
and then won't spend more time talk about enumeration
然后，我们不会花太多时间去讨论枚举（enumeration）
21.53-21.57
this is like the search strategy define different options for the cost base search model
这就像是查找⽅案为cost-based search模型定义了多种不同的基本选项
21:57 - 21.59
and then we'll talk about how to handle sub queries
接着，我们会去讨论如何处理⼦查询
21.59-22.04
we oh we probably want to get through half of this, but that's okay
我们今天的时间可能连这⼀半的内容都⾛不完。但这都不是事
22:04 - 22:04
all right
22.04-22.05
so as I said
So，正如我所说的
22.05-22.13
the core underlying concept that we're going to take take advantage of when we do
query optimization
当我们进⾏查询优化时，我们可以去利⽤这些核⼼基础概念
22:13 - 22:17！！！！！！
It`s the fact that we understand the high-level properties of a relational algebra .
实际上，我们理解关系代数在⾼级层⾯上的特性
22.17-22.27
and therefore can permute or transform the relational algebra or a plan that's equivalent
to some relation algebra statement In different ways and still produce the same result
因此，我们可以对关系代数或者查询计划进⾏转换成相同效果的不同关系代数语句
22:28 - 22:35
so we're gonna say we have two relational algebra expressions or two query plans so to
speak
So，假设我们有两个关系代数表达式或者两个查询计划
22:35 - 22:39
that if they produce the same set of tuples
如果它们⽣成了完全相同的tuple集合
22.39-22.40
then we know that they're equivalent
那么我们就知道它们的效果是相同的
22.40-22.47
and therefore, it's valid for me to transform my original relation algebra expression into a
new expression
因此，对我来说，可以将原来的关系代数表达式转换为⼀个新的表达式，它们的效果相同
22:47 - 22:49
so notice I'm here again I'm saying a set of tuples
So，要注意，我这⾥说的是⼀组tuple
22:50 - 22:53
because remember relational algebra or the relational model is unordered
因为要记住关系代数或者关系模型是⽆序的
22:54 - 22:58
so I don't care and let's have an order by statement or order by clause
So，我不在意我们有没有⽤Order By⼦句
22:58 - 23:04
I don't care that one query plan produces tuples ordered this way ,and another query
plan produces tuples order in this way
我不在意，这个查询所⽣成的tuple是这个顺序，另⼀个查询所⽣成的tuple是另⼀个顺序
23:04 - 23:06
they're still equivalent
它们的内容依然是等价的
23:06 - 23:07
and that means
这意味着
23.07-23.13
there's me more options available to us to figure out ,what is the wouldn't you know
what's a better query plan for us to use
这⾥有很多选项可供我们选择，以此来弄清楚对我们来说哪个查询计划才更好
23:13 - 23:17
so we can apply these sensitivity of the transitivity and the committed properties of
relational algebra
So，我们可以去使⽤关系代数中的传递性等特性
23:18 - 23:23
right,standard you know standard logic to change the expression in different ways
我们通过不同的⽅式来改变表达式的标准逻辑
23.23-23.26
move operators around to produce a more efficient plan
通过移动operator来⽣成更为⾼效的计划
23:27 - 23:30
so this high level technique is called query rewriting
So，我们将这种⾼级技术叫做查询重写（Query Rewriting）
23:30 - 23:32
So this is that rewriting step that I was talking about before
So，这就是我之前所讲过的重写步骤
23:32 - 23:33
right after the binder
经历binder这⼀步骤后
23.33-23.36
we can do a tree rewriter
我们可以对抽象语法树进⾏重写
23.36-23.40
where we can look at the relational algebra representation of a logical plan
我们可以去看⼀个逻辑计划的关系代数表达
23:41 - 23:43
And then move things around to produce something that's more efficient
然后对它进⾏调整，来让它变得更为⾼效
23:44 - 23:46
so let's look a really simple example here
So，我们来看⼀个很简单的例⼦
23:46 - 23:49
let's say I have two tables student and enrolled
假设，我们有两张表，⼀张student表和⼀张enrolled表
23:49 - 23:52
and I want to do a join where I between the two tables
我想对它们进⾏join操作
23.52-23.57
,where I want to get all the students that are enrolled in the class, where they got a
great A
我想得到这⻔课中所有成绩为A的学⽣信息
23:58 - 24:04
so if I almost take a literal translation of the SQL statement
So，我对这条SQL语句简单翻译了下
24:04 - 24:06
I would roughly come up with a relational algebra statement like this
我⼤概会写出像图上这种关系代数语句
24:07 - 24:11
do a join on student and enrolled ,then apply the the filter on grade
对student表和enrolled表进⾏join，然后根据grade进⾏过滤
24:11 - 24:15
and then have the projection where I just produce the course ID and the name of the
student
接着，再进⾏projection操作，这⾥我只需要⽣成course id以及学⽣的姓名即可
24:16 - 24:16
right
24:18 - 24:20
so what's a really simple optimization we can do for this
So，对于这条语句我们能做哪些简单的优化呢？
24:23 - 24:23
yes
请问
24:25 - 24:27
brain he said push the filter to be inside and enrolled ,right
他说，将过滤这⼀步放在enrolled⾥⾯来做
24:28 - 24:29
so he's exactly right
So，他说的没错
24.29-24.32
so this technique is called predicate pushdown
So，这项技术叫做predicate pushdown
24:32 - 24:39
so the reason why it's called he said push into I'll say the typical term is pushed down,
because you're pushing it down into the query plan
So，之所以他之前说的是push into（推⼊），⽽我对此所⽤的标准术语是push down，原因
是，我们将这个操作推到查询计划树的下⽅位置
24:39 - 24:42
so let's say this is the query plan tree
So，这是⼀棵查询计划树
24:43 - 24:48
and so when you take this filter, and have it be before the join
So，我们可以将这个filter放在join操作之前
24:50 - 24:51
right cuz what are we doing here
因为我们这⾥所做的是
24:52 - 24:56
well we want to reduce the amount of work we have to do in our join operator
Well，我们想去减少我们在join operator中所做的⼯作
24:57 - 25:00
so rather than having the filter be above the join operator
So，与其我们把这个filter放在join operator的上⽅
25.00-25.06
where I'm just taking all the students ,and all the enrolled records ,and in the doing the
join on them，then apply the filter
即我拿到所有的学⽣记录以及所有的选课(enrolled)记录，根据学⽣id来这些记录进⾏join操作，
然后根据成绩进⾏过滤得到输出结果
25:06 - 25:08
,it's better for me to do the filter early
那我还不如早点进⾏过滤操作
25:09 - 25:11
think again always think of in extremes
So，我们总是得拿那些极端情况去思考
25.11-25.14
say my enroll table has a billion tuples
假设，我的enrolled表中有10亿条数据
25:14 - 25:17
but only one student ever got an A in any class
但只有⼀个学⽣其中⼀⻔课的成绩为A
25:18 - 25:21
then I would do a join on a billion tuples
然后，我要对这10亿条tuple进⾏join
25.21-25.25
all only the end up producing a single result as much as my output
最后它只⽣成⼀个tuple作为我的输出结果
25:25 - 25:27
but if I do my filter early here
但如果我提前在这⾥进⾏过滤
25.27-25.29
and now I'm doing a join on one tuple
现在我就只要对1个tuple进⾏join
25.29-25.31
because then this is this is more expensive than this in general
因为使⽤这种⽅法通常成本要⽐它（左侧的⽅案）昂贵得多
25:33 - 25:36
I said this is the general idea what we're trying to do here in query optimization
So，这是我们在查询优化中所使⽤的常⻅思路
25:36 - 25:41
we're trying to identify cases where we can end up doing less work
我们会试着找到那种执⾏查询时所做⼯作量更少的⽅案
25.41-25.44
,because that's what minute end of the day that's what we want to do
因为这才是我们想做的事情
25:44 - 25:44
if you do less work
如果我们所做的⼯作越少
25.44-25.50
it's an have lower cost have faster runtimes ,and require potential less hardware,
那么成本就会更低，执⾏速度就会更快，所使⽤的硬件资源也更少
25.50-25.56
yes
请问
25:56 - 25.56
this question is
他的问题是
25.56-26.03
what a query optimizer also be able to change this or change change left in or yes,we'll
get there ,but not yet
查询优化器是否也能改变左边的这部分，可以，但这个我们暂时不会讲
26:03 - 26:04
so his question is
So，他的问题是
26.04-26.07
it might mice this is like a super simple example
这其实是⼀个超级简单的例⼦
26.07-26.09
like I can do this the heuristic
我可以通过heuristics（触发式）来做（知秋注：就⽐如NBA中的罗斯条款，只要符合这个条
件，那就触发相应的规则）
26:09 - 26:10
I have a query plan
假设，我有⼀个查询计划
26.10-26.12
I always want to push down the predicate
我总是想将predicate这部分下推
26:12 - 26:16
I don't need to look at what the data looks like to do what you're asking
我不需要去管这些数据是啥样⼦，我只管做你让我做的事情（知秋注：其实就是函数式编程理
念）
26.16-26.17
should this be the inner versus the outer
其实这是⼀个内部函数和外部函数间的⽐较（知秋注：其实就是σ grade='A' (student ⋈
enrolled）中σ函数与 ⋈函数之间成本的⽐较）
26.17-26.20
I need to know how much data is getting fed into this
我需要知道我该往这个operator中传⼊多少数据
26.20-26.24
because again the the smaller table should always be the outer table, that requires a
cost model
再说⼀遍，我们往往会将更⼩的表作为outer table使⽤，因为这是我们通过成本模型得到的结
果
26:24 - 26:28
we can do this we can do this push down without ever looking at the data
在不需要查看数据的情况下，我们就可以做到这种push down
26:30 - 26:30
yes
请问
26:34 -26:35
right so question is
So，他的问题是
26.35-26.37
what does a look at in relation algebra
在关系代数中这是什么样的
26.37-26.40
it's just moving the the grade-b inside of this
它只是将grade="B"移动到⾥⾯去了⽽已
26:41 - 26:41
right
26:49 -26:50
say it again
再说⼀遍
26:59 - 27:00
sorry this
你指的是这个？
27:02 - 27:03
so I mean there's a parentheses
So，我的意思是，这⾥有个括号
27.03-27.05
so this is saying do the filter on the enrolled table
So，这⾥的意思是对enrolled表进⾏过滤操作
27:13 - 27:14
For algebra standpoint
从关系代数的观点？
27:14 - 27:18
yes yeah
请问
27.22-27.23
Correct yes
说的没错
27:24 -27:25
e.grade yeah
e.grade
27:31 - 27:32
good question okay
问题不错
27.32-27.32
,first question is
第⼀个问题是
27.32-27.35
can predicate pushdown ever be bad
predicate pushdown是不是⼀直都很糟糕
27:37 - 27:37
Yes
没错
27.37-27.40
so in this really simple example here
So，在这个简单的例⼦中
27.40-27.43
,like doing that something equal something you know something that's easy to do
⽐如：xxx=xxx这个我们处理起来很容易
27:44 -27:47
there are some predicates that can be expensive to compute
这其中有些条件计算起来成本太⾼
27:48 -27:52
so now this is where the end the database systems cost model can try to say well
数据库系统中的成本模型会说
27:53 - 27.54
for example
例如
27.54-27.59
so sometimes there you could have will cover this next class on Monday next week
我们会在下周⼀的课上介绍这个
28:00 - 28:02
but there's things called user-defined functions
但这个东⻄叫做user-defined functions
28:02 - 28:10
so it's out of having like a function you know it's an expression either touch a constant
or another attribute and a tuple
这就好⽐是⼀个函数表达式，它需要接收⼀个常量，或者⼀个属性或者⼀个tuple
28:10 -28:13
I can have it invoke a function that can then be any arbitrary code
我就可以去调⽤这个函数，这个函数可以是任意的代码实现
28:13 -28:18
like I can have a user-defined function written in C or Python
⽐如：我可以使⽤C或者Python来编写⼀个user-defined function
28.18-28.22
and that Python code makes a call out to a remote server does some kind of computation
Python代码可以通过向远程服务器发起⼀次调⽤来进⾏某种计算
28.22-28.25
maybe a pays in Bitcoin for the micro transaction and it comes back
可能是进⾏了⼀场⽐特币交易，然后返回
28:25 -28:32
so if I know that for this predicate here to do the join
So，如果我知道这个join操作的执⾏条件
28.32-28.33
this is super selective
这是个⾮常具有选择性的条件
28.33-28.35
meaning there's not very many tuples coming out of this
这意味着，根据这个条件，我们所得到的tuple不会特别多
28:36 - 28:39
it may I may be oak better off applying this up here
那么我们将这个判断条件放在这上⾯可能来得更好
28:40 - 28:44
because that this is you know monetarily is more expensive than doing this
因为从⾦钱上来讲，右侧这种做法成本更⾼
28:45 - 28:47
so you don't always want to push this down
So，你不会⼀直想将这个条件下推
28:47 - 28:49
but in general you oh yes you do
但⼀般来讲，你可以这么做
28:50 - 28:53
my microtransaction is a far-fetched example you could do it
我举⼀个牵强的例⼦，⽐如我想进⾏⼀次微交易
28.53-28.57
but like it's stupid you wouldn't want to do that
但它有点愚蠢，你不会想这么做
28:57 - 28.57
right
28.57-28.59
but there's other things too
但这还有些其他东⻄
28.59-29.02
like if there's computing the hash or something like that or some kind of crypto stuff
⽐如，你要去计算hash或者对某些东⻄进⾏加密
29.02-29.05
you may want to put that up above here here
那么你可能会想将它放在上⾯
29:05 - 29:08
but again the database system can reason about that
但数据库系统可以对此进⾏推理并判断它该处于哪个位置
29:11 - 29:11
okay
===================
29.11-29.24
so let's go through now a bunch of these different operators to talk about what kind of
optimizations we can apply for the other relational operators and our query plans
So，我们会去看下这些不同operator，以此来讨论我们能给其他关系型operator和查询计划做
哪些优化
29:24 -29:27
so we've already covered this one, right, the predicate pushdown ,right
So，我们已经介绍过predicate pushdown了
29.27-29.30
the idea is that we want to do filtering as early as possible
这⾥的思路是，我们想尽早地进⾏条件过滤
29.30-29.32
ignoring the cost of applying the filter
忽略掉使⽤filter的成本
29:32 - 29:35
but that's gonna allow us to throw away data more quickly
但这能让我们更快地丢掉数据
29:35 - 29:36
in a DBMS
在DBMS中
29.36-29.39
applying a filter sooner sooner rather than later it's usually better
尽早地进⾏过滤要⽐之后再进⾏过滤要来得更好
29.39-29.44
because then I'm not copying as much data up you know up above and polluting my
memory
因为这样我就不需要往查询计划树上复制⼤量的数据并污染我的内存了
29:45 - 29:48
you can also reorder the predicates themselves
你也可以对这些条件进⾏重排序
29:48 - 29:50
so that the more selective ones are applied first
So，我们可以将更具选择性的条件放在最前⾯
29:51 - 29:56
So let's say my last example where I had great you know someone has a grade equals A
So，以我最后⼀个例⼦为例，你知道的，有⼀个⼈的成绩是A
29:57 - 30:01
but let's say I had another predicate where age equals you know great age greater than
99
但假设我有另⼀个条件，即age>99
30:01 - 30:06
so find me all students at Carnegie Mellon that have got an A in the class and are older
than 99 years
So，我想找到CMU中所有这⻔课成绩为A，并且年纪⼤于99岁的所有学⽣的相关信息
30:07 - 30:08
I don't think there is anybody, right
我不觉得有任何⼈符合这些条件
30:09 - 30:12
so it's better off for me to apply the the age predicate first
So，对于我来说，将age这个判断条件放在第⼀位要来得更好
30.12-30.17
because that's gonna filter out way more things, before looking at the grade predicate
因为根据grade来过滤tuple相⽐，这可以过滤掉更多东⻄
30:19 - 30:25
now you may say all right ways in that just you know a slight computational overhead
yeah for database system maybe doesn't matter that so much
你可能会说，对于数据库系统来说，这种轻微的计算型开销可能并不算什么（知秋注：内存往往
会很充裕）
30:25 - 30:29
but in in other systems like a memory system then that can matter a lot
但对于其他系统来说，⽐如内存型数据库系统，这就会很严重了（知秋注：内存是最重要的资
源，可能本来内存就已经很紧张了，多占⽤⼀点可能就会影响更多的性能）
30:31 - 30:31
yes
请问
30:42 -30:43
yes his right,so so
他说的没错
30:46 - 30:46
his statement is like
他想说的是
30.46-30.47
for this one
对于这个来说（知秋注：ppt中的第⼆项）
30.47-30.50
I'm claiming that we're not looking at selectively the data
我说过，我们看不到这些数据的样⼦，并对这些条件进⾏重排序
30.50-30.51
so you couldn't actually do this one
So，你实际上没办法做这个
30:51 - 30:52
yeah that's true yes
没错，你说的是对的
30.52-30.53
for this one yes, you're right
对于这点来说，你是对的
30:54 - 30:56
But pushing down you always want to do that
但你们总是会想去使⽤push down
30.55-30.56
yes
请问
31:10 -31:11
So his question is
So，他的问题是
31.11-31.17
why would be breaking it up be better than just having to be all at once
为什么将⼀个复杂的条件进⾏拆分，要⽐直接对它进⾏操作来得更好
31:18 - 31:22
again if the computational cost of one of the predicates is more expensive than another
再说⼀遍，如果其中⼀个判断条件的计算成本要⽐另⼀个来得更⾼
31.22-31.26
maybe you want to break off that one and have them be up above in the query plan
你可能会想将这个判断条件进⾏拆分并将它们放在查询计划的上层
31:29 - 31:29
yes
请问
31:35 - 31:37
Yesh ,if it's a column store
如果这⾥使⽤的是列式存储
31.37-31.44
then maybe I want to do a pass through the column first sort everything out
可能我想先对这⼀列进⾏排序处理
31.44-31.46
and then for the things that match them to the next one, yes
然后，将符合条件的tuple传给下⼀个条件进⾏处理
31:46 - 31:48
but that is the right example
这就是⼀个正确的案例
31:49 - 31:51
and then for this one here
对于此处的这个例⼦来说
31.51-31.56
again you can simplify complex this is a simplify complex predicate to be more easy to
compute
你可以将这个复杂的判断条件进⾏拆分，使其变得易于计算
31:56 - 31:59
this is a trivial example X x=y and y=3
如图所示，这是⼀个简单的例⼦（X=Y And Y=3）
32:00 - 32:05
well again through through the transitivity calls we know that x is just this is just x=3
Well，根据传递性调⽤，我们知道X的值就是3
32:05 - 32:07
so we can rewrite it like this
So，我们可以将其重写成这样
32:07 - 32:09
so now what happens is that
So，这⾥所发⽣的事情是
32.09-32.12
in when we use going through a billion tuples
当我们要处理10亿个tuple时
32:12 - 32:14
We can just look at each attribute with x and y
我们可以去查看x和y的每个属性
32.14-32.18
check to see whether equivalent to a to a constant,
检查下它们是否等于⼀个常量
32.18-32.28
which is way cheaper than having to go get the reference of the y attribute in the tuple
,and then copy it you know to some register or some variable and then doing the
comparison
⽐起你从tuple中拿到y属性的值，然后将它复制到某个寄存器或者变量中再进⾏⽐较，这种做法
的成本更低
32:28 - 32:32
right this is like a micro optimization that would mostly only matters for the in memory
guys
只是⼀种只对内存型数据库系统起作⽤的微优化
32:33 - 32:37
all right for projections, we can also push them down as early as possible
对于projection操作来说，我们也可以将它们尽早push down
32:38 - 32:40
and the idea here is that
这⾥的思路是
32.40-32.45
we want to minimize the amount of data we have to copy going you know from one
operator the next
当我们将数据从⼀个operator处传给下⼀个operator时，我们想最⼩化我们需要复制的数据
32:46 - 32:48
and this mostly matters in the rows store systems
这在⾏存储数据库系统中⾮常重要
32.48-32.50
because if the rows really wide
因为如果这些⾏⾮常⻓的话
32:50 - 32:52
and I'm moving that entire tuple up from one operator the next
然后，我将这整个tuple从⼀个operator传到另⼀个operator
32:53 - 32:58
then if I can strip out as much data that I don't need it early as possible
那么，如果我可以尽可能早得将我不需要的数据去除的话
32:58 - 33:01
then I'm copying less data from one step to the next right
那么在上⼀步和下⼀步间，我要复制的数据量就变少了
33:02 - 33:04
So in say in this example here
So，在这个例⼦中
33.04-33.08
say the the student table has a thousand columns
假设student表中有1000列
33:08 - 33:12
But my query only needs two attributes, the student id and the student name
但我的查询只需要两个属性，即student id和student name
33:13 - 33:20
so I can then introduce now, a projection in here before I feed into my join operator
So，我可以在将我的数据传给join operator之前，引⼊⼀个projection操作
33:20 - 33:26
So I strip out the nine hundred ninety eight columns that I don't need, and only pass in
the two that I do need
So，这样我就可以去掉我不需要的那998列信息，只传递我所需要的2列给join operator
33:27 - 33:30
Right,this is very actually very common in distributed databases
实际上，这在分布式数据库中这很常⻅
33.30-33.33
because moving data over the network is expensive and slow
因为通过⽹络来移动数据的成本⾮常昂贵，速度也⾮常慢
33:33 - 33:36
so if I'm getting this is on one node, this is on another node
So，如果我在这个节点上拿到数据，然后在另⼀个节点上拿到数据
33:37 - 33:39
and I'm doing the join on the same node that I enrolled on
然后我们在enrolled这个节点上进⾏join操作
33.39-33.43
then I want to strip out as much as I can ,before I send that over the network
在我将这些数据通过⽹络发送出去前，我想尽可能地去掉那些⽆⽤的数据
33:45 - 33:47
all right
33.47-33.49
so everything I've showed you here so far
So，在⽬前为⽌我向你们展示的东⻄中
33.49-33.55 ！！！！！
these are doing applying optimizations on one in a relational algebra operators relational
algebra expressions
我们在关系代数operator和关系代数表达式上应⽤了这些优化
33:56 - 34:03
we can apply these same optimizations for the underlying predicate expressions
themselves in our queries
我们也可以对我们查询底层的条件表达式也使⽤相同的优化⽅式
34:04 - 34:14
so I'm going to show you a bunch of examples of how different database system can
rewrite query plans to simplify them or avoid doing stupid work
So，我会通过⼀堆例⼦来向你们展示，不同的数据库系统是如何重写查询计划来对这些查询计
划进⾏简化或者避免做些愚蠢的事情
34:15 - 34:19
and this comes from this great blog article over a few years ago
这个例⼦是来⾃于⼏年前的⼀篇博⽂
34.19-34.24
where somebody lifted out all here's one of different operations you can do that doesn't
require a cost model
在那篇博⽂中，有⼈列出了⼀堆不需要⽤到成本模型去计算成本的操作
34:26 - 34:30
and we'll give a demo of some of his comparisons
我们会给出他所做的⼀些⽐较案例
34:30 - 34:30
but it's really nice
但它真的很nice
34.30-34.37
because he provides a there's a github repository that has the sample database he uses
for his analysis
因为他提供了⼀个Github仓库，⾥⾯放了他⽤来进⾏分析的样本数据库
34:37 -34:41
and it works on SQL Server db2 Oracle like working on a bunch of different database
system
他使⽤了SQL Server，DB2，Oracle等等⼀系列不同的数据库系统
34.41-34.49
you can take the same database, same queries and see how the different optimizers can
rewrite things and fix things
你可以使⽤和他⼀样的数据库和查询语句，然后看下不同的优化器是如何优化这些东⻄，以及修
复⼀些东⻄的
34:49 -34:49
okay
34.49-34.56
so the first kind of thing we can rewrite is to remove stupid predicates or unnecessary
predicates
So，在重写这块，⾸先我们能做的就是移除掉愚蠢的条件或者不必要的条件
34:57 - 35:05
so in this case here select * from table A where 1 = 0 ;what is this value a true? false
So，在图中这个SQL语句中，1=0的结果为true吗？很明显，false
35:05 - 35:06
so what does that mean
So，这意味着什么呢？
35.06-35.08
that means for every single tuple I'm going to scan on table A
这意味着，对于我在A表中扫描的每个tuple来说
35:09 - 35:14
I'm gonna check oh is the predicate false equal to true, it never will be equal to true
我会对这个条件进⾏检查，我看到：Oh，这个条件的结果永远不可能是true
35:14 - 35:15
so therefore no tuple would match
So，没有任何⼀个tuple匹配这个条件
35:17 - 35:18
right
35.18-35.20
so the DBMS easily recognize that I have an impossible predicate
So，DBMS可以很容易地认识到这是⼀个不可能的条件
35.20-35.22
where no tuple could ever possibly match this
没有任何tuple符合这个条件
35:22 - 35:28
it can just actually skip the scan entirely, and just produce you back a an empty result
right away
实际上，它可以直接跳过扫描，并返回⼀个空的结果给我们
35:29 - 35:31
so you may say all right well this is stupid
So，你们可能会说这种写法很愚蠢
35.31-35.32
why would anybody write 1=0
为什么会有⼈写1=0这种东⻄
35.32*-35.34
nobody would actually do this number a won't
实际上没⼈会写这种东⻄
35:34 - 35:37
correct theory people you know people shouldn't be that stupid
这么说没错，⼈们不会这么愚蠢
35:37 - 35:44
but a lot of times in applications ,the the queries not gonna be constructed from a single
line of code
但在应⽤程序中，很多时候，查询并不是由⼀⾏代码所构建出来的
35:44 - 35:51
you're not gonna have a string variable in your application code, that you then just you
know immediately send off to to the database server
在应⽤程序代码中，我们不会将我们的SQL语句保存在⼀个String变量中，然后⽴刻发送给数据
库服务器
35:51 - 35.53
a lot of times
在很多时候
35.53-35.56
these SQL queries are constructed from like dashboards and tools
SQL查询可以通过像dashboard和相应⼯具来进⾏构建
35.56-36.00
where people click from different things, adding different options or composing the
query
⼈们会去点击不同的东⻄，将不同的选项添加整合到查询语句中
36:00 - 36:05 ！！！！
so now a buncha different libraries so that a bunch of different functions are all to be
constructing a a SQL query
So，我们可以通过不同的库中的不同函数来构建⼀个SQL查询
36:05 - 36:10
So there's not one single place you can look in the code, and see you know where 1=0
So，你可能并没有在这些代码中某个地⽅看到1=0这种东⻄
36:11 - 36:16
it may come from some other function from some other part of your organization from
code that you didn't write
它可能是来⾃于⼀些你项⽬中并⾮你写的那些其他代码（知秋注：我们的项⽬往往多⼈协作开
发）
36:17 - 36:20
so if the database can recognize this that this is stupid and not do this
So，如果数据库系统可以识别出这个愚蠢的东⻄，并且不去执⾏它的话
36:20 - 36:21
this is a huge win for us
对我们来说这就是天⼤的好处
36.21-36.25
because now we don't even have to look at the data
因为我们现在不需要去查看这些数据了
36:25 - 36:30
likewise you can do the opposite you can have one where everything's gonna match 1=1
同样，你可以进⾏反向操作，即当条件为1=1，我们直接忽略它（知秋注：所谓的反向，即设定
的这个条件的哪怕存在，在这⾥，我们当它不存在就好）
36:31 - 36:34
right so in this case here, every tuple is gonna match
So，在这个例⼦中，每个tuple都符合条件
36:35 - 36:39
but I don't want to actually I don't want actually apply this predicate and see whether
they're gonna match
但我不想使⽤这个判断条件，并看看这些tuple是否符合条件
36:40 - 36:41
again if I have a billion Tuples
如果我有10亿个tuple
36.41-36.49
I don't want to have to go through every single tuple ,and say hey for this tuple does 1=1
true yes, I'll put it next tuple but what does 1=1 yeah, it's true I'll put it right
我不想对每个tuple都进⾏检查，⽐如说：这个tuple符合1=1这个条件吗？符合，我将它放到结
果集中，接着再看下⼀个tuple，符合条件，放⼊结果集
36:50 -36.50
instead
相反
36.50-36.53
I can say well I don't need to do this 1=1 at all
我可以说，我根本不需要这个1=1
36.52-37.00
and now I just do a sequential scan straight dump of the table as the output, and not
worry about applying any predicates
我可以直接对整个表进⾏循序扫描，直接将这个表转储作为输出结果，我不⽤关⼼任何条件
37:01 -37:03
alright then that's cutting down on the computational calls
这样就减少了计算调⽤
37:04 - 37:07
I think I says you just rewrite it like select star from A
你可以将它直接重写为SELECT * FROM A;
37:09 - 37:11
alright so these are pretty simple
So，这些例⼦都很简单
37.11-37.13
but we can do this for other things more complex queries
我们可以在⼀个更复杂的查询中使⽤这些⽅案
37:13 - 37:15
we do the same kind of thing for joins
我们可以在join操作中也使⽤这种优化
37:16 - 37:19
so here now on my table a this scheme is up there
So，A表的schema在左上⻆
37:19 - 37:21
the primary key is the ID column
它的主键是id这⼀列
37:22 - 37:23
so here I'm doing a self join
So，这⾥我对我⾃⼰进⾏join操作
37.23-37.29
where A as a1 joined on A as a2 on A1.ID = A2.ID
SQL语句如图所示
37:30 - 37:31
So what is this query actually saying
So，这个查询语句实际要表达的是什么呢？
37.31-37.38
it's saying for every single tuple on A, check to see whether it exists in A
它想表达的是，对于A中的每个tuple来说，看看它是否存在于A表中
37:38 -37:.39
and of course it's always gonna be true
Of course，这肯定是存在的
37.39-37.41
because we know ID is the primary key
因为我们知道它的主键是id
37:41 - 37:44
So do I exist in this other table, the answer is always gonna be yes
So，对于它是否存在于这个表中，答案始终是Yes
37:45 - 37:50
so it can identify that this predicate is entirely wasteful with this join is entirely wasteful
So，数据库系统可以识别出join操作中的这个条件完全是⽆⽤的
37.50-37.52
and is rewrite it as select * from A
它就可以将其重写为SELECT * FROM A
37:53 - 37:56
and again relying on relational algebra equivalencies
根据关系代数的等价性来看
37.56-37.59
we would know that this is equivalent to this
我们知道这两个SQL语句是等价的
37.59-37.59
yes
请问
38:03 - 38:05
because that his question is
他的问题是
38.05-38.08
why conditioned on ID being the primary key
为什么这⾥join操作的条件是根据这个主键id
38:08 - 38:10
because you know it's unique and you know it's not null,
因为它是唯⼀的，并且⾮空
38.10-38.16
so therefore you can rewrite it
因此，你可以对它进⾏重写
38:16 - 38:17
if it could be null
如果它可以为null
38.17-38.18
then null doesn't equal null
那么，null并不等于null
38:19 - 38:21
So therefore you wouldn't have a match
因此你就不会有符合条件的tuple
38:22 - 38:27
right ,null it's always null， like null we can over the turban I'll try this
null始终是null
38:27 - 38:28
One doesn't equal null
1不等于null
38.28-38.34
actually the the result of this 1=null is null,right
实际上，1=null的结果是null
38:34 - 38:35
you just unknown
你的意思是它的结果是unknown
38:36 - 38:40
so your question is is null =null unknown
So，你的问题是null=null的结果是unknow
38.40-38.44
it`s null null, I think that one actually evaluate to true
我觉得null=null的结果应该是true
38:46 - 38:48
But in this case here if it's null then it won't work
但在这个例⼦中，如果这⾥是null，那么它就不会奏效
38:51 - 38:53
all right so what are more complicated things we do
So，我们还能做哪些更复杂的事情呢？
38:53 - 38:57
so we can also now ignore projections that are unnecessary
So，现在我们也可以将哪些不必要的projection操作给忽略掉
38:58 - 38.59
so in this one here
So，在这个例⼦中
38.59-39.02
this is sort of a rewrite of the of the last query the self join
我们对最后那个⾃⼰对⾃⼰进⾏join操作的SQL语句进⾏重写
39:02 - 39:04
so this is a select star from a
我们将它重写为select * from A
39.04-39.07
and then in my where clause I have an exists
然后，在我的where⼦句中，我有⼀个exists⼦句
39:08 - 39:16
where I just say this basically says return true, if there's anything that matches any any
result inside the the inner query here
即如果有任何符合内部查询条件的tuple存在，那么exists就会返回true
39:17 - 39:18
so this is saying
So，这⾥要说的是
39.18-39.20
if for every tuple in a
对于A表中的每个tuple来说
39.20-39.27
produce the output if there exists a tuple where the a1.ID equals the a2.ID
如果存在着这样的tuple，即A1.id等于A2.id，那么这⾥就会⽣成输出结果
39:27 - 39:30
and again the primary key, so it's always gonna match
这⾥⽤的是主键，所以这始终都符合条件，即为true
39:30 - 39:34
so inside of this we're materializing or have a projection on the val column
So，在这个内部查询⾥⾯，我们会对val这⼀列进⾏projection操作
39:36 - 39:37
but this is completely unnecessary
但这⼀步是完全没必要的
39.37-39.39
right this is us having to do not only the exist will join
这⾥不仅存在了要对exists得到的集合进⾏join操作
39:39 - 39:44
but also copy this projection which is copy this attribute out
我们也要去通过映射去复制这个属性
39:44 - 39:47
it's part of projection and that's unnecessary as well
这部分projection操作也是没有必要的
39:48 - 39:49
right so in this case here
So，在这个例⼦中
39.49-39.56
we can just rewrite this entirely this part here it is entirely like a select * from a
我们可以对这条SQL语句进⾏完全重写，我们将它重写为SELECT * FROM A
39:58 - 40:00
the last one is to emerging predicates
最后要讲的就是条件合并
40:01 - 40:10
so this one here we have select star from a where val between 1 and 100 and bow
between or val is between 50 and 150
SQL语句如图所示
40:11 - 40:12
So in this case here
So，在这个例⼦中
40.12-40.15
if you just think of the number line, this is completely redundant
如果你思考下数字区间，那么你就会觉得这条件完全是多余的
40.15-40.22
because if it's between 1 and 100，then it can also can be between 50 and 150 if it's
between 50-100
如果它是在1和100之间，那么它也可以在50和100之间，它也可以在50到150这个范围内
40:22 - 40:27
so for this one here ,I could rewrite this to be a single between cause
So，在这个例⼦中，我可以将它重写为⼀个单个between⼦句
40:28 - 40:30
where 1 between 1 and 150
即where between 1 and 150
40:34 - 40:34
okay
40:37 - 40:41
select so this is how you know this is sort of obvious to see how how you want to do this
你们很明显就能看出这该如何优化
40:41 - 40:43
let's see whether who actually does it
我们来看下哪个DBMS实际是这样做的
40:45 - 40:46
because everybody loves demos,right
因为你们所有⼈都喜欢看我演示Demo，对吧
40:49 - 40.50
so as I said that
So，正如我所说的
40.50-40.55
blog article that I mentioned has has source code you can download
你们可以去下载那篇博⽂中的源码
40.55-41.01
and includes the the schema and insert statements for for a bunch of DBMS
这⾥⾯包含了schema以及⼀堆DBMS中的insert语句
41:01 - 41:02
so unfortunately
So，不幸的是
41.02-41.03
broke my SQL server installation yesterday
我昨天打断了SQL server的安装
41.03-41.05
so I can't get to work
So，我没法搞定这个问题
41.05-41.12
but I'll do a demo on Postgres MySQL Oracle MariaDB and in SQLite
但我会使⽤PostgreSQL，MySQL，Oracle，MariaDB以及SQLite来进⾏案例展示
41:13 - 41:17
So again the the schema looks like this I'm not ,sorry
So，如图所示，这是它的schema
41:25 -41:31
right so the the sample data is we're gonna use its it's like a it's like a online video store
So，这⾥我们要使⽤的样本数据是⼀个在线视频商城的数据
41:31 - 41:36
but it's sort of like the IMDB stuff you looked at there's actors ,and then people are
rating movies right
这有点像imdb之类的东⻄，上⾯有演员，以及⼈们对电影的评分
41:36 - 41:38
but we're gonna focus on the actor table
接着，我们将重⼼放在actor表上
41:38 - 41:41
so again the nice thing about this is that
So，这⾥⽐较nice的地⽅在于
41.41-41.50
the they provide for the same you know the same database for all these different for all
all these different database servers
它们为所有不同的数据库系统提供了同⼀个数据库
41:50 - 41:52
right so again there's two hundred tuples in this
So，这张表中有200个tuple
41.52-41.59
and then we'll just go into to MySQL real quickly select star or sub count star from actor ;
接着，我们回到MySQL，来快速输⼊下刚刚输⼊的那条SQL语句

14-03
41:59 - 42:01
alright there's 200 in every single one okay
在这张表中有200个tuple
42:03 - 42:07
so the first thing we want to try out is that impossible query where 1=0
So，⾸先我们要尝试的是⼀个不可能得到任何结果的查询，它的条件是1 = 0
42:08 - 42:10
so again what I'm doing here is
So，这⾥我所做的事情是
42.10-42.13
for Postgres ,right this is Postgres
对于PostgreSQL来说
42.13-42.15
you have explained keyword will spit up the query plan
我们通过关键字explain来将查询计划分开
42:16 - 42:21
and then you put the analyze modifier after explain that will actually run the query
然后我们在explain后⾯放关键字analyze，这会让它实际去执⾏这个查询
42:21 - 42:24
But then still show you either the query plan and what it actually did
但它这⾥依然会向我们展示查询计划，以及实际如何执⾏查询的
42:25 - 42:27
Right,so in this one here
So，在这个例⼦中
42.27-42.30
it says up above one time filter is false
它上⾯说one-time-filter处是fasle
42:31 - 42:36
so it recognized that 1=0 is always going to evaluate to false
So，它意识到这⾥1=0的结果始终为false
42:36 - 42:41
so it applied the filter once so that for the entire table no tuple is ever gonna match
So，它在这⾥过滤⼀次，这样对于整个表来说，就不会输出任何匹配的tuple了
42:41 - 42:45
so it didn't actually didn't actually run and run read the data
So，这实际上也就不会去执⾏这个查询计划并读取数据了
42:45 - 42:47
It said oh it's false
它说：Oh，这⾥是false
42.47-42.50
it's nothing gives you back nothing right away
这个查询不会返回给你任何东⻄
42:52 - 42:54
so we can do this in MySQL
So，我们也可以试下在MySQL中，这会发⽣什么情况
42:54 - 42:58
so then MySQL explained is not as good ，like if you just do this
So，MySQL对于explain的⽀持并不是那么好，如果你像我屏幕上这样做的话
42:59 - 43:01
then you get something like like this
那么你就会得到如图上这样的结果
43.01-43.03
but if you do the for whatever reason
不管出于什么理由
43.03-43.05
the \G
这⾥我们输⼊\G
43.05-43.06
then you can actually get a tree
那么你就会得到⼀个树形显示图
43.06-43.09
it is one of those
这就是上⾯所展示的内容
43:09 - 43:12
but here you see the in the extra parameter they say impossible where
但你可以从上⾯看到，在这个Extra中，它表示这⾥有⼀个impossible where
43:13 - 43:14
so I recognize that nothing's ever gonna match
So，我就会意识到，这⾥不存在任何符合条件的tuple
43.14-43.17
don't even bother applying that where clause
我们甚⾄都不⽤再去理会这个where⼦句了
43:18 - 43:20
it also has this little warning thing here which is annoying
这⾥它也给我们提了⼀个⼩警告，这有点烦⼈
43.20-43.23
this is MySQL 5.7
这⾥我所使⽤的MySQL版本是5.7
43:23 - 43:28
I I don't know what it's been fixed in in MySQL 8
我不知道这个问题在MySQL 8中有没有修复
43:30 - 43:33
but you have to run show warnings
但如果你输⼊show warnings
43.33-43.35
and then it spits out like what actually happens
那么它就会告诉你，这⾥⾯实际发⽣了什么
43:35 - 43:36
so you see here
So，来看这⾥
43.36-43.37
in the where Clause
在where⼦句这⾥
43.37-43.40
they rewrote my 1=0 that is wrote that as 0
它们将我的1=0改写为0
43:40 - 43:41
so everything evaluates to false
So，所有条件就被评估为false了
43:42 - 43:42
right
================
43:44 - 43:49
so now we'll try in and let's do Oracle
So，我们再以Oracle为例
44:00 - 44:00
so with Oracle
So，在Oracle中
44.00-44.01
the way it works is
它的⼯作⽅式是
44.01-44.04
I say explain plan for
这⾥我写的是explain plan for
44.04-44.05
and the syntax is always slightly different
不同的dbms间的语法会存在着略微差异
44:05 - 44:07
and it says explained
它给我们返回了explained
44:10 - 44:12
which now I got to go now to another table
现在，我就得跑到另⼀张表上
44.12-44.17
it has the the plan that it got explained
它上⾯放着刚刚explain过的查询计划
44:17 - 44:24
so the Oracle explained is actually is exactly better than Postgres
So，实际上Oracle中的explain要⽐PostgreSQL中的来得更好
44:24 - 44:25
Postgres one is very good
PostgreSQL对explain的⽀持做得⾮常好
44.25-44.25
this one is actually pretty good too
当然Oracle做得也很棒
44.25-44.28
because it shows you like you know computational time
因为它向我们展示了计算时间
44.28-44.31
then I'm at row and data there accessing is actually really nice
以及我要访问的⾏和数据，这点实际上⾮常nice
44:32 - 44:33
so what are they saying here
So，Oracle这⾥想展示的是什么呢？
44:33- 44:34
all right so this says that
So，它这⾥表示
44.34-44.36
it knows I'm doing select statement and it has a filter
它知道，我这⾥执⾏的是select语句，⾥⾯有⼀个filter
44.36-44.38
and it says how I'm gonna access the table
它⾥⾯描述了我访问这张表的⽅式
44:39 - 44:42
Right, so the thing to point out though
So，这⾥要指出的⼀点是
44.42-44.42
down here
我们往下看
44.44-44.45
they have information with the predicate
它们这⾥给我们提供了条件判断这部分的信息
44:45 - 44:49
so they say we're filter null is not null
So，它们说，filter这⾥的信息是Null is not Null
44:50- 44:53
So Oracle doesn't doesn't support boolean
So，Oracle并不⽀持boolean类型
44:53 - 44:55
right so it has no way to say true or false
So，它没有办法说，这是True还是False
44:56 - 45:00
so it rewrote my does 1=0 to be null is not null
So，它将我的1=0改写为Null is not Null
45.00-45.02
which is always false
其实这代表就是始终是false
45.02-45.04
because null is null
因为Null就是Null
45:05 - 45:08
so this is their this is the way they're representing false
So，这就是Oracle⽤来表示false的⽅式
45:08 - 45:10
so they rewrote now the query plan
So，它们对我的查询计划进⾏改写
45.10-4511
recognize that this thing that's false
它们意识到where这⾥的结果是false
4511-45.12
and therefore you don't actually have to run it
因此，实际上我们不需要去执⾏这个查询计划
45:14 - 45:15！！！！
let's just go back to Postgres quickly
让我们回到PostgreSQL这⾥
45.15-45.18
and - well he was asking before right
Well，正如刚才有位同学提到的问题那样
45:18 - 45:20
so I can say select ,right
我可以编写这样的SQL语句
45:20 - 45:21
I can treat the database system like a calculator
我可以将数据库系统当做计算器来使⽤
45:22 - 45:23
but I can say select null
⽐如，select Null
45:23 - 45:26
right that's nothinh
我们执⾏这条SQL语句后，什么也没发⽣
45.25-45.27
but there's null = null
但这⾥null是等于null的
45:27 - 45:29
nothing it's null,
什么也没返回，它是null
45.29-45.30
it`s null equal false,
null等于false吗？
45.30-45.32
Null nothing right
还是啥也没返回
45:32 - 45:34
this is false equal to false
false是否等于fasle呢？
45.34-45.36
true is true you know just
True的话呢？
45:38 - 45:41
So anything that any any time you say there's null equals something
So，在任何时候，你们都会说null肯定等于什么东⻄
45.41-45.42
the answer is null
答案就是Null
45.42-45.43
the empty space is null
空格代表的意思就是null
45:44 - 45:48
the way to get around that is null is null
那么我们来看下Null是否等于Null
45.48-45.48
then it's true
答案为True
45:49 - 45:52
so what Oracle is doing is null is not null
So，我们再来看下Null是不是Not Null
45.52-45.53
false
答案为false
45:54 - 45:54
ok
45:58 - 45.58
all right
45.58-46.01
so then last one we would do SQLite
So，最后我们再以SQLite为例
46:07 - 46:08
again the syntax is always different
再说⼀遍，不同DBMS间的语法总是不⼀样的
46.08-46.14
they have explained query plan without for ,and then it produces this
这⾥它们的语法是explain query plan，没有for，后⾯跟着我们要解释的SQL语句，执⾏⼀下，
它给我们返回了这个
46:14 - 46:15
so this is not actually that helpful
So，实际上，这对我们并没有什么帮助
46.15-46.19
right this is just telling us that we're doing some kind of scan on the actor table
这只是告诉我们，我们对actor表进⾏了某种扫描
46:20 - 46:22
so if we removed the query plan part
So，如果我们将关键字query plan这部分移除
46.22-46.27
then you get something that looks a lot different than when everybody else should
那么我们就会得到⼀些和其他dbms不同的返回信息
46:27 - 46:29
now you get something that looks like assembly or some kind of machine code
现在，我们就得到了看起来和汇编很像的，机器码之类的东⻄
46:30 - 46:33
so without going to the details of the way SQLite works
So，这⾥我们不会去深⼊SQLite的⼯作细节
46.33-46.43
is that they actually convert the logical plan or the physical plan that the optimizer spits
out into a bunch of these opcodes
实际上，SQLite会将查询优化器所输出的逻辑计划或者物理计划转换为⼀⼤堆opcode
46:43 - 46:45
Think of this is like the JVM bytecode
你们可以将它想象为JVM的字节码
46:45 - 46:46
And then they have an interpreter
接着，它们有⼀个解释器
46.46-46.49
that can they'll get and now execute these bytecode
通过解释器，它们就可以去执⾏这些字节码
46:49 - 46:53
so this is like this is literally the program to execute this particular query
So，从字⾯上来看，这就是⼀个执⾏特定查询的程序
46:53 - 46.56
and so from what I can tell, right they say
So，从上⾯我能得出的东⻄来说
46.56-46.58
where r1 is not equals r2
r[1]不等于r[2]
46.58-46.59
I'm not exactly what that means
我并不完全清楚这意味着什么
46.59-47.01
then you go to ten
然后，我们跑到addr 10那⾥
47:03 - 47:04
but in this case here
但在这个例⼦中
47.04-46.04
it looks like they're actually doing doing the scan here
它看起来在这⾥（表信息）进⾏了扫描
47:06 - 47:10
so the best I can tell I'm not sure whether they're actually stripping this out
So，我不清楚它们是不是将这个剥离了
47:11 - 47:12
actually no
实际上没有
47.12-47.14
not equals this
这⾥r[1] != r[2]
47.14-47.15
yeah it may be truncating it there
它可能是在这⾥对表进⾏truncate操作
47.15-47.18
recognizing that I don't have to do a scan
它意识到，这⾥我不需要对表进⾏扫描
47:18 - 47:20
all right so everybody can handle this
So，每个⼈数据库系统都能处理这个问题
47.20-47.23
this is good
这很棒
47:23 - 47:25
so let's try now the useless predicate
So，我们来试⼀下它们是如何处理那种没有效果的条件判断的
47.25-47.27
let's try the 1=1
我们来试下1=1
47:27 - 47:28
let's go back to Postgres
先来试下PostgreSQL
47:30 - 47:34
well now it looks like it's telling us it's actually doing it
Well，这⾥它告诉我，它实际是怎么做的
47:35 - 47:37
well it should do it cuz it's 1=1
Well，它这⾥应该执⾏了这条SQL查询，因为1=1（始终为true）
47:37 - 47:42
right so this is just saying that I recognize that I can remove the filter ,and I just execute
the query right away
So，这⾥它说，我意识到我可以将这个filter给移除掉，我只需要执⾏查询部分就⾏了（知秋
注：屏幕输出部分可以看到，做的动作是循序扫描）
47:44 - 47:48
try the same thing in in MySQL
我们再来MySQL中试⼀下
47:53 - 47:54
no analyze sorry
抱歉，我这⾥多写了analyze
48:01 - 48:07
right and this one it figured out that it can just throw away the filter entirely and just
scan everything
如图所示，从这⾥可以看出，它可以将filter这⼀步删掉，然后直接全表扫描
48:07 - 48:08
so that's good
So，这还⾏
48.08-48.10
let's try Oracle
我们来试试Oracle
48:18 - 48:21
explained and then go back to this
对SQL语句进⾏explain，然后给我们返回了这个
48:22 - 48:23
right the filter is completely gone
它这⾥把filter完全移除了
48.23-48.27
it just now it's just straights sequential scan
它这⾥就直接进⾏了循序扫描
48:27 - 48:29
and then for SQLite
接着，我们再来试⼀下SQLite
48:33 - 48:34
this is not helpful
这样写对我们没什么帮助
48.34-48.36
so we'll remove that query plan part
So，我们将query plan这边移除掉
48:37 - 48:39
and then now you see that
接着，我们可以看到
48.39-48.41
it's inside of this the for loop here
在这个for循环⾥⾯
48.41-48.45
where they're scanning over the table, they've removed the predicate
它们对整个表进⾏扫描，并且它们也已经将判断条件给移除了
48:46 - 48:46
all right
48:48 - 48:56
so let's look at an example where you have heuristic could look at the catalog and try to
figure out what the right thing to do is
So，我们来看⼀个能给你有所启发的例⼦，我们会去查看System Catalog，并且试着弄清楚正
确的做法是什么
48:57 - 49:02
so the schema for the the actor table is pretty straightforward
So，actor表的schema⾮常简单
49:03 - 49:07
right we just have an actor first_name last_name and last_update
这⾥我们只有4个字段，即actor_id，first_name，last_name以及last_update
49:07 - 49:11
Okay, so what we're gonna try to do here is
So，这⾥我们所要试着做的事情是
49.11-49.14
we're going to try to have a query
这⾥我们想要进⾏⼀次查询
49.14-49.17
where we say the where the actor_ID is null
这⾥我们想找到actor_id为null的所有记录
49:19 - 49:21
so we want to run this query
So，我们想执⾏这条查询
49:22 - 49:24
and so what should happen here is that
So，这⾥所会发⽣的事情是
49.24-49.27
we would look in the catalog and say well the actor_ID is the primary key
我们会去查看下catalog，并说：Well，actor_id是这张表的主键
49:28 - 49:30
And it can't be null
它不可以为null
49:31 - 49:36
so therefore I know that no tuple will match my predicate
因此，我就知道这⾥不会有任何符合我条件的tuple
49.36-49.42
and therefore I can remove that that where clause or to just end of return back
immediately the you know an empty set
因此我就可以将这个where⼦句移除，或者就直接返回⼀个空集
49:43 - 49:55
so this is an example ,where the rewriting phase those rules could look in the catalog
and understand something about the table or the attributes that are being being you
know it may be accessing the predicate, and start throwing out crap that's useless
So，在这个例⼦中，当我们经历重写这⼀阶段的时候，它通过这些规则会去查看catalog并理解
它可能会访问的该表相关信息或者属性，以此来丢掉SQL语句中那些没⽤的部分
49:56 - 49.58
so just to prove that
So，为了证明这⼀点
49.58-50.05
that our table cannot support,no attributes for the idea for the in the actor_ID,
我们的表不⽀持主键字段为null的情况，即actor_id属性的值为null
50.05-50.09
if I try to insert a tuple with a null for the first column
如果我试着插⼊⼀个第⼀列为null的tuple
50:09 - 50:12
then it you know Postgres picked it out and says there's an error
接着，PostgreSQL就会发现这⾥⾯有⼀个错误
50:13 - 50:16
if I try to do the same thing in in Oracle
如果我在Oracle中也做这种事情
50:18 - 50:22
Oracle flips out says that the actor_ID can't be null throws an error
Oracle就会说，这个actor_id不能为null，并且它抛出了⼀个错误
50:23 - 50:24
let's try this in MySQL
我们在MySQL中也试⼀下
50:27 - 50:29
MySQL does not have default
MySQL中没有DEFAULT
50.29-50.31
I think we gotta go current timestamp
我们就使⽤Current_TimeStamp
50:31 - 50:33
actually new default should work here
但实际上我觉得DEFAULT应该是可⾏的
50:38 - 50:39
let me insert it
我成功插⼊了这条tuple
50:41 - 50:44
let's see whether that's actually in there
我们来看下有没有成功插⼊
50:45 - 50:48
we're last_name = Pavlo
我们来找下last_name是Pavlo的那条数据
50:50 - 50:51
let me do it
它确实让我插⼊了这⼀条tuple
50:52 - 50:58
right cuz the way MySQL works is the the the actor_ID is an auto_increment Key
因为MySQL的⼯作⽅式是actor_id这个属性是⼀个⾃增键
50:59 - 51:02
so instead of in this version of MySQL
So，在这个MySQL版本中（5.7）
51:03 - 51:08
instead of throwing an error, if I try to insert null it says oh you're an auto increment key
如果我试着插⼊⼀个null（主键那⼀列），它不会给我报错，相反，它会说：Oh，这是⼀个⾃增
键
51:09 - 51:13
so go go ahead and let me just run that and replace the null with the next value
So，它就会继续执⾏这个SQL语句，并将这个null替换为下⼀个值
51.13-51.16
whereas every other system will throw an error says you trying to insert null
然⽽如果你这⾥插⼊null的话，其他系统就会给你报错
51:16 - 51:17
MySQL will let you do it
MySQL则允许你这样做
51:18 - 51:19
alright but let's let's try to run our query
让我们来执⾏下我们的查询吧
51:20 - 51:22
so we know that that no attribute should actually null
So，我们知道所有属性的值都不应该是null
51.22-51.25
the no tuple should have a null actor_ID
所有tuple的actor_id都不应该是null
51:27 - 51:31
so we try to run this query now where actor_id is null
So，我们来试着运⾏这个下个查询
51:34 -51:37
Right Postgres that looks like it actually is going to run it
看起来PostgreSQL是执⾏了这条SQL
51:42 - 51:44
now she did run it
它确实执⾏了这条语句
51.44-51.48
right applied the filter and remove two hundred tuples
它对数据进⾏了过滤，并移除了200个tuple
51:48 - 51:55
so Postgres was not able to recognize that no tuple was at actor_ID could ever be null
and not actually run it
So， PostgreSQL没能意识到actor_id的值不能为null，并且它不应该执⾏这个查询
51:56 - 51:57
and actually and still ran it
但实际上，它依然执⾏了这个查询
51:58 - 52:01
let's try it in in MySQL
我们再来试⼀试MySQL
52:06 - 52:08
MySQL go figure it out impossible where
MySQL表示：这是⼀个impossible where
52:09 - 52:12
and it can be like ignore it
它可以将这个查询给忽略掉
52:13 - 52:16
try it in SQL server or sorry in or Oracle
我们再来试⼀下Oracle
52:20 - 52:20
explained
对该SQL查询进⾏explain⼀下
52:24 - 52:26
and then there's our lovely null is not null
然后，我们看到了可爱的Null is Not Null
52.26-52.27
there's our false
也就是false
52:27 - 52:31
so a recognize that this is this is never good actually gonna evaluate to true and get
thrown away
So，Oracle意识到，这个filter的结果不可能评估为true，所以它将这个抛出来了
52:32 - 52:34
so Postgres actually got it wrong
So，PostgreSQL的做法就是错误
52:35 - 52:37
MySQL gonna walk around it right
MySQL则是对这种情况进⾏了处理
52:38 - 52:39
All right two more examples
再来看两个例⼦
52.39-52.42
let's do now that range query we have before
我们来做下，我们之前看过的范围查询
52:43 - 52:45
where we want to say
这⾥我们要做的事情是
52:48 - 52:56
we want to get all the films that are where the film_ID is between one and two and
film_ID between 199 and 200
我们想找到film_id在1和2之间并且film_id在199和200之间的那些film
52:56 - 52:58
so this is again another impossible where
So，这⼜是⼀个impossible where
52:59 - 53:01
right so nothing should come back
So，这⾥应该啥也不会返回
53:03 - 53:04
we're on explain
我们对这条SQL进⾏explain⼀下
53:05 - 53:09
so Postgres couldn't figure it out
So，PostgreSQL没法搞定这个
53:10 - 53:13
right it's doing that lookup that that should never happen
从上⾯可以看出，它对表中的数据进⾏了查找，实际这不应该发⽣的
53.13-53.15
that would never produce any results
并且这也不应该⽣成任何结果
53:16 - 53:20
in in MySQL
在MySQL中
53:25 - 53:26
this one I'm not sure about
其实这个我不太确定
53.26-53.28
there's no matching no matching row in const stable
它这⾥给我们返回的是No matching row in const table
53:28 - 53:31
I think this means that they were able to figure it out
我觉得它的意思是，它能够做到忽略这个过滤条件
53:32 - 53:32
that they
53:35 - 53:37
yeah this one I'm not sure about
这个我确实不太确定
53:38 - 53:39
this it has a warning though
它这⾥也有⼀个警告
53.39-53.41
see what see whether he wrote it to
我们来看下它写了什么
53:47 - 53:48
this question
他的问题是
53.48-53.52
isn't this a status fearless I build a problem and which is np-complete, yes
这⾥是不是存在了np-complete的问题（np-complete⽤于计算复杂性）
53:53 - 54:00
but like but for basic things I can I could identify that it's never going to you know
produce anything and throw it away
但我可以确认的东⻄是，这⾥它不会⽣成任何结果，也不会抛出任何错误
54:09 -54:13
so this is this one or actual crisis no no no hope
54:14 - 54:14
for this one
对于这个问题
54.14-54.16
you could have a rule
你可以使⽤这样⼀条规则
54.16-54.17
you could write a heuristic that says
你可以写⼀条试探规则，并说
54.17-54.22
if I have if I do all my lookups on on the on a given attribute
如果我根据⼀个给定的属性来对数据进⾏查找
54:25 - 54:31
right and I have a range here between 1 and 2 inclusive and between 199 and 200
这⾥我们有两个范围，⼀个是1和2之间，另⼀个是199和200之间
54:32 - 54:36
The sets don't intersect, and it's conjunction
这些集合是不相交的，但这⾥我们取的是它们的合集
54.36-54.38
where I had to have both of them, I know it'll never match I can throw it away
即我们要取它们的相交部分，我知道这张表中不可能有符合这个条件的tuple，于是我可以将它
丢弃了
54:39 - 54:43
that's like that one that's not sad that's pretty straightforward
这不难，其实很简单
54:43 - 54:47
all the parts are satisfiable you have to do with that yes
如果所有部分都能满⾜（即满⾜所有条件），那我们就得对这个SQL进⾏处理
54:48 - 54:48
all right
54.48-54.50
so any questions about what I'm showing here
So，对于我这⾥所展示的东⻄，你们有任何问题吗
54:50 - 55:02 ！！！！！！
I'm showing that you can just reason about what the query looks like, without actually
looking at the data, without actually having to run anything, and determine whether you
know it's a ways to simplify the predicate
这⾥我所展示的是，在⽆须查看数据，⽆须真正执⾏SQL的情况下，就可以判断是否有⼀种⽅式
可以简化条件判断
**** 此处有剪辑痕迹 youtobe上也是 ****
55:07 - 55:10
We`ll lead into now the discussion of a how are actually estimates
现在我们来讨论下该如何对此进⾏估算
55:12 - 55:18
So the for these simple demos here, this join a pretty straightforward
So，对于这些简单案例来说，这⾥我们所做的join操作并不复杂
55:19 - 55:23
so we can you know easily maybe a reason about which one should be the inner versus
the outer
So，我们可以很容易地判断出哪些操作在括号外⾯，哪些操作在括号⾥⾯
55.23-55.26
things go bad though when you start having a lot more join
如果我们要做的join操作越多，那么情况就会变得很糟糕
55:27 - 55:31
because the complexity of the problem of making this decision is going to explode
因为问题的复杂性太⼤的话，会让我们的脑⼦爆炸，以⾄于很难做出判断
55:32 - 55:42
so the number of different ways we can do a join for for a query ,when we have n tables
to join is gonna be 4N
So，对于⼀个查询来说，如果我们要对n张表进⾏join，那么我们可以使⽤的不同join顺序的数
量就是4^n
55:43 - 55:49
so this clearly there's no way we can enumerate every single possible join ordering ,and
for our query and try to figure out the best one
So，很明显，对于我们的查询来说，我们没办法去⼀⼀枚举出每种可能的join顺序，并弄清楚哪
种才是最优的
55:49 - 55:51
alright you know it's a large number when it has a name
你知道的，你看到这个名字的时候，就知道它是⼀个很⼤的数字
55:52 - 55.53
right
55.53-56.02
so we're gonna see how the database system is going to be able to strip down the
number of different combinations and plans that have to enumerate for these join
orderings
So，我们之后会看到数据库系统是如何减少要枚举的这些join执⾏顺序中不同组合以及查询计划
的数量
56:03 - 56:05
and that's going to reduce the search base of the problem
这会减少搜索基数所带来的问题
56:06 - 56:07
but before we get there
但在我们做这⼀步之前
57.07-56.15
we need to understand how we're actually gonna estimate, how much work we're gonna
do for these join or these different scans
我们需要去理解我们该如何预估执⾏这些join或者不同的扫描操作时所需要的⼯作量有多少
56:15 - 56:16
so I've already said this a little bit before
So，我之前就已经稍微提到过这个了
56.16-56.25
but the the cost model is gonna allow us to assess or an estimate how much work we
think we're gonna have to do in our database system
成本模型能够让我们去预估我们在数据库系统中执⾏操作时所需要的成本
56:25 - 56:27
and again this is an internal synthetic number
再说⼀遍，这是⼀个内部的综合数字
56.27-56.36
that is only allows us to compare the relative performance of different query plans, and
we within the same database system，We can't compare across all of them
这只允许我们在同⼀个数据库系统中对不同的查询计划的相对性能进⾏⽐较，我们不能跨数据库
来对其进⾏⽐较
56:37 - 56:39
so this could be a combination of a bunch of different things
So，这⾥⾯涉及了⼀⼤堆不同的东⻄
56.39-56.42
we've already seen that when we talk about join algorithms
我们在讨论join算法的时候，就已经看到过这些了
56.42-56.48
that you want to do you want to base it on the number of disk I'm out of disk IO that I'm
gonna have to do
你会去根据磁盘I/O来进⾏成本预测
56:49 - 56:54
it also tell you how much DRAM ,how much memory space you're gonna have to take up
on your buffer pool as you're computing the the query
它也会告诉你，当你在执⾏查询的时候，你需要使⽤多少DRAM，你的buffer pool得占⽤多少内
存空间
56:55 - 56:56
if you're gonna distribute a database
如果你使⽤的是分布式数据库系统
56.56-56.59
then the number of messages is also an important thing
那么消息的数量也是我们考虑的⼀个重要因素
56:59 - 57:02
because the network IO is slow and inefficient
因为⽹络I/O的速度很慢，并且很低效
57:03 - 57:07
So the the main takeaway for this is that
So，我们从中可以看到的是
57.07-57.14
,the cost models that allow us to say is one plan better than another Without actually
having to run the query plan
在不⽤实际执⾏查询计划的情况下，成本模型能让我们知道，当两个查询计划进⾏⽐较的时候，
⼀个查询计划要⽐另⼀个来得好
57:14- 57:16
because that's the only way to get the actually the true cost
因为这是我们实际知道真实成本的唯⼀办法
57:16 - 57:18
It`s actually run the query plan
它实际上会去执⾏查询计划
57:18 - 57:19
but you don't want to do that
但你不想去这么做
57.19-57.26
cuz if again I've had if I have 4^n different join orderings,I can't run for to the N different
query plans for one query
如果我有4^n中不同的join顺序，我肯定不会为⼀个查询去执⾏这些所有不同的查询计划
57:26 - 57:27
because that'll take forever
因为这样做的话，时间就都会耗在这上⾯了
57:28 - 57:31
so a cost models that allow us to approximate this
So，成本模型可以让我们去预估这些数值
57:32 - 57:37
you know will giving up sacrificing accuracy of our estimates in exchange for efficiency
我们通过牺牲预测的正确性来获得效率
57:38 - 57:43
now there's some database systems, where they don't have a cost model ,they don't
have a query optimizer
有⼀些数据库系统是没有成本模型和查询优化器的
57:43 - 57:48
they actually just fire off all queries and see which one ever comes back first
它们实际上就会去执⾏所有不同的查询计划，然后看看哪个查询计划先返回结果
57:48 - 57:50
and that's the one they pick
它们会去选择这个先返回结果的查询计划
57:52 - 57:55
so the only system that I know that does this is actually MongoDB
So，据我所知唯⼀这么做的数据库系统就只有MongoDB
57:56 - 57:59
right and it seems kind of stupid why would you do this why would you put a cost model
这看起来很蠢，为什么它要这么做，为什么不使⽤成本模型
57:59 - 58:02
Well they weren't supporting join back in the day
Well，因为它们过去并不⽀持Join操作
58:02 - 58:05
and they needed a cost model, they need a query optimizer
它们需要⼀个成本模型，也需要⼀个查询优化器
58:05 - 58:08
so if I have to figure out what index to pick
So，如果我得弄清楚我该使⽤哪个索引
58.08-58.11
and just fire off all queries whichever one comes back first ,that's the one that's the
fastest
那我就直接去执⾏各种查询计划，看看哪个先给我返回结果，先返回的那个查询就是速度最快的
58:12 - 58:15
and then I just remember that every single time I see that same query over and over again
那么我就会记住每次看到相同的查询，我只需要这样执⾏就好了
58:15 - 58:18
and eventually you know they'll run the trial again
你知道的，最终它们⼜执⾏了这个⽅案
58:19 - 58:22
and first as sort of simplistic as it is it actually works quite well for them
虽然这有点简单，但实际上对于MongoDB来说效果不错
58:24 - 58:26
this is where their writes ,doesn't matter right
对于它们的写操作如何？其实没啥问题
58:27 - 58:33
what is the write is doing a like a index lookup to find something right and then you
make the modification,
写⼊操作所做的就是，先使⽤索引查找来找到某个东⻄，然后对它进⾏修改
58:33 - 58:37
the index lookup is the more expensive part finding the data is more expensive than the
actual write
这种⽅式的成本要⽐单纯的写操作⾼得多
58:37 - 58:42
but yes if I'm updating the table and my index is now changing its distribution
但如果我更新我的表，这也会改变我索引的分布情况
58:43 - 58:44
then what they would do is
它们的做法是
58.44-58.45
they would have to have a trigger to says
它们会有⼀个触发器，并说
58.45-58.47
well I've run the same query a thousand times
Well，我已经执⾏同⼀个查询1000次了
58:48 - 58:50
let me refresh and rerun everything again
让我刷新并重新执⾏下
58.50-58.55
or my table is my table in their world collection has changed I've updated by 10%
我的表或者collection，其中有10%的内容发⽣了更新
已经更新了其中10%的内容
58:56 - 58:57
let me just rerun that trial again
那我就要重新执⾏下这个查询
58:58 - 58:59
it's just heuristics
这只是触发了启发式规则（heuristics）
59:00 - 59:00
yes
请问
59:05 - 59:05
his question is
他的问题是
59.05-59.11
are they running sequentially are they running one after another
这些查询是否是有序执⾏了，即⼀个接⼀个地执⾏
59:11 - 59:15
so like MongoDB is a distribute database as far as they know the way they do it is
So，就他们所知，以MongoDB这种分布式数据库为例
59.15-59.19
I have a query that need to run on a bunch of nodes
我有⼀个需要在多个节点上执⾏的查询
59:19 - 59:21
and they have a different segments or partitions of the data
它们拥有该数据的不同⽚段或者分区
59.21-59.26
and they all have the same indexes just based on different parts of the you know the the
table
这些分区分属于表的不同部分，它们都有相同的很多索引（知秋注：要知道⼀张表可能会根据不
同的字段建不同的索引）
59:27 - 59:29
so for this one I'll use this index
So，⽐如对于这个分区，我会使⽤这个索引
59.29-59.30
this one I'll use that index
那个分区，我使⽤那个索引
59.30-59.30
and so forth
以此类推
59.30-59.31
and see which one actually is the fastest
然后我会看看哪个执⾏地最快
59:32 - 59:33
and then you see the same query again
然后，你就会看到相同的查询了
59.33-59.35
that you needed to distribute it across all of these different nodes
你得将这个查询应⽤到所有不同的节点上
59:36 - 59:38
you just pick that same index so that was the fastest one for everyone
你只需选⽤相同的索引即可，因为这是对于所有⼈来说，最快的⽅法
59:39 - 59:41
again super simple but it works pretty well
这种虽然做法简单，但是效果很好
59:45 - 59:45
all right
59.45-59.46
so the way we're going to be able to approximate, the cost of executing a query is the
this is by maintaining internal statistics about what our tables look like
So，我们去预估执⾏查询的成本是通过在内部维护表相关的信息来做的
59:56 - 59.58
this has come up multiple times throughout the semester
这个话题在这学期中已经多次出现了
59.58-1.00.00
where I say oh the database system we can know something about the tables
我说过，我们可以从数据库系统这⾥知道⼀些关于表的信息
01:00:00 - 01:00:01
This is what I mean
这就是我所表达的意思
1.00.01-1.00.02
this is how they're actually able to do this
这也是它们能够做到这点的⽅式所在
01:00:04 - 01:00:06
So inside of the system catalog
So，在System Catalog中
1.0006-1.00.14
we're going to maintain metadata about what our indexes of what our tables look like
,what the values are in the tuples
我们会去维护索引，表以及tuple中的值相关的元数据
01:00:15 - 01:00:19
And then how we're actually gonna maintain this information is gonna vary based on the
different systems
在不同的数据库系统上维护这些信息的⽅式也是不同的
01:00:20 - 01:00:24
so I said like getting a simple heuristic like if my table changes by 10%
So，正如我所说的，如果我的表中有10%的数据被修改了
01:00:25 - 01:00:26
we collect my statistics
我们会去收集我们的统计数据
01:00:27 - 01:00:33
other systems can say well while I run the query also look at look at the tape look at the
data as I'm going along
其他系统会这样做，当我在运⾏查询的时候，我会去查看我要扫描的数据
01:00:33 - 01:00:40
and then propagate you know information about what I see back to my back to my
internal system catalog
接着，它会将我看到的信息传给我内部的System Catalog
01:00:41 - 01:00:43
you can also run this manually
你也可以⼿动这么做
01:00:43 - 01:00:48
so in again this they all vary in the different systems about what the syntax actually is
再说⼀遍，不同的系统中，它们的语法也不⼀样
01:00:48 - 01:00:52
but in general can analyze so the commonality of across all of them
但⼀般来讲，它们之间是存在共性的
01:00:52 - 01:00:54
you call this analyze function
当你调⽤Analyze函数时
1.00.54-1.00.58
and that kicks off a sequential scan that does looks at the data
这会触发⼀次循序扫描来查看数据
01:00:58 - 01:01:02
and again updates this internal information about what the distribution looks like
并更新这些内部的分布信息
01:01:03 - 01:01:07
And then you think it's you you could trigger this based on updates to the table
你可以在更新表的时候触发这个操作
1.01.07-1..01.10
or like a cron job that runs every day or so forth
或者把它作为⼀个⽇常任务，每天都执⾏⼀下，以此类推
01:01:11 - 01:01:12
and we saw about multi version concurrency control
我们之前看过多版本并发控制
1.01.12-1.01.16
let's talk about vacuuming think of that like a garbage collection and the JVM
我们之后回去讨论vacuum，它就像是JVM中的垃圾回收
01:01:16 - 01:01.18
you can run analyze at the same time as well
你可以同时去执⾏analyze
1.01.18-1.01.19
because when you're doing sequential scans
因为当你进⾏循序扫描的时候
1.01.19-1.01.21
you're looking at everything and you can update these things
你会去查看所有数据，并对这些东⻄进⾏更新
01:01:23 - 01:01:27
alright so in the sake of time I'm going to cut it off here
So，因为时间的缘故，我只能讲到这⾥了
01:01:28 - 01:01:34
because now we're actually gonna get to the formulas of how you use the statistics to
estimate these values
因为我们得将这些数据代⼊公式来估测这些值
1.01.34-1.01.36
,well we'll pick up on this next week
Well，我们会在下周讲这块内容
01:01:37 - 01:01:40
and then we'll get into actually how do you do the enumeration in the algorithms as well
我们会去研究如何通过算法来对此进⾏枚举
01:01:41 - 01:01:41
okay
01:01:42 - 01:01:46
alright so again on Wednesday in class
So，再说⼀遍，在周三这节课上
01:01:46 - 01:01:48
we're having the exam
我们会举⾏期中考试
01:01:48 - 01:01:53
it's real, it`s not a joke, one year somebody was like oh I thought you were kidding, no
this is real
这是真的，不是玩笑，⼀年前确实有⼈以为我在开玩笑，但我们是真的有考试
01:01:54 - 01:02:00
bring your CMU ID, bring your sheet of Paper, but notes and then bring a calculator
带好你的学⽣证，笔记纸，还有你的计算器
01:02:00 - 01:02:02
and I'm having office hours immediately afterwards
等下我会去办公室
1.02.02-1.02.04
, but if you need to talk to me
但如果你有问题要问我
1.02.04-1.02.07
and you know at a different time send me an email I'm happy to meet with anyone
如果时间不合适的话，你们可以发我邮件，我很乐意去解答你们每个⼈的问题
01:02:06 - 01:02:06
okay
01:02:08 - 01:02:10
All right guys good luck and see you on Wednesday
All right，祝各位好运，周三考试再⻅

