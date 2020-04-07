
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
注意范围
```cpp
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        long long int a, b, c;
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
## 