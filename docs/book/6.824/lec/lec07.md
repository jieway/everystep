07-01

0-0.09

let's imagine three servers with logs that looked like this

我们来想象下这样一个场景，这里有三台服务器以及它们所对应的日志

0.09-0.16

where the numbers I'm writing are the term numbers of the command that's in that log entry 

这里我所写的数字是日志条目中，服务器所接收到的命令所在的term号

0.16-0.19

so we don't really care what the actual commands are

So，我们并不在意这些命令实际是什么东西


0.19-0.22

 then I got a number the log slots

接着，我要对这些日志slot进行编号

0.22-0.39

and so let's imagine that the presumably the the next term is term six

So，假设下一个term是term 6

0.39-0.42

although you can't actually tell that from looking the evidence on the board

尽管你们没法根据黑板上所写的东西来看出下一个term是term 6

0.42-0.44

but it must be at least six or greater

但它确实至少得是term 6或者更大的term号

0.44-0.50

let's imagine that server s3 is chosen as the leader for term six

假设，服务器3被选中作为term 6中的leader

0.50-0.53

and at some point

在某一时刻

0.53-0.57

 s3 the new leader is going to want to send out a new log entry

服务器3作为新的leader而言，它想对外发送一个新的日志条目

0.57-1.02

 so let's suppose it wants to send out its first log entry for term six 

So，我们假设，s3想在term 6的时候，对外发送它的第一个日志条目

1.02-1.11

so we're sort of thinking about the append entries RPC that the leader is going to send out to carry the first log entry for term six

So，我们来思考下leader对外发送的AppendEntries RPC，它里面包含了term 6中第一条日志条目


1.11-1.13

 really should be under slot thirteen

它应该是位于slot 13下的

1.13-1.16

the rules in Figure two say 

Figure 2中的规则表示

1.16-1.26

that append entries rpc actually as  well as the command that the client sent in to the leader that we want to replicate on the logs of all the followers 

AppendEntries RPC 实际上不仅是用来发送从Client发送给Leader的命令，也可以用来让follower进行日志的统一


1.26-1.43

there's this append entries RPC also contains this previous log index field and a previous log term field

该AppendEntries RPC中也包含了prevLogIndex字段，以及prevLogterm字段

1.43-1.45

 and when we're sending out AppendEntries 

当我们对外发送AppendEntries时

1.45-1.47

for where this is the first entry

这里是term 6中第一个日志条目

1.47-1.55

leader's supposed to put information about the previous slot the slot before the new information sending out

在新的信息对外发送出去之前，leader应该会将前一个slot中的信息也放进去


1.55-1.59

so in this case the log index of the previous entry is 12 

So，在这个例子中，prevLogIndex(前一个条目的日志索引)是12



1.59-2.10

and the term of the command in the leaders log for the previous entry is 5

prevLogTerm(在leader日志中的前一个条目里的命令当时所属term)是5



2.10-2.12

so sends out this information to the followers

So，leader将这些信息发送给这些follower

2.12-2.19

and the followers before they accept a upend Append entries are supposed to check

follower在它们收到(接受)AppendEntries之前(复制日志条目之前)，它们会先去进行检查

2.19-2.25

you know they know they've received an append entries that for some log entries that start here

follower所接收的新的AppendEntries的日志条目在这（slot13下）


2.25-2.27

and the first thing they do is

它们首先要做的事情是

2.27-2.36

check that receiving followers check that their previous log entry matches the previous information that the leader sent out 

follower要去检查它们日志中接收的前一个日志条目和leader所发送的信息是否匹配(S2的slot12的信息(term4,接收的命令)是否与S3的slot12的(term5,发送的命令)是否匹配)

2.36-2.38

so for a server 2

So，对于服务器2来说

2.38-2.40

of course it doesn't match

当然，它里面的前一个日志条目和leader所发送的信息并不匹配


2.40-2.43

 the server 2 has a entry here all right

服务器2这里有一个日志条目

2.43-2.45

 but it's an entry from term 4 not from term 5

但这个条目是在term 4时所拿到的，并不是term 5时拿到的

2.45-2.49

and so the server twos going to reject this append entries

So，服务器2就会拒绝掉这个AppendEntries

2.49-2.52

 and sort of send a false reply back leader

并且，它会回复一个false给leader


2.52-2.55

and server one doesn't even have anything here 

服务器1这里（slot 12）甚至啥也没有

2.55-3.00

so server ones gonna also reject the append entries in the leader 

So，服务器1也会去拒绝来自leader的AppendEntries

3.00-3.03

and so far so good right

到目前为止，这一切都很好

3.03-3.07

the terrible thing that has been averted at this point is 

服务器2的处理避免了糟糕状况的发生

3.07-3.10

you know the bad thing we absolutely don't want to see is

正如你们知道的那样，我们绝对不想看到的糟糕的事情就是

3.10-3.13

that server two actually stuck the new log entry in here

服务器2把新的日志条目贴到slot13

3.13-3.23

which would break sort of inductive proofs essentially that the figure 2 scheme relies on 

这会在基本上打破了论文figure2的概要所立足的归纳的证明




3.23-3.28

and hide the fact that server two actually had a different log 

并隐藏服务器2实际上所拥有的是一个不同的日志的这个事实

3.28-3.31

so instead of accepting log entry, server two rejects this RPC

So，服务器2会拒绝该RPC请求，而不是去接收这个日志条目

3.31-3.35

 the leader sees is two rejections

leader会看到它被拒绝了两次

3.35-3.40

 and leader is maintaining this next index field one for each follower 

leader会为每个follower维护nextIndex字段


3.40-3.47

so it has a next index for server two 

So，leader保存了服务器2的nextIndex属性

3.47-3.53

and the leader has a next index for server one

它也保存了服务器1的nextIndex属性

3.53-3.56

presumably if the should have said this before

想必，我之前应该说过

3.56-4.00

if the server sending out information about slot thirteen here

如果服务器3对外发送此处slot 13的相关信息


4.00-4.10

that must mean that the server's next index is for both of these other servers this started out as thirteen

这就必然意味着，其他服务器的nextIndex是从slot 13开始的


4.10-4.14

and that would be the case at the server if this leader had just restarted

我们所遇到的就会是这种情况，即如果leader刚重启完的情况

4.14-4.15 ！！！！！

because the figure two rules say 

因为Figure 2中的规则表示

4.15-4.18

that next index starts out at the end of the new leaders log 

nextIndex会从新的leader日志的末尾开始计数

4.18-4.23

and so in response to errors

So，为了去对错误进行响应





4.23-4.27

the leaders supposed to decrement its next index field

leader应该对它的nextIndex字段中的值进行减一



4.27-4.35

 so it does that for both got errors from both decreasement Calvin resends

So，它也得将出错的服务器1和2的nextIndex变为12，并重新发送日志


4.35-4.41

and this time the server is going to send out append entries with previous log index equals 11

此时，服务器3会对外发送AppendEntries，里面包含了prevLogIndex，它的值为11

4.41-4.45

and previous log term equals 3 

以及prevLogTerm，它的值为3


4.45-4.52

and this new append entries has a different previous log index

这个新的AppendEntries所拥有的是一个不同的prevLogIndex

（手为什么要指S1的slot11啊，也没S1的事儿啊）

4.52--4.57

but it's the content in the log entries that the server is going to send out 

但此时，这个AppendEntries包含了服务器所要对外发送的日志条目中的内容

4.57-5.04

this time include you know all the entries after that the new previous log index is sending out 

此时，这里面也包括了这个新的prevLogIndex（这里的index是12）后面的所有日志条目（这里的是13）

这次，S3要发送的是新的prevLogIndex11及后面所有的日志条目

 



5.04-5.09

so server 2 now the previous log index 11

So，服务器2现在的prevLogIndex是11

5.09-5.12

 it looks there and it sees a ha you know the term is 3 

可以看到slot 11上，服务器2所接收到的是来自term 3的AppendEntries

5.12 - 5.14

same as what the leader is sending me 

这和leader所发送给我(服务器2)的相同

5.14-5.17

so server 2 is actually going to accept this append entries 

So，实际上，服务器2会去接受这个AppendEntries

05.17 - 05.20

and figure 2 rules say 

paper中的figure 2里的规则表示

5.20-5.27

oh if you accept AppendEntries we supposed to delete everything in your log after where the append entry starts and replace it with whatever's in the append entries

如果服务器2接受Leader所发的AppendEntries，那么就应该删除服务器2中对应AppendEntry为起点（entries[prevLogIndex])后的所有内容并将后续内容替换为Leader发过来的AppendEntries





05.28 - 05.35

so server two is going to do that now it's here just went to 5 6 

So，服务器2现在会去做这种操作，将它的slot 12和13中的值变为5和6

05.35 - 05.38

server 1 still has a problem cuz it has nothing at slot 11

服务器1依然存在这问题，因为在slot 11上它并没有任何东西

05.38 - 05.41

it may would return another error

它可能会返回另一种错误

05.41 - 05.50

 the server will now backup its server 1, next index to 11

现在，leader会将服务器1的nextIndex备份为11

05.50 - 05.53

 it'll send out its log starting here with the previous index and term referring now to this slot

并且，leader会将日志所开始的地方（slot10），即指向该slot（slot 10）的prevLogIndex和term号一起发出去


05.54 - 6.02

 and this one's actually acceptable server 1, it'll adopt it'll accept the new log entries 

实际上此处slot 10中的3对于服务器1来说是可以接受的，并且它将接受新的日志条目



06.02 - 06.06

and send a positive response back to the server and now they're all

接着，服务器1会发送一个肯定的响应给leader

06.07 - 06.12

now they're all caught up 

现在，这些服务器就赶上了进度

06.14 - 06.17

presumably the server also when it sees that followers accepted AppendeEntries  that had a certain number of log entries

当leader看到所有的follower接受了AppendEntries，AppendEntries中包含了一定数量的日志条目 （知秋注：此时13已经被followers接受完毕）


06.23 - 06.26

 it actually increments this next index could be 14

此时，leader会将这里的nextIndex增加为14

（问题：同一时点更新为14的用意是什么？）

06.28 - 06.31

alright so the net effect of all this backing up is that

这种备份机制的好处在于

06.31 - 06.36

the server has used a backup mechanism to detect the point at which the followers logs started to be equal to this servers 

服务器使用了一种备份机制来检测follower日志并保证从一开始就等于leader上所保存的日志



06.40 - 06.46 （回看05.50 - 05.53）

and then sent each of the followers starting from that point that a complete remains of the server's log

接着，leader会向每个follower发送以它们各自prevLogIndex为起点的服务器日志的剩余完整部分（知秋注：即将nextIndex数组内容补在follower的日志后面，以做到follower和leader日志一致）



06.47 - 06.50

after that last point at which they were equal

在此之后，它们上面的日志就相同了

06.50 - 07.01

any questions all right

有什么问题么



07.01 - 07.07

just to repeat discussion we've had before and we'll probably have again 

这里要重复下我们之前的讨论，我们可能以后会再次遇到那种情况



07.08 - 07.10

you notice that we erased some log entries here

你们可以注意到，我们这里擦除了某些日志条目



07.10 - 07.14

which are now su erase that  I forget what they were 4 & 5 

这里我之前擦掉了某些日志条目，我忘了它们是啥，Oh，原来是4和5


07.15 - 07.21

so there were some well actually that was mostly remember we erased this log entry here

还记得，我们擦掉的是这里的日志条目


07.21 - 07.24

this used to say four um server two 

服务器2这里应该是4


07.24 - 07.29

the question is why was it ok for the system to forget about this client command

这里的问题是，对于系统来说，为什么将这个client端的命令丢掉是ok的呢？

07.29 - 07.34

right this thing we erased corresponds to some client command which are now throwing away

此处我们所擦掉的东西对应了现在被丢掉的某个Client端的命令

07.34 - 07.39

 I talked about this yesterday what's the rationale here

我昨天的时候讨论过此处的原理



07.42 - 07.51（请回顾6-04，1.06.19-1.06.26）

yeah so it's not a majority of the servers and therefore whatever previous leader it was 

who sent this out couldn't have gotten acknowledgments from a majority of servers 

少数派服务器所在分区中，无论是哪个term的leader对外发送的AppendEntries，都不会得到来自多数派分区服务器们的确认（网络割裂了）



07.51 - 07.55

therefore that previous leader couldn't have decided it was committed

因此，前一个leader并不能决定这个Clien端的命令是否被提交了

07.55 - 07.58

couldn't have executed it and applied it to the application state

也不能去执行它，更不能将它提交到应用状态上

07.58 - 08.01

could never have sent a positive reply back to the client 

也永远不会发送一个肯定的回复给Client端（指日志落地）

08.00 - 08.05

so because this isn't done a majority of servers we know that

因为多数派服务器没有提交Client这个命令，

08.05 - 08.08

the client who send in and has no reason to believe it was executed

couldn't have gotten a reply

Client得不到响应, 就没有理由去相信这条命令已经被（leader）执行了



08.08 - 08.11

 because one of the rules is 

因为其中一条规则是这样的

08.11 - 08.16

the server only sends over the leader only sends a reply to a client after it commits and executes

只有leader提交并执行了该命令后，它才会对Client进行回复


08.17- 08.22

so the client had no reason to believe it was even received by any server 

所以，Client端没有理由去相信这条命令请求被任何服务器接收

08.22 - 08.28

and then and the rules of figure 2 basically say the

client if he gets no response after a while it supposed to resend the request

Figure2中大体的意思表明 Client端如果没有接收到响应，应该在一段时间后再次发送请求





08.28 - 08.29

so we know whatever request this was it threw away 

所以我们知道了无论是什么请求，只要没有收到响应都会被丢弃掉

08.29 - 08.38

we've never executed never included in any state already and the clients gonna resend it by-and-by 

Leader从来没有执行它，没有包含在任何state中，过一会儿Client端将重新发送这个请求



08.39

yes

请问



08.58 - 09.04

well it's always deleting suffix of the followers log 

Raft总是会删除followers后面的log(follower的log条目与leader的相同为起点，follower后面的log都会删除 )



09.04 - 09.12

I mean in the end the sort of backup answer to this is that the leader has a complete log 

最后这个问题的备用答案是，leader有一份完整的log



09.13 - 09.17

so all its fails it can just send us complete log to the follower 

如果没有与任何leader log条目匹配的话，Leader会把完整的log条目发送给这个follower



09.18- 09.23

and indeed if you know if you've just started up the system and something very strange happened even at the very beginning 

如果你启动了系统，但在启动一开始的时候发生了一些非常奇怪的事情

09.24 - 09.28

then you may end up actually you know maybe in some of the tests for lab two 

实际上在lab two的某些测试中，你可能最终，

09.28 - 09.30

you may end up backing up to the very first entry

你可能最终会备份到非常早的日志项

你可能最终要从最初的第一条日志项开始备份

09.30 - 09.32

and then having the leader essentially send the whole log

那么，就会让leader完整地发送整个日志



09.33 - 09.35

 but because the leader has this whole log we know it could sort of

正是因为leader有完整的日志



09.35 - 09.40

it's got all the information that's required to fill everybody's logs if it needs to

如果有需要的话，leader会把所有必要的日志信息都填充到各个follower的日志中



09.49 - 09.52

okay all right 



9.52-9.53

so in this example

So，在这个例子中

9.53-9.55

which I guess are now erased 

我想这边的东西刚刚被我擦了

09.54 - 09.59

we elected s3 as the leader 

我们这里选服务器3作为leader




09.59 - 10.01

and the question is 

我的问题是

10.01-10.06

could we you know who can we who are we allowed to elect this leader

谁允许我们选出了这个leader

10.06 - 10.08

right cool

不错, 没人上钩



10.08 - 10.13

you know that all right if you read the paper you know the answer is not just only one 

如果你们读过paper就会知道，答案并不是唯一的

10.13 - 10.17

it turns out it matters a lot for the correctness the correctness of the system 

事实证明，系统的正确性非常重要

10.17 - 10.20

that we don't allow just anyone to be the leader  

我们不允许任何服务器轻易地成为leader

10.21 - 10.21

like, for example 

例如

10.21-10.27

the first node whose timer goes off may in fact not be an acceptable leader

当第一个节点的选举计时器结束计时，实际上它并不是一个可被接受的leader

不会是一个可被接受的leader

10.27 - 10.33

and so it turns out raft has some rules that applies about  oh yes, you can be leader or you can't be leader 

So，raft中有一些规则，该规则会决定你是否能成为leader



10.34 - 10.36

and to see why this is true

来看下这为什么是对的

来看看它在什么情况下可以成为一个leader

10.36-10.40

 let's sort of set up a strawman proposal that 

让我们先简单设定一个草案

10.41 - 10.48

maybe raft should accept should use the server with the longest log as the leader 

raft可能会使用拥有最长日志的那个服务器作为leader



10.48 - 10.49

right?

没人反对吧？

10.49-10.51

you know some alternate universe that could be true 

如果是在平行宇宙中，这种想法可能是成立的。

（通过参照平行宇宙中已发生的事情，来推测事情的经过）

你知道，如果这是在一些其他系统的备用机制中，这可能是正确的

10.50 - 10.55

and it is actually true in systems with different designs just not in raft 

即，在具备不同设计的系统中而言（在其他设计系统中），是对的，但对于Raft来说，并不正确



10.56 - 10.58

so the question we're investigating is

So，我们正在研究的问题是

10.59 - 11.08

why not use the server longest log as leader

为什么不使用拥有最长日志的那个服务器作为leader呢？

11.09 - 11.14

and this would involve changing the voting rules in raft 

这就会涉及到要修改raft中的投票规则了

11.15 - 11.18

have a voters only vote for nodes that have longer logs

即让投票者只投票给拥有更长日志的服务器

11.18 - 11.24

all right, so the example that's going to be convenient for showing why this is a bad idea 

下面这个例子能很方便的展示，为什么这个想法是行不通的

11.24 - 11.26

so let's imagine we have three servers again 

假设这有3台服务器

11.28 - 11.35

and now the log set setups are server one has entries for terms five six and seven 

服务器1有term5、6、7对应的log条目




11.38 - 11.44

server two four five and eight, and server three also for five and eight 

服务器2和服务器3有term 5、8 对应的log条目




11.45 - 11.54

that's the first question, of course to avoid spending our time scratching our heads about utter

nonsense is to make sure that 

第一个问题， 为节省时间，我们就不凭空臆测了。



11.54 - 11.57

convince ourselves that this configuration could actually arise 

你就当这种日志排列状况是实际存在的



11.57 - 11.58

because if it couldn't possibly arise 

如果它不可能存在



11.59 - 12.02

then may be a waste of time to figure out what would happen if it did arise

那么我们可能就要好好想想，如果它存在的话，后面会发生什么



12.03 - 12.12

so anybody wanna propose a sequence of events whereby this set of logs could have arisen 

有同学想要提出一些事件，来验证这种日志排列状况是实际存在的么?



12.12 - 12.18

how about an argument that it couldn't have arisen 

不可能发生的论点是怎样的



12.18 - 12.26

oh yeah okay so



12.27 - 12.29

well maybe we'll back up sometime

也许，我们将在某个时间备份log

12.31 - 12.37

all right so server one wins is wins the election at this point and it's in term six

服务器1在这个点赢得了选举，会变成term6




12.40 - 12.45

 sends out yeah it receives a client request sends out the first append entries 

服务器1接收到的一个client端请求，发送出term6的第一个AppendEntries

12.45 - 12.56

and then that's fine actually everything's fine so far nothing's wrong

实际上是可以好的，到目前为止，这些都是没有任何问题的



12.56 - 13.01

all right well a good bet for all these things is then it crashes right 

巧了，然后服务器1崩溃了，

13.01 - 13.04

or it receives the client requests in term six

或者服务器1在term6接收到了Client端的请求

13.04 - 13.08

it appends the client requests to its own log which it does first 

它会先把Client端的请求添加到本地log中



13.08 - 13.10

and it's about to send out append entries but it crashes

然后服务器1要发送AppendEntries时，巧了它崩溃了



13.10 - 13.13

 yes it didn't send out any append entries

它不可能发送出任何AppendEntries了



13.13 - 13.20

 and then you know we need then

it crashes and restarts very quickly there's a new election and gosh server one is elected again 

然后我们让服务器1飞速重启、发起选举，并且再一次的被选为Leader



13.20 - 13.29

as the as the new

leader it receives in term seven and receives a client request appends it to its log 

and then it crashes 

作为新leader，服务器1在term7期间接收到了client端的请求并添加到了本地log，然后哎呀它又崩溃了






13.33- 13.39

right and then after after a crashes we have a new election maybe server 2 gets elected this time 

在leader崩溃后，我们又有了一次选举，也许这次服务器2赢得了选举



13.40 - 13.42

maybe server 1 is down now so

也许服务器1宕机了，

13.42 - 13.52

off the table if server 2 is elected at this point, suppose server 1 is still dead what term is server what server two venues

如果服务器2赢得选举在这个点，假定服务器1仍然是宕机，服务器2是哪个term的leader？



13.56 - 14.02

yeah eight's the right answer so why

eight and not remember this you know this is now gone why eight and not six

是的，term8是正确的。服务器1都宕机了，那么为什么是8？不是6呢？



14.07 - 14.12

that's absolutely right, so not written on the board but in order for server one to have been elected here 

完全正确，让服务器1赢得选举的，其他服务器的投票信息没有写在黑板上。



14.12 - 14.18

it must have votes from majority of nodes which include at least one of server two, server three 

服务器1必须要获得majority（大多数节点）的选票，最少要再取得服务器2或服务器3的。

14.18 - 14.23

if you look at the vote request, code and figure two 

如果你看了VoteRequest的代码或者论文中的Figure2就会知道

14.23 - 14.30

if you vote for somebody you're you're supposed to

record the term in persistent storage

如果你给某些人投票， 你就应该将竞选的term记录到当currentTerm中



14.30 - 14.35

and that means that either server 2 or server 3 are both new about term six

and in fact term seven 

意味着服务器2或服务器3都会记录term6，term7的投票信息



14.35 - 14.40

and therefore when sever one dies and they cannot connect the new leader， 

因此，当服务器1宕机时，服务器2和服务器3无法联系到这个新leader，（因为要选举，所以会给老的leader发请求）

14.40-14.43

at least one of them knows that the current term was eight

但至少它们中的一个知道，当前的term应该是8 （注：老师口误了term应该是7）



14.44 - 14.50

if that one and only that one actually if there's only one of them only that one could win an election

实际上也只有服务器2和服务器3中的一个才能赢得选举



14.50 - 14.54

 because it has the higher terminal birth they both know about term eight sorry if they both know about term seven

因为它们知道日志条目中最后一个term值，term8，我说错了，如果服务器2和3都知道现在term的值是7



14.54 - 14.58

 then they'll both and either one of them will try to be leader and term eight

然后他们都会用term8来发起选举



14.58 - 15.06

 so that fact of that the

next term must be term made this， is ensured by the property of the majorities must overlap 

下一个term必须由此来得到，即该次选举term由参与了上一个term中投票的那个服务器来确定



15.06 - 15.14

and the fact that current term is updated by vote request and is persistent and guarantee did not be lost even if there were some crashes here

事实是，当前的term被VoteRequest更新（term+1），并且持久化保证不会丢失，哪怕这里会出现某些崩溃。



15.14, - 15.15

so the next term is going to be eight

所以下个term就会是8

15.15 - 15.17

server two or server three will win the leadership election 

服务器2或者服务3会赢得leadership election 




15.17- 15.22

and let's just imagine that whichever one it is sends out

让我们想象下这个日志状况，无论哪个服务器会发送

（可能理解错了，回头再看一遍）



15.22 - 15.28

 append entries for a new client requests the other one gets it and so now we have this configuration

一个新的Client端请求的AppendEntries，另一个服务器会接收处理这条日志项



15.28 - 15.35

right so I was a bit of a detour we're back to our original question of

我走了个弯路，让我们回到原来的问题



15.36 - 15.39

in this configuration suppose server one revives we have an election

在这个日志状况下，假设服务器1恢复运行，我们发起了一个选举



15.39 - 15.52

would it be okay to use server one would it be okay to have the rule be the longest log wins the

longest log gets to be the leader

服务器1可以作为leader么？拥有最长日志的那个服务器可以作为leader，这样的规则是ok的么？







15.52 - 15.55

yeah obviously not right 

很明显， 不行啊



15.55 - 16.09

because server was a leader did it's going to force its log on to the to followers by the append entries machinery  that we just talked about a few minutes ago

就像我们几分钟前讲的那样，leader会通过AppendEntries机制 来强制把它的log更新到followers的log中



16.09 - 16.12

if we live server one to be the leader

如果我们把服务器1作为leader



16.12 - 16.20

it's gonna you know sent out appendentries whatever backup overwrite these aids tell the followers to erase their log entries for term 8

它就会发送AppendEntries，不管不顾的让 followers删掉本地term8 的log项目



16.20 - 16.28

 to accept to overwrite them with this six and seven log entries and then to proceed now with identical to server ones

接收用这个term6和term7来覆盖日志条目，然后就与服务器1保持一致，执行后续操作了



16.28 - 16.33

 so of course why are we upset about this 

这会让我们感到不安



16.37 - 16.39

yeah, yeah exactly

对的

16.40 - 16.42

 it was already committed 

它已经提交过了



16.43 - 16.53

right, it's not a majority of servers has already committed probably executed

quite possibly a reply sent to a client

这个请求命令，大多数服务器可能已经执行提交了，也可能已经发送给Client端响应了



16.53 - 16.56

so we're not entitled to delete it and

所以，我们没有权限去删除term8的信息



16.56 - 17.03

therefore server one cannot be allowed to become leader and force its log onto servers two and three 

因此，不应该让服务器1成为leader，以至于强制更新了服务器2和3的log




17.03 - 17.10

everybody see why that's bad idea for rapid 

大家都能马上反应过来为啥这个想法行不通了吧



17.11 - 17.17

and because of that this can't possibly have been rule

for elections 

这就是为什么这个想法不能作为选举的规则



17.17 - 17.21

of course shortest log didn't work too well either

当然，最短的log也一样行不通



17.22 - 17.31

and so in fact if you read forward to something  five point four point one (Paper. Page8)

如果你看了Paper的5.4.1



17.32 - 17.37

draft actually has a slightly more sophisticated election restriction

该草案提出了略微有些复杂的选举限制



17.43 - 17.51

that the request vote handling RPC handling code is supposed to check before it says

yes, before votes yes, for a different peer

RequestVote(请求投票处理)RPC，在为不同节点投赞成票前，处理代码应该作些检查



17.51 - 18.18

and the rule is we only vote you vote yes for some candidate who send us

over request votes only if candidate has a higher term in the last log entry

这个规则是，只有候选人的最后一个的log条目有一个比较高的term值时，我们才会给它投赞成票



18.24 - 18.32

 or same last term same charming the last log entry

或者相同的最后一个term，相同的最后一条log条目，才是我们中意的



18.32 - 18.46

and a log length that's greater than or equal to the the server that received that received the boat request 

发送的log日志长度(其实就是日志量)要大于等于follower服务器接已收到的client请求的长度（注：last term相同的情况下，多个candidate 竞选leader,谁的log长谁才能作为leader）




18.47 - 18.59

and so if we apply this here if server two gets a vote request from server one there our

last log entry terms 

如果我们使用这个规则，如果服务器2接收到服务器1的投票请求，





18.59 - 19.10

or seven the server one's gonna send out a request votes

with a last entry term, whatever of 7 server twos is eight so this isn't true

服务器1的最后一个entry term是7，服务器1会通过RequestVotes把这个发出来。

7与8做比较，结果是false



19.10 - 19.17

server service we didn't get a request

from somebody with a higher term in the last entry 

服务器服务没有接收到一个在最后日志条目中有较高term值的投票请求

在服务器服务接收到一个投票请求，它里面的最后一条日志条目的term比我当前term要低

19.17 - 19.25

and or the last entry terms aren't the same either said the second

Clause doesn't apply either 

或者说最后一个日志条目的term值也不一样，没有匹配上第二个条件所要求的

或者说，投票服务器最后一个日志条目term一样，但lastLogIndex比发起投票的服务器要大，那就匹配不上RequestVote RPC第二个条件所要求的

19.25 - 19.29

so neither server two new serve nor server three is going to vote for server one 

因此，服务器2或者3都不会投票给服务器1

19.29 - 19.32

and so even if it sends out this vote requests first

即使服务器1先发出来投票请求

19.32 - 19.34

because this has a shorter election timeout

因为选举超时时间比较短



19.34 - 19.38

 nobody's going to vote for it except itself so I don't think it's one

vote it's not a majority

除了它自己投自己， 没有人会投给它。






19.38- 19.42

 if either server two or server three becomes a candidate

如果服务器2或者服务器3成为了候选人



19.42 - 19.50

 then either of them will accept the other because they have the same last term number and their logs are each greater than or equal to in length and the others 

它们中任何一个都会同意对方的请求，因为它们有相同的最大term number且 它们的log日志长度也是大于等于对方的。



19.52 - 19.57

so either of them will vote for for the other one will server one vote for either of them

所以服务器1会给它们其中一个投票



19.57 - 20.02

yes because either server 2 or server 3 has a higher term number in the last entry 

是的， 因为服务器2或者服务器3在最后一个log条目中有一个比较高的term number






20.02 - 20.08

so you know what this is doing is making sure that you can only become a candidate

所以你就知道，系统通过这些工作来确保只有你才能成为候选人

20.09 - 20.15

if or it prefers candidates that knew about higher that have log entries some higher terms 

规则是更喜欢在log条目中有着较高term号的候选人



20.15 - 20.20

that is it prefers candidates that are more likely to have been receiving log entries from

the previous leader 

更喜欢那些更有可能是从上一个leader那里接收日志条目的候选人



20.22 - 20.25

and you know this second part says well we were all listening to the previous leader 

第二部分的意思是，我们要看与上一个leader的相关的东西



20.26 - 20.32

then we're going to for the server that has saw more requests from the very last leader

即我们要让服务器能看到来自上一个领导者的更多请求



20.35 - 20.40

any questions about the election restriction

对于选举限制有什么问题么？



##############################################





八十一  阅举报
07-02
20.45 - 21.00

okay final thing about sending out log entries is that this rollback scheme at least as I described it 

最后我们要说下发送log条目的回滚方案，至少如我描述的那样



21.00 - 21.05

and it's as its described in Figure two rolls back one log entry at a time 

Figure2所描述的那样，一次回滚一个log条目



21.05 - 21.09

and you know probably a lot of times that's okay

也许这些有意思的情况是没问题的

这在绝大数情况下是没有问题的

21.09 - 21.13

but there are situations maybe in the real world 

但是在现实生活中这些情况是可能会发生的

但在现实生活中还是可能会有一些情况发生

21.13 - 21.20

and definitely in the lab tests where backing up one entry at a time is going to take a long long time 

在lab test中肯定会出现的一种情形，即一次回滚一个日志条目是要耗费很长很长时间的



21.20 - 21.27

and so the real-world situation where that might be true is if they if a follower has been down for a long time

实际上可能会发生这种情况，一个follower宕机了较长的时间



21.27 - 21.31

and missed a lot of append entries and the leader restarts

从而错过了很多AppendEntries RPC，这时leader重新启动了



21.31 - 21.38

and if you follow the pseudocode in Figure two  if a leader restarts is supposed to set its next index to the end of the leaders log 

如果你注意到Firgure2的伪代码，会知道当leader重启后，它会把所有服务器的nextIndex设置成它的log的index+1




21.38 - 21.42

so if the follower has been down and you know miss the last thousand log entries

所以当follower宕机后，它缺失了很多log条目



21.42 - 21.49

and leader reboots the leader is gonna have to walk back off one at a time，one RPC at a time

如果这时leader又重启了，leader将通过一次又一次的RPC来回滚log



21.49 - 21.53

all thousand of those log entries that the follower missed

来同步数以千计的,关于这个follower所缺失的log条目



21.53 - 21.58

and there's you know you know particular reason why this would never happen in real life 

这个问题在现实生活中可能永远不会发生



21.58 - 22.05

it could easily happen at somewhat more contrived situation that the tests are definitely explorers is

这个测试就是在探索一些人为的情况

在我们进行某些人为测试的情况下，这种情况很容易发生

22.05- 22.18

 a follower is if we say we have five servers and there's there's a leader but the leaders got trapped with one follower in a network partition 

如果有5台服务器，leader和一个follower与其他服务器网络割裂了



22.18 - 22.23

but the leader doesn't know it's not leader anymore and it's still sending out append entries to its one follower and none of which are committed

然而leader不知道它已经不再是leader了，它仍然向外发送Append Entries请求给它的follower，但是这个Append Entries并不会提交到整个系统中



22.23 - 22.30

 while in the other majority partition the system is continuing as usual 

同时在Majority（多数派）分区中，系统仍然正常运行着



22.30 - 22.40

the ex leader and follower in that Minority partition could end up putting in their logs you know sort of unlimited numbers of log entries for a stale term

在Minority（少数派）分区中的前Leader与follower仍会（按照之前的方式）记录它们日志，即用老的term来记录大量的log条目





22.40 - 22.44

that will never be committed and need to be deleted and overwritten eventually when they rejoin the main group

这些log条目永远不会提交到系统中，当它们重新接入主群中，这些log最终会被删除并覆盖





22.46 - 22.52

 that's maybe a little less likely in the real world but you'll see it happen and the test set up

这个场景在现实生活中不太可能会发生，但是你可以通过运行test测试用例来看到它



22.52 - 23.04

 so in order to be able to back up faster that paper has somewhat a vague description of a faster scheme towards the end of section 5.3

为了尽可能的加快备份速度，paper在Section 5.3末尾，关于加速模式有些笼统的描述



23.05 - 23.07

it's a little bit hard to interpret 

这个有点难以讲解



23.07 - 23.12

so I'm gonna try to explain what their ideas about how to back up faster a little bit better

我会试着讲解他们的想法，如何更快更好的备份



23.12 - 23.17

 and the general idea is to be able to to have the follower send enough information to the leader

常规的想法是能够让follower发送充足的信息给leader



23.17 - 23.24

that the leader can jump back an entire terms worth of entries that have to be deleted per append entries

以便leader能够横跨一整个有效terms跳到指定的log entry位置（这些entires必定是要删掉的）

以便leader能够回跳到一个有意义log entry位置，用于删除它之后的日志条目（对follower来讲的）

23.24 - 23.35

 so it leader may only have to send one in an pennant and append entries per term in which the leader and follower disagree  instead of one per entry 

所以leader只需要发送一个与follower相同term下的不同log条目就可以了，不用一个一个的发log条目



23.35 - 23.39

so there's three cases I think are important 

我认为有三个case是比较重要的



23.39 - 23.46

and the fact is that you can probably think of many different log backup acceleration strategies 

实际上，你可能会想到一些不同的log备份加速策略



23.46 - 23.47

and here's one 

这是第一个



23.47 - 23.53

so I'm going to divide the kinds of situations you might see into three cases 

我要把这些情况区分开来，你可以看到3个case



23.51 - 24.01

so this is fast backup 

快速备份有



24.01 - 24.03

case one 

首先case1



24.03 - 24.11

I'm just going to talk about one follower and the leader and not worry about the other nodes 

我要谈论的是一个follower和leader，不关心其他节点





24.11 - 24.17

the same we have two server 1 which is the follower and

同样我们有两个服务器，服务器1是follower



24.18 - 24.20

server 2 which is the leader 

服务器2是leader



24.25 - 24.32

so this is one case and here we need to backup over a term where that term is entirely missing from the leader 

这个是case1， 我们需要将6备份到5上，leader完全不知道有term5


24.32 - 24.39

another case

另一个case



24.44 - 24.51

so in this case we need to back up over some entries but their entries for a term that the leader actually knows about

在这个case中，我们需要在部分日志条目上做备份，但是leader实际上是知道该term的这些日志条目的




24.51 - 25.00

 so apparently the this followers saw a couple of entry a couple of the very Flass few append entries sent out by a leader that was about to crash 

显然，在这个follower上所看到的这两个entry，是由一个即将崩溃的Leader发送Append Entries造成的（因网络出现问题造成了区域分割，上面444这个在少数派，下面4666这个在多数派中,没有5是因为中间选举没有成功，又进行了一次选举得到的term6）

是提交了一个即将崩溃的Leader发出来的多个Append Entries造成的



25.00 - 25.05

but the new leader didn't see them we still need to back up over them 

但是新的leader中是看不到这两个4的，我们需要将6备份到这两个4上



25.05 - 25.05

and a third case

接下来是第三个case


25.05 - 25.15

 is where the followers entirely missing the following the leader agree

followers整个缺少了leader中后续要与之确认的内容



25.15 - 25.23

but the followers is missing the end of the leader‘s log 

follower缺失leader的尾部log



25.23 - 25.35

and I believe you can take care of all three of these with three pieces of extra information in the reply that a follower sends back to the leader in the case in the append entries

我相信，你能凭借follower通过append entries的返回值中携带返回给leader的三条附加信息，来处理这三个case



25.35 - 25.45

so we're talking about the append entries reply if the follower rejects the append entries because the logs don't agree， 

我们谈论下append entries的返回值. 因为log不被follower接受，并拒绝了appendentries



25.45 - 25.50

there's three pieces of information that will be useful and taking care of three street cases 

下面这三条log的附加信息，在解决这三种常见问题上，将会很有用



25.50 - 25.55

I'll call them X term which is the term of the conflicting entry

我把有冲突的entry所在的term，叫做XTerm


25.56 - 26.05 ！！！！！！

I remember the leader sent this previous log term and

我记得leader会发送这个prevLogTerm


26.05 - 26.08

if the follower rejects it because it has something here but the terms wrong

follower是有log记录的，但是对应的term不对，follower就拒绝了AppendEntry

如果follower拒绝了这个appendentries，那是因为此处对应的term不对

26.09 - 26.14

so it'll put the follower’s term for the conflicting entry here 

那么Leader会把follower的term 放到conflicting entry对应的变量里

那么Leader会把follower对应冲突条目(conflicting entry)的term 放到这里（XTerm）


26.14 - 26.20 

or you know I'm negative one 

我会把term减1



26.20 - 26.22

or something it doesn't have anything in the log there,

或者在follower的log中没有任何内容，

 26.24 -26.30

 it'll also send back the index of the conflicting

它也会返回这个冲突的索引


26.32 - 26.32

Oops

哎呀，嘴瓢了



26.32 - 26.36

 the index  of the first entry with that term

这个索引应该是该term第一次日志条目的

返回的这个索引应该是该term（XTerm）下所属的第一条日志条目




26.46 - 26.51

and finally if there wasn't any log entry there at all 

最后，如果这里没有任何log条目



26.51 - 26.59

the follower will send back on the length of its log， length of  follower‘s log 

follower会发送回它的日志长度




27.00 - 27.05

so for case one the way this helps

对于case1，这种加速备份方式很有用


27.05 - 27.20

if the it's a leader sees that the leader doesn't even have an entry with XTerm of term XTerm at all in its log 

如果leader得知，在它的log中leader甚至根本没有XTerm的log条目

如果leader看到，在它的log中根本就没有一条log条目属于这个XTerm下的



27.20 - 27.32 (case1 用了 index）

so that's this case where the leader didn't have term five and if the leader can simply back up to the beginning of the followers run of entries with XTerm

so 在这个case中，leader没有term5，它可以很简单地跳到follower中XTerm下属条目中最开始的那个位置进行备份

它能简单的后退到这个XTerm开始的位置

27.32 - 27.39

 that is the the leader can set its nextindex to this Xindex thing which is the first entry

leader可以设定follower的nextIndex为这个Xindex ，这里，Xindex为这个XTerm下的最开始的那个Index

27.41 - 27.44

the followers run of items from term five

也就是follower提交的term5发出的第一个日志条目的索引



27.45 - 27.53

alright so if the leader doesn't have X term at all it should backup to X back the follower up to X index 

结论是，如果leader根本没有X Term，那么它可以后退到X，让follower后退到X的索引位置

alright，如果leader根本没有XTerm，那么它可以从follower 的Xindex 处继续备份请求



27.52 - 27.57

the second case you can detect the fault the leader can detect

第二个case，leader会检测到与follower的log条目对比失败


27.57 - 28.05

 if X term is valid and the leader actually has log entries of term X term 

如果XTerm是有效的，leader实际上是含有XTerm的log条目的



28.05 - 28.10 (case2 用的 leader last index，follower's first index）

that's the case here where the you know the disagreement is here 

这个case发生冲突的点在这


28.10 - 28.18（回看4.45)

but the leader actually has some entries that term in that case the leader should back up to the last entry it has that...

然而在这个例子中，leader实际上在对应的term是有一些entries的，leader应该从它所持有的该term下的最后一个entry开始对follower进行备份

后退到最后一个它所持有entry



28.18 - 28.28

has the contesta follower's term for the conflicting term in it that is the last entry that a leader has for term 4 in this case

leader会接收到follower返回的有异议的term，leader的log日志中有这个term，在这个case中，是leader所持有的term4的最后一个entry

即leader会根据与follower起冲突的这个term，拿到其下所持有的该term的最后一条entry ，在这个例子中就是leader所持有的term 4下的最后一个entry

28.28 - 28.32

 and if neither of these two cases hold that is the... well 

这两种情况都没有出现的话



28.33 - 28.41

actually if the follower indicates by maybe setting X term to minus one it actually didn't have anything whatsoever at the conflicting log and index 

实际上在case3中， follower 通过XTerm-1来表明，follower实际上在冲突的log和index上没有任何内容



28.41 - 28.50

because it's log is too short then the leader should back up its next index to the last entry that the follower had at all

因为follower的log太短了，leader应该将与之对应的nextIndex设定为follower所拥有的最后一个条目


28.51 - 28.53

and start sending from there

然后从那发送AppendEntries



28.53 - 28.57

and I'm telling you this because it'll be useful for doing a lab 

我要告诉你的是，这个在做lab的时候很有用的



28.57 - 29.04

and if you miss some of my description it's it's in electronics

如果你忘记了我所说的内容，在电子版里也有



29.04 - 29.09

then any questions about this backing up business

备份业务这块，大家有什么问题没有





29.20 - 29.23 

 I think that's true yeah yeah 

我认为那是对的，yeah， yeah



 29.24 -  29.25

yeah maybe binary search

也许通过二分搜索来做的



29.25 - 29.27

 I'm not ruling out other solutions 

我没有排除其他解决方案



29.28 - 29.34

I mean that you know after reading the papers non description of how to do it I like cook this up

我的意思是，看完paper后，在没有任何编程指引下， 我喜欢这么做



29.34 - 29.39

and there's probably other ways to do this probably better ways and faster ways of doing it 

也可能会有其他方式，更好，更快的来复制log



29.39 - 29.46

like I'm  I'm sure that if you're willing to send back more information or have a more sophisticated strategy like binary search you can do a better job 

就像..我确信如果你愿意返回更多的信息 或 加入一个更复杂的策略如二分搜索，你可以做的更好



29.49 - 29.53

yeah well you you almost certainly need to do something

当然你需要做一些工作



29.53 - 29.58

experience suggests that in order to pass the tests you'll need to do something to as..

经验建议，为了通过测试，你需要去做一个工作，类似于



30.00 - 30.01

well probably not me 

可能并不是这样



30.02 - 30.10

although I  that's not quite true like one of the solutions I've written over the years，actually does the stupid thing and still passes the tests 

虽然我多年前写的一个解决方案并不是完全正确，实际上我在里面做了许多愚蠢的处理，然而它依然通过了测试





30.11 - 30.21

but because the tests you know the one of the sort of unfortunate but inevitable things about the tests we give you is that they have a bit of a real time requirement

在我提供给你们的测试中可能不是面面俱到，但有一件事是不可避免的，即它们是有一些实时性要求的





30.21 - 30.27

that is the tests are not willing to wait forever for your solution to produce an answer

那就是这些测试案例不会永远的等着你的实现方案来给出答案





30.27 - 30.36

 so it is possible to have a solution that's you know technically correct but takes so long that the tester gives up

所以，可能会有这么一个实现方案，从技术的角度来讲，它是正确的，但耗时很长,以至于测试用例放弃了（即超时报错）

技术正确但是耗时太长，那么验证器就放弃验证了



30.36 - 30.42

and unfortunately you know we will the tester will fail you if your solution doesn't finish the test and whatever the time limit is 

不幸的是， 如果你的解决方案没有在限制时间内完成测试，测试用例会判定你没能通过测试 



30.43 - 30.47

and therefore you do actually have to pay some attention to performance 

因此你真的需要在性能上下些功夫





30.48 - 30.59

in order you know your solution has to be both correct and have enough performance to finish before the tester gets bored and some timesout on you which is like 10 minutes or I don't know what it is

为了让你的实现方案是正确的，并提供足够的性能在这测试用例超时前（比如10分钟或者我不知道的时间范围内）完成测试

并在验证器感觉无聊，且对你产生不满前有足够的性能来完成测试。可能需要在10分钟内完成，或者我就不知道了     



30.59 - 31.06

 and fortunately it's relatively this stuff's complex enough that it's not that hard to write a correct solution that's not fast enough

幸运的是，这些东西并没有复杂到让你无法写出一个正确但速度并不够快的实现方案



31.09 - 31.10

yes 

请问



31.15 - 31.17

so the way you can tap the leader can tell the difference

你利用leader的方式来分辨log上的差异

你可以通过一定的方式来告诉leader冲突的信息

31.17 - 31.24

 is that the follower we're supposed to send back the term number it sees in the conflicting entry

follower应该返回它所看到的冲突的条目的term号


31.25 - 31.31

 you we have case one if the leader does not have that term in its log

在case 1中，leader在它的log中，并没有包含该term



31.31 - 31.36

so here the follower will set X term to five 

在这里，这个follower会将XTerm设定为5


31.36 - 31.41

because this is this is going to be the this is gonna be the conflicting entry

因为这将会是一个存在冲突的entry


31.42 - 31.48

 the follower says this X term to five the leader observes oh I do not have term five in my log

follower会说XTerm是5， leader观察到了，噢，在我的log中没有这个term 5



31.48 - 31.52

and therefore this case one 

因此case1



31.57 - 32.02

and you know it should back up to the beginning， like it doesn't follower hasn't leader has none of those and term five entry

它应该从follower该Xterm下开始位置的entry处备份，因为leader并没有它里面的这些entry，比如term 5这条

32.02 - 32.07（回看23.17 - 23.24）

so it should just get rid of all of them in the follower by backing up to the beginning which is Xindex

通过log后退到Xindex的起始位置，这些冲突的log就在follower中被删掉了

So，leader应该对follower日志从起点处（XIndex）开始备份，并将follower日志中XIndex之后所有东西丢弃

32.07 - 32.10

do you have question

你还想问什么？



32.19 - 32.20

yeah yeah

是的，是的



32.20 - 32.24

because the leaders gonna back up its next index to here 

因为leader会把它的nextIndex回退到4这个位置

因为leader会把它用于备份的这个nextIndex设定为这个位置




32.22 - 32.27

and then send an append entries that starts here

然后从4的下一个slot发送AppendEntries

然后从这里开始发送一个AppendEntries




32.27 - 32.31

and the rules a figure two say ah the follower just has to replace its log 

figure 2 有说明这个规则，follower必须将它的log替换



32.31 - 32.35 

so it is gonna get rid of the fives 

所以它会删掉这些term 5的log



32.36 - 32.37

okay 





32.37 - 32.40

alright the next thing I want to talk about is persistence

下面的我要讲下的是persistence（持久化）



32.41 - 32.49

you'll notice in Figure two that the state in the upper left-hand corners sort of divided and some are marked persistent

你将注意到在Figure 2中，左上角的state中有类型的划分，有些标记了persistent



32.49 - 32.52

 and some are marked volatile

还有些标记了volatile





32.52 - 33.04

 and what's going on here is that the the distinction between persistence and volatile you know only matters if a server reboots crashes and restarts

这里我们所要说的就是persistence和volatile之间的区别。我们只有当服务器重新引导，崩溃和重新启动时，才会在意这个





33.04 - 33.10

 because the persistent what the persistent means is that if you change one of those items， it's marked persistent

persistent的意思是，如果你改变了其中一个item，它就会标记为persistent





33.10 - 33.21

 you're supposed to the server supposed to write it to disk or to some other non-volatile storage like as or the battery-backed something or whatever

server应该把修改后的item写入到磁盘，或者写入到其他非易失性的存储，像依靠电池的设备或其他什么



33.21 - 33.29

that will ensure that if the server restarts that it will be able to find that information and sort of reload it into memory 

这会确保如果server重新启动后，server可以找到信息并把它载入到内存中



33.32 - 33.38

and that's to allow us to allow servers to be able to pick up where they left off if they crash and restart

这能让server崩溃并重启后，能够还原到它崩溃重启前的状态



33.38 - 33.47

 now you might think that it would be sufficient

now 你可能会想这样搞就足够了



33.47 - 33.52

and simpler to say well if a server crashes then we just throw it away

更简单的说，如果服务器崩溃了，那么我们就直接将该服务器丢弃即可



33.53 - 34.00

 and or we need to be able to throw it away and replace it with a brand-new empty server and bring it up to speed，right

或者我们需要丢弃它，用全新的空闲服务器替换它，以此来提高速度





34.00 - 34.05

and of course you do actually it is vital to be able to do that，right

当然你确实要做的，这也是至关重要的

Of course，能够做到这一点，对我们来说至关重要

34.05 - 34.11

 because if some server suffers a failure of some catastrophic failure like it's you know disk melts or something

如果某个服务器遭受灾难性故障，例如，磁盘烧熔或其他问题





34.11 - 34.20

 you absolutely need to be able to replace it and you cannot count on getting anything useful off its disk if something bad happened to its disk 

你绝对需要可以替换掉该服务器，而且如果磁盘发生故障，你不能指望从磁盘上获取任何有用的东西





34.20 - 34.26

so we absolutely need to be able to replace completely replace servers that have no state what so ever 

因此，如果可能的话，我们绝对需要这些能够完全用于替换的全新的没有任何状态的服务器



34.27 - 34.30

you might think that's sufficient to handle any difficulties

你可能认为这足以应对任何难题



34.30 - 34.32

but it's actually not

但实际上这是不可能的



34.32 - 34.41

 it turns out that another common failure mode is power failure of you know the entire cluster where they all stop executing at the same time，right

事实证明，另一个常见的故障方式是供电故障，整个集群在同一时间都停止运行了



34.42- 34.43 

and in that case we can't handle

我们没法处理这种情况



34.43 - 34.52

or we can't handle that failure by simply throwing away the servers and replacing them with new hardware that we buy from Dell

我们不能只是简单的扔掉服务器，并用我们从戴尔购买的新硬件来替换它们来解决该故障





34.53 - 35.05

we actually have to be able to get off the ground we need to be able to get a copy of the state back in order to keep executing if we want our service to be fault tolerant 

我们实际要有个万全的准备，如果我们想让我们的服务具备容错能力，就需要备份服务器的状态以便能够持续运行



35.05 - 35.10

and therefore in order at least in order to handle the situation of simultaneous power failure

所以，为了解决同时断电的问题



35.10 - 35.18

 we have to have a way for the server's to sort of save their state somewhere where it will be available  when the power returns 

我们不得不为服务器们想个办法，把服务器的state存储到某些地方，来电后，就能使用这些state





35.19 - 35.22

and that's one way of viewing what's going on with persistence

这就是对persistence（持久化）的一种说明





35.23 - 35.33

it said that's the state that's required to get a server going again I'm after either a single power failure or power failure of the entire cluster

这个state是必要的，在单点电源故障或者整个集群电源故障发生后，它能让server再次运行




35.33 - 35.40

alright so figure two lists three items only three items are persistent

我们看到figure 2有仅有三个item（字段）是persistent的




35.44 - 35.49

there's a log that's like all the log entries

这里的LOG指代的是所有的log entries



35.50 - 36.03

 currentTerm and votedFor 

接下来是 currentTerm 和 votedFor




36.03 - 36.08

and by the way you know one of us server reboots it actually has to make an explicit check

顺便提一下，一个服务器重启后，它实际上必须要做一个显式检查



36.08 - 36.16

 to make sure that these data are valid on its disk before it rejoins the raft cluster 

来确保在它重新加入到raft集群前，它磁盘上的数据都是有效的





36.17 - 36.25

I have to have some way of saying oh yeah I actually do have some save persistent state as opposed to a bunch of zeros that that are not valid 

我要说些的是，没错，我实际上确实把一些persistent state保存了下来，而不是保存了一堆无效的0



36.25 - 36.33

all right so the reason why log has to be persisted is that

那么，log为什么要被持久化的原因就是



36.34 - 36.39

 at least according to figure two this is the only record of the application state

通过firgure2，我们知道了这个是application state的唯一记录



36.40 - 36.46

that is figure two doesn't really have a notion figure two does not say that we have to persist the application state 

figure 2中并没有真正通过一个概念来表明我们必须持久化这个application state





36.46 - 36.52

so if we're running a database or you know a test and set service like for vmware ft 

所以如果我们运行了一个数据库，或者一个像vmware ft那样的test-and-set服务





36.52 - 36.58

the actual database or the actual value of the test and set flag isn't persistent according to figure two，only the logins logs 

实际的数据库或实际的test-set服务的值，根据figure2来看，设置的flag并没有persistent，只有logs被persistent了

根据figure 2来看，实际的数据库或者是test-and-set的flag值并不是持久化的，只有Log才需要被持久化



36.58 - 37.00

and so when the server restarts 

当server重新启动时

37.00-37.07

the only information available to reconstruct the application state is the sequence of commands in the log 

可用于重建application state的唯一信息就是log中的命令序列








37.08 - 37.11

and so that has to be persisted 

所以log必须要被持久化



37.13 - 37.14

that's what about current term 

那关于currentTerm呢

37.14-37.18

why does current term have to be persistent

为什么currentTerm需要被持久化呢？





37.34 - 37.41

yeah so they're both about ensuring that there's only one that each term has at most one leader 

是的，它们都需要确保在每个term中，最多只能有一个leader



37.41 - 37.46

so yeah so voted for the specific you know potential damaging case is that

So，对于votedFor来说，这里我举一个潜在的破坏性例子



37.46 - 37.51

 if a server receives a vote request and votes for server one and then it crashes 

如果一个server收到一个投票请求，并投票给server1，然后这个server崩溃了



37.51 - 37.55

and if it didn't persist this the identity of who had voted for

如果这个server没有保存它所投的服务器的id



37.55 - 38.00

and then my crash restart，get another vote request for the same term from server two 

随后server崩溃重启， 又收到了同一个term中，来自server 2的投票请求



38.01 - 38.04

and say gosh I haven't voted for anybody because my voted for is blank

天呀，我还没给任何人投过票，我的votedFor字段中的内容是空的



38.04 - 38.05

now I'm gonna vote for server 2 

现在我要给server2投票



35.05 - 38.10

and now our servers voted for server 1 and for server 2 in the same term

现在，在同一个term中的服务器给server1，server2都投了票



38.10 - 38.16

 and that might allow two servers since both server 1 and server 2 voted for themselves 

这可能就允许服务器自己给自己投票，即server1 和 server2 都给它们自己投票



38.16 - 38.20

they both may think they have a majority out of three and they're both going to become leader 

它们可能都认为它们是三个中的大多数，他们都要成为leader

38.20-38.23

now we have two simultaneous servers for the same term

现在我们在同一term内，同时存在了两个leader服务器（而且都是符合要求的）



38.23 - 38.26

 so this that's why I voted for it has to be persistent

所以，这就是为什么 votedFor 必须被持久化



38.26 - 38.30

current term is gonna be a little more subtle

currentTerm可能有些微妙




38.30 - 38.34

but we actually talked before about how 

但我们实际上曾经谈过



38.34 - 38.36

you know again we don't want to have more than one server for a term

我们不希望在一个term中存在多个leader的情况出现



38.38 - 38.41

and if we don't know what term number it is 

如果我们不知道term号是多少



38.41 - 38.47

then we can't necessarily then it may be hard to ensure that there's only one server for a term 

那么我们就不一定，我们可能很难确保，在一个term内，只有一个leader服务器

38.47 - 38.50

and I think maybe in this example 

我想在这个例子中




38.51- 38.58

ya if s if server 1 was down， and server 2 and server 3 we're gonna try to elect a new server 

是的，如果服务器1 宕机了， 服务器2和服务器3 要试着选举出一个新的服务器作为leader












38.58 - 39.02

they need evidence that the correct term number is 8 and not 6 

它们需要证据来表明正确的term号是8，而不是6



39.02 - 39.05

right，because if they forgot about current term 

因为如果它们忘记了currentTerm



39.05 - 39.10

and it was just server 2 and server 3 voting for each other and they only had their log to look at  

在只有服务器2和服务器3的话，并且它们互相投票，它们只能查看自己的log

39.10-39.12

they might think the next term should be term 6

它们可能认为下一个term应该是term6



39.12 - 39.14

they did that they start producing stuff for term 6 

它们会开始执行term 6下的命令



39.14 - 39.18

but now there's gonna be a lot of confusion because we have two different term sixes

现在这里会有一些混乱，因为我们有两个不同的term6



39.18 - 39.28

and so that's the reason my current term has to be persistent， to preserve evidence about term numbers that have already been used 

所以这就是currentTerm必须要持久化的原因，为了保存已经使用的term号证据





39.33 - 39.40

these have to be persisted pretty much every time you change them，right

记住，每次你改变这些数据的时候，它们必须要被保存








39.42 - 39.52

so certainly the safe thing to do is every time you add an entry of log or change current term and set votedfor you need you probably need to persist that  

当然，安全的做法是，在你每次添加日志条目或改变当前term以及设置votedfor的值时，你需要持久化这些值



39.52- 39.54

and in a real raft server that would mean writing it to the disk

在一个真实的raft服务器中，这意味着将这些修改后的数据写入磁盘





39.54 - 39.58

 so you'd have some set of files that recorded this stuff 

所以你要一些文件记录这些东西



#####################下面讲优化放到07-03##############################



39.59 - 40.00

you can probably be a little bit 



40.01 - 40.03

you may be can cut some corners

你们可能可以稍微偷点懒

40.03-40.10

 if you observed that，you don't need to persist these things until you communicate with the outside world

如果你观察到在与外界通信前，不需要persist这些素材，在程序处理上你也许会省些事儿

如果你们有仔细观察得到话，可以知道，直到你们和外界进行通信时，你们才需要持久化这些东西

五十六  阅举报
07-03
40:10 - 40:13

so there may be some opportunity for a little bit of batching by saying

So，这里在处理的过程中，我们可能会使用一些批处理的方式



40.13 - 40.19

well we don't have to persist anything until we're about to reply to an RPC or about to send out an RPC 

Well，直到我们要响应一个RPC请求或对外发送一个RPC请求时，我们才需要保存这些东西



40.19 - 40.23

I mean that may allow you to avoid a few persisting

我的意思是，这样可以允许你们减少一些持久化的操作



40.23 - 40.26

the reason that's important is that

重要的原因是因为



40.27 - 40.32

writing stuff to disk is can be very expensive

将数据写入磁盘的代价可能会非常昂贵



40.32 - 40.32

if it's a mechanical hard drive that we're talking about 

如果我们所讨论的磁盘是机械硬盘



40.32 - 40.38

then writing anything you know if the way we're persisting is writing files on the disk  

正如你们知道的那样，如果我们要将数据文件持久化到磁盘

40.38-40.42

writing anything on the disk cost you about 10 milliseconds 

将任意数据写入到磁盘上需要花费10毫秒



40.42-40.48

because you either have to wait for the disk to spin for the point you want to write to spin under the head 

因为我们必须等待磁盘转到我们想写入数据的那个位置



40.48 - 40.51

which disk only rotates about once every 10 milliseconds 

磁盘每次旋转需要10毫秒

40.51-40.55

or worse that you may actually have to seek to move the arm the right track 

或者更糟糕的情况下，你可能得等磁盘臂移动到正确的轨道上才行(有磁盘碎片的话时间会变得更长)

40.55-40.59

right so these persistent systems can be terribly terribly expensive 

So，这些持久化系统所要付出的性能代价可能会非常非常高

40.59-41.07

and if for sort of any kind of straightforward design, they're likely to be the limiting factor in performance 

对于任何简单的设计来说，它们很可能在性能上有所限制



41.07 - 41.09

because they mean that 

因为这意味着

41.09-41.17

 doing anything anything whatsoever on these raft servers takes ten milliseconds a pop 

在这些raft服务器上做任何事情都可能得会10毫秒左右

41.17-41.24

and 10 milliseconds as far longer than it takes to say send an RPC or almost anything else you might do

10毫秒这么长的时间要比系统发送RPC请求或者做其他事情来说还要长

41.24-41.28

10 milliseconds each means you can just never

10毫秒意味着

41.28-41.31

 if you persist data to a mechanical drive 

如果你将数据持久化到机械硬盘上

41.31-41.35

you just can never build a raft service it can serve more than 100 requests per second 

你永远构建不出这种raft服务，即每秒处理100个以上的请求

41.35-41.40

because that's what you get it at 10 milliseconds per operation 

因为你每进行一次操作就要花10毫秒（如果是100个，就是1秒）


41.40-41.55

and you know this is this cost so this is really all about cost of synchronous disk updates

这就是同步磁盘更新所要付出的代价

41.55-41.58

 and it comes up in many systems 

这在许多系统中都有出现

41.58-42.01

the file systems that are running in your laptops

比如运行在你笔记本中的文件系统

42.01-42.10

are that the designers spend a huge amount of time sort of trying to navigate around the performance problems of synchronous disk writes 

设计人员会花大量的时间去研究同步磁盘写入时的性能问题

42.10-42.12

because in order for stuff to get safe on your disk 

为了数据能安全写入你的磁盘

42.12 - 42.16

in order to update the file system on your laptop's disk safely 

为了文件系统能在你的笔记本上安全的进行升级



42.16 - 42.22

there turns out the file system has to like be careful about how it writes

文件系统就要不得不很小心的进行磁盘写入



42.22 - 42.24

 and needs to sometimes wait for the disk to finish writing

有时需要等待磁盘完成写入工作

42.25-42.30

 so this is a like a cross-cutting issue in all kinds of systems certainly comes up in raft

So，这其实是一个在所有系统中都会存在的跨领域的问题，当然raft也不例外

42.30-42.36

if you want it to build a system they could serve more than a hundred quests per second 

如果你想去构建出一个每秒能处理100以上请求数量的系统

42.36-42.39

then there's a bunch of options 

那么你就有很多种选择

42.39-42.42

one is you can use a solid-state drive or some kind of flash or something

其中一种选择是，我们可以使用固态硬盘，或者是其他闪存设备

42.42-42.52

 solid state drives can do a write to the flash memory in maybe a tenth of a millisecond 

固态硬盘可以在0.1毫秒内完成一次写入

42.52-42.55

so that's a factor of a hundred for you 

这样，你的性能就可以提升百倍

42.55-43.04

or if you're even more sophisticated maybe you can build yourself battery backed DRAM  and do the persistence into battery back DRAM

如果你想使用更复杂的方案，那么你可以构建你自己的自带供电的DRAM设备，并将数据持久化在这种设备中

43.04-43.07

and then if the server reboots

那么如果服务器重启

43.07-43.12

hope that reboot was took shorter than the amount of time the battery lasts 

我们希望重启所花费的时间要比直接启动来的更短

43.12-43.16

and that this stuff you persisted is still in the RAM

并且我们的数据依然是持久化在内存中

43.16-43.21

and the reason I mean if you have money and sophistication the reason to favor that is you can write DRAM

如果你有钞能力并且技术成熟的话，那么你就可以使用DRAM这种方式

43.21-43.23

you know millions of times per second

它的写入速度是每秒百万次

43.23-43.26

 and so it's probably not going to be a performance bottleneck 

So，这样它就很难成为一个性能瓶颈

43.26-43.35

anyway so that this problem is why and it's sort of marking a persistent versus volatile

So，总之，这就是为什么标记persistent和volatile的原因了

43.35-43.41

 and figure 2 is like has a lot of significance for performance as well as crash recovery and correctness 

在figure 2中很多地方都有提到性能与崩溃恢复和数据的正确性一样重要



43.41-4346

any questions about persisting

关于持久化这块，你们有任何疑问吗？

43.46-43.47

yeah

请讲



44.07-44.08

yes alright so your question is

So，你的问题是



44.08 - 44.14

basically you're writing code say go code for your raft implementation or you're trying to write a real raft implementation 

简单来讲，在你用go写你自己的raft实现，或者是你试着写一个真正的raft实现的时候



44.14 - 44.21

and you actually want to make sure that when you persist your an update to the log  or the current term or whatever that

实际上，你想去确保，当你将你所做的更新持久化到日志上，或者是currentTerm之类的东西上时



44.21- 44.23

in fact will be there after a crash and reboot like 

事实上，当服务器崩溃并重启后，这些更新得在它们所在的位置上



44.23 - 44.26

what's the recipe for what you have to do to make sure it's there

那么，如何确保它们在那里，有什么秘诀吗？



44.26 - 44.34

 and your observation that if you call you know on a UNIX or Linux or whatever Mac if you call write

如果你是在UNIX，Linux或Mac上调用write

44.34 - 44.39

you know the write system call is how you write to a disk file you simply call write

通过在系统中调用write，这就是我们如何将文件写入磁盘的方式

44.39-44.46

as you pointed out，it is not the case that after the write returns  the data is safe on disk and will survive a reboot 

你所指出的是，当write返回后，数据就会安全的存放在磁盘上，并且重启后，依然可用，其实并非如此



44.46 - 44.50

it almost certainly isn't almost certainly not on disk 

几乎可以肯定的是，它并没有在磁盘上



44.50 - 44.58

so the you know the particular piece of magic you need to do is on unix anyway you need to call write

总之，你需要在Unix上所做的事情是，你需要去调用write




44.58 - 45.03

so you know write some file you've opened that's going to contain the stuff that you want to write 

在这个函数中，传入你已经打开的某个文件，以及你想写入的那些数据




45.03 - 45.09

and then you got a call this Fsync call which on most systems

然后，你再调用在大部分系统中都有的fsync这个命令





45.09 - 45.25

 the guarantee is that Fsync doesn't return until all the data you've previously written into this file is safely on the surface on the media on a place where it will still be there if there's a crash

这就保证了，直到你将所写入的所有数据都安全的保存在了存储介质（比如：磁盘）上时，fsync才会返回。如果遇上系统崩溃，重启后，数据依然会在那个位置


45.25 - 45.28

so this thing is some then this call is an expensive call and

So，在调用这个fsync方法时，我们所要付出的代价很高





45.29 - 45.33

that's why it's a separate  that's why Write  doesn't write the disk 

这就是为什么，它们要分开的原因，这也就是为什么write方法并不会将数据写到磁盘上的原因






45.33 - 45.35

only Fsync does is because it's so expensive

只有调用fsync命令的时候才会将数据写到磁盘上，因为调用它的代价太高了

45.35 - 45.36

you would never want to do it 

你们永远不会想这么干

45.37 - 45.40

unless you really wanted to persist some stuff some data

除非你真的想对某些数据进行持久化操作



45.45 - 45.48

 okay so you can use more expensive disk hardware 

Ok，So，你可以使用一些更昂贵的磁盘硬件

45.50-45.51

the other trick people play a lot is to try to batch 

人们经常玩的另一个技巧就是试着使用批处理



45.51 - 45.55

that is if you can if client requests are if you have a lot of client requests coming in

如果你一下子收到大量的Client端请求



45.55 - 46.00

maybe you should accept a lot of them and not reply to any of them for a little bit 

可能你会接受一堆请求，但并不会立刻对它们响应



46.00 - 46.07

we call a lot of them accumulate and then persist you know a hundred log entries at a time from your hundred clients 

比如，如果我们收到了100个Client请求，我们将它们累积在一起，一次性的将它们持久化为100个日志条目



46.07 - 46.11

and you know only then send out the append entries

然后才对外发出AppendEntries





46.11 - 46.14

because you do actually have to persist this stuff to disk 

因为实际上你必须将这些持久化到磁盘上



46.14 - 46.15

if you receive a client request

如果你收到一个Client端的请求

46.15-46.22

 you have to persist the new entry to disk before you send the append entries RPCs to followers 

那么，在你将AppendEntries RPC发送给follower之前，你必须将这个新的条目持久化到磁盘上



46.22 - 46.34

because you're not allowed if the leader you know the leader it's essentially promising to commit that the request and can't forget about it

因为本质上来讲，leader应该将该请求落地到日志，并且不能将它丢掉



46.35 - 46.40

and indeed the followers have to persist the new log entry to their disk before they reply to the append entries 

的确，follower在响应这个AppendEntries之前，它们必须将这个新的日志条目持久化到磁盘上

46.40 - 46.41

because they were apply to the append entries

因为它们要执行这个AppendEntries



46.42 - 46.44

it's also a promise to preserve  and eventually commit that log entry 

它们也应该去保留这些，并最终提交该日志条目

46.46 - 46.49

so they can't be allowed to forget about it if they crash 

So，如果它们崩溃，我们是不允许它们将这些给丢掉的



46.49 - 46.53

other questions about persistence

关于持久化，有别的问题么



46.53 - 47.01

 all right



47.01 - 47.07

 well final you know a little detail about persistence is that 

Well，最后还要讲些关于持久化这方面的细节



47.07 - 47.09

some of the stuff in figure two is not persistent 

在figure 2中某些东西并不会被持久化



47.09 - 47.21

and so it's worth scratching your head a little bit about why commitIndex lastsApplied nextIndex and matchIndex  why it's fair game for them to be simply thrown away  if the server crashes and restarts

这些设定是值得你掉几根头发的, 想清楚commitIndex, lastsApplied, nextIndex 和 matchcIndex的用处, 你就能知道, 为什么当服务器崩溃重启后, 它们可以直接丢弃掉

这些设定足以让你抓耳挠腮，即为什么当服务器崩溃重启后, commitIndex, lastsApplied, nextIndex 和 matchcIndex可以直接丢弃掉



47.22 - 47.28

like why wasn't you know commit index  or last apply it like geez last applied is the record of how much we've executed 

lastApplied代表的是我们目前执行的进度



47.29 - 47.30

right if we throw that away

如果我们将它丢弃

47.30-47.33

 aren't we gonna execute log entries twice and is that correct 

那么我们就会执行这个日志条目两次，并且这样是对的



47.32 - 47.39

how about that why is it safe to throw away last applied

那么为什么将lastApplied丢掉是安全的呢？



47.46 - 47.56

yes I am we're all about simplicity and safety here with raft

这些都是关于raft的简单性和安全性

 

47.57 - 48.00

so that's exactly correct

So，你说的完全正确



48.00 - 48.06

 the the reason why all that other stuff can be non-volatile as you mentioned, I mean sorry volatile 

正如你刚才所提到的，为什么这些其他东西都可以是volatile的原因是什么呢？



48.06 - 48.09

the reason why those other fields can be volatile and thrown away

之所以其他字段都是volatile并且可以丢弃的原因是因为




48.10 - 48.19

 is that we can the leader can reconstruct sort of what's been committed by inspecting its own log and by the results of append entries that it sends out to the followers

是因为leader可以通过检查它自己的日志，以及它发送给follower的AppendEntries的结果来重构哪些日志条目已经被提交了



48.19 - 48.2

 I mean initially the leader if it if everybody restarts because they experienced a power failure

如果所有服务器都重启了，因为它们都遇上了供电故障



48.23 - 48.27

initially the leader does not know what's committed what's executed

一开始，leader并不清楚哪些被提交了，哪些被执行了



48.27 - 48.29

but when it sends out log and append entries

但当它对外发送日志和AppendEntries时



48.29 - 48.32

it'll sort of gather back information and essentially from the followers

它就会从follower处收集信息



48.32 - 48.38

 about What's in how much of their logs match the leaders  and therefore how must have been committed before the crash

通过这些信息，leader就可以知道这些服务器上有多少日志是和leader的日志所匹配，因此它也就知道在崩溃之前，有多少日志被提交了（follower也就自然知道了执行进度）





48.38 - 48.43

another thing in the figure 2 world which is not the real world

在figure 2的世界中（这里说的并不是真实的世界）所提到的另一个东西是





48.43 - 48.44

another thing about figure two is that

figure 2中所提到的另一件东西就是

48.45 - 48.46

figure two assumes 

figure 2中假设了一种情况

48.46-48.53

that the application state is destroyed and thrown away，if there's a crash and restart

如果服务器崩溃并重启了，application state就会被破坏并被丢弃

48.53-48.56

so the figure two world assumes that while log is persistent 

So，在figure2中，它假设日志是被保存了的



48.56 - 49.02

that the application state is absolutely not persistent required not to be persistent in figure 2 

在figure 2中，application state并没有被要求是持久化的



49.02 - 49.10

because the in figure 2 the log is preserved persisted from the very beginning of the system

因为在figure 2中，日志是从系统一开始运行的时候就被保存，或者说被持久化了



49.10 - 49.18

 and so what's going to happen if you sort of play out what the various rules in figure 2 after a leader restart

如果你弄清楚了figure 2中的不同规则，当leader重启了，那么会发生什么呢？


49.18 - 49.26

is that the leader will eventually re-execute every single log entry that is handed to the application 

leader最终会重新执行每个被提交给应用程序的日志条目



49.26 - 49.29

you know starting with log entry one after a reboot

当leader重启后，它会从日志条目1开始执行



49.29-49.33

it's the raft is gonna hand the application every log entry starting from one 

raft会去从应用程序的第一个日志条目处开始处理




49.33 - 49.44

and so that will after a restart the application will completely reconstruct its state from scratch by a replay from the beginning of the time of the entire log after each restart 

So，当服务器每次重启后，应用程序会通过从头执行整个日志来重构它的state



49.44 - 49.48

and again that's like a sort of straightforward elegant plan

这是一种简单明了的方案



49.49 - 49.55

but obviously potentially very slow

但很明显这种方案速度很慢



49.56 - 49.57

which brings us to the next topic 

好了，我们来看下一个话题



49.58 - 50.03

which is log compaction and and snapshots 

我们要讲的是日志压缩和snapshot（快照）



50.04 - 50.07

and this has a lot to do with lab 3b actually

实际上，你们会在lab 3b中处理很多这种东西



50.07 - 50.12

 you'll see log compaction and snapshots  in lab 3b 

你们会在lab 3b中看到日志压缩和快照



50.13 - 50.19

and so the problem that log compaction and snapshotting is solving a raft is that

So，通过日志压缩和快照在raft中所解决的问题是

50.19-50.22

indeed for a long-running system that's been going for weeks or months or years

对于那种长期运行的（运行了几周，几个月或者几年）系统来说





50.22 - 50.25

if we just follow the figure 2 rules

如果我们只按照figure 2中的规则办事



50.25 - 50.26

the log just keeps on growing

那么日志的大小只会不断地增加

50.26-50.29

may end up you know millions and millions of entries long 

可能最终会有数百万个日志条目



50.29 - 50.31

and so requires a lot of memory to store

So，这就需要大量的内存去存储这些条目



50.31 - 50.33

if you store it on disk

如果你将它保存在磁盘上

50.33-50.36

 like if you have to persist it every time you persist the log 

如果你每次都得对日志进行持久化



50.35 - 50.38

it's using up a huge space on disk 

它就会占用磁盘上的大量空间



50.38 - 50.40

and if a server ever restarts

如果服务器重启了



50.40- 50.46

 it has to reconstruct its state by replaying these millions and millions of log entries from the very beginning 

那么它就得通过重新从头执行这上百万条日志条目，以此来重构它的state



50.46 - 50.53

which could take like hours for a server to run through its entire log  and reexecute it，if it crashes and restarts

对于服务器来说，如果它崩溃并重启了，那么运行并重新执行整个日志，可能需要花掉数小时





50.53 - 50.56

 all of which is like similar what kind of wasted

我们所做的这些事情，某种意义上有点浪费

50.56-50.57

because before it crashed

因为在它崩溃之前

50.57-50.59

 it had already had applications state 

它已经有了application state



50.59 - 51.08

and so in order to cope with this

So，为了应付这种情况




51.08 - 51.10

raft has this idea of snapshots

于是，raft就使用了这种快照的思想



51.11 - 51.22

 and the sort of idea behind snapshots is to be able to save  or ask the application to save a copy of its state as of a particular log entry 

快照背后的思想是能够让应用程序将它自己的state的副本作为一个特定的日志条目来保存



51.20 - 51.24

so we've been mostly kind of ignoring the application

So，大部分情况下我们都忽略了应用程序

1040

51.24 - 51.32

but the fact is that you know if we have a suppose we're building a key value store  under raft

但事实上是，如果我们在raft下构建了一个key/value存储


51.30 - 51.37

you know the log is gonna contain a bunch of you know putting gets or read and write request

正如你们知道的那样，日志中会保存一大堆请求，比如put和get请求或者是读和写请求


51.37 - 51.43

so maybe a log contains you know a put that some client wants to set X to one

So，日志中可能包含了些put请求，比如某个client想设置x=1


51.43- 51.45

and then another one where it says X to 2

另一个client想将x设置为2



51.44 - 51.48

and then you know y equals 7 or whatever

接着，y=7



51.48 - 51.51

 and if there's no crashes 

如果没有任何崩溃发生

51.51-51.53

as the raft is executing along

raft就会沿着日志执行

51.53 - 51.57

there's going to be this if the layer above Raft there's going to be this application

在raft层之上的是应用层



51.57-52.00

 and the application if it's a key value store databases 

如果该应用程序是一个key/value存储数据库


52.00 - 52.02

it's going to be maintaining this table

那么它就会去维护这个表





52.02 - 52.07

 and as raft hands it one command after next

当raft将命令一个接一个的提交给应用程序


52.07-52.09

 the applications going to update its table

应用程序就会去更新这张表



52.09 - 52.11

 so you know after the first command it's going to set X to one

当提交了第一个命令，数据库就会将x设置为1




52.12 - 52.18

and it's stable after the second command it's going to update its table you know

当提交了第二个命令，它就会将x变为2



52.19 - 52.22

one interesting fact is that for most applications

对于大部分应用程序来说，其中一个令我们感兴趣的事实是



52.22 - 52.28

 the application state is likely to be much smaller than the corresponding log 

application state要远比其对应的日志来的小





52.28 - 52.37

right, at some level we know that the the you know the log and the state  are the log in that and the state at some point in the log are kind of interchangeable 

在某些时候，log和state是可以是互换的





52.37 - 52.42 *****

right, they both sort of implied the same thing about the state of the application 

它们所暗示的都是关于应用程序状态的同一件事

这其实就是在暗示，日志与应用程序状态是同一件事


52.42 - 52.47

but the log may contain a lot of you know a lot of multiple assignments to x 

但日志中可能包含了大量对x进行复制的条目

对于X的请求任务

但日志中可能包含了大量对x进行赋值操作的条目（知秋注：状态中x只有这一个值）



52.48 - 52.48

they use up a lot of space in the log

这些条目占据了日志中的不少地方




52.49 - 52.52

 but are also to effectively compact it down to a single entry in the table 

但我们也能够有效的将它压缩为单个条目来对应表中的这个状态值



52.52 - 52.56

and that's pretty typical of these replicated applications

这就是replicated application中相当典型的案例





52.56 - 52.58

but the point is that

但此时的重点在于

52.58-53.02

instead of storing the log which may go to be huge 

这里我们不会去保存日志，因为它可能会非常巨大




53.02 - 53.07

we have the option of storing instead the table which might be a lot smaller 

相反，我们可以选择去保存这个表，它的体积可能会更小



53.08 - 53.08

and that's what the snapshots are doing 

这就是快照所做的事情



53.09 - 53.16

so when raft feels that it's log has gotten to be too large 

So，当raft觉得它的日志变得太大了



53.16 - 53.20

you know more than a megabyte or ten megabytes or whatever some arbitrary limit

比如，1MB或10MB甚至更大




53.21 - 53.28

raft will ask the application to take make a snapshot of it the application state, as of a certain point in the log

raft会要求应用程序通过日志中的某一个点所对应的application state来制作一个快照




53.28 - 53.32

so if raft asked the application for a snapshot reference

So，如果raft要问应用程序拿一个snapshot reference



53.33 - 53.35

 it would pick a point in the log that the snapshot referred to 

raft会从日志中找到这个快照所引用的那个点

raft会从日志中选择一个点指向快照（知秋注：所对应的地址，磁盘中的位置或者网络中的某个存储快照的地址）

53.36 - 53.39

and require the application to produce a snapshot as at that point 

并要求应用程序制作该点的一个快照



53.40 - 53.41

this is extremely critical

这非常关键



53.41 - 53.45

because what we're about to do is throw away everything before that point

因为我们要做的事情就是丢掉该点之前的所有东西



53.45 - 53.48

 so if there's not a will to find point that corresponds to a snapshot

So，如果我们无法找到对应该快照的那个时间点



53.48 - 53.51

then we can't safely throw away the log before that point

那么我们就无法安全的丢掉该点之前的日志


53.52 - 53.59

 so that means that Raft is gonna have you know ask for snaps on the snapshot it's basically just the table 

So，简单来讲，快照就是一个表




53.58 - 54.02

it's just about a database server

它就是一个数据库服务器



54.02 - 54.07

 and we also need to annotate the snapshot with the entry number that are corresponds to you

我们也需要标记该快照所对应的entry号




54.08 - 54.12

 so it's basically you know if the entries are 1 2 3 

我们把这些entry标记为1、2和3




54.12 - 54.17

this snapshot corresponds to just after log index 3 

这个快照所对应的就是log index 3之后的东西

这个快照的内容就是对应log index3 处理后状态



54.18 - 54.22

with the snapshot in hand if we persist it to disk raft persistent to disk

如果我们将手上的快照通过raft持久化到磁盘




54.23 - 54.28

raft never again will need this part of the logs 

raft就永远不需要这部分日志了





54.31 - 54.34

and it can simply throw it away 

它就可以简单的扔掉这些日志了






54.34 - 54.42

as long as it persists a snapshot, as of a certain in debt log index, plus the log after that index 

只要存储了快照，就存储索引对应的状态内容再加上索引后面的log



54.42 - 54.46

as long as that's persisted to disk, we never going to need to log before that

只要快照持久化到磁盘了, 我们就永远不需要该index之前的日志了



54.46 - 54.48

and so this is what RAFT does

So，这就是raft所做的事情



54.49 - 54.51

the RAFT ask the application for snapshot 

raft要求应用程序去制作快照



54.51 - 54.52

gets the snapshot

拿到快照

54.52-54.54

 saves it to disk with the log after that it just throws away this log here 

将快照以及该log index之后的日志保存到磁盘，该log index之前的东西就全部丢掉了



54.55 - 54.57

right





54.58 - 55.07

and so it really operates or the sort of persistence story is all about pairs of a snapshot in the log after that  after the point in the log associated with snapshot

这种持久化方式是有效的，它的要求是log快照与其index后面log是成对存在的



55.07 - 55.10

everyone see this

都懂了吗？



55.10 - 55.12

yes

请讲



55.24 - 55.27

no it's still it's it's you know there's






55.27 - 55.30

these sort of phantom entries one two three

这些是魅影条目1、2和3 （知秋注：已经废弃掉的日志条目，暂以魅影条目称之）




55.30 - 55.32

 and this you know suffix of the log is indeed  viewed as still the it's





55.33 - 55.37







55.37 - 55.43

maybe the right way to think of it is still there's just one log  except these entries are sort of phantom entries

我们可以将除了这个三个魅影条目以外的东西看作是一个日志



55.43 - 55.47

we that we can view as being kind of there in principle 

我们可以将它看作是一种原则



55.48 - 55.49

but since we're we never need to look at them

但因为我们永远不需要看这些魅影条目

55.49-55.51

because we have the snapshot

因为我们有了快照



55.51 - 55.56

 the fact that they just happened not to be stored anywhere is neither here nor there

事实上，这些魅影条目已经不存在于任何地方了



55.57 - 56.00

 but it's but, yeah you should think of it as being still the same log

但你应该依然将它看做是同一个日志文件



56.01 - 56.04

 it's just not just threw away their early entries 

我们只是将这些早期的条目给扔掉了



56.04 - 56.06

did this, that's a maybe a little bit too glib of an answer 

这个答案可能有点蠢

牵强



56.06 - 56.11

because the fact is that figure two talks about the log N ways that makes it 

因为在figure2中，谈论了日志的多种形式及实现方式



56.11 - 56.14

that if you just follow figure two you sometimes still need these earlier entries 

如果你遵循figure 2，那么你有时候依然得需要这些早期的条目

56.15 - 56.17

and so you'll have to reinterpret figure two a little bit in light of the fact 

So，你必须根据事实来重新解释figure 2



56.18 - 56.23

that sometimes it says blah blah blah a log entry where the log entry doesn't exist 

有时你要解释为啥log entry不存在了



56.24 - 56.32

okay





56.39 - 56.42

okay, and so what happens on a restart

So，服务器重启的话，会发生什么呢？



56.43 - 56.47

so the restart story is a little more complicated in it than it used to be with just a log 

So，关于重启这块要比刚才说的日志方面的东西要来得复杂得多


56.47 - 57.01

what happens on a restart is that there needs to be away for raft to give the latest for raft to find the latest snapshot log pair on its disk and hand the snapshot to the application 

raft会找到磁盘上最新的snapshot-log pair，并将快照提交给应用程序






57.01 - 57.05

because we no longer are able to replay you know all the log entries

因为我们没法去重新执行这些这些日志条目（指的是被丢弃的1，2和3）




57.05 - 57.08

so there must be some other way to initialize the application basically

So，简单来讲，我们得通过其他一些方式去初始化应用程序



57.08 - 57.12

not only is the application have to be able to produce a snapshot of application state 

应用程序不仅能够生成application state的快照



57.12 - 57.20

but it has to be able to absorb a previously made snapshot and sort of reconstruct its table in memory from a snapshot

但它也必须能够去使用之前做好的快照，通过快照在内存中重建它的表



57.20 - 57.23

and so this now even though raft is kind of managing this whole snapshotting stuff 

So，raft能够管理这整个快照

57.23-57.27

the snapshot contents are really the property to the application 

快照中的内容其实就是应用程序的属性



57.28 - 57.31

and RAFT doesn't even understand what's in here only the application does

raft并不理解应用程序做了什么事情



57.31 - 57.34

 because it's all full of application specific information

因为这些都是针对应用程序的信息





57.34 - 57.36

 so after a restart

So，重启之后

57.36-57.41

 the application has to be able to absorb the latest snapshot that raft found

应用程序必须能够使用raft所找到的最新版本的快照



57.45 - 57.48

so for, just this simple it would be simple

So，快照就这么简单



57.48 - 57.59

unfortunately this snapshotting and in particular the idea that the leader might throw away part of its log introduces a major piece of complexity

不幸的是，快照以及leader会扔掉它日志中的部分内容的这种想法增加了复杂度




57.59 - 58.03

and that is that if there's some follower out there

如果此处有些follower的话




58.03 - 58.11

 whose log ends before the point at which  the leaders log starts

如果这些follower的日志在leader日志开始的地方之前就结束了



 

58.12 - 58.16

 then unless we invent something new，  we need many InstallSnapshot

那么除非我们引入些新的概念, 否则我们就需要进行很多InstallSnapshot RPC





58.16 - 58.20

unless we invent something new that follower can never get up-to-date, right

除非我们发明了些新东西，否则follower的state就永远没法保持最新










58.20 - 58.27

because if the followers you know if there's some follower whose log only is the first two log entries

如果follower的日志只是前两个日志条目的话


58.26 - 58.29

 we no longer have the log entry three

我们已经丢掉了这里的日志条目3

58.29-58.38

 that's required to send it to that follower in an append entries RPC to allow its log to catch up to the leaders 

我们需要将它通过AppendEntries RPC发送给该follower，以此让它的日志跟上leader的日志




58.40 - 58.47

now, we could avoid this problem by having the leader never drop part of its log 

现在，我们可以让leader永远不drop掉这部分日志，以此来避免这个问题

58.47 - 58.55

if there's any follower out there  that hasn't caught up to the point at which the leader is thinking about doing a snapshot

如果这里有任何follower进度并没有跟上leader的快照的进度



58.55 - 58.59

 because the leader knows through next index

因为leader可以通过nextIndex知道



58.59- 59.01

well, actually leader doesn't really know

Well，实际上leader并不是真的清楚



59.00 - 59.05

but the leader could know in principle how far each follower has gotton

但从原则上讲，leader可以知道每个follower的进度到哪了



59.05-59.12

and leader could say well I just never drop the part of my log before the end of the follower with the shortest log

leader表示，进度慢的那位同学别着急，我会等你的

leader表示，它永远不会丢掉有着最短日志的follower末尾的那部分日志




59.12 - 59.15

 and that would be okay

这样是Ok的

59.15-59.18

 they might actually just be a good idea period

某一时期这实际上可能是一个好想法



59.19 - 59.21

the reason why that's maybe not such a great idea is that

之所以它不是一个很棒的想法的原因是



59.21 - 59.25

 of course if a follower shut down for a week 

如果某个follower服务器关闭了一周



59.25 - 59.28

you know it's not gonna be acknowledging log entries and

它就不会去确认日志条目



59.28 - 59.33

that means that the leader can't reduce its memory use by snapshotting

这就意味着leader无法通过快照来减少它的内存使用量



59.34 - 59.35

so, the way the raft designs chosen to go is

So，在raft中我们所使用的做法是



59.36 - 59.42

that the leader is allowed to throw away parts of its logs that would be needed by some follower 

我们允许leader丢掉某些follower所需要的部分日志




59.43 - 59.50

and so we need some other scheme that append entries to deal with the gap between the end of some followers log and the beginning of the leaders log 

So，我们需要某些其他scheme来追加日志条目，以此来处理某些follower日志末尾和leader日志开头之间的空白（知秋注：这里指follower日志末尾的时间小于leader日志开头时间）




59.50 - 59.54

and so that solution is the install snapshot RPC 

So，这里的方案就是InstallSnapshot RPC



==========================================================



59.50 - 59.54

and so that solution is the install snapshot RPC 

So，这里的方案就是InstallSnapshot RPC



1.00.01 - 1.00.07

and the deal is that when a leader we have some follower whose log is that 

处理方式是，当leader嗯，有些follower它们的log的情况是（实在是太落后了）



1.00.08 - 1.00.11

you know just powered on its log as short

接入Raft服务时, 它们的log很短



1.00.11 - 1.00.13

 the leaders gonna send it an append entries 

leader会向follower发送AppendEntries



1.00.14 - 1.00.15

and you know it's gonna be forced the leaders gonna be forced to backup

leader会被强制备份log到follower的log

leader会强制将它的log备份到follower的log中

1.00.15 - 1.00.23

and at some point the leader you know failure  or fail dependent recalls will cause the leader to realize it

某些时候leader发生了故障，失败相关的信息会让leader意识到

某些时候因为follower的一些自身故障，它返回的失败信息会让leader意识到


1.00.23 - 1.00.24

 it's reached the beginning of the actual log its doors 

follower的log已经落后它（leader）log的起始位置

处于快照信息后的log起始位置



1.00.24 - 1.00.27

and at that point instead of sending in append entries

这时leader就应该取消AppendEntries RPC的调用


1.00.27 - 1.00.32

 the leader will send its current snapshot  plus current log  

leader会发送它的当前快照加上当前日志




1.00.32 - 1.00.35

well, send its current snapshot to the follower

Well，leader会发送当前快照给follower

1.00.36 - 1.00.41

 and then presumably immediately follow it  with an append entries  that has the leaders current log

然后，follower会通过一个AppendEntries，立即跟上leader的进度，该AppendEntries包含了leader的当前日志

然后，leader紧接着InstallSnapshot RPC，立即调用一个AppendEntries rpc，该AppendEntries包含了leader的当前日志



五十  阅举报
7-04






1.00.46 - 1.00.48

questions

有问题吗？


1.00.52 - 1.01.01

yeah I'm the sad truth this is like this is adds significant complexity here to your lab 3

可悲的是，这里给你们的lab 3增加了很多复杂性

1.01.01-1.01.06

partially because of the kind of cooperation that's required between raft 

部分原因是因为raft之间需要这种合作



1.01.06 - 1.01.09

this is sort of a little bit of a violation of modularity it

这就有点违反模块化

1.01.09-1.01.11

it requires a good deal cooperation 

这就需要很多合作了



1.01.12 - 1.01.13

like for example when an install snapshot comes in 

比如，调用InstallSnapshot RPC



1.01.13 - 1.01.19

it's delivered to raft， but raft really requires the application to absorb the snapshot 

快照会被传到raft中，但raft需要follower的应用程序去使用该快照

1.01.19-1.01.25

so they have to talk to each other more than they otherwise might 

So，它们之间得进行多次通信

1.01.25-1.01.26

yes

请讲

1.01.32-1.01.37

the question is that this is the way the snapshot is created dependent on the application

So，他的问题是快照的创建取决于应用程序

1.01.37-1.01.38

it's absolutely yes

说的没错

1.01.38-1.01.43

 so the snapshot creation function is part of the application  as part of like the key value server 

So，创建快照的函数是应用程序的一部分，也就是key/value服务器的一部分





1.01.43- 1.01.46

so raft you know somehow call up to the application and say geez

So，raft会以某种方式调用应用程序，并表示



1.01.46 - 1.01.49

you know I really like a snapshot right now in the application

我希望得到一份当前应用程序的状态快照



1.01.49 - 1.01.53

 because only the application understands what it's status

因为只有应用程序才理解它的状态是什么



1.01.53 - 1.02.03

and you know the inverse function by which an application reconstructs a state from a snapshot files also totally application dependent 

这个inverse功能可以让一个应用程序根据一个快照文件来重构它的状态，这也完全取决于应用程序



1.02.03 - 1.02.06

where there's intertwining 

这会让它们交织在一起

1.02.07-1.02.11

because of course every snapshot has to be labeled with a point in a log that it corresponds to

因为每个快照都必须被标记上它所对应的那个日志点



1.02.25 - 1.02.28

talking about rule six and figure thirteen

你们说的是rule 6和figure 13么？



1.02.36 - 1.02.40

 okay so yeah the question here is that 

Ok，So，这里的问题是


1.02.40-1.02.43

and you will be faced with this in lab three 

你们会在lab 3中遇到这个问题

1.02.43-1.02.49

that because the RPC system isn't perfectly reliable and perfectly sequenced 

因为rpc系统并不是完全可靠，调用过程中也不是完美地有序

1.02.49-1.02.52

and RPC's can arrive out of order or not at all 

这些rpc请求可以有序地到达，也可以乱序到达



1.02.52-1.02.54

or you may send an RPC and get no response

或者，你可能发送了一个rpc，但没有得到回应

1.02.54-1.02.55

 and think it was lost 

并且认为它已经丢失了

1.02.55-1.02.58

but actually was delivered and was the reply that was lost 

但实际上该rpc已经到达目的地，但对方的回应在半路上丢了

1.02.58-1.03.04

all these things happen including to send to whatever installsnapshot rpc

所有的事情都已经发生了，包括发送这个installSnapshot RPC

1.03.04-1.03.08

and the leaders almost certainly sending out many rpcs concurrently 

几乎可以肯定的是，leader会对外并发发出许多个RPC



1.03.08 - 1.03.11

you know both append entries and install snapshots

既有AppendEntries，也有install snapshot

1.03.11-1.03.23

 that means that you can get things like install snapshot rpc from deep in the past almost anything else right 

就是说follower可能会收到过期请求



1.0323-1.03.28

and therefore the the follower has to be careful

因此，follower应当注意点

1.03.28-1.03.33

 you know has to think carefully about an install snapshot that arrives 

它必须仔细考虑到达的install snapshot

1.03.33-1.03.40

I think the specific thing you're asking is

我觉得你所要问的事情是

1.03.40-1.03.45

 that if follower receives that an install snapshot  that appears to be completely redundant

如果follower接收到了一个似乎完全多余的install snapshot

1.03.45-1.03.51

 that is the install snapshot contains information that's older than the information the follower already has

这个install snapshot中包含了比follower已经拥有的信息还要古老的信息

1.03.51-1.03.53

what should the follower do

那么follower应该做什么呢？

1.03.53-1.03.57

 and rule six and figure thirteen says something 

rule 6和figure 3说了些这方面的东西

1.03.57-1.04.05

but I think equally valid response to that is that the follower can ignore a snapshot that clearly is from the past

但我认为对此同样有效的响应是，follower可以忽略一个明显过时的快照

1.04.05-1.04.09

 I don't really understand that rule six 

其实我也不太理解rule 6所说的东西

1.04.09-1.04.12

okay 



1.04.12-1.04.19

I want to move on to sort of somewhat more conceptual topic for a bit 

现在我想去讲一些更为概念性上的话题

1.04.19-1.04.28

so far we haven't really tried to nail down anything about what it meant to be correct

到目前为止，我们还没有试着真正去讨论任何关于正确性的话题



1.04.28 - 1.04.37

what I meant for a replicated service already any other kind of service to be behaving correctly 

我所指的是，对于一个replicated service，或者其他任意类型的service来说，要正确工作



1.04.37 - 1.04.43

and the reason why and you know whatever for most of my life

在我的工作生涯中

1.04.43-1.04.47

 I managed to get by without worrying too much about precise definitions of correctness

我所管理过的东西都是不需要太过关心正确性

我所负责的系统不会过度纠结数据一致性

1.04.47-1.04.53

 but the fact is that you know if you're trying to optimize something or you're trying to think through some weird corner case

但事实上，如果你试着去优化某些东西，或者是想试着去处理某些奇怪的个别案例

1.04.53-1.05.00

it's often handy to actually have a more or less formal way of deciding is that behavior correct or not correct

通过一种或多或少正式的方式来判断行为的正确与否，这通常是很便利的

1.05.00-1.05.08

 and so you know for here what we're talking about is you know clients are sending in requests to the to our replicated service with rpc

对于此处我们所讨论的情况来说，Client端会将rpc请求发送给我们的replicated service

拿此处我们所讨论的情况来说，client端会发送请求给我们的replicated service

1.05.08-1.05.14

maybe they'll be sending who knows well maybe the service is crash it can be starting and you know loading snapshots or whatever 

可能它们所要发送的服务崩溃重启了，或者是在加载快照之类的

Client端发送请求时，可能会发生 服务挂掉了，或者服务正在启动并加载数据 等情况

1.05.14-1.05.16

the client sends in a request and gets a response

Client端发送一个请求，并得到一个响应

1.05.16-1.05.23

like is that response correct how are we supposed to how are we supposed to tell whether response a would be correct or response B

那么我们该如何判断响应A是正确的还是响应B是正确的

1.05.23-1.05.26

so we need a notion

So，我们需要一个概念

1.05.26-1.05.30

 we need a pretty formal notion of distinguishing oh that's okay from now that would be a wrong answer

我们需要一种能够分辨出结果正确与否的正式概念


1.05.30 - 1.05.37

 and for this lab the our notion of correctness is linearizability 

在这个lab中，我们对正确性的定义就是linearizability（线性一致性）

1.05.37-1.05.48

and I mentioned strong consistency and some of the papers I mentioned strong consistency  and basically equivalent to linearizability

我之前提过强一致性，某些paper中也有提到过强一致性，简单来讲，它等同于线性一致性

1.05.48-1.05.55

 linearizability is a sort of a formalization of more or less of the behavior 

线性一致性是一种形式化的表现

1.05.55-1.06.05

you would expect if there was just one server and it didn't crash and it executed the command client requests one at a time and you know nothing funny ever happened 

如果我们有一台服务器，它没有发生崩溃，并且它一次执行一个client端请求里的命令，你知道，服务器在这种情况下运行的时候，不会发生什么奇怪的事情

1.06.05-1.06.10

so it has a definition 

So，这里有一个定义

1.06.10-1.06.14

and the definition I'll write out the definition then talk about it 

我先把定义写一下，然后再来讨论这个


1.06.14-1.06.28

so an execution history is linearizable

So，执行历史记录是linearizable的

1.06.28-1.06.29

this is in the notes

这个在笔记中有讲

1.06.29-1.06.32

if there exists a total order 

如果这里存在了一个完整的顺序

1.06.32-1.06.36

so an execution history is a sequence of client requests 

So，执行历史记录其实就是Client端的请求序列



1.06.36 - 1.06.38

maybe many requests from many clients

它里面包含了来自许多Client端的请求


1.06.38-1.06.55

if there's some total order of the operations in the history，it matches the real-time order of requests

如果历史记录中某些操作的顺序和这些操作所对应的请求的实时顺序匹配

1.06.55-1.06.58

so if one request if client sends out a request and gets a response 

如果client对外发送了一个请求，并得到了一个响应

1.06.58-1.07.01

and then later in time

接着之后

1.07.01-1.07.03

another client sends out a request and I get a response

另一个Client发送了一个请求，并得到了一个响应

1.07.03-1.07.05

 those two requests are ordered

这两个请求都是按顺序的



1.07.05 - 1.07.08

because one of them's started after the other one finished

因为一个请求会在另一个请求执行完后开始执行

1.07.08-1.07.16

so it's linearizable history is linearizable if there exists an order of the operations in the history 

如果在历史记录中存在的操作是有顺序的，那么这个历史记录就是linearizable的

1.07.16-1.07.25

that matches real-time for non concurrent requests 

历史记录中这些请求的顺序和非并发的请求的实时顺序是匹配的



1.07.25-1.07.27

that is for a request to didn't overlap in time

对于这个请求来说，在时间上它不会和其他请求重叠

1.07.27-1.07.50

 and each read you can think of it as each read sees the value from the most immediately preceding write to the the same piece of data

你可以将其想象为每次读取都会看到前一次写入同一数据的最近一次的值

1.07.50-1.08.01

most recent write in the order

在整体顺序中，最接近该读请求的前一个写请求

1.08.01-1.08.08

 all right




1.08.08 - 1.08.09

So this is the definition

So，这就是它的定义

1.08.09-1.08.12

let me illustrate what it means by running through an example

让我来通过一个例子来解释它是什么



1.08.12 - 1.08.15

so first of all the history is a record of client operations

So，首先历史记录指的是Client操作的历史记录



1.08.15 - 1.08.19

 so this is a definition that you can apply from outside 

So，你们可以将这个定义用在外部

1.08.19-1.08.25

this definition doesn't appeal in any way to what happens inside the implementation or how the implementation works

我们并不关心该定义的实现方案中会发生什么，或者说我们并不关心这个实现方案该如何进行工作



1.08.25 - 1.08.32

 it's something that we can if we see a system operating  and we can watch the messages that come in and out

如果我们看到一个系统正在执行操作，我们就可以看到这些进进出出的消息

1.08.32-1.08.36

 we can answer the question was that execution that we observe linearizable 

这样我们就可以回答我们所观察到的执行是否是linearizable的了

1.08.36-1.08.49

so let me write out of history and talk about why it is or isn't linearizable

So，先让我写下执行的历史记录，然后再来说说它是不是linearizable的

1.08.49-1.08.56

all right so here's an example 

So，来看个例子

1.08.56-1.09.06

the linearlizability talks about operations that start at one point and end at another

线性一致性讲的是在一个时间点开始执行某个操作，然后在另一个时间点结束执行该操作



1.09.06-1.09.12

and so this corresponds to the time at which a client sends a request and then later receives a reply 

So，这对应了一个client发送请求的时间点，以及稍后它接收到返回响应的时间点

1.09.12-1.09.15

so let us suppose that our history says

So，假设我们的历史记录是这样的


1.09.15-1.09.24

 that at at some particular time this time some client sent a write request for the data item named X  and asked for it to be set to 1

在某一时刻，某个client发送了一个写请求，它想将x设置为1

1.09.24-1.09.28

and then time passed 

随着时间的流逝


1.09.28-1.09.31

and at the second vertical bar is when that client got a reply 

在第二条竖线所对应的时间点处，该client收到了一条回复

1.09.31-1.09.32

through send a request at this point 

该client在该时间点处发出一个请求

1.09.32-1.09.34

you know time pass who knows what's happening

随着时间的流逝，这里发生了一些事情

1.09.34-1.09.36

 when the client got a reply there 

然后，在第二条竖线所在时间点处，client拿到了一个回复

1.09.36-1.09.37

and then later in time 

接着之后

1.09.37-1.09.40

that client or some other client doesn't really matter

该client或者是其他client又做了某些操作，但是谁做的并不重要



1.09.40 - 1.09.46

sends a write request again for item X and value 2 and gets a response to that write

它又发送了一个写请求，它想将X的值设置为2，然后它得到了该写请求所对应的响应

1422

1.09.45 - 1.09.55

meanwhile some client sends a read for X  and gets value 2 

与此同时，某个client会发送一个读请求，它想去读x的值，并得到响应，即x的值为2


1.09.55-1.09.59

and sent the request there and got the response with value 2 there 

该client在左边这个时间点发送请求，右边这个时间点得到响应，拿到x的值为2



1.09.59-1.10.02

and there's another request that we observed 

然后，我们又观察到另一个请求

1.10.02-1.10.04

it's a part of the history

这是历史记录中的一部分


1.10.04-1.10.10

 request was sent to read value X and it got value 1 back

某个client发送读请求去读取x的值，它所读到的x值为1

1.10.10-1.10.14

and so when we have a history like this 

So，当我们有这样一个历史记录时

1.10.14-1.10.17

you know the question were that you asked about this history is

你刚才问的关于这个历史记录的问题是

1.10.17-1.10.19

is this a linearizable history

这是历史记录是linearizable的吗？

1.10.19-1.10.26

 that is did the machinery did the service did the system that produced this history and was that a linearizable system

生成这个历史记录的系统或者服务是linearizable的吗？

1.10.26-1.10.30

 or did it produce a linearizable history in this case

或者说这个例子中所生成的是一个linearizable history吗

1.10.30-1.10.32

if this history is not linearizable

如果该历史记录不是linearizable的


1.10.32 - 1.10.38

then the history we're talking about I have at 3 we know we have a problem

然后，我们现在所谈论的历史记录中在第三条记录中存在着一个问题

1.10.38-1.10.40

there must be some some bug

这里面必然存在着某些bug

1.10.40-1.10.44

 ok so we need to analyze this to figure out if it's linearizable

Ok，So我们需要分析这个，以此来弄清楚这个历史记录是不是linearizable的

1.10.44-1.10.49

linearizability  requires us to produce an order

线性一致性需要我们是有序的

1.10.49-1.10.54

you know one by one order of the four operations in that history 

即该历史记录中的四个操作是一个接一个，有序的

1.10.54-1.10.55

so we know we're looking for an order

So，我们知道我们所要找的是其中的顺序

1.10.55-1.10.57

and there's two constraints on the order 

在顺序这块有两个限制



1.10.57 - 1.10.59

one is

其中一点是

1.10.59-1.11.05

 if one operation finished before another started 

如果一个操作在另一个操作开始前结束

1.11.05-1.11.09

then the one that finished first has to come first in the history 

那么，这个先结束的操作会先落地到这个历史记录中


1.11.09 - 1.11.10

the other is 

另一点则是

1.11.10-1.11.15

if some read sees a particular written value 

如果某个读请求看到了一个特定的写入值



1.11.15-1.11.20

then the read must come after the write in the order

那么，这个读请求必然是在对应的写请求之后进来的



1.11.20 - 1.11.23

all right so we want to order

So，我们想找出其中的顺序

1.11.23-1.11.25

 so we're gonna produce an order that has four entries 

So，我们会生成一个有顺序的历史记录，它里面有4个条目



1.11.25- 1.11.26

the two writes and the two reads

即两个写操作和两个读操作



1.11.26 - 1.11.31 *****

I'm gonna draw with arrows that constraints implied by those two rules

我要用箭头来画出这两个规则所暗示的约束



1.11.31 - 1.11.35

and then our order is gonna have to obey these constraints 

然后，我们的顺序就必须遵守这些限制


1.11.35- 1.11.40

so one constraint is that this write finished before this write started

So，其中一个限制就是wx1必须在wx2开始前结束


1.11.40-1.11.48

 and therefore one of the ordering constraints is that this write must appear in the total order before this write

因此，其中一个顺序上的限制就是，在整个历史记录的顺序中，wx1必须出现在wx2之前

1.11.48-1.11.52

 this read saw the value of two

这个rx2请求会看到x的值为2

1.11.52-1.11.55

so in the total order 

So，在整体顺序中

1.11.55-1.12.01

the most recent write that this read must come after this write and this write must be the most recent write

这个rx2请求必须在wx2之后出现，那么这个wx2就是离它最近的写请求


1.12.01-1.12.10

 so that means that in the total order we must see the write of X - 2 and then after it the read of X it yields 2

这也就意味着，在整个顺序中，我们必须先看到wx2，然后才是rx2

1.12.10-1.12.19

and this this read of X of 1

对于此处的rx1

1.12.19-1.12.22

if we assume that the X did already have the value 1

如果我们假设x已经拥有的值是1


1.12.22-1.12.24

 there there must be in this relationship

那么，它们的关系必然是这样的



1.12.24 - 1.12.28

 and that is the read must come after the write

rx1必然在wx1之后出现

1.12.28-1.12.32

and this read also must be come before this write

rx1也必然在wx2之前出现

1.12.32-1.12.35

and maybe there's some other restrictions too

这里可能还存在着一些其他限制



1.12.35 - 1.12.40

anyway we can take these we can take this set of arrows and flatten it out into an order 

总之我们可以使用这些箭头关系，并整理该历史记录的顺序



1.12.40-1.12.41

and that actually works

这实际上可行

1.12.41-1.12.46

 so the order that's the total order that demonstrates that this history is linearizable 

如果这里所展示的历史记录是linearizable的话


1.12.45-1.12.49

is first the write of x - 1

首先就应该是wx1


1.12.49- 1.12.53

then the read of x yielding 1 

然后是rx1

1.12.53-1.12.58

then the write of x - 2 

接着是wx2


1.12.58-1.13.01

and the read of x that yields 2

最后是rx2

1.13.01-1.13.10

alright so the fact that there is this order that does obey the ordering constraints shows that this history is linearizability

So，事实证明，这里的历史记录中的顺序确实遵守了顺序性限制，因此，该历史记录是线性一致性的

1.13.10-

 and doesn't you know



1.13.10-1.13.19

if we're worried about the system that produced this history whether it's a but that system is linearizable

如果我们担心该系统生成的历史记录是不是线性一致性的，虽然这个系统是线性一致性的

1.13.19-1.13.26

 then this particular example we saw it doesn't contradict the presumption that the system is linearizable 

我们所看到的这个例子，它并没有与具备线性一致性能力的系统的假设相矛盾

1.13.26-1.13.30

any questions about what I just did 

对我刚才所做的有任何疑问吗？



1.13.41-1.13.54

each read sees you know read of X the value it sees must be them value written by the most the most recent proceeding right in the order

每次对x进行读取时，读请求所看到的x的值必然是在整个顺序中离它最近的对应的写请求所写入的值


1.13.54-1.14.00

 so you know in this case in this case we're totally ok with this order

So，在这个例子中，我们所写的这个顺序是没问题的


1.14.00-1.14.05

because this read the value it saw is indeed the value written by the most recent write in this order 

因为rx2所看到的值是在整个顺序中离它所对应的最近的wx2所提供的


1.14.05 - 1.14.11

and this read the value it sighs

rx1所看到的值是由wx1所提供的

1.14.11-1.14.12

informally 

非正式地讲

1.14.12*-1.14.16

it's that reads can't real should not be yielding stale data

这个读操作不可能获取过时的数据



1.14.16-1.14.18

if I write something in read back 

如果我想回过头去对这个变量写入数据

1.14.18-1.14.20

gosh I should see the value I wrote

那么我应该看到我所写入的这个值



1.14.20 - 1.14.23

and that's like a formalization of the notion that

这就是一种形式化的概念



1.14.23 - 1.14.33

oh yes oh yeah yeah 



1.14.33-1.14.42

all right let me let me write an example that's not indeed linearizable 

So，这里我给你们看个例子


1.14.42-1.14.44

so example two 

So，案例2


1.14.44-1.14.57

let's suppose our history is we had a write of X value one， write  X value two

假设，在我们的历史记录中，我们有wx1和wx2



1.14.57-1.15.17

and so this one we also want to write out the arrows 

So，这里我们将箭头画出来


1.15.17 - 1.15.23

and so we know what the constraints are on any total order we might find

So，我们就知道了我们所可能知道的任何顺序限制

So，我们就可以找到我们可能找到的任何前后顺序限制

1.15.23-1.15.26

  the write of X to one

先来看wx1这里

1.15.26-1.15.30

 because of time because it finished in real time before the write x 2 started 

因为wx1在wx2开始执行之前就完成了

1.15.30-1.15.36

and must come before in any satisfying order we produce

wx1必须在我们所生成的任何符合条件的顺序前出现

1.15.36-1.15.42

 the write of x two has to come before the right before the read of X that yields two 

wx2必须在rx2之前出现


1.15.42*-1.15.45

so we have this arrow

So，我们就会有这个箭头

1.15.45-1.15.50

the read of X 2 had to finished before the read of X to one started

rx2必须在rx1开始前完成


1.15.50-1.15.53

 so we have this arrow 

So，我们也就有了这个箭头



1.15.53 - 1.15.59

and the read of X to one

接着，再来看rx1

1.15.59-1.16.04

 because it saw value one has to come after the right of X1 

因为rx1必须在wx1之后出现

1.16.04-1.16.07

 and more crucially before the write of X 2 

更严格的来讲，rx1必须在wx2之前出现

1.16.07-1.16.14

right so we can't have this read of X yielding one if it's immediately preceded by I'll write out X 2 

如果wx2在rx1之前出现，那么我们就不可能有这个rx1了


1.16.15-1.16.19

so we also have this arrow like this

So，我们就会有这样的箭头



1.16.19 - 1.16.22

and because there's a cycle

因为这是一个循环

1.16.22-1.16.28

 in these constraints there's no order that can obey all these constraints

在这些限制条件中，没有任何一条合理的执行顺序是遵守所有这些限制条件的



1.16.28 - 1.16.32

 and therefore this history is not linearizable 

因为，该历史记录并不是linearizable的



1.16.32- 1.16.39

and so the system that produced it is is not a linearizable system 

So，生成该历史记录的系统并不是一个linearizable的系统



1.16.39 - 1.16.49

you know would be linearizable the history was missing any one of these three and I would break the cycle

如果该历史记录丢失这三个记录中的任何一个，那么就会打破这种循环，那么该历史记录就是线性化的了



1.16.49 - 1.16.50

 yes

请讲

1.17.00-1.17.01

 maybe 

可能是吧

1.17.01-1.17.06

I'm not sure

我并不确定

1.17.06-1.17.13

because suppose or I don't know how to incorporate very strange things like supposing somebody read 27

因为我不知道该如何合并这些非常奇怪的东西，比如假设有人读取了27



1.17.13 - 1.17.19

 you know it doesn't really if there's no write of 27

如果这里并没有写入27的操作



1.17.19- 1.17.25

a read of 27 doesn't at least the way I've written out the rules doesn't sort

那么读取27这个值的操作也不符合规则



1.17.25- 1.17.28

of well there may be some sort of anti dependency that you would construct

或者，你会构建出某种反依赖性的东西



1.17.28-end

 okay um I will continue this discussion next week

Ok，我会在下周继续这场讨论





五十  阅举报
