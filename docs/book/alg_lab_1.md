# 循环
## P1980 计数问题
[戳我](https://www.luogu.com.cn/problem/P1980)

### 题意
统计一段数字中某个数字出现的次数，数字拆分。

### AC

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n, x, cnt = 0;
    cin >> n >> x;
    for (int i = 1; i <= n; i++)
    {
        int k = i;
        while (k != 0)
        {
            if (x == k % 10)
            {
                cnt++;
            }
            k /= 10;
        }
    }
    cout << cnt << endl;
    return 0;
}
```

## P1567 统计天数
[戳我](https://www.luogu.com.cn/problem/P1567)

### 题意
连续的最长上升序列。
### AC
这道题的分类是数组，可以不用数组，输入直接模拟即可。
```cpp
#include <iostream>
using namespace std;
int max(int a, int b)
{
    return a > b ? a : b;
}
int main()
{
    int n, b, start, k = 0, c = 0;
    cin >> n;
    cin >> start;
    for (int i = 1; i < n; i++)
    {
        cin >> b;
        if (b > start)
        {
            k++;
            c = max(c, k);
        }
        else
        {
            k = 0;
        }
        start = b;
    }
    cout << c + 1 << endl;
    return 0;
}
```

## P1047 校门外的树

[戳我](https://www.luogu.com.cn/problem/P1047)
### 题意
题目有点长，注意细节，两头都是闭区间，直接模拟即可。种树的区域标记，没有种树的区间剔除，最后在判断。
### AC
```cpp
#include <iostream>
#define MAX_SIZE 10010
using namespace std;
int a[MAX_SIZE];
int main()
{
    int l, m, p, q;
    cin >> l >> m;
    for (int i = 0; i <= l; i++)
    {
        a[i] = 0;
    }
    for (int i = 0; i < m; i++)
    {
        cin >> p >> q;
        for (int j = p; j <= q; j++)
        {
            a[j] = 1;
        }
    }
    int cnt = 0;
    for (int i = 0; i <= l; i++)
    {
        if (a[i] == 0)
        {
            cnt++;
        }
    }
    cout << cnt << endl;
    return 0;
}
```

## P1427 小鱼的数字游戏
[戳我](https://www.luogu.com.cn/problem/P1427)

### 题意
反转数组即可，没有表明数组长度，以零结尾，注意下标范围即可。
### AC
```cpp
#include <iostream>
#define MAX_SIZE 110
using namespace std;
int a[MAX_SIZE];
int main()
{
    int n, i = 0;
    while (1)
    {
        cin >> n;
        if (n == 0)
            break;
        a[i++] = n;
    }
    for (int j = i - 1; j > 0; j--)
    {
        cout << a[j] << " ";
    }
    cout << a[0] << endl;
    return 0;
}
```

## P1428 小鱼比可爱
[戳我](https://www.luogu.com.cn/problem/P1428)
### 题意
回溯即可，注意格式，统计已经输入的数字比当前数字大的个数。
### AC
```cpp
#include <iostream>
#define MAX_SIZE 110
using namespace std;
int a[MAX_SIZE];
int main()
{
    int n, cnt;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
        int j = i;
        cnt = 0;
        while (j != -1)
        {
            if (a[i] > a[j])
            {
                cnt++;
            }
            j--;
        }
        if (i < n - 1)
        {
            cout << cnt << " ";
        }
        else
        {
            cout << cnt << endl;
        }
    }
    return 0;
}
```

## P2141 珠心算测验
[戳我](https://www.luogu.com.cn/problem/P2141)
### 题意
一列数字，任意两个数字相加的结果
### AC
```cpp
#include <iostream>
#define MAX_SIZE 200005
using namespace std;
int a[105], b[MAX_SIZE], g[MAX_SIZE];
int main()
{
    int n, ans = 0;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
        g[a[i]] = 1;
    }
    int m = 0;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            b[a[i] + a[j]]++;
            m = max(m, a[i] + a[j]);
        }
    }
    for (int i = 0; i < MAX_SIZE; i++)
    {
        if (b[i] > 0 && g[i])
        {
            ans++;
        }
    }
    cout << ans << endl;
    return 0;
}
```


# 字符串

## P1055 ISBN号码

[戳我](https://www.luogu.com.cn/problem/P1055)
### 题意
如题
### AC

'0' = 48

```cpp
#include <iostream>
using namespace std;
int main()
{
    char mod[12] = "0123456789X";
    char a[14];
    int sum = 0;
    int k = 1;
    scanf("%s", &a);
    for (int i = 0; i < 12; i++)
    {
        if (a[i] == '-')
        {
            continue;
        }
        sum += (a[i] - '0') * k;
        k++;
    }
    if (mod[sum % 11] == a[12])
    {
        cout << "Right";
    }
    else
    {
        a[12] = mod[sum % 11];
        printf("%s", a);
    }
    return 0;
}
```





## P1200 [USACO1.1]你的飞碟在这儿Your Ride Is Here
[戳我](https://www.luogu.com.cn/problem/P1200)
### 题意
注意两个字符的长度不一定非得是 6 ，而是小于 6,用string很方便
### AC

```cpp
#include <iostream>
using namespace std;
int main()
{
    string a, b;
    int num = 1;
    int aum = 1;
    cin >> a >> b;
    for (int i = 0; i < a.length(); i++)
    {
        num *= a[i] - 'A' + 1;
    }
    for (int i = 0; i < b.length(); i++)
    {
        aum *= b[i] - 'A' + 1;
    }
    if (num % 47 == aum % 47)
    {
        cout << "GO" << endl;
    }
    else
    {
        cout << "STAY" << endl;
    }
    return 0;
}
```


# 知识记录

1. fabs(-1.02) = 1.02 , abs(-1.02) = 1 , abs 返回先取绝对值后再取整，fabs 返回取绝对值
2. int gcd(int x, int y) { return gcd(y,x%y);}
3.  取整函数：
 ceil(1.499) = 2;有余数，整数加一，不小于这个数的整数。double型
 floor(1.499)=1;有余数就抹掉，不大于这个数的整数。
 round(1.499)=1;四舍五入


# 数学&公式
## 1844: 鸡兔同笼
时间限制: 3 Sec  内存限制: 64 MB
提交: 203  解决: 79
您该题的状态：未完成
[提交][状态][讨论版]
**题目描述**
已知鸡和兔的总数量为n,总腿数为m。输入n和m,依次输出鸡和兔的数目，如果无解，则输出“No answer”(不要引号)。
**输入**
第一行输入一个数据a,代表接下来共有几组数据，在接下来的(a<10)
a行里，每行都有一个n和m.(0<m,n<100)
**输出**
输出鸡兔的个数，或者No answer
**样例输入**
 2
14 32
10 16
**样例输出**
12 2
No answer
```c++
#include<iostream>
using namespace std;
int main(){
	int i,n,m,x,y;
	cin>>i;
	while(i--){
		cin>>n>>m;
		y=m/2-n;
		x=2*n-m/2;
		if(x>=0 && y>=0&&m%2==0){
					cout<<x<<" "<<y<<endl;
		}
		else{
			cout<<"No answer"<<endl;
		}

	}
	return 0;
}
```
**总结：** 
m必须为偶数，否则x可能出现小数，不符合实际情况。
## 1839: 三角形面积

时间限制: 3 Sec  内存限制: 64 MB
提交: 40  解决: 26
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
给你三个点，表示一个三角形的三个顶点，现你的任务是求出该三角形的面积
**输入**
每行是一组测试数据，有6个整数x1,y1,x2,y2,x3,y3分别表示三个点的横纵坐标。（坐标值都在0到10000之间） 输入0 0 0 0 0 0表示输入结束 测试数据不超过10000组
**输出**
输出这三个点所代表的三角形的面积，结果精确到小数点后1位（即使是整数也要输出一位小数位）
**样例输入：**
 0 0 1 1 1 3
0 1 1 0 0 0
0 0 0 0 0 0
**样例输出：**
1.0
0.5
**向量写法：**
```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	double x1,x2,x3,y1,y2,y3;
	double s;
	while(cin>>x1>>y1>>x2>>y2>>x3>>y3){
		if(x1+x2+x3+y1+y2+y3==0){
			break;
		}
		s = fabs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))*1.0/2.0;
		printf("%.1f\n",s);
	}
	return 0;
} 
```

**总结：**
fabs 是对double 型，abs 是对int 型
三角形面积可以用海伦公式写
注意换行，在这错了好几次愣是没发现。

**海伦公式写法：**

```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	double x1,x2,x3,y1,y2,y3;
	double s,a,b,c;
	double p ;
	while(cin>>x1>>y1>>x2>>y2>>x3>>y3){
		if(x1+x2+x3+y1+y2+y3==0){
			break;
		}
			a = sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
			b = sqrt((x1-x3)*(x1-x3)+(y1-y3)*(y1-y3));
			c = sqrt((x2-x3)*(x2-x3)+(y2-y3)*(y2-y3));
			p = (a+b+c)/2;
			s = sqrt(p*(p-a)*(p-b)*(p-c));
		printf("%.1f\n",s);
	}
	return 0;
} 
```
**总结：**
S=sqrt( p*(p-a)*(p-b)*(p-c) )
海伦公式，用三角形三边的边长求面积
p为三角形的半周长，p=( a+b+c )/2
这个写法很简单。但略长，不如第一个简洁


## 1730: 重心在哪里

时间限制: 1 Sec  内存限制: 32 MB
提交: 20  解决: 15
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
每个人都知道牛顿发现万有引力的故事。自从牛顿发现万有引力后，人们用万有引力理论解决了非常多的问题。不仅如此，我们也知道了每个物体都有自己的重心。
现在，给你三角形三个顶点的坐标，你能计算出三角形的重心吗？
**输入**
题目包含多组测试数据。第一行输入一个正整数n，表示测试数据的个数，当n=0时，输入结束。
接下来n行，每行包含6个数字x1，y1，x2，y2，x3，y3，表示三角形三个顶点的坐标。
**输出**
对于每组输入，输出重心的坐标，结果保留1位小数。
**样例输入**
 2
1.0 2.0 3.0 4.0 5.0 2.0
1.0 1.0 4.0 1.0 1.0 5.0
0
**样例输出**
3.0 2.7
2.0 2.3
```c++
#include<iostream>
using namespace std;
int main(){
	int i;
	double a[6],sum,num;
	while(cin>>i,i!=0){
			while(i--){
		num =0;
		sum =0;	
			for(int j=0;j<6;j++){
				cin>>a[j];	
			}
			for(int k=0;k<6;k+=2){
				sum +=a[k];
			}	
			for(int m=1;m<6;m+=2){
				num +=a[m];
			}
			printf("%.1f %.1f\n",sum/3,num/3);
	}
	}
	return 0;
}
```
**总结：**
注意格式。

```c++
#include<iostream>
#include<map>//pair的头文件
using namespace std;
int main(){
	int i;
	double x,y;
	while(cin>>i,i!=0){
			while(i--){
				x=y=0;
				pair<double,double>p1;
				cin>>p1.first>>p1.second;
				pair<double,double>p2;
				cin>>p2.first>>p2.second;
				pair<double,double>p3;
				cin>>p3.first>>p3.second;
				x = (p1.first+p2.first+p3.first)/3;
				y = (p1.second+p2.second+p3.second)/3;
			printf("%.1f %.1f\n",x,y);
	}
	}
	return 0;
}
```
**总结：**
stl中pair方法的使用
pair中可以储存两个值。
也可以pair中套pair储存更多的值
如下：

```c
pair <int ,pair<int ,int > >
```

定义
```php
   pair<int, double> p1;  //使用默认构造函数
   pair<int, double> p2(1, 2.4);  //用给定值初始化
   pair<int, double> p3(p2);  //拷贝构造函数
```
访问
```c
 pair<int, double> p1;  //使用默认构造函数
 p1.first = 1;
 p1.second = 2.5;
 cout << p1.first << ' ' << p1.second << endl;
```
pair是单个数据对的操作，pair是一struct类型，有两个成员变量，通过first,second来访问，用的是“.”访问。 
map是一个关联容器，里面存放的是键值对，容器中每一元素都是pair类型，通过map的insert()方法来插入元素(pair类型)。


## 1838: 另一种阶乘问题

时间限制: 3 Sec  内存限制: 64 MB
提交: 69  解决: 60
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**

大家都知道阶乘这个概念，举个简单的例子：5！=1*2*3*4*5.现在我们引入一种新的阶乘概念，将原来的每个数相乘变为i不大于n的所有奇数相乘例如：5!!=1*3*5.现在明白现在这种阶乘的意思了吧！

现在你的任务是求出1!!+2!!......+n!!的正确值(n<=20)

**输入**
第一行输入一个a(a<=20)，代表共有a组测试数据 接下来a行各行输入一个n.
**输出**
各行输出结果一个整数R表示1!!+2!!......+n!!的正确值
**样例输入**
 2
3
5
**样例输出**
5
23
```c++
#include<iostream>
using namespace std;
int main(){
	int i,j,k,m,a,n,sum;
	cin>>a;
	while(a--){
		cin>>n;
		sum=0;
		for(j=1;j<=n;j++){
			k=1;
			for(i=1;i<=j;i=i+2){
				k=k*i;
			}
			sum+=k;
		}
		cout<<sum<<endl;
		
	}
	return 0;
}
```
**总结：**注意k=1的位置。

## 1851: 小学生算术

时间限制: 3 Sec  内存限制: 64 MB
提交: 129  解决: 63
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
很多小学生在学习加法时，发现“进位”特别容易出错。你的任务是计算两个三位数在相加时需要多少次进位。你编制的程序应当可以连续处理多组数据，直到读到两个0（这是输入结束标记）。
**输入**
输入两个正整数m,n.(m,n,都是三位数)
**输出**
输出m,n,相加时需要进位多少次。
**样例输入**
 123 456
555 555
123 594
0 0
**样例输出**
0
3 
1
```c++
#include<iostream>
using namespace std;
int main(){
	int m,n,k;
	while(cin>>m>>n&&m!=0&&n!=0){
		k=0;
			if(m%10+n%10>9){
				k++;
			}
			if(m/10%10+n/10%10>9||m%10+n%10>9&&m/10%10+n/10%10 +1 >9){
				k++;
			}
			if(m/100+n/100>9||m/10%10+n/10%10>9&&m/100+n/100+1>9||m%10+n%10>9&&m/10%10+n/10%10+1>9&&m/100+n/100+1>9){
				k++;
			}
			cout<<k<<endl;
		}
	return 0;
}
```
**总结：**
首先判断各位相加大于9的情况，
其次判断十位相加大于9或者个位相加大于9且十位相加等于9的情况。
最后判断百位相加大于9或者十位相加大于9且百位相加等于9的情况或者个位相加大于9且十位相加等于9且百位相加等于9的情况。

## 1842: 水仙花数

时间限制: 1 Sec  内存限制: 64 MB
提交: 165  解决: 82
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
请判断一个数是不是水仙花数。
其中水仙花数定义各个位数立方和等于它本身的三位数。
**输入**
有多组测试数据，每组测试数据以包含一个整数n(100<=n<1000) 输入0表示程序输入结束。
**输出**
如果n是水仙花数就输出Yes 否则输出No
**样例输入**
 153
154
0
**样例输出**
Yes
No
```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int a,b[3];
	while(cin>>a){
		if(a == 0)
			break;
		else{
			b[0]=a%10;
			b[1]=a/10%10;
			b[2]=a/100%10;
			if(a == (pow(b[0],3)+pow(b[1],3)+pow(b[2],3)))
				cout<<"Yes"<<endl;
			else
				cout<<"No"<<endl;
		}
	}
	return 0;
}

```
**总结：**
注意分离每一位上的数字。

## 1852: 日期计算

时间限制: 3 Sec  内存限制: 64 MB
提交: 96  解决: 62
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
如题，输入一个日期，格式如：2010 10 24 ，判断这一天是这一年中的第几天。
**输入**
第一行输入一个数N（0<N<=100）,表示有N组测试数据。后面的N行输入多组输入数据，每行的输入数据都是一个按题目要求格式输入的日期。
**输出**
每组输入数据的输出占一行，输出判断出的天数n
**样例输入**
 3
2000 4 5
2001 5 4
2010 10 24
**样例输出**
96
124
297

```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int a,b[3],sum;
	int c1[12]={31,29,31,30,31,30,31,31,30,31,30,31};
	int c2[12]={31,28,31,30,31,30,31,31,30,31,30,31};
	cin>>a;
	while(a--){
		sum=0;
		cin>>b[0]>>b[1]>>b[2];
		if((b[0]%400==0 )||(b[0]%4 ==0 && b[0]%100 !=0)){
			for(int j=0;j<b[1]-1;j++){
				sum += c1[j];
			}
		}
		else{
			for(int k=0;k<b[1]-1;k++){//注意b[1]-1
				sum +=c2[k];
			}
		}
		cout<<sum+b[2]<<endl;
	}
	return 0;
}

```
**总结：**
注意月份，从0开始，容易多算一月。

## 绝对值排序

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 116766    Accepted Submission(s): 54917


**Problem Description**
输入n(n<=100)个整数，按照绝对值从大到小排序后输出。题目保证对于每一个测试实例，所有的数的绝对值都不相等。
 

**Input**
输入数据有多组，每组占一行，每行的第一个数字为n,接着是n个整数，n=0表示输入数据的结束，不做处理。 
 

**Output**
对于每个测试实例，输出排序后的结果，两个数之间用一个空格隔开。每个测试实例占一行。
 

**Sample Input**
3 3 -4 2
4 0 1 2 -3
0
 

**Sample Output**
-4 3 2
-3 2 1 0

```c++
#include<iostream>
#include<algorithm>
using namespace std;
int main(){
	int n,a[100],t;
	while(cin>>n&& n!=0){	
		for(int i=0;i<n;i++){
			cin>>a[i];
		}
		for(int j=0;j<n;j++){
			for(int k=0;k<n-1-j;k++){
				if(a[k]*a[k]<a[k+1]*a[k+1]){
					t=a[k];
					a[k]=a[k+1];
					a[k+1]=t;
				}
			}
		}
		for(int m=0;m<n-1;m++){
			cout<<a[m]<<" ";
		}	cout<<a[n-1]<<endl;

	}
	return 0;
}
```
**总结：**绝对值排序，考虑平方。冒泡排序时注意数组越界。

## 素数判定
Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 200589    Accepted Submission(s): 70909

**Problem Description**
对于表达式n^2+n+41，当n在（x,y）范围内取整数值时（包括x,y）(-39<=x<y<=50)，判定该表达式的值是否都为素数。
 

**Input**
输入数据有多组，每组占一行，由两个整数x，y组成，当x=0,y=0时，表示输入结束，该行不做处理。
 

**Output**
对于每个给定范围内的取值，如果表达式的值都为素数，则输出"OK",否则请输出“Sorry”,每组输出占一行。
 

**Sample Input**
0 1
0 0
 

**Sample Output**
OK
 

```c++
#include<iostream>
using namespace std;
int main(){
	int a,b;
	while(cin>>a>>b&&(a!=0)||(b!=0)){
		if(a>b){
			a=a^b;
			b=a^b;
			a=a^b;
		}
		bool c=true;
		for(int i=a;i<=b;i++){
			for(int j=2;j<i*i+i+41;j++)
				if((i*i+i+41)%j==0)
					c=false;
		}
		if(c==true)
			cout<<"OK"<<endl;
		else
			cout<<"Sorry"<<endl;
	}
	return 0;
}
```


## 1908: 素数

时间限制: 3 Sec  内存限制: 64 MB
提交: 119  解决: 52
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
走进世博园某信息通信馆，参观者将获得前所未有的尖端互动体验，一场充满创想和喜悦的信息通信互动体验秀将以全新形式呈现，从观众踏入展馆的第一步起，就将与手持终端密不可分，人类未来梦想的惊喜从参观者的掌上展开。

在等候区的梦想花园中，参观者便开始了他们奇妙的体验之旅，等待中的游客可利用手机等终端参与互动小游戏，与梦想剧场内的虚拟人物Kr. Kong 进行猜数比赛。当屏幕出现一个整数X时，若你能比Kr. Kong更快的发出最接近它的素数答案，你将会获得一个意想不到的礼物。

例如：当屏幕出现22时，你的回答应是23；当屏幕出现8时，你的回答应是7；若X本身是素数，则回答X;若最接近X的素数有两个时，则回答大于它的素数。

 

**输入**
第一行：N 要竞猜的整数个数 接下来有N行，每行有一个正整数X 1<=N<=5 1<=X<=1000
**输出**
输出有N行，每行是对应X的最接近它的素数
**样例输入**
 4
22
5
18
8
**样例输出**
23
5
19
7

```c++
#include<iostream>
#include<cmath>
using namespace std;
int prime(int a){
	int i;
	if(a==1)
	return 1;
	for(i=2;i*i<=a;i++)
		if(a%i ==0)
		return 1;
	return 0;
}
int main(){
	int a,b;
	int k,j;
	cin>>a;
	while(a--){
		cin>>b;
		for(k=b;prime(k);k--);//注意for循环的分号。
		for(j=b;prime(j);j++);
		if(j - b <= b-k)
			cout<<j<<endl;
		else
			cout<<k<<endl;
		}
	return 0;
}

```


# 图形逻辑
## 2017: 九九乘法表

时间限制: 1 Sec  内存限制: 64 MB
提交: 104  解决: 52
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
小时候学过的九九乘法表也许将会扎根于我们一生的记忆,现在让我们重温那些温暖的记忆,请编程输出九九乘法表.

现在要求你输出它的格式与平常的 不同啊! 是那种反过来的三角形啦，具体如下图：



每两个式子之前用一个空格 隔开。。。

**输入**
第一有一个整数N，表示有N组数据（N<10） 接下来由N行，每行只有一个整数M(1<=M<=9);
**输出**
对应每个整数M，根据要求输出乘法表的前N行,具体格式参见输入输出样例和上图. 每两组测试数据结果之间有一个空行隔开，具体如输出样例。
**样例输入**
 3
2
1
5
**样例输出**
1*1=1 1*2=2 1*3=3 1*4=4 1*5=5 1*6=6 1*7=7 1*8=8 1*9=9
2*2=4 2*3=6 2*4=8 2*5=10 2*6=12 2*7=14 2*8=16 2*9=18

1*1=1 1*2=2 1*3=3 1*4=4 1*5=5 1*6=6 1*7=7 1*8=8 1*9=9

1*1=1 1*2=2 1*3=3 1*4=4 1*5=5 1*6=6 1*7=7 1*8=8 1*9=9
2*2=4 2*3=6 2*4=8 2*5=10 2*6=12 2*7=14 2*8=16 2*9=18
3*3=9 3*4=12 3*5=15 3*6=18 3*7=21 3*8=24 3*9=27
4*4=16 4*5=20 4*6=24 4*7=28 4*8=32 4*9=36
5*5=25 5*6=30 5*7=35 5*8=40 5*9=45

```c++
#include<iostream>
using namespace std;
int main(){
	int m,a;
	cin>>m;
	while(m--){
		cin>>a;
			for(int j=1;j<=a;j++){
				for(int k=j;k<=9;k++){
					cout<<j<<"*"<<k<<"="<<j*k<<" ";
				}
				cout<<endl;
			}
			cout<<endl;
		}
	return 0;
}

```
**总结：**
注意格式找规律，有坑。
## 杨辉三角

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 102917    Accepted Submission(s): 41340


**Problem Description**
还记得中学时候学过的杨辉三角吗？具体的定义这里不再描述，你可以参考以下的图形：
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 5 10 10 5 1
 

**Input**
输入数据包含多个测试实例，每个测试实例的输入只包含一个正整数n（1<=n<=30），表示将要输出的杨辉三角的层数。
 

**Output**
对应于每一个输入，请输出相应层数的杨辉三角，每一层的整数之间用一个空格隔开，每一个杨辉三角后面加一个空行。
 

**Sample Input**
2 3
 

**Sample Output**
1
1 1

1
1 1
1 2 1

```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int n,i,j,a[30][30];
	while(cin>>n){
		for(i=1;i<=n;i++){
			for(j=1;j<=n;j++){
				if(j==1||i==j)
				a[i][j]=1;
				else
				a[i][j]=a[i-1][j-1]+a[i-1][j];
			}
		}
		for(i=1;i<=n;i++){
			for(j=1;j<i;j++)
			cout<<a[i][j]<<" ";
			cout<<1<<endl;
		}
		cout<<endl;
	}
	return 0;
} 
```

# 模拟题

按照要求一步步模拟即可

## 1854: 开灯问题

时间限制: 3 Sec  内存限制: 64 MB
提交: 123  解决: 80
您该题的状态：已完成
[提交][状态][讨论版]

## 题目描述

有n盏灯，编号为1~n，第1个人把所有灯打开，第2个人按下所有编号为2 的倍数的开关（这些灯将被关掉），第3 个人按下所有编号为3的倍数的开关（其中关掉的灯将被打开，开着的灯将被关闭），依此类推。一共有k个人，问最后有哪些灯开着？输入：n和k，输出开着的灯编号。k≤n≤1000

## 输入

输入一组数据：n和k

## 输出

输出开着的灯编号

## 样例输入

 7 3

## 样例输出

1 5 6 7

```c++
#include<iostream>
#include<string.h>
using namespace std;
int main(){
	int n,k,i,j,a[1000],first=1;
	cin>>n>>k;
	memset(a,0,sizeof(a));
	for(i=1;i<=k;i++){ 
		for(j=1;j<=n;j++)
		{ 
			if(j%i==0)
			a[j] = !a[j];
		}
	}
	for(i=1;i<=n;i++){
		if(a[i]){
			if(first)
			{
				first=0;
			}else{
				cout<<" ";
			}
			cout<<i;
		}
	}
	cout<<endl;
	return 0;
}
```
## 总结： 
1：把1000看成100了。
2：还有格式不对，既然尾巴的空格之前的数字是动态出现的，可以从头部的数字考虑，这一点没想到，正难则反。
WA了8次，扎心。

## 1916: 无线网络覆盖

时间限制: 3 Sec  内存限制: 64 MB
提交: 52  解决: 29
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

我们的乐乐同学对于网络可算得上是情有独钟，他有一个计划，那就是用无线网覆盖郑州大学。

现在学校给了他一个机会，因此他要购买很多的无线路由。现在他正在部署某条大道的网络，而学校只允许把他的无线路由器放在路的正中间。我们默认这条大道是笔直的并且它在任何地方的宽度都一样。并且所有的路由器的覆盖面积是相同的。现在乐乐计算出这条大道的长和宽，以及路由器的覆盖半径，想请你帮忙，帮他计算出他最少要购买的路由器的数量。

注意：为了防止某种干扰，两台无线路由之间的最小距离不能小于1米

图1中为一条矩形的道路，中间的虚线代表中线。图2为最小覆盖的示意图。

 

**输入**

输入包括多组测试数据 第一部分：一个整数T(1<=T<=500) 第二部分：一共T行，每行包括三个整数L,D,R代表路的长，宽和覆盖半径（米）。 (1<=L<=100000),(1<=D<=50),(1<=R<=200)。

**输出**

对于每组测试数据输出各占一行，只有一个整数，表示最少的路由器数量。如果不能覆盖，请输出impossible

**样例输入**

     2
    40 6 5
    40 10 5

**样例输出**

    5
    impossible

```c++
#include<iostream>
#include<cmath>
using namespace std;
int main(){
	int t;
	cin>>t;
	while(t--){
		double l,d,r;
		cin>>l>>d>>r;
		if(2*r<=d){
			cout<<"impossible"<<endl;
		}else{
			cout<<ceil(l/sqrt(4*r*r-d*d))<<endl;
		}
	}
	return 0;
}
```

**总结：**
 题很简单，可惜没图，网上搜了一下。注意取整ceil的使用。
 取整函数：
 ceil(1.499) = 2;有余数，整数加一，不小于这个数的整数。double型
 floor(1.499)=1;有余数就抹掉，不大于这个数的整数。
 round(1.499)=1;四舍五入
 

## 1146: 上楼梯

时间限制: 1 Sec  内存限制: 128 MB
提交: 44  解决: 28
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

1个人上楼，每次可上1、2或3个台阶，楼梯有n个台阶，共有多少种上楼方法。请用递归算法实现。

 

**输入**

输入一个整数n，范围为[1,30]

**输出**

输出一个整数

**样例输入**

 3

**样例输出**

4
```c++
#include<iostream>
using namespace std;
int def(int x){
	if(x==1){
		return 1;
	}if(x==2){
		return 2;
	}if(x==0){
		return 1;
	}
	return def(x-1)+def(x-2)+def(x-3);
}
int main(){
	int a;
	cin>>a;
	cout<<def(a)<<endl;
	return 0;
}
```
**总结：**
这个问题要考虑有多少种可能站在这一级上，也是就考虑三种可能，数列的头部得写好，然后递归。

## 2093: 奋斗的小蜗牛

时间限制: 1 Sec  内存限制: 64 MB
提交: 106  解决: 63
您该题的状态：已完成
[提交][状态][讨论版]

**题目描述**

传说中能站在金字塔顶的只有两种动物，一种是鹰，一种是蜗牛。一只小蜗牛听了这个传说后，大受鼓舞，立志要爬上金字塔。为了实现自己的梦想，蜗牛找到了老鹰,老鹰告诉它金字塔高H米，小蜗牛知道一个白天自己能向上爬10米，但由于晚上要休息，自己会下滑5米。它想知道自己在第几天能站在金字塔顶，它想让你帮他写个程序帮助它。

**输入**

第一行有一个整数t,表示t组测试数据。
第二行一个整数H（0<H<10^9）代表金字塔的高度。

**输出**

输出一个整数n表示小蜗牛第n天站在金字塔顶上

**样例输入**

 2
1
5

**样例输出**

1
1
```c++
#include<iostream>
#include<string>
using namespace std;
int main(){
	int i,a;
	cin>>i;
	while(i--){
		cin>>a;
		if(a<=10){
			cout<<1<<endl;
		}else{
			if(a%10<=5)
			cout<<(a-1)/5<<endl;
			if(a%10>5)
			cout<<a/5<<endl;
		}
	}
	return 0;
}
```
**总结：**
找规律。


## 母牛的故事

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 126805    Accepted Submission(s): 62003


**Problem Description**
有一头母牛，它每年年初生一头小母牛。每头小母牛从第四个年头开始，每年年初也生一头小母牛。请编程实现在第n年的时候，共有多少头母牛？
 

**Input**
输入数据由多个测试实例组成，每个测试实例占一行，包括一个整数n(0<n<55)，n的含义如题目中描述。
n=0表示输入数据的结束，不做处理。
 

**Output**
对于每个测试实例，输出在第n年的时候母牛的数量。
每个输出占一行。
 

**Sample Input**
2
4
5
0
 

**Sample Output**
2
4
6
 
```c++
#include<iostream>
using namespace std;
int main(){
	int n,f[50];
	while(cin>>n&&(n!=0)){
		f[1]=1;f[2]=2;f[3]=3;
		for(int i=4;i<=n;i++){
			f[i]=f[i-3]+f[i-1];
		}
		cout<<f[n]<<endl;
	}
	return 0;
}
```
**递归写法**
```c++
#include<iostream>
using namespace std;
int cow(int a){
	if(a<5)
	return a;
	else
	return cow(a-1)+cow(a-3);
}
int main(){
	int a;
	while(cin>>a&& a!=0){
	cout<<cow(a)<<endl;		
	}
	return 0;
} 
```
## C语言合法标识符

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 107916    Accepted Submission(s): 40848


**Problem Description**
输入一个字符串，判断其是否是C的合法标识符。
 

**Input**
输入数据包含多个测试实例，数据的第一行是一个整数n,表示测试实例的个数，然后是n行输入数据，每行是一个长度不超过50的字符串。
 

**Output**
对于每组输入数据，输出一行。如果输入数据是C的合法标识符，则输出"yes"，否则，输出“no”。
 

**Sample Input**
3
12ajf
fi8x_a
ff  ai_2
 

**Sample Output**
no
yes
no

```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int i,c;
	char a[51];
	cin>>i;
	getchar();
	while(i--){
		c=0;
		gets(a);
		if(a[0]>='0'&&a[0]<='9')
			cout<<"no"<<endl;
		else {
		for(int k=0;k<strlen(a);k++){
			if((a[k]>='0'&&a[k]<='9')||
			(a[k]>='a'&&a[k]<='z')||
			(a[k]>='A'&&a[k]<='Z')||
			(a[k]=='_'))
			c++;
		}
		if(c==strlen(a))
		cout<<"yes"<<endl;
		else
		cout<<"no"<<endl;
	}
	} 
	return 0;
} 
```
## 汉字统计

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 66898    Accepted Submission(s): 36000


**Problem Description**
统计给定文本文件中汉字的个数。
 

**Input**
输入文件首先包含一个整数n，表示测试实例的个数，然后是n段文本。
 

**Output**
对于每一段文本，输出其中的汉字的个数，每个测试实例的输出占一行。

[Hint:]从汉字机内码的特点考虑~

 

**Sample Input**
2
WaHaHa! WaHaHa! 今年过节不说话要说只说普通话WaHaHa! WaHaHa!
马上就要期末考试了Are you ready?
 

**Sample Output**
14
9
```python
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int i,c;
	char a[1000];
	cin>>i;
	getchar();
	while(i--){
		c=0;
		gets(a);
		for(int j=0;j<strlen(a);j++){
			if(a[j]<0)
			c++;
		}
		cout<<c/2<<endl;
	} 
	return 0;
} 
```
**总结：** 汉字以两位ask||码组成，且最高位为1。所以除2，小于零的才为汉字。


## 1877: 字符串替换

时间限制: 3 Sec  内存限制: 64 MB
提交: 116  解决: 75
您该题的状态：已完成
[提交][状态][讨论版]

## 题目描述

编写一个程序实现将字符串中的所有"you"替换成"we"

## 输入

输入包含多行数据 每行数据是一个字符串，长度不超过1000 数据以EOF结束

## 输出

对于输入的每一行，输出替换后的字符串

## 样例输入

 you are what you do

## 样例输出

we are what we do
```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	char a[1003];
	while(gets(a)){
		int b=strlen(a);
		for(int i=0;i<b;i++){
			if(a[i] =='y'&&a[i+1]=='o'&&a[i+2]=='u'&& i+2<b){
				cout<<"we";
				i+=2;
				continue;
			}
			cout<<a[i];
		}
		cout<<endl;
	}
	return 0;
}
```

## 2014: 大小写互换

时间限制: 1 Sec  内存限制: 64 MB
提交: 70  解决: 52
您该题的状态：已完成
[提交][状态][讨论版]

## 题目描述

现在给出了一个只包含大小写字母的字符串，不含空格和换行，要求把其中的大写换成小写，小写换成大写，然后输出互换后的字符串。

## 输入

第一行只有一个整数m（m<=10),表示测试数据组数。 接下来的m行，每行有一个字符串（长度不超过100）。

## 输出

输出互换后的字符串，每组输出占一行。

## 样例输入

 2
Acm
ACCEPTED

## 样例输出

aCM
accepted
```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int i;
	char a[102];
	cin>>i;
	getchar();
	while(i--){
		gets(a);
		int k= strlen(a);
		for(int j=0;j<k;j++){
			if(122>=a[j]&&a[j]>=97){
				a[j] = a[j]-32;
			}else{
				a[j] = a[j]+32;
			}
		}
		puts(a);
	}
	return 0;
}
```
## 总结：
1： sacnf/cin输入遇到空格会识别成下一个参数，而gets()却能够拿到空格。
2：getchar()只能那到字符串
3：ask|| 码大写的范围是65-90 ，小写的范围是97 - 122。
