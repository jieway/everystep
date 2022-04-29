08-01
08 - Tree Indexes II
(CMU Databases Systems Fall 2019)
00:18 - 00:19
Sloping, I love it
00:20 - 00:22
Alright, let's get started
好了，让我们开始吧
00:23 - 00:26
Alright, let's talk about let's let's get right into it
好了，让我们开始讨论吧
00:26 - 00:30
So again thanks for DJ drop tables hold it down, that was awesome ,thank you
So，再次掌声有请DJ Drop Tables
00:33 - 00:39
How are you? are you still having that police problems or everything okay
你过得如何？你的案⼦是不是还没完？还是⼀切都Ok？
00:41 - 00:43
Do you need a good lawyer in town
你需要找个好律师么
0.43-0.44
because I have one
因为我就认识⼀个
0.44-0.50
well my PG students got in trouble for legs leg whatever minor
Well，之前我负责的研究⽣就遇上事了，还是我帮他找的律师
00:50 - 00:52
So we have somebody we can help you out okay
总之，我们能找⼈帮你
00:52 - 00:58
No never okay, good all right, so let's let's how about database ,so real quickly
So，让我们讨论下数据库，快速回顾下之前的东⻄
00:59 - 01:04
The we have a talk today at 4:30 p.m.
我们今天下午四点半有⼀场讲座
01:04 - 01:09
So this is one of the head engineers from Vertica is come to give a talk
So，Vertica会让它公司的⼀名⾸席⼯程师来给我们进⾏⼀场讲座
01:09 - 01:12
So vertica I believe it not has a small development branch here in in Pittsburgh
So，我相信，Vertica在匹兹堡并没有⼀个⼩型的开发分⽀团队
01:13 - 01:16
And so Steve is gonna come and talk about some of the things that they've been
working on
So，Steve会跟我们谈论下他们⽬前为⽌所做部分的事情
1.16-1.20
Vertica is a disk based distributed column store database
Vertica是⼀个基于磁盘的分布式列式存储数据库
01:20 - 01:23
You gots a bunch of words, we've been through around throughout the entire semester
在这整个学期⾥，我们已经学到了很多名词
01:23 - 01:26
But it means it runs multiple nodes, it's a column store
但这意味着它会以多节点的⽅式运⾏，它是列存储型数据库
1.26-1.29
and it assumes the primary search location of the database is on disk
并且它假设数据库的⾸要搜索位置是在磁盘上
01:29 - 01:34
So it's not the it's one of the first column stores that came out in the mid-2000s
So，Vertica并不是第⼀个在2000年代所推出的列式存储数据库
1.34-1.39
that sort of that began the wave of column store database
但它掀起了列式存储数据库的热潮
01:39 - 01:42
So columon store databases aren't really that rare now
So，现如今，列式存储数据库并不少⻅
01:42 - 01:45
But back in it back when Vertica came out in 2006
但在2006年，Vertica刚出现的时候
1.45-1.51
that was considered a that was a sort of a major technological breakthrough
它被认为是主流技术上的⼀种突破
01:51 - 01.55
So Stephens good guy, if you want to talk about the kind of things that they're working
on
So，如果你们想去和Vertica的⼯程师讨论这些东⻄的话，那么你们可以找Stephen
1.55-2.01
and for that one that'll be fruit they're not pizza,so again plan accordingly
So，这场讲座他们提供的是⽔果，并不是披萨，这和我之前所想的不同
02:01 - 02:06
All right, so today we want to continue our discussion on talking about tree indexes
So，在今天的这堂课中，我们想继续讨论关于Tree index相关的内容
02:06 - 02:14
So I want to spend a little bit time in the beginning, doing some demos, and discussing
more about B+trees to finish up the things that we we left out last class
So，⾸先我想花点时间去给你们演示些demo，讨论些更多关于B+Tree的东⻄，以此来结束我
们上堂课所遗留的问题
02:15 - 02:17
And then we'll talk about different ways
然后，我们会以不同的⻆度进⾏讨论
2.17-2.25
we'll talk about more ways you can use indexes beyond the you know straight key
mapped into a data structure that we've been talking about so far
我们会讨论更多关于索引的⽤法，⽽不是仅仅局限于我们⽬前所讲的，将key映射到某种数据结
构上
02:25 - 02:30
And then we'll talk about an alternative to B+trees ,tries / radix trees
然后我们会讨论B+Tree的⼀种替代品，即Tries/Radix Tree
02:31 - 02:37
And we're getting we'll go through what makes these unique, what makes them different
and how are they better or worse than B+trees
我们会去讨论是什么让它们与众不同，它们之间的区别是什么，以及它们和B+ Tree之间孰优孰
劣
02:37 - 02:42
And then we'll finish up really quickly with a sort of a brain dump of inverted indexes
然后，我们会快速结束关于倒排索引（inverted index）相关的内容
02:43 - 02:44
I'm not going to teach you how they work
我不会教你们，它们是如何⼯作的
02:44 - 02:46
We have courses here at CMU that you can do that
我们CMU有这⽅⾯的课，你们可以去学⼀下
02:46 - 02:49
This is just so you know that these things actually exist
这⾥我只是告诉你有这些东⻄存在罢了
2.49-2.54
so when you go out in the real world and you realize that the thing you want to index
can't be indexed in a B+tree
So，在现实⽣活中，当你发现你想进⾏索引的东⻄没法使⽤B+ Tree进⾏索引时
02:54 - 02:56
You want to use one of these inverted indexes
那么你就会想去使⽤这些倒排索引
02:57 - 03:06
All right,so the the last class we had a couple questions about how do we actually going
to handle duplicate keys in our B+tree index
So，在上⼀节课中，我们有两个问题是关于我们实际该如何处理B+Tree索引中的重复key的
03:06 - 03:10
So I showed you how we would handle duplicate keys inside of the node
So，我向你们展示了该如何处理节点中的重复key
03:11 - 03:13
Right, we could duplicate the values in the node,
我们可以在节点中多次存储key-value
3.13-3.17
and then or just have a mapping from a key to a value list inside the node
或者我们将⼀个key映射到该节点中的⼀个value list上
03:17 - 03:29
So now I want to talk about what I realized I missed out was discussing at a higher level
actually within the tree itself, how do we gonna actually maintain these duplicate indexes
or duplicate keys
So，上节课我遗漏了⼀点没有讨论，那就是从⼀个更⾼的层⾯来看，即在B+ Tree⾥⾯，我们实
际该如何维护这些重复的索引或者重复的key呢
03:29 - 03:31
So there's two approaches to do this
So，有两种⽅法可以解决
03:32 - 03:37
So the first is that we're gonna make every key unique automatically
So，第⼀种⽅式是，我们让每个key都⾃动变得与众不同
3.37-3.45
by appending the corresponding tuples record ID to the key that we're inserting into the
index
即通过往我们索引中插⼊的key后⾯追加它所对应的tuple的record id来做到这点
03:46 - 03:50
So instead of storing the keeping of the copy of the attribute that's in the table
So，这⾥我们并不会将表中该属性的副本进⾏保存
03:50 - 03:56
I'm also gonna prefix or sorry, put at the end as a suffix the record ID for that tuple
⽽是在这个key的后⾯追加⼀个后缀，即追加该tuple的record id
03:56 - 04:00
So now that makes every single key automatically unique
So，现在这就使得每个key都会⾃动变得独⼀⽆⼆
04:01 - 04:04
So the reason why we can do this in this still works is
So，我们这样做依旧能正常⼯作的原因是
4.04-4.06
because we're using a B+tree
因为我们使⽤的是⼀个B+Tree
4.06-4.13
memorize said it would B+tree we can do partial key lookups and still find the things that
we want
回忆下我之前所说的，在B+Tree中，我们可以使⽤某个key中的部分内容来进⾏查找，这依然能
找到我们想找的东⻄
04:13 - 04:16
So if I have an index one attributes A and B
So，如果我有⼀个索引，它⾥⾯有两个属性，即A和B
04:16 - 04:19
If I want to do a lookup on A ,I can still do that without having B
如果我想根据A来进⾏查找，那么我在不使⽤B的情况下，依然能进⾏查找
04:20 - 04:23
So in our case in the B+tree ,because we're not gonna have the record ID
So，在我们这个例⼦中的B+ Tree⾥⾯，因为我们并没有record id
04:24 - 04:27
We can just do the regular lookup we as we would with it with a key
我们可以通过使⽤这个key来进⾏常规查找
4.27-4.33
but we just scan along the leaf nodes do we find all the matches for that given key
但我们得沿着叶⼦结点，以此来找到所有匹配该key的结果
04:33 - 04:34
You can do this in a hash table
我们可以在hash table中这样做
4.34-4.37
right for the hash table, you have to have the entire key
如果要使⽤hash table，那我们必须使⽤完整的key（知秋注：完整的key指的是key加record
id，hash table要做的⼯作就是精准查找）
04:37 - 04:39
So in order to do this approach
So，为了使⽤这种⽅法
4.39-4.46
you have to have the when you do a lookup the key you want ,and then the record a is
the record IDs they correspond to
当你使⽤你想要的那个key来进⾏查找它所对应的record id时
当你在做⼀个查找动作时，那key是你需要的，对应的record id也是你需要的
04:46 - 04:47
But that seems stupid
这看起来有点蠢
4.47-4.57
because if you had the record IDs why would use an index a lookup the record IDs
因为，如果你有了record id，那为什么还要⽤索引来查找这个record id呢？
4.57-4.58
yes
请问
04:58 - 05:00
So these questions what is what is this record ID
So，他的问题是什么是record id
5.00-5.04
it's the page ID, and offset we talked about in the very beginning
我们在⼀开始就说了，它是由page id和offset值所组成的
05:04 - 05:07
Right, that's the unique identifier for every physical location of a tuple
它是每个tuple所在的物理位置的唯⼀标识符
05:08 - 05:11
Now it may change and therefore that we have to deal with that
因为，它可能会改变，所以我们必须处理这个问题
05:12 - 05:16
And Postgres is most famously the one that what this won't work
PostgreSQL是其中最著名的⼀个代表，我们的这种⽅法在它上⾯⾏不通
5.16-5.17
because they can move things around
因为它可以将东⻄到处移动
05:17 - 05:19
But when we tell about multi versioning
但当我们讨论多版本的时候
5.19-5.24
we'll see different examples of why this works from post,but it doesn't work PostgreSQL
with arcs or other systems
我们会通过各种不同的例⼦来看到，为什么它没法⽤于PostgreSQL，但是能⽤在其他系统上⾯
05:24- 05:26
But this assume it's a page id and offset
但它指的就是page id和offset值
5.26-5.33
or indicates a SQL Server, an Oracle it was like file number object number、 page ID and
offset like a more complex thing
但如果换做是SQL server或Oracle那就是file number、object number以及page id 和offset值
了，这更加复杂
05:33 - 05:40
The other approach is to somewhat violate the sanctity if you will of the design of the
B+tree
另⼀种⽅式就是违反B+ Tree设计上的sanctity（即B+ Tree本应遵循的⼀些规则）
05:41 - 05:46
And actually store the duplicate keys as overflow leaf nodes
实际上，就是将重复的key保存在overflow的叶⼦节点上
05:46 - 05:51
So instead of expanding the leaf nodes horizontally to accommodate new Entries
So，这⾥我们并不是通过将叶⼦结点进⾏⽔平扩展，以此来容纳新的条⽬
05:51 - 5.53 ！！！！！！！！！
We're actually gonna expand them vertically
实际上，我们会将叶⼦结点进⾏垂直扩展
5.53-5.56
or then what for then a given leaf node will add these overflow pages
对于⼀个给定的叶⼦结点，我们会在它的下⾯添加这些overflow page
5.56-5.58
almost like the chained hash table we talked about before
它⼏乎和我们之前所讨论的chained hash table⼀样
5.58-6.01
and is add all the duplicated key down there
往这⾥⾯添加所有这些重复的key
将这些所有重复的key添加到下⾯的overflow page中
06:01 - 06:03
So as well see in a second
So，我们之后会看到
6.03-6.07
I'll again provide all of you what this looks like, this approach is gonna be more complex
我会告诉你们所有⼈，它是什么样的。这种⽅式看起来更加复杂
6.07-6.11
because now we have to handle the case of where I'm scanning along my leaf nodes
因为现在我们必须处理沿着叶子节点进行扫描时所发生的情况
06:11 - 06:15
I have to know how to follow those you know follow down the overflow pages
我必须知道该如何向下处理这些overflow page
06:15 - 06:17
If I'm scanning reverse direction
如果我以相反的⽅向进⾏扫描
6.17-6.20
you know what where do I start my scan when I jump back in the other direction
正如你知道的那样，当我开始扫描时，我会以另⼀个⽅向进⾏向上扫描
06:21 - 06:23
So most people implement this one
So，⼤部分⼈会选择实现第⼀个⽅法
06:25 - 06:26
This has the advantage that again
这种⽅式有它的优点
6.26-6.32
we don't want to make any major changes to our data structure whether it's a unique
versus not unique index, everything just still works the same
我们不想对我们的数据结构进⾏任何⼤改。不管是唯⼀索引还是⾮唯⼀索引，所有东⻄都和之前
⼀样
06:32 - 06:37
The downside is now we're actually storing there's record ID as an additional key
element of our key
它的缺点就是我们要将record id作为我们的key的额外元素保存起来
06:37 - 06:40
And that increases the size of our index
这就增加了我们索引的⼤⼩
6.40-6.43
you know the amount of data it takes to actually store the index
即我们要保存的索引的数据⼤⼩会变⼤
06:43 - 06:44
In this case here
在这个例⼦中
6.44-6.49
we're not storing any redundant information unnecessarily to make things unique
我们不会通过保存任何⾮必要的冗余信息来使得这些索引具备唯⼀性
06:49 - 06:51
But now we have this management issue
但现在我们会遇上这种管理问题
06:52 - 06:52
So let's go through both them
So，我们来看下这两种⽅法
06:53 - 06:57
So this is our simple B+tree that we talked about before
So，这⾥所展示的是我们之前所谈论的⼀种很简单的B+ Tree案例
06:57 - 07:00
And so the first approach is again depend the record ID
So，再说⼀遍，第⼀种⽅式是基于record id
07:00 - 07:02
So either I'm showing just like the key value
So，这⾥我所展示的是key/value的形式
7.02-7.05
Assume there's an attribute A, and here's all the values for them
假设这⾥有⼀个属性A，然后这⾥是它们的所有值
07:05 - 07:11
In actuality what the database system is actually storing is a combination of the key and
then that record ID
实际上，数据库系统实际所保存的是key和RecordId这样的组合
07:13 - 07:15
So now when I do a lookup
当我想进⾏查找时
7.15-7.17
and say I want to insert key 6
假设我想插⼊⼀个key，它的值为6
07:17 - 07:22
in this point here, I can do a prefix search in my B+tree
此时，我可以在我的B+Tree中进⾏前缀搜索
07:22 - 07:25
Because I don't have a record ID as I'm inserting this
因为当我插⼊这个key时，我并没有⼀个与它对应的Record id
因为在此插⼊key时，我并没有插⼊与之相应的Record id（知秋注：这⾥是前缀搜索，提取出
的前缀并插⼊在中间节点处）
7.25-7.26
why should I take it back you do have a record ID
虽然你确实有⼀个RecordID（知秋注：但此处没有！）
07:26 - 07:29
But I'm not gonna find an exact match for that
但在这⾥，我⽆法找到⼀个能精确匹配它的东⻄
07:29 - 07:32
So I would Traverse down here and I would land at this page
So，我会我那个下遍历，然后我会落在这个page上
07:33 - 07:36
The real I mean the real thing I'm inserting is the page id and offset
我这⾥实际上所插⼊的是page id和offset值
7.36-7.37
but I land here
但我落在了这⾥
7.37-7.40
and now I want to go into this page
现在，我想进⼊这个page
07:40 - 07:44
So because now I don't have overflow pages
So，因为现在我并没有overflow page
7.44-7.46
I have to go exactly in sorted order
So，我必须按照排序的顺序⾛
7.46-7.48
so assume whatever this original 6 is
So，假设不管这个原始的6是什么
7.48-7.50
its record ID is less than the one I'm inserting
它的Record Id要⼩于我所插⼊的这个
07:50 - 07:52
So it needs to go between the 6 and 7
So，它应该在6和7之间
07:53 -7.55
So I just do the normal split process that we talked about before
So，这⾥我所做的就是我们之前所讨论的正常拆分过程
7.55-7.58
I slide everybody over 7 and 8 move here
我将所有东⻄移到旁边，并把7和8移动到这⾥
7.58-8.03
and now I can update pointers and how 6 goes in here
现在，我就可以更新指针，这样6就能到这⾥了
08:03 - 08:06
Right, it's just works exactly the same that we talked about before
它的⼯作⽅式和我们之前所讨论的⼀模⼀样
08:06 - 08:09
So following do a lookup on 6 ,again I just do the prefix search
So，我们接下来对6进⾏查找，我使⽤前缀搜索
8.09-8.13
I do the just look at the first element of the key just the 6
我只使⽤该key中第⼀个元素（即6）来进⾏查找
8.13-8.19
and I can find down here now I scan along my leaf-nodes to I find them what I want
我可以往下查找，然后沿着我的叶⼦结点，以此来找到我想找的东⻄
08:19 - 08:21
The other approach is the overflow pages
另⼀种⽅法就是使⽤overflow page
08:22 - 08:24
So now again I want to insert 6 again
So，现在我想插⼊6
8.24-8.26
I know I want to go into this guy
我知道我想插⼊这个节点
8.26-8.28
I can't I don't want to split across
我不想将这个节点进⾏拆分
08:28 - 08:31
Right, I want to I don't do what I did before I have 7 8 move over
我不想做之前我们所做的事情，即将7和8移动到另⼀个节点上
8.31-8.35
I want to go in this page here,but I can't because it's full
我想将它插⼊这个page，但是我做不到，因为这个page满了
08:35 - 08:38
So I just add now an overflow page
So，我在它下⾯添加了⼀个overflow oage
8.38-8.39
where I insert my new 6
我将我这个新的6放到这个overflow page上
8.39-8.43
and now I have my pointer down to it
现在，我就有⼀个指向下⾯这个overflow page的指针了
08:43 - 08:48
Now remember I said before that in most textbook definitions of a B+tree
记得我之前所说的，在⼤部分教科书中的B+ Tree定义⾥
08:48 - 08:52
You assume that the keys are always gonna be in sorted within the node
假设，在节点中的key始终都是排好序的
08:52 - 08:55
In this case here ,we could do that, we could sort them
在这个例⼦中，我们可以对它们进⾏排序
08:55 - 8.59
But it's not actually wrong just to leave it unsorted
但实际上，让它们保持⽆序也不是什么错误的做法
8.59-9.03
we just need to know when word looking for the element, we're looking for we can't use
binary search to jump around,
我们只需知道在我们进⾏查找某个元素的时候，我们⽆法使⽤⼆分查找来找到我们要的元素
9.03-9.07
we have to do the linear search to find that we want
我们必须使⽤线性查找来找到我们想要的东⻄
09:07 - 09:09
So now let's say I want to insert 7
So，现在我想插⼊7
9.09-9.10
same things 7 goes down there
同样，因为上⾯满了，7只能放在下⾯的overflow page中
09:10 - 09:11
I insert 6
然后，我再插⼊⼀个6
9.11-9.15
same thing 6 goes here it's it's unorder and that's okay
继续之前相同的操作，我们将6放在下⾯的overflow page，这⾥就变成⽆序的，但这是ok的
09:15 - 09:16
So now here's what needs to happen
So，现在这⾥会发⽣什么呢？
09:16 - 09:17
So physically
So，从物理上来讲
9.17-9.19
this is stored across multiple pages
这是跨多个page所保存的
9.19-9.21
logically from the index perspective
逻辑上，从索引的⻆度来说
9.21-9.25
this just looks like one giant leaf node that has the much xxxx in it
这看起来就像是⼀个超⼤的叶⼦节点，它⾥⾯有很多key
09:25 - 09:29
So now if I'm scanning across, I do the same thing, I follow this pointer, I land here
So，如果我现在跨节点扫描，我会做和之前⼀样的操作，即沿着这个指针，我落到了这个节点
（6 7 8这个节点）
09:29 - 09:32
And now if I'm scanning across instead of jumping over to this node
现在，如果我跨叶⼦节点进⾏扫描，⽽不是跳到这个节点
现在，如果我跨节点扫描要跳到这个节点（9 13节点）
9.32-9.34
I've no need to follow my overflow page you keep looking there
我不需要跟着这个指针来到这⾥的overflow page上进⾏扫描
我没必要去我的overflow page上进⾏扫描（知秋注：即没必要通过overflow page来跳到9 13
节点上）
09:34 - 09:37
And eventually, if I find what I'm looking for I'm done,
最终，如果我找到我要找的东⻄，那就完事了
9.37-9.38
if not, I need to go to the next page
如果没找到，那我就得跑到下⼀个page去
9.38-9.40
then I just follow that pointer over there
那么沿着此处的这个指针，继续扫描下去
09:41 - 09:45
So now I may be thinking why not just have this guy should' this guy really be pointing to
that one
So，现在我可能会想为什么右边这个节点不指向中间这个节点下⾯的那个节点呢？
so,现在我可能会想为什么（6 7 8）这个节点的这个右侧指针为什么不指向下⾯这个(6 7 6)节点
呢？
09:46 - 09:47
Right, because that would actually be correct
因为那实际上是正确的
09:48 - 09:51
But now the problem is every single time I add a new overflow page
但现在问题是，当我每次添加⼀个新的overflow page
9.51-9.56
now only do I need to update you know my pointers internally for these nodes over here
我现在所唯⼀要做的就是去更新指向这些节点的内部指针即可
09:56 - 09:58
I now need to go update this one as well
我也需要去更新这个
09:59 - 10:01
But I just leave that pointer alone
但我将这个指针单独放在这⾥
我会单独放⼀个指针在这⾥（知秋注：⽤来指向overflow page，可以理解为在这个节点数据结
构中设定⼀个overflow page指针）
10.01-10.02
and let it point to the beginning of my page
并让它指向我page中的起始page（这⾥的话就是指向6 7 8这个page）
初始的时候，让它指向我page中的起始位置（知秋注：因为此时并没有溢出，也就没有
overflow page加⼊，所以这个指针就指向⾃⼰的这个page所在的初始位置，这⾥的话就是指6
7 8这个page的起始位置，即它的地址）
10.02-10.06
the topmost leaf node in this vertical tower
即这个竖塔中最上⾯的叶⼦结点
即指向最顶端的这个叶⼦节点（知秋注：在这个由overflow page堆叠成的⼀座塔，最顶端就是
这个叶⼦节点）
10.06-10.08
then I would just land there and say
然后我落在那⾥，并表示 （知秋注：当添加了⼀个overflow page，更新这个叶⼦节点中的
overflow page指针，这⾥已经添加了⼀个overflow page，当操作落到此处时）
10.08-10.09
oh well I'm going over search
Oh，我正在进⾏搜索
10.09-10.13
I really need to jump to the end of my overflow page and walk backwards
我需要跳到我的overflow page的末尾，并往回扫描
10:13 - 10:15
There's much extra logic we have to do to accommodate this
我们必须使⽤些额外的逻辑来处理这个overflow page
10.15-10.16
Yes
请问
10:18 - 10:25
So I said sorry you haven't reviewed what sorry ,oh every doubt okay
能再说⼀遍吗？
10:41 - 10:42
So this question is
So，他的问题是
10.42-10.45
if the database systems using the index
如果数据库使⽤索引
10.45-10.50
and we're trying to find the tuples that have the value 6 for this particular key
并且，我们试着找到key值为6的这个tuple
10:51 - 10:53
So what is the index returning
So，这个索引会返回给我们什么呢？
10.53-10.55
well it return the record id's
Well，它会返回record id （知秋注：包含pageID 和Slot）
10:55 - 10.59
So you would say you basically have an iterator
So，简单来讲这⾥我们有⼀个迭代器（iterator）
10.59-11.00
I traverse down and get to my leaf node
我向下遍历，并进⼊我的叶⼦节点
11.00-11.03
and now I'm looking calling next next next on this iterator
通过这个迭代器，我不停地调⽤next
11.03-11.05
and I'm looking at every single element until I find the ones that I want
以此来遍历每个元素，直到我找到我想要的元素
11:05 - 11:09
And I knew iterator knows to stop what says I'm looking for everything that where key
equals 6
现在，迭代器停下来了，我知道，这意味着我找到了所有key为6的东⻄
11:10 - 11:13
So assume I see maybe a 9 over here I need to stop
So，假设我看到这⾥有⼀个9，我需要停下来（知秋注：即当在查找时发现下⼀个overflow
page指针为null的时候，就去找叶⼦节点的右侧的兄弟叶⼦节点）
11:14 - 11:15
But this what I'm saying
但这⾥我要说的是
11.15-11.16
know if this is unsorted
如果这⾥是未排序的
11.16-11.22
then I know I need to scan to the end of all my overflow pages because I if this the last 6
might be here
那么我就知道，如果最后⼀个6在overflow page上的话，那么我需要扫描到我所有overflow
page的末尾
11:23 - 11:24
If I want to keep them sorted
如果我想让它们有序
11.24-11.26
then you know now I'm insert this 6 here
我这⾥插⼊了这个6
11.26-11.29
now I got to go update this guy and this guy
现在我就得去更新这个以及那个东⻄了
11.29-11.32
whereas before if I did append only， its updating one page
我 仅仅只是做了⼀个追加操作，就要更新这个page
11:35 - 11:36
So this is a really good example
So，这是⼀个很棒的例⼦
11.36-11.43
of why you know why trying to understand these data structures in the context of a real
full system is important
即为什么我们要去尝试理解整个系统中上下⽂⾥⾯的这些数据结构的原因了，真的很重要
11:44 - 11:45
You take an algorithms class
你们应该都上过算法课了
11.45-11.48
an algorithms class will teach you yes, this is the way to start a B+tree
算法课会教你们，该如何使⽤B+ Tree
11:48 - 11:50
But now because we're inside of a database system
但现在我们是在数据库系统的世界⾥
11.50-11.52
we know we have these things called record IDs
我们知道我们有种叫做record id的东⻄
11.52-11.58 *****************
and we can exploit them to facilitate different aspects or different operations that would
not be otherwise easy to do
并且我们可以利⽤它们来协作完成不同的⽅⾯或不同的操作，⽽这些操作原本就不容易完成
11.58-11.59
yes
请问
12:03 - 12:04
Correct
没错
12.04-12.06
if this thing overflows we just keep continuing
如果这些东⻄overflow了，那我们往下⾯添加overflow page就⾏
12.06-12.06
yes
请问
12:10 - 12:10
Correct
没错
12.10-12.13
I think it says to a certain point, you actually want rebalance
我觉得到⼀定程度的时候，实际上我们就想对B+ Tree进⾏重新平衡了
12:13 - 12:16
So yes, so that could be a criteria
So，这可能是⼀种标准
12.16-12.20
it says, all right well if I go beyond this number of overflow pages, then do a split
该标准表示，如果我超过了overflow page允许的数量，那么就进⾏拆分
12:20 - 12:23
But if these are all sixes Right, in a single page
但在这个单个page中，这些都是6
12:22 - 12:27
then you can't you can't quite you know easily do that without depending the record ID
那么，在不依赖record id的情况下，我们没法简单地进⾏拆分
12:31 - 12:31
All right cool
12.31-12.33
so let's do a demo
So，我们来做个demo看看
12.33-12.35
because we didn't get to do this last time
因为这个demo，我们上节课并没有做
12:35 - 12:36
So we're gonna do PostgreSQL
So，我们会使⽤PostgreSQL来做
12.36-12.42
and these want to show the difference between a B+tree and a hash index
我想通过它来向你们展示B+Tree和hash索引之间的区别
12:44 - 12:46
All right, turn this off
让我把灯关了
12:51 - 12:53
All right, cool and you're looking over here
你们看下屏幕
12:54 - 12:58
So I'm gonna have a table, this live yeah, okay
So，我有⼀张表
12:58 - 12.59
So this is Postgres
So，这是PostgreSQL
12.59-13.02
I'm gonna have a table of email addresses
我有⼀张⽤来保存email地址的表
13:03 - 13:08
So it's gonna be a simple, a simple table with an ID with an auto increment key
So，它是⼀张很简单的表，上⾯有⼀个id，并且这个id是⼀个⾃增键
13.08-13.10
and then a bunch of email addresses
接着，上⾯还有⼀堆email地址
13:10 - 13:13
So this is a file that you can find on the Internet
So，这个⽂件你可以在⽹上找到它
13:14 - 13:18
This is a list of 27 million email addresses from ……
这个⽂件⾥⾯包含了2700万个email地址
13:19 - 13:20
If you don't know what that is
如果你不知道它是什么的话
13.20-13.24
it was a a think of like tinder before tinder
你可以把它当做是tinder（某个类似于陌陌的交友软件）
13.24-13.27
that it was an adult hook-up site in Canada they got hacked
这是加拿⼤的⼀个跟成⼈挂钩的软件，它被⼈破解了
13.27-123.30
and then eventually people release the email addresses
然后，最终那群⿊客将这些email地址放了出来
13:31 - 13:31
So this is real
So，这些email地址都是真实的
13:33 - 13:34
It shouldn't take that long to load
照理说，加载不需要花这么⻓时间
13.34-13.37
but I should do this before now but that's,okay
我应该提前将它加载好，但现在这样也没啥问题
13:38 - 13:41
So what we're gonna do is we're gonna create two indexes, we're gonna create a hash
index
So，我们要做的就是去创建两个索引，我们要去创建⼀个hash索引
13:41 - 13:43
So in Postgres you can actually just say
So，在PostgreSQL中，我们实际可以这样做
13.43-13.47
well I want to create index, I want it to be a hash index
Well，我想去创建索引，我想它变成⼀个hash索引
13:47 - 13:51
And then you can then say, I want to create index and I want to be a B+tree index
然后，你可以这么说，我想创建⼀个索引，我想让它是⼀个B+ Tree索引
13:52 - 13:54
Of course yeah, well this is that a good demo, right okay
Well，这是⼀个很好的demo
13:56 - 13:57
So maybe we'll come back to this
So，可能我们得稍后再回来看下
13:58 - 13:59
Let's go to MySQL
算了，我们来看MySQL这边吧
14:00 - 14:01
sorry about that, okay
不好意思
14:03 - 14:09
It's the same thing, this is MySQL select count(*) from emails;
So，这⾥是MySQL，SQL语句如图所示
14:15 - 14:17
Alright, Postgres finished
好了，PostgreSQL加载完了
14.17-14.19
actually let's go back to Postgres
让我们回到PostgreSQL这⾥
14.19-14.21
because it's done, I took a minute
稍等我⼀下
14:21 - 14:23
So I told you I inserted 27 email addresses
So，我之前跟你们说过，这⾥⾯我插⼊了2700万个email地址
14:24 - 14:27
So I first I'm gonna do is I'm gonna create a hash index
So，⾸先我要做的是创建⼀个hash索引
14:28 - 14:31
So by default in SQL and most systems
So，默认情况下，在MySQL和⼤多数数据库系统中
14:32 - 14:33
If you just create an index
如果你们创建了⼀个索引
14.33-14.36
you're gonna get a B+tree you know or some tree data structure
你们索引所使⽤的就会是B+ Tree或者是其他树形数据结构
14:36 - 14:40
In Postgres, I can say using hash, I'm forcing it to use a hash index
在PostgreSQL中，我可以说这⾥使⽤hash索引，然后，这⾥可以强制让它使⽤hash索引
14:41 - 14:45
And so now we can see things like of course not gonna load this, I should have warned it
sorry
So，现在我们会看到这样的东⻄.....emmmmm，我并没有将它们进⾏加载，不好意思
14:45 - 14:46
This shouldn't take too long
这应该不会花太久
14:48 - 14:57
But we can see how if we try to do certain queries, we won't be able to find the things
that we want
如果我们要试着进⾏某种查询，我们没法找到我们想要的数据
14:58 - 15:01
Let me look at all this in, sorry
让我再来看下这个
15:03 - 15:04
PG warm
让我来⽤下pg_prewarm
15:07 - 15:09
So this is that same function I used last time
这个函数我上节课就⽤过了
15.09-15.10
just to warm the cache
它可以对缓存进⾏预热（即将相关的数据加载到系统的缓存）
15.10-15.12
and then now when I call create index
接着，现在当我创建索引时
15.12-15.14
in theory this should be faster
理论上来讲，这样做会更快
15.14-15.16
because everything is just loaded then
因为所有数据都已经加载完了
15:16 - 15:21
But we're gonna run queries and we're going to see how the query planner is not gonna
be able to pick the index for some queries
但当我们执⾏查询时，我们会看到Query planner在某些查询上并不会使⽤索引
15:22 - 15:24
But it be able to pick indexes for other queries
但它在执⾏其他查询的时候，能够去使⽤索引
15:24 - 15:34
Right, because the hash index again, you have to have the entire key or the entire
elements of the key, you can't do partial lookups and you can't do range scans
因为如果你使⽤hash索引，你就必须使⽤完整的key或者是该key中完整的元素，我们没法进⾏
部分查找或者是范围查找
15:36 - 15:37
num sorry
抱歉
15:42 - 15:42
Well this sucks
这有点操蛋
15:42 - 15:47
All right, why this is going on - I'll then create the B+tree index in the background
发⽣这种事的原因是因为PostgreSQL在后台创建B+ Tree索引
16:00 - 16:01
I had everything working
现在好了
16.01-16.04
and then I dropped to the table before class start and I forgot to rebuild it
在上课之前我把表给drop了，我忘记将它重建了
16:04 - 16:06
All right, we're back ,okay so it took 50 seconds
Ok，它花了50秒
16:06 - 16:11
All right, so now I can do say queries like select star, let's find a user first
So，我们先来查找⼀个⽤户
16.11-16.22
so select star from let's find the minimum use email address from emails
So，让我们来找下使⽤数量最少的email地址
16:22 - 16:24
Yeah, there we go
好了，我们来看下
16:25 - 16:28
Whatever that is someone correctly used a fake email address
这⾥有⼈可能使⽤了⼀个假邮箱
16:28 - 16:35
So if I want to do select star from emails where email equals this thing
SQL语句如图所示
16:37 - 16:39
Again, if I add that explained keyword
如果这⾥我加⼀个explain关键字
16.39-16.41
Postgres will tell me what it's gonna do
PostgreSQL就会告诉我它接下来要做什么
16:41 - 16:42
So Postgres is gonna tell me that
So，PostgreSQL会告诉我
16.42-16.45
hey I had this thing called a hash index
Hey，这⾥我使⽤了⼀个叫做hash索引的东⻄
16.45-16.48
and I can do a lookup
并且我可以进⾏查找
16.48-16.51
because I know I can do exactly the thing I'm looking for equal to that text
因为我知道我可以根据这个⽂本准确地找到我要找的数据
16:51 - 16:55
Right, well ignore what a bit bitmap scanner heap scan is that'll come later on
Well，我们将bitmap scan和heap scan先忽略掉我以后会讲这个
16:55 - 16.56
But in but we know this is gonna be fast
但我们知道这会很快
16.56-17.00
is it's gonna go find exactly the the one that we're looking for
它会准确地找到我们所要找的东⻄
17:00 - 17:05
Right, but now say if I want to do something like where email like
但如果我想这么做的话，即这⾥使⽤like⼦句
17:06 - 17:09
And then this thing and put a put a wild-card at the end
我们在条件最后放⼀个通配符
17:10 - 17:11
Can you use this hash index
我们能使⽤这个hash索引吗？
17:13 - 17:13
No
No
17.13-17.15
right because you have to have the entire key
因为我们必须使⽤完整的key才⾏
17:15 - 17:17
I'm not gonna run it cuz I probably take the whole time
我不会去执⾏它，因为这可能要花很⻓时间
17:17 - 17:23
But you can tell you when you asking explain, it`s tells you it's in default to the sequential
scan
但当你使⽤explain来问这会怎么做的时候，它会告诉你，默认情况下，它会使⽤循序扫描
17:23 - 17:27
Matter the sequential scan is always the default operation or access method for the
database system
对于数据库系统来说，循序扫描始终都是默认操作或者是默认访问⽅法
17:27 - 17:31
They can't find what it wants using index, it always defaults to a sequential scan
如果它们⽆法通过索引来找到它们想要的，那么它始终默认使⽤循序扫描来查找
17:32 - 17:37
So while this is going on, let's let's build the tree index
So，趁着它的执⾏，我们来构建下树形索引
17:39 - 17:40
But we can see some other things to it, right
但我们也会看到些其他东⻄
17:40 - 17:47
So let's say we want to find, we want to count all the email addresses where the better
greater than this
So，我们想统计⽐这个⼤的邮件的数量
17:49 - 17:510
Right can I do that
这样做可⾏吗？
17:51 - 17:52
No again
No
17.52-17.53
right because we have to have the partial key
因为我们使⽤的是key的⼀部分
17.53-17.56
we can't do anything that's not in the equality predicate
我们没法在⽐⼤⼩中进⾏任何操作
17.55-17.58
it always has to be an exact match
这始终得是精准匹配
17:58 - 18:02
All right, it can do some things though right
这⾥⾯确实能做些事情
18:02 - 18:08
So let's say we find the there's say somebody else also did this one too is it quite of that
So，⽐如我们进⾏这样的操作，如图所示
18.08-18.09
, because I didn't find that
因为我们确实没找到
18.09-18.11
actual that was pretty fast for a sequential scan
对于循序扫描来说，这样真的很快
18.11-18.13
no wait sorry that that's an index in
抱歉，这⾥⽤的是索引(hash索引)
18:13 - 18:16
Let's find another one let's find another one,
我们试着来找下另⼀个
18.16-18.19
let's find the something who somebody who starts with an A
我们来找下某个以a开头的email
18:19 - 18:25
So like a star and then we'll limit one
SQL语句如图所示，这⾥我们限制只返回⼀条数据
18.25-18.30
and this basically says just keep find me the first one that you get that matches that
简单来讲，这⾥就是找到第⼀个匹配我们要求的那个数据
18:33 - 18:34
Right, so there's somebody's email address
So，这⾥返回了某⼈的email地址
18.34-18.36
let that books,but that's okay
算了就这样吧
18:38 - 18:45
But if we can do other things like this or email equals like that
但我们可以做些其他事情，SQL语句如图所示
18:49 - 18:51
And it was able to actually to do two index scans
这⾥实际上能够使⽤两个索引进⾏扫描
18:51 - 18:53
So notice has an or clause
So，注意下这⾥有⼀个OR⼦句
18.53-18.56
and you can see I'll do one probe in the index try to find what I want
你们可以看到这⾥我使⽤其中⼀个索引来试着找到我想要的数据
18.56-18.59
do another probe index and try to find what I want
接着，再使⽤另⼀个索引来试着找到我想要的数据
18:59 - 19:00
And then it combines them together
然后将它们的结果合并在⼀起
19.00-19.02
and that's that's what the bitmapOr means
这就是BitmapOr所做的
19:02 - 19:07
They think it was happening here is the bitmap index means that it's trying finding all
matches
这⾥所发⽣的事是，Bitmap index（位图索引）会试着找到所有匹配的结果
19:07 - 19:11
And then the set of storing a record ID maintains a giant bitmap
接着，保存这个record id的集合，维护这个庞⼤的位图（bitmap）
接着，通过存储了record id的集合来维护这个庞⼤的位图（bitmap）
19:11 - 19:17
and the mender stores the the up you know it sets that bit of that offset to say that that
record matched
它⾥⾯会保存的该bit
通过该bit可以拿到所匹配record的offset值
19:17 - 19:20
and then it combines them together, and then it produces the output
然后，它将这两个索引所产⽣的结果放在⼀起，并⽣成输出结果
19:21 - 19:24
so that's why it has to do this and then another lookup over here
So，这就是它为什么必须这样做，以及这⾥还有另⼀次查找的原因所在
19:24 - 19:26
all right so now our B+tree is done
So，现在我就讲完了B+ Tree的相关内容
19:26 - 19:28
so now we come back to our original query here
So，现在我们回到之前⼀开始的查询这⾥
19.28-19.29
yes
请问
19:38 - 19:43
your statement is didn't I say last class that it would do the search once and then
organize
你想说的是，我上节课不是说，它会进⾏⼀次查找并之后进⾏整理？
19:44 - 19:46
this is a hash index
这是⼀个hash索引
19.46-19.49
this is a beat that's not that this is the B+ ,right there's the hash table this is not a
B+tree
这是hash table，并不是B+ Tree
19:50 - 19:56
okay ,like going back to well now I just added the B+tree
Ok，回到这边我刚添加B+ Tree的时候
19:57 - 19:58
but yeah right there
但看下这⾥
19:59 - 20:00
so this is explain
So，这⾥我⽤到了explain
20.00-20.02
explain is telling you what the query plan is going to be
Explain会告诉你这⾥⾯的查询计划是什么
20:02 - 20:06
so it tells you I'm going to index scan using idx_emails_hash
So，它告诉你们，这⾥我使⽤idx_emails_hash来进⾏索引扫描
20.06-20.07
that's the name the hash table index I created
这是我在hash table中创建索引的名字
20.0720.08
okay
08-02
20:09 - 20:15
So now I have my B+tree index
So，现在我使⽤我的B+ Tree索引
20:17 - 20:20
So if I do something like this
So，如果我进⾏这样的操作
20.20-20.23
just do this lookup we had before this fake email
即查询之前这个假邮箱
20:23 - 20:26
It tells me it once using hash index
它告诉我这⾥使⽤的是hash索引
20:27 - 20:32
But as soon as I add this, I add the range predicates down here
但⼀旦我添加了这个，即我在这⾥下⾯添加了范围条件
20:33 -20:34
It`s gonna use the hash table, no
它会去使⽤hash table吗？No
20.34-20.39
it's gonna use the an actually do sequential scan
实际上，它这⾥会去使⽤循序扫描
20:39 - 20:40
All right this is a good example
这是⼀个很好的例⼦
20.40-20.46
so this guy is the smallest key that we have in our index
So，这个是我们索引中的最⼩key
20:46 - 20:48
So it knows that if I want to use the index
So，它知道如果我想使⽤索引
20.48-20.53
and all I'm really doing is jumping to the far left point and the scanning along the leaf
nodes
那我就得跳到最左边，然后沿着叶⼦节点进⾏扫描
20:53 - 20:55
And so therefore the traversal of the index was a waste of time
因此，索引遍历其实浪费时间
20.55-20.58
therefore is better for me to just do a sequential scan
因此，对我来讲，进⾏循序扫描会来的更好
20:58 - 21:00
But let's say if I change that to Z
但如果我将这⾥改为z的话
21:06 - 21:06
A bunch of Z's
改成⼀些z吧
21:07- 21:13
And now it says that,alright well I know that if I use my index I'm going to throw away a
lot of data
现在，DBMS表示，如果我使⽤我的索引，那我会扔掉⼀⼤堆数据
21:13 - 21:18
So now I can use that they treated jump down to the right side of the tree get a starting
point and then a scan along the leaf nodes
So，现在我可以跳到树的右边，找到⼀个起点，并开始对叶⼦节点进⾏扫描
21:19 - 21:23
Right, so this is an internal cost model thing that's going on, in Postgres we'll talk about
later
So，这是PostgreSQL中的⼀种内部代价模型（cost model），我们会之后讨论
21.23-21.26
,that allows it to decide when's the right time to do these things
这允许PostgreSQL在合适的时间去做这些事情
21:28 - 21:28
So is this clear
So，你们懂了吗？
21:29 - 21:32
So for a equality predicates, the hash index is me pretty good
So，在使⽤等于号进⾏条件判断的时候，hash索引会相当棒
21:32 - 21:34
But for these range predicates
但对于这些范围条件来说
21.34-21.37
if it's the right location again
如果是在合适的位置
21.37-21.39
we know something about the distribution of values
我们知道这些值的分布情况
21.39-21.43
then it will choose to do a index leaf scan
那么它就会选择去沿着叶⼦结点进⾏索引扫描
21:43 - 21:44
So now go back here again,
So，回到这⾥
21.44-21.48
this guy was doing the index scan doing exact point query lookup
这条SQL语句会使⽤hash索引扫描，这样可以进⾏精确的点查询查找
21.48-21.50
if I drop that index
如果我drop掉该索引
21:52 - 21:54
Drop index emails hash
命令如图所示
21.54-21.57
comes back right away and now I do that predicate
好了，我们现在回来进⾏条件判断部分
21:57 - 22:03
Now it's smart enough to know oh I no longer have that hash index but I do have this
tree index
现在，PostgreSQL应该很聪明的知道，这⾥我的hash索引已经没法⽤了，但我还有这个tree
index
22:03 - 22:04
So I can use that for this equality predicate
So，我可以在这个equality predicate中使⽤它
22:06 - 22:07
So is this clear
So，这个你们明⽩吗？
=========================================================
22:09 - 22:13
All right, the other thing we talked about last class briefly was was table clustering
我们在上堂课中还简单讲过另⼀个东⻄，那就是clustered index（聚簇索引）
22:14 - 22:17
So table clustering is
So，table clustering指的是
22.17-22.26
the where we're going to use the index to enforce the sort ordering of the table
themselves , the tuples themselves
我们会通过聚簇索引来对表中的tuples强制按照某种顺序排列
22:26 - 22:30
So remember Postgres is unsorted or relational models unsorted
So，要记住，PostgreSQL是⽆序的，或者说，关系模型是⽆序的
22:30 - 22:32
So as we insert things into Postgres
So，当我们往PostgreSQL中插⼊⼀些东⻄的时候
22.32-22.37 ！！！！！！！！
it's just putting them and the essentially the order that that it was told to put him in as
we do the inserts
这些东⻄在PostgreSQL中顺序是我们将它们所插⼊时所在的顺序
22:38 - 22:46
And we saw examples where I could update things,delete things and can reshuffle some
depending on how I you know what you know what free slots are available in a page
在我们看过的例⼦中，当我进⾏更新、删除以及对某些数据进⾏重洗牌的时候，这就取决于⼀个
page上有多少可⽤的空闲slot了
22:46 - 22:49
So if I go say do a select query here
So，如果我在这⾥进⾏select查询
22.49-22.53
select * from emails and I just say give me the first one
SQL语句如图所示
22:53 - 22:56
Alright,we get some random Gmail account
我们拿到了某个随机的Gmail账号
22:56 - 23:03
But now if I say, if I called this clustering command
但现在，如果我调⽤cluster命令
23:03 - 23:04
This will take about a minute
这要花个⼏分钟去执⾏
23.04-23.06
but what this is doing？
但这⾥所做的是什么呢？
23.06-23.17
this command is forcing Postgres to potentially resort the entire table based on the sort
ordering defined by this index
这个命令会强迫PostgreSQL根据索引定义来对整个表进⾏重新排序
23:18 - 23:19
But this is a one-time operation
但这是⼀个⼀次性操作
23:20 - 23:22
So as I modify the table
So，当我对表进⾏修改时
23.22-23.23
and maybe things get out of order
它⾥⾯的数据的顺序可能会发⽣变化
23.23-23.26
it's not you know it's not gonna match what it was when I first set it up here
即，数据的顺序和我第⼀次设置它的时候可能不太⼀样
23:27 - 23:30
Some systems like in MySQL and SQL Server and Oracle
在某些系统中，⽐如MySQL，SQL Server和Oracle中
23.30-23.34
you can say I want an index clustered table or an index clustering on the index
你可以说，我想要⼀个index clustered table，即使⽤聚簇索引
23:35 - 23:40
And therefore it ensures that no matter how you insert values into your table in what
order you insert them
因此，这样能确保，不管你往数据库中插⼊值的顺序是怎么样的
23.40-23.43
the underlying physical storage will be sorted
底层的物理存储会是有序的
23:44 - 23:45
So in some cases
So，在某些例⼦中
23.45-23.49
this allows us to do binary search directly on the table themselves
这允许我们直接在表上进⾏⼆分查找
23.49-23.53
which is still log(n) without having to go through the index itself
在不使⽤索引本身的情况下，它的复杂度依然是log(n) （知秋注：因为整张表的tuple就是根据
某个字段进⾏有序插⼊的，可以根据⼆分来对某⼀条来进⾏查找）
23:53 - 23:56
So this is if you take a long time ,so what does let this go
So，这要花很⻓⼀段时间，我们就先让它在⼀旁跑就是了
23:57 - 24:00
But I quickly want to jump back over to MySQL
但我现在想跳回MySQL的界⾯
24:00 - 24:02
So again same email address load it into MySQL
So，这⾥我们将相同的email地址加载到MySQL中去
24.02-24.04
I can do the same kind of queries
我可以进⾏相同的查询操作
24.04-24.11
select * from emails where that fake one was email equals that
SQL语句如图所示
24:17 - 24:20
So the the MySQL explained is not as good
So，我们在MySQL中使⽤explain所返回的东⻄，布局看起来有点糟糕
24:22 - 24:24
But basically it's not a tree structure
但简单来讲，这并不是⼀个树形结构
24.24-24.27
be a bit is reading here it says this is here's the index I could possibly use
它这⾥说了，这是我所可以使⽤的索引
24:27 - 24:29
So notice I have a hash index and I can use that
So，注意这⾥，我可以使⽤⼀个hash索引
24:31 - 24:33
And then if I do change that to be greater than this
然后，如果我修改下这⾥的条件判断部分，把等于号改成⼤于号
24.33-24.36
still uses it
这⾥依然是使⽤的hash索引吗？
24:39 - 24:44
No but it it says here the kind of hard to see it's small
这⾥字太⼩了，很难看清楚
24:46 - 24:47
It`s rolled over here
它应该是在这个位置
24.47-24.50
but see the there's a column here called rows
但可以看到这⾥有⼀列叫做rows
24.50-24.53
this is MySQL telling you how many rows is gonna I think I'm at the reading
我觉得MySQL会在这⼀列中告诉你它所读取的⾏数有多少
24:53 - 24:56
So that's twenty seven million wrapped around here
So，MySQL所读取的⾏数⼤概有2700万⾏
24:56 - 24.58
So it could use this hash index
So，它可以使⽤这个hash索引
24.58-25.01
but it's gonna fall back and do a simple sequential scan
但它会回退使⽤⼀个简单的循序扫描
25.01-25.05
whereas the one up above it could do it index probe to find exactly what it wanted
它也可以通过索引探针（index probe）来准确地找到我们想要的东⻄
25:06 - 25:11
Alright,alright so Postgres is now done we're coming back here
So，PostgreSQL现在⼲完活了，我们回到PostgreSQL这边
25:11 - 25:12
So now if I do limit one
So，现在如果我这⾥限制只返回第⼀条数据
25.12-25.15
right I get that first guy that I had before
那么我就拿到了和之前⼀样的第⼀条数据
25:15 - 25:20
Right, so this is saying it give me the very first tuple you find for this
So，这条SQL语句所表示的就是，数据库会将我所查找数据中的第⼀条数据返回给我
25.20-25.21
and this is the min one that we found before
我们所找到的这条tuple的id是最⼩的
25.21-25.23
because this guarantee that this was inserted order
因为这⾥保证是按照插⼊的顺序进⾏查找的
25:24 - 25:33
So if I do this now, if I say I delete, that email address delete ,emails where email equals
this thing
SQL语句如图所示
25:38 - 25:40
Then you go ask for the first one
然后我们再来查找这⾥⾯的第⼀条数据
25.40-25.41
now I get a different fake email address
现在，我就得到了⼀个不同的假email地址
25:42 - 25:51
But now let me insert another one back in insert into emails values default ,because it's
a auto incrementing key insert my guy back in
但现在让我将刚刚删除的数据再插⼊回去，因为这⾥的key是⾃增的，所以我写default即可
25:54 - 25:56 ！！！！！！！！！！！
Right, it's still not in sorted order
这⾥它依然不是按照我们那个排序来给的数据
25.56-25.59
because it only did that operation once
因为它只会做⼀次这样的操作
26:01 - 26:01
Any questions
有任何疑问吗
26:06 - 26:12
This question is it to enforce sort order I'd have to run cluster over and over again
他的问题是，为了保持有序，我是否得必须⼀遍⼜⼀遍地调⽤cluster
26:12 - 26:13
For Postgres yes
对于PostgreSQL来说，确实如此
26.13-26.14
for other systems you do not have to do that
但在其他系统中，我们⽆须这样做
26.14-26.17
you can say I wanted to be all to automatically cluster by the index
你可以让系统这样做，即我想让这些tuple都能⾃动按照索引来聚集在⼀起（即聚集索引）
26:21 - 26:27
This question is does the column need to be indexed before we cluster
他的问题是，在我们进⾏cluster操作前，我们是否先要对列进⾏索引
26.23-26.24
no
No
26.24-26.27
so MySQL it's sorted by the primary key
MySQL是按照主键来进⾏排序的
26:29 - 26:33
So in MySQL the leaf nodes are actually the tuples themselves
So，在MySQL中，叶⼦节点实际上就是tuple它本身
26:34 - 26:37
So as I'm moving things around splitting and merging
So，当我将数据进⾏移动，拆分，合并时
26.37-26.39
the leaf nodes always be in that sort of order
叶⼦节点始终是按照主键排序的
26:39 - 26:41
So if I want to do a sequential scan on the table
So，如果我想在表中进⾏循序扫描
26.41-26.42
I'm basically always following leaf nodes
基本上来讲，我就始终沿着叶⼦节点来扫描
26:43 - 26:46
And so in other systems like Oracle and SQL Server, DB2
So，在其他系统中，⽐如Oracle，SQL Server和DB2中
26.46-26.49
you can say create this table and sorted by these columns
你可以这样做，在创建表的时候，你指定按这些列进⾏排序
26.49-26.50
and I'll do it for you,
我会向你们展示这些
26:54 - 26.55
yes
请问
27:05 - 27:06
This question is
他的问题是
27.06-27.16
I said that we could use the physical ID ,sorry the physical location the page ID and the
slot number as the record ID to determine to make the tuples unique
我之前说起，我们使⽤tuple所在的物理位置（即page id和slot号）作为record id，以此让这些
tuple变得与众不同
27.16-27.21
instead why not use the timestamp of when the tuple was inserted
为什么我们不使⽤tuple插⼊时的时间戳来代替这种record id设计呢？
27:24 - 27:28
so in Postgres this is an issue from MySQL this won't be an issue
So，在PostgreSQL中，这样做会有问题，但在MySQL中这样做没问题
27:29 - 27:30
What's the problem a timestamp
如果使⽤时间戳，会有什么问题呢
27:35 - 27:37
He said in distributed setting the times aren't going to be synchronized
这位同学说，在分布式系统中，时间并不会被同步
27:38 - 27:38
Yes
说得对
27.38-27.39
even more simple
更加简单的说法是
27.39-27.45
that is an issue leap second, leap years, right
在遇上闰秒和闰年时，这就会有问题了
27:46 - 27:49
So now again they repeat the second now what happens
So，现在如果遇上重复的秒，那会发⽣什么呢？
27:49 - 27:54
I insert something now they have the same timestamp or clocks can drift by clocks are
horribly inaccurate
现在我所插⼊的数据它们的时间戳是⼀样的，时间可能会随着时钟漂移，这样会⾮常不准确（知
秋注：本地时钟⽐较慢，先插⼊了⼀些数据，校正后，⼜插⼊⼀波数据，那时间戳可能重复）
27:56 - 27.58
So you know I run NTP every so often
So，我经常会使⽤NTP服务（⽤来校准电脑时间）
27.58-28.00
and now it slowly just the clock
现在，时钟⾛的慢了
28.00-28.03
but occasionally has to do big big steps you might repeat a second
但如果出现本地时钟慢了挺多，在时间校正后，你就可能会重复读秒
28:04 - 28:04
yes
请问
28:11 - 28:15
This question what's there between doing the record a versus milliseconds versus the
unity......
它的问题是使⽤record id或毫秒来作为key中的元素，这⾥⾯有什么区别
28:27 - 28:28
Yeah so he's right
So，他说的没错
28.28-28.33
milliseconds since the unix file particularly beer it won't help drift
UNIX时间戳指的是1970年1⽉1⽇0时0分0秒起⾄现在的总秒数，不考虑闰秒，它对于时钟漂移
并没有任何帮助
28:33 - 28:36
Right if the clock has to get stepped back you repeat seconds
如果时钟调回去的话，你就会重复读秒
28:37 - 28:39
Nobody uses a time stamps in that way
So，没有⼈会将时间戳⽤在这种事情上
28.39-28.42
you can use logical time stamps which we'll talk about later on
但我们可以使⽤逻辑时间戳，这个我们之后会讲
28:43 - 28:47
You always want almost never want to use hard physical clocks
你们永远不会想去使⽤物理时钟
28:47 - 28:50
You used in conjunction with other things
你可以将它与其他东⻄⼀起使⽤
28:51 -28:51
Yes
请问
28:55 - 29:00
Her question is when would you want to use a clustering index when if you already have
an index
她的问题是，在我们如果已经有了⼀个索引的情况下，我们什么时候想去使⽤⼀个聚簇索引呢？
29:00 - 29:04
So again like in the case of MySQL, I should show an example
这⾥我通过MySQL来向你们演示⼀个例⼦
29:04- 29:05
In MySQL
在MySQL中
29.05-29.07
it's always a cluster index
它始终使⽤的是⼀个聚簇索引
29.07-29.09
when I call create table，it's always clustered on that
当我创建表的时候，它始终会使⽤聚簇索引
29:11 - 29:12
There are some cases
这⾥有⼀些例⼦
29.12-29.19
where for certain queries it for certain queries
对于某些查询来说
29.19-29.20
you can be smart about like alright,
你们可以很聪明的想到
29.20-29.25
well if I'm clustering on the only logical timestamp one of us inserted like the application
told me the time stamp
Well，如果我只在逻辑时间戳上进⾏聚簇
29:27 - 29:31
Then now maybe I can say well take the last day of data
接着，我会说，我想要昨天的数据
29.31-29.35
and put it on the fast disk,and the older stuff puts on slower disk
我们将昨天的数据放在速度快的磁盘上，⽼数据则放在速度慢的磁盘上
29:36 - 29:38
There's ways to do like disk partitioning that way
我们可以通过⼀些⽅法来做到诸如磁盘分区之类的事情
29.38-29.42
and database system we can enforce that all for me underneath the covers
我们可以让数据库系统在幕后强制为我们做这些事情
30:06 - 30:11
So you say this if if I have if I'm if I'm clustered on email index on email
So，如果我在email上使⽤聚簇索引
30.11-30.13
and that's my primary key
这就是我的主键
30.15-30.16
and then primary keys ID
30:16 - 30:24
So if you have a primary key we'll see this in a second you always have an index on that
ID or on that attributes
So，如果你有⼀个主键，这个我们稍后会看到。我们始终会在这个id或者这个属性上建⽴索引
30:27 - 30:29
To cut yeah, so they update the index yes
So，它们得去更新索引
30:30 - 30:32
Depends how you store your indexes
这取决于你存储索引的⽅式
30.32-30.35
we'll get to that later like in if we'll get that one called multiple version
我们之后会谈到⼀种叫做多版本控制的东⻄
30:35 - 30:41
So you the the pointer could be the primary key or it could be the record locations
record ID
这个指针可以是主键，它也可以是record的位置，即record id
30:42 - 30:43
You can do different things
不同的数据库，它们的做法也不⼀样
30.43-30.46
Postgres does record ID
PostgreSQL使⽤的是record id
30.46-30.47
so we have to update all the time
So，我们不得不⼀直更新
30.47-30.48
MySQL does primary key
MySQL则使⽤的是主键
30:51 - 30:59
All right, so we actually can poke around and Postgres real quickly and see what the see
what the you know what's roughly what the tree looks like
So，在PostgreSQL执⾏的这段时间，我们可以先闲扯⼀会，稍后我们⼤概看下这个tree是什么
样⼦的
31:00 - 31:06
Right, so this is just an extension Postgres that allows you to get information about
what's in the tree
So，这个是PostgreSQL中的⼀个扩展组件，它会告诉我们这个tree中的相关信息
31:06 - 31:10
Right, so I can say I had this index called you know on the B+tree
这⾥我所使⽤的索引是B+ Tree
31.10-31.17
and I can say you know give me information about it, tells me how many levels it has,
tells me how many elements it is storing and the root block size
通过它，我能够知道索引中的信息，⽐如说这个B+ Tree有多少层，它⾥⾯保存了多少个元素，
以及它的block size
31:17 - 31:23
So then we can go even further and we can actually get inspect the contents of the tree
with this command here
So，我们可以进⼀步深⼊，实际上我们可以通过这个命令来查看这个tree中的内容
31:25 - 31:29
And you know the actual details doesn't matter ,but there's a bunch of hex stuff
我们不⽤管这⾥⾯的实际细节，但这⾥⾯有⼀堆⼗六进制的东⻄
31:29 - 31:30
Right,so this is the root node
So，这就是根节点
31:30 - 31:34
So we can go go a bit deeper now,
So，我们可以更加深⼊⼀点
31.34-31.37
and show you you know for a single node here's some information about it
向你们展示下单个节点中的某些信息
31:37 - 31:40
But then we that's all hex, but we can decode it
但这⾥⾯都是些⼗六进制的东⻄，不过我们可以对其进⾏解码
31:41 - 31:44
And then here's a know here's this proving that it's actually storing these emails
这⾥所展示的就是实际保存在数据库中的email
31:45 - 31:50
So this is saying that here's a record at offset 3 in my root node or in this particular
node in the tree
So，这⾥表示，在这个tree中的根节点或者是某个特定节点中offset值为3的地⽅有⼀个record
31:50 - 31:53
Here's the you know page number and offset where it's located
这⾥是该record所在的page号和offset值
31:54 - 31:58
Here's the hex form of what's being stored and then there's the actual email address
这⾥是存储的是⼗六进制形式的数据，接着，这⾥是实际的email地址
32:00 - 32:04
Right, so again the the database system gonna store entire copies of these keys on the
inside
So，数据库系统会在内部存储这些key的完整拷⻉
32:04 - 32:09
All right, we're gonna stop now and keep going to bunch other stuff we want to get
through
So，我们先不谈这个了，我们这节课还要讲些别的东⻄
32:10 - 32:17
But that's just getting to show you that you can by default you're always going to get a
B+tree
但这⾥我想向你们展示的是，默认情况下，我们始终使⽤的是B+ Tree
32:17 - 32:21
But you can for some systems to tell you I want a hash index and there's different tradeoffs for doing this
但在其他系统中，我们可以使⽤hash索引，在这些事情⽅⾯有些不同的取舍
32:22 - 32:29
Alright, so now related to the point he said about the the primary key you know and the
vs. the clustering index
So，现在我们要谈论的东⻄就是他之前说的，关于主键，B+ Tree vs. Hash索引以及聚集索引
32:30 - 32:31
So if you create a primary key
So，如果你创建⼀个主键
32.31-32.35
the database system will automatically create an index for you
数据库系统会⾃动为你创建索引
32:36 - 32:37
Actually for any time
实际上，在任何时候
32.37-32.42
you declare a an integrity constraint, it will automatically create an index for you
当你声明⼀个integrity constraint时，它就会⾃动为你创建⼀个索引
32:42 - 32:43
And you think about it has to
它必须这么做
32.43-32.48
because otherwise the only way to enforce that is do a sequential scan
否则，唯⼀能强制执⾏的⽅式就是进⾏循序扫描
32:48 - 32:50
So in my auto increment key
So，在我的⾃增键中
32.50-32.53
if I had it to enforce the primary key uniqueness of it
如果我要强制保证主键的唯⼀性
32:53 - 32.55
Every single time I inserted that
当每次我要插⼊数据时
32.55-32.58
you know you need to blow up,but I didn't have an index
因为我没有使⽤索引
32.58-33.02
I had to scan every single tuple all over just make sure there's nobody has the same key
我必须扫描每个tuple，以此来保证所有tuple的key都是不同的
33:04 - 33:08
So again every database system will do this automatically for primary key and unique
constraints
So，所有数据库系统都会⾃动为主键做唯⼀性约束
33:08 - 33:09
so basically again
So，简单来说
33.09-33.10
when I create the table
当我创建表时
33.10-33.12
if I have primary key unique
如果我的主键是唯⼀的
33.12-33.14
it's the same thing as running these commands
这和运⾏这些命令的效果是⼀样的
33.14-33.18
I'll create the table then it goes heads and creates these indexes
当我创建表时，它就会创建这些索引
33:19 - 33:21
For foreign keys it doesn't actually do this
对于外键来说，数据库实际上不会做这些
33:22 - 33:25
So if I create a new table here called bar
So，如果这⾥我创建⼀个叫做bar的表
33.25-33.28
and has a foreign key reference to this value here
它通过⼀个外键索引到了这个val1上
33.28-33.31
every database system that I ever try this on will always throw an error
我曾经在每个数据库系统中都试过这样做，但⼀直报错
33:32 - 33:40
Because it's saying I doesn't have a way to enforce this referential integrity constraint
without an index
因为数据库系统表示，在没有索引的情况下，我们⽆法强⾏使⽤引⽤完整性约束（referential
integrity constraint）
33:42 - 33:43
Right, you think it could make automatically create one
你可以认为它会⾃动创建⼀个
33.43-33.44
but it doesn't do that
但其实数据库系统并不会这么做
33.44-33.46
because it doesn't know because this has to be unique
因为它并不知道这个必须是唯⼀的
33:47 - 33:49
Right,so it won't actually do this
So，它实际上并不会做这个
33.49-33.53
instead you just replace that with it as adding unique calls here
相反，你需要在此添加⼀个UNIQUE关键字
33.53-33.56
and that's builds an index automatically for you
这会为我们⾃动构建⼀个索引
33.56-33.58
that it can then use to enforce this
然后就可以强制这样做了
33:58 - 34:00
Right,because think about basically the way foreign keys work is
简单来思考下外键的⼯作原理
34.00-34.03
that every single time, I insert a tuple into bar
每次当我将⼀个tuple插⼊bar表中
34.03-34.05
I have to have the ID thing
我必须要有这个id
34:05 - 34:09
So then to make sure that it matches to a tuple in this table
So，为了确保它能匹配到foo表中的⼀个tuple
34.09-34.10
I can do a lookup in that index
我可以在索引中进⾏⼀次查找
34.10-34.16
and see whether there is a you know parent referential match
看看是否有⼀个外部引⽤可以匹配
============================================================
34:16 - 34:23
So now let's talk about different ways to actually use indexes beyond the you know copy
the whole key that we talked about here today
So，除了我们今天所讨论的复制整个key的这种⽅式以外，现在我们要来讲下索引还有哪些使⽤
⽅式
34:24 - 34:28
So the first thing that we can do is called a partial index
So，⾸先我们能做的事情就是使⽤部分索引
34:28 - 34:32
So when you normally call create index on a table
So，当你在表中正常创建索引时
34.32-34.36
it does a sequential scan across the entire table and looks at every single tuple
它会对整个表进⾏循序扫描，并且扫描每个tuple
34:36 - 34:38
But in many cases
但在许多例⼦中
34.38-34.40
for a lot of applications
对于许多应⽤程序中
34.40-34.43
maybe you don't need to have an index in entire table
可能你不需要在整个表上使⽤索引
34:43 - 34:47
And instead you always want to maybe almost you know some subset of the data
相反，你可能想要的是在某些数据⼦集上进⾏索引
34:47 - 34:49
So this is what a partial index is
So，这就是部分索引
34:49 - 34:52
You basically modify the create index command
我们简单修改下这个创建索引的命令
34.52-34.55
and you add this where clause at the end
我们在SQL末尾添加这个where⼦句
34.55-35.01
that tells you what tuple should be matched in order to be put into this index
以此表示：当tuple 匹配这个条件后就可以放进这个索引中
35:01 - 35:02
So now if I want to do a lookup like this
So，现在如果我想进⾏这样⼀次查找
35.05-35.06
select b from foo where a=123 and C =’ WuTang’
SQL语句如图所示
35:07 - 35:09
So I've built the index on A and B
So，我已经在a和b上⾯构建了索引
35.09-35.15
my where Clause has reference to A
我的where⼦句中涉及到a
35:13 - 35:14
So I can still use this index
So，我依然可以使⽤这个索引
35.14-35.21
but I can also look at this thing and say,oh we're see it was WuTang, but I know this is
exactly the index I want to use
但当我看到这个东⻄的时候，可以看到这⾥有个WuTang，但我知道这确实是我想使⽤的索引
35:21 - 35:25
So then this allows me to do a more the index is leaner,
So，此处的索引更加精简
35.25-35.28
because I'm not storing all the information for all possible tuples
因为我并没有保存所有可能⽤到的tuple的信息
35.28-35.31
I'm only storing exactly whatever it matches where clause
我只保存匹配我where⼦句的那些信息
35:32 - 35:36
So other query doesn't have this ’WuTang’, I can't use that index
So，如果其他查询中没有这个WuTang，那我就没法使⽤索引
35:38 - 35:39
So this is very common
So，这⾮常常⻅
35.39-35.44
when people do things like they want to separate I have different indexes for different
date ranges
⽐如⼈们想通过不同索引将不同⽇期范围的数据分开
35.44-35.46
like you know per month I'll have it index
⽐如，我在每个⽉份上建⽴索引
35:46 - 35:49
So I do look up quickly on all the orders I want for that you know for that month
So，这样我可以以我想要的顺序在该⽉中进⾏快速查找
35:50 -35.56
And again I'm trying to not have to pollute my buffer pool cache with a bunch of data
that I don't need by having a partial index
再说⼀遍，我试着通过使⽤⼀个部分索引来避免⼀堆我不需要的数据去污染我的buffer pool
35.56-36.00
now the heights gonna be lower and I quickly find the data that I'm looking for
树的⾼度就会变得更低，我也就能更快找到我所查找的数据
36:02 - 36:04
So in this particular example here
So，在这个例⼦中
36.04-36.06
for this query
对于这个查询来说
36.06-36.10
we were doing a lookup on a using C and we want to return B
这⾥我们的查询条件是a=123和c=WuTang，我们想返回b
36:11 - 36:17
It turns out actually for this particular query, all the data we need is in the index itself
事实证明，对于这个查询来说，我们所需要的所有数据就是索引本身
36:17 - 36:23
So remember I said normally the index would for a given key would produce a record ID
So，还记得我之前所说的，正常情况下，对于⼀个给定key的索引来说，它会⽣成⼀个record id
36.23-36.27
that you could then follow that to in the table heap, and get the tuple that you were
looking for
然后，你可以按照这个record id来到表堆⾥⾯，拿到你正在查找的那个tuple
36:27 - 36:28
But for this particular query here
但对于此处的这个查询来说
36.28-36.30
we don't actually even need to even look at the tuple
实际上，我们甚⾄都不需要去看这个tuple
36:31 - 36:33
Because we need a to do the lookup that's in there
因为我们需要a来进⾏查找，a在这⾥
36.33-36.35
we need B that's in There,
我们也需要b，它在这⾥
36.35-36.38
and C's already handled by the partial index where clause
这⾥的c已经被where⼦句中的部分索引处理完了
36:38 - 36:40
So to answer this query
So，为了给出这个查询的结果
36.40-36.42
we only need to actually look at the index
我们只需要看下这个索引
36.42-36.45
we never actually need to look at the underlying tuple in the table
我们实际上永远不需要去查看表中的这些底层tuple
36:46 - 36:48
So this is what is called a covering index
So，这被称为覆盖索引（covering index）
36:49 - 36.50
A covering index means that
覆盖索引指的是
36.50-37.00
the all the fields that are necessary to answer the the require result for the query are
produced can be found in the index itself
响应查询需求结果所需的所有字段都能在索引本身中找到
37:00 - 37:04
I so you don't declare an index as a covering index
你并不需要将⼀个索引声明为覆盖索引
37:04 - 37:06
This is something the database system figures out for you automatically
数据库系统会⾃动为你这么做
37.06-37.10
I knows of your query is it knows a new index that says everything I need is in here
它知道你的查询是什么，也知道索引是什么，数据库系统就会表示我所需要的东⻄都在这了
37:10 - 37:12
So again just using this example simple example
So，我们再来看下这个例⼦
37.12-37.19
I can get the B field the a and B field can be found exactly from this the index
我可以从这个索引中准确地找到a和b字段
37:19 - 37:21
And I never need to look at the actual tuple
并且我永远不需要去查看实际的tuple是怎么样的
37:21 - 37:23
I can do this work for a bunch of different queries
我可以让它应⽤于⼀系列不同的查询中
37.23-37.24
I can do this for aggregations
我可以在聚合操作⾥⾯做这种事情
37.24-37.26
I can do this for joins
也可以在Join中这样做
37.26-37.27
and the advantage here
此处它的优势是
37.27-37.36
it's one less you know page ID lookup and the page table and maybe one disk IO to not
have to go look at the underlying tuple for this
在通过page id和page表中进⾏查找时，可能需要⼀次磁盘IO，⽽它（覆盖索引）⽆须这样去查
看底层tuple
37:38 - 37:41
So the a bunch of different database systems support this
So，有⼀堆数据库系统都⽀持这个
37:42 - 37:48
All the commercial guys do Mongo does,I don't think MySQL, Postgres to I may be wrong
about that
所有商⽤数据库系统也都⽀持这个，MongoDB也⽀持，但我不觉得MySQL和PostgreSQL⽀持
这个，也有可能是我记错了
37:49 - 37:52
But this is a big win, right if you can do this, this is a huge deal
但这是⼀个很强⼤的点，如果你们能做出这个，那么就会很成功
37:52 - 37:56
Okay,I don't think Postgres can do this for reasons we'll talk about later
Ok，我不觉得PostgreSQL能这样做。⾄于理由，我们稍后会说
37:57 - 38:01
So for this simple example, this is great, right
对于这个简单例⼦来说，这样做很棒
38:01 - 38:03
I need a and B a B can found the index
我需要a和b，通过a和b我能找到索引
·
38:04 - 38:12
But what I have now another I have another attribute that I want to be able to do a lookup on or get for my query
但现在我有另⼀个属性，我想通过它来进⾏查询
38:12 - 38:15
But I don't actually want to build the index on that attribute
但我实际上并不会在这个属性上构建索引
38:16 - 38:20
All right, so my table has column a B and C ,maybe I don't want to index on the c
So，我的表上有三列，分别为a，b和c，我可能并不想在c上建⽴索引
38:21 - 38:24
But it'd still be nice to have a covering index not have to go look at the tuple
如果使⽤覆盖索引，就会很nice。这样⽆须去查看tuple
38:25 - 38:28
So this is what the include columns allows you to do
So，这就是include column所允许我们做的事情
38.28-38.31
basically include column allows you to say
简单来讲，include column允许你做这些事情
38.31-38.35
for all the keys that I'm storing for my leaf pages
即，对于所有我保存在leaf page上的key来说
38.35-38.38
my leaf nodes also include these additional attributes
我的叶⼦节点也包含这些额外的属性
38:39 - 38:41
So this case I'm building index on a and B
So，在这个例⼦中，我在a和b上建⽴了索引
38.41-38.44
all the inner nodes only have keys a and B
所有的inner node上只保存了key a和b
38:44 - 38:46
And when I do lookups I only examine a and B
当我进⾏查找时，我只需对a和b进⾏检查就⾏
38:46 - 38:48
But when I land into the leaf nodes
但当我落到叶⼦节点上时
38.48-38.54
I can also get the C attribute value for every single entry in there
我也能得到在该叶⼦节点上每个条⽬的c属性的值
38:54 - 38.57
Right,so now again if I go back to my other query here
So，现在如果来看下我这⾥的另⼀个查询
38.57-39.00
select B from foo where a=123 and C=’WuTang’
SQL语句如图所示
39:00 - 39:03
I do might look up on a follow that down
我先对a进⾏查找，然后顺着往下
39.03-39.05
then as I'm scanning along the leaf nodes
接着，当我正在沿着叶⼦结点进⾏扫描时
39:06 - 39:12
I can look at the values at C that's packed in the leaf nodes and also value my predicate
it produced by my output
我可以查看打包放在叶⼦节点中的c属性的值，接着通过我的条件来判断该值，以确定对应tuple
是否为我需要的输出
39:14 - 39:20
So this one is also this one's more rare than the covering index support
So，⽐起对覆盖索引的⽀持度来说，⽀持这种东⻄的数据库系统就更少了
39:20 - 39:22
So a lot of systems support the partial indexes
So，许多系统都⽀持部分索引
39.22-39.27
slightly fewer systems support the covering indexes this one is even more rare
少量系统⽀持覆盖索引，但这种就更少了
39:27 - 39:31
I think this is Postgres 11 has yeah sorry, Postgres 11 gonna add this or has it now
我觉得PostgreSQL 11现在已经⽀持它了
39.31-39.33
SQL Server has it
SQL server也⽀持它
39.33-39.38
but MySQL doesn't support this, and Oracle does not support this
但MySQL和Oracle都不⽀持它
39:38 - 39:40
So again the key thing about this is that
So，这⾥的关键在于
39.40-39.44
although we can do a look up on c in where clause
尽管我们可以通过where⼦句中的c来进⾏查找
39.44-39.45
it's not in the inner node
它并不在inner node中
39.45-39.49
sort the we're not you know greatly increasing the size of the overall index
这并不会让索引整体的⼤⼩变得太⼤
39:51 - 39:54
The last kind of index we want to talk about our functional expression indexes
我们想讨论的最后⼀种索引就是函数式/表达式索引
39:55 - 39.58
So again everything we've shown so far anytime we declare index
So，⽬前为⽌在我们所展示的所有东⻄⾥，在任何时候我们声明索引时
39.58-40.02
we're always creating an exact copy of the key that's in the tuple and putting that in our
index
我们始终要先创建tuple中key的⼀个准确拷⻉，并将它放到我们的索引中
40:03 - 40:06
But there may be some kind of some queries out there
但这⾥可能存在着某种类型的查询
40.06-40.10
where we don't actually want to do a lookup on the exact value of a key
在这种查询中，我们实际上不想通过某个key的⾃身的值进⾏查找
40:11 - 40:14
we want to do a lookup on some value that we derived from the key
我们想通过该key所衍⽣出的某些值来进⾏查找
40:15 - 40:16
so let's say I have a simple example here
So，这⾥我有⼀个简单的例⼦
40.16-40.18
I have this users table
我有这个users表
40.18-40.23
and I want to do a lookup and find all the users that logged in on the Tuesday
我想查找下在周⼆登录的所有user数据
08-03
40:23 - 40:30
So this extract function takes a timestamp ,and you pass in what element of the the date
or timestamp you want
So，这个extract函数会接收⼀个时间戳，根据你的需要，你可以传⼊⽇期元素或者是时间戳
40:30 - 40:31
So dow means day of week
So，dow指的是day of week
40:32 - 40:35
And so this is saying extract the day of week from the login timestamp field
So，这⾥表示的是从login字段中提取出星期⼏
40.35-40.37
and find the ones where it equals 2
并找到结果等于2的那些数据
40.37-40.42
its Tuesdays 2 ,Sunday 0 ,Monday 1 ,Tuesday 2
星期⼆代表的是2，星期⽇是0，星期⼀则是1
40:42 - 40:45
So if I create an index like this
So，如果我创建⼀个像这样的索引
40.45-40.46
as we've shown so far
正如我们之前所展示的那样
40:47 - 40:49
Right, this won't work, why
这种做法是不奏效的，为什么会这样呢？
40:52 - 40:52
Yes
请讲
40:59 - 41:00
Correct
说的没错
41.00-41.09
so this one who says he says you have to know how to extract our pull out exactly what
ranges will correspond to Tuesday
So，他说的是，我们必须知道该如何准确的将星期⼆所对应的这⼀系列tuples给拉出来
41:10 - 41:12
And so you can kind of be smart say oh well my query looks like this
So，你们能够很聪明的说出，我的查询是⻓这样的
41.12-41.18
I could say well here's the ranges of timestamps where Tuesday can be found
我可以说，Well，这⾥，我们可以找到星期⼆所对应的索引区间
41:18 - 41:20
But as far as I know no system actually does this
但据我所知，实际上没有系统能做到这点
41:21 - 41:26
So instead we which you can just do is not use this,and create a functional index or
expression index
So，我们所能做的就是使⽤⼀个函数索引或者是表达式索引来做，⽽不是使⽤上⾯这种⽅法
41.26-41.33
where the actual the attributes your indexing on can be any arbitrary expression
你可以使⽤任意表达式来对这些属性进⾏索引
41:33 - 41:37
Anything you can have in a where clause you can build a index on
所有你放在where⼦句中的东⻄，你都可以对其建⽴索引
41:38 - 41:39
All right
41.39-41.42
so now what I'm gonna do a lookup
So，现在我就来进⾏查找
41.42-41.44
and for this predicate
对于此处的条件判断来说
41.44-41.51
I know how to exactly satisfy it by do look at every feed that,
我知道该如何满⾜这⾥的条件判断部分
44.51-41.54
just getting along here finding all the the the twos that match what we want
只需在这个区间中进⾏扫描，以此找到所有匹配2的时间戳
41:58 - 42:01
What's another way we could speed this query up too then we've already shown before
我们之前已经展示过另⼀种加速该查询速度的⽅法了
42:05 - 42:06
The partial index way right
那就是使⽤部分索引
42:07 - 42:12
So instead of creating an index for exactly for the extracted day a week
So，我们⽆须为从⼀周中提取出来的星期⼏建⽴索引
42:13 - 42:21
I instead just use that as my where clause to say put only the elements where the extract
value produces two
这⾥，在建⽴索引的时候，我只是将它放在我的where⼦句中，并表示找到dow等于2的所有元
素
42:24 - 42:28
Right, so let's do a demo this in Postgres
So，我们在PostgreSQL中看个demo吧
42:29 - 42:31
So Postgres has the partial indexes
So，我们可以在PostgreSQL中使⽤部分索引
42.31-42.34
it doesn't have covering indexes
但它并不⽀持覆盖索引
42.34-42.39
and then the version I have here is 10,so it doesn't have the include clauses
然后，这⾥我使⽤的版本是PostgreSQL 10。So，这⾥并没有include⼦句
42:39 - 42:41
But we can play around partial indexes verses the functional indexes
但我们可以对部分索引和函数式索引进⾏对⽐
42:44 - 42:46
Alright, so for this we're going to create a table
So，这⾥我们要去创建⼀张表
42.46-42.53
make sure we turn off parallel workers and timings on ,alright
这⾥我们要确保把parallel_workers选项给关了，然后打开timing选项
42:53 - 43:00
So we're gonna create a table that has again ID field and a login timestamp
So，这⾥我们要去创建⼀张表，它⾥⾯有⼀个id字段，还有⼀个类型为timestamp的login字段
43:01 - 43:05
And then this is going to be a simple this insert query
接着，这⾥有⼀个insert查询语句
43.05-43.08
it's just going to insert a bunch of records
它要去插⼊⼀堆记录
43.08-43.16
a bunch of unique timestamps since 2015 to now at one-minute intervals
即插⼊⼀些⾃2015年到现在的唯⼀时间戳，它们之间的间隔是1分钟
43:16 - 43:20
Right, and this is gonna generate looks like to two million records
这样⼤概要⽣成200万条记录
43:22 - 43:24
So in sake of time makes us go fast
因为时间的缘故，我们得快点了
43.24-43.25
so we'll PG warm everything
So，这⾥我们使⽤pg_prewarm
43.25-43.27
now everything's in our buffer pool
现在，所有数据都在我们的buffer pool⾥⾯了
43:27 -43:29
So say this is the query we want to run
So，这⾥是我们想执⾏的查询
43:30 - 43:36
We want to get the average ID of users where the the day week is they logged in on the
Tuesday
我们想去获取每周⼆登录的⽤户的id的平均值
43:37 - 43:40
Right, so in this case here when we run explain
So，在这个例⼦中，当我们对这条SQL进⾏explain时
43.40-43.42
yeah it has to do a sequential scan
没错，这⾥所做的是循序扫描(sequential scan )
43:43 - 43:44
There's no index
这⾥并没有索引
43:45 - 43:49
So the first index we can build is the expression index
So，我们所能构建的第⼀个索引就是表达式索引
43.49-43.53
and this shouldn't take long
这应该不会花太久
43:53 - 43:56
So now when we run explain
So，现在当我们对SQL进⾏explain时
43.56-44.00
we can see that it's able to pick out and use that expression index,we just built
我们可以看到PostgreSQL能够使⽤我们刚构建的表达式索引
44:00 - 44:01
All right
44.01-44.03 ！！！！！
and again the way it did that it said
这⾥表示
44.03-44.11
oh I know you're trying to do a lookup on this you know extract function where the
output is 2
Oh，我知道你正试着通过这个extract函数（它的输出值为2）来进⾏查找
44:11 - 44:15
So I just need to do a look up and say find me all the values where it equals 2
So，我只需去进⾏查找，找到所有等于2的值
44:18 - 44:19
So then we can add the partial index
So，接着我们可以添加部分索引
44:22- 44:25
Again this is now creating a smaller index
现在我们创建了⼀个更⼩的索引
44.25-44.33
it only contains the the records where that extract function equals 2
它⾥⾯只包含满⾜extract函数返回值为2的记录
44:33 - 44:36
So now if I go back to my function here
So，现在如果我回到这⾥的函数
44.36-44.38
and I see now it actually wants to pick that index
现在可以看到，实际上，它想去使⽤这个索引
44:38 - 44:47
Because that's gonna be a smaller less, it's a the trees is is has a lower height, and I just
find exactly what I want immediately ！！
因为它的体积更⼩，树的⾼度也更低，我也能⽴即准确地找到我想要的东⻄
44:49 - 44:55
So again the database system can figure out on its own which is the best access method
to use for all these different choices
So，数据库系统⾃⼰可以从这些不同的选择中找出最好的访问⽅法并使⽤
44:57 - 44.59
All right, so any questions about this
So，对此有任何疑问吗？
44.59-45.00
yes
请问
45:10 - 45:12
Okay,so he said
Ok，So 他所说的是
45.12-45.13
so let's try it out right
So，让我们来试⼀下吧
45.13-45.15
so drop index
So，这⾥我们把索引给drop了
45.15-45.17
so save it is
So，保存⼀下
45.17-45.28
what happens if my expression is a it's based on some some difference or using the
current timestamp
如果我的表达式使⽤的是当前时间戳，这会发⽣什么呢？
45.28-45.33
it`s not that gonna change every single time I run it
在我每次运⾏它的时候，它并不会改变
45:33 - 45:36
So I think what Postgres is gonna do
So，我认为PostgreSQL会这样做
45:37 - 45:44
So let's do the expression index where is that yeah
So，我们来试下这个，它在哪呢？在这
45:44 - 45:46
So he's saying do this
So，这样做
45.46-45.47
take a login
这⾥传⼊⼀个login字段
45.47-45.51
and again I can put anything I want here
再说⼀遍，这⾥我可以放⼊我想要的任何东⻄
45.51-45.52
login is a valid expression
login是⼀个有效的表达式
45:52 - 45:57
So I can say take my login and subtract out now the current timestamp
So，这⾥我可以⽤当前时间的时间戳减去login（它的属性是时间戳）
46:02 - 46:03
Doesn't let you do that
看来不能这么写
46:04 - 46:06
Okay, how to do this in
Ok，在PostgreSQL中该怎么做呢（Andy：我太难了）
46:15 - 46:19
Yeah,forget this forget the subtraction in Postgres
算了，忘了它吧，我也不知道PostgreSQL中这⾥该怎么⽤减法操作
46:22 - 46:23
Can you do that
你们会做么？
46:25 - 46:26
That works okay
这样可⾏
46.26-46.30
okay could you do this
Ok，应该这样做
46.30-46.32
okay
46:32 - 46:32
No
⼜不⾏！
46:38 - 46:38
No
还是不⾏
46.38-46.41
let's just do it let's do some more
我们再来试⼀些其他的
46.41-46.42
so let's take a login subtract 100 from it
So，我们来试下login-100
46:44 - 46:45
Didn't like that either
这也不对
46:47 - 46:48
Yeah all right,
算了，我放弃！
46.48-46.51
so basically what happens
So，简单来讲，这⾥发⽣了什么呢？
46.51-46.52
when we call create index
当我们创建索引时
46.52-46.53 ！！！！！！！
it'll run the malfunction once
它会运转失灵⼀次
它并不起作⽤
46.53-46.56
and whatever that timestamp is now that now now
不管这个时间戳是不是是什么，它其实就是现在（执⾏命令的那⼀刻）
这个时间戳就是这个now()得到的
46:57 - 47。01
Later on it doesn't change it's not dynamic，as it builds the index
之后，当它构建索引时，它并不会改变，它并不是动态的
在构建索引的时候，在调⽤now()之后，它就不会改变了，它不是动态的（知秋注：now()在作
为参数传⼊⼀个函数时，会⽴即计算出结果）
47:01 - 47:03
So now if I insert something again
So，现在如果我插⼊某些东⻄
47.03-47.06
in theory
从理论上来讲
47.06-47.10
it should now use that the correct current now
它应该使⽤的是当前的时间戳
47:11 - 47:12
If it's smart
如果DBMS很智能的话
47.12-47.15
it could say well wasn't now at the time when I built the index
它应该不会使⽤我构建索引的时间来做这种事情
当我构建索引时，它应该不允许使⽤now()来表示当前时间（知秋注：这⾥是Andy从视频中的
NOW()报错推测的）
47.15-47.17
I don't know whether it does that or not
我也不知道它会不会这样做
47:17 - 47:20
But again so you can't do certain stupid things
但再说⼀遍，你们没法做这种愚蠢的事情
47.20-47.24
like you can't do like one build an index on 1
⽐如，在1上⾯构建索引
47:24 - 47:27
But I should be able to do id + 1
但这⾥我应该能写id+1
47:27 - 47:30
Now wait what am I what am I missing here
等等，我这⾥是不是少了什么
47:34 - 47:40
Oh he's this, yeah that's what it was write them double parenthesis
Oh，这⾥应该是双括号，我漏写了（Andy：我太难了）
47:41 - 47:43
So yeah so now I can't and won't let me do this
So，让我来做下这个
47:51 - 47:57
let's try has other example
我们来试下另⼀个例⼦
48:05 - 48:07
Functions and expression must be marked immutable
函数和表达式必须得标记为不可变的
48.07-48.08
there go
再来⼀次
48:08 - 48:11
Yeah,but I should be able to do this right like
但我应该能这么做啊（Andy：我好难）
48:20 - 48:20
No timestamp
看来不能这么搞
48.20-48.23
that right anyway ,let's get my point
算了，就这样吧
48:23 - 48:27
Yeah,there's this thing called well cut snapshots later on,
这⾥有个东⻄叫做snapshot
48.27-48.30
but like there's like the now at the time the query runs
但⽐如现在当查询执⾏时
48.30-48.36
and it has to be guarantee that's consistent for the snapshot and index self
它必须保证snapshot和索引的⼀致性
48:36 - 48:36
Yes
请讲
48:46 - 48:46
So this question is
So，他的问题是
48.46-48.49
when we create an index，what kind of index is going to create
当我们创建索引时，我们创建的索引类型是什么
48:50 - 48:51
so by default
So，默认情况下
48.51-48.53
it's going to create a B+ tree
它会去构建B+ Tree索引
48.53-48.57
if I add that using clause from before
如果我添加⼀个USING⼦句
48:58 - 49:02
So this this is a Postgres idiom, this is not in the SQL standard
So，这是PostgreSQL中的玩意，它并不属于SQL标准
49:02 - 49:05
So like if I add this using hash
So，如果我这⾥添加了USING HASH
49.05-49.07
this tells Postgres make me a hash index
这就告诉PostgreSQL去帮我构建⼀个hash索引
49.07-49.08
by default
默认情况下
49.08-49.10
everyone use you're gonna get a B+ tree
每个数据库都会去使⽤⼀个B+ Tree
49:23 - 49:23
Your question is
你的问题是
49.23-49.25
when you add an index
当你添加⼀个索引时
49.25-
you can make me put
49:29 -49:29
Yes
49:45 - 49:49
Sorry,so when you say you don't you don't need to look at the leaf nodes of what they
index
So，你说的是，你不需要去看叶⼦节点，以及什么索引？能说清楚吗？
49:54 - 49.55
All right, so I think your question is
So，我觉得你的问题是
49.55-49.56
if I have an index
如果我有⼀个索引
49.56-49.57
and if I do a lookup
如果我进⾏查找
49.57-50.02
for some queries I don't have to look at the actual tuples, I get to look at the indexes
对于某些查询来说，我不需要去看实际的tuple，我只需去看索引就⾏了
50:02 - 50:08
Yeah, you were calling like the tuples are you know in the table heap, don't they're not
leaf-nodes, leaf-nodes are the index
因为你知道你所要找的tuple都是放在表堆⾥⾯的，它们并不是叶⼦节点，叶⼦结点都是索引
50:09 - 50:11
Right,so I always have to look at the index
So，我始终得去看索引
50.11-50.13
because in a B+ tree I always have to go to the bottom
因为在⼀个B+ Tree中，我始终得跑到树的底层去做些事情（知秋注：通过树拿到pageID和
offset，到关于page的bufferPool中找对应tuple）
50:14 - 50:17
Okay,so you for some queries if you can do a covering index lookup
Ok，So，对于某些查询来说，如果你可以使⽤覆盖索引进⾏查找
50:18 - 50:20
I never have to look at the tuple
我就永远不需要去看tuple了
50:21 - 50:25
I can get all the information I need to compute the answer from the index itself
我可以从索引本身得到我需要的所有信息，以此来计算出答案
50.25-50.28
not all database systems support that though
并不是所有的数据库系统都⽀持它
50:30 - 50:33
So for what we talked about so far other than covering indexes
So，到⽬前为⽌，除了覆盖索引以外，我们还讨论了其他内容
50.33-50.42
the idea is that we can quickly find the the tuples that have the keys that we want to
lookup on without having to do is sequential scan
它的思路是，在不使⽤循序扫描的情况下，我们可以快速找到具有要查找的key的tuple
50:42 - 50:44
So sequential scan is n
So，循序扫描的复杂度是O(n)
50.44-50.46
if it's a hash index
如果它是⼀个hash索引
50.46-50.47
I can do O(1)
那么它的复杂度就是O(1)
50.47-50.49
if it's a B+ tree, it's log n
如果是B+ Tree，那复杂度就是log(n)
50:50 - 50:56
Right,so if the idea is cutting down as much data as you can to not look at not too
wasted work
So，这⾥的思路是，尽可能的减少我们不需要⽤到的数据，以此避免做太多⽆⽤功
51:03 -51:03
Correct,
没错
51.03-51.06
saving is if we create a table and there's no index
如果我们创建了⼀张表，并没有为它建⽴索引
51.06-51.07
we always have to do a sequential scan
那我们就不得不使⽤循序扫描了（sequential scan）
51:07- 51:09
yes We told that in a very beginning
没错，这点我们在⼀开始就说过了
51:09 - 51:09
Yes
请问
51:18 - 51:18
Question is
他的问题是
51.18-51.20
if I create an index, where does it live
如果我创建了⼀个索引，那它是放在哪⾥的呢？
51:21 - 51:23
Well again if it's backed by disk
Well，再说⼀遍，如果它是通过磁盘来保存
51.23-51.29
it goes you know it gets written out that you know if it's backed by the buffer pool, it
goes out to disk and I want to do that
如果它是通过buffer pool来进⾏备份的（关于索引的buffer pool），它会被写出到磁盘上，并
且我想这么做
51:29 - 51:32
Because it's made my index might be larger than the amount of memory that's available
to me
因为我的索引可能会⽐我们可⽤的内存量来的⼤
51:33 - 51:36
So again I could have an ephemeral data structure that's in memory
So，我可以在内存中使⽤⼀个临时数据结构
51:36 - 51:37
And I have to blow that away
我⽤完就得将它扔了
51.37-51.39
MySQL does that for their hash table
MySQL为它的hash table进⾏了这样的操作
51.39-51.41
because it has to be in a memory
因为它必须放在内存中
51:41 - 51:43
But the B+tree is backed by disk
但B+ Tree索引会被备份到磁盘上
51.43-51.45
so as it gets too large I patient things out
So，⼀旦它变得太⼤，那我就得耐⼼点了
51:52 - 51:53
Would you might separate
你说的是将它们分开吗？
51:58 - 51.59
Hey they could be the same buffer pool
它们可以在同⼀个buffer pool中
51.59-52.02
it could be different of a pool instances it depends on implementation
它也可以放在不同的buffer pool实例中，这取决于实现
52:03 - 52:06
Again the buffer pool manager doesn't know what's inside the pages
再说⼀遍，buffer pool管理器并不知道page中有什么东⻄
52.06-52.09
it says you want page 1 2 3 ,here it is
如果你想要page 123，它就会告诉你，这个page 123在那⾥
52:09 -52:14
And then whoever is is is accessing it is responsible to know how to interpret those bytes
接着，不管是谁访问这个page，这个访问的⻆⾊得知道该如何对这些字节进⾏解释
52.14-52.17
buffer pool manager doesn't know doesn't care
buffer pool管理器不知道这些是什么，也不关⼼这些
52:17 - 52:18
In the high-end systems
在⾼端系统中
52.18-52.20
you can say here's the buffer pool manage for indexes
你可以说，这是⽤来管理索引的buffer pool管理器
52.20-52.22
and has certain replacement policies
它使⽤了某些替换策略
5222-52.24
and here's one for tables they have another replacement policy
对于表来说，它们有其他的替换策略
52:25 - 52:26
proposal MySQL it's all the same
对于MySQL来说，这些策略都是⼀样的
52:29 - 52:37
Okay,so um ,let's now jump back and finish up with tries
Ok，让我们回到幻灯⽚，并来结束对于tries tree的讨论
52:38 - 52:38
Okay
52:42 - 52:46
So in all the examples that show for the B+tree so far
So，在⽬前为⽌所展示的所有B+ Tree的案例中
52.46-52.54
the inner nodes and the leaf nodes always had an exact copy of the keys
inner node和叶⼦节点始终有⼀份关于key的准确拷⻉
52:55 - 52:58
Yes you can do prefix compression or suffix truncation as we talked about last time
没错，你可以进⾏前缀压缩或者是后缀截取，这个我们上节课就讲过了
52:58 - 52.58
But in general
但⼀般来讲
52.58-53.01
we have the entire copy of the key
我们拥有key的完整拷⻉
53.01-53.05
replicated multiple times throughout the the tree structure
在整个树形结构中，我们会对key进⾏多次复制
53:05 -53:09
And so the other issues gonna be also into B+tree is that
So，在B+ Tree中可能会发⽣的其他问题是
53.09-53.14
in order for me to determine whether key exists in my table
为了判断该key是否存在于我的表中
53:16 - 53:19
I always have to get to the leaf node,I always have to traverse all the way to the bottom
我就得跑到叶⼦节点上，并且对它们进⾏遍历
53:21 - 53:21
Right
53.21-53.26
because again the inner nodes may have copies of keys that don't no longer exist
再说⼀遍，因为inner node中可能会保存那些不再存在于tree中的key的拷⻉
53.26-53.28
because when I delete them from the leaf node
因为当我将它们从叶⼦节点中删除时
53.28-53.29
depending on how I split merge
取决于我拆分和合并的⽅式
53.29-53.32
I may have left my guidepost up above
我可能要将inner node作为路标放在它们上⾯
53:32 - 53:35
So in order to determine whether I know exactly this key exists
So，为了准确判断该key是否存在
53.35-53.36
I always have to go to the leaf node
我始终得跑到叶⼦节点处进⾏遍历，以此来判断它是否存在
53:37 - 53:42
So this you know again it's login instead of set of O n
So，这⾥的复杂度是log(n)⽽不是O(n)
53.42-53.44
you have to do sequential scan ,but it's still not great
你必须得进⾏循序扫描（sequential scan），但这依然不是很好
53:44 - 53:48
And I may have you know depending on how much memory I have and how I'm using my
buffer pool manager,
取决于我所能使⽤的内存量，以及我使⽤buffer pool管理器的⽅式
53.48-53.50
I may have a page miss
我可能会遇上page未命中的情况
53.50-53.55
right they do a lookup on disk for every single node as I'd traversed down
此时，当我向下遍历时，它们会在磁盘上对每个节点进⾏查找（知秋注：即管理索引的buffer
pool中并没有缓存我们所找叶⼦节点所在的page）
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
53:55 - 53.57
So for some applications
So，对于某些应⽤程序来说
53.57-54.05
it might be nice if we can actually figure out at the top of the tree,whether our key
exists without having to go all the way to the bottom
实际上，如果在没有遍历底部叶⼦节点的情况下，我们就能在树的顶部弄清楚key是否存在的
话，这就很nice
54:05 - 54:07
So this is what a trie index does for us
So，这就是trie index所为我们做的
54:07 - 54:11
So quick show of hands who here is hear trie before, okay perfect
So，快速举下⼿，你们在座的之前有谁听过Trie，Ok
54:11 - 54:15
Who here has heard of radix tree, fewer excellent okay
有谁听过Radix Tree，看起来更少
54:15- 54:19
So radix tree is just a specialization of a trie
So，radix tree是⼀种trie tree的特化版本
54.19-54.22
and nobody uses trie everyone uses radix tree and databases
没⼈会在数据库中使⽤trie，他们都是⽤的是radix tree
54.22-54.24
so what we'll go through this
So，我们来看下这个
54:24 - 54:26
So a trie is a tree data structure
So，trie其实是⼀种树形数据结构
54.26-54.32
where instead of storing the entire copies of keys in our nodes in the tree
它并没有保存我们树中节点⾥的key的完整拷⻉
54:32 - 54:34
We're instead going to store digits of key
相反，我们会去保存key的digit
54:35 -54:38
And by digits I don't necessarily mean Arabic numerals
这⾥的digit，我说的不⼀定是阿拉伯数字
54.38-54.45
I mean some atomic subset of our key like a byte or some a single bit
我的意思是我们key中的某些原⼦⼦集，⽐如：⼀个字节或者⼀个bit之类的（⽐如：ABC，A、
B和C就是ABC的原⼦⼦集）
54:46 - 54:47
And so what happens is that
So，这⾥所发⽣的事情是
54.47-54.50
we're basically gonna decompose all our keys
简单来讲，我们会将我们所有的key进⾏分解
54.50-54.55
and store them down the digits down you know different levels one by one
并且这些digit⼀个接⼀个的存放在树中不同的层⾥
54:56 - 55:00
And then now because we could have duplicated keys or duplicated digits
然后，因为我们可能会遇上重复的key或者digit
55.00-55.02
we only need to store that once at each level
我们只需在每层保存它⼀次即可
55:03 - 55:06
So a really simple example here would be a trie like this
So，如图所示，这⾥是⼀个关于trie的简单案例
55.06-55.09
where I have three keys hello hat and have
这⾥我有三个key，即HELLO，HAT以及HAVE
55:09 - 55:11
So in the first level in the root node
So，在第⼀层，也就是根节点处
55.11-55.13
all three keys begin with the letter H
这三个key都是H开头
55.13-55.15
so I sort H once
So，这⾥我保存⼀次H
55:15 - 55:17
And there's a path down to the second level
接着，这⾥有⼀条可以到达第⼆层的路径
55.17-55.21
where now I see I distinguish between hello and hat have
现在，我需要去区分HELLO，HAT和HAVE之间的区别
55.21-55.25
hello has an e ,hat and have have an A for the second digit
对于单词中的第⼆位来说，HELLO的第⼆位是E，HAVE和HAT则是A
55:25 - 55:27
So I have separate entries for that
SO，对此，我使⽤不同的条⽬对其进⾏保存
55.27-55.33
and then now I have separate paths down to handle for you know each unique path in
the key
接着，现在我就通过不同的向下路线来处理key中不同的digit（⼀个key对应唯⼀⼀条路径）
55:33 - 55:34
So now if I want to look up
So，现在如果我想进⾏查找
55.34-55.35
say I want to look up hello
⽐如，我想查找HELLO
55.35-55.38
I just decompose it the key into its digit
我只需将该key分解为⼀个个digit
55.38-55.40
and I look at the H, I have a match here
我先看下H，它和第⼀层的H匹配了
55.40-55.44
I find the E ,and then I travser down LLO
接着再看E，然后向下遍历LLO
55:44 - 55:47
And the bottom is just like our B+tree
Trie的底部和我们的B+ Tree⼀样
55.47-55.51
this could be a record ID that points to the actual tuple that we're looking for
它可以是⼀个record id，它指向我们实际查找的tuple
55:52 - 55:55
So tries are old, tries are older than B+tree
So，Trie很古⽼，它要⽐B+ Tree还要古⽼
55.55-55.59
or B+tree were invented or in like 1973 at IBM
B+ Tree是IBM在1973年所发明出来的
55:59 - 56:04
Tries are actually from invented in like 1959 by this French dude
实际上，Trie是由⼀名法国⽼哥在1959年所发明出来
56:04 - 56:06
And he didn't have a name for it
他并没有对Trie进⾏命名
56.06-56.10
and then there was another CS researcher the famous guy Edward Fredkin
接着，之后另⼀次CS领域的著名研究⼈员Edward Fredkin出现了
56.10-56.13
and then a year or two later he proposed the name trie
然后，⼀年或两年后，他给这种结构起了⼀个名字，即Trie
56.13-56.16
which is short for retrieval tree
它是retrieval tree的简写
56.16-56.19
and he was using that to distinguish from a regular tree data structure
他使⽤这个术语来和其他平常所⽤的树形数据结构区分开来
56:20 - 56:21
So this is why they're called tries
So，这就是为什么叫tries的原因了
56.21-56.29
and apparently this Edward Fredkin is actually seeing you faculty to get a look at the you
know the the CS website the directory he's listed there, his look like super old
如果你们去看下我们系的⽹站，你们就可以看到Edward Fredkin的名字就在上⾯，他的样⼦看
起来相当⽼
56:30 - 56:37
I've never seen many faculty mean, I don't know who he is ,I don't he's actually still
here,but that's the guy that invented the term trie ,he's actually here at CMU supposedly
其实我也从没在系内⻅过他，我也不知道他是谁，更不知道他实际在不在CMU，但确实是他发
明了Trie这个术语，据说他实际还在CMU
56:37 -56:41
So sometimes you also see these things listed as digital search trees or prefix trees
So，有时候你们也会看到这⾥列出的Digital search tree或者前缀树（prefix tree）
56.41-56.44
as far as I know these are all these are all the same thing
据我所知，这些名字指代的都是同⼀个东⻄，即Trie
56:45 - 56:48
So tries are really interesting right in the concept of databases
So，在数据库的概念中，Trie真的令我们很感兴趣
56:48 - 56:51
All right, you know now that we understand B+tree
现在，我们已经理解B+ Tree的相关内容了
56:52 - 56.54
So the first thing that's super interesting about them is that
So，⾸先让我们超级感兴趣的东⻄就是
56.54-57.00
their shape only depends on the key distribution of the key spaces and their length
Trie的形状取决于key的分布以及它们的⻓度
57:01 - 57:03
So what I mean by that is it's a deterministic data structure
So，我所说的意思就是，它是⼀个确定性的数据结构
57.03-57.05
so no matter what order we insert the keys
So，不管我插⼊key的顺序如何
57.05-57.09
we're always going to end up with the same shape of the physical data structure
我们最终会得到相同的物理数据结构
57:10 - 57:12
All right, that's not the same thing as in a B+tree
它和B+ Tree并不是⼀回事
57.12-57.15
because in B+tree if I insert a keys one way
因为在B+ Tree中，如果我以某种⽅式插⼊key
57:15 - 57:16
And then I shuffle them around
接着我对它们进⾏shuffle（清洗，洗牌）
57.16-57.17
and then and I sort insert to another tree
接着，我将它们插⼊另⼀个tree中
57.17-57.19
depending on how I do is split the merges
取决于我是如何进⾏拆分和合并的
57.19-57.22
I may end up with different layouts of the nodes
我最终可能会得到不同的节点布局
57.22-57.24
, the keys might be in one node versus another node
key可能会在这个节点，也可能在另⼀个节点
57:24 - 57:26
In a try it's always the same thing
在Trie中，这些key始终是在同⼀个位置，它们的布局也是⼀模⼀样的
57:27 - 5728
All right
57.28-57.33
the other thing about them is that they don't actually require any rebalancing like we had
in the B+tree
关于Trie的另⼀件事就是，实际上它不需要像B+ Tree那样进⾏重新平衡
57:34 - 57:39
So we'll see you know there is some rebalancing we could do that at the vertical level
So，我们可以在垂直层⾯进⾏些重新平衡操作
57.39-57.42
but horizontally we're never actually gonna potentially rebalance
但在⽔平层⾯，实际上我们⽆法进⾏重新平衡
57:43 - 57:46
So an unlike in a B+tree
So，不像在B+ Tree中
57.46-57.48
where all the operations were log(n)
所有的操作复杂度都是log(n)
57.48-57.55
in a trie the operation complexity is K where K is the length of the key
在Trie中，操作的复杂度都是O(K)，其中K指的是key的⻓度
57:55 - 57:57
All right, this is totally different than gonna B+tree
这和B+ Tree完全不同
57:57 - 57.58
So going back here
So，回到这张幻灯⽚上
57.58-58.00
so if I want to look up hello
So，如果我想查找HELLO
58.00-58.05
by the time I get here, I know that there's no you know I keep going down the bottom
当我到达这个E的时候，我知道我只需⼀直往下遍历即可
58:05 - 58:08
But so the number of steps I have to do is dependent on the key that I'm looking up
So，我遍历所需要的步数取决于我查找的key的⻓度
58:08 - 58:10
But say I'm gonna look up and Andy
但假设我要查的是Andy
58.10-58.11
a-n-d-y
A-n-d-y
58.11-58.12
the first letter is a
它的⾸字⺟是A
58.12-58.15
I look up in the root node, I see it only has an H
我在根节点处查找A时，我只看到那⾥有个H
58.15-58.16
I immediately stop
我就⽴即停⽌了查找
58.16-58.18
and I know the thing I'm looking for it can't be anywhere else in the tree
因为我知道我所查找的东⻄并不在这棵树上的任何位置
58.18-58.21
and I don't have to always Traverse in the bottom
并且我也不需要在底部对它进⾏遍历
58:22 - 58:22
Yes
请问
58:26 - 58:30
Your question is for the e here do I have to iterate across the entire block
你的问题是，对于这⾥的E，我是否得遍历整个block
58:39 - 58:42
So the statement is if this thing is super wide
So，他说的是，如果同⼀层block的范围很⼴
58.42-58.46
does that mean I have to sequential scan across the entire thing
这是否意味着，我得对同⼀个block中的东⻄进⾏循序扫描？
58:47 - 58:51
You presort them， as you do binary search to find what you're looking for
当你想通过⼆分查找来找到你想要的数据时，你可以对它们进⾏预先排序
58.51-58.55
well when we see actually how we actually do this in like for like bytes
我们会在处理字节之类的东⻄的时候，我们会看到是如何处理的
58:55 - 58:59
You can just jump exactly to the position you want， it's either there or not there
不管它在不在那⾥，你就可以准确地跳到你想要的位置
你可以准确地跳到你想要的位置，并看看它在不在那⾥
59:00 - 59:04
Yeah, this is not really you know physical diagram I thought I was actually stored this is
just a high level overview
这并不是该数据实际存储的物理视图，这只是⼀种⾼级层次的概述
59:07 - 59:09
Okay,so again this is super interesting
Ok，这令我们⾮常感兴趣
59.09-59.14
because that the fact that like the the complexity is based on the key that we're trying to
look up on the length
因为它的操作复杂度是基于我们所查找key的⻓度来决定的
59:15 - 59:23
It's also interesting because now the the we're not storing the exact copy of the key you
know directly in any single node
另外⼀点也很有趣，因为现在我们并没有在⼀个节点中保存该key的完整副本
59.23-59.24
it's implicitly stored by the path
我们将key隐式地存储在路径中
59:25 - 59:27
So if we want to reconstruct hello
So，如果我们想对HELLO进⾏重建
59.27-59.30
we would Traverse down keep track of our path on the stack
那么在我们向下遍历的时候，应该使⽤⼀个栈来跟踪我们向下遍历时的路径（知秋注：将遍历时
的路径信息通过栈这个数据结构存储起来）
59.30-59.33
and that how we can put the key back together
这就是我们将key重建的⽅法
59:33 - 59:35
Whereas now this makes sequential scans more difficult
然⽽这种⽅式让循序扫描变得更加艰难
59.35-59.37
because although I can be in sorted order
因为即使这些东⻄是有顺序的
59.37-59.39
I got a backtrack
我还得进⾏回溯
59.539-59.42
and you know go back up and go back down
即往上跑和往下跑
59.42-59.44
unlike in the B+tree where I can scan along the leaf nodes
不像B+ Tree，我们可以沿着叶⼦结点进⾏扫描
59:44 - 59:49
So tries are gonna be faster for point queries than a B+tree,
So，对于点查询来说，Tries的速度要⽐B+ Tree快很多
59.49-59.51
but they're gonna be slower than for scans
但对于扫描来说就会慢很多（知秋注：回溯起来太过于麻烦）
59:53 - 59:56
All right, so now we get bit more formal talk about the definition of a trie
So，现在我们来正式讨论下Trie的定义
59:56 - 01:00:03
So but we would use the term span to the same way in a B+tree for of a node
So，我们也会将span这个术语以同样的⽅式⽤在B+ Tree的节点上
1.00.03-1.00.07
just to say the span is the number of outgoing branches,
span其实就是树枝向外分叉的个数
1.00.07-1.00.14
it`s essentially the number of digits we're going to represent in you know each node in
each level
简单来讲，它就是我们在树的每层每个节点中digit的个数
08-04
01:00:15 - 01:00:18
So if a digit is gonna exist in the corpus
So，如果⼀个digit存在于该语料库（可以当成字典来看）
1.00.18-1.00.22
then at the level at each digit, we do have to have a pointer now to another branch
那么，在该层的每个digit上，我们都必须要有⼀个指向另⼀个分⽀的指针
01:00:22 - 01:00:24
If it doesn't exist in our corpus at a level
如果它并不存在于我们语料库的某⼀层中
1.00.24-1.00.28
then we just store null like a little bit or something
那么我们就在那⾥保存null或者其他类似的东⻄
01:00:28 - 01:00:31
So now this this span is gonna used to determine the fan-out
So，现在这个span被⽤来决定是否对每个节点进⾏扇出操作（fan-out）
1.00.31-1.00.33
just like again in a B+ tree
就⽐如在B+ Tree中
1.00.33-1.00.37
and that's can then correspond to the physical height of the trie
它也和Trie的树⾼度有关
01:00:38 - 01:00:40
So the parlance you would say I have an N way trie
So，⽐如说，我有⼀个N-way Trie（即有N条路线的Trie）
1.00.40-1.00.45
you would say you have a fan-out of order N and it's the number of path coming out
⽐如说，你fan-out（扇出）的量为n，也就是每个节点最多有n条路线
01:00:45 - 01:00:49
And that's going to determine the size of the the digit you're storing at each level
这就会决定你在每⼀层所保存的digit的数量
01:00:51 - 01:00:54
So the most simple trie you can store is a 1-bit trie
So，你所能存储的最简单的trie就是1-bit Trie
01:00:55 - 01:01:01
Right, so each level ,I'm gonna discriminate the a digit for a single bit
So，在每⼀层中，我要去区别每个bit上的digit是什么
01:01:02 - 01:01:06
So let's say I want to store these three keys 10,25 and 31
So，假设我想去保存这三个key，即10，25和31
01:01:06 - 01:01:08
So it's a 1 bit tries
So，因为它是1-bit Trie
1.01.08-1.01.11
I mean at each level we're gonna we're gonna look at 1-bit
我的意思是，在每⼀层，我们都会去看1 bit
01:01:11 - 01:01:15
So I'm showing them in you know the binary form of these two numbers or the three
numbers
这⾥我所展示的是这三个数字的⼆进制形式
1.01.15-1.01.18
again normally these would be 32-bit or 64-bit
正常情况下，它们的⻓度应该是32位或64位
01:01:18 - 01:01:22
But for simplicity reasons I'm showing them in in 16 bits
但为了简单起⻅，这⾥就我⽤16位来表示
01:01:23 - 01:01:25
So at the trie would look like this
So，如果将它们放在Trie中，Trie的样⼦就如图所示
1.01.25-1.01.28
and I'll go through the each level
我会去遍历每⼀层
01:01:28 - 01:01:29
So at the root node
So，在根节点处
1.01.29-1.01.33
we're gonna examine the first digit position the first bit
我们会先测试第⼀个digit，也就是第⼀个bit 0
01:01:33 - 01:01:36
And again it's one way ,it's 1-bit
因为它是1-bit Trie
01:01:36 - 01:01:39
So it's either 0 or 1
So，它就只有0或者1
01:01:39 - 01:01:41
So in this first position
So，在第⼀个位置上
1.01.41-1.01.44
all three keys have bit set to 0
这三个key的bit都是0
01:01:45 - 01:01:46
So at bit 0
So，在这个0处
1.01.46-1.01.49
I have a path going down at bit 1 is null
我有⼀条往下⾛的路线。在bit 1处的值为null
1.01.49-1.01.51
because there's no key that matches that
因为这⾥并没有key能够与它匹配
01:01:51 - 01:01:53
Then I go now down to the second level
然后，现在我跑到第⼆层
1.01.53-1.01.55
and for simplicity reasons
为了⽅便起⻅
1.01.55-1.02.00
we're just gonna repeat this think of this repeating across 10 times
我们就直接重复这样的操作10次
01:02:00 - 01:02:01
Right,but it's gonna be the same thing
因为这些都是些重复⼯作
1.02.01-1.02.07
I have a 0 all my tuples are keys have a 0 at every single position and have a path going
down
因为在我所有的key前10位都是0，并且它们向下⾛的⽅向都是⼀样的
1.02.07-1.02.10
and one doesn't have anything
⽽且前10位⾥⾯并没有1
01:02:10 - 01:02:11
But now when I get to this position here
但现在当我到达这个位置时
1.02.11-1.02.13
now I see that there's a difference
现在，我就看到了这⾥的不同之处
01:02:14 - 01:02:18
So for key 10 at this position is 0
So，对于key 10，它在这个位置的数字是0
01:02:18 - 01:02:20
So there's a path going down to this side
So，它就应该⾛左边这条路线
1.02.20-1.02.25
for the other two ,it's a it's one,so as the path going down here
对于另外两个，它们这⼀位的值都是1，So，它们应该右边这条路线
01:02:25 - 01:02:28
So now if I look at say the remaining part of this key
So，现在如果我们来看下这个key的剩余部分
1.02.28-1.02.30
again it's a single path going down
然后沿着这条单向路线往下⾛
1.02.30-1.02.32
and it's you know it's 1 0 1 0
我们所⾛的路线就是1010
1.02.32-1.02.33
and same thing if it's null
同样，如果它是null
1.02.33-1.02.40
I have there's no the bit if not said at that position it's null, otherwise it's a path going
down
如果该bit并没有说它⾥⾯放的是null，否则就有⼀条向下的路径
01:02:40 - 01:02:44
And then the leaf node again this is just a record id that points to the corresponding
tuple
然后，这⾥的叶⼦节点就是⼀个record id，它指向了对应的tuple
01:02:45 - 01:02:47
Same thing for the other side
对于另⼀边也是同样如此
1.02.47-1.02.48
right at this point here
在此处
1.02.48-1.02.49
they're the same
和刚才是⼀回事
1.02.49-1.02.50
but then they split here
但它们在这⾥分裂了
1.02.50-1.02.52
and then now I have separate paths for the other parts
然后，现在我就有了对应不同部分的不同路线
01:02:53 - 01:02:57
Right, you know so we can do this in 1 bit, 2 bits, 8-bits, 16-bits
So，我们可以对1-bit，2-bit，8-bit或者16-bit的Trie做这种事情
1.02.57-1.02.59
we can do this at different levels different granularities
我们也可以在不同层以及不同粒度上做这些事情
01:03:02 - 01:03:04
So what's one simple optimization we can do for this
So，我们可以对此进⾏下简单优化
01:03:06 - 01:03:08
There's actually two optimizations
实际上我们可以对此做两种优化
1.03.08-1.03.11
how can we reduce the size of this trie
我们如何才能减⼩Trie的体积呢？
1.03.11-1.03.12
yes
请讲
01:03:15 - 01:03:15
Exactly
讲的没错
1.03.15-1.03.18
so he says we don't need spaces marked zeros and ones
So，他表示，我们不需要使⽤空间来标记这些0和1
1.03.18-1.03.20
because what is this saying right
我们来看下这⾥的图
01:03:20 - 01:03:24
So again this is the value at this digit in this position and then here's the pointer for it
So，可以看到，这⾥是该digit的值，然后这⾥是它的指针
01:03:25 - 01:03:26
So this is redundant
So，这⾥是多余的
01:03:27 - 01:03:29
So all I really need to do is just store the pointers
So，我实际需要做的就是只保存这些指针
01:03:30 - 01:03:34
Right, because if the bit is set to zero，I want offset zero
因为如果bit是0，那么我想要它的offset值也是0
1.03.34-1.03.35
the bit set the one, I go to offset one
如果bit是1，那么我想让它的offset值为1
01:03:36 - 01:03:37
So this is horizontal Compression
So，这是⽔平压缩
1.03.37-1.03.42
this is reducing the size of of each trie node
它能减少每个trie节点的⼤⼩
01:03:42 - 01:03:45
What's another compression where I could compress us, in the back
那么另⼀种压缩⽅式是什么呢？后⾯的那位同学请讲
01:03:48 - 01:03:52
He says repeating the numbers there are ten times for this one you actually have to have
他表示这⾥数字重复了⼗次，实际上我们必须要有这个
01:03:56 - 01:03.58
So once I get down here these parts here,
So，⼀旦我到了这⾥
1.03.58-1.04.01
there's no other key that matches this
也就没有其他key能匹配这些0了
01:04:03 - 01:04:04
And sort of what he was saying
正如他所说的那样
1.04.04-1.04.05
but up here
但在上⾯
1.04.05-1.04.07
breather right we had to keep this is
我们必须保留这个
1.04.07-1.04.07
because we're gonna split here
因为我们会在此处拆分
1.04.07-1.04.09
so we need to know how we got down to here
So，我们需要知道我们该如何往下到这⾥
01:04:10 - 01:04:11
So but after this
但在此之后
1.04.11-1.04.12
we don't need to store anything
我们⽆须存储任何东⻄
1.04.12-1.04.13
mean stack into store
意思就是将之通过栈来存储
1.04.13-1.04.16
well if you go down here at this position at this level
Well，如果你从这⼀层的这个位置往下⾛
1.04.16-1.04.17
if the bit is zero
如果该bit为0
1.04.17-1.04.19
I only have one key that matches
此处我只匹配了这⼀个key （知秋注：即0这个位置只匹配了10这个key）
1.04.19-1.04.22
so let me destroy， the tuple pointer to that key
So，那我就删掉指向下⾯的（trie节点），直接指向该key的tuple指针即可
01:04:22 - 01:04:24
And then same thing over here
然后，这⾥也是⼀样
01:04:25 - 01:04:26
So this is vertical compression
So，这就是垂直压缩
1.04.26-1.04.26
yes
请问
01:04:38 - 01:04:38
Your question is
So，你的问题是
1.04.38-1.04.42
incentive story city instead of storing the website
不好意思能再讲⼀次么
01:04:44 - 01:04:46
Yes, yes
01:05:00 - 01:05:02
This is like a low marco optimization
这看起来像是⼀种底层的宏观优化
1.05.02-1.05.04
there's like CPU instructions
就⽐如CPU指令
1.05.04-1.05.13
you can run in a single instructure in for like a for a bitmap a bit sequence, finding the
value at this offset in some instruction
你可以运⾏单个指令，⽐如bitmap，或者通过某个指令找到这个offset值处的值
01:05:13 - 01:05:14
You don't have to iterate
你不需要进⾏遍历
1.05.14-1.05.19
or like you find me you count me the number of ones in my in this bit field
或者你可以统计在这个bit中的1的数量
01:05:20 - 01:05:22
Right, there's a CPU instructions to make this go really fast
使⽤CPU指令能让这些变得⻜快
01:05:23 - 01:05:26
So it's not like you're just doing like an in a for loop sequential scanning over this
So，它并不像你们使⽤for循环来对这些东⻄进⾏循序扫描那样
1.05.26-1.05.27
it's not as bad as you think it is
它并没有你们想的那么糟
01:05:30 - 01:05:32
Okay,so again this is like low-level bit information
Ok，这看起来像是低级层⾯的位信息
1.05.32-1.05.34
but showing you at the extreme case
但这⾥我向你们展示了这种极端案例
1.05.34-1.05.37
you wouldn't actual 1-bit Trie
你们并不会想使⽤这种1-bit Trie
1.05.37-1.05.42
usually you want to store them as eight bits or and a single byte
通常情况下，你会想以8 bit或者1 byte的形式来存储这些
01:05:42 - 01:05:44
But for me this is the easiest way to understand this
但对我来说，这是理解起来最简单的⽅式
01:05:44 - 01:05:45
And so even now
So，甚⾄到了现在
1.05.45-1.05.46
if it's eight bits
如果key的⼤⼩是8 bit
1.05.46-1.05.50
same thing for every single position I just have a pointer or not
那么和之前⼀样，每个位置上我都只有⼀个指针
01:05:50 - 01:05:52
And then quickly jump to the one you also that offset I want
然后快速跳到我想要的那个offset值处
01:05:53 - 01:05.56
So this is fine and dandy if everything's static,
So，如果所有东⻄都是静态的，那么这样做没啥⼤问题
1.05.56-1.06.02
but actually how do we how do we modify this thing every do inserts and updates and
deletes
但实际上我们该如何对其进⾏修改呢，⽐如进⾏插⼊，更新，删除这样的操作
01:06:02 - 01:06:08
So there is no standard way to maintain a trie in the way that there was for a B+ tree
So， Trie并不像B+ Tree那样，它并没有任何标准的⽅式来进⾏维护
01:06:08 - 01:06:10
Different implementations do different things
不同的时候⽤来处理不同的事情
01:06:12 - 01:06:14
So I'm going to show you sir one brief example,
So，这⾥我会向你们展示⼀个简单的例⼦
1.06.14-1.06.16
I'm not saying this is the only way to do this,
我并没有说这是做到这点的唯⼀⽅式
1.06.16-1.06.19
but just some of the things you have to be mindful ,if you're actually trying to build one
但如果你试着去构建这种Trie，那么你就得注意某些东⻄
01:06:19 - 01:06:23
Let's say again this is the hello hat and have key set we had before
如图所示，这⾥我们有3个key，即hello，hat以及have
01:06:23 - 01:06:24
So I insert hair
So，这⾥我插⼊hair
1.06.241.06.26
again I just traverse down,
此处我向下进⾏遍历
1.06.26-1.06.29
I would find this slot here, and now I can insert this into this
我找到这个slot，现在，我就可以将hair插进去了
01:06:29 - 01:06:32
Alright, so now let's say I want to delete hat
So，现在假设我要去删除hat
1.06.32-1.06.34
well that's here I go ahead and delete that
Well，hat在这⾥，我要将它删除
1.06.34-1.06.40
and rather than reshuffling everything maybe it's okay for me to leave an empty space
here
这⾥我不需要将所有东⻄的位置重新打乱排列，我只需要将要删除的地⽅变为空的slot即可
01:06:40 - 01:06:42
Right,because then I don't do any compaction
因为这样我就不需要对数据进⾏压实了
01:06:42 - 01:06:44
But now let's say I delete have
但现在假设我要删掉have
1.06.44-1.06.45
and now I remove this
现在我将红框所标记的东⻄移除
1.06.45-1.06.50
and I say well now I have this this node here by itself
现在，这个节点中只剩下IR了
01:06:50 - 01:06:52
And so if I want to you know actually find hair,
So，如果我想去找到hair
1.06.52-1.06.56
I'd have to you know do an extra hop to go down IR ,but I know I'm not gonna have any
other match
我必须要向下多⾛⼀步才能找到IR，但我并不清楚是否还有其他匹配的选项
01:06:56 - 01:07:00
So you could decide just to roll everything up and put it up here
So，你可以选择将IR和A放在⼀起
01:07:01 -01:07:04
Different again different implementations use different things
再说⼀遍，不同的实现会做不同的事情
01:07:05 - 01:07:07
If you take the advanced class will cover a bunch of these things
如果你去上15-721，那么在上那⻔课的时候，我会介绍跟着这相关的很多东⻄
1.07.07-1.07.07
yes
请问
01:07:15 - 01:07:19
Yes, yeah you mean real clear the radix tree is one that's vertically compressed
没错，你说的很清楚，这种Radix tree所使⽤的是垂直压缩
01:07:21 - 01:07:22
uh yeah I should I should align that more carefully
emm，这⾥我应该要更仔细地进⾏对⻬
01:07:27 - 01:07:29
yeah I don't have on the slide yeah
我没把那个东⻄放在幻灯⽚上
01:07:30 - 01:07:32
Radix tree is is a is one where you remove all the path
Radix tree是⼀种你可以移除所有可忽略path的tree
01:07:33 - 01:07:39
Yeah positive I don't know what I don't use to be a slide here is defined what a radix
tree, I don't happen to it sorry
其实这⾥应该有⼀个关于Radix Trie定义的幻灯⽚，但我不知道为什么我没放，不好意思
01:07:42 - 01:07:44
Okay,no this is it sorry this is the radix tree,sorry
不对，抱歉，这其实就是Raidx Tree
01:07:45 - 01:07:53
It's when you do the vertical compression to remove any nodes where there's no other
distinct differentiating path below it
当你进⾏垂直压缩，以此来移除下⾯没有其他明显区分路径的所有节点（移除⽆⽤分⽀路径，即
真实情况是看似多条路线，但只有⼀条存储了明确key的路线）
01:07:53 - 01:07:56
Sometimes called Patricia tree, but usually the call radix trees
有时它被叫做Patricia Tree，但通常叫做Radix Tree
01:07:57 - 01:07:59
And again it's a subset of a trie
再说⼀遍，它是Trie的⼀种变体
！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
01:08:01 - 01:08:13
Okay,so he covered markets and the last thing I want talk about is actually how we do
comparison actually the sake of time I'm gonna skip that let's the last one sideways
inverted indexes
由于时间的关系，我们把这块跳过，直接来讲最后⼀部分，即倒排索引（inverted index）
01:08:14 - 01:08:22
Again tries are super interesting no commercial database system ,as far as I know
supports them out of the box
Trie其实超级有趣，但⽬前为⽌我所知道的商⽤数据库中，并没有任何数据库对此⽀持到开箱即
⽤的地步
1.08.22-1.08.33
hyper is a system out of of from Germany that tableau bought that runs in you know
tableau its Postgres was compatible
德国的Tableau推出了⼀款叫Hyper的系统，它能够兼容PostgreSQL
01:08:33 - 01:08:34
There they're all in on trie
这个系统是基于Trie所构建出来的
1.08.34-1.08.37
we do some research here on tries they're super interesting,
因为Trie⾮常令我们感兴趣，于是我们对它做了很多研究
1.08.37-1.08.40
but right now the B+ tree is still the dominant data structure everyone uses
但现在，B+ Tree依然是霸主级的数据结构，所有⼈都在使⽤它
01:08:40 - 01:08:42
But there's a lot of interest in them
但它⾥⾯依然有很多令我们感兴趣的地⽅
01:08:43 - 01:08:53
Alright, so so real quickly, everything that we talked about so far have for these indexes
have been satisfying or handling index or point queries and range queries
⽬前为⽌我们所说的Tree index都能够⽤来处理point query或者是range query
01:08:54 - 01:08:59
So I want to find out you know record where it's people that live in zip code one 15217
So，⽐如我想找到所有住在邮编为15217地区的所有⼈的记录
01:08:59 - 01:09:02
All right, that's an equality predicate to find exactly the thing I'm looking for
然后我们可以通过条件判断来准确地找到我要找的数据
01:09:03 - 01:09:05
or if I'm trying to find things within date ranges
或者，如果我想试着找到某段⽇期内的数据时
1.09.05-1.09.09
right that's a range scan okay, again I can use user B+tree for that
那么，我们就可以使⽤range scan，我就可以使⽤B+ tree来做到这点
01:09:10 - 01:09:16
Where the B+tree and the hash index, hash tables are not good for us when we want to
do keyword searches
但对于B+ Tree和hash table来说，当我们进⾏关键字搜索时，它们的效果都不太好
01:09:16 -01:09:20
So for example say I have the entire corpus of Wikipedia
So，假设我有整个维基百科中的语料库
1.09.20-1.09-26
I'm gonna find all the blue key bead Wikipedia articles that that contain the keyword
“Pavlo”
我想去找到维基百科中包含关键字Pavlo的所有⽂章时
01:09:26 - 01:09:30
I can't use a hash table index for that ,and I can't use a B+ tree index for that
我⽆法使⽤hash table索引来做到这点，也没法使⽤B+ Tree索引来做到这点
01:09:30 - 01:09:35
Because I'm trying to find a sub element of above value for an attribute
因为我试着找的是某个属性中的⼀个⼦元素
01:09:36 - 01:09:42
Right, and for the B+ tree ,and I had to have the exact key, I can't do a partial key
对于B+ tree来说，我只能使⽤准确的key进⾏查找，我不能使⽤部分key进⾏查找
1.09.42-1.09.47
you know I can do a partial key lookup, but the if the key is comprised of multiple
attributes
但如果该key是由多个属性所组成的，那么我就可以进⾏部分key查找
01:09:47 - 01:09:51
But within single attribute I have to have the entire value of it ,I can't have like the first
16 bits
但在单个属性中，我必须使⽤该属性完整的值进⾏查找，不能只使⽤它⾥⾯的部分值进⾏查找，
⽐如它的前16 bit
01:09:54 - 01:09:56
So this is the problem we're trying to solve here
So，此处是我们要试着解决的问题
01:09:56 - 01:09.59
So quickly just again just remind everyone what wikipedia looks like
So，这⾥让你们快速回想下wikipedia是怎么样的
1.09.59-1.10.02
the main thing we care about is that there's this revisions table
这⾥我们主要关⼼的是revisions表
1.10.02-1.10.07
that has a has a tech that's my bookie sorry,that has the text field
它⾥⾯有⼀个text属性的字段
01:10:07 - 01:10:11
All right, and we want it we want to be able to find all the matches for Pavlo for this
我们想能够找到这⾥⾯所有匹配Pavlo的东⻄
01:10:11 - 01:10:18
So if I try to create an index on the content field, this is a really bad idea
So，如果我试着在content这个字段上构建索引，这其实是⼀个很糟糕的想法
01:10:19 - 01:10:28
Because again it's gonna take the entire key an entire contents of this attribute in our
table, and try to build a B+tree on that
因为它会试着使⽤我们表中这个属性中的整个内容，以此来构建出B+ Tree
01:10:29 - 01:10:31
All right, and in case if we keep it, this would be really stupid
在这个例⼦中，如果我们保存这个字段中的内容来建⽴索引，那么这种做法就很愚蠢
1.10.31-1.10.32
because some articles can be kilobytes
因为某些⽂章的⼤⼩是按照kb来算的
01:10:33 - 01:10:37
And now I'm storing the entire key in my index
现在我要将这整个key保存在我的索引中
1.10.37-1.10.42
and yeah the only thing I could do to lookup on is you know if someone gives me the
entire article back which is stupid
我所唯⼀能做的查找就是，如果某⼈给我整篇⽂章，然后让我返回，这种就很智障
我能做的唯⼀的事就是，在做根据⼀个key做查找的时候，我会返回⼀整篇⽂章，⽆疑这是很愚
蠢的
01:10:43 - 01:10:46
All right, and so in order to do this kind of lookup like this
So，为了进⾏像这样的查找
01:10:47 - 01:10:50
I want to do a set of you know something equals something
我想要通过xx等于xx的⽅式来进⾏查找
1.10.50-1.10.53
I want to do a keyword search
我想进⾏关键字搜索
1.10.53-1.10.58
like when the like clause with wild cards and say, find me all the matches where the you
know the keyword Pavlo's inside of it
⽐如，使⽤like⼦句加通配符，以此来找到与关键字Pavlo匹配的所有数据
01:10:58 - 01:11:01
Actually and this is actually not the rights SQL going either way
实际上，这⾥所写的SQL并不正确
1.11.01-1.11.05
because this is gonna match for things that have Pavlo as a prefix
因为这可以⽤来匹配前缀为Pavlo的东⻄
1.11.05-1.11.08
like Pavlov ivan for the famous Russian scientist
⽐如Pavlov就是⼀个⾮常著名的俄罗斯科学家
01:11:08 - 01:11:11
And I'm gonna find exactly where my name is being used
但我要找到和我名字完全匹配的内容
01:11:11 - 01:11:13
So this predicate itself is not gonna be useful for us
So，这个条件对我们来说并不是那么有⽤
01:11:15 -01:11:17
So this is what an inverted index does for us
So，这就是倒排索引（inverted index）为我们所做的
01:11:18 - 01:11:28
So an inverted index is gonna map words and the words as we describe them in the you
know English language or in natural languages not like byte sequences in the processor
So，倒排索引（inverted index）会将word映射到英语或者其他⾃然语⾔的词汇中（并不是处理
器中的字节序列）
01:11:29 - 01:11:31
There's gonna map words to the records that contain them
它会将单词映射到包含这些单词的record上
01:11:32 - 01:11:36
And then it's gonna allows it then do lookups on this index
接着，这就允许它根据这个索引来进⾏查找
1.11.36-1.11.41
and say find me all the records that contain this keyword or have this you know key word
of this certain property
这⾥我表示，请帮我找到包含该关键字的所有record
01:11:41 - 01:11:43
So these are sometimes called full-text search indexes
So，这有时被叫做全⽂搜索索引（full-text search index）
1.11.43-1.11.47
and just like with when I created index
当我创建索引时
1.11.47-1.11.49
and I told Postgres I wanted this thing to be a hash table index
我告诉PostgreSQL，我想让它是⼀个hash table index
01:11:50 - 01:11:51
You can do the same thing as some databases
你也可以在其他数据库中做同样的事情
1.11.51-1.11.52
you can say I want to create an index
你可以说，我想创建⼀个索引
1.11.52-1.11.58
and I wanted to be an inverted index or full-text search index
我想让这个索引是⼀个倒排索引或者是全⽂搜索索引
01:11:58 - 01:12:02
So sometimes in the theoretical literature these are called concordance
So，有时在某些理论⽂献中，这些被叫做词语索引（concordance）
1.12.02-1.12.07
and this is because there was this old lady in the 1800's who sat down for 16 years
这是因为在1800年代有⼀个⽼妇⼈闭关16年
1.12.07-1.12.13
and built an inverted index that mapped every single word used by Shakespeare ,and his
entire body of work
她构建了⼀个映射莎⼠⽐亚在他作品中所⽤的每个单个单词的倒排索引
01:12:14 - 01:12:19
Alright, but if this is nobody calls him does everyone instead calls him first full-text
search indexes or inverted index
但现在并没有⼈把它叫做concordance，⽽是叫全⽂搜索索引或者是倒排索引
01:12:19 - 01:12:24
So all the major database will support some variant of this internally
So，所有的主流数据库系统在内部都会⽀持它的某些变种
1.12.24-1.12.26
as I said when you call creating index
正如我说的那样，当你创建索引时
1.12.26-1.12.29
you can say I want to have a full-text search index
你可以说，我想要⼀个全⽂搜索索引
01:12:30 - 01:12:36 *****************
And they all vary in the sophistication of the indexes and what kind of queries you can
run on them
它们在索引的复杂程度以及可以对它们执⾏哪种查询⽅⾯都各不相同
01:12:36 - 01:12:42
There's also a bunch of specialized database systems that are that are sold or marketed
as full-text search databases
市⾯上也有⼀些专⽤于这⽅⾯的数据库系统，它们的卖点就是全⽂搜索数据库
01:12:43 - 01:12:46
So the most famous one is probably elastic search
So，最为出名的那个可能就是elasticsearch
1.12.46-1.12.47
and this is built on top of lucene
它建⽴在Lucene之上的DBMS
1.12.47-1.12.51
lucene is like a library written by the guy that invented Hadoop
lucene是由⼀个发明了Hadoop的⼈所编写
01:12:51 - 01:12.54
That does like a you know does the search it says it does indexing,
它使⽤索引进⾏查找
1.12.54-1.13.01
and then elastic search provides like a server interface to to that index
elasticsearch则为这种索引提供了⼀个服务端接⼝⼯具
01:13:01 - 01:13:03
So there also uses lucene I think Sphinx does as well
So，也有其他软件使⽤了Lucene，⽐如Sphinx就是
1.13.03-1.13.06
I use Xapian
我使⽤的是Xapian
1.13.06-1.1309
in which is like a standalone C library that does full-text and search indexing
它是⼀个C++标准库，它是⽤来进⾏全⽂搜索和索引查找的
1.13.09-1.13.12
,because this is better than the MySQL full-text search indexing
因为它要⽐MySQL的全⽂搜索索引来的更好
01:13:12 -01:13:18
But ideally you know these are all these would be internal or sorry external to like
Postgres, MySQL
但理想情况下，这些东⻄对于PostgreSQL和MySQL来说，都算是种外挂
1.13.18-1.13.22
whereas these other guys are sort of like it's built inside of it the system itself
然⽽，其他dbms系统在它们内部就会内置类似的东⻄
01:13:23 -01:13:27
So the we're not got time to discuss implementations
So，我们现在并没有时间去讨论实现
01:13:27 - 01:13:31
But basically all the hash table index stuff we talked about so far in the B+tree
但基本来讲，我们⽬前在B+ Tree中所讨论的所有关于hash table索引的内容
1.13.31-1.13.34
that's what you're going to use to build one these full-text search indexes
这些内容你都可以⽤来去构建出⼀个全⽂搜索索引
01:13:35 - 01:13:39
So the thing that there's a lookup and find me all the you know the records that have
containers word
⽐如可以⽤于找到所有包含关键字的记录
01:13:39 - 01:13:45
I could build that as a hash table, I can build that as a B+tree
我可以将它构建为⼀个hash table，也可以是⼀个B+ tree
01:13:46 - 01:13:48
But I'm gonna augment it with additional metadata
但我会去添加其他额外的元数据
1.13.48-1.13.52 ******
that provide the context about how that word was being used in the tuple
通过它来提供有关该单词如何在tuple中使⽤的上下⽂
01:13:53 - 01:13:59
So the kind of queries you can do that you can't do want to B+tree and a full-text full or
So，这些是我们⽆法在B+ Tree或倒排索引中进⾏的查询类型
这种类型的查询我们⽆法在B+Tree中进⾏
01:14:00 - 01:14:02
inverted index You can do phrase searches
我们可以在倒排索引中进⾏词组搜索
1.14.02-1.14.06
so I can do again find all the records that contain the word Pavlo
⽐如我可以找到所有包含单词Pavlo的记录
01:14:06 -01:14:07
I can do proximity searches
我也可以进⾏近似搜索
1.14.07-1.14.16
,so find me all the records where the word Pavlo is in you know within five words or
three words from you know criminal or alcoholic or something like that
⽐如说，从你所知道的犯罪者或酗酒者类别所指向的5个或3个单词⾥，找到所有包含Pavlo的记
录
01:14:16 - 01:14:20
Right, because I'm maintaining the context information about how that word was being
used
因为我维护了关于这个单词是如何使⽤的上下⽂信息
01:14:21 - 01:14:23
Then I can also do a wildcard searches
接着，我还可以进⾏通配符查找
1.14.23-1.14.25
that's more complicated than the like stuff
它要⽐你在SQL语句中使⽤Like⼦句还要复杂
1.14.25-1.14.29
I can do regular expressions or complex pattern matching to find things I'm looking for
我通过正则表达式或者是复杂模式匹配来找到我要找的东⻄
01:14:30 - 01:14:34
So the things we do care about slightly is that how we're actually gonna build this thing
So，我们所关⼼的事情就是，我们该如何去构建这个东⻄
01:14:34 - 01:14:37
And again the different systems will all do different things
再说⼀遍，不同的系统做不同的事情
01:14:37 - 01:14:40 ****
The thing they're gonna vary the most own is what they're actually storing
它们间最⼤的不同就是它们实际存储的东⻄
1.14.40-1.14.44 ****
again this is the context information about how the word was found in the attribute
这是有关在属性中如何找到单词的上下文信息
01:14:45 - 01:14:49
So at the very simplest form you just have you know the word itself and then map to a
record ID
So，最简单的⽅法就是将这个单词映射到⼀个record id上
01:14:50 - 01:14:52
But I can also include you know what other words are around it
但我也可以将它周围的其他单词也包括进去
1.14.52-1.14.53
how many steps away from other words
以将及它距离其他单词有多远这样的信息也包括进去
1.14.53-1.14.58
and that will determine how complex queries I can support on this
这就会决定我所能⽀持的查询的复杂程度有多复杂
01:14:59 - 01:15:01
The other tricky thing is actually when you update these things
另⼀个棘⼿的问题在于我们更新这些东⻄的时候
01:15:01 - 01:15:03
So if it's built inside of the system
So，如果它是内置在系统中的
1.15.03-1.15.09
you could in theory on every update make sure you update your search index or inverted
index
从理论上来讲，当你每次更新的时候，你要确保更新了你的查找索引或者是倒排索引
01:15:09 - 01:15:11
If its external
如果它是外挂之类的东⻄
1.15.11-1.15.13
and you can run this as a cron job or push updates to it
你可以将它作为计划任务来执⾏，或者是将更新推送给对应的系统中(知秋注:⽐如es)
01:15:14 - 01:15:17
A lot of times people will stage updates in batches
许多时候，⼈们会分批进⾏阶段更新
1.15.17-1.15.19
and then apply them every so often
然后，每隔⼀段时间更新⼀下
1.15.19-1.15.22
because potentially updating the inverted index is super expensive
因为对倒排索引进⾏更新所要付出的代价会超级昂贵
01:15:23 - 01:15:25
And again I realize I'm going to over the super fast
我意识到我这⾥讲的有点快
1.15.25-1.15.30
I just want you to be aware that beyond B+tree and hash tables that we talked about here
我想让你们意识到，除了我们这⾥所讲的B+ Tree和hash table以外
01:15:30 - 01:15:32
It's a whole bunch of other database indexes that are available
还存在着许多其他可⽤的数据库索引
1.15.32-1.15.36
that can do things beyond point queries and range queries that we've looked at
它们可以做出了点查询以及范围查询以外的东⻄
01:15:37 - 01:15:45
And actually the the other class of indexes that we didn't talk about are the geo-spatial
indexes, so things like R-trees, Quad-trees ,KD-trees
实际上我们还有另⼀类索引没有讨论，即geo-spatial index（地理空间索引），⽐如：RTree，Quad-Tree和KD-Tree
01:15:46 - 01:15:48
These allows you to do multiple dimensional lookups
这些允许你进⾏多维度查找
1.15.48-1.15.50
like in your geometric spaces and things like that
我们可以在⼏何空间之类的东⻄⾥⾯使⽤它
1.15.50-1.15.56
these are very common now in like video databases and image databases
这些在视频数据库和图像数据库中⾮常常⻅
01:15:56 - 01:16:01
So there's a whole class that Christos Faloutsos is the other database professor
teaches 15-826
你们会在Christos Faloutsos所教的15-826中学到，他是另⼀个数据库⽅⾯的教授
01:16:01 - 01:16:06
He teaches it in the fall and spring now, so if you're interested this kind of stuff I'll be
teaching it in the spring
他现在春季和秋季这两个学期都有教课。So，如果你们对这感兴趣，明年春季学期可以去选他
的课
01:16:06 - 01:16:09
So the main takeaway for all of this is that
So，这⼀切的主要重点在于
1.16.09-1.16.13
the for our most of the time the B+ tree is gone what we want
在⼤多数时候，B+Tree都能满⾜我们的需要
1.16.13-1.16.19
that's the go-to index that's that's very that's resilient ,and solve many of the problems
that people have in databases
它能⽤于索引，并且⾮常弹性化。它能解决⼈们在数据库中的许多问题
01:16:20 - 01:16:27
Inverted indexes we can go you want to go more detail there's a whole class and I think
an LTI 442 or 642
如果你们想学习更多关于倒排索引（inverted index）的相关信息，你们可以去选11-442或者
是11-642
01:16:27 - 01:16:29
I think it's called search engines
我记得它是叫做搜索引擎
01:16:30 - 01:16:34
Right,but in a search engine only for covers is basically an inverted index
但在搜索引擎中所介绍的就是倒排索引
01:16:34 - 01:16:37
So it's the same the same technology the same methods
So，它们是相同的技术，并且⽤的是相同的⽅法
01:16:37 - 01:16:46
Okay,so next Wednesday we're now gonna go looking at how we actually make our
B+tree thread-safe
So，下周三我们会去讨论如何让我们的B+Tree变得线程安全
01:16:46 - 01:16:53
so we've sort of washed all over this or we've not talked about avoid the problem that
actually how do we allow multiple threads update the index at the same time
So，实际上，我们并没有谈论该如何避免这个问题，我们该如何在同⼀时间让多个线程去更新
索引呢？
01:16:54 -01:16:56
so now we're spend more time talking talking about that
So，下周三我们会花更多的时间来讨论这个
01:16:56 - 01:16:56
okay