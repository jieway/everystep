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



---
title: 图论
date: 2019-08-27 18:08:44
tags: 
- C++
- 图论

top_img: https://image.135editor.com/files/users/531/5317107/201907/Ec98WQ4W_hAwF.jpg


categories: 
- ACM
---


# 并查集 
# 并查集例题
## P3367 【模板】并查集

如题，现在有一个并查集，你需要完成合并和查询操作。

**输入格式**
第一行包含两个整数N、M，表示共有N个元素和M个操作。

接下来M行，每行包含三个整数Zi、Xi、Yi

当Zi=1时，将Xi与Yi所在的集合合并

当Zi=2时，输出Xi与Yi是否在同一集合内，是的话输出Y；否则话输出N

**输出格式**
如上，对于每一个Zi=2的操作，都有一行输出，每行包含一个大写字母，为Y或者N

**输入输出样例**
**输入 #1 复制**
4 7
2 1 2
1 1 2
2 1 2
1 3 4
2 1 4
1 2 3
2 1 4
**输出 #1 复制**
N
Y
N
Y
**说明/提示**
时空限制：1000ms,128M

数据规模：

对于30%的数据，N<=10，M<=20；

对于70%的数据，N<=100，M<=1000；

对于100%的数据，N<=10000，M<=200000。


```c++
#include<iostream>
using namespace std;
int f[10010]; 
int n,m,a,b,c,i,j;
int find(int x){
	if(f[x] == x) return x;
	return f[x]=find(f[x]);
}
int main(){
	cin>>n>>m;
	for(i=1;i<=n;i++){//初始化使得每一个元素的大哥都是本身 
		f[i]=i;
	}
	for(i=1;i<=m;i++){
		cin>>a>>b>>c;
		if(a==1){
			f[find(b)] = find(c);//c的大哥赋给b的大哥实现了集合合并 
		}else{
			if(find(b)==find(c)){//判断两个元素的祖先是否一致 
				cout<<"Y"<<endl;
			}else{
				cout<<"N"<<endl;
			}
		}
	}
	return 0;
} 
```


## XYNU1382: 畅通工程1（并查集）

时间限制: 1 Sec  内存限制: 32 MB
提交: 30  解决: 20
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
某省调查城镇交通状况，得到现有城镇道路统计表，表中列出了每条道路直接连通的城镇。省政府“畅通工程”的目标是使全省任何两个城镇间都可以实现交通（但不一定有直接的道路相连，只要互相间接通过道路可达即可）。问最少还需要建设多少条道路？

**输入**
测试输入包含若干测试用例。每个测试用例的第1行给出两个正整数，分别是城镇数目N ( < 1000 )和道路数目M；随后的M行对应M条道路，每行给出一对正整数，分别是该条道路直接连通的两个城镇的编号。为简单起见，城镇从1到N编号。 
    注意:两个城市之间可以有多条道路相通,也就是说
    3 3
    1 2
    1 2
    2 1
    这种输入也是合法的
    当N为0时，输入结束，该用例不被处理。

**输出**
对每个测试用例，在1行里输出最少还需要建设的道路数目。

**样例输入**
 5 3
1 2
3 2
4 5
0
**样例输出**
1

```c++
#include<iostream>
using namespace std;
int n,m,a[1010],sum,p,q;
int find(int x){
	if(a[x]==x)return x;
	return a[x] = find(a[x]);
}
int main(){
	while(cin>>n>>m&&n!=0){
		for(int i=1;i<=n;i++){
			a[i] = i;
		}
		sum = n-1;//道路的最大个数为城镇数减一 
		for(int i=1;i<=m;i++){
			cin>>p>>q;
			if(find(p)!=find(q)){
				a[find(p)] = find(q);
				sum--;
			}
		}
		cout<<sum<<endl;
	}
	return 0;
}
```

```c++
#include<iostream>
using namespace std;
int pre[1010];
int find(int x){
	if(pre[x]==x) return x;
	return pre[x] = find(pre[x]);
}
int main(){
	int n,m,a,b;
	while(cin>>n>>m&&n!=0){
	for(int i=1;i<=n;i++){
		pre[i] = i;
	}
	int ans = 0;
	for(int i=1;i<=m;i++){
		cin>>a>>b;
		if(find(a)!=find(b)){
			pre[find(b)] = find(a);
		}
	}
	for(int i=1;i<=n;i++){
		if(pre[i]==i){
			ans++;
		}
	}
	cout<<ans-1<<endl;		
	}
	return 0;
} 
```
## HDU1325Is It A Tree?（并查集）

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 34031    Accepted Submission(s): 7763


**Problem Description**
A tree is a well-known data structure that is either empty (null, void, nothing) or is a set of one or more nodes connected by directed edges between nodes satisfying the following properties. 
There is exactly one node, called the root, to which no directed edges point. 

Every node except the root has exactly one edge pointing to it. 

There is a unique sequence of directed edges from the root to each node. 

For example, consider the illustrations below, in which nodes are represented by circles and edges are represented by lines with arrowheads. The first two of these are trees, but the last is not.




In this problem you will be given several descriptions of collections of nodes connected by directed edges. For each of these you are to determine if the collection satisfies the definition of a tree or not. 

 

**Input**
The input will consist of a sequence of descriptions (test cases) followed by a pair of negative integers. Each test case will consist of a sequence of edge descriptions followed by a pair of zeroes Each edge description will consist of a pair of integers; the first integer identifies the node from which the edge begins, and the second integer identifies the node to which the edge is directed. Node numbers will always be greater than zero. 
 

**Output**
For each test case display the line ``Case k is a tree." or the line ``Case k is not a tree.", where k corresponds to the test case number (they are sequentially numbered starting with 1). 
 

**Sample Input**
6 8 5 3 5 2 6 4
5 6 0 0
8 1 7 3 6 2 8 9 7 5
7 4 7 8 7 6 0 0
3 8 6 8 6 4
5 3 5 6 5 2 0 0
-1 -1
 

**Sample Output**
Case 1 is a tree.
Case 2 is a tree.
Case 3 is not a tree.
 

```c++
#include<iostream>
#include<cstring>
#define N 11000
using namespace std;
int pre[N],vis[N],flag,maxn;
void Init(){//数组初始化 
	for(int i=0;i<N;i++)
		pre[i] = i;
	memset(vis,0,sizeof(vis));
	flag = 1;
	maxn = 0; 
}
int Find(int x){//查找老大 
	if(pre[x] == x) return x;
	return Find(pre[x]);
}
void Merge(int u,int v){//合并 
	int t1 = Find(u);
	int t2 = Find(v);
	if(v!=t2||t1==t2)flag = 0;//排除了一个节点被两条线指向的情况 
	if(t1!=t2) pre[t2] = t1;//分支合并 
}
int main(){
	int a,b,kase=0;//情况数量要初始化 
	Init();
	while(cin>>a>>b&&a>=0&&b>=0){ 
		if(a==0&&b==0){	
		int tp=0;
		for(int i=1;i<=maxn;i++)
			if(vis[i]&&i==pre[i])tp++;
			if(tp<=1&&flag){
				printf("Case %d is a tree.\n",++kase);
			}else{
				printf("Case %d is not a tree.\n",++kase);
			}
		Init();
		continue;
		}
		maxn = max(maxn,max(a,b));
		vis[a] = vis[b] = 1;
		Merge(a,b);
	}
	return 0;
}
```
## HDU1213How Many Tables（并查集）

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 56530    Accepted Submission(s): 28176


**Problem Description**
Today is Ignatius' birthday. He invites a lot of friends. Now it's dinner time. Ignatius wants to know how many tables he needs at least. You have to notice that not all the friends know each other, and all the friends do not want to stay with strangers.

One important rule for this problem is that if I tell you A knows B, and B knows C, that means A, B, C know each other, so they can stay in one table.

For example: If I tell you A knows B, B knows C, and D knows E, so A, B, C can stay in one table, and D, E have to stay in the other one. So Ignatius needs 2 tables at least.
 

**Input**
The input starts with an integer T(1<=T<=25) which indicate the number of test cases. Then T test cases follow. Each test case starts with two integers N and M(1<=N,M<=1000). N indicates the number of friends, the friends are marked from 1 to N. Then M lines follow. Each line consists of two integers A and B(A!=B), that means friend A and friend B know each other. There will be a blank line between two cases.
 

**Output**
For each test case, just output how many tables Ignatius needs at least. Do NOT print any blanks.
 

**Sample Input**
2
5 3
1 2
2 3
4 5

5 1
2 5

```c++
#include<iostream>
using namespace std;
int n,m,a[1010],sum,p,q,t;
int find(int x){
	if(a[x]==x)return x;
	return a[x] = find(a[x]);
}
int main(){
	cin>>t;
	while(t--){
		cin>>n>>m;
		for(int i=1;i<=n;i++){
			a[i] = i;
		}
		sum = n;//桌子的最大数目和朋友的个数相等 
		for(int i=1;i<=m;i++){
			cin>>p>>q;
			if(find(p)!=find(q)){
				a[find(p)] = find(q);
				sum--;
			}
		}
		cout<<sum<<endl;
	}
	return 0;
}
```
## XYNU1825: 一笔画问题（并查集/连通图）

时间限制: 3 Sec  内存限制: 64 MB
提交: 115  解决: 66
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
zyc从小就比较喜欢玩一些小游戏，其中就包括画一笔画，他想请你帮他写一个程序，判断一个图是否能够用一笔画下来。

规定，所有的边都只能画一次，不能重复画。

**输入**
第一行只有一个正整数N(N<=10)表示测试数据的组数。
每组测试数据的第一行有两个正整数P,Q(P<=1000,Q<=2000)，分别表示这个画中有多少个顶点和多少条连线。（点的编号从1到P）
随后的Q行，每行有两个正整数A,B(0<A,B<P)，表示编号为A和B的两点之间有连线。
**输出**
如果存在符合条件的连线，则输出"Yes", 如果不存在符合条件的连线，输出"No"。
**样例输入**
 2
4 3
1 2
1 3
1 4
4 5
1 2
2 3
1 3
1 4
3 4
**样例输出**
No
Yes
**一笔画下来需要满足两个条件：**

 1. 都在一个集合中。
 2. 奇点个数为零或二。奇点指这一点所连线段的个数，如果能一笔画下来，要么是环（奇点为零），要么起点和终点只有一对（奇点为二）。

```c++
#include<iostream>
#include<cstring>
using namespace std;
int pre[2010];
int k[2010];
int find(int x){
	if(pre[x] == x) return x;
	return pre[x] = find(pre[x]);
}
int main(){
	int n,p,q,a,b;
	cin>>n;
	while(n--){
		cin>>p>>q;
		for(int i=1;i<=p;i++){//初始化，使节点指向其本身 
			pre[i] = i;
		}
		memset(k,0,sizeof(k));
		int ans =0,sum= 0;
		for(int i=1;i<=q;i++){
			cin>>a>>b;
			k[a]++;//计算每一个节点的度数 
			k[b]++; 
			pre[find(a)] = find(b);//分支合并 
		}
		for(int i=1;i<=p;i++){
			if(pre[i] == i){
				ans++;//计算集合的个数 
			}
			if(k[i]%2==1){
				sum++;//检查奇点个数，若是则自增 
			}
		}
		if((ans==1)&&(sum==0||sum==2)){//奇点为0或2则说明可以连通，反之不可以 
			cout<<"Yes"<<endl;
		}else{
			cout<<"No"<<endl;
		}
	}
	return 0;
}
```

# 最小生成树
# 最小生成树例题
## HDU1102Constructing Roads（kruskal/prim）

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 34224    Accepted Submission(s): 12739


**Problem Description**
There are N villages, which are numbered from 1 to N, and you should build some roads such that every two villages can connect to each other. We say two village A and B are connected, if and only if there is a road between A and B, or there exists a village C such that there is a road between A and C, and C and B are connected. 

We know that there are already some roads between some villages and your job is the build some roads such that all the villages are connect and the length of all the roads built is minimum.
 

**Input**
The first line is an integer N (3 <= N <= 100), which is the number of villages. Then come N lines, the i-th of which contains N integers, and the j-th of these N integers is the distance (the distance should be an integer within [1, 1000]) between village i and village j.

Then there is an integer Q (0 <= Q <= N * (N + 1) / 2). Then come Q lines, each line contains two integers a and b (1 <= a < b <= N), which means the road between village a and village b has been built.
 

**Output**
You should output a line contains an integer, which is the length of all the roads to be built such that all the villages are connected, and this value is minimum. 
 

**Sample Input**
3
0 990 692
990 0 179
692 179 0
1
1 2
 

**Sample Output**
179
**kruskal**
```c++
#include<iostream>
#include<algorithm> 
using namespace std;
int pre[100000];//储存父节点 
struct node{
	int x,y,len;
}a[10000];
int cmp(node a,node b){//按照路程升序 
	return a.len < b.len ; 
}
int find(int x){//查找根节点 
	if(pre[x]==x) return x;
	return pre[x] = find(pre[x]);
}
int main(){
	int n,m,b,c,k;
	while(cin>>n){//村庄个数 
		k = 0;
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++){
			cin>> a[k].len ;//村庄长度 
			a[k].x = i; 
			a[k].y = j;
			k++;			
			}
		}
		for(int i=0;i<n;i++){
			pre[i] = i;
		}
		sort(a,a+k,cmp);
		cin>>m;
		for(int i=0;i<m;i++){//并查集 
			cin>>b>>c;
			if(find(b-1)!=find(c-1)){//将两块区域联系起来 
				pre[find(b-1)] = find(c-1);
			}
		}
		int sum = 0;
		for(int i=0;i<k;i++){
			if(a[i].len > 0){ 
				if(find(a[i].x)!=find(a[i].y)){//判断是否是同一个父节点，如果不是，需要修路 
					sum += a[i].len;//已经排好序了，按照路程最短的开始修 
					pre[find(a[i].x)] = find(a[i].y);//修好路后合并集合 
				}
			}
		}
		cout<<sum<<endl;//统计所修的最短路程 
	}
} 
```
**prim**
```c++
#include<iostream>
#include<cstring>
#define max_size 100
#define inf 0x3f3f3f3f
using namespace std;
int map[max_size][max_size];
int dis[max_size];
int N,q,a,b;
using namespace std;

//int map[max_size][max_size];    //图的邻接矩阵
/* 邻接矩阵在使用之前一定要是初始化，确定当i和j不连通时map[i][j]的值 */ 

/* prim算法核心代码，传递参数 n 是节点个数，返回值最小生成树的权值*/
int prim( int n ) {
	int dis[max_size], sum = 0;    //dis代表每个节点与当前已经生成的树的距离 
	memset( dis, 0x3f, sizeof( dis ) );    //这句话等同于下面注释掉的一段代码
	/*
	for( int i = 0; i < max_size; i ++ ) {
		dis[i] = inf;
	}
	*/
	int minn = 0, next = 0;
	/* 思考 index == -1 时代表了什么？ */ 
	for( int index = 0; index != -1; index = next ) {
		sum += minn;
		minn = inf;
		next = -1;
		dis[index] = -1;    //代表节点 index 已经加入到了当前生成的最小树中 
		for( int i = 0; i < n; i ++ ) {
			if( map[index][i] < dis[i] ) {
				dis[i] = map[index][i];    //更新节点i到当前生成的最小树的距离 
			}
			if( minn > dis[i] && dis[i] != -1 ) {    //选定下一次要添加的节点 
				minn = dis[i];
				next = i;
			}
		}
	}
	return sum;
}
int main(){
	while(cin>>N){
		for(int i=0;i<N;i++){
			for(int j=0;j<N;j++){
				cin>>map[i][j];
			}
		}	
		cin>>q;
		for(int i=0;i<q;i++){
			cin>>a>>b;
			map[a-1][b-1] = map[b-1][a-1] = 0;
		}
		int ans = prim(N);
		cout<<ans<<endl;
	}
	return 0;
}
```

**自己实现了一遍，上面的套了学长模板试的，加了一些注释。自己实现的有些细节有问题**
```c++
#include<iostream>
#include<cstring>
#define max_size 100
#define inf 0x3f3f3f3f
using namespace std;
int map[max_size][max_size];
int dis[max_size];
int N,q,a,b,c;
using namespace std;
int prim(int x){
	memset(dis,0x3f,sizeof(dis));//初始化
	int next = 0,min = 0,sum = 0;
	for(int index=0;index!=-1;index=next){
		sum += min;//获取权重的和
		next = -1;//循环终止的条件，如果没有符合下面两个判断的情况时说明最小生成树建立，此时循环终止
		min = inf;//初始化
		dis[index] = -1;//标记这一点已经被用 
		for(int i = 0; i < N; i++){
			if(map[index][i] < dis[i]){//可以拿到所有和这个点有关系点的距离，包括自身和自身，当然此时为零
				dis[i] = map[index][i];
			}
			if(dis[i]!=-1&& min > dis[i]){
				min = dis[i];//获取到这一点和下一点的最短距离
				 next = i;//拿到下一个点的位置
			}
		} 
	}
	return sum;
}
int main(){
	while(cin>>N){
		for(int i=0;i<N;i++){
			for(int j=0;j<N;j++){
				cin>>map[i][j];
			}
		}	
		cin>>q;
		for(int i=0;i<q;i++){
			cin>>a>>b;
			map[a-1][b-1] = map[b-1][a-1] = 0;
		}
		int ans = prim(N);
		cout<<ans<<endl;
	}
	return 0;
}
```

## HDU1863畅通工程（Kruskal）

Time Limit: 1000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 46147    Accepted Submission(s): 20626


**Problem Description**
省政府“畅通工程”的目标是使全省任何两个村庄间都可以实现公路交通（但不一定有直接的公路相连，只要能间接通过公路可达即可）。经过调查评估，得到的统计表中列出了有可能建设公路的若干条道路的成本。现请你编写程序，计算出全省畅通需要的最低成本。
 

**Input**
测试输入包含若干测试用例。每个测试用例的第1行给出评估的道路条数 N、村庄数目M ( < 100 )；随后的 N 
行对应村庄间道路的成本，每行给出一对正整数，分别是两个村庄的编号，以及此两村庄间道路的成本（也是正整数）。为简单起见，村庄从1到M编号。当N为0时，全部输入结束，相应的结果不要输出。
 

**Output**
对每个测试用例，在1行里输出全省畅通需要的最低成本。若统计数据不足以保证畅通，则输出“?”。
 

**Sample Input**
3 3
1 2 1
1 3 2
2 3 4
1 3
2 3 2
0 100
 

**Sample Output**
3
?

```c++
#include<iostream>
#include<algorithm>
using namespace std;
int pre[110],N,M,k,sum;
struct node{
	int x,y,len;
}a[110];
void Init(){
	for(int i=1;i<=M;i++){
		pre[i] = i;
	}
}
int find(int x){
	return x==pre[x]? x : pre[x] = find(pre[x]);
}
int cmp(node a,node b){
	return a.len < b.len;
}
int main(){
	while(cin>>N>>M&&N!=0){
		Init();
		for(int i=1;i<=N;i++){
			cin>>a[i].x>>a[i].y>>a[i].len;
		}
		k = 0;
		sum = 0;
		sort(a+1,a+N+1,cmp);
		for(int i=1;i<=N;i++){
			if(find(a[i].x) != find(a[i].y)){
				sum += a[i].len;
				pre[find(a[i].x)] = find(a[i].y);
			}
		}
		for(int i=1;i<=M;i++){
			if(pre[i]==i){
				k++;
			}
		}
		if(k>1){
			cout<<"?"<<endl; 
		}else{
			cout<<sum<<endl;
		}
	}
	return 0;
} 
```


## XYNU1384: 畅通工程2（Kruskal）

时间限制: 1 Sec  内存限制: 32 MB
提交: 26  解决: 17
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
省政府“畅通工程”的目标是使全省任何两个村庄间都可以实现公路交通（但不一定有直接的公路相连，只要能间接通过公路可达即可）。经过调查评估，得到的统计表中列出了有可能建设公路的若干条道路的成本。现请你编写程序，计算出全省畅通需要的最低成本。

**输入**
测试输入包含若干测试用例。每个测试用例的第1行给出评估的道路条数 N、村庄数目M (N, M < =100 )；随后的 N 行对应村庄间道路的成本，每行给出一对正整数，分别是两个村庄的编号，以及此两村庄间道路的成本（也是正整数）。为简单起见，村庄从1到M编号。当N为0时，全部输入结束，相应的结果不要输出。

**输出**
对每个测试用例，在1行里输出全省畅通需要的最低成本。若统计数据不足以保证畅通，则输出“?”。

**样例输入**
 3 4
1 2 1
2 3 2
3 4 3
2 4
1 2 1
3 4 2
0 5
**样例输出**
6
?

```c++
#include<iostream>
#include<algorithm>
using namespace std;
int pre[110],N,M,k,sum;
struct node{
	int x,y,len;
}a[110];
void Init(){
	for(int i=1;i<=M;i++){
		pre[i] = i;
	}
}
int find(int x){
	return x==pre[x]? x : pre[x] = find(pre[x]);
}
int cmp(node a,node b){
	return a.len < b.len;
}
int main(){
	while(cin>>N>>M&&N!=0){
		Init();
		for(int i=1;i<=N;i++){
			cin>>a[i].x>>a[i].y>>a[i].len;
		}
		k = 0;
		sum = 0;
		sort(a+1,a+N+1,cmp);
		for(int i=1;i<=N;i++){
			if(find(a[i].x) != find(a[i].y)){
				sum += a[i].len;
				pre[find(a[i].x)] = find(a[i].y);
			}
		}
		for(int i=1;i<=M;i++){
			if(pre[i]==i){
				k++;
			}
		}
		if(k>1){
			cout<<"?"<<endl; 
		}else{
			cout<<sum<<endl;
		}
	}
	return 0;
} 
```
## XYNU1381还是畅通工程（Kruskal/prim）

时间限制: 1 Sec  内存限制: 32 MB
提交: 50  解决: 23
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
        某省调查乡村交通状况，得到的统计表中列出了任意两村庄间的距离。省政府“畅通工程”的目标是使全省任何两个村庄间都可以实现公路交通（但不一定有直接的公路相连，只要能间接通过公路可达即可），并要求铺设的公路总长度为最小。请计算最小的公路总长度。

**输入**
        测试输入包含若干测试用例。每个测试用例的第1行给出村庄数目N ( < 100 )；随后的N(N-1)/2行对应村庄间的距离，每行给出一对正整数，分别是两个村庄的编号，以及此两村庄间的距离。为简单起见，村庄从1到N编号。
        当N为0时，输入结束，该用例不被处理。

**输出**
        对每个测试用例，在1行里输出最小的公路总长度。

**样例输入**
 8
1 2 42
1 3 68
1 4 35
1 5 1
1 6 70
1 7 25
1 8 79
2 3 59
2 4 63
2 5 65
2 6 6
2 7 46
2 8 82
3 4 28
3 5 62
3 6 92
3 7 96
3 8 43
4 5 28
4 6 37
4 7 92
4 8 5
5 6 3
5 7 54
5 8 93
6 7 83
6 8 22
7 8 17
0
**样例输出**
82

```c++
#include<iostream>
#include<algorithm>
using namespace std;
int pre[11000],N,k,sum;
struct node{
	int x,y,len;
}a[11000];
void Init(){
	for(int i=1;i<=N;i++){
		pre[i] = i;
	}
}
int find(int x){
	return x==pre[x]? x : pre[x] = find(pre[x]);
}
int cmp(node a,node b){
	return a.len < b.len;
}
int main(){
	while(cin>>N&&N!=0){
		Init();
		for(int i=1;i<=(N*(N-1)/2);i++){
			cin>>a[i].x>>a[i].y>>a[i].len;
		}
		sum = 0;
		sort(a+1,a+(N*(N-1)/2)+1,cmp);
		for(int i=1;i<=(N*(N-1)/2);i++){
			if(find(a[i].x) != find(a[i].y)){
				sum += a[i].len;
				pre[find(a[i].x)] = find(a[i].y);
			}
		}
		cout<<sum<<endl;
	}
	return 0;
} 
```
**prim 差点超时！**
```c++
Accepted	1233	982MS	1464K	1455 B	G++
#include<iostream>
#include<cstring>
#define max_size 100
#define inf 0x3f3f3f3f
using namespace std;
int map[max_size][max_size];
int dis[max_size];
int N,q,a,b,c;
using namespace std;

//int map[max_size][max_size];    //图的邻接矩阵
/* 邻接矩阵在使用之前一定要是初始化，确定当i和j不连通时map[i][j]的值 */ 

/* prim算法核心代码，传递参数 n 是节点个数，返回值最小生成树的权值*/
int prim( int n ) {
	int dis[max_size], sum = 0;    //dis代表每个节点与当前已经生成的树的距离 
	memset( dis, 0x3f, sizeof( dis ) );    //这句话等同于下面注释掉的一段代码
	/*
	for( int i = 0; i < max_size; i ++ ) {
		dis[i] = inf;
	}
	*/
	int minn = 0, next = 0;
	/* 思考 index == -1 时代表了什么？ */ 
	for( int index = 0; index != -1; index = next ) {
		sum += minn;
		minn = inf;
		next = -1;
		dis[index] = -1;    //代表节点 index 已经加入到了当前生成的最小树中 
		for( int i = 0; i < n; i ++ ) {
			if( map[index][i] < dis[i] ) {
				dis[i] = map[index][i];    //更新节点i到当前生成的最小树的距离 
			}
			if( minn > dis[i] && dis[i] != -1 ) {    //选定下一次要添加的节点 
				minn = dis[i];
				next = i;
			}
		}
	}
	return sum;
}
int main(){
	while(cin>>N&&N!=0){
		for(int i=0;i<(N*(N-1)/2);i++){
			cin>>a>>b>>c;
			map[a-1][b-1] = map[b-1][a-1] = c;
		}	
//		cin>>q;
//		for(int i=0;i<q;i++){
//			cin>>a>>b;
//			map[a-1][b-1] = map[b-1][a-1] = 0;
//		}
		int ans = prim(N);
		cout<<ans<<endl;
	}
	return 0;
}
```
## XYNU1383: 继续畅通工程（Kruskal/prim）

时间限制: 1 Sec  内存限制: 32 MB
提交: 20  解决: 12
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
省政府“畅通工程”的目标是使全省任何两个村庄间都可以实现公路交通（但不一定有直接的公路相连，只要能间接通过公路可达即可）。现得到城镇道路统计表，表中列出了任意两城镇间修建道路的费用，以及该道路是否已经修通的状态。现请你编写程序，计算出全省畅通需要的最低成本。

**输入**
测试输入包含若干测试用例。每个测试用例的第1行给出村庄数目N ( 1< N < 100 )；随后的 N(N-1)/2 行对应村庄间道路的成本及修建状态，每行给4个正整数，分别是两个村庄的编号（从1编号到N），此两村庄间道路的成本，以及修建状态：1表示已建，0表示未建。

当N为0时输入结束。

**输出**
每个测试用例的输出占一行，输出全省畅通需要的最低成本。

**样例输入**
 4
1 2 1 1
1 3 6 0
1 4 2 1
2 3 3 0
2 4 5 0
3 4 4 0
3
1 2 1 1
2 3 2 1
1 3 1 0
0
**样例输出**
3
0

```c++
#include<iostream>
#include<algorithm>
using namespace std;
int pre[11000],N,k,sum;
struct node{
	int x,y,len,z;
}a[11000];
void Init(){
	for(int i=1;i<=N;i++){
		pre[i] = i;
	}
}
int find(int x){
	return x==pre[x]? x : pre[x] = find(pre[x]);
}
int cmp(node a,node b){
	return a.len < b.len;
}
int main(){
	while(cin>>N&&N!=0){
		Init();
		for(int i=1;i<=(N*(N-1)/2);i++){
			cin>>a[i].x>>a[i].y>>a[i].len>>a[i].z;
			if(a[i].z){
				if(find(a[i].x)!= find(a[i].y)){
					pre[find(a[i].x)] = find(a[i].y);
				}
			}
		}
		sum = 0;
		sort(a+1,a+(N*(N-1)/2)+1,cmp);
		for(int i=1;i<=(N*(N-1)/2);i++){
			if(find(a[i].x) != find(a[i].y)){
				sum += a[i].len;
				pre[find(a[i].x)] = find(a[i].y);
			}
		}
		cout<<sum<<endl;
	}
	return 0;
} 
```
**prim**
```c++
#include<iostream>
#include<cstring>
#define inf 0x3f3f3f3f
using namespace std;
int map[110][110];
int dis[111110];
int prim(int n){
	memset(dis,0x3f,sizeof(dis));
	int sum = 0,min = 0,next = 0;
	for(int index=1;index!=-1;index = next){//注意起始点从1开始 
		sum += min;
		min = inf;
		next = -1;
		dis[index] = -1;
		for(int i=1;i<=n;i++){//从1开始 
			if(dis[i] > map[index][i]){
				dis[i] = map[index][i];
			}
			if(dis[i]!=-1&& min > dis[i]){
				min = dis[i];
				next = i;
			}
		}
	}
	return sum;
}
int main(){
	int n,a,b,c,d;
	while(cin>>n&&n!=0){
		memset(map,0,sizeof(map));
		for(int i=0;i<(n*(n-1)/2);i++){
			scanf("%d%d%d%d",&a,&b,&c,&d);//cin超时 
			if(a==b){
				map[a][b] = 0;
			}
			if(d == 0)
			map[a][b] = map [b][a] = c;
			else
			map[a][b] = map [b][a] = 0;
		}
		cout<<prim(n)<<endl;
	}
	return 0;
}
```
## HDU1162Eddy's picture（Prim）

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 12982    Accepted Submission(s): 6437


**Problem Description**
Eddy begins to like painting pictures recently ,he is sure of himself to become a painter.Every day Eddy draws pictures in his small room, and he usually puts out his newest pictures to let his friends appreciate. but the result it can be imagined, the friends are not interested in his picture.Eddy feels very puzzled,in order to change all friends 's view to his technical of painting pictures ,so Eddy creates a problem for the his friends of you.
Problem descriptions as follows: Given you some coordinates pionts on a drawing paper, every point links with the ink with the straight line, causes all points finally to link in the same place. How many distants does your duty discover the shortest length which the ink draws?
 

**Input**
The first line contains 0 < n <= 100, the number of point. For each point, a line follows; each following line contains two real numbers indicating the (x,y) coordinates of the point. 

Input contains multiple test cases. Process to the end of file.
 

**Output**
Your program prints a single real number to two decimal places: the minimum total length of ink lines that can connect all the points. 
 

**Sample Input**
3
1.0 1.0
2.0 2.0
2.0 4.0
 

**Sample Output**
3.41

```c++
//1162 
#include<iostream>
#include<cstring>
#include<cmath>
#define inf 0x3f3f3f3f
using namespace std;
double map[110][110];
double dis[110];
int n;
struct node{
	double x,y;
}a[110];
double prim(int k){
	for(int i=0;i<k;i++){
		dis[i] = inf;
	} 
//	memset(dis,0x3f,sizeof(dis));//此处不能用0x3f来初始化，此时为int对于double用for循环来初始化 
	double num = 0,min=0,next = 0;
	for(int index = 0;index!=-1;index = next){
		next = -1;
		num += min;
		min = inf;
		dis[index] = -1;
		for(int i=0;i<k;i++){
			if(map[index][i] < dis[i]){
				dis[i] = map[index][i];
			}
			if(dis[i]!=-1 && min > dis[i]){
				min = dis[i];
				next = i;
			}
		}
	}
	return num;
}
int main(){
	while(cin>>n){	
		for(int i=0;i<n;i++){
			cin>>a[i].x>>a[i].y;
		}
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++){
				if(i==j){
					map[i][j] = 0;
				}else{
				map[i][j] = map[j][i] = sqrt(pow((a[i].x-a[j].x),2)+pow((a[i].y-a[j].y),2));
				}
			}
		}
		printf("%.2lf\n",prim(n));
	}
	return 0;
}
```

```c++
#include<iostream>
#include<cstring>
#include<cmath>
#define inf 0x3f3f3f3f
using namespace std;
double map[110][110];
double dis[110];
int n;
bool vis[105];
struct node{
	double x,y;
}a[110];
double prim(int k)
{
    for(int i=0;i<k;i++)
    {
        dis[i]=map[0][i];
        vis[i]=false;
    }
    dis[0]=0;
    vis[0]=true;
    double ans=0;
    for(int i=1;i<k;i++)
    {
        int p=-1;
        double minn= inf;
        for(int j=0;j<k;j++)
        {
            if(!vis[j]&&dis[j]<minn)
                minn=dis[p=j];
        }
        ans+=minn;
        vis[p]=true;
        for(int j=0;j<k;j++)
        {
            if(!vis[j]&&dis[j]>map[p][j])
                dis[j]=map[p][j];
        }
    }
    return ans;
}
int main(){
	while(cin>>n){	
		for(int i=0;i<n;i++){
			cin>>a[i].x>>a[i].y;
		}
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++){
				if(i==j){
					map[i][j] = 0;
				}else{
				map[i][j] = map[j][i] = sqrt(pow((a[i].x-a[j].x),2)+pow((a[i].y-a[j].y),2));
				}
			}
		}
		printf("%.2lf\n",prim(n));
	}
	return 0;
}
```
## XYNU2177: 爱旅游的小明（dijkstra）

时间限制: 1 Sec  内存限制: 128 MB
提交: 89  解决: 39
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
小明想去旅游，但是交通地图上的路太多了。路多了也不好，每次要从一个城镇到另一个城镇时，都有许多种道路方案可以选择，而某些方案要比另一些方案行走的距离要短很多。这让小明很困扰。

现在，已知起点和终点，请你计算出要从起点到终点，最短需要行走多少距离。
**输入**
本题目包含多组数据，请处理到文件结束。
每组数据第一行包含两个正整数N和M(0<N<200,0<M<1000)，分别代表现有城镇的数目和已修建的道路的数目。城镇分别以0～N-1编号。
接下来是M行道路信息。每一行有三个整数A,B,X(0<=A,B<N,A!=B,0<X<10000),表示城镇A和城镇B之间有一条长度为X的双向道路。
再接下一行有两个整数S,T(0<=S,T<N)，分别代表起点和终点。
**输出**
对于每组数据，请在一行里输出小明最短需要行走的距离。如果不存在从S到T的路线，就输出-1.
**样例输入**
 3 3
0 1 1
0 2 3
1 2 1
0 2
3 1
0 1 1
1 2
**样例输出**
2
-1
**这道题想复杂了，😡**
```c++
#include<iostream>
using namespace std;
int N,M,T,S,a,b,c,ans;
int start[1010];
int end[1010];
#include<memory.h>
#define inf 0x3f3f3f3f
#define max_size 1010

int map[max_size][max_size];

/* dijkstra核心代码，参数n是节点总数，start和end分别代表起点和终点，返回起点到终点的最短路，起点和终点不连通时返回-1 */ 
int dijkstra( int start, int end, int n ) {
	int dis[max_size], minn, next;    //dis代表各个节点到起始点的距离，inf 意为不可达 
	bool flag[max_size];    //flag[i]==true表示i到起点的最短距离已经被确定 
	memset( dis, 0x3f, sizeof( dis ) );    // ！！！memset函数一定要谨慎使用，了解它的运行机制！！！ 
	memset( flag, false, sizeof( flag ) );
	dis[start] = 0;    //起点到它本身距离为0
	/*思考一下
	为什么下面的for语句执行条件是 !flag[end] && index != -1
	这两个条件都是必须的吗
	如果要去掉一个该去掉哪一个
	*/ 
	for( int index = start; !flag[end] && index != -1; index = next ) {
		flag[index] = true;
		minn = inf;
		next = -1;
		for( int i = 0; i <= n; i ++ ) {
			if( dis[i] > dis[index] + map[index][i] ) {
				dis[i] = dis[index] + map[index][i];
			}
			if( dis[i] < minn && !flag[i] ) {
				minn = dis[i];
				next = i;
			}
		}
	}
	if( dis[end] == inf ) {
		return -1;
	}
	return dis[end];
}
int main(){
	while(cin>>N>>M){
		memset(map,inf,sizeof(map));
		for(int i=0;i<M;i++){
			cin>>a>>b>>c;
			if(a==b) map[a][b] = 0;
			map[a][b] = min(map[a][b],c);
			map[b][a] = min(map[b][a],c);
//			map[a][b] = map[b][a] =  c;
		}
		cin>>S>>T;
		ans = dijkstra(S,T,N);
		cout<<ans<<endl;
	}
	return 0;
} 
```
## XYNU1392: 最优布线问题（prim）

时间限制: 1 Sec  内存限制: 128 MB
提交: 18  解决: 12
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
学校有n台计算机，为了方便数据传输，现要将它们用数据线连接起来。两台计算机被连接是指它们间有数据线连接。由于计算机所处的位置不同，因此不同的两台计算机的连接费用往往是不同的。

    当然，如果将任意两台计算机都用数据线连接，费用将是相当庞大的。为了节省费用，我们采用数据的间接传输手段，即一台计算机可以间接的通过若干台计算机（作为中转）来实现与另一台计算机的连接。

现在由你负责连接这些计算机，任务是使任意两台计算机都连通（不管是直接的或间接的）。
**输入**
输入文件wire.in，第一行为整数n（2<=n<=100），表示计算机的数目。此后的n行，每行n个整数。第x+1行y列的整数表示直接连接第x台计算机和第y台计算机的费用。

**输出**
输出文件wire.out，一个整数，表示最小的连接费用。
**样例输入**
 3
0 1 2
1 0 1
2 1 0
**样例输出**
2
```c++
#include<iostream>
#include<cstring>
#define max_size 100
#define inf 0x3f3f3f3f
using namespace std;
int map[max_size][max_size];
int dis[max_size];
int N,q,a,b,c;
using namespace std;
int prim(int x){
	memset(dis,0x3f,sizeof(dis));//初始化
	int next = 0,min = 0,sum = 0;
	for(int index=0;index!=-1;index=next){
		sum += min;//获取权重的和
		next = -1;//循环终止的条件，如果没有符合下面两个判断的情况时说明最小生成树建立，此时循环终止
		min = inf;//初始化
		dis[index] = -1;//标记这一点已经被用 
		for(int i = 0; i < x; i++){
			if(map[index][i] < dis[i]){//可以拿到所有和这个点有关系点的距离，包括自身和自身，当然此时为零
				dis[i] = map[index][i];
			}
			if(dis[i]!=-1&& min > dis[i]){
				min = dis[i];//获取到这一点和下一点的最短距离
				 next = i;//拿到下一个点的位置
			}
		} 
	}
	return sum;
}
int main(){
	int n;
	cin>>n;
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++){
			cin>>map[i][j];
		}
	}
	int ans = prim(n);
	cout<<ans<<endl;
	return 0;
}
```
## XYNU1393: 最短网络Agri-Net（prim）

时间限制: 1 Sec  内存限制: 128 MB
提交: 14  解决: 11
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
农民约翰被选为他们镇的镇长！他其中一个竞选承诺就是在镇上建立起互联网，并连接到所有的农场。当然，他需要你的帮助。约翰已经给他的农场安排了一条高速的网络线路，他想把这条线路共享给其他农场。为了用最小的消费，他想铺设最短的光纤去连接所有的农场。你将得到一份各农场之间连接费用的列表，你必须找出能连接所有农场并所用光纤最短的方案。每两个农场间的距离不会超过100000。

**输入**
第一行：农场的个数，N（3<=N<=100）。
第二行..结尾:后来的行包含了一个N*N的矩阵,表示每个农场之间的距离。理论上，他们是N行，每行由N个用空格分隔的数组成，实际上，他们限制在80个字符，因此，某些行会紧接着另一些行。当然，对角线将会是0，因为不会有线路从第i个农场到它本身。
输出
只有一个输出，其中包含连接到每个农场的光纤的最小长度。

**样例输入**
 4
0 4 9 21
4 0 8 17
9 8 0 16
21 17 16 0
**样例输出**
28

```c++
#include<iostream>
#include<cstring>
#define max_size 100
#define inf 0x3f3f3f3f
using namespace std;
int map[max_size][max_size];
int dis[max_size];
int N,q,a,b,c;
using namespace std;
int prim(int x){
	memset(dis,0x3f,sizeof(dis));//初始化
	int next = 0,min = 0,sum = 0;
	for(int index=0;index!=-1;index=next){
		sum += min;//获取权重的和
		next = -1;//循环终止的条件，如果没有符合下面两个判断的情况时说明最小生成树建立，此时循环终止
		min = inf;//初始化
		dis[index] = -1;//标记这一点已经被用 
		for(int i = 0; i < x; i++){
			if(map[index][i] < dis[i]){//可以拿到所有和这个点有关系点的距离，包括自身和自身，当然此时为零
				dis[i] = map[index][i];
			}
			if(dis[i]!=-1&& min > dis[i]){
				min = dis[i];//获取到这一点和下一点的最短距离
				 next = i;//拿到下一个点的位置
			}
		} 
	}
	return sum;
}
int main(){
	int n;
	cin>>n;
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++){
			cin>>map[i][j];
		}
	}
	int ans = prim(n);
	cout<<ans<<endl;
	return 0;
}
```
# 最短路径
# 最短路径例题
## HDU2544最短路（dijkstral）

Time Limit: 5000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 109819    Accepted Submission(s): 47233


**Problem Description**
在每年的校赛里，所有进入决赛的同学都会获得一件很漂亮的t-shirt。但是每当我们的工作人员把上百件的衣服从商店运回到赛场的时候，却是非常累的！所以现在他们想要寻找最短的从商店到赛场的路线，你可以帮助他们吗？

 

**Input**
输入包括多组数据。每组数据第一行是两个整数N、M（N<=100，M<=10000），N表示成都的大街上有几个路口，标号为1的路口是商店所在地，标号为N的路口是赛场所在地，M则表示在成都有几条路。N=M=0表示输入结束。接下来M行，每行包括3个整数A，B，C（1<=A,B<=N,1<=C<=1000）,表示在路口A与路口B之间有一条路，我们的工作人员需要C分钟的时间走过这条路。
输入保证至少存在1条商店到赛场的路线。
 

**Output**
对于每组输入，输出一行，表示工作人员从商店走到赛场的最短时间
 

**Sample Input**
2 1
1 2 3
3 3
1 2 5
2 3 5
3 1 2
0 0
 

**Sample Output**
3
2
```c++
#include<iostream>
#include<cstring>
#define max_size 110//数组不要开太大，第一次没仔细看开了10010，然后内存超限 
#define inf 0x3f3f3f3f 
using namespace std; 
int map[max_size][max_size];
int dijkstral(int start,int end,int n){
	int dis[max_size],min,next;
	bool flag[max_size];
	memset(dis,0x3f,sizeof(dis));
	memset(flag,false,sizeof(flag));
	dis [start] = 0;
	for(int index = start; index != -1 ; index = next){
		flag [index] = true;
		min = inf;
		next = -1;
		for(int i = 1;i <= n;i++){
			if(dis[i] > map[index][i] + dis[index]){
				dis[i] = map[index][i] + dis [index];
			}
			if(!flag[i] && dis[i] < min){
				min  = dis[i];
				next = i;
			}
		}
		}
		if(dis[end] == inf){
			return -1;
		}
		return dis[end];
	}
	int main(){
		int N,M,a,b,c;
		while(cin>> N >> M && N!=0 && M!=0){
			memset(map,0x3f,sizeof(map));
			for ( int i= 1 ; i <= M ; i++){
				cin >> a >> b >> c ;
				if(a==b){ 
				map [a][b] = 0;
				}
				else {
				map [a][b] = min(map[a][b],c);
				map [b][a] = min(map[b][a],c);				
				}
			}
			cout<<dijkstral(1,N,N)<<endl;
		}
		return 0;
	} 
```
