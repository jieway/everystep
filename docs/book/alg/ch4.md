# 搜索
简而言之，不管是 BFS 还是 DFS 都是将网状的模型转换为线性的遍历。如何转换？通过回溯实现。
1.POJ 1312 棋盘问题
2.POJ 2251 Dungeon Master
3.POJ 3278 Catch That Cow
4.POJ 3279 Fliptile
5.POJ 1426 Find The Multiple
6.POJ 3126 Prime Path
7.POJ 3087 Shuffle’m Up
8.POJ 3414 Pots
9.FZU 2150 Fire Game
10.UVA 11624 Fire!
11.POJ 3984 迷宫问题
12.HDU 1241 Oil Deposits
13.HDU 1495 非常可乐
14.HDU 2612 Find a way
# 例题
### 1.0 练习！
[VJ-POJ-1321](https://vjudge.net/problem/POJ-1321)
```cpp
#include <iostream> 
#define MAX_SIZE 10
using namespace std;
int n, k, ans, sum , b[MAX_SIZE] = {0};
char map[MAX_SIZE][MAX_SIZE];
void dfs(int step) {
    if(ans == k) {
        sum++;
        return;
    }
    if(step == n) {
        return;
    }
    for(int i = 0; i < n; i++) {
        // map控制列数，b 控制行数，如果当前行使用过就标记为 1
        if(map[step][i] == '#' && b[i] == 0){
            b[i] = 1;
            ans++;
            dfs(step + 1);
            // 这一步回溯时要恢复原貌，不能对下一种走法产生影响。
            b[i] = 0;
            ans--;
        }
    }
    // 新的走法开启。
    // 上面迭代的是 从 （0） 行开始的走法，要开始扫描从第 1 列开始的走法
    dfs(step + 1);
}
int main() {
    while (cin >> n >> k && n!=-1 && k != -1) {
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                cin >> map[i][j];
            }
        }
        // 统计棋子步数
        ans = 0;
        // 统计有几种走法
        sum = 0;
        dfs(0);
        cout << sum << endl;
    }
    return 0;
}
```
### 2.0 

```cpp
/************************************
@File    :   POJ_2251.cpp
@Time    :   2020/03/11 19:32:07
@Author  :   jie wei 
@Version :   1.0
@Contact :   jiewei1999@qq.com
@Link    :   None
*************************************/
#include <iostream>
#include <queue>
#define MAX_SIZE 32
using namespace std;
struct node {
    int x, y, z, step;
};
char map[MAX_SIZE][MAX_SIZE][MAX_SIZE];
int sx, sy, sz;
int ex, ey, ez;
int l, r, c;
// 六个方向，不能斜着走
int dx[6] = {1, -1, 0, 0, 0, 0};
int dy[6] = {0, 0, 1, -1, 0, 0};
int dz[6] = {0, 0, 0, 0, 1, -1};
int bfs(int sx, int sy, int sz) {
    queue<node> que;
    node a;
    a.x = sx, a.y = sy, a.z = sz, a.step = 0;
    que.push(a);
    while(!que.empty()) {
        node now = que.front();
        que.pop();
        // 终止条件
        if(now.x == ex && now.y == ey && now.z == ez) {
            return now.step;
        }
        // 六个方向的试探
        for (int i = 0; i < 6; i++) {
            node next;
            next.x = now.x + dx[i];
            next.y = now.y + dy[i];
            next.z = now.z + dz[i];
            next.step = now.step + 1;
            if (next.x >= 0 && next.x < l 
            && next.y >= 0 && next.y < r 
            && next.z >= 0 && next.z < c
            && map[next.x][next.y][next.z] != '#') {
                map[next.x][next.y][next.z] = '#';
                que.push(next);
            }
        }
    }
    return -1;
}
int main() {
    while (cin >> l >> r >> c && l!=0 && r!=0 && c!=0) {
        for (int i = 0; i < l; i++) {
            for (int j = 0; j < r; j++) {
                for (int k = 0; k < c; k++) {
                    cin >> map[i][j][k];
                    if (map[i][j][k] == 'S') {
                        sx = i , sy = j , sz = k;
                    }
                    if (map[i][j][k] == 'E') {
                        ex = i, ey = j, ez = k;
                    }
                }
            }
        }
        int index = bfs(sx, sy, sz);
        if (index != -1) {
            cout << "Escaped in "<<index<<" minute(s)." << endl;
        }else {
            cout << "Trapped!" << endl;
        }
    }
    return 0;
}
```
### 3.0 
[VJ-POJ-3278](https://vjudge.net/problem/POJ-3278)

* 这道题其实就是一个三叉树，当前位置有三种选择，后退（-1），前进（+1），瞬移（*2）.

* 一共三种选择，构成了一个三叉树，最先到达的那就是最快的。技巧在于用数组存储步数的同时又剪枝。

* 而且这题用 G++ 过不去 WA. 但是 C++ 却 AC. 郁闷ing.
```cpp
#include <iostream>
#include <queue>
#include <cstring>
#define MAX_SIZE 100010 
using namespace std;
int n, k;
int b[MAX_SIZE];
int bfs() {
    queue<int> que;
    que.push(n);
    memset(b,0,sizeof(b));
    while (!que.empty()) {
        int now = que.front();
        que.pop();
        if ( now == k) {
            return b[k];
        }
        if (now - 1 >= 0 && b[now - 1] == 0) {
            que.push(now - 1);
            b[now - 1] = b[now] + 1;
        }
        if (now + 1 <= 100000 && b[now + 1] == 0) {
            que.push(now + 1);
            b[now + 1] = b[now] + 1;
        }
        if (now * 2 <= 100000 && b[now * 2] == 0) {
            que.push(now * 2);
            b[now * 2] = b[now] + 1;
        }
    }
}
int main() {
    cin >> n >> k;
    int index = bfs();
    cout << index << endl;
    return 0;
}
```
### 4.0

这道题和上一题类似，可以想象成一颗二叉树，要么乘 10 ， 要么乘10+1 ，因为需要的数字只含有 1/0 。

unsigned long long 最大长度为 19 ，这题数据比较弱，如果数据再大就需要用大数来处理了。

最后 C++ 会 TLE ，G++ 可以 AC 疑惑ing 。
```cpp
#include <iostream> 
#include <queue>
using namespace std;
int n;
void bfs() {
    queue<unsigned long long> que;
    que.push(1);
    while (!que.empty()) {
        unsigned long long now = que.front();
        que.pop();
        if(now % n == 0){
            cout << now << endl;
            return;
        }
        que.push(now * 10);
        que.push(now * 10 + 1);
    }
}
int main() {
    while (cin >> n && n!=0) {
        bfs();
    }
    return 0;
}
```

# DFS
## XYNUOJ1325: 全排列(DFS)

时间限制: 1 Sec  内存限制: 128 MB
提交: 10  解决: 6
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
     排列与组合是常用的数学方法。 
先给一个正整数 ( 1 < = n < = 10 ) 
例如n＝3，所有组合,并且按字典序输出： 
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 1 2 
3 2 1 

**输入**
输入一个整数n(  1<=n<=10)

**输出**
输出所有全排列

每个全排列一行，相邻两个数用空格隔开（最后一个数后面没有空格）

**样例输入**
 3
**样例输出**
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
**思路：**

 1. 深搜，以3为例，进入dfs函数
 2. 进入for循环，此时i=1，存入数组，打上标记，进入dfs（2）。记住此时i=1，回溯时要用
 3. 判断2 不等于4，再次进入for循环，判断i=1用过了，判断i=2，没用存入数组a中，打上标记。进入dfs（3）此时的i=2，回溯时要用。
 4. 继续判断，3不等于4，再次进入for循环，1/2都用过了，i=3可以，做标记，进入dfs（4），此时i=3,回溯时要用。
 5. dfs（4） 满足判断，输出 1 / 2 /3
 6. 返回上一个dfs（3）中，取消3的标记，3可以再次使用；此时dfs（3）结束，返回到dfs（2）中。
 7. 返回到dfs（2）中，取消2的标记，但此时i=2；取消2的标记后i自增为3，而3的标记在上一步已经取消了，所以此时将3填入a中。此时 a 中顺序为1 / 3  
 8. 此时在进入下一步dfs（3）中，i从1自增，而2的标记已经被取消，所以填入2。
 9. 进入dfs（4）中后，推出 1 / 3 / 2
 10. 继续回溯。返回dfs（3）中，取消此时取消的是2的标记，继续回溯，此时取消的是3的标记，继续回溯，此时取消的是1的标记，此时位于dfs（1），此时的i对应第二步的i，为1，所以i自增得2，2得标记取消，2得以存入数组，继续进入dfs（2），1得标记取消存入数组，进入dfs（3），3得标记取消得存入数组，进入dfs（4），推出 2 / 1 / 3
 11. 继续回溯得 2 / 3 / 1
 12. 继续回溯得 3 / 1 / 2
 13. 继续回溯得 3 / 2 / 1
 
```c++
#include<iostream>
using namespace std;
int n,a[11],b[11];//a存储本身，b来标记状态 
void dfs(int step){//标记每一步 
	if(step == n+1){//如果每一步都走完了就输出 
		for(int i=1;i<=n;i++){
			if(i<n){//控制输出格式，尾部不能有空格 
				printf("%d ",a[i]);
			}else{
				printf("%d\n",a[i]);
			}
		}
		return;//返回上一次的dfs 
	}
	for(int i=1;i<=n;i++){//存入数字 
		if(b[i]==0){//判断是否用过 
			a[step]=i;//将没用过的数字存入数组中 
			b[i]=1;//打上标签 
			dfs(step+1);//判断下一个数字 
			b[i]=0;//回溯，将标签取消 
		}
	}
}
int main(){
	scanf("%d",&n); 
	dfs(1);
	return 0;
} 
```

## XYNUOJ1327: 组合+判断素数(DFS)

时间限制: 1 Sec  内存限制: 128 MB
提交: 4  解决: 3
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
已知 n 个整数b1,b2,…,bn

以及一个整数 k（k＜n）。

从 n 个整数中任选 k 个整数相加，可分别得到一系列的和。

例如当 n=4，k＝3，4 个整数分别为 3，7，12，19 时，可得全部的组合与它们的和为：
3＋7＋12=22　　3＋7＋19＝29　　7＋12＋19＝38　　3＋12＋19＝34。
现在，要求你计算出和为素数共有多少种。

例如上例，只有一种的和为素数：3＋7＋19＝29。



**输入**
第一行两个整数：n , k （1<=n<=20，k＜n） 
第二行n个整数：x1,x2，…,xn （1<=xi<=5000000） 

**输出**
一个整数（满足条件的方案数）。 

**样例输入**
 4 3
3 7 12 19
**样例输出**
1
**总结：** 

 1. 将数字存入数组中，按照排列得方式累加，注意排列不能重复。
 2. 累加后判断是否为素数，若为加一，反之不变。
 3. 数据回溯时注意将数据减去。

```c++
#include<iostream>
#include<cstring>
using namespace std;
int ans,sum=0,k,n,a[21],b[21]={0},c[21]; 
bool prime(int x){
	if(x<2)return false;
	for(int i=2;i*i<=x;i++){
		if(x%i==0)return false;
	}
	return true;
} 
void dfs(int step){ 
	if(step == k+1){
		if(prime(sum)){
			ans++;
		}
		return ;
	}
	for(int i=1;i<=n;i++){ 
		if(b[i]==0 && i > a[step-1]){ 
			a[step]=i; 
			b[i]=1; 
			sum+=c[i];
			dfs(step+1); 
			b[i]=0;
			sum-=c[i];
		}
	}
}
int main(){
	cin>>n>>k;
	memset(c,0,sizeof(c));
	memset(a,0,sizeof(a));
	memset(b,0,sizeof(b));
	for(int i=1;i<=n;i++){
		cin>>c[i];
		a[i] = i;
	}
	ans = 0;
	dfs(1);
	cout<<ans<<endl;
	return 0;
} 
```
## XYNUOJ1275: 组合的输出(DFS)

时间限制: 1 Sec  内存限制: 128 MB
提交: 49  解决: 25
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
从n个数中取出r个元素，输出所有组合
**输入**
一行两个自然数n和r (1<n<21,1<=r<=n)
**输出**
所有的组合，每个组合占一行，其中的元素从小到大排序，用一个空格隔开，所有组合按字典序。
**样例输入**
 5 3
**样例输出**
1 2 3
1 2 4
1 2 5
1 3 4
……（太多，此处省略）
**总结：** 超时。。。
```c++
#include<iostream>
using namespace std;
int n,r,a[22],b[22]={0};
void dfs(int step){
	int i;
	if(step==r+1){
		for(i=1;i<=r;i++)
		if(i<r){
			printf("%d ",a[i]);
		}else{
			printf("%d\n",a[i]);
		}
		return;
	}
	for(i=a[step-1];i<=n;i++){
		if(b[i]==0){
			a[step] = i;
			b[i] = 1;
			dfs(step+1);
			b[i] = 0;
		}
	}
}
int main(){
	scanf("%d%d",&n,&r);
	a[0]=1;
	dfs(1);
	return 0;
} 
```


## XYNUOJ1276: N皇后问题（DFS）

时间限制: 1 Sec  内存限制: 128 MB
提交: 41  解决: 22
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
在N*N（1<N<=9）的棋盘上放置N个皇后而彼此不受攻击（即在棋盘的任一行，任一列和任一对角线上不能放置2个皇后），编程求解所有的摆放方法。
 

**输入**
一个整数n（1<n<=9）
**输出**
若有解，输出若干行，每行n个数，中间有两个空格，依次表示第i个皇后的列号
若无解，输出 “no”
**样例输入**
 4
**样例输出**
2 4 1 3
3 1 4 2


```c++
#include<iostream>
#include<algorithm> 
using namespace std;
int n,k=0,a[20],sum;
void dfs(int step){//代表层数 
	if(step == n+1){ 
		sum++;
		for(int i=1;i<=n;i++){
			if(i<n){
				cout<<a[i]<<" ";
			}else{
				cout<<a[i]<<endl;
			}
		}
		return;
	}
	for(int i=1;i<=n;i++){//从第一列开始判断，判断到n列 
		a[step] = i;//将每一列的值存入a中逐列试探 
		k=0; 
		for(int j=1;j<step;j++){//与数组中已经存在的所有值进行比较 
			if((a[j]==i)||(abs(step-j)==abs(a[j]-i))){//列与列之间相互隔离不用判断，判断层和对角线即可 
				k=1;//如果冲突，打上标记，表示这个层不能用继续下一层 
				break;  
			}		
		}
		if(k==0){//如果这一列可用进行下一步 
			dfs(step+1);
		}
	}
}
int main(){
	cin>>n;
	sum=0;
	dfs(1);
	if(sum==0){
		cout<<"no"<<endl;
	}
	return 0;
}
```

## XYNUOJ1306: 棋盘问题(DFS)

时间限制: 1 Sec  内存限制: 32 MB
提交: 5  解决: 4
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
在一个给定形状的棋盘（形状可能是不规则的）上面摆放棋子，棋子没有区别。要求摆放时任意的两个棋子不能放在棋盘中的同一行或者同一列，请编程求解对于给定形状和大小的棋盘，摆放k个棋子的所有可行的摆放方案C。
**输入**
输入含有多组测试数据。 
每组数据的第一行是两个正整数n和k，用一个空格隔开，表示了将在一个n*n的矩阵内描述棋盘，以及摆放棋子的数目。（n<=8，k<=n） 
当n和k均为-1时表示输入结束。
随后的n行描述了棋盘的形状：每行有n个字符，其中 # 表示棋盘区域， . 表示空白区域（数据保证不出现多余的空白行或者空白列）。
**输出**
对于每一组数据，给出一行输出，输出摆放的方案数目C（数据保证C<2^31）。
**样例输入**
 2 1
#.
.#
4 4
...#
..#.
.#..
#...
-1 -1
**样例输出**
2
1

```c++
#include<iostream>
#include<cstring>
using namespace std;
int n,k,sum,ans,q,b[10]={0};
char a[9][9];
void dfs(int step){
	if(ans == k){ 
		sum++;
		return;
	}if(step >= n){//越界后返回 
		return;
	}
	for(int i=0;i<n;i++){
		if(a[step][i]=='#'&&b[i]==0){
				b[i]=1;//标记此列，代表不可用 
				ans++;//标记棋子 
				dfs(step+1); 
				b[i]=0;//释放标记 
				ans--;//回溯时拿回棋子 
			}
		}	
	dfs(step+1);//如果一行一个棋子都没有的情况 
}
int main(){
	
	while(cin>>n>>k&&n!=-1&&k!=-1){
		for(int i=0;i<n;i++){
			cin>>a[i];
		}
		sum=0;
		ans=0;
		dfs(0);
		cout<<sum<<endl;
	}
	return 0;
} 	
```
## 1XYNUOJ1819: 组合数(DFS)

时间限制: 3 Sec  内存限制: 64 MB
提交: 36  解决: 29
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
找出从自然数1、2、... 、n（0<n<10）中任取r(0<r<=n)个数的所有组合。
输入
输入n、r。
**输出**
按特定顺序输出所有组合。 特定顺序：每一个组合中的值从大到小排列，组合之间按逆字典序排列。
**样例输入**
 5 3
**样例输出**
543
542
541
532
531
521
432
431
421
321
**总结：** 注意剪枝
```c++
#include<iostream>
using namespace std;
int n,r,sum,a[15],b[15]={0},c[15];
void dfs(int step){
	if(step == r){
		for(int i=0;i<r;i++){
			cout<<a[i];
		}
		cout<<endl;
		return;
	}
	for(int i=0;i<n;i++){
		if(b[i] == 0){
			b[i] = 1;
			a[step] = c[i];
			if(step==0||a[step-1]>a[step]){
				dfs(step+1);
			}
			b[i]=0;
		}
	}
}
int main(){
	sum=0;
	cin>>n>>r;
	for(int i=0;i<n;i++){
		c[i]=n-i;
	}
	dfs(0);
	return 0;
} 
```
## XYNUOJ1829: 最少步数（DFS/BFS）

时间限制: 3 Sec  内存限制: 64 MB
提交: 114  解决: 72
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
这有一个迷宫，有0~8行和0~8列：

 1,1,1,1,1,1,1,1,1
 1,0,0,1,0,0,1,0,1
 1,0,0,1,1,0,0,0,1
 1,0,1,0,1,1,0,1,1
 1,0,0,0,0,1,0,0,1
 1,1,0,1,0,1,0,0,1
 1,1,0,1,0,1,0,0,1
 1,1,0,1,0,0,0,0,1
 1,1,1,1,1,1,1,1,1

0表示道路，1表示墙。

现在输入一个道路的坐标作为起点，再如输入一个道路的坐标作为终点，问最少走几步才能从起点到达终点？

（注：一步是指从一坐标点走到其上下左右相邻坐标点，如：从（3，1）到（4,1）。）

**输入**
第一行输入一个整数n（0<n<=100），表示有n组测试数据;
随后n行,每行有四个整数a,b,c,d（0<=a,b,c,d<=8）分别表示起点的行、列，终点的行、列。
**输出**
输出最少走几步。
**样例输入**
 2
3 1  5 7
3 1  6 7
**样例输出**
12
11

**先用DFS做了一下，思路好想，有个bug没看到，改了二十分钟。细节太重要了**
```c++
#include<iostream>
#define max 10000
using namespace std;
int map[9][9]={
1,1,1,1,1,1,1,1,1,
1,0,0,1,0,0,1,0,1,
1,0,0,1,1,0,0,0,1,
1,0,1,0,1,1,0,1,1,
1,0,0,0,0,1,0,0,1,
1,1,0,1,0,1,0,0,1,
1,1,0,1,0,1,0,0,1,
1,1,0,1,0,0,0,0,1,
1,1,1,1,1,1,1,1,1
};
int x,y,x2,y2,step,num;//x，y代表坐标，step代表每一步 
int py[4]={0,0,-1,+1};//px,代表上下左右的移动 
int px[4]={+1,-1,0,0};//同上 
void dfs(int x,int y,int c){//深搜
	if((x == x2) && (y==y2)){
		if(c < num){
			num = c;//获取最小值 
			}
	}else{
		for(int i=0;i<4;i++){//四个方向试探 
			int kx = x + px[i]; 
			int ky = y + py[i];
			if(map[kx][ky]==0&&c+1<num){//所走的步数必须小于最小值 
				map[kx][ky] = 1;//标记这一点不能再走 
				dfs(kx,ky,c+1);//搜索 
				map[kx][ky] = 0;//回溯时取消 
			}
		}
	}
} 
int main(){
	int n;
	cin>>n;
	while(n--){
		int c = 0;
		cin>>x>>y>>x2>>y2;
		num=max;
		map[x][y]=1;//表示从这一点开始，打上标记
		dfs(x,y,c);//深搜 
		cout<<num<<endl;//得到最小值 
		map[x][y]=0;//取消标记，恢复原貌 
	}
	return 0;
}
```
**BFS**
```c++
#include<iostream>
#include<cstring>
#include<queue>
using namespace std;
const int N = 9;
int x,y;//起点 
int ex,ey;//终点 
int px[4]={0,0,-1,+1};//x变换 
int py[4]={1,-1,0,0};//y变换 
bool vis[N][N];//存储状态 
int map[N][N]=//存储地图 
{
 1,1,1,1,1,1,1,1,1,
 1,0,0,1,0,0,1,0,1,
 1,0,0,1,1,0,0,0,1,
 1,0,1,0,1,1,0,1,1,
 1,0,0,0,0,1,0,0,1,
 1,1,0,1,0,1,0,0,1,
 1,1,0,1,0,1,0,0,1,
 1,1,0,1,0,0,0,0,1,
 1,1,1,1,1,1,1,1,1	
};
struct note{ //存储当前坐标和步数 
	int x,y,step;
};
int bfs(){
	note s; 
	s.x = x, s.y = y, s.step = 0;//捕获当前坐标，步数初始化 
	vis[x][y]=true;//标记状态，当前坐标已被使用，下次不可在扫描到 
	queue<note> que;//设置队列 
	que.push(s);//压入当前坐标 
	while(!que.empty()){//队列不能为空 
		note now = que.front();//获取队列头部元素 
		que.pop();//弹出头部元素 
		if(now.x==ex&&now.y==ey){//如果此元素与终点坐标相等则退出循环，抛出步数 
			return now.step;//拿到步数 
		}
		for(int i=0;i<4;i++){//遍历四个方向 
			note end;//设置下一个坐标 
			end.x = now.x+px[i];//捕获x 
			end.y = now.y+py[i];//捕获y 
			end.step = now.step;//捕获已经走的步数 
			if(vis[end.x][end.y]==false&&map[end.x][end.y]==0){//判断这一点是否可行 
				vis[end.x][end.y]=true;//打上标记，本身不可再被选择 
				end.step += 1;//累加步数 
				que.push(end); //压入队列，继续循环 
			}
		}
	}
}
int main(){
	int t;
	cin>>t;
	while(t--){
		memset(vis,false,sizeof(vis));//多次输入，注意初始化 
		cin>>x>>y>>ex>>ey;
		int ans = bfs();
		cout<<ans<<endl;
	}
	return 0;
}
```
**总结：**
DFS是一条路走到底，不行就回溯返回上一个节点，依次循环。
BFS是每一步的所有可能都捕捉到，最终得到最优解。


# BFS
## XYNUOJ1351: 迷宫问题(DFS)

时间限制: 1 Sec  内存限制: 128 MB
提交: 19  解决: 14
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
设有一个N*N方格的迷宫，入口和出口分别在左上角和右上角。迷宫格子中分别放有0和1，0表示可通，1表示不能，
迷宫走的规则如下图所示：即从某点开始，有八个方向可走，前进方格中数字为0时表示可通过，为1时表示不可通过，
要另找路径。找出一条 从入口（左上角）到出口（又上角）的路径(每个格子只能走一次)。
**输入**
只有一组输入数据。输入如下面样例，且1<N<15

**输出**
输出可行的路径总数。如果无法到达，输出0。
**样例输入**
 3
0 0 0
0 1 1
1 0 0
**样例输出**
2
**注意变量定义的位置，在这卡住了**
```c++
#include<iostream>
using namespace std;
int b[16][16]={0};
int s[16][16],x,y,n,num;
int px[8]={1,-1,1,-1,1,-1,0,0};
int py[8]={-1,1,1,-1,0,0,1,-1};
void dfs(int x,int y){
    if(x==1&&y==n){
        num++;
        return;
    }else{
        for(int i=0;i<8;i++){
            int ex = x + px[i];
            int ey = y + py[i];
            if(s[ex][ey]==0&&b[ex][ey]==0&&ex<=n&&ex>0&&ey>0&&ey<=n){
                b[ex][ey]=1;
                dfs(ex,ey);
                b[ex][ey]=0;
            }
        }
    }
     
}
int main(){
    cin>>n;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=n;j++){
            cin>>s[i][j];
        }
    }
    num=0;
    s[1][1]=1;
    dfs(1,1);
    cout<<num<<endl;
    return 0;
} 
```


# 连通域

## XYNUOJ1815: 水池数目（DFS/连通块）

时间限制: 3 Sec  内存限制: 64 MB
提交: 89  解决: 74
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
南阳理工学院校园里有一些小河和一些湖泊，现在，我们把它们通一看成水池，假设有一张我们学校的某处的地图，这个地图上仅标识了此处是否是水池，现在，你的任务来了，请用计算机算出该地图中共有几个水池。
**输入**
第一行输入一个整数N，表示共有N组测试数据
每一组数据都是先输入该地图的行数m(0<m<100)与列数n(0<n<100)，然后，输入接下来的m行每行输入n个数，表示此处有水还是没水（1表示此处是水池，0表示此处是地面）
**输出**
输出该地图中水池的个数。 要注意，每个水池的旁边（上下左右四个位置）如果还是水池的话的话，它们可以看做是同一个水池。
**样例输入**
 2
3 4
1 0 0 0 
0 0 1 1
1 1 1 0
5 5
1 1 1 1 0
0 0 1 0 1
0 0 0 0 0
1 1 1 0 0
0 0 1 1 1
**样例输出**
2
3

```c++
#include<iostream>
using namespace std;
int s[101][101],a,b;
int ax[4]={0,0,1,-1};//x坐标变换的可能 
int ay[4]={-1,1,0,0};//y坐标变换的可能 
void dfs(int x,int y){
	s[x][y]=0;
	for(int i=0;i<4;i++){
		int ex = x+ax[i];
		int ey = y+ay[i];
		if(s[ex][ey]){
			dfs(ex,ey);
		}
	}
}
int main(){
	int n;
	cin>>n;
	while(n--){
		cin>>a>>b;
		for(int i=1;i<=a;i++){//注意从1开始 
			for(int j=1;j<=b;j++){
				cin>>s[i][j];
			}
		}
		int num=0;
		for(int i=1;i<=a;i++){
			for(int j=1;j<=b;j++){
				if(s[i][j]){
					dfs(i,j);
					num++;
				}
			}
		}
		cout<<num<<endl;
	}
	return 0;
} 
```
## HDU1241 Oil Deposits（BFS/连通域）

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 54250    Accepted Submission(s): 31161


**Problem Description**
The GeoSurvComp geologic survey company is responsible for detecting underground oil deposits. GeoSurvComp works with one large rectangular region of land at a time, and creates a grid that divides the land into numerous square plots. It then analyzes each plot separately, using sensing equipment to determine whether or not the plot contains oil. A plot containing oil is called a pocket. If two pockets are adjacent, then they are part of the same oil deposit. Oil deposits can be quite large and may contain numerous pockets. Your job is to determine how many different oil deposits are contained in a grid. 
 

**Input**
The input file contains one or more grids. Each grid begins with a line containing m and n, the number of rows and columns in the grid, separated by a single space. If m = 0 it signals the end of the input; otherwise 1 <= m <= 100 and 1 <= n <= 100. Following this are m lines of n characters each (not counting the end-of-line characters). Each character corresponds to one plot, and is either `* ', representing the absence of oil, or `@', representing an oil pocket.
 

**Output**
For each grid, output the number of distinct oil deposits. Two different pockets are part of the same oil deposit if they are adjacent horizontally, vertically, or diagonally. An oil deposit will not contain more than 100 pockets.
 

**Sample Input**

    1 1
    *
    3 5
    *@*@*
    **@**
    *@*@*
    1 8
    @@****@*
    5 5 
    ****@
    *@@*@
    *@**@
    @@@*@
    @@**@
    0 0 
     

**Sample Output**
0
1
2
2

**思路:**

 1. 深搜，每扫描到一个* 就标记，并且就遍历此位置的八个方向。
 2. 遍历完毕后累加得到连通域的个数。没有设置边界也AC了，应该设置边界。
 3. 测试的时候一直在想BFS，卡住了，没写出来。BFS也可以做出来，相同的思想。


**DFS**
```c++
/* 
Status Accepted
Time 31ms
Memory 1540kB
Length 582
Lang G++
Submitted 2019-08-23 20:24: 
**/
#include<iostream>
using namespace std;
char a[110][110];
int n,m;
int px[8] = {0,1,1,1,0,-1,-1,-1};
int py[8] = {1,1,0,-1,-1,-1,0,1};
void dfs(int x,int y){
	a[x][y] = '*';
	for(int i=0;i<8;i++){
		int qx = px[i] + x;
		int qy = py[i] + y;
		if(a[qx][qy]=='@'){
		a[qx][qy] = '*';
		dfs(qx,qy);	
		}
	}
}
int main(){
	while(cin>>n>>m&&m!=0){
		for(int i=0;i<n;i++){
			for(int j=0;j<m;j++){
				cin>>a[i][j];
			}
		}
		int ans = 0;
		for(int i=0;i<n;i++){
			for(int j=0;j<m;j++){
				if(a[i][j]=='@'){
					dfs(i,j);
					ans++;
				}
			}
		}
		cout<<ans<<endl;
	}
	return 0;
} 
```

**BFS**
 

```c++
/*
Status Accepted
Time 31ms
Memory 1416kB
Length 888
Lang G++
Submitted 2019-08-23 21:11:01
**/
#include<iostream>
#include<queue>
#include<cstring>
using namespace std;
int n,m;
int px[8] = {0,1,1,1,0,-1,-1,-1};//八个方向对应八个坐标 
int py[8] = {1,1,0,-1,-1,-1,0,1};
char map[110][110];
struct Node{
	int x,y;
};
void BFS(int x,int y){
	queue<Node> que;
	Node now;
	now.x = x;
	now.y = y;
	que.push(now);
	while(!que.empty()){
		Node pre = que.front();
		Node next;
		que.pop();
		for(int i=0;i<8;i++){
			next.x = pre.x + px[i];
			next.y = pre.y + py[i];
			if(map[next.x][next.y]=='@')
			{map[next.x][next.y] = '*';
			que.push(next);
			}
		}  
	}	
}
int main(){
	while(cin>>n>>m&&m!=0){
		memset(map,0,sizeof(map));
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				cin>>map[i][j];
			}
		}
		int ans=0;
		for(int i=1;i<=n;i++){
			for(int j=1;j<=m;j++){
				if(map[i][j] == '@'){
					BFS(i,j);
					map[i][j] = '*';
					ans++;
				}
			}
		}
		cout<<ans<<endl;
	}
	return 0;
} 
```
