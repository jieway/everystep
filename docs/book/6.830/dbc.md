# ch16

Query Optimization

Query optimization is the process of selecting the most efficient query-evaluation plan from among the many strategies usually possible for processing a given query, especially if the query is complex. We do not expect users to write their queries so that they can be processed efficiently. Rather, we expect the system to construct a query-evaluation plan that minimizes the cost of query evaluation. This is where query optimization comes into play.

查询优化是指从通常可能处理给定查询的许多策略中选择最有效的查询评估计划的过程，特别是当查询是复杂的时候。我们并不期望用户编写他们的查询，以便能够有效地处理这些查询。相反，我们希望系统能够构建一个查询评估计划，使查询评估的成本最小化。这就是查询优化开始发挥作用的地方。

One aspect of optimization occurs at the relational-algebra level, where the system attempts to find an expression that is equivalent to the given expression, but more efficient to execute. Another aspect is selecting a detailed strategy for processing the query, such as choosing the algorithm to use for executing an operation, choosing the specific indices to use, and so on.

优化的一个方面发生在关系代数层面，系统试图找到一个与给定表达式等价的表达式，但执行起来更有效率。另一个方面是选择处理查询的详细策略，例如选择用于执行操作的算法，选择使用的具体指数，等等。

The difference in cost (in terms of evaluation time) between a good strategy and a bad strategy is often substantial and may be several orders of magnitude. Hence, it is worthwhile for the system to spend a substantial amount of time on the selection of a good strategy for processing a query, even if the query is executed only once.

一个好的策略和一个坏的策略之间的成本差异（以评估时间计）往往很大，可能是几个数量级。因此，对于系统来说，即使查询只执行一次，也值得花费大量的时间来选择处理一个查询的好策略。

## 16.1 Overview

Consider the following relational-algebra expression, for the query “Find the names of all instructors in the Music department together with the course title of all the courses that the instructors teach.”1

考虑下面的关系代数表达式，查询 "查找音乐系所有教员的名字以及教员所教的所有课程的课程名称 "1。

Πname,title (σdept name =“Music” (instructor ⋈ (teaches ⋈ Πcourse id,title(course))))

The subexpression instructor ⋈ teaches ⋈ Πcourse id,title(course) in the preceding expression can create a very large intermediate result. However, we are interested in only a few tuples of this intermediate result, namely, those pertaining to instructors in the

