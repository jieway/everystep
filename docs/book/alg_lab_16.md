> 动态规划的核心是数学归纳法！
最优子结构：问题的最优解包含着子问题的最优解。也就是通过子问题的最优解得到问题的最优解！


# 1.0 最长公共子序列

什么是序列？什么是子序列？区别是什么？ 

序列必须连续，子序列可以连续也可以不连续！

最长公共子序列 ，即 LCS（Longest Common Subsequence）。用在什么地方？假如小明怀疑自己的儿砸和隔壁老王长得很像，然后小明去做 DNA 鉴定了，很明显需要比对小明和儿砸两条 DNA 的相似程度，而相似度越高来源于两条 DNA 链的公共部分，公共部分多则相似度高，反之比较低！

## 1.1 练手！

[Leetcode_1143](https://leetcode-cn.com/problems/longest-common-subsequence/)

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m+1][n+1];
        for (int i = 1 ; i <= m ; i ++) {
            for (int j =1 ; j <= n ; j ++) {
                if (text1.charAt(i-1) == text2.charAt(j-1)) {
                    dp[i][j] = Math.max(dp[i - 1][j - 1] , dp[i - 1][j - 1] + 1); 
                }else {
                    dp[i][j] = Math.max(dp[i-1][j] , dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
}
```

## 1.2 熟悉！

[VJ_HDU_1159](https://vjudge.net/problem/HDU-1159)

和上一题一样。

```cpp
#include <iostream>
#include <cstring>
#include <cmath>
using namespace std;
string a, b;
int dp[1010][1010];
int main() {
    while(cin >> a >> b) {
        int m = a.length();
        int n = b.length();
        memset(dp, 0, sizeof(dp));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (a[i - 1] == b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                }else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        cout << dp[m][n] << endl;
    } 
    return 0;
}
```

## 1.3 变换！

[VJ_51Nod-1006](https://vjudge.net/problem/51Nod-1006)

这道题同样是求 LCS 但是增加了需要把路径打印出来！

如何将路径打印出来，仔细想一下，问题就变成了将两个字符串相同的字符打印出来，字符相同就是 `dp[i - 1][j - 1] + 1` 的状态。把 dp 表输出看一下，看一下路径变换的规律就可以实现了。

```cpp
#include <iostream>
#include <cstring>
#include <cmath>
using namespace std;
int dp[1010][1010];
char a[1010], b[1010], c[1010];
void lcs(int m, int n) {
    for (int i = 1; i <= m; i ++) {
        for (int j = 1; j <= n; j ++) {
            if (a[i - 1] == b[j - 1]) {
                dp [i][j] = dp[i - 1][j - 1] + 1;
            }else {
                dp [i][j] = max (dp [i - 1][j] , dp [i][j - 1]);
            }
        }
    }
}
void path(int m, int n) {
    int i = m;
    int j = n;
    int k = 0;
    memset(c, 0, sizeof(c));
    while (i != 0 && j != 0) {
        if (a[i - 1] == b[j - 1]) {
            c[k++] = a[--i];
            j--;
        }else if (dp[i - 1][j] <= dp[i][j - 1] ) {
            j--;
        }else if (dp[i - 1][j] > dp[i][j - 1] ) {
            i--;
        }
    }
    for (int i = k - 1; i >= 0; i--) {
        cout << c[i];
    }
    cout << endl;
}
int main() {
    while (cin >> a >> b) {
        int m = strlen(a);
        int n = strlen(b);
        memset(dp , 0, sizeof(dp));
        lcs(m , n);
        path(m , n);
    }    
    return 0;
}
```

在提供一种打印路径的思路，用递归的思想，相对好理解一些，把递归树画一遍后就明白了！

```cpp
void print (int i , int j) {
    if(i == 0 || j == 0)return;
    if (map[i][j] == 0) {
        print(i - 1, j - 1);
        cout << b[j - 1];
    }else if (map[i][j] == 1) {
        print(i - 1, j);
    }else  {
        print(i, j - 1);
    }
}
```


## 1.4 进阶！

路径打印技巧！

[VJ_HDU_1503](https://vjudge.net/problem/HDU-1503)

```cpp
#include <iostream>
#include <cstring>
using namespace std;
char a[1010], b[1010];
int dp[1010][1010];
int map[1010][1010];
void lcs(int m, int n) {
    for (int i = 0; i <= m; i++) {
        map[i][0] = 1;
    }
    for (int j = 0; j <= n; j++) {
        map[0][j] = -1;
    }
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (a[i - 1] == b[j - 1])
                {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    map[i][j] = 0;
                }
                else if (dp[i - 1][j] >= dp[i][j - 1])
                {
                    dp[i][j] = dp[i - 1][j];
                    map[i][j] = 1;
                }
                else
                {
                    dp[i][j] = dp[i][j - 1];
                    map[i][j] = -1;
                }
            }
        }
}
void print(int i, int j) {
    if (!i && !j) return;
    if (map[i][j] == 0) {
        print(i - 1, j - 1);
        cout << a[i - 1];
    }else if (map[i][j] == 1) {
        print(i - 1, j);
        cout << a[i - 1];
    }else {
        print(i, j - 1);
        cout << b[j - 1];
    }
}
int main() {
    while (cin >> a >> b) {
        memset(dp, 0, sizeof(dp));
        memset(map, 0, sizeof(map));
        int m = strlen(a);
        int n = strlen(b);
        lcs(m, n);
        print(m, n);
        cout << endl;
    }
    return 0;
}
```






## 总结

# 2.0 最长上升子序列 （LIS）

最长上升子序列（Longest  Increasing Subsequence）简称 LIS。LIS 就是在里面寻找值不断增加的子序列！

首先将每一个下标的当前的最长上升子序列数存下来，然后再从当前下标和之前的值中取最大值。

初始状态为 1 ， 是因为每一个下标的最长上升子序列就是其本身，也就是 1.

## 2.1 练习！

[Leetcode-300](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int len = nums.size();
        int a[nums.size()];
        for (int i = 0; i < len; i++) {
            a[i] = 1;
        }
        
        for (int i = 0; i < len; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    a[i] = max( a[i] , a[j] + 1);
                }
            }
        }

        int t = 0;
        for (int i = 0; i < len; i++) {
            t = max(a[i], t);
        }
        return t;
    }
};
```

```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp,1);
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i],dp[j]+1);
                }
            }
        }

        int ans = 0;
        for (int i = 0; i < nums.length; i++) {
            if (dp[i] > ans) {
                ans = dp[i];
            }
        }
        return ans;
    }
}
```


## 2.2 LIS 熟悉！
[Leetcode-646](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/)

* 这道题和[Leetcode-300](https://leetcode-cn.com/problems/longest-increasing-subsequence/)几乎类似，用贪心也可以动态规划反而复杂鉴于目前正在练动态规划，下面是动态规划的写法，贪心写法在贪心的那一节里面。注意 vector 的一些用法。

* 起初我不理解为什么要排序，仔细读题后发现并没有上一题强制的顺序，每一个数对组合都可以任选，而为了实现尽可能多的数对，所以需要先排个序。

* 注意 `pairs[i][0] > pairs[j][1]` ，分析二维数组，外面的 i j 控制第几个数对，内部则控制每个数对（数对一共俩数组成，所以就 0 1 两位）

```cpp
class Solution {
public:
    static bool cmp(vector<int> &a, vector<int> &b) {
        return a[1] < b[1];
    }
    int findLongestChain(vector<vector<int>>& pairs) {
        int len = pairs.size();
        sort(pairs.begin(),pairs.end(),cmp); // 默认升序，可以不用写cmp，不过最好写上严谨一些，题意是任意选数对，所以需要排序
        vector<int> dp(len, 1); // 对 dp 初始化为 1
        int t = 1;
        for (int i = 0; i < len; i++) {
            for (int j = 0; j < i; j++) {
                if (pairs[i][0] > pairs[j][1]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            t = max(t, dp[i]);
        }
        return t;
    }
};
```

## 2.3 掌握！

[Leetcode-376](https://leetcode-cn.com/problems/wiggle-subsequence/)

```cpp
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        int n = nums.size();
        if (n < 2) {
            return n;
        }
        int up = 1 , down = 1;
        for (int i = 1; i < n; i++) {
            if (nums[i] > nums[i - 1]) {
                up = down + 1;
            }
            if (nums[i] < nums[i - 1]) {
                down = up + 1;
            }
        }
        return max(up, down);
    }
};
```


## 198. 打家劫舍
[戳我](https://leetcode-cn.com/problems/house-robber/description/)
### 思考
转移方程
$$
dp[i] = max(dp[i-2] + nums[i], dp[i+1]) 
$$

### code
```java
class Solution {
    public int rob(int[] nums) {
        int pre1 = 0;
        int pre2 = 0;
        for (int i = 0; i < nums.length; i++) {
            int temp = Math.max(nums[i] + pre2, pre1);
            pre2 = pre1;
            pre1 = temp;
        }
        return pre1;
    }
}
```

## 213. 打家劫舍 II
[戳我](https://leetcode-cn.com/problems/house-robber-ii/)

### 思考
和上一题类似，只不过需要拆分成两个数组，数组的范围分别是：[0,n-1] ,[0,n-2] 。

### code
```java
class Solution {
    public int rob(int[] nums) {
        if (nums.length == 0 || nums == null) {
            return 0;
        }
        if (nums.length == 1) {
            return nums[0];
        }
        return Math.max(search(nums,0,nums.length-2) , search(nums,1,nums.length-1));
    }
    public int search(int[] nums , int l , int m) {
        int pre1 = 0 , pre2 = 0;
        for (int i = l; i <= m; i++) {
            int temp = Math.max(pre2 + nums[i],pre1);
            pre2 = pre1;
            pre1 = temp;
        }
        return pre1;
    }
}
```
## 64. 最小路径和
[戳我](https://leetcode-cn.com/problems/minimum-path-sum/)

### 思考
当前节点存在两走法，向右或向下。

### code
```java
class Solution {
    public int minPathSum(int[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j ++) {
                if (i == 0 && j == 0) {
                    continue;
                }else if (i == 0) {
                    grid[i][j] += grid[i][j-1];
                }else if (j == 0) {
                    grid[i][j] += grid[i-1][j];
                }else {
                    grid[i][j] += Math.min(grid[i-1][j] , grid[i][j-1]);
                }
            }
        }
        return grid[grid.length - 1][grid[0].length - 1 ];
    }
}
```

## 62. 不同路径
[戳我](https://leetcode-cn.com/problems/unique-paths/)
### 思考
和上一题类似，填充边界，注意排列组合的话要防止溢出。

### code
```java
class Solution {
    public int uniquePaths(int m, int n) {
        int [][] a  = new int[m][n];
        for (int i = 0; i < m; i++) {
            a[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            a[0][j] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                a[i][j] = a[i-1][j] + a[i][j-1];
            }
        }
        return a[m-1][n-1];
    }
}
```

## 303. 区域和检索 - 数组不可变

[戳我](https://leetcode-cn.com/problems/range-sum-query-immutable/)

### 思考
注意多次调用，可以将计算结果存起来，直接存储前 n 项和，然后直接查询即可。
### code

```java
class NumArray {
    private int [] sums;
    public NumArray(int[] nums) {
        sums = new int[nums.length+1];
        for (int i = 1; i <= nums.length; i++) {
            sums[i] = sums[i-1] + nums[i-1];
        }
    }
    
    public int sumRange(int i, int j) {
        return sums[j+1] - sums[i];
    }
}
```
## 413. 等差数列划分
[戳我](https://leetcode-cn.com/problems/arithmetic-slices/)
### 思考

### code

```java
class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        int n = A.length;
        int dp = 0 , sum = 0;
        for (int i = 2; i < n; i++) {
            if (A[i] - A[i - 1] == A[i - 1] - A[i-2]) {
                dp = dp + 1;
                sum += dp;
            }else {
                dp = 0;
            }
        }
        return sum;
    }
}
```

## 

```java
class Solution {
    public int integerBreak(int n) {
        if (n <= 3) return n-1;
        int a = n / 3 , b = n % 3;
        if (b == 0) return (int)Math.pow(3 , a);
        if (b == 1) return (int)Math.pow(3 , a-1) * 4;
        return (int)Math.pow(3 , a) * 2;
    }
}
```

## 1.5 交换硬币

[322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

### 思考

### code
```java
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        for (int i = 0 ; i < dp.length ; i ++) {
            dp[i] = amount + 1;
        }
        dp[0] = 0;
        for (int i = 0 ; i < dp.length ; i ++) {
            for (int j = 0 ; j < coins.length ; j ++) {
                if (i < coins[j]) continue;
                dp[i] = Math.min(dp[i] , 1 + dp[i - coins[j]]);
            }
        }
        return dp[amount] == amount + 1 ? -1 : dp[amount];
    }
}
```

# 3.0 斐波那契数列

## 3.1 爬楼梯

[Leetcode-70](https://leetcode-cn.com/problems/climbing-stairs/)

通过观察可以发现如下规律！

![](../images/alg_dl1.png)

以上是最基本的情况，当台阶为 0 之时显然存在 (0) 一步走上去即可。
![](../images/alg_dl2.png)

当台阶为 2 时，存在 (1 + 1) (2) 两种情况， 

当台阶数位 3 时，存在 (1 + 1 + 1) (1 + 2) (2 + 1) 3 种组合。

将台阶为 6 的情况枚举出来后发现 13(6) = 8 (5) + 5 (4) 发现了这个规律。也就是 f(n) = f(n-1) + f(n-2) 斐波那契数列。



```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n < 2) {
            return n;
        }
        int m = 1 , k = 2;
        for (int i = 2; i < n; i++) {
            int pre = m + k;
            m = k;
            k = pre;
        }
        return k;
    }
};
```

## 3.2 练习!
[Leetcode-198](https://leetcode-cn.com/problems/house-robber)

和爬楼梯类似，但又有了变换，dp[i] = max(dp[i-2]+nums[i], dp[i-1])

当考虑当前房子是否抢当前房子时，需要考虑抢当前房子和前面的前面房子价值和高还是抢前一个房子价值高。

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int m = 0 , n = 0;
        for(int i = 0 ; i < size(nums) ;i++) {
            int t = max(m+nums[i] , n);
            m = n;
            n = t;
        }
        return n;
    }
};
```
## 3.3 练习!
[Leetcode-213](https://leetcode-cn.com/problems/house-robber-ii/)

上一题的变形，因为首位相接，如果按照原来的思路会导致首尾相接的情况出现，导致警报出现。

修改为两个范围 [0,n-2] [1,n-1] 的情况即可。也就是拆分成了两种情况使得不会出现收尾相接的情况。
```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if (size(nums) == 0) return 0;
        if (size(nums) == 1) return nums[0];
        return max(def(nums,0,size(nums) - 2) , def(nums,1,size(nums) - 1));
    }
    int def(vector<int>& nums, int a, int b) {
        int m = 0 , n = 0;
        for(int i = a ; i <= b ;i++) {
            int t = max(m+nums[i] , n);
            m = n;
            n = t;
        }
        return n;
    }
};
```

# 4.0 数组区间

## 4.1 区间和
[Leetcode-303](https://leetcode-cn.com/problems/range-sum-query-immutable/)
关于区间和存在很多做法，这个专题是动态规划，动态规划的写法如下。只不过是将前缀和记录下来直接查询。

sums[n] 代表前 n-1 个数的前缀和。

对于样例遍历过程如下：

* sums[1] = sums[0] + nums[0] = 0 + (-2) = -2;
* sums[2] = sums[1] + nums[1] = (-2) + (0) = -2;
* sums[3] = sums[2] + nums[2] = (-2) + (3) = 1;
* sums[4] = sums[3] + nums[3] = (1) + (-5) = -4;
* sums[5] = sums[4] + nums[4] = (-4) + (2) = -2;
* sums[6] = sums[5] + nums[5] = (-2) + (-1) = (-3);
* sums[7] = sums[6] + nums[6] = (-3) + (-1) = (-4);

```cpp
class NumArray {
private: 
    vector<int> sums;
public:
    NumArray(vector<int>& nums) {
        sums.resize(nums.size() + 1);
        for (int i = 0; i < size(nums); i++) {
            sums[i+1] = sums[i] + nums[i];
        }
    }
    
    int sumRange(int i, int j) {
        return sums[j+1] - sums[i];
    }
};
```

## 4.2 等差数列
[Leetcode-413](https://leetcode-cn.com/problems/arithmetic-slices)
dp 代表以当前数字结尾的等差数列个数，记住是当前数字结尾的等差数列。


```cpp
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& A) {
        if (size(A) == 0) {
            return 0;
        }
        int n = size(A);
        int dp = 0;
        int sum = 0;
        for (int i = 2; i < n; i++) {
            if (A[i] - A[i-1] == A[i-1] - A[i-2]) {
                dp++;
                sum +=dp;
            }else{
                dp = 0;
            }
        }
        return sum;
    }
};
```
# 5.0 矩阵路径和

## 5.1 练习！
[Leetcode-64](https://leetcode-cn.com/problems/minimum-path-sum)

注意处理好边界情况，除此之外就是考虑从上边下来还是从左边过来的情况了，将结果保存起来然后判断。

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        if (m == 0 || n == 0) {
            return 0;
        }
        for(int i = 0; i < m ; i++) {
            for(int j = 0; j < n; j++) {
                if (i ==0 && j != 0) {
                    grid[i][j] += grid[i][j-1];
                }
                if (i != 0 && j == 0) {
                    grid[i][j] += grid[i-1][j];
                }
                if (i != 0 && j != 0) {
                    grid[i][j] += min(grid[i-1][j] , grid[i][j-1]);
                }
            }
        }
    return grid[m-1][n-1];
    }
};
```
## 5.2 练习！
[Leetcode-62](https://leetcode-cn.com/problems/unique-paths/)

里面有滚动数组的思想，外层循环的状态保存了下来直接拿过来，这一题没有判断，在 0/1 背包里面存在。

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(m,1);
        for (int i = 1; i < n ; i++) {
            for (int j = 1; j < m; j++) {
                dp[j] += dp[j-1];
            }
        }
        return dp[m-1];
    }
};
```

# 6.0 整数拆分
## 6.1 练习！💚💚💚
[Leetcode-343](https://leetcode-cn.com/problems/integer-break/)
这道题的思考过程分为三步：暴力递归 -> 记忆化递归 -> 动规
首先思考以下递归树，自顶向下。
```cpp
class Solution {
public:
    int integerBreak(int n) {
        int dp[n+1];
        for(int i = 0; i <= n; i ++) {
            dp[i] = 1;
        }
        for (int i = 3; i <= n; i++) {
            for(int j = 1; j < i; j++) {
                dp[i] = max(dp[i] , max(j * (i-j) ,j * dp[i - j]));
            }
        }
        return dp[n];
    }
};
```
## 6.2 练习！💚💚💚
[Leetcode-279](https://leetcode-cn.com/problems/perfect-squares/)

```cpp
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, 0x7FFFFFFF);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            dp[i] = i;
            for (int j = 1; i - j*j >= 0; j++) {
                dp[i] = min(dp[i], dp[i - j*j] + 1);
            }
        }
        return dp[n];
    }
};
```

# 7.0 背包问题

背包问题存在很多种类型，

根据物品是否可以细分分为 0/1 背包和普通背包，根据物品数量是否优先可以分为完全背包和多重背包。

## 1.0 练习！
[Leetcode-416](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0, n = nums.size();
        
        for (int i = 0; i < n; i++) {
            sum += nums[i];
        }
        
        if (sum%2 != 0 || n == 1) {
            return false;
        }

        int t = sum / 2;
        vector<vector<bool>> dp(n + 1, vector<bool>(sum + 1, false));
        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= t; j++) {
                if (j - nums[i - 1] < 0) {
                    dp[i][j] = dp[i - 1][j];
                }else {
                    dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - nums[i - 1]]);
                }
            }
        }
        return dp[n][t];
    }
};
```

## 2.0 练习！
[Leetcode-322](https://leetcode-cn.com/problems/coin-change/description/)
```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int Max = amount + 1;
        vector<int> dp(amount + 1, Max);
        dp[0] = 0;
        for (int i = 1; i <= amount; ++i) {
            for (int j = 0; j < (int)coins.size(); ++j) {
                if (coins[j] <= i) {
                    dp[i] = min(dp[i], dp[i - coins[j]] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

## 3.0 练习！
[Leetcode-518](https://leetcode-cn.com/problems/coin-change-2/)

完全背包

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {

        int dp[amount + 1];
        memset(dp , 0, sizeof(dp));
        dp[0] = 1; 
        for (int coin : coins) {
            for (int j = 1; j <= amount; j++) {
                if (j < coin) {
                    continue;
                }
                dp[j] += dp[j - coin];
            }
        }
        return dp[amount];
    }
};
```

## 4.0 练习！

```cpp
```

# 8.0 编辑距离

## 8.1 练习！
[Leetcode-583](https://leetcode-cn.com/problems/delete-operation-for-two-strings/)

## 8.2 练习！
[Leetcode-72](https://leetcode-cn.com/problems/edit-distance/description/)

## 8.3 练习！
[Leetcode-650](https://leetcode-cn.com/problems/2-keys-keyboard/description/)

##


# 9.0 股票交易
309\. Best Time to Buy and Sell Stock with Cooldown(Medium)

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/) / [力扣](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/)
714\. Best Time to Buy and Sell Stock with Transaction Fee (Medium)

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/) / [力扣](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/)
123\. Best Time to Buy and Sell Stock III (Hard)

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/) / [力扣](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/description/)
188\. Best Time to Buy and Sell Stock IV (Hard)

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/) / [力扣](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/description/)

# 推荐资料

1. [背包九讲](https://github.com/tianyicui/pack)






## DP-动态规划

1. 0/1 Knapsack, 0/1背包，6个题
0/1 Knapsack，0/1背包问题

Equal Subset Sum Partition，相等子集划分问题

Subset Sum，子集和问题

Minimum Subset Sum Difference，子集和的最小差问题

Count of Subset Sum，相等子集和的个数问题

Target Sum，寻找目标和的问题



2. Unbounded Knapsack，无限背包，5个题
Unbounded Knapsack，无限背包

Rod Cutting，切钢条问题

Coin Change，换硬币问题

Minimum Coin Change，凑齐每个数需要的最少硬币问题

Maximum Ribbon Cut，丝带的最大值切法



3. Fibonacci Numbers，斐波那契数列，6个题
Fibonacci numbers，斐波那契数列问题

Staircase，爬楼梯问题

Number factors，分解因子问题

Minimum jumps to reach the end，蛙跳最小步数问题

Minimum jumps with fee，蛙跳带有代价的问题

House thief，偷房子问题



4. Palindromic Subsequence，回文子系列，5个题
Longest Palindromic Subsequence，最长回文子序列

Longest Palindromic Substring，最长回文子字符串

Count of Palindromic Substrings，最长子字符串的个数问题

Minimum Deletions in a String to make it a Palindrome，怎么删掉最少字符构成回文

Palindromic Partitioning，怎么分配字符，形成回文



5. Longest Common Substring，最长子字符串系列，13个题
Longest Common Substring，最长相同子串

Longest Common Subsequence，最长相同子序列

Minimum Deletions & Insertions to Transform a String into another，字符串变换

Longest Increasing Subsequence，最长上升子序列

Maximum Sum Increasing Subsequence，最长上升子序列和

Shortest Common Super-sequence，最短超级子序列

Minimum Deletions to Make a Sequence Sorted，最少删除变换出子序列

Longest Repeating Subsequence，最长重复子序列

Subsequence Pattern Matching，子序列匹配

Longest Bitonic Subsequence，最长字节子序列

Longest Alternating Subsequence，最长交差变换子序列

Edit Distance，编辑距离

Strings Interleaving，交织字符串


线性DP；区间DP；背包DP；树形DP；状态压缩DP；数位DP；计数型DP；递推型DP；概率型DP；博弈型DP；记忆化搜索；1. 线性DP最经典单串：300. 最长上升子序列 (LIS)最经典双串：1143. 最长公共子序列 (LCS)经典问题：120. 三角形最小路径和53. 最大子序和152. 乘积最大子数组887. 鸡蛋掉落 (DP+二分)354. 俄罗斯套娃信封问题 (隐晦的LIS)打家劫舍系列: (打家劫舍3 是树形DP)198. 打家劫舍 213. 打家劫舍 II股票系列:121. 买卖股票的最佳时机 122. 买卖股票的最佳时机 II 123. 买卖股票的最佳时机 III 188. 买卖股票的最佳时机 IV309. 最佳买卖股票时机含冷冻期714. 买卖股票的最佳时机含手续费字符串匹配系列72. 编辑距离44. 通配符匹配10. 正则表达式匹配2. 区间DP516. 最长回文子序列 730. 统计不同回文子字符串 1039. 多边形三角剖分的最低得分 664. 奇怪的打印机 312. 戳气球3. 背包DP416. 分割等和子集 (01背包-要求恰好取到背包容量)494. 目标和 (01背包-求方案数)322. 零钱兑换 (完全背包)518. 零钱兑换 II (完全背包-求方案数)474. 一和零 (二维费用背包)4. 树形DP124. 二叉树中的最大路径和1245. 树的直径 (邻接表上的树形DP)543. 二叉树的直径333. 最大 BST 子树 337. 打家劫舍 III5. 状态压缩DP464. 我能赢吗526. 优美的排列 935. 骑士拨号器 1349. 参加考试的最大学生数6. 数位DP233. 数字 1 的个数902. 最大为 N 的数字组合 1015. 可被 K 整除的最小整数7. 计数型DP计数型DP都可以以组合数学的方法写出组合数，然后dp求组合数62. 不同路径63. 不同路径 II96. 不同的二叉搜索树 (卡特兰数)1259. 不相交的握手 (卢卡斯定理求大组合数模质数)8. 递推型DP所有线性递推关系都可以用矩阵快速幂做，可以O(logN)，最典型是斐波那契数列70. 爬楼梯 509. 斐波那契数 935. 骑士拨号器 957. N 天后的牢房1137. 第 N 个泰波那契数9. 概率型DP求概率，求数学期望808. 分汤837. 新21点10. 博弈型DP策梅洛定理，SG定理，minimax翻转游戏293. 翻转游戏294. 翻转游戏 IINim游戏292. Nim 游戏石子游戏877. 石子游戏1140. 石子游戏 II井字游戏348. 判定井字棋胜负794. 有效的井字游戏 1275. 找出井字棋的获胜者11. 记忆化搜索本质是 dfs + 记忆化，用在状态的转移方向不确定的情况329. 矩阵中的最长递增路径576. 出界的路径数
