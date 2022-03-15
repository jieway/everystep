# Lab 6: Rollback and Recovery

根据日志内容实现 rollback 和 recovery 。

当读取 page 时，代码会记住 page 中的原始内容作为 before-image 。 当事务更新 page 时，修改后的 page 作为 after-image 。使用 before-image 在 aborts 进行 rollback 并在 recovery 期间撤销失败的事务。

## Exercise 1: LogFile.rollback()

实现LogFile.java中的rollback()函数

通过LogTest系统测试的TestAbort和TestAbortCommitInterleaved子测试。

rollback() 回滚指定事务，已经提交了的事务上不能执行该方法。将上一个版本的数据写回磁盘。

当一个事务中止时，在该事务释放其锁之前，这个函数被调用。它的工作是解除事务可能对数据库做出的任何改变。


## Exercise 2: LogFile.recover()

实现 Implement LogFile.recover().

重启数据库时会率先调用 LogFile.recover() 

对于未提交的事务：使用before-image对其进行恢复，对于已提交的事务：使用after-image对其进行恢复。