# lec02 rpc and threads

## 为什么要用 Go ？为什么从 C++ 换到 Go ？

GO 提供了一些分布式领域需要的机制。例如对线程的良好支持，线程之间的锁和同步，有一个方便的RPC包。

此前使用的是 C++，但是 C++ 存在很明显的限制。例如没有一个方便易用的 RPC 包。此外 Go 是类型安全以及内存安全的。

使用 Go 很难写出因为某个bug引起某段内存上的问题，从而导致写出的程序会做出一些迷之操作的代码。这就消除了很大一类bug。并且它是一门垃圾回收型语言，不用担心对同一段内存二次释放或内存泄漏等问题，在 Go 垃圾回收器会处理这个问题。这种将多线程和垃圾回收的结合确实特别重要。

在 C++ 这种非垃圾回收型语言中使用线程其中一件很糟糕的事情。在 C++ 中你需要做一大堆的记录，这样才能弄清楚最后一个使用共享对象的线程是否已经结束使用该对象了。因为只有这样你才能释放那个对象，你最终会写一大堆代码，为了弄清楚最后一个线程是否停止使用一个对象时，程序员不得不写了一大堆代码来做引用计数或者其他一些事情。垃圾回收器可以解决这些问题。

最后，那就是 Go 很简单而 C++ 很复杂。在使用 C++ 时经常遇见的一个问题就是你写的代码出现了报错，即使只是个类型错误，你从编译器那里得到的错误信息也会非常复杂。

那么我推荐你们去看下一本名为Effective Go的书（对应的还有Effective Java，Effective C++之类）

## 多线程

在分布式系统中经常会遇到一个程序需要和许多其他计算机进行通信。例如，客户端可能需要与许多服务器进行通信，或者一台服务器在同一时间可能要处理来自许多不同客户端的请求。

假设我的程序要做7件不同的事情，因为它要和7个不同的客户端进行通信。并且，在不编写过于复杂的代码的情况下，我想要使用一种简单的方式来让它做这七件事情。而且，我想要通过一种简单的方式来让它做这七件不同的事情，无须编写过于复杂的代码。我想说的是，使用线程就能做到。

在Go的文档中，这些东西被称为 Goroutine ，这也就是线程

假设你有一个程序，以及一个地址空间

我用一个正方形来表示这是一个地址空间

在这个地址空间中的是一个串行程序，并不是一个多线程程序，在该地址空间我们只有一条用来执行代码的线程

1个程序计数器，一组寄存器，以及一个栈，这些是用来描述程序执行的当前状态

在一个多线程程序中，例如Go程序，你可以有多个线程

5.07-5.11

and you know I got raw it as multiple squiggly lines 

这里我画了好几条波浪线


5.11-5.17

and when each line represents really is a separate if the especially if the threads are executing at the same time

每条波浪线就代表了一条线程，如果多条线程同时执行

如果在同一时间内有多条线程在执行，那每条波浪线就代表了其中的一条执行路径

5.17-5.24

but a separate program counter a separate set of registers  and a separate stack for each of the threads 

但每条执行路径都有它自己的程序计数器，一组寄存器以及一个栈

5.24-5.30  源个码

so that they can have a sort of their own thread of control  and be executing each thread in a different part of the program 

这样它们（知秋注：这些执行路径）就有自己的控制线程，每个线程在程序不同的部分执行

5.30-5.40

and so hidden here is that for every stack now there's a separate thread，there's a stack that it's executing on

So，此处有个隐藏的细节，那就是每一个独立的线程中有一个栈

5.40-5.45

 the stacks are actually  in the one address space of the program

这些栈实际是在程序的一个地址空间中

5.46-5.48

so even though each stack each thread has its own stack

So，尽管每条线程都有它自己的栈

5.48-5.51

technically the they're all in the same address space 

从技术上讲，它们都在同一个地址空间中

5.51-5.55

and different threads could refer to each other stacks  if they knew the right addresses 

如果不同的线程知道彼此的位置，那么它们就可以互相引用对方的栈

5.55-5.57

although you typically don't do that 

尽管你通常不会这么做

5.57-6.02

and then in go, when you even the main program you know when you first start up the program 

接着，在Go中，当你第一次启动程序时

6.02-6.03

and it runs in main 

它会运行main函数

6.03-6.08

that's also it's just a goroutine and can do all the things that goroutine can do 

main函数本身就是一个goroutine，它可以做所有goroutine能做的事情

6.08-6.10

all right 



6.10-6.26

so as I mentioned one of the big reasons is to allow different parts of the program to

sort of be in its own point in a different activity 

我想提的一个重要原因那就是，Go允许程序中的不同部分做它们自己的事情


6.26-6.32

so I usually refer to that as IO concurrency for historical reasons 

由于历史原因，我将它称为并发I/O

6.32-6.39

and the reason I call it IO concurrency is that in the old days where this first came up is that

我称它为并发I/O的原因是因为，过去它提出来的时候就是这样的

我之所以将之称为并发I/O，是因为过去在它第一次提出来的时候就是这样

6.39-6.42

 oh you might have one thread that's waiting to read from the disk 

 假设，你可以有一条正在等待从磁盘中读取数据的线程

你可能会有一条线程，用来等待从磁盘中读取数据

6.42-6.44

and while it's waiting to reach from the disk 

当它在等待的时候

6.44-6.51

you'd like to have a second thread that maybe can compute or read somewhere else in the disk or send a message in the network  and wait for reply

你可能还有第二条线程，以用来计算或者读取硬盘中的其他东西，亦或者用来向网络发送一条信息并等待回复

6.51-6.57

So the I/O concurrencies one of the things that threads by you for us 

 因此，并发I/O也是你通过多线程所能做的其中一件事情

so，并发I/O只是我们通过多线程所能做事情的其中一件而已

6.57-7.06

it would usually mean I can I/O concurrency, we usually mean I can have one program that has launched remoted procedure calls requests to different servers on the network 

这里，我们常说的并发I/O是指，假设有一个已经启动的程序，在同一时间内，它可以通过RPC来对网络上的不同服务器进行请求

7.06-7.09

and is waiting for many replies at the same time 

并且同时等待许多回复

7.09-7.15

that's how it'll come up for us and you know the way you would do that with threads 

我们的做法是通过多线程来做到这点

对我们来讲，这该怎么做，我们可以通过线程来实现

7.15-7.19

is that you would create one thread for each of the remote procedure calls that you wanted to launch

 你可以为你想去启动的每个RPC调用都创建一条线程

即你可以为每一个你想要启动的RPC调用都创建一条线程




7.20-7.28

that thread would have code that you know sent the remote procedure call request message  and sort of waited at this point in the thread 

每个线程都会通过RPC调用来发送request消息，并且此时线程会进入等待



7.28-7.31

and then finally when the reply came back，the thread would continue executing

接着，当回复返回时，线程会继续执行

7.31-7.36

and using threads allows us to have multiple threads that all launch requests into the network at the same time

使用多线程可以允许我们同时进行多个网络请求

7.36-7.41

they all wait or they don't have to do it at the same time 

它们可以同时等待，或者也无须同时都去做一件事情

7.41-7.43

they can you know execute the different parts of this whenever they feel like it

当它们觉得合适的时候，它们也可以执行其他的事情

如果可以，它们也能用来执行其他的事情

7.43-7.45

so that's i/o concurrency  sort of overlapping of the progress of different activities

So，并发I/O的不同活动间会存在重叠部分

so，在同一时间会存在多个活动的并发I/O

7.45-7.56

 and allowing one activity is waiting，other activities can proceed

允许一个活动处于等待状态，其他活动依然可以运行

7.56-8.02

another big reason to use threads is multi-core parallelism

使用多线程的另一个重要原因就是多核并行


8.02-8.06

which I'll just call parallelism 

此处我就将其称为并行性

8.06-8.15

and here the thing where we'd be trying to achieve with threads is if you have a multi-core machine like I'm sure all of you do in your laptops

此处，我们试着想用线程做到的事情是，如果你有一台多核计算机（我想，你们全员的笔记本电脑都有多核处理器）

8.15-8.18

if you have a sort of compute heavy job that needs a lot of CPU cycles

如果你有某种需要用到大量CPU周期的繁重的计算任务要做

如果你有一些计算量很重的任务，需要大量的CPU周期

8.18-8.24

that wouldn't it be nice, if you could have one program that could use CPU cycles on all of the cores of the machine 

如果你有一个程序使用了该计算机全部CPU核心上的CPU周期，那这就可能有点糟糕了

这就有点不妙了，如果你有一个程序，可以使用所在计算机上所有CPU核心上的CPU周期

8.24-8.28

and indeed if you write a multi-threaded go， if you launch multiple go routines  and go 

如果你要写一个多线程的Go程序，如果你启动了多个Goroutine



8.28-8.35

and they do something compute intensive like sit there in a loop and you know compute digits of pi or something 

并且让它们执行某些计算密集型任务，例如在一个循环中计算圆周率或者做一些其他事情



8.35-8.38

then up to the limit of the number of cores in the physical machine

取决于机器中核心数量的限制

8.38-8.41

your threads will run truly in parallel

你的线程会以真正并行的方式运行

8.41-8.44

and if you launch you know two threads instead of one

如果你启动两条线程而不是一条线程时

8.44-8.49

you'll get twice as many you'll be able to use twice as many CPU cycles per second 

那你每秒能使用的CPU周期就是原来的两倍

8.49-8.52

so this is very important to some people

对于某些人来说，这点非常重要

8.52-8.54

 it's not a big deal on this course

但在这门课中，这并不是什么重点

8.56-9.01

it's rare that we'll sort of think specifically about this kind of parallelism

我们很少会去专门考虑这种并行问题

9.01-9.07

 in the real world though of building things like servers to form parts of the distributed systems

在实际生活中，我们会去使用多个服务器来构建分布式系统

9.07-9.14

 it can sometimes be extremely important to be able to have the server be able to run threads and harness the CPU power of a lot of cores

让服务器能够使用多线程，并且充分利用CPU中大量核心所产生的性能，这一点有时非常重要

9.14-9.17

 just because the load from clients can often be pretty high 

因为来自于客户端所带来的负载通常都会非常的高

9.17-9.18

okay 



9.18-9.26

so parallelism is a second reason why threads are quite a bit interested in distributed systems 

So，并行性是我们为什么在分布式系统中关注多线程的第二个原因

so，由于并行性这第二个原因，这也是我们为什么会在分布式系统中对多线程这么关注



9.26-9.31

and a third reason which is maybe a little bit less important is

第三个原因，虽然可能并不是那么重要

9.31-9.37

 there's some there's times when you really just want to be able to do something in the background 

当你想在后台能做一些事情的时候

9.37-9.41

or you know there's just something you need to do periodically

或者你需要周期性做某些事情时

9.41-9.51

and you don't want to have to sort of in the main part of your program sort of insert checks to say: well should I be doing this things that should happen every second 

并且你们又不想在程序中的main部分插入检查代码，然后在运行时每秒都去检查是不是该去做某些事情

9.51-9.55

or so you just like to be able to fire something up that every second does whatever the periodic thing is

或者说，无论这个周期性任务是什么，每秒中你都能够启动它

或者说，无论这个周期性任务是什么，你希望每分每秒它都在等待被触发

9.55-9.59

so there's some convenience reasons

当然，也有一些方便的原因在内

9.59-10.01

and an example which will come up for you is

这里我要向你们展示的一个例子是

10.01-10.08

 it's often the case that some you know a master server may want to check periodically whether its workers are still alive 

这是一个常见的例子，即一个主服务器会想去周期性地检查它的worker是否存活

10.09-10.14

because one of them is died you know you want to launch that work on another machine like MapReduce might do that 

因为如果其中一个worker故障了，你就会想将它上面的任务交给另一台机器来做，就像MapReduce所做的那样

10.14-10.18

and one way to arrange sort of oh do this check every second every minute 

一种方法就是每秒或者每分钟进行这种检查

10.18-10.22

 you know send a message to the worker are you alive is 

即向worker发送一条消息来判断它是否存活

10.22-10.28

to fire off a goroutine that just sits in a loop that sleeps for a second and then does the periodic thing and then sleeps for a second again 

通过启动一个Goroutine，并在其中放入一个循环操作，该循环大概的操作是：让线程沉睡1秒，然后起来执行周期任务，接着继续沉睡，如此反复进行

10.28-10.32

and so in the labs you'll end up firing off these kind of threads quite a bit 

在lab中，最终你会创建许多这样的线程

10.32-10.33

yes 

请问

10.33-10.35

is the overhead worth it 

这种开销是否值得？

10.37-10.45

yes the overhead is really pretty small for this stuff 

yes，这种开销实际上非常小

10.45-10.53

I mean you know it depends on how many you create a million threads that he sit in a loop waiting for a millisecond, then send a network message 

这取决于你创建的线程数量，假设你创建了100万条的线程，线程中存放了一个循环操作：让该线程等待1毫秒，然后再发送一条网络消息

10.53-10.56

that's probably a huge load on your machine

对于你的机器来讲，这可能就是一种巨大的负担

10.56-11.02

but if you create you know ten threads that sleep for a second and do a little bit of work 

但如果你只是创建了10条线程，并让它们sleep 1秒，然后再让它们做些事情

11.02-11.05

it's probably not a big deal at all 

这对于我们的机器来说，可能并不是什么大的开销

11.05-11.19

and it's I guarantee you the program time  you say by not having to sort of mush together ，they're different different activities into one line of code 

对于你说的程序时间，我能保证的是，你无须为它劳心费神，它们也就是将不同的活动合并在一行代码里而已

11.19-11.23

it's it's worth the small amount of CPU cost almost always still 

它只使用了很小一部分CPU，这点代价是值得的

11.23-11.31

you know you will if you're unlucky you'll discover in the labs that some loop of yours is not sleeping long enough

如果你很不幸在lab中发现你的某些循环中的线程并没有sleep足够长的时间



11.31-11.37

or are you fired off a bunch of these and never made them exit for example 

或者是你启动了许多线程，但并没有让它们结束

11.37-11.39

and they just accumulate

那么这就会让它们变得越来越多

11.39-11.42

so you can push it too far 

甚至你可以做的更激进一些

11.42-11.42

okay 


11.42-11.47

so these are the reasons that the  main reasons that people like threads a lot 

So，这就是人们喜欢线程的主要原因

11.47-11.48

and that will use threads in this class

而且，这也是我们在这门课中使用线程的原因

11.48-11.51

 any other questions about threads in general？

还有关于线程的其他问题吗？

11.51-12.08

by asynchronous program you mean like a single thread of control that keeps state about many different activities

通过异步编程，使用一条线程来保存许多其他活动的状态？

12.08-12.10

yeah  so this is a good question actually 

实际上这是一个好问题

12.10-12.13

there is you know what would happen if we didn't have threads

如果我们没有线程的话，会发生什么呢？

12.13-12.15

 for some reason, we didn't want to use threads

由于某些原因，我们不想去使用线程

12.15-12.25

 like how would we be able to write a program that could you know a server that could talk to many different clients at the same time or a client that could talk to many servers right

那我们该如何写出一个程序，它可以让一台服务器同时和许多其他客户端进行通信，或者一个客户端可以和许多服务器进行通信？





12.25-12.26

what tools could be used 

该使用什么工具呢？

12.26-12.41

and it turns out there is sort of another line of another kind of another major style of how do you structure these programs called you call the asynchronous program，I might call it event driven programming

事实证明，构建这种类型的程序有一种主流的做法，你们称它为异步编程，我将它叫做事件驱动编程


12.41-12.48

so sort of or you could do use event driven programming 

So，你们可以使用事件驱动编程

12.48-12.55

and the the general structure of an event-driven program is usually that it has a single thread and a single loop

事件驱动编程的基本结构就是，通常它有一条线程和一个循环

12.55-13.04

 and what that loop does is sits there and waits for any input or sort of any event that might trigger processing

这个循环所做的事情就是等待可能会触发处理的任何输入或者任何事件发生

13.04-13.07

so an event might be the arrival of a request from a client 

So，这个事件可能是收到了来自某个客户端的请求

13.07-13.09

or a timer going off 

或者定时器所定的时间到了

13.09-13.19

or if you're building a Window System protect many Windows systems on your laptops，I've driven written an event-driven style where what they're waiting for is like key clicks or Mouse move or something 

如果你电脑上的系统是windows，windows系统上的很多程序都是以这种事件驱动的风格进行编写的，这些程序会等待你触发键盘输入，或者鼠标移动之类的事件并做出反应



13.19-13.24

so you might have a single in an event-driven program it of a single thread of control sits an a loop waits for input 

在这种事件驱动型程序中，你会通过一个循环中的线程来等待接收输入

13.24-13.26

and whenever it gets an input like a packet

当它得到一个输入时，例如数据包

13.26-13.29

 it figures out oh you know which client did this packet come from 

它会去弄清楚这个数据包是哪个客户端发送的

13.29-13.38

and then it'll have a table of sort of what the state is of whatever activity its managing for that client

它有一张表格，用来管理该客户端的活动，或者该客户端处于什么样的状态

13.38-13.42

and it'll say oh gosh I was in the middle of reading such-and-such a file

它会说，我现在正在读取xx文件中

13.42-13.46

you know now it's asked me to read the next block,  I'll go and be the next block and return it

然后，这个程序要求我去读取下一个数据块，然后我就去读取该数据块，并返回

13.46-13.56

and threads are generally more convenient 

通常来讲，线程会更加方便

13.56-14.02

because they allow you to really you know it's much easier to write sequential just like straight lines of control code

线程能让你写代码写的更加容易，并且更加连贯，宛如行云流水，做你想做

14.02-14.06

 that does you know computes sends a message waits for response whatever

譬如执行计算，发送消息，或者等待响应之类的操作

14.06-14.08

 it's much easier to write that kind of code in a thread

通过线程来写这种代码会更加简单

14.08-14.21

than it is to chop up whatever the activity is into a bunch of little pieces that can sort of be activated one at a time by one of these event-driven loops

这样比将一个活动分割为一块块的小任务来执行执行简单很多，而且一次只能执行这些事件驱动循环中的一个任务（知秋注：两者类比，不用事件驱动的话，就是个线性执行的过程）

14.21-14.32

 that said the well  and so one problem with the scheme is that it's it's a little bit of a pain to program 

这种模式（知秋注：传统模式）的一个问题在于，写起代码来有点痛苦



14.32-14.36

another potential defect is that while you get io concurrency from this approach 

另一种潜在缺陷就是，当你使用这种策略来进行并发I/O时

14.36-14.38

you don't get CPU parallelism 

你无法使用CPU的并行能力

14.38-14.44

so if you're writing a busy server that would really like to keep you know 32 cores busy on a big server machine 

如果你在写一个处理工作量很大的服务器程序时，你得让它上面的32个核心全力运转

14.44-14.52

you know a single loop is you know it's not a very natural way to harness more than one core 

让单个循环去利用多个cpu核心，这显然非常不正常

你知道，单个循环很难充分利用多个核心

14.52-14.58

on the other hand the overheads of event-driven programming  are generally  quite a bit less than threads

另一方面，事件驱动编程所带来的开销通常要比线程的开销来得更小（知秋注：其实是在说创建和销毁线程开销很大，要充分利用线程）



14.58-15.00

you know threads are pretty cheap 

你们都知道，线程是非常廉价的东西

15.00-15.05

but each one of these threads is sitting on a stack 

但每条线程都在一个栈内

15.00-15.08

you know stack is a kilobyte or a kilobytes or something 

栈的大小可能是1kb左右

15.08-15.10

you know if you have 20 of these threads who cares

如果你有20条线程，谁会去在意这样的开销呢

15.10-15.12

 if you have a million of these threads 

如果你有100万条线程

15.12-15.14

then it's starting to be a huge amount of memory

那就得占用大量的内存了

15.14-15.21

and you know maybe the scheduling bookkeeping for deciding what the thread to run next might also start 

你就得有调度表之类的东西，以此来决定该执行哪条线程

15.21-15.25

you know you now have list scheduling lists with a thousand threads in them

假设，在这种调度列表中你有1000条线程

15.26-15.27

the threads can start to get quite expensive 

那么你去使用线程的时候，代价就会变得相当高了

15.27-15.33

so if you are in a position where you need to have a single server that server you know a million clients 

假设现在有这样一个场景，你有一台服务器，该服务器有一百万个客户端

15.33-15.36

and has to sort of keep a little bit of state for each of a million clients

你必须记录每个客户端的一些状态


15.36-15.39

this could be expensive

这种代价就会非常高了

15.39-15.53

and it's easier to write a very you know at some expense in programmer time it's easier to write a really stripped-down efficient low overhead service in a event-driven programming

如果你们使用事件驱动编程，那么你们就可以很容易的写出一个高效并且开销很低的服务



15.51-15.53

 just a lot more work 

只是需要你们多费点功夫罢了

15.53-15.53

yeah

请问

15.53-16.14

languages like JavaScript, you can write multiple event-driven listeners，so in go is event-driven, do they have multiple cores or just one thread I mean, do they have multiple threads, one thread that everythings happen

像JavaScript这种语言，能写多个事件驱动的监听器，在Go中则是事件驱动，So，在Go中是使用多个还是一个线程来搞定这些？



16.14-16.15

are you asking my JavaScript

你是在问我JavaScript方面的问题吗？

16.15-16.17

I don't know

我也不清楚

16.17-16.23

the question is whether JavaScript has multiple cores executing your

他的问题是，JavaScript能否利用多核来执行你的代码

16.22-16.23

does anybody know 

有人知道答案吗？

16.23-16.28

dependency implementation depends on the yeah so I don't know

这取决于具体实现，因此我也不知道答案

16.28-16.29

 I mean it's a natural thought 

我想说的是，这个一个很自然的想法

16.29-16.33

though even in you know even in GO you might well want to have

即使是在Go中，你也会想有这种东西

16.33-16.35

if you knew your machine had eight cores

如果你的机器有八核的话

16.35-16.38

 if you wanted to write the world's most efficient whatever  server

如果你想写出世界上最高效的服务器程序

16.38-16.40

 you could fire up eight threads

你可以使用八条线程

16.40-16.45

and on each of the threads run sort of stripped-down event-driven loop

在每条线程上运行这种精简的事件驱动循环

16.45-16.50

 just you know sort of one event loop per core

即每个核心上运行一个事件循环

16.50-16.56

and that you know that would be a way to get both parallelism  and to the I/O concurrency

对于事件驱动循环，你既可以将之用于并行计算，也可以用于并发I/O

16.56-16.57

 yes

请问

16.57-17.08

okay so the question is what's the difference between threads  and processes

Ok，她的问题是线程和进程之间的区别是什么

17.08-17.11

so usually on a like a UNIX machine

例如，通常在UNIX机器上

17.11-17.15

 a process is a single program that you're running 

你所运行的单个程序就是一个进程

17.15-17.19

and a sort of single address space a single bunch of memory for the process 

这个进程有一个地址空间或者说占用了一段内存

17.19-17.23

and inside a process you might have multiple threads 

在这个进程中，你可能有多条线程

17.23-17.24

and when you write go program 

当你写一个Go程序时

17.24-17.32

and you run the go program running the go program creates one unix process and one sort of memory area 

当你运行这个Go程序，就会创建一个UNIX进程并且开辟一块内存空间

17.32-17.36

and then when your go process creates goroutines 

然后，当你的Go进程创建Goroutine时

17.36-17.38

those are so sitting inside that one process 

这些Goroutine就会出现在这个进程中

17.38-17.42

so I'm not sure that's really an answer 

我不确定这个答案是否回答了问题


17.42-17.49

but just historically the operating systems have provided like this big box is the process that's implemented by the operating system 

但从历史角度上而言，操作系统所提供的进程实现就像是黑板上这个大盒子中所画的那样



17.49-17.55

and the individual and some of the operating system does not care what happens inside your process 

操作系统并不关心你的进程内部发生了什么

17.55-17.58

what language you use none of the operating systems business 

也不会去关心你使用的语言是什么，这些都不是操作系统所操心的东西


17.58-18.01

but inside that process, you can run lots of threads 

但在这个进程中，你可以运行大量的线程

18.01-18.05

now you know if you run more than one process in your machine 

如果你在你的机器上运行多个进程

18.05-18.09

you know you run more than one program I can editor or compiler

你可以运行多个程序，例如，一个编辑器或者编译器

18.09-18.11

the operating system keep quite separate 

操作系统会保持完全独立



18.11-18.14

right you're your editor and your compiler each have memory 

你的编辑器和编译器都有各自的内存

18.14-18.15

but it's not the same memory

但它们用的并不是同一块内存

18.15-18.17

 that are not allowed to look at each other memory 

我们也不允许它们去看其他内存的内容

18.17-18.20

there's not much interaction between different processes 

在这些进程之间没有太多的交互



18.20-18.24

so you editor may have threads and your compiler may have threads 

So，你的编辑器可能会使用多线程，你的编译器也可能会使用多线程

18.24-18.25

but they're just in different worlds 

但它们都在各自的世界里



18.25-18.28

so within any one  program，

在任何一个程序中

18.28-18.33 

 the threads can share memory and can synchronize with channels and use mutexes and stuff

线程可以共享内存，并且通过channel和 mutex之类的来进行同步





18.33-18.36

 but between processes there's just no interaction

但在进程之间，不存在任何交互



18.36-18.43

that's just a traditional structure of these this kind of software

这其实就是这些软件的传统结构



18.53-18.57

yeah so the question is when a context switch happens does it happened for all threads

他的问题是，当上下文切换时，是所有的线程都在切换吗？

19.08-19.09

okay 



19.09-19.12

so let's imagine you have a single core machine 

我们想象一下，假设你有一台单核计算机

19.12-19.15

that's really only running and as just doing one thing at a time

在它运行的时候，一次只能做一件事情

19.15-19.23

maybe the right way to think about it is that you're going to be you're running multiple processes on your machine

假设在你的机器上运行着多个程序

19.23-19.33

the operating system will give the CPU sort of time slicing back  and forth between these two programs 

 操作系统会让CPU的时间切片在这两个程序间来回切换

19.33-19.41

so when the hardware timer ticks  and the operating systems decides it's time to take away the CPU from the currently running process  and give it to another process

当硬件始终到期，操作系统就会当前运行进程的CPU时间片交给另一个进程

19.41-19.43

that's done at a process level 

这是在程序层面进行的

19.43-19.50

it's complicated

这非常复杂



19.50-19.52

all right 


19.52-19.54

let me restart this 

让我们重新再看下这个图

19.54-20.01

these the threads that we use are based on threads that are provided by the operating system in the end 

我们所使用的线程是基于操作系统所提供的线程

20.01-20.03

and when the operating system context switches

当操作系统进行上下文切换时

20.03-20.06

its switching between the threads that it knows about 

它会在它所知道的线程中进行切换

20.05-20.12

so in a situation like this, the operating system might know that there are two threads here in this process and three threads in this process

就像黑板上的情况那样，操作系统知道左边的进程中有两条线程，右边的进程中有三条线程



20.12-20.18

and when the timer ticks the operating system will based on some scheduling algorithm pick a different thread to run

当cpu时钟到期，操作系统就会基于某些调度算法来选择一个不同的线程去执行

20.18-20.22

it might be a different thread in this process  or one of the threads in this process

它选取的可能是这个进程中的不同线程，也可能是另一个进程中的某个线程

20.22-20.30

in addition，go cleverly multiplex as many goroutines on top of single operating system thread to reduce overhead 

此外，Go在这方面很智能，在单个操作系统线程上巧妙地复用尽可能多的Goroutine，以此来减少开销（知秋注：有个管理线程，有一个任务线程池，如果了解JAVA的Netty的话可以参考Selector和worker）

20.30-20.37

so it's really probably a two stages of scheduling the operating system picks which big thread to run 

操作系统可能要经历两个调度阶段来选择要执行的线程

20.37-20.41

and then within that process go may have a choice of goroutines to run

然后，在对应进程中，Go就可以去选择运行其中某个Goroutine





一百一十四  阅举报
02-02


20.50-20.57 源个码

all right okay so threads are convenient because a lot of times they allow you to write the code for each thread 

好的，所以，线程是很方便的，因为很多时候它可以允许你为每一个线程编写对应的代码

20.57-21.00 源个码

just as if it were a pretty ordinary sequential program 

就像一个很普通的按顺序执行的程序一样

21.00-21.09 源个码

however there are in fact some challenges with writing threaded code

然而实际上在写线程代码会很有挑战性的

21.09-21.22 源个码

one is what to do about shared data ，one of the really cool things about the threading model is that these threads share the same address space 

一是如何处理共享数据，关于线程模型的一件很酷的事情是这些线程共享相同的地址空间

21.22-21.27 源个码

they share memory if one thread creates an object in memory you can let other threads use it 

内存共享就是:如果有一个线程在内存中创建一个对象，其它线程也可以使用该对象

21.27-21.32 源个码

right you can have a array or something that all the different threads are reading and writing  and that sometimes critical 

right！你可以用一个数组或者所有不同线程都在读写的数据，有时这很关键

right！你有一个数组或其他此类的东西用于多个不同线程的读和写，此处，很关键！

21.32-21.35  源个码

right if you know if you're keeping some interesting state

Right！如果你要去维护你感兴趣的状态

21.35-21.39 源个码

you know maybe you have a cache of things  that your server your cache and memory 

你知道，也许你缓存了一些东西在你的服务器的内存上

21.39-21.41 源个码

when a thread is handling a client request 

当一个线程正在处理客户端请求时

21.41-21.42 源个码

it's gonna first look in that cache 

它将会是第一个看到缓存的

21.42-21.44 源个码

but the shared cache  and each thread reads it 

然而共享内存和每一个线程读取该缓存

但是，这个共享的缓存每一个线程都要读它

21.44-21.49 源个码

and the threads may write the cache to update it when they have new information to stick in the cache 

这些线程可以将新的信息写入该缓存以此来更新它

21:49-21.52 源个码

so it's really cool you can share that memory

so，这是太棒了，你可以共享内存

21.52-22.00 源个码

but it turns out that it's very very easy to get bugs if you're not careful  and you're sharing memory between threads 

但事实证明，如果线程间共享内存，一不小心就会很容易出错

22.00-22.08 源个码

so a totally classic example is you know supposing your thread  so you have a global variable N

so，一个很经典的例子就是，假使你的线程有一个全局变量N

22.08-22.10 源个码

and that's shared among the different threads 

并且全局变量N在不同线程间共享


22.10-22.15 源个码

and a thread just wants to increment n right 

一个线程只想给N递增(n=n+1)，right

22.15-22.21 源个码

but itself this is likely to be an invitation to bugs right

但是这本身就是错误的，right

但这种本身就可能会引发bug， right

22.21-22.23 源个码

if you don't do anything special around this code

如果你对改代码没有做任何的特别的事

22.23-22.34 源个码

and the reason is that you know whenever you write code in a thread that you know is accessing reading or writing data  that's shared with other threads you know there's always the possibility 

你知道，原因就是只要你在线程中编写代码时，就有可能知道正在访问读取或写入其它线程共享的数据

22.34-22.40 源个码

and you got to keep in mind that some other thread may be looking at the data or modifying the data at the same time 

并且你要注意的是，其它的线程可能同时也在读取或修改该数据

22.40-22.50 源个码

so the obvious problem with this is that maybe thread 1 is executing this code  and thread 2 is actually in the same function in a different thread executing the very same code right 

因此，显然或许线程1正在执行此代码，而线程2则在同一函数的不同线程中执行完全相同的代码

22.50-22.53 源个码

and remember I'm imagining the N is a global variable 

并且记住N是一个全局变量

22:53-22.22.56 源个码

so they're talking about the same n

因此，他们谈论的是相同的N

22.56-23.01 源个码

so what this boils down to you know you're not actually running this code you're running machine code the compiler produced 

因此，总的来说，你其实没有运行此代码，而是运行编译器产生的机器码

23.01-23.06 源个码

and what that machine code does is it you know  it loads X into a register

并且你知道，机器码的作用是将X加载到一个寄存器上

23.06-23.13 源个码

you know adds one to the register

你知道，就是把1添加到寄存器上

23:13-23.21 源个码

and then stores that register into X with where X is a address of some location

然后将该寄存器存到X中，指向X在内存中的位置

23.21-23.24 源个码

and ran so you know you can count on both of the threads

并且，你就能在两个线程之间计数

23:24-23.32 源个码

they're both executing this line of code you know they both load the variable X into a register effect starts out at 0 that means they both load at 0

它们都会执行这一行代码并且都会加载X变量到寄存器中，这意味着它们都在从0处开始加载

23:32-23.34 源个码

they both increment that register so

它们都在寄存器上递增，so

23.34-23.36 源个码

they get one and they both store one back to memory 

它们得到1，并且又把1存储到内存中

23.36-23.38 源个码

and now two threads of incremented n 

现在两个线程都在对n进行递增

23.38-23.44 源个码

and the resulting value is 1, which well who knows what the programmer intended

计算结果都是1，谁知道开发人员想什么了

23:44-23.46 源个码

maybe that's what the programmer wanted 

可能这就是他想要的

23.46-23.47 源个码

but chances are not

但碰巧不是这样的

00:23:47-23.50 源个码

right chances are the programmer wanted to not 1 

碰巧程序员想要的不是1

23.50-24.04 源个码

some instructions are atomic right

一些指令是原子性

24.04-24.10 源个码

so the question is a very good question which it's whether individual instructions are atomic

这是一个很好的问题，那就是单个指令是否为原子指令

24.10-24.13 源个码

so the answer is some are and some aren't

所以答案就是有些是，有些不是

24:13-24.24 源个码

so a store a 32-bit store is likely the extremely likely to be atomic in the sense

因此，从某种意义上说，存储一个32bits的值很可能是原子的（知秋注：讨论的是store指令）

一个32位存储区很可能是原子的

24.24-24.30  源个码

that if 2 processors store at the same time to the same memory address 32-bit values ，well 

如果两个处理器在相同内存中同时存储32位地址的值

24.30-24.35 源个码

you'll end up with is either the 32 bits from one processor or the 32 bits from the other processor  

你最终将得到一个处理器的32位或另一处理器的32位

你最终将得到是这两个处理器中某一个的32bits的值

24.35-24.41 源个码

but not a mixture other sizes it's not so clear like one byte stores it depends on the CPU you using 

但不会是其他大小，就像一个字节的存储取决于你的cpu一样

24.41-24.45 源个码

because a one byte store is really almost certainly a 32 byte load 

因为存储一个字节实际上几乎可以肯定是使用32字节来加载（load指令加载时的大小）

24.45-24.49 源个码

and then a modification of 8 bits  and a 32 byte store 

然后修改8位并占用一个32字节的空间来存储（知秋注：为了对齐）

24.49-24.51 源个码

but it depends on the processor 

但是它取决于处理器

24.51-24.57 源个码  ！！！！！！！！！！！！！！！

and more complicated instructions like increment， your microprocessor may well have an increment instruction

还有更多的复杂指令，就像递增，微处理器可能会有递增指令（知秋注：针对i++）

24.57-25.02 源个码

that can directly increment some memory location like pretty unlikely to be atomic 

可以直接增加一些可以不是原子的内存地址

可以直接自增，导致自增变量对应的本地内存就不再具备原子性了

25.02-25.06  源个码

although there's atomic versions of some of these instructions

尽管这些指令中有一些是具备原子性的

25.06-25.10  源个码

so there's no way all right so

so 没办法

25.10-25.15  源个码

this is a just classic danger

这是一个很典型的危机

25.15-25.26 源个码

and it's usually called a race I'm gonna come up a lot is you're gonna do a lot of threaded programming with shared state race 

并且它通常被称为race ，我要说的是，你会做很多针对共享状态进行争抢的多线程编程（知秋注：就是我们常说的针对volatile变量的CAS操作）



25.26-25.31 源个码

I think refers to as some ancient class of bugs involving electronic circuits 

我想这涉及到一个电子电路的一些古老bug


25.31-25.42 源个码

but for us that you know the reason why it's called a race is because if one of the CPUs have  executing this code started

但是对于我们来说，这就是为什么我们称为互斥的原因，是因为cpu已经执行了这段代码

但对于我们来说，之所以会将之称为一个race，是因为如果众多cpu中的一个已经开始执行了这段代码（知秋注：这里的cpu可以理解为单核cpu，一个cpu对应一条线程）

25.42-25.49 源个码

and the other one the others thread is sort of getting close to this code it's sort of a race as to whether the first processor can finish 

而另一个线程则与该代码接近，这是第一个处理器是否可以完成的竞态

其他线程想要执行这段代码，那就要等第一个处理器处理结束后才能进行一次race（知秋注：即进行一波cas争抢执行权的操作，以保证我们对数据操作的原子性）

25.49-25.54 源个码

and get to the store before the second processor start status execute the load

并且在第二个处理器开始执行之前就获取存储的信息

第一个处理线程执行完会将状态结果存储，即这个动作在第二个处理开始对该状态加载前执行

25.54-25.59 源个码

if the first processor actually manages it to do the store before the second processor gets to the load 

在第二个处理器读取它之前，实际上都是由第一个处理器对它进行管理

25.59-26.01 源个码

then the second processor will see the stored value 

然后第二个处理器将会看到存储的值

26.01-26.04 源个码

and the second processor will load one 

并且第二个处理器将会加载1

26.04-26.13 源个码

and add one to it in store two that's how you can justify this terminology okay

接着添加一个到存储为2，这样你就证明该术语的合理性

接着添加一个到存储为2，这样也就证明了这段逻辑是ok的

26.13-26.17 源个码

and so the way you solve this certainly something this simple is you insert locks

so，解决此问题的方式很简单，就是加锁

26.17-26.25 源个码 ！！！！！！！！！！！！

you know you as a programmer you have some strategy in mind for locking the data 

你知道你作为一名开发人员会策略性(具有针对性)的给数据加锁，可以说是很好的

作为一个程序员，你脑子里要有一些针对数据进行锁定的策略

26.25-26.29 源个码

you can say well  you know this piece of shared data can only be used when such-and-such a lock is held 

你知道这条共享数据只能使用

就比如说，对于这条共享数据只有在持有锁的时候才能使用，

26.29-26.32 源个码

and you'll see this 

你就可以做这个

26.32-26.37 源个码  ！！！！！！！！！！！！！！！！！！！！！

and you may have used this in the tutorial the go calls locks mutex

你可能已经在本教程中使用了go调用互斥锁

你可能已经在go官方入门教程中通过调用mutex锁做过这个例子了


26.37-26.45 源个码

so what you'll see is a mu.lock() before a sequence of code that uses shared data 

你可以在使用这个共享数据前加上一个mu.lock()

26.45-26.47 源个码

and you unlock afterwards

在之后使用mu.unlock()


26.47-26.54 源个码

and then whichever two threads execute this when it to everyone is lucky enough to get the lock first gets to do all this stuff 

然后，两个线程无论哪一个幸运的优先获得锁时，获得此锁的线程都将会执行完所有的任务

接着，这两个线程无论哪一个很幸运的优先抢到锁，获得此锁的线程都将会执行完所有这段代码展示的内容

26.54-26.59 源个码

and finish before the other one is allowed to proceed 

并在允许另一个继续之前完成

只有在前一个结束后才允许另一个去执行

26.59-27.06 源个码

and so you can think of wrapping a some code in a lock as making a bunch of you know 

因此，你可以考虑将一些代码加锁，然后记住它

so 在某些情况下你可以考虑将一些代码使用一个锁进行包裹，

27.05-27.10 源个码

remember this even though it's one line it's really three distinct operations

要记住即便只是这一行代码，也有三个不同的操作

27.10-27.19 源个码

you can think of a lock as causing this sort of multi-step code sequence to be atomic with respect to other people who have to lock yes

你可以视为锁是造成多步骤代码序列原子性，尊重其他人也会用到该锁

通过一把锁而引发的这几步代码来做到原子性，以此来保证其他人操作的安全

27.19-27.32  源个码

should you sissy can you repeat the question

你大声点，你可以重复这个问题吗？

27.32-27.41  源个码

oh that's a great question the question was how does go know which variable we're walking 

oh，这是一个很好的问题，go语言是如何知道锁定的是哪个变量

27.41-27.43  源个码

right here of course is only one variable 

当然这里只有一个变量

27.43-27.47 源个码

but maybe we're saying n equals x plus y really threes few different variables 

但是我们也可以说n=x+y,这就有三个不同的变量


27.47-27.57 源个码

and the answer is that go has no idea it's not there's no Association at all anywhere between this lock 

答案是，go完全不知道，这个锁与其间任何东西都没有关联

在此锁之间的任何地方都没有关联

27.57-28.01 源个码

so this new thing is a variable which is a tight mutex

so，这个新事物mu就是一个强互斥的一个变量

28.01-28.12 源个码

there's just there's no association in the language between the lock and any variables the associations in the programmers head 

在程序员眼中不管在任何语言锁和任何变量之间没有关联

在程序员脑子里，在编程语言中，锁与任何变量间都没有关联

28.12-28.17  源个码

so as a programmer you need to say, oh here's a bunch of shared data 

因此，作为程序员，你需要说，这是一堆共享数据

28.17-28.20  源个码

and any time you modify any of it

并且随时你可以修改其中的任何内容

28.20-28.24  源个码

you know here's a complex data structure say a tree or an expandable hash table or something

这是一个复杂的数据结构，可以是一棵树或者是一个可扩展的哈希表之类的数据结构

28:24-28.26 源个码

anytime you're going to modify it 

你可以随时修改它

28:26-28.29 源个码

and of course a tree is composed many objects anytime 

当然，这棵树随时可以有多个对象组成

28.29-28.31 源个码

you got to modify anything that's associated with this data structure

你可以修改与该数据结构相关的任何数据

28.31-28.33 源个码

you have to hold such  and such a lock right 

你必须持有这样的锁

28.33-28.40  源个码

and of course is many objects and instead of objects changes because you might allocate new tree nodes 

当然会有很多对象。你可能会为其分配新的树节点而不是改变这些内在对象，



28.40-28.46 源个码

but it's really the programmer who sort of works out a strategy for ensuring that the data  structure is used by only one core at a time 

但实际上程序员会制定一种策略来确保一次仅由一个cpu内核使用该数据结构

28.46-28.50 源个码

and so it creates the one or maybe more locks 

因此，它会创建一个或者多个锁

28.50-28.52 源个码

and there's many many locking strategies you could apply to a tree 

你可以将许多锁的机制应用于一棵树上

28.52-28.29.00 源个码

you can imagine a tree with a lock for every tree node the programmer works out the strategy allocates the locks 

想象一下一棵树，程序员可以制定一种策略给每一个树节点加上锁

29.00-29.02 源个码

and keeps in the programmers head the relationship to the data 

并保持数据和程序员的关系

以保证数据变化与我们程序员脑子里所想一致

29:02-29.07 源个码

but for go, this lock it's just like a very simple thing

但是对于go来说，锁是非常简单的东西

29.07-29.15 源个码

there's a lock object the first thread that calls lock gets the lock other threads have to wait until none locks

这里的锁对象，当第一个线程获得锁对象，其他线程使用该对象必须等到该对象没有锁

这里的锁对象，当第一个线程获得锁对象，其他线程必须等待，直到锁释放

29.15-29.16 源个码

and that's all go knows

这就是go所知道得一切

29.16-29.32 源个码

yeah does it not lock all variables that are part of the object ，go doesn't know anything about  variables the relationship between and locks 

它不是锁定对象的所有变量吗？go不知道变量和锁之间的关系

29.32-29.44 源个码

so when you acquire that lock when you have code that calls lock exactly what it is doing it is acquiring this lock and that's all this does 

当你正要获取该锁时，恰好有代码调用该锁，这就是锁做的所有事情

当你的代码有调用锁时，你要获取那个锁，这就是它所做的所有事情

29:44-29.47 源个码

and anybody else who tries to lock objects 

以及其它试图锁定对象的人

这里包括任何想要尝试获取锁对象的人（知秋注：多线程通过争夺锁对象来争夺任务执行权）

29:47 --> 29:55 源个码

so somewhere else who would have declared you know mutex knew all right

所以，没抢到锁的其它人就知道你在使用这个互斥锁，right

29:55-29:57 源个码

and this mu refers to some particular lock object 

mu指的是一些特定的锁对象


29:56-29.58 源个码

and there mu many many locks right

mu会有很多很多锁，right

29:58-30:02 源个码

all this does is acquires this lock 

上述所有的都会获得锁

所有这些都是为了获取这个锁

30:02-30:06 源个码

and anybody else who wants to acquire it has to wait until we unlock this lock 

并且，想要获取锁，必须等到释放该锁

30:06-30:09 源个码

that's totally up to us as

这完全取决于我们

30:09-->30:16 源个码

programmers what we were protecting with that lock so 

程序员们可以使用锁保护某些数据

00:30:16--30:42 源个码

the question is it better to have the lock be a private the private business of the data structure like supposing it a zoning map yeah 

这个问题是是不是在数据结构中设定一个私有的锁会更好，就好像是sync.Map（知秋注：可能是假设对map这个数据结构改造，或者直接参考sync.Map即可）

最好有一个锁作为私有数据，把这个数据的结构想成一个分片map

30:42-30:45 源个码

you know you would hope although it's not true 

希望是这样，也可能不是这种数据结构，

30:47-30:53 源个码

that map internally would have a lock protecting it and that's a reasonable strategy would be to have 

对于这个map，在内部我们通过一个锁来保护它， 这是一个合理的策略

30:53-31:04 源个码  ！！！！！！！

I mean what would be to have it if you define a data structure that needs to be locked to have the lock be sort of interior that have each of the data structures methods be responsible for acquiring that lock 

如果你定义一个需要被锁定才能使锁具有锁的数据结构，那么内部结构应让每个数据结构方法负责获取该锁

我的意思是，如果你定义一个需要被锁定的数据结构，可以使该锁属于数据结构内部，并且每一个该数据结构的方法中都要获取该锁

31:04-31:07 源个码

and the user the data structure may never know that that's pretty reasonable 

但是用户的结构体可能会忽略这种合理性

用户可能永远不知道这个数据结构为什么这么合理

31.07-31.11 源个码

and the only point at which that breaks down is that

唯一会引起bug的地方是

这也会造成一些不爽

31.11-31.19 源个码

um well it's a couple things one is if the programmer knew that the data was never shared 

如果程序员知道从未共享数据

有几件事，其一，如果程序员知道数据从未共享过

31.19-31.24 源个码

they might be bummed that they were paying the lock overhead for something they knew didn't need to be locked 

这就有点糟糕了，因为他们不用锁，无须为锁增加开销

31.24-31.32 源个码

so that's one potential problem the other is that if you if there's any  inter data structure of dependencies 

因此，这是一个潜在问题，此外，如果你的数据结构内部之间有依赖关系

31.32-31.35 源个码

so we have two data structures each with locks 

因而我们就有两个带有锁的数据结构

31:35--> 31:41 源个码

and they maybe use each other then there's a risk of cycles and deadlocks  right  

并且它们彼此相互使用，那么会造成循环和死锁的危险

31.41-31.45 源个码

and the deadlocks can be solved

而死锁可以被解决

31:45 --> 31:54 源个码

but the usual solutions to deadlocks requires lifting the locks out of out of the implementations up into the calling code 

但是通常的死锁解决方案需要将锁从实现中移出，并移入调用代码中

31.54-31.56 源个码

I will talk about that some point

我会着重谈一下这点

31:56 --31:59 源个码

but it's not a it's a good idea to hide the locks 

但这不是隐藏锁的好方案

31:59--32:01 源个码

but it's not always a good idea

但这并不总是一个好的方案

32.01-32.14 源个码

all right okay so one problem you run into with threads is these races 

因此，问题就是你运行在线程上的是一些

all right okay so 一个问题是运行这个代码的这些线程会出现数据竞争性访问（races）

32.14-32.17 源个码

and generally you solve them with locks okay

通常你用锁来解决该问题


32.17-32.24 源个码

or actually there's two big strategies. one is you figure out some locking strategy for making access to the data single thread one thread at a time 

或者，实际上这里有两种大的策略，一个是弄清楚锁机制，以使一次访问一个线程的数据单线程一个线程

或者，实际上这里有两种大的策略，一个是通过锁策略来使一次只让一条线程来访问这个数据

32.24-32.28 源个码

or yury you fix your code to not share data

你可以修改你的代码不共享数据

或者你将你的代码修改为不共享数据

32.28-32.36 源个码

if you can do that, it's that's probably better  because it's less complex 

如果可以的话那更好，因为它没那么复杂

32.36-32.41 源个码

all right so another issue that shows up with leads threads is called coordination 

all right so导致线程出现的另一个问题称为协作（coordination）

（知秋注：这里可能出现的现象，两个人都在操作同一把锁，正常一个等待另一结束后继续，某个情况下，双方互相等待对方，形成死锁）

32.41-32.47 源个码

when we're doing locking the different threads involved probably have no idea

当我们执行锁操作时，涉及的不同线程可能不知道彼此状态

32.47-32.52 源个码

that the other ones exist they just want to like be able to get out the data without anybody else interfering 

对于另外一些线程，它们只希望能够获取数据而不会受到其它线程的干扰

32.52-32.57 源个码

but there are also cases where you need where you do intentionally want different threads to interact 

但是在某些情况下，你确实需要在有需要的地方让不同的线程进行交互

32.57-32.59 源个码

I want to wait for you maybe you're producing some data 

我会进入等待状态，也许你正生成数据

我想要等待获取你生成的一些数据

32.59-33.33.01 源个码

you know you're a different thread than me 

你和我是不同的线程

33.01-33.06 源个码

you're producing data I'm gonna wait until you've generated the data

你正生成数据，直到你生成完数据为止

33.06-33.11 源个码

before I read it right or you launch a bunch of threads to say you crawl the web 

在我读取它之前或者你启动了许多线程去爬取网页

33:11-33.13 源个码

and you want to wait for all those fits to finish 

你想等所有这些爬取工作完成

33.13-33.18 源个码

so there's times when we intentionally want different to us to interact with each other to wait for each other

所以有时候我们故意让与我们不同的人互相交流以等待对方


33:18-- 33:21 源个码

and that's usually called coordination

通常我们称这协作

33:23--33:28 源个码

and there's a bunch of as you probably know from having done the tutorial

在完成本教程后，你会学到更多


33.28-33.40 源个码

there's a bunch of techniques in go for doing this like channels which are really about sending data from one thread to another and breeding（听不出这个单词）

go有很多技术可以实现这个，就比如说channel，实际上是关于一个线程向另一个线程发送数据并进行配对（知秋注：谁往channel发送数据，谁从channel中接收数据）


33.40-33.59 源个码

but they did to be sent, there's also other stuff that more special purpose things like there's a idea called condition variables,  just great 

但是确实要发送给它们一些特殊的用途的东西，比如称为条件线程的想法

c但是它们（数据）确实被发送了，还有其他一些特殊用途的东西，例如有一个叫做Sync.cond()的idea真的很棒（知秋注：Java程序员可以参考重入锁中Condition锁的用法）

33.50-33.53 源个码

if there's some thread out there and you want to ticket it period 

那会很棒，而你想踢掉它

如果有一些线程停在那里，你想每隔一段时间发出一个唤醒信号

33.53-33.55 源个码

you're not sure if the other threads even waiting for you 

你不确定是否有其它线程在等你

33.55-33.58 源个码

but if it is waiting for you just like to give it a ticket

但是如果它在等你，你就给它一个ticket（知秋注：唤醒的时候会唤醒ticket等于notify的goroutine，notify和wait都是自增字段）

33.58-34.00 源个码

so it can well know that it should continue whatever it's doing 

所以它很清楚知道它应该继续做的它要做的事情


34.00-34.10 源个码

and then there's waitgroup which is particularly good for launching a known number of goroutines 

接着，有一个sync.waitgroup特别适合启动已知数量的goroutines

34.10-34.13 源个码

然后是一个等待组，它特别适合启动已知数量的go例程

and then waiting for them Done to finish 

然后使它们等待直到调用WaitGroup的Done()来结束（知秋注：参考sync.WaitGroup的api）

34.13-34.17 源个码

and a final piece of damage that comes up with threads deadlock 

最后的坏处就是出现了线程死锁

关于危害的最后一部分就是线程死锁


34.17-34.28 源个码

the deadlock refers to the general problem that you sometimes run into where one thread 

死锁有时就是线程使用过程中常见问题

34.28-34.36 源个码

you know thread this thread is waiting for thread two to produce something so

你知道，这个线程等待第二个线程生成的数据


34.36-34.39 源个码

you know it's draw an arrow to say thread one is waiting for thread two 

从T1画箭头到T2表示，线程1正在等待线程2

34.39-34.46 源个码

you know for example thread one may be waiting for thread two to release a lock or to send something on the channel 

比如说，线程1可能等待线程2释放这个锁或者发送一些给channel


34:46--34:55 源个码

or to you know decrement something in a waitgroup however unfortunately maybe T two is waiting for thread thread one to do something 

减少等待组中的某些线程，但是不幸的是，也许线程2正在等待线程1做某事

或者是减少syc.waitgroup中的值，但不幸的是，也许线程2正在等待线程1做某事

34:55 --35.00 源个码

and this is particularly common in the case of locks 

这在锁的情况下尤其常见


35.00-35.08 源个码

its thread one acquires lock a  and thread to acquire lock b

线程1获得锁A并且线程2获得锁B

35.08-35.10 源个码

so thread one is acquired lock a thread two is required lot B 

线程1获得锁A并且线程2获得锁B

35.10-35.15 源个码

and then next thread one needs to lock B also that is hold two locks which sometimes shows up 

然后线程1需要获取锁B，也就是有时候出现持有两个锁


35.15-35.19 源个码

and it just so happens that thread two needs to hold block A that's a deadlock

而且恰好发生了线程2需要保持阻塞，嘿，这就是一个死锁

而恰好此时线程2也想要获取锁A，这就会出现一个死锁

35.19-35.21 源个码

all right at least grab their first lock 

至少抓住它们的第一把锁

至少它们抓住了各自的第一把锁

35.21-35.24 源个码

and then proceed down to where they need their second lock 

然后继续到需要第二把锁的地方

35.24-35.25 源个码

and now they're waiting for each other forever 

现在他们一直在等待对方

35.25-35.29 源个码

right neither can proceed neither then can release the lock 

都无法继续进行，然后无法解除锁

35.29-35.33 源个码

and usually just nothing happens so

通常就什么干不了了

35:33 --35:36 源个码

if your program just kind of grinds to a halt 

如果你的程序只是停顿了下来

35:36 --35:37 源个码

and doesn't seem to be doing anything 

似乎什么也没做

35:37 --35:41 源个码

but didn't crash deadlock is it's one thing to check

但没有崩溃死锁，是检查的一件事

而且也没有崩溃，可以检查下是否存在死锁



+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

35.41-35.56 源个码

okay all right let's look at the web crawler from the tutorial as an example of some of this threading stuff 

okay all right，让我们看一下网页爬虫教程作为这些线程得例子

Ok，我们来看个关于多线程的例子，我们来看下官方教程中的web crawler

35.56-36.03 源个码

I have a couple of two solutions in different styles

我有两个解决方案

我有两种不同风格的答案


36.03-36.11 源个码

 are really three solutions in different styles to allow us to talk a bit about the details of some of this thread programming 

并且不同的方式实际上是三种使用不同方式的解决方案，使我们可以谈论一些有关该线程编程的细节

我说错了，其实是三种解决方案，这使得我们能够更加深入讨论下多线程编程的某些细节



36.11-36.19 源个码

so first of all you all probably know web crawler its job is you give it the URL of a page that it starts at 

因此，首先你可能知道Web爬虫的任务开始时需要为它提该页面的URL

首先，你们可能都知道，网络爬虫的工作就是，你传给它一个页面的URL，然后它就会开始进行爬取内容



36.19-36.22 源个码

and you know many web pages have links to other pages 

并且你知道许多网页还会链接到其它网页

并且你们也知道，很多网页上面会有指向其他页面的链接



36.22-36.29 源个码

so what a web crawler is trying to do is if that's the first page， extract all the URLs that were mentioned that pages links 

所以网页爬虫会试着将整个首页页面所有的链接到其它页面的地址都提取出来

So，网络爬虫所尝试做的事情就是，如果这是第一个页面，那它就会将该页面上的所有提到的链接都提取出来

36.29-36.43 源个码

you know fetch the pages they point to look at all those pages for the urls are all those  but all urls that they refer to and keep on going until it's fetched all the pages in the web ，let's just say and then it should stop 

你要明白，获取它们指向的页面以查看所有这些页面的网址 但他们引用的所有网址 并继续进行下去，直到它获取了网络中的所有页面为止然后应该停止，除了页面样式图形

爬虫会根据这些网页上所有提到的URL来获取到对应的页面，直到抓取到所有的页面为止，它才会停止工作





36.43-36.51 源个码

in addition the graph of pages  and URLs is cyclic

此外，对于这些页面中包含的URL，有些会循环重复



36.51-36.58

that is if you're not careful um you may end up following if you don't remember  oh I've already fetched this web page

而且网址是循环的，也就是说，如果您不小心，可能会在不记得的情况下关注oh，我已经爬取完了网页

如果你不小心的话，或者说如果你没有对已经爬取过的网页进行记录的话



36.58-37.00 源个码

already you may end up following cycles forever 

你已经可能永远循环下去

你可能就得无限循环下去了



37.00-37.03 源个码

and you know your crawler will never finish 

你的爬虫将永不会停歇

你的爬虫就永远不会结束它的工作



37.03-37.10 源个码

so one of the jobs of the crawler is to remember the set of pages that is already crawled or already even started a fetch for 

因此，爬虫的任务之一就是记录已经爬取过的页面，或者那些已经开始爬取的页面的集合



37:10 -- 37.16 源个码

and to not start a second fetch for any page that it's already started fetching on

并且不开始第二次获取任何页面

并且不再二次抓取任何已经开始抓取的页面



37:17 -->37:28 源个码

and you can think of that as sort of imposing a tree structure finding a sort of tree shaped subset of the cyclic graph of actual web pages

并且您可以将其视为强加树形结构，从而找到实际网页循环图的树形子集

你们可以将它看作一个树形结构，我们从实际网页的循环路径中找到一个树形子集

37.28-37.36 源个码

okay so we want to avoid cycles we want to be able to not fetch a page twice

因此，我们想要避免死循环，我们不要抓取一个页面两次

Ok，So，我们想做的是避免死循环，我们不想重复抓取一个页面

37.36-37.38 源个码

it also it turns out that it just takes a long time to fetch a webpage

事实证明，这需要很长时间

事实证明，要去抓取一个网页需要花很长一段时间

37:38 --37:44 源个码

but it's good servers are slow and because the network has a long speed of light latency 

但是很好的服务器速度很慢，并且因为网络的光纤延迟时间长





37.44-37.51 源个码

and so you definitely don't want to fetch pages one at a time unless you want to crawl to take many years 

因此，您绝对不希望一次获取一个页面，除非你要爬取网页要花费很多年

So，你们绝对不希望一次只抓取一个页面，除非你想花很多年来爬取这些页面

37.51-37.57 源个码

so it pays enormous lead to fetch many pages at same time I'm up to some limit 

所以消耗巨大，才能获取很多相同的页面

So，要同时抓取很多页面会付出巨大的代码，所以我对此做出了某些限制



37.57-38.00 源个码

right you want to keep on increasing the number of pages you fetch in parallel

你想继续增加页数

你们想去增加并行爬取页面的线程数量

38.00-38.06 源个码

 until the throughput you're getting in pages per second stops increasing

你可以并行方式获取数据，直到每秒获取的页面吞吐量停止增长为止



38.06-38.09 源个码

 that is running increase the concurrency until you run out of network capacity 

增加并发，直到网络容量耗尽（其实就是占满带宽）

38.09-38.13 源个码

so we want to be able to launch multiple fetches in parallel 

所以，我们想要在并发中启动多个爬虫

So，我们想以并行的方式启动多个爬虫程序

38.13-38.19 源个码

and a final challenge which is sometimes the hardest thing to solve is to know when the crawl is finished

最后的挑战有时是最难解决的，要知道爬虫何时完成

最后，我们还有一个难题要去解决，有时它也是解决起来最难的问题，那就是我们得知道爬虫何时完成工作

38:19--38:22 源个码

and once we've crawled all the pages we want to stop and say we're done 

一旦我们抓取了所有页面，我们就想停止，并且表示我们已经完成了页面抓取

38.22-38.29 源个码

but we actually need to write the code to realize aha we've crawled every single page

并说我们已经完成了，但实际上我们需要编写代码来实现 aha

但实际上我们需要编写代码，来让我们意识到我们抓取完了每个页面

38.29-38.35 源个码

 and for some solutions I've tried figuring out when you're done has turned out to be the hardest part 

我们已经抓取了每个页面，对于某些解决方案，我尝试弄清楚什么时候完成是最困难的部分

根据某些我已经做出来的答案来讲，事实证明，爬虫何时完成才是最难的一部分

38.35-38.40 源个码

all right so my first crawler is serial crawler here 

因此，我们的第一个爬虫就是这一串行爬虫

So，我的第一个爬虫程序是一个串行爬虫

38.40-38.46 源个码

and by the way this code is available on the website under crawler go on the schedule if you want to look at it

并按计划在爬虫下的网站上提供此代码

顺带一提，如果你们想看的话，这段代码你能在课程网站中的crawler.go中找到

38.47-38.57

 this first calls a serial crawler it effectively performs a depth-first search into the web graph

首先这里调用了一个串行爬虫，它能在这个网络路径图中有效地执行深度优先搜索

38.57-39.01

and there is sort of one moderately interesting thing about it

而且这里也有一件相当有趣的事情

39.01-39.10

it keeps this map called fetched which is basically using as a set in order to remember which pages it's crawled 

它里面维护了一个叫做fetched的map，基本上来讲，它是通过一个集合来记录已经爬取过的页面




39.10-39.12

and that's like the only interesting part of this

这是这段代码中我们唯一感兴趣的东西


39.12-39.16

you give it a URL that at line 18

在第18行，我们传入一个URL

39.16-39.18

if it's already fetched the URL， it just returns

如果它已经拿到了URL，那这里就直接return

39.18-39.20

if it doesn't fetch the URL

如果它没拿到URL

39.20-39.25

it first remembers that it is now fetched it  actually gets fetches that page

它首先会记住，它现在实际上已经在抓取这个URL的页面了

39.25-39.28

 and extracts the URLs that are in the page with the fetcher

并且通过fetcher函数来提取该页面上的URL

39.28-39.32

and then iterates over  the URLs in that page 

接着，遍历这个页面上的所有URL

39.32-39.35

and calls itself for every one of those pages

并且在每个页面上调用这个爬虫

39.35-39.42

and it passes to itself the way it it really has just a one table there's only one fetched map 

通过递归调用的方式，它可以获得一个不包含重复url的map 即 fetched 

39.42-39.47

of course  because you know when I call recursive crawl and it fetches a bunch of pages 

因为当我递归调用这个爬虫时，并且它抓取到了一些页面

39.47-39.54

after it returns，I want to be Well  you know the outer crawler instance needs to be aware that certain pages are already fetched

当它返回时，我希望外层的爬虫实例能意识到这些页面已经被内层的爬虫所抓取了

39.54-40.01

so we depend very much on the fetched map being passed between the functions by reference instead of by copying 

在函数之间，我们非常依赖通过引用将值传入fetched map而不是通过拷贝的方式传入











九十五  阅举报
02-03
40.01-40.10

so it  so under the hood what must really be going on here is that go is passing a pointer to the map object to each of the calls of crawl 

So，在底层，Go真正要做的事情是将这个map对象的指针传给我们所调用的每个爬虫

40.10-40.17

so they all share the pointer to the same object and memory rather than copying rather than copying than that 

So，它们都共用了同一个对象和内存的指针，而不是复制这个map

40.17-40.20

any questions ？

有任何疑问吗？



40.20-40.25

so this code definitely does not solve the problem that was posed right

屏幕上的这段代码并没有解决我们之前提出的问题

40.25-40.31

 because it doesn't launch parallel parallel fetches

因为它不具备并行抓取的能力

40.31-40.36

now so crawler we need to insert goroutines somewhere in this code right to get parallel fetches 

因此，我们需要在这段爬虫代码中的某处插入Goroutine，以此来获取并行抓取的能力

40.36-40.42

so let's suppose just for chuckles, we just start with the most lazy thing

So，为了让大家开心下，我们从最懒的事情开始做

40.42-40.59

because why  so I'm gonna just modify the code to run the subsidiary crawls each in its own goroutine 

So，这里我要修改下代码，以便让每个爬虫子程序运行在它自己的Goroutine中

40.59-41.03 需要改

actually before I do that，what i want to run the code just to show you what correct output looks like 

实际上在我修改代码前，我想先跑下代码让你们看下正确的输出结果是什么样的


41.03-41.10

so hoping this other window command run the crawler， it actually runs all three copies of the crawler 

我们来在另一个命令行窗口中运行爬虫，在里实际上运行了三个爬虫的副本

41.10-41.14

and they all find exactly the same set of webpages 

它们都找到了完全一样的网页集合

41.14-41.15

so this is the output that we're hoping to see

这也是我们希望看到的输出结果

41.15-41.20

 five lines five different web pages are fetched prints a line for each one 

即打印5行，每行都对应一个抓取到的不同结果

41.20-41.28

so let me now run the subsidiary crawls in their own goroutines  and run that code

现在让我来修改下代码，在每个子爬虫程序的Goroutine中运行它们

41.28-41.30

so what am I going to see

So，我会看到什么呢？

41.30-41.38

 the hope is to fetch these webpages in parallel for higher performance 

为了更高的性能，我们希望看到是并行抓取这些网页

41.42-41.44

so okay so you're voting for only seeing one URL 

Ok，So你的答案是只看到一个URL

41.44-41.46

and why so why is that 

为什么是这个答案呢？

41.46-41.55

yeah yes that's exactly  right

对，你说的完全正确


41.55-42.01

you know after  it's not gonna wait in this loop at line 26, it's gonna exit right through that loop

它并不会在第26行处进行等待，它会离开那个循环

42.01-42.06

I was gonna fetch 1p when the very first webpage at line 22 

它会在第22行处对第一个网页进行抓取

42.06-42.08

and then a loop it's gonna fire off the goroutines 

然后它会在一个循环中启动Goroutine

42.08-42.10

and immediately the crawler function is gonna return 

接着，这个爬虫方法就会立即结束返回

42.10-42.15

and if it was called from main， main what was exit，almost certainly before any of the routines was able to do any work at all

如果是在main函数中调用，几乎能肯定的是在这些Goroutine执行之前，main函数已经退出了

42.15-42.17

so we'll probably just see the first web page 

So，我们可能所看到的就是第一个网页


42.17-42.26

and I'm gonna do when I run it you'll see here under serial that only the one web page was found 

当我运行程序时，你们可以看到在serial中，我们只看到了一个网页

42.26-42.32

now in fact since this program doesn't exit after the serial crawler， those goroutines are still running 

事实上，在执行完串行爬虫后，这个程序并不会退出，这些Goroutine依然在运行

42.32-42.38

and they actually print their output down here，interleaved with the next crawler example 

实际上，在下方打印这些线程执行的输出结果，可以看到这些输出结果是交错打印的


42.38-42.44

but nevertheless the codes just adding a go here absolutely doesn't work 

也就是说，在此处代码中添加的go是根本起不了什么作用的

42.44-42.46

so let's get rid of that 

So，让我们把这个删除

42.46-42.53

okay so now I want to show you a one style of concurrent crawler 

Ok，现在我想向你们展示一种并行风格的爬虫

42.53-42.56

and I'm presenting 2

这里我会展示两种

42.56-43.02

one of them written with shared data shared objects  and locks it's the first one 

第一种是通过共享数据、对象以及锁来实现的

43.02-43.12

and another one written without shared data but with passing information along channels in order to coordinate the different threads 

但另一种写法是不通过共享数据来实现，但它通过channel来传入信息，以此来协调不同的线程



43.12-43.14

so this is the shared data one

So，这就是共享数据的那个版本


43.14-43.19

 or this is just one of many ways of building a web crawler using shared data 

这是一种通过使用共享数据来构建web爬虫的方式

43.19-43.24

so this code significantly more complicated than a serial crawler

So，这段代码明显要比串行爬虫的代码来得更为复杂

43.24-43.32

 it creates a thread for each fetch it does alright 

它会为每次抓取都创建一条线程

43.32-43.38

but the huge difference is that it does with two things

但它在两件事情上有巨大的不同

43.38-43.42

 one it does the bookkeeping required to notice when all of the crawls have finished 

当所有的爬虫完成工作时，它会记录下来

43.42-43.49

and it handles the shared table of which URLs have been crawled correctly 

并且它对一张记录了已经抓取的URL的共享表进行了正确处理

并且它对已经抓取的URLs通过map记录为ture并共享

43.49-43.53

so this code still has this table of URLs 

So，这段代码中仍然使用这个记录了这些URLs的map（知秋注：map就是一个存储key，value数据对的一个集合）


43.53-44.02

and that's f.fetched[url] at line 43 

即第43行中的f.fetched[url]



44.02-44.11

but this table is actually shared by all of the all of the crawler threads 

但实际上所有的爬虫线程都共用了这张表

44.11-44.16

and all the crawler threads are making or executing inside concurrent mutex 

所有的爬虫线程都是在ConcurrentMutex函数中执行的

所有的爬虫线程都是在ConcurrentMutex函数中创建并执行的



44.16-44.21

and so we still have this sort of tree up in current mutexes that's exploring different parts of the web graph 

So，在CurrentMutex中，我们依然通过这种树形结构来探索网络路径图中的不同部分（知秋注：Java程序员可以思考下，fork-join，在每个非叶子节点处起一条线程来做这个节点下所涉及到的URLs）

44.21-44.27

but each one of them was launched as a as its own go routine instead of as a function call 

但每个部分都是通过Goroutine来获取，而不是通过函数调用获取

44.27-44.31

but they're all sharing this table of state

但它们都共用了这张状态表

44.31-44.32

 this table of fetched URLs 

即这张记录了已经抓取到的URL的表

44.32-44.34

because if one go routine fetches a URL

因为如果一个Goroutine已经抓取到了一个URL

44.34-44.39

we don't want another goroutine to accidentally fetch the same URL 

我们并不希望另一个Goroutine因为意外而抓取到同一个URL


40.39-44.42

and as you can see here line 42  and 45

你们可以看到此处的第42行到45行处

44.42-44.52

 I've surrounded them by the mutex that are required to prevent a race that would occur if I didn't add them mutex

我在这段代码上添加了mutex来进行上锁，以此来防止互相争抢的情况发生，如果这里不上锁，那就会发生互相争抢的情况

44.52-45.00

so the danger here is that at line 43 a thread is checking of URLs already been fetched 

So，此处的危险在于第43行的代码，这里有用一个线程来检查是否已经拿到了URL

45.00-45.04

so two threads happen to be following the same URL

So，当两个线程都碰巧拿到了同一个URL时

45.04-45.09

 now two calls to concurrent mutex end up looking at the same URL

当这两个线程拿到同一个URL时，最终会调用两次并发互斥锁

45.09-45.12

maybe because that URL was mentioned in two different web pages

因为这个URL可能在两个不同的网页上都出现了

45.12-45.15

 if we didn't have the lock

如果我们没有这个锁

45.15-45.23

 they'd both access the map table to see if the threaded  and then already if the URL had been already fetched  and they both get false

这两个线程都会去访问这张表来检查该URL是否已经被拿到，如果已经抓取到这个URL，那么它们都会得到false这个结果

45.23-45.28

 at line 43 they both set the URLs entering the table to true

在第43行，这两条线程都会将表中这个URL的状态设置为true


45.28-45.32

 at line 44 and at 47 they will both see that I already was false

在第47行，它们会看到already的值是false

45.32-45.34

and then they both go on to fetch the web page 

接着，这两条线程就都会去抓取这个网页

45.34-45.36

so we need the lock there

因此，我们需要将此处锁住

45.36-45.42

and the way to think about it I think is that we want lines 43 and 44 to be atomic

我们希望第43行和44行的操作是原子性操作

45.42-45.48

 that is we don't want some other thread to to get in and be using the table between 43 and 44 

在第43行和44行处，我们不希望其他线程也来读取并修改这个map

45.48-45.56

we want to read the current content each thread wants to read the current table contents and update it without any other thread interfering 

我们所希望的情况是，在没有其他线程干扰的情况下，每条线程都能读取到当前map中的内容，并对其内容进行更新

45.56-45.58

and so that's what the locks are doing for us 

这也就是互斥锁为我们所做的事情

45.58-45.59

okay



45.59-46.04

so actually any questions about the locking strategy here

So，你们中有人对此处的锁策略有任何疑问吗？

46.04-46.09

all right 



46.09-46.11

once we check the URLs entry in the table

当我们检查表格中URL的状态时

46.11-46.15

at line 51 it just crawls, it just fetches that page in the usual way 

在第51行时，爬虫会按照平时的方式去抓取该页面

46.15-46.22

and then the other thing interesting thing that's going on is the launching of the threads

另一件令人感兴趣的事情就是多线程的启动

46.22-46.22

yes 

请问

46.22-46.34 提问部分，等有空回来再写。。。。



46.34-46.40

so the question is what's with the F dot 

她的问题是f.做了什么

46.40-46.40 提问部分



46.40-46.45

no no the MU it is okay

Ok，这里我来解释下


46.45-46.49

 so there's a structure to find out line 36 

在第36行，我们有一个数据结构

46.49-46.56

that sort of collects together all the different stuff  different state that we need to run this crawler

它里面放了我们运行这个爬虫时所需要的各种不同的东西

46.56-46.57

and here it's only two objects 

这里它只有两个对象

46.57-46.59

but you know it could be a lot more 

但我们知道，此处可以放更多东西

46.59-47.01

and they're only grouped together for convenience 

为了方便起见，我们将它们放在一起

47.01-47.10

there's no other significance to the fact there's no deep significance the fact that mu and fetch store it inside the same structure 

我们将mu和fetched放在一起其实并没有什么深层含义



47.10-47.16

and that F dot is just sort of the syntax are getting out one of the elements in the structure 

'f.'只是用来取出这个结构中元素的语法罢了

47.16-47.18

so I just happened to put the mu in the structure

So，我只是碰巧将mu放在这个结构里面

47.18-47.22

 because it allows me to group together all the stuff related to a crawl 

因为这样允许我将跟爬虫有关的所有东西都组合到一起

47.22-47.32

but that absolutely does not mean that go associates the MU with that structure or with the fetch map or anything it's just a lock objects 

但这绝对不是说Go将mu和这个结构或者和fetched map关联在一起，mu只是一个lock对象

47.32-47.35

and just has a lock function you can call 

你可以调用它里面的lock函数

47.35-47.36

and that's all that's going on

这就是这里所发生的事

47.54-48.05

so the question is how come in order to pass something by reference  I had to use star here where it is when a in the previous example，when we were passing a map we didn't have to use star 

So，他的问题是为了使用传递一些对象引用，我必须在此处放一个*，然而在之前的例子中，我们在传入map时，map前并没有使用*

48.05-48.07

that is didn't have to pass a pointer

这里无须去传入一个指针


48.07-48.10

I mean that star notation you're seeing there in line 41

你看此处第41行的*号

48.10-48.18

basically and he's saying that we're passing a pointer to this fetchstate object 

基本上来讲，此处我们要传入一个指向fetchState对象的指针

48.1848.19

and we want it to be a pointer

我们希望它是一个指针

48.19-48.21

because we want there to be one object in memory 

因为我们想在内存中有这样一个对象

48.21-48.26

and all the different go routines I want to use that same object，so they all need a pointer to that same object 

我想让所有不同的Goroutine都使用同一个对象，因此，它们需要一个指向同一个对象的指针

48.26-48.31

so we need to find your own structure that's sort of the syntax you use for passing a pointer

因此，你们需要定义你们自己的结构，以此来传入一个指针

48.31-48.33

the reason why we didn't have to do it with map is 

我们之所以不用map来做的原因是



48.33-48.38

because  although it's not clear from the syntax

尽管从语法的角度来说，这也不是很清晰

48.38-48.40

 a map is a pointer

map就是一个指针

48.40-48.46

it's just because it's built into the language， they don't make you put a star there 

因为它内置在Go里面了，Go不允许你在它前面放一个*号

48.46-48.48

but what a map is

但map是什么呢？

48.48-48.55

 is if you declare a variable type map what that is is a pointer to some data in the heap 

如果你声明一个对象的类型为map，它其实就是一个指向heap中某些数据的指针

48.55-48.57

so it was a pointer anyway 

总之，它就是一个指针

48.57-49.01

and it's always passed by reference do they you just don't have to put the star  and it does it for you

它为你传入的始终是引用，你不需要在它前面放一个*号来表示它是一个指针，它已经为你们做了指针该做的事情

49.01-49.06

so there's they're definitely map is special you cannot define map in the language 

因此，map是一种很特殊的东西，你无法在一门语言中定义map

49.06-49.08

it's it has to be built in

它必须内置在语言中

49.08-49.12

 because there's some curious things about it 

因为它会有一些奇怪的事情

49.12-49.15

okay good okay

Ok

49.15-49.22

 so we fetch the page，now we want to fire off a crawl goroutine for each URL mentioned in the page we just fetch

So，我们要对我们要抓取的页面上所涉及的每个URL启动一个Goroutine

49.22-49.26

so that's done in line 56

这部分是在第56行所做的事情


49.26-49.30

 on line 56 loops over the URLs that the fetch function returned 

在第56行的循环处遍历所有fetch函数所得到的URL


49.30-49.35

and for each one fires off a goroutine at line 58 

然后在第58行处，每对一个URL进行抓取时就会启动一个Goroutine

49.35-49.43

and that lines that func syntax in line 58 is a closure  or a sort of immediate function 

第58行处的func语法，它是一个闭包函数或者说即时函数

49.43-49.47

but that func thing keyword is doing is to clearing a function  right 

func这个关键字所做的就是用来声明函数

49.47-49.50

there that we then call

然后我们就可以调用这个函数

49.50-50.04

so the way to read it maybe is that if you can declare a function as a piece of data as just func  you know and then you give the arguments  and then you give the body 

你可以将一个函数当做一段数据那样通过func来声明，然后往里面放入参数，接着再给出函数体


50.04-50.09

 and that's a clears 

这就是一个函数声明

50.09-50.10

and so this is an object  now 

So这就是一个对象

50.10-50.16

it's like when you type one when you have a one or 23 or something

就好像是，当你输入1或者23之类的东西时

50.16-50.19

 you're declaring a sort of constant object

你就是在声明一个常数对象

50.19-50.21

and this is the way to define a constant function

这是定义常数函数的一种方式

50.21-50.27

and we do it here because we want to launch a go routine that's gonna run this function that we declared right here 

我们在这里这么做的原因是我们想启动一个Goroutine来运行此处我们声明的这个函数

50.27-50.32

and so we in order to make the go routine we have to add a go in front to say we want to go routine 

So，为了使用Goroutine，我们需要在我们想用Goroutine的地方加上一个go关键字


50.32-50.34

and then we have to call the function 

接着，我们必须调用这个函数

50.34-50.41

because the go syntax says the syntax of the go keywords as you follow it by a function name and arguments you want to pass that function 

因为在Go的语法中，在关键字go后面应该跟着一个函数名，以及你想往这个函数中所传入的参数


50.41-50.44

and so we're gonna pass some arguments here

So，我们往这里面传入一些参数

50.44-50.51

and there's two reasons we're doing this 

我们这样做有两个原因

50.51-50.59

well really this one reason we you know in some other circumstance we could have just said go concurrent mutex 

其中一个原因是，在某些情况下，我们可以直接这样来干，go concurrentMutex

50.59-51.03

oh I concurrent mutex is the name of the function we actually want to call with this URL 

实际上，concurrentMutex是我们想要调用的函数的名字，并往这里面传入URL

51.03-51.08

but we want to do a few other things as well 

但我们也想去做一些其他事情

51.08-51.13

so we define this little helper function that first calls concurrent mutex for us with the URL 

So，我们定义了一个辅助函数，首先它为我们调用了concurrentMutex，并往里面传入了URL


51.13-51.23

and then after  current mutex is finished we do something special in order to help us wait for all the crawls to be done，before the outer function returns

当ConcurrentMutex完成时，我们还要做一些特别的事情，即在外层函数返回前，等待爬虫完成它的工作


51.23-51.26

 so that brings us to the the waitgroup

So，此处给我们提供了WaitGroup

51.26-51.34

the waitGroup at line 55，it's a just a data structure defined by go to help with coordination 

第55行的waitGroup，它是一个由Go所定义的数据结构，它能用来帮助go进行协程间任务的协调执行



51.34-51.37

and the game waitgroup is that internally it has a counter 

在waitGroup内部有一个计数器counter 

51.37-51.44

and you call waitgroup dot add like a line 57 to increment the counter 

你可以像第57行那样done.Add(1)来增加计数器的数字

51.44-51.47

and waitgroup done to decrement it 

当waitGroup调用done的时候，计数器就会减一


51.47-51.53

and then this wait method called line 63 waits for the counter to get down to zero 

此处第63行调用的wait方式是用来等待计数器归零

51.53-52.00

so a waitgroup is a way to wait for a specific number of things to finish 

waitGroup中的wait方法是用来等待一定数量的事情完成（知秋注：Java程序员可回顾下JUC中的CountDownLatch）

52.00-52.03

and it's useful in a bunch of different situations 

在一系列不同的情况下，它都很有用

52.03-52.06

here we're using it to wait for the last go routine to finish

这里我们是用来等待最后一个Goroutine结束

52.06-52.08

because we add one to the weight group for every go routine 

因为我们每创建一个Goroutine，我们就会往waitGroup中加一


52.08-52.16

we create line 60 at the end of this function we've declared decrement the counter in the waitgroup 

在第60行这个函数的末尾处，我们声明了一个done.Done()，这样waitGroup中的计数器就会减一

52.16-52.20

and then line 63 waits until all the decrements have finished

然后在第63行，我们会一直等待，直到计数器为0为止

52.20-52.27

and so the reason why we declared this little function was basically to be able to both call concurrently text  and call done

我们声明这个函数的理由在于我们想既能调用concurrentMutex，又能调用Done

52.27-52.29

that's really why we needed that function 

这就是为什么我们需要这个函数的原因

52.29-52.44

so the question is what if one of the subroutines fails and doesn't reach the done line

So，他的问题是如果其中一个子Goroutine故障了，无法到达这里的Done的话

52.44-52.46

 that's a darn good question 

这是一个好问题

52.46-52.53

there is you know I forget the exact range of errors causing the goroutine to fail

我忘了具体有哪些原因会导致Goroutine会故障

52.53-52.56

 maybe divides by zero

可能是，除以0这类的问题

52.56-52.58

I don't know where dereference is a nil pointer not sure 

也可能是引用了空指针之类的东西

52.58-53.07

but there are certainly ways for a function to fail and I have the go routine die without having the program die 

但确实在某些情况下，程序没有死掉的情况下，这个函数会执行失败，我的Goroutine也会故障

53.07-53.09

and that would be a problem for us

对于我们来说，这就是一个问题

53.09-5325

and so really the right way to I'm sure you had this in mind and asking the  question the right way to write this to be sure that the done call is made no matter why this Goroutine is finishing would be to put a defer here  

解决这个问题的正确方法是我们不去管这个Goroutine是否正常运行，我们在Done前面放defer关键字来延迟执行


53.25-53.37

which means call done before the surrounding function finishes and always call it no matter why the surrounding function is finished

也就是说，不管它能否完成，最终都会调用defer里的方法

53.37-53.40

 yes

请问

53.55-54.01

and yes yeah so the question is how come two users have done in different threads aren't a race 

他的问题是，当两个不同线程都调用了Done，为什么这样做不会引起线程间的争抢

54.07-54.12

yeah so the answer must be that internally dot a waitgroup has a mutex or something like it 

So，答案是在waitGroup内部有了mutex或者其他类似的东西存在

54.12-54.19

that each of done methods acquires before doing anything else 

在做任何事情前，每个done方法都会先获取这个东西

54.19-54.25

so that simultaneously calls to a done to  waitgroups methods 

So，连续调用一个waitgroup中的done方法是不会引起线程争抢的情况发生

54.25-54.31

we could to did a low class

我们可以从底层入手

54.40-54.46

yeah for certain leaf C++ and in C you want to look at something called pthreads

在C++和C中，我们会去看某种称为pthread的东西

54.46-54.50

for C threads come in a library they're not really part of the language called P threads

在C语言中，线程是由一个库来提供的，它并不是语言中的一部分，它被称为pthread

54.50-54.59

 which they have these are extremely traditional and ancient primitives that all languages 

它们是所有语言中最为传统和古老的原语

54.59-55.03

yeah

请问

55.03-55.08

say it again

请再说一遍

55.08-55.13

you know not in this code

虽然这并没有在代码中出现

55.13-55.18

but you know you could imagine a use of waitgroups I mean weightgroups just count stuff 

你可以把waitgroup看作是计数器那样来使用

55.18-55.24

and yeah yeah yeah waitgroup doesn't really care what you're cout

waitGroup并不在意你要计数的是什么东西

55.24-55.30

 I mean you know this is the most common way to see  it use

我想说的是这其实是它最常见的用法

55.30-55.37

yeah

请问

55.37-55.51

 you're wondering why you is passed as a parameter to the function at 58 

你想问的是为什么在第58行将u作为参数传入这个函数


55.51-56.02

okay yeah this is alright so the question is okay so actually backing up a little bit

Ok，我们先回过头来看下这边的代码再来回答他的问题

56.02-56.15

 the rules for these for a function like the one  I'm defining on 58 is that if the function body mentions a variable that's declared in the outer function but not shadowed

此处我在第58行所定义的函数规则是，如果函数体内提到的变量在外层函数中已经声明过，但并没有隐藏的话

56.15-56.21

then the the inner functions use of that is the same variable in the inner function as in the outer function 

那么内部函数会使用和外层函数相同的变量

56.21-56.26

and so that's what's happening with Fechter for example

例如，此处第60行fetcher所做的那样

56.26-56.31

like what is this variable here refer to what does the Fechter variable refer to in the inner function well

此处里面这个函数中的fetcher变量指向的是什么呢？



56.31-56.36

it refers it's the same variable as as the fetcher in the outer function

它和外层函数中的fetcher是同一个变量

56.36-56.38

says just is that variable 

其实就是那个变量

56.38-56.40

and so when the inner function refers to fetcher 

当内部函数引用这个fetcher时

56.40-56.43

it just means it's just referring the same variable as this one here 

这就意味着它引用了和此处相同的变量


56.43-56.45

and the same with f

对f也是同样如此

56.45-56.48

f is it's used here it's just is this variable 

此处用到的f只是一个变量

56.48-56.56

so you might think that we could get rid of the this u argument that we're passing

So，你们可能这样想，我们能够去掉我们这里所传入的参数u

56.56-57.03

and just have the inner function take no arguments at all，but just use the U that was defined up on line 56 in the loop

即无须向这个内部函数传入u，而是使用我们在第56行的循环处所定义的u即可



57.03-57.07

and it'll be nice if we could do that

如果我们能这样做的话，那这就会很棒

57.07-57.09

because save us some typing

因为这节省了我们打字的时间

57.09-57.11

 it turns out not to work 

事实证明，这并不奏效

57.11-57.21

and the reason is that the semantics of go of the for loop at line 56 is that the for the updates the variable u

理由是因为在第56行的for循环的语义中，这个变量u的值会被更新

57.21-57.25

so in the first iteration of the for loop that variable u contains some URL 

So，在for循环第一次遍历的时候，在变量u中会包含某个URL

57.25-57.36

and when you enter the second iteration for loop。 the that variable this contents are changed to be the second URL 

当你进入第二次循环的时候，变量u中的内容会变为第二个URL

57.36-57.53 ***********

and that means that the first go routine that we launched that's just looking at the outer  if it we're looking at the outer functions u variable the that first goroutine we launched would see a different value in the u variable after the outer function it updated it 

这意味着，当我们启动了第一个Goroutine后，并查看外部函数中的u变量，当外部函数更新u变量的值时，第一个Goroutine会看到变量u中更新后的值



57.53-57.55

and sometimes that's actually what you want 

实际上，这有时也是我们想要的

57.55-57.59

so for example for for F and then particular F dot fetched 

例如此处的f，特别是这里f.fetched

57.59-58.03

we interaction absolutely wants to see changes to that map 

我们绝对希望看到这里map所发生的改变

58.03-58.06

but for you we don't want to see changes

但对于我们来说，我们不想看到这些变化，即

58.06-58.11

 the first go routine respond should read the first URL not the second URL 

第一个Goroutine读取到的应该是一个URL，而不是第二个URL

58.11-58.16

so we want that go routine to have a copy you have its own private copy of the URL 

我们想要让这个Goroutine拥有它自己的URL私有拷贝

58.16-58.19

and you know is we could have done it in other ways we could have 

你们也知道我们可以通过其他方式来做到这点

58.19-58.28

but the way this code happens to do it to produce the copy private to that inner function is by passing the URLs in argument 

但此处代码所做的就是生成一个私有拷贝，然后将这个URL的私有拷贝当做参数传入这个内部函数



58.28-58.29

yes

请问

58.35-58.39

yeah if we have passed the address of u，

如果我们传入的是u的地址

58.39-58.52

 yeah then it  uh it's actually I don't know how strings work 

实际上我并不知道String是如何工作的

58.52-58.58

but it is absolutely giving you your own private copy of the variable 

但它绝对给你了你所专有的这个变量的私有拷贝

58.58-59.01

you get your own copy of the variable 

你就得到了属于你自己的副本变量

59.01-59.03

and it yeah

请问



59.27-59.30

 are you saying we don't need to play this trick in the code 

你是不是在说，我们不需要在这段代码中玩这个技巧？

59.30-59.35

we definitely need to play this trick in the code 

我们肯定得在这段代码中这么做

59.35-59.40

and what's going on is this it's so the question is Oh strings are immutable strings are immutable 

他的问题是，String是不可变的

59.40-59.45

right yeah so how kind of strings are immutable how can the outer function change the string

既然String是不可变的，那外部函数是如何改变String的呢?

59.45-59.47 ****

there should be no problem

这里应该没有问题



59.47-59.49

 the problem is not that  the string is changed 

问题并不在于字符串会被改变

59.49-59.52

the problem is that the variable U is changed 

而是在于变量u会改变（知秋注：在urls遍历时，u会被一次又一次重新赋值，如果不作此处代码设定，也就会影响匿名函数体内执行时所针对的目标url）

59.52-59.58

so the when the inner function mentions a variable that's defined in the outer function

So，当内部函数使用了在外部函数中定义的一个变量时

59.58-1.00.01

it's referring to that variable  and the variables current value 

内部函数所引用的就是那个变量以及该变量的当前值

1.00.01-1.00.06

so when you if you have a string variable that has a in it 

如果你有一个String类型的变量，它的值为a

1.00.06-1.00.13

and then you assign B to that string variable，you're not overwriting the string，you're changing the variable to point to a different string 

接着你给该String类型的变量赋值一个b，其实你并没有覆写这个字符串，而是将这个变量指向了一个不同的字符串





七十二  阅举报
02-04
1.00.13-1.00.19

and because the for loop changes the U variable to point to a different string 

因为for循环所做的是，将变量u指向了一个不同的字符串

1.00.19-1.00.24

you know that change to u would be visible inside the inner function 

这种对变量u的改变对于内部函数来说是可见的

1.00.24-1.00.28

and therefore the inner function needs its own copy of the variable

因此，内部函数需要属于它自己的副本变量

++++++++++++++++++++++++++======================================================================

需要听写



 essentially make a copy of that so  that



1.00.52-1.00.54

okay but that is what we're doing in this code 

Ok，但这正是我们在代码中所做的

1.00.54-1.00.55

and that's that is why this code works okay

这就是为什么这段代码能工作的原因，Ok

1.00.55-1.01.01

the proposal or the broken code that we're not using here，I will show you the broken code

这里我们没有用到某段不工作的代码，现在我给你们来看下这段代码

1.01.43-1.01.46

this is just like a horrible detail

这就像是一个可怕的细节

1.01.46-1.01.49

but it is unfortunately one that you'll run into while doing the labs 

但不幸的是你们在做lab的时候会遇到这个问题

1.01.49-1.01.52

so you should be release where that there's a problem

So，你们应该意识到这里有一个问题

1.01.52-1.01.56

and when you run into it maybe you can try to figure out the details 

当你们遇上这个问题时，你们可以试着去弄清楚它里面的细节

1.02.12-1.02.14

okay that's a great question 

Ok，这是一个很棒的问题

1.02.14-1.02.23

so so the question is, you know if you have an inner function just a repeated，if you have an inner function that refers to a variable in the surrounding function 

他的问题是，如果你的内部函数引用了包裹它的这个外围函数中的一个变量

1.02.23-1.02.25

but the surrounding function returns

但这个外围函数return了

1.02.25-1.02.31

 what is the inner functions variable referring to anymore since the outer function is as returned 

因为外部函数已经return了，那么内部函数所引用的会怎样呢 （知秋注：这其实就是线程里面的问题，外部结束环境结束，线程自己对于外部函数变量的引用会不会有问题，一句话，你相当于拿到了外部某个变量在内存中的地址，即它会根据该变量在线程中的应用将之移到内存中管理，线程不挂，它会挂？强引用好吧）

1.02.31-1.02.38

and the answer is that go notices go analyzes your inner functions or these are called closures go analyzes them 

答案就是go会去分析你的内部函数（这些函数也被称为闭包函数）

1.02.38-1.02.40

the compiler analyze them 

编译器会去分析它们

1.02.40-1.02.43

says aha oh this closure this inner function is using a variable in the outer function 

编译器表示这个闭包函数使用了外部函数中的一个变量

1.02.43-1.02.52

we're actually gonna and the compiler will allocate heap memory to hold the variable  the you know the current value of the variable 

实际上，编译器会分配一段heap内存来保存这个变量的当前值

1.02.52-1.02.58

and both functions will refer to that little area heap that has the variable

这两个函数都会引用这个heap内存中所保存的这个变量

1.02.58-1.03.01

so it won't be allocated the variable won't be on the stack as you might expect 

正如你们所期待的那样，这个变量并不会存放在stack内

1.03.01-1.03.04

it's moved to the heap if the compiler sees that it's using a closure 

如果编译器看到它在一个闭包函数中使用，那么这个变量就会移动到heap内存中

1.03.04-1.03.07

and then when the outer function return，the object is still there in the heap

当外部函数return，这个对象仍然会保存在heap中

1.03.07-1.03.09

 the inner function can still get at it 

内部函数依然能够获取到它



1.03.09-1.03.18

and then the garbage collector is responsible for noticing that the last function to refer to this little piece of heap that's exited returned 

然后垃圾收集器负责观察最后一个引用这段heap内存的函数什么时候return

1.03.18-1.03.20

and to free it only then

只有到了那个时候，垃圾收集器才会将它释放

1.03.20-1.03.23

okay okay

Ok

1.03.23-1.03.30

okay so wait group waitGroup is maybe the more important thing here 

Ok，WaitGroup可能是这里比较重要的东西

1.03.30-1.03.39

that the technique that this code uses to wait for all the all this level of crawls to finished all its direct chill and the finish is the waitgroup 

这段代码所使用的技巧是，等待这层所有的爬虫完成抓取任务后，然后WaitGroup才会结束

1.03.39-1.03.44

of course，there's many of these waitgroups one per call to concurrentMutex

Of course，我们有很多这样的WaitGroup，它们每个都调用了一次ConcurrentMutex

1.03.44-1.03.48

each call that concurrentMutex just waits for its own children to finish  and then returns

每一个ConcurrentMutex都在等待它自己衍生出的子ConcurrentMutex结束然后return

1.03.48-1.03.53

okay so back to the lock 

Ok，我们再回到锁这块



1.03.53-1.03.55

actually there's one more thing I want to talk about with a lock 

实际上，我还想再说下关于锁的另一件事情



1.03.55-1.03.58

and that is to explore what would happen if we hadn't locked

我们要来探索下如果我们不使用锁的话，那这会发生什么呢

1.03.58-1.04.05

right I'm claiming oh you know you don't lock you're gonna get these races，you're gonna get incorrect execution whatever

如果你不使用锁，那你就会遇上线程间race的情况，你也会得到错误的执行结果

1.04.05-1.04.07

let's give it a shot

我们来试一下


1.04.07-1.04.12

I'm gonna I'm gonna comment out the locks 

我把这里的锁给注释掉

1.04.12-1.04.17

and the question is what happens if I run the code with no locks

我们来看下如果不加锁的话，代码在运行时会发生什么呢？

1.04.17-1.04.19

 what am I gonna see 

我会看到什么结果呢？

1.04.19-1.04.27

so we may see a ru or I'll call twice or I fetch twice yeah 

我们可能会看到我重复获取了两次这样的结果

1.04.27-1.04.30

that's yeah that would be the error you might expect 

正如你们所想的那样，可能会出类似的错误

1.04.27-1.04.33

alright so I'll run it without locks 

So，我来运行下这段不带锁的代码


1.04.33-1.04.37

and we're looking at the ConcurrentMutex the one in the middle

我们来看看右边中间ConcurrentMutex的输出结果

1.04.37-1.04.41

 this time it doesn't seem to have fetched anything twice it's only five

从这次的运行结果来看，它似乎并没有重复抓取某个结果，这里它只输出了5个结果

1.04.41-1.04.42

 run again

再跑一遍

1.04.42-1.04.45

 gosh  so far genius 

emmm？！这不科学，再来

1.04.45-1.04.51

so maybe we're wasting our time with those locks

可能我们这么做是在浪费时间

1.04.51-1.04.54

yeah never seems to go wrong  I've actually never seem to go wrong 

实际上，我们似乎并没有看到这里出错

1.04.54-1.04.59

so the code is nevertheless wrong 

不过，这段代码仍然是错的

1.04.59-1.05.01

and someday it will fail 

总有一天，它会出问题的

1.05.01-1.05.02

okay



1.05.02-1.05.05

the problem is that you know this is only a couple of instructions here 

此处的问题在于我们只试了两次

1.05.05-1.05.10

and so the chances of these two threads which are maybe hundreds of instructions happening to stumble on this 

我们可能需要试个几百次，这两条线程交错的情况才会发生

1.05.10-1.05.15

you know the same couple of instructions at the same time is quite low 

你们也知道，同一时间连续尝试两次，其中出现问题的可能性是很低的

1.05.15-1.05.23

and indeed and and this is a real bummer about buggy code with races is that it usually works just fine 

确实，对于这种有bug的代码来讲，这种情况其实挺无奈的，因为它平时跑起来确实没啥问题

1.05.23-1.05.26

but it probably won't work when the customer runs it on their computer

但人们如果在他们自己的电脑上运行这些代码，那可能就会遇上问题

1.05.26-1.05.30

so it's actually bad news for us right

So，对我们来说这可能是个糟糕的消息

1.05.30-1.05.36

what do we you know it it can be in complex programs quite difficult to figure out if you have a race right 

这可以编程一个复杂的程序，如果你们遇上线程race问题，那确实很难弄清楚原因

1.05.36-1.05.41

and you might you may have code that just looks completely reasonable

你们可能会有那种看上去十分合理的代码

1.05.41-1.05.46

 that is in fact sort of unknown to you using shared variables

但事实上，由于你们使用了共享变量，这就导致了某些未知原因的发生

1.05.46-1.05.53

and the answer is you really the only way to find races in practice to be is you automated tools 

在实际操作中，唯一能找出线程race 问题的方式就是使用自动化工具

1.05.53-1.05.59

and luckily, go actually gives us this pretty good race detector built-in to go

幸运的是，Go实际上为我们提供了相当好的race检测工具，它被内置在Go里面

1.05.59-1.06.01

  and you should use it

你们应该去使用它


1.06.01-1.06.10

so if you pass the -race flag when you have to get your go program and run this race detector 

你可以在运行你的Go程序时加上-race这个参数，就可以进行检测了

1.06.10-1.06.12

which well I'll run the race detector and we'll see 

So我们来运行下race检测器，并来看下结果


1.06.12-1.06.17

so it emits an error message from us it's found a race 

So，它向我们发出了错误信息，它发现程序中有线程race 的情况发生

1.06.17-1.06.22

and it actually tells us exactly where the race happened 

实际上，它会告诉我们，我们的代码中哪一个地方出现了线程race 的情况

1.06.22-1.06.24

so there's a lot of junk in this output 

虽然在输出信息中有很多垃圾信息存在

1.06.24-1.06.29

but the really critical thing is that the race detector realize that we had read a variable 

但真正关键的事情就是race检查器意识到问题在于我们读取的一个变量

1.06.29-1.06.36

that's what this read is that was previously written and there was no intervening release and acquire of a lock

这个读取过的变量，之前又被改写了，并且这期间并没有插入任何释放锁和获取锁的动作

这个读到的变量，在前面又被改写了（知秋注：但我这个线程是不知道的），并且这期间并没有插入任何释放锁和获取锁的动作


1.06.36-1.06.38

 that's what that's what this means

这就是这段话的意思

1.06.38-1.06.41

 furthermore it tells us the line number 

此外，它还告诉了我们行号

1.06.41-1.06.45

so it's told us that the read was a line 43 

它告诉我们，读操作是在第43行

1.06.45-1.06.51

and the write the previous write was at line 44 

上一个写操作则是在第44行


1.06.51-1.06.56

and indeed we look at the code  and the read is at line 43  and the write is at line 44

从我们的代码上来看，确实，读操作是在第43行，写操作则是在第44行

1.06.56-1.07.02

so that means that one thread did a write at line 44 and then without any intervening lock 

这就意味着，其中一条线程在第44行时进行了写操作，而且这期间并没有用到锁

1.07.02-1.07.06

and another thread came along and read that written data at line 43 

接着，另一条线程会在第43行处读取之前那条线程修改过的数据

1.07.06-1.07.09

that's basically what the race detector is looking for

基本上来讲，这就是race检测器所找到的东西

1.07.09-1.07.13

the way it works internally is it allocates sort of shadow memory 

它内部的工作原理是分配了某些影子内存

1.07.13-1.07.16

now lucky some you know it uses a huge amount of memory 

它会使用大量的内存

1.07.16-1.07.27

and basically for every one of your memory locations，the race detector is allocated a little bit of memory itself in which it keeps track of which threads recently read or wrote every single memory location 

基本上来讲，对于你所用到的每个内存位置，race检测器都会分配一点内存在上面，以此来跟踪线程近期所读取或写入的内存位置

1.07.27-1.07.39

and then when and it also to keep tracking keeping track of when threads acquiring release locks and do other synchronization activities that  it knows forces but force threads to not run concurrently

它也会去跟踪一些线程获取和释放锁以及执行其他强制线程无法进行并行操作的同步活动的行为





1.07.39-1.07.46

and if the race detector driver sees a ha there was a memory location that was written and then read with no intervening marked

如果race检测器检测到有块内存在进行数据的写入操作，然后其他线程也在读取时，期间并没有使用锁进行标记

1.07.46-1.07.48

 it'll raise an error

检测器就会报错错误

1.07.48-1.07.59

yes I believe it is not perfect

我相信它并不完美

1.07.59-1.08.08

yeah  I have to think about it 

emm，我必须要去思考下你说的这个问题

1.08.08-1.08.15

what one certainly one way  it is not perfect

这确实是一种不完美的方式

1.08.15-1.08.22

 is that if you if you don't execute some code， the race detector doesn't know anything about it 

如果你不执行某段代码的话，那确实race检测器就根本检测不出什么问题

1.08.22-1.08.27

so it's not analyzing it's not doing static analysis

So，检测器并不会去进行静态分析

1.08.27-1.08.32

the racing dectors not looking at your source and making decisions based on the source

race检测器不会去检查你的源码，也不会根据你的源码做出某些判断

1.08.32-1.08.36

 it's sort of watching what happened at on this particular run of the program 

它会去观察程序中某个部分运行时的状态

1.08.36-1.08.43

and so if this particular run of the program didn't execute some code that happens to read or  write shared data 

如果这个程序不执行这段代码，即这段要去读取或者写入共享数据的代码

1.08.43-1.08.45

then the race detector will never know 

那么race检测器就永远不知道这里发生了什么

1.08.45-1.08.47

and there could be erased there 

那么这里就有可能被忽略

1.08.47-1.08.49

so that's certainly something to watch out for 

所以这是我们要注意的地方

1.008.49-1.08.56

so you know if you're serious about the race detector you need to set up sort of testing apparatus ，that tries to make sure all the code is executed 

在使用race检测器时，你们需要建立某些测试标准，以此来试着让所有的代码都被执行

1.08.56-1.08.59

but it's very good

但总而言之，race检测器还是非常优秀的

1.08.59-1.09.02

and you just have to use it for your labs

你们会在你们的lab中用到它

1.09.02-1.09.05

okay 



1.09.05-1.09.07

so this is race here 

So，这就是race

1.09.07-1.09.09

and of course the race didn't actually occur 

当然，实际上race并没有发生

1.09.09-1.09.17

what the race detector did not see was the actual interleaving simultaneous execution of some sensitive code right

race检测器并没有看到那段代码在输出时连续交错打印的情况发生（知秋注：在分配线程的时候就会为其分配影子内存，程序执行时可能并不是同时进行的，所以不会看到这种交叉打印的情况）

1.09-.17-1.09.21

it didn't see two threads literally execute lines 43 and 44 at the same time

它并没有看到两条线程同时执行第43和44行的代码

1.09.21-1.09.25

and as we know from having run the things by hand that apparently doesn't happen

但我们知道我们去执行的时候，这种情况并没有发生

1.09.25-1.09.27

 only with low probability

它只有在很低的概率下才发生

1.09.27-1.09.30

 all it saw was at one point that was a right

但在某个时候，我们所看到的都是正确结果

1.09.30-1.09.33

and they made me much later there was a read with no intervening mark

可能在之后执行的过程中，会出现交错打印的情况（在没有锁标记的情况下）

1.09.33-1.09.43

in that sense it can sort of detect races that didn't actually happen or didn't really cause bugs

在这种情况下，race检测器所检测到的线程race实际并没有发生，或者说也没有引起bug

从这种意义上讲，race检测器可以检测出实际上没有发生或没有真正引起错误的race

1.09.43-1.09.45

okay



1.09.45-1.09.56

okay one final question about this crawler how many threads does it create

Ok，我们来看最后一个问题，在这个爬虫程序中，它创建了多少个线程

1.09.56-1.10.12

yeah and how many concurrent threads could there be yeah

在这里面有多少个并发线程呢？

1.10.20-1.10.29

so a defect in this crawler is that there's no obvious bound on the number of simultaneous threads that might create 

在这个爬虫中，其实我们并没有对可能创建的线程数量进行明显的限制

1.10.29-1.10.33

you know with the test case which only has five URLs big whoopee 

在测试案例中，我们只有5个URL

1.10.33-1.10.38

but if you're crawling a real web with you know I don't know are there billions of URLs out there maybe not

但如果我们去对一个真实的网站进行爬取，它里面可能有十亿条URL

1.10.38-1.10.43

 we certainly don't want to be in a position  where the crawler might accidentally create billions of threads

不过我们并不想陷入突然创建十亿个线程的这种情况

1.10.43-1.10.46

because you know thousands of threads it's just fine

因为你们知道，数千个线程可能没啥问题

1.10.46-1.10.48

 billions of threads it's not okay

但如果是十亿个线程，那就不ok了

1.10.48-1.10.52

because each one sits on some amount of memory 

因为每个线程都占用了一定的内存

1.10.52-1.10.56

so a you know there's probably many defects in real life for this crawler 

当我们在实际生活中使用这个爬虫的时候，这里面可能存在许多缺陷

1.10.56-1.11.01

but one at the level we're talking about is that it does create too many threads 

但我们讨论过的其中一个原因就是，它创建了太多线程

1.11.01-1.11.05

and really ought to have a way of saying well you can create 20 threads  or 100 threads or a thousand threads，but no more

我们应该对创建线程数进行限制，你可以创建20个，100个或者1000个线程，但更多就不行了

1.11.05-1.11.10

so one way to do that would be to pre create a pool a fixed size pool of workers 

其中一种解决方式就是提前创建一个固定大小的worker池

1.11.10-1.11.19

and have the workers just iteratively look for another URL to crawl crawl that URL rather than creating a new thread for each URL okay 

通过复用worker来抓取url，而不是每抓取一个URL就去创建一个新的线程

1.11.19-1.11.29

so next up I want to talk about a another crawler that's implemented and a significantly different way using channels instead of shared memory

So，接下来我想讨论另一种爬虫实现，它是通过channel来实现而不是通过共享内存，在实现上它们的区别很大

1.11.29-1.11.37

 it's a member on the mutex call or I just said there is this table of URLs that are called that's shared between all the threads and asked me locked

在共享内存的实现中，我刚说过，所有线程都共享了一个管理了urls的map，在使用时会进行锁操作


1.11.37-1.11.42

 this version does not have such a table does not share memory 

但是在channel的版本中，我们并不会用到这个map，也不会去共享内存

1.11.42-1.11.45

and does not need to use locks 

更不需要去用到锁

1.11.45-1.11.50

okay 


1.11.50-1.11.59

so this one the instead there's basically a master thread that's his master function on 86  and it has a table 

基本上来讲，这里有一个主线程，在第86行处，它有一个map

1.11.59-1.12.03

but the table is private to the master function

但这个map是这个master函数所私有的

1.12.03-1.12.15

and what the master function is doing is instead of sort of basically creating a  tree of functions that corresponds to previous crawler did 

master函数所做的并不是像之前那个爬虫程序那样通过一系列类似树状的函数调用来对网络路径图进行抓取

1.12.15-1.12.22

this one fires off one Goroutine per URL that it's fetches 

之前那个爬虫例子，它每抓取一个URL就会启动一个Goroutine

1.12.22-1.12.27

and that but it's only the master only the one master that's creating these threads 

但在这个例子中，它只有一个master会去创建这些线程

1.12.27-1.12.32

so we don't have a tree of functions creating threads we just have the one master 

So，我们并不会通过树状函数来创建这些线程，而是只通过这个master来做

1.12.32-1.12.35

okay 


1.12.35-1.12.37

so it creates its own private map a line 88

master在第88行创建了它自己的map

1.12.37-1.12.39

 this record what it's fetched 

这个map中记录了它所抓取的URL

1.12.39-1.12.43

and then it also creates a channel 

然后它也创建了一个channel

1.12.43-1.12.47

just a single channel that all of its worker threads are going to talk to 

所有的worker线程都会和这个单个channel进行通信

1.12.47-1.12.51

and the idea is that it's gonna fire up a worker thread 

其背后的思路就是启动一个worker线程

1.12.51-1.12.59

and each worker thread that it fires up when it finished such as fetching the page will send exactly one item back to the master on the channel 

启动的每个worker 线程在工作（例如，提取页面）结束后都会将一个确切的item通过channel发送回 master

1.12.59-1.13.06

and that item will be a list of the URLs in the page that worker thread fetched 

并且item也就是worker线程所获取的page中URL的列表


1.13.06-1.13.09

so the master sits in a loop

So，在这个master中有一个循环

1.13.09-1.13.14

 we're in line eighty nine is reading entries from the channel 

在第89行，我们从channel中读取数据

1.13.14-1.13.21

and so we have to imagine that it's started up some workers in advance

SO，想象一下有这么一个场景，我们需要提前启动一些worker线程

1.13.21-1.13.24

and now it's reading the information the URL lists that those workers send back

现在，它读取到了这些worker所返回的URL列表信息

1.13.24-1.13.35

and each time he gets a URL is sitting on land eighty nine it then loops over the URLs in that URL list from a single page fetch at line 90

每次他都会在第89行去爬一个URL，然后从第90行的单个页面获取该URL列表中的URL

1.13.35-1.13.38

and if the URL hasn't already been fetched

如果这个URL并没有被抓取

1.13.38-1.13.43

 it fires off a new worker at line 94 to fetch that URL 

它就会在第94行启动一个新的worker去抓取这个URL


1.13.43-1.13.47

and if we look at the worker code online starting line 77

如果我们看下从第77行起的worker代码

1.13.47-1.13.53

basically calls his fetcher  and then sends a message on the channel a line 80 or 82

这里面它调用了fetcher，接着在第80或82行处将信息发送给channel

1.13.53-1.13.56

 saying here's the URLs in the page they fetched

并表示这是它们在页面上所抓取的URL

1.13.56-1.14.08

and notice that now that the maybe interesting thing about this is that the worker threads don't share any objects

注意一下，此处有一件事可能令我们比较感兴趣，那就是worker线程并不共享任何对象

1.14.08-1.14.11

there's no shared object between the workers  and the master 

在worker和master之间不存在任何共享对象

1.14.11-1.14.12

so we don't have to worry about locking 

So我们无须去关心锁相关的问题

1.14.12-1.14.14

we don't have to worry about races

我们也无须关心线程争抢的问题

1.14.14-1.14.22

 instead this is a example of sort of communicating information instead of getting at it through shared memory 

So这就是一个通过channel来交流信息的例子，它并不是不是通过共享内存来实现

1.14.22-1.14.23

yes



1.14.36-1.14.44

yeah yeah so the observation is that the code appears  but the workers are the observation is the workers are modifying ch while the Masters reading it 

我们观察结果是，当master在读取channel时，worker会去修改channel

1.14.44-1.14.53

and that's not the way the go authors would like you to think about this

Go作者并不想让你们去这样思考

1.14.53-1.14.56

 the way they want you to think about this is that CH is a channel 

他们想让你这样思考，ch是一个channel

1.14.56-1.14.59

and the channel has send and receive operations 

channel具有发送和接收这两个操作

1.14.59-1.15.05

and the workers are sending on the channel while the master receives on the channel 

worker线程会往channel中发送信息，然后master则是从channel中获取信息

1.15.05-1.15.7

and that's perfectly legal

这完全合情合理

1.15.07-1.15.11

 the channel is happy

channel对此也会很高兴

1.15.11-1.15.14

 I mean what that really means is that the internal  implementation of channel has a mutex in it 

我真正想说的是在channel的内部实现中，它里面有一个mutex

1.15.14-1.15.25

and the channel operations are careful to take out the mutex when they're messing with the channels internal data to ensure that it doesn't actually have any races in it 

channel 操作通过在内部维护一个锁来保证多个线程使用它时不会发生任何races

1.15.25-1.15.29

but yeah channels are sort of protected against concurrency 

channel就是用来保护变量以应对并发场景

1.15.29-1.15.32

and you're allowed to use them concurrently from different threads 

在并发的情况下，Go允许你们在不同线程间使用channel

1.15.32-1.15.33

yes

请问

1.15.50-1.15.55

we don't need to close the channel

我们不需要关闭channel

1.15.55-1.16.03

 I mean okay the the break statement is about when the crawl has completely finished  and we fetched every single URL right 

我的意思是，当爬虫已经完全完成了它的工作时，即我们抓取了每一条URL，我们就会使用break语句


1.16.03-1.16.10

because hey what's going on is the master is keeping I mean this n value is private value 

我想说的是这个n是个私有值

1.16.10-1.1615

and a master every time it fires off a worker at increments the n

master每启动一个worker线程，n就会加1

1.16.15-1.16.20

 though every worker it starts since exactly one item on the channel 

每个worker都会往channel中发送一个item

1.16.20-1.16.24

and so every time the master reads an item off the channel it knows that one of his workers is finished 

So，每当master从channel中读取到一个item时，master就知道其中一个worker完成了它自身的任务

1.16.24-1.16.26

and when the number of outstanding workers goes to zero 

当n变为0时

1.16.26-1.16.29

then we're done

那我们的工作就结束了了

1.16.29-1.16.34

 and we don't once the number of outstanding workers goes to zero

一旦worker的数量变为0

1.16.34-1.16.41

then the only reference to the channel is from the master or from oh really from the code that calls the master，

那么这个channel就只有master在引用

1.16.41-1.16.45

and so the garbage collector will very soon see that the channel has no references to it

垃圾收集器就会发现这点，即没有其他东西去引用这个channel了



1.16.45-1.16.47

and will free the channel

它就会将这个channel释放掉

1.16.47-1.16.54

 so in this case sometimes you need to close channels，but actually I rarely have to close channels 

某些情况下，你们需要去关闭channel，但实际上我很少去关闭channel

1.16.54-1.16.58

question

请问


1.17.11-1.17.13

so the question is alright  so you can see at line 106 

你们可以看到在第106行

1.17.13-1.17.17

before calling master

在调用master之前

1.17.17-1.17.22

 concurrent channel sort of fires up one shoves one URL into the channel 

ConcurrentChannel会先发送一个url到channel中

1.17.22-.17.27

and it's to sort of get the whole thing started

这是为了让所有的工作开始进行

1.17.27-1.17.31

because the code for master was written you know the master goes right into reading from the channel line 89 

因为这段代码是为了master而写的，你们知道，在第89行处master才会去读取channel中的信息

1.17.31-1.17.33

so there better be something in the channel

So，最好有些东西在channel里面

1.17.33-1.17.36

 otherwise line 89 would block forever 

不然在第89行，我们就会一直堵塞下去

1.17.36-1.17.39

so if it weren't for that little code at line 107 

如果在第107行没有这段代码的话

1.17.39-1.17.44

the for loop at 89 would block reading from the channel forever 

那么第89行的for循环就会在读取channel信息时一直卡住

1.17.44-1.17.46

and this code wouldn't work 

这段代码也就没法工作了

1.17.46-1.17.46

well yeah 

请问

1.17.53-1.18.01

so the observation is gosh you know wouldn't it be nice to be able to write code that would be able to notice if there's nothing waiting on the channel 

如果能写些代码来让master注意到目前在channel上没有任何东西，这不会很nice吗

1.18.01-1.18.05

and you can if you look up the Select statement it's much more complicated than this 

确实可以这么做，如果你看下select语句，它要远比这个复杂得多

1.18.05-1.18.11

but there is the Select statement which allows you to proceed to not block, if there's nothing waiting on the channel

但在select语句中，如果channel上没有什么等待的东西的话，它就允许你在不阻塞的情况下继续处理

1.18.11-18.47

because the worker hasn't finish 

因为worker并没有结束工作

1.18.47-1.19.07

okay sorry to the first question is there I think  what you're really worried about is whether we're actually able to launch parallel

抱歉，打断一下，你问的第一个问题是，我们实际是否能够并行启动

1.19.07-1.19.09

so the very first step won't be in parallel 

在最开始，我们并不会并行

1.19.09-1.19.16

Well，we dont receive the results

Well，我们并没有接收到结果




1.19.36-1.19.40

nono  the for-loop waits in at line 89

for循环会在第89行处等待

1.19.40-1.19.42

that's not okay 

好吧，我来解释下

1.19.42-1.19.49

that for loop at line 89 is does not just loop over the current contents of the channel and then quit 

第89行处的for循环所做的并不仅仅是对当前channel中的内容进行处理，然后离开

1.19.49-1.20.01

that is the for loop at 89 is going to read it may never exit，but it's gonna read it's just going to keep waiting until something shows up in the channel

 第89行的for循环要做的是进行读取，并且它可能永远不会结束，它会等，直到channel中有东西出现时，对channel进行读取

1.20.01-1.20.05

so if you don't hit the break at line 99 the for loop wont exit 

如果你无法触发第99行的break，那么这个for循环就不会结束

1.20.05-1.20.11

yeah alright I'm afraid we're out of time 

我想时间差不多了，我们该下课了

1.20.11-end

we'll continue this actually we have a presentation scheduled by the TAS which I'll talk more about go

之后我会让助教们安排一场关于Go的讲座，到那时我会和你们再多聊点跟Go相关的内容







六十七  阅举报
