# 题单

|                题目                 | 难度  |
| :---------------------------------: | :---: |
| [Leetcode-104](alg/Leetcode-104.md) |   💗   |


## 2.0 ❤🧡💛
[Leetcode-110](https://leetcode.com/problems/balanced-binary-tree/description/) / [力扣-110](https://leetcode-cn.com/problems/balanced-binary-tree/description/)

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





## 示例

[reverse-string](https://leetcode-cn.com/problems/reverse-string/)

> 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组  `char[]`  的形式给出。

```go
func reverseString(s []byte) {
	res := make([]byte, 0)
	reverse(s, 0, &res)
	for i := 0; i < len(s); i++ {
		s[i] = res[i]
	}
}
func reverse(s []byte, i int, res *[]byte) {
	if i == len(s) {
		return
	}
	reverse(s, i+1, res)
	*res = append(*res, s[i])
}
```

[swap-nodes-in-pairs](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

> 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
> **你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

```go
func swapPairs(head *ListNode) *ListNode {
    // 思路：将链表翻转转化为一个子问题，然后通过递归方式依次解决
    // 先翻转两个，然后将后面的节点继续这样翻转，然后将这些翻转后的节点连接起来
    return helper(head)
}
func helper(head *ListNode)*ListNode{
    if head==nil||head.Next==nil{
        return head
    }
    // 保存下一阶段的头指针
    nextHead:=head.Next.Next
    // 翻转当前阶段指针
    next:=head.Next
    next.Next=head
    head.Next=helper(nextHead)
    return next
}
```

[unique-binary-search-trees-ii](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

> 给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。

```go
func generateTrees(n int) []*TreeNode {
    if n==0{
        return nil
    }
    return generate(1,n)

}
func generate(start,end int)[]*TreeNode{
    if start>end{
        return []*TreeNode{nil}
    }
    ans:=make([]*TreeNode,0)
    for i:=start;i<=end;i++{
        // 递归生成所有左右子树
        lefts:=generate(start,i-1)
        rights:=generate(i+1,end)
        // 拼接左右子树后返回
        for j:=0;j<len(lefts);j++{
            for k:=0;k<len(rights);k++{
                root:=&TreeNode{Val:i}
                root.Left=lefts[j]
                root.Right=rights[k]
                ans=append(ans,root)
            }
        }
    }
    return ans
}
```

## 递归+备忘录

[fibonacci-number](https://leetcode-cn.com/problems/fibonacci-number/)

> 斐波那契数，通常用  F(n) 表示，形成的序列称为斐波那契数列。该数列由  0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
> F(0) = 0,   F(1) = 1
> F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
> 给定  N，计算  F(N)。

```go
func fib(N int) int {
    return dfs(N)
}
var m map[int]int=make(map[int]int)
func dfs(n int)int{
    if n < 2{
        return n
    }
    // 读取缓存
    if m[n]!=0{
        return m[n]
    }
    ans:=dfs(n-2)+dfs(n-1)
    // 缓存已经计算过的值
    m[n]=ans
    return ans
}
```

## 练习

- [ ] [reverse-string](https://leetcode-cn.com/problems/reverse-string/)
- [ ] [swap-nodes-in-pairs](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
- [ ] [unique-binary-search-trees-ii](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)
- [ ] [fibonacci-number](https://leetcode-cn.com/problems/fibonacci-number/)
