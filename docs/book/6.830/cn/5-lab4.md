# Lab 4 翻译

Assigned: Monday, Apr 5, 2021
Due: Thursday, Apr 22, 2021 11:59 PM ET

In this lab, you will implement a simple locking-based transaction system in SimpleDB. You will need to add lock and unlock calls at the appropriate places in your code, as well as code to track the locks held by each transaction and grant locks to transactions as they are needed.

在这个实验中，你将在SimpleDB中实现一个简单的基于锁的事务系统。你将需要在代码中的适当位置添加锁和解锁调用，以及跟踪每个事务所持有的锁的代码，并在需要时授予事务锁。

The remainder of this document describes what is involved in adding transaction support and provides a basic outline of how you might add this support to your database.

本文档的其余部分描述了添加事务支持所涉及的内容，并提供了一个关于如何将这种支持添加到你的数据库的基本概要。

As with the previous lab, we recommend that you start as early as possible. Locking and transactions can be quite tricky to debug!

和前面的实验一样，我们建议你尽可能早地开始。锁定和事务可能是相当棘手的调试工作!

## 1. Getting started

You should begin with the code you submitted for Lab 3 (if you did not submit code for Lab 3, or your solution didn't work properly, contact us to discuss options). Additionally, we are providing extra test cases for this lab that are not in the original code distribution you received. We reiterate that the unit tests we provide are to help guide your implementation along, but they are not intended to be comprehensive or to establish correctness.

你应该从你为实验3提交的代码开始（如果你没有为实验3提交代码，或者你的解决方案没有正常工作，请与我们联系，讨论各种方案）。此外，我们还为这个实验提供了额外的测试案例，这些案例不在你收到的原始代码分发中。我们重申，我们提供的单元测试是为了帮助指导你的实施，但它们并不打算是全面的或建立正确性。

You will need to add these new files to your release. The easiest way to do this is to change to your project directory (probably called simple-db-hw) and pull from the master GitHub repository:

你将需要把这些新文件添加到你的版本中。最简单的方法是换到你的项目目录（可能叫simple-db-hw），然后从GitHub的主仓库拉出。

    $ cd simple-db-hw
    $ git pull upstream master

## 2. Transactions, Locking, and Concurrency Control

Before starting, you should make sure you understand what a transaction is and how strict two-phase locking (which you will use to ensure isolation and atomicity of your transactions) works.

在开始之前，你应该确保你了解什么是事务，以及严格的两阶段锁定（你将使用它来确保事务的隔离性和原子性）是如何工作的。

In the remainder of this section, we briefly overview these concepts and discuss how they relate to SimpleDB.

在本节的剩余部分，我们简要地概述这些概念，并讨论它们与SimpleDB的关系。

## 2.1. Transactions

A transaction is a group of database actions (e.g., inserts, deletes, and reads) that are executed atomically; that is, either all of the actions complete or none of them do, and it is not apparent to an outside observer of the database that these actions were not completed as a part of a single, indivisible action.

事务是一组原子执行的数据库操作（例如插入、删除和读取）；也就是说，要么所有的操作都完成了，要么都没有完成，而且对于数据库的外部观察者来说，这些操作没有作为一个单一的、不可分割的操作的一部分完成，这一点是不明显的。

## 2.2. The ACID Properties

To help you understand how transaction management works in SimpleDB, we briefly review how it ensures that the ACID properties are satisfied:

为了帮助你理解SimpleDB中的事务管理是如何工作的，我们简单回顾一下它是如何确保ACID属性得到满足的。

Atomicity: Strict two-phase locking and careful buffer management ensure atomicity.

原子性：严格的两阶段锁定和谨慎的缓冲区管理确保了原子性。

Consistency: The database is transaction consistent by virtue of atomicity. Other consistency issues (e.g., key constraints) are not addressed in SimpleDB.

一致性：由于原子性，数据库是事务一致的。其他的一致性问题（例如，键约束）在SimpleDB中没有被解决。

Isolation: Strict two-phase locking provides isolation.

隔离：严格的两相锁定提供隔离。

Durability: A FORCE buffer management policy ensures durability (see Section 2.3 below).

持久性。FORCE的缓冲区管理政策确保了持久性（见下文2.3节）。

## 2.3. Recovery and Buffer Management

To simplify your job, we recommend that you implement a NO STEAL/FORCE buffer management policy.

为了简化你的工作，我们建议你实施 "不偷不抢 "的缓冲区管理政策。

As we discussed in class, this means that:

正如我们在课堂上讨论的那样，这意味着。

You shouldn't evict dirty (updated) pages from the buffer pool if they are locked by an uncommitted transaction (this is NO STEAL).

你不应该从缓冲池中驱逐脏的（更新的）页面，如果它们被一个未提交的事务锁定（这不是偷窃）。

On transaction commit, you should force dirty pages to disk (e.g., write the pages out) (this is FORCE).

在事务提交时，你应该把脏页强制到磁盘上（例如，把页写出来）（这就是FORCE）。

To further simplify your life, you may assume that SimpleDB will not crash while processing a transactionComplete command. Note that these three points mean that you do not need to implement log-based recovery in this lab, since you will never need to undo any work (you never evict dirty pages) and you will never need to redo any work (you force updates on commit and will not crash during commit processing).

为了进一步简化你的生活，你可以假设SimpleDB在处理transactionComplete命令时不会崩溃。请注意，这三点意味着你不需要在这个实验中实现基于日志的恢复，因为你永远不需要撤销任何工作（你永远不会驱逐脏页），也不需要重做任何工作（你在提交时强制更新，不会在提交处理期间崩溃）。


## 2.4. Granting Locks

You will need to add calls to SimpleDB (in BufferPool, for example), that allow a caller to request or release a (shared or exclusive) lock on a specific object on behalf of a specific transaction.

你将需要增加对SimpleDB的调用（例如在BufferPool中），允许调用者代表特定事务请求或释放特定对象的（共享或独占）锁。

We recommend locking at page granularity; please do not implement table-level locking (even though it is possible) for simplicity of testing. The rest of this document and our unit tests assume page-level locking.

我们建议以页为单位进行锁定；为了测试的简单性，请不要实现表级的锁定（尽管它是可能的）。本文档的其余部分和我们的单元测试都是假设页级锁的。

You will need to create data structures that keep track of which locks each transaction holds and check to see if a lock should be granted to a transaction when it is requested.

你将需要创建数据结构来跟踪每个事务持有哪些锁，并在事务被请求时检查是否应该授予其锁。

You will need to implement shared and exclusive locks; recall that these work as follows:

你将需要实现共享锁和独占锁；回顾一下，这些锁的工作方式如下。

Before a transaction can read an object, it must have a shared lock on it.

在一个事务可以读取一个对象之前，它必须有一个共享锁在上面。

Before a transaction can write an object, it must have an exclusive lock on it.

在一个事务可以写入一个对象之前，它必须有一个独占锁。

Multiple transactions can have a shared lock on an object.

多个事务可以在一个对象上拥有一个共享锁。

Only one transaction may have an exclusive lock on an object.

只有一个事务可以在一个对象上拥有一个独占锁。

If transaction t is the only transaction holding a shared lock on an object o, t may upgrade its lock on o to an exclusive lock.

如果事务t是唯一在对象o上持有共享锁的事务，t可以将其对o的锁升级为独占锁。

If a transaction requests a lock that cannot be immediately granted, your code should block, waiting for that lock to become available (i.e., be released by another transaction running in a different thread). Be careful about race conditions in your lock implementation --- think about how concurrent invocations to your lock may affect the behavior. (you way wish to read about Synchronization in Java).

如果一个事务请求一个不能立即授予的锁，你的代码应该阻塞，等待该锁变得可用（即，被另一个在不同线程中运行的事务释放）。在你的锁的实现中要小心竞争条件------考虑对你的锁的并发调用会如何影响你的行为。(你可以阅读关于Java中的同步的文章）。

## Exercise 1.

Write the methods that acquire and release locks in BufferPool. Assuming you are using page-level locking, you will need to complete the following:

编写BufferPool中获取和释放锁的方法。假设你使用的是页级锁，你将需要完成以下工作。

Modify getPage() to block and acquire the desired lock before returning a page.
Implement unsafeReleasePage(). This method is primarily used for testing, and at the end of transactions.
Implement holdsLock() so that logic in Exercise 2 can determine whether a page is already locked by a transaction.
You may find it helpful to define a LockManager class that is responsible for maintaining state about transactions and locks, but the design decision is up to you.

修改getPage()，使其在返回页面前阻塞并获得所需的锁。
实现unsafeReleasePage()。这个方法主要用于测试，以及在事务结束时使用。
实现 holdsLock()，以便练习2中的逻辑能够确定一个页面是否已经被事务锁定。
你可能会发现，定义一个LockManager类来负责维护事务和锁的状态是很有帮助的，但设计决定权在你。


You may need to implement the next exercise before your code passes the unit tests in LockingTest.

在你的代码通过LockingTest的单元测试之前，你可能需要实现下一个练习。

## 2.5. Lock Lifetime

You will need to implement strict two-phase locking. This means that transactions should acquire the appropriate type of lock on any object before accessing that object and shouldn't release any locks until after the transaction commits.

你将需要实现严格的两阶段锁。这意味着事务在访问任何对象之前应该获得相应类型的锁，并且在事务提交之前不应该释放任何锁。

Fortunately, the SimpleDB design is such that it is possible to obtain locks on pages in BufferPool.getPage() before you read or modify them. So, rather than adding calls to locking routines in each of your operators, we recommend acquiring locks in getPage(). Depending on your implementation, it is possible that you may not have to acquire a lock anywhere else. It is up to you to verify this!

幸运的是，SimpleDB的设计是这样的：在你读取或修改页面之前，有可能在BufferPool.getPage()中获得页面的锁。因此，我们建议在getPage()中获取锁，而不是在你的每个操作中添加对锁程序的调用。根据你的实现，你有可能不需要在其他地方获取锁。这要靠你自己去验证!

You will need to acquire a shared lock on any page (or tuple) before you read it, and you will need to acquire an exclusive lock on any page (or tuple) before you write it. You will notice that we are already passing around Permissions objects in the BufferPool; these objects indicate the type of lock that the caller would like to have on the object being accessed (we have given you the code for the Permissions class.)

你需要在读取任何页面（或元组）之前获得一个共享锁，你需要在写入任何页面（或元组）之前获得一个独占锁。你会注意到，我们已经在BufferPool中传递了许可对象；这些对象表明调用者希望对被访问对象拥有的锁的类型（我们已经给了你许可类的代码。）

Note that your implementation of HeapFile.insertTuple() and HeapFile.deleteTuple(), as well as the implementation of the iterator returned by HeapFile.iterator() should access pages using BufferPool.getPage(). Double check that these different uses of getPage() pass the correct permissions object (e.g., Permissions.READ_WRITE or Permissions.READ_ONLY). You may also wish to double check that your implementation of BufferPool.insertTuple() and BufferPool.deleteTupe() call markDirty() on any of the pages they access (you should have done this when you implemented this code in lab 2, but we did not test for this case.)

请注意，你对HeapFile.insertTuple()和HeapFile.deleteTuple()的实现，以及HeapFile.iterator()返回的迭代器的实现应该使用BufferPool.getPage()访问页面。仔细检查这些getPage()的不同用法是否传递了正确的权限对象（例如，Permissions.READ_WRITE 或 Permissions.READ_ONLY）。你也可以仔细检查你实现的BufferPool.insertTuple()和BufferPool.deleteTupe()是否在它们访问的任何页面上调用markDirty()（你在实验2中实现这段代码时应该这样做，但我们没有测试这种情况）。

After you have acquired locks, you will need to think about when to release them as well. It is clear that you should release all locks associated with a transaction after it has committed or aborted to ensure strict 2PL. However, it is possible for there to be other scenarios in which releasing a lock before a transaction ends might be useful. For instance, you may release a shared lock on a page after scanning it to find empty slots (as described below).

在你获得锁之后，你也需要考虑何时释放它们。很明显，你应该在一个事务提交或中止后释放所有与之相关的锁，以确保严格的2PL。然而，在其他情况下，在事务结束前释放锁可能是有用的。例如，你可以在扫描页面找到空槽后释放一个共享锁（如下所述）。

## Exercise 2.

Ensure that you acquire and release locks throughout SimpleDB. Some (but not necessarily all) actions that you should verify work properly:

确保你在整个SimpleDB获得和释放锁。一些（但不一定是全部）你应该验证的操作正常工作。

Reading tuples off of pages during a SeqScan (if you implemented locking in BufferPool.getPage(), this should work correctly as long as your HeapFile.iterator() uses BufferPool.getPage().)

在SeqScan过程中从页面上读取 tuple（如果你在BufferPool.getPage()中实现了锁定，只要你的HeapFile.iterator()使用BufferPool.getPage()，这应该可以正确工作。）

Inserting and deleting tuples through BufferPool and HeapFile methods (if you implemented locking in BufferPool.getPage(), this should work correctly as long as HeapFile.insertTuple() and HeapFile.deleteTuple() use BufferPool.getPage().)
You will also want to think especially hard about acquiring and releasing locks in the following situations:

通过BufferPool和HeapFile方法插入和删除图元（如果你在BufferPool.getPage()中实现了锁，只要HeapFile.insertTuple()和HeapFile.deleteTuple()使用BufferPool.getPage()，这应该能正确工作。）
你还需要特别考虑在以下情况下获取和释放锁的问题。


Adding a new page to a HeapFile. When do you physically write the page to disk? Are there race conditions with other transactions (on other threads) that might need special attention at the HeapFile level, regardless of page-level locking?

向HeapFile添加一个新的页面。你什么时候把这个页面写到磁盘上？是否存在与其他事务（在其他线程上）的竞赛条件，可能需要在HeapFile级别上特别注意，而不考虑页级锁定？

Looking for an empty slot into which you can insert tuples. Most implementations scan pages looking for an empty slot, and will need a READ_ONLY lock to do this. Surprisingly, however, if a transaction t finds no free slot on a page p, t may immediately release the lock on p. Although this apparently contradicts the rules of two-phase locking, it is ok because t did not use any data from the page, such that a concurrent transaction t' which updated p cannot possibly effect the answer or outcome of t.

寻找一个可以插入图元的空槽。大多数实现都会扫描页面，寻找一个空槽，并且需要一个READ_ONLY锁来完成这个工作。然而，令人惊讶的是，如果一个事务t发现页面p上没有空槽，t可以立即释放p上的锁。虽然这显然与两阶段锁的规则相矛盾，但它是可以的，因为t没有使用页面上的任何数据，这样，一个更新p的并发事务t'不可能影响t的答案或结果。

At this point, your code should pass the unit tests in LockingTest.

在这一点上，你的代码应该通过LockingTest中的单元测试。

## 2.6. Implementing NO STEAL

Modifications from a transaction are written to disk only after it commits. This means we can abort a transaction by discarding the dirty pages and rereading them from disk. Thus, we must not evict dirty pages. This policy is called NO STEAL.

一个事务的修改只有在它提交之后才会被写入磁盘。这意味着我们可以通过丢弃脏页并从磁盘重读来中止一个事务。因此，我们必须不驱逐脏页。这个策略被称为NO STEAL。

You will need to modify the evictPage method in BufferPool. In particular, it must never evict a dirty page. If your eviction policy prefers a dirty page for eviction, you will have to find a way to evict an alternative page. In the case where all pages in the buffer pool are dirty, you should throw a DbException. If your eviction policy evicts a clean page, be mindful of any locks transactions may already hold to the evicted page and handle them appropriately in your implementation.

你将需要修改BufferPool中的evictPage方法。特别是，它必须永远不驱逐一个脏页。如果你的驱逐策略倾向于驱逐一个脏页，你将不得不找到一种方法来驱逐一个替代页。在缓冲池中的所有页面都是脏的情况下，你应该抛出一个DbException。如果你的驱逐策略驱逐了一个干净的页面，要注意事务可能已经持有被驱逐的页面的任何锁，并在你的实现中适当地处理它们。

## Exercise 3.

Implement the necessary logic for page eviction without evicting dirty pages in the evictPage method in BufferPool.

在BufferPool的evictPage方法中实现必要的页面驱逐逻辑，而不驱逐脏页。

## 2.7. Transactions

In SimpleDB, a TransactionId object is created at the beginning of each query. This object is passed to each of the operators involved in the query. When the query is complete, the BufferPool method transactionComplete is called.

在SimpleDB中，每次查询开始时都会创建一个TransactionId对象。这个对象被传递给每个参与查询的操作者。当查询完成后，BufferPool方法 transactionComplete被调用。

Calling this method either commits or aborts the transaction, specified by the parameter flag commit. At any point during its execution, an operator may throw a TransactionAbortedException exception, which indicates an internal error or deadlock has occurred. The test cases we have provided you with create the appropriate TransactionId objects, pass them to your operators in the appropriate way, and invoke transactionComplete when a query is finished. We have also implemented TransactionId.

调用此方法可以提交或中止事务，由参数标志commit指定。在其执行过程中的任何时候，操作者都可以抛出一个TransactionAbortedException异常，这表明发生了内部错误或死锁。我们为你提供的测试案例创建了适当的TransactionId对象，以适当的方式将它们传递给你的操作者，并在查询完成后调用 transactionComplete。我们还实现了TransactionId。

## Exercise 4.

Implement the transactionComplete() method in BufferPool. Note that there are two versions of transactionComplete, one which accepts an additional boolean commit argument, and one which does not. The version without the additional argument should always commit and so can simply be implemented by calling transactionComplete(tid, true).

在BufferPool中实现transactionComplete()方法。请注意，transactionComplete有两个版本，一个是接受额外的布尔提交参数，另一个是不接受。没有额外参数的版本应该总是提交，所以可以简单地通过调用 transactionComplete(tid, true) 来实现。

When you commit, you should flush dirty pages associated to the transaction to disk. When you abort, you should revert any changes made by the transaction by restoring the page to its on-disk state.

当你提交时，你应该将与事务相关的脏页冲到磁盘上。当你放弃的时候，你应该通过恢复页面到磁盘上的状态来恢复事务所做的任何改变。


Whether the transaction commits or aborts, you should also release any state the BufferPool keeps regarding the transaction, including releasing any locks that the transaction held.


无论事务是提交还是中止，你都应该释放BufferPool保存的关于该事务的任何状态，包括释放该事务持有的任何锁。


At this point, your code should pass the TransactionTest unit test and the AbortEvictionTest system test. You may find the TransactionTest system test illustrative, but it will likely fail until you complete the next exercise.

在这一点上，你的代码应该通过TransactionTest单元测试和AbortEvictionTest系统测试。你可能会发现TransactionTest系统测试的说明性，但在你完成下一个练习之前，它可能会失败。

## 2.8. Deadlocks and Aborts

It is possible for transactions in SimpleDB to deadlock (if you do not understand why, we recommend reading about deadlocks in Ramakrishnan & Gehrke). You will need to detect this situation and throw a TransactionAbortedException.

SimpleDB中的事务有可能出现死锁（如果你不明白为什么，我们建议阅读Ramakrishnan & Gehrke中关于死锁的内容）。你需要检测这种情况并抛出一个TransactionAbortedException。

There are many possible ways to detect deadlock. A strawman example would be to implement a simple timeout policy that aborts a transaction if it has not completed after a given period of time. For a real solution, you may implement cycle-detection in a dependency graph data structure as shown in lecture. In this scheme, you would check for cycles in a dependency graph periodically or whenever you attempt to grant a new lock, and abort something if a cycle exists. After you have detected that a deadlock exists, you must decide how to improve the situation. Assume you have detected a deadlock while transaction t is waiting for a lock. If you're feeling homicidal, you might abort all transactions that t is waiting for; this may result in a large amount of work being undone, but you can guarantee that t will make progress. Alternately, you may decide to abort t to give other transactions a chance to make progress. This means that the end-user will have to retry transaction t.

有许多可能的方法来检测死锁。一个草根的例子是实现一个简单的超时策略，如果一个事务在给定的时间内还没有完成，就中止它。对于一个真正的解决方案，你可以在一个依赖图数据结构中实现周期检测，如讲座中所示。在这个方案中，你将定期检查依赖图中的周期，或者每当你试图授予一个新的锁时，如果存在一个周期，就中止某事。在你检测到死锁存在后，你必须决定如何改善这种情况。假设你在事务t等待锁的时候检测到了一个死锁。如果你有杀人的冲动，你可以中止t正在等待的所有事务；这可能会导致大量的工作被撤销，但你可以保证t会取得进展。另外，你也可以决定中止t，给其他事务一个取得进展的机会。这意味着终端用户将不得不重试事务t。


Another approach is to use global orderings of transactions to avoid building the wait-for graph. This is sometimes preferred for performance reasons, but transactions that could have succeeded can be aborted by mistake under this scheme. Examples include the WAIT-DIE and WOUND-WAIT schemes.

另一种方法是使用事务的全局排序来避免建立等待图。出于性能方面的考虑，这有时是首选，但是在这种方案下，本来可以成功的事务可能会被错误地中止。例子包括WAIT-DIE和WOUND-WAIT方案。

## Exercise 5.

Implement deadlock detection or prevention in src/simpledb/BufferPool.java. You have many design decisions for your deadlock handling system, but it is not necessary to do something highly sophisticated. We expect you to do better than a simple timeout on each transaction. A good starting point will be to implement cycle-detection in a wait-for graph before every lock request, and you will receive full credit for such an implementation. Please describe your choices in the lab writeup and list the pros and cons of your choice compared to the alternatives.

在 src/simpledb/BufferPool.java 中实现死锁检测或预防。对于你的死锁处理系统，你有很多设计决定，但没有必要做一些非常复杂的事情。我们希望你能做得比每个事务的简单超时更好。一个好的起点是在每个锁请求前的等待图中实现周期检测，这样的实现将得到全额奖励。请在实验报告中描述你的选择，并列出你的选择与其他选择相比的优点和缺点。

You should ensure that your code aborts transactions properly when a deadlock occurs, by throwing a TransactionAbortedException exception. This exception will be caught by the code executing the transaction (e.g., TransactionTest.java), which should call transactionComplete() to cleanup after the transaction. You are not expected to automatically restart a transaction which fails due to a deadlock -- you can assume that higher level code will take care of this.

你应该通过抛出TransactionAbortedException异常来确保你的代码在发生死锁时正确中止事务。这个异常将被执行事务的代码所捕获（例如，TransactionTest.java），它应该调用 transactionComplete() 来清理事务。我们不期望你自动重启一个因死锁而失败的事务--你可以假设更高级别的代码会处理这个问题。

We have provided some (not-so-unit) tests in test/simpledb/DeadlockTest.java. They are actually a bit involved, so they may take more than a few seconds to run (depending on your policy). If they seem to hang indefinitely, then you probably have an unresolved deadlock. These tests construct simple deadlock situations that your code should be able to escape.

我们在test/simpledb/DeadlockTest.java中提供了一些（不是单元的）测试。它们实际上有点复杂，所以它们可能需要超过几秒钟的时间来运行（取决于你的策略）。如果它们似乎无限期地挂起，那么你可能有一个未解决的死锁。这些测试构建了简单的死锁情况，你的代码应该能够逃脱。

Note that there are two timing parameters near the top of DeadLockTest.java; these determine the frequency at which the test checks if locks have been acquired and the waiting time before an aborted transaction is restarted. You may observe different performance characteristics by tweaking these parameters if you use a timeout-based detection method. The tests will output TransactionAbortedExceptions corresponding to resolved deadlocks to the console.

注意，在DeadLockTest.java的顶部附近有两个计时参数；这些参数决定了测试检查是否已经获得锁的频率，以及中止的事务被重新启动前的等待时间。如果你使用基于超时的检测方法，你可以通过调整这些参数观察到不同的性能特征。测试将把解决死锁对应的TransactionAbortedExceptions输出到控制台。

Your code should now should pass the TransactionTest system test (which may also run for quite a long time depending on your implementation).

你的代码现在应该通过TransactionTest系统测试（根据你的实现，它也可能运行相当长的时间）。

At this point, you should have a recoverable database, in the sense that if the database system crashes (at a point other than transactionComplete()) or if the user explicitly aborts a transaction, the effects of any running transaction will not be visible after the system restarts (or the transaction aborts.) You may wish to verify this by running some transactions and explicitly killing the database server.

在这一点上，你应该有一个可恢复的数据库，也就是说，如果数据库系统崩溃（在 transactionComplete() 以外的地方），或者如果用户显式地中止一个事务，那么在系统重新启动（或者事务中止）之后，任何正在运行的事务的影响将不可见。 你可能希望通过运行一些事务和显式地杀死数据库服务器来验证这一点。

## 2.9. Design alternatives

During the course of this lab, we have identified some substantial design choices that you have to make:

在这个实验的过程中，我们已经确定了一些你必须做出的实质性设计选择。

Locking granularity: page-level versus tuple-level
Deadlock handling: detection vs. prevention, aborting yourself vs. others.
Bonus Exercise 6. (20% extra credit)

锁定颗粒度：页级与元组级
死锁处理：检测与预防，终止自己与终止他人。
奖励练习6. (20%的额外学分)

For one or more of these choices, implement both alternatives and experimentally compare their performance charateristics. Include your benchmarking code and a brief evaluation (possibly with graphs) in your writeup.

对于这些选择中的一个或多个，实现两种选择，并通过实验比较它们的性能特征。在你的文章中包括你的基准代码和简短的评估（可能有图表）。


You have now completed this lab. Good work!

你现在已经完成了这个实验。干得好!