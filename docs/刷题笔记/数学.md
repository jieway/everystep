## 1.0 三角形边长问题
[976. 三角形的最大周长](https://leetcode-cn.com/problems/largest-perimeter-triangle/)

### 思考
三个数字排序后下标必为连续.
假设升序 abcd ， 因为  b + c > a + b > d ，所以一定不存在 abd 的情况。
也就表明了三个数字下标必须连续。
三角形两边和大于第三边条件成立的同时两边差小于第三边也成立。

```java
class Solution {
    public int largestPerimeter(int[] A) {
        Arrays.sort(A);
        for (int i = A.length - 1; i >= 2; i--) {
            int a = A[i];
            int b = A[i -1];
            int c = A[i - 2];
            if (a < b + c) {
                return a + b + c;
            }
        }
        return 0;
    }
}
```

## 2.0 四平方和定理
[279. 完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

任意一个整数都可以表示成不超过四个数字的平方和。
且满足 n = 4^a * (8 * b + 7) 

### 思考

一共四种情况：
- 当完全整除时解为 4
- 如果剩余部分可以完全整除解为 1
- 剩余部分不能完全整除解为 2
- 以上都不满足时解为 3  

```java
class Solution {
    public int numSquares(int n) {
//        n = ( 4^a ) * ( 8*b + 7 )
//        先缩小问题的规模
        while(n % 4 == 0) {
            n /= 4;
        }
//       解为 4 的情况
        if (n % 8 == 7) {
            return 4;
        }
//      解为 1 / 2 的情况
        int a = 0;
        while ( a*a <= n ) {
            int b = (int) Math.sqrt( n - a*a);
            if ( a * a + b * b == n) {
                if (a != 0 && b != 0 ) {
                    return 2;
                }else {
                    return 1;
                }
            }
            a++;
        }
        return 3;
    }
}
```


