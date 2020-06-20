## 1.0 一棵树每层节点的平均数
[Leetcode](https://leetcode.com/problems/average-of-levels-in-binary-tree/description/) / [力扣](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/description/)


## 637. Average of Levels in Binary Tree
[Leetcode](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/)

### 题意
计算二叉树每一层的平均值，层序遍历，建队列求和取平均值即可。(BFS)

### code
```java
class Solution {
    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> l = new ArrayList<>();
        Queue<TreeNode> queue = new  LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int cnt = queue.size();
            double sum = 0;
            for (int i = 0; i < cnt; i++) {
                TreeNode node = queue.poll();
                sum += node.val;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            l.add(sum/cnt);
        }
        return l;
    }
}
```

