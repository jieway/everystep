# 并查集 

首先明确输入数据的含义，开一个数组 f[n] 代表自己的师傅是谁。 

1. 单打独斗
自己自成一派，不需要靠别人。
```cpp
void init() {
    for (int i = 0; i < n; i++) {
        f[i] = i;
    }
}

```
2. 拜师学艺
发现自己实力不行需要于是找了一个师傅，如何知道自己师父是谁？需要记录到 f[n] 数组中，但是

这是一个递归的过程，找到一个不断的去寻找师傅的师傅，最终找到了师祖。

```cpp
int find(int x) {
    if (f[x] == x) {return x;}
    return find(f[x]); 
}
```

可以优化一下，找到师祖后自己直接拜到师祖门下。下次来查就不用那么麻烦了，一下就查到了师祖。

```cpp
int find(int x) {
    if (f[x] == x) {return x;}
    return f[x] = find(f[x]); 
}
```

3. 宗门合并
自己的宗门太弱了，和别的门派抱团取暖，合并后会更强大！

对方老大来谈判了，自己门派的老大也出现，二者查了一下祖先，发现不是一个门派的，然后交流了一下一致认为谁当老大都是当，更重要的是管理兄弟们。于是把自己的老大的位置指向了对方，这样两个门派就实现了合并。

```cpp
void unite(int a, int b) {
    int x = find(a);
    int y = find(b);
    if (x != y) {
        f[y] = x;
    }
}
```
## 压缩路径

# 例题

## 1.0 ❤🧡💛

[LG-P3367](https://www.luogu.com.cn/problem/P3367)

这是一道模板题，熟悉一下模板，注意如果不加路径合并会超时！

```c++
#include <iostream>
using namespace std;
int f[10010];
int n, m, x, y, z;
void init() {
    for (int i = 0; i < n; i++) {
        f[i] = i;
    }
}
int find(int x) {
    if (f[x] == x) {return x;}
    return f[x] = find(f[x]); 
}
void unite(int a, int b) {
    int x = find(a);
    int y = find(b);
    if (x != y) {
        f[y] = x;
    }
}
int main() {
    cin >> n >> m;
    init();
    for (int i = 0; i < m; i++) {
        cin >> z >> x >> y;
        if (z == 1) {
            unite(x,y);
        }else if (z == 2) {
            if(find(x) == find(y)) {
                cout << "Y" << endl;
            }else {
                cout << "N" << endl;
            }
        }
    }
        return 0;
}
```



## 2.0 ❤🧡💛
[畅通工程](http://acm.hdu.edu.cn/showproblem.php?pid=1232)
求无向图的连通分量，也就是子图的个数。
针对每一个节点进行连接，找到老祖，判断老祖的个数即可。
而有几个老祖就说明此图被分成了几部分。需要对这几部分再连通。
```cpp
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
## 3.0 ❤🧡💛

[VJ_HDU_1611](https://vjudge.net/problem/POJ-1611)

一次感染病，已知 0 号同学感染，将和 0 号同学相关的所有同学都挖出来，统计可能感染的数量。

注意输入，用 cin 超时了，

```cpp
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


## 4.0 ❤🧡💛

[VJ-HDU-1213](https://vjudge.net/problem/HDU-1213)
题意为熟悉的朋友之间可以做一张桌子，同时朋友的朋友也是朋友，需要多少张桌子。

压缩路径，都指向祖宗即可，最后找有几个祖宗。
```cpp
#include <iostream>
using namespace std;
int t , m , n;
int f[1030];
void init() {
    for (int i = 1; i <= m; i++) {
        f[i] = i;
    }
}
int find(int a) {
    if (a == f[a]) return a;
    return f[a] = find (f[a]);
}
void unite(int a, int b) {
    a = find (a);
    b = find (b);
    if (a != b) {
        f[a] = b;
    }
}
int main() {
    cin >> t;
    while (t--) {
        cin >> m >> n;
        init();
        for (int i = 0; i < n; i++) {
            int a, b;
            cin >> a >> b;
            unite(a, b);
        }
        int t = 0;
        for (int i = 1; i <= m; i++) {
            if (f[i] == i) {
                t++;
            }
        }
        cout << t << endl;
    }
    return 0;
}
```


## 5.0 ❤🧡💛💙
[Leetcode-547](https://leetcode-cn.com/problems/friend-circles)

```cpp
class Solution {
private:
    int f[210];
    void init() {
        for (int i = 0; i < 210; i++) {
            f[i] = i;
        }
    }
    int find(int x) {
        if (x == f[x])
            return x;
        return f[x] = find(f[x]);
    }
    void merge(int x, int y) {
        x = find(x);
        y = find(y);
        if (x != y) {
            f[x] = y;
        }
    }
public:
    int findCircleNum(vector<vector<int>>& M) {
        init();
        for (int i = 0; i < M.size(); i++) {
            for (int j = i + 1; j < M[0].size(); j++) {
                if (M[i][j]) {
                    merge(i , j);
                }
            }
        }
        int total = 0;
        for (int i = 0; i < M.size(); i++) {
            if (f[i] == i ) {
                total++;
            }
        }
        return total;
    }
};
```

## 6.0 ❤🧡💛💙

[Leetcode-684](https://leetcode-cn.com/problems/redundant-connection/)

这道题把题意搞清楚就行了，给你一个图，输入的过程中不断的判断输入的两个节点是否已经连通，如果已经连通那么就直接返回这条边即可，因为这条边冗余了。如果存在多条冗余边，就返回最后出现的那个边即可

```cpp
class Solution {
private:
    int f[1001];
    void init() {
        for(int i = 0 ; i < 1001; i ++) {
            f[i] = i;
        }
    }
    int find(int n) {
        if (f[n] == n) return n;
        return f[n] = find(f[n]);
    }
    bool unite(int x, int y) {
        x = find(x);
        y = find(y);
        if (x == y) return false;
        f[x] = y;
        return true;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        init();
        for(auto edge : edges) {
            if (unite(edge[0], edge[1]) == false) {
                return edge;
            }
        }
        return {};
    }
};
```
