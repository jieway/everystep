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
[Leetcode](https://leetcode-cn.com/problems/binary-tree-inorder-traver
sal/)

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
[Leetcode](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/descript
ion/)

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
