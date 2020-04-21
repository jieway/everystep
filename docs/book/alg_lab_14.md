
模拟：
* 1011 A+B 和 C
* 1016 部分A+B
* 1026 程序运行时间

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

## 1011 A+B 和 C
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
## 1012 数字分类
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
## 1016 部分A+B

[PAT-1016](https://pintia.cn/problem-sets/994805260223102976/problems/994805306310115328)

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

## 1026 程序运行时间 (15分)
[PAT-B1026](https://pintia.cn/problem-sets/994805260223102976/problems/994805295203598336)
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

## 1046 划拳
[PAT-B1046](https://pintia.cn/problem-sets/994805260223102976/problems/994805277847568384)

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

