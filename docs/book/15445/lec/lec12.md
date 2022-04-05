12-01
12 - Query Execution I
00:15 - 00:16
Okay let's get started
好了，上课吧
00:19 - 00:21
Again give it up for DJ drop tables thank you
有请我们的DJ Drop Table发⾔
00:23 - 00:25
Today's be awesome,you know why
今天很棒，你知道为什么吗？
0.25-0.28
we're tell my databases oh okay
因为我们今天要讲数据库
00:29 - 00:33
All right, so quickly before we get started on today's material
在开始讲课之前
0.33-0.38
again just a reminder for what's due or upcoming for you guys in the course
我要提醒你们下这⻔课要最近要交的作业，以及之后我们要做的事情
00:38 - 00:42
Homework three is due two days from now on Wednesday at midnight
你们周三要交Homework 3，现在你们还有2天时间
00:43 - 00:50
We'll have the final exam ,or sorry midterm exam, in class next week on the 16th
下周周三我们会举⾏期中考试
00:51 - 00:53
And that'll just begin during a regular time
我们会在上课的时候进⾏考试
0.53-0.59
and then I'll do a quick midterm review on the end of next lecture on Wednesday
然后，我会在这周三带你们快速复习下期中考试要考的内容
00:58 - 01:07
And then we'll post like a study guide on the website with all information need to know
about preparing for the midterm later in the week
我们会在这周晚些时候，在⽹站上贴出⼀份学习指南，上⾯有你们所需要了解的关于期中考试的
所有信息
01:07 - 01:12
And then project two it will be due after the midterm on Sunday October 20th
然后，你们要在10⽉20号的时候上交你们的Project 2
01:12 - 01:15
And then immediately after project three will go out
之后，我们就会⽴刻放出Project 3的相关信息
1.15-1.18
but any questions about any of these expectations for you as a student
对于这些计划，你们有任何疑问吗
01:18 - 01:18
Yes
请讲
01:23 - 01:30
His question is will we provide a previous exam ,yes, we will provide a with solutions as
well ,yes
他的问题是，我们会不会为你们提供往年的考题。这个我们会为你们提供，包括答案
01:30 - 01:32
When probably by this weekend
估计是这周末，我会将它放在⽹上
01:34 - 01:34
Yes
请讲
01:37 - 01:41
So I'll cover this one thing yeah you'll have one handwritten sheet of notes
你们可以带⼀张⼿写的笔记
01:41 - 01:48
no copies of the slides，No you know shrunk down version of the textbook every pass
be handwritten
你们不可以带幻灯⽚的副本，也不可以带缩⽔版的教科书，所有的东⻄都得是⼿写的
01:50 - 01:50
Okay
01:53 - 01:57
Again so we'll cover this more detail it'll be up and tuned up and including Wednesday's
class
我们之后会详细讲这个，包括周三那节课
01:58 - 02:01
So everything on from this class and Wednesday's class will be covered in the midterm
next week
So，今天这节课以及周三的那节课上我们所学的内容都是下周期中考试要考的内容
02:02 - 02:03
It's not next Monday yes
不包括下周⼀的内容
02:06 - 02:06
Okay
02:07 - 02:11
So we've been talking about query execution
So，我们已经讨论了查询执⾏
02:12 - 02:19
All right, but we've been mostly focusing on so far how do we actually implement the
operators in our query plan
但我们更多关注的是我们如何实现我们查询计划中的operator
2.19-2.21
how do we do sorting, how to do hash joins so forth
以及我们该如何进⾏sorting和hash join，等等
02:21 - 02:24
So now today we're gonna start putting this all together
So，今天这节课我们就要将这些东⻄串联起来
2.24-2.30
and how do we execute an end-to-end query and produce a final result to the application
然后为应⽤程序执⾏查询并⽣成⼀个最终结果呢
02:30 - 02:33
So again these are all the operators in our query plan
So，这些是我们查询计划中的所有operator
02:33 - 02:37
And we know how for join ，for sort merge hash join ，nested loop join
我们知道，我们该如何进⾏join，⽐如使⽤sort-merge join，hash join或者nested loop join
02:37 - 02:40
It we can do a sorting we know the different ways to do sorts and aggregations
我们知道我们可以通过不同的⽅式来进⾏排序和聚合操作
02:41 - 02:42
So now we're trying to put this all together
So，现在我们试着将这些东⻄串联在⼀起
2.42-2.47
and say ,all right how do we given a query plan how do we actually go ahead and
execute it
那么在⼀个给定的查询计划中，我们实际该如何去执⾏它呢？
02:48 - 02:51
So there's three things we've discussed today
So，今天我们要讨论三件事情
02:51 - 02:55
So the first is that we're gonna talk about how do we actually process the query plan
So，我们⾸先要讲的是我们实际该如何处理查询计划
02:55 - 03:04
Right, and how do we organize the execution flow ,and the flow of data between these
operators in such a way that it could produced a quick result
我们该如何以某种⽅式来组织执⾏流和operators之间的数据流，以此来快速⽣成结果
我们该如何组织这个执⾏流程，让这些operators之间的数据流以某种⽅式传递，以此来快速⽣
成结果
03:04 - 03:09
And we'll just see how to do it in different ways or different environments or different
storage models for the things below us
我们会看到如何以不同的⽅式在不同的环境下或者存储模型下做到这些事情
03:10 - 03:12
Then we'll talk about the access methods
然后，我们会去讨论access method
3.12-3.17
and we've already covered this in bits and pieces throughout the entire semester
其实我们在整个学期中已经对它做过部分介绍了
3.17-3.19
how to do it index scan, how to do a sequential scan
⽐如，该如何进⾏索引扫描和循序扫描
03:19 - 03:22
So now we're trying to understand this in a bit more detail
So，现在我们要试着对它进⾏深⼊了解
03:22 - 03:28
And then we'll finish off talking about how to evaluate the predicate and expressions in
our query plan
然后，我们将结束讨论如何在查询计划中计算条件和计算表达式
然后，我们将结束在查询计划中对条件和表达式的该如何评估这⼀块的讨论
03:28 - 03:30
If we have a where clause
如果我们有⼀个where⼦句
3.30-3.34
how do we apply that where clause to a tuple
我们该如何将这个where⼦句应⽤到⼀个tuple上呢？
3.34-3.37
whether we're doing a sequential scan or an index scan
我们是该去做循序扫描还是做索引扫描
03:38 - 03:42
And again you see the high-level idea what we've done so far is that
从我们⽬前所讲的东⻄来看
3.42-3.48
we have a bunch of bits and pieces now of, how to do sorting, how to do joins ,how to
do index probes
我们现在已经学了点东⻄，⽐如该如何排序，该如何join，以及该如何使⽤索引探针（index
probes）
03:48 - 03:52
And now we're starting to put it all together to actually be able to execute a query
现在，我们要准备将这些东⻄都放在⼀起，以此来做到查询的执⾏
03:53 - 03:58
Okay, all right so the first thing we gotta discuss is the processing model
So，⾸先我们要讨论的东⻄就是processing model（处理模型）
03:58 - 04:04
So a database systems processing model specifies how it's going to execute a query
plan
So，数据库系统中的处理模型(processing model)明确了它会以怎样的⽅式去执⾏⼀个查询计
划
04:05 - 04:06
Right,so in essence
So，本质上来讲
4.06-4.10
it's specifying whether you're going from top to the bottom, bottom at the top
它会去明确，我们是该从上到下执⾏，还是⾃下⽽上执⾏
04:10 - 04:15
And then between each operator what are you actually passing from from one to the
next
接着，在每个operator之间，我们实际该传什么东⻄呢？
04:16 - 04:20
And so there will be three different main up three main approaches we can do
So，这⾥我们主要有三种⽅法
04:20 - 04:27
And they're all gonna have different trade-offs and have different performance
implications for different workloads and different operating environments
对于不同的workload和不同的操作环境，它们会有不同的取舍，对性能也有不同的影响
04:28 - 04:31
So we'll go through each of these one by one and show examples
So，我们会通过例⼦来逐个对它们进⾏讲解
04:31 - 04:33
So the most common one is going to be the iterator model
So，最常⻅的⼀种就是iterator model
04:34 - 04:39
This is pretty much every single database system you know about this is how they
execute queries
你所知道的所有数据库系统都是这样执⾏查询的
04:40 - 04:42
Materialization model is a specialized version of this
Materialization model则是iterator model的⼀个特定版本
4.42-4.47
that is primarily only used for in memory systems
它主要是只⽤在内存型数据库系统中的
04:47 - 04:51
And then the vectorized model，it's based on the iterator model
Vectorized model是建⽴在iterator model之上
4.51-4.54
but you're sending batches of things or vectors of things
但你要往⾥⾯传⼊⼀堆东⻄
04:54 - 04:58
And this will be more useful in analytical workloads ,okay
这种在分析型workload中更加有⽤
05:00 - 05:03
All right, so as I already said the iterator model is the most common one
So，我刚才说过的iterator model是其中最常⻅的⼀种
05:04 - 05:07
I think the textbook refers to this as the iterator model
我觉得教科书将这个叫做iterator model
5.07-5.11
does sometimes I've seen this referred to as the volcano model or the pipeline model
有时候，我看到这也叫volcano model或者是pipeline model
05:12 - 05:14
So the volcano the reason why is call the volcano model is
So，之所以它叫volcano model的原因是
5.14-5.20
because there was an influential system in the late 1980s early 1990s in in academia
called volcano
因为在1980年末期和1990年代早期在学术界有⼀个⾮常具有影响⼒的系统叫做volcano
05:21 - 05:26
That described it at a high level exactly this this approach people were doing this before
它从⾼级层⾯描述了⼈们以前使⽤的这种⽅法
05:27 - 05:32
But this guy sort of laid out the you know the exact way to do this and in parallel which
is what we'll talk about on Wednesday
但它不仅准确的列出了这种⽅法的做法，以及并⾏化的⽅式，关于并⾏这点我们会在周三讨论
05:33 - 05:38
And the volcano system was invented by the same guy Gertz graphy who wrote that
B+tree book that we talked about before
volcano系统是由写了B+ tree那本书的作者所发明的
05:39 - 05:44
It's also the same guy they implement the volcano query optimization model which we'll
talk about next week
并且，这⼈也实现了volcano查询优化，这个我们会在下周讨论
05:44 - 05:45
So this that dude is pretty prolific
So，这位⽼兄真的相当⾼产
05:46 - 05:48
So the way this basically works is that
So，简单来讲，它的⼯作⽅式是这样的
5.48-5.52
for every single operator we have in our in our database system
对于我们数据库系统中的每个operator来说
05:52 - 05:53
So if you want to support joins
如果你想去⽀持join
5.53-5.54
we have a joint operaor, you know
那我们就得有⼀个join operator
5.54-5.56
for a sorting we have a sorting operator
如果是sorting，那我们就得有⼀个sorting operator
05:57 - 5.59
So for all of these
So，对于所有这些operator来说
5.59-6.01
they're going to implement a next function
它们要去实现⼀个next函数
06:02 - 06:04
And what happens is that
这⾥所发⽣的事情是
6.04-6.07
the a parent node will call next on our child node
⽗节点会在我们的⼦节点上调⽤next函数
⽗节点会调⽤我们⼦节点上定义的Next函数
06:08 - 06:12
And that child node will then produce as a return result for that next function
⼦节点会返回这个Next函数的结果
6.12-6.15
the next tuple of debt that parent needs to process
即返回下⼀个⽗节点需要处理的tuple
06:16 - 06:18
So you start to see how this is going to cascade down
So，你会看到这是如何向下级联的
6.18-6.19
so I'll call next on the root
So，我会在根节点处调⽤next
6.19-6.21
, it calls on next child
然后，这个next会调⽤下⼀个⼦节点的next
6.21-6.22
and it calls its next nest child,
接着再调⽤该⼦节点的下⼀个⼦节点的next
以此类推，层层调⽤它下⼀个⼦节点的next
6.22-6.25
it'll keep going down until we hit the leaf nodes in our query plan
它会⼀直往下⾛，直到我们到达查询计划树中的叶⼦节点
06:25 - 06:30
And then we start emitting tuples up the query plan and start processing them,One by
one
然后我们会将tuple向上发送给查询计划，并开始逐个处理它们
06:32 - 06:36
So the reason why they're going to call it the pipe also this is called the pipeline model is
that
So，我们将之称为pipeline模型的原因是因为
06:36 - 06:47
This is going to allow us to for a single tuple to try to ride it up as far as possible up in
the query plan and keep processing it in one Operator after the other，Before we go
back and get the next one
对于⼀个tuple来说，这种模型能让我们在查询计划中尽可能多地使⽤它，即在⼀个operator中
处理完后，然后返回并传⼊下⼀个operator继续处理
06:48 - 06:49
And this is important in a disk based system
对于磁盘型数据库系统来说，这很重要
6.49-6.54
because if it's every single you can only have one page in memory for example
例如，我们在内存中只能放⼀个page
06:54 - 06:57
Then every single pay or every single tuple we go fetch that page
接着，我们要去获取该page上的每个tuple
06:57 - 07:04
We want to do as much work as we can with that tuple while it's in memory ,before we
go back and get the next to work at the next page
在我们返回并对下⼀个page进⾏处理前，我们想要尽最⼤可能来对该tuple进⾏处理
07:04 - 07:12
And so that that series of work or tasks you do in the query plan for a given one given
tuple is gonna be called a pipeline
在⼀个查询计划中，我们对⼀个给定的tuple进⾏⼀系列处理加⼯的过程，我们将它叫做pipeline
07:14 - 07:15
So let's look an overview of how this works
So，我们来⼤致看下它是如何⼯作的
07:16 - 07:21
So against it is that same join we were looking at before on R and S on R.ID = S.id
So，这⾥我们依然使⽤的是上节课⽤过的join案例，我们是根据R.id=S.id来进⾏join
07:22 - 07:24
And then we have a simple predicate where s value is greater than 100
接着，我们还有⼀个简单的条件，即S.value⼤于100
07:25 - 07:29
So normally I don't like to show code in in lectures
So，⼀般来讲，我不喜欢在课上演示代码
7.29-7.30
SQL doesn't count
SQL不算
7.30-7.31
because it's beautiful
因为它在我眼⾥很好看
7.31-7.35
but like but for this we have no choice, right
但在这种例⼦中，我们别⽆选择
07:35 - 07:39
so this is some pseudocode to showing you the different next functions for these
operators
So，此处的伪代码是⽤来向你们展示这些不同operator所使⽤的不同next函数
07:40 - 07:42
Right and essentially they're just for loops
本质上来讲，它们都是for循环
7.42-7.47
that are iterating over the output of their child operator
我们通过它们来遍历它们所属child operator的输出结果
07:48 - 07:51
Right so if you start at the very beginning say say we start at the very root
So，如果我们从根结点处开始
07:52 - 07:53
We call next on the root node
我们在根结点处调⽤next函数
7.53-7.57
right this is this is the this is just a projection
这⾥只是个projection操作
07:58 - 7.59
And so it has a for loop
So，在根结点处有⼀个for循环
7.59-8.04
what's gonna say for every single tuple in my child that I get back from next do the
projection
它所做的就是去遍历我们⼦节点next函数处所返回的每个tuple，并对它们进⾏projection操作
08:05 - 08:08
So at the very beginning when we call next we enter this for loop
So，在⼀开始，当我们调⽤了next函数，我们就进⼊了这个for循环
08:08 - 08:10
And think of it like it's like a iterator
它就像是⼀个迭代器那样
8.10-8.12
where I can keep calling next
我可以在⾥⾯调⽤next函数
8.12-8.15
and if I go down and Traverse and produce an output
如果我向下遍历，并⽣成⼀个输出结果
08:15 - 08:18
If I'm called next again in my operator I know how to pick up where I left off before
如果我在我的operator中再调⽤next函数，我就知道该如何获取我之前拿到的元素
08:19 - 08:23
So at the very beginning we call next in the root it has no tuples
So，⼀开始，我们在根节点处调⽤next函数，此时它⼿⾥是没有任何tuple的
08:23 - 08:29
So the very first thing it has to do is now call next on its child which is the join operator
So，它⾸先要做的就是去调⽤它⼦节点上的next函数，该⼦节点是⼀个join operator
08:30 - 08:33
And the join operator is composed of two parts or two phases as we talked about before
该join operator是由我们之前讨论过的两部分组成
8.33-8.35
it's to say we're doing a hash join
假设，我们要做的是hash join
08:35 - 08:36
We have the build phase
我们会有⼀个build阶段
8.36-8.37
we're going to build the hash table
我们会在该阶段去构建hash table
8.37-8.40
in the probe phase we're gonna probe the hash table
在Probe阶段，我们会对hash table进⾏检测
08:40 - 08:41
So again the very beginning
So，再说⼀遍，在⼀开始
8.41-8.44
I'm calling next in my hash join operator
我会在hash join operator处调⽤Next函数
8.44-8.45
I'm calling next on the Left child
我会在左节点处调⽤Next函数
8.45-8.49
because that's when I want to populate the hash table
因为我想将数据填充到hash table中
08:49 - 08:54
So then this now invokes the function next on this child operator
So，接着它会去调⽤此处child operator处的Next函数
08:55 - 8.56
So now you get into leaf nodes
So，现在我们就进⼊了叶⼦节点
8.56-8.58
now this is again this is our access methods
这是我们的access method
8.58-9.02
this is how we're accessing retrieving tuples from either the index or the table
这就是我们从索引或表中访问并获取tuple的⽅式
09:02 - 09:04
So this just has its own little for loop
So，这⾥⾯有它⾃⼰的for循环
9.04-9.07
that's going to iterate over the relation R
它会去遍历R表
9.07-9.09
and then it's gonna emit a tuple up
接着，它会向上发送⼀个tuple
09:09 - 09:11
So for every emit function
So，对于每个emit函数来说
9.11-9.15
we're passing up a single tuple as the return result for the invocation of next
我们会向上传递⼀个tuple作为调⽤Next函数的返回结果
09:15 - 09:17
And so we'll keep doing this
So，我们会重复这样做
9.17-9.24
the the the the parent operator the join operator would keep calling next on his child but
over and over again ,this thing keeps emitting tuples up
此处的join operator会不断调⽤Next函数，此处的emit也会不断向上发送tuple
09:25 - 09:27
Inside the for loop we're building our hash table
我们在for循环内构建了⼀个hash table
9.27-9.30
and at some point we reach the end we process all the tuples
在某⼀时刻，当我们构建完hash table时，我们就处理完了所有的tuple
09:30 - 09:32
And then we just pass up a null pointer
然后，我们传⼊⼀个空指针
9.32-9.37
and then now the parent knows that I've gotten everything I'm gonna get out of my child,
I never need to go back to it again
此时，⽗节点（指join operator）就知道它已经取完了左⼦节点中的所有tuple，并且它永远不
需要再回过头去取数据了
09:39 - 09:40
again it's called the iterator model
再说⼀遍，这叫做iterator模型
9.40-9.42
because these are just iterators
因为这⾥都是iterator
9.42-9.45
right our cursor is looping through and getting all the tuples one by one
我们通过游标对数据进⾏遍历，并逐个获取所有tuple
09:47 - 09:49
So after we finish on the left side
So，当我们处理完左边这个节点后
9.49-9.51
now we fall down to the operator on the right side
现在，我们向下进⼊右边这个operator
9.51-9.54
same thing we call next one it's child it goes down here
此处我们进⾏相同的操作，这⾥调⽤右节点处的Next函数
09:54 - 09:56
And then we just emit tuples up one by one
然后我们将tuple逐个传⼊join operator
09:57 - 9.58
And then now we do the probe
然后，我们对hash table进⾏检测
9.58-10.03
and then for any tuple that matches in our hash table when we're doing the join
当我们进⾏join时，只要遇上任何匹配我们hash table的tuple
当我们进⾏join时，只要我们的hash table中有任何⼀条tuple匹配上join的条件
10.03-10.06
we emit that up to the parent
我们就会将该join后的结果发送给⽗节点，即此处的根节点
10:06 - 10:07
So this clear chen
So，你们明⽩了吗
10:09 - 10:11
So the reason why again why it's called a pipeline model sometimes
So，之所以我们有时将其称为pipeline模型的原因是
10.11-10.16
is that say on the right side of the tree, we're back here
我们回到这⾥，看下这棵树的右侧，即S表这部分
10.16-10.19
we call next on this guy，he calls next on this guy
我们在join operator处调⽤第四步处的Next函数，第四步中⼜调⽤第五步中的Next函数
10:19 - 10:21
Now we're gonna be a tuple up to here
第五步会向第四步处发送一个tuple
10:22 - 10:26
So we want to have we brought this tuple in memory
我们将这个tuple放⼊内存中
10.26-10.30
we want to do as much work as we can to process the query where that tuples in
memory
当我们在处理该查询的时候，我们想对内存中的这些tuple做尽可能多的处理
10:30 - 10:35
So rather than calling next and getting the next one, we then pass it up here
So，接着这⾥调⽤Next，得到第五步的结果，再将它传到第⼆步中去
10.35-10.38
and let us do do the join after we do the filter
当我们过滤完tuple后，我们来进⾏join操作
10:40 - 10:41
And then if it matches
接着，如果它匹配的话
10.41-10.43
we can then pass it up even farther up the pipeline
我们可以将它传到上⾯的流⽔线中进⾏处理
10.43-10.48
and send it up to our parent with tank man produce it as an output tuple
将它传递到我们的⽗节点处，并⽣成⼀个输出tuple
10:48 - 10:52
And then only ,and then we call next all the way back down and we just do this all the
way over again
然后我们继续⼀路往下调⽤Next，不断重复这些操作
10:52 - 10:58
So this sort of series of operators we can operate in process for a single tuple is called
a pipeline
这⼀系列对单个tuple的处理，我们将之称为流⽔线（pipeline）
11:01 - 11:05
And it's just like we talked about before with when doing joins
我们在之前讲join的时候讨论过这个
11.05-11.06
when we bring something in memory
当我们将某些东⻄放⼊内存中时
11.06-11.10
what we want to do as much work as a possible wallet in memory, before we go off to
the next thing
在我们对下⼀条数据处理前，我们想在内存中尽可能多的对当前这条数据做处理⼯作
11:11 - 11:13
Because the disk i/os are so expensive for us
因为对我们来讲，磁盘I/O的成本实在是太⾼了
11:16 - 11:18
So again the iterator model is the most common one
So，再说⼀遍，iterator model是最常⻅的⼀种模型
11.18-11.24
it's used in pretty much every single database system you can think of they're using the
iterator model
你所能讲出的任何数据库系统都使⽤了iterator model
11:25 - 11:27
And the reason why you do this is
我们使⽤它的原因是
11.27-11.30
because it's sort of a from a human standpoint
从⼈类的⻆度⽽⾔
11.30-11.34
it's it's it's easy to reason about the the program flow,
我们能够很容易的讲出程序的执⾏顺序
11.34-11.38
it's easy to reason about what's gonna be a memory versus not a memory
我们能够很容易的讲出哪些是在内存中完成，哪些不是在内存中完成
11:38 - 11:41
Alright so again this is what pretty much everyone everyone implements
再说⼀遍，所有⼈基本都会去实现这个
11:42 - 11:48
So now some operators cannot are not gonna be able to allow us to do pipelining all the
way up
So，有些操作符不允许我们⼀直进⾏这种流⽔线处理
11:48 - 11:50
So these would be called pipeline breakers
So，这些被叫做流⽔线破坏者（pipeline breaker）
11.50-11.57
so these are the operators that requires to get more data from our children before we
can go on to do the next thing
So，在我们可以去做下⼀个操作前，这些操作符需要从我们的⼦节点处获取更多数据
11:57 - 12:00
So my join example here was a perfect choice, right
So，我这个join案例其实就是⼀个很好的案例
12:00 - 12:03
So if I'm on the left side ,right
So，如果我在左边
12.03-12.05
I go get a tuple from this guy
我就会从第③步处获得⼀个tuple
12.05-12.10
I have to build the hash table, I can't process it up further in the tree
我得去构建⼀个hash table，我没办法在这棵树上继续处理了
12:10 - 12:13
Because I don't know whether it's gonna match with anything on the left side
因为我不清楚它是否能和我左表中随便⼀条tuple发⽣匹配
12:13 - 12:16
So this this would be called a pipeline breaker within this pipeline here
So，在这个pipeline中，这个东⻄叫做pipeline breaker
12:16 - 12:18
So I do the the the scan
So，这⾥我进⾏扫描
12.18-12.19
I build my hash table
构建我的hash table
12.19-12.21
and now I got to go back and get the next thing
现在我就得回过头去，去获取下⼀条数据
12.21-12.22
because I can't continue up the tree with it
因为我不能继续往上⾛（知秋注：因为你构建hashtable这件事没完成，没办法往上⾛）
12:24 - 12:31
So you see the same thing for order by or sub queries anything requires you to have
more more tuples ,before moving up is a pipeline breaker
So，同样的，当你遇上Order By或⼦查询等这些需要你去获取更多tuple的操作的时候，这些操
作被叫做pipeline breaker
12:32 - 12:33
And they're unavoidable
它们是不可避免的
12.33-12.35
you can't not there's no way to get around that
我们没有任何办法去解决这个问题
12:37 - 12:43
You know the other nice thing about the iterator model is that output control like limit
clauses are super easy to do
关于iterator model另⼀件很nice的事情就是，对于输出控制这块。⽐如limit⼦句，我们做起来
就很容易
12:44 - 12:48
Because now you can then say in the parent well I only want 10 tuples
⽐如，在⽗节点处，我只想要10个tuple
12:49 - 12:52
So if I call it next ten times that I get back 10 tuples, I'm done
So，我就会调⽤10次Next，这样我就拿到了10个tuple，这样做就完了
12:53 - 12:56
Right I don't need to go keep calling it again
我不需要继续去调⽤Next来获取tuple了
12:57 - 12:59
So output control is it works it works great with this as well
So，输出控制也能很好地和它⼀起⼯作
13:00 - 13:03
Parallel parallel queries also works really well ,and we'll cover that next class
并⾏查询其实也很棒，我们会在下节课对此进⾏介绍
13.03-13.08
of how to run you know these operators on different threads at the same time ,or
different machines at the same time
我们会去讲该如何通过不同的线程来同时执⾏这些operator，或者让不同的机器同时执⾏这些
operator
13:10 - 13:15
Okay the next approach is a materialization
Ok，我要讲的下⼀个⽅法就是materialization
13:16 - 13:18
The idea here is that
这⾥的思路是
13.18-13.21
instead of having a next function that spits out a single tuple
每次调⽤Next函数时，我们不想让它只给我们返回⼀个tuple
13:22 - 13:26
Each operator dumps out all the tuples anytime invoke
任何时候，当我们调⽤每个operator时，我们想让它给我们返回所有的tuple
13.26-13.32
like all the tuples that's ever going to actually took to emit It comes out all at once
实际上，我们想让每个operator能⼀次将所有的tuple都返回给我们
13:32 - 13:35
Right you don't keep going back and calling next next right
这样我们就不⽤⼀直去调⽤Next函数，来逐个获取这些tuple了
13:36 - 13:39
So of course now the issues gonna be that
So，现在的问题是
13.39-13.44
if we only maybe want ten tuples up in route because they have a limit Clause
如果我们只想要10个tuple，因为这⾥我们使⽤了limit⼦句
13:44 - 13:53
Unless we propagate down into the query plan information about the number of tuples or
X you can need at the top ,will end up passing along way more data than and we actually
needed
除⾮我们将我们查询计划信息向下传播（⽐如我们顶部所需要的tuple数量），不然我们会收到
⽐我们实际所需还要多的数据
13:54 - 14:00
Right, so there's some extra stuff you have to do that you don't have to do in the iterator
model to make sure you don't pass along more data than you need
So，在iterator model中，我们要做⼀些额外的⼯作，以此来确保我们不会传递⽐我们所需更多
的数据
14:01 - 14:05
And then the output could be either a materialized row or a single column
输出结果可以是⼀个materialized row或者是单个列
14.05-14.10
typically in the iterator model it's usually the entire tuple like an entire record
通常情况下，在iterator model中，它所返回的是整个tuple，⽐如⼀个完整的记录
14:10 - 14:11
But in the materialization model
但在materialization model中
14.11-14.13
some systems can actually pass along a single column
实际上，有些系统可以传⼀个列
14:14 - 14:19
But it's all the tuples, so all the values for that for that single column for all tuples
这个列上保存了所有tuple的值
14:21 - 14:23
Right, all right so go back to our example here
So，回到这个例⼦中
14.23-14.26
right now we no longer have Next function
这⾥⾯就不会再有Next函数了
14:26 - 14:32
Right now we have instead a we have this the return value is an output buffer
现在，这⾥我们所返回的就是⼀个output buffer
14.32-14.33
which is like just like a list of all the tuples
它⾥⾯包含了所有的tuple
14:34 - 14:36
So we started beginning very beginning
So，我们从最上⾯开始
14.36-14.38
we call child output and in our root
我们在根节点处调⽤child.Output
14:38 - 14:41
Then this invokes the operator below us
它调⽤了我们下⽅的这个operator
14.41-14.46
same thing as before we go down and get all the tuples on the left side to build our hash
table
这和我们之前的操作⼀样，我们去获取R表中的所有tuple来构建我们的hash table
14.46-14.48
and the result is again all of the tuples
再说⼀遍，这⾥返回的结果包含所有tuple
14:49 - 14.51
We take for loop process everything
我们通过for循环来处理这⾥⾯的每⼀条tuple
14.51-14.52
build hash table
并以此构建hash table
14.52-14.54
then go down the right side
接着，跑到S表处
14.54-15.01
and percolate forward the data that we need going up, writing it and it's all the tuples
将我们所需要的数据（即这些tuple）向上传递
15:01 - 15:01
yes
请问
15:03 - 15:03
what's that
你想说啥
15:06 - 15:06
what is child
哪个⼦节点？
15:09 - 15:12
I so like like it's a tree right
它是⼀棵树
15:12 - 15:14
This is the parent, this is this child
这是⽗节点，这是它的⼦节点
15:15 - 15:17
If you have one the left child or the right child or just one
如果你有⼀个左⼦节点和右⼦节点或就⼀个⼦节点
15:20 - 15:22
And then what one sorry the middle one
你说中间这个？
15:24 - 15:26
What oh yes
15:31 - 15:31
yes
15:34 - 15:36
the join
这个join么
15.36-15.37
right ,it's a tree
它是⼀棵树
15:43 - 15:46
So in this min in this example, right
So，在这个例⼦中
15:47 - 15:50
This is the projection operator ,it has one child,
这个是projection operator，它有⼀个⼦节点
15.50-15.52
it's the join operator
这个是join operator
15:52 - 15:56
But again because everybody's implementing the standard a same API
但因为所有⼈都实现了同⼀标准的API
15:57 - 16:01
There's nothing in this code that knows I'm dealing with the join operator
在这段代码中，我并没有说怎么去处理join operator
16.01-16.05
everyone always am you know gives you back all the tuples you need
它们始终只是把我们所需要的所有tuple返回给我们
16:05 - 16:08
Right it's a one tuple or all the tuples are vector in the Vectorized model
在Vectorized model中，它返回的可能就是⼀个tuple或者是⼀个包含所有tuple的vector数组
16:09 - 16:10
So like I the main takeaways
So，这⾥我们主要学到的是
16.10-16.14
if I implement this standard API where they either have an output function or next
function
如果我要去实现这个标准API，这个标准API中包含⼀个output函数或者next函数
16:14 - 16:17
I can compose these operators in any different way that I want
我可以以我想要的不同⽅式来整合这些operator
16:18 - 16:20
And it's not like a major we write every single time
我们就不需要每次都将这些逻辑重新写⼀遍（知秋注：你要做的只是整合）
16:20 - 16:24
So I can now I could say well I first put up my system, I don't have a join operator
Well，在我组装这个流⽔线的时候，我并没有使⽤join operator
16:25 - 16:26
If I had this standard API
如果我使⽤了这个标准API
16.26-16.28
some later point I could add a joint operator
我可以在稍后添加⼀个join operator
16.28-16.33
and it can just fit in and work with all the other tuples I'm sorry I'll do all the other
operators
我们可以将它放⼊我们的处理流程，它能和所有其他的operator⼀起⼯作
16:34 - 16:35
It's just a standardized API
它就是⼀个标准化的API
16.35-16.44
it allows me to compose query plans by plopping in operators based on what the
QUERY who actually wants to do
它允许我根据查询实际想做的事情来组合操作符，从⽽构成查询计划
16:44 - 16:45
Okay
16.45-16.51
so again the main difference between the iterator model, and the materialization model,
it's it's it's either one or everything
Iterator model和materialization model间的主要区别就是返回⼀个东⻄还是返回全部
16:52 - 16:55
The iterator model is one tuple, materialisation model is everything
Iterator model只返回⼀个tuple，但materialization model则返回全部
16:56 - 16.57
Right so once I call output
So，当我调⽤output的时候
16.57-17.04
and get back on for this operator, and it spits back its buffer of all the tuples, I'd never
go back and ask for more,I have everything I need
我会从这个operator处拿到数据，它会返回给我包含所有tuple的buffer，这样我就不需要回过头
去拿更多的元素，因为我拿到了所有东⻄
17:05 - 17:05
Yes
请讲
17:10 - 17:12
Well these questions is
他的问题是
17.12-17.14
it one atomized tuple or one block tuples what do you mean
你指的是返回⼀条tuple还是⼀⼤块tuples？
17.14-17.16
like it's everything
它返回的是全部
17:20 - 17:21
And in the iterator model sorry
你想说的是iterator model这⽅⾯的？
17:26 - 17:32
So he says wouldn't it be more efficient to implement it where you pay you pass up a
block of tuples, instead of one tuple
如果我们实现API的时候，传⼊的是⼀⼤块tuples，⽽不是⼀个tuple，这样会不会来得更⾼效
17:32 - 17:32
Yes
没错
17:33 - 17:34
That's a vectorized model
这就是vectorized model所⼲的事情
17.34-17.34
that's the next one。
这是我要讲的下⼀个东⻄
17.34-17.35
yes
17:38 - 17:38
Okay
17:39 - 17:44
So the materialization model is fantastic for OLTP workloads
So，对于OLTP workload来说，materialization model⾮常棒
17:44 - 17:51
Because in OLTP workloads what are you doing you‘re going getting one record at a
time or one small number of records at a time
因为在OLTP workload中，我们所要做的就是⼀次获取⼀个记录，或者⼀次获取少量记录
17:52 - 17:56
So the overhead of calling next next next percolating that down
So，这样递归调⽤next函数的开销就会降低
17:57 - 18:00
Right those function calls actually start to matter if everything's in memory
如果这些东⻄都放在内存中，那么这些函数调⽤就会开始变得有点问题
18:01 - 18:04
Right because that's a that's a latch on the CPU
因为CPU上会有latch（知秋注：锁，为了保证事务）
18.04-18.05
and those are expensive
这些代价很⾼
18.05-18.08
but that's a jump and you know in the drive base
它会去跳到硬盘上写数据（知秋注：这样的话，这些函数的阻塞时间会很⻓，也就会阻塞
CPU，如果我们⼀次处理很多数据的话，那如果有跨事务的数据，产⽣死锁也不⼀定，所以，
数据的范围，即数据量越⼩越好）
18:08 - 18:15
So with the materialization model, if we're only shoving up one tuple at a time ,who cares
that's awesome that's super fast
So，在使⽤materialization model的情况下，如果我们每次只向上传⼀个tuple，那么没⼈在意
这种开销。这样做很棒，速度超快
18:17 - 18:20
So this is actually how we implement in VOLTDB
So，实际上这也是我们在VoltDB中的实现⽅式
19.20-18.23
VOLTDB is based on a system I helped build in grad school called Hstore
VoltDB是基于我在读硕⼠时做的⼀个叫Hstore的系统之上所构建的
18:23 - 18:26
Hstore uses the materialization model
HStore使⽤了materialization model
18.26-18.29
and VOLTDB as far as I know still uses the same thing
⽬前为⽌据我了解，VoltDB依然还是使⽤这套东⻄
18:29 - 18:32
Because it's an in-memory database designed for really fast transactions
因为这种内存型数据库是为了快速执⾏事务⽽设计的
18.32-18.34
it doesn't do analytics well
它并不做分析处理这⽅⾯的⼯作
18:35 - 18:37
Right so this is this is a fantastic for this
So，对此这很棒
18:37 - 18:43
MonetDB is a in-memory columnstore system out of the netherlands
MonetDB是⼀个来⾃荷兰的内存型列式数据库系统
18:44 - 18:45
It is a awesome system too,
这也是个很棒的数据库系统
18.45-18.49
it's not for Ana sorry's not for transaction it's for analytics
它⾯向的并不是事务，⽽是分析
18.49-18.53
I don't know why they did this approach,but they do
我不清楚它们为什么使⽤的是这种⽅案（materialization model），但它们确实是使⽤了
18:54 - 19:00 *****
And I had a bunch of other problems that we don't wanna get into
其实我还有其他⼀些我们不想去解决的问题
19:00-19:02
But I think this is a bad idea for this
但我觉得这种⽅案对于MonetDB来说很糟糕
19.02-19.05
I think this is the right choice for a VOLTDB, alright
但对于VoltDB来说这是个正确的选择
19:05 - 19:07
Because again if I'm scanning a billion tuples
因为如果我正在扫描⼗亿条tuple
19。07-19.10
and unless my filter is super selective
除⾮我的filter的过滤条件很严格（粒度很细）
19:11 - 19:13
I could be shoving up a billion tuples from one operator the next
不然我就得将这10亿条tuple从⼀个operator处推送到下⼀个operator处
19.13-19.20
only define up above in my query plan that I didn't need a billion tuples I don't need like
you know maybe 10% of that
我只能在我的查询计划中定义我所需要的tuple数量，你知道的我不需要10亿条那么多，可能只
需要它的10%就够了
19:20 - 19:23
So you end up moving a lot more data than you actually need with this approach
So，在这种⽅法下，最终你所移动的数据量会远超你实际需要的数据量
19:25 - 19:30
All right, so now the his suggestion which is what we're talking about here is that instead
of having
So，现在我们要谈的内容，也就是刚刚他所提出的建议
19:30- 19:37
for every single next invocation I pass along a batch of tuples our vector tuples instead
of a single tuple wouldn't that be more efficient
当每次调⽤Next函数时，如果我传递的是⼀批次tuple⽽不是单个tuple，这样做是不是来得更为
⾼效？
19:38 - 19:38
Yes
没错
19.38-19.39
so this is what the vectorization model does
So，这就是vectorization model所做的事情
19:40 - 19:42
So again for every invocation of next
当每次调⽤Next时
19.42-19.44
we get back a batch of tuples instead of a single tuple
我们所拿到的是⼀堆tuple，⽽不是单个tuple
19:45 - 19:52
And then now we're gonna design our system such that the inner loops those sort of
kernels of these operator implementations
接着，现在我们要去设计我们系统中这些operator实现的核⼼业务
19:52 - 19:59
They are going to be rewritten or designed to operate on a vector of tuples rather than a
single tuple
我们要将这些operator重写，并让它们能够处理多个tuple⽽不是⼀个tuple
20:01 - 20:07
And so the size of the batch that you're going to spit out for every single vocation of
next, can depend on what the hardware it looks like
So，对于每次调⽤Next时所返回的tuple数量来说，这取决于我们的硬件
20:08 - 20:15
So that can be based also on what the with the the actual storage devices are how fast
they are versus sequential i/o
So，这取决于存储设备，⽐如它的速度有多快，它做的是不是循序I/O
20:15 - 20:17
But also can vary on what your CPUs look like
但这也取决于你的CPU是啥
20:18 - 20:19
So we're not going to get into this here
So，我们不会去讨论这个
20.19-20.23
because we didn't we said in this class we weren't going to worry about CPU registers
and cache lines
因为我们说过，在这⻔课上我们不会去关⼼CPU寄存器以及Cache line之类的东⻄
20:23 - 20:27
But if everything fits in memory
但如果所有东⻄都能放在内存中
20.27-20.34
on modern CPUs there's instructions that allow you to do vectorize execution vectorized
operators on a chunk of data at a time
在现代的CPU中有⼀些指令，它们允许我们⼀次对⼀堆数据进⾏多个操作
20:34 - 20:35
Like this is called simd
这叫做simd
20.35-20.41
if you're taking 15-418 or with what are the parallel class six eighteen fourteen
如果你学了15-418，或者你学了15-618（并发编程课：Parallel Computer Architecture and
Programming ）
20:41 - 20:45
So if you now have a batch of data that can now fit you know and y cpu register
So，假设如果你有⼀堆数据，这堆数据能放⼊你的CPU寄存器中
20.45-20.46
with this single instruction
通过这种单条指令
20.46-20.52
you could apply a predicate or evaluate, you know some operator on that data very very
efficiently
你可以很有效率地对这些数据进⾏条件判断或者计算
20:52 - 20:55
So this is why this vectorize approach actually is there's a good idea
So，这就是为什么使⽤这种vectorization model是⼀个好主意的原因了
20:56 - 21:00
So again it this now looks basically like the iterator model
So，简单来讲，这看起来像是iterator model
21.00-21.07
but now in the side of are inside of our kernel functions for operators
但在这些operator的核⼼函数⾥⾯
21:07 - 21:09
We have this output buffer
我们使⽤了这个output buffer
21:09 - 21:16
and then we just check to see whether the output buffer as we go down is larger than
the size we would emit
接着当我们向下⾛的时候，我们要去检查，output buffer的⼤⼩是否⽐我们想发送的数据量更
⼤
21:16 - 21:19
and if so， then we shove back a tuple batch
如果是output buffer的⼤⼩⾜够⼤，那么我们就可以向上返回⼀堆tuple
21:19 - 21:21
but it's still the same sort of model
但这⽤的依然是同⼀个模型
21.21-21.24
or just you know each invokation next goes down to our child
你知道的，我们每次都得往下调⽤我们⼦节点处的Next函数
21:24 - 21:26
a child does some kind of processing
⼦节点会做⼀些处理
21.26-21.27
maybe go to a child to get some data
它可能会从另⼀个⼦节点处获取⼀些数据
21.27-21.30
and once we have everything we need in our batch
⼀旦我们拿到了这个批处理后所得到的所有数据
21.30-21.32
then we shove it up and let it process
那么我们将它向上传递，并对它进⾏处理
21:34 - 21:35
so this clear
So，你们懂了吗？
21:38 - 21:42
okay so the the vectorization model is ideal for analytical queries
对于OLAP来说，Vectorization model是最理想的
21:42 - 21:47
Because what are they doing analytical queries are doing long scans over large portions
of the tables
因为分析型查询所做的是⻓时间对很多个表中⼤部分数据进⾏扫描
21:48 - 21:52
and therefore rather than for every single invokation Next getting tuple,
因此，⽐起每次调⽤Next来获取单个tuple来说
21.52-21.53
now I'm getting a batch of tuples
现在我就拿到了这⼀批tuple
21:53 - 21:57
and the size of the batch can vary depending on where the data is coming from and how
you're going to process it
这⼀批tuple的⼤⼩取决于数据的来源，以及你要如何处理它
21:57 - 22:00
right this is the simply stuff that I talked about before
这个⽐我们之前讨论的内容要简单很多


12-02
22:00 - 22:10
So every major data warehouse built in the last ,I mean the last ten years or so is using
the vectorization model
So，过去⼗年所构建的主流数据仓库使⽤的都是这种vectorization model
22:10 - 22:12
Right, because the performance impact is quite significant
因为它对性能上的影响⼗分显著
22:13 - 22:15
And this is actually what we use in our system that we're building here
实际上，在我们所构建的系统中我们也会去使⽤它
22:18 - 22:19
So this is clear
So，你们懂了吗
=====================================================================
==
22:20 - 22:23
So in general we're going to focus on the iterator model
So，⼀般来讲，我们会将重点放在iterator model
22:23 - 22:25
But there's other ways to do this
但我们也可以通过其他⽅法来做到这点
22.25-22.29
that the vectorization model is sort of easy to see how you can extend the iterator model
我们可以很容易的看出vectorization model其实就是对iterator model的⼀种增强
22.29-22.32
materialization model really only comes up in specialized systems
materialization model只会在特定的系统中出现
22:35 - 22:39
Yes
请问
22:50 - 22:53
You quit your statement is with the materialization model
你想问的是和materialization model所相关的内容
22:53 - 22:56
You're saying that the
22:59 - 23:03 - 23:06 - 23:08
Yes yes yes yes
23:11 - 23:13
Right, so statement is
So，他想说的是
23.13-23.14
if everything's in memory
如果所有东⻄都放在内存中
23.14-23.18
then in materialization model
那么，在materialization model中
23.18-23.25
even for OLAP wouldn't it still be a benefit of not having to call an next next over and
over again ，If you just get back everything
甚⾄对于OLAP来说，如果你能拿到所有数据，那么它就不⽤去反复调⽤next来获取数据了
23:25 - 23:26
Yes
没错
23.26-23.29
but if you're reading large amounts of data
但如果你读取的数据量很⼤
23.29-23.36
and you're not able to push down the the predicates，If your predicates aren't selective
enough
如果你的判断条件的粒度不够细，那么你不能向下传递你的判断条件
⽽且你没有向下传递你的判断条件，或者说你向下传递了，但你的判断条件的粒度不够细
23.37-23.43
meaning the the amount of data you're outputting this is large, like my table is like a
hundred gigabytes
这意味着如果你输出的数据量很⼤，⽐如我表的⼤⼩有100GB
23:43 - 23:47
And I'm now I'm shoving up you know 90 gigabytes of data
然后，现在我要向上推90GB⼤⼩的数据
23:47 - 23:50
You be smart about if you're doing the later materialization which we talking about it a
second
如果你使⽤later materialization这种⽅案，那就说明你很聪明，关于这个我们之后会讲
23.50-23.53
but like if you're copying a lot of data then it sucks
但如果你复制⼀⼤堆数据，那么这就很操蛋
24:03 - 24:056 disk based systems ? database systems ?
Alright,so or make remixing terms or remixing environments,
So，我重新组织下语⾔
24.056-24.12
I'm saying that this works for in memory systems, I think this is not good for disk based
systems
我说过这适⽤于内存型数据库系统，但这不适合于⾯向磁盘的数据库系统
24:12 - 24:15
Right and I don't I don't know of any disk based system actually does this
实际上，我也不清楚哪些磁盘型数据库使⽤这种⽅式
24:16 - 24:19
For in memory so so for disk based systems
So，对于⾯向磁盘型数据库系统来说
24.19-24.24
the vectorized model would be better still
vectorized model依然会来得更好
24.24-24.30
because you know the amount of memory I have to keep intermediate results is smaller
因为我们⽤来保存中间结果的内存量很⼩
24:30 - 24:34
I can't I don't want to have to spill a disk as I'm going up my pipeline
当我将数据传⼊pipeline进⾏处理时，我并不想将数据溢出到磁盘
24:34 - 24:37
So the vectorized model is preferable for OLAP systems
So，对于OLAP系统来说，使⽤vectorized model更为合适
24:39 - 24:42
Your shaking head as if you are confused
我看你摇了摇头，你是不是对这个有点懵逼？
24:48 - 24:51
Okay, all right good
Ok
24:53 - 24:55
All right,the the last thing we wanna talk about
我们想讨论的最后⼀件事请就是
24.55-24.58
and I just we're not gonna focus too much on this
我不会在这上⾯花太多精⼒
24.58-25.00
I just want to be aware of it Is that
我想让你们意识到的是
25:00 - 25:03
in all the processing model examples that I showed
在我⽬前所展示的所有处理模型的案例中
25.03-25.05
iterator materialization and vectorized
iterator，materialization以及vectorized，
25.05-25.07
I showed a top-down approach,
这三种模型使⽤的都是这种top-down⽅案
25:07- 25:10
meaning we start with the root we call next or output on that
这意味着，我们从根节点出开始，调⽤next⽅法来得到输出
25:11 - 25:13
And it percolates that calls down into the tree
它会⾃上⽽下调⽤Next
25.13-25.17
and we start pulling data up to the root
然后我们将数据向上传递到根节点处
25:17 - 25:21
That's the most common way people implement query execution recordings query
processing models
这是⼈们实现查询执⾏或查询处理模型的⼀种最常⻅的⽅式
25:22 - 25:23
But you can go in the other direction
但你可以从另⼀个⽅向来做到这点
25:24 - 25:28
You can start at the bottom, and actually push data up
你可以从底部开始处理，并将数据向上推
25:30 - 25:33
This is a bit rare we did this again in VOLTDB
这其实很少⻅，但我们在VoltDB中使⽤了这种⽅案
25.33-25.36
we're doing this in our new system today
我们也在我们的新系统中也使⽤了这种⽅案
25:37 - 25:38
A hyper out of Germany does this as well
德国的HyPer也使⽤了这种⽅案
25:39 - 25:41
And the reason why you want to do this is that
我们想这样做的原因是
25.41-25.51
now we can be more crappy and more careful about as we move data up to make sure
that, the the tuple it's information that we're processing can sit around in our CPU
caches and registers
当我们向上传递数据的时候，我们得确保我们所正在处理的数据能够放在CPU缓存和寄存器中
25:52 - 25:57
So if you're very careful about your memory placement and your memory allocation, this
way is is preferable
So，如果你对内存位置和内存分配的操作⾜够地细致⼊微，那么这种⽅式更为合适
25:58 - 26:00
But this assumes that everything fits in memory
但这是在所有数据都放在内存中的情况下
26.00-26.04
for so for this reason, for the disk based systems this approach is better
出于这个原因，对于⾯向磁盘的数据库系统来说，第⼀种⽅案来得更好
26:05 - 26:07
This is also a bit harder to reason about as humans
对于我们⼈来讲，这解释起来有点难
从⼈的⻆度来说，这确实有点难
26.07-26.14
because we have the right programs in a way that may not be natural for us as we
normally think about how we write code
因为对于我们来说，这种⽅式和我们平时思考写代码的⽅式⽐起来并不⾃然
26:15 - 26:20
Right, we're this one again from a human standpoint, this is easy understand I call next
on my child it gives me some data
上⾯这种⽅案（ Top-to-Bottom），从⼈的⻆度来看，这很容易理解，当我在我的⼦节点处调
⽤Next时，它就会给我们返回⼀些数据
26:20 - 26:28
This one is actually like carefully crafting the program in such a way that is better for the
CPU ,but is more difficult for humans to reason about
Bottom-to-Top这种编写程序的⽅案对于CPU来说更好，但对于⼈来说，就解释起来就有点难
了
26:29 - 26:31
Again I don't want to go too much details in this
我不想对此过于深⼊
26.31-26.35
this is something if you take the advanced class in the spring we'll cover this
如果你们上春季的⾼级课程的话，我到时候会给你们介绍这个
26:35 - 26:38
The main takeaway for you guys is everyone implements the top one for the most part
对于你们来说，你们主要使⽤上⾯这种⽅案来进⾏实现
26:40 - 26:46
Ok, all right so now let's talk about what's going on in this leaf nodes in our query plan
So，现在我们来谈论下我们查询计划树中叶⼦节点所发⽣的事情
26:46 - 26:48
So again these are the access methods
这些都是access method
26.48-26.56
these are how we're actually actually retrieving data from the database systems from
our tables And then be able to pass them along to our next operators
我们通过它从数据库系统中的表⾥⾯查找数据，然后我们可以随着我们的Next操作符将它们进
⾏传递
26:57 - 26.59
So we've covered basically these already
So，我们已经简单介绍过这些了
so，关于这些我们基本上已经讲过了
26.59-27.02
I just spend little more time and just go over them again
现在我再花点时间再将它们过⼀下
27:02 - 27:05
And then we'll talk about how to do this in with multiple indexes
之后我们会去讨论该如何使⽤多索引来做这些事情
27:05 - 27:06
So in general
So，⼀般来讲
27.06-27.07
there's two approaches
这有两种⽅案
27.07-27.12
you're either reading the data from the index or writing reading from a table with the
sequential scan
你可以根据索引来读取数据或者对表进⾏循序扫描来获取数据
27:12 - 27:16
And the index not always, but could be preferable based on what query you're doing
索引可能不会⼀直有（知秋注：可能没有某些字段创建索引），但基于我们所做的查询，索引这
种⽅案会来得更好
27:17 - 27:19
And then the fallback solution is always the sequential scan
我们的备胎选项始终是循序扫描
27.19-
if I don't have an index can do what I want to do or it has like the right attributes for my
query
如果在我的查询中，我没法通过索引来做我想做的事情
27:23 - 27:25
I just fall back to a sequential scan
那么我就退⼀步使⽤循序扫描
27:25 - 27:26
All right
27.26-27。28
and the multi-index is just an extension of this
多索引则是对此的⼀种扩展
27.28-27.30
it allows it you know set it accessing one index
单索引允许我们通过⼀个索引来访问数据
27.30-27.34
We can access multiple indexes and combine their the results together
我们也可以通过多索引来访问数据，并将结果合并在⼀起
27:36 - 27:41
Okay, so the sequential scan again we've covered this many many times
Ok，关于循序扫描这块，我们已经讲过很多很多次了
27:41 - 27:44
It really is just a bunch of for loops inside of our operators
简单来讲就是，在我们的operator中有⼀⼤堆for循环
27:45 - 27:50
So the scan operator will iterate over a single page in our table
So，scan操作符会对我们表中的⼀个page
27:50 - 27:54
And then for every single page we iterate the tuples of those pages
然后，我们得去遍历这些page上的所有tuple
27:54 - 27.57
And then we can do whatever work we want to do on them
接着，我们可以对这些tuple进⾏我们想做的⼯作
27.57-28.01
,and then we can emit them up to the the next operator as needed
接着，根据需要，我们可以将这些处理后的数据发送给next操作符
28:01 - 28:04
So again the way this is implemented is like a cursor
So，我们通过游标之类的⽅式来实现这点
28:04 - 28:05
If you're familiar with Python
如果你对Python很熟悉
28.05-28.07
they have a yield function for iterator
在iterator中，它们有⼀个yield函数
28:08 - 28:12
It's basically I call this my for loop and I called next on my iterator
简单来讲，就是在迭代for循环中调⽤Next函数
28:12 - 28:15
And then when I get the next page ,I can iterate every single tuple
接着，当我拿到下⼀个page时，我就可以去遍历这个page上⾯每个tuple
28:15 - 28:20
And then I can call some other function or pass this control back to another piece of the
part of the system
接着，我就可以去调⽤其他函数，或者将这些数据传递到数据库系统的其他地⽅
28:21 - 28:23
And then if someone comes back and says， I'll give me the next tuple
接着，如果有⼈来，并说请给我下⼀个tuple
28.23-28.25
I know how to pick up where I left off
我知道我该如何从上次离开的地⽅去拿tuple
28:26 - 28:31
So operators have to maintain the state of where the iterator left off, every single time it
goes off and returns a tuple
So，operator得去维护迭代器结束时的状态（知秋注：即每⼀次返回时，那个tuple所在的位
置）
28:31 - 28:33
So that when we come back we can pick up where we left off
So，这样每当我们⼜要回头调⽤Next的时候，我们就可以从上次离开的地⽅继续处理
28:35 - 28:35
right
28:36 - 28:41
And the typical way this is this is referred to often in systems as cursors
在有些系统中，这通常叫做游标
28:44 - 28:47
So there's a bunch of optimizations, we can do to make our sequentual scans go faster
So，我们可以使⽤⼀些优化⼿段来让循序扫描变得更快
28:48 - 28:49
And we've covered a couple of these already
我们已经介绍过其中的⼏种⼿段
28.49-28.56
right sequentual scans again it's it's it's the fallback option if we don't have an index ,so
we'd have a better way to process the query
So，循序扫描是在我们没有索引或者⽆法以更好的办法来处理查询时所⽤的备胎选项
28:56 - 28.57
But it's slow,
但它的速度很慢
28.57-29.00
especially in a disk based system where every single page could be out on disk
尤其对于磁盘型数据库系统来说，所有的page都是放在磁盘上的
29:01- 29:03
So with there's a bunch of these we've covered already
So，我们已经介绍过其中部分优化⽅法了
29.03-29.04
right we talked about prefetching
我们讨论过了预取（prefetching）
29.04-29.08
this is the double buffer optimization for doing joins
我们会⽤两个buffer来进⾏join操作（知秋注：⽽不是⼀次只读⼀条tuple来进⾏操作）
29:08 - 29:10
We talked about do buffer Pool bypass
我们讨论了buffer pool bypass
29.10-29.15
where instead of polluting our buffer pool cache, we have a little side buffer just for our
thread or a query
我们使⽤⼀个⼩buffer来对我们的线程或者查询进⾏缓存，⽽不是去污染我们的buffer pool缓存
29:16 - 29:19
We'll talk about how to run sequential scans in parallel next class
我们会在下节课讨论该如何并⾏进⾏循序扫描
29:19 - 29:22
So I want to focus on these three down here again
So，今天我想将重点放在下⾯这三种⽅式上
29.22-29.24
some of these we've already covered
其中部分我们已经介绍过了
29:24 - 29:27
But again these are just ways and makes when sequentual scans go faster
但再说⼀遍，这些⽅法可以让循序扫描变得更快
29:27 - 29:32
And the idea that again there's nothing we can do to magically make sequentual scan go
faster
再说⼀遍，我们没有任何能让循序扫描变得更快的⿊科技
29.32-29.37
like the we're limited by the speed of reading data from disk and bring it to memory
我们的处理速度会受到从磁盘中读取数据并将数据放⼊内存速度的影响
29:37 - 29:41
But if there's ways for us to figure out how to do less work
但这⾥如果有⽅法能让我们事半功倍的话
29:41 - 29:43
And that goal that's what we want to do
这就是我们想实现的⽬标
29.43-29.45
and so that's what these optimizations are trying to allow us to do
So，这就是这些优化所试着让我们做的事情
29:47 - 29:57
So zone maps are actually what he brought up a few lectures before about precomputing some information about pages to allow us to figure out whether we actually
need to access them or not
So，我们在前⼏节课的时候提到过Zone Maps，我们通过它来提前计算好关于page的⼀些信
息，以此来让我们弄清楚我们是否需要去访问这些page
29:58 - 30:00
And so the the basic idea of a zone map is that
So，Zone Map的基本思想是
30.00-30.03
for every single page in our database and in our table
对于我们数据库表中的每个page来说
30:04 - 30:09
We'll have some additional metadata we've computed or derived from that page
我们会根据该page来计算或衍⽣出⼀些额外的元数据
30:09 - 30:15
That gives us information on what are the values inside of the page for the given
attribute
它会为我们提供该page中给定属性的相关值的信息
30:16 - 30:19
So let's say that we have a really simple table that has one column
So，假设我们这⾥有⼀个很简单的表，该表只有⼀列
30:19 - 30:22
Right and then within a single page we only have five tuples
在⼀个page中，我们只有5个tuple
30:23 - 30:30
So zone map for this could have the pre-computer aggregate information about the
values within this page for this column
So，对此，Zone Map会提前计算出该page中这⼀列的某些聚合信息
30:30 - 30:32
So the min max avg sum count
即MIN，MAX，AVG，SUM和COUNT这些相关信息
30:34 - 30:37
So now if I query comes along it looks something like this
So，如果我有这样⼀个查询
30.37-30.40
so let's start from table where value is greater than 600
So，我们从表中⼤于600处的地⽅开始找数据
30:41 - 30:44
So without the zone map what do I have to do
So，在没有Zone Map的情况下，我该怎么做呢？
30.44-30.45
it it's a sequential scan
那我得进⾏循序扫描
30.45-30.48
I go grab this page and now I start iterate through every single tuple
我拿到这个page，然后对这个page上的tuple进⾏遍历
30:48 - 30:51
And I evaluate my predicate to see whether I find a match
然后，我对我的tuple进⾏判断，看看是否匹配
然后，我会依据我的条件来对其中的tuple进⾏判断，看看是否匹配
30:52 - 30:54
But instead if I have a zone map
但相反，如果我使⽤了Zone Maps
30.54-30.57
I can like to say well I know I think I need to access this page
我就可以说，我觉得我需要去访问这个page
30:57 - 30.58
Let me go look at the zone map
让我先看下Zone Maps
30.58-31.01
I'm looking for values greater than 600
我现在要找的是⼤于600的所有值
31.01-31.05
while I go check and say well the max value for this for this column and this page is 400
当我去查看Zone Maps的数据时，我看到该page上这列的最⼤值为400
31:07 - 31:11
So I know there's not to be any value or any tuple with a value greater than 400
So，这样我就知道这个page上没有任何⼀个tuple的值是⼤于400的
31:11 - 31:14
So therefore nothing in my page will ever match my predicate
So，这个page中没有任何符合我条件的tuple
31:15 - 31:17
So I just skip looking at the entire page entirely
So，于是我就可以跳过这整个page了
31:19 - 31:22
Right, so now you say alright where's the zoom map actually stored
So，现在你们可能会问，Zone Map是保存在哪⾥的
31:23 - 31:25
Well some systems could pack it inside the page itself
Well，有些系统会将Zone Maps保存在该page中
31.25-31.27
so you should have to bring the page in
so，这种情况下，你还是要将这个page读取到buffer中
31:27 - 31:30
But at least now you're not iterating over every single tuple
但⾄少你就不⽤去遍历这每个tuple
31:31 - 31:33
Other systems could actually store these zone maps as separate pages
其他系统可能会将这些Zone Maps保存在单独的page中
31:34 - 31:39
So I'll have like a zone map block or zone page that has a bunch of zone maps for
different pages
So，我会有⼀个专⻔的Zone map block或者Zone page，上⾯保存了不同page的Zone Map
31:39 - 31:42
So maybe that sticks around a memory more like more often
So，可能这些东⻄更多会放在内存中
31:43 - 31:46
And then that I just jump to that page check the zone map
接着，我就跳到这个page，然后检查下Zone Maps中的信息
31.46-31.50
and then decide whether I want to go to the next page or go actually access the
underlying page
接着，通过它来判断我是否该去下⼀个page或访问这个page
31:52 - 31.53
So I use the term zone maps
So，这⾥我使⽤的术语是Zone maps
31.53-31.57
because that's what that's the common term
因为这是⼀个常⻅的术语
31.57-32.01
I forget whether it was NETEZZA or Oracle that invented this term
我忘了是Netezza还是Oracle发明了这个术语
32:01 - 32:05
But Oracle if you go google Oracle's zone maps, we are a bunch of documentation for
this
但如果你⽤⾕歌去搜索Oracle Zone Maps，你可以看到很多相关的⽂档
32:06 - 32:08
I don't know whether that's a trademark term
我不清楚这是不是某个数据库所特有的名词
32.08-32.09
because other systems don't use that term
因为其他数据库系统并不使⽤这个术语
32:10 - 32:14
But it's found again pretty much every single major data warehouse today
但现如今每个主流数据仓库都使⽤这个东⻄
32:14 - 32:18
Because the performance benefit is quite significant, because disk is so so slow
因为它给性能带来了显著的提升，毕竟磁盘的速度真的很慢
32:20 - 32:25
So you can imagine a bunch of different types of queries you could do ,just based on
these kind of these kind of statistics
So，基于这些统计数据，我们就可以想象出我们能做⼀⼤堆不同类型的查询
32:26 - 32:28
What's one issue we have is Zone maps
对于Zone Maps这块，其实我们有⼀个问题
32:32 - 32:34
Maintain that exactly right
那就是该如何对它进⾏维护
32:34 - 32:37
So anytime I update something in here
So，每当我更新表中的数据时
32:38 - 32:40
Then I got to make sure that this is actually in sync
接着，我就得去确保这些是同步的
32.40-32.42
because I don't want to have a false negative
因为我不想遇上假阴性这种问题
32.42-32.45 ！！！！
I don't want to look my Zone map ,and say I don't have a match when I actually I do
我想去查看我Zone Maps中的信息，并说，当我进⾏查询的时候，我并没有找到匹配我条件的
tuple
我不想做查看Zone Maps的时候得到这样的信息，即这些信息告诉我没有匹配的tuple，但实际
情况是它所对应的tuple集合是有符合条件的，只不过这个Zone Maps的信息过时了
32:46 - 32:52
So these are typically all these systems I'm showing up here,these are running for the for
the analytical stuff
So，这⾥我所展示的这些是数据库系统中通常所做的事情，它们是⽤来处理分析型任务的
32:52 - 32:58
But you would not want to use as zone maps OLTP, because again you have to maintain
them all the time that's gonna be super expensive
但你不会想在OLTP中使⽤Zone Map，因为你总是得去维护这些Zone Maps，这样做的成本太
昂贵了
32:58 - 33:01
But for analytics where it's usually like write once read a lot
但对于OLAP来说，它们通常是写少读多
33:02 - 33:03
Then zone maps are a big win
那么使⽤Zone Maps就会很好
33.03-33.06
and this is why all the major systems actually support those
这就是为什么所有主流的数据库系统都⽀持这个的原因
33:09 - 33:11
Alright,so the next optimization is something we talked about before
So，其实我们之前已经讲过这个优化⼿段了
33.11-33.15
I'll make sure everyone understands it and for the detail
我得确保你们所有⼈都理解并掌握它的细节
33:15 - 33:16
And this was late materialization
它叫做late materialization
33:18 - 33:19
So for a columnstore system
So，对于⼀个列式存储系统来说
33.19-33.28
we actually can delay or not or avoid having to propagate data from one operator to the
next
实际上，我们可以延迟将数据从⼀个operator传播到下⼀个operator
33:28 - 33:33
And the simd is passed along offsets or column IDs to allow us to go get the actual data
we need later on
SIMD会将这些offset值或者column id传给我们，并允许我们稍后去获取我们所需的数据
33:34 - 33:36
Right,in a row store system
在⼀个⾏式存储系统来说
33.36-33.39
typically the operator the output will be the actual entire tuple
通常来讲，operator所产⽣的输出就是这整个tuple
33.39-33.43
because I've already went to disk to get the page it has that tuple
因为我得跑到磁盘上去拿到包含该tuple的这个page
33:44 - 33:48
I might just pass along that entire tuple up the query plan tree
我得将这整个tuple发送到查询计划树上
33:48 - 33:50
And not have to go ever go back and get get more data
并且我们⽆需回过头去并获取更多数据
33:51 - 33:53
But in a column store
但在列式存储中
33.53-33.55
to go get all the data for a single tuple
为了获取单个tuple的所有数据
33.55-33.57
that's a bunch of different reads,
我们得去做⼀⼤堆不同的读操作
33.57-34.00
because the data is broken up across different columns
因为这些数据被拆散到不同的列中去了
34:00 - 34:04
And therefore I want to avoid that as I want to delay that for a long as possible
因此，我想要尽可能推迟这些读操作
34:05 - 34:08
So let's say we doing a join of two tables foo and bar
So，假设我们要对foo和bar这两张表进⾏join
34:08 - 34:11
And say the foo table has three columns A B and C
假设foo表中有a，b和c这三列
34:12 - 34:18
So my query plan in my pipeline over here as I'm processing on the left side of my join
So，我们的查询计划，在我们这⾥的处理流⽔线中，当我处理join左边的这个foo表时
34:19 - 34:23
Well the first thing I need for this first the filter operator I only need a column
Well，⾸先要做的就是我要处理这个filter operator，我只需要a这⼀列
34:23 - 34:30
So I'll just pass along this iterator here, we'll just pass along blocks or pages from from
the a column
So，这⾥我们只需要传⼊a列所在的block或者page就⾏
34:30 - 34:31
Then I do my processing
接着我对它们进⾏处理
34:32 - 34:34
But then I know that in my query plan
但接着我知道，在我的查询计划中
34.34-34.36
I don't need a column ever again
我之后不再需要a列了
34:37 - 34:38
Because I'm doing the join of B
因为我是对b这⼀列进⾏join
34.38-34.40
I'm doing my aggregation on C
并对c列进⾏聚合操作
34:40 - 34:42
So I don't need to pass on a
So，我不再需要传⼊a的任何东⻄了
34:42 - 34:50
So instead I'll just pass along offsets Of the the tuples that passed or passed the
predicate
So，相反，我只需要传递这些我们所传递的tuple的offset值或者判断条件即可
so，相对的，我只需要将这些tuple对应的offset值或者将判断条件上传即可（知秋注：因为该
列中的数据最终其实并不需要的）
34:51 - 34:52
So now inside of the join operator
So，在join operator⾥⾯
34.52-34.56
I can go get the B column to complete the join
我可以拿到b列相关的数据，以此来完成join
34:57 - 35:00
Then the same thing I don't know I know I don't need B up above
接着，和之前⼀样，我知道我上⾯的处理不需要⽤到b列
35:00 - 35:02
So I just pass along the offsets
So，我只需要传递这些offset值
35.02-35.04
and then when I compute the average
接着，当我计算平均值的时候
35.04-35.06
then I go off to disk and get C
那么我就得从磁盘中获取c这⼀列
35.06-35.09
and then now I pass along the final result
现在我就可以得到最终结果
35:11 - 35:12
Right, the idea here is that
这⾥的思路是
35.12-35.17
we can be smart about identifying what data we need at different parts of the query plan
我们可以智能地识别出在处理该查询计划时，它不同部分我们所需要传⼊的数据
35:18 - 35:22
And only pass along offsets allow us to go back and get the rest of the data we need at
a later point
然后，我们只需要传⼊offset值，这允许我们之后回过头去获取我们所需要的剩余数据
35:27 - 35:31
All right, the last thing to talk about is heap clustering or clustering index
All right，最后我们要讨论的就是heap clustering或者clustering index（聚簇索引）
35:31 - 35:33
Again we've already talked about this before
这个我们之前已经讨论过了
35:34 - 35:41
This is just allowing us to scan along the leaf nodes of an index ,and go fetch the data in
just sequential order
这允许我们沿着索引的叶⼦节点进⾏扫描，并按照顺序获取数据
35:43 - 35:48
Because we know the tuples are gonna be order in our pages in the same way that the
ordered in our in our index
因为我们知道在我们的page中这些tuple都是按顺序排列的，
因为我们知道这些tuple所在的page是按照索引的顺序排列的
35:49 - 35:52
Right, so there's not much else to say about this with this one we've covered already
So，这个没啥可说的，我们之前已经介绍过了
==========================================
35:55 - 35:57
So let's talk right now how we're gonna do index scan
So，现在我们来讨论下该如何进⾏索引扫描
35:59 - 36:03
So the for the basic idea of an index scan is that
So，索引扫描的基本思路是
36.03-36.06
we want to be able to identify ,what index we have on our table
我们想去识别在我们的表中有哪些索引
36.06-36.09
that is going to allow us to quickly find the data that we need
以允许我们能够快速找到我们所需要的数据
36:09 - 36:13
And and limit the amount of useless work we have to do or wasted work we have to do
并限制以防我们去做那些⽆⽤或浪费的⼯作
36:14 - 36:18
So again it's all about reducing the selectivity of the data that were processing
这都是为了减少这些正在处理的数据的选择性
这都是为了减少在处理数据过程中对数据不必要的选择筛选
36.18-36.21
so that we passing along less data from one operator to the next
So，这样我们就可以传递更少的数据给下⼀个operator
36:22 - 36:24
So how to pick one index is super hard
So，如何选择索引其实是很难的
36.24-36.26
because it depends on a bunch of different things
因为这取决于⼀⼤堆不同的东⻄
36:27 - 36:29
It depends on what attributes we have in our index
它会取决于我们是在哪些属性上建⽴索引
36.29-36.32
what attributes are referencing in our query
以及我们在我们的查询中⽤到了哪些属性
36:32 - 36:34
Depends on what the values of those attributes actually look like
也会取决于这些属性值实际是什么
36.34-36.37
whether they're super selective for our query, I'm not selective
对于我们的查询来说，它们是否具备选择性（知秋注：选择这些属性来做索引在查询过程中是否
更有优势）
36:37 - 36:39
Depends on what our predicates look like
这取决于我们的判断条件
36.39-36.42
are they less than greater than equals to not equals to
是⼩于还是⼤于，或者等于以及不等于
36.42-36.44
that determines what whether we use index
这也取决于我们使⽤什么样的索引
36:45 - 36:48
And then of course then depends whether it's a unique index or non unique index
Of course，还会取决于它是唯⼀索引还是⾮唯⼀索引
36:49 - 36:52
So I'm gonna go through a really high-level example of how we pick an index
So，我会通过⼀个⾼级案例来向你们展示我们该如何选择索引
36.52-36.54
,but we'll go in this way more detail next week
但我们会在下周对此进⾏深⼊
36:55 - 36:57
Because this is what the query optimizer does for us
因为这是查询优化器为我们所做的事情
36:57 - 36.59
Right, I have a select statement
如果我有⼀个select语句
36.59-37.00
I don't specify what index I want to use
我不指定我想使⽤的是哪个索引
37.00-37.09
I want the optimizer inside the database system to say oh these are my choices for my
indexes, here's the best one based on what your queries trying to do
我希望数据库系统中的查询优化器这样说，Oh，这⾥有这些索引可供你⽤于查询，对于我们所
做的这个查询来说，选择这个索引是最佳选择
37:09 - 37:12
So again we'll cover this in more detail and next week
So，我们会在下周对它进⾏深⼊介绍
37:13 - 37:15
But let's just look through a really simple example
但我们来看⼀个简单案例吧
37:17 - 37:18
So say we have this simple query like this
So，假设我们有这样⼀个简单的查询
37.18-37.28
where we want to get the all the students from from the students table that are under
the age of 30 That are in the CS department and from come from the US
我们想去从student表中获取所有30岁以下的CS专业的美国学⽣信息
37:29 - 37:30
And say for this particular database,
在这个数据库中
37.30-37.32
we only have two indexes
我们只有2个索引
37.32-37.35
we have index on age, we have index on on Department
我们在age和dept上都建⽴了⼀个索引
37:36 - 37:39
So for this particular query what index we want to use yeah
So，在这个查询中我们想去使⽤哪些索引呢
37.39-37.44
depends on what the values of the data actually looks like in our table
这取决于我们表中这些数据的值⻓啥样
37:45 - 37:46
So in the first case
So，在第⼀个例⼦中
37.46-37.56
say that we have we have a hundred tuples and 99 other students are under the age of
30 which is probably true for this university
假设我们有100个tuple，其中有99个30岁以下的学⽣。这对于⼤学来说可能很正常
37:56 - 38:00
But then there's only two people in the CS department just not true for us ,but assume
that's the case
但接着，这⾥⾯只有2个CS系的学⽣，对我们来说不正常，但我们就这样假设
38:00 - 38:06
So what's the best that's index to use for this ,age is your index, or sorry age or
Department
So，哪⼀个索引才是我们的最佳选择呢？是age还是dept
38:07 - 38:10
Department right, because I'm only gonna get two tuples to match for us
dept对吧！因为我们只需要找到这两个匹配的tuple就⾏了
38:11 - 38:15
If I go with this if I go for the the the age one
如果我使⽤age作为索引
38:15 - 38:17
Then my index scan is essentially useless
那么，本质上来讲，我的索引扫描所做的就是⽆⽤功
38.17-38.22
because I'm just gonna find all the the records I would have found anyway through a
sequential scan
因为我就要通过循序扫描来找到所有记录（知秋注：因为拿到的cs的学⽣总共就俩，哪怕循序
遍历判断下根本消耗不了什么）
38:23 - 38:26
And now I paid the penny up traversing the index when I didn't need to
我就得为这些（我所不需要遍历的）索引进⾏遍历⽽付出代价
38:27 - 38:32
Again if we just reverse this and say well there's 99 people in CS department and only
two people on an age of 30
如果我们将实际情况转变⼀下，即有99个CS系的学⽣，只有2个学⽣的年纪⼤于30
38:32 - 38:38
Okay now the the the age index is better for us because that's more selective
那么使⽤age作为索引对我们来说，更为合适。因为它更具选择性
38:38 - 38:41
So at a high level this is what we're trying to do in our index scan
So，从⾼级层⾯来看，这就是我们试着在索引扫描中做的事情
38:41 - 38:45
We're trying to avoid having to go read data we don't we don't necessarily need
我们试图避免读取我们不需要的数据
38:46 - 38:50
And that includes also you know the cost of going actually probing the index
这也包括了我们去探测索引时的成本
38:50 - 38:55
So if the data system can recognize that well I'm not going to be very selective for this
index
如果数据库系统能够意识到，这个索引并不具备很⾼的选择性
38:55 - 38:59
And I'm gonna pay the penalty of traversing that index or doing a lookup in the hash
table for that index
如果我⽤了这个选择性不⾼的属性来做索引，那我就得为遍历索引或者在hash table中查找索引
⽽付出代价
39:00 - 39:02
Then it's just better to do a sequential scan
那么在这种情况下，使⽤循序扫描会来得更好
39:03 - 39:07
Again well reason about how to actually make this decision more next week
再说⼀遍，我们会在下周对如何选择索引这块进⾏深⼊介绍
39:09 - 39:12
But what I do want to focus on though is
但我关注的重点是
39.12-39.16
what happens if both indexes are a good idea
如果这两个索引的效果都差不多，那么会发⽣什么呢？
39:16 - 39:18
Right we could be stupid as flip a coin and say alright I'll just roll the dice
我们可以会愚蠢地通过抛硬币或者掷⾊⼦来决定，并说
39.19-39.21
and see that you know I'll pick the aged one that's that'll be good enough
我选age来进⾏索引扫描，因为它很棒
39:22 - 39:23
But the database system can recognize that
但数据库系统可以意识到
39.23-39.27
both of them are actually helped me a lot and be very selective
实际上，这两个索引对我帮助都很⼤，并且极具选择性
39:28 - 39:33
Then I'd want to do probes on both of them get back their results
那么我就会想使⽤这两个索引进⾏索引扫描，并获取它们的结果
39:33 - 39:37
And then combine them away in a certain way based on what the query is actually trying
to do
然后基于查询实际所要做的事情，我们通过某种⽅式将它们的结果合并在⼀起
39:38 - 39:43
And then use that combined result then figure out what data actually matches or find the
data that I'm looking for
接着通过这个结果来找到实际匹配的数据或者我要查找的数据
39.42-39.42
yes
请问
39:46 - 39:48
question is what find both the values，what do you mean
他的问题是如何找到这些值，你指的是什么？
39:52 - 39:53
How we decide what
我们该如何决定什么？
39:56 - 39:57
In this example both
在这个例⼦中？
39:59 - 39:59
Previous one
前⼀张幻灯⽚？


12-03
40:00 - 40:05
Yes her hats so in scenario 2 which one have you excited pick
So，在场景2中，我们该选哪个索引呢？
40:16 - 40:25
Convert 30 into how yeah like yeah we will cover this next week we have these
我们会在下周介绍这个
40:26 - 40:28
Yeah like what we have an approximation of this
我们会对此进⾏估测
40:29 - 40:31
It's not always accurate
评估结果并不是始终准确
40.31-40.31
that can lead problems
这会导致出现⼀些问题
40.31-40.34*
but let's assume we have we know something
但假设我们知道点信息
40:34 - 40:37
This is like in this extreme example it's super obvious
在这个极端的例⼦中，这点很明显
40.37-40.39
we would know that like there's two people in CS Department
我们知道这⾥⾯有两个CS系的学⽣
40:39 - 40:42
We would know that this is like this is an outlier
我们知道这是⼀个离群值(知秋注：即⼀下⼦就能看出来是不合群的)
40.42-40.45
and that this is it's the other way do they have a hitter
⽽这个我就得选择另⼀个索引了（知秋注：这⾥是两个场景的对⽐）
40:45 - 40:46
We even know this one's super common
我们知道这种⽅法很常⻅
40.46-40.48
so we would choose that or not choose that,yes
So，我们会去选择这种⽅案，⽽不是那种⽅案。请问
40:53 - 40:58
This question is in the index scan always better been a is the index scan always better
than the sequential scan ,no
他的问题是，索引扫描是不是始终⽐循序扫描来得更好。其实并不是
41:06 - 41:07
Yeah but we'll cover that in a few more slides yes
我们会在下⾯⼏张幻灯⽚中讲这个
41.07-41.08
this question is
他的问题是
41.08-41.11
if it's not a clustered index we could have random i/o
如果这个索引不是聚簇索引，那么我们就得使⽤随机I/O
41.11-41.12
how do we solve that
我们该如何解决这点呢？
41.12-41.14
give me like two slides three sides
我需要花2到3张幻灯⽚来讲这个
41:15 - 41:19
Yes yes
请问
41:26 - 41:27
All right, so this question is
So，他的问题是
41.27-41.29
in this case here
在这个例⼦中
41。29-41.35
would I have to probe the index a hundred times
我是否得对这个索引探测100次
41.35-41.36
no
并不需要
41:36 - 41:40
Because it was like I do I like how the query plan here yeah
So，来看下此处的查询计划
41:41 - 41:45
So think of my my leaf nodes of my query plan for that for this query
So，我们来思考下这个查询计划树叶⼦节点上的东⻄
41:46 - 41:50
I called next right at the leaf node to access the actual table
我在叶⼦节点上调⽤Next函数来访问实际的表
41:50 - 41:52
Well I'm accessing it through an index
Well，我可以通过⼀个索引来访问这张表
41.52-41.57
and the index is gonna do probe now to find all the students in the CS Department
现在，索引就会去找到CS系的所有学⽣的记录
41:58 - 42:07
And it's gonna find its if it's a B+ tree, it would find the the left side in a leaf node where
all the students in the CS depeartment begin
如果该索引是⼀个B+树，它会在左侧叶节点中找到CS部⻔中所有学⽣的起点（知秋注：索引是
有序的）
42:07 - 42:11
I emit the first tuple what I found that goes up to my to my parent
我将我所找到的第⼀个tuple传给我的⽗节点
42:11 - 42:13
The parent comes back and calls next again
⽗节点会回过头来，再次调⽤Next函数
42:13 - 42:16
Now my iterator jumps to the next one in the leaf node
现在我的迭代器就会跳到叶⼦节点中下⼀个位置
42.16-42.17
that's another students CS well
上⾯保存了另⼀个CS学⽣的记录
42.17-42.18
emit that up
我将这个tuple传给⽗节点
42.18-42.21
come back again, now I iterate to the next one
然后我再回去，现在我要去遍历下⼀个tuple
42:21 - 42:26
Oh now it's in you know the biology department ,that's not that doesn't match my
predicate, I've returned null
然后我发现下⼀个学⽣是⽣物系的，这不符合我的判断条件，于是我返回null
42:26 - 42:30
So I probe the index once, and I scan along the leaf nodes, so I find everything I'm
looking for
So，我探测⼀次索引，然后沿着叶⼦节点进⾏扫描，这样我就可以找到我要找的所有东⻄
42:31 - 42:34
Right now his question is his question is
Now，他的问题是
42.34-42.38
a index scan always preferable to this the sequential scan
索引扫描是不是始终⽐循序扫描来得更好
42.38-42.39
no
并不是
42:39 - 42:43
Because like if I'm matching everyone like in the case of 99 people in the CS department
因为如果我遇上现在这种情况，即这⾥⾯有99个学⽣都符合我的条件，他们都是CS系的
42:43 - 42:46
Now I'm paying the penalty to traverse down the index
我要付出代价才能对索引进⾏遍历
⽽现在我还要为遍历索引付出代价（知秋注：因为这⾥⾯结果基本都是符合要求的，直接循序遍
历不就结了，⼲嘛要多此⼀举去遍历索引）
42.46-42.49
that's just wasted IO or wasted lookups
这样做只是在浪费IO和浪费查找时间
42.49-42.53
it would've been better just to jump to the beginning of a table and scan it down
sequentially
这还不如从表开头的地⽅进⾏循序扫描来得好
42:54 - 42.56
So where that cutoff point
So，循序扫描和索引扫描之间的临界点是什么呢？
42.56-42.57
in this case is obvious
在这个例⼦中很明显
42.57-42.58
99% of the tuples match
这⾥⾯有99%的tuple符合我的条件
42.58-43.00
sequential scan is a right way to go
循序扫描就是⼀种正确的选择
43.00-43.05
where that threshold is it Depends on the cost model inside the query optimizer inside
the database system,
这种(⽤于选择索引还是选择循序遍历)阈值是通过数据库系统中查询优化器⾥的成本模型所决定
的
43:02 - 43:08
and that's gonna vary between different systems
不同的系统之前对于该值的设定有所不同
43:08 - 43:17
And so Monday next week I always feel I feel like I'm only saying like our next class or
this two more classes will discuss this and and I'm trying to focus on just one idea
So，下周⼀，或者是我会再花两节课的时间来讨论这个，我会将重点放在这个上⾯
43:18 - 43:24
But next week we will show how do we derive this information, and then use it to make it
to make an approximation about which one is better
但下周我们会去展示我们该如何衍⽣出这些信息，并通过这些信息来预测哪种⽅式来得更好
43:25 - 43:29
So not only weather which index is the best one to use ,but whether a sequential scan
will still be better
它会去判断是使⽤索引扫描好，还是循序扫描好
43:30 - 43:31
we'll cover that next week
这个我们下周再介绍
43:33 - 43:38
for now we're focusing on how do I what you what is this execution actually look like
现在我们的重点是实际该怎么执⾏
43:40 - 43:45
all right so again the multi multi-index scan is doing multiple lookups on different
different indexes
多索引扫描（multi-index scan）指的是通过不同的索引进⾏多次查找
43:46 - 43:49
and then we'll combine them a results based on what the predicate is
基于我们的判断条件，我们将它们的结果进⾏合并
43:49 - 43:52
so if it's a if we have a conjunction and and Clause
So，如果我们这⾥有And⼦句
43.52-43.54
then we use the intersection
那我们就会得到这些结果的交集
43.54-43.57
if it's an or clause or disjunction and we use a union
如果是Or⼦句，那么我们就使⽤这些结果的并集
43:57 - 43:59
we're just combining these sets together
即我们将这些集合合并在⼀起
44:00 - 44:05
so and then for any tuple that records that match after our our combination
So，对于那些我们合并后匹配我们条件的tuple来说
44:05 - 44:08
We then can go and do a lookup to find them and do additional processing
我们可以对它们进⾏查找并做些额外处理
44:09 - 44:14
So all the major database system would support this ,they call it different things
So，所有的主流系统都⽀持这个，只是它们对此的叫法并不相同
44:14 - 44:15
If you use Postgres
如果你使⽤PostgreSQL
44.15-44.19
sometimes we'll see an explained output,but call this a bitmap scan
有时我们⽤explain对查询进⾏解释查看它的输出，能看到，它将这种东⻄叫做位图扫描
（bitmap scan）
44:19 - 44:20
This is essentially what they're doing
这也是他们所做的事情
44.20-44.22
they're building some kind of they're building a bitmap
他们构建了⼀个bitmap
44.22-44.26
where every bit corresponds to our record at some location
每个bit都对应了我们每个record所在的位置
44:26 - 44:30
And then now they can combine them together using you know bit manipulation
operators
然后，他们就可以通过位操作来将它们结合起来（知秋注：⽐如，and的话可以使⽤&运算符）
44:31 - 44:33
But different systems do different things
但不同的系统有不同的做法
44.33-44.33
yes
请讲
44:38 - 44:39
On the leaf nodes yes,
在叶⼦节点上是这样的
44.39-44.42
it depends on the predicate
这取决于条件判断
44:44 - 44:46
Right, if it's in clause they'll be multiple probes
如果是in⼦句，那就对索引进⾏多次探测
if it's some kind of like range cause, you can do a sequential scan along the leaf nodes
如果它是范围⼦句之类的东⻄，那么我们就可以沿着叶⼦节点进⾏循序扫描
44:52 - 44:54
I shouldn't use the term sequential scan
我这⾥不应该使⽤循序扫描这个术语
44.54-44.56
a range scan it's what it's called on the index leaf nodes
我应该使⽤范围扫描这个术语才对，当我们对索引叶⼦节点进⾏扫描的时候
45:02 - 45:02
Yes
45:03 - 45:05
Again you do multiple probes
再说⼀遍，你得进⾏多次扫描
45:06 - 45:14
Yeah so again, when you write your SQL query you don't write it, like oh I know I have a
hash table index, I should do you know write this kind of query
当你在编写你的SQL查询时，你不应该这么写，⽐如：当你使⽤了hash table索引，然后你就根
据hash索引来编写查询
当你在编写你的SQL查询语句时，你⽆须去考虑，就像我知道我有⼀个hash table索引，然后我
告诉⾃⼰我应该使⽤hash索引来编写查询
45:14 - 45:16
You don't know you don't care
你⽆须清楚该语句是否使⽤了索引，我们也不在意有没有使⽤索引
45.16-45.19
I mean you at a high level ,you don't know you don't care
我的意思是，从⼀个⾼级层⾯来看，你不清楚⽤的是不是索引，也不在意有没有使⽤索引
45:19 - 45:29
The database system can figure out I have a hash index on on this attribute, and that B+
tree index on the same attribute ,depending what my predicate is it knows how to pick
which one,and does that all for you
根据我的判断条件，数据库系统会帮我们弄清楚是使⽤这个属性上所建⽴的hash索引还是B+
Tree索引，它知道该如何选择，并帮我们搞定这⼀切
45:32 - 45:34
That's the beauty of SQL or a beauty of declarative language
这就是SQL或者是声明式语⾔的魅⼒所在
45.34-45.37
that you don't have to worry about how things are actually being physically stored
我们不需要担⼼这些东⻄在磁盘上是如何存储的
45:37 - 45:42
So I could drop the index and the query still works in a falls back to a sequential scan,
but it still works
So，如果我将索引给撤掉，查询依然能够正常⼯作，只是它使⽤的就是循序扫描了
45:44 - 45:47
Okay, so again here's that same query we had before
Ok，这⾥我们来看个之前看过的查询
45:47 - 45:50
And so this time we have an index on both age and Department
So，此时我们在age和department这两个字段上都有⼀个索引
45:51 - 45:56
And so what we'll do is well first retrieve all the record IDs that match age less than 30
in our index
So，⾸先我们要做的是通过索引来找到所有age⼩于30的record id
45:57 - 45.58
Then we'll do the same thing
接着，我们进⾏相同的事情
45.58-46.02
it could be in a different thread at the same time, it could be the same thread, it doesn't
matter
这可能会通过不同的线程来同时处理，也可能是由同⼀个线程来进⾏处理。这都没问题
46:02 - 46:04
They do look up on the department
它们会根据dept字段进⾏查找
46.04-46.08
then you take the intersection of these two the outputs of these two indexes
接着，我们要拿到的就是根据这两个索引所查到数据的交集部分
46.08-46.10
because it's and Clause
因为它是⼀个And⼦句
46.10-46.11
so a conjunction
So，我们得到的就是⼀个交集
46:11 - 46:14
And then any additional records that match after the intersection
接着，我对这个交集中的tuple进⾏条件匹配
46.14-46.20
we then do a lookup to actually get the tuple and apply the final predicate on the country
= ‘US’
我们会在该交集内进⾏查找，并根据最终条件（即国家为US）来筛选tuple
46:21 - 46:22
So again visually it looks like this
So，通过图来看，就是⻓这样
46.22-46.26
probe you look up on age < 30 on this one
我们先找出age⼩于30的record id
46:26 - 46:29
Department equals CS on this one
接着，再找到dept为CS的所有record id
46.29-46.33
and then whatever ones are in the middle are then the ones we know that match both of
these indexes
不管这两个集合的交集⾥⾯有什么，我们都知道它们符合这两个条件
46:35 - 46:38
And therefore those are the ones we actually wanna look, because that would match our
conjunction
因此，这些就是我们想找的数据，因为它们都在我们的交集中
46:39 - 46:41
And then we go retrieve them and check their by the country = ‘us’
接着，我们去接收它们并检查它们的country是否是US
46:42 - 46:48
So what we're actually generating here could be again a bitmap like if it's in Postgres
So，这⾥我们实际⽣成的东⻄是，如果是在PostgreSQL中，那么这⾥就是⼀个bitmap
46:48 - 46:50
It could be another hash table
它也可以是另⼀个hash table
46.50-46.54
that we could potentially combine with another hash table or do a join
这样我们可以和另⼀张hash table进⾏join
46:54 - 46:56
It could be a bloom filter that we talked about before
这⾥也可以是我们上节课讨论过的bloom filter
46:58 - 46.59
Right, it doesn't matter
这都没关系
46.59-47.00
different systems do different things
因为不同的系统有不同的个做法
47:00 - 47:02
Ideally you want this be as succinct as possible
理想情况下，我们想让它尽可能简洁
47.02-47.08
because you don't want to have a really large hash table for every single tuple that
matches both of them and try to combine them
因为此时每条tuple的key都是相同的，我不想去通过建⽴⼀个很⼤的hash table来对它们进⾏合
并
47:08 - 47:10
So you just have an efficient way to do it intersection
So，我们想通过⼀种⾼效的⽅式来实现这个交集
47.10-47.12
and then you go back and get the rest of the data that you need
然后，我们回过头去获取我们所需要的数据
47:16 - 47:21
Okay, the last thing we'll talk about for access methods is， what he was asking about
before ,
Ok，关于access method这块，我们最后要谈论的⼀点就是，这个也是他之前问过的
47.21-47.24
and I think this has come up a couple times in the semester
我觉得在这学期中，这已经出现⼀两次了
47:24 - 47:27
It`s if I have a non-clustered index
如果我使⽤的是⾮聚簇索引
47.27-47.30
and I'm just scanning along the leaf nodes
那么我只需沿着叶⼦节点扫描就⾏
47:30 - 47:36
I'm jumping around potentially at random to different record IDs at different pages
我会随机跳到不同page上的不同record id上
47:37 - 47:42
Because the the tuples are not sorted of the same way that leaf nodes are sorted in the
in the index
因为这些tuple所排列的⽅式和索引中叶⼦节点所排列的⽅式并不相同
47:43 - 47:44
So in worst case scenario
So，在最糟糕的情况下
47.44-47.51
say I only have one you know one buffer page where I can store something in you know a
single page my buffer pool
假设我只有⼀个buffer page，我可以往⾥⾯保存⼀些东⻄，我可以往这个buffer pool⾥⾯存⼊
⼀个page
47:51 - 47:57
Then every single time as I'm scanning along the leaf nodes, I'm reading a page
接着，当每次我沿着叶⼦节点进⾏扫描时，我就会读取⼀个page
47:57 - 48:00
If the page I'm looking at is not the same as the last one I just retrieved
如果我所查看的page和我刚接收到的page并不相同
48.00-48.03
,then that's another disk i/o to go fetch this
那么我们得做⼀次磁盘I/O来获取这个page
48:04 - 48:06
But depending on what my query is
但基于我的查询来看
48.06-48.13
if the output does not need to be sorted on the ID that the index is based on
如果输出结果并不是基于索引的id来进⾏排序（知秋注：可能是基于其他属性来进⾏的排序，但
并没有根据这个属性创建索引）
48:13 - 48:17
Then before I actually do any lookups on the data
在我对数据进⾏任何查找之前
48.17-48.19
I scan along get all the record IDs
我会沿着叶⼦节点进⾏扫描，并获取所有record id
48.19-48.22
then I sort them based on their page IDs
然后，我根据page id对它们进⾏排序
48:22 - 48:27
And so now for every single page they're grouped together, and it's one IO to get the
one page
对于每个组中的每个page来说，我们需要通过⼀次IO来获取⼀个page
48.27-48.30
I process all the tuples that are inside that page before I move on to the next one
在我处理下⼀个page前，我会处理完当前page中的所有tuple
48:32 - 48:35
Alright, this is the beauty of the relational mode,l the relational model is unordered
这就是关系模型的魅⼒所在，关系模型是⽆序的
48:35 - 48:37
So we're allowed to do this any way we want
So，我们可以按照我们想做的任何⽅式去处理
48.37-48.42
it doesn't matter that the you know that the output could be different from one day to
the next
你知道的，你当天的输出结果和第⼆天可能会有所不同，但这没关系
48:43 - 48:46
Because you can't you're not in your application if you care about things being ordered a
certain way
因为在你的应⽤程序中，如果你在意你的数据是否是按照某种顺序排序的
48.46-48.48
you would have to write a specific order by Clause
那你就得去写⼀个特定的Order By⼦句
48:50 - 48.58
So one day our tuples you know a two tuples that may be close together,and in the in
the sort order like exist on the same page
So，⽐如有⼀天同⼀个page上的两个tuple挨得很近
48.58-49.03
and the next day after some compaction or some garbage collection process ,then now
in different pages
在第⼆天的时候，通过压缩或者垃圾回收处理，这两个tuple就处于不同的page了
49:03 - 49:07
So I could end up getting in a different result for the same query and that's okay
So，对于同⼀个查询来说，我可能会得到⼀个不同的结果，这也是Ok的
49:07 - 49:08
We're allowed to do that
我们允许这么做
49:10 - 49:20
So there's bunch of stuff we can do as reprocessing data that could change the result,
change the doesn't change is a high level correctness that could change the the exact
output ordering
So，当我们处理数据的时候，我们可以做⼀堆事情，⽐如修改结果，但从⼀个⾼级层⾯来看，
结果的正确性不会发⽣改变，但它的输出顺序会有所改变
49:23 - 49:24
There any questions about this
对此有任何疑问吗？
49:25 - 49:25
Yes
请讲
49:32 - 49:33
Your question is
你的问题是
49.33-49.37
like after you do the sorting do you have to walk through
当你排完序，你得.....emmm
49:42 - 49:44
So it's like you sort based on page
So，你是根据page来进⾏排序
49:44 - 49:47
So say there's two tuples I need in page 101
So，假设我需要page 101中的两个tuple
49:48 - 49:51
I know what page they're in they're in page 101, I know the slot number
我知道它们在哪个page，它们在page 101，我知道它们的slot号
49:52 - 49:56
So then as I bring the page in I jumped a slot one
So，当我拿到这个page，我跳转到slot 1
49.56-49.57
I jumped a slot five
然后，跳转到slot 5
49.57-49.58
and I go find the tuples that I want
这样我就找到了我想要的tuple
49:59 - 50:01
You're not iterating you're not scanning through
你不需要对这个page进⾏遍历扫描
50.01-50.02
because you're not looking at every single tuple,
因为我们不⽤去查看每个tuple
50.02-50.05
you're only looking for the tuples that this thing matched up up here
你只⽤去查看这⾥匹配的tuple
50:06 - 50:07
Yeah yes
请问
50:18 - 50:18
Correct
没错
50.18-50.21
so his question and I should have covered this last week
So，他的问题其实我上周讲过了
50.21-0.23
how do you actually maintain the clustered index
那就是我们实际该如何维护聚簇索引
50.23-50.26
because you if say this this page is full
假设这个page满了
50:26 - 50:29
And then I insert something in the sort of fits in here
接着，我往⾥⾯插⼊了⼀个东⻄
50:29 - 50:33
do what did that mean I have to like then reshuffle everything, yes
这是否意味着，我得将所有数据重新洗⼀遍牌。确实如此
50:33 - 50:38
Unless you store everything in like in MySQL or InnoDB
除⾮你将所有东⻄保存在MySQL或者InnoDB中
50.38-50.43
the the pages of the leaf nodes themselves are the where the tuple is actually being
stored
它们的叶⼦节点上实际保存的就是这些tuple
50:43 - 50:45
So as you do split some merges
So，当我们对⼀些合并的page进⾏拆分时
50.45-50.47
, and you're moving key values you know from one page to the next
那我们就要将这些key/value从⼀个page移动到另⼀个page
50.47-50.49
that's that's the same thing
这是⼀回事
50:50 - 50:57
If there's a disconnect if it's an index organized if it sorry, if it's a clustered index that's
not connected exactly to the underlying data pages,
如果这是⼀个聚簇索引，此时，它们便⽆法准确地和底层的data page连接起来（知秋注：如果
在索引叶⼦结点中间做个插⼊的话，会引发⻚分裂，聚簇索引依赖主键来做快速地顺序插⼊，但
⼀旦中间插⼊，那整个主键就乱了套了，树的中间节点都会发⽣改变，也就⽆法准确定位某些叶
⼦节点了）
50:57 - 50:59
yes，There's a bunch you have to do bunch actually work
没错，那么你得做很多额外⼯作
51:01 - 51:05
This is why most systems that's index organized or cluster index it or not the default
这就是为什么对于⼤多数系统来说，聚簇索引并不是默认索引的原因
51:07 - 51:07
yes
请讲
51:13 - 51:18
So question is if it's like sort limit ten like there's an order by with a limit clause
So，他的问题是，如果这⾥在limit⼦句后⾯使⽤⼀个Order By，⽐如限制返回10条记录
51:19 - 51:20
You can't do this correct ,yes
那你就没法这么⼲。说的没错
51:21 - 51:23
But again the database system of know this
但再说⼀遍，数据库系统知道这些
51.23-51.25
we have rules and our query optimizer to recognize that
我们拥有这些规则，并且我们的查询优化器会意识到
51.25-51.29
you like, oh so that would be that's an example of a pipeline breaker
Oh，这⾥有⼀个pipeline breaker
51.29-51.30
to do an order by
为了做到排序（使⽤Order By进⾏排序）
51.30-51.35
I have to have all I had to see all the tuples to know what the global sort order is
我得去查看所有tuple，以此来弄清楚它的全局排序是怎么样的
51:35 - 51:40
I and I can't go now to the limit clause up above me my query plan until I finish that
sorting
直到我排完序后，我才能对我的查询计划使⽤limit⼦句
51:42 - 51:42
Yes
请讲
51:47 - 51:48
Okay,yeah so let's
Ok
51:50 - 51:52
I shouldn't have an example
我这⾥应该没有这个例⼦
51.52-51.56
let's let's just use this the go back to iterate a model
我们回到这个iterator model的例⼦
51:56 - 52:03
Okay, so pretend that this instead of this being a projection，it's an order by
Ok，这⾥我们要放的并不是⼀个projection操作，⽽是⼀个Order By
52:04 - 52:06
And then there's there's actually make this the be the order by
我们把这个换成Order By
52.06-5208
make this about one about be the limit
然后把这个换成limit
52:09 - 52:11
So the order by is a pipeline breaker
So，Order By就是⼀个pipeline breaker
52.11-52.15
I don't know the complete sort order of all the records until I see all the records
直到我看到所有的记录，我才能知道这些记录的完整排列顺序
52:16 - 52:23
Because if I try to start sorting them just by seeing partial what you know you know I see
you know I see 9 10 11 ,I sort them
因为如果我试着开始进⾏排序，⽐如我看到其中部分数据（9，10和11）进⾏排序
52:24 - 52:26
But then I don't see you know value one
但我没有看到1这个值
52.26-52.28
because I haven't called next yet
因为我还没有调⽤Next函数
52.28-52.29
now my sort ordering is incorrect
那么我现在的排序顺序就是错误的
52:30 - 52:31
So a pipeline breaker says
So，pipeline breaker就会说
52.31-52.34
you cannot proceed up in the query plan until you get all the tuples you need
除⾮你拿到了你所需要的所有tuple，不然你不能继续处理你的查询计划
52:35 - 52:36
So the order by here would be a pipeline breaker
So，Order By就是⼀个pipeline breaker
52.36-52.39
and then I have an order by with the limit calls
接着，我在Order By中调⽤limit
52.39-52.43
that I want to pick up the top ten tuples after being sorted
我想去拿到排序后前⼗个tuple
52.43-52.45
I can't do that top ten until I have everything ordered
直到我将这些东⻄排好序后，我才能拿到这前10个tuple
52:47 - 52:47
Make sense
懂了吗？
52:48 - 52:56
So order by sub-queries joins limit calls of the order buys would be a pipeline breaker
So，Order By，⼦查询，join和limit这些都是pipeline breaker
52:58 - 53:01
Other examples mins maxes things like that
其他的话，就是min和max之类的东⻄
53:04 - 53:06
So how does relate to an index scan
So，这和索引扫描有啥关系呢？
53:06 - 53:08
So the index scans are down here
So，索引扫描是处于这下⾯的
53:09 - 53:12
Right, it's just you know for this for t in R
⽐如这⾥的for t in R
53.12-53.。14
I'm not saying what R is
我并没有说R是什么
53.14-53.15
how this for loop is
也没有说这个for循环是怎么做的
53.15-53.17
, it could be a seqeuntial scan, it could be an index scan
它⾥⾯使⽤的可以是循序扫描，也可以是索引扫描
53:18 - 53:23
So if it's a if it's a seqeuntial scan, its unordered
So，如果使⽤的是循序扫描，那么得出的结果就是⽆序的
53:23 - 53:27
So I'd have to have my order by calls do up above much extra stuff
So，我得通过调⽤Order By来对此做些额外⼯作
53:27 - 53:34
But if I am doing an index scan, and my pro my range scan in my index
但如果做使⽤的是索引扫描或者对我的索引进⾏范围扫描
53.34-53.41
and that's and the sort order of the index is the same as my order by clause up above
索引中的排列顺序和我上⾯的Order By⼦句的排列顺序是相同的
53:41 - 53:44
Then I know these tuples are gonna come out in sorted order
那么我就知道，这⾥我所拿到的这些tuple都是排好序的
53.44-53.46
so I don't need to do my order by up above
So，这样我也就不需要在上⾯使⽤Order By了
53:47 - 53:51
So again we know all this ahead of time as we're generating this query plan
So，当我们在⽣成查询计划的时候，我们就提前知道了这些东⻄
53.51-53.53
because we know exactly what the query plan is
因为我们确切这个查询计划是什么
53.53-53.54
because it's declarative
因为它是声明式的
53:56 - 54:02
There's no like there's no magic function that we don't know what it's gonna be until we
actually run it
，即直到我们实际运⾏该函数的时候，我们才知道它的效果是什么
其中有什么神奇的函数我们并不知道，也只有到我们真正运⾏它的时候，才知道它⾥⾯有什么
54:03 - 54:06
It's not entirely true ,but for now that's the case
这并不完全正确，但对于这个例⼦来说，是对的
54:06 - 54:06
Okay
54:10 - 54:11
All right cool
Cool
==================
54:13 - 54:19
All right, so the last thing we'll talk about is how do we actually evaluate these predicates
All right，我们最后要讨论的就是我们该如何对这些判断条件进⾏评估
54:20 - 54:22
Whatever these where clauses we have these join clauses
我们有Where⼦句还有join⼦句
54.22-54.26
how do we actually you know how do we actually make sense of this
我们如何才能让这些语句变得有意义呢？
54:27 - 54:33
So the way we're going to do this is that we represent the where clauses as an
expression tree
So，我们通过将where⼦句表示为⼀个表达式树（expression tree）来做到这⼀点
54:33 - 54:39
And all the nodes in our expression tree are gonna represent the different types of
expressions that we can have in our predicate
表达式树上的所有节点代表了我们条件判断中不同类型的表达式
54:40 - 54:48
So all the comparisons() conjunctions() disjunction() arithmetic operators() function calls
lookups for actual tuples constant values
So，对于⽐较，交集，并集，算数操作符，常量值这些东⻄
52.48-54.52
all these things can now be represented in a tree
它们都可以在树中表达出来
54:52 - 54.53
So for this particular example here
So，在这个例⼦中
54.53-54.56
I have my on clause where R.ID = S.ID
我的On⼦句中的内容是R.id=S.id
54.56-55.00
and then where clause with SSS that's not value greater than 100
接着，where⼦句中我们的条件是S.value>100
55:00 - 55:07
So I could represent this entire predicate the combination of the joined clause and the
where clause as a tree
So，我可以将这整个条件（即join⼦句和where⼦句）按照这种⽅式表达为⼀棵树
55:08 - 55:11
In my root I have an I have the conjunction the and operator
在我的根结点处，我使⽤的是And operator，即我们要的是交集
55.11-55.15
on one side I have the equality predicate it matches R ID and s ID
在左边我们放的是equality predicate，这⾥的条件是R.id=S.id
55:15 - 55:28
The other side I have the greater than operator for the attribute value sorry, the value of
the value of the value Attribute For the tuple and then the constant 100
另⼀边我放的是">"操作符，它对这些属性值进⾏⽐较来筛选tuple（即S.value>100）
55:29 - 55:31
So just like before as
So，和之前⼀样
55.31-55.33
in a query plan we go top the bottom
在查询计划中，我们是从上到下来进⾏查询的
55.33-55.36
will do the same thing here determine whether the tuple matches
这⾥我们和之前相同的操作，以此来判断这些tuple是否匹配我们的条件
55:38 - 55:39
So let's look at a more simple example
So，我们来看个更简单的案例
55:40 - 55:47
So here we have a query where * from s ,and then our where clause is where B value
equals question mark + 1
SQL语句如图所示
55:47 - 55:50
So we haven't talked about I don't know we talked about prepared statements yet
So，我们还没有讲过Prepared statement
55.50-55.55
but prepared statements are like a way to declare a like a query template
但Prepared statement是⼀种声明查询模板的⽅式
55:55 - 55:59
Now you tell the database system ahead of time, hey I'm gonna actually execute this
query over and over again
现在我们提前告诉数据库系统，Hey，我要不断执⾏这个查询
55:59 - 56:02
And here's a placeholder where you fill in a value at runtime
这⾥有⼀个占位符，你可以在运⾏时将值填⼊
56:02 - 56:04
So you know you and invoke this query almost like a function
So，你调⽤这个查询的时候，基本和调⽤⼀个函数是⼀样的
56.04-56.07
and you'll pass in a value they get substituted at runtime
在运⾏时，你只需要传⼊⼀个值，并将这个占位符替换掉就⾏
56:08 - 56:11
We'll cover that I think maybe next week or after the midterm
我们可能会在下周或者期中考试后介绍这个
56:12 - 56:13
But is this clear what's going on here, it's just a placeholder
但这⾥所发⽣的事情你们懂了吗？它就是⼀个占位符
56.13-56.14
yes
请问
56:18 - 56:19
Why can you do that
为什么我们可以这样做？
56:24 - 56:27
Yes yes
56:27 - 56:31
Why not just have +1 be done the client-side, sure
为什么我们不在client端将“+1”这⼀步完成
56:31 - 56:35
So that is a that's a philosophical question
So，这是⼀个哲学问题
56.35-56.39
No so like take -
No，So，⽐如这⾥我可以使⽤减号
56:39 - 56:41
So I always have to add +1 ,right
So，这⾥始终我会进⾏加⼀
56:42 - 56:43
So let's say that
So，假设
56.43-56.45
I have my I have a big application
我有⼀个很⼤的应⽤程序
56.45-56.48
I have my I have the desktop version
我有⼀个桌⾯版
56.48-56.52
I have a web-based version ,and I have a phone application
我还有⼀个web版和⼿机版
56:52 - 56.53
And they're all gonna use this query
这三个版本都会使⽤这个查询
56.53-56.54
that means
这意味着
56.54-56.56
I be if I always make sure I have to call +1
如果我始终得去进⾏加1
56.56-57.00
I'm gonna make sure that on all three different programs ,they call +1
那我就得确保这3个不同的程序，它们都得进⾏加1
57:01 - 57:06
But if that's logic that should always be that I want to hide away from the application
但如果我想在应⽤程序中隐藏这个逻辑
57.06-57.08
then I can write it be in my in my query
那么我就可以将它写到我的查询中
57.08-57.10
and then all I'm get to use that
那么这3个应⽤程序都可以使⽤这个查询
57:10 - 57:12
The plus one is like a trivial example
这个加⼀的案例其实很简单
57:12 - 57:16
But think of other things like the more complex operations
但我们可以去思考下⼀些更为复杂的操作
57:16 - 57:20
This is just to play ,this is just to show you what's gonna happen the tree
这⾥只是向你们展示下这棵树中所发⽣的事情
57.20-57.20
yes
请讲
57:21 - 57:27
We were so we'll call that we'll have a whole lecture is called server-side program logic
server-side execution
So，我们会花⼀整节课来讲服务端程序的执⾏逻辑
57:28 - 57:29
We'll cover that after the midterm
我们会在期中考试后对此进⾏介绍
57:30 - 57:31
But why and it's a trade-off though
但这是⼀种取舍问题
57.31-57.38
because now we have like there's the logic for application is now split between the
database system and the application code itself
因为应⽤程序的逻辑的被分为两部分，⼀部分是由数据库系统来处理，⼀部分是由程序代码来处
理
57:38 - 57:40
And this is why I'm saying is philosophical
这就是为什么我说它是⼀个哲学问题的原因了
57.40-57.42
some people say oh the database system should know everything
有些⼈会说，数据库系统应该知道这⼀切
57:43 - 57:45
And cuz I I can reuse that logic across all different application
因为我可以在所有不同的程序下复⽤这段逻辑
57.45-57.48
other people say that's a bad idea
其他⼈会说这是⼀个糟糕的想法
57.48-57.49
because now like as a programmer
因为作为⼀个程序员
57.49-57.51
I'm writing some you know crappy Python code
我会写⼀些糟糕的Python代码
57:52 - 57:55
And there's some database system to do a bunch of stuff that I don't know what it's
doing
某些数据库系统会做⼀堆事情，但我不清楚它内部做了什么事情
57:55 - 57:56
So it's better for me to put everything in my application code
So，对我来说，将所有逻辑放在我的程序代码中进⾏处理会来得更好
57.56-57.58
because the program we can see that
因为我们可以看到程序中做了什么事情
57:59 - 58:03
So long it's a long answer for why plus one is in here
So，对于这个问题（为什么+1），我解释了很多
58.03-58.07
but trust me there's some useful there's some usefulness to us
但相信我，这对我们会有所帮助
58:07 - 58:07
Okay
58:08 - 58:10
So the expression for this
So，对于这个表达式来说
58.10-58.15
the where clause where B dot value equals question mark plus one would look like a tree
like this
它的表达式树会⻓这样
58:15 - 58:18
So in order to invoke and evaluate this expression
So，为了调⽤并评估这个表达式
58.18-58.24
we need to have some contextual information about what's going on in our query as we
invoke this expression
当我们在调⽤这个表达式的时候，我们需要⼀些（关于这个查询的）上下⽂信息
58:25 - 58:27
So you'd say well what's the current tuple we're processing
So，你会说，我们当前处理的tuple是什么
58:27 - 58:32
Again think of this is like we're gonna call evaluate inside of the for loop inside about
one of our operators
思考下，假设在我们某个操作(operator)的for循环内部进⾏评估
58:33 - 58:36
So everything tuple we're getting ,we're gonna we want to evaluate this tree
So，我们会通过这棵树来对我们所得到的每个tuple进⾏评估
58.36-58.38
so we need to know what the current tubule we're looking at
So，我们得知道当前我们所查看的这个tuple是什么
58:39 - 58:41
We also need to know what our input parameters are for this query
我们也需要知道该查询中我们的输⼊参数是什么
58.41-58.46
I said this is what the client passed us when they want to invoke this query to substitute
the question mark
我说过，这是client端所传给我们的。当它们想去调⽤这个查询时，它们会将这个问号替换为参
数
58:46 - 58:48
So in this case here it's 999
So，在这个例⼦中，参数是999
58:48 -58:53
And then we need some information about the schema of the table that we're processing
接着，我们需要⼀些我们所处理的这个表的schema信息
58:53 - 58:56
So we need to know like you know here's that here's the record
So，这⾥是我们的记录
58:56 - 58.58
The first attribute is the record ID
第⼀个属性就是record id
58.58-58.58
and it's integer
它是⼀个数字
58.58-59.00
the second one is record value and it's also integer
第⼆个属性是⼀个值，它也是数字
59:01 - 59:03
Right, it's just more context about what tuple looks like
它⾥⾯包含了关于这个tuple⻓啥样的⼀些信息
59:04 - 59:06
So the way this is going to work is
So，它的⼯作⽅式是
59.06-59.07
that we're starting the root
我们从根节点处开始处理
59.07-59.09
we call evaluate
我们开始评估
59:09 - 59:17
And then we just go down and in depth first manner to reach of our leaf nodes and start
moving values up
接着我们向下并到达我们的叶⼦节点处（以深度优先），然后将值往上传
59:18 - 59:19
So we start here
So，我们从这⾥开始
59.19-59.20
go to the left side
我们从左侧开始处理
59.20-59.21
and this is a expression says
这是⼀个表达式，它表示
59.21-59.27
go retrieve the the S.value the the value attribute from the current tuple
它要去获取当前tuple的S.value
59:27 - 59:30
So this would then just generate 1000
So，接着这⾥会⽣成1000
59.30-59.34
right because the current to what we're looking at has for the value attribute thousand
因为我们当前所查看的这个tuple的这个属性值是1000
59:35 - 59:40
So then now I go back up here and go again going depth-first search nope sorry
So，现在我回到根节点，并使⽤深度搜索到达这个叶⼦节点
59:41 - 59:44
We get on this side and this says oh give me the parameter at offset zero
我们会说，请给我offset值为0处的参数值
59.44-59.47
I look at my context at offset 0 it's 999
我看了下我的上下⽂，offset 0处的值为999
59:47 - 59.48
So this thing's generates 999
So，这⾥就⽣成了999
59.48-59.50
I jump up here
然后我跳到+号这⾥
59.50-59.51
I go down the other side
我跑到另⼀边
59.51-59.53
that says give me the constant value of 1
并说，请给我常量值1
59.53-59.56
then you know produce the one
这⾥就⽣成了1
59.56-59.57
that gets showed up to here
然后，我们将它往上传
59.57-1.00.00
and now I evaluate 999 + 1 that's 1000
999+1=1000
1.00.00-1.00.03
then I shall been up here for my equality predicate
接着，我们将这个结果传到=号这⾥
1.00.03-1.00.06
and it says does a thousand = a thousand ,yes result is true
数据库系统就会说，1000=1000，结果为true
01:00:07 - 01:00:09
So this tuple would match this particular predicate
So，这个tuple就符合了这个判断条件
01:00:11 - 01:00:12
So that clear
So，你们懂了吗
1.00.12-1.00.21
we're doing this for every single tuple we're looking at inside of our for loop and one of
our operators
我们会对我们操作（operator）中for循环⾥的每个tuple进⾏处理
01:00:21 - 01:00:22
This is good or bad
这是好还是坏呢？
01:00:25 - 01:00:26
Rephrase that is this fast or slow
换句话讲，这是快还是慢？
01:00:29 - 01:00:33
He says he says we're doing the plus every single time unnecessarily ,yes
他说，我们每次进⾏加法操作其实是没有必要的。说的没错
01:00:34 - 01:00:38
So again we will cover this when do query optimization
So，我们会在讲查询优化的时候介绍这个
01:00:38 - 01:00:40
But one obvious thing that he pointed out here is
但他所指出的⼀个很明显的事情就是
1.00.40-1.00.45
this thing is this is also a constant too 999, it`s always be the same
这个参数0上的999也是⼀个常数，⽽且它始终不变
1.00.45-1.00.46
because that was passed into the query
因为我们要将它传⼊这个查询语句中
01:00:46 - 01:00:47
So we could rewrite this
So，我们可以对它进⾏重写
1.00.47-1.00.52
and have it be just rewrite this thing just be a constant value of 1000,
我们将它重写为常量值1000
1.00.52-1.00.52
yes
你说的没错
01:00:55 - 01:01:00
But he's still your until going down the tree that that actually sucks
但我们依然得去往下⾛，这实际上很操蛋
01:01:01 - 01:01:03
So what I'm describing here
So，这⾥我所讲的是
1.01.03-1.01.06
again is what every single database system the first time they're implemented
强调⼀下，这是每个数据库系统最开始都会去实现的东⻄
1.01.06-1.01.09
well well this is how they implement their expressions
Well，这是他们实现表达式的⽅式
01:01:11 - 01:01:12
But it's gonna be slow
但这样做的话速度很慢
1.01.12-1.01.14
because now they have a billion tuples
因为现在如果它们有10亿个tuple
1.01.14-1.01.18
I'm calling that function to evaluate the expression tree and traversing the expression
tree, a billion times
那我现在调⽤函数来评估并遍历这个表达式树，那我得做⼗亿次
01:01:20 - 01:01:25
So the high end systems don't do this, or anything the super optimized systems don't do
this
So，⾼端数据库系统并不会这样做，那些优化很到位的数据库系统也不会做这种事
01:01:26 - 01:01:32
So instead what they want to do is was the same thing as sorry just-in-time compilation
So，相反，它们想做的事情其实是JIT（just-in-time）编译
01:01:32 - 01:01:35
So say I have a stupid predicate like this where one equals one
So，这⾥我有⼀个1=1的愚蠢判断条件
1.01.35-1.01.39
now I realize like again you can optimize this way where it's just always evaluates to
true
我可以意识到，我将其优化，将它始终评估为True
01:01:39 - 01:01:46
But as st. assume that you you had a crappy system that was always going, you know
always had this tree ,and always had to traverse it
但假设你有⼀个糟糕的系统，你知道的，你始终会有这样⼀棵树，并且不得不对它进⾏遍历
01:01:47 - 01:01:49
What you instead want to do is
相反，你想做的事情是
1.01.49-1.01.58
actually compile exactly the predicate you want to evaluate for a given tuple, right
实际上我们想将这个评估给定tuple的条件进⾏编译
实际上，对确切的条件进⾏编译，你想要⽤它来对给定的tuple进⾏评估
01:01:58 - 01:02:01
So now I can write in in one instruction
So，现在我就可以写⼀条指令
1.02.01-1.02.04
constant value one equals constant value one on the CPU
即在CPU上写这样⼀条指令，1=1
01:02:05 - 01:02:09
And that's way faster than traversing this tree doing lookups
这样做要⽐对该树进⾏遍历和查找来得更快
1.02.09--1.02.12
you know to see what kind of expression type I am, figure out what kind of output I need
to copy back
以此来看下表达式的类型是什么，并弄清楚我需要复制回来的输出是什么
你知道的，对于表达式树来讲，你需要去看它的类型，并弄清楚我需要复制并返回的输出是什么
01:02:13 - 01:02:15
Then having these giant switch statements to say
接着，通过这些庞⼤的switch语句表示
1.02.15*-1.02.19
well what's the operator I'm trying to evaluate is an equal clause less than clause
Well，我所试着评估的operator是=还是<
01:02:19 - 01:02:25
If I can just strip down to be exactly what the predicate wants to do
如果我可以简化这些判断条件想要做的事情（知秋注：能单指令做的事情，⼲嘛要那么麻烦）
1.02.25-1.02.26
that's gonna be way faster
那么处理起来就更快了
01:02:28 - 01:02:33
So again this is what the high-end systems do, Postgres 12 just added this
So，再说⼀遍，这是⾼端的数据库系统所做的事情。PostgreSQL 12才刚刚加⼊这个功能
01:02:34 - 01:02:36
And I think it's quite limited at this point
我觉得此时它的功能还相当有限
1.02.36-1.02.39
but this is no MySQL doesn't do this as far as I know
但据我所知，MySQL反正是没有做这个功能
01:02:39 - 01:02:43
But like the high-end systems and the better open-source systems can do this
但像⼀些⾼端的数据库系统和⼀些到位的开源系统就能做到这点
01:02:45 - 01:02:48
And the spoiler again for an system we're building here at CMU
说句废话，对于我们CMU所构建的这个数据库系统来说
01:02:49 - 01:02:52
Now only do we compile down the predicates into simple instructions
我们所做的并不仅仅是将这些条件判断编译为简单的指令
1.02.52-1.02.57
we actually compile the entire query plan to be be to be just a pipeline of instructions
实际上，我们会将整个查询计划编译为⼀套流⽔线操作
01:02:58 - 01:03:02
And then now you no longer again, you don't have indirection, you don't have jump
clauses
那么，现在你就知道，你⽆需这种间接的⽅式，也不需要进⾏跳转了
01:03:02 - 01:03:06
It's just sort of one giant function that X is execute exactly your query plan
我们通过⼀个巨⼤的函数来准确地执⾏你的查询计划
1.03.06-1.03.10
like it's like almost someone wrote the code exactly the execute your query
这⼏乎就像是有⼈写好了能够准确执⾏你查询的代码
01:03:10 - 01:03:12
And then compiled it we can do this on the fly
接着，我们可以在运⾏时对其进⾏编译
01:03:15 - 01:03:15
Okay
01:03:17 - 01:03:23
So the main takeaway from this is that the same query plan and different systems can be
executed in multiple ways
So，我们从中学到的重点是，对于同⼀个查询计划来说，不同的系统可以有多种不同的执⾏⽅
式
01:03:23 - 01:03:25
And this depends on the environment
这由环境来决定
1.03.25-1.03.28
whether it's a column store or a row-store
⽐如，这是列式存储还是⾏式存储
1.03.28-1.03.31
or depends on the workload whether it's a OLAP system, OLTP system
这也取决于系统类型，这是OLAP系统还是OLTP系统
01:03:32 - 01:03:33
But as I said
但正如我说过的那样
1.03.33-1.03.36
the iterator model the top-down approach is the most common one
iterator model这种⾃上⽽下的⽅式是最常⻅的
1.03.36-1.03.38
and that's you'll see that the most in the wild
你们在其他各种系统中看到最多的就是这样
01:03:39 - 01:03:44
In most cases execuation gonna always prefer to use it index scan clause over
sequential scan as much as possible
在⼤多数情况下，DBMS总是尽可能想去使⽤索引扫描，⽽不是循序扫描
01:03:45 - 01:03:47
There'll be some in cases where this is not gonna actually work out
但实际上，在某些场景下，这种做法并不可⾏
01:03:48 - 01:03:50
And then the expression trees are nice
然后，我想说的是，表达式树⾮常nice
1.03.50-1.03.55
because again as humans they're easy for us to reason about and understand the
correctness of the predicates we're evaluating
因为作为我们⼈类来说，这样做我们很容易解释并理解我们所执⾏的条件判断的正确性
01:03:56 - 01:03:57
But in practice
但在实战中
1.03.57-1.03.58
they're gonna be super slow
它们的速度会⾮常慢
1.03.58-1.04.00
and instead you want to compile them down
相反，我们会想将它们进⾏编译
01:04:02 - 01:04:07
all right any questions about what you know could query execution so far
All right，对于查询执⾏你们有任何疑问吗？
01:04:07 - 01:04:13
and hoping you see what we've done in the semester is that we've talked about again all
these different parts of the system
我希望你们已经学会了我们这学期所讲的关于系统各个部分的内容
1.04。13-1.04.13
how do you do the scans
⽐如，如何进⾏扫描
1.04.13-1.04.14
how to build the indexes
如何构建索引
1.04.14-1.14.16
how to have a buffer pool
如何使⽤⼀个buffer pool
1.04.16-1.04.21
and now we're trying to put all these things together, and actually build a full system
现在，我们会试着将这些东⻄串起来，并构建出⼀个完整的系统
01:04:21 - 01:04:21
okay
01:04:23 - 01:04:26
all right so next class we will continue on query execution
So，下堂课我们会继续讲查询执⾏这块的内容
1.04.26-1.04.29
but we're going to focus on how to execute queries in parallel
但我们的重点会是该如何并⾏执⾏查询
01:04:30 - 01:04:36
right and and the distinction I'll make between distributed and parallel systems is that
关于分布式系统和并⾏系统之间的区别是
1.04.36-1.04.40
for parallel execution we're talking about running a single query on a single database
instance of a single box
对于我们所讨论的并⾏执⾏来说，我们是在⼀个数据库实例中执⾏这⼀个查询
01:04:41 - 01:04:43
distribute execution will be running queries on multiple machines
分布式执⾏会在多台机器上执⾏查询查询
01:04:45 - 01:04:48
but a lot of the ideas I will talk about in this lecture will be applicable to the distributed
environment
但我会在下节课上去讨论许多能够⽤在分布式环境下的思路
01:04:50 - 01:04:53
okay all right guys enjoy the weather and I'll see you on Wednesday
好了，好好享受⽣活，周三再⻅