
## 110. Balanced Binary Tree (Easy)

[Leetcode-110](https://leetcode.com/problems/balanced-binary-tree/description/) / [力扣-110](https://leetcode-cn.com/problems/balanced-binary-tree/description/)

* 每一个节点都需要满足平衡二叉树的定义，所以需要遍历每一个节点！可以采用先序遍历来遍历全部子节点，先序遍历如下。

```cpp
void preOrder(TreeNode root) {
    visit(root);
    preOrder(root.left);
    preOrder(root.right);
}
```

* 还需要一个计算高度的函数，用于计算左右子树的高度。

```cpp
    int maxDepth(TreeNode* root) {
        if (root == NULL) return 0;
        int m = maxDepth(root->left) + 1;
        int n = maxDepth(root->right) + 1;
        return max(m ,n);
    }
```

* 在遍历的过程中需要判断左右子树高度差，一旦发现高度差大于 1 就返回 false 并且需要遍历全部节点，如果所有节点都满足左右子树差小于 1 ，那么才能返回 true

```cpp
        if (root == NULL)
            return true;
        int l = high(root->left);
        int r = high(root->right);
```

* 遍历左右子树，计算高度差，先序遍历的思想遍历全部子树！

```cpp
        if (abs(l - r) > 1 || !isBalanced(root->left) || !isBalanced(root->right)) {
            return false;
        }
        return true;
```

* 综上

```cpp
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        if (root == NULL)
            return true;
        int l = high(root->left);
        int r = high(root->right);
        if (abs(l - r) > 1 || !isBalanced(root->left) || !isBalanced(root->right)) {
            return false;
        }
        return true;
    }
    int high(TreeNode* root) {
        if (root == NULL) return 0;
        return max(high(root->left),high(root->right)) + 1;
    }
};
```

