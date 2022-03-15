# 6.830 Database Systems Spring 2021

课程主页：http://dsg.csail.mit.edu/6.830/

本地有测试，gradescope 没有开放。

建议 JDK 1.8 ，不要求具体平台。

直接 IEDA 打开就行。

接下来是 6 个 lab 实验手册的翻译。


* lab1：Tuple/HeapFile等基础设施
* lab2：查询算子 Join/GroupBy 等
* lab3：查询优化
* lab4：事务锁和死锁
* lab5：B+树增删
* lab6：回滚和恢复

首先下载代码：`git clone https://github.com/MIT-DB-Class/simple-db-hw-2021`

然后 IDEA 打开，接下来阅读 lab1.md 。

前面 ant 的讲解目前用不到，快速扫一遍就行。

一些要注意的点：

1. 先看对应测试类，看明白测试逻辑后再开始写，通过逐个测试。（有种升级打怪的感觉🤣）
2. 仔细阅读注释，注释有很多提示信息。
3. 文档建议环境 JDK 1.8 ，因为 Java 所以不限制平台，windows 上也能做。
4. 本地测试不全，GradeScope 不开放。感觉这个影响不大，课程的要求是搞定本地测试即可。
5. 有一些术语直译的话难以理解，建议直接搜英文原意。
6. 测试分为普通测试和系统测试，系统测试在 test/simpledb/systemtest 文件夹下，普通测试在 test/simpledb/ 目录下。


