# 字符串匹配
## KMP 算法
算法导论。
## 1.0 模板题

[Number Sequence](http://acm.hdu.edu.cn/showproblem.php?pid=1711)
### 思考
模板题， 注意 next 数组命名 ，如果命名为 next 会编译错号，原因是和库中函数重名。
还有，用 c++ 提交大概 3600 ms 可以过去， 但是 gcc 超时。

```cpp
#include <iostream>
#define MAX_SIZE_t 1000010
#define MAX_SIZE_p 10010
using namespace std;
int Next[MAX_SIZE_p];
int t[MAX_SIZE_t];
int p[MAX_SIZE_p];
void getNext(int pLen) {
    int i = -1;
    int j = 0;
    Next[0] = -1;
    while ( j < pLen-1 ) {
        if (i < 0 || p[i] == p[j])
        {
            i++;
            j++;
            Next[j] = i;
        }else{
            i = Next[i];
        }
        
    }
}
int KMP(int tLen , int pLen){
    int i = 0;
    int j = 0;
    while ( i < tLen  && j < pLen ) {
        if (j == -1 || t[i] == p[j] ) {
            i++ , j++;
        }else{
            j = Next[j];
        }
    }
    if ( j == pLen ) {
        return i - j + 1;
    }else{
        return -1;
    }
}
int main() {
    int n , a , b ;
    cin >> n;
    while ( n-- ) {
        cin >> a >> b;
        for ( int i = 0; i < a ; i++ ) {
            cin >> t[i];
        }
        for ( int j = 0; j < b; j++ ) {
            cin >> p[j];
        }
        getNext(b);
        int index = KMP(a, b);
        cout << index << endl;
    }
    return 0;
}
```



## 2.0 