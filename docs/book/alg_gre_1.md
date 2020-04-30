# 1.1 ❤🧡💛

[VJ-HDU-2037](https://vjudge.net/problem/HDU-2037)

```c++
/**
 * 题目：HDU_2037_今年暑假不AC
 * 思路：按照结束的时间排序，越早结束看的节目越多
 * 来源：http://acm.hdu.edu.cn/showproblem.php?pid=2037
 * 结果：32219623	2020-01-20 18:53:49	Accepted	2037	0MS	1400K	656B	G++	weijiew
*/
#include <iostream>
#include <algorithm>
using namespace std;
struct tv{
    int s , e;
}a[110];
int cmp(tv a, tv b){
    return a.e == b.e ? a.s > b.s : a.e < b.e;
}
int main(){
    int n;
    while (cin >> n && n)
    {
        for (int i = 0; i < n; i++){
            cin >> a[i].s >> a[i].e;
        }
        
        sort(a , a + n, cmp); 
        int ans = 1 , t;
        t = a[0].e;
        for (int i = 1; i < n; i++){
            if (a[i].s >= t)
            {
                ans ++;
                t = a[i].e;
            }
            
        }
        cout << ans << endl;
    }
    
    return 0;
}
``` 
