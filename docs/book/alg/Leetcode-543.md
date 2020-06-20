## 543. Diameter of Binary Tree (Easy)

[Leetcode-543](https://leetcode.com/problems/diameter-of-binary-tree/description/) / [力扣-543](https://leetcode-cn.com/problems/diameter-of-binary-tree/description/)

最长路径等于左数高加上右树高，也就是如下代码。

```cpp
    int diameterOfBinaryTree(TreeNode* root) {
        int sum = high(root->left) + high(root->right);
        return sum;
    }
    int high(TreeNode* root) {
        if (root == NULL) return 0;
        return max(high(root->left), high(root->right)) + 1;
    }
```
测试数据过了。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200508173523.png"/>

但是 submit 的时候这个例子过不去。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200508173619.png"/>


于是加上这个这个例子的情况。

```cpp
    int diameterOfBinaryTree(TreeNode* root) {
        if (root == NULL) return 0;
        int sum = high(root->left) + high(root->right);
        return sum;
    }
    int high(TreeNode* root) {
        if (root == NULL) return 0;
        return max(high(root->left), high(root->right)) + 1;
    }
```

过了 102 个例子，根据这个例子可以发现其实不过根节点也存在最长的路径。题目也确实明确给出了不一定过根节点。

<img src="https://gitee.com/weijiew/pic/raw/master/img/20200508173823.png"/>

那么就需要遍历所有节点下的路径和来拿到最大值了。问题就转化为了求树高的最值，但是在求得过程中需要将左右子树和记录下来。遍历了所有的节点同时也拿到了最值。

```cpp
class Solution {
    int ans;
    int high(TreeNode* root) {
        if (root == NULL) return 0;
        int l = high(root->left);
        int r = high(root->right);
        ans = max(ans, l + r + 1);
        return max(l , r) + 1;
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        ans = 1;
        high(root);
        return ans - 1;
    }
};
```