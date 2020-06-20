
## 1. 修剪二叉查找树
[Leetcode](https://leetcode.com/problems/trim-a-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/trim-a-binary-search-tree/description/)

## 2.0 修建 BST

[Leetcode](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

* 题意主要是将 BST 中的所有值都保证在一个范围之内。
* 考虑当前节点该做的事情：
* 如果当前节点大于 R , 那么返回 root.left 的节点，这样节点值在缩小，向 R 逼近。
* 如果当前节点值大于 L , 那么返回 root.right 的节点，这样节点值在变大，向 l 逼近。

```java
class Solution {
    public TreeNode trimBST(TreeNode root, int L, int R) {
        if (root == null) return null;
        if (root.val > R) return trimBST(root.left, L, R);
        if (root.val < L) return trimBST(root.right, L, R);
        root.left = trimBST(root.left, L, R);
        root.right = trimBST(root.right, L, R);
        return root;
    }
}
```

