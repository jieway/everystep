# 第三章：查找

查找是很重要的功能，帮助我们高效检索访问海量信息。这一方面有很多经典的查找算法。

符号表是一张抽象的表，是存储数据的容器。这张表各种存储的信息称为**值**，按照指定的**键**可以去获取到**值**。

例如字典就是符号表，**单词**是键，而值则指单词对应的**解释**。

符号表也称为**索引**，根据**键**可以快速索引到对应的**值**。

存在多种数据结构实现符号表，在基本的 API 中，有三种经典的数据类型**二叉查找树**，**红黑树**和**散列表**可以实现高效的符号表。

# 符号表

符号表的主要目的是将**一个键**和**一个值**联系起来并支持**插入键值对**和**根据键查找相应的值**两种操作。

构造出符号表背后**高效的数据**结构来实现高效的**查找**和**插入**算法。除此之外还有一些其他的 API 操作需要实现。

## API

首先定义所需的 API 操作。然后具体实现。

1. `ST()` 创建一张符号表。
2. `void put(Key key, Value val)` 将键值对存入表中，如果值为空就将键删去。
3. `Value get(Key key)` 拿到键 key 对应的值，如果键不存在就返回空。
4. `void delete(Key key)` 从表中删去键 key 及其对应的值。
5. `boolean contains(Key key)` 判断键 key 在表中是否有对应的值。
6. `boolean isEmpty()` 判断表是否为空。
7. `int size()` 表中键值对的数量。
8. `Iterable<Key> keys()` 表中所有键的集合。

### 设计原则

设计之前需要注意的几个要点。

* 支持泛型，用 Comparable 来扩展。
* 不允许键重复。插入会导致冲突。
* 键不能为空，空键会导致运行异常。
* 不允许有空值，因为 get() 的定义是键不存在时返回空，也就表明不在表中的键关联的值都是空。
  * 可以用 get() 方法是否返回空来判读键是否存在于符号表中。
  * 可以用 put() 方法第二个参数设置为空来实现删除。（延时删除）
* 删除操作，分为延时删除和即时删除两种。
  * 延时删除就是 put() 实现。
  * 即使删除则是 delete() 立即实现删除。
* 继承了 Iterable 接口，可以使用其中的迭代器。
* 键的等价性，比如比较大小，但是对于时间数据，需要自己设置比较方式。用 Comparable 对象来实现，保证一致性。

## 有序符号表

在符号表的基础上保证了**键的有序性**。这样势必要保证键在比较时的等价性。键都是 Comparable 对象，利用其接口来具体实现自定义对象的比较。

关于有序符号表的 API 如下：

一些具体实现的功能：

**最大值最小值**：对于一组有序的键，可以直接查询最大键和最小键。但是和优先队列不同的是优先队列中允许重复的键存在，但符号表中不行，除此之外符号表中还支持更多的操作。

`delete(min())` 和 `delete(max())` 。

**向下取整和向上取整**：向下取整可以找到小于等于该键的最大键。向上取整可以找到大于等于该键的最小键。例如整数 3.5 向下取整为 3 向上取整为 4 。 这个操作有时候非常有用。

`int size(Key lo , Key hi)`

**范围查找**：查找指定范围内键的个数及其内容。

## 用例举例

FrequencyCounter 统计了各个单词出现的**频率**并将出现频率最高的单词打印出来。

```java
public class FrequencyCounter {

    public static void main(String[] args) {
        int distinct = 0, words = 0;
        int minlen = Integer.parseInt(args[0]);
        ST<String, Integer> st = new ST<String, Integer>();

        while (!StdIn.isEmpty()) {
            String key = StdIn.readString();
            if (key.length() < minlen) continue;
            words++;
            if (st.contains(key)) {
                st.put(key, st.get(key) + 1);
            }
            else {
                st.put(key, 1);
                distinct++;
            }
        }

        String max = "";
        st.put(max, 0);
        for (String word : st.keys()) {
            if (st.get(word) > st.get(max))
                max = word;
        }

        StdOut.println(max + " " + st.get(max));
        StdOut.println("distinct = " + distinct);
        StdOut.println("words    = " + words);
    }
}
```

根据不同的数据量来测试这个程序。

而性能时主要和**单词总量**和**不重复单词总数**两个值相关。

这个例子和大多数符号表有很多相似的特性，例如：

* 混合使用查找和插入操作；
* 大量使用不同的键；
* 查找操作比插入操作多得多；
* 查找和插入并非随机，但也不可预测；

在实际的场景下需要对百万个键值对的表中处理上亿次交易。

如何高效的实现符号表并解决满足以上的这些特点是研究的重点。

## 无序链表中的顺序查找

可以采用链表来是实现。基于无序链表实现的顺序查找。

仔细看这张图，每次添加新的键会创建新结点挂在头部，而画圈部分则根据已有的键去更新值。

<div aligen="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200707180127.png"/></div>

`get()` 方法遍历全部，用 `equals()` 来比较值是否一致，一致就取出值反之继续遍历，如果没有就返回空。

```java
public Value get(Key key) {
  for (Node x = first; x != null; x = x.next) {
    if (key.equals(x.key)) {
      return x.val;
    }
  }
  return null;
}
```

`put()` 方法同样是遍历全部，如果存在相同的键就更新，反之创建一个新节点。

```java
public void put(Key key,Value val) {
  for (Node x = first; x != null; x = x.next) {
      if (key.equals(x.key)) {
          x.val = val;return;
      }
  }
  first = new Node(key,val,first);
}
```

分析：

* 对于**未命中**的**插入**和**查找**都需要进行 N 次比较。
* 对于**命中**的**查找**最坏同样要比较 N 次。
* 向**空表**中插入 N 个不同的键需要 $frac{N^2}{2}$ 次比较。

查找已经存在的键的平均比较次数为：$frac{(N+1)N}{2}$

例如查找第一个需要比较一次，第二个比较两次，以此类推 $(1+2+3+ .... + N)/N=\frac{(N+1)N}{2}$

<div aligen="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200707180213.png"/></div>

## 有序数组中的二分查找

如果用一对**平行数组**来实现，其中一个数组用于存储**键**，另一个数组用于存储**值**。

增加了一个 rank 方法，也就是二分查找的实现方式。根据键可以找到对应的索引。

rank 方法的实现：

如果表中存在该键就返回该键的**位置**，同时这个数字也是表中**小于它的键的数量**。

如果表中不存在该键依旧返回表中**小于它的键的数量**。

递归版：

```java
public int rank(Key key,int lo , int hi) {
    if (lo > hi) return lo;
    int mid = lo + (hi - lo) / 2;
    int cmp = key.compareTo(keys[mid]);
    if (cmp < 0) {
        return rank(key,lo,mid-1);
    }else if (cmp > 0) {
        return rank(key,mid+1,hi); 
    }else {
      return mid;
    }
}
```

迭代版：

```java
public int rank(Key key) {
  int lo = 0, hi = N-1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    int cmp = key.compareTo(keys[mid]);
    if (cmp < 0) {
      hi = mid - 1;
    }else if (cmp > 0) {
      lo = mid + 1;
    }else {
      return mid;
    }
  }
  return lo;
}
```
对于 put 操作而言，调用 rank 方法找到对应的位置更新值即可，如果没有对应的键，在 rank 找到的下标上更新，然后原数组中元素后移。

```java
public void put(Key key, Value val)  {
  int i = rank(key);
  if (i < n && keys[i].compareTo(key) == 0) {
      vals[i] = val;
      return;
  }
  for (int j = n; j > i; j--)  {
      keys[j] = keys[j-1];
      vals[j] = vals[j-1];
  }
  keys[i] = key;
  vals[i] = val;
  n++;
} 
```

对于 get 操作而言，用 rank 方法找到对应的位置拿到值即可，如果没有找到就返回空。

```java
public Value get(Key key) {
  if (key == null) throw new IllegalArgumentException("argument to get() is null"); 
  if (isEmpty()) return null;
  int i = rank(key); 
  if (i < n && keys[i].compareTo(key) == 0) return vals[i];
    return null;
  } 
```

## 对二分查找的分析

N 个键的有序数组中进行二分查找最多需要进行 $log(N)+1$ 次比较。（无论是否成功）。

二分查找查找时很快，但是插入时慢。

向一个大小为 N 的有序数组中插入一个新元素最坏情况小需要访问 $2N$ 次数组，那么插入 $N$ 个元素时最坏情况下需要访问 $N^2$ 次数组。

## 预览

对于线性查找和二分查找的分析如下：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711205930.png"/></div>

二分查找的缺点在于无法实现**高效的插入**操作，但是链表的优点则是**高效的插入**而缺点则是需要**遍历全部来索引**。

如何将二分查找**高效的索引**和链表**高效的插入**结合是接下来学习的方向。

拥有二者优点的是二叉查找树（BST）

这一章有六种符号表的实现，以下是简单的对比以及适用的场景。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711210759.png"/></div>

# 二叉查找树

二叉查找树是在二叉树的基础上添加了一些规则。

在二叉树中，出了根节点以外的每个结点只能有一个父节点，根节点没有父节点。

并且每一个结点都只有左右两个链接，分别指向左子结点和右子结点。

可以将每个链接指向了另一颗二叉树，而这颗二叉树的根节点就是链接所指向的结点。因此也可以将每一个二叉树定义为一个空链接。

或者是一个有左右链接的结点，每个链接都指向了一颗独立的子二叉树。

对于二叉查找树而言每一个结点都包含了一对键值。

在画二叉查找树时通常将键写在结点上，而将值写在结点旁边。

## 基本实现

如何用二叉查找树来实现有序符号表的 API ？

首先需要将数据结构表示出来，然后实现其对应的 get() / put() 方法。

### 数据表示

如何定义一颗二叉查找树，首先定义一个私有类来表示其中的每一个结点。

每一个结点都含有一对键值，左链接，右链接和一个结点计数器。

左链接指向一颗**小于该节点的所有键**所组成的二叉树，右链接则指向一颗**大于该结点的所有键**所组成的二叉树。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711224301.png"/></div>

简而言之左节点小于其父节点，右结点大于其父节点，并且这条规则对所有结点都成立。

如果将一颗二叉查找树所有键投影到一条直线上，保证每一个结点左子树的键出现在它的右边，那么我们可以得到一条有序的键列。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711230515.png"/></div>

结点计数器用变量 N 来实现，表示以该结点为根的子树的**结点总数**。

```java
private class Node {
  private Key key; // 键
  private Value value; // 值
  private Node left, right; // 左右链接
  private int N; // 以该节点为根的子树中的结点总数
  public Node(Key key, Value value,int N) {
    this.key = key; this.value = value; this.N = N;
  }
}
```

对于这段代码，树由 Node 对象组成，每个对象都含有一堆键值，两条链接和一个结点计数器 N 。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711224147.png"/></div>

一颗二叉查找树代表了一组键值的集合。二叉查找树本质上是由多颗二叉查找树组成。

### 查找

对于查找而言无非存在两种结果，**找到**和**没有找到**。

假设设计一个**递归算法**来实现查找功能：

首先如果要查找的树是一颗**空树**，那么肯定找不到，直接返回 null 即可。这也是递归的出口。

反之不是空树的话需要比对每一次**键**，如果**当前结点的键**和**要查找的键**相等那么就说明找到了。

除此之外如果要查找的键**小于**当前结点的键，那么选中**左子树**继续查找，反之选择值较大的**右子树**继续查找。

```java
private Value get(Key key) {
  return get(root,key);
}
private Value get(Node x, Key key) {
  if (x == null) return null;
  int cmp = key.compareTo(x.key);
  if (cmp < 0) return get(x.left, key); 
  else if (cmp > 0) return get(x.right, key);
  else return x.val;
}
```

和二分查找类似，每一次迭代后区间都会减半。并且理想情况下每次递归子树的大小也会减半。

而递归结束代表要么找到了相等的键要么没有找到返回一个空链接。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711230603.png"/></div>

### 插入

查找的代码几乎和二分查找一样。

二叉查找树的插入操作的实现难度和查找差不多。

当查找一个不存在于树中的结点并结束于一条空链接时。将此链接指向新结点即可。

```java
private void put(Key key, Value val) {
  root = put(root, key, val);
}
private Node put(Node x, Key key, Value val) {
  if (x == null) return new Node(key, val, 1);
  int cmp = key.compareTo(x.key);
  if (cmp < 0) x.left = put(x.left, key, val);
  else if (cmp > 0) x.right = put(x.right, key, val);
  else x.val = val;
  // 因为插入了新结点，所以每一个结点上计数器的值在回溯时也要随之更行
  x.N = size(x.left) + size(x.right) + 1; 
  return x;
}
```

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711232323.png"/></div>

根据插入操作是可以从空树开始构建一颗二叉查找树的。

例如可以在一颗空树上不断的插入，最终得到一颗二叉查找树。具体建树过程如图。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711232539.png"/></div>


## 分析

二叉查找树的运行时间取决于树的形状，其实就是结点越多树高越低越好。

对于 N 个节点的树而言，最好的情况就是每条空链接和根结点的距离都是 $lgN$ 。

最坏的情况下，搜索路径上则有 $N$ 个结点。此时就和数组实现没有什么区别了。

以下是最好，一般，最坏的三种情况。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200712000450.png"/></div>

> 由 $N$ 个随机键构成的二叉查找树中，查找命中，未命中和插入操作平均所需的比较次数为 $2lnN$ 。

## 有序性相关的方法与删除操作

### 最大键和最小键

根据二叉查找树的定义可知：

如果左连接为空，那么最小键就是**根节点**。

反之非空那么**该树的最小键**就是**左子树中的最小键**。

最大键同理。

```java
public Key min() {
  return min(root).key;
}
private Node min(Node x) {
  if (x.left == null) return x;
  return min(x.left);
}
```

### 向上取整和向下取整


```java
public Key floor(Key key) {
  Node x = floor(root, key);
}
private Node floor(Node x, Key key) {
  if (x == null) return null;
  int cmp = key.compareTo(x.key);
  if (cmp == 0) return x;
  if (cmp < 0) return floor(x.left, key);
  Node t = floor(x.right, key);
  if (t != null) return t;
  else return x;
}
```

### 排名

### 删除最大键和删除最小键

### 删除操作

### 范围查找

### 性能分析

# 平衡查找树

## 2-3 查找树

## 红黑二叉查找树

## 实现

## 删除操作

## 红黑树的性质

# 散列表

## 散列函数

## 基于拉链法的散列表

## 基于线性探测法的散列表

## 调整数组大小

## 内存使用

# 应用