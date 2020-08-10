# 1480. 一维数组的动态和

[Leetcode-1480](https://leetcode.com/problems/running-sum-of-1d-array/) / [力扣-1480](https://leetcode-cn.com/problems/running-sum-of-1d-array/)

```cpp
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i++) {
            nums[i] += nums[i-1];
        }
        return nums;
    }
};
```