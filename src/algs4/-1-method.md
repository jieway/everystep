# 方法论

**成绩（面试/比赛） = 实力 × 经验**

写题时存在的不确定性主要有以下几点：

1. 思路想通并且能够实现。  （编程能力强）
2. 能写出来，但是细节出错。（注意对拍，弥补细节错误）
3. 题目存在问题或者考点怪。         （自由发挥。面试的话和考官沟通交流）
5. 现场经验少      （多打比赛）

拿到题目后先短时间内浏览所有题目，将有思路的题目标记出来。

之后队每题仔细思考写法，对题目的难度做到心中有数。从而大致了解到自己能够做出来几道题目。

知道题目难度后就确定了做题顺序。首先先找到简单题，看完题目了解完细节后，解决它来维持稳定的 AC 。

将大部的时间花在难题上用来拔高分数。想不明白就先用暴力来判断范围，拿到一定数据点上相应的分数。

注意要将函数每一部分的功能做到最简化，各自负责相应的模块。然后集中精力 coding 每一部分的功能。

注意全局变量，修改的时候要避免牵一发而动全身，无法避免的话就要思考会影响到哪些部分，然后改掉！

做有用的题目，写水题毫无意义，题目数量不能衡量实力大小。

> 做题的目的是学到新的东西以及锻炼代码能力，而不是盲目刷OJ的rank，那没有任何意义。
> 提高算法能力（想出做法的能力，分析问题的方法等等）
> 提高代码能力（写出正确的代码的能力）
> 提高调试能力（将错误的代码改对的能力）

对于大部分问题而言都是套模型，将其转换为自己掌握的知识。所以日常刷题也是在不断熟悉模型，增加新模型。

想不出解法的题目要及时看题解。参考别人的代码可以快速进步。特别是一些细节方面的技巧。

优秀的代码风格能够极大的提高代码能力。

> 分析问题的方法是什么？

不是凭运气猜出做法，而是根据一定的思路从容的得出解法。

做题说白了就是建模和解决模型的过程。做不出来可能有两个原因，一个是模型建错了，一个是对模型了解不够。前者说明分析没有到位，后者说明知识不够扎实。

对各种模型有清楚的了解，这样才能轻松的做题，真正的高手不一定智商很高，但是建模能力一定很强。

1. 从简单的情况开始分析：经典方法，对原题没有思路，那么分析问题的简化版。

经典例子：找出字典序最小的解，那么我们先分析怎么找出一个解。

2. 人的思维很大程度上跟关键字有关系，比如一个题目怎么想都不会，有人跟你说“容斥”，你可能瞬间就会做了。不妨列出对于这类问题已知的一些解决方法关键字，思考思考能否做。

## 解决问题的流程

* 首先明确题意，理清思路，明确时空复杂度，再编写代码。明确题意后自己造数据，再编码。
* 良好的编码习惯。
* 样例测试，debug，测试数据。

# 算法模板

## 1. 快排

```cpp
void quick_sort(int q[], int l, int r) {
    if (l >= r) return; // 切记不是 > ，而是 >= 
    int x = q[l + r >> 1];
    int i = l - 1, j = r + 1,  // 因为 do while
    while (i < j) // 切记没有等于
    {
        do i ++ ; while (q[i] < x);
        do j -- ; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    quick_sort(q, l, j);
    quick_sort(q, j + 1, r);
}
```

🎯🎯🎯🎯

[912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/) 

> 只有开头带等号！

## 2. 归并

```cpp
void merge_sort(int q[], int l, int r)
{
    if (l >= r) return;

    int mid = l + r >> 1;
    merge_sort(q, l, mid);
    merge_sort(q, mid + 1, r);

    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r)
        if (q[i] <= q[j]) tmp[k ++ ] = q[i ++ ];
        else tmp[k ++ ] = q[j ++ ];

    while (i <= mid) tmp[k ++ ] = q[i ++ ];
    while (j <= r) tmp[k ++ ] = q[j ++ ];

    for (i = l, j = 0; i <= r; i ++, j ++ ) q[i] = tmp[j];
}
```

🎯🎯

[912. 排序数组](https://leetcode-cn.com/problems/sort-an-array/) 

> 不论大于还是小于都带等号！


## 3. 高精度加法

```cpp
// C = A + B, A >= 0, B >= 0
vector<int> add(vector<int> &A, vector<int> &B)
{
    if (A.size() < B.size()) return add(B, A);

    vector<int> C;
    int t = 0;
    for (int i = 0; i < A.size(); i ++ )
    {
        t += A[i];
        if (i < B.size()) t += B[i];
        C.push_back(t % 10);
        t /= 10;
    }

    if (t) C.push_back(t);
    return C;
}
```



* [Add Binary](https://leetcode-cn.com/problems/add-binary/) 🎯🎯🎯
* [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/) 🎯
* [445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/)

415. 字符串相加
66. 加一
989. 数组形式的整数加法

## 高精度减法

```cpp
// C = A - B, 满足A >= B, A >= 0, B >= 0
vector<int> sub(vector<int> &A, vector<int> &B)
{
    vector<int> C;
    for (int i = 0, t = 0; i < A.size(); i ++ )
    {
        t = A[i] - t;
        if (i < B.size()) t -= B[i];
        C.push_back((t + 10) % 10);
        if (t < 0) t = 1;
        else t = 0;
    }

    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}
```

## 高精度乘低精度

```cpp
// C = A * b, A >= 0, b >= 0
vector<int> mul(vector<int> &A, int b)
{
    vector<int> C;

    int t = 0;
    for (int i = 0; i < A.size() || t; i ++ )
    {
        if (i < A.size()) t += A[i] * b;
        C.push_back(t % 10);
        t /= 10;
    }

    while (C.size() > 1 && C.back() == 0) C.pop_back();

    return C;
}
```

[Multiply Strings](https://leetcode-cn.com/problems/multiply-strings/)

## 高精度除低精度

```cpp
// A / b = C ... r, A >= 0, b > 0
vector<int> div(vector<int> &A, int b, int &r)
{
    vector<int> C;
    r = 0;
    for (int i = A.size() - 1; i >= 0; i -- )
    {
        r = r * 10 + A[i];
        C.push_back(r / b);
        r %= b;
    }
    reverse(C.begin(), C.end());
    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}
```

## 3. 二分

```cpp
bool check(int x) {/* ... */} // 检查x是否满足某种性质

// 区间[l, r]被划分成[l, mid]和[mid + 1, r]时使用：
int bsearch_1(int l, int r)
{
    while (l < r)
    {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;    // check()判断mid是否满足性质
        else l = mid + 1;
    }
    return l;
}
// 区间[l, r]被划分成[l, mid - 1]和[mid, r]时使用：
int bsearch_2(int l, int r)
{
    while (l < r)
    {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    return l;
}
```

浮点数二分

```cpp
bool check(double x) {/* ... */} // 检查x是否满足某种性质

double bsearch_3(double l, double r)
{
    const double eps = 1e-6;   // eps 表示精度，取决于题目对精度的要求
    while (r - l > eps)
    {
        double mid = (l + r) / 2;
        if (check(mid)) r = mid;
        else l = mid;
    }
    return l;
}
```


一维前缀和

```cpp
    S[i] = a[1] + a[2] + ... a[i]
    a[l] + ... + a[r] = S[r] - S[l - 1]
```

二维前缀和 

```cpp
S[i, j] = 第i行j列格子左上部分所有元素的和
以(x1, y1)为左上角，(x2, y2)为右下角的子矩阵的和为：
S[x2, y2] - S[x1 - 1, y2] - S[x2, y1 - 1] + S[x1 - 1, y1 - 1]
```

一维差分 

```cpp
给区间[l, r]中的每个数加上c：B[l] += c, B[r + 1] -= c
```

二维差分

```cpp
给以(x1, y1)为左上角，(x2, y2)为右下角的子矩阵中的所有元素加上c：
S[x1, y1] += c, S[x2 + 1, y1] -= c, S[x1, y2 + 1] -= c, S[x2 + 1, y2 + 1] += c
```

位运算

```cpp
求n的第k位数字: n >> k & 1
返回n的最后一位1：lowbit(n) = n & -n
```

双指针算法

```cpp
for (int i = 0, j = 0; i < n; i ++ )
{
    while (j < i && check(i, j)) j ++ ;

    // 具体问题的逻辑
}
常见问题分类：
    (1) 对于一个序列，用两个指针维护一段区间
    (2) 对于两个序列，维护某种次序，比如归并排序中合并两个有序序列的操作
```


离散化

```cpp
vector<int> alls; // 存储所有待离散化的值
sort(alls.begin(), alls.end()); // 将所有值排序
alls.erase(unique(alls.begin(), alls.end()), alls.end());   // 去掉重复元素

// 二分求出x对应的离散化的值
int find(int x) // 找到第一个大于等于x的位置
{
    int l = 0, r = alls.size() - 1;
    while (l < r)
    {
        int mid = l + r >> 1;
        if (alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return r + 1; // 映射到1, 2, ...n
}
```

区间合并

```cpp
// 将所有存在交集的区间合并
void merge(vector<PII> &segs)
{
    vector<PII> res;

    sort(segs.begin(), segs.end());

    int st = -2e9, ed = -2e9;
    for (auto seg : segs)
        if (ed < seg.first)
        {
            if (st != -2e9) res.push_back({st, ed});
            st = seg.first, ed = seg.second;
        }
        else ed = max(ed, seg.second);

    if (st != -2e9) res.push_back({st, ed});

    segs = res;
}
```