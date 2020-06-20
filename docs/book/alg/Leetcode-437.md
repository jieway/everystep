
## 7.0 ❤🧡💛💙💚

[Leetcode-437](https://leetcode.com/problems/path-sum-iii/description/) / [力扣-437](https://leetcode-cn.com/problems/path-sum-iii/description/)

上一道题套一层皮而已。

```cpp
class Solution {
public:
    int psum;
    int pathSum(TreeNode* root, int sum) {
        if (root == NULL) return 0; 
        Sum(root, sum);
        pathSum(root->left, sum);
        pathSum(root->right, sum);
        return psum;
    }
    void Sum(TreeNode* root, int sum) {
        if (root == NULL) return;
        sum -= root->val;
        if (sum == 0) psum++;
        Sum(root->left, sum);
        Sum(root->right, sum);
    }
};
```