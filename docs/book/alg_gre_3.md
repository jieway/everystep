## 1.1 ❤🧡💛

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


## 1.2 ❤🧡💛
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

## 1.3 ❤🧡💛
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




## 1.4 ❤🧡💛💙

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

## 1.5 ❤🧡💛💙

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



## 1.6 ❤🧡💛💙💚

## 1.7 ❤🧡💛💙💚

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



# 参考
1. 《趣学算法》
2. 《算法导论》
