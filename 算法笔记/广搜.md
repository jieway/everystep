## code

```java
class Solution {
    public int minDepth(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        if (root == null) { return 0;}
        int highest = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            highest++;
            while (size-- > 0) {
                TreeNode node = queue.poll();
                if (node == null) {
                    continue;
                }
                if (node.left == null && node.right == null) {
                    return highest;
                }
                queue.add(node.left);
                queue.add(node.right);
            }
        }
        return highest;
    }
}
```