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

而性能则主要和**单词总量**和**不重复单词总数**两个值相关。

这个例子和大多数符号表有很多相似的特性，例如：

* 混合使用查找和插入操作；
* 大量使用不同的键；
* 查找操作比插入操作多得多；
* 查找和插入并非随机，但也不可预测；

在实际的场景下需要对百万个键值对的表中处理上亿次交易。

如何高效的实现符号表并解决满足以上的这些特点是研究的重点。

## 无序链表中的顺序查找

可以采用链表来实现。基于无序链表实现的顺序查找。

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

`put()` 方法同样是遍历全部，如果存在相同的键就更新，反之创建一个新结点。

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

向一个大小为 N 的有序数组中插入一个新元素最坏情况需要访问 $2N$ 次数组，那么插入 $N$ 个元素时最坏情况下需要访问 $N^2$ 次数组。

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

在二叉树中，除了根结点以外的每个结点只能有一个父结点，根结点没有父结点。

并且每一个结点都只有左右两个链接，分别指向左子结点和右子结点。

可以将每个链接指向了另一颗二叉树，而这颗二叉树的根结点就是链接所指向的结点。因此也可以将每一个二叉树定义为一个空链接。

或者是一个有左右链接的结点，每个链接都指向了一颗独立的子二叉树。

对于二叉查找树而言每一个结点都包含了一对键值。

在画二叉查找树时通常将键写在结点上，而将值写在结点旁边。

## 基本实现

如何用二叉查找树来实现有序符号表的 API ？

首先需要将数据结构表示出来，然后实现其对应的 get() / put() 方法。

### 数据表示

如何定义一颗二叉查找树，首先定义一个私有类来表示其中的每一个结点。

每一个结点都含有一对键值，左链接，右链接和一个结点计数器。

左链接指向一颗**小于该结点的所有键**所组成的二叉树，右链接则指向一颗**大于该结点的所有键**所组成的二叉树。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711224301.png"/></div>

简而言之左结点小于其父结点，右结点大于其父结点，并且这条规则对所有结点都成立。

如果将一颗二叉查找树所有键投影到一条直线上，保证每一个结点左子树的键出现在它的右边，那么我们可以得到一条有序的键列。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200711230515.png"/></div>

结点计数器用变量 N 来实现，表示以该结点为根的子树的**结点总数**。

```java
private class Node {
  private Key key; // 键
  private Value value; // 值
  private Node left, right; // 左右链接
  private int N; // 以该结点为根的子树中的结点总数
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

对于 N 个结点的树而言，最好的情况就是每条空链接和根结点的距离都是 $lgN$ 。

最坏的情况下，搜索路径上则有 $N$ 个结点。此时就和数组实现没有什么区别了。

以下是最好，一般，最坏的三种情况。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200712000450.png"/></div>

> 由 $N$ 个随机键构成的二叉查找树中，查找命中，未命中和插入操作平均所需的比较次数为 $2lnN$ 。

## 有序性相关的方法与删除操作

### 最大键和最小键

根据二叉查找树的定义可知：

如果左连接为空，那么最小键就是**根结点**。

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

根据二叉搜索树的性质可知，左子树的键小于根结点的键小于右子树的键。

如果给定的 Key 小于二叉查找树的根结点的键，那么小于等于 Key 的最大键一定在根结点的左子树中。

如果给定的 Key 大于二叉查找树的根结点的键，如果在根结点的右子树中找不到小于 Key 的键，根结点就是小于等于 Key 的最大键，反之小于等于 Key 的最大键就在右子树中。

如下是一个向下取整的递归代码：

```java
public Key floor(Key key) {
  Node x = floor(root, key);
}
private Node floor(Node x, Key key) {
  if (x == null) return null; 
  int cmp = key.compareTo(x.key);
  if (cmp == 0) return x; // 等于的结点
  if (cmp < 0) return floor(x.left, key); // 从左子树里面查
  Node t = floor(x.right, key); // 从右子树里面查
  if (t != null) return t; // 从右子树里面找到了结点
  else return x; // 没有找到就返回根结点
}
```

### 选择操作

首先回顾一下 N 的含义，N 表示以该结点为根的子树的**结点总数**

根据 `size()` 方法可以拿到以该结点为根结点的子树的结点总数。

```java
public size() {
  return size(root);
}
private int size(Node x) {
  if (x == null) return 0;
  else           return x.N;
}
```

select() 方法可以根据排名找到对应的键，例如 select(3) 表示找到排名为 3 的键。

首先写出递归结束的条件，然后判断当前结点的左结点的结点总数 t，这个数字表示小于根结点的结点数。

如果 t 大于要找的排名 k ，那么说明排名为 k 的键就在左子树里面。

反之 t 小于要找的排名 k ，那么说明要找的排名为 k 的键在右子树里面。

此时以根结点 $t+1$ 为基准， $k - t - 1$ 实际上是  $k-(t+1)$ ，此后继续以右子树为根结点递归查找。

```java
public Key select(int key) {
  return select(root, k).key;
}
private Node select(Node x, int k) {
  if (x == null) return null;
  int t = size(x.left);
  if      (t > k) return select(x.left, k);
  else if (t < k) return select(x.right, k - t - 1);
  else            return x;
}
```

### 排名

rank() 方法是 select() 的逆方法，根据给定的键返回排名。

如果给定的键小于等于根结点的键就返回左子树中结点的总数。

如果给定的键大于根结点的键就返回根结点左子树上键的总数加一（t+1）再加上它在右子树中的排名。

```java
public Key rank(Key key) {
  return rank(key, root);
}
private int rank(Key key, Node x) {
  if (x == null) return 0;
  int cmp = key.compareTo(x.key);
  if      (cmp < 0) return root(key, x.left);
  else if (cmp > 0) return 1 + size(x.left) + rank(key, x.right);
  else              return size(x.left);
}
```

### 删除最大键和删除最小键

根据二叉搜索树的定义递归的去找左子树直到遇到空链接前将结点的右链接返回即可。

对于最大键删除右子树即可。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200712212558.png"/></div>

```java
public void deleteMin() {
  root = deleteMin(root);
}
private Node deleteMin(Node x) {
  if (x.left == null) return x.right;
  x.left = deleteMin(x.left);
  x.N = size(x.left) + size(x.right) + 1;
  return x;
}
```

### 删除操作

删除最大最小值是比较简单的，因为只有零个或一个子结点。

如何删除拥有左右两个子结点的结点呢？被删除结点的父结点只有一条链接，指向哪个结点？

也就是当前结点被选中删除了，并且拥有两个子结点，如何重新组织结点之间的关系。

如果用**后继结点**来填补**删除结点**的位置的话，**后继结点**位于删除结点右子结点的最小结点。

```java
public void delete(Key key) {
  root = delete(root, key);
}
private Node delete(Node x, Key key) {
  if (x == null) return null;
  int cmp = key.compareTo(x.key);
  if      (cmp < 0) x.left = delete(x.left, key);
  else if (cmp > 0) x.right = delete(x.right, key);
  else {
    if (x.right == null) return x.left;
    if (x.left == null) return x.right;
    Node t = x; // 保存删除结点的链接
    x = min(t.right);  // 去右子树里面寻找替代的结点
    x.right = deleteMin(t.right);
    x.left = t.left;
  }
  x.N = size(x.left) + size(x.right) + 1;
  return x;
}
```

这种方法虽然能够正确的删除一个结点。

但是如果仅仅删除后继结点的话，对于整颗树而言是不平衡的，仅仅考虑了后继部分，没有考虑到树的对称性。

### 范围查找

根据中序遍历二叉查找树可以得到一个升序的顺序。

```java
private void print(Node x) {
  if ( x == null ) return;
  print(x.left);
  StdOut.println(x.key);
  print(x.right);
}
```

如果想要根据范围找到范围内的键完全可以利用中序遍历，将符合条件的键保存下来即可。

如果当前结点的键大于要找的键，就去左子树里面继续搜寻，直到搜寻到下界。

然后判断条件加入队列，再判断右子树确定上界。
```java
public Iterable<Key> keys() {
  return keys(min(), max());
}
public Iterable<Key> keys(Key lo, Key hi) {
  Queue<Key> queue = new Queue<Key>();
  keys(root, queue, lo, hi);
  return queue;
}
private void keys(Node x, Queue<Key> queue, Key lo, Key hi) {
  if (x == null) return;
  int cmplo = lo.compareTo(x.key);
  int cmphi = hi.compareTo(x.key);
  if (cmplo < 0) keys(x.left, queue, lo, hi);
  if (cmplo <= 0 && cmphi >= 0 ) queue.enqueue(x.key);
  if (cmphi > 0) keys(x.right, queue, lo, hi);
}
```

### 性能分析

二叉查找树所有操作的最坏情况下所需的时间都和树的高度成正比。

因为这些操作都是沿着树的一条或两条路径进行。而路径的长度不可能大于树的高度。

对于二叉查找树而言最坏的情况是不能接受的。

对于快速排序可以提前将数组打乱，控制最坏的情况出现。

但是对于二叉查找树而言依赖于输入顺序，这个顺序往往无法控制。

所以需要寻找更好的算法和数据结构。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200712233843.png"/></div>

# 平衡查找树

为了消除二叉查找树最坏情况而发明的新数据结构。

创造一种无论如何构造运行时间都在对数级别。

## 2-3 查找树

注意 **2-3 查找树**这个数据结构的提出是为了解决查找树**平衡性**存在的问题。

正常而言，树的结点都是**一个键**和**两条链接**分别指向**子结点**。（注意后续提到键时默认也包含了该键所对应的值）

但是对于 2-3 查找树而言，树的每个结点可以含有**一个键**和**两条链接**之外也可以含有**两个键**和**三条链接**。前者称为 2- 结点，后者称为 3- 结点。

如图，左边的是 3- 结点，右边是 2- 结点。可以根据当前结点存在**几条链接**来判断哪个是 2-3 结点。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715002928.png"/></div>

注意 2- 结点和 3- 结点每条链接都分别对应着其中保存的键所分割产生的一个区间。

对于完美平衡的 2-3 查找树而言，从根结点出发到叶子结点的距离都是相同的。

### 查找

从根结点出发，当根结点的键和要查找的键相等时表示命中，也就是找到。

反之，如果要查找的键小于根结点的键，那么去左子树里面查找，反之去右子树里面查。

之上是常规的 2- 结点的处理方式，对于 3- 结点需要和当前结点内的两个键比较。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715010622.png"/></div>

如果要查找的键小于当前结点内的两个键那么就去该结点的左子树里面查找，反之要查找的键均大于结点内的两个键，那么就去右子树里面查找。

因为有三条链接，所以当要查找的键大于其中一个结点且小于另外一个结点时就去中间的链接指向的子树里面查找。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715010554.png"/></div>

### 向 2- 结点插入新键

因为是插入，和二叉查找树类似，先进行一次未命中的查找。

此时根据查找操作遍历到了需要插入结点上，假设这个结点是 2- 结点，为了保持树的平衡性，可以将要插入的键插在该结点上将其变为 3- 结点。

### 向一颗**只含有** 3- 结点的树中插入新键

考虑一种特殊情况，也就是树中所有的结点均是 3- 结点。

当向 3- 结点插入新键时可以将其变为 4- 结点，也就是该结点存在 4 条链接和 3 个键。

对于 4- 结点的三个键可以分别命名为左键，中键和右键。即 左键 < 中键 < 右键 。此时中键可以很自然的变为一颗 2- 结点。

也就是将 4- 拆分为两个 3- 结点 和一个 2- 结点。看完图就明白了：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715142649.png"/></div>

变化后，这个树就是一颗平衡的 2-3 查找树了。这种变化说明了 2-3 查找树的生长过程。

### 向一个父结点为 2- 结点的 3- 结点中插入新键

此时依旧是向 3- 结点插入新键，但是父结点变为 2- 结点。

对于这种情况依旧可以直接将键插入 3- 结点中，将其变为 4- 结点。

然后针对 4- 结点进行分解，将**中键**提升到父结点上，将父结点从 2- 结点变为 3- 结点。

如图，注意仔细查看中键 b 和 c 的提升。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715143547.png"/></div>

因为中键提升到了父结点上，4- 结点变成了两个 2- 结点。

这种情况的插入依旧没有打破树的平衡，插入前后树的高度没有发生改变。

### 向一个父结点为 3- 结点的 3- 结点中插入新键

此时是向一个 3- 结点插入新键将其变为了 4- 结点。

4- 结点将中键向上**提升**，因为父结点是 3- 结点，提升后变成了 4- 结点。父结点继续向上提升中键。

从下之上的不断提升，这样不断的操作直到遇到了 2- 结点，将其变成了 3- 结点。或者始终没有遇到 2- 结点最终导致来到了根结点上，根结点变成了 4- 结点，本身再继续提升为两个 2- 结点和一个 3- 结点。

### 局部变化

对于一个 4- 结点而言，分解成一颗 2-3 树存在六种情况。

1. 4- 结点本身是根结点
2. 4- 结点是 2- 结点的左子结点
3. 4- 结点是 2- 结点的右子结点
4. 4- 结点是 3- 结点的左子结点
5. 4- 结点是 3- 结点的左子结点
6. 4- 结点是 3- 结点的中子结点

如图所示，对应的 6 种情况：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715144740.png"/></div>

每次变换都只改变相关的链接，并且变更链接的数量均小于一个很小的常数。当重构链接中树的指向时不会涉及树的其他部分。

### 全局性质

> 局部变换不会影响树的全局有序性和平衡性。

换句话说，从根结点出发到任何叶子结点的路径长度都是相等的。

如图，这是一个 3- 结点中键向上提升的过程，但是变化前后，根结点到每一个叶子结点的路径长度没有发生改变。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715145409.png"/></div>

只有根结点从 4- 结点变为三个 2- 结点时路径长度才会发生改变。从根结点到所有叶子结点的路径长度均加一。

但是这个改变也是针对所有叶子结点的改变，而不是针对某个结点，所以并没有打破平衡性。

二叉查找树是自顶向下生长的，而 2-3 查找树是自底向上生长的。

当插入 10 个结点时，二叉查找树最坏情况下树的高度为 10 ，但 2-3 查找树最坏情况下树高为 2 。

> 在一棵大小为 $N$ 的 2-3 树种，查找和插入操作访问的结点必然不超过 $lgN$ 个。

2-3 查找树在最坏的情况下依旧拥有非常好的性能，查找和插入操作的成本不会超过对数级别。

例如在 10 亿个结点的一颗 2-3 树的高度仅在 19 - 30 之间，这是非常恐怖的。并且完美平和的 2-3 树非常平整的。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715150321.png"/></div>

当然它的缺点也很明显，例如需要维护两种不同类型的结点，需要处理的情况比较多，数据类型之间的变换等。

真正实现时不仅需要大量代码而且产生额外的开销比标桩的二叉查找树更慢。

## 红黑二叉查找树

红黑查找树则是在 2-3 树的基础上为了解决其缺点而设计出新的数据结构。实现的代码量不大。

### 替换 3- 结点

红黑树本质上就是 2-3 树，但是其中全部是 2- 结点，没有 3- 结点，为了将 3- 结点表示出来添加了一些别的信息。

每一个结点之间依靠链接来表示相关关系，之前提及到所有的链接都是一种类型，红黑树不同，其链接分为两种，即红链接和黑链接。

如图，左边是一个 3- 结点，因为红黑树中没有 3- 结点，所以放在红黑树中就变化成了右边的结果，3- 结点的两个键采用红链接来连接到一起。黑链接就是普通链接，不表示特殊含义。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715161415.png"/></div>

红链接在 3- 结点内部，将一个 3- 结点拆分成了两个 2- 结点。

扩展到更为一般的情况，一颗 2-3 树用红黑树来表示如图：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715161551.png"/></div>

以上就是红黑树。

### 一种等价定义

从另外一个角度来定义红黑树：指含有红黑链接并且满足下列条件的二叉查找树：

* 红链接均为左链接；
* 没有任何一个结点同时和两条红链接相连；
* 该树是完美黑色平衡的，即任意空链接到根结点的路径上的黑链接数量相同；

满足之上定义的红黑树和相应的 2-3 树是一一对应的。

### 一一对应

如果将红黑树中的所有红链接都画平，根结点到所有的叶子结点的距离都是相等的。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715162801.png"/></div>

如果将红黑树中所有红链接合并，那么合并后就是一颗 2-3 树。

本质上，红黑树都既是**二叉查找树**，也是 **2-3 树**。那么就可以结合二叉查找树**简洁的算法**的优点和 2-3 树**高效的平衡插入算法**的优点。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715163011.png"/></div>

### 颜色表示

将结点的的数据结构写出来，注意需要表示出每个父结点指向当前结点的颜色。

颜色用 color 来表示，true 为红色 false 为黑色。

然后可以设置一个私有方法 isRed() 来测试当前结点和父结点之间链接的颜色。

```java
private static final boolean RED = true;
private static final boolean Black = false;

private class Node {
  Key key;          // 键
  Value val;        // 值
  Node left, right; // 左右子树
  int N;            // 子树中结点总数
  boolean color;    // 父结点指向链接的颜色

  Node(Key key, Value val,int N,boolean color) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.color = color;
  }
}

private boolean isRed(Node x) {
  if (x == null) return false;
  return x.color == RED;
}
```

### 旋转

在实际操作中，往往会遇到**红色右链接**或者**两条连续的红色链接**的情况。

这两种情况是不符合红黑树的定义，需要在操作完成之间将其**修正**。

旋转就是修正方式之一。而旋转又分为**左旋**和**右旋**。

例如将左旋，左旋可以将红色右链接旋转为红色左链接，因为红黑树不允许出现红色右链接！

旋转如图，注意指向 h 结点的链接可能是红色的也可能是黑色的。

注意需要将指向 h 结点的链接改为指向 x 的链接，而 x 结点的左子树也要挂在 h 结点的右子树上，然后修改指向 h 链接的颜色为红色。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/v2-591b2b8b5dece5da4936d823a07a3f39_b.gif"/></div>


下面是代码，这个操作比较简单，交换一下顺序就好了。

```java
Node rotateLeft(Node h) {
    Node x = h.right; // 创建一个临时结点保存 s
    h.right = x.left; // 将 x 结点的左子树挂在 h 结点的右子树上
    x.left = h;       // 将 h 结点挂在 x 结点的左子树上
    x.color = h.color; // 旋转完毕，修改颜色
    h.color = RED;    // x 指向 h 的链接设置为红色
    x.N = h.N;        // 因为 x 占了 h 的位置，自然结点数也一致
    h.N = 1 + size(h.left)  // h 因为换了位置所以需要重新统计 
            + size(h.right);
    return x;
}
```

再看右旋左链接，和左旋就是镜像的关系。后续会使用到右旋操作。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/2020021921514350.gif"/></div>

代码如下：

```java
Node rotateRight(Node h) {
    Node x = h.left;
    h.left = x.right;
    x.right = h;
    x.color = h.color;
    h.color = RED;
    x.N = h.N;
    h.N = 1 + size(h.left) 
            + size(h.right);
    return x;
}
```

### 向单个 2- 结点中插入新键

先考虑简单的情况，向只有 2- 结点的红黑树中插入新键。

如果新键大于根结点的键，那么直接插在左子树上，左连接变红。变成了 3- 结点。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715183725.png"/></div>

反之如果插入的新键大于根结点的键，那么插在右子树上，将右链接设置为红色，然后左旋。成为了 3- 结点。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715183846.png"/></div>

综上可以不论左插还是右插，最终结果相同，树高也相同。最终都是 3- 结点。

### 向树底部的 2- 结点插入新键

利用二叉查找树相同的方式向红黑树的底部新增一个结点的情况如下，右边则是将其抽象为 2-3 树的情况。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715184903.png"/></div>

### 向一棵双键树（即 3- 结点）中插入新键

向一棵双键树中插入新键时存在三种情况：
* 新键均大于两个双键；
* 新键均小于两个双键；
* 新键处于两个双键之间；

变化情况如图，仔细看完就明白了，其中涉及到了右旋操作。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715185657.png"/></div>

### 颜色转化

上面的操作中有一个颜色转化的操作还没有提及。

通过颜色转换可以直接将 4- 结点分解成两个 2- 结点。

```java
void flipColors(Node h) {
    h.color = RED;
    h.left.color = BLACK;
    h.right.color = BLACK;
}
```

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715192218.png"/></div>

### 根结点总是黑色

注意根结点有红转黑时树的黑链接的高度都会加一。

### 向树底部的 3- 结点插入新键

如果向 3- 结点中插入新键的话根据插入键的大小会出现三种情况。

根据插入键的大小，将产生的链接分为左链接右链接和中链接。

具体流程如图：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715192922.png"/></div>

### 将红链接在树中向上传递

当向一个结点上插入新的结点时存在三种图示的插入情况：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715231317.png"/></div>

插入完毕后需要修改通过左旋转，右旋转和颜色变换等操作来修改红黑树使之符合定义。

当修改链接时存在以下三种情况：

* 右子结点是红色而左子结点是黑色，此时要进行左旋。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715232210.png"/></div>

* 左子结点是红色且左子结点的左子结点也是红色，此时进行右旋。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715232429.png"/></div>

* 如果左右子树均为红色，那么进行颜色转换。

总而言之，就是如下是三种情况，最终都能够将红链接向上传递。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715231317.png"/></div>

## 实现

其实想想，红黑树本质上是在二叉查找树的基础上添加了结点红色黑色的信息。也就是红黑树的定义。

实现之时和二叉查找树区别不大，而添加的东西就需要红黑树不能违反其定义。

那么实现起来就很清晰了。在二叉查找树插入操作的基础上进行改进。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715233753.png"/></div>

首先根据自顶向下找到要插入结点的位置，然后回溯之时自底向上不断将红链接向上传递使其符合红黑树的定义。

后面添加的三条 if 语句就是之前提及的三种情况，经过三条语句的整理，回溯后就是一棵红黑树。

左边是构造一颗红黑树的过程，而右边则是相同的键但是改变了插入的顺序，以升序的方式插入，也就是二叉查找树最坏的插入方式，红黑树可以与之形成鲜明的对比。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200715234337.png"/></div>

## 删除操作

红黑树的删除操作是比插入操作更为复杂的存在。

通过定义一系列的局部变换来保证删除结点后树的完美平衡性，过程复杂。

复杂在于当删除结点时需要临时构造 4- 结点且需要不断的向下变换，之后还需要向上将临时构造的 4- 结点再分解掉，而此时同插入操作就类似了。

## 红黑树的性质

> 所有基于红黑树的符号表实现都能保证操作的运行时间为对数级别。

### 性能分析

无论插入顺序如何，红黑树基本都是完美平衡的。

> 一颗大小为 $N$ 的红黑树的高度不会超过 $2lgN$。 
> 在大小为 $N$ 的红黑树中，根结点到任意结点的平均路径长度为 $~1.001lgN$。

### 有序符号表 API

红黑树除了 put(), get() 和 delete() 需要适当修改外，其他操作都完美适配于二叉查找树的 API 。

例如 floor(),ceiling(),rank(),select() 等操作可以直接拿来使用。

几种符号表的性能总结：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200716002712.png"/></div>

# 散列表

采用散列表来存储键值也是实现符号表的一种途径。

例如通过数组的**索引**可以拿到其中存储的**值**，而键再与索引之间建立联系，那么就实现了**键值关系**的**绑定**。

键和索引之间的联系是通过散列函数实现的，键经过散列函数的**加工**变为了想要的索引，然后根据索引去取值。

这样操作就不要去遍历查询了，直接根据散列函数来转换查询。
 
散列的查找算法往往分为两步：

第一步：根据散列函数将键转换为数组的索引，但是可能会存在不同的值转换成相同的键的情况。所以需要进行第二步。

第二步：处理碰撞冲突。存在拉链法和线性探测法两种解决方法。

## 散列函数

散列函数是根据键的数据类型来设计的，与键的特性相关。

### 典型例子

* 身份证号码
* 保险号

### 正整数

可以使用**除留余数法**处理正整数。

例如对于任意整数 $k$ 使其 $k%M$ 那么结果均在 $[0,M-1]$ 分布之间。

### 浮点数

假设键处于 0 - 1 之间，那么将它乘某个数字 $M-1$ 然后四舍五入得到 $0 - (M-1)$  之间的索引。

但是缺点则是乘积对于高位的作用较大，对于低位的影响小。后续的修改则是将键表示为**二进制**然后进行**除留余数法**。

### Java 的约定

Java 中每种数据类型都有对应的散列函数，也就是 hashCode() 当然也有与之对应的 equals() 方法。

如果是自定义的数据类型需要重写 hashCode() 和 euqals() 方法。

### 软缓存

对于重复查询频率比较高的键，hashCode() 会将其缓存下来，后续使用时不用再去计算。

对于一个数据类型要实现优秀的散列方法需要满足以下三个条件：

* 一致性--等价的键必然产生相等的散列值；
* 高效性--计算简便；
* 均匀性--均匀地散列所有的键；

## 基于拉链法的散列表

拉链法是使用数组加链表来实现的。

当遇到相同索引的键值时会挂在当前索引的链表之上，后续再出现时插在队尾。

这种实现方法侧重的是数组足够大，

散列表的大小不能过大，过大虽然查找快但是内存不够用。体积过小的话虽然占用内存小但是查找慢。

也可以根据内容动态的挑战数组大小。

键经过散列函数的处理后先后顺序会丧失，这样会导致寻找最大键和最小键时的时间是线性的。

> 一张含有 M 条链表和 N 个键的散列表中，如果散列函数能够使键均匀分布，那么 $N/M$ 的值无限趋向于 1 。

当然如果键不是均匀分布的话，性能就和 N 成正比了，类似于顺序查找。

## 基于线性探测法的散列表

另外一种实现散列表的方式是使用一个长度为 M 的数组来存 N 个键值对，注意数组长度 M 要大于 N 。

所以一定会存在空余的位置，所以也叫开放地址散列表。当键发生冲突可以将其放在空余位置上，但是怎么放是有规则的。

最简单的则是线性探测法，当发生键发生冲突时去检查该键的下一个位置也就是索引值加一，直到解决冲突位置，

实际使用中可以根据数组的使用情况来动态的调整数组的大小，使数组始终保持在最佳状态。

## 内存使用

拉链法本质上为每个键值对都分配了一小块内存，而线性探测法则是为整张表使用了两个很大的数组。

二者使用内存的区别不同情景下是难以比较的。

散列表的缺点在于：
* 每种类型的键都需要一个优秀的散列函数。
* 性能保证来自于散列函数的质量。
* 散列函数的计算可能复杂且昂贵。
* 难以支持有序性相关的符号表操作。