## 112. 路径总和 (简单)

[Leetcode-112](https://leetcode.com/problems/path-sum/description/) / [力扣-112](https://leetcode-cn.com/problems/path-sum/description/)

还是一个递归问题，先将出口写好，然后开启递归。

* 当节点为 null 之时，直接返回一个 false，因为这种情况只有树为空时才存在。显然不存在路径和等于目标和。
* 然后判断到达叶子节点之时目标和是否减为零。
* 然后就是一个先序遍历了，遍历的时候将目标和减下去。

```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int sum) {
        if (root == NULL) return false;
        // 确保了在叶子节点上值为零
        if (sum == root->val && root->left == NULL && root->right == NULL) return true;
        sum -= root->val;
        return hasPathSum(root->left, sum) || hasPathSum(root->right, sum);
    }
};```