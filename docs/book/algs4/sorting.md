# 第二章：排序

书中提供了一个模板类，里面包含了运行排序时的一些辅助方法。

还是按照自顶向下的方法来编写。对于主函数而言，首先需要读入数据，然后执行排序算法，之后判断，最后输出查看。

* main 方法，组织函数流程。

```java
public static void main(String[] args) {
    String [] a = In.readStrings();
    sort(a);
    assert isSorted(a);
    show(a);
}
```

* sort 函数，编写排序算法的主要区域。由于 Java 的数据类型都实现了 Comparable 接口。所以用 Comparable 来实现就不用写成具体的数据类型的。

```java
public static void sort(Comparable[] a) {
    // coding
}
```

* less 用于判断 v 是否小于 w 。这里采用的是泛型接口，使得可以对任何数据类型的数据排序。而且自己实现的数据类型也能够用 Comparable 来比较，也就是泛型。

```java
private static boolean less(Comparable v , Comparable w) {
    return v.compareTo(w) < 0;
}
```

对于 compareTo 这个 API ， v < w 会返回 -1 ，v == w 则返回 0 ，v > w 则返回 1 。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200705211041.png"/></div>

* exch 函数实现了根据下标交换两个位置的元素。

```java
private static void exch(Comparable[] a , int i , int j) {
    Comparable t = a[i];
    a[i] = a[j];
    a[j] = t;
}
```

* show 方法用来打印数组中的元素。

```java
private static void show (Comparable[] a) {
    for (int i = 0; i < a.length; i++) {
        System.out.print(a[i] + " ");
    }
    System.out.println();
}
```

* isSorted 方法用来判断结果是否有序。

```java
public static boolean isSorted(Comparable[] a) {
    for (int i = 1; i < a.length; i++) {
        if (less(a[i], a[i-1])) {
            return false;
        }
    }
    return true;
}
```

# 初级排序

初级排序有**选择排序**和**插入排序**两种。

## 选择排序

#### 解释

可以想象成两个队列 a/b ，假设共有 n 个元素。

队列 a **始终保持有序**，初始为空。

而另一个队列 b 有这 n 个元素。每次都扫描 b 中**全部**元素，找到最小值对应的下标，然后插入到队列 a 的队尾中。

这样不断循环，直到队列 b 中元素为空，队列 a 中元素为 n 。

如图：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/select.gif"/></div>


### 特点

* 运行时间和输入无关。

不论输入是否有序都会扫描相同的次数，也就是每一次扫描后不能利用上一次扫描的结果来预判下一扫描。

* 数据移动少

我们可以看到交换的函数在外层循环中，交换的次数相对于其他排序算法是比较少的，和数据 n 的规模呈线性关系，而其他算法一般呈线性对数或平方级别。

```java
public static void sort(Comparable[] a) {
    int N = a.length;
    for (int i = 0; i < N; i++) {
        int min = i;
        for (int j = i + 1 ; j < N; j++) {
            if (less(a[j], a[min])) {
                min = j;
            }
        }
        exch(a , i , min);
    }
}
```


## 插入排序

### 解释

想象一下打牌时，每次拿到一张牌从左向右看该插到哪里，所以左边的牌总是有序的。而插入排序就是模拟这个过程。

例如这组例子（其中黄色部分代表有序）：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200705221214.png"/></div>

接下来要对 2 进行排序。将 2 **拎出来** 和 47 比较。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200705221312.png"/></div>

因为 2 小于 47 ，所以交换位置。2 再同 44 进行比较。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200705221422.png"/></div>

同理 2 小于 44 交换位置，之后不断的比较将 2 插入了第一个位置中。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200705221523.png"/></div>

### 特点

* 取决于初始元素的顺序

例如一个极端情况，假如每次拿到的牌都是最大值，那么就不用插入了，直接按顺序摆就可以了，所以如果序列全部有序或部分有序的话速度会非常快。

* 典型的部分有序数组（适合插入排序的情景）
  * 数组中的每一个元素都离它最终的位置不远。
  * 有序数组接一个小数组。
  * 数组中只有几个元素的位置不正确。


```java
public static void sort(Comparable[] a) {
    int N= a.length;
    for (int i= 1; i< N; i++) {
        for (int j= i; j > 0 && less(a[j], a[j-1]); j--) {
            exch(a, j, j-1);
        }
    }
}
```



## 希尔排序

### 解释

插入排序每次只能挪动**一个元素**，如果恰好目标位置较远则需要**挪动多次**。

希尔排序改变了这一点，增加了一个变量 **h** 。每次挪动一个 h 的单位。

当然 h 很小的时候，例如 h = 1 就等同于插入排序了。所以 h 的设置是性能的关键。但就目前而言并没有证明出来 h 的最优值是多少。


### 特点

希尔排序的内部包含了一个插入排序，只不过是选择的不同的增量来排序，其复杂度的分析至今还未弄清。

其中有一个重要的性质是，每一次增量的改变使得排序后的结果并不会打乱上一次排序的相对大小。

如果取极端情况的话，当 h = 1 相当于插入排序。而前面 h > 1 的情况都白比较了。

但是这个大部分情况下要比插入排序和选择排序快尤其是数组越大，结果越明显。

优点是代码量小，不需要额外的内存空间。

```java
    public static void sort(Comparable[] a) {
        int N = a.length;
        int h = 1;

        while ( h < N/3 ) {
            h = h * 3 + 1;
        }

        while (h >= 1) {
            for (int i = h ; i < N ; i++) {
                for (int j = i ; j >= h && less(a[j], a[j-h]) ; j -= h) {
                    exch(a ,j , j - h);
                }
            }
            h /= 3;
        }
    }

```

# 归并排序

归并排序的优点是任意长度为 N 的数组排序所需的时间和 $Nlog(N)$ 成正比。

缺点则是所需的额外的空间也和 N 成正比。

归并排序就是分治法的具体体现：

## 解释

归并的基础就是使得两个数组合并后的序列有序。

注意需要先将当前数组复制到另一个数组中备份，直接在原来数组上修改会抹掉原来的数组中的信息。

```java
public static void merge(Comparable[] a , int lo, int mid, int hi) {
    int i = lo , j = mid + 1;
    for (int k = lo; k <= hi; k++) {
        aux[k] = a[k];
    }
    // coding
}
```

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/merge-sort-2.png"/></div>


接下来出现了一个循环，循环备份中的所有元素，按照规则将其放回原数组中。

可以将备份的数组从中间切开， mid 在中间，i 和 j 分别在首尾。i 和 j 下标对应的元素再分别进行比对。

例如倒叙的话 a[i] > a[j] 那么将 j 挑出，j++ ， 反之 i++ 。

首先看第一个判断 i > mid 说明 i 已经将前半部分遍历完毕，那么就不需要在进行后续比较了，直接将下标 j 指向的元素逐个填入原来数组中。

j > hi 说明 j 已经遍历完毕，将 i 中后续元素逐个添加在尾部。


```java
public static void merge(Comparable[] a , int lo, int mid, int hi) {
    int i = lo , j = mid + 1;
    for (int k = lo; k <= hi; k++) {
        aux[k] = a[k];
    }

    for (int k = lo ; k <= hi ; k ++) {
        if (i > mid) {  // 左为空
            a[k] = aux[j++];
        }else if (j > hi) { // 右为空
            a[k] = aux[i++];
        }else if (less(aux[i], a[j])) { // 左小于右
            a[k] = aux[i++];
        }else {
            a[k] = aux[j++]; // 左大于右
        }
    }
}
```

自顶向下的归并（递归版）：


<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/merge-sort-1.png"/></div>


```java
public static void sort(String[] a) {
    aux = new Comparable[a.length]; // 一次性分配空间
    sort(a,0 , a.length - 1);
}

public static void sort(String[] a, int lo , int hi) {
    if (hi <= lo) { // 递归的出口
        return ;
    }
    int mid = lo + (hi - lo) / 2; // 防止溢出的一个技巧
    sort(a,lo , mid);
    sort(a,mid + 1 , hi);
    merge(a, lo , mid, hi);
}
```

自底向上的归并，先两个两个归并，然后四个四个归并直到叠加的全部规模。

```java
// 自底向上的归并
public static void sort(String[] a) {
    int N = a.length;
    aux = new Comparable[N];
    // sz 代表子数组的大小， 2 4 8 16 递增
    for (int sz = 1; sz < N; sz += sz) {
        // lo 代表子数组的左边界，而又边界就是 lo + sz -1 + sz
        for (int lo = 0 ; lo < N - sz ; lo += sz + sz) {
            merge(a , lo , lo + sz - 1 , Math.min(lo + sz - 1 + sz , N - 1));
        }
    }
}
```

两种归并访问数组的次数和比较次数相同，只不过顺序不同。

归并排序适合用链表组织数据，只修改链表的链接顺序就能将链表原地排序。

# 快速排序

快速排序需要看分割点，分割的越好，速度越快。

快排是最快的排序算法，虽然和有些排序算法的时间复杂度相同，但是快排的常数小。

## code

```java
public static void sort(String[] a) {
    StdRandom.shuffle(a); // 打乱顺序，消除对输入的依赖
    sort(a , 0 , a.length - 1);
}

public static void sort(String [] a, int lo , int hi) {
    if (hi <= lo) {
        return;
    }
    int j = partition(a, lo, hi);
    sort(a, lo , j-1);
    sort(a, j+1, hi);
}

public static int partition(String[] a, int lo, int hi) {
    String v = a[lo];
    int i = lo ,j = hi + 1;
    while(true) {
        while(less(a[++i], v)) {
            if (i == hi) {
                break;
            }
        }
        while (less(v,a[--j])) {
            if (j == lo) {
                break;
            }
        }
        if (i >= j) {
            break;
        }
        exch(a , i , j);
    }
    exch(a ,lo , j);
    return j;
}
```

# 优先队列

优先队列指能**删除最大元素**和**插入最大元素**的数据结构。

如何**高效的实现**是研究该问题的重点。用**数组**来保存数据，基于**二叉堆**来实现能够将时间复杂度压缩到**对数级别**。

如果优先队列每次都删除**最值**，也可以实现排序算法。**堆排序**就是基于堆的**优先队列**实现的。

## 初级实现

可以**直接**采用数组来是实现，分为**有序**和**无序**。

如果有序那么插入特定位置的元素需要移动后续元素。而删除最值元素，只需要修改边界元素即可。

对于无序数组正好相反，可以选择**遍历全部找到最值**和边界元素交换位置。而**插入**直接添加到边界即可。

也可以采用链表来实现，同样也分为**有序**和**无序**。

对于有序则要时刻维护有序的状态，反之对于无序则需要真正查找时遍历全部。

## 堆实现

在数组之上建立的二叉堆中，首先要明白**二叉堆**的定义：

> 堆有序：一颗二叉树的每个结点都大于等于它的两个子结点时。

> 根节点是对有序的二叉树中的最大结点。

> 二叉堆：一组能够用**堆有序**的**完全二叉树**排序的元素，并在数组中按照层级储存。（不使用数组的第一个位置）

简单而言二叉堆就是在完全二叉树的基础上添加了堆有序这条性质。

从上可知，在数组中位置为 k 的元素。其**父节点**的位置为 $[k/2]$，其两个子节点的位置分别为 $[2k]$ 和 $[2k+1]$

因为要始终保持根节点为最大值，那么当新加入或删除新元素时，堆中元素的优先级发生了变化

# 应用

* 排序有用的体现：查找有序元素比查找无序元素要快的多。
* 在某些场景下要求排序算法具备稳定性。例如：既含有时间数据也含有地理数据，先按照时间顺序排序后再按照地理顺序排序。如果不稳定会导致时间的相对顺序和之前不同。

## 如何选择排序算法

排序算法的好坏往往取决于应用场景和具体实现。
 
快排是最快的通用排序算法。
