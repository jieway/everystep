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
