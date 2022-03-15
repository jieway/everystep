# Lab 2 翻译

**Assigned: Tue, Mar 9, 2021**<br>
**Due: Fri, Mar 19, 2021 11:59 PM EDT**


<!--
Version History:


3/1/12 : Initial version
-->

In this lab assignment, you will write a set of operators for SimpleDB to implement table modifications (e.g., insert and delete records), selections, joins, and aggregates. These will build on top of the foundation that you wrote in Lab 1 to provide you with a database system that can perform simple queries over multiple tables.

在这个实验任务中，你将为 SimpleDB 编写一组操作符，以实现表的修改（如插入和删除记录）、选择、连接和聚合。这些将建立在你在实验1中编写的基础之上，为你提供一个可以对多个表进行简单查询的数据库系统。

Additionally, we ignored the issue of buffer pool management in Lab 1: we have not dealt with the problem that arises when we reference more pages than we can fit in memory over the lifetime of the database. In Lab 2, you will design an eviction policy to flush stale pages from the buffer pool.

此外，我们在实验1中忽略了缓冲池管理的问题：我们没有处理当我们引用的页面超过了数据库生命周期内所能容纳的内存时出现的问题。在实验2中，你将设计一个驱逐策略，从缓冲池中冲走陈旧的页面。

You do not need to implement transactions or locking in this lab.

你不需要在这个实验中实现事务或锁定。

The remainder of this document gives some suggestions about how to start coding, describes a set of exercises to help you work through the lab, and discusses how to hand in your code. This lab requires you to write a fair amount of code, so we encourage you to **start early**!

本文件的其余部分给出了一些关于如何开始编码的建议，描述了一组练习，以帮助你完成实验的工作，并讨论了如何交出你的代码。这个实验需要你写相当数量的代码，所以我们鼓励你**早开始**!

<a name="starting"></a>

## 1. Getting started

You should begin with the code you submitted for Lab 1 (if you did not submit code for Lab 1, or your solution didn't work properly, contact us to discuss options).  Additionally, we are providing extra source and test files for this lab that are not in the original code distribution you received.

你应该从你为实验 1 提交的代码开始（如果你没有为实验1提交代码，或者你的解决方案没有正常工作，请与我们联系，讨论各种选择）。 此外，我们还为这个实验提供了额外的源文件和测试文件，这些文件不在你收到的原始代码分发中。

### 1.1. Getting Lab 2

You will need to add these new files to your release. The easiest way to do this is to navigate to your project directory (probably called simple-db-hw) and pull from the master GitHub repository:

你将需要把这些新文件添加到你的版本中。最简单的方法是导航到你的项目目录（可能叫simple-db-hw），然后从GitHub的主仓库拉出。

```
$ cd simple-db-hw
$ git pull upstream master
```

**IDE users** will have update their project dependency to include the new library jars. For an easy solution, run

**IDE用户**将不得不更新他们的项目依赖关系，以包括新的库的jars。对于一个简单的解决方案，运行

```
ant eclipse
```

again, and reopen the project with either Eclipse or IntelliJ. 

再一次，用Eclipse或IntelliJ重新打开项目。

If you have made other changes to your project setup and do not want to lose them, you can also add the dependencies manually. For eclipse, under the package explorer, right click the project name (probably `simple-db-hw`),  and select **Properties**.  Choose **Java Build Path** on the left-hand-side, and click on the **Libraries** tab on the right-hand-side.  Push the **Add JARs...** button, select **zql.jar** and **jline-0.9.94.jar**, and push **OK**, followed by **OK**.  Your code should now compile. For IntelliJ, go to **Project Structure** under **File**, and under **Modules**, select the `simpledb` project, and navigate to the **Dependencies** tab. On the bottom of the pane, click on the `+` icon to add the jars as compile-time dependencies. 

如果你已经对你的项目设置做了其他的修改，并且不想失去它们，你也可以手动添加依赖关系。对于eclipse，在包资源管理器下，右击项目名称（可能是`simple-db-hw`），并选择**属性**。 在左侧选择**Java Build Path**，并点击右侧的**Libraries**标签。 按下**添加JARs...**按钮，选择**zql.jar**和**jline-0.9.94.jar**，然后按下**OK**，接着按下**OK**。 你的代码现在应该可以编译了。对于IntelliJ，进入**文件下的**项目结构，在**模块下，选择`simpledb`项目，并导航到**依赖关系**标签。在窗格的底部，点击 "+"图标，将罐子添加为编译时的依赖项。

### 1.2. Implementation hints

As before, we **strongly encourage** you to read through this entire document to get a feel for the high-level design of SimpleDB before you write code.

和以前一样，我们**强烈建议**你在写代码之前通读整个文档以了解SimpleDB的顶层设计。

We suggest exercises along this document to guide your implementation, but you may find that a different order makes more sense for you. As before, we will grade your assignment by looking at your code and verifying that you have passed the test for the ant targets `test` and `systemtest`. Note the code only needs to pass the tests we indicate in this lab, not all of unit and system tests. See Section 3.4 for a complete discussion of grading and list of the tests you will need to pass.

我们建议沿着这份文件进行练习，以指导你的实施，但你可能会发现不同的顺序对你更有意义。和以前一样，我们将通过查看你的代码并验证你是否通过了 ant 目标`test`和`systemtest`的测试来给你的作业评分。请注意，代码只需要通过我们在这个实验中指出的测试，而不是所有的单元和系统测试。关于分级的完整讨论和你需要通过的测试列表，见第3.4节。

Here's a rough outline of one way you might proceed with your SimpleDB implementation; more details on the steps in this outline, including exercises, are given in Section 2 below.

下面是你可能进行SimpleDB实现的一个粗略的大纲；关于这个大纲中的步骤的更多细节，包括练习，在下面第2节中给出。

* Implement the operators `Filter` and `Join` and verify that their corresponding tests work. The Javadoc comments for these operators contain details about how they should work. We have given you implementations of `Project` and `OrderBy` which may help you understand how other operators work.

实现运算符`Filter`和`Join`，并验证其相应的测试是否有效。这些操作符的 Javadoc 注释包含了关于它们如何工作的细节。我们已经给你提供了 `Project` 和 `OrderBy` 的实现，这可能有助于你理解其他操作符的工作。

* Implement `IntegerAggregator` and `StringAggregator`. Here, you will write the logic that actually computes an aggregate over a particular field across multiple groups in a sequence of input tuples. Use integer division for computing the average, since SimpleDB only supports integers. StringAggegator only needs to support the COUNT aggregate, since the other operations do not make sense for strings.

实现 `IntegerAggregator` 和 `StringAggregator` 。在这里，你将编写一个逻辑，实际计算一个特定字段在输入 tuple 序列的多个组中的聚合。使用整数除法来计算平均数，因为 SimpleDB 只支持整数。StringAggegator 只需要支持 COUNT 聚合，因为其他操作对字符串没有意义。

* Implement the `Aggregate` operator. As with other operators, aggregates implement the `OpIterator` interface so that they can be placed in SimpleDB query plans. Note that the output of an `Aggregate` operator is an aggregate value of an entire group for each call to `next()`, and that the aggregate constructor takes the aggregation and grouping fields.

实现`Aggregate`操作符。和其他运算符一样，聚合运算符实现了 `OpIterator` 接口，这样它们就可以放在 SimpleDB 查询计划中。注意`Aggregate`运算符的输出是每次调用`next()`时整个组的聚合值，并且聚合构造器需要聚合和分组字段。

* Implement the methods related to tuple insertion, deletion, and page eviction in `BufferPool`. You do not need to worry about transactions at this point.

在 `BufferPool` 中实现与元组插入、删除和页面驱逐有关的方法。在这一点上，你不需要担心 transactions 的问题。

* Implement the `Insert` and `Delete` operators. Like all operators,  `Insert` and `Delete` implement `OpIterator`, accepting a stream of tuples to insert or delete and outputting a single tuple with an integer field that indicates the number of tuples inserted or deleted. These operators will need to call the appropriate methods in `BufferPool` that actually modify the pages on disk. Check that the tests for inserting and deleting tuples work properly.

实现`插入`和`删除`操作符。像所有的操作符一样，`Insert`和`Delete`实现了`OpIterator`，接受一个要插入或删除的 tuple 流，并输出一个带有整数字段的单一 tuple ，表示插入或删除的 tuple 数量。这些操作者将需要调用`BufferPool`中的适当方法，这些方法实际上是修改磁盘上的页面。检查插入和删除 tuple 的测试是否正常工作。

Note that SimpleDB does not implement any kind of consistency or integrity checking, so it is possible to insert duplicate records into a file and there is no way to enforce primary or foreign key constraints.

请注意，SimpleDB没有实现任何类型的一致性或完整性检查，所以有可能在文件中插入重复的记录，也没有办法强制执行主键或外键约束。

At this point you should be able to pass the tests in the ant `systemtest` target, which is the goal of this lab.

在这一点上，你应该能够通过ant `systemtest`目标中的测试，这就是本实验的目标。

You'll also be able to use the provided SQL parser to run SQL queries against your database!  See [Section 2.7](#parser) for a brief tutorial.

你还可以使用所提供的SQL解析器来对你的数据库运行SQL查询!  请参阅[第2.7节](#parser)，了解一个简短的教程。

Finally, you might notice that the iterators in this lab extend the `Operator` class instead of implementing the OpIterator interface. Because the implementation of `next` `hasNext` is often repetitive, annoying, and error-prone, `Operator` implements this logic generically, and only requires that you implement a simpler `readNext`. Feel free to use this style of implementation, or just implement the `OpIterator` interface if you prefer. To implement the OpIterator interface, remove `extends Operator` from iterator classes, and in its place put `implements OpIterator`.

最后，你可能注意到本实验的迭代器扩展了`Operator`类，而不是实现OpIterator接口。因为`next``hasNext`的实现往往是重复的、烦人的和容易出错的，`Operator`通用地实现了这个逻辑，只要求你实现一个更简单的`readNext`。请随意使用这种实现方式，如果你愿意，也可以直接实现`OpIterator`接口。要实现OpIterator接口，请从迭代器类中删除`extends Operator`，并在其位置上加上`implements OpIterator`。

## 2. SimpleDB Architecture and Implementation Guide

### 2.1. Filter and Join

Recall that SimpleDB OpIterator classes implement the operations of the relational algebra. You will now implement two operators that will enable you to perform queries that are slightly more interesting than a table scan.

记得SimpleDB OpIterator类实现了关系代数的操作。现在你将实现两个运算符，使你能够执行比表扫描更有趣的查询。

* *Filter*: This operator only returns tuples that satisfy a `Predicate` that is specified as part of its constructor. Hence, it filters out any tuples that do not match the predicate.

*过滤器*。这个操作符只返回满足 "谓词 "的 tuple ，"谓词 "是作为其构造函数的一部分指定的。因此，它过滤掉任何不符合谓词的 tuple 。

* *Join*: This operator joins tuples from its two children according to a `JoinPredicate` that is passed in as part of its constructor. We only require a simple nested loops join, but you may explore more interesting join implementations. Describe your implementation in your lab writeup.

*Join*: 这个操作符根据作为其构造函数一部分传入的 "JoinPredicate "来连接其两个子代的 tuple 。我们只需要一个简单的嵌套循环连接，但你可以探索更有趣的连接实现。在你的实验报告中描述你的实现。

**Exercise 1.**

Implement the skeleton methods in:

***  

* src/java/simpledb/execution/Predicate.java
* src/java/simpledb/execution/JoinPredicate.java
* src/java/simpledb/execution/Filter.java
* src/java/simpledb/execution/Join.java

***  

At this point, your code should pass the unit tests in PredicateTest, JoinPredicateTest, FilterTest, and JoinTest. Furthermore, you should be able to pass the system tests FilterTest and JoinTest.

在这一点上，你的代码应该通过 PredicateTest、JoinPredicateTest、FilterTest 和 JoinTest 中的单元测试。此外，你应该能够通过系统测试 FilterTest 和 JoinTest。

### 2.2. Aggregates

An additional SimpleDB operator implements basic SQL aggregates with a `GROUP BY` clause. You should implement the five SQL aggregates (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) and support grouping. You only need to support aggregates over a single field, and grouping by a single field.

一个额外的SimpleDB操作符用`GROUP BY`子句实现了基本的SQL聚合。你应该实现五个SQL聚合（`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`）并支持分组。你只需要支持单个字段的聚合，以及单个字段的分组。

In order to calculate aggregates, we use an `Aggregator` interface which merges a new tuple into the existing calculation of an aggregate. The `Aggregator` is told during construction what operation it should use for aggregation. Subsequently, the client code should call `Aggregator.mergeTupleIntoGroup()` for every tuple in the child iterator. After all tuples have been merged, the client can retrieve a OpIterator of aggregation results. Each tuple in the result is a pair of the form `(groupValue, aggregateValue)`, unless the value of the group by field was `Aggregator.NO_GROUPING`, in which case the result is a single tuple of the form `(aggregateValue)`.

为了计算聚合，我们使用一个`Aggregator`接口，将一个新元组合并到现有的聚合计算中。在构建过程中，`Aggregator`被告知它应该使用什么操作来进行聚合。随后，客户端代码应该为子迭代器中的每个元组调用`Aggregator.mergeTupleIntoGroup()`。在所有 tuple 被合并后，客户端可以检索到一个聚合结果的OpIterator。结果中的每个元组都是一对形式为`(groupValue, aggregateValue)`的元组，除非group by字段的值是`Aggregator.NO_GROUPING`，在这种情况下，结果是一个形式为`(aggregateValue)`的单一元组。

Note that this implementation requires space linear in the number of distinct groups. For the purposes of this lab, you do not need to worry about the situation where the number of groups exceeds available memory.

请注意，这个实现需要的空间与不同组的数量成线性关系。在本实验中，你不需要担心组的数量超过可用内存的情况。

**Exercise 2.**

Implement the skeleton methods in:

***  

* src/java/simpledb/execution/IntegerAggregator.java
* src/java/simpledb/execution/StringAggregator.java
* src/java/simpledb/execution/Aggregate.java

***  

At this point, your code should pass the unit tests IntegerAggregatorTest, StringAggregatorTest, and AggregateTest. Furthermore, you should be able to pass the AggregateTest system test.

在这一点上，你的代码应该通过IntegerAggregatorTest、StringAggregatorTest和AggregateTest单元测试。此外，你应该能够通过AggregateTest的系统测试。

### 2.3. HeapFile Mutability

Now, we will begin to implement methods to support modifying tables. We begin at the level of individual pages and files. There are two main sets of operations:  adding tuples and removing tuples.

现在，我们将开始实现支持修改表格的方法。我们从单个页面和文件的层面开始。有两组主要的操作：添加 tuple 和删除 tuple 。

**Removing tuples:** To remove a tuple, you will need to implement `deleteTuple`. Tuples contain `RecordIDs` which allow you to find the page they reside on, so this should be as simple as locating the page a tuple belongs to and modifying the headers of the page appropriately.

**删除 tuple ：**要删除一个 tuple ，你需要实现`deleteTuple`。元组包含`记录ID'，允许你找到它们所在的页面，所以这应该很简单，只要找到元组所属的页面并适当地修改页面的标题。

**Adding tuples:** The `insertTuple` method in `HeapFile.java` is responsible for adding a tuple to a heap file. To add a new tuple to a HeapFile, you will have to find a page with an empty slot. If no such pages exist in the HeapFile, you need to create a new page and append it to the physical file on disk. You will need to ensure that the RecordID in the tuple is updated correctly.

**添加元组：** `HeapFile.java`中的`insertTuple`方法负责向一个堆文件添加元组。要向HeapFile添加一个新元组，你必须找到一个有空槽的页面。如果HeapFile中没有这样的页面存在，你需要创建一个新的页面并将其追加到磁盘上的物理文件中。你将需要确保元组中的RecordID被正确地更新。

**Exercise 3.**

Implement the remaining skeleton methods in:

***  

* src/java/simpledb/storage/HeapPage.java
* src/java/simpledb/storage/HeapFile.java<br>
  (Note that you do not necessarily need to implement writePage at this point).

***



To implement HeapPage, you will need to modify the header bitmap for methods such as `insertTuple()` and `deleteTuple()`. You may find that the `getNumEmptySlots()` and `isSlotUsed()` methods we asked you to implement in Lab 1 serve as useful abstractions. Note that there is a `markSlotUsed` method provided as an abstraction to modify the filled or cleared status of a tuple in the page header.

为了实现HeapPage，你需要为`insertTuple()`和`deleteTuple()`等方法修改标题位图。你可能会发现，我们在实验1中要求你实现的`getNumEmptySlots()`和`isSlotUsed()`方法可以作为有用的抽象方法。请注意，有一个`markSlotUsed`方法作为抽象，用来修改页眉中元组的填充或清除状态。

Note that it is important that the `HeapFile.insertTuple()` and `HeapFile.deleteTuple()` methods access pages using the `BufferPool.getPage()` method; otherwise, your implementation of transactions in the next lab will not work properly.

注意，重要的是，`HeapFile.insertTuple()`和`HeapFile.deleteTuple()`方法要使用`BufferPool.getPage()`方法访问页面；否则，你在下一个实验的事务实现将不能正常工作。

Implement the following skeleton methods in <tt>src/simpledb/BufferPool.java</tt>:

在<tt>src/simpledb/BufferPool.java</tt>中实现以下骨架方法。

***  

* insertTuple()
* deleteTuple()

***  


These methods should call the appropriate methods in the HeapFile that belong to the table being modified (this extra level of indirection is needed to support other types of files &mdash; like indices &mdash; in the future).

这些方法应该调用HeapFile中属于被修改的表的适当方法（这个额外的间接层次是需要的，以便在未来支持其他类型的文件&mdash; 像索引&mdash; ）。

At this point, your code should pass the unit tests in HeapPageWriteTest and HeapFileWriteTest, as well as BufferPoolWriteTest.

在这一点上，你的代码应该通过HeapPageWriteTest和HeapFileWriteTest以及BufferPoolWriteTest的单元测试。

### 2.4. Insertion and deletion

Now that you have written all of the HeapFile machinery to add and remove tuples, you will implement the `Insert` and `Delete` operators.

现在你已经写好了所有用于添加和删除 tuple 的HeapFile机器，你将实现`Insert'和`Delete'操作。

For plans that implement `insert` and `delete` queries, the top-most operator is a special `Insert` or `Delete` operator that modifies the pages on disk. These operators return the number of affected tuples. This is implemented by returning a single tuple with one integer field, containing the count.

对于实现 "插入 "和 "删除 "查询的计划，最上面的运算符是一个特殊的 "插入 "或 "删除 "运算符，它修改了磁盘上的页面。这些操作符返回受影响 tuple 的数量。这是通过返回一个带有一个整数字段的单一元组来实现的，其中包含计数。


* *Insert*: This operator adds the tuples it reads from its child operator to the `tableid` specified in its constructor. It should use the `BufferPool.insertTuple()` method to do this.

*插入*。这个操作符将它从其子操作符中读取的 tuple 添加到其构造函数中指定的`tableid'。它应该使用`BufferPool.insertTuple()`方法来做这件事。

* *Delete*: This operator deletes the tuples it reads from its child operator from the `tableid` specified in its constructor. It should use the `BufferPool.deleteTuple()` method to do this.

*Delete*: 这个操作符从其构造函数中指定的`tableid'中删除它从其子操作符中读取的 tuple 。它应该使用`BufferPool.deleteTuple()`方法来做这件事。

**Exercise 4.**

Implement the skeleton methods in:

***  

* src/java/simpledb/execution/Insert.java
* src/java/simpledb/execution/Delete.java

***  

At this point, your code should pass the unit tests in InsertTest. We have not provided unit tests for `Delete`. Furthermore, you should be able to pass the InsertTest and DeleteTest system tests.

在这一点上，你的代码应该通过InsertTest的单元测试。我们没有为`Delete`提供单元测试。此外，你应该能够通过 InsertTest 和 DeleteTest 的系统测试。

### 2.5. Page eviction

In Lab 1, we did not correctly observe the limit on the maximum number of pages in the buffer pool defined by the constructor argument `numPages`. Now, you will choose a page eviction policy and instrument any previous code that reads or creates pages to implement your policy.

在实验1中，我们没有正确观察到由构造参数`numPages`定义的缓冲池中最大页数的限制。现在，你将选择一个页面驱逐策略，并对以前任何读取或创建页面的代码进行编程，以实现你的策略。

When more than <tt>numPages</tt> pages are in the buffer pool, one page should be evicted from the pool before the next is loaded. The choice of eviction policy is up to you; it is not necessary to do something sophisticated. Describe your policy in the lab writeup.

当缓冲池中的页面超过<tt>numPages</tt>时，在加载下一个页面之前，应该将一个页面从缓冲池中驱逐出去。驱逐策略的选择由你决定；没有必要做一些复杂的事情。在实验报告中描述一下你的策略。

Notice that `BufferPool` asks you to implement a `flushAllPages()` method. This is not something you would ever need in a real implementation of a buffer pool. However, we need this method for testing purposes. You should never call this method from any real code.

注意`BufferPool`要求你实现`flushAllPages()`方法。这不是你在真正实现缓冲池时需要的东西。然而，我们需要这个方法用于测试。你不应该在任何真正的代码中调用这个方法。

Because of the way we have implemented ScanTest.cacheTest, you will need to ensure that your flushPage and flushAllPages methods do no evict pages from the buffer pool to properly pass this test.

由于我们实现ScanTest.cacheTest的方式，你需要确保你的flushPage和flushAllPages方法不从缓冲池中驱逐页面，以正确通过这个测试。

flushAllPages should call flushPage on all pages in the BufferPool, and flushPage should write any dirty page to disk and mark it as not dirty, while leaving it in the BufferPool.

flushAllPages应该在BufferPool中的所有页面上调用flushPage，flushPage应该将任何脏页写入磁盘并标记为不脏，同时将其留在BufferPool中。

The only method which should remove page from the buffer pool is evictPage, which should call flushPage on any dirty page it evicts.

唯一应该从缓冲池中删除页面的方法是evictPage，它应该对它所驱逐的任何脏页面调用flushPage。

**Exercise 5.**

Fill in the `flushPage()` method and additional helper methods to implement page eviction in:

填写`flushPage()`方法和额外的辅助方法来实现页面驱逐。

***  

* src/java/simpledb/storage/BufferPool.java

***

If you did not implement `writePage()` in <tt>HeapFile.java</tt> above, you will also need to do that here. Finally, you should also implement `discardPage()` to remove a page from the buffer pool *without* flushing it to disk. We will not test `discardPage()` in this lab, but it will be necessary for future labs.

如果你没有在上面的<tt>HeapFile.java</tt>中实现`writePage()`，你也需要在这里实现它。最后，你还应该实现`discardPage()`，以便从缓冲池中删除一个页面，而不*冲到磁盘上。我们不会在本实验中测试`discardPage()`，但它在未来的实验中是必要的。

At this point, your code should pass the EvictionTest system test.

在这一点上，你的代码应该通过EvictionTest系统测试。

Since we will not be checking for any particular eviction policy, this test works by creating a BufferPool with 16 pages (NOTE: while DEFAULT_PAGES is 50, we are initializing the BufferPool with less!), scanning a file with many more than 16 pages, and seeing if the memory usage of the JVM increases by more than 5 MB. If you do not implement an eviction policy correctly, you will not evict enough pages, and will go over the size limitation, thus failing the test.

由于我们不会检查任何特定的驱逐策略，这个测试通过创建一个有16页的BufferPool（注意：虽然DEFAULT_PAGES是50，但我们初始化的BufferPool更少！），扫描一个超过16页的文件，看看JVM的内存使用率是否增加了5MB以上。如果你没有正确地实施驱逐策略，你将无法驱逐足够多的页面，并将超过大小限制，从而导致测试失败。

You have now completed this lab. Good work!

你现在已经完成了这个实验。干得好!

<a name="query_walkthrough"></a>

### 2.6. Query walkthrough

The following code implements a simple join query between two tables, each consisting of three columns of integers.  (The file `some_data_file1.dat` and `some_data_file2.dat` are binary representation of the pages from this file). This code is equivalent to the SQL statement:

下面的代码实现了两个表之间的简单连接查询，每个表由三列整数组成。 (文件`some_data_file1.dat`和`some_data_file2.dat`是这个文件的页面的二进制表示）。这段代码等同于SQL语句。

```sql
SELECT *
FROM some_data_file1,
     some_data_file2
WHERE some_data_file1.field1 = some_data_file2.field1
  AND some_data_file1.id > 1
```

For more extensive examples of query operations, you may find it helpful to browse the unit tests for joins, filters, and aggregates.

对于更多的查询操作的例子，你可能会发现浏览连接、过滤器和聚合的单元测试是有帮助的。

```java
package simpledb;

import java.io.*;

public class jointest {

    public static void main(String[] argv) {
        // construct a 3-column table schema
        Type types[] = new Type[]{Type.INT_TYPE, Type.INT_TYPE, Type.INT_TYPE};
        String names[] = new String[]{"field0", "field1", "field2"};

        TupleDesc td = new TupleDesc(types, names);

        // create the tables, associate them with the data files
        // and tell the catalog about the schema  the tables.
        HeapFile table1 = new HeapFile(new File("some_data_file1.dat"), td);
        Database.getCatalog().addTable(table1, "t1");

        HeapFile table2 = new HeapFile(new File("some_data_file2.dat"), td);
        Database.getCatalog().addTable(table2, "t2");

        // construct the query: we use two SeqScans, which spoonfeed
        // tuples via iterators into join
        TransactionId tid = new TransactionId();

        SeqScan ss1 = new SeqScan(tid, table1.getId(), "t1");
        SeqScan ss2 = new SeqScan(tid, table2.getId(), "t2");

        // create a filter for the where condition
        Filter sf1 = new Filter(
                new Predicate(0,
                        Predicate.Op.GREATER_THAN, new IntField(1)), ss1);

        JoinPredicate p = new JoinPredicate(1, Predicate.Op.EQUALS, 1);
        Join j = new Join(p, sf1, ss2);

        // and run it
        try {
            j.open();
            while (j.hasNext()) {
                Tuple tup = j.next();
                System.out.println(tup);
            }
            j.close();
            Database.getBufferPool().transactionComplete(tid);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
```

Both tables have three integer fields. To express this, we create a `TupleDesc` object and pass it an array of `Type` objects indicating field types and `String` objects indicating field names. Once we have created this `TupleDesc`, we initialize two `HeapFile` objects representing the tables. Once we have created the tables, we add them to the Catalog. (If this were a database server that was already running, we would have this catalog information loaded; we need to load this only for the purposes of this test).

两个表都有三个整数字段。为了表达这一点，我们创建了一个`TupleDesc`对象，并传递给它一个表示字段类型的`Type`对象和表示字段名的`String`对象的数组。一旦我们创建了这个`TupleDesc`，我们就初始化两个代表表的`HeapFile`对象。一旦我们创建了这些表，我们就把它们添加到目录中。(如果这是一个已经在运行的数据库服务器，我们将加载这个目录信息；我们只需要为这个测试的目的加载这个信息）。

Once we have finished initializing the database system, we create a query plan. Our plan consists of two `SeqScan` operators that scan the tuples from each file on disk, connected to a `Filter` operator on the first HeapFile, connected to a `Join` operator that joins the tuples in the tables according to the `JoinPredicate`. In general, these operators are instantiated with references to the appropriate table (in the case of SeqScan) or child operator (in the case of e.g., Join). The test program then repeatedly calls `next` on the `Join` operator, which in turn pulls tuples from its children. As tuples are output from the `Join`, they are printed out on the command line.

一旦我们完成了数据库系统的初始化，我们就创建一个查询计划。我们的计划由两个 "SeqScan "操作符组成，扫描磁盘上每个文件的 tuple ，与第一个HeapFile上的 "Filter "操作符相连，与一个 "Join "操作符相连，根据 "JoinPredicate "连接各表中的 tuple 。一般来说，这些运算符被实例化为对适当的表（在SeqScan的情况下）或子运算符（在例如Join的情况下）的引用。测试程序会重复调用 "Join "运算符的 "next"，然后从其子运算符中提取 tuple 。当 tuple 从 "Join "中输出时，它们被打印在命令行中。

<a name="parser"></a>

### 2.7. Query Parser

We've provided you with a query parser for SimpleDB that you can use to write and run SQL queries against your database once you have completed the exercises in this lab.

我们已经为你提供了SimpleDB的查询分析器，一旦你完成了本实验的练习，你可以用它来编写和运行针对你的数据库的SQL查询。

The first step is to create some data tables and a catalog. Suppose you have a file `data.txt` with the following contents:

第一步是创建一些数据表和一个目录。假设你有一个文件`data.txt`，内容如下。

```
1,10
2,20
3,30
4,40
5,50
5,50
```

You can convert this into a SimpleDB table using the `convert` command (make sure to type <tt>ant</tt> first!):

你可以使用`convert`命令将其转换为SimpleDB表（请确保先输入<tt>ant</tt>！）。

```
java -jar dist/simpledb.jar convert data.txt 2 "int,int"
```

This creates a file `data.dat`. In addition to the table's raw data, the two additional parameters specify that each record has two fields and that their types are `int` and `int`.

这将创建一个文件`data.dat`。除了表的原始数据外，两个附加参数指定每条记录有两个字段，它们的类型是`int`和`int`。

Next, create a catalog file, `catalog.txt`, with the following contents:

接下来，创建一个目录文件，`catalog.txt`，其内容如下。

```
data (f1 int, f2 int)
```

This tells SimpleDB that there is one table, `data` (stored in `data.dat`) with two integer fields named `f1` and `f2`.

这告诉SimpleDB有一个表，`data`（存储在`data.dat`中），有两个整数字段，名为`f1`和`f2`。

Finally, invoke the parser. You must run java from the command line (ant doesn't work properly with interactive targets.) From the `simpledb/` directory, type:

最后，调用解析器。你必须从命令行运行java(ant在交互式目标下不能正常工作。)从`simpledb/`目录下，输入。

```
java -jar dist/simpledb.jar parser catalog.txt
```

You should see output like:

你应该看到这样的输出。

```
Added table : data with schema INT(f1), INT(f2), 
SimpleDB> 
```

Finally, you can run a query:

最后，你可以运行一个查询。

```
SimpleDB> select d.f1, d.f2 from data d;
Started a new transaction tid = 1221852405823
 ADDING TABLE d(data) TO tableMap
     TABLE HAS  tupleDesc INT(d.f1), INT(d.f2), 
1       10
2       20
3       30
4       40
5       50
5       50

 6 rows.
----------------
0.16 seconds

SimpleDB> 
```

The parser is relatively full featured (including support for SELECTs, INSERTs, DELETEs, and transactions), but does have some problems and does not necessarily report completely informative error messages. Here are some limitations to bear in mind:

该分析器的功能相对齐全（包括对SELECTs、INSERTs、DELETEs和事务的支持），但确实存在一些问题，不一定能报告出完全有参考价值的错误信息。这里有一些需要记住的限制。

* You must preface every field name with its table name, even if the field name is unique (you can use table name aliases, as in the example above, but you cannot use the AS keyword.)

你必须在每个字段名前加上其表名，即使字段名是唯一的（你可以使用表名别名，如上面的例子，但你不能使用AS关键字）。

* Nested queries are supported in the WHERE clause, but not the FROM clause.

在WHERE子句中支持嵌套查询，但不支持FROM子句。

* No arithmetic expressions are supported (for example, you can't take the sum of two fields.)

不支持算术表达式（例如，你不能取两个字段的总和）。

* At most one GROUP BY and one aggregate column are allowed.

最多允许一个GROUP BY和一个聚合列。

* Set-oriented operators like IN, UNION, and EXCEPT are not allowed.

不允许使用面向集合的操作符，如IN、UNION和EXCEPT。

* Only AND expressions in the WHERE clause are allowed.

只允许在WHERE子句中使用AND表达。

* UPDATE expressions are not supported.

不支持UPDATE表达式。

* The string operator LIKE is allowed, but must be written out fully (that is, the Postgres tilde [~] shorthand is not allowed.)

允许使用字符串操作符LIKE，但是必须完全写出来（也就是说，不允许使用Postgres的tilde [~]短语）。