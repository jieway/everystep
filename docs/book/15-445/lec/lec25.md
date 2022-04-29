



00:15 - 00:18
All right,welcome back DJ drop table,thank you
DJ Drop Table，欢迎你回来
00:21 - 00:24
you didn't buy your girlfriend present I heard 
我听说你并没有给你女朋友买礼物
00:26 - 00:32
ok lets you ever some people christmas for the holiday okay okay
圣诞节马上到了，别忘准备礼物
00:34 - 00:37
so alright what's up for you guys,
So，你们过得怎么样？
0.37-0.39
 alright so this last week classes 
So，在上周的课上
00:39 - 00:42
the project 4 still due, homework 5 what we due
我们说过Project 4和Homework 5这两个都要截止了
00:43 - 00:44
and then on Wednesdays class 
在周三的课上
00:44 - 00:48
we'll have the system potpourri and the final review 
我们会去介绍System Potpourri，并且做下期末复习
00:48 - 00:55
and I'll also be announcing the result of the Paternity test about my kid and well 
我也会去讲下亲子鉴定的结果
00:55 - 01:00
we're not two mile away ,alright so I'm outside at the end of class on Wednesday as well 

01:00 - 01:04
all right before we switch over to speaker
在我们将话筒交给演讲者之前
1.04-1.06
any questions about what's remaining progresses the semester for you guys 
在这学期的安排上面，你们还有任何问题吗？
01:06 - 01:06
yes
请讲
01:08 - 01:12
extra credit will due the same day as project 4, it should be on the website
Extra Credit的截止日期应该和Project 4是一样的，网站上应该有写
01:14 - 01:19
it will send off the feedback for the extra credit  tomorrow or Wednesday 
我们会在明天或者周三的时候放出你们所交的Extra Credit的反馈
01:20 - 01:21
okay any other questions 
Ok，还有其他问题吗？
01:23 - 01:25
All right guys

1.25-1.30
,so we're super excited today to have Shashank from Oracle come and give a guest lecture 
So，今天我们超级兴奋，因为Oracle的Shashank会给我们做一场演讲
01:30 - 01:31
and again like I said 
正如我说的
1.31-1.32
the reason why I like having him here 
我请他来这里给我们讲课的原因是
01:32 - 01:35
because it's gonna make me not seem crazy 
因为这不会让我显得太过疯狂
01:35 - 01:36
that I did tell you all these about databases and just didn't make things up 
我跟你们讲了有关数据库的一切，只是我没讲如何将它们融合在一起
01:36 - 01:41
,he's gonna say oh yeah there's a real system there making lots of money
Shashank会讲一个赚了很多钱的数据库系统
01:41 - 01:44
it does all the things that we talked about this the semester 
这个系统涉及了我们这学期所讲的所有内容
01:44 - 01:47
but he's gonna talk about it in the context of an in-memory database
但他要讲的是内存型数据库系统的相关内容
1.47-1.49
 , which is not what we talked about 
这是我们还未谈论的东西
01:50 - 01:53
but it's going to apply the same concept in a different environment
但它使用的依然是相同的概念，只是环境变了而已
01:53 - 01:56
and if you're interested in the kind of things he's talking about today 
如果你们对他今天所讲的东西感兴趣
01:56 - 02:01
this is what the advanced class 15-721 will be entirely about next semester ,okay 
这其实是我们在下学期15-721中要讲的内容
02:02 - 02:03
so Shashank is a vice president of in-memory database technologies is that correct
So，Shashank是Oracle中负责内存型数据库技术的VP，我说的没问题吧？
02:08 - 02:08 Shashank 
that's correct 
没问题
02:08 - 02:11
so he has an undergraduate and a master's degree from UC San Diego 
So，他获得了加利福尼亚大学圣迭戈分校的本科和硕士学位
02:11 - 02:14
and he's been an Oracle for six years nine years
你已经为Oracle工作了6年？还是9年？
02:14 - 02:14 Shashank 
nine years
9年
02:14 - 02:15
nine years , okay 
工作了9年
02:16 - 02:21
and again like a real dude working on the system, this is some marketing ,this is real 
这位老兄已经在这方面工作了很久，这方面是有些市场的
02:22 - 02:26
so by all means stop and ask some hard technical questions ,push him 
So，今天不要问我那些高难度的技术问题，请把这些问题丢给他
02:26 - 02:27
and see whether he actually knows what he's talking about,okay
并看看他是不是真的了解他所谈论的东西
##### Shashank #####
02:33 - 02:33
awesome all right
Awesome
2.33-2.36
 hey guys thank you for coming 
感谢你们来听我的分享
02:37 - 02:39
so again my name is Shasank Chavan 
So，我的名字是Shashank Chavan
02:40 - 02:44
I come here every now and then I guess there's a PDL lab that they come here for the retreats 

02:44 - 02:47
and I think it's like winter and spring I think 
我觉得它应该是在冬季和春季？
02:47 - 02:49
and Andy`s kind enough to invite me  
Andy热情地邀请了我
02:49 - 02:51
so thank you again for inviting me here 
So，再次感谢你邀请我来让我进行分享
02:51 - 02:56
so today's talk is gonna be on this top five innovations of Oracle's database in-memory 
So，今天分享的主题是关于Oracle数据库在内存中的5大创新
02:56 - 03:01
so this talk was initially given to folks actually know about the database in-memory product 
So，这场分享一开始是给那些对内存型数据库产品有过了解的人而举办的
03:01 - 03:06
I kind of changed it a little bit to kind of give you guys a background on what database in-memory is 
我对我要讲的内容做了一些修改，我会给你们介绍下什么内存型数据库的背景
03:06 - 03:11
like Andy said please feel free to stop me at any point in time any time you have a question of
就像Andy说的，当你们有问题的时候，你们可以随时打断我
03:11- 03:12
 no problems
这没关系
03:12 - 03:12
I as I was telling Andy,
我之前跟Andy讲过
3.12-3.14
 I usually have more slides
我通常会使用很多幻灯片
3.14-3.16
, and I have time for the talk so sometimes I talk too fast
我为了有时间讲完我要讲的内容，有时候我的语速会过快
03:16 - 03:19
so just interrupt me any time you want to, okay 
So，当你们有问题的时候，随时打断我就行了
03:20 - 03:24
okay so let me see I just wanna make sure I'm following the slides appropriately ,okay 
Ok，我先来检查下幻灯片的播放顺序对不对
3.24-3.26
great so that's my next slide 
Great，这是我的下一张幻灯片


03:26 - 03:29
all right so I like to start off with this motivation slide 
So，我想先从这张幻灯片开始讲起
03:30 - 03:34
this is talking about real-time enterprises need in-memory innovations now! 
这里我们要讨论的是那些对数据有实时要求的企业需要我们这种内存中的创新


03:35 - 03:35
okay 

3.35-3.43
so the slide that I have currently what I really wanted to show was this slide
So，我真正想展示的是这张幻灯片
3.41-3.43
 with our presidents tweeting in the morning
从这张图上，我们可以看到我们的总统在早上发推特
03:41 - 03:47
”called to arms” Real-Time EnterpriZes Need in-memory innovations now! 

03:47 - 03:49
but I was told would be too political 
但这里我所讲的内容可能太过政治
03:50 - 03:53
so I opted for this instead
于是，我就换掉了这张图片
03:53 - 03:55
but I actually like this one better
但我觉得这张图片实际上会更好
3.55-3.56
because it's real,.
因为这张图片很现实
3.56-3.57
 it actually is very true 
实际上，它非常真实
03:59 - 04:00
He literally said that 
特朗普确实这么说了
04:00 - 04:00
no 
其实没有
04:03 - 04:08
this is actually when the impeachment trial started I think is when we put the slide Together
这实际上是谈判开始时的图片，然后我就将它放到幻灯片上了


04:08 - 04:09
but the reality is 
但现实是
4.09-4.13
following real time enterprises our enterprises that need access to data now 
这些Real-Time企业需要做到对数据的实时访问
04:13 - 04:17
their data-driven, they are agile ,they're efficient 
它们是数据驱动的，它们是敏捷且高效的
04:17 - 04:19
they want to be able to react instantly to data 
他们想要能立刻对数据做出响应
04:19 - 04:23
so you can imagine they're a bunch of enterprises that fit this category
So，你们可以想象得出，有一堆属于这个分类的企业
04:23 - 04:27
right like insurance companies retail is manufacturing process these financial services
比如：保险公司、制造工艺，金融服务
04:27 - 04:30
people need to do fraud detection in real time 
人们需要能够实时检测出欺诈行为
04:30 - 04:35
actually this just happened ,yesterday I was buying some speakers that Best Buy
实际上，我昨天在BestBuy上购买扬声器的时候就发生过这种事情
04:35 - 04:36
because they're on sale 
当它们在出售商品时
04:36 - 04:39
and literally after I made that purchase 
其实应该这么讲，当我买完商品后
04:39 - 04:40
I got a text message that says,
然后，我收到了这样一条消息
4.40-4.42
 are you certain that you want to make this purchase,
该消息表示：我想购买这个商品
4.42-4.43
 did you make this purchase blah blah blah 
上面还有我是否买个这个商品之类的消息
04:44 - 04:48
because they immediately know that I'm not the kind of person that makes a 500 purchase 
因为他们立刻知道我并不是那个买了500美金商品的人
04:48 - 04:51
you know on the spur of the moment that's just not me 
你知道的，并不是我买了这个商品
04:52 - 04:54
so anyways that that's real time 
So，总而言之，这种就是Real-Time（实时的）
04:54 - 04:56
and so in order to achieve that
So，为了做到这一点
4.56-4.58
we need a lot of things to come in place 
我们需要做到很多东西
04:58 - 05:01
so we see the demand that's coming from enterprises companies right 
So，我们看到很多企业都有这样的需求


05:02 - 05:05
so what's actually making this possible 
So，是什么使这变为可能呢？
05:05 - 05:08
so if you look at the hardware trends okay 
So，如果你看下硬件发展趋势
05:08 - 05:10
you're starting to have larger, cheaper,memory
最上面，我们有容量更大，价格更低的内存
05:11 - 05:13
so DRAM everybody's familiar with memory
So，DRAM也就是人们所熟悉的内存
05:14 - 05:17
PMEM I don't know how many of you are familiar with persistent memory 
我不清楚你们中有多少人知道PMEM（持久内存）
05:17 - 05:20
I talked about that and the last bullet there, so I'll get to that then 
我稍后会去讲这个PMEM
05:20 - 05:22
you have larger CPU caches 
我们现在拥有了更大的CPU缓存
05:22 - 05:28
so now we're talking about 32MB of shared L3 cache on Intel's latest processors 
So，在intel最新的处理器上它的共享L3 cache的容量是32MB
05:28 - 05:31
you have larger multi-core processors 
现在我们也拥有了更多核的CPU处理器
05:31 - 05:34
so 24 cores with Intel cascade Lake 
So，intel的cascade Lake架构CPU拥有24个核心
05:34 - 05:37
larger SIMD vector processing Units
接着是更大的SIMD Vector Processing Units
5.37-5.42
show of hands the folks who know what simd is you hear that before single instruction multiple data
举下手，让我看看有没有人知道SIMD（single instruction multiple data）
5.42-5.42
, excellent okay
Excellent
05:42 - 05:50
so now you have 512 bit SIMD registers, that can paralyze your operations essentially  in a single cycle 
So，现在我们拥有512位的SIMD寄存器，它们可以在一个cycle中并行执行你的操作
05:50 - 05:51
faster Network
更快的网络
5.51-5.58
so you have 100Gb/s RoCe vs the 40Gb/s, that you have with Infiniband 
So，RoCe(RDMA over Converged Ethernet)的速度是100Gb/s，Infiniband的速度是40Gb/s
05:58 - 05.59
Numa architectures
Numa架构（非统一内存访问架构）
5.59-6.03
so that you have now you have to concentrate on local memory vs remote memory 
So，你现在必须去关注本地内存和远程内存
6.03-6.04
there's a bunch of factors 
这其中存在着很多因素
06:04 - 06:15
persistent memory is really the biggest in my mind and at Oracle and a lot of our group  ,we think is a big-time game changer in the memory technology space 
对于Oracle以及我们的很多工作组的成员还有我来说，我们觉得持久内存是内存科技领域的破局者
06:15 - 06:17
so persistent memory is basically like DRAM 
So，简单来讲，持久内存和DRAM很像
06:17 - 06:18
it's just like memory
它很像内存
6.18-6.23
, except it's a lot larger about 3x times the size of DRAM
除了它比DRAM的容量大3倍以外
06:24 - 06:26
it's got availability
它具备可用性
6.26-6.27
because it's persistent
因为它是持久化的
6.27-6.28
you pull the plug 
当你拔掉电源
06:28 - 06:30
you're doing you put the plug back in 
然后又将电源插上去后
6.30-6.33
the data still they're sitting in these persistent memory dimms 
这些数据依然存放在持久内存中
06:33 - 06:35
and it's it's fast 
它的速度很快
6.35-6.37
it's not faster than DRAM 
它的速度并没有DRAM那么快
06:37 - 06:39
but it's way faster than flash 
但它的速度要比闪存快
06:39 - 06:44
so it's got a lot of really cool qualities, and all of these things combined
So，这里真的有很多很Cool的特质，并且所有的东西都结合在了一起
06:44 - 06:49
help us move towards meeting the requirements of real time enterprises
帮助我们在满足这些Real-time企业的需求上不断迈进
06:50 - 06.53 Andy
so there's a lot of projects relies on logging and recovery doing Aries
So，有很多项目都是使用ARIES来做到logging和Recovery
6.53-6.55
 so think about this
So，思考下这个东西
6.55-6.58
you're writing your ability to write out dirty pages in your buffer pool
你会将你的dirty page写入你的buffer pool中
6.58-7.02
persistent memory you don't want to do on project 4 if that exist
你不会想在Project 4中使用持久内存，即便它存在的话

07:03 - 07:03
exactly 
确实如此


07:05 - 07:05
okay

7.05-7.08
where do we have in-memory today

7.08-7.10
in case we have different tiers 
如图所示，这里我们有几个不同的层面
07:10 - 07:13
so the top tier here is application-tier 
So，最上面的一层是应用程序层
07:13 - 07:16
this is where you care about an immediate response time 
这里你所关心的东西是即时响应时间
07:16 - 07:18
so imagine you have an application 
So，想象一下，你有一个应用程序
07:18 - 07:22
and you're gonna link this database directly into your applications 
你将数据库直接链接到你的应用程序中
07:22 - 07:24
shares the same process base the memory space
它们共享相同的进程和内存空间
7.24-7.25
everything is shared 
所有数据都是共享的
07:25 - 07:27
and so you're gonna get immediate response time 
So，这样你的即时响应时间就很短
07:27 - 07:29
this is extremely important 
这点非常重要
7.29-7.30
if you're like OLTP sensitive 
如果你的数据库针对OLTP的
07:31 - 07:33
and you want to do an insert very quickly or read very quickly
并且你想做到快速插入数据或者快速读取数据
07:33 - 07:35
you're just getting a value for this particular key 
比如，拿到特定key所对应的值
07:36 - 07:43
so that's TimesTen ,TimesTen came out years ago was one of the first in-memory did I think it was the first in-memory database 
So，TimesTen是我记忆中第一个内存数据库
07:43 - 07:45
I think it's what Oh No maybe 20 years ago
它是20年前所推出的
7.45-7.46
, so it was 96
So，它是在1996年左右推出的
7.46-7.48
, okay much long enough 
Ok，它出现很久了


07:49 - 07:51
so that's that TimesTen
So，这就是TimesTen
7.51-7.52
, that's in the application-tier 
它是在应用程序层的
07:52 - 07:54
Database-tiers what I'm gonna talk about 
我接下来要讲的是数据库层面的东西
7.54-7.56
, that's where we have Oracle database in-memory 
我们将Oracle数据库放在了内存中
07:56 - 08:01
and this is where we really care about analytics, but will also mix workload performance 

08:01 - 08:05
and it's embedded directly into a real working enterprise database 
它直接被嵌入到了企业数据库中
08:06 - 08:10
and then you're processing things that billions of rows per seconds , when you're looking at Analytics
当你对数据进行分析时，你就会每秒处理数十亿行数据
08:11 - 08:13
then there's also the storage-tier 
接着，这里还有存储层
08:13 - 08:14
so I'll talk about that as well 
So，我之后也会讨论
08:14 - 08:15
and by the storage-tier means 
存储层的指的是
8.15-8.24
where the data is actually residing whether it be on on disk in some persistent store on flash, or something close to basically a persistent store
即数据所实际存放的位置，它可能会放在磁盘上，或者闪存上，或者某种类似于持久化存储设备的东西上
08:24 - 08:29
so yeah the application tier your database-tier ,storage-tier ,and I'll talk mostly about the database-tier 
So，我们今天主要讨论的是这三个层面中的数据库层
08:29 - 08:31
and the storage-tier okay 
以及存储层


08:32 - 08:32
okay

8.32-8.39
so I'm gonna start off with a background on what Oracle database in-memory is 
So，我会先去介绍下Oracle的内存数据库的相关背景
08:39 - 08:39
okay 


08:39 - 08:41
let's start with some basics okay 
我们先从一些基础开始讲起
08:42 - 08:47
so before we had column databases which is in the next slide 
So，在我们拥有列式数据库之前，这个我们会在下一张幻灯片中讲下
08:47 - 08:48
we basically have row databases 
简单来讲，在它出现之前，我们使用的是行式数据库
08:49 - 08:53
row wise databases are fantastic , if you care about transactions
如果你比较关心执行事务这方面的话，行式数据库的效果就会很棒
8.53-8.53
, okay

08:53 - 08:56
so as an example ,your an ATM machine 
So，以ATM机为例
08:56 - 08:57
you have you ATM card 
你有一张ATM卡
08:57 - 09:00
you wanted the deduct 25 $20 from your account 
你想从你的账户中取20美金
09:01 - 09:03
that's a transaction that you're applying 
这就是你要执行的交易（事务）
09:03 - 09:16
you're going to quickly search through this gigantic database of you know millions or billions of users ,not billions, but certainly many millions  and search for your particular account, find your balance, and deduct $20 from it 
你就会在这个拥有数百万用户信息的大型数据库中找到你的账户，然后找到你的存款余额，并从里面扣除20美金
09:16 - 09:24
so that's like looking for a specific row and potentially accessing multiple columns within that row 
So，这其实就是在寻找一个特定的行数据，并访问该行中的多个列数据
09:24 - 09:26
that's great for it that's transaction processing 
对于事务处理来说，行式数据库真的很棒
09:27 - 09:33
so row database is very good for accessing a particular row and then touching multiple columns within that row 
对于访问一个特定的行数据并接触该行的多个列数据来说，行式数据库真的很棒

09:33 - 09:34
so as an example here
So，来看下这里的例子
9.34-9.39
, if you're running this query like select COL4 from mytable 
如果你执行下图上这条SQL语句



09:39 - 09:45
what you have to do is you basically have to process each row, and hop to COL4 to get to it
简单来讲，你必须对每行数据进行处理，拿到每行第四列的数据
09:46 - 09:48
right so the problem is
So，这里的问题是
9.48-9.49
 when it comes to analytics is 
当我们要对数据进行分析时
9.49-9.52
,you're basically visiting every single row 
你基本上就要去访问每行数据
09:52 - 09:59 
but on top of that ,you're going column by calling ,column touching multiple cache lines to get to the column ,that you care about 
但在此之上，你通过访问cache line去获取这些你所在意的列数据
09:59 - 10:05
so it's again fantastic, if you want to get to a specific row and access a specific column
So，如果你想访问并获取特定列的数据，那么这就很棒
10:03 - 10:06
, that's row format 
这就是行式数据库


10:08 - 10:11
now column  format is fast for analytics
在分析数据方面，列式数据库的速度很快
10:11 - 10:12
okay 

10.12-10.14
analytics is where you say
分析数据指的是
10.14-10.16
, I actually care about visiting all the rows 
我关心的是我访问的所有行数据
10:17 - 10:20
but I'm only interested in certain columns, right
但我只对某些列的数据感兴趣


10:21 - 10:22
so in this case now,
So，在这个例子中
10.22-10.26
 if I just want to say select COL4 from mytable 
如果我想执行图上这条SQL语句
10:26 - 10:29
all I need to do is visit COL4, okay
我所需要做的就是访问COL4的数据
10:29 - 10:32
the data is stored in columns in contiguous memory 
数据是保存在这些连续内存中的列里面的
10:32 - 10:36
each column here is in a contiguous piece of memory 
这里的每个列就是一块连续的内存
10:37 - 10:40
any questions so far the difference between row format and column format 
在讲行式和列式方面，你们有任何疑问吗
10:41 - 10:44
we don't do that ok great awesome .
Ok，看起来并没有什么问题，Awesome


10:45 - 10:46
okay

10.46-10.53
so the innovation on what Oracle develop for our in-memory product is
So，Oracle所开发的这种im-memory产品的创新点在于
10:53 - 10:56 
we decided that you can't just have one or the other
我们决定你不能只使用一种格式
10:56 - 10:59
it's just not feasible really for enterprise companies 
对于企业和公司来说，这不可行
10:59 - 11:02
enterprises are basically more interested in mixed workloads 
基本上来讲，企业对混合workload更感兴趣
11:02 - 11:03
sometimes the running analytics 
有时他们会让数据库去分析数据
11:03 - 11:04
sometimes the running transactions 
有时他们会让数据库执行事务
11:05 - 11:07
sometimes and it could be very mix 
他们的workload是非常杂乱的
11:07 - 11:10
sometimes they run ad-hoc queries use gigantic queries 
有时他们会去执行ad-hoc查询（即席查询）或者那种大型查询
11:10 - 11:11
sometimes a very very simple queries 
有时候，它是非常简单的查询
11.11-11.13
, so it's a mix
So，它是混合的
11:13 - 11:18
and so we basically decided , that you're not you can't just choose one format  
简单来讲，你不能只使用一种格式
11:18 - 11:19
we basically want to have both formats 
简单来讲，这两种格式我们都想要



11:19 - 11:22
and so that's why we have this thing called dual format architecture 
So，这就是为什么我们会有这种双格式架构（dual format architecture）的原因了
11:23 - 11:25
so with dual format architecture
So，在这种双格式架构下
11.25-11.29
 we basically maintain both the traditional row-store that's sitting in your buffer cache 
简单来讲，我们要去维护放在你buffer cache中的那些传统的行存储数据
11:30 - 11:34
as well as a columnar representation that's sitting in-memory 
我们还要去维护那些放在内存中的列存储数据
11:34 - 11:36
okay we maintain both  
Ok，这两种数据我们都要维护
11:36 - 11:41
and both of them are simultaneously active and consistent with each other
这两者都处于活动状态，并且彼此一致
11:41 - 11:43
all the brains goes into the optimizer 
所有的事情都是优化器来决定的
11:43 - 11:48
the optimizer decides when it sees the query which path it should take 
当优化器拿到查询时，它会去决定该使用行存储数据还是列存储数据
11:48 - 11:49
so for example 
So，例如
11.49-11.50
,if it sees a query that says
如果优化器拿到一个查询，它表示
11.50-11.54
, I really want to get to this particular row ,this key and extract that value 
我想拿到这一行中的这个key所对应的值
11:55 - 11:57
and I have this OLTP index on it 
在这一行上面我们一个OLTP索引
11:57 - 11:59
the optimizer will say go to the buffer cache 
优化器表示它要去访问buffer cache
11:59 - 12:01
and fetch the index block for it 
拿到这个索引区块
12.01-12.02
,and read that row 
并读取这一行
12:03 - 12:04
and that's how fast it'll get that row 
这就是它能快速读取到这行数据的原因所在
12:05 - 12:07
if the query is an analytic query
如果该查询是一个分析型查询
12.07-12.11
 ,and you're doing some kind of crazy aggregation or group by somewhere some joins or whatever it is
如果你要做一些疯狂的聚合操作、GroupBy操作或者join操作
12:12 - 12:15
it'll use the column store ,okay 
它就会使用这种列存储数据
12:16 - 12:21
so it's for us when we develop this database in-memory 
当我们开发这个database im-memory功能时
12:21 - 12:24
we built it natively into the database 
我们在数据库内原生构建了它
12:24 - 12:28
so it's not a separate storage engine, it's part of the existing storage engine 
So，它不是一个单独的存储引擎，它是现有存储引擎的一部分
12:28 - 12:33
it's basically just a think of the the column representation as if it was an index 

12.33-12.35
and index that resides in-memory 

12:36 - 12:37
okay any quick question 
Ok，有任何问题吗？请问
12:51 - 12:57
so if it depends on what the percentage of writes are to do your workload 
So，这取决于你workload中的写操作的占比
12:57 - 13:03
so I'll cover that in second in terms of how we handle writes or updates or whatever or DML in general 
So，我稍后会讲，我们该如何处理写操作或者更新操作或者DML之类的东西
13:03 - 13:07
if you're doing let's say 1% of your workload is writes, ok
假设你1%的workload是写操作
13:08 - 13:09
that's not a problem 
这不是什么问题
13.09-13.13
that's basically a mixed workload even five to ten percent is fine 
基本上来讲，这就是一个混合workload，即使写操作的比例是5%-8%也没问题
13:13 - 13:18
when you start getting to a higher percentage or like twenty thirty forty percent maybe let's say 
当你写操作的比例变得更高时，假设是20%，30%或40%这种
13:18 - 13:20
this is not the right solution for you 
对于你来说，这可能并不是正确方案
13:20 - 13:24
because now as you'll see you're basically oops ,I'm sorry I don't know how that advanced ah
抱歉，我不知道如何切换下一张幻灯片
13:24 - 13:28
you know you're probably running with the timer yeah, okay
你知道的，我们在赶时间
13:30 - 13:33
so what you're doing is you're basically maintaining both ,right 
简单来讲，这两个你都要去维护
13:33 - 13:36
you're maintaining this column store and the rows store
你要去维护列存储数据以及行存储数据
13.36-13.37
 ,and that could become problematic
这就会很成问题
13.37-13.38
okay 

13:38 - 13:41
so I'll describe how we handle that very efficiently 
So，我会去描述我们如何高效地处理这个
13:43 - 13:44
any other questions 
还有其他问题吗
13:49 - 13:52
next one all right cool 
我想要下一张幻灯片
13:54 - 13:54
awesome
Awesome


13:55 - 13.56
all right

13.56-13.58
let's go into some of the details, okay
我们来看下其中的一些细节
13.58-14.00
 in terms of how we store this data 
即我们如何保存这些数据
14:00 - 14:03
so what you see here is a table 
So，你们这里所看到的是一张表
14:03 - 14:06
we store the data in a very pure in-memory column representation 
我们将数据保存为一种pure in-memory column格式
14:07 - 14:11
so sales table continues to sit on disk
So，这张Sales表依然是放在磁盘中的
14.11-14.12
, doesn't change ,right 
它并没有发生什么改变
14:12 - 14:15
it's exactly as you guys know it to be
它就和你们知道的那样，没有什么变动
14:15 - 14:16
it can be pulled into the buffer cache
它可以放入buffer cache中
14.16-14.20
, if it's accessed that doesn't change 
如果有人访问这张表，它并不会发生什么变化
14:20 - 14:21
but what you do is 
但你所做的事情是
14.21-14.24
if you say bring this table into in-memory 
如果你说你要将这张表放入内存中
14:25 - 14:28
we will basically bring it into in-memory 
那么我们就会将它放入内存
14:28 - 14:31
we'll take the rows transpose them into columns 
我们会将这些行数据变成列数据
14:31 - 14:36
and then store the columns into blocks of contiguous pieces of memory
并将这些列数据保存到这些连续的内存区块中
14:37 - 14:38
okay

14.38-14.39
there's no changes to the disk format 
这不会对磁盘格式造成什么改变
14.39-14.43
Oracle so we support all platforms 
我们Oracle支持所有的平台
14:43 - 14:46
you can enable in-memory at any level 
你可以在任何层面都使用in-memory功能
14:46 - 14:51
okay at the tablespace level at the tables at a column level even 
比如：tablespace层面、table层面或者column层面
14:51 - 14:52
you can specify any level 
你可以指定任意层面使用这个功能
14:52 - 14:54
and the only thing you do need to do is
你唯一需要做的事情是
14.54-14.59
 you need to tell us how much memory you want to reserve for your column store 
你需要告诉我们，你想为你的列存储数据保留多少内存
14:59 - 15:00
Okay

15.00-15.03
that's as I'll talk about some of the future stuff we're working on
我稍后会讲下我们未来要做的东西
15.03-
 but that's a

15:05 - 15:07
the only thing you really have to do is tell us how much memory 
你唯一需要告诉我们的事情就是你要使用多少内存


15:08 - 15:11
now if you dive in deeper into us okay 
如果你对此更加深入的话
15:11 - 15:18
we basically block out these rows in something called IMCU in-memory compression unit,okay 
简单来讲，我们会对这些行数据进行打包，打包出来的东西叫做IMCU（in-memory compression unit，内存压缩单元）
15:18 - 15:20
IMCU in-memory compression units
IMCU，内存压缩单元
15:20 - 15:26
and in IMCU basically has about a half a million rows half a million to a million rows 
简单来讲，一个IMCU会包含一百万个行数据
15:26 - 15:28
and within each IMCU 
在每个IMCU中
15.28-15.31
you have all the columns for that table 
你拥有该表的所有列
15:31 - 15:34
so here in this sales table here
So，在这个Sales表中


15.34-15.37
,you have the employee ID, name ,Department ,salary
我们有EmpID，Name，Dept以及Salary这几个字段
15:37 - 15:40
okay we also have this row ID column 
我们还有一个ROWID字段
15:40 - 15:42
now this is really important
ROWID非常重要
15.42-15.45
, this is kind of the little trick that we have 
我们可以通过它来使用某种小技巧
15:45 - 15:52
that row ID column maps to the actual locations of those rows on disk 
ROWID这一列指向的是这些行数据在磁盘上的实际位置


15.52-15.53
which is this bottom part here 
也就是底部这部分东西
15:54 - 15.57
so on disk we basically store data in extents
So，基本上来讲，我们将数据保存在磁盘上的extent中
15.57-16.01
which are basically contiguous pieces of blocks
简单来讲，extent就是为存储数据而分配的一组连续的数据块
16:01 - 16:03
and this extent says
这里表示
16.03-16.05
 extent number 13 as blocks 20 to 120 
extent #13中保存的是从20到120的Block
16:06 - 16:08
extent number 14 as blocks to 82 to 182
Extent #14所保存的是82到182的Block
16:08 - 16:13
and in each block you have like you know some you know hundreds 100 or thousands of rows 
在每个Block中，它里面包含了100行或者上百行的数据
16:14 - 16:22
and so this IMCU is mapped directly to the physical locations on disk
So，IMCU会直接映射到这些行数据在磁盘上的物理位置
16:22 - 16:24
and why this is important is 
它为什么很重要呢？
16.24-16.27
,because when you have a modification to a row 
因为当你要对某行数据进行修改时
16:27 - 16:30
it's very easy to say which IMCU does that map to 
我们可以很容易地知道它对应的是哪个IMCU
16:31 - 16:36
and I'll go through a another slide that talks about , how we utilize this when we talk about DML 
当我们讨论DML的时候，我们会在另一张幻灯片上讨论我们该如何利用这个
16:37 - 16:39
so the only other point to make here is 
So，这里我们可以做的另一件事情就是
16.39-16.43
you can specify ,how you want to compress this column 
你可以明确下你想如何压缩这个列的数据
16:43 - 16:47
so you know you don't think you guys talked about compression yet,or different data formats 
So，我不清楚你们是不是讨论了数据压缩，或者不同的数据格式
16:47 - 16:51
and you guys heard a dictionary encoding before , or prefix encode 
你们之前有听过字典加密或者前缀加密吗
16:51 - 16:53
okay so well I think I have a few slides on this 
Ok，我应该做了一些幻灯片
16:53 - 16:56
but you can specify what compression levels you want,you're limited to on memory 
但你可以指定你想要的压缩级别，你可以限制在内存中进行压缩
16:56 - 17:00
so you can bring it into memory and compress it however you which way you want to 
So，你可以将数据放入内存，并使用你想要的方式来对它进行压缩
17:01 - 17:01
okay 




17.01-17.04
so that's how we store things
So，这就是我们保存数据的方式
17.04-17.06
 as I'm shocked here's the slide on on compression 
我这里所展示的这张幻灯片是关于压缩的


17:06 - 17:08
so how do we actually store this data okay 
So，我们实际该如何保存这些数据
17:08 - 17:11
so imagine this was your column 
So，想象一下，这就是你的列数据
17:11 - 17:14
okay this is your uncompressed data 
Ok，这就是你未压缩的数据
17:14 - 17:18
and I have Cat Cat, fish fish, horse horse horse horse ,dog dog, cat etc 
在这里面，我有CAT CAT，FISH FISH，HORSE HORSE之类的数据
17:18 - 17:19
okay

17.19-17.23
it's not actually sorted I have dogs here and cats here ,but this is just my example 
但在我的例子中，这些数据实际上并没有被排序


17:23 - 17:26
so the first thing we do is we dictionary encode this 
So，我们首先会做的就是使用字典对这些数据进行加密
17:27 - 17:29
so dictionary encoding means is
So，字典加密的意思是
17.29-17.33
 it identifies the distinct symbols in that column
它会去识别该列中的那些去重后的字符
17.33-17.36
, pulls out those distinct symbols
它会将这些去重后的字符拉出来
17:36 - 17:38
and then sorts those distinct symbols
然后对这些去重后的字符进行排序
17:39 - 17:41
and then assigns a code to them 
接着，给它们分配一个编码
17:41 - 17:46
so you have cat, dog ,fish ,horse, that's all you have in this in this column 
So，这里就是你列中去重后的字符，它们是CAT、DOG、FISH和HORSE


17:46 - 17:47
I sort them 
我对它们进行排序
17.47-17.50
and I sign them codes at 0 1 2 & 3 
我给它们分配的编码是0、1、2和3
17:51 - 17:57
and and you just have to replace the values of Cat Cat, fish fish etc with the codes themselves 
然后，你必须将CAT CAT，FISH FISH之类的数据替换成这些编码
17:58 - 18:00
and we take it one step further 
然后我们再进一步对它们进行处理
18:00 - 18:01
we actually bit pack those codes
我们使用bit来打包这些编码
18:02 - 18:04
so because they're only four distinct symbols there 
So，因为这里去重后只有4个不同的字符
18:04 - 18:08
I only need two bits, right to represent each one of those symbols
我只需使用两个bit来代表每个字符
18:08 - 18:13
so 00, 00,10 etc ,
So，就如这里的00，00，01等等
18.11-18.13
ok so far so good
Ok，到这里都没问题吧
18:13 - 18:14
so that's the dictionary encoding 
So，这就是字典加密


18:15 - 18:16
the next thing we do is 
我们接下来要做的事情是
18.16-18.20
we apply orally or run length encoding 
我们会使用Run-length加密
18:20 - 18:21
run length encoding is basically saying 
简单来讲，Run-length加密指的是
18.21-18.27
let me see if I can identify a run of the same symbol  and number of times

18:25 - 18:33
 and replace all end copies with a single copy along with the run, right account 

18:33 - 18:35
so here you notice that
So，此处你们会注意到
18.35-18.40
 we have Cat Cat and fish fish or rather 00, 00 and 10, 10,
这里我们有CAT CAT和FISH FISH，旁边则是00，00和10，10之类的东西
18.40-18.43
 where I can replace that with just 00 and 10 
我可以使用00和10来替换这些东西
18:43 - 18:45
and then I have a run over there
这里我有一个run
18.45-18.48
 is this little button the yeah, there
我是不是该按这个按钮？
18.48-18.50
 you go perfect 
好的
18:50 - 18:53
so then you can see their names basically maintain some runs 
So，你可以看到它们的名字维护了一些runs
18:53 -  18:56
that just identifies how many runs there are for those symbols 
这用来识别每个符号的runs数量
18:56 - 18:57
so far so good
So，到目前为止没问题吧
18.57-18.58
, okay 


18:59 - 19:01
then we take it one step further
然后，我们这里再做一步
19.01-19.04
 ,we apply something called OZIP or oracle zip 
这里我们使用了一种叫做OZIP或者Oracle Zip的东西
19:05 - 19:10
oracle zip is very much it's pretty much a fancy dictionary encoding algorithm 
Oracle Zip是一种非常棒的字典加密算法
19:11 - 19:12
but it's fantastic
它很棒
19.12-19.14
 ,because it's very simple 
因为它很简单
19.14-19.18
,and  it's hardware friendly to decompress 
在解压缩方面，它对硬件友好
19:18 - 19:21
I won't go into too many details what we describing what's happening here 
我不会对此过于深入，我这里只是介绍这里发生的事情
19:21 - 19:21
so what it's doing is
So，它这里所做的事情是
19.21-19.28
it's now finding patterns within the the encoded the values now 
它会在这些加密的值中查找匹配的字符


19:28 - 19:30
so here you have 00, 10 ,11, 01
So，这里我们所拥有的值是00，10，11和01
19.30-19.35
 and you see the same pattern of 00101101
你可以看到这里有相同的字符串，即00，10，11和01
19:35 - 19:43
so you'll replace the set of of 8 bits now with a single code of 0 or sing a bit of 0 
So，你会将这8个bit使用一个0来替换
19:43 - 19:45
and you'll replace 01 with 1
你用1来替换01
19.45-19.47
 ,and now you've compressed it even further 
现在，你就可以对数据进一步压缩
19:48 - 19:52
so you're building and yet another dictionary on top of the encoded stream
So，你现在就会在这个加密stream上建立出另一套字典
19:53 - 19:54
so far so good 
So，到目前为止都还好吧
19.54-19.54
ok 

19:55 - 19:56
so that's what we do
So，这就是我们的做法
19.56-19.57
 we take it to kind of stream
我们拿到一个stream
19:58 - 19:59
and then you can actually take this  
然后，你就可以对它进行这些流程处理
19:59 - 20:04
and you put Z ZLib on top of it or Bzip ,alright at a higher level compress on top of it 
你可以使用ZLib或者BZip之类的压缩算法来对这些stream进行压缩




20:06 - 20:06
okay

20:07 - 20:11
all right one more compression form I want to talk about is something called prefix encoding 
All right，我还想讨论的一种压缩形式就是前缀编码
20:11 - 20:13
so we talked about that dictionary, right 
So，我们已经讨论了字典加密
20:13 - 20:18
a cat dog horse etc notice how they were all sorted 

20:19 - 20:20
well so once it's sorted 
So，一旦这些数据被排好序
20:20 - 20:26
you can actually remove a common prefixes from adjacent symbols and store them separately 
实际上，你可以移除这些连续标志符的公共前缀，并将这些公共前缀单独保存起来
20:26 - 20:33
so the example I have here in this dictionary is use ,used ,useful, usefully, usefulness etc right 

20:33 - 20:39
and they all have used , but some of the symbols can actually benefit for something more like useful 

20:39 - 20:41
so what we'll do is 
So，我们要做的事情是
20.41-20.44
we'll basically take out maybe like a block of eight symbols 
简单来讲，我们会从中取出一个包含8个标志符的区块
20:44 - 20:48
and then from those eight symbols we'll find the the common prefix across those eight symbols 
然后，我们会从这8个标志符中找出它们的公共前缀
20:49 - 20:49
in this example
在这个例子中
20.49-20.51
 , I think I'm using two symbols
我使用了两个符号
20.51-20.56
, so use for use and then D is the suffix for used 
So，对于USE和USED来说，USE的前缀就是USE，D是USED的后缀
20:56 - 21:02
so I just maintain the prefix along with an empty suffix here for the first symbol ,and D for the second one 
So，这里我维护了一个公共前缀USE，第一个标志符的后缀是空的，第二个标志符的后缀则是D
21:02 - 21:05
and then the next one we'll use useful 
接着，在下一个例子中，我们使用的公共前缀是USEFUL
21:05 - 21:09
because the third symbol here is useful
因为这里第三个标志符是USEFUL
21.09-21.10
 ,and the same thing
这里我们进行相同的处理
21.10-21.12
, and then our grabs the suffixes 
接着，我们拿到了这些标志符的后缀
21:12 - 21:14
so this just gives you some more compression 
So，这样你可以对数据进行进一步压缩
21:15 - 21:16
So far so good okay 
So，到目前为止都没问题吧
21:17 - 21:20
problem with this stuff is the following right

21:20 - 21:23
you have to decompress it ,and that could take some time

21:24 - 21:27
you can't just point to use and D 

21:27 - 21:33
because you have to stitch them up at some point , and give it back to , whatever operator wants the actual symbol 

21:33 - 21:36
so there's a cost associated with compressing 

21:36 - 21:38
and then decompressing as a result 

21:49 - 21:53
for the column, we have specialized formats , where we like 

21:53 - 21:56
we know what the format is you don't have to decompress it 

21:56 - 22:00
we have some tricks too like for example for a dictionary encoding ,for a prefix encoding 

22:00 - 22:07
we have tricks that use SIMD ,that that allow you to not have to ever stitch things back together, when you're doing a scan , when doing a projection you do 

22:07 - 22:11
roast or roast or has a compressor very much like dictionary encoding 

22:12 - 22:16
but it operates across multiple rows and it's far more complex 

22:16 - 22:18
so you're right when you actually have to project back 

22:18 - 22:21
it's a complicated stitching algorithm to bring it back together again

22:22 - 22:25
alright so far so good ,okay 


22:25 - 22:30
alright so we talked about how we bring the data into memory 

22:30 - 22:32
we talked about how we format it and compress it

22:33 - 22:37
now we're going to talk about ,how do we scan ,how do we actually use that data and actually scan fast 

22:37 - 22:43
how do we get to this billions of rows per second versus the millions of rows per second, when you're looking at a buffer cache in a row store

22:43 - 22:45
so this is where SIMD comes into place

22:45 - 22:50
so SIMD again for those of you don't know stands for single instruction multiple data 

22:50 - 22:59
and what that does is a lot of most modern processes now now for last ,I don't know 15 20 years maybe, and well since 96 I think 

23:00 - 23:08
have a in the processor ,have a vector, a vector ization unit where they have very fat registers

23:09 - 23:10
and not only do they have those fat registers 

23:10 - 23:13
they have a sequence of and they have a instruction set 

23:13 - 23:19
that can be applied on those registers registers , that allow you to paralyze data operations 

23:19 - 23:22
so let's just go through an example to make things clear 

23:22 - 23:26
here you have again in your column store and you have a column called state, right 

23:27 - 23:31
and your query is fine sales in state of California 

23:32 - 23:37
so what you're gonna do is bring the state column into a register

23:38 - 23:41
now you guys we just talked about dictionary encoding right 

23:41 - 23:47
so these state columns can all be packed into how many bits do you guys think ,quick thinkers

23:51 - 23:54
exactly okay that's a good answer that's right 

23:54 - 23:58
so you got with that five bits or six bits ,thank you ,six bits 

23:59 - 24:03
so six bits coming in here ,but you have a register that sets 512 bits 

24:04 - 24:09
so I can bring in 64 of these assuming all of them are 8 bits ,let's just say ,right 

24:10 - 24:17
I can bring 64 in a 512 bit register 64 states can be loaded at once , that's one instruction 

24:17 - 24:21
some number cycles depending on whether it's in in your CPU cache or not 

24:21 - 24:27
but let's suppose it is in your CPU cache, okay so it's one cycle, I've loaded them in here 

24:27 - 24:34
the next step is to bring in California whatever bit representation California is 

24:34 - 24:38
and splat that across another register California, California ,California ,California etc 

24:39 - 24:42
then I planned that's one cycle ,okay 

24:43 - 24:52
then this is where I use the the instruction set for vector for vector registers here ,where I can do a vector compare all values in one cycle 

24:53 - 24:59
so this state will be compared to California, this state will be compared to California etc etc

24:59 - 25:06
and in one cycle it will apply 64 comparisons resulting in a bit mask of 64 bits 

25:07 - 25:11
and that tells me which of these 64 states or equal to California 

25:19 - 25:21  question
you cannot do that in a single cycle, right 

25:22 - 25:28 question
to go do 64 tuples would be ,you know next call 64 times ,this is super phantom 

25:28 - 25:32 question
this is why you use a vectorized model just what they're doing here 

25:32 - 25:36 question
you can punch of crap all at once and then do the filter review the predicate evaluates your very quickly 

25:36 - 25:38 question
that's why they're getting 100x faster 

25:43 - 25:45
make make you feel really good 

25:48 - 25:51
that's why you guys 100x slower learn 

25:52 - 25:56
okay um but but but but Andy's right 

25:56 - 26:00
that we actually apply vectorization techniques to all of our operators okay 

26:00 - 26:06
so because there's magic in this ,it's it's complicated not when I have a slide on this I think 

26:06 - 26:08
but so let's move on here ,okay 


26:08 - 26:10
so that brings me to this slide here 

26:11 - 26:15
so we're really looking to improve all aspects of analytics 

26:15 - 26:18
so we talked about scans just now with vectorization 

26:19 - 26:22
joins we look at vectorizing joins as well 

26:22 - 26:25
there's all sorts of nifty techniques ,when you're dealing with a column store

26:25 - 26:27
and you're dealing with dictionary encoding 

26:27 - 26:33
you can leverage the format leverage the hardware to again process at the at the billions of rows per second 

26:33 - 26:37
here we make joints faster by simply making something called bloom filters faster 

26:37 - 26:40
show of hands of folks who know about bloom filters excellent 

26:40 - 26:44
awesome excellent excellent, bloom filters are magic ,I love

26:45 - 26:49
okay so that's how we make joints faster ,initially with our first release from five years ago 

26:50 - 26:53
and then reporting aggregations group by some things like that 

26:54 - 26:54
okay 

26:55 - 27:02
yep yep 

27:03 - 27:07
this is using SIMD on top of it ,okay let's move on here okay


27:07 - 27:11
so now we finally get to the top-5 ,which is what I wanted to get to so 

27:11 - 27:19
top-5 I just want to list five things that we have done in the in the last five years ,I guess 

27:20 - 27:25
that I think stand out in terms of what makes database of memory kind of cool for us at least 

27:26 - 27:31
and by the way a lot of these most of these resulted in academic papers, that we submit to various different conferences

27:31 - 27:34
so I'll point them out to you as we as we move along 


27:35 - 27:41
so the first thing is the dual-format architecture, fast mixed workloads and faster analytics 


27:41 - 27:46
why we think this is pretty innovative, so let's explain how it works okay 

27:46 - 27:51
so the dual-format architecture enables fast mixed workloads and faster analytics 

27:51 - 27:56
so if you look at your right, that was our eye drawing I showed to you last time 


27:56 - 28:04
now you can get very fast in memory DML, because the invalid row is logically removed from the column store 

28:04 - 28:09
so I'm going to walk through this example, let's suppose that a row was modified okay 


28:10 - 28:15
so that row was modified for whatever reason maybe I call him in there, or some number of columns

28:15 - 28:18
but it was updated or deleted whatever it is 

28:18 - 28:20
that happens on the normal path okay 

28:20 - 28:23
like it normally does like Oracle has been doing for the last 30 40 years 


28:24 - 28:32
now when that happens ,that tells us immediately using that row ID CU, remember how I told you we map from disk to the Consular 

28:32 - 28:36
we can immediately just set a bit, that says that row is invalid 

28:37 - 28:39
that doesn't take that long ,you guys have all set bits 

28:39 - 28:42
if you've done, if you create a bloom filter, it doesn't take long 

28:42 - 28:48
you do have to find that IMCU , that's a little bit of a lookup, but not that long and then used to set a bit 

28:49 - 28:54
so that's how DML is work , super simple you just say this row and that column store is invalid 


28:54 - 29:01
so now what happens ,when you want to do a scan ,you just ignore the invalid rows ,okay 


29:01 - 29:06
so here's my example, let's say I'm doing the full table scan 

29:06 - 29:10
I just go route and I just sidestep that invalid row and I keep going 

29:11 - 29:13
now what happens

29:13 - 29:17
I sidestep that row, but that's not giving me a consistent result now 

29:17 - 29:19
I have to actually process that row


29:19 - 29:25
so just for that row, I will go to disk or the buffer cache to fetch that row

29:26 - 29:30
okay now in all likelihood is probably in the buffer cache 

29:30 - 29:35
because I've updated it or I've done something , updating it brings that block into the buffer cache

29:35 - 29:39
and so I'm still technically processing at memory speeds 

29:39 - 29:41
because the buffer cache is in memory 

29:41 - 29:43
but I'm going against the row store 

29:43 - 29:49
right ,now IMCUs not covering invalid rows are unaffected 

29:49 - 29:53 
so that's when you break up your data into blocks it's got a lot of value to it 

29:53 - 29:54
the blocks aren't affected 

29:55 - 29:59
they'll still go through a nice ,you know proper vector scan 

29:59 - 30:01
the cindy scans that we just we just talked about 


30:02 - 30:04
okay this is an important point 

30:04 - 30:10
mixed workload performance can suffer if the number of invalid rows accumulates in your IMCUs 

30:10 - 30:13
which goes to to your point over there earlier 

30:14 - 30:16
if the rows start to get really dirty 

30:16 - 30:18
then I'm just going to the buffer cache all the time

30:18 - 30:21
I'm not leveraging the the common representation


30:22 - 30:25
so this is where fast repopulation techniques save the day!


30:26 - 30:28
so let's go through let's explain this for a second 

30:28 - 30:34
so we do something called continuous intelligence, okay this is actually an analyst herb 

30:34 - 30:42
continues LH intelligence just means , that we will track how dirty your IMCU is, how and how frequently it is scanned 

30:42 - 30:44
we do a combination of it 

30:45 - 30:46
and I'll explain why 

30:46 - 30:50
we care about both how dirty it is and how frequently does it scan 

30:50 - 30:54
if your IMCUs super dirty lots of updates are happening 

30:54 - 30:55
but you're never scanning it

30:56 - 31:00
I don't necessarily care to refresh it or repopulate it 

31:00 - 31:01
no one's actually accessing it 

31:01 - 31:06
so it's some combination of it ,that we have an algorithm for that decides ,when we should refresh it 


31:07 - 31:10
so the first technique we have is something called double buffering

31:11 - 31:16
so with double buffering the idea here is when you have an IMCU that's dirty 

31:16 - 31:18
You need to refresh it 

31:19 - 31:22
so we keep the dirty one around 

31:23 - 31:26
and in the background, we'll create a new one

31:26 - 31:33
that brings in those dirty rows repopulate sit , and now has a nice fresh copy of the IMCU 

31:33 - 31:36
and once it's ready, we do that switcheroo 

31:36 - 31:38
and the old one goes out and a new one comes in 

31:38 - 31:41
right the main reasons why we want to do this is 

31:41 - 31:46
because we don't want your queries to suffer by taking it offline 

31:46 - 31:51
every operation, if you if you learn a few things I guess in database classes 

31:51 - 31:54
you really want to try to keep everything online 

31:54 - 31:56
you never want to bring something down 

31:56 - 32:03
and then suffer a slower performance ,while you're refreshing an index or in this case refreshing the IMCU 

32:04 - 32:07
anybody understand that double buffering, okay 


32:07 - 32:11
the second thing is incremental repopulation ,what we call incremental population 

32:12 - 32:20
the idea here is you can construct a new column leveraging the information from the old column 

32:20 - 32:26
so for example when you do a track, when you're actually going from rows store ,the column store ,is very expensive 

32:26 - 32:29
population we call that population to bring it into the memory

32:29 - 32:33
the it's very expensive to identify the distinct symbols 

32:33 - 32:39
you basically are going to use a hash table or an art you guys heard of art adapted radix tree and very ,okay okay

32:40 - 32:43
an index or something, yeah great extreme

32:43 - 32:46
you need something to identify give me my distinct symbols

32:46 - 32:48
 it's expensive to do that 

32:48 - 32:55
and so what you want to do is leverage the fact that , hey I have already created a dictionary before , I just have some some dirty rows here 

32:56 - 33:00
so you leverage that to build the new C or the new column column CU

33:00 - 33:02
okay so that's incremental repopulation 


33:03 - 33:06
and the last thing here that we do as a little trickier 

33:06 - 33:09
It`s oftentimes when you are invalidating a row

33:09 - 33:12
invalidating you're updating and deleting or whatever 

33:12 - 33:16
you're really just touching a column or some number of columns 

33:16 - 33:18
you're not actually touching all the columns 

33:18 - 33:23
and so if you run a query that's unaffected by by the columns

33:23 - 33:26
because you're only accessing those columns that were not affected 

33:27 - 33:29
then you can still go columnar, right 

33:29 - 33:32
you don't have to worry about the accessing the invalid grounds

33:33 - 33:39
okay so these three kind of techniques here , allow us to really run mixed workloads faster 

33:39 - 33:44
and it gives us this best of both worlds ,okay

34:00 - 34:03
no ,so that's so from the very beginning Oracle

34:03 - 34:07
we've always said that, you can't assume that everything's gonna fit in memory 

34:07 - 34:08
that's just it doesn't not realistic 

34:08 - 34:12
so so what happens is if you have a limit of whatever memory you have 

34:12 - 34:16
you'll populate that bringing it to memory anything that doesn't fit will stay on disk 

34:17 - 34:19
now you like I said you have the ultimate control 

34:19 - 34:22
you can say which columns you want you can say which partitions you want whatever 

34:24 - 34:25
no no

34:28 - 34:30
it's a it's a store it's a column store

34:30 - 34:31
so it's not a cache

34:31 - 34:38
now well I'll talk to you about how we're transitioning over to actually making it a cache ,when we're doing storage tiering and things like that 

34:38 - 34:38
okay 


34:40 - 34:43
all right so far so good doing all right on time 


34:43 - 34:46
this is a very quick slide I'm just gonna skip through the animation here 

34:47 - 34:49
and this is just telling you how question I'm sorry go ahead


35:14 - 35:19 
yes yeah so let me 

35:19 - 35:26
okay so I think the question was is that , if you bring you sounds like you're bringing both the row row format column data, and the column their data into memory 

35:26 - 35:31
and it sounds like that's inefficient to basically have two versions of your data and in memory

35:35 - 35:38
and you need to keep them in sync and up-to-date ,right okay 

35:38 - 35:42
so so that okay so let me see if I can answer this appropriately 

35:43 - 35:47
if you're depending on your workload, you might be an analytic heavy workload

35:48 - 35:49
if you're an analytic heavy workload 

35:49 - 35:57
you're never going to bring the row formatted data into the buffer cache, make sense 

35:57 - 36:00
you're only going to leverage what's in the column store,and you're done 

36:01 - 36:06
if you're an OLTP heavy ,all you're doing is transactions inserts ,updates ,deletes

36:06 - 36:10
you're not doing joins or aggregations I think 

36:10 - 36:14
you're never going to even bring it into the column store ,that makes sense

36:14 - 36:17
so so that's the the two extremes 

36:18 - 36:23
now the middle ground is when you have some percentage of DML ,some percentage of scans 

36:23 - 36:31
now where in memory is going to be beneficial is ,of course if you're more heavily towards the scans, than you are to the DML 

36:31 - 36:35
now the DML is going to bring thing blocks into the buffer cache 

36:35 - 36:37
but it's not going to bring the whole table into the buffer cache 

36:37 - 36:39
so that makes sense 

36:39 - 36:42
and so you are going to occasionally go down the row store 

36:42 - 36:43
because you're just looking for a row 

36:43 - 36:45
and you're gonna use an index to get to that 

36:45 - 36:47
or you're gonna do analytics and go through all those 

36:47 - 36:50
so that's the difference got it okay question 

37:01 - 37:01
good question 

37:02 - 37:07
so the question is is that since we don't bring it you don't have to bring everything into memory

37:07 - 37:11
what happens when you're doing a full table stand, and you're actually they access something that's not in memory 

37:11 - 37:16
that's your question, so it's no different than what I was mentioning about the invalid rows 

37:17 - 37:21
if you have an invalid row you have to go to disk to go get it 

37:21 - 37:26
so it's the same concept , imagine you have so you filled up 50% of your data in memory 

37:27 - 37:28
and you have those in IMCU 

37:28 - 37:35
imagine you have the other 50% as empty IMCU or dirty IMCU

37:35 - 37:37
just you know if you can envision that 

37:37 - 37:40
then you're always going to disk to fetch those 50% of the rolls 

37:40 - 37:42
that's the behavior that you'll have 

37:42 - 37:46
so you'll get everything that you can from memory the column store 

37:46 - 37:48
and you'll get the rest from disk or the buffer cache, got it

37:49 - 37:52
remember and you can compress the hell out of these things 

37:52 - 37:56
so you can fit as much as you can see you say so I didn't say that per pile 

37:56 - 37:59
but you can't give you let's say what I want, okay 

38:03 - 38:04
okay ,All right there it is 

38:05 - 38:10
but you can you can compress it bringing it in until you want it bring everything you can into memory if you can 

38:11 - 38:13
okay moving on all right 


38:13 - 38:15
so this is I'll just blaze through this 

38:15 - 38:19
but this is a very kind of a knob somewhat obvious point for me 

38:19 - 38:21
because I explain it all the time ,but may not be so obvious to others 

38:22 - 38:26
how do we get mixed workloads to run so much faster without doing much 

38:26 - 38:28
but just having a calm store 

38:28 - 38:31 
so normally when you have a mixed workload 

38:31 - 38:35
you'll have here's a table, you have one two three OLTP indexes 

38:35 - 38:40
okay OLTP index again indexes on columns like key columns primary key columns

38:40 - 38:43
that you really quickly trying to get to the the values of 

38:43 - 38:47
and then you have 10 to 20 analytic indexes 

38:47 - 38:51
because for all the columns that you want to run analytics on you're gonna have a separate index for that 

38:52 - 38:58
now you can basically fill away those analytic indexes all together and just maintain the column store 

38:58 - 39:03
and anytime there's an update as I mentioned you can very quickly mark a bit 

39:03 - 39:05
that says this guy's been update, this guy's been deleted 

39:05 - 39:12
so because the memory the the updates are very quickly to indicate a DML has happened 

39:13 - 39:22
okay and that's how and so now you don't pay the cost of updating all of these analytic indexes for every update ,that you have to your to your table 


39:24 - 39:27
all right number 2 

39:27 - 39:33
vectorize analytics ,so we touched upon this briefly right with the SIMD scans 


39:33 - 39:37
I'm gonna walk through that a little bit more in detail in terms of how that works 

39:37 - 39:43
so paralyzed predicate evaluation - load, eval, store /consumers result 

39:43 - 39:45
these are the steps that you take when you want to evaluate a predicate 


39:46 - 39:48
So let's just go through a quick example 

39:48 - 39:55
so let's say you have this select count(*) from table T where a > 10 and B < 20 ,right


39:55 - 39:58
so the first thing you're going to do is you're going to [load] a 

39:58 - 40:01
and you're going to for values into a SIMD eregister




40:02 - 40:07
Right, then as I mentioned you're gonna splat 10 across that Cindy register 


40:08 - 40:13
then you're gonna do a comparison ,greater than, greater than, greater than, greater than all in one cycle 

40:13 - 40:16
and you got you know a bit back that says 1101 


40:16 - 40:18
then you do the same thing for B 

40:18 - 40:22
you load B you compare it to 20 ,and that's the bit vector that you have for it 


40:22 - 40:26
and now you just need the and those two bit vectors together 

40:26 - 40:29
and now you have the final set 0101 

40:29 - 40:32
now that is actually not completely done 

40:32 - 40:38
because that's stored in a SIMD register 4 bits are stored in 128-bit register 

40:38 - 40:41
I don't want to waste 128 bits to store 4 bits 


40:41 - 40:46
so you basically pack them, that's another instruction ,that the the Simeon structure set support 

40:46 - 40:49
that packs them into just 4 bits literally 4 bits

40:49 - 40:53
and then you store that you know wherever or utilize that on, and then for the next predicate 

40:53 - 40:59
so that's you know I a little more details of house SIMD operations work 


41:00 - 41:04
ok so not just scans, but we're also making joins faster 

41:05 - 41:09
so bloom filters you guys are familiar with bloom filters

41:09 - 41:13
the way we make bloom filters even faster, it's a combination of things

41:13 - 41:17
we apply the bloom filter on the dictionary first that's the first thing

41:17 - 41:20
because you only need to run it on two distinct symbols 

41:20 - 41:21
you don't need to run it on all the values 

41:22 - 41:28
and once you run out on the distinct symbols ,you need to map them back to those symbols that map to those codes 

41:28 - 41:32
second thing that we make bloom filters faster is we vectorize the operations 

41:32 - 41:35
we use SIMD to basically do a set membership lookup 

41:35 - 41:42
this says within the bit vector find determine if this value is set in this in this bit vector

41:42 - 41:46
this slide doesn't talk about bloom filters, this takes it to the next level

41:46 - 41:53
this is saying if you can tell me which two columns across two tables you plan on joining against 

41:54 - 41:56
okay and that's what we call this join group 

41:56 - 42:02
if you say hey you're going to join between vehicles and sales on this name column 

42:02 - 42:05
now once you tell me that or tell us that 

42:05 - 42:12
we will encode both of these columns using the same dictionary ,okay

42:13 - 42:17
without this we will we don't know that these two are related 

42:17 - 42:22
and so we'll basically have a separate dictionary for this guy, a separate dictionary for this guy 

42:22 - 42:26
and they can have different codes depending on how the IMCU are broken up 

42:26 - 42:28
and so once they have different codes 

42:28 - 42:32
they don't relate to each other anymore like code five here 

42:32 - 42:34
doesn't match code eight here 

42:34 - 42:40
even though five and eight are both out BMW or whatever, this is vehicles name that BMW whatever 

42:40 - 42:45
so once you tell us this we will use the same dictionary to map the codes 

42:45 - 42:49
and now you're just doing a code to code match 

42:50 - 42:54
you're not doing a normal join you guys implemented a join, okay

42:54 - 42:57
so you know you guys a hash hash join 

42:57 - 42:59
hash join drilling involves building a hash table 

42:59 - 43:01
you're gonna have to hash the key 

43:01 - 43:06
you got a insert into a hash table ,when you do a probe you guys again hash the key 

43:06 - 43:10
you gotta do a key comparison ,you got follow chains all of that ,right 

43:10 - 43:18
here it's just a okay code ten index into an array ,not null there's a match ,and that's it 

43:18 - 43:21
and that whole thing can be vectorized

43:21 - 43:25
it's a very simple operation to do a lookup, that makes sense 

43:30 - 43:34
yes yeah good question, so there there cases where we do things automatically 

43:34 - 43:37
and then when I talk about the future we're gonna go to an extreme on this 

43:38 - 43:38
okay 


43:40 - 43:47
so that's joins aggregations ,we do the same thing that this the slides very detailed 

43:47 - 43:50
so just follow my words and not necessarily look too much at this but 

43:51 - 43:53
we have two forms of aggregation push down 

43:53 - 43:55
this is single table aviation push down 

43:56 - 44:00
this is something it's called vector transformations doing aggregations above a join 

44:00 - 44:03
and it's kind of a you know this is complicated, right 

44:03 - 44:06
this you can't make much meaning by just looking at this graph 

44:06 - 44:09
but let's talk about this first

44:09 - 44:15
what we're doing here is imagine you have a select sum from this table with a predicate 

44:15 - 44:19
right normally again with that volcano model, right 

44:19 - 44:23
you're sending back every passing row to another operator

44:24 - 44:29
and that operator is then and adding, and adding, and adding, one row at a time 

44:29 - 44:31
maybe there's a batch of rows at a time, right 

44:31 - 44:38
but it's taking it's doing a couple of things ,one is it's doing it it's copying the symbol into a buffer 

44:38 - 44:41
the other operator is reading that buffer 

44:41 - 44:45
then it's looking up and aggregate and it's adding it it's it's quite expensive 

44:45 - 44:50
what we're doing here is we're saying you know what let's leverage the format 

44:50 - 44:52
this was dictionary encoded 

44:52 - 44:54
and if it's dictionary encoded

44:54 - 44:59
we can use the dictionary codes ,and aggregate against the dictionary codes ,and the distinct symbols 

44:59 - 45:02
and then we can do that all at the scan layer 

45:03 - 45:08
and then only project back a partial aggregate result to the higher-level operator 

45:09 - 45:13
okay so that's that's the techniques that we're doing aggregation I have an example 

45:13 - 45:16
this vector transformation I'm not going to go into this all I'm gonna say is 

45:16 - 45:21
again this is a paper that we have in I CDE 2018 I think 

45:22 - 45:29
it's a very novel technique that basically pushes aggregations down and joins down into the scan layer 

45:29 - 45:35
so basically instead of actually sending all these rows back up ,up ,up across the operators to join operator aggregation toppers 

45:35 - 45:38
we do everything in the scan operator and that's that

45:38 - 45:40
I'm again I'm not gonna talk about that 


45:40 - 45:42
but I'm gonna talk about this this is kind of cool 

45:42 - 45:46
something that you probably don't think about but we have to think about in industry 

45:48 - 45:52
very large numbers anybody know how very large numbers are encoded 

45:53 - 45:55
there's a variety different formats 

45:56 - 46:02
and by very large I'm talking about like , let's say there are 30 plus digits you know
 
46:02 - 46:05
it's something that doesn't fit in 64-bit and a 64-bit register 

46:07 - 46:13
Oracle supports a software implemented type for a number 

46:14 - 46:18
you might think of a number is just the register a six an int or whatever right or long 

46:18 - 46:21
We treat it as a sequence of bytes 

46:22 - 46:27
okay when each set of each byte represents a digit up to 100 

46:28 - 46:29
so it's it's its base 100 

46:30 - 46:36
so you have the first byte indicates like an exponent as well as a the sign plus a minus

46:38 - 46:39
numerix ,okay 

46:39 - 46:44
so this is but the and how its implemented you know how you guys it puts it okay 

46:44 - 46:57
so so we basically have a in each operation on a number type is like hundreds of cycles, literally hundreds of cycles ,as opposed to one cycle for doing a simply a register operation 

46:58 - 47:02
so let's walk through an example of how we support very large numbers 

47:02 - 47:06
so imagine you have a select sum(A) from T where ... group by J,K 

47:07 - 47:11
okay so you're doing a someone a grouping by J comma K 


47:11 - 47:14
and let's suppose this is your table, okay

47:14 - 47:20
these are your grouping columns J and K ,and that's your measure column a 

47:21 - 47:21
okay


47:22 - 47:24
what we do is we create this frequency table 

47:25 - 47:29
and this frequency table on the x-axis are the dictionary codes

47:30 - 47:32
these are imagine these are dictionary codes ,okay 

47:32 - 47:36
they they map to actual symbols just for the for to illustrate this example here 

47:37 - 47:43
so you're gonna have 0 1 2 3 and this is 10,000 and 1 all the way to 51819, okay

47:43 - 47:48
that's the x-axis, on the y-axis you have the groups the distinct groups 

47:49 - 47:56
so the possible combinations of groups are {0,0} {0,1} {1,0} and {1,1} ,if you look at all these values over here 


47:57 - 48:04
right now what we do is we walk through each row and we add a count 

48:05 - 48:07
so if I go to {0,1} that map

48:07 - 48:11
so this group, I index into 51819 

48:11 - 48:14
and I bump up a count here that says I've seen it one time 


48:15 - 48:20
and I do the same thing for each one of these values 51819, again 


48:20 - 48:23
for the other group I bump it up ,I do this I bump it up

48:23 - 48:30
and in the end I basically have this table that says , how many times have I seen these dictionary codes for these different groups 

48:31 - 48:33
everybody with me so far ok 


48:34 - 48:45
now what we do is we will aggregate across each group by multiplying the frequency times that dictionary symbol

48:46 - 48:50
so it will say code 0 shows up 0 times 

48:50 - 48:54
so I don't need to multiply it ,but this guy shows up one time 

48:54 - 48:59
so I need to grab its code look it up in the dictionary and multiply it 


48:59 - 49:06
and so this is basically the operations 0 times the symbol plus 0 times the next symbol and so on 

49:06 - 49:08
why do we do this ,question 

49:31 - 49:36
If you mapping are you saying if the number groups is too large or if the number of dictionaries 

49:38 -49:38 
okay 

49:42 - 49:42
got it

49:46 - 49:49
absolutely right so you bet you've identified some of the weaknesses of this 

49:49 - 49:56
so the question was I think if I understand your question right, it's it's possible that you might have one everywhere here for example 

49:56 - 50:00
because it's so diverse I guess it's the right word

50:00 - 50:06
and so you know every one of these codes only shows up one particular group, or maybe the show in all the groups or whatever it is 

50:06 - 50:09
and so you basically end up multiplying everything 

50:11 - 50:19
and that is a weakness of this it's it depends ,so it's it's a it it depends on the data and how the data is actually organized 

50:19 - 50:22
in the case and also it depends on how many groups you have 

50:22 - 50:26
if you have many groups , and this table stuffs become very large

50:26 - 50:28
because you have many distinct symbols and many groups 

50:28 - 50:32
it's gonna be a very expensive operation to go through this for every single group 

50:32 - 50:41
but just just to finish off where the idea here is ,is we're basically replacing addition with multiplication right 

50:42 - 50:46
every additional if I have to add each one of these values up and sum up the same value 

50:46 - 50:50
and if I can replace that if it let's say it's ten times five 

50:50 - 50:54
I'd rather do ten times five as opposed to adding up five ten times 

50:54 - 50:58
and this is like an obvious thing you would think about in terms of factoring 

50:58 - 51:00
but it's very important for software implemented types 

51:00 - 51:05
because each one of these operations is so many so many cycles 80 some cycles 

51:05 - 51:11
so as you were saying it does depend on the workload in terms of when this actually kicks in or not 

51:11 - 51:14
so that makes sense if I understand that one question again 

51:15 - 51:22
the group so the groups can be analyzed by what by by walking through the columns of J&K

51:23 - 51:28
so you will as you walk through J you'll identify how many distinct symbols are in J 

51:28 - 51:31
you walk through K how many distinct symbols are K 

51:31 - 51:37
you multiply the two like kind of like a multi-dimensional array to get the max possible code 

51:37 - 51:39
and that's the that's the table that you create 

51:40 - 51:42
and then when you want to index into it

51:42 - 51:46
you take this and this multiply them together ,and that's how you index into the table 

51:47 - 51:48
good okay


51:48 - 51:52
all right I'm gonna skip through several slides here in interest of time 

51:53 - 52:00
so numbers joins are made faster remember expressions I'll skip over here 


52:00 - 52:05
dynamic scans I'll skip , and I'll move over straight into this thing called a memory plus extra data 

52:06 - 52:10
so this is number three where we bringing in memory into the storage tier 


52:11 - 52:16
so with Oracle we have something called Exadata 

52:16 - 52:23
Exadata is a database machine, that we build from scratch utilizing basically the best of reed hardware 

52:23 - 52:29
so the fastest networking ,the best SSD drives ,a lot of memory a lot of flash ,right 

52:30 - 52:35
we build that from scratch and we build it to run Oracle as fast as possible 


52:41 - 52:44
that's a good question it's definitely in the millions 

52:45 - 52:47
we've sell them in various different configurations

52:47 - 52:53
but it's definitely in the millions, but it's amazing how many people buy them

52:53 - 52:57
it's like amazing, it's a it's a billion-dollar business for Oracle

52:58 - 53:00
ok ok


53:01 - 53:07
so on Exadata you have the compute notes 

53:07 - 53:10
and you have storage nodes ok

53:10 - 53:20
compute nodes is where all the higher level SQL operator processing happens joins, and aggregation, and sorting and all that jazz happens there 

53:20 - 53:27
on the storage nodes is where you are closest to the data where it sits in the SSD drives 

53:28 - 53:33
so that's where you can actually do some fast filtering here 

53:34 - 53:41
and then only send back the rows that pass ,through the network to the compute nodes, right 

53:45 - 53:46
correct okay 

53:47 - 53:55
so what you had without in memory is we have also some flash that's sitting on these storage nodes 

53:56 - 53:59
and how we use that flash as we use it as a cache 

53:59 - 54:01
and this goes to what Andy was talking about earlier is that 

54:01 - 54:11
there we actually have it as a cache in the sense that ,the hottest data that you're accessing ,will be moved from the SSD drives into the flash cache 

54:12 - 54:18
and now you will and it will also be stored in a columnar representation 

54:19 - 54:22
now the beauty of this is that on the compute nodes 

54:22 - 54:27
you're limited to how much DRAM you have, like one and a half terabytes of memory ,which you might think is a lot 

54:27 - 54:30
but in again real enterprises that's nothing ok

54:30 - 54:34
it's like a drop in the bucket ,you really need the hundreds of terabytes that flash gives you 

54:35 - 54:40
and once you have all of that memory, you can basically do some really nifty storage tiering now

54:40 - 54:45
you can have some most of your hottest data sitting on your compute 

54:45 - 54:48
and if you run out of memory ,no problem

54:48 - 54:53
it will automatically get populated into the flash cache sitting on the storage nodes

54:54 - 54:56
now how does a query work ok 

54:56 - 55:05
so imagine you're doing a scan a full table scan says ,you know select from my phonebook , all people in my address that live in California whatever 

55:05 - 55:07
it's going to go through here 

55:07 - 55:11
it's gonna say ok I've exhausted everything that's over here

55:11 - 55:13
the rest of my table is sitting on my storage 

55:13 - 55:16
and it's gonna say everything is cached into my flash cache 

55:17 - 55:24
it will utilize the same vectorization techniques ,that we've talked about the same improvements ,that we make for joins and aggregations and so on 

55:24 - 55:28
it leverages all of that ,it's just doing it from flash 

55:28 - 55:33
and so you have to bring it from flash into the D that's local to that storage node 

55:33 - 55:37
but then after that you do the same techniques and then you send it back up

55:38 - 55:40
maybe that makes sense 

55:40 - 55:43
and this is just the form of storage tuning gives you a much larger column store 

55:43 - 55:48
it allows you to place data where it belongs 

55:48 - 55:51
hot data in the most expensive memory, that's the fastest 

55:52 - 55:57
warm data in the flash cache ,and cold data sitting on your persistence store, right 

55:57 - 55:58
on your on your disk 


56:01 - 56:03
okay these are just some performance numbers 

56:04 - 56:06
I think we can skip that 


56:07 - 56:09
and we'll skip this 

56:10 - 56:14
anybody interested in fault tolerance ,okay good okay 

56:14 - 56:17
so let me tell you about how we achieve fault tolerance okay 

56:18 - 56:23
on we basically maintain a cluster of nodes we call it rack

56:23 - 56:28
okay on the rack you can have many different nodes ,let's say 4 nodes in this example 

56:28 - 56:32
and you have a column store on each one of these nodes 

56:32 - 56:35
each one of these nodes has memory you can put a separate you can put a column store in there 

56:36 - 56:41
what you can do is you can bring your data into this column store

56:41 - 56:44
and you can duplicate it on any one of these other nodes 

56:44 - 56:48
so for example this red IMCU is duplicate on this node 

56:49 - 56:52
and this blue is duplicate on that and black is duplicated there 

56:52 - 56:56
and you can have at least two nodes that you can duplicate it against 

56:56 - 57:02
so that if anything happens to this node, queries just need to be redirected to the node that has that IMCU 

57:03 - 57:07
right it's really simple it's as simple as that 

57:07 - 57:10
you can do even better by having full duplication 

57:10 - 57:13
where this red IMCU is stored everywhere 

57:14 - 57:18
and that gives you both availability as well as performance 

57:18 - 57:23
performance because every access now when you go to it will be local 

57:24 - 57:31
you're not doing a remote access to another node to fetch its contents to and run that query , everything is local

57:31 - 57:31
okay

57:32 - 57:37
so that's how we achieve photons is it's it's fairly simple and straightforward

57:37 - 57:43
every is the IMCU level ,every IMCU which is that half of a million rows gets duplicated 


57:43 - 57:44
I'm gonna skip data guard 

57:44 - 57:49
and I'll move straight to intelligent automation ,Andy how we doing on time okay 

57:50 - 57:56
okay all right all right number 4 is intelligent automation

57:56 - 57:59
this is where we're trying to be a lot smarter 

57:59 - 58:10
so far everything I've told you for the most part is the DBA , or you you know do you the user has to direct us in some way says 

58:10 - 58:14
hey bring this table and turn memory ,or hey create this join group right 

58:15 - 58:16
we want to be a lot smarter 


58:17 - 58:20
you guys were all work with Andy 

58:20 - 58:24
Andy's the creator of self-driving databases Larry Ellison stole the name

58:25 - 58:25
I said 

58:28 - 58:29
We made money out of it 

58:30 - 58:35
so anyways so that's where we're moving towards right, self-driving databases

58:35 - 58:41
I have a separate talk later on today that that's talking more about how we achieve this 

58:42 - 58:46
but the idea here here is here's a picture of this DBA poor DBA 

58:46 - 58:54
and the DBA saying I have to manually manage what to put in this column store ,and what to keep out 

58:54 - 59:00
I don't know what tables are hot ,I don't know what's cold ,I know it's warm ,I have no idea what queries you're gonna run, right 

59:00 - 59:04
but as I as I mentioned earlier, it's a column store 

59:04 - 59:08
so once this store becomes full of tables that's it 

59:09 - 59:12
the DBA has to decide what to Vic tout what to bring in 

59:13 - 59:20
right and the desired outcome here is you want to keep hot objects in memory, and remove the colder objects


59:21 - 59:24
right so that's what we had ,okay

59:24 - 59:28
what we have now is something smarter, right 

59:28 - 59:32
here we will observe the access patterns 

59:32 - 59:34
we have something what we call a heat map 

59:34 - 59:40
heat map basically says at the very smallest granularity which for us is a block 

59:40 - 59:42
and the block has some number of rows 

59:42 - 59:49
at the block level ,we will say how often has it been access, how hot is it, and how it's been accessed 

59:49 - 59:53
well the access because it scans a DML what how, right 


59:53 - 59:59
so we observe the access patterns ,once we observe the patterns will classify the data right

59:59 - 01:00:02
we'll say hot intermediate cool cool data 




01:00:02 - 01:00:05
and once we classify the data then we take action 

01:00:05 - 01:00:08
we'll bring in the hot data in will remove the cold data 

01:00:09 - 01:00:11
very simple very straightforward 

01:00:11 - 01:00:15
we take it to an even more complicated level 

01:00:15 - 01:00:19
where we'll do it we'll do it not just at the table level or the partition level 

01:00:19 - 01:00:20
But even at the column level 

01:00:20 - 01:00:28
so we'll say something like this column is being used to aggregate on, its a measure column 

01:00:29 - 01:00:33
and this column is being used to predicate on okay 

01:00:33 - 01:00:40
now if I know that this columns for predication, or for predicates predicate evaluation, and this column is for aggregation 

01:00:40 - 01:00:43
I could format them in a different way

01:00:43 - 01:00:49
I might use dictionary encoding for wine, and maybe another compressed format for the other 

01:00:49 - 01:00:57
because dictionary encoding in order involves getting the code, looking up in the dictionary, getting the symbol, it's a couple of levels of indirection 

01:00:57 - 01:01:01
and that's expensive, but it's really fast for scans 

01:01:01 - 01:01:05
because I just need to look at the bit codes, I don't never I never have to decompress it 

01:01:05 - 01:01:09
whereas aggregation, I need to actually go get that symbol from the dictionary 

01:01:10 - 01:01:11
and then I need to add it

01:01:12 - 01:01:16
so why should I dictionary encode that maybe I should just keep it uncompressed

01:01:16 - 01:01:18
so I have the symbols right there 

01:01:18 - 01:01:25
so this is where you can start becoming a lot smarter about knowing how your your data is accessed, how the columns are access ,how they should be formatted 

01:01:26 - 01:01:30
maybe remember these maybe these four columns are never accessed 

01:01:30 - 01:01:35
get rid of them ,compress them ,or if you want to be safe compress them, or evict them out of the column all together

01:01:35 - 01:01:43
okay so anyways so that's how we're trying to remove the guesswork out of the picture , and just start being a lot lot smarter 

01:01:43 - 01:01:48
and this gets complicated, because you guys all work on with the buffer cache 

01:01:49 - 01:01:55
imagine you have a mixed workload ,where sometimes you're going to run OLTP, sometimes you're gonna run analytics 

01:01:55 - 01:01:58
how much memory do you dedicate for the column store versus 

01:01:58 - 01:02:00
how much do you dedicate for the buffer cache

01:02:01 - 01:02:03
right how do you determine that 

01:02:03 - 01:02:09
how do you know what the behavior is gonna be today versus tomorrow versus the next day and so on 

01:02:09 - 01:02:16
so all of these factors have to come into play ,and you have to be very elastic and being able to switch from one to the other 

01:02:16 - 01:02:18
and you have to be very very fast and accurate 

01:02:19 - 01:02:22
no customer wants to move over to Oracle's autonomous database 

01:02:22 - 01:02:25
and all of a sudden they experience worse performance 

01:02:25 - 01:02:28
and be experience like inconsistent performance

01:02:29 - 01:02:31
those like those are two terrible things

01:02:31 - 01:02:35
if the very least you want to be consistently bad, that would be my sister

01:02:35 - 01:02:37
if you're gonna be bad be consistently bad 

01:02:37 - 01:02:41
so that the user knows like ,okay at least I know what to expect today and tomorrow and so on 


01:02:42 - 01:02:48
all right so um I'm gonna skip through some more things I will talk briefly about question 

01:02:51 - 01:02:51
yes 


01:02:53 - 01:02:59
so this is this is a finer grain, this is saying for example 

01:02:59 - 01:03:05
when the column store is full, the action we could take is just evict out cold columns ,that's it 

01:03:05 - 01:03:09
we never will decide what should go in to replace it 

01:03:09 - 01:03:13
that's just based on your query, whatever you touch you bring in that's one mode 

01:03:14 - 01:03:17
another mode is now will be smarter will evict and tell you what to bring in 

01:03:18 - 01:03:21
and yet another mode is an extreme mode

01:03:21 - 01:03:25
that's where like hands off will do everything ,will decide from the get-go 

01:03:25 - 01:03:27
what should be in the column store from the get-go

01:03:27 - 01:03:29
what columns should be in there or how to compress it and so on 

01:03:42 - 01:03:48
we we just look at, we we just look at frequency NDB, right 

01:03:48 - 01:03:52
that's all we really look at you could we do look at if it's a date column 

01:03:53 - 01:03:57
for example let's give a date column, if it's a date column, we could be smarter in terms of how we encode it 

01:03:58 - 01:04:01
we can code the month separate from the year from the dates and get better compression 

01:04:02 - 01:04:07
if it's a number column ,we can impress them with a binary representation JSON ,we can do 

01:04:07 - 01:04:10
so we do look at data types to compress them in a much more efficient representation 

01:04:10 - 01:04:14
but we don't look at it to derive meaning out of it 

01:04:14 - 01:04:20
now that's kind of another level ,once we once we have the queries together in the repository and we have the data 

01:04:21 - 01:04:24
and we have access patterns, we can do things like that 

01:04:27 - 01:04:29
I don't know if we're like I say we could do it 

01:04:31 - 01:04:33
so we haven't actually done anything like that yet 

01:04:34 - 01:04:39
because we'll see here's the thing is the data likely will be encrypted as it is 

01:04:39 - 01:04:45
and so you know we can't do anything I'm not even an NDB even is difficult you can do it from the dictionary 

01:04:45 - 01:04:46
but other than that again

01:04:47 - 01:04:49
any other questions ,question 

01:05:03 - 01:05:08
great yeah great question, so that is that's kind of our expert system 

01:05:08 - 01:05:09
I don't it's not machine learning 

01:05:09 - 01:05:12
but it's like it's an expert system, it's taking to account

01:05:13 - 01:05:20
again but let's just take simplest metrics are ,how often has it been scanned ,how much space does it consume ,and how has it been scanned 

01:05:21 - 01:05:23
those are kind of like the three very simple metrics 

01:05:23 - 01:05:27
and from that you can divide design an equation 

01:05:27 - 01:05:29
that meets a threshold and you optimize for 

01:05:30 - 01:05:32
the other part of it that's missing is time 

01:05:32 - 01:05:35
I think when wine has been access 

01:05:35 - 01:05:39
you take all those into account ,and you've got a pretty smart system without anything more complicated than that

01:05:40 - 01:05:45
this you can go further, you can look at correlation between multiple columns correlation across multiple tables etc

01:05:48 - 01:05:49
question in the back 

01:05:58 - 01:05:58
yep 

01:06:07 - 01:06:13
Yep good question ,so the question is how do you determine when to bring it into the columns for automatically, right

01:06:15 - 01:06:17
but and when these opposite okay good question

01:06:17 - 01:06:21
so I'll answer the first and when to bring it into memory 

01:06:21 - 01:06:23
it's again it's similar to what I was saying those attributes 

01:06:24 - 01:06:26
if I know it let's say there's a table that's not in memory 

01:06:27 - 01:06:28
And counselor is full 

01:06:30 - 01:06:34
how often has this table been scanned, not that often

01:06:34 - 01:06:36
how often these tables been scanned at our memory very often 

01:06:36 - 01:06:38
doesn't make sense to replace them 

01:06:39 - 01:06:45
once the number of scans for this table has increased above what any of these are the tables have 

01:06:45 - 01:06:49
then it makes sense to evict something out from the column store bring something in 

01:06:50 - 01:06:55
but it's tricky right ,because you have to know is that just for a short period of time 

01:06:55 - 01:06:57
and then it's not gonna be accessed again 

01:06:58 - 01:07:02
and I paid all this I spent the last CPU cycles to transpose it bring into memory 

01:07:02 - 01:07:07
and now I'm done like it's midnight ,and I don't need to run these reports again 

01:07:07 - 01:07:13
so we try to be smart about identifying the access patterns before we take action 

01:07:13 - 01:07:15
we're actually a fairly conservative system 

01:07:15 - 01:07:17
and we will slowly make modifications

01:07:18 - 01:07:22
it's it's it's like any other system its expert system that you design 

01:07:22 - 01:07:24
you're gonna have feedback mechanisms in here right 

01:07:24 - 01:07:27
you're gonna say did I make the right decision ,that I just did 

01:07:28 - 01:07:31
and if I didn't like I learned from that, I remember that 

01:07:31 - 01:07:33
and the next time this situation comes again

01:07:33 - 01:07:36
I'll be smarter about what I would I bring in  

01:07:36 - 01:07:41
I'll be honest with you this is not a perfect system, and there's a lot of work that needs to be done here 

01:07:42 - 01:07:49
and that's where we're we're trying to figure out, what's the how do we get the 80% of the benefit with 20% of the work

01:07:49 - 01:07:50
so we can quickly get to it 

01:07:51 - 01:07:53
it's a question of it 

01:08:00 - 01:08:05 - 01:08:10  
okay yes yes 

01:08:14 - 01:08:17
yes so what we'll do this so the first thing we do let's say 0 & 1 are both hot 

01:08:17 - 01:08:19
that's what you're saying right, they're both high

01:08:19 - 01:08:21
you don't have space for both 0 & 1 ,what do you do 

01:08:21 - 01:08:25
first thing we do is we say which of these columns are not been accessed 

01:08:26 - 01:08:30
okay , normally you have a table that's a very fat table or a fat table

01:08:30 - 01:08:33
okay let live like anybody familiarity TPCH 

01:08:33 - 01:08:37
okay TPCH is a benchmark the data warehouse bench mic okay 

01:08:39 - 01:08:42
okay TPCH has a table called line item 

01:08:42 - 01:08:45
line item has a column called L comment

01:08:45 - 01:08:48
L comment is never used ,okay 

01:08:48 - 01:08:50
in the in the queries that are in that particular benchmark 

01:08:51 - 01:08:56
L comment for Oracle takes up about twenty percent of the space in memory 

01:08:56 - 01:09:01
it's a gigantic varchar not gigantic varchar , but it's a large varchar string 

01:09:01 - 01:09:04
and oracle is very aggressive 

01:09:04 - 01:09:07
we will dictionary encode it ,which doesn't really make sense 

01:09:07 - 01:09:10
because they're all distinct symbols, why the hell am I dictionary encoding 

01:09:10 - 01:09:11
I'm not gonna leverage it 

01:09:11 - 01:09:15
but we do that because we assume you might scan against it 

01:09:15 - 01:09:18
and if you can scan against the dictionary encoding is the smartest thing 

01:09:18 - 01:09:22
so going back to your example here is L comment is never used 

01:09:22 - 01:09:24
line item is hot, that's a hot table 

01:09:24 - 01:09:26
but that column L comment has never used 

01:09:27 - 01:09:30
so will evict it out or compress it just to be safe 

01:09:30 - 01:09:36
and just that act of compressing your victim out might allow you to bring this other table in, that make sense 

01:09:37 - 01:09:44
so we will try to first be very conservative , and try to get both of those tables into the into the column store by compressing columns

01:09:44 - 01:09:48
okay if that doesn't work we take the next bigger action 

01:09:48 - 01:09:50
if that doesn't work we take the next bigger action

01:09:50 - 01:09:53
it's very so for example, tables are usually partitioned 

01:09:53 - 01:09:55 
right you can partition by date

01:09:55 - 01:09:59
maybe the old dates partitions are needed and you only care about the hottest date 

01:09:59 - 01:10:03
so you keep that in mind when you Vic the old dates out, that make sense 

01:10:03 - 01:10:06
now if you're in a situation where both of these are hot 

01:10:06 - 01:10:08
then then we stay conservative 

01:10:09 - 01:10:12
we're not going to constantly populate we pick populate a vague 

01:10:12 - 01:10:15
that's just gonna add more cycles to do the population 

01:10:15 - 01:10:18
so we'll choose one and live live with the consequences 

01:10:19 - 01:10:19
okay


01:10:20 - 01:10:23
all right I know I'm like running our time here 


01:10:23 - 01:10:28
so I'm just going to up sorry sorry ,all right persistent memory okay 

01:10:28 - 01:10:30
let's just talk very quickly about persistent memory 

01:10:31 - 01:10:37
new silicon technology ,capacity, performance, and price are between DRAM and flash 

01:10:37 - 01:10:41
this is a nice little picture here that shows 

01:10:41 - 01:10:44
as you go from disk to flash to persistent memory the DRAM 

01:10:44 - 01:10:46
you're going faster faster faster faster faster

01:10:46 - 01:10:51
but at the same time, you're going higher, cost higher cost ,higher costs per per gigabyte, okay

01:10:51 - 01:10:56
eventually PM is really expensive right now 

01:10:56 - 01:10:58
it's really expensive, eventually this will reduce in price 

01:10:59 - 01:11:01
but flash is going to be even cheaper also 

01:11:01 - 01:11:07
so it's very interesting how we put systems together with all this technology to get the the best performance 

01:11:08 - 01:11:13
Intel calls this Optane DC persistent memory DC's data center I believe 

01:11:13 - 01:11:16
they're pretty much the only game in town right now

01:11:16 - 01:11:19
okay there's a there's others, but the only game in town right now

01:11:20 - 01:11:26
reads that memory speed - much faster than flash 
Wirte survive power failure unlike DRAM ,okay 

01:11:26 - 01:11:34
you can imagine building as and you're saying building a brand new storage engine ,built on top of persistent memory, right 

01:11:34 - 01:11:37
it's tricky as heavy a key here 

01:11:37 - 01:11:42
you guys he's gonna give a talk tomorrow on how you can leverage persistent memory 

01:11:42 - 01:11:51
it can be tricky ,because it involves leveraging some new instructions to make sure , that data is properly flushed all the way back to to memory 

01:11:51 - 01:11:54
I won't go into the details of that 


01:11:54 - 01:11:57
I will just bring up this 

01:11:57 - 01:12:03
slide here on how we are planning on using persistent memory for our a memory column store 

01:12:03 - 01:12:09
so today as a baseline ,you cannot necessarily fit all of your data in memory 

01:12:09 - 01:12:11
that's the example or some of us we've been talking about 

01:12:12 - 01:12:13
so assume it doesn't fit in memory 

01:12:13 - 01:12:16
so you're gonna have disk disk plus memory

01:12:16 - 01:12:20
the queries then have to go against the column store DRAM 

01:12:20 - 01:12:22
as well as the row store on disk ,right 

01:12:23 - 01:12:29
and DRAM dimms can go up to 128GB, no one buys it at that it's very expensive 


01:12:30 - 01:12:32
so that's today's baseline

01:12:32 - 01:12:39
with PM you can conceivably fit everything inside of a PM mmm Adam okay 

01:12:39 - 01:12:41
it's 3x more denser 

01:12:41 - 01:12:44
something called memory mode, this is really cool 

01:12:45 - 01:12:51
memory mode Intel supports, it allows you to have a your persistent memory dimm 

01:12:52 - 01:12:57
And a DRAM dimm sitting on top okay 

01:12:57 - 01:13:02
so when you access data the DRAM dimm serves as a cache 

01:13:02 - 01:13:06
so your hottest data sits in memory in DRAM dimms 

01:13:06 - 01:13:12
and if it's not in that cache ,then we'll bring it from the persistent memory dimm into the DRAM dimm

01:13:12 - 01:13:14
so the DRAM dimm just serves as a cache 

01:13:14 - 01:13:16
it's wasted space in the sense that it's a cache 

01:13:16 - 01:13:19
it's not like extra memory that you have 

01:13:19 - 01:13:25
but the benefit is you are accessing PM almost as fast as DRAM

01:13:25 - 01:13:27
okay so that's called memory mode 

01:13:27 - 01:13:30
the hottest tables are cached in DRAM for the fastest access

01:13:31 - 01:13:33
and these DIMMs can be quite large the 512GB 


01:13:34 - 01:13:39
and then this just talks about using our latest Oracle 20c and some of the techniques 


01:13:39 - 01:13:43
so the reason why I mention this is we ran this this benchmark, where we use SSD 

01:13:43 - 01:13:48
SSD's another benchmark called star schema benchmark ,it's kind of based off of TPCH 

01:13:49 - 01:13:55
and there we showed DRAM about 3804GB, the table didn't fit entirely memory 

01:13:55 - 01:13:58
this was a progress bar but that completed 

01:13:58 - 01:14:02
we process 18 billion rows and took 130 seconds, okay 

01:14:02 - 01:14:04
when it didn't fit entirely in memory 

01:14:04 - 01:14:07
and then we use memory mode with persistent memory 

01:14:07 - 01:14:10
and it like dropped by 10 X right ,and 10x faster 

01:14:10 - 01:14:12
and took 12 seconds to go to 18 billion rows 

01:14:13 - 01:14:18
and then we just added Oracle 20c which has some cool techniques for making joints faster 

01:14:18 - 01:14:22
and we just showed that that can go an additional you know 4x faster than that

01:14:22 - 01:14:25
and the main point I want to mention is ,this really is a game changer for us 

01:14:25 - 01:14:31
we're looking at at persistent memory more as expanded memory, larger capacity

01:14:31 - 01:14:37
so now you could fit everything into memory and gone are the days where you need to put everything on disk

01:14:37 - 01:14:41
okay you got terabytes and terabytes and terabytes of memory 

01:14:42 - 01:14:42
okay


01:14:44 - 01:14:48
I'm gonna skip the converged analytics and I'm just gonna open it up to questions 

01:14:48 - 01:14:50
but the main I'll just talk about this slide here 

01:14:50 - 01:14:54
the main thing about Oracle, one of the things that we're trying to push Oracles 

01:14:54 - 01:15:06
you don't need to have a separate storage engine for a document store or a spatial store Neo4j or graph or AI or IOT or ,you know treat your databases the file system 

01:15:06 - 01:15:10
Oracle is trying to position itself as a one-stop shop right 
Oracle试图将它自己定义为一种一站式解决方案
01:15:10 - 01:15:12
you can do everything on a single database 
你可以在一个数据库上做所有事情
1.15.12-1.15.14
and it's got a ton of benefits
这有很多好处
1.15.14-1.15.16
 ,one being security 
其中一个好处就是安全
01:15:16 - 01:15:25
you don't want to have to migrate your relational data out to bring it into yet a graph database ，just so you can run graph queries on it ,right 
如果只是为了对你的数据执行可视化查询，你不会想将你的关系型数据移植到图数据库中

01:15:26 - 01:15:31
there's a  the customer in Europe
 之前有一个欧洲的客户
01:15:31 - 01:15:34
that they have a they build a graph database 
他们构建了一个图数据库
01:15:34 - 01:15:42
and they use a graph to represent transactions between different people on their PayPal system 
他们使用一张图来表示他们Paypal系统中不同客户间的交易
01:15:43 - 01:15:47
and they every every edge in their graph node is a transaction 
他们图中节点之间的每条线就代表了一笔交易
01:15:47 - 01:15:52
but they have to take their data out of a relational store bring it into the the graph store 
但他们需要将他们关系型数据库中的数据放入图数据库中
01:15:52 - 01:15:53
and then they run their query 
然后，执行他们的查询
1.15.53-1.15.56
,and that takes one sometime  in second 
这要花些时间
01:15:55 - 01:15:57
there's always this security violation 
这通常是违反安全的
01:15:57 - 01:16:02
now because you're taking this unencrypted data out of the database
因为你从数据库中取出了这些未加密的数据
01:16:02 - 01:16:04
same thing for a document store 
对于文档型数据库也是如此
1.16.04-1.16.06-
with MongoDB this MongoDB 
以MongoDB为例
01:16:06 - 01:16:11
you can also store JSON nicely inside of your relational database 
你也可以很nice地将JSON保存到你的关系型数据库中
01:16:12 - 01:16:13
okay 

1.16.13-1.16.15
so I'm not going to talk so much about this
So，我不会对此谈论太多
01:16:15 - 01:16:21
I'll just sort of skip through this and leave it at that, okay 
我会跳过这些幻灯片，我们来看下这张幻灯片


01:16:21 - 01:16:23
so last thing is just this is this innovation summary 
So，最后我要向你们展示的就是这样创新摘要
01:16:24 - 01:16:26
I want to make it very clear that
我想向你们清晰地展示这些创新点
1.16.26-1.16.29
 ,you know this is 2014 when we came out 
这是我们2014年推出im-memory功能时所做的创新
01:16:30 - 01:16:34
all of these little bullets here are like kind of massive projects 
这里所列出的都是些大型项目
01:16:34 - 01:16:38
and Oracle is kind of committed to in memory
Oracle致力于发展in-memory产品
1.16.38-1.16.44
, and you know our roadmap going up ,so I'm kind of drawing it up higher from 20 to 21 scenes so on 

01:16:44 - 01:16:52
we're super committed, because we feel like now's the time in memory is becoming, readily available, it's becoming, cheaper it's becoming larger 

01:16:53 - 01:16:58
the hardware technology is all there the requirements again from the real time enterprises is there 

01:16:58 - 01:17:00
and so as a result our features need to be there 

01:17:01 - 01:17:06
and the main drivers for us are the self managing in-memory database, everything needs to be autonomous 

01:17:07 - 01:17:11
really looking at everything not just relational, but spatial text graph etc 

01:17:12 - 01:17:19
and also vectorizing all of our operators is not just our simple scans and so on ok 

01:17:19 - 01:17:24
I think that's it, I'll skip that, I'll skip that ,I'll skip that 

01:17:24 - 01:17:27
and open it to any questions you may have if you have any

01:17:36 - 01:17:36
yeah 

01:17:47 - 01:17:48
great question 

01:17:48 - 01:17:58
so the question is how do how are we representing this as a single representation of your data, when you want to use it for a graph Corre versus a relational query, or is it like a you know multiple representations

01:17:58 - 01:17:59
I had that right okay 

01:17:59 - 01:18:04
so I went through those slides very quickly , but let me explain 

01:18:05 - 01:18:09
so what we do for graph or let's say I'll say JSON initially right now for text okay 

01:18:09 - 01:18:14
so the techniques that we're doing for text spatial JSON whatever it is 

01:18:14 - 01:18:21
It`s representing the data in a much more efficient manner in a in memory in a column store 

01:18:21 - 01:18:26
so it's kind of like think of dictionary encoding ,doing some tricks like that to represent your data more efficiently 

01:18:29 - 01:18:29
yeah 

01:18:35 - 01:18:43 question
like this how important you're looking to hire somebody , would be he would have a background maybe testing database systems or query optimization 

01:18:43 - 01:18:44
oh yeah a great question okay 

01:18:44 - 01:18:48
so when I when we look to hire people 

01:18:49 - 01:18:58
okay so first thing is this I always look for people that are enthusiastic smart and excited about the technology, that's that's first and foremost 

01:18:58 - 01:19:00
because we have we have mathematicians 

01:19:00 - 01:19:01
we have a mechanical engineer 

01:19:01 - 01:19:02
we have a chemist 

01:19:02 - 01:19:05
we have all sorts of people that working on database systems 

01:19:06 - 01:19:10
the folks that actually have a solid background in database systems however 

01:19:11 - 01:19:17
they that's like I don't know it's what's the word the Holy Grail in some in some ways

01:19:17 - 01:19:21
because we interface with we're the core storage engine team 

01:19:21 - 01:19:23
but I interface we interface with the optimizer team 

01:19:23 - 01:19:25
we're going to face with the exudative team

01:19:25 - 01:19:27
we interact with the hardware team 

01:19:27 - 01:19:30
I have a background in compilers in computer architecture 

01:19:31 - 01:19:34
so I didn't have a background database systems at all 

01:19:37 - 01:19:37
okay

01:19:37 - 01:19:43 question
you have two candidates equal background honking one is a JavaScript programmer

01:19:43 - 01:19:43 
okay





