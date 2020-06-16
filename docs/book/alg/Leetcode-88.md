
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