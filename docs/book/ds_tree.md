# 概述
顺序存储在查找上方便，但是在增删上不方便。而链式存储在查找方面不方便但是在增删上方便。

而树结构综合了顺序存储和链式存储的，在查找，更新，插入，删除上都可以以 $O(logn)$ 实现。

从集合论的角度来定义树： n 个节点的有限集合，n = 0 时为空树，n > 0 时非空树并且需要满足两个条件：有且只有一个称为根的节点，出根节点以外的 m 个互不相交的有限集，每一个子集本身又是一颗树，称为子树。

以上是一个递归定义，用树的定义来套树。

关于树的术语：
* 节点：节点包含了节点中存储的数据和指向其他子树的信息。
* 节点的度：节点所拥有子树的个数。
* 树的度：树种节点的最大度数。
* 终端节点：度为零的节点，称为叶子，也就是叶子节点。
* 分支节点：度大于 0 的节点，除了叶子都是分支节点。
* 内部节点：除了根节点和叶子节点以外都是内部节点。
* 节点的层次：从根节点到改节点的层数。
* 树的深度：所有节点种最大的层数。
* 路径：树中两个节点之间经过的节点序列。
* 路径长度：路径中所含的边数。
* 双亲，孩子：节点的子树的根称为该节点的孩子，反之该节点为其孩子的双亲。
* 兄弟：双亲相同的节点。
* 堂兄弟：双亲是兄弟的节点互称堂兄弟。
* 祖先：从该节点到树根所经过的所有节点称为该节点的祖先。
* 子孙：节点的子树中的所有节点都称为该节点的子孙。
* 有序树：节点的各子树从左至右有序，不能互换位置。
* 无序树：节点各子树可互换位置。
* 森林：由零个或多个不相交的树组成的集合。
## 树的存储结构
从存储方式上来看同样有两种类型，顺序存储和链式存储。

其中顺序存储中存在如下存储方式：
1. 双亲表示法。
2. 孩子表示法
3. 双亲孩子表示法。

链式存储：
1. 孩子链表表示法
2. 孩子兄弟表示法
## 树，森林和二叉树的转换

# 二叉树
定义：有且只有一个根节点，出根节点以外的其余节点分成两个互不相交的子集，而子集本身也是二叉树。

## 性质
1. 第 i 层至多有 $2^{i-1}$ 个节点。
2. 高度为 k 的二叉树之多有 $2^k - 1$ 个节点。
3. 度为零的节点 = 度为二的节点 + 1

特殊二叉树：
* 满二叉树：深度为 k 的二叉树，节点树达到了 $2^k - 1$ ，则是满二叉树。
* 完全二叉树：除了最后一层外，上面的是一颗满二叉树，而最后一层则是从左到右出现的叶子节点。 
## 存储结构
## 遍历二叉树

# 线索二叉树

# 数和森林的遍历

# 应用


# 题单

## 遍历

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [❎Leetcode-144](alg/Leetcode-144.md) |   💗   |  cpp  |
| [❎Leetcode-145](alg/Leetcode-145.md) |   💗   |  cpp  |
|  [❎Leetcode-94](alg/Leetcode-94.md)  |   💗   |  cpp  |
| [❎Leetcode-637](alg/Leetcode-637.md) |   💗   |  cpp  |
| [❎Leetcode-513](alg/Leetcode-513.md) |   💗   |  cpp  |
| [❎Leetcode-100](alg/Leetcode-100.md) |   💗   |  cpp  |
| [❎Leetcode-101](alg/Leetcode-101.md) |   💗   |  cpp  |
| [❎Leetcode-543](alg/Leetcode-543.md) |   💗   |  cpp  |
| [❎Leetcode-226](alg/Leetcode-226.md) |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |
| [❎Leetcode-112](alg/Leetcode-112.md) |   💗   |  cpp  |
| [❎Leetcode-637](alg/Leetcode-637.md) |   💗   |  cpp  |
| [❎Leetcode-513](alg/Leetcode-513.md) |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |



# 递归

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [Leetcode-104](alg/Leetcode-104.md) |   💗   |  cpp  |
| [Leetcode-110](alg/Leetcode-110.md) |   💗   |  cpp  |
| [Leetcode-543](alg/Leetcode-543.md) |   💗   |  cpp  |
| [Leetcode-226](alg/Leetcode-226.md) |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |
| [❎Leetcode-112](alg/Leetcode-112.md) |   💗   |  cpp  |
| [❎Leetcode-437](alg/Leetcode-437.md) |   💗   |  cpp  |
| [❎Leetcode-101](alg/Leetcode-101.md) |   💗   |  cpp  |
| [❎Leetcode-111](alg/Leetcode-111.md) |   💗   |  cpp  |
| [❎Leetcode-404](alg/Leetcode-404.md) |   💗   |  cpp  |
| [❎Leetcode-687](alg/Leetcode-687.md) |   💗   |  cpp  |
| [❎Leetcode-337](alg/Leetcode-337.md) |   💗   |  cpp  |
| [❎Leetcode-671](alg/Leetcode-671.md) |   💗   |  cpp  |

# BST

二叉查找树（BST）：根节点大于等于左子树所有节点，小于等于右子树所有节点。

二叉查找树中序遍历有序。

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [❎Leetcode-667](alg/Leetcode-669.md) |   💗   |  cpp  |
| [❎Leetcode-230](alg/Leetcode-230.md) |   💗   |  cpp  |
| [❎Leetcode-538](alg/Leetcode-538.md) |   💗   |  cpp  |
| [❎Leetcode-235](alg/Leetcode-235.md) |   💗   |  cpp  |
| [❎Leetcode-236](alg/Leetcode-236.md) |   💗   |  cpp  |
| [❎Leetcode-108](alg/Leetcode-108.md) |   💗   |  cpp  |
| [❎Leetcode-109](alg/Leetcode-109.md) |   💗   |  cpp  |
| [❎Leetcode-653](alg/Leetcode-653.md) |   💗   |  cpp  |
| [❎Leetcode-530](alg/Leetcode-530.md) |   💗   |  cpp  |
| [❎Leetcode-501](alg/Leetcode-501.md) |   💗   |  cpp  |
| [❎Leetcode-669](alg/Leetcode-669.md) |   💗   |  cpp  |


# Trie

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [❎Leetcode-208](alg/Leetcode-208.md) |   💗   |  cpp  |
| [❎Leetcode-677](alg/Leetcode-677.md) |   💗   |  cpp  |



#### maximum-depth-of-binary-tree

[maximum-depth-of-binary-tree](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

> 给定一个二叉树，找出其最大深度。

思路：分治法

#### balanced-binary-tree

[balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)

> 给定一个二叉树，判断它是否是高度平衡的二叉树。

思路：分治法，左边平衡 && 右边平衡 && 左右两边高度 <= 1，
因为需要返回是否平衡及高度，要么返回两个数据，要么合并两个数据，
所以用-1 表示不平衡，>0 表示树高度（二义性：一个变量有两种含义）。


#### binary-tree-maximum-path-sum

[binary-tree-maximum-path-sum](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

> 给定一个**非空**二叉树，返回其最大路径和。

思路：分治法，分为三种情况：左子树最大路径和最大，右子树最大路径和最大，左右子树最大加根节点最大，需要保存两个变量：一个保存子树最大路径和，一个保存左右加根节点和，然后比较这个两个变量选择最大值即可

#### lowest-common-ancestor-of-a-binary-tree

[lowest-common-ancestor-of-a-binary-tree](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

> 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

思路：分治法，有左子树的公共祖先或者有右子树的公共祖先，就返回子树的祖先，否则返回根节点


### BFS 层次应用

#### binary-tree-level-order-traversal

[binary-tree-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)


> 给你一个二叉树，请你返回其按  **层序遍历**  得到的节点值。 （即逐层地，从左到右访问所有节点）

思路：用一个队列记录一层的元素，然后扫描这一层元素添加下一层元素到队列（一个数进去出来一次，所以复杂度 O(logN)）


#### binary-tree-level-order-traversal-ii

[binary-tree-level-order-traversal-ii](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

> 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

思路：在层级遍历的基础上，翻转一下结果即可


#### binary-tree-zigzag-level-order-traversal

[binary-tree-zigzag-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

> 给定一个二叉树，返回其节点值的锯齿形层次遍历。Z 字形遍历



### 二叉搜索树应用

#### validate-binary-search-tree

[validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

思路 1：中序遍历，检查结果列表是否已经有序

思路 2：分治法，判断左 MAX < 根 < 右 MIN

#### insert-into-a-binary-search-tree

[insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

> 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。

思路：找到最后一个叶子节点满足插入条件即可


## 总结

- 掌握二叉树递归与非递归遍历
- 理解 DFS 前序遍历与分治法
- 理解 BFS 层次遍历

## 练习

- [ ] [maximum-depth-of-binary-tree](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [ ] [balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)
- [ ] [binary-tree-maximum-path-sum](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)
- [ ] [lowest-common-ancestor-of-a-binary-tree](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- [ ] [binary-tree-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
- [ ] [binary-tree-level-order-traversal-ii](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)
- [ ] [binary-tree-zigzag-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)
- [ ] [validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [ ] [insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)



# 二叉搜索树

## 定义

- 每个节点中的值必须大于（或等于）存储在其左侧子树中的任何值。
- 每个节点中的值必须小于（或等于）存储在其右子树中的任何值。

## 应用

[validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> 验证二叉搜索树

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isValidBST(root *TreeNode) bool {
    return dfs(root).valid
}
type ResultType struct{
    max int
    min int
    valid bool
}
func dfs(root *TreeNode)(result ResultType){
    if root==nil{
        result.max=-1<<63
        result.min=1<<63-1
        result.valid=true
        return
    }

    left:=dfs(root.Left)
    right:=dfs(root.Right)

    // 1、满足左边最大值<root<右边最小值 && 左右两边valid
    if root.Val>left.max && root.Val<right.min && left.valid && right.valid {
        result.valid=true
    }
    // 2、更新当前节点的最大最小值
    result.max=Max(Max(left.max,right.max),root.Val)
    result.min=Min(Min(left.min,right.min),root.Val)
    return
}
func Max(a,b int)int{
    if a>b{
        return a
    }
    return b
}
func Min(a,b int)int{
    if a>b{
        return b
    }
    return a
}

```

[insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

> 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 保证原始二叉搜索树中不存在新值。

```go
func insertIntoBST(root *TreeNode, val int) *TreeNode {
    if root==nil{
        return &TreeNode{Val:val}
    }
    if root.Val<val{
        root.Right=insertIntoBST(root.Right,val)
    }else{
        root.Left=insertIntoBST(root.Left,val)
    }
    return root
}
```

[delete-node-in-a-bst](https://leetcode-cn.com/problems/delete-node-in-a-bst/)

> 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的  key  对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func deleteNode(root *TreeNode, key int) *TreeNode {
    // 删除节点分为三种情况：
    // 1、只有左节点 替换为右
    // 2、只有右节点 替换为左
    // 3、有左右子节点 左子节点连接到右边最左节点即可
    if root ==nil{
        return root
    }
    if root.Val<key{
        root.Right=deleteNode(root.Right,key)
    }else if root.Val>key{
        root.Left=deleteNode(root.Left,key)
    }else if root.Val==key{
        if root.Left==nil{
            return root.Right
        }else if root.Right==nil{
            return root.Left
        }else{
            cur:=root.Right
            // 一直向左找到最后一个左节点即可
            for cur.Left!=nil{
                cur=cur.Left
            }
            cur.Left=root.Left
            return root.Right
        }
    }
    return root
}
```

[balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)

> 给定一个二叉树，判断它是否是高度平衡的二叉树。

```go
type ResultType struct{
    height int
    valid bool
}
func isBalanced(root *TreeNode) bool {
    return dfs(root).valid
}
func dfs(root *TreeNode)(result ResultType){
    if root==nil{
        result.valid=true
        result.height=0
        return
    }
    left:=dfs(root.Left)
    right:=dfs(root.Right)
    // 满足所有特点：二叉搜索树&&平衡
    if left.valid&&right.valid&&abs(left.height,right.height)<=1{
        result.valid=true
    }
    result.height=Max(left.height,right.height)+1
    return
}
func abs(a,b int)int{
    if a>b{
        return a-b
    }
    return b-a
}
func Max(a,b int)int{
    if a>b{
        return a
    }
    return b
}

```

## 练习

- [ ] [validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [ ] [insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)
- [ ] [delete-node-in-a-bst](https://leetcode-cn.com/problems/delete-node-in-a-bst/)
- [ ] [balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)
