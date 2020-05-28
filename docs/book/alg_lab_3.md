# 双指针
双指针可以理解为两个下标，快慢指针的索引。

## 1.0 💗🧡

[leetcode-167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) / [力扣-167]([leetcode-167](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/))
因为数组升序，如果值小，右边的下标就减减，反之左边的值就加加。

暴力解法如下，直接枚举即可，但是会超时！

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        vector<int> a;
        for (int  i = 0; i < numbers.size() - 1; i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers[i] + numbers[j] == target) {
                    a.push_back(i+1);
                    a.push_back(j+1);
                }
            }
        }
        return a;
    }
};
```
双指针法，设置收尾两个指针，因为数组升序所以首指针前进的话两个值的和会增加，反之尾指针后退的话值会减少。所以扫面一遍即可。
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int i = 0, j = numbers.size() - 1;
        vector<int> a;
        while(i < j) {
            int sum = numbers[i] + numbers[j];
            if (sum == target) {
                a.push_back(i+1);
                a.push_back(j+1);
                return a;
            }else if (sum > target) {
                j--;
            }else if (sum < target) {
                i++;
            }
        }
        return a;
    }
};
```
```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        if(numbers == null )  return null;
        int index1 = 0 , index2 = numbers.length - 1;
        while(index1 < index2) {
            int temp = numbers[index1] + numbers[index2];
            if ( temp == target) {
                return new int[]{ index1 + 1 , index2 + 1 };
            }else if (temp < target) {
                index1++;
            }else {
                index2--;
            }
        }
        return null;
    }
}
```

## 1.1 💗🧡💛
[leetcode-01](https://leetcode.com/problems/two-sum/) / [力扣-01](https://leetcode-cn.com/problems/two-sum/)

这道题和上一题的区别是容器中的元素是无序的！

所以排序后可以直接用上一题的做法，也可以暴力，这一题暴力不超时！

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> a;
        for (int i = 0; i < nums.size() - 1; i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    a.push_back(i);
                    a.push_back(j);
                    break;
                }
            }
        }
        return a;
    }
};
```

## 2.0 💗🧡💛
[Leetcode-633](https://leetcode-cn.com/problems/sum-of-square-numbers/) / [力扣-633](https://leetcode-cn.com/problems/sum-of-square-numbers/)

注意边界条件，存在左指针等于右指针的情况，也就是 $1^2 + 1^2 == 2$ 的情况。

```java
class Solution {
    public boolean judgeSquareSum(int c) {
        int i = 0 , j = (int)Math.sqrt(c);
        while(i <= j ) {
            int temp = i*i+ j*j;
            if ( temp == c ) {
                return true;
            }else if (temp < c) {
                i++;
            }else {
                j--;
            }
        }
        return false;
    }
}
```

## 3.0 💗🧡💛
[Leetcode-345](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/) / [力扣-345](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

设置一个集合，判断里面是否存在元音，也可以设置一个函数。

Java 的 string 数据类型是不可变的，也就是不能在原地址上修改。

查看源码可知其内部的实现本质上是维护了一个字符数组（private final char value[];），此数组是私有的且改数组没有提供 set/get 方法，所以无法在原有数组上修改。但是存在里面存在了一些像 substring， replace 的方法，可以修改值，当然也可以用还可以用反射来修改，重点是算法，此处不再讨论。
[这个回答解释的很好](https://www.zhihu.com/question/20618891)

```java
class Solution {
    private final static HashSet<Character> vowels = new HashSet<>(
        Arrays.asList('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'));
    public String reverseVowels(String s) {
        if (s == null) return null;
        int i = 0 , j = s.length() - 1;
        char[]a = new char[s.length()];
        while (i <= j) {
            char ii = s.charAt(i);
            char jj = s.charAt(j);
            if (!vowels.contains(ii)) {
                a[i++] = ii;
            }else if(!vowels.contains(jj)) {
                a[j--] = jj;
            }else {
                a[i++] = jj;
                a[j--] = ii;
            }
        }
        return new String(a);
    }
}
```

## 4.0 💗🧡💛
[680. 验证回文字符串 Ⅱ](https://leetcode-cn.com/problems/valid-palindrome-ii/)

### 思考
如果暴力的话需要从头扫描。但是扫过的部分已经匹配过了所以不需要再从头开始，而且看评论里面提到暴力可能会超时。

用双指针来实现，当发现左右指针不相等时只需要考虑左边跳还是有边跳即可。

本来想在一个函数中实现，思考了一下发现好像不可以，左边跳一步还是右边跳一步二者是“或”的关系。

跳完之后的部分放在一个函数中实现。
```java
class Solution {
    
    public boolean validPalindrome(String s) {
        int i = 0 , j = s.length() - 1;
        while( i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                return (again(s , i + 1 , j) || (again(s , i , j -1)));
            }
            i++;
            j--;
        }
        return true;
    }

    public boolean again(String s ,int i, int j) {
        while(i < j) {
            if(s.charAt(i++) != s.charAt(j--)) {
                return false;
            }
        }
        return true;
    }
}
```

## 5.0 💗🧡💛
[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

### 思考
如果从头部开始合并势必会导致 nums1 中的值被覆盖，从尾部开始

```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m-1 , j = n - 1 , len = m + n - 1;
        while( i >= 0 || j >= 0) {
            if (i < 0) {
                nums1[len--] = nums2[j--];
            }else if (j < 0){
                nums1[len--] = nums2[i--];
            }else if (nums1[i] > nums2[j]) {
                nums1[len--] = nums1[i--];
            }else {
                nums1[len--] = nums2[j--];
            }
        } 
    }
}
```

优化版

```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
   int tail=m+n-1,tail1=m-1,tail2=n-1;
        while(tail!=tail1)
        {
            if(tail1>=0 && nums1[tail1]>nums2[tail2]) nums1[tail--]=nums1[tail1--];
            else nums1[tail--]=nums2[tail2--];
        }
    }
}
```


## 6.0 💗🧡💛
[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

简而言之，就像跑步，一个跑的快，一个跑的慢，二者之间存在速度差，如果存在环二者必定会相遇。

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
    if (head == null) {
        return false;
    }
    ListNode l1 = head, l2 = head.next;
    while (l1 != null && l2 != null && l2.next != null) {
        if (l1 == l2) {
            return true;
        }
        l1 = l1.next;
        l2 = l2.next.next;
    }
    return false;
    }
}
```

