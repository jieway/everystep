
## 2.0 得到左下角的节点
[Leetcode](https://leetcode.com/problems/find-bottom-left-tree-value/description/) / [力扣](https://leetcode-cn.com/problems/find-bottom-left-tree-value/description/)

## 513. Find Bottom Left Tree Value 


[Leetcode](https://leetcode-cn.com/problems/find-bottom-left-tree-value/)

### 思考
BFS，先添加右节点，当队列为空时最后一个记录的节点就是左节点。

### code
```java
class Solution {
    public int findBottomLeftValue(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            root = queue.poll();
            if (root.right != null) queue.add(root.right);
            if (root.left != null) queue.add(root.left);

        }
        return root.val;
    }
}
```

