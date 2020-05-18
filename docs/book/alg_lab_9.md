# set

## 1. 求并集
```cpp
/**
 * 题目：HDU_1412_{A} + {B}
 * 来源：http://acm.hdu.edu.cn/showproblem.php?pid=1412
 * 思路：直接用 set 去重即可。
 * 结果：32549005	2020-02-20 20:06:43	Accepted	1412	62MS	2372K	625 B	G++	weijiew 
*/
#include <iostream>
#include <set>
using namespace std;
int main() {
    int m , n;
    int val;
    set<int> result;
    while (cin >> m >> n) {
        result.clear();
        for (int i = 0; i < m + n; i++) {
            cin >> val;
            result.insert(val);
        }
        bool flag = true;
        for (set<int>::iterator it = result.begin(); it != result.end(); it++) {
            if (flag)
            {
                cout << *it;
                flag = false;
            }else{
                cout <<" "<<*it;
            }
        }
        cout << endl;
    }
    return 0;
}
```

## 2. 求

