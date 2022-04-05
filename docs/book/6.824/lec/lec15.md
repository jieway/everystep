15-01
0.07-0.14

all right today we're going to talk about spark

All right，今天我们要讨论的内容是Spark

0.14-0.20

 spark say essentially a successor to MapReduce 

本质上来讲，Spark是MapReduce的后继产物

0.20-0.25

you can think of it as a kind of evolutionary step in MapReduce

你可以将其认为是MapReduce一种演进版本

0.25-0.29

 and one reason we're looking at it is

我们研究Spark的其中一个理由是

0.29-0.32

 that it's widely used today for data center computations

它被广泛运用在数据中心的计算任务中

0.32-0.36

 that's turned out to be very popular and very useful 

事实证明，它非常流行且非常有用

0.38-0.40

one interesting thing  it does 

它做了一件令我们很感兴趣的事情

0.40-0.41

which will pay attention to is 

并且这也是我们关注的重点

0.41-0.44

that it it generalizes the kind of two stages of MapReduce

那就是，它对MapReduce中的两个阶段进行了总结

0.44-0.52

 the mapreduce into a complete notion of multi-step data flow graphs 

它将MapReduce总结为一个多步骤数据流图的概念

0.52-0.59

that and this is both helpful for flexibility for the programmer 

对于程序员来说，这很便利

0.59-1.00

it's more expressive

这更具表达力

1.00-1.10

 and it also gives the system the spark system a lot more to chew on when it comes to optimization and dealing with faults dealing with failures

在应对优化以及处理故障方面，这让Spark系统有了更多解决的思路

1.10-1.13

and also from the programmers point of view 

从程序员的角度来讲

1.13-1.16

it supports iterative applications

它支持对应用程序进行迭代

1.16-1.21

 application said you know loop over the data effectively much better than MapReduce does

在遍历数据这块，Spark要比MapReduce来得更好

1.16-1.28

 you can cobble together a lot of stuff with multiple MapReduce applications running one after another

你可以将多个MapReduce应用程序整合在一起，让它们一个接一个地运行

1.28-1.34

but it's all a lot more convenient in  Spark

但在Spark中我们可以更加方便地做到这一点

1.34-1.35

 okay 



1.35-1.41

so I think I'm just gonna start right off with an example application

So，我觉得我应该用一段应用程序代码来进行讲解




1.41-1.45

 this is the code for PageRank 

这是一段PageRank的代码

1.45-2.00

and I'll just copy this code with a few changes from some sample source code in the spark source

我从Spark源码中抄了部分代码，并对它们做了一些小改动




2.00-2.05

 I guess it's actually a little bit hard to read let me just give me a second  try to make it bigger

我猜你们读起来有点困难，我调整一下，这样你们就能看清楚了

2.14-2.15

all right



2.15-2.17

 okay 



2.17-2.19

so if this is too hard to read

So，如果你们还是看不清的话

2.19-2.21

there's a copy of it in the notes 

在笔记中我放了一份，你们可以去看那个

2.21-2.27

and it's an expansion of the code in section 3.2.2 in the paper

这是paper第3.2.2节中代码的衍生版本

2.27-2.32

a pagerank which is a algorithm that Google uses

PageRank是谷歌使用的一个算法

2.32-2.41

 pretty famous algorithm for calculating how important different web search results are

它是用来计算不同网页搜索结果重要性的一个非常著名的算法

2.41-2.43

 what PageRank is trying to do

PageRank所试着做的事情是

2.43-2.52

well actually PageRank is sort of widely used as an example of something that doesn't actually work that well and MapReduce 

PageRank被广泛应用于那些MapReduce无法处理的情况

2.52-2.53

and the reason is that

这样做的理由是

2.53-3.00

PageRank involves a bunch of sort of distinct steps and worse PageRank involves iteration 

PageRank涉及了许多不同的步骤，更糟糕的是，它涉及了遍历

3.00-3.01

there's a loop in it

它里面有一个循环

3.01-3.03

that's got to be run many times 

这个循环得运行很多次

3.03-3.07

and MapReduce just has nothing to say about iteration

对于遍历这块，MapReduce没有什么要讲的




3.07-3.22

 the input the PageRank for this version of PageRank is just a giant collection of lines one per link in the web 

PageRank这个版本中的输入元素是一个巨大的集合，它里面放着很多网页链接

3.22-3.24

and each line then has two URLs 

每一行包含了2个URL

3.24-3.30

the URL of the page containing a link and the URL of the link that that page points to 

该网页的URL中包含了一个链接，这个链接代表的URL又指向了一个page

3.30-3.39

and you know if the intent is that you get this file from by crawling the web  and looking at all the all collecting together all the links in the web's 

你知道的，我们通过爬取网页来获取这个文件，该文件中包含了该网页中所有的链接

3.39-3.41

the input is absolutely enormous

毋庸置疑，这个输入的大小非常庞大

3.41-3.49

 and as just a sort of silly little example for us 

对于我们来说，这是一个非常蠢的例子

3.49-3.51

from when I actually run this code

当我实际运行这段代码时

3.51-3.54

 I've given some example input here 

这里我已经给出了一些输入案例




3.54-3.59

and this is the way the input would really look it's just lines each line with two URLs 

输入元素就长这个样子，每一行上有两个URL

3.59-4.03

and I'm using u1 that's the URL of a page

这里我会使用u1，它是一个网页的URL

4.03-4.08

 and u3 for example as the URL of a link that that page points to

u3是该页面所指向的URL链接

u3是该页面中所指向的另一个页面所代表的URL链接

4.08-4.10

 just for convenience

出于方便起见

4.10-4.21

and so the web graph that this input file represents there's only three pages in it one two three 

So，这个输入文件所表示的web graph中只有3个网页，这里我用1，2，3来表示它们

4.21-4.25

I could just interpret the links there's a link from one two three

我来简单解释一下，这些链接来自1 2 3这三个页面




4.25-4.27

there's a link from one back to itself

1有一个指向它自己的链接

4.27-4.31

there's a web link from two to three

2上面有一个指向3的链接

4.31-4.33

there's a web link from two back to itself 

这里有一个指向2自身的链接




4.33-4.36

and there's a web link from three to one

3这里有一个指向1的链接

4.36-4.39

 just like a very simple graph structure

这是一个非常简单的图结构

4.39-4.44

 what PageRank is trying to do

PageRank所试着做的事情是

4.44-4.47

it's you know estimating the importance of each page

它会去估算每个网页的重要性

4.47-4.47

 what that really means is

这意味着

4.47-4.56  ***

that it's estimating the importance based on whether other important pages have links to a given page

它是根据其他重要页面是否具有指向给定页面的链接来估计重要性的

4.56-4.58

 and what's really going on here is

这里所发生的事情是

4.58-5.07- *****

this kind of modeling the estimated probability that a user who clicks on links will end up on each given page

这种模型可以估算用户点击链接到达每个给定页面的可能性

5.07-5.09

so it has this user model

So，它有一个用户模型

5.09-5.21

 in which the user has a 85 percent chance of following a link from the users current page following a randomly selected link from the users current page to wherever that link leads 

用户有85%的可能性会从当前页面随机选一个链接跳转到该链接对应的页面

5.21-5.27

and a 15% chance of simply switching to some other page even though there's not a link to it 

用户还有15%的可能性会切换到另一个页面，哪怕当前页面上没有指向该页面的链接

5.27-5.34

as you would if you you know entered a URL directly into the browser

比如你直接在浏览器上输入一个URL链接

5.34-5.37

and the idea is that

这里的思路是

5.37-5.54

 the pagerank algorithm kind of runs this repeatedly it sort of simulates the user looking at a page and then following a link and kind of adds the from pages importance to the target pages importance

PageRank算法会反复模拟用户查看网页并按照链接跳转的行为，以此提高目标页面的重要性

5.54-5.55

and then sort of runs this again 

然后，再次运行它

5.55-6.07

and it's going to end up in the system like pagerank on spark it's going to kind of run this simulation for all pages in parallel literately

像Spark上的PageRank一样，它会有针对性地并行地对所有页面运行此模拟

6.07-6.13

the idea is that

这里的思路是

6.13-6.23 ！！！！！

 it's going to keep track the algorithms gonna keep track of the page rank of every single page or every single URL and update it as it sort of simulates random user clicks

该算法会去跟踪每个页面或者每个URL的pagerank值，在模拟随机用户对其点击时，对该值进行更新

6.23-6.29

 I mean that eventually that those ranks will converge on kind of the true final values

我的意思是，这些rank值最终会在真实值上收敛

我的意思是，这些rank值最终会收敛于某个真实的值

6.29-6.32

 now because it's iterative

因为它是通过遍历来做的

6.32-6.37

 although you can code this up in MapReduce

虽然你也可以在MapReduce中编写这样的代码

6.37-6.38

 it's a pain

但这太伤了

6.38-6.40

 it can't be just a single MapReduce program

我们不可能通过单个MapReduce程序做到这些事情

6.40-6.49

 it has to be multiple you know multiple calls to a MapReduce application

你知道的，这需要对MapReduce应用程序进行多次调用

6.49-6.53

 where each call sort of simulates one step in the iteration

每次调用都好似遍历时的其中一步（知秋注：比如对集合{a,b,c}遍历，单个 MapReduce的调用就好比是遍历到a这一步所包含的操作）

6.53-6.55

 so you can do in a MapReduce 

So，你可以通过MapReduce来做到这点

6.55-6.56

but it's a pain

但这很伤

6.56-6.58

 and it's also kind of slow

而且速度也很慢

6.58-7.01

because MapReduce it's only thinking about one map and one reduce 

因为在MapReduce中，它思考的只是一个Map操作和一个Reduce操作

7.01-7.07

and it's always reading its input from the GFS from disk and the GFS filesystem 

它总是从磁盘上的GFS文件系统中读取它的输入元素

7.07-7.13

and always writing its output which would be this sort of updated per page ranks

并写出它的输出元素，即更新后的每个PageRank值

7.13-7.19

every stage also writes those updated per page ranks to files in GFS also

在每个阶段，它会将更新后的每个PageRank值写入到GFS的文件中

7.19-7.25

 so there's a lot of file i/o，if you run this as sort of a sequence of MapReduce applications

如果你使用多个MapReduce程序来做的话，那就会产生大量的文件I/O

7.25-7.28

all right



7.28-7.35

 so we have here there's an a PageRank code that came with  a spark

So，这里我们所展示的是Spark中的PageRank代码实现

7.35-7.37

 I'm actually gonna run it for you

实际上我会向你们展示下运行情况

7.37-7.45

I'm gonna run the whole thing for you this code shown here on the input that I've shown just to see what the final output is 

我会向你们展示下这段代码的运行情况，这里我会使用我给出的元素来作为输入，然后我们来看看最终的输出结果是怎样的

7.45-7.54

and then I'll look through and we're going to step by step and show how it executes 

接着，我会向你们逐步演示它是如何执行的




7.54-8.04

alright so here's the you should see a screen share now at a terminal window

So，你们现在应该能看到屏幕上有一个terminal窗口

8.04-8.06

 and I'm showing you the input file 

我正在向你们展示的是输入文件

8.06-8.12

then I got a hand to this PageRank program and now

接着，我要将这个文件传给PageRank程序

8.12-8.19

 here's how I read it I've you know I've downloaded a copy of spark to my laptop

我之前就已经将Spark下载到我的笔记本上了

8.19-8.23

 it turns out to be pretty easy

事实证明，下载起来很容易

8.23-8.24

 and if it's a precompiled version of it 

如果你下载的是预编译版本

8.24-8.29

I can just run it just runs in the Java Virtual Machine

那么我就可以在JVM上运行它

8.29-8.30

 I can run it very easily

我可以很轻松地运行它

8.30-8.36

 so it's actually doing downloading spark and running simple stuff turns out to be pretty straightforward

So，实际上它正在下载Spark，并运行一些简单的东西，事实证明，这操作起来还是很简单的

8.36-8.41

 so I'm gonna run the code that I show with the input that I show

So，现在我来执行下代码，这里我们所使用的输入就是我之前所展示的




8.41-8.46

 and we're gonna see a lot of sort of junk error messages go by

我们会看到一大堆垃圾错误信息

8.46-.53

 but in the end support runs the program and prints the final result

但最终它会去执行程序，并打印出最终结果

8.53-8.55

 and we get these three ranks for the three pages I have

这里我们就拿到了这三个页面所对应的rank值

8.55-9.00

 and apparently page one has the highest rank

很明显，页面1的rank值最高

9.00-9.07

and I'm not completely sure why 

我并不能完全确定为什么是这样

9.07-9.09

but that's what the algorithm ends up doing

但这是程序最终给我们生成的结果

9.09-9.12

so you know of course we're not really that interested in the algorithm itself

So，你知道的，我们对算法本身并不感兴趣

9.12-9.19

so much as how Spark execute it

So，我们感兴趣的是Spark是如何执行它的

9.19-9.24

all right



9.24-9.30

 so I'm gonna hand to understand what the programming model is in spark

So，我们要去理解Spark中的编程模型是什么

9.30-9.34

 because it's perhaps not quite what it looks like

因为你可能对它不是特别了解

9.34-9.42

 I'm gonna hand the program line by line to the Spark interpreter 

我们将程序逐行传入Spark解释器中

9.42-9.46

so you can just fire up this spark shell thing 

So，我们可以启动下Spark shell

9.46-9.50

and type code to it directly

直接在这里面输入代码

9.50*-10.00

so I've sort of prepared a version of the MapReduce program that I can run a line at a time here 

So，我已经准备了一个特殊版本的MapReduce程序，我可以一次执行一行代码




10.00-10.05！！！

so the first line is this 

So，第一行代码长这样

10.05-10.09

line in which it reads the or asking Spark to read this input file

这行代码的意思是，我们让Spark去读取输入文件

10.09-10.14

 and it's you know the input file I showed with the three pages in it

你知道的，我所展示的这个输入文件里面包含了3个页面

10.14-10.17

okay



10.17-10.19

so one thing there notice here is

这里我们要注意的一个东西就是

10.19-10.22

is that when Spark reads a file

当Spark读取一个文件时

10.22-10.34

what is actually doing is reading a file from a GFS like distributed file system and happens to be HDFS the Hadoop file system

它实际所做的事情就是从GFS这样的分布式文件系统中读取一个文件，也可能碰巧使用的是Hadoop文件系统

10.34-10.37

 but this HDFS file system is very much like GFS 

HDFS文件系统和GFS非常相似

10.37-10.39

so if you have a huge file

So，如果你有一个大型文件

10.39-10.44

as you would with got a file with all the URLs all the links and the web on it

这个文件里面放着所有的URL，所有的链接和网页

10.44-10.50

HDFS is gonna split that file up among lots and lots you know bite by chunks

HDFS会将这个文件拆分成很多个Chunk

10.50-10.53

 it's gonna shard the file over lots and lots of servers

它会对文件进行分片，并将它们分散到很多个服务器上

10.53-10.56

 and so what reading the file really means is

So，读取文件意味着

10.56-11.04

 that spark is gonna arrange to run a computation on each of many many machines 

Spark会让很多台机器参与计算

11.04-11.09

each of which reads one chunk or one partition of the input file

每台机器会去读取该输入文件中一个chunk或者一个分区的数据

11.09-11.10

 and in fact

事实上

11.10-11.19

 actually the system ends up or HDFS ends up splitting the file big files typically into many more partitions

实际上，HDFS最终会将大型文件拆分成很多个分区

11.19-11.29

then there are worker machines and so every worker machine is going to end up being responsible for looking at multiple partitions of the input files

这里就会有很多个worker机器，每个worker机器会负责读取该输入文件的多个分区

11.29-11.35

this is all a lot like the way map works in mapreduce 

这其实和MapReduce中的Map操作非常相似

11.35-11.38

okay so this is the first line in the program

So，这是程序中的第一行代码

11.38-11.44

and you may wonder what the variable lines actually hold

你可能会想知道这个变量lines中里面实际有哪些数据

11.44-11.46

 so printed the result of lines

So，我们打印一下lines的内容




11.46-11.48

 but what the lines points to

这里lines指向的是

11.48-11.50

 it turns out that 

事实证明

11.50-11.57

even though it looks like we've typed a line of code that's asking the system to read a file

虽然我们这里输入一行代码，这看起来是要求系统去读取一个文件

11.57-11.57

 in fact

事实上

11.57-11.59

it hasn't read the file

它还没有去读取文件

11.59-12.00

and won't read the file for a while 

暂时它也不会去读取文件

12.00-12.10

what we're really building here with this code  what this code is doing is not causing the input to be processed

我们这里输入的这行代码并不会去对输入文件进行处理

12.10-12.14

instead，what this code does is builds a lineage graph

相反，这行代码所做的其实是去构建一个lineage graph

12.14-12.18

it builds a recipe for the computation we want

它会为我们想进行的计算建立一个模型




12.18-12.22

 like a little kind of lineage graph that you see in Figure three in the paper 

这有点像你们在paper里面的figure 3中所看到的lineage graph

12.22-12.29

so what this code is doing it's just building the lineage graph building the computation recipe and not doing the computation

So，这段代码实际做的就是去构建lineage graph和计算方案，而不是去进行计算

12.29-12.37

when the computations only gonna actually start to happen once we execute what the paper calls an action

只有当我们调用action的时候，我们才会真正开始进行计算

12.37-12.49

which is a function like collect for example to finally tell Spark oh look I actually want the output now please go and actually execute the lineage graph 

比如我们调用的collect函数，当我们调用它的时候，它就会告诉Spark，Oh，我想知道输出结果是什么，请去执行下这个lineage graph

12.49-12.51

and tell me what the result is

并告诉我结果是什么

12.51-12.57

so what lines holds is actually a piece of the lineage graph not a result 

So，lines中实际保存的其实是lineage graph中的一部分，而不是结果

12.57-13.03

now in order to understand what the computation will do，when we finally run it

So，为了要了解我们运行这段代码时会如何计算

13.03-13.19

 we could actually ask spark at this point，we can ask the interpreter to please go ahead and tell us what you know I actually execute the lineagegraph up to this point and tell us what the results are

此时我们会让Spark解释器去执行这个lineage graph，并告诉我们执行结果是什么

13.19-13.22

so and you do that by calling an action

So，我们可以通过调用Spark中的action触发计算动作来做到这点




13.22-13.28

I'm going to call collect which so just prints out all the results of executing the lineage graph so far 

So，这里我会去调用collect()来触发并打印出当前执行的lineage graph的所有结果

13.28-13.34

and what we're expecting to see here is you know all we've asked it to do so far 

这里我们所希望看到的就是我们当前让它做的所有事情

13.34-13.37

the lineage graph just says please read a file

该lineage graph表示，请读取一个文件

13.37-13.40

so we're expecting to see that the final output is just the contents of the file

So，我们所期望看到的结果就是该文件的内容




13.40-13.44

and indeed that's what we get

确实，这就是我们要拿到的数据

13.44-13.58！！！！！

and what this lineage graph this one transformation lineage graph is results in is just the sequence of lines one at a time

lineage graph会去读取该文件中每一行中的数据

lineage graph通过这个Transformation操作一次得到多行数据结果

13.58-14.03

 so it's really a set of lines a set of strings 

So，它其实就是由每一行字符串数据所组成的集合

14.03-14.04

each of which contains one line of the input

它里面包含了该输入数据文件中每一行的数据

14.04-14.07

 alright so that's the first line of the program

So，这就是该程序中第一行代码所做的事情

14.07-14.21

 the second line is is collect essentially just just-in-time compilation of the symbolic execution chain

我想问一下，通过collect是不是就是对该调用链执行JIT编译

275

14.21-14.24

 yeah yeah yeah yeah that's what's going on

说的没错，这就是这里所发生的事情

14.24-14.26

 so what collect does is

So，这里collect所做的事情就是

14.26-14.29

 it actually huge amount of stuff happens

实际上，这里发生了很多事情

14.29-14.31

 if you call collect

如果你调用collect

14.31-14.40

it tells spark to take the lineage graph and produce java bytecodes that describe all the various transformations

它会让Spark对这个lineage graph进行处理并生成Java字节码，用来描述所有不同的Transformation

14.40-14.43

 you know which in this case it's not very much since we're just reading a file 

在这个例子中，它所生成的Java字节码的量并不大，因为这里我们只是在读取文件

14.43-14.46

but so Spark well when you call collect

So，当你调用collect时

14.46-14.51

Spark well figure out where the data is you want by looking HDFS

通过查看HDFS，Spark会去找到你想要找的数据

14.51-14.58

 it'll you know just pick a set of workers to run to process the different partitions of the input data

它会去让一组worker来处理该输入数据的不同分区

14.58-15.01

 it'll compile the lineage graph 

它会对lineage graph进行编译

15.01-15.05

and each transformation in the lineage graph into java bytecodes 

它会将lineage graph中的每个transformation编译为Java字节码

15.05-15.09

it sends the byte codes out to the all the worker machines that spark chose

它会将这些字节码发送给Spark所选择的所有worker机器上

15.09-15.13

 and those worker machines execute the byte codes

这些worker机器就会去执行这些字节码

15.13-15.16

 and the byte codes say 

这些字节码的大致意思是

15.16-15.20

oh you know please read tell each worker to read it's partition at the input

它会告诉每个worker去读取输入数据中它们各自所负责的那部分分区并将数据进行收集

它会告诉每个worker去读取它所负责的那个分区输入数据

15.20-15.30

and then finally collect goes out and fetches all the resulting data back from the workers 

接着，我们从这些worker中取回所有处理完的数据

15.30-15.34

and so again none of this happens until you actually wanted an action

So，直到你去调用某个action算子时，它们才会去执行这些操作

15.34-15.37

 and we sort of prematurely run collect now

我们现在早早地调用了collect

15.37-15.38

 you wouldn't ordinarily do that

一般情况下，你不会这么做

15.38-15.43

 I just because I just want to see what the the output is to understand what the transformations are doing 

这里是因为我想去看下输出结果是什么，以便理解这些transformation操作做了什么

15.43-15.45

okay




15.45-15.56

if you look at the code that I'm showing the second line is this map call 

如果你看下我所展示的第二行代码，这里是调用了map

15.56-16.04

so the leave so line sort of refers to the output of the first transformation

So，这里的lines指代的是第一个transformation的输出结果

16.04-16.08

 which is the set of strings correspond to lines in the input

这组字符串对应着输入文件中每一行

16.08-16.10

we're gonna call map

这里我们会调用map

16.10-16.12

we've asked the system call map on that

我们会在lines上调用map

16.12-16.16

and what map does is it runs a function over each element of the input 

map所做的事情就是，它会调用一个函数来对输入数据中的每个元素进行处理

16.16-16.19

that is in this case or each line of the input

在这个例子中，每个元素指的就是输入文件中的每一行




16.19-16.28

and that little function is the S arrow whatever which basically describes a function that calls the split function on each line

map里面调用了一个split函数来对每一行数据进行处理

16.28-16.36

 split just takes a string and returns a array of strings broken at the places where there are spaces 

我们往split中传入一个以空格来切分字符串的正则表达式，然后得到一个字符串数组

16.36-16.40

and the final part of this line that refers to parts 0 & 1 

最后一部分就是直接去拿这个数组的parts(0)和parts(1)中的数据




16.40-16.51

says that print line of input we want to at the output of this transformation be the first string on the line and then the second string of the line 

这里表示，这个transformation的输出结果中第一部分是这一行中第一个字符串，第二部分则是第二个字符串

这一行打印语句所表示的意思是，这个transformation操作的输出结果由两部分组成，第一部分是它所处理的这一行数据中的第一个字符串，第二部分则是该行的第二个字符串



16.51-16.57

so we're just doing a little transformation to turn these strings into something that's a little bit easier to process 

So，这里我们只是做了些小转换以便能更容易地处理这些字符串

16.57-17.00

and again at a curiosity

出于好奇




17.00-17.07

I'm gonna call collect on links one just to verify that we understand what it does

我在links1上也调用了collect，这只是为了验证我们是否理解它所做的事情




17.07-17.12

 and you can see where as lines held just string lines

你可以看到，lines中保存的是一个个字符串行

17.12-17.18

 links one now holds pairs of strings of from URL and to URL

links1中保存的是String pairs数组，一个String pair是由两个URL组成，即From URL和To URL

17.18-17.20

one for each link 

一个pair代表一个跳转链接

17.20-17.27

and when this executes this map executes

当执行这个map操作的时候

17.27-17.32

it can execute totally independently on each worker on its own partition of the input 

每个worker可以独立处理该输入文件它所负责的那个分区

17.32-17.34

because it's just considering each line independently

因为它认为每一行都是独立的

17.34-17.39

there's no interaction involved between different lines or different partitions

不同行或者分区间不存在任何交互

17.39-17.47

these are it's running if these this map is a purely local operation on each input record 

如果针对每个输入记录的这些map操作是一个纯粹的本地操作

17.47-17.50

 so can run totally in parallel on all the workers on all their partitions

So，那么所有的worker就可以中它们所负责的那块分区做到并行处理



17.50-17.55

 ok 




17.55-17.59

the next line in the program is this called the distinct

程序中的下一行代码是去调用distinct

17.59-18.01

 and what's going on here is that

这里所发生的事情是

18.01-18.04

 we only want to count each link once

同一个链接我们只想数一次，即去掉重复的链接

18.04-18.09

 so if a given page has multiple links to another page 

So，在一个给定的页面上，如果存在着多个链接指向另一个相同页面

18.09-18.13

we want to only consider one of them for the purposes of PageRank 

我们只会记录其中一个用于PageRank计算

18.13-18.17

and so this just looks for duplicates

So，这其实这就是查找重复项

18.17-18.27

now if you think about what it actually takes to look for duplicates in a you know multi terabyte collection of data items

如果你思考下这种场景，即我们要在数TB大小的数据集中找到重复项

18.27-18.30

it's no joke

我并没有开玩笑

18.30-18.33

because the data items are in some random order in the input 

因为在输入数据中那些data item是以随机顺序进行排列的

18.33-18.41

and what distinct needs to do since replace each duplicated input with a single input 

distinct要将每个重复的输入元素替换为一个单个输入元素



18.41-18.47

distinct needs to somehow bring together all of the items that are identical

distinct需要通过某种方式将完全一样的item放在一起



18.47-18.49

and that's going to require communication

这就需要进行网络通信了

18.49-18.51

 remember that all these data is spread out over all the workers

要记住，所有这些数据是分散在所有的worker上的



18.51-18.56

we want to make sure that any you know that we bring we sort of shuffle the data around

我们会对数据进行shuffle处理

18.56-18.59

 so that any two items that are identical are on the same worker

So，这样的话，任何两个相同的item就会放在同一个worker上了

18.59-19.04

 so that that worker can do this I'll wait a minute there's three of these I'm gonna replace it these three with a single one

So，worker就可以对这些重复项进行处理，比如：它看到有3个重复项，那么它就会将这3个重复项替换为一个元素，即去重



19.05-19.06

I mean that means that 

这意味着

19.06-19.08

distinct when it finally comes to execute

当distinct最后执行的时候

当它最后去执行distinct的时候

19.08-19.12

 requires communication it's a shuffle

那就需要进行shuffle处理，这里面就需要进行网络通信

19.12-19.16

and so the shuffle is going to be driven by either hashing the items

So，我们会对item通过hash的方式来进行shuffle

19.16-19.19

the hashing the items to pick the worker that will process that item

我们通过对item进行hash来选出用于处理的worker

19.19-19.21

 and then sending the item across the network

接着，通过网络将这些item发送过去

19.21-19.34

or you know possibly you could be implemented with a sort or the system sort of sorts all the input and then splits up the sorted input over all the workers

或者，你也可以让系统对这些item进行排序，接着将排序好的输入元素拆分到所有的worker上

19.34-19.36

I'd actually don't know which it does

实际上，我不清楚它使用的是哪种做法

19.36-19.39

 but anyway I'm gonna require a lot of computation

但总之，这需要进行大量的计算

19.39-19.43

 in this case however almost fact nothing whatsoever happens

但在这个例子中，基本没有发生什么事情

19.43-19.45

 because there were no duplicates

因为并没有什么重复项存在

19.45-19.49

 and sorry whoops

不好意思弄错了




19.49-19.52

links2.collect()

links2.collect()

19.56-20.05

and the links2 which is the output a distinct is basically except for order identical to links1 

简单来讲，除了顺序以外，links2(即该distinct操作的处理结果)和links1中的数据是完全相同的

20.05-20.07

which was the input to that transformation

用于该Transformation操作的输入数据还是那些数据

20.07-20.08

and the orders change

只不过，数据的顺序也发生了改变

20.08-20.10

because of course it has to hash or sort or something 

因为这里使用了hash或者排序之类的处理

20.10-20.12

all right




20.12-20.21

the next transformation is is grouped by key 

下一个transformation操作是groupByKey

20.21-20.31

and here what we're heading towards is we want to collect all of the links

此处我们要做的是收集所有的链接

20.31-20.35

 it turns out for the computation with little C

这里我们用c来代表计算

20.35-20.38

 we want to collect together all the links from a given page into one place

我们想将一个给定页面上所有的链接都放在一个地方

20.38-20.46

 so the group by key is gonna group by it's gonna move all the records all these from two URL pairs 

So，groupByKey会根据URL pair中的from URL来对所有记录进行分组

20.46-20.48

it's gonna group them by the from URL 

它会通过from URL来对这些URL pair进行分组













五十九  阅举报
15-02
20.48-20.56

that is it's gonna bring together all the links that are from the same page 

它会将来自同一page的所有link放在一起



20.56-21.09

and it's gonna actually collapse them down into the whole collection of links from each page is gonna collapse them down into a list of links into that pages URL plus a list of the links that start at that page

实际上，它会将每个page上所有的link归纳到一个link集合中，该集合内包含了当前page的URL加上该page上的所有link

21.09-21.15

 and again this is gonna require communication 

再说一遍，这需要通信



21.15-21.21

although Spark I say Spark is clever enough to optimize this 

我说过Spark很智能，它足以去优化这一点

21.21-21.30

because the distinct already um put all records with the same from URL on the same worker 

因为distinct操作已经将所有拥有相同from URL的记录交由同一个worker进行处理

21.30-21.36

the groupbykey could easily and may well just I'm not have to communicate at all

groupByKey就可以很容易地对它们进行处理，并且我根本就不需要进行网络通信了

21.36-21.41

 because it can observe that the data is already grouped by the from URL key 

因为它可以观察到这些数据已经根据from URL这个key分好组了

21.41-21.42

all right 

===================================================================

21.42-21.44

so let's print links3

So，我们来打印下links3中的内容




21.44-21.52

let's run collect  actually drive the computation  and see what the result is

我们来调用下collect进行计算并看下它的结果是什么




21.52-21.59

and indeed what we're looking at here is an array of tuples

这里我们所看到的是一个tuple数组

21.59-22.02

where the first part of each tuple is the URL the from page

每个tuple的第一部分是由from page这个URL所构成

22.02-22.07

and the second is the list of links that start at that front page 

第二部分则是该page上的所有link所组成的列表

22.07-22.10

and so you can see the u2 has a link to u2

So，你可以看到u2有两个link（u2和u3）

22.10-22.12

and u3 has a link to just u1

u3上只有一个link，即u1

22.12-22.17

 and u1 has a link 2 u1 & u3

u1上有两个link，即u1和u3

22.17-22.23

 okay



22.23-22.25

so that's links3

So，这就是links3中的内容了

22.25-22.31

now the iteration is going to start in a couple lines from here

Now，遍历是从这几行代码处开始的

22.31-22.33

 it's gonna use these things over and over again

它会去反复使用这些数据

22.33-22.53

 each iteration of the loop is going to use this this information in links 3 in order to sort of propagate probabilities in order to sort of simulate these user clicking I'm from from all pages to all other link to pages 

每次循环遍历的时候，它都会去使用links3中的信息来模拟这些用户点击链接的行为

22.53-22.57

so this length stuff is these links data is gonna be used over and over again 

So，这些links数据会被反复使用

22.57-22.59

and we're gonna want to save it

我们想要将这些数据保存起来

22.59-22.59

 it turns out that 

事实证明

22.59-23.02

each time I've called collect so far 

每当我调用collect时

23.02-23.05

Spark has re-execute the computation from scratch 

Spark会重新从头开始执行计算

23.05-23.14

so every call to collect I've made has involved Spark rereading the input file re running that first map rerunning the distinct 

So，每当调用collect时，Spark会重新读取输入文件，重新执行map操作以及distinct操作

23.14-23.15

and if I were to call collect again

如果我再次调用collect

23.15-23.18

 it would rerun this groupByKey 

它会重新执行这个groupByKey操作

23.18-23.26

we don't want to have to do that over and over again on sort of multiple terabytes of links for each loop iteration

我们并不想每次循环遍历的时候对这数TB大小的links数据反复做这种处理

23.26-23.28

 because we've computed it once

因为我们已经计算过一次了

23.28-23.31

 and it's gonna state this list of links is gonna stay the same

这个link列表中的数据是保持不变的

23.31-23.32

 we just want to save it and reuse it 

我们想要保存并复用它

23.32-23.39

so in order to tell Spark that look we want to use this over and over again 

So，为了告诉Spark去查看我们想反复使用这些数据

23.39-23.44

the programmer is required to explicitly what the paper calls persist this data 

用paper中的话讲，程序员需要显式持久化这些数据

23.44-23.48

and in fact

事实上

23.48-23.54

modern Spark the function you call not persist if you want to save in a memory but but it's called cache

在Spark中，如果你想将数据保存在内存中，你需要去要调用的函数叫做cache，而不是persist

23.54-24.07

and so links4 is just identical the links3 we accept with the annotation that we'd like Spark to keep links for in memory

So，links4的内容和links3的内容是完全相同的，我们想让Spark将这些数据保存在内存中

24.07-24.08

because we're gonna use it over and over again 

因为我们会反复使用这些数据

24.08-24.13

ok 



24.13-24.16

so that the last thing we need to do before the loop starts is 

So，在循环开始前，我们最后要做的事情是

24.16-24.22

we're gonna have a set of page ranks for every page indexed by source URL

我们要为按source URL索引的每个page设置一组PageRank

我们为每一个由source URL所代表的page来设置一组PageRank

24.22-24.28

and we need to initialize every page's rank

我们需要去初始化每个page的rank值

24.28-24.31

 it's not really ranks here it's kind of probabilities 

它并不是什么排名，而是某种概率之类的东西

24.31-24.34

we're gonna initialize all the probabilities to one

我们会将所有的概率初始化为1

24.34-24.39

so they all start out with a probability one with the same rank

So，它们一开始的概率都是1，即rank值都相同

24.39-24.45

 well we're gonna actually you code that looks like it's changing ranks

Well，这里我们所输入的代码看起来是在修改rank值

24.45-24.47

 but in fact 

但事实上

24.47-24.52

when we execute the loop in the code I'm showing

当我们执行代码中这部分循环的时候

24.52-24.56

it really produces a new version of ranks for every loop iteration

当每次循环遍历的时候，它会生成一个新版本的rank值

24.56-25.10

that's updated to reflect the fact that the code algorithm is kind of pushed page ranks from each Page to the page is that it links to 

通过该算法可以去更新每个URL所指向page的PageRank值



25.10-25.13

so let's print ranks also to see what's inside

So，我们来打印下rank值，看下它里面有什么东西




25.13-25.21

it's just a mapping from URL from source URL to the current page rank value for every page 

这里面保存了一种映射关系，即当前page的from URL（该page的URL）和它所对应的PageRank值

25.21-25.26

ok now we are gonna start executing

Ok，现在我们开始执行代码

25.26-25.35

does the Spark allow the user to request more fine-grained scheduling primitives than cache  that is to control where that is stored or how the computations are performed 

我想问一下，Spark是否允许用户使用比cache粒度更小的调度原语，以此来控制数据的存放位置以及计算的执行方式



25.35-25.42

well yeah so cache is a special case of a more general persist call

Well，cache是一个更加通用的持久化调用中的特殊例子

25.42-25.50

 which can tell Spark look I want to you know save this data in memory or I want to save it in HDFS

我可以通过它来告诉Spark我想将数据保存在内存中还是保存在HDFS中

25.50-25.53

 so that it's replicated and all survived crashes 

So，可以利用HDFS复制能力使得数据从崩溃中存活下来

25.53-25.54

so you got a little flexibility there

So，此处就有点灵活

25.54-25.57

 in general

一般来讲

25.57-26.01

you know we didn't have to say anything about the partitioning in this code 

我们并没有在这段代码中写任何有关分区方面的东西

26.01-26.07

and Spark will just choose something at first 

Spark首先会选择某个东西

26.07-26.12

the partitioning is driven by the partitioning of the original input files

分区是由原始输入文件的分区所决定的

26.12-26.20

but when we run transformations that had to shuffle，had to change the partitioning like distinct it does that and group by key does that 

但当我们进行transformation操作，比如shuffle，修改分区，distinct，groupByKey等操作时

26.20-26.23

Spark will do something internally 

Spark就会在它内部做些处理

26.23-26.26

that if we don't do any we don't say anything 

如果我们什么也没说

26.26-26.31

it'll just pick some scheme like hashing the keys over the available workers for example

它就会采取某种机制，比如对key进行hash并将数据分散到可用的worker上进行处理

26.31-26.37

but you can tell it look you know I it turns out that this particular way of partitioning the data 

但你可以告诉Spark，我想通过这种方式来对数据进行分区

26.37-26.43

you know use a different hash function or maybe partitioned by ranges instead of hashing

你知道的，比如使用一个不同的hash函数进行hash，或者根据范围对数据进行分区

26.43-26.48

you can tell it if you like more clever ways to control the partitioning

如果你有更巧妙的办法来进行分区，那么你可以告诉Spark

26.48-26.52

 okay



26.52-26.55

so I'm about to start loop

So，我要开始执行这个循环了




26.55-27.02

the first thing the loop does and I hope you can see the the code on line 12 

我希望你们能看下代码第12行

27.02-27.04

we actually gonna run this join

实际上，这里我们执行了join操作

27.04-27.10

this is the first statement of the first iteration of the loop

这是第一次循环遍历中的第一条语句

27.10-27.16

 with this join is doing is joining the links with the ranks

这里join所做的就是将links和ranks连接起来

27.16-27.18

and what that does is

它这里所做的就是

27.18-27.30

put together the corresponding entries in the links which said for every URL what is the point what does it have links to  and I'm sort of putting together the links with the ranks 

我会将links和ranks放在一起，这里的links指的是每个URL所指向的page



27.31-27.34

and but the rank says is for every URL what's this current PageRank 

这里的rank指的是每个URL所指向page的当前PageRank值

27.34-27.39

so now we have together and a single item for every page

So，现在我们就将这两个东西放在了一起，并且为每个page都有设定一个单独的item

27.39-27.43

both what its current PageRank is and what links it points to 

这个item中包含了当前的PageRank以及该page中包含的links

27.43-27.49

because we're gonna push every page's current PageRank to all the pages it appoints to 

因为我们要将每个page的当前PageRank值赋值给它所指向的所有page

我们要将每个page的当前PageRank和这些links关联起来

27.49-27.54

and again this join is uh is what the paper calls a wide transformation

paper中将这种join称作wide transformation

27.54-28.00

 because it doesn't it's not a local

因为它并不是本地的

28.00-28.14

the I mean it needs to it may need to shuffle the data by the URL key in order to bring corresponding elements of links and ranks together 

我的意思是，为了将对应的links中的元素以及ranks放在一起，它可能需要将URL作为key来对数据进行shuffle操作

28.14-28.16

now in fact

事实上

28.16-28.26

 I believe Spark is clever enough to notice that links and ranks are already partitioned by key in the same way

我相信Spark是足够的聪明，它能够注意到这些links和ranks已经根据key以相同的方式分好区了

28.26-28.31

 actually that assumes that it cleverly created links

假设，Spark以很聪明的方式创建了links

28.31-28.33

well when we created ranks

Well，当我们创建ranks时

28.33-28.41

its assumes that it cleverly created ranks using the same hash scheme as used when it created links 

假设它创建ranks的时候使用了和它创建links时相同的hash方案（知秋注：使用同一个hash函数对key进行处理）

28.41-28.42

but if it was that clever

但如果它很智能的话

28.42-28.45

 then it will notice that links and ranks are hashed in the same way

那么它就会注意到links和ranks都是以相同的方式进行hash

28.45-28.48

that is to say that

也就是说

28.48-28.57

the links ranks are already on the same workers or sorry the corresponding partitions with the same keys are already in the same workers 

相同key所对应的分区已经交由同一个worker进行处理了

28.57-29.02

and hopefully Spark will notice that and not have to move any data around

我们希望Spark会注意到这点，并且它不需要去移动任何数据了

29.02-29.04

if something goes wrong though in links and ranks are partitioned in different ways

如果这其中发生了些错误，导致links和ranks中的数据以不同的方式进行分区




29.04-29.14

then data will have to move at this point in order to join up corresponding keys in the two rdd's 

为了根据2个RDD（弹性分布式数据集）中对应的key来进行join，那么此时Spark就得对数据进行移动

为了将2个RDD中对应的key，join到一起，那么此时Spark就得对数据进行移动

29.14*-29.24

alright so JJ contained now contains both every pages rank and every pages list of links

So，JJ中现在包含的是每个page的PageRank值以及每个page上的links列表

29.24-29.26

as you can see

你们可以看到

29.26-29.30

 now we have a even more complex data structure 

现在我们就有了一个更为复杂的数据结构




29.30-29.41

it's an array with an element per page with the pages URL with a list of the links and the one point over there is the page you choose current rank

它是一个数组，里面放着每个page的URL，以及该page上的links列表，还有我们所选择的该page的当前PageRank值，即1.0

29.41-29.51

 and these are all this information is any sort of a single record that has all this information for each page together where we need it

任意一条记录中包含了我们需要的该记录中每一个page的所有信息

在每一条单独的记录中，它都包含了我们所需page对应的所有信息

29.51-29.53

alright



29.53-29.55 !!!!!!

the next step is that 

我们要做的下一步是

29.55-30.04

we're gonna figure out every page is gonna push a fraction of its current PageRank to all the pages that it links to 

我们要确定每个page会将它的当前PageRank值中的一部分发给它所链接到的所有page上

我们要去得到每一个page的当前PageRank值

30.04-30.07

it's kind of sort of divided up its current page rank among all the pages it links to

它以某种方式将它当前的PageRank分散到它所指向的所有page上

通过rank/urls.size这个公式来计算出该URL的PageRank值




30.07-30.14

and that's what this contribs does

这就是contribs所做的事情

30.14-30.18

you know basically what's going on is that

简单来讲，这里所发生的事情是

30.18-30.24

it's a one another one call to map and

这里又调用了一次map操作

30.24-30.31

we're mapping over the for each page were running map over the URLs that that pages points to

我们对URL所指向的每个page都进行了map操作

30.31-30.35

 and for each page it points to

对于URL所指向的每个page来说




30.35-30.42

 we're just calculating this number which is the from pages current rank divided by the total number of pages that points to

我们通过from page的当前PageRank值除以它所指向的page数量来计算出这个数字




30.42-30.56

so this sort of figured you know creates a mapping from link name to one of the many contributions to that page's new PageRank

这里我们将URL和该URL所指向的page的新PageRank值中的一部分建立起关系

这里我们将page和和它对应的新PageRank值建立起联系




30.56-31.04

and we can sneak peek it

我们可以偷偷看下这样做的结果是什么

31.04-31.08

what this is gonna produce I think is a much simpler thing 

我觉得这里所生成的是一种更简单的东西

31.08-31.14

it just as a list of URLs and contributions to the URLs' PageRanks

即一个URL集合以及对这些URL的PageRank相关的contribution

即由URL和该URL所对应的PageRank值为一个元素所组成的集合

31.14-31.17

and there's more there's you know more than one record for each URL here 

这里每条URL中都有多条记录

31.17-31.20

because there's gonna for any given page 

对于任意一个给定的page来说

31.20-31.24

there's gonna be a record here  for every single link that points to it

对于每个指向该page的link来说，这里都会有一条记录





31.24-31.32

 indicating this contribution of from whatever that link came from to this page to this pages new updated PageRank

该记录表示的是从from URL所指向的page跳转到另一个page时，该page的PageRank中的contribution值

该记录表示的是该from URL和它所对应的更新后的PageRank值

31.32-31.35

what has to happen now is 

现在这里要发生的事情是

31.35-31.44

that we need to sum up for every page we need to sum up the PageRank contributions for that page that are in contribs

我们要将每个page在contribs中该page相关的PageRank contribution值进行相加

31.44-31.46

so again we going to need to do a shuffle here

So，这里我们需要去进行一次shuffle操作

31.46-31.50

it's gonna be a wide transformation with a wide input

这就是一个使用了wide input的wide transformation

31.50-32.00

because we need to bring together all of the elements of contribs for each page we need to bring together and to the same worker to the same partition 

因为我们需要将每个page所对应的contribs中的所有元素放到同一个分区中，并交由同一个worker进行处理

32.00-32.01

so they can all be summed up

So，这样我们就可以对它们进行求和

32.01-32.06

and the way that's done

这就搞定了




32.06-32.11

the bay PageRank does that is with this reducedByKey call 

我们通过调用reduceByKey来完成对PageRank的计算

32.11-32.14

would reduceByKey does is

reduceByKey所做的事情就是

32.14-32.16

first of all 

首先

32.16-32.19

it brings together all the records with the same key 

它会将具有相同key的所有记录都放在一起



32.19-32.26

and then sums up the second element of each one of those records for a given key

接着，将给定key所对应的每条记录中的第二个元素全部加起来


32.26-32.36

 and produces as output，the key which is a URL and the sum of the numbers which is the updated PageRank

然后，生成输出结果，该输出结果由两部分组成，它的key是一个URL，它的value是该page所对应的更新后的PageRank值（知秋注：即0.15+0.85*rank）



32.36-32.40 !!!!!!!!!!

there's actually two transformations here

实际上这里有2个transformation操作




32.40-32.42

the first ones is reducedByKey

第一步是reduceByKey

32.42-32.44

and the second is this mapValues

第二步则是mapValues


32.44-32.54

which and and this is the part that implements the 15% probability of going to a random page and the 85% chance of following a link 

这里我们假设用户有15%的可能性会去访问一个随机页面，85%的可能性会去点击访问当前页面上的一个链接

32.54-32.59

all right



32.59-33.02

let's look at ranks

我们来看下ranks的值

33.02*-33.02

 by the way

顺带说一下

33.02-33.04

even though we've assigned to ranks here

虽然我们这里已经对ranks进行了赋值

33.04*-33.09

um what this is going to end up doing is creating an entirely new transformation

这里最终要做的就是创建一个全新的transformation操作

33.09-33.14

I'm so not it's not changing the value is already computed 

它不会去修改已经计算出来的值（知秋注：设定出来，并不会立马执行）

33.14-33.15

when it comes to executing this

当它执行这一步的时候

33.15-33.17

it won't change any values are already computed

它不会去修改任何已经计算出来的值

33.17-33.21

it just creates a new transformation with new output

它只是去创建一个具有新输出结果的新transfromation操作




33.21-33.28

and we can see what's gonna happen in indeed

我们可以去看下这里发生了什么

33.28-33.35

we now have remember ranks originally was just a bunch of pairs of URL PageRank

我们记得，一开始的时候，ranks中包含了一堆(URL，PageRank) pair

33.35-33.37

 now again we pairs of URL and PageRank

此处，依然是一堆(URL，PageRank) pair

33.37-33.41

another different we'd actually updated them sort of changed them by one step

有一点不同的是，我们通过一个步骤对这些pair中的PageRank进行了更新



33.41-33.49

and I don't know if you remember the original PageRank values we saw

我不清楚你们是否记得最开始我们所见到的PageRank值的大小

33.49-33.52

 but these are closer to those final output that we saw 

但此处的结果更接近于我们所看到的最终输出结果

33.52-33.55

then the original values of all one are 

这些PageRank在一开始时候的值是1

33.55-33.57

okay 



33.57-34.00

so that was one iteration of the algorithm

So，这是该算法所进行的一次遍历



34.00-34.02

when the loop goes back up to the top

当循环回到开头时（一次遍历结束，开始下一次遍历）

34.02-34.07

 it's gonna do the same join，flatmap and reduce by key

它就会执行相同的join操作，flatmap操作，以及reduceByKey操作

34.07-34.17

and each time it's again you know what the loop is actually doing is producing this lineage graph

你知道的，这个循环实际每次做的事情就是生成这个lineage graph

34.17-34.21

and so it's not updating the variables that are mentioned in the loop

So，它不会对循环中所涉及变量的值进行更新（知秋注：只是在做执行逻辑的设计）

34.21-34.29

it's really creating essentially appending new transformation nodes to the lineage graph that it's building

本质上来讲，它是往它所构建的lineage graph中创建并追加了新的transformation节点

34.29-34.36

but I've only run that once after the loop

但我只会在循环结束后执行这个lineage graph




34.36-34.39

and then now this is what the real code does 

这段代码所做的事情是

34.39-34.41

the real code actually runs collect at this point

此时，它会去执行collect操作

它会在调用collect操作这个点才真正的执行

34.41-34.47

and so they were in the real PageRank implementation only at this point with the computation even start

So，在真正的PageRank的实现里，只有在此时，才会真正开始进行计算

34.47-34.49

because of the call to collect here

因为这里调用了collect

34.49-34.57

and I go off and read the input，run the input through all these transformations and shuffles for the wide dependencies 

这里我会去读取输入数据，对输入数据执行所有transformation操作，接着，在宽依赖（wide dependencies）处进行shuffle操作

34.57-35.01

and finally collect the output together on the computer that's running this program 

最后，在运行该程序的机器上将输出结果收集到一起

35.01*-35.02

by the way

顺带说下

35.02-35.06

the computer that runs the program that the paper calls it the driver

paper将这运行该程序的机器叫做driver

35.06-35.10

the driver computer is the one that actually runs this scala program

我们在这个driver机器上运行了这个scala程序

35.10-35.14

that's kind of driving the Spark computation 

它用来执行Spark中的计算




35.14-35.30

and then the program takes this output variable and runs it through a nice nicely formatted print on each of the records in the collect output

接着，程序会拿到这个output变量，并以一种很nice的格式打印出这个output的值

35.30-35.32

okay 



35.32-35.48

so that's the kind of style of programming that people use for Scala and I mean for Spark

So，这就是人们在Scala以及Spark中所使用的编程风格

35.48-35.55

one thing to note here relative to MapReduce is that 

相对于MapReduce而言，这里有个东西要注意下

35.55-36.00

this program well you know and look looks a little bit complex

你知道的，这个程序看起来有点复杂

36.00-36.01

but the fact is 

但事实是

36.01-36.14

that this program is doing the work of many many MapReduce or doing an amount of work that would require many separate MapReduce programs in order to implement 

这段代码所做的工作是由很多独立的MapReduce来实现的

36.14-36.18

so you know it's 21 lines

So，你知道的，这段代码总共21行

36.18-36.20

 and maybe you used MapReduce programs that are simpler than that

你使用MapReduce来进行这种处理可能会来得更为简单

36.20-36.23

 but this is doing a lot of work for 21 lines 

但在这21行代码中，它做了大量的工作

36.24-36.25

and it turns out that 

事实证明

36.25-36.28

this is you know this is sort of a real algorithm to

你知道的，这里使用了某种算法

36.28-36.38

 so it's like a pretty concise and easy program easy to program way to express vast Big Data computations

So，这是用来进行大数据计算时一种很简洁明了且容易的编程方式

36.38-36.42

you know people like it

你知道的，人们很喜欢这种方式

36.42-36.43

pretty successful 

并且它相当成功

36.43-36.45

okay

=======================================================================

36.45-36.57

so again just want to repeat that until the final collect or this code is doing is generating a lineage graph and not processing the data

So，我想再重复说一下，直到最后的collect操作前，这段代码所做的就是生成lineage graph，而不是对数据进行处理




36.58-37.03

and the lineage graph that it produces actually the paper I'm just copied this from the paper

这张图是我从paper中直接拿的

37.03-37.06

 this is what the lineage graph looks like

这是lineage graph的样子

37.06-37.13

it's you know this is all that the program is producing it's just this graph until the final collect 

在最后调用collect之前，程序所做的就是生成这个lineage graph




37.14-37.15

and you can see that

你们可以看到

37.15-37.18

it's a sequence of these processing stage

这里有一连串处理阶段



37.18-37.21

where we read the file to produce links 

我们从文件中读取数据并生成links

37.21-37.23

and then completely separately we produce these initial ranks

然后，这里我们通过单独的一步来对rank值进行初始化

37.23-37.34

and  then there's repeated joins and reduceByKey pairs

接着，这里会进行重复的join操作，以及reduceByKey操作




37.34-37.42

each loop iteration produces a join and a each of these pairs is one loop iteration

每次循环遍历都会生成一次join操作和reduceByKey操作所需的参数



37.42-37.44

and you can see again

你们可以看到

37.44-37.47

 that the loop is appended more and more nodes to the graph

这个循环会往这个lineage graph中添加了一个又一个的节点

37.47-37.59

rather than what it is not doing in particular it is not producing a cyclic graph the loop is producing all these graphs are cyclic

这里它生成的并不是一个环形图



37.59-3800

another thing to notice that 

另一个要注意的事情是

38.00-38.02

you wouldn't have seen a MapReduce is that 

你在MapReduce中不会看到这种情况

38.02-38.09

this data here which was the data that we cached that we persisted is used over and over again and every loop iteration 

即我们这里所缓存的数据会在每次循环遍历的时候被反复使用

38.09-38.11

and so Sparks going to keep this in memory 

So，Spark会将这些数据保存在内存中

38.11-38.15

and it's going to consult it multiple times

并且它会多次使用这些数据

38.15-38.21

alright 



38.21-38.27

So it actually happens during execution

So，在执行的过程中，它确实做了这种事情

38.27-38.29

 what is the execution look like

执行的过程是怎么样的呢？

38.29-38.36

so again the the assumption is that

So，这里的假设是

38.36-38.44

the data the input data starts out kind of pre partitioned by over in HDFS

在HDFS中，输入数据一开始就分好了区

38.44-38.56

we assume our one file it's our input files already split up into lots of you know 64 megabyte or whatever it may happen pieces in HDFS 

假设我们的输入文件已经拆分成了很多个64MB大小之类的数据块，并保存在HDFS上

38.56-39.02

Spark knows that when you started you actually call collect the start of computation 

当你调用collect开始进行计算的时候







四十三  阅举报
15-03



39.02-39.05

spark knows that the input data is already partitioned HDFS 

Spark知道这些输入数据已经被分好区放在了HDFS中

39.05-39.12

and it's gonna try to split up the work the workers in a corresponding way 

它会试着以某种方式来将任务拆分并分配给对应的worker来做

39.12-39.17

so if it knows that there's I actually don't know what the details are a bit 

实际上，我不清楚这里的细节是什么

39.17-39.24

it might actually try to run the computation on the same machines that store the HDFS data 

实际上，它可能会试着在保存着HDFS分区数据的同一台机器上执行计算




39.24-39.35

or it may just set up a bunch of workers to read each of the HDFS partitions

或者，它可能会让一堆worker去读取每个HDFS分区中的数据

39.35-39.41

 and again there's likely to be more than one partition per worker 

这里更可能出现的情况是，每个worker会负责读取多个分区中的数据

39.41-39.43

so we have the input file 

So，我们有输入文件




39.43-39.46

and the very first thing is

首先要做的事情是

39.46-39.51

that each worker reads as part of the input file 

每个worker会去读取该输入文件中的一部分数据




39.51-39.55

so this is the read their file read

So，这一步是读取文件数据

39.55-39.57

 if you remember, the next step is a map

如果你还记得的话，下一步操作是map操作

39.57-40.04

where the each worker supposed to map a little function that splits up each line of input into a from two link tuple um

即每个worker会去调用一个map函数，该函数会将输入数据的每一行拆分成2个link tuple

40.04-40.09

 but this is a purely local operation，and so it can go on in the same worker

如果它是在同一个worker上进行的，那么这一步就是一个纯粹的本地操作

40.09-40.12

 so we imagine that we read the data 

So，我们想象一下这种场景，当我们读取完数据

40.12-40.17

and then in the very same worker spark is gonna do that initial map

然后，在同一个worker中，Spark会去调用这个map函数对数据进行处理




40.17-40.22

 so you know I'm drawing an arrow here's really an arrow from each worker to itself 

So，你知道的，这里我所画的箭头指向的其实是每个worker它自身，即由该worker自己去处理这些任务

40.22-40.24

so there's no network communication involved indeed

So，这里不涉及任何网络通信

40.24-40.28

it's just you know we run the first read

你知道的，当我们对输入数据执行完第一次读取后

40.28-40.31

 and the output can be directly fed to that little map function

我们可以将输出结果直接传入这个map函数进行处理

40.31-40.32

 and in fact

事实上

40.32-40.36

 this is that that initial map

这是最初的map操作

40.36-40.43

in fact spark certainly streams the data record by record through these transformations 

事实上，Spark通过这些Transformation操作来对这些记录中的数据逐条进行流式处理

40.43-40.49

so instead of reading the entire input partition and then running the map on the entire input partition

So，在不读取整个输入数据分区并对整个分区使用map函数进行处理的情况下

So，你无须去将整个输入数据分区读取完毕，并整体进行map处理

40.49-40.53

Spark reads the first record  or maybe the first just couple of records

Spark会去读取第一条或者前两条记录

40.53-41.00

 and then runs the map on just sort of all I'm each record in fact runs

通过map函数来对每条记录进行处理

41.00-41.07

 each record of E if it was many transformations as it can before going on and reading the next little bit from the file 

如果在它从文件中读取下一部分数据前，这里存在着很多个transformation操作

41.07-41.11

and that's so that it doesn't have to store yes these files could be very large

那么，它无需去保存这些体积很大的输入文件

41.11-41.18

 it isn't one half so like store the entire input file， it's much more efficient just to process it record by record 

比起保存整个输入文件，我们对该输入文件中的记录逐条进行处理，这样会来得更为高效

41.18-41.18

okay 



41.18-41.20

so there's a question

So，有疑问吗？

41.20-41.24

 so the first node in each chain is the worker holding the HDFS chunks

So，在每条链中第一个节点中，worker所干的事情就是去拿到它所负责的HDFS数据块

41.24-41.28

and the remaining nodes in the chain are the nodes in the lineage 

该链中剩下的节点就是lineage graph中的节点

41.28-41.30

oh yeah I'm afraid I've been a little bit confusing here

这里其实我有点纠结

41.30-41.32

 I think the way to think of this is that 

我觉得思考它的方式是




41.32-41.37

so far all this happen is happening on individual workers 

目前为止，这条执行链中的一切事情都是在一个单独的worker上发生的

41.37-41.39

so this is worker one 

So，这是worker 1

41.39-41.45

maybe this is another worker

这可能是另一个worker

41.45-41.49

and each worker is sort of proceeding independently 

每个worker都是各自处理各自的任务

41.49-41.56

and I'm imagining that they're all running on the same machines  that stored the different partitions of the HDFS

假设，这些worker是在保存着这些不同HDFS分区的同一台机器上运行的

我假设这些worker所在的机器与存储着对应HDFS中的分片数据所在的机器是同一台




41.56-42.02

 but there could be Network communication here to get from HDFS to the to the responsible worker

但这里，（如果不是我假设的情况），从HDFS中拿到数据，并将数据传给对应的worker，这个过程中可能存在着网络通信

42.02-42.02

 but after that

但在此之后

42.02-42.06

 it's very fast kind of local operations

它所做的就是某种速度超快的本地操作了

42.12-42.13

all right 




42.13-42.24

and so this is what happens for the with the people called the narrow dependencies

So，这就是这里所发生的事情，人们将这个称之为Narrow dependencies（窄依赖）

42.24-42.34！！！！！！

that is transformations that just look consider each record of data independently without ever having to worry about the relationship to other records

这个Transformation操作只考虑每条执行链中对每条数据记录的处理，它不用去关心其他worker所处理的记录

所谓的窄依赖，就是Transformations所处理的数据record和其他record是彼此独立不相干的，这条处理chain无须担心会与其他处理chain产生彼此依赖

42.34-42.36

so by the way 

So，顺带说一下

42.36-42.40

this is already potentially more efficient than MapReduce

这其实已经要比MapReduce来得更为高效

42.40-42.42

 and that's because

这是因为

42.42-42.47

 if we have what amount to multiple map phases here

假设，如果我们有多个Map阶段

42.47-42.48

they just storing together in memory

它们会将数据都保存在内存中

42.48-42.51

whereas MapReduce if you're not super clever

如果你不是很聪明的话

42.51-42.54

if you run multiple MapReduce 

如果你运行了多个MapReduce程序

42.54-42.58

is even if they're sort of degenerate map only MapReduce applications 

如果它们是只有Map操作的MapReduce应用程序



42.58-43.04

each stage would read input from GFS compute and write its output back to GFS

在每个阶段，程序都会从GFS中读取输入数据，计算，然后将它的输出结果写回GFS

43.04-43.07

 then the next stage would read compute write 

然后，下一个阶段还是读取，计算，写入

43.07-43.09

so here we've eliminated the reading writing in it

So，此处我们已经消除了读取和写入这两步操作

43.09-43.12

 you know it's not a very deep advantage

你知道的，这并不是一种很大的优势

43.12-43.16

 but it sure helps enormously for efficiency

但可以肯定的是，在效率方面大大提升

43.16-43.20

 okay



43.20-43.23

however not all the transformations are narrow

然而，并不是所有的transformation操作都是Narrow的

43.23-43.30

not all just sort of read their input record by record  kind of with every record independent from other records

在每条记录彼此间独立的情况下，它们并不会对所有的输入数据中的记录进行逐个读取

我在逐条读取数据记录的时候，这些记录（record）彼此间并不一定是独立的（知秋注：非独立是指，两条处理链下所涉及的两条record可能是相同的key，一旦涉及到分组，去重操作就要有关联了)

3.30-43.34

and so what I'm worried about is the distinct call 

So，我所关心的东西是distinct（去重）

43.34-43.39

which needed to know all instances' all records that had a particular key 

它需要知道所有实例上某个特定key相关的所有记录

43.39-43.43

similarly groupByKey needs to know about all instances that have a key

类似地，groupByKey需要了解拥有同一个key的所有实例的相关信息

43.43-43.44

join also

join也是如此

43.44-43.46

 it's gotta move things around

它要对数据进行移动

43.46-43.52

 so that takes two inputs needs to join together

So，它要拿到进行join操作时所需要的两个输入数据

43.52-43.56

 all keys from both inputs  so that this all records from both inputs that are the same key

它要对这两个输入数据中具有相同key的所有记录进行join操作

43.56-43.59

so there's a bunch of these non-local transformations

So，这里就会涉及一堆非本地的transformation操作




43.59-44.03

 which the paper calls wide transformations

paper将它们称为wide transformation

44.03-44.09

 because they potentially have to look at all partitions of the input

因为它们可能得去查看该输入数据的所有分区

44.09-44.11

 that's a lot like reduce in MapReduce 

这很像MapReduce中的Reduce部分

44.11-44.12

serve example

来看个例子

44.12-44.13

distinct 

以distinct为例




44.13-44.16

supposing we're talking about the distinct stage 

假设，我们正在讨论的是distinct阶段

44.16-44.20

you know the distinct is going to be run on multiple workers also 

你知道的，distinct操作会在多个worker上执行

44.20-44.25

and distinct works on each key independently 

distinct是针对每个key进行单独处理的

44.25-44.29

and so we can partition the computation by key

So，我们可以根据key来对计算任务进行划分

44.29-44.33

 but the data currently is not partitioned by key  at all 

但现在，我们并没有根据key来对数据进行分区

44.33-44.39

actually isn't really partitioned by anything but just sort of however HDFS have stored it

实际上，我们并没有根据任何东西来对数据进行分区并在HDFS上存储



44.39-44.41

 so for distinct

So，拿distinct来说




44.41-44.47

we're gonna run distinct on all the partition on all the workers partitioned by key

我们会在所有worker上对所有的分区执行distinct操作，这些分区是根据key来划分的

44.47-44.49

 but you know

但你知道的

44.49-44.54

 any one worker needs to see all of the input records with a given key 

任何一个worker都需要去查看一个给定key的所有相关输入记录



44.54-45.04

which may be spread out over all of the preceding workers for the preceding transformation

这些记录可能会分散在执行之前transformation操作的worker上




45.04-45.10

and all of the you know they're all for the workers are responsible for different keys

你知道的，不同的key所对应的数据会交由与之对应的worker来处理

45.10-45.20

but the keys may be spread out over all of the workers for the preceeding transformation 

但这些key所对应的数据可能分散在所有那些执行上一步transformation操作的worker上

执行之前这些transformation操作的worker上

45.20-45.21

now in fact the workers are the same

事实上，这些worker是相同的

45.21-45.22

typically

一般来讲

45.22-45.26

it's gonna be the same workers running the map is running running the distinct

执行map和执行distinct操作的是同一批worker

45.26-45.31

but the data needs to be moved between the two transformations to bring all the keys together 

但为了将这些具有相同key所对应的数据放在一起，这些数据需要在这两个transformation操作中进行移动

45.31-45.33

and so what sparks actually gonna do

So，Spark实际做的事情是

45.33-45.38

 it's gonna take the output of this map， hash the each record by its key

它会拿到这个map操作的输出结果，然后根据每条记录的key来对每条记录进行hash

45.38-45.43

and use that you know mod the number of workers to select which workers should see it 

拿到key，然后根据worker的数量对其进行取模，以此来选择哪个worker可以看到这部分数据

45.43-45.45

and in fact

事实上

45.45-45.49

 the implementation is a lot like your implementation of MapReduce 

这个实现和你们所实现的MapReduce很相似

45.49-45.57

the very last thing that happens in in the last of the narrow stages is that

在Narrow stage中最后发生的事情是

45.57-46.06

the output is going to be chopped up into buckets corresponding to the different workers for the next transformation

输出结果会被拆分到不同的bucket并交由不同的worker来进行下一步transformation操作




46.06-46.09

where it's going to be left waiting for them to fetch

这些数据会被放在这些bucket中等待这些worker来获取

46.09-46.11

 I saw the scoop is that 

我这里所看到的是

46.11-46.18

each of the workers run the sort of as many stages all the narrows stages they can through the completion

每个worker都会去完成尽可能多的Narrow stage



46.18-46.21

and store the output split up into buckets

并将输出结果拆分并存储到bucket中

46.21-46.22

 when all of these are finished

当这些操作全部结束后

46.22-46.28

 then we can start running the workers for the distinct transformation

接着，我们就可以在这些worker上执行distinct操作

46.28-46.35

whose first step is go and fetch from every other worker the relevant bucket of the output of the last narrow stage

它首先要做的就是从其他的worker上拿到narrow stage中最后输出结果中拿到执行distinct操作所需要的那个bucket

46.35-46.38

and then we can run the distinct

然后，我们就可以执行distinct操作

46.38-46.41

 because all the given keys are on the same worker

因为具有相同给定key的数据都放在了同一个worker上

46.41-46.44

 and they can all start producing output themselves

它们就可以开始生成输出结果了

46.44-46.49

all right 



46.49-46.52

now of course these wide transformations are quite expensive 

Of course，使用这些wide transformation的成本相当高

46.52-46.54

the narrow transformations are super efficient

这些narrow transformation的效率超级高

46.54-46.57

because we're just sort of taking each record

因为我们拿到每条记录

46.57-47.00

 and running a bunch of functions on it totally locally

然后，在本地执行这一系列函数处理操作

47.00-47.06

the wide transformations require pushing a lot of data impact essentially all of the data in for PageRank

为了计算PageRank，wide transformation需要对所有的数据进行处理




47.06-47.07

you know you get terabytes of input data 

你知道的，你会拿到数TB大小的输入数据

47.07-47.09

that means that

这意味着




47.09-47.11

you know it's still the same data at this stage

在这一阶段使用的数据依然是相同的数据

47.11-47.14

because it's all the links and then in the web

因为它们使用的还是这些links

47.14-47.24

 so now we're pushing terabytes and terabytes of data over the network to implement this shuffle from the output of the map functions to the input of the distinct functions

So，我们将map函数的输出结果传递到distinct函数时，我们要通过网络传递海量的数据

So，当我们将map函数的海量输出结果通过网络推送到distinct函数时，要进行shuffle操作

47.24-47.29

so these wide transformations are pretty heavyweight

So，这些wide transformation的使用成本都很高

47.29-47.31

a lot of communication

这里面涉及了大量的网络通信

47.31-47.33

and they're also kind of computation barrier 

这里也存在着某种计算阻碍

47.33-47.39

because we have to wait for all the narrow processing to finish before we can go on to the 

因为在我们进行下一步操作之前，我们得等待narrow stage中的所有处理完成才行

47.39-47.43

so there's wide transformation

So，这里有wide transformation

47.43-47.47

all right 



47.47-47.51

that said 

这里表示



47.51-47.57 ！！！！

the there are some optimizations that are possible

这里有一些可以做的优化

47.57-48.06

because spark has a view，spark creates the entire lineage graph before it starts any of the data processing

因为在开始对数据进行任何处理之前，Spark会去创建一个完整的lineage graph



48.06-48.10

so Spark can inspect the lineage graph and look for opportunities for optimization

So，Spark能够对lineage graph进行检查，并寻找机会对它进行优化的

48.10-48.15

and certainly running all of if there's a sequence of narrow stages

如果这里有一系列narrow stage

48.15-48.20

 running them all in the same machine by basically sequential function calls on each input record

我那所有这些全都是同一台机器上执行这简单来讲，就是对在同一台机器上每个输入记录进行一系列函数式处理

简单来讲，我们在同一台机器上对每个输入记录进行一系列函数式处理

48.20-48.27

 that's definitely an optimization that you can only notice if you sort of see the entire lineage graph all at once

只有当你看到完整的lineage graph时，你才会注意到这种优化



48.27-48.35

another optimization that spark does is 

Spark所做的另一种优化就是

48.35-48.41

noticing when the data has already been partitioned due to a wide shuffle 

当这些数据通过wide shuffle已经分好区了

48.41-48.48

that the data is already partitioned in the way that it's going to be needed for the next wide transformation

这些数据已经按照下一次transformation操作时所需要的方式进行了分区




48.48-48.51

so in our original program

So，在我们的原始程序中

48.51-49.00

let's see I think we have two wide transformations  in a row

我们这里有两个wide transformation操作

49.00-49.01

 distinct requires a shuffle 

distinct需要进行一次shuffle操作

49.01-49.03

but groupByKey also

groupByKey也是如此

49.03-49.07

it's gonna bring together all the records with a given key 

它会将一个给定key的所有相关记录都放在一起

49.07-49.14 ！！！！！！！

and replace them with a list of for every key the  list of links you know starting at that URL 

并用一个links集合来替换掉该key（即这个URL）所对应的这些记录

通过集合links1将lines这个数组替换掉，得到我们想要的数据



49.14-49.17

these are both wide operators 

这两个都是wide transformation操作

49.17-49.19

they both are grouping by key

它们会根据key来进行分组

49.19-49.21

and so maybe we have to do a shuffle for the distinct

So，我们可能得在进行distinct操作的时候做一次shuffle操作

49.21-49.25

but spark can cleverly recognize aha

但Spark可以很聪明地意识到

49.25-49.27

you know that is already shuffled in a way that's appropriate for a groupByKey 

它已经按照适合groupByKey的方式进行了shuffle操作

49.27-49.29

we don't have to do in other shuffle

我们无须再进行另一次shuffle操作了

49.29-49.33

so even though groupByKey is in principle it could be a wide transformation

So，原则上来讲，groupByKey是一个wide transformation操作

49.33-49.34

in fact

事实上

49.34-49.38

I suspect Spark implements it without communication

我怀疑Spark在没有使用网络通信的情况下，就实现了这一点

49.38-49.40

because the data is already partitioned by key

因为这些数据已经根据key分好了区




49.40-49.52

 so maybe the groupByKey can be done in this particular case without shuffling data without expense

So，在这个例子中，在无须对数据进行shuffle操作的情况下，我们就可以进行groupByKey操作

49.52-49.55

of course



49.55-50.01

it you know can only do this because it produced the entire lineage graph first and only then ran the computation

你知道的，只有在Spark生成出完整的lineage graph，然后在执行计算时，它才能这样做

50.01-50.09

 so this part gets a chance to sort of examine and optimize and maybe transform the graph

So，我们可以对这部分进行测试和优化，也可以对这个lineage graph进行转换

50.09-50.13

All right



50.13-50.15

so that's topic

So，这个主题要讲的内容就是这样

50.15-50.21

 actually any any questions about lineage graphs or how things are executed

对于lineage graph或者这些东西是如何执行的，你们有什么不懂的没？

50.21-50.27

I feel free to  interact 

我很高兴回答你们的问题

=======================================================================

50.27-50.31

the next thing I want to talk about is fault tolerance

我想讲的下一个东西就是容错（fault tolerance）

50.34-50.42

and here the you know these kind of computations they're not 

你知道的，我们执行这些计算任务时，并没有进行容错

50.42-50.46

the fault tolerance are looking for is not the sort of absolute fault tolerance you would want with the database 

我们想要做到的并不是数据库所具备的那种绝对容错能力

50.46-50.49

what you really just cannot ever afford to lose anything 

即我们无法忍受丢掉任何东西

50.49-50.52

what you really want is a database that never loses data

我们真正想要的就是一个永远不会丢掉数据的数据库

50.52-50.56

here the fault tolerance we're looking for is more like 

这里我们所要做到的容错能力更像是

50.56-51.00

well it's expensive if we have to repeat the computation

Well，如果我们得重复执行计算，那么成本就很高

51.00-51.03

 we can totally repeat this computation if we have to

如果我们需要这样做的话，那我们确实可以重复执行这个计算过程

51.03-51.05

but you know it would take us a couple of hours

但你知道的，这要花费我们数小时的时间

51.05-51.06

 and that's irritating

这很烦人

51.06-51.08

 but not the end of the world 

但这不像世界末日那样糟糕

51.08-51.12

so we're looking to you know tolerate common errors

So，你知道的，我们要做的是能够容忍常见错误

51.12-51.21

but we don't have to certainly don't have to having bulletproof ability to tolerate any possible error 

但我们无须去容忍任何可能出现的错误

51.21-51.25

so for example

例如

51.25-51.28

Spark doesn't replicate that driver machine

Spark不会对driver机器进行复制

51.28-51.34

if the driver which was sort of controlling the computation and knew about the lineage graph of the driver crashes

如果这个正在执行计算和了解这个lineage graph的driver机器崩溃了

51.34-51.36

 I think you have to rerun the whole thing

那我觉得，你就得重新执行这整个过程了

51.36-51.40

but you know any only any one machine only crashes  maybe every few months

但你知道的，每隔几个月可能只有一台机器发生崩溃

51.40-51.41

so that's no big deal

So，这并不是什么大问题

51.41-51.43

another thing to notice is 

另一件要注意的事情是

51.43-51.47

that HDFS is sort of a separate thing

HDFS是一个独立的东西

51.47-51.54

Spark is just assuming that the input is replicated in a fault-tolerant way on HDFS

这里假设我们通过对存放在HDFS上的输入数据进行复制来达到容错的目的

51.54-51.56

 and indeed just just like GFS

确实，这很像GFS

51.56-52.00

 HDFS does indeed keep multiple copies of the data on multiple servers 

确实，HDFS会在多台服务器上保存该数据的多个副本

52.00-52.01

if one of them crashes

如果其中一台服务器发生了崩溃

52.01-52.04

 can survive on with the other copy

那么它可以使用其他服务器上该数据的副本

52.04-52.11

so the input data is assumed to be relatively fault tolerant 

So，假设我们的输入数据是相对容错的

52.11-52.12

and what that means that

这意味着

52.12-52.17

 at the highest level is that spark strategy 

从最高层面来讲

52.17-52.19

if one of the workers fail 

如果其中一个worker发生了故障

52.19-52.27

is just to recompute the whatever that worker was responsible for  to just repeat those computations

那我们只需重新执行下这个worker所负责的计算任务

52.27-52.31

they were lost with the worker on some other worker  and on some other machine

它们会丢掉其他机器上有关该worker的进度（知秋注：即该Worker生成的结果丢了，其他为此等待的Worker拿不到这个结果了）



52.31-52.35

so that's basically what's going on

简单来讲，这就是这里所发生的事情

52.35-52.41

and it you know it might take a while if you have a long lineage 

如果你的lineage graph很长的话，那么这就得花点时间了

52.41-52.44

like you would actually get with PageRank

就好比你去计算PageRank

52.44-52.48

 because you know PageRank with many iterations produces a very long lineage graph

你知道的，因为计算PageRank时会进行很多次循环遍历，以此来生成一个很长的lineage graph

52.48-52.54

one way that spark makes it not so bad

Spark所做的其中一个不算太糟糕的事情是

52.54-53.00

 that it has to be may have to be recompute everything from scratch if a worker fails is that 

如果其中一个worker发生了故障，这可能就得从头开始计算所有东西

53.00-53.03

each workers actually responsible for multiple partitions at the input 

实际上，每个worker会负责输入数据中的多个数据分区

53.03-53.10

so spark can move those parts move give each remaining worker just one of the partitions 

So，Spark可以去移动这些分区，并将其中一个数据分区交由剩下还活着的worker进行处理

53.10-53.17

and they'll be able to basically parallelized the recomputation that was lost with the failed worker

简单来讲，它们能够并行执行这个发生故障的worker所负责的计算任务

53.17-53.20

 by running each of its partitions on a different worker in parallel

以并行的方式在一个不同的worker上对（出现故障的worker所负责的）这些数据分区进行计算

53.20-53.23

 so if all else fails

So，如果所有worker都出现了故障

53.23-53.37

Spark just goes back to the beginning from reading input and just recomputes everything that was running on that machine however and for narrow dependencies

对于窄依赖来说，Spark就会回过头去，从头开始读取输入数据，重新执行这台机器所负责的计算任务



53.37-53.40

 that's pretty much the end of the story

这是这个话题中我要讲的最后内容

53.40-53.48

however there actually is a problem with the wide dependencies that makes that story not as attractive as you might hope 

实际上，宽依赖（wide dependencies）中存在着一个问题，这使得这部分内容对你们并没有太多吸引力

53.48-53.54

so this is a topic here is failure

我要讲的这个主题是关于故障的（failure）




53.54-54.11

one failed node 1 failed worker  in a lineage graph that has wide dependencies

假设在一个lineage graph有一个发生了故障的worker，这个lineage graph中有一些宽依赖



54.11-54.17

so the a reasonable or a sort of sample graph you might have is you know maybe you have a dependency graph

So，假设我们有这样一张依赖图

54.17-54.22

 that's you know starts with some narrow dependencies

它一开始是一些窄依赖

54.22-54.28

 but then after a while you have a wide dependency

但之后，你又有了一个宽依赖

54.28-54.39

so you got transformations that depend on all the preceding transformations

So，你会有一些transformation操作，它们依赖上一步所有的transformation操作的结果




54.39-54.41

and then some small narrow ones

接着，又是一些窄依赖

54.41-54.44

 all right



54.44-54.46

 and you know the game is that a single workers fail

这里的场景是，有一个worker出现了故障

54.46-54.49

and we need to reconstruct the 

我们需要去重新执行这个发生故障的worker所负责的任务

54.49-54.53

Maybe before we've gone to the final action and produce the output

可能在我们执行最后的操作以及生成输出结果之前，这个worker就出现了故障

54.53-54.59

so we need to kind of reconstruct recompute what was on this failed worker 

So，我们需要去重新执行这个出现故障的worker所负责的任务

54.59-55.03

the damaging thing here is that 

糟糕的地方在于

55.03-55.10

ordinarily as spark is executing along 

当Spark执行这些操作的时候

55.10-55.13

it you know it executes each of the transformations

你知道的，它会执行每个transformation操作

55.13-55.15

gives us output to the next transformation

并将输出结果返回给我们，并将其传给下一个transformation操作

55.15-55.24

 but doesn't hold on to the original output unless you unless you happen to tell it to like the links data is persisted with that cache call

但Spark不会去保存这些原始的输出结果，除非你通过调用cache来告诉Spark这些links数据要进行持久化

55.24-55.26

but in general

但一般来讲

55.26-55.28

 that data is not held on to

这些数据不会被保存

55.28-55.33

 because now if you have a like the PageRank lineage graph

假设，如果你有一个诸如PageRank的lineage graph

55.33-55.35

 maybe dozens or hundreds of steps long 

这里面可能有数十或者数百个步骤

55.35-55.39

you don't want to hold on to all that data it's way way too much to fit in memory

你们不会想将每一步产生的输出结果都放到内存中去

55.39-55.44

 so as the Spark sort of moves through these transformations

So，随着Spark一步步执行这些transformation操作

55.44-55.48

 it discards all the data associated with earlier transformations

它会将一些早期的transformation操作相关的数据都丢弃掉

55.48-55.49

that means 

这意味着




55.49-55.50

when we get here

当我们到达这一步的时候

55.50-55.51

and if this worker fails

如果这个worker发生了故障

55.51-55.57

 we need to restart its computation on a different worker

我们需要在一个不同的worker上重新执行它的计算任务

55.57-55.58

 now so we can read the input

So，我们可以去读取输入数据




55.58-56.03

and maybe do the original narrow transformations

可能还得做些原来的narrow transformation

56.03-56.026

they just depend on the input which we have to reread

它们依赖于我们所重新读取的输入数据

56.06-56.08

 but then if we get to this wide transformation

但如果我们去执行这个wide transformation操作时

56.08-56.09

 we have this problem

我们就会遇上一个问题

556.09-56.16

 that it requires input not just from the same partition on the same worker but also from every other partition 

它不仅需要同一个worker所处理的分区上的数据，它也需要其他分区中的数据

56.16-56.19

and these workers so they're still alive have

这些worker还依然活着

56.19-56.21

 in this example

在这个例子中

56.21-56.23

 have proceeded past this transformation

它们已经执行过这些transformation操作了




56.23-56.29

 and therefore discarded the output of this transformation

因此，它们已经丢弃了这个transformation的输出结果

56.29-56.32

since it may have been a while ago

因为可能自它执行完这个操作已经过去了一段时间

56.32-56.39

 and therefore the input did our recomputation needs from all the other partitions doesn't exist anymore

因此，当我们重新计算的时候，我们需要从其他分区拿到的数据已经并不存在了






56.40-56.41

and so if we're not careful

So，如果我们不是很小心的话

56.41-56.42

that means that

这意味着




56.42-56.44

 in order to rebuild this the computation on this failed worker

为了重建这个出现故障的worker所负责的计算任务




56.44-56.58

 we may in fact have to reexecute this part of every other worker as well as the entire lineage graph on the failed worker

事实上，我们还得重新执行所有其他worker的这一部分，并且也要重新执行这个发生故障的worker上的整个lineage graph中的操作




56.58-57.02

and so this could be very damaging right

So，这就很操蛋了

57.02-57.07

 if we're talking about oh I mean I've been running this giant spark job for a day

假设有这样一种情况，我已经执行了这个大型Spark任务有1天了

57.07-57.09

 and then one of a thousand machines fails

接着，这1000台机器中有1台发生了故障

57.09-57.10

 that may mean

这可能就意味着

57.10-57.13

 we have to we know anything more clever than this 

我们需要知道些比这种做法更巧妙的办法

57.13-57.17

that we have to go back to the very beginning on every one of the workers and recompute the whole thing from scratch

不然我们就得从头开始让每一个worker重新执行这些操作了

57.17-57.22

it's gonna be the same amount of work

我们现在要做的工作量和发生崩溃前的工作量是相同的

57.22-57.27

 is going to take the same day to recompute a day's computation

这同样要花一天的时间来重新执行崩溃前这一天的计算任务

57.27-57.29

 so this would be unacceptable

So，这就让人难以接受了

57.29-57.30

 we'd really like it

我们想要的需求是这样的

57.30-57.33

 so that if if one worker out of a thousand crashes

如果1000台机器中有1台发生了崩溃

57.33-57.37

that we have to do relatively little work to recover from that

我们只需要做少量的工作就可以从崩溃中恢复过来

57.37-57.39

and because of that

出于这个原因

57.39-57.49

Spark allows you to check point to make periodic checkpoints of specific transformation

Spark允许我们定期创建特定transformation操作的checkpoint

57.49-57.52

so um so in this graph

So，在这张图中

57.52-57.53

 what we would do is 

我们所要做的事情是

57.53-57.56

in the scala program

在这个scala程序中

57.56-58.00

 we would call I think it's the persist call actually

我觉得我们会去调用persist

58.00-58.01

we call the persist call with a special argument

我们会往这个persist中传入一个特殊参数

58.01-58.08

 that says look，after you compute the output of this transformation

并说：当你计算完这个transformation的输出结果时




58.08-58.10

 please save the output to HDFS

请将它们的输出结果保存到HDFS中

58.10-58.15

and so everything and then if something fails

如果某个东西出现了故障

58.15-58.24

 the spark will know that aha the output of the proceeding transformation was saved to HDFS

Spark就会知道前一个transformation操作的输出结果已经保存在HDFS中了

58.24-58.32

and so we just have to read it from HDFS instead of recomputing it on all for all partitions back to the beginning of time

So，我们只需从HDFS中读取这些数据即可，我们无需从头开始重新对所有分区中的数据进行计算

58.32-58.36

 um and because HDFS is a separate storage system

因为HDFS是一个单独的存储系统

58.36-58.39

 which is itself replicated in fault-tolerant 

它会通过复制来具备容错的能力

58.39-58.41

the fact that one worker fails 

如果一个worker出现了故障

58.41-58.46

you know the HDFS is still going to be available even if a worker fails

你知道的，即使其中一个worker发生了崩溃，HDFS依然是可用的




58.46-58.53

so I think so for our example

So，我觉得在我们的例子中

58.53-58.58

PageRank I think what would be traditional

我觉得PageRank是一个很传统的例子

58.58-59.08

 would be to tell spark to check point the output to checkpoint ranks and

我们会告诉Spark对ranks定期制作checkpoint

59.08-59.11

you wouldn't even know you can tell it to only check point periodically

你可以告诉Spark去定期制作checkpoint




59.11-59.15

so you know if you're gonna run this thing for 100 iterations

So，你知道的，如果你对这个东西循环遍历100次

59.15-59.24

it actually takes a fair amount of time to save the entire ranks to HDFS 

它实际上会花一段相当长的时间来将整个ranks数据保存到HDFS中

59.24-59.26

because again we're talking about terabytes of data in total 

因为我们讨论的是TB级大小的数据

五十三  阅举报
15-04
59.26-59.40

so maybe we would we can tell Spark look only check point ranks to HDFS every every 10th iteration or something to limit the expense

So，我们可以让Spark每隔10次遍历的时候将ranks保存到HDFS，以此来限制执行成本

59.40-59.56

 although you know it's a trade-off between the expensive repeatedly saving stuff to disk and how much of a cost  if a worker failed you had to go back and redo it

你知道的，将数据反复保存到磁盘上，这是一种成本很高的操作。如果一个worker发生了故障，我们就得回过头去，重新执行这些任务，这两者之间存在着某种取舍



59.56-59.59

So， a question 

So，这里的问题是

59.59-1.00.00

when we call cache

当我们调用cache时

1.00.00-1.00.02

that does act as a checkpoint

它扮演了checkpoint的角色

1.00.02-

 you know



1.00.02-1.00.05

okay so this is a very good question which I don't know the answer too

Ok，这是一个很棒的问题，因为我也不知道这个问题的答案



1.00.05-1.00.07

 the observation is that 

这里我们可以看到


1.00.07-1.00.09

we could call cache here

我们可以在这里调用cache




1.00.09-1.00.10

 and we do call cache

我们确实调用了cache




1.00.10-1.00.12

 and we could call cache here

我们也可以在这调用cache

1.00.12-1.00.20

 the usual use of cache is just to save data in memory with the intent to reuse it

cache通常的用途是为了将数据保存在内存中以便之后复用这些数据

1.00.20-1.00.22

 that's certainly why it's being called here 

这就是为什么我们在此处调用它的原因了

1.00.22-1.00.24

because we're reusing links4

因为我们这里复用了links4

1.00.24-1.00.26

 but in my example

但在我的例子中




1.00.26-1.00.38

it would also have the effect of making the output of this stage available in memory although not on an HDFS but in the memory of these workers 

它的效果是将这个阶段的输出结果放在这些worker的内存中，而不是HDFS中




1.00.38-1.00.42

and the paper never talks about this possibility

paper中并没有谈论过这种可能性

1.00.42-1.00.47

 and I'm not really sure what's going on

我不确定这里发生了什么

1.00.47-1.00.48

maybe that would work

这种方法可能可行

1.00.48-1.00.57

 or maybe the fact that the cache requests are merely advisory and maybe evicted if the workers run out of space 

或者，这些cache请求只是建议Spark对数据进行缓存，如果这些worker中的内存满了，那么这些请求就会被丢弃

1.00.57-*1.00.59

means that

这意味着

1.00.59-1.01.06

calling cache doesn't give you it isn't like a reliable directed to make sure the data really is available

调用cache并不能确保这些数据真的可用

1.01.06-1.01.10

 it's just well it'll probably be available on most nodes  but not all nodes

只能说，这些数据在大部分节点上可用，而不是所有节点上可用

1.01.10*1.01.10

 because remember

要记住

1.01.10-1.01.16

even a single node loses its data

只要有一个节点丢掉了它上面的数据

1.01.16-1.01.18

 and we're gonna have to do a bunch of recomputation 

那我们就得重新进行一系列计算了

1.01.18-1.01.31

so I'm guessing that persists with replication is a firm directive to guarantee that the data will be available even if there's a failure

So，我猜复制（replication）与持久化依然是存在的，通过调用一个指令来确保即使发生了故障，数据依然可用

1.01.31-1.01.31

I don't really know

我并不清楚是不是这样

1.01.31-1.01.32

 it's a good question

这是一个好问题

1.01.32-1.01.50

alright okay so that's the programming model and the execution model and the failure strategy 

Ok，这就是它的编程模型，执行模型以及故障恢复策略

1.01.50-1.01.55

and by the way just a beat on the failure strategy a little bit more 

顺带再说点故障恢复策略相关的东西

1.01.55-1.01.58

the way these systems do failure recovery is

这些系统所做的故障恢复的方式是

1.01.58-1.02.03

 it's not a minor thing

这并不是什么少数做法

1.02.03-1.02.07

 as people build bigger and bigger clusters with thousands and thousands of machines

随着人们使用成千上万的机器来构建越来越大的集群

1.02.07-1.02.14

 you know the probability that job will be interrupted by at least one worker failure，it really does start to approach one

你知道的，Spark因至少一个worker出现故障而导致任务被打断的可能性会逐渐变高

1.02.14-1.02.7

 and so the recent designs intended to run on big clusters have really been to a great extent dominated by the failure recovery strategy 

So，那些用于在大型集群上运行的最新设计实际上在很大程度上都在使用故障恢复策略



1.02.17-1.02.18

and that's for example

例如

1.02.18-1.02.43

a lot of the explanation for why Spark insists that the transformations be deterministic  and why the are these its rdd's are immutable

Spark坚持认为这些transformation操作的结果是确定性的以及这些RDD都是不可变的，对此有很多解释

1.02.43-1.02.53

because you know that's what allows it to recover from failure by simply recomputing one partition instead of having to start the entire computation from scratch

因为这使得它通过对一个分区进行重新计算就可以从故障中恢复过来，而不是从头开始执行整个计算过程

1.02.53-1.03.02

and there have been in the past plenty of proposed sort of cluster big data execution models 

在以前的时候，很多集群中的大数据执行模型都是这种，即

1.03.02-1.03.03

in which there really was mutable data

它里面的数据都是可变的

1.03.03-1.03.06

 and in which computations could be non-deterministic

并且这里面的计算可以是不确定性的

1.03.06-1.03.10

make if you look up distributed shared memory systems

如果你去看下那些分布式共享内存型系统

1.03.10-1.03.11

 those all support mutable data 

它们都支持可变数据

1.03.11-1.03.15

and they support non-deterministic execution 

它们都支持非确定性的执行结果

1.03.15-1.03.19

but because of that they tend not to have a good failure strategy

因为它们可能都没有一个很好的故障恢复策略

1.03.19-1.03.22

 so you know thirty years ago

So，在30年前

1.03.22-1.03.25

 when a big cluster was 4 computers

一个大型集群是由4台机器组成的

1.03.25-1.03.26

 none of this mattered 

这个并不重要

1.03.26-1.03.28

because the failure probability was little very low

因为发生故障的可能性非常非常低

1.03.28-1.03.34

 and so many different kinds of computation models seemed reasonable then 

So，很多当时各种不同的计算模型看起来都是合理的

1.03.34-1.03.39

but as the clusters have grown to be hundreds and thousands of workers

当随着集群中的worker数量变得越来越多的时候

1.03.39-1.03.49

 really the only models that have survived are ones for which you can devise a very efficient to failure recovery strategy 

唯一可以幸存的模型是那些我们可以为之设计出非常高效的故障恢复策略的模型

1.03.49-1.03.55

that does not require backing all the way up to the beginning and restarting

它们不需要从头开始对执行中产生的数据进行备份，也不需要重新执行整个计算



1.03.55-1.03.59

 the paper talks about this a little bit  when it's criticizing distributed shared memory

当这篇paper作者在批判分布式共享内存的时候，他有在paper中讨论这一点

1.03.59-1.04.03

and it's a very valid criticism

这是一个很有效的意见

1.04.03-1.04.08

 I bet it's a big design constraint

我敢打赌这是一个很大的设计限制

1.04.08-1.04.10

 okay 



1.04.10-1.04.17

so the sparks not perfect for all kinds of processing

So，Spark并不适合所有的处理方式

1.04.17-1.04.24

it's really geared up for batch processing of giant amounts of data, bulk data processing

它真的很适合用来对海量数据进行批处理

1.04.24-1.04.25

 so if you have terabytes of data 

So，如果你有数TB大小的数据

1.04.25-1.04.31

and you want to you know chew away on it for a couple hours 

你想花几个小时来对它们进行处理

1.04.31-1.04.32

Spark great

那么Spark就很合适

1.04.32-1.04.33

if you're running a bank

如果你经营着一家银行

1.04.33-1.04.39

 and you need to process bank transfers or people's balance queries

你需要去处理银行转账或者人们查询存款余额的请求

1.04.39-1.04.44

 then Spark is just not relevant to that kind of processing

Spark和这种类型的处理并不相干

1.04.44-1.04.46

known or to sort of typical websites

对于某些典型的网站来说

1.04.46-1.04.48

where I log into you know I access Amazon

当我登录访问Amazon的时候

1.04.48-1.04.52

 and I want to order some paper towels

我想去订购一些纸巾

1.04.52-1.04.54

 and put them into my shopping cart 

并将这些商品放入我的购物车



1.04.54-1.04.59

Spark is not going to help you maintain this part the shopping cart

对于维护购物车这块数据，Spark对你并没有什么帮助

1.04.59-1.05.03 *******

Spark may be useful for analyzing your customers buying habits sort of offline

Spark可能有助于离线分析客户的购买习惯

1.05.03-1.05.06

but not for sort of online processing

但它并不适合在线处理

1.05.06-1.05.13

the other sort of kind of a little more close to home situation that 

另一种比较接近平时的使用场景是

1.05.13-1.05.15

spark in the papers not so great at is stream processing 

paper中有提到，Spark并不适用于对数据流进行处理

1.05.16-1.05.20

Spark definitely assumes that all the input is already available

Spark所假定的使用情况是，所有的输入数据都是已经可用的情况



1.05.20-1.05.22

but in many situations

但在很多情况中

1.05.22-1.05.26

 the input that people have is really a stream of input

人们使用的输入数据是一个输入流

1.05.26-1.05.29

like they're logging all user clicks on their web sites

比如，他们记录了所有用户在他们网站上的点击行为

1.05.29-1.05.31

 and they want to analyze them to understand user behavior 

他们想对这些行为进行分析，以此来理解用户的行为

1.05.29-1.05.35

you know it's not a kind of fixed amount of data

你知道的，这并不是一种固定大小的数据

1.05.35-1.05.36

It's really a stream of input data

它是一种输入数据流

1.05.36-1.05.44

and you know Spark as in describing the paper doesn't really have anything to say about processing streams of data

你知道的，paper中并没有谈论关于Spark处理数据流方面的事情

1.05.44-1.05.49

but it turned out to be quite close to home for people who like to use spark 

但这很接近人们平时使用Spark的方式

1.05.49-1.05.53

and now there's a variant of Spark called spark streaming

Spark有一个变种，它叫做Spark Streaming

1.05.53-1.05.58

that is a little more geared up to kind of processing data 

它更适合用来处理数据流

1.05.58-1.06.02

 as it arrives and you know sort of breaks it up into smaller batches and

当数据到达的时候，它会将这些数据流拆分成一些更小的批次进行处理

1.06.02-1.06.03

runs in a batch at a time to spark

Spark每次会对一个批次的数据进行处理

1.06.03-1.06.07

so it's good for a lot of bulk stuff

So，它适合处理海量数据

1.06.07-1.06.10

but that's certainly on to be thing

但只针对某些场景

1.06.10-1.06.11

 right to wrap up

总结一下

1.06.11-1.06.16

you should view spark as a kind of evolution after MapReduce

你应该将Spark视作为一种升级版的MapReduce

1.06.16-1.06.26

and I may fix some expressivity and performance sort of problems that MapReduce has

它可能解决了MapReduce中存在的一些表达和性能方面的问题

1.06.26-1.06.33

 what a lot of what Spark is doing is  making the data flow graph explicit sort of 

Spark经常做的事情是让数据流图变得明确




1.06.33-1.06.42

they wants you to think of computations in the style of figure three of entire lineage graphs stages of computation and the data moving between these stages

他们想让你以Figure 3中的lineage graph这种风格来思考计算过程，以及在这些阶段之间进行数据移动

1.06.42- 1.06.45

 and it does optimizations on this graph

同时，Spark会对这个lineage graph做相应的优化

1.06.45-1.06.50

 and failure recovery is very much thinking about the lineage graph as well 

故障恢复这块我们也得根据这个lineage graph来思考

1.06.50-1.06.55

so it's really part of a larger move in big data processing towards explicit thinking about the data flow graphs as a way to describe computations

So，这其实是在大数据处理中通过数据流图来思考描述计算过程的一种方式

1.07.03-1.07.04

 a lot of the specific win

这里面有很多好处

1.07.04-1.07.09

and Spark have to do with performance 

Spark需要处理性能方面的问题

1.07.09-1.07.12

part of the prepend these are straightforward，but nevertheless important 

这些虽然简单直接，但也很重要



1.07.12-1.07.17

some of the performance comes from leaving the data in memory between transformations 

它们可以通过将transformation操作间产生的中间数据放入内存来提高性能

1.07.17-1.07.19

rather than you know writing them to GFS

而不是先将这些数据写入GFS

1.07.19-1.07.22

 and then reading them back at the beginning of the next transformation

然后，在下一个transformation操作执行开始的时候，从GFS中读取这些数据

1.07.22-1.07.26

 which you essentially have to do with MapReduce 

这些是你在使用MapReduce的时候不得不做的事情

1.07.26-1.07.31

and the other is the ability to define these data sets these RDDs

另外一点就是，它能够去定义这些数据集，即这些RDD

1.07.28-1.07.34

 and tell spark to leave this RDD in memory

并告诉Spark，将这些RDD放在内存中

1.07.34-1.07.35

 because I'm going to reuse it again

因为我要对它进行复用

1.07.35-1.07.41

 and subsequent stages and it's cheaper to reuse it than it is to recompute it 

在后续阶段中，如果能复用这些结果的话，这样付出的代价要比重新计算它们来得低

1.07.41-1.07.46

and that sort of a thing that's easy in Spark and hard to get at in MapReduce 

这种事情在Spark中处理起来很容易，但在MapReduce中处理起来就很困难了

1.07.46-1.0746

and the result is a system that's extremely successful and extremely widely used and if you obeserve real success 

如果你看过一些成功案例的话，你就会知道，Spark是一个非常成功的系统，它被广泛应用在各种地方

1.07.46-end

okay that that's all I have to say and I'm happy to take questions if anyone has them 

Ok，这就是我要讲的全部内容了，如果你们有任何疑问，我很高兴为你们解答

三十七  阅举报
