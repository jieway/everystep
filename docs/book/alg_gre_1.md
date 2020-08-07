## 1.1 ❤🧡💛

[VJ-HDU-2037](https://vjudge.net/problem/HDU-2037)

```cpp
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
## 1.2 ❤🧡💛
[Leetcode-435](https://leetcode-cn.com/problems/non-overlapping-intervals/)

和活动安排问题类似，将集合想象成活动，左右边界想象成起始时间，统计除最多能安排不冲突的集合，总集合个数减去最多的就说最少的需要去除的集合。

```cpp
class Solution {
public:
    // sort 中的 cmp 必须是静态的成员函数
    static bool cmp(vector<int> a , vector<int> b) {
        return a[1] < b[1];
    }
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), cmp);
        int s = intervals[0][1];
        int k = 1;
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] >= s) {
                k++;
                s = intervals[i][1];
            }
        }
        return intervals.size() - k;
    }
};
```

## 1.3 ❤🧡💛
[Leetcode-452](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)
和上一题类似，但是找到不相交的区间个数，这些不相交的区间必定要射出一支箭。

```cpp
class Solution {
public:
    static bool cmp(vector<int> a , vector<int> b) {
        return a[1] < b[1];
    }
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), cmp);
        if (points.size() == 0) return 0;
        int end = points[0][1];
        int sum = 1;
        for (int i = 1; i < points.size(); i++) {
            if (points[i][0] > end) {
                sum++;
                end = points[i][1];
            }
        }
        return sum;
    }
};
```
