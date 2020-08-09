## 437. 路径总和 III

[Leetcode-437](https://leetcode.com/problems/path-sum-iii/description/) / [力扣-437](https://leetcode-cn.com/problems/path-sum-iii/description/)

上一道题套一层皮而已。

```cpp
class Solution {
public:
    int ans = 0;
    int pathSum(TreeNode* root, int sum) {
        if (root == NULL) return 0;
        calSum(root, sum);
        pathSum(root->left,sum);
        pathSum(root->right,sum);
        return ans;
    }
    void calSum(TreeNode* root, int sum) {
        if (root == NULL) return;
        sum -= root->val;
        if (sum == 0) ans++;
        calSum(root->left, sum);
        calSum(root->right, sum);
    }
};
```