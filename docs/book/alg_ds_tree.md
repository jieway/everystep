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
[Leetcode](https://leetcode.com/problems/map-sum-pairs/description/) / [力扣](https://leetcode-cn.com/problems/



# 遍历

- 前序遍历的代码在进入某一个节点之前的那个时间点执行，后序遍历代码在离开某个节点之后的那个时间点执行。


## 1.0 对比二叉树

[Leetcode：100](https://leetcode-cn.com/problems/same-tree/)

题意是判断两颗树是否相等，首先肯定需要遍历每一个节点，然后比较每一个值，null 和 值是否相等要区分开来判断。之后其实就是一个先序遍历了！

### code
```java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return isSameTree(p.left , q.left) && isSameTree(p.right,q.right);
     }
}
```


## 2.0 判断对称树

[Leetcode](https://leetcode-cn.com/problems/symmetric-tree/)

题目是让判断树是否对称。其实也是遍历，只不过是交叉的遍历。

* 首先判断是不是一颗空树，如果是，那么这棵树必定对称。
* 然后我们要从整体上判读左树的左树和右树的右树不断比对，以及左树的右树和右树的左树不断比对！
* 如果不是空树，那么先将左树和右树压入栈中，先判断值是否相等，相等就继续压入左树的左树，右树的右数，再判断是否相等，知道左树的左树为空，右树的右树为空，开始回溯。
* 此时再判断左树的右树，右树的左树，同上继续压栈，知道为空停止，然后回溯！
* 开始回溯时会出现两种情况，左树右树其中一个为空或全部为空，前者必定不会对称，后者必定会对称！

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirrored(root.left , root.right);
    }
    public boolean isMirrored(TreeNode left , TreeNode right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        return (left.val == right.val)  && isMirrored(left.left,right.right) && isMirrored(left.right,right.left);
    }
}
```



## 543. Diameter of Binary Tree
[Leetcode](https://leetcode-cn.com/problems/diameter-of-binary-tree/descript
ion/)

### 思考
递归计算二叉树的深度。在此基础上递归计算左右两颗子树的深度，计算的过程中将最大值保留下来。

### AC
```java
class Solution {
    private int max = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        deep(root);
        return max;
    }
    public int deep(TreeNode root) {
        if (root == null) return 0;
        int left = deep(root.left);
        int right = deep(root.right);
        max = Math.max(max , left + right);
        return Math.max(left , right) + 1;
    }
}
```

## 226. Invert Binary Tree
[Leetcode](https://leetcode-cn.com/problems/invert-binary-tree/description/)

### 思考
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

## 617. Merge Two Binary Trees

[Leetcode](https://leetcode-cn.com/problems/merge-two-binary-trees/)
递归的先序遍历，这道题的只是在先序遍历的过程中将输出值那一步替换为两棵树节点值相加。

```java
public static void recursionPreorderTraversal(TreeNode root) {
    if (root != null) {
        System.out.print(root.val + " ");
        recursionPreorderTraversal(root.left);
        recursionPreorderTraversal(root.right);
    }
}
```
将两个二叉树合并成一个二叉树。
- 递归的结束：递归结束的条件位左右节点均空。
- 当前层的操作：两个节点值的和放到一颗树上。
- 返回值：如果一个树没有左节点而另一个树有左节点，那么将另一个树的左节点挂在当前树的左节点上。右节点同理。

### AC
```java
class Solution {
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return null;
        if (t1 == null) return t2;
        if (t2 == null) return t1;
        t1.val += t2.val;
        t1.left = mergeTrees(t1.left, t2.left);
        t1.right = mergeTrees(t1.right, t2.right);
        return t1;
    }
}
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


## 1.0 二叉树的先序遍历

[144. Binary Tree Preorder Traversal](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/)

### 思考
层序遍历 (root -> left -> right) , 建栈，优先存入右节点保证了左节点先弹出。

### code
```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        Stack<TreeNode> stack = new Stack <>();
        List<Integer> result = new ArrayList<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node == null) continue;
            result.add(node.val);
            stack.push(node.right);
            stack.push(node.left);
        }
        return result;
    }
}
```

## 中序遍历

```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        queue.add(root);
        while (!queue.isEmpty()) {
            int cnt = queue.size();
            for (int i = 0 ; i < cnt ; i++) {
                TreeNode node = queue.poll();
                result.add(node.val);
                if (node.left != null) {queue.add(node.left);}
                if (node.right != null) {queue.add(node.right);}
            }
        }
        return result;
    }
}
```

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


## 94. Binary Tree Inorder Traversal
[Leetcode](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

### 思考
二叉树的中序遍历， left -> root -> right

### code

```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            TreeNode temp = stack.pop();
            result.add(temp.val);
            node = temp.right;
        }
        return result;
    }
}
```
# 二叉搜索树（BST）

二叉查找树（Binary Search Tree），简称 BST ，二叉搜索树的性质 ： left < root < right .

## 1.0 建一棵 BST

[leetcode](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)
题意是给你一个有序数组，如何建立一颗二叉搜索树，
```java
class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return nums == null ? null : df(nums,0,nums.length-1);
    }
    public TreeNode df(int[] nums,int i , int j) {
        if (i > j) return null;
        int m = j + (i - j) / 2;
        TreeNode tree = new TreeNode(nums[m]);
        tree.left = df( nums, i, m-1);
        tree.right = df( nums, m+1, j);
        return tree;
    }
}
```

## 2.0 修建 BST

[Leetcode](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

* 题意主要是将 BST 中的所有值都保证在一个范围之内。
* 考虑当前节点该做的事情：
* 如果当前节点大于 R , 那么返回 root.left 的节点，这样节点值在缩小，向 R 逼近。
* 如果当前节点值大于 L , 那么返回 root.right 的节点，这样节点值在变大，向 l 逼近。

```java
class Solution {
    public TreeNode trimBST(TreeNode root, int L, int R) {
        if (root == null) return null;
        if (root.val > R) return trimBST(root.left, L, R);
        if (root.val < L) return trimBST(root.right, L, R);
        root.left = trimBST(root.left, L, R);
        root.right = trimBST(root.right, L, R);
        return root;
    }
}
```


## 230. Kth Smallest Element in a BST
[Leetcode](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/description/)

### 思考

二叉搜索树的中序遍历是递增序列，直接中序遍历达到到结果，记录一下值返回即可。

### code
```java
class Solution {
    private int cnt = 0;
    private int index ;
    public int kthSmallest(TreeNode root, int k) {
        inorderTraversal(root,k);
        return index;
    }
    public void inorderTraversal(TreeNode root , int k ) {
        if (root == null) return;
        inorderTraversal(root.left, k);
        cnt ++;
        if (k == cnt) {
            index = root.val;
            return;
        }
        inorderTraversal(root.right, k);
    }
}
```

## 538. Convert BST to Greater Tree

[Leetcode](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/description/)

## 
找规律可以发现，后面的值的和加在前面的数字上。
二叉搜索树的特性就是总序遍历的序列是升序的，可以中序遍历将值从尾部叠加到头部。

## code
```java
class Solution {
    private int sum = 0;
    public TreeNode convertBST(TreeNode root) {
        if (root != null) {
            convertBST(root.left);
            sum += root.val;
            root.val = sum;
            convertBST(root.right);
        }
        return root;
    }
}
```


## code
```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root.val > p.val && root.val > q.val) {
            return lowestCommonAncestor(root.left, p, q);
        }
        if (root.val < p.val && root.val < q.val) {
            return lowestCommonAncestor(root.right,p,q);
        }
        return root;
    }
}
```