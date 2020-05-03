
## 1.1 ❤🧡💛

[VJ-HDU-2111](https://vjudge.net/problem/HDU-2111)

```c++
/**
 * 题目：HDU_2111_Saving HDU
 * 来源：http://acm.hdu.edu.cn/showproblem.php?pid=2111
 * 思路：这个题有点坑，注意是题目中给得是单价，而非总价值。
 * 结果：32188886	2020-01-18 01:19:13	Accepted	2111	0MS	1396K	796 B	G++	weijiew
*/
#include <iostream>
#include <algorithm>
using namespace std;
const int MAXSIZE = 110;

struct Value{
    int x , y ;
}a[MAXSIZE];

int cmp(Value a, Value b){
    return a.x > b.x;
}
int main(){
    int v, n;
    while(cin >> v){
        if ( v == 0){
        	break;
		}
        cin >> n ;
        for (int i = 0; i < n; i++){
            cin >> a[i].x >> a[i].y;
        }
        // 升序排列
        sort(a,a+n,cmp);
        int ans = 0;
        for (int i = 0; i < n; i++){
            // 判断当前容量是否够用，够用就放入计算所得价值，不够就计算剩余容量得价值
            if (v >= a[i].y)
            {
                ans += a[i].x * a[i].y;
                v -= a[i].y;
            }else
            {
                ans += a[i].x * v;
                // 两者都行，如果直接break，v可以不用为零
                // v = 0;
                break;
            }
            
        }
        cout << ans << endl;
    }
    return 0;
}
```

## 1.2 ❤🧡💛

[VJ-HDU-1009](https://vjudge.net/problem/HDU-1009)

* 题意大致是一个老鼠想要猫看守的厂库中的吃的，猫看管了 n 个仓库，不同厂库的性价比不同，但是老鼠需要拿猫喜欢的食物来换，不同仓库需要给猫的食物也不同，老鼠如何才能拿到最多的自己喜欢的食物。

```cpp
/**
 * 题目：HDU_1009_FatMouse' Trade
 * 来源：http://acm.hdu.edu.cn/showproblem.php?pid=1009
 * 思路：贪心策略为性价比最高的优先，然后依次贪心。
 * 结果：32196913	2020-01-18 18:39:12	Accepted	1009	561MS	1520K	794 B	G++	weijiew
*/
#include <iostream>
#include <algorithm>
# define MAXSIZE 1010
using namespace std;
struct room{
    double j , f , h;
}a[MAXSIZE];

int cmp(room a , room b){
    return a.h > b.h;
}

int main() {
    int m, n;
    while (cin >> m >> n) {
        if (m == -1 || n == -1){
            break;
        }
        for (int i = 0; i < n; i++){
            cin >> a[i].j >> a[i].f;
            a[i].h = a[i].j / a[i].f;
        }
        sort(a , a + n,cmp);
        double sum = 0 ;
        for (int i = 0; i < n; i++){
            if(a[i].f <= m){
                sum += a[i].j;
                m -= a[i].f;
            }else{
                sum += a[i].h * m;
                break;
            }
        }
        printf("%.3lf\n",sum);
    }
    return 0;
}
```



## 1.3 ❤🧡💛💙



[XYNU-1736] 看电视

时间限制: 1 Sec  内存限制: 32 MB
提交: 133  解决: 90
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

暑假到了，小明终于可以开心的看电视了。但是小明喜欢的节目太多了，他希望尽量多的看到完整的节目。
现在他把他喜欢的电视节目的转播时间表给你，你能帮他合理安排吗？

**输入**

输入包含多组测试数据。每组输入的第一行是一个整数n（n<=100），表示小明喜欢的节目的总数。
接下来n行，每行输入两个整数si和ei（1<=i<=n），表示第i个节目的开始和结束时间，为了简化问题，每个时间都用一个正整数表示。
当n=0时，输入结束。

**输出**

对于每组输入，输出能完整看到的电视节目的个数。

**样例输入**

 12
1 3
3 4
0 7
3 8
15 19
15 20
10 15
8 18
6 12
5 10
4 14
2 9
0

**样例输出**

5

```c++
#include<iostream>
#include<algorithm>
#include<fstream>
using namespace std;
const int maxn=110;
struct node {
	int x;
	int y;
}ds[maxn];
bool cmp(node a,node b){
	return a.y<b.y;
}
int main(){
	int n,i,j,lastx,k;
	while(cin>>n&&n!=0){
		k=1;
		for(i=0;i<n;i++){
		cin>>ds[i].x>>ds[i].y;		
		}
		sort(ds,ds+n,cmp);
		lastx=ds[0].y;
		for(i=0;i<n;i++){
			if(ds[i].x>=lastx){
				lastx = ds[i].y;
				k++;
			}
		}
		cout<<k<<endl;
	}
	return 0;
}
```
**总结：**
结构体排序，不能排节目开始的时间，应该排节目结束的时间。
完整节目意味着节目之间没有交集。

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

# 8.6

## 1253: 磁带最大利用率问题

时间限制: 1 Sec  内存限制: 128 MB
提交: 131  解决: 82
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

设有n个程序{1,2，...,n}要存放在长度为L的磁带上。程序i存放在磁带上的长度是li，1<=i<=n.

程序存储问题要求确定这n个程序在磁带上的一个存储方案，使得能够在磁带上存储尽可能多的程序。在保证存储最多程序的前提下，要求磁带的利用率最大。

编程任务：对于给定的n个程序存放在磁带上的长度，编程计算磁带上最多可以存储的程序数和占用磁带的长度。

**输入**

第一行是2个正整数，分别表示文件个数n和磁带长度L。第二行中，有n个正整数，表示程序存放在磁带上的长度。

**输出**

第一行输出最多可以存储的程序数和占用磁带的长度；第二行输出存放在磁带上的每个程序的长度，（输出程序次序应与输入数据次序保持一致）

**样例输入**

 9 50
2 3 13 8 80 20 21 22 23

**样例输出**

5 49
2 3 13 8 23
```c++
#include<iostream>
#include<algorithm>
using namespace std;
struct node{
	int x;
	int y;
} a[100];
bool cmp0(node a,node b){
	return a.x < b.x;
}
bool cmp1(node a,node b){
	return a.y < b.y;
}
int main(){
	int i,n,l,sum=0,k=0,m,p;
	cin>>n>>l;
	for(i=0;i<n;i++){
		cin>>a[i].x;
		a[i].y = i;
	}
	sort(a,a+n,cmp0);
	for(i=0;i<n;i++){
		sum +=a[i].x;
		if(sum>l){
			break;
		}
		k++;
	}
	sum=0;
	for(i=0;i<k-1;i++){
		sum += a[i].x;
	}
	m = l-sum;
	for(i=n-1;i>=0;i--){
		if(a[i].x<m){
			sum+=a[i].x;
			p=i;
			break;
		}
	}
	cout<<k<<" "<<sum<<endl;
	sort(a,a+k,cmp1);
	for(i=0;i<k-1;i++){
		cout<<a[i].x<<" ";
	}
	cout<<a[p].x<<endl;
	return 0;
} 
```
**总结：**
我真菜。俩小时，md，注意顺序。

## 1255: 寻找最大数X

时间限制: 1 Sec  内存限制: 128 MB
提交: 125  解决: 79
您该题的状态：已完成
[提交][状态][讨论版]

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
## 2113: 找点

时间限制: 2 Sec  内存限制: 64 MB
提交: 166  解决: 78
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

上数学课时，老师给了LYH一些闭区间，让他取尽量少的点，使得每个闭区间内至少有一个点。但是这几天LYH太忙了，你们帮帮他吗？

**输入**

多组测试数据。 每组数据先输入一个N，表示有N个闭区间（N≤100)。 接下来N行，每行输入两个数a，b(0≤a≤b≤100），表示区间的两个端点。

**输出**

输出一个整数，表示最少需要找几个点。

**样例输入**

 4
1 5
2 4
1 4
2 3
3
1 2
3 4
5 6
1
2 2

**样例输出**

1
3
1
```c++
#include<iostream>
#include<cstring>
#include<algorithm>
using namespace std;
struct node{
	int x;
	int y;
}a[101];
bool cmp(node a,node b){
	if(a.y==b.y)return a.x<b.x;
	else return a.y<b.y;
}
int main(){
	int n,i,sum=0;
	while(cin>>n){
		for(i=0;i<n;i++){
			cin>>a[i].x>>a[i].y;
		}
		sum=1;
		sort(a,a+n,cmp);
		int t=a[0].y;
		for(i=1;i<n;i++){
			if(a[i].x>t){
				sum++;
				t=a[i].y;
			}
		}
		cout<<sum<<endl; 
	}
	return 0;
}
```
**总结：**
按右端点排序，右端点相同按左端点排序，小区间放前面，然后依次更新自增。

# 8.7

## 1259: 找零钱

时间限制: 1 Sec  内存限制: 128 MB
提交: 106  解决: 75
您该题的状态：已完成
[提交][状态][讨论版]

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

## 1803: 会场安排问题

时间限制: 3 Sec  内存限制: 64 MB
提交: 199  解决: 84
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

学校的小礼堂每天都会有许多活动，有时间这些活动的计划时间会发生冲突，需要选择出一些活动进行举办。小刘的工作就是安排学校小礼堂的活动，每个时间最多安排一个活动。现在小刘有一些活动计划的时间表，他想尽可能的安排更多的活动，请问他该如何安排。

**输入**

第一行是一个整型数m(m<100)表示共有m组测试数据。
每组测试数据的第一行是一个整数n(1<n<10000)表示该测试数据共有n个活动。
随后的n行，每行有两个正整数Bi,Ei(0<=Bi,Ei<10000),分别表示第i个活动的起始与结束时间（Bi<=Ei)

**输出**

对于每一组输入，输出最多能够安排的活动数量。 每组的输出占一行

**样例输入**

 2
2
1 10
10 11
3
1 10
10 11
11 20

**样例输出**

1
2

```c++
#include<iostream>
#include<algorithm>
using namespace std;
struct node{
	int l;
	int r;
}a[10001];
bool cmp(node a,node b){
	if(a.r==b.r)return a.l<b.l;
	else return a.r<b.r;
}
int main(){
	int m,n,i;
	cin>>m;
	while(m--){
		cin>>n;
		for(i=0;i<n;i++){
			cin>>a[i].l>>a[i].r;
		}
		sort(a,a+n,cmp);
		int t = a[0].r,k=1;
		for(i=0;i<n;i++){
			if(t+1<=a[i].l){
				k++;
				t=a[i].r;
			}
		}
		cout<<k<<endl;
	}
	return 0;
}
```
**总结：**
注意k+1 下一个时间的开始不能等于上一个时间的结束！

## 2143: 非洲小孩

时间限制: 1 Sec  内存限制: 64 MB
提交: 20  解决: 13
您该题的状态：未开始
[提交][状态][讨论版]

**题目描述**

家住非洲的小孩，都很黑。为什么呢？
第一，他们地处热带，太阳辐射严重。
第二，他们不经常洗澡。（常年缺水，怎么洗澡。）
现在，在一个非洲部落里，他们只有一个地方洗澡，并且，洗澡时间很短，瞬间有木有！！（这也是没有的办法，缺水啊！！）
每个小孩有一个时间段能够洗澡。并且，他们是可以一起洗的（不管你是男孩是女孩）。
那么，什么时间洗澡，谁应该来洗，由谁决定的呢？那必然是他们伟大的“澡”神啊。“澡”神有一个时间表，记录着该部落的小孩，什么时候段可以洗澡。现在，“澡”神要问你，一天内，他需要最少开启和关闭多少次洗澡的水龙头呢？因为，开启和关闭一次水龙头是非常的费力气的，即便，这也是瞬间完成的。

**输入**

多组数据
第一行一个0<n<=100。
接下来n行，每行一个时间段。H1H1:M1M1-H2H2:M2M2，24小时制。
保证该时间段是在一天之内的。但是，不保证，H1H1:M1M1先于H2H2:M2M2。

**输出**

题目描述，“澡”神最少需要开启和关闭多少次水龙头呢？

**样例输入**

 1
00:12-12:12
3
00:12-13:14
13:13-18:00
17:00-19:14

**样例输出**

1
2

```c++
#include<iostream>
#include<algorithm>
using namespace std;
struct node{
	int l1;
	int l2;
	int l3;
	int r1;
	int r2;
	int r3;
}a[10001];
bool cmp(node a,node b){
	if(a.r3==b.r3)return a.l3<b.l3;
	else return a.r3<b.r3;
}
int main(){
	int n,i;
	while(cin>>n){
		for(i=0;i<n;i++){
			scanf("%d:%d-%d:%d",
			a[i].l1,a[i].l2,a[i].r1,a[i].r2);
			a[i].l3 = a[i].l1*60+a[i].l2;
			a[i].r3 = a[i].r1*60+a[i].r3;
			if(a[i].l3>a[i].r3){
				int p=a[i].l3;
				a[i].l3 =a[i].r3;
				a[i].r3 = p;
			}
		}
		sort(a,a+n,cmp);
		int t=a[0].r3;
		int k=0;
		for(i=0;i<n;i++){
			if(t<a[i].l3){
				k++;
				t=a[i].r3;
			}
		}
		cout<<k<<endl;
	} 
	return 0;
}
```

```c++
#include<iostream>
#include<algorithm>
using namespace std;
struct Node{
	int x,y;
}time[101];
int cmp(Node a,Node b){
	if(a.y==b.y)return a.x<b.x;
	else return a.y<b.y;
}
int main(){
	int n,i,a,b,c,d;
	while(cin>>n){
		for(i=0;i<n;i++){
			scanf("%d:%d-%d:%d",&a,&b,&c,&d);
			time[i].x = a*60+b;
			time[i].y = c*60+d;
			if(time[i].x>time[i].y){
				swap(time[i].x,time[i].y);
			}
		}
		sort(time,time+n,cmp);
		int k=1;
		for(i=0;i<n-1;i++){
			if(time[i].y>=time[i+1].x){
				time[i+1].y = min(time[i].y,time[i+1].y);
			}else k++;
		}
		cout<<k<<endl; 
	}
	return 0;
}
```


# 8.8
## 1193: 笨鸟先飞

时间限制: 1 Sec  内存限制: 32 MB
提交: 118  解决: 50
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

多多是一只小菜鸟，都说笨鸟先飞，多多也想来个菜鸟先飞。于是它从0点出发，一开始的飞行速度为1m/s，每过一个单位时间多多的飞行速度比上一个单位时间的飞行速度快2m/s，问n（0<n<10^5）个单位时间之后多多飞了多远?

**输入**

先输入一个整数T表示有几组数据。每组数据输入一个n，表示多多飞行的时间。

**输出**

输出多多飞行了多远，因为数字很大，所以对10000取模。

**样例输入**

 2
1
2

**样例输出**

1
4
**思路：** 
根据题目累加即可，水题，注意取模，每算一次取模一次。
```c++
#include<iostream>
using namespace std;
int main(){
	int t,n,sum;
	cin>>t;
	while(t--){
		int sum=0;
		int a=1;
		cin>>n;
		for(int i=0;i<n;i++){
			sum = (sum+a)%10000;
			a = (a+2)%10000;
		}
		cout<<sum<<endl;
	}
	return 0;
}
```


## 1174: 猜数字

时间限制: 1 Sec  内存限制: 32 MB
提交: 221  解决: 105
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

现在，我想让你猜一个数字x（1000<=x<=9999），它满足以下要求：
（1）x % a = 0；
（2）(x+1) % b = 0；
（3）(x+2) % c = 0；
其中1<=a，b，c<=100。
给你a，b，c的值，你能告诉我x是多少吗？

**输入**

输入的第一行为c，表示测试样例的个数。接下来的c行每行包括a，b，c三个整数。

**输出**

对于每一个测试样例，输出所求的x，如果x不存在，则输出Impossible。

**样例输入**

 2
44 38 49
25 56 3

**样例输出**

Impossible
2575

```c++
#include<iostream>
using namespace std;
int main(){
	int n,a,b,c;
	cin>>n;
	while(n--){
		cin>>a>>b>>c;
		int k=0;
		for(int i=1000;i<10000;i++){
			if(i%a==0&&(i+1)%b==0&&(i+2)%c==0){
				cout<<i<<endl;
				break;
			}else{
				k++;
			}
		}
		if(k==9000){
			cout<<"Impossible"<<endl;
		} 
	}
	return 0;
} 
```
 **总结：**
枚举即可。


## 今年暑假不AC

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 90003    Accepted Submission(s): 48058




## Repair the Wall

Time Limit: 5000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 7876    Accepted Submission(s): 3632


**Problem Description**
Long time ago , Kitty lived in a small village. The air was fresh and the scenery was very beautiful. The only thing that troubled her is the typhoon.

When the typhoon came, everything is terrible. It kept blowing and raining for a long time. And what made the situation worse was that all of Kitty's walls were made of wood.

One day, Kitty found that there was a crack in the wall. The shape of the crack is 
a rectangle with the size of 1×L (in inch). Luckly Kitty got N blocks and a saw(锯子) from her neighbors.
The shape of the blocks were rectangle too, and the width of all blocks were 1 inch. So, with the help of saw, Kitty could cut down some of the blocks(of course she could use it directly without cutting) and put them in the crack, and the wall may be repaired perfectly, without any gap.

Now, Kitty knew the size of each blocks, and wanted to use as fewer as possible of the blocks to repair the wall, could you help her ?
 

**Input**
The problem contains many test cases, please process to the end of file( EOF ).
Each test case contains two lines.
In the first line, there are two integers L(0<L<1000000000) and N(0<=N<600) which
mentioned above.
In the second line, there are N positive integers. The ith integer Ai(0<Ai<1000000000 ) means that the ith block has the size of 1×Ai (in inch).
 

**Output**
For each test case , print an integer which represents the minimal number of blocks are needed.
If Kitty could not repair the wall, just print "impossible" instead.
 

**Sample Input**
5 3
3 2 1
5 2
2 1
 

**Sample Output**
2
impossible
```c++
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

### [HDU_1052_Tian Ji -- The Horse Racing](http://acm.hdu.edu.cn/showproblem.php?pid=1052)

这道题有点复杂，分情况讨论，有点难。
```c++
/**
 * 题目：HDU_1052_Tian Ji -- The Horse Racing
 * 来源：http://acm.hdu.edu.cn/showproblem.php?pid=1052
 * 思路：注释
 * 结果：32201226	2020-01-19 00:23:44	Accepted	1052	93MS	1420K	1607 B	G++	weijiew
**/
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
## 1.1 

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


# 参考
1. 《趣学算法》
2. 《算法导论》



<!-- GFM-TOC -->
* [1. 分配饼干](#1-分配饼干)
* [2. 不重叠的区间个数](#2-不重叠的区间个数)
* [3. 投飞镖刺破气球](#3-投飞镖刺破气球)
* [4. 根据身高和序号重组队列](#4-根据身高和序号重组队列)
* [5. 买卖股票最大的收益](#5-买卖股票最大的收益)
* [6. 买卖股票的最大收益 II](#6-买卖股票的最大收益-ii)
* [7. 种植花朵](#7-种植花朵)
* [8. 判断是否为子序列](#8-判断是否为子序列)
* [9. 修改一个数成为非递减数组](#9-修改一个数成为非递减数组)
* [10. 子数组最大的和](#10-子数组最大的和)
* [11. 分隔字符串使同种字符出现在一起](#11-分隔字符串使同种字符出现在一起)
<!-- GFM-TOC -->


保证每次操作都是局部最优的，并且最后得到的结果是全局最优的。

# 1. 分配饼干

455\. Assign Cookies (Easy)

[Leetcode](https://leetcode.com/problems/assign-cookies/description/) / [力扣](https://leetcode-cn.com/problems/assign-cookies/description/)

```html
Input: grid[1,3], size[1,2,4]
Output: 2
```

题目描述：每个孩子都有一个满足度 grid，每个饼干都有一个大小 size，只有饼干的大小大于等于一个孩子的满足度，该孩子才会获得满足。求解最多可以获得满足的孩子数量。

1. 给一个孩子的饼干应当尽量小并且又能满足该孩子，这样大饼干才能拿来给满足度比较大的孩子。
2. 因为满足度最小的孩子最容易得到满足，所以先满足满足度最小的孩子。

在以上的解法中，我们只在每次分配时饼干时选择一种看起来是当前最优的分配方法，但无法保证这种局部最优的分配方法最后能得到全局最优解。我们假设能得到全局最优解，并使用反证法进行证明，即假设存在一种比我们使用的贪心策略更优的最优策略。如果不存在这种最优策略，表示贪心策略就是最优策略，得到的解也就是全局最优解。

证明：假设在某次选择中，贪心策略选择给当前满足度最小的孩子分配第 m 个饼干，第 m 个饼干为可以满足该孩子的最小饼干。假设存在一种最优策略，可以给该孩子分配第 n 个饼干，并且 m < n。我们可以发现，经过这一轮分配，贪心策略分配后剩下的饼干一定有一个比最优策略来得大。因此在后续的分配中，贪心策略一定能满足更多的孩子。也就是说不存在比贪心策略更优的策略，即贪心策略就是最优策略。

<div align="center"> <img src="https://cs-notes-1256109796.cos.ap-guangzhou.myqcloud.com/e69537d2-a016-4676-b169-9ea17eeb9037.gif" width="430px"> </div><br>

```java
public int findContentChildren(int[] grid, int[] size) {
    if (grid == null || size == null) return 0;
    Arrays.sort(grid);
    Arrays.sort(size);
    int gi = 0, si = 0;
    while (gi < grid.length && si < size.length) {
        if (grid[gi] <= size[si]) {
            gi++;
        }
        si++;
    }
    return gi;
}
```

# 2. 不重叠的区间个数

435\. Non-overlapping Intervals (Medium)

[Leetcode](https://leetcode.com/problems/non-overlapping-intervals/description/) / [力扣](https://leetcode-cn.com/problems/non-overlapping-intervals/description/)

```html
Input: [ [1,2], [1,2], [1,2] ]

Output: 2

Explanation: You need to remove two [1,2] to make the rest of intervals non-overlapping.
```

```html
Input: [ [1,2], [2,3] ]

Output: 0

Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
```

题目描述：计算让一组区间不重叠所需要移除的区间个数。

先计算最多能组成的不重叠区间个数，然后用区间总个数减去不重叠区间的个数。

在每次选择中，区间的结尾最为重要，选择的区间结尾越小，留给后面的区间的空间越大，那么后面能够选择的区间个数也就越大。

按区间的结尾进行排序，每次选择结尾最小，并且和前一个区间不重叠的区间。

```java
public int eraseOverlapIntervals(int[][] intervals) {
    if (intervals.length == 0) {
        return 0;
    }
    Arrays.sort(intervals, Comparator.comparingInt(o -> o[1]));
    int cnt = 1;
    int end = intervals[0][1];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            continue;
        }
        end = intervals[i][1];
        cnt++;
    }
    return intervals.length - cnt;
}
```

使用 lambda 表示式创建 Comparator 会导致算法运行时间过长，如果注重运行时间，可以修改为普通创建 Comparator 语句：

```java
Arrays.sort(intervals, new Comparator<int[]>() {
    @Override
    public int compare(int[] o1, int[] o2) {
        return o1[1] - o2[1];
    }
});
```

# 3. 投飞镖刺破气球

452\. Minimum Number of Arrows to Burst Balloons (Medium)

[Leetcode](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/) / [力扣](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/description/)

```
Input:
[[10,16], [2,8], [1,6], [7,12]]

Output:
2
```

题目描述：气球在一个水平数轴上摆放，可以重叠，飞镖垂直投向坐标轴，使得路径上的气球都被刺破。求解最小的投飞镖次数使所有气球都被刺破。

也是计算不重叠的区间个数，不过和 Non-overlapping Intervals 的区别在于，[1, 2] 和 [2, 3] 在本题中算是重叠区间。

```java
public int findMinArrowShots(int[][] points) {
    if (points.length == 0) {
        return 0;
    }
    Arrays.sort(points, Comparator.comparingInt(o -> o[1]));
    int cnt = 1, end = points[0][1];
    for (int i = 1; i < points.length; i++) {
        if (points[i][0] <= end) {
            continue;
        }
        cnt++;
        end = points[i][1];
    }
    return cnt;
}
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
