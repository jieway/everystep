# Lecture #14: Query Planning & Optimization I

> 0. 阅读帆船书 Chapter 13
> 1. [fall2019/schedule](https://15445.courses.cs.cmu.edu/fall2019/schedule.html)
> 2. [14-optimization1.pdf](https://15445.courses.cs.cmu.edu/fall2019/slides/14-optimization1.pdf)
> 3. [视频中文翻译](https://www.bilibili.com/video/BV1Cp4y1C7dv?p=14)
> 4. [一个好一点的视频中文翻译](https://www.zhihu.com/zvideo/1416347667424940032)
> 5. [13-查询优化-I [中文讲解] CMU-15445 数据库内核](https://www.bilibili.com/video/BV1qR4y1W7v6/?spm_id_from=333.788)


## QUERY OPTIMIZATION

![20220318155259](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155259.png)

因为 declarative language 的缘故，查询的具体过程是由 DBMS 实现，而不同的过程开销不同，DBMS 需要选出性能最好的查询计划，进而引出了优化。

declarative language : 所谓声明式语言，我觉得可以简单的理解为完成一个任务，只看结果，至于怎么完成的都由系统的实现者来决定而非写代码的人要考虑的问题。SQL 就是一种生命式语言，SQL 告诉 DBMS 想要什么，而不是告诉 DBMS 怎么做。

目前出现了两个流派，第一个流派是声明式的语言，具体执行过程由 DBMS 来决定。第二个流派是人来写具体的执行过程。

优化一般有两种优化的思路：

1. 启发式的，重写查询，移除效率低的部分，不需要成本模型。
2. 估计每一个查询计划的开销，选择开销最小的查询计划。

一般来说以上两种手段都会采用。

![20220318155350](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155350.png)

如果两个关系代数产生的 tuple 集是相同的，那么可以认为二者是等价的。根据这个原理来实现优化。

大部分的 DBMS 都会重写查询计划而非原生的 SQL 语句。

一些具体的例子：

1. 谓词下推(Predicate Push-down)，提前过滤符合条件的 tuple 从而降低 join 时中间数据集的大小。
2. Projections Push down，
3. 表达式简化(Expression Simplification)，重写出来一个更简单的表达式。

## ARCHITECTURE OVERVIEW 查询流程总览 

![20220318153541](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318153541.png)

1. SQL 查询。进行一些简单的预处理，处理一下字符串。
2. Parser 生成抽象语法树。
3. Binder 建立 AST 和数据库表名称之间的映射。
4. 生成初始的逻辑计划，重写 Tree 。
5. 优化：启发式，代价分析。
6. 生成物理计划。

## 逻辑查询计划和物理查询计划的区别

![](image/lec14/1647590081687.png)

逻辑算子和物理算子之间的映射，但是二者并非一对一对应，一个逻辑计划可能对应三个具体的物理算子。

物理算子定义了具体的执行流程。

可以简单的将其理解为数据结构中的逻辑结构和物理结构。

优化是一个 NP-Hard 问题。

## 关系代数的等价性

如果两种查询得到同样的 tuple 集，那么可以认为这两种查询是等价的。

查询重写(query rewriting)：DBMS 可以不通过开销模型来得到更好的查询。

## 谓词下推 PREDICATE PUSHDOWN

下图是一个不做任何优化的查询例子。连接 student 和 enrolled 两个表查询成绩(grade)字段为 'A' 的学生 name 和 cid 。

![20220318155828](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155828.png)

一个简单的优化措施：可以提前过滤 enrolled 表，将 grade='A' 的行筛选出来再与 student 表连接。这样就降低了两个表连接后所产生中间数据的大小。

![20220318155929](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318155929.png)

尽可能早的过滤。

重排 predicates 顺序。

简化复杂的 predicate 。

可以同样提前过滤 student 表，因为只用到了 sid，name 两列，而其他列都没有用到如果加载到内存中显然浪费。

![](image/lec14/1647591114372.png)

## 更多例子

接下来是一些能够直接处理的优化，也就是在语法层面存在一些很直接的优化。

例如下面的语句显然不合理，所以并没有真正的去执行，而是直接处理返回结果。

![20220318162333](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318162333.png)

除此之外还有更多的例子：

![20220318162517](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318162517.png)

## 开销模型组成

1. 物理开销：CPU 执行，I/O，缓存命中等开销。
2. 逻辑开销：算子处理数据量的开销。
3. 算法开销：时间复杂度。

磁盘的开销是最大的。

