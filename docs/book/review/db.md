# 数据库


## 1. 什么是事务？
- 事务：满足 ACID 的一系列操作，要么全部成功，要么全部失败
- 事务是逻辑上的一组操作，要么都执行，要么都不执行。

## 2. ACID 是什么？
- A 是指**原子性**（`Atomicity`）表示事务的最小执行单位，指一个事务要么都完成要么什么都不做。
- C 是指**一致性**（`Consistency`） ，执行前后，数据需要保持一致，例如转账前后无论成功与否，金额的总数不变。
- I 是指隔离性（Isolation）并发访问数据库时，用户的事务不被其他事务所干扰。
- D 是指持久性(Durability）执行完毕后数据永久的写入磁盘，发生故障后也不受影响。
- 只有保证了 AID，才能进而实现 C 。原子性，隔离性和持久性是数据库的属性，而一致性（在 ACID 意义上）是应用程序的属性。应用可能依赖数据库的原子性和隔离属性来实现一致性，但这并不仅取决于数据库。因此，字母 C 不属于 ACID 。虽然要满足 ACID 才算事务，但是大多数都不满足，所以 ACID 可以理解为衡量事务的四个维度。
- 如何实现事务的原子性？
  - 执行到中间态时终止的话，需要把之前做的工作都撤销，回到之前的状态。

## 3. 并发事务可能导致的问题？
- 脏读：
	- 现象：脏读是指一个事务读取另一个未提交事务所修改的数据。
	- 原因：因为事务还未提交，所以又可能产生回滚，进而导致别的事务读取的是新数据，而该数据因为回滚导致丢失。
- 丢失修改（Lost to modify）
	- 现象：多个事务同时对同一数据进行修改，最后只有一个事务的修改被提交，其他事务的修改都被丢弃。这种情况就是丢失修改。
	- 原因：简而言之，两个事务的**起点**一样导致其中一个事务的修改被覆盖，需要加锁保证起点不一样。
- 不可重复读
	- 现象：指在一个事务内多次读同一数据返回的结果不一样。
	- 原因：当一个事务在读取某一行数据时，另一个事务修改了这一行数据，并提交了修改，那么当前事务再次读取这一行数据时，就会返回修改后的结果。
- 幻读
	-  现象：幻读是指在事务中多次读取同一数据集时得到的结果不一致。
	- 原因：这是由于其他事务在读取期间插入或删除了行，导致了数据的不一致。

## 4. 不可重复读和幻读有什么区别？
- 不可重复读是指在同一个事务中，多次读取同一数据时，返回的结果可能不一样。
- 幻读是指在同一个事务中，一次查询中新增、删除或修改的行对另一个查询中无影响。
- 因此，不可重复读是指在同一个事务中，多次读取同一数据时，可能会出现不一致的情况；幻读是指在同一个事务中，一次查询操作会对另一个查询造成影响。


## 5. MySQL 中的四种事务隔离级别？
- 读未提交（READ UNCOMMITTED）：此级别允许脏读，意味着一个事务可以读取另一个事务未提交的修改。
- 读已提交（READ COMMITTED）：此级别可以防止脏读，但仍然允许不可重复读和幻读。
- 可重复读（REPEATABLE READ）：此级别防止脏读和不可重复读，但仍然允许幻读。
- 串行化（SERIALIZABLE）：此级别防止脏读、不可重复读和幻读。
需要注意的是，随着事务隔离级别的提高，性能也会相应降低。因此，在选择事务隔离级别时，应根据应用程序的需要来平衡性能和数据一致性。

## 6. MySQL 的隔离级别是基于锁实现的吗？
- MySQL 的隔离级别基于锁和 MVCC 机制共同实现的。
- 串行化是基于锁实现的，其他隔离级别是基于 MVCC 实现的。
- 此外在可重复读情况下需要加锁读来保证不会出现幻读。


## 7. MySQL 锁 
- MyISAM 仅支持表锁，优点是编程实现简单，但是性能差。
- InnoDB 支持表锁和行锁，对于并发操作而言性能高。但是 InnoDB 的行锁针对的是加索引的字段，若使用在没有加索引的字段上会导致行锁失效退化为表锁使得效率变差！

## 8. 什么是共享锁，排他锁？
- 共享锁：也称读锁，允许多个事务同时读取数据。
- 排他锁：也称写锁，只允许一个事务进行写入，不允许多个事务同时获取。
- 排他锁和其他锁都不兼容，共享锁仅和共享锁兼容。

## 9. 什么是意向锁？
- 意向锁用来判断是否可以对某个表使用表锁。
- 意向锁分为意向共享锁和意向排他锁。
- 事务有意向对表中的某些记录加共享锁（S 锁），加共享锁前必须先取得该表的 IS 锁。
- 事务有意向对表中的某些记录加排他锁（X 锁），加排他锁之前必须先取得该表的 IX 锁。
- 意向锁是有数据引擎自己维护的，用户无法手动操作意向锁，在为数据行加共享 / 排他锁之前，InooDB 会先获取该数据行所在在数据表的对应意向锁。
- 意向锁之间是互相兼容的。意向锁和共享锁和排它锁互斥（这里指的是表级别的共享锁和排他锁，意向锁不会与行级的共享锁和排他锁互斥）。

## 10. InnoDB 有哪几类行锁？
-   **记录锁（Record Lock）** ：为单个行记录上锁。
	- 记录锁可以用于防止脏读或不可重复读。脏读是指当事务读取数据时，其他事务已经对数据进行了修改但还没有提交，导致事务读取到的数据不一致的情况。不可重复读是指当事务读取数据两次时，其他事务对数据进行了修改，导致事务读取的两次数据不一致的情况。记录锁可以在事务读取数据时锁定特定记录，以防止脏读或不可重复读的发生。
	- 例如，假设有一个数据库表，其中包含以下记录：(1, 100) (2, 200) (3, 300) (4, 400) (5, 500)
	- 假设事务A正在读取记录(2, 200)的值，并且在事务A读取这条记录的过程中，事务B修改了记录(2, 200)的值为250。如果事务A不使用记录锁，则事务A可能会读取到(2, 200)和(2, 250)两条记录，这就是一个脏读或不可重复读。
	- 但是，如果事务A在读取记录时使用记录锁，则它会锁定记录(2, 200)，从而防止事务B对记录进行修改。这样，事务A就可以正确地读取(2, 200)这条记录，而不会受到脏读或不可
-   **间隙锁（Gap Lock）** ：锁定表中特定范围内的记录，防止幻读。
	- 例如，假设有一个数据库表，其中包含以下记录：(1, "Alice") (2, "Bob") (3, "Charlie") (4, "Dave") (5, "Eve")
	- 假设事务A正在读取表中的记录(2, "Bob")和(3, "Charlie")，并且在事务A读取这些记录的过程中，事务B插入了一条新记录(1.5, "Frank")。如果事务A不使用间隙锁，则事务A可能会读取到(1, "Alice")、(1.5, "Frank")、(2, "Bob")和(3, "Charlie")四条记录，这就是一个幻读。
	- 但是，如果事务A在读取记录时使用间隙锁，则它会锁定记录(2, "Bob")和(3, "Charlie")之间的间隙，从而防止事务B插入新记录。这样，事务A就可以正确地读取(2, "Bob")和(3, "Charlie")两条记录，而不会受到幻读的影响。
-   **临键锁（Next-key Lock）** ：锁定比关键字大的记录，防止幻读。
	- 例如，假设有一个数据库表，其中包含以下记录： (1, "Alice") (2, "Bob") (3, "Charlie") (4, "Dave") (5, "Eve") 
	- 假设事务A持有临键锁，它锁定了键值大于2的记录。这意味着其他事务无法对记录(3, "Charlie")、(4, "Dave")和(5, "Eve")进行修改，但是可以对记录(1, "Alice")和(2, "Bob")进行修改。


## 11. 当前读和快照读有什么区别？
- 在数据库中，当前读是指事务读取数据时，它总是读取最新的数据。这意味着，如果其他事务对数据进行了修改，事务读取时就会看到修改后的数据。
- 快照读是指事务读取数据时，它总是读取某个时间点的数据快照。这意味着，即使其他事务对数据进行了修改，事务读取时也只能看到修改前的数据。
- 因此，当前读更实时，但是可能会出现脏读或不可重复读的情况，而快照读则更稳定，但是可能会出现幻读的情况。
- 例如，假设有一个数据库表，其中包含以下记录：(1, 100) (2, 200) (3, 300) (4, 400) (5, 500)
- 假设事务A正在读取记录(2, 200)的值，并且在事务A读取这条记录的过程中，事务B修改了记录(2, 200)的值为250。
	- 如果事务A使用当前读，则它会读取到记录(2, 250)，这可能会导致脏读或不可重复读的情况。
	- 如果事务A使用快照读，则它会读取到记录(2, 200)，这可能会导致幻读的情况。

## 12. 什么是 binlog ?
- binlog 是**逻辑日志**，记录的是这个语句的原始逻辑/变化（修改，插入，删除），比如“`给 ID=2 这一行的 c 字段加 1` ”。
- binlog 是追加写，不会覆盖之前的数据，可以提供完整的数据归档的能力。
- Binlog 可以用于在数据库发生故障后恢复数据，也可以用于在多个数据库之间同步数据。
- Binlog 的格式由多种不同的二进制格式组成，其中包括：
		-   Statement-based: 记录SQL语句本身
		-   Row-based: 记录对数据行所做的修改
	- MySQL数据库默认使用Statement-based 格式，但是也可以选择使用 Row-based 格式。
	- Binlog的使用方式也可以有所不同。例如，可以设置Binlog为“开启”或“关闭”状态，或者可以设置为“记录所有操作”或“记录部分操作”。
	- 另外，MySQL还提供了一种名为“复制”的功能，允许将数据从一个数据库复制到另一个数据库。复制功能使用Binlog来记录从主

## 13.什么是 redo log ？
- redo log 是**物理日志**，记录的是“在某个数据页上做了什么修改”；
- redo log 提供 crash-safe 能力。一般只有4G ，4个文件，循环复写。
- redo log 是记录数据库中更改操作的日志文件。当数据库执行更改操作时，它会先将更改写入redo log中，然后再将更改应用到数据库中。如果数据库在执行更改操作过程中出现问题，可以使用redo log来恢复数据库。
- 数据库中**逻辑日志**和**物理日志**的**区别**
  - 在数据库系统中，逻辑日志和物理日志是不同的日志类型，具有独特的功能和用途。
  - 逻辑日志（也称为事务日志）记录了数据库中对数据的逻辑操作，例如插入、更新和删除记录。这些逻辑操作在执行前先记录在日志中，以确保事务的原子性和一致性。如果事务成功完成，逻辑日志将用于提交事务，并将更改永久写入数据库。如果事务失败，则可以使用逻辑日志回滚事务，以恢复数据库的原始状态。
  - 物理日志（也称为磁盘日志）记录了数据库写入磁盘的物理操作。例如，物理日志可以记录数据页的写入操作，以确保在系统故障时能够恢复数据。物理日志在数据库恢复过程中非常重要，因为它可以提供有关数据页的详细信息，以便在故障后进行恢复。
  - 总的来说，逻辑日志和物理日志是不同的日志类型，分别用于支持数据库的事务处理和数据恢复功能。它们在数据库系统中起到重要作用，

## 14. 什么是 undo log ？ 
- Undo log是记录数据库中取消操作的日志文件。当数据库执行取消操作时，它会先记录原来的数据状态，然后将取消操作应用到数据库中。如果取消操作后，数据库出现了问题，可以使用undo log来恢复数据库。

## 15. binlog 和 redo log 不同点?
- 因为最开始 MySQL 里并没有 InnoDB 引擎。MySQL 自带的引擎是 MyISAM，但是 MyISAM 没有 crash-safe 的能力，binlog 日志只能用于归档。而 InnoDB 是另一个公司以插件形式引入 MySQL 的，既然只依靠 binlog 是没有 crash-safe 能力的，所以 InnoDB 使用另外一套日志系统——也就是 redo log 来实现 crash-safe 能力。

1.  redo log 是 InnoDB 引擎特有的；binlog 是 MySQL 的 Server 层实现的，所有引擎都可以使用。
2.  redo log 是物理日志，记录的是“在某个数据页上做了什么修改”；binlog 是逻辑日志，记录的是这个语句的原始逻辑，比如“给 ID=2 这一行的 c 字段加 1 ”。
3.  redo log 是循环写的，空间固定会用完；binlog 是可以追加写入的。“追加写”是指 binlog 文件写到一定大小后会切换到下一个，并不会覆盖以前的日志。

## 16. binlog 的写入机制

其实，binlog 的写入逻辑比较简单：事务执行过程中，先把日志写到 binlog cache，事务提交的时候，再把 binlog cache 写到 binlog 文件中。

一个事务的 binlog 是不能被拆开的，因此不论这个事务多大，也要确保一次性写入。这就涉及到了 binlog cache 的保存问题。

系统给 binlog cache 分配了一片内存，每个线程一个，参数 binlog_cache_size 用于控制单个线程内 binlog cache 所占内存的大小。如果超过了这个参数规定的大小，就要暂存到磁盘。

事务提交的时候，执行器把 binlog cache 里的完整事务写入到 binlog 中，并清空 binlog cache。状态如图 1 所示。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-d9e2d6cb67016131.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，每个线程有自己 binlog cache，但是共用同一份 binlog 文件。

-   图中的 write，指的就是指把日志写入到文件系统的 page cache，并没有把数据持久化到磁盘，所以速度比较快。
-   图中的 fsync，才是将数据持久化到磁盘的操作。一般情况下，我们认为 fsync 才占磁盘的 IOPS。

write 和 fsync 的时机，是由参数 sync_binlog 控制的：

-   sync_binlog=0 的时候，表示每次提交事务都只 write，不 fsync；
-   sync_binlog=1 的时候，表示每次提交事务都会执行 fsync；
-   sync_binlog=N(N>1) 的时候，表示每次提交事务都 write，但累积 N 个事务后才 fsync。

因此，在出现 IO 瓶颈的场景里，将 sync_binlog 设置成一个比较大的值，可以提升性能。在实际的业务场景中，考虑到丢失日志量的可控性，一般不建议将这个参数设成 0，比较常见的是将其设置为 100~1000 中的某个数值。

但是，将 sync_binlog 设置为 N，对应的风险是：如果主机发生异常重启，会丢失最近 N 个事务的 binlog 日志。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#redo-log-%E7%9A%84%E5%86%99%E5%85%A5%E6%9C%BA%E5%88%B6 "redo log 的写入机制")redo log 的写入机制

事务在执行过程中，生成的 redo log 是要先写到 redo log buffer 的。

redo log buffer 里面的内容，是不是每次生成后都要直接持久化到磁盘呢？答案是，不需要。

如果事务执行期间 MySQL 发生异常重启，那这部分日志就丢了。由于事务并没有提交，所以这时日志丢了也不会有损失。

那么，另外一个问题是，事务还没提交的时候，redo log buffer 中的部分日志有没有可能被持久化到磁盘呢？答案是，确实会有。

这个问题，要从 redo log 可能存在的三种状态说起。这三种状态，对应的就是图 2 中的三个颜色块。

![redo log 三种状态](https://upload-images.jianshu.io/upload_images/12321605-15e11ef8355650a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.  存在 redo log buffer 中，物理上是在 MySQL 进程内存中，就是图中的红色部分；
2.  写到磁盘 (write)，但是没有持久化（fsync)，物理上是在文件系统的 page cache 里面，也就是图中的黄色部分；
3.  持久化到磁盘，对应的是 hard disk，也就是图中的绿色部分。

日志写到 redo log buffer 是很快的，wirte 到 page cache 也差不多，但是持久化到磁盘的速度就慢多了。

为了控制 redo log 的写入策略，InnoDB 提供了 innodb_flush_log_at_trx_commit 参数，它有三种可能取值：

-   设置为 0 的时候，表示每次事务提交时都只是把 redo log 留在 redo log buffer 中 ;
-   设置为 1 的时候，表示每次事务提交时都将 redo log 直接持久化到磁盘；
-   设置为 2 的时候，表示每次事务提交时都只是把 redo log 写到 page cache。

InnoDB 有一个后台线程，每隔 1 秒，就会把 redo log buffer 中的日志，调用 write 写到文件系统的 page cache，然后调用 fsync 持久化到磁盘。

注意，事务执行中间过程的 redo log 也是直接写在 redo log buffer 中的，这些 redo log 也会被后台线程一起持久化到磁盘。也就是说，一个没有提交的事务的 redo log，也是可能已经持久化到磁盘的。

实际上，除了后台线程每秒一次的轮询操作外，还有两种场景会让一个没有提交的事务的 redo log 写入到磁盘中。

1.  一种是，redo log buffer 占用的空间即将达到 innodb_log_buffer_size 一半的时候，后台线程会主动写盘。注意，由于这个事务并没有提交，所以这个写盘动作只是 write，而没有调用 fsync，也就是只留在了文件系统的 page cache。
2.  另一种是，并行的事务提交的时候，顺带将这个事务的 redo log buffer 持久化到磁盘。假设一个事务 A 执行到一半，已经写了一些 redo log 到 buffer 中，这时候有另外一个线程的事务 B 提交，如果 innodb_flush_log_at_trx_commit 设置的是 1，那么按照这个参数的逻辑，事务 B 要把 redo log buffer 里的日志全部持久化到磁盘。这时候，就会带上事务 A 在 redo log buffer 里的日志一起持久化到磁盘。

这里需要说明的是，我们介绍两阶段提交的时候说过，时序上 redo log 先 prepare， 再写 binlog，最后再把 redo log commit。

如果把 innodb_flush_log_at_trx_commit 设置成 1，那么 redo log 在 prepare 阶段就要持久化一次，因为有一个崩溃恢复逻辑是要依赖于 prepare 的 redo log，再加上 binlog 来恢复的。（如果你印象有点儿模糊了，可以再回顾下第 15 篇文章中的相关内容）。

每秒一次后台轮询刷盘，再加上崩溃恢复这个逻辑，InnoDB 就认为 redo log 在 commit 的时候就不需要 fsync 了，只会 write 到文件系统的 page cache 中就够了。

通常我们说 MySQL 的“双 1”配置，指的就是 sync_binlog 和 innodb_flush_log_at_trx_commit 都设置成 1。也就是说，一个事务完整提交前，需要等待两次刷盘，一次是 redo log（prepare 阶段），一次是 binlog。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#redo-log-%E5%AD%98%E5%82%A8%E6%96%B9%E5%BC%8F "redo log 存储方式")redo log 存储方式

当有一条记录需要更新的时候，InnoDB 引擎就会先把记录写到 redo log 里面，并更新内存，这个时候更新就算完成了。同时，InnoDB 引擎会在适当的时候，将这个操作记录更新到磁盘里面，而这个更新往往是在系统比较空闲的时候做。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-3dded44ffd4d9c82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

write pos 是当前记录的位置，一边写一边后移，写到第 3 号文件末尾后就回到 0 号文件开头。checkpoint 是当前要擦除的位置，也是往后推移并且循环的，擦除记录前要把记录更新到数据文件。

write pos 和 checkpoint **之间的是还空着的部分，可以用来记录新的操作**。如果 write pos 追上 checkpoint，**表示“粉板”满了，这时候不能再执行新的更新**，得停下来先擦掉一些记录，把 checkpoint 推进一下。

有了 redo log，InnoDB 就可以保证即使数据库发生异常重启，之前提交的记录都不会丢失，这个能力称为 **crash-safe**。

redo log 用于保证 crash-safe 能力。`innodb_flush_log_at_trx_commit` 这个参数设置成 1 的时候，表示每次事务的 redo log 都直接持久化到磁盘。这个参数我建议你设置成 1，这样可以保证 MySQL 异常重启之后数据不丢失。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E7%BB%84%E6%8F%90%E4%BA%A4%EF%BC%88group-commit%EF%BC%89%E6%9C%BA%E5%88%B6 "组提交（group commit）机制")组提交（group commit）机制

日志逻辑序列号（log sequence number，LSN）。LSN 是单调递增的，用来对应 redo log 的一个个写入点。每次写入长度为 length 的 redo log， LSN 的值就会加上 length。

LSN 也会写到 InnoDB 的数据页中，来确保数据页不会被多次执行重复的 redo log。关于 LSN 和 redo log、checkpoint 的关系，我会在后面的文章中详细展开。

如图 3 所示，是三个并发事务 (trx1, trx2, trx3) 在 prepare 阶段，都写完 redo log buffer，持久化到磁盘的过程，对应的 LSN 分别是 50、120 和 160。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-126180d07c62c833.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

MySQL 为了让组提交的效果更好，把 redo log 做 fsync 的时间拖到了步骤 1 之后。也就是说，上面的图变成了这样：

![image.png](https://upload-images.jianshu.io/upload_images/12321605-bc7bede59859cd59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这么一来，binlog 也可以组提交了。在执行图 5 中第 4 步把 binlog fsync 到磁盘时，如果有多个事务的 binlog 已经写完了，也是一起持久化的，这样也可以减少 IOPS 的消耗。

不过通常情况下第 3 步执行得会很快，所以 binlog 的 write 和 fsync 间的间隔时间短，导致能集合到一起持久化的 binlog 比较少，因此 binlog 的组提交的效果通常不如 redo log 的效果那么好。

如果你想提升 binlog 组提交的效果，可以通过设置 `binlog_group_commit_sync_delay` 和 `binlog_group_commit_sync_no_delay_count` 来实现。

1.  `binlog_group_commit_sync_delay` 参数，表示延迟多少微秒后才调用 fsync;
2.  `binlog_group_commit_sync_no_delay_count` 参数，表示累积多少次以后才调用 fsync。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#binlog-%E7%9A%84%E4%B8%89%E7%A7%8D%E6%A0%BC%E5%BC%8F "binlog 的三种格式")binlog 的三种格式

binlog 的三种格式 ：statement、row、mixed

```
mysql> CREATE TABLE `t` (
  `id` int(11) NOT NULL,
  `a` int(11) DEFAULT NULL,
  `t_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `a` (`a`),
  KEY `t_modified`(`t_modified`)
) ENGINE=InnoDB;

insert into t values(1,1,'2018-11-13');
insert into t values(2,2,'2018-11-12');
insert into t values(3,3,'2018-11-11');
insert into t values(4,4,'2018-11-10');
insert into t values(5,5,'2018-11-09');
```

注意，下面这个语句包含注释，如果你用 MySQL 客户端来做这个实验的话，要记得加 -c 参数，否则客户端会自动去掉注释。

```
mysql> delete from t /*comment*/  where a>=4 and t_modified<='2018-11-10' limit 1;
```

当 binlog_format=statement 时，binlog 里面记录的就是 SQL 语句的原文。你可以用

```
mysql> show binlog events in 'master.000001';
```

命令看 binlog 中的内容。

![图 4 delete 执行 warnings](https://upload-images.jianshu.io/upload_images/12321605-209fd6c3cdf883d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

-   第二行是一个 BEGIN，跟第四行的 commit 对应，表示中间是一个事务；
-   第三行就是真实执行的语句了。可以看到，在真实执行的 delete 命令之前，还有一个“use ‘test’”命令。这条命令不是我们主动执行的，而是 MySQL 根据当前要操作的表所在的数据库，自行添加的。这样做可以保证日志传到备库去执行的时候，不论当前的工作线程在哪个库里，都能够正确地更新到 test 库的表 t。
-   use ‘test’命令之后的 delete 语句，就是我们输入的 SQL 原文了。可以看到，binlog“忠实”地记录了 SQL 命令，甚至连注释也一并记录了。
-   最后一行是一个 COMMIT。你可以看到里面写着 xid=61。你还记得这个 XID 是做什么用的吗？如果记忆模糊了，可以再回顾一下第 15 篇文章中的相关内容。

为了说明 statement 和 row 格式的区别，我们来看一下这条 delete 命令的执行效果图：

![图 4 delete 执行 warnings](https://upload-images.jianshu.io/upload_images/12321605-0b2d0b2aaa4c9ba9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，运行这条 delete 命令产生了一个 warning，原因是当前 binlog 设置的是 statement 格式，并且语句中有 limit，所以这个命令可能是 unsafe 的。

为什么这么说呢？这是因为 delete 带 limit，很可能会出现主备数据不一致的情况。比如上面这个例子：

1.  如果 delete 语句使用的是索引 a，那么会根据索引 a 找到第一个满足条件的行，也就是说删除的是 a=4 这一行；
2.  但如果使用的是索引 `t_modified`，那么删除的就是 `t_modified='2018-11-09’`也就是 a=5 这一行。

由于 statement 格式下，记录到 binlog 里的是语句原文，因此可能会出现这样一种情况：在主库执行这条 SQL 语句的时候，用的是索引 a；而在备库执行这条 SQL 语句的时候，却使用了索引 t_modified。因此，MySQL 认为这样写是有风险的。

那么，如果我把 binlog 的格式改为 binlog_format=‘row’， 是不是就没有这个问题了呢？我们先来看看这时候 binog 中的内容吧。

![图 5 row 格式 binlog 示例](https://upload-images.jianshu.io/upload_images/12321605-9339bcfa75858829.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，与 statement 格式的 binlog 相比，前后的 BEGIN 和 COMMIT 是一样的。但是，row 格式的 binlog 里没有了 SQL 语句的原文，而是替换成了两个 event：Table_map 和 Delete_rows。

-   `Table_map` event，用于说明接下来要操作的表是 test 库的表 t;
-   `Delete_rows` event，用于定义删除的行为。

其实，我们通过图 5 是看不到详细信息的，还需要借助 mysqlbinlog 工具，用下面这个命令解析和查看 binlog 中的内容。因为图 5 中的信息显示，这个事务的 binlog 是从 8900 这个位置开始的，所以可以用 start-position 参数来指定从这个位置的日志开始解析。

```
mysqlbinlog  -vv data/master.000001 --start-position=8900;
```

![图 6 row 格式 binlog 示例的详细信息](https://upload-images.jianshu.io/upload_images/12321605-945744ba90208f3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从这个图中，我们可以看到以下几个信息：

-   server id 1，表示这个事务是在 server_id=1 的这个库上执行的。
-   每个 event 都有 CRC32 的值，这是因为我把参数 binlog_checksum 设置成了 CRC32。
-   Table_map event 跟在图 5 中看到的相同，显示了接下来要打开的表，map 到数字 226。现在我们这条 SQL 语句只操作了一张表，如果要操作多张表呢？每个表都有一个对应的 Table_map event、都会 map 到一个单独的数字，用于区分对不同表的操作。
-   我们在 mysqlbinlog 的命令中，使用了 -vv 参数是为了把内容都解析出来，所以从结果里面可以看到各个字段的值（比如，@1=4、 @2=4 这些值）。
-   binlog_row_image 的默认配置是 FULL，因此 Delete_event 里面，包含了删掉的行的所有字段的值。如果把 binlog_row_image 设置为 MINIMAL，则只会记录必要的信息，在这个例子里，就是只会记录 id=4 这个信息。
-   最后的 Xid event，用于表示事务被正确地提交了。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BC%9A%E6%9C%89-mixed-%E6%A0%BC%E5%BC%8F%E7%9A%84-binlog%EF%BC%9F "为什么会有 mixed 格式的 binlog？")为什么会有 mixed 格式的 binlog？

-   因为有些 statement 格式的 binlog 可能会导致主备不一致，所以要使用 row 格式。
-   但 row 格式的缺点是，很占空间。比如你用一个 delete 语句删掉 10 万行数据，用 statement 的话就是一个 SQL 语句被记录到 binlog 中，占用几十个字节的空间。但如果用 row 格式的 binlog，就要把这 10 万条记录都写到 binlog 中。这样做，不仅会占用更大的空间，同时写 binlog 也要耗费 IO 资源，影响执行速度。
-   所以，MySQL 就取了个折中方案，也就是有了 mixed 格式的 binlog。mixed 格式的意思是，MySQL 自己会判断这条 SQL 语句是否可能引起主备不一致，如果有可能，就用 row 格式，否则就用 statement 格式。

也就是说，mixed 格式可以利用 statment 格式的优点，同时又避免了数据不一致的风险。

因此，如果你的线上 MySQL 设置的 binlog 格式是 statement 的话，那基本上就可以认为这是一个不合理的设置。你至少应该把 binlog 的格式设置为 mixed。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%94%A8mix%E6%A0%BC%E5%BC%8F%E6%97%A5%E5%BF%97%EF%BC%9F "为什么不用mix格式日志？")为什么不用mix格式日志？

现在越来越多的场景要求把 MySQL 的 binlog 格式设置成 row。这么做的理由有很多，一个可以直接看出来的好处：**恢复数据**。

接下来，我们就分别从 delete、insert 和 update 这三种 SQL 语句的角度，来看看数据恢复的问题。

-   即使我执行的是 delete 语句，row 格式的 binlog 也会把被删掉的行的整行信息保存起来。所以，如果你在执行完一条 delete 语句以后，发现删错数据了，可以直接把 binlog 中记录的 delete 语句转成 insert，把被错删的数据插入回去就可以恢复了。
-   如果你是执行错了 insert 语句呢？那就更直接了。row 格式下，insert 语句的 binlog 里会记录所有的字段信息，这些信息可以用来精确定位刚刚被插入的那一行。这时，你直接把 insert 语句转成 delete 语句，删除掉这被误插入的一行数据就可以了。
-   如果执行的是 update 语句的话，binlog 里面会记录修改前整行的数据和修改后的整行数据。所以，如果你误执行了 update 语句的话，只需要把这个 event 前后的两行信息对调一下，再去数据库里面执行，就能恢复这个更新操作了。

其实，由 delete、insert 或者 update 语句导致的数据操作错误，需要恢复到操作之前状态的情况，也时有发生。MariaDB 的Flashback工具就是基于上面介绍的原理来回滚数据的。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Xid "Xid")Xid

redo log 和 binlog有一个共同的字段叫作 Xid。它在 MySQL 中是用来对应事务的。

MySQL 内部维护了一个全局变量 global_query_id，每次执行语句的时候将它赋值给 Query_id，然后给这个变量加 1。如果当前语句是这个事务执行的第一条语句，那么 MySQL 还会同时把 Query_id 赋值给这个事务的 Xid。

而 global_query_id 是一个纯内存变量，重启之后就清零了。所以你就知道了，在同一个数据库实例中，不同事务的 Xid 也是有可能相同的。

但是 MySQL 重启之后会重新生成新的 binlog 文件，这就保证了，同一个 binlog 文件里，Xid 一定是惟一的。

虽然 MySQL 重启不会导致同一个 binlog 里面出现两个相同的 Xid，但是如果 global_query_id 达到上限后，就会继续从 0 开始计数。从理论上讲，还是就会出现同一个 binlog 里面出现相同 Xid 的场景。

因为 global_query_id 定义的长度是 8 个字节，这个自增值的上限是 264-1。要出现这种情况，必须是下面这样的过程：

1.  执行一个事务，假设 Xid 是 A；
2.  接下来执行2的64次方查询语句，让 global_query_id 回到 A；
3.  再启动一个事务，这个事务的 Xid 也是 A。

不过，2的64次方这个值太大了，大到你可以认为这个可能性只会存在于理论上。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%85%B6%E4%BB%96%E9%97%AE%E9%A2%98 "其他问题")其他问题

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#MySQL-%E6%80%8E%E4%B9%88%E7%9F%A5%E9%81%93-binlog-%E6%98%AF%E5%AE%8C%E6%95%B4%E7%9A%84 "MySQL 怎么知道 binlog 是完整的?")MySQL 怎么知道 binlog 是完整的?

-   statement 格式的 binlog，最后会有 COMMIT；
-   row 格式的 binlog，最后会有一个 XID event。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#redo-log-%E5%92%8C-binlog-%E6%98%AF%E6%80%8E%E4%B9%88%E5%85%B3%E8%81%94%E8%B5%B7%E6%9D%A5%E7%9A%84 "redo log 和 binlog 是怎么关联起来的?")redo log 和 binlog 是怎么关联起来的?

它们有一个共同的数据字段，叫 XID。崩溃恢复的时候，会按顺序扫描 redo log：

-   如果碰到既有 prepare、又有 commit 的 redo log，就直接提交；
-   如果碰到只有 parepare、而没有 commit 的 redo log，就拿着 XID 去 binlog 找对应的事务。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%A4%84%E4%BA%8E-prepare-%E9%98%B6%E6%AE%B5%E7%9A%84-redo-log-%E5%8A%A0%E4%B8%8A%E5%AE%8C%E6%95%B4-binlog%EF%BC%8C%E9%87%8D%E5%90%AF%E5%B0%B1%E8%83%BD%E6%81%A2%E5%A4%8D%EF%BC%8CMySQL-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E8%BF%99%E4%B9%88%E8%AE%BE%E8%AE%A1 "处于 prepare 阶段的 redo log 加上完整 binlog，重启就能恢复，MySQL 为什么要这么设计?")处于 prepare 阶段的 redo log 加上完整 binlog，重启就能恢复，MySQL 为什么要这么设计?

这个问题还是跟我们在反证法中说到的数据与备份的一致性有关。在时刻 B，也就是 binlog 写完以后 MySQL 发生崩溃，这时候 binlog 已经写入了，之后就会被从库（或者用这个 binlog 恢复出来的库）使用。

**那能不能只用 redo log，不要 binlog？**

如果只从崩溃恢复的角度来讲是可以的。你可以把 binlog 关掉，这样就没有两阶段提交了，但系统依然是 crash-safe 的。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E6%AD%A3%E5%B8%B8%E8%BF%90%E8%A1%8C%E4%B8%AD%E7%9A%84%E5%AE%9E%E4%BE%8B%EF%BC%8C%E6%95%B0%E6%8D%AE%E5%86%99%E5%85%A5%E5%90%8E%E7%9A%84%E6%9C%80%E7%BB%88%E8%90%BD%E7%9B%98%EF%BC%8C%E6%98%AF%E4%BB%8E-redo-log-%E6%9B%B4%E6%96%B0%E8%BF%87%E6%9D%A5%E7%9A%84%E8%BF%98%E6%98%AF%E4%BB%8E-buffer-pool-%E6%9B%B4%E6%96%B0%E8%BF%87%E6%9D%A5%E7%9A%84%E5%91%A2%EF%BC%9F "正常运行中的实例，数据写入后的最终落盘，是从 redo log 更新过来的还是从 buffer pool 更新过来的呢？")正常运行中的实例，数据写入后的最终落盘，是从 redo log 更新过来的还是从 buffer pool 更新过来的呢？

-   如果是正常运行的实例的话，数据页被修改以后，跟磁盘的数据页不一致，称为脏页。最终数据落盘，就是把内存中的数据页写盘。这个过程，甚至与 redo log 毫无关系。
-   在崩溃恢复场景中，InnoDB 如果判断到一个数据页可能在崩溃恢复的时候丢失了更新，就会将它读到内存，然后让 redo log 更新内存内容。更新完成后，内存页变成脏页，就回到了第一种情况的状态。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#redo-log-buffer-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F%E6%98%AF%E5%85%88%E4%BF%AE%E6%94%B9%E5%86%85%E5%AD%98%EF%BC%8C%E8%BF%98%E6%98%AF%E5%85%88%E5%86%99-redo-log-%E6%96%87%E4%BB%B6%EF%BC%9F "redo log buffer 是什么？是先修改内存，还是先写 redo log 文件？")redo log buffer 是什么？是先修改内存，还是先写 redo log 文件？

这个事务要往两个表中插入记录，插入数据的过程中，生成的日志都得先保存起来，但又不能在还没 commit 的时候就直接写到 redo log 文件里。

所以，redo log buffer 就是一块内存，用来先存 redo 日志的。也就是说，在执行第一个 insert 的时候，数据的内存被修改了，redo log buffer 也写入了日志。

但是，真正把日志写到 redo log 文件（文件名是 ib_logfile+ 数字），是在执行 commit 语句的时候做的。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#WAL-%E6%9C%BA%E5%88%B6%E6%98%AF%E5%87%8F%E5%B0%91%E7%A3%81%E7%9B%98%E5%86%99%EF%BC%8C%E5%8F%AF%E6%98%AF%E6%AF%8F%E6%AC%A1%E6%8F%90%E4%BA%A4%E4%BA%8B%E5%8A%A1%E9%83%BD%E8%A6%81%E5%86%99-redo-log-%E5%92%8C-binlog%EF%BC%8C%E8%BF%99%E7%A3%81%E7%9B%98%E8%AF%BB%E5%86%99%E6%AC%A1%E6%95%B0%E4%B9%9F%E6%B2%A1%E5%8F%98%E5%B0%91%E5%91%80%EF%BC%9F "WAL 机制是减少磁盘写，可是每次提交事务都要写 redo log 和 binlog，这磁盘读写次数也没变少呀？")WAL 机制是减少磁盘写，可是每次提交事务都要写 redo log 和 binlog，这磁盘读写次数也没变少呀？

现在你就能理解了，WAL 机制主要得益于两个方面：

1.  redo log 和 binlog 都是顺序写，磁盘的顺序写比随机写速度要快；
2.  组提交机制，可以大幅度降低磁盘的 IOPS 消耗。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%A6%82%E6%9E%9C%E4%BD%A0%E7%9A%84-MySQL-%E7%8E%B0%E5%9C%A8%E5%87%BA%E7%8E%B0%E4%BA%86%E6%80%A7%E8%83%BD%E7%93%B6%E9%A2%88%EF%BC%8C%E8%80%8C%E4%B8%94%E7%93%B6%E9%A2%88%E5%9C%A8-IO-%E4%B8%8A%EF%BC%8C%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%E5%93%AA%E4%BA%9B%E6%96%B9%E6%B3%95%E6%9D%A5%E6%8F%90%E5%8D%87%E6%80%A7%E8%83%BD%E5%91%A2%EF%BC%9F "如果你的 MySQL 现在出现了性能瓶颈，而且瓶颈在 IO 上，可以通过哪些方法来提升性能呢？")如果你的 MySQL 现在出现了性能瓶颈，而且瓶颈在 IO 上，可以通过哪些方法来提升性能呢？

1.  设置 `binlog_group_commit_sync_delay` 和 `binlog_group_commit_sync_no_delay_count` 参数，减少 binlog 的写盘次数。这个方法是基于“额外的故意等待”来实现的，因此可能会增加语句的响应时间，但没有丢失数据的风险。
2.  将 `sync_binlog` 设置为大于 1 的值（比较常见是 100~1000）。这样做的风险是，主机掉电时会丢 `binlog` 日志。
3.  将 `innodb_flush_log_at_trx_commit` 设置为 2。这样做的风险是，主机掉电的时候会丢数据。

我不建议你把 `innodb_flush_log_at_trx_commit` 设置成 0。因为把这个参数设置成 0，表示 redo log 只保存在内存中，这样的话 MySQL 本身异常重启也会丢数据，风险太大。而 redo log 写到文件系统的 page cache 的速度也是很快的，所以将这个参数设置成 2 跟设置成 0 其实性能差不多，但这样做 MySQL 异常重启时就不会丢数据了，相比之下风险会更小。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E6%89%A7%E8%A1%8C%E4%B8%80%E4%B8%AA-update-%E8%AF%AD%E5%8F%A5%E4%BB%A5%E5%90%8E%EF%BC%8C%E6%88%91%E5%86%8D%E5%8E%BB%E6%89%A7%E8%A1%8C-hexdump-%E5%91%BD%E4%BB%A4%E7%9B%B4%E6%8E%A5%E6%9F%A5%E7%9C%8B-ibd-%E6%96%87%E4%BB%B6%E5%86%85%E5%AE%B9%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E6%B2%A1%E6%9C%89%E7%9C%8B%E5%88%B0%E6%95%B0%E6%8D%AE%E6%9C%89%E6%94%B9%E5%8F%98%E5%91%A2%EF%BC%9F "执行一个 update 语句以后，我再去执行 hexdump 命令直接查看 ibd 文件内容，为什么没有看到数据有改变呢？")执行一个 update 语句以后，我再去执行 hexdump 命令直接查看 ibd 文件内容，为什么没有看到数据有改变呢？

这可能是因为 WAL 机制的原因。update 语句执行完成后，InnoDB 只保证写完了 redo log、内存，可能还没来得及将数据写到磁盘。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%BA%E4%BB%80%E4%B9%88-binlog-cache-%E6%98%AF%E6%AF%8F%E4%B8%AA%E7%BA%BF%E7%A8%8B%E8%87%AA%E5%B7%B1%E7%BB%B4%E6%8A%A4%E7%9A%84%EF%BC%8C%E8%80%8C-redo-log-buffer-%E6%98%AF%E5%85%A8%E5%B1%80%E5%85%B1%E7%94%A8%E7%9A%84%EF%BC%9F "为什么 binlog cache 是每个线程自己维护的，而 redo log buffer 是全局共用的？")为什么 binlog cache 是每个线程自己维护的，而 redo log buffer 是全局共用的？

MySQL 这么设计的主要原因是，binlog 是不能“被打断的”。一个事务的 binlog 必须连续写，因此要整个事务完成后，再一起写到文件里。  
而 redo log 并没有这个要求，中间有生成的日志可以写到 redo log buffer 中。redo log buffer 中的内容还能“搭便车”，其他事务提交的时候可以被一起写到磁盘中。

这个问题，感觉还有一点，binlog存储是以statement或者row格式存储的，而redo log是以page页格式存储的。page格式，天生就是共有的，而row格式，只跟当前事务相关

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%BA%8B%E5%8A%A1%E6%89%A7%E8%A1%8C%E6%9C%9F%E9%97%B4%EF%BC%8C%E8%BF%98%E6%B2%A1%E5%88%B0%E6%8F%90%E4%BA%A4%E9%98%B6%E6%AE%B5%EF%BC%8C%E5%A6%82%E6%9E%9C%E5%8F%91%E7%94%9F-crash-%E7%9A%84%E8%AF%9D%EF%BC%8Credo-log-%E8%82%AF%E5%AE%9A%E4%B8%A2%E4%BA%86%EF%BC%8C%E8%BF%99%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%AF%BC%E8%87%B4%E4%B8%BB%E5%A4%87%E4%B8%8D%E4%B8%80%E8%87%B4%E5%91%A2%EF%BC%9F "事务执行期间，还没到提交阶段，如果发生 crash 的话，redo log 肯定丢了，这会不会导致主备不一致呢？")事务执行期间，还没到提交阶段，如果发生 crash 的话，redo log 肯定丢了，这会不会导致主备不一致呢？

不会。因为这时候 binlog 也还在 binlog cache 里，没发给备库。crash 以后 redo log 和 binlog 都没有了，从业务角度看这个事务也没有提交，所以数据是一致的。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%A6%82%E6%9E%9C-binlog-%E5%86%99%E5%AE%8C%E7%9B%98%E4%BB%A5%E5%90%8E%E5%8F%91%E7%94%9F-crash%EF%BC%8C%E8%BF%99%E6%97%B6%E5%80%99%E8%BF%98%E6%B2%A1%E7%BB%99%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%AD%94%E5%A4%8D%E5%B0%B1%E9%87%8D%E5%90%AF%E4%BA%86%E3%80%82%E7%AD%89%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%86%8D%E9%87%8D%E8%BF%9E%E8%BF%9B%E6%9D%A5%EF%BC%8C%E5%8F%91%E7%8E%B0%E4%BA%8B%E5%8A%A1%E5%B7%B2%E7%BB%8F%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F%E4%BA%86%EF%BC%8C%E8%BF%99%E6%98%AF%E4%B8%8D%E6%98%AF-bug%EF%BC%9F "如果 binlog 写完盘以后发生 crash，这时候还没给客户端答复就重启了。等客户端再重连进来，发现事务已经提交成功了，这是不是 bug？")如果 binlog 写完盘以后发生 crash，这时候还没给客户端答复就重启了。等客户端再重连进来，发现事务已经提交成功了，这是不是 bug？

不是。你可以设想一下更极端的情况，整个事务都提交成功了，redo log commit 完成了，备库也收到 binlog 并执行了。但是主库和客户端网络断开了，导致事务成功的包返回不回去，这时候客户端也会收到“网络断开”的异常。这种也只能算是事务成功的，不能认为是 bug。

实际上数据库的 crash-safe 保证的是：

1.  如果客户端收到事务成功的消息，事务就一定持久化了；
2.  如果客户端收到事务失败（比如主键冲突、回滚等）的消息，事务就一定失败了；
3.  如果客户端收到“执行异常”的消息，应用需要重连后通过查询当前状态来继续后续的逻辑。此时数据库只需要保证内部（数据和日志之间，主库和备库之间）一致就可以了。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%BA%E4%BB%80%E4%B9%88binlog-%E6%98%AF%E4%B8%8D%E8%83%BD%E2%80%9C%E8%A2%AB%E6%89%93%E6%96%AD%E7%9A%84%E2%80%9D%E7%9A%84%E5%91%A2%EF%BC%9F%E4%B8%BB%E8%A6%81%E5%87%BA%E4%BA%8E%E4%BB%80%E4%B9%88%E8%80%83%E8%99%91%EF%BC%9F "为什么binlog 是不能“被打断的”的呢？主要出于什么考虑？")为什么binlog 是不能“被打断的”的呢？主要出于什么考虑？

我觉得一个比较重要的原因是，**一个线程只能同时有一个事务在执行**。

由于这个设定，所以每当执行一个begin/start transaction的时候，就会默认提交上一个事务；  
**这样如果一个事务的binlog被拆开的时候，在备库执行就会被当做多个事务分段自行，这样破坏了原子性，是有问题的**。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%BB%E4%BB%8E%E5%BE%AA%E7%8E%AF%E5%A4%8D%E5%88%B6%E9%97%AE%E9%A2%98 "主从循环复制问题")主从循环复制问题

![image.png](https://upload-images.jianshu.io/upload_images/12321605-e4f57b051c5323e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.  规定两个库的 server id 必须不同，如果相同，则它们之间不能设定为主备关系；
2.  一个备库接到 binlog 并在重放的过程中，生成与原 binlog 的 server id 相同的新的 binlog；
3.  每个库在收到从自己的主库发过来的日志后，先判断 server id，如果跟自己的相同，表示这个日志是自己生成的，就直接丢弃这个日志。

按照这个逻辑，如果我们设置了双 M 结构，日志的执行流就会变成这样：

1.  从节点 A 更新的事务，binlog 里面记的都是 A 的 server id；
2.  传到节点 B 执行一次以后，节点 B 生成的 binlog 的 server id 也是 A 的 server id；
3.  再传回给节点 A，A 判断到这个 server id 与自己的相同，就不会再处理这个日志。所以，死循环在这里就断掉了。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#WAL-write-ahead-log-%E6%97%A5%E5%BF%97%E4%B8%8E%E5%9B%9E%E6%BB%9A%EF%BC%88rollback%EF%BC%89%E6%97%A5%E5%BF%97%E7%9A%84%E5%8C%BA%E5%88%AB "WAL(write-ahead-log)日志与回滚（rollback）日志的区别")WAL(write-ahead-log)日志与回滚（rollback）日志的区别

**回滚日志：**

-   复制原始数据库内容并将其保存在单独的文件（即回滚日志）中，然后将新值写入数据库。
-   事务提交后，则删除回滚日志。
-   如果事务中止，则将回滚日志中的内容复制回数据库。

**预写日志：**

-   更改将附加到预写日志文件中。
-   提交时，会在WAL上设置“提交”标志（原始数据库此时可能不会更改）。
-   在WAL的检查点执行之前，可能会有多个已经提交的事务，但并未写入数据库物理文件。

## [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#SQL%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B "SQL执行过程")SQL执行过程

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%80%E6%9D%A1SQL%E5%A6%82%E4%BD%95%E6%89%A7%E8%A1%8C%EF%BC%9F "一条SQL如何执行？")一条SQL如何执行？

![image](https://upload-images.jianshu.io/upload_images/12321605-dafc1ef4bc3a467b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

-   连接器，连接器负责跟客户端建立连接、获取权限、维持和管理连接。`show processlist` 可以查看链接状态。客户端如果太长时间没动静，连接器就会自动将它断开。这个时间是由参数 wait_timeout 控制的，默认值是 8 小时。
-   查询缓存，MySQL 拿到一个查询请求后，会先到查询缓存看看，之前是不是执行过这条语句。之前执行过的语句及其结果可能会以 key-value 对的形式，被直接缓存在内存中。key 是查询的语句，value 是查询的结果。如果你的查询能够直接在这个缓存中找到 key，那么这个 value 就会被直接返回给客户端。
    -   **但是大多数情况下我会建议你不要使用查询缓存，为什么呢？因为查询缓存往往弊大于利。**
    -   查询缓存的失效非常频繁，只要有对一个表的更新，这个表上所有的查询缓存都会被清空。因此很可能你费劲地把结果存起来，还没使用呢，就被一个更新全清空了。对于更新压力大的数据库来说，查询缓存的命中率会非常低。除非你的业务就是有一张静态表，很长时间才会更新一次。比如，一个系统配置表，那这张表上的查询才适合使用查询缓存。
    -   MySQL 8.0 版本直接将查询缓存的整块功能删掉了。
-   分析器，主要对SQl做词法分析和语法分析，检查语法错误。
-   优化器，优化器是在表里面有多个索引的时候，决定使用哪个索引；或者在一个语句有多表关联（join）的时候，决定各个表的连接顺序。
-   执行器，执行相关操作。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%80%E4%B8%AASQL-%E6%9B%B4%E6%96%B0%E8%BF%87%E7%A8%8B "一个SQL 更新过程")一个SQL 更新过程

```
mysql> update T set c=c+1 where ID=2;
```

这里我给出这个 update 语句的执行流程图，图中浅色框表示是在 InnoDB 内部执行的，深色框表示是在执行器中执行的。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-8e2cc83183584ada.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#change-buffer "change buffer")change buffer

当需要更新一个数据页时，如果数据页在内存中就直接更新，而如果这个数据页还没有在内存中的话，在不影响数据一致性的前提下，InnoDB 会将这些更新操作缓存在 change buffer 中，这样就不需要从磁盘中读入这个数据页了。在下次查询需要访问这个数据页的时候，将数据页读入内存，然后执行 change buffer 中与这个页有关的操作。通过这种方式就能保证这个数据逻辑的正确性。

需要说明的是，虽然名字叫作 change buffer，实际上它是可以持久化的数据。也就是说，change buffer 在内存中有拷贝，也会被写入到磁盘上。

将 change buffer 中的操作应用到原数据页，得到最新结果的过程称为 merge。除了访问这个数据页会触发 merge 外，系统有后台线程会定期 merge。在数据库正常关闭（shutdown）的过程中，也会执行 merge 操作。

显然，如果能够将更新操作先记录在 change buffer，减少读磁盘，语句的执行速度会得到明显的提升。而且，数据读入内存是需要占用 buffer pool 的，所以这种方式还能够避免占用内存，提高内存利用率。

那么，**什么条件下可以使用 change buffer 呢？**

对于唯一索引来说，所有的更新操作都要先判断这个操作是否违反唯一性约束。比如，要插入 (4,400) 这个记录，就要先判断现在表中是否已经存在 k=4 的记录，**而这必须要将数据页读入内存才能判断**。如果都已经读入到内存了，那直接更新内存会更快，就没必要使用 change buffer 了。

change buffer 用的是 buffer pool 里的内存，因此不能无限增大。change buffer 的大小，可以通过参数 `innodb_change_buffer_max_size` 来动态设置。这个参数设置为 50 的时候，表示 change buffer 的大小最多只能占用 buffer pool 的 50%。

现在，你已经理解了 change buffer 的机制，那么我们再一起来看看如果要在这张表中插入一个新记录 (4,400) 的话，InnoDB 的处理流程是怎样的。

第一种情况是，这个记录要更新的目标页在内存中。这时，InnoDB 的处理流程如下：

-   对于唯一索引来说，找到 3 和 5 之间的位置，判断到没有冲突，插入这个值，语句执行结束；
-   对于普通索引来说，找到 3 和 5 之间的位置，插入这个值，语句执行结束。

这样看来，普通索引和唯一索引对更新语句性能影响的差别，只是一个判断，只会耗费微小的 CPU 时间。

第二种情况是，这个记录要更新的目标页不在内存中。

这时，InnoDB 的处理流程如下：

-   对于唯一索引来说，需要将数据页读入内存，判断到没有冲突，插入这个值，语句执行结束；
-   对于普通索引来说，则是将更新记录在 change buffer，语句执行就结束了。

将数据从磁盘读入内存涉及随机 IO 的访问，是数据库里面成本最高的操作之一。change buffer 因为减少了随机磁盘访问，所以对更新性能的提升是会很明显的。

之前我就碰到过一件事儿，有个 DBA 的同学跟我反馈说，他负责的某个业务的库内存命中率突然从 99% 降低到了 75%，整个系统处于阻塞状态，更新语句全部堵住。而探究其原因后，我发现这个业务有大量插入数据的操作，而他在前一天把其中的某个普通索引改成了唯一索引。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#change-buffer-%E7%9A%84%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF "change buffer 的使用场景")change buffer 的使用场景

通过上面的分析，你已经清楚了使用 change buffer 对更新过程的加速作用，也清楚了 change buffer 只限于用在普通索引的场景下，而不适用于唯一索引。那么，现在有一个问题就是：普通索引的所有场景，使用 change buffer 都可以起到加速作用吗？

因为 merge 的时候是真正进行数据更新的时刻，而 change buffer 的主要目的就是将记录的变更动作缓存下来，所以在一个数据页做 merge 之前，change buffer 记录的变更越多（也就是这个页面上要更新的次数越多），收益就越大。

因此，对于**写多读少的业务来说**，页面在写完以后马上被访问到的概率比较小，此时 change buffer 的使用效果最好。这种业务模型常见的就是账单类、日志类的系统。

反过来，假设一个业务的**更新模式是写入之后马上会做查询**，那么即使满足了条件，将更新先记录在 change buffer，但之后由于马上要访问这个数据页，会立即触发 merge 过程。这样随机访问 IO 的次数不会减少，反而增加了 change buffer 的维护代价。所以，对于这种业务模式来说，**change buffer 反而起到了副作用**。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%80%E4%B8%AA-SQL-%E6%9F%A5%E8%AF%A2%E8%BF%87%E7%A8%8B "一个 SQL 查询过程")一个 SQL 查询过程

假设，执行查询的语句是 select id from T where k=5。这个查询语句在索引树上查找的过程，先是通过 B+ 树从树根开始，按层搜索到叶子节点，也就是图中右下角的这个数据页，然后可以认为数据页内部通过二分法来定位记录。

-   对于普通索引来说，查找到满足条件的第一个记录 (5,500) 后，需要查找下一个记录，直到碰到第一个不满足 k=5 条件的记录。
-   对于唯一索引来说，由于索引定义了唯一性，查找到第一个满足条件的记录后，就会停止继续检索。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-5880ac0b4e638c14.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么，这个不同带来的性能差距会有多少呢？答案是，微乎其微。

你知道的，InnoDB 的数据是按数据页为单位来读写的。也就是说，当需要读一条记录的时候，并不是将这个记录本身从磁盘读出来，而是以页为单位，将其整体读入内存。在 InnoDB 中，每个数据页的大小默认是 16KB。

因为引擎是按页读写的，所以说，当找到 k=5 的记录的时候，它所在的数据页就都在内存里了。那么，对于普通索引来说，要多做的那一次“查找和判断下一条记录”的操作，就只需要一次指针寻找和一次计算。

当然，如果 k=5 这个记录刚好是这个数据页的最后一个记录，那么要取下一个记录，必须读取下一个数据页，这个操作会稍微复杂一些。

但是，我们之前计算过，对于整型字段，一个数据页可以放近千个 key，因此出现这种情况的概率会很低。所以，我们计算平均性能差异时，仍可以认为这个操作成本对于现在的 CPU 来说可以忽略不计。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E7%BC%93%E5%86%B2%E6%B1%A0-buffer-pool "缓冲池(buffer pool)")缓冲池(buffer pool)

内存的数据页是在 Buffer Pool (BP) 中管理的，在 WAL 里 Buffer Pool 起到了加速更新的作用。而实际上，Buffer Pool 还有一个更重要的作用，就是加速查询。

InnoDB 内存管理用的是最近最少使用 (Least Recently Used, LRU) 算法，这个算法的核心就是淘汰最久未使用的数据。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-cf5917f5d50a3516.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.  将LRU分为两个部分： 新生代(new sublist) 老生代(old sublist)
2.  新老生代收尾相连，即：新生代的尾(tail)连接着老生代的头(head)；
3.  新页（例如被预读的页）加入缓冲池时，只加入到老生代头部： 如果数据真正被读取（预读成功），才会加入到新生代的头部 如果数据没有被读取，则会比新生代里的“热数据页”更早被淘汰出缓冲池

线上库 buffer pool 64G

```
show variables like '%join_buffer_size%';  //8M
show variables like '%sort_buffer_size%'; //8M
show variables like '%innodb_buffer_pool_size%'; // 64G
```

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8 "索引下推")索引下推

```
mysql> select * from tuser where name like '张%' and age=10 and ismale=1;
```

![无索引下推执行流程](https://upload-images.jianshu.io/upload_images/12321605-32c099559ba3e868.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![索引下推执行流程](https://upload-images.jianshu.io/upload_images/12321605-333bf3f31548787f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Mysql%E4%BC%98%E5%8C%96%E5%99%A8 "Mysql优化器")Mysql优化器

而优化器选择索引的目的，是找到一个最优的执行方案，并用最小的代价去执行语句。在数据库里面，扫描行数是影响执行代价的因素之一。扫描的行数越少，意味着访问磁盘数据的次数越少，消耗的 CPU 资源越少。

当然，扫描行数并不是唯一的判断标准，优化器还会结合是否使用临时表、是否排序等因素进行综合判断。

我们这个简单的查询语句并没有涉及到临时表和排序，所以 MySQL 选错索引肯定是在判断扫描行数的时候出问题了。

那么，问题就是：**扫描行数是怎么判断的？**

这个统计信息就是索引的“**区分度**”。显然，一个索引上不同的值越多，这个索引的区分度就越好。而一个索引上不同的值的个数，我们称之为“基数”（cardinality）。也就是说，这个基数越大，索引的区分度越好。

我们可以使用 show index 方法，看到一个索引的基数。如图所示，就是表 t 的 show index 的结果 。虽然这个表的每一行的三个字段值都是一样的，但是在统计信息中，这三个索引的基数值并不同，而且其实都不准确。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-66b22725a0460116.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么，MySQL 是怎样得到索引的基数的呢？这里，我给你简单介绍一下 MySQL 采样统计的方法。

为什么要采样统计呢？因为把整张表取出来一行行统计，虽然可以得到精确的结果，但是代价太高了，所以只能选择“采样统计”。

采样统计的时候，InnoDB 默认会选择 N 个数据页，统计这些页面上的不同值，得到一个平均值，然后乘以这个索引的页面数，就得到了这个索引的基数。

而数据表是会持续更新的，索引统计信息也不会固定不变。所以，当变更的数据行数超过 1/M 的时候，会自动触发重新做一次索引统计。

在 MySQL 中，有两种存储索引统计的方式，可以通过设置参数 `innodb_stats_persistent` 的值来选择：

-   设置为 on 的时候，表示统计信息会持久化存储。这时，默认的 N 是 20，M 是 10。
-   设置为 off 的时候，表示统计信息只存储在内存中。这时，默认的 N 是 8，M 是 16。

**既然是统计信息不对，那就修正。analyze table t 命令，可以用来重新统计索引信息。我们来看一下执行效果。**

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E7%B4%A2%E5%BC%95%E9%80%89%E6%8B%A9%E5%BC%82%E5%B8%B8%E5%92%8C%E5%A4%84%E7%90%86 "索引选择异常和处理")索引选择异常和处理

1.  一种方法是，像我们第一个例子一样，采用 force index 强行选择一个索引。MySQL 会根据词法解析的结果分析出可能可以使用的索引作为候选项，然后在候选列表中依次判断每个索引需要扫描多少行。如果 force index 指定的索引在候选索引列表中，就直接选择这个索引，不再评估其他索引的执行代价。
2.  既然优化器放弃了使用索引 a，说明 a 还不够合适，所以第二种方法就是，我们可以考虑修改语句，引导 MySQL 使用我们期望的索引。比如，在这个例子里，显然把“order by b limit 1” 改成 “order by b,a limit 1” ，语义的逻辑是相同的。
3.  第三种方法是，在有些场景下，我们可以新建一个更合适的索引，来提供给优化器做选择，或删掉误用的索引。第三种方法是，在有些场景下，我们可以新建一个更合适的索引，来提供给优化器做选择，或删掉误用的索引。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%B4%A2%E5%BC%95%E5%AD%98%E5%82%A8 "字符串索引存储")字符串索引存储

但是，索引选取的越长，占用的磁盘空间就越大，相同的数据页能放下的索引值就越少，搜索的效率也就会越低。

第一种方式是使用倒序存储。如果你存储身份证号的时候把它倒过来存，每次查询的时候，你可以这么写：

```
mysql> select field_list from t where id_card = reverse('input_id_card_string');
```

第二种方式是使用 hash 字段。你可以在表上再创建一个整数字段，来保存身份证的校验码，同时在这个字段上创建索引。

```
mysql> alter table t add id_card_crc int unsigned, add index(id_card_crc);
```

它们的区别，主要体现在以下三个方面：

1.  从占用的额外空间来看，倒序存储方式在主键索引上，不会消耗额外的存储空间，而 hash 字段方法需要增加一个字段。当然，倒序存储方式使用 4 个字节的前缀长度应该是不够的，如果再长一点，这个消耗跟额外这个 hash 字段也差不多抵消了。
2.  在 CPU 消耗方面，倒序方式每次写和读的时候，都需要额外调用一次 reverse 函数，而 hash 字段的方式需要额外调用一次 crc32() 函数。如果只从这两个函数的计算复杂度来看的话，reverse 函数额外消耗的 CPU 资源会更小些。
3.  从查询效率上看，使用 hash 字段方式的查询性能相对更稳定一些。因为 crc32 算出来的值虽然有冲突的概率，但是概率非常小，可以认为每次查询的平均扫描行数接近 1。而倒序存储方式毕竟还是用的前缀索引的方式，也就是说还是会增加扫描行数。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E6%9C%80%E5%B7%A6%E5%89%8D%E7%BC%80%E5%8E%9F%E5%88%99 "最左前缀原则")最左前缀原则

这里，我先和你说结论吧。B+ 树这种索引结构，可以利用索引的“最左前缀”，来定位记录。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-967b2dbcda2bbc62.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E8%84%8F%E9%A1%B5 "脏页")脏页

当内存数据页跟磁盘数据页内容不一致的时候，我们称这个内存页为“脏页”。内存数据写入到磁盘后，内存和磁盘上的数据页的内容就一致了，称为“干净页”。**部分刷账页可能导致Mysql抖动**。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%BC%BA%E5%88%B6%E5%88%B7%E8%84%8F%E9%A1%B5%E7%9A%84%E5%9C%BA%E6%99%AF "强制刷脏页的场景")强制刷脏页的场景

1.  InnoDB 的 redo log 写满了。这时候系统会停止所有更新操作，把 checkpoint 往前推进，redo log 留出空间可以继续写。
2.  系统内存不足。当需要新的内存页，而内存不够用的时候，就要淘汰一些数据页，空出内存给别的数据页使用。如果淘汰的是“脏页”，就要先将脏页写到磁盘。你一定会说，这时候难道不能直接把内存淘汰掉，下次需要请求的时候，从磁盘读入数据页，然后拿 redo log 出来应用不就行了？这里其实是从性能考虑的。如果刷脏页一定会写盘，就保证了每个数据页有两种状态：
    -   一种是内存里存在，内存里就肯定是正确的结果，直接返回；
    -   另一种是内存里没有数据，就可以肯定数据文件上是正确的结果，读入内存后返回。这样的效率最高。
3.  MySQL 认为系统“空闲”的时候。当然，MySQL“这家酒店”的生意好起来可是会很快就能把粉板记满的，所以“掌柜”要合理地安排时间，即使是“生意好”的时候，也要见缝插针地找时间，只要有机会就刷一点“脏页”。
4.  MySQL 正常关闭的情况。这时候，MySQL 会把内存的脏页都 flush 到磁盘上，这样下次 MySQL 启动的时候，就可以直接从磁盘上读数据，启动速度会很快。

第一种是“redo log 写满了，要 flush 脏页”，这种情况是 InnoDB 要尽量避免的。因为出现这种情况的时候，整个系统就不能再接受更新了，所有的更新都必须堵住。如果你从监控上看，这时候更新数会跌为 0。

第二种是“内存不够用了，要先将脏页写到磁盘”，这种情况其实是常态。InnoDB 用缓冲池（buffer pool）管理内存，缓冲池中的内存页有三种状态：

-   第一种是，还没有使用的；
-   第二种是，使用了并且是干净页；
-   第三种是，使用了并且是脏页。

而当要读入的数据页没有在内存的时候，就必须到缓冲池中申请一个数据页。这时候只能把最久不使用的数据页从内存中淘汰掉：如果要淘汰的是一个干净页，就直接释放出来复用；但如果是脏页呢，就必须将脏页先刷到磁盘，变成干净页后才能复用。

所以，刷脏页虽然是常态，但是出现以下这两种情况，都是会明显影响性能的：

-   一个查询要淘汰的脏页个数太多，会导致查询的响应时间明显变长；
-   日志写满，更新全部堵住，写性能跌为 0，这种情况对敏感业务来说，是不能接受的。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%88%B7%E8%84%8F%E9%A1%B5%E9%80%9F%E5%BA%A6 "刷脏页速度")刷脏页速度

这就要用到 innodb_io_capacity 这个参数了，它会告诉 InnoDB 你的磁盘能力。这个值我建议你设置成磁盘的 IOPS。磁盘的 IOPS 可以通过 fio 这个工具来测试，下面的语句是我用来测试磁盘随机读写的命令：

然后，根据上述算得的 F1(M) 和 F2(N) 两个值，取其中较大的值记为 R，之后引擎就可以按照 innodb_io_capacity 定义的能力乘以 R% 来控制刷脏页的速度。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-21b882b7aa3fe317.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%85%B6%E4%BB%96%E9%97%AE%E9%A2%98-1 "其他问题")其他问题

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E8%A6%86%E7%9B%96%E7%B4%A2%E5%BC%95 "覆盖索引")覆盖索引

覆盖索引是指，索引上的信息足够满足查询请求，不需要再回到主键索引上去取数据。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%BD%93-MySQL-%E5%8E%BB%E6%9B%B4%E6%96%B0%E4%B8%80%E8%A1%8C%EF%BC%8C%E4%BD%86%E6%98%AF%E8%A6%81%E4%BF%AE%E6%94%B9%E7%9A%84%E5%80%BC%E8%B7%9F%E5%8E%9F%E6%9D%A5%E7%9A%84%E5%80%BC%E6%98%AF%E7%9B%B8%E5%90%8C%E7%9A%84%EF%BC%8C%E8%BF%99%E6%97%B6%E5%80%99-MySQL-%E4%BC%9A%E7%9C%9F%E7%9A%84%E5%8E%BB%E6%89%A7%E8%A1%8C%E4%B8%80%E6%AC%A1%E4%BF%AE%E6%94%B9%E5%90%97%EF%BC%9F "当 MySQL 去更新一行，但是要修改的值跟原来的值是相同的，这时候 MySQL 会真的去执行一次修改吗？")当 MySQL 去更新一行，但是要修改的值跟原来的值是相同的，这时候 MySQL 会真的去执行一次修改吗？

[https://time.geekbang.org/column/article/73479](https://time.geekbang.org/column/article/73479)

InnoDB 认真执行了“把这个值修改成 (1,2)”这个操作，该加锁的加锁，该更新的更新。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E6%88%91%E6%9F%A5%E8%BF%99%E4%B9%88%E5%A4%9A%E6%95%B0%E6%8D%AE%EF%BC%8C%E4%BC%9A%E4%B8%8D%E4%BC%9A%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%BA%93%E5%86%85%E5%AD%98%E6%89%93%E7%88%86 "我查这么多数据，会不会把数据库内存打爆")我查这么多数据，会不会把数据库内存打爆

我经常会被问到这样一个问题：我的主机内存只有 100G，现在要对一个 200G 的大表做全表扫描，会不会把数据库主机的内存用光了？

实际上，服务端并不需要保存一个完整的结果集。取数据和发数据的流程是这样的：

1.  获取一行，写到 `net_buffer` 中。这块内存的大小是由参数 `net_buffer_length` 定义的，默认是 16k。
2.  重复获取行，直到 `net_buffer` 写满，调用网络接口发出去。
3.  如果发送成功，就清空 `net_buffer`，然后继续取下一行，并写入 `net_buffer`。
4.  如果发送函数返回 `EAGAIN` 或 `WSAEWOULDBLOCK`，就表示本地网络栈（socket send buffer）写满了，进入等待。直到网络栈重新可写，再继续发送。

也就是说，MySQL 是“**边读边发的**”，这个概念很重要。这就意味着，如果客户端接收得慢，会导致 MySQL 服务端由于结果发不出去，这个事务的执行时间变长。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E8%AF%BB%E5%86%99%E5%88%86%E7%A6%BB-%E8%BF%87%E6%9C%9F%E8%AF%BB%E9%97%AE%E9%A2%98 "读写分离 - 过期读问题")读写分离 - 过期读问题

这种“在从库上会读到系统的一个过期状态”的现象，在这篇文章里，我们暂且称之为“过期读”。  
不论哪种结构，客户端都希望查询从库的数据结果，跟查主库的数据结果是一样的。

1.  强制走主库方案；
2.  sleep 方案；
3.  判断主备无延迟方案； `show slave status` ，判断 seconds_behind_master 是否已经等于 0。如果还不等于 0 ，那就必须等到这个参数变为 0 才能执行查询请求。
4.  配合 semi-sync 方案，要解决这个问题，就要引入半同步复制，也就是 semi-sync replication，

-   事务提交的时候，主库把 binlog 发给从库；
-   从库收到 binlog 以后，发回给主库一个 ack，表示收到了；
-   主库收到这个 ack 以后，才能给客户端返回“事务完成”的确认。
-   也就是说，如果启用了 semi-sync，就表示所有给客户端发送过确认的事务，都确保了备库已经收到了这个日志。

5.  等主库位点方案；
    -   Master_Log_File 和 Read_Master_Log_Pos，表示的是读到的主库的最新位点；
    -   Relay_Master_Log_File 和 Exec_Master_Log_Pos，表示的是备库执行的最新位点。
    -   如果 Master_Log_File 和 Relay_Master_Log_File、Read_Master_Log_Pos 和Exec_Master_Log_Pos 这两组值完全相同，就表示接收到的日志已经同步完成。
6.  等 GTID 方案，对比 GTID 集合确保主备无延迟。
    -   Auto_Position=1 ，表示这对主备关系使用了 GTID 协议。
    -   Retrieved_Gtid_Set，是备库收到的所有日志的 GTID 集合；
    -   Executed_Gtid_Set，是备库所有已经执行完成的 GTID 集合。

但是，semi-sync+ 位点判断的方案，只对一主一备的场景是成立的。在一主多从场景中，主库只要等到一个从库的 ack，就开始给客户端返回确认。这时，在从库上执行查询请求，就有两种情况：

1.  如果查询是落在这个响应了 ack 的从库上，是能够确保读到最新数据；
2.  但如果是查询落到其他从库上，它们可能还没有收到最新的日志，就会产生过期读的问题。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%BA%8B%E5%8A%A1 "事务")事务

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%BD%93%E5%89%8D%E8%AF%BB-%EF%BC%8C%E5%BF%AB%E7%85%A7%E8%AF%BB "当前读 ，快照读")当前读 ，快照读

![image.png](https://upload-images.jianshu.io/upload_images/12321605-24255ed96a43bc71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/12321605-4d43ad08b8f23326.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%BA%8B%E5%8A%A1%E9%9A%94%E7%A6%BB "事务隔离")事务隔离

这样，对于当前事务的启动瞬间来说，一个数据版本的 row trx_id，有以下几种可能：

1.  如果落在绿色部分，表示这个版本是已提交的事务或者是当前事务自己生成的，这个数据是可见的；
2.  如果落在红色部分，表示这个版本是由将来启动的事务生成的，是肯定不可见的；
3.  如果落在黄色部分，那就包括两种情况
    -   a. 若 row trx_id 在数组中，表示这个版本是由还没提交的事务生成的，不可见；
    -   b. 若 row trx_id 不在数组中，表示这个版本是已经提交了的事务生成的，可见。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-4951deb7d23236a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

一个数据版本，对于一个事务视图来说，除了自己的更新总是可见以外，有三种情况：

1.  版本未提交，不可见；
2.  版本已提交，但是是在视图创建后提交的，不可见；
3.  版本已提交，而且是在视图创建前提交的，可见。

## [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E9%94%81 "锁")锁

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%8A%A0%E9%94%81%E5%8E%9F%E5%88%99 "加锁原则")加锁原则

我总结的加锁规则里面，包含了两个“原则”、两个“优化”和一个“bug”。

-   原则 1：加锁的基本单位是 next-key lock。希望你还记得，next-key lock 是前开后闭区间。
-   原则 2：查找过程中访问到的对象才会加锁。
-   优化 1：索引上的等值查询，给唯一索引加锁的时候，next-key lock 退化为行锁。
-   优化 2：索引上的等值查询，向右遍历时且最后一个值不满足等值条件的时候，next-key lock 退化为间隙锁。
-   一个 bug：唯一索引上的范围查询会访问到不满足条件的第一个值为止。

[https://time.geekbang.org/column/article/75659](https://time.geekbang.org/column/article/75659)

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E9%94%81%E7%B2%92%E5%BA%A6 "锁粒度")锁粒度

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%85%A8%E5%B1%80%E9%94%81 "全局锁")全局锁

全局锁顾名思义，全局锁就是对整个数据库实例加锁。MySQL 提供了一个加全局读锁的方法，命令是 Flush tables with read lock (FTWRL)。当你需要让整个库处于只读状态的时候，可以使用这个命令，之后其他线程的以下语句会被阻塞：数据更新语句（数据的增删改）、数据定义语句（包括建表、修改表结构等）和更新类事务的提交语句。

全局锁的典型使用场景是，做全库逻辑备份。也就是把整库每个表都 select 出来存成文本。

##### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%A4%87%E4%BB%BD "备份")备份

官方自带的逻辑备份工具是 mysqldump。当 mysqldump 使用参数–single-transaction 的时候，导数据之前就会启动一个事务，来确保拿到一致性视图。而由于 MVCC 的支持，这个过程中数据是可以正常更新的。

所以，**single-transaction 方法只适用于所有的表使用事务引擎的库**。如果有的表使用了不支持事务的引擎，那么备份就只能通过 FTWRL 方法。这往往是 DBA 要求业务开发人员使用 InnoDB 替代 MyISAM 的原因之一。

你也许会问，既然要全库只读，为什么不使用 set global readonly=true 的方式呢？确实 readonly 方式也可以让全库进入只读状态，但我还是会建议你用 FTWRL 方式，主要有两个原因：

-   一是，在有些系统中，readonly 的值会被用来做其他逻辑，比如用来判断一个库是主库还是备库。因此，修改 global 变量的方式影响面更大，我不建议你使用。
-   二是，在异常处理机制上有差异。如果执行 FTWRL 命令之后由于客户端发生异常断开，那么 MySQL 会自动释放这个全局锁，整个库回到可以正常更新的状态。而将整个库设置为 readonly 之后，如果客户端发生异常，则数据库就会一直保持 readonly 状态，这样会导致整个库长时间处于不可写状态，风险较高。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E8%A1%A8%E7%BA%A7%E5%88%AB%E9%94%81 "表级别锁")表级别锁

MySQL 里面表级别的锁有两种：一种是表锁，一种是元数据锁（meta data lock，MDL)。

表锁的语法是 lock tables … read/write。与 FTWRL 类似，可以用 unlock tables 主动释放锁，也可以在客户端断开的时候自动释放。需要注意，lock tables 语法除了会限制别的线程的读写外，也限定了本线程接下来的操作对象。

举个例子, 如果在某个线程 A 中执行 lock tables t1 read, t2 write; 这个语句，则其他线程写 t1、读写 t2 的语句都会被阻塞。同时，线程 A 在执行 unlock tables 之前，也只能执行读 t1、读写 t2 的操作。连写 t1 都不允许，自然也不能访问其他表。

另一类表级的锁是 MDL（metadata lock)。MDL 不需要显式使用，在访问一个表的时候会被自动加上。MDL 的作用是，保证读写的正确性。你可以想象一下，如果一个查询正在遍历一个表中的数据，而执行期间另一个线程对这个表结构做变更，删了一列，那么查询线程拿到的结果跟表结构对不上，肯定是不行的。

-   因此，在 MySQL 5.5 版本中引入了 MDL，当对一个表做增删改查操作的时候，加 MDL 读锁；当要对表做结构变更操作的时候，加 MDL 写锁。
-   读锁之间不互斥，因此你可以有多个线程同时对一张表增删改查。读写锁之间、写锁之间是互斥的，用来保证变更表结构操作的安全性。因此，如果有两个线程要同时给一个表加字段，其中一个要等另一个执行完才能开始执行。

MDL 会直到事务提交才释放，在做表结构变更的时候，你一定要小心不要导致锁住线上查询和更新。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-1ccbea6c67cff98e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们可以看到 session A 先启动，这时候会对表 t 加一个 MDL 读锁。由于 session B 需要的也是 MDL 读锁，因此可以正常执行。

之后 session C 会被 blocked，是因为 session A 的 MDL 读锁还没有释放，而 session C 需要 MDL 写锁，因此只能被阻塞。

如果只有 session C 自己被阻塞还没什么关系，但是之后所有要在表 t 上新申请 MDL 读锁的请求也会被 session C 阻塞。前面我们说了，所有对表的增删改查操作都需要先申请 MDL 读锁，就都被锁住，等于这个表现在完全不可读写了。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%A4%E9%98%B6%E6%AE%B5%E9%94%81 "两阶段锁")两阶段锁

![image.png](https://upload-images.jianshu.io/upload_images/12321605-e92660ddd0e713a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

也就是说，在 InnoDB 事务中，行锁是在需要的时候才加上的，但并不是不需要了就立刻释放，而是要等到事务结束时才释放。这个就是两阶段锁协议。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E6%AD%BB%E9%94%81%E5%92%8C%E6%AD%BB%E9%94%81%E6%A3%80%E6%B5%8B "死锁和死锁检测")死锁和死锁检测

![image.png](https://upload-images.jianshu.io/upload_images/12321605-64e9193bd1a3063e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这时候，事务 A 在等待事务 B 释放 id=2 的行锁，而事务 B 在等待事务 A 释放 id=1 的行锁。 事务 A 和事务 B 在互相等待对方的资源释放，就是进入了死锁状态。当出现死锁以后，有两种策略：

-   一种策略是，直接进入等待，直到超时。这个超时时间可以通过参数 innodb_lock_wait_timeout 来设置。
-   另一种策略是，发起死锁检测，发现死锁后，主动回滚死锁链条中的某一个事务，让其他事务得以继续执行。将参数 innodb_deadlock_detect 设置为 on，表示开启这个逻辑。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#select-%E5%92%8C-insert%E6%AD%BB%E9%94%81%E5%9C%BA%E6%99%AF "select 和 insert死锁场景")select 和 insert死锁场景

![image.png](https://upload-images.jianshu.io/upload_images/12321605-0a3fb6f1da08a56b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

你看到了，其实都不需要用到后面的 update 语句，就已经形成死锁了。我们按语句执行顺序来分析一下：

-   session A 执行 select … for update 语句，由于 id=9 这一行并不存在，因此会加上间隙锁 (5,10);
-   session B 执行 select … for update 语句，同样会加上间隙锁 (5,10)，间隙锁之间不会冲突，因此这个语句可以执行成功；
-   session B 试图插入一行 (9,9,9)，被 session A 的间隙锁挡住了，只好进入等待；
-   session A 试图插入一行 (9,9,9)，被 session B 的间隙锁挡住了。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E7%83%AD%E7%82%B9%E8%A1%8C%E9%97%AE%E9%A2%98 "热点行问题")热点行问题

那如果是我们上面说到的所有事务都要更新同一行的场景呢？  
每个新来的被堵住的线程，都要判断会不会由于自己的加入导致了死锁，这是一个时间复杂度是 O(n) 的操作。假设有 1000 个并发线程要同时更新同一行，那么死锁检测操作就是 100 万这个量级的。虽然最终检测的结果是没有死锁，但是这期间要消耗大量的 CPU 资源。因此，你就会看到 CPU 利用率很高，但是每秒却执行不了几个事务。

根据上面的分析，我们来讨论一下，**怎么解决由这种热点行更新导致的性能问题呢**？问题的症结在于，死锁检测要耗费大量的 CPU 资源。

-   一种头痛医头的方法，就是如果你能确保这个业务一定不会出现死锁，可以临时把死锁检测关掉。但是这种操作本身带有一定的风险，因为业务设计的时候一般不会把死锁当做一个严重错误，毕竟出现死锁了，就回滚，然后通过业务重试一般就没问题了，这是业务无损的。而关掉死锁检测意味着可能会出现大量的超时，这是业务有损的。
-   另一个思路是控制并发度。根据上面的分析，你会发现如果并发能够控制住，比如同一行同时最多只有 10 个线程在更新，那么死锁检测的成本很低，就不会出现这个问题。一个直接的想法就是，在客户端做并发控制。但是，你会很快发现这个方法不太可行，因为客户端很多。我见过一个应用，有 600 个客户端，这样即使每个客户端控制到只有 5 个并发线程，汇总到数据库服务端以后，峰值并发数也可能要达到 3000。

因此，这个并发控制要做在数据库服务端。如果你有中间件，可以考虑在中间件实现；如果你的团队有能修改 MySQL 源码的人，也可以做在 MySQL 里面。基本思路就是，对于相同行的更新，在进入引擎之前排队。这样在 InnoDB 内部就不会有大量的死锁检测工作了。

要访问的行上有锁，他才要死锁检测。

## [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Order-by-%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86 "Order by 实现原理")Order by 实现原理

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%85%A8%E5%AD%97%E6%AE%B5%E6%8E%92%E5%BA%8F "全字段排序")全字段排序

```
select city,name,age 
CREATE TABLE `t` (
  `id` int(11) NOT NULL,
  `city` varchar(16) NOT NULL,
  `name` varchar(16) NOT NULL,
  `age` int(11) NOT NULL,
  `addr` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city` (`city`)
) ENGINE=InnoDB;

select from t where city='杭州' order by name limit 1000  ;
```

![image.png](https://upload-images.jianshu.io/upload_images/12321605-add9a6a6719df461.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.  初始化 sort_buffer，确定放入 name、city、age 这三个字段；
2.  从索引 city 找到第一个满足 city=’杭州’条件的主键 id，也就是图中的 ID_X；
3.  到主键 id 索引取出整行，取 name、city、age 三个字段的值，存入 sort_buffer 中；
4.  从索引 city 取下一个记录的主键 id；
5.  重复步骤 3、4 直到 city 的值不满足查询条件为止，对应的主键 id 也就是图中的 ID_Y；
6.  对 sort_buffer 中的数据按照字段 name 做快速排序；按照排序结果取前 1000 行返回给客户端。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-82eda72c93d03354.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`sort_buffer_size`，就是 MySQL 为排序开辟的内存（sort_buffer）的大小。如果要排序的数据量小于 `sort_buffer_size`，排序就在内存中完成。但如果排序数据量太大，内存放不下，则不得不利用磁盘临时文件辅助排序。

你可以用下面介绍的方法，来确定一个排序语句是否使用了临时文件

```
/* 打开optimizer_trace，只对本线程有效 */
SET optimizer_trace='enabled=on'; 

/* @a保存Innodb_rows_read的初始值 */
select VARIABLE_VALUE into @a from  performance_schema.session_status where variable_name = 'Innodb_rows_read';

/* 执行语句 */
select city, name,age from t where city='杭州' order by name limit 1000; 

/* 查看 OPTIMIZER_TRACE 输出 */
SELECT * FROM `information_schema`.`OPTIMIZER_TRACE`\G

/* @b保存Innodb_rows_read的当前值 */
select VARIABLE_VALUE into @b from performance_schema.session_status where variable_name = 'Innodb_rows_read';

/* 计算Innodb_rows_read差值 */
select @b-@a;
```

这个方法是通过查看 OPTIMIZER_TRACE 的结果来确认的，你可以从 `number_of_tmp_files` 中看到是否使用了临时文件。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-b99aa8b9dfcfbebb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`number_of_tmp_files` 表示的是，排序过程中使用的临时文件数。你一定奇怪，为什么需要 12 个文件？内存放不下时，就需要使用外部排序，**外部排序一般使用归并排序算法**。可以这么简单理解，MySQL 将需要排序的数据分成 12 份，每一份单独排序后存在这些临时文件中。然后把这 12 个有序文件再合并成一个有序的大文件。

我们的示例表中有 4000 条满足 city=’杭州’的记录，所以你可以看到 examined_rows=4000，表示参与排序的行数是 4000 行。

sort_mode 里面的 packed_additional_fields 的意思是，排序过程对字符串做了“紧凑”处理。即使 name 字段的定义是 varchar(16)，在排序过程中还是要按照实际长度来分配空间的。

同时，最后一个查询语句 select @b-@a 的返回结果是 4000，表示整个执行过程只扫描了 4000 行。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#rowid-%E6%8E%92%E5%BA%8F "rowid 排序")rowid 排序

如果 MySQL 认为排序的单行长度太大会怎么做呢？

`max_length_for_sort_data`，是 MySQL 中专门控制用于排序的行数据的长度的一个参数。它的意思是，如果单行的长度超过这个值，MySQL 就认为单行太大，要换一个算法。

新的算法放入 sort_buffer 的字段，只有要排序的列（即 name 字段）和主键 id。

1.  始化 sort_buffer，确定放入两个字段，即 name 和 id；
2.  从索引 city 找到第一个满足 city=’杭州’条件的主键 id，也就是图中的 ID_X；
3.  到主键 id 索引取出整行，取 name、id 这两个字段，存入 sort_buffer 中；
4.  从索引 city 取下一个记录的主键 id；
5.  重复步骤 3、4 直到不满足 city=’杭州’条件为止，也就是图中的 ID_Y；
6.  对 sort_buffer 中的数据按照字段 name 进行排序；
7.  遍历排序结果，取前 1000 行，并按照 id 的值回到原表中取出 city、name 和 age 三个字段返回给客户端。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-378fffb77a7ad391.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/12321605-830abf5d761db5dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

现在，我们就来看看结果有什么不同。

-   首先，图中的 examined_rows 的值还是 4000，表示用于排序的数据是 4000 行。但是 select @b-@a 这个语句的值变成 5000 了。
-   因为这时候除了排序过程外，在排序完成后，还要根据 id 去原表取值。由于语句是 limit 1000，因此会多读 1000 行。

从 OPTIMIZER_TRACE 的结果中，你还能看到另外两个信息也变了。

-   sort_mode 变成了 ，表示参与排序的只有 name 和 id 这两个字段。
-   number_of_tmp_files 变成 10 了，是因为这时候参与排序的行数虽然仍然是 4000 行，但是每一行都变小了，因此需要排序的总数据量就变小了，需要的临时文件也相应地变少了。

## [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Join-%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86 "Join 实现原理")Join 实现原理

```
CREATE TABLE `t2` (
  `id` int(11) NOT NULL,
  `a` int(11) DEFAULT NULL,
  `b` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `a` (`a`)
) ENGINE=InnoDB;

drop procedure idata;
delimiter ;;
create procedure idata()
begin
  declare i int;
  set i=1;
  while(i<=1000)do
    insert into t2 values(i, i, i);
    set i=i+1;
  end while;
end;;
delimiter ;
call idata();

create table t1 like t2;
insert into t1 (select * from t2 where id<=100)
```

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Index-Nested-Loop-Join-NLJ-%EF%BC%88%E6%97%A0join-buffer%EF%BC%89 "Index Nested-Loop Join - NLJ （无join_buffer）")Index Nested-Loop Join - NLJ （无join_buffer）

```
select * from t1 straight_join t2 on (t1.a=t2.a);
```

如果直接使用 join 语句，MySQL 优化器可能会选择表 t1 或 t2 作为驱动表，这样会影响我们分析 SQL 语句的执行过程。所以，为了便于分析执行过程中的性能问题，我改用 straight_join 让 MySQL 使用固定的连接方式执行查询，这样优化器只会按照我们指定的方式去 join。在这个语句里，t1 是驱动表，t2 是被驱动表。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-c1b57f4a9e0419e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，在这条语句里，被驱动表 t2 的字段 a 上有索引，join 过程用上了这个索引，因此这个语句的执行流程是这样的：

1.  从表 t1 中读入一行数据 R；
2.  从数据行 R 中，取出 a 字段到表 t2 里去查找；
3.  取出表 t2 中满足条件的行，跟 R 组成一行，作为结果集的一部分；
4.  重复执行步骤 1 到 3，直到表 t1 的末尾循环结束。

这个过程是先遍历表 t1，然后根据从表 t1 中取出的每行数据中的 a 值，去表 t2 中查找满足条件的记录。在形式上，这个过程就跟我们写程序时的嵌套查询类似，并且可以用上被驱动表的索引，所以我们称之为“Index Nested-Loop Join”，简称 NLJ。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-9acb602e169b749f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在这个流程里：

1.  对驱动表 t1 做了全表扫描，这个过程需要扫描 100 行；
2.  而对于每一行 R，根据 a 字段去表 t2 查找，走的是树搜索过程。由于我们构造的数据都是一一对应的，因此每次的搜索过程都只扫描一行，也是总共扫描 100 行；
3.  所以，整个执行流程，总扫描行数是 200。

到这里小结一下，通过上面的分析我们得到了两个结论：

1.  使用 join 语句，性能比强行拆成多个单表执行 SQL 语句的性能要好；
2.  如果使用 join 语句的话，需要让小表做驱动表。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Simple-Nested-Loop-Join-%EF%BC%88%E6%97%A0join-buffer-mysql-%E6%B2%A1%E7%94%A8%EF%BC%89 "Simple Nested-Loop Join （无join_buffer - mysql 没用）")Simple Nested-Loop Join （无join_buffer - mysql 没用）

```
select * from t1 straight_join t2 on (t1.a=t2.b);
```

由于表 t2 的字段 b 上没有索引，因此再用图 2 的执行流程时，每次到 t2 去匹配的时候，就要做一次全表扫描。

你可以先设想一下这个问题，继续使用图 2 的算法，是不是可以得到正确的结果呢？如果只看结果的话，这个算法是正确的，而且这个算法也有一个名字，叫做“Simple Nested-Loop Join”。

但是，这样算来，这个 SQL 请求就要扫描表 t2 多达 100 次，总共扫描 100*1000=10 万行。

这还只是两个小表，如果 t1 和 t2 都是 10 万行的表（当然了，这也还是属于小表的范围），就要扫描 100 亿行，这个算法看上去太“笨重”了。

当然**，MySQL 也没有使用这个 Simple Nested-Loop Join 算法**，而是使用了另一个叫作“Block Nested-Loop Join”的算法，简称 BNL。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Block-Nested-Loop-Join-BNL-%EF%BC%88%E6%9C%89-join-buffer%EF%BC%89 "Block Nested-Loop Join - BNL （有 join_buffer）")Block Nested-Loop Join - BNL （有 join_buffer）

这时候，被驱动表上没有可用的索引，算法的流程是这样的：

1.  把表 t1 的数据读入线程内存 join_buffer 中，由于我们这个语句中写的是 select *，因此是把整个表 t1 放入了内存；
2.  扫描表 t2，把表 t2 中的每一行取出来，跟 join_buffer 中的数据做对比，满足 join 条件的，作为结果集的一部分返回。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-95f132a8113eebab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/12321605-89b38f61b4f9f067.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，在这个过程中，对表 t1 和 t2 都做了一次全表扫描，因此总的扫描行数是 1100。由于 join_buffer 是以无序数组的方式组织的，因此对表 t2 中的每一行，都要做 100 次判断，总共需要在内存中做的判断次数是：100*1000=10 万次。

`join_buffer` 的大小是由参数 `join_buffer_size` 设定的，默认值是 256k。如果放不下表 t1 的所有数据话，策略很简单，就是分段放。我把 `join_buffer_size` 改成 1200，再执行：

```
select * from t1 straight_join t2 on (t1.a=t2.b);
```

执行过程就变成了：

1.  扫描表 t1，顺序读取数据行放入 join_buffer 中，放完第 88 行 join_buffer 满了，继续第 2 步；
2.  扫描表 t2，把 t2 中的每一行取出来，跟 join_buffer 中的数据做对比，满足 join 条件的，作为结果集的一部分返回；
3.  清空 join_buffer；
4.  继续扫描表 t1，顺序读取最后的 12 行数据放入 join_buffer 中，继续执行第 2 步。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-97a082ef3ba4bb5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

图中的步骤 4 和 5，表示清空 join_buffer 再复用。

这个流程才体现出了这个算法名字中“Block”的由来，表示“分块去 join”。

可以看到，这时候由于表 t1 被分成了两次放入 join_buffer 中，导致表 t2 会被扫描两次。虽然分成两次放入 join_buffer，但是判断等值条件的次数还是不变的，依然是 (88+12)*1000=10 万次。

第一个问题：能不能使用 join 语句？

1.  如果可以使用 Index Nested-Loop Join 算法，也就是说可以用上被驱动表上的索引，其实是没问题的；
2.  如果使用 Block Nested-Loop Join 算法，扫描行数就会过多。尤其是在大表上的 join 操作，这样可能要扫描被驱动表很多次，会占用大量的系统资源。所以这种 join 尽量不要用。

所以你在判断要不要使用 join 语句时，就是看 explain 结果里面，Extra 字段里面有没有出现“Block Nested Loop”字样。

第二个问题是：如果要使用 join，应该选择大表做驱动表还是选择小表做驱动表？

1.  如果是 Index Nested-Loop Join 算法，应该选择小表做驱动表；
2.  如果是 Block Nested-Loop Join 算法：
    -   在 join_buffer_size 足够大的时候，是一样的；
    -   在 join_buffer_size 不够大的时候（这种情况更常见），应该选择小表做驱动表。

所以，更准确地说，在决定哪个表做驱动表的时候，应该是两个表按照各自的条件过滤，过滤完成之后，计算参与 join 的各个字段的总数据量，数据量小的那个表，就是“小表”，应该作为驱动表。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#BNL-%E7%AE%97%E6%B3%95%E7%9A%84%E6%80%A7%E8%83%BD%E9%97%AE%E9%A2%98 "BNL 算法的性能问题")BNL 算法的性能问题

我们说到 InnoDB 的 LRU 算法的时候提到，由于 InnoDB 对 Bufffer Pool 的 LRU 算法做了优化，即：第一次从磁盘读入内存的数据页，会先放在 old 区域。如果 1 秒之后这个数据页不再被访问了，就不会被移动到 LRU 链表头部，这样对 Buffer Pool 的命中率影响就不大。

但是，如果一个使用 BNL 算法的 join 语句，多次扫描一个冷表，而且这个语句执行时间超过 1 秒，就会在再次扫描冷表的时候，把冷表的数据页移到 LRU 链表头部。

这种情况对应的，是冷表的数据量小于整个 Buffer Pool 的 3/8，能够完全放入 old 区域的情况。

如果这个冷表很大，就会出现另外一种情况：业务正常访问的数据页，没有机会进入 young 区域。

由于优化机制的存在，一个正常访问的数据页，要进入 young 区域，需要隔 1 秒后再次被访问到。但是，由于我们的 join 语句在循环读磁盘和淘汰内存页，进入 old 区域的数据页，很可能在 1 秒之内就被淘汰了。这样，就会导致这个 MySQL 实例的 Buffer Pool 在这段时间内，young 区域的数据页没有被合理地淘汰。

也就是说，这两种情况都会影响 Buffer Pool 的正常运作。

大表 join 操作虽然对 IO 有影响，但是在语句执行结束后，对 IO 的影响也就结束了。但是，对 Buffer Pool 的影响就是持续性的，需要依靠后续的查询请求慢慢恢复内存命中率。

也就是说，BNL 算法对系统的影响主要包括三个方面：

1.  可能会多次扫描被驱动表，占用磁盘 IO 资源；
2.  判断 join 条件需要执行 M*N 次对比（M、N 分别是两张表的行数），如果是大表就会占用非常多的 CPU 资源；
3.  可能会导致 Buffer Pool 的热数据被淘汰，影响内存命中率。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Multi-Range-Read-%E4%BC%98%E5%8C%96 "Multi-Range Read 优化")Multi-Range Read 优化

在介绍 join 语句的优化方案之前，我需要先和你介绍一个知识点，即：Multi-Range Read 优化 (MRR)。这个优化的主要目的是尽量使用顺序读盘。

主键索引是一棵 B+ 树，在这棵树上，每次只能根据一个主键 id 查到一行数据。因此，回表肯定是一行行搜索主键索引的，基本流程如图 1 所示。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-183dd8d210bc98e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果随着 a 的值递增顺序查询的话，**id 的值就变成随机的**，那么就会出现随机访问，性能相对较差。虽然“按行查”这个机制不能改，但是调整查询的顺序，还是能够加速的。

因为大多数的数据都是按照主键递增顺序插入得到的，所以我们可以认为，如果按照主键的递增顺序查询的话，对磁盘的读比较接近顺序读，能够提升读性能。

这就是 MRR 优化的设计思路。此时，语句的执行流程变成了这样：

1.  根据索引 a，定位到满足条件的记录，将 id 值放入 read_rnd_buffer 中 ;
2.  将 read_rnd_buffer 中的 id 进行递增排序；
3.  排序后的 id 数组，依次到主键 id 索引中查记录，并作为结果返回。

这里，read_rnd_buffer 的大小是由 read_rnd_buffer_size 参数控制的。如果步骤 1 中，read_rnd_buffer 放满了，就会先执行完步骤 2 和 3，然后清空 read_rnd_buffer。之后继续找索引 a 的下个记录，并继续循环。

另外需要说明的是，如果你想要稳定地使用 MRR 优化的话，需要设置set optimizer_switch=”mrr_cost_based=off”。（官方文档的说法，是现在的优化器策略，判断消耗的时候，会更倾向于不使用 MRR，把 mrr_cost_based 设置为 off，就是固定使用 MRR 了。）

![image.png](https://upload-images.jianshu.io/upload_images/12321605-83dda4dd3e250e4f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/12321605-814460f0b60c64c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

MRR 能够提升性能的核心在于，这条查询语句在索引 a 上做的是一个范围查询（也就是说，这是一个多值查询），可以得到足够多的主键 id。这样通过排序以后，再去主键索引查数据，才能体现出“顺序性”的优势。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Batched-Key-Access-BKA-%EF%BC%88NLJ-join-buffer%EF%BC%89 "Batched Key Access - BKA （NLJ - join_buffer）")Batched Key Access - BKA （NLJ - join_buffer）

![image.png](https://upload-images.jianshu.io/upload_images/12321605-af4e048ecf38627d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

NLJ 算法执行的逻辑是：**从驱动表 t1，一行行地取出 a 的值**，再到被驱动表 t2 去做 join。也就是说，对于表 t2 来说，每次都是匹配一个值。这时，MRR 的优势就用不上了。

那怎么才能一次性地多传些值给表 t2 呢？方法就是，从表 t1 里一次性地多拿些行出来，一起传给表 t2。

既然如此，我们就把表 t1 的数据取出来一部分，先放到一个临时内存。这个临时内存不是别人，就是 join_buffer。

通过上一篇文章，我们知道 `join_buffer` 在 BNL 算法里的作用，是暂存驱动表的数据。但是在 NLJ 算法里并没有用。那么，我们刚好就可以复用 `join_buffer` 到 BKA 算法中。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-750b48f0ee00b608.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%B4%E6%97%B6%E8%A1%A8%E5%8E%BBjoin "临时表去join")临时表去join

```
select * from t1 join t2 on (t1.b=t2.b) where t2.b>=1 and t2.b<=2000;
```

我们在文章开始的时候，在表 t2 中插入了 100 万行数据，但是经过 where 条件过滤后，需要参与 join 的只有 2000 行数据。如果这条语句同时是一个低频的 SQL 语句，那么再为这个语句在表 t2 的字段 b 上创建一个索引就很浪费了。

但是，如果使用 BNL 算法来 join 的话，这个语句的执行流程是这样的：

1.  把表 t1 的所有字段取出来，存入 join_buffer 中。这个表只有 1000 行，join_buffer_size 默认值是 256k，可以完全存入。
2.  扫描表 t2，取出每一行数据跟 join_buffer 中的数据进行对比，
    -   如果不满足 t1.b=t2.b，则跳过；
    -   如果满足 t1.b=t2.b, 再判断其他条件，也就是是否满足 t2.b 处于[1,2000]的条件，如果是，就作为结果集的一部分返回，否则跳过。

我在上一篇文章中说过，对于表 t2 的每一行，判断 join 是否满足的时候，都需要遍历 join_buffer 中的所有行。因此判断等值条件的次数是 1000*100 万 =10 亿次，这个判断的工作量很大。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-c93c567cd51dd9c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
![image.png](https://upload-images.jianshu.io/upload_images/12321605-cd13a7493613b65b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，explain 结果里 Extra 字段显示使用了 BNL 算法。在我的测试环境里，这条语句需要执行 1 分 11 秒。

这时候，我们可以考虑使用临时表。使用临时表的大致思路是：

1.  把表 t2 中满足条件的数据放在临时表 tmp_t 中；
2.  为了让 join 使用 BKA 算法，给临时表 tmp_t 的字段 b 加上索引；
3.  让表 t1 和 tmp_t 做 join 操作。

此时，对应的 SQL 语句的写法如下：

```
create temporary table temp_t(id int primary key, a int, b int, index(b))engine=innodb;
insert into temp_t select * from t2 where b>=1 and b<=2000;
select * from t1 join temp_t on (t1.b=temp_t.b);
```

![image.png](https://upload-images.jianshu.io/upload_images/12321605-c7ab0399b824b793.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.  执行 insert 语句构造 temp_t 表并插入数据的过程中，对表 t2 做了全表扫描，这里扫描行数是 100 万。
2.  之后的 join 语句，扫描表 t1，这里的扫描行数是 1000；join 比较过程中，做了 1000 次带索引的查询。相比于优化前的 join 语句需要做 10 亿次条件判断来说，这个优化效果还是很明显的。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E6%89%A9%E5%B1%95hash-join "扩展hash join")扩展hash join

看到这里你可能发现了，其实上面计算 10 亿次那个操作，看上去有点儿傻。如果 join_buffer 里面维护的不是一个无序数组，而是一个哈希表的话，那么就不是 10 亿次判断，而是 100 万次 hash 查找。这样的话，整条语句的执行速度就快多了吧？

这，也正是 MySQL 的优化器和执行器一直被诟病的一个原因：不支持哈希 join。并且，MySQL 官方的 roadmap，也是迟迟没有把这个优化排上议程。

实际上，这个优化思路，我们可以自己实现在业务端。实现流程大致如下：

1.  select * from t1;取得表 t1 的全部 1000 行数据，在业务端存入一个 hash 结构，比如 C++ 里的 set、PHP 的数组这样的数据结构。
2.  select * from t2 where b>=1 and b<=2000; 获取表 t2 中满足条件的 2000 行数据。
3.  把这 2000 行数据，一行一行地取到业务端，到 hash 结构的数据表中寻找匹配的数据。满足匹配的条件的这行数据，就作为结果集的一行。

## [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%B4%E6%97%B6%E8%A1%A8 "临时表")临时表

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%B8%B4%E6%97%B6%E8%A1%A8%E7%9A%84%E7%89%B9%E7%82%B9 "临时表的特点")临时表的特点

1.  建表语法是 create temporary table …。
2.  一个临时表只能被创建它的 session 访问，对其他线程不可见。所以，图中 session A 创建的临时表 t，对于 session B 就是不可见的。
3.  临时表可以与普通表同名。
4.  session A 内有同名的临时表和普通表的时候，show create 语句，以及增删改查语句访问的是临时表。session A 内有同名的临时表和普通表的时候，show create 语句，以及增删改查语句访问的是临时表。
5.  show tables 命令不显示临时表。

由于临时表只能被创建它的 session 访问，所以在这个 session 结束的时候，会自动删除临时表。也正是由于这个特性，临时表就特别适合我们文章开头的 join 优化这种场景。为什么呢？

原因主要包括以下两个方面：

1.  不同 session 的临时表是可以重名的，如果有多个 session 同时执行 join 优化，不需要担心表名重复导致建表失败的问题。
2.  不需要担心数据删除问题。如果使用普通表，在流程执行过程中客户端发生了异常断开，或者数据库发生异常重启，还需要专门来清理中间过程中生成的数据表。而临时表由于会自动回收，所以不需要这个额外的操作。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%86%85%E5%AD%98%E4%B8%B4%E6%97%B6%E8%A1%A8 "内存临时表")内存临时表

```
mysql> CREATE TABLE `words` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `word` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

delimiter ;;
create procedure idata()
begin
  declare i int;
  set i=0;
  while i<10000 do
    insert into words(word) values(concat(char(97+(i div 1000)), char(97+(i % 1000 div 100)), char(97+(i % 100 div 10)), char(97+(i % 10))));
    set i=i+1;
  end while;
end;;
delimiter ;

call idata();
```

这个语句的意思很直白，随机排序取前 3 个。虽然这个 SQL 语句写法很简单，但执行流程却有点复杂的。

```
mysql> select word from words order by rand() limit 3;
```

我们先用 explain 命令来看看这个语句的执行情况。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-19f40953fafe8881.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.  创建一个临时表。这个临时表使用的是 memory 引擎，表里有两个字段，第一个字段是 double 类型，为了后面描述方便，记为字段 R，第二个字段是 varchar(64) 类型，记为字段 W。并且，这个表没有建索引。
2.  从 words 表中，按主键顺序取出所有的 word 值。对于每一个 word 值，调用 rand() 函数生成一个大于 0 小于 1 的随机小数，并把这个随机小数和 word 分别存入临时表的 R 和 W 字段中，到此，扫描行数是 10000。
3.  现在临时表有 10000 行数据了，接下来你要在这个没有索引的内存临时表上，按照字段 R 排序。
4.  初始化 sort_buffer。sort_buffer 中有两个字段，一个是 double 类型，另一个是整型。
5.  从内存临时表中一行一行地取出 R 值和位置信息（我后面会和你解释这里为什么是“位置信息”），分别存入 sort_buffer 中的两个字段里。这个过程要对内存临时表做全表扫描，此时扫描行数增加 10000，变成了 20000。
6.  在 sort_buffer 中根据 R 的值进行排序。注意，这个过程没有涉及到表操作，所以不会增加扫描行数。
7.  排序完成后，取出前三个结果的位置信息，依次到内存临时表中取出 word 值，返回给客户端。这个过程中，访问了表的三行数据，总扫描行数变成了 20003。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-184b04aae91a1b8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E7%A3%81%E7%9B%98%E4%B8%B4%E6%97%B6%E8%A1%A8 "磁盘临时表")磁盘临时表

其实不是的。tmp_table_size 这个配置限制了内存临时表的大小，默认值是 16M。如果临时表大小超过了 tmp_table_size，那么内存临时表就会转成磁盘临时表。

磁盘临时表使用的引擎默认是 InnoDB，是由参数 internal_tmp_disk_storage_engine 控制的。

```
set tmp_table_size=1024;
set sort_buffer_size=32768;
set max_length_for_sort_data=16;
/* 打开 optimizer_trace，只对本线程有效 */
SET optimizer_trace='enabled=on'; 

/* 执行语句 */
select word from words order by rand() limit 3;

/* 查看 OPTIMIZER_TRACE 输出 */
SELECT * FROM `information_schema`.`OPTIMIZER_TRACE`\G
```

![image.png](https://upload-images.jianshu.io/upload_images/12321605-1b6eb162e47ef602.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

因为将 max_length_for_sort_data 设置成 16，小于 word 字段的长度定义，所以我们看到 sort_mode 里面显示的是 rowid 排序，这个是符合预期的，参与排序的是随机值 R 字段和 rowid 字段组成的行。

这个 SQL 语句的排序确实没有用到临时文件，采用是 MySQL 5.6 版本引入的一个新的排序算法，即：优先队列排序算法。接下来，我们就看看为什么没有使用临时文件的算法，也就是归并排序算法，而是采用了优先队列排序算法。

这个 SQL 语句的排序确实没有用到临时文件，采用是 MySQL 5.6 版本引入的一个新的排序算法，即：优先队列排序算法。接下来，我们就看看为什么没有使用临时文件的算法，也就是归并排序算法，而是采用了优先队列排序算法。

其实，我们现在的 SQL 语句，只需要取 R 值最小的 3 个 rowid。但是，如果使用归并排序算法的话，虽然最终也能得到前 3 个值，但是这个算法结束后，已经将 10000 行数据都排好序了。

图 5 的 OPTIMIZER_TRACE 结果中，filesort_priority_queue_optimization 这个部分的 chosen=true，就表示使用了优先队列排序算法，这个过程不需要临时文件，因此对应的 number_of_tmp_files 是 0。

你可能会问，这里也用到了 limit，为什么没用优先队列排序算法呢？原因是，这条 SQL 语句是 limit 1000，如果使用优先队列算法的话，需要维护的堆的大小就是 1000 行的 (name,rowid)，超过了我设置的 sort_buffer_size 大小，所以只能使用归并排序算法。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E4%BC%9A%E4%BD%BF%E7%94%A8%E4%B8%B4%E6%97%B6%E8%A1%A8 "什么时候会使用临时表")什么时候会使用临时表

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#union-%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B "union 执行流程")union 执行流程

```
create table t1(id int primary key, a int, b int, index(a));
delimiter ;;
create procedure idata()
begin
  declare i int;

  set i=1;
  while(i<=1000)do
    insert into t1 values(i, i, i);
    set i=i+1;
  end while;
end;;
delimiter ;
call idata();
```

然后，我们执行下面这条语句：

```
(select 1000 as f) union (select id from t1 order by id desc limit 2);
```

这条语句用到了 union，它的语义是，取这两个子查询结果的并集。并集的意思就是这两个集合加起来，重复的行只保留一行。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-4001801f06638ca4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

-   第二行的 key=PRIMARY，说明第二个子句用到了索引 id。
-   第三行的 Extra 字段，表示在对子查询的结果集做 union 的时候，使用了临时表 (Using temporary)。

这个语句的执行流程是这样的：

1.  创建一个内存临时表，这个临时表只有一个整型字段 f，并且 f 是主键字段。
2.  执行第一个子查询，得到 1000 这个值，并存入临时表中。
3.  执行第二个子查询：
    -   拿到第一行 id=1000，试图插入临时表中。但由于 1000 这个值已经存在于临时表了，违反了唯一性约束，所以插入失败，然后继续执行；
    -   取到第二行 id=999，插入临时表成功。
4.  从临时表中按行取出数据，返回结果，并删除临时表，结果中包含两行数据分别是 1000 和 999。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-27a0ebaf024b74ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#group-by-%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B "group by 执行流程")group by 执行流程

```
select id%10 as m, count(*) as c from t1 group by m;
```

这个语句的逻辑是把表 t1 里的数据，按照 id%10 进行分组统计，并按照 m 的结果排序后输出。它的 explain 结果如下：

![image.png](https://upload-images.jianshu.io/upload_images/12321605-35b19794e6c2f1db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在 Extra 字段里面，我们可以看到三个信息：

-   Using index，表示这个语句使用了覆盖索引，选择了索引 a，不需要回表；
-   Using temporary，表示使用了临时表；
-   Using filesort，表示需要排序。

这个语句的执行流程是这样的：

1.  创建内存临时表，表里有两个字段 m 和 c，主键是 m；
2.  扫描表 t1 的索引 a，依次取出叶子节点上的 id 值，计算 id%10 的结果，记为 x；
    -   如果临时表中没有主键为 x 的行，就插入一个记录 (x,1);
    -   如果表中有主键为 x 的行，就将 x 这一行的 c 值加 1；
3.  遍历完成后，再根据字段 m 做排序，得到结果集返回给客户端。

这个流程的执行图如下：

![image.png](https://upload-images.jianshu.io/upload_images/12321605-638c0dea792883ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

图中最后一步，对内存临时表的排序，在第 17 篇文章中已经有过介绍，我把图贴过来，方便你回顾。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-edd24def2b9c5a44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果你的需求并不需要对结果进行排序，那你可以在 SQL 语句末尾增加 order by null，也就是改成：如果你的需求并不需要对结果进行排序，那你可以在 SQL 语句末尾增加 order by null，也就是改成：

```
select id%10 as m, count(*) as c from t1 group by m order by null;
```

把内存临时表的大小限制为最大 1024 字节，并把语句改成 id % 100，这样返回结果里有 100 行数据。但是，这时的内存临时表大小不够存下这 100 行数据，也就是说，执行过程中会发现内存临时表大小到达了上限（1024 字节）。

那么，这时候就会把内存临时表转成磁盘临时表，磁盘临时表默认使用的引擎是 InnoDB。 这时，返回的结果如图 9 所示。

如果这个表 t1 的数据量很大，很可能这个查询需要的磁盘临时表就会占用大量的磁盘空间。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#group-by-%E4%BC%98%E5%8C%96%E6%96%B9%E6%B3%95-%E2%80%93-%E7%B4%A2%E5%BC%95 "group by 优化方法 – 索引")group by 优化方法 – 索引

在 MySQL 5.7 版本支持了 generated column 机制，用来实现列数据的关联更新。你可以用下面的方法创建一个列 z，然后在 z 列上创建一个索引（如果是 MySQL 5.6 及之前的版本，你也可以创建普通列和索引，来解决这个问题）。

```
alter table t1 add column z int generated always as(id % 100), add index(z);
```

这样，索引 z 上的数据就是类似图 10 这样有序的了。上面的 group by 语句就可以改成：

```
select z, count(*) as c from t1 group by z;
```

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#group-by-%E4%BC%98%E5%8C%96%E6%96%B9%E6%B3%95-%E2%80%93-%E7%9B%B4%E6%8E%A5%E6%8E%92%E5%BA%8F "group by 优化方法 – 直接排序")group by 优化方法 – 直接排序

所以，如果可以通过加索引来完成 group by 逻辑就再好不过了。但是，如果碰上不适合创建索引的场景，我们还是要老老实实做排序的。那么，这时候的 group by 要怎么优化呢？

如果我们明明知道，一个 group by 语句中需要放到临时表上的数据量特别大，却还是要按照“先放到内存临时表，插入一部分数据后，发现内存临时表不够用了再转成磁盘临时表”，看上去就有点儿傻。

那么，我们就会想了，MySQL 有没有让我们直接走磁盘临时表的方法呢？

在 group by 语句中加入 SQL_BIG_RESULT 这个提示（hint），就可以告诉优化器：这个语句涉及的数据量很大，请直接用磁盘临时表。

MySQL 的优化器一看，磁盘临时表是 B+ 树存储，存储效率不如数组来得高。所以，既然你告诉我数据量很大，那从磁盘空间考虑，还是直接用数组来存吧。

```
select SQL_BIG_RESULT id%100 as m, count(*) as c from t1 group by m;
```

的执行流程就是这样的：

1.  初始化 sort_buffer，确定放入一个整型字段，记为 m；
2.  扫描表 t1 的索引 a，依次取出里面的 id 值, 将 id%100 的值存入 sort_buffer 中；
3.  扫描完成后，对 sort_buffer 的字段 m 做排序（如果 sort_buffer 内存不够用，就会利用磁盘临时文件辅助排序）；
4.  排序完成后，就得到了一个有序数组。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-ae7d42d638c79aa1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/12321605-394d69bd71231348.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从 Extra 字段可以看到，这个语句的执行没有再使用临时表，而是直接用了排序算法。

基于上面的 union、union all 和 group by 语句的执行过程的分析，我们来回答文章开头的问题：MySQL 什么时候会使用内部临时表？

1.  如果语句执行过程可以一边读数据，一边直接得到结果，是不需要额外内存的，否则就需要额外的内存，来保存中间结果；
2.  join_buffer 是无序数组，sort_buffer 是有序数组，临时表是二维表结构；
3.  如果执行逻辑需要用到二维表特性，就会优先考虑使用临时表。比如我们的例子中，union 需要用到唯一索引约束， group by 还需要用到另外一个字段来存累积计数。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#distinct-%E5%92%8C-group-by-%E7%9A%84%E6%80%A7%E8%83%BD "distinct 和 group by 的性能")distinct 和 group by 的性能

```
select a from t group by a order by null;
select distinct a from t;
```

首先需要说明的是，这种 group by 的写法，并不是 SQL 标准的写法。标准的 group by 语句，是需要在 select 部分加一个聚合函数，比如：

```
select a,count(*) from t group by a order by null;
```

这条语句的逻辑是：按照字段 a 分组，计算每组的 a 出现的次数。在这个结果里，由于做的是聚合计算，相同的 a 只出现一次。

没有了 count(*) 以后，也就是不再需要执行“计算总数”的逻辑时，第一条语句的逻辑就变成是：按照字段 a 做分组，相同的 a 的值只返回一行。而这就是 distinct 的语义，所以不需要执行聚合函数时，distinct 和 group by 这两条语句的语义和执行流程是相同的，因此执行性能也相同。

这两条语句的执行流程是下面这样的。

1.  创建一个临时表，临时表有一个字段 a，并且在这个字段 a 上创建一个唯一索引；
2.  遍历表 t，依次取数据插入临时表中：如果发现唯一键冲突，就跳过；否则插入成功；
3.  遍历完成后，将临时表作为结果集返回给客户端。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#group-by-%E6%8C%87%E5%AF%BC%E5%8E%9F%E5%88%99 "group by 指导原则")group by 指导原则

1.  如果对 group by 语句的结果没有排序要求，要在语句后面加 order by null；
2.  尽量让 group by 过程用上表的索引，确认方法是 explain 结果里没有 Using temporary 和 Using filesort；
3.  如果 group by 需要统计的数据量不大，尽量只使用内存临时表；也可以通过适当调大 tmp_table_size 参数，来避免用到磁盘临时表；
4.  如果数据量实在太大，使用 SQL_BIG_RESULT 这个提示，来告诉优化器直接使用排序算法得到 group by 的结果。

## [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%85%B6%E4%BB%96 "其他")其他

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E9%87%8D%E5%BB%BA%E8%A1%A8 "重建表")重建表

试想一下，如果你现在有一个表 A，需要做空间收缩，为了把表中存在的空洞去掉，你可以怎么做呢？

你可以新建一个与表 A 结构相同的表 B，然后按照主键 ID 递增的顺序，把数据一行一行地从表 A 里读出来再插入到表 B 中。

这里，你可以使用 alter table A engine=InnoDB 命令来重建表。在 MySQL 5.5 版本之前，这个命令的执行流程跟我们前面描述的差不多，区别只是这个临时表 B 不需要你自己创建，MySQL 会自动完成转存数据、交换表名、删除旧表的操作。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-2a6bac61608d54ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Online-DDL "Online DDL")Online DDL

1.  建立一个临时文件，扫描表 A 主键的所有数据页；
2.  用数据页中表 A 的记录生成 B+ 树，存储到临时文件中；
3.  生成临时文件的过程中，将所有对 A 的操作记录在一个日志文件（row log）中，对应的是图中 state2 的状态；
4.  临时文件生成后，将日志文件中的操作应用到临时文件，得到一个逻辑数据上与表 A 相同的数据文件，对应的就是图中 state3 的状态；
5.  用临时文件替换表 A 的数据文件。

![image.png](https://upload-images.jianshu.io/upload_images/12321605-79ff4f42f79adfce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

确实，图 4 的流程中，alter 语句在启动的时候需要获取 MDL 写锁，但是这个写锁在真正拷贝数据之前就退化成读锁了。

为什么要退化呢？为了实现 Online，MDL 读锁不会阻塞增删改操作。

那为什么不干脆直接解锁呢？为了保护自己，禁止其他线程对这个表同时做 DDL。

而对于一个大表来说，Online DDL 最耗时的过程就是拷贝数据到临时表的过程，这个步骤的执行期间可以接受增删改操作。所以，相对于整个 DDL 过程来说，锁的时间非常短。对业务来说，就可以认为是 Online 的。

另一种典型的大事务场景，就是大表 DDL。这个场景,处理方案就是，计划内的 DDL，建议使用 gh-ost 方案。

#### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#Online-%E5%92%8C-inplace "Online 和 inplace")Online 和 inplace

如果说这两个逻辑之间的关系是什么的话，可以概括为：

1.  DDL 过程如果是 Online 的，就一定是 inplace 的；
2.  反过来未必，也就是说 inplace 的 DDL，有可能不是 Online 的。截止到 MySQL 8.0，添加全文索引（FULLTEXT index）和空间索引 (SPATIAL index) 就属于这种情况。

有同学问到使用 optimize table、analyze table 和 alter table 这三种方式重建表的区别。  
这里，我顺便再简单和你解释一下。

-   从 MySQL 5.6 版本开始，alter table t engine = InnoDB（也就是 recreate）默认的就是上面图 4 的流程了；
-   analyze table t 其实不是重建表，只是对表的索引信息做重新统计，没有修改数据，这个过程中加了 MDL 读锁；
-   optimize table t 等于 recreate+analyze。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#count-%E3%80%81count-%E4%B8%BB%E9%94%AE-id-%E5%92%8C-count-1 "count(*)、count(主键 id) 和 count(1)")count(*)、count(主键 id) 和 count(1)

对于 count(主键 id) 来说，InnoDB 引擎会遍历整张表，把每一行的 id 值都取出来，返回给 server 层。server 层拿到 id 后，判断是不可能为空的，就按行累加。

对于 count(1) 来说，InnoDB 引擎遍历整张表，但不取值。server 层对于返回的每一行，放一个数字“1”进去，判断是不可能为空的，按行累加。

对于 count(字段) 来说：

1.  如果这个“字段”是定义为 not null 的话，一行行地从记录里面读出这个字段，判断不能为 null，按行累加；
2.  如果这个“字段”定义允许为 null，那么执行的时候，判断到有可能是 null，还要把值取出来再判断一下，不是 null 才累加。

但是 `count(*)` 是例外，并不会把全部字段取出来，而是专门做了优化，不取值。count(*) 肯定不是 null，按行累加。

所以结论是：按照效率排序的话，count(字段)< count(主键 id) < count(1) ≈count(_)，所以我建议你，尽量使用 count(_)。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E5%86%85%E5%AD%98%E8%A1%A8 "内存表")内存表

可见，InnoDB 和 Memory 引擎的数据组织方式是不同的：

-   InnoDB 引擎把数据放在主键索引上，其他索引上保存的是主键 id。这种方式，我们称之为索引组织表（Index Organizied Table）。
-   而 Memory 引擎采用的是把数据单独存放，索引上保存数据位置的数据组织形式，我们称之为堆组织表（Heap Organizied Table）。

从中我们可以看出，这两个引擎的一些典型不同：

1.  InnoDB 表的数据总是有序存放的，而内存表的数据就是按照写入顺序存放的；
2.  当数据文件有空洞的时候，InnoDB 表在插入新数据的时候，为了保证数据有序性，只能在固定的位置写入新值，而内存表找到空位就可以插入新值；
3.  数据位置发生变化的时候，InnoDB 表只需要修改主键索引，而内存表需要修改所有索引；
4.  InnoDB 表用主键索引查询时需要走一次索引查找，用普通索引查询的时候，需要走两次索引查找。而内存表没有这个区别，所有索引的“地位”都是相同的。
5.  InnoDB 支持变长数据类型，不同记录的长度可能不同；内存表不支持 Blob 和 Text 字段，并且即使定义了 varchar(N)，实际也当作 char(N)，也就是固定长度字符串来存储，因此内存表的每行数据长度相同。
6.  内存表不支持行锁，只支持表锁。因此，一张表只要有更新，就会堵住其他所有在这个表上的读写操作。
7.  数据放在内存中，是内存表的优势，但也是一个劣势。因为，数据库重启的时候，所有的内存表都会被清空。

由于内存表的这些特性，每个数据行被删除以后，空出的这个位置都可以被接下来要插入的数据复用。比如，如果要在表 t1 中执行：

基于内存表的特性，我们还分析了它的一个适用场景，就是内存临时表。内存表支持 hash 索引，这个特性利用起来，对复杂查询的加速效果还是很不错的。

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E8%87%AA%E5%A2%9E%E4%B8%BB%E9%94%AE%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E6%98%AF%E8%BF%9E%E7%BB%AD%E7%9A%84 "自增主键为什么不是连续的")自增主键为什么不是连续的

MySQL 5.1.22 版本引入了一个新策略，新增参数 innodb_autoinc_lock_mode，默认值是 1。

-   这个参数的值被设置为 0 时，表示采用之前 MySQL 5.0 版本的策略，即语句执行结束后才释放锁；
-   这个参数的值被设置为 1 时：
    -   普通 insert 语句，自增锁在申请之后就马上释放；
    -   类似 insert … select 这样的批量插入数据的语句，自增锁还是要等语句结束后才被释放.
-   这个参数的值被设置为 2 时，所有的申请自增主键的动作都是申请后就释放锁。

在 MySQL 5.7 及之前的版本，自增值保存在内存里，并没有持久化。每次重启后，第一次打开表的时候，都会去找自增值的最大值 max(id)，然后将 max(id)+1 作为这个表当前的自增值。﻿

在 MyISAM 引擎里面，自增值是被写在数据文件上的。而在 InnoDB 中，自增值是被记录在内存的。MySQL 直到 8.0 版本，才给 InnoDB 表的自增值加上了持久化的能力，确保重启前后一个表的自增值不变。

MySQL 5.1.22 版本开始引入的参数 innodb_autoinc_lock_mode，控制了自增值申请时的锁范围。从并发性能的角度考虑，我建议你将其设置为 2，同时将 binlog_format 设置为 row。我在前面的文章中其实多次提到，binlog_format 设置为 row，是很有必要的。今天的例子给这个结论多了一个理由。

在什么场景下自增主键可能不连续

1：唯一键冲突  
2：事务回滚  
3：自增主键的批量申请

深层次原因是，不判断自增主键是否已存在可减少加锁的时间范围和粒度->为了更高的性能->自增主键不能回退->自增主键不连续

### [](https://fanlv.fun/2020/08/01/mysql-45-lesson/#%E6%85%A2%E6%9F%A5%E8%AF%A2%E6%80%A7%E8%83%BD%E9%97%AE%E9%A2%98 "慢查询性能问题")慢查询性能问题

1.  索引没有设计好；
2.  SQL 语句没写好；
3.  MySQL 选错了索引。




# Redis
- 什么是 Redis ？ 
	- redis 是一个用 c 语言开发的存放在内存中的 KV 数据库。
- redis 中的 pipline 指的是什么？
	- Redis pipeline 是 Redis 提供的一种批量执行命令的机制。它允许将多个 Redis 命令一次性发送到 Redis 服务器中。
- Redis 为什么快？ 
	- 相较于磁盘，redis 位于内存中，内存读写快而磁盘读写慢。
	 - 单线程事件循环和 IO 多路复用
	 - 如果直接同数据库操作，速度太慢，例如 MySQL 的 QPS 约为 1W，加上 Redis 后 QPS 可以达到 10W 。
	- 数据结构高效
- I/O 多路复用是什么？
	- 多进程模型 => 多线程模型 =>  I/O 多路复用。
	- 多进程模型：父进程用来监听客户的连接，创建子进程用来处理连接。进程太**笨重**，可以使用线程来优化。
	- 多线程模型：在同进程下面的多个线程可以共享资源，不需要来回切换，提高了性能。可以使用线程池，提前创建多个线程，请求传进来加入队列中，需要加锁避免竞争。但是依旧存在问题，线程也是有上限的。
	- I/O 多路复用：多进程/线程模型本质上都是通过创建进程/线程来处理事件，而进程/线程均有上限。针上述问题，I/O多路复用使用一个进程来处理 socket，多个请求**复用**了一个进程，此进程监听请求多个文件句柄，一旦某个句柄准备就绪，就能通知对应应用程序执行相应的读写操作。没有文件句柄就绪时就会阻塞应用程序，从而释放出CPU资源。select/poll/epoll 内核提供给用户态的多路复用系统调用，**进程可以通过一个系统调用函数从内核中获取多个事件**。
	-  select、poll、epoll
		- select ：
			- 将已经连接的 socket 放入一个集合中，调用 select 将此集合拷贝到内核中。内核以**遍历**集合的方式判断是否有事件产生，将有事件产生的 socket 标记为可读/可写，然后将其复制到用户态下。在用户态下再以**遍历**的方式对其处理。
			- select 存在两次**复制**，两次**遍历**。使用固定长度（1024）的 BitMap 来判断。
		- poll: 
			- poll 是对 select 的改进，它对于文件描述符数量的限制有所放宽。同样通过poll系统调用来监听多个文件描述符的读写状态，在有数据可读或可写时返回。
			- poll 使用没有 BitMap ，而是以链表的形式来组织，没有了 socket 个数的限制。
			- select 和 poll 存在同样的问题，需要两次复制，两次遍历。
		- epoll
			- epoll 解决了 select/poll 的缺点。不用遍历， 任务完成直接处理。复杂度是从 `O(N)` 降低到了 `log(n)` 。性能瓶颈不再是进程/线程个数，而是文件描述符个数。
			- epoll 在内核中使用红黑树来跟踪所有待检测的 socket 。通过 `epoll_ctl()` 将需要监控的 socket 加入内核的红黑树中。当 socket 有事件发生时，通过 **回调函数**将其加入到就绪队列事件的列表中。此后将此数据拷贝到用户态处理。
			- epoll 支持两种事件触发模式，分别是**边缘触发（_edge-triggered，ET_）** 和 **水平触发（ _level-triggered，LT_ ）**。 水平触发的意思是只要满足事件的条件，比如内核中有数据需要读，就一直不断地把这个事件传递给用户；而边缘触发的意思是只有第一次满足条件的时候才触发，之后就不会再传递同样的事件了。
			- epoll 支持边缘触发和水平触发的方式，而 select/poll 只支持水平触发，一般而言，边缘触发的方式会比水平触发的效率高。边缘触发最好搭配非阻塞I/O的方式处理。
	- 实际使用：
		- 主流操作系统都提供了IO多路复用技术的实现，比如 Linux上的 epoll，freeBSD 上的 kqueue 以及 Windows 平台上的 iocp。有得必有失，因为 epoll 等技术提供的接口面向 IO 事件而非面向连接，所以需要编写复杂的异步代码，开发难度很大。
- Reactor 是什么？
	- Reactor 是对I/O多路复用技术的封装，使用者不需要考虑网络 API 的底层细节，只需要关注代码实现即可。
	- Reactor 模式主要由 Reactor 和处理资源池这两个核心部分组成。
		- Reactor 负责监听和分发事件，例如连接事件，读写事件。
		- 处理资源池负责处理事件，读 ，处理业务逻辑，写。
	- Reactor 可以有多个，处理资源池可以是单进程/线程，也可以是多进程/线程。所以有四种搭配。
		- 多 Reactor + 单进程/线程：没有性能优势，一般不采用。
		- 单 Reactor + 单进程/线程：在 C 中是进程，而在 Java 中是线程。其中 Reactor 负责监听和分发事件，Acceptor 负责获取连接，Handler 负责处理业务。
			- 优点：实现简单，不用考虑进程间通信，竞争。
			- 缺点：无法充分利用多核 CPU 性能，Handler 所处理的业务耗时长会导致响应延迟，因为此时 Handler 无法处理其他业务。
		- 单 Reactor + 多进程/线程：在 Handler 创建多个进程/线程来处理。Handler 不再负责处理，而是仅接受，交给 Processor 处理。
			- 优点：充分利用多核 CPU 的性能。
			- 缺点：单 Reactor 承担所有事件的监听和响应且只在主线程中运行，遇到瞬间高并发的场景容易成为性能瓶颈。
- 除 Redis 外还有哪些缓存技术？
	- Memcached 
	- 二者的相同点是：基于内存的数据库，有过期策略，性能高。
	- 不同点：
		- Redis 支持更多的数据结构。
		- Redis 有持久化功能，Memcached  没有。
		- 内存不够时 Redis 可以持久化，而 Memcached  会直接报异常。
		- Redis 支持原生集群，而 Memcached  没有原生集群。
		- -   **Memcached 是多线程，非阻塞 IO 复用的网络模型；Redis 使用单线程的多路 IO 复用模型。** （Redis 6.0 引入了多线程 IO ）
		-   **Redis 支持发布订阅模型、Lua 脚本、事务等功能，而 Memcached 不支持。并且，Redis 支持更多的编程语言。**
		-   **Memcached 过期数据的删除策略只用了惰性删除，而 Redis 同时使用了惰性删除与定期删除。**
- redis 是多线程还是单线程？为什么？
	- Redis 的读写命令均为单线程。采用事件循环机制可以高效的利用 CPU。
	-   **Redis 在 2.6 版本**，会启动 2 个后台线程，分别处理关闭文件、AOF 刷盘这两个任务；
	- Redis 4.0 后增加了多线程来处理大键值对的异步删除。
	- Redis 6.0 后增加了多线程来处理网络请求，进一步提高 I/O 。 基于 **Reactor** 模式，使用 I/O 多路复用程序来监听多个套接字进而实现了**高性能**的网络通信模型，此外方便同Redis服务器**单线程**方式运行的模块对接，也保证了**实现的简单性**
	- 因为性能瓶颈不在单线程和多线程。单线程：**编程实现简单**，便于维护。Redis 的性能瓶颈不在 CPU 而是内存和网络。多线程存在死锁，上下文切换等问题，影响性能。
	- 多线程： Redis 的性能瓶颈是网络和内存，使用 I/O 多路复用提高了网络的读写，后续命令的执行依旧是单线程。
	- Redis 多线程默认禁用，可通过修改配置文件来使用。
- redis 的实际使用场景，数据结构的应用？
	- 利用 bitmap 来统计活跃用户。
	- 利用 string 存储对象数据，
	- hash 相较于 string 适合存储频繁修改的场景下。例如购物车信息，用户 id 为 key ，商品 id 为 field ，商品数据量为 value 。
	- 用 Sorted Set 来做排行榜，`ZRANGE` (从小到大排序) 、 `ZREVRANGE` （从大到小排序）、`ZREVRANK` (指定元素排名)
- TTL 作用
	- 内存有限，若不设置过期时间会导致内存不够用。
	- 此外还有业务场景的限制，例如短信验证码只需要保证1min 有效即可，token 保证一天有效。
- Redis 如何保证挂掉后再重启数据恢复？ 
	- Redis 支持**快照（snapshotting，RDB）** 和 **只追加文件（append-only file, AOF）** 两种方式。
	- 快照：通过创建快照来保存某个时间点上服务器数据副本，后续用该数据来做恢复。快照有两种选择，有阻塞主线程的选择，也有不阻塞主线程的选择。
	- AOF：将命令写入磁盘，复制状态机的思想。三种选择执行一次命令写一次，一秒写一次，交给OS判断。通常选择一秒写一次。
	- 二者的优缺点：RDB 恢复起来快速，但是数据不安全，空间大。AOF 占空间小，恢复起来慢。
- 如何使用 Redis 事务？ 
	-  Redis 可以通过 **`MULTI`，`EXEC`，`DISCARD` 和 `WATCH`** 等命令来实现事务(transaction)功能。
	-  [`MULTI`](https://redis.io/commands/multi) 命令后可以输入多个命令，Redis 不会立即执行这些命令，而是将它们放到队列，当调用了 [`EXEC`](https://redis.io/commands/exec) 命令后，再执行所有的命令。
	- 可以通过 [`DISCARD`](https://redis.io/commands/discard) 命令取消一个事务，会清空事务队列中保存的所有命令。
	- 可以通过[`WATCH`](https://redis.io/commands/watch) 命令监听指定的 Key，当调用 `EXEC` 命令执行事务时，如果一个被 `WATCH` 命令监视的 Key 被 **其他客户端/Session** 修改的话，整个事务都不会被执行。如果 **WATCH** 与 **事务** 在同一个 Session 里，并且被 **WATCH** 监视的 Key 被修改的操作发生在事务内部，这个事务是可以被执行成功的
- Redis 支持回滚，原子，持久吗？ 
	- 不支持回滚，没必要，设计者认为应当在开发阶段解决这些问题，而非生产环境上出现再解决。
	- 不支持原子，持久。
- Redis bigkey 优化 
	- bigkey 是指 key 对应的 value 所占内存较大。例如：string 类型的 value 超过 10 kb，复合类型的 value 包含的元素超过 5000 个
	- 除了会消耗更多的内存空间，bigkey 对性能也会有比较大的影响。所以尽量避免使用 bigkey 。
	- 解决方法：
		- 使用 redis 自带的命令 `redis-cli -p 6379 --bigkeys` 查找 bigkey 。
		- 采用的是 **定期删除+惰性/懒汉式删除** 策略
- Redis 缓存穿透，缓存雪崩及其解决策略  
	- 缓存穿透和缓存雪崩都是指大量不存在的 key 在缓存中找不到对应的数据，进而打到了数据库上导致宕机。缓存穿透是指热点数据失效，而缓存雪崩指缓存中所有数据失效。
	- 缓存穿透解决办法：
		- 为不存在的 key 建立映射，避免将请求转发到后端数据库上。
		- 使用布隆过滤器来过滤不存在的 key，避免将请求转发到后端数据库上。布隆过滤器认为不在那么一定不在，布隆过滤器认为在，但是不一定在。
	- 缓存雪崩解决办法：
		- 设置随机的失效时间，避免数据同时失效。
		- 数据失效时采用延迟失效的方式来更新数据避免大量数据同时失效。
		- 热点数据位于数据库中，但不在内存中导致大量查询同数据库交互进而拖垮数据库。
		- 数据提前预热。
- 布隆过滤器 
	- 布隆过滤器用于判断一个元素是否在一个集合中。优点是时空效率高，缺点是可能存在误判，例如判定存在不一定存在，但是判定不存在那么一定不存在。
	-  根据给定元素用 k 个哈希函数分别计算得到 k 个结果，在长度为 m 的 bitmap 数组上将这 k个位置标记为一。此后输入数据需要重新计算，若 k 个位置均为一那么存在，反之不存在。
-   一致性哈希是什么，使用场景，解决了什么问题？
    -  一致性哈希解决了如何将客户的请求分配到不同服务器上问题。是一种负载均衡算法的实现。
    - 通过哈希再取模运算实现了 key 和 value 所在节点一一对应。但如果节点扩容，也就是增加新的节点会导致此前的对应失效。可以通过重新建立对应关系，迁移数据来解决这个问题，但是复杂度很高。一致性哈希避免了过多的数据迁移。
    - 此前取模是对节点个数，而**一致哈希算法是对 2^32 进行取模运算，是一个固定的值**。也就是一个哈希环，将数据映射到环上。那么如何确定数据的存储节点？数据沿顺时针方向找到的第一个节点就是存储该数据的节点。
    - 引入哈希环本质上是为了降低耦合，直接将哈希值映射到节点上节点扩容影响严重，通过中间哈希环降低了耦合，数据在哈希环上的映射是写死的，而哈希环和节点之间的映射是灵活的。
    - 但是会存在新的问题，如何均匀分配？通过引入虚拟节点提高均衡性。也就是更为细致的划分区间，将请求分散到多个节点上，而一个真实的节点对应哈希环上的多个虚拟节点。



## 1. 数据库三大范式是什么？

> 什么是范式？

一张表的结构符合某种设计标准。

> 什么是关系模式？什么是关系？二者的区别是什么？

“关系模式”和“关系”的区别类似于“类”与“对象”的区别。

关系是带数据的表，而关系模式是这张表的表结构。

> 什么是第一范式？

表的每一列都不能再分，原子级别。

> 只满足第一范式存在什么问题？

数据冗余，插入异常，删除异常，修改异常。

> 什么是第二范式？

第二范式在第一范式的基础上消除了**非主属性**对于**码**的**部分函数依赖**。

函数依赖：属性 a 能确定属性 b ，此时属性 b 函数依赖属性 a 写作 a → b。例如学号可以唯一确定姓名，那么可以说姓名函数依赖于学号。但是反过来不行，例如存在重名的情况，同样的姓名但是学号不一样。

完全函数依赖：函数依赖 X → Y 中的 X 任何一个真子集都不成立称 Y 对于 X 完全函数依赖。

部分函数依赖：不是完全函数依赖的称之为部分函数依赖。

传递函数依赖：Z 函数依赖于 Y 且 Y 函数依赖于 X 。Z 和 X 存在部分函数依赖。

码：码可以是一个集合，除这个集合之外的其他属性都完全函数依赖于该集合，那么称这个集合为候选码。在这个集合中选一个属性作为主码。

主属性是包含在候选码中的属性，非主属性是候选码之外的属性。

> 如何判断是否符合第二范式？

首先找到码，然后找出所有的主属性，剩余的属性都是非主属性，查看非主属性对码是否存在函数依赖。(就是组合一下看是否能确定剩余的属性)

> 什么是第三范式？

在2NF基础上，消除了非主属性对于码的传递函数依赖。

第三范式需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。

> 三范式的优点？

在设计数据库结构的时候，要尽量遵守三范式，如果不遵守，必须有足够的理由。比如性能。事实上我们经常会为了性能而妥协数据库的设计。

（1）简单归纳：

　　第一范式（1NF）：字段不可分；
　　第二范式（2NF）：有主键，非主键字段依赖主键；
　　第三范式（3NF）：非主键字段不能相互依赖。

（2）解释：

　　1NF：原子性。 字段不可再分,否则就不是关系数据库;；
　　2NF：唯一性 。一个表只说明一个事物；
　　3NF：每列都与主键有直接关系，不存在传递依赖。

范式的优点：消除了重复的冗余数据，更新快，修改少。

缺点：查询导致很多关联，效率变低。

> 什么是 BCNF 范式？

在 3NF 的基础上消除主属性对于码的部分与传递函数依赖。

参考自：https://www.zhihu.com/question/24696366/answer/29189700



## 2. InnoDB 与 MyISAM 的区别？

InnoDB 将数据和索引放在一起保存在一个文件(.ibd)中，而 MyISAM 将表结构.frm 索引.myi 数据.myd 分别存放。

InnoDB 支持聚簇索引，而 MyISAM 不支持聚簇索引。

> 聚簇索引中索引和数据放在了一起，反之则是索引和数据分离。

3. InnoDB 支持事务、外键、行锁表锁，MyISAM 不支持事务、外键、只支持表锁 。
4. select count(*)
5. InnoDB更新更优，MyISAM查询更优。
6. 都是B+tree索引。
7. MyISAM支持全文索引，InnoDB 5.6 后支持。

## 服务器处理客户端请求的查询流程
总的来看，客户进程向服务进程发送一段文本语句。服务进程处理后将结果发送给客户进程。

1. 连接管理：
   1. 客户端连接服务端，服务端创建一个线程来处理。
   2. 客户端退出时断开连接，服务端将线程缓存而非销毁，目的是等待别的客户端连接避免频繁的创建销毁。
   3. 服务端会为所有每一个连接分配一个线程，线程的数量存在上限。
   4. 安全反面的优化。
2. 解析与优化：
   1. 查询缓存：注意一旦更改表那么和表相关的所有缓存都会失效。
   2. 语法解析：
   3. 查询优化：生成一个执行计划，确定表的连接顺序等。
3. 存储引擎：
   1. 读取数据。
   2. 写入数据。
   3. 可以为不同的表设置不同的存储引擎。

## 5. 数据库(DB)和数据库管理系统(DBMS)的区别？
* DB 是存储数据的仓库，本质上是一个文件系统。
* DBMS 是用于操纵和管理的软件，对数据库进行统一的管理。


## 6. 表，记录，字段。

一个实体就是一行数据。实体集中有多个实体，也就是表。

一个属性是一个字段，也就是对应一列数据。

## 7. 关系模型(ER)

一共四种关系：

1. 一对一
2. 一对多
3. 多对多
4. 自我引用




数据库中的 HeapFile 结构是什么？
HeapFile 是一种数据库中的存储结构，它代表了存储在数据库中的一个文件。

HeapFile 的名称源自于其存储方式：所有记录堆叠在一起，不按任何特定的顺序存储。因此，在读取记录时需要进行顺序搜索，以找到所需的记录。

尽管 HeapFile 不如其他存储结构（例如 B-树）具有高效的读取性能，但它仍然具有一些优点，例如简单易用和快速的插入性能。因此，HeapFile 在许多数据库系统中仍然广泛使用。

总的来说，HeapFile 是一种简单但有效的存储结构，适用于特定的使用场景，如对性能要求不高的数据读取任务。


什么是 OLTP，OLAP ？
OLTP (Online Transaction Processing) 和 OLAP (Online Analytical Processing) 是两种不同的数据库系统架构。

OLTP 系统用于处理大量的快速事务处理。例如，在一个电商网站中，OLTP 系统负责处理每个订单，包括更新用户帐户信息，库存信息以及订单历史记录。因此，OLTP 系统通常具有较高的事务处理能力和低延迟。

OLAP 系统则用于处理大量的分析数据。例如，在电商网站中，OLAP 系统可以统计销售数据，追踪产品销售情况和趋势，并以此为基础进行预测。因此，OLAP 系统通常具有更强的数据分析能力，但可能需要更长的时间来处理大量的数据。

总的来说，OLTP 和 OLAP 是两种不同的数据库系统，分别用于处理不同类型的数据处理需求。在实际应用中，一些数据库系统可以同时支持 OLTP 和 OLAP，以满足不同的业务需求。

