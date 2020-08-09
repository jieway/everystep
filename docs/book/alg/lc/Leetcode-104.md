
## 104. 二叉树的最大深度

[Leetcode-104](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/) / [力扣-104](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/) / [力扣-104](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/) / [力扣-104](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/)

递归练习。

* 先思考递归结束的条件，即节点为空的情况，返回 0 因为这个节点为空，上一个节点是子节点，而子节点的下一个节点是高度 0， 回溯的时候加一，叶子节点就变成了 1 ，在回溯再加一，最后回溯到顶点，得到树高。

* 因为是二叉树，存在两条路的选择，所以两个高度需要比较，高的那个分支即为最值。

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == NULL) return 0;
        int m = maxDepth(root->left) + 1;
        int n = maxDepth(root->right) + 1;
        return max(m ,n);
    }
};
```

简化一下

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == NULL) return 0;
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```

三目运算符 ? ，一条语句解决。

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        return root == NULL ? 0 : max(maxDepth(root->left),maxDepth(root->right)) + 1;
    }
};
```

BFS：

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        queue<TreeNode*> que;
        int l = 0;
        if (root != NULL) {
            que.push(root);
        }
        while (!que.empty()) {
            int s = que.size();
            l++;
            while (s--) {
                TreeNode* t = que.front();
                que.pop();
                if (t->left != NULL) {
                    que.push(t->left);
                }
                if (t->right != NULL) {
                    que.push(t->right);
                }
            }
        }
        return l;
    }
};
```