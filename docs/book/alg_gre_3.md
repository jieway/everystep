## 1.1 ❤🧡💛💙

[Luogu-p1031](https://www.luogu.com.cn/problem/P1031)

题意大致是有 n 堆纸牌，纸牌总数是 n 的倍数，也就是一定可以分成 n 堆。但任意移动向相邻的纸牌堆转移纸牌，求最小操作次数，使得 n 堆纸牌数一样多。

```c++
#include<iostream>
using namespace std;
int main(){
	int n,a[100],k=0,sum=0,s;
	cin>>n;
	for(int i=0;i<n;i++){
		cin>>a[i];
		sum+=a[i];
	}
	s=sum/n;
	for(int i=0;i<n;i++){
		if(a[i]!=s){
			a[i+1] -= s-a[i];
			a[i] += s-a[i];
			k++;
		}
	}
	cout<<k<<endl;
	return 0;
}
```

## 1.2 ❤🧡💛💙

排队打水问题。n 个人 m 个水龙头，每个人的水桶盛满水得时间分别为 t1, t2 , ……, tn为整数且各不相同，应如何安排他们的打水顺序才能使他们花费的总时间最少?

```c++
	cin>>n>>m;
	for(i=0;i<n;i++){
		cin>>a[i];
	}
	sort(a,a+n); // 将盛水时间升序排序，盛水快的在前，
	for(i=0;i<n;i++){
		sort(d,d+m);  // 再排一次序，d 数组储存的是当前水龙头下盛水的人所占用的时间。
		sum+=d[0]+a[i]; // 排序的作用是为了找出盛水最少的人。
		d[0]+=a[i]; // 找到后赋值给这个人，其实之前就已经有序了，直接赋值就可以了。
	}
	cout<<sum<<endl;
```

## 1.3 ❤🧡💛

[1259: 找零钱]()

**题目描述**

小智去超市买东西，买了不超过一百块的东西。收银员想尽量用少的纸币来找钱。

纸币面额分为50 20 10 5 1 五种。请在知道要找多少钱n给小明的情况下，输出纸币数量最少的方案。 1<=n<=99;

**输入**

有多组数据  1<=n<=99;

 **输出**

对于每种数量不为0的纸币，输出他们的面值*数量，再加起来输出

**样例输入**

25
32

**样例输出**

20*1+5*1
20*1+10*1+1*2
```c++
#include<iostream>
using namespace std;
int main(){
	int a[5]={50,20,10,5,1},b[5],n,i,first=0;
	while(cin>>n){
		first=0;
		for(i=0;i<5;i++){
			b[i] =n/a[i];
			n = n%a[i];
		}
		for(i=0;i<5;i++){			
			if(b[i]!=0&&first==0){	
			cout<<a[i]<<"*"<<b[i];
			first = 1;
			} else if(b[i]!=0){
			cout<<"+"<<a[i]<<"*"<<b[i];
			}
		}
		cout<<endl; 
	}
	return 0;
}
```


## 1.4 ❤🧡💛
[VJ_HDU_2124](https://vjudge.net/problem/HDU-2124)
```cpp
#include<stdio.h>
#include<string.h>
#include<algorithm>
using namespace std;
int a[1020];
int main()
{
    int m,n,j;
    while(~scanf("%d %d",&m,&n))
    {
        int sum=0,f=0,z=0;
        for(int i=0;i<n;i++)
            scanf("%d",&a[i]);
        sort(a,a+n);
        for(int i=n-1;i>=0;i--)
        {
           sum+=a[i];
           z++;
           if(sum>=m)
           {
               f=1;
               break;
           }
        }
        if(f==0)
            printf("impossible\n");
        else
            printf("%d\n",z);
 
    }
}
```

## 1.5 ❤🧡💛💙💚

[HDU_1052_Tian Ji -- The Horse Racing](http://acm.hdu.edu.cn/showproblem.php?pid=1052)

这道题有点复杂，分情况讨论，有点难。
```c++
# include <iostream>
# include <algorithm>
# define MAXSIZE 1010
using namespace std;
int a[MAXSIZE] , b[MAXSIZE];
int cmp(int a, int b){
    return a > b ;
}
int main(){
    int n;
    while ( cin >> n && n){
        for ( int i = 0; i < n; i++){
            cin >> a[i];
        }
        for (int i = 0; i < n; i++){
            cin >> b[i];
        }
        sort(a , a + n, cmp);
        sort(b , b + n, cmp);
        // 设置头尾两个标记
        int ai = 0 , aj = n - 1;
        int bi = 0 , bj = n - 1;
        int sum = 0 ;
        while(ai <= aj && bi <= bj){
            // 田忌的最快的🐎比齐王最快的🐎还要快。
            if (a[ai] > b[bi]){
                sum += 200;
                ai ++;
                bi ++;
            }
            // 田忌的最快的马速度低于齐王最快的马，采用田忌最慢的马拖齐王最快的马下水
            else if (a[ai] < b[bi]){
                sum -= 200;
                aj --;
                bi ++;
            } 
            /** 田忌的和齐王两只速度最快的马速度相等时比较两者最慢的马
             *平一场不如一胜一负，一胜一负，负的那一场会将齐王最快的马拖下水，
             * 可能会使田忌最快的马再赢一场。田忌的马平均水平低于齐王，一胜一负便于尽早结束比赛。
             */
            else {
               if (a[aj] > b[bj]){
                  sum += 200;
                  aj --;
                  bj --;
              }
              else if(a[aj] < b[bj]){
                  sum -= 200;
                  bi ++;
                  aj --;
              }
              else {
                /**
                 * 速度最慢的马低于速度最快的马时要扣钱
                 * 而速度最慢的马高于速度最快的马的情况已经提过了。
                */
                  if (a[aj] < b[bi]){
                      sum -= 200;
                  }
                      aj --;
                      bi ++;
              }
           }
        }
        cout << sum << endl;
    }
    return 0;
}
```

## 1.6 ❤🧡💛

[Leetcode-646](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/)

这道题的标签是动态规划，动态规划的[写法](alg_lab_16.md#)，可以直接用贪心来写，下面是贪心写法。

```cpp
class Solution {
public:
    static bool cmp(vector<int> &a, vector<int> &b) {return a[1]<b[1];}
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(),pairs.end(), cmp);
        int len = pairs.size();
        int t =  pairs[0][1];
        int k = 1;
        for(int i = 1; i < len ;i ++) {
            if (pairs[i][0] > t) {
                k++;
                t = pairs[i][1];
            }
        }
        return k;
    }
};
```



## 1.7 ❤🧡💛
[Leetcode-455](https://leetcode-cn.com/problems/assign-cookies/description/)
里面有双指针的思想。
```cpp
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        int m = g.size();
        int n = s.size();
        int i=0 , j=0;
        sort(g.begin(), g.end()),sort( s.begin(), s.end());
        int k = 0;
        while(i < m && j < n) {
            if (g[i] <= s[j] ) {
                k++;            
                i++,j++;
            }else {
                j++;
            }
        }
        return k;
    }
};
```


# 4. 根据身高和序号重组队列

406\. Queue Reconstruction by Height(Medium)

[Leetcode](https://leetcode.com/problems/queue-reconstruction-by-height/description/) / [力扣](https://leetcode-cn.com/problems/queue-reconstruction-by-height/description/)

```html
Input:
[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]

Output:
[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
```

题目描述：一个学生用两个分量 (h, k) 描述，h 表示身高，k 表示排在前面的有 k 个学生的身高比他高或者和他一样高。

为了使插入操作不影响后续的操作，身高较高的学生应该先做插入操作，否则身高较小的学生原先正确插入的第 k 个位置可能会变成第 k+1 个位置。

身高 h 降序、个数 k 值升序，然后将某个学生插入队列的第 k 个位置中。

```java
public int[][] reconstructQueue(int[][] people) {
    if (people == null || people.length == 0 || people[0].length == 0) {
        return new int[0][0];
    }
    Arrays.sort(people, (a, b) -> (a[0] == b[0] ? a[1] - b[1] : b[0] - a[0]));
    List<int[]> queue = new ArrayList<>();
    for (int[] p : people) {
        queue.add(p[1], p);
    }
    return queue.toArray(new int[queue.size()][]);
}
```

# 5. 买卖股票最大的收益

121\. Best Time to Buy and Sell Stock (Easy)

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/) / [力扣](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/description/)

题目描述：一次股票交易包含买入和卖出，只进行一次交易，求最大收益。

只要记录前面的最小价格，将这个最小价格作为买入价格，然后将当前的价格作为售出价格，查看当前收益是不是最大收益。

```java
public int maxProfit(int[] prices) {
    int n = prices.length;
    if (n == 0) return 0;
    int soFarMin = prices[0];
    int max = 0;
    for (int i = 1; i < n; i++) {
        if (soFarMin > prices[i]) soFarMin = prices[i];
        else max = Math.max(max, prices[i] - soFarMin);
    }
    return max;
}
```


# 6. 买卖股票的最大收益 II

122\. Best Time to Buy and Sell Stock II (Easy)

[Leetcode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/) / [力扣](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/description/)

题目描述：可以进行多次交易，多次交易之间不能交叉进行，可以进行多次交易。

对于 [a, b, c, d]，如果有 a <= b <= c <= d ，那么最大收益为 d - a。而 d - a = (d - c) + (c - b) + (b - a) ，因此当访问到一个 prices[i] 且 prices[i] - prices[i-1] > 0，那么就把 prices[i] - prices[i-1] 添加到收益中。

```java
public int maxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += (prices[i] - prices[i - 1]);
        }
    }
    return profit;
}
```


# 7. 种植花朵

605\. Can Place Flowers (Easy)

[Leetcode](https://leetcode.com/problems/can-place-flowers/description/) / [力扣](https://leetcode-cn.com/problems/can-place-flowers/description/)

```html
Input: flowerbed = [1,0,0,0,1], n = 1
Output: True
```

题目描述：flowerbed 数组中 1 表示已经种下了花朵。花朵之间至少需要一个单位的间隔，求解是否能种下 n 朵花。

```java
public boolean canPlaceFlowers(int[] flowerbed, int n) {
    int len = flowerbed.length;
    int cnt = 0;
    for (int i = 0; i < len && cnt < n; i++) {
        if (flowerbed[i] == 1) {
            continue;
        }
        int pre = i == 0 ? 0 : flowerbed[i - 1];
        int next = i == len - 1 ? 0 : flowerbed[i + 1];
        if (pre == 0 && next == 0) {
            cnt++;
            flowerbed[i] = 1;
        }
    }
    return cnt >= n;
}
```

# 8. 判断是否为子序列

392\. Is Subsequence (Medium)

[Leetcode](https://leetcode.com/problems/is-subsequence/description/) / [力扣](https://leetcode-cn.com/problems/is-subsequence/description/)

```html
s = "abc", t = "ahbgdc"
Return true.
```

```java
public boolean isSubsequence(String s, String t) {
    int index = -1;
    for (char c : s.toCharArray()) {
        index = t.indexOf(c, index + 1);
        if (index == -1) {
            return false;
        }
    }
    return true;
}
```

# 9. 修改一个数成为非递减数组

665\. Non-decreasing Array (Easy)

[Leetcode](https://leetcode.com/problems/non-decreasing-array/description/) / [力扣](https://leetcode-cn.com/problems/non-decreasing-array/description/)

```html
Input: [4,2,3]
Output: True
Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
```

题目描述：判断一个数组是否能只修改一个数就成为非递减数组。

在出现 nums[i] < nums[i - 1] 时，需要考虑的是应该修改数组的哪个数，使得本次修改能使 i 之前的数组成为非递减数组，并且   **不影响后续的操作**  。优先考虑令 nums[i - 1] = nums[i]，因为如果修改 nums[i] = nums[i - 1] 的话，那么 nums[i] 这个数会变大，就有可能比 nums[i + 1] 大，从而影响了后续操作。还有一个比较特别的情况就是 nums[i] < nums[i - 2]，修改 nums[i - 1] = nums[i] 不能使数组成为非递减数组，只能修改 nums[i] = nums[i - 1]。

```java
public boolean checkPossibility(int[] nums) {
    int cnt = 0;
    for (int i = 1; i < nums.length && cnt < 2; i++) {
        if (nums[i] >= nums[i - 1]) {
            continue;
        }
        cnt++;
        if (i - 2 >= 0 && nums[i - 2] > nums[i]) {
            nums[i] = nums[i - 1];
        } else {
            nums[i - 1] = nums[i];
        }
    }
    return cnt <= 1;
}
```



# 10. 子数组最大的和

53\. Maximum Subarray (Easy)

[Leetcode](https://leetcode.com/problems/maximum-subarray/description/) / [力扣](https://leetcode-cn.com/problems/maximum-subarray/description/)

```html
For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.
```

```java
public int maxSubArray(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    int preSum = nums[0];
    int maxSum = preSum;
    for (int i = 1; i < nums.length; i++) {
        preSum = preSum > 0 ? preSum + nums[i] : nums[i];
        maxSum = Math.max(maxSum, preSum);
    }
    return maxSum;
}
```

# 11. 分隔字符串使同种字符出现在一起

763\. Partition Labels (Medium)

[Leetcode](https://leetcode.com/problems/partition-labels/description/) / [力扣](https://leetcode-cn.com/problems/partition-labels/description/)

```html
Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
```

```java
public List<Integer> partitionLabels(String S) {
    int[] lastIndexsOfChar = new int[26];
    for (int i = 0; i < S.length(); i++) {
        lastIndexsOfChar[char2Index(S.charAt(i))] = i;
    }
    List<Integer> partitions = new ArrayList<>();
    int firstIndex = 0;
    while (firstIndex < S.length()) {
        int lastIndex = firstIndex;
        for (int i = firstIndex; i < S.length() && i <= lastIndex; i++) {
            int index = lastIndexsOfChar[char2Index(S.charAt(i))];
            if (index > lastIndex) {
                lastIndex = index;
            }
        }
        partitions.add(lastIndex - firstIndex + 1);
        firstIndex = lastIndex + 1;
    }
    return partitions;
}

private int char2Index(char c) {
    return c - 'a';
}
```
## 1255: 寻找最大数X

**题目描述**

请在整数 n 中删除m个数字, 使得余下的数字按原次序组成的新数最大，

比如当n=92081346718538，m=10时，则新的最大数是9888

**输入**

第一行输入一个正整数T，表示有T组测试数据

每组测试数据占一行，每行有两个数n,m（n可能是一个很大的整数，但其位数不超过100位，并且保证数据首位非0，m小于整数n的位数）

**输出**

每组测试数据的输出占一行，输出剩余的数字按原次序组成的最大新数

**样例输入**

 3
92081346718538 10
1008908 5
890 1

 **样例输出**

9888
98
90

```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int t,len,i,j,temp[101],b,c[101],max;
	char a[101];
	cin>>t;
	getchar();
	while(t--){
		cin>>a>>b;
		len = strlen(a);
		int k=-1;
		for(i=0;i<len-b;i++){
			max = 0;
			for(j=k+1;j<=b+i;j++){
				if(max<a[j]){
					max = a[j];
					k=j;
				}
			}
			cout<<a[k];
		}
		cout<<endl;
	}
	return 0;
}

```

## 2145: 寻找最大数（三）

时间限制: 1 Sec  内存限制: 64 MB
提交: 60  解决: 18
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

给出一个整数N，每次可以移动2个相邻数位上的数字，最多移动K次，得到一个新的整数。

求这个新的整数的最大值是多少。

**输入**

多组测试数据。 每组测试数据占一行，每行有两个数N和K (1 ≤ N≤ 10^18; 0 ≤ K ≤ 100).

**输出**

每组测试数据的输出占一行，输出移动后得到的新的整数的最大值。

**样例输入**

 1990 1
100 0
9090000078001234 6

**样例输出**

9190
100
9907000008001234

```c++
#include<stdio.h>
#include<string.h>
int main(){
    char a[20],temp;
    int k,l,t;
    while(~scanf("%s %d",a,&k))
    {
        l=strlen(a);
        for(int i=0;i<l&&k!=0;i++)
        {
            t=i;
            for(int j=t;j<=k+i&&j<l;j++)
            {
                if(a[j]>a[t]){
                    t=j;
                }
            }
            for(int j=t;j>i;j--)
            {
                temp=a[j];
                a[j]=a[j-1];
                a[j-1]=temp;
            }
            k-=t-i;
        }
        puts(a);
    }
}
```


```c++
#include<iostream>
#include<cstring>
using namespace std;
int swap(int x,int y){
	int t=x;
	x=y;
	y=t;
	return x,y;
}
int main(){
	char a[101];
	int b,k=0,i,j;
	while(cin>>a>>b){
			k=0;
				for(i=1;i<strlen(a)&&b!=0;i++){
					for(j=i;j>0;j--){
						if(a[j]>a[j-1]){
							if(k<b){
							swap(a[j],a[j-1]);
							k++;								
							}else{
								break;
							}
						}
					}
				}
			puts(a);
	}
	return 0;
}

```






# 参考
1. 《趣学算法》
2. 《算法导论》
