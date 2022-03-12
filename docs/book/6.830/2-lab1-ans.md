# Lab 1: SimpleDB

直接 IDEA 打开，等待加载。快速扫一遍搞清楚怎么测试，如何验证代码正确就行。

我没有安装 ant ，用 IDEA 打开后就自动加载进来了。

![](image/2-lab1/1647090442719.png)

## Exercise 1

实现下面的两个方法并通过单元测试 TupleTest 和 TupleDescTest 。

* src/java/simpledb/storage/TupleDesc.java
* src/java/simpledb/storage/Tuple.java

一个 Tuple 对象表示一行数据，一个 TupleDesc 对象表示数据的表头。

TupleDesc 表示表头，其中有一个 TDItem 队列，而 TDItem 表示一个属性，其中有 fieldType 和 fieldName 两个字段。例如学生的姓名属性，其中 fieldName 就是姓名，因为姓名是字符串而 fieldType 就是字符串。

接下来研究 fieldType，这是一个 Type 对象，点进去后发现分为 INT_TYPE 和 STRING_TYPE 类型。

Field 是一个接口，实现了 String 和 Int 。


## Exercise 2

实现 `common/Catalog.java` 并通过 CatalogTest .

接下来研究 Catalog 类，其中实现了一个 Table 内部类，这个类维护了多张表。Catalog 存了一堆表，目前是通过程序来填充表，最终将会实现从磁盘中读取表的功能。

看明白测试再写 `Catalog.java` 。写一个 Table 类（类似 TDItem），内部包含 file，name，pkeyField 三个字段，用容器来存 Table 。

Table 表示一张表，其中有三个属性，分别是 file，name 和 pkeyField 。其中 pkeyField 表示主键，name 表示表的名字，而 file 则是一个 DbFile 对象。

然后用 HashMap 来存，其中 `key: file.getId()`，`value:Table`。接下来实现几个方法就行了。

注意重名的处理，如果有就删除再添加。

接下来研究 DbFile ，这是一个接口，可由 HeapFile 和 B+ 树实现。目前是 HeapFile，其中存了一堆 Tuple 。

接下来研究 HeapFile 的结构。

## Exercise 3

实现文件中的 getPage() 方法:

* src/java/simpledb/storage/BufferPool.java

用 ConcurrentHashMap （HashMap 存在并发问题，不过本地测试没有体现）来存 page，其中 key 和 value 分别是 PageId 和 Page 。

`getPage()` 首先根据 pid 判断是否已经缓存，如果没有缓存再调用 Database.getCatalog() 方法去 Catalog 中加载。加载后依旧缓存一下。

DbFile 接口实现了和磁盘读写之间的读写 page ，插入删除 tuple 等功能。

一个 DbFile 中存了一个 table ，数据库中的 Table 和 DbFile 是对应。

HeapFile 是 DbFile 的一种实现。除此之外还有 B-trees 实现，此处仅需由 heap file 提供即可。

一个 HeapFile 中存了一个 Page 集合，HeapPage 是 Page 的一种实现，其中每一个 page 都存有固定数量(BufferPool.DEFAULT_PAGE_SIZE) 的 tuple 。

HeapFile 中的每一页(page)都有一组槽(slot)，每一个 slot 中“嵌入”一个 tuple 。此外，每一个 page 除了 slot 之外还有 head 部分，head 部分用来存 page 中的 slot 是否被使用。

数据库中的 block 对应此处的 HeapFile，而在内存中数据以 Page 为单位。

## Exercise 4

实现 `storage/HeapPageId.java`,`storage/RecordId.java` 和 `storage/HeapPage.java` 三个类并通过 HeapPageIdTest、RecordIDTest 和 HeapPageReadTest 的单元测试。

照着测试类可以很轻松的把前两个解决，第三个需要仔细研究文档。

HeapFile 中存了一组 Page ，而 Page 中存 tuple 。在数据库中一张 table 对应一个 Heap File 。 

接下来研究 HeapFile 的文件结构。在 HeapFile 分为 head 和 slot 两部分，slot 对应一个 tuple ，注意此处的 tuple 长度相同。而 head 则是 bitmap ，用于表示 slot 是否被使用，0 表示没有被用， 1 表示已经被使用了。

`_tuples per page_ = floor((_page size_ * 8) / (_tuple size_ * 8 + 1)) `

其中 `_page size_ * 8` 表示一页需要多少二进制位，`_tuple size_ * 8 + 1` 表示一个 tuple 占多少二进制位。除此之外，一个 tuple 存在与否也占一个二进制位，所以加一。二者做除法就是一页上可以存放多少 tuple 。

根据页面的 tuple 数字可以确定 bitmap 的个数。`headerBytes = ceiling(tupsPerPage/8)`

接下来就可以实现 `getNumTuples()` `getHeaderSize()` 这两个方法了。注意迭代器中需要过滤，将 null 消除。

## Exercise 5

实现下面类中的方法。

src/java/simpledb/storage/HeapPageId.java
src/java/simpledb/storage/RecordId.java
src/java/simpledb/storage/HeapPage.java

实现 `storage/HeapFile.java` 这个类其中 `readPage()` 实现有些复杂。

从磁盘上读取一个页面。大致思路如下：首先确定偏移值（页数乘单页大小），然后初始化一张空 page ，最后根据偏移值将空 page 填满。 最后跑通 HeapFileReadTest 这个类。

## Exercise 6.

实现 `execution/SeqScan.java` 并通过 `systemtest/ScanTest.java` 。

BufferPool 需要支持缓存。

## A simple query

总结：Catalog 中有多个 table，一个 table 对应一个 DbFile ，HeapFile 中存了多个 Page，一个 Page 中有一个 head 和多个 slot ，一个 slot 存一个 tuple。

HeapFile 是 DbFile 的一种实现方式，除此之外还有 BTreeFile 。

执行一个简单的查询将各个部分连接到一起。创建一个文件 (some_data_file.txt) 内容如下：

  1,1,1
  2,2,2 
  3,4,4

编译 `dist/simpledb.jar` 如下图：

![](image/index/1643904391084.png)

其中 `java -jar dist/simpledb.jar convert some_data_file.txt 3` 3 表示输入的数据有三列。键入该命令后生成 `some_data_file.dat` 文件。

接下来研究 `test` 中的代码。

首先创建一个 3 列的 TupleDesc 对象，然后读取 `some_data_file.dat` 生成 HeapFile 对象也就是 Table 。然后将 Table 加入到 Catalog 中。

完成数据库系统的初始化后，接下来创建一个查询计划。该计划由`SeqScan`操作符组成，从磁盘上扫描 tuple 然后在命令行中输出。