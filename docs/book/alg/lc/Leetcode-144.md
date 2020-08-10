
## 144. Binary Tree Preorder Traversal

[Leetcode-144](https://leetcode.com/problems/binary-tree-preorder-traversal/description/) / [力扣-144](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/) / [力扣-144](https://leetcode.com/problems/binary-tree-preorder-traversal/description/) / [力扣-144](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/)


## 1.0 二叉树的先序遍历

[144. Binary Tree Preorder Traversal](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/)

### 思考
层序遍历 (root -> left -> right) , 建栈，优先存入右节点保证了左节点先弹出。

### code
```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack <>();
        List<Integer> result = new ArrayList<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node == null) continue;
            result.add(node.val);
            stack.push(node.right);
            stack.push(node.left);
        }
        return result;
    }
}
```

## 中序遍历

```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        queue.add(root);
        while (!queue.isEmpty()) {
            int cnt = queue.size();
            for (int i = 0 ; i < cnt ; i++) {
                TreeNode node = queue.poll();
                result.add(node.val);
                if (node.left != null) {queue.add(node.left);}
                if (node.right != null) {queue.add(node.right);}
            }
        }
        return result;
    }
}
```
