# 1470. 重新排列数组

[Leetcode-1470](https://leetcode.com/problems/shuffle-the-array/) / [力扣-1470](https://leetcode-cn.com/problems/shuffle-the-array/)

```cpp
class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> result(2*n);
        int index = 0;
        for (int i = 0; i < n; i++) {
            result[index++] = nums[i];
            result[index++] = nums[i+n];
        }
        return result;
    }
};
```