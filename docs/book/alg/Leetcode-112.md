

## 6.0 ❤🧡💛💙

[Leetcode-112](https://leetcode.com/problems/path-sum/description/) / [力扣-112](https://leetcode-cn.com/problems/path-sum/description/)
还是一个递归问题，先将出口写好，然后开启递归。

* 当节点为 null 之时，直接返回一个 false，因为这种情况只有树为空时才存在。显然不存在路径和等于目标和。
* 然后判断到达叶子节点之时目标和是否减为零。
* 然后就是一个先序遍历了，遍历的时候将目标和减下去。

```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int sum) {
        if (root == NULL) return false;
        if (root->left == NULL && root->right == NULL) return sum - root->val == 0;
        return hasPathSum(root->left, sum - root->val) || hasPathSum(root->right, sum - root->val);
    }
};
```



## 112. Path Sum
[Leetcode](https://leetcode-cn.com/problems/path-sum/)

### 思考
题目要求从头节点到叶子节点的路径和是否和某个值相等。
- 递归结束的条件：已经到达叶子节点，判断路径和是否等于某个值。
- 当前层的操作：sum 减去当前节点的值。
- 返回值：递归左右子树，如果满足条件即返回 true 

### code

```java
class Solution {
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) return false;
        sum += root.val;
        if (root.left == null && root.right == null) return (sum == 0);
        return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
    }
}
```
