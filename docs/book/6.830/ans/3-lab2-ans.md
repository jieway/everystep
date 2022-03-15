# Lab 2: SimpleDB Operators

这个 lab 大致要实现。

* 实现 Filter 和 Join ，已经提供了 Project 和 OrderBy 的实现。

* 实现 StringAggregator 和 IntegerAggregator 。编写计算一个特定字段在输入 tuple 序列的多个组中的聚合。其中 IntegerAggregator 使用整数除法来计算平均数，因为 SimpleDB 只支持整数。StringAggegator 只需要支持 COUNT 聚合，因为其他操作对字符串没有意义。

* 实现`Aggregate`操作符。和其他运算符一样，聚合运算符实现了 `OpIterator` 接口，这样它们就可以放在 SimpleDB 查询计划中。注意`Aggregate`运算符的输出是每次调用`next()`时整个组的聚合值，并且聚合构造器需要聚合和分组字段。

* 实现`insert`和`delete`操作符。像所有的操作符一样，`Insert`和`Delete`实现了`OpIterator`，接受一个要插入或删除的 tuple 流，并输出一个带有整数字段的单一 tuple ，表示插入或删除的 tuple 数量。这些操作者将需要调用`BufferPool`中的适当方法，这些方法实际上是修改磁盘上的页面。检查插入和删除 tuple 的测试是否正常工作。

* 实现 BufferPool 中的页面置换策略(LRU) 。

## Exercise 1

实现 `execution/Predicate.java`,`execution/JoinPredicate.java`,`execution/Filter.java` 和 `execution/Join.java` 并通过 PredicateTest、JoinPredicateTest、FilterTest 和 JoinTest 中的单元测试。此外，还需通过系统测试 FilterTest 和 JoinTest。

Filter，Join，Project 和 OrderBy 都是数据库中常见的算子(operator)。

已经提供了 Project 和 OrderBy 的实现，实现 Filter 和 Join 。

Project 是投影的意思。使用 `SELECT *` 表示查询表的所有列，使用 `SELECT 列1, 列2, 列3` 则可以仅返回指定列，这种操作称为投影。研究一下 Project 类就会发现其实就选择指定列输出。

OrderBy 表示按照指定字段排序输出结果集。

接下来实现 Filter 直译是过滤的意思，将符合条件的留下，所以需要一个判断语句。而判断也就是 Predicate 直译是谓词，第一次看到这个意思我是迷茫的，其实本质上就是一个真或假的表达式。准确的定义解释是：A predicate is an expression that evaluates to True or False 。 

`Predicate.java` 比较表内的字段和提供的数据，三个参数分别是待比较的字段序号、比较符和待比较的数。其中 `filter()` 方法输入一个 Tuple ，然后比较 Tuple 的 Field 是否符合预期。

`JoinPredicate.java` 和 `Predicate.java` 类似，只是实现两个 Tuple 的比较。

`Filter.java` 在构造函数中实例化 Predicate 和 OpIterator。其中 `fetchNext()` 方法逐个读取 OpIterator 中的 Tuple ，然后让他们与 Predicate 中 Field 进行比较，如果为真则返回该 Tuple。

`Join.java` 就是对 `JoinPredicate.java` 的使用，通过构造函数实例化 `JoinPredicate` 和两个OpIterator 。实现一系类get方法和open、close等迭代器的函数。最后完成fetchNext函数找到两个迭代器中可以jion的字段进行join。

fetchNext 中由两个 while 循环进行遍历，直到最外层迭代器遍历完成，每次遍历 child1 取出一个 Tuple ，与 child2 中的所有 Tuple 做 filter 比较，直到有符合要求的，创建新的 TupleDesc ，并且将 child1 和 child2 的字段（field），加入newTuple中，然后返回newTuple，同时将 child2 重置到最开始。

## Exercise 2

实现下面几个方法并通过 IntegerAggregatorTest 、StringAggregatorTest 和 AggregateTest 单元测试。此外还需要通过 AggregateTest 的系统测试。

* src/java/simpledb/execution/IntegerAggregator.java
* src/java/simpledb/execution/StringAggregator.java
* src/java/simpledb/execution/Aggregate.java

只需要实现单个字段的聚合（aggregation）和单个字段的分组（group by）即可。聚合其实就对一组数据进行操作（加减乘除，最值等）。具体可参考：[SQL GROUP BY 语句](https://www.runoob.com/sql/sql-groupby.html)。

`IntegerAggregator(0, Type.INT_TYPE, 1, Aggregator.Op.SUM)` 是生成一个整数聚合的对象。

其中 0 表示分组(Group By)字段位置，也就是根据第零列来聚合。可以为 NO_GROUPING，表示不进行聚合。

Type.INT_TYPE 表示这一列的数据类型，目前只有整数和字符串。1 表示待聚合的字段，Aggregator.Op.SUM 表示执行加法操作。

需要看懂 IntegerAggregatorTest 测试类。其中 scan1 是一张基础表，sum/min/max/avg 是四张经过聚合操作后的表，用于验证 scan1 经过聚合后的结果是否符合预期。

`mergeTupleIntoGroup()` 根据 gbField 字段先判断是否需要进行 group by 。如果需要，那么根据 gbField 从 tup 中提取待聚合的字段，再判断是否是初次填入，然后根据对应 Op 执行对应逻辑。如果不需要 group by 直接累加即可，不需要映射，

StringAggregator 和 IntegerAggregator 逻辑类似，并且仅支持 COUNT 。

Aggregate 是将前两个整合一下。

## Exercise 3.

增加 tuple 或删除 tuple

1. 编写 `HeapPage.java` 并通过 `HeapPageWriteTest` 。

首先根据要删除 tuple 的 RecordId 判断是否被使用，如果已经被使用就比较当前的 tuple 和待删除的 tuple 对象，一致就删除并标记。如果没有被使用那么 tuple slot 就是空。

* markDirty() 用一个队列来记录脏页的 tid，如果是脏页就加入队列中，如果不是就从队列中删除。
* isDirty() 返回队列中最后一个脏页，如果没有脏页就返回 null。
* insertTuple() 首先判断当前页面 td 和待插入 tuple 的 TupleDesc 是否匹配。然后遍历空余的 slot，寻找插入位置找到后插入并设置 RecordId 。最后标记该位置已经被插入。
* markSlotUsed() 修改 head 表示 tuple 被使用。
* deleteTuple() 依旧是判断当前页面 td 和待删除 tuple 的 TupleDesc 是否匹配。然后根据待删除的 tuple 找到 RecordId 判断是否存在，最后根据索引判断 slot 是否被使用，如果使用就删除。

2. 编写 HeapFile.java 并通过 `HeapFileWriteTest` 

* `insertTuple()` 如果当前没有页面就调用 writePage 在磁盘中创建空页。然后去 BufferPool 取页，接下来判断取到的页中是否含有空 slot ，然后插入 tuple 。
* `deleteTuple()` 从 BufferPool 中取出 page 然后删除 tuple 。

3. 编写 BufferPool.java 中的 insertTuple() 和 deleteTuple() 并通过 `BufferPoolWriteTest`。

## Exercise 4.

实现 `execution/Insert.java` 和 `execution/Delete.java` 并通过 InsertTest 和 InsertTest，DeleteTest system tests

## Exercise 5.

实现 BufferPool.java 中的 flushPage() 方法，

通过 EvictionTest system test

discardPage() 方法是直接从缓冲池中删除不写回磁盘。

用 LRU 来实现！通过这道题可以学会 LRU ，[Leetcode 146. LRU 缓存](https://leetcode-cn.com/problems/lru-cache/)，这个[视频](https://www.bilibili.com/video/BV1hp4y1x7MH)讲的很好！ 