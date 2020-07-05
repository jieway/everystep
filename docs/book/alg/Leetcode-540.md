
# 540. Single Element in a Sorted Array
[传送门](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)
## 思考

首先有序，其次有一个数字出现一次。注意数组不要越界。

```java
class Solution {
    public int singleNonDuplicate(int[] nums) {
        for (int i = 0; i < nums.length - 1; i = i + 2) {
            if (nums[i] != nums[i + 1]) {
                return nums[i];
            }
        }
        return nums[nums.length - 1];
    }
}
```
- 针对偶数位进行二分搜索，如果不在偶数位上就后退一位保证处于偶数位上。
```java
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int lo = 0;
        int hi = nums.length - 2;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (mid % 2 == 1) {
                mid--;
            }
            if (nums[mid] == nums[mid + 1] ) {
                hi = mid;
            }else {
                lo = mid + 2;
            }
        }
        return nums[lo];
    }
}
```
