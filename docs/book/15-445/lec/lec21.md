
00:16 - 00:17
a lot to talk about today
今天要讲的内容很多
0.14-0.24
this is sort of continuation on where we are where we left off on Mondays classes have a lot of recovery 
今天这节课其实是周一那堂课的延伸，我们今天要讲的内容就是跟数据库恢复相关
00:24 - 00:26
so DJ drop tables are still in Vegas
So，DJ Drop Tables现在还在拉斯维加斯那边
0.26-0.28
so you can't make it today
So，你们今天没法见到他了
0.28-0.30
but he'll be back on Monday 
但他会在周一的时候回来
00:30 - 00:34
and I said he's dealing with girlfriends plural problems 
我之前说过，他现在在处理他的后宫问题

00:35 - 00:37
right so on Monday
So，在周一的时候
0.37-0.39
 we started talking about recovery algorithms 
我们讨论了恢复（recovery）算法
00:39 - 00:50
we talked about how to have the database system be able to restore the database to the consistent state as it existed before the system crashed 
我们讨论了如何让数据库系统能够恢复到它崩溃前的一致状态
00:50 - 00:56
and we want to do this make sure that we provide atomicity durability and consistency guarantees for all our transactions 
我们想确保我们为我们的事务提供了原子性、持久化以及一致性保证
00:56 - 0.57
and I said that
我说过
0.57-1.02
 every recovery algorithm we're gonna have in our database system that we possibly design is gonna have two parts 
对于我们在数据库系统中所设计的所有恢复算法来说，我们有两部分要讲
01:03 - 01:12
but first is are the things we're gonna do while we're processing transactions to record extra information, or to flush out data in a sort of certain way to disk 
首先我们要做的事情是，当我们处理事务时，我们要去记录些额外信息，或者将数据以某种方式刷出到磁盘
01:12 - 01:15
and such that we can be able to recover after a crash 
通过这种方法，我们能够在崩溃后对数据库系统进行恢复
01:15 - 01:18
so now we're talking about today is the second half of 
So，今天我们要讲的就是第二部分


01:18 - 01:19
if there is a crash
如果我们遇上了系统崩溃
1.19-1.25
 how we come back and pick our life back together picking pieces our life that ,you know back together and and figure out what's going on 
我们该如何让系统恢复正常，并弄清楚接下来该做什么

01:26 - 01:35
so the the protocol we're going to look at today is based on this technique developed at IBM called Aries 
So，今天我们要看的协议是基于ARIES所开发的，它是由IBM所开发
01:35 - 01:43
so I don't think the textbook is going to explicitly refer to in the chapters, when they talk about data recovery in the the techniques, where we talk about today as Aries
So，我不觉得教科书中在讨论数据恢复的时候明确提到了我们今天要讲的ARIES
01:43 - 01:49
we're just stood in the back of your mind to understand that  this Aries is pretty much everyone does 
我们只是想让你记住，差不多所有人使用的都是ARIES
01:50 - 01:57
so Aries was developed in at IBM research in the late 1980s early 1990s for DB2
So，ARIES是IBM在1980年代末、1990年代初的时候为DB2所开发的东西
01:57 - 1.59
and there's this seminal paper that came out 
当时他们写了一篇具有开创性的paper
1.59-2.03
that's super long ,if you can't fall asleep it's 70 pages 
如果你看下那篇paper的话，你就知道，它真的超级长
02:03 - 02:06
so go ahead and give it a crack and see whether you can get to the whole thing ,you won't um 
so 你可以给自己个机会去看看其中的所有细节，我觉得你不会这么做的
02:07 - 02:14
but this thing is goes into excruciating details of exactly all the steps and failure scenarios you need to handle 
但这里面存在着很多令人痛苦的细节，你需要处理所有的步骤，以及各种故障情况
02:14 - 02:19
to guarantee that your recovery algorithm is going to be correct, and that you're not going to lose any data 
以此来保证你的恢复算法是正确的，并且你不会丢失任何数据
02:20 - 02:26
so it's not to say that nobody was doing recovery before this paper came out in 1992 
So，我并没有说在这篇paper出现之前，没有人做数据恢复相关的事情
02:26 - 02:27
it's just to say that
我只是说
2.27-2.36
this paper is the sort of was laid down or codify the exact policies that need to be a mindful walk, in order to do recovery correctly
这篇paper中制定了具体的策略，以此来正确进行恢复工作
02:37 - 02:42
and then not every single database and that's out today, that's doing checkpoints and write-ahead logging
当下，并不是所有数据库系统都使用了checkpoint以及预写式日志
2.42-2.46
maybe not be falling to the exact letter what Aries does 
它们也可能并没有完全做ARIES相关的事情
02:46 - 02:47
but at a high level
但从一个高级层面来讲
2.47-2.48
they're essentially doing the same thing
本质上来讲，它们做的是一回事
2.48-2.51
right write-ahead Logs with fuzzy checkpoints 
即具备Fuzzy Checkpoint能力的预写式日志
02:51 - 02:55
and then a three-phase analysis or three-phase recovery protocol 
以及三阶段恢复协议

02:56 - 03:02
so the three main ideas of Aries for database recovery are the following
So，如图所示，这是数据库恢复中ARIES所涉及的3种主要想法
03:02 - 03:05
the first is that we're gonna use write-ahead log
第一种方案是，我们会去使用预写式日志
3.05-3.14！！！！
write-ahead log to record any changes that transactions make to data in our database in these log records 
预写式日志会去将事务对我们数据库中数据所做的任何修改都记录在日志中
03:14- 03:19
and that we have to flush out the logs that correspond to the changes to a page, before the page can be written out 
在该page能被写出到磁盘前，我们需要将对应该page上所做修改的日志刷出到磁盘
03:20 - 03:21
and as we said last class 
正如我们上节课所讲
3.21-3.24
this is using a Steal+No-Force policy 
我们使用的是Steal+No-Force策略
03:24 - 03:25
so what a steal mean 
So，Steal的意思是什么呢？
03:29 - 03:30
steal says
Steal的意思是
3.30-3.39
 the buffer pool is allowed to flush out pages to disk, or evict pages to disk for that have been modified by transactions that have not committed yet 
我们允许buffer pool将page刷出到磁盘，或者说将那些未提交事务所修改的page刷出到磁盘
03:39 - 03:40
and no force says that
No-Force的意思是
3.40-3.48
we're not required to flush all the dirty pages that a transaction modified in order to say that transaction has committed correctly
我们不要求将该事务所修改的所有dirty page都刷出到磁盘，以此来表示该事务已经被正确提交

03:48 - 03:55
instead， what we do is we flush all the log records  that the transaction generated out the disk
相反，我们的做法是将该事务所生成的所有日志记录都刷出到磁盘
03:55 - 03:59
make sure they're durable and safe, before we tell the outside world that our transaction has committed 
以此来确保在我们告诉外界该事务已经提交前，它们被持久化且安全落地到磁盘
04:01 - 04:02
so this is what we do at run time,
So，这就是我们在运行时所做的事情
4.02-4.07
and we'll have a slight variation on how we're gonna do this 
我们会在做法上有所不同
4.07-4.09
that's gonna be different when we talk about on Monday 
这和我们周一所讨论的东西有所不同
04:09 - 04:12
we'll have to see about this store some extra stuff to make sure this works correctly 
我们要去存储些额外的东西来确保它正确工作
04:13 - 04:16
then after a restart
接着，当重启之后
4.16-4.17
 to recover the database 
为了恢复数据库
04:17 - 04:24
we're gonna first replay the history on in the log to redo all the changes that transactions made 
我们首先会去重新执行下日志中的操作记录，以此来重新执行事务所做的所有修改
04:24 - 04:29
and this includes any changes from aborted transactions, we're gonna replay them as well 
这里面包括了那些被中止的事务所做的修改，我们会去重新执行它们
04:30 - 04:36
and then we'll have to go back and undo a bunch of stuff to figure out how to reverse the changes that should be persistent 
接着，我们需要回过头去并撤销一系列操作，以此来弄清楚哪些修改应该被落地到数据库
04:37 - 04:39
and then the other change we're gonna make also too is that 
接着，我们要做的其他修改就是
4.39-4.44
when we start undoing changes both at run time and during recovery 
当我们在运行时和恢复时开始撤销那些修改的时候
04:44 - 04:48
we're actually create log records for those undo operations as well 
实际上，我们也会为这些撤销操作创建日志记录
04:49 - 04:51
so that's something we also we haven't talked about so far 
So，这也是我们目前为止所没有讨论的东西
04:51 - 04:52
because last class I just said
因为在上节课的时候我说过
4.52-4.54
hey here's all the updates I'm doing
假设，这里是我所做的所有更新
4.54-4.55
here's the corresponding log records 
这是与这些更新相对应的日志记录
04:55 - 04:56
and then when I aborted
接着，当我中止事务的时候
4.56-4.59
,yeah you know I didn't do anything special 
你知道的，我并没有做任何特别的事情
04:59 - 05:05
so now when we do abort transaction as either again at run time or apart it's recovery
除了在恢复的时候，当我们在运行时中止事务时
05:05 - 05:09
we're gonna add extra log records to say here's the change that we are reversing
我们会添加额外的日志以此来表示这是我们要撤销的修改
05:10 - 05:13
and we need this to ensure that we can recover
我们需要这些信息来确保我们可以恢复数据库
5.13-5.15
but if we crash during recovery,
但如果我们在恢复的过程中发生了崩溃
5.15-5.16
 we can recover from the recovery 
我们可以从恢复阶段中恢复过来
05:17 - 05:19
right and you imagine this thing being infinite 
你可以想象得出这是个无尽的循环
05:19 - 05:23
so this is the extra step we need to make sure that we can handle all scenarios 
So，我们需要这个额外步骤来确保我们可以处理所有情况


05:24 - 05:25
so today's agenda
So，今天要讲的内容是
5.25-5.35
we first talk about how the execution workload is gonna be different execution process of transactions during the normal processing is slightly different 
我们首先讨论它们（上一张ppt中的几种策略）在事务正常处理期间执行的工作负载有什么轻微的不同
05:35 - 05:37
so we're gonna introduce this idea of log sequence numbers
So，我们会去介绍日志序列号这种思想
5.37-5.41
and the extra steps we do for commits and abort sand and fuzzy checkpoints 
以及我们在提交、中止和使用Fuzzy Checkpoint的时候所做的额外步骤
05:41 - 05:47
and then we'll finish up talking about how we actually do the three phase recovery algorithm as defined by Aries 
接着，我们会去讨论ARIES所定义的三阶段恢复算法
05:48 - 05:49
okay

5.49-5.50
again this is super hard
再说一遍，这超级难
5.50-5.52
this is as I said 
正如我所说的
5.52-5.54
this is probably the third hardest part about database systems 
这可能是数据库系统中第三难的部分
05:54 - 05:57
so again stop me as we go along, if you have questions
So，如果在我们讲的时候，你有任何疑问，请打断我
5.57-5.59
right it feel free to interrupt
你们可以随时打断我



06:00 - 06:02
so last class we talked about writing head log records
So，上节课的时候，我们讨论了预写式日志记录
6.02-6.04
and we said that
我们说过
6.04-6.05
for our purposes here
出于我们此处的目的
6.05-6.08
we'll just assume we're doing physical logging or physiological logging 
我们假设，我们使用的是Physical Logging或者是Physiological Logging
06:08 - 06:11
and not the logical logging where you just record the sequel statement 
而不是使用Logical Logging，即记录那些SQL语句
06:12 - 06:21
and so we're gonna have the transaction ID that's making the change the object that they're changing, and then the redo and undo information 
So，我们通过使用transaction id来标记它们对对象所做的修改，然后这里面还有Redo和Undo信息

06:21 - 06:23
but now we include additional metadata 
但现在我们要去包含些额外的元数据
6.23-6.27
that keeps track of the order in which these log records are being generated 
它用来跟踪这些被生成的日志记录
06:28 - 06:32
so we're gonna introduce this new concept called a log sequence number the LSN 
So，我们要介绍一个新的概念，即日志序列号（LSN）
06:32 - 06:38 ！！！
that is just a monotonically increasing counter that we assign to every single log record as it gets added 
当添加日志的时候，我们会通过一个单调递增的counter来给每条日志记录分配日志序列号
06:39 - 06:43
and so the log sequence number doesn't need to be continuous for a transaction
So，对于一个事务来说，日志序列号不需要是连续的
6.43-6.45
because again depending what concurrency control protocol we're using
因为这取决于你使用的是哪种并发控制协议
06:46 - 06:48
we can interleave these their operations in any different way
我们可以以任何不同的方式来交错执行它们的操作
06:48 - 06:51
so I might give out log sequence number one to transaction 1
So，我可以将日志序列号1分配给事务1
6.51-6.54
log sequence number 2 to transaction 2 
将日志序列号2分配给事务2
06:54 - 06:55
and it you know goes back and forth
如此交叉分配
6.55-6.56
they don't need to be all continuous 
这些日志序列号不需要是连续的
06:58 - 07:00
so now with these log sequence numbers 
So，通过这些日志序列号
07:00 - 07:12
we're gonna modify all different parts of the system that need to be aware of what log records have modified data, and whether or not they've been written out the disk 
我们会去修改该系统中各个不同的部分时，它们需要注意哪些日志记录对数据进行了修改，以及这些日志记录是否已经被写出到磁盘

07:13 - 07:15
so we want to extend our buffer pool even further,
So，我们想进一步对我们的buffer pool进行扩展
7.15-7.18
 now be cognizant of what are these log sequence numbers 
并了解这些日志序列号是什么
07:19 - 07:23
what are the log sequence numbers that correspond to the changes that are made to the pages that it has in memory 
即对应于对内存中存放的page所做更改的日志序列号

07:25 - 07:28！！！！！！！
so every log record has a log sequence number
So，每条日志记录都有一个日志序列号
7.28-7.31
but then all throughout the system will have these other logs sequence numbers 
但系统中还会有一些其他的日志序列号
07:31 - 07:35
so this is just a summary table for the log sequence numbers were going to counter throughout the rest of the class 
So，这是我们在这节课剩余时间内所会遇到的日志序列号的相关摘要表
07:36 - 07:37
but we'll go through these one by one
但我们逐个看下这些东西
7.37-7.39
 you'll see then how we using them 
你会看到我们是如何使用它们的
07:40 - 07:42
so the flushedLSN is just an in-memory counter
So，flushedLSN其实就是内存中的一个counter
7.42-7.46
that keeps track of the last LSN of the log recovering flush to disk 
用来跟踪上一个刷到磁盘中的log的lsn
07:46 - 07:49
and this is just telling us in our ready head log buffer in memory 
这就是用来告诉我们log buffer中
 


07:49- 07:58
how far you know how far in you know the log records   how far back we know they're all records are actually durable or not 
通过它可以知道所有这些log  records实际是否已经持久化
07:59 - 08:00
and then for every page
接着，对于每个page来说
8.00-8.02
 we have the pageLSN and the recLSN 
我们会有pageLSN和recLSN
08:02 - 08:09
so the pageLSN will just be the last log record that modified that page 
So，pageLSN指的是修改该page的最后一条日志记录


08:09 - 08:11
but the newest log sequence of that record 
它也是该page对应的最新一条的log记录
08:11 - 08:19
and then the recLSN will be the oldest log record ,that modify this page since it was last flushed 
接着，recLSN指的就是自该page被刷出到磁盘后，对该page进行修改的最老的一条日志记录
08:20 - 08:21
so when I bring the page into memory
So，当我将该page放入内存中的时候
8.21-8.25
if I go ahead the first look first transaction that modifies it
如果第一个事务对该page进行了修改
8.25-8.28
I add that log sequence number as the recLSN  
我会将该日志序列号作为recLSN
08:28 - 08:31
and then no matter how many times I keep modifying it 
那么，不管我对该page进行多少次修改
08:31 - 08:32
while it's in memory
当该page在内存中的时候
8.32-8.33
they've recLSN and is always the same
它的recLSN值始终是相同的
8.33-8.35
whereas the the pageLSN and it will increase 
然而，pageLSN的值会增加
08:36 - 08:39
and then I'm gonna write this data also out to disk as well 
接着，我会将这些数据写出到磁盘
08:40 - 08:41
like this so code is going the header
这些信息会放到该page的header中
8.41-8.45
and this is your extra information to make sure that we're doing the right things on during recovery 
我们需要通过这些额外信息来确保我们在恢复过程中做的是正确的事情
08:46 - 08:52
every transaction were to keep track of the lastLSN, if that's the lastest you know log record that it added
每一个事务都会持续跟踪这个lastLSN，这是该事务最近添加的一条log record


08:52 - 8.55
and then globally we're gonna have a master record
从全局角度来说，我们会有一个MasterRecord
8.55-9.00
that we're gonna use to keep track of the LSN the last check point that we successfully took
我们会通过这个MasterRecord来跟踪我们成功制作的那个最新checkpoint的LSN值
09:01 - 09:02  
right now remember I said
还记得我所说的
9.02-9.03
when we take these checkpoint
当我们制作这些checkpoint时
9.03-9.06
they're actually entries into the log to say hey I took a checkpoint at this time 
此时，我们会往日志中添加CHECKPOINT这一条目，以此来表示这里我制作了一个checkpoint

09:08 - 09:10
so again this is sort of reiterating everything I said before 
So，这其实就是在重申我之前所讲过的一切
09:10 - 09:12
so every page has a pageLSN
So，每个page都有一个pageLSN
9.12-9.15
 it's just when the most recent update made to that page 
当我们最近对该page进行了修改
09:15 - 09:22
we keep track of the flushedLSN to know how many what what sequence in the log or what point in the log ,we've written those things up to disk 
我们会去跟踪flushedLSN，以此来弄清楚我们在日志中将多少数量的修改日志record落地到了磁盘
09:23 - 09:25
and as I said last class
正如我上节课所说
9.25-9.27
yeah sorry question 
抱歉，你有什么问题吗？
09:32 - 09:33
yes so I said 
So，我之前说过
9.33-9.37
do the pageLSN and the recLSN end do they get written a disk
pageLSN和recLSN是否要被写入到磁盘
09:37 - 09:40
they don't have to， but in general you do
它们不需要被写入到磁盘。但一般来讲，你会将它们写入
09:40 - 09:45
it's just an extra safety mechanism in case you end up missing something 
这是种额外的安全机制，以防你丢失某些东西
09:53 - 09:55
it's the information about the log record right 
这是关于日志记录的信息
10:05 - 10:05
correct
没错
10.05-10.06
statement is
他说的是
10.06-10.09
if you write it out the disk 
如果你将它写出到磁盘
10.09-10.12
is if you write the page up the disk with the pageLSN and recLSN
如果你将page和它对应的pageLSN和recLSN写入到磁盘
10.12-10.14
, isn't that essentially redundant 
本质上来讲，这是否多余呢？
10:15 - 10:18
because now the the page is durable on disk 
因为现在该page已经持久化到磁盘
10.18-10.19
,it's no longer dirty if it was in memory
如果它在内存中的话，那它就不再是dirty page了
10.19-10.21
isn't that fine 
这是否Ok呢？
10:21 - 10:22
and I'm agree with you
我同意你的说法
10.22-10.24
 I'm just saying it's an extra safety mechanism
我只是说，这是一种额外的安全机制
10:26 - 10:28
because we don't want to lose any data
因为我们不想丢掉任何数据
10.28-10.31（中间有bi---）
and disk are super you know they break all the time 

10:32 - 10:36
we just want to make sure that there's enough information around that if we have to cover and recover 
我们只是想要保证有足够的信息去帮助我们做恢复
10:36 - 10:40
and maybe our log got corrupted a little better so that the page we got corrupted 
可能我们的log有点小问题，so，对应的page也会遇到问题
10:40 - 10:44
we have enough information in enough locations that we can we can figure things out yeah 
我们拥有足够的信息去定位并指出问题所在
10:44 - 10:49
now you'll see as we do the extra bit of recovery process, there's me obvious things we could do to speed things up 
now，你会看到，我们在恢复处理时做了这点额外的工作，可以明显加速我要做的事情
10:49 - 10:52
and let's talk a little bit about them at the end 
 我们会在最后的时候来讨论些关于它们的内容
10:53 - 10:54
we are not gonna do them here
我们现在不会去讲它们
10.54-10.55
because we want to be super cautious 
因为我们想超级谨慎
10:56 - 10:57
all right

10.57-11.00
people get pissed when you lose data 
当你丢失数据的时候，人们就会很生气
11:00 - 11:01
So you don't wanna lose data right 
So，你不会想丢掉任何数据
11:02 - 11:07
okay so this is just saying what I said last class remember I said that the with the write ahead log 
Ok，还记得我上节课所说的，通过使用预写式日志
11:07 - 11:09
before we can flush out a dirty page
在我们可以将一个dirty page刷出到磁盘前
11.09-11.13
 we have to flush the log record that made that page dirty 
我们必须将修改该page的对应日志记录刷出到磁盘
11:13 - 11:13
right 

11:15 - 11:17
and this is how we're actually going to figure that out 
这实际就是我们弄清楚这些东西的方式
11:17 - 11:24
we just use these LSN as the watermark to figure out, oh the last log record that modified this page is this you know 123
我们将这些LSN作为水印使用，以此来弄清楚修改该page的最后一个日志记录是什么，比如说：它的日志序列号是123
11:24 - 11:28
but I flushed out log sequence number 456,
但我刷出的日志序列号是456
11.28-11.30
and 456 comes after 123 
456是在123之后出现的
11:31 - 11:31
so therefore 
So，因此
11.31-11.35
I know that whatever log sequence or whatever log record that made my page dirty
我知道，不管是哪个日志记录上记录的操作对我的page进行了修改
11.35-11.37
that also got flushed out that disk as well
它也会被刷出到磁盘
11:37 - 11:39
so it's safe for me to flush out this page 
So，对我来说，将该page落地到磁盘是安全的
11:41 - 11:42
so that's how we're gonna guarantee this 
So，这就是我们保证它的方式

11:42 - 11:45
so let's look at sort of a high-level example of all this 
So，我们来看个关于它们的高级案例
11:46 - 11:50
so again we have in memory we have our log buffer which is just always the tail of the log
So，这里我们有内存，我们有我们的log buffer，它里面存放着的始终是该日志的末尾部分
11:50 - 11:55
and it's always gonna be like you know the most recent changes that may or may not have been written out the disk over there 
它里面存放的是最近可能被写入到磁盘或者还未被写入到磁盘的那些修改

11:56 - 12:00
and then now  we're actually the other thing we're introducing also is a log sequence number 
我们要介绍的另一个东西就是日志序列号
12:00 - 12:03
again these are just a counter we're increasing by one 
这就像是一个计数器，我每次对它的值加一

12:04- 12:08
then over here in the our page, we have the pageLSN 
接着，在我们的page中，我们有pageLSN
12:08 - 12:15
again that's the most recent log sequence number of the log record that modified the this this this page 
它指的是对该page最近进行修改的那个日志记录的日志序列号

12:15 - 12:18
it may not be the one that made it dirty in the first place
它可能并不是一开始修改该page的那个日志记录的日志序列号
12.18-12.19
right that's the recLSN is 
我们将这种日志记录的日志序列号称作recLSN
12:20 - 12:22
this is the since I brought this page into memory 
因为我将该page放入了内存中
12.2212.25
what was the first log record that made this thing dirty 
即该日志记录是最先让这个page变dirty的（最早修改的那条日志记录就是recLSN）
12:25 - 12:27
because I need to know like what were my boundary is 
因为我需要知道我的边界在哪里

12:28 - 12:29
then now we have the flushedLSN
接着，我们还有flushedLSN
12.29-12.36
 again this is just a pointer to whatever was the lastLSN that we wrote help to disk in the log
这就是一个指针，指向了当前事务最近的那个日志record，即lastLSN

12:36 - 12:40！！！
the master records and just pointing to the last successful check point that we took
MasterRecord指向的则是我们所成功制作的最后一个checkpoint
12.40-12.41
yes
请说
12:43 - 12:44
So the question is 
So，他的问题是
12.44-*12.45
why do you need pageLSN here 
我们这里为什么需要pageLSN
12:47 - 12:49
that'll come up later on why we need this 
我们稍后会讲我们为什么需要这个
12:51 - 12:59
it has to do with when you're trying to figure out the as you're replaying the log is the thing that I'm  that did I already write this thing out 
通过这个checkpoint，你不得不做的是，在你需要重演这个log的时候，你需要指出一些东西，要知道，这个checkpoint log里对应的数据已经落地磁盘了
13:00 - 13:03
that then I  already write out the dirty page and therefore 
我们需要弄清楚那些已经写出到磁盘中的dirty page
13:03 - 13:06
I don't need to worry about anything that comes comes and before that the sequence number 
我无需担心这个序列号之前所发生的任何事情
13:07 - 13:08
Think this is like a boundary
你可以将它想象为一种边界
13.08-13.10
 like since I brought this thing in the memory,
比如，我什么时候将这个page放入内存
13.10-13.14
here's the range of LSN that could have modified my my page
这个范围的LSN所对应的日志记录上的操作可以对我的page进行修改
13:21 - 13:21 
Yes
没错
13:25 - 13:28
pageLSN is the last log sequence that made the page dirty 
pageLSN则是最后对该page进行修改的那条日志记录的日志序列号

13:29 - 13:34！！！
so it's here so when I want to go decide whether I can flush my page 
So，当我想去判断我是否要刷出我的page时
13:35 - 13:39
I need to know what was the last change made to that page 
我需要知道我对该page所做的最后修改是什么

13:40 - 13:47
if that last change is comes before the flushedLSN 
如果对该page的最后修改是在flushedLSN之前出现


13.47-13.49
and the flushLSN is this 
flushedLSN就是这个


13.50-13.52
if I know my change is up here
如果我知道我的修改出现在这里
13.52-13.55
 and it comes before the flushedLSN
这些修改在flushedLSN之前出现


13.55-13.56
if this thing's been written a disk 
如果这些东西已经被写入到磁盘
13:56 - 13:58
but I know anything before it's been written a disk 
但我知道任何在flushedLSN之前的东西都已经被写入到磁盘了
13.58-13.59
,and therefore it's safe for me to evict that page 
因此，对我来说，将这个page从buffer pool中移除是安全的
14:07 - 14:10
yeah so during recovery
So，在恢复的过程中
14.10-14.11
you check in that range
你要去检查这段LSN
14.11-14.12
 we'll get that in a second,
我们稍后会讲
14.12-14.14
when it comes time at runtime to flush this thing
在运行时，当它将这些东西刷出到磁盘的时候
14.14-14.15
I check pageLSN 
我会去检查pageLSN

14:19 - 14:23
okay again the master record is just the the location to the last checkpoint 
Ok，MasterRecord指向的是最后一个checkpoint的位置
14:23 - 14:28！！！
and we use this when we recover to figure out where do we want to start our analysis to look at the log to figure out what was running 
当我们进行恢复工作的时候，我们可以通过MasterRecord来弄清楚我们想要从哪里开始看log，并对里面内容分析，弄清楚上面运行了那些东西
14:28 - 14:31
right because without the master record without these checkpoints 
因为在没有MasterRecord和checkpoint的情况下
14:31 - 14:32
we have to start from the very beginning
我们必须从一开始的地方来重新执行操作
14.32-14.35
, because we don't know anything about what page has been written out 
因为我们不清楚这个page被写入了哪些东西
14:35 - 14:37
so be very clear here 
So，你们应该非常明白这里的东西了吧
14.37-14.42
like as the buffer pool was writing out pages, sorry it's flushing out pages 
当buffer pool将page写出到磁盘时
14:42 - 14:43
we're not logging that 
我们不会对此进行记录
14:44 - 14:50
so we don't know what potentially you know what pages have been written out the disk, if we recover after a crash 
如果我们经历了崩溃然后对数据库进行恢复时，我们不清楚哪些page被写出到磁盘
14:50 - 14:52
we just know the log sequence numbers that have written out
我们只知道这些已经落地的日志序列号
14:54 - 14:55
all right

14.55-14.57
so this is actually just an example what he was asking about 
So，这实际就是和他问题相关的一个例子

14:58 - 15:03
so let's say that my pageLSN points to here at log sequence number 12
So，假设我的pageLSN指向的是日志序列号12
15:03 - 15:04
my flushLSN points to 16
我的flushedLSN指向的是16


15.04-15.08
, and I  flush this page out 
然后，我将这个page刷出到磁盘

15:07 - 15:10
right Yes, because the pageLSN is less than the flushLSN 
因为pageLSN小于flushedLSN

15:10 - 15:12
let's say the pageLSN points to 19,
假设pageLSN指向的是19
15.12-15.14
 can I write that out 
我是否能将这个page写出到磁盘呢？

15:14 - 15:15
no
答案是No
15.15-15.21
because I know that the log record that corresponds to the last change made to this page has not on disk
因为我知道，该page上最后一次修改所对应的日志记录并未落地到磁盘（知秋注：日志未落地，对应page数据也不可能落地的）
15.21-15.22
and therefore it's not safe for me to evict this 
因此，对我来说，将这个page从磁盘中移除并不安全
15:23 - 15:31
and again this you would add this this logic inside your eviction policy or replacement policy you would implement in your buffer pool
你会将这个逻辑添加到你buffer pool中所实现的移除策略或者替换策略中
15.31-15.33
to be mindful about 
你要注意的是
15.33-15.34
,what are the flushLSN
什么是flushedLSN
15.34-15.35
,what means pageLSN,
pageLSN是什么
15.35-15.38！！！
 and keep track of all these things，when you make a decision about what what to evict
当你要判断该从buffer pool中移除哪个page时，你要去跟踪所有这些东西



15:41 - 15:42
all right

15.42-15.43
 so just to recap everything I said,
So，重申下我之前所讲的一切
15.43-15.45
all log records have an LSN
所有的日志记录都有一个LSN
15:47 - 15:48
every single time we make a change 
每当我们要进行一次修改时
15:48 - 15:55
we were to first add the entry to the log ,the log record in your local add log record to the buffer in memory 
我们首先会往内存中的log buffer中添加相关日志记录
15:55 - 15.56
then we give back an LSN,
接着，我们会拿到一个LSN
15.56-16.00
 then we can now modify the page
那么，我们现在可以修改该page
16.00-16.02
and that's where we update the pageLSN 
然后，我们会更新pageLSN
16:02 - 16:03
because we already hold the write latch on the page
因为我们已经拿到了该page的write latch
16.03-16.05
 and therefore  we can update atomically 
因此，我们可以进行原子性更新
16:06 - 16:08
and then every single time we have been a victim page 
接着，每当我们从buffer pool中移除page
16:09 - 16:14
we just always update this flushLSN to know that this is how far in the log we've written things out
我们始终会去更新这个flushedLSN，以此来弄清楚我们已经往磁盘中写入了多少日志
16:15 - 16:17
and then you can now start truncating the log above that
那么，你可以将这上面的日志截断
16.17-16.20
right because you're unlikely to need it in memory
因为你内存中不需要再放这段日志了


16:23 - 16:25！！！！
so let's talk about now we'll meet actually transactions 
So，我们来讨论下事务
16:27 - 16:30
so again every transaction is gonna be just a sequence of reads and writes  at the lowest level
So，对于每个事务来说，它们其实就对底层数据所做的是一系列读和写操作
16.30-16.34
 for recovery ,that's all we really care about 
对于数据库恢复来说，这些读和写操作也就是我们所关心的东西
16:34 - 16:37！！！
we don't know anything about sequel statements, when we're doing physical or physiological logging
当我们使用的是physical logging方案或者是physiological logging方案时，我们并不清楚关于SQL语句方面的任何事情
16:37 - 16:39
we just see reads and writes
我们看到的只是这些读和写操作
16:39 - 16:41
instead of these when the transaction finishes
当这些事务结束的时候
16.41-16.44
 it's finished when it's either be either commit or abort
当该事务提交或者被中止的时候，该事务就结束了
16:45 - 16:50
so the assumptions are gonna make to simplify our discussion today are the following 
So，为了让我们讲到的这些更容易理解，我们要做的假设如下所示
16:50 - 16:51
so the first is 
So，首先
16.51-16.54
that we're gonna soon that every log record can fit into a single page 
我们会假设所有的日志记录都能放在一个page中
16:55 - 16.57
alright and that just means that
这意味着
16.57-17.02
 we can do an atomic write on a page that has an you know all the contents of a single log record 
我们可以对一个拥有某条日志记录全部内容的page执行原子写入操作
我们可以将单条日志记录包含的所有内容都原子写入一个page中
17:02 - 17:05
we don't worry about our log records spanning multiple pages 
我们不用担心我们的日志记录跨了多个page
17:05 - 17:06
it's not hard to handle that 
这处理起来并不困难
17.06-17.08
you just have to add some checksum,
你只需添加checksum值
17.08-17.08
 and say this is you know 
并表示
17.08-17.12
this is what segments of this log record is on this page versus that page 
该page上的这个日志记录片段是什么，另一个page上这个日志记录片段是什么
17:12- 17:13
if you don't see both of them
如果你没有看到这两个片段
17.13-17.15
 then it's considered not to be atomic 
那么这个写操作就不具备原子性
17:15 - 17:17
but for our purposes we just assume it's a single page
但出于我们的目的，我们假设日志记录就是放在单个page上的
17:18 - 17:20 
we assume that we do four kilobyte page writes that are atomic 
我们假设我们对4kb大小的page所执行的写操作是具备原子性的
17:21 - 17:25
we're also going to assume that we're only doing single versioning in the database system
我们假设在数据库系统中，我们只会做单版本数据处理
17.25-17.27
and we just use strict 2PL
这里我们只使用严格两阶段锁（Strict 2PL）
17:27 - 17:30
so we don't worry about weird concurrency control anomalies 
So，我们不用考虑那些奇怪的并发控制异常
17:31 - 17:31
and as I said
正如我们所说的
17.31-17.37
before we're also doing steal no force just sort of implied is you have to have that in order for all this to work 
log Buffer管理策略上，我们也只选择steal +no force 
17:39 - 17:41
so when a transaction commits now 
So，当一个事务现在提交的时候


17:42 - 17:43
we do exactly what we did before
我们就会做和之前完全一样的事情
17.43-17.45
 we're going to write a commit record to the log 
我们会往日志中写入一个COMMIT记录
17:45 - 17:49
and once that commit record is durable and flush to disk 
一旦该COMMIT记录被持久化到磁盘
17:49 - 17:53
we can then tell the outside world that your transaction has successfully committed
那么，我们就可以告诉外界，你的事务已经被成功提交了
17:53 - 18:02
right because everything all the log records that that this transaction produced ,will have to get written to the log either with before this commit record 
因为我们知道该事务在COMMIT记录之前生成的所有日志记录都已经被写入到日志中了
18:02 - 18:03
so we know that everything is durable 
So，这样我们就知道，所有东西都被持久化了
18:06 - 18:10
the transaction internally though is not actually fully completed yet 
事务内部实际并未完全完成
18:11 - 18:13
so even though we told the outside world it's committed 
So，即使我们告诉外界该事务已经被提交
18:14 - 18:19
we could still maintain some internal metadata about what that transaction actually did 
我们依然可以去维护一些内部元数据，它们描述了该事务实际做了哪些事情
18:20 - 18:23
and we'll see this in a few more slides 
我们会在之后的一些幻灯片中看到
18.23-18.26
like will keep maintain a table that says here's all my active transactions 
比如，我们会去维护一张表（bookkeeping表），并表示这是我所有活跃的事务
18:27 - 18:35！！！
and when we actually complete all of that all the whatever metadata or internal bookkeeping, we need to have for that transaction
当我们真的结束事务的时候，我们需要针对这些元数据或内部bookkeeping表来做些与该事务相关的事情
18.34-18.35
when all that's done 
当这些都完成的时候
18:35 - 18:39
we're going to add a new special log record called the txn-end 
我们会去添加一条特殊的日志记录，即TXN-END
18:39 - 18:44
and this is just telling the database system in the log on recovery 
这就是在告诉数据库系统，在你恢复的时候，从log上面看到这条记录时
18:44 - 18:49
that we will never see anything else about this transaction ever again once we see this txn-end 
即一旦我们看到TXN-END，我们将再也看不到关于此transaction的任何其他信息
18:49 - 18:52
and therefore we can remove it from all our internal bookkeeping tables 
因此，我们可以将该事务从我们内部的bookkeeping表中移除
18:53 - 18:55
so unlike commit
So，和COMMIT不同的是
18.55-18.59
 where we we have to flush that to disk before we can tell the outside we've committed 
在我们可以告诉外界我们已经提交了该事务前，我们需要将它刷出到磁盘


18:59 - 19:03
we don't need to do a hard flush on or fsync on the txn-end 
我们不需要通过调用FSync立即将TXN-END刷出到磁盘
19:03 - 19:05
we did append it to a log buffer 
我们只需将它追加到一个log buffer中
19.05-*19.08
and it just gets written out as part of the normal process 
并且我们会通过正常的流程将它写出到磁盘


19:11 - 19:13
now this so just to see how this works 
So，我们来看下它是如何工作的
19.13-19.16
right so this is our simple demo 
So，我们来看个简单demo


19:16 - 19:20
so here we see we do a transaction commit, then we flush up the log
So，此处我们提交了一个事务，接着我们将日志记录刷出



19:20 - 19:27
right now we update the flushedLSN to now point to the last log sequence of last log record that we generated 
现在，我们会去更新flushedLSN，让它指向我们生成的最后一条日志记录的日志序列号
19:27 - 19:28
and now at this point
此时
19.28-19.32
 we can tell the outside world that our transaction is safe our transaction is durable is committed we're done 
我们可以告诉外界，我们的事务是安全的，并且被持久化了，也被提交了，这些工作我们都完成了
19:33 - 19:34
but then at some later point
但接着，在稍后的某个时间点
19.34-19.35
 we'll do some additional processing 
我们会做些额外处理


19:36 - 19:39
and then eventually we'll write out a txn-end message 
接着，最后我们会写出一条TXN-END消息
19:40 - 19:41
right and this is just saying 
这条消息的意思是


19.41-19.42
at this point in the log
在日志中的这个位置
19.42-19.43
 when we do recovery
当我们恢复数据库的时候
19.43-19.44
we will never see this transaction ever again
我们将永远不会再看到这个事务了
19:45 - 19:46
for commit
对于Commit来说
19.46-19.50
there's not that much there's not really anything we're gonna do special in between the commits in the end
在最后提交事务的时候，我们并没有做什么特别的事情
19.50-19.52
for the abort, we'll see why we're going to need this 
我们会看在事务中止的时候，我们为什么需要这个东西
19:52 - 19.54
and likewise, as I said before
同样，正如我之前所说的


19.54-19.57
since we know at this at this point, there's nothing really in here
我们知道，因为在这个位置处，其实啥也没有
19.57-20.00
we actually still need to have it hand around
我们实际上仍然需要将其交付
20.00-20.01
 like the commits already been flushed out 
就像提交已经被刷出到磁盘一样



20:01 - 20:05
we could just trim the log and and reclaim this memory and reuse it 
我们会截断这段日志，回收并复用这段内存
20:05 - 20:09
and that's that sort that ping pong effect I thought when we talked about last class when we did group commit 
这就是我们上节课讨论group commit时所提到的那种乒乓效应（知秋注：使用两个buffer pool来做来回的gc操作）
20:09 - 20:11
once  I know this log buffer is empty
一旦我知道这个log buffer是空的之后
20.11-20.12
because I flushed everything out 
因为我将里面所有的内容都刷出去了
20.12-20.14
then I can use that to fill it up again 
那么，我可以再次使用这个log buffer，并往里面添加数据
20:14 - 20:16
And then I read out the other buffer 
接着，我再去读取其他的buffer

20:18 - 20:20
so for abort 
So，对于事务中止来说
20.20-20.22
this is the me different than we did before, question
这和我们之前做的不同，有问题吗？

20:28 - 20:29
No
No
20.29-20.33
txn-end just as an internal marker for the recovery algorithm 
TXN-END其实是恢复算法中的一个内部标记
20:33 - 20:36
that's to say that you will never see this transaction ever again 
通过它你将永远不会再看到这个事务
20:39 - 20:43
you will never see any additional log records for this transaction 
你永远不会看到与该事务有关的任何额外日志记录
20:44 - 20:47
because we've seen abort it'll make more sense when we do abort 
当我们讨论事务中止的时候，你们会更能感受到它的作用
20:47 - 20:48
because there's stuff that you do after aborts
因为当事务中止后，你还要做些其他事情
20.48-
that be the outside world doesn't see, it's not like a query you executed 
外界无法看到这些东西，它并不像是你所执行的那些查询
20:52 - 20:54
but it's stuff we have to do to reverse the changes
但我们需要做些处理来撤销这些修改
20.54-20.56
it'll yeah give me a few more slides, yes
我会在之后的幻灯片中讲这些内容，请讲
21:03 - 21:05
Disk write so what 
磁盘写入方面有什么问题吗？


21:09- 21:12
right so at this point here when does it get flushed out 
So，在此处，当这个page被刷出去的时候
21:13 - 21:16
and it's the buffer pool replacement policy, right 
你问的是buffer pool的替换策略吧
21:17 - 21:18
what 2 wayit's right ,
两种方式
21.18-21.21
so one is you need to free up space
So，其中一种是，当你需要释放空间时
21.21-21.24
you have to evict to page its mark dirty you flush it out
你需要将那些标记为dirty的page刷出去
21:24 - 21:26
the other one could be the background writer
另一种方式则是使用background writer
21.26-21.27
 which I think we talked about it briefly 
我觉得我们之前有简单讨论过
21:28 - 21:34
and some database systems they'll just be a separate  you have a separate process or thread in the background
有些数据库系统在后台会有一个独立进程或者线程
21:34- 21:38
that occasionally walks through the buffer pool finds all the dirty pages 
它们偶尔会去遍历下buffer pool，然后找到所有的dirty page
21:38 - 21:40
and then just write them out ahead of time,
然后，提前将这些dirty page写出到磁盘
21.40-21.42
 it doesn't a victim it says, hey let me write you out 
它表示，我会将这个page写出到磁盘
24.42-21.44
and then I flip your bit to say you're not dirty anymore
接着，我会翻转你的bit，以此来表示这个page不再是dirty page了
21:44 - 21:46
so that way when the buffer pool replacement policy runs 
So，当buffer pool的替换策略执行的时候
21:47 - 21:48
and it wants to evict a page 
它想去移除buffer pool中的某个page
21.48-21.52
,hey I got one that's marked clean, I can just drop it not have to write it out 
它表示：hey。我看到一个标记为clean的page，我可以将这个page移除，而不是将这个page写出到磁盘
21:55 - 21:56
but that's independent of what we're talking about here 
但这和我们这里所讨论的东西无关
21:57 - 21.58
right that's again in some ways
某种意义上来讲
21.58-22.00
 that's the beauty of the write-ahead log is that 
预写式日志的魅力在于
22:00 - 22:07
we  can separate the policy other than what we have we have big things other we making sure, we don't have big things that there's no log record out the disk or 
在确保我们没有什么大问题（即没有将日志记录写出到磁盘）外，我们可以将策略分离，
22:08 - 22:12
we can separate that decision process from the write-ahead log part 
我们可以将决策过程与预写日志部分分开
22:15 - 22:15
yes sorry
请讲
22:20 - 22:20
Correct
说的没错
22.20-22.21
 so the statement is
So，他所说的是
22.21-22.23
 if the flushedLSN is less than the pageLSN 
如果flushedLSN小于pageLSN
22:23 - 22:25
then you can't evict that page
那么，你就无法移除这个page
22.25-22.31
, because you know that whatever this thing the last log record you wrote out is prior to this one
因为你写出的最后一条日志记录（flushedLSN）是在这个日志记录（pageLSN）之前
22:31 - 22:32
so therefore 
因此
22.32-22.35
the log records that modify this page is not out on disk yet 
修改这个page的日志记录并未落地到磁盘
22:41 - 22:42
so this question is 
So，他的问题是
22.42-22.45
if your victim policy is running 
如果你的Victim policy（受害者策略）执行的时候
22:45 - 22:45
you say
你会说
22.45-22.53
 oh my flushedLSN is is less than all the pageLSN  all the dirty pages in my log 
我的flushedLSN要比我日志中所有dirty page相对应的pageLSN都要小
22:53 - 22.55
sorry your data pages in my buffer pool,
抱歉，你的data page都是在我的buffer pool中
22.55-22.58
all my pages my buffer pool are dirty
我buffer pool中的所有page都是dirty的
22.58-22.59
 what do I do
我该做什么呢？
22.59-23.00
 you have to stall 
我们需要停下来
23:00 - 23:01
you have to write up a disk 
你需要将这些page写出磁盘
23.01-23.03
you can't there's nothing else you could do 
除此以外，你啥也做不了
23:05 - 23:08
and that's what the background writer supposed to be it's sort of like 
这就是background writer所试着做的事情
23:08 - 23:10
if I know I have some idle IO cycles
如果我有一些闲置的I/O cycle
23.10-23.12
 I could write this things out ahead of time 
那么，我就可以将这些东西提前写出到磁盘
23:12 - 23:13
so I don't have to stall
So，我无须进行等待
23.13-23.15
I'm not on the critical path as I execute transactions 
在我执行事务时，我并没有在关键路径上（指的是这样做，不会影响我们前台所做的事情）
这些事情并不会影响我正在执行的事务
23:16 - 23:18
right again the worst thing you could do is 
你所能做的最糟糕的事情是
23.18-23.19
I'm running a transaction 
当我执行一个事务时
23.19-23.21
it acquires a bunch of locks 
它会去获取一堆lock
23:21 - 23:22
then I have to do a bunch of disk i/o
那么，我就需要去做一大堆磁盘I/O
23.22-23.26
because now that just the backs everybody up and everything it's slower
因为它会将所有数据进行备份，这样它们的速度就会变得更慢
23:26 - 23:28
so they if I can do some things in the background 
So，如果我可以在后台做一些事情
23:28 - 23:32
now it's not on the critical path while I'm holding locks and transactions can complete more quickly
现在，它就不会影响前台性能，当我拿着lock时，事务可以以更快的速度完成
now，它就不会影响食物事务的执行，当我拿着lock的时候，事务可以以更快的速度完成
23:33 - 23:39
and but how you balance that between like flushing this ,flushing the the log ,flush flushing the background stuff 
我们该如何在刷出这个表数据、刷出日志、后台进程刷出操作这几者间取得平衡呢？
23:39 - 23:41
that's the tricky thing that database systems have to figure out 
这是数据库系统必须解决的一个棘手问题
23:42 - 23:43
we don't let the OS do it for us 
我们不会让OS来为我们处理这些

23:45 - 23:46
okay

23.46-23.48
so for aborts
So，我们来讲下事务中止
23.48-23.54 ！！！！
aborts are gonna be serve a special case we're gonna have under ARIES
事务中止其实是ARIES下我们所遇到的一种特殊案例
23.54-23.58
 , where we're gonna reverse changes for transactions 
我们会去撤销这些事务所做的修改
23:59 - 24:07
but we're actually going to end up adding log records to keep track of that we will we have reversed those changes 
但实际上，我们会通过添加日志记录来跟踪我们撤销了哪些修改
24:08 - 24:10
this is way different than we talked about so far
这和我们之前讨论的不同
24.10-24.13
 like every time we said oh we abort a transaction rollback its changes 
比如，每当我们中止一个事务，我们就会去回滚它所做的修改
24:13 - 24:15
we just assume that we can undo some stuff in memory 
我们假设我们可以撤销内存中的某些东西
24:16 - 24:21
right now we need to keep track of everything that we're doing as we reverse transactions
当我们撤销事务所做的修改时，我们需要去跟踪我们所做的所有事情
24:22 - 24:27
so we're gonna add an additional field to our our log records called the prevLSN
So，我们会往我们的日志记录中添加一个额外字段，即prevLSN
24:28 - 24:29
and this is not required 
它不是必须的
24.29-24.32
but this is just gonna make your life easier at runtime 
但这会让你在运行时处理起来更为容易
24:32 - 24:36！！！！！！！
because now you can know how to jump back to find the next thing you need to reverse for a given transaction 
因为通过它，你就可以知道该如何往回跳找到你需要用来撤销一个给定事务的东西
24:37 - 24:39
I to avoid have a sort of scanning everything 
以此避免去扫描所有的日志记录
24:39 - 24:39
essentially 
本质上来讲
24.39-24.40
you think of this as like
你可以这样想
24.40-24.42
 for every transaction you're generating a linked list to say,
对于每个事务来说，它们会去生成一个链表
24.42-24.44
 for every aborted transaction
对于每个被中止的事务来说
24.44-24.46
, here's the linked list up, here's all the changes I need to reverse
这里有一个链表，链表中保存了我需要撤销的所有修改
24:46 - 24:50
so I need to I know how to walk back in one by one and reverse them 
So，我需要知道我该如何回过头去逐个撤销这些修改

24:52 - 24:54
so we have our simple transaction like this
So，这里我们有一个简单事务
24.54-24.57
 again now we have the LSN and prevLSN 
现在，我们有LSN和prevLSN
24:58 - 25:03
and so for the first LSN for the first log record for this transaction t4
对于事务T4的第一条日志记录来说
25.03-25.07
 ,since there's no prevLSN at the begin statement 
因为在BEGIN语句中，并没有prevLSN
25:07 - 25:10
we just set the prevLSN to nil
我们只需将这个prevLSN设置为nil

25:11 - 25:12
so this transaction runs
So，这个事务开始执行
25.12-25.13
 it makes some changes
它做了一些修改
25.13-25.15
but then it aborts
但接着，T4被中止了

25:15 - 25:19
so now what we need to do is reverse those changes
So，现在我们需要做的就是撤销这些修改
25:19 - 25:21
I'm going to add log entries for these
我要为这些操作添加日志记录
25:22 - 25:26
and then once we know all those log entries have been are durable out in a disk 
接着，一旦我们知道所有的日志条目都被持久化到磁盘后
25:27 - 25:29
we can then add the txn-end message 
那么，我们就可以往log buffer中添加TXN-END消息
25:29 - 25:30
again this is what I was saying
这就是我之前所说的
25.30-25.35
this is saying that the transaction MS is denoting 
这条事务消息表示
25:35 - 25:38
that there's nothing else that it could ever come about this transaction later on 
这条消息之后不会再出现与该事务相关的日志记录
25:38 - 25:42
we've reversed I've done everything we've needed to do 
我们已经撤销了我们需要撤销的所有东西

25:43 - 25:44
so for this part here 
So，对于这部分来说
25.44-25.50
when you're talk about know how we actually record the changes, that were reversing as we go along 
当我们撤销这些修改时，我们该如何记录这些撤销动作呢？

25:50 - 25:54
so these are called compensation log records or CLRS
So，这被叫做补偿日志记录（Compensation Log Record）或者称之为CLR
25:54 - 25:57
so CLR is just it's like an update record 
So，CLR就像是一条更新记录
25:57 - 26:01
but it's reversing the change of a an actual update record when the transaction actually ran
但它会去撤销事务执行时所写入的更新记录
26.01-26.02
 yes 
请讲
26:04 - 26:04
yes

26:13 - 26:14
so your question is 
So，你的问题是
26.14-26.15
why do we even have the prevLSN,
我们为什么需要这个prevLSN
26.15-26.17
 what is this actually buying us 
它为我们实际做了哪些事
26:21 - 26:24
yeah her question your statement is 
So，她所说的是
26.24-26.27
could you just check for this simple example just find all the things that are t4 
在这个简单例子中，我们是否能找到与T4相关的所有东西
26:28 - 26:30
and then just figure out those things I need reverse
并弄清楚我需要撤销哪些东西
26.30-26.31
, yes 
没错，是这样的
26:31 - 26:35
but what if I'm running like a high-end system is doing a million transactions a second 
但就拿高端的数据库系统来说，每秒钟它可以处理一百万个事务
26:36 - 26:36
and I crash
接着，系统发生了崩溃
26.36-26.39
 now I have at any given time ,when I crashed
在任意给定时间点，如果我发生了崩溃
26.39-26.42
 I could have maybe a hundred thousand transactions in flight 
在运行时，我可能这10万个事务出现了问题
26:42 - 26:46
so to avoid having to scan everything over and over again to find ,you know exactly what I need to reverse 
So，为了避免通过反复扫描日志来弄清楚我需要撤销哪些操作
26:47 - 26:48
this is just a helper to get us there 
prevLSN对我们的帮助很大
26:49 - 26:52
so it's not required for correctness， it's could use it for convenience 
So，对于正确性来说，它不是必需品，但通过它，我们处理起来会很方便
26:55 - 26:55
yes
请问
26:58 - 26:59
why do we need to reverse 
我们为什么需要撤销？
27:02 - 27:03
so for this example no 
So，在这个例子，答案是No
27:05 - 27:09
but how do you know  in real life in real system 
但在真正的系统中，这是怎么样的呢？

27:09 - 27:10
what did I say, I said 
我说过
27.10-27.13
we we don't know we're not logging what pages we write to disk 
我们并没有记录我们往磁盘中写入了哪些page
27:13 - 27:15
we don't know anything about what we've got written to disk 
我们不清楚我们已经往磁盘中写入了哪些东西
27:15 - 27:18
because the eviction policy is doing its own thing 
因为移除策略自己在做自己的事情
27:18 - 27:21
that's why we're gonna play it safe I'm just reverse everything 
这就是为什么我将所有修改撤销是安全的原因所在了
这就是为什么我要保证安全的玩耍的原因所在，我就是要撤销那些需要撤销的修改。

27:24 - 27:27
so the CLR again it's gonna be like an update log record
So，CLR就像是一条更新日志记录
27.27-27.31
, where it's gonna have before and after value
它里面会存放一个before value以及一个after value
27:31 - 27:36
but it's gonna be tied to an update record that actually occurred during the transactions regular life time 
但每条CLR会和事务正常执行时已经执行的每条更新记录相对应

27:37 - 27:38
and then we're gonna have this undo next pointer
接着，我们会有这个undoNext指针
27.38-27.40
which again just for convenience
出于方便起见
27.40-27.42
 who can tell us what's the next LSN that we need to reverse 
它可以告诉我们需要撤销的下一个LSN是什么
27:43 - 27:48
so that we know you know for every given transaction 
对于每个给定事务来说

27:48 - 27:52
we would know whether we've actually processed all the ones ,we need we need the process to reverse all this changes 
通过它，我们会知道我们是否已经处理了我们所需要撤销的所有修改
27:53 - 27:56
so the CLR is gonna be added to the log just like any other log record 
So，就和其他日志记录一样，CLR会被添加到日志中
27:56 - 28:00
but they're gonna be added after the transaction gets aborted
但它们会在事务被中止之后添加到日志中
28:01 - 28:05
and then once we went through reverse everything then we add the txn-end
接着，一旦我们撤销了该事务所做的所有修改，那么，我们就会往日志中添加TXN-END
28:05 - 28:06
so unlike commit 
So，和COMMIT不同
28.06-28.07
with commit
如果是COMMIT
28.07-28.12
I have to flush all the log records to disk, before I tell the outside world I've committed
在我告诉外界该事务已经被提交前，我必须将所有的日志记录刷出到磁盘
28:12 - 28:13
if a transaction gets aborted
如果一个事务被中止了
28.13-28.16
 ,we immediately go back to the applications that you were aborted
我们会立刻回过头去告诉应用程序，这个事务被中止了
28:16 - 28:19
they don't need to wait around to to write anything up the disk
它们无须去等待将任何东西写入到磁盘
28.19-28.20
, because who cares 
因为没人会去注意这些被中止的事务
28:21 - 28:26
right they try to go read that their changes not real to do that, as long as we're running with the concurrency control protocol
只要我们使用并发控制协议，他们就会尝试读取它们的更改不是真的更改了
28:27 - 28:30
so the CLR just get logged any other record
So，就像其他记录一样，CLR会被记录到日志中
28.30-28.33
and then they just get flushed out ,you know eventually it's at some point
接着，最终在某个时候，它们会被刷出到磁盘

28:35 - 28:36
so let's look an example
So，我们来看个例子
28.36-28.37
 how we're gonna use CLRS 
我们该如何使用CLR
28.37-28.40
and so because I'm running out of space on the slide 
因为我幻灯片上的空间不够了
28:40 - 28:42
because we have so many so many metadata fields
因为我们其实有很多元数据字段能展示
28.42-28.44
I'm now going to show this in a tabular form 
我现在以这种表格的方式向你们展示
28:44 - 28:46
so here we have one transaction t1
So，这里我们有一个事务T1
28.46-28.47
it just does an update on A
它对A进行更新
28:48 - 28:49
all right, and then it aborts 
接着，该事务被中止了
28:49 - 28:51
we don't care how how it aborted 
我们不会去关心该事务是怎么被中止的
28.51-28.56
whether the the transaction application said to abort, or the database systems concurrency control protocol said to abort it 
不管是应用程序中止了该事务，还是数据库系统的并发控制协议中止了该事务
28:56 - 28:57
we don't care
我们并不在意这些
28.57-28.57
 it's all the same
结果都是一样的，那就是这个事务被中止了


28:58 - 29:00
so now when we want to start undoing its change
So，现在当我们想开始撤销它所做的修改时
29.00-29.03
right this is during the regular execution time 
这是在正常执行时处理的
这个动作发生在我们平常正常的程序执行过程中
29:03 - 29:04
this is not during recovery
而不是在数据库恢复时处理
29.04-29.06
 this as we're as processing transactions 
即当我们处理事务的时候去撤销这个被中止事务所做的修改

29:06 - 29:08
we're gonna create a CLR entry
我们会去创建一个CLR条目(知秋注：注意Type)
29.08-29.12
 ,that's gonna be tied to the the update bet it did 
它会和该事务所执行的一个更新操作相关联
29:12 - 29:14
and again it looks exactly like the first one
它和第一条记录看起来很像
29.14-29.16
it's just that the before and after values were reversed 
只是before value和after value的值互相换了一下
29:17 - 29:20
so before the value was 30 and then after the update was 40 
So，在第一条记录中before value的值是30，after value的值是40

29:20 - 29:25
so now what we're doing in a reversal or setting the the old value back to 30
So，我们所做的就是将A变为老值，即30
29:27 - 29:27
right 


29:28 - 29:30
and then we had this UndoNext record
接着，我们有这个UndoNext记录
29.30-29.32
 that LSN that says
这个LSN表示的是
29.32-29.2
what's the next thing we need to undo to completely reverse this transaction 
我们需要去撤销的下一个目标修改条目，以此来完全撤销该事务所做的修改
29:35 - 29:37
but in this particular example here
但在这个例子中
29.37-29.40
 the undoLSN goes to the begin statement 
这个undoLSN指向的是这条BEGIN语句
29:40 - 29:43
so we know there's nothing else for us to reverse for this transaction 
So，我们知道我们无须再去做任何事情来撤销这个事务

29:43 - 29:46
so we can go ahead and add our txn-end record 
So，我们可以去添加我们的TXN-END记录
29:48 - 29:48 
yes
请问
29:58 - 29.58
this question is
他的问题是
29.58-30.04
 did I say that when you abort, you can immediately go back to the application and say your transaction aborted 
我说过，当你中止该事务，你就会立刻回过头去告诉应用程序，你的事务被中止了
30:04 - 30:07
and that you don't have to write flush any of these things out to disk
并且你无须往磁盘中写入任何数据
30.07-30.08
correct
说的没错
30.08-30.08
yes 
请问
30:17 - 30:18
His statement is
他说的是
30.18-30.19
 I said that
我之前说过
30.19-30.21
 if you really tell the outside world you aborted 
假设你告诉外界你的事务已经被中止了
30:22 - 30:25
but then you create these log records
但接着，你创建了这些日志记录
30.25-30.26
you reverse the changes 
你撤消了这些修改
30:26 - 30:27
But then you crash 
但接着，你崩溃了


30:30 -30:31 
up here 
你在这个位置发生了崩溃
30:34 - 30:34
you're right
你说的没错
30.34-30.36
so you yeah you can lose these
So，你会丢失这部分数据
30.36-30.37
do we care
我们在意这些吗？
30:40 - 30:41 
he's shaking his head no why 
这位同学摇了摇他的头，看来他说的是No，能讲下原因吗
30:45 - 30:47
well yes you're gonna abort it
没错，你中止了这个事务
30.47-30.49
 but like something more fundamental 
但我想要的是更为基础的回答
30:52 - 30:52
correct
没错
30.52-30.57
 so the the page that got modified ,but this transaction is not on disk 
So，修改该page的事务并未落地到磁盘
30:57 - 30:58
so who cares 
So，没人会在意这点
31:03 - 31:04
half of what sorry 
一半的什么？能重复下么
31:09 - 31:09
yes 
Yes
31:11 - 31:12
who cares
谁会去在意这些东西呢？
31:19 - 31:20
can you undo it 
你能撤销它们吗？
31.20-31.21
because they didn't commit right 
因为它们并没有被提交
31:23 - 31:25
so again we'll see this when we do a for example 
So，我们会在演示例子的时候，再次看到你说的这些东西


31:25 - 31:27 ！！！！！！
if I don't see if I crash here 
如果我在这个位置崩溃
31:28 - 31:32
and I don't see what was the final determination of the transaction where the committed aborted
我就不会知道这个事务最终是被提交还是被中止了
31:32 - 31:34
it aborted right 
这里它是被中止了
31:35 - 31:36
that's the beauty of the write-ahead log
这就是预写式日志的魅力所在
31.36-31.41
this is a single source location to tell us, what was the final outcome of what happened in the transaction 
即这个单一来源位置会告诉我们该事务最后发生的事情是什么


31:41 - 31:43
so we got here, say we got here 
So，假设我们到了这里
31:44 - 31:45
and we aborted
然后，我们中止了这个事务
31.45-31.46
we tell the WAL we aborted 
我们告诉WAL，我们中止了这个事务
31:48 - 31:50
we crash before we do all this stuff 
在我们做这些事情之前，我们发生了崩溃
31.50-31.51
who cares 
谁会去在意这种事情呢？
31:51 - 31:52
because the transaction got aborted .
因为该事务被中止了
31.52-31.55
,we don't have to guarantee anything's durable 
我们不需要去保证与该事务有关的东西被持久化
31:55 - 31.57
we come back  and it wasn't there
当系统恢复正常的时候，这些东西就不见了
31.57-31.59
because we'll reverse any changes that could have gotten written up to disk
因为我们会去撤销所有可能已经被写入到磁盘的修改
32:03 - 32:04
correct
说的没错
32.04-32.06
so if the page got written to disk
So，如果该page被写入到磁盘
32.06-32.09
you would have seen you have to see all these things anyway 
你就会看到所有这些东西
32:09 - 32:12
so we know how to put it back in the correct state if necessary,
So，如果有必要的话，我们知道该如何将这些东西回归正轨
32.12-32.14
 yes 
请问
32:22 - 32:24
here yes so so say 

32:26 - 32:30
all right so say they said they told us roll back from the terminal from from the application 
So，假设Terminal或者应用程序告诉我们，它们要回滚这个事务
32:30 - 32:36
then we could append this log record into the write-ahead log in memory,
那么，我们可以将这个日志记录追加到内存中的预写式日志里面去
32.36-32.39
 go back and immediately  tell them that it aborted 
回过头去，并立刻告诉它们，这个事务已经被中止了
32:39 - 32:41 
and then now start cleaning up all its internal changes 
接着，现在开始去清理该事务内部所做的修改
32:42 - 32:48
right so we don't have to wait to do any clean up all the things that it modified 
So，我们无须去等待清理这些东西的工作完成
32:48 - 32:49
we can tell them it abort it right away
我们可以直接告诉它们，我们中止了该事务
32:55 - 32:58
I commit again commit says I have commit it

32:58 - 33:01
if the DBMS tell you you committed
如果DBMS告诉你这个事务已经被提交了
33.01-33.03
 ,it has to guarantee that everything's durable 
它需要去保证所有东西被持久化了
33:03 - 33:11
so it has to be ready any log record ,that that corresponds to the changes that it made has to be written a disk upon the commit 
So，当事务提交的时候，它需要确保与这些修改相关的日志记录已经落地到磁盘
33:11 - 33:13
we don't care about txn-end
我们不会去在意这个TXN-END
33.13-33.14
that's internal for us 
这是我们内部的东西，与外界无关
33:17 - 33:18
immediately come back yes 
每次，我们会立刻回过头去这么做
33.18-33.20
,I think about why like who cares that I aborted
我觉得，谁会去在意我这个事务中止了呢？
33.20-33.24
why do I care that you're gonna go do much I stopped to clean things up 
为什么我要去停下来等你清理完这些修改呢？
33:24 - 33:25
why should I wait for that 
我为什么需要等待这种事情完成呢？
33:33 - 33:34
so this question is,
So，他的问题是
33.34-33.41！！！！！！！！
 for any if any transaction wants to modify the same page that got modified by abort of transaction 
如果任意一个事务想要对一个page进行修改，该page已经被中止事务所修改
33:41 - 33:50
do they need to wait until the the log record that modified it got written out the disk 
它们是否需要等待，直到修改该page的那些日志记录被写出到磁盘？
33:51 -33:51
no
答案是No
33:53 - 33:58
right because if I like say I abort here I say this is in a page A
假设我中止了对该page中对象A的操作


33:59 - 34:00
I abort here 
我在这里中止
34.00-34.05
I can immediately release what it can to assuming today's locking, I release the write lock I have on that page 
假设我可以立刻释放该page上的这个lock
34:05 - 34:08
any now other transaction can come along start modifying it 
那么，其他事务就可以开始对该page进行修改
34:09 - 34:10
so they start modifying
So，它们会开始修改这个page
34.10-34.11
 what is that going to do,
它们会做什么呢
34.11-34.13
 that's gonna create new log records
它们会去创建新的日志记录
34.13-34.15
 bump up the pageLSN for my page 
并撞上这个page的pageLSN
34:16 - 34:17
and therefore 
因此
34.17-34.23
that page can't be written out the disk until my new log records now written out to the disk 
直到我的新日志记录被写出到磁盘，该page才能被写出到磁盘
34:23 - 34:26
so who cares this is of the transaction modify 
So，谁会去在意这个被中止的事务所做的修改呢？
34:38 - 34:40
Yeah,you you correct
你说的没错
34:41 - 34:49
if I try to read the the change may from an aborted transaction 
如果我试着去读取一个被中止的事务所做的修改
34:49 - 34:52
I have to reverse them，yes  before I'm allowed to read
在我被允许去读取这些数据前，我就需要撤销这些修改


34:58 - 35:00
when we say written a disk of written a memory 
你说的是写出到磁盘还是写入内存
35:01 - 35:04
yeah sure yes, you have to yes you'd have to reverse that
没错，你需要撤销这些东西
35.04-35.06
I mean that's true always 
我的意思是，这种说法永远是对的
35:11 - 35:14
if it's single version yes, multi version no 
如果这里是单版本，答案就是Yes，如果是多版本，那答案就是No
35:14 - 35:17
Because multi versioning right who cares
因为如果是多版本的话，没人会去在意这个
35:17 - 35:19
because you now you just have a version that doesn't exist anymore 
因为你现在拥有的是一个不再存在的数据版本
35:21 - 35:21
you ignore it 
你将它忽略
35:25 - 35:26
yes in single version yes
在单版本中是这样的
35.26-35.27
you'd had to reverse these things yes 
你需要撤销这些东西
35:29 - 35:29
yes 
请问
35:49 - 35:50
Yeah statement is 
他的说法是
35.50-35.52
let's say I have a transaction 
假设我有一个事务
35.52-35.54
that makes a lot of updates
它对数据库进行了大量更新
35.54-35.59
have the updates get you you apply all the updates 
并且你提交了所有更新
35:59 - 36:03
but half of them got written out to disk 
但只有一半更新被落地到磁盘
36:04 - 36:07
how do I reverse those changes now they're out on disk 
我该如何撤销这些已经落地到磁盘的修改呢？
36:07 - 36:08
and it because it's the steal policy 
因为我们使用的是Steal策略
36.08-
I'm a lot of commits, right ，I'm rather flush out dirty pages, yes 
我有很多提交，right ，我会有刷出dirty pages
36:12 - 36:15
you'd have to bring them back in and reverse them 
你需要将它们放回来，并撤销这些修改
36:16 - 36:17
when you actually do that 
当你实际做这件事的时候
36.17-36.18
whether you do that immediately on abort 
你是否要在事务中止的第一时间来做撤销这件事
36.18- 36:26
or whether you do that you know lazily like oh when somebody the next time someone goes to reads it then I'll reverse it
或者你可以之后再做，就好比当有人在未来某个时间去读这块的数据时，我再去撤销此处的修改



36:28 - 36:28
yes 
请问
36:31 - 36:31
I love this question
我很喜欢这个问题
36.31-36.40
 there is some dude on YouTube complain like, like professor Pablo, I like your class, I like the material 
有些老兄在Youtube上表示，我喜欢你的课，我喜欢你提供的材料
36:40 - 36:43
but all those pesky students keep interrupting me asking questions bad dude right 
但总有些讨厌的学生会一直打断我，问我各种问题，这帮人太坏了
36:45 - 36:46
let him begin to CMU and come ask questions 
让他们自己来CMU，来问我问题吧

36:47 - 36:50
all right

36.50-36.52
so now for our abort algorithm we've already said this 
So，我们已经讨论过我们的中止算法了
36:52 - 36:55
we're gonna write a abort record to the log for the transaction
我们会为事务写一个ABORT记录，并添加到日志中
36:55 - 37:00
and then we're gonna play back the transaction updates in reverse order for the transaction 
然后，我们会以相反的顺序去执行事务的操作
37:00 - 37:03
and then for everything in that we're going to reverse 
接着，对于我们要去撤销的所有东西来说
37:03 - 37:04
we add a CLR entry to the log,
我们会往日志中添加一条CLR条目
37.04-37.07
 it's tied to the original update that occurred during normal operation 
它会与正常操作期间所执行的更新语句所绑定
37:08 - 37:09
and then we restore the version of value
接着，我们恢复该数值的版本
37:09 - 37:17
and then once we complete all these transaction these CLRS ,once we've done them all they need to do for this transaction 
一旦我们添加完该事务中这些对应的CLR记录
37:17 - 37:19
then we can add the txn-end message 
那么，我们就可以添加这条TXN-END消息
37:20 - 37:22
so CLRS will never need to be undone 
So，我们永远不需要去撤销CLR
37:25 - 37:29
well we could only redo them during recovery 
Well，我们只有在恢复过程中才会去重新执行它们
37:30 - 37:32
because it's like a one-way update 
因为它就像是某种单向更新

37:35 - 37:35
okay 

37.35-37.38
so now right so what have you covered so far, now we know we have log sequence numbers 
So，这就是目前我们今天已经介绍的东西，我们已经介绍了日志序列号
37:39 - 37:40
we have these CLRS 
我们拥有这些CLR
37.40-37.45
,and we know do how to keep track of the LSN's at various locations for us to figure out ,what has been written out the disk or not 
我们知道该如何跟踪这些不同位置处的LSN来弄清楚哪些东西被落地到磁盘
37:46 - 37:51
so now let's talk about,how we're going to bring along some additional metadata to figure out ,what was running at the system at the time 
So，现在我们来讨论下如何通过一些额外的元数据来弄清楚系统此时在做什么
37:51 - 37:54
and use it a better checkpointing scheme 
并使用一个更好的checkpoint方案
37:54 - 37.56
so in last class I said that
So，在上节课的时候，我说过
37.56-38.03
 checkpoints are necessary for us to be able to figure out at ,what point can we figure out at, what point can we start recovering the database 
checkpoint对于我们来说是必要的，我们可以通过它来弄清楚我们从日志中哪个位置来开始恢复数据库
38:03 - 38:04
because without checkpoints
因为如果没有checkpoint
38.04-38.07
we potentially have to go look through the entire log 
我们可能就得去查看整个日志
38:07 - 38:09 
if we have one year's worth a log with no checkpoints 
如果我们的日志是一年份的，并且它里面没有checkpoint
38:10 - 38:12
we may have the potential replay one year's worth for the log
我们可能就需要重新执行这一年份的日志
38.12-38.15
, which could take a long time 
这很花时间
38:15 - 38:17
so let's look at two bad ways to take checkpoints
So，我们来看下制作checkpoint的两种糟糕做法
38:18 - 38:20
and we'll see why fuzzy checkpoints are the better way 
并且我们会去看看为什么fuzzy checkpoint是一种更好的方法

38:20 - 38:23
so I discuss one of these bad ways last class 
So，我在上节课的时候讨论过其中一种糟糕的方法
38:24 - 38:24
and I said
我说过
38.24-38.35
 the technique we were going to use was to just halt the execution of of any new transaction  and then  take the checkpoint 
我们所使用的技术会让所有的新事务（知秋注：新事务，重点！！）停止执行，接着，再去制作checkpoint


38:35 - 38:41
and this will guarantee that my pages they're written out the disk, as part of that checkpoint are are consistent 
这能保证我们要写出磁盘的page，从checkpoint 角度来说，具备了一致性
38:41 - 38:45
there's no torn updates from a transaction that was running halfway through right 
在制作checkpoint的过程中并不会发生事务更新修改操作
38:45 - 38:49
so basically what happens is on the on the front end on the network network layer 
So，简单来讲，这里所发生的是，在前端和网络层处
38:49 - 38:51
we halt the execution of any new transaction 
我们停止了任何新事务的执行
38:51 - 38:56
and then we just wait for all our workers to finish executing any transaction that's already running 
接着，我们等待所有已经在执行事务完成它们手上的工作
38:57 - 38.58
so this is obviously bad 
So，显然，这很糟糕

,because we we have to wait until everybody ,you know to all its transaction to finish 
因为，我不得不等待，直到所有这些已有的事务结束
39:04 - 39:05 
we can't start executing anything new 
我们无法开始任何新事务的执行
39:05 - 39:08
so we have one transaction it's gonna take five hours to run 
so 如果这个过程中，我们有一个事务，它会消耗5个小时来执行
39:09 - 39:13
they've made the wait for the five hours to finish wait for it to finish ,before we go ahead and take our checkpoint 
那在我们执行新事务之前，就要等它5个小时，直到它结束位置，并得到我们的checkpoint 
39:13 - 39:16
and then during that time we can't execute any other transaction 
这期间，我们无法执行任何其他的新事务
39:16 - 39:19
so our system looks completely unresponsive 
so 我们的系统看起来就像一个完全无响应的服务器一样
39:19 - 39:22
from a recovery standpoint ,this is this is this is great 
从恢复（recovery）的角来看，这种方式是极好不过的
39:22 - 39:25
because the the checkpoint is consistent as I said 
就像我说的，因为checkpoint 具备一致性的特性
39:25 - 39:31
there's no intermediate updates it's exactly as it was ,when you know it only contains changes from committed transactions 
这里没有发生中间更新 ，确切的说，它只包含那些已提交事务的修改

39:32 - 39:41
so a slightly better way to do this would be to pause transactions while they're running  while we take the checkpoint 
so 稍好一点的方法是当我们要得到checkpoint时，在事务运行时暂停事务



39:42 - 39:47
so we're going to mean what this is any transaction has a query that's modifying the database 
so 意思就是任何要修改数据库的查询事务
39:48 - 39:52
we just pause it,any time they try to acquire a write latch on a page 
我们就是要暂停它，每当他们尝试获取某个page上的写锁时
39:52 - 39:54
we don't we prevent that and they have to stall
我们不阻止，但他们必须得等
39:56 - 40:00
any read-only transaction can still run ,they can read whatever they want ,because that doesn't interfere with that checkpoint 
那些只读事务依然可以运行，它们可以读任何它们想读的，因为这不会干扰该checkpoint的制作



40:01 - 40:05
and then there's concurrency control protocol up above to figure out whether they're allowed to read certain things
然后这里有一个并发控制协议，依据它来确定是否允许它们（知秋注：指读事务）读取某些内容
40:05 - 40:10
we can ignore all that ,but it's all the write transactions, we're just gonna we're just gonna pause them 
我们可以忽略所有这些，但对于所有这些写事务，我们要做的就是暂停它们


40:11 - 40:12
so it would look something like this 
so 它看起来像这样


40:12 - 40:14
so say I have in memory I have three pages
So，假设在内存中，我有3个page
40.14-40.17
 I have a transaction that checkpoint would occur at the same time 
我有一个事务在运行，与此同时，发生了checkpoint 操作
40:17 - 40:20
so say this transaction is going to update page #3 and page #1 
so 这个事务说，我要去更新 page #3 和 page #1

40:21 - 40:25
so there's going to start at the bottom here, apply its change to page #3 
so 这里会从底部开始，对 page #3 数据进行修改

40:25 - 40:28
and then before it can update page #1 ,the checkpoint starts 
然后，在它更新page #1前，checkpoint 开始了
40:28 - 40:30
so we have to stall our transaction
so 我们必须将事务停下来
40:30 - 40:35
right because gonna try to acquire the write latch on that page #1, you can't do that, because the checkpoints occurring 
因为该事务会去尝试获取有关page #1的写锁(write latch)，你不能这么做，因为此时，checkpoint发生了
40:35 - 40:36
so it just stalls 
so 该事务就停下来了
40:37 - 40:43
so now the checkpoint all it's really doing is just a sequential scan or a scan or every single page and our buffer pool 
so 现在，checkpoint真正要做的就是对每个页面和缓冲池的顺序扫描
40:43 - 40:45
and then it flushing them out the disk 
然后，它将这些都刷出到磁盘

40:45 - 40:51
so our checkpoints going to write out page #1 #2 #3 with the modification that the transaction made to page #3 
so 我们的checkpoint会将 page #1 #2和已经被该事务修改的 page #3刷出到磁盘

40:52 - 40:55
then the checkpoint finishes our transaction get stalled 
然后checkpoint 结束，并结束我们事务的等待状态，让它继续执行
40:55 - 40:57
and then we now update page #1 
然后我们开始更新page #1
40:57 - 41:04
all right the problem is now our snapshot in our database, for one query this transaction executed, we saw half their changes 
all right，现在问题来了，我们的快照在我们的数据库中了，我们有看到与这个查询相关的事务已经执行的落地了一半
41:05 - 41:09
so our checkpoint or the state of the database on disk is not consistent 
我们的checkpoint 或磁盘上数据库的状态不一致（知秋注：记录的并不是一个完整的事务落地）
41:12 - 41:20
so in order to handle this, we want to record some additional metadata to figure out, what transactions were running at the time we took the checkpoint 
so 未来解决这个东西，我们想要记录一些其他元数据以找出我们在制作checkpoint时有哪些事务正在运行
41:20 - 41:26
and what pages were dirtied in our buffer pool ,while we took the checkpoint 
在我们制作checkpoint 时，我们的buffer pool中有哪些dirty page
41:26 - 41:33
so that we can use that information to figure out later on, oh well this guy updated page #1 and I missed it on my checkpoint 
so 我们可以使用这些元数据信息来找到，然后这个事务更新了page #1，我的这个checkpoint 其实就会少了这个更新
41:33 - 41:39
so I knew that I didn't make sure that I want to replay any log record of this guy to put me back in the correct state here
so 我知道我不确定要重演这个事务的任何日志记录来使我回到此处的正确状态（知秋注：因为checkpoint包含了一段无法确定的是否完成的事务，当下一个checkpoint出现，上一个就会消失，那就会有一段缺失的信息，这个要考虑的）
41:40 - 41:41
you，that， yes 
请说
41:46 - 41:48
now be very careful in which here checkpoint 
now 要非常注意这里的checkpoint 

42:02 - 42:11
yes yes his question is in my example here, I show in wrists like a brute force or a coarse grain write latch on the entire system 
他的问题是，在我这个例子中，在我手腕指向的地方，设定一个全局的粗粒度的写锁

42:11 - 42:15
so this guy has to finish his checkpoint before this guy's allowed to go 
这个事务只有在checkpoint 制作结束后才允许执行
42:16 - 42:21
or could I say well I'll just release the write latch on page #1 and then l on update it 
或者，我可以这么说，checkpoint 只要释放了关于page #1的写锁，然后，该事务就可以更新它
42:21 - 42:24
yes but you still have the same torn up day problem 
但是你依然会有这个一模一样的事务撕裂的问题存在（知秋注：参照前面我的注释）
42:25 - 42:31
I'm not serious I'm using this as a straw man to say, that what you say, this is a bad idea and we'll see how to do it in a better way
我使用这个例子来说，对于你讲的，确实不是一个好的idea，我们来看看该如何更好地做到这一点
42:32 - 42:34
but that's not an obvious optimization yes
但 那确实不是一个好的优化策略，请讲

42:44 - 42:50
this question is when I say we care about do we care about dirty pages which is gonna be the dirty page table 
这个问题是，当我说我们要留意dirty page 时，将这些dirty page 管理到一张dirty page table中
42:51 - 42:57
do we care about transactions that are paused or any dirty page
我们是否还需要关心事务暂停或因它产生的任何dirty page
42:57 - 43:03
in the real system is any dirty page, in there in we will do fuzzy checkpoints, we do not actually pause transactions, yes 
在真实的系统中，对于任何dirty page，在我们做fuzzy checkpoint时，我们实际上不需要暂停事务，请讲
43:12 - 43:14
what's sorry what's it is you don't 
sorry ，你再说下
43:31 - 43:40
So he statement is ,you don't need the the dirty page table ,and the active transaction table, 
so 他要表达的是，你不需要这个dirty page table和 active transaction table
43:40 - 43:42
because if you just replayed everything
因为如果你就是要重演（replay）一切
43:42 - 43:47
and then reverse them when having put you in the correct state, yes 
在你要回滚到正确状态的时候，撤销这些脏修改就是了
43:48 - 43:50
I think I agree with you 
我同意你的看法
43:52 - 43:54
but that's gonna be super slow 
但这会超级慢
43:56 - 44:01
because you because you're gonna have to update your gonna bring back every single page modify it right 
因为你必须对一个个单独的页面进行修改更新，以让它回归正常
44:01 - 44:03
well where's with this metadata we can avoid that 
通过这个元数据，我们可以避免这样的工作
44:08 - 44:13
No not true ,you have to go farther back potentially ,give you more slides we'll get there 
不对，你可能会做更多的事情，后面我们会谈到
44:14 - 44:16
because you don't know what's been written disk 
因为你不知道哪些已经写入磁盘了

44:19 - 44:23
all right so right so there's the  active transaction table and the dirty page tables 
all right， so，这里有Active Transaction Table 和 Dirty Page Table
44:23 - 44:27
we're gonna record this information when we take the checkpoint starts 
当我们开始制作checkpoint 时，我们要将它们记录在案
44:27 - 44:32
we're gonna write it out with fuzzy checkpoints when the checkpoints ends 
当checkpoints 结束时，我们将使用fuzzy-checkpoints将其写出
44:32 - 44:35
and then we'll see these two concepts come up again when we do recovery 
然后当我们进行恢复时，我们将再次看到这两个概念
44:35 - 44:40！！！！！
we're gonna basically replay the log and populate this information to figure out what we need to commit or undo 
我们将重演（replay）这个日志并根据此信息以找出需要提交或撤消的内容
44:41 - 44:50
so in the active transaction table, this is going to be for every single actively running transaction at the time the CheckPoint starts, or to record its txnID, its status 
so 在这个 active transaction table中，在CheckPoint 开始的时候，该table里面放着一条条活动的正在运行的事务记录，每条记录都有该事务的txnId,它的状态status 
44:50 - 44:53
and then the lastLSN that was created by this transaction .
以及创建该事务是最近的那条LSN：lastLSN 
44:53 - 44:57
so the status is either what it's running , committing 
so 事务状态码status包含了Running、committing 
44:57 - 45:02
right so it's Candidate, but before we get to txn-end, or it's something that we think we have to undo 
status也包含了Candidate，Candidate表示在我们到达TXN-END之前，遇到一些情况使得我们不得不做undo操作

45:03 - 45:10
it may have to undo we don't know yet right  because it's we don't know what its final outcome is gonna be 
因为我们不知道它的最终结果会是什么
45:11 - 45:16
and again when we see a transaction end message ,we can we could we can remove this from the ATT 
当我们看到一个事务结束的消息后，我们要从ATT（ACTIVE TRANSACTION TABLE）上移除有关该事务的记录
45:16 - 45:18
because we know we're never going to ever see it again 
因为我们知道，我们永远不会再次看到这个事务了
45:18 - 45:21
so that's why there's no like completed or finished here 
so 这就是为什么status没有包含completed 或finished这样的字眼了
45:22 - 45:27
so this would this be hanging out internal memory we can populate this, while we take the checkpoint 
在我们制作checkpoint 时，ATT会被放置在内存中
45:28 - 45:31
but then it's included in the checkpoint end message which we'll see in a second 
然后它会被包含在checkpoint 结束消息中，我们稍后会看到

45:33 - 45:39
then the dirty page table was just keeping track of all the pages that are in the buffer pool ,pages that have been dirtied in the buffer pool
接着，对于dirty page table，它就是用来跟踪缓冲池中的所有dirty pages
45:39 - 45:41
that were modified by uncommitted transactions 
这些dirty pages都是由未提交的事务修改过的
45:41 - 45:50
and for this one we're just going to record the recLSN , which is the log record of the first transaction that modified this page that made it dirty
对于每一条数据（非log）上的recLSN，它代表了自上次该page刷出后，日志记录中第一个修改这个page数据使其变为dirty page的事务条目（知秋注：即recLSN指向日志中第一条使该page变为dirty page的LSN ）
45:50 - 45:51
since it was brought into memory
自该page被加载入内存中开始（知秋注：事务修改数据经过刷出落地磁盘后，buffer中清空了，此时，再次将一个page加载进来，若有一个事务将它修改变为dirty page，那这个修改代表的LSN就是这里的recLSN） 

45:53 - 45:57
so let's see a slightly better version of checkpoints that's using this information 
so 让我们来看下使用此信息的更好版本的checkpoint

45:58 - 46:04
so we see now in our checkpoint entry, we and our log record we're gonna have the ATT 
so 我们现在可以看到ppt中我们的checkpoint entry，我们的log 记录中包含了ATT 
46:04 - 46:07
and at this point here we only have one transaction running t2 
在此处，我们只有一个名为T2的事务中运行
46:07 - 46:09
so that's the only thing we have inside there 
so 我们这里的ATT中只有这一个事务

46:10 - 46:17
and then we have the dirty page table, and we have P11 P23 right, because there's P11 was modified here
接着，我们看到了dirty page table（DPT），我们有两个dirty page：P11 P23，这个P11在这里被修改了
46:18 - 46:23
so I pick P11 P22,p11 was modified here and P22 was modified here 
so 我选了P11 P22，p11在这里被修改了，p22在这里被修改了
46:23 - 46:30
so the syntax I'm showing now is like, here's the object that was modified ,and it's pointing to what what the page number was, right 
so 我现在展示的语法就像，这个对象被修改了，它指向它所在的那个page number
46:30 - 46:35 
so in this case here, we don't record anything about transaction t1 
so 在这个例子中，我不需要去记录任何关于T1的东西
46:35 - 46:38
because transaction t1 committed before my checkpoint started 
因为在我的checkpoint开始之前，T1已经提交了
46:38 - 46:41
so I don't care about it at this point anymore 
so 我无须关心它任何东西


46:43 - 46:47
so then now in the second checkpoint t3 is still active 
so 然后，在第二个checkpoint 条目这里，可以看到，T3是活跃的
46:47 - 46:52
and then we have two dirty pages here ,because t2 committed before our transaction started 
接着，我们这里有两个dirty page，因为在我们T3开始前，T2已经提交了
46:53 - 46:53
right 

46:55 - 47:01
so this is still not ideal because we're still stalling all our transactions in order to take this 
so 为了制作checkpoint ，我们现在依然没有办法，依然要让我们所有的事务暂停下来

47:02 - 47:08
right so we're pausing everything at this point here, these guys are not allowed to modify it 
so 我们现在在这里暂停所有操作，不允许这些事务修改它
47:08 - 47:11
and so this is just saying we wrote out a checkpoint 
so 这就是在说我们写出了一个checkpoint 
47:11 - 47:19
but oh by the way here's some stuff that that that could have been modified during this time to make sure that you find it 
顺便说一下，这里有些东西可能在这段时间内已经修改过，以确保你找到它
47:20 - 47:24
so so like the first one, the first checkpoint a scheme I showed you 
so 就像我这里给你们展示的第一个checkpoint scheme 
47:25 - 47:26
nobody actually does this one either
实际上也没有人这么做

47:28 - 47:35
everyone instead does fuzzy checkpoints ,since that support high performance checkpoints are doing fuzzy checkpoints
相反，大家都使用fuzzy checkpoint，就因为fuzzy checkpoint的高性能
47:35 - 47:44
so fuzzy checkpoint is just where we're gonna allow transactions to keep on running keep on modifying the database, while we're taking the checkpoint 
so fuzzy checkpoint会在我们制作checkpoint的时候，允许事务继续运行，继续修改
47:45 - 47:52
and so in order to record the boundaries of, when the checkpoint started, when the checkpoint finishes to know whether something could have a written out that we missed 
因此，在checkpoint开始时记录边界，当checkpoint完成时就能知道我们是否错过了某些内容
47:53 - 47:57
we add a fuzzy checkpoint-begin and checkpoint-end log message
我们这log中添加了checkpoint-begin和checkpoint-end信息
47:57 - 47:59
so the begin is just telling us when the checkpoint started 
checkpoint-begin就是告诉我们checkpoint工作开始了
47:59 - 48:01
and the end tells us when it finishes 
checkpoint-end是指checkpoint工作完成了
48:01 - 48:08
and this will include the ATT and DPT that that that occurred during during the execution of the checkpoint 
checkpoint-end会包含checkpoint执行期间的ATT 和 DPT信息

48:10 - 48:13
so to go back here now,so now we have our checkpoint-begin
so 我们回到这里，此时我们有一个checkpoint-begin
48:13 - 48:16
And then checkpoint does these things 
 然后checkpoint 做了它要做的事情

48:17 - 48:23
and then in the checkpoint-end we include that we have transaction t2, because t2 started before the checkpoint started 
接着就是这个 checkpoint-end，我们可以看到，它（ATT）里面包含了T2，因为t2在checkpoint 开始之前开始
48:23 - 48:29
and then the dirty page table tells us that P11 was modified during during the checkpoint as well 
然后 从dirty page table（DPT）中可以看到P11是checkpoint 执行期间有发生修改的dirty page
48:29 - 48:38
right we don't need to include t3 here, because the t3 started before our checkpoint started ，sorry ，started after my  checkpoint started
这里，我们不需要包含T3，因为T3是在我checkpoint开始后才开始的（checkpoint只制作落地它开始前的那些状态，关于它制作期间发生的修改，只需要关注它开始前活动的事务即可）

48:39 - 48:46
so the once we have the checkpoint and written out to disk successfully 
so 一旦我们有了checkpoint 并成功写出到磁盘
48:46 - 48:51
and we can which means we flushed all the pages out, that we wanted to take you in the checkpoint 
这意味着我们刷出了所有pages，这些page内容都在checkpoint中了
48:51 - 48:57
then we go ahead and update our MasterRecord to now include the the point to the checkpoint-begin 
然后，我们继续，更新我们的MasterRecord ，将它指向这个checkpoint-begin：checkpoint-begin 
48:57 - 49:01
because that's going to be our anchor point where we start our analysis during recovering 
因为我们会将它作为我们的一个锚点，在恢复的过程中用于开始我们的日志分析
49:02 - 49:08
because we're going to know at this point here ,right here's all we flushed all the dirty pages 
因为我们知道，在这个位置，我们将所有dirty page刷了出去
49:08 - 49:10
but we kept track of maybe ones that we may have missed 
但我们需要持续跟踪那些我们可能错过的修改（checkpoint执行期间，ATT事务对page又进行了修改，但并没有落地）
49:10 - 49:11
because because they got modified
因为这些page发生了修改
49:13 - 49:13
yes 

49:17 - 49:22
what do you keep the checkpoint what ？what do mean where did he keep it
你的意思是它是如何跟踪维护的



49:31 - 49:37
when you say when you mean like the wrong record, it goes in the log, but  when it ends you shove it in 
就像你说的，这有一个错误的记录，它在log中，但当它结束，你该怎么办
49:40 - 49:44
when and when you have scanned through the buffer pool and written out all the dirty pages to disk 
当你需要通过对缓冲池进行扫描并将所有dirty pages写出到磁盘时

49:45 - 49:49
and after you flush them out you fsync right, because you make sure it's durable 
在你将它们刷出到磁盘后（你可以通过fsync做到），因为你要确保它已经被持久化了
49:49 - 49:54
then you add the log entry here, and it's committing I'm using committing that quotes
然后，你这这里添加一条log日志（CHECKPOINT-END），它代表着“提交”了，这里的提交我使用了引号
49:54 - 49:57
because like a regular transaction, I flushed the log record for this to disk 
因为这就像是一个正常的事务一样，我将关于这个CHECKPOINT的log日志刷出到磁盘了
50:01 - 50:01
yes 

50:13 - 50:18
this question is I holding any locks on the entire database why I write this thing out 
他的问题是，我已经拿着整个数据库的锁了，为什么它（checkpoint）还能写出（知秋注：多版本数据！！）
50:19 - 50:19
no

50:26 - 50:27
What mean, in here
什么意思？这里？
50:31 - 50:31
yes 

50:59 - 51:05
yes I think I think what is saying there is a sort of stop the world moment here, where you briefly flush this thing out 
我想他说的是，在这里有一个STW（stop the world，全局暂停），我们可以利用这段时间快速将checkpoint相关内容刷出到磁盘
yes
51:05 - 51:08
but that's not  a blink it's a minor thing 
但它可不是一个短暂的小事情
51:14 - 51:18
correct yes they can change whatever else they want to change yeah,in the regular buffer pages yes 
没错，它们可以在常规的buffer pages中去修改它们想修改的
51:21 - 51:21
okay 


51:24 - 51:25
So now let's do recovering 
so 现在，我们来看 recover阶段
51:26 - 51:32
after all that after 40 minutes of minutiae of log scene with summary and fuzzy checkpointing 
在聊了40分钟日志场景的细节和fuzzy checkpointing 后
51:32 - 51:33
let's talk about actually recover this 
我们来讨论下recover 
51:33 - 51:40
and then and given that everything we've set up now that we have all this extra metadata, that we're recording 
现在，我们设定并已经有了所有这些额外的元数据
51:40 - 51:41
recovery actually is not going to be that bad 
recovery（恢复）实际上不会那么糟糕了
51:42 - 51:45
but the tricky part is just figuring out where you start each of these phases in the log 
但棘手的部分就是你要弄清楚在日志中每个阶段开始的位置
51:46 - 51:51
so the analysis phase you're gonna look at your MasterRecord for the database on disk 
so 在分析阶段，你将查看数据库在磁盘上的MasterRecord
51:51 - 51:55
and that's gonna give you the location of where the last checkpoint-begin in the log 
通过它你可以获取到日志中最后一个checkpoint-begin所在的位置
51:55 - 52:03
so you jump to that location ,and you scan forward to time till you reach the end of the log
so 你就可以跳到这个位置，然后向前扫描，直到到达日志末尾
52:03 - 52:11
and then you're just going to populate the DPT and ATT to keep track of ,what think what was going on in the system at the moment of the crash 
然后，你就能拿到DPT 和 ATT去追踪系统崩溃时发生了什么
52:13 - 52:19
and then that's gonna  figure out what transactions you need to abort ,which one's actions you need to make sure that you commit 
然后就可以弄清楚你需要中止哪些事务，需要执行哪些操作以确保提交
52:20 - 52:26
then in the redo phase ,you're gonna jump to some appropriate location in the log 
接着在redo阶段，你会跳到日志中的某个适当位置
52:26 - 52:32
where you know there's could be potential changes from transactions that did not make it safely to disk 
即你知道的，有些未提交的事务可能会存在潜在的变化，可能无法将其修改安全地落地到磁盘
52:33 - 52:37
and you can start reapplying those changes until you get to the end of the log
你可以开始重演这些更改，直到到达日志末尾
52:38 - 52:43
and you're gonna do this for any every transaction you see, even ones that are you know end aborting 
你会为每个看到的事务执行此操作，哪怕其中一些事务最终中止了
52:43 - 52:47
because on the analysis phase, you see everything you know to the first pass 
因为在分析阶段，在过一遍后，你会看到所有
52:47 - 52:49
so you know what's gonna commit what's gonna abort
so 你会知道哪些事务提交了，哪些中止了
52:49 - 52:54
so then in the redo phase just for safety reasons ,we're just gonna do you know reapply everything 
so 在redo阶段，为了安全，我们就是要重演日志中的所有内容
52:55 - 53:03
then the undo phase, now you're gonna go back in reverse order from the end  the log up until some point 
接着，在undo 阶段，现在，你将从日志末尾开始以相反的顺序返回到某个点
53:03 - 53:08
to reverse any changes from transactions  that you know did not commit 
撤消你未提交的事务中的任何更改
53:09 - 53:16
and when the undo phase is done, then the database is now in a state that success state
当undo阶段结束，那么数据库现在处于已成功的状态
53:16 - 53:22
that success at the moment of the crash with no partial updates from abortive transactions 
这个成功，在在此意味着，此时，因系统崩溃而中止的事务所发生的更新被撤销
53:22 - 53:28
and all changes from committed transactions have been applied to disk, in the back ,yes 
提交的事务中的所有更改都已应用到磁盘中
53:31 - 53:32
Next slide yeah okay
下一张幻灯片 



53:33 - 53:37
so again three Phase ：analysis redo and undo 
so 再次来看这三个阶段：analysis 、redo 和undo 
53:37 - 53:43
so the very beginning we look at the begin the figure out where the begin checkpoint is in the MasterRecord 
so 在最开始，我们要知道checkpoint-begin的位置可以有MasterRecord来确定
53:43 - 53:45
and that's where we're gonna begin our analysis, right 
这就是我们开始做分析的地方

53:45 - 53:49
so let's say that this log record here is the start in the last checkpoint 
so 我们会说对于这里的log日志来说，它的开始位置在最后的那个checkpoint 
53:49 - 53:52
because again that's in our MasterRecord we know where that where that is 
因为那就是我们的MasterRecord所指向的位置所在

53:52 - 53:59
and then now we're to scan forward through time and look at these log records and build out our ATT and DPT 
然后我们将向前顺着时间线浏览并查看这些日志记录，并构建我们的ATT和DPT

53:59 - 54:09
and then now we got to figure out well what for the redo phase, what is the smallest recLSN in the dirty page table that we found after do our analysis 
我们必须弄清楚redo阶段中，分析后发现的DPT（dirty page table）中所包含page的最小recLSN是多少
54:09 - 54:14
right so this is telling us this is the location of the first log record 
so 这个最小的recLSN可以告诉我们这是第一个修改该page的日志记录位置
54:14 - 54:20
the oldest log record that modified a page that may have not been written a disk 
这个最早的修改page的日志条目所对应的表数据可能并未写出到磁盘


54:20 - 54:24
so when we redo we jumped at this point and reapply all our changes 
so 当我们进入redo阶段时，我们会跳到这个位置来重演所有我们的修改
 

54:26 - 54:32
and then now in the undo phase, we start at the the end point and go back in time 
接着，我们在undo阶段，我们从结束点开始，进行时光逆转



54:32 - 54:41
up until some point where we know that this is the oldest transaction, that got a border that was actively running, while we took our checkpoint 
向上，直到某个位置，在此，我们知道此处是我们制作这个checkpoint 时，所涉及的最老的那个活动事务，
54:41 - 54:43
and we reverse all those changes 
我们撤消所有这些更改
54:43 - 54:48
so the errors are sort of showing you the boundaries of how far you get to go back in time in the log
由此，我们可以得到到底需要在log中从哪里开始恢复，该怎么做
54:49 - 54:55
so you know I'll go through these more precisely in context LSNs one by one 
我将在这个上下文中更准确地逐一遍历这些LSN（知秋注：确定了范围，逐一遍历即可）
54:55 - 55:01
but  this clear at a high level what we're doing , analysis goes forward  time, redo goes forward a time 
我们简单的从一个高级层面来看是怎么做的，analysis 和redo 阶段是按时间线往前（图中是向下箭头）走的
55:01 - 55:03
and then undo goes backwards in time 
undo 阶段是按时间线往后走的（图中是向上箭头）
55:04 - 55:09
and for undo I may not be undoing every single log record I see here 
对于undo来说，我可能不会撤消在这里看到的每个日志记录
55:10 - 55:15
right it's just for the transactions that identify in my ATT after the analysis ,that should not have committed 
撤销操作仅针对于位于我所分析后得到的ATT中所定义的活动事务，这些事务并没有提交

55:19 - 55:24
okay so this sort of summarizes are more concretely what I just said 
这个ppt相对于我刚才说的，更加详细具体
55:25 - 55:28
so analysis phase we're gonna scan the log forward from the last successful checkpoint 
analysis 阶段，将从最后一个成功的checkpoint 按时间线从上到下往前去扫描日志
55:28 - 55:33
anytime you find a transaction end record during an analysis we can remove it from my ATT
在analysis期间，不管任何时候，只要你发现了一个 TXN-END 记录，我们就可以将该事务id从我们的ATT中移除
55:34 - 55:41
right otherwise for any other record, if it's first time I've ever seen this transaction, we add it to the ATT with the status of undo 
否则，对于其他任何记录，如果这是我第一次看到的事务，我们将其添加到ATT中，以便后续进行undo
55:42 - 55:46
because we don't know, because we're going forward in time, we don't know whether it's gonna abort later on 
因为我们是按照时间线往前走的，我们并不知道该事务是否被中止了
55:48 - 55:53
if we see a commit record then we just change its status to commit, like I said one is sinless and we can remove it 
如果我们看到一个commit 记录，然后我们就将它的修改提交，和我之前说的一样，将它从ATT中移除
55:53 - 56:01
and then for any update record, we're gonna look to see whether the page that that's in the update record that's being modified is in our DPT 
然后，对于任何一个更新记录，我们都要去看看它所针对的page是不是在我们的DPT 中
56:01 - 56:05
if not then we go ahead and add it ,and we set the recLSN to be LSN
如果没在，就添加进去，然后设定该page的recLSN为该修改记录的LSN
56:06 - 56:13
because this is this again this is telling us ,this is the log record that, first made this page dirty when it was brought into memory 
 因为对于这个修改记录，它是第一个需要将该page读到内存并修改的存在，所以它属于recLSN

56:16 - 56:18
so now at the end of the analysis phase
so 在analysis阶段的最后，
56:18 - 56:23
the ATT is gonna tell us what are all the active transactions that we had running in the system at the moment of the crash
通过这个ATT，我们就可以知道在系统崩溃的时候，当前系统中运行的所有活动的事务有哪些
56:24 - 56:31
and the DPT are gonna tell us, what are the dirty pages that could have been in our buffer pool ,that may have not been written a disk 
通过这个 DPT，我们就可以知道当时有哪些dirty pages没有写入磁盘
56:32 - 56:35
and we're doing this we have to build this table 
我们要做到这些，就需要去构建这个DPT
56:35 - 56:40
because again we're not logging out every time we do a buffer pool flush to a page on the disk 
因为我们并不会每次在log刷出去的时候，都去将对应的数据库表buffer pool中的page也刷出到磁盘
56:40 - 56:42
we're not recording that in the log 
我们并没有将这个DPT记录在log中
56:42 - 56:48
or the log records do not that tell us potential will get modified, and we're trying to reconstruct it 
log并不会告诉我们那些潜在已经修改的dirty pages，我们需要尝试重新构建它
56:48 - 56:49
yes 
请讲
56:53 - 57:00
this question is how do I know for sure whether pages be written to disk ,like in the log or in the real world, like on hardware or analog
他的问题是，我该怎么做才能确定这些表数据page是否被写出到磁盘了，
57:04 - 57:04
you can't 
你无法做到
57:06 - 57:08
because I there's no information that tells me that it's been written it's 
因为并没有信息可以告诉我们它们已经被写出到磁盘了
57:10 - 57:14
not entirely true, we see redo we'll see in a second 
不完全对，我们等会会看到redo阶段的内容
57:14 - 57:25
but in general, if you know the LSN of a log record you're looking at is less than the recLSN of the log of the page as exists on disk 
但通常，如果一条log 记录的LSN 小于该page的recLSN 



57:26 - 57:32
then you know that that your change got written out the disk but to the page got read not the disk, 
然后你就知道，这个修改已经写出到磁盘了，但我们并没有从磁盘中读到该修改后的数据，
57:32 - 57:36
then it got dirty again by another one but your thing got written out before then 
那它就是被另一个后面的修改操作给修改了，变为dirty 数据落地了

57:39 - 57:43
all right so quick overview of the analysis phase 
all right，我们快速概览下分析阶段
57:43 - 57:50
and so here I'm just showing you the with the ATT into DPT or gonna look like at these different LSN
so 在这里，我向大家展示ATT到DPT的过程，并联系到这些不同的LSN

57:50 - 57:55
so begin our checkpoint ,we don't know anything ,so the ATT and DPT are empty 
so 在我们这个checkpoint的开始，我们什么也不值得，so ATT和DPT现在是空的

57:55 - 57:59
then we do an update in LOG sequence 20 
然后，我们在LSN 20处进行了一个更新操作

57:59 - 58:02
so for this one here we have transaction T96 
so 对于这个020，它的事务是T96 
58:02 - 58:03
it's the first time we've ever seen it 
它是我们首次看到的修改
58:04 - 58:08
right because again we don't have a begin record here ,because it began before a checkpoint started 
因为我们这里并没有看到该事务开始的日志条目(即< T96, BEGIN >),因为这个条目在checkpoint 之前发生的
58:09 - 58:17
so we see that ,and we update our ATT to say hey we ever turns out in here T 96 
so，在我们看到它后，我们就会更新我们的ATT，意思是，嘿！这里有个活动的事务T96
58:17 - 58:20
and the status is a candidate for undo ,because we don't know whether it's going to commit or not 
即将该事务列为undo阶段的潜在操作对象，因为我们并不知道它是否在后面提交了

58:21 - 58:23
and then we see that it modified page 33 
然后，我们看到它修改了page 33

58:23 - 58:30
so we add that to our dirty page table  with the recLSN of our log record here
so 我们将该page添加到DPT（dirty page table），并将该LSN作为该page的recLSN 

58:31 - 58:38
then now our txn-ends, and now we get more information about the what's in the extras actual table on DPT 
然后看CHECKPOINT-END这里（Andy口误），现在我们可以从它内部的ATT、DPT中获取到更多的信息
58:38 - 58:42
so now we see that there was a t97 that we didn't see in between our checkpoint 
so 我们有看到，有个叫 T97的事务，我们并没有在我们的checkpoint 制作期间看到
58:42 - 58:47
so we know that there's some one transaction up above this checkpoint  start point ,
so 我们知道，那它（T97）是在这个checkpoint 开始的时间点之前就存在的，只不过并没有提交
58:47 - 58:52
that did some stuff that we may need to go look at as well 
那这些东西我们也需要去关注的
58:52 - 58:57
and then there's also a new page 20 that was also modified 
然后，在DPT中，我们有看到，也有一个新的page（P20）发生了修改
58:58 - 59:00
so you want to include that in our DPT as well 
so这些都要包含在我们的DPT中的

59:01 - 59:03
so now we see T 96 commits here 
so 这里，我们看到T96 提交了
59:04 - 59:07
So we flip its status to be committing 
so 我们将它的状态设定为commit

59:08 - 59:11
and then when we see the transaction and message here 
然后，我们在这里看到T96的结束消息TXN-END
59:12 - 59:15
then we know that we can remove it from ATT
然后，我们知道我们可以将T96从ATT中移除了
59:15 - 59:22
but now at the point of the crash, you see that there is t97 still hanging out here with it with a new candidate status
但，现在，在这个点，服务器崩溃了，此时，你有看到T97还在活动状态，它还是属于undo潜在操作对象
59:22 - 59:27
so we know that this transaction made some changes up above our checkpoint 
so 我们知道，T97做的修改在我们这个checkpoint 之上
59:27 - 59:30
that we didn't see in our log ,that we need to go back and make sure we reverse
我们在我们的log中并未看到，我们需要回滚并撤销它的修改
59:31 - 59:33
because we don't know whether those pages got written out to just yet 
因为我们并不知道这些page是否写出磁盘了
59:36 - 59:36
yes

59:46-59:47
your question is 
你的问题是
59.47-59.52
is it possible for the after the analysis phase the ATT and DPT are empty 
是否有可能在analysis 阶段之后，ATT 和DPT都是空的
59:52 - 59:55
so therefore you know that nothing there's nothing was dirty 
这样，也就意味着不存在dirty page了
59:55 - 59:58
could you just say I'm good ,yes 
对的


01:00:00 - 01:00:02
and actually you would just sort of see that because it would be nothing 
其实你可以想下，因为它会说空的，什么也没有
01:00:04 - 01:00:05
yeah if it's empty
如果它是空的话
1.00.05-1.00.07
 then you know there's nothing everything it made it out yes 
然后，你知道，不会有任何东西写出的
01:00:18 - 01:00:19
your question is 
你的问题是
1.00.19-
if during the in between the checkpoint is do I am I not write dirty pages out to disk 
如果在这两个checkpoint 标签期间，我并没有将 dirty pages写出到磁盘
01:00:26 - 01:00:28
the buffer pool write out to  disk 
并没有将buffer pool中数据写出到磁盘，，，，，，
01:00:34 - 01:00:37
yes I don't I think yes but I actually don't know the answer that 
我觉得这是对的，但我实际并不清楚答案是什么
01:00:38 - 01:00:39
I think yes 
我觉得是对的
1.00.39-
because like why would the buffer pool manager ever need to write out dirty pages 
因为为什么 buffer pool管理器需要写出dirty pages
01:00:43 - 01:00:46
why I need to evict some stuff to make space when the checkpoint essentially is just doing that 
为什么在checkpoint做这些事时，我要移除一些东西来腾出空间，
01:00:55 - 01:00:55
correct
没错
1.00.55-1.00.58
 yeah I I think the answer is yes
我觉得答案是Yes
1.00.58-1.00.59
,but I should double-check that
但我应该会去再次确认下
01:01:00 - 01:01:00
so his statement is 
So，他所说的是
1.01.00-1.01.02
that during the checkpoint
在checkpoint期间
1.01.02-1.01.07
 the buffer pool manager is not allowed to write out dirty pages to disk 
 buffer pool manager是不允许将dirty pages写出到磁盘的
01:01:09 - 01:01:14
because you may not missing the term hey, feel like answer is yes, but I actually don't know
因为你可能会丢失一些东西，感觉他讲的没问题，但我实际并不清楚
1.01.13-1.01.14
I mean you think about that 
我的意思是，你们可以自行去思考下答案


01:01:17 - 01:01:17
all right

1.01.17-1.01.19
so again after the analysis phase,
So，当经历过分析阶段后
1.01.19-1.01.21
 we have ATT and DPT 
我们拿到了ATT和DPT
1.01.21-1.01.23
that's telling us  what was going on at the time of the crash 
通过它们我们可以知道在当系统遇上崩溃的时候，系统里有什么
01:01:24 - 01:01:26
so now in the redo phase
So，在Redo阶段中
1.01.26-1.01.27
 we want to repeat history 
我们想重复执行下以前的操作
01:01:27 - 01:01:32
so we're gonna apply all the changes from some point in the log
So，我们会从日志中的某处位置开始重新执行操作
1.01.32-1.01.34
 ,where we know that there was a dirty page
假设这里有一个dirty page
1.01.34-1.01.37
 ,that was modified that was potentially not made about to disk 
我们对该page进行了修改，但它并未被写出到磁盘
01:01:37 - 01:01:41
so we're gonna reapply all these changes for even the aborted transactions 
So，即使是那些被中止的事务，我们也要重新执行它所做的修改
01:01:41 - 01:01:45
and any CLR we see from an aborted transaction ,we're gonna redo them as well 
对于由中止事务所得到的CLR（Compensation Log Record 补偿日志记录）来说，我们也要重新执行它们
01:01:47 - 01:01:49
so this as I said before 
So，就如我之前所讲
1.01.49-51.51
this is gonna seem very expensive
这样做的成本非常昂贵
01:01:52 - 01:01:57
because we're gonna be reapplying changes we may technically need may not need have to reapply 
因为这些我要重新执行的修改，从技术上来说，我可能没有必要去重新执行它们
01:01:59 - 01:01.59
you know for example 
举个例子
1.01.59-1.02.02
for a transaction, we know it's gonna aborted
我们知道这里有一个事务被中止了
01:02:02 - 01:02:08
who cares about you know bringing a page in making doing update ,and then reversing in the CLRS
谁会关心说，他在进行更新时要先引入该page，然后在CLRS中反转撤销？
01:02:08 - 01:02:11
and then you know if that was the only transaction that modified that page
那么，如果只有该事务对该page进行了修改
1.02.11-1.02.13
 I could just skip that transaction 
我就可以跳过这个事务
01:02:14 - 01:02:16
so there are optimizations like that you can do 
So，你可以做一系列类似于这种的优化
01:02:16 - 01:02:18
but again we're just going to ignore that
但现在我们将它忽略
我们仅需要将这个事务的修改忽略即可
1.02.18-1.02.21
because you want to make sure that everything is is sort of clean and correct 
因为我们想确保这一切都是干净且正确的


01:02:23 - 01:02:25
so as we do the redo phase
So，当我们在经历Redo阶段的时候
1.02.25-1.02.30
then we start from the log record containing the smallest recLSN in the DPT 
我们会从DPT所包含page的最小recLSN 所指的那条log记录开始
01:02:30 - 01:02:37
because again that's the that's the first log record ,that modified a page that dirtied it up, that we may not have made it out to disk 
因为这是修改该page的第一条日志记录，我们可能并没有将它对应的表数据写出到磁盘
01:02:37 - 01:02:40
then as we scan through for every single log record of CLR 
然后我们会扫描CLR的每条日志记录
01:02:40 - 01:02:46
we look at all LSN ,and we're gonna redo the action, unless the page is not in the dirty page table
我们会查看所有的LSN，我们会重新执行这些动作，除非目标page并不在DPT中
01:02:46 - 01:02:53
in which case we know that our modifications are flushed out the disk at some point 
只要目标page并不在DPT中，也就意味着我们的修改已经在某个时刻刷出到磁盘中了
01:02:54 - 01:02:56
or if it is in our dirty page table 
或者，如果目标page在我们的DPT中
01:02:56 - 01:03:02
but our LSN is is less than the pages recLSN 
但我们的LSN小于目标page的recLSN 
01:03:02 - 01:03:08
and that would mean that we made some change to the page, then the page got written out the disk 
这也就意味着，我们对目标page做了些修改，并将它写出到磁盘了
01:03:08 - 01:03:12
but then some other transaction made you know maybe that made it change of the same page 
然后，其他一些事务对该page进行了别的修改
01:03:12 - 01:03:15
and then that second change didn't write out  the disk 
第二次修改并没有写出到磁盘
01:03:15 - 01:03:19
and so that's why again we if we record the recLSN write out the disk 
so 这就是为什么我们要将recLSN 写出到磁盘的原因
01:03:19 - 01:03:23
we can recognize what actually got you know what changes actually got modified 
通过它，我们可以知道哪些修改真正落地了

01:03:27 - 01:03:30
so to redo an action we just reapply the change 
对于redo这个操作，我们就是重新执行这些修改
01:03:31 - 01:03:34
and we set the pageLSN to the recLSN  
我们将pageLSN设定到recLSN  
01:03:34 - 01:03:40
it's just as we would normally do during regular execution of you know the transaction 
这就像在transaction的常规执行过程中通常要做的一样
01:03:41 - 01:03:43
but during the normal operation we're not doing any additional logging 
但在正常操作期间，我们不会进行任何其他日志记录
01:03:44 - 01:03:46
we don't worry about flushing it and you anything extra, right 
我们无须担心要去刷出日志记录等其他额外的事情
01:03:46 - 01:03:48
we can sort of do everything asynchronously 
我们可以异步完成所有工作
01:03:49 - 01:03:56
so then when we get to the txn-end message, we'll just go ahead and and remove it from the ATT 
so 当我们得到 TXN-END 消息后，我们就要将该事务从ATT中移除
01:03:56 - 01:04:00
and if we want to be super careful we could flush everything at that point 
如果我们想要极度细致，我们可以在这个点将所有东西刷出到磁盘

01:04:03 - 01:04:04
So now the last phase is the undo 
so 现在，最后一个阶段就是undo
01:04:05 - 01:04:13
so this is just undoing all the transactions that we saw at the ATT after the analysis phase, that are hanging out with the the undo flag or undo Canada flag 
so，在analysis 阶段之后，undo要做的就是撤销所有我们在ATT中事务所做的修改
01:04:14 - 01:04:21
so we're gonna go back and reverse order in in we're going to reverse their changes in log sequence order 
so 我们按照log记录的顺序,由后往前来撤销它们的修改
01:04:22 - 01:04:28
see even though transaction t1 ran before t1 aborted then t3 aborted 
若我们看到T1中止了，然后T3中止
01:04:28 - 01:04:34
if we see the look the log records for T3 first ,well we will reverse them first before we get to t1 
接着，我们会先看到T3的log记录，我们会在看到T1的记录前翻转它们
01:04:36 - 01:04:38
and every single time we reverse a change 
每次我们只翻转一个修改
01:04:39 - 01:04:43
we're gonna add a CLR message, this is the allows to recover database 
同时，我们会添加一条CLR信息，通过它我们可以来恢复数据库
01:04:43 - 01:04:46
if we're crashed and recovery ， we know what we actually reversed 
如果我们的服务器发送崩溃，并恢复，我们知道我们该如何去恢复

01:04:47 - 01:04:52
so this gives a lot of hand waving a lot of text look, let's look walk through a simple example here 
so ，我们已经看了很多理论了，让我们通过一个简单的例子看看
01:04:53 - 01:04:56
so here we have now a write ahead log going forward in time
so 这里，我们有一个预写日志，按时间线从上到下
01:04:57 - 01:04:59
and we see that we did a checkpoint and it finished 
你可以看到，我们做了一个checkpoint 并完毕
01:04:59 - 01:05:05
and then we have t1 did a modification on page 5, t2 to modification page 3
然后，我们有一个事务T1对Page5进行了一个修改，T2对Page3进行了修改
01:05:05 - 01:05:06
but then t1 aborts 
然后T1中止了
01:05:07 - 01:05:10
so during the normal execution what do we do to abort this 
so 在正常的执行过程中，发生中止后，我们要做些什么

01:05:11 - 01:05:15
we create the CLR that says we want to undo the change from this this one here 
我们会创建CLR，以此来说，我们想要从这里开始撤销T1的修改（undo）

01:05:16 - 01:05:23
and then once we know that that's been applied,then we go ahead and add our transaction and message to say ,that this transaction is fully done 
然后，一旦我们搞定这些，然后我们继续往前，为这个事务添加一条TXN-END消息，以此表示这个事务已经完全结束了

01:05:24 - 01:05:27
so now I'm also now showing the prevLSN 
so now,我也会给大家展示下这个prevLSN 
01:05:27 - 01:05:33
but that you can think of that this is a linked list to tell you for a given transaction , how to walk back through its updates and be able to reverse them 
您可以将之想象成一个链表，通过它，对于给定的事务，我们知道该如何回滚修改

01:05:34 - 01:05:40
so now let's say at here ,we do a bunch of changes for t3 and t2 ,but then we crash 
so now，我们来看这里，T3和T2做了很多修改，然后我们的服务器崩溃了

01:05:42 - 01:05:47
so in the analysis phase we would come back and populate the ATT and DPT 
so 在分析阶段，我们需要回看并将对应的信息填充到ATT和DPT中
01:05:48 - 01:05:51
so this is somebody at space ,so this is a truncated version of a log 
so 这是它们在内存里的样子，so，这是一个log中的某一段
01:05:51 - 01:05:57
so for example here I had 40 45 inches upper lines now 40 45 on one line 
so 对于这里的例子来说，现在，我在40 ，45这一行
01:05:57 - 01:06:01
right and there's there is the CLR followed by the transaction and message 
这里有一条CLR和一条T1结束的信息（TXN-END）

01:06:02 - 01:06:07
so let me come back are you ATT tells us that we had two active transactions t2 and t3 
so 我可以回头通过ATT来告诉我们，我们有两个活动事务T2和T3
01:06:07 - 01:06:13
and then we have the lastLSN that point to the last modification that they made 
然后，我们有lastLSN 可以知道这所操作的目标page最后修改的LSN处
01:06:13 - 01:06:23
so we're going to look at the transaction that has the be the greatest than recLSN to start doing undo 
so 我们会去看这俩事务目标page大于recLSN 的LSN中最大的那个，从该LSN处开始进行undo操作
01:06:23 - 01:06:26
so assuming we've already we've already done everything right 
so 假设我们已经完成了所有工作
01:06:26 - 01:06:31 
and now we're going to undo this thing, and we're to add new log entries to reverse these changes 
now 我们要去对这个事情进行undo操作，那我们就要添加一些新的log条目去翻转这些修改
01:06:31 - 01:06:32
because these transactions aren't allowed to commit 
因为这些事务是不允许被提交的
01:06:33 - 01:06:38
so we look at this and say t2 is lastLSN ,it's 60 ,t3  lastLSN is 50 
so 我们来这里，T2的lastLSN是60，T3的lastLSN是50
01:06:38 - 01:06:42
so we're going to we want to reverse the LSN 60 first 
 so，我们会想要先翻转这个LSN60的记录

01:06:43 - 01:06:45
so we go ahead and create the the CLR 
so 我们就要先创建CLR
01:06:46 - 01:06:48
Right this to reverse this change 
并通过这条日志来翻转LSN 60这个修改
01:06:48 - 01:06:56
and then we add this UndoNext LSN, the point to that the next LSN, we would need to reverse for this transaction here 
然后，我们添加这个UndoNext，并将数值指向下一个要进行翻转撤销操作的LSN

01:06:56 - 01:07:01
right and again the thing is a logical pointer for convenience to tell us where we need to jump to next 
这其实可以看作是一个逻辑指针，方便我们找到下一个要跳到并进行撤销操作的地方

01:07:02 - 01:07:06
then maybe we add the CLR for transaction t3 
然后，我们要为T3添加一条CLR
01:07:08 -01:07:10
right and this is the last thing we actually need to undo for this transaction 
实际上，这是我们对该事务进行undo操作所要做的最后一件事
01:07:11 - 01:07:13
so therefore we can go ahead and create the txn-end message right away 
因此，我们会为之创建一条txn-end消息

01:07:14 - 01:07:21
right and at that point we're going to flush all the dirty pages,that this shows actually modified ,and the write ahead log to disk 
在此时，我们可以将所有的dirty pages刷出到磁盘，要知道，所有的修改信息都已经写入到我们预写日志中并已刷出到磁盘了
01:07:21 - 01:07:27
so at this point we know that we never need to recover or undo this transaction ever again to reverse anything 
在此时上，我们知道我们不再需要恢复或撤消该事务以撤消任何事情
01:07:27 - 01:07:31
because the log already contains everything you need you to reverse it 
因为日志已经包含了所有你可以用来撤销的信息
01:07:31 - 01:07:35
so we'll redo it if we crash again,but we want to undo it anything 
so，如果服务器崩溃了，我们可以进行redo操作，但我们想要去undo一些东西
01:07:37 - 01:07:43
so now I say we crash here right ,we're doing recovery, we're in the undo phase ,we crashed and restart
so 比如说我在这里发生了服务器崩溃，我要去做恢复，我们进入了undo阶段，我们崩溃和重启了

01:07:43 - 01:07:46
all this gets blown away ,because this is just hanging out in memory
所有这些全没了，因为它们只是暂驻在内存中

01:07:46 - 01:07:48
so when we come back 
so 当我们回过头来
01:07:48 - 01:07:53
we and our ATT would say well we only have t2 sitting around at the end , we make sure we need to reverse that
 我们知道，在最后，我们的ATT中只有一个T2，我们确定，我们需要去撤销T2的修改

01:07:53 -01:07:58
so and the next thing we need to reverse the starting point for our reversal is here 
so下一个事情就是我们要从这里（LSN 70）开始进行撤销 

01:07:58 - 01:08:02
so for this we just we've already applied it during the undo phase 
对此，我们只会在undo阶段进行该操作
01:08:02 - 01:08:05
so there's nothing to undo, because you can't undo an undo 
so，这里没东西让你去undo，你无法undo之后紧接undo（知秋注：因为前面服务器崩溃了，内存中没东西让你undo，得先redo之后才有信息给你undo）
01:08:05 - 01:08:09
you just redo them ,so you redo undos ,but you don't undo undo, okay
你要做的是对它们进行redo，so，你要先redo，后undo，不能undo，undo

01:08:10 - 01:08:13
so the undoNext tells us the next thing we need reverses up here at 20 
so 这个undoNext 告诉我们下一个要撤销修改的地方在LSN 20
01:08:13 - 01:08:18
so we add  CLR for that, then we have our txn-end message ,because it's the last thing we need to do 
so 我们为此增加一条CLR，然后我们给它添加一条txn-end消息，因为它到此结束了
01:08:18 - 01:08:20
we flush the log and then we're done 
我们将日志刷出，然后我们就结束了
01:08:21 - 01:08:24
at this point here after this has been flushed that your dirty pages been flush 
在此处，在此刷出之后，你的dirty pages可以被刷出了
01:08:24 - 01:08:32
we know at the database is in a consistent state, as it existed at the moment of the first crash with no partial effects from any aborted transactions 
我们知道，这在数据库中是一个一致性的状态，因为它在第一次崩溃时就存在，而并没有对任何中止的事务产生什么其他影响（知秋注：要知道，在崩溃后，你能读取到这段日志：lsn60之前的日志，说明它落盘了，那就是一致性的状态，根据这段日志来进行相应的回滚操作）
01:08:33 - 01:08:33
yes 
请讲
01:08:37 - 01:08:41
this question is would it be worth doing a checkpoint at the redo phase 
这个问题是在redo阶段去做一个checkpoint 是不是有价值的，
01:08:44 - 01:08:52
that would so that would make it so, you would do that if you assume you're gonna crash very soon in the near future again 
如果你假设你在redo时，不到一会，就又发生了服务器崩溃，那你可以这么做
01:08:53 - 01:08:55
otherwise it's just excessive disk writes 
否则，它就是一个多余的磁盘写操作
01:08:55 - 01:08:57
so nobody does that 
没人会那么做
01:08:58 - 01:09:03
 if it's 1970s porto rico and you don't have power, yes you do that
如果是在1970年代，经常断电，yes，你会那么做
01:09:06 - 01:09:06
Okay

01:09:14 - 01:09:20
the question is is it we required to do this flush here ,no, that's an optimization become amid that yes,yeah
他的问题是这里我们是不是需要做刷盘操作，no
01:09:22 - 01:09:23
well next slide 
下一张幻灯片


01:09:25 - 01:09:28
alright so I in this example here, I showed what happens if you crash during undo 
通过这里的这个Demo，我向大家展示了，如果在undo期间发生服务器崩溃，会发生哪些事情
01:09:29 - 01:09:35
if we crash during the analysis phase what do we have to do, what`s that 
如果在analysis 阶段发生了崩溃，我们该做点什么

01:09:36 - 01:09:40
nothing right there's nothing to do, because it's already of just breathing log we just come back log again
什么也不做，因为我们只是从log中获取一些信息而已，我们只需要重启重新来过，重新分析即可
01:09:40 - 01:09:43
it all over again if we crash during redo ,what do we have to do 
如果是在redo期间发生了崩溃，我们要做些什么呢

01:09:48 - 01:09:54
in the back nothing exactly yes, right, because you just come back again redo it all over again 
确切的说什么也不做，因为你只需要重新来过，再对它重新进行一次redo即可
01:09:54 - 01:09:58
including the CLRS that you generated from if you undo things previously 
包括你先前redo操作时生成的CLRS（如果日志落地了，那依据前面的信息，继续后面添加就是，又不影响）
01:09:59 - 01:10:04
so it's only on the undo phase where you potentially have to go figure out what was I undoing at this given time 
so 仅在undo 阶段，你可能需要弄清楚在给定的时间我该去撤消什么

01:10:06 - 01:10:16
so related his question is is there a way to avoid all those extra disk flush every single time we have a txn-end 
有一种方法可以避免每次我们有一个txn-end时都会进行一次额外的磁盘刷出

01:10:16 - 01:10:18
right and it sort of related his question as well 
这个也和他刚才的问题相关
01:10:18 - 01:10:21
right you just assume that you're not going to crash during recovery 
我们可以假设，我们并不会在恢复期间发生崩溃
01:10:21 - 01:10:30
and there or you're just gonna flush the changes in the dirty pages, use an asynchronously flush them out the disk 
然后我们可以通过异步刷盘的方式，将我们dirty pages刷出到磁盘中
01:10:31 - 01:10:36
when I think you finally say the DBMS online ready to start processing new transactions 
最后我们会说DBMS线上已经准备好开始处理新的事务了
01:10:38 - 01:10:41
 I think most systems would do take another checkpoint then 
我认为大多数系统都会进行另一个checkpoint 
01:10:41 - 01:10:44
but you don't have to correctness reasons you don't have to 
但你不需要去考虑的
01:10:45 - 01:10:49
so how can we another way to produce improve performance during the undo phase 
so 我们如何在undo阶段中通过其他方式提高性能

01:10:49 - 01:10:51
well we've already talked about a couple of these 
我们已经讨论过这两个了
01:10:51 - 01:10:56
we talked about you know figuring out that, this transaction aborted it's the only thing that modified this page 
我们有讨论指出，若该事务中止了，这是修改此page的唯一内容
01:10:56 - 01:10:58
therefore I don't need to reverse any changes on that page
因此，我不需要撤消该页面上的任何修改
01:11:00 - 01:11:10
another approach would be to actually lazily apply the rollbacks for transactions, oh at runtime 
另一种方式是在实际运行中对事务延迟回滚，
01:11:11 - 01:11:18
so you do the analysis, you do the redo, then you figure out what you need to undo for every single page 
so，你进行了分析，你进行了redo，然后，你会指出哪些是你需要去对每一个单独的page进行undo操作的
01:11:18 - 01:11:23
but then rather than applying those changes, you just sort of keeping them around somewhere in memory 
但，比起立马去undo这些修改，不如你就把这些修改先放在内存中的某个地方
01:11:23 - 01:11:29
and then anytime a new transaction comes along and it wants to read that page 
然后，在后面，只要有一个新的事务过来想要读这些page
01:11:29 - 01:11:31
then you go ahead apply the log 
然后，你就去执行log上的undo操作
01:11:32 - 01:11:35
so the idea here is like you must have like instant recovery 
so 这里的思路就像，你必须对dbms服务器进行即时恢复
01:11:35 - 01:11:40
that you say , alright I'm back online even though my DBMS is not in an incorrect State 
接着，你说了，虽然我的DBMS处于不正确的状态
01:11:41 - 01:11:45
no transaction can read those pages that have not been rollback yet correctly 
当前没有事务会去读取尚未回滚的page
01:11:45 - 01:11:48
and only when you go ahead and read them then you actually apply them 
只有当你去读这些page的时候，你再去真正的回滚它们
01:11:49 - 01:11:51
the idea there is like if you have a large database 
如果你有一个很大的数据库
01:11:52 - 01:11:58
and the undo the you'll for the undo phase you only modify a small portion of it 
在undo阶段，你只需要修改它其中很小一部分数据
01:11:58 - 01:12:03
rather than blocking access to the entire database ,why you undo this small number of pages
就为了去undo这小一部分的page，而去阻塞整个数据库的访问，你觉得值么？
01:12:03 - 01:12:06
you merely come back right away and let anybody read whatever they want 
你仅需要启动到位，然后让大家畅通访问即可
01:12:06 - 01:12:09
it's just you block them when they try to read things you haven't rollback yet
当有人要访问这些尚未回滚的内容时，你阻塞并回滚就好咯
01:12:10 - 01:12:13
I don't think anybody actually does this optimization 
我认为没有人真正进行此优化
01:12:13 - 01:12:20
and then the last one would be just the rewrite your application so you don't have long-running transactions 
最后一个就是要求重写你的应用程序，以避免那种慢查询事务
01:12:20 - 01:12:25
as you minimize how far back on the log after the last checkpoint you have to go and then replay that 
你要最简化执行你的日志，即找到日志中的最后那一个checkpoint ，去重演里面的操作
01:12:25 - 01:12:29
if you can cut that back down then the redo phase and undo phase is will much faster 
如果你可以将日志削减，那么redo阶段和undo阶段将会更快
01:12:32 - 01:12:32
okay

01:12:34 - 01:12:39
everyone you know ready to kill me or fall asleep or what, or go out and build your own database 
听我课的每个人是不是都受不了我了或睡着了或什么，出去构建自己的数据库吧


01:12:40 - 01:12:41
all right so 

01:12:42 - 01:12:51
the main idea is for aries we covered our against write ahead log using steel no force with fuzzy checkpoints, which is essentially just taking a snapshot of all the dirty page IDs 
ARIES主要涵盖了几个方面：WAL(write ahead log)使用了steel /no-force策略，fuzzy checkpoints实际上就是对所有dirty page ids进行的快照
01:12:52 - 01:12:53
so we think we know which one's got modified 
so 通过它，我们可以知道哪个page被修改了
01:12:54 - 01:12:59
and then we're gonna redo everything since the earliest dirty page we had in our write ahead log 
我们将redo所有操作，因为我们在预写日志中设定有最早的dirty page
01:12:59 - 01:13:04
and then we undo the transactions that did not end up committing,before the write-ahead log finished 
在预写日志完成之前，我们撤消那些最终并未提交的事务
01:13:04 - 01:13:10
and then we add these CLR, so make sure we record all the undo operations were doing for updates to the database 
然后，我们添加这些CLR，确保我们记录所有undo操作
01:13:11 - 01:13:19
and the log sequence numbers are the way we're going to use to figure out ,whether the log record that modified a page has been successfully written to disk or not 
对于 LSNs来说，通过它我们可以确定修改页面的日志记录是否已成功写入磁盘
01:13:22 -01:13:27
all right, we have like three minutes, let's just do a quick demo to show you that this actually does work 
 距离下课，我们还有三分钟左右，让我们来快速做一个Demo来给大家演示下这些东西


01:13:28 - 01:13:30
so there's gonna be MySQL 
这是MysqL
01:13:31 - 01:13:32
and we're gonna have one table 
我们创建一个table
01:13:34 - 01:13:44
let me turn this off too ,so sorry let's suck 
真扯淡！
01:13:48 - 01:13:49
so we're gonna have one table
so 我们创建一个table



01:13:51 - 01:13:58
that just has a single row that has ten columns
插入一行数据，总共十列

01:14:04 - 01:14:0401:14:08
right 123456789


01:14:08 - 01:14:16
and then we're gonna have a simple Python program, that is in a single transaction, it's gonna take the first column 
我们将有一个简单的Python程序，表示在一个事务中，它将取第一列
01:14:16 - 01:14:18
and just slide it over to the next one 
一个接一个遍历获取
01:14:19 - 01:14:21
and then you know it's gonna increment every column by one 
它会使每一列增加一
01:14:22 - 01:14:24
And so we're gonna let this run 
我们将这个程序跑起来
01:14:27 - 01:14:27
oh 

01:14:31 - 01:14:33
right and just to prove that it's actually working ,we go select again 
为了证明它真的运行了，我们再次查询下



01:14:33 - 01:14:36
right we see it's incrementing one by one all right 
我们有看到，它每一列增加一
01:14:36 - 01:14:39
so our transact it's running in an infinite loop 
so 我们在一个无限循环中跑我的事务
01:14:39 - 01:14:43
I mean down here we have the log message the log from MySQL to tell us that it is actually running 
我们有来自MySQL的日志消息，告诉我们它实际上正在运行 

01:14:44 - 01:14:49
so what we're gonna do is a hard kill ,on MySQL kill -9 
我们要做的就是强行终止，pkill -9 mysql

01:14:50 -01:14:52
all right that's going to kill everything 
all right 一切都被干掉了，整个世界都清净了
01:14:52 - 01:14:56
and behold you see that the log actually got tripped it says that we crash 
看你看到日志报错了，它说我们崩溃了
01:14:56 - 01:15:01
and then this is running Ubuntu, it has a service that says if like MySQL crashes it automatically restarts it for you 
这里正在运行的是Ubuntu，它有一项服务，该服务说如果MySQL崩溃，它将自动为你重启
01:15:01 - 01:15:05
but you can see we got disconnected up here, and then our Python code got disconnected here 
但是你可以看到我们在这里断开了连接，然后我们的Python代码在这里断开了连接
01:15:05 - 01:15:08
so this proves that when I did the kill -9 that like it killed everything 
so 这证明了当我执行kill -9时，它kill掉了所有东西

01:15:09 - 01:15:11
so let's actually go look in the log and see what it says 
让我们来看看日志，看看它说了什么

01:15:18 - 01:15:21
the details all this doesn't matter, but Lona holed up in here 
所有这些细节都无关紧要，但是我们要关注的在这里


01:15:22 - 01:15:28
says database was not shut down normally, starting crash recovery, start apply a batch old walk records in the data 
这里表示数据库未正常关闭，启动崩溃恢复，开始在数据中应用一批旧的行记录
01:15:28 - 01:15:30
so these are just percentages 
这些只是百分比
01:15:30 - 01:15:36
so this is doing Aries, this is saying like hey and they go look a log figure out what's running, and go ahead and replay them 
这是在做ARIES，这就是说嘿，他们去查看日志，找出正在运行的内容，然后重演它们
01:15:37 - 01:15:39
so now when we go back and look inside of our database 
现在，当我们回头查看数据库内部时
01:15:40 - 01:15:45
we connect it to prove that, we don't have any torn updates for our transactions 
我们连接上数据库，此处证明了，我们的事务没有任何残缺不全的更新

01:15:45 - 01:15:49
we should be guaranteed that every column is one more greater than the previous column 
我们应该保证每一列都比上一列大一
01:15:50 - 01:15:52
right and behold in this case it is 
在这种情况下是正确的
01:15:55 - 01:15:56
MySQL works okay
MySQL一切工作正常
01:15:57 - 01:16:01
I don't know what other way to show you a demo of the database crash other than that 
我不知道还有什么其他方式通过一个Demo来向你展示数据库崩溃
01:16:03 - 01:16:05
it's the best I could come up with ,okay ,yes
这是我能想出的最好的办法
01:16:10 - 01:16:14
like what when I killed it why did they recover right away ,that's a Ubuntu thing
当我kill掉它时，为什么他们立即恢复，那是Ubuntu的事情
01:16:15 - 01:16:18
it's Ubuntu has a service it says this if this thing crashes it'll restart it 
这是Ubuntu的服务，它会说，如果mysql崩溃，它将重新启动它
01:16:18 - 01:16:21
yeah it's not special to MySQL it's the operating system doing that
这并不是特别针对MySQL来说的，它是由操作系统来完成的
01:16:22 - 01:16:24
yeah okay all right

 
01:16:26 - 01:16:31
so this point, you can say you know you could quit CMU 
So，现在，你就可以说，你可以离开CMU了
01:16:31 - 01:16:36
you have enough information in your brain to go out and build a reliable transactional DBMS
你脑子中已经有足够的知识去构建一个可靠的事务型DBMS
01:16:37 - 01:16:41
because you knew recovering new transactions, you knew query optimization, you can do database storage 
因为你知道如何恢复事务，对查询进行优化，以及数据库存储方面的知识
01:16:42 - 01:16:45
right this is what I've at this point in the semester 
这就是我在这学期所教的东西
1.16.45-1.16.49
these are the core things you need to know of what a database does
这些都是你需要知道的核心知识，以此来弄清楚数据库所做的是什么
01:16:49 - 01:16:50
so starting next week on Monday
So，从下周一开始
1.16.50-1.16.53
 ,now start talking my distributed databases
我们会开始讨论分布式数据库
01:16:54 - 01:17:02
all the same concepts that we talked about so far the semester ,still still have the same problems the same same issues, that we think account for in distributed database 
在我们讨论分布式数据库时，依然会存在着与我们之前讨论过的概念相同的问题
01:17:02 - 01:17:04
just now we have to account for the network which can be slightly more tricky 
并且，我们也需要网络上的问题放到一起考虑，这其实有点棘手
01:17:04 - 01:17:06
ok

1.17.06-1.17.07
so again at this point
So，在此时
1.17.07-1.17.12
 even though like say, oh I won a distributed databases, you need to unchain the single-node databases first
可以这么说，我想要拿下分布式数据库，你需要先拿下单体数据库的东西
01:17:12 - 01:17:16
and this is the point you know what they're actually doing 
然后你就知道他们实际上在做什么了
01:17:17 - 01:17:18
ok guys

