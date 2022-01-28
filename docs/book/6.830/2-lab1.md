# 6.830/6.814 Lab 1: SimpleDB

首先下载代码，然后 IDEA 打开。

git clone https://github.com/MIT-DB-Class/simple-db-hw-2021

接下来阅读 lab1.md


### 1.3. Implementation hints

****

* Implement the classes to manage tuples, namely Tuple, TupleDesc. We have already implemented Field, IntField,
  StringField, and Type for you. Since you only need to support integer and (fixed length) string fields and fixed
  length tuples, these are straightforward.

* 实现管理图元的类，即Tuple、TupleDesc。 我们已经实现了Field、IntField。
  StringField，和Type给你。因为你只需要支持整数和（固定长度的）字符串字段以及固定长度的图元。
  长度的图元，这些都是直接的。

* Implement the Catalog (this should be very simple).

* 实施目录（这应该非常简单）。

* Implement the BufferPool constructor and the getPage() method.

* 实现BufferPool构造函数和getPage()方法。

* Implement the access methods, HeapPage and HeapFile and associated ID classes. A good portion of these files has already been written for you.

* 实现访问方法，HeapPage和HeapFile以及相关的ID类。这些文件的很大一部分已经为你写好了。

* Implement the operator SeqScan.

* 实现运算符SeqScan。

* At this point, you should be able to pass the ScanTest system test, which is the goal for this lab.

* 在这一点上，你应该能够通过ScanTest系统测试，这是本实验的目标。

***

You do not need to support these features in this lab, but you should keep these parameters in the interfaces of your code because you will be implementing transactions and locking in a future lab. 

你不需要在本实验中支持这些功能，但你应该在你的代码的接口中保留这些参数，因为你将在未来的实验中实现事务和锁定。

The test code we have provided you with generates a fake transaction ID that is passed into the operators of the query it runs; you should pass this transaction ID into other operators and the buffer pool.

我们提供给你的测试代码产生了一个假的交易ID，这个交易ID被传递到它所运行的查询的操作者中；你应该把这个交易ID传递到其他操作者和缓冲池中。

## 2. SimpleDB Architecture and Implementation Guide SimpleDB架构和实施指南

SimpleDB consists of:

SimpleDB由以下部分组成。

* Classes that represent fields, tuples, and tuple schemas;

代表字段、图元和图元模式的类。

* Classes that apply predicates and conditions to tuples;

对图元应用谓词和条件的类。

* One or more access methods (e.g., heap files) that store relations on disk and provide a way to iterate through tuples of those relations;

一个或多个访问方法（例如，堆文件），将关系存储在磁盘上，并提供一种方法来迭代这些关系的图元。

* A collection of operator classes (e.g., select, join, insert, delete, etc.) that process tuples;

处理图元的运算符类（例如，选择、连接、插入、删除等）的集合。

* A buffer pool that caches active tuples and pages in memory and handles concurrency control and transactions (neither of which you need to worry about for this lab); and,

一个缓冲池，在内存中缓存活跃的图元和页面，并处理并发控制和事务（在这个实验室中，你不需要担心这两个问题）；以及。

* A catalog that stores information about available tables and their schemas.

一个存储有关可用表及其模式信息的目录。

SimpleDB does not include many things that you may think of as being a part of a "database."  In particular, SimpleDB does not have:

SimpleDB不包括许多你可能认为是 "数据库 "一部分的东西。 特别是，SimpleDB没有。

* (In this lab), a SQL front end or parser that allows you to type queries directly into SimpleDB. Instead, queries are built up by chaining a set of operators together into a hand-built query plan (see [Section 2.7](#query_walkthrough)). We will provide a simple parser for use in later labs.

*（在本实验室中），一个SQL前端或分析器，允许你直接向SimpleDB输入查询。取而代之的是，查询是通过将一组运算符串联到一个手工建立的查询计划中来建立的（见[2.7节](#query_walkthrough)）。我们将在后面的实验中提供一个简单的解析器供使用。

* Views. 

视图

* Data types except integers and fixed length strings.

数据类型，除了整数和固定长度的字符串。

* (In this lab) Query optimizer.

（在本实验中）查询优化器。

* (In this lab) Indices.

<p>

In the rest of this Section, we describe each of the main components of SimpleDB that you will need to implement in this lab. 

在本节的其余部分，我们将描述你在本实验中需要实现的SimpleDB的每个主要组件。

You should use the exercises in this discussion to guide your implementation. 

你应该使用本讨论中的练习来指导你的实施。

This document is by no means a complete specification for SimpleDB; you will need to make decisions about how to design and implement various parts of the system. 

本文档绝不是SimpleDB的完整规范；你需要对如何设计和实现系统的各个部分做出决定。

Note that for Lab 1 you do not need to implement any operators (e.g., select, join, project) except sequential scan. 

注意，对于实验1，你不需要实现任何运算符（如选择、连接、项目），除了顺序扫描。

You will add support for additional operators in future labs.

你将在未来的实验室中增加对其他 operators 的支持。

<p>

### 2.1. The Database Class 

The Database class provides access to a collection of static objects that are the global state of the database. 

数据库类提供了对静态对象集合的访问，这些对象是数据库的全局状态。

In particular, this includes methods to access the catalog (the list of all the tables in the database), the buffer pool ( the collection of database file pages that are currently resident in memory), and the log file. 

特别是，这包括访问目录（数据库中所有表的列表）、缓冲池（当前常驻内存的数据库文件页的集合）和日志文件的方法。

You will not need to worry about the log file in this lab. 

在本实验中，你不需要担心日志文件的问题。

We have implemented the Database class for you. You should take a look at this file as you will need to access these objects.

我们已经为你实现了数据库类。你应该看一下这个文件，因为你将需要访问这些对象。

### 2.2. Fields and Tuples

Tuples in SimpleDB are quite basic.  They consist of a collection of `Field` objects, one per field in the `Tuple`. `Field` is an interface that different data types (e.g., integer, string) implement.  `Tuple` objects are created by the underlying access methods (e.g., heap files, or B-trees), as described in the next section.  Tuples also have a type (or schema), called a _tuple descriptor_, represented by a `TupleDesc` object.  This object consists of a collection of `Type` objects, one per field in the tuple, each of which describes the type of the corresponding field.

SimpleDB 中的元组是非常基本的。 它们由一个 "字段" 对象的集合组成，在 "元组" 中每个字段一个。`Field`是一个接口，不同的数据类型（例如，整数，字符串）都可以实现。`Tuple` 对象是由底层访问方法（例如，堆文件，或B-树）创建的，如下一节所述。 元组也有一个类型（或模式），称为_元组描述符_，由`TupleDesc`对象表示。 这个对象由 "类型 "对象的集合组成，元组中的每个字段都有一个，每个对象都描述了相应字段的类型。

### Exercise 1

实现这两个类并通过单元测试 TupleTest 和 TupleDescTest 。

* src/java/simpledb/storage/TupleDesc.java
* src/java/simpledb/storage/Tuple.java

At this point, modifyRecordId() should fail because you havn't implemented it yet.

在这一点上，modifyRecordId() 应该失败，因为你还没有实现它。

TupleDesc 这个类主要

运行 TupleDescTest 通过测试：

![](image/2-lab1/1643378188499.png)

TupleTest

### 2.3. Catalog

The catalog (class `Catalog` in SimpleDB) consists of a list of the tables and schemas of the tables that are currently in the database. 

catalog（SimpleDB中的 "Catalog "类）由当前数据库中的表和表的模式的列表组成。

You will need to support the ability to add a new table, as well as getting information about a particular table. 

你需要支持添加新表的能力，以及获取某个特定表的信息。

Associated with each table is a `TupleDesc` object that allows operators to determine the types and number of fields in a table.

与每个表相关的是一个`TupleDesc`对象，它允许操作者确定一个表的字段类型和数量。

The global catalog is a single instance of `Catalog` that is allocated for the entire SimpleDB process. 

全局目录是一个单一的`Catalog`实例，为整个SimpleDB进程分配。

The global catalog can be retrieved via the method `Database.getCatalog()`, and the same goes for the global buffer pool (using `Database.getBufferPool()`).

全局目录可以通过`Database.getCatalog()`方法检索，全局缓冲池也是如此（使用`Database.getBufferPool()`）。

### Exercise 2

**Implement the skeleton methods in:**
***

* src/java/simpledb/common/Catalog.java

*** 

At this point, your code should pass the unit tests in CatalogTest.

在这一点上，你的代码应该通过CatalogTest的单元测试。

### 2.4. BufferPool

The buffer pool (class `BufferPool` in SimpleDB) is responsible for caching pages in memory that have been recently read from disk. 

缓冲池（SimpleDB中的`BufferPool'类）负责在内存中缓存最近从磁盘读取的页面。

All operators read and write pages from various files on disk through the buffer pool. 

所有操作者通过缓冲池从磁盘上的各种文件读写页面。

It consists of a fixed number of pages, defined by the `numPages` parameter to the `BufferPool` constructor. 

它由固定数量的页面组成，由 "BufferPool "构造函数的 "numPages "参数定义。

In later labs, you will implement an eviction policy. For this lab, you only need to implement the constructor and the `BufferPool.getPage()` method used by the SeqScan operator. 

在后面的实验中，你将实现一个驱逐策略。对于这个实验室，你只需要实现构造函数和SeqScan操作者使用的`BufferPool.getPage()`方法。

The BufferPool should store up to `numPages` pages. 

缓冲池应该最多存储`numPages`页。

For this lab, if more than `numPages` requests are made for different pages, then instead of implementing an eviction policy, you may throw a DbException. 

对于这个实验室，如果对不同的页面提出了超过`numPages`的请求，那么你可以抛出一个DbException，而不是实施驱逐策略。

In future labs you will be required to implement an eviction policy.

在未来的实验中，你将被要求执行驱逐政策。

The `Database` class provides a static method, `Database.getBufferPool()`, that returns a reference to the single BufferPool instance for the entire SimpleDB process.

数据库 "类提供了一个静态方法，"Database.getBufferPool()"，用于返回整个SimpleDB进程的单个BufferPool实例的引用。

### Exercise 3

**Implement the `getPage()` method in:**

***

* src/java/simpledb/storage/BufferPool.java

***

We have not provided unit tests for BufferPool. The functionality you implemented will be tested in the implementation of HeapFile below. 

我们没有为 BufferPool 提供单元测试。你实现的功能将在下面的 HeapFile 的实现中被测试。

You should use the `DbFile.readPage` method to access pages of a DbFile.

你应该使用`DbFile.readPage`方法来访问一个DbFile的页面。

When more than this many pages are in the buffer pool, one page should be evicted from the pool before the next is loaded.  The choice of eviction policy is up to you; it is not necessary to do something sophisticated.

当缓冲池中的页面超过这个数量时，在加载下一个页面之前，应该将一个页面从缓冲池中驱逐出去。 驱逐策略的选择由你决定；没有必要做一些复杂的事情。

Notice that `BufferPool` asks you to implement a `flush_all_pages()` method.  This is not something you would ever need in a real implementation of a buffer pool.  However, we need this method for testing purposes.  You really should never call this method from anywhere in your code.

注意`BufferPool`要求你实现`flush_all_pages()`方法。 这不是你在真正实现缓冲池时需要的东西。然而，我们需要这个方法用于测试。 你真的不应该在你的代码中的任何地方调用这个方法。

### 2.5. HeapFile access method

Access methods provide a way to read or write data from disk that is arranged in a specific way. 

访问方法提供了一种从磁盘上读取或写入以特定方式排列的数据的方法。

Common access methods include heap files (unsorted files of tuples) and B-trees; for this assignment, you will only implement a heap file access method, and we have written some of the code for you.

常见的访问方法包括堆文件（未经排序的图元文件）和B-树；对于这项作业，你将只实现一个堆文件访问方法，我们已经为你写了一些代码。

A `HeapFile` object is arranged into a set of pages, each of which consists of a fixed number of bytes for storing tuples, (defined by the constant `BufferPool.DEFAULT_PAGE_SIZE`), including a header. 

一个 `HeapFile` 对象被安排成一组页面，每个页面由固定数量的字节组成，用于存储图元，（由常数`BufferPool.DEFAULT_PAGE_SIZE'定义），包括一个头。

In SimpleDB, there is one `HeapFile` object for each table in the database. 

在SimpleDB中，数据库中的每个表都有一个`HeapFile`对象。

Each page in a `HeapFile` is arranged as a set of slots, each of which can hold one tuple (tuples for a given table in SimpleDB are all of the same size). 

`HeapFile`中的每一页都被安排为一组槽，每个槽可以容纳一个元组（SimpleDB中给定表的元组都是相同大小的）。

In addition to these slots, each page has a header that consists of a bitmap with one bit per tuple slot. 

除了这些槽之外，每个页面都有一个头，由一个位图组成，每个元组槽有一个位。

If the bit corresponding to a particular tuple is 1, it indicates that the tuple is valid; if it is 0, the tuple is invalid (e.g., has been deleted or was never initialized.)  

如果对应于某一元组的位是1，表明该元组是有效的；如果是0，该元组是无效的（例如，已经被删除或从未被初始化）。 

Pages of `HeapFile` objects are of type `HeapPage` which implements the `Page` interface. Pages are stored in the buffer pool but are read and written by the `HeapFile` class.

HeapFile "对象的页是 "HeapPage "类型，实现了 "Page "接口。页面被存储在缓冲池中，但由`HeapFile`类来读写。

SimpleDB stores heap files on disk in more or less the same format they are stored in memory. 

SimpleDB在磁盘上存储堆文件的格式或多或少与它们在内存中的存储格式相同。

Each file consists of page data arranged consecutively on disk. Each page consists of one or more bytes representing the header, followed by the _page size_ bytes of actual page content. Each tuple requires _tuple size_ * 8 bits for its content and 1 bit for the
header. Thus, the number of tuples that can fit in a single page is:

每个文件由磁盘上连续排列的页面数据组成。每个页面由一个或多个代表页头的字节组成，然后是实际页面内容的_page size_字节。每个元组的内容需要_元组大小_ * 8位，头需要1位。
头部。因此，一个页面中可以容纳的图元数量是。

`_tuples per page_ = floor((_page size_ * 8) / (_tuple size_ * 8 + 1)) `

Where _tuple size_ is the size of a tuple in the page in bytes. The idea here is that each tuple requires one additional bit of storage in the header. 

其中_tuple size_是页面中一个元组的大小，单位是字节。这里的想法是，每个元组需要在页眉处增加一个存储位。

We compute the number of bits in a page (by mulitplying page size by 8), and divide this quantity by the number of bits in a tuple (including this extra header bit) to get the number of tuples per page. 

我们计算一个页面的位数（通过将页面大小乘以8），然后用这个数量除以一个元组的位数（包括这个额外的头位），得到每页的元组数量。

The floor operation rounds down to the nearest integer number of tuples (we don't want to store partial tuples on a page!)

楼面操作将图元数向下舍入到最接近的整数（我们不想在页面上存储部分图元！）。

Once we know the number of tuples per page, the number of bytes required to store the header is simply:

一旦我们知道了每页的图元数，存储页眉所需的字节数就简单了。

`
headerBytes = ceiling(tupsPerPage/8)
`

The ceiling operation rounds up to the nearest integer number of bytes (we never store less than a full byte of header information.)

上限操作四舍五入到最接近的整数字节（我们永远不会存储少于一个完整字节的头信息）。

The low (least significant) bits of each byte represents the status of the slots that are earlier in the file. 

每个字节的低位（最小有效位）代表文件中较早的槽位的状态。

Hence, the lowest bit of the first byte represents whether or not the first slot in the page is in use. 

因此，第一个字节的最低位代表页面中的第一个插槽是否正在使用。

The second lowest bit of the first byte represents whether or not the second slot in the page is in use, and so on. 

第一个字节的第二个最低位代表页面中的第二个插槽是否正在使用，以此类推。

Also, note that the high-order bits of the last byte may not correspond to a slot that is actually in the file, since the number of slots may not be a multiple of 8. Also note that all Java virtual machines are [big-endian](http://en.wikipedia.org/wiki/Endianness).

另外，请注意，最后一个字节的高阶位可能不对应于文件中实际存在的槽，因为槽的数量可能不是8的倍数。还请注意，所有Java虚拟机都是[big-endian](http://en.wikipedia.org/wiki/Endianness)。

### Exercise 4

**Implement the skeleton methods in:**
***

* src/java/simpledb/storage/HeapPageId.java
* src/java/simpledb/storage/RecordId.java
* src/java/simpledb/storage/HeapPage.java

***


Although you will not use them directly in Lab 1, we ask you to implement <tt>getNumEmptySlots()</tt> and <tt>
isSlotUsed()</tt> in HeapPage. These require pushing around bits in the page header. You may find it helpful to look at
the other methods that have been provided in HeapPage or in <tt>src/simpledb/HeapFileEncoder.java</tt> to understand the
layout of pages.

You will also need to implement an Iterator over the tuples in the page, which may involve an auxiliary class or data
structure.

At this point, your code should pass the unit tests in HeapPageIdTest, RecordIDTest, and HeapPageReadTest.


<p> 

After you have implemented <tt>HeapPage</tt>, you will write methods for <tt>HeapFile</tt> in this lab to calculate the
number of pages in a file and to read a page from the file. You will then be able to fetch tuples from a file stored on
disk.

### Exercise 5

**Implement the skeleton methods in:**

***

* src/java/simpledb/storage/HeapFile.java

*** 

To read a page from disk, you will first need to calculate the correct offset in the file. Hint: you will need random
access to the file in order to read and write pages at arbitrary offsets. You should not call BufferPool methods when
reading a page from disk.

<p> 
You will also need to implement the `HeapFile.iterator()` method, which should iterate through through the tuples of each page in the HeapFile. The iterator must use the `BufferPool.getPage()` method to access pages in the `HeapFile`. This method loads the page into the buffer pool and will eventually be used (in a later lab) to implement locking-based concurrency control and recovery.  Do not load the entire table into memory on the open() call -- this will cause an out of memory error for very large tables.

<p>

At this point, your code should pass the unit tests in HeapFileReadTest.

### 2.6. Operators

Operators are responsible for the actual execution of the query plan. They implement the operations of the relational
algebra. In SimpleDB, operators are iterator based; each operator implements the `DbIterator` interface.

<p>

Operators are connected together into a plan by passing lower-level operators into the constructors of higher-level
operators, i.e., by 'chaining them together.' Special access method operators at the leaves of the plan are responsible
for reading data from the disk (and hence do not have any operators below them).

<p>

At the top of the plan, the program interacting with SimpleDB simply calls `getNext` on the root operator; this operator
then calls `getNext` on its children, and so on, until these leaf operators are called. They fetch tuples from disk and
pass them up the tree (as return arguments to `getNext`); tuples propagate up the plan in this way until they are output
at the root or combined or rejected by another operator in the plan.

<p>

<!--
For plans that implement `INSERT` and `DELETE` queries,
the top-most operator is a special `Insert` or `Delete`
operator that modifies the pages on disk.  These operators return a tuple
containing the count of the number of affected tuples to the user-level
program.

<p>
-->

For this lab, you will only need to implement one SimpleDB operator.

### Exercise 6.

**Implement the skeleton methods in:**

***

* src/java/simpledb/execution/SeqScan.java

***
This operator sequentially scans all of the tuples from the pages of the table specified by the `tableid` in the
constructor. This operator should access tuples through the `DbFile.iterator()` method.

<p>At this point, you should be able to complete the ScanTest system test. Good work!

You will fill in other operators in subsequent labs.

<a name="query_walkthrough"></a>

### 2.7. A simple query

The purpose of this section is to illustrate how these various components are connected together to process a simple
query.

Suppose you have a data file, "some_data_file.txt", with the following contents:

```
1,1,1
2,2,2 
3,4,4
```

<p>
You can convert this into a binary file that SimpleDB can query as follows:
<p>
```java -jar dist/simpledb.jar convert some_data_file.txt 3```
<p>
Here, the argument "3" tells conver that the input has 3 columns.
<p>
The following code implements a simple selection query over this file. This code is equivalent to the SQL statement `SELECT * FROM some_data_file`.

```
package simpledb;
import java.io.*;

public class test {

    public static void main(String[] argv) {

        // construct a 3-column table schema
        Type types[] = new Type[]{ Type.INT_TYPE, Type.INT_TYPE, Type.INT_TYPE };
        String names[] = new String[]{ "field0", "field1", "field2" };
        TupleDesc descriptor = new TupleDesc(types, names);

        // create the table, associate it with some_data_file.dat
        // and tell the catalog about the schema of this table.
        HeapFile table1 = new HeapFile(new File("some_data_file.dat"), descriptor);
        Database.getCatalog().addTable(table1, "test");

        // construct the query: we use a simple SeqScan, which spoonfeeds
        // tuples via its iterator.
        TransactionId tid = new TransactionId();
        SeqScan f = new SeqScan(tid, table1.getId());

        try {
            // and run it
            f.open();
            while (f.hasNext()) {
                Tuple tup = f.next();
                System.out.println(tup);
            }
            f.close();
            Database.getBufferPool().transactionComplete(tid);
        } catch (Exception e) {
            System.out.println ("Exception : " + e);
        }
    }

}
```

The table we create has three integer fields. To express this, we create a `TupleDesc` object and pass it an array
of `Type` objects, and optionally an array of `String` field names. Once we have created this `TupleDesc`, we initialize
a `HeapFile` object representing the table stored in `some_data_file.dat`. Once we have created the table, we add it to
the catalog. If this were a database server that was already running, we would have this catalog information loaded. We
need to load it explicitly to make this code self-contained.

Once we have finished initializing the database system, we create a query plan. Our plan consists only of the `SeqScan`
operator that scans the tuples from disk. In general, these operators are instantiated with references to the
appropriate table (in the case of `SeqScan`) or child operator (in the case of e.g. Filter). The test program then
repeatedly calls `hasNext` and `next` on the `SeqScan` operator. As tuples are output from the `SeqScan`, they are
printed out on the command line.

We **strongly recommend** you try this out as a fun end-to-end test that will help you get experience writing your own
test programs for simpledb. You should create the file "test.java" in the src/java/simpledb directory with the code above, 
and you should add some "import" statement above the code, 
and place the `some_data_file.dat` file in the top level directory. Then run:

```
ant
java -classpath dist/simpledb.jar simpledb.test
```

Note that `ant` compiles `test.java` and generates a new jarfile that contains it.

## 3. Logistics

You must submit your code (see below) as well as a short (2 pages, maximum) writeup describing your approach. This
writeup should:

* Describe any design decisions you made. These may be minimal for Lab 1.
* Discuss and justify any changes you made to the API.
* Describe any missing or incomplete elements of your code.
* Describe how long you spent on the lab, and whether there was anything you found particularly difficult or confusing.

### 3.1. Collaboration

This lab should be manageable for a single person, but if you prefer to work with a partner, this is also OK. Larger
groups are not allowed. Please indicate clearly who you worked with, if anyone, on your individual writeup.

### 3.2. Submitting your assignment

<!--
To submit your code, please create a <tt>6.830-lab1.tar.gz</tt> tarball (such
that, untarred, it creates a <tt>6.830-lab1/src/simpledb</tt> directory with
your code) and submit it on the [6.830 Stellar Site](https://stellar.mit.edu/S/course/6/sp13/6.830/index.html). You can use the `ant handin` target to generate the tarball.
-->

We will be using gradescope to autograde all programming assignments. You should have all been invited to the
class instance; if not, please check piazza for an invite code. If you are still having trouble, let us know and we can
help you set up. You may submit your code multiple times before the deadline; we will use the latest version as 
determined by gradescope. Place the write-up in a file called lab1-writeup.txt with your submission. 
You also need to explicitly add any other files you create, such as new *.java files.

The easiest way to submit to gradescope is with `.zip` files containing your code. On Linux/MacOS, you can
do so by running the following command:

```bash
$ zip -r submission.zip src/ lab1-writeup.txt
```

### 3.3. Submitting a bug

Please submit (friendly!) bug reports to [6.830-staff@mit.edu](mailto:6.830-staff@mit.edu). When you do, please try to
include:

* A description of the bug.
* A .java file we can drop in the test/simpledb directory, compile, and run.
* A .txt file with the data that reproduces the bug. We should be able to convert it to a .dat file using
  HeapFileEncoder.

If you are the first person to report a particular bug in the code, we will give you a candy bar!

<!--The latest bug reports/fixes can be found [here](bugs.html).-->

<a name="grading"></a>

### 3.4 Grading

<p>75% of your grade will be based on whether or not your code passes the system test suite we will run over it. These tests will be a superset of the tests we have provided. Before handing in your code, you should make sure it produces no errors (passes all of the tests) from both  <tt>ant test</tt> and <tt>ant systemtest</tt>.

**Important:** before testing, gradescope will replace your <tt>build.xml</tt> and the entire contents of the <tt>test</tt>
directory with our version of these files. This means you cannot change the format of <tt>.dat</tt> files!  You should
also be careful changing our APIs. You should test that your code compiles the unmodified tests.

You should get immediate feedback and error outputs for failed tests (if any) from gradescope after
submission. The score given will be your grade for the autograded portion of the assignment. An additional 25% of your
grade will be based on the quality of your writeup and our subjective evaluation of your code. This part
will also be published on gradescope after we finish grading your assignment.

We had a lot of fun designing this assignment, and we hope you enjoy hacking on it!
