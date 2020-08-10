
## 2.0 非递归实现二叉树的后序遍历
[Leetcode-145](https://leetcode.com/problems/binary-tree-postorder-traversal/description/) / [力扣-145](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/)


## 145. Binary Tree Postorder Traversal

[Leetcode](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

### 思考
二叉树的后续遍历，left -> right -> root
而先序遍历为： root -> left -> right
可以按照先序遍历的思路，只不过是将左右子树的顺序交换，而最终反转整个 list 即可。
### code

```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack <>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node == null) continue;
            result.add(node.val);
            stack.push(node.left);
            stack.push(node.right);
        }
        Collections.reverse(result);
        return result;
    }
}
```

