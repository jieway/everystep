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




# 1.0 素数问题

什么是素数？素数也称质数，指大于 1 的自然数中除了 1 和其本身外不再有其他因数的自然数。

## 1.1 统计素数个数

[Leetcode-204](https://leetcode-cn.com/problems/count-primes)

这个写法显然大家都能想到，但是超时！需要采用更高效的写法，埃氏筛法求素数可以通过。

先开一个数组，从 2 开始枚举，将 2 的倍数尽数剔除，再将 3 的倍数尽数剔除，剔除到 sqrt(n) 的倍数即可，因为大于 sqrt(n) 的倍数在之前已经被枚举过了，可以手动试一下，这是归纳出来的。然后没有被剔除来的就是素数了！

```cpp
class Solution {
public:
    int prime(int n){
        for (int i = 2; i <= sqrt(n); i++){
            if (n % i == 0){
                return 0;
            }
        }
        return 1;
    }
    int countPrimes(int n) {
        int k = 0;
        for (int i = 2; i < n; i ++) {
            if (prime(i)) {
                k ++;
            }
        }
        return k;
    }
};
```

> Time Limit 
> Exceeded 20/20 cases passed (N/A)

```cpp
class Solution {
public:
    int countPrimes(int n) {
        vector<int> a(n + 1, 1);
        for (int i = 2; i <= sqrt(n); i++) {
            if(a[i]) {
                for (int j= i * i; j < n; j += i) {
                    a[j] = 0;
                }
            }
        }
        int cnt = 0;
        for (int i = 2; i < n; i ++) {
            if (a[i]) {
                cnt++;
            }
        }
        return cnt;
    }
};
```

> Accepted
> 20/20 cases passed (48 ms)
> Your runtime beats 78.68 % of cpp submissions
> Your memory usage beats 46.15 % of cpp submissions (19.3 MB)


# 2.0 进制转换

## 2.1 七进制

[Leetcode-504](https://leetcode-cn.com/problems/base-7/)

* 首先考虑 0 直接返回 0 即可。
* 考虑负数，按照正数处理，设一个临时变量进行遍历不应影响原来的变量。
* 判断正负，将符号加上。

```cpp
class Solution {
public:
    string convertToBase7(int num) {
        if(num == 0)
            return "0";
        string a;
        int i = 0;
        int temp = num;
        temp = abs(temp);
        while (temp) {
            a += to_string(temp % 7);
            temp /= 7;
        }
        if (num < 0) {
            a += '-';
        }
        reverse(a.begin(), a.end());
        return a;
    }
};
```

## 2.2 十六进制

[Leetcode-405](https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/)

```cpp
class Solution {
public:
    string toHex(int num) {
        if (num == 0)
            return "0";
        string hex = "0123456789abcdef", ans = "";
        while (num && ans.size() < 8) {
            ans = hex[num & 0xf] + ans;
            num >>= 4;
        }
        return ans;
    }
};
```

## 2.3 二十六进制

```cpp
public:
    string convertToTitle(int n) {
        if (n == 0)
            return "";
        string s;
		while(n > 0) {
			n--;
			s = char(n % 26 + 'A') + s;
			n /= 26;
		}
        return s;
    }
};
```

可以写成递归的方式！

```cpp
class Solution {
public:
    string convertToTitle(int n) {
        if (n == 0)
            return "";
        n--;
        return convertToTitle(n / 26) + char(n % 26 + 'A');
    }
};
```

# 3.0 阶乘和幂

## 3.1 求零的个数

[Leetcode-172](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

末尾零的个数来源于 10 ，而所有的 10 都可以拆解称 2 × 5 ，我们求 2 × 5 的组合即可，而所有的偶数都可以拆解出来一个 2 ，所以 2 × 5 的个数取决去 5 的个数，所以只需要统计 5 的个数即可！

```cpp
class Solution {
public:
    int trailingZeroes(int n) {
        int cnt = 0;
        while (n) {
            cnt += n / 5;
            n /= 5;
        }
        return cnt;
    }
};
```
## 3.2 幂次
[Leeicode-326](https://leetcode-cn.com/problems/power-of-three/)
1162261467 是 3 的 19 次方， int 范围内的最大值。所以只要是可以整除说明一定是 3 的倍数！
```cpp
class Solution {
public:
    bool isPowerOfThree(int n) {
        return n > 0 && 1162261467 % n == 0;
    }
};
```

## 2004: p次方求和

 **题目描述**

一个很简单的问题，求1^p+2^p+3^p+……+n^p的和。

**输入**

第一行单独一个数字t表示测试数据组数。接下来会有t行数字，每行包括两个数字n,p，
输入保证0<n<=1000,0<=p<=1000。

**输出**

输出1^p+2^p+3^p+……+n^p对10003取余的结果，每个结果单独占一行。

**样例输入**

 2
10 1
10 2

**样例输出**

55
385
```c++
#include<iostream>
#include<cmath>
#include<cstring>
using namespace std;
int fast(long long a,long long b,long long c){
	long long ans = 1;
	while(b!=0){
		if(b%2==1)
			ans = ans*a%c;
		a = a * a%c;
		b =b/2;
	}
	return ans;
}
int main(){
	int t,n,p;
	cin>>t;
	while(t--){
		cin>>n>>p;
		long long sum=0;
		for(int i=1;i<=n;i++){
			sum += fast(i,p,10003);
		}
		cout<<sum%10003<<endl;
	}
	return 0;
}
```
**总结**
每次取模，最后再取模，快速幂。

## 1921: 求余数

时间限制: 1 Sec  内存限制: 64 MB
提交: 116  解决: 64
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

现在给你一个自然数n，它的位数小于等于一百万，现在你要做的就是求出这个数除10003之后的余数

**输入**

第一行有一个整数m(1<=m<=8),表示有m组测试数据； 随后m行每行有一个自然数n。

**输出**

输出n整除10003之后的余数，每次输出占一行。

 **样例输入**

 3
4
5
465456541

**样例输出**

4
5
6948
```c++
#include<iostream>
#include<cmath>
#include<cstring>
using namespace std;
int main(){
	char a[1000001];
	int m,c;
	cin>>m;
	while(m--){
		cin>>a;
		long long sum=0;
		int b = strlen(a);
		for(int i=0;i<b;i++){
			sum = (sum*10 + a[i] - '0')%10003; 
		}
		cout<<sum%10003<<endl;
	}
	return 0;
}
```
## 1875: 九的余数

时间限制: 3 Sec  内存限制: 64 MB
提交: 162  解决: 70
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

现在给你一个自然数n，它的位数小于等于一百万，现在你要做的就是求出这个数整除九之后的余数。

**输入**

第一行有一个整数m(1<=m<=8),表示有m组测试数据； 随后m行每行有一个自然数n。

 **输出**

输出n整除九之后的余数，每次输出占一行。

**样例输入**

 3
4
5
465456541

**样例输出**

4
5
4
**总结**
有个规律，每一位相加取余9的结果和数字取余9的结果是相同的。
```c++
#include<iostream>
#include<cmath>
#include<cstring>
using namespace std;
int main(){
	int m;
	char a[1000001];
	cin>>m;
	getchar();
	while(m--){
		cin>>a;
		int b = strlen(a),sum=0;
		for(int i=0;i<b;i++){
			 sum+= a[i]-'0';
		}
		cout<<sum%9<<endl;
	}
	return 0;
}
```
对每一步进行取模得出最终结果。
```c++
#include<iostream>
#include<cmath>
#include<cstring>
using namespace std;
int main(){
	int m;
	char a[1000001];
	cin>>m;
	getchar();
	while(m--){
		cin>>a;
		long long sum=0;
		int b = strlen(a);
		for(int i=0;i<b;i++){
			 sum= (sum*10+a[i]-'0')%9;
		}
		cout<<sum<<endl;
	}
	return 0;
}
```
## 1913: 快速查找素数

时间限制: 4 Sec  内存限制: 64 MB
提交: 233  解决: 96
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

现在给你一个正整数N，要你快速的找出在2.....N这些数里面所有的素数。

**输入**

给出一个正整数数N(N<=2000000) 但N为0时结束程序。 测试数据不超过100组

**输出**

将2~N范围内所有的素数输出。两个数之间用空格隔开

**样例输入**

 5
10
11

**样例输出**

2 3 5
2 3 5 7
2 3 5 7 11
**总结**
常规写法超时
```c++
#include<iostream>
#include<cmath>
using namespace std;
bool prime(int x){
	if(x<2)return false;
	for(int i=2;i<=sqrt(x);i++)
		if(x%i==0) return false;
		return true;
}
int main(){
	int n,a=0;
	while(cin>>n&&n!=0){
		a=0;
		for(int i=2;i<=n;i++){
			if(prime(i)&&a==0){
				cout<<i;
				a=1;
			}
			else if(prime(i)&&a==1){
				cout<<" "<<i;
			}
		}
		cout<<endl;
	}
	return 0;
}
```
打表，剪枝，将2，3，4，，，的倍数踢出来，标记为0，剩下的都是素数。
```c++
#include<iostream>
#include<cmath>
#define max  2000001
using namespace std;
int a[max];
int main(){
	int n;
	for(int i=2;i<=max;i++){
		a[i] = i;
	}
	for(int i=2;i<=max;i++){
		if(a[i]!=0){
			for(int j=2*i;j<max;j+=i){
				a[j] =0;
			}	
		}
	}
	while(cin>>n&&n!=0){
		for(int i=2;i<=n;i++){
			if(a[i]!=0){
				cout<<a[i]<<" ";
			}
		}
		cout<<endl;
	}
	return 0;
}
```
## 1853: 超级台阶

时间限制: 1 Sec  内存限制: 64 MB
提交: 93  解决: 54
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

有一楼梯共m级，刚开始时你在第一级，若每次只能跨上一级或二级，要走上第m级，共有多少走法？注：规定从一级到一级有0种走法。

**输入**

输入数据首先包含一个整数n(1<=n<=100)，表示测试实例的个数，然后是n行数据，每行包含一个整数m，（1<=m<=40), 表示楼梯的级数。

**输出**

对于每个测试实例，请输出不同走法的数量。

**样例输入**

 2
2
3

**样例输出**

1
2
打表
递归超时
```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int n,m,a[41];
	cin>>n;
	a[0]=0;
	a[1]=0;
	a[2]=1;
	a[3]=2; 
	for(int i=4;i<=41;i++){
		a[i] = a[i-1] + a[i-2];
	}
	while(n--){
		cin>>m;
		cout<<a[m]<<endl;
	}
	return 0;
}
```


## 1846: 数的长度

时间限制: 3 Sec  内存限制: 64 MB
提交: 82  解决: 63
您该题的状态：已完成
[提交][状态][讨论版]

 **题目描述**

N！阶乘是一个非常大的数，大家都知道计算公式是N!=N*(N-1）······*2*1.现在你的任务是计算出N！的位数有多少（十进制）？

 **输入**

首行输入n，表示有多少组测试数据(n<10) 随后n行每行输入一组测试数据 N( 0 < N < 1000000 )

**输出**

对于每个数N，输出N!的（十进制）位数。

 **样例输入**

 3
1
3
32000

**样例输出**

1
1
130271


```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int m,n;
	cin>>n;
	while(n--){
		cin>>m;
		double sum=1; 
		while(m){
			sum += log10(m);
			m--;
		}
		cout<<(int)sum<<endl;
	}
	return 0;
} 
```
总结 
两边同取对数求得长度，注意转换成int型

## 1797: 街区最短路径问题

时间限制: 3 Sec  内存限制: 64 MB
提交: 61  解决: 52
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

一个街区有很多住户，街区的街道只能为东西、南北两种方向。

住户只可以沿着街道行走。

各个街道之间的间隔相等。

用(x,y)来表示住户坐在的街区。

例如（4,20），表示用户在东西方向第4个街道，南北方向第20个街道。

现在要建一个邮局，使得各个住户到邮局的距离之和最少。

求现在这个邮局应该建在那个地方使得所有住户距离之和最小；

**输入**

第一行一个整数n<20，表示有n组测试数据，下面是n组数据;
每组第一行一个整数m<20,表示本组有m个住户，下面的m行每行有两个整数0<x,y<100，表示某个用户所在街区的坐标。
m行后是新一组的数据；

**输出**

每组数据输出到邮局最小的距离和，回车结束；

**样例输入**

 2
3
1 1
2 1
1 2
5
2 9 
5 20
11 9
1 1
1 20

```c++
#include<iostream>
#include<cmath>
#include<algorithm>
using namespace std;
int main(){
	int t,n,d,x[21],y[21];
	cin>>t;
	while(t--){
		cin>>n;
		int sum=0;
		for(int i=0;i<n;i++){
		cin>>x[i]>>y[i];		
		}
		sort(x,x+n);
		sort(y,y+n);
		for(int i=0;i<n/2;i++){
			sum += x[n-i-1] - x[i] + y[n-i-1] - y[i];
		}
		cout<<sum<<endl;
	}
	return 0;
} 
```
**总结：**
 注意是最小距离和，而非最小距离。
 曼哈顿距离。
 

## 1240: 最少乘法次数

时间限制: 3 Sec  内存限制: 128 MB
提交: 142  解决: 100
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

给你一个非零整数，让你求这个数的n次方，每次相乘的结果可以在后面使用，求至少需要多少次乘。如24：2*2=22（第一次乘），22*22=24（第二次乘），所以最少共2次；

**输入**

第一行m表示有m(1<=m<=100)组测试数据；
每一组测试数据有一整数n（0<n<=10000）;

**输出**

输出每组测试数据所需次数s;

**样例输入**

 4
2
3
4
1000

**样例输出**

1
2
2
14

```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int t,n,sum=0,k=1;
	cin>>t;
	while(t--){
		sum=0;
		cin>>n;
		while(n!=1){
			if(n%2==1){
				sum+=2;
			}else{
				sum++;
			}
			n/=2;
		}
		cout<<sum<<endl;
	}
	return 0;
} 
```
## 1232: N的N次方

时间限制: 1 Sec  内存限制: 32 MB
提交: 58  解决: 29
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

现给你一个正整数N，请问N^N的最左边的数字是什么？

**输入**

输入包含多组测试数据。每组输入一个正整数N（N<=1000000）。

 **输出**

对于每组输入，输出N^N的最左边的数字。

 **样例输入**

 3
4

**样例输出**

2
2

```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int n,k;
	while(cin>>n){
		k = n*log10(n);
		cout<<(int)(pow(10,n*log10(n)-k))<<endl;
	}
	return 0;
} 
```
**总结：**
7位数的幂次方暴力算肯定过不去。
首先需要考虑结果有多少，共有k = log10(m) +1位;
其次 N^N  = a * 10^(k-1) ,两边同取对数，求得 a 的结果；
a就是我们要求的结果，取整即可。

# 4.0 思考

## 4.1 最多的元素
[Leetcode-169](https://leetcode-cn.com/problems/majority-element/description/)

出现次数大于 n/2 说明排完序后 n/2 的位置的元素一定是最多的元素。
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return nums[nums.size() / 2];
    }
};
```
## 4.2 平方数

这道题有好几种解法，可以用二分查找，也可以找规律，也可以用牛顶迭代法，下面提供几种思路。

* 观察平方数可以得到一个规律， 1 4 9 16 25 之间的差值 3 5 7 9 为一个等差数列，差值为 2 ，根据这个性质来迭代即可。

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        if (num == 0)
            return false;
        int i = 1;
        while (num > 0) {
            num -= i;
            i += 2;
        }
        return num == 0 ? true : false; 
    }
};
```

* 牛顿迭代法，先看代码，` x = ( x + num / x) / 2;` 这一步是根据求导的来的。 

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        if (num < 2) return true;
        long x = num / 2;
        while (x * x > num) {
            x = ( x + num / x) / 2;
        }
        return x*x == num;
    }
};
```

## 4.3 最大值
可以直接排序也可以一次扫描记录最值。

而求三个数中的最大值可以分为以下两种情况：

* 如果全是正数，求最大的三个值即可。
* 如果出现负数，负号需要两个负数的存在才可以消掉，所以需要两个负数，而负数整体越小乘积越大，所以最大值为最小的两个值和最大的值相乘。
* 以上两种情况比较大小，求最值即可！


```cpp
class Solution {
public:
    int maximumProduct(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return max(nums[nums.size()-1] * nums[nums.size()-2] * nums[nums.size()-3],nums[0] * nums[1] * nums[nums.size() - 1]);
    }
};
```
# 8.10

## 1447: 阶乘的和

时间限制: 1 Sec  内存限制: 32 MB
提交: 210  解决: 68
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
有些数可以表示成若干个不同阶乘的和。例如，9=1！+2！+3！。小明对这些数很感兴趣，所以他给你一个正整数n，想让你告诉他这个数是否可以表示成若干个不同阶乘的和。
**输入**
输入包含多组测试数据。每组输入为一个非负整数n（n<=1000000），当n为负数时，输入结束。
**输出**
对于每组输入，如果n可以表示成若干个不同阶乘的和，则输出YES，否则输出NO。
**样例输入**
 9
-1
**样例输出**
YES

```c++
#include<iostream>
using namespace std;
int s[10] = {1,1,2,6,24,120,720,5040,40320,362880};
int main()
{
	int a;
	while(cin>>a&&a>=0){
		if(a==0){
			cout<<"NO"<<endl;
		}else {
		for(int i=9;i>=0;i--){
			if(a>=s[i]){
				a-=s[i];
				if(a==0){
					cout<<"YES"<<endl;
				}
			}
		}
		if(a!=0){
			cout<<"NO"<<endl;
		}			
		}
	}
	return 0;
}
```
## 1861: 阶乘之和

时间限制: 3 Sec  内存限制: 64 MB
提交: 108  解决: 58
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

给你一个非负数整数n，判断n是不是一些数（这些数不允许重复使用，且为正数）的阶乘之和，如9=1！+2!+3!，如果是，则输出Yes，否则输出No；

**输入**

第一行有一个整数0<m<100,表示有m组测试数据；
每组测试数据有一个正整数n<1000000;

 **输出**

如果符合条件，输出Yes，否则输出No;

**样例输入**

 2
9
10

 **样例输出**

Yes
No



```c++
#include <cstdio>
using namespace std;
int s[9] = {1,2,6,24,120,720,5040,40320,362880};
  
int main()
{
    int t, n;
    scanf("%d", &t);
    while(t--)
    {
        scanf("%d", &n);
        for(int i=8; i>=0; i--)
        {
            if(n>=s[i])
            {
                n -= s[i];
                if(n == 0) {printf("Yes\n");break;}
            }
        }
        if(n != 0) printf("No\n");
    }
    return 0;
}
```
**总结**
不是非得从1开始。

## 1860: 汉诺塔（一）

时间限制: 1 Sec  内存限制: 64 MB
提交: 248  解决: 212
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

在印度，有这么一个古老的传说：在世界中心贝拿勒斯（在印度北部）的圣庙里，一块黄铜板上插着三根宝石针。印度教的主神梵天在创造世界的时候，在其中一根针上从下到上地穿好了由大到小的64片金片，这就是所谓的汉诺塔。不论白天黑夜，总有一个僧侣在按照下面的法则移动这些金片：一次只移动一片，不管在哪根针上，小片必须在大片上面。僧侣们预言，当所有的金片都从梵天穿好的那根针上移到另外一根针上时，世界就将在一声霹雳中消灭，而梵塔、庙宇和众生也都将同归于尽。

现在请你计算出起始有m个金片的汉诺塔金片全部移动到另外一个针上时需要移动的最少步数是多少？（由于结果太大，现在只要求你算出结果的十进制位最后六位）

**输入**

第一行是一个整数N表示测试数据的组数(0<N<20)
每组测试数据的第一行是一个整数m,表示起始时金片的个数。(0<m<1000000000)

**输出**

输出把金片起始针上全部移动到另外一个针上需要移动的最少步数的十进制表示的最后六位。

**样例输入**

 2
1
1000

**样例输出**

1
69375

```c++
#include<iostream> 
using namespace std;
int fast(long long a,long long b,long long c){
	long long result = 1;
	while(b>0){
		if(b%2==1)
		result = result*a%c;
		b /=2;
		a = a*a%c;
	}
	return result;
}
int main(){
	int n;
	long long m;
	cin>>n;
	while(n--){
		cin>>m;
		cout<<fast(2,m,1000000)-1<<endl;
	}
	return 0;
}
```
**总结：**
数学归纳发现2^n-1 ；由于数太大，常规写法会爆掉。可以采用快速幂进行计算。
还有一个规律当m>100006时所得结果就是抹掉最高位的值。

## 1847: 阶乘因式分解（二）

时间限制: 3 Sec  内存限制: 64 MB
提交: 67  解决: 53
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

给定两个数n，m,其中m是一个素数。
将n（0<=n<=2^31）的阶乘分解质因数，求其中有多少个m。
注：^为求幂符号。

**输入**

第一行是一个整数s（0<s<=100)，表示测试数据的组数
随后的s行, 每行有两个整数n，m。

 **输出**

输出m的个数

**样例输入**

 3
100 5
16 2
1000000000  13

**样例输出**

24
15
83333329
```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int a,n,m;
	cin>>a;
	while(a--){
		int sum=0;
		cin>>n>>m;
		while(m<=n){
			sum += n/m;
			n /= m;
		}
		cout<<sum<<endl;
	}
	return 0;
}
```

## 1816: 大数阶乘

时间限制: 3 Sec  内存限制: 64 MB
提交: 40  解决: 23
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
我们都知道如何计算一个数的阶乘，可是，如果这个数很大呢，我们该如何去计算它并输出它？
**输入**
输入一个整数m(0<m<=5000)
**输出**
输出m的阶乘，并在输出结束之后输入一个换行符
**样例输入**
 50
**样例输出**
30414093201713378043612608166064768844377641568960512000000000000

```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int n;
        while(cin.hasNext()){
            n = cin.nextInt();
            BigInteger ans = BigInteger.ONE;
            for(int i=1;i<=n;i++){
                ans = ans.multiply(BigInteger.valueOf(i));
            }
            System.out.println(ans);
        }
    }
}
```
**总结：** 第一次用Java提交。

## 1904: 求高精度幂

时间限制: 3 Sec  内存限制: 64 MB
提交: 35  解决: 21
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
对数值很大、精度很高的数进行高精度计算是一类十分常见的问题。比如，对国债进行计算就是属于这类问题。 

现在要你解决的问题是：对一个实数R( 0.0 < R < 99.999 )，要求写程序精确计算 R 的 n 次方(Rn)，其中n 是整数并且 0 < =n <= 25。

**输入**
输入有多行，每行有两个数R和n，空格分开。R的数字位数不超过10位。
**输出**
对于每组输入，要求输出一行，该行包含精确的 R 的 n 次方。输出需要去掉前导的 0 后不要的 0 。如果输出是整数，不要输出小数点。
**样例输入**
 95.123 12
0.4321 20
5.1234 15
6.7592  9
98.999 10
1.0100 12
**样例输出**
548815620517731830194541.899025343415715973535967221869852721
.00000005148554641076956121994511276767154838481760200726351203835429763013462401
43992025569.928573701266488041146654993318703707511666295476720493953024
29448126.764121021618164430206909037173276672
90429072743629540498.107596019456651774561044010001
1.126825030131969720661201


```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int n;
        String str;
        while(cin.hasNext()){
            str = cin.next();
            n = cin.nextInt();
            BigDecimal ans = new BigDecimal(str);
            String result = ans.pow(n).stripTrailingZeros().toPlainString();
            if (result.startsWith("0")){
                result = result.substring(1);
            }
            System.out.println(result);
        }
    }
}

```

## 2076: 开方数

时间限制: 500 Sec  内存限制: 64 MB
提交: 12  解决: 12
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
现在给你两个数 n 和 p ，让你求出 p 的开 n 次方。
**输入**
每组数据包含两个数n和p。当n和p都为0时表示输入结束。(1<=n<=200,1<=p<=10^101)
**输出**
对于每个输出对用输出开方后的结果k（结果小于10^9）。
**样例输入**
 2 16
3 27
7 4357186184021382204544
0 0
**样例输出**
4
3
1234

```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int n;
        double p;
        while(cin.hasNext()){
            n = cin.nextInt();
            p =cin.nextDouble();
            if (p==0||n==0){
                break;
            }else {
                System.out.println(String.format("%.0f",Math.pow(p,1.0/n))
                );
            }
        }
    }
}
```
**总结：** 这道题不用Java也能做，没有用到大数那个类。

## 2031: A+B Problem IV

时间限制: 1 Sec  内存限制: 64 MB
提交: 49  解决: 16
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
acmj最近发现在使用计算器计算高精度的大数加法时很不方便，于是他想着能不能写个程序把这个问题给解决了。
**输入**
包含多组测试数据 每组数据包含两个正数A,B（可能为小数且位数不大于400）
**输出**
每组输出数据占一行，输出A+B的结果，结果需要是最简的形式。
**样例输入**
 1.9 0.1
0.1 0.9
1.23 2.1
3 4.0
**样例输出**
2
1
3.33
7
```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        while(cin.hasNext()){
            BigDecimal b = cin.nextBigDecimal();
            BigDecimal c = cin.nextBigDecimal();
            BigDecimal a = b.add(c);
            if (a.compareTo(BigDecimal.ZERO)==0){
                System.out.println("0");
            }else{
                System.out.println(a.stripTrailingZeros().toPlainString());
            }
        }
    }
}

```
**总结：** 
需要考虑结果为零的情况。

## 1873: A+B Problem II

时间限制: 3 Sec  内存限制: 64 MB
提交: 36  解决: 16
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
I have a very simple problem for you. Given two integers A and B, your job is to calculate the Sum of A + B.

A,B must be positive.

**输入**
The first line of the input contains an integer T(1<=T<=20) which means the number of test cases. Then T lines follow, each line consists of two positive integers, A and B. Notice that the integers are very large, that means you should not process them by using 32-bit integer. You may assume the length of each integer will not exceed 1000.
**输出**
For each test case, you should output two lines. The first line is "Case #:", # means the number of the test case. The second line is the an equation "A + B = Sum", Sum means the result of A + B. Note there are some spaces int the equation.
**样例输入**
 2
1 2
112233445566778899 998877665544332211
**样例输出**
Case 1:
1 + 2 = 3
Case 2:
112233445566778899 + 998877665544332211 = 1111111111111111110
```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int n = cin.nextInt(),i=0;
        while(i < n){
            BigDecimal b = cin.nextBigDecimal();
            BigDecimal c = cin.nextBigDecimal();
            BigDecimal a = b.add(c);
            System.out.println("Case "+(i+1)+":");
            System.out.println(b+" "+"+"+" "+c+" "+"="+" "+a);
            i++;
        }
    }
}
```
**总结：** 注意空格！！！


```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        while(cin.hasNext()){
            BigDecimal a = cin.nextBigDecimal();
            BigDecimal b = cin.nextBigDecimal();
            BigDecimal c = a.subtract(b);
            if(c.compareTo(BigDecimal.ZERO)==0){
                System.out.println("YES");
            }else{
                System.out.println("NO");
            }
        }
    }
}
```

```
import java.io.*;
import java.math.*;
import java.util.*;
public class Main {
    public static void main(String[] args)
    {
        Scanner cin=new Scanner(new BufferedInputStream(System.in));
        BigInteger a,b;
        while(cin.hasNext())
        {
            a=cin.nextBigInteger();
            String c=cin.next();
            b=cin.nextBigInteger();
            if(c.charAt(0)=='/') System.out.println(a.divide(b));
            else if(c.charAt(0)=='%')
                System.out.println(a.mod(b));
        }
    }
}
```

## 2083: A/B Problem

时间限制: 1 Sec  内存限制: 64 MB
提交: 16  解决: 12
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
 做了A+B Problem，A/B Problem不是什么问题了吧！

**输入**
每组测试样例一行，首先一个号码A，中间一个或多个空格，然后一个符号（ / 或者 % ），然后又是空格，后面又是一个号码B，A可能会很长，B是一个int范围的数。
**输出**
输出结果。
**样例输入**
 110 / 100
99 % 10
2147483647 / 2147483647
2147483646 % 2147483647
**样例输出**
1
9
1
2147483646

```java
import java.io.*;
import java.math.*;
import java.util.*;
public class Main {
    public static void main(String[] args)
    {
        Scanner cin=new Scanner(new BufferedInputStream(System.in));
        BigInteger a,b;
        while(cin.hasNext())
        {
            a=cin.nextBigInteger();
            String c=cin.next();
            b=cin.nextBigInteger();
            if(c.charAt(0)=='/') System.out.println(a.divide(b));
            else if(c.charAt(0)=='%')
                System.out.println(a.mod(b));
        }
    }
}
```

# 8.11


## 2171: A^B

时间限制: 1 Sec  内存限制: 32 MB
提交: 162  解决: 92
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
求A^B的最后三位数表示的整数。
说明：A^B的含义是“A的B次方”
**输入**
输入数据包含多个测试实例，每个实例占一行，由两个正整数A和B组成（1<=A,B<=10000），如果A=0, B=0，则表示输入数据的结束，不做处理。
**输出**
对于每个测试实例，请输出A^B的最后三位表示的整数，每个输出占一行。
**样例输入**
 2 3
12 6
6789 10000
0 0
**样例输出**
8
984
1

```java
import java.io.*;
import java.math.*;
import java.util.*;
public class Main {
    public static void main(String[] args)
    {
        Scanner cin=new Scanner(System.in);
        BigInteger a;
        int b;
        while(cin.hasNext()) {
            a = cin.nextBigInteger();
            b = cin.nextInt();
            BigInteger c = new BigInteger("1000");
            BigInteger sum = new BigInteger("1");
            if (a.compareTo(BigInteger.ZERO)==0||b==0){
                break;
            }
            for (int i=0;i<b;i++){
                sum = sum.multiply(a);
            }
            System.out.println(sum.mod(c));
        }
    }
}
```

## 2008: sum of all integer numbers

时间限制: 1 Sec  内存限制: 64 MB
提交: 79  解决: 32
您该题的状态：未开始
[提交][状态][讨论版]
**题目描述**
Your task is to find the sum of all integer numbers lying between 1 and N inclusive.
**输入**
There are multiple test cases. The input consists of a single integer N that is not greater than 10000 by it's absolute value.
**输出**
Write a single integer number that is the sum of all integer numbers lying between 1 and N inclusive.
**样例输入**
 3
**样例输出**
6

```c++
#include"stdio.h"
int main()
{
	int n;		//n<10000
	long i,s=0;

	while(scanf("%d",&n)!=EOF)
	{
		s=0;
		if(n>0)
		{
			for(i=1;i<=n;i++)
				s+=i;
				printf("%ld\n",s);
		}
	
	if(n<=0)
	{
		for(i=1;i>=n;i--)
		s+=i*1.0;
		printf("%ld\n",s);
	}
}
return 0;
}
```
这个WA了，疑惑。用循环写超时了。没注意到范围，int就行，没必要用大数。
```Java
import java.io.*;
import java.math.*;
import java.util.*;
public class Main {
    public static void main(String[] args)
    {
        Scanner cin = new Scanner(new BufferedInputStream(System.in));
        int n;
        while(cin.hasNext()) {
            n = cin.nextInt();
            BigInteger sum = new BigInteger("0");
            if (n<0){
                BigInteger c = new BigInteger(String.valueOf(n));
                BigInteger d = new BigInteger("1");
                BigInteger e = new BigInteger("2");
                sum = c.divide(e).multiply(d.add(c.subtract(e)));
                System.out.println(sum);
            }
            else {
                BigInteger c = new BigInteger(String.valueOf(n));
                BigInteger d = new BigInteger("1");
                BigInteger e = new BigInteger("2");
                sum = c.divide(e).multiply(d.add(c));
                System.out.println(sum);
            }
        }
    }
}
```

## 2125: 最大的最小公倍数

时间限制: 1 Sec  内存限制: 128 MB
提交: 151  解决: 54
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
　　高中时我们对最小公倍数就已经很熟悉了，相信你很快就可以把这个问题解决。这次的问题是：给你一个正整数n，任取三个不大于n的正整数，取法不限，每个数可取多次，使得取到的这三个数的最小公倍数在所有取法中是最大的。
　　例如当n = 5 时，不大于5的数为1、2、3、4、5。则应该选3、4、5三个数，它们的最小公倍数是60，在所有取法中是最大的。因此我们得到结果60。
　　是不是很简单？抓紧时间 AC 吧。
**输入**
　　输入包含多组测试数据。每组数据为一个正整数n（1≤n≤10^6）。
**输出**
　　对每组测试数据，输出一个整数，代表所有可能取法中，选出的三个数的最小公倍数的最大值。
**样例输入**
 5
7
**样例输出**
60
210

```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	long long n,t;
	while(cin>>n){
		if(n<=2){
			t = n;
		}else if(n%2){
		t = n*(n-1)*(n-2);
		}else{
			if(n%3){
				t = n*(n-1)*(n-3);
			}else{
				t = (n-3)*(n-2)*(n-1);
			}
		}
	cout<<t<<endl;
	}
	return 0;
} 
```
**总结：** 
这道题本来想枚举暴力算，但是肯定超时。
然后找规律，网上看了题解。
最大的最小公倍数前提尽量使三者互质。
1.如果第一个数是奇数，那么是奇偶奇这个搭配，三者互质。即n(n-1)(n-2)。
2.如果第一个数是偶数，那么是偶奇偶这个搭配，第一个偶数和第三个偶数之间如果有最大公约数显然不符合题意。
3. 所以最后一个数向下退一位变成偶奇奇，即n(n-1)(n-3),此时如果第一个位和第三位是三的倍数会产生最大公约数，不符合题意。
4. 再往后退变成n(n-1)(n-4),此时又变成了偶奇偶。
5. 继续往后退变成n(n-1)(n-5),此时变成了偶奇奇，但值显然小于(n-1)(n-2)(n-3)。此时为奇偶奇。
6. 总之尽量凑成三者互质，奇偶奇的形式。


## 2043: 最小公倍数

时间限制: 1 Sec  内存限制: 64 MB
提交: 14  解决: 12
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
为什么1小时有60分钟，而不是100分钟呢？这是历史上的习惯导致。
但也并非纯粹的偶然：60是个优秀的数字，它的因子比较多。
事实上，它是1至6的每个数字的倍数。即1,2,3,4,5,6都是可以除尽60。

我们希望寻找到能除尽1至n的的每个数字的最小整数m.
**输入**
多组测试数据（少于500组）。 每行只有一个数n(1<=n<=100).
**输出**
输出相应的m。
**样例输入**
 2
3
4
**样例输出**
2
6
12
```java
import java.io.*;
import java.math.*;
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        while(cin.hasNext()){
            BigInteger sum = BigInteger.ONE;
            int n = cin.nextInt();
            for (int i=2;i<=n;i++){
                sum = sum.multiply(BigInteger.valueOf(i).divide(sum.gcd(BigInteger.valueOf(i))));
            }
            System.out.println(sum);
        }
    }
}
```

## 1850: 比大小

时间限制: 3 Sec  内存限制: 64 MB
提交: 56  解决: 18
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
给你两个很大的数，你能不能判断出他们两个数的大小呢？

比如123456789123456789要大于-123456

**输入**
每组测试数据占一行，输入两个不超过1000位的10进制整数a,b 数据保证输入的a,b没有前缀的0。 如果输入0 0表示输入结束。测试数据组数不超过10组
**输出**
如果a>b则输出“a>b”，如果a
**样例输入**
111111111111111111111111111 88888888888888888888
-1111111111111111111111111  22222222
0 0
**样例输出**
a>b
a<b

```java
import java.math.*;
import java.util.*;
public class Main {
    public static void main(String args[]) {
        Scanner cin=new Scanner(System.in);
        BigInteger a,b,t;
        t=BigInteger.valueOf(0);
        a=cin.nextBigInteger();
        b=cin.nextBigInteger();
        while(!(a.equals(t))&&!(b.equals(t)))
        {
            if(a.equals(b))
                System.out.println("a==b");
            else if(a.compareTo(b)>0)
                System.out.println("a>b");
            else
                System.out.println("a<b");
            a=cin.nextBigInteger();
            b=cin.nextBigInteger();
        }
    }
}
```

## 2051: 光棍的yy

时间限制: 1 Sec  内存限制: 64 MB
提交: 66  解决: 20
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
yy经常遇见一个奇怪的事情，每当他看时间的时候总会看见11:11，这个很纠结啊。

现在给你m个1，你可以把2个1组合成一个2，这样就不是光棍了，问这样的组合有多少种？？

例如（111  可以拆分为 111 12 21  有三种）

**输入**
第一行输入一个n表示有n个测试数据 以下n行，每行输入m个1 (1 <= n,m <= 200)
**输出**
输出这种组合种数，占一行
**样例输入**
 3
11
111
11111
**样例输出**
2
3
8
```java

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int n = cin.nextInt();
        BigInteger []fib = new BigInteger[200];
        fib[0] = new BigInteger("1");
        fib[1] = new BigInteger("2");
        for (int i=2;i<fib.length;i++){
            fib[i] = fib[i-1].add(fib[i-2]);
        }
        for (int j=0;j<n;j++){
            String s = cin.next();
            System.out.println(fib[s.length()-1]);
        }
        cin.close();
    }
}
```

## 1828: 棋盘覆盖

时间限制: 3 Sec  内存限制: 64 MB
提交: 18  解决: 12
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
在一个2k×2k（1<=k<=100）的棋盘中恰有一方格被覆盖，如图1（k=2时），现用一缺角的2×2方格（图2为其中缺右下角的一个），去覆盖2k×2k未被覆盖过的方格，求需要类似图2方格总的个数s。如k=1时，s=1;k=2时，s=5
**输入**
第一行m表示有m组测试数据； 每一组测试数据的第一行有一个整数数k;
**输出**
输出所需个数s;
**样例输入**
 3
1
2
3
**样例输出**
1
5
21

```java

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int n = cin.nextInt();
        for (int j=0;j<n;j++){
            BigInteger sum = new BigInteger("1");
            BigInteger a = new BigInteger("2");
            BigInteger b = new BigInteger("3");
            BigInteger c = new BigInteger("1");
            int k=cin.nextInt();
            for (int i=0;i<2*k;i++){
                sum = sum.multiply(a);
            }
            System.out.println((sum.subtract(c)).divide(b));
        }
        cin.close();
    }
}
```

## 1701: 一个数学问题

时间限制: 1 Sec  内存限制: 32 MB
提交: 102  解决: 67
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
给你两个整数n和m，请你计算有多少个整数对（a,b）满足以下条件：
当0<a<b<n时，(a^2+b^2+m)/(ab)是一个整数。
**输入**
输入包含多组测试数据。每组输入为两个整数n和m（0<n<=100），当n=m=0时，输入结束。
**输出**
对于每组输入，输出样例标号和满足要求的整数对的个数。
**样例输入**
 10 1
20 3
30 4
0 0
**样例输出**
Case 1: 2
Case 2: 4
Case 3: 5
```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        int q=1;
        while (cin.hasNext()){
            int n=cin.nextInt();
            int m=cin.nextInt();
            int k = 0;
            if (n==0||m==0){
                break;
            }else {
                for (int i=1;i<n-1;i++){
                    for (int j=i+1;j<n;j++){
                        if((i*i+j*j+m)%(i*j) ==0){
                            k++;
                        }
                    }
                }
            }
            System.out.println("Case "+q+": "+k);
            q++;
        }
        cin.close();
    }
}
```

## 1989: mdd的烦恼

时间限制: 1 Sec  内存限制: 64 MB
提交: 85  解决: 48
您该题的状态：未完成
[提交][状态][讨论版]
**题目描述**
今天mdd看到这么一段话：在数论，对正整数n，欧拉函数是少于或等于n的数中与n互质的数的数目。此函数以其首名研究者欧拉命名，它又称为Euler's totient function、φ函数、欧拉商数等。 例如φ(8)=4，因为1,3,5,7均和8互质。于是他想用计算机实现欧拉函数的功能，但是他又不想去写，你能帮帮他吗？
ps:互质（relatively primeì）又叫互素。若N个整数的最大公因数是1，则称这N个整数互质。
**输入**
有多组测试数据组数小于1003，
每组测试数据有一个整数n(0<n<=65535^2+1).
**输出**
输出欧拉函数φ(n)的值。
**样例输入**
 2
6
46
**样例输出**
1
2
22

**总结：**
枚举发现超时，改成Java后也超时。
```c++
#include<iostream>
using namespace std;
int gcd(long long  a,long long b ){
	long long c;
	while(b!=0){
		c = a%b;
		a = b;
		b = c;
	}
	return a;
}
int main(){
	long long n,k;
	while(cin>>n){
		k=0;
		for(int i=1;i<=n;i++){
			if(gcd(i,n)==1){
				k++;
			}
		}
		cout<<k<<endl;
	}
	return 0;
}
```

```java
import java.io.*;
import java.math.*;
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        while(cin.hasNext()){
            BigInteger n = cin.nextBigInteger();
            BigInteger p = new BigInteger("1");
            int a = n.intValue();
            int k=0;
            for (int i=1;i<=a;i++){
                BigInteger bi = BigInteger.valueOf(i);
              if (gcd(bi,n).equals(p)) k++;
            }
            System.out.println(k);
        }
    }
    public static BigInteger gcd(BigInteger a,BigInteger b){
        BigInteger c;
        while(b.compareTo(BigInteger.ZERO)!=0){
            c = a.mod(b);
            a = b;
            b = c;
        }
        return a;
    }
}
```



## 2888: 这是一道简单的数学题

时间限制: 1 Sec  内存限制: 256 MB
提交: 2  解决: 0
您该题的状态：未完成
[提交][状态][讨论版]
**题目描述**
这是一道非常简单的数学题。

最近 LLL 同学正在看 mathematics for computer science 这本书，在看到数论那一章的时候， LLL 同学突然想到这样一个问题。

设
F(n)=∑i=1n∑j=1ilcm(i,j)gcd(i,j)
其中，lcm(a,b)\mathrm{lcm}(a,b)lcm(a,b) 表示 aaa 和 bbb 的最小公倍数，gcd(a,b)\mathrm{gcd}(a,b)gcd(a,b) 表示 aaa 和 bbb 的最大公约数。
给定 nnn ，让你求： 
F(n)mod1000000007。
LLL 同学太菜啦，QAQ，并不会做这道简单题，所以他想请你帮他解决这个问题。
**输入格式**
输入一行，一个正整数 n(1≤n≤109) n\,(1 \le n \le 10^9)n(1≤n≤10
​9
​​ )。

**输出格式**
输出 F(n)F(n)F(n) ，对 109+710^9 + 710
​9
​​ +7 取模。

**样例**
**样例输入**
5
**样例输出**
84
**这个写法时间超限**
**搜了一下题解发现自己太菜了，不该瞎想。。。。。。**
**这个题化简得有些复杂，先放一放。。。**
```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        BigInteger n = cin.nextBigInteger();
        BigInteger sum = new BigInteger("0");
        BigInteger kk = new BigInteger("1000000007");
        for (int i=1;i<=n.intValue();i++){
            for (int j=1;j<=i;j++){
                sum = sum.add((BigInteger.valueOf(i).multiply(BigInteger.valueOf(j))).divide((BigInteger.valueOf(i).gcd(BigInteger.valueOf(j))).multiply(BigInteger.valueOf(i).gcd(BigInteger.valueOf(j))))).mod(kk);
            }
        }
        System.out.println(sum.mod(kk));
        cin.close();
    }
}
```

# 8.12 
## 2009: 光棍节的快乐
时间限制: 1 Sec  内存限制: 64 MB
提交: 114  解决: 50
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
光棍们，今天是光棍节。聪明的NS想到了一个活动来丰富这个光棍节。

规则如下：

每个光棍在一个纸条上写一个自己心仪女生的名字，然后把这些纸条装进一个盒子里，这些光 棍依次抽取一张纸条，如果上面的名字就是自己心仪的女生，那么主持人就在现场给该女生打电话，告诉这个光棍对她的爱慕之情，并让光棍当场表白，并得到现场所有人的祝福，没抽到的，嘿嘿就可以幸免了。

假设一共有N个光棍,其中有M个没有抽到自己的纸条,求发生这种情况一共有多少种可能.。

**输入**
每行包含两个整数N和M(1<M<=N<=20)，以EOF结尾。
**输出**
对于每个测试实例，请输出一共有多少种发生这种情况的可能，每个实例的输出占一行。
**样例输入**
 2 2
3 2
**样例输出**
1
3
**总结：**
错排公式+排列组合。

 1. 错排公式：a[i] = (i-1)*(a[i-1]+a[i-2])
 2. 第一个人有(n-1)种可能
 3. 第二个人要分两种情况，如果第一个人拿到第二个人的，第二个人就有(n-1)种情	况，如果没拿到就有(n-2)种情况。依次向后递推
 4. 排列组合:  (n-m)!/n!
 5. 在n个人中挑n-m个人拿到自己的表白，而剩下的的人就是需要错排的m个人，即C(n)(n-m)
 6. 二者和到一块：Cn(n-m)*a[m] 
```c++
#include<iostream>
using namespace std;
int main(){
	int n,m,i;
	long long sum1,sum2,a[21];
	a[0]=1,a[1]=0,a[2]=1;
	for(i=3;i<=20;i++){
		a[i]=(i-1)*(a[i-1]+a[i-2]);
	}
	while(cin>>n>>m){
		sum1=sum2=1;
		for(i=1;i<=m;i++){
			sum1=sum1*i;
		}
		for(i=n;i>n-m;i--){
			sum2 = sum2*i;
		}
		cout<<sum2/sum1*a[m]<<endl;
	}
	return 0;
}
```

## 2025: A*B Problem

时间限制: 1 Sec  内存限制: 64 MB
提交: 99  解决: 48
您该题的状态：未完成
[提交][状态][讨论版]

## 题目描述

设计一个程序求出A*B，然后将其结果每一位相加得到C，如果C的位数大于等于2，继续将C的各位数相加，直到结果是个一位数k。

例如：

6*8=48；

4+8=12；

1+2=3；

输出3即可。

## 输入

第一行输入一个数N(0<N<=1000000)，表示N组测试数据。
随后的N行每行给出两个非负整数m，n（0<=m,n<=10^12)。

## 输出

对于每一行数据，输出k。

## 样例输入

 3
6 8
1234567 67
454 1232

## 样例输出

3
4
5

## 思路：

 1. 首先判断位数是否大于1，若大于则进入循环，反之输出。
 2. 进入循环后将每一位累加。
 3. 回到第一步继续判断。
 4. 跳出循环，得出结果，但是超时。
 5. 参考了网上的代码，模九取余。
 6. 两数相乘可以改成两数同时取余九的结果再取余九。

## Time Limit Exceeded： 
第一次思考时的代码，超时。
```c++
#include<iostream>
using namespace std;
int qq(long long dd){
	long long k=0;
	while(dd!=0){
		k++;
		dd/=10;
	}
	return k;
}
int kk(long long aa){
	long long sum=0;
	while(aa!=0){
		sum+=aa%10;
		aa /= 10;
	}
	return sum;
}
int main(){
	int n,k;
	long long a,b,sum;
	cin>>n;
	while(n--){
		k=0;
		cin>>a>>b;
		sum=a*b;
		while(qq(sum)>1){
			sum = kk(sum);
		}
		cout<<sum<<endl;
	}
	return 0;
}
```
## Accept：
**四个初等数论：**
 1. (a+b)%n=(a%n+b%n)%n;
 2. (a-b)%n=(a%n-b%n+n)%n; 
 3. (a*b)%n=(a%n*b%n)%n;
 4. k*(10^M)%9=k;

**用到了第三个：**
```c++
#include<iostream>
using namespace std;
int main(){
   int t;
    scanf("%d",&t);
    while (t--)
    {
        long long a,b;
        scanf("%lld %lld",&a,&b);
        if (a==0 || b==0)
            printf("0\n");
        else
        {
            int ans = (a%9)*(b%9)%9;
            if (ans==0) ans = 9;
            printf("%d\n",ans);
        }
    }
    return 0;
}
```


## 2022: 月老的烦恼（1）

时间限制: 1 Sec  内存限制: 64 MB
提交: 103  解决: 46
您该题的状态：未完成
[提交][状态][讨论版]

## 题目描述

月老最近遇到了一个很棘手的问题，就是“剩男”“剩女”急速增长，而自己这边又人手不足导致天天都得加班。现在需要你来帮助月老解决这个问题，牵红绳的规则很简单：每个男生都一个编号n（1<=n<=500000）,编号n的因数之和就是要牵线的女生的编号。

如20的因子是：1,2,4,5,10；

## 输入

输入数据的第一行是一个数字T(1<=T<=500000),它表明测试数据的组数.然后是T组测试数据,每组测试数据只有一个数字N(1<=N<=500000).

## 输出

对于每组测试数据,请输出一个代表输入编号N男生的另一半的编号.

## 样例输入

 3
2
10
12

## 样例输出

1
8
16
**枚举果然超时：**
```c++
#include<iostream>
using namespace std;
int main(){
	int t,n;
	cin>>t;
	while(t--){
		cin>>n;
		int sum=0;
		for(int i=1;i<n;i++){
			if(n%i==0){
				sum+=i;
			}
		}
		cout<<sum<<endl;
	}
	return 0;
}
```

**打表：**
第一次意识到cin 和scanf 的耗时差距。这道题cin超时，但scanf可以过。
```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int a[500001];
	int t,n;
	memset(a,0,sizeof(a));
	for(int i=1;i<=500000;i++){
		for(int j=1;i*j<=500000;j++){
			a[i*j]+=i;
		}
	}
	scanf("%d",&t);
	while(t--){
		scanf("%d",&n);
		printf("%d\n",a[n]-n);
	}
	return 0;
}
```


## 2019: 擅长排列的小明 II

时间限制: 1 Sec  内存限制: 64 MB
提交: 57  解决: 44
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

小明十分聪明，而且十分擅长排列计算。

有一天小明心血来潮想考考你，他给了你一个正整数n，序列1,2,3,4,5......n满足以下情况的排列：

1、第一个数必须是1

2、相邻两个数之差不大于2

你的任务是给出排列的种数。

**输入**

多组数据。每组数据中输入一个正整数n（n<=55）.

**输出**

输出种数。

**样例输入**

 4

**样例输出**

4
找规律即可
```c++
#include<iostream>
using namespace std;
int main(){
	int n;
	int a[56]={0,1,1,2};
	for(int i=4;i<56;i++){
		a[i] = a[i-1]+a[i-3]+1;
	}
	while(cin>>n){
		cout<<a[n]<<endl;
	}
	return 0;
}
```




## 2073: 移位密码

时间限制: 1 Sec  内存限制: 64 MB
提交: 78  解决: 48
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

移位密码是最简单的一类代替密码，具体算法就是将字母表的字母右移k个位置（k<26），并对字母表长度作模运算。

现给你一串密文，全部由大写字母组成。已知加密过程为：将每个字母按照字母表的顺序右移k位。

加密函数：E(m)=(m+k)%q.

请破译出明文！

**输入**

输入包含多组测试数据（少于1000组）。 每组数据包含一个字符串和一个整数k（k<26），中间用空格隔开，字符串全部由大写字母组成，长度小于50，k表示向右移动的位数.

**输出**

输出每组密文所对应的明文，每组输出占一行。

**样例输入**

 JMPWFZPV 1

**样例输出**

ILOVEYOU
总结：
注意小于A的情况A-Z循环要补上26位
```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	char a[51];
	int k;
	while(cin>>a>>k){
		for(int i=0;i<strlen(a);i++){
			a[i] = a[i]-k;
			if(a[i]<'A')
			a[i]+=26;
		}
		cout<<a<<endl;
	}
	return 0;
}
```


## 2152: 摆方格

时间限制: 1 Sec  内存限制: 64 MB
提交: 57  解决: 32
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**

  给你一个n*n的方格，每个方格里的数必须连续摆放如  

１

２

４

３

，下图为反例即不连续的。  

１

３

４

２

请输出从左上角到右下角的对角线上的最大和 。

**输入**

输入包含多组测试数据。 每一行包括一个数据n，表示n*n的方格（保证所有数据在2^64范围内且n>0）

**输出**

每行输出占一行，输出最大的对角线之和。

**样例输入**

 1
2
3

**样例输出**

1
6
19
找规律，前n-1项为等差数列，第项等于n-1项的一半。
```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	long long n;
	while(cin>>n){
		long long sum=0;
		long long  a = n*n;
		for(int i=0;i<n-1;i++){
			sum+=a;
			a -=2;
		}
		sum += a/2; 
		cout<<sum+1<<endl;
	}
	return 0;
}
```
## 2074: 乘数密码

时间限制: 1 Sec  内存限制: 64 MB
提交: 24  解决: 22
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

乘数密码也是一种替换密码，其加密变换是将明文字母串逐位乘以密钥k并进行模运算，数学表达式如下：

E(m)=k*m mod q,   gcd(k,q)=1 (即k，q互素)。

当k与q互素时，明文字母加密成密文字母的关系为一一映射。

现有一经过乘法加密的密文，请破译出它的明文。

 **输入**

输入包含多组数据,不超过1000组。 每组包含一个字符串和一个正整数k，字符串全部由大写字母组成，长度不超过50，k是与q互素的数,q=26，k<26。

**输出**

每组输出数据单独占一行，输出对应的明文。

**样例输入**

 ILOVEYOU 3

**样例输出**

UVWHKIWY
```c++
#include<iostream>
#include<cstring>
using namespace std;
char E(char a,int k){
	a =a-'A';
	for(int i=0;i<26;i++){
	if(i*k%26==a){
		a = i+'A';
	}
	}
	return a;
}
int main(){
	char a[51];
	int k;
	while(cin>>a>>k){
		for(int i=0;a[i]!='\0';i++){
			a[i] = E(a[i],k);
		}
		cout<<a<<endl;
	}
	return 0;
}
```
## 2120: N!

时间限制: 1 Sec  内存限制: 64 MB
提交: 52  解决: 38
您该题的状态：已完成
[提交][状态][讨论版]

 **题目描述**

阶乘(Factorial)是一个很有意思的函数，但是不少人都比较怕它。现在这里有一个问题，给定一个N(0<0<1000000000)，求N!的二进制表示最低位的1的位置(从右向左数)。

**输入**

本题有多组测试数据，每组数据一个正整数N(0<0<1000000000)，以EOF结束

**输出**
 **标题**
求N!的二进制表示最低位的1的位置(从右向左数)。一组数据占一行。

**样例输入**

 1
2
3
4

**样例输出**

1
2
2
4

 **提示**

2! = (2)10 = (10)2，则第一个1是第二位
3! = (6)10 = (110)2，则第一个1是第二位
4! = (24)10 = (11000)2，则第一个1是第四位

**来源**
**用JAVA试了一下，果然超时了**
```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        while (cin.hasNext()){
            BigInteger n = cin.nextBigInteger();
            BigInteger sum = new BigInteger("1");
            BigInteger k = new BigInteger("2");
            BigInteger a = new BigInteger("1");
            BigInteger num = new BigInteger("0");
            for (int i=1;i<=n.intValue();i++){
                sum = sum.multiply(BigInteger.valueOf(i));
            }
            while(true){
                if (sum.mod(k).equals(a)){
                    break;
                }
                sum = sum.divide(k);
                num=num.add(a);
            }
            System.out.println(num.add(a));
        }
    }
}
```

```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <vector>
#include <set>
using namespace std;
int main() {
	int n;
	while(~scanf("%d", &n)) {
		int ans = 0;
		while(n) {
			ans += (n >> 1);
			n >>= 1;
		}
		printf("%d\n", ans + 1);
	}
	return 0;
}
```
## 1706: 大数取模

时间限制: 1 Sec  内存限制: 32 MB
提交: 13  解决: 11
您该题的状态：已完成
[提交][状态][讨论版]

 **题目描述**

现给你两个正整数A和B，请你计算A mod B。
为了使问题简单，保证B小于100000。

**输入**

输入包含多组测试数据。每行输入包含两个正整数A和B。A的长度不超过1000，并且0<B<100000。

**输出**

对于每一个测试样例，输出A mod B。

 **样例输入**

 2 3
12 7
152455856554521 3250

**样例输出**

2
5
1521
```java
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner cin = new Scanner(System.in);
        while (cin.hasNext()){
            BigInteger a = cin.nextBigInteger();
            int b = cin.nextInt();
            System.out.println(a.mod(BigInteger.valueOf(b)));
        }
    }
}
```


# 8.13测试

## F - 2^x mod n = 1 HDU - 1395 

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 21451    Accepted Submission(s): 6725


**Problem Description**
Give a number n, find the minimum x(x>0) that satisfies 2^x mod n = 1.
 

**Input**
One positive integer on each line, the value of n.
 

**Output**
If the minimum x exists, print a line with 2^x mod n = 1.

Print 2^? mod n = 1 otherwise.

You should replace x and n with specific numbers.
 

**Sample Input**
2
5
 

**Sample Output**
2^? mod 2 = 1
2^4 mod 5 = 1
 
**思路：**

 1. 取模运算，每次取模数据不会溢出。
 2. 这道题开始写的时候发现时间超时，然后用快速幂，提交后还超时。
 3. 找规律发现遍历n一个循环，然后优化一直超时，提交了数次。浪费了很多时间，大意了。

**AC：**
```c++
#include<iostream>
using namespace std;
int main(){
	int n;
	while(cin>>n){
		if(n%2==0||n==1){
			cout<<"2^? mod "<<n<<" = 1"<<endl;
		}else{
			int ans = 1,k=0;
			while(1){
				k++;
				ans = (ans*2)%n;
				if(ans==1){
					break;
				}
			}
			cout<<"2^"<<k<<" mod "<<n<<" = 1"<<endl;
		}
	}
	return 0;
} 
```


## D - 两军交锋 HDU - 2548

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 11052    Accepted Submission(s): 6679


**Problem Description**
话说辽军与MCA相峙多年,终于在一个秋日的早晨爆发了一次大规模的冲突.情况是这样子的,当天上午,由耶律-Pacision领军的辽军忽然带领数万人马浩浩荡荡向MCA山杀来,而这时候驻扎在MCA防守前线的是久经沙场的老将纪哥.纪哥得知这个消息,立刻召集手下精英,前往阻击辽军.现已知辽军前进速度 U 米/秒 ,纪哥 速度 V 米 /秒 ,两军一开始相距L米,战地记者从两军刚开始进军就立刻开始以 W 米/秒的速度马不停蹄地往返于两军之间作第一时间的报道,即一到达一方,立刻返回前往另一方.问,当两军交锋之时,战地记者总共走的路程.
 

**Input**
首先输入一个t,表示有t组数据，跟着t行：
每行有四个实数 u ,v , w , l 分别表示辽军速度,纪哥速度,记者速度,以及起始的距离.
 

**Output**
输出一行实数表示总的路程.精确到小数点后3位.
 

**Sample Input**
1
10 20 30 100
 

**Sample Output**
100.000

**思路：**

 1. 按照相对速度来计算。
 2. 一方不动，另一方动。
 3. 得到相对速度后除以时间即路程。
 4. 之前写过类似的题。

**AC：**
```c++
#include<iostream>
using namespace std;
int main(){
	int t;
	double u,v,w,l;
	cin>>t;
	while(t--){
		scanf("%lf%lf%lf%lf",&u,&v,&w,&l);
		printf("%.3lf\n",(w*l)/(u+v));
	}
	return 0;
}
```

## H-HDU - 1840Equations

Time Limit: 1000/1000 MS (Java/Others)    Memory Limit: 65535/65535 K (Java/Others)
Total Submission(s): 1992    Accepted Submission(s): 888


**Problem Description**
All the problems in this contest totally bored you. And every time you get bored you like playing with quadratic equations of the form a*X2 + b*X + c = 0. This time you are very curious to know how many real solutions an equation of this type has.
 

**Input**
The first line of input contains an integer number Q, representing the number of equations to follow. Each of the next Q lines contains 3 integer numbers, separated by blanks, a, b and c, defining an equation. The numbers are from the interval [-1000,1000].
 

**Output**
For each of the Q equations, in the order given in the input, print one line containing the number of real solutions of that equation. Print “INF” (without quotes) if the equation has an infinite number of real solutions.
 

**Sample Input**
3
1 0 0
1 0 -1
0 0 0
 

**Sample Output**
1
2
INF
**思路：**

 1. 开始的时候被题给吓住了。
 2. 之后发现是解一元二次方程。
 3. 首先思考a！=0 的情况，那么按照公式推出三种情况。
 4. 其次判断b！=0 的情况 。
 5. 最后判断c!  = 0的的情况，注意细节。

```c++
#include<iostream>
using namespace std;
int main(){
	int q,a,b,c,ans;
	cin>>q;
	while(q--){
		cin>>a>>b>>c;
		 ans = b*b-4*a*c;
		 if(a!=0){
		 	 if(ans>0){
		 	cout<<2<<endl;
		 } else if(ans ==0){
		 	cout<<1<<endl;
		 }else if(ans < 0){
		 	cout<<0<<endl;
		 }	
		 }else{
		 	if(b!=0){
		 		cout<<1<<endl;
			 }else{
			 	if(c!=0){
			 		cout<<0<<endl;
				 }else{
				 	cout<<"INF"<<endl;
				 }
			 }
		 }
	}
	return 0;
}
```

## I Think I Need a Houseboat

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 16362    Accepted Submission(s): 4521


**Problem Description**


Fred Mapper is considering purchasing some land in Louisiana to build his house on. In the process of investigating the land, he learned that the state of Louisiana is actually shrinking by 50 square miles each year, due to erosion caused by the Mississippi River. Since Fred is hoping to live in this house the rest of his life, he needs to know if his land is going to be lost to erosion. 

After doing more research, Fred has learned that the land that is being lost forms a semicircle. This semicircle is part of a circle centered at (0,0), with the line that bisects the circle being the X axis. Locations below the X axis are in the water. The semicircle has an area of 0 at the beginning of year 1. (Semicircle illustrated in the Figure.) 


 

**Input**
The first line of input will be a positive integer indicating how many data sets will be included (N). 

Each of the next N lines will contain the X and Y Cartesian coordinates of the land Fred is considering. These will be floating point numbers measured in miles. The Y coordinate will be non-negative. (0,0) will not be given.
 

**Output**
For each data set, a single line of output should appear. This line should take the form of: 

“Property N: This property will begin eroding in year Z.” 

Where N is the data set (counting from 1), and Z is the first year (start from 1) this property will be within the semicircle AT THE END OF YEAR Z. Z must be an integer. 

After the last data set, this should print out “END OF OUTPUT.” 

Notes: 

1. No property will appear exactly on the semicircle boundary: it will either be inside or outside. 

2. This problem will be judged automatically. Your answer must match exactly, including the capitalization, punctuation, and white-space. This includes the periods at the ends of the lines. 

3. All locations are given in miles.
 

**Sample Input**
2 
1.0 1.0 
25.0 0.0
 

**Sample Output**
Property 1: This property will begin eroding in year 1. 
Property 2: This property will begin eroding in year 20. 
END OF OUTPUT. 

**这个题没什么可说的。数据有点坑，这道题没看就略过了，亏了。**
```c++
#include<iostream>
#include<cstdio>
#include<cmath>
#define PI 3.1415926
using namespace std;
int main() {
	double x, y, area;
	int T;
	scanf( "%d", &T );
	for( int i = 1; i <= T; i ++ ) {
		scanf( "%lf%lf", &x, &y );
		area = PI * pow( sqrt( x * x + y * y ),  2 ) / 2;
		printf( "Property %d: This property will begin eroding in year %d.\n", i, int ( ( area + 49.99999999 ) / 50 ) );
	}
	printf( "END OF OUTPUT.\n" );
	return 0;
}
```

# 总结： 
**2019/8/13/17：44**
这是四天做的题与体会，总之基础东西没仔细看，难得东西也没研究透。
这次测试很失败，在一道题上卡了很久，没有继续往下走。
有几道题好简单，都没看到。
还有三道题没补充上，写不下去了，以后再补充。



## TODO:



```java
public String addBinary(String a, String b) {
    int i = a.length() - 1, j = b.length() - 1, carry = 0;
    StringBuilder str = new StringBuilder();
    while (carry == 1 || i >= 0 || j >= 0) {
        if (i >= 0 && a.charAt(i--) == '1') {
            carry++;
        }
        if (j >= 0 && b.charAt(j--) == '1') {
            carry++;
        }
        str.append(carry % 2);
        carry /= 2;
    }
    return str.reverse().toString();
}
```

## 2. 字符串加法

415\. Add Strings (Easy)

[Leetcode](https://leetcode.com/problems/add-strings/description/) / [力扣](https://leetcode-cn.com/problems/add-strings/description/)

字符串的值为非负整数。

```java
public String addStrings(String num1, String num2) {
    StringBuilder str = new StringBuilder();
    int carry = 0, i = num1.length() - 1, j = num2.length() - 1;
    while (carry == 1 || i >= 0 || j >= 0) {
        int x = i < 0 ? 0 : num1.charAt(i--) - '0';
        int y = j < 0 ? 0 : num2.charAt(j--) - '0';
        str.append((x + y + carry) % 10);
        carry = (x + y + carry) / 10;
    }
    return str.reverse().toString();
}
```

# 相遇问题

## 1. 改变数组元素使所有的数组元素都相等

462\. Minimum Moves to Equal Array Elements II (Medium)

[Leetcode](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/description/) / [力扣](https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements-ii/description/)

```html
Input:
[1,2,3]

Output:
2

Explanation:
Only two moves are needed (remember each move increments or decrements one element):

[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
```

每次可以对一个数组元素加一或者减一，求最小的改变次数。

这是个典型的相遇问题，移动距离最小的方式是所有元素都移动到中位数。理由如下：

设 m 为中位数。a 和 b 是 m 两边的两个元素，且 b > a。要使 a 和 b 相等，它们总共移动的次数为 b - a，这个值等于 (b - m) + (m - a)，也就是把这两个数移动到中位数的移动次数。

设数组长度为 N，则可以找到 N/2 对 a 和 b 的组合，使它们都移动到 m 的位置。

**解法 1**  

先排序，时间复杂度：O(NlogN)

```java
public int minMoves2(int[] nums) {
    Arrays.sort(nums);
    int move = 0;
    int l = 0, h = nums.length - 1;
    while (l <= h) {
        move += nums[h] - nums[l];
        l++;
        h--;
    }
    return move;
}
```

**解法 2**  

使用快速选择找到中位数，时间复杂度 O(N)

```java
public int minMoves2(int[] nums) {
    int move = 0;
    int median = findKthSmallest(nums, nums.length / 2);
    for (int num : nums) {
        move += Math.abs(num - median);
    }
    return move;
}

private int findKthSmallest(int[] nums, int k) {
    int l = 0, h = nums.length - 1;
    while (l < h) {
        int j = partition(nums, l, h);
        if (j == k) {
            break;
        }
        if (j < k) {
            l = j + 1;
        } else {
            h = j - 1;
        }
    }
    return nums[k];
}

private int partition(int[] nums, int l, int h) {
    int i = l, j = h + 1;
    while (true) {
        while (nums[++i] < nums[l] && i < h) ;
        while (nums[--j] > nums[l] && j > l) ;
        if (i >= j) {
            break;
        }
        swap(nums, i, j);
    }
    swap(nums, l, j);
    return j;
}

private void swap(int[] nums, int i, int j) {
    int tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}
```


# 其它

## 3. 乘积数组

238\. Product of Array Except Self (Medium)

[Leetcode](https://leetcode.com/problems/product-of-array-except-self/description/) / [力扣](https://leetcode-cn.com/problems/product-of-array-except-self/description/)

```html
For example, given [1,2,3,4], return [24,12,8,6].
```

给定一个数组，创建一个新数组，新数组的每个元素为原始数组中除了该位置上的元素之外所有元素的乘积。

要求时间复杂度为 O(N)，并且不能使用除法。

```java
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] products = new int[n];
    Arrays.fill(products, 1);
    int left = 1;
    for (int i = 1; i < n; i++) {
        left *= nums[i - 1];
        products[i] *= left;
    }
    int right = 1;
    for (int i = n - 2; i >= 0; i--) {
        right *= nums[i + 1];
        products[i] *= right;
    }
    return products;
}
```