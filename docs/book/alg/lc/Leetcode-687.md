## 687. 最长同值路径

[Leetcode-687](https://leetcode.com/problems/longest-univalue-path/) / [力扣-687](https://leetcode-cn.com/problems/longest-univalue-path/)

```cpp
class Solution {
public:
    int ans = 0;
    int longestUnivaluePath(TreeNode* root) {
        help(root);
        return ans;
    }
    int help(TreeNode* node) {
        if (node == NULL) return 0;
        int l = help(node->left);
        int r = help(node->right);
        l = ((node->left != NULL) && (node->val == node->left->val)) ? l+1 : 0;
        r = ((node->right != NULL) && (node->val == node->right->val)) ? r+1 : 0;
        ans = max(ans , l + r);
        return max(l,r);
    }
};
```

```java
class Solution {
    int ans = 0;
    public int longestUnivaluePath(TreeNode root) {
        help(root);
        return ans;
    }
    public int help(TreeNode root) {
        if (root == null) return 0;
        int l = help(root.left);
        int r = help(root.right);
        l = (root.left != null && (root.left.val == root.val)) ? l + 1 : 0;
        r = (root.right != null && (root.right.val == root.val)) ? r + 1 : 0;
        ans = Math.max(ans, l + r);
        return Math.max(l,r);
    }
}
```