07-01
07 - Tree Indexes I
(CMU Databases Systems _ Fall 2019)
00:15 - 00:19
Hi guys let's get started ,again round applause would you drop tables
好了，兔崽⼦们，我们开始吧，掌声有请我们的DJ Drop Tables
00:20 - 00:20
Down
安静⼀下
00:21 - 00:23
All right, how are you, it`s okay
你最近怎么样，过的还⾏吗？
00:25 - 00:27
Yeah,okay awesome
还⾏，很好
00:27 - 00:28
All right, before we get started
在我们开始之前
0.28-0.33
I want to go through some comments and feedback we've had on the course
我想先说下关于这⻔课的⼀些评论和反馈
0.33-0.40
on the nose or bane of all the places we could get feedback about the course and that's
YouTube
关于反馈，我收集了下Youtube上的反馈信息
00:40 - 00:43
So here's some of the comments we've gotten so far on on YouTube
So，这是⽬前为⽌，我们在Youtube上所得到的部分评论信息
00:43 - 00:45
And it's the sort of standard stuff right
这个算是⽐较常⻅的评论
0.45-0.49
and he's the worst professor I don't learn anything about databases,that's okay
他是我所⻅过的最糟糕的教授，我根本没学会关于数据库的任何东⻄。（Andy：我太难了）
00:49 - 00:51
He was hoping I get cancer soon
他希望我赶紧得癌症
00:52 - 00:59
This guy says he all my friends all go to CMU ,you they say this professor has the worst
hygiene of anybody on school, he smells like old boiled eggs
这货说，他的朋友都来了CMU，他的朋友们说我是学校⾥最不注重卫⽣的⼈，我身上的味道闻
起来就像是臭鸡蛋
00:59 - 01:02
So that is true, I did you should have a hygiene problem
这⼈说的确实没错，我确实有个⼈卫⽣问题
1.02-1.07
and now you use like a special shampoo, but if it's overpowering ,it was still an issue of
let me know
现在，我都使⽤了⼀种特殊⾹波了，但如果我的体味过重，你们还是让我了解下吧
01:07 - 01:11
And we got feedback about you right, you DJ drop tables beets are so fresh
我们也收到了关于你（Drop Tables）的评论，你的打拍⾮常fresh
1.11-1.16
that I had to take my shirt off and not sure what that means ,and they want us to feature
you more
这让我都爆⾐了，虽然我也不知道什么意思，但它们就是爆了
01:16 - 01:17
Look away this kind of crap
好了，这种废话我们就不看了
01:18 - 01:21
But there is actually one mistake I made last class that people correctly pointed out
但实际上，上节课我讲错了⼀处地⽅，有⼈给我指出来了
1.21-1.24
and when we were talking on hash functions
当我们在讨论hash函数时
01:24 - 01:29
I asked he named sha-256 ,and I think he named md5
上次他说的是SHA-256，但我听成了MD5
1.29-1.36
and I incorrectly said that sha-256 is not a it's not asymmetrical meaning you can't
reverse it
我上次说错了，SHA-256是⾮对称加密的，也就是说它不可逆
01:36 - 01:39
And this guy says take down the whole video
然后这货说，如果不把这段⾳频屏蔽，那就把整个视频删掉吧
01:39 - 01:41
but whatever Um, but my point still stands right
但总之，我的观点依然成⽴
01:41 - 01:48
So Sha-256 has cryptographic primitive that we don't care about when we're doing our
hash table
So，当我们在使⽤我们的hash table时，我们并不关⼼SHA-256中的加密原语
01:49 - 01:50
So we would never actually use that
So，实际上，我们从不使⽤它
1.50-1.56
the XXhash or the CityHash FarmHash stuff that we talked about before, that's the kind
of hash function we use
我们之前讨论过的XXHash，CityHash或者是FarmHash，这些才是我们要使⽤的hash函数
01:56 - 01:59
So in theory you could still use sha-256
So，从理论上来说，你依然可以使⽤SHA-256
02:00 - 02:02
It's not reversible ,but nobody does that, because it'd be too slow
虽然它是不可逆的，但没⼈会去⽤它，因为它速度太慢了
02:02 - 02:04
Okay all right
2.04-2.08
so the other things that can just reminder for everyone what's on the Docket
So，我要提醒你们的另⼀件事情就是
02:08 - 02:13
So next week on Friday, project #1 should be done ,that's due at midnight
在下周五的时候，你们的Project 1应该做完了，周五午夜的时候你们得交了
02:13 - 02:18
Much we have already finished, but again post on Piazza if you have questions as you go
along
虽然你们中很多⼈都做完了，但如果你们在做的时候还有任何问题，请发在Piazza上
02:18 - 02:24
And we've been updating slightly there's your pin post that provide clarifications on
Piazza
我们已经在Piazza上进⾏了些许更新
2.24-2.29
that help guide you along too ,if you have questions about different aspects of it
如果你对于Project的不同部分有任何疑问，那么这些会对你有所帮助
02:29 - 02:38
And then homework #2 we released on Monday this week and that'll be due the following
Monday after the first project is due
然后，我们会在这周⼀放出Homework 2，你们要在Project 1结束后那个周⼀上交
02:38 - 02:41
Okay, so any high-level questions about project #1
Ok，So，对于Project 1，有任何逼格⽐较⾼的问题吗？
02:43 - 02:47
Who here is not tried to get it running on the local machine or their development
environment
这⾥有⼈还没试着在本地机器或者是开发环境中运⾏过项⽬？
02:48 - 02:50
I was at least try that okay ,Good awesome okay
我觉得你们⾄少要试着运⾏⼀下
02:51 - 02:54
All right, so recall from last class
So，回想下上⼀节课
2.54-2.59
we started talking about different kind of data structures we could have inside our
database system
我们讨论了可能在我们的数据库系统中所使⽤的不同类型的数据结构
02:59 - 03:02
And we spent the entire lecture talking about hash tables
并且我们花了整节课时间讨论了hash table
03:02 - 03:08
And we talked about how hash table are - in general ,but especially hash tables can be
used in a variety places inside the database system,
⼀般来讲，在数据库系统中很多地⽅都能⽤到hash table
3.08-3.11
like using it for internal metadata
⽐如在内部元数据中使⽤它
3.11-3.14
actually storing the underlying tables in our database
在我们的数据库中⽤于存储underlying table(知秋注:磁盘上table的存储)
3.14-3.18
and also temporary data structures like you know building hash table to do a join
也能⽤来充当临时数据结构，⽐如通过构建hash table来进⾏join操作
03:18 - 03:24
So for the first three uses of data structures
So，对于前三种数据结构的使⽤场景来说
3.24-3.26
for a lot of these cases, the hash tables gonna be good enough
在许多场景中，hash table已经⾜够了
03:26 - 03:28
Right, for think of like internal system
⽐如在内部系统中
3.28-3.31
it's not very often you need to be able to do range queries
我们⽆须经常在⾥⾯进⾏范围查询
03:31 - 03:38
Most of the time you want to say go give me a single key and give me you know for
giving key give me the value ,you're doing point query lookups
在⼤多数情况下，我们都会这样做，我给它⼀个key，请把对应的value给我，我们所做的就是点
查找
03:38 - 03:41
So the thing we want to talk about now though is table indexes
So，我们现在想讨论的东⻄就是表索引（table index）
03:41 - 03:45
And this is where we we may want to actually run queries that want to do range scans
这实际上就是我们想做范围扫描的查询中要⽤到的东⻄
03:45 -03:47
And therefore hash tables are going to be insufficient for us
在这种情况下，hash table并不能满⾜我们的要求
3.47-3.53
because you know because you can only do single key lookups
因为我们只能⽤它来进⾏单个key的查找
03:53 - 03:58
So everyone here should be roughly aware of what a table index is
So，你们在座的⼈应该或多或少知道表索引（table index）是什么
03:58 - 04:00
But I just one provides some a more formal definition
但这⾥我会提供⼀些更为正式的相关定义
4.00-4.05
so that we have a basic understanding going throughout the rest of the lecture what
we're talking about
这样我们就对我们这节课要讲的内容有个基本概念了
04:05 - 04:12 ******
So a table index is a essentially a replica of some subset of attributes in our tables
So，简单来讲，表索引就是我们表中属性的⼦集的⼀个副本
04:13 - 04:17
And that we're storing in a more efficient manner
并且我们将它以⼀种更⾼效的⽅式进⾏存储
4.17-4.22
that allows us to do efficient lookups to find the thing that we're looking for
这允许我们能够进⾏更⾼效的查找，以此来找到我们要查找的东⻄
04:22 - 04:24
So you know in the worst case scenario
So，在最糟糕的情况下
4.24-4.28
if we want to find a particular key in our table ,you just do a sequential scan for that
如果我们想在我们的表中找到⼀个特定的key，那我们只需要进⾏循序扫描即可
04:29 - 04:31
But the idea of putting into a table index
但如果要引⼊表索引（table index）这种想法
4.31-4.36
we would have sit this auxiliary data structure that we can traverse or do a lookup into
我们必须要有这种辅助数据结构，通过它能让我们进⾏遍历或者查找
04:36 - 04:40
And find exactly what we want more quickly than having to ask when sequential scan
⽐起循序扫描来说，它能够更快找到我们想要的东⻄
04:41 - 04:45
So the key thing to point out here is that the index is going to be a replica of the table
So，这⾥要指出的关键⼀点是索引其实是该表的⼀个replica（副本）
04:45 - 04:48
So that means that has to be synchronized with the table
So，这也就是说，它必须和表保持同步
04:48 - 04:55
Meaning if we modify a tuple in our table, we want that change be reflected in our index
这意味着，如果我们更新了我们表中的⼀个tuple，我们也想让这个修改能够反应到我们的索引
上
04:55 - 04.57
Because we don't want any false negatives or false positives
因为我们不想要任何错误的数据
4.57-5.00
we don't want to add something to our table, not put in our index
我们不想遇上将东⻄添加进我们的表，但没有放进我们的索引这种情况
05:00 - 05:03
And then we do a lookup to find that tuple
接着，当我们查找到这个tuple时
5.03-5.06
and it's not our index and come back with it with a negative result
它并不在我们的索引中，并且返回的也是错误的结果
05:06 - 05:07
Right
5.07-5.18
so the database system is would be responsible for maintaining these indexes and
keeping them completely synchronized with the underlying table
So，数据库系统会负责维护这些索引，并让它们与underlying table（知秋注：我们的定义的
表）完全同步
05:18 - 05:22
And this is completely transparent to you as the application programmer
对于我们这些应⽤程序开发⼈员来说，这是完全透明的（知秋注：应⽤程序开发⼈员看不到内在
的这些⾏为）
05:22 - 05:28
I don't know when I insert, I don't the say, oh insert in this table and all by the way
update these other indexes
crud程序员在进⾏insert操作时是不知道的，也不会说，oh 对这个table进⾏insert 操作，同时
顺带更新这些索引（indexes）
05:29 - 05:32
The database system at least have a SQL database system would see the insert query
⾄少SQL数据库系统在看到这个insert 查询操作时
5.32-5.37
and know that you not only don't need to update the table also to update any index as I
have on that table
它知道，我们想做的不仅仅是更新表，同时也要更新该表的索引
05:39 - 05:46
So there's this trade-off now in our system between having a lots of indexes make
queries go faster and then the cost of maintaining them
So，在我们的系统中，我们可以使⽤⼤量的索引来让查询变得更快，但我们还需要消耗⼀定的
代价来对它们进⾏维护，这两者之间就存在了取舍问题
05:46 - 05:50
And we'll see this as we go along today and we saw this actually with hash tables last
time
我们会在今天这堂课上看到这个，实际上我们在上次讲hash table的时候就有看到过这个
05:50 - 5.56
Right,inserting something into an index, sometimes will be really fast ,and sometimes
could be really expensive
在索引中插⼊某些东⻄，有时候速度很快，也有时候要付出的代价很⾼
5.56-6.00
depending on whether you know whatever we want to insert a given key
这取决于我们是不是在给定的key所在的地⽅插⼊数据
6.00-6.02
there's something already there or not
在那⾥可能已经有了数据，也可能没有
06:03 - 06:05
So again when we have a query show up
当我们执⾏⼀个查询时
6.05-6.15
the database system is responsible for figuring out what's the most efficient access
method for me to use ,for the system to use to answer the result of your query
数据库系统会负责找出对于系统本身⽽⾔最⾼效的访问⽅法，以此来给出我们查询所要的结果
06:15 - 06:17
And again this is transparent to use the application programmer
再说⼀遍，这对于应⽤程序开发⼈员来说是透明的
6.17-6.18
I just write my select statement
我只是去写我的select语句⽽已
6.18-6.25
I don't specify normally in some cases you can I don't specify normally exactly what
index I want to use
通常情况下，我不去指定我想使⽤的索引是什么（当然在某些情况下，你可以去指定你想使⽤的
索引）
06:22 - 06:28
the database system can configure that out for me
数据库系统可以为我们搞定这个
06:28 - 06:31
And again going back to the very first lecture
回想下我们的第⼀堂课所讲的内容
6.31-6.37 ！！！！！
this is one of the the benefits or the advantages of the relational model and declarative
language like SQL
这是关系模型以及SQL这种声明式语⾔的优势，
06:37 - 06:43
If I now my table, I are very much query application, and then later on decide to add to
index
如果在我的程序中有很多查询要做，那么我之后会选择加⼊索引
06:43 - 06:45
I want to go back and rewrite my SQL
我想回过头来，重写我的SQL语句
6.45-6.45
and I'll use that index
并且我会使⽤该索引
6.45-6.48
the database system configure that automatically for me
数据库系统会为我⾃动配置它
6.48-6.51
in theory, it doesn't always get it right
理论上来讲，它并不会⼀直这样做
06:51 -6.56
So this particular step of actually taking a Query,and picking out what indexes use
实际上，在进⾏查询，并选择使⽤什么样的索引这⼀步中
6.56-6.59
this will falls under the umbrella of query optimization
这其实是属于查询优化所负责的范围
6.59-7.01
which is a super hard problem
这是⼀个超级难的问题
7.01-7.03
we'll cover it us in after the midterm
我们会在期中考试之后对此进⾏介绍
07:04 - 07:07
But this is sort of it's like a optimization problem to decide
但这看起来其实就是⼀个优化问题
7.07-7.12
you know what's the best way to given query amongst all these different choices I have
即对于给定的查询来说，我该如何从各种不同的选择中找出最优的查询⽅案
07:12 - 07:13
So we'll cover that later on in the semester
So，我们会在这学期稍后对此进⾏介绍
7.13-7.19
but for now just assume that we know what index we want to pick when we do lookups
但现在，假设我们知道在我们进⾏查找的时候我们想要使⽤哪种索引
07:19 - 07:26
So of course it's now as an always in computer science and databases, there's just
trade-off between doing one thing a lot versus doing it not at all
So，Of course，在计算机科学和数据库中，在⼤量做某事和不去做某事之间，始终存在着取舍
问题
07:27 - 07:28
So if you have a lot of indexes
So，如果我们使⽤⼤量的索引
7.28-7.33
that'll make your queries certainly go faster did you look ups on them
当我们在进⾏查找时，这会使我们的查询变得更快
07:33 -07:37
But now you have this additional cost of having to store those indexes and actually
maintain them
但现在，我们得花额外的成本来存储这些索引，并对其进⾏维护
07:37 - 07:39
I said again indexes are going to take up pages
索引会占⽤page
7.39-7.40
we're to store that in our buffer pool
我们会将它保存在我们的buffer pool中
7.40-7.43
while the write that out the disk, so that takes up space
当我们将它写出到磁盘时，它会占⽤磁盘空间
07:43 - 07:46
But then now as I said when I do updates to my tables
但正如我所说，当我对表进⾏更新时
7.46-7.50
I have to go and also update my all my indexes to reflect those changes
我必须去更新我的所有索引，以此来反映那些修改
07:51 - 07:53
So if my table has a thousand indexes
So，如果我的表⾥有⼀千条索引
7.53-7.56
which would you know in practice people do that kind of stuff
你们懂的，在实战中，⼈们会这样做
07:56 - 7.58
If I now do an insert
即如果我现在要进⾏插⼊操作
7.58-8.01
I have to do a thousand updates to all those indexes
我必须对这些索引更新1000次
08:02 - 08:06
And my update operation or insert operation isn't considered done until I've modified all
my indexes
直到我修改完我的所有索引时，我的更新或者插⼊操作才会被认为已经完成了
8.06-8.09
because they have to be always synchronized
因为它们必须始终保持同步
08:09 - 08:13
So again we're not really gonna discuss how you decide what indexes to pick
So，再说⼀遍，我们不会去讨论你们该使⽤哪种索引
8.13-8.16
but this is another hard problem in databases as Well
但这确实是数据库中的另⼀个难题
08:16 - 08:20
They have tools to do recommendations for you to decide what indexes when it pick
你们可以通过使⽤某些⼯具来帮你推荐选择使⽤哪种index
8.20-8.26
or you pay a lot of money for human DBAs to do this for you
或者，你们可以花钱找那些DBA来帮你搞定这个
08:26 - 08:31
All right, so the things we're talk about today is just an overview of what a B+tree is
So，今天我们所讨论的东⻄是B+ tree，我们会对此进⾏简单介绍
08:32 - 08:41
And then we'll spend some time to discussing like, you know one of the implementation
details we have to be concerned of when we build out our index
接着，我们会花时间来讨论当我们在构建索引时，我们不得不关⼼的那些实现细节
08:41 - 08:49
And then we'll finish up talking about some additional Optimizations that real systems
actually do to actually make this thing be useful in practice
然后，我们会结束那些关于真实系统下所做的那些额外优化的讨论，这样能对你在进⾏实战的时
候有所帮助
08:49 - 8.50
Ok
8.50-8.58
so the first thing we need to address is this this what is it B+tree
⾸先我们要解决的问题是，什么是B+ tree（B+树）
8.58-9.00
and how does that relate to a B tree
以及它和B-Tree（B树）之间的关系是怎样的
09:00 - 09:08
So this is sort of the downside of databases is that a lot of times the same word is used
to reflect different things
So，这是数据库世界中所体现的缺点，即很多时候，相同的名词被⽤来反映不同的东⻄
09:08 - 09:12
And be quite confusing for someone we can try to get started to understand what's the
actual difference with these things
对于试着去开始理解这些东⻄（b树与b+树）有哪些不同的⼈来说，这其实相当困扰
09:13 - 09:18
So first of all there's sort of this class of data structures called B-trees
So，⾸先，有⼀类数据结构叫做B-Trees（B树家族）
09:19 - 09:23
And then within that there is a specific data structure that is a B-tree
接着，在它⾥⾯，有⼀种特定的数据结构叫做B-Tree（B树）
09:24 - 09:27
So oftentimes people use that B+tree and B-tree interchangeably
所以人们经常会交替使用B+Tree（B+树）和B-Tree（B树）
09:28 - 09:30
But if you go back to the literature back in the 1970s,
但如果你回过头去看下1970年代的⽂献
9.30-9.32
these were actually distinct data structures
这些实际上是不同的数据结构
9.32-9.34
and wikipedia has them as distinct data structures today
维基百科上也是将它们当做不同的数据结构来介绍的
09:35 - 09:38
So the first B-tree came out in 1971
So，第⼀个B-Tree（B树）是在1971年出现的
09:39 - 09:44
The then the B-tree, B+tree came out two years later in 1973
然后，B+Tree在两年后（1973年）推出
09:44 - 09:47
There's no paper that describes what the B+tree is
那时并没有论⽂去描述什么是B+Tree（B+树）
09:47 - 09:55
There's a 1979 survey paper that says, here's all that you know the B+tree or B-trees
that are out there
有⼀份1979年的论⽂表示，我们有B+Tree（B+树）和B-Tree（B树）
09:55 - 9.58
And oh by the way IBM invented the B+tree in 1973
顺带⼀提，IBM在1973年发明了B+ Tree
9.58-10.04
and supposedly there's a tech report that says describes this, but you can't easily find it
on the internet
据推测，有⼀篇paper描述了B+ Tree，但你在⽹上很难找到它
10:04 -10:08
And then during the 70's and 80's was a bunch of these other ones that are variants on
this
接着，在70年代和80年代间，出现了很多关于它的变种
10.08-10.11
the B* tree is variant on the B-tree
B* Tree是B-Tree（B树）的变种
10:11 - 10:14
And then actually the Blink -tree is came out in 1981
然后，B^link_ Tree是在1981年出现的
10.14-10.17
and actually this was invented here at CMU
实际上，这是由CMU所发明的
10:17 - 10:18
This is the paper that describes it
这是描述它的那篇paper
10.18-10.21
so this is written by Phil Lehman
So，它是由Philip Lehman所撰写
10.21-10.23
that dude still works here he's in the dean's office
这位⽼兄依然这这⾥⼯作，他的办公室在Dean's Office
10:24 - 10:25
So you if you loved this lecture
So，如果你热爱这⻔课
10.25-10.26
you can go talk to him
你可以跑去和他讨论
10.26-10.32
he loves every time I see him I always like, oh we discuss the Blink -tree in my class and
he's like all that paper
每次我看到他的时候，他总会说我们来讨论B^link_ Tree吧，总之，他很喜欢他写的这篇paper
10:32 - 10:34
So right dope forty years later it's it's still around
40年过去了，这个数据结构依然有⼈使⽤
10:35 - 10:38
So the reason why I showed these other trees
So，我向你们展示这些其他树形结构的理由是
10.38-10.41
it's, because we're gonna focus on the B+tree
是因为我们会将我们的重⼼放在B+ Tree上
10:41 - 10:48
But we're not gonna in a modern system we're not gonna use it exactly the way it's
described in like the 1970s
但在⼀个现代的系统中，我们不会按照1970年代的那篇论⽂中所描述的那样去使⽤它
10:48 - 10:55
We're actually gonna borrow bits and pieces from all these other trees that existed
before ,but now we're just gonna call that the B+tree
实际上，我们将借⽤之前存在于其他树形数据结构中的⼀点点内容来放在B+ Tree⾥⾯，但现在
我们就将它叫做B+ Tree
10:56 - 11:00
And a lot of times you'll see in in database systems they'll say we're using a B-tree
在许多时候，你会在数据库系统中看到，我们正在使⽤⼀个B-Tree
11:00 - 11:06
I can almost guarantee you or at least, I've yet to see one a system where they say
they're using a B-tree
⽬前为⽌，我还没有⻅过⼀个系统中说过它们⽤的是B-Tree（B树）
11:06 - 11:08
And it's not really actually a B+tree
其实并不是B-Tree（B树），实际上是B+Tree
11.08-11.10
like the look at the Postgres source code
如果你们去看下PostgreSQL中的源码
11.10-11.13
Postgres documentation they talk about using a B-tree
PostgreSQL⽂档中表示使⽤的是B-Tree
11:13 - 11:18
But from as much as I can tell looking at at what it's actually doing it's really a B+tree
但我可以告诉你们的是，实际上它们⽤的就是B+ Tree
11:19 - 11:20
So again these words are used interchangeably
So，再说⼀遍，这些名字可以交替使⽤
11.20-11.24
I'll try to say always B+tree, I'll briefly mention what a B-tree is later on
在讲课的时候，我会试着⼀直使⽤B+Tree。但有时我也会将它简称为B-Tree
11:24 - 11:27
But in practice this is what we care about, this is what we want to use in our system
但在实战中，这是我们所关⼼的内容，同时也是我们想在我们的系统中所使⽤的东⻄
11:29 - 11:34
Okay, so a B+tree is a self-balancing tree data structure
Ok，So，B+ Tree是⼀种⾃我平衡的树形数据结构
11.34-11.38
so the B in B+tree or B-tree means balanced
So，B+Tree或B-Tree中的B的意思是平衡
11:39 - 11:46
And the idea is that it's gonna keep data we insert into our data structures in sorted
order
它的思想是，当我们往我们的数据结构中插⼊数据时，它会保证数据的有序性
11:47 - 11:51
And that's gonna allow us to do efficient searches sequential scans along the leaf nodes
这允许我们可以沿着叶⼦节点进⾏⾼效的搜索或者循序扫描
11.51-11.56
insertion and deletions we can do all this in O(log n）
插⼊和删除的时间复杂度都是O(log n）
11:57 - 11.58
Again contrasting this with the hash table
与hash table相⽐
11.58-12.04
the hash table in the best case scenario was O(1), worst case scenario is O(n)
在最好的情况下，hash table的时间复杂度是O(1)，最糟的情况下是O(n)
12:04 - 12:08
In a B+tree because it's balanced, it's always gonna be O(log n)
在B+ Tree中，因为它是平衡的，所以它的复杂度始终是O(log n)
12:09 - 12:15
And that means essentially no matter that the distance from the root to any key in a leaf
node is always O(log n)
这也就是说，对于⼀个叶⼦结点上的任何key来说，不管它距离根节点有多远，时间复杂度始终
是O(log n)
12:16 - 12:20
No matter how many times we delete and insert and change things around
不管我们删除多少次，插⼊多少次，修改周围的东⻄，它始终是O(log n)
12:21 - 12:24
So the B+tree came out in the 1970s
So，B+Tree是在1970年代出现的
12.24-12.36
because they were trying to build a data structure that would make it efficient to do you,
know index lookups on hardware where the disk was super slow and memory was limit
limited
因为⼈们试着去构建出⼀种数据结构，它能够在磁盘⾮常缓慢，并且内存有限的情况下，可以为
我们进⾏⾼效的索引查找
12:36 - 12:44
So the B+tree has this nice advantage of compared to like a B-tree ,is that you can just
scan along the leaf nodes after you traverse to the bottom
相⽐B-Tree，B+Tree有⼀个很棒的优势，那就是当你遍历到B+Tree底部的时候，你可以沿着
叶⼦结点进⾏扫描
12:44 - 12:46
And you'll read everything in sequential order
你会按照顺序读取所有数据
12.46-12.48
or doing sequential scan along them
或者沿着它们进⾏循序扫描
12.48-12.50
you don't never have to go back up
并且你⽆须回过头去 （知秋注：因为我们从上到下，按范围找到了树的⽗节点下指代的某段区
域叶⼦节点，结果就在这个范围内，循序扫描就对了）
12.50-12.52
in general
⼀般来讲
12:52 - 12:56
The, again even though this was designed in the 1970s
再说⼀遍，即使这是1970年代被设计出来的东⻄
12:57 - 12.58
It's still widely used today
到了今天，它依然被⼴泛使⽤
12.58-13.03
and actually even for faster disk and for in-memory databases where there is no disk
实际上，对于那些更快的磁盘型数据库和那些没有磁盘的内存型数据库来说
13:03 - 13:05
The B+tree actually outperforms a lot of things
B+Tree实际上胜过许多其他东⻄
13.5-13.08
and it's still very very useful
⽽且它⾮常⾮常有⽤
13:08 - 13:10
So this is the original paper
So，这是那篇paper的原始版本
13.10-13.14
this is one that everyone cites the ubiquitous B-tree from 1979
这是所有⼈所引⽤的那篇paper，它的名字是The ubiquitous B-tree
13:14 - 13:21
And it's here in this paper they describe or they mentioned that, oh yeah there's this
thing called the B+tree from IBM and it came out in 1973
这篇论⽂描述了，Oh，这⾥有种叫做B+Tree的东⻄，它是由IBM在1973年所推出的
13:22 - 13:26
And this is what normal people cite when you want to cite a paper for the B+tree
当你想要引⽤关于B+Tree的论⽂时，你们可以引⽤这个，普通⼈都会去引⽤这篇
13:27 - 13:30
So what are the properties are going to B+tree
So，B+ Tree中有哪些属性呢？
13:30 - 13:32
So it's considered an M-way search tree
So，它被认为是⼀种多路查找树(M-way search tree)
13.32-13.36
meaning we can within every node in our tree
这意味着，在我们树中的每个节点处
13:36 - 13:41
It can have M different paths to up to other nodes, or up to n paths not always exactly M
它可以通过M条不同的路线到达其他节点，或者n条路线，并不总是完全是M条路线
13:42 - 13:43
Again, it's perfectly balanced
再说⼀遍，它是完美平衡的
13.43-13.49
we're going to mean this is the data structure maintains the balance over time as you as
you modify the tree
当你在对树进⾏修改时，该数据结构会始终保持平衡性
13:49 - 13:56
And so by balance I mean that in the distance from one leaf node or any leaf node to the
root is always going to be O(log n)
我所说的平衡指的是，任何叶⼦节点到根节点始终是O(log n)
13.56-13.37
it's always gonna do the same
它们始终是⼀样的
13:59 - 14:06
The other thing is have to do is that we have to maintain this guarantee that the each
node is at least half full
我们必须维护的另⼀件事情就是，保证每个节点都⾄少是半满的情况
14:07 - 14:10
So again if I for the number of keys I can have in my node
对于我能存放在节点中key的数量来说
14.10-14.14
I have to have more than half minus one half number passed in my tree
我必须往我的树中传⼊M/2-1个key
我的B+ Tree中节点所管理的key的数量⾄少为M/2-1个（M为树的⾼度）
14.14-14.17
and then I have to have less than M minus 1
但key的数量必须⼩于M-1
14:17 - 14:19
So M minus 1 would be a completely full node
So，M-1其实就是⼀个节点中能保存的key的最⼤数量
14:19 - 14:21
So I always have to be at least half full
So，我始终得保证节点⾄少处于半满的情况
14.21-14.23
and then we'll see this when we started doing deletes
当我们进⾏删除的时候，我们会看到这⼀点
14.23-14.24
if I'm not
如果节点不处于半满的状态
14.24-14.29
then I have to start moving data around, so that my node is half full
那我就得将周围的数据移到这个节点中，让它变成半满的情况
14:29 - 14:33
And again that's how they're gonna guarantee this first one that the distance is always
the same
再说⼀遍，这就是它们保证每个叶⼦结点到根节点的距离是始终相同的⽅法了
14:35 - 14:38
And then the simple one is that every inner node which I'll describe in the next slide
接下来，我们要谈论的是inner node（中间节点）
14:39 - 14:41
If you have K keys in stored in your node
如果你在你的节点中保存了K个key
14.41-14.43
and you can have up to M minus 1
那么K的⼤⼩最⼤是M-1
14.43-14.47
you have K keys you're gonna have k + 1 non-null children
在每个inner node（中间节点）中你有k个key，接着，你就会有k+1个⾮空孩⼦节点
如果⼀个inner node（中间节点）中有k个key，那你就会有k+1个⾮空孩⼦节点
14.47-14.52
job K pass or pointers to ,k + 1 pass are pointers to children below
即有k+1个指向下⽅孩⼦节点的指针
14:52 - 14:55
Actually quick show hands who here has seen a B+tree before
快速举下⼿，让我看下你们有谁之前看过B+ Tree
14:56 - 14:57
Very few good ok good
看起来没⼏个⼈
14:58 - 15:01
Again, this is the best data structure for databases, so this is why you're here
再说⼀遍，这是数据库中最好的数据结构，这也是你们在这⾥学习它的原因
15:01 - 15:03
Alright, so this is the basic B+tree
如图所示，这是最基本的B+ Tree
15:04 -15:08
All right, and the layout is that again along the bottom we have our leaf nodes
在树的底部，我们有叶⼦节点
15.08-15.12
and then any node that's not a leaf node is considered to inner node
任何⾮叶⼦节点，我们将它称为inner node
15:12 - 15:15
Now this tree has a height of 2, I mean it has two levels
现在，这棵树的⾼度为2，也就是说，它有两层
15:15 - 15:17
So the inner node is also the root node
So，inner node也是根节点
15:18 - 15:19
Alright, there's always been one node at the top
在树的顶部始终有⼀个节点
15.19-15.21
because that's how you enter into the tree
因为这是你进⼊这棵树的⼊⼝
15:22 - 15:26
And then down here in the in the leaf nodes, we're actually gonna have sibling pointers
往下看，在叶⼦节点中，实际上我们有兄弟指针（sibling pointers）
15:27 -15:29
So this is something that came from the Blink-tree
这是源于B^link_ Tree中的东⻄
15:29 - 15:33
So at any inner node won't have sibling pointers ,but any leaf node will
So，在任何inner node中，它们并没有兄弟指针（sibling pointer)，但叶⼦节点有
15:33 - 15:40
So now I can traverse at the bottom and scan along you know in any direction I want to
keep finding my neighbors getting more data
So，现在我就可以遍历底部，并按着我想要的⽅向进⾏循序扫描，这样就能找到我附近更多的
数据了
15:42 - 15:43
So in the Inner Nodes
So，在inner node中
15.43-15.47
it's gonna bethis combination of keys and pointers
它（inner node）是key和指针的结合体
15:47 - 15:48 !!!!!
And so for the Inner Nodes
So，在inner node中
15.48-15.53
the pointer it's always going to be to another node or null that there's nothing there
⾥⾯的指针始终指向的是另⼀个节点，如果什么也没有，那就指向的是null
15:53 - 15:58
And then the key is just the the whatever attributes we're building our index on, whatever
we're trying to store in this
key其实就是我们在任意属性上所构建的索引，不管我们在这个属性中存的是什么
15:59 - 16:07
And then these keys are then used to determine which path you should go down as you
start doing a search for a given key
当你开始使⽤⼀个给定的key来进⾏搜索时，我们通过这些key来决定该沿哪条路线往下⾛
16:08 - 16:11
So in this case here, for this first key five
So，在这个例⼦中，对于第⼀个key 5来说
16:11 - 16:18
So the path to the left of it going this direction will be for any value any keys that are
less than five
往左边⽅向⾛的这条路径上的这个节点所保存的key的值都是⼩于5
16:18 - 16:23
And then for the the one that comes after it would be implicitly anything less than nine
or greater than five
中间这条路径上的节点中的key的值得⼤于5，但⼩于9
16:24 -16:27
So if I'm looking for something a value a key that's less than five
So，如果我找的key的值⼩于5
16:27 - 16:28
I would look at this and say
我就会看到这个，并表示
16.28-16.30
well I'm looking for key one
Well，我要找的是值为1的key
16.30-16.31
one is less than five
1⽐5⼩
16.31-16.32
so I go down this path
So，我会沿着这条路往下
16.32-16.37
and now I find my leaf node and I try to you know find the thing that I'm looking for
我就会找到我的叶⼦节点，并试着找到我要找的东⻄
16:38 - 16:45
The leaf nodes, the key value pairs are in just the key the same way they are up above in
the inner nodes
对于叶⼦节点，它的key/value键值对的⾏为⽅式和上⾯的中间节点⼀样
16:45 - 16:47
But then the value can differ
但这⾥的value可以是不同的东⻄
16:48 - 16:54
We'll see this in a second could either be a record ID to a tuple, it could be the actual
tuple itself
我们会在之后看到，它可以是⼀个tuple的record ID，也可以是tuple⾃身
16:54 -16:55
It doesn't matter
这都⽆所谓
16.55-16.59
it's just that the inner nodes have pointers, the leaf nodes have had data
我想表达的只是，inner node中保存的是指针，叶⼦节点保存的是数据
17:01 - 17:02
So again this is just a repeat what I said
So，这⾥只是重复了我所说的话
17.02-17.09
but then the the way to think about it in each node, it's an array of key value pairs
每个B+ Tree的节点其实就是⼀个key/value pair（键值对）数组
17:09 - 17:16
And you're using the keys to determine whether it's the if you're in the leaf node whether
it's a thing you want, or if you're inner node whether you go left or right
如果你是在叶⼦节点上，那么你可以通过key来判断这是不是你要的东⻄，如果你是在inner
node上，那么key可以⽤来判断你是往左还是往右⾛
17:16 - 17:18
So in general but not always
So，总的来说是这样，但并非总是如此
17.18-17.25
the keys are always in each node are always sorted in whatever the the sorting order you
want the collation you want for that node
每个节点中的key始终都是以我们想要的排序⽅式和规则来排好序
17:26 - 17:30
Right, so my example here, we disordered you know we in a numerical order
So，在我的例⼦中，我们是按照数字顺序进⾏排序的
17:30 - 17:35
And so that's gonna allows when we jump into a node potentially depending how its
implemented
So，取决于它是如何实现的，当我们进⼊⼀个节点时
so，我们该跳到哪个节点取决于排序规则的实现
17.35-17.40
we can do binary search in each node and try to find the thing that we're looking for
rather than just having you a linear search
我们可以在每个节点处使⽤⼆分查找来试着找我们要找的东⻄，⽽不是通过线性查找
17:41 -17:42
But sometimes liner search is good too
但有时候线性查找也是可⾏的
17:44 - 17:51
So the contents of again of what these values are in leaf nodes can vary depending on
the database system
根据数据库系统的不同，叶⼦结点中的值的内容也会有所变化
17:52 - 17:57
Again, it could be a record IDs , it could be the actual tuples themselves, and we'll see
some examples in a second
它可以是record id，也可以是tuple⾃身，我们稍后会看到这些例⼦
17:58 - 18:01
All right, so let's actually look to see how this leaf nodes were actually implemented
So，我们来看下这些叶⼦节点实际该如何实现
18:02 - 18:06
So again logically you just sort of think of it like this
从逻辑上来讲，你们会这样看待它
18.06-18.11
that you have this array ,and you alternate with key value pairs
即我们拥有⼀个数组，并且使⽤key/value pair（键值对）来进⾏交替使⽤
18.11-18.15
and this is typically how a lot of textbook should show what a B+tree node looks like
通常情况下，这是很多教科书上所向你们展示的B+ tree的样⼦
18:15 - 18:18
So the first thing to point is this since this is a leaf node
So，⾸先要指出的是由于这是⼀个叶⼦节点
18.18-18.22
we have pointers at the end at the end of the beginning of our array to our siblings
我们在数组的开头和末尾会有指向其他兄弟节点的指针
18:22 - 18:26
Right, and this would be a node ID or page id to allow us to go in either direction
这⾥⾯存放的可能是node id 或者是page id，这允许我们跳到其他的节点上
18.26-18.29
or if we're at the right side of the tree or the left side of the tree, it would just be null
或者，如果我们处于树的左侧或者右侧，那么这⾥⾯所放的就是null
18:30 - 18:41
Again, nobody actually stores , no real database system would store inner internal key
value arrays for a B+tree leaf node like this
实际上，没有数据库会像这样去保存⼀个B+ Tree的叶⼦节点的key/value pair（键值对）数组
18:42- 18:43
And these years key value pairs and these user pointers
不会将key/value pair（键值对）和指针放在⼀起
18:44 - 18:45
Typically, it's stored separately
⼀般来讲，它们是分别保存的
18:46 -18:48
so just like in our slotted pages we would have a header
So，就像我们slotted page中的header⼀样
18.48-18.51
that tells us some metadata about what's in our page
它可以告诉我们，我们page中所包含内容的相关元数据
18:51 - 18.52
So in this case here
So，在这个例⼦中
18.52-18.54
we could say what level in the tree we are
我们可以说出我们在这棵树上的第⼏层
18.54-18.57
essentially how many steps away from the root we are
也就是说，我们距离根节点有多少步要⾛
18.57-19.01
how many free slots that we have remaining in our node
在我们的节点中，我们还有多少个空余slot
19.01-19.03
and then the next person
然后，前⼀个节点和后⼀个节点是什么
19:03 - 19:08
And then now you see that we separated out the the keys and the values
现在，你们可以看到，我们将key和value独⽴开来
19:09 - 19:10
Everything I guess why you'd want to do something like this
你们能猜下我为什么要这么做吗？
19:15 - 19:15
yes
请说
19:23 - 19:28
He said so that for a given page on a B+tree node that all the keys can fit in one page
他表示，对于B+Tree的节点上的⼀个给定的page来说，所有的key都能放在⼀个page上
19:29 -19:31
And then the values can fit another page, no
然后，我们可以将所有的值放在另⼀个page上。你说的并不对
19:31 - 19:34
The the keys and values are typically always stored in the same page
通常情况下，key和value始终是保存在同⼀个page上的
19:35 - 19:35
yes
请问
19:38 - 19:39
Exactly, says they're not of the same size
没错，它们的⼤⼩不⼀样
19:40 - 19:43
Right,furthermore also too when if you're doing binary search on this
此外，当你对它进⾏⼆分查找的时候
19:44 - 19:46
You want everything to fit in your CPU caches
你想要所有东⻄都能放在你的CPU缓存中
19:47 - 19:49
So if you have if you're back here with all this intermixed
如果我们回看下这张幻灯⽚，可以看到，这⾥将所有的东⻄都混杂在⼀起
19:49 - 19:50
In order to binary search
为了能够使⽤⼆分查找
19.50-19.52
I actually don't need the values at this point
实际上，此时我并不需要⽤到value
19.52-19.54
because I'm just trying to find the key that I want
因为我只是试着去找到我想要的那个key⽽已
19:54 - 19:55
So if you break it up
So，如果我们将它拆分开来
19.55-19.58
right depending whether it's fixed length or or vary length
取决于它是固定⻓度或者是可变⻓度
19:58 - 20:00
You can jump through the keys much more efficiently
我们可以更⾼效地在key之间进⾏跳转
20:01 - 20:02
The values typically are always fixed length
value通常情况下始终是固定⻓度
20.02-20.08
they're either like you know 32bit or 64bit record IDs if they're tuple that's a little
complicated
它们（values）可能是32位或者64位⻓度的record id。如果它们是tuple，那么可能会有点复杂
20:08 - 20:11
But in general you you always want to separate them
但⼀般来讲，我们始终想将它们拆分开来
20:12 - 20:19
Right,and again the way it works is just whatever offset you are in the key array
corresponds to some offset that in the value array
它的⼯作⽅式是，不管你key数组中的offset值是什么，它始终对应了value数组中的某些offset
值
20:19 -20:20
So if I find a key I'm looking for
So，如果我找到我要找的那个key
20.20-20.22
I'm gonna offset for
我拿到了它的offset值
20.22-20.25
then I know just to jump to offset form the value array and that finds the thing that I
want
然后，我跳转到value数组中那个offset值处，以此找到我想要的东⻄
20:26 - 20:30
So as I already said the values can vary depending on the system
So，正如我之前所说，这些值会根据系统⽽改变
20:30 - 20:32 ###
Some systems this show the record ID
某些系统会使⽤这⾥展示的record id
20.32-20.34
this is the most common implementation that people use
这也是⼈们所最常⽤的实现
20.34-20.36
this is what Postgres does
这是PostgreSQL的做法
20.36-20.40
this is what all the other commercial database systems do
这是所有其他商⽤数据库的做法
20:40 - 20:46
What's more complicated and we can talk about next class is what does it look like when
you actually stored the tuples in the data
我们下堂课所能讨论的⼀种更为复杂的⽅式就是数据中存放的是tuple
07-02
20:47 - 20:48
So think about this
So，思考下这个
20.48-20.51
instead of having a table heap with my tuples
相对于我们所拥有的⼀张包含了⼀堆tuples的表
20.51--20.55
and then a B+tree that stores my primary key
我们使⽤B+ Tree来保存我们的主键
20:55 - 20.59
And so if I want to keep in sync, what if just they were to merge together
So，如果我想保持同步，将它们（主键和tuple）合并在⼀起
20.59-21.05 ！！！
and the leaf nodes what's actually the tables that the tuples, you know corresponding to
a primary key
叶⼦节点，实际上也就是表中的tuple，它会对应⼀个主键
21:05 - 21:09
So now when I want to do traversal to find out a particular key or particular tuple
So，现在当我想要通过遍历来找到某个特定的key或者tuple时
21:10 - 21:13
Instead of having to do in the first case, I traverse the index get a record ID
⽆须像第⼀个例⼦中所做的那样，对索引进⾏遍历，然后拿到⼀个record ID
21.13-21.15
then do a lookup in the page table and find that
然后在page表中根据record ID进⾏查找，并找到我要的东⻄
21.15-21.18
and they go scan inside that block to find that tuple that I want
然后跑到这个block中进⾏扫描，以此找到我想要的tuple
21:19 - 21:20
What if as I do the traversal
⽽在这⾥，当我进⾏遍历时
21.20-21.22
when I land in the leaf node
当我落在这个叶⼦节点上时
21.22-21.24
there's already the data that I want
我就已经拿到了我们想要的数据
21:24 - 21:27
So MySQL and SQLite probably most two famous ones that do this
So，MySQL和SQLite可能是这⽅⾯最著名的例⼦
21:28 - 21:32
In cases like Oracle and SQL server, I think by default you get the one at the top
⽐如Oracle和SQ server，默认情况下，应该使⽤的是⽅案1
21.32-21.34
but you can tell it to do this at the bottom
但你也可以让它们使⽤第⼆种⽅案（底部这种⽅案）
21.34-21.37
now you get the pass special flags
你只需传⼊特殊的标志符即可
21:37 - 21:41
So now I want to distinguish since we understand the basics about B+tree
因为我们已经对B+ Tree有所了解了
21:42 - 21:44
Let's distinguish it from the original B-tree
So，让我们将它和原始的B-Tree（B树）区分开来
21:45 - 21:47
So the major difference is that
So，它的主要区别在于
21.47-21.48
in the original B-tree
在原始的B-Tree（B树）中
21.48-21.56
the values of the stored the index could be anywhere in the tree
value可以存放在树的任何位置
21:56 - 22:00
Meaning any inter node could also have a value like a record ID or tuple actually for
themselves
这意味着，任何inner node也可以保存诸如record id或者tuple之类的value
22:01 - 22:05
In the B+tree,the values are only in the leaf nodes
在B+Tree中，value只能放在叶⼦节点中
22:06 - 22:07
So what are the implications of this
So，这其中的含义是什么呢？
22.07-22.09
Well one
Well，第⼀点
22:09 - 22:10
In the B-tree case
在B-Tree（B树）中
22.10-22.12
I don't have any duplicate keys
我不会有任何重复的key
22.12-22.19
because I can guarantee that each key will only appear once in my tree
因为我可以保证在我的树中，每个key只出现⼀次
22:19 - 22:19
In the B+tree
在B+Tree中
22.19-22.23
because I have all this guideposts up above in the inner nodes
因为我会将所有的路标都放在inner node中
22.23-22.24
I'm basically duplicating keys
也就是说，我会有重复的key
22:26 - 22:32
Furthermore, if I delete a key in a B+tree, I would remove it from the leaf node
此外，如果我删除了B+Tree上的⼀个key，我会将它从叶⼦节点上移除
22:32 - 22:34
But I may not actually remove from the inner nodes
但实际上我可能并不会将它从inner node上移除
22.34-22.37
depending whether our rebalance or not
这取决于我们是否要进⾏重新平衡
22.37-22.40
right there I may not have a path going down to it
我们可能也就没有通向它的⼀条路了
22:40 - 22:41
I am sorry
抱歉，我说错了
22.41-22.45
by deleting from the leaf node, I may keep it in the inner node
当我将它从叶⼦节点上删除时，我可能会将它保存在inner node中
22.45-22.47
because that's how I figure out what path to go down, if I'm looking for other keys
因为如果我要查找其他key，那么我还可以通过这条路线往下去查找
22:48 - 22:54
So A b-tree is gonna be more economical and how much storage space it occupies
So，相⽐之下，B-Tree更加经济，占⽤的空间也少
22.54-22.55
because it's not duplicating keys
因为它不会对key进⾏复制
22:56 - 23:01
But the downside is gonna be and this is why that nobody and end up actually using this
in a real system
但之所以最终没⼈在真实的系统中使⽤它的原因是
23.01-23.06
it`s that it makes doing updates more expensive when you have multiple threads
当你使⽤多个线程来进⾏更新操作的时候，这样做的代价会更加昂贵
23:06 - 23:09
Because now you could be moving things up and down
因为你可以将东⻄上下移动
23:09 - 23:12
Right, the tree you know I have an inner node I modify something
⽐如说，我有⼀个inner node，我对它进⾏某些修改
23.12-23.16
and I made it propagate a change below me and above me
然后，我将这个修改向上和向下进⾏传播(知秋注：修改删除某⼀个inner node所带来的影响，
⽐如它内部数据结构中相关指针的指向，这个在并发操作下是需要保护的)
23:16 - 23:18
And therefore I have to take a latches on both directions
因此，我必须在这两个⽅向上加⼀个latch
23.18-23.23
and that causes as we'll see you next class or next next week that caused a lot of issues
我会在下堂课或者下下周的时候向你们展示，这样做所引起的许多问题
23:23 - 23:23
In a B+tree
在B+ Tree中
23.23-23.26
I only make changes to the leaf nodes
我只对叶⼦节点进⾏修改
23.26-23.29
I may have the propagate changes up above,but I only go in one direction
我可能需要将修改结果向上传播，但我只需要⼀个⽅向就可以
23:29 - 23:33
Yes,…… yeah
请问
23:35 - 23:38
So the question is can I repeat what I said about duplicates in a B+tree
So，她的问题是，我能不能再讲下B+ Tree中的重复项这种情况
23:38 - 23:44
So going back to, to this guy here
So，我们来看这张幻灯⽚
23:45 - 23:47
So this is the B+tree
So，这是⼀个B+ Tree
23:47 - 23:53
So the keys that I have that I'm trying to index are 1 3 6 7 9 13
So，我所拥有并试着去索引的key是1, 3, 6, 7, 9, 13
23:53 - 23.55
But if you look in the root node
但如果你看下根节点
23.55-23.56
I have a 5
我有⼀个5
23.56-23.59
5 does not appear anywhere in the leaf node
5并没有出现在任何叶⼦节点上
23.59-24.02
meaning hey probably got in this case here
意味着，在这个例⼦中
24.02-24.05
but had gotten inserted and then it got deleted
但当我将它插⼊，接着⼜将它删除后
24:05 -24:08
But I didn't reshuffle or reorganize my my tree
但我并没有将我的树进⾏重新整理或者是重组
24:08 - 24:10
So I left it in the inner node
So，我将它留在了inner node中
24:11 - 24:12
In a b-tree
在B-Tree（B树）中
24.12-24.14
that'll never happen each key only appears once
⼀个key只出现⼀次
24.14-24.16
and any if it appears in the tree
如果它在树中出现的话
24.16-24.17
then it appears in our key set
那它就会出现在我们的key的集合中
24:18 - 24:18
So make sense
So，懂了吗？
24:24 - 24:30 ！！！！！！！
The question statement is we leave in here for searching purposes ,and it's still stored
physically in our nodes
她的问题是，出于搜索的⽬的，我们将这个5放在了树⾥⾯，它依然以物理的⽅式保存在我们的
节点中
24:30 - 24:34
But if I asked this tree do you have key 5
但如果我去问这棵树，它⾥⾯有没有值为5的key
24.34-24.35
I would say no
我会说No
24.35*-24.37
because I always have to go to the leaf node
因为我始终都得跑到叶⼦节点上来找想要的
24.37-24.39
then I try to find 5, and I'm not gonna find it
然后，我试着找到5，但是我找不到它
24:39 - 24:43
So it still be there ,but it's it's not actually a real key
So，它虽然依然在那⾥，但实际上它并不是⼀个真实的key
24:44 - 24:44
Yes, yes
请问
24:49 - 24:54
Okay, so question is how do we do with inserts when we felt on the leaves we'll get that
in a second, yes
Ok，So，他的问题是，当我们在叶⼦节点上时，我们该如何进⾏插⼊，我们会在稍后看到这个
24.52-24.54
that's the next topic
这是下⼀个话题
24:58 - 25:01
This question is will there not be any duplicates in the leaf nodes
他的问题是，在叶⼦节点中是否存在任何重复项
25:03 - 25:04
Yes and no
可以说有，也可以说没有
25:04 - 25:05
So we'll see in a second
So，我们会在稍后看到
25.05-25.11
So this this would be considered a unique index, a unique tree or they're unique keys
So，这可以被认为是⼀个唯⼀索引，唯⼀键的树或者是唯⼀键
25:11 - 25:13
You can't have keys that have non unique values
我们的key的值必须是唯⼀的
25.13-25.17
we have to handle that.we'll get to that in a second as well
不然，我们必须对其进⾏处理，我们会在之后看到
25:17 - 25:17
Okay
25.17-25.24
so I think the next topic is what he was yes is how do we actually how to actually
modify this
So，我觉得下⼀个课题就是该如何修改这个
25.24-25.25
absolutely yes, inserts, okay
确实没错，我们要来讲insert（插⼊）操作
25:27 - 25:30
So the way we're gonna do an insert is that,
So，我们进⾏insert 操作的⽅式是
25.30-2535
we want to find that we want to traverse down,
我们想先往下遍历
25.35-25.39
and figure out what leaf node we want to insert our new key into
并弄清楚我们想在哪个叶⼦节点上插⼊我们新的key
25:39 - 25:42
So again we use those guideposts on the inner nodes decide whether we go left or right
So，我们会使⽤inner node中的这些路标来决定我们是往左⾛还是往右⾛
25.42-25.48 ！！！！
depending on whether a key is less than or greater than what's stored in those key arrays
这取决于我们要插⼊的key是⽐保存在这些key数组中的值⼤还是⼩了
25:48 - 25:51
And then as we traverse down eventually we'll get to a leaf node
接着，当我们往下遍历时，我们最终会到达⼀个叶⼦节点
25:52 - 25.55
And then the leaf node is where we want to insert a key
这个叶⼦节点所在的位置，也就是我们想插⼊该key的位置
25.55-25.56
and so if the leaf node has space
如果该叶⼦节点上还有空间
25.56-25.58
then we just inserted in
那么我们就直接插⼊即可
25.58-26.02
for keeping the keys in sorted order, maybe we should we sort them
为了让这些key保持有序性，我们可能需要对它们进⾏排序
26:02 - 26:04
But there's not enough space we just insert it
但这⾥没有⾜够的空间来让我们插⼊这个key
26:04 - 26:06
If there's not enough space
如果该节点并没有⾜够的空间来让我们插⼊这个key
26.06-26.08
then we have to split the node
那么，我们就必须拆分这个节点
26.08-26.11 ！！！！！
let's split the leaf node we would we just inserted into
我们将叶⼦节点拆分开来后，我们将key插进去
26:11 - 26:12
And so the way we're gonna do this
So，我们做到这点的⽅法是
26.12-26.15
we're just gonna take a halfway point in our key space
我们找到叶⼦节点的中间位置
26.15-26.19
put all the keys that are less than the halfway point in one node
我们将中间位置左边的所有key放⼊⼀个节点
26.19-26.22
all the keys that were above that in another node
将右边所有的key放⼊另⼀个节点
26:22 - 26:28
And then we update our parent node to now include that that middle key
然后更新我们的⽗节点，让它包含这个中间key（知秋注：这个中间key其实就可以看作是⼀个
叶⼦节点的边界key了）
26:29 - 26:32
And then we have an additional pointer to our the new node we just added
接着，我们会有⼀个额外指针来指向我们刚添加的新节点
26:33 - 26:36
And that may be happy to say,all right, well this is actually a recursive thing
这个可能会是⼀个递归的过程（知秋注：逐层往上更新⽗节点）
26.36-26.40
because if now my parent as I try to insert the new key in to the parent
因为如果我现在要将新的key插⼊到⽗节点中
26:40 - 26:42
If it doesn't have no space
如果它并没有空间来让我们插⼊
26.42-26.42
then we have to split it
那我们就得对它进⾏拆分
26.42-26.45
and then propagate the changes up above
然后将修改后的结果往上传播
26:45 - 26:49 ！！！！！！
So for one insert we may have to reorganize the in the entire tree
So，对于⼀次插⼊来说，我们可能就得要重新整理下整个树了
26:49 - 26:52
And this is what I was saying before like like just like in the hash table
这就有些像我之前在hash table中所说的⼀样
26:52 - 26.55
If I insert into it index or through the hash table and nothing's there
如果我将⼀个索引插⼊到hash table上，并且该位置没有任何东⻄
26.55-26.56
it's really fast
那速度就⾮常快
26.56-27.01
But if I have to scan a long long time to find the slot I can go into, that can be more
expensive
但如果我需要花很⻓时间才扫描并找到⼀个我可以插⼊的slot，那么插⼊的代价就很⾼了
27:01 - 27:03
So sometimes we would insert into our tree
So，有时，当我们往我们的树中插⼊元素
27.03-27.04
and it's gonna be an expensive operation
这会是⼀个要付出昂贵代价的操作
27.04-27.07
because we're reorganizing the entire data structure
因为我们要重组整个数据结构
27:07 - 27:10
And other times it'll be super fast and we don't have to worry about it
其他时候，我们的插⼊速度会⾮常快，并且我们⽆须为此担⼼
27:12 - 27:16
All right, so let's do a let's view a demo of this
So，我们来看个demo
27:16 - 27:21
So this is using this is a you know rather than me doing animations in PowerPoint
So，这⾥我不会在幻灯⽚上进⾏动画演示
27:21 - 27:37
This is from a professor at university San Francisco that has a nice you know a little
web-based visualization we can use to, carry, yes okay
这是旧⾦⼭⼤学⼀个教授所做的基于Web的可视化demo
27:44 - 27:46
No out of type remotely
27:47 - 27.50
Alright,so we'll do a max degree of three
这⾥我们选Max Degree = 3
27.50-28.02
so that means that the the max number of nodes,we can have is two or sorry ,keys in our
each node is two and can have at most three paths going down
So，这意味着在我们的node中key的数量为2，并且我们最多只有3条向下的路径
So，这意味着在我们的每⼀个node中，key有2个，并且最多只有3条向下的路径
28:02 - 28:09
So we insert can ever see that we insert 2, know if it's a physician mean
So，这⾥我们插⼊⼀个2
28:09 -28:09
Yes,
请问
28:12 - 28:14
So the degree says the number of paths coming out of it
So，这⾥的degree指的是从⼀个节点处出来的路径数
28:15 - 28:19
So degree of three means I have most three paths coming out of me,
So，degree of 3的意思是，从我这⾥最多能出来3条路线
28.19-28.20
if I'm an inner node
如果我是⼀个inner node
28.20-28.23
and therefore I had to store it I can store at most two keys
那么我最多能保存2个key
28:25 - 28:30
Because, again so good I mean going back to what we showed in the very beginning
回到我们⼀开始讲的地⽅
28:33 - 28:36
Question, why do I set to three or why is it that way
So，问题来了，为什么我设置的是3，我为什么这样做？
28:40 - 28:45
So again so this is say this is that a this has a degree of four
这张图上的degree其实是4
28:45 - 28:49
So it's always the number path is the number of keys plus one
SO，路径的数量始终是⼀个节点所能保存的key的数量加1
28:49 - 28:51
So I be 1 2 3 keys
So，这⾥有三个key
28.51-28.56
and this guy has to have a right pointer and a left pointer
So，这个节点必须要有⼀个左指针和⼀个右指针
28:56 - 29:00
Right, and he has have a right pointer ,but that's shared and there's the one at the end
这个右指针指向的是下⾯最后⼀个节点
29:00 - 29:03
So this there's four paths coming out for three key's
对于有3个key的node来说，它可以分出四条路径来
29:03 - 29:08
Okay, alright
29:08 - 29:10
So is there a way to make this looking better
So，我们把这⾥变得能让你们好理解⼀些
29:12 - 29:14
Well, let's just keep going see how go so it's down over there
Well，我们只需要⼀直关注图中的右下⻆图形展示
29:14 - 29:21
So I've only inserted ,and it's the demo ,I've only started two keys or one sorry one key
So，我从⼀个key开始
29:24 - 29:26
So right now it only has one entry in it
So，现在它⾥⾯只有⼀个条⽬（即0002）
29:26 - 29:32
So now I'll insert, we insert six
So，现在我们插⼊6
29:34 - 29:38
Right, so again it just it had space in that node, so I was able to insert it
So，因为在该节点中还有空间，So，我可以往⾥⾯插⼊数据
29.38-29.41
and now I insert four
现在，我插⼊4
29:41 - 29:42
And at this point it has to split
此时，我们必须对该节点进⾏拆分
29.42-2.948
because it can only you can only store, it can only store two keys
因为⼀个节点只能保存2个key
29:48 - 29:54
So it's split in half. put two over here four and six six in its own node
So，我们将它⼀分为2，我们将2放在⼀个节点，4和6还放在它原来⾃⼰的节点内
29.54-29.58
and then they took the middle key for and moved it up as the new root
然后，我们将中间key移到上⾯作为新的根节点
29:58 - 30:00
And again I have pointers going down to both of them
这⾥，我有两个向下指向它们的指针
30:01 - 30:03
So now do it insert 1
So，现在我们来插⼊下1
30:04 - 30:07
Right, back in fit over there accommodate just fine
可以看到这个5能够放在这⾥
如图所示，可以看到插⼊结果
30:07 - 30:09
It's now insert 5, what should happen
现在我们再来插⼊5，看看会发⽣什么
30:10 - 30:13
Right, it'll say well 5 is greater than 4
可以看到，5⽐4⼤
30:13 - 30:15
It's greater than equal to 4
它⼤于等于4
30.15-30.16
so I no need to go down this direction
So，我⽆须沿着这个⽅向往下
30.16-30.24
but I can only sort, I can always I can only store two keys in this node
但在这个节点处，我只能保存两个key
30:24 - 30:27
So I'm gonna have to split this guy's and then rebalance everything
So，我必须将这个节点拆开，对树重新进⾏平衡
30:28 - 30:32
So hit enter, right 4 goes on there ,puts 5 there
So，4跑这⾥来了，把5放到那⾥
30:32 - 30:34
Right, it's split then split the node
这⾥我们将节点拆开
30.34-30.36
put 4 in the middle over here
我们把4放到中间
30.36-30.36
5 and 6 over here
5和6放在那边
30.36-30.40
and then put 5 up,because that was the middle key
然后把5放到上⾯，因为它是中间的key
30:40 - 30:44
And now we have pointers going to this node, the middle node here with 4 and that one 5
现在，我们就有⼀个指针指向中间节点上的4，右边则是5
现在，我们分别有三个指针指向下⾯这三个节点
30:46 - 30:52
Right, so again this is recursive as I keep inserting more stuff ,and I keep splitting, I keep
splitting the changes up, yes
So，这是⼀个递归的过程，随着我插⼊更多的元素，我会对节点继续拆分，并将这些变化向上
传递
30:54 - 30:56
So he says what if we have duplicate keys
So，他想问的是，如果我们有重复的key怎么办
30:56 - 31:00
So actually I don't know whether this will matter, so I just insert four
So，实际上我也不知道这是否重要，So，这⾥我插⼊个4看看情况
31:04 - 31:04
Yeah, it did that
这句不要
31:05 - 31:08
Um, so there's different way sorry how do i
不好意思
31:09 - 31:11
The resolution is rejected
我们的提交被拒绝了
31:11 - 31:15
Mmm, 11 now
试⼀下11看看
31:17 - 31:19
How did I do that ,sorry
我是怎么做到的？？？
31:25 - 31:26
There we go okay sorry
好了，我们来看⼀下
31:26 - 31:30
So this is just sort of a toy diagram
So，这⾥所展示的只是⼀个示意图
31.30-31.34
in a real system you could store for together
在真实的系统中，你可以将它们存放在⼀起
31.34-31.39
and just maintain multiple entries for all the unique values of that you have the same key
只需要维护拥有同⼀个key的所有唯⼀值的多个条⽬即可
只需要维护拥有同⼀个key下多个条⽬所对应的值（每个条⽬对应⼀个唯⼀值）即可
31:54 - 32:01
So okay your statement is if all my keys are the same, it's 4,4,4,4,4,4
So，你的问题是，如果我所有的key都⼀样，都是4
32.01-32.02
then if I'm looking for an exact key value pair
接着，如果我要寻找⼀个准确地key/value pair（键值对）
32.02-32.06
then it's log n, because I do its sequential scan, yes
那么它的复杂度就是O(log n)，因为我使⽤的是循序扫描
32:06 - 32:08
So yeah, we can pop up Postgres
So，我们可以来看下PostgreSQL是怎么做的
32:09 - 32:11
We can make a table has a billion rows,
我们可以创建⼀个有10亿⾏的表
32.11-32.15
and for one column we set the value to one
我们将其中⼀列的值都设置为1
32:15 - 32:19
And we can call crate, you know every so every where every 1 billion row has the same
value for that one column
So，当这10亿⾏数据在那⼀列上的值都是⼀样的时候
32:20 - 32:24
And PostgreSQL will let us build an index on that column
PostgreSQL会让我们在这个列上构建出⼀个索引来
32:24 - 32:28
It's a stupid to Build, because as you said they're all the same
这样构建其实很蠢，因为我们说过，它们这⼀列的值都是⼀样的
32:29 - 32:32
so input it so and so how to say this
So，我该怎么说呢
32:33 - 32:35
People will do stupid things
⼈们会做些愚蠢的事情
32.35-32.40
in general don't be stupid and don't build indexes on things that you shouldn't use
⼀般来讲，请不要犯蠢，不要在你不怎么使⽤的东⻄上构建索引
32:40 - 32:42
Right,there's the other types of indexes we'll see
我们以后会看⻅其他类型的索引
32.42-32.45
so a hash table there's other things like inverted indexes we could use
我们还可以使⽤诸如反向索引（ inverted index）这样的东⻄
32.45-32.47 ！！！！！！！！！！！！！！！！！！
that could be better if you had a lot of duplicate values
如果你有太多的重复值，使⽤这个（反向索引）可能会来得更好
32:47 - 32.54
But think of like email addresses or think of like phone numbers or things that work it's
gonna be vastly diverse
但像电⼦邮件地址，⼿机号之类的，它们是千差万别的
32.54-32.56
then we won't really have that problem
那么，我们就不会遇上这种问题
32.56-33.01
or primary key right, primary key has to be unique that would be great for this
还有主键，主键必须是唯⼀的，那么对于索引来说，这最好不过
33:01 - 33:03
Alright, so again so this is this clear
So，你们听懂了吗
33:05 - 33:07
Okay, so let's go back
Ok，So，让我们回到这⾥
33:10 - 33:13
So to do deletes now, we have the opposite problem
So，如果我们进⾏删除操作，我们就会遇上相反的问题
33:13 -33:18
Again insert so if we got to full, we run up space, we have to do that split
对于插⼊操作来说，如果我们的空间满了，耗尽了所有的空间，那我们就得进⾏拆分
33:19 - 33:20
If we delete
如果我们进⾏删除操作
33.20-33.24
then it may be the case we end up being less than half full
我们就会遇上节点上所保存的key的数量⼩于半满的情况
33.24-33.27
which would violate the guarantees we have to have in our B+tree
这就会违反我们在B+ Tree中所必须遵守的规则
33:27 - 33:29
And then therefore we have to do the opposite of a split which is a merge
因此，我们就得做拆分的逆向操作，也就是合并
33:30 - 33:37
So delete something, again I just do my traversal, I go down the tree try to find the key
that I want to delete
So，如果我要删除某些东⻄，我先进⾏遍历，然后跑到树的底部试着找到那个我想删除的key
33:38 - 33:40
I'll and I'm always gonna land in a leaf node
我始终会落在⼀个叶⼦节点上
33.40-33.46
if my leaf node after deleting that key is still at least half full, then I'm done
当我删除了那个key后，如果我的叶⼦节点依然处于⾄少半满的情况，那么删除就完成了
33:46 - 33:50
I just remove it, maybe reorganize my my sort of key arrays, but then that's it
我只需把key移除就⾏，可能还需要整理下key数字，但基本就这些东⻄
33:51 - 33:52
But if I'm less than half full
但如果该节点并没有处于半满状态
33.52-33.56
then now I have to figure out how to get rebalanced
那么，现在我就得去弄清楚我该如何对树进⾏重新平衡
33:57 - 34:07
So the sort of one easy trick we could do is look at our siblings, in other leaf nodes and
that's why we have those sibling pointers
So，我们能使⽤的⼀个简单技巧就是看下临近的其他叶⼦节点中的元素，这就是为什么我们有
这些兄弟指针的原因了
34:07 - 34:11
We can look at them and try to steal one of their keys to make ourselves balanced
我们可以去看下这些节点，并试着从它们中抢⼀个key回来，以此让树变得平衡
34:11 - 34:17
Right, as long as that our sibling has the same parent as us, then it's okay for us to steal
this
只要我们的兄弟节点和我们的节点有相同的⽗节点，那么我们就可以去打劫它们中的key
34:17 - 34:20
Because that doesn't require any rebalancing up above
因为这就不需要对上⾯这些节点做任何重新平衡的操作了
34:21 - 34:26
So if we're not able to steal from our sibling, then we have to merge
So，如果我们没法从我们的兄弟节点那⾥打劫到key，那么我们就得进⾏合并操作
34:27 - 34:32
I think we go take one of our siblings combine all our keys together
So，我们将其中⼀个兄弟节点中的key和我们当前节点中的key合并在⼀起
34.32-34.35
that may actually end up being too full as well
那么实际上，合并后的节点可能会太满了
34:35 - 34:40
But then we could split that as above as well that's the same thing as just copying this
但之后我们可以将它拆分开来
然后我们就可以像前⾯讲的⼀样来进⾏拆分
34:40 - 34:45
But we would merge, delete a key up above, and then now where everything's balanced
但如果我们删除了上⾯的某个key，我们就会进⾏合并操作，然后B+ Tree中所有的东⻄都平衡
了
34:45 - 34:47
Again, again just like in splits
⽐如，在拆分的时候
34.47-34.49
we're like I may have to go propagate the change everywhere
我们必须将我们所做的修改传播到B+ Tree的所有地⽅
34.49-34.53
when we merge and with deleting keys that our parent now may become less than half
full
当我们进⾏合并和删除key时，我们的⽗节点可能会⼩于半满的状态
34:53 - 34:54
And it has to merge
那我们就必须要进⾏合并操作
34.54-34.57
and that for we have to maybe restructure the entire tree
我们可能得重构整个树
35:00 - 35:04
All right, so let's go back and to our example here, and do our demo
So，我们回到我们的例⼦中去，来看下我们的demo
35:05 - 35:09
Because now I got to figure out how to get to the top right corner
因为我总算知道怎么把屏幕移到右上⻆了
35:15 - 35:19 学⽣提问，后半段没听出来
So we just maintain the siblings in ？？？
35:19 - 35:22
Correct, he's question is to be maintained the siblings only in the leaf nodes, yes
没错，他的问题是，我们只在叶⼦节点处维护兄弟节点?说的没错
35:24 - 35:28
All right, so look to let's do delete 4,I want sorry delete 5
So，我们来删除下5
35:28 - 35:30
Let me scroll down and then hit enter
我把屏幕移下来点，再来看下效果
35:30 - 35:31
So we can see this
So，我们可以看到这个
35:33 - 35:36
Alright, so just a traversal are those insert sorry
So，我们来遍历下，不好意思这是插⼊
35:40 - 35:41
Delete 5
删除5
35:46 - 35:50
Yeah, that's insert as Polly again sorry for the low resolution
我没错，这个框是删除，那个框是插⼊
35:51 - 35:52
All right so it's delete 5
So，我们来删除5
35:53 - 35:55
In this case here it should be fine
在这个例⼦中，应该没啥问题
35.55-35.57
both him there's only found one of them ,so let's try the other one
So，我们来试下另⼀个
35:59 - 36:01
Goes down that's fine
向下遍历，看来没问题
36.01-36.03
again at this point here
在此处
36.03-36.05
both these nodes are still more than half full ,so that's fine
这两个节点的状态都是半满以上，So这没问题
36:06 - 36:07
So now let's delete four
So，现在我们把4删掉
36.07-36.13
and I suspect it will try to delete the one that's farther on that side
我怀疑它会试着删除这边这个东⻄
36:16 - 36:17
Go down found that deletes that
向下遍历，找到4，删除4
36.17-36.20
again that node is now half empty
再说⼀遍，这个节点现在是处于半空状态
36:22 - 36:24
I mean it has to have at least one
我的意思是它⾄少必须要有⼀个key在⾥⾯
26.24-36.30
and because it was empty，it merged everything and decrease the height of the tree
因为它是空的，它就得将所有东⻄进⾏合并，并减少树的⾼度
36:30 - 36:30
yes
请问
36:37 - 36:40
This question is if only the leaf nodes have sibling pointers
他的问题是，如果只有叶⼦节点上有兄弟指针
36.40-36.42
then how do you actually do this merge
那实际上，我们该怎么进⾏合并操作呢？
36:42 - 36:52
So the way it works basically think of the think of a thread going down, it can maintain a
stack of what notes a visited as it goes down
它的⼯作⽅式是，这⾥有⼀条线程会往下遍历，它会维护⼀个stack，⾥⾯包含了它向下所遍历
元素的记录
36:53 - 37:01
And we're actually gonna need to do this when we do what's called latch crabbing or
coupling as we go down and we take latches
当我们往下遍历，实际上我们会去进⾏latch crabbing或者是coupling之类的事情
in case we need to reorganize everything
如果我们需要将所有东⻄进⾏重组
37:02 - 37:07
And so I have to know what I have to hold latches up, you know at when I go down
somewhere I have to hold and latch my parent
我必须先拿到锁，即当我向下遍历某个地⽅的时候，我必须在我的⽗节点加上⼀个latch
37.07-37.10
in case I need reorganize whatever I'm doing down below
如果我需要重新整理下我下⾯所做的⼀切事情
以防我需要对我们下⾯的节点进⾏重新整理
37:11 - 37:12
So I don't release it until I know I'm safe
直到我觉得没问题了，我就会将锁进⾏释放
37:13 - 37:14
So I know how I got there
So，这样我就知道我是怎么做的了
37:15 - 37:15
Yes
请问
37:21 - 37:26
Yeah, his question is if there's two siblings to the left the right which one you choose, it
depends
他的问题是，如果在左边和右边各有⼀个兄弟节点，我们该怎么选择？这得看情况
37:26 - 37:29
Right, typically you choose the one that has the same parent as you
通常情况下，我们选择拥有相同⽗节点的那个来做
37:30 - 37:35
Okay, I think you have two actually But if you're like if you were in the middle,
但如果你处于中间的话，即左右两边都是同⼀个⽗节点，那就两个其实都可以
37:35 - 37:36
Yeah，These guys have the same parent
没错，这⼏个都有相同的⽗节点
37:36 - 37:40
So you say you want to reorganize this, you could choose to either left to right ,it doesn't
matter
So，如果你想对它们进⾏重组，你可以选择使⽤左边的节点，也可以使⽤右边的节点，这都没
关系
37:41 - 37:45
Let's see what this one does, so we so if we delete 4 that should take it out of the
middle
我们来看下，这样做会发⽣什么，So，如果我们删除4，它应该把中间的移除掉
37:46 - 37:49
And then now I delete two and it's gonna pick people up 2 right
然后，选择我将2删除，上⾯的2也应该删除
37:51 - 38:00 ！！！！
Okay, actually it's can only have one or two, so it might empty, because of its degree of
the tree
Okay,事实上，它（这个节点）只能有⼀个或两个元素，so 上⾯这个节点可能为空，因为它的
degree（为3）
38:00 - 38:03
But like it doesn't matter, it still be correct
但这没关系，这依然是对的
38:05 -38:08
And so this diagram shows the the sibling pointer is going in one way
So，这张图显示，这⾥的兄弟指针指向的始终是右边
38:09 - 38:10
You can't have a go in both directions
它不可能有两个⽅向（知秋注：即按照我们的想法，可以有两个指针，⼀个指向左边，⼀个指向
右边）
38.10-38.13
you have to do extra work to make that happen, but like you can do that
但你可以通过⼀些额外的⼯作来做到这点
38:13 - 38:16
A lot of times again for simplicity ,but you could just have a go in one direction,
很多时候，为了简单，我们可以只使⽤⼀个⽅向
38.16-38.24
but then you can't do you know order by in descending order and go the other direction,
if you wanna do scans
但如果你想做扫描的时候，你就没法做降序扫描，或者以其他的⽅向进⾏扫描（知秋注：针对这
⾥的情况来讲的，只能从⼩到⼤）
38:24 - 38:26
Right, pretty straightforward
很简单吧
38.26-38.31
of course getting the the details of the deletes and inserts doing that split merge is
actually very difficult
当然，要明⽩删除和插⼊的细节以及拆分和合并之类的事情，实际上是⾮常难的
38:31 - 38:32
In practice
在实战中
38.32-38.39
and we'll see in next week how to actually make sure that when we're reorganizing the
tree that we're thread safely
我们会在这周的课上向你们演示当我们在重新整理B+Tree的时候，该如何保证线程安全
38.39-38.41
and we don't have any integrity issues
以及避免那些完整性问题
以避免因为线程安全产⽣的异常（知秋注：多线程下对公有变量进⾏⾮线程安全的操作）
38:43 - 38.46
All right, so the in practice
So，在实战中
38.46-38.49
the research shows
据研究表明
38.49-38.55
the typical fill-factor for a real tree on real data is about 67 to 69 %
⼀个⽤来保存真实数据的真实⼆叉树所使⽤的的标准填充因⼦的范围在67%到69%
通常情况下，⼀个树的所使⽤的标准填充因⼦范围在67%到69%
38.55-39.04
meaning the amount of data are storing in your nodes that's actually real It`s up to you
know 67% of his actually use useful data
也就是说，你节点中所保存数据⾥，实际上只有67%是有⽤的（知秋注：其他都是初始数据或
未知数据）
39:05 - 39:07
So typical capacities you can have you know
So，所谓的标准容量指的是
39.07-39.12
when for the 8 kilobyte pages
对于⼀个8kb⼤⼩的page来说
39.12-39.21
with a this number of pages are at four levels, you can basically store 300,000 key value
pairs
如果树的⾼度是4层，基本上来讲你可以保存300000个key/value pairs（键值对）
39:21 - 39:32
Right, so you can index and get in log n time to any one of three 300 million keys, very
very Quickly
So，你可以对这些条⽬进⾏索引，并且随机访问这三千万个条⽬中任意⼀个的时间复杂度是
O(log n)，速度真的⾮常⾮常快
39:33 - 39:37
And most of the data is going to be stored on the leaf pages as you would expect
正如你们所期望的那样，⼤部分数据都是存在leaf page上
39:37 - 39:40
Right, because guys as you add more keys
因为随着你往树⾥⾯添加更多的key
38.40-39.41
you start to fan out
它就会开始开枝散叶
39.41-39.45
and most of the data is gonna be stored in those leaf nodes
我们会将⼤部分数据都保存在这些叶⼦节点上
######################################################
39:47 - 39:52
All right, so let's talk about some other things you can do with these indexes
So，我们来讨论下我们可以⽤这些索引所能⼲的其他事情
39:53 - 39:58
So this concept of this notion of what called clustered indexes
So，这⾥所展示的这种概念叫做聚簇索引（clustered index）
39:59 - 40:04
And so I said in the beginning that the table heap for a database is unordered
正如我在⼀开始所说，数据库中的table heap是⽆序的（知秋注：⼀张表的数据堆在⼀起，就是
table heap）
40.04-40.09
meaning we can insert tuples into any page in any order
这意味着，我们能以任何顺序将tuple插⼊到任何page中去
40:09 - 40:11
We don't the follow the you know the temporal order will how things have inserted
我们并不是按照插⼊的时间顺序进⾏排序
40:12 - 40:16
But there may be some times where we actually want to have the data sorted in a
certain way
但有时，我们实际上想让数据以某种⽅式进⾏排列
40.16-40.18
like for example like the primary key
⽐如，主键（primary key）
40:18 - 40:20
So these would be called clustered indexes
So，这被叫做聚簇索引（clustered index）
40.20-40.23
so you can define an index when you create a table
So，当你创建⼀张表的时候，你可以定义⼀个索引
40:23 - 40:26
You can define a what's called a clustered index
你可以定义⼀个聚簇索引（clustered index）
40.26-40.34
and the database system will guarantee that the the physical layout of tuples on pages
will match the order that they're sorted in the index
数据库系统会保证，索引会对page中tuple的物理布局进⾏匹配排序（知秋注：对磁盘上实际数
据重新组织以按指定的⼀个或多个列的值排序）
07-03
40:35 - 40:38
So this is useful for certain things like
So，这对于某些事情会⽐较有⽤
40.38-40.41
you know if I'm doing a lot of lookups within is that range is the primary key
⽐如，如果我要进⾏⼀⼤堆根据主键来进⾏范围查找的任务
40:41 - 40:45
If I know my tuples are stored in the same order that primary key
如果我知道我的tuple所保存的顺序是跟主键⼀致
40:45 - 40:50
Now when I you know traverses the leaf node within a small number of pages, I can find
all the data that I need
当我在⼀⼩部分page中遍历叶⼦节点时，我可以找到所有我需要的数据
我只需要遍历某个叶⼦节点下的所包含的⼀⼩部分pages，就可以找到所有我想要的数据
40:51 - 40:54
If I'm not sorted on the key I'm doing my lookup one
如果我所查找的key并进⾏排序
如果我所根据查找的这个key并没有进⾏排序（知秋注：即没有根据该key做索引）
40.54-40.58
then every single record id I could have could point to another page
那么我所拿到的每个单个record id（代表table中每条数据）都有可能指向另⼀个page
40:58 - 41:00
And I could be doing a bunch of different random IO`s to go read the data that I want
那我可能就得做很多随机I/O，以此来读取我想要的数据
那么我在读我想要数据的时候，就要进⾏⼤量随机I/O
41:02 - 41:05
So not all database system supported this
So，并不是所有的数据库系统都⽀持这个
41.05-41.07
some database system you get this by default
某些数据库系统会默认使⽤它
41.07-41.11
like MySQL by storing the tuples in the leaf-nodes themselves
⽐如，MySQL将tuple保存在叶⼦节点上
41:11 - 41:13
it is a clustered index
这就是聚簇索引（clustered index ）
41:13 - 41:18
So it's guaranteed to have on the pages on disk, the tuples are sorted in the primary key
order
So，这保证磁盘上page中的tuple都是以主键顺序来排序的（知秋注：聚簇索引会将tuple也保
存在索引中，所以这⾥说的page是索引在磁盘中的保存）
41:18 - 41:22
In case MySQL if you don't define a primary key, they'll make one for you
在MySQL中，如果你没有定义主键（primary key），那MySQL会帮你定义⼀个
41:23 - 41:26
Right, they'll have a synthetic like row ID, a record ID that's transparent to you
它们会使⽤row id或者record id之类的东⻄作为主键，对于你来说，它们是透明的，你是看不
⻅它们的
41:27 - 41:31
But that's how they use to to figure out you know what where your tuple is actually
located
但这就是它们⽤来弄清楚你tuple实际位置的⽅法
41:32- 41:33
Case of Postgres
⾄于PostgreSQL，
41.33-41.35
we can do a demo next time
我们会在下节课中，对其进⾏演示
41.35-41.37
but they have clustered indexes
但它们使⽤聚簇索引（clustered index）
41.37-41.41
you can define one you say cluster my table on this index
对于聚簇索引，你可以这样说，请把我的表聚集在这个索引之上
41:41 - 41:43
But it won't actually maintain it in that order
但实际上PostgreSQL并不会按照这个顺序来进⾏维护
41.43-41.50
meaning does the sorting once stores on disk, but then over time it can get out of order
这也就是说，磁盘上所保存的表中的数据⼀开始是排好序的，但随着时间的推移，它就乱序了
41:50 - 41:52
Because I won't do it for you automatically
因为我不会⾃动帮你做这个
41:52 - 41:56
And when we talk about multi version to concurrent issue it'll become very clear why this
is the case for them
当我们讨论在并发时所遇到的多版本问题，我们就能弄清楚其中的原因是什么了
41:59 - 42:03
So let's talk well how we can do some lookups on the our B+tree
So，现在我们来讨论下我们该如何在B+ Tree上进⾏查找
42:04 - 42:06
So again because things are in sorted order
So，再说⼀遍，因为所有东⻄都是排好序的
42.06-42.12
you know we can do fast traversal to find I think we're looking for
我们可以通过快速遍历来找到我们正在查找的东⻄
42:12 - 42:15
But we made one advantage you can do with a B+tree that you can't do with a hash table
其中有⼀个优势，我们可以在B+Tree中所使⽤，但我们在hash table中⽆法使⽤
42.15-42.20
it`s that you don't need to have the exact key in order to do a lookup
那就是我们⽆须通过⼀个具体的key来进⾏查找
42:20 - 42:22
You can have actually some part of the key
实际上，我们可以使⽤这个key的部分内容来进⾏查找（知秋注：⽐如like）
42:23 - 42:26
So the save real simple simple table I have an index on attribute <A,B,C>
So，在⼀个很简单的表上，我在属性<a,b,c>上进⾏索引
42:27 - 42:28
So I can do lookups like this
So，我可以像这样进⾏查找
42.28-42.34
where a = 5 and b=3 where I have I don't have the C, but I have a and B
即条件为(a=5 AND b=3)，这⾥我并没有⽤到c，但我⽤到了a和b
42.34-42.37
and I don't need to have the C, and I can still find the things that I'm looking for
我不需要⽤到C，但我依然能找到我所查找的东⻄
42:37 - 42:39
You can't do that in a hash index
我们不能在hash索引中做这种事情
在hash索引中你是做不到这种事情的
42.39-42.40
because think what happened
思考下这会发⽣什么
42.40-42.44
I would take this 5 and 3 try to hash them together without the c
在不使⽤c的情况下，我试着将5和3⼀起进⾏hash处理
42.44-42.48
and that's gonna jump to some random location that's not just not what I'm looking for
然后，这会跳转到某个随机位置上，然⽽这并不是我想找的那个地⽅
42:49 - 42:52
You can also do queries where you only have maybe the middle guy
当你只使⽤中间那个属性b时，你也能进⾏查询
42:53 - 42:56
Right, you don't have the prefix, you dont have the suffix, you just have the middle the
middle key
我们不使⽤前缀（a），也不使⽤后缀（c），我们只使⽤中间的b
42:57 - 42:58
Again,you can't do that in a hash table
再说⼀遍，我们没法在hash table中做这种事情
42:58 - 43:00
So not all database system support this
并不是所有的数据库系统都⽀持这个
43.00-43.08
pretty much everyone supports the prefix one where you have at least the keys in the
order as they're defined for the index
许多系统都⽀持使⽤前缀进⾏查找，⾄少这些key是按照索引所定义的顺序进⾏排列的
43:08 - 43:10
Now everyone can do this middle one here
所有的系统都⽀持使⽤中间这个key进⾏查找
43.10-43.13
actually I think maybe only Oracle , SQL server can do this
实际上，我觉得只有Oracle和SQL server能做到这点
43:14 - 43:15
So that's a little more concrete example
So，我们来看些更为具体的例⼦
43:16 - 43:24
So let's say we have an index that is defined on two columns or two attributes
So，假设我们在两个列或者两个属性上定义⼀个索引
43:24 - 43:26
So this would be called like a composite key
So，这被称为复合键（composite key）
43:26 - 43:29 ！！！！！！！
So instead of being on for one column, it's actually two columns combined
So，我们并不是在⼀列上定义索引，实际上是使⽤两列⼀起来进⾏索引定义
43:29 - 43:35
And the order of how we define our index will determine what kind of queries we can do
on them
我们所定义的索引的顺序决定了我们所能做的查询类型
43:36 - 43:40
So again if I'm trying to do look up on say, it's a trying to find key (A,B)
So，如果我试着查找key(A, B)
43.40-43.44
well in that case I have both attributes that I've defined in my key
Well，在这个例⼦中，我在我的key中定义了两个属性
43:45 - 43:47
So now I can just do a straight comparison of look at the first key
So，现在我可以先直接对第⼀个key进⾏简单⽐较⼀下
43.47-43.49
and then look at the second key
然后，再对第⼆个key进⾏⽐较
43.49-43.50
and then determine whether I want to go left and right
接着，以此来决定我是该向左⾛还是向右⾛
43:51 - 43:53
So in this case here a is less than equal to A and B is less than equals C
So，在这个例⼦中，A⼩于等于A，B⼩于等于C
43:54 - 43.57
So I know to find the key and I'm looking for
So，这样我就知道该如何找到我要找的key了
43.57-44.00
I go down this path do whatever search I want to do in my node
我沿着这条路线往下，在我的节点中做我想做的任何搜索（⼆分搜索，循序搜索之类）
44.00-44.03
and then I can find the entry that I want
然后，我就能找我想要的那个条⽬了
44:03 - 44:06
Let's say though now I want to do a prefix search
假设，现在我想进⾏前缀搜索
44.06-44.09
where I only have the first element to my composite key, but not the second one
我现在只有复合键（composite key）中第⼀个元素，但我没有第⼆个元素
44:09 - 44:14
So again I can just look at the first key or first attribute of the key, A is less than equal
to A
So，现在我可以看下这个复合键中第⼀个属性，这⾥A⼩于等于A
44:14 - 44:20
So I know that the starting point for what I'm looking for, it has to be down in this
direction, so I go down here
So，我知道此处的(A,C)对于我所要找的东⻄来说是⼀个起点，它应该位于这个⽅向的下⾯，因
此，我要往下去进⾏查找
44:21 - 44:24
But now I'm gonna do a sequential scan across my node
现在我要跨节点进⾏循序扫描
44.24-4433
and going across the the leaves to find all the entry I want up until I reach a key, that is
less than or equal to the you know my key A
通过跨叶⼦节点去找到所有我想要的条⽬，直到遇⻅⼤于等于我复合键（Composite key）中的
A为⽌，我才停⽌搜索
44:33 - 44:37
So in this case as soon as I find one that start to B, I know my search is done
在这个例⼦中，⼀旦我遇到了key中第⼀个属性等于B，我就知道我的搜索完成了
44.37-44.42
and there's not gonna be anything else remaining in the leaf nodes that would satisfy my
predicate
也就是说，在我的叶⼦节点中不再有任何满⾜我条件的元素了
44:42 - 44:47
So this one's pretty easy or not easy, but a lot of database systems can support this one
So，这种⽅式可能简单，也可能不简单，但许多数据库系统都⽀持这个
44:47 - 44:48
The hard one is this
真正难的是这种
44.48-44.52
where you only have you only had the last element not the first one
即我们只有复合键（composite key）中最后⼀个元素，⽽不是第⼀个元素
44:53 - 44.56
So the way you actually end up implementing this is
实际上，我们最终实现这种的⽅法是
44.56-45.04 ！！！
you try to figure out at least in the top and in the root node, which portions of the tree
do I need to look at
我们要试着在根节点处弄清楚树的哪⼀部分，才是我们需要看的
我们要试着在根节点处弄清楚我们需要去查看该树的那⼀部分
45:04 - 45:06
It could be something that there's something could be there
在那⼀部分中，可能有我们要找的东⻄
45:06 - 45:11
So in this case here, I know that no matter what I have for the first value
So，在这个例⼦中，我知道，不管我找的第⼀个元素的值是什么
45:12 - 45:17
It's always gonna B less than C for the second attribute that's the second value
复合键（Composite key）中第⼆个元素B的值始终⼩于C
45:17 - 45:20
So I don't need to look at this guy over here, I only need to look at these other ones
So，我⽆须看这⾥的东⻄，我只需要看另⼀边的其他东⻄即可
45:21 - 45:29
So essentially what you just do is you end up doing multiple index probes or multiple
traversals, and substituting different values for the thing that you don't have
So，也就是说，我们所做的就是使⽤多个索引探针或者是进⾏多次遍历，使⽤多个不同的值来
替换我们所没有的东⻄（这⾥指的是*，通过替换它来进⾏查找）
45:30 - 45:31
So we look at the top and say
So，我们看着根节点时会说
45.31-45.33
well I know I have an A ,I have a B ,and I have a C
Well，这⾥我有⼀个A，⼀个B和⼀个C
45.33-45.37
well there's nothing for this C that would find over here ,so I can skip that
Well，我们在C那部分中找不到我们要找的东⻄，So，我可以跳过它
45:37 - 45:40
So let me now do a lookup in these guys
So，现在我在这两个部分（A和B）中进⾏查找
45.40-45.44
and I substitute the star with an A and each one of those is a separate lookup
我⽤⼀个A将这个*进⾏替换，每个查找都是⼀个独⽴的查找
45:44 - 45:47
And then you combine them all together and produce the final result
然后我们将A和B的查找结果合并在⼀起，并⽣成最终结果
45:48 - 45:51
So Oracle calls this skip scans I don't know what other systems call, yes
So，Oracle将其称为skip scan，我不知道其他系统将它称为什么。请问
46:07 - 46:11
Yeah, yes yes you're right, that's wrong
你说的没错，这⾥我写错了（这⾥没把C包括进去）
46:12 - 46:17
But yes, so you would include that, but it's each one of those use it separately to
traversal
我应该将C这部分也包括进去，但这⾥每部分都应该单独遍历⼀下
46:17 - 46:19
Okay, and you're just filling in the values
Ok，你所做的就是⽤不同的值去替换这个*即可
46:19 - 46:21
Whereas like in this one here,
然⽽在这⾥
46.21-46.24
the main point I make is like this one, he like for this one and the first one
对于这个例⼦和第⼀个例⼦⽽⾔，它的重点在于
46.24-46.27
I had to do one traversal, and then I found the thing I was looking for
我只需做⼀次遍历，然后我就能找到我要的东⻄
46:27 - 46:30
This one is you have to probe down multiple times ,and you fill in the values
对于这⾥，我们必须将*替换成不同的值，并对数据进⾏多次遍历才⾏
46:31 - 46:32
Thank you I'll fix that
感谢你指出这个问题，我会将它修复的
46:35 - 46:38
Okay, so let's get to the good stuff
Ok，我们来看个好东⻄
46:38 - 46:40
So we know what a B+tree is now
So，现在我们知道了B+ Tree是什么了
46:40 - 46:43
Let's talk about actually how you want to build it it makes it this thing actually useful
现在让我们讨论下，我们该如何构建它，并让它变得⾮常有⽤
46:44 - 46:51
So there's this great book which I think is free list ,if you google it it shows up free, I
don't know whether that's true or not
So，图上所展示的是⼀本⾮常好的书，如果你在⾕歌上搜索它，你们应该能免费观看，虽然我
并不确定这是真是假
46:51 - 46.54
There's great book written a few years ago by Goetz Graefe
这是有Goetz Graefe在⼏年前所编写的⼀本好书
46.54-46.56
who's a famous database researcher
他是⼀位⾮常著名的数据库研究⼈员
46.56-47.00
he's gonna talk about a lot of this stuff he's done for query optimization later on
他之后会对他所做的查询优化相关⼯作进⾏⼤量讨论
47:00 - 47:07
But he basically he wrote this book is like all the modern techniques and peaks and
optimizations you can do in a B+tree in a real system
但基本上来讲，他在这本书中所写的所有现代技术和优化⽅法，你们都可以在真实的系统中或者
是B+ Tree中进⾏使⽤
47:08 - 47:13（这段话有屏蔽词）
So we're gonna cover some of these things and actually it's a really light read ... and it
was
So，我们会对其中部分内容进⾏介绍
47.13-47.17
and like it covers all the really important topics, and in a way that's easy to read
书中介绍了所有很重要的话题，并且对于我们来说很容易去理解
47:17 - 47:25
So which I had a handle Node Size, how to do Merging, how to hand Variable Length
keys the Non-Unique keys what they asked about and then Intra-Node Search,how to do
better searches inside the node
这⾥⾯介绍了，如何处理node size，如何进⾏合并，如何处理可变⻓度的key，以及⾮唯⼀键，
接着就是Intra-Node搜索，以及如何更好地在节点中进⾏搜索
47:26 - 47:34
So in general the you can think of a node in our B+tree, it's just a like a page in our table
So，⼀般来讲，你可以将B+Tree中的⼀个node当做我们表中的page来思考
47:34 - 47:37
Right, so the size of the node could be the same as a page size
So，⼀个node的⼤⼩可能等同于⼀个page的⼤⼩
47:38 - 47:40
In practice though it doesn't have to be
在实战中，尽管我们⽆须这样做
47.40-47.43
and depending on what kind of hardware we're storing our database on
取决于我们的数据库所存放的硬件类型
47.43-47.50
we actually may want to have even larger page sizes or smaller node sizes are smaller
node sizes
实际上，我们想要的可能是更⼤的page或者是更⼩的node
47:50 - 47:52
So it turns out the research shows that
So，根据研究表明
47.52-48.00
the slower the disk you have, you're just drawing your index on your tree on the larger
the node size you want
如果你使⽤的磁盘速度很慢，那么当你在构建你树上的索引时，你会希望你的节点⼤⼩会更⼤⼀
点
48:00 - 48:01
And you know it should be obvious, right
显⽽易⻅
48:02 - 48:03
The for every disk I/O I do
对于我所进⾏的每次磁盘I/O来说
48.03-48.08
I'm bringing I can read the the nodes sequentially all the pages for it
我可以按顺序读取节点上的所有page
48:08 - 48:14
And that's gonna be much faster than you went to random I/O two different different
nodes, if my node is is a smaller size
如果我的节点的⼤⼩更⼩，那么就要⽐在两个不同的节点上进⾏随机I/O速度来的更快
如果跳到不同节点间随机I/O的速度⾮常快，你的节点就可以使⽤更⼩的size(知秋注：其实看的
是寻址的速度，内存⼤于固态硬盘⼤于机械硬盘，寻址不需要加锁，但读和写都是要有锁存在
的)
48:15 - 48:16
So if you're in a spinning hard drive
So，如果你是⽤的是⼀个机械硬盘
48.16-48.19
you have node sizes up to one megabyte that's usually a good number
你所使⽤的节点的⼤⼩最多是1MB，通常情况下，这就很好了
通常情况下，你的节点⼤⼩为1MB就⾜够了
48:20 - 48:22
SSDs roughly 10 kilobytes
如果是SSD，那么10kb左右就可以了
48.22-48.27
which roughly corresponds to the node sizes or page sizes that real database systems
use
这⼤致对应了在真实数据库系统下所使⽤的node⼤⼩或page⼤⼩
48:27 - 48:30
But then if you're an in-memory database, you actually want to go low as 512 bytes
但如果你使⽤的是内存型数据库，那么你所使⽤的node⼤⼩或page⼤⼩只需要512 bytes就够
了
48:31 - 48:36
And so the this is another good example what we talked about
So，这是我们所讨论的另⼀个很好的例⼦
48:36 - 48:43
how in our buffer pool We could have one buffer pool our system for index pages, and
one buffer pool set for data pages
在我们的buffer pool中，我们可以使⽤⼀个buffer pool来管理我们的index page，另⼀个
buffer pool⽤来管理data page
48.43-48.44
and we could set them to be different sizes
我们可以将它们设置为不同的⼤⼩
48:44 - 48:52
So I could set if I'm going to slow spinning this hard drive, and I can have a buffer pool
,my B+tree pages and have them be one megabyte
So，我可以在我的机械硬盘上的buffer pool中⽤来存放B+ Tree page，并将page的⼤⼩设置为
1MB
so，如果我使⽤的是速度很慢的机械硬盘，我可以将⽤来存放B+ Tree page的buffer pool⼤⼩
设置为1MB
48.52-48.55
whereas my data pages I'll keep them at 8 kilobytes or 16 kilobytes
然⽽，我将我的data page设置为8kb或16kb
⽽将存放 data pages的buffer pool的⼤⼩保持在8kb或16kb
48:56 - 49:00
The optimal size can also vary depending what kind of operations or queries you're doing
on it
最佳⼤⼩同样是根据你所进⾏的操作或查询来决定的
49:01 - 49:03
So leaf node scans we're doing long sequential reads
So，对于叶⼦节点上的扫描来说，我们使⽤的是耗时⻓的循序扫描
49.03-49.06
those are typically better to have larger node sizes
通常情况下，这种更适合于⼤⼩更⼤的节点
49.06-49.08
because I can do more sequential I/O
因为我可以进⾏更多的循序扫描
49:08 - 49:12
where if I'm doing a lot of lookups a lot of traversal that's a lot of random I/O
如果我所进⾏的查找、遍历需要进⾏⼤量的随机I/O
49.12-49.17
so therefore I want to have smaller node sizes
因此，我想要的是体积更⼩的节点
49:17 - 49:28
So the next thing we can do is actually violate the very thing, that said in the beginning
about how the we always have to merge anytime the anytime we're less than half full
So，正如我⼀开始所讲的那样，当节点没有达到半满状态，我们就得随时进⾏合并操作
49:29 - 49:32
And the demo I did it was sort of simple it would do exactly that
我之前展示的那个demo很简单，它就是按照这个来做的
49:33 - 49:38
But in practice you may actually not want to do this immediately when you're less than
half full
但在实战中，当你的节点并没有达到半满状态的情况下，我们可能实际上并不想⽴即进⾏合并操
作
49:39 - 49:44
Because it's just like when we saw in the hash table, we do leaf nodes with linear
hashing at the end
因为当我们在hash table中看到这个的时候，在最后我们会使⽤linear hashing来处理我们的叶
⼦节点
49:45 - 49:46
I may compact something
我可能会去压缩某些东⻄
49.46-49.47
I may merge something
我可能会合并某些东⻄
49.47-49.49
because I went less than half full,
因为某些节点并没有处于半满状态
49.49-49.56
but then the next operation inserts into that node and now I have to just split all over
again
但然后在下次操作的时候，我⼜往这个节点中插⼊了些数据，现在我得将它进⾏拆分开来
49:56 - 49.59
So the the merging operation is expensive
So，合并操作的代价是很昂贵的
49.59-50.02
splits off the top splits are also expensive
拆分的代价同样也很昂贵
50.02-50.04
but it splits we have to do ,because we ran out of space in our node
但我们必须进⾏拆分，因为我们耗尽了我们node中的空间
50:04 - 50:10
The merge is we can actually relax that requirement and not merge things right away
实际上我们可以将要求放宽，我们不⽴即将这些东⻄进⾏合并
50:10 - 50:12
So it gets slightly unbalanced over time
So，随着时间的推移，⼆叉树会逐渐变得略微不平衡
50.12-50.17
and then in the background we can have like a garbage collector or something go
through and do rebalancing
接着，在后台，我们可以使⽤⽐如垃圾回收器之类的东⻄来对它进⾏重新平衡
50.17-50.21
or what's often times the case people just rebuild the entire tree from scratch
或者，有的时候，⼈们会直接从头开始来重建这棵树
50.21-50.23
and that fixes all these issues
这就会修复所有问题
50:23 - 50:27
So these a lot of times you see this in you know high-end commercial enterprise systems
So，你会在许多⾼端商⽤企业级数据库系统中经常看到这个
50.27-50.30
you know though they'll shut the database down over the weekend
他们会在周末的时候关闭数据库
50:30 - 50:31
Because they're gonna rebuild all their indexes
因为他们要去重建他们的所有索引
50.31-50.34
and that's essentially what they're doing there their rebalancing everything
简单来讲，这就是他们重新平衡⼆叉树的⽅式
50.34-50.35
because it wasn't always merging correctly
因为这并不会⼀直正确合并
50:37 - 50:41
Anytime you see like a bank says they're down at 3 a.m on a Sunday in the morning
有时候你们会看到，银⾏发通告表示它们会在周⽇早上3点的时候停⽌服务
50.41-50.44
it's probably this is one of the things they're probably doing
这就是他们所可能做的其中⼀件事（重构索引）
50:46 - 50:50
All right, so now we want talk about how we actually want to handle variable length keys
So，现在我们想讨论的是我们实际该如何处理可变⻓度的key
50:51 - 50:52
So again everything I've shown so far
So，在⽬前为⽌我所展示的东⻄中
50.52-50.54
we assume that the key is a fixed length, and the value is always fixed length
我们假设key是固定⻓度的，value也始终是固定⻓度的
50:55 - 50:57
And in practice the values will always be fixed-length
在实战中，value始终是固定⻓度的
50:58 - 51:00
So there's four different ways we can handle this
So，我们有四种⽅式可以处理这个问题
51:01 - 51:05
So the first approach is that rather than storing the key itself in the node
So，第⼀种⽅式是，我们并不会将key本身存放在节点中
51:05 - 51:13
We store a pointer to the actual attribute or the tuple, where we can do a lookup to find
what the key actually is
我们所保存的是指向该属性或tuple的指针，这样当我们进⾏查找的时候，我们就能找到这个key
是什么了
51:14 - 51:20
So again if I have you know if I have an attribute that's a varchar,
So，再说⼀遍，如果我的属性的类型是varchar
51.20-51.24
instead of storing that varchar in the node,I have its record ID
我并不会将这个varchar保存在节点中，⽽是将它的record id保存在节点中
51:24 - 51:29
And then when I want to figure out whether the key,I'm doing a look-up on matches that
key that's stored in that B-tree
然后，当我想要弄清楚我所查找的key是否与B-Tree（B树）上所保存的key匹配的时候
51:29 - 51:34
I follow the record ID get the page, and go look at them with a real value actually is
我会通过record id来拿到这个page，并看下它⾥⾯实际所保存的值是什么
51:35 - 51:37
So this is obviously super slow
So，显⽽易⻅，这样做的速度会⾮常慢
51.37-51.40
it's nice, because we're storing less data
这样做很nice的原因是我们所保存的数据量变少了
51.4-51.44
because now we just store the pointer instead of the actual key in the node
因为我们现在节点中所保存的是指针，⽽不是key
51:44 - 51:47
But it's expensive to do that lookup you know as we're traversing
但当我们遍历的时候，进⾏查找的代价会很昂贵
51:48 - 51:51
People tried this in the 1980s for in memory databases
在1980年代的时候，⼈们试着在内存型数据库中使⽤这个
51.51--51.53
because memory was really expensive
因为内存当时真的很贵
51:53 - 51:55
But nobody actually does this anymore
但实际上没⼈再会这么做了
51.55-51.59
everybody stores the keys always in the node
所有⼈都将key始终存放在节点中
52:00 - 52:02
The next you could you have variable length nodes
我们所能使⽤的第⼆种⽅法就是使⽤可变⻓度的节点
52.02-52.08
this is basically allows the the size of a node can vary based on what's stored in it
简单来讲，这允许⼀个节点的⼤⼩根据它所保存的东⻄来变化
52:08 - 52:09
But we've said this is a bad idea
但我们已经说过这是⼀个糟糕的想法
52.09-52.14
because we want our page sizes to be always the same in our buffer pool and on disk
因为我们想让buffer pool和磁盘上的page⼤⼩始终⼀样
因为我们想让我们的page⼤⼩在buffer pool和磁盘中始终是⼀样的
52:14 - 52:20
so we don't have to worry about doing the thin backing problem to decide how about
you know find free space to put in what we want to store
这样我们就⽆须去担⼼该如何找到空闲的空间将我们的数据放进去了
52:21 - 52:22
so nobody does this one as well
So，同样也没⼈使⽤这种⽅式了
52:23 - 52:25
The next approach is do padding
下⼀个⽅式就是使⽤填充（padding）
52.25-52.29
or basically we say you look at what the attribute is, and you're trying to index on
在我们所试着进⾏索引的属性上
52:29 - 52:33
And we say that whatever the max size it could be, no matter what key you give us
不管这个属性的最⼤⼤⼩是多少，也不管你给我们的key是什么
52.33-52.41
we will Pat it out with either null bits or, you know zeros to make it always fit exactly our
our node size
我们会使⽤null或者0对其进⾏填充，以此让它始终完全适合我们的节点⼤⼩
52:41 - 52:43
So everything is always nice and nicely aligned
So，所有数据始终都完美对⻬
52:44 - 52:46
So some systems actually do this
So，实际上有些系统采⽤了这种⽅式
52.46-52.48
I think Postgres does this and we can look at that next time
我觉得PostgreSQL采⽤了这种⽅式，我们下节课的时候可以看下
52:50 - 52:54
But again itsthe trade off, I'm wasting space in order to store things
但再说⼀遍，这是⼀种取舍，为了保存数据，我得浪费空间
52:54 - 52.59
So this why is also - it's super important to make sure that you define your schema
correctly,
So，这就是为什么要说确保schema的正确定义是⾮常重要的
52.59-53.04
like if I'm storing email addresses which are you know maybe 32 characters or 50
characters
⽐如，如果我存的是email地址，它的⻓度可能是32个字符或者是50个字符
53:04 - 53:06
But I set the varchar' size to be 1024
但我将varchar的⼤⼩设置为1024
53.06-53.09
if I'm padding it out up to 1024
如果我将数据填充到1024
53.09-53.12
even though most of my emails aren't that big,but then I'm wasting a lot of space
虽然我⼤部分的email并没有那么⼤，但我仍然浪费了⼤量空间
53:12 - 53:13
Yes
请问
53:23 - 53:25
So when you say again sorry
能再说⼀遍吗？
53:30 - 53:36
Correct,yeah so when you call Create table, you can define varchar,you define the length
in it
正确，当你创建表时，你可以在表中定义varchar的⻓度
53:36 - 53:40
You don't have to put it in I and I I don't different systems to deal with different things
不同的系统会做不同的事情
53:40 - 53:43
But in practice you always want to say this is the max size of what I actually can store
但在实战中，你总是想说，这是我实际所能存储的最⼤体积了
53:44 - 53:47
Right, and then so varchar supposed to be variable length,
So，varchar的⻓度应该是可变的
53.47-53.49
so even though I say the max size could be 32
So，即使我说，最⼤的⼤⼩是32
53:51 - 53:54
If you give it a 16 16 you know character string
如果你给出的字符串⻓度是16个字符
53.54-53.57
it could in theory store that more compactly
理论上来讲，它能更紧凑的保存这个数据
53:57 - 53.59
Some systems do different things
有些系统会做些不同的事情
53.59-54.05
some systems actually say it's a char and where it's always gonna be that size that's
always padded out
实际上，某些系统会说它是⼀个char，但它们始终会将这个数据的⼤⼩填充到我们所设置的⼤⼩
为⽌
54.05-54.07
they actually just still that store that as a varchar
这些系统实际上依然将它作为varchar来保存
54:07 - 54:12
So logically you don't know ,you don't care, underneath the covers they can do different
things
从逻辑上来讲，你不知道，也不关⼼它们内部所做的不同的事情
54:13 - 54:15
And MySQL was always the worst offenders
并且，MySQL始终是最糟糕的玩意
54:15 - 54:17
So if you say the max size of our string is like 16
So，如果你说我们字符串的最⼤⼤⼩为16
54.17-54.22
and you give it a 32 character string, it'll store it just truncates it silently for you
然后，你往⾥⾯塞了⼀个32个字符的字符串，它会将它保存进去，但MySQL会偷偷摸摸将这个
字符串的⼀部分给切掉
54:23 - 54:26
All right, so Postgres and all the system will throw an error
So，PostgreSQL和其他所有系统则会抛出⼀个错误
54.26-54.30
but the database system should enforce that correctly ,same thing for index
但数据库系统会强制让它正确，对于索引来说也是同样如此
54:30 - 54:32
We like to build an index we have to be told
当我们说要构建⼀个索引时
54.32-54.36
you know here's the attributes and our tables your indexing
假设这⾥是我们要进⾏索引的属性和表
54:36 - 54:37
So we know what their type is
So，我们知道它们的类型是什么
54.37-54.44 ！！！
we know what their max sizes, and we can pad out as needed
我们也知道它们的最⼤⼤⼩，我们可以根据需要对数据进⾏填充
54:44 - 54.48
All right, with probably more common is to use in an indirection map
更为常⻅的⽅式可能是使⽤⼀个间接映射（indirection map）
54.48-54.54
where store pointers for our keys inside of our sort of key array
我们将我们key的指针存放在key数组中
54.54-55.01
but we're still the pointers are just actually two offsets in our node themselves rather
than to some arbitrary page
我们这⾥的指针实际上是两个在我们这个node中对应的offset值，⽽不是指向其他任何page
55:01 - 55:05
So it would look like this, so we have a sort of key map
So，它看起来应该像这样，我们有这样⼀种key map
55:05 - 55:08
So again this is sorted these are just pointers are offsets to down here
So，再说⼀遍，这⾥是有序的，这下⾯所存放的指针，其实存放的是offset值（知秋注：node
所在的地址+数据在该node内的offset，就能获取到对应想要的数据，有点类似于我们前⾯所学
的slotted-page）
55:09 - 55:13
But these are sorted based on the values of the keys
但它们是根据key的值来排序的
55:13 - 55:14
So to be very clear
So，为了让你们更明⽩些
55.14-55.17
the keys themselves not the keys corresponding value
这⾥我说的是key⾃身的值，⽽不是它所对应的value值
55:17 - 55:19
But the actual string that we're trying to store
但这是我们实际所试着保存的字符串
55:19 - 55:23
Right, and so just like in the slotted page layout for tuples
So，这和slotted page中tuple的布局很像
55:24 - 55:26
We're going to grow from the end to the beginning
这⾥的key+value是从后往前进⾏存储
55.26-55.31
and this side grows from the you know from from beginning to the end
这⾥的sorted key map则是按照从前往后的顺序进⾏存储
55.31-55.32
and at some point we get to full
在某⼀时刻，我们的节点会变成全满状态
55:32 - 55:35
Actually, I think this has to be fixed size, so we have to set a degree at a time
实际上，我觉得节点的容量必须是固定的。So，我们得给它设置⼀个度
55:35 - 55:38
So but if I don't run out of space for what I'm trying to store here
但如果我所保存的东⻄并没有耗尽这个节点的空间
但如果这个节点没有⾜够空间来存储要存的数据
55.38-55.42
then I can have an overflow page that's that's chained to this
那么我就可以使⽤⼀个链接到该page的overflow page
那么我就可以使⽤⼀个overflow page来链接到这⾥
55:43 - 55:47
So again this is just just a an offset to whatever the key is
So，再说⼀遍，这只是⼀个key在该节点内对应的offset值
55.47-55.49
so now if I'm doing binary search as I'm jumping around this array,
So，此时如果我进⾏⼆分搜索，当我跳到这个数组中时
So，此时，当我跳到这个数组中并进⾏⼆分搜索时
55.49-55.51
I jump down here to see what the actual key value is
我会根据该offset值跳到这⾥来看下，这个key实际值是什么
55:53 - 55:56
So what's a really simple optimization we can do to make this go faster
So，我们应该使⽤怎样的优化才能让这个变得更快呢？
55:58 - 55:58
Into that
那位同学请回答
56:07 - 56:13
It statement is is it a statement or a question, do we store this as an array or a linked list
So，他的问题是，我们是以数组的形式还是以链表的形式对它进⾏保存
56.13-56.14
it's always stores in an array
它始终保存在⼀个数组中
56:22 - 56:27
Okay, so his statement is, I'm storing this as an array or vector u vectors as a wrapper
an array
Ok，他的问题是，我是以数组的形式保存还是以vector来保存（vector其实是包装后的数组）
56:28 - 56:33
If I now do insertion or deletion that's gonna take O N or, yes
如果我想在进⾏插⼊或删除，它的复杂度就是O(n)
56:34 - 56:37
But again like this is this is just within the node itself
但这只是对节点⾃身⽽⾔
56:38 - 56:40
So the size is not that big
并且它的⼤⼩也没有那么⼤
56:41 - 56:45
Right,so you know fan out of like maybe 32
假设它⾥⾯有32个元素
56:46 - 56:48
So I have 32 elements I need I need to keep sorted
So，我有32个元素要进⾏排序
56:48 - 56:50
I can do that in cache that's very fast
我可以在缓存中来做，这样会⾮常快
57:07 - 57:10
Correct, okay so say I'm doing binary search
没错，假设我在进⾏⼆分搜索
57:11 - 57:14
So in this case your binary search is just you just do the linear search
So，在这个例⼦中，我们只做线性搜索
57:15 - 57:19
So I've just fought scan along and I want to see is there's the key I'm looking for a match
what what I have
So，我沿着这⾥进⾏扫描，我想看下我所查找的key与我所拥有的key是否匹配
So，我沿着这⾥进⾏扫描，我想从中找到⼀个可以与我⼿⾥这个key相匹配的存在
57:19 - 57:23
So I have to follow this pointer,but again it's just an offset ,it's in the same page
So，我必须由这个指针⼊⼿，但再说⼀遍，它只是⼀个offset值，它在同⼀个page中
57:24 - 57:26
So it's gonna be your maybe 16 bits
So，它的⼤⼩可能是16bit
57:27 - 57:31
I follow that offset to jump to where this is ,and then I do my comparison
我按照这个offset值跳到它所在的位置，然后进⾏⽐较
57:31 - 57:34
And if it doesn't match， then I jump back and do the same in jump down here
如果它不匹配，那我就跳回去，然后再重复做同样的事情，然后跳到下⾯来进⾏⽐较
57:34 - 57:42
And so just like in slotted pages where the tuples want to be sorted in the order as
they're laid out in the page and the same way that are sorted at the slot array
So，就像slotted page中那样，tuple想按照它们在page中的顺序进⾏排序，并且顺序与slot
array中相同
So，就像slotted page中那样，tuple在page中的存储布局顺序与slot array中对应的顺序相同
57:42 - 57:45！！！！！
This verbling data about at the bottom down here can be any order that at once
下⽅这⼀⾏数据可以是以任意顺序进⾏排列
57:45 - 57:48
I just know how to you know I know how to jump to it based on this
基于此，我知道该如何跳转
57:52 - 57:54
His question is for non leaf nodes do you do the same thing, yes
他的问题是，对于⾮叶⼦节点来说，我们是否会做同样的事情。是的
57:55 - 57:57
It's and this is for very well aligned data and any node
这是⽤于对⻬好的数据以及任意节点的
⽆论什么节点，只要数据对⻬好
57:59 - 58:03
So this is sort of micro optimization
So，这是⼀种微优化
58.03-58.05
and going to disk is always the most expensive thing
访问磁盘所付出的代价始终是最昂贵的
58:06 - 58:08
But a really simple thing we could do is
但我们可以做的⼀件⾮常简单的事情是
58.08-58.12
just recognize that before since this is only 16 bits in general
通常情况下，因为这⾥仅有16 bit⼤⼩的空间
58.12-58.14
I have a lot of space up here
在上⾯我有⼤量的空间
58:14 - 58:20
So maybe I just take the first character of every string, and just embed it inside upper
here
So，我所做的可能是将每个字符串的⾸字⺟放在上⾯这⾥
58:21 - 58:23
So now when I'm scanning along and trying to find the thing I'm looking for
So，现在当我开始扫描，并试着找我想找的东⻄的时候
58.23-58.30
if my key doesn't match exactly you know the first character that I know I don't need to
traverse down and find it
如果我的key⽆法和这⾥第⼀个字符准确匹配，那么我就⽆须往下遍历来查找这个key了
58:30 - 58:33
Again, this is all going to be in memory
再说⼀遍，这些都是在内存中做的
58.33-58.35
this is like avoiding cache misses,
这样可以避免cache miss
58.35-58.38
in making the binary search and making the search on this run faster
这样可以让⼆分查找或其他查找变得更快
58:38 - 58:40
Okay, this is a micro optimization
Ok，这是⼀种微优化
58.40-58.43
a voting disk is always the major thing that we care about in this course
在这⻔课中，我们始终最关⼼的就是Voting Disk（它⾥⾯记录着节点成员的信息）
58:43 - 58:45
But this is a really simple trick that you can do to speed this up
但你可以使⽤这种很简单的技巧，来让这些操作变得更快
58:46 - 58:46
yes
请问
58:50 - 58:53
Again, it looks like what if there's two persons that name is start the same letter
他的问题是，如果两个⼈的名字开头的字⺟相同的话，会怎么样呢
58:54 - 58.56
Again, you'd have to depending what you're looking for
这取决于你查找的是什么东⻄
58.56-59.01
if you want to find exactly one, you find the first one you're done
如果你想找到⼀个，那么你找到第⼀个结果的时候，搜索就结束了
59:02 - 59:04
If you need to find anybody you have to go to both of them
如果你想找的是其中任何⼀个⼈（⾸字⺟是相同的两个），那么你就得去找这两个了
59:05 - 59:08
Alright, means same way here right
和此处的情况相同
59.08-59.14
for this one here, I'd have to I'd have to if I'm trying to find everyone's different here
对于这⾥的情况⽽⾔，这⾥每个⼈都不⼀样
59:13 - 59:16
But if there's like Paul and Prashanth who's my PG student
⽐如这⾥的Paul Prashanth，他是我负责的研究⽣
59:17 - 59:19
I would scan down here find Prashanth
我会先向下扫描，找到Prashanth
59.19-59.23
then actually go to the next one just make sure that that one doesn't have the same, you
know doesn't have the same thing as well
然后，再跑到下⼀个位置，以确保这⾥并没有和它相同的元素存在
59:36 - 59:38
Okay,so he said collision
Ok，他说了这⾥会有碰撞
59:39 - 59:42
So there's dip so I'm showing lexical graphical ordering alphabetical ordering for this
So，这⾥我所展示的是按照词汇顺序或者是字⺟表顺序进⾏排列的
59:43 - 59:49
in high-end database systems you can actually define arbitrary sort orders, everything
still works the same
在⾼端的数据库系统中，实际上你可以对顺序进⾏任意⽅式的排序，但它们的⼯作⽅式都是相同
的
59:55 - 59.58
You're talking like dictionary codes for not talk about that
你说的是字典相关的东⻄，但我们讨论的并不是那个
59.58-1.00.02
I could have different you know sorting based on whether it's you know code or what
language I'm using
根据我所使⽤的语⾔或者代码，我可以定义不同的排序⽅式
01:00:03 - 01:00:07
For that one you have to begin the database system would know ,this is how the sort
order is
数据库系统会知道这⾥的排序规则是怎么样的
01:00:07 - 01:00:10
So what you know it would know what what prefix if it wants to store up in here
So，数据库就会知道它该如何保存前缀
01:00:12 - 01:00:14
Again, high level ideas that's still the same
再说⼀遍，⾼级层⾯的思想都是⼀样的
01:00:16 - 01:00:16
yes
请问
01:00:24 - 01:00:35
Correct, sir he said so he said, if you have K keys, you have at most k plus one pointers
to other things
正确，如果你有k个key，那么你最多会有k+1个指向其他东⻄的指针
01:00:42 - 01:00:47
Not necessarily for simplicity, yes, you just scan along the keys do linear search
为了简单起⻅，这没错，你可以沿着key进⾏线性搜索
07-04
01:00:55 - 01:01:00
So his statement is that the really the complexity should be K times log n
So，他的说法是，复杂度应该是K*log(n)
01:01:01 - 01:01:06
Yes, the that back that's a constant we can throw out
没错，但这个常数K我们可以丢掉
01:01:07 - 01:01:11
Because the log n is the maximum number of page IO`s I have to do to traverse
因为log(n)指的是我在遍历时对page必须要做的I/O的最⼤次数
1.01.11-1.01.15
that's always orders of magnitude faster than doing the cacheline lookups here
这种做法始终要⽐通过cacheline进⾏查找要快好⼏个数量级
01:01:16 - 01:01:21 ！！！！
Remember I said in the very beginning here's less storage hierarchy, anything above
memory we don't care about
还记得我在⼀开始所说的，我们对内存之上的存储层次结构并不关⼼
01:01:21 - 01:01:22
We can throw away
我们可以⽆须考虑
01:01:22 - 01:01:26
It`s to disk IO is the real color, we got to avoid that
磁盘I/O才是我们的重点，我们⽆须关⼼cpu cache层⾯的东⻄
01:01:29 - 01:01:30
Well, get to that a second
Well，我们稍后再来说你的问题
#################################
01:01:30 - 01:01:37
Okay, all right so now, I'll get to the other thing as well is how we handle non-unique
indexes
接下来我们要讨论的是如何处理⾮唯⼀索引
01:01:37 - 01:01:41
Well, this is the same thing we talked about in hash tables, there's two basic Approaches
Well，这和我们所谈论的hash table是同⼀回事，这⾥有两种基本⽅案
01:01:41 - 01:01:43
You can duplicate the keys
你可以对key进⾏复制
1.01.43-1.01.50
and be mindful like in our example here the duplicate key split over to another to another
node
同时也要注意，在我们的例⼦中，复制的key会被拆分到另⼀个节点中
01:01:50 - 01:01.52
We have to be mindful that that could occur
我们必须要⼩⼼这种情况的发⽣
1.01.52-1.01.56
and make sure we read everything we need to read
并确保我们读取了我们所要读取的⼀切数据
1.01.56-1.01.56
or we store a value list
或者，我们可以保存⼀个value列表
1.01.56-1.01.58
where we store the key once
即我们只保存key⼀次
1.01.58-1.02.04
and we duplicate the value or have a separate space in our node to store all the values
for that given key
然后在我们的节点中，我们使⽤⼀个单独的区域来保存给定key的所有value
01:02:05 - 01:02:06
All right, so it looks like this
So，它看起来像这样
01:02:06 - 01:02:08
So if I duplicate the key
So，如果我对key进⾏复制
1.02.08-1.02.11
right I just have the key multiple times
我就会有多个相同key
01:02:11 - 01:02:15
And again it's just like before， the offset points down to wherever the value is
再说⼀遍，这⾥和之前⼀样，这些offset值会指向下⾯的value
01:02:16 - 01:02:18
And you know if I insert a new one
如果我再插⼊⼀个新的
1.02.18-1.02.21
then I know I inserted here and certainly new k1
然后我就知道这⾥插⼊了⼀个新的K1
1.02.21-1.02.25
I inserted here and move everything over ,and everything still works
我把K1插⼊到这⾥，并将Sorted Keys中的其他元素重新移动排序，所有的东⻄依然能正常⼯作
（知秋注：⾥⾯存放的offset值并没有发⽣改变）
01:02:25 - 01:02:28
The value list since you just looks like this, I just store the key once
value列表和我们之前所看的⼀样，在这⾥的key列表中，每个key我只保存⼀次
01:02:28 - 01:02:37
But then now I also have a pointer an offset to somewhere else in the node ,where I have
all the values that correspond to that that giving key
但现在我通过⼀个指针指向该节点中某个offset值处，它⾥⾯保存了所有该key对应的value
01:02:37 - 01:02:39
That's the first approach is more common
第⼀种⽅法更加常⽤
1.02.39-1.02.41
I don't know who actually does this one here
实际上，我并不清楚到底有谁在使⽤第⼀种⽅法
1.02.41-1.02.41
yes
请问
01:02:51 - 01:02:57
So her question is, can I assume for that duplicate keys will always be in the same node
,no
她的问题是，我们能否让重复的key始终都在同⼀个节点中？答案是No
01:02:58 - 01:03:00
So in the example I showed from that demo
So，在我所展示的demo中
01:03:00 - 01:03:03
It actually moved it over as a sibling key
实际上，我们将它变为⼀个同级的key（同⼀层）
01:03:05 - 01:03:06
That's one way to do it
这是其中⼀种⽅式
1.03.06-1.03.07
all other systems actually would have an overflow chain
实际上其他所有系统会使⽤overflow chain这种⽅式
1.03.07-1.03.11
that would say for that given leaf node
我们会这样说，对于⼀个给定的叶⼦节点
1.03.11-1.03.19 ！！！！
oh by the way here's some other pages or other nodes down below you that have that
you have the keys that correspond to what ,you know what you're actually storing up
above
在它的下⽅有某些其他page或者节点，它⾥⾯保存了与我们上⾯keys所对应的内容
01:03:25 - 01:03:27
Her question is, if I'm searching for a given key, how would I know what key to follow
她的问题是，如果我使⽤⼀个给定的key进⾏查找，那么我该怎么沿着我知道的那个key去查找
01:03:28 - 01:03:30
So going back to that example
So，回到那个例⼦中去
1.03.30-1.03.35
I would I found looking for a greater than equal to four
如果我要找的是⼤于等于4的key
1.03.35-1.03.38
I had I have to go down on the on this side
那么我得沿着这个⽅向往下⾛
1.03.38-1.03.41
and find the first entry point for four
并找到4的第⼀个⼊⼝点
1.03.41-1.03.47
then I keep scanning along the leaf nodes, until I find something that's not equal four
,and then I know I've seen everything
然后我沿着叶⼦节点进⾏扫描，直到我找到不等于4的东⻄为⽌，那么我就知道我找到了所有我
要的数据
01:03:47 - 01:03:50
Again the database system knows where the keys are unique or not
再说⼀遍，数据库系统知道这些key是唯⼀的，还是不唯⼀的
01:03:50 - 01:03:51
So it knows whether it has to do that
So，它知道它该怎么做
01:03:51 - 01:03:55
So it knows that, oh this is a primary key or this is a unique index
So，如果它知道这是⼀个主键或者是⼀个唯⼀索引
01:03:56 - 01:03.58
So the thing I'm looking for should only appear once
So，我所查找的东⻄就应该只出现⼀次
1.03.58-1.04.00
and therefore I just get to the one leaf node that it has what I want
因此，我只需要找到那个包含我想要的数据的那个叶⼦节点就⾏
01:04:00 - 01:04:01
If it's non unique
如果它不是唯⼀的
1.04.01-1.04.03
then you have to account for that
那么我们就必须对其进⾏处理
1.04.03-1.04.06
and either, again you if it's if it's just duplicated across leaf nodes
如果它在多个叶⼦节点中有重复
01:04:06 - 01:04:07
I scan along siblings,
我会沿着叶⼦节点进⾏扫描（知秋注：兄弟节点）
1.04.07-1.04.08
if it's an overflow
如果是在overflow的节点上
如果这个叶⼦节点有overflow（page，或者是由overflow所引出的节点，page可以看作是节
点）
1.04.08-1.04.11
I just find that the first leaf node and then scan down its chain
我就会找到第⼀个overflow的叶⼦节点，并往下扫描它的chain node
我就会先找到这个叶⼦节点，然后往下扫描它的chain node（其实就是由该key对应数据放不下
所引出的这些overflow page所对应的节点）
01:04:12 - 01:04:12
Yes
请问
01:04:16 - 01:04:23
The question is the size is the size of key always the same, or do the size of the key is
not always the same, or the values or this always Same
他的问题是，key的⼤⼩会始终⼀致，还是不⼀致，或者value的⼤⼩是否始终⼀致
01:04:23 - 01:04:25
Again, I'll show this next class
我会在下节课向你们展示这⼀点
1.04.25-1.04.29
if the value is just a record ID for a tuple
如果这⾥的value只是⼀个tuple的record id
1.04.29-1.04.30
always the same
那么就始终⼀致
1.04.30-1.04.32
see the 32 bits or 64 bits depending on the system
根据系统的不同，它可以是32 bit，也可以是64 bit
01:04:33 - 01:04:35
If it's the actual tuple itself
如果它是tuple⾃身
1.04.35-1.04.37
like in MySQL
⽐如在MySQL中
1.04.37-1.04.39
then you got a deal overflows that way
那么你就必须处理overflow的情况
1.04.39-1.04.42
and that that's more complicated, we'll discuss that next class
这会更加复杂，我们会在下堂课进⾏讨论
01:04:45 - 01:04:50
All right, again we've already discussed this briefly, but I'm gonna show that there's
different ways to do searches within the node
All right，我们已经对此进⾏了简单讨论，但我想向你们展示⼏种不同的在节点中进⾏搜索的⽅
式
⼀些在节点中进⾏搜索的不同⽅式
01:04:50 - 01:04:54
Again, I Traverse as I'm traversing the nodes traversing the tree
当我在遍历节点或者是遍历树的时候
01:04:54 - 01:05:02
I have to do a search on the key array to find a thing I'm looking for to decide whether
you know there's a match that I want or whether I need to go left or right
我必须在key数组进⾏搜索，以此找到我要找的东⻄，并弄清楚这⾥遇到的key是否与我要找的
匹配，或者是我应该往左⾛还是往右⾛
01:05:02 - 01:05:05
So the most basic way to do this, it's just a linear search
So，最简单的做法就是使⽤线性搜索
01:05:05 - 01:05:06
So I'm trying to find key 8
So，如果我试着找到值为8的key
1.05.06-1.05.13
I just start at the beginning of my sort of key array scan along to I find one and I'm done
我会从我的key数组的开头开始扫描，以此找到我要的那个key，找到之后，扫描就结束了
01:05:13 - 01:05:15
Right worst case scenario, I have to look at all K keys
这是最糟的情况，因为我得去查看所有的key
01:05:16 - 01:05:17
Binary search
⼆分查找
1.05.17-1.05.18
if it's sorted
如果key数组是已经排好序的
1.05.18-1.05.20
then I just find the middle point
那么我只需找到它的中点
1.05.20-1.05.21
jump to that
跳到中点处
1.05.21-1.05.25
figure out is that less than or greater than the key I'm looking for or the one I am
looking for
与它进⾏⽐较，看看我要找的key⽐它⼤还是⼩
1.05.25-1.05.28
and that tells me whether I go left or right
这样我就知道该往左边查找还是往右边查找了
01:05:28 - 01:05:29
In this case here, I'm looking for 8
在这个例⼦中，我要找的是8
1.05.29-1.05.31
middle is 7
中点是7
1.05.31-1.05.32
I know 8 is greater than 7
我知道8⽐7⼤
1.05.32-1.05.33
so I jump over here
So，我跳转到这⾥
1.05.33-1.05.36
then I think the halfway point of that ,I get 9
这⾥的中点值为9
1.05.36-1.05.37
then I go to this direction
那我就往左边⾛
1.05.37-1.05.41
and I get 8 and I find what I want
我找到了我想要的8
01:05:41 - 01:05:43
One thing though that is kind of cool you can do
你还可以使⽤⼀种更酷炫的⽅法
1.05.43-1.05.47
if you know what the values actually look like for your keys actually what the keys look
like
如果你⼤概知道你的key值是多少的话
1.05.47-1.05.50
it`s that you can use an interpolation technique
那么你就可以使⽤interpolation这种技术
01:05:50 - 01:05:54
We can approximate the localcation of the key
我们可以估计该key所在的⼤概位置
1.05.54-1.06.00
by doing some simple math to figure out what your starting point should be for your
Linear search
通过某些简单的数学⽅式，以此来弄清楚我们线性搜索的起点在哪
01:06:00 - 01:06:03
So rather in case of linear search you start for the beginning and go all the way to the
end
So，这⾥我们并不是在key数组的起点处使⽤线性扫描⼀路扫到尾
01:06:03 - 01:06:07
If I know that my keys or in this case integers
如果我知道我的key的⼤致⼤⼩
01:06:08 - 01:06:10
And I know something about their distribution
我知道它们的分布信息
1.06.10-1.16.13
then I can do a really simple you know simple math and say
那么我就可以使⽤简单的数学⽅法来进⾏处理，我表示
1.16.13-1.16.16
well I know I have 7 keys in my array
Well，我知道在我的数组中有7个key
1.16.16-1.16.21
and the max key is 10, and I'm looking for 8
key值最⼤为10，我所找的是8
01:06:21 - 01:06:23
So if I take 10 minus 8 and get 2
So，10-8我得到2
1.06.231.06.27
and then 7keys- minus 2 and get 5
然后，7-2得到5
01:06:27 - 01:06:32
I know I can just jump to the fifth position and that's at least a starting point for what I'm
looking for
这样我就知道我可以跳到第5个位置，这就是我所寻找的最⼩起点
01:06:33 - 01:06:35
So this obviously works
So，很明显这种⽅式可⾏
1.06.35-1.06.38
because they're always increasing the monotonic order
因为这⾥它们的值始终是按照单调递增的顺序排列
01:06:38 - 01:06:40 ！！！
Right if there floats this is hard to do, if there's strings I don't think you can do this
如果这⾥是浮点数，这种⽅法做起来就有点困难。如果是字符串，那我不觉得你们能⽤这个
01:06:40 - 01:06:44
But this is another technique you could do to make that search go faster
但你们可以使⽤另⼀种技术来让这种搜索变得更快
01:06:47 - 01:06:51
This one I don't know how is calm how common it is,the binary search I think what
everyone does
这种⽅法我并不清楚是否普遍使⽤，但我觉得⼆分查找应该是每个⼈都⽤的
01:06:51 - 01:06:53
But again there's this trade-off now
但再说⼀遍，这⾥⾯存在了取舍问题
1.06.53*-1.06.56
an ordinary binary search I had to make sure my keys are in sorted order
在普通的⼆分查找中，我必须得保证我的key都是按顺序排列
01:06:56 - 01:06:58
If I'm doing the linear search, I don't have to do that
如果我使⽤的是线性搜索，那么我就不⽤进⾏排序
01:06:58 - 01:07:01
So therefore as I update the nodes
So，在我对节点进⾏更新时
1.07.01-1.07.03
I don't pay that penalty of maintaining the sort order
我⽆须为维护顺序⽽付出代价
01:07:06 - 01:07:11
All right, so let's finish up real quickly to let some optimizations, we can do it to make it
go better
So，让我们快速讲下⼀些优化上的内容，它能让搜索变得更好
01:07:11 - 01:07:18
So these are the kind of things that like again a real database system would actually do
to make B+tree go faster
在⼀个真实的数据库系统中实际上会去使⽤这些东⻄，来让B+Tree变得更快
01:07:19 - 01:07:23
So the first type first we think about we're told is to compress the data
So，第⼀种我们要讨论的技术就是关于压缩数据这⽅⾯的
01:07:23 - 01:07:25
So the first kind of question scheme we can do is called prefix compression
So，第⼀种技术我们称之为前缀压缩（prefix compression ）
01:07:26 - 01:07:30
And this is based on the observation that, because we're keeping the keys in sorted order
它是基于我们的key都是有序排列的
01:07:30 - 01:07:33
It's very likely and a lot of data sets
在许多数据集中，很有可能会有这种状况
01:07:34 - 01:07:38
The keys that are stored in a in a single node are actually going to be very similar to
each other
即保存在同⼀个节点上的key实际上彼此之间会⾮常相似
01:07:39 - 01:07:41
All right, because we end up sorting them right
这是因为我们对它们进⾏了排序
01:07:42 - 01:07:46
So in this case here I have know that has three keys robbed,robbing and robot
So，在这个例⼦中，我已经知道我有了3个key，即robbed，robbing以及robot
01:07:46 - 01:07:50
Well all three of them share the same prefix ROB
它们三个都有相同的前缀，即rob
01:07:50 - 01:07:56
And so rather than me duplicating or storing that redundant ROB over and over again for
every single key
So，对每⼀个key⽽⾔，我⽆须⼀遍⼜⼀遍的复制或存储这个冗余字符串rob
1.07.56-1.08.00
what if I extract that out to store the prefix once ROB
如果我将这个前缀rob提取出来
01:08:00 - 01:08:04
And then for the the keys, I destroy the remaining parts of that's actually different
然后对于这些key来说，我将公共的部分删除后，每个key所剩下的部分实际上是不同的
01:08:06 - 01:08:10
So this is very very common this is these are called sometimes prefix compression, prefix
trees
这⾮常常⻅，有时它被称为前缀压缩（prefix compassion）或prefix tree（Trie Tree）
1.08.10-1.08.17
this is why you use in a lot of high-end or a lot of large database systems
这就是为什么你会将它⽤在许多⾼端或⼤型数据库系统中的原因了
01:08:17 - 01:08:20
Because you know because there's so much duplicate data
因为，这⾥⾯有太多太多的重复数据了
01:08:20 - 01:08:23
So Facebook uses this for all their internal MySQL stuff
So，Facebook在他们所有的内部MySQL中都使⽤了这个
1.08.23-1.08.25
and it makes a big difference for them as they save a lot of space
这引起了性能上的巨⼤差异，因为这样做节省了⼤量的空间
01:08:26 - 01:08:29
So this is sort of one way to do this those other optimizations you can do like
So，这只是优化的其中⼀种⽅式，你还可以使⽤⼀些其他的优化
1.08.29-1.08.32
if again if I'm doing a clustered index
如果我使⽤了聚集索引
1.08.32-1.08.36
where I know all my tuples, the tuples are on on disk or on pages
我知道我所有的tuple都存放在磁盘或page中
1.08.36-1.08.38
in the same way that they're sorted in my index
在我的索引中，它们以相同的⽅式进⾏排序
同样，在我的索引中，它们是以排序存在的
1.08.39-1.08.41
then it's very likely that tuples in the same node
那么tuple很有可能都在同⼀个节点上
1.08.41-1.08.44
their record ID will have the same page ID
它们的record id会使⽤相同的page id
01:08:44 - 01:08:46
Because they're all going to land on the same page
因为它们都会落在同⼀个page上
01:08:46 - 01:08:51
So rather than storing that page ID over and over again for every single tuple in a node
So，我们⽆须将每个单个tuple的page id⼀次⼜⼀次地存放在⼀个节点中
01:08:51 - 01:08:54
I store the page ID once and then store their offset or slot separately
我可以只需保存⼀次page id，然后将它们的offset值或slot分别存放
01:08:55 - 01:08:56
Right, yes
请问
01:09:10 - 01:09:11
Yes
没错
01:09:12 - 01:09:14
The question is how do we actually decide what to do
她的问题是我们实际该如何决定到底怎么做呢
01:09:14 - 01:09:18
Right, so you basically can say every single time I insert
So，简单来讲，当我每次进⾏插⼊时
1.09.19-1.09.21
I figure out what the common prefix is and that's what I'll store
我会弄清楚公共前缀是什么，我之后会将它保存起来
01:09:22 - 01:09:27
You could say anytime I do like a compaction or do like a real optimization
当我每次进⾏数据压缩或者优化的时候
1.09.27-1.09.33
then I decide what the best is right that you know for the for my keys right then and
there
那么我会去选择对我的key来说最好的优化⽅式
那么我会为我的key去选择属于它最适合的优化⽅式
01:09:33 - 01:09:36
In practice also think of it like in a lot of database systems
我们来思考下，在实战中，很多数据库系统的做法
1.09.36-1.09.41
the the newer keys might get inserted in always on the one side of the tree
新插⼊的key可能会⼀直放在树的⼀侧
1.09.41-1.09.43
like this is always increasing in value
即key的值⼀直在增加
01:09:44 - 01:09:45
And so therefore
因此
1.09.45-1.09.50
the a lot a large portion of the tree on the other side is going to be static
树中很⼤⼀部分数据都会是静态的
1.09.501.09.53
it's gonna be you know mostly read-only
⼤部分数据都是只读
01:09:53 - 01:09:57
So at that point I can make it a hard decision like here's how I want to do compression
or compaction
此时我就可以做出⼀个艰难的决定，我该如何进⾏压缩
01:09:58 - 01:09.59
Different trade-offs
这其中有不同的取舍
1.09.59-1.10.01
you do it online or offline
你可以在线上做，也可以在线下做
1.10.01-1.10.02
yes
请问
01:10:07 - 01:10:10
So this question is what happens to someone insert the words sad
So，他的问题是当我们插⼊sad这个单词时，会发⽣什么
01:10:11 - 01:10:15
Right and ends up in this node, yeah you have that you have to account for that, you
have to maintain it on the fly
你必须对它进⾏统计，并且得在运⾏时对它进⾏维护
01:10:17 - 01:10:18
Correct,yeah
没错
01:10:19 - 01:10:24
Or you could say source mesh and distro metadata to say, this prefix is only used for the
first three keys not the other ones
或者你可以这样做，此处的这个前缀只适⽤于这3个key，并不适⽤于其他的key
01:10:25 - 01:10:27
Right, there's the bunch of tricks you can do
你可以使⽤许多技巧来做到这点
01:10:29 - 01:10:33
So the the opposite of prefix compression is suffix truncation
So，与前缀压缩相对的⼀种⽅法就是后缀截断（suffix truncation ）
01:10:33 - 01:10:44
And the basic idea here is that, we can recognize that, we don't maybe need to store the
entire key in our inner nodes to figure out whether we want to go left and right
它的基本思路是，我们⽆须在我们的inner node中存储完整的key值，以此来弄清楚我们是该往
左⾛还是往右⾛
01:10:44 - 01:10:50
So in this case here we have ABCD up to K for one key and lMNO up to V for another
key
在这个例⼦中，我们的key如图所示
01:10:50 - 01:10:53
But if I'm just trying to see whether I want to go left or right
但如果我试着去弄清楚我该往左⾛还是往右⾛
1.10.53-1.10.56
I can probably get by just looking at the first you know in this case here first character
在这个例⼦中，我们可以从第⼀个字符就能判断出来
01:10:57 - 01:11:00
So instead of storing the entire key in the inner node
So，我们⽆须将整个key都存放在inner node中
1.11.00-1.11.06
our store a uniquely distinguishing prefix of it
我们可以在inner node中存储能够区分key的唯⼀前缀即可
1.11.06-1.11.08
and then throw away the remaining suffix
然后，将剩余的后缀抛掉
01:11:08 - 01:11:12
So in this case here, I could store A and L and that would been enough
So，在这个例⼦中，我可以只存a和l，这就⾜够了
1.11.12-1.11.13
but I'm showing ABC LMn
但这⾥我所展示的是abc和lmn
01:11:14 - 01:11:17
Right, and again down below I still have to store the entire key
在下⾯的节点中，我依然得保存整个key
1.11.17-1.11.21
because I need to go be able to have it be it'll say, you know is the key I'm looking for
here
因为我需要能够找到它，并表示这是我所寻找的key
01:11:21 - 01:11:25
But it might in my inner guideposts, I don't need to have this have the full key
但在我的inner node中，我⽆须保存完整的key⽤来当做路标
01:11:25 - 01:11:30
And of course again you have to maintain this if something and somebody insert
something that would violate these this
如果某⼈插⼊了某些数据，那可能就会违反这个，那我们就得去对它进⾏维护
1.11.30-1.11.34
we have to know we order it or reorganize it
我们必须对此进⾏排序或重新整理
01:11:34 - 01:11:37
But in practice that you know if the data is is not changing a lot
但在实战中，如果数据并没有发⽣太多改变
1.11.37--1.11.37
then this could be another big win
那么这种做法就可能⾮常棒
01:11:40 - 01:11:44
So as far as you know prefix compression is more more common than the suffix
truncation
So，据我所知，前缀压缩（prefix compre）要远⽐后缀截断来得更常⽤
01:11:46 - 01:11:50
All right, the last few things I want talk about is how to handle bulk inserts and pointer
swizzling
最后我想谈论的东⻄就是如何处理bulk inserts和pointer swizzling
01:11:51 - 01:11:53
So in all the examples I showed so far
So，⽬前为⽌，在我所展示的例⼦中
1.11.53-1.11.59
we assume that we're incrementally building out our index, we're inserting keys one by
one
我们假设，随着我们⼀个接⼀个插⼊我们的key，以此逐步构建出我们的索引
01:11:59 - 01:12:02
But in a lot of cases you have all the keys ahead of time
但在⼤多数情况下，你会提前拥有所有这些key
01:12:03 - 01:12:06
So it's a very common pattern that people do in databases that say
So，这是⼀种⼈们在数据库中⾮常常⽤的⽅法
1.12.06-12.08
I want to bulk load a new data set
⽐如说，我想批量加载⼀个新的数据集
1.12.08-1.12.10
now I've collected data from some other source
现在，我已经从其他数据源收集到了⼀些数据
1.12.10-1.12.12
and I want to put it into my database
我想将它放⼊我的数据库
01:12:12 - 01:12:16
A lot of times what people do is they turn up all indexes, bulk load the data
许多时候，⼈们所做的就是打开所有索引，并批量加载数据
1.12.16-1.12.18
insert it into the table
并将数据插⼊表中
1.12.18-1.12.19
and then they go back and add the indexes
然后，他们回过头来，添加索引
01:12:19 - 01:12:21
Right, so that way you as you as your insert the new data
当你插⼊新的数据时
1.12.21*-1.12.24
you're not trying to maintain the index which is expensive
你不会去试着维护索引，因为这样做代价太⾼了
01:12:24 - 01:12:25
So in this case here
So，在这个例⼦中
1.12.25-1.12.27
if you have all the keys ahead of time
如果你提前就拥有了所有的key
1.12.27-1.12.34
a really simple optimization to do to build the indexes rather than building it top-down
like we've done so far
我们可以使⽤⼀种超简单的优化⽅式来构建索引，这⾥我们并不会像我们之前所做的那样，即⾃
上⽽下地构建索引
01:12:35 - 01:12:37
You actually build it from the bottom up
实际上，你可以⾃下⽽上去构建索引
01:12:37 - 01:12:41
So let's say these are the keys I want to insert, the very first thing I do is just sort them
So，这⾥是我想要插⼊的key，⾸先我要做的就是对它们进⾏排序
01:12:42 - 01:12:44
And we'll see in a few weeks
我们会在⼏周后看到
1.12.44-1.12.53
We there's an efficient algorithm we can use tech that can sort data in such a way that
maximize the amount of sequential i/o, we have to do
我们可以通过⼀种⾼效的算法来进⾏排序，它能得到我们必须做的最⼤循序I/O的数量
01:12:53 - 01:12:54
So we can sort it
So，我们可以对其进⾏排序
1.12.54-1.12.59
and that lets me way more efficient than actually building the index one by one
实际上，这⽐我⼀个接⼀个地去构建索引来说，这种做法⾼效的多
01:12:59 - 01:13:02
And then we just lay it out along leaf nodes have everything filled out correctly
然后，我们将它们排列在叶⼦节点上，将它们正确填⼊到叶⼦结点中
01:13:03 - 01:13:05
And then going from the bottom to the top
接着，我们从下往上⾛
1.13.05-1.13.11
we just fill in the inter nodes and generate our pointers
我们只需要（使⽤中间key）来填充inter node，并⽣成我们的指针
01:13:11 - 01:13:16
So again this is this is a pretty standard technique that any major database system we
will support
So，再说⼀遍，这是任何主流数据库系统都⽀持的⼀种标准技术
1.13.16-1.13.18
when you call create index and a large dataset that already exists
当你对⼀个已经存在的⼤型数据集进⾏索引创建时
01:13:18 - 01:13:20
And then once it's already built once it's built
⼀旦索引构建完成
1.13.20-1.13.23
then I can you know maintain our do any changes I want just like before
那么我就可以像之前⼀样对我们所做的任何改变进⾏维护
1.13.23-1.13.25
there's no real difference to it
它和之前所做的，并没有什么区别
01:13:25 - 01:13:30
The database system doesn't know whether you did the bulk insert versus the
incremental build to build an index
数据库系统不知道你是批量插⼊，还是逐个构建索引
01:13:31 - 01:13:32
Everything's still the same
所有东⻄都⼀模⼀样
1.13.32-1.13.33
in the back ,yes
后⾯那位同学，请说出你的问题
01:13:39 - 01:13:42
So this question is what happens if you want to merge a small B+tree into a large B+tree
So，他的问题是，如果我们想将⼀个⼩型B+Tree合并到⼀个⼤型B+Tree中，这会发⽣什么
1.13.42-1.13.44
let's take that offline
我们课后再讨论这个问题
1.13.44-1.13.46
and we have a paper that does something like this
我们有⼀篇paper提到了这个
01:13:46 - 01:13:51
But I would say in general building index is very building indexes with bulk inserts very
fast
但总的来说，我想说的是使⽤批量插⼊（bulk insert）来构建索引，速度会⾮常快
01:13:51 - 01:13:53
It`s a very very hard problem
这是⼀个⾮常⾮常难的问题
1.13.53-1.13.57
and it's at least in academia it's under appreciated
⾄少在学术界，这是⼀个值得赞赏的问题
01:13:57 - 01:13.59
This is very very common
它⾮常⾮常普遍
1.13.59-1.14.03
so how do you database system this as fast as possible is super important
So，你该如何让你的数据库变得尽可能得快，这⼀点⾮常重要
01:14:03 - 01:14:04
So let's talk about efforts
So，让我们来谈论下该如何努⼒吧
01:14:05 - 01:14:07 ！！！！
All right, the last thing I'll talk about is called pointers swizzling
All right, 最后我想谈论的东⻄叫做pointer swizzling
01:14:08 - 01:14:14
So again I talked about how the way we figure out how to traverse the index is
So，我已经谈论过我们该如何遍历索引
1.14.14--1.14.16
by having these pointers from one node to the next
即通过这些指针从⼀个节点跳到下⼀个节点
01:14:17 - 01:14:22
In actuality what we're storing is not you know raw memory pointers, we're storing page
ids
实际上，我们所保存的并不是原始的内存指针，⽽是page id
01:14:23 - 01:14:27
And whenever we want to do traversal the same when I find key greater than 3
当我们想进⾏遍历的时候，⽐如当我想找到⽐3⼤的key的时候
01:14:28 - 01:14:28
We start here
我们从这⾥开始遍历
1.14.28-1.14.31
and we say ,oh I want to go to this this node down here
我们会说，Oh，我想跑到下⾯的这个节点处
1.14.31-1.14.32
well how do we actually get there
Well，我们实际该如何到达那⾥呢？
01:14:33 - 01:14:38
Well in the root node ,I'm storing a page ID for this index
Well，在根节点处，我们保存了该索引的page id
1.14.38-1.14.40
and now I've got to go down to the buffer pool and say
现在，我们跑到下⾯的buffer pool中去，并表示
1.14.40-1.14.41
hey I have page #2
hey，我想要page #2
1.14.41-1.14.47
if it's in memory, if it's not a memory，go get it for me I'll and and then give me back a
pointer to it
如果它不在内存中，那么请帮我找到它，并给我⼀个指向它的指针
01:14:47 - 01:14:50
So then I go get now my pointer to it and now I can do my traversal
So，现在我拿到了指向它的指针，于是我就可以进⾏我的遍历了
01:14:50 - 01:14:52
Same thing as I'm scanning along here
当我沿着这⾥扫描的时候，也是做⼀样的事情
01:14:52 - 01:14.53
I want to get to my sibling
我想拿到我的兄弟节点
1.14.53-1.14.56
this is my sibling is page three
我的兄弟节点的page id是page #3
1.14.56-1.14.58
because that's what's stored in my node
因为这是我节点中所保存的东⻄
1.14.58-1.15.01
I got to go down to the buffer pool and say,give me the pointer for page three
我会跑到下⾯的buffer pool中，让它把page #3的指针给我
01:15:02 - 01:15:04
So as I'm traversing
So，当我在遍历时
1.15.04-1.15.11
I keep going back to the buffer pool manager and saying do this conversion from page
ID to pointer
我会去回到buffer pool管理器这边，并让它将page id转换为指针
01:15:11 - 01:15:13
And this is really expensive
其实这样做的代价真的很⾼
1.15.13-1.15.19
because I got it you know I had to protect my hash table in my and my buffer pool with
latches
因为我必须使⽤latch来保护我buffer pool中的hash table
1.15.19-1.15.22
and therefore I'm going to much the steps just to get this pointer
因此，我要花很多步才能拿到这个指针
01:15:23 - 01:15:25
So with pointers swizzling the idea is that
So，pointers swizzling的思路是
1.15.25-1.15.27
if I know all my pages are pinned in memory
如果我知道所有固定在内存中的page的话
1.15.27-1.15.31
meaning I know it's not going to be going to be evicted
这就意味着，我知道它们不需要从内存中移除出去
01:15:31 - 01:15:35
Well instead of storing the the page ID
Well，这⾥我并不会保存page id
1.15.35-1.15.36
I'll just replace it with the page pointer
⽽是我将它⽤page指针来替换
1.15.36-1.15.42
because I know if it's pin it's never gonna move to a different memory address
因为我知道，如果page被固定住，那么它永远不会移动到另⼀个内存地址上去
01:15:42 - 01:15:45
So now when I do traversals instead of doing that lookup to the buffer pool
So，现在当我进⾏遍历时，这⾥并不是在buffer pool中进⾏查找
1.15.45-1.15.48
,I have exactly the page ID or the page pointer that I want
我拥有具体的page id或者是我想要的那个page指针
01:15:48 - 01:15:50
And I can go get exactly the data that I want
那我就能准确地拿到我想要的数据
1.15.50-1.15.52
and I don't have to go ask the the buffer pool
这样我就⽆须去询问buffer pool了
01:15:53 - 01:15.57
Of course now I'm gonna make sure that if i evict this thing, I write it out the disk
当然，现在我要确保，如果我将它从内存中移除，也就是将它写出到磁盘上
1.15.57-1.15.58
I don't store the page pointer
我不会保存page指针
1.15.58-1.16.00
because when it comes back in that's gonna be completely different
因为当它再放⼊内存的时候，它的地址就完全不同了
01:16:00 - 01:16:02
So you don't blow away the page id entirely
So，我们⽆须将page id完全删除
1.16.02-1.16.06
it's just you have a little extra metadata say, here's the pointer you really want not the
page number
你可以通过⼀点额外的元数据来表示，这⾥是我们想要的指针，⽽不是page id
01:16:08 - 01:16:13
So you may say alright when would we actually pay when would actually would be
pinning these pages in memory
So，你们可能会说，当我们将这些page固定在内存中时
01:16:14 - 01:16:16
Well maybe not for the leaf nodes
Well，我们可能固定的并不是叶⼦节点
1.16.16-1.16.18
but at least for the upper levels on the root and maybe the second level
但⾄少会是⼆叉树的上层部分，⽐如根节点，或者也可能是树的第⼆层处的节点
1.16.18-1.16.20
those things are gonna be super hot
这些节点使⽤的频率超级⾼
1.16.20-1.16.22
because I'm always gonna have to go through them to get down to the leaf nodes
因为我始终得通过它们才能到达叶⼦节点
01:16:23 - 01:16:25
So maybe it's not that big of a deal for me to pin those pages
So，对于我来说将这些page固定住可能并不是什么⼤问题
1.16.25-1.16.30
and they're gonna be relatively small compared to the size of the entire tree
⽐起整个树的⼤⼩来看，相对⽽⾔，它们的体积还是⽐较⼩的
01:16:30 - 01:16:34
and then I can use this optimization stratgy, because I know my pointers are always
gonna be valid
那么我就可以使⽤这种优化策略，因为我知道我的指针始终有效
01:16:35 - 01:16:39
So this one is actually very common， pointers swizzling is used in in pretty much every
major system
So，这种⽅式实际上⾮常普遍，很多主流数据库系统中都使⽤了这种pointer swizzling
01:16:41 - 01:16:41
okay
01:16:44 - 01:16:44
all right
1.16.44-1.16.45
so to finish up
So，总结⼀下
1.16.45-1.16.47
the b+ Tree is awesome
B+ Tree是⼀种⾮常棒的数据结构
1.16.47-1.16.54
Hopefully I've convinced you that it's a good idea to use this for you you know, if you're
building a database system
如果你要去构建⼀个数据库系统，那希望我已经说服你去使⽤B+ Tree，这真的是⼀个很棒的想
法
01:16:54 - 01:16.58
next class we'll see some additional optimizations for this
在下⼀节课中，我们会看到对它的⼀些额外优化
1.16.58-1.17.01
and maybe do some demos with Postgres and MySQL
我们可能会使⽤PostgreSQL和MySQL来做⼀些demo
01:17:01 - 01:17:04
but then we'll also you talked about two other types of tree based indexes we may want
to use
但之后，我们也会去讨论两种我们可能想使⽤的基于树的索引
01:17:06 - 01:17:09
Tries/Radix trees which are gonna look like b-trees were slightly different
在我们看来，Tries/Radix Tree看起来像是B-Tree（B树），但实际有所不同
1.17.09-1.17.10
because that we're not store entire keys
因为我们不会去保存完整的key
01:17:10 - 01:17:13这段之后字幕⽂件就没了。
And inverted indexes will allowed you to do key searches
接着，倒排索引（inverted indexes）能让我们对key进⾏搜索
01:17:15 - 01:17:15
Any questions
有任何问题吗？
01:17:18 -
Hit it
散会！