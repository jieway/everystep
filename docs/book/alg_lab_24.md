
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
