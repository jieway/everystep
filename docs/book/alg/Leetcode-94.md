
## 3.0 非递归实现二叉树的中序遍历
[Leetcode-94](https://leetcode.com/problems/binary-tree-inorder-traversal/description/) / [力扣-94](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/)

## 94. Binary Tree Inorder Traversal
[Leetcode](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

### 思考
二叉树的中序遍历， left -> root -> right

### code

```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            TreeNode temp = stack.pop();
            result.add(temp.val);
            node = temp.right;
        }
        return result;
    }
}
```


