# 第一章：基础

我认为这一章主要介绍的是如何使用**工具**。

一共五节，前两节主要是对 Java 语法的回顾，第三节则是三个数据结构，背包，队列和栈的API讲解。

而第四节是讲解的是如何分析算法。第五节则是针对具体的例子 union-find 算法，也就是并查集进行了实践。

算法分为**算法思想**和**实现细节**。而实现细节如果采用**具体的语言**来实现，会使得思想和实现细节混到一起难以剥离难以理解。本书采用的则是 Java 来直接描述算法。

由此也可以明白《算法导论》为什么采用伪码来描述算法。本书采用的是 Java 的子集，大部分语法和其他编程语言是通用的，很少使用 Java 的特性语言。

> 此处默认你已经学过 Java 或者其他语言的基本语法。前三节不再叙述。工具而已使用好就行！


## 算法分析

大多数的教材都是直接抛出模型，而没有直接提及模型是怎么来的。

从时间方面来看。首先从观察实际程序的运行时间出发，然后建立数学模型，之后在对模型进行分类。

而空间方面则是对内存进行了分析。

### 观察

可以从直接现实出发，利用时间 API 统计程序的运行时间。

根据数据规模和运行所需要的时间二者结合得到一个增长曲线。根据曲线粗略的得到一个增长函数。

例如一个程序的实际运行时间如图（横坐标是数据规模，纵坐标是运行时间）：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200704161438.png"/></div>

从上图中并不能看出什么有效的信息，但是对横坐标和纵坐标同去对数就会得到一个斜率为 3 的直线。这就说明原来的函数为 $T(N) = aN^3$ 。取对数后就是 $lg(T(N)) = 3 lgN + lga$

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200704161552.png"/></div>

这样根据公式就可以从输入数据的规模计算出程序运行的时间了。

由此也可以得出程序的运行时间符合幂次法则 $T(N) = aN^b$ 。

### 数学模型

程序运算的总时间和**每条语句的耗时**以及**执行每条语句的频率**有关。

前者和计算机，Java 编译器和操作系统有关。而后者取决于程序本身和输入。

对程序进行多次输入后得出，执行**最频繁**的指令决定了程序执行的总时间。这些指令也称为程序的**内循环**。

所以许多程序的运行时间都只取决于其中一小部分指令。

这样就使得程序的运行时间同具体的计算机剥离开来，只需要考虑程序本身即可。换台计算机对时间的影响是常数级别可以忽略。

### 增长数量级的分类

主要分为以下 7 种：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200704164331.png"/></div>


### 注意

* 不能忽略常数比较大的项。
* 计算机对于每条指令的执行时间可能并不是相同的，有些指令因为缓存的缘故很快就执行完毕。但是有些指令需要消耗不少时间。
* 系统不能对算法程序的运行时间产生影响。
* 程序在不同的场景下效果可能不一样。
* 对输入数据存在依赖，存在有些数据直接就是想要的结果，而有些则需要遍历全部也不一定能够找到想要的结果。


## 并查集 union-find

这一节讲的是 union-find 算法，也就是并查集。同时也是对应课程的第一节。

### 定义问题

> 我们需要明白这个算法解决了什么问题？也就是定义问题，然后是怎么解决的，之后就是改进了。

在现实世界中，如何判断两个人直接或间接的认识，间接认识表示二人通过第三方甚至更多人的联系而认识。

除此之外还有判断两地之间是否有必要建立通信线路，如果存在间接的联系则没必要。等等有很多类似的问题。

将以上的问题抽象起来，从集合的角度来看。要解决的问题则是判断两个点是否存在于同一集合之中。此处集合也称为**连通分量**。

如图所示，存在 7 个点，点和点之间的联系形成了 3 个连通分量。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200703160245.png"/></div>

当新加入一个联系时，点和点之间的联系随之发生改变。如图，2 和 5 之间建立了联系，变成了 2 个连通分量。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200703160502.png"/></div>

### 定义 API

为了解决这类问题，将其中的流程抽象化，自顶向下思考。可以写成五个函数：

* 首先需要初始化每个点 `UF(int N)` 
* 最后就是建立联系了 `void union(int p, int q)`
* 判断时需要找到根节点 `int find (int p) `
* 根据根节点是否一致来判断已经在一个连通分量中 `boolean connected (int p, int q)`

将 API 组织起来：

```java
public static void main(String[] args) {
    int N = StdIn.readInt();
    UF uf = new UF(N);
    while (!StdIn.isEmpty()) {
        int p = StdIn.readInt();
        int q = StdIn.readInt();
        if (uf.connected(p,q)) {
            continue;
        }
        uf.union();
        StdOut.println(p + " " + q);
    }
    StdOut.println(uf.count() + "components");
}
```

完整代码如下：

```java
public class UF {
    private int[] id;
    private int count;

    public UF(int N) {
        count = N;
        id = new int[N];
        for (int i = 0; i < N; i++) {
            id[i] = i;
        }
    }

    public int count() {
        return count;
    }

    public boolean connected(int p, int q) {
        return find(p) == find(q);
    }

    public int find(int p) {

    }

    public void union(int p, int q) {

    }

    public static void main(String[] args) {
        int N  = StdIn.readInt();
        UF uf = new UF(N);
        while (!StdIn.isEmpty()) {
            int p = StdIn.readInt();
            int q = StdIn.readInt();
            if (uf.connected(p,q)) {
                continue;
            }
            uf.union(p,q);
            StdOut.println(p + " " + q);
        }
        StdOut.println(uf.count() + "components");
    }
}

```

下面就是如何实现了！

### 细节实现

首先需要思考如何表示点与点之间的关系。

可以采用数组来表示，**索引**代表点本身，而存储的值代表**指向的点**。

起初一条联系都没有，都是孤立的点，所以将其指向的点都标识为自己，也就是数组中存储的值都改为其下标。

```java
public UF(int N) {
    // 表示连通分量的个数，初始为 N
    count = N;  
    id = new int[N];
    for (int i = 0; i < N; i++) {
        id[i] = i;
    }
}
```

数组的定义就是父节点，所以直接返回**父节点**即可。（注意此处的父节点同时也是根节点）

```java
    public int find(int p) {
        return id[p];
    }
```

首先判断是否已经连接，也就是父节点是否一致。已经连接的话就不需要在进行后续操作了，反之需要进行后续操作。

```java
    public void union(int p, int q) {
        int pID = find(p);
        int qID = find(q);

        if (pID == qID) {
            return;
        }

        for (int i = 0; i < id.length; i++) {
            if (id[i] == pID) {
                id[i] = qID;
            }
        }
        count--;
    }
```

为什么要遍历？假设存在两个连通分量，其中一个需要合并成一个，那么就需要将涉及到其中的所有点的父节点都修改为指向另外一个连通分量的父节点。


### 改进 find

每次进行 union 都需要执行一遍 for 循环，是一个**线性增长**。

此外 N 个点就有 N 个联通分量，假设要变成 1 个联通分量的话最多需要进行 N - 1 次 uoion 操作。

所以这个时间复杂度就是 $O(N^2)$ 了。

union 的修改如下：

```java
    public void union(int p, int q) {
        int pRoot = find(p);
        int qRoot = find(q);

        if (pRoot == qRoot) {
            return;
        }

        id[pRoot] = qRoot;

        count--;
    }
```

直接赋值干掉了一个 for 循环，消除了**线性增长**。

但是 find 也要随之修改。find 需要拿到**根节点**，根节点的修改才能代表整个连通分量的合并。

可以修改 find 为如下：

```java
    public int find(int p) {
        while(p != id[p]) {
            p = id[p];
        }
        return p;
    }
```

通过循环找到根节点。如图，假设 3 和 5 之间要连接。那么首先找到 3 的根节点 9 ，5 的根节点 6 ，将 9 和 6 的指向修改即可。

修改前：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200704140137.png"/></div>


修改后：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200704140213.png"/></div>

这样就使得和 3 在同一连通分量下的所有阶段都合并到和 5 相关的连通分量中。而之前则是需要一个循环来修改所有与 3 相关的连通分量中的所有值。

注意每次拿到的是根节点，而非父节点。之前虽然得到的也是父节点，但因为只有两层的关系，所以也是根节点。此处修改 unoin 后，就变为了多层的关系。

这样操作带来的坏处就是如果层数过多， find 需要循环多次才能拿到根节点。而且在也与输入的数据有关，在一些情况下甚至还不如之改进前的速度快。

### 增加加权判断

find 操作次数多是因为层数过深，进一步修改就是降低层数。可以将其想象成一颗倒立的树，每次合并之时都是**小树**指向**大树**，这样就降低了树高。

假设有两颗树，树高分别为 5 和 3 。如果 5 指向 3 ，树高就会变为 8 。反之 3 指向 5 ，因为 3 没有 5 大，所以高度还是 5 ，3 则是挂在了 5 上。

加权就是判断树高，使得小树挂在大树上。

首先增加一个数组，用于存储树高。其高度均为 1 。

```java
    public WeightedQuickUnion(int N) {
        count = N;
        id = new int[N];
        for (int i = 0; i < N; i++) {
            id[i] = i;
        }
        
        sz = new int[N];
        for (int i = 0; i < N; i++) {
            sz[i] = 1;
        }
    }
```

union 修改如下：


```java
    public void union(int p, int q) {
        int i = find(p);
        int j = find(q);
        
        if (i == j) {
            return;
        }
        
        if (sz[i] < sz[j]) {
            id[i] = j; sz[j] += sz[i];
        }else {
            id[j] = i; sz[i] += sz[j];
        }
        
        count--;
    }
```

### 压缩路径

最初因为需要修改大量连接而低效。

将其优化后又因为当 find 操作需要循环多次而低效。

加权后的效果已经很好了，但是依旧存在 find 循环问题，最好不要让其循环，其实也就是压缩路径了。

可以在其循环之时顺便将父节点直接指向根节点。例如 CPP 版递归时进行压缩路径的实现。

```cpp
int find(int x) {
    if (f[x] == x) {return x;}
    return f[x] = find(f[x]); 
}
```

### 总结

这样优化后已经是最好的了，但依旧不是常数级别。事实上常数是不可能的，加权加上压缩路径已经是最优的了。

