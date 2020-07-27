# 540. 有序数组中的单一元素

[Leetcode-540](https://leetcode.com/problems/single-element-in-a-sorted-array/) / [力扣-540]([Leetcode-540](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/))

首先有序，其次有一个数字出现一次。注意数组不要越界。循环，时间复杂度为 $O(N)$ ，注意特殊情况。

```java
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        for (int i = 0; i < nums.size() - 1; i += 2) {
            if (nums[i] != nums[i + 1]) {
                return nums[i];
            }
        }
        // 针对单数数字出现在末尾的情况，例如： [1,1,2]
        return nums[nums.size() - 1];
    }
};
```

- 针对偶数位进行二分搜索，如果不在偶数位上就后退一位保证处于偶数位上。

```java
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int lo = 0;
        int hi = nums.length - 2;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
                mid--;
            if (mid % 2 == 1) {
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
