## 1.0 ✅

[leetcode-01](https://leetcode-cn.com/problems/two-sum/)

先暴力写后面优化！

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> a;
        for (int i = 0; i < nums.size() - 1; i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    a.push_back(i);
                    a.push_back(j);
                    break;
                }
            }
        }
        return a;
    }
};
```


## 1.0 

[LUOGU-P1980](https://www.luogu.com.cn/problem/P1980)

### 题意
统计一段数字中某个数字出现的次数，数字拆分。

### AC

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n, x, cnt = 0;
    cin >> n >> x;
    for (int i = 1; i <= n; i++)
    {
        int k = i;
        while (k != 0)
        {
            if (x == k % 10)
            {
                cnt++;
            }
            k /= 10;
        }
    }
    cout << cnt << endl;
    return 0;
}
```

## P1567 统计天数

[戳我](https://www.luogu.com.cn/problem/P1567)

### 题意
连续的最长上升序列。
### AC
这道题的分类是数组，可以不用数组，输入直接模拟即可。
```cpp
#include <iostream>
using namespace std;
int max(int a, int b)
{
    return a > b ? a : b;
}
int main()
{
    int n, b, start, k = 0, c = 0;
    cin >> n;
    cin >> start;
    for (int i = 1; i < n; i++)
    {
        cin >> b;
        if (b > start)
        {
            k++;
            c = max(c, k);
        }
        else
        {
            k = 0;
        }
        start = b;
    }
    cout << c + 1 << endl;
    return 0;
}
```

## P1047 校门外的树

[戳我](https://www.luogu.com.cn/problem/P1047)
### 题意
题目有点长，注意细节，两头都是闭区间，直接模拟即可。种树的区域标记，没有种树的区间剔除，最后在判断。
### AC
```cpp
#include <iostream>
#define MAX_SIZE 10010
using namespace std;
int a[MAX_SIZE];
int main()
{
    int l, m, p, q;
    cin >> l >> m;
    for (int i = 0; i <= l; i++)
    {
        a[i] = 0;
    }
    for (int i = 0; i < m; i++)
    {
        cin >> p >> q;
        for (int j = p; j <= q; j++)
        {
            a[j] = 1;
        }
    }
    int cnt = 0;
    for (int i = 0; i <= l; i++)
    {
        if (a[i] == 0)
        {
            cnt++;
        }
    }
    cout << cnt << endl;
    return 0;
}
```

## P1427 小鱼的数字游戏
[戳我](https://www.luogu.com.cn/problem/P1427)

### 题意
反转数组即可，没有表明数组长度，以零结尾，注意下标范围即可。
### AC
```cpp
#include <iostream>
#define MAX_SIZE 110
using namespace std;
int a[MAX_SIZE];
int main()
{
    int n, i = 0;
    while (1)
    {
        cin >> n;
        if (n == 0)
            break;
        a[i++] = n;
    }
    for (int j = i - 1; j > 0; j--)
    {
        cout << a[j] << " ";
    }
    cout << a[0] << endl;
    return 0;
}
```

## P1428 小鱼比可爱
[戳我](https://www.luogu.com.cn/problem/P1428)
### 题意
回溯即可，注意格式，统计已经输入的数字比当前数字大的个数。
### AC
```cpp
#include <iostream>
#define MAX_SIZE 110
using namespace std;
int a[MAX_SIZE];
int main()
{
    int n, cnt;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
        int j = i;
        cnt = 0;
        while (j != -1)
        {
            if (a[i] > a[j])
            {
                cnt++;
            }
            j--;
        }
        if (i < n - 1)
        {
            cout << cnt << " ";
        }
        else
        {
            cout << cnt << endl;
        }
    }
    return 0;
}
```

## P2141 珠心算测验
[戳我](https://www.luogu.com.cn/problem/P2141)
### 题意
一列数字，任意两个数字相加的结果
### AC
```cpp
#include <iostream>
#define MAX_SIZE 200005
using namespace std;
int a[105], b[MAX_SIZE], g[MAX_SIZE];
int main()
{
    int n, ans = 0;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
        g[a[i]] = 1;
    }
    int m = 0;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            b[a[i] + a[j]]++;
            m = max(m, a[i] + a[j]);
        }
    }
    for (int i = 0; i < MAX_SIZE; i++)
    {
        if (b[i] > 0 && g[i])
        {
            ans++;
        }
    }
    cout << ans << endl;
    return 0;
}
```


## P1055 ISBN号码

[戳我](https://www.luogu.com.cn/problem/P1055)
### 题意
如题
### AC

'0' = 48

```cpp
#include <iostream>
using namespace std;
int main()
{
    char mod[12] = "0123456789X";
    char a[14];
    int sum = 0;
    int k = 1;
    scanf("%s", &a);
    for (int i = 0; i < 12; i++)
    {
        if (a[i] == '-')
        {
            continue;
        }
        sum += (a[i] - '0') * k;
        k++;
    }
    if (mod[sum % 11] == a[12])
    {
        cout << "Right";
    }
    else
    {
        a[12] = mod[sum % 11];
        printf("%s", a);
    }
    return 0;
}
```





## P1200 [USACO1.1]你的飞碟在这儿Your Ride Is Here
[戳我](https://www.luogu.com.cn/problem/P1200)
### 题意
注意两个字符的长度不一定非得是 6 ，而是小于 6,用string很方便
### AC

```cpp
#include <iostream>
using namespace std;
int main()
{
    string a, b;
    int num = 1;
    int aum = 1;
    cin >> a >> b;
    for (int i = 0; i < a.length(); i++)
    {
        num *= a[i] - 'A' + 1;
    }
    for (int i = 0; i < b.length(); i++)
    {
        aum *= b[i] - 'A' + 1;
    }
    if (num % 47 == aum % 47)
    {
        cout << "GO" << endl;
    }
    else
    {
        cout << "STAY" << endl;
    }
    return 0;
}
```


# 知识记录

1. fabs(-1.02) = 1.02 , abs(-1.02) = 1 , abs 返回先取绝对值后再取整，fabs 返回取绝对值
2. int gcd(int x, int y) { return gcd(y,x%y);}
3.  取整函数：
 ceil(1.499) = 2;有余数，整数加一，不小于这个数的整数。double型
 floor(1.499)=1;有余数就抹掉，不大于这个数的整数。
 round(1.499)=1;四舍五入



# 参考
[1]《算法竞赛入门到进阶》




