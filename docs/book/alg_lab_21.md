# 最小生成树

解决这类问题的算法为 prime 算法和 kruskal 算法。

这些算法都是贪心的具体实现，不断的寻找最小生成树的所有边。区别在于保存切分和判定权重最小的横切边的方式。

## 概念

* 什么是**树**？无环连通图。**森林**则是**树**的集合。
* 什么是**生成树**？生成树是连通图的子图，生成树含有图中的所有顶点并且是一棵树。
* 什么是**最小生成树**？在一个**加权图**中，**生成树**有很多棵，但是将生成树边的所有权重累加到一起，其中权重最小的树称为最小生成树。

根据树的定义，可以得到两条性质：
1. 用一条边连接树中任意两个还没连接的顶点会产生一个新的环。
2. 从树中删去一条边可以得到两棵独立的树。

### 背景

* 例如在电路中，用户是顶点，导线是边，用最少的导线连接所有的用户如何安排。
* 航空领域中机场表示顶点，航线表示边，用最少的航行距离将乘客送达不同的地点。
* 输电领域中电站表示顶点，输电线表示边，同导线类似，用最少的线将电送到所有的节点上。
 
### 注意 

* 最小生成树的范围是连通图，如果不是连通图的话那么只能计算这个图所有连通分量的最小生成树，而这些生成树合并在一起则称为最小生成森林，就是说因为树与树之间不连通，导致树多了成森林了。
* 权重不一定表示距离，从不同的角度来看代表不同，可以表示时间长短费用代表衡量权重的标准。
* 权重可以为零或负数，只要保证总权重最小则代表最小生成树。
* 如果存在权重相同的边，那么可能存在多棵最小生成树。

## 1.0  ❤🧡💛💙
[VJ_HDU_1233](https://vjudge.net/problem/HDU-1233)

【Prim】

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
using namespace std;
const int N = 110, INF = 0x3f3f3f3f;
int maps[N][N];
int visit[N];
int d[N];
int n;
int prim()
{
	int ans = 0;
	for (int i = 2; i <= n; i++)
		d[i] = maps[1][i];
	d[1] = 0;
	for (int i = 2; i <= n; i++)
	{
		int t = -1;
		for (int j = 2; j <= n; j++)
		{
			if (!visit[j])
				if (d[j] < d[t] || t == -1)
					t = j;
		}
		visit[t] = 1;
		ans += d[t];
		for (int j = 2; j <= n; j++)
			if (!visit[j])
				d[j] = min(d[j], maps[t][j]);
	}
	return ans;
}
int main() {
    while (cin >> n && n != 0) {
        memset(maps, 0x3f, sizeof(maps));
        memset(visit, 0, sizeof(visit));
        for (int i = 0; i < (n * (n - 1)) / 2; i++) {
            int a, b, c;
            cin >> a >> b >> c;
            maps[a][b] = c;
            maps[b][a] = c;
        }
        cout << prim()<< endl;
    }
    return 0;
}
```



