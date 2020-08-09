## 11. 统计左叶子节点的和

[Leetcode-404](https://leetcode.com/problems/sum-of-left-leaves/description/) / [力扣-404](https://leetcode-cn.com/problems/sum-of-left-leaves/description/)

需要一个遍历，遍历过程中发现左叶子节点就累加到变量上。

```cpp
class Solution {
public:
    int sum = 0;
    int sumOfLeftLeaves(TreeNode* root) {
        leftSum(root);
        return sum;
    }
    void leftSum(TreeNode *root) {
        if (root == NULL) return ;
        if (root->left != NULL && (root->left->left == NULL && root->left->right == NULL))
            sum += root->left->val;
        leftSum(root->left);
        leftSum(root->right);
    }
};
```
