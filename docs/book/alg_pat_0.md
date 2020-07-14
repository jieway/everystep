# 简单模拟

## 导航

A 代表甲级，B 代表乙级



## B1001

[1001 害死人不偿命的(3n+1)猜想 (15分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805325918486528)

直接模拟即可

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n, k = 0;
    cin >> n;
    while (1) {
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = (3 * n + 1) / 2;
        }
        k++;
        if (n == 1) {
            break;
        }
    }
    cout << k << endl;
    return 0;
}
```

## B1011

[1011 A+B 和 C (15分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805312417021952)

注意范围，int 的范围是 [-2^32,2^31-1] 题目中两数相加后的范围则是 [-2^63,2^63] 所以 int 装不下，为了防止溢出，采用 long long 。

**总结：**

int：所占字节数为:4， 一个字节八位，所以一共 32 位，而每位只能表示 0/1 两种情况，所以一共可以表示[-2^32,-2^31-1]个数字，即表示范围为：-2147483648~2147483647 。

short int：所占字节数为:2，表示范围为：-32768~32767

long：所占字节数为:4，表示范围为：-2147483648~2147483647

long long：所占字节数为:8，表示范围为：9223372036854775808~9223372036854775807

**拓展：**

long 和 int 的区别，在 16 位系统下，int 和 short 相等都是两个字节，但是在 32 位系统下 int 和 long 相等，都是 4 个字节，但是到了 64 位系统上， long 变成了 64 个字节。理论上是这样，但是实际上是编译器来控制的！

总之， int 介于 short 和 long 之间。遵守以下规定：short与int类型至少为16位，long类型至少为32位，并且short类型不得长于int类型，而int类型不得长于long类型。



```cpp
#include <iostream>
using namespace std;
int main() {
    long long n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        long long  a, b, c;
        cin >> a >> b >> c;
     printf("Case #%d: %s\n", i + 1, a + b > c ? "true" : "false");
    }
    return 0;
}
```






## B1016

[1016 部分A+B (15分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805306310115328)

* 数字各个位数数字拆解，拆的过程中比对，然后叠加。

```cpp
#include <iostream>
using namespace std;
int main() {
    int a, a1, b, b1;
    cin >> a >> a1 >> b >> b1;
    int a2 = 0, b2 = 0;
    while (a!=0) {
        if (a % 10 == a1) {
            a2 = a2 * 10 + a % 10;
        }
        a /= 10;
    }
    while (b!=0) {
        if (b % 10 == b1) {
            b2 = b2 * 10 + b % 10;
        }
        b /= 10;
    }
    cout << a2 + b2 << endl;
    return 0;
}
```

## B1026

[1026 程序运行时间 (15分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805295203598336)

* 注意需要四舍五入！

```cpp
#include <iostream>
using namespace std;
int main() {
    int c1, c2;
    cin >> c1 >> c2;
    int k = (c2 - c1);
    if (k % 100 >= 50) {
        k = k/100 + 1;
    }else {
        k = k / 100;
    }
    printf("%02d:%02d:%02d\n", k / 3600, k % 3600 / 60, k % 60);
    return 0;
}
```



## B1046

[1046 划拳 (15分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805277847568384)

* 注意是谁输了谁喝酒。

```cpp
#include <iostream>
using namespace std;
int main() {
    int t , a , b, c, d;
    int p = 0, q = 0;
    cin >> t;
    while (t--) {
        cin >> a >> b >> c >> d;
        if (a + c == b && a + c != d) {
            p++;
        }
        if (a + c != b && a + c == d) {
            q++;
        }
    }
    cout << q << " " << p << endl;
    return 0;
}
```



## B1012
[1012 数字分类 (20分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805311146147840)

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, num, A1 = 0, A2 = 0, A5 = 0;
    double A4 = 0.0;
    cin >> n;
    vector<int> v[5];
    for (int i = 0; i < n; i++) {
        cin >> num;
        v[num%5].push_back(num);
    }
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < v[i].size(); j++) {
            if (i == 0 && v[i][j] % 2 == 0) A1 += v[i][j];
            if (i == 1 && j % 2 == 0) A2 += v[i][j];
            if (i == 1 && j % 2 == 1) A2 -= v[i][j];
            if (i == 3) A4 += v[i][j];
            if (i == 4 && v[i][j] > A5) A5 = v[i][j];
        }
    }
    for (int i = 0; i < 5; i++) {
        if (i != 0) printf(" ");
        if (i == 0 && A1 == 0 || i != 0 && v[i].size() == 0) {
            printf("N"); continue;
        }
        if (i == 0) printf("%d", A1);
        if (i == 1) printf("%d", A2);
        if (i == 2) printf("%d", v[2].size());
        if (i == 3) printf("%.1f", A4 / v[3].size());
        if (i == 4) printf("%d", A5);
    }
    return 0;
}
```


## B1018

[1018 锤子剪刀布 (20分)](https://pintia.cn/problem-sets/994805260223102976/problems/994805304020025344)

```cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    int win[3] = {0};
    int aw[3] = {0};
    int bw[3] = {0};
    char op[3] = {'B','C','J'};
    char a, b;
    cin >> n;
    // 石头 C 石头
    // 剪子 J 剪子
    // 布  B  布
    while (n--) {
        cin >> a >> b;
        if (a == b) {
            win[1]++;
        }
        if (a == 'B' && b == 'C') {
            win[0]++;
            aw[0]++;
        }else if (a == 'C' && b == 'J') {
            win[0]++;
            aw[1]++;
        }else if (a == 'J' && b == 'B') {
            win[0]++;
            aw[2]++;
        }else if (b == 'B' && a == 'C') {
            win[2]++;
            bw[0]++;
        }else if (b == 'C' && a == 'J') {
            win[2]++;
            bw[1]++;
        }else if (b == 'J' && a == 'B') {
            win[2]++;
            bw[2]++;
        }
    }
        cout << win[0] << " " << win[1] << " " << win[2] << endl;
        cout << win[2] << " " << win[1] << " " << win[0] << endl;
        int p = aw[0] >= aw[1] ? 0 : 1;
        p = aw[p] >= aw[2] ? p : 2;
        int q = bw[0] >= bw[1] ? 0 : 1;
        q = bw[q] >= bw[2] ? q : 2;
        cout << op[p] << " " << op[q];
    return 0;
}
```





## A1042
[1042 Shuffling Machine (20分)](https://pintia.cn/problem-sets/994805342720868352/problems/994805442671132672)


```cpp
```

## A1046

[1046 Shortest Distance (20分)](https://pintia.cn/problem-sets/994805342720868352/problems/994805435700199424)

* 下面是简单思考的写法，注意要将数组开大并且题目没有保证左节点大于右节点，所以需要加上一个判断。
* 直接模拟就行了。这道题对时间的限制是 200 ms 。如果限制在 100 ms 之内，这个写法就过不去了，因为最后一个样例是 151 ms 会超时。

```cpp
#include <iostream>
#include <cmath>
using namespace std;
int a[100005];
int main() {
    int n , m , p , q;
    int sum = 0;
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        sum += a[i];
    }
    cin >> m;
    while (m--) {
        cin >> p >> q;
        int aum = 0;
        if (p > q) {
            int t = p;
            p = q;
            q = t;
        }
        for (int i = p-1; i < q-1; i++) {
            aum += a[i];
        }
        cout << min(aum, sum - aum) << endl;
    }
    return 0;
}
```
* 可以对上面的写法进行优化，将前 n 个数的和存起来，查的时候直接减去就可以得到区间和，也就是不需要在区间之上再去遍历了。
* 这样使得耗时减少到了 75 ms


```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;
int a[100005];
int dis[100005];
int main() {
    int n , m , p , q;
    int sum = 0;
    cin >> n;
    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        dis[i] += a[i];
        dis[i] = sum;
    }
    cin >> m;
    while (m--) {
        cin >> p >> q;
        if (p > q) {
            swap(p,q);
        }
        int aum = dis[q - 1] - dis[p - 1];
        cout << min(aum, sum - aum) << endl;
    }
    return 0;
}
```

## A1065

[1065 A+B and C (64bit) (20分)](https://pintia.cn/problem-sets/994805342720868352/problems/994805406352654336)

* 三个整数，直接判断果不其然出错了。
* 仔细观察数据范围发现，long long 的范围 $[-2^63,2^63)$ ，那么两个正整数相加后可能会出现整数越界的情况。同理负整数也是。
* a/b 的最大取值为 $2^63 - 1$ ， 那么 $a+b$ 的最大值为 $2*(2^63-1)$ ，也就是 $2^64-2$ 这个数字已经超过了 long long ，发生了正向溢出。
* 同理 a/b 的最小值为 $-2^63$ 那么 $a+b$ 为 $-2^64$ 此时也超出了 long long 的范围。
* 因为计算机中的数据构成存在范围。可以想象成圆环，最大值和最小值紧密相连，超出后就是最小值了。
* 反之最小值超出后就是最大值了。
* 所以当正向越界情况出现时 ，$a + b < 0$  反之负向溢出 则是 $a + b >= 0$

```cpp
#include <iostream>
using namespace std;
int main() {
    int n , i = 1;
    long long a, b, c;
    cin >> n;
    while (n--) {
        cin >> a >> b >> c;
        long long sum = a + b;
        if ( a > 0 && b > 0 && sum < 0) {
            cout << "Case #" << i << ": " << "true" << endl;
        }else if (a < 0 && b < 0 && sum >= 0) {
            cout << "Case #" << i << ": " << "false" << endl;               
        } else if (sum > c) {
            cout << "Case #" << i << ": " << "true" << endl;
        }else {
            cout << "Case #" << i << ": " << "false" << endl;
        }
        i++;
    }    
    return 0;
}
```



## 1006 换个格式输出整数

看了柳神的题解后没想到这么简洁。

```cpp
#include <iostream>
using namespace std; 
int main () {
    int a , i =0;
    int b[3] = {0};
    cin >> a;
    while (a != 0) {
        b[i++] = a % 10;
        a /= 10;
    }
    for (int j = 0; j < b[2]; j ++) {
        cout << "B";
    }
    for (int j = 0; j < b[1]; j ++) {
        cout << "S";
    }
    for (int j = 0; j < b[0]; j ++) {
        cout << j+1;
    }
    cout << endl;
    return 0;
}
```

## 1007 素数对猜想
注意素数优化，小心超时！
```cpp
#include <iostream>
#include <cmath>
using namespace std;
bool prime(int x) {
    for (int i = 2; i <= sqrt(x); i++) {
        if ( x % i == 0 ){
            return false;
        }
    }
    return true;
}
int main() {
    int n , index = 0;
    cin >> n;
    int start = 2;
    for (int i = 3; i <= n; i++) {
        if (prime(i)==true)
        {
            if (i - start == 2)
            {
                index++;
            }
            start = i;
            cout << i << endl;
        }
    }
    cout << index;
    return 0;
}
```

## 1008 数组元素循环右移问题

在输入的时候直接输入对应的下标即可，注意 m > n 的情况。

```cpp
#include <iostream>
using namespace std;
int main() {
    int a[110];
    int n, m;
    cin >> n >> m;
    m = m % n;
	for (int i = m; i < n; i ++) {
            cin >> a[i];
    }
    for (int i = 0 ; i < m ; i ++) {
    	cin >> a[i];
	}
    for (int j = 0; j < n; j ++) {
        if (j < n-1) {
            cout << a[j] << " ";
        }else {
            cout << a[j] << endl;
        }
    }
    return 0;
}
```

## 1010 一元多项式求导
注意零多项式的情况。
```cpp
#include <iostream>
using namespace std;
int main() {
    int a, b;
    int c = 0;
    while (cin >> a >> b){
        if (b == 0) break;
        if (c == 0) {        
            cout << a * b << " " << b - 1;
            c = 1;
        }else {
            cout << " " << a * b << " " << b - 1;
        }
    }
    if ( c == 0 ) {
        cout << 0 << " " << 0 << endl;
    }
    return 0;
}
```

## 1013 数素数
注意输出格式！
```cpp
#include <iostream>
#include <cmath>
using namespace std;
bool prime(int a) {
    for (int i = 2; i <= sqrt(a); i++) {
        if (a % i == 0)
        {
            return false;
        }
    }
    return true;
}
int main() {
    int n, m;
    int k = 0 , cnt = 0;
    cin >> n >> m;
    for (int i = 2; ;i++) {
        if (prime(i)) {
            k ++;
            if (k >= n && k <= m){
                cnt++;
                if (cnt % 10 != 1 ){
                    cout << " ";
                }
                cout << i;
                if (cnt % 10 == 0){
                    cout << endl;
                }
            }
            if (k > m){
                break;
            }
        }
    }
    return 0;
}
```


