## 633. 平方数之和

[Leetcode-633](https://leetcode-cn.com/problems/sum-of-square-numbers/) / [力扣-633](https://leetcode-cn.com/problems/sum-of-square-numbers/)

注意边界条件，存在左指针等于右指针的情况，例如 $1^2 + 1^2 == 2$ 的情况。

还要注意是从非负整数开始，也就是左边界从零开始。例如 $0^2 + 2^2 = 4$ 的情况。

cpp 采用 int 存中间值会溢出，改成 long long 搞定。

注意 `pow(i,2)` 比直接相乘 `i*i` 有一定程度的优化。

```cpp
class Solution {
public:
    bool judgeSquareSum(int c) {
        int  i = 0, j = sqrt(c);
        while (i <= j) {
            long long sum = pow(i,2) + pow(j,2);
            if (sum == c) {
                return true;
            }else if (sum < c){
                i++;
            }else {
                j--;
            }
        }
        return false;
    }
};
```

Java 版

```java
class Solution {
    public boolean judgeSquareSum(int c) {
        int i = 0 , j = (int)Math.sqrt(c);
        while(i <= j ) {
            int temp = i*i+ j*j;
            if ( temp == c ) {
                return true;
            }else if (temp < c) {
                i++;
            }else {
                j--;
            }
        }
        return false;
    }
}
```
