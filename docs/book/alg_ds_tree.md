# 二叉树的遍历

## 1.0 非递归实现二叉树的前序遍历
[Leetcode-144](https://leetcode.com/problems/binary-tree-preorder-traversal/description/) / [力扣-144](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/)

## 2.0 非递归实现二叉树的后序遍历
[Leetcode-145](https://leetcode.com/problems/binary-tree-postorder-traversal/description/) / [力扣-145](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/)

## 3.0 非递归实现二叉树的中序遍历
[Leetcode-94](https://leetcode.com/problems/binary-tree-inorder-traversal/description/) / [力扣-94](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/)

# 层次遍历

## 1.0 一棵树每层节点的平均数
[Leetcode](https://leetcode.com/problems/average-of-levels-in-binary-tree/description/) / [力扣](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/description/)

## 2.0 得到左下角的节点
[Leetcode](https://leetcode.com/problems/find-bottom-left-tree-value/description/) / [力扣](https://leetcode-cn.com/problems/find-bottom-left-tree-value/description/)

# 递归
## 1.0 ❤🧡

[Leetcode-104](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/) / [力扣-104](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/)
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

## 2.0 ❤🧡💛
[Leetcode-100](https://leetcode.com/problems/balanced-binary-tree/description/) / [力扣-100](https://leetcode-cn.com/problems/balanced-binary-tree/description/)

* 每一个节点都需要满足平衡二叉树的定义，所以需要遍历每一个节点！可以采用先序遍历来遍历全部子节点，先序遍历如下。

```cpp
void preOrder(TreeNode root) {
    visit(root);
    preOrder(root.left);
    preOrder(root.right);
}
```

* 还需要一个计算高度的函数，用于计算左右子树的高度。

```cpp
    int maxDepth(TreeNode* root) {
        if (root == NULL) return 0;
        int m = maxDepth(root->left) + 1;
        int n = maxDepth(root->right) + 1;
        return max(m ,n);
    }
```

* 在遍历的过程中需要判断左右子树高度差，一旦发现高度差大于 1 就返回 false 并且需要遍历全部节点，如果所有节点都满足左右子树差小于 1 ，那么才能返回 true

```cpp
        if (root == NULL)
            return true;
        int l = high(root->left);
        int r = high(root->right);
```

* 遍历左右子树，计算高度差，先序遍历的思想遍历全部子树！

```cpp
        if (abs(l - r) > 1 || !isBalanced(root->left) || !isBalanced(root->right)) {
            return false;
        }
        return true;
```

* 综上

```cpp
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        if (root == NULL)
            return true;
        int l = high(root->left);
        int r = high(root->right);
        if (abs(l - r) > 1 || !isBalanced(root->left) || !isBalanced(root->right)) {
            return false;
        }
        return true;
    }
    int high(TreeNode* root) {
        if (root == NULL) return 0;
        return max(high(root->left),high(root->right)) + 1;
    }
};
```

## 3.0 ❤🧡💛

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

## 4.0 ❤🧡💛

[Leetcode-226](https://leetcode.com/problems/invert-binary-tree/description/) / [力扣-226](https://leetcode-cn.com/problems/invert-binary-tree/description/)

先序和后续遍历都可以在回溯的时候将左右节点交换。中序不可以，回溯前后都会交换实际上有些节点交换了两次。

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

## 5.0 ❤🧡💛💙

[Leetcode-617](https://leetcode.com/problems/merge-two-binary-trees/description/) / [力扣-617](https://leetcode-cn.com/problems/merge-two-binary-trees/description/)

```cpp
class Solution {
public:
    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {
        if (t1 == NULL) return t2;
        if (t2 == NULL) return t1;
        t1->val += t2->val;
        t1->left = mergeTrees(t1->left, t2->left);
        t1->right = mergeTrees(t1->right, t2->right);
        return t1;
    }
};
```

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

## 7.0 ❤🧡💛💙💚

[Leetcode-437](https://leetcode.com/problems/path-sum-iii/description/) / [力扣-437](https://leetcode-cn.com/problems/path-sum-iii/description/)

上一道题套一层皮而已。

```cpp
class Solution {
public:
    int psum;
    int pathSum(TreeNode* root, int sum) {
        if (root == NULL) return 0; 
        Sum(root, sum);
        pathSum(root->left, sum);
        pathSum(root->right, sum);
        return psum;
    }
    void Sum(TreeNode* root, int sum) {
        if (root == NULL) return;
        sum -= root->val;
        if (sum == 0) psum++;
        Sum(root->left, sum);
        Sum(root->right, sum);
    }
};
```

## 8.0 ❤🧡💛💙
[Leetcode-437](https://leetcode.com/problems/subtree-of-another-tree/description/) / [力扣-437](https://leetcode-cn.com/problems/subtree-of-another-tree/description/)

## 9.0 ❤🧡💛💙
[Leetcode-101](https://leetcode.com/problems/symmetric-tree/description/) / [力扣-101](https://leetcode-cn.com/problems/symmetric-tree/description/)
```cpp
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        return isMirror(root, root);
    }
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (t1 == NULL && t2 == NULL) return true;
        if (t1 == NULL || t2 == NULL) return false;
        return (t1->val == t2->val) && isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);
    }
};
```

## 10. 最小路径
[Leetcode-111](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/) / [力扣-111](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/)

## 11. 统计左叶子节点的和
[Leetcode-404](https://leetcode.com/problems/sum-of-left-leaves/description/) / [力扣-404](https://leetcode-cn.com/problems/sum-of-left-leaves/description/)
需要一个遍历，遍历过程中发现左叶子节点就累加到变量上。

```cpp
class Solution {
public:
    int sum = 0;
    int sumOfLeftLeaves(TreeNode* root) {
        leftSum(root);
        return sum;
    }
    void leftSum(TreeNode *root) {
        if (root == NULL) return ;
        if (root->left != NULL && (root->left->left == NULL && root->left->right == NULL))
        sum += root->left->val;
        sumOfLeftLeaves(root->left);
        sumOfLeftLeaves(root->right);
    }
};
```

## 12. 相同节点值的最大路径长度
[Leetcode-687](https://leetcode.com/problems/longest-univalue-path/) / [力扣-687](https://leetcode-cn.com/problems/longest-univalue-path/)

## 13. 间隔遍历
[Leetcode](https://leetcode.com/problems/house-robber-iii/description/) / [力扣](https://leetcode-cn.com/problems/house-robber-iii/description/)

## 14. 找出二叉树中第二小的节点
[Leetcode](https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/description/) / [力扣](https://leetcode-cn.com/problems/second-minimum-node-in-a-binary-tree/description/)


# BST

二叉查找树（BST）：根节点大于等于左子树所有节点，小于等于右子树所有节点。

二叉查找树中序遍历有序。

## 1. 修剪二叉查找树
[Leetcode](https://leetcode.com/problems/trim-a-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/trim-a-binary-search-tree/description/)

## 2. 寻找二叉查找树的第 k 个元素

230\. Kth Smallest Element in a BST (Medium)

[Leetcode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/) / [力扣](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/description/)

## 3. 把二叉查找树每个节点的值都加上比它大的节点的值

Convert BST to Greater Tree (Easy)

[Leetcode](https://leetcode.com/problems/convert-bst-to-greater-tree/description/) / [力扣](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/description/)

## 4. 二叉查找树的最近公共祖先

235\. Lowest Common Ancestor of a Binary Search Tree (Easy)

[Leetcode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

## 5. 二叉树的最近公共祖先

236\. Lowest Common Ancestor of a Binary Tree (Medium) 

[Leetcode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/) / [力扣](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/description/)


## 6. 从有序数组中构造二叉查找树

108\. Convert Sorted Array to Binary Search Tree (Easy)

[Leetcode](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/description/)


## 7. 根据有序链表构造平衡的二叉查找树

109\. Convert Sorted List to Binary Search Tree (Medium)

[Leetcode](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/description/)


## 8. 在二叉查找树中寻找两个节点，使它们的和为一个给定值

653\. Two Sum IV - Input is a BST (Easy)

[Leetcode](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/) / [力扣](https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst/description/)


## 9. 在二叉查找树中查找两个节点之差的最小绝对值

530\. Minimum Absolute Difference in BST (Easy)

[Leetcode](https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/) / [力扣](https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/description/)


## 10. 寻找二叉查找树中出现次数最多的值

501\. Find Mode in Binary Search Tree (Easy)

[Leetcode](https://leetcode.com/problems/find-mode-in-binary-search-tree/description/) / [力扣](https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/description/)


# Trie

## 1.0 实现一个 Trie
[Leetcode](https://leetcode.com/problems/implement-trie-prefix-tree/description/) / [力扣](https://leetcode-cn.com/problems/implement-trie-prefix-tree/description/)

## 2.0 实现一个 Trie，用来求前缀和
[Leetcode](https://leetcode.com/problems/map-sum-pairs/description/) / [力扣](https://leetcode-cn.com/problems/map-sum-pairs/description/)