
# Lab 4: SimpleDB Transactions

Transactions 被翻译为事物，其实就是一个原子级的操作，重点是操作不能被中断。用锁来实现原子级别的操作，但是单纯用锁的话存在串行化的问题，于是引入了 2PL 从而保证了串行化。

在 2PL 下，事物分为增长阶段 (growing phase) 和收缩阶段 (shrinking phase) ，区别在于前者只能不断加锁，而后者只能不断减锁，一旦开始减锁就意味着从增长阶段转为收缩阶段。

> 2PL 建议看这个视频 [16-两阶段锁](https://www.bilibili.com/video/BV1AZ4y1Q7vx/?spm_id_from=333.788) 或者阅读 《Database System Concepts》 18.1.3 The Two-Phase Locking Protocol 这篇文章也不错：https://zhuanlan.zhihu.com/p/59535337

## Exercise 1 and 2.

这两个练习是编写 BufferPool  最终通过 LockingTest 。

为 BufferPool 添加获取锁和释放锁的功能，修改 getPage() 实现 unsafeReleasePage(), holdsLock() 实现下一个练习才能通过 LockingTest 。

具体思路，实现一个 Lock 类和 LockManager 类。LockManager 类实现三个功能申请锁、释放锁、查看指定数据页的指定事务是否有锁。

## Exercise 3.

之前没有区分是否是脏页就直接写回了，不能将脏页直接淘汰。

修改 evictPage() 方法，倒着遍历，删除一个非脏页即可。

## Exercise 4.

实现 `transactionComplete()` 

通过 TransactionTest 单元测试和 AbortEvictionTest 系统测试

如果 commit 那么就把 tid 对应的所有页面持久化，也就是写入磁盘否则把该事物相关的页面加载进缓存中。

## Exercise 5.

检测死锁，然后通过 DeadlockTest 和 TransactionTest 系统测试。

设置一个区间，如果超时就说明发生死锁了。

