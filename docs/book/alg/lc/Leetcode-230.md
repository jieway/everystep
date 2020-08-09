
## 2. 寻找二叉查找树的第 k 个元素

230\. Kth Smallest Element in a BST (Medium)

[Leetcode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/) / [力扣](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/description/)



## 230. Kth Smallest Element in a BST
[Leetcode](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/description/)

### 思考

二叉搜索树的中序遍历是递增序列，直接中序遍历达到到结果，记录一下值返回即可。

### code
```java
class Solution {
    private int cnt = 0;
    private int index ;
    public int kthSmallest(TreeNode root, int k) {
        inorderTraversal(root,k);
        return index;
    }
    public void inorderTraversal(TreeNode root , int k ) {
        if (root == null) return;
        inorderTraversal(root.left, k);
        cnt ++;
        if (k == cnt) {
            index = root.val;
            return;
        }
        inorderTraversal(root.right, k);
    }
}
```
