## 226. 翻转二叉树

[Leetcode-226](https://leetcode.com/problems/invert-binary-tree/description/) / [力扣-226](https://leetcode-cn.com/problems/invert-binary-tree/description/)

先序和后续遍历都可以在回溯的时候将左右节点交换。中序不可以，回溯前后都会交换实际上有些节点交换了两次。

## cpp

遍历的时候直接交换即可。

```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == NULL) return NULL;

        swap(root->left, root->right);

        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};
```

```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        dfs(root);
        return root;
    }
    void dfs(TreeNode* root){
        if (root == NULL) return;
        dfs(root->left);
        dfs(root->right);
        swap(root->left, root->right);
    }
};
```

也可以用 BFS 的思想，先建一个队列，左右节点值交换放入队列中。

```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == NULL) return NULL;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* temp = q.front();
            q.pop();
            if (temp) {
                swap(temp->left, temp->right);
                q.push(temp->left);
                q.push(temp->right);
            }
        }
        return root;
    }
};
```


## Java

将一颗二叉树的左右子树交换位置。
考虑返回值，当前层的操作，递归结束的条件。
- 递归结束的条件：当前节点为空无法交换当前节点下的左右子树，也就是当前节点的父节点已经是叶子节点了。
- 当前层的操作：交换当前层左右子树。
- 返回值：返回的是已经交换好的子树。

```java
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}
```