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
  * [搜索](book/os_lab_20.md)
  * [广搜](book/alg_bfs.md)
  * [深搜](book/alg_dfs.md)
  * [并查集](alg_lab_17.md)
  * [最小生成树](book/alg_lab_21.md)
  * [最短路](book/alg_lab_23.md)
  * [拓扑排序](book/alg_lab_25.md)


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

## 1.0  
 HDU1102Constructing Roads（kruskal/prim）
**kruskal**
```cpp
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

```cpp
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

## HDU1863畅通工程（Kruskal）

```cpp
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

```cpp
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


```cpp
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
```cpp
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


```cpp
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
```cpp
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

```cpp
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

```cpp
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
```cpp
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

```cpp
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


```cpp
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

# 参考

- [1]《算法-4》

# 二分图

如果可以用两种颜色对图中的节点进行着色，并且保证相邻的节点颜色不同，那么这个图就是二分图。

## 1. 判断是否为二分图
 [力扣](https://leetcode-cn.com/problems/is-graph-bipartite/description/)

# 拓扑排序

常用于在具有先序关系的任务规划中。

## 1. 课程安排的合法性

[Leetcode](https://leetcode.com/problems/course-schedule/description/) / [力扣](https://leetcode-cn.com/problems/course-schedule/description/)
## 2. 课程安排的顺序



210\. Course Schedule II (Medium)

[Leetcode](https://leetcode.com/problems/course-schedule-ii/description/) / [力扣](https://leetcode-cn.com/problems/course-schedule-ii/description/)
