## 10. 最小路径

[Leetcode-111](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/) / [力扣-111](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/)

注意不要漏条件。

```cpp
class Solution {
public:
    int minDepth(TreeNode* root) {
        // 递归结束的条件
        if (root == NULL) return 0;

        // 左右都无子节点，也就是当前节点是叶子节点。
        if (root->left == NULL && root->right == NULL) return 1;
        int l = minDepth(root->left);
        int r = minDepth(root->right);

        // 左右子节点存在其中一个
        if (root->left == NULL || root->right == NULL) return l + r + 1;

        // 左右子节点均存在，那么选最小的一个
        return min(l, r) + 1;
    }
};
```