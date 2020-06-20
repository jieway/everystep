# 概述

# 插入排序

# 交换排序

# 选择排序

# 合并排序

# 分配排序



# 模板代码

书中提供了一个模板代码，只需要编写 sort 方法即可。也就是直接在注释 coding 部分写算法。

写完后运行 main 方法即可。其他不需要考虑，专注于算法层面。

注意 assert 断言我修改成了输出，assert 默认是关闭的需要开启。我认为打印出值调试更为方便。 true：有序， flase：无序。

```java

public class Example {

    public static void sort(Comparable[] a) {
        // coding
    }

    private static boolean less(Comparable v , Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a , int i , int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    private static void show (Comparable[] a) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
        System.out.println();
    }

    public static boolean isSorted(Comparable[] a) {
        for (int i = 1; i < a.length; i++) {
            if (less(a[i], a[i-1])) {
                return false;
            }
        }
        return true;
    }

    public static String[] MyInput() throws IOException {

        FileInputStream input = null;

            // 相对目录
            File file = new File("src\\resources\\algs4-data\\words3.txt");
            input = new FileInputStream(file);

            // 线程不安全但是快
            StringBuilder sb = new StringBuilder();
            int len = 0;
            while((len = input.read()) != -1) {
                sb.append((char)len);
            }

            String result = sb.toString().trim().replaceAll("\\s+", " ");
            String[] a  = result.split(" ");

        return a;
    }

    public static void main(String[] args) throws IOException {
        String [] a = MyInput();
        sort(a);
        assert isSorted(a);
        show(a);
    }
}
```

# 选择排序

## 特点

* 运行时间和输入无关。
不论输入是否有序都会扫描相同的次数，也就是每一次扫描后不能利用上一次扫描的结果来预判下一扫描。

* 数据移动少
我们可以看到交换的函数在外层循环中，交换的次数相对于其他排序算法是比较少的，和数据 n 的规模呈线性关系，而其他算法一般呈线性对数或平方级别。

## code

```java
public class Selection {

        public static void sort(Comparable[] a) {
            // coding
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

    private static boolean less(Comparable v , Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a , int i , int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    private static void show (Comparable[] a) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
        System.out.println();
    }

    public static boolean isSorted(Comparable[] a) {
        for (int i = 1; i < a.length; i++) {
            if (less(a[i], a[i-1])) {
                return false;
            }
        }
        return true;
    }

    public static String[] MyInput() throws IOException {

        FileInputStream input = null;

        // 相对目录
        File file = new File("src\\resources\\algs4-data\\words3.txt");
        input = new FileInputStream(file);

        // 线程不安全但是快
        StringBuilder sb = new StringBuilder();
        int len = 0;
        while((len = input.read()) != -1) {
            sb.append((char)len);
        }

        String result = sb.toString().trim().replaceAll("\\s+", " ");
        String[] a  = result.split(" ");

        return a;
    }

    public static void main(String[] args) throws IOException {
        String [] a = MyInput();
        sort(a);
        assert isSorted(a);
        show(a);
    }
}
```

# 插入排序
想象以下斗地主时，每次拿到一张牌从左向右看该插到哪里，所以左边的牌总是有序的。而插入排序就是模拟这个过程。

## 特点
* 取决于初始元素的顺序
想一个极端情况，假如每次拿到的牌都是最大值，那么就不用插入了，直接按顺序摆就可以了，所以如果序列全部有序或部分有序的话速度会非常快。
* 典型的部分有序数组（适合插入排序的情景）
  * 数组中的每一个元素都离它最终的位置不远。
  * 有序数组接一个小数组。
  * 数组中只有几个元素的位置不正确。


## code

```java
package code.Sorting;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class Insertion {

    public static void sort(Comparable[] a) {
        // coding
        int N= a.length;
        for (int i= 1; i< N; i++) {
            for (int j= i; j > 0 && less(a[j], a[j-1]); j--) {
                exch(a, j, j-1);
            }
        }
    }

    private static boolean less(Comparable v , Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a , int i , int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    private static void show (Comparable[] a) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
        System.out.println();
    }

    public static boolean isSorted(Comparable[] a) {
        for (int i = 1; i < a.length; i++) {
            if (less(a[i], a[i-1])) {
                return false;
            }
        }
        return true;
    }

    public static String[] MyInput() throws IOException {

        FileInputStream input = null;

        // 相对目录
        File file = new File("src\\resources\\algs4-data\\words3.txt");
        input = new FileInputStream(file);

        // 线程不安全但是快
        StringBuilder sb = new StringBuilder();
        int len = 0;
        while((len = input.read()) != -1) {
            sb.append((char)len);
        }

        String result = sb.toString().trim().replaceAll("\\s+", " ");
        String[] a  = result.split(" ");

        return a;
    }

    public static void main(String[] args) throws IOException {
        String [] a = MyInput();
        sort(a);
        assert isSorted(a);
        show(a);
    }
}

```

# 希尔排序

希尔排序的内部包含了一个插入排序，只不过是选择的不同的增量来排序，其复杂度的分析至今还未弄清。

其中有一个重要的性质是，每一次增量的改变使得排序后的结果并不会打乱上一次排序的相对大小。

如果取极端情况的话，当 h = 1 相当于插入排序。而前面 h > 1 的情况都白比较了。所以 h 的设置是性能的关键。

但是这个大部分情况下要比插入排序和选择排序快尤其是数组越大，结果越明显。

## code
```java

public class Shell {

    public static void sort(Comparable[] a) {
        // coding
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

    private static boolean less(Comparable v , Comparable w) {
        return v.compareTo(w) < 0;
    }

    private static void exch(Comparable[] a , int i , int j) {
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    private static void show (Comparable[] a) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + " ");
        }
        System.out.println();
    }

    public static boolean isSorted(Comparable[] a) {
        for (int i = 1; i < a.length; i++) {
            if (less(a[i], a[i-1])) {
                return false;
            }
        }
        return true;
    }

    public static String[] MyInput() throws IOException {

        FileInputStream input = null;

        // 相对目录
        File file = new File("src\\resources\\algs4-data\\words3.txt");
        input = new FileInputStream(file);

        // 线程不安全但是快
        StringBuilder sb = new StringBuilder();
        int len = 0;
        while((len = input.read()) != -1) {
            sb.append((char)len);
        }

        String result = sb.toString().trim().replaceAll("\\s+", " ");
        String[] a  = result.split(" ");

        return a;
    }

    public static void main(String[] args) throws IOException {
        String [] a = MyInput();
        sort(a);
        assert isSorted(a);
        show(a);
    }
}
```

# 归并排序

## code
归并的基础就是使得两个数组合并后的序列有序。

merge 方法中的四个循环分别是： 先假设 A , B 两个数组 

* A 数组数字用完了，说明 B 数组中的数字都比 A 中数字大，所以直接挂在数组尾部就行。
* 同上，只不过是 B 数组用完了。
* A B 数组中当前数字A小，填入数组中。
* 同上，B 小，填入数组中。

```java
    public static void merge(Comparable[] a , int lo, int mid, int hi) {

        int i = lo , j = mid + 1 ;

        for (int k = lo; k <= hi; k++) {
            aux[k] = a[k];
        }

        for (int k = lo ; k <= hi ; k ++) {
            if (i > mid) {
                a[k] = aux[j++];
            }else if (j > hi) {
                a[k] = aux[i++];
            }else if (less(aux[i], a[j])) {
                a[k] = aux[i++];
            }else {
                a[k] = aux[j++];
            }
        }
    }
```

自顶向下的归并：

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

自底向上的归并

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

# 快速排序
快速排序需要看分割点，分割的越好，速度越快。
## code

```java
 public static void sort(String[] a) {
        // coding
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

# Reference
[1] 算法4


# 快速选择

用于求解   **Kth Element**   问题，也就是第 K 个元素的问题。

可以使用快速排序的 partition() 进行实现。需要先打乱数组，否则最坏情况下时间复杂度为 O(N<sup>2</sup>)。

# 堆

用于求解   **TopK Elements**   问题，也就是 K 个最小元素的问题。可以维护一个大小为 K 的最小堆，最小堆中的元素就是最小元素。最小堆需要使用大顶堆来实现，大顶堆表示堆顶元素是堆中最大元素。这是因为我们要得到 k 个最小的元素，因此当遍历到一个新的元素时，需要知道这个新元素是否比堆中最大的元素更小，更小的话就把堆中最大元素去除，并将新元素添加到堆中。所以我们需要很容易得到最大元素并移除最大元素，大顶堆就能很好满足这个要求。

堆也可以用于求解 Kth Element 问题，得到了大小为 k 的最小堆之后，因为使用了大顶堆来实现，因此堆顶元素就是第 k 大的元素。

快速选择也可以求解 TopK Elements 问题，因为找到 Kth Element 之后，再遍历一次数组，所有小于等于 Kth Element 的元素都是 TopK Elements。

可以看到，快速选择和堆排序都可以求解 Kth Element 和 TopK Elements 问题。

## 1. Kth Element

215\. Kth Largest Element in an Array (Medium)

[Leetcode](https://leetcode.com/problems/kth-largest-element-in-an-array/description/) / [力扣](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/)

```text
Input: [3,2,1,5,6,4] and k = 2
Output: 5
```

题目描述：找到倒数第 k 个的元素。

**排序**  ：时间复杂度 O(NlogN)，空间复杂度 O(1)

```java
public int findKthLargest(int[] nums, int k) {
    Arrays.sort(nums);
    return nums[nums.length - k];
}
```

**堆**  ：时间复杂度 O(NlogK)，空间复杂度 O(K)。

```java
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>(); // 小顶堆
    for (int val : nums) {
        pq.add(val);
        if (pq.size() > k)  // 维护堆的大小为 K
            pq.poll();
    }
    return pq.peek();
}
```

**快速选择**  ：时间复杂度 O(N)，空间复杂度 O(1)

```java
public int findKthLargest(int[] nums, int k) {
    k = nums.length - k;
    int l = 0, h = nums.length - 1;
    while (l < h) {
        int j = partition(nums, l, h);
        if (j == k) {
            break;
        } else if (j < k) {
            l = j + 1;
        } else {
            h = j - 1;
        }
    }
    return nums[k];
}

private int partition(int[] a, int l, int h) {
    int i = l, j = h + 1;
    while (true) {
        while (a[++i] < a[l] && i < h) ;
        while (a[--j] > a[l] && j > l) ;
        if (i >= j) {
            break;
        }
        swap(a, i, j);
    }
    swap(a, l, j);
    return j;
}

private void swap(int[] a, int i, int j) {
    int t = a[i];
    a[i] = a[j];
    a[j] = t;
}
```

# 桶排序

## 1. 出现频率最多的 k 个元素

347\. Top K Frequent Elements (Medium)

[Leetcode](https://leetcode.com/problems/top-k-frequent-elements/description/) / [力扣](https://leetcode-cn.com/problems/top-k-frequent-elements/description/)

```html
Given [1,1,1,2,2,3] and k = 2, return [1,2].
```

设置若干个桶，每个桶存储出现频率相同的数。桶的下标表示数出现的频率，即第 i 个桶中存储的数出现的频率为 i。

把数都放到桶之后，从后向前遍历桶，最先得到的 k 个数就是出现频率最多的的 k 个数。

```java
public List<Integer> topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> frequencyForNum = new HashMap<>();
    for (int num : nums) {
        frequencyForNum.put(num, frequencyForNum.getOrDefault(num, 0) + 1);
    }
    List<Integer>[] buckets = new ArrayList[nums.length + 1];
    for (int key : frequencyForNum.keySet()) {
        int frequency = frequencyForNum.get(key);
        if (buckets[frequency] == null) {
            buckets[frequency] = new ArrayList<>();
        }
        buckets[frequency].add(key);
    }
    List<Integer> topK = new ArrayList<>();
    for (int i = buckets.length - 1; i >= 0 && topK.size() < k; i--) {
        if (buckets[i] == null) {
            continue;
        }
        if (buckets[i].size() <= (k - topK.size())) {
            topK.addAll(buckets[i]);
        } else {
            topK.addAll(buckets[i].subList(0, k - topK.size()));
        }
    }
    return topK;
}
```

## 2. 按照字符出现次数对字符串排序

451\. Sort Characters By Frequency (Medium)

[Leetcode](https://leetcode.com/problems/sort-characters-by-frequency/description/) / [力扣](https://leetcode-cn.com/problems/sort-characters-by-frequency/description/)

```html
Input:
"tree"

Output:
"eert"

Explanation:
'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
```

```java
public String frequencySort(String s) {
    Map<Character, Integer> frequencyForNum = new HashMap<>();
    for (char c : s.toCharArray())
        frequencyForNum.put(c, frequencyForNum.getOrDefault(c, 0) + 1);

    List<Character>[] frequencyBucket = new ArrayList[s.length() + 1];
    for (char c : frequencyForNum.keySet()) {
        int f = frequencyForNum.get(c);
        if (frequencyBucket[f] == null) {
            frequencyBucket[f] = new ArrayList<>();
        }
        frequencyBucket[f].add(c);
    }
    StringBuilder str = new StringBuilder();
    for (int i = frequencyBucket.length - 1; i >= 0; i--) {
        if (frequencyBucket[i] == null) {
            continue;
        }
        for (char c : frequencyBucket[i]) {
            for (int j = 0; j < i; j++) {
                str.append(c);
            }
        }
    }
    return str.toString();
}
```

# 荷兰国旗问题

荷兰国旗包含三种颜色：红、白、蓝。

有三种颜色的球，算法的目标是将这三种球按颜色顺序正确地排列。它其实是三向切分快速排序的一种变种，在三向切分快速排序中，每次切分都将数组分成三个区间：小于切分元素、等于切分元素、大于切分元素，而该算法是将数组分成三个区间：等于红色、等于白色、等于蓝色。

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/7a3215ec-6fb7-4935-8b0d-cb408208f7cb.png"/> </div><br>


## 1. 按颜色进行排序

75\. Sort Colors (Medium)

[Leetcode](https://leetcode.com/problems/sort-colors/description/) / [力扣](https://leetcode-cn.com/problems/sort-colors/description/)

```html
Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

题目描述：只有 0/1/2 三种颜色。

```java
public void sortColors(int[] nums) {
    int zero = -1, one = 0, two = nums.length;
    while (one < two) {
        if (nums[one] == 0) {
            swap(nums, ++zero, one++);
        } else if (nums[one] == 2) {
            swap(nums, --two, one);
        } else {
            ++one;
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
}
```


## 荷兰棋问题
[戳我](https://leetcode-cn.com/problems/sort-colors/)
### 思考

```java
class Solution {
    public void sortColors(int[] nums) {
        int l = -1 ,i = 0 ,h = nums.length;
        while (i < h) {
            if (nums[i] == 0) {
                swap(nums, ++l , i++);
            }else if (nums[i] == 2) {
                swap(nums, i, --h );
            }else{
                i++;
            }
        }
    }
    public void swap(int[] nums, int i , int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```



# 排序

## 常考排序

### 快速排序

```go
func QuickSort(nums []int) []int {
    // 思路：把一个数组分为左右两段，左段小于右段
    quickSort(nums, 0, len(nums)-1)
    return nums

}
// 原地交换，所以传入交换索引
func quickSort(nums []int, start, end int) {
    if start < end {
        // 分治法：divide
        pivot := partition(nums, start, end)
        quickSort(nums, 0, pivot-1)
        quickSort(nums, pivot+1, end)
    }
}
// 分区
func partition(nums []int, start, end int) int {
    // 选取最后一个元素作为基准pivot
    p := nums[end]
    i := start
    // 最后一个值就是基准所以不用比较
    for j := start; j < end; j++ {
        if nums[j] < p {
            swap(nums, i, j)
            i++
        }
    }
    // 把基准值换到中间
    swap(nums, i, end)
    return i
}
// 交换两个元素
func swap(nums []int, i, j int) {
    t := nums[i]
    nums[i] = nums[j]
    nums[j] = t
}
```

### 归并排序

```go
func MergeSort(nums []int) []int {
    return mergeSort(nums)
}
func mergeSort(nums []int) []int {
    if len(nums) <= 1 {
        return nums
    }
    // 分治法：divide 分为两段
    mid := len(nums) / 2
    left := mergeSort(nums[:mid])
    right := mergeSort(nums[mid:])
    // 合并两段数据
    result := merge(left, right)
    return result
}
func merge(left, right []int) (result []int) {
    // 两边数组合并游标
    l := 0
    r := 0
    // 注意不能越界
    for l < len(left) && r < len(right) {
        // 谁小合并谁
        if left[l] > right[r] {
            result = append(result, right[r])
            r++
        } else {
            result = append(result, left[l])
            l++
        }
    }
    // 剩余部分合并
    result = append(result, left[l:]...)
    result = append(result, right[r:]...)
    return
}
```

### 堆排序

用数组表示的完美二叉树 complete binary tree

> 完美二叉树 VS 其他二叉树

![image.png](https://img.fuiboom.com/img/tree_type.png)

[动画展示](https://www.bilibili.com/video/av18980178/)

![image.png](https://img.fuiboom.com/img/heap.png)

核心代码

```go
package main

func HeapSort(a []int) []int {
    // 1、无序数组a
	// 2、将无序数组a构建为一个大根堆
	for i := len(a)/2 - 1; i >= 0; i-- {
		sink(a, i, len(a))
	}
	// 3、交换a[0]和a[len(a)-1]
	// 4、然后把前面这段数组继续下沉保持堆结构，如此循环即可
	for i := len(a) - 1; i >= 1; i-- {
		// 从后往前填充值
		swap(a, 0, i)
		// 前面的长度也减一
		sink(a, 0, i)
	}
	return a
}
func sink(a []int, i int, length int) {
	for {
		// 左节点索引(从0开始，所以左节点为i*2+1)
		l := i*2 + 1
		// 有节点索引
		r := i*2 + 2
		// idx保存根、左、右三者之间较大值的索引
		idx := i
		// 存在左节点，左节点值较大，则取左节点
		if l < length && a[l] > a[idx] {
			idx = l
		}
		// 存在有节点，且值较大，取右节点
		if r < length && a[r] > a[idx] {
			idx = r
		}
		// 如果根节点较大，则不用下沉
		if idx == i {
			break
		}
		// 如果根节点较小，则交换值，并继续下沉
		swap(a, i, idx)
		// 继续下沉idx节点
		i = idx
	}
}
func swap(a []int, i, j int) {
	a[i], a[j] = a[j], a[i]
}

```

## 参考

[十大经典排序](https://www.cnblogs.com/onepixel/p/7674659.html)

[二叉堆](https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/er-cha-dui-xiang-jie-shi-xian-you-xian-ji-dui-lie)

## 练习

- [ ] 手写快排、归并、堆排序
