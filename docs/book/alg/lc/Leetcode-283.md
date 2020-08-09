## 283. 移动零

[Leetcode-283](https://leetcode.com/problems/move-zeroes/) / [力扣-283](https://leetcode-cn.com/problems/move-zeroes/)

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int j = 0;
        int n = nums.size();
        for (int i = 0; i < n; i ++) {
            if (nums[i] != 0) {
                nums[j++] = nums[i];
            }
        }
        while(j < n) {
            nums[j++] = 0;
        }
    }
};
```

这种写法也可以！，一遍循环，和上面的写法差别不大。

注意先将数组长度计算出来，不然每次循环都要计算一次。

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0 , j = 0 ; i < n; i++) {
            if (nums[i] != 0) {
                swap(nums[j++],nums[i]);
            }
        }
    }
};
```