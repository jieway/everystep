
# 69. x 的平方根

[Leetcode](https://leetcode.com/problems/sqrtx/description/) / [力扣](https://leetcode-cn.com/problems/sqrtx/description/)

注意数据相乘会导致溢出的问题。

```cpp
class Solution {
public:
    int mySqrt(int x) {
        int i = 0, j = x;
        while (i <= j) {
            long mid = i + (j - i) / 2;
            long long temp = mid * mid;
            if (temp == x) {
                return mid;
            }else if (temp < x) {
                i = mid + 1;
            }else {
                j = mid - 1;
            }
        }
        return j;
    }
};
```