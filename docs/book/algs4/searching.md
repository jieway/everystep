# 第三章：查找

查找是很重要的功能，帮助我们高效检索访问海量信息。这一方面有很多经典的查找算法。

符号表是一张抽象的表，是存储数据的容器。用字典来类比的话，符号表就等同于字典，键则是单词，而值则指单词对应的意思。

符号表也称为**索引**，根据索引的**键**快速找到对应的**值**。

在基本的 API 中，有三种经典的数据类型二叉查找树，红黑树和散列表可以实现高效的符号表。

# 符号表

符号表的目的是将键和值联系起来，一种存储**键值对**的**数据结构**，支持**插入**和**查找**两种操作。

例如字典，图书索引，文件贡献，网络搜索等实际的应用。

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

在符号表的基础上保证了**键的有序性**。这样势必要保证键比较时的等价性。键都是 Comparable 对象，利用其接口来具体实现自定义对象的比较。

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

用一对**平行数组**来实现，一个用于存储**键**一个存储**值**。

增加了一个 rank 方法，也就是二分查找的实现方式。根据键可以找到对应的索引。

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

对于 get 操作而言，待用 rank 方法找到对应的位置拿到值即可，如果没有找到就返回空。

```java
public Value get(Key key) {
  if (key == null) throw new IllegalArgumentException("argument to get() is null"); 
  if (isEmpty()) return null;
  int i = rank(key); 
  if (i < n && keys[i].compareTo(key) == 0) return vals[i];
    return null;
  } 
```

rank 方法的实现：

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

## 对二分查找的分析

N 个键的有序数组中进行二分查找最多需要进行 $log(N)+1$ 次比较。（无论是否成功）。

二分查找查找时很快，但是插入时慢。

# 二叉查找树

# 平衡查找树

# 散列表

# 应用