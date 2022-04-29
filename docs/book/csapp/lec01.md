
1. 数字的表示及其属性。
2. 机器级编程。
3. 内存系统。


另一个我们将讨论相当多的，对于编程者相当直观的内容
It's aspects of the memory system so modern computers have a very complex
是内存系统的一些方面，所以现代计算机有一个非常复杂的
layered memory system to try give you to hight performance in high capacity at the same time
分层存储的系统，试图同时给你高性能的表现和较大的储存容量
And there's some results of that system that can mean that
使用这个系统的结果意味着
If you program write a program well it might work really well
如果你的程序编写得很好，它可能运行得很好
If you don't it could run very poorly because it's not making use of this hierarchical memory system
如果你不这样做，它可能会运行地非常糟糕，因为它没有利用这个分层存储系统
So and also there's a lot of bugs that show up especially in C programs
还有很多 bug 尤其是在 C 程序中出现
That have to do with memory referencing errors
这与内存引用错误有关
So understanding what those errors are what their manifestation is how to prevent them as a big part of the course
所以搞清楚这些错误是什么，他们的表现是什么，如何防止它们是课程的重要组成部分
So for example if I define a struct that contains a two integer values A in an array
因此，例如，如果我定义一个结构，其中 a 数组中包含两个整数值
And a double precision floating point number d
还有 d 一个双精度浮点数
And if I err this function fun() you'll see what it does is it's given an argument i
这个函数 fun( )，你会发现它的功能是给定一个参数 i
And it sets the element of a to some strange-looking value
它将 a 的元素设置为一些奇怪的值
So as you know I should really only be either 0 or 1 with this code
你知道 i 应该只能是 0 或 1
Because that's the range of possible values of this array a
因为这是数组 a 的值的可能范围
But we can try other things too so...
但我们也可以尝试其他的东西 ......
In particular if you run it on either one or two you'll get what you'd expect
就像第一行或第二行那样运行程序，你会得到你所期望的
That you assigned a 3.14 to element d of this structure
你给这个结构的元素 d 分配了 3.14
And when you read it back you get the same thing
当你读回来时，你会得到同样的结果
And in fact but now if I set a of two to this number
事实上，但现在如果我将这两个数字设置为这个数字 2
All of a sudden you'll see that my floating number which
突然之间，你会看到我的浮点数
seems to have nothing to do with a has changed
一个似乎与 a 无关的值发生了改变
And if I do that same thing with...
如果我做同样的事情 ......
I equal to three you'll see I get a number that's closer to two than to 3.14
i 等于 3，你会看到我得到的数字接近于 2，而不是 3.14
And if I keep going
如果我继续进行下去
Well nothing much happens util I hit (fun)(6) and then the program crashes
那么不会发生其他的变化，直到我调用 fun(6)，然后程序崩溃
So something interesting is going on here at least something quirky is going on
所以发生了一些有趣的事情，至少是一些奇怪的事情
And the reason is again it has to do with how data is laid out in memory and
原因也与数据如何在内存中布局有关
How its accessed and one of the features of C and C++
内存是如何访问的，和 C 和 C++ 的特性之一
It doesn't do any bounds checking on a race it will happily let you reference
它不会在运行中做任何边界检查，它会很乐意让你访问
element number five million of a two element array and not complain
元素下标为 500 万的仅有一或两个元素的数组，而不是抱怨
But the operating system might complain as it did here
但操作系统可能会抱怨，因为它（访问越界）发生在这里面
And it in this particular structure and we'll see more about how structures are implemented and weighed out
而且，在这个特定的结构中，我们将更多地了解结构是如何实现和排列的
But basically the two if each of these uh blocks in this vertical chain represents four bytes
对于最下面的两个元素，垂直链中每个块代表 4 字节
So the two elements of a each are four bytes
所以 a 的两个元素都是四个字节
D is eight bytes and then there's some other stuff in the other beyond them
d 是八个字节，然后在它上面，此结构体与其它结构之间还有一些其他的东西
That's not actually in the structured zone
并不在结构区域内部
So you'll see that if I reference either a[0] or a[1]
所以你会看到，如果我引用 a[0] 或者 a[1]
Then I will just modify that array as designed
然后我会按照设计好的修改该数组
But when I'm calling fun(2) or fun(3)
但是当我调用 fun(2) 或者 fun(3)
What I'm actually doing is altering the bytes that encode this number 'd'
我实际上做的是改变这个浮点数 d 的字节
And that's why you saw the sort of funny numbers come out it
这就是为什么你看到这种有趣的数字出来
And then I go up at some point when I hit 6
当我上升中遇到了某个点，当输入 6 时
I'm modifying some state of the program that
我修改了该程序的某些状态
It's using to kind of keep things organized most likely how it keeps track of allocated memory
它被用于维持程序运行，最有可能是记录已经分配的内存
And that's causing the program to crash
这就导致了程序崩溃
So this is a pretty good demonstration of a why C programming can drive you crazy
所以这是一个很好的演示，说明为什么 C 编程会让你疯狂
Because as you saw it doesn't do bounds checking so it's easy to write code that does invalid stuff
因为正如你所看到的那样，它不会执行边界检查，所以很容易编写出非法的代码
It's also often the case that you'll cause some problem and it has a sort of action a distance feature that
通常情况下，你会导致一些问题，这些问题拥有一种远距离的特性
You can modify some think you're modifying some data structure
你认为是对某个数据结构进行了修改
And what you're doing because of the way things are organized in memory
而你这样做的原因是因为事物在内存中的排列方式
You're changing something totally unrelated somewhere else in the program
其实你改变了与程序中，某个其他地方的完全无关的东西
You'd imagine they're not just one apart but they're 10,000 apart
你可以想象它们不只是分开了，而且它们相隔万里
And things might just run fine for hours days or weeks
而且可能会在几天或几周内程序运行良好
And then always say at some point that data that got corrupted
然后总是说在某些时候数据被损坏了
A long time ago gets accessed and something goes wrong
很久以前被访问并且产生错误
So this can be some of the worst nightmare debugging nightmares
所以这可能是最可怕的调试噩梦
that exists on earth is to try and figure out memory referencing errors
在地球上存在的最可怕的噩梦，是试图找出内存引用错误
So this is actually one argument not to program in C or C++
所以这实际上是一个不要用 C 或 C++ 编程的辩论的论据
And it's a valid argument all admitted
这是一个有效的论据，我承认
But also as a person who's right in a lot of C programming
而且作为一个在很多 C 编程中都是正确的人
You just get more experienced and you know at times that you should actually put bounds checking in your own code
你只是得到更多的经验，你知道有时你应该在你自己的代码中进行边界检查
And there's also tools available that will help you sort of bullet proof your code
还有一些工具可以帮助你对代码进行「防弹测试」
So that it will detect these kind of problems
它会检测到这些问题
So it's not like you have to change languages but it is a particular feature of these languages
所以你不必改变编程的语言，这些缺点是这些语言的一个特点
So understanding sort of the machine-level representation of data structures how they work really make a huge difference
因此，理解数据结构的机器级别表示以及它们如何运行对于
in your ability to deal with these kind of vulnerabilities
你处理这些漏洞的能力十分重要
Vulnerabilities by the way also from a security perspective
漏洞，是从安全角度来看待的
The fourth sort of theme we'll cover in the courses getting performance out of programs
课程的第四个主题是，从程序角度增加它们的性能
Other parts of the curriculum in CS
CS 中课程的其他部分
do much more emphasis on getting the right algorithm at the right data structure
更多地强调在正确的数据结构中获得正确的算法
And that's really well and good it's important stuff I don't deny it
这真的很好，很重要，我不否认它
But they some amount of the sort of low-level optimization that you need to do
但是他们之中某些需要进行一些低级别的优化
That you need to understand what the system does
你需要了解系统的运行规律
What makes it run well what makes it run poorly
是什么让它运行得很好，是什么让它运行不佳
In order to be able to do that kind of optimization
为了能够做到这种优化
So the example we like to use is
所以我们喜欢使用的例子是
These two functions do exactly the same thing in terms of their...their behavior
这两个函数在他们的行为方面完全一样
What they do is copy a matrix or array from called source 'src' to a destination 'dst'
他们所做的是将一个矩阵或数组从源地址 src 复制到目标地址 dst
They're both size to be 2048 rows 2048 columns two-dimensional arrays
它们的大小都是 2048 行 2048 列的二维数组
And you'll see that the program's do the obvious thing you have a nested pair of loops to do the row and column indices
你会看到程序做了显而易见的事情，你有一对嵌套的循环来做行列索引
And you just copy from one source element to a destination element
而你只需从一个一个将源地址元素复制到目标地址的元素
The only thing that's different you'll see is that the two loops
唯一不同的是，这两个循环
Their nesting is different the nesting order is different
它们的嵌套顺序不同，嵌套顺序不同
One case I'm going kind of row first
有一种情况我会，行优先
going through all the rows and then the columns and the other is for any given row
外循环遍历行，内循环遍历列。另一种是先遍历列，再遍历行拷贝
I'm copying all the columns that's really the only difference between these two programs
这是两个程序之间唯一的区别
But what you'll find if you run it on a typical system
但是如果你在普通的系统上运行它，你会发现
It's that one is much faster than the other
第一个比另一个快得多
In this particular machine we ran it on it was about close to 20 times difference in performance
在这台特定的机器上，我们运行它的性能差不多有 20 倍
So something fishy is going on if the same program that differs only in this seemingly insignificant way
仅有这种看似不痛不痒的区别，两个完全相同的程序，运行起来却发生了相当诡异的事情
A way that has no effect whatsoever on its functionality can have this much performance difference
一种对其功能没有任何影响的修改，可以产生这么大的性能差异
And so to understand this you need to stare at the cover of the book
所以要了解这一点，你需要盯着书的封面
Because basically you're two different points of this strange-looking picture that's on your book
因为基本上你是在书上这张奇怪图片的两个不同点
And since there's no axis or labels on it it makes no sense whatsoever
由于封面图没有轴或单位，所以它没有任何意义
But it's there
但它在那里
So what you see is this picture shows four different memory access patterns I won't go into the details
你看到的是这张图片显示了四种不同的内存访问模式，我在这里不会详细讨论
What the throughput measured in megabytes per second on basically a copying program was
基本上复制程序的吞吐量是以兆字节/秒为单位的
And without going into the details what you'll see is
不深入细节，你看到的是
These two functions sort of sit at different points in this memory access pattern
这两个函数在这个内存访问模式中位于不同的位置
The one that goes through a row by row is much better than the one that goes through column by column
一行接一行方法比一列接一列的访问方法要好得多
And as a result you're getting a lot better performance and it has to do with this memory hierarchy and what they call the cache memories
结果是，你获得了更好的性能，它和内存层次结构中的缓存有关
That you're getting way better performance out of it in one case than the other
在某种情况下你获得了比其他方式性能高得多的方法
So that's explains what the cover of the book is about
所以这就解释了本书封面的内容
We'll talk about it more later in the course
我们稍后会在课程中深入讨论它
And then a final part of the course talks more about not just getting computers to run little programs in isolation
然后，课程的最后一部分将更多地讨论不仅让计算机孤立运行小程序
But getting computers that talk to each other over networks implement services like web servers
而且能够通过网络获取彼此交谈，实现像 Web 服务器这样的服务
And other functions like that which of course is where most of the world of computing sits today
和其他功能，就像目前世界上大多数计算机一样
It's not just isolated machines but computers they internet with each other over the networks
它不仅仅是孤立的机器，而是通过网络彼此互联的计算机
They're embedded controllers that are interacting with the physical world
它们是与物理世界交互的嵌入式控制器
So really the the world of computers is a much richer environment
所以电脑世界真的是一个更加丰富的环境
And we'll cover at least some aspects of that in the final part of this course
我们将在本课程的最后部分稍微介绍一点那些方面
So as I mentioned the other feature of this course
所以我提到了这门课的另一个特点
It will get you ready for other systems courses you might take  at CMU
它将帮助你做好你可能在 CMU 学习的其他系统性课程的准备
And here we've listed actually a subset of the courses at the university that require this course is a prerequisite
在这里，我们已经列出了大学中需要本课程作为基础的一部分课程
And they're mostly in computer science and ECE
他们主要是计算机科学和电子计算机工程课程
But you'll see it's quite a range of different courses
但是你会看到这是一系列不同的课程
And each of them builds on to one or multiple aspects of the material you learn in the course
并且它们每一个都基于你在课程中学习的内容的一个或多个方面
So the reason why we make everyone take this course including incoming master's students
所以这就是我们为什么要让每个人都参加这门课程，包括刚入学的硕士生
It's that all these other courses at the university have come to rely on students being familiar
就是这所大学的其他所有课程都依赖于学生熟悉本课程
and having done the work of 213 or 513 as a prerequisite
和 213 或 513 课程为前提
And they can build on that material and sort of cover more ground as a result rather than having to do
而且它们可以基于内容进行深入，并覆盖更多领域，而不是面面俱到
What would otherwise be somewhat remedial work on it
这些内容需要额外地工作来补充
And in fact one of the part of the genesis of this course was the people who taught the operating system course a 410
事实上，这门课的一部分发起人来自操作系统课程 410
Sort of complained that they were spending too much time at the beginning of the course talking about some very basics of machine programming
他们抱怨说，他们在课程开始时，花费太多时间讨论一些非常基本的机器编程
And Dave and I said oh well we can cover that
Dave 和我说，那好我们来教这部分
So that was part of what got this course started
所以这是这门课程开始的起源部分
I mentioned that the course has a sort of perspective that's very different from traditional systems course
此课程有一种与传统系统性课程非常不同的观点
Most systems courses including that whole array you saw there
大多数系统课程包括你在那里看到的整个课时列表
we're about how do I build some particular feature,how do I implement an operating system
我们关注于如何构建一些特定功能，如何实现操作系统
How do I design a pipeline microprocessor?
我如何设计流水线微处理器？
And those it's all important stuff to know
那些都是重要的知识
We really want the people who are out there building operating systems and designing microprocessors to learn how to do it
我们真的希望那些致力于建立操作系统和设计微处理器的人学习如何去做它
On the other hand is a way to sort of get new into this and get the introduction and get the experience
另一种方法是向介绍这些新东西给学生，让学生接触使用它们，并获得经验
We find it more useful to take what we call a programmers perspective
我们发现采用我们所谓的程序员视角更有用
meaning understanding what you as a person who sits in front of a computer screen types code
意思是作为一个坐在电脑屏幕前输入代码的程序员去理解
I need to know about that machine you're typing code for in order to be effective at doing it
为了执行有效的操作，你需要了解你正在输入代码的机器
As opposed to somebody who some day going to be designing the the actual machine itself
和那些有一天会去设计真正的机器本身的人不同
So that by taking that perspective it gives you sort of an understanding
所以通过遵守这种观点，它给你一种见解
So now when you go off to implement it you'll actually know what these features are
所以现在当你着手去实现某种功能时，你会知道计算机的特性是什么
Why it's important to implement them well
为什么很好地依据计算机特性很重要
But also that's by doing this programmers perspective
与此同时，通过这个程序员的视角
It lets you right away get tools that you can use in other places
它立即让你获得可以在其他地方会用到的工具
Where you're writing programs are doing anything related to it and be more effective at that
编写程序或者是任何相关的工作，会使得它们更有效
So this programmers perspective really gives this this dual benefit to it
所以这个程序员的观点确实给了它这个双重好处
We feel is very useful and students who've taken the course in the past have expressed that as well
我们觉得这很有用，而过去参加过这项课程的学生也表示了这一点
So as I mentioned we have two instructors for the course
所以正如我所提到的，这个课程我们有两名讲师
And they also happen to be authors
他们也碰巧是作者
The longest,we've probably taught this course more than anyone else
我们应该是教授这门课时间最长的讲师了
 But it's also taught by other people on campus as well
但它同时也由校内其他人讲授
So what I'm going to do now is hand my pair of microphones over to Dave
所以我现在要做的是把麦克风交给Dave
All right welcome good afternoon it's great to see you
好的，下午好，很高兴见到你们
My name is Dave O'Halloran
我叫 Dave O'Halloran
And I'm just delighted to have the opportunity to be one of your instructors this term
而且我很高兴有机会成为你这个学期的导师之一
This course is one of the reason I'm so excited to be teaching
这门课是我对于教学很兴奋的原因之一
I just love this course
我只是非常喜欢这个课程
The real the reason is the the opportunity of represents to have an impact on people's lives
真正的原因是它具有对人的一生产生影响的机会
We really believe that the material you learned this semester
我们真的相信你在这个学期学到的知识
can have a really positive and long-lasting impact on on your careers
可以对你的事业产生真正的积极和持久的影响
And it'll help you not only with your future classes but also future positions you have
它不仅可以帮助你学习未来的课程，还可以帮助你掌握未来的职位
And I hear this from people all all the time from CMU students
我总是从 CMU 的学生那里听到这种反馈
Students around the world who have taken the equivalent of 213 it at their schools
从世界各地在他们学校已经接受了等同于 213 课程的学生口中
I even though a couple years ago we were interviewing a faculty member tenure tenure-track faculty member
即使在几年前，当我们正在面试一位终身教授
Who went to did his undergrad at CMU
他是在 CMU 就读的本科
And then went off to Stanford got his PhD at Stanford and was coming back to you know join the faculty
然后去斯坦福大学获得他在斯坦福大学的博士学位，并回到这里的系就职
And he told me that 213 changed his life in our interview
他在面试中告诉我，213 改变了他的生活
Now I don't know if he was trying to butter me up
现在我不知道他是否故意想要让我高兴
But I think I believe him
但我相信他
He said it changed his whole life in the sense that it gave him a research direction
他说这改变了他的整个生活，因为它给了他一个研究方向
You know he didn't really know what he knew it kind of like computer science but it didn't really know what direction to go
他过去并不真正知道什么是计算机科学，并不知道要走什么方向
After he took 213 he knew they wanted to to do his work was life's work in systems
在他上 213 之后，他知道他的人生目标工作是计算机系统
Now it was just remarkable right to come down and tap we ended up actually hiring him
现在，他认为选择计算机底层是很正确的选择，我们最终聘请了他
He told me that everybody in his lab at Stanford all of the grad students had a copy of the book on their desk
他告诉我，在他斯坦福大学的实验室里，每个研究生都在他们的办公桌上放了这本书
From and they were from all over you know all different schools
他们都来自不同的学校
And so I mean I even I was in a bookstore in Beijing a couple years ago right outside the PKU campus
我几年前进入北京一家书店，就在北大校园外面
I was up on the fifth floor trying to see if I could find a copy of the textbook
我在五楼想看看是否可以找到这本书
And I found the English version in one aisle
然后我在一个通道里找到了英文版本
And then a couple aisles over I found the Chinese version
接着我在相隔几个过道远的地方找到了中文版
I was going through the Chinese version and this guy taps me on my shoulder
我正在浏览中文版本，有个人在我的肩上拍了一下
And I turned around,he says oh man that that book is really good you should the English version is 2 aisles over
我转过身来，他说哦哥们，那本书真的很好，你应该看英文原版，离这里两个过道远
And I mean it just blew me away to be to be in the head of someone like
它戳破了我以为我会被读者牢记住的想法
halfway around the world it was just that it was just one of those moments
在世界各地的中途，它只是那些时刻之一
So I'm not trying to boast, I'm just trying what I want I want to give you the sense of
所以我不想吹牛，我只是想尝试给你我的感受
What it what an opportunity this course represents for Randal and I to to have
这个课程对 Randy 和我来说有什么样的可能
What we hope will be a really positive impact on on your lives
我们希望对你的人生产生真正的积极影响
So let me we have kind of a kind of a funny organization for the course
我们这个课程有个很有趣的课程安排
in response to that just the the tremendous demand we have we found that we have for it
为了应对巨大的需求，我们发现我们有这个需求
So there's there's actually three course numbers but it's all the same course
所以实际上有三个课程号码，但它们都是相同的课程
It's the identical course 513, 15-513 is for our master students
这是相同的课程 513, 15-513 是针对我们的硕士生
And the 15-513 doesn't have a formal lecture so there's no seats assigned to it
而 15-513 没有正式的面授课，所以没有分配座位
It instead we'll videotape the lectures
相反，我们会录制讲座
And e'll make those available on the course web web page for our graduate students
并且，我们会在研究生的课程网页上提供这些录像
The reason we do this is just because in the past well we didn't have enough seats for everyone
我们这样做的原因是因为在过去，我们没有足够的席位给每个人
And there would be cases where there might be a hundred 150 master students on the waitlist
而且有些情况下，可能会有一百名 150 名硕士生在候课名单上
They wouldn't be able to get into the course
他们无法参加这个课程
We didn't really want that because they need this course for to take other courses
我们不想这样，因为他们需要这门课来参加其他课程
So that's the reason why we have this this sort of does not need version of 213, 513
所以这就是为什么我们有这种累赘的 213, 513 两个版本的原因
Because we can admit as many all the master's students that that need to take the course
因为我们可以接收所有需要上这门课的硕士生
Now 15-213 and 18-213 or are for undergraduates in computer science and ECE respectively
现在 15-213 和 18-213 分别是针对计算机科学和电子计算机工程的本科生
The undergraduates will go to lectures and recitations okay in person graduate students will watch videotapes of those
本科生将去上课，研究生会看这些录像带
But otherwise,yes
但是，从另一方面，好的
[students speaking]
[学生发言]
Yeah we're making them available to everyone actually
是的，我们正在将它们提供给每个人
Sorry?
什么？
And lecture slides as well everything's available on the course web page
和演讲幻灯片的所有内容都会在课程网站上提供
So you'll be doing
所以你会做
The all of students will have equal access to office hours,
所有的学生将有平等的访问办公室时间，
the staff mailing list and everybody does the same labs and the same exams
员工邮件列表和每个人都做同样的实验作业和相同的考试
Okay so it's just a question it's just a matter of whether you're good a lecture in person or if you watch it on video
好吧，这只是一个你是善于听讲座，还是在视频中观看的问题
In fact if you know since it's available to everybody if you miss lecture it'll be there
事实上，如果你错过讲座的话，每个人都可以在网页上找到它
on the webpage you can catch up which I know you'll probably do
在网页上你可以跟上进度，我想你们很可能要这样做
Actually I know most of you will never miss class
其实我知道你们大部分人都不会翘课
Right, but the few of you who do now you'll be able to watch the video
但现在你们中的极少数人会，他们可以看视频
Okay.All right this is the one part,this part I hate
好吧，这一部分是我讨厌的部分
I love teaching that this is the one part teaching that
我喜欢教学，但是不包括这部分
None of us really like.But we have to talk about it and that's academic integrity
我们没有人真的喜欢。但我们必须提起它，那就是学术诚信
If you're new on campus coming from a international school
如果你是来自国际地区学校的校园新生
If you're an international student new on campus
如果你是新的国际学生
There might be different notions of academic integrity
学术诚信可能有不同的概念
And different notions of cheating at your undergraduate school your old school
和你的本校在你的旧学校作弊的不同概念
So if you're new on campus pay very close attention to this
所以，如果你是校园新人，就要非常注意这一点
Because at Carnegie Mellon we take academic integrity very seriously
因为在卡内基梅隆，我们非常重视学术诚信
Okay it's not a wink wink nod nod, we're very serious about it
好吧，这不是一个眨眼点头的话题，我们对此非常认真
We want everybody doing their own work to preserve the integrity of the courses
我们希望每个人都独自完成作业，以保持课程的品质
So what exactly is cheating?
那么究竟是什么作弊？
So if you share code with anybody
所以，如果你与任何人分享代码
either copying, retyping, if looking at somebody's code like, if you look at somebody's code on the screen
无论是复制，重新输入，查看某人的代码，例如你看屏幕上的某个人的代码
Or if you give somebody a file
或者如果你给某人一个文件
All of those,all of those examples of sharing are cheating
所有这些，所有这些和他人分享的例子都是作弊
If you describe your code like line by line to somebody that's cheating
如果你逐行描述你的代码给别人，是作弊
If you coach somebody line by line that's cheating
如果你指导某人一行一行写代码，是作弊
Searching the web for solutions just the act of searching is cheating
搜索网络上的解决方案，仅是搜索的行为，也是作弊
This is a real problem for us in particular
这对我们来说尤其是一个实际的问题
Because the course is I offered all around the world and
因为课程是我向全世界提供的
People either maliciously or or sometimes just they're proud of their work
人们无论是恶意传播，或是他们有时只是为自己的成果感到自豪
And they post it you know for employers on like public github sites
他们会在类似的公共网站例如 Github 上发布成果，并展示给招聘者
So it might be tempting to to search for these solutions
因此，寻找这些解决方案可能很诱人
But even the act of searching is cheating
但即使是搜寻的行为也是作弊
And definitely if you find some a solution in and use it.That's cheating
当然，如果你找到一些解决方案并使用它，那就是作弊
Even if you modify it afterwards
即使你之后修改它
And I just want you to remember I know how to use Google just as well as anybody else right
我只想让你记住我知道和其他人一样也会用 Google
So I can search for solutions too
所以我也可以搜索解决方案
So copying code you know you might be tempted to copy code from someone who took the class you know in a previous semester
因此，你复制的代码可能在之前的课中已经被某人复制并使用过了
Don't do it,that's that's cheating too
不要这样做，那也是作弊
Now what's not cheating?
那什么不是作弊？
So you can help each other use tools
你可以互相帮助使用工具
You know somebody's having trouble using gdb
有人在使用 GDB 时遇到麻烦
You know they have questions about how to run use a text editor
他们有关于如何运行使用文本编辑器的问题
That stuff's all great you help each other out using the tools
这些东西都很棒，你们互相帮助学习使用工具
How to login the shark machines all of that kind of stuff
如何登录 Shark Machine 的之类的事情
You can help you can discuss sort of high-level design issues and that's probably a good idea
你们可以讨论某种高层次的设计问题，这可能是一个好主意
Yes
什么事？
[student speaking]
[学生发言]
Yeah yeah did you take it a previous semester
是的，你是否在上一学期上课
[student speaking]
[学生发言]
Okay yeah the question was if you took it in a previous semester can you use your work and the answer is yes
好的，问题是如果你在上一个学期上过课，你可以使用你的成果，答案是肯定的
So you can also talk to each other about high level you know design issues
所以你也可以互相谈论高层次内容，设计理念
You know how are you using an explicit list or using a segregated list for your Malloc lab
你是如何为你的 Malloc Lab 使用 explict list 或使用 segregated list
That kind of stuff is okay, high level okay low level not okay
这样的东西可以，高层次的可以，低层次的不行
Basically what we want you to write your own code
基本上我们希望你写你自己的代码
This is not,you know it's kind of a cut and paste world these days
你知道现在是一个复制和粘贴的世界
Right you look stuff up on Google, Stack Overflow you cut and paste it
你在 Google，Stack Overflow 找你想要的东西，然后剪切并粘贴它
But that's not that's not the way we do it
但那不是我们的方式
Here we want you to do the work yourself
我们希望你们独立完成作业
We want you to enjoy the experience of figuring things out  and learning how to solve problems
我们希望你能够享受发现问题和学习如何解决问题的过程
Now the consequences for cheating there's a single sanction
现在作弊的后果是​​单一的制裁
If you're caught cheating you'll be expelled from the course with an R
如果你被发现作弊，你会被驱逐出课程并得到 R 评分
There's no exceptions alright if you drop the course we'll just reinstate you and then flunk you
没有例外，如果你放弃课程，我们会恢复你，然后让你不及格
[students laugh]
[学生笑]
It's really uh it's a very serious very serious penalty
这真的是这是一个非常严重的非常严重的处罚
Because we just take it we take it so seriously that it's uh
因为只要我们抓到，我们十分严肃的处理
It's just something we don't want your to do
这只是我们不希望你做的事情
We have amazing tools to detect code plagiarism
我们有极好的工具来检测代码抄袭
We have amazing tools to detect plagiarism
我们有极好的工具来检测抄袭
That are resilient to renaming reformatting
它这对重命名、重新格式化都具有适应性
They operate at a very deep syntactic level
它们工作在层次非常深的语法层面
So just please please don't do it
所以请千万不要这样做
We have I think 18 TAs we have office hours almost every day of the week
我们有  18 个助教，每周都有的开放办公室时间
There's plenty of opportunities and ways to get help start early
有很多机会和方式可以帮助你，尽早去做
If you get stuck start early enough so that if you get stuck you can go ask for help
如果你遇到困难了，尽快去寻求帮助
We have but automatic extensions built-in if you need more time I'll talk about that later form of grace days
如果你需要更多时间，系统内置有自动扩展时长的插件，以后再说这个，以宽限日为形式
But please please whatever you do don't cheat
但请你，请你不管做什么都不要作弊
It's just tragic when it happens last last fall 25 students were expelled from the course
去年秋天发生了一场悲剧，有 25 名学生被逐出课程
Some were expelled from the University because it was a second offense
有些人被驱逐出大学，因这时他们第二次作弊
Many were sent home I talked to students who were like the only person in their family to go to college
许多人被送回家，有些人是家里唯一上过大学的人
The only person in their village to go to college and they were going home without without a degree and it's just tragic it's just
有一个人村里唯一上大学的人，（因为作弊）没有学位就回家了，这只是一个悲剧
So please please please don't do it
所以请千万不要这样做
Do your own work and it'll be a wonderful experience
完全独自工作，这将是一个美妙的经历
Okay let's Randy mentioned the the textbook is computer systems a programmers perspective third edition
好吧，Randy 提到教科书是《深入理解计算机系统》第三版
You can know there's a whole bunch of supporting material on the books website at http://csapp.cs.cmu.edu/
你可以在 http://csapp.cs.cmu.edu/ 网站上获得大量支持材料
And as Randy mentioned this this book really matters for the course
正如 Randy 提到的那样，这本书对课程而言非常重要
Because actually the book came out of the course
因为这本书实际上是从课程中诞生出来的
The book is the course of course it's the book
这本书就是这个课程，课程也是这本书
And so it'll it will really help you, love it
所以它会真的帮助你，爱上它
The labs that we do come directly from material we discuss in the book
我们的实验直接来自我们在书中讨论的内容
So what I would encourage all of you to do
所以我鼓励大家做
I'm not sure if anybody has ever taken this advice but I say it every year
我不确定是否有人接受过这个建议，但我每年都会这样说
anyway because I believe it
无论如何因为我相信它
But I think a really good strategy for studying and preparing for this course would be to read each chapter three times
但我认为为学习和准备这门课程，一个非常好的策略是每次阅读每章三次
Read three times work the practice problems
三次阅读，然后做练习题
So we have littered throughout the book or practice problems with solutions at  the end of the chapter
我们在整本书的每个章节末尾设置了有答案的练习题
And these practice problems are like little sort of bite-size morsels just kind of
而这些练习问题就像是一点点的一口大小的东西
just to kind of check your kind of a sanity check of your understanding of the material
只是为了检查一下你对教材的理解程度
I think if you read this if you read the book each chapter three times and work the practice problems
我认为如果你阅读这本书，如果你每一章读三遍，并做练习
You would be an excellent way to go through the semester and prepare
你将拥有成为完成学期和准备的绝佳方式
The other book we use is the Kernighan and Ritchie's classic C programming book
我们使用的另一本书是 Kernighan 和 Ritchie 的经典 C 编程书
I think this is still this was written a long time ago
我认为这虽然是很久以前写的
It's still the best book around I think for C
它仍然是我认为的最好的 C 语言书
It's a beautiful example of technical writing
它是技术写作的典范
It was one of the inspirations I used when I was writing the book，you know I tried to find that same clarity and precision
我在写书的时候受到这本书的启发，我试图达到相同的清晰度和精确度
that they turn Kernighan and Ritchie have in their book
他们把 Kernighan 和 Ritchie 形象地写进书中
So this is a this is a really good book
所以这是一本非常好的书
I mean this is kind of book it's a reference
我的意思是这书只是作为参考
But it's a kind of book you can just read from beginning to end
但是这是一本书，你从头到尾读一遍
And get a really good understanding of C
就能对 C 有很好的理解
There's four main components to the course
这门课有四个主要组成部分
There's lectures where we go over the high level concepts, recitations where
包括从较高层次讲解概念的讲座
Which meet once a week for an hour led by a TA
时长一个小时，每周由助教主持一次的复习课，
The purpose of the recitations is really to help you with the labs
复习课的目的是帮助你做实验
So it's very practical and hands-on
所以这是非常实用的而且是亲自动手的
There's seven of those labs and these are really the heart and soul of the course
这些实验有七个，这些都是课程的核心和灵魂
This is where all the real learning comes in I think
我认为这就是真正的学习的意义
When you actually have to do this stuff
当你亲自去做这个东西
And that's why we take the cheating parts so seriously
这就是为什么我们认真对待作弊的那方面
Because if you do these labs you're going to learn an incredible amount of really cool stuff
因为如果你认真做这些实验，你会学到一大堆非常酷的东西
If you don't do them you won't learn anything
如果你不这样做，你将不会学到任何东西
So each one of these labs is 1-2 weeks each
所以每个实验的长度都是 1-2 周
And involves typically some kind of programming or measurement
通常涉及某种编程或测量数据
There's also two exams a midterm and a final
还有两个考试是期中考试和期末考试
The exams are proctored they're online proctored in Wayne and and in Gates
这些考试被监督，他们是在线考试并且有监考，在 Wayne 和 Gates 教学楼
What we do for the exams is we have like we take like four days
你要为考试准备四天时间
from 10:00 to 10:00 and then you can sign up
从早上 10 点 到晚上 10 点，你可以注册考试
And then we have like multiple clusters that are Network isolated
我们有像网络隔离的多个组
And then you can sign up for a slot like a 6-hour slot
然后你可以注册一个大概 6 小时的时间段
And the midterm is like nominally like an hour eighty minute
期中考试名义上只有八十分钟
Exam it's the same exam we use we gave when we used to have people sitting in person
考试是我们以前让人们亲自坐在一起时的那种考试
So it's nominally like 80 minutes but we give you like a five or six hour window to do it
所以虽然它名义上是 80 分钟，但我们给你五六个小时内的任意时间去做这件事
Okay so there's so you can sign up any time any day that there's a slot
好吧，所以你可以在任何时间任何时候注册考试时间
Okay so there's flexibility so you can kind of tailor it to your schedule
好的，所以考试有灵活性，你可以按照你的日程安排
And we I think we've also removed all the time pressure right so which is
而且我们认为我们也将所有的时间压力都排除在外，所以
You can go back you can check your work you can just kind of relax
你可以回去看看你的答案，你可以放松一下
And not be worried about how quickly you do it
而不用担心你的答题速度
Now there's many different ways to get help
现在有许多不同的方法可以获得帮助
The main source of information is the course web page
信息的主要来源是课程网页
That's http://www.cs.cmu.edu/~213
那是 http://www.cs.cmu.edu/~213
All the information is there.We've got a complete schedule of lectures and assignments
所有的信息都在那里。我们有完整的讲座和作业时间表
We don't change it that's it's fixed and so you can look at that and and plan your semester
我们不会改变它，这是固定的，所以你可以看看，并计划你的学期
knowing that those dates won't change
了解这些日期不会改变
We've actually even got all of the lectures posted ahead of time for for the other instructors around the world who are using the book
实际上，我们甚至为全世界正在使用本书的其他讲师提前提供了所有的讲座
So we needed to get them all already
所以我们需要把它们全部弄完
There's also news at the at the very beginning there's sort of news
在网页最上面的地方有课程的新闻
If we need to make announcements we'll post it there
如果我们需要发布公告，我们会在那里发布
We don't use either blackboard or Piazza in the course
我们在课程中不使用 Blackboard 或是 Piazza (论坛)
Instead we have a staff mailing list
相反，我们有一个员工邮件列表
That you can send mail to if you have questions
如果你有问题，你可以发送邮件
And all of the TAS and all of the faculty are subscribed to that staff mailing list
所有的助教和所有的教师都订阅了该员工邮件列表
And so we'll all see it
所以我们都会看到它
And we usually we try to have you know really fast feedback right
我们会尽量让你收到快速反馈
So there's so many people looking at your emails
有这么多人在看你的电子邮件
That chance is very high you'll get on and answer back quickly
这个机会非常高，你会很快收到回复
The the disadvantage of having this advantage of this mailing list is that it allows us to control the message
使用邮箱的优点是它允许我们控制消息
And control what we're it's what feedback we' re giving back to you
并控制我们给你的反馈内容
The disadvantage is that we often get the same question over and over again
缺点是我们经常会一遍又一遍地回复同样的问题
So for that we've established a FAQ if we find we're getting same questions over and over
因为我们一遍又一遍地收到相同的问题，所以我们建立了一个 FAQ
We've established a FAQ on the course web page
我们已经在课程网页上建立了一个 FAQ
 For it sort of organized by labs,so you can see the answers to frequently asked questions
由于它是由实验分类的，所以你可以看到常见问题的答案
We have office hours they were still trying to we were still trying to meet with the staff and
我们有开放办公时间，我仍然在跟工作人员联系
figure out the exact office hours
确定的开放咨询时间
But what we're thinking now is that we'll have office hours six days a week every day but Saturday
但是我们现在想的是，除了星期六，我们每周都会有六天的办公时间
They will be at the same time and same place every day so from 5:45 to 8:30 in WeH 5207 cluster
老师们将每天在同一时间和同一地点从 5:45 到 8:30 在 Wayne 5207 大教室
We'll have 213 TAs there to to help to answer your questions
我们将有 213 课程助教帮助回答你的问题
So you don't have to make appointments
所以你不必预约
I mean you can't make an appointment to see any staff member of course
我的意思是，你当然不能预约见任何工作人员
But you don't you know that at the same time same place every day
但是你知道每天同一时间在同一个地方
There's somebody you can go to for help
那里有你可以去寻求帮助的人
Okay for our labs and exams every assignment,every lab is a single person
好的，我们的实验项目和考试每个任务，每个实验都是一个人完成的
So we don't have any group projects
所以我们没有任何集体项目
We want you to do the work yourself
我们希望你自己做这项工作
Now you know it's important to work in groups and you will learn how to work in groups Other classes CS classes
现在大家知道团队工作很重要，而且你将在其他 CS 课程学习如何在团队中工作
But not in 213 we want this is a kind of a core course we want you to figure stuff out yourself
但不是在 213 。我们认为这是一节核心课程，我们希望你自己弄清楚
All of our hand-ins will be due at 11:59 p.m. on either a Tuesday or Thursday
我们所有的上交作业将于下午 11 点 59 分截止。在周二或周四的某天
You can see which on the schedule page on the course webpage
你可以在课程网页上的日程表页面上看到
And all of our hand-ins are using autolab
我们所有的作业都使用 Auto Lab 自动实验系统
Where you know you've probably used it for some of your other classes
你知道你可能在其他一些课程已经见到它了
But it's a Auto grading service that allows you to get instant feedback on your handin
它是一个自动评分服务，可以让你在交作业时获得即时反馈
So when you hand it in you get feedback right away
所以当你把作业上交时时，马上就会得到反馈
The exams like I mentioned are going to be a network isolated clusters held over multiple days
像我所提到的考试是分为多个网络隔离组，连续多天举行的
You can just sign up for a slot that's available now
你只需申请一个有效的时间段就可以了
What usually happens if we offer like the exam Tuesday Wednesday and Thursday
通常这种情况会发生，如果我们在星期三和星期四提供考试时间
The Thursday slots fill up immediately
星期四的考试时段会被立即报满
I guess I should try to sign up soon if you want
我想你应该申请尽早的考试时间
But people always seem to want to defer to the end rather than
但人们总是希望推迟到最后
And if it's me I'd want to get it over with
如果这是我，我想把它尽早解决
So I just that that is sort of a constraint right that
所以我只是说这是一个正确的约束
You can only sign up for slots that that available
你只能注册可用的时间段
Okay now you know we make mistakes there's we always make mistakes especially with so many students
那么，你知道我们会犯错，我们总是犯错误，特别是有那么多学生
So we there's a specific process for appealing grades
所以我们有一个申诉成绩的具体流程
If you think that there was a glitch the work wasn't graded properly
如果你认为有一个系统错误，作业没有被正确评级
So what you do after after either an exam or after your labs are graded
所以你在考试之后或者在你的实验项目之后都要进行评级
You have seven days to file an appeal
你有七天的时间提出上诉
And appeals have to be in writing and hardcopy
上诉必须以书面形式和纸质形式进行
Okay so there's no we won't consider any email any appeals via email
所以没有我们不会考虑任何电子邮件通过电子邮件的任何申诉
It has to be in writing and hardcopy  and you give those to me
它必须以书面形式和纸质形式提交给我
If I'm not there you can just slide it under the desk
如果我不在那里，你可以把它放在桌子下面
And what the reason we do it that way is it allows us to treat everybody fairly
我们这样做的原因是它让我们公平对待每个人
We get all the appeals together at once
我们一次会汇集所有的申诉
And then we can treat everybody the same way rather than just sort of doing them one at a time like that
然后我们可以用同样的方式对待每个人，而不是一次一个地处理
Now for our labs we have ten machines that were donated by Intel called the shark machines
关于我们的实验，我们有十台由英特尔捐赠的称为鲨鱼机器的机器
So initially our first version of 213
所以最初我们的 213 的第一个版本
I guess we started using Intel machines in 1999,we used to alpha processors for the first year
我想我们在 1999 年开始使用英特尔机器，我们在第一年使用的是 Alpha 处理器
I like to fish
我喜欢钓鱼
So all of our machines work they were called the fish machines right
所以我们所有的机器都能正常工作，他们被称为鱼机
They were freshwater fish
他们是淡水鱼
And then we upgraded a few years after that and those were the saltwater fish machines
然后我们在那之后几年升级，新的那些是咸水鱼机器
And then we upgraded like in 2011 to these Nehalem class servers
然后我们像 2011 年一样升级到这些 Nehalem 服务器
And run out of fresh water fish and saltwater fish
从淡水鱼和咸水鱼中递推出来
So the next grade up was sharks right
所以下一个级别是鲨鱼是对的
So every fish is it's named after some kind of shark
所以每条鱼都是以某种鲨鱼命名的
But these are the same machines that that you know that auto lab uses for grading right
但是，这些机器都是一样的，对于每个实验室的自动实验室系统来说
So there's some consistency for performance oriented labs like malloc lab
所以对于像 Malloc 实验室这样的需求以行为一致性为导向的实验室项目
And you can access them that they're you the names are listed on the course webpage
你可以访问它们，它们的名字在课程网页上列出
And so you can SSH to a specific machine
所以你可以 SSH 到特定的机器
They're all identical
他们都一样
If you have an Andrew account you've already got accounts on the machines right so there's nothing special to do
如果你有一个 Andrew 账户，那么你已经在机器上拥有了账户，不用额外操作
Or you can just SSH to shark.ics and you'll just randomly put you on on one of the shark machines
或者你也可以通过 SSH 访问 shark.ics，然后系统随机将你放在一台鲨鱼机器上
Okay if you have any trouble logging in just send send mail to the staff mailing list
好吧，如果你在登录时发生任何问题，只需发送邮件发送到员工邮件列表
Okay we know that during the semester things come up grandparents died especially near the near the final
好吧，我们知道在这个学期的时间里，不幸发生了，祖父母死了，特别是在期末附近
That's harsh
那太冷酷了
But that things come up right and you've got your very busy
但是，事情正确，你的工作非常忙碌
You're taking a lot of courses
你参加了很多课程
So instead of sort of dealing with requests for extensions
所以，为了不反复处理这些延长时限的请求
 And you know all these special cases what we do
我们知道的所有这些特殊情况
It's we give you five grace days that you can then spend as you wish
我们给你五个宽限日，让你可以随心所欲地消费掉
 So if you hand your work in late one day late you'll automatically consume a grace day
所以如果你迟一天晚递交你的作品，你会自动消耗一个宽限期
Okay we don't allow you to sort of allocate the grace days
好的，我们不允许你分配宽限期
You spend one of your grace days by handing in late
你花掉宽限日，通过晚交作业的方式
so if you have a great day left then you hand in late
所以如果你还有一个宽限日，然后你迟交了
You'll spend that grace day but you won't be penalized for the late hand in
你会花这个宽限日，但你不会因为晚交作业而受到处罚
So we have five grace days over the entire semester
所以整个学期我们有五个宽限日
And a maximum of two grace days for the assignments
和最多两个作业上交宽限日
Now we're going to set up since the first three assignments are kind of not as programming intensive
现在我们要开始了，因为前三个实验任务并不要求很多编程
And don't take as much time
而且不要花太多时间
We're not going to allow any grace days for those
所以我们不会允许那些宽限期
Because...a one grace day one sorry one grace day
因为 ...... 一个宽限日，可以有一个宽限日，抱歉
And then for the the latter four labs which are much more intense we're going to allow you to a max of two grades days
然后对于后面更困难的实验室作业，我们将允许你最多两个宽限日
And the reason we're doing this is because we don't want you to burn your grade these grace days are valuable
而我们这样做的原因是因为我们不希望你们丢掉成绩，这些宽限日是很有价值的
They're critical especially later in the semester when it have you really dizzy
尤其是在学期后半段时间，你真的很迷糊
So we don't want you to burn up your grace days early in the semester
所以我们不希望你在学期的早期耗尽你的宽限日
And this happens every semester
每个学期都会发生
And it and then when Malloc lab comes up there's no grace days left
然后，当 Malloc 实验室作业出现时，没有任何宽限日了
It's really sad to see that
这真令人觉得难受
So we're going to limit you to one for those first three
所以我们会限制你前三个实验室作业，只能用一个宽限日
Just to help you save you from yourself
只是为了帮助你自己拯救你
Now...
现在...
The nominal late penalty if you don't have a grace days 15% per day
如果你没有宽限期，名义上的延期处罚为每天 15%
And we don't allow any handin its three days after the due at all
而且我们不允许在到期三天之后内提交任何东西
So that our lab shuts off
也就是我们的实验室已经关闭了
Now if there is some kind of catastrophic about
所以，如果有什么灾难来临
Then you know please contact us  for an extension right so why not
那么，请联系我们请求拓展时间，为什么不呢
You know we try to be reasonable
你知道的，我们十分通情达理
But most of the reasons that for requesting extensions
但是对于请求延长时间的大部分因素
You can handle yourself about using your grace days
你可以使用你的宽限日来处理
And just I mean this is this is advice I give every semester too
这是我每学期给予的建议
But it's people often don't don't pay attention but or
但是，人们往往不注意，但
just they're unable to but but really you for every one of these assignments you want to start early
只是他们无法做到，但实际上你对于你想要尽早开始的每一项任务都是如此
And the reason is you need to give yourself time to to go seek help if you get stuck
原因是你需要给自己时间去寻求帮助，如果你卡住了
 Because the nature of these very programming intensive assignments like we have in 213 is that you're going to get stuck
因为这些编程十分密集型任务的性质就决定，像 213 中那样，你会陷入困境
And often it's very hard to to bound the time you spend on on some of these assignments
往往很难控制你花在这些任务上的时间
You know it's not like problem sets where you can kind of predict you know this will take
你知道这不像做习题集，你可以预测将会花费的时间
Others will take me like three hours to do do these problem sets for
我要花会花三个小时来做​​这些习题集
 A lot of the 213 assignments it's very difficult to to sort of manage your time and bound your time
213 中的很多作业，很难去管理你的时间和限制你的时间
So for that reason you really want to start early to give yourself a chance to get help when you get stuck
所以出于这个原因，你真的想早点开始给自己一个机会，当你卡住时得到帮助
Now in the lecture hall you're permitted to have your laptops
现在在演讲厅，你可以使用笔记本电脑
But we ask you not to send email or instant messaging or cell phone texting or anything like that
但我们要求你不要发送电子邮件或即时消息或手机短信或类似的东西
If you hear we want you to to be attentive and engaged
如果你听我们的讲座我希望你们积极参与和认真听讲
Your presence in lectures and recitations is voluntary so we don't take
你在讲座和背诵课的参与是自愿的，所以我们不采取
We don't take role at either of those
我们不担任任何角色
We encourage you to come but it's not required and no recordings of any kind except this one
我们鼓励你来，但这不是必须的，也没有任何类型的考勤记录，除了
Okay the exams and labs are weighted equally 50% midterms 20 finals 30
好吧，考试和实验室分数各分 50％，期中考试 20% 期末考试 30%
Final grades are based on a straight 90,80,70 scale
最终成绩基于 90, 80, 70 成绩分段
Now rough outline of the semester
现在这个学期的教学大纲
The first three labs cover programs representations of programs and data
前三个实验室涵盖程序和数据的程序表示
Data lab is how we teach you about bit level representations of data
数据实验室是教你关于数据的位级表示的
So you'll saw collection of puzzles and see like a puzzle might be is a little function
所以你会看到谜题的集合，一个谜题可能是一个小功能
that you have to implement like absolute value
你必须实现譬如绝对值
So a function that returns the absolute value of its input argument
一个函数返回其输入参数的绝对值
The kicker is that we restrict the set of operators that you can use
异常条件是，是我们限制你可以使用的运算符类型
And it has to be straight line code no conditionals or loops
它必须是顺序执行的代码没有条件或循环
So to solve these puzzles
所以解决这些难题
So imagine how you might try to solve absolute value without using an if statement
所以想象一下，如果不使用 if 语句，你如何尝试解决绝对值问题
The normal way to do it would be if X less than 0 return X or negative X
正常的做法是如果 X 小于 0 则返回负 X 否则是 X
See I told you we make mistakes
我告诉你我们犯了错误
But imagine how you might do that without using conditionals and only using bit levels C operations
但想象一下，如果不使用条件并仅使用位级 C 操作，你可能会这样做
Right so this is how this is our way of teaching you how data is really represented in the machine
对，这就是我们如何教导你如何在机器中表现数据的方式
Now the bomblab which you've probably heard at this is
现在你可能已经听过了这个 bomblab
This is a kind of famous all over the world now and at CMU
这个实验在 CMU 和全世界都很有名的
The bomb lab is the way we teach you how to read and understand assembly language
炸弹实验是我们教你如何阅读和理解汇编语言的方式
And a bomb just briefly a bomb is it is a C program that consists of a collection of six phases
一颗炸弹，简单来说它是一个由六个阶段组成的 C 程序
And each phase wants you to type something in at the keyboard
每个阶段都需要你在键盘上键入内容
If you type in the what it wants you to type what it expects you type
如果你输入了它想要你去输入的内容
Then you've diffused that phase and it goes to the next phase
然后，你已经拆解了这一阶段的炸弹，并进入下一个阶段
Then you have to type what that phase
然后你必须输入那个阶段要求的输入
And if you defuse all the phases then you've diffused the bomb
如果你化解所有阶段，那么你已经解除了炸弹
However if you type in the wrong thing then the bomb explodes by printing boom
然而，如果你输入错误的东西，那么炸弹就会通过打印 BOOM 而爆炸
And you have to try it again
你必须再试一次
And the kicker is in either case when if you explode the bomb
异常条件是，任意条件下如果爆炸炸弹
Or defuse a phase that information gets sent to auto lab
或者成功拆解，信息都会被发送到 auto lab
If you exit and we use the defusing string that that your bomb sends us
如果你退出了，我们使用你的炸弹发送给我们的字符串
And we check it out on a copy of your bomb that we keep on the server
我们检查一下你的炸弹，并把副本保存在服务器上
That's another thing every everybody gets a different bomb slightly different bomb
另一件事是每个人都得到一个不同的炸弹，略有不同的炸弹
So we check so when you defuse when you defuse a phase the auto lab takes the string that
所以我们检查，当你通过一个阶段时，自动实验室会检查炸弹发来的字符串，
that your bomb sends us and then compares against the local copy of your bomb
然后与你的炸弹本地副本进行比较
If you explode phase you lose half a point
如果你引爆了炸弹，你失去了半点分数
So there's a real consequence to exploding your bomb it's very very tense right
所以炸弹爆炸的真正后果是非常紧张的
Until you learn how to use GDB to set a breakpoint
直到你学习如何使用 GDB 设置断点
Before the function that sends the information to the server
在将信息发送到服务器的功能之前
And we want you to do that right
我们希望你做对了
So a bombs are really the bombs really beautiful it's kind of fun it's kind of like a video game
所以炸弹真的非常漂亮，炸弹很有趣，就像电子游戏一样
It teaches you how to read compiler generated code
它教你如何阅读编译器生成的代码
Because the only oh the kicker is sorry that
因为唯一的 ... 哦，异常条件没说，对不起
The kicker is we don't give you the source code all we give you is the binary the binary bomb
异常条件是我们不给你源代码，我们给你的只是二进制的二进制炸弹
So in order to defuse a bomb you've got to fire up gdb
所以为了化解炸弹，你必须启动 GDB
Single trace through the find where the code is for each phase single trace through that code
单步调试直到找到每一阶段的代码
And sort of reverse engineer and figure out what it wants you to type in
然后逆向编译，找出它想要你输入的内容
And then you'll quickly find out where that function that explodes the bomb is  and you'll put a breakpoint there
然后你会很快发现爆炸炸弹的功能在哪里，你会在那里放置一个断点
And so we want you to do that because
所以我们希望你这样做，因为
The bomb besides teaching you how to program assembly language  it also teaches you sort of organically how to use gdb
除了教你如何编程汇编语言之外，它还教你如何有机地使用 GDB
Because you really can't do it if you don't use if you don't run gdb
因为如果你不运行 GDB，你真的不能完成它
And then the the third lab is this is a new lab
然后第三个实验是这是一个新的实验
This semester the randy's develops called the attack lab
这个学期 Randy 发明的被称为攻击实验室的东西
And we developed this lab specifically for 64-bit architecture
我们专门为 64 位体系结构开发了这个实验
So this is a reflection of the change from 32 bits to 64 bits
所以这反映了从 32 位到 64 位的变化
And this is so we're really excited about this one you'll learn how to
这就是为什么我们对你将学习如何的这些感到非常兴奋
You'll learn how to write exploits using return to a sort of a modern technique called return to return oriented programming
你将学习如何编写漏洞，利用返回到一种称为返回到返回导向编程的现代技术
Which is kind of the modern modern way that hackers deal with the fact that stacks in newer machines move around
这是一种十分现代的方式，黑客是这样处理新型计算机中栈位置不固定，而且
And prohibitive and make it impossible to execute code on the on the stack
而且禁止，也不可能在栈上执行代码的事实
So this is a brand new labs really I think it's really going to be really going to be neat
所以这是一个全新的实验，我认为它确实会很清晰
In the memory hierarchy when we study the memory hierarchy
在我们研究内存层次结构时，在内存层次结构中
We have a cache lab called the cache lab
我们有一个名为缓存实验的实验
Where you'll build your own cache simulator
你会在哪里建立你自己的缓存模拟器
So this is how sort of learn how this hardware that Randy was mentioning called cache memory works
所以这用于学习被 Randy 称作高速缓冲存储器的这种硬件的工作原理
You'll build a simulator and see for that
你会建立一个模拟器并查看
And then you'll take a small transpose function
然后你会使用一个小的转置功能
And you'll try to make that that code run with as few misses as possible on your simulator
你会试着让你的代码在你的模拟器上运行时产生尽可能少的不命中
And this will involve sort of understanding of how the memory hierarchy works and how to exploit it
这将涉及到对内存层次结构如何工作的以及如何利用它的理解
The part of the course where you we sort of transition from hardware
这一部分课程是你从硬件转换到
to interacting with the system software that the operating system
与系统级软件、操作系统进行交互
There's sort of a concept that we call exceptional control flow that exists in all parts of the system
有一种概念，我们称之为异常控制流，存在于系统的所有部分
And it sort of represents that intellectual transition from hardware to software
这代表着从硬件到软件的智能转变
So this is how this was sort of a key idea that allowed us to kind of smoothly
所以这就是这样一个关键的想法，让我们能够顺利进行
move from from hardware to software in some intellectually consistent way
以一种智能一致的方式从硬件转向软件
And so the idea is that you cover an exceptional control flow like low hard, low-level hardware interrupts and exceptions
这个想法是，你了解了一种特殊的控制流程，如低级别的硬件中断和异常
And then at the higher level sort of involving hardware and operating system software
然后在更高层次的操作涉及硬件和操作系统软件
is the idea of an operate of a process context switch
其实是操作进程上下文切换的想法
So this is this is where you start to learn what processes are
所以这时你就开始了解了进程是什么
and how to ask the kernel to create and manage processes for you
以及如何让内核为你创建和管理进程
At the next higher level or a software form of exceptional control flow called a signal
在一个更高级别上，以软件形式的异常控制流被称作信号
So this exists solely on the Linux kernel
所以这只存在于 Linux 内核上
And then and then even at a higher level at there's an application C language
然后，甚至在更高层次上有一个应用程序的 C 语言
version of exceptional control flow call set jump and long jump
版本的异常控制流调用，被称作固定转移和远距离转移
So this this notion of exceptional control flow kind of exists
所以这种异常控制流的概念存在
in all parts of the system we covered all at once
在系统的所有部分，我们一次覆盖全部
And the lab that we use  to sort of exercise all these ideas is called the shell lab
我们用来练习所有这些想法的实验被称为 Shell 实验
In the shell lab you'll write your own linux shell which is really cool
在 Shell 实验中，你将编写你自己的 Linux Shell，这真的很酷
So that's the program the command line program that you interact with whenever you login a Linux box
所以，这就是你无论何时登录到 Linux 机器时，与其交互就要用到的命令行程序
You're going to write your own
你会写你自己的版本
I don't look for me that was really exciting when I could like write something that looked like a real shell
对我来说，当我看到一个看起来像真正的 Shell 的结果时，我真的很激动
It was pretty
这很漂亮
The next area is well study is called virtual memory
下一个领域是，研究被称为虚拟内存
Virtual memory is a sort of combination of hardware and software
虚拟内存是硬件和软件的组合
That presents an abstraction to you of this very of memory is a very large array of bytes
对你可见的抽象形状，内存好像是一个庞大的字节数组
When in reality memory is a hierarchy of hardware and of cache memories and DRAMs
实际上，存储器是硬件和高速缓冲存储器和 DRAM 的层次结构
Virtual memory provides a very high-level abstraction as just a linear sequence of bytes
虚拟内存提供了非常高级的抽象，使其成为线性字节序的结构
It also does provide a lot of a lot of other useful abstractions
它也提供了很多其他有用的抽象
That make many different parts of the system much easier to manage
这使得系统的许多不同部分更容易管理
Ok so we'll learn will learn about virtual memory,we'll learn how it works
好吧，我们将学习到虚拟内存，我们将学习它的工作原理
We'll learn about the performance impact potential performance impact that has on your programs
我们将了解你的程序中可能对性能造成潜在影响的部分
And we'll also learn how to manage that large pool of memory that it makes available to you
我们还将学习如何管理它提供给你的大量内存
And the lab that we do that the lab where you'll do that is called malloc lab
你要做的实验叫做 Malloc Lab
 And in the malloc lab you'll write your own malloc and free functions
在 Malloc Lab 中，你将编写自己的 Malloc 和 Free 函数
You'll reimplementation the functionally of the lib C malloc and free
你会重新实现 C 标准库中的 Malloc 和 Free
And this is a...
这是一个...
Maybe a maybe it's two pages of code
也许可能是两页代码
But it'll be a guarantee it'll be the most sophisticated difficult two pages of code you've written
但我保证，它将成为你编写的最复杂难懂的两页代码
Not only because since it's managing the memory system you can't use all of
不仅因为它是在管理内存系统，你不能使用全部内存
I mean C doesn't have many C doesn't help you out a lot with abstractions for data structures
我的意思是 C 不会帮你实现很多抽象数据结构
But when you're writing but at least it does give you ideas like struct unions
但是，当你写代码时，至少它会给你像结构、联合体的某些知识
You can use to structure your memory
你可以用来构建你的内存结构
When you're writing a malloc package you can't use any of those
当你写一个 Malloc 包时，你不能使用任何其他东西
 You have to write exclusively on pointers and casting
你必须专门写指针和类型转换
Because you malloc package is working at such a low level
因为你的 Malloc 包工作在十分低的底层
So it's a very difficult piece of code for that reason
所以这将是一个非常困难的代码
But also the design space for malloc is is enormous
但是 Malloc 的设计空间也是巨大的
You have many options they all have implications
你有许多选项，他们都有影响
That trade-off performance and memory efficiency
你需要在内存性能和内存效率之中平衡
And finally in the last part of the course
最后在课程的最后部分
We deal with I/O input/output
我们处理 I/O 输入/输出
Do far in the course we've just talked about sort of running programs on machines
在到此为止的课程中我们已经讨论了正在机器上运行的程序
In the last part of the course we'll talk about input and output  sending data into and out of the machine
在课程的最后部分，我们将讨论输入和输出，将数据发送到机器和从机器输出
So we'll look at basic concepts of Linux I/O
我们会了解 Linux I/O 的基本概念
And since I think the most interesting form of I/O is networking
我认为最有趣的 I/O 形式是网络
Which allows you to talk to machines anywhere in the world using the internet
这使你可以使用互联网与世界上任何地方的机器交流
We'll also talk we'll learn how to do network programming
我们还会谈谈如何学习网络编程
You'll learn how to write programs that use the sockets interface
你将学习如何编写使用套接字接口的程序
Which is the basic interface for the internet to talk to machines any potentially any machine in the world
这是互联网与世界上任何可交互的机器交流的基本界面
 And that's really exciting
这真的很令人兴奋
I mean once I can still remember when developing this course I had two windows open on my machine
我的意思是，我还记得开发这门课时，我的机器上有两个窗口
I was SSH into two different machines
我用 SSH 进入了两台不同的机器
And I wrote a program to send a message like 'hello world' from one machine to the other
而且我编写了一个程序，将一个消息如 “Hello World” 从一台机器发送到另一台机器
And when that hello world appeared on the second windows like so exciting
当这个 Hello World 出现在第二个窗口的那瞬间，就像激动到了极点
I mean if you're a nerd it's really exciting
我的意思是如果你是个书呆子，那真的很令人兴奋
But just the thought that that could have been at any machine right
但只是想到这可能是在任何机器上
That could have been any machine that is just like opens up a whole new world
这可能是任何一台机器，就像打开了一个全新的世界
okay all of our all of our hand-ins are using a system called auto lab
好的，你们所有的作业，都使用了一个叫做 auto lab 的系统
Which was developed here and you can access it
这是我们开发的，你可以访问它
If you were on the roster as of this morning if you go to the auto lab link
如果你在今天早上进入 auto lab 的链接，并且你在课程花名册上
Then you'll see this course listed on your page
然后你会看到你的页面上列出了这门课程
If you're not enrolled you won't have an auto lab account
如果你没有注册课程，你将不会有一个 auto lab 帐户
And you have to be enrolled to get an auto lab account
你必须注册课程才能获得一个 auto lab 帐户
If you if you want to try to wait it out and wait for people to drop
如果你想等等，人数下降你才能注册进来
I'll make the first couple of at least the first assignment due available from the course webpage
我会在课程网页上至少提供第一份的作业时间限制
So you can work on it without actually handin to auto lab
所以你可以在没有实际操作 auto lab 的情况下进行实验
But at least you can keep going
但至少你可以继续学下去
Okay if you are enrolled actually I didn't update this but I updated the auto lab accounts today
Now one final thing if you have waitlist questions
现在最后一件事情，如果你有候课名单的问题
Please don't don't send email to the staff
请不要发送电子邮件给员工
Because we don't control the waitlist
因为我们不控制候课名单
You should contact one of these either Cathy Catherine or Zara depending on which class
根据哪一类，你应该联系 Cathy Catherine 或 Zara 的其中之一
Okay so that's that welcome again looking forward to a great semester
好的，再次欢迎你们加入这个宏伟的学期课程
And we'll see you on Thursday
我们将在周四见到你
