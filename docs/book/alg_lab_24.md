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

# 并查集例题

## 1.0 模板！

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



## 2.0 模板！

[VJ-POJ-1611](https://vjudge.net/problem/POJ-1611)

题意是有一个人（编号为 0 ）感染了病毒，然后他还和别人接触了，需要统计他所在团队以及他所接触的人的团队的总人数。

```cpp
#include <iostream>
using namespace std;
int const N = 3e4 + 10;
int n, m;
int f[N];
void init() {
    for (int i = 0; i <= n; i++) {
        f[i] = i;
    }
}
int find(int x) {
    if (f[x] == x) return x;
    return f[x] = find(f[x]);
}
void unite(int x, int y) {
    int a = find(x);
    int b = find(y);
    if (a != b)
        f[a] = b;
}
int main() {
    while (cin >> n >> m && (n || m)) {
        init();
        while (m--) {
            int k, x, y;
            cin >> k >> x;
            for (int j = 1; j < k; j++) {
                cin >> y;
                unite(x, y);
            }
        }
        int p = 0;
        int f0 = find(0);
        for (int i = 0; i < n; i++) {
            if (find(i) == f0) {
                p++;
            }
        }
        cout << p << endl;
    }
    return 0;
}
```

## 3.0 模板！

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