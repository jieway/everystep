08-01
0-0.06

alright last time I started talking about linearizability

上次我讨论过了线性一致性（linearizability）

0.06-0.07

and I want to finish up this time

这节课我想把它讲完

0.07-0.10

the reason why we're talking about it again is that

之所以我们再次讨论这个话题的原因是


0.10-0.16

it's our kind of standard definition for what strong consistency means 

强一致性的标准定义是

0.16-0.20

in storage style systems

在存储型系统中

0.20-0.29

 so for example lab 3 is a needs to obey your lab 3 needs to be linearizable

So，例如在lab3中，你所实现的东西就得是linearizable的

0.29-0.32

 and sometimes this will come up

有时候我们会想

0.32-0.34

 because we're talking about a strongly consistent system

因为我们讨论的是一个强一致性系统

0.34-0.38

and we're wondering whether a particular behavior is acceptable

我们会想知道它的行为是否是可接受的

0.38-0.40

 and other times linearizability will become come up

其他时候线性一致性就会出现

0.40-0.43

 because we'll be talking about a system that isn't linearizable 

因为我们会去讨论一种不是linearizable的系统

0.43-0.50

and we'll be wondering you know in what ways might it fall short or deviate from linearizability 

我们会想去知道在这个系统在线性一致性上有哪些不足之处

0.50-0.52

so one thing you need to be able to do is

So，其中你需要能够做到的一件事情就是

0.52-1.01

 look at a particular sequence of operations, a particular execution of some system that executes reads and writes 

去查看一个特定的操作顺序，那些某个系统下执行的特定操作，比如：读操作和写操作

1.01-1.02

like your lab 3 

就比如在lab 3中

1.02-1.08

and be able to answer the question oh was that was that sequence of operations I just saw linearizable or not 

你们要能够回答你们所看到的操作顺序是否是linearizable的

1.08-1.12

I'm so we're going to continue practicing that a little bit  now

So，我们还得继续练习下

1.12-1.25

 plus I'll try to actually establish some interesting facts that will be helpful for us about what it means about the consequences  for the systems we build and look at linearizability

我将尝试建立一些有趣的事实，这些事实将有助于我们了解所构建的系统以及线性一致性的含义

1.25-1.29

to find on particular operation history

为了找到一个特定的操作历史

1.29-1.32

so always the thing we're talking about

So，我们所一直讨论的事情是

1.32-1.36

is oh we observed you know a sequence of requests by clients

我们观察到由Client端所发送过来的请求序列

1.36-1.39

 and then they got some responses at different times 

接着，这些client会在不同的时间点拿到某些响应

1.39-1.45

and they asked for different different you know to read different data and got various answers back 

它们会要求去读不同的数据，并得到不同的答案

1.45-1.48

you know is that history that we saw linearizable

你们所知道的是，我们看到的历史记录是linearizable的

1.48-1.53

 ok so here's an example of a history

Ok，So这里有一个历史记录的例子

1.53-1.55

 that might or might not be linearizable

该历史记录可能是也可能不是linearizable的

1.55-1.58

so let's suppose at some point in time some client 

So，我们假设在某些时间点，会有某些client发出请求

1.58-2.00

times gonna move to the right 

时间流逝的方式是往右的


2.00-2.03

this vertical bar marks the time at which a client sent a request 

这条竖线标记的是一个client发出一个请求所在的时间点


2.03-2.18

I'm gonna use this notation to mean that the request is a write and asks to set variable or key or whatever x to value 0

我会通过这个标记来表示这是一个写请求，它会对变量或者key或者其他东西进行写操作，比如x的值设置为0



02.18- 02.24

so sort of a key and a value this would correspond to a put of key X and by zero in lab 3

So，若对应lab 3中的put操作，即这里表示把0赋值给x

2.24-2.31

 and then this is sort of we're watching what the client send the client sent this request to our service 

然后，我们会看到client发送这个请求给我们的服务

2.31-2.37

and at some point the service responded and said yes your write is completed 

然后，在某个时刻，服务会对该请求进行响应，并表示，Yes，你的写请求已经完成了

2.37-2.41

so we're assuming the services of a nature that actually tells you when the write completes 

So，我们假设我们的服务会有这种性质，当写操作完成后，就会告诉我们完成了

2.41-2.44

otherwise the definition isn't very useful

否则，该定义就不是那么有用了

2.44-2.48

ok so we have this request by somebody to write 

Ok，So，我们有这个由某人发起的写请求

2.48-2.51

and then I'm imagining in this example

接着，想象一下，在这个例子中

2.51-2.53

 there's another request

还有另一个请求


2.53-2.55

 that because I'm putting this mark here

因为我在这里放了一个标记

2.55-3.00

 this means the second request started after the first request finished 

这意味着第二个请求在第一个请求结束后开始执行

3.00-3.03

and and you know reason why that's important is 

这样做很重要的原因是因为

3.03-3.08

because of this rule that linearizable history must match real time 

因为在linearizable history的规则中表示，它必须实时匹配

3.08-3.10

and what that really means is

这意味着



03.10 - 03.16

that requests that are known in real time to have started after some other request finished 

当一些其他请求结束后，系统会实时知道其他请求已经开始执行

3.16-3.21

the second request has to occur after the first request in whatever order

不管是以什么顺序，第二个请求必须在第一个请求之后发生

3.21-3.25

 we work out that's the proof that the history was linearizable

这样我们才能证明该历史记录是linearizable的

3.25-3.27

ok so in this example

So，在这个例子中

3.27-3.33

I'm imagining there's another request that asks to write X to have value 1

这还有另一个写请求，它将x的值修改为1


3.33-.42

 and then a concurrent request may be started a little bit later as to set X to 2

然后，又执行了一个并发请求，它将x设置为2

3.42-3.48

I said now we have two maybe two different clients issued requests at about the same time to set X to two different values

现在我们可能会遇上这种情况，有两个client在同一时刻发送了请求，它们将x设定为不同的值

3.48-3.52

 so of course we're wondering which one is going to be the real value

Of cource，我们会想知道哪一个写请求所修改的值会是实际的值



3.52-3.55

 and then we also have some reads

然后，我们也会有一些读请求

3.55-3.56

if all you have is writes 

如果我们有的都是写请求

3.56-4.06

well well you have us write so it's it's hard to say too much about linearizable linearize ability 

那么，我们就很难去讨论太多关于线性一致性相关的内容

4.06-4.13

because you don't know you don't have any proof that the system actually did anything or revealed any values

因为你没有任何证据表明，该系统所做的这些事情对于线性一致性这方面有任何讨论的价值

4.13-4.16

so we really need reads 

So，为此，我们真的很需要读请求来帮助证明这一点

4.16-4.20

so let's imagine we have some read 

So，假设我们有一些读请求

4.20-4.22

you'll be seeing our in the history

我们会在我们的历史记录中看到


4.22-4.34

 that a client said to read at this time and the second time it got an answer for read key x got value 2

此时一个client发出了一个读请求，然后它读取到了x的值，即x=2

4.34-4.36

so presumably actually saw this value and

So，实际上它就会看到wx2这个操作所赋给x的值，即2

4.36-4.39

then there was another request

接着，这还会有另一个请求

4.39-4.40

by maybe the same client or a different client

它可能是由同一个client发起的，也可能是一个不同的client所发起的


04.40 - 04.44

but known to have started in time after this request finished 

但要知道的是，这个请求是在rx2结束后才开始的

4.44-4.49

and this read of X got value 1

这个读请求拿到的x的值为1

4.49-4.52

 while and so the question in front of us is

So，摆在我们面前的问题是

4.52-4.53

 is this history linearizable 

这个历史记录是不是linearizable的



04.53- 04.56

and there's sort of two strategies we can take 

这里我们可以使用两种方案



04.56-4.59

we can either cook up a sequence

我们可以去编造一个顺序

4.59-5.04

because if we can come up with a total order of these five operations

如果我们所拥有的这5个操作是通过一定顺序进行的

5.04-5.06

 that obeys real time 

该顺序遵守请求的实时顺序

5.06-5.13

and in which each read sees the value written by the most recently proceeding write in the order

每个读请求所看到的值是由整个顺序中离它们最近的处理过的写请求所处理的值

5.13-5.14

if we can come up with that order

如果我们是按照这个顺序来的话

5.14-5.16

then that's a proof the history is linearizable

那么我们就可以去证明这个历史记录是linearizable

5.16-5.21

another strategy is to observe that these rules

另一个方式就是去观察这些规则

5.21-5.28

each one may imply certain this comes before that edges in a graph

每条规则都可以暗示出图中这些流程的顺序，谁先谁后

5.28-5.33

and if we can find a cycle  in， this operation  must come before that operation

如果我们在该历史记录中发现一个循环，一般来讲，一个操作必须在另一个操作开始前执行

5.33-5.35

 we can find a cycle on that graph 

我们可以在这个图中找到一个循环

5.35-5.37

and that's proof that the history isn't linearizable

那么，这就证明了这个历史记录不是linearizable的

5.37-5.39

and for small histories

对于某些比较小的历史记录来说

5.39-5.42

we may actually be able to enumerate every single order 

实际上，我们得能够去枚举每个操作的顺序

5.42-5.46

and use that show this history isn't linearizable 

并使用这个来判断该历史记录是否是linearizable

5.46-5.55

anyway any any any thoughts about whether this might be or might not be linearizable

总之，你们对这个历史记录是否是linearizable还有任何想法吗？

5.55-6.01

yes

请讲


6.09-6.13

yes okay so the observation is that um it's a little bit troubling 

So，这个观察结果看起来有点麻烦

6.13-6.16

that we saw read value 2

我们看到这里读到的值是2

6.16-6.18

and then the read with value 1

然后我们读到了1

6.18-6.21

and maybe that contradicts

也许这有点矛盾

6.21-6.23

you know there were two writes

如你们所见，这里有两个写请求

6.23-6.24

one with value one on one value 2

其中一个写入的值是1，另一次写入的值是2

6.24-6.27

so that so we certainly if we had to read with value three 

So，如果我们读到的是3

6.27-6.30

that would obviously be something I got terribly wrong

很明显，我遇上了非常糟糕的事情

6.30-6.32

 you know but we got there were a write of one and two 

正如你们看到的那样，这里我们一次写入了1，另一次写入了2

6.32-6.34

and a read of one and two 

接着，又读到了1和2

6.34-6.34

so the question is 

So，这里的问题是

6.34-6.41

whether this order of reads could possibly be reconciled with the way these two writes show up in the history

此处这两个读请求的顺序能否与历史记录中的这两个写请求中的顺序一致？

7.00-7.05

okay so what I'm what I'm the game we're playing is

我们所玩的把戏是

7.05-7.08

 that we have a like maybe two clients or three clients

假设我们有两个或三个client

7.08-7.10

 and they're talking some service 

它们通过某些服务进行通信

7.10-7.12

you know maybe a raft last year something and 

比如，raft之类的东西

7.12-7.15

what we are seeing is requests and responses right

我们所看到的是请求和响应



07.15 - 07.17

so what this means is that 

So，这意味着

7.17-7.24

we saw requests from a client to write X to the you know put requests for X and one 

我们看到一个put请求，将x设置为1

7.24-7.25

and we saw the response here

然后，我们在这里看到了响应


7.25-7.27

so what we know is  that somewhere during this interval of time 

So，我们所知道的是，在这段时间内



07.27 - 07.32

presumably the service actually internally change the value of x to 1

想必，实际上整个服务在内部将x的值修改为1


07.32 - 07.36

 and what this means is that somewhere in this interval of time

接着，再来看这段时间内的所发生的事情

7.36-7.45

 the service presumably changed its internal idea of the value of x to 2  somewhere in this time

服务内部会在某个时间点将x的值设定为2

7.45-7.47

 but you know it's just somewhere in this time

但是你知道，这个赋值动作发生是在这段时间内的某个时间点



07.47 - 07.50

 it doesn't mean it happened here or here 

这并不意味着是在开头或者是结尾处执行

7.50-7.52

does that answer your question

我的回答对你的问题有任何帮助吗？

7.52-7.54

yes

请讲

8.08-8.10

yes okay so the observation is that is linearizable

So，我们可以观察到这个是linearizable的



08.10 - 08.16

and it's been accompanied by an actual proof of the linearizability

并且它已经附带了线性一致性的证明



8.16-8.18

namely a demonstration of the order

即顺序性上的证明



08.18 - 08.19

 that shows that it is linearizable

它证明了这个历史记录是linearizable的



08.19 - 08.25

and the order is yes it's linearizable

这个顺序是线性化的


08.25 - 08.34

and the order is first right of X with value 0 

它的顺序是先发起wx0

8.34-8.38

and the server got both of these writes at roughly the same time

服务器几乎在同一时间收到了这两个写请求

8.38-8.40

it's still had to choose the order itself 

它依然得靠它自己去判断顺序

8.40-8.46

all right so let's just say it could have executed the right of x to value 2 first

So，假设它先执行wx2

8.46-9..01

and then the read of X then executed the read of X which would the first read of X which at that point would yield 2

然后，服务器去执行读请求，此时读到的x的值为2


9.01-9.05

 and then we're gonna say the next operation had executed it was the write of X to 1

接着，我们会说下一个要执行的操作是wx1


9.05-9.10

and then the last operation in the history is the read of X to 1 

然后，在该历史记录中最后一个操作就是rx1

9.10-9.18

and so this is proof that the history is linearizable 

So，这就是证明该历史记录是linearizable的证据

9.18-9.19

because here's an order

因为这里有一个顺序

9.19-9.25

it's a total order of the operations and this is the order it matches real time

操作的整体顺序和请求的实时顺序是匹配的

9.25-9.28

so what that means is

So，这里意味的是

9.28-9.30

well just go through it 

Well，我们来看下这里


9.30-9.31

the the write of X to 0 comes first 

wx0先出现

9.31-9.35

and that's that's totally intuitive since it's actually finished before any other operations started 

我们可以很直观的看出，它可以在其他操作开始前结束


9.35-9.41

the write of X to 1 comes sorry the write of X to 2 comes second

此处的wx2是第二个出现的

9.41-9.52

so we're gonna say maybe that I'm gonna mark here that sort of real time at which we imagine these operations happen to demonstrate that the order here does match real time

So，这里我会按照我们想象的操作执行的顺序进行标记，这样所演示的顺序会和实时顺序所匹配


9.52-9.57

 so it'll say I'll just write a big X here to mark the time when we imagine this operation happened

So，这里我会标记一个X，以此来表示该操作发生的时间点

9.57-10.00

 all right so that's the second operation

So，这就是第二个操作

10.00-10.05

 then we're imagining that the next operation is the read of X of 2 

然后，我们所想象的下一个操作就是rx2

10.05-10.08

we you know there's no real time problem

这里并不存在时间上的问题


10.08-10.12

 because the read of X of 2 actually was this u concurrently with the write of X of 2 

因为rx2实际上是和wx2并发出现的

10.12-10.18

you know it's not like the write of X the read of X of 2 finished and only then did the write of X write of X with 2 start 

这并不是说rx2结束后，wx2才会开始执行

10.18-10.19

there really are concurrent

它们确实是并发的


10.19-10.21

we'll just imagine that 

我们会想象下这种情况


10.21-10.25

that sort of point in time at which this operation happened is right there

这个操作会在这里执行


10.25-10.28

so this is the you know we don't care when this one happened 

So，我们并不在意这个操作（wx0）是什么时候发生的


10.28-0.32

let's just say there's the first operation second third

这是第一个操作，这是第二个，这是第三个

10.32-0.36

now we have a write of X of one

现在，我们有一个wx1

10.36-10.38

let's just say it happens here in real time

假设它是在这个时间点发生的

10.38-10.43

just has to happen after the operations that occur before it in the order

wx1会在其他操作后发生


10.43-0.45

so that will say there's the fourth operation

So，我们将wx1作为第四个操作

10.45-10.47

 and now we have the read of x1 

现在，我们还有一个rx1


10.47-10.48

and it can pretty much happen at any time

它可以在这段时间中的任意时间点执行


10.48-10.50

 but let's say it happens here

但我们表示，它会在这里执行

10.50-10.52

 okay



10.52-10.53

so this is the demos

So，这就是我要给你们看的demo

10.53-10.57

so we have the order this is the  that the order is consistent with real time

我们所示范的这个执行顺序和实时结果顺序是一致的

10.57-11.03

 that is we can pick a time for each of the operations that's within its start and end time

我们可以在每个操作的开始和结束的这段时间内随机找个时间点

11.03-11.08

that would cause this total order to match our real time order

以便我们设定的这个执行顺序匹配我们的实时结果顺序

11.08-11.09

and so the final question is

So，最后一个问题是



11.08 - 11.16

did each read see the value written by the most closely preceding write of the same variable

每个读请求所看到的都是同一个变量最近被写入过的值吗？

11.16-11.19

so there's two reads

So，这里有两个读请求

11.19-11.21

 this read preceded by a write with that correct value

这个rx2所读到的值之前是wx2所写入的值

11.21-11.22

 so that's good

So，这没问题

11.22-11.27

 and this read is preceded by a write most closely preceded by a write of the same value also

这个rx1所读到的值也是wx1最近所写入的值

11.27-11.33

 okay so this this is a demonstration

So，在这个例子中

11.33-11.35

that this history was linearizable

这个历史记录是linearizable的

11.39 - 11.41

depends on what you thought when you first saw the history

这取决于你第一次看到这个历史记录时是怎么想的



11.41 - 11.46

but it's not always immediately clear that set up this complicated it is

但你不会总是一眼就能明白这其中的顺序复杂度

11.46-11.48

 you know it's easy to be tricked 

你很容易就被骗了

11.48-11.50

when looking at these histories

当你在看这些历史记录的时候


11.50 - 11.53

 which do you think oh the write of x1 started first

你可能会认为wx1应该先开始执行

11.53-11.57

 so we just sort of assumed that the first value written must be one

So，于是我们就会假设第一个被写下来的值必然是1

11.57-11.59

 but that's actually not required here

但实际上这里并不需要

但实际上这里我们不能那么想

11.59-12.04

 any questions about this

对此，你们有任何问题吗？


12.15-12.19

if the you mean if these two were moved like this

你想说的是让wx2和rx2互换下位置？

12.19-12.31  ！！！

 the okay so if if if this if the write with value 2 was only issued by the client after the read of x value 2 returned

如果wx2是在rx2返回后由client所发起的

12.31-12.34

 that wouldn't be linearizable

那么，这就不是linearizable的了

12.34-12.40

 because in whatever order you know any order we come up with has to obey the real-time ordering 

因为不管历史记录中的顺序是怎么样的，它都得遵循实时结果顺序

12.40-12.47

so any order we come up with would have had to have the read of X with 2 precede the write of X with 2 

So，不管顺序是怎么样的，都得让rx2在wx2之前出现

12.47-12..52

and since there's no other write of X of 2 insight here

因为这里面没有其他的wx2了

12.52-12.56

 that means that a read at this point could only see 0 or 1 

这就意味着，这里的rx2此时看到的只会是0或者1

12.56-13.00

because those are the only other 2 writes that could possibly come before this read

因为这里也只有这两个写请求可能在这个读请求之前出现

13.00-13.08

 so moving you know shifting these that much makes the would make the example not linearizable

So，如果将rx2和wx2的顺序交换，那么就会让这个例子中的历史记录不再是linearizable





13.26-13.30

I'm saying that the first vertical line is the moment the client sends the request 

我说过第一条竖线代表的是client发送请求的时候

13.30-13.34

and the second vertical line is the moment the client receives the request

第二条竖线代表的是client收到请求的时候



13.34 - 13.42

 yes yeah yeah so this is a very client centric kind of definition

So，这是一种非常以client为中心的定义

13.42-13.48

 it says you know clients should see the following behavior  and what happens after us send a request in

client应该看到接下来的行为，以及当我们发送请求后所发生的事情

13.48-13.51

maybe there's a lot of replicas maybe a complicated network who knows what

可能这里会有很多replica，也可能是一个复杂的网络之类的东西

13.51-13.52

it's almost none of our business

这些基本都不关我们的事

13.52-13.56

 we're only the definition is only about what clients see

该定义只是关于client所看到的东西



13.56 - 13.59

 there's some gray areas

这里也有些灰色地带

13.59-14.00

 which we'll come to in a moment

我们稍后会讲

14.00-14.02

 like if the client should need to retransmit a request

比如，如果client需要重新发送一个请求

14.02-14.07

 then we also have to you know that's something we have to think about

那么，我们也应该去将这个问题纳入思考范围内

14.07-14.11

other questions？

还有其他问题吗？

14.11-14.14

 okay so this one is linearizable

Ok，So，这个历史记录是linearizable的

14.14-14.17

 here's another example 

这里有另一个例子

14.17-14.24

I'm actually going to start out with it being almost identical I'm gonna start out with you being identical for the first example 

So，这里我要画的图和之前第一个例子几乎一模一样

14.24-14.26

so again we have a write of X with 0

So，这里我们会有一个wx0


14.26-14.29

 we have these two concurrent writes

我们有两个并发的写请求


14.29-14.52

 and we have the same two reads 

我们还有两个相同的读请求

14.52-14.53

those are so far identical to the previous example 

到目前为止，这个例子和前一个例子是完全一样的

14.53-14.56

so therefore we know this must be this alone must be linearizable

So，因此我们知道这部分必然是linearizable的

14.56-14.57

 but I'm going to add 

但我要去给它加点东西


14.57-15.03

let's imagine that client 1 issued these two requests 

假设client 1发起了这两个请求

15.03-15.05

the definition doesn't really care about clients

该定义并不在意client的事情

该定义并不是以client为中心

15.05-15.06

 but for own sanity

但出于理智

为了条理清晰

15.06 - 15.09

we will assume client 1 will read X and saw two

我们会假设client 1读取了x，并知道x的值为2

15.09-15.11

and then later read X and saw one

但之后它读x的时候，读到了1

15.11-15.13

 but that's okay so far

到目前为止，这都是ok的

15.13-15.14

 I say there's another client

假设这里还有另一个client


15.14-15.21

 and the other client does a read of X and it sees a 1 

这个client发起了一个读请求，它读到x的值为1

15.21-15.27

and then the other client is a second read of X and it sees 2

然后，这个client再次读了x，它看到的值为2

15.27-15.30

so this is linearizable 

So，这是linearizable的

15.30-15.32

and we either have to come up with an order

So，我们得有一个顺序

15.32-15.40

or this comes before that graph that has a cycle in it

或者是，在进入之前，这个图上有了一个循环

15.50-15.56

so you know that thing this is getting at the puzzle is 

So，这里的问题是


15.56-15.58

if one client saw there's only two rights here 

如果一个client看到这里有两个写请求

15.58-16.04

so they you know in any order or one of the rights comes first or the other writes comes first

这两个写请求的顺序可以是任意的，可能是其中一个先出现，或者另一个先出现

16.04-16.07

 and intuitively

直观的来讲

16.07-16.11

 client one observed that the right with value 2 came first 

client 1观察到wx2这个请求先出现

16.11-16.15

and then the write of value one

然后才是wx1出现



16.15-16.18

 right these two reads mean

这两个写请求意味着

16.18-16.26

that has to be the case that in any legal order of the write of two has to come before the write of one  in order for the client 1 to have seen this 

在任何合法的顺序中，为了让client 1看到这个，其中一个写请求必须出现在另一个写请求之前


16.26- 16.29

and it's the same order we saw over here

它和我们之前所见的顺序是相同的

16.29-16.31

 but symmetrically

但对称的来讲


16.31-16.41

client one's experience clearly shows the opposite right sorry huh fine to client  2who's experience was the opposite

Client 2会经历相反的操作



16.41 - 16.44

clients 2 saw the write of one first

client 2会先看到写入的1


16.44 - 16.47

and then the write with value 2 and

然后，它才会看到写入的2



16.47 - 16.51

one of the rules here is that

其中一条规则是

16.51*-17.05

there's just one total order of operations not allowed to have different clients see different histories or different different progressions evolutions of the values that are stored in the system

在整个操作的顺序中，我们不允许不同的client看到不同的历史记录或者是同一时刻下所拿到的保存在系统内的值是不同的



17.05 - 17.12

there can only be one total of order that all clients have to experience operations that are consistent with the one order 

也就是说，所有client所经历的都是同一个顺序的操作流


17.12-17.19

and if one this one client clearly implies that the order is read 2 - and then read one

如果client 1清晰明了的表示经历的顺序是先读到写入的值为2，再读到的值为1

17.19-17.29

 and so we should not be able to have any other client who observes proof that the order was anything else  which is what we have here

So，我们就不应该让其他client观察到操作的顺序和client1所看到的不同

我们就不会让其他的client看到类似C2这样不同的值的变化，

17.29 - 17.37

and so that's a bit of a intuitive explanation for what's going wrong here

So，对于此处的问题而言，这算是一个较为直观的解释



17.37 - 17.38

and and by the way

顺带说一下


17.38-17.42

 the reason why this could come up in the systems  that we build  and look at

之所以这个可以出现在我们所构建的系统中并被我们关注原因是



17.42 - 17.44

that we're building replicated systems

我们所构建的是replicated system

17.44-17.49

 either you know raft replicas or maybe systems with caching in them

比如，你所知道的raft replica或者是其他具备缓存能力的系统



17.49 - 17.51

 but we're building systems that have many copies of the data 

但在我们所构建的系统中，它拥有很多数据副本

17.51-18.00

and so there may be many servers with copies of X in them possibly with different values at different times right，if they haven't gotten the commits yet or something 

So，这里就可能会有很多服务器，它们上面都有x的副本，如果这些服务器并没有将值提交的话，那么这些服务器上的x值在不同的时候会是不一样的值





18.00-18.04

some replicas may have one value，some may of the other

某些replica所拥有的可能是同一个值，其他的可能是别的值



18.04 - 18.05

but in spite of that

虽然是这么说

18.05-18.09

 if our system is linearizable or strongly consistent

如果我们的系统是线性一致性或者是强一致性的

18.09-18.18 ******

it must behave as if there was only one copy of the data and one linear sequence of operations applied to the data 

它必须表现得好像只有一个数据副本和一个线性操作序列应用于该数据之上

18.18-18.20

that's why this is an interesting example

这就是为什么这个例子很有趣的原因了



18.20 - 18.25

because this could come up in a sort of buggy system that had two copies of the data

因为这种情况会出现在一个有问题的可复制系统中，即同一个数据在两个备机中拥有两份不同数据拷贝（知秋注：有点类似于我们的内存模型，编译器在对x=1与y=1这种进行指令重排序，并没有指定顺序的先后，但还是有不一样的，此处只供读者联想自己的知识）

因为这种情况会在一个bug系统中发生


18.25 - 18.27

 and one copy executed these writes in one order 

我们会对其中一个数据副本以这种顺序执行写操作



18.27 - 18.30

and the other replicas executed the writes in the other order

其他的replica会以另一种顺序执行这些写操作


18.30 - 18.32

and then we could see this 

然后我们就会看到出现这种情况

18.32-18.34

and linearizability says no we can't see that 

但线性一致性表示：No，我们不可能这种情况发生

18.34-18.36

we're not allowed to see that in the correct system 

它不允许我们在正确的系统中看到这个问题出现

18.36-18.42

so the the cycle in the graph  in the this comes before that graph 

看下例子图中有循环



18.42-18.48

that would be a sort of slightly more proof e proof  that this is not linearizable is

这可能需要更多的证据来证明它不是linearizable的

18.48-18.55

that the write of two has to come before client ones read of two 

wx2必须在rx2发生前执行


18.55-18.57

so there's one arrow like this

So，就会有这样的箭头

18.57-19.00

 so this write has to come before that read

So，这个写请求必须在这个读请求之前执行

19.00 -19.10

 client ones read has to come before the right of X with value one 

Client 1所发起的rx2请求必须出现在wx1之前

19.10-19.14

otherwise this read wouldn't be able to see one 

否则，Client 1稍后发起的rx1请求就没法读到x的值为1了

19.14-19.18

right if this you can imagine this right might happen very early in the order 

你们可以想象下。若wx1在一开始很早的时候就执行了

19.18-19.19

but in that case 

但在这个例子中


19.19-19.21

this read of X wouldn't see one 

rx1这个请求读到的值就不是1

19.21-19.22

it would see two

它会看到2

19.22-19.24

since we know this guy saw two 

因为我们知道rx2读到的也是2


19.24-19.31

so the read of X with two must come before the write of X with one

So，由Client 1发起的rx2必须在wx1之前出现


19.31-19.35

 the write of X of one must come before any read of X with value 1 

wx1则必须在所有rx1请求之前出现

19.35-19.38

because including client who's read of X with value 1

这也包括由client 2所发出的rx1请求


19.38-19.44

 but in order to get value 1 here

但为了读到1

19.44-19.45

 and for this read to see 2

对于此处这个由client 2所读的2来说（rx2）

19.45-19.52

 the write of X with 2 must come between in the order between these two operations

wx2应该是处于rx1和rx2这两个操作之间发生的


19.52 - 19.58

 so we know that the read of X 1 must come before the write of X 2 

So，我们知道由client 2发起的rx1必须在wx2之前出现（知秋注：我们可以这么理解，c1可以确定wx1必须在wx2之后，c2确定的是wx1必须在wx2之前，这就是矛盾所在，c1或 c2自己所发两次请求是具有前后性，即线性可确定的）



19.58 - 19.59

and that's a cycle

这是一个循环



19.59 - 20.05

alright so there's no there's no linear order 

So，这里并不存在任何线性顺序

20.05-20.12

but there's no linear order that can obey all of these time and value rules 

这里没有任何线性顺序能够遵守这些时间顺序，以及规则

20.12-20.14

and there isn't

这里并不是一个linearizable的历史记录

20.14-20.18

because there's a cycle in the graph 

因为在这个图中有一个循环

20.21-20.22

yes 

请讲

20.34-20.34

that's a good question

这是一个好问题

20.34-20.41

this definitions the definition about history's not about necessarily systems

关于该历史记录的定义不一定是关于系统的



六十四  阅举报
08-02




20.41-20.43

so what it's not saying is

So，这里所没说的是

20.43-20.51

that a system design is linearizable if something about the design it's really only history by history 

一个系统的设计是否具备linearizable，真的只能通过操作历史（日志）来确定



20.51-20.55

so if we don't get to know how the system operates internally

So，如果我们不清楚这个系统内部是如何操作的



20.55 - 20.59

and the only thing we know is we get to watch it while it executes

我们唯一能做的事情就是在它执行请求的时候去观察它所做的事情

20.59-21.01

 then before we've seen anything， we just don't know

那么，在我们看到任何东西之前，我们对它所做的都一无所知

21.01-21.03

right we mean we'll assume it's linearizable 

我们会假设它是linearizable的

21.03-21.06

and then we see more and more sequences of operations this Akash

然后，我们就会看到越来越多的操作序列



21.06 - 21.09

they're all consistent with linearizability

它们都是线性一致性的

21.09 - 21.10

 they all follow these rules

它们都会遵循这些规则

21.10-21.14

 so you know we believe it's probably this isn't linearizeable

So，我们相信它可能不是linearizable的

21.14-21.15

and if we ever seen one that isn't 

如果我们看到它里面有一处不符合规则

21.15-21.16

then we realize it's not linearizable

那么，我们就会意识到它不是linearizable

21.16-21.22

so this is yeah it's not a definition on the system design

So，这并不是系统设计上的定义



21.22 - 21.25 *******

it's a definition on what we observe the system to do 

这是我们观察系统要执行的操作的定义

这个定义是基于我们观察系统所执行的操作得到的

21.25-21.25

so in that sense

So，在这种情况下

21.25-21.30

it's maybe a little bit unsatisfying if you're trying to design something right

如果你试着去设计某些东西，这其中可能会有一些不符合规则的地方

21.30-21.32

there's not a recipe for how you design 

在设计方面其实并没有什么秘诀

21.31-21.33

you know except in a trivial sense 

除了在一些不重要的情况下

21.33- 21.36

that if you had a single server in very simple systems

比如，如果在一个非常简单的系统中

21.36-21.41

 one server one copy of the data not threaded or multi-core or anything

你只有一个服务器，一个数据副本，不使用多线程，或者多核之类的东西

21.41-21.46

 it's a little bit hard to build a system that violates this in a very simple setup

那么在这种非常简单的环境下，要构建出一个违反规则的系统还是有点难的

21.46-21.51

 but super easy to violate it in any kind of distributed system

但在任何一种分布式系统中就很容易违反这些规则

21.51-21.55

 okay 



21.55-21.57  ！！！！！！！

so the lesson from this is

So，我们从中学到的是

21.57-22.07

 that there's only can only be one order in which the system is observed to execute the writes 

系统所观察到的只可能是一个顺序，并根据该顺序来执行写请求

22.07-22.14

all clients have to see value is consistent with the system executing the writes in the same order

所有client所看到的值必须和系统以相同顺序执行写请求时的值一致



22.14 - 22.21

here's a very simple history another example

这里有个非常简单的历史记录，来看下这个例子


22.21- 22.25

 supposing we write x with value 1 

假设我们将x的值设置为1

22.25-22.33

and then definitely subsequently in time maybe with another client another client launches a write of X with value 2 

与此同时，接着另一个client发起了另一个写请求，将x设置为2，即wx2



22.33-22.36

and sees a response back from the service saying yes I did the right 

并从服务那里得知，它已经将wx2这个写请求执行完毕

并从服务那里得知，它已经将两个写请求执行完毕了


22.36 - 22.43

and then a third client does a read of X 

然后，第三个client发起了一个读请求，即rx1



22.43- 22.43

and gets got you one

并得到返回值1



22.43 - 22.46

 so this is a very easy example

So，这是一个非常简单的例子



22.46-22.48

 it's clearly not linearizable

很明显，这个历史记录并不是linearizable的

22.48-22.53

 because the time rule means that the only possible order is the

因为根据时间规则来看，这里唯一可能的顺序是



22.53 - 22.57

write of X with 1 the right of X is 2 the read of X with 1 

wx1，wx2，然后rx1



22.57 - 22.58

so that has to be the order 

它必然是这个顺序



22.58 - 23.04

and that order clearly violates this is the only one order that order clearly violates the second rule about values 

这个唯一的顺序很明显违反了第二条关于值的规则

23.04-23.11

that is you know the most value written by the most recent write in the owned one order that's possible is not 1

一个值的落地只能来自于上一个写操作的执行，所以x的读取结果不可能是1



23.11-23.12

 it's 2 

而是2


23.12-23.14

so this is clearly not linearizable 

So，这很明显不是linearizable

23.14-23.19

and the reason I'm bringing it up is 

我提出它的原因是

我之所以将它拿出来单独讲

23.19-23.28

because this is the argument that a linearizable system a strongly consistent system cannot serve up stale data right 

因为这是线性一致性系统或者说强一致性系统的一个特点，即无法提供过时数据

23.28-23.30

and you know the reason why this might come up is

出现黑板上这种历史记录的原因可能是

23.30-23.33

 again you know maybe you have lots of replicas

你可能有许多replica

23.33-23.38

 each you know maybe haven't seen all the writes or all the committed writes or something

可能每个replica都不会看到所有的写请求或者是所有提交过的写请求，或者其他之类的东西


23.38 - 23.42

so maybe there's some maybe all the replicas have seen this write

So，可能所有的replica都看到了这个写请求，即wx1

23.42-23.44

 but only some replicas have seen this write

但只有一些replica看到了这个写请求，即wx2

23.44-23.47

and so if you ask a replica that's lagging behind a little bit

So，如果你询问的是一个有点滞延的replica

23.47-23.48

 it's still gonna have value 1 for X 

 那么它上面x的值依然是1

23.48-23.57

but nevertheless, clients should never be able to see this old value in a linearizable system

尽管如此，但在一个线性化系统中，client应该永远看不到这个原来的值

23.57-24.00

 are there no stale data allowed 

我们不允许看到任何过时的数据

24.00-24.01

no stale reads

不能让读请求读到过时的数据



24.21 - 24.23

yeah if there's overlap in the interval

如果时间间隔上有重叠



24.23 - 24.32

then there's then you know that you could the system could legally execute either of them in a real-time and I in the interval

那么该系统在这段时间间隔内实时的处理其中任何一个请求都是合法的

24.32-24.36（需要再看一遍）

 so that's the sense in which they could system gonna execute them in either order

So，系统可以按照任意顺序来执行它们


24.36-24.41

 now you know other you know if it weren't for these two reads

如果没有这两个读请求

24.41-24.46

 the system would have you know total freedom execute that writes in either order

那么系统可以以任意顺序自由地去执行这些写请求

24.46-24.48

 but because we saw the two reads

但因为我们看到了这两个读请求

24.48-24.56

 we know that you know the only legal order is two and then one

那么唯一合法的顺序就是先执行wx2和rx2，再执行wx1和rx1

25.02-25.05

 yeah so if the two reserve laughing lagging then and then any order then the reads could have seen either

如果这两个读请求有滞延，那么读请求可能会读取到1或者2

25.05 - 25.08

 in fact you know Toby  till we saw the two and the one words all  result from the reads

直到我们得到了这两个读请求的结果：1和2

25.08 - 25.11

these doobies could have you know

那么它们的顺序也就固定了

25.12-25.17

the system until it committed to the values for the read it still had freedom to return them in either order

在系统明确返回这两个x的值之前，系统仍然可以按照任意顺序来提交x的值

25.24-25.25

I'm using them as synonyms

我将它们当做同义词来用

25.25-25.33

 yeah yeah you know for most people  although possibly not today's paper 

对于大多数人，即便你没有读过今天的参考论文

25.33-25.36

linearizability is is well defined 

对于linearizability的定义应该也会清楚了

25.36-25.40

and and people's definitions really deviate very much from this 

然而人们所做的定义又确实与此有很大出入

25.40-25.49

strong consistency though is less I think there's less sort of consensus about exactly what the definition might be

即我觉得强一致性这个定义与我所提到的内容还是缺乏共识的

25.49-25.50

 if you meant strong consistency 

如果你说的是强一致性


25.50-25.56

it's often men it's usually men too in ways that are quite close to this

许多场合下经常提到的强一致性相关的内容更贴近于我黑板上所写的定义



25.56-25.56

like for example

例如

25.56-26.03

 that oh the system behaves the same way that a system with only one copy of the data would behave

这个系统所表现的方式和只有一份数据的系统所表现的一模一样



26.03 - 26.06

all right which is quite close to what we're getting at with this definition

这和我们从这个定义中所得出的东西非常接近



26.06 - 26.13

but yeah for you know it's reasonable to assume that strong strong consistency is the same as serializable

强一致性和序列化是等同的，这种假设是合理的

26.13-26.20

 okay so this is not linearizable 

okay  So，这个历史记录并不是linearizable的

26.20-26.22

and the you know the the lesson is

我们从中得到的经验是

26.22-26.27

reads are not allowed to return stale data

我们不允许读请求返回的是过时的数据


26.27-26.30

 only only fresh data

它所返回的只能是最新的数据

26.30-26.35

or you can only return the results of the most recently completed write

或者，你只能返回最近所执行完毕的写请求的值



26.44 - 26.51

okay I have a final final little example

Ok，我们再来看下最后一个小例子



26.51 - 26.53

so we have two clients 

So，我们有两个client


26.53-26.58

one of them submits a write to X with value three

其中一个发起了写请求，将x的值设置为3


26.58 - 27.01

and then write two x with value 4 

然后，将x的值设置为4

27.01-27.05

and we have another client 

接着，我们还有另一个client

27.05-27.09

and you know at this point in time

在这个时间点处


27.09-27.12

 the client issues a read of X 

client 2发起了读取x的请求

27.12-27.16

but and this is a question you asked 

回到你刚才要问的问题

27.16-27.21

the client doesn't get a response right

client并没有得到一个响应

27.21-27.25

 you know who knows like it in the sort of actual implementation may be the leader crashed at some point

在实际的实现中，leader在某个时间点崩溃了



27.25 - 27.30

maybe the his client to sent in the read request so the leader maybe didn't get it 

可能这个client对leader发送了一个读请求，但leader可能并没有拿到这个读请求

27.30-27.31

because the request was dropped

因为请求可能被丢弃了

27.31-27.35

 or maybe the leader got the request and executed it 

或者可能是leader拿到了这个请求，也执行了这个请求

27.35-27.37

but the response the network dropped the response

但在网络传输的过程中，发生了丢包的情况，响应被丢弃了

27.37-27.43

 or maybe the leader got it and started to process up and then crash before finished processing

或者是，leader拿到了这个请求，并开始对其进行处理，但在处理完前，leader就崩溃了



27.43 - 27.46

and or maybe did process it and crash before saying the response who knows

或者，leader确实处理完这个请求，但在它发出响应前，它崩溃了，但具体是什么情况谁知道呢



27.46-27.47

when the clients point of view

站在client的角度来讲

27.47-27.49

 like sent a request and never got a response

那就是，它发送了请求，但从来没有得到响应

27.49-27.52

so in the interior machinery of the client

So，在client端的内部机器 处理机制中

27.52-27.54

 for most of the systems we're talking about

对于我们所讨论的大部分系统来说

27.54-27.55

the client is going to resend the request

client会重新发送该请求

27.55-27.58

 maybe do a different leader

它可能会将这个请求发给一个不同的leader

27.58-27.59

maybe the same leader 

也可能还是同一个leader

27.59-28.00

who knows what

谁知道呢


28.00-28.02

 so it sent the first request here

So，它在此处发起了第一个请求


28.02-28.06

and maybe it sends the second request at this point in time 

接着，它可能会在这个时间点处发出第二个请求

28.06-28.07

it times out

然后，rx超时了


28.07-28.09

 you know no response 

我们并没有得到rx所对应的响应

28.09-28.11

sends the second request at this point 

然后，我们在这个时间点第二次发送这个请求


28.11-28.13

and then finally gets a response

最终我们得到了一个响应

28.13-28.17

 it turns out that 

事实证明

28.17-28.21

and you're going to implement this in lab 3

并且你们要在lab 3中实现这个

28.21-28.28

 that a reasonable way of servers dealing with repeated requests is

服务器处理这种重复请求的合理方法是

28.28-28.30

for their servers to keep tables 

在它们的服务器中会去保存相关的表

28.30-28.34

sort of indexed by some kind of unique request number or something from the clients

该表会使用唯一请求号或者其他来自client的信息进行索引

28.34-28.38

in which the servers remember oh I already saw that request and executed it 

以此让服务器记住这些重复的请求，当服务器再次看到这些具备相同请求号的请求的时候，它会表示这个请求，它已经见过了并执行过了（知秋注：其实基本上是针对写请求来讲的，设定写版本号）

28.38-28.41

and this was the response that I sent back

然后，这是我要发回去的响应信息

28.41-28.42

because you don't want to execute a request twice

因为我们不想去执行一个请求两次



28.42 - 28.45

you know if it's a for example

例如

28.45-28.46

 if it's a write request 

如果这是一个写请求

28.46-28.48

you don't want to execute requests twice

那么我们不会想去执行这个请求两次

28.48-28.51

 so the server's have to be able to filter out duplicate requests

So，服务器必须能够过滤重复的请求



28.51 - 28.58

and they have to be able to return the reply to repeat the reply that the originally sent to that request 

它们必须得能够再次返回原本要发送给该client的响应

28.58-29.00

which perhaps has dropped by the network

这个响应可能之前因为网络问题，所以被丢掉了

29.00-29.07

so that servers remember the original reply and repeat it in response to the resend 

So，服务器会记住这个原来的回复，然后将这个回复重新发回给client

29.07-*29.08

and if you do that

如果你这样做的话

29.08-29.09

 which you will in lab 3 

当然你们在lab 3中就会遇上这个

29.09-29.20

then if you know since the server the leader could have seen value 3，when it executed the original read request from client 2

当leader执行由client 2发送的原来的读请求的时候，leader就会看到要读的数值是3

当leade在这个点执行由client 2再次发送的读请求，leader就会看到要读的数值是3


29.20-29.27

it could return value 3 to the repeated requests that was sent at this time completed at this time 

它可以将3返回给这个重复的读请求，这个重复的读请求是在左边箭头所指的时间点发送，并在右端末尾执行完毕

client会在箭头标示处重发读请求，并成功接收到leader的返回值3

29.27-29.34

and so we have to make a call on whether that is legal right

So，我们得在这里进行一次调用，来看看这是否合法



29.34-29.36

 you could argue 

你可以说

29.36-29.42

that oh gosh you know the client we sent the request here this was after the write of X to 4 completed 

在wx4完成后，client 2再次发送了这个rx3请求

29.42-29.45

so Jesus what you really should return 4 at this point instead of 3 

So，此时，leader应该返回的是4而不是3

29.45-29.56

and this is like a little bit a question of it's like a little bit upon the designer

So，这个问题就得由设计它的人来解决了

这个问题要取决于系统是如何设计的

29.56-29.59

 but if what you view is going on is

但这里，我们所观察到的是

29.59-30.08

 that the retransmissions are a low-level concern  that's you know part of the RPC machinery or hidden in some library or something

retransmission（重新发送）是我们所关心的一个低级层面的问题，它是rpc机制的一部分，或者说它隐藏在某些库中

30.08-30.10

 and that from the client applications point of view

从客户端应用程序的角度来说


30.10-30.16

 all that happened was that it's sent a request at this time and got a response at this time

这里所发生的事情就是，client在左边发起一个请求，然后在右边得到对于该请求的响应

30.16-30.18

 and that's all that happened from the clients point of view

这就是client眼中所发生的事情


30.18 - 30.22

then a value of 3 is totally legal here

那么这里返回3是完全合法的


30.22-30.24

because this request took a long time

因为这个请求从发起到完成花了很长一段时间

30.24-30.27

it's completely concurrent with the write

它与这个wx4完全是并发出现的

30.27-30.29

not ordered in real time with the write

在时间上它和这个wx4并没有一定的出现顺序

并不是wx4执行后再执行读取操作



30.29-30.38

 and therefore either the three or the four is valid，you know as if the read requests that really executed here in real time or or here in real time 

因此，如果这个读请求真的是在这里或者这里被执行的，那么不管返回3还是4都是合法的

因此，如果leader是在wx4执行前执行读操作，返回值是3。在wx4后执行读操作的话，返回值就是4。这两个返回值都是合法的



30.39 - 30.40

so the larger lesson is 

So，更大的教训是

So，更大的经验就是

30.40-30.45

if you have client retransmissions 

如果我们遇上了client重新发送请求的情况

30.45-30.48

the from the application point of view 

从应用程序的角度来看

30.48-30.51

if you're defining linearizability from the applications point of view

如果你是站在应用程序的角度来定义线性一致性

30.51-30.54

even with retransmissions ，

即使遇到了retransmission的情况

即便考虑了retransmission（client重新发送该请求）的情况


30.54-31.05 *****

the real time extent of the requests like this is from the very first transmission of the requests to the final time at which the application actually got the response

这样的请求的实时范围是从请求的第一次传输到应用程序实际获得响应的最终时间



31.05-31.07

maybe after many resends

这期间可能重发过很多次请求

31.07-31.08

yes

请讲

31.24-31.28

you might rather you got fresh data than stale data 

可能你想要的是最新的数据，而不是陈旧的数据

31.28-31.36

you know if I'm you know supposing the request is what time it what time is it  that's a time server I sent a request saying Oh what time is it

假设如果我向一个时间服务器发送了一个请求来询问现在的时间



31.36-31.37

and it sends me a response 

然后，它对我进行响应

31.37-31.40

you know yeah if I send a request now 

如果我现在发送了一个请求

31.40-31.45

and I don't get the response until 2 minutes from now dude some Network issue 

因为某些网络问题，当我发送完请求的两分钟后，我才收到响应

31.45-

it may be that the application would like prefer to see





31.48 - 31.50

when we're gonna get the response

当我们得到响应时

31.50-31.55

 it would prefer to see a time that was close to the time at which had actually got the response

应用程序更倾向于知道实际得到响应的时间

我们更倾向于得到接近实际响应的时间



31.55--31.58

 rather than a time deep in the past when it originally sent the request

而不是当我一开始发送请求时的过去时间

而不是最初发送请求的时间

31.58-32.04

now the fact is that if you you know if you're using a system like this

现在的情况是，如果你使用的是一个像这样的系统

32.04-32.09

 you have to write applications that are tolerant of these rules

你必须写出能够包容这些规则的应用程序

32.09-32.12

using a linearizable system like  these are the rules 

使用一个线性一致性的系统时，得遵循这些规则

32.12-32.15

and so you must write you know correct applications must be tolerant of

So，你想要写出正确的应用程序，就必须能包容这些规则



32.15 - 32.19

you know if they send a request and they get a response a while later

如果它们发送了一个请求，然后，稍后它们得到了响应

32.19-

 they just



32.20 - 32.23

you know you can't are not allowed to write the application

我们不允许写出这种程序


32.23-32.25

 as if oh gosh if I get a response 

即如果我在此得到了一个响应


32.26-32.30

that means that the value at the time I got the response was equal to 3

这意味着，若我从响应中拿到的值是3



32.30 - 32.32

 that is not OK for applications to think

这对于应用程序来说是不ok的



32.32 - 32.39

 you know what that I have that plays out for a given application depends on what the application is doing

对于一个给定的应用程序所提供的内容，取决于该应用程序所正在做的事情

32.39-32.42

the reason I bring this up is 

我之所以提出这个



32.42-32.45

because it's a common question in 6824

是因为这是6.824中的一个常见问题

32.45-32.57

 you guys will implement the machinery by which servers detect duplicates and resend the previous answer that the server originally sent

你们要去实现这种机制，即让服务器检测出重复发送的请求（即对写请求进行版本控制），并将服务器之前原本要发送的结果重新发送给client

32.57-32.58

 and the question will come up 

这种问题


32.57 - 33.02

is it ok if you originally saw the request here 

原始请求在这个点发送


33.02 - 33.03

to return at this point in time 

在这个点返回结果


33.04 - 33.09

the response that you would have sent back here if the network hadn't dropped it 

如果没有网络丢包，那么系统应该返回这个点对应的响应

33.09-33.14

and it's handy to have a kind of way of reasoning 

用这种方式去解释其实很方便

33.14-33.18

I mean one reason to have definitions like linearizabilities to be able to reason about questions like that right

我的意思是，通过这种定义（比如，线性一致性）就能够解答这些问题

33.18-33.26

i'm using this scheme we can say well it actually is okay by those rules

通过使用这种方式，我们就可以证明在这些规则下，这些情况是ok的



33.26 - 33.29

all right that's all i want to say about linearizability 

这就是我想说的关于线性一致性的内容

33.29-33.32

any lingering questions

有任何疑问吗？

33.32-33.34

 yeah

请问


33.45 - 33.49

well you know maybe I'm taking liberties here 

Well，这里我可能是随便选的顺序



33.49 - 33.55

but what's going on is that

但在这里所发生的事情是



33.55-33.58

 in real time we have a read of  2and a read of one 

我们实时发起两个读请求，即rx2和rx1



33.58 - 34.01

and the read of one really came after in real time the read of two

在时间上，rx1在rx2之后发起


34.01-34.06

and so must come must be in this order in the final order 

So，它们的实际顺序就必然是图上这样的

34.06-34.13

that means there must have been a right of 2 somewhere in here it's our right with value one somewhere in here 

但在rx2和rx1之间某个位置必然会有一个wx1的请求



34.13 - 34.19

that is after the read of 2 in the final order right after the read of 2 and before the read of one

在最终顺序中，wx1是在rx2之后和rx1之前出现的



34.19-34.22

 in that order there must be a write with value one

在这个顺序中，rx2和rx1之间必然有一个wx1



34.22 - 34.24

 there's only one write with a value one available

这里只有一个wx1

34.24-34.26

 you know if there were more than one 

如果这里有多个wx1

34.26-34.27

we maybe could play games 

那我们就可以玩点小花样



34.27 - 34.28

but there's only one available

但这里只有一个wx1


34.28-34.37

so this write must slip in here in the final order, therefore I felt able to draw this arrow

So，这个写入请求必须在这个顺序中的这个问题，因此我觉得，我可以在这画个箭头

so，这个写请求在最终顺序中必须在这个位置，因此我觉得，我可以在这画个箭头表示

34.37-34.47

and these arrows just capture the sort of one by one implication of the rules on what the order must look like 

这些箭头只是根据一条条规则所暗示的顺序进行捕获

这些箭头只是记录了历史记录遵循线性一致性的规则下，一个顺序操作的状态

34.47-34.48

yeah

请讲



35.05-35.08

all right yeah I mean any  rX so which sorry which which？

你说的是哪个rx？

35.08-35.15

his own rx1

它自己的rx1？



35.16 - 35.19

he sees it before his own rx1 

它会在rx1之前看到wx1

35.29-35.37（问出了我的疑问。。。）

well we're not we're not we're not really able to say which of these two reads came first 

Well，其实我们没法说出这两个读请求谁先谁后

35.37-35.41

so we can't quite for all this error 

So，我们无法完全解决所有错误

35.41-35.44

if we mean this arrow to constrain the ultimate order

箭头的指向限制了最终的顺序

35.44- 35.47

we're not you know the these two reads could come in either order 

这两个读请求可以以任意的顺序出现

35.47-35.50

so we're not allowed to say this one came before that one

So，我们不能说这个请求会在另一个请求之前出现

35.50-35.55

 it could be there's a simpler cycle actually then I've drawn

实际上，我所画的可能是一个简单的循环


35.55 - 36.09

 so I mean it may be because certainly the that the damage is in these four items I agree with that these four items kind of are the main evidence that something is wrong

因为通过这四个item就能够证明这里有问题的









36.09 - 36.14

now whether a cycle I'm not sure whether there's a cycle that just involves that there could be 

我不确定这里是否有个循环，但在这里确实有一个



36.14 - 36.19

okay this is worth thinking about 

Ok，这值得思考一下



36.19 - 36.25

cuz you know I can't think of anything better or I'll certainly ask you a question about linearizable histories on midterm

因为我想不出能问什么更好的问题，所以我会在期中考试的时候问你关于linearizable history的问题

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

36.31-36.37

okay so today's paper today's paper zookeeper

Ok，今天我们要读的论文是ZooKeeper

36.37-36.45

 and I mean part of the reason we're even zookeeper paper is that

我们之所以要读ZooKeeper这篇paper的部分原因是

36.45-36.47

 it's a successful real world system 

它是业内一个非常成功的系统

36.47-36.54

it's an open source you know service that actually a lot of people ron has been incorporated into a lot of real world software 

它是一个开源系统，实际上很多人已经将这个服务集成到许多现实生活中的软件中了

36.54-36.57

so there's a certain kind of reality and success to it

So，它在现实生活中确实取得了某种程度上的成功

36.57-37.06

 but you know that makes attractive from the point of view of kind of supporting the idea that the zookeepers design might actually be a reasonable design 

但从支持者的观点出发，吸引我们的原因是因为，

之所以支持它，其中吸引我们的原因在于，从设计上讲，ZooKeeper的设计很合理

37.06-37.15

but the reason we're interested in in it I'm interested in it is for to somewhat more precise technical points 

但我对其感兴趣的原因是它其中的某些更精准的技术要点


37.15-37.19

so why are we looking at this paper 

So，我们为什么看这篇paper呢？



37.19-39.22

so one of them is that

So，其中一点是



37.22-37.24

in contrast to raft 

为了和raft进行对比

37.24-37.28

like the raft you've written and raft as that's defined it's really a library 

你们已经写过和定义过的raft，它其实是一个库



37.28-37.32

you know you can use a raft library as a part of some larger replicated system

你们可以将raft这个库作为某些大型replicated系统的一部分使用



37.32-37.37

but raft isn't like a standalone service or something that you can talk to

但raft并不是一个你可以向其通信的独立服务或者其他什么东西

37.37-37.43

 it's you really have to design your application to interact at the raft library explicitly 

你必须设计出你自己的应用程序，以此来和raft库进行明确地交互



37.43-37.45

so you might wonder

So，你可能会想

37.45-37.47

 it's an interesting question

这里一个有趣的问题

37.47-38.00

 whether some useful system sort of standalone general-purpose system could be defined that would be helpful for people building separate distributed systems 

某些独立通用的系统对于人们用来构建单独的分布式系统是否有帮助呢？

38.00-38.05

like is there serve some service that can bite off a significant portion of why it's painful to build distributed systems 

是否可以提供某种服务以此来消除构建分布式系统时的很大一部分痛苦呢？

38.05-38.11

and sort of package it up in a standalone service that you know anybody can use 

然后，将其打包为一个人人都可以使用的独立服务

38.11-38.24

so this is really the question of what would an API look like for a general purpose I'll call it 

So，这里的问题是这个出于通用目的的API应该长什么样

38.24-38.26

I'm not sure what the right name for things like zookeeper is

我不确定ZooKeeper中这些东西的正确名字是什么


38.26-38.31

 but you've got a general purpose coordination service

但我们会得到一个以通用为目的的协调服务



38.31 - 38.40

and the other question the other interesting aspect of zookeeper is that

ZooKeeper中另一个有趣的方面是



38.40 - 38.43

when we build replicated systems

当我们构建replicated system时

38.43-38.45

 and zookeeper Is a replicated system

ZooKeeper就是一个replicated system

38.45-38.51

 because among other things it's it's like a fault-tolerant general-purpose coordination service

因为在其他所有东西中，它就像是一个以通用为目的的具备容错能力的协调型服务

38.51-38.55

 and it gets fault tolerance like most systems by replication

它和大部分系统一样，通过复制（replication）来获得容错能力

38.55-39.00

 that is there's a bunch of you know maybe three or five or seven or who knows what zookeeper servers

这就会有一堆ZooKeeper服务器，可能是3台，5台，7台或者更多

39.00-39.04

 it takes money to buy those servers right

我们需要花钱去买这些服务器

39.04-39.12

 like a 7 server zookeeper setup is 7 times expensive as a sort of simple single server 

如果是设置7台ZooKeeper服务器，那么就是要7倍的部署费

39.12-39.15

so it's very tempting to ask

So，问个很诱人的问题

39.15-39.18

if you buy 7 servers to run your replicated service

如果你买了7台服务器用来运行你的replicated服务

39.18-39.22

can you get 7 times the performance out of your 7 servers 

那我们可以从这7台服务器中获得相对于一台服务器而言，7倍的性能吗？

39.22-39.25

right and you know how could we possibly do 

我们该如何做呢？


39.25-39.37

that so the question is you know we have n times as many servers can that yield us n times the performance

So，这里的问题是，如果我们有n台服务器，那么我们就会获得n倍的性能吗？

39.37-39.43

so I'm gonna talk about the second question first 

So，我会先来讨论下第二个问题

39.43-39.50

so from the point of view  this discussion about performance

So，从性能的角度来看

39.50-39.54

 I'm just going to view zookeeper as just some service we don't really care what the service is 

我只会将ZooKeeper看做是某种服务，具体是什么服务我们并不在意

39.54-39.58

but replicated with a raft like replication system

但它会通过例如raft这样的replication system来进行复制



39.58-40.02

zookeeper actually runs on top of this thing called Zab

实际上，ZooKeeper是在Zab协议的基础上运行的（Zab协议是为分布式协调服务ZooKeeper专门设计的一种支持崩溃恢复的一致性协议）

40.02-40.11

 which for our purposes we'll just treat as being almost identical to the raft 

出于我们的目的，我们会将它当做是raft一样来处理



40.14 - 40.17

and I'm just worried about the performance of the replication

我担心的只是replication的性能问题









四十四  阅举报
08-03


40.17 - 40.20

 I'm not really worried about what zookeepers specifically is up to

但我并不关心ZooKeeper会去做什么


40.20-40.25

so the general picture is that you know we have a bunch of clients maybe hundreds maybe hundreds of clients

So，基本的图是这样的，假设我们有一堆client，比如数百个吧

40.25-40.32

 and we have just as in the labs we have a leader 

然后在lab中，我们会有一个leader


40.32-40.39

the leader has a zookeeper layer that clients talk to

这个leader有一个能和client进行通信的ZooKeeper层





40.39-40.42

and then under the zookeeper layer is the Zab system

接着，在ZooKeeper层下的就是Zab系统

40.42-40.43

that manages replication

它用来管理这些replication

40.43-40.45

 then just like rafts

就像raft那样

40.45-40.52

what was a a lot of Zab that is doing is maintaining a log that contains the sequence of operations that clients have sent in 

Zab所做的最多的事情，就是去维护日志，该日志中包含了client所发送进来的操作序列


40.52-40.57

really very similar to raft 

和raft真的很像

40.57-41.00

may have a bunch of these

我们可能会有一大堆这样的东西

41.00-41.02

 and each of them has a log

它们每个都会有一个日志

41.02-41.08

but it's appending new request to

它们会往日志上追加新的请求

41.08-41.12

that's a familiar setup

这是一种我们很熟悉的设置

41.12-41.23

so the clients send a request and the Zab layer you know sends a copy of that request to each of the replicas

So，Client会发送一个请求给leader，然后Zab层会将该请求的副本（copy）发送给每个replica

41.23-41.28

 and the replicas append this to their in-memory log probably persisted onto a disk

这些replica会将这个请求追加到它们内存中的日志里面，也可能会将它持久化到一个磁盘上

41.28-41.30

 so they can get it back if they crash and restart 

So，如果它们崩溃重启了，它们就可以靠这个恢复

41.30-41.34

so the question is 

So，这里的问题是

41.34-41.36

as we add more servers

当我们添加更多的服务器时

41.36-41.38

 you know we could have four servers or five or seven or whatever

正如你知道的那样，我们可以有4个，5个或者7个甚至更多个服务器



41.38 - 41.44

does the system get faster as we add more more CPUs more horsepower to it

当我们添加更多的CPU时，系统会变得更快吗？

41.48-41.53

 do you think your labs will get faster as you have more replicas

当你们有越来越多的replica时，你们觉得你们在lab中所实现的系统会变得更快吗？

41.53-41.55

assuming they're each replicas its own computer right 

假设一个replica就是一个单独的电脑

41.55-41.59

so that you really do get more CPU cycles as you have more replicas

So，当你所拥有的replica越多，你就会进行更多的CPU执行周期



42.17 - 42.21

yeah yeah there's nothing about this that makes it faster as you add more servers 

当你添加更多的服务器时，其实这并不会加快你系统的运行速度

42.21-42.23

right it's absolutely true 

你说的没问题

420.23-42.24

like as we have more servers 

当我们你有了更多的服务器

42.24-42.27

you know the leader is almost certainly a bottleneck

那么，几乎可以肯定的是leader成为了一个瓶颈



42.27 - 42.31

cuz the leader has to process every request and it sends a copy of every request to every other server

因为leader必须处理每个请求，并发送每个请求的副本给所有其他的服务器

42.31-42.32

 as you add more servers

当你增加更多的服务器时

42.32-42.35

 it just adds more work to this bottleneck node 

这只是对leader这个瓶颈点增加了更多的工作罢了

42.35-42.39

right you're not getting any benefit any performance benefit out of the added servers 

我们并不会从这些增加的服务器数量中获得任何性能上的好处

42.39-42.40

because they're not really doing anything

因为它们并没有真的做任何事



42.40 - 42.44

they're just all happily doing whatever the leader tells them to do

它们只是很高兴地去做leader所告诉它们要做的事情

42.44-42.50

 they're not you know subtracting from the leaders work and every single operation goes to the leader

它们并没有减轻leader的工作量，即并没有分摊所有要由leader所处理的每个操作





42.50 - 42.51

 so for here 

So，对于此处而言

42.51-42.59

you know the performance is you know inversely proportional to the number of servers that you add 

性能与我们所添加的服务器数量成反比

42.59-43.01

you add more servers this almost certainly gets lower 

你服务器数量加的越多，那么几乎可以肯定的是，你系统的速度会越慢

43.01-43.03

because the leader just has more work 

因为这只会让leader增加工作量罢了

4303-43.05

so in this system

So，在这个系统中


43.05-43.13

 we have the problem that more servers makes the system slower 

我们会有这样的问题，即随着服务器数量的增加，它会使得系统变得更慢

43.13-43.15

that's too bad

这实在是太糟了

43.15-43.18

 you know these servers cost a couple thousand bucks each

正如你知道的那样，每台服务器都得花好几千美金

43.18-43.21

 and you would hope that you could use them to get better performance 

并且你希望通过它们来获得更好的性能



43.21-43.23   ！！！！！！

yeah

请讲

43.33-43.34

okay so the question is 

So，他的问题是

43.34-43.40

what if the requests may be from different clients or successive requests from same client or something 

如果这些请求是来自不同的Client或者是一个client的连续请求，或者是其他之类的情况

43.40-43.44

what if the requests applied totally different parts of the state

如果这些请求应用到该state中不同的部分会怎么样呢？



43.44 - 43.49

so you know in a key value store maybe one of them is a put on X and the other was a put on Y like nothing to do with each other 

So，比如在一个key/value存储服务中，一个请求是要对x进行修改，另一个请求时对y进行修改，除此以外，不会对彼此做任何事情

43.49-43.53

you know can we take advantage of that 

我们可以利用这点的优势吗？

43.53-43.56

and the answer that is absolutely

答案当然是可以



43.56-43.58

now not in this framework though

虽然并不是在这种框架下

43.58-44.03

 or it's the center which we can take advantage of it it's very limited in this framework

我们只能在这种框架下获得非常有限的性能提升



44.03-44.10

 it could be well at a high level the leader the requests all still go through the leader 

从一个高级层面来说，所有的请求依然都是发给leader的

44.10-44.14

and the leader still has to send it out to all the replicas 

leader依然得将这些请求都发给所有的replica

44.14-44.18

and the more replicas， there are the more messages the leader has to send

replica越多，leader所要发送的数据越多



44.18-44.19

so at a high level

So，从一个高级层面来看

44.19-44.26

 it's not likely to this sort of commutative of requests is not likely to help this situation

这种互不影响的请求并不会对这种情况有所帮助

44.26-44.28

it is a fantastic thought to keep in mind though 

但要记住，这是一个很棒的想法



44.28 - 44.30

because it'll absolutely come up in other systems 

因为它绝对会在其他系统中出现

44.30-44.35

and people will be able to take advantage of it in other systems

人们会能够在其他系统中利用它的优点

44.35-44.37

 okay



44.37-44.42

so there's a little bit disappointing facts with server hardware wasn't helping performance

So，我们对这个事实有点失望，即服务器硬件数量的提升对性能没有什么帮助

44.42-44.56

so a very sort of obvious maybe the simplest way that you might be able to harness these other servers is

So，一种你们能够利用其他服务器性能的方法是


44.56-45.01

 build a system in which ya write requests all have to go through the leader

构建出一种系统，即所有的写请求都由leader来处理

45.01-45.03

 but in the real world 

但在现实生活中

45.03*-45.05

a huge number of workloads are read heavy

很大一部分workload都是读请求

45.05-45.06

that is there's many more reads

也就是有很多读请求

45.06-45.07

 like when you look at web pages

比如，当你浏览网页的时候

45.07-45.10

you know it's all about reading data to produce the web page 

我们所做的其实就是读取数据，以此来生成网页

45.10-45.13

and generally there are very relatively few write

通常相对来讲，几乎没有什么写请求

45.13-45.14

and that's true of a lot of systems

对于很多系统来说，确实是这样的

45.14-45.16

 so maybe we'll send writes to the leader 

So，我们可能会发送写请求给leader


45.16-45.20

but send reads just to one of the replicas 

但我们会将读请求发给其中一个replica

45.20-45.22

right just pick one of the replicas 

从这些replica中随便选一个，将读请求发给这个replica

45.22-45.24

and if you have a read-only request

如果你的请求是一个只读请求

45.24-45.25

 like a get in lab 3

比如，lab 3中的get请求

45.25-45.27

just send it to one of the replicas and not to the leader

我们会将它发送给其中一个replica，而不是发送给leader

45.27-45.29

 now if we do that

如果现在我们这么做的话

45.29-45.30

we haven't helped writes much

这样做并不会对写请求有太多帮助

45.30-45.32

 although we've gotten a lot of read workload off the leader

虽然我们将大量的读请求的工作从leader那里解放



45.32 - 45.33

 so maybe that helps 

So，这可能有所帮助

45.33-45.37

but we absolutely have made tremendous progress with reads

但实际上我们在处理读请求方面取得了巨大的进步

45.37-45.43

 because now the more servers we add，the more clients we can support

因为随着我们添加的服务器越多，那么我们就可以支持处理更多的client



45.43 - 45.47

right because we're just splitting the client leader workload across the different replicas 

因为我们通过多个不同的replica来分担client-leader的工作量

45.47-45.49

so the question is 

So，此处的问题是

45.49-45.53

if we have clients send directly to the replicas 

如果我们让client直接将请求发送给replica

45.53-45.57

are we going to be happy

这样做，我们会高兴吗？

45.57-46.01

yeah

请讲

46.08-46.12

 so up-to-date does the right is the right word 

So， up-to-date（最新的）这个单词才是正确的用词

46.12-46.14

in a raft-like system which zookeeper is

在raft这样的系统中，其实ZooKeeper就是

在zookeeper这种类raft系统中

46.14-46.20

 if a client sends a request to a random replica

如果一个client发送了一个请求给一个随机replica

46.20-46.23

 you know sure the replica you know has a copy the log  in it 

正如你们知道的那样，这个replica有一份日志的副本

46.23-46.26

you know it's been executing along with the leader 

它和leader一起执行

它一直随着leader的执行而执行


46.26-46.29

and you know for lab 3 it's got this key value table

正如你们知道的那样，在lab 3中，这里会有一个key/value表

46.29-46.34

 and you know you do a get for key X and it's gonna have some value for key x in table

当你发出get请求来获取key X的值时，你可以从这个表中获取X的值



46.34 - 46.35

and it can reply to you

它可以对你进行响应

46.35-46.42

 so sort of functionally the replicas got all the pieces it needs to respond to client to read requests from clients

So，从功能上来讲，replica会拿到它（该读请求）所需要的所有数据用来响应client的读请求

46.42-46.46 

the difficulty is

这里的难点在于

46.46-46.51

 that there's no reason to believe that anyone replicas other than the leader is up to date 

我们没有任何理由去相信任何replica上的数据比起leader来说，是最新的

46.51-46.57

because well there's a bunch of reasons why replicas may not be up to date

之所以replica上的数据不是最新的，这其实有很多原因

46.57-47.02

one of them is that they may not be in the majority that the leader was waiting for

其中一个理由是，它们可能并不属于leader所等待的多数派服务器

其中一个理由是，它们可能并不是响应leader写请求的多数派服务器中的一员

47.02 - 47.03

you think about what raft is doing 

你们可以去思考下raft所做的事情

47.03-47.09

the leader is only obliged to wait for responses to its append entries from a majority of the followers

leader只需要等待去响应来自多数派中的follower所发出的AppendEntries

leader只需要等待来自多数派中的follower对由leader发送给它AppendEntries rpc的响应

47.09-47.12

 and then it can commit the operation and go on to the next operation

然后，leader可以去提交这个操作，并继续处理下一个操作


47.12-47.15

 so if this replica wasn't in the majority 

So，如果这个replica并不是在多数派中

47.15-47.17

it may never have seen a write

它可能永远都不会看到一个写请求

47.17-47.20

it may be the network dropped it  and never got it 

这可能是因为网络丢包，所以导致它从来没有收到过这个请求

47.20-47.28

and so yeah you know the leader and you know a majority of the servers have seen the first three requests

假设，leader和多数派中的服务器已经看到了前三个请求


47.28-47.32

 but you know this server only saw the first two it's

但这个服务器只看到了前两个请求

47.32-47.32

missing B

它丢掉了B（这里说错了，丢掉的应该是C）


47.32-47.36

 so read to be a read of you know what should be there

So，这里应该有一个读请求

47.36-47.40

 I'll just be totally get a stale value from this one

如果我从这个服务器上读取数据，那么我得到的是一个过时的数据


47.40 - 47.46

even if this replica actually saw this new log entry

即使如果这个replica实际上看到了这个新的日志条目

47.46-47.48

 it might be missing the commit command

它也可能缺失了提交过的命令

47.48-47.51

 you know this zookeepers app as much the same as raft

正如你们知道的那样，使用ZooKeeper的应用程序和使用raft的功能是一样的

zookeeper的实现基本上与raft是一样的

47.51-47.53

 it first sends out a log entry 

它首先会对外发出一个日志条目

47.53-47.56

and then when the leader gets a majority of positive replies 

接着，当leader收到来自多数派的正面响应后

47.56-47.58

the leader sends out a notification saying

leader会对外发送一个通知，并表示

47.58-48.00

 yeah I'm gonna committing that log entry 

它会去提交这个日志条目


48.00-48.02

I may not have gotten the commit

我可能没有拿到这个提交的记录

48.02-48.04

and the sort of worst case version of this

最糟的情况是

48.04-48.06

although its equivalent to what I already said

虽然这和我之前讲的是相同的情况

尽管我之前已经讲过类似的状况了

48.06-48.15

is that for all this client for all client 2 knows this replica may be partitioned from the leader 

即client 2知道这个replica可能和leader之间遇上了网络割裂问题 



48.15-48.17

or may just absolutely not be in contact with leader at all 

或者这个replica根本没法和leader通信



48.17-48.20

and you know the follower doesn't really have a way of knowing

要知道，follower没办法知道这点



48.20 - 48.26

that actually it's just been cut off a moment ago from the leader and just not getting anything 

实际上，它和leader之间断开了一会，并且这期间没有收到任何信息

48.26-48.30

so you know without some further cleverness

So，在没有一些更聪明的办法的情况下

48.30-48.34

 if we want to build a linearizable system

如果我们想去构建一个线性一致性系统

48.34-48.38

 we can't play this game of sending the attractive it as it is for performance

为了性能起见

48.38-48.42

 we can't play this game at replicas sending a read request to the replicas 

我们不能玩这种把戏，即将读请求发送给replica来处理

48.42-48.45

and you shouldn't do it for lab 3 either

你也不能在lab 3中这么做

48.45-48.47

because lab 3 is also supposed to be linearizable

因为你们在lab 3中所实现的系统也应该是linearizable的



48.47 - 49.00

it's any any questions about why linearizability forbids us from having replicas serve clients

关于线性一致性禁止我们用replica来处理client请求这一点，你们还有疑问吗？

49.00-49.03

 ok



49.03 - 49.08

you know that the proof is the I lost it

这里的证明是，emmm，我好像把它擦掉了



49.08-49.10

now but the proof was that simple

但证明其实很简单



49.10- 49.14

reading you know write one write 2 read one

比如，wx1，wx2以及rx1



49.14- 49.17

 example I put on the board earlier

其实我想说的是我之前黑板上写的例子



49.17-49.23

you not allowed just you know this is not allowed to serve stale data in the linear linearizable system

你们知道，我们不允许在线性一致性系统中提供过时的数据

49.23-49.26

ok 



49.26-49.29  ！！！！！！！

so how does ZooKeeper deal with this？

So，ZooKeeper该如何处理这种情况呢？

49.29-49.32

zookeeper actually does you can tell from table two 

从table 2中我们可以看出


49.32- 49.33

you look in Table two

我们来看下table 2



49.33 - 49.37

 zookeepers read performance goes up dramatically as you add more servers

当我们添加更多的服务器时，ZooKeeper处理读请求的急剧上升

49.37-49.40

so clearly zookeepers playing some game here

So，很明显，ZooKeeper在这里玩了一些小把戏



49.40-49.47

 which allows must be allowing it to return read only to serve read only requests from the additional servers the replicas 

这允许它处理来自其他额外服务器（replica）的只读请求

就是ZooKeeper允许replicas来处理只读请求



49.47-49.50

so how does ZooKeeper make this safe

So，ZooKeeper该如何保证它是安全的呢？



49.59 - 50.00

that's right

说的没错



50.00-50.03

I mean in fact it's almost not allowed to say it does need the written latest yeah

我的意思是它基本上是获取不到最新的写数据的



50.03-50.07

 the way zookeeper skins this cat is that it's not linearizable 

从这个角度来看，zookeeper 在这里是不具备linearizable 的 （知秋注：披着猫皮的zookeeper 抓不到linearizable这只老鼠，skin a cat是一个俚语，意思是“解决问题”）

50.07-50.10

right they just like to find away this problem

它们想去找出原因所在

50.10-50.14

 and say well we're not gonna be we're not going to provide linearizable reads 

我们不会去提供线性化的读请求

50.14-50.23

and so therefore you don't are not obliged you know zookeepers not obliged to provide fresh data to reads

因此，ZooKeeper没有义务将最新的数据提供给读请求

50.23-50.25

 it's allowed by its rules of consistency

一致性规则是允许它这么做的

50.25-50.29

 which are not linearizable to produce stale data for reads 

它没法以线性化的形式给读请求提供陈旧的数据

无法线性化以生成陈旧数据以供读取

这些zookeepers 并不具备linearizable，它们会提供陈旧的数据给读请求

50.29 - 50.37

so it's sort of solved this technical problem with a kind of definitional wave of the wand 

So，Zookeeper通过一种黑魔法解决了这个技术问题

50.37-50.40

by saying well we never owed you them linearizability in the first place

它会说，well，首先，我们从未赋予你线性化的能力

50.40-50.42

 so it's not a bug if you don't provide it 

So，如果你不提供这个的话，它也并不是一个bug



50.42-50.49

and that's actually a pretty classic way to approach this

实际上，这是解决这个问题的经典办法

50.49-50.55

 to approach the sort of tension between performance and strict and strong consistency

为了在严格的强一致性和性能间取得平衡

50.55-50.59

 is to just not provide strong consistency

那就不提供强一致性

50.59-51.00

 nevertheless we have to keep in the back of our minds

但是，我们必须保持头脑清醒

51.00-51.07

question of if the system doesn't provide linearizability 

问题来了，如果这个系统不提供线性一致性

51.07-5108

is it still going to be useful

它依然有用吗？

51.08-51.10

 right and you do a read

当你进行一次读请求的时候

51.10-51.12

 and you just don't get the current answer or current correct answer

你并不会拿到当前的结果，或者说当前正确的结果

51.12-51.13

 the most latest data 

即最新的数据

51.13-51.16

like why do we believe that that's gonna produce a useful system 

我们为什么相信这会是一个有用的系统呢？



51.16 - 51.22

and so let me talk about that 

So，我们来讨论下这个吧

51.22-51.27

so first of all any questions about about the basic problem

So，首先，你们对这个基本问题有任何疑问吗？

51.27-51.31

 zookeeper really does allow client to send read-only requests to any replica 

ZooKeeper确实允许client发送只读请求给任何replica



51.31-51.34

and the replica responds out of its current state

replica会将其当前状态作为响应发出去


51.34-51.36

and that replica may be lagging

这个replica可能会滞后

51.36-51.39

Its log may not have the very latest log entries

它的日志中可能并没有包含最新的日志条目

51.39-51.44

and so it may return stale data, even though there's a more recent committed value

即使它这里有一个最近提交的值，它可能返回的也是过时的数据

51.44-51.47

okay 

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



51.47-51.50

so what are we left with

So，我们还剩下哪些内容要讲呢？



51.50-51.58

zookeeper does actually have some it does have a set of consistency guarantees 

ZooKeeper确实有一些一致性上的保证



51.58-52.06

so to help people who write zookeeper based applications reason about what their applications what's actually going to happen  when they run them

So，为了帮助那些基于ZooKeeper编写应用程序的人去理解运行程序时所实际发生的事情



52.06-52.11

so and these guarantees have to do with ordering as indeed linearizability does

Zookeeper就需要遵循linearizability的规则来处理请求



52.11-52.18

 so zookeeper does have two main guarantees that they state

So，关于状态，ZooKeeper主要有两个保证

52.18-52.19

 and this is section 2.3

这是section 2.3的内容

52.19-52.22

one of them is it says

paper中所说的其中一点是


52.22-52.30

that writes are linearizable

写请求是线性一致性的

52.30-52.37

now you know there are notion of linearizable isn't not quite the same in mine maybe

paper中所讲的线性一致性的概念和我所讲的可能不完全一样



52.37 - 52.40

because they're talking about writes no reads

因为他们只讲了写这块的内容，没有讲读这方面



52.40 - 52.43

 what they really mean here is that

他们此处真正所说的内容是



52.43 - 52.50

the system behaves as if even though clients might submit writes concurrently

即使client并发提交写请求



52.50 - 52.56

nevertheless the system behaves as if it executes the writes one at a time in some order 

但是系统会表现的像是以某种顺序一次执行一个写请求

52.56-53..00

and indeed obeys real-time ordering of writes

确实也遵守写请求结果的实时顺序

53.00-53.04

so if one write has seen to have completed before another write has issued 

So，如果一个写请求已经在另一个写请求发起前完成了



53.04-53.09

then ZooKeeper will indeed act as if it executed the second write after the first write

那么，ZooKeeper确实会在执行完第一个写请求后，再执行第二个写请求

53.09-53.13

 so it's writes but not reads are linearizable

So，这里讲的是写方面的线性一致性，而不是读方面的

53.13-53.18

and zookeeper isn't a strict readwrite system

ZooKeeper并不是一个严格的读写系统

53.18-53.22

there are actually writes that imply reads also

实际上，写里面也隐含了一些读

53.22-53.33

 and for those sort of mixed writes those those you know any any operation that modifies the state is linearizable with respect to all other operations that modify the state

对于某个状态来讲，对它的任何修改操作对于所有其他针对它的状态修改操作是线性化的，（知秋注：可以理解为多线程下的同步操作）



53.33-53.39

 the other guarantee of gives is

paper中所给出的另一个保证是

53.39-53.49

that any given client its operations executes in the order specified by the client

任何给定的client操作的执行顺序是由client来决定的


53.49-53.53

they call that FIFO client order

paper中将其称为FIFO client order



53.56 - 53.57

and what this means is that

这意味着



53.57-54.02

if a particular client issues a write and then a read and then a read and a write or whatever 

如果一个client发起了一个写请求，再来一个读请求，然后又来一个读请求，写请求，等等

54.02-54.04

that first of all 

首先

54.04-54.14

the writes from that sequence fit in the client specified order in the overall order of all clients writes

该请求序列中的写请求满足由所有client所发起的整体写请求的顺序

zookeeper的写操作顺序完全与client端发起的写请求顺序保持一致



54.13 - 54.20

 so if a client says do this write then that write and the third write

So，如果一个client表示，先执行这个写请求，然后再另一个写请求，接着再执行第三个写请求

54.20-54.25

 in the final order of writes will see the clients writes occur in the order of the client specified

在最终写请求的顺序中，我们会看到client的写请求的发生顺序是按照client所指定的顺序进行的


54.25-54.32

so for writes, this is our client specified order

So，对于写请求来着，这是由我们的client所定义的顺序



54.32 - 54.41

 and this is particularly you know this is a issue with the system

这是系统方面的一个问题

54.41-54.44

 because clients are allowed to launch asynchronous write requests 

因为我们允许client发起写请求时，可以是异步的

54.44-54.51

that is a client can fire off a whole sequence of writes to the leader to the zookeeper leader without waiting for any of them to complete 

在不等待任何写请求完成的情况下，一个client可以发送一堆写请求给ZooKeeper leader

54.51-54.55

and in order resume 

然后再按顺序恢复执行

54.55-54.55

the paper doesn't exactly say this

但paper并没有明确说这个

54.55-55.01

but presumably in order for the leader to actually be able to execute the clients writes in the client specified order

但为了能够让leader实际按照client所指定的顺序去执行client的写请求



55.01*-55.06

we're imagining I'm imagining that the client actually stamps its write requests with numbers

我觉得，client实际会在它的写请求上打上序号

55.06-55.10

 and saying you know I'll do this one first this one second this one third 

并表示，它想按照这个顺序让leader去执行这些写请求

55.10-55.14

and the zookeeper leader obeys that ordering right

ZooKeeper leader会遵循这个顺序



55.14-55.17

so this is particularly interesting due to these asynchronous write requests

So，我们对这些异步的写请求非常感兴趣

55.17-55.19

and for reads

对于读请求来说


55.19-55.25

this is a little more complicated

这会有点复杂

55.25-55.27

the read I said before

我之前说过读请求方面的东西



55.27-55.30

don't go through the writes all go through the leader 

所有的写请求都由leader来处理

55.30-55.32

the reads just go to some replicas 

读请求则由某些replica来处理


55.32-55.36

and so all they see is the stuff that happens to have made it to that replicas log

So，这些client所看到的就是replica上日志中的内容

55.36-55.42

the way we're supposed to think about the FIFO client order for reads

我们思考关于读请求方面的FIFO client order的方式是

55.42-55.46

 is that if the client issues a sequence of reads again in some order

如果client以某种顺序发起了一堆读请求



55.46-55.48

the client reads one thing and then another thing and then a third thing

这个client会先去读一个东西，再去读另一个东西，然后是再读一个东西



55.48 - 55.59

that relative to the log on the replicas talking to those clients reads

这些client的读请求和replica上的日志内容相关




55.59-56.01

 each have to occur at some particular point in the log

每个读请求会在日志中的某个点处发生

56.01-56.09

 or they need to sort of observe the state as it as the state existed at a particular point the log 

或者说它们需要观察日志中某个点处存在的状态

56.09-56.10

and furthermore

此外

56.10-56.16

 that the successive reads have to observe points that don't go backwards

对于连续的读请求，我们所观察到的日志点应该是一往直前的

56.16-56.19

 that is if a client issues one read and then another read

如果一个client发起了一个读请求，然后又发起了另一个读请求


56.19-56.21

 and the first read executes at this point in the log

第一个读请求在这个日志点执行

56.21-56.26

 the second read is that you know allowed to execute it the same or later points in the log

我们允许第二个读请求在同一个日志点或者是该日志中稍后的位置执行

56.26-56.29

but not allowed to see a previous state

但我们不允许它看到前一个状态

56.29-56.35

by issue one read and then another read，the second read has to see a state that's at least as up-to-date as the first state

接连发起两个读请求，第二个读请求看到的状态至少得是和第一个读请求看到的状态是一样新的



56.35-56.46

and that's a significant fact in that we're gonna harness when we're reasoning about how to write correct zookeeper applications 

这是一个重要的事实，当我们在思考如何编写一个正确的ZooKeeper应用程序时，会对此加以利用



56.46-56.49

and where this is especially exciting is

此处让我们兴奋的地方在于

56.49-56.52

that if the client is talking to one replica for a while

如果client与一个replica通信了一段时间


56.52-56.55

 and it issues some reads，suppose issue read here 

它发起了一些读请求，假设它在这里发起读请求

56.55-56.56

and then I read there

然后，我读取到这里的东西


56.56-56.58

 if this replica fails 

如果这个replica挂掉了

56.58-57.01

and the client needs to start sending its read to another replica

那么，这个client就需要将它的读请求发送给另一个replica



57.01-57.08

 that guaranteed this FIFO client order a guarantee still holds if the client switches to a new replica

如果client切换到一个新的replica，这依然保证持有的是FIFO client order



57.08-57.09

and so that means that

So，这就意味着


57.09-57.11

 if you know before a crash

在这个replica崩溃之前

57.11-57.12

 the client did a read

client发出了一个读请求

57.12-57.15

 that sort of saw state as of this point in the log

它看到了该日志点处的状态

57.15-57.18

 that means when the client switches to the new replicas 

这意味着，当client切换到新的replica时


57.19-57.21

if it issues another read 

如果它发起了另一个读请求

57.21-57.23

you know its previous read executed here

这是之前已经执行过的读请求



57.23-57.25

if a client issues another read

如果client发起了另一个读请求

57.25-57.29

 that read has to execute at this point or later even though it's switched replicas

读请求必须在这个时间点或者是这个时间点之后执行，尽管它切换到了不同的replica上（知秋注：对于某个特定数据来讲，随着时间的推进，它的状态可能发生变化，所以要设计一个版本号）



57.29 - 57.32

and you know the way this works is

这里的工作方式是


57.32-57.40

 that each of these log entries is tagged by the leader tags it with a Z X ID 

这里的每个日志条目都被leader用zxid打上了标签

57.40-57.42

which is basically just a entry number

简单来讲，就是个条目号（知秋注：可以认为就是该特定item的一个版本号）

57.42-57.46

whenever a replica responds to a client read request

当一个replica对一个client发起的读请求进行响应

57.46-57.49

 it you know executed the request at a particular point 

replica会在某个时间点执行这个读请求



57.49-57.55

and the replica responds with the zxid of the immediately preceding log entry back to the client 

replica会将前一个日志条目的zxid发送给这个client（知秋注：因为已经响应了，所以该读请求读到的数据相当于前一个日志条目了，相对于下一个读请求来说的）

57.55-58.00

the client remembers this was the zxid of the most recent data

client会记住这是最新数据的zxid

58.00-58.02

 you know is the highest zxid i've ever seen 

这是我目前见到的最新的zxid

58.02-58.08

and when the client sends a request to the same or a different replica 

当client将一个请求发送给同一个replica或者是不同的replica时

58.07-58.11

it accompanies their request with that highest zXID has ever seen

在请求中它会携带一个它目前看到的最新的zxid

58.11-58.13

and that tells this other replica aha

它会告诉其它replica

58.13-58.20

you know i need to respond to that request with data that's at least relative to this point in a log

replica需要对这个请求进行响应，它至少得将与该日志点相关的数据返回给发起请求的这个client



58.20-58.22

and that's interesting 

这很有趣



58.22-58.24

if this you know this replicas not up

如果这个replica不在线



58.24-58.27

 this second replica is even less up to date

这第二个replica上面的数据甚至都不是最新的

58.27-58.29

 yes was then received any of these

然后它收到了来自任意client中的请求



58.29-58.30

 but it receives a request from a client

它收到了来自一个client的一个请求


58.30-58.37

 the client  says oh gosh the last read I did executed this spot in the log in some other replica

该replica表示来自这个client的最后一个读请求在日志中这个地方被执行了

该replica表示，oh，天呐，我这个日志最后的这个点，client已经在其他replica中执行过了







58.36 - 58.43

this replica needs to wait until it's gotten the entire log up to this point before it's allowed to respond to the client 

在我们允许这个replica去响应这个client之前，replica需要等到它的整个日志进度到了这个点才行



58.43-58.47

and I'm not sure exactly how that works

我不确定它具体是如何工作的

58.47-58.50

 but either the replicas just delays responding to the read

但replica可能会延迟对这个读请求进行响应

58.50-58.52

 or maybe it rejects the read

或者，它也可能拒绝这个读请求

58.52-58.55

 and says look I just don't know the information talk to somebody else or talk to me later

并表示，我不知道该将这个信息告诉其他哪些人或者，你可以稍后和我通信


58.55-59.00

because eventually the you know this replica will catch up， if it's connected to the leader

因为如果这个replica和leader建立了联系，那么它最终会赶上leader的进度



59.00-59.02

 and then you will be able to respond

那么，你就能够被响应



59.02-59.04

okay 



59.04-59.05

so reads are ordered

So，读请求都是有序的

59.05-59.11

they only go forward in time or only go forward in sort of log order 

它们只会随着时间的流逝而往前执行，或者是根据日志顺序往前执行



59.11-59.14

and a further thing which I believe is true about reads and writes  is that 

关于读和写还有一点我相信是对的



59.14 - 59.22

the FIFO client order applies to all of a clients all of a single clients requests 

FIFO client order会应用于单个client的所有请求



59.22 - 59.24

so if I do a write from a client

So，如果我执行了一个client端的写请求

59.24-59.26

 and I send a write to the leader

我将这个写请求发送给leader

59.26-59.30

 it takes time before that write is sent out committed whatever 

在这个写请求被发送出去并提交前，这需要点时间




59.30-59.32

so I may send it write to the leader

So，我可能将这个写请求发送给这个leader

59.32-59.34

 the leader hasn't processed it or committed it yet

leader还没有对它进行处理或者提交


59.34-59.38

 and then I send a read to a replica

然后，我将一个读请求发送给了一个replica

59.38-59.42

 the read may have to stall you know in order to guarantee FIFO client order

为了保证FIFO client order，对于这个读请求的处理可能会延后处理



59.42 - 59.50

 the read may have to stall until this client has actually seen and executed the previous the client's previous write operation

这个读请求可能得等到直到这个client看到并执行完前一个写请求才行

59.50-59.54

 so that's a consequence of this FIFO client order

So，这就是FIFO client order所带来的影响

59.54-59.56

 is that reads rights are in the same order

读的顺序和写的顺序一致

59.57-1.00.00

 and you know the way the most obvious way to see this is

最显而易见去弄懂这个的方法是

1.00.00-1.00.06

 if a client writes a particular piece of data you know sends a write to the leader

如果一个client要写入一段数据，即对leader发起了一个写请求

1.00.06-1.00.08

 and then immediately does a read of the same piece of data

接着，立即读取同一段数据



01.00.08 - 01.00.09

 and sends that read to a replica boy it better see its own written value right 

即发送一个读请求给一个replica，最好能看到它刚才写入的那个值





1.00.13-1.00.16

if I write something to have value 17 and then I do a read

如果我将某个变量的值设为17，然后读取该变量的值



五十二  阅举报
08-04
1.00.17-1.00.18

and it doesn't have value 17

如果它的值并不是17

1.00.18-1.00.20

 then that's just bizarre 

那么这就很奇怪了



01.00.20 - 01.00.24

and it's evidence that gosh the system was not executing my requests in order

那么这就表明，这系统完全没按照顺序来执行我的请求

1.00.24-1.00.28

 because then it would have executed the write and then before the read 

因为它应该已经在执行读请求前，执行了写请求

因为它应该在执行读请求前，已经执行了写请求

01.00.28 - 01.00.31

so there must be some funny business with the replicas stalling

So，在replica停滞的时候，必然发生了一些有趣的事情



01.00.31 - 01.00.33

the client must when it sends a read and say

当client发送一个读请求，并表示



01.00.33 - 01.00.38

 look you know I the last write request I sent a leader with ZX ID something

我所发送给leader的这最后一个写请求中携带了zxid之类的信息

看，我（client）知道我（client）发送给leader的上一个写请求所携带该数据的zxid之类的信息

1.00.38-1.00.41

 in this replica has to wait till it sees that in the leader

这个replica必须等到它在leader中看到这个zxid才能执行该读请求

1.00.41-1.00.42

yes

请讲



1.00.53-1.00.55

oh absolutely

说得对



1.00.55-1..00.59

 so I think what you're observing is that a read from a replica may not see the latest data

我觉得你所观察到的是，对于replica所发送读请求来说，它看到的可能不是最新的数据


1.00.59-1.01.06

 so the leader may have sent out C to a majority of replicas and committed it 

So，leader可能会将C对外发送给多数派中的replica，并将它落地到日志

1.01.06-1.01.08

and the majority may have executed it 

多数派可能已经执行过它了

1.01.08-1.01.11

but if our replica that we're talking wasn't in that majority 

但如果我们所通信的那个replica并不在多数派中



01.01.11-1.11.13

maybe this replica doesn't have the latest data 

那么可能这个replica并没有最新的数据

1.01.13-1.01.16

and that just is the way zookeeper works 

这就是ZooKeeper的工作方式

1.01.16-1.01.20

and so it does not guarantee that read see the latest data

So，这就不保证读请求看到的是最新的数据了


01.01.20 - 01.01.25

 so if there there is a guarantee about readwrite ordering

So，如果这里保证了读写的顺序

1.01.25-1.01.27

but it's only per client 

但这只是对于每个client来说的

1.01.27-1.01.29

so if I send a write in

So，如果我发送了一个写请求

1.01.29-1.01.30

 and then I read that data 

然后，我读取了我刚写入的那个数据

1.01.30-1.01.35

the system guarantees that my read observes my write

系统会保证我的读请求看到我写请求刚才写入的值

1.01.35-1.01.36

 if you send a write in 

如果你发送了一个写请求

1.01.36-1.01.42

and then I read the data that you wrote， this isn't does not guarantee that I see your write

然后，我读取了你刚才写入的数据，这并不保证我看到了你的写请求



01.01.42-.01.52

that's like the foundation of how they get speed up for reads proportional to the number of replicas

这就是他们如何加快读取速度的基础了（即速度与replica的数量成正比）



01.02.00-1.02.01

but I would say the system isn't linearizable 

但我想说这个系统其实并不是linearizable的

1.02.01-1.02.06

and and but it is not that it has no properties 

Zookper没有linearizable的特性

1.02.06-1.02.12

then the rights writes are certainly many all right writes all rights writes from all clients form for?some one at a time sequence

多个客户端对同一数据对象发起写请求的话， Zookeeper对这些写请求的响应是有唯一顺序的



01.02.12-1.02.16

 so that's a sense in which the rights writes all rights are linearizable

So，这就会是这种场景，即所有的写请求都是线性化的



01.02.16 - 01.02.23

and each individual clients operations may be this means linearizable also

对于每个独立的client的操作可能也是线性化的

1.02.23-1.02.32

 it may you know this this probably means that each individual clients operations are linearizable 

这可能就意味着，每个独立的client的操作都是线性化的

1.02.32-1.02.33

well though I'm not quite sure

虽然我并不确定



01.02.46-1.02.49

 you know I'm actually not sure how it works

实际上我并不清楚它是如何工作的

1.02.49-1.02.51

 but that's a reasonable supposition

但这是一个合理的假设


01.02.51-1.02.53

 then when I send in an asynchronous write

接着，当我发送一个异步的写请求时

1.02.53-1.02.55

the system doesn't execute it yet

这个系统还没有执行它

1.02.55-1.03.02

 but it does reply to me saying yeah you know I got your write and here's this zxID that it will have if it's committed

但它确实会回复我说，我拿到了你的写请求，这是该写请求的zxid（如果该写请求已被提交了）



1.03.02-1.03.04

 I just like start return

我会将之返回并响应

1.03.04-1.03.05

 so that's a reasonable theory

So，它是一个合理的理论



1.03.05-1.03.06

I don't actually know how it does it

虽然实际上我并不清楚它是怎么做的



1.03.06-1.03.13

and then the client if it does read, needs to tell the replicas look you know last read I did

如果client端确实读取了数据的话，也需要通知replicas，我(client)已经读到最新数据了



1.03.21-1.03.22

I dont know

我不知道




01.03.30-1.03.32

you mean if I do a read

你指的是，如果我进行读请求的情况吗？



 of the data is of the operation





01.03.42 - 01.03.43

okay so if you send a read to a replica

Ok，So，如果你发送一个读请求给一个replica



01.03.43 - 01.03.45

the replicas in return, you

replica会对你进行响应


1.03.45-1.03.50

 that you know really it's a read from this table is what your no way notionally what the client thinks it's doing 

replica会从这张表中读取数据，你根本就无从知道client想要做什么




1.03.50-1.03.53

so you client says all I want to read this row from this table

So，client表示它所需要读取的数据都是在这张表的这一行中



01.03.53-1.04.01

 the server this replica sends back its current value for that table plus the zxid of the last operation that updated that table

这个replica会将该表中的当前值以及最后一次更新该表的操作的zxid返回给client




01.04.06 - 01.04.11

yeah so there's so actually I'm I'm not prepared to

So，实际上，我这里并没有准备


01.04.11 - 01.04.14

 so the the two things that would make sense 

So，这两个东西是有意义的

1.04.14-1.04.16

and I think either of them would be okay

我觉得用这两个中无论哪一个都是ok的

1.04.16-1.04.23

 is the server could track this yield for every table row the zxid of the last write operation that touched it

服务器是否可以跟踪每个表行数据操作的轨迹么

即我可以通过为表中每一行创建zxid来用于跟踪最近的写操作

1.04.23-1.04.34

 or it could just to all read requests returned the ZX ID as a last committed operation in its log regardless of whether that was the last operation of touch that row

或者不管所有读请求的发生时间，它可能返回最后一次操作的zxId

我所有的读请求所返回的zxid（最后一次提交的操作）都来自于它的log日志，该zxid所指的提交操作可以认为是我最后一次对该行进行的修改操作

1.04.34-1.04.38

because all we need to do is make sure that client requests move forward in the order 

因为我们所需要做的就是去确保client请求是按顺序向前执行的

1.04.38-1.04.47

so we just need something to return something that's greater than or equal to the writes that last touched the data that the client read 

所以我们只需要返回最新的写入数据就可以了

So，我们只需要返回client所要读的数据即可，它的读请求所携带的zxid大于或等于最后修改该数据的写操作的zxid

01.04.47-1.04.54

all right


1.04.54- 1.04.57

so these are the guarantees

So，这些就是ZooKeeper中的一些保证



1.04.57 - 01.05.05

 so you know we still left with a question of whether it's possible to do reasonable programming with this set of guarantees 

我们还是有些疑问的，通过这些保证护航，能写出理想的程序么

我们还有些疑问，基于这些保证，我们能写出符合规范的程序吗？

01.05.06 - 01.05.10

and the answer is well this you know at a high level this is not quite as good as linearizable 

答案是在高标准的要求下，做出来的成果物还是没有通过linearizable做出来的到位

答案是，Well，从高级层面来讲，它并不如linearizable来得好

01.05.10 - 01.05.12

it's a little bit harder to reason about 

这有点难解释



1.05.12-1.05.13

and there's sort of more gotchas 

这里还有很多坑

1.05.13-1.05.15

like reads can return stale data

比如，读请求可以拿到过时的数据

1.05.15-1.05.17

 just can't happen in a linearizable system 

这种情况是不可以在线性一致性系统中出现的

缺点是，Zookeeper存在一些不可能在linearizable系统中出现的问题，如读请求读到了就旧数据



01.05.17 - 01.05.29

but it's nevertheless good enough to do to make it pretty straightforward to reason about a lot of things you might want to do with zookeeper 

但是瑕不掩瑜，就拿Zookeeper的优点来说，它还是值得你去使用的



01.05.27 - 01.05.39

so there's a so I'm gonna try to construct an argument maybe by example of why this is not such a bad programming model 

在这里我举个例子，来说明为什么zookeeper是一个不错的编程模型



01.05.39 - 01.05.45

one reason by the way is that there's an out there's this operation called sync which is essentially a write operation 

顺便说下，这里有一个出口，我们把它称之为sink，本质上它就是个写操作

顺带说一下，这里有一个叫做sync的操作，本质上来讲，它就是为写操作保驾护航的

01.05.46 - 01.05.52

and if a client you know supposing I know that you recently wrote something you being a different client 

假设，你有一个不同的client要写入一些内容，即发起写请求



01.05.52 - 01.05.54

and I want to read what you wrote， so I actually want fresh data

然后我想要读取你写入的内容，实际上我想要的是最新的数据


01.05.54 - 01.06.01

I can send in one of these sync operations which is effectively 

我可以发送其中一个有效的sync操作（就是一个write操作）

我所发送的这些有效写操作都是基于同步进行的

01.06.03 - 01.06.06

 the sync operation makes its way through the system as if it were a write

sink作为一个写请求，同步操作会让它途径整个系统

整个过程中，sync操作会为写操作保驾护航（知秋注：即只要该数据在整个系统中处于写状态，是不允许其他client读的）

01.06.07 - 01.06.13

and you know finally showing up in the logs of the replicas that really at least the replicas that I'm talking to

最终记录在这个replicas日志中的，就是我要访问的数据

最终它会出现在replica的日志中，至少是这些写操作，我所通信的那些replica中的日志中

最终在我replica日志中所呈现的，至少是这些写操作

01.06.14 - 01.06.17

 and then I can come back and do a read and you know

接着我可能回读这条数据 （回读恰当么？）

待写操作完毕后，我就可以回过头来，进行一次读取

01.06.18 - 01.06.24

I can I can tell the replica basically don't serve this read until you've seen my last sync

我要告知replica，你看到我的sink后，才能响应后续的读请求

简单来讲，我会告诉这个replica，直到它看到我最后一个sync操作后，再去处理我的这个读请求

01.06.24 - 01.06.28

and that actually falls out naturally from fifo client order

如果这样sink实际上跳过了FIFO Client Order

实际上，这是从FIFO client order中自然而然得出的结论

01.06.29 - 01.06.36

 if we if we counter sync as a write， then FIFO client order says reads are required to see state 

如果我们要将写操作看成是sync操作，那么FIFO client order会说，我们需要让读请求看到这些状态



01.06.36 - 01.06.40

you know there's as least as up to date is the last write from that client 

这里所看到的状态至少得追上该clien所知道的最后一次写请求的状态版本号



01.06.40 - 01.06.41

and so if I send in a sync 

所以如果我发送sync请求

so 如果在该数据是写同步的期间

01.06.41 - 01.06.42

andI do read

我进行了一次读操作



1.06.42-1.06.50

 the system is obliged to give me data  that's at least up-to-date as where my sync fell in the log order

系统必须给我最新数据，至少得和我日志中sync操作所在的日志点的数据一样新



01.06.50 - 01.06.54

anyway if I need to read up-to-date data

总之，如果我需要读取最新的数据



1.06.54-1.06.55

 send in a sync，then do a read

发送写请求接着一个读请求

我得先发送sync请求，然后进行读取

01.06.55 - 01.07.02

and the read is guaranteed to see data as of the time the same was entered into the log 

我们保证读请求看到的数据是和记录到log日志中时的数据是一样的

1.07.02-1.07.04

so reasonably fresh 

这样很合理

So，这样数据就合理最新

01.07.05 - 01.07.06

so that's one out

So，这是其中一点

1.07.06-1.07.07

but it's an expensive one

但这也是代价最高的



01.07.07 - 01.07.13

because you now we converted a cheap read into the sync operation which burned up time on the leader 

因为我们将一个廉价的读操作转换为了sync操作，这很浪费leader的时间



01.07.13 - 01.07.16

so it's a no-no if you don't have to do 

如果你不这么做的话，那么就不可能是linearizable的



01.07.17 - 01.07.22

but here's a couple of examples of scenarios that the paper talks about 

但paper中谈论了两种场景



01.07.22 - 01.07.27

that the reasoning about them is simplified or reasonably simple given the rules that are here

根据此处的规则，这里已经简化了对这两种场景的阐述



01.07.27 - 01.07.32

 so first I want to talk about the trick in section 2.3 of with the ready file 

So，首先，我想谈论下section 2.3中的ready文件（ready znode）



01.07.32 - 01.07.39

where we assume there's some master and the Masters maintaining a configuration  in zookeeper  which is a bunch of files

假设，我们有一个master，master在ZooKeeper中维护了一个配置，它里面有一堆文件



01.07.39 - 01.07.47

 and zookeeper that describe you know something about our distributed system like the IP addresses of all the workers or who the master is or something 

ZooKeeper在里面描述了一些关于我们分布式系统中的东西，比如：所有worker的IP地址，或者是谁是master之类的信息



01.07.48 - 01.07.57

so we the master who's updating this configuration and maybe a bunch of readers that need to read the current configuration and need to see it every time it changes 

So，master会去更新这个配置，一些reader可能也需要去读取当前的配置，当配置改变的时候就去读一下配置



01.07.57 - 01.07.59

and so the question is you know can we construct something that

So，问题来了，我们能否构建出这样的东西



01.07.59 - 01.08.08

even though updating the configure even though the configuration is split across many files in zookeeper we can have the effect of an atomic update

由于配置文件在ZooKeeper上被分成了许多文件，那么我们就可以在它之上实现原子更新的效果



01.08.09 - 01.08.18

 so that workers don't see workers that look at the configuration， don't see a sort of partially updated configuration， but only a completely updated

对于查看该配置的worker来说，它们看不到更新过程中的配置，它们只能看到完全更新完之后的配置



01.08.19 - 01.08.21

that's a classic kind of thing

这是一个很经典的东西



1.08.21-1.08.28

that this configuration management that zookeeper people using zookeeper for

人们使用ZooKeeper来进行配置管理



01.08.27 - 01.08.33

 so you know looking at the so we're copying what section 2.3 describes  

So，这里我抄一下section 2.3中描述的内容



01.08.33 - 01.08.38

this will say the master is doing a bunch of writes to update the configuration

paper中表示，master进行了一大堆写操作，以此来更新配置


01.08.38 - 01.08.42

and here's the order that the master for our distributed system does the writes

这里是我们分布式系统中master进行写操作的顺序



01.08.43 - 01.08.46

first we're assuming there's some ready file a file named ready 

首先，假设我们有某个ready文件，这个文件的名字叫ready （知秋注：将每一个文件看作zoonkeeper管理的一个节点）

01.08.47 - 01.08.48

and if they're ready file exists

如果这个ready文件存在

1.08.48-1.08.51

 then the configuration is we're allowed to read the configuration

那么，这就允许我们去读取该配置



01.08.51 - 01.08.52

 if they're ready files missing

如果ready文件丢失了

1.08.52-1.08.55

 that means the configuration is being updated and we shouldn't look at it 

那这就意味着配置已经被更新了，我们应该看不到它



01.08.55 - 01.08.58

so if the master is gonna update the configuration file 

So，如果master要去更新配置文件


01.08.59 - 01.09.03

the very first thing it does is delete the ready file 

那首先它应该做的事情，就是删除ready文件


01.09.07 - 01.09.16

then it writes the various files very zookeeper files  that hold the data for the configuration might be a lot of files nodes

然后，它对ZooKeeper上各种文件进行写入操作，这些文件持有着配置信息，我们可能会大量的文件节点





01.09.16 - 01.09.19

 and then when it's completely updated， all the files that make up the configuration

接着，当更新完毕后，所有的文件就会组成配置




01.09.19 - 01.09.26

 then it creates again that's ready file

然后，它会再次创建一个ready文件



01.09.28 - 01.09.32

alright so so far the semantics are extremely straightforward

目前为止，这里的所写的语义都非常简单直接



01.09.33 - 01.09.34

 this is just writes there's only writes here, no reads

这里只有写操作，没有读操作



01.09.35 - 01.09.39

writes are guaranteed to execute in linear order 

我们保证是以线性化的顺序来执行这些写操作



01.09.39 - 01.09.43

and I guess now we have to appear the fifo client order

现在我们要看这个Client端所呈现的的FIFO顺序



01.09.44 - 01.09.46

 if the master sort of tags these as oh you know

如果master对这些操作打上标记


01.09.46 - 01.09.48

I want my writes to occur in this order

我想让我的写操作是以这个顺序执行的



01.09.48 - 01.09.54

then the leader is obliged to enter them into the replicated log in that order

那么，leader就会以这个顺序将它们录入副本日志




01.09.53 - 01.09.57

and so though you know the replicas were all dutifully execute these one at a time

replica会一次性执行这些写操作

1.09.57-1.09.59

 they'll all delete the ready file

它们都会将这些ready文件删掉




01.09.59 - 01.10.03

then apply this write and that write and then create the ready file again 

然后，执行第二个写操作，接着第三个写操作，然后再次创建ready文件



01.10.03 - 01.10.06

so these are writes, the orders straightforward

So，这就是整个写操作，它的执行顺序非常简单



01.10.08 - 01.10.14

for the reads though it's it's maybe a little bit  maybe a little more thinking as required

对于读来说，我们可能需要更多的思考


01.10.14- 01.10.17

 supposing we have some worker that needs to read the current configuration 

假设，我们有某个worker，它需要去读取当前配置



01.10.21 - 01.10.29

we're going to assume that this worker first checks to see whether the ready file exists

我们会假设，整个worker首先去检查这里是否存在ready文件





01.10.29 - 01.10.32

 it doesn't exist it's gonna you know sleep and try again

如果不存在ready文件，它就会sleep一下，然后再次尝试




01.10.33 - 01.10.34

so let's assume it does exist 

So，我们假设现在存在ready文件

1.10.34-1.10.45

let's assume we assume that the worker checks to see if the ready file exists after it's recreated

我们假设，当ready文件被重新创建后，worker会去检查ready文件是否存在





01.10.46 - 01.10.47

 and so you know what this means now

So，这里所意味的是

1.10.47-1.10.49

 these are all writes requests sent to the leader

左边这块是所有发送给leader的写请求

1.10.49-1.10.50

 this is a read request

右边这个是一个读请求



01.10.50 - 01.10.55

 that's just centrally whatever replica the clients talking to 

这里我不管client在与哪个replica进行通信




01.10.56 - 01.10.57

and then if it exists 

然后如果存在ready文件

1.10.57-1.11.2

you know it's gonna read f1 and f2 

然后，它会去读取f1和f2



01.11.05 - 01.11.10

that - the interesting thing that FIFO client order guarantees here is  that

这里FIFO client order所保证的有一点很有趣


01.11.10 - 01.11.16

 if this returned true 

如果，这里返回的是true



01.11.17 - 01.11.19

that is if the replica the client was talking to said yes that file exists

也就是说，如果client所通信的这个replica表示，该文件存在的话



01.11.20 - 01.11.24

then you know as were as that what that means is that

那这就意味着




01.11.24 - 01.11.33

at least with this setup is that as that replica that that replica had actually seen the recreate of the ready file

至少，这个replica实际上已经重建了这个ready文件




01.11.33 - 01.11.39

right in order for this exist to see to see the ready file exists

我们通过这个exists函数来检查ready文件是否存在






01.11.40 - 01.11.48

 and because successive read operations are required to  match along only forwards in the log and never backwards

因为我们需要让连续的读操作对日志中的条目只能向前进行匹配，并且不能向后匹配













01.11.47 - 01.11.49

 that means that 

这意味着












01.11.49 - 01.11.57

you know if the replicas the client was talking to  if it's log actually contained and then it executes this creative the ready file 

如果和client进行通信的这个replica的日志中包含了创建ready文件这条记录




01.11.58 - 01.12.07

that means that subsequent client reads must move  only forward in the sequence of writes  you know that the leader put into the log 

这意味，后面client的读操作，必须跟在leader日志中这些写操作顺序的后面









01.12.10 - 01.12.10

so if we saw this ready 

So，如果我们看到这个ready文件




01.12.11 - 01.12.17

that means that the read occurs that the replica excute to read down here somewhere  after the write that created the ready 

这就意味着replica所要执行的读操作是在创建完ready文件后，下面的某处进行的




01.12.18 - 01.12.21

and that means that the reads are guaranteed to observe the effects of these writes 

这就意味着，这些读操作保证能够看到这些写操作所写入的值



01.12.22 - 01.12.25

so we do actually get some benefit here some reasoning benefit from the fact 

So，实际上，我们确实从中得到了一些说得出的好处

01.12.25 - 01.12.27

that even though it's not fully linearizable

虽然这并不是完全线性化的



01.12.28 - 01.12.29

the writes are linearizable

写操作都是线性化的



01.12.30 - 01.12.34

 and the reads have to read sort of monotonically move forward in time to the log 

读操作只能沿着日志实时向前执行



01.12.34 - 01.12.37

yes

请问





01.12.49 - 01.12.51

yeah so that's a great question 

你的问题很好



01.12.52 - 01.12.53

so your question is well 

So，你的问题是

01.12.54 - 01.12.56

in all this client knows, you know 

在所有的client中


01.12.56 - 01.12.58

if this is the real scenario that the creators entered in the log

如果在真实场景中，首先创建了ready文件


01.12.58 - 01.13.04

and then the read arrives at the replica after that replica executed this create ready 

然后，读请求在创建ready文件后到达












01.13.04 - 01.13.05

then everything's straightforward 

那么这一切就会很简单



01.13.05 - 01.13.07

but there's other possibilities for how this stuff was interleaved

但对于这些东西该如何交错执行，还有其他一些可能的情况



01.13.08 - 01.13.13

so let's look at a much more troubling scenario

So，我们来看一个更为麻烦的场景



01.13.13 - 01.13.26

 so the scenario you brought up which I happen to be prepared to talk about is that

你之前刚问的场景，其实我准备了




01.13.26 - 01.13.34

yeah you know the the master at some point executed to a delete of ready 

在某个时间点，master执行了删除ready文件的操作




01.13.35 - 01.13.45

or you know way back in time some previous master this master created the ready file，you know after it finished updating the state

回到之前，在master更新完状态后，它创建了ready文件






01.13.44 - 01.13.46

 I say ready file existed for a while,

ready文件会存在一段时间

1.13.46-1.13.49

 then some new master or this master needs to change the configurations

然后，某个新的master，或者这个master需要去修改配置




01.13.50 - 01.13.51

 delete the ready file you know it does writes, right 

它会删除这个ready文件，并进行写入操作




01.13.56 - 01.13.58

and what's really troubling is that 

真正麻烦的事情在于

1.13.58-1.14.07

the client that needs to read this configuration might have called exists to see whether the ready file exists at this time

需要去读取该配置的client可能会调用exists函数来检查此时的ready文件是否存在



01.14.09-1.14.09

 all right 




01.14.12 - 01.14.14

and you know at this point in time yeah sure the ready file exists

正如你们看到的那样，此时我们确信这个ready文件是存在的


01.14.14 - 01.14.16

 then time passes 

随着时间的流逝

1.14.16-1.14.24

and the client issues the reads for the maybe the client reads the first file that makes up the configuration 

client发起了一个读请求，它想去读取组成该配置的第一个文件


01.14.24 - 01.14.26

but maybe it you know and then it reads the second file

然后，它读取了第二个文件



01.14.26 - 01.14.33

maybe this file this read comes totally after the master has been changing the configurations

可能这个读请求是在master已经修改完配置后到达的






01.14.33 - 01.14.39

 so now this reader has read this damaged mix of f1 from the old configuration

So，现在这个读请求已经读到的是旧配置中损坏的第一个文件，即f1


01.14.39 - 01.14.41

 and f2 from the new configuration 

并且它读到了新配置中的f2

01.14.41 - 01.14.46

there's no reason to believe that that's going to contain anything other than broken information

我们没有理由去相信，除了损坏信息以外，它还包含了其他东西





01.14.46 - 01.14.50

so so this first scenario was great the scenario is a disaster 

So，第一种场景很棒，它是一种灾难



01.14.52 - 01.14.57

and so now we're starting to get into question of like serious challenges 

So，现在我们面临了一个严峻的挑战

1.14.57-1.15.07

which a carefully designed API for coordination between machines in a distributed system might actually help us solve 

我们可以通过一个精心设计的用于分布式系统中机器间协调的API来帮助我们解决难题

01.15.07-1.15.07

right



01.15.07 - 01.15.09

because like for lab 3 

比如在lab 3中

1.15.09-1.15.11

you know you're gonna build a put get system 

你们会去构建一个put/get系统

1.15.11-1.15.14

and a simple lab 3 style put get system

对于lab 3中一个简单的put/get系统的实现来说


01.15.13 - 01.15.16

you know it would run into this problem too

它也会遇上这种问题

1.15.16-1.15.18

and just does not have any tools to deal with it

并且它没有任何工具去处理这个问题





01.15.18 - 01.15.23

but the zookeeper API actually is more clever than this and it can cope with it

但实际上，ZooKeeper API要比这个智能的多，它可以应对这个问题



01.15.25 - 01.15.26

and so what actually happens 

So，实际上这里发生了什么呢？

1.15.26-1.15.29

the way you would actually use Zookeeper is

实际上，你们使用ZooKeeper的方式是

1.15.29-1.15.34

 that when the client sent in this exists request to ask does this file exist 

当client发送exist请求来询问这个文件是否存在时




01.15.35 - 01.15.43

and would say not only does this file exist, but it would say you know tell me if it exists and set a watch on that file

它除了会告诉我们这个文件存在以外，它还会在这个文件上设置watch事件



01.15.44 - 01.15.49

which means if the files ever deleted, or if it doesn't exist, if it's ever created, 

这意味着，如果这个文件被删除，或者不存在，或者被创建

1.15.49-1.15.54

but in this case if it if it is ever deleted please send me a notification

但在这个例子中，如果它被删除了，那么请通知我一下



01.15.58 - 01.16.00

and furthermore 

此外

1.16.00-1.16.03

the notifications that zookeeper sends 

对于ZooKeeper所发送的通知来说


01.16.04 - 01.16.06

you know it's a the leader here  it's only talking to some replicas 

这里的leader只会和一些replica进行通信




01.16.04 - 01.16.09

this is all the replicas doing these things for it 

它会让所有的replica为它做这些事情




01.16.09 - 01.16.23

the replica guarantees to send a notification for some change to this ready file at the correct point  relative to the responses to the clients reads

replica保证，当对ready文件进行修改后，它会在正确的时间点发送通知来告诉相关的client的读请求

replica会保证，当ready文件发生改变时，它会在一个相对正确的时间点发送一个通知给client端，即在client再次发送读请求需要响应时候



01.16.25 - 01.16.26

and so what that means

So，这意味着什么呢？




01.16.32 - 01.16.34

so you know because that the implication of that is that 

因为这意味着




01.16.34 - 01.16.35

in this scenario

在这种情况下

1.16.35-.16.41

in which you know these these writes sort of fit in here in real time

如图所示，这些写请求的实时顺序是这样的



01.16.41 - 01.16.43

the guarantee is that

这里所保证的是

1.16.43-1.16.45

 if you ask for a watch on something

如果你对某个东西设置了watch事件

1.16.45-1.16.46

 and then you issue some reads 

然后，你发起了一些读请求



01.16.46 - 01.16.55

if that replica you're talking to execute something that should trigger the watch in during your sequence of reads 

如果你所通信的那个replica在执行你读请求序列的时候，执行了某条命令，它应该触发这里的watch事件


01.16.55 - 01.17.03

then the replica guarantees to deliver the notification about the watch before it responds to any read 

该replica保证，在它响应任何读请求之前，它会先将这个watch通知发送给client




01.17.03 - 01.17.13 ！！！！！！

that came that you know saw the log after the point of the OP where the operation that triggered the watch notification executed 

接下来你会看到，在某一个操作触发watch通知执行后的log

接下来你会从日志中看到，在某一个请求操作所触发的watch通知操作的执行记录（知秋注：它在请求操作记录日志点之后）


01.17.14 - 01.17.16

and so this is the log on the replica 

So，这就是replica上的日志



01.17.16 - 01.17.18

and so you know if the so that




01.17.19 - 01.17.23

you know the FIFO client ordering will say you know 

对于FIFO client order

1.17.23-1.17.25

each client requests must fit somewhere into the log apparently

显然，每个client请求必须放在日志中合适的位置




01.17.25 - 01.17.27

these fit in here in the log

它们会放在日志中这个位置

1.17.27-1.17.31

 what we're worried about is that this read occurs here in the log

我们所担心的是，这个读操作是发生在日志中这个位置




01.17.30 - 01.17.31

 but we set up this watch

但这里我们设置了watch为true



01.17.32 - 01.17.38

and the guarantee is that will receive the note if if somebody deletes this file and we can notified 

这保证了，如果有人删除了这个文件，那它就会通知我们



01.17.38 - 01.17.48

then that notification will will appear at the client  before a read that yields anything subsequently in the log

然后，在读取任何日志中的信息之前，client处就会优先接收到这个通知



01.17.48 - 01.17.50

 we will get the notification before we get the results of any read，

我们在得到任何读请求结果之前会先得到这个通知






01.17.50 - 01.17.56

that's that saw something in log after the operation that produced the notification

并且我们读到任何结果之前，我们就会在日志中看到某些东西

即我们会在日志中该读操作之后看到所产生的通知操作








01.17.57 - 01.18.01

 so what this means that the delete ready is gonna since we have a watch on the ready file

因为我们在ready文件上设置了watch





01.18.01 - 01.18.03

 that delete ready is going to generate a notification 

那么，删除ready文件这个操作就会生成一个通知




01.18.05 - 01.18.10

and that notification is guaranteed to be delivered before the read result of f2

我们保证在读出f2的结果之前，该通知就会送到client手上




01.18.10 - 01.18.13

if f2 was gonna see this second write

如果f2看到了这第二个写操作



01.18.13 - 01.18.14

and that means that

这意味着

1.18.14-1.18.19

 before the reading client has finished the sequence in which it looks at the configuration

在replica执行完查看该配置的读请求序列前

f2这个写操作必须在正在进行读请求的client

正在进行读请求的client必须在f2这个写操作结束之后才能执行


01.18.19 - 01.18.42

 it's guaranteed to see the watch notification before it sees the results of any write that happened after this delete that triggered the notification who generates the watch, as well 

我们保证它会在看到任何写操作的结果之前（删除ready文件会触发通知），看到这个watch通知




01.18.42 - 01.18.44

the replica let's say the client is talking to this replica

假设这个client和这个replica进行通信



01.18.43 - 01.18.50

 and it sends in the exists request the exist request has a read only request it sends with his replica

它发送了一个exists请求给replica（该请求是一个只读请求）




01.18.50 - 01.18.53

the replica is being painting on the side a table of watches saying

这个replica就会在旁边弄一张watch table，并表示

1.18.53-1.18.57

 oh you know such-and-such a client asked for a watch on this file 

有一个client要求在这个文件上设置watch通知


01.18.58 - 01.18.59

and furthermore 

此外

1.18.59-1.19.03

the watch was established at a particular ZXID that is did a read

这个watch会为这个读请求建立一个专门的zxid



1.19.3-1.19.07

 that client did a read with the replica  executed the read at this point in the log

然后，client端在做读操作的时候，就可以根据这个zxid在日志的这个点处执行读请求

01.19.07 - 01.19.09

and return results are relative to this point in the log 

并返回和该日志点相关的结果


01.19.09 - 01.19.14

remembers that watch is relative to that point in the log 

它会记住这个watch是和这个日志点相关的



01.19.14 - 01.19.16

and then if a delete comes in 

然后，如果来了一个删除操作

1.19.16-1.19.20

you know for every operation that there s executed 

对于这里执行的每个操作来说




01.19.20 - 01.19.21

so it looks in this little table it says aha

replica会去查看这个watch table，并表示



01.19.21 - 01.19.25

you know the a there was a watch on that file

在这个文件上，有人设置了watch通知

1.19.25-1.19.28

 and maybe it's indexed by hash of filename or something

这个文件可能是通过文件名进行hash索引的

01.19.37 - 01.19.39

okay so the question is oh yeah this

So，她的问题是


01.19.39 - 01.19.41

this replica has to have a watch table

这个replica必须有个watch table




01.19.41 - 01.19.45

you know if the replica crashes 

如果replica崩溃了




01.19.46 - 01.19.48

and the client is switch to different replica

那么client就会切换到一个不同的replica



01.19.48 - 01.19.49

you know what about the watch table

那watch table该怎么办呢？



01.19.50 - 01.19.52

right it's already established these watch

它上面已经建立了watch通知

1678

01.19.51 - 01.19.52

 and the answer to that is that no

这里的答案是No


1.19.53-1.19.56

if your replica crashes

如果你的replica崩溃了

1.19.56-1.19.59

the new replica you switch to won't have the watch table

你所切换到的新的replica中就不会有这个watch table

1.19.59-1.20.06

 and but the client gets a notification at the appropriate point in in the stream of responses it gets back

但client会在它所拿到的响应流中合适的地方得到一个通知

1.20.06-1.20.10

saying oops your replica you were talking to you crashed 

该通知表示我们所通信的那个replica崩溃了（也会携带一个zxid给client）

1.20.10-1.20.14

and so the client then knows it has to completely reset up everything

So，接着，client就知道这个replica不得不将所有东西重置

1.20.14-1.20.20

 and so tucked away in in the examples are missing event handlers 

So，在例子中所隐藏缺少的就是event handler

1.20.20-1.20.26

to say oh gosh you know we need to go back and we establish everything if we get a notification that our replicas crashed

这些handler会表示，如果我们得到了一个通知，即我们的replica都崩溃了，那我们这些replica需要回过头去，重新建立所有东西



01.20.26 - 01.20.31

all right I'll continue this

下节课再见



五十三  阅举报
