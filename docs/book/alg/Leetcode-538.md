
## 3. 把二叉查找树每个节点的值都加上比它大的节点的值

Convert BST to Greater Tree (Easy)

[Leetcode](https://leetcode.com/problems/convert-bst-to-greater-tree/description/) / [力扣](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/description/)

## 538. Convert BST to Greater Tree

[Leetcode](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/description/)

## 
找规律可以发现，后面的值的和加在前面的数字上。
二叉搜索树的特性就是总序遍历的序列是升序的，可以中序遍历将值从尾部叠加到头部。

## code
```java
class Solution {
    private int sum = 0;
    public TreeNode convertBST(TreeNode root) {
        if (root != null) {
            convertBST(root.left);
            sum += root.val;
            root.val = sum;
            convertBST(root.right);
        }
        return root;
    }
}
```


## code
```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root.val > p.val && root.val > q.val) {
            return lowestCommonAncestor(root.left, p, q);
        }
        if (root.val < p.val && root.val < q.val) {
            return lowestCommonAncestor(root.right,p,q);
        }
        return root;
    }
}
```


