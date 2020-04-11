---
title: 并查集
date: 2020-03-08
---

# 并查集是什么？

# 模板
## 初始化
首先需要初始化每一个节点的祖先。要根据实际情况来判断下标是从 0 开始还是从 1 开始。
```cpp
void init() {
    for(int i = 0; i < n; i++) {
        fa[i] = i;
    }
}
```
## 查找祖先
递归查找当前节点的祖宗。
```cpp
int find(int x) {
    return x == fa[x] ? x : find(fa[x]);
}
```
## 合并祖先
当找到祖先后就需要开始合并，如何合并？
```cpp
void union(int x , int y) {
    x = find(x);
    y = find(y);
    if ( x != y ) {
        fa[x] = y;
    } 
}
```
## 压缩路径

# 例题

## 1.0 模板题1
[畅通工程](http://acm.hdu.edu.cn/showproblem.php?pid=1232)
求无向图的连通分量，也就是子图的个数。
针对每一个节点进行连接，找到老祖，判断老祖的个数即可。
而有几个老祖就说明此图被分成了几部分。需要对这几部分再连通。
```cpp
/************************************
@File    :   HDU_1232.cpp
@Time    :   2020/03/08 00:22:09
@Author  :   jie wei 
@Version :   1.0
@Contact :   836678589@qq.com
@Desc    :   None
*************************************/
#include <iostream>
#define MAX_SIZE 1010
using namespace std;
int fa[MAX_SIZE];
int n, m;
void init() {
    for(int i = 1; i <= n; i++) {
        fa[i] = i;
    }
}
int find (int x) {
    return x == fa[x] ? x : find(fa[x]);
}
void sunion(int x ,int y) {
    x = find(x);
    y = find(y);
    if ( x != y) {
        fa[x] = y;
    }
}
int main() {
    int a , b;
    while (cin >> n >> m&& n != 0) {
        init();
        while(m--) {
            cin >> a >> b;
            sunion(a, b);
        }
        int total = 0;
        for(int i = 1; i <= n; i++) {
            if (fa[i] == i) {
                total++;
            }
        }
        printf("%d\n", total - 1);
    }
    return 0;   
}
```
## 2.0 模板题2

[The Suspects POJ - 1611 ](https://vjudge.net/problem/POJ-1611)

一次感染病，已知 0 号同学感染，将和 0 号同学相关的所有同学都挖出来，统计可能感染的数量。

注意输入，用 cin 超时了，

```cpp
/************************************
@File    :   POJ_1611.cpp
@Time    :   2020/03/08 17:15:39
@Author  :   jie wei 
@Version :   1.0
@Contact :   836678589@qq.com
@Desc    :   None
*************************************/
#include <iostream>
#define MAX_SIZE 30010
using namespace std;
int m, n;
int pre[MAX_SIZE];
int find (int x) {
    return x == pre[x] ? x : find(pre[x]);
}
void init (){
    for (int i = 0; i <= n; i++) {
        pre[i] = i;
    }
}
void unite(int x , int y) {
    x = find(x);
    y = find(y);
    if (x != y) {
        pre[x] = y;
    }
}
int main() {
    while ( scanf("%d%d",&n , &m) && (n || m) ) {
        init();
        while (m -- ) {
            int k , x ,y;
            scanf("%d%d", &k, &x);
            for(int i = 1; i < k; i++) {
                scanf("%d", &y);
                unite(x, y);
            }
        }
        int total = 0;
        int q = find(0);
        for(int i = 0; i < n; i++) {
            if(q == find(i)) {
                total++;
            }
        }
        cout << total << endl;
    }
}
```
## 3.0 模板题3

[How Many Tables HDU - 1213 ](https://vjudge.net/problem/HDU-1213)

遍历所有的元素，找到有几个 “祖宗” 就代表分成了几堆，就说明需要几个桌子。
祖宗就代表着 (pre[i] == i)
```cpp
/************************************
@File    :   HDU_1213.cpp
@Time    :   2020/03/08 19:17:31
@Author  :   jie wei 
@Version :   1.0
@Contact :   836678589@qq.com
@Desc    :   None
*************************************/
#include <iostream>
#define MAX_SIZE 1010
using namespace std;
int n, m;
int pre[MAX_SIZE];
void init() {
    for (int i = 1; i <= n ; i++) {
        pre[i] = i;
    }
}
int find(int x) {
    if(x != pre[x]) pre[x] = find(pre[x]);
    return pre[x];
}
void unite(int x, int y) {
    x = find(x);
    y = find(y);
    if (x != y) {
        pre[x] = y;
    }
}
int main() {
    int t;
    scanf("%d", &t);
    while(t--) {
        scanf("%d%d", &n , &m);
        init();
        while(m--) {
            int a , b ;
            scanf("%d%d", &a, &b);
            unite(a, b);
        }
        int total = 0;
        for (int i = 1; i <= n; i++) {
            if(find(i) == i) {
                total++;
            }
        }
        printf("%d\n", total);
    }
    return 0;
}
```
# 参考

- [1] 《趣学算法》
- [2] 
- [3] 