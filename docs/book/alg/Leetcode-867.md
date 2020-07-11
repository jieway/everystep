## 867. 转置矩阵

[Leetcode-867](https://leetcode.com/problems/transpose-matrix/) / [力扣-867](https://leetcode-cn.com/problems/transpose-matrix/)

题意：矩阵转置，也就是二维数组沿对角线变换。

```cpp
class Solution {
public:
    vector<vector<int>> transpose(vector<vector<int>>& A) {
        vector<vector<int> > a(A[0].size());
        for (int i = 0; i < A[0].size(); i++) {
            for (int j = 0; j < A.size(); j++) {
                a[i].push_back(A[j][i]);
            }
        }
        return a;
    }
};
```
