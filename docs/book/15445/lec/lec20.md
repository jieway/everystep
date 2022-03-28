# Lec20 数据库恢复

数据库恢复有两个阶段：

1. 事物在处理的过程中做一些工作来实现恢复。
2. 失败后去恢复数据库的状态来确保 ACID 特性。


为了防止 WAL 越来越长，设置 CheckPoint 。一旦发送崩溃将会从 CheckPoint 开始读取后续的日志，此时就不需要读取整个日志了。

DBMS 周期性的推进 CheckPoint ，将内容持久化到磁盘中。CheckPoint 以上的已经提交的事务都刷到磁盘中。

CheckPoint 的问题：

1. CheckPoint 时要求数据库是静态的，此时要暂停所有事物，对性能有影响。
2. 需要扫描寻找未提交的事务花费大量的时间。
3. 频率过快影响性能，频率低了积累大量的数据后需要处理很长时间。


## ARIES

主要的想法：

1. WAL 先将日志写入磁盘。STEL + No Force
2. 恢复的时候先做 Redo log
3. 跑了一半的事物回滚 Undo log

实现：

LSN：日志序列号

flushedLSN 在此之前的日志都已刷入磁盘，在此之后的日志还在内存中。

pageLSN 记录了最近一次修改该页的 log 编号。当 page 最近被修改后都要更新 pageLSN 。记录在 page 中。pageLSN <= flushedLSN

recLSN 

lastLSN

MasterRecord 

![20220328144232](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220328144232.png)

正常运行：

假设：

1. 所有的日志记录都在一个页中。
2. 写入磁盘是原子级别的，也就是要么成功要么失败。
3. 严格 2PL
4. steal + No force

刷盘的操作是连续写，并且同步，锁定。

## TXN-END

事务结束的时候会提交一个 COMMIT ，但当此时和该事务相关的脏页还未完全写入磁盘。等待完全写入的时候会提交一个 TXN-END 。

也就是说 COMMIT 只代表日志进入了磁盘，而 TXN-END 则表示数据进了磁盘，但是此时已经滞后很多了。

![20220328145449](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220328145449.png)

## ABORT 回滚

prevLSN 该日志的上一条日志的序号。因为并发的缘故，事务的日志并非是连续的。

![20220328145921](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220328145921.png)

回滚的时候也要记下回滚的日志，回滚日志不需要刷盘。也就是 CLR 日志，CLR 日志永远不需要被回滚。

![20220328160924](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220328160924.png)

## Fuzzy Checkpointing



## Recovery 算法