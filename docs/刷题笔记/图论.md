# 概述
基础概念很重要，下面是一些基础性的知识总结。

图可以根据是否有向和带权分成以下四种。

* 无向图
* 有向图
* 加权无向图
* 加权有向图

## 无向图

> 无向图定义： 一组顶点和一组可以将顶点连接在一起边组成。
 
特殊的图： 自环，平行边。

自环： 就是自己连自己，像贪吃蛇一样，一个点形成了环。

平行边： 同一对顶点上有多条边相连。就像家和学校两个点之间存在很多条路可以选择，而路与路之间称为平行边。

## 术语表
这一术语很多都是一个套一个，前面几个基础性的弄明白了，后面的概念就会理解的非常快！

* 相邻：两个顶点和同一条边相连称为相邻。同时也称这条边**依附**与这两个顶点。
* 顶点的度：与该顶点相邻边的个数。
* 子图：一幅图中所有边的子集以及这些边相关的点所组成的图。
* 路径：边顺序连接起来的一系列的顶点。
* 简单路径：没有重复顶点的路径。
* 环：至少含有一条起点和终点相同的路径。
* 简单环：不含有重复顶点和边的环。
* 连通图：任意一个顶点都存在一条路径到达另一个任意顶点。
* 极大连通子图：非连通图是由若干个连通子图组成，这些连通子图称为极大连通子图。
* 连通分量：极大连通子图的个数称为非连通图的连通分量。
* 树：无环**连通图**。
* 森林：互不相连的**树**组成**森林**。
* 生成树：**连通图**的**子图**，含有图中的所有**顶点**并且还得是一棵**树**。
* 生成森林：**生成树**的集合，也就是该图的所有**连通子图**的**生成树**的集合。
* 稀疏图：被连接的顶点对很少，也就是边比较少的图。
* 稠密图：大部分的顶点对都有边相连，只有少部分的顶点对之间没有边连接。
* 二分图：顶点集可以分割成两个互不相交的子集。

## 图的表示方法
* 邻接矩阵，邻接表数组，边的数组

# 283. 移动零

[传送门](https://leetcode-cn.com/problems/move-zeroes/)

## 题意

- 将零全部移动到数组的末尾。
- 移动零的同时保证非零数字的相对位置不变。

## 分析
- 利用选择排序的思想会打乱非零数字的相对位置。

- 先将非零元素挑拣出来，发现一个就存起来，将零元素抹掉，而剩下的就是零元素，直接填充即可。

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int index = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[index++] = nums[i];
            }
        }
        while (index < nums.length) {
            nums[index++] = 0;
        }
    }
}
```

```java
class Solution {
    public void moveZeroes(int[] nums) {
        for(int i = 0 , j = 0 ; i < nums.length; i++){
            if(nums[i] != 0) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                j++;
            }
        }
    }
}
```

# 566. 重塑矩阵

[传送门](https://leetcode-cn.com/problems/reshape-the-matrix/description/)

## 题意

- 将矩阵中的数字按照原来的顺序重新填入一个新的矩阵中，新旧两个矩阵的行列值乘积相等才可以填充。

```java
class Solution {
    public int[][] matrixReshape(int[][] nums, int r, int c) {
        int m = nums.length;
        int n = nums[0].length;
        int[][]  newMatrix = new int[r][c];
        if ( m * n != r * c ) {
            return nums;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                q.add(nums[i][j]);
            }
        }
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                newMatrix[i][j] = q.remove();
            }
        }
        return newMatrix;
    }
}
```

1. 时间复杂度：O($n^2$) 两个 for 循环 m * n
2. 空间复杂度：O($n^2$) 队列的大小为 m * n 

- 原地填充，计算对应填充位置的下标，不需要再建队列。
二维数组的本质还是一位数组，在存储时还是一行数字，每行数字个数为 c ，我们可以以 c 为单位将这一行数字截断开来。
分别计算下标索引，index/c 用来计算行数， index%c 用来计算列数。归纳一下也可以发现这个规律。
需要新建立一个数组，在原素组上操作存在将原来数据抹除的可能。
重塑并没有改变数组元素的相对位置，只是建立了新的索引。

```java
class Solution {
    public int[][] matrixReshape(int[][] nums, int r, int c) {
        int m = nums.length;
        int n = nums[0].length;
        int index = 0;
        int[][]  newMatrix = new int[r][c];
        if ( m * n != r * c || m == 0) {
            return nums;
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                newMatrix[index/c][index%c] = nums[i][j];
                index++;
            }
        }
        return newMatrix;
    }
}
```

# 485. 最大连续1的个数
[传送门](https://leetcode-cn.com/problems/max-consecutive-ones/)

## 题意
计算连续的 1 的长度。
## 思考
- 将所有 1 的长度都统计，取最大值。
```java
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int max = 0;
        int cnt = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 1) {
                cnt++;
            }else{
                cnt = 0;
            }
            max = Math.max(max,cnt);
        }
        return max;
    }
}
```

# 240. 搜索二维矩阵 II
[传送门](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)
## 思路
- 直接搜索
- 从左下角或者右上角出发，如果从左上角或右下角出发的话最坏的情况可能会全局都搜一遍，而右上角出发搜最坏会搜一半。
```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        int m = matrix.length, n = matrix[0].length;
        int row = 0, col = n - 1;
        while (row < m && col >= 0) {
            if (target == matrix[row][col]) return true;
            else if (target < matrix[row][col]) col--;
            else row++;
        }
        return false;
    }
}
```
# 378. 有序矩阵中第K小的元素
[传送门](https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/)
## 题意
数组类型和上一题类似，只是变成了搜索第 k 小的元素。
## 思考
- 优先队列，内部建堆


# 695. 岛屿的最大面积
[戳我](https://leetcode-cn.com/problems/max-area-of-island/)
## 思考
从网格的每一个点都进行一次 DFS，每次搜索时遇到零就不再向栈帧中压栈，当无法再压栈时进行回溯。
从所有的结果中选出最大值即为最大面积。
## code
```java
class Solution {
    private int m ; 
    private int n ;
    private int [][]direction = { {-1 , 0}, {1 , 0}, {0 , 1}, {0 , -1}};
    public int maxAreaOfIsland(int[][] grid) {
        m = grid.length;
        n = grid[0].length;
        int maxarea = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                maxarea = Math.max(maxarea,dfs(grid, i,j));
            }
        }
        return maxarea;
    }
    public int dfs(int[][]grid, int i, int j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0) {
            return 0;
        }
        grid[i][j] = 0;
        int area = 1;
        for (int [] d:direction) {
            area += dfs(grid,i + d[0],j + d[1]);
        }
        return area;
    }
}
```



# 547. 朋友圈

[戳我](https://leetcode-cn.com/problems/friend-circles/)
## 思考
针对每一个下标都进行深搜，一旦符合题意就压栈，然后设置标记表示扫描过，然后继续压栈，栈空计数。
```java
class Solution {
    private int n ;
    public int findCircleNum(int[][] M) {
        int[] visited = new int[M.length];
        int cnt = 0;
        for (int i = 0; i < M.length; i++) {
            if (visited[i] == 0) {
                dfs(M , visited ,i);
                cnt ++;
            }
        }
        return cnt;
    }
    public void dfs(int[][] M , int[] visited , int i) {
        visited[i] = 1;
        for (int j = 0; j < M.length; j++) {
            if (M[i][j] == 1 && visited[j] == 0) {
                visited[j] = 1;
                dfs(M , visited , j);
            }
        }
    }
}
```

## 1. 模板题Ⅰ

[102. 二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

### 思考
直接套模板，熟悉算法框架。

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            List<Integer> list = new ArrayList<>();
            int size = queue.size();
            while (size-- > 0) {
                TreeNode node = queue.poll();
                list.add(node.val);
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            result.add(list);
        }
        return result;
    }
}
```

## 2. 模板题Ⅱ

[107. 二叉树的层次遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)
### 思考
在第一题的基础上，将列表反转即可！

```java
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        List<List<Integer>> result1 = new ArrayList<>();
        if(root == null) return result1;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> result2 = new ArrayList<>();
            while (size -- > 0) {
                TreeNode node = queue.poll();
                result2.add(node.val);
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            result1.add(result2);
        }
        Collections.reverse(result1);
        return result1;
    }
}
```

## 3. 模板Ⅲ
[103. 二叉树的锯齿形层次遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

### 思考
和前两题的结合，奇偶交替反转即可

```java
class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        int i = 0;
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> list = new ArrayList<>();
            i ++;
            while (size -- > 0) {
                TreeNode node = queue.poll();
                list.add(node.val);
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            if (i%2 != 0) {
                result.add(list);
            }else{
                Collections.reverse(list);
                result.add(list);
            }
        }
        return result;
    }
}
```

## 4. 每一层最后的值

[199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)

### 思考
只保留每一层最后的值即可，修改细节即可。

```java
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i == size - 1) result.add(node.val);
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
        }
        return result;
    }
}
```

## 5. 求树的层数
[559. N叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/)
### 思考
上面题目的变形，修改细节即可实现。

```java
class Solution {
    public int maxDepth(Node root) {
        Queue<Node> queue = new LinkedList<>();
        if (root == null) return 0;
        int high = 0;
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            high++;
            while ( size-- > 0 ) {
                Node node = queue.poll();
                for (Node a : node.children) {
                    queue.add(a);
                }
            }
        }
        return high;
    }
}
```

## 6. 模板题变形
[429. N叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

### 思考
注意遍历时的条件！

```java
class Solution {
    public List<List<Integer>> levelOrder(Node root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<Node> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> list = new ArrayList<>();
            while (size -- > 0) {
             Node node = queue.poll();
             list.add(node.val);
             if (node != null ) {
                 for (Node a: node.children) {
                     queue.add(a);
                 }
             }
            }
            result.add(list);
        }
        return result;
    }
}
```



