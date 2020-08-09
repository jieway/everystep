## 88. 合并两个有序数组

[Leetcode-88](https://leetcode.com/problems/merge-sorted-array/) / [力扣-88](https://leetcode-cn.com/problems/merge-sorted-array/)

如果从头部开始合并势必会导致 nums1 中的值被覆盖，需要创建一个新的数组来存数据。

如果从尾部开始可以直接在原数组上操作，不存在数组中的值被覆盖的情况。

## cpp

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1 , j = n - 1 , l = m + n - 1;
        while (i >=0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[l--] = nums1[i--];
            }else {
                nums1[l--] = nums2[j--];
            }
        }
        while (j >= 0) {
            nums1[l--] = nums2[j--];
        }

    }
};
```

## Java

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