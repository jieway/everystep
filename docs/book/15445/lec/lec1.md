# 01-01 - Course Introduction & Relational…

* Oracle 的贡献
* 学习范围
* 关系模型
* 关系代数

这门课不是教如何使用，部署和管理数据库管理系统，而是教怎么构建和设计一个更好的 DBMS。

基本上，就是指我们假设数据库在磁盘上，然后将数据写到磁盘上，

so 我们将要讨论的主题的⼤纲分解，并且系统地分了⼏个层⾯
right so we'll talk at a high level what relational databases are

我们会以上层的⻆度来讨论关系型数据库是什么
and then we'll talk about how to store them ，how to execute query on them ,how to run
transactions on them, how to recover them if there's a crash or we need to restart the
system
接着，我们会去讨论如何存储它们，如何在它们之上进⾏查询，如何在它们之上执⾏事务管
理，以及如果遇上冲突或者我们需要重启系统时该如何去恢复它们
6.04-6.11
so up to that point up to recovery that's the core knowledge you need to have to
understand how a database management system works
直到恢复这块内容为⽌，这些都是你所必须理解的关于数据库管理系统是如何⼯作的核⼼知识
6.11-6.15
and then from there we can then build on that and start talking about more,
接着，我们可以在此之上来讨论更多内容
6.15-6.25
you know more advanced topics like distributed databases ,or various other types of
databases that are out there ,or extensions of relational databases
就好⽐你所知道的那些⾼级主题，例如分布式数据库，或者⼀些其他类型的数据库以及关系型数
据库的⼀些扩展
6.25-6.30
so again like the way to think about this is we'll go through every single layer of how to
actually build the system
我们可以通过每⼀层⾯的知识来告诉你如何构建这个系统
6.30-6.37
and we'll finish up for recovery and so at that point that's the basic you need to
understand of how a database system works,
直到恢复数据库这部分内容，这些是你所需要了解数据库系统是如何⼯作的基础知识
6.37-6.45
and then we'll talk about how to you know how to extend them to scale them up or
scale now of running and running them ,and in the cloud environment
然后，我们会去讨论如何对它们的规模进⾏扩展以及如何在云环境运⾏它们
6.45-6.53 虚⽣花
so the right now the course website is online along with the syllabus and the schedule
现在，课程⽹站已经上线，上⾯有教学⼤纲以及课程表
6.53-6.56 虚⽣花
so the basic outline there's a lecture twice a week
⼀般来说，我们⼀周两节课
6.56-7.00 虚⽣花
and then with each lecture there's a there's readings that go along with it ,
然后每节课都会有相关阅读材料
7.00-7.07 虚⽣花
but better supplemental that extend the kind of things that that I'll be talking about as
well also provide some mention on a second
但⼀些更好的课后补充材料之后我也会提供
7.07-7.16 虚⽣花
so at all times please refer to the course webpage that should be up-to-date, you know
it have been up most up-to-date information on what's going on
因此，请访问课程主⻚，上⾯所放的内容始终都是关于课程的最新动态
7.16-7.20 虚⽣花
so unfortunately we always have to talk about academic honestly
可惜，我们始终必须诚实地来谈论学术问题
不幸的是，我们总是不得不去谈论学术诚信的问题
7.30-7.23 虚⽣花
I'll go a little bit more detail what I mean about this as we go along
关于这个问题，我会对它进⾏详细说明
7.23-7.29 虚⽣花
but when you ever have a question and you don't understand
但当你有不理解的地⽅
7.29-7.30 虚⽣花
please contact me
请联系我
7.30-7.34 虚⽣花
so that we can discuss whether what you're doing could be considered
so，我们来谈下关于学术诚信这⽅⾯的内容
7.34-7.40 虚⽣花
you know plagiarism or stealing somebody else's work right
你知道抄袭和剽窃他⼈作业是⼀种很糟糕的⾏为
7.40-7.42 虚⽣花
So in general again ,this is an advanced course
总体来说，这是⼀⻔⾼级课程
7.42-7.47 虚⽣花
so everyone should be aware that you don't copy coding fine don't randomly on the
internet you don't copy from each other
每个⼈都应该意识到你们不应该从⽹上随机抄袭或者抄其他⼈的
7.47-7.50 虚⽣花
but just you know be very careful because we will check for these things
但你应该认真对待它们，因为我们会对这些进⾏检查
7.50-8.00 虚⽣花
and as I said , all the discussion and announcements for projects, lectures ,homeworks
will be you on Piazza will do grading with great scope
正如我所说，所有的讨论和关于项⽬，课程，课后作业的公告都会放在Piazza上，然后我们也会
在上⾯进⾏打分
8.00-8.02 虚⽣花
your final grade will be posted on Canvas
你的最终成绩会发布在Canvas上
8.02-8.05
because that's what see me once ,but the the detonated discussion will be on Piazza
但⼀些热⻔讨论也会放在Piazza上⾯
8.05-8.10
and there's a link on the course web page now a little that'll take you to our page
课程⽹站上有⼀个链接会把你带到我们的⻚⾯上
8.10-8.15 虚⽣花
there is a textbook assigned for this for this class Database Systems Concepts
这⻔课中我们所使⽤的教材是Database Systems Concepts
8.15-8.19 虚⽣花
so this is actually a new edition that came out this year
这实际上是今年出的最新版
8.19-8.22 虚⽣花
I've looked at pretty much every single database systems textbook fit that's out there
我看了不少符合我想法的数据库系统相关的教科书
8.22-8.26 虚⽣花
in my opinion this one's actually the the best one
实际上，这⼀本是我认为最好的⼀本
8.26-8.30 虚⽣花
it's it's it's the most up-to-date
它的内容也是最新的
8.30-8.36 虚⽣花
and as I said， well we've above I've lecture notes for topics that aren't covered in the
textbook
正如我所说，我们也会提供⼀些这本书所没有涉及内容的课程笔记
8.36-8.44 虚⽣花
I have to MIT me I haven't looked in a detail of the seventh edition to understand how
much it differs in the sixth edition
我还没有仔细去看第七版和第六版之间有什么区别
8.44-8.46 虚⽣花
so if you want to get the sixth edition ,I'm fine with that
如果你⽤的是第六版，我觉得也没什么问题
8.46-8.48 虚⽣花
I don't think there should be any major difference
我不觉得这⾥⾯有什么太⼤差别
8.48-8.58 虚⽣花(待修改)
I just may not know exactly how to you could look at last semesters chap last
semesters。oh sorry ,last year's course and see for the different topics with the chapter
numbers
你可以去浏览下去年的课程，并和这些章节进⾏对⽐来查看其中不同的主题
8.58-8.59 虚⽣花
because they have changed
因为它们的内容不少已经变了
8.59-9.02 虚⽣花
and I'm actually not sure whether you can buy this book anymore
实际上，我也不确定你还能不能买到这本书
9.02-9.04 虚⽣花
like you can't buy it as a bound book
你买不到这本书的精装版
9.04-9.10 虚⽣花
they sent me you know a bunch of page loose loose pages or ,you know three threering hole punches in them
你们也知道，他们送了我⼀本，但⾥⾯缺了不少⻚，甚⾄还有⼏个洞在书上
9.10-9.13 虚⽣花
so I don't know what the bookstore has ,I don't know whether to available online it,
我不知道书店有没有，我也不知道⽹上能不能找到它
9.13-9.22 虚⽣花
in the sixth edition but it's probably good enough, right we won't do any homeworks or
any problems out of the book directly
对于我们来说，第六版就够⽤了。我们不会去做任何超出这本书范围的作业或者习题
9.22-9.24 虚⽣花
,right well we'll provide everything for you
我们会为你们提供⼀切
9.24-9.29 虚⽣花
all right ,so the breakdown for your grade in the class will be the following
好了，这⻔课的成绩是由以下⼏部分组成的
9.29-9.35 虚⽣花
so homeworks will be 15%, then it would be course projects which I'll discuss in a
second that'll be 45%
作业占了分数的15%，之后我所要谈的课程项⽬占了45%
9.35-9.44 虚⽣花
so for those of you that are CS undergrads ,because the project grade your final grade is
comprised of 45 percent projects
对于你们那些CS本科⽣来说，因为项⽬的分数已经占了你最终成绩的45%
9.44-9.52 虚⽣花
that's why this course counts for the system software elective for the CS undergrad
curriculum
这就是为什么这⻔课作为CS本科⽣阶段系统软件选修课程的原因了
9.52-9.55 虚⽣花
and then there'll be a midterm and final exam both at 20% ,
接着，期中考试和期末考试的成绩都各占了20%
9.55-9.58 虚⽣花
and then there'll be an extra credit which I'll announce in a few weeks
接着还有⼀个额外分数加成，关于这点我会在之后⼏周宣布
9.58-10.03 虚⽣花
when you can get an additional 10% bonus points and that's that's entirely optional
你可以得到额外的10%的加分，但这取决于你要不要
10.03-10.07 虚⽣花
so there'll be five homeworks throughout the semester
整个学期有5次家庭作业
10.07-10.14 虚⽣花
the first one will be a sequel assignment ，you will give you a SQL Lite database you
have to write some queries for us
第⼀次（作业）是数据集分配，会给你像数据库⼀样的数据集，你要为我们写⼀些查询语句
第⼀个作业是⼀个SQL相关的作业，我会给你⼀个SQL Lite数据库，你需要写⼀些数据库查询
语句
10.14-10.18 虚⽣花
but then everything after that will be pencil and paper ,
但之后的作业都是你⽤纸和笔去完成的
10.18-10.24 虚⽣花
because it's a way to work through those sort of more theoretical side of some of the
things that we're talking about
因为这是⼀种去理解我们所讨论的理论知识的⽅法
10.24-10.33 虚⽣花
but it'll be like filling out multiple-choice ,and then you just take a picture of it and
upload it to could grade scope and will provide grade that way
但就像填写选择题那样，你只需把你的作业拍个照然后上传，接着我们就会对它打分
就⽐如做选择题，你只要把你的答案拍个照然后上传，然后我们就会对它打分
10.33-10.35 虚⽣花
so again, the first assignment is SQL
So再说⼀遍，第⼀次作业是SQL相关
10.35-10.40 虚⽣花
just because of you know we actually won't be writing SQL for the rest of the semester,
就像你知道的，实际上在这个学期剩下的时间⾥，我们不会⼀直去写SQL
10.40-10.42 虚⽣花
because the course projects don't require it
因为课程项⽬中并不需要它
10.42-10.48
and I think it's good for you to guys to touch it at least once at least my big band
stuff we'll talk about it next semester
我觉得对于你们来说⾄少玩⼀下也是好的，下学期我们会讨论它
10.48-10.52 虚⽣花
so again because is about saying all these homeworks should be done individually as
well as the projects
再说⼀遍，所有这些作业以及项⽬都必须独⽴完成
10.52-10.57 虚⽣花
but it's one emphasized this that like you're not allowed to work in groups and try to
figure things out
但有⼀点要强调，我不允许你们组队完成作业
10.57-10.58 虚⽣花
it's not like a Theory class yet
它并不是⼀⻔理论课
10.58-11.02 虚⽣花
all these are assignments can be done and should be done individually
所有的作业都应该独⽴完成
11.02-11.07 虚⽣花
All right ,for the projects, this is the one I'm pretty excited about
好了，我最兴奋的事情就是项⽬了
11.07-11.13 虚⽣花
so throughout the course of the semester， you will build your own database storage
manager from scratch
在整个学期中，你需要从头开始构建你⾃⼰的数据库存储管理器
11.13-11.20 虚⽣花
So you'll start adding you know pieces one by one and start building out aids or a fullfeatured a database storage manager
So你可以⼀点⼀点的来构建出⼀个功能完整的数据库管理器
11.20-11.24 虚⽣花
so the keyword there storage manager and not a database system
注意，这⾥的关键字是存储管理器⽽不是数据库系统
11.24-11.27 虚⽣花
because you're not gonna be able to run SQL or have a query parser
因为在这⾥⾯，你⽆法运⾏SQL语句，也没有查询解析器
11.27-11.32 虚⽣花
but you'll be able to run queries that are hand coded that will provide you
但你能够通过提供给你的⼿写代码来执⾏查询
11.32-11.36 虚⽣花
So it's it's it's more complex than the sort of that simple key value store
因此，这要远⽐简单的键值存储来的复杂得多
11.36-11.38 虚⽣花
but it's not like a full-fledged system
但它并不是⼀个功能完善的系统
11.38-11.46 虚⽣花
So the key thing about this is that it's very important for you to keep up to date with the
projects
对你来说，实时更新你的项⽬⾮常重要，这也是最关键的事情
11.46-11.49 虚⽣花
because every project is gonna build after one after another
因为每个项⽬都是基于另⼀个项⽬构建出来的
11.49-11.55 虚⽣花
so you sort of have to have the first project working correctly in order for the
second project to work correctly and the third and so forth
因此，你必须保证你第⼀个项⽬正确⼯作，这样你第⼆个项⽬才能正确⼯作，第三个项⽬也是
如此，以此类推
11.55-12.01 虚⽣花
so this particular system that we're using this semester is written entirely in C++ 17
我们这学期所使⽤的系统是完全⽤C++17所编写的
12.01-12.05 虚⽣花
it doesn't mean we're using all the advanced features of C++ 17
这并不意味着我们会去使⽤C++17的所有⾼级特性
12.05-12.14 虚⽣花
it just means that it's you know it's not like you're you know C99, so traditional single
plus you may have learned in other classes
它和你所知的C99不同，你可能会在其他课上学到传统的C++
12.14-12.19 虚⽣花
so because this is Carnegie Mellon and I assume this is advanced class
So因为这⾥是卡内基梅隆⼤学，我觉得这也是⼀⻔⾼级课程
12.19-12.26
I'm not ignore the TA are going to be teaching you or teaching how to write or debug
C++
我不确定助教们是不是要去教你们如何编写C++代码或者对代码进⾏debug
12.26-12.28
I sent up a self-exam on Piazza
我在Piazza上设置了⼀次⾃我测验
12.28-12.34
if you feel like you're uncomfortable with ,you know those are the gnarly aspects of C++
如果你对上⾯关于C++相关⽅⾯的知识不熟悉的话
12.34-12.38
and then you should try to figure out how we try to start learning this stuff now
那么你就应该试着去弄懂我们开始要学的东⻄
12.38-12.44
right ,you can't come to us as the TA‘’S office hours and say, hey you know what is the
stack trace mean
你也不要来助教办公室问⼀些诸如stacktrace这种简单问题
12.44-12.53
you know the this time is really expect it to be discussing the serve them the more highlevel important database concepts that you're trying to implement in your code
你知道我们希望这些时间可以⽤来和你们讨论那些你尝试⽤代码所想实现的数据库概念
12.53-13.04
so the ,all the projects this year will be implemented on this new academic system that
we've been working on called BusTub
今年所有的项⽬都会在我们所开发的新学术系统BusTub上进⾏实现
13.04-1308 虚⽣花
so all the source code will be released on Github
所有的源码都在会Github上进⾏开源
13.08-13.12 虚⽣花
of course obviously it won't have the implementation of the piece that you chose to
implement
当然，很明显，它上⾯并没有你选择去实现的那部分功能
13.12-13.14 虚⽣花
but you sort of fill that in
但你需要去实现它们
13.14-13.21 虚⽣花
so at a high level it's a disk based or disk oriented a data management system that'll
support volcano-style query processing
从上层的⻆度来讲，这是⼀个⾯向硬盘的数据管理系统，它⽀持Volcano式⻛格的查询处理
13.21-13.26 虚⽣花
Different parts of the system have a sort of a Pluggable API
该系统中的部分内容还⽀持插拔式API
13.26-13.34
so that we can Pluggable in different you know replacement algorithms are given
,different index data structures ,or different logging schemes or control schemes
这样我们就可以替换系统中已经给出的算法，使⽤不同的索引数据结构或者不同的⽇志格式和控
制⽅案
13.34-13.40
so it's designed to be that way so that every year will switch up the project's entirely
该系统就是使⽤这种思路来实现的，因此每年都会将整个项⽬完全换掉
13.40-13.46
and have it be different form one year to the next ,So the slowly build out the system
further and further with new features and functionality
这样它就会每年都不⼀样，这样⼀步步通过添加新特性和功能去构建整个系统
13.46-13.51
so that you know after a couple years we'll have a full-fledged database management
system
这样你就知道，数年之后，我们就会有⼀个功能完善的数据库管理系统
13.51-13.55 （⻜哥既视感）
So you guys are sort of the first ones starting off with these first set of projects
因此，你们这批⼈就是第⼀批开始做这期项⽬的⼈
13.55-13.59
and then next year what will modify them in it'll be different
然后，在下⼀年我们会对它们进⾏修改，这样⼜让它们变得不⼀样了
13.59-14.02
All right, so this for this reason， we can make it open source
基于这个原因，我们将它开源
14.02-14.10
because I'm not worried about people you know people next year finding your
crappy projects implementations and copying their code
因为我并不担⼼下⼀年的学⽣找到你那垃圾的项⽬实现并抄袭你的代码
14.10-14.12
because it's all the project of being entirely different
因为整个项⽬都会变得完全不⼀样
14.12-14.16
so this is what I was saying before the last slide that you're good in basically
storage manager
So就是我上张幻灯⽚上所说的⼀样，它基本就是⼀个存储管理器
14.16-14.21 虚⽣花
,the database system doesn't support SQL at this point and nor will and this the semester
这个数据库系统这学期并不⽀持SQL
14.21-14.29 虚⽣花
but you'll be able to write queries ,but you'll write them in sort of physical operator form
rather than ,and you know in SQL and then translate them
但你还是能去写查询语句的，但你会以物理运算符的形式去将SQL翻译并进⾏查询，⽽不是⽤你
所知道的SQL语句去进⾏查询
14.29-14.31 虚⽣花
because it's not something we're doing just yet
因为这不是我们正在做的事情
14.31-14.33
so the name of the system is BusTub
因此，该系统的名字是BusTub
14.33-14.36
I will explain offline what that means
我会在线下解释它的含义
14.36-14.39
but we had a nice logo logo made
但我们给它做了⼀个⾮常好看的Logo
14.39-14.45
and again what announced onGithub, we'll post a link on Piazza in week two
在第⼆周，我们会在Github上上传内容并在Piazza上发布链接
14.45-14.47
well right now it's the first project
现在，它是第⼀个项⽬
14.47-14.50
so I'm pretty excited about having this the everyone work on this this semester
So我对这学期为这个项⽬作出贡献的每个⼈⽽感到兴奋
14.50-14.57
all right for the late policy for the homework and projects ,every student is allowed four
slip days,
这⾥我来讲下关于作业和项⽬晚交的延期政策，每个学⽣允许有四天的宽限期（这段时间内交作
业不扣分）
14.57-15.07
so basically for any homework or project you say I you know I found my daily you can
decrement affront from your account
⼀般来讲，对于任何作业或者项⽬，如果延期，我们会对你进⾏扣分
15.07-15.17
so the be on a on each homework and the project submission ,you just say how
many late days you use how many ladies you left so sort of allow yourself to keep track
of what ,you know have how many late days you have
对于每个作业和项⽬来说，请在你的提交记录上标明你延期的天数以及你所剩下的延期天数
15.17-15.28
so after you run out of slip days, then it'll be you lose 25% for every on the and the sum
of total points every time, it's it's it's for every 24 hours that it's late
当你⽤完了宽限期，如果你作业没交，那么每24⼩时就会扣掉你项⽬或者作业的25%的分数
15.28-15.32
so again this wouldn't keep attracting us as we go along in the semester
随着学期的进⾏，我们不会⼀直关注这个
15.32-15.38
obviously if there's medical munitions or other issues that come up please contact me
and we can accommodate you
如果⽣病或者其他问题，请与我联系，我们可以给你提供备选⽅案
15.38-15.45
So again as I said before now all these projects and the homework should be
done individually
这⾥再说⼀次，如我之前所说，所有的项⽬和作业必须独⽴完成
15.45-15.47
,they're not group assignments
它们并不是团队作业
15.47-15.51
you're not allowed to work it out together and submit a single submission together
我不允许你们组队完成它，然后⼀起单独交⼀份
15.51-15.53
you should be doing everything individually
你应该独⽴完成每⼀件事
15.53-16.01
now some code for some projects may be still online from from wish or from previous
years
某些前⼏年项⽬的代码可能⽹上现在还存在
16.01-16.06
don't take that we're gonna run it through boss the players plagiarism checker,
请不要抄袭，我们会对它们进⾏抄袭检查
16.06-16.12
if we catch you running their shitty code ,unfortunately you know we got to report me to
Warner Hall
如果我们抓到你抄袭他们的狗屎代码，那么很不幸，你懂的这件事会通报给我
16.12-16.16
so don't do that because this ,you know you know it's stupid it'll fuck your life
所以请不要抄袭，因为这很愚蠢，这也会毁了你的⽣活
16.16-16.20
and it makes everything harder ,right just don't don't plagiarize
它会让所有事情变得很艰难，所以请不要抄袭
16.20-16.30
okay and yeah, if you're unsure， check the academic policy or policy for academic
integrity ,or contact me if you're unsure about what to do ,and this includes also for
the extra credit
如果你不确定，请查看下学术政策，如果你不确定该做什么，请联系我，当然这也包括额外加分
的部分
16.30-16.37
and just because it's extra credit and it's optional doesn't mean that you can't also get
caught for plagiarism
因为它是额外加分并且是可选的，但这并不意味着你因为抄袭⽽不会陷⼊困境
16.37-16.38
so don't do that as well
因此请不要这么做
16.38-16.44
and I'll remind you every single time we put a new project out every single time
,you know we we tell why the extra credit okay
每次我们放出⼀个新项⽬时，我就会告诉你们如何得到额外加分
16.44-16.51
all right, so if you want to go beyond the kind of things we're talking about this this
course, if you really like databases which I do
除了我们所讨论这⻔课的内容以外，你还想学更多的话，如果你真的就像我那样热爱数据库的话
16.51-16.54 虚⽣花
you have no idea how much I love databases
你可能并不知道我是多么热爱数据库
16.54-16.59
If you want to go beyond the course material
如果你想去学习课程资料以外的东⻄
16.59-17.04
there's two sort of ways to get involved in database research or other database topics
going on at Carnegie Mellon
那么这⾥有两种⽅式去参与数据库研究或者其他在卡内基梅隆⼤学的数据库课题
17.04-17.13
so the CMU database group has our weekly meetings on Mondays at 4:30 in the
gates, gates building own a floor
在每周⼀下午的4:30，CMU数据库讨论组会在GHC 8102举⾏每周会议
17.13-17.23
and this is other students visitors from companies ,and people in Pittsburgh from abroad
coming and giving talks about what you know the the kind of researcher kind of work
that they're doing
这⾥会有其他学校的学⽣，⼀些⼤公司的来宾或者⼀些来⾃国外的⼈来参加这场会议，然后这些
研究⼈员会对他们的⼯作进⾏演讲
17.23-17.28
If you want to get involved in the development of a sort of advanced system
如果你想参与⾼级系统的开发
17.28-17.35
we have our team meetings on Tuesdays at 12 o'clock also in the gates building
我们在每周⼆中午⼗⼆点的GHC 8115房间举办我们的团队会议
17.35-17.39
so we're building in addition to bustub sort of the academic system
我们在为开发我们的学术系统BusTub⽽努⼒
17.39-17.45
we have a new sort of full-featured database management system that we've been
doing for several years now
我们有⼀套功能完善的新数据库管理系统，为此我们开发了好⼏年
17.45-17.52
that again if you want to get involved in this kind of stuff ,you should come check that
out and I'll send a reminder on this Piazza
如果你想加⼊这项⼯作，那你可以看下我之后在Piazza上发的提醒信息
17.52-18.03
it will say also to if you want to take the advanced class (15-721) in the spring ,all those
projects are based on on this this new this other system we're building
如果你想在春季选15-721这⻔⾼级课程，那么它⾥⾯的所有项⽬都会基于我们所开发的这个新
系统
18.03-18.11
so if you want to get that and sort of learn learn how that system works and get involved
in the early days of this thing ,no by all means come to this
如果你想知道系统是如何⼯作的并想参与到早期开发中，那就啥也别说参与进来吧
18.11-18.21
okay ,so with that that that's that's it for the course I mean please if you have questions
about things post posted coach them on Piazza and I'll respond
好了，这就是这⻔课关于学术诚信所涉及的内容，如果你还有任何疑问，请在Piazza上贴出来，
我会进⾏回复
=====================================================================
==
18.21-18.25
all right ,so now let's talk about Databases
好了，现在让我们来讨论下数据库
18.21-18.34
the Databases are super important in in real life
数据库在现实⽣活中⾮常重要
18.34-18.36
because they're used everywhere
因为它们⽆处不在
18.36-18.45
,so many but every single complex are energy and any computer applications you can
think of ,at the end of the day deep down inside of it there's going to be a database
你能想象到的任何电脑应⽤程序，它们内部都会有⼀个数据库
18.45-18.55
right ,if it's a mobile phone application, if it's running your desktop, if it's a website right,
if it's some kind of complex computer simulation, the end of the day there's always a
database
如果它是⼀个⼿机应⽤或者桌⾯程序，或者是⼀个⽹站，⼜或者是某种复杂的电脑模拟程序，在
它们⾥⾯始终会有⼀个数据库
18.55-19.00
,everyone has database problems many things can then just be reduced down to
database problems
这些应⽤都有数据库层⾯的问题，许多事情都能最后简化为数据库层⾯的问题
19.00-19.09
so a database the definition I like to use is that it's a it's a collection of data
that's related to gathers in some way
所谓数据库，我喜欢这样去定义它，即它是以某种⽅式去进⾏关联的数据集合
19.09-19.12
that's trying to model some aspect of the real world
这就可以试着对现实世界的某些⽅⾯进⾏建模
19.12-19.17
right ,it's not just a bunch of loose files you have randomly sitting on your laptop
它们并不是那些随机分布在你电脑上的那些零散⽂件
19.17-19.22
right and that in some ways that the database but it's not really useful one because you
can't ask questions about it
某种意义上，这算是⼀种数据库，但并不是那么有⽤，因为你⽆法对它进⾏⼀些查询操作
19.22-19.26
so this data is usually related together or have some common theme to them
这些数据通常会关联在⼀起或者它们之间有某些共同主题
19.26-19.30
and it's trying to you know model some aspect of something that's going on in reality
可以试着去对现实⼀些事的某些⽅⾯进⾏建模
19.30- 19.41虚⽣花
so the example I always like to use for this class is that say we want to have a digital
music store by something like Spotify or the iTunes Store right
这个例⼦是我最喜欢在这个课堂上⽤的，假设我们想要有⼀个类似于Spotify或者iTunes商店那
样的电⼦⾳乐商店
19.41-19.46
and so we're so backing this application will be a database
在这些应⽤程序背后做⽀持的就是数据库
19.46-19.51
that's going to keep track of the various Artists we have and their Albums
它⽤来保存许多艺术家以及他们的专辑信息
19.51-20.00 虚⽣花
right ,so the what we would put in this database would be basic information about their
Artists ,and then information about what Albums that those Artists have released
在这个数据库中我们所放⼊的是艺术家们的基本信息，以及他们所发⾏的专辑信息
20.00-20.05
all right so that's that cool right there that's that's that's a database
这很Cool对吧。这就是数据库！


> 参考：
> 视频讲解：https://www.bilibili.com/video/BV1bQ4y1Y7iT/?spm_id_from=333.788
> ppt：https://15445.courses.cs.cmu.edu/fall2021/schedule.html

# Lecture #01: Course Introduction and the Relational Model

数据库是相关联数据的集合，对真实世界的建模。

数据库是核心组件。

没有数据库之前通常是用文件来存储数据。

![20220322162442](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220322162442.png)

如果想查询某些数据需要逐行遍历文件进行筛选：

![20220322162654](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220322162654.png)

但是由此产生的一堆问题，例如：

如何实现两张表之间的映射？如果乱改某些字段该怎么办？如果一个 album 中有多个歌手该怎么办？

如何查找特定的记录？两个应用如何使用同一个数据库？两个线程同时写同一个文件？

数据写到一半数据库崩了怎么办？


# Lecture #14: Query Planning & Optimization I


## QUERY OPTIMIZATION

![20220318155259](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155259.png)

因为 declarative language 的缘故，查询的具体过程是由 DBMS 实现，而不同的过程开销不同，DBMS 需要选出性能最好的查询计划，进而引出了优化。

declarative language : 所谓声明式语言，我觉得可以简单的理解为完成一个任务，只看结果，至于怎么完成的都由系统的实现者来决定而非写代码的人要考虑的问题。SQL 就是一种生命式语言，SQL 告诉 DBMS 想要什么，而不是告诉 DBMS 怎么做。

目前出现了两个流派，第一个流派是声明式的语言，具体执行过程由 DBMS 来决定。第二个流派是人来写具体的执行过程。

优化一般有两种优化的思路：

1. 启发式的，重写查询，移除效率低的部分，不需要成本模型。
2. 估计每一个查询计划的开销，选择开销最小的查询计划。

一般来说以上两种手段都会采用。

![20220318155350](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155350.png)

如果两个关系代数产生的 tuple 集是相同的，那么可以认为二者是等价的。根据这个原理来实现优化。

大部分的 DBMS 都会重写查询计划而非原生的 SQL 语句。

一些具体的例子：

1. 谓词下推(Predicate Push-down)，提前过滤符合条件的 tuple 从而降低 join 时中间数据集的大小。
2. Projections Push down，
3. 表达式简化(Expression Simplification)，重写出来一个更简单的表达式。

## ARCHITECTURE OVERVIEW 查询流程总览 

![20220318153541](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318153541.png)

1. SQL 查询。进行一些简单的预处理，处理一下字符串。
2. Parser 生成抽象语法树。
3. Binder 建立 AST 和数据库表名称之间的映射。
4. 生成初始的逻辑计划，重写 Tree 。
5. 优化：启发式，代价分析。
6. 生成物理计划。

## 逻辑查询计划和物理查询计划的区别

![](image/lec14/1647590081687.png)

逻辑算子和物理算子之间的映射，但是二者并非一对一对应，一个逻辑计划可能对应三个具体的物理算子。

物理算子定义了具体的执行流程。

可以简单的将其理解为数据结构中的逻辑结构和物理结构。

优化是一个 NP-Hard 问题。

## 关系代数的等价性

如果两种查询得到同样的 tuple 集，那么可以认为这两种查询是等价的。

查询重写(query rewriting)：DBMS 可以不通过开销模型来得到更好的查询。

## 谓词下推 PREDICATE PUSHDOWN

下图是一个不做任何优化的查询例子。连接 student 和 enrolled 两个表查询成绩(grade)字段为 'A' 的学生 name 和 cid 。

![20220318155828](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155828.png)

一个简单的优化措施：可以提前过滤 enrolled 表，将 grade='A' 的行筛选出来再与 student 表连接。这样就降低了两个表连接后所产生中间数据的大小。

![20220318155929](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155929.png)

尽可能早的过滤。

重排 predicates 顺序。

简化复杂的 predicate 。

可以同样提前过滤 student 表，因为只用到了 sid，name 两列，而其他列都没有用到如果加载到内存中显然浪费。

![](image/lec14/1647591114372.png)

## 更多例子

接下来是一些能够直接处理的优化，也就是在语法层面存在一些很直接的优化。

例如下面的语句显然不合理，所以并没有真正的去执行，而是直接处理返回结果。

![20220318162333](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318162333.png)

除此之外还有更多的例子：

![20220318162517](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318162517.png)

## 开销模型组成

1. 物理开销：CPU 执行，I/O，缓存命中等开销。
2. 逻辑开销：算子处理数据量的开销。
3. 算法开销：时间复杂度。

磁盘的开销是最大的。




# Lec15 并发控制理论

DBMS 的组件分为：

这一节主要研究基于代价的优化器。

根据代价模型估计多个计划的好坏从而选择一个最好的执行计划。

![20220318190726](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318190726.png)

谓词的选择性近似为概率：

![20220318191822](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318191822.png)

基于概率的思想来处理交集和全集：

![20220318191935](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318191935.png)

# Join 结果集评估

![20220318192841](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318192841.png)

此前是基于整个字段均匀分布，但是存在不独立的情况。

修改为桶内(区域字段)均匀分布，桶间不均匀。

采样，取子集分析子集推全集。

左深树，Join 的左子树也是 Join 生产的中间表，右子树必须是表。

![20220318194511](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318194511.png)

## 




# lec15 事务

https://www.bilibili.com/video/BV1t3411v73Y/?spm_id_from=333.788

事务是一系列的操作，数据库操作的最基本单位。

如何实现事务？

一个简单的策略是复制事务执行前的数据，一旦事务执行失败就用之前的数据覆盖。缺点是没法并发。

事务之间的并发，存在一些问题，临时性的不一致（难以避免），永久性的不一致（不接受！）。

如何实现事务之间的并发？

为方便处理将数据库事务可以简化为对数据的读和写，将数据都简化为变量。

事务被 BEGIN 和 COMMIT/ABORT 包裹。其中 COMMIT 表示事务完成，ABORT 表示事务回滚，事务执行的结果只有这两种结局。

## ACID 

ACID 是事务正确执行的标准。

![20220321163209](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321163209.png)

1. 原子性:要么都完成要么没开始，不存在中间态。
2. 一致性:应用系统从一个正确的状态到另一个正确的状态。而ACID就是说事务能够通过AID来保证这个C的过程。C是目的，AID都是手段。确保逻辑正确。一致性分为数据库一致性和事务一致性，此处是指数据库一致性。
3. 隔离性：事务之间是独立的。临时的修改别人看不到。
4. 持久性：写到磁盘上，永久保存。

## 原子性解决办法

原子性具体场景：

1. 刚取出一百块钱，DBMS 就崩了。
2. 刚取出一百块钱，断电了。

解决方法：

1. 写日志，将事务的每一步回滚到上一步的操作都记录到 undo log 中。除此之外日志可以提高I/O性能，先将一些 I/O 操作写到日志中，等待空闲的时候在根据日志去执行。日志还有一个作用是监控审计。
2. 只备份修改的页，增量备份。目前很少用，大部分都是用日志。

## 隔离性

方便程序员处理，不用考虑隔离，由 DBMS 自动实现。

为了实现隔离，出现了并发控制，有些任务不能并行，需要串行完成。如何实现串行？


## 三种冲突


当两个事务中的某个存在写操作时才存在冲突，如果全是读是不存在冲突的。冲突有三种：读写冲突，写读冲突，写写冲突。

![20220321183016](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321183016.png)

1. 读写冲突：第一次读数据A和第二次读数据A结果不一样，破坏了隔离性。

![20220321183144](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321183144.png)

2. 写读冲突(脏读)：T1事务更新数据A但没有提交，而此时T2事务对更新后的数据A进行操作。一旦T1事务撤销对数据A改变T2事务就会出问题。

![20220321182146](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321182146.png)

3. 写写冲突：如下图，最终保存下来的数据是 T1 中的B，T2 中的 A 。

![20220321182812](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321182812.png)

## 可串行化

![20220321184413](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321184413.png)

之前提到的三种冲突是不能交换顺序的。除此之外可以交换顺序，而通过调整顺序可以实现串行化。如果通过调整发现存在冲突，无法改为串行那么就是不可串行化。

依赖图：一种判断是否可串行化的方法。

![20220321185306](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321185306.png)

![20220321221443](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321221443.png)

![20220321221920](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321221920.png)

还是得看具体业务，虽然理论上不能串行，但是分析到具体业务，其实还是可以串行的。

![20220321222032](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321222032.png)

目前所有的读写冲突都存在错杀的情况。

并发执行的最终效果需要和串行执行的最终结果一致。

# Lec 16 二阶段锁

![20220321223329](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321223329.png)

## 锁的类型

latches 和 locks 。

![20220321223543](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321223543.png)

先获取逻辑上的 lock 真正执行的时候再获取物理上的 latches 。

* S锁：共享锁（读锁）
* X锁：排他锁（写锁）

![20220321223824](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220321223824.png)

## 两阶段锁

## 死锁检测和预防

## 锁的层级


# 参考

1. [笔记1](https://zhenghe.gitbook.io/open-courses/cmu-15-445-645-database-systems/relational-data-model)
2. [笔记2](https://www.jianshu.com/nb/36265841)
3. [fall2019/schedule](https://15445.courses.cs.cmu.edu/fall2019/schedule.html)
4. [14-optimization1.pdf](https://15445.courses.cs.cmu.edu/fall2019/slides/14-optimization1.pdf)
5. [视频中文翻译](https://www.bilibili.com/video/BV1Cp4y1C7dv?p=14)
6. [一个好一点的视频中文翻译](https://www.zhihu.com/zvideo/1416347667424940032)
7. [13-查询优化-I [中文讲解] CMU-15445 数据库内核](https://www.bilibili.com/video/BV1qR4y1W7v6/?spm_id_from=333.788)