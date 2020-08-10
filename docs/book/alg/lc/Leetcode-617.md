
## 617. 合并二叉树 (Easy)

[Leetcode-617](https://leetcode.com/problems/merge-two-binary-trees/description/) / [力扣-617](https://leetcode-cn.com/problems/merge-two-binary-trees/description/)

四种情况，注意返回值。

## cpp

```cpp
class Solution {
public:
    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {
        if (t1 == NULL && t2 == NULL) return NULL;
        if (t1 == NULL) return t2;
        if (t2 == NULL) return t1;
        t1->val += t2->val;
        t1->left = mergeTrees(t1->left, t2->left);
        t1->right = mergeTrees(t1->right, t2->right);
        return t1;
    }
};```

## Java

递归的先序遍历，这道题的只是在先序遍历的过程中将输出值那一步替换为两棵树节点值相加。

```java
public static void recursionPreorderTraversal(TreeNode root) {
    if (root != null) {
        System.out.print(root.val + " ");
        recursionPreorderTraversal(root.left);
        recursionPreorderTraversal(root.right);
    }
}
```

将两个二叉树合并成一个二叉树。
- 递归的结束：递归结束的条件位左右节点均空。
- 当前层的操作：两个节点值的和放到一颗树上。
- 返回值：如果一个树没有左节点而另一个树有左节点，那么将另一个树的左节点挂在当前树的左节点上。右节点同理。

```java
class Solution {
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return null;
        if (t1 == null) return t2;
        if (t2 == null) return t1;
        t1.val += t2.val;
        t1.left = mergeTrees(t1.left, t2.left);
        t1.right = mergeTrees(t1.right, t2.right);
        return t1;
    }
}
```
