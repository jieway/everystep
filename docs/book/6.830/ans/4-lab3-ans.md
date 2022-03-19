# Lab 3: Query Optimization

* [数据库内核杂谈（七）：数据库优化器（上）](https://www.infoq.cn/article/GhhQlV10HWLFQjTTxRtA)

> 查询优化并非是让用户写出能够被高效处理的查询，而是期望系统能够构造一个让查询执行代价最小的查询计划。

这个 lab 大致要实现一个查询优化器，实现一个选择性估计框架和一个基于成本(Selinger)的优化器。

1. 实现 TableStats 类中的方法，使其能够使用直方图（IntHistogram类提供的骨架）或你设计的其他形式的统计数据来估计过滤器的选择性和扫描的成本。

2. 实现 JoinOptimizer 类中的方法，使其能够估计 join 的成本和选择性。

3. 编写 JoinOptimizer 中的 orderJoins 方法。这个方法必须为一系列的连接产生一个最佳的顺序（可能使用Selinger算法），给定前两个步骤中计算的统计数据。

基于开销优化器的主要思想：

评估不同查询计划下的成本，根据成本选择最佳的排列和连接方式。

精确的估计是很难的，这个实验只关注连接序列和基本表访问的成本。

根据 table 的统计数据来估计不同查询计划的开销。通常一个计划的成本与 intermediate joins 和 tuple 数量，以及 selectivity of filter 和 join predicates 的选择性有关。

根据统计数据以最佳方式排列连接和选择，并从几个备选方案中选择连接算法的最佳实现。

当使用嵌套循环连接时，记得两个表t1和t2（其中t1是外表）之间的连接成本是简单的。

    joincost(t1 join t2) = scancost(t1) + ntups(t1) x scancost(t2) //IO cost
                        + ntups(t1) x ntups(t2)  //CPU cost
    Here, ntups(t1) is the number of tuples in table t1.

这里，ntups(t1)是表t1中 tuples 的数量。

首先要计算出开销，而开销由 I/O 开销和 CPU 开销两部分组成。其中需要用到表中 tuple 的数量。下面是如何统计 tuple 数。

> 查询的开销为什么这样算？

## Exercise 1: IntHistogram.java

实现 IntHistogram 并通过 IntHistogramTest。

针对一个属性构建一张直方图，横坐标代表属性对应范围，纵坐标代表对应范围内 tuple 的数量。

其实就是计算对应条件下 tuple 的数量对于总数的占比。

占比计算 `(h / w) / ntups`  ntups 是纵坐标的累加和，也就是 tuple 的总数。

`(h / w)` 表示桶中含有值常数的 tuples 的预期数量。 h 的表示桶中 tuple 的总数，并不是均匀的高度！！！

部分区间的占比 ：`b_part = (b_right - const)/ w_b` `b_f = h_b / ntups` `b_f x b_part`

* `addValue(int v)`

根据输入数据构建直方图的分部，计算出对应桶序号累加即可。

* `estimateSelectivity(Predicate.Op op, int v)` 估计

这个类用来计算占比。具体的计算规则是根据运算符 op 判断(大于，小于，等于...)，v 就是 const ，遍历。例如 op 是大于， v 是 3 ，那么就是计算横坐标大于 3 所有 tuple 个数除以总 tuple 个数(ntuple)。也就是大于 3 tuple 占总 tuple 的百分比。

## Exercise 2: TableStats.java

实现 TableStats 并通过 TableStatsTest。

* 实现TableStats构造函数

为 table 的每一个 field 构建一张直方图。

根据 tableid 拿到 table，然后遍历 table 的每个字段(field)构建直方图。注意 field 分为整数和字符串两种类型，分别用 map 来存。

首先获取每一列对应的内容，放入 list 中。然后获取所有列的内容，一列就是一个 field ，一列生成一个直方图。

* estimateScanCost() 

IO 成本是页数乘上单页 IO 的开销。

* estimateTableCardinality()

tuple 总数乘上系数 (selectivityFactor)。

* estimateSelectivity()

根据输入的参数来估计 Selectivity ，三个参数分别是待估计的字段，比较符号，const。区分field 的int 和 string 分别调用 estimateSelectivity() 即可。

## Exercise 3: Join Cost Estimation

编写 JoinOptimizer 并通过 JoinOptimizerTest 中的 estimateJoinCostTest 和 estimateJoinCardinality 即可。

* 实现 `estimateJoinCost()` 方法，估计 join 的成本。

计算公式：

  joincost(t1 join t2) = scancost(t1) + ntups(t1) x scancost(t2) //IO cost
                      + ntups(t1) x ntups(t2)  //CPU cost

> Nested-loop (NL) join是所有join算法中最naive的一种。假设有两张表R和S，NL join会用二重循环的方法扫描每个(r, s)对，如果行r和行s满足join的条件，就输出之。显然，其I/O复杂度为O(|R||S|)。随着参与join的表个数增加，循环嵌套的层数就越多，时间复杂度也越高。因此虽然它的实现很简单，但效率也较低。

总结：成本 (cost) 分为 I/O 成本和 CPU 成本。I/O 成本是扫描表时和磁盘交互所产生的，而 CPU 成本是判断数据是否符合条件所产生的。其中 cost1 是扫描 t1 的 I/O 成本，cost2 同理。因为是 NL join 所以总的 I/O 开销就是 `cost1 + card1 * cost2` 。而 CPU 开销则是 `card1 * card2` 。总成本相加即可。

* estimateJoinCardinality 估计 join 后产生的 tuple 数。

lab3.md 中 2.2.4 Join Cardinality 部分有详细解释。

Cardinality 表示一列数据中数据的重复程度，如果等于 1 那么数据没有重复的，如果等于 0 那么全部都重复，其他情况加载 [0 , 1] 之间。具体可参考：[What is cardinality in Databases?](https://stackoverflow.com/questions/10621077/what-is-cardinality-in-databases) 。

对于等价连接() 其中一个属性是主键时，由连接产生的 tuples 的数量不能大于非主键属性的cardinality。只要保证这一点成立即可，所以其中一个是主键的话就选择一个小的，两个都是主键的话选择小的，两个都不是主键的话选择大的。这块的实现很灵活。

对于非等价连接文档给了公式 `card1 * card2 * 0.3` 。

## Exercise 4: Join Ordering

实现 JoinOptimizer.java 中的 orderJoins 方法并通过 JoinOptimizerTest 和系统测试 QueryTest 。

ex3 实现了开销估计和基数个数的估计。这个练习则是在多表连接的情况下根据开销分析选择最优的连接顺序。直接枚举的话复杂度是 O(n!) 。此处选择了一种 DP 的方法将复杂度降低到了 O(2^n)。

首先要理解什么是 left-deep-tree 可参考这篇[文章](https://www.infoq.cn/article/JCJyMrGDQHl8osMFQ7ZR)，写的很好！

然后阅读 [Exercise 4: Join Ordering](https://blog.csdn.net/weixin_45834777/article/details/120788433?spm=1001.2014.3001.5501) 部分。

JoinOptimizer 中的 join 属性是一个队列，其中存的都是 LogicalJoinNode 对象。

PlanCache 类，用来缓存 Selinger 实现中所考虑的连接子集的最佳顺序，接下来的任务就是找到最佳顺序。

`enumerateSubsets(joins, i);` 其中 i 表示子集中的子集的元素个数。例如 a,b,c 三张表，当 i=1 时，返回数据大致形态 set(set(ab) , set(ac), set(bc)) ， 注意 ab 是一个 LogicalJoinNode 所以尺寸是 1 。如果 i=2 ，那么返回的数据类似 set(set(ab, c) , set(ac, b), set(bc, a)) 。可以优化为回溯，避免创建大量对象。

> 这块内容建议阅读帆船书《Database System Concepts》第七版的 16.4.1 Cost-Based Join-Order Selection 部分

DP step:

1. 首先枚举左深树的组合顺序。

![20220318195217](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318195217.png)

2. 枚举不同顺序下不同 Join 算法的开销。

![20220318195401](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318195401.png)

3. 枚举每一个表的读表方式的开销。

![20220318195454](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318195454.png)

4. 暴力计算。

小于 12 个表用 DP ，否则开销巨大。

