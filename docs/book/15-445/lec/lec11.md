10-04
01:01:31 - 01:01:34
So we're using a hash table to summarize it
So，我们会使⽤⼀个hash table来对它进⾏总结
1.01.34-1.01.40 ***
and could condense it down to just the bare minimum information that we need to
compute our result
我们可以将其压缩为我们要计算结果所需的最少信息
01:01:40 - 01:01:43
And again the reason why we did the partitioning first is that
再说⼀遍，之所以我们要先进⾏分区的原因是
1.01.43-1.01.46
when we go back in the second phase and we do rehashing
但我们进⼊第⼆个阶段，进⾏重新hash的时候
01:01:46 - 01:01:50
We know that all the keys that are the same will exist in the same partition
我们知道，所有相同的key都会在同⼀个分区（知秋注：这个分区⾥包含的key可能会有所不
同，但相同的key铁定在这同⼀个分区⾥，这⾥的⼀个分区⾥只有这⼀种key）
01:01:50 - 01:01:54
So once we go through all the pages within that partition
So，⼀旦我们扫描该分区内的所有page时
1.01.54-1.01.56
we compute whatever the answer that is that we want
我们会去计算我们想要的答案
01:01:57 - 01:01:59
We can potentially throw it that hash table away
然后我们可以将这个hash table扔掉
01:02:00 - 01:02:02
Because we know that already produce it as an output
因为我们知道它已经⽣成了⼀个结果
01:02:02 - 01:02:09
Because there's no that it's the keys that we've updated so far through that one partition
will never get updated again from any other partition
因为我们在该分区所更新过的key，永远不会在其他分区中被更新了
01:02:11 - 01:02:13
Because the hashing guarantees locality for us
因为hash处理为我们保证了局部性
01:02:14 - 01:02:16
All right, so back here
So，回到这⾥
1.02.16-1.02.18
right these are all the buckets we generated in the first phase
这些是我们在第⼀阶段⽣成的bucket
01:02:19 - 01:02:29
So let's say now that we can bring in ,you know we can bring in you know ,these two
pages or all the partitions for well we can process these two partitions in memory at the
same time
我们可以在内存中同时处理这两个分区
01:02:30 - 01:02:32
So all we're gonna do is just have a cursor
So，我们通过使⽤⼀个游标来处理
1.02.32-1.02.34
that can just scan through them
通过游标，我们可以扫描⾥⾯的数据
1.02.34-1.02.37
and every single key you're gonna hash it and populate the hash table
然后，对⾥⾯的每个key进⾏hash处理，并填充到这个hash table中
01:02:39 - 01:02:42
And I keep the scanning down and do the same thing for everything else
接着，我继续向下扫描，并对其他所有东⻄进⾏相同处理
01:02:43 - 01:02:46
And then now I produce this as my final result
现在，我就根据这个⽣成我的最终结果了
01:02:46 - 01:02:49
Again for some realize that may be confusing
对于某些⼈来说，这有点令他们困惑
1.02.49-1.02.52
the final result of this hash table or the is the same as this one
这个hash table的最终结果和另⼀个是⼀样的
01:02:53 - 01:02.59
But you know and the main takeaway is that we're gonna throw this away, when we
move on to the next the next partitions
但这⾥的要点在于，当我们移动到下⼀个分区时，我们就会把上⼀个分区的hash table给扔掉
1.02.59-1.03.01
right and this one we keep around
我们会去保留下⼀个分区的hash table
01:03:02 - 01:03:04
Distinct is like a little bit too simple,
Distinct可能看起来有点简单
1.03.04-1.03.08
but like I was trying to pick something, I just distill down the core ideas
但这⾥我只是想去提取出⼀些核⼼思想
01:03:08 - 01:03:10
Alright, so now we got this other partition here
So，此处我们还有⼀些其他的分区
01:03:10 - 01:03:15
So again we blow away that the hash table from the first the second first of partitions
So，⾸先我们要将之前的hash table给扔掉
1.03.15-1.03.18
we do the same thing build an im-memory hash table for this guy
接着，我们重复之前的操作，在内存中为这个分区构建⼀个hash table
01:03:18 - 01:03:20
And then we just when it's done with minutes populate this thing
当我们完成操作后，将数据填充到最终结果⾥⾯去
01:03:23 - 01:03:24
Yes
请问
01:03:28 - 01:03:29
A question her statement is
她想说的是
1.03.29-1.03.31
assuming we're not gonna have collisions in the second hash function
假设我们在使⽤第⼆个hash函数的时候，并不会遇上hash碰撞这种情况
01:03:33 - 01:03:35
You yes that we can,right
但其实我们是会遇上的
01:03:45 - 01:03:49
Her so her statement is question is what does that mean you be overriding this
So，她的问题是，我们是否会覆盖这个hash table
01:03:53 - 01:03:57
But it so that that does the collision handling schemes that we talked about we talked
about hash tables
你所问的东⻄，其实我们在讨论hash table的时候就讲过如何处理hash碰撞这类问题了
01:03:57 - 01:04:02
So it's either linear probing ,cuckoo hash whatever the Robin Hood stuff
So，我们可以⽤linear probing，Cuckoo hash或者Robin Hood之类的⽅法来处理这些
1.04.02-1.04.05
right that's all the internal to the hash table
这些都是hash table内部的东⻄
01:04:05 - 01:04:06
We're sort of above it now
我们现在所讨论的是在此之上的东⻄
1.04.06-1.04.11
we're saying your hash table I can write things into key value pairs and it'll it'll store them
for me
即，我们往hash table⾥⾯写⼊key/value pair，它会为我们保存这些数据
01:04:13 - 01:04:16
I don't know and I don't really care at this point how it handles collisions
我不知道，也不关⼼此时它是如何处理hash碰撞的
01:04:17 -01:04:17
Okay
01:04:18 - 01:04:22
Again, distinct is a really stupid simple example,
再说⼀遍，DISTINCT这个例⼦其实真的很简单
1.04.22-1.04.27
but you know going through those processes is it was main thing I what you guys get
但这些处理过程才是我想让你们今天学到的东⻄
01:04:30 - 01:04:35
His statement is the question is how is this faster than sorting
他的问题是，DISTINCT为什么要⽐排序来的更快
1.04.35-1.04.38
for this particular query probably not
对于这个查询来说，可能并不是这样
01:04:42 - 01:04:48
It depends on the turns on the size of the data
这取决于数据量
01:04:52 - 01:04.57
I'll cover those let me leave really punt on that question until next week
让我们把这个问题留到下周再解决
1.04.57-1.04.59
and be more clear when you start seeing like the different join algorithms
当你看到其他不同的join算法时，你会更加清楚这是怎么⼀回事
01:05:00 - 01:05:00
Yes
请讲
01:05:04 - 01:05:07
Yeah, so again because his question is
他的问题是
1.05.07-1.05.10
why do we need this ,when it's just this one is write into this
当hash table中的内容写⼊到这个final result的时候，我们为什么需要这个
1.05.10-1.05.12
in that example, yes
在这个例⼦中，确实是这样
01:05:12 - 01:05:16
But like I was trying to show that you look you have an ephemeral hash table as you
build and populate
但这⾥我想展示的是，当你构建并填充⼀个临时hash table的时候
1.05.16-1.15.18
and then when you're done， then you shove it into this thing
当你处理完数据，那么你就将处理完的数据塞进最终结果就⾏
01:05:18 - 01:05:21
For distinct it's stupid doesn't make sense
对于DISTINCT来说，这很蠢，⽽且没有意义
1.05.21-1.05.24
for aggregations you could potentially do that as well
对于聚合操作来说，你也可以那么做
01:05:26 - 01:05:30
Right,because again this like this may not fit in memory
因为此处的最终结果可能没法放在内存中（因为体积的问题）
01:05:33 - 01:05:34
Yes
请讲
01:05:38 - 01:05:40
Oh so yes so I should be clear
没错，我应该说⼀下这个
1.05.40-1.05.44
this is this is a different seed same, so you know MurmurHash has the difference sedd
这个hash函数⽤的是不同的hash seed，⽐如在MurmurHash中，它就会使⽤不同的hash seed
01:05:53 - 01:05.53
This question is
他的问题是
1.05.53-1.05.57
like say I built this first hash table
⽐如，这⾥我创建了第⼀个hash table
1.05.57-1.06.00
and I use that one seed for the hash function
我在这个hash table中使⽤了⼀个hash seed
1.06.00-1.06.04
now down here do I need to use can I use a different seed
接着，到了下⾯这个分区，我能换个hash seed来进⾏hash处理吗？
1.06.04-1.06.05
I don't think it matters
我觉得这其实不重要
01:06:06 - 01:06:06
Right
01:06:07 - 01:06:10
If you're writing into this if you're writing into the same hash table
如果你当下就要将数据写⼊到了同⼀个hash table中
1.06.10-1.06.11
you have to be have to use the same seed
那你就必须使⽤同⼀个hash seed
01:06:11 - 01:06:14
If you're just gonna merge that in later on, it doesn't matter
如果你打算之后再将它们合并起来，那就⽆所谓
01:06:15 - 01:06:15
No
No
01:06:16 - 01:06:18
Yeah, yes
请讲
01:06:22 - 01:06:27
Yes the final result,final result on the database
01:06:27 - 01:06:31
I'm sorry a final result of an operator ,it`s always gonna be a relation
操作符的最终结果其实就是⼀种关系
01:06:33 - 01:06:39
So this is it could be a hash table, it could be just a buffer of pages, depends on
implementation
So，它可以是⼀个hash table，也可以是⼀个有很多page的buffer，这就取决于具体实现了
01:06:40 - 01:06:43
I realized that like it's the same shapes
这⾥我画的形状是⼀样的（都是hash table）
01:06:44 - 01:06:45
Yeah sorry
不好意思
01:06:46 - 01:06:48
Alright, so finish up
So，总结⼀下
01:06:49 - 01:06:51
Let's talk about it do something more complicated
我们来讨论些更复杂的东⻄
1.06.511.06.58
it's actually had to do you know aggregation were you know the actual producing a real
result
⽐如，通过聚合操作来⽣成⼀个真实的结果
01:06:58 - 01:07:04
So for this one they the intermediate hash-table after ever using for the the second
phase
So，对于此处第⼆阶段中⽤过的中间hash table⽽⾔
01:07:04 - 01:07:12
We're actually going to use that to maintain the running total of whatever it is the
competition we're trying to do in our aggregate function
实际上，我们⽤它来维护我们在聚合函数中的Running_Total
01:07:13 - 01:07:19
Right, and so this running value would depend on what the aggregation you're actually
trying to do
So，这⾥的RunningVal的值取决于你实际所做的聚合操作是什么
01:07:20 - 01:07:21
So it's going back here
So，回到这个幻灯⽚上
01:07:22 - 01:07:28
So saying all of these guys now I'm doing a I'm getting the the course ID and I'm doing
the average GPA
So，如图所示，我拿到了course id，并且我想去算出每⻔课的平均GPA
01:07:28 - 01:07:31
So in the hash table that I could be generating for all of these
So，在hash table中，我可以为每⻔课都⽣成它们的平均GPA
01:07:32 - 01:07:36
I'm gonna have the the key map to this like tuple value
我可以将key映射到对应的tuple值上
1.07.36-1.07.44
that's going to keep the running count of the number of keys that I've seen with there
sorry ,number of tuples was I've seen with the same key
然后就会去统计我所⻅过的具有相同key的tuple数量
01:07:44 - 01:07:47
And then just the summation of of their GPAs
接着就是去求它们GPA的总和
01:07:49 - 01:07:52
Right, and then I just take this thing
然后我拿到value这部分
1.07.52-1.07.54
and then when I went to compute its produced a final output
接着，当我想去计算出最终结果时
1.07.54-1.07.59
I take the running total divided by the number of tuples and that's how I get my average
我会使⽤Running_Total除以tuple的个数，这就是我计算平均数的⽅法
01:07:59 - 01:08:02
So for all the different hash different aggregation functions
So，对于所有不同的聚合函数来说
1.08.02-1.08.12
and generally just keep track of you know a single scalar value, account you're just
adding one every single time you see your new key or key of the same value
⼀般来讲，就是去跟踪单个标量值，每当遇⻅⼀个新的具有相同值的key（单纯指key），就加1
01:08:12 - 01:08:14
And then for sum, you just keep adding values together
如果是求和，那么就将所有的值（key对应的value）加在⼀起
01:08:14 - 01:08:19
For the average you you can compute that with with the number of the count plus the
sum
如果是求平均数，那么你就得⽤上tuple的数量和这些值的和
01:08:19 - 01:08:25
Standard deviation or other other aggregation functions you you maintain a little more
information
对于标准差或者其他聚合函数来说，你就得多维护⼀些信息了
01:08:25 - 01:08:27
So now basically what happens in our hash table,
So，简单来讲，在我们的hash table中所发⽣的事是
1.08.27-1.08.30
when we want when we want to update the hash table
当我们想去更新hash table时
01:08:30 - 01:08:33
We do an insert if it's not there we just add it
在我们进⾏插⼊的时候，如果hash table中没有，那我们就将数据加进去
1.08.33-1.08.34
if it is there
如果它⾥⾯有的话
1.08.34-1.08.37
then we need to be able to modify this in place
那么我们就需要能够去修改这个地⽅的值
1.08.37-1.08.40
or do a delete followed by an insert to update it
或者是先删除后插⼊，以此来进⾏更新
01:08:42 - 01:08:43
So this clear
So，你们懂了吗？
01:08:45 - 01:08:47
And again if you were doing this with sorting
如果你是在进⾏排序
1.08.47-1.08.49
you could do the same thing you would have this on the side
你也可以做相同的事情，你可以将这个放在⾥⾯
01:08:50 - 01:08:52
And then as your scan through
接着，当你扫描的时候
1.08.52-1.08.53
and in the final sort of output
在最后排好序的输出结果中
1.08.53-1.08.56
you wouldn't you could update these totals and produce the final output
你可以对这些Running_Total进⾏更新，并⽣成最终输出结果
01:08:59 - 01:09:03
All right, so I'm gonna skip this for now
So，现在我会跳过这部分
1.09.03-1.09.08
this will this will make more sense for next week we do hash joins
在下周我们学习hash join的时候，再来看这个会更有意义
01:09:08 - 01:09:10
Essentially a hash joins would be essentially do the same thing
简单来讲，hash join做的也是⼀样的事情
1.09.10-1.09.15
that we're gonna build this ephemeral hash table with on on the keys, we want to do a
join on
即，我们根据我们想进⾏join操作的key来建⽴⼀个临时的hash table
01:09:16 - 01:09:18
And then we probe in that and see whether we have a match
然后，我们检查下hash table，看看⾥⾯是否有匹配项存在
1.09.18-1.09.21
and we produce our final output of the operator
然后，我们⽣成该操作符的最终输出结果
01:09:22 - 01:09:30
Okay, so let's let's get this, and then we'll focus well we'll discuss this again next week
when we or next to next Wednesday we do hash join okay
So，我们会在下周学hash join的时候，再来看这个
01:09:32 - 01:09:34
All right,so in conclusion
So，总结⼀下
1.09.34-1.09.38
so what I show today is this sort of the trade-offs between sorting and hashing
So，今天我所展示的是排序和hash处理之间的取舍问题
01:09:40 - 01:09:45
And again we'll go to more details about which one is better than the other, when we talk
about joins next week
当我们下周讨论join的时候，我们会更深⼊的去讨论谁⽐谁更好
01:09:48 - 01:09:52
The high level techniques that we talked about here are we applicable for all the parts of
the database system
这⾥我们所讨论的⾼级技术适⽤于数据库系统的各个部分
01:09:52 - 01:10:00
So this partitioning approach this divide and conquer approach all that is useful for other
algorithms other methods we have we we care about in our system
我们所讨论的这种分治算法对于我们的系统⽽⾔，⾮常有⽤
01:10:00 - 01:10:03
So we'll see this recurring theme throughout the rest of semester
So，我们会在这个学期剩下的时间⾥反复看到这个
1.10.03-1.10.05
that splitting things up into smaller units of work
它将⼀些⼤的任务拆分为更⼩的任务
1.10.05-1.10.09
and trying to operate on that small small chunk of data or small problem
并试着去对这些⼩数据块进⾏处理或者是解决⼩问题
1.10.09-1.10.11
it`s gonna be very very useful technique
这会是⼀种⾮常有⽤的技术
01:10:12 - 01:10:15
Okay, all right so let's know what project #2
So，我们来讲下Project 2的内容
01:10:16 - 01:10:21
So project #2 you are going to be building a thread safe linear probing hash table
So，在Project 2中，你们要去构建⼀个线程安全的linear probing hash table
01:10:22 - 01:10:25
So this is me built on top of a buffer pool you built in the first project
So，这个要建⽴在你第⼀个Project中所构建的buffer pool上
01:10:26 - 01:10:29
So it's not an in-memory hash table it has we backed by disk pages
So，它并不是⼀个内存中的hash table，它要由磁盘page进⾏保存
01:10:30 - 01:10:35
So we're not gonna do anything that we talked about here in this class ,we're doing
trying to maximize sequential I/O
So，我们并不会去做我们这节课所讲的内容，我们要做的是试着最⼤化循序I/O
01:10:35 - 01:10:42
It's just you do random I/O ,and you go grab pages and from your buffer pool manager
as needed ,right to do to do inserts and deletes
就像你做随机I/O那样，从buffer pool管理器中拿到page，然后进⾏插⼊和删除操作
01:10:43 - 01:10:45
So your are going to support resizing
So，你们也得去⽀持resize这种功能
01:10:45 - 01:10:48
So again linear probing hash table assumes it's a static hash table
So，假设Linear probing hash table是⼀个静态hash table
1.10.48-1.10.49
but when it gets full
但当它满的时候
1.10.49-1.10.53
then you need to take a latch on it, and then resize the entire thing
那么你就得在它上⾯加个latch，然后调整它的整个⼤⼩
01:10:53 - 01:10.54
So you need to support resizing as well
So，你们也需要去⽀持调整⼤⼩
1.10.54-1.11.01
and you need to support doing this resizing when multiple threads could be accessing
the the hash table at the same time
你们除了需要⽀持调整⼤⼩这个功能以外，你们也得⽀持多线程同时访问这个hash table
01:11:01 - 01:11:04
So the the website is up
So，⽹站已经上线了
1.11.04-1.11.09
the it's not announced yet on Piazza
虽然这还没有在Piazza上宣布
1.11.09-1.11.12
what will remain there's some final adjustments we're doing for the source code before
release to you guys
在将⽂件发布给你们之前，我们会对源码进⾏最终调整
1.11.12-1.11.14
but we hope to this will be later today
但我们希望今天能够放出来
01:11:16 - 01:11:18
I don't know let's our animations, alright
01:11:18 - 01:11:20
So there's four tasks you're gonna have to do
So，在Project中，你们要完成四个任务
01:11:20 - 01:11:26
The first is that you're responsible for designing the page layout of the hash-table
blocks
第⼀个任务是，你们要负责设计hash table block的page layout
01:11:26 - 01:11:30
So this is the header page and then the actual block page is where the actual key values
are stored
So，⽐如，这⾥是header page，然后是真正⽤来存放key/value数据的block page
01:11:31 - 01:11:39
So this is a useful exercise to get you to understand what it means to take a page from
the buffer pool manager
So，对你们⽽⾔，这是⼀个⾮常有⽤的练习，它能帮助你们理解如何将page从buffer pool管理
器中取出
01:11:39 - 01:11:43
And then be able to interpret it in such a way that stores the data exactly that you want
接着，你们要能够去以某种你们想要的⽅式去解释它⾥⾯所保存的数据
01:11:43 - 01:11:45
All right, it's not your just malloc in some space
你们并不是去使⽤malloc()去分配⼀些空间
1.11.45-1.11.47
you're going to buffer manager and says give me a page
我们要跑到buffer pool管理器中，并表示，给我⼀个page
1.11.47-1.11.50
and you say oh this is a this is a hash table block page
接着，你会说，Oh，这是⼀个hash table block page
1.11.50-1.11.52
,here's the offsets to find the data that I'm looking for
这⾥⾯有⼀些offset值，我们以此来找到我们所查找的数据
1.11.52-1.11.55
how do you do a reinterpret cast on that data
然后，我们得对上⾯的数据进⾏重新解释
01:11:56 - 01:11.57
So your first implement those two classes
So，⾸先你们要去实现这两个类
1.11.57-1.11.59
they do the header page and then the block pages
它们⼀个负责header page，另⼀个负责block page
1.11.59-1.12.05
then you want to implement the basic hash table itself Right, to do inserts and deletes
接着，你们得去实现基本的hash table，以此来进⾏插⼊和删除操作
01:12:06 - 01:12:13
And they get also support concurrent operations using a reader writer latch which we
provide you ,and then also support resizing
通过使⽤我们提供给你的read/write latch，以此让它们⽀持并发操作，然后，它们也得⽀持调
整⼤⼩
01:12:14 - 01:12:16
You take a latch in the entire table
你可以通过在整个表上加个latch，
1.12.16-1.12.18
double the size of it and then rehash everything
然后将它的⼤⼩变为原来的两倍，然后重新hash表中的所有东⻄
01:12:18 - 01:12:20
So you need you need to be able to support that
So，你们得需要能够⽀持这点
01:12:22 - 01:12:30
So you should follow the the textbook semantics and algorithms for how they do the
various operations
So，你们应该看下教科书中语义和算法那块的内容，看看它们是如何实现这些不同的操作
01:12:31 - 01:12:36
I think the lecture I gave on hash table follows the textbook pretty closely
我觉得我之前所讲的hash table那节课的内容和教科书上的⾮常接近
01:12:36 - 01:12:40
And the linear hash table doesn't have that many you know different design decisions
you have to make
对于linear hash table来说，你们并没有那么多不同的设计决策需要考量
1.12.40-1.12.43
it's just sort of going through these X steps
你只需按部就班即可
01:12:43 - 01:12:46
I advise you to first obviously work on the page layout
我建议你们先去做page layout这块
1.12.46-1.12.49 ****
because you can't have a hash table that you can stored in pages anyway
因为你无法拥有可以存储在page中的hash table
01:12:49 - 01:12:55
But you should make sure that your pages work perfectly before you move on to actually
building the hash table itself
但你们应该确保，在你们构建hash table之前，你们的page能够正常⼯作
01:12:55 - 01:13:01
So we'll provide you some basic test cases again to do some rudimentary checks for
your page layouts
So，我们会为你们提供⼀些基本测试案例，来对你们的page layout做⼀些基本检查
01:13:01 - 01:13:05
But it's up for you to guys to make sure that it's actually you know do you simply more
rigorous
但实际上，这取决于你们是否要让这些测试案例变得更加严格
01:13:05 - 01:13:11
Because if your page layout gets up, and then now you start doing your hash table on
that it's like building a house on sand
因为如果你的page layout有问题，那么当你开始构建hash table的时候，⽆异于在沙⼦上造房
⼦
01:13:11 - 01:13:16
Because now you're like my hash table is not working, and it could it could because the
your pages aren't working correctly
如果你的hash table不能正常⼯作，这很有可能是因为你的page没法正常⼯作
01:13:17 - 01:13:19
So get this down solid before moving to the next thing
So，在做下⼀件事情之前，先把上⼀件事做好
01:13:21 - 01:13:24
Then when you actually build the hash table itself
然后，当你构建hash table的时候
1.13.24-1.13.26
don't worry about making it thread safe
不要去在意能不能让它线程安全
1.13.26-1.13.31
focus on the single-threaded support first
⾸先要把重⼼放在⽀持单线程访问上⾯
01:13:31 - 01:13:33
This is a common design approach in database systems
这是数据库系统中的⼀种常⽤设计⽅式
01:13:34 - 01:13:36
This is the approach I take with my own research
我在我⾃⼰的研究中会使⽤这种⽅法
1.13.36-1.13.40
and in practice I think this is not every company follows this
我觉得，在实际情况中，并不是每个公司都会遵循这⼀点
1.13.40-1.13.43
he's wearing the shirt for the company that does not follow this
这位穿着公司⽂化衫的⼩伙伴就没有遵守这点
01:13:45 - 01:13:49
The focus on correctness first, don't worry about it being slow
⾸先，我们的重点应该是在正确性上，我们不要去担⼼速度慢的问题
01:13:50 - 01:13:53
So make it you know make sure that it works exactly what you think it should work
So，要确保数据库系统是按照你想的那样⼯作的
01:13:53 - 01:13.58
Then go back and now start doing up the optimizations that some of the things he
suggested some things we talked about in class
然后，我们再回过头去，在数据库系统上使⽤⼀些我们在课上所讨论的优化
1.13.58-1.14.04
to be you know to do optimistic latching be more more crafty on how you release latches
⽐如，在使⽤乐观锁的时候，在释放latch的时候更加谨慎
01:14:04 - 01:14:06
Right make sure it works correct first
要确保它⾸先能正确⼯作
1.14.06-1.14.08
have test cases to prove that it works correctly for you
通过测试案例来证明，它能正常⼯作
01:14:08 - 01:14:10
Then when you go start trying to make it go faster
然后，我们才会试着让它的速度变得更快
1.14.10-1.14.13
because we'll have a leaderboard to see who has the fastest hash-table
因为我们会有⼀个排⾏榜，上⾯能看到谁的hash table是最快的
01:14:13 - 01:14:18
then you know then you know that you're working with a again a solid implementation
然后，你就知道，你是在⼀个稳定的实现上进⾏⼯作的
01:14:19 - 01:14:19
Okay
01:14:22 - 01:14:26
All right, so just like before you don't need to change any other files in the system
So，和之前⼀样，你们不需要修改系统中的任何⽂件
1.14.26-1.14.28
other than the ones that you have to submit on great scope
除⾮你已经将⽂件提交到了GreatScope上⾯
01:14:29 - 01:14:30
This is what we're working on now
这是我们现在在做的东⻄
01:14:31 -01:14:36
So we'll announced on Piazza that you want to rebase your existing code on top of the
latest master
我们会在Piazza上宣布这个，你们得将你们现有的代码rebase到最新的master分⽀上去
01:14:36 - 01:14:45
Because that I'll bring in the new the sample header files and the sample test cases for
you, will provide instruction exactly what you need to do the rebase
因为我要提供给你们新的示例header⽂件以及新的测试案例，我还会告诉你们，你们在进⾏
rebase的时候该怎么做
01:14:45 - 01:14:49
Obviously makes you know since you can blow away your source code on github
因为你们可以删除你们在github上的源码
1.14.49-1.14.53
very easily with a Porsche push force
使⽤push --force就可以轻易做到
01:14:53 - 01:14:58
Make sure you make a backup of your if your copy the first before you start doing the
rebase
在你们进⾏rebase之前，请确保你们对之前的代码做好了备份⼯作
01:14:59 - 01:15:04
And then as always post your questions on Piazza and and come to office hours
顺带，如果你们有问题，请把问题发到Piazza上，然后有空的话可以到办公室来问问题
01:15:06 - 01:15:06
Yes
请讲
01:15:13 - 01:15:14
This question is
他的问题是
1.15.14-1.15.17
if we assume if you get a hundred cent score on the first project,
假设，如果你在第⼀个project中得了满分
1.15.17-1.15.22
can you assume that your buffer pool implementation is solid to support hash table
你们能假定你们所实现的buffer pool能够可靠的⽀持hash table吗？
01:15:24 - 01:15:27
I could be wrong, but we we think we tested,right
我说的可能是错的，但是我们认为我们已经测试过了
01:15:30 - 01:15:37
But I would say like there was a blog last year that that exact problem showed up that's
all the unresolved
但去年有⼈写了⼀个博客，提到了我刚说的那些问题，这些都还没被解决
01:15:38 - 01:15:40
So I think if you've passed our test it should be solid
So，我觉得，如果你们通过了我们的测试，那么你们的实现就是可靠的
01:15:44 - 01:15:49
This question is can we now releases that？I cannot do that ,
他的问题是，我们现在能将那个放出来么？现在不⾏
1.15.46-1.15.49
because there's some people that are still haven't submitted yet
因为有些⼈还没提交他们的作业
01:15:54 - 01:15:54
Let's take that all fine
让我们岁⽉静好
01:15:57 - 01:15:57
In the back, yes
后⾯那位，请问
01:16:02 - 01:16:04
For the sorry for the first project
第⼀个project？
01:16:05 - 01:16:06
You can submit as much as you want yeah
你想提交⼏次就⼏次
01:16:07 - 01:16:10
Yeah what is the whatever whenever whatever the highest score you got from the last
不管你上⼀次所拿到的最⾼分是多少
1.16.10-1.16.15
I see great scope of let you activate what you scored you want ,right, I think
我觉得Greatscope激起了你们对拿⾼分的欲望
01:16:15 - 01:16:18
But it's whatever the highest score up into the deadline is what we'll use
但我们只会将你们在deadline之前所得到的最⾼分作为你们的分数
01:16:19 - 01:16:19
Yeah
01:16:21 - 01:16:22
Yeah you submitted is all you want
没错，你想提交⼏次就⼏次
1.16.22-1.16.26
you like if you get if you had an eighty before and have a hunter after the deadline, you
have an eighty score
如果你在deadline之前得到了80分，但是在deadline之后，你再提交时，拿到了100分，但你的
分数还是80分
01:16:27 - 01:16:32
You play the game with it like the late days,but that you know yeah
就⽐如，你晚玩了⼏天游戏，但你知道攻略，完美通关了那样
01:16:40 - 01:16:45
Again your question is what if you change your invitation after the fact for from project
one
你的问题是，如果你修改了你project 1的代码
01:16:45 - 01:16:51
The it would still be you so submitted on great scope the old project for project one
你依然得在Greatscope上上传你的⽼项⽬代码，也就是project 1的代码
01:16:52 - 01:16.56
We could just have it throw in the first test as well if you want to that make it easier
如果你想简单点，那么就把代码扔进第⼀个project的测试⾥⾯就⾏
1.16.56-1.16.59
like it'll run all the tests from the first project
Greatscope会去运⾏第⼀个project的所有代码
1.16.59-1.17.02
you won't get a score for that,but it does be there
你的分数并不会因此⽽改变，但它还是会给你⼀个分数
01:17:02 - 01:17:04
We could do that well fix that, okay
我们会修复你说的问题
01:17:05 - 01:17:05
What's that
你说的是啥
01:17:07 - 01:17:08
You know make it slower ,that's the only thing
这会让Greatscope变慢，但这是唯⼀的问题
01:17:12 -01:17:12
Yeah
01:17:13 - 01:17:16
But you can still be able to submit for the first one
但你们依然能提交第⼀个project的⽂件
01:17:17 - 01:17:19
Okay,do not plagiarize
Ok，不要抄袭
01:17:20 - 01:17:22
We won that we're gonna run this emboss
我们会去运⾏emboss
1.17.22-1.17.24
this is we're doing that this week for your first project
我们会在这周⽤它去检测你们的第⼀个project
1.17.24-1.17.28
if you plagiarize well --- ever worn a hole you'd be kicked out okay
如果你抄袭了，那么你就完蛋了
01:17:28 - 01:17:28
Don't do that
不要那么搞
01:17:29 - 01:17:33
next class we're doing joins ,Nested Loop Join ,Sort-Merge Join and Hash Join, okay
下节课我们会学关于Join⽅⾯的东⻄，⽐如：Nested Loop Join，Sort-Merge Join以及Hash
Join
01:17:34 - 01:17:37
Alright, he's got a call here, guys ,see you
散会！


11-02
20:04 - 20:09
So going back to our example we showed beginning, again plug and chug these numbers
So，回到我们⼀开始的那个例⼦，这⾥我们将数字代⼊公式
20:09 - 20:12
Now we can do our join in 50 seconds
现在我们可以算出我们的join操作需要的是50秒
20:14 - 20:15
Still bad
这依然很糟糕
20.15-20.17
don't get no don't be the wrong idea, this is still terrible
这并不是什么错误的想法，只是耗时依然很糟糕
20.17-20.20
again to join six megabytes should not take fifty seconds
要对6MB⼤⼩的数据进⾏join操作不应该花50秒那么久
20:21 - 20:24
But you know we're not one hour ,we were before
但我们⾄少不是之前1⼩时那么久了
20:25 - 20:28
So again just by being smart about Evernote we're doing sequential access
So，我们要意识到，我们做的是循序访问
20:28 -20:33
We're reading a you know a single IO ,we're getting multiple tuples
我们每进⾏⼀次IO操作，我们就会得到多个tuple
20.33-20.37
just making that simple change of our nested loop algorithm
我们来对我们的Nested Loop Join算法做些⼩改动
20:37 - 20:39
We can cut it down to being under a second
我们可以将它所花的时间降低到1秒以内
20:41 - 20:42
So what if we can generalize this
So，我们该如何概括这个呢？
20:43 - 20:47
Right, instead of having one pay or what you know one block for the outer， a block in
the inner
相对于inner table，我们⼀次只读⼀个block（知秋注：即⼀个buffer存⼀个block）
我们这⾥使⽤的是，对于outer来说，使⽤⼀个block 来承载临时数据，对于inner也是⼀个
block
20.47-20.49
what if we have multiple blocks
如果我们是多个block，那会怎么样呢？
20:50 - 20:52
And so the way this is gonna work is
So，它的⼯作⽅式是
20.52-20.59
for the outer relation, we're gonna buffer as much as possible in memory, in B-2 blocks
对于outer table来说，我们会尽可能的使⽤内存中的buffer来保存它，即使⽤B-2个block
20:59 - 21:06
And then we'll retain one block for the inner relation, and one block for the output result
然后，我们使⽤⼀个block来负责inner table，还有⼀个block⽤来负责输出结果
21:06 - 21:08
And we can do it a little bit better
我们可以将这⾥做的更完善些
21:09 - 21:11
All right, and again the basically algorithm looks like
基本上讲，算法差不多是这个样⼦
21.11-21.14
this for B-2 blocks and the inner relation
21:18 - 21:19
Then I'll go fetch one block for the the for B-2 blocks in the outer relation
在遍历outer relation中的B-2个block的时候
21:20 - 21:24
I'll go fetch one block in the inner relation，do the to the scan across the them
我要去获取inner releation中的⼀个block，并对它们进⾏扫描
21:25 - 21:26
And then when I'm done
接着，当我完成的时候
21.26-21.27
the inner block go back to get the next one
我们会从这个inner block中退出，并去获取下⼀个inner block
21.27-21.30
and when I'm completed all the inner blocks for my table
当我处理完inner table中所有的inner block时
21.30-21.33
go and get the next B-2 blocks on the outer table
我会去获取outer table中B-2个block⾥的下⼀个block
21:35 - 21:37
So now again plugging chugging the math
So，现在我将数字带⼊
21.37-21.40
instead of having to do m*N reads,
现在我们不需要再进⾏m*N次读取，
21:40- 21:45
and page reads only only on the outer table It`s M/B-2
对于outer table处page的读取成本来说，这⾥是M/(B-2)
21.45-21.46
and you take the ceiling of that
我们取该值的上限进⾏运算
21.46-21.53
because that's tell me how many chunks of B-2 blocks I can divide the outer table into
因为这会告诉我，我可以将外部表划分为多少个chunk（每个chunk包含了B-2个block）
21:53 - 21:59
And you take the ceiling
所以我们取其上限
because the last you know the last segment of B-2 blocks may not be exactly B-2
因为最后⼀个chunk可能并没有B-2个block
21:59 - 22:01
So you always always round up
So，我们得对它进⾏四舍五⼊
22:04 - 22:09
All right, so now what happens though if the outer relation fits entirely in main memory
So，如果outer relation能够完全放在内存中，这会发⽣什么呢？
22.09-22.15
meaning the size of the amount of buffers were allowed to have is greater than M+2
这也就意味着，我们允许buffer的数量⼤于M+2
22:15 - 22:22
Again M+2 is one for the for the inner inner interrelation or the inner table ,and one for
the for the output result
再说⼀遍，M+2中的这个2，⼀个代表的是inner relation或者是inner table，另⼀个⽤来代表的
是输出结果
22:22 - 22:31
So if we can fit B-2 all you know B-2 was exactly the size of the of the interrelation
sorry the outer relation
如果我们的数据⼤⼩为B-2，这⾥的B-2指的是outer relation中block的⼤⼩
如果我们能将数据放⼊这B-2个buffer中，这B-2个buffer中确切包含了我们outer relation中的
所有数据
22:31 - 22:33
Then we're golden
那么，这就很棒
22.33-22.39
because all we need to do now is just go fetch the outer relation once bring that into
memory
因为我们现在所要做的就是从outer relation中获取⼀次数据，并将该数据放⼊内存
22:39 - 22:42
And then just scan through the inner relation once
然后，再去扫描⼀下inner relation
22:43 - 22:45
So then as M+N
So，这样成本就是M+N
22.45-22.47
so now I'm at the I'm at 1500 IOs
So，也就是说，我现在要做1500次IO操作
22.47-22.50
and now I'm at 150 milliseconds
我所要花的总时间也就是150毫秒
22.50-22.54
that's starting to get more realistic, right
现在这个数据就变得更加贴近我们的现实情况了
22:54 - 22:57
So again this is like the best-case scenario
So，这可能是最佳情况了
22:58 - 23:05
Right, if you can fit the app if you have enough memory to fit the ovulation of memory
,you know the nested for-loops the nested loop join is probably gonna be good okay for
you
如果你有⾜够的内存来放outer relation中的数据，那么Nested Loop Join可能对你来说是Ok的
23:07 - 23:12
Of course now if your database is like terabytes or petabytes, you can't do that
当然，如果你的数据库中的数据是TB级或PB级，那么你们就没法使⽤这个
23:13 - 23:13
All right
23:15 - 23:18
So in general why does this suck, why does the nested loop join suck
So，⼀般来讲，为什么Nested Loop Join很糟糕呢？
23:18 - 23:22
Well because the word is basically a brute-force search
因为，简单来讲，这是种暴⼒查找法
23.22-23.26
, all we're doing is sequential scans on the outer relation and the inner relation
我们所做的就是对outer relation和inner relation进⾏循序扫描
23:26 - 23:30
We know nothing about the locality the data, we know nothing about the data that we're
looking at
我们对本地有什么⼀⽆所知，并且对我们要找的数据也⼀⽆所知
23:31 - 23:35
Right, we're assuming it's just we don't care we're blondie just looking for for matches
我们假设，我们并不在意任何东⻄，我们只关⼼是否匹配
23:38 - 23:41
So if as we said before
So，正如我们之前所说
23.41-23.48
sequential scans are always the the fallback option for when we don't have an index, we
don't can do can't do anything smart
当我们没有索引，或者没法很智能地做某些事情的时候，循序扫描始终是我们的备胎选项
23:48 - 23:50
But if we can be smarter
但如果我们可以更聪明点
23.50-23.51
like, if we know we have an index
如果我们知道我们拥有索引
23.51-23.53
or as we see in a second and the Sort-Merge join
这个我们会在稍后的Sort-Merge Join中看到
23.53-23.54
if we know what things are sorted
如果我们所知道的东⻄都是有序的
23:55 -23:57
Then we can make these sequential scans be a bit bit smarter
那么，我们就可以让这些循序扫描变得更加智能
23:59 - 24:02
So then one of the things that database system can do
数据库系统其中能做的⼀件事情就是
24.02-24.06
it can recognize that if you have an index based on the keys you want to join on
它可以意识到，如果你的索引是基于你想进⾏join操作的key
它可以意识到，如果你进⾏join操作的key有建⽴索引
24:07 - 24:08
Then for the inner table
接着，对于inner table来说
24.08-24.15
then you can use that as part of the inner loop instead of actually having to do the
sequential scan every single time
你可以将它作为内循环的⼀部分使⽤，以取代每次都得进⾏循序扫描
24:15 - 24:16
So there's two ways you could do this
So，你们可以使⽤两种⽅法
24:17 - 24:18
So one is if you already have an index available
So，其中⼀种是你已经有了索引的情况
24.18-24.20
because that you know the application created it for you
这是应⽤程序为你所创建的索引
24.20-24.22
then you're golden, because you just use that
那么这就很棒，因为你可以直接使⽤这个索引
24:23 - 24:25
Again that's gonna be very common in order to be workloads
再说⼀遍，这在各种workload中⾮常常⻅
24.25-24.26
because as we said
因为正如我们所说的
24.26-24.27
if you have foreign Keys
如果你拥有外键
24.27-24.32
you have to have an index to enforce the foreign key constraint
那么你就必须得通过⼀个索引来强制外键约束了
24:32 - 24:34
So therefore you would use that to find the thing you're looking for
因此，你们可以通过它来找到你们所查找的东⻄
24:35 - 24:39
Some systems can build a an index on the fly
某些系统可以在运⾏时构建⼀个索引
24.39-24.43
essentially what a hash join is going to be as we'll see later on
我们会在之后看到hash join是怎么⼀回事
24:43 - 24:44
But in other systems like in SQL Server ,
但在其他系统中，⽐如SQL Server
24.4424.47
they can actually build a B+tree on the fly
实际上它们可以在运⾏时构建⼀个B+ Tree
24:47 - 24:48
We call it a spooling index
我们将它称为spooling index
24.48-24.51
that during the query
它是在查询时所⽤的
24.51-24.53
then they run you know run the query do the join using your index
然后，当系统执⾏查询并进⾏join操作的时候，就会去使⽤你的索引
24.53-24.54
and then when the query is done they just throw it away
当查询结束，系统就会将这个索引扔掉
24:56 - 25:00
Again the idea here is that the cost of doing sequential scan is so expensive
再次强调，循序扫描所要付出的代价太⾼了
25:00 - 25:02
That's better off to build an index
所以最好要建⽴索引
25.02-25.04
you know and then ephemeral index right now to do my query
我们会去将这个临时索引⽤到我们的查询中
25.04-25.07
and then it'll throw it away
然后，⽤完就扔
25:07 - 25:09
Let's see how we do it index nested loop join
我们来看下我们该如何进⾏Index Nested Loop Join
25:10 - 25:14
So again all we're doing is that we step through the sequential scan on the outer relation
So，我们会先对outer relation进⾏循序扫描
25:14 - 25:21
Again we can use additional buffers blocks， to not have to go fetch you know have I/O
for every single tuple
我们可以使⽤额外的buffer block，并且⽆需每次都对单个tuple进⾏ I/O 获取
25:21 - 25:26
But in the inner part the inner for loop, we're now gonna do a probe on the index
但对于内部for循环来说，我们会去使⽤索引探针（index probe）
25:27 - 25:29
And then if we find a match
如果我们匹配上了
25.29-25.36
we would then go check to see whether we have a you know produced as an output
然后我们就会去检查看看能否⽣成⼀个输出
25:36 - 25:40
Now the index does not need to be exactly what we are join key is
索引并不⼀定完全是我们所要进⾏join操作的key
25:40 - 25:43
So we're trying to say we join on column A and column B
So，⽐如我们试着对A列和B列进⾏join
25:43 - 25:44
If we have an index on A
如果我们在A列上有索引
25.44-25.51
we can still do that index probe to go restrict now the number of tuples need to evaluate
just on that actuate A
我们依然可以使⽤索引探针来限制对A列上的tuple
我们依然可以使⽤索引探针来对A列上的key进⾏评估得到合适tuple的数量
25:51 - 25:52
But then now
但现在
25.52-253.53
once we get the output
⼀旦我们拿到了输出结果
25.53-25.57
we do that additional match to see whether we have whether B matches as well
我们会额外做次匹配，以此来看B列中是否有匹配的tuple
25:57 - 25:59
So the index doesn't need to be an exact match
So，索引不需要被精确匹配
26:01 - 26:03
So now what's the cost of doing this,
So，现在这样做的成本是多少呢？
26.03-26.07
well it depends, right depends on what the index looks like
Well，这取决于我们所使⽤的索引
26:08 - 26:12
So we're just going to represent the cost of probing the index with some constant C
So，我们使⽤⼀个常量C来表示索引所带来的成本消耗
26:12 - 26:14
Because again if it's a hash table
因为如果它是⼀个hash table
26.14-26.17
then it's you know best-case scenario O(1)
那么最好情况下，它的复杂度是O(1)
26.17-26.18
, if it's a B+tree then it's log n
如果它是B+ Tree，那么复杂度就是log(n)
26:18 - 26:27 ！！！！！！！
Right but when you're placed that that having to go access every single page in the inner
relation that uppercase N with this constant
但当我们去访问inner relation中的每个page时，对于这单个page来说，成本就是n*C，对于N
个page的话，成本就是N+(n*C)（知秋注：因索引是有序的，所以在知道这些tuple所在位置
后，只需要进⾏N次IO就可以拿到所有想要的数据，所以成本就是这样咯）
26:28 - 26:30
And that's in general that can be much better ,much faster
⼀般来讲，这样会更好，并且速度更快
26:34 - 26:36
So this is all you really need to know about nested loop join
So，这就是你们所需要知道的关于Nested Loop Join的所有东⻄
26.36-26.38
like I said it's the brute-force approach, it's the most simplest thing
就像我说的那样，这是种暴⼒的做法，⽽且它是最简单的做法
26:39 - 26:42
If any database system says that you know a new system says they support joins
如果某个新数据库系统表示，它们⽀持join操作
26:43 - 26:44
It's more likely that they're doing this
那么它们更可能使⽤的就是这种暴⼒的⽅式
26.44-26.47
because this is and this is the easiest to implement
因为这种⽅法实现起来最为简单
26:47 - 26:51
So the main things we need to mindful is that again always pick the smaller table as the
outer relation
So，我们需要注意的重点始终是，将更⼩的表作为outer relation
26:52 - 26:57
We're gonna try to put at the outer table as much as possible in memory to reduce
amount of redundant IO we're doing on that
我们会试着尽可能将outer table放⼊内存中，以此来减少我们所做的冗余IO的次数
26:58 - 27:01
And then if possible if we have an index on our inner table,
如果我们的inner table中有⼀个索引的话
27.01-7.03
then we want to use that
那么我们就会想去使⽤它
27.03-27.08
otherwise we fall back to just doing a sequential scan
否则，我们只能退⼀步，去使⽤循序扫描了
27:08 - 27:08
Okay
27:10 - 27:12
All right, so again this is like the dumb thing
So，这种做法其实很愚蠢
27.12-27.15
we don't know anything about the data ,we don't anything about what the values look
like
我们对数据⼀⽆所知，并且我们也不知道值是⻓什么样
27:15 - 27:20
We just other than having an index, we're just always doing a brute-force search
我们除了通过索引来做以外，我们就只能⼀直使⽤暴⼒搜索来解决了
27:21 - 27:22
So let's try to be a bit smarter
So，我们来尝试点聪明的做法
27.22-27.25
and this is what the sort merge join tries to do
这是sort-merge join所试着做的事情
27:25 - 27:26
So as I said last class
So，正如我上节课所说的那样
27.26-27.27
this is super confusing
这令⼈超级困惑
27.27-27.31
because I'm gonna teach you these sort merge join algorithm
因为我要教你们sort-merge join算法
27:31 - 27:32
But in the sort phase
但在排序阶段
27.32-27.35
the sort-merge join algorithm it can use the external merge sort that we talked about
last time
sort-merge join可以使⽤我们上节课所讨论的external merge sort算法
27:36 - 27:39
But in the external merge sort it has his own merge phase which is different than this
merge phase
但在external merge sort算法中，它有它⾃⼰的merge phase，这和我们此处的merge phase
不同
27:40 - 27:40
So this is confusing
So，这令我们很困惑
27.40-27.42
but the only give me mindful always like
但这让我唯⼀喜欢的⼀点就是
27.42-27.47
the sort phase we just use the external merge sort we did last class or quicksort if it'
fits in memory
在排序阶段，我们可以使⽤我们上节课说过的external merge sort，或者，如果是数据可以全
都在内存中的话，我们可以使⽤快排
27:47 - 27:50
And then the merge process will be different than what what they did before
然⽽，合并处理则和我们之前所讲的不⼀样
27:51 - 27:52
Again, so two phases
So，再说⼀遍，它有两个阶段
27.52-27.53
sort it first
先对数据进⾏排序
27.53-27.55
spill to memory spill a disk in necessary
如果内存中放不下这些数据，那么可以将数据溢出到磁盘
27:56 - 27.57
And then in the merge phase
接着，在合并阶段
27.57-27.57
as we'll see an example,
正如我们在例⼦中看到的那样
27.57-28.04
we're gonna walk through the two sorted tables one by one and do comparisons across
them, and if we can see we have a match
我们会通过游标对这两个排好序的表中的tuple进⾏逐个⽐较，如果匹配，就输出匹配的tuple
28:04 - 28:06
And in some cases
在某些情况下
28.06-28.11
we may we never we only have to look at each tuple once in the inner relation
我们只需要查看inner relation中的每个tuple⼀次就⾏了
28:11 - 28:15
We only always look at each tuple once in the our relation,
我们始终只查看outer relation中每个tuple⼀次
28:15 - 28:22
But in the inner relation we may also not have to go back track ever and look at the
same table multiple times
但在inner relation中，我们可能也不需要去进⾏回溯并多次查看同⼀个tuple
28:22 - 28:24
But we don't like to go jump at the very beginning every single time
但我们不想每次都跳到inner relation最开头的地⽅
28.24-28.26
the way you have to do in a sequential scan
不然我们就得进⾏循序扫描
28:26 - 28:28
And that's the that's the advantage you get by sorting ahead of time
这就是你提前进⾏排序的好处
28:30 - 28:33
So this is a approximation on the algorithm
So，这是该算法的⼀种近似算法
28.33-28.34
the basic way it's gonna work is that
它的基本⼯作⽅式是这样的
28.34-28.35
after sorting
当排完序后
28.35-28.36
we're gonna have two cursors
我们会使⽤两个游标
28.36-28.38
one on the inner table, one on the outer table
⼀个⽤于inner table，另⼀个⽤于outer table
28.38-28.42
and they're going to walk step-by-step down looking at tuples
它们会逐个查看每个tuple
28:43 - 28:44
So at each iteration
So，在每次遍历的时候
28.44-28.51
if the outer relationship cursor is pointing at a tuple that has a value that's greater than
the inner one
如果outer table中的游标所指向的tuple的值⼤于inner table中cursor当前所指向的tuple的值
28.51-28.54
then we're going to increment the inner cursor
那么我们就会增加inner table中的游标⾃身的值
28:54 - 28:56
If the outer is less than the inner
如果outer table中的游标所指的tuple的值⼩于inner table中游标所指的tuple的值
28.56-29.00
then we implement increment the outer
那我们就会去移动outer table中的游标
29:00 - 29:00
If we have a match
如果匹配了
29.00-29.02
we produce it as an output
我们就将它作为输出进⾏⽣成
29.02-29.03
and then we increment the inner
然后，我们再移动inner table中的游标
29:05 - 29:07
So reading code like this is difficult
So，读起这种代码，还是有点难的
29.07-29.09 ！！！！！！！
so let's do a visual example
So，我们⽤图来举例
29:10 - 29:11
So again we have two tables
So，这⾥我们有两张表
29.11-29.16
and we're going to join R and S on on the ID column for both these tables
我们在id列上对R表和S表进⾏join操作
29:16 - 29:17
So in the very first step
So，在最开始
29.17-29.18
we're going to do sorting
我们要先去进⾏排序
29.18-29.21
and again this is just the external merge sort or the quicksort
这⾥我们所要使⽤的是external merge sort或者快排
29.21-29.24
depending whether it fits a memory or not
这取决于数据是否能放在内存中
29:24 - 29:25
So now our result is sorted
So，我们现在就排好序了
29.25-29.30
and what we're gonna want to do now is again have a cursors walk through these two
tables
现在我们想做的事情就是通过游标去遍历这两个表
29:31 - 29:34
So we're gonna start at the very beginning here or maybe the cursor R and cursor S
So，我们会从表的最上⾯开始进⾏遍历，这⾥我们有两个游标，即R和S
29:35 - 29:41
So the first thing we're gonna do when they start they're gonna go look at the the value
that the actuate their joining on the ID field
So，⾸先我们要做的就是去检查我们要join的那个字段（即id字段）的值
29:41 - 29:42
In this case here
在这个例⼦中
29.42-29.47
the the tuple that the out of relation cursor is pointing to the value is 100
outer table中游标所指的tuple的id为100
29.47-29.50
and for the inner relation cursor the value is 100
inner table中游标所指的值是100
29:50 - 29:51
So that's a match
So，这样它们就匹配上了
29:51 - 29:56
So we would produce that combined tuple as our output for our joining
So，我们会将这两个tuple结合在⼀起，作为我们join操作的输出结果
29:56 - 30:01
And then now at this point we then increment the inner relation cursor and move it down
by one
此时我们要做的就是将inner table的游标向下移动⼀个单位
30:03 - 30:04
So now we look at 100 again
So，现在我们在inner table中⼜看到了100
30.04-30.08
and again that matches on this what we're pointing to here
这个tuple和我现在在outer table中所指向的那个tuple匹配上了
30:08 - 30:09
So we produce another output
So，我们就⽣成了另⼀个输出
30:11 - 30:13
And then be incremented again and now it's 200
然后我们将inner table中的游标再往下移动⼀个单位，现在指向的值就是200
30:13 - 30:16
So now this point 200 is greater than 100
So，此时，200⽐100⼤
30:17 - 30:21
So the we increment the outer relation cursor
So，我们将outer table中的cursor往下移动
30:23 - 30:24
So now look so so in this case here
So，在这个例⼦中
30.24-30.29
we know that when we want to do this evaluation between does 200 equals 200 which it
does have a producer output
此时我们知道，200等于200，也就是说，这⾥我们会⽣成⼀个输出
30:30 - 30:33
We don't need to go back and look at anything else
我们不需要回过头再去查看任何东⻄
30.33-30.35
because we know at this point the cursor is looking at 200
因为我们知道此时这个游标所看的值是200
30:36 - 30:40
And it's the first time I've seen this value 200 and on the side of the table
并且这是inner table中的游标第⼀次看到200
30:40 - 30:44
So I know I don't need to look at anything up above in the in the table
So，我知道我不需要再看这张表上游标以上的任何东⻄
30:44- 30:46
So if you were just doing a nested loop join
So，如果你使⽤的是nested loop join
30.46-30.48
you don't know that
那你就不会知道这点
30.48-30.50
you'd have to do the scan all the way from the beginning,
那你就得从上到下进⾏扫描
30:50 - 30:52
But because we pre sorted everything
因为我们已经预先排好序了
30.52-30.57
we can say well everything above me in 200 doesn't need doesn't need to be examined
to do this join
所以，对于此处任何id值⼩于200的tuple，我们都不需要检查判断是否需要进⾏join操作
30:58 - 30.59
So that's the advantage that we're doing here
So，这就是此处我们这样做的优势所在
30.59-31.04
that that's the benefit we're getting a sort-merge over the nested loop join
这就是我们基于nested-loop join来进⾏sort-merge join的优势了
即这种sort-merge join的⽅式⽐nested-loop join更好的原因所在
31:04 - 31:06
So let's look at a case what we have to do backtracking
So，我们来看个需要进⾏回溯操作（backtracking）的例⼦
31:07 - 31:10
So the the outer relation is 200
So，此处outer relation中游标所指的是200
31.10-31.13
the inner relation is 200, we already produced a match
inner relation中游标所指的也是200，于是我们就⽣成了⼀个匹配的输出结果
31.13-31.17
now we increment the the inner relation ,and now it's 400
于是我们继续移动inner relation中的游标，现在它指向的是400
31:18 - 31:20
And so now 400 is greater than 200
So，现在400⼤于200
31:21 - 31:22
So we increment this side
So，我们移动outer relation处的游标
31.22-31.24
but now we have 200
但现在我们所指向的是200
31:25 - 31:28
So if we just kept going down
So，如果我们将这个游标⼀直往下移动
31.28-31.30
and only going down down one by one
游标只会⼀步⼀步往下移动
31.30-31.35
we would have missed the match between this other 200 that we had up here
那么我们就可能会错过和inner table处的200进⾏匹配⽣成输出的机会（知秋注：如果R这个
200之后还是200，就会错过）
31:35 - 31:42
So we have to maintain some metadata on this side to say oh I the last guy I just looked
at it looked at was 200
So，我们得在inner table中维护些元数据，以便说我上次在这个表中看到的值是200
31:42 - 31:44
So as if I increment this thing
So，如果当我移动outer relation中的这个游标
31.44-31.47
and it matches the last one I just saw
并且它匹配我在inner table中刚看过的最后⼀个tuple的id
31.47-31.53
then I know I need to go back to the very beginning when I first saw that value on the
inner relation
那么我就得回到我第⼀次在inner relation中看到的这个值所在的位置
31:53 - 31:56
And then I can do my mash and do my join them get the match
接着，我就可以对它们进⾏join操作，然后得到⼀个匹配输出
31:57 - 31.59
But then everything else just proceeds as before
然后，其他的东⻄还是按照之前那样处理
31.59-32.02
now increment back to 400
现在，我们将inner table的游标移回400
32.02-32.05
and then 400 once again is greater than 200
此时，400⼤于200
32:05 - 32:06
So if we increment this guy
So，我们移动outer table中的游标
32:08 - 32:11
So again the main the main thing I'm stressing here is that
So，这⾥我要强调的事情是
32.11-32.14
we may hit the backtrack on the interrelation
我们可能会触发inner tabler中的回溯
32:14 - 32:16
But you never backtrack on the outer relation
但我们永远不会对outer table进⾏回溯
32.16-32.20
we're only examining our relation once
我们永远只对我们的关系测试⼀次
32:20 - 32:23
So 300 is less than 400
So，300⼩于400
32.23-32.23
they're not equal
它们并不相等
32.23-32.25
so we increment the outer relation
So，我们将outer table中的游标往下移动
32.25-32.27
now 400 equals 400
现在，400等于400
32.27-32.27
that's a match
然后就匹配上了
32.27-32.31
increment the inner relation for 500 is greater than 400
接着，移动inner table中的游标，现在500⽐400⼤
32.31-32.32
that doesn't match
这就不匹配了
32.32-32.33
that's greater than this
500⽐400⼤
32.33-32.34
increment this
于是我们向下移动outer table中的游标
32.34-32.36
then now we have 5 a match 1 500
现在，500和500匹配了
32:36 - 32:38
So now we increment this
So，现在我们将inner table中的游标往下移动
32.38-32.39
and now we reach the end
现在，我们就遍历完了inner table
32:40 - 32:42
So we can't stop here
So，我们不可以停在这⾥
32.42-32.45
because again we don't know what's coming down below us on the outer relation
因为我们并不清楚outer table后⾯还有哪些数据
32.45-32.47
and we may need to backtrack
我们可能得需要去进⾏回溯
32:47 - 32:49
Because this next tuple might actually be 500
因为下⼀个tuple的id值实际可能是500
32.49-32.53
and we'd have to go back up and go back you know the starting point where 500 is
我们得回过头去，也就是回到起点500那⾥
32:54 - 32.57
Right, but in this case here for this example, there is no match
但例如在这个例⼦中，这⾥没有符合匹配条件的tuple了
32.57-33.03
so we keep going until eventually the both cursor reach at the end ,and then the join is
complete
So，我们会⼀直这样做，直到两个游标都到达两张表的底部，那么join操作就完成了
33:05 - 33:05
Yes
请问
33:14 - 33:16
His question is
他的问题是
33.16-+33.18
going back here for this backtrack part
回到回溯（backtrack）这部分
33.18-33.23
how would I keep track that I I saw 200 before, now I'm seeing 400
我该如何进⾏跟踪呢？我之前看到的是200，现在我看到的是400
33.23-33.25
and then when this guy sees 200
接着，当我看到左边这个游标指向200的时候
33.25-33.26
I know I need to backtrack
我就知道，我需要进⾏回溯了
33:25 - 33:31
You just say here's here's the for the last value that's different than the current value I'm
pointing at
你就会说之前我们所看到的上⼀个值和我们当前指向的值不同
33.31-33.32
here's the starting location
这是游标的起始位置
33:32 - 33:34
So if you had a bunch of 200 here
So，如果你在inner table中有⼀堆id为200的tuple
33.34-33.35
you know you have to jump that very beginning
那你知道的，你就得跳到很上⾯再进⾏匹配
33:36 - 33:38
Right yes yes yes
请讲
33:59 - 34:01
Yeah, his point he's correct
他的观点是对的
34.01-34.03
is like if I'm down here
如果我移动到这⾥
34:04 - 34:05
I finished my last one
当我⽣成最后⼀次输出后
34.05-34.08
and now I'm off and say well the last thing I saw with 500
现在我就完成了join操作，并且我们最后看到的id是500
34:09 - 34:13
So over here if I get to 600, I know that 600 is greater than 500
So，此处我的游标指向了600，我知道600⼤于500
34.13-34.18
there can never be anything below me that's going to be matched with this
我知道在inner relation中500所对应的tuple下⾯没有任何东⻄了
34.16-34.19
,so ever I could just terminate here ,
So，我可以在这⾥就结束处理
34:20 - 34:20
yes You could do that
没错，你可以这么做
34:25 - 34:29
Okay, so what's the cost of doing this
So，这样做的成本是多少呢？
34:29 - 34:36
Well the sort costs on the inner and the outer table are just the the external merge cost
that we talked about before
inner table和outer table中排序所⽤的成本就是我们之前讨论过的external merge sort所⽤的
成本
34:37 - 34:38
Right, similiarly we have to spill to disk
类似的，我们可能得溢出到磁盘
34:39 - 34:43
So now but now the merge cost roughly is M+N
但现在，粗略的来讲，合并的成本是M+N
34:45 - 34:46
Right, and the best-case scenario
在最好情况下
34.46-34.51
I'm gonna read every page and the outer table once and every page on the inner table
once after they're sorted
当outer table和inner table排好序后，我要去读取outer table中每个page以及inner table中的
每个page
34.51-34.55
Now I just showed in the backtrack case that's not exactly true
现在，我只是展示了回溯这个例⼦，虽然讲的不是完全正确
34:55 - 34.56
Because if I go back here
因为如果我回到这⾥
34.56-34.59
if say 400, 500 one page
如果⼀个page上有400或500个tuple
34.59-35.02
but then I got a backtrack to 200 that's on the previous page
但我得回溯到id为200的tuple处，它在前⼀个page上
35.02-35.04
I gotta go fetch that again
我得再次去获取它⼀次
35:04 - 35:10
But again we can't compute that for our you know in this example
但在这个例⼦中，我们⽆法进⾏计算
because we don't know what the layout is of the data
因为我们并不清楚这段数据的布局是怎样的
35:10 - 35:11
So we're just gonna simplify it
So，我们会简化它
35.11-35.15
and just say that it's M+N
So，这⾥的成本就是M+N
35:15 - 35:24
Again, so the cost of the total certain sort-merge join on its cost the sort phase which
whatever sort algorithm you want to use, and the cost of this merge phase which we
approximate to be M+N
排序阶段的成本则是取决于我们使⽤的排序算法来决定，合并阶段我们的成本就近似为M+N
35:26 - 35:30
So now if we say we have 100 buffer pages for our simple example
So，假设在我们的例⼦中，我们有100个buffer
35:31 - 35:33
Then we can sort R and S in two passes
然后，我们通过两轮来对R和S进⾏排序
35.33-35.35 !!!!!
again that's just using the formula from last class
这⾥我们使⽤了上节课的公式
35:36 - 35:46
So therefore the and then the merge cost is just reading each 1,000 pages from the
inner sorry 1000 pages of the outer ,the 500 pages is the inner which is 1500
So，接着合并的成本就是1000（对outer relation进⾏1000次IO）加上500（对inner relation
进⾏500次IO），所以合并阶段的总成本就是1500
35:46 - 35:50
So you take the cost of sorting R 3,000 sorting R 1350
So，对R排序的成本就是3000，对S进⾏排序的成本就是1350
35:51 - 35.53
And then merge pass 1500
接着，合并阶段的成本就是1500
35.53-35.55
you get 5850 IOs
所以这⾥的总成本就是5850次IO
35.55-36.01
which is roughly 0.59 seconds 590 milliseconds
这个过程⼤概就是0.59秒，也就是590毫秒
36:02 - 36:08
So again the the block based nested loop join, we can get down to 50 seconds
So，我们可以将基于block来做的nested-loop join所花的时间降低到50秒
36.08-36.12
and now in this case here, we're now we're under a second
现在在这个例⼦中，我们将时间降低到了1秒以内
36:12 - 36:14
Now this is starting to look reasonable right
现在，这看起来开始有点合理了
36:17 - 36:23
So the worst case scenario for the sort-merge which is rare but it could happen
So，对于sort-merge来说，我们很少会遇到最糟的情况，但这还是有可能发⽣的
36.23-36.30
is that you have every single value on the outer table is exactly the same as every single
value in the inner table
⽐如你outer table中每个值和inner table中的每个值完全相同
36:30 - 36:33
So like every value in the tuples, it's just one
So，⽐如tuple中的每个值都是1这种情况
36:34 - 36:36
Right, so sorting is just wasting time
So，排序就是在浪费时间
36.36-36.39
because you're not sorting you know you're not giving any benefit from that
因为你并不能从排序中获得任何好处
因为你的这种排序⽅式就带不来什么性能提升
36.39-36.42
because it's just gonna be the same you know columns of ones all over again
因为它们都是⼀模⼀样的数字，就是⼀列1
36:43 - 36:50
And then now you're just paying the the cost of walking through the you know writing
back to a nested loop join
其实这就变成了nested loop join
36:50 - 36:52
Right, but this is rare right
但这种情况很少⻅
36.52-36.57
this is not like people do stupid things and databases, but this one's pretty stupid right
你做事蠢就蠢吧，但这种情况实在是太蠢了
36:57 - 36.59
And the databases we could recognize
接着，数据库可以意识到
36.59-37.02
oh I have only one value for this column don't even bother doing the sort merge
我这⼀列中全都是⼀个相同的值，我根本不需要使⽤sort-merge join
37.03-37.06
just you know it's essentially calls follows back to the Cartesian product
这就变成了笛卡尔积的情况（知秋注：这种情况哪⾥需要排序，直接⽣成输出就好，即笛卡尔积
数据结果）
37.06-37.08
which is just two nested for loops
也就是两个for循环（嵌套型的）
37:11 - 37:13
So in that case when it's the sort merge join actually useful
So，在这个例⼦中，sort-merge join实际上⾮常有⽤
37:14 - 37:18
Well if the two tables are already sorted on the join key
Well，如果这两张表已经根据join key排好序了
37.18-37.19
then we're golden
那我们就很幸运
37.19-37.21
because then we don't even have a sort cost
因为我们就不需要考虑排序成本了
37:21 - 37:23
All right, this is what that clustered index stuff I've talked about before
这其实就是我以前讨论过的聚簇索引相关的内容
37.23-37.27
if I'm doing join on the ID attribute
如果我在id属性上进⾏join操作
37.2737.29-
and then I have a clustered index on my table
然后我的表中有⼀个聚簇索引
37.29-37.31
where it's sorted on the ID attribute
它是根据id属性进⾏排序
37:32 - 37:34
Then I don't have a sort phase
那么，我就不需要排序这个阶段了
37:35 - 37:37
I'm exactly where you know the data is where I want to be
我知道我想要的数据在哪⾥
37.37-37.40
and now I just have my cursor just go through and lockstep with each other
然后我就将我的游标移动到那⾥，通过读锁来读取每⼀条记录
37:41 - 37:45
It's also super helpful is when the the if the query contains an order by clause
如果查询语句中包含Order By⼦句，那么这就会超级有⽤
37:45 - 37:47
And the order by Clause is the same
对于Order By⼦句来说也是同样如此
37.47-37.53
you know what sort the table or the sort the result on the same keys that you want to do
a join on
它会基于我们想进⾏join的key来对表或者结果进⾏排序
37:53 - 37:57
Then I'm getting a two for one ,because now I do my sort-merge join
接着，我会让它们合并，因为我现在在做sort-merge join
37:57 - 38:00
And then the output is sorted in the same way that the order by Clause wants it to be
sorted
输出的排序顺序是和Order By⼦句的排序顺序是⼀样的
38:01 - 38:02
So I'm even have to do that order by Clause
So，我得通过Order By⼦句来做到这⼀点
38:04 - 38:08
So again the database system can recognize that oh I my query looks like this
So，数据库系统可以意识到我的查询是这样的
38:08 - 38:10
Because again it's declarative
再说⼀遍，SQL是声明式语⾔
38.10-38.12
I you tell it how you want it to be sorted
你告诉数据库你想要的排序⽅式
38:12 - 38:13
And it can look at that and say oh
它会查看这条SQL语句，并说
38.13-38.17
well you want to be sort of them as key, and you want to also join it on this key
Well，你想按照key来对它们进⾏排序，并且你想根据这个key来进⾏join
38:17 - 38:21
So let me do the sort-merge join rather than doing a nested loop join or hash join
So，这⾥我会使⽤sort-merge join，⽽不是nested-loop join或者hash join
38.21-38.22
and then followed by an order by
接着根据Order By进⾏排序
38.22-38.24
because I just cut off that extra operator entirely
因为我完全砍掉了额外的operator
38:25 - 38:26
And that's gonna run way faster
这样做的话，执⾏起来会更快
38:28 - 38:32
So again it's all the same things we talked about for in the last class
So，再说⼀遍，这和我们上节课所讨论的东⻄⼀模⼀样
38:33 - 38:37
If we have an index that's already sorted in the way we wanted to be and it's clustered
we can just use that
如果我们的索引已经按照我们希望的⽅式排好序，并且它是聚簇索引，那么我们就可以使⽤它
38.37-38.40
otherwise we fall back to the external merge sort
否则，我们会回退到external merge sort
38:40 - 38:40
Yes
请问
38:46 - 38:52
So this question is and we will talk about this on on on Monday next week
So，我们会在下周⼀讨论这个
38:53 - 38:56
This question is where is the output of the of them sorting
他的问题是，这些排完序的输出结果被放在了哪⾥
38:56 - 38:57
Right is it cached
这些结果被缓存起来了
38:57 - 39:00
Well so it's an intermediate resulte for the query
Well，它是该查询的⼀个中间结果
39.00-39.03
ok so then it's what it's backed by our buffer pool
So，它被我们的buffer pool所保存起来
39:03 - 39:06
So the buffer pool has spilled to a disk
So，buffer pool得将该结果溢出到磁盘上
39.06-3909
because our data set is too large we already can't handle that
因为我们的数据集太⼤了，所以我们没法将它放在内存中
39:09 - 39:11
But that's why we picked sort-merge
但这就是我们使⽤sort-merge的原因
39.11-39.14
because that try to maximize them in the mount of sequential I/O that we're doing
因为这可以试着最⼤化我们循序I/O所获得的数据
39:14 - 39:16
Because we it could be the case we have to spill a disk
因为我们可能得将数据溢出到磁盘
39:17 - 39:20
Yeah,so it's cached and it's specific to the one query that's running it
So，该查询所得出的中间结果就被缓存起来
39:21 - 39:25
And then we can do the I think we talked about scan sharing a little bit
我觉得我们以前有讨论过⼀点scan sharing（扫描共享）
39:25 - 39:30
But like if we recognize that two queries wanted to sort the same data at the exact same
time the same way
但如果我们意识到有两个查询想在同⼀时刻⽤同样的⽅法对相同数据进⾏排序
39:30 - 39:33
We could piggyback and just do it once and share it across the two of them
我们做⼀次排序就可以了，并将结果和它们进⾏共享
39:34 - 39:37
Right, the high end systems can do that MySQL and PostgreSQL cannot
⾼端的DBMS可以做到这点，但是MySQL和PostgreSQL做不到
39:41 - 39:43
Okay so sort merge is super super useful
Ok，sort-merge真的超级有⽤
39.43-39.48
the Postgres supports this all of major commercial database system will support this
PostgreSQL⽀持它，所有主流的商⽤数据库系统也有对它进⾏⽀持
39:49 - 39:53
The sort of smaller newer embedded data systems don't usually support this
某些更⼩更新的嵌⼊式数据库系统通常并不⽀持它
39:54 - 39:56
They usually support nested loop join
它们通常⽀持nested-loop join
39.56-39.59
and then if they get their together they can support hash join
还有hash join
0:00 - 40:014
do that
但不是所有⼈都能做的


11-03
40:02 - 40:03
Alright, let's take about a hash join
我们来讨论下hash join
40:04 - 40:07
Again this is gonna be the most important algorithm we're going to use to do joins
再说⼀遍，这是我们⽤来进⾏join操作时最为重要的算法
40:07 - 40:09
Because this in general it's going to get the best performance
因为总的来讲，我们能通过它获得最佳性能
40.09-40.12
for a large large data set
对于⼀个超⼤数据集来说
40.12-40.14
this is pretty much always what you're going to want to want to do
这是你通常始终想做的事情
40:15 - 40:23
So the basic insight about how hash join is gonna work, it`s similar to how we were
doing that hash based aggregation at the end of last class
So，关于hash join的⼯作⽅式，这和我们在上节课最后所讲的hash aggregation是相似的
40:24 - 40:26
Right our hash function is deterministic
我们的hash函数是确定性的
40.26-+40.30
meaning for the same input the hash value will always produce be the same thing
这意味着，如果我们将同⼀个输⼊传给该hash函数，那么它⽣成的值始终是相同的
40:31 - 40:32
So that means that
So，这意味着
40.32-40.37
if we have values in the outer table that hash to a certain thing or certain value
如果我们将outer table中的value进⾏hash处理，让它映射到某个值上
40:37 - 40:40
And then values in the inner table that hash to the same thing
接着，对inner table中的value也hash到同⼀个值上
40:40 - 40:41
Because they're equal
因为它们是相等的
40.41-40.44
then we can use that to sort of partition and split things up
然后，我们就可以⽤它来进⾏分区，以此将这些东⻄分开
40:44 - 40:47
So that we only have the examined things within the same hash bucket
So，我们只需要在同⼀个hash bucket中对数据进⾏检查就可以了
40:48 - 40:50
Again it's like a divide and conquer approach
就像是⼀种分治策略
40:52 - 40.53
Alright, so that's the basic idea what we're gonna do
So，这是我们所使⽤的基本思想
40.53-40.58
that we're gonna split the the outer relation up into partitions based on the hash key
我们基于hash key来将outer table拆分为多个分区
40.58-41.02
and for this one Oh we'll get to a second
我们稍后再讲这个
41:02 - 41:06
But this one if it's gonna be fit everything fits in memory
如果这些数据都能放在内存中
41.06-41.07
we can use a linear hash table
我们就可以使⽤linear hash table
41.07-41.11
linear probing hash table we talked about before like a static hash table
我们以前讨论过linear probing hash table，⽐如static hash table
41:11 - 41:13
If we're gonna have to spill a disk
如果我们必须将数据溢出到磁盘
41.13-41.18
then we can do that recursive partitioning on a bucket chain hash table that we talked
about also before
那么我们就可以通过我们之前讲过的bucket chain hash table进⾏递归分区
41:19 - 41:22
So again the idea is that if we have tuples in the same partition
So，这⾥的思路是，如果我们的tuple都在同⼀个分区
41:22 - 41:24
Because the hash at the same location
因为它们hash到了同⼀个位置
41.24-41.27
then we only need to worry about guys that are that are in my same partition
那么我们只需要去关⼼同⼀个分区中的数据就⾏了
41.27-41.29
I don't to look across the entire table
我也就不⽤去看整个表了
41:29 - 41:30
Again the idea is
这⾥的思路是
41.30*-41.36
we're paying an upfront cost to split the data up to make the search or probing process
run much faster
我们需要付出些前期成本来将数据进⾏拆分，以此让查找或探测过程变得更快
41:37 - 41:39
So a basic hash join algorithm has two phases
So，⼀个基本的hash join算法有2个阶段
41:40-41:42
In the first phase the build phase
第⼀个阶段就是build
41.42-41.45
you take the outer relation you do a sequential scan on it
我们拿到outer releation，并对其进⾏循序扫描
41:46 -41:48
And then you're going to populate a hash table
接着，我们对要join的那个属性进⾏hash处理，并将数据填⼊hash table
41:49 - 41:51
And then in the second phase the probe phase
接着，第⼆个阶段就是Probe
41.51-41.53
now you do a sequential scan on the inner relation
现在，我们要对inner relation进⾏循序扫描
41:54 - 41:58
Using the same hash function you then probe into the hash table, you built in the first
phase
使⽤和上⼀阶段相同的hash函数对inner relation中的每个tuple进⾏hash处理
41:58 - 42:00
And look to see whether you have a match
然后检测是否有匹配的tuple
42.00-42.02
and if you do， you produce it as the output
如果匹配，那我们就⽣成输出
42:04 - 42:06
So at a high level it looks like this
So，从⾼级层⾯来看，它看起来像这样
42:06 - 42:07
Right so again this what I'm saying
So，这就是我所说的
42.07-42.10
so about for about inner vs outer tables
So，对于inner table vs outer table
42:11 - 42:12
So in this one
So，在这个例⼦中
42.12-42.14
we don't really have a nested for loop
我们不会去真的使⽤⼀个内嵌for循环
42.14-42.18
we have a for loop to build the hash table, and a for loop to do the probe
我们通过⼀个for循环去构建hash table，然后再⽤⼀个for循环来对数据进⾏检测
42:18 - 42:25
But we still were first referred to the the relation, we're going to build a hash table 1 as
the outer relation for you know just to keep everything consistent
但我们依然要使⽤outer relation来构建出⼀个hash table，以此让所有东⻄⼀致（知秋注：⽐如
设定⼀个⽬的地：家，⾸先根据外表通过function1将家这个scheme搞出来，然后内表根据这个
function1也到这个家中，即双双把家还，即产⽣了输出）
42:26 - 42:28
So in the first step the first phase
So，在第⼀阶段中
42.28-42.29
we're going to populate this hash table
我们要去填充这个hash table
42.29-42.31
we're just doing sequential scan on this guy
我们对outer table进⾏循序扫描
42:31 - 42:36
And insert key ,but we want to put into the hash table
然后，我们对key进⾏hash处理并插⼊这个hash table
42:37 - 42:38
Then in the second phase
接着，在第⼆个阶段中
42.38-42.40
we just do a sequential scan on the inner relation
我们对inner table进⾏循序扫描
42:40 - 42:41
Probe inside this
然后对这个hash table进⾏检测
42.41-42.45
doesn't you know it doesn't matter what hash table implementation we're using
这⾥我们使⽤什么样的hash table实现都⽆所谓
42:45 -42:47
But we know how to always find an exact match
但我们知道该如何找到⼀个匹配的tuple
42.47-42.48
and if we find one
如果我们找到⼀个匹配的tuple
42.48-42.49
then we produce that as in our output
那么我们将它作为我们的输出进⾏⽣成
42:51 - 42:54
Right, pretty straightforward
看吧，相当简单
42:55 - 42:58
So the key again is just whatever you're doing or join on
So，这⾥的key指的就是我们想要进⾏join操作所基于的那些属性
42:58 - 43:03
The value can depend on how you actually want to implement your hash table in your
system
这⾥的value则取决于我们实际在系统中所实现的hash table
43:04 - 43:04
Right
43:05 - 43:06
And as we said before
正如我们之前所说的那样
43.06-43.09
it can depend on what the output is going to be
这取决于我们的输出结果⻓啥样⼦
43.09-43.12
or what the output what the what information is needed up above in the query plan
或者说，我们需要往查询计划上传递哪些信息
43.12-43.14
that'll determine what you actually want to store
这会决定你实际想要存储的是什么
43:16 - 43:20
So this is this classic trade-off between storage and compute in computer science
So，这就是计算机科学中关于存储和计算间的⼀个经典的取舍问题
43:21 - 43:22
We could store the full tuple
我们可以去存储完整的tuple
43.22-43.29
because that's everything we need to produce it the output up above, plus us everything
we need to do our join in our hash table
我们可以基于它来产⽣结果输出，同时，通过它，整个join过程所有的事情都发⽣在我们的
hash table中（知秋注：⽆须再回表IO了）
43:30 - 43:35
But of course now that that makes our hash table much larger
但当然，这种做法⽆疑会让我们的hash table变得更⼤
43.35-43.36
which means we could have to spill to disk more
这意味着我们得将数据溢出到磁盘
43:36 - 43:39
But at least computation entry faster to find exactly what we want
但⾄少在计算寻找我们想找的那个位置速度会更快
43.39-43.43
because we jump at the hash table and we have everything we need right there
因为我们可以通过hash函数来跳转到hash table上的某个位置，该位置上有我们所需要的⼀切
43:43 - 43:49
The other approach is sort of do something like the late materialization approach where
we just store the tuple identifier
另⼀种⽅式就是去使⽤类似later materialization之类的⽅式，即这⾥我们只存储tuple标识符（
tuple record id）
43:49 - 43:53
And when we hash into the to the hash table
当我们hash到这个hash table时
43.53-4357
we scan till we find the key that the key that we want
我们会对其进⾏扫描，直到我们找到我们想要的key为⽌
43:57 - 43.59
But then we would see that we have at this tuple id as far
然后我们就会看到我们想要的这个tuple id
43.59-44.03
that we have to go fall along and get more information that we need
我们得继续往下，通过它来得到我们所需要的数据
44:03 - 44:06
And so again for column stores
So，对于列存储来说
44.06-44.07
this approach is usually better
通常，第⼆种⽅式来得更好
44:07- 44:09
In general
⼀般来讲
44.09-44.11
because the hash table is much smaller
因为这样做的话，hash table能变得更⼩
44.11-44.12
this won't be better for row stores
对于⾏存储来说，这样做并不会来得更好
44:13 - 44:19
Because it's it's, you you're storing we store all the data you need
因为我们存储了你所需要的必要数据（即某⼀列数据，⾥⾯也包含tuple id）
44.19-44.23
and you have to go back, and go fetch entire pages that have the entire tuple all over
again
那么，你就得回过头去，去获取包含整个tuple所在的整个page
44:25 - 44:25
OK
44:26 - 44:30
So one simple optimization we can do
So，我们可以使⽤⼀种简单优化⼿段是
44.30-44.37
this is the only sort of other than spilling to disk, this is the only optimization we'll talk
about for joins today，It`s for the probe side
除了我们今天讨论join时所说的溢出到磁盘这种优化⽅式以外，并且这种⽅式是应⽤于Probe阶
段的
除了将数据溢出到磁盘这种⽅式外，我们今天要讨论的关于join的优化⽅式，即与probe这块相
关
44:38 - 44:41
So in the build phase
So，在build阶段
44.41-44.42
as we built the hash table
当我们构建了hash table后
44.42-44.45
we can also build an auxilary data structure or a filter
我们也可以去构建⼀个辅助数据结构，或者⼀个filter
44:47 - 44:53
That can determine how abouts determine whether the tuple we're looking for ,it`s even
going to be in the hash table without actually having to look inside of it
在没有查看hash table的情况下，我们可以通过它来判断我们所要查找的tuple是否在这个hash
table中
44:55 - 44:55
So to do this
So，为了做到这点
44.55-44.57
we're gonna we can build a bloom filter
我们可以去构建⼀个bloom filter
44.57-45.00
is everyone know what a bloom filter there is
有⼈知道什么是bloom filter么？
45:01 - 45:02
Who'd who does not know what a bloom filter is
有谁不知道什么时bloom filter的么？
45:03 - 45:03
Okay
我早就预料到这种情况了
45:05 - 45:06
I have backup slides for this for this very reason
好在我对此有所准备
45:07 - 45:10
I can't I I don't know what people's background is for this kind of stuff in algorithms
我不清楚写这个算法的⼈，他们的背景是什么
45:10 - 45:11
so let me teach it very quickly
So，我来快速教你们⼀下
45:12 - 45:15
All right, a bloom filter is a super super useful data structure
Bloom filter是⼀个超级超级有⽤的数据结构
45.15-45.17
you're gonna come across throughout your entire life that's awesome
你⼀⽣中都会⽤到这个数据结构，它真的很棒
45:18 - 45:19
So it's built in the 1970s
So，它是在1970年代所构建出来的
45.19-45.23
the guy invented is named bloom ,and that's why it's called that, right
发明它的⼈叫Bloom，这就是为什么我们这样叫它的原因了
45:23 - 45:25
So it's a probabilistic data structure
So，它是⼀种概率数据结构
45.25-45.26
that's a bitmap
它是⼀个bitmap
45.26-45.32
that can answer set membership queries or it set membership questions
它可以⽤来回答set membership查询（近似成员查询）
45:32 - 45:36
So set membership question would be like does this key exist in my set
So，set membership查询（近似成员查询）可以做这样的事情，即该key是否存在于我的集合
中
45:37 - 45:38
And I'll come back and say yes or no
然后我就会回答Yes或者No
45:39 - 45:40
It can't tell you where to go find it
它不会去告诉你，你哪⾥能够找到你要的数据
45.40-45.44
it's not an index it's a filter this tells you yes or no
它并不是⼀个索引，⽽是⼀个过滤器。它只会告诉你Yes或者No
45:44 - 45:45
But the interesting about it is that
但它令我们感兴趣的⼀点就是
45.45-45.48
it's a probabilistic data structure or approximate data structure
它是⼀个概率型数据结构
45.48-45.50
so could give you actually false positives
So，实际上它会给你false positives（知秋注：假阳性。即会对传⼊值进⾏两次hash，且结果
都为真，但其实两次hash都属于碰撞为真，真实情况并没有存在）
45:51 - 45:53
So it'll never give you any false negatives
So，它永远不会给你任何false negative（知秋注：假阴性。即会两次hash，两次都为假，即没
有发⽣过hash碰撞，但其实真实结果是存在为真的）
45.53-45.54
so he asked it does this key exists
So，⽐如，他问这个key是否存在
45.54-45.56
it always says no
它始终回答No
45.56-45.58
then you know that's actually true
但你就会知道，该key是真实存在的（知秋注：假阴性）
45:59 - 46:03
But if you ask the key exists it may come out and say yes that key does exist
但如果你问这个key是否存在，它也可能会说Yes，该Key存在
46:03 - 46:04
But actually may be lying to you
但实际上它可能对你撒了谎（知秋注：假阳性）
46:05 - 46:09
And then you gotta go actually check something else I see whether that's true or not,
right
那么你就得去查下其他东⻄，来看看这个key是存在还是不存在
46:09 - 46:11
So it only has two operations
So，Bloom Filter只有两个操作
46.11-46.12
the basic bloom filter can only do two things
基本的Bloom Filter只能做两件事情
46.12-46.15
you can insert a key and you go lookup on key
即你可以去插⼊⼀个key，也可以去查找⼀个key
46:15 - 46:16
You can't delete a key
你不能去删除⼀个key
46:18 - 46:19
So here's how it works
So，这就是它的⼯作⽅式
46:19 - 46:20
So it's just a bitmap
So，它就是⼀个bitmap
46.20-46.23
right so say this is a really simple 8-bit bloom filter
So，这是⼀个很简单的8-bit bloom filter
46:24 - 46:29
And so when we want to insert a key like RZA from the Wutang clan
So，当我们想插⼊⼀个key，⽐如我们这⾥插⼊武当派的RZA作为key
46:30 - 46:31
We're gonna hash it multiple times
我们会对RZA进⾏多次hash
46.31-46.34
and then where the hash value would get out
当我们hash后的结果出来后
46.34-46.36
we're gonna modify the number of bits we have
我们会去修改我们所拥有的bit数量
46.36-46.38
and that's gonna give us a location in our bitmap
它就会给我们提供bitmap处的⼀个位置
46:39 - 46:40
So in this case here
So，在这个例⼦中
46.40-46.43
that first hash mod 8 goes to 6
⾸先我们⽤8进⾏取模，然后我们就得到6
46.43-46.44
that goes to that location
它就会落在这个位置（6）
46.44-46.47
and this mod 8 goes to 4
这⾥则是⽤8进⾏取模，得到4
46.47-46.49
for this guy and that goes that location
那么它就会落到这个位置（4）
46:49 - 46:51
And then all we do is just flip that bit to 1
接着，我们所要做的就是将bit翻转为1
46:52 - 46:53
If it's 0 we set it to 1
如果bit上的数字为0，那么就翻转为1
46:54 - 46.56
Now we say we insert GZA
假设，我们现在插⼊GZA
46.56-46.57
same thing
重复和刚才相同的操作
46.57-47.00
he hash it and we get 3 for the first hash function
使⽤第⼀个hash函数对它进⾏hash，我们得到结果为3
47.00-47.01
and we get 1 for the second one
第⼆个hash函数我们所得到的结果为1
47.01-47.05
say anything we jump into the hash table, we flip at the 1
然后我们跳到hash table上，将0翻转为1
47:04 - 47:05
This is super fast
这样做超级快
47.05-47.06
we can do this extremely fast
我们处理起来超级快
47.06-47.08
cuz this all handle out in in CPU caches
因为这些都可以在CPU缓存中搞定
47:09 - 47:12
So now we're going to do a lookup look for Raekwon the chef
So，现在我们要去查找Raekwon这个key
47:13 - 47:14
Right, if we hash this
如果我们对它进⾏hash
47.14-47.15
we get 5 and 3
我们就会得到5和3
47.15-47.19
right it'll 5 points to this one it's 0
5所指向的那个位置的数字为0
47:20 - 47:22
But then it points to this one it's 1
但3所指向的那个位置的数字为1
47:23 - 47:23
So in this case here
So，在这个例⼦中
47.23-47.30
because all the keys all turn all the locations in our bitmap are not 1 ,we know that this is
just cannot exist
因为在我们的bitmap中这两个位置上的数字并不都是1，所以我们知道这个key并不存在
47:31 - 47:33
So we will get false and that's correct
So，我们就会得到正确答案false
47:33 - 47:35
And this way you never get a false negative
这种情况下，你永远不可能得到false negative
47:36 - 47:37
But we may look out for ODB
但我们可能也会遇上查询ODB这种情况
47.37-47.41
,and we hash it 3 & 6
我们对它进⾏hash，得到3和6
47:41 - 47:47
But now this hashes to these two locations that we populating before with RZA and GZA
但我们所hash到的两个位置之前我们已经⽤RZA和GZA填充过了
47:48 - 47:50
But we never actually inserted ODB
但实际上我们从未插⼊过ODB
47:50 - 47:52
So here's we're getting we're getting a false positive
So，这⾥我们所呈现的结果就是假阳性（false positive）（看似对的，实际不对）
47:53 - 47:58
Right, so this is bait the bloom footers coming back and telling us this key exists when it
actually doesn't
Bloom filter就会告诉我们这个key存在，虽然它实际上并不存在
48:00 - 48:00
Okay
48:01 - 48:02
Bloom filter awesome
Bloom filter这个东⻄很棒
48.02-48.05
again they're super useful for a lot of things
对于很多东⻄⽽⾔，它⾮常有⽤
48.05-48.14
and they're super stores like you know you can take a billion key data set, and put it
down to you know a couple couple kilobytes or a bloom filter
⽐如你有⼀个key数量为10亿的数据集，然后就可以将它放在⼀个bloom filter中。
48.11-48.12
yes
请问
48:14 - 48:15
He says can you delete a key, no
他说我们这⾥能对key进⾏删除吗？不⾏
48:16 - 48:17
Okay so what would happen right
Ok，如果删除，那这会发⽣什么呢？
48.17-
so like say going back to sorry
48:23 - 48:24
Right, in this case here
在这个例⼦中
48:27 - 48:30
Right, RZA went to 6 and 4, so we flipped those bits
我们对RZA进⾏hash，得到位置是6和4。So，我们将这两个位置上的0翻转为1
48:31 - 48:33
And then GZA I went to 3 and 1
接着对GZA进⾏hash，然后我们将3和1上⾯的0翻转为1
48.33-48.34
there's bad example
这是⼀个糟糕的案例
48.34-48.37
oh but like we can have another key that hashed me to 1 and 2
但我们可以有另⼀个key，对它进⾏hash，然后得到的位置是1和2
48:38 - 48:39
And now we want to delete it
现在我们想将这个key删除
48.39-48.44
we don't know whether that one is from all right you know we're we're whether we're the
only one
我们不清楚这个key是否唯⼀
48:44 - 48:48
You could turn this instead of it to a bitmap into a counter then you can do that
你可以使⽤⼀个counter来进⾏计数，⽽不是bitmap
48:49 - 48:50
But now that's getting larger
但这样做，体积就会变得很⼤
48:52 - 48:54
We want somebody needs something really fast for us
当我们想使⽤⼀些速度很快的东⻄
48.54-48.55
so that's a bloom filter
So，我们就会使⽤bloom filter
48.55-48.56
yes
请问
48:59 - 48.59
The question is
他的问题是
48.59-49.03
how big do you neutralize the bloom filter to be， depending on the size of the data set
我们如何确定bloom filter的⼤⼩，这取决于你的数据集有多⼤
49:07 - 49:08
Kilobytes if that
如果这样的话，应该是kb级⼤⼩
49.08-49.10
like they don't need to be very big
bloom filter的⼤⼩不需要太⼤
49.10-49.13
and there's this and then you can actually also vary the number of hash functions, you
use
实际上你可以去调整下你所使⽤的hash函数
49.13-49.17
and that'll determine the number of be the your false positive rate
它会去决定你的假阳性（false positive）概率有多少
49:21 - 49:25
The larger the bloom filter the more hash function you use the the better of the false
positive rate
你所使⽤的bloom filter的insert次数越多，hash函数越多，那么我们就会获得假阳性（false
positive）的⽐率越⼤
49:25 - 49:31
You can get it down to being you know I think like ---, I'm gonna god it's like super small
你可以让它使⽤的数据量⼩点（知秋注：其实就是为了减少hash碰撞）
49:32 - 49:36
These are gonna be used for you know all other parts of database systems will come up
we can talk about later on
这也可以⽤在数据库系统中的所有其他部分，这个我们之后会讲
49.36-49.39
but like for our purpose here, we're using them for joins
但出于我们的⽬的，这⾥我们将它们⽤在join这上⾯
49:41 - 49:45
Again and the different mean this any index is that
之所以说它不是索引的原因是
49.45-49.47
this is just telling you what if something exists
它只是告诉你这⾥⾯是否存在着某个东⻄
49.47-49.48
it doesn't tell you where it exists
它不会告诉你这个东⻄在哪
49.48-49.51
where index would tell you it exists ,and here's where to go find it
然⽽，索引会告诉你这个东⻄是否存在，该在哪⾥找到它
49:53 - 49:54
I'm glad I included this slides
我很⾼兴，我放了这张幻灯⽚
49.54-49.57
because I wasn't sure who who has seen bloom filters before
因为我不确定是不是有⼈之前看过bloom filter
49:59 - 50:02
All right, so the optimization we're gonna do with our bloom filters is
So，我们要对bloom filter所做的优化是
50.02-50.08
as we're building our hash table which is gonna be large and could spill a disk
当我们构建我们的hash table时，它会变得很⼤，并且可能会溢出到磁盘
50:08 - 50:10
We'll also build a bloom filter for our keys
我们也会为我们的key构建⼀个bloom filter
50.10-50.13
we're just gonna be super small,I can fit in memory
它的体积超级⼩，我可以将它放在内存中
50:13 - 50:17
And so again as we populate the hash table, we build the bloom filter
So，当我们填充hash table的时候，我们会去构建bloom filter
50:18 - 50:19
And then now when we do our probe
接着，当我们进⾏探测的时候
50.19-50.21
we passed the bloom filter are over to this guy
我们会将bloom filter传到这个join⾥⾯
50:22 - 50:27
And before we probe the hash table when you go probe the bloom filter, that's in
memory that's super fast
在我们对hash table进⾏检测前，我们要通过bloom filter来进⾏检测，因为它是放在内存中，
所以速度超快
50:28 - 50:30
If our key doesn't match anything in the hash table
如果我们的key匹配不上hash table中的任何东⻄
50:31 - 50:32
And then the bloom filter that will say you don't have a match
接着，bloom filter就会说，这⾥没有我们匹配的东⻄
50.32-50.34
and we stop right there
我们就会在此处停下
50:35 - 50:39
And we avoid having to do that hash table lookup which could be disk i/o so go jump to
find the things we want
我们得避免在hash table中进⾏查找，也就避免接下来我们跳转到我们想要的数据所在位置的时
候，所发⽣磁盘的I/O，
50:39 - 50:41
Otherwise we come back to says true
否则，我们就会返回True
50.41-50.43
then we have to go check the the hash table
那么我们得去检查这个hash table
50:43 - 50:47
Because this my producing might might have been telling us something incorrect got
false positive
因为bloom filter所告诉我们的答案可能是错误的，即假阳性（false positive）
50:48 - 50:48
Yes
请问
50:52 - 5055
So her question is for the bloom filter how many hash functions you use
So，她的问题是我们要在bloom filter中使⽤多少个hash函数
50.55-50.57
it depends on how you configure it
这取决于你如何配置
50.57-50.59
my example oh you showed two other ones you could have more
在我的例⼦中，我使⽤了2个hash函数，你可以再来⼀个
50.59-51.01
depends how large you make it to as well
这取决于你的bloom filter有多⼤
51:03 - 51:03
But in general
但⼀般来讲
51.03-51.07
I actually I don't there's open source package sort of bloom filter,
我们可以使⽤开源的bloom filter包
51:07 - 51:12
Yeah I don't know the default is I highlight for yes
虽然我也不清楚默认要使⽤⼏个hash函数
51:16 - 51:18
Yes,question is if the filter his question is
他的问题是
51.18-51.24
could be the case that the bloom fliter has every bit set ,and therefore everything values
to true
我们是否有这种情况，bloom filter⾥⾯每个bit 都设定了，这样不管是什么值，返回的都是True
51.24-51.14
yes
确实可以
51:24 - 51:27
That's where you get the size it you know we do a certain amount
我们可以确定这个bloom filter的⼤⼩
51:27 - 51:31
So like again we'll talk about query planning in two weeks
So，我们会在接下来两周讨论查询计划这块的内容
51:31 - 51:34
But like one of things the optimizer can do
优化器其中能做的⼀件事请就是
51.34-51.37
is try to estimate well here's the distribution the values coming out of this guy
它会去试着预测bloom filter所产⽣的值的分布情况
51:37 - 51:40
Right,and you need that to know how to how to size your hash table anyway
这样你就知道该如何去调整你hash table的⼤⼩
51:40 - 51:44
And you would say all right well I think my key distribution looks like this
假设，我key的分布情况看起来像这样
51:44 - 51:50
And therefore a bloom filter of this size would be how I want to ,you know how to size it
avoid that issue what everything set the one
这样我就可以去调整bloom filter的⼤⼩，以此来避免所有位置上的数字都被设置为1
51:51 - 51:55
But even with a couple kilobytes it's it's still gonna produce pretty good results
但即使它的⼤⼩是⼏kb，它依然能为我们⽣成相当不错的结果
51:57 - 51.57
All right
51.57-52.01
so this is sometimes called sideway information passing
So，这也被叫做横向信息传递
52.01-52.04
the high-end systems can do this kind of stuff
⾼端的数据库系统可以做到这点
52:05 - 52:07
and actually we'll talk about distributing databases later on in the semester
实际上，我们会在这学期稍后的时间⾥讨论分布式数据库
52.07-52.08
but like you can imagine now
但你可以想象
52.08-52.11
maybe A and B are on different different machines or different data centers
A和B可能是在不同的机器或者不同的数据中⼼⾥⾯
52:12 - 52:17
So that rather than me having to go send messages over to the network to go do probe
in the hash join
So，与其让我通过⽹络发送消息来执⾏hash join中的probe阶段
52:18 - 52:22
If I can just send it over you know a couple kilobytes or a bloom filter to the other
machine
如果我可以发送⼏kb⼤⼩的bloom filter给其他的机器
52:22 - 52:26
Then I get what is even more filtering on this side before I start going over the network
那么我就可以在通过⽹络发送消息之前，在这⼀端进⾏过滤
52.26-52.29
like this is a huge win for that
对于我们来说，这就是⼀种天⼤的好处
52:29 - 52:33
But this is this is and the reason why is call it sideway informations passing
之所以将它称为横向消息传递
52:33 - 52:39
Because this is sort of breaking our model for how our queries are gonna our query
operators execute
因为这会将我们查询操作符所执⾏的模型拆开
52:39 - 52:46
Whether they have you know these these discrete channels are just sending data up
from from the child to the parent and not between siblings
它们通过单独的channel将数据从⼦节点传递到⽗节点，⽽不是在兄弟节点间传递数据（知秋
注：在分布式存储系统中索引表相邻节点所属机器进⾏数据传递，在这种情况下，hash索引⽆
须跨节点⾛循序路线，节点内部可能还是会循序遍历查找的，那可是⼀台服务器，够容纳⼀个节
点数据了）
52:46 - 52:47
And this sort of violates that
这虽然违反规则
52.47-52.49
but it's it's a big win
但对我们来说，是⼀种天⼤的好处
52.49-52.50
so this is this is a good idea
So，这是⼀个很好的想法
52:53 - 52:53
Okay
52:54 - 52:57
So let's finish up talking about what we have hash joins that don't fit in memory
So，现在我们来讨论下⽆法在内存中处理的hash join
52:58 - 53:02
So the if everything fits in memory
So，如果所有数据都能放在内存中
53.02-53.07
then we probably wanted to use actually we do we just want to use a linear probing
hashing table
那么我们可能只想去使⽤linear probing hash table
53:08 - 53:13
Right, we can approximate the size of the hash table we need for depending what the
input data looks like
我们可以基于我们数据的⼤⼩来估计我们所需要的hash table的⼤⼩
53:14 - 53:16
And then that fits in memory and that's gonna be really fast
那么它就可以放在内存中，⽽且速度超级快
53:18 - 53:19
The issue though now is
现在的问题是
53.19-53.20
if you have to start spilling to disk
如果你要开始往磁盘上溢出数据
53.20-53.22
now the hash table is gonna be terrible for us
那么对于我们来说，hash table⽤起来就⾮常蛋疼
53:22 - 53:24
Because now it's gonna be random i/o
因为我们就得进⾏随机I/O
53.24-53.25
because we're gonna take every single key
因为我们要去获取每个key
53:25 - 53:28
And we're gonna hash it to some slot location in our hash table
然后，我们得将它hash到我们hash table中的某个slot上去
53:28 - 53:33
And for every single key that could be another you know cache miss ,and another to do
another page page lookup
对于那些缓存未命中的key来说，我们就得到⼀个个page上进⾏查找
53:34 - 53:36
So what we're going to want to do is
So，我们想做的事情是
53.36-53.39
we want to convert that random access pattern
我们想将其转变为随机访问模式（即使⽤hash索引）
53.39-53.44
And our hash table which is the worst thing for us in our database system, and do
something that's more sequential
对于我们数据库系统中的hash table来说，最糟糕的事情莫过于使⽤循序扫描来找到我们要的数
据
53:44 - 53:47
The same idea that we applied for this the external merge sort
我们也将这种相同的思想应⽤到extrernal merge sort中
53.47-53.52
same idea we did for the hash based aggregation when we spill a disk
我们也将这种思想应⽤到基于hash的聚合操作中，当我们将数据溢出到磁盘的时候
53:52 - 53:55
So the technique we're gonna use is called the grace hash join
So，我们所要使⽤的技术叫做Grace Hash Join
53.55-53.57
sometimes it's called the partition hash join
有时这也叫做Partition Hash Join
53.57-53.59
I think the textbook refers it to as the grace hash join
我觉得教科书上写的是Grace Hash Join
54:00 - 54:05
But this is a technique that's developed to do hash joins when things don't fit in memory
但这项技术是为了处理不能在内存中所进⾏的hash join⽽开发的
54:05 - 54:11
So the term grace comes from this project was academic project at the University of
Tokyo in the 1980s
So，Grace这个单词来⾃于东京⼤学在1980年代所开发的⼀个学术项⽬
54:11 - 54:14
They built something called a database, because the grace database machine
他们构建了⼀个叫做Grace的数据库机器
54:15 - 54:17
That project obviously doesn't exist anymore
很明显，这个项⽬已经不复存在了
54:18 - 54:21
But they had a paper that came out at the time as part of this project
但他们写了⼀篇paper作为该项⽬的⼀部分
54.21-54.24
that talked about having to do a hash join when things don't fit in memory
该paper中讨论了当数据⽆法放在内存中，该如何进⾏hash join
54:24 - 54:30
And then for whatever reason that term stuck everyone refers to what I'm going to
describe here as the grace hash join
不管怎样，这⾥我将它称为Grace Hash Join
54:31 - 54:33
Who here has ever heard of the term database machine
在座的有谁听过database machine这个术语
54:35 - 54:38
Database appliance, perfect okay
你听过Database appliance？很棒
54:38 - 54:45
So a database machine or database appliances like specialized hardware that you buy
for a database system
So，数据库机器或者数据库设备其实就是⼀种你为你数据库所购买的定制化硬件
54:46 - 54:49
So think about right you know right now when you when you you want to run Postgres
So，⽐如当你想运⾏PostgreSQL的时候
54.49-54.50
what do you do
你想做什么呢？
54.50-54.54
you go spin up an instance on ec2 ,you go download Postgres
你会去开⼀个EC2实例，然后下载PostgreSQL
54:54 - 55:56
And then you set up and configure it for your instance sides
接着你在你的EC2实例上对它进⾏配置
55:56 - 55:59
Yes you can get you know RDS it's hard to pick configure
没错，你也可以去使⽤RDS，但它配置起来很难
55:59 - 55:05
But in general most people are running you know deploying these databases themselves
on their own hardware
但⼀般来讲，⼤部分⼈会讲他们的数据库部署在他们⾃⼰的硬件上
55:05 - 55:07
So the idea of a database appliance is that
So，数据库设备的思想就是
55.07-55.13
you can buy a hardware from a vendor that's already been set up and tune for a
database system
你可以从供应商那⾥购买硬件，该硬件针对数据库系统进⾏调整
55:13 - 55:15
So you don't worry about how to set anything up yourself
So，你不⽤担⼼你⾃⼰该去如何设置这些东⻄
55:15 - 55:22
So all the high-end companies will sell you very expensive very very nice enterprise
servers,
So，所有⾼端公司都会向你销售这种⾮常昂贵，⾮常nice的企业级服务器
55.22-55.25
that are tuned specifically for our database system
它们都是专⻔针对数据库系统进⾏调优的
55:25 - 55:28
So IBM has this thing called Netezza
So，IBM有⼀个叫做Netezza的东⻄
55.28-55.29
which they sort of killed off
他们现在将它砍掉了
55:29 - 55:34
But they would sell you a rack machine that had Netezza already set up for you
但他们会卖给你⼀套机架，上⾯已经帮你设置好了Netezza
55:34 - 55:37
Clustrix was a startup that came out of AOL
Clustrix是⼀家来⾃AOL的初创企业
55.37-55.40
and then they got bought by Percona last year this year
它们在去年被Percona给收了
55:40 -55:42
They should sell a version of MySQL that would run on our specialized program
他们对外销售⼀种特定版本的MySQL程序
55:43 - 55:47
The most famous one and probably most expensive one is the Oracle Exadata
最著名，也可能是最贵的就是Oracle Exadata
55:47 - 55:49
And this is everywhere
它⽆处不在
55.49-55.54
this is like you buy these huge rack machines that have the Oracle data warehouse
running it inside it for you
如果你要去购买⼤型机架并且上⾯运⾏着Oracle数据仓库
55:55 - 55.58
Like like like we're talking like millions and millions of dollars
那么我们得为此花费上百万美元
55.58-56.02
and there's some places that spend a hundred million dollars a year on running Exadata,
it's very expensive
有些地⽅每年要在Exadata上花1000万美⾦，这超级超级贵
56:03 - 56:10
And so a Database Machine is think of like appliance that you know that's tuned
specifically for a database system
So，正如你们知道的那样，数据库机器是⼀种专⻔针对数据库系统调整的设备
56:10 - 56:15
But then they add in special hardware like custom 86 that are just for running your
database system
但他们会使⽤⼀种定制的x86硬件来运⾏你的数据库系统
56:16 - 56:19
So the grace database machine that they built in the 1980s
So，Grace database machine是在1980年代构建出来的
56.19-56.22
it had special hardware to do hash joins very efficiently
它通过特殊的硬件来⾼效地进⾏hash join
56:22 - 56:25
So in this is this is sort of how people built databases in the 1980s
So，这就是⼈们在1980年代构建数据库的⽅式
56:26 - 56:29
And then that all sort of went out of vogue everybody wants to run a commodity
hardware now
现在这种⽅式早就过时了，所有⼈都想在商⽤硬件上运⾏他们的数据库
56:29 - 56:34
Because by the time it took for you to come up with your custom hardware for your
database system
因为它可以为你提供⾃定义的硬件来供你的数据库系统运⾏
56.34-56.43
And then actually you know favit and actually produce it and manufacture It until
whoever came out with new chips that also ,you know they're already ran faster than
what you started with
这些⼚商会不断推出更好的硬件来提升他们的服务器，这样就⽐你⼀开始时的速度更快
56:43 - 56:44
and you lost all benefits
如果你使⽤你⾃⼰的硬件，那么你就失去了这些福利
56:44 - 56:49
So most database systems run on custom hardware other than like this super high-end
stuff from Oracle
So，⼤部分的数据库系统都运⾏在⾃定义的硬件上，⽽不是像Oracle所提供的这种⾼端设备上
56:50 - 56:53
There are some newer startups that have come out in the last year
去年出现了⼀些新兴的初创企业
56:53 - 56:55
So this is this is a slide from Yellowbrick
这张幻灯⽚是来⾃于Yellobrick
56:55 - 56.58
This is a newer database appliance vendor
这是⼀个新兴的数据库设备供应商
56.58-57.04
that sells specialized flash controllers running on, you know running their particular
database system
它们销售⼀种闪存控制器，上⾯运⾏着它们特定的数据库系统
57:04 - 57:08
But most people don't run this kind of stuff unless you have a lot of money
但⼤部分⼈不会去买这种东⻄，除⾮你是⼟豪
57:09 - 57:12
Okay, so the hash the grace hash join has two parts
So，Grace hash join是由两阶段组成
57:13 - 57:14
In the build phase
在构建阶段
57.14-57.18
we're gonna split up both tables now based on the hash key and write them out of
partitions
我们基于hash key来讲这两张表进⾏拆分为多个分区
57:19 - 57:25
So the regular hash join we only sorted hashed one side ,and build a hash table for that
,and then we probed on the other side
So，在普通的hash join中，我们只对⼀边（可以理解为outer table）进⾏hash，然后为其构建
⼀张hash table，然后我们对另⼀边（可以理解为inner table）进⾏检测是否有符合join条件的
tuple，然后进⾏join
57:25 - 57:31
Now we're gonna do is just split up into two separate hash tables on both sides
现在，我们要将它们拆分为两个单独的hash table（outer table和inner table各⾃有⼀张hash
table）
57:32 - 57:35
And then do a nested loop join for the partitions that match
然后我们对匹配的分区进⾏nested-loop join操作
57:36 - 57:38
I'll show what that looks like in the next slide
我会在下⼀张幻灯⽚中向你们展示这个
57:39 - 57:41
So again on the outer table
So，对于outer table来说
57.41-57.43
we're gonna have a hash table for it
我们会为它构建⼀个hash table
57.43*-57.47
and we're just hash all our values and populate this guy
我们会对outer table中的值进⾏hash处理，并将其填⼊这个hash table
57:47 - 57:48
And so this won't be a linear probe hash table
So，这个hash table不是linear probe hash table
57.48-57.50
this will be a bucket chain hash table
它会是⼀个bucket chain hash table
57:51 - 57:58
Right, because we could have this, we want to have things that hash to the same
location all get mapped to the same partition the same set of pages
因为我们想让相同的数据都hash到同⼀个位置，或者映射到同⼀个分区或相同的page集合
57:59 - 58:01
We don't want something that hashed here landing down here
我们不想让原先应该hash到上⾯分区的东⻄，最后落在了下⾯的分区（知秋注：linear probe
hash table中已有的数据可能会将新数据hash后的位置提前占据，⽽这个已有的数据也不⼀定是
该hash所在位置，所以新数据hash后也是有可能在很底层的位置的，会触发循序扫描，详⻅
15-445 hashtables这⼀集）
58:03 - 58:05
Same thing now on the other side
对于inner table也是如此
58.05-58.07
right hash all the values produce a hash table
对inner table中的值进⾏hash，并填充到⼀个hash table中
58:07 - 58:12
And now we're just gonna number these these these levels as our as our partitions
然后，我们会对每个分区进⾏编号
58:13 - 58:17
Right, so now in the probe phase
So，在Probe阶段
58.17-58.18
when we do our join
当我们进⾏join操作时
58.18-58.20
right after building the hash table
当构建完hash table后
58:20 - 58:26
We're just gonna take all the the buckets within one partition ,and now just do a nested
for loop
我们会取出同⼀个分区中所有的bucket，并对它们使⽤⼀个内嵌for循环进⾏遍历
58:28 - 58:30
Right,again the idea here is that
这⾥的思路是
58.30-58.34
because we've already partitioned them with the hash function at the very beginning
因为我们⼀开始就已经通过hash函数对数据进⾏分区
58:34 - 58:40
We know all the data we could ever need to examine for a tuple that exists and this side
of the of the join
对⽬标分区中已存在的tuple进⾏逐个检测，看是否符合join的条件
58:41 - 58:44
And this bucket can only exist in this side
这个bucket只能存在于这⼀边（inner table那⼀侧）
58:44 - 58:46
All right, can't exist anywhere down here
它不可能存在于这下⾯任何地⽅
58:46 - 58:50
So we don't need it when we scan everything here, we don't need to look at anything else
当我们扫描完这⾥所有数据的时候，我们就⽆需查看任何其他东⻄了
58:52 - 58:55
Right it's sort of the same idea we did and the sort merge join
这⾥我们使⽤的是和sort-merge join相同的思想
58:55 - 58.56
Because we sort of things ahead of time
因为我们将这些东⻄提前排好了序（知秋注：⽽在这⾥，是提前做好了hash分⽚）
58.56-59.02
we know what the boundaries are where there could be possible, you know matches for
tuples on the outer table
那么我们就知道我们outer table中我们所匹配的tuple的边界是什么了
59:04 - 59:07
So if everything fits in memory then this is fantastic
So，如果所有东⻄都能放在内存中，那么就很棒
59:08 - 59:11
Right, because remember I should in the very beginning when we talk about nested loop
join
你们应该还记得我们⼀开始讨论nested loop join时候所说的话
59。11-59.12
if everything that's in memory
如果所有的数据都在内存中
59.13-59.15
then this is the fastest way to do this
那么这就是最快的⽅式
59:15 - 59:18
right there's no magic building hash functions is wasted instructions
这⾥使⽤hash函数其实就是在浪费指令
59:19 - 59:23
All you're doing is doing you know single instruction or a small number of instruction to
do the comparison
你所做的就是通过单条指令或者很少的指令来进⾏⽐较
59.23-59.25
and there's doing fast for loops to these things
我们通过for循环来快速做到这点
59:25 - 59:28
even the compiler could start unrolling this loop as well
即使是编译器也能做到这种循环
59.28-59.28
yes
请问
59:36 - 59:40
yeah yeah so he says collisions can collisions can occur
这⾥是可以发⽣hash碰撞的
59:41 - 59:45
right because two different values that are could hash to the same thing
因为在使⽤同⼀个hash函数的情况下，两个不同的值是可能会hash到同⼀个bucket中
59:45 - 59:52
Well I can just remember human brute-force search for the bucket in memory
Well，我们可以在内存中对这个bucket使⽤暴⼒查找
59.52-59.54
then who cares for those collisions
没⼈会在意这些hash碰撞
59:55 - 59.57
now if everything collides to the same thing
如果所有的东⻄都hash到同⼀个东⻄上
59.57-1.00.00
then this starts spilling it yes then we have a problem
那么这就会开始溢出，我们就遇上了⼀个问题


11-04
1:00:02 - 01:00:06
All right, and we can handle that Through it's called recursive partitioning
我们可以通过⼀种叫递归分区（recursive partitioning）的⽅式来处理这个问题
01:00:07 - 01:00:11
And this is sort of them later this is the technique I was talking about last time with the
hash Aggregation
这种技术我们上次讲hash aggregation的时候讨论过
1.00.11-1.00.13
but we didn't go into details of it
但我们当时并没有对它进⾏深⼊
01:00:13 - 01:00:15
But we can basically recognize that
但我们基本可以认识到
1.00.15-1.00.20
if we start spilling the Buckets within a given partition
在⼀个给定的分区中，如果我们的bucket开始溢出
1.00.20-1.00.23
we start adding more buckets and the chain keeps getting longer and longer
我们就会添加更多的bucket，那么这条链就会变得越来越⻓
01:00:23 - 01:00:23
Because we have collisions
因为我们会遇上hash碰撞的情况
1.00.23-1.00.26
then we can just do another round of partitioning
那么我们就可以做另⼀轮分区操作
1.00.26-1.00.30
and split up into even more buckets do even more sub partitions
我们就会拆出更多的bucket，得到更多的⼦分区
01:00:31 - 01:00:32
And then that way the idea is that
这⾥的思路是
1.00.32-1.00.35
when we do that that that bad nested loop join
当我们使⽤这种糟糕的nested loop join时
1.00.35-1.00.36
everything fits in memory
所有的数据都放在内存中进⾏处理
01:00:41 - 01:00:43
Question is do 1:1 mapping still have yes
他的问题是，我们要进⾏⼀对⼀映射么？对的
1.00.43-1.00.44
next slide
来看下张幻灯⽚
01:00:44 - 01:00:45
Okay let's see how we do this
Ok，我们来看下该怎么做
01:00:46 - 01:00:48
So again this is on the outer table,
So，这个是outer table
1.00.48-1.00.49
you run the hash function
通过hash函数
1.00.49-1.00.53
and we get create a bunch of buckets to be partition
我们就会创建出⼀堆bucket，并对它们进⾏分区
01:00:53 - 01:00:55
So say this one the chain gets super long
So，每当这条链会变得超级⻓的时候
1.00.55-1.00.57
we keep spilling out two new more buckets
我们就会多添加两个新的bucket，并将数据溢出到⾥⾯
01:00:57 - 01:01:06
So if we recognize that there's some threshold to say
so 如果我们觉得这数量有点超出了阈值
1.01.00-1.01.03
well we've gone past some water mark to say
Well，这⾥我们超过了某个⽔位标志，我们会说
1.01.03-1.01.05
we've spilled to too many pages, too many buckets
我们的数据已经溢出到了太多的page和太多的bucket中了
01:01:06 - 01:01:11
We can then just run the another hash function on this guy
我们可以对这个bucket中的数据再进⾏⼀波hash处理
01:01:11 - 01:01:13
And then split up the even more sub pages
然后拆分出更多⼦page
01:01:14 - 01:01:15
All right sub buckets
即sub-bucket
01:01:16 - 01:01:17
So with all the for the first hash function
So，通过第⼀个hash函数
1.01.17-1.01.20
we have a bunch of guys map to partition 1
我们让⼀堆tuple映射到了第⼀个分区中（即画红框的部分）
1.01.20-1.01.21
and then that overflowed
接着，该分区发⽣了overflow的情况
01:01:21 - 01:01:22
So then for partition 1
So，对于分区1来说
1.01.22-1.01.24
we ran another hash function again
我们可以使⽤另⼀个hash函数来进⾏分区
1.01.24-1.01.27
it's the same hash function just a different seed value
我们使⽤的是同⼀个hash函数，但是⽤的hash seed的值不同
01:01:27 - 01:01:28
And then we split out into more more buckets
然后，我们就会将数据拆分到更多的bucket上
01:01:30 - 01:01:36
Then now on the when the we do the probe on the inner relation
接着，当我们对inner relation进⾏检测的时候
01:01:37 - 01:01:40
If we hash to anything that has not been split before
如果我们hash到了⼀个之前没被拆分的bucket
01:01:40 - 01:01:42
So we'd have some metadata to say
So，我们会通过⼀些元数据来表示
1.01.42-1.01。45
well if you're going to hash，you're going to partition 0 or going to partition n
Well，如果我们落到的是分区0或者分区n这⾥
1.01.45-1.01.47
The first hash function is fine
那么使⽤第⼀个hash函数就可以
01:01:47 - 01:01:51
Right, so now I can find exactly what I'm looking for it would cross these pages here
So，我可以在这些page中准确地找到我要查找的东⻄
01:01:52 - 01:01:54
If though if I hash to partition 1
如果我hash到分区1
1.01.54-1.01.56
then I would recognize
那么我就会意识到
1.01.56-1.02.00
oh Well I had split that on the build side for the outer relation
Oh，我已经在build阶段为outer table将分区1进⾏拆分
01:02:00 - 01:02:02
So let me go ahead and run the second hash function
So，这⾥我会去使⽤第⼆个hash函数
1.02.02-1.02.06
and then I'll find out really where I really need to go
那么我就可以找到我需要找的那个分区
01:02:06 - 01:02:10
And he games key you keep doing this over and over again, until you get things to fit in
memory
你不断重复这样做，直到你将所有东⻄都放⼊内存中
01:02:12 - 01:02:13
Because worst case scenario
因为在最糟糕的情况下
1.02.13-1.02.20
you know the the the column you're joining on the attributes you're joining on only has
one value
当你要进⾏join操作的那个列或者属性在表中始终只有⼀个值的话
1.02.20-1.02.22
it's always gonna hash to the same thing
那么它始终会被hash到同⼀个地⽅
01:02:22 - 01:02:25
So therefore recursive partitioning is this waste of time
So，递归分区其实就是在浪费时间
1.02.25-1.02.27
in that case you know you just fall back to the nest loop join
在这个例⼦中，我们只能退⼀步使⽤nested loop join了
1.02.27-1.02.29
because there's no join algorithm that can make that run faster
因为没有其他任何join算法能使这个过程变得更快
01:02:34 - 01:02:34
Simple
很简单吧
1.02.34-1.02.39
and again so we apply the same technique for that the hash based aggregation we
talked about last time
So，我们也将相同的技术应⽤在了我们上节课所讨论过的基于hash的聚合操作⾥⾯
01:02:39 - 01:02:41
Right, if we our buckets get too full
如果我们的bucket太满了
1.02.41-1.02.43
then we just do another round of partitioning
那么我们就会进⾏第⼆轮分区
01:02:45 - 01:02:48
So what's the cost of this of doing this this partition hash join
So，这种hash join的成本是多少呢
01:02:49 - 01:02:55
Well assuming there we have enough buffers to fit everything in memory to do the join
part across partitions
假设，我们拥有⾜够的buffer，并且所有数据都能放在内存中，可以跨分区进⾏join操作时
01:02:56 - 01:02:57
It's going to be 3(M+N)
那么成本就会是3(M+N)
01:02:59 - 01:03:03
So the 3 comes from in the first phase we do the partition
So，这个3是来⾃于第⼀阶段，即我们进⾏分区的时候
1.03.03-1.03.08
it's one pass through m and n the pages of the outer pages and the inner relation
我们要对outer table中M个page以及inner table中的N个page进⾏⼀轮处理
1.03.08-1.03.09
one pass to read
⼀轮读取
1.03.09-1.03.11
and then another round of writes
另⼀轮⽤来进⾏写操作
01:03:12 - 01:03:17
Right, because what we're just for every single page we read on the inner relation，
we're writing another page on the outer relation
因为我们会去读取与inner relation相关的每⼀个page，我们会依据outer relation将结果写到另
⼀个page上（知秋注：因为我们的buffer每次都只会读⼀个分区，这⾥假设buffer可以完全容纳
⼀个分区的数据情况所得到的IO cost）
01:03:19 - 01:03:22
Then the second pass is now to do the join part
接着，第⼆轮我们要做的就是进⾏join
1.03.22-1.03.29
where we're just again just doing a nested loop join on the buckets within the same
partition
我们在同⼀个分区内对⾥⾯的bucket进⾏nested loop join
01:03:30 -01:03:32
And that's just one pass through all the pages as well
我们要对所有page进⾏⼀轮处理
01:03:35 - 01:03:40
So the again the partitioning phase is 2(M+N), probing phase is M+N
So，分区阶段我们需要的成本是2(M+N)次IO操作，Probing阶段则是M+N
01:03:40 - 01:03:43
And then we just put the the numbers to this
接着，我们将数字带⼊
1.03.43-1.03.46
all right now we can do our join in 0.45 seconds
现在我们可以得出，我们的join操作0.45秒就可以完成
01:03:47 - 01:03:53
So the sort merge joined best-case scenario was 0.59 590 milliseconds
So，在最好的情况下，sort-merge join要花的时间为0.59秒，也就是590毫秒
1.03.53-1.03.56
that ,now we're down to 4 and a 50 milliseconds
但现在我们将这个时间降低到450毫秒
01:03:56 - 01:03:57
That's pretty good
这相当不错
01:03:58 - 01:04:00
All right, and this is why the hash join is always gonna be preferable
这就是为什么我们总是更倾向于使⽤hash join的原因了
01:04:04 - 01:04:04
Any questions
有任何疑问吗？
01:04:07 - 01:04:07
Okay
01:04:09 - 01:04:13
So just finish up, as I said most of times about today
So，总结下，正如我今天提到很多次
01:04:14 - 01:04:21 ！！！！！！！
if the database system knows something about, what the what the tables hash tables
are to look like or what the tables are I'm I'm reading into or gonna look like
如果数据库系统知道hash table是怎样的，或者我所读取和查看的表是怎么样的
01:04:21 - 01:04:26
Then it can try to size the the hash tables or the buffers accordingly
那么它就可以尝试去调整hash table或buffer的⼤⼩
01:04:26 - 01:04:30
So everything fits in memory， a linear probe hash table is what we want to use
So，如果所有东⻄都能放在内存中，那么我们就会想去使⽤linear probe hash table
01:04:31 -01:04:32
If we have to spill to disk
如果我们需要将数据溢出到磁盘
1.04.32-1.04.35
then we can use the partition approach with a bucket hash table
那么我们就可以通过bucket hash table来使⽤分区这种策略
01:04:37 - 01:04:39
The if you don't know the size
如果你不清楚表的⼤⼩
1.04.39-1.04.42
then we could fall back and use a dynamic hash table
那么我们就可以退⼀步使⽤动态hash table
1.04.42-1.04.45
like the the linear extendable hash table
⽐如：linear extendable hash table
01:04:45 - 01:04:52
But those approaches are much more heavyweight to do joins than the simple like
bucket hash table or linear probe hash table
但⽐如那些简单的hash table实现（⽐如：bucket hash table或linear probe hash table）来
说，我们使⽤这些⽅式来进⾏join，要付出的成本⾮常昂贵
01:04:52 - 01:04:53
So in this case here
So，在这个例⼦中
1.04.53-1.04.59
because we're going to do a lot of probes and a lot of insertions into our hash table
因为我们对我们的hash table进⾏了⼤量探测和插⼊操作
01:05:01 - 01:05:03
You know it's as simple as usually gonna be better for us
你知道的，越是简单通常越适合我们
01:05:06 - 01:05:10
All right is to summarize the different costs of the things we talked about today
So，今天我们讨论了，在使⽤这些不同算法时所要付出的成本
01:05:10 - 01:05:13
Right, the Simple nested loop join could take 1.3 hours
Simple nested loop join要花1.3⼩时
1.05.13-1.05.18
if we had everything in we use a block nested Loop join then we take 50 seconds
如果我们使⽤block nested loop join，那么我们需要花50秒
01:05:18 - 01:05:22
The index one depends on what the index data structure we're using
Index Nested Loop Join所花费的时间取决于我们所使⽤的索引数据类型
01:05:22 - 01:05:23
So we can't actually give an exact cost for that
So，我们没法给出具体的成本
1.05.23-1.05.26
but then the Sort-Merge join was 0.59 seconds
但是，Sort-Merge Join只花了0.59秒
1.05.26-1.05.30
and then the hash join was was 0.45
接着，Hash Join花了0.45秒
01:05:30 - 01:05:30
Yes
请问
01:05:35 - 01:05:41
So it's questions what senerio would I not know the size of of the outer table
So，他的问题是在什么情况下我会不清楚outer table的⼤⼩（知秋注：其实就是多个操作之间
所产⽣的临时中间表⼤⼩，我们是不清楚的）
01:05:43 - 01:05:48
So in this example other thing I showed today was one query that joins two tables
So，在今天我所展示的⼀个例⼦中，有⼀个查询要对两张表进⾏join操作
01:05:49 - 01:05:51
And we said we were doing a two-way join operator
我们说过，我们使⽤了⼀个2-way join operator
1.05.51-1.05.53
so the operator took two tables produce the output
So，该操作符会通过两张表来⽣成输出
1.05.53-1.05.54
right join them to produce the output ,
对两张表进⾏join，以此⽣成输出
1.05.54-1.05.57
what if I have three tables to join
如果我有三张表要进⾏join呢？
01:05:57 - 01:05.59
So again if I'm doing a two-way join operator
So，如果我使⽤的是two-way join operator
1.05.59-1.06.02
,I join instead of tables A B and C, I want to join them,
假设，我想对A表、B表和C表进⾏join
1.06.02-1.06.05
I join A and B ,and then the output of A and B is now join with C
我会先让A表和B表进⾏join，然后拿到它们的输出后，再将结果和C表进⾏join
01:06:06 - 01:06:13
So unless I can have super accurate estimations on what the output is going to be on
you know for the join on A and B
So，除⾮我能很准确的估算出A和B的join出的结果⼤⼩
01:06:13 - 01:06:15
I may not know how to size things up above
那么我也没法知道该如何去计算这上⾯的成本
01:06:16 - 01:06:16
Now for us
对于我们来说
1.06.16-1.06.20
like it depends on how you do query execution the query processing
这取决于我们如何执⾏查询或者说查询处理
01:06:21 - 01:06:23
We'll talk about this on Monday
我们会在周⼀讨论这个
01:06:23 - 01:06:25
But I could do a pipeline approach
但我可以使⽤流⽔线法(pipeline approach)来做
1.06.25-1.06.28
where for every single tuple output of an operator
对于⼀个operator所⽣成的每个tuple来说
01:06:28 - 01:06:32
And then immediately feeds up to the next operator and do whatever it is I want to do in
that one
当它⽣成后，我们会⽴即将它传给下⼀个operator，然后进⾏任何我想做的处理
01:06:32 - 01:06:33
So now that's the streaming case
So，这就是⼀种流式处理的案例
1.06.33-1.06.40
sort of like you're I'm incrementing building my hash table, you know in the second join I
want to do
我会逐步构建我第⼆次join时要⽤到的hash table
01:06:40 - 01:06:44
Or I could just say take the all the output of my join put into a bunch of buffers,
或者，我可以这样做，将join操作所⽣成的所有输出都放⼊⼀堆buffer中
1.06.44-1.06.46
now I know these size
现在我就知道它们的⼤⼩是多少
1.06.46-1.06.47
,and then I can size everything
那么我就可以调整所有东⻄
01:06:48 - 01:06:50
So in some cases you do in some cases you don't
So，你在某些情况下可以这么做，某些情况下不⾏
01:06:51 - 01:06:55
Furthermore， the more joins you have the worse your estimations get
此外，你join做的越多，你就越难预测I/O成本
01:06:55 - 01:06:58
Because the cost models are always terrible in query optimizers
因为在查询优化中，成本模型⼀直是最蛋疼的东⻄
01:06:59 - 01:06:59
Yes
请讲
01:07:05 - 01:07:06
Question is in yeah
他的问题是
01:07:07 - 01:07:07
In for this one
对于这个来说
1.07.07-1.07.10
it should this be a low case and yes, I'll fix that, thank you
这个C应该是⼩写，我会改这个的，谢谢提醒
01:07:14 - 01:07:14
Okay
01:07:15 - 01:07:19
So the main takeaway for you guys going forth in the real world is that
So，你们从中可以学到并应⽤的是
1.07.19-1.07.27
hash join is always gonna be preferable to everything else， Except if we if we went
things to be sorted as the output ahead of them or things are already sorted for us
那就是除⾮我们所操作的东⻄已经提前做好排序，不然hash join永远⽐其他join⽅式来的更好
1.07.27-1.07.30
in which case the sort merge join is gonna be preferable
不然，那sort-merge join会来得更好
01:07:31 - 01:07:35
But nine times out of ten， if you take like Postgres or any commercial database system
如果你使⽤的是PostgreSQL或者其他任何商⽤数据库系统
1.07.35-1.07.38
from what I've seen they've always pick a hash join
根据我的经历来看，⼗有⼋九，他们⽤的始终都是hash join
01:07:39 - 01:07:48
And this is what sort of separates the high-end expensive or well-written open-source
databases from the you know the the off-brand things
这也是那些⾼端数据库或者是那些写的很好的开源数据库才会有的东⻄
01:07:48 - 01:07:53
Because they're to be able to do both and reason about in the system what's the right
what's the right algorithm I want to use
因为这些数据库系统能够弄清楚我想要使⽤的正确的算法是哪个
01:07:54 - 01:07.57
And then this is the beauty of the relational model and SQL
这就是关系模型和SQL的魅⼒所在
1.07.57-1.08.02
at the same SQL query could then choose either these other either these algorithms we
talked about today
对于同⼀个SQL查询来说，它们可以选择使⽤今天我们所讲的这些算法来进⾏处理
01:08:02 - 01:08:05
And I don't have to go back and change anything in my application to make that work
并且我也不需要回过头去修改我应⽤程序中的任何东⻄来使其⽣效
01:08:05 - 01:08:07
The database systems can do that for me
数据库系统可以为我们做到这点
01:08:09 - 01:08:09
Yes
请问
01:08:16 - 01:08:17
This question is yes question is
他的问题是
1.08.17-1.08.26
are all these things true that I'm talking about here is that true, if you're doing outer joins
or inequality joins or other anti joins things like that
如果你使⽤的是outer join，inequality join或者其他anti join之类的东⻄的时候
01:08:26 - 01:08:38
For inner versus outer join actually outer join I don't think you can do ，Actually outer
and I think you can do everything
实际上，对于outer join来说，我觉得你能⽤它来做任何事情
1.08.38-1.08.42
for inequality joins range joins
对于这种⽬标属性不相等的范围join操作来说
01:08:42 - 01:08:44
You have to use sort merge
你只能将它们⽤在sort merge上
1.08.44-1.08.47
because you there's no locality to values in the hash table
因为你没办法在hash table中确定⼀个精确的值
01:08:48 - 01:08:51
Right I wanna find me all the keys that are less than this other key
如果我想去找到所有⽐另⼀个key⼩的key
1.08.51-1.08.56
I have to use a B+ tree, I have to use a the sort merge join
那我就得使⽤B+ Tree，或者使⽤sort-merge join
01:08:56 - 01:008.59
For anti joins voice if something doesn't equal something
对于anti join来说，⽐如我们要对那些不相等的东⻄进⾏join时
1.08.59-1.09.00
hash join are usually better
通常使⽤hash join会来的更好
1.09.00-1.09.05
actually almost always better
实际上，这⼏乎是最好的选择
01:09:05 - 01:09:05
Okay
01:09:06 - 01:09:09
And actually another another extension to your question is
对你的问题再延伸⼀下
1.09.09-1.09.13
is this still true on single node databases or distributing databases
对于单个数据库系统或者分布式数据库系统来说依然是正确的吗？
1.09.13-1.09.14
yes
确实如此
01:09:16 - 01:09:19
Well we'll cover that in the end of semester ,but in general yes
我们会在期末的时候对此介绍，但总的来讲，没错
01:09:20 - 01:09:23
Because again instead of reading from disk ,I'm reading from the network that's even
worse
因为⽐如从磁盘读取数据⽽⾔，我从⽹络读取数据的话，这样做就会甚⾄更糟糕
01:09:24 - 01:09:30
So these to replace disk i/o from with network IOs and it's still the same
So，使⽤⽹络I/O来替换磁盘I/O，这依然没区别
01:09:31 - 01:09:31
Yes
请问
01:09:35 - 01:09:41
But if it's not skewed, right
如果它分布均匀
01:09:41 - 01:09:43
She actually should be uniform data
实际上这⾥应该是分布均衡的数据
1.09.43-1.09.45
if it's uniformly distributed
如果数据均匀分布
1.09.45-1.09.46
sorting do great for that
那么，排序就对此⾮常有⽤
1.09.46-1.09.48
if it's heavily skewed，then sorting is bad
如果分布不均匀，那么排序就很糟糕
01:09:49 - 01:09:52
But you still have the issue where everything's hashing to the same thing
但你依然会有这种问题，即所有东⻄都会被hash到同⼀个地⽅
01:09:54 - 01:09:57
Okay so now Monday next next the next week
So，下周⼀
01:09:58 - 01:10:02
We will then now just talk about how to compose all these different operators we've
talked about
我们会去讨论该如何将我们所讨论过的这些不同操作符结合起来
1.10.02-1.10.07
and actually run them you know from end n actually it'll execute queries
并去执⾏这些查询
01:10:07 - 01:10:12
So I've alluded this multiple times while the processing models of pushing data up to
from one operation to the next
So，我已经多次提到处理模型在处理数据的时候，会将数据从⼀个operator推送到下⼀个
operator
01:10:13 - 01:10:15
Now we can actually see how that's actually gonna be implemented
下周⼀我们就可以看到实际该如何实现它了
01:10:16 - 01:10:20
And then we're also talked about how the student can be architected to run queries in
parallel
然后，我们也会告诉你们该如何设计出并⾏执⾏查询的架构
01:10:21 - 01:10:23
Right I have multiple cores ,I have multiple threads
⽐如，我有多个Core，有多条线程
1.10.23-1.10.26
how am I going to design a system to run multiple queries at the same time
那么我该如何设计出⼀个能同时执⾏多个查询的系统呢？
1.10.26-1.10.32
and also take the same query, and split it up and run on multiple threads at the same
time
并且该系统能将同⼀个查询任务拆分开来，在同⼀时间通过多线程来完成这些任务
01:10:32 - 01:10:38
Right ,and that'll segue into or that'll lead into a discussion at the end of the semester
when we talk about distributing databases
这个我们会在学期末讲分布式数据库的时候讨论下这个东⻄
01:10:38 - 01:10:39
Because that's essentially what you want to do as well
因为这实际上也是你们想去做的事情
1.10.39-1.10.43
when take a single query and break it up across multiple machines and run that in
parallel
即我们拿到⼀个查询，然后将它变成⼀个个⼩任务，让多个机器并⾏去执⾏这些任务
01:10:43 - 01:10:43
okay
01:10:44 - 01:10:50
all right so we're done today ,enjoy the 88 degree weather outside or I don't know what
that is it's Celsius
好了，散会，享受外⾯的⾼温吧！