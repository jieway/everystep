# 101. 对称二叉树 (简单)

[Leetcode-101](https://leetcode.com/problems/symmetric-tree/) / [力扣-101](https://leetcode-cn.com/problems/symmetric-tree/)

题目是让判断树是否对称。其实也是遍历，只不过是交叉的遍历。

* 首先判断是不是一颗空树，如果是，那么这棵树必定对称。
* 然后我们要从整体上判读左树的左树和右树的右树不断比对，以及左树的右树和右树的左树不断比对！
* 如果不是空树，那么先将左树和右树压入栈中，先判断值是否相等，相等就继续压入左树的左树，右树的右数，再判断是否相等，知道左树的左树为空，右树的右树为空，开始回溯。
* 此时再判断左树的右树，右树的左树，同上继续压栈，知道为空停止，然后回溯！
* 开始回溯时会出现两种情况，左树右树其中一个为空或全部为空，前者必定不会对称，后者必定会对称！

```cpp
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (root == NULL) return true;
        return isMirro(root->left , root->right);
    }
    bool isMirro(TreeNode* left, TreeNode* right) {
        if (left == NULL && right == NULL) return true;
        if (left == NULL || right == NULL) return false;
        return (left->val == right->val) && isMirro(left->left,right->right) && isMirro(left->right,right->left);
    }
};
```