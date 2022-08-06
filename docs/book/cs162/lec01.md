# CS162 Lecture 1_ What is an Operating System

现在操作系统是这一切的核心
basically you make incredible advances continuously in the underlying
基本上，你在底层不断取得令人难以置信的进步
technology and what happens is somehow each
技术和所发生的事情都在某种程度上
device is a little bit different every technology generation generations a
每个技术世代的设备都有一点不同
little different and you got to provide uh somehow a
有点不同，你必须提供一个
consistent programming abstraction to applications no matter how complicated
无论多么复杂，应用程序的一致编程抽象
the hardware is and you gotta manage sharing of
硬件是，你必须管理共享
resources okay so the more devices we have connected the more resources there
资源可以，所以我们连接的设备越多，资源就越多
are to share and as we get closer to the end of the
是为了分享，当我们接近尾声时
term so i'm going to say the last third of the term
所以我要说这学期的最后三分之一
we're going to start talking about some of these uh
我们将开始讨论其中的一些呃
very interesting peer-to-peer systems that are out there
非常有趣的点对点系统
that basically allows us to
这基本上允许我们
have huge storage systems that span many devices
拥有跨越许多设备的巨大存储系统
i did see some questions about postings of slides we will
我确实看到了一些关于幻灯片张贴的问题，我们将
definitely um in the future i'll have them up earlier than
当然，嗯，将来我会让他们早点起床
um the day after lecture uh so some of the key building blocks
嗯，讲座后的第二天，嗯，所以一些关键的组成部分
to operating systems are really uh things that we're gonna
操作系统是我们要做的事情
we're gonna learn about in class uh processes threads concurrency scheduling
我们将在课堂上学习进程线程并发调度
coordination many of these things you've learned
协调你学到的许多东西
about in the 61 series address spaces protection isolation
关于在61系列地址空间中的保护隔离
sharing security and that level of security is
共享安全，这种安全级别是
going to be both at the device level and then as we build out into the
将既在设备级别，然后当我们构建到
network you know we'll talk about things like ssl and then we'll talk about
网络你知道我们会谈论像ssl这样的事情，然后我们会讨论
uh more interesting security models as we go
更多有趣的安全模型
and there's going to be communication protocols um
会有一些通讯协议
there's going to be persistent storage um there's projects i've worked on in
会有持久的存储空间我参与过的一些项目
the past i'll mention briefly later where it was interested the
我稍后将简要提及过去，它感兴趣的地方
interesting question was how do you store information for thousands of years
有趣的问题是你如何存储数千年的信息
without it being destroyed we'll talk about transactions and
在没有被摧毁的情况下，我们将讨论交易和
consistency and resilience and interfaces
一致性和弹性以及接口
to all these devices so this is um a class that spans a lot of interesting
所有这些设备，所以这是一个跨越很多有趣的类
topics all right and so for instance here's
主题很好，例如这里是
something you do every day without thinking about it
你每天都在做的事情而不去想它
multiple times you got your cell phone and you want to
很多次你拿着手机，你想
look up something uh on some device uh you know web you know a web page or
在某个设备上查找一些东西，呃，你知道网络，你知道网页，或者
maybe you're using an app and what happens there well the first
也许你正在使用一个应用程序，首先会发生什么
thing that happens is uh there's a dns request that tries to
发生的事情是，呃，有一个dns请求试图
figure out what the uh internet ip address is to
弄清楚呃互联网IP地址是什么
where you're trying to go and that goes to a bunch of dns servers
你想去的地方会被送到一堆域名服务器上
uh on the network and they return information
呃在网络上，他们返回信息
that helps now your say cell phone route through the internet which is a very
这有助于现在你说手机路线通过互联网，这是一个非常
interesting uh device in and of itself consisting of many pieces
有趣的呃装置本身由许多部件组成
um and that may go to a data center somewhere with a load balancer that then
嗯，它可能会被送到某个有负载均衡器的数据中心，然后
will pick one of several possible devices out
会从几个可能的装置中挑一个出来
there which will then maybe do your search and
那里可能会做你的搜索
retrieve information from a page store put it back together
从页面存储中检索信息，将其重新组合在一起
into some uh page that you can use and then you
放到你可以用的页面上然后你
get the result back and you know you do this every day and
把结果拿回来，你知道你每天都这样做
don't really think about it too much and uh once you start thinking about it
不要想太多，一旦你开始思考
gets pretty interesting like for instance how is it that those dns
变得非常有趣，例如，这些dns是如何
servers stay consistent and why is it that it's
服务器保持一致，为什么它是
not possible to hack into them well in fact uh back in the middle 2000's
不可能黑进他们事实上在2000年代中期
people were hacking into them i'll tell you a little bit about that later
有人黑进了它们，我稍后会告诉你一些
um and how do you make sure that the packets get enough
嗯，你如何确保这些包足够
uh priority when they come into an operating system that
当他们进入操作系统时优先考虑
maybe your your particular query doesn't get delayed
也许你的特定查询不会被延迟
a long time so there's some scheduling questions so this is a pretty complex
时间很长，所以有一些日程安排问题，所以这是一个非常复杂的问题
system and it's every time i spend
系统和它的每一次我花
the time to think about it i'm amazed it works okay
是时候好好想想了，我很惊讶它还能正常工作
it's pretty impressive and hopefully by the end of this class
这是相当令人印象深刻的希望在这节课结束时
you'll have enough knowledge of what's going on in all parts of the operating
你会对行动的各个部分有足够的了解
systems and the networks that you too you know you'll be much smarter than
系统和网络，你也知道你会比
when you started the class of course but um you'll be able to appreciate and
当你开始上课的时候，当然，但是你会意识到
sometimes maybe uh wonder why it is that it actually
有时候也许呃想知道为什么它实际上
manages to work or be impressed that it works so
设法工作或印象深刻的是它如此工作
yeah but what's an operating system okay um
是的，但是操作系统是什么？好吧，嗯
what does it do we could ask that question um so most likely you could you
它能做什么？我们可以问这个问题，嗯，很可能你可以你
could say well from the standpoint of what it does this is like being a
从它的作用的角度来看，这就像是一个
physicist that's maybe measuring a bunch of things you say well
物理学家可能在测量你说得好的一堆东西
it's memory management it's io management it does scheduling does
这是内存管理，iOS管理，调度
communication um does multitasking or
通讯嗯做多任务或者
multi-programming um you could you could ask those things
多重编程你可以你可以问这些问题
you might ask is an operating system about the file system
你可能会问是关于文件系统的操作系统
or about multimedia or about the windowing system or the browser
或者关于多媒体或者关于窗口系统或者浏览器
you know back in the 90s there was a lot of fighting between microsoft and bunch
你知道在90年代微软和邦奇之间有很多争斗
of other companies about does the internet browser
关于互联网浏览器的其他公司
constitute part of the operating system and
构成操作系统的一部分并且
you know depending on your point of view that may still not be a resolved
你知道，根据你的观点，这可能还没有解决
question but um anyway it was one that has been asked
问题，但无论如何，这是一个被问到的问题
so um and also i would ask everybody to turn off their video if they could
所以我想请大家把视频关掉如果可以的话
please while they're while we're talking so um
拜托，当他们在我们说话的时候，所以嗯
so is this you know these questions only interesting to academics
你知道这些问题只对学者感兴趣
it's a question you might ask um okay so uh hopefully not hopefully it's
这是一个你可能会问的问题，嗯，好吧，所以，呃，希望不是，希望是
interesting to you um could i ask the person just came in turn off your camera
对你来说很有趣，嗯，我能问一下刚刚进来的人关掉你的相机吗
please or turn off your video because that will show up in the
请或关闭您的视频，因为这将显示在
recording so a definition of an operating system
记录操作系统的定义
is uh no universally accepted definition is
是呃没有普遍接受的定义是
part here everything a vendor ships when you order an
当您订购时，供应商会在此处提供所有货物
operating system might be a good approximation uh but it
操作系统可能是一个很好的近似，呃，但是它
varies pretty widely um it might be the one program running
差异很大，可能是一个程序在运行
at all times on the computer okay uh
一直在电脑上好吧呃
that's the kernel you'll learn a lot about kernels as the term goes on
这是内核，随着术语的继续，你会学到很多关于内核的知识
uh but you can see these two points of view are are
但是你可以看到这两个观点是
different um you know nobody would disagree that the kernel is
你知道没有人会不同意内核是
uh the core of the operating system they would
呃操作系统的核心他们会
disagree pretty widely about is everything that microsoft
对微软的一切意见不一
ships with a windows product part of the operating system
附带操作系统的windows产品部分
okay probably not all right so you know as we try to to
好吧，可能不好，所以你知道我们试着
drill down onto what an operating system is you're gonna have to keep
深入了解你必须保留的操作系统
in mind that we're gonna talk about things it does and pieces that are
记住我们要谈论它所做的事情和
important but maybe you'll never fully know what
很重要，但也许你永远不会完全知道是什么
an operating system is um so it's a typically uh among other
操作系统是嗯，所以它是一个典型的呃
things a special layer of software that provides the application
提供应用程序的特殊软件层
access to hardware resources all right so it's convenient abstractions
可以访问硬件资源，所以抽象很方便
of complex hardware devices um protected access to shared resources okay
复杂的硬件设备以及对共享资源的受保护访问
security and authentication yeah communication
安全和认证是的通信
okay uh so we could look at something like this where we have some hardware
好吧，呃，我们可以看看这样的东西，我们有一些硬件
and it's the fact that many applications can simultaneously run
事实上，许多应用程序可以同时运行
on the hardware is something that the os has provided for us
是操作系统提供给我们的
okay so yeah that makes sense and you will understand exactly how this works
好吧，这是有道理的，你会明白这是怎么回事
uh actually in a few weeks um but maybe we could do it this way well
呃实际上几周后嗯但是也许我们可以这样做好的
operating system what's the first word operating
操作系统操作的第一个词是什么
well that comes actually from uh there used to be people
那实际上来自呃曾经有人
like there was a switchboard operator believe it or not when you made a phone
就像打电话的时候有个总机接线员信不信由你
call they actually had to plug you in to the right connection and make the wires
他们得把你插到正确的连接处然后接上电线
connect then there were computer operators which
然后有计算机操作员
were people that basically sat at one of these big machines for a long time
就是长时间坐在这些大机器前的人
and uh made sure it was running correctly
确保它运行正常
um and then of course operating systems uh
嗯然后当然操作系统呃
the operating part of it then became more about well we're making sure that
它的操作部分变得更多的是关于我们正在确保
the disk is operating quickly or the network is operating correctly or the
磁盘运行速度快或网络运行正常或
graphics cards are operating correctly all right um what about the
显卡运行正常，好吧，嗯，那
word system well this is interesting as well so what
单词系统嗯，这也很有趣，那又怎样
makes a system so a system is something with many interrelated
使一个系统，所以一个系统是与许多相互关联的东西
parts where typically the sum is much greater than the sum of its
通常总和远大于其总和的部分
parts and uh every interrelated part potentially
部分和呃每一个潜在的相互关联的部分
interacts with others and of course that's an n squared uh
与他人互动，当然是n平方
level of complexity at least and we're going to have to come up with
至少是复杂的程度，我们必须想出
apis and uh other clever techniques to avoid
API和其他巧妙的技术来避免
n squared complexity here because things are complex enough as it is
n平方的复杂性，因为事情已经足够复杂了
um and making a system which i showed you earlier the internet that's a system
嗯，制作一个系统，我之前向你展示了互联网，这是一个系统
that has billions of components to make it robust
有数十亿个部件使其坚固耐用
and not fail is going to require an engineering mindset so you guys are
不失败需要工程师的思维，所以你们是
going to have to start thinking like engineers
必须开始像工程师一样思考
and we're going to give you some tools to really think about how to make
我们将给你一些工具来真正思考如何制作
something that complicated actually work um again the internet is
那么复杂的东西实际上又工作了，互联网是
something which you know it's a great example of a
你知道这是一个很好的例子
big system that is amazing that it works and it's actually it doesn't always work
这个大系统很神奇，它是有效的，但实际上并不总是有效的
i i'll pull up some stories later in the term about times where it definitely
我这学期晚些时候会讲一些故事
didn't work my favorite being one time where there
没有工作我最喜欢的是有一次在那里
was a single optical fiber that divided the network into two pieces and it went
是一根光纤将网络分成两部分
through this tunnel in the middle of the country the u.s and
穿过美国中部的隧道
a truck went in and blew up and it melted this fiber and it actually
一辆卡车进去爆炸了，它熔化了这种纤维，实际上
temporarily partitioned the network so um there are times when it just
暂时划分了网络，所以有时它只是
doesn't work properly okay so uh systems programming
不能正常工作所以系统编程
is an important part of this class and you're gonna do a lot of it okay you're
是这门课的重要组成部分，你会做很多，好吧
gonna learn how to take a system like this
要学会如何应对这样的系统
and figure out exactly how to make it work and that's um
弄清楚如何让它工作，那就是嗯
that's exciting okay you're going to get some of the tools you're going to learn
太令人兴奋了，好吧，你会得到一些你要学习的工具
about git you're going to learn about how to work
关于git，你将学习如何工作
in groups you're going to learn about testing and all of these things that
在小组中，你将学习测试和所有这些东西
help to make a complex system actually manageable and hopefully
帮助使一个复杂的系统实际上易于管理，并希望
eventually workable okay so
最终可行好吧所以
so part of making things work are interfaces so here's a
所以让事情运转起来的一部分是界面，所以这里有一个
61c view maybe of things the hardware software interface
61c查看可能的硬件软件接口
so you have hardware that's these bricks and they got software which might be a
所以你有这些砖块的硬件，他们有可能是
program in 61c which hopefully will start coming
61c中的程序，希望它会开始出现
back to you very rapidly you had a processor and you had memory
很快就会回到你身边，你有一个处理器，你有内存
which had the os in it maybe you had uh registers in the processor and those
里面有操作系统，也许处理器里有寄存器
registers pointed at parts of memory okay and that allowed this program to
寄存器指向内存的一部分，这允许这个程序
run uh maybe you had caches we'll we'll learn about caches again and
跑啊，也许你有缓存，我们会我们会再次了解缓存
remember mostly remind you how they work uh which help to make the slow memory
记得主要是提醒你它们是如何工作的，这有助于让记忆变得缓慢
look fast okay the way i like to think about uh
看起来很快好吧我喜欢的思考方式呃
a system with caches is you want to make it as fast as the smallest
一个有缓存的系统是你想让它和最小的一样快
item like the registers and as large as the
像寄存器一样大的项目
largest item like the memory or disk and the way you do that is with uh
最大的项目，如内存或磁盘，你这样做的方式是
caches okay and of course there's page tables and tlbs which will help
缓存没问题，当然还有页表和TLB会有所帮助
us out in virtual memory and there's storage disk drives etc
我们在虚拟内存和存储磁盘驱动器等
there's all sorts of devices like networks and displays and inputs
有各种各样的设备，比如网络、显示器和输入
and so making all of this tie together is something you started down the path
所以把所有这些联系在一起是你沿着这条路开始的
with 61c hopefully you remember that um and then of course there's
61c，希望你记得，嗯，当然还有
interesting things like buses that tie it all together okay and i you
有趣的事情，比如公共汽车，把一切都联系在一起，好吧，我和你
know 61c doesn't quite get into that level of detail
我知道61c没有进入详细级别
and we're not going to do that too much i might suggest 152
我们不会做太多，我可能会建议152
and 151 some of those interesting classes
151一些有趣的课程
uh if you really want to talk about the maybe 150 if you want to talk about the
呃如果你真的想谈谈也许150如果你想谈谈
buses and so on but then of course there's an
公共汽车等等，但是当然有一个
instruction set architecture which you did talk about
你说过的指令集架构
and that abstracts away a lot of what's going on in the processor so that
这将处理器中发生的许多事情抽象出来，这样
people running programs and compilers that are compiling programs have
运行程序和编译程序的编译器的人有
something common to use okay and so what you learned in
一些常用的东西，好的，所以你学到了什么
61c was machine structures and you also learned c which
61c是机器结构，你还学到了c
you're going to get to exploit a lot so i know the notion that in 61c you
你会得到很多好处，所以我知道在61c你
learn c is maybe a shared with a little bit of
学习c可能是一个与一点点共享的
skepticism by people but um you're going to get to learn it a
人们的怀疑，但嗯，你会学会的
lot more in this class so the os abstracts the hardware details
在这个类中有更多，所以操作系统抽象了硬件细节
from the application so not just the instruction set architecture is going to
所以不仅仅是指令集架构
matter anymore so that abstracts away the computation elements of the
不再重要，因此抽象了计算元素
processor but we're going to learn how to turn a bunch of storage devices
但我们将学习如何将一堆存储设备
like disks and usb keys and um cloud storage and turn it
比如磁盘usb密钥还有云存储
into a single abstraction like say a file system
变成一个单一的抽象，比如文件系统
so that a user can use that easily without having to worry about where the
这样用户就可以轻松使用，而不必担心
bits are stored okay and so that's where we go with this
比特存储得很好，这就是我们要做的
classes we're going to learn not just about the abstractions from
我们要学习的不仅仅是抽象的课程
hardware for 61c but ups and processor but
硬件为61c但UPS和处理器但
abstractions uh for other devices as well
其他设备的抽象
okay so what is an operating system so let's go through some things it does
好吧，那么什么是操作系统，让我们来看看它的一些功能
again let's try to maybe get an idea operationally
再次让我们试着从操作上得到一个想法
so one thing that i've started to talk about here is the fact that the
所以我在这里开始谈论的一件事是
operating system is an illusionist in some sense
操作系统在某种意义上是个魔术师
all right it's going to provide clean easy to use abstractions of physical
好吧，它将提供干净易用的物理抽象
resources and it's going to do so in a way that
资源，它将以某种方式做到这一点
allow you to at least temporarily think that you've got
让你至少暂时认为你有
infinite memory you have a machine entirely dedicated to you or a processor
无限内存你有一台完全专用于你的机器或者一个处理器
that there are higher level objects like files and users and messages even though
有更高级别的对象，如文件、用户和消息，即使
as you probably already know but will know very well by the end of the term
你可能已经知道了，但在学期结束时会很清楚
there aren't files or files are an abstraction of a bunch of individual
没有文件或文件是一堆个人的抽象
blocks on a disk that somehow are put together
磁盘上的块以某种方式组合在一起
with inodes to give you a file so the operating system is busy
用inode给你一个文件，这样操作系统就忙了
providing an illusion of a much more usable machine
提供了一个更实用的机器的幻觉
so that when you program it you have a much easier time of it and you
所以当你对它进行编程时，你会有一个更容易的时间
don't have to worry so much about whether it's on disk or on a usb key or
不用太担心它是在磁盘上还是在USB密钥上
in cloud storage okay and we're going to learn also about
在云存储中，我们还将了解
abstractions of users and messages and we're going to talk about
用户和消息的抽象，我们将讨论
virtualization and how to take the limitations of a system
虚拟化以及如何利用系统的局限性
and hide them in a way that makes it easy to program
并以便于编程的方式隐藏它们
okay so for instance so um virtualizing the machine so here's our 61c machine
好的，例如虚拟化机器，这是我们的61c机器
which has a processor it's got memory it's got i o with maybe storage and
它有一个处理器，它有内存，它有i o，也许还有存储空间
networks um and on top of it we're going to put
网络，嗯，最重要的是我们要把
this operating system thing which we're learning about as we as we
我们正在学习的这个操作系统
speak and that operating system instead of
说话和那个操作系统而不是
giving us a processor with uh
给我们一个处理器
limitations the processor has it's you know it's
处理器的局限性你知道的
got a certain um set of registers it's got
它有一套特定的寄存器
uh certain floating point operations it uh has
呃某些浮点运算它呃有
uh certain um exceptions that are caused and so on
呃某些引起的嗯例外等等
we're going to give an abstraction of something really clean called threads
我们要给一个非常简单的抽象，叫做线程
okay um we're going to have address spaces uh for instance we're
好吧，我们会有地址空间，例如，我们
going to learn about rather than a bunch of memory
去学习而不是一堆记忆
bytes that are in dram and scattered about we're going to
在dram中分散的字节
provide a nice clean address space abstraction that will uh
提供一个干净的地址空间抽象
give us the ability to treat
给予我们治疗的能力
the memory as if it's entirely ours even when there's multiple programs running
即使有多个程序运行，内存也好像完全是我们的
again i just talked about files rather than a bunch of individual blocks we're
再说一次，我只是谈论文件，而不是一堆单独的块
going to have files and rather than networks which are a
将有文件而不是网络
bunch of individual ethernet cards let's say that are
一堆单独的以太网卡，假设是
connected point-to-point between here and beijing
把这里和北京点对点连接起来
we're going to have sockets and routing under the covers okay so that's a pretty
我们会在封面下有插座和路由，好的，所以这是一个漂亮的
clean abstraction which of course ultimately allows me to
纯粹的抽象当然最终让我
teach uh you guys spread all over the globe as
教你们这些遍布全球的人
you are okay on top of this these threads address
你可以在这个上面这些线程地址
spaces files and sockets are going to be the process abstraction
空间文件和套接字将是进程抽象
and that process abstraction is going to give us an execution environment with
这个过程抽象将为我们提供一个执行环境
restricted rights provided by the operating system and
操作系统提供的受限权限和
that process abstraction is going to be a nice virtual machine
这个过程抽象将是一个很好的虚拟机
that your program can run in that's uh abstracted away from all of these
你的程序可以运行，呃，抽象出所有这些
physical details okay and so on top of that you could
身体细节好的，所以除此之外，你可以
have your program so the one thing that you guys get to do
有你们的程序，所以你们要做的一件事
a lot more of than you've done so far in your career is you get to
到目前为止，你在职业生涯中做的比你做的要多得多
actually do uh user-level programs running on top
实际上做呃用户级程序运行在上面
of a unix environment okay and so um you're gonna have
一个unix环境，所以你会有
compiled programs that you have produced that are going to
编译的程序，你已经生产，将
run on top of your process abstraction and in order to give you a clean
在您的流程抽象之上运行，以便为您提供一个干净的
environment into the process abstraction there'll be
环境进入过程抽象会有
system libraries so there's even a system something
系统库，所以甚至有一个系统什么的
the c library the security libraries many of the libraries
c库安全库许多库
abstract even further and give you nice clean abstractions that maybe allow you
进一步抽象，给你干净的抽象，也许可以让你
to do ssl very easily or so on okay
做ssl很容易之类的好吧
there is an interesting question uh in the chat which i'm going to
聊天中有一个有趣的问题，我要去
point out some people are asking about closed captioning
指出有些人在询问隐藏字幕
some classes like last term we even had closed captioning but that's
有些课，比如上学期，我们甚至有隐藏字幕，但那是
when we need it and we actually have a live captioner in that case
当我们需要的时候，我们实际上有一个活生生的俘获者
unfortunately we don't but what i will do uh when i put the um
不幸的是我们没有但是当我把嗯
videos up is uh they will get automatically closed captioned by
视频是呃，他们会自动关闭字幕
uh by youtube when i put them on there and so that'll be something but they
呃，当我把它们放在YouTube上的时候，所以那会是一些东西，但是它们
won't be live sorry about that um so this is our
不会现场抱歉，嗯，所以这是我们的
virtualized machine view and the applications
虚拟化机器视图和应用程序
machine is the process abstraction provided by the os
机器是操作系统提供的过程抽象
and some people might argue including the system libraries
有些人可能会认为包括系统库
and each running program runs in its own process
每个正在运行的程序都在自己的进程中运行
and the process gives you a very nice interface nicer than hardware
这个过程给你一个比硬件更好的界面
now the question here on the on the chat here is
现在的问题是
is the hypervisor or docker demon a part of the process
管理程序或docker恶魔是过程的一部分吗
acting on as the top layer of the vm so uh we will talk a little bit later in
作为vm的顶层，所以我们稍后会讨论
the term about docker docker is a way of wrapping up
关于docker docker的术语是一种总结
uh multiple different little environments and potentially running
多个不同的小环境，可能正在运行
them inside the process abstraction it's not as uh isolated as say a
他们在过程抽象中并不像说
full virtual machine but we'll talk we'll talk more about that in detail
完整的虚拟机，但我们会讨论，我们会详细讨论
let's stick with process abstractions for now
现在让我们坚持使用流程抽象
um the process abstraction is i'll show you in a second you can have multiple
嗯，过程抽象是，我会在一秒钟内告诉你，你可以有多个
processes all running uh at the same time and they're each
所有进程同时运行，它们都是
given isolation from each other so that's what we're going to start with
彼此隔离，这就是我们要开始的
uh for this first lecture um so uh the system uh isa by the way stands
这是第一堂课，所以系统顺便说一句
for instruction set architecture that was a question
对于指令集架构来说，这是一个问题
so uh the system libraries um what does a system programmer think of
那么系统库，系统程序员会怎么想
well the system libraries are linked into your program
系统库链接到你的程序中
which is then run by a compiler and turned into bits that will run in the
然后由编译器运行并转换为将在
process you're going to get very uh good at this
过程中你会变得非常擅长这个
as well as you're going to learn how to compile programs link them with
您还将学习如何编译将它们与
libraries and then execute them in a process
库，然后在进程中执行它们
environment and you'll learn how to invoke the compiler to do that
您将学习如何调用编译器来执行此操作
so um this is the programmer's view so what what's in a process so remember
所以这是程序员的观点，所以过程中有什么，所以记住
the process here is an environment right that
这里的过程是一个环境
gives you threads address spaces file sockets so
给你线程地址空间文件套接字所以
um a process as i said has an address space which is
嗯，正如我所说的，一个进程有一个地址空间，它是
a chunk of protected memory it has one or more threads in it
一块受保护的内存，其中有一个或多个线程
uh one or more threads of control executing in that address space
在该地址空间中执行的一个或多个控制线程
and uh the system state associated with open files and sockets and so on
与打开的文件和套接字等相关的系统状态
and so this is a completely isolated environment we're going to dive into
所以这是一个完全孤立的环境，我们要潜入其中
processes very quickly in this class and you're going to learn how we can
在这门课上，过程非常快，你将学习我们如何
have a protected address space and multiple threads running in an
有一个受保护的地址空间和多个线程运行在
environment that's protected from other processes
免受其他进程影响的环境
even though for instance maybe there's only one
尽管举例来说可能只有一个
core running we're going to give the illusion that there's multiple cores
核心运行我们会给人一种有多个核心的错觉
running with multiple processes at the same time so um you've all done this
同时运行多个进程，所以你们都做过这个
you know here's an example on on say a mac uh
你知道这里有一个例子在说mac uh
where you look at the process monitor or the task manager or you do a psa ux
你看进程监视器或任务管理器，或者你做一个psa用户体验
on linux box and what you see here which is uh
在linux box上，你在这里看到的是呃
perhaps surprising if you haven't really thought about it
如果你没有认真想过也许会很惊讶
is that um there are many processes running all the
有很多进程运行所有的
time on your typical laptops okay so many things going simultaneously
典型的笔记本电脑上的时间可以让很多事情同时进行
50 or 100 of them mostly they're sleeping but they're
其中50或100人大多在睡觉，但他们
there to wake up and do some execution at some point okay
在那里醒来，在某个时候执行一些死刑
now the question of why are the middle layers of abstraction necessary
现在的问题是为什么中间的抽象层是必要的
so part of the reason that we have many layers of abstraction
所以我们有很多抽象层的部分原因
is that if you try to squash all the layers down
如果你想把所有的层都压扁
which is sometimes done in very specialized environments
有时是在非常特殊的环境中进行的
you end up with an undebugable mess okay and so multiple abstractions
你最终会得到一个不可忽视的混乱，好吧，所以多重抽象
assuming they don't make things too slow are a crucial aspect to making things
假设他们不会让事情变得太慢是制造事情的一个关键方面
actually work properly okay and so you'll see even modern uh
实际上工作正常，所以你会看到甚至现代的呃
operating systems still have several abstraction layers
操作系统仍然有几个抽象层
okay and you'll you'll appreciate them i think as we go forward
好吧，你会你会感激他们的，我想随着我们的前进
um because it's much easier to actually have
嗯，因为它更容易真正拥有
an operating system that has a device driver talking to the disk and then you
一个操作系统，它有一个设备驱动程序与磁盘对话，然后你
have a file system that provides files and then you have a process abstraction
有一个提供文件的文件系统，然后你有一个流程抽象
which protects those files and exports them to
保护这些文件并将它们导出到
programming and yes somebody brought up the imagine
编程，是的，有人提出了想象
programming in ones and zeros i can say that i've done that and it's
用1和0编程我可以说我已经做到了
not pleasant but anyway moving moving on here so
不愉快，但不管怎样，继续前进，所以
here's the operating systems view of the world when there are multiple processes
这是当有多个进程时操作系统对世界的看法
so each process gets its own set of threads and address spaces
所以每个进程都有自己的线程和地址空间
and files and sockets okay and they might run
文件和套接字都没问题，它们可能会运行
a program with its own linked libraries okay but what's interesting about this
一个有自己链接库的程序，好吧，但是有趣的是
point of view is these processes are actually
观点是这些过程实际上是
protected from each other okay so the operating system translates from the
相互保护好的，所以操作系统从
hardware interface down below to the application interface
下面的硬件接口到应用程序接口
and each program gets its own process which is a protected
每个程序都有自己的受保护进程
uh environment all right and so in addition to illusionist
除了魔术师之外，环境也很好
we're going to talk about another thing that operating systems do which is
我们将讨论操作系统做的另一件事
referee which is manage the protection isolation and sharing of resources and
管理保护隔离和资源共享的裁判
this is going to become particularly important when we talk
当我们谈话时，这将变得特别重要
about global scale systems you can imagine we talk about storage
关于全球规模的系统，你可以想象我们谈论存储
that spans the globe with many uh individual operating systems running
遍布全球，运行着许多独立的操作系统
at the same time each of which could be corrupted in one way or another
与此同时，每一个都可能以这样或那样的方式被破坏
you kind of get to the interesting question of well how do you protect
你会遇到一个有趣的问题，你如何保护
anything and this is where the referee point comes into play
任何事情，这就是裁判点发挥作用的地方
and so here i'm going to show you we're going to now be more consistent with our
所以在这里，我要向你展示我们现在将更符合我们的
coloring for what's going forward but here we
为未来着色，但在这里我们
have compile program number one and number two each of them
分别编译了一号和二号程序
are linked with system libraries you're going to learn about the c library
与系统库相关联，您将了解c库
uh very shortly like i said and they are running independent of each
就像我说的很快，他们独立运行
other and however in this simple example there's only one
然而在这个简单的例子中只有一个
processor okay so that one processor and one core
处理器好的，所以一个处理器和一个内核
by the way for before somebody asked where say one
顺便说一句，在有人问在哪里之前
processor one core um and how can these two things appear
处理器一个核心嗯这两个东西怎么会出现
to be running at the same time well we start out with one of them running so
同时运行，我们从其中一个开始运行，所以
the brown one's running it's got it's using the processor registers it's got a
棕色的在运行它有它在使用处理器寄存器它有一个
process descriptor and thread descriptor and memory you'll learn about those as
进程描述符和线程描述符和内存，您将了解它们
well and it's busy getting cpu time okay
好吧，它正忙着获取cpu时间，好吧
the green process is not running but it is protected
绿色进程未运行，但受到保护
okay and so now how do we get the illusion that there's more than one
好吧，那么现在我们如何获得不止一个的错觉
processor or that each process has its own processor well
处理器或每个进程都有自己的处理器
we uh each process has its own process descriptor
我们呃每个进程都有自己的进程描述符
in memory and then the operating system has to have some protected memory as
在内存中，然后操作系统必须有一些受保护的内存，因为
well and what we're going to do periodically
我们要定期做的是
is we're going to switch from brown to green and vice versa okay so here's the
我们将从棕色切换到绿色，反之亦然，这是
example of going from brown to green so the brown
从棕色到绿色的例子，所以棕色
device has this process descriptor here the green one has the other
设备有这个进程描述符，绿色的有另一个
the green one and what we do is we go through a process switch
绿色的那个，我们要做的是通过一个过程开关
where the registers are stored uh through the os
寄存器通过操作系统存储在哪里
into their own process descriptor block and then the green ones are reloaded
进入他们自己的进程描述符块，然后重新加载绿色的
and what happens is voila the registers are now pointing at the green memory
结果是寄存器现在指向绿色内存
and the green one picks up from exactly where it left off
绿色的从它停下来的地方开始
okay and then a little bit later our timer is going to go off and we're going
好吧，过一会儿我们的计时器会响，我们要走了
to switch back the other way and if we do this frequently enough you get the
切换回另一种方式，如果我们这样做的频率足够高，你就会得到
illusion that multiple processes are running at
多个进程正在运行的错觉
the same time and uh we're going to talk about this how this works in detail so
与此同时，我们将详细讨论这是如何工作的，所以
um i can uh very confidently say that in a few weeks you will have a very good
嗯我可以呃非常自信地说几周后你会有一个非常好的
idea of how this works so but at the high level it's very
知道这是如何工作的，但在高层，它非常
simple we're just switching the processor back and forth between
很简单，我们只是来回切换处理器
brown and green and as a result we get the illusion that they're both running
棕色和绿色，结果我们得到了它们都在奔跑的错觉
and notice that what do i mean by uh the illusion well the process one can
注意到我所说的幻觉是什么意思，一个人可以
pretend like it's got 100 of the processor and process two can pretend
假装它有100个处理器，进程二可以假装
it's got 100 of the processor and things just work out
它有100个处理器，事情就这样解决了
okay and that's up to the operating system
这取决于操作系统
now the question that's interesting here and does a program become a process when
现在这里有趣的问题是，当一个程序成为一个过程时
loaded into memory a program becomes a process that's a
加载到内存中的程序变成了一个进程
very good question for uh next week but when a program becomes
非常好的问题，下周，但是当一个程序变成
a process when the binary has been loaded into
当二进制文件被加载到
memory and into the proper os structures so it
内存和适当的操作系统结构，所以它
has to have a a process structure allocated for it
必须为它分配一个进程结构
and it has to be put into the scheduler queue and so on once that's happened
一旦发生这种情况，它必须被放入调度程序队列等等
now that process is an instantiation of a running program
现在这个过程是正在运行的程序的实例化
so going a little further to that question that was there
所以再进一步讨论刚才的问题
both brown and green could actually be the same program
棕色和绿色可能是同一个程序
running in different instances with different state so we could have
以不同的状态运行在不同的实例中，这样我们就可以
uh we could have one program two processes each of them doing something
我们可以有一个程序，两个进程，每个进程做一些事情
different and this is uh typically what would
不同的是，这是典型的
happen if you were logged into a shared machine and you were both say
如果你登录到一台共享机器，并且你们都说
editing with emacs or vi uh each of you would have your own state
用emacs或vi编辑，你们每个人都有自己的状态
okay so um and then the interesting thing about shared data we'll get to
好的，那么嗯，关于共享数据的有趣的事情我们将开始
um in a little bit uh next week probably but uh
嗯在一点点呃可能下周但是呃
yes so you guys are way ahead of me so that's good so now the question about
是的，所以你们远远领先于我，这很好，所以现在的问题是
i will say one uh answer this question here about what does it mean when
我会说一个，呃，回答这个问题，当
a process is some percent of the cpu that literally means what it says
进程是cpu的百分之几，字面意思是它所说的
if process 1 has 90 of the cpu and process two has
如果进程1有90的cpu而进程2有
ten it means that uh if you were to look from uh ten thousand feet
这意味着如果你从一万英尺的高度看
you would look down and you see that process one gets the cpu ninety percent
你会往下看，你会看到一个进程获得了90%的cpu
of the time and process two gets a ten percent of the time
过程二得到百分之十的时间
okay and mostly what you're going to see is that
好的，你将看到的主要是
there might be one thing that's getting most of the cpu and the rest of them
可能有一种东西能让大部分CPU和其他CPU
are getting very little of it and that's because they're mostly sleeping or
得到的很少，那是因为他们大部分时间都在睡觉或者
waiting on io typically but if you look carefully and
在等待典型的IO，但如果你仔细看
you uh you add everything up you'll actually
你呃你把所有的东西加起来你实际上
get a hundred percent okay but that oftentimes if uh
百分之百没问题，但通常如果呃
something's mostly idle most of that time comes up as the uh the
有些东西大部分时间都是闲置的
idle process which we'll talk more about too
闲置过程，我们也会详细讨论
okay so let's talk briefly about protection
好的我们来简单谈谈保护措施
so um here we have brown and green um but i said they were protected from each
这里有棕色和绿色的，但我说它们都受到保护
other so what happens if process two reaches
那么如果过程二达到
up and shows uh tries to access brown's
显示呃试图进入Brown's
memory or tries to access the operating system
内存或尝试访问操作系统
or tries to access storage which is owned by some other user
或试图访问其他用户拥有的存储
what happens is protection kicks in the operating system and voila
操作系统就会启动保护程序
we uh we basically give that process the boot
我们呃我们基本上放弃了这个过程
and typically cause a segmentation uh fault dump core
通常会导致分段故障转储核心
and uh the green process is stopped now uh the question about more than a
绿色进程现在停止了，问题不仅仅是
hundred percent uh is an interesting one it really
百分之百是一个有趣的问题，真的
depends on how the statistics are reported
取决于统计数据是如何报告的
uh if you have multiple cores you have say four cores
如果你有多个核心，你有四个核心
uh in one view of the world you could have up to four hundred percent
从世界的一个角度来看，你可以有高达400%的比例
execution um in another you could say uh only if
在另一个世界里，你可以说，只有当
you use all four cores you get 100 so you have to be very careful about
你使用所有四个核心，得到100个，所以你必须非常小心
what the reporting statistics are because i've seen them both ways
报告统计数据是什么因为我已经看到了它们的两种方式
okay but if you have more than 100 then you definitely have it reporting uh
好吧，但是如果你有超过100个，那么你肯定会报告呃
multiple cores where each core is 100 okay so uh does one cpu equal one core
多个核心，每个核心是100个，那么一个cpu等于一个核心
i'm going to say yes uh for now um and just know that that's not the
我要说是的，嗯，现在，嗯，只要知道那不是
whole story we'll we'll go a little further for now but for now
整个故事我们会走得更远，但现在
today you can certainly think of one cpu equal one core
今天你当然可以认为一个cpu等于一个核心
for this lecture absolutely um one cpu chip often has many cores and so we're
对于这个讲座来说，一个cpu芯片通常有很多内核，所以我们
not gonna go there today but we're gonna go there so um
今天不去那里，但我们要去那里，所以嗯
this protection idea is really the os synthesizes a protection boundary which
这种保护思想实际上是操作系统综合了一个保护边界
protects the processes running on top of the
保护运行在
virtualization from the hardware and prevents those processes from doing
从硬件虚拟化，并防止这些进程做
things that we've deemed not correct that are not part of the protection
我们认为不正确的事情不属于保护范围
okay and the virtual memory uh which we're going to talk about as we go
好的，虚拟内存，我们将在讨论中谈到
is exactly what i just said here so that i didn't talk about this in terms
这正是我刚才所说的，所以我没有用术语来谈论这个
of virtual memory but one of the reasons that
虚拟内存的原因之一
the green process isn't able to reach out and touch the brown memory is that
绿色的过程无法伸手触摸棕色的记忆
virtual memory prevents it um but this uh reaching out to memory
虚拟内存阻止了它呃但是这个呃伸出内存
you're not supposed to have access to is is uh can be shown you know reaching out
你不应该接触到的是，呃，可以显示你知道伸出援手
past the boundaries of what the operating system has mapped for you in
越过操作系统为您映射的边界
virtual memory as well so think of today's lecture as giving
虚拟内存也是如此，所以把今天的讲座想象成
you some of the ideas at the high level which we're going to drill down to
我们将深入探讨一些高层的想法
in a couple of lectures so this protection boundary is again part of the
在几个讲座中，所以这个保护边界再次成为
virtual machine okay abstraction somehow we've got these
虚拟机好吧抽象不知何故我们得到了这些
networks which have little packets with mtus that are 200 bytes and what have
网络有小数据包，mtus是200字节，什么有
you we've got storage which is a bunch of blocks we
我们有一堆街区的储物空间
got you know controllers which do a bunch of
你知道控制器会做一堆
complicated stuff you as a programmer don't want to think
你作为程序员不想去想的复杂的事情
about the net about the individual hardware because if you had
关于网络关于单个硬件，因为如果你有
to do that you'd be uh you know you wouldn't be getting
要做到这一点，你会呃，你知道你不会得到
anything done and so part of what the os does is it
做任何事情，所以操作系统的一部分就是
really puts these protection boundaries in
真的把这些保护界限
gives you a clean virtualization precisely so you can program without
为您提供干净的虚拟化，这样您就可以在没有
thinking about those things and you can program without worrying
思考这些事情，你就可以不用担心编程了
about somebody else trying to hack in as well so that's the idea
也有人想黑进去，这就是我的想法
there's an interesting question on the chat here about whether the java virtual
这里有一个有趣的问题，关于java虚拟的
machine would be an os and yes there are points of view in
机器将是一个操作系统，是的，有观点在
which uh the java virtual machine could be
java虚拟机可能是
considered an os so um let's save that question for
被认为是操作系统，所以让我们把这个问题留到
another day but bring it back if it looks like we're
改天吧，但如果我们看起来像
going that somewhere where that's appropriate
去一个合适的地方
so the os isolates processes from each other it isolates itself from other
所以操作系统将进程与其他进程隔离开来
processes and even though they're all running on
进程，即使它们都在运行
the same hardware um so that's an interesting challenge which
同样的硬件，这是一个有趣的挑战
we're going to tell you how it works okay so
我们会告诉你它是如何工作的
finally the operating system has a bunch of glue
最后操作系统有一堆胶水
that it provides which are common services so you may not have thought it
它提供的是公共服务，所以你可能没有想到
this way but um if you have a good operating system
这样但是嗯如果你有一个好的操作系统
it's going to give you a file system so you're going to get a storage
它会给你一个文件系统，所以你会得到一个存储空间
abstraction or it's going to give you windows
抽象，否则它会给你窗户
and that properly uh take in mice mouse clicks and so on or it's
正确地考虑到鼠标点击等等
going to give you a networking system that can talk
给你一个可以说话的网络系统
from berkeley to beijing and back without worrying about packets
从伯克利到北京再回来不用担心包裹
okay and so these common services are actually
好的，这些公共服务实际上是
typically linked in with libraries and those libraries are things that you
通常与库相关联，这些库是您可以
come to to uh depend on when you're writing a program so really an operating
取决于你什么时候写一个程序，所以真正的操作
system if you were to look at its functionality referee
系统如果你要看看它的功能裁判
illusionist glue all of these things are part of what an operating system
魔术师胶水所有这些东西都是操作系统的一部分
might be considered doing uh what gets interesting when you set up
可能会被认为是做一些有趣的事情
non-mainstream operating systems like uh if i
非主流操作系统比如呃如果我
don't run out of time i'll briefly talk about the martian rover
不赶时间我简单说一下火星车
uh for instance um you might try having stripped down versions not as
呃，例如，嗯，你可以尝试剥离版本，而不是
much uh functionality to try to run on
很多功能可以尝试运行
simpler hardware uh or in a less malicious environment
更简单的硬件或者恶意更小的环境
where there might not be somebody hacking in and so
那里可能没有人入侵，所以
many times people build specialized operating systems
很多时候人们建立专门的操作系统
which perhaps don't have all the protection internally or
可能没有内部保护或者
maybe they don't have all the storage services that they might
也许他们没有所有可能的存储服务
that you might see here etc and that's doesn't make it any less an operating
你可能会在这里看到，但这并不意味着它不是一个手术
system it makes a more directed operating system at a particular task
系统它使一个更直接的操作系统在一个特定的任务
so so finally um the os some of the basics are i o
所以最后，嗯，操作系统的一些基本是我的
and um the uh clearly i've just said kind of that we're providing
嗯，呃，很明显，我刚才说过我们正在提供
the ability for storage and networks to have a nice clean abstraction
存储和网络具有清晰抽象的能力
into the hardware that we can deal with okay and that's the common services
进入我们可以处理的硬件，这是公共服务
um so uh there was a question here about flipping transistors and heat
这里有一个关于翻转晶体管和加热的问题
i tell you what i promise uh as a computer architect to talk about that
我告诉你我保证呃作为一个计算机架构师来谈论这个
in a few lectures for you if that's interesting um
在一些讲座中，如果有趣的话，嗯
uh is there a smallest os well uh there was something that david culler put
呃有最小的操作系统吗呃有一些大卫·卡勒放的东西
together in the early 2000s called tiny os which
在21世纪初被称为小操作系统
is pretty small okay so finally uh the os maybe gives
是很小的，所以最后，操作系统可能会给出
you some look and feel so uh maybe you have display services
你有些外观和感觉所以呃也许你有展示服务
there is an interesting point uh back to what i talked about earlier in
有一个有趣的观点，呃回到我早些时候谈到的
the lecture here is windowing part of the operating system
这里的讲座是窗口操作系统的一部分
is the browser part of the operating system well
浏览器是操作系统的一部分
perhaps depends on what operating system so for instance microsoft windows
也许取决于什么操作系统，例如微软视窗
went through a phase the windows nt initially had was a micro kernel type
经历了一个阶段，windows nt最初是一个微内核类型
operating system and the windowing system was outside of the kernel
操作系统和窗口系统在内核之外
and then they decided they weren't getting enough performance and so they
然后他们认为他们没有得到足够的表现，所以他们
went the opposite direction and put the windowing entirely inside of the kernel
相反的方向，将窗口完全放在内核内部
which is almost like a a reactionary response and so you could have windowing
这几乎是一种反动反应，所以你可以开窗户
both in and out of the kernel and the distinctions there have to do
内核内部和外部的区别
with protection security durability reliability some of
具有保护安全性耐久性可靠性一些
those questions come up and hopefully you'll have enough to
这些问题出现了，希望你有足够的证据
judge where you think it belongs as we get
判断你认为它属于哪里
further into the lecture or further into the class
进一步进入讲座或进一步进入课堂
um and then finally we got to deal with power management and some of these
嗯，最后我们要处理电源管理和一些这些
things which only really show up on portable devices but these are all
只有在便携式设备上才能真正显示的东西，但这些都是
potentially managed by the os so so what's an operating system
可能由操作系统管理，那么什么是操作系统
referee referee illusionist glue many different possibilities
裁判裁判魔术师胶水许多不同的可能性
so why should you take 61c well other than being one of the best classes in
那么，除了成为最好的班级之一，你为什么要把61c考得很好呢
the department if i do say so myself some of you
如果我自己这么说的话，你们中的一些人
uh will likely uh i said cs i said 61c i'm at 162. my
呃可能会呃我说CS我说61c我在162.我的
apologies boy i'm slipping up here tonight but
抱歉，男孩，我今晚在这里滑倒了，但是
some of you are actually going to uh design and build operating systems so
你们中的一些人实际上要设计和构建操作系统，所以
by the way just to be clear i was saying that cs162 is one of the best classes
顺便说一下，我是说cs162是最好的课程之一
but you shouldn't quote me on that i'll get in trouble but some of you may
但是你不应该引用我的话，我会有麻烦的，但是你们中的一些人可能会
actually uh design and build operating systems uh
实际上呃设计和构建操作系统呃
in the future and it'd be very useful for you to understand them
这对你理解它们非常有用
okay uh many of you will create systems that utilize core concepts and operating
好吧，你们中的许多人将创建利用核心概念和操作的系统
systems so this is uh more of you uh it doesn't
系统，所以这是更多的你，呃，它不是
matter whether you build software or hardware
无论你是构建软件还是硬件
or you start a company or a startup the concepts you lose
或者你开了一家公司或创业公司，你失去了这些概念
that you uh basically use in 162 are ones that are going to go across
你基本上在162中使用的是将要穿过的
very easily to many of these different future tasks that you're going
很容易就能完成未来的许多任务
to do and so you're going to learn about scheduling
所以你要学习如何安排
and uh well you could schedule in the hardware if you're
你可以安排硬件，如果你
designing processors you can schedule in the lower levels of the os if you're
设计处理器，你可以安排在较低级别的操作系统，如果你
building a core os you could schedule uh in a big cloud
构建一个核心操作系统，你可以在一个大云中安排
system if you're building cloud apps and so the ideas that we learn here actually
如果你正在构建云应用程序，那么我们在这里学到的想法实际上是
go across to many different places and we'll even talk about some cloud
去许多不同的地方，我们甚至会谈论一些云
scheduling as we get a little later in the term
我们在学期中稍晚的时间安排
um all of you are going to build apps i guarantee it as you go forward
嗯，你们所有人都将构建应用程序，我保证随着你们的前进
okay and you're going to use utilize the operating system and so the more you
好的，你将使用利用操作系统，所以你越
understand about what's going on the more likely you are
你越有可能了解发生了什么
to a not do something that uh was not a smart thing to do
不要做一些呃不明智的事情
hopefully you'll learn about locking you'll learn about concurrency you'll
希望你能学到锁，学到并发
learn enough about the right way to design some of these systems
充分了解设计这些系统的正确方法
that you're going to write amazing bug free software as opposed to
你将编写令人惊叹的无错误软件，而不是
almost amazing very buggy software okay um so who am i so my name is john
几乎惊人的非常错误的软件好吧嗯那么我是谁所以我的名字是约翰
kubatowicz most people call me professor kuby
库巴托维奇大多数人都叫我库比教授
maybe because they can't pronounce my last name
也许是因为他们不会念我的姓
but i have background in hardware design so i did there's a chip i designed for
但是我有硬件设计的背景，所以我做了一个我设计的芯片
my phd work which was one of the first shared memory
我的博士工作是最早的共享记忆之一
multi-processors that also did message passing called alewife
多处理器也做消息传递叫做alefe
i have backgrounds in operating systems i worked for project athena at mit
我有操作系统的背景我在麻省理工学院为雅典娜项目工作
um as an os developer device drivers and network file systems
um作为操作系统开发者设备驱动和网络文件系统
worked on clustered high availability systems
致力于集群高可用性系统
we had a project uh for a while in the par lab called tessellation
我们在实验室有个项目叫做镶嵌
which was a new operating system we were developing for multi-core processors
这是我们为多核处理器开发的新操作系统
i did a lot of work in peer-to-peer systems so the ocean store project this
我在点对点系统上做了很多工作，所以海洋商店项目是这样的
was our logo here of the scuba diving monkey um
是潜水猴的标志
yeah i was addressing the idea of storing data for thousands of years
是的，我正在讨论将数据存储数千年的想法
um and we were pretty much one of the first cloud storage projects before
我们之前几乎是最早的云存储项目之一
anybody talked about the cloud back in the early 2000s
有人在21世纪初谈论过云吗
and so some of the concepts i talk about at the end of the term will come from
所以我在期末谈论的一些概念将来自于
some of those ideas um i also do some quantum computing
其中一些想法嗯我也做一些量子计算
um and uh perhaps you could get me to talk about that at some point
也许你可以让我在某个时候谈谈这个
but it's a little off topic for this class
但这课有点跑题了
and most recently i've been uh working in the internet of things or the
最近我一直在物联网或
swarm specifically i have a project called the
我有一个专门的项目叫做
global data plane which is looking at uh hardened data containers we like
全球数据平面正在查看我们喜欢的呃硬化数据容器
to use the analogy of these shipping containers that
用这些集装箱来类比
everybody sees down at the port of oakland
每个人都在奥克兰港看到
uh where these shipping containers are cryptographically hardened containers of
呃，这些集装箱是加密加固的集装箱
data that can be moved around to the edge
可以移动到边缘的数据
devices and back into the uh back into the cloud and um
设备和回到呃回到云端和嗯
are ideal for edge computing and so we'll talk some about some of these
是边缘计算的理想选择，所以我们将讨论其中的一些
ideas as well and if any of you are interested in um
还有一些想法，如果你们有兴趣
doing research in that that's certainly something you could talk to me about
做这方面的研究你当然可以和我谈谈
all right um and uh i will say that quantum computing is a real
好吧，嗯，嗯，我会说量子计算是一个真正的
thing becoming more real as we go it's got to
随着我们的前进，事情变得越来越真实
be real because google and ibm talk about it all the time now so
要真实，因为谷歌和ibm现在一直在谈论它，所以
um that's a little bit of a joke but uh we have a great
嗯那是个小玩笑但是呃我们有个很棒的
set of tas this term um and uh neil uh kulkarni and akshat gokoli
一套tas这个学期嗯和呃尼尔呃kulkarni和akshat gokoli
are co-head tas and um and we have a set of really good tas
是助教的联合主管我们有一组非常好的助教
and so i'm very excited about our staff and uh
所以我对我们的员工感到非常兴奋
i will tell you a little bit about where we're at in terms of scheduling
我会告诉你一点我们在日程安排方面的进展
sections we haven't um the sections are still tba and i'll say
部分我们没有嗯部分仍然是tba，我会说
a little bit more about why that is in a second
关于为什么这是在一秒钟内
um okay so um let's talk a little bit about
嗯好吧那么嗯我们来谈谈
enrollment uh the class has a limit of 428 i just
招生额呃这个班有428人的限制我只是
raised it and it's not going to go any higher
提高了它，它不会再高了
so um probably won't make the class any larger
所以嗯可能不会让班级变得更大
uh there's one circumstance where that might happen but i think it's unlikely
有一种情况可能会发生，但我认为不太可能
at this point um this is an early so um
在这一点上，嗯，这是一个早期的，所以嗯
i will say something here so uh running a class virtually in the middle of a
我要在这里说点什么，所以呃，实际上在一个
pandemic especially something like cs162 is a serious challenge
特别是像cs162这样的流行病是一个严峻的挑战
and so um what we're doing is you're going to have a
所以嗯，我们要做的是你会有一个
a pretty good i would say an excellent ratio of students to tas this term
这学期学生和助教的比例非常高
and uh and that's to make sure that things all
这是为了确保所有的事情
be um smoothly running okay um and so probably won't make the class
能顺利进行所以可能上不了课
any larger um the other thing to keep in mind is
任何更大的嗯另一件事要记住的是
this is an early drop class okay so september 4th which is a
这是一个早期的辍学课程，所以9月4日是一个
week from friday is the drop deadline and what an
从周五开始的一周是最后期限
early drop class means is it's really hard to drop
提前退学意味着很难退学
afterwards okay so the next two weeks you need to make sure
之后好吧，所以接下来的两周你需要确保
that uh you want to be in the class okay because if you are still in the
你想在班上好吗，因为如果你还在
class and you get past that early drop deadline um you either have
上课，你就可以通过提前交作业的截止日期，嗯，你要么
to burn your one uh special drop late uh
燃烧你的一滴特别的酒
token that you get as a student or there's some appeals process that
你作为学生得到的象征或者有一些上诉程序
doesn't always work so um so the early drop deadline is really
并不总是有效，所以提前交货的截止日期真的是
there to make sure that when you guys start working in groups
是为了确保你们开始团队合作时
it's going to be stable okay we put we instituted that because
它会很稳定，我们把它建立起来是因为
what would happen is people would form their groups
人们会组成自己的团体
and students who weren't entirely serious about
和那些不太认真的学生
the class ended up dropping out on their project partners
这个班最终放弃了他们的项目伙伴
and that got to be a problem so what we need to do in the next two weeks is
这肯定是个问题，所以我们接下来两周要做的是
everybody needs to make sure they want to be in the class
每个人都要确定自己想上这门课
and if you don't you should drop early so that people could get in because we
如果你不这样做，你应该早点下车，这样人们就可以进来，因为我们
currently have a wait list that's uh was 75 or so the
目前的等候名单是75岁左右
last i checked the uh other thing which i'm gonna say
最后我检查了呃我要说的另一件事
more about in a moment but we're very serious about requiring cameras
稍后会有更多信息，但我们非常认真地要求摄像机
okay for discussion sessions for uh design reviews and even for
好的，讨论会，呃，设计评论，甚至
office hours okay and we're going to certainly use them for
办公时间没问题，我们肯定会把它们用于
uh exams so if you don't have a camera yet you need to find one the only place
考试，所以如果你还没有相机，你需要找到一个唯一的地方
in this class where you're not going to want to turn on your camera is lecture
在这门课上，你不想打开相机的地方是讲座
because having we currently have 328 people on the the chat there um and so
因为我们现在有328个人在聊天，所以
that would be bad um i think with the wi-fi uh issues
那就糟了我想是因为Wi-Fi的问题
people are asking about let's just do your best okay zoom tries
人们在问让我们尽你所能好吗变焦尝试
to adjust a little bit and we'll we'll deal
稍微调整一下，我们会处理的
with problems on a on a case-by-case basis but i'm going to
在个案的基础上解决问题，但我会的
tell you more about this in a moment but really having a class like this all
一会儿告诉你更多关于这个的事情，但是真的有这样的课
virtual is very hard unless people interact a
虚拟是非常困难的，除非人们与
little more normally and so that's really requiring people to be
更正常一点，所以这真的需要人们
able to see you okay um if you're on the wait list uh like i
如果你和我一样在等待名单上，我可以看到你
said earlier we kind of maxed out sections in ta support so if people drop
早些时候说过，我们在ta支持方面已经达到最大限度，所以如果人们放弃
uh they're gonna we're gonna automatically move
他们会我们会自动移动
people from the the uh waitlist into the class
候补名单上的人
so here's the thing you should def absolutely not do
所以这是你绝对不应该做的事情
and if you have friends who are uh you know we're just on the class and are
如果你有朋友，你知道我们只是在课堂上
thinking they're not going to take the class
以为他们不会去上课
make sure that they either get themselves off the wait list or they do
确保他们要么把自己从等候名单上除名要么就这么做
all the work in the class because uh as i'm going to mention a
因为我要提到的是
little bit if you're still on the wait list and
如果你还在等待名单上
a spot opens up we will enroll you in the class and you'll be stuck
我们会给你报个班，你会被卡住
of course with an amazing class as we mentioned earlier but
当然，正如我们之前提到的，这门课很棒，但是
if you're not keeping up that could be a problem if you because we have
如果你跟不上，那可能是个问题，如果你因为我们有
occasionally had people discover weeks into the class that they were
偶尔有人在上课几周后发现他们
enrolled and uh you know couldn't get out of it
注册了，呃，你知道无法摆脱它
so don't be one of those people okay um now uh
所以不要成为那些人中的一员
the question about discussion sessions i'll say a little bit more about them in
关于讨论环节的问题，我会在
a moment okay but how do we deal with 162 in the
一会儿可以，但是我们如何处理162在
age of cobit 19 well if you look at this particular uh
19岁的年龄，如果你看这个特别的呃
word play here we've got collaboration in the middle we've got to remember
文字游戏在这里，我们在中间有合作，我们必须记住
people and we've got to figure out how to
我们得想办法
combine all of you together in your groups and produce something
把你们所有人组合在一起，产生一些东西
successful so this is challenging and i i know this is not the term you thought
成功，所以这很有挑战性，我知道这不是你想的术语
you were getting this fall when you uh you know when you thought
你在这个秋天，当你，呃，你知道当你想
about coming to berkeley and i apologize but uh most of you i think experienced
关于来伯克利的事我很抱歉但是我认为你们大多数人都有经验
the end of last semester unfortunately um but
上学期结束很不幸嗯但是
collaboration is going to be key okay so things are considerably
合作将是关键，所以事情相当重要
different i would say this term even than they were last term
我觉得这学期和上学期不一样
because we're starting out fully remotely so you don't even get to see
因为我们从完全远程开始，所以你甚至看不到
anybody in person probably um maybe some of you will get to see each
任何人都有可能，嗯，也许你们中的一些人会看到每一个
other but i would bet that the bulk of you don't
但我敢打赌你们大多数人都不知道
um most important thing is people and then interaction and collaboration
嗯最重要的是人然后是互动和协作
so i put up something here to you all remember
所以我放了些东西给你们大家记住
you know i fondly remember coffee houses this is what they kind of look like you
你知道我很怀念咖啡屋这就是它们看起来像你的样子
know you sit with people and you drink beverages of choice i'm going to say
我要说的是，你和别人坐在一起，喝自己选择的饮料
coffee to get keep from getting in trouble
喝杯咖啡免得惹麻烦
and uh you discuss things okay so this is how groups ought to work
你们可以讨论事情，所以这就是团队应该如何工作
okay and the question is how do we do this uh when people are all remote
好吧，问题是当人们都很遥远的时候，我们该怎么做
and so first of all uh we're gonna have to use
所以首先我们得用
it's gonna work it's gonna require work okay i hate to say this but
这会成功的，这需要努力，好吧，我不想这么说，但是
the way we make this uh turn out well is we've got to work at our interactions
我们要想把这件事办好我们必须在互动中努力
because as you well know if you don't look at
因为你很清楚如果你不看
anybody with cameras on or whatever and you just
任何有摄像头的人，你只是
exchange email that can go south very quickly
交换可以很快南下的电子邮件
even when you didn't intend to imply something and everybody gets their
即使你不想暗示什么，每个人都得到了他们的
feelings hurt things are just not working out well
感情伤害的事情只是不顺利
so we've got to figure out how to bring everybody along with us so we don't
所以我们得想办法让所有人都跟着我们
uh lose anybody and if you notice here by the way these people are holding
呃失去任何人，如果你注意到这些人拿着的方式
hands that's virtual so we're not suggesting that you
手是虚拟的，所以我们不建议你
um don't socially distance when you're bringing people along
你带别人来的时候不要疏远别人
but the camera is a part of this okay so this is
但是摄像机是其中的一部分，所以这是
call this an experiment um but cameras are going to be an essential component
称之为实验，但摄像机将是必不可少的组成部分
um you got to have a camera and plan to turn it on and if you have issues with
嗯，你必须有一台相机，并计划打开它，如果你有问题
spectrum let's see if figure out ways of maybe lowering the
频谱让我们看看是否有办法降低
bandwidth a little bit but um you certainly need it for exams
带宽有点大不过考试用得着
okay so if you don't have a camera you got to make sure you got enough
好吧，如果你没有相机，你必须确保你有足够的相机
spectrum and a camera for the exams um and you're going to need it for
光谱和考试用的相机，嗯，你需要它来
discussion sessions design reviews and office hours possibly even
讨论会议设计审查和办公时间甚至可能
that's going to depend on whoever's running the office hours um
这取决于谁来管理办公时间
we uh i'll get to section this week in a moment but yes we do have section this
我们，呃，我一会儿就会谈到这个星期的部分，但是是的我们确实有这个部分
week um but the thing about cameras is it
但是关于相机的问题是
gives the ability to at least approximate what we used to be able to
至少可以近似我们过去的能力
do when we sat physically in person in fact i may even in fact
做当我们坐在身体上的人事实上我甚至可能事实上
not even me we are probably going to give extra credit points for screenshots
连我都不行，我们可能会给截图额外的积分
of you and your group meeting on a regular basis
你和你的小组定期会面的照片
drinking a beverage of choice and talking to each other okay so
喝着自选的饮料互相交谈
this is the kind of thing that needs to be strongly encouraged
这种事需要大力鼓励
um even before we had a pandemic i i had groups that uh
甚至在大流行之前我就有一些小组
somehow despite the fact that they could be never met
尽管他们从未见过面
uh the whole term okay and this was uh got bad and by the end of
整个学期都没问题，这变得很糟糕，到年底
the term the group uh all of the members were
这个团体的所有成员都是
upset with each other they um
对彼此心烦意乱他们嗯
you know the project failed and they all got bad grades and this was just a bad
你知道这个项目失败了，他们都得了不好的分数，这只是一个糟糕的
scenario and it didn't have to happen that way because
事情不一定要这样发生，因为
they should have been meeting they should have been looking at each other
他们本应该见面的他们本应该面面相觑的
while they were talking and it didn't happen so this is
当他们说话的时候，事情没有发生，所以这是
our experiment okay and so cameras are a tool uh not of the man
我们的实验好吧，所以相机是一种工具，呃，不是人的工具
they are a tool of collaboration okay um so we want to bring back personal
它们是一种合作的工具，好吧，嗯，所以我们想带回个人
interaction okay even though we're on either side of
互动正常，即使我们在两边
fences okay humans are really you know even
栅栏好吧人类真的你知道甚至
computer scientists are not good at text only interaction um so
计算机科学家不擅长纯文本交互嗯所以
uh we are going to require attendance we're going to take attendance at
我们会要求出席我们会参加
discussion sessions and design reviews um with the camera turned on okay
讨论会和设计评论嗯打开摄像头没问题
so and hopefully that's clear any other questions on the camera
所以希望摄像机上的其他问题都清楚了
you can uh why don't you type your questions
你可以呃你为什么不把你的问题打出来
and people turn off their mic if they're not asking a question actually
如果人们不提问就关掉麦克风
uh type your questions too all right so infrastructure well it's only
呃，输入你的问题太好了，所以基础设施很好，它只是
infrastructure you can't come see us but um we have
你不能来看我们的基础设施，但是我们有
website uh which you've probably all gone to
你们可能都去过的网站
cs162.eats.berkeley.edu that's going to be your home for a lot
cs162.eats.berkeley.edu那将是你的家
of information related to the course schedule
与课程安排相关的信息
we also have piazza so hopefully you all have logged into piazza already
我们也有广场，所以希望你们都已经登录了广场
assume that piazza is the primary place where you're going to get your
假设广场是你得到你的
information i'm also going to be posting the slides
信息我也会发布幻灯片
early as have been asked several times on the website on the cl the class
早在cl的网站上被问过几次课
schedule and when the videos are ready they'll be
当视频准备好的时候，他们会
posted on the class schedule as well so you'll be able to uh get everything
也贴在课程表上，这样你就可以得到所有的东西
related to the schedule on the website and then piazza is kind of everything
与网站上的时间表有关，然后广场就是一切
else okay the textbook is this
其他好吧教科书是这样的
principles and practices of operating systems
操作系统的原则和实践
it's a very good book the suggested readings are actually in the schedule
这是一本非常好的书，建议的读物实际上在日程表上
and so you try to keep up with the material you can get a red version
所以你试着跟上材料，你可以得到一个红色的版本
on text of what i talk about and i think those two together
在我谈论的文本上，我认为这两个人在一起
help a lot there are also some optional things you could look at
帮助很大也有一些可选的东西你可以看看
so there's uh i know david culler really liked this operating system three easy
我知道David Culler很喜欢这个简单的操作系统
pieces book the linux kernel development book some
下载linux内核开发手册
of these are interesting maybe to look at as a as a
其中一些很有趣，也许可以看作是
supplement one thing that you may not have known is if you log in with your
补充一点，你可能不知道的是，如果你用你的
berkeley credentials uh to the network which i think you need
Berkeley的资格证我想你需要的
to use a virtual vpn to do that but you can actually
使用虚拟VPN来做到这一点，但实际上您可以
get access to all of the o'reilly animal books
拿到所有O'Reilly的动物书籍
over the network as well that's something that berkeley's negotiated
通过网络也是Berkeley协商的
with the digital library which is pretty cool
有个数字图书馆挺酷的
and then there's online stuff okay so if you look at the course website we've got
还有网上的东西，如果你看看我们的课程网站
appendices of books we've got sample problems
书的附录我们有样本问题
um we've got things in networking databases
我们在网络数据库里找到了一些东西
software engineering security all that stuff's up there old exams
软件工程安全所有的东西都在上面旧的考试
so the first textbook is definitely uh considered a required book you should
所以第一本教科书绝对是呃被认为是必读的书你应该
try to get a copy even if it's only an e-book
即使只是一本电子书也尽量弄一本
there's also some research papers that are on the resources page
资料页上还有一些研究论文
that i've put up there and we'll actually be talking about some research
我已经放在那里了，我们实际上会讨论一些研究
as we get later in the term so use that as a as a good resource
正如我们在后面的术语中所说的，所以把它作为一个好的资源
so the syllabus uh well we're going to start talking about how to navigate as a
所以教学大纲，嗯，我们将开始讨论如何作为一个
system programmer we're going to talk about processes io networks virtual
系统程序员，我们将讨论虚拟IO网络的过程
machines concurrency is going to be a big part of
机器并发将成为
the early parts of this class so how do the threads work how does scheduling
这个类的早期部分，那么线程是如何工作的，调度是如何进行的
locks deadlock scalability fairness how's that all work
死锁可扩展性公平性如何工作
we'll talk about where address spaces come from and how to make it work
我们将讨论地址空间的来源以及如何使其工作
so we'll talk about virtual memory and how to take the mechanisms
所以我们将讨论虚拟内存以及如何利用这些机制
and synthesize them into interesting security policies
并将其综合成有趣的安全策略
so virtual memory address translation protection sharing
so虚拟内存地址转换保护共享
we'll talk about how file systems work so uh we talk about device drivers and
我们将讨论文件系统是如何工作的，所以我们将讨论设备驱动程序和
file objects and storage and uh block stores and naming and caching and how to
文件对象和存储，呃块存储，命名和缓存，以及如何
get performance and all of those interesting things about
得到表演和所有这些有趣的事情
file systems which you probably haven't thought about
你可能没想过的文件系统
and in the last uh sort of couple weeks of the class we'll even talk about how
在课程的最后几周，我们甚至会讨论如何
to get the file system abstraction to uh span the globe uh in the cloud
让文件系统抽象在云中跨越全球
storage system so that'll be interesting we'll talk like i
存储系统，所以这会很有趣，我们会像我一样说话
said about distributed systems protocols rpc nfs dhts uh we'll talk about
说到分布式系统协议rpc nfs dhts，我们会讨论的
cord we'll talk about tapestry and some of those other things
科德，我们来谈谈挂毯和其他一些东西
um and we'll also talk about reliability and security to some pretty
我们还会讨论可靠性和安全性
big extent there's a question in the chat about cloud
在很大程度上，聊天中有一个关于云的问题
uh systems and why they haven't really uh taken over as operating systems and i
系统以及为什么它们没有真正接管操作系统
think maybe they have more than you might think i
也许他们比你想象的要多
think the the cloud has really become part of our
认为云已经真正成为我们的一部分
day-to-day lives and things that people call
日常生活和人们称之为
the cloud operating system maybe where they put capital t
云操作系统可能是他们投入资金的地方
c o s or something may not have taken over but a lot of other mechanisms
电脑什么的可能没有接管，但有很多其他机制
have been synthesized together in a way that
以某种方式合成在一起
you haven't thought about so hopefully by the end of the term
你还没想过希望到学期末
we'll actually uh you'll have enough knowledge to evaluate that question for
我们实际上会呃你会有足够的知识来评估这个问题
yourself as to you know what is up with the cloud and
你自己知道云是怎么回事
is it really a monolithic thing or is it a
它真的是一个铁板一块的东西还是一个
bunch of mechanisms and where is that at okay so we learn by doing in this class
一大堆机制，在哪里好，所以我们在这节课上边做边学
so there's uh a set of homeworks and each of them is
所以有一组作业，每一个都是
kind of one or two weeks long there's one that you've got to get going
大概一两个星期吧，有一个你得开始了
right away which is um you need to get going on homework
你得马上去做作业了
zero so this is one of the things that we do
零，所以这是我们做的事情之一
in the very first week it's already been released i believe and you should get
在第一周，我相信它已经发布了，你应该得到
moving on it and it's basically learning how to use
继续前进，它基本上在学习如何使用
the systems and there's also a project zero which is
还有一个零点计划
done individually and you should get working on there too
单独完成，你也应该在那里工作
so this class is as much about knowledge as it is about
所以这门课既是关于知识的，也是关于知识的
um uh actually doing things i should say that the other way it's as much about
嗯，实际上我应该说的事情是另一种方式
doing things it is about knowledge so you're gonna do build real systems okay
做事是关于知识的，所以你要建立真正的系统
and um and you're going to learn some important tools as you do that and
你会学到一些重要的工具
they're either going to be done individually or they're going to be done
它们要么单独完成，要么被完成
in groups okay um there was a question about kafka
在小组里，好吧，嗯，有一个关于kafka的问题
and cassandra probably we'll get some
还有Cassandra我们可能会得到一些
concepts from them a little bit later okay
他们的概念晚一点好吗
so a big thing to learn about from this slide is get going on
所以从这张幻灯片中学到的一件大事就是继续前进
uh homework zero and and uh project zero will probably get
呃作业零和呃项目零可能会得到
posted soon and both of those are things to do on your own without your group
很快发布，这两个都是你自己做的事情，没有你的团队
so group projects have four members never five
所以小组项目有四个成员而不是五个
or never three okay it's four three is a very serious justification
或者永远不要三好吧，四个三是一个非常严肃的理由
requirement um you must work in groups in the real
要求嗯你必须在现实中分组工作
world and so you learn how to do it here um and all of your group members have to
所以你在这里学习如何做，嗯，你所有的小组成员都必须
be in the same section uh with the same ta okay
在同一个区域，呃，和同一个ta，好吧
and so that's why the sections that you attend
这就是为什么你参加的部分
and you are going to attend sections in the next couple of weeks uh
接下来的几周你要参加一些课程
are just any section you want um because we have don't have your groups yet and
只是你想要的任何部分，嗯，因为我们还没有你的小组
once we have your groups then we will uh assign you to sections
一旦你的小组成立我们就会把你分配到各个部门
and go from there and you should attend the
从那里开始，你应该参加
same section and that's when the requirements for
同样的部分，当要求
attending section will kick in and we do have a
主治部分将会开始，我们确实有一个
survey out on time zones and so on to try to get an idea where the best place
调查时区等试图得到一个想法在哪里最好的地方
to put some of these sections are so communication and comp cooperation
把这些部分是这样的沟通和竞争合作
are going to be essential uh regular meetings with camera turned
将是必不可少的，呃，镜头转向的定期会议
on is going to be important you're going to do design docs uh
你要做的设计文档很重要
and be in design meetings with your ta and i will tell you
和你的助教一起参加设计会议我会告诉你的
yes you can use slack and messenger or whatever your favorite communication is
是的，你可以使用松弛和信使或任何你最喜欢的通信
but if that's the only thing you do it's not going to be great okay you got
但是如果这是你唯一做的事情，那就不太好了，好吗
to have your camera you got to get together
要得到你的相机，你必须聚在一起
and see each other the group your groups are actually going to have
互相看看你们的团队实际上会有什么样的团队
to be formed by i think the
由我认为
third week of classes it's in the schedule take a look
第三周的课程已经排在日程表上了看看吧
but when we get into groups i'm going to actually have
但是当我们进入小组时，我实际上会有
a lecture half lecture where i talk a bit about
一个半讲座，我讲了一点
mechanisms for groups as well okay and uh sort of ways that you can cope
团体的机制也很好，还有一些你可以应对的方式
with the typical problems that groups have and sort of what are some good
有一些典型的群体问题和一些好的方面
uh good tools there to give you a little idea but um
呃很好的工具给你一些想法，但是嗯
short answer is you've got to decide groups very shortly
简而言之，你必须很快决定团体
and we do that typically after the early drop date because at that point in
我们通常在早期投放日期之后这样做，因为在那个时候
theory people are stably going to be in the
理论上人们会稳定地
class and we're going to have some mechanisms to help you form groups
我们会有一些机制来帮助你们组建小组
there's going to be a piazza uh looking for a group
会有一个广场呃寻找一个团体
kind of uh thread we we may even have um some zoom uh
那种呃线程我们我们甚至可能有嗯一些缩放呃
um room set up for people to sort of you know i don't know interview your
嗯，房间是为人们设置的，你知道我不知道采访你的
group members or talk to them we have a couple of different things
小组成员或与他们交谈我们有一些不同的事情
we've been thinking of just to try to get your groups together but keep in
我们一直在考虑让你们的小组聚在一起但要坚持下去
mind you want to have four members in your group okay not not five and
记住，你的小组要有四个成员，不是五个
three is um probably only
三是嗯大概只有
under serious justification okay um and you're gonna be communicating
在严肃的理由下，好吧，嗯，你要和
with your ta who's like a supervisor in the real
和你真正的上司在一起
real world so this group thread here is very much
在现实世界中，这个组线程非常
like um what you're going to run into when you finally exit berkeley and
比如当你最终离开伯克利时会遇到什么
confront the real world
面对现实世界
how do you get started well there's going to be a survey out
你是如何开始的？好的，将会有一个调查
okay so the um the the question in the chat about
好吧，那么聊天中的问题是
uh tbd yes so the group uh you uh we're assuming that
呃待定是的所以团队呃你呃我们假设
many of you might not have group members yet and it's also the case that the
你们中的许多人可能还没有小组成员，而且
um final discussion session times haven't been decided
最后的讨论时间还没决定
only for the next couple of weeks until groups are formed
只在接下来的几个星期，直到小组成立
okay um there's going to be a time zone survey or a survey out
好吧，嗯，会有一个时区调查或一个调查
you probably have already seen it i think it was released on piazza
你可能已经看过了我想它是在广场上发布的
but you need to uh fill that out let me know where everybody is
但你得填一下让我知道大家在哪
okay i want to know uh if you're in uh if you're in asia or if you're you're
我想知道你是在亚洲还是
in europe or you're in new york or whatever
在欧洲或者在纽约什么的
okay um get going on homework zero project zero is not quite out yet
好吧嗯开始做作业吧零项目还没完全出来呢
but it will be very soon okay um but uh homework zero kind of
但是很快就会好的嗯但是呃作业零种
gets you going on things like getting your github account
让你去做一些事情，比如得到你的github账户
and uh registration and getting your virtual machine set up and
注册，设置虚拟机
get familiar with the 162 tools and so on and how to submit to the auto grader
熟悉162工具等以及如何提交到自动平地机
so project is so homework zero is up and it's something to get going on right
所以项目就是家庭作业开始了，这是要正确进行的事情
away and we will announce as soon as project zero is up it's gonna be out
一旦零号计划启动我们就会宣布
soon um sections on friday attend any section you want
很快嗯周五的部分参加任何你想参加的部分
uh that we will post the zoom links if they're not already posted
呃，如果缩放链接还没有发布，我们会发布
um very shortly and you'll get your permanent sections after we have our
嗯，很快，你会得到你的永久部分，在我们有我们的
group set up okay so you're going to to prepare for
小组准备好了，所以你要准备
this class you're going to have to very be very comfortable with
这门课你必须非常适应
programming and debugging c you're going to want to learn about
你想学习的编程和调试c
pointers and memory management and gdb and uh much more sophisticated and large
指针、内存管理、gdb和呃更复杂、更大
code base than 61c and so we actually have a review session
代码库超过61c，所以我们实际上有一个审查会议
on thursday um the third of september uh
九月三日的星期四
to learn and review quickly about c and c plus plus concepts
快速学习和复习c和c plus plus概念
and um just uh stay tuned we're going to get that out
嗯，请继续关注，我们会把它弄出来的
and uh consider going just to give you a refresher
考虑去给你复习一下
the resources page has some things to work uh look at there's some ebooks
资源页面有些事情要做，呃，看看有些电子书
on get and see there's a programming reference
去看看有编程参考
that was put together by some tas a couple of terms ago
是几个学期前一些助教组织的
and so first two sections are also about programming and debugging
前两节也是关于编程和调试的
okay all right um the uh tentative breakdown for grading
好吧，好吧，呃，评分的暂定细目
is there are three midterms there's no final the midterms are going
有三次期中考试没有期末考试
to be zoom proctored and camera is going to be required uh just so you know
要缩放监视器和相机将需要呃只是你知道
please figure that as part of the class okay and so um get yourself camera
请把这当成课堂的一部分，好吗，所以给自己拿个相机
um so that's about 36 percent um 36 projects 18 homework 10 participation
嗯，所以大约有36%，嗯，36个项目，18个家庭作业，10个参与
um and uh
嗯和呃
let's see so um yes zoom proctoring projects i've already talked a lot about
让我们看看，嗯，是的，缩放监制项目，我已经谈了很多
homeworks you've heard about a little bit
你听说过一些家庭作业
um as far as the midterms are concerned um we are
嗯就期中考试而言嗯我们是
going to set times after we know more about where people are
在我们知道人们在哪里之后再定时间
okay midterms are um i have we haven't entirely decided but
期中考试还没完全决定但是
they're either gonna be two or three hours long each
每张不是两三个小时
okay so the other thing i want to talk about here is
好吧那么我在这里要谈的另一件事是
personal integrity which is there is an academic honor code
个人诚信这是学术荣誉准则
which is a member of the uc berkeley community i act with honesty integrity
作为加州大学伯克利分校的一员我以诚实正直的态度行事
and respect for others uh you guys can take a look at it i
和尊重他人呃你们可以看看我
strongly suggest you look at it okay this class uh is
强烈建议你好好看看这节课呃是
very heavily uh collaborative between you and your group
你和你的团队之间非常合作
but it should not be across groups okay or across
但它不应该是跨组的好吧或跨
other people on homeworks so things like explaining a concept to somebody in
其他人在做作业，比如向某人解释一个概念
another group is okay discussing algorithms or maybe testing
另一个小组可以讨论算法或者测试
strategies might be okay discussing debugging approaches or
策略可能可以讨论调试方法或
searching online for generic algorithms not
在线搜索通用算法不
force answers these are all okay okay these are not things where you're
强行回答这些都没关系，好吧，这些不是你想要的东西
getting specific answers to your labs and homeworks sharing code or test
获取实验室和作业共享代码或测试的具体答案
cases with another group not okay copying or reading another
另一组不允许复制或阅读另一组
group's code not okay copying or reading online code
组的代码不能复制或阅读在线代码
or test cases from previous years not okay
或者前几年的测试用例都不行
helping somebody in another group to debug their code not okay
帮助另一个小组的人调试他们的代码是不好的
so sitting down for a long session of debugging to help somebody
所以坐下来进行长时间的调试来帮助某人
um without you know maybe thinking you're not copying code in i'll tell you
嗯，没有你知道，也许认为你没有复制代码，我会告诉你
a long debug session has a tendency to to cause the code to become looking like
长的调试会话有导致代码看起来像
your own code so that's not okay okay and we actually compare project
你自己的代码，所以这不好，好吧，我们实际上比较项目
submissions and we catch things like this okay we actually caught a case
提交材料，我们抓住这样的东西，好吧，我们实际上抓住了一个案子
um once where somebody sat down and debugged
有一次有人坐下来调试
with another group and helped him out and didn't do any direct copying or at
和另一个小组一起帮助他，没有做任何直接的复制或
least they claimed not but when it was done the code looked so
至少他们声称没有，但当它完成时，代码看起来是这样的
close that the automatic tools caught it so don't do that
关闭自动工具抓住了它，所以不要这样做
and the other thing not to do is don't put a friend in a bad position by
另一件不要做的事是不要让朋友处于不利的境地
demanding that they give you their answers for homework okay we had
要求他们给你家庭作业的答案
several cases uh we've had several cases like that
好几个案子我们有过好几个这样的案子
recently where one person was having trouble with old work and they
最近，一个人在旧工作上遇到了麻烦，他们
they kind of guilted a partner or a friend
他们让搭档或朋友感到内疚
into giving them an answer and that gets both of them in trouble so don't
给他们一个答案，这让他们两个都有麻烦，所以不要
just don't do that okay do your own work and
别这样做好吗做你自己的工作
by the way to help this we're trying for the first time during the term to
顺便说一句，为了帮助解决这个问题，我们在学期内第一次尝试
to not have um a curve in this class we're going to
在这节课上，我们将不会有曲线
actually do an uncurved version of this we haven't put up the thresholds yet
实际上做一个非弯曲的版本，我们还没有设置阈值
but we'll see how that works but um please just don't put your friends in
但我们会看看效果如何，但请不要让你的朋友进来
bad positions by by making them give you code because they
让他们给你代码，因为他们
get in trouble as well and it's just not worth it
也会惹上麻烦，这不值得
and you don't learn what you could learn by actually doing the work okay it's
你不能通过实际工作学到你能学到的东西，好吧
kind of what's the point of being in the class in the first place
一开始上课的意义是什么
so all right um the goal of the lecture is interaction and so
所以好吧，嗯，讲座的目标是互动，所以
lots of questions all right we already had a bunch of questions today that's
很多问题我们今天已经有很多问题了
great um i'm hoping that uh this continues
很好嗯我希望呃这能继续下去
okay um you know sometimes it may end up that
好吧，嗯，你知道有时候可能会这样
we don't quite get through the topics i was hoping but
我们还没有完成我希望的话题，但是
uh we'll uh it's much better to have interesting questions
呃我们会呃有有趣的问题要好得多
um and what i can do in a virtual term like this is i can even have some
嗯，在这样的虚拟术语中，我可以做的是，我甚至可以有一些
supplemental uh extra you know 30 minutes of lecture
额外的30分钟的讲座
i can post or something if we don't quite get through the stuff i thought we
如果我们没有完成我想我们可以发布什么的
would so let's give this a try and see if we can
所以让我们试一试，看看我们能不能
make this virtual term as good or better than it would be
使这个虚拟术语尽可能好或比它更好
under normal circumstances all right and again if you have more questions
在正常情况下，好吧，如果你有更多的问题
about uh logistics you know piazza the class
关于物流，你知道广场的课程
website those are your two best uh places to look for information
网站那是你最好的两个寻找信息的地方
so let's finish up here in the last 10 minutes or so and
所以让我们在最后10分钟左右结束这里
ask a little bit more about what makes operating systems exciting and
多问问是什么让操作系统令人兴奋
challenging okay this is what makes operating
挑战好吧，这就是为什么操作
systems exciting okay the world is a huge distributed system we showed you
系统令人兴奋好吧，我们向你展示的世界是一个巨大的分布式系统
the uh what people were calling the brain
人们所说的大脑
view earlier kind of like that of the network
查看早期有点像网络
but the thing that's interesting about it is all the devices on there from
但有趣的是那里所有的设备
massive clusters at one end that span the globe
巨大的星团在一端横跨全球
um down to little mems devices and iot devices and everything in between
嗯，小到mems设备和iot设备以及介于两者之间的一切
okay this is uh you know modern cars for instance
好吧，这是呃，你知道现代汽车的例子
have hundreds of processors in them refrigerators have processors and
有数百个处理器，冰箱有处理器
web browsers i mean we've got huge cloud services
网络浏览器我是说我们有巨大的云服务
uh we've got cell phones little devices everywhere and all of this together is
呃，我们到处都有手机，小设备，所有这些加在一起就是
one huge system this is exciting i mean why
一个巨大的系统这令人兴奋我是说为什么
why does this work in the first case and what's its potential okay
为什么这在第一种情况下有效，它的潜力是什么？
um so you know this is why i think operating systems are so exciting
嗯，所以你知道这就是为什么我认为操作系统如此令人兴奋
because it's what makes this all work without them there would be chaos and
因为没有他们，一切都会变得混乱
things just wouldn't work so of course you've all heard you
事情就是不行所以你们都听到了
wouldn't be at berkeley if you hadn't many times about moore's law so the
如果你没有多次学习摩尔定律，就不会在伯克利
thing about moore's law which i like and i always want to mention
摩尔定律我很喜欢也一直想提
is over the um moore's law basically says that you know
是超越了摩尔定律基本上说你知道
for instance you get twice the transistors every 1.5 years or so
例如，你每1.5年左右就会得到两倍的晶体管
um for many years although that's starting to disappear on us now
很多年了，虽然现在我们已经不记得了
but what you may not know so that's an uh an exponential curve
但是你可能不知道，所以这是一个指数曲线
or a straight line and a log linear curve what you may not know is gordon
或者一条直线和一条对数线性曲线，你可能不知道戈登
moore was actually asked at a conference once what he thought was
摩尔曾经在一次会议上被问到他认为是什么
going to happen in a log linear graph on the fly at the
将发生在一个对数线性图中
conference he put down a couple of points
他在会议上提出了几点
drew a straight line and say well this is what's going to happen uh far into
画了一条直线，说这就是将要发生的事情
the future now normally that would be uh
现在的未来通常会是呃
ridiculous and laughable except he was bright which was pretty amazing okay
可笑可笑，除了他很聪明，这是相当惊人的
so what what's the thing about moore's law the thing about moore's law is
那么摩尔定律的原理是什么摩尔定律的原理是
it allows you to make zillions of interesting devices because there's so
它可以让你制作无数有趣的设备，因为
many transistors that you can can shove into a little bit of a device
你可以把许多晶体管塞进一个小装置里
of course the downside which happened back in the early 2000s
当然，21世纪初发生的不利因素
was that um putting these transistors uh increasingly on chip kind of ran into
是把这些晶体管越来越多地放在芯片上
problems with capacitance and power such that you weren't able to make an
电容和功率的问题使得你无法
individual processor as fast it used to be that you could uh
单个处理器的速度和以前一样快
you know wait a few years and get twice the performance of a machine that you're
你知道，等几年，得到两倍于你的机器性能
currently working with somewhere around the 2000s that stopped
目前正在与21世纪初停止的某个地方合作
and suddenly what did you do well suddenly people had
突然间你做得很好，突然间人们
to make multi-core processors and lots of parallelism
制造多核处理器和大量并行性
and so you know from an operating system standpoint
所以从操作系统的角度来看
this is par for the course because uh you know i already showed you a huge
这是意料之中的事，因为你知道我已经给你看了一个巨大的
system with billions and billions of devices
拥有数十亿设备的系统
and so yeah so the fact that chips have multiple cores on them is it's cool
所以芯片上有多个内核的事实很酷
it's uh you know it's enabling of lots of stuff
你知道它能产生很多东西
but it's just kind of that's the way it is and it's interesting about how we get
但事情就是这样，我们如何变得有趣
around that complexity okay so around the 2000s we suddenly had
围绕着这种复杂性，所以在21世纪初，我们突然有了
multi-core the power density thing i think is a
多核的功率密度我认为是一个
funny way to look at this if in 2000 if instead of
有趣的是，如果在2000年，而不是
basically trying to keep making the processors grow as fast in performance
基本上是想让处理器的性能增长得一样快
as they were if you had done that what would happen
如果你那样做了会发生什么
is we would have chips that had the the power density of a
我们的芯片的功率密度
rocket nozzle um and you could imagine putting a
火箭喷嘴，嗯，你可以想象把一个
laptop like that on your lap might be a little uncomfortable
这样的笔记本放在你腿上可能会有点不舒服
so power density capacitance a lot of things is what kind of led people to
所以功率密度电容很多东西是什么样的导致人们
suddenly make multi-core instead of making things faster
突然做出多核而不是让事情变得更快
but they did that okay so by the mid-2000s we had many
但是他们做得很好，所以到2000年代中期，我们有很多
cores on a chip okay and so parallelism's exploited
芯片上的内核很好，所以并行性被利用了
at lots of levels all right and uh somebody pointed out the
在很多层面上，嗯，有人指出
the stock of intel and amd went up hugely
英特尔和AMD的股票大幅上涨
um that's true uh but that was because they were delivering something that
嗯，那是真的，但是那是因为他们在送东西
everybody needed which was lots of processors on a chip all right
每个人都需要芯片上有很多处理器
and the problem of course is as you're well aware moore's law is ending
当然问题是正如你所知Moore定律即将终结
and it's not officially well it's officially over in the original
这不是正式的好，在最初的时候已经正式结束了
growth but people are still shoving a few more transistors on there
增长，但人们仍然在那里塞进更多的晶体管
but unless there's some fundamentally new technology
但除非有全新的技术
um we're basically going to see the end of that growth of more
嗯，我们基本上会看到更多增长的结束
uh you know smaller transistors but it doesn't mean that people aren't still
呃，你知道更小的晶体管，但这并不意味着人们不再
shoving lots of devices together and connecting them with networks it just
把许多设备挤在一起，用网络连接起来
means networks become more important okay and uh by the way vendors are
意味着网络变得更加重要，好吧，顺便说一句，供应商
moving to 3d stacked chips and all sorts of cool ways of
移动到3d堆叠芯片和各种很酷的方式
having a single device have even more transistors on it even if moore's law is
即使摩尔定律是
ending so um i have no doubt that things are
结束了所以我毫不怀疑
going to continue uh quite a ways into the future the
将继续呃相当一段时间到未来
other thing is storage capacity keeps growing
另一件事是存储容量不断增长
okay we've got uh various moore's law-like graphs of storage
我们有各种类似摩尔定律的存储图表
um society keeps getting more and more connected and so we have more devices
社会联系越来越紧密所以我们有了更多的设备
more storage and more devices more storage more people means more
更多的存储和更多的设备更多的存储更多的人意味着更多
need for operating systems which is why you're in the right class
对操作系统的需求，这就是为什么你在正确的班级
now our capacity keeps going up okay people need more connections
现在我们的能力不断提高，人们需要更多的联系
okay and they're they're at the small scale and the large scale
好吧，他们在小规模和大规模
but not only pcs we have lots of little devices
但不仅仅是个人电脑，我们还有很多小设备
we've got lots of internet of things devices you saw this graph earlier i
我们有很多物联网设备，你刚才看到了这个图表
showed you but we've got little temperature sensors and fitbits and
给你看了，但是我们有一些温度传感器和配件
things you carry on your body and things you put in your cars and all
你随身携带的东西，你放在车里的东西等等
the way up to the cloud okay so what's an operating system again
通往云端的路好吧，那么什么是操作系统
it's a referee it's an illusionist it's glue that helps us build these huge
是裁判，是魔术师，是胶水帮助我们建造这些巨大的
interesting systems and that's what you're going to learn about this term
有趣的系统，这就是你这学期要学的
the challenge which i'm going to kind of close with the challenge is complexity
最后我要讲的挑战是复杂性
okay applications consisting of many software modules that run on many
好吧，由许多软件模块组成的应用程序运行在许多
devices implemented on many different hardware
在许多不同硬件上实现的设备
platforms running different applications at the same time failing in
同时运行不同应用程序的平台出现故障
unexpected ways under attack from malicious people leads
在恶意人员的攻击下，意想不到的方式导致
to craziness and complexity right and it's
对疯狂和复杂的权利，这是
not feasible to test software for all possible environments
在所有可能的环境下测试软件是不可行的
and uh combinations of components and so we're going to have to learn how to
和组件的组合，所以我们必须学习如何
build these complex systems in ways that may
构建这些复杂系统的方式可能
basically work and some of that is going to be learning just how to design
基本上是工作，其中一些将学习如何设计
systems that are correct by design rather than correct by accident
设计正确而不是偶然正确的系统
okay the world is parallel if you haven't gotten that by now here's an
好吧，如果你现在还没有明白，世界是平行的
example of from 2017 the intel sky lake 28 cores uh each core has two hyper
例如，从2017年英特尔天湖28个核心，每个核心有两个超级
threads so it's 58 threads per chip and then you put a bunch of these chips
每个芯片有58个线程，然后你放一堆这样的芯片
together and you get a huge parallel system in a
在一起，你会得到一个巨大的并行系统
tiny box and you put a bunch of boxes together and pretty soon you got
小盒子，你把一堆盒子放在一起，很快你就得到了
the world okay uh yes and 28 times two is not 58 very good
世界好吧呃是的还有28乘以2不是58很好
so with that uh not only do we have the chips which are interesting but i
所以有了这个，呃，我们不仅有了有趣的芯片，而且我
want you to realize that um the processors are only part of
希望你意识到处理器只是
the story it's this uh all of the i o is the interesting
故事是这样的，所有的i o都是有趣的
parts and we'll talk about that but it's not just this processor up here it's
零件，我们会讨论的，但不仅仅是这里的处理器
everything connected to it it's the devices it's the networks it's
所有连接到它的东西它的设备它的网络它的
the storage okay so this is um interesting complexity
存储空间很好，所以这是嗯有趣的复杂性
when processing hits the real world and
当处理触及现实世界时
that's where the operating systems get involved
这就是操作系统介入的地方
um i thought i'd put up this graph just to leave you with a few things to think
我想我把这张图挂起来只是为了让你思考一些事情
about so here is millions of lines of code um and if you
这里有几百万行代码，如果你
look at the original linux uh not the original linux but version
看看原来的linux呃不是原来的linux而是版本
2.2 which is quite a you know 15 years ago whatever at least
2.2这至少是15年前的事了
and you look at the mars rover these are on the low end of this scale but now you
你看看火星车，它们在这个尺度的低端，但是现在你
kind of look at uh you know firefox and android and
有点像火狐和安卓
linux31 which is a little bit older now in windows 7
linux31现在在windows 7中有点旧
and then you get up into kind of windows vista and
然后你进入窗户的视野
the facebook system itself and mac os and then you look at mouse base pairs
facebook系统本身和mac os，然后你看看鼠标碱基对
here um that's a genetic thing that's 120 million things
这是遗传的东西1.2亿的东西
you can see that uh our systems are very complicated
你可以看到呃我们的系统非常复杂
okay and so um you can go by the way to this source and get yours
好吧，你可以顺道去这个地方拿你的
you know select the things you want and look at this yourself
你知道选择你想要的东西，自己看看这个
okay this information is beautiful.net visualizations a million lines of code
这些信息beautiful.net一百万行代码的可视化
it's kind of fun to look at okay so uh you know
看着挺有趣的好吧所以呃你知道
the math the mars rover here it is is a very amazing one of you know
火星漫游者的数学非常惊人
there's been a couple of instances of the rover but this particular one
有几个火星车的例子，但是这个特别的
one of the first ones was pretty amazing they were able to to
第一批人中的一个非常神奇，他们能够
send it up and landed on mars and it ran for a decade or more
把它发射到火星上，它运行了十年或更长时间
um it had very limited uh processing it's 20 megahertz processors and 128
它的处理能力非常有限它有20兆赫的处理器和128个
megabytes of dram and so on and had a real-time operating system
兆字节的dram等等，还有一个实时操作系统
but for instance you can't hit the reset button or you can't debug it very easily
但举例来说，你不能按重置按钮，或者你不能很容易地调试它
and however they were able to set it up in a
然而他们能够在一个
situation where they could they figured out
他们可以弄清楚的情况
some timing problems they had and they were able to debug it and repair it
他们遇到了一些时间问题，他们能够调试和修复它
remotely which is pretty amazing and i'll talk more about that as we go
远程监控这很神奇我们会继续讨论
but you need an operating system on something like this because you
但是你需要一个操作系统来处理这样的事情，因为你
perhaps don't want it to run into a ditch while it's busy
也许不想让它在忙的时候掉进沟里
taking scientific data or whatever okay and so very similar kind of to the
获取科学数据或其他好的，所以非常类似于
internet of things in its size so this kind of processing
物联网的规模，所以这种处理
is uh par for the course for really tiny
非常小，这是意料之中的事
devices and so we're going to talk about this kind of
所以我们将讨论这种
device in addition to the really big ones as we go
除了我们走的时候真正大的设备
okay so some questions to end with does a programmer need to write a single
好的，那么最后的一些问题是程序员需要编写一个
program that performs many independent activities and deal
执行许多独立活动和处理的程序
with all the hardware does it have to does every program have
有了所有的硬件，每个程序都必须有
to be altered for every environment does a faulty program crash everything
要为每个环境进行更改，一个有缺陷的程序会导致一切崩溃吗
does every program have access to all hardware
每个程序都可以访问所有硬件吗
hopefully the answer to this is no and we'll learn as the term goes on
希望答案是否定的，我们会随着学期的进行而学习
and operating systems basically help the programmer write robust programs
和操作系统基本上帮助程序员编写健壮的程序
so in conclusion to end today's lecture operating systems are providing a
因此，在结束今天的讲座时，操作系统提供了一个
convenient abstraction to handle diverse hardware
方便的抽象处理不同的硬件
convenience protection reliability all obtained in creating this illusion
便利保护可靠性都是在创造这种幻觉中获得的
for the programmer they coordinate resources protect users from each other
对于程序员来说，他们协调资源以保护用户彼此
and there's a few critical hardware mechanisms like virtual memory uh which
还有一些关键的硬件机制，比如虚拟内存
we briefly brought up which we'll talk about
我们简要地提到了我们将讨论的内容
that help us with that it simplifies application development
这有助于我们简化应用程序开发
with standard services and gives you fault containment full tolerance and
提供标准服务，并为您提供故障遏制完全容错和
fault recovery so cs162 combines things from all of
故障恢复，所以cs162结合了所有
these uh areas and many other areas of
这些呃地区和许多其他地区的
computer science so we'll talk about languages and data structures and
计算机科学，所以我们将讨论语言和数据结构
hardware and algorithms as we go and i'm looking forward to this term i
硬件和算法，我很期待这个学期i
hope you guys uh all are having a good first week of
希望你们第一周过得愉快
class and we will see you on monday all right ciao
同学们周一见再见
