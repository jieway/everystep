

## 1.0 ❤🧡💛
[Leetcode-100](https://leetcode.com/problems/same-tree/) / [力扣-100](https://leetcode-cn.com/problems/same-tree/)

题意是判断两颗树是否相等，首先肯定需要遍历每一个节点，然后比较每一个值，null 和 值是否相等要区分开来判断。之后其实就是一个先序遍历了！

```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (p == NULL && q == NULL) return true;
        if (p == NULL || q == NULL) return false;
        if (p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right,q->right);
    }
};
```