# 1566. 重复至少 K 次且长度为 M 的模式

[Leetcode-1566](https://leetcode.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times/****) / [力扣-1566](https://leetcode-cn.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times/)

```cpp
class Solution {
public:
    bool containsPattern(vector<int>& arr, int m, int k) {
        int n = arr.size();
        if (n < m*k) return false;
        int i , j;
        for (i = 0; i <= n - m * k; i++) {
            for (j = i + m; j < i + m * k; j++) {
                if (arr[j] != arr[j-m]) break;
            }
            if (j == i + m*k) return true;
        }
        return false;
    }
};
```