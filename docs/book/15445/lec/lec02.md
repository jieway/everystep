## 02 - Advanced SQL (CMU Databases Sys…

例如排序，如果告诉数据库系统具体怎么做的话就需要写一些排序算法，例如冒泡排序。但是对于声明式的语言，例如 SQL ，不需要告诉怎么系统怎么完成，怎么完成由系统本身决定。数据库系统会生成一个最优的查询计划。

SQL 最初叫 SEQUEL，由IBM所发明，并且作为System R项⽬的⼀部分。本意是结构化英语查询语⾔。

Ted Codd 是一名数学家，他设计了关系代数以及关系模型，但实际上他并没有定义任何能够⽤来编写查询语句的编程语言。在1970年代末期，他才定义了他⾃⼰的查询语⾔Alpha。因此在那时，⼈们表示因为有了关系模型，我们应该试着构建⼀个系统来做这些事情。⼈们必须拿出他们⾃⼰的语⾔，这些语⾔能够实现关系演算或者关系代数，因此，IBM他们推出了SQL。这是 System R 项⽬的⼀部分，它也是⼈们在1970年代第⼀个尝试构建的关系型数据库系统。另⼀个主流则是由伯克利所推出的Ingres，目前的 PostgreSQL 是由开发Ingres的那批⼈所开发的。之所以被称为PostgreSQL，是因为它是在Ingres之后所开发出来的。开发Ingres的那群⼈有他们⾃⼰的语⾔Quel，它是由 Mike Stormbreaker 所开发的，他声称这要⽐SQL要好得多。IBM那群⼈根本不知道他们在⼲什么，当然，⼤部分⼈都没有听说过Quel

我并没有说它赢了IBM
在那时候，它的拼写是SEQUEL
之后因为英国有个⼈为他的编程语⾔也取名SQL，IBM为此与他产⽣了版权和商标纠纷
因此，它被简称为SQL
我们现在使⽤SQL的原因是因为当时IBM的地位和现在的地位完全不同
现在可能每个⼈都觉得微软，亚⻢逊和⾕歌才是⼤型科技公司
在1970-1980年代，IBM的地位⾄⾼⽆上
因此从本质上来讲，不管IBM说了什么或者做了什么，最终都成为了⾏业标准
当IBM⾸先发布了他们第⼀个商⽤关系型数据库DB2时
他们实际上从未放出System R，他们只是放出了研究原型
但他们最终做出了DB2，DB2⽀持SQL，因此SQL成为了标准
之所以Oracle起⻜并成为当今巨头的原因是因为他们抄袭了IBM在1970年代时所作的成果
这其中原因有很多，我们会在之后讨论
当IBM推出了DB2和SQL时，Oracle在正确的时间和正确的地点表示他们⾃⼰同样也⽀持了SQL
因此，这在1986年成为ANSI标准，同时在1987年成为国际标准
现在简称结构化查询语⾔（SQL）
尽管SQL是1970年代的产物，但它并不是什么没⼈⽤的语⾔，它也不是静态类型语⾔
就和你知道的C++那样，它⼀直与时俱进
对于SQL也是⼀样，⼈们经常为它添加新的特性和新的功能
最新的标准是在SQL2016版本时定制的
你可以看到随着时间的推移，开发⼈员会在新的版本中添加新的特性
在2016版本中，他们添加了对JSON和多态表的⽀持，2003版本中则添加了对XML的⽀持，在
1999版本中，则⽀持了正则和触发器
通常，这会有⼀个标准，制定这种标准的成员都是来⾃主流数据库公司
主流的数据库公司会推出他们⾃⼰专有的功能和扩展
然后他们会试着将他们的某些功能纳⼊标准
这就是为什么虽然有SQL标准，但没⼈去遵守的原因了
因为在标准出来之前（即该标准指引你应该怎么做），每个公司就已经发明了他们⾃⼰专有的东⻄
因此，如果你声明你的数据库系统⽀持SQL
那么，你所需要满⾜的最低要求也得是SQL-92标准
这也就是我们如今所熟知的基本SQL，例如select，insert，update，delete，创建表，事务这些东⻄都在SQL-92中定义了
因此，如果有⼈说他们的数据库系统⽀持SQL，他们所说的其实就是这个意思
⽆论是开源的还是商⽤的⾼级数据库系统，它们都添加了很多新标准中的特性
这⾥有个很棒的⽹站，上⾯有⼈列出了前四或者前五的数据库系统
上⾯可以看到不同数据库间SQL特性以及功能的⽐较
我们会在今天的课上看到这个
这其中会涉及到⼀些例⼦，⽐如，标准SQL下⼀件事情在不同数据库系统间是怎么做的，通常我们看MySQL就可以了。例如，标准SQL是如何做的，其他的数据库系统⼜是如何处理的，通常我们看MySQL就可以了
尽管有标准实现，但实际上并没有⼈去按照标准去做
据我所知，⽬前没有任何数据库系统通过了SQL 2016标准的认证
它们只⽀持了⼀些很零碎的功能
注：
DML数据库操作语⾔
DDL数据库定义语⾔
DCL数据库控制语⾔
从技术层⾯⽽⾔，SQL并不是⼀⻔单⼀语⾔，它是某些东⻄的集合
具体⼀点,它是⼀个DML，DDL和DCL命令的集合。
DML其实就是数据操作语⾔，它是⼀种命令，例如insert、update、delete、select这些命令来
操作你存在数据库中数据
DDL是⼀种你通过创建schema来存储东⻄的⽅式
DDL是⼀种你可以通过定义schemas 来创建表存储数据的⽅式
然后是DCL，它是某种关于安全性授权的东⻄，它可以⽤来控制哪些⼈可以读取哪些数据
当然，这⾥⾯还包含了⼀些其他东⻄，例如如何定义视图，如何定义完整性以及奇怪的参照约束
当然还有事务相关
这就是SQL的组成了
其中有很多不同种类的命令
我想指出⼀件重要的事，这也是我们今天课上的内容，它和关系代数不同，它是基于集合论的某
种东⻄
SQL实际上是基于bag algebra
你可以把它当成list，set或者bag
在⼀个list中可以有重复元素
但它⾥⾯是有顺序的，如果我将某个元素添加到list上，添加的位置就是它在list中的位置
set中的元素顺序是⽆序的
这意味着元素并没有固定位置，并且你不能有重复元素
如果我试着向⼀个set中插⼊相同元素，它就会将原来的元素覆盖掉
在bag中既没有固定位置也没有顺序，但它允许元素重复
随着我们的讨论，我们会看到我们为什么必须这样做
因为如果我们想让我们的元素有顺序，或者你想保证没有重复元素出现，那么本质上来说，数据
库必须为我们做⼀些额外⼯作才能提供这种功能
只有你显式地要求数据库系统为你提供排序以及移除重复元素
即只有当你明确的告诉数据库系统：为我提供排序，为我删除重复元素
它做不到这样，实际上是更⾼效处理事情。
此时它真的做不到，⽽实际上，如果能做到，真的可以让事情处理的更⾼效
今天的课纲 ，我们要讲 聚合函数 + Group By；处理字符串、⽇期和时间类型；然后还有
接着是更复杂的Nested Queries、Common Table Expressions(CTE)和window functions。
在作业1中，你会需要⽤到除了window函数以外的所有功能
你们会使⽤SQLite来完成作业1
实际上，在上周放出的SQLite最新版中，它添加了对window函数的⽀持
但对于其他东⻄，SQLite都⽀持
我们需要⼀个含有三张表的简单数据库
像这样，它是⼀个虚拟的⼤学（名）。
我们会有⼀张student表，上⾯有学⽣的id，name，login以及GPA
然后有⼀张course表，上⾯有课程id以及name
接着，我们会有⼀张enrolled表
在这张表中我们使⽤student表中的sid作为外键使⽤，⾥⾯有course表中的cid以及学⽣在这⻔
课中所得的分数
我们会将它作为我们讨论的例⼦使⽤
⾸先我们要讨论聚合函数
这些很容易去理解
它基本上就是⼀个函数，它会返回你所select语句执⾏的所得到的结果
它将多个tuple作为输⼊
它会在此基础上计算某种聚合并产生单个结果
在SQL-92标准中定义了AVG()、MIN()、MAX()、SUM() 以及 COUNT()函数
例如，在COUNT()函数中，你将⼀组tuple作为输⼊，然后你要去数出tuple的个数，接着你将数
出来的结果作为单个值输出
这只是⼀种基础标准，在之后的标准和其他数据库系统中，它们还提供了例如中位数，取模以及
标准偏差之类的东⻄
某些数据库系统也允许你使⽤你⾃⼰的聚合函数
我们来看下这个例⼦。
假设我们想去数出student表中login字段中以"@cs"结尾的学⽣数量
我会在之后介绍LIKE的意思
但本质上来说，这⾥它是⽤做通配符使⽤
⾸先记住聚合函数最重要的事：聚合函数只能出现在 select ⼦句中作输出列
这⾥它（PPT）说，这就是我想要产⽣的输出（结果），输出中不能有其他字段
我这想在输出部分产⽣（结果），
还不能有它的其余字段。
它（其余部分在这）没意义
根据 where ⼦句过滤条件找出实际匹配的tuple，之后聚合运算
但同样，在此处的COUNT()例⼦中，我们只想去数出tuple的数量
这⾥的login字段实际上没有任何意义
因为我们只想数出过滤完后的tuple的个数，这与login字段的内容是什么并没有关系
So，我们可以使⽤⼀个"*"来重写这个
"*"是SQL中的特殊关键字，它代表了该tuple中的所有属性
实际上更进⼀步，我们可以将这个“*"⽤1替换
即每数⼀个tuple，tuple的数量就加1
因此，这是⼀个好例⼦
因为我们有三种不同的查询，但它们都能产⽣语义上相同的结果
但为了得出答案，数据库系统可以去选择这种查询的不同变体
它们中的某些在性能上可能有不同的差异
这种可能相当简单
我们能很快意识到此处最⼤的差别在哪
我不需要在COUNT中传⼊login
我可以⽤1去替换此处的login
⼤部分数据库系统都会这么做
但如果遇到复杂的场景，它就不⼀定会⼀直有效
实际上，我们可以在单个查询中放⼊多个聚合函数
假设，在这个例⼦中，我们想去得到login字段中以"@cs"结尾的学⽣的数量以及他们的平均GPA
现在你可以看到，我在SELECT语句中将AVG(GPA)和COUNT(sid)都放在了⼀起
然后它产⽣的结果就像我这⾥展示的这样
很简单。
我也可以在SQL语句中加⼊DISTINCT关键字来告诉数据库，让它只去数我tuple中出现的不重复的元素，或者是不重复的属性值
即计算在Student表中，login字段中以"@cs"结尾的不重复的学⽣个数
这样，我就得到了不重复的账号个数
某种意义上来说，这可能有点荒谬
因为，想必不存在有两个学⽣的登录账户是相同的情况，不然这就出问题了
但在其他例⼦中，你可以将这种运⽤在其他相同的场景之中，并且它也会按照你想的那样去做
在这个例⼦中，我们产⽣了相同的结果
现在我要开始计算聚合
除了我现在计算的聚合以外，我还想从我的数据中得到额外的信息
假设，我想知道选这⻔课学⽣的平均GPA以及这⻔课的cid
因此，在这个例⼦中，我将e.cid加到了聚合之外的输出列表中
你们猜下这个SQL执⾏结果
这个SQL 能不能运⾏？
举下⼿，你认为这能运⾏。
举下⼿，如果你认为这不能运⾏。
来，就你，为什么？
没错，他说的对，在我⽤来计算平均GPA的所有tuple中，它们的cid并不是⼀样的
所有的学⽣上的课都是不同的
那么在输出结果中的e.cid实际上是什么呢？
按照SQL的标准来讲，这实际上并没有被定义，在⼤部分的系统中你得到关于这个的报错
我们其实可以测试⼀下
我开了3个终端
这是在我办公室运⾏的机器，
我有三个⾯板，
上⾯的是PostgreSQL，
中间的是MySQL，
然后是SQLite。
对于你们来说，⽤这台机器进⾏输⼊要更简单，我可以在这⾥登录
此处我们想进⾏select操作
找到每⻔课程注册学⽣的平均GPA
PostgreSQL说，你不能这样做，因为它在e.cid这有标记，你们看。
此处的cid并没有被定义，它并不是聚合的⼀部分
因此，PostgreSQL并不知道你实际想要的是哪个cid
现在我们来试⼀下MySQL
MySQL 给了我们⼀个结果。
但是正确的吗？
不对，因为在cid中给我随便挑了个。
现在我们同样来试SQLite
SQLite 给了我们不同的cid
你可以看到MySQL和SQLite都算出了正确的平均值，但它们选择了不同的cid进⾏计算
All right，我知道看视频的⼩伙伴在这⾥会对MySQL有疑惑
我要说MySQL运⾏时，MySQL原则上允许你⼲不合规的事
他们把这种执⾏称为严格模式，但你可以设置SQL mode让它更严格。
在MySQL中，这种运⾏模式我们称之为传统模式，但你也可以将SQL的模式设置的更为严格
19:27-19:30 虚⽣花
现在，如果我执⾏相同的查询，它会报出和PostgreSQL同样的错误
默认情况下，MySQL 5.7及以上版本会报错，然⽽⽼版本的MySQL并不会报错
修复这个问题的⼀个⽅法就是使⽤GROUP BY
GROUP BY所做的就是，基于某个属性将我们想要的tuple放在⼀起，即物以类聚
接着，现在我们就可以对每个bucket中的tuple进⾏聚合计算
我现在想做的就是得到每⻔课的平均分
我现在把课程ID加在group by⼦句中
⽂件超过20M，有上传限制。这⾥拆成2个10min 的
当我⾸先执⾏这个查询时会发⽣什么呢
实际上我会看到（e.cid这个列）加在（表）后⾯
group by⼦句是将 tuples 与课程ID合并在⼀起
通过这个group by字句，我将e.cid与基于课程ID的tuple合并在⼀起
然后我会对每组进⾏平均GPA计算
现在，可以根据课程id对它们进⾏分组
并且分组操作针对的是之前⽣成的bucket
如果我们想在聚合函数中提取信息,就必须使⽤group by 运算。
就像刚才的属性，我们不能将它(e.cid)放到select⼦句做输出（time --> 18:30），需要将它放
在group by中才允许。
我们试⼀下把s.name放到output部分中。
它不能运⾏
因为它（s.name）必须放在 group by⼦句中。
这种写法确实很荒谬，从技术⻆度⽽⾔，确实是正确的SQL，它能产⽣结果
但从⼈的⻆度⽽⾔，我们并不明⽩这是什么意思，
这⾥SQL的意思是先根据课程id进⾏分组，然后根据学⽣姓名计算平均GPA
得到学⽣的GPA就是他们的GPA
现在你可能会想：我要针对我的聚合结果来做⼀些过滤
我不会在输出部分列出每个唯⼀结果。
你知道，我不会将每个结果都作为输出的⼀部分
你可能会这么想：把要⽤的聚合函数结果放在WHERE⼦句中。
现在，我使⽤这条语句来计算平均GPA
但是我放在了where⼦句中，上⾯写着过滤掉不符合的GPA，就是要⼤于3.9的（GPA）
这部分的意思就是找出avg_GPA⼤于3.9的课程
这并不奏效
因为我们⽆法访问where⼦句中聚合部分的任何东⻄
因为在我们的where⼦句执⾏时它们并不存在
因此，where⼦句的作⽤是⽤来过滤我们所看到的tuple
当我们过滤完，然后我们就可以进⾏聚合计算
因此，我们⽆法在where字句中使⽤聚合函数结果去过滤tuple
因为我们还没有进⾏任何聚合计算
因此，解决这个问题的⽅法就是使⽤HAVING⼦句
现在，你就可以从你的输出列表中引⽤它⾥⾯的任何东⻄了
此处，我把avg_GPA作为AVG(s.gpa)的别名
然后我就可以在HAVING⼦句中引⽤它
这就会⽣成我想要的结果
这会和之前计算聚合⼀样，然后此处它会对结果额外做⼀次过滤
虽然并没在这个例⼦中出现，但是其他例⼦中会出现这种情况，你可以根据HAVING⼦句中的你
所知道的东⻄来在系统中进⾏某些优化
这就是声明性语⾔的优势
即你可以提前知道这⼀切，这也是程序员所想要的答案
通过这些，你可以提前知道，所得结果中包含了程序员想要的⼀切
你可以使⽤提示的查询计划，来帮助你改进或减少某些运⾏查询的⼯作量。
在AVG_GPA这，我想给tuples计数，找出⼩于某值的组。
我想统计⼩于某个值的⼀些集合的数量（通过GROUP BY来做）
随着我的聚合函数计算的进⾏
然后，我意识到我需要的tuple数量不超过10个，我要通过我的HAVING⼦句来进⾏滤掉
我的HAVING⼦句表示要过滤掉任何⼩于10的tuple
那么我在分组中留下累计到11的tuple（没听清单词）
那么我不会让第11个Tuple存在于这个组中
我知道，最后⼀部分计数的tuple没⽤，因为它没传到having⼦句中（知秋注：数量够了就⽆需
要再接收判断了）
So 我可以去掉⼀些tuple，因为它做⽆⽤功。
就像你⽤Python程序语⾔这样编写
Right，你也可以⽤诸如Python这样的程序语⾔来实现这些 （知秋注：你查出来结果后，⾃⼰来
做过滤等操作）
All right，你不得不去写这些步骤，但你⾃⼰要懂其中的内在逻辑。
你懂得。
你要知道数据库是不知道之后要做什么的（知秋注：你得告诉它），因为它不能预知。
但在SQL这种声明性语⾔中，我们可以做到这⼀点。（机翻）
Right，但我们可以通过像SQL 这样的声明性语⾔来做到这⼀点
我们接下来想谈论的是如何处理字符串
该表总结了在不同数据库系统中字符串处理⽅式的异同
SQL标准规范有说，所有的字符串，例如：varchar，char和text field
并且它们必须区分⼤⼩写，并且使⽤单引号来进⾏声明
⼤多数数据库系统都遵循这⼀点
MySQL和 SQLite 会⽤古怪的⽅式避开。
MySQL和 SQLite 实现的⽅式就很奇特. (拿不准)
对此，MySQL和SQLite的处理⽅式有点古怪
SQLite 中字符串是⼤⼩写敏感的，但你可以⽤单双引号标记他们。
MySQL中是不区分⼤⼩写的，你可以使⽤单双引号
我在2000年的时候，当时使⽤数据库系统有遇到过这⽅⾯问题，当时⽤的是MySQL 3（注：
2000 年MySQL 3.23 版本发布）
使⽤双引号根深蒂固在我的记忆中，
我每次都在纠正⾃⼰，切换数据库时随时回来改⽤单引号。
你知道，使⽤双引号这种⽅式已经在我脑海⾥根深蒂固了，因为这是我过去养成的习惯。所以，
每次在我切换到另⼀个数据库系统时我时常要修正我⾃⼰，使⽤单引号。
MySQL现在已经有⽀持标准模式，即满⾜我们这种强迫症患者的需求，即必须使⽤单引号
但在默认情况不⾏。
但在默认情况下，你就不需要考虑这些了
依据SQL标准，我想取出⼀个name
我想匹配并取出⼀个叫 ‘KaNyE’ 的name，可以看到是⼤⼩写混合的
你看⼤⼩写混合的。
在SQL 标准中，使⽤upper 转化成⼤写字⺟， 再通过 upper函数来匹配。
在SQL 标准中，使⽤upper函数 转化成⼤写字⺟， 再匹配。
在SQL标准下，你不得不使⽤upper函数进⾏⼤写转换，来做这项匹配⼯作
在MySQL中不⽤这么做
因为所有的字符串匹配不区分⼤⼩写。
之前展示过 like ⼦句，但它不适⽤匹配第⼀个字符
我们来看之前展示过的 like ⼦句，你可以通过这⼀⾏来进⾏字符串匹配
基本上是， 试着⽤你的百搭字符串匹配其他字符串。
基本上这个like会做什么呢，你知道，他会尝试去匹配通配符所能匹配的字符串
不论你是什么字符都⽤ * 号代表，⽽这⾥（数据库）就打印⼀个 %
出于某种原因，这⾥（数据库）使⽤⼀个%来代替我们常⽤ * 号所表达的意思
所以这⾥ % 的意思是指⼀个或多个字符，同样 _ 的意思是匹配⼀个字符。
table that start with 15-445,15-721,
All right, 我想从 enrolled 表中取出所有课程ID为15-445和15-721的记录.
注：表格是根据ppt做的，详情请看本⽂件夹内《02节课所⽤到的表》
enrolled
sid cid grade
53666 15-445 C
53688 15-721 A
53688 15-826 B
53655 15-445 B
53666 15-721 C
63
26:21-26:34
I would use the % like that, and say if I want to get all the students where the the login
ends with @C ,and then some wild card I will use a single underscore for that.
15 * ，15-445,721, 就像这样我⽤ % ，（没有把握）
然后想要得到所有学⽣中登录名后是 @C，接着⼀个任意字符的数据，这我⽤⼀个下划线。
我会这样使⽤％，并说如果我想让所有学⽣的登录名以@C结尾，然后使⽤⼀个通配符，我将使
⽤⼀个下划线。
如果我想得到所有在login字段中以@c结尾的学⽣的记录，那么我会如图中那样使⽤%，为此，
我还需要在它后⾯再添加⼀个通配符“_”
64
26:36-26:40
So the SQL standard also defines a bunch of string functions.
SQL标准中也定义了⼀系列字符串函数
26:40-26:49
there's a again the standard things you would expect like, substring ,upper lower, trim or
these are all part of the SQL-92 standards
例如你所期望的substring，upperlower，trim之类的函数，它们都是SQL-92标准中的⼀部分
26.49-26.50
and most systems will have this
⼤部分数据库系统中也有这些东⻄
26.50-26.55
but of course there will be a bunch of other stuff that are proprietary in each database
database system.
但当然，每个数据库系统中还有很多它们所独有的东⻄
26:55-27:00
So the thing to point out unlike aggregation functions
有⼀点要指出，和聚合函数不同的是
67
27:00-27:07 winston
with string functions. And you know mathematical functions and date functions, they can
appear anywhere in your queries.
对于字符串函数，数学函数和⽇期函数来讲，它们可以出现在查询中的任何地⽅。
68
27:07-27:10
So they can be in the Select output list it can be in your predicates.
So，它们可以放在SELECT输出列表中，也可以放在条件判断的部分
69
27:10-27:16
All right, they don't always have to be in the in the select portion, they can mean you're
having clauses.
它们也⽆须⼀直放在SELECT部分，你也可以将它们放在HAVING⼦句中
27:16-27:24 winston
So here we have you know, the first guy first query is gonna take the name and take a
substring and just get just get the first five characters.
第⼀个查询是取名字的前五个字符。
71
27:24-27:37 winston
And then the second one we did is to show before of doing matching where, the the
uppercase version of the student name is begins with KAN.
第⼆个查询是找出学⽣名转化成⼤写后开头是KAN的数据
72
27:37-27:41
So again string functions are for the most part the basic ones will be pretty much
standardized across all systems
字符串函数是所有数据库系统中最基本也是最标准化的部分
27.41-27.44
where things get weird as when you want to start doing a concatenation.
当你想要开始做拼接操作的时候，事情就会变得让⼈有点不爽
73
27:45-27:50 winston
So the SQL standard says that you use to double bars to concatenate to strings together.
SQL标准下你可以使⽤ || 将字符串连接在⼀起。
74
27:50-27:59 winston
And most systems follow this,in my opinion I would say Postgres Oracle probably
followed the SQL standard the best out of all the systems.
⼤多数（数据库）系统也遵循这⼀点。依我看，Postgres 和Oracle ⼤概是所有（数据库）系
统中遵循SQL标准最好的。
75
28:00-28:05 winston
SQL server and DB2 are probably next, SQLite then probably，MySQL is the worst.
SQL server 、DB2其次，SQLite还⾏，MySQL最差
76
28:05-28:24 winston
So you want to say to concatenate the student name and add @cs to it do use double
bar in the SQL standard, in SQL server from Microsoft you use the plus sign, in MySQL
they don't have a plus sign, they don't have the double bar, they only have this concat
function.
你想说 SQL标准下是将 学⽣名 和 @cs ⽤ || 连起来 ，
在Microsoft SQL Server 下要⽤ + ；
在MySQL下不能⽤ + 、不能⽤ || ，只能通过concat()函数。
77
28:24-28:30
Were you basically defined as the input parameters the things you want to concatenate
together.
就是你想拼接的字符串要作为⼊参。
你需要将你想要拼接的内容作为参数放⼊CONCAT()函数
78
28:30-28:38 winston
They have something else that's kind of weird to where you can actually, if you don't put
anything between two string literals that'll concatenate them together.
它还有另⼀种奇特的⽅法你可以试⼀下：两个字符串之间不⽤加任何东⻄就能连上
它还有⼀种⽐较奇特的⽅法，那就是如果你在这两个字符串之间不放任何东⻄，它们也会连接在
⼀起
79
28:39-28:40 winston
So to show you what I mean by that.
来，我给你示范下
80
28:40-28:45
So here we have MySQL,so I can do something like this.
这⾥我们⽤的是MySQL，我可以这么做
81
28:45-28:52
‘An’ ‘Dy’ ‘Pavlo’
‘An’ ‘Dy’ ‘Pavlo’
82
28:53-28:59 winston
Right, nobody else does this as far as I know，let me double check that before I lie to
you.
我知道其他数据库做不到这⼀点，别说我骗你 来检查⼀遍。
⽬前为⽌，就我所知道的来说，其他数据库并没有做到这⼀点，我之后再确认下告诉你们
28:59-29:06 winston
Let's try it in huh yeah Postgres doesn't like it.
这试⼀下，嗯Postgres这不⾏
让我们⽤Postgres来试⼀下，emmm看来它不⾏
29:06-29:11 winston
SQL server doesn't like it either,right only MySQL does that.
SQL server 也不⾏，嗯，就 MySQL 可以
29:13-29:18
All right, so now we're things get really really bad is when you have date and time
functions.
当使⽤⽇期和时间类型时，我们得到的结果很糟糕。
当我们使⽤⽇期和时间相关的函数时，我们就会遇到些很糟糕的事情
29:18-29:25 winston
Right, so a date basically you can just records the timestamp without the time,
timestamp is is the time.
⽇期（类型）基本上你可以记录时间戳⽽不⽤时间格式，时间戳就是时间。
87
29:25-29:33
Now they vary on the granularity of the time,they may be tracking, sometimes in
seconds, sometimes it's in milliseconds or something even more fine-grain than that.
它们可以切换时间粒度、可以跟踪：有时是秒、有时是毫秒或者是更细粒度的。
29:33-29:42 winston
But where things get wonky is how you actually start manipulating them and extracting
them extracting information from them.
但不稳妥的是如何使⽤和获取他们。
当你对时间进⾏操作和从它们中提取信息时，结果就会变得不可靠
29:42-29:47
Right, and so the syntax for all these different systems can vary wildly.
对于所有不同系统来说，语法可以千差万别
29:47-30:01
So for this example, we want to do is I want to show you how to do what I consider a
seemingly easy function or easy operation, get the number of days from today to since
the beginning of the year.
So，我们来看这个例⼦，此处我想通过⼀个简单的函数或者操作来得到从今年开始到现在的天
数
30:01-30:05
And we'll see how to try to do this and on these three different systems, okay.
我们来看下这三种不同的系统是怎么做到这点的

02-03
02-03
⽂件超过20M，有上传限制。这⾥拆成2个10min 的
30:08-30:10 虚⽣花
Okay, so the first thing is that we want to get maybe what the current time is.
⾸先我们想得到的东⻄就是当前时间
93
30:18-30:19
I just kill my wifi.
我刚把wifi关了
94
30:31-30:33 虚⽣花
Okay all right,
好了，现在⽹络正常了
30.33-30.37 虚⽣花
so the SQL standard defines a now function
SQL标准中定义了⼀个NOW()函数
30.37-30.39 虚⽣花
can everyone see that or now.
现在每个⼈都能看到屏幕上的内容吗？
30.39-30.42 虚⽣花
in the back guys can you see it, okay cool.
坐后⾯的同学能看到吗？Ok，这很好
95
30:42-30:44 虚⽣花
So you call now
现在我们执⾏了NOW()函数
30.44-30.46 虚⽣花
and it gives you the current timestamp.
它返回我们当前时间戳
96
30:46-30:50
So we can do that in in MySQL.
来，在MySQL运⾏⼀下。
97
30:54-30:55
And we can do this in SQLite.
然后在SQLite运⾏⼀下。
98
31:00-31:01
what you can't do in SQLite.
SQLite这不⾏。
我们⽆法在SQLite中执⾏这个函数
31:01-31:04 虚⽣花
All right all right, so there's another way to do this
其实我们可以⽤另⼀种⽅法来做这件事
31.04-31.09 虚⽣花
they have another function called a current_timestamp.
它们有另⼀个被称为CURRENT_TIMESTAMP()的函数
31:08-31:12
Right, Postgres doesn't have it
但Postgres中并没有这个函数
31.12-31.14
but they had the keyword current_timestamp.
但它们有CURRENT_TIMESTAMP这个关键字
31:15-31:22
MySQL has the function, and it has the keyword.
MySQL不但有这个函数，⽽且也有这个关键字
102
31:22-31:26
All right, SQLite,who says it has the function? Raise your hand.
谁说SQLite有这个函数的，请举⼿
103
31:26-31:31
So who says it says it has the keyword?
还有谁说，它有这个关键字的，你也可以举个⼿
104
31:31-31:33
All right, it's exist .
不错，它确实有这个关键字
105
31:34-31:38
All right, they don't have the function? they have a keyword.
它们并没有这个函数，但是它们有这个关键字
31:38-31:41 虚⽣花
All right,again simple thing like what's the current time, it varies.
例如当前时间这种简单的东⻄，它是会改变的
107
31:42-31:49 虚⽣花
All right so now again, what we want to do is we want to count the number of days,
since the since the beginning of the year.
现在，我们想做的是统计下从今年年初到现在的天数
31:50-31:59 ****** ！！！！！！！
All right, so as a building block what we can try to do is maybe just get what the number
of days is from today.
So，作为构建基块，我们可以尝试做的就是获取从今天起算的天数
All right, 我们来尝试获取下今天是这个⽉的第⼏天
31:59-32:05 虚⽣花
So in this query what I'm doing is I'm taking a date listed here's a string.
在这个查询中我所做的就是将⽇期当做⼀个字符串传⼊函数
32:05-32:08 虚⽣花
Right, so I'm taking the string for today's date
So，我将今天的⽇期作为字符串传⼊函数
32.08-32.09 虚⽣花
and converting it into a date,
并将它转换为⽇期
32.09-32.16 虚⽣花
and then I have the extract function which will extract out the the day field of the date.
然后我通过EXTRACT函数提提取出这个⽇期中的天数
111 虚⽣花
32:16-32:19
Right, so as expected you get you get 29.
正如我们所料，我们知道这是第29天
112
32:19-32:22 虚⽣花
All right,we can try that in the and the other guys
我们也可以在其他数据库中尝试这种操作
32.22-32.25 虚⽣花
it gives you 29
MySQL也返回了29天
32.25-32.27 虚⽣花
they don't have it.
但在SQLite中就失败了
32:27-32:38 虚⽣花
All right,so but now we can see that like, all right, well if I can cast a string for the date
into a date
但现在我们可以看到，如果我将⼀个⽇期字符串转型为⽇期的话
32.38-32.40 虚⽣花
what happens if I just subtract them.
如果我对它们进⾏减法操作，这会发⽣什么呢？
32:42-32:48 虚⽣花
Right, I said I'll take today's date and subtract the it from the beginning of the year.
我要去提取今天的⽇期，然后⽤它减去年初开始的日期
115
32:50-32:52 虚⽣花
And in Postgres, we get it 240 days.
在Postgres中，我们得到是240天。
116
32:52-32:57
All right,MySQL,728.
MySQL是728
注：MySQL把字符串转换成数字类型20180829-20180101=728.
117
33:00-33:01 虚⽣花
I don't know what that means, right
我并不明⽩它在搞什么
33.01-33.05 虚⽣花
like it's not like 240 times 2 or some you know some multiple there. Right
它既不是240乘以2的结果，也不是是240乘以n倍的结果
33.05-33.06 虚⽣花
it's a number.
它是⼀个数字
33:06-33:09 虚⽣花
Right, it ran but it's not what we want.
显然这个结果不是我们想要的。
它虽然成功执⾏了我们的SQL，但显然不是我们想要的结果
119
33:09-33:14 虚⽣花
Right, so now let's try it in SQLite.
现在，我在SQLite中试下我们的SQL语句
33.14-33.15 虚⽣花
SQLite like give us 0.
SQLite返回给我们0
33:15-33:20
ok,So it works in Postgres
Ok，它在Postgres中是可⾏的
33.20-33.22
and now we gotta figure how to do this in MySQL.
现在，我们来弄清楚在MySQL中该如何做到
33:24-33:35
Well so what we can do is we try to extract the the day from,so maybe we take what
we'd bet 728 we had before.
现在我们能做的就是，试着去从之前那个算出728的表达式⾥⾯提出天数
33:35-33:38 虚⽣花
Right, and we extract the day from and see what that means.
现在，我们将天数提取出来，看看它的返回结果是什么
123
33:38-33:42 虚⽣花
All right, it came back with 28， so that's not really what we want.
它返回的是28，很明显这不是我们要的
124
33:42-33:46 虚⽣花
So the way to do it actually is a bit complicated.
这种⽅式实际上有点复杂
125
33:48-33:52 虚⽣花
What we're gonna do is we're going to convert the dates into UNIX_timestamp
我们接下来要做的就是将⽇期转换为UNIX中的时间戳
33.52-33.54
which is the number of seconds
即将它转换为秒
33.54-33.57
since the unit's to epoch which is like some Jan refers 1970.
因为它是从1970年1⽉开始计算的
33:57-34:05 虚⽣花
Right, and now we're gonna have the number of seconds from from the current date
number seconds, since beginning the day we subtract them.
现在，我们就得到了当前⽇期的秒数，然后⽤它减去开始⽇期的秒数
127
34:05-34:09 虚⽣花
Right, and that gives us the number of seconds between now and the beginning of the
year.
现在，它就会返回给我们从今年年初到现在的秒数
34:09-34:14 虚⽣花
And then we're gonna divide that by 60 seconds times, 60 minutes times, 24 days.
然后，我们将它换算为天
129
34:14-34:19 虚⽣花
Right,we got 240 all right.
现在，我们就得到了240天
130
34:19-34:23 虚⽣花
Turns out though after I did this the first time there's actually even easier way.
事实证明，在我第⼀次以这种⽅式做完后，实际上还有更简单的⽅法
131
34:23-34:27 虚⽣花
In MySQL,they have a simple function called DATEDIFF,
在MySQL中，它们有⼀个称为DATEDIFF()的简单函数
34.27-34.30 虚⽣花
and that produces you know the same answer,all right.
它能⽣成和之前⼀样的结果
34:33-34:43
SQLite I think let me try make this a little bigger there go.
让我把屏幕稍微变⼤点
34:43-34:46
In SQLite, they don't have DATEDIFF
在SQLite中，它们并没有DATEDIFF函数
34.46-34.48
you can't subtract date with each other.
你⽆法对⽇期进⾏减法操作
34:49-34.55
The way I figured out to do it was convert the current_timestamp into the to the Julian
calendar
我通过将当前时间戳转换为公历来做到这⼀点
34.55-35.03
which is the number of days since be sore for 4370 BC.
即统计从公元前4370年到现在的天数
35:03-35:10 虚⽣花
And so you subtract the more days since that time it's the number days beginning the
year.
然后，统计到今年年初时候的天数，并⽤上⼀个减去它
你⽤它减去年初开始的⽇⼦
35:10-35:13
And you get roughly 240 right.
你就会得到⼤约240天左右
137
35:13-35:19
All right, and we can cast it to an int and we get 240.
我们可以将它转型为int类型，然后我们就得到了240
35:19-35:29
Right,so these are three super widely used database systems that all differ on some
basic functionality of doing date and time.
这是在三种超级常⽤的数据库系统中处理⽇期和时间上的不同之处
139
35:29-35:36
Right,actually a quick show of hands, who think of these three ones which one you think
is the most popular most widely deployed database system.
快速举下⼿，你们觉得这三个中哪⼀个才是最为流⾏，部署最为⼴泛的数据库系统呢？
35:36-35:42
Raise your hand you think MySQL.About a quarter.
认为是MySQL的举⼿。⼤概四分之⼀。
141
35:42-35:44
Raise your hand think Postgres.Even less.
认为是Postgres的举⼿,更少⼀点。
142
35:44-35:47
Raise your hand think SQLite.Even less.
认为是SQLite的举⼿,更少⼀点。
143
35:49-35:50
The answer SQLite.
答案是SQLite。
144
35:53- 虚⽣花
So a few years ago we had Richard hipp invent our SQLite.
在⼏年之前，Richard Hipp开发了我们的SQLite
-35.59
so SQLite is amazing. it's written by three dudes.
SQLite令⼈⼗分惊讶，原因在于它是由三个⼈开发的
145
36:00-36:07 虚⽣花
Right, there they is he approximate that it's been deployed on 10 billion devices.
据估计，⼤概有100亿机器上⾯都部署了SQLite
36:07-36:09 虚⽣花
Everyone here who has a cell phone
想必在场的各位，每⼈都有⼀台⼿机
36.09-36.12
right that isn't a flip phone or an old person phone
我想它们应该也不是什么翻盖机或者⽼⼈机之类的玩意
36.12-36.14
it is running SQLite on it right now.
现在，在你们的⼿机中就运⾏着SQLite
36:16-36:20
Right, a lot of desktop applications, like Photoshop and illustrator they run SQLite on the
inside.
许多桌⾯应⽤，例如：Photoshop和Illustrator，它们内部都运⾏着SQLite
148
36:20-36:22
Right, SQLite is everywhere.
SQLite⽆处不在
36.22-36.26 虚⽣花
he said that also to every single AOL CD if you know what that is.
就好像AOL CD那样，如果你知道它是什么的话
149
36:26-36:30 虚⽣花
All right, back in the early 2000s when the internet was sort of new in the U.S.
在2000年代早期，互联⽹在美国才刚刚兴起
36.30-36.22 虚⽣花
there was company called America Online
当时有个叫美国在线服务的公司
36.22-36.36 虚⽣花
and they would mail everyone CDs for ten hours free on the internet.
他们会通过⽹络向每个⼈邮寄10⼩时时⻓的CD
36:36-36:42 虚⽣花
Right, every CD that they mailed out, you know hundreds of millions of them had SQLite
running on it.
在他们所邮寄处的每张CD中都运⾏着SQLite，它的数量⾜⾜有成百上千万
151
36:42-36:45 虚⽣花
Right,SQLite is most widely deployed Database system everywhere
SQLite是部署最为⼴泛的数据库系统
36.45-36.49 虚⽣花
and here's the most crazy part, it's public domain he gives it away for free.
最为疯狂的部分在于，他将SQLite对外免费提供
152
36:49-36:53 虚⽣花
Right, I mean Postgres and MySQL are open-source
我想说的是Postgres和MySQL都是开源的
36.53-36.56 虚⽣花
but like oh MySQL,Oracle owns it, Oracle owns the copyright.
但像是MySQL是Oracle所有的，Oracle握有它的版权
36:56-36.59 虚⽣花
There's no copyright on SQLite.
但是SQLite并没有版权这⼀说
36.59-37.01 虚⽣花
Right, it's an amazing piece of software.
所以说，它是⼀个了不起的软件
154
37:02-37:09 虚⽣花
Okay allright, so again, the main takeaway here was that simple things are hard to do
Ok，这⾥的主要收获就是，简单的事情其实做起来很难
37.09-37.13 虚⽣花
because you know there's no standard way to do things even though there is a standard
destification
因为做这些事情并没有⼀个标准
155
37:15-37:21 虚⽣花
All right, so now maybe what you want to do is instead of having the, you know in my
examples I had the terminal open.
在我的例⼦中，我使⽤终端打开
156
37:21-37:26 虚⽣花
Every time I ran a query that the output got printed back to me my terminal.
当我每次执⾏查询时，得到的结果将会在终端上打印出来
157
37:26-37:30 虚⽣花
But maybe what you want to do is keep all the data you generate from a query
但可能你想做的是将你从查询中⽣成的结果保存下来
37.30-37.32 虚⽣花
keep that inside the database system
将它保存在数据库（缓存，session）中
37.32-37.34 虚⽣花
so you can use it in subsequent queries.
这样你就可以在⼦查询中使⽤它
37:34-37:38 虚⽣花
Right, this is way more efficient if your queries generating a lot of output.
如果你的查询⽣成了⼤量的输出，这就会变得⾮常⾼效
37:38-37:43 虚⽣花
You don't have everything sitting down to your laptop, and then push it back up to do
more queries on it.
你就不必将⼀切都放在你的笔记本⾥，然后将它们推送回去，并基于它们来做更多的查询
37:43-37:48 虚⽣花
So you can do output redirection to tell it to say, hey don't print it out to me write it out
to this location.
因此，你可以做输出重定向，即不要将东⻄打印出来给我，⽽是将结果写⼊这个位置
37:48-37:54 虚⽣花
So one thing you do is you can take the output query and you can write it into another
table.
你可以做的⼀件事就是将输出查询写⼊到另⼀张表中
162
37:58-38:02 虚⽣花
Right, and so you in the SQL standard you can use into and this will actually will create
the table for you on the fly.
在SQL标准定义中，你可以使⽤INTO关键字，它在执⾏过程中会为你创建⼀张表
163
38:02-38:06 ******
So whatever is produces the output of the query.
因此，无论是什么都会产生查询的输出
164
38:06-38:08 虚⽣花
Right, again this is declarative
再次说下，SQL是声明式语⾔
38.08-38.11 虚⽣花
the database system already knows what the schema is of the table.
数据库系统已经知道表的schema是什么
165
38:11-38:14 虚⽣花
So it knows in this case here what the type is that this output is going to be.
因此，它知道这个例⼦中输出的类型会是什么
166
38:15-38:18 虚⽣花
So he knows how to define a table that has that it can handle those types.
因此，它知道如何定义⼀张⽤来处理这些类型的表
167
38:18-38:22 虚⽣花
Right, so into basically takes the output to select and writes it into a table
因此，INTO基本上就是将SELECT的输出写⼊⼀张表内
38.22-38.27 虚⽣花
and in MySQL, you have to use the create table, and then inside of it you define your
Select statement.
在MySQL中，你必须使⽤CREATE TABLE，并在它⾥⾯定义你的SELECT语句
168
38:27-38:33 38.33 虚⽣花
You can also have it output data into an existing table.
你也可以将输出数据放在⼀张已经存在的表中
169
38:33-38:40 虚⽣花
And for this you use insert into which looks a lot like we created into the create table
from from before.
对于这种情况，你可以使⽤INSERTT INTO，它和我们只看看过的CREATE INTO看起来很像
170
38:40-38:47
And then instead of having the value Clause, you actually just have a select statement
just to tell it hey get this data are right into here.
实际上这⾥你只需要要放⼀条SELECT语句即可，并不需要将值语句放在⾥⾯
38:47-38:55 虚⽣花
So the important thing about this example versus the previous slide, this is about writing
tuples in tables that already exist.
这个例⼦和前⼀张幻灯⽚上的例⼦所⽐最重要的事情就是，此处是将tuple写⼊已经存在的表中
38:55-39:06
So that means that whatever the, whatever to type the number attributes and their types
that are produced by the Select statement whatever table you're writing it into has to
match that.
这就意味着，⽆论SELECT语句所⽣成的结果是什么，它的属性和类型都必须和对应的表相匹配
39:06-39:16 虚⽣花
Right, if the the Select statement has 44 columns and your table you're writing into as
three, the days and we'll throw in air it says, I can't write into that because it the
attributes don't match up.
如果SELECT语句中有44列，你只填其中的3列，那我们就会将你的数据丢掉，我⽆法将其写
⼊，因为它们俩的属性并不匹配
39:16-39:28 虚⽣花
Now where things get weird is when you start having constraints, that are on the table
you're trying to write into, and the Select statement actually violates those constraints.
事情变得很奇怪的地⽅在于，当你在你的表中设置⼀些约束后，当你再去写⼊数据时，SELECT
语句实际就会违反这些限制
175
39:28-39:33 虚⽣花
So let's say that I have a primary key on my table it says, I can't have any duplicate
student IDs.
假设，在我的表中有⼀个主键，并且我的表中不能有任何重复的学⽣id
176
39:33-39:39 虚⽣花
And then my insert query here tries to start and start inserting duplicates.
接着我的插⼊查询开始插⼊重复数据
177
39:39-39:44
Some database system will throw an error immediately as soon as it sees a duplicate.
某些系统⼀旦读到了重复数据，它们就会⽴即报错
178
39:44-39:45
And no tuples get written
没有任何tuple可以被写⼊
39.45-39.48
some of them will just keep going and ignore the ones that that failed.
某些系统会继续往下⾛，忽略掉写⼊失败的那个
179
39:49-39:55
Other ones will insert the ones that succeeded and just ignore the ones that failed or
maybe just crash right away.
其他系统会插⼊能够成功插⼊的数据，忽略掉那个插⼊失败的，或者就直接崩溃了
180
39:57-40:03
So again the SQL standard says, this is the syntax it to use, but how all the system
sactually implement it will vary widely.
SQL标准表示，这是它使⽤的语法，但实际上所有的系统实现这点的⽅式会完全不同

02-04
02-04
00:40:05 - 00:40:12 虚⽣花
In addition to output redirection we can also do output control.
除了输出重定向，我们还可以做输出控制
2
00:40:12 - 00:40:15
Remember I said the beginning,SQL is based on bag algebra I mean it's unordered.
还记得我之前⼀开始说的，SQL是基于bag代数的，也就是说，它是⽆序的
3
00:40:15 - 00:40:19
But there's many times where you want the ordering in your output Clause.
但很多时候你想让你的输出⼦句变得有序
4
00:40:19 - 00:40:24
And so to do this you add the order by clause.
为了做到这点，你需要加上Order By⼦句
5
00:40:24- 00:40:30 虚⽣花
I have seen is basically specifying how to sort the results that are being generated by by
this query .
基本上就是我们要为其指定⼀个对这些结果进⾏排序的规则
，这就是我们决定该查询所⽣成结果顺序的⽅法
6
00:40:30 -00:40:40 虚⽣花
So in this Example Here, I'm gonna sort the tuple started sort of the tuple main role table
based on their grade.
在这个例⼦中，我根据他们的成绩来对tuple进⾏排序
00:40:40 - 00:40:46 虚⽣花
And by default, even though I don't specify whether I wanted ascending and or
descending,the default in SQL is that you get ascending .
默认情况下，即便我不去明确指定我要的是升序还是降序，SQL默认情况下就会给你的是升序
00:40:46 -00:40:51 虚⽣花
Now you get output like this.
然后你就会得到这样的输出结果
00:40:51-00:40:55 虚⽣花
But I also can add additional attributes to my order by clause do more complicated
things.
但我同样能在我的Order By⼦句中添加额外的属性来做更加复杂的事情
00:40:55 - 00:41:04
So in this case here I want to do my order by grade in descending order, and then after
that I sort them based on the student ID in ascending order.
在这个例⼦中，我想让Order By中的成绩按降序排列，然后再根据学⽣id对结果进⾏升序排列
00:41:04 - 00:41:08 虚⽣花
Right, and I would get output like this.
然后我就得到了这样的结果
12
00:41:08 - 00:41:09
Now the important thing to point out here also too is that
此处我想指出的⼀件重要的事是
41.09-41.12
unlike there in the group by clause
与上⾯的GROUP BY⼦句不同
41.12-41.17
where any attribute that I wanted my output list had to appear in the group by clause.
任何我想要放在我的输出列表中的属性必须在GROUP BY⼦句中出现
00:41:18 - 00:41:23 虚⽣花
In order by you don't have that restriction.
但在ORDER BY中，你就没有这样的限制
00:41:23 - 00:41:30 虚⽣花
Right, it actually goes both ways in this case here I'm sorting by the grade but the grade
isn't part of the output.
在这个例⼦中，我根据grade进⾏排序，但是grade并不在输出列表⾥⾯
15
00:41:30 - 00:41:31 虚⽣花
Right, it doesn't matter.
这并没有什么关系
16
00:41:31 - 00:41:33 虚⽣花
Right, and it knows how to find the data that it needs as its processing the query
当数据库在处理查询时，它知道该如何找到它需要的数据
41.33-41.36 虚⽣花
and do whatever sorting operation that you want to do on it.
然后以你想要的顺序对结果进⾏排序
00:41:40 - 00:41:38
I can also do more complicated things
我也可以做⼀些更为复杂的事情
41.38-41.42 虚⽣花
I can put any arbitrary expression in my order by Clause as well.
我也可以在我的ORDER BY⼦句中放⼊任何任意表达式
00:41:45 -00:41:47
So I can do order by 1 plus 1.
例如我可以使⽤1+1进⾏排序
00:41:47- 00:41:49
Right, and that's still valid it knows how to handle that.
这依然有效，数据库系统知道如何去处理它
20
00:41:49 -00:41:58 虚⽣花
Another common thing you want to do is is limit the number of tuples that are produced
in your output.
另⼀件你经常想⼲的事情就是限制你输出结果中的tuple数量
00:41:58 - 00:42:01 虚⽣花
Right, and of course there's a there's a limit clause for this.
当然，这⾥也有LIMIT⼦句
00:42:01 -00:42:07 虚⽣花
He basically specifies says, for all the results that you of my query only provide me back
some number of them like 10.
它基本上限制了我查询时返回结果的数量，例如这⾥只会返回10条记录给我
00:42:07 - 00:42:15 虚⽣花
Right, and this is very common for things like, you know say like search results you'll see
it show just 10, and then you click the next button to go see the next 10.
这种事情其实很常⻅，例如你在搜索东⻄的时候，每次⽹站只给你返回10条记录，然后你点击
下⼀⻚按钮，它才会给你展示接下来10条记录
24
00:42:15 - 00:42:21 虚⽣花
All right, this is being controlled by it by limit and actually offset
这是通过LIMIT以及offset来控制的
00:42:21 -00:42:20 虚⽣花
So limit just says limit the number of tuples
LIMIT起的作⽤是限制tuple的个数
26
00:42:20 - 00:42:37
offset is going to tell you that And what offset of the number of the tuples,you're
producing as your output,should you skip before you start figuring out how many you
should limit.
offset是⽤来告诉你，在你限制返回tuple数量前，你需要跳过多少个tuple，跳过n个tuple后，
你再开始返回数据（例如我有10条数据，每次限制返回3条，offset值为1，也就是说从第⼆条
数据开始返回）
00:42:37 - 00:42:45 虚⽣花
Right again if you think of a webpage to show you 10 results, you click Next to see the
next 10, they're using a limit with an offset to make that work.
你可以想象⼀个场景，⼀个⽹⻚向你展示10条数据，你点next后会显示接下来10条数据，其中
的原理就是通过LIMIT以及offset来实现的
00:42:45 - 00:42:55 虚⽣花
Now,because it's unsorted again is no guarantee that when you click Next, if you're
using offset you're going to see you definitely gonna see different tuples .
因为这是⽆序的，当你点击next后，并且你也⽤到了offset时，这就⽆法保证你看到的tuple是不
同的
29
00:42:55 - 00:42:59 虚⽣花
Because that's another invocation of the query, and the results maybe different in
different order the second time.
因为这相当于有调⽤了⼀次该查询，第⼆次调⽤时的结果可能会不同
30
00:42:59 -00:43:05 虚⽣花
So in this case here you would combine that with an order by Clause.
在这个情况下，你要将它和ORDER BY⼦句进⾏结合使⽤
00:43:05 -00:43:09 虚⽣花
So that you're guaranteed to go,you know see the first 10 followed by the second 10
and so forth.
这样就能保证第⼀个10条数据后⾯跟着第⼆个10条数据，以此类推
00:43:09 - 00:43:17 虚⽣花
Right,and there's optimizations you can apply whether you're not you have an order by
Clause if you have a limit Clause.
如果你有LIMIT⼦句，但并没有ORDER BY⼦句的话，那么你可以进⾏优化
33
00:43:17 -00:43:15
So if I don't have an order by clause and I have a limit
因此，如果我没有ORDER BY⼦句，但我有LIMIT⼦句的话
43.15-43.20
I know that as soon as, I see sent 10 tuples I'm done, I don't need to go look at anything
else.
⼀旦我看到了10条数据，那就意味着查询结束了，我⽆须去看其他东⻄了
00:43:20 -00:43:24
If you have an order by then you have to see everything ahead of time to sort it
如果你⽤到了ORDER BY，那么你就必须提前看到⼀切，并对结果进⾏排序
43.24-43.26
then you can apply your limit and your offset
然后，你就可以对返回数量进⾏限制，以及设置你的offset值
35
00:43:29 - 00:43:38 虚⽣花
Again I considered that somewhat basic SQL. in previous years, I actually skipped all this.
在前⼏年中，我认为这些都是基本SQL，实际上我将它们全部跳过了
00:43:38 - 00:43:41 虚⽣花
But I I think it's important maybe to go over it a little bit ,because you have to
understand this for the homework.
但我认为你们需要去了解它，这点很重要，因为只有你理解了才能去做作业
37
00:43:41 -00:43:44 虚⽣花
But now we want to talk about more complicated things, this is what I would consider
advance SQL.
但现在我们想去谈论写更为复杂的东⻄，这也是我所认为的⾼级SQL
38
00:43:44 -00:43:50 虚⽣花
So the first thing I want to talk about is is nested queries.
⾸先我想谈的是嵌套查询
39
00:43:50 - 00:43:56
So the way anything about nested query,it's basically allowing you to specify queries
inside of queries.
关于嵌套查询，基本上来讲就是允许你在查询的内部再嵌套查询
40
00:43:56 -00:44:01 虚⽣花
Right, and you can take the output of one query and use that as the input of another
query.
你可以将⼀个查询的输出结果作为另⼀个查询的输⼊条件
41
00:44:01 -00:44:07 虚⽣花
All right, so a simple example like this
So，我们来看个简单例⼦
00:44:07 -00:44:13
I'm doing a Select,I want to get all the names of the students that are enrolled in least
one course.
现在，我想做⼀个查询，去得到所有注册了⼀⻔课程的学⽣名字
43
00:44:13 -00:44:17 虚⽣花
So I have my outer query is defined based on the student table.
我的外部查询是根据Student表来定义的
00:44:17 -00:44:21 虚⽣花
And then the side of that,I have inner query that's and it's gonna get the student IDs
from the role table.
然后这⾥，我的内部查询要做的是根据role表来得到学⽣的id
45
00:44:21 -00:44:23 虚⽣花
Right, so we could write this as a join this is sort of sudden another way to actually do
this.
实际上，也可以通过使⽤JOIN来进⾏实现
做到这点的另⼀种⽅法就是使⽤JOIN
46
00:44:23 -00:44:31
And in actuality when it comes time to actually implement this inside the System.
实际上在系统内部就实现了这个
实际上，系统内部就有这种实现
实际上，系统内部有对此实现
47
00:44:31 -00:44:35 虚⽣花
Most query optimizer will try to rewrite this as a join.
⼤部分查询优化器会试着将这种SQL⽤JOIN的⽅式重写
48
00:44:35 -00:44:36 ***
Right, because it the worst way to actually execute,this is to essentially have two for
loops
由于使用IN操作的方式实际上是最糟糕的执行方式，实际上此处是有两个for循环
44.36-44.39 虚⽣花
Well you loop over every single tuple in the student table.
你要对Student表中的每个tuple遍历⼀遍
00:44:39 -00:44:43 虚⽣花
And for every single tuple you then reimpose the same query over and over and over
again.
然后对于每个tuple，你⼜得⼀遍⼜⼀遍地执⾏相同的查询
50
00:44:43 -00:44:44
MySQL used to do this
MySQL过去是这样做的
44.44-44.47
the more primitive databases systems you should do this.
更多的基础数据库系统也应该这么去做
51
00:44:50 -00:44:54
But the the right way to do is actually just rewrite this as a join.
但实际上正确的做法是⽤JOIN对这种语句进⾏重写
00:44:54 -00:44:54
All right, so you can sort of think of this inner query as like a function
因此，你可以将这种内部查询当做⼀个函数
44.54-44.57
that's can produce some set of tuples as your output.
它可以⽤来⽣成某些tuple作为你的输出
53
00:44:58 -00:45:01 虚⽣花
And then you can apply whatever predicate you want on that in the outer query.
然后，你可以在外部查询中对这些输出结果进⾏条件判断
54
00:45:01 -00:45:07
So we'll walk through a bunch of examples of this and see how it works.
因此，接下来，我们会看到⼀系列例⼦，并弄清楚它是如何⼯作的
55
00:45:07 -00:45:16
So the ,all right, so the first example, I want to if maybe I want to get the names of all
the students exist in that enrolled in 15-445.
So，在第⼀个例⼦中，我想得到所有注册了15-445这⻔课学⽣的名字
00:45:16 -00:45:21
So the way to construct a nested query is,I think it's always important to start maybe
with the outer query.
我认为构建⼀个嵌套查询的办法是先从外部查询开始构建，这点⼀直很重要
57
00:45:21 -00:45:22
And think about what's the actual answer you want to produce
思考下你想要⽣成的实际答案是什么
45.22-45.23
,like what are the actual attributes you what you want to see.
例如，你想看到的实际属性有哪些
00:45:27 -00:45:30
And then you worry about how you're actually going to filter them and get what you want.
然后，你就可以考虑你该如何去过滤它们，并得到你想要的结果
59
00:45:30 -00:45:33
So the outer query we know that we want the name from the student table.
在外部查询中，我们知道我们想要的是得到Student表中的名字
60
00:45:33 -00:45:38
And then where we get those values we'll figure it out.
然后，当我们得到这些值后，我们会对它们进⼀步处理
00:45:38 -00:45:47
So in the inner query,we can write it in as English as the student ID and the set of people
about take 15-445.
在内部查询中，我们可以将它写为英⽂句⼦，如图所示
00:45:47 - 00:45:52
Right,so for that part we know how to write that query pretty easily.
对于这部分，我们知道如何轻松地去编写这个查询
63
00:45:52 -00:45:56 winston
Right, we just filled out all the tuples some enrolled table or the course ID goes 15-445.
我们只是得到 enrolled表中所有课程ID为15-445的 tuples 。
64
00:45:56 - 00:46:02
So now the question is how do we combine them with the the outer query with the inner
query.
现在的问题是，我们该如何将外部查询和内部查询结合起来
65
00:46:02 -00:46:06
Again we can rewrite this as very easily with the Join.
我们可以⽤JOIN去重写这条语句，这⾮常简单
66
00:46:06 -00:46:10
But for our purposes here we want to see how to do it as a nested function.
但我们的⽬的是，我们想通过内嵌函数的形式来做到这点
67
00:46:10 -00:46:14
So for this we can use the in operator.
因此，对于这种情况，我们可以使⽤IN操作符
00:46:14 -00:46:19
And we do a matching on the student student ID.
我们对学⽣id进⾏匹配
00:46:19 -00:46:25
So a way to now read this is that the for every single student in the student table.
这⾥的意思是读取student表中的每个学⽣
70
00:46:25 - 00:46:28
So this first student ID is matching up with a student table.
此处的第⼀个sid要和student表进⾏匹配
00:46:28 - 00:46:39
I want to see whether there's a match of that student ID in the set of all student IDs, that
are in the role table that take the course 15-445 .
我想知道所有学⽣的id是否和role表中注册了15-445的学⽣id相匹配
00:46:39 -00:46:43
So we exit the inner query we produce the set of all student IDs.
因此，在内部查询执⾏完后，我们⽣成了所有学⽣id的集合
73
00:46:43 -00:46:47
And then for every single tuple in the outer query,we check to see whether it exists in
that set.
然后，我们需要检查外部查询结果中的每个tuple是否存在于内部查询所的结果的集合中
74
00:46:47 -00:46:57
Right, now this is it shows you why I was saying before the stupid way to execute this is
for every single tuple in the outer query, we execute the inner query over and over again.
这就是为什么之前我说这种执⾏⽅式是很愚蠢的了，因为你要通过外部查询找出每个tuple，然
后⼜得⼀次⼜⼀次地执⾏内部查询（知秋注：每次⽐较时，内部都要重新查询⼀次）
75
00:46:57 -00:47:02
Right, like that's stupid because we only need to produce the inner query once.
这样做很蠢，因为我们只需要执⾏⼀次⽣成内部查询⽣成结果即可
76
00:47:02 - 00:47:06
And then we can reuse it for every single tuple in the outer query.
然后，我们可以在外部查询中的每个tuple中复⽤它
77
00:47:06 - 00:47:13
So I show it how to in the example see,if I used in
So，我已经在这个例⼦展示了IN的⽤法
-47.10
those other operators you can use.
这⾥还有些其他你可以使⽤的操作符
00:47:13 -00:47:16
So all basically says that every single tuple, that's in my inner query must must satisfy
my predicate
简单来讲，ALL表示的是在内部⼦查询中满⾜我所有条件的每个tuple
47.16-47.20
any means at least one of them needs to.
ANY表示的是当满⾜内嵌查询中表达式时，它会返回任意⼀条满⾜条件的数据
ANY表示在⼦查询中⾄少有⼀个Tuple满⾜条件
79
00:47:23 -00:47:26
All right, so in is essentially the same thing as equals any.
So，本质上来讲，IN和ANY⼲的是⼀样的事情
80
00:47:26 - 00:47:29
All right, is there any tuple that it equals what my predicate or about my tuple attribute is
checking.
即它会返回任意⼀条满⾜我查询条件的tuple
即⼦查询结果中有任意⼀个Tuple满⾜我的条件
81
00:47:32 - 00:47:32
And then exists says at least one rows returned
EXISTS则表示⾄少返回⼀⾏数据
47.32-47.33
and actually I don't care where that matches
实际上，我也并不在意这个数据是否匹配我的条件
47.33-47.37
I just care what to see whether tuple got produces as a result.
我只在意，是否有tuple能作为结果⽣成出来
00:47:43 -00:47:46
So we can rewrite our example for getting all the students in 15-445 like this.
因此，我们可以将这段⽤来查询全部15-445学⽣的SQL重写为这个样⼦
83
00:47:46 -00:47:52
Right, instead of using in we say equals any
这⾥我们不使⽤IN，⽽是使⽤等同于它的ANY
00:47:53 - 00:48:00
So now you read this as,the student ID from the student table check to see whether it
equals any tuple that exists in the set of student IDs that are produced by from from the
enrolled table.
我从student表中找出所有的学⽣id，然后再和enrolled表中的学⽣id集合进⾏⽐较，返回相等的
部分（注：即求这两个表的交集）
85
00:48:00 - 00:48:06
Right,now the inner key the nested queries don't have to only appear in the where clause
内嵌查询⽆须写在WHERE⼦句中
48.06-48.08
they actually can appear anywhere.
实际上，它们可以放在任何地⽅
86
00:48:13 - 00:48:15
Right,so I can rewrite the same query like this.
因此，我可以这样来改写我的查询
87
00:48:15 -00:48:15
Where now I have my nested query in the output of the Select statement.
现在，我可以将我的内嵌查询放在SELECT语句的输出部分处
88
00:48:15 - 00:48:17
So this is a good example
因此，这是⼀个好例⼦
48.17-48.22 ******
this is essentially reversing what I did before in terms of what tables are going to access.
从本质上来说，这与我之前要访问表的顺序相反。
89
00:48:22 - 00:48:32
So now the way to read this is that for every single tuple in the enrolled table,where the
course ID equals 15-445 .
So，现在我们可以这样去理解，找出在enrolled表中，课程id为15-445的所有tuple
90
00:48:32 -00:48:42 winston
I'm gonna then do a matchup in this student table where the student IDs are the same.
然后与 student 表进⾏匹配，得到相同学⽣ID的tuple
91
00:48:38 -00:48:47
Right, there's essentially doing a join inside my output of my select statement.
本质上来讲，这就是在我的SELECT语句的输出⾥⾯做了⼀次JOIN操作
92
00:48:47 -00:48:52
Because now this student ID is being referenced here from the student table and that
student ID is being referenced in there.
因为，现在前⾯的S.sid引⽤的是student表中的学⽣id，此处的E.sid引⽤的则是enrolled表中的
学⽣id
93
- 00:48:52
Okay, there's another good example again
这是另⼀个好例⼦
48.52-48.55
I essentially reversing the order of how I process my tables.
本质上来讲，我将处理表的顺序颠倒了⼀下
94
00:48:55 -00:48.59
Right,and they produce the exact same result
并且它们⽣成了完全⼀样的结果
48.59-49.03
they may have different performance characteristics based on what my data actually
looks like it.
根据我数据实际的样⼦，它们在性能上可能会有所不同
95
00:49:03 -00:49:08
Maybe the case that,this is actually faster to go through the enroll table first instead of
the student table.
可能在这个例⼦中，我们先去查enrolled表中的数据要⽐去查student表来的更快
96
00:49:08 -00:49:14
And therefore we could rewrite it if we wanted to to choose one versus the other.
因此，如果我们想要的是这种⽽⾮另外⼀种，那么我们就可以改写它
97
00:49:14 -00:49:16
And a good optimizer could do this for you.
⼀个优秀的优化器就能帮你做到
98
00:49:16 - 00:49:22
Okay all right, let's look at something any more complicated now.
好了，现在让我们来更些更为复杂的东⻄
99
00:49:24 - 00:49:30
All right, say we want to ‘Find the student record with the highest id that is enrolled in at
least one course’.
假设，现在我们想找到在所有课程中所注册的具有最⾼id的学⽣记录
100
00:49:30 - 00:49:31
Right, seems pretty simple
这看起来相当容易
49.31-49.32
but let's think how we actually do this.
但现在让我们来思考下实际该怎么做
00:49:32 - 00:49:42
So the first approximation would be something like this.
⾸先我们所写的SQL语句看起来是这样的
102 (这⾥按着SQL格式来的)
00:49:42 - 00:49:50
SELECT the max student ID along with the student name FROM from the join and rolled
and student table WHERE the student ID in the role table equals the student ID in the
student table.
SQL语句如图所示
00:49:51 -00:49.54
Will this work why?
这种写法可⾏吗？为什么可⾏？
49.54-49.54
Why not?
为什么不可⾏？
49.54 -00:50:02
what's that?
你说了啥
50.02-50.07
Yeah, there's an aggregation function without a group by
这⾥有个聚合函数，但它并没有使⽤GROUP BY
50.07-50.11
and we're referencing a column that's not in the aggregation.
并且我们引⽤了⼀个不在聚合的列中
00:50:11 - 00:50:17
Right,so again SQL standard says that this shouldn't work
因此，SQL标准就会表示我们这种写法是有问题的，没办法⼯作的
50.17-50.17
let's find out.
我们来看下原因
00:50:17 - 00:50:32
All right, so again we have I gotta disconnect
抱歉，我这⾥⽹络⼜断开了
50.32-50.41
first cuss at the top,so we've run our query here.
我们在顶部的terminal中运⾏我们的查询
00:50:46 -00:50:50
Again PostgreSQL and here's the standard it says get as exactly as he said,
此处，PostgreSQL就会给我们报错
108
00:50:50 - 00:50:54
So you have student ID,student name appears,but it's not a part of a group by,so you
can't use it.
尽管此处出现了s.name，但它并不是GROUP BY中的⼀部分，所以你不能引⽤
109
00:50:54 -00:51:06
Right,in MySQL, same thing it produces that error.
在MySQL中，它也报出了⼀样的错误
110
00:51:06 - 00:51:10
But if we now run it in what they call traditional mode.
但如果我们以Traditional模式运⾏（注：set session sql_mode = ‘traditional’,是设置当前MySQL会话中
sql_mode参数。MySQL5.7 sql_mode 默认限制有7条，报错是only_full_group_by。课上更改为其中⼀条）
111
00:51:10 - 00:51:12
Right, so older versions of MySQL would do this.
MySQL⽼版本都是这样。
注：sql_mode 在5.7版本之前是默认没有这么严格。
112
00:51:12 - 00:51:15
Now we run this query and we get an answer .
现在我们运⾏这条查询，我们就得到了⼀个答案（注：这条SQL 逻辑上有问题，这⾥的找到了最⼤的ID,
后⾯跟着的name 是谁的name?这就是sql_mode 拦截报错的原因。实际上展示出来的name 可能是这个列中任何⼀
个值）
113
00:51:15 -00:51:15
Right, we had the max student ID
我们得到了最⼤的学⽣id
51.15-51.18
and then we say that the name best student is Tupac.
然后，这个学⽣的名字是Tupac
00:51:20-00:51:22
All right, let's try it in SQLite,run one.
现在我们⽤SQLite试⼀下
115 (标记处没听出来)
00:51:29 -00:51:34
it produced an answer,it also produces 53688 as the max e.sid.
它同样给出了⼀个答案，即53688作为最⼤的学⽣id
116
00:51:34 -00:51:36
but it says the that student belongs to Justin Bieber.
但这个id是属于Justin Biber的
117
00:51:39 -00:51:40
Right, and actually I don't know what the right answer is
实际上，我并不知道正确的答案是什么
51.40-51.40
let's see here.
我们来看着
118
00:51:43 - 00:51:58
Yeah,so justin bieber is the right one.
看了下，Justin Bieber才是正确答案
119
00:51:52 - 00:51:52
Right, where as MySQL make sure I'm giving you the same data.
让我来看下MySQL给出的答案是否和SQLite⼀致
120
00:51:56 - 00:51.59
Right, Tupac is actually the lowest
Tupac的学⽣id实际上是最⼩的
51.59-52.01
,all right so, it got it completely wrong.
因此，MySQL给的答案完全错了
00:52:01 - 00:52:08
All right, so the right so,This doesn't work in the SQL standard
在SQL-92中，这种做法是不起效的
52.08-52.10
it runs a SQLite
它能在SQLite中运⾏
52.10-52.13
and and and MySQL, if we turn off that strict mode thing.
如果我们将MySQL的strict模式关闭，那么在MySQL中也能成功运⾏
122
00:52:15 - 00:52:18
So way we can do this is a nested function as again let's build it constructively.
我们可以通过⼀个嵌套函数做到这点，让我们来构建它吧
123
00:52:18 -00:52:21
So we know you want the student ID and the name as the Output
So，我们知道我们想将sid和name作为输出
52.21-52.24
but it's the where clause that think we have to figure out.
但是我们必须弄清楚WHERE⼦句中应该放什么
00:52:25 - 00:52:34
And this one basically says that we want to get a matching tuple,that is greater than
every other student ID that that's that's in our table.
简单来讲，我们必须从我们的表中找到⼀个⽐其他任何学⽣的id要⼤的那个tuple（注：即最⼤
的那个sid所在的tuple）
125
00:52:34 -00:52:38
Right,so we know the inner query shall should be basically the student ID from the
enrolled table.
因此我们知道，在内部查询⾥⾯，我们应该去查询enrolled表中的所有sid
126
00:52:38 - 00:52:43
We can be more more sophisticated maybe put a distinct there,but it's all the same.
我们可以更加复杂点，可以在这⾥放DISTINCT，但放不放都是⼀样的
127
00:52:43 - 00:52:49
But now we need to figure out how to match the student ID from the student,and an
outer query the student ID from from the inner query.
但现在，我们需要弄清楚如何将外部查询的student表中的sid和在内部查询中的sid进⾏匹配
129
00:52:49 - 00:52:53
And for this we can use greater than equal to all.
对于这种情况，我们可以使⽤=>ALL
130
00:52:53 -00:52:56
Right, it has to be greater than equal to,
此处必须是⼤于或等于
52.56-53.00
because we make sure that we match ourselves the student that actually is that does
actually have that the highest one.
因为我们必须确保我们所找到的学⽣的id必须是最⼤的那个
131
00:53:05 - 00:53:07
Right,we can rewrite this in other ways as expected
我们可以以我们期望的⽅式将它重写
-00:53:07
Right, we can rewrite it with the in clause like that
我们可以像这样，将这部分改写为IN⼦句
53.07-53.10
and actually compute the max student ID and the inner query.
实际上，这样就会在内部查询中计算出最⼤的学⽣id
133
00:53:10 - 00:53:16
Right, now basically this is saying match the student ID,that is the max student ID
produced from the enrolled table.
简单来讲，我们现在在enrolled表中找到的最⼤的学⽣id就是我们要找的最⼤的学⽣id
00:53:16 -00:53:24
Right, we can go even further we can rewrite the inner guy to be like this.
我们可以更进⼀步，将内部查询重写为这样
00:53:24 -00:53:22
Right, we do an order by and the student ID
我们根据学⽣id进⾏排序
53.22-53.26
and just rank them in descending order and then do a limit one.
对数据进⾏降序排列，然后限制只返回⼀条数据
00:53:27 -00:53:31
So some systems will actually just rewrite this one to be a max anyway
某些系统实际上会将这个⽤MAX函数进⾏重写
53.31-53.35
just scan everything keep track of which one's the max and it produces the final output
扫描所有数据，并跟踪最⼤值，然后⽣成最终输出结果
53.35-53.36
don't even bother to do them sorting.
甚⾄都不需要对数据进⾏排序
00:53:37 - 00:53:45
Right, again same query rewritten in different ways.
同样的查询能以不同的⽅式进⾏重写
00:53:45 -00:53:43
One more example
我们再来看个例⼦
53.43-53.48
we're gonna find all the courses that have no students enrolled in them.
现在，我们要来找出所有那些没被学⽣注册的课
00:53:48 -00:53:56
So we take our outer query as a Select on the courses.
我们的外部查询语句如图所示
140
00:53:56 - 00:53.56
And then we know our inner query basically says when a find note would have no tuples
in the enrolled table.
接着，我们知道，在我们的内部查询中，我们要找到不在enrolled表中的课程，即没有被注册的
课程
00:53.56 - 00:54.02
So for this one we want to use not exists basically says,we don't want to match anything
in our inner query.
对于这个，我们想要使⽤NOT EXISTS来做，即我们不想匹配内部查询所得结果的任何内容
142
00:54:02 - 00:54:13 ********
And all we need to do that for the inner queries is just just grab every single tuple.
对于内部查询，我们要做的就是获取到它里面的每个tuple
00:54:13 -00:54:16
And here now we're actually matching up,the the course ID in the inner query with the
course ID from the outer query.
现在，此处我们实际上要做的，就是将内部查询中的课程id和外部查询的课程id绑定起来
00:54:16 - 00:54:18
So you can only do this in one direction.
因此，你只能按照这个⽅向去做
145
00:54:18 - 00:54:21
So if you're the inner query,you can reference the outer query.
如果你在内部查询⾥⾯，那你就可以引⽤外部查询的东⻄
00:54:22 - 00:54:25
If you're in the outer query,you can't reference the inner query.
如果你在外部查询处，你就⽆法引⽤内部查询的东⻄
147
00:54:25 -00:54:30
Right, unless you pipe it out or redirect it to a table.
除⾮你将结果重定向到⼀个table中
148
00:54:30 - 00:54:34
So any questions about nested queries.
因此，对于嵌套查询还有任何疑问吗？
00:54:34 -00:54:46 **********
Again they're very powerful maintenance you cannot write what you want to write in a
single query without using nested queries.
它们是非常强大的维护，
它们内部维护了⼀套很复杂的逻辑，你⽆法在不使⽤嵌套查询的情况下在单个查询中完成要编写
的内容
00:54:46 -00:54:58
Yes, her question is can you think of an inner query as a nested for loop.
她的问题是，我们能否将内部查询当做是⼀种嵌套循环来看待
00:54:58 -00:54:56
Yes, but no.
可以，但并⾮如此
00:54:56 - 00:55:08
So we'll see for loop it has a notion of like ordering,it's it's really a set.
for循环实际上有某种类似于顺序的概念，它就是⼀个集合
00:55:08 -00:55:17
Right, so all those operators like in exists,any,those are just trying to say for the entire
set of tuples that are in the inner query check to see whether any of any matches.
So，所有的这些操作符（例如，IN，EXISTS，ANY）所试图表达的是在内部查询中的是否存在
有满⾜条件的任何tuple
00:55:17 -00:55:21
You're not really iterating over every single one.
你并不会真的每个都要去遍历⼀遍
00:55:21 - 00:55:22
If you think of the outer query sort of as a for loop
如果你将外部查询当做⼀个for循环考虑的话
55.22-55.23
because you're iterating every single tuple
因为你正在遍历每个tuple
55.23-55.30
but then the set portion the evaluation of the inner query is always at server and a bag
or set set level
但是服务器对内部查询的评估始终是在⼀个bag或者set的层⾯进⾏的
55.30-55.30
makes sense.
懂了吗？
00:55:30 - 00:55:36
Okay window functions.
Ok，我们来看window函数
55.36-55.42
So window functions are I would say they're new,but they're like fifteen ten years old now.
window函数是⼀种新函数，但其实它们也出现了10-15年左右
00:55:42-00:55:43
So they're not like not brand new
因此，它们并不是什么特别新的东⻄
55.43-55.47
a lot of systems don't support them but the major ones do.
许多系统并不⽀持它们，但主流数据库系统还是⽀持的
00:55:47 -00:55:51
So a window function is sort of like an aggregation
window函数就像聚合函数那样
55.51-55.56
where you're going to compute some function on on tuples.
你会对⼀堆tuple进⾏某些函数计算
00:55:56 - 00:56:04
But rather than doing it on,you know a subset of the tuples and collapsing them down
into a single result
即对⼀个tuple⼦集进⾏函数计算，并将它们聚合为⼀个结果
56.04-56.08 *********
you sort of do this in a incremental fashion or on a moving fashion.
你可以以增量⽅式或移动⽅式进⾏此操作
160
00:56:12 - 00:56:18
And then you still produce tuple as the output,but along with the value that it produced
from the window function.
但你依然会将tuple作为输出结果，后⾯会跟着⽤window函数所计算出的值（知秋注：即会输出
每⼀⾏的数据并在后⾯追加⼀个聚合字段所表示的数据）
161
00:56:18 -00:56:19
Right, so the basic syntax is like this
它的基本语法如图所示
56.19-56.22
you have the function name and then you have an over clause.
此处有⼀个函数名，以及⼀个OVER⼦句
162
00:56:24 -00:56:28
So the function name will be our aggregation functions and other special window
functions,we have which I'll show the next slide.
此处的函数名可以是我们的聚合函数，或者其他特殊的window函数，这个我会在下张幻灯⽚中
向你们展示
163
00:56:28 -00:56:33
And then the over Clause defines how we actually want to slice up the data.
OVER⼦句的作⽤是⽤来表示我们该如何切分数据
164
00:56:33 -00:56:39
Right, this is sort of like combining together the aggregation and the group by,but in a
single clause.
这看起来有点像是将聚合函数和GROUP BY组合为⼀个⼦句
165
00:56:39 -00:56:44
So the function is like the aggregation function the over is like the group by.
因此，这⾥的聚合函数OVER就有点像GROUP BY的意思
166
00:56:44 - 00:56:50
So the aggregation function should be all the things in the SQL standard that we talked
before min(),max(),avg(),count() sum()
So，聚合函数就是我们之前所讨论的SQL标准中的所有东⻄，例如MIN()、MAX()、AVG()、
COUNT()和SUM()
56.50-56.56 ！！！！！！！
the special window functions to do things like introduce a row number to the current row.
某些特殊的window函数所做的事情就是，⽐如为当前⾏引⼊⼀个⾏号
00:56:57 - 00:57:03
So to keep track as the tuples that's being output and it marks them with what order
they're they're coming out.
为了跟踪tuple的输出顺序，我们可以使⽤这个window函数来标记它们的输出顺序
168
00:57:03 -00:57:08
And then rank would be the order of the position of a tuple,if we're doing sorting.
如果我们进⾏排序，那么tuple位置的顺序就是按照rank来排列
169
00:57:08 - 00:57:11
All right, so say what I want to do is I want to go do a select over the enrolled table
现在我想去做的就是对整个enrolled表进⾏查询
57.11-57.14
and I want to produce all the tuples as my output
我想将所有的tuple作为我的输出进⾏⽣成
我想在我的输出中得到所有的Tuple
57.14-57.17
but I want to just mark them with the row number of the output.
但我想在输出⾥⾯标记它们的⾏号
00:57:17 -00:57:25
All right, so I have my row number function,and then for my over Clause,I just leave that
blank.
因此，我有我的ROW_NUMBER函数，然后，在我的OVER⼦句中，我什么也不做
171
00:57:25 - 00:57:26
And then what I end up with is a result that looks like this.
然后，我最终会得到看起来像图上所示那样的结果
172
00:57:26 - 00:57:28
All right, I have all the data that I had before
All right,我拿到了之前所有的数据
57.28-57.30
but now I had this special column here row_num
但现在，此处我有⼀个特殊的列row_num
57.30-57.37
that's just again the order of the tuple that that that it was produced in the output.
它⽤来表示该tuple在输出时的顺序
00:57:37 - 00:57:43
So sort of like I compute my entire query,and then I do my window function to go over
the results
So，我先执⾏我的整个查询，接着我使⽤window函数来对这些结果进⾏处理
57.43-57.47
and then I add in whatever the computation that I want to generate.
然后，我将它们放⼊我的计算结果中
174
00:57:47 - 00:57:52
So just like a group aggregations
就像GROUP聚合函数那样
57.52-57.56
we can combine things together or group them together,this is what the over keyword
does for us.
我们可以将这些东⻄进⾏分组，这也就是关键字OVER所为我们做的
00:57:56 -00:58:01
So for this we would use partition by to specify how we want to group things .
因此，对于这种情况，我们会使⽤PARTITON BY来指定我们何将东⻄分类的⽅式
00:58:06 -00:58:04
All right,so in this query here,I'm doing the same thing as before
在此处的这个查询中，我在做的事情和之前⼀样
58.04-58.12
where I want to combine them together based on the generate the row number and for
how they produced in their output.
即我想将它们进⾏分组，并在输出中⽣成对应的⾏号
00:58:12 -00:58:17
But then I'm gonna group them together based on the course ID.
接着，根据cid，我将它们进⾏分组
00:58:17 - 00:58:20
Right,so my output would look like this.
因此，我的输出看起来像这样
00:58:20 - 00:58:28
Right, and so now again it looks just like the aggregation where now I'm grouped
together based on the order.
它看起来就像是聚合函数GROUP所做的那样，我根据cid对它们进⾏分组，每⼀组内按顺序排列
180
00:58:28 -00:58:29
Right, pretty simple.
相当简单
181
00:58:29 - 00:58:32
So let's look at something more complicated.
因此，让我们来看些更为复杂的东⻄
182
00:58:32 - 00:58:39
So I can also order by these I can order them instead of partitioning them.
So，此处我也可以使⽤ORDER BY，⽽不是PARTITION BY
00:58:39 -00:58:44
And this is essentially defining how we want to do our ordering to produce our outputs
本质上来讲，这就是定义了我们想以怎样的顺序进⾏输出
58.44-58.48
if we do this ordering, then we compute whatever this the window function is that we
want to compute on that.
如果执⾏此排序，然后我们会在该结果之上进⽽执⾏window 函数
184
00:58:50 -00:58:52
So in this case here,this is a sense you can do the same thing I did in previous slide
在这个例⼦中，你可以做到和我上⼀张幻灯⽚中同样的事情
58.52-58.57
where it's going to more of us group them based on the course ID.
即根据课程id对它们进⾏分组
185
00:58:59 - 00:59:05
But this is doing this by using ordering rather than partitioning.
但这⾥使⽤的是ORDER⽽不是PARTITION
186
00:59:05 - 00:59:14
All right, so let's say we want to compute want to find the student with the highest grade
for each course.
假设我们想去找出每⻔课最⾼分的学⽣
187
00:59:14 -00:59:18
So what we have here is now we have nested query.
现在，此处我们有⼀个内嵌查询
188
00:59:18 - 00:59:21
So in the outer query,we're just going to well on the outer query is ……sorry.
在外部查询中……抱歉，这⾥我说错了
189
00:59:21 -00:59:23
In the inner query,we're going to produce some table result.
在内部查询中，我们要⽣成某些表数据
190
00:59:23 - 00:59:27
But now this is a good example we're having a nested query inside of the from clause.
但这个是⼀个好例⼦，在FROM⼦句中我们有⼀个内嵌查询
191
00:59:27 -00:59:29
So I have from here
这⾥我有⼀个FROM⼦句
59.29-59.39
and then I'm taking the output of this inner query,and I'm gonna map that into a sort of a
temporary virtual table called ranking,that only exists for this tuple.
然后，我将内部查询的输出映射到⼀个名为ranking的临时虚拟表中，它⾥⾯只存在该tuple（知
秋注：最⾼分的那个）
00:59:41 - 00:59:45
Right, so instead of writing it to a table that are exist,we're writing into a temporary table
我们会将它写⼊⼀张临时表中，⽽不是写⼊已有的表中
59.45-59.46
I don't say in memory
我并没有说它保存在内存中
59.46-59.47
because it may actually go out the disk.
因为它实际可能会放在硬盘中
193
00:59:49 - 00:59:58
But a temporary tuple table for this this query that then gets discarded when the query is
over
但当查询完毕后，这个查询的临时tuple表就可以废弃了

02-05
00:59:58 - 01:00:03
So in the inner query, what we're gonna do is we're going to go over the enrolled table.
在这个内部查询中，我们要做的是遍历整个enrolled表
01:00:03 - 01:00:06
And for every single tuple,we're gonna split them up based on the course ID
我们会根据课程id将它们分成单个tuple
对于每个tuple，我们将基于课程ID来对它们进⾏分组
1.00.06-1.00.07
that's the partition clause.
这是PARTITION⼦句
01:00:09 - 01:00:16
And then we're gonna sort them by their grade in ascending order.
然后我们会根据它们的成绩以升序排列
01:00:16 - 01:00:25
And then what we produce,the window function we invoke is rank which is the order that
they exist in the sort of ranking.
然后我们就得到了分组后的结果，接着基于该结果我们会调⽤RANK()这个聚合函数对每⼀个组
进⾏rank排序
01:00:25 - 01:00:30
And then we take that output write it out to the ranking table.
然后我们将输出写⼊ranking表中
6
01:00:30 - 01:00:33
And then in the outer query,we can then do additional filtering based on the their rank.
接着，在外层查询中，我们可以基于他们的rank字段（知秋注：分组后⽣成的临时字段）来做额
外的过滤
7
01:00:33 - 01:00:39
So this is only produce the tuples that are that ranked first.
因此，这只会产⽣排名第⼀的tuple
8
01:00:39 - 01:00:42
Right, so this is finding the students the highest grade for each course.
So，这是⽤来找到每⻔课成绩最⾼的学⽣
9
01:00:42 - 01:00:46
Right, so the thing to point out here is I have,I'm referencing in my outer query
此处我要指出的是，我引⽤了我外部查询中的东⻄
1.00.46-1.00.50
,this ranked attribute here which actually doesn't really exist in the database again
此处的rank属性实际上并不存在于数据库中
1.00.50-1.00.52
it only exists with in this query.
它只存在于这个查询之中
01:00:56 - 01:00.57
I'm seeing a lot of blank faces
我看到许多⼈⾯⽆表情
1.00.57-1.01.01
so let's maybe pop up in the database and see we can do.
让我们来使⽤数据库看看我们能做什么
让我们来在数据库中进⾏⼀波操作
11
01:01:00 - 01:01:11
All right, so for this.
So对于这个⽽⾔
12
01:01:11 - 01:01:15
So PostgreSQL is the only one that actually supports this.
实际上，PostgresSQL是唯⼀⽀持这个的数据库
13
01:01:15 - 01:01:18
MySQL eight supports window functions.
MySQL 8⽀持window函数
14
01:01:18 - 01:01:19
And the newer version SQLite support window functions
较新版本的SQLite也⽀持window函数
1.01.19-1.01.24
but for simplicity what does do my and PostgreSQL.
但为了简单起⻅，我就在Postgres中做这个例⼦
01:01:25 -01:01:31
All right, so this is the query that we had before.
So，这是我们之前的那个查询
16
01:01:31 - 01:01:32
Right, let's break it up
让我们将它拆开
1.01.32-1.01.35
and make it and just do the inner query first
我们先来做内部查询
1.01.35-1.01.37
and that way,it'll be sort of easy to understand.
这样做理解起来要容易点
17
01:01:39 - 01:01:52
Right,so we'll just go back and run this.
So，我们回到这⾥，并运⾏它
18
01:01:52 - 01:02:01
so again what this is gonna do is going to go over the enrolled table,it's going to
partition each record based on the course ID.
这⾥它要做的就是去遍历整个enrolled表，然后根据课程id去对每条记录进⾏分割
19
01:02:01 - 01:02:05
So you see that here where for 15-445 appears first then 721 then 826.
So，你可以看到这⾥是15-445先出现，然后才是15-721和15-826
20
01:02:05 - 01:02:09
And then now within each of these partitions,
然后，在每个分区中
1.02.09-
it's the N going to sort the tuples based on their grade in descending order or,Sorry, in in
ascending order.
它会根据他们的成绩来对tuple进⾏升序排序
01:02:22 -01:02:20
So B pump comes for C
因此，B要排在C的前⾯
1.02.20-1.02.22
,A will come from C
A会排在C前⾯
1.02.22-1.02.26
and then there's nobody else taking 826,so the B's by itself.
因为没有其他⼈学15-826，所以这⾥只有⼀个B
22
01:02:31 - 01:02:33
Right, so that's how we got that output in the form that we redefined.
这就是以我们重新定义的形式获得输出的方式
这就是从我们重新定义的形式所获得输出
23
01:02:33 - 01:02:45
So now the rank function is gonna be computed based on where each tuple appears in
the sorted output list.
RANK函数会根据每个tuple出现在排序后的输出列表中的顺序进⾏计算
RANK函数会根据排序后每个tuple在输出列表中出现的先后顺序来进⾏计算
24
01:02:45 - 01:02:52
So in this case here,this first tuple and within this partition,this guy came first so he gets
Rank 1,this guy came second so he gets ranked 2.
在这个例⼦中，这个分区中的第⼀个tuple，这个⼈先出现，因此他是第⼀名，另⼀个⼈出现在
第⼆个位置，因此他是第⼆名
25
01:02:55 - 01:03:00
Right, if I change this now to be in descending order.
如果我现在将它改为降序的话
26
01:03:00 -01:03:03
It doesn't still does the same thing
它就不会做和刚刚⼀样的事情了
1.03.03-1.03.08
but I could do an order by again.
但我仍然可以使⽤ORDER BY来做到刚刚那样的事情
27
01:03:09 -01:03:14
And now I want to go in descending order.
现在我想以降序排列
28
01:03:14 - 01:03:20
Right, well this is doing the order by,this did the order by after I did my window function
这是在我执⾏完window函数后，再去执⾏ORDER BY
1.03.20*-1.03.21
so it doesn't make sense.
因此，这并没有什么意义
01:03:21 -01:03:25
But the main thing in the rank is different row number
但此处主要在于rank和⾏号是不同的
1.03.25-1.03.27
because the row number says where do you appear in the output
因为⾏号代表的是出现的输出中的顺序
1.03.27-1.03.29
the rank is where do you appear in the sorted order.
⽽RANK()则是分组排序后的组内顺序
01:03:30 -01:03:53
Okay,yes say it again sorry,he says if you have a rank without an order by will just return
a random order.
他的问题是如果不使⽤ORDER BY的情况下，RANK()会返回⼀个随机顺序么
31
01:03:53 - 01:04:01
well you'll still get it ordered by what you have until get them probably split by partitions
在对查询结果进⾏切分分组后，我们依然可以得到⼀个排序后的输出
32
01:04:01 -01:04:06
It doesn't have to be,because it's unsorted,
由于我们并没有按某⼀类进⾏排序
-1.04.01
but that's what you'll get.
但这就是你所得到的结果
33
01:04:01 - 01:04:09
But now here,yeah,so there in this case here,there is no sort ordering anymore so
everyone has the rank of 1.
但现在在我们所得到的结果中，结果并没有被排序，所有记录中的rank字段的值都是1
01:04:09 - 01:04:15
Right,but it still group them up together based on what I'd find it as my partition.
但数据库系统根据我的分组，将它们按组放在⼀起
01:04:15 -01:04:23
And that's more of an artifact of how the database system actually executed the query
rather than the semantics of the query itself.
这就是数据库实际执⾏该查询的结果，⽽不是该查询⾃身的语义
01:04:23 - 01:04:29
His question is what is the rank function do
他的问题是RANK()函数做了什么
1.04.29-1.04.33
the rank is the rank of the rank function produces the rank of the sort order.
RANK()函数⽣成了排序后的排名
01:04:33 - 01:04:37
Right, so if I change my window function to be row number.
So，这⾥我将我的window函数改成ROW_NUMBER()
01:04:40 - 01:04:47
Okay, I have my partition, but it's 1 2 1 2 1.
Ok，这⾥我使⽤了分区，但我得到的结果是1、2、1、2 、1
39
01:04:47 -01:04:55
Right, because within each partition that's what I repair, so I've removed actually the
partition by, then it should go through one through 5.
因为我想修复下此处的分组问题，So，此处我已经将PARTITION BY删除，那么此处的rank字
段的内容就应该是1到5
40
01:04:55 - 01:04.56
Right, like that
对，就像图中那样
1.04.56-1.05.00
if I change this now to rank everything should be 1 .
如果我将此处的ROW_NUMBER()换成RANK()，那么rank处的值应该都是1
01:05:01 - 01:05:05
Right, because there is no sort order everyone's first.
因为这⾥⾯并没有排序，所以所有记录中的rank都是1
01:05:05 - 01:05:14
Yes, our question is a pointless view of rank without an order by,
我们的问题是，因为这⾥没有ORDER BY，所以就没有rank了吗？
1.05.14-1.05.17
yes because there's no sort order,so there's no ranking.
Yes，因为这⾥没有排序，所以也就没有rank了
43
01:05:18 - 01:05:27
All right cool all right.
Cool
44
01:05:27 - 01:05:32
So the last thing we want talk about is CTE complex table expressions.
最后我们想谈的东⻄是CTE——公⽤表表达式(此处⼝误，实际是common)
01:05:32 - 01:05:40
So this is Polly again Mike this is.I find this very interesting,this is probably one more
complicated things that you can do in SQL.
我觉得这个⾮常有趣，它可能是你能在SQL中所做的另⼀件复杂的事情
46
01:05:40 -01:05:41
And it's gonna look a lot like nested queries in that
它和嵌套查询⾮常相似
1.05.41-1.05.44
you're taking the output of a query,I'm using as the input for another query.
即你将⼀个查询的输出结果作为另⼀个查询的输⼊
47
01:05:44 - 01:05:50
But we'll see in a second what you can do with CTE that,you can't do in nested queries,
但我们会在稍后看到⼀些情况，某些你可以在CTE中做到的事情，但换成嵌套查询却做不到
48
01:05:50 - 01:06:05
So her question is in the case of this is it this particular query or it is in general .
So，她的问题是这个例⼦中的SQL语句是某种特定查询还是⼀种通⽤的查询
49
01:06:05 - 01:06:21
So her question is is there a particular advantage of using rank() with a window function
over using a group by?
她的问题是，此处使⽤带有window函数的Rank()是否要⽐使⽤GROUP BY来的更有优势
50
01:06:21 - 01:06:25
So again if you use a group by that's not going to generate the same,you're not going to
get the tuples as part of the output anymore.
如果你使⽤的是GROUP BY，那么你就⽆法将tuple作为输出的⼀部分
51
01:06:25 - 01:06:28
Right, so I go back
So，我回到这⾥
1.06.28-1.06.31
so say I do this one here
So，我在此处进⾏这种操作
1.06.31-1.06.35
Right, row number by partition by .
即ROW_NUMBER OVER (PARTITION BY cid)
52
01:06:39 - 01:06:48
So if I go back and I say,I want to compute now,like the the max grade from enrolled
现在我回到这⾥，假设我想计算出在enrolled表中最⾼成绩的话
1.06.48-1.06.53
group by course ID.
并且根据课程id来分类
01:06:53- 01:06.58
like I no longer see what the original tuples were
如图所示，我没法看到之前的tuple的样⼦了
1.06.58-1.07.00
could they get collapsed together in the aggregate function.
通过聚合函数，它们被整合在了⼀起
01:07:00 - 01:07:04
The window function still produces all the tuples that word in your output.
window函数依然为我们⽣成了输出中的所有tuple
01:07:04 -01:07:09
But I can now see them as I can still see them as the output.
但我现在依然能在输出中看到它们（即max(grade)的结果）
01:07:09 - 01:07:12
So if I go back here
因此，我回过头来改下这⾥
1.07.12-1.07.20
and if I this may or may not work but let's see,so maybe I try max grade partition by my
course ID.
我们来看下，如果我像屏幕中这么写的话，会怎么样呢
1.07.20-1.07.24
Yeah,so here I'm not didn't quite work either.
So，此处我也没能得到正确结果
58
01:07:24 - 01:07:33
what's that
这是为什么呢？
1.07.33-1.07.45 （疯狂试错ingemmm）
sticking oh you know why it might be oat now they didn't like it.
看起来可能是这样，Oh，看来并不是
01:07:45 - 01:07:52
there's the rank,
这⾥应该是rank
1.07.52-1.07.55
oh yeah because I'm an idiot sorry. Yes,
Oh，我知道原因了！
01:07:55 - 01:08:01
it did work I was what I wanted min.
我其实想要的是min⽽不是max，所以这总算可⾏了
01:08:01 - 01:08:05
Yeah,so the highest grade at 15-445 is was was a B.
因此，15-445这⻔课的最⾼分就是B
01:08:05 - 01:08:08
Right,so I still see my original tuples
因此，我依然能看到我原来的tuple
1.08.08-1.08.12
.I still see one student got a C,one student got a B,but the max for that group was B.
我依然能看到⼀个学⽣的成绩为C，另⼀个为B，但是这组的最⾼分为B
01:08:12 - 01:08:15
So I didn't lose the original tuples.
因此，我并没有丢失原来的tuple
01:08:15 - 01:08:21
Now you and your application code have to derive meanings from this output,you know
get the one field that you want.
现在，你的代码就可以根据这个输出结果来衍⽣出你想要的信息
01:08:21 - 01:08:27
But this has allows you to get and still keep the tuples in a way,you can't with a group by
这种⽅式允许你获取并保留这些tuple，但你⽆法通过使⽤GROUP BY来做到这点
1.08.27-1.08.28
that's a good question.
这是⼀个好问题
01:08:29 - 01:08:37
Yes, this question is can you use row number after use an order by?
他的问题是，在我们使⽤了ORDER BY之后，还能使⽤ROW_NUMBER()吗
01:08:37 - 01:08:54
So something like this right,and then maybe order by,oh yeah, there yeah sorry,that's why
there's the as rank.
这样看起来是可以的，应该是order by才对，sorry，这才是为什么输出显示字段⼀直rank的原
因，因为我们使⽤了as rank
68
01:08:54 - 01:09:01
So let's do this row_num oh,I'm a idiot sorry,
这⾥应该是 row_num，特么，我就是个⾖逼，sorry
-1.08.58
no one can see this
没⼈能看到
竟然没有⼀个⼈看到这点
1.08.58-1.08.59
how can you yeah sorry.
你们现在知道怎么回事了吧
69
01:09:01 - 01:09:04
My screen shows one thing this shows another that shows this,okay we're good right.
刚才我的屏幕和投影仪显示的不是⼀回事，现在好了，我们继续吧
70
01:09:04 - 01:09:12
Right,now if we remove the partition by.
如果我们将此处的PARTITION BY去掉的话
71
01:09:12 - 01:09:18
And now we can maybe put descending.
现在，我们在这⾥放⼊DESC
01:09:18 - 01:09:19
Right, so now we'll get 5 4 3 2 1.
So，现在我们得到了5、4、3、2、1
01:09:19 -01:09:31
Right, replace the rank with the row number,what do you mean?
把RANK()换成ROW_NUMBER()，你想表达什么？
01:09:31 - 01:09:44
Let's do this online
我们会在⽹上做这个
1.09.44-1.09.47
because I want to get to CTE ,he knew it for the homework before we keep going.
我想把它作为我们的作业中的CTE部分，让你们来完成
1.09.47-1.09.48
Okay,we can try it afterwards.
Ok，我们可以之后来做
75
01:09:48 - 01:09.52
Okay all right
Ok
1.09.52-1.10.01
so CTE the way basically is gonna work is that,you have introduced to this WITH
clause,there's WITH clause it's like a query that's gonna actually before your your regular
query.
CTE的基本⼯作原理就是，通过引⼊WITH⼦句，WITH⼦句会在你执⾏正常的查询之前先⼀步执
⾏
1.10.01-1.10.06
So we have with and we're defining the name or a CTE.
So，此处我们使⽤了WITH语句，并对CTE定义了⼀个名字，即cteName
77
01:10:06- 01:10:07
And then we have our as clause
接着，我们还有AS⼦句
1.10.07-1.10.17
and whatever is inside of the parentheses after the as,the output of that query would
then get sort of maps to the this are the name of our CTE.
不管我在AS后⾯的括号⾥⾯放什么，该查询得到的输出都会映射到我们的cteName上
78
01:10:17 - 01:10:24
and then in the Select query that comes below it can reference,it does if it was a an
existing table.
如果cteName是⼀个已经存在的表，那么下⽅的SELECT语句就能直接引⽤这个结果（对于⼤批
量的SQL数据，可以优化性能）
01:10:24 - 01:10:33
Right,so in this case here what will happen is I CTE that invokes the query select one.
如图所示，在AS⼦句内部，我们调⽤了SELECT 1
80
01:10:33 - 01:10:35
All right,so let's don't have to have a from Clause
这⾥我们⽆须使⽤FROM⼦句
1.10.35-1.10.40
this just out pollutes,this produces a single tuple with a single attribute with the value
one.
这条语句⽣成了⼀条单个属性值为1的tuple
81
01:10:40 - 01:10:48
And then this other we're at the bottom to select star on it and there's outputs that
single tuple.
然后，在它下⽅的这条查询语句SELECT * FROM cteName，则会输出这条tuple
82
01:10:48 - 01:10:49
So I can start doing more complicated things
So，现在我可以来做些更加复杂的事情
1.10.49-1.10.57
I can now bind the the name or the output columns from the queries inside of the CTE to
given names.
现在，我可以将输出中的col1和col2与cteName中的查询语句中的名字进⾏绑定
01:10:57 - 01:11:03
And then I can reference them by that name down below in my in my statement at the
bottom.
接着，我就可以在下⽅的查询语句中直接引⽤col1和col2
01:11:03 - 01:11:10
So this this CTE produces a single tuple with two attributes with the values 1 and 2.
上⾯这条语句就会得到⼀条有两个属性值的tuple，它的属性值分别为1和2
01:11:10 - 01:11:13
And then these get mapped to the name column 1,column 2.
接着，这两个属性值就会映射到col1和col2
01:11:13 - 01:11:16
And then in the Select statement below,I can just add them together.
然后，在下⽅的SELECT语句中，我可以将它们两个直接加在⼀起
01:11:16 - 01:11:19
Right,pretty straightforward.
看吧，很简单吧
88
01:11:19 - 01:11:22
So let's go back and try to do that example we did before
So，让我们回过头来试着做这个以前做过的例⼦
1.11.22-1.11.28
where we want to find the name of the student with the highest ,student ID that's
enrolled in least one course.
我们想找到在enrolled表中最⼤的学⽣id
01:11:28 - 01:11:35
So for this I have my CTE,and the side of that I'll do my max on the student ID on the
enrolled table.
So在这个例⼦中，我会从enrolled表中找出最⼤的学⽣id
01:11:35 - 01:11:39
Again, that produces one tuple with that max student ID.
它会⽣成⼀条带有最⼤学⽣id的tuple
01:11:39 - 01:11:47
And then down below,I can do a join where I'm gonna reference the the CTE that was
generated above me.
接着，在下⾯的语句中，我可以引⽤上⾯通过CTE所⽣成的cteSource进⾏join操作
我可以引⽤cteSource在上⾯我们所⽣成的东⻄
92
01:11:47 - 01:11:54
And I just combined together the max ID that came out of this,which is defined here with
my student ID.
接着，我将上⾯的maxId和此处我定义的sid结合在⼀起
93
01:11:54 - 01:11:59
And then that produces the one tuple that I want.
然后，它⽣成了我想要的tuple
94
01:11:59 - 01:12:01
Right,again this is another example of how to do the same query
这就是另⼀个我们使⽤CTE来执⾏相同查询的例⼦
1.12.01-1.12.04
at a high-level semantically the same query just written in different ways.
即通过⼀个⾼级的语义以不同的⽅式写出相同的查询
01:12:04 - 01:12:08
So now you may be saying well how is this any different than a nested query.
So，你们现在可能会问，这和⼀个嵌套查询有什么区别
96
01:12:08 - 01:12:16
Right,the answer is you can do recursion in a common table expression that,you can't do
in a nested query.
答案就是，你可以在CTE中进⾏递归，但是在嵌套查询中就不能这么做
97
01:12:17 - 01:12:25
So bear with me here,but this query is going to produce a sequence of numbers from
from 1 to 10 like a for loop.
图中的这个查询语句会通过循环来⽣成1到10这些数字
01:12:25 - 01:12:29
Right, so now we have with recursive we have the keyword
在这个例⼦中，我们使⽤了RECURSIVE关键字
1.12.29-1.12.39
and then inside of our CTE definition,we're gonna do a union between a single query that
produces the value 1.
接着，在我们的cte定义内部，我们会做⼀个UNION操作
99
01:12:39 - 01:12:40
All right,a single tuple with a single attribute 1.
SELECT 1这条语句⽣成的tuple会带有单个属性值1
01:12:40 - 01:12:46
And then we're gonna then Union that with another query that actually references
ourselves.
接着，我们就对另⼀个引⽤counter的查询进⾏UNION操作
接着，我们会对另⼀个引⽤我们⾃⼰这个counter所做的查询进⾏UNION操作（知秋注：将上⼀
个结果作为参数传递到下⼀个查询中）
101
01:12:46 - 01:12:49
So that seeing here,we're gonna vote on our own CTE.
此处可以看到，这样我们就会进⾏+1操作
102
01:12:49- 01:12:55
And then we're gonna take whatever the counter is that's produced by this,and add 1 to
it,and produce that as the output.
然后，⽆论我们使⽤的counter是什么，我们会对它进⾏+1，然后将它作为输出⽣成
103
01:12.55 - 01:13:06
All right,and we keep running this until our where Clause actually gets tripped up where
we try to go above 10.
我们会⼀直执⾏这条语句，直到WHERE⼦句中counter的值⼤于10
01:13:06 - 01:13:08
And then now we stop producing tuples
然后，我们就会停⽌⽣成tuple
01:13:08 - 01:13:16
So now we have the answer that we want that we can then reference below in our CTE .
因此，现在我们得到了我们想要的答案
104
01:13:16 - 01:13:18
Yes, you know it's basically Union.
你知道，它基于Union操作
105
01:13:18 - 01:13:22
Right, it's Union with you know with duplicates.
使⽤UNION的话，就会出现重复结果
103
01:13:22 - 01:13:30
Union by default,sorry Union to sorry,Union without duplicates,Union with duplicates
抱歉，使⽤UNION是不会有重复结果的
1.13.30-1.13.37
Union without all strips keeps duplicates,Union with without all removes them
不带ALL的UNION操作会将重复结果移除
1.13.37-1.13.40
might be that way we can test that though.
我们可以对它测试⼀下
1.13.40-1.13.43
Okay,so let's do this in PostgreSQL
ok，我们在PostgreSQL中做这个例⼦
105
01:13:43 - 01:13:54
All right,so this is the one query that,this is the query that,I showed you.
这是我之前向你们展示的那条查询语句
(这⾥屏幕不够⻓……)
106
01:13:54 - 01:14:01
Right,and we produce the list of tuples,right,with a single value 1 to 10.
然后我们⽣成了tuple列表，它的值是从1到10
107
01:14:01 - 01:14:06
Right, let me try to kill this.
让我试着把它关掉
(这样就够⻓了)
108
01:14:06 - 01:14:10
All right, that better.
好了，这样看起来会好点
01:14:10 - 01:14:17
All right,but it be careful about CTE with recursive
我们需要注意下这个带有递归的CTE
1.14.17-1.14.22
because again net,because you can essentially have infinite loose.
因为你可能会遇上⽆限循环的情况
110
01:14:23 - 01:14:30
So in this query here,I no longer have that counter where it's greater than ten or produce
check any tuples where they're less than ten.
在这条查询中，如果我的counter并没有⼤于10或者说它⼀直⼩于10，
111
01:14:30 - 01:14:33
This will run actually forever.
那它就会⼀直运⾏下去
112
01:14:33 - 01:14:40
but what I did first was I define a toll PostgreSQL to again,I'm highlighting here,and you
can see it.
这⾥我标记下，这样你们就能看到了
113
01:14:40 - 01:14:43
At Postgres that any query that runs longer than 10 seconds automatically kill it.
在Postgres中，任何运⾏时间超过10秒的查询，Postgres都会将它⾃动关闭
114
01:14:43 - 01:14:46
So when I ran this query now
当我执⾏这条查询语句时
1.14.46-1.14.51
it no longer has the where clause to prevent it from going you know looking at tuples
beyond ten.
因为这⾥并没有WHERE⼦句来阻⽌它⽣成超过10条tuple
01:14:51- 01:14:53
And so essentially runs forever.
So简单来讲，它就会⼀直运⾏下去
116
01:14:53- 01:14:57
PostgreSQL recognizes that we're stuck it and a query that's taking too long.
Postgres发现了这个问题，它觉得这个查询花的时间太⻓了
117
01:14:57 - 01:14.59
And go that goes head and automatically kills it.
它就会⾃动结束这个查询
118
01:14.59 - 01:15:08
Yes,so sorry,all right,so select one just does this.
SELECT 1只是做了这件事情
01:15:11 - 01:15:17
Right,so now if I do (select 1) Union all (select 1);
So，现在我这么做，(SELECT 1) UNION ALL (SELECT 1)
120
01:15:17 - 01:15:19
Right,I get like that.
结果如图所示
121
01:15:19 - 01:15:26
So if I think I remove the all,yeah,you get it's a without it removes duplicates.
如果我将ALL给移除的话，那么你就会得到⼀个不重复的结果
122
01:15:26 - 01:15:30
Right,so UNION ALL will give me everything.
So，UNION ALL会给出所有结果
123
01:15:30 - 01:15:42
So essentially what's happening now,is I'm calling my CTE say whatever the whatever
tuples you have in the current value take take the output.
简单来讲，这⾥我所做的就是调⽤之前的cte中的tuple作为输出结果
01:15:42 - 01:15:45
And then add one to it.
然后对它进⾏加1
01:15:45 - 01:15:51
Here,right the plus one there.
在此处进⾏加⼀
01:15:51 -01:16:02
So this is invoking on on our source CTE called source,for every single tuple their take
its output add one to it.
这⾥会调⽤cteSource所⽣成的结果，接着对它⽣成的每个tuple进⾏加⼀
01:16:02 - 01:16:07
So in order to get that tuple it has to go then invoke that CTE which then produces back
one.
为了获取这个tuple，我们必须调⽤之前cte中⽣成的的记录
01:16:07 - 01:16:22
Yeah,it won't let you invoke itself,because it knows you're trying to reference yourself .
数据库系统不想让你引⽤这个source，因为它知道你在试着引⽤⾃身去做查询
01:16:22 - 01:16:26
Those questions what happens if you try to remove the recursive calls.
当你试着移除RECURSIVE时，这种问题就会发⽣
01:16:26 - 01:16:32
Again its SQL its declarative we know everything you're trying to do.
SQL是声明式语⾔，所以我们知道你所试着做的⼀切
01:16:32 - 01:16:36
So you're trying to access a CTE table that's defined by yourself，And it doesn't let you
do that,
So，你正试着访问你所定义的CTE表格，但数据库系统并不会让你这么做
01:16:36 - 01:16:37
for recursive let you do that.
但如果你使⽤RECURSIVE关键字的话，那么你就可以这么做
133
01:16:37 - 01:16:50
So let's try it now also with,let's try it by removing the Union all and see what happens.
我们试着将ALL移除掉，看看会发⽣什么
01:16:50 - 01:16:53
The all apartment （具体语义就是这个）
All现在消失了
1.16.53-1.16.55
and still produces the correct answer.
但依然⽣成了正确的答案
01:16:55 - 01:16.58
Yes,you don't you don't need the Union all.
你⽆须使⽤UNION ALL也能得到正确结果
01:16.58- - 01:17:08
Right,so in this example here again,I'm synthetically generating a table that has a single
value of one.
在这个例⼦中，我⽣成了只有⼀个属性的表
137
01:17:08 - 01:17:10
And then I invoke a query to get that tuple.
然后我调⽤⼀个查询来获取这个tuple
138
01:17:10 - 01:17:15
And add one to it,but then generates a new tuple which and that can then invoke
again,and add one to that.
然后对它进⾏加1，这就⽣成了⼀个新的tuple，接着，我们⼜可以调⽤它，再对它进⾏加1操作
01:17:15 - 01:17:17
And I keep doing that until I don't produce any more matches.
我会⼀直这样做，直到where条件⽆法匹配为⽌
140
01:17:17 - 01:17:23
Right, because any the current ends,because I've reached my limit of ten.
由于我⽣成了10个tuple，没法继续⽣成了（只⽣成10条）
141
01:17:23 - 01:1744
Yes,this question is why are there not duplicates
他的问题是这⾥⾯为什么没有重复数据
1.17.44-1.17.50
because the first time you invoke you had one,then second time you invoke you would
have one and two.
因为你第⼀次调⽤时，你就得到了1，第⼆次调⽤时，你就有了1和2
01:17:50 - 01:18:02
let's do this offline,let's walk through it,because again we're out of time.
我们线下再做，因为现在快下课了
01:18:02 - 01:18:11
All right,yes,quick,this question is do people use for courtesy CTE is that very
common,yes absolutely yes.
他的问题是，⼈们经常使⽤CTE吗，确实如此
01:18:11 - 01:18:16
so this is actually finished up very nicely.
这节课我觉得的⾮常好
145
01:18:16 - 01:18:34 *****************
So the the second point I'm trying to make here is that in an ideal scenario,you always
want to have do to be able to compute an entire query,without having to bring any data
locally,or not having to go back and forth.
So，此处我要说明的第⼆点是，在理想情况下，你始终希望在⽆需将数据放⼊本地，或者来回
移动的情况下，就能够计算整个查询
01:18:34 - 01:18:41 **************
Right, it also provides by running as a single query,although the complexity that makes it
harder to new query optimization.
它还提供了作为单个查询运⾏的功能，尽管复杂性使得新查询优化变得更加困难
01:18:41 - 01:18:49
But if you tell the database system everything you want to do with this sort of piece of
data,then they can do a global optimization on that.
但如果你告诉数据库系统你想对这段数据所做的⼀切，那么系统就能对此进⾏全局优化
01:18:49 - 01:18:57
So by having a CTE,you're not having to have additional logic be somewhere outside the
Database system it will go back and forth.
So，有了CTE，你就⽆须添加额外的逻辑从数据库外来回获取数据
01:18:57 - 01:18.57
You're saying here's everything I want to do .
你就可以说这⾥有我想做的⼀切事情
150
01:18.57 - 01:19:01
So CTE are actually very common,especially in newer applications.
因此，实际上CTE运⽤的⾮常普遍，尤其是在较新的应⽤程序中
151
01:19:01 - 01:19:05
Recursive CTEs maybe less
RECURSIVE CTE可能就⽤的⽐较少了
1.19.05-1.19.07
so,but definitely CTE is
但CTE⽤的⼈绝对很多
1.19.07-1.19.09
,but it's another way to write a nested query.
它是⽤来编写嵌套查询的另⼀种⽅式
152
01:19:11 - 01:19:22
All right,the other major thing that I want to point out is that,again the language is from
1973 or 1974.
我想指出的另⼀件主要的事情就是，SQL是在1973或1974年间出现的
153
01:19:22 - 01:19:25
But it's still widely common you're commonly used
但它依然被我们⼴泛使⽤
1.19.20-1.19.22
,it's being updated all the time
它⼀直在更新
1.19.22-1.19-25
and learning SQL is important.
学习SQL是很重要的
154
01:19:25 - 01:19:29
Because you're gonna see this again throughout your entire life.
因为你⼀⽣都会和它打交道
155
01:19:29 - 01:19:31
Pretty much every single system,Database system that you know it with some minor
exceptions is going to support some variant of SQL.
你所知道的⼏乎每个数据库系统都⽀持SQL，除了会有⼀些⼩例外，会⽀持⼀些SQL的变体