# 数组

|                题目                 | 难度  |
| :---------------------------------: | :---: |
| [Leetcode-867](alg/Leetcode-867.md) |   1   |
| [Leetcode-283](alg/Leetcode-283.md) |   1   |
| [Leetcode-167](alg/Leetcode-167.md) |   1   |
|  [Leetcode-1](alg/Leetcode-1.md)   |  2  |
|  [Leetcode-66](alg/Leetcode-66.md)  |  💗🧡💛  |
| [Leetcode-633](alg/Leetcode-633.md) |  💗🧡💛  |
| [Leetcode-345](alg/Leetcode-345.md) |  💗🧡💛  |
| [Leetcode-680](alg/Leetcode-680.md) |  💗🧡💛  |
|  [Leetcode-88](alg/Leetcode-88.md)  |  💗🧡💛  |
| [Leetcode-141](alg/Leetcode-141.md) |  💗🧡💛  |

# 链表

|                 题目                 | 难度  |      语言       |           总结           |
| :----------------------------------: | :---: | :-------------: | :----------------------: |
| [Leetcode-206](alg/Leetcode-206.md)  |   💗   | cpp Java Python |       原地反转链表       |
|  [Leetcode-92](alg/Leetcode-92.md)   |   💗   | cpp Java Python |  在给定的范围内反转链表  |
|  [Leetcode-24](alg/Leetcode-24.md)   |  💗💗   | cpp Java Python |         交换链表         |
| [Leetcode-160](alg/Leetcode-160.md)  |  💗💗   |    cpp Java     |  求两条链表开始相交部分  |
|  [Leetcode-21](alg/Leetcode-21.md)   |  💗💗   |    cpp Java     |     合并两个有序链表     |
|  [Leetcode-83](alg/Leetcode-83.md)   |  💗💗   |       cpp       | 删除排序链表中的重复元素 |
|  [Leetcode-82](alg/Leetcode-82.md)   |  💗💗   |       cpp       |                          |
|  [Leetcode-19](alg/Leetcode-19.md)   |  💗💗   |   cpp   Java    |                          |
|   [Leetcode-2](alg/Leetcode-2.md)    |  💗💗   |       cpp       |                          |
|   [Leetcode-7](alg/Leetcode-7.md)    |  💗💗   |       cpp       |                          |
|   [❌Leetcode-9](alg/Leetcode-9.md)   |  💗💗   |       cpp       |                          |
|  [❌Leetcode-10](alg/Leetcode-10.md)  |  💗💗   |       cpp       |                          |
|  [❌Leetcode-86](alg/Leetcode-86.md)  |  💗💗   |       cpp       |                          |
| [❌Leetcode-148](alg/Leetcode-148.md) |  💗💗   |       cpp       |                          |
| [❌Leetcode-143](alg/Leetcode-143.md) |  💗💗   |       cpp       |                          |
| [❌Leetcode-141](alg/Leetcode-141.md) |  💗💗   |       cpp       |                          |
| [❌Leetcode-142](alg/Leetcode-142.md) |  💗💗   |       cpp       |                          |
| [❌Leetcode-234](alg/Leetcode-234.md) |  💗💗   |       cpp       |                          |
| [❌Leetcode-138](alg/Leetcode-138.md) |  💗💗   |       cpp       |                          |

# 栈

|               题目                | 难度  |   语言   |
| :-------------------------------: | :---: | :------: |
| [Leetcode-20](alg/Leetcode-20.md) |   💗   | cpp Java |

## 💗

括号配对问题

# STL 

## 1830: 懒省事的小明

时间限制: 3 Sec  内存限制: 64 MB
提交: 181  解决: 63
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
      小明很想吃果子，正好果园果子熟了。在果园里，小明已经将所有的果子打了下来，而且按果子的不同种类分成了不同的堆。小明决定把所有的果子合成一堆。 因为小明比较懒，为了省力气，小明开始想点子了:
每一次合并，小明可以把两堆果子合并到一起，消耗的体力等于两堆果子的重量之和。可以看出，所有的果子经过n-1次合并之后，就只剩下一堆了。小明在合并果子时总共消耗的体力等于每次合并所耗体力之和。 
因为还要花大力气把这些果子搬回家，所以小明在合并果子时要尽可能地节省体力。假定每个果子重量都为1，并且已知果子的种类数和每种果子的数目，你的任务是设计出合并的次序方案，使小明耗费的体力最少，并输出这个最小的体力耗费值。 
例如有3种果子，数目依次为1，2，9。可以先将1、2堆合并，新堆数目为3，耗费体力为3。接着，将新堆与原先的第三堆合并，又得到新的堆，数目为12，耗费体力为12。所以小明总共耗费体力=3+12=15。可以证明15为最小的体力耗费值。
**输入**
第一行输入整数N(0<N<=10)表示测试数据组数。接下来每组测试数据输入包括两行，第一行是一个整数n(1<＝n<=12000)，表示果子的种类数。第二行包含n个整数，用空格分隔，第i个整数ai(1<＝ai<=20000)是第i种果子的数目。
**输出**
每组测试数据输出包括一行，这一行只包含一个整数，也就是最小的体力耗费值。
**样例输入**
 1
3 
1 2 9
**样例输出**
15
**思路：** 

 1. 需要保证每一次累加都是排好序的。加完之后还得填入队列中。
 2. 所以用到了优先队列，队列内部自动排序。
 3. 思想和贪心很像，默认升序排列，累加存入，得到最终结果。
```c++
#include<iostream>
#include<queue>
using namespace std;
int main(){
	int N,n,a,x;
	cin>>N;
	while(N--){
		cin>>n;
		priority_queue<int ,vector<int>,greater<int> > qq;
		for(int i=0;i<n;i++){
			cin>>a;
			qq.push(a);
		} 
		long long sum = 0;
		while(qq.size()!=1){
			x = qq.top();
			qq.pop();
			x += qq.top();
			qq.pop();
			sum +=x;
			qq.push(x);
		}
		cout<<sum<<endl;
	}
	return 0;
} 
```

## 1793: Binary String Matching

时间限制: 3 Sec  内存限制: 64 MB
提交: 77  解决: 52
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
Given two strings A and B, whose alphabet consist only ‘0’ and ‘1’. Your task is only to tell how many times does A appear as a substring of B? For example, the text string B is ‘1001110110’ while the pattern string A is ‘11’, you should output 3, because the pattern A appeared at the posit
**输入**
The first line consist only one integer N, indicates N cases follows. In each case, there are two lines, the first line gives the string A, length (A) <= 10, and the second line gives the string B, length (B) <= 1000. And it is guaranteed that B is always longer than A.
**输出**
For each case, output a single line consist a single integer, tells how many times do B appears as a substring of A.
**样例输入**
 3
11
1001110110
101
110010010010001
1010
110100010101011 
**样例输出**
3
0
3 

```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int n;
	cin>>n;
	while(n--){
	string a,b;		
		cin>>a>>b;
		int q=0,i=0;
		while((i=b.find(a,i))!=(string::npos)){//判断b中是否包含a的子串
			q++,i++;
		}
		cout<<q<<endl;
	} 
	return 0;
}
```
## Crazy Search

Time Limit: 10000/5000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 3632    Accepted Submission(s): 1314


**Problem Description**
Many people like to solve hard puzzles some of which may lead them to madness. One such puzzle could be finding a hidden prime number in a given text. Such number could be the number of different substrings of a given size that exist in the text. As you soon will discover, you really need the help of a computer and a good algorithm to solve such a puzzle.

Your task is to write a program that given the size, N, of the substring, the number of different characters that may occur in the text, NC, and the text itself, determines the number of different substrings of size N that appear in the text.

As an example, consider N=3, NC=4 and the text "daababac". The different substrings of size 3 that can be found in this text are: "daa", "aab", "aba", "bab", "bac". Therefore, the answer should be 5. 
 

**Input**
The first line of input consists of two numbers, N and NC, separated by exactly one space. This is followed by the text where the search takes place. You may assume that the maximum number of substrings formed by the possible set of characters does not exceed 16 Millions.
 

**Output**
The program should output just an integer corresponding to the number of different substrings of size N found in the given text.
The first line of a multiple input is an integer N, then a blank line followed by N input blocks. Each input block is in the format indicated in the problem description. There is a blank line between input blocks.

The output format consists of N output blocks. There is a blank line between output blocks.

 

**Sample Input**
1

3 4
daababac
 

**Sample Output**
5
```c++
#include<iostream>
#include<cstring>
#include<map> 
using namespace std;
int main(){
	int t,a,b;
	cin>>t;
	while(t--){
		int k=0;
		string s;
		map<string,int> snum;//创建一个map容器，键位string类型的，值为int型 
		cin>>a>>b>>s;
		for(int i=0;i<=s.length()-a;i++){
			string ss = s.substr(i,a);//切割从i开始，长度为a子串 
			if(snum[ss]==0){//得到一个字符作为下标放入map中，进行判断是否出现过 
				k++;//进行计数，返回字串数量 
				snum[ss]=1;//标记这个下标，下次出现就不进入循环。 
			}
		}
		cout<<k<<endl;
		if(t>1){
			cout<<endl;
		}
	}
	return 0;
}  
```
## 排序

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 83261    Accepted Submission(s): 25138


**Problem Description**
输入一行数字，如果我们把这行数字中的‘5’都看成空格，那么就得到一行用空格分割的若干非负整数（可能有些整数以‘0’开头，这些头部的‘0’应该被忽略掉，除非这个整数就是由若干个‘0’组成的，这时这个整数就是0）。

你的任务是：对这些分割得到的整数，依从小到大的顺序排序输出。

 

**Input**
输入包含多组测试用例，每组输入数据只有一行数字（数字之间没有空格），这行数字的长度不大于1000。  

输入数据保证：分割得到的非负整数不会大于100000000；输入数据不可能全由‘5’组成。
 

**Output**
对于每个测试用例，输出分割得到的整数排序的结果，相邻的两个整数之间用一个空格分开，每组输出占一行。
 

**Sample Input**
0051231232050775
 

**Sample Output**
0 77 12312320
```c++
#include<iostream>
#include<sstream>//istringstream的头文件 
#include<vector> 
#include<algorithm>
using namespace std;
int main(){
	string s;
	while(cin>>s){
		vector<int> a;//设置一个动态数组 
		for(int i=0;i<s.size();i++){
			if(s[i]=='5'){
				s[i]=' ';
			}
		}
		istringstream ww(s);//读取字符串 
		int t;
		while(ww>>t){
			a.push_back(t);//转换成int型 
		}
		sort(a.begin(),a.end());//升序 
		for(int i=0;i<a.size();i++){//输出注意格式 
			cout<<a[i]; 
			if(i<a.size()-1){
				cout<<" ";
			}else{
				cout<<endl;
			}
		}
	}
	return 0;
}
```


## 优先队列
**默认升序**
```c++
priority_queue<int ,vector<int>,greater<int> > qq;
```
**自定义优先级，降序**
```c++

struct node
{
	int x,y,step;
};
struct cmp                             //定义优先级
{	bool operator()(node s,node t)
	{
		return s.step > t.step;
	}
};

	priority_queue<node,vector<node>,cmp> Q;
```

## 1793: Binary String Matching

时间限制: 3 Sec  内存限制: 64 MB
提交: 77  解决: 52
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
Given two strings A and B, whose alphabet consist only ‘0’ and ‘1’. Your task is only to tell how many times does A appear as a substring of B? For example, the text string B is ‘1001110110’ while the pattern string A is ‘11’, you should output 3, because the pattern A appeared at the posit
**输入**
The first line consist only one integer N, indicates N cases follows. In each case, there are two lines, the first line gives the string A, length (A) <= 10, and the second line gives the string B, length (B) <= 1000. And it is guaranteed that B is always longer than A.
**输出**
For each case, output a single line consist a single integer, tells how many times do B appears as a substring of A.
**样例输入**
 3
11
1001110110
101
110010010010001
1010
110100010101011 
**样例输出**
3
0
3 

```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int n;
	cin>>n;
	while(n--){
	string a,b;		
		cin>>a>>b;
		int q=0,i=0;
		while((i=b.find(a,i))!=(string::npos)){//判断b中是否包含a的子串
			q++,i++;
		}
		cout<<q<<endl;
	} 
	return 0;
}
```
## 排序

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 83261    Accepted Submission(s): 25138


**Problem Description**
输入一行数字，如果我们把这行数字中的‘5’都看成空格，那么就得到一行用空格分割的若干非负整数（可能有些整数以‘0’开头，这些头部的‘0’应该被忽略掉，除非这个整数就是由若干个‘0’组成的，这时这个整数就是0）。

你的任务是：对这些分割得到的整数，依从小到大的顺序排序输出。

 

**Input**
输入包含多组测试用例，每组输入数据只有一行数字（数字之间没有空格），这行数字的长度不大于1000。  

输入数据保证：分割得到的非负整数不会大于100000000；输入数据不可能全由‘5’组成。
 

**Output**
对于每个测试用例，输出分割得到的整数排序的结果，相邻的两个整数之间用一个空格分开，每组输出占一行。
 

**Sample Input**
0051231232050775
 

**Sample Output**
0 77 12312320
```c++
#include<iostream>
#include<sstream>//istringstream的头文件 
#include<vector> 
#include<algorithm>
using namespace std;
int main(){
	string s;
	while(cin>>s){
		vector<int> a;//设置一个动态数组 
		for(int i=0;i<s.size();i++){
			if(s[i]=='5'){
				s[i]=' ';
			}
		}
		istringstream ww(s);//读取字符串 
		int t;
		while(ww>>t){
			a.push_back(t);//转换成int型 
		}
		sort(a.begin(),a.end());//升序 
		for(int i=0;i<a.size();i++){//输出注意格式 
			cout<<a[i]; 
			if(i<a.size()-1){
				cout<<" ";
			}else{
				cout<<endl;
			}
		}
	}
	return 0;
}
```

## 1864: 士兵杀敌（一）

时间限制: 1 Sec  内存限制: 64 MB
提交: 93  解决: 50
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
南将军手下有N个士兵，分别编号1到N，这些士兵的杀敌数都是已知的。

小工是南将军手下的军师，南将军现在想知道第m号到第n号士兵的总杀敌数，请你帮助小工来回答南将军吧。

注意，南将军可能会问很多次问题。

**输入**
只有一组测试数据
第一行是两个整数N,M，其中N表示士兵的个数(1<N<1000000)，M表示南将军询问的次数(1<M<100000)
随后的一行是N个整数，ai表示第i号士兵杀敌数目。(0<=ai<=100)
随后的M行每行有两个整数m,n，表示南将军想知道第m号到第n号士兵的总杀敌数（1<=m,n<=N)。
**输出**
对于每一个询问，输出总杀敌数 每个输出占一行
**样例输入**
 5 2
1 2 3 4 5
1 3
2 4
**样例输出**
6
9
**总结：**

本来一位这个题与栈无关，没想到数据太大导致栈爆了。
用数组来存longlong也不行，改用结构体后倒是可以输入，但是超时。
后改为打表，虽然无法输入，但是可以过。

> Process exited after 2.27 seconds with return value 3221225725

```c++
#include<iostream>
using namespace std;
int main(){
	int n,m,s[1000010],a,b;
	cin>>n>>m;
	for(int i=1;i<=n;i++){
	 	scanf("%d",&s[i]);
	 	s[i] +=s[i-1];
	}
	while(m--){
		scanf("%d%d",&a,&b);
		printf("%d\n",s[b]-s[a-1]);
	}
	return 0;
} 
```

```c++
#include<iostream>
using namespace std;
struct node{
	int s1;
}s[1000001];
int main(){
	int a,b,n,m;
	cin>>n>>m;
	for(int i=0;i<n;i++){
	 	cin>>s[i].s1;
	}
	while(m--){
	cin>>a>>b;
	int sum=0;
	for(int i=a-1;i<=b-1;i++){
		sum+=s[i].s1;
	}
	cout<<sum<<endl;	
	}
	return 0; 
} 
```

# 树状数组
## 1880: 士兵杀敌（二）

时间限制: 1 Sec  内存限制: 64 MB
提交: 66  解决: 35
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
南将军手下有N个士兵，分别编号1到N，这些士兵的杀敌数都是已知的。

小工是南将军手下的军师，南将军经常想知道第m号到第n号士兵的总杀敌数，请你帮助小工来回答南将军吧。

南将军的某次询问之后士兵i可能又杀敌q人，之后南将军再询问的时候，需要考虑到新增的杀敌数。

**输入**
只有一组测试数据
第一行是两个整数N,M，其中N表示士兵的个数(1<N<1000000)，M表示指令的条数。(1<M<100000)
随后的一行是N个整数，ai表示第i号士兵杀敌数目。(0<=ai<=100)
随后的M行每行是一条指令，这条指令包含了一个字符串和两个整数，首先是一个字符串，如果是字符串QUERY则表示南将军进行了查询操作，后面的两个整数m,n，表示查询的起始与终止士兵编号；如果是字符串ADD则后面跟的两个整数I,A(1<=I<=N,1<=A<=100),表示第I个士兵新增杀敌数为A.
**输出**
对于每次查询，输出一个整数R表示第m号士兵到第n号士兵的总杀敌数，每组输出占一行
**样例输入**
 5 6
1 2 3 4 5
QUERY 1 3
ADD 1 2
QUERY 1 3
ADD 2 3
QUERY 1 2
QUERY 1 5
**样例输出**
6
8
8
20
```c++
#include<iostream>
using namespace std;
const int maxn = 1000000+10;
int sum[maxn];
int n,m;
char str[6]; 
void add(int p, int x){ //给位置p增加x
    while(p <= n) sum[p] += x, p += p & -p;
}
int ask(int p){ //求位置p的前缀和
    int res = 0;
    while(p) res += sum[p], p -= p & -p;
    return res;
}
int range_ask(int l, int r){ //区间求和
    return ask(r) - ask(l - 1);
}
int main(){
//	int n,m;
	int x,y;
	scanf("%d%d",&n,&m);
	for(int i=1;i<=n;i++){
		scanf("%d",&x);
		add(i,x);
	}
	for(int j=0;j<m;j++){
		scanf("%s%d%d",&str,&x,&y);
		if(str[0]=='Q'){
			printf("%d\n",range_ask(x,y));
		} else{
			add(x,y);
		}
	}
	return 0;
}
```


## 1886: 士兵杀敌（四）

时间限制: 2 Sec  内存限制: 64 MB
提交: 36  解决: 19
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
南将军麾下有百万精兵，现已知共有M个士兵，编号为1~M，每次有任务的时候，总会有一批编号连在一起人请战（编号相近的人经常在一块，相互之间比较熟悉），最终他们获得的军功，也将会平分到每个人身上，这样，有时候，计算他们中的哪一个人到底有多少军功就是一个比较困难的事情，军师小工的任务就是在南将军询问他某个人的军功的时候，快速的报出此人的军功，请你编写一个程序来帮助小工吧。

假设起始时所有人的军功都是0.

**输入**
只有一组测试数据。 每一行是两个整数T和M表示共有T条指令，M个士兵。（1<=T,M<=1000000) 随后的T行，每行是一个指令。 指令分为两种： 一种形如 ADD 100 500 55 表示，第100个人到第500个人请战，最终每人平均获得了55军功，每次每人获得的军功数不会超过100，不会低于-100。 第二种形如： QUERY 300 表示南将军在询问第300个人的军功是多少。
**输出**
对于每次查询输出此人的军功，每个查询的输出占一行。
**样例输入**
 4 10
ADD 1 3 10
QUERY 3
ADD 2 6 50
QUERY 3
**样例输出**
10
60
**思路：**
 第一次时间超限。
**AC**
```c++
#include<iostream>
#include<cstring>
#include<cmath> 
#include<stack>
#define MAXN 1000000+10
using namespace std;
int sum[MAXN]={0};
int n;
char a[6];
void add(int p, int x){ //前p项和，给某一位增加数据 
    while(p > 0) sum[p] += x, p -= p & -p;
}
int ask(int p){ //第p项的和 
    int res = 0;
    while(p<=n) res += sum[p], p += p & -p;
    return res;
}
int main(){
	int T,b,c,d,e;
	cin>>T>>n;
	for(int i=0;i<T;i++){
		scanf("%s",&a);
		if(a[0]=='A'){
			scanf("%d%d%d",&b,&c,&d);
			add(b-1,-d);
			add(c,d);
		}else {
			scanf("%d",&e);
			printf("%d\n",ask(e));
		}
	}
	return 0;
}
```

**时间超限：**
```c++
#include<iostream>
#include<cstring>
#include<cmath> 
#include<stack>
#define MAXN 1000000+10
using namespace std;
int sum[MAXN]={0};
int n;
char a[6];
void add(int p, int x){ //给位置p增加x
    while(p <= n) sum[p] += x, p += p & -p;
}
int ask(int p){ //求位置p的前缀和
    int res = 0;
    while(p) res += sum[p], p -= p & -p;
    return res;
}
int range_ask(int l, int r){ //区间求和
    return ask(r) - ask(l - 1);
}
int main(){
	int T,b,c,d,e;
	cin>>T>>n;
	for(int i=0;i<T;i++){
		scanf("%s",&a);
		if(a[0]=='A'){
			scanf("%d%d%d",&b,&c,&d);
			for(int j=b;j<=c;j++){
				add(j,d);
			}
		}else {
			scanf("%d",&e);
			printf("%d\n",range_ask(e,e));
		}
	}
	return 0;
}
```
## 敌兵布阵

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 151598    Accepted Submission(s): 62866


**Problem Description**
C国的死对头A国这段时间正在进行军事演习，所以C国间谍头子Derek和他手下Tidy又开始忙乎了。A国在海岸线沿直线布置了N个工兵营地,Derek和Tidy的任务就是要监视这些工兵营地的活动情况。由于采取了某种先进的监测手段，所以每个工兵营地的人数C国都掌握的一清二楚,每个工兵营地的人数都有可能发生变动，可能增加或减少若干人手,但这些都逃不过C国的监视。
中央情报局要研究敌人究竟演习什么战术,所以Tidy要随时向Derek汇报某一段连续的工兵营地一共有多少人,例如Derek问:“Tidy,马上汇报第3个营地到第10个营地共有多少人!”Tidy就要马上开始计算这一段的总人数并汇报。但敌兵营地的人数经常变动，而Derek每次询问的段都不一样，所以Tidy不得不每次都一个一个营地的去数，很快就精疲力尽了，Derek对Tidy的计算速度越来越不满:"你个死肥仔，算得这么慢，我炒你鱿鱼!”Tidy想：“你自己来算算看，这可真是一项累人的工作!我恨不得你炒我鱿鱼呢!”无奈之下，Tidy只好打电话向计算机专家Windbreaker求救,Windbreaker说：“死肥仔，叫你平时做多点acm题和看多点算法书，现在尝到苦果了吧!”Tidy说："我知错了。。。"但Windbreaker已经挂掉电话了。Tidy很苦恼，这么算他真的会崩溃的，聪明的读者，你能写个程序帮他完成这项工作吗？不过如果你的程序效率不够高的话，Tidy还是会受到Derek的责骂的.
 

**Input**
第一行一个整数T，表示有T组数据。
每组数据第一行一个正整数N（N<=50000）,表示敌人有N个工兵营地，接下来有N个正整数,第i个正整数ai代表第i个工兵营地里开始时有ai个人（1<=ai<=50）。
接下来每行有一条命令，命令有4种形式：
(1) Add i j,i和j为正整数,表示第i个营地增加j个人（j不超过30）
(2)Sub i j ,i和j为正整数,表示第i个营地减少j个人（j不超过30）;
(3)Query i j ,i和j为正整数,i<=j，表示询问第i到第j个营地的总人数;
(4)End 表示结束，这条命令在每组数据最后出现;
每组数据最多有40000条命令
 

**Output**
对第i组数据,首先输出“Case i:”和回车,
对于每个Query询问，输出一个整数并回车,表示询问的段中的总人数,这个数保持在int以内。
 

**Sample Input**
1
10
1 2 3 4 5 6 7 8 9 10
Query 1 3
Add 3 6
Query 2 7
Sub 10 2
Add 6 3
Query 3 10
End 
 

**Sample Output**
Case 1:
6
33
59
**树状数组的应用，手打一遍，还是出现了错误，印象深刻啊。注意语句的逻辑顺，在这浪费了很多时间。**
```c++
#include<iostream>
#include<cstring>
#define maxn 50000 + 10
using namespace std;
int s[maxn];//存储每个兵营的士兵 
int n;//兵营数量 
char a[6];//增删查改语句 
//树状数组 
void add(int x,int y){//在点x出增加y个人 
	while(x<=n){
		s[x] += y;
		x += x&-x;
	}
}
int sum(int x){//计算前x个的数量和 
	int ans=0;
	while(x){//这点写错了，改了四十分钟才查出来！ 
		ans+=s[x];
		x -= x&-x;
	}
	return ans;
}
int main(){
	int t,b,c,q,x;
	cin>>t;
	for(int k=1;k<=t;k++){
		memset(s,0,sizeof(s));
		cin>>n;
		for(int i=1;i<=n;i++){
			cin>>x;
			add(i,x);
		}
		cout<<"Case "<<k<<":"<<endl;		
		while(cin>>a){
			if(a[0]=='E'){
				break;
			}
			cin>>b>>c;
			if(a[0]=='A'){
				add(b,c);
			}else if(a[0]=='S'){
				add(b,-c);
			}else if(a[0]=='Q'){
				cout<<sum(c)-sum(b-1)<<endl;
			}
		}
	}
	return 0;
} 
```
## 1881: 求逆序数

时间限制: 2 Sec  内存限制: 64 MB
提交: 220  解决: 73
您该题的状态：未开始
[提交][状态][讨论版]
**题目描述**
在一个排列中，如果一对数的前后位置与大小顺序相反，即前面的数大于后面的数，那么它们就称为一个逆序。一个排列中逆序的总数就称为这个排列的逆序数。

现在，给你一个N个元素的序列，请你判断出它的逆序数是多少。

比如 1 3 2 的逆序数就是1。

**输入**
第一行输入一个整数T表示测试数据的组数（1<=T<=5) 每组测试数据的每一行是一个整数N表示数列中共有N个元素（2〈=N〈=1000000） 随后的一行共有N个整数Ai(0<=Ai<1000000000)，表示数列中的所有元素。 数据保证在多组测试数据中，多于10万个数的测试数据最多只有一组。
输出
输出该数列的逆序数
**样例输入**
 2
2
1 1
3
1 3 2
**样例输出**
0
1
```c++
#include<stdio.h>
#include<string.h>
#include<algorithm>
using namespace std;
#define maxx 1000010
int c[maxx],n,a[maxx];
long long sum;
int b[maxx];
int lowbit(int x)
{
    return x&-x;
}
void add(int x,int w)   //第x个值加上w 
{
    while(x<=n)
    {
        c[x]+=w;
        x+=lowbit(x);
    }
}
int query(int x)   //求序列中小于等于x的个数 
{
    sum=0;
    while(x)
    {
        sum+=c[x];
        x-=lowbit(x);
    }
    return sum;
}
int main()
{
    int t;
    scanf("%d",&t);
    while(t--)
    {
        memset(c,0,sizeof(c));
        memset(b,0,sizeof(b));
        scanf("%d",&n);
        long long ans=0;
        for(int i=0;i<n;i++)
        {
            scanf("%d",&a[i]);
            b[i]=a[i];
        }
        sort(b,b+n);
        for(int i=0;i<n;i++)//离散化处理，最终需要的是a数组
        {
            a[i]=lower_bound(b,b+n,a[i])-b+1;  //从数组的begin位置到end-1位置二分查找第一个大于或等于num的数字，找到返回该数字的地址，不存在则返回end。通过返回的地址减去起始地址begin,得到找到数字在数组中的下标。
        }
        for(int i=0;i<n;i++)
        {
            add(a[i],1);//碰到a[i]就+1，单点修改
            ans+=(i+1-query(a[i]));//query(a[i])这里求出的是1到a[i]之间的和，就是a[i]前面有
                                   //多少个小于等于a[i]的数，然后前面一共有i+1个数，i+1减去它
                                   //就是逆序对的个数。
        }
        printf("%lld\n",ans);
    }
    return 0;
}


```


# 排序
# 排序

## 1223: 数组排序

时间限制: 1 Sec  内存限制: 32 MB
提交: 118  解决: 65
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
输入一个数组的值,求出各个值从小到大排序后的次序。

**输入**
输入有多组数据。

每组输入的第一个数为数组的长度n(1<=n<=10000),后面的数为数组中的值,以空格分割。

**输出**
各输入的值按从小到大排列的次序(最后一个数字后面没有空格)。

**样例输入**
 1
68 
15
1 70 25 79 59 63 65 6 46 82 28 62 92 96 43 
**样例输出**
1
1 11 3 12 7 9 10 2 6 13 4 8 14 15 5
**从1开始注意数组也要从1开始排序**
```c++
#include<iostream>
#include<algorithm>
using namespace std;
struct node{
	int x,y,z;
}a[10001];
int cmp(node a,node b){
	return a.x<b.x;
}
int cmp2(node a,node b){
	return a.z < b.z;
}
int main(){
	int n;
	while(cin>>n){
		for(int i=0;i<n;i++){
			cin>>a[i].x;
			a[i].z=i+1;
		}
		sort(a,a+n,cmp);
		for(int i=0;i<n;i++){
			a[i].y =i+1;
		}
		sort(a,a+n,cmp2);
		for(int i=0;i<n;i++){
			cout<<a[i].y;
			if(i<n){
				cout<<" ";
			}else{
				cout<<endl;
			}
		}
	}
	return 0;
}
```
## 1798: 一种排序

时间限制: 3 Sec  内存限制: 64 MB
提交: 62  解决: 40
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
现在有很多长方形，每一个长方形都有一个编号，这个编号可以重复；还知道这个长方形的宽和长，编号、长、宽都是整数；现在要求按照一下方式排序（默认排序规则都是从小到大）；

1.按照编号从小到大排序

2.对于编号相等的长方形，按照长方形的长排序；

3.如果编号和长都相同，按照长方形的宽排序；

4.如果编号、长、宽都相同，就只保留一个长方形用于排序,删除多余的长方形；最后排好序按照指定格式显示所有的长方形；
**输入**
第一行有一个整数 0<n<10000,表示接下来有n组测试数据；
每一组第一行有一个整数 0<m<1000，表示有m个长方形；
接下来的m行，每一行有三个数 ，第一个数表示长方形的编号，

第二个和第三个数值大的表示长，数值小的表示宽，相等
说明这是一个正方形（数据约定长宽与编号都小于10000）；
**输出**
顺序输出每组数据的所有符合条件的长方形的 编号 长 宽
**样例输入**
 1
8
1 1 1
1 1 1
1 1 2
1 2 1
1 2 2
2 1 1
2 1 2
2 2 1
**样例输出**
1 1 1
1 2 1
1 2 2
2 1 1
2 2 1
```c++
#include<iostream>
#include<algorithm>
#include<cstring> 
using namespace std;
struct node{
	int x,y,z,t;
}a[1001];
int cmp(node a,node b){
	if(a.x!=b.x)return a.x<b.x;
	else if(a.y!=b.y) return a.y < b.y;
	else return a.z < b.z;
}
int main(){
	int n,m,k,q,p;
	cin>>n;
	while(n--){
		cin>>m;
		memset(a,0,sizeof(a));
		for(int i=0;i<m;i++){
			cin>>k>>p>>q;
			a[i].x=k;
			a[i].y=max(p,q);
			a[i].z=min(p,q);
			a[i].t=0;
		}
		sort(a,a+m,cmp);
		for(int i=0;i<m-1;i++){
				if(a[i].x==a[i+1].x&&a[i].z==a[i+1].z&&a[i].y==a[i+1].y){
					a[i].t=1;
				}
		}
		for(int i=0;i<m;i++){
			if(a[i].t==0){
				cout<<a[i].x<<" "<<a[i].y<<" "<<a[i].z<<endl; 
			}
		}
	}
	return 0;
}
```
## 1866: 众数问题

时间限制: 3 Sec  内存限制: 64 MB
提交: 43  解决: 27
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
所谓众数，就是对于给定的含有N个元素的多重集合，每个元素在S中出现次数最多的成为该元素的重数，

多重集合S重的重数最大的元素成为众数。例如：S={1,2,2,2,3,5}，则多重集S的众数是2，其重数为3。

现在你的任务是：对于给定的由m个自然数组成的多重集S，计算出S的众数及其重数。

**输入**
第一行为n，表示测试数据组数。(n<30) 每组测试的第一行是一个整数m，表示多重集S中元素的个数为m 接下来的一行中给出m(m<100)个不大于10万的自然数 （不会出现不同元素出现的次数相同的情况，如：S={11,11,22,22,33,33}）。
**输出**
每组测试数据输出一行，包含两个数，第一个是众数，第二个是其重数，中间以空格隔开。
**样例输入**
 1
6
1 2 2 2 3 5
**样例输出**
2 3
**结构体排序，本来想用哈希存入下标，但是次数排序时数据太大，要从十万开始。**
```c++
#include<iostream>
#include<algorithm>
using namespace std;
struct node{
	int x,y;
}s[101];
int cmp(node a,node b){
	return a.x>b.x;
}
int cmp2(node a,node b){
	return a.y > b.y;
}
int main(){
	int n,m;
	cin>>n;
	while(n--){
		cin>>m;
		for(int i=0;i<m;i++){
			cin>>s[i].x;
			s[i].y=1;
		}
		sort(s,s+m,cmp);
		for(int i=0;i<m-1;i++){//若为m会越界，但是m也能AC，数据太弱
			for(int j=i+1;j<m;j++){
			if(s[i].x==s[j].x){
				s[i].y++;
			}
			}
		}
		sort(s,s+m,cmp2);
		cout<<s[0].x<<" "<<s[0].y<<endl;
	}
	return 0;
} 
```

## 1223: 数组排序

时间限制: 1 Sec  内存限制: 32 MB
提交: 118  解决: 65
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
输入一个数组的值,求出各个值从小到大排序后的次序。

**输入**
输入有多组数据。

每组输入的第一个数为数组的长度n(1<=n<=10000),后面的数为数组中的值,以空格分割。

**输出**
各输入的值按从小到大排列的次序(最后一个数字后面没有空格)。

**样例输入**
 1
68 
15
1 70 25 79 59 63 65 6 46 82 28 62 92 96 43 
**样例输出**
1
1 11 3 12 7 9 10 2 6 13 4 8 14 15 5
**从1开始反而是错的，数组也要从1开始排序**
```c++
#include<iostream>
#include<algorithm>
using namespace std;
struct node{
	int x,y,z;
}a[10001];
int cmp(node a,node b){
	return a.x<b.x;
}
int cmp2(node a,node b){
	return a.z < b.z;
}
int main(){
	int n;
	while(cin>>n){
		for(int i=0;i<n;i++){
			cin>>a[i].x;
			a[i].z=i+1;
		}
		sort(a,a+n,cmp);
		for(int i=0;i<n;i++){
			a[i].y =i+1;
		}
		sort(a,a+n,cmp2);
		for(int i=0;i<n;i++){
			cout<<a[i].y;
			if(i<n){
				cout<<" ";
			}else{
				cout<<endl;
			}
		}
	}
	return 0;
}
```

## 1798: 一种排序

时间限制: 3 Sec  内存限制: 64 MB
提交: 62  解决: 40
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
现在有很多长方形，每一个长方形都有一个编号，这个编号可以重复；还知道这个长方形的宽和长，编号、长、宽都是整数；现在要求按照一下方式排序（默认排序规则都是从小到大）；

1.按照编号从小到大排序

2.对于编号相等的长方形，按照长方形的长排序；

3.如果编号和长都相同，按照长方形的宽排序；

4.如果编号、长、宽都相同，就只保留一个长方形用于排序,删除多余的长方形；最后排好序按照指定格式显示所有的长方形；
**输入**
第一行有一个整数 0<n<10000,表示接下来有n组测试数据；
每一组第一行有一个整数 0<m<1000，表示有m个长方形；
接下来的m行，每一行有三个数 ，第一个数表示长方形的编号，

第二个和第三个数值大的表示长，数值小的表示宽，相等
说明这是一个正方形（数据约定长宽与编号都小于10000）；
**输出**
顺序输出每组数据的所有符合条件的长方形的 编号 长 宽
**样例输入**
 1
8
1 1 1
1 1 1
1 1 2
1 2 1
1 2 2
2 1 1
2 1 2
2 2 1
**样例输出**
1 1 1
1 2 1
1 2 2
2 1 1
2 2 1
```c++
#include<iostream>
#include<algorithm>
#include<cstring> 
using namespace std;
struct node{
	int x,y,z,t;
}a[1001];
int cmp(node a,node b){
	if(a.x!=b.x)return a.x<b.x;
	else if(a.y!=b.y) return a.y < b.y;
	else return a.z < b.z;
}
int main(){
	int n,m,k,q,p;
	cin>>n;
	while(n--){
		cin>>m;
		memset(a,0,sizeof(a));
		for(int i=0;i<m;i++){
			cin>>k>>p>>q;
			a[i].x=k;
			a[i].y=max(p,q);
			a[i].z=min(p,q);
			a[i].t=0;
		}
		sort(a,a+m,cmp);
		for(int i=0;i<m-1;i++){
				if(a[i].x==a[i+1].x&&a[i].z==a[i+1].z&&a[i].y==a[i+1].y){
					a[i].t=1;
				}
		}
		for(int i=0;i<m;i++){
			if(a[i].t==0){
				cout<<a[i].x<<" "<<a[i].y<<" "<<a[i].z<<endl; 
			}
		}
	}
	return 0;
}
```


## Ignatius and the Princess IV

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32767 K (Java/Others)
Total Submission(s): 51690    Accepted Submission(s): 23268


**Problem Description**
"OK, you are not too bad, em... But you can never pass the next test." feng5166 says.

"I will tell you an odd number N, and then N integers. There will be a special integer among them, you have to tell me which integer is the special one after I tell you all the integers." feng5166 says.

"But what is the characteristic of the special integer?" Ignatius asks.

"The integer will appear at least (N+1)/2 times. If you can't find the right integer, I will kill the Princess, and you will be my dinner, too. Hahahaha....." feng5166 says.

Can you find the special integer for Ignatius?
 

**Input**
The input contains several test cases. Each test case contains two lines. The first line consists of an odd integer N(1<=N<=999999) which indicate the number of the integers feng5166 will tell our hero. The second line contains the N integers. The input is terminated by the end of file.
 

**Output**
For each test case, you have to output only one line which contains the special number you have found.
 

**Sample Input**
5
1 3 2 3 3
11
1 1 1 1 1 5 5 5 5 5 5
7
1 1 1 1 1 1 1
 

**Sample Output**
3
5
1


```c++
#include<iostream>
#include<algorithm> 
using namespace std;
int main(){
	int n,a[1000005],b[1000005]={0},k;
	while(cin>>n){
		for(int i=0;i<n;i++){
			cin>>a[i];
		}
		for(int j=0;j<n;j++){
			k = a[j];
			b[k]++;
			if(b[k]>=(n+1)/2){
				cout<<k<<endl;
				break;
			}
		}
		for(int i=0;i<n;i++){
			k = a[i];
			b[k] = 0;
		}
	}
	return 0;
}
```


# RMQ
## 1883: 士兵杀敌（三）

时间限制: 2 Sec  内存限制: 64 MB
提交: 54  解决: 26
您该题的状态：未开始
[提交][状态][讨论版]
**题目描述**
南将军统率着N个士兵，士兵分别编号为1~N,南将军经常爱拿某一段编号内杀敌数最高的人与杀敌数最低的人进行比较，计算出两个人的杀敌数差值，用这种方法一方面能鼓舞杀敌数高的人，另一方面也算是批评杀敌数低的人，起到了很好的效果。

所以，南将军经常问军师小工第i号士兵到第j号士兵中，杀敌数最高的人与杀敌数最低的人之间军功差值是多少。

现在，请你写一个程序，帮小工回答南将军每次的询问吧。

注意，南将军可能询问很多次。

**输入**
只有一组测试数据
第一行是两个整数N,Q，其中N表示士兵的总数。Q表示南将军询问的次数。(1<N<=100000,1<Q<=1000000)
随后的一行有N个整数Vi(0<=Vi<100000000)，分别表示每个人的杀敌数。
再之后的Q行，每行有两个正正数m,n，表示南将军询问的是第m号士兵到第n号士兵。
**输出**
对于每次询问，输出第m号士兵到第n号士兵之间所有士兵杀敌数的最大值与最小值的差。
**样例输入**
 5 2
1 2 6 9 3
1 2
2 4
**样例输出**
1
7

**思路：** 
常规思路会超时，网上搜的题解，三种方法。

```c++
//RMQ 
#include<stdio.h>
#include<string.h>
#include<string>
#include<stack>
#include<queue>
#include<math.h>
#include<limits.h>
#include<iostream>
#include<algorithm>
using namespace std;
const int N=100010;
int maxsum[20][N],minsum[20][N];
void RMQ(int num)//RMQ算法
{
    for(int i=1;i!=20;++i)//动态规划思想预处理
        for(int j=1;j<=num;++j)
            if(j+(1<<i)-1<=num)
            {//位运算用多了会不会很难懂
                maxsum[i][j]=max(maxsum[i-1][j],maxsum[i-1][j+(1<<i>>1)]);
                minsum[i][j]=min(minsum[i-1][j],minsum[i-1][j+(1<<i>>1)]);
            }
}
int main()
{
    int num,query_num;//士兵数量，询问次数
    int m,n;//询问区间
    scanf("%d%d",&num,&query_num);
    for(int i=1;i<=num;++i) //输入信息处理
    {
        scanf("%d",&maxsum[0][i]);
        minsum[0][i]=maxsum[0][i];
    }
    RMQ(num);
    while(query_num--)//直接查询，此时时间复杂度为O(1)!!!
    {
        scanf("%d%d",&m,&n);
        int k=(int)(log(n-m+1.0)/log(2.0));//找到被2的n次方覆盖的区间
        int maxres=max(maxsum[k][m],maxsum[k][n-(1<<k)+1]);
        int minres=min(minsum[k][m],minsum[k][n-(1<<k)+1]);
        printf("%d\n", maxres-minres);
    }
    return 0;
}

//st 
#include<stdio.h>
#include<math.h>
#define max(x,y)(x>y?x:y)
#define min(x,y)(x<y?x:y) 
using namespace std;
int a[100010];
int dp[100010][20];   //保存区间最大值 
int dp1[100010][20];   //保存区间最小值 
int main()
{
	int n,m,i,j,l,r;
	scanf("%d%d",&n,&m);
	for(i=1;i<=n;i++)
		scanf("%d",&a[i]);
	for(i=1;i<=n;i++)
	{
		dp[i][0]=a[i];
		dp1[i][0]=a[i];
	}
	
		for(j=1;j<20;j++)
		{
			for(i=1;i<=n;i++)
			{
				if(i+pow(2,j)-1>n)
					break;
				int l2=i+pow(2,j-1);
				dp[i][j]=max(dp[i][j-1],dp[l2][j-1]);   
				dp1[i][j]=min(dp1[i][j-1],dp1[l2][j-1]);
			}
		}	
 
	for(i=0;i<m;i++)
	{
		scanf("%d%d",&l,&r);
		int k=log(r-l+1)/log(2);
		int l2=r-pow(2,k)+1;
		int res=max(dp[l][k],dp[l2][k])-min(dp1[l][k],dp1[l2][k]);
		printf("%d\n",res);
	}
	return 0;
} 
//线段树
#include<iostream>
#include<algorithm>
#include<math.h>
#include<string>
#include<string.h>
#include<stdio.h>
#include<queue>
using namespace std;
//线段树基本操作
//建立两个线段树
const int maxn=100005;
int N;//士兵总数
int Q;//查询次数
struct node
{
    int left;
    int right;
    int max_num;
    int min_num;
} Tree[maxn*4];
void Build(int root,int star,int end)
{
    Tree[root].left=star;
    Tree[root].right=end;
    if(star==end)
    {
        scanf("%d",&Tree[root].max_num);
        Tree[root].min_num=Tree[root].max_num;
        return;
    }
    int mid=(star+end)>>1;
    Build(root<<1,star,mid);
    Build(root<<1|1,mid+1,end);
    Tree[root].max_num=Tree[root<<1].max_num>Tree[root<<1|1].max_num?Tree[root<<1].max_num:Tree[root<<1|1].max_num;
    Tree[root].min_num=Tree[root<<1].min_num<Tree[root<<1|1].min_num?Tree[root<<1].min_num:Tree[root<<1|1].min_num;
}
node Find(int root,int star,int end)
{
    if(Tree[root].left==star&&Tree[root].right==end)
        return Tree[root];
    int mid=(Tree[root].left+Tree[root].right)>>1;
    if(end<=mid)
        return Find(root<<1,star,end);
    else if(star>mid)
        return Find(root<<1|1,star,end);
    else
    {
        node flag1=Find(root<<1,star,mid);
        node flag2=Find(root<<1|1,mid+1,end);
        node flag;
        flag.max_num=flag1.max_num>flag2.max_num?flag1.max_num:flag2.max_num;
        flag.min_num=flag1.min_num<flag2.min_num?flag1.min_num:flag2.min_num;
        return flag;
    }
}
int main()
{
    scanf("%d%d",&N,&Q);
    Build(1,1,N);//建立线段树
    int m,n;//查询区间范围
    while(Q--)
    {
        scanf("%d%d",&m,&n);
        node temp=Find(1,m,n);
        printf("%d\n",temp.max_num-temp.min_num);
    }
    return 0;
}


```
# 优先队列

**默认升序**
```c++
priority_queue<int ,vector<int>,greater<int> > qq;
```
**自定义优先级，降序**
```c++

struct node
{
	int x,y,step;
};
struct cmp                             //定义优先级
{	bool operator()(node s,node t)
	{
		return s.step > t.step;
	}
};

	priority_queue<node,vector<node>,cmp> Q;
```

## 1830: 懒省事的小明

时间限制: 3 Sec  内存限制: 64 MB
提交: 181  解决: 63
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
      小明很想吃果子，正好果园果子熟了。在果园里，小明已经将所有的果子打了下来，而且按果子的不同种类分成了不同的堆。小明决定把所有的果子合成一堆。 因为小明比较懒，为了省力气，小明开始想点子了:
每一次合并，小明可以把两堆果子合并到一起，消耗的体力等于两堆果子的重量之和。可以看出，所有的果子经过n-1次合并之后，就只剩下一堆了。小明在合并果子时总共消耗的体力等于每次合并所耗体力之和。 
因为还要花大力气把这些果子搬回家，所以小明在合并果子时要尽可能地节省体力。假定每个果子重量都为1，并且已知果子的种类数和每种果子的数目，你的任务是设计出合并的次序方案，使小明耗费的体力最少，并输出这个最小的体力耗费值。 
例如有3种果子，数目依次为1，2，9。可以先将1、2堆合并，新堆数目为3，耗费体力为3。接着，将新堆与原先的第三堆合并，又得到新的堆，数目为12，耗费体力为12。所以小明总共耗费体力=3+12=15。可以证明15为最小的体力耗费值。
**输入**
第一行输入整数N(0<N<=10)表示测试数据组数。接下来每组测试数据输入包括两行，第一行是一个整数n(1<＝n<=12000)，表示果子的种类数。第二行包含n个整数，用空格分隔，第i个整数ai(1<＝ai<=20000)是第i种果子的数目。
**输出**
每组测试数据输出包括一行，这一行只包含一个整数，也就是最小的体力耗费值。
**样例输入**
 1
3 
1 2 9
**样例输出**
15
**思路：** 

 1. 需要保证每一次累加都是排好序的。加完之后还得填入队列中。
 2. 所以用到了优先队列，队列内部自动排序。
 3. 思想和贪心很像，默认升序排列，累加存入，得到最终结果。
```c++
#include<iostream>
#include<queue>
using namespace std;
int main(){
	int N,n,a,x;
	cin>>N;
	while(N--){
		cin>>n;
		priority_queue<int ,vector<int>,greater<int> > qq;
		for(int i=0;i<n;i++){
			cin>>a;
			qq.push(a);
		} 
		long long sum = 0;
		while(qq.size()!=1){
			x = qq.top();
			qq.pop();
			x += qq.top();
			qq.pop();
			sum +=x;
			qq.push(x);
		}
		cout<<sum<<endl;
	}
	return 0;
} 
```

# 二叉树

## 1843: 小猴子下落

时间限制: 3 Sec  内存限制: 64 MB
提交: 55  解决: 44
您该题的状态：已完成
[提交][状态][讨论版]
**题目描述**
    有一颗二叉树，最大深度为D,且所有叶子的深度都相同。所有结点从左到右从上到下的编号为1,2,3，·····，2的D次方减1。在结点1处放一个小猴子，它会往下跑。每个内结点上都有一个开关，初始全部关闭，当每次有小猴子跑到一个开关上时，它的状态都会改变，当到达一个内结点时，如果开关关闭，小猴子往左走，否则往右走，直到走到叶子结点。一些小猴子从结点1处开始往下跑，最后一个小猴儿会跑到哪里呢？
**输入**
    输入二叉树叶子的深度D,和小猴子数目I，假设I不超过整棵树的叶子个数，D<=20.最终以 0 0 结尾
**输出**
输出第I个小猴子所在的叶子编号。
**样例输入**
 4 2
3 4
0 0
**样例输出**
12
7
**思路：** 

 1. 找规律： 判断最后一只猴子的奇偶性，奇数右移，偶数左移。
 2. 用k来记录猴子走到的节点，如果是偶数就乘二，奇数乘二加一。
 3. 循环d-1次结束。得到最后一只猴子

```c++
#include<iostream>
  using namespace std;
  
  int main()
  {
      int d,i,k;
      while(cin>>d>>i && (d+i) !=0)
      {
         k=1;
         for (int j=0;j<d-1;j++)
             if(i%2) {k=k*2;i=(i+1)/2;}
             else {k=k*2+1;i /=2;}
         cout<<k<<endl;
  
     }
 }
```
**模拟猴子的下落得到最后一个结果**
```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int d,l,k;
	int a[100];
	while(cin>>d>>l&&d!=0&&l!=0){
		memset(a,0,sizeof(a));
		for(int i=1;i<=l;i++){
			k = 1;
			for(int j=1;j<d;j++){
				if(a[k]==0){
					a[k]=1;
					k = k*2;
				}else if(a[k]==1){
					a[k]=0;
					k=k*2+1;
					}
				}
			}
		cout<<k<<endl;
	}
	return 0;
}
```
# 哈希 
## 前m大的数

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 27870    Accepted Submission(s): 9277


**Problem Description**
还记得Gardon给小希布置的那个作业么？（上次比赛的1005）其实小希已经找回了原来的那张数表，现在她想确认一下她的答案是否正确，但是整个的答案是很庞大的表，小希只想让你把答案中最大的M个数告诉她就可以了。 
给定一个包含N(N<=3000)个正整数的序列，每个数不超过5000，对它们两两相加得到的N*(N-1)/2个和，求出其中前M大的数(M<=1000)并按从大到小的顺序排列。
 

**Input**
输入可能包含多组数据，其中每组数据包括两行： 
第一行两个数N和M， 
第二行N个数，表示该序列。

 

**Output**
对于输入的每组数据，输出M个数，表示结果。输出应当按照从大到小的顺序排列。
 

**Sample Input**
4 4
1 2 3 4
4 5
5 3 6 4
 

**Sample Output**
7 6 5 5
11 10 9 9 8

**总结：注意数据大小，第一次数组开小了。**
```c++
#include<iostream>
#include<cstring>
using namespace std;
int main(){
	int n,m,a[3001],b[10001];
	while(cin>>n>>m){
		memset(b,0,sizeof(b));
		for(int i=0;i<n;i++){
			cin>>a[i];
		}
		for(int i=0;i<n;i++){
			for(int j=i+1;j<n;j++){
				b[a[i]+a[j]]++;
			}
		}
		int k=0;
		for(int i=10000;i>0&&m>0;){
			if(b[i]==0){i--;continue;}
				if(k){
					cout<<" "<<i;
				}else {
					cout<<i;
				}
				k=1;
				b[i]--;
				m--;
		}
		cout<<endl;
	}	
	return 0;
} 
```
## sort

Time Limit: 6000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 72971    Accepted Submission(s): 19350


**Problem Description**
给你n个整数，请按从大到小的顺序输出其中前m大的数。
 

**Input**
每组测试数据有两行，第一行有两个数n,m(0<n,m<1000000)，第二行包含n个各不相同，且都处于区间[-500000,500000]的整数。
 

**Output**
对每组测试数据按从大到小的顺序输出前m大的数。
 

**Sample Input**
5 3
3 -35 92 213 -644
 

**Sample Output**
213 92 3
**直接排序竟然AC了，哈希，cin超时，scanf可以**
```c++
#include<iostream>
#include<cstring>
#include<algorithm> 
using namespace std;
int cmp(int a,int b){
	return a > b;
}
int main(){
	int n,m,a[1000000];
	while(~scanf("%d%d",&n,&m)){
		for(int i=0;i<n;i++){
			scanf("%d",&a[i]);
		}
		sort(a,a+n,cmp);
		for(int i=0;i<m;i++){
			printf("%d",a[i]);
			if(i<m-1){
				printf(" ");
			}else{
				printf("\n");
			}
		}
	}
}
```

 **哈希的思想**


```c++
#include<iostream>
#include<cstring>
#include<algorithm>
#define maxn  500000 
using namespace std;  
#define M 500000  
int hash[M*2+1];  
int main()  
{  
    int n,m;  
    while(cin>>n>>m)  
    {  
        int a,i,j,k=0;  
        for(i=0; i<n; i++)  
        {  
            scanf("%d",&a);  
            hash[M+a]=1; 
        }  
        for(i=M*2; i>=0&&m>0; i--)  
        {  
            if(!hash[i]) continue;  
            if(k) cout<<' '<<i-M;  
            else cout<<i-M;  
            k=1;  
            m--;  
        }  
        cout<<endl;  
    }  
    return 0;  
} 
```
## Equations

Time Limit: 6000/3000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 12220    Accepted Submission(s): 4877


**Problem Description**
Consider equations having the following form: 

a*x1^2+b*x2^2+c*x3^2+d*x4^2=0
a, b, c, d are integers from the interval [-50,50] and any of them cannot be 0.

It is consider a solution a system ( x1,x2,x3,x4 ) that verifies the equation, xi is an integer from [-100,100] and xi != 0, any i ∈{1,2,3,4}.

Determine how many solutions satisfy the given equation.
 

**Input**
The input consists of several test cases. Each test case consists of a single line containing the 4 coefficients a, b, c, d, separated by one or more blanks.
End of file.
 

**Output**
For each test case, output a single line containing the number of the solutions.
 

**Sample Input**
1 2 3 -4
1 1 1 1
 

**Sample Output**
39088
0
```c++
#include <iostream>
#include <stdio.h>
#include <algorithm>
#include <memory.h>
using namespace std;
int f1[1000001];
int f2[1000001];
int main()
{
    int i, j, k, sum;
    int a, b, c, d;
    while(scanf("%d %d %d %d", &a, &b, &c, &d) != EOF)
    {
        if(a>0 && b>0 && c>0 && d>0 || a<0 && b<0 && c<0 && d<0)
        {
            printf("0\n");
            continue;
        }
        memset(f1, 0, sizeof(f1));
        memset(f2, 0, sizeof(f2));
        for(i = 1; i <= 100; i++)
        {
            for(j = 1; j<= 100; j++)
            {
                k = a*i*i + b*j*j;
                if(k >= 0) f1[k]++; 
                else f2[-k]++;
            }
        }
        sum = 0;
        for(i = 1; i <= 100; i++)
        {
            for(j = 1; j<= 100; j++)
            {
                k = c*i*i + d*j*j;
                if(k > 0) sum += f2[k]; 
                else sum += f1[-k]; 
            }
        }
        printf("%d\n", 16*sum);
    }
 
    return 0;
}
```

# 测试 

## B - {A} + {B} HDU - 1412 


Time Limit: 10000/5000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 33944    Accepted Submission(s): 13626


**Problem Description**
给你两个集合，要求{A} + {B}.
注:同一个集合中不会有两个相同的元素.
 

**Input**
每组输入数据分为三行,第一行有两个数字n,m(0<n,m<=10000),分别表示集合A和集合B的元素个数.后两行分别表示集合A和集合B.每个元素为不超出int范围的整数,每个元素之间有一个空格隔开.
 

**Output**
针对每组数据输出一行数据,表示合并后的集合,要求从小到大输出,每个元素之间有一个空格隔开.
 

**Sample Input**
1 2
1
2 3
1 2
1
1 2
 

**Sample Output**
1 2 3
1 2

```c++
#include <iostream>
#include <cstdio>
#include <set>
using namespace std;
int main()
{
    int n, m, v;
    set<int> r;
    while(cin >> n >> m) {
        r.clear();
        for(int i=1; i<=n+m; i++) {
            cin>> v;
            r.insert(v);
        }
        int k = 1;
        for(set<int>::iterator it = r.begin(); it != r.end(); it++) {
            if(k==0){
             	cout << " ";
			}   
            k = 0;
            cout<<*it;
        }
        cout<<endl;
    }
    return 0;
}
```


## C - u Calculate e HDU - 1012

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 59314    Accepted Submission(s): 27196


**Problem Description**
A simple mathematical formula for e is



where n is allowed to go to infinity. This can actually yield very accurate approximations of e using relatively small values of n.
 

**Output**
Output the approximations of e generated by the above formula for the values of n from 0 to 9. The beginning of your output should appear similar to that shown below.
 

**Sample Output**
n e
- -----------
0 1
1 2
2 2.5
3 2.666666667
4 2.708333333

```c++
#include<iostream>
using namespace std;
double nn(int a){
	double num=1;
	for(int i=1;i<=a;i++){
		num= num * i; 
	}
	return 1.0/num;
}
int main(){
	double sum=1;
	cout<<'n'<<" "<<'e'<<endl;
	cout<<"- -----------"<<endl;
	cout<<0<<" "<<sum<<endl;
	for(int i=1;i<10;i++){
		sum+=nn(i);
		if(i<=2){
			cout<<i<<" "<<sum<<endl;	
		}
	else
		printf("%d %.9lf\n",i,sum);
	}
	return 0;
}
```


## D - Number Steps HDU - 1391

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 6728    Accepted Submission(s): 4070


**Problem Description**
Starting from point (0,0) on a plane, we have written all non-negative integers 0, 1, 2,... as shown in the figure. For example, 1, 2, and 3 has been written at points (1,1), (2,0), and (3, 1) respectively and this pattern has continued.




You are to write a program that reads the coordinates of a point (x, y), and writes the number (if any) that has been written at that point. (x, y) coordinates in the input are in the range 0...5000.
 

**Input**
The first line of the input is N, the number of test cases for this problem. In each of the N following lines, there is x, and y representing the coordinates (x, y) of a point.
 

**Output**
For each point in the input, write the number written at that point or write No Number if there is none.
 

**Sample Input**
3
4 2
6 6
3 4
 

**Sample Output**
6
12
No Number
**这个题曾经讨论过，以为很难，没想到这么简单就AC了**
```c++
#include <iostream>
#include <cstdio>
#include <map>
using namespace std;
int main(){
	int n,x,y;
	cin>>n;
	while(n--){
		cin>>x>>y;
		if(y!=x&&y!=x-2){
			cout<<"No Number"<<endl;
		}else{
				if(x%2==1){
					cout<<x+y-1<<endl;
				}else{
					cout<<x+y<<endl;
				}
			}
		}
	return 0;
}
```
## E - Tram CodeForces - 116A 
**A. Tram**
time limit per test2 seconds
memory limit per test256 megabytes
inputstandard input
outputstandard output
Linear Kingdom has exactly one tram line. It has n stops, numbered from 1 to n in the order of tram's movement. At the i-th stop ai passengers exit the tram, while bi passengers enter it. The tram is empty before it arrives at the first stop. Also, when the tram arrives at the last stop, all passengers exit so that it becomes empty.

Your task is to calculate the tram's minimum capacity such that the number of people inside the tram at any time never exceeds this capacity. Note that at each stop all exiting passengers exit before any entering passenger enters the tram.

**Input**
The first line contains a single number n (2 ≤ n ≤ 1000) — the number of the tram's stops.

Then n lines follow, each contains two integers ai and bi (0 ≤ ai, bi ≤ 1000) — the number of passengers that exits the tram at the i-th stop, and the number of passengers that enter the tram at the i-th stop. The stops are given from the first to the last stop in the order of tram's movement.

The number of people who exit at a given stop does not exceed the total number of people in the tram immediately before it arrives at the stop. More formally, . This particularly means that a1 = 0.
At the last stop, all the passengers exit the tram and it becomes empty. More formally, .
No passenger will enter the train at the last stop. That is, bn = 0.
Output
Print a single integer denoting the minimum possible capacity of the tram (0 is allowed).

**Examples**
**inputCopy**
4
0 3
2 5
4 2
4 0
**outputCopy**
6

```c++
#include <iostream>
#include <cstdio>
#include <map>
using namespace std;
int main(){
	int n,a,b,sum=0,max=0;
	cin>>n;
	for(int i=0;i<n;i++){
		cin>>a>>b;
		sum -= a;
		sum += b;
		if(max<sum){
			max = sum;
		}
	}
	cout<<max<<endl;
	return 0;
}
```   

## F - A + B HDU - 1228

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 20995    Accepted Submission(s): 12558


**Problem Description**
读入两个小于100的正整数A和B,计算A+B.
需要注意的是:A和B的每一位数字由对应的英文单词给出.
 

**Input**
测试输入包含若干测试用例,每个测试用例占一行,格式为"A + B =",相邻两字符串有一个空格间隔.当A和B同时为0时输入结束,相应的结果不要输出. 
 

**Output**
对每个测试用例输出1行,即A+B的值.
 

**Sample Input**
one + two =
three four + five six =
zero seven + eight nine =
zero + zero =
 

**Sample Output**
3
90
96


```c++
#include<cstdio>
#include<iostream>
#include<map>
#include<string>
using namespace std;
map <string ,int> m;
int main() {
	m["one"]=1;
	m["two"]=2;
	m["three"]=3;
	m["four"]=4;
	m["five"]=5;
	m["six"]=6;
	m["seven"]=7;
	m["eight"]=8;
	m["nine"]=9;
	m["zero"]=0;
	string a;
	int tmp;
	while(1) {
		int x=0;
		while(cin>>a,a!="+") {
			x=x*10+m[a];
		}
		int y=0;
		while(cin>>a,a!="=") {
			y=y*10+m[a];
		}
		if(x==0&&y==0)
			break;
		printf("%d\n",x+y);
	}
	return 0;
}
```


## G - 单词数 HDU - 2072

Time Limit: 1000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 79866    Accepted Submission(s): 20286


**Problem Description**
lily的好朋友xiaoou333最近很空，他想了一件没有什么意义的事情，就是统计一篇文章里不同单词的总数。下面你的任务是帮助xiaoou333解决这个问题。
 

**Input**
有多组数据，每组一行，每组就是一篇小文章。每篇小文章都是由小写字母和空格组成，没有标点符号，遇到#时表示输入结束。
 

**Output**
每组只输出一个整数，其单独成行，该整数代表一篇文章里不同单词的总数。
 

**Sample Input**
you are my friend
#
 

**Sample Output**
4

```c++
#include<iostream>
#include<cstring>
#include<set>
using namespace std;
int main(){
	string str;
	while(getline(cin,str)){
		if(str =="#")
		break;
		set<string> se;
		se.clear();
		string s;
		int flag = 0;
		for(int i=0;i<=str.size();i++){
			if(str[i]<='z'&&str[i]>='a'){
				flag=1;
				s += str[i];
			}else if (flag==1&&isalpha(str[i])==0){
					se.insert(s);
					s.clear();
					flag =0;
				}
			}
		cout<<se.size()<<endl;
	}
	return 0;
}
```

## H - 愚人节的礼物 HDU - 1870

Time Limit: 5000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 16148    Accepted Submission(s): 9498


**Problem Description**
四月一日快到了，Vayko想了个愚人的好办法——送礼物。嘿嘿，不要想的太好，这礼物可没那么简单，Vayko为了愚人，准备了一堆盒子，其中有一个盒子里面装了礼物。盒子里面可以再放零个或者多个盒子。假设放礼物的盒子里不再放其他盒子。

用()表示一个盒子，B表示礼物，Vayko想让你帮她算出愚人指数，即最少需要拆多少个盒子才能拿到礼物。
 

**Input**
本题目包含多组测试，请处理到文件结束。
每组测试包含一个长度不大于1000,只包含'(',')'和'B'三种字符的字符串，代表Vayko设计的礼物透视图。
你可以假设，每个透视图画的都是合法的。
 

**Output**
对于每组测试，请在一行里面输出愚人指数。
 

**Sample Input**
((((B)()))())
(B)
 

**Sample Output**
4
1
```c++
#include <iostream>
#include <cstdio>
#include<cstring>
using namespace std;
int main(){
	char a[1001];
	while(cin>>a){
		int k=0;
		for(int i=0;i<strlen(a);i++){
			if(a[i]=='('){
				k++;
			}
			if(a[i]==')'){
				k--;
			}
			if(a[i]=='B'){
				break;
			}
		}
		cout<<k<<endl;
	}
	return 0;
}
```
## I - 看病要排队 HDU - 1873

Time Limit: 3000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
Total Submission(s): 17253    Accepted Submission(s): 7312


**Problem Description**
看病要排队这个是地球人都知道的常识。
不过经过细心的0068的观察，他发现了医院里排队还是有讲究的。0068所去的医院有三个医生（汗，这么少）同时看病。而看病的人病情有轻重，所以不能根据简单的先来先服务的原则。所以医院对每种病情规定了10种不同的优先级。级别为10的优先权最高，级别为1的优先权最低。医生在看病时，则会在他的队伍里面选择一个优先权最高的人进行诊治。如果遇到两个优先权一样的病人的话，则选择最早来排队的病人。

现在就请你帮助医院模拟这个看病过程。
 

**Input**
输入数据包含多组测试，请处理到文件结束。
每组数据第一行有一个正整数N(0<N<2000)表示发生事件的数目。
接下来有N行分别表示发生的事件。
一共有两种事件：
1:"IN A B",表示有一个拥有优先级B的病人要求医生A诊治。(0<A<=3,0<B<=10)
2:"OUT A",表示医生A进行了一次诊治，诊治完毕后，病人出院。(0<A<=3)
 

**Output**
对于每个"OUT A"事件，请在一行里面输出被诊治人的编号ID。如果该事件时无病人需要诊治，则输出"EMPTY"。
诊治人的编号ID的定义为：在一组测试中，"IN A B"事件发生第K次时，进来的病人ID即为K。从1开始编号。
 

**Sample Input**
7
IN 1 1
IN 1 2
OUT 1
OUT 2
IN 2 1
OUT 2
OUT 1
2
IN 1 1
OUT 1
 

**Sample Output**
2
EMPTY
3
1
1

```c++
#include<cstdio>
#include<iostream>
#include<queue>
#include<algorithm>
using namespace std;

struct node {
	int id; // 病人ID
	int pid; // 病人优先级
	friend bool operator <(node a,node b) { // 自定义优先队列排序（重载<运算符），优先队列（默认从大到小排序）
		if(a.pid==b.pid) {                  // 规定如果优先级相同则按照ID从小到大排序
			return a.id>b.id;               // 如果a.id 大于 b.id成立，那么 node a 小于 node b成立，
		} else {                            // 所以node b就会排在node a之前
			return a.pid<b.pid;
		}
	}
};

int main() {
	int n;
	char a[5];
	int A,B;
	while(~scanf("%d",&n)) {
		priority_queue<node> q[4];
		int k=0;
		for(int i=0; i<n; i++) {
			scanf("%s",&a);
			if(a[0]=='I') {
				++k;
				scanf("%d%d",&A,&B);
				node peo;
				peo.id=k;
				peo.pid=B;
				q[A].push(peo);
			} else {
				scanf("%d",&A);
				if(!q[A].empty()) {
					node p = q[A].top();
					q[A].pop();
					printf("%d\n",p.id);
				} else {
					printf("EMPTY\n");
				}
			}
		}
	}
	return 0;
}
```
## J - map容器写 HDU - 1004

Time Limit: 2000/1000 MS (Java/Others)    Memory Limit: 65536/32768 K (Java/Others)
Total Submission(s): 166374    Accepted Submission(s): 66291


**Problem Description**
Contest time again! How excited it is to see balloons floating around. But to tell you a secret, the judges' favorite time is guessing the most popular problem. When the contest is over, they will count the balloons of each color and find the result.

This year, they decide to leave this lovely job to you. 
 

**Input**
Input contains multiple test cases. Each test case starts with a number N (0 < N <= 1000) -- the total number of balloons distributed. The next N lines contain one color each. The color of a balloon is a string of up to 15 lower-case letters.

A test case with N = 0 terminates the input and this test case is not to be processed.
 

**Output**
For each case, print the color of balloon for the most popular problem on a single line. It is guaranteed that there is a unique solution for each test case.
 

**Sample Input**
5
green
red
blue
red
red
3
pink
orange
pink
0
 

**Sample Output**
red
pink

```c++
#include<stdio.h>
#include<string.h>
int main(){
    int n,i,j;
    char str[1010][22];     
    int qq[1010];
    while(scanf("%d",&n) && n != 0){
        for(i=0; i<n; i++){
            scanf("%s", str[i]);
            qq[i]=0;
        }
        for(i=0; i<n-1; i++){
            for(j=i+1; j<n; j++){      
                if(strcmp(str[i],str[j]) == 0){
                    qq[i]++;
                }
            }
        }
        int max=0;
        int k=0;
        for(i=0; i<n; i++){
            if(qq[i] > max){
                max = qq[i];
                k = i;
            }
        }
        printf("%s\n", str[k]);
    }
    return 0;
}
```

# 双指针

双指针可以理解为两个下标，快慢指针的索引。

|                题目                 | 难度  |
| :---------------------------------: | :---: |
| [Leetcode-283](alg/Leetcode-283.md) |   💗   |
| [Leetcode-167](alg/Leetcode-167.md) |  💗🧡   |
|  [Leetcode-01](alg/Leetcode-01.md)  |  💗🧡💛  |
| [Leetcode-633](alg/Leetcode-633.md) |  💗🧡💛  |
| [Leetcode-345](alg/Leetcode-345.md) |  💗🧡💛  |
| [Leetcode-680](alg/Leetcode-680.md) |  💗🧡💛  |
|  [Leetcode-88](alg/Leetcode-88.md)  |  💗🧡💛  |
| [Leetcode-141](alg/Leetcode-141.md) |  💗🧡💛  |
| [Leetcode-344](alg/Leetcode-344.md) |       |


# 递归

|                题目                 | 难度  |
| :---------------------------------: | :---: |
| [Leetcode-104](alg/Leetcode-104.md) |   💗   |
| [Leetcode-110](alg/Leetcode-110.md) |   💗   |
| [Leetcode-543](alg/Leetcode-543.md) |       |
| [Leetcode-226](alg/Leetcode-226.md) |       |
| [Leetcode-617](alg/Leetcode-617.md) |       |
| [Leetcode-617](alg/Leetcode-112.md) |       |
| [Leetcode-437](alg/Leetcode-437.md) |       |
| [Leetcode-101](alg/Leetcode-101.md) |       |
| [Leetcode-111](alg/Leetcode-111.md) |       |
| [Leetcode-404](alg/Leetcode-404.md) |       |
| [Leetcode-687](alg/Leetcode-687.md) |       |
| [Leetcode-337](alg/Leetcode-337.md) |       |
| [Leetcode-671](alg/Leetcode-671.md) |       |


# 二分法

|                题目                 | 难度  |
| :---------------------------------: | :---: |
| [Leetcode-540](alg/Leetcode-540.md) |   💗   |
|  [Leetcode-69](alg/Leetcode-69.md)  |   💗   |
| [Leetcode-744](alg/Leetcode-744.md) |   💗   |
| [Leetcode-540](alg/Leetcode-540.md) |   💗   |
| [Leetcode-278](alg/Leetcode-278.md) |   💗   |
| [Leetcode-153](alg/Leetcode-153.md) |   💗   |
|  [Leetcode-34](alg/Leetcode-34.md)  |   💗   |
| [Leetcode-704](alg/Leetcode-704.md) |   💗   |



# 哈希表

|                题目                 | 难度  |
| :---------------------------------: | :---: |
|   [Leetcode-1](alg/Leetcode-1.md)   |   💗   |
| [Leetcode-217](alg/Leetcode-217.md) |   💗   |
| [Leetcode-594](alg/Leetcode-594.md) |   💗   |
| [Leetcode-128](alg/Leetcode-128.md) |   💗   |


# 位运算


|              题目               | 难度  |
| :-----------------------------: | :---: |
| [Leetcode-1](alg/Leetcode-1.md) |   💗   |

<!-- GFM-TOC -->
- [数组](#数组)
- [链表](#链表)
- [栈](#栈)
  - [💗](#)
- [STL](#stl)
  - [1830: 懒省事的小明](#1830-懒省事的小明)
  - [1793: Binary String Matching](#1793-binary-string-matching)
  - [Crazy Search](#crazy-search)
  - [排序](#排序)
  - [优先队列](#优先队列)
  - [1793: Binary String Matching](#1793-binary-string-matching-1)
  - [排序](#排序-1)
  - [1864: 士兵杀敌（一）](#1864-士兵杀敌一)
- [树状数组](#树状数组)
  - [1880: 士兵杀敌（二）](#1880-士兵杀敌二)
  - [1886: 士兵杀敌（四）](#1886-士兵杀敌四)
  - [敌兵布阵](#敌兵布阵)
  - [1881: 求逆序数](#1881-求逆序数)
- [排序](#排序-2)
- [排序](#排序-3)
  - [1223: 数组排序](#1223-数组排序)
  - [1798: 一种排序](#1798-一种排序)
  - [1866: 众数问题](#1866-众数问题)
  - [1223: 数组排序](#1223-数组排序-1)
  - [1798: 一种排序](#1798-一种排序-1)
  - [Ignatius and the Princess IV](#ignatius-and-the-princess-iv)
- [RMQ](#rmq)
  - [1883: 士兵杀敌（三）](#1883-士兵杀敌三)
- [优先队列](#优先队列-1)
  - [1830: 懒省事的小明](#1830-懒省事的小明-1)
- [二叉树](#二叉树)
  - [1843: 小猴子下落](#1843-小猴子下落)
- [哈希](#哈希)
  - [前m大的数](#前m大的数)
  - [sort](#sort)
  - [Equations](#equations)
- [测试](#测试)
  - [B - {A} + {B} HDU - 1412](#b---a--b-hdu---1412)
  - [C - u Calculate e HDU - 1012](#c---u-calculate-e-hdu---1012)
  - [D - Number Steps HDU - 1391](#d---number-steps-hdu---1391)
  - [E - Tram CodeForces - 116A](#e---tram-codeforces---116a)
  - [F - A + B HDU - 1228](#f---a--b-hdu---1228)
  - [G - 单词数 HDU - 2072](#g---单词数-hdu---2072)
  - [H - 愚人节的礼物 HDU - 1870](#h---愚人节的礼物-hdu---1870)
  - [I - 看病要排队 HDU - 1873](#i---看病要排队-hdu---1873)
  - [J - map容器写 HDU - 1004](#j---map容器写-hdu---1004)
- [双指针](#双指针)
- [递归](#递归)
- [二分法](#二分法)
- [哈希表](#哈希表)
- [位运算](#位运算)
- [0. 原理](#0-原理)
- [1. 统计两个数的二进制表示有多少位不同](#1-统计两个数的二进制表示有多少位不同)
- [2. 数组中唯一一个不重复的元素](#2-数组中唯一一个不重复的元素)
- [3. 找出数组中缺失的那个数](#3-找出数组中缺失的那个数)
- [4. 数组中不重复的两个元素](#4-数组中不重复的两个元素)
- [5. 翻转一个数的比特位](#5-翻转一个数的比特位)
- [6. 不用额外变量交换两个整数](#6-不用额外变量交换两个整数)
- [7. 判断一个数是不是 2 的 n 次方](#7-判断一个数是不是-2-的-n-次方)
- [8.  判断一个数是不是 4 的 n 次方](#8-判断一个数是不是-4-的-n-次方)
- [9. 判断一个数的位级表示是否不会出现连续的 0 和 1](#9-判断一个数的位级表示是否不会出现连续的-0-和-1)
- [10. 求一个数的补码](#10-求一个数的补码)
- [11. 实现整数的加法](#11-实现整数的加法)
- [12. 字符串数组最大乘积](#12-字符串数组最大乘积)
- [13. 统计从 0 \~ n 每个数的二进制表示中 1 的个数](#13-统计从-0--n-每个数的二进制表示中-1-的个数)
- [数学](#数学)
  - [Leetcode-202【双指针+数学】](#leetcode-202双指针数学)
  - [1.0 三角形边长问题](#10-三角形边长问题)
    - [思考](#思考)
  - [2.0 四平方和定理](#20-四平方和定理)
    - [思考](#思考-1)
- [1.0 素数问题](#10-素数问题)
  - [1.1 统计素数个数](#11-统计素数个数)
- [2.0 进制转换](#20-进制转换)
  - [2.1 七进制](#21-七进制)
  - [2.2 十六进制](#22-十六进制)
  - [2.3 二十六进制](#23-二十六进制)
- [3.0 阶乘和幂](#30-阶乘和幂)
  - [3.1 求零的个数](#31-求零的个数)
  - [3.2 幂次](#32-幂次)
  - [2004: p次方求和](#2004-p次方求和)
  - [1921: 求余数](#1921-求余数)
  - [1875: 九的余数](#1875-九的余数)
  - [1913: 快速查找素数](#1913-快速查找素数)
  - [1853: 超级台阶](#1853-超级台阶)
  - [1846: 数的长度](#1846-数的长度)
  - [1797: 街区最短路径问题](#1797-街区最短路径问题)
  - [1240: 最少乘法次数](#1240-最少乘法次数)
  - [1232: N的N次方](#1232-n的n次方)
- [4.0 思考](#40-思考)
  - [4.1 最多的元素](#41-最多的元素)
  - [4.2 平方数](#42-平方数)
  - [4.3 最大值](#43-最大值)
- [8.10](#810)
  - [1447: 阶乘的和](#1447-阶乘的和)
  - [1861: 阶乘之和](#1861-阶乘之和)
  - [1860: 汉诺塔（一）](#1860-汉诺塔一)
  - [1847: 阶乘因式分解（二）](#1847-阶乘因式分解二)
  - [1816: 大数阶乘](#1816-大数阶乘)
  - [1904: 求高精度幂](#1904-求高精度幂)
  - [2076: 开方数](#2076-开方数)
  - [2031: A+B Problem IV](#2031-ab-problem-iv)
  - [1873: A+B Problem II](#1873-ab-problem-ii)
  - [2083: A/B Problem](#2083-ab-problem)
- [8.11](#811)
  - [2171: A^B](#2171-ab)
  - [2008: sum of all integer numbers](#2008-sum-of-all-integer-numbers)
  - [2125: 最大的最小公倍数](#2125-最大的最小公倍数)
  - [2043: 最小公倍数](#2043-最小公倍数)
  - [1850: 比大小](#1850-比大小)
  - [2051: 光棍的yy](#2051-光棍的yy)
  - [1828: 棋盘覆盖](#1828-棋盘覆盖)
  - [1701: 一个数学问题](#1701-一个数学问题)
  - [1989: mdd的烦恼](#1989-mdd的烦恼)
  - [2888: 这是一道简单的数学题](#2888-这是一道简单的数学题)
- [8.12](#812)
  - [2009: 光棍节的快乐](#2009-光棍节的快乐)
  - [2025: A*B Problem](#2025-ab-problem)
  - [题目描述](#题目描述)
  - [输入](#输入)
  - [输出](#输出)
  - [样例输入](#样例输入)
  - [样例输出](#样例输出)
  - [思路：](#思路)
  - [Time Limit Exceeded：](#time-limit-exceeded)
  - [Accept：](#accept)
  - [2022: 月老的烦恼（1）](#2022-月老的烦恼1)
  - [题目描述](#题目描述-1)
  - [输入](#输入-1)
  - [输出](#输出-1)
  - [样例输入](#样例输入-1)
  - [样例输出](#样例输出-1)
  - [2019: 擅长排列的小明 II](#2019-擅长排列的小明-ii)
  - [2073: 移位密码](#2073-移位密码)
  - [2152: 摆方格](#2152-摆方格)
  - [2074: 乘数密码](#2074-乘数密码)
  - [2120: N!](#2120-n)
  - [1706: 大数取模](#1706-大数取模)
- [8.13测试](#813测试)
  - [F - 2^x mod n = 1 HDU - 1395](#f---2x-mod-n--1-hdu---1395)
  - [D - 两军交锋 HDU - 2548](#d---两军交锋-hdu---2548)
  - [H-HDU - 1840Equations](#h-hdu---1840equations)
  - [I Think I Need a Houseboat](#i-think-i-need-a-houseboat)
- [总结：](#总结)
  - [TODO:](#todo)
  - [2. 字符串加法](#2-字符串加法)
- [相遇问题](#相遇问题)
  - [1. 改变数组元素使所有的数组元素都相等](#1-改变数组元素使所有的数组元素都相等)
- [其它](#其它)
  - [3. 乘积数组](#3-乘积数组)
- [动态规划](#动态规划)
- [1.0 最长公共子序列](#10-最长公共子序列)
  - [1.1 练手！](#11-练手)
  - [1.2 熟悉！](#12-熟悉)
  - [1.3 变换！](#13-变换)
  - [1.4 进阶！](#14-进阶)
  - [总结](#总结-1)
- [2.0 最长上升子序列 （LIS）](#20-最长上升子序列-lis)
  - [2.1 练习！](#21-练习)
  - [2.2 LIS 熟悉！](#22-lis-熟悉)
  - [2.3 掌握！](#23-掌握)
  - [198. 打家劫舍](#198-打家劫舍)
    - [思考](#思考-2)
    - [code](#code)
  - [213. 打家劫舍 II](#213-打家劫舍-ii)
    - [思考](#思考-3)
    - [code](#code-1)
  - [64. 最小路径和](#64-最小路径和)
    - [思考](#思考-4)
    - [code](#code-2)
  - [62. 不同路径](#62-不同路径)
    - [思考](#思考-5)
    - [code](#code-3)
  - [303. 区域和检索 - 数组不可变](#303-区域和检索---数组不可变)
    - [思考](#思考-6)
    - [code](#code-4)
  - [413. 等差数列划分](#413-等差数列划分)
    - [思考](#思考-7)
    - [code](#code-5)
  - [](#-1)
  - [1.5 交换硬币](#15-交换硬币)
    - [思考](#思考-8)
    - [code](#code-6)
- [3.0 斐波那契数列](#30-斐波那契数列)
  - [3.1 爬楼梯](#31-爬楼梯)
  - [3.2 练习!](#32-练习)
  - [3.3 练习!](#33-练习)
- [4.0 数组区间](#40-数组区间)
  - [4.1 区间和](#41-区间和)
  - [4.2 等差数列](#42-等差数列)
- [5.0 矩阵路径和](#50-矩阵路径和)
  - [5.1 练习！](#51-练习)
  - [5.2 练习！](#52-练习)
- [6.0 整数拆分](#60-整数拆分)
  - [6.1 练习！💚💚💚](#61-练习)
  - [6.2 练习！💚💚💚](#62-练习)
- [7.0 背包问题](#70-背包问题)
  - [1.0 练习！](#10-练习)
  - [2.0 练习！](#20-练习)
  - [3.0 练习！](#30-练习)
  - [4.0 练习！](#40-练习)
- [8.0 编辑距离](#80-编辑距离)
  - [8.1 练习！](#81-练习)
  - [8.2 练习！](#82-练习)
  - [8.3 练习！](#83-练习)
- [9.0 股票交易](#90-股票交易)
- [推荐资料](#推荐资料)
  - [DP-动态规划](#dp-动态规划)
- [动态规划](#动态规划-1)
  - [背景](#背景)
  - [递归和动规关系](#递归和动规关系)
  - [使用场景](#使用场景)
  - [四点要素](#四点要素)
  - [常见四种类型](#常见四种类型)
  - [1、矩阵类型（10%）](#1矩阵类型10)
    - [minimum-path-sum](#minimum-path-sum)
    - [unique-paths](#unique-paths)
    - [unique-paths-ii](#unique-paths-ii)
  - [2、序列类型（40%）](#2序列类型40)
    - [climbing-stairs](#climbing-stairs)
    - [jump-game](#jump-game)
    - [jump-game-ii](#jump-game-ii)
    - [palindrome-partitioning-ii](#palindrome-partitioning-ii)
    - [longest-increasing-subsequence](#longest-increasing-subsequence)
    - [word-break](#word-break)
  - [Two Sequences DP（40%）](#two-sequences-dp40)
    - [longest-common-subsequence](#longest-common-subsequence)
    - [edit-distance](#edit-distance)
  - [零钱和背包（10%）](#零钱和背包10)
    - [coin-change](#coin-change)
    - [backpack](#backpack)
    - [backpack-ii](#backpack-ii)
  - [练习](#练习)
- [字符串](#字符串)
- [1. 字符串循环移位包含](#1-字符串循环移位包含)
- [2. 字符串循环移位](#2-字符串循环移位)
- [3. 字符串中单词的翻转](#3-字符串中单词的翻转)
- [4. 两个字符串包含的字符是否完全相同](#4-两个字符串包含的字符是否完全相同)
- [5. 计算一组字符集合可以组成的回文字符串的最大长度](#5-计算一组字符集合可以组成的回文字符串的最大长度)
- [6. 字符串同构](#6-字符串同构)
- [7. 回文子字符串个数](#7-回文子字符串个数)
- [8. 判断一个整数是否是回文数](#8-判断一个整数是否是回文数)
- [9. 统计二进制字符串中连续 1 和连续 0 数量相同的子字符串个数](#9-统计二进制字符串中连续-1-和连续-0-数量相同的子字符串个数)
- [字符串匹配](#字符串匹配)
  - [KMP 算法](#kmp-算法)
  - [1.0 模板题](#10-模板题)
    - [思考](#思考-9)
  - [2.0](#20)
- [数组](#数组-1)
- [题单](#题单)
  - [遍历](#遍历)
- [递归](#递归-1)
- [BST](#bst)
- [Trie](#trie)
      - [maximum-depth-of-binary-tree](#maximum-depth-of-binary-tree)
      - [balanced-binary-tree](#balanced-binary-tree)
      - [binary-tree-maximum-path-sum](#binary-tree-maximum-path-sum)
      - [lowest-common-ancestor-of-a-binary-tree](#lowest-common-ancestor-of-a-binary-tree)
    - [BFS 层次应用](#bfs-层次应用)
      - [binary-tree-level-order-traversal](#binary-tree-level-order-traversal)
      - [binary-tree-level-order-traversal-ii](#binary-tree-level-order-traversal-ii)
      - [binary-tree-zigzag-level-order-traversal](#binary-tree-zigzag-level-order-traversal)
    - [二叉搜索树应用](#二叉搜索树应用)
      - [validate-binary-search-tree](#validate-binary-search-tree)
      - [insert-into-a-binary-search-tree](#insert-into-a-binary-search-tree)
  - [总结](#总结-2)
  - [练习](#练习-1)
- [二叉搜索树](#二叉搜索树)
  - [定义](#定义)
  - [应用](#应用)
  - [练习](#练习-2)
<!-- GFM-TOC -->


# 0. 原理

**基本原理** 

0s 表示一串 0，1s 表示一串 1。

```
x ^ 0s = x      x & 0s = 0      x | 0s = x
x ^ 1s = ~x     x & 1s = x      x | 1s = 1s
x ^ x = 0       x & x = x       x | x = x
```

利用 x ^ 1s = \~x 的特点，可以将一个数的位级表示翻转；利用 x ^ x = 0 的特点，可以将三个数中重复的两个数去除，只留下另一个数。

```
1^1^2 = 2
```

利用 x & 0s = 0 和 x & 1s = x 的特点，可以实现掩码操作。一个数 num 与 mask：00111100 进行位与操作，只保留 num 中与 mask 的 1 部分相对应的位。

```
01011011 &
00111100
--------
00011000
```

利用 x | 0s = x 和 x | 1s = 1s 的特点，可以实现设值操作。一个数 num 与 mask：00111100 进行位或操作，将 num 中与 mask 的 1 部分相对应的位都设置为 1。

```
01011011 |
00111100
--------
01111111
```

**位与运算技巧** 

n&(n-1) 去除 n 的位级表示中最低的那一位 1。例如对于二进制表示 01011011，减去 1 得到 01011010，这两个数相与得到 01011010。

```
01011011 &
01011010
--------
01011010
```

n&(-n) 得到 n 的位级表示中最低的那一位 1。-n 得到 n 的反码加 1，也就是 -n=\~n+1。例如对于二进制表示 10110100，-n 得到 01001100，相与得到 00000100。

```
10110100 &
01001100
--------
00000100
```

n-(n&(-n)) 则可以去除 n  的位级表示中最低的那一位 1，和 n&(n-1) 效果一样。

**移位运算** 

\>\> n 为算术右移，相当于除以 2<sup>n</sup>，例如 -7 >> 2 = -2。

```
11111111111111111111111111111001  >> 2
--------
11111111111111111111111111111110
```

\>\>\> n 为无符号右移，左边会补上 0。例如 -7 >>> 2 = 1073741822。

```
11111111111111111111111111111001  >>> 2
--------
00111111111111111111111111111111
```

&lt;&lt; n 为算术左移，相当于乘以 2<sup>n</sup>。-7 << 2 = -28。

```
11111111111111111111111111111001  << 2
--------
11111111111111111111111111100100
```

**mask 计算**  

要获取 111111111，将 0 取反即可，\~0。

要得到只有第 i 位为 1 的 mask，将 1 向左移动 i-1 位即可，1&lt;&lt;(i-1) 。例如 1&lt;&lt;4 得到只有第 5 位为 1 的 mask ：00010000。

要得到 1 到 i 位为 1 的 mask，(1&lt;&lt;i)-1 即可，例如将 (1&lt;&lt;4)-1 = 00010000-1 = 00001111。

要得到 1 到 i 位为 0 的 mask，只需将 1 到 i 位为 1 的 mask 取反，即 \~((1&lt;&lt;i)-1)。

**Java 中的位操作**  

```html
static int Integer.bitCount();           // 统计 1 的数量
static int Integer.highestOneBit();      // 获得最高位
static String toBinaryString(int i);     // 转换为二进制表示的字符串
```

# 1. 统计两个数的二进制表示有多少位不同

461. Hamming Distance (Easy)

[Leetcode](https://leetcode.com/problems/hamming-distance/) / [力扣](https://leetcode-cn.com/problems/hamming-distance/)

```html
Input: x = 1, y = 4

Output: 2

Explanation:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑

The above arrows point to positions where the corresponding bits are different.
```

对两个数进行异或操作，位级表示不同的那一位为 1，统计有多少个 1 即可。

```java
public int hammingDistance(int x, int y) {
    int z = x ^ y;
    int cnt = 0;
    while(z != 0) {
        if ((z & 1) == 1) cnt++;
        z = z >> 1;
    }
    return cnt;
}
```

使用 z&(z-1) 去除 z 位级表示最低的那一位。

```java
public int hammingDistance(int x, int y) {
    int z = x ^ y;
    int cnt = 0;
    while (z != 0) {
        z &= (z - 1);
        cnt++;
    }
    return cnt;
}
```

可以使用 Integer.bitcount() 来统计 1 个的个数。

```java
public int hammingDistance(int x, int y) {
    return Integer.bitCount(x ^ y);
}
```

# 2. 数组中唯一一个不重复的元素

136\. Single Number (Easy)

[Leetcode](https://leetcode.com/problems/single-number/description/) / [力扣](https://leetcode-cn.com/problems/single-number/description/)

```html
Input: [4,1,2,1,2]
Output: 4
```

两个相同的数异或的结果为 0，对所有数进行异或操作，最后的结果就是单独出现的那个数。

```java
public int singleNumber(int[] nums) {
    int ret = 0;
    for (int n : nums) ret = ret ^ n;
    return ret;
}
```

# 3. 找出数组中缺失的那个数

268\. Missing Number (Easy)

[Leetcode](https://leetcode.com/problems/missing-number/description/) / [力扣](https://leetcode-cn.com/problems/missing-number/description/)

```html
Input: [3,0,1]
Output: 2
```

题目描述：数组元素在 0-n 之间，但是有一个数是缺失的，要求找到这个缺失的数。

```java
public int missingNumber(int[] nums) {
    int ret = 0;
    for (int i = 0; i < nums.length; i++) {
        ret = ret ^ i ^ nums[i];
    }
    return ret ^ nums.length;
}
```

# 4. 数组中不重复的两个元素

260\. Single Number III (Medium)

[Leetcode](https://leetcode.com/problems/single-number-iii/description/) / [力扣](https://leetcode-cn.com/problems/single-number-iii/description/)

两个不相等的元素在位级表示上必定会有一位存在不同。

将数组的所有元素异或得到的结果为不存在重复的两个元素异或的结果。

diff &= -diff 得到出 diff 最右侧不为 0 的位，也就是不存在重复的两个元素在位级表示上最右侧不同的那一位，利用这一位就可以将两个元素区分开来。

```java
public int[] singleNumber(int[] nums) {
    int diff = 0;
    for (int num : nums) diff ^= num;
    diff &= -diff;  // 得到最右一位
    int[] ret = new int[2];
    for (int num : nums) {
        if ((num & diff) == 0) ret[0] ^= num;
        else ret[1] ^= num;
    }
    return ret;
}
```

# 5. 翻转一个数的比特位

190\. Reverse Bits (Easy)

[Leetcode](https://leetcode.com/problems/reverse-bits/description/) / [力扣](https://leetcode-cn.com/problems/reverse-bits/description/)

```java
public int reverseBits(int n) {
    int ret = 0;
    for (int i = 0; i < 32; i++) {
        ret <<= 1;
        ret |= (n & 1);
        n >>>= 1;
    }
    return ret;
}
```

如果该函数需要被调用很多次，可以将 int 拆成 4 个 byte，然后缓存 byte 对应的比特位翻转，最后再拼接起来。

```java
private static Map<Byte, Integer> cache = new HashMap<>();

public int reverseBits(int n) {
    int ret = 0;
    for (int i = 0; i < 4; i++) {
        ret <<= 8;
        ret |= reverseByte((byte) (n & 0b11111111));
        n >>= 8;
    }
    return ret;
}

private int reverseByte(byte b) {
    if (cache.containsKey(b)) return cache.get(b);
    int ret = 0;
    byte t = b;
    for (int i = 0; i < 8; i++) {
        ret <<= 1;
        ret |= t & 1;
        t >>= 1;
    }
    cache.put(b, ret);
    return ret;
}
```

# 6. 不用额外变量交换两个整数

[程序员代码面试指南 ：P317](#)

```java
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

# 7. 判断一个数是不是 2 的 n 次方

231\. Power of Two (Easy)

[Leetcode](https://leetcode.com/problems/power-of-two/description/) / [力扣](https://leetcode-cn.com/problems/power-of-two/description/)

二进制表示只有一个 1 存在。

```java
public boolean isPowerOfTwo(int n) {
    return n > 0 && Integer.bitCount(n) == 1;
}
```

利用 1000 & 0111 == 0 这种性质，得到以下解法：

```java
public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```

# 8.  判断一个数是不是 4 的 n 次方

342\. Power of Four (Easy)

[Leetcode](https://leetcode.com/problems/power-of-four/) / [力扣](https://leetcode-cn.com/problems/power-of-four/)

这种数在二进制表示中有且只有一个奇数位为 1，例如 16（10000）。

```java
public boolean isPowerOfFour(int num) {
    return num > 0 && (num & (num - 1)) == 0 && (num & 0b01010101010101010101010101010101) != 0;
}
```

也可以使用正则表达式进行匹配。

```java
public boolean isPowerOfFour(int num) {
    return Integer.toString(num, 4).matches("10*");
}
```

# 9. 判断一个数的位级表示是否不会出现连续的 0 和 1

693\. Binary Number with Alternating Bits (Easy)

[Leetcode](https://leetcode.com/problems/binary-number-with-alternating-bits/description/) / [力扣](https://leetcode-cn.com/problems/binary-number-with-alternating-bits/description/)

```html
Input: 10
Output: True
Explanation:
The binary representation of 10 is: 1010.

Input: 11
Output: False
Explanation:
The binary representation of 11 is: 1011.
```

对于 1010 这种位级表示的数，把它向右移动 1 位得到 101，这两个数每个位都不同，因此异或得到的结果为 1111。

```java
public boolean hasAlternatingBits(int n) {
    int a = (n ^ (n >> 1));
    return (a & (a + 1)) == 0;
}
```

# 10. 求一个数的补码

476\. Number Complement (Easy)

[Leetcode](https://leetcode.com/problems/number-complement/description/) / [力扣](https://leetcode-cn.com/problems/number-complement/description/)

```html
Input: 5
Output: 2
Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.
```

题目描述：不考虑二进制表示中的首 0 部分。

对于 00000101，要求补码可以将它与 00000111 进行异或操作。那么问题就转换为求掩码 00000111。

```java
public int findComplement(int num) {
    if (num == 0) return 1;
    int mask = 1 << 30;
    while ((num & mask) == 0) mask >>= 1;
    mask = (mask << 1) - 1;
    return num ^ mask;
}
```

可以利用 Java 的 Integer.highestOneBit() 方法来获得含有首 1 的数。

```java
public int findComplement(int num) {
    if (num == 0) return 1;
    int mask = Integer.highestOneBit(num);
    mask = (mask << 1) - 1;
    return num ^ mask;
}
```

对于 10000000 这样的数要扩展成 11111111，可以利用以下方法：

```html
mask |= mask >> 1    11000000
mask |= mask >> 2    11110000
mask |= mask >> 4    11111111
```

```java
public int findComplement(int num) {
    int mask = num;
    mask |= mask >> 1;
    mask |= mask >> 2;
    mask |= mask >> 4;
    mask |= mask >> 8;
    mask |= mask >> 16;
    return (mask ^ num);
}
```

# 11. 实现整数的加法

371\. Sum of Two Integers (Easy)

[Leetcode](https://leetcode.com/problems/sum-of-two-integers/description/) / [力扣](https://leetcode-cn.com/problems/sum-of-two-integers/description/)

a ^ b 表示没有考虑进位的情况下两数的和，(a & b) << 1 就是进位。

递归会终止的原因是 (a & b) << 1 最右边会多一个 0，那么继续递归，进位最右边的 0 会慢慢增多，最后进位会变为 0，递归终止。

```java
public int getSum(int a, int b) {
    return b == 0 ? a : getSum((a ^ b), (a & b) << 1);
}
```

# 12. 字符串数组最大乘积

318\. Maximum Product of Word Lengths (Medium)

[Leetcode](https://leetcode.com/problems/maximum-product-of-word-lengths/description/) / [力扣](https://leetcode-cn.com/problems/maximum-product-of-word-lengths/description/)

```html
Given ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]
Return 16
The two words can be "abcw", "xtfn".
```

题目描述：字符串数组的字符串只含有小写字符。求解字符串数组中两个字符串长度的最大乘积，要求这两个字符串不能含有相同字符。

本题主要问题是判断两个字符串是否含相同字符，由于字符串只含有小写字符，总共 26 位，因此可以用一个 32 位的整数来存储每个字符是否出现过。

```java
public int maxProduct(String[] words) {
    int n = words.length;
    int[] val = new int[n];
    for (int i = 0; i < n; i++) {
        for (char c : words[i].toCharArray()) {
            val[i] |= 1 << (c - 'a');
        }
    }
    int ret = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if ((val[i] & val[j]) == 0) {
                ret = Math.max(ret, words[i].length() * words[j].length());
            }
        }
    }
    return ret;
}
```

# 13. 统计从 0 \~ n 每个数的二进制表示中 1 的个数

338\. Counting Bits (Medium)

[Leetcode](https://leetcode.com/problems/counting-bits/description/) / [力扣](https://leetcode-cn.com/problems/counting-bits/description/)

对于数字 6(110)，它可以看成是 4(100) 再加一个 2(10)，因此 dp[i] = dp[i&(i-1)] + 1;

```java
public int[] countBits(int num) {
    int[] ret = new int[num + 1];
    for(int i = 1; i <= num; i++){
        ret[i] = ret[i&(i-1)] + 1;
    }
    return ret;
}
```





# 数学



## Leetcode-202【双指针+数学】
* 💖
* [Leetcode-202](https://leetcode.com/problems/happy-number/) / [力扣-202](https://leetcode-cn.com/problems/happy-number/)

* 首先需要把整数拆分出来，拆分完成后意识到死循环的出现，想着试一下，果不其然 TLE 了，只过去了两个例子，然后将例子调出来发现是 2 ，然后我又自己试了几个例子发现死循环都经过 89 ，然后又将所有得到 89 的值排除掉，AC 了。这个不严谨，归纳出来的。

	$4 \rightarrow 16 \rightarrow 37 \rightarrow 58 \rightarrow 89 \rightarrow 145 \rightarrow 42 \rightarrow 20 \rightarrow 4$

* 看了评论区后意识到的，死循环出现的原因是出现了环，所以借助快慢指针的思想可以将这种情况调出来。也就是设置两个下标，一个下标速度快（一次走两步），一个下标速度慢（一次走一步），因为环的存在二者必定相遇。就像操场跑步，一个跑的快一个跑的慢，二者同时出发绕圈，必定会在某个位置相遇。


```cpp
class Solution {
public:
    bool isHappy(int n) {
        while (1) {
            int sum = 0;
            while (n != 0) {
                sum += (n % 10 ) * (n % 10);
                n /= 10;
            }
            if (sum == 89) {
                return false;
            }
            if (sum == 1) {
                return true;
            }
            n = sum;
        }
        return false;
    }
};
```
这个速度非常快。
```
Accepted
401/401 cases passed (0 ms)
Your runtime beats 100 % of cpp submissions
Your memory usage beats 100 % of cpp submissions (6 MB)
```
快慢指针的写法：
```cpp
class Solution {
public:
    int getNumber(int n) {
        int sum = 0;
        while (n != 0) {
            sum += (n % 10 ) * (n % 10);
            n /= 10;
        }
        return sum;
    }
    bool isHappy(int n) {
        int a = getNumber(n);
        int b = getNumber(a);
        while (a != b) {
            a = getNumber(a);
            b = getNumber(getNumber(b));
        }
        return a == 1;
    }
};
```
```
Accepted
401/401 cases passed (4 ms)
Your runtime beats 65.1 % of cpp submissions
Your memory usage beats 100 % of cpp submissions (6 MB)
```

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





# 动态规划

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




# 动态规划

## 背景

先从一道题目开始~

如题  [triangle](https://leetcode-cn.com/problems/triangle/)

> 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

例如，给定三角形：

```text
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
```

自顶向下的最小路径和为  11（即，2 + 3 + 5 + 1 = 11）。

使用 DFS（遍历 或者 分治法）

遍历

![image.png](https://img.fuiboom.com/img/dp_triangle.png)

分治法

![image.png](https://img.fuiboom.com/img/dp_dc.png)

优化 DFS，缓存已经被计算的值（称为：记忆化搜索 本质上：动态规划）

![image.png](https://img.fuiboom.com/img/dp_memory_search.png)

动态规划就是把大问题变成小问题，并解决了小问题重复计算的方法称为动态规划

动态规划和 DFS 区别

- 二叉树 子问题是没有交集，所以大部分二叉树都用递归或者分治法，即 DFS，就可以解决
- 像 triangle 这种是有重复走的情况，**子问题是有交集**，所以可以用动态规划来解决

动态规划，自底向上

```go
func minimumTotal(triangle [][]int) int {
	if len(triangle) == 0 || len(triangle[0]) == 0 {
		return 0
	}
	// 1、状态定义：f[i][j] 表示从i,j出发，到达最后一层的最短路径
	var l = len(triangle)
	var f = make([][]int, l)
	// 2、初始化
	for i := 0; i < l; i++ {
		for j := 0; j < len(triangle[i]); j++ {
			if f[i] == nil {
				f[i] = make([]int, len(triangle[i]))
			}
			f[i][j] = triangle[i][j]
		}
	}
	// 3、递推求解
	for i := len(triangle) - 2; i >= 0; i-- {
		for j := 0; j < len(triangle[i]); j++ {
			f[i][j] = min(f[i+1][j], f[i+1][j+1]) + triangle[i][j]
		}
	}
	// 4、答案
	return f[0][0]
}
func min(a, b int) int {
	if a > b {
		return b
	}
	return a
}

```

动态规划，自顶向下

```go
// 测试用例：
// [
// [2],
// [3,4],
// [6,5,7],
// [4,1,8,3]
// ]
func minimumTotal(triangle [][]int) int {
    if len(triangle) == 0 || len(triangle[0]) == 0 {
        return 0
    }
    // 1、状态定义：f[i][j] 表示从0,0出发，到达i,j的最短路径
    var l = len(triangle)
    var f = make([][]int, l)
    // 2、初始化
    for i := 0; i < l; i++ {
        for j := 0; j < len(triangle[i]); j++ {
            if f[i] == nil {
                f[i] = make([]int, len(triangle[i]))
            }
            f[i][j] = triangle[i][j]
        }
    }
    // 递推求解
    for i := 1; i < l; i++ {
        for j := 0; j < len(triangle[i]); j++ {
            // 这里分为两种情况：
            // 1、上一层没有左边值
            // 2、上一层没有右边值
            if j-1 < 0 {
                f[i][j] = f[i-1][j] + triangle[i][j]
            } else if j >= len(f[i-1]) {
                f[i][j] = f[i-1][j-1] + triangle[i][j]
            } else {
                f[i][j] = min(f[i-1][j], f[i-1][j-1]) + triangle[i][j]
            }
        }
    }
    result := f[l-1][0]
    for i := 1; i < len(f[l-1]); i++ {
        result = min(result, f[l-1][i])
    }
    return result
}
func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```

## 递归和动规关系

递归是一种程序的实现方式：函数的自我调用

```go
Function(x) {
	...
	Funciton(x-1);
	...
}
```

动态规划：是一种解决问 题的思想，大规模问题的结果，是由小规模问 题的结果运算得来的。动态规划可用递归来实现(Memorization Search)

## 使用场景

满足两个条件

- 满足以下条件之一
  - 求最大/最小值（Maximum/Minimum ）
  - 求是否可行（Yes/No ）
  - 求可行个数（Count(\*) ）
- 满足不能排序或者交换（Can not sort / swap ）

如题：[longest-consecutive-sequence](https://leetcode-cn.com/problems/longest-consecutive-sequence/)  位置可以交换，所以不用动态规划

## 四点要素

1. **状态 State**
   - 灵感，创造力，存储小规模问题的结果
2. 方程 Function
   - 状态之间的联系，怎么通过小的状态，来算大的状态
3. 初始化 Intialization
   - 最极限的小状态是什么, 起点
4. 答案 Answer
   - 最大的那个状态是什么，终点

## 常见四种类型

1. Matrix DP (10%)
1. Sequence (40%)
1. Two Sequences DP (40%)
1. Backpack (10%)

> 注意点
>
> - 贪心算法大多题目靠背答案，所以如果能用动态规划就尽量用动规，不用贪心算法

## 1、矩阵类型（10%）

### [minimum-path-sum](https://leetcode-cn.com/problems/minimum-path-sum/)

> 给定一个包含非负整数的  *m* x *n*  网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

思路：动态规划
1、state: f[x][y]从起点走到 x,y 的最短路径
2、function: f[x][y] = min(f[x-1][y], f[x][y-1]) + A[x][y]
3、intialize: f[0][0] = A[0][0]、f[i][0] = sum(0,0 -> i,0)、 f[0][i] = sum(0,0 -> 0,i)
4、answer: f[n-1][m-1]

```go
func minPathSum(grid [][]int) int {
    // 思路：动态规划
    // f[i][j] 表示i,j到0,0的和最小
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }
    // 复用原来的矩阵列表
    // 初始化：f[i][0]、f[0][j]
    for i := 1; i < len(grid); i++ {
        grid[i][0] = grid[i][0] + grid[i-1][0]
    }
    for j := 1; j < len(grid[0]); j++ {
        grid[0][j] = grid[0][j] + grid[0][j-1]
    }
    for i := 1; i < len(grid); i++ {
        for j := 1; j < len(grid[i]); j++ {
            grid[i][j] = min(grid[i][j-1], grid[i-1][j]) + grid[i][j]
        }
    }
    return grid[len(grid)-1][len(grid[0])-1]
}
func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```

### [unique-paths](https://leetcode-cn.com/problems/unique-paths/)

> 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
> 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
> 问总共有多少条不同的路径？

```go
func uniquePaths(m int, n int) int {
	// f[i][j] 表示i,j到0,0路径数
	f := make([][]int, m)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if f[i] == nil {
				f[i] = make([]int, n)
			}
			f[i][j] = 1
		}
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			f[i][j] = f[i-1][j] + f[i][j-1]
		}
	}
	return f[m-1][n-1]
}
```

### [unique-paths-ii](https://leetcode-cn.com/problems/unique-paths-ii/)

> 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
> 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
> 问总共有多少条不同的路径？
> 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

```go
func uniquePathsWithObstacles(obstacleGrid [][]int) int {
	// f[i][j] = f[i-1][j] + f[i][j-1] 并检查障碍物
	if obstacleGrid[0][0] == 1 {
		return 0
	}
	m := len(obstacleGrid)
	n := len(obstacleGrid[0])
	f := make([][]int, m)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if f[i] == nil {
				f[i] = make([]int, n)
			}
			f[i][j] = 1
		}
	}
	for i := 1; i < m; i++ {
		if obstacleGrid[i][0] == 1 || f[i-1][0] == 0 {
			f[i][0] = 0
		}
	}
	for j := 1; j < n; j++ {
		if obstacleGrid[0][j] == 1 || f[0][j-1] == 0 {
			f[0][j] = 0
		}
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			if obstacleGrid[i][j] == 1 {
				f[i][j] = 0
			} else {
				f[i][j] = f[i-1][j] + f[i][j-1]
			}
		}
	}
	return f[m-1][n-1]
}
```

## 2、序列类型（40%）

### [climbing-stairs](https://leetcode-cn.com/problems/climbing-stairs/)

> 假设你正在爬楼梯。需要  *n*  阶你才能到达楼顶。

```go
func climbStairs(n int) int {
    // f[i] = f[i-1] + f[i-2]
    if n == 1 || n == 0 {
        return n
    }
    f := make([]int, n+1)
    f[1] = 1
    f[2] = 2
    for i := 3; i <= n; i++ {
        f[i] = f[i-1] + f[i-2]
    }
    return f[n]
}
```

### [jump-game](https://leetcode-cn.com/problems/jump-game/)

> 给定一个非负整数数组，你最初位于数组的第一个位置。
> 数组中的每个元素代表你在该位置可以跳跃的最大长度。
> 判断你是否能够到达最后一个位置。

```go
func canJump(nums []int) bool {
    // 思路：看最后一跳
    // 状态：f[i] 表示是否能从0跳到i
    // 推导：f[i] = OR(f[j],j<i&&j能跳到i) 判断之前所有的点最后一跳是否能跳到当前点
    // 初始化：f[0] = 0
    // 结果： f[n-1]
    if len(nums) == 0 {
        return true
    }
    f := make([]bool, len(nums))
    f[0] = true
    for i := 1; i < len(nums); i++ {
        for j := 0; j < i; j++ {
            if f[j] == true && nums[j]+j >= i {
                f[i] = true
            }
        }
    }
    return f[len(nums)-1]
}
```

### [jump-game-ii](https://leetcode-cn.com/problems/jump-game-ii/)

> 给定一个非负整数数组，你最初位于数组的第一个位置。
> 数组中的每个元素代表你在该位置可以跳跃的最大长度。
> 你的目标是使用最少的跳跃次数到达数组的最后一个位置。

```go
func jump(nums []int) int {
    // 状态：f[i] 表示从起点到当前位置最小次数
    // 推导：f[i] = f[j],a[j]+j >=i,min(f[j]+1)
    // 初始化：f[0] = 0
    // 结果：f[n-1]
    f := make([]int, len(nums))
    f[0] = 0
    for i := 1; i < len(nums); i++ {
        // f[i] 最大值为i
        f[i] = i
        // 遍历之前结果取一个最小值+1
        for j := 0; j < i; j++ {
            if nums[j]+j >= i {
                f[i] = min(f[j]+1,f[i])
            }
        }
    }
    return f[len(nums)-1]
}
func min(a, b int) int {
    if a > b {
        return b
    }
    return a
}
```

### [palindrome-partitioning-ii](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

> 给定一个字符串 _s_，将 _s_ 分割成一些子串，使每个子串都是回文串。
> 返回符合要求的最少分割次数。

```go
func minCut(s string) int {
	// state: f[i] "前i"个字符组成的子字符串需要最少几次cut(个数-1为索引)
	// function: f[i] = MIN{f[j]+1}, j < i && [j+1 ~ i]这一段是一个回文串
	// intialize: f[i] = i - 1 (f[0] = -1)
	// answer: f[s.length()]
	if len(s) == 0 || len(s) == 1 {
		return 0
	}
	f := make([]int, len(s)+1)
	f[0] = -1
	f[1] = 0
	for i := 1; i <= len(s); i++ {
		f[i] = i - 1
		for j := 0; j < i; j++ {
			if isPalindrome(s, j, i-1) {
				f[i] = min(f[i], f[j]+1)
			}
		}
	}
	return f[len(s)]
}
func min(a, b int) int {
	if a > b {
		return b
	}
	return a
}
func isPalindrome(s string, i, j int) bool {
	for i < j {
		if s[i] != s[j] {
			return false
		}
		i++
		j--
	}
	return true
}
```

注意点

- 判断回文字符串时，可以提前用动态规划算好，减少时间复杂度

### [longest-increasing-subsequence](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

> 给定一个无序的整数数组，找到其中最长上升子序列的长度。

```go
func lengthOfLIS(nums []int) int {
    // f[i] 表示从0开始到i结尾的最长序列长度
    // f[i] = max(f[j])+1 ,a[j]<a[i]
    // f[0...n-1] = 1
    // max(f[0]...f[n-1])
    if len(nums) == 0 || len(nums) == 1 {
        return len(nums)
    }
    f := make([]int, len(nums))
    f[0] = 1
    for i := 1; i < len(nums); i++ {
        f[i] = 1
        for j := 0; j < i; j++ {
            if nums[j] < nums[i] {
                f[i] = max(f[i], f[j]+1)
            }
        }
    }
    result := f[0]
    for i := 1; i < len(nums); i++ {
        result = max(result, f[i])
    }
    return result

}
func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

### [word-break](https://leetcode-cn.com/problems/word-break/)

> 给定一个**非空**字符串  *s*  和一个包含**非空**单词列表的字典  *wordDict*，判定  *s*  是否可以被空格拆分为一个或多个在字典中出现的单词。

```go
func wordBreak(s string, wordDict []string) bool {
	// f[i] 表示前i个字符是否可以被切分
	// f[i] = f[j] && s[j+1~i] in wordDict
	// f[0] = true
	// return f[len]

	if len(s) == 0 {
		return true
	}
	f := make([]bool, len(s)+1)
	f[0] = true
	max := maxLen(wordDict)
	for i := 1; i <= len(s); i++ {
		for j := i - max; j < i && j >= 0; j++ {
			if f[j] && inDict(s[j:i]) {
				f[i] = true
				break
			}
		}
	}
	return f[len(s)]
}

var dict = make(map[string]bool)

func maxLen(wordDict []string) int {
	max := 0
	for _, v := range wordDict {
		dict[v] = true
		if len(v) > max {
			max = len(v)
		}
	}
	return max
}

func inDict(s string) bool {
	_, ok := dict[s]
	return ok
}

```

小结

常见处理方式是给 0 位置占位，这样处理问题时一视同仁，初始化则在原来基础上 length+1，返回结果 f[n]

- 状态可以为前 i 个
- 初始化 length+1
- 取值 index=i-1
- 返回值：f[n]或者 f[m][n]

## Two Sequences DP（40%）

### [longest-common-subsequence](https://leetcode-cn.com/problems/longest-common-subsequence/)

> 给定两个字符串  text1 和  text2，返回这两个字符串的最长公共子序列。
> 一个字符串的   子序列   是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
> 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

```go
func longestCommonSubsequence(a string, b string) int {
    // dp[i][j] a前i个和b前j个字符最长公共子序列
    // dp[m+1][n+1]
    //   ' a d c e
    // ' 0 0 0 0 0
    // a 0 1 1 1 1
    // c 0 1 1 2 1
    //
    dp:=make([][]int,len(a)+1)
    for i:=0;i<=len(a);i++ {
        dp[i]=make([]int,len(b)+1)
    }
    for i:=1;i<=len(a);i++ {
        for j:=1;j<=len(b);j++ {
            // 相等取左上元素+1，否则取左或上的较大值
            if a[i-1]==b[j-1] {
                dp[i][j]=dp[i-1][j-1]+1
            } else {
                dp[i][j]=max(dp[i-1][j],dp[i][j-1])
            }
        }
    }
    return dp[len(a)][len(b)]
}
func max(a,b int)int {
    if a>b{
        return a
    }
    return b
}
```

注意点

- go 切片初始化

```go
dp:=make([][]int,len(a)+1)
for i:=0;i<=len(a);i++ {
    dp[i]=make([]int,len(b)+1)
}
```

- 从 1 开始遍历到最大长度
- 索引需要减一

### [edit-distance](https://leetcode-cn.com/problems/edit-distance/)

> 给你两个单词  word1 和  word2，请你计算出将  word1  转换成  word2 所使用的最少操作数  
> 你可以对一个单词进行如下三种操作：
> 插入一个字符
> 删除一个字符
> 替换一个字符

思路：和上题很类似，相等则不需要操作，否则取删除、插入、替换最小操作次数的值+1

```go
func minDistance(word1 string, word2 string) int {
    // dp[i][j] 表示a字符串的前i个字符编辑为b字符串的前j个字符最少需要多少次操作
    // dp[i][j] = OR(dp[i-1][j-1]，a[i]==b[j],min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1)
    dp:=make([][]int,len(word1)+1)
    for i:=0;i<len(dp);i++{
        dp[i]=make([]int,len(word2)+1)
    }
    for i:=0;i<len(dp);i++{
        dp[i][0]=i
    }
    for j:=0;j<len(dp[0]);j++{
        dp[0][j]=j
    }
    for i:=1;i<=len(word1);i++{
        for j:=1;j<=len(word2);j++{
            // 相等则不需要操作
            if word1[i-1]==word2[j-1] {
                dp[i][j]=dp[i-1][j-1]
            }else{ // 否则取删除、插入、替换最小操作次数的值+1
                dp[i][j]=min(min(dp[i-1][j],dp[i][j-1]),dp[i-1][j-1])+1
            }
        }
    }
    return dp[len(word1)][len(word2)]
}
func min(a,b int)int{
    if a>b{
        return b
    }
    return a
}
```

说明

> 另外一种做法：MAXLEN(a,b)-LCS(a,b)

## 零钱和背包（10%）

### [coin-change](https://leetcode-cn.com/problems/coin-change/)

> 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回  -1。

思路：和其他 DP 不太一样，i 表示钱或者容量

```go
func coinChange(coins []int, amount int) int {
    // 状态 dp[i]表示金额为i时，组成的最小硬币个数
    // 推导 dp[i]  = min(dp[i-1], dp[i-2], dp[i-5])+1, 前提 i-coins[j] > 0
    // 初始化为最大值 dp[i]=amount+1
    // 返回值 dp[n] or dp[n]>amount =>-1
    dp:=make([]int,amount+1)
    for i:=0;i<=amount;i++{
        dp[i]=amount+1
    }
    dp[0]=0
    for i:=1;i<=amount;i++{
        for j:=0;j<len(coins);j++{
            if  i-coins[j]>=0  {
                dp[i]=min(dp[i],dp[i-coins[j]]+1)
            }
        }
    }
    if dp[amount] > amount {
        return -1
    }
    return dp[amount]

}
func min(a,b int)int{
    if a>b{
        return b
    }
    return a
}
```

注意

> dp[i-a[j]] 决策 a[j]是否参与

### [backpack](https://www.lintcode.com/problem/backpack/description)

> 在 n 个物品中挑选若干物品装入背包，最多能装多满？假设背包的大小为 m，每个物品的大小为 A[i]

```go
func backPack (m int, A []int) int {
    // write your code here
    // f[i][j] 前i个物品，是否能装j
    // f[i][j] =f[i-1][j] f[i-1][j-a[i] j>a[i]
    // f[0][0]=true f[...][0]=true
    // f[n][X]
    f:=make([][]bool,len(A)+1)
    for i:=0;i<=len(A);i++{
        f[i]=make([]bool,m+1)
    }
    f[0][0]=true
    for i:=1;i<=len(A);i++{
        for j:=0;j<=m;j++{
            f[i][j]=f[i-1][j]
            if j-A[i-1]>=0 && f[i-1][j-A[i-1]]{
                f[i][j]=true
            }
        }
    }
    for i:=m;i>=0;i--{
        if f[len(A)][i] {
            return i
        }
    }
    return 0
}

```

### [backpack-ii](https://www.lintcode.com/problem/backpack-ii/description)

> 有 `n` 个物品和一个大小为 `m` 的背包. 给定数组 `A` 表示每个物品的大小和数组 `V` 表示每个物品的价值.
> 问最多能装入背包的总价值是多大?

思路：f[i][j] 前 i 个物品，装入 j 背包 最大价值

```go
func backPackII (m int, A []int, V []int) int {
    // write your code here
    // f[i][j] 前i个物品，装入j背包 最大价值
    // f[i][j] =max(f[i-1][j] ,f[i-1][j-A[i]]+V[i]) 是否加入A[i]物品
    // f[0][0]=0 f[0][...]=0 f[...][0]=0
    f:=make([][]int,len(A)+1)
    for i:=0;i<len(A)+1;i++{
        f[i]=make([]int,m+1)
    }
    for i:=1;i<=len(A);i++{
        for j:=0;j<=m;j++{
            f[i][j]=f[i-1][j]
            if j-A[i-1] >= 0{
                f[i][j]=max(f[i-1][j],f[i-1][j-A[i-1]]+V[i-1])
            }
        }
    }
    return f[len(A)][m]
}
func max(a,b int)int{
    if a>b{
        return a
    }
    return b
}
```

## 练习

Matrix DP (10%)

- [ ] [triangle](https://leetcode-cn.com/problems/triangle/)
- [ ] [minimum-path-sum](https://leetcode-cn.com/problems/minimum-path-sum/)
- [ ] [unique-paths](https://leetcode-cn.com/problems/unique-paths/)
- [ ] [unique-paths-ii](https://leetcode-cn.com/problems/unique-paths-ii/)

Sequence (40%)

- [ ] [climbing-stairs](https://leetcode-cn.com/problems/climbing-stairs/)
- [ ] [jump-game](https://leetcode-cn.com/problems/jump-game/)
- [ ] [jump-game-ii](https://leetcode-cn.com/problems/jump-game-ii/)
- [ ] [palindrome-partitioning-ii](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)
- [ ] [longest-increasing-subsequence](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
- [ ] [word-break](https://leetcode-cn.com/problems/word-break/)

Two Sequences DP (40%)

- [ ] [longest-common-subsequence](https://leetcode-cn.com/problems/longest-common-subsequence/)
- [ ] [edit-distance](https://leetcode-cn.com/problems/edit-distance/)

Backpack & Coin Change (10%)

- [ ] [coin-change](https://leetcode-cn.com/problems/coin-change/)
- [ ] [backpack](https://www.lintcode.com/problem/backpack/description)
- [ ] [backpack-ii](https://www.lintcode.com/problem/backpack-ii/description)


# 字符串



<!-- GFM-TOC -->
- [概述](#概述)
- [模式匹配算法](#模式匹配算法)
- [BF 算法](#bf-算法)
- [KMP 算法](#kmp-算法)
- [改进 KMP 算法](#改进-kmp-算法)
- [应用](#应用)
- [1. 字符串循环移位包含](#1-字符串循环移位包含)
- [2. 字符串循环移位](#2-字符串循环移位)
- [3. 字符串中单词的翻转](#3-字符串中单词的翻转)
- [4. 两个字符串包含的字符是否完全相同](#4-两个字符串包含的字符是否完全相同)
- [5. 计算一组字符集合可以组成的回文字符串的最大长度](#5-计算一组字符集合可以组成的回文字符串的最大长度)
- [6. 字符串同构](#6-字符串同构)
- [7. 回文子字符串个数](#7-回文子字符串个数)
- [8. 判断一个整数是否是回文数](#8-判断一个整数是否是回文数)
- [9. 统计二进制字符串中连续 1 和连续 0 数量相同的子字符串个数](#9-统计二进制字符串中连续-1-和连续-0-数量相同的子字符串个数)
- [字符串匹配](#字符串匹配)
  - [KMP 算法](#kmp-算法-1)
  - [1.0 模板题](#10-模板题)
    - [思考](#思考)
  - [2.0](#20)
<!-- GFM-TOC -->


# 1. 字符串循环移位包含

[编程之美 3.1](#)

```html
s1 = AABCD, s2 = CDAA
Return : true
```

给定两个字符串 s1 和 s2，要求判定 s2 是否能够被 s1 做循环移位得到的字符串包含。

s1 进行循环移位的结果是 s1s1 的子字符串，因此只要判断 s2 是否是 s1s1 的子字符串即可。

# 2. 字符串循环移位

[编程之美 2.17](#)

```html
s = "abcd123" k = 3
Return "123abcd"
```

将字符串向右循环移动 k 位。

将 abcd123 中的 abcd 和 123 单独翻转，得到 dcba321，然后对整个字符串进行翻转，得到 123abcd。

# 3. 字符串中单词的翻转

[程序员代码面试指南](#)

```html
s = "I am a student"
Return "student a am I"
```

将每个单词翻转，然后将整个字符串翻转。

# 4. 两个字符串包含的字符是否完全相同

242\. Valid Anagram (Easy)

[Leetcode](https://leetcode.com/problems/valid-anagram/description/) / [力扣](https://leetcode-cn.com/problems/valid-anagram/description/)

```html
s = "anagram", t = "nagaram", return true.
s = "rat", t = "car", return false.
```

可以用 HashMap 来映射字符与出现次数，然后比较两个字符串出现的字符数量是否相同。

由于本题的字符串只包含 26 个小写字符，因此可以使用长度为 26 的整型数组对字符串出现的字符进行统计，不再使用 HashMap。

```java
public boolean isAnagram(String s, String t) {
    int[] cnts = new int[26];
    for (char c : s.toCharArray()) {
        cnts[c - 'a']++;
    }
    for (char c : t.toCharArray()) {
        cnts[c - 'a']--;
    }
    for (int cnt : cnts) {
        if (cnt != 0) {
            return false;
        }
    }
    return true;
}
```

# 5. 计算一组字符集合可以组成的回文字符串的最大长度

409\. Longest Palindrome (Easy)

[Leetcode](https://leetcode.com/problems/longest-palindrome/description/) / [力扣](https://leetcode-cn.com/problems/longest-palindrome/description/)

```html
Input : "abccccdd"
Output : 7
Explanation : One longest palindrome that can be built is "dccaccd", whose length is 7.
```

使用长度为 256 的整型数组来统计每个字符出现的个数，每个字符有偶数个可以用来构成回文字符串。

因为回文字符串最中间的那个字符可以单独出现，所以如果有单独的字符就把它放到最中间。

```java
public int longestPalindrome(String s) {
    int[] cnts = new int[256];
    for (char c : s.toCharArray()) {
        cnts[c]++;
    }
    int palindrome = 0;
    for (int cnt : cnts) {
        palindrome += (cnt / 2) * 2;
    }
    if (palindrome < s.length()) {
        palindrome++;   // 这个条件下 s 中一定有单个未使用的字符存在，可以把这个字符放到回文的最中间
    }
    return palindrome;
}
```

# 6. 字符串同构

205\. Isomorphic Strings (Easy)

[Leetcode](https://leetcode.com/problems/isomorphic-strings/description/) / [力扣](https://leetcode-cn.com/problems/isomorphic-strings/description/)

```html
Given "egg", "add", return true.
Given "foo", "bar", return false.
Given "paper", "title", return true.
```

记录一个字符上次出现的位置，如果两个字符串中的字符上次出现的位置一样，那么就属于同构。

```java
public boolean isIsomorphic(String s, String t) {
    int[] preIndexOfS = new int[256];
    int[] preIndexOfT = new int[256];
    for (int i = 0; i < s.length(); i++) {
        char sc = s.charAt(i), tc = t.charAt(i);
        if (preIndexOfS[sc] != preIndexOfT[tc]) {
            return false;
        }
        preIndexOfS[sc] = i + 1;
        preIndexOfT[tc] = i + 1;
    }
    return true;
}
```

# 7. 回文子字符串个数

647\. Palindromic Substrings (Medium)

[Leetcode](https://leetcode.com/problems/palindromic-substrings/description/) / [力扣](https://leetcode-cn.com/problems/palindromic-substrings/description/)

```html
Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
```

从字符串的某一位开始，尝试着去扩展子字符串。

```java
private int cnt = 0;

public int countSubstrings(String s) {
    for (int i = 0; i < s.length(); i++) {
        extendSubstrings(s, i, i);     // 奇数长度
        extendSubstrings(s, i, i + 1); // 偶数长度
    }
    return cnt;
}

private void extendSubstrings(String s, int start, int end) {
    while (start >= 0 && end < s.length() && s.charAt(start) == s.charAt(end)) {
        start--;
        end++;
        cnt++;
    }
}
```

# 8. 判断一个整数是否是回文数

9\. Palindrome Number (Easy)

[Leetcode](https://leetcode.com/problems/palindrome-number/description/) / [力扣](https://leetcode-cn.com/problems/palindrome-number/description/)

要求不能使用额外空间，也就不能将整数转换为字符串进行判断。

将整数分成左右两部分，右边那部分需要转置，然后判断这两部分是否相等。

```java
public boolean isPalindrome(int x) {
    if (x == 0) {
        return true;
    }
    if (x < 0 || x % 10 == 0) {
        return false;
    }
    int right = 0;
    while (x > right) {
        right = right * 10 + x % 10;
        x /= 10;
    }
    return x == right || x == right / 10;
}
```

# 9. 统计二进制字符串中连续 1 和连续 0 数量相同的子字符串个数

696\. Count Binary Substrings (Easy)

[Leetcode](https://leetcode.com/problems/count-binary-substrings/description/) / [力扣](https://leetcode-cn.com/problems/count-binary-substrings/description/)

```html
Input: "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".
```

```java
public int countBinarySubstrings(String s) {
    int preLen = 0, curLen = 1, count = 0;
    for (int i = 1; i < s.length(); i++) {
        if (s.charAt(i) == s.charAt(i - 1)) {
            curLen++;
        } else {
            preLen = curLen;
            curLen = 1;
        }

        if (preLen >= curLen) {
            count++;
        }
    }
    return count;
}
```
# 字符串匹配
## KMP 算法
算法导论。
## 1.0 模板题

[Number Sequence](http://acm.hdu.edu.cn/showproblem.php?pid=1711)
### 思考
模板题， 注意 next 数组命名 ，如果命名为 next 会编译错号，原因是和库中函数重名。
还有，用 c++ 提交大概 3600 ms 可以过去， 但是 gcc 超时。

```cpp
#include <iostream>
#define MAX_SIZE_t 1000010
#define MAX_SIZE_p 10010
using namespace std;
int Next[MAX_SIZE_p];
int t[MAX_SIZE_t];
int p[MAX_SIZE_p];
void getNext(int pLen) {
    int i = -1;
    int j = 0;
    Next[0] = -1;
    while ( j < pLen-1 ) {
        if (i < 0 || p[i] == p[j])
        {
            i++;
            j++;
            Next[j] = i;
        }else{
            i = Next[i];
        }
        
    }
}
int KMP(int tLen , int pLen){
    int i = 0;
    int j = 0;
    while ( i < tLen  && j < pLen ) {
        if (j == -1 || t[i] == p[j] ) {
            i++ , j++;
        }else{
            j = Next[j];
        }
    }
    if ( j == pLen ) {
        return i - j + 1;
    }else{
        return -1;
    }
}
int main() {
    int n , a , b ;
    cin >> n;
    while ( n-- ) {
        cin >> a >> b;
        for ( int i = 0; i < a ; i++ ) {
            cin >> t[i];
        }
        for ( int j = 0; j < b; j++ ) {
            cin >> p[j];
        }
        getNext(b);
        int index = KMP(a, b);
        cout << index << endl;
    }
    return 0;
}
```



## 2.0 




# 数组


# 题单

## 遍历

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [❎Leetcode-144](alg/Leetcode-144.md) |   💗   |  cpp  |
| [❎Leetcode-145](alg/Leetcode-145.md) |   💗   |  cpp  |
|  [❎Leetcode-94](alg/Leetcode-94.md)  |   💗   |  cpp  |
| [❎Leetcode-637](alg/Leetcode-637.md) |   💗   |  cpp  |
| [❎Leetcode-513](alg/Leetcode-513.md) |   💗   |  cpp  |
| [❎Leetcode-100](alg/Leetcode-100.md) |   💗   |  cpp  |
| [❎Leetcode-101](alg/Leetcode-101.md) |   💗   |  cpp  |
| [❎Leetcode-543](alg/Leetcode-543.md) |   💗   |  cpp  |
| [❎Leetcode-226](alg/Leetcode-226.md) |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |
| [❎Leetcode-112](alg/Leetcode-112.md) |   💗   |  cpp  |
| [❎Leetcode-637](alg/Leetcode-637.md) |   💗   |  cpp  |
| [❎Leetcode-513](alg/Leetcode-513.md) |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |



# 递归

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [Leetcode-104](alg/Leetcode-104.md)  |   💗   |  cpp  |
| [Leetcode-110](alg/Leetcode-110.md)  |   💗   |  cpp  |
| [Leetcode-543](alg/Leetcode-543.md)  |   💗   |  cpp  |
| [Leetcode-226](alg/Leetcode-226.md)  |   💗   |  cpp  |
| [❎Leetcode-617](alg/Leetcode-617.md) |   💗   |  cpp  |
| [❎Leetcode-112](alg/Leetcode-112.md) |   💗   |  cpp  |
| [❎Leetcode-437](alg/Leetcode-437.md) |   💗   |  cpp  |
| [❎Leetcode-101](alg/Leetcode-101.md) |   💗   |  cpp  |
| [❎Leetcode-111](alg/Leetcode-111.md) |   💗   |  cpp  |
| [❎Leetcode-404](alg/Leetcode-404.md) |   💗   |  cpp  |
| [❎Leetcode-687](alg/Leetcode-687.md) |   💗   |  cpp  |
| [❎Leetcode-337](alg/Leetcode-337.md) |   💗   |  cpp  |
| [❎Leetcode-671](alg/Leetcode-671.md) |   💗   |  cpp  |

# BST

二叉查找树（BST）：根节点大于等于左子树所有节点，小于等于右子树所有节点。

二叉查找树中序遍历有序。

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [❎Leetcode-667](alg/Leetcode-669.md) |   💗   |  cpp  |
| [❎Leetcode-230](alg/Leetcode-230.md) |   💗   |  cpp  |
| [❎Leetcode-538](alg/Leetcode-538.md) |   💗   |  cpp  |
| [❎Leetcode-235](alg/Leetcode-235.md) |   💗   |  cpp  |
| [❎Leetcode-236](alg/Leetcode-236.md) |   💗   |  cpp  |
| [❎Leetcode-108](alg/Leetcode-108.md) |   💗   |  cpp  |
| [❎Leetcode-109](alg/Leetcode-109.md) |   💗   |  cpp  |
| [❎Leetcode-653](alg/Leetcode-653.md) |   💗   |  cpp  |
| [❎Leetcode-530](alg/Leetcode-530.md) |   💗   |  cpp  |
| [❎Leetcode-501](alg/Leetcode-501.md) |   💗   |  cpp  |
| [❎Leetcode-669](alg/Leetcode-669.md) |   💗   |  cpp  |


# Trie

|                 题目                 | 难度  | 语言  |
| :----------------------------------: | :---: | :---: |
| [❎Leetcode-208](alg/Leetcode-208.md) |   💗   |  cpp  |
| [❎Leetcode-677](alg/Leetcode-677.md) |   💗   |  cpp  |



#### maximum-depth-of-binary-tree

[maximum-depth-of-binary-tree](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

> 给定一个二叉树，找出其最大深度。

思路：分治法

#### balanced-binary-tree

[balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)

> 给定一个二叉树，判断它是否是高度平衡的二叉树。

思路：分治法，左边平衡 && 右边平衡 && 左右两边高度 <= 1，
因为需要返回是否平衡及高度，要么返回两个数据，要么合并两个数据，
所以用-1 表示不平衡，>0 表示树高度（二义性：一个变量有两种含义）。


#### binary-tree-maximum-path-sum

[binary-tree-maximum-path-sum](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

> 给定一个**非空**二叉树，返回其最大路径和。

思路：分治法，分为三种情况：左子树最大路径和最大，右子树最大路径和最大，左右子树最大加根节点最大，需要保存两个变量：一个保存子树最大路径和，一个保存左右加根节点和，然后比较这个两个变量选择最大值即可

#### lowest-common-ancestor-of-a-binary-tree

[lowest-common-ancestor-of-a-binary-tree](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

> 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

思路：分治法，有左子树的公共祖先或者有右子树的公共祖先，就返回子树的祖先，否则返回根节点


### BFS 层次应用

#### binary-tree-level-order-traversal

[binary-tree-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)


> 给你一个二叉树，请你返回其按  **层序遍历**  得到的节点值。 （即逐层地，从左到右访问所有节点）

思路：用一个队列记录一层的元素，然后扫描这一层元素添加下一层元素到队列（一个数进去出来一次，所以复杂度 O(logN)）


#### binary-tree-level-order-traversal-ii

[binary-tree-level-order-traversal-ii](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

> 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

思路：在层级遍历的基础上，翻转一下结果即可


#### binary-tree-zigzag-level-order-traversal

[binary-tree-zigzag-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)

> 给定一个二叉树，返回其节点值的锯齿形层次遍历。Z 字形遍历



### 二叉搜索树应用

#### validate-binary-search-tree

[validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

思路 1：中序遍历，检查结果列表是否已经有序

思路 2：分治法，判断左 MAX < 根 < 右 MIN

#### insert-into-a-binary-search-tree

[insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

> 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。

思路：找到最后一个叶子节点满足插入条件即可


## 总结

- 掌握二叉树递归与非递归遍历
- 理解 DFS 前序遍历与分治法
- 理解 BFS 层次遍历

## 练习

- [ ] [maximum-depth-of-binary-tree](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
- [ ] [balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)
- [ ] [binary-tree-maximum-path-sum](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)
- [ ] [lowest-common-ancestor-of-a-binary-tree](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- [ ] [binary-tree-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
- [ ] [binary-tree-level-order-traversal-ii](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)
- [ ] [binary-tree-zigzag-level-order-traversal](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)
- [ ] [validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [ ] [insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)



# 二叉搜索树

## 定义

- 每个节点中的值必须大于（或等于）存储在其左侧子树中的任何值。
- 每个节点中的值必须小于（或等于）存储在其右子树中的任何值。

## 应用

[validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> 验证二叉搜索树

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func isValidBST(root *TreeNode) bool {
    return dfs(root).valid
}
type ResultType struct{
    max int
    min int
    valid bool
}
func dfs(root *TreeNode)(result ResultType){
    if root==nil{
        result.max=-1<<63
        result.min=1<<63-1
        result.valid=true
        return
    }

    left:=dfs(root.Left)
    right:=dfs(root.Right)

    // 1、满足左边最大值<root<右边最小值 && 左右两边valid
    if root.Val>left.max && root.Val<right.min && left.valid && right.valid {
        result.valid=true
    }
    // 2、更新当前节点的最大最小值
    result.max=Max(Max(left.max,right.max),root.Val)
    result.min=Min(Min(left.min,right.min),root.Val)
    return
}
func Max(a,b int)int{
    if a>b{
        return a
    }
    return b
}
func Min(a,b int)int{
    if a>b{
        return b
    }
    return a
}

```

[insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)

> 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 保证原始二叉搜索树中不存在新值。

```go
func insertIntoBST(root *TreeNode, val int) *TreeNode {
    if root==nil{
        return &TreeNode{Val:val}
    }
    if root.Val<val{
        root.Right=insertIntoBST(root.Right,val)
    }else{
        root.Left=insertIntoBST(root.Left,val)
    }
    return root
}
```

[delete-node-in-a-bst](https://leetcode-cn.com/problems/delete-node-in-a-bst/)

> 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的  key  对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func deleteNode(root *TreeNode, key int) *TreeNode {
    // 删除节点分为三种情况：
    // 1、只有左节点 替换为右
    // 2、只有右节点 替换为左
    // 3、有左右子节点 左子节点连接到右边最左节点即可
    if root ==nil{
        return root
    }
    if root.Val<key{
        root.Right=deleteNode(root.Right,key)
    }else if root.Val>key{
        root.Left=deleteNode(root.Left,key)
    }else if root.Val==key{
        if root.Left==nil{
            return root.Right
        }else if root.Right==nil{
            return root.Left
        }else{
            cur:=root.Right
            // 一直向左找到最后一个左节点即可
            for cur.Left!=nil{
                cur=cur.Left
            }
            cur.Left=root.Left
            return root.Right
        }
    }
    return root
}
```

[balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)

> 给定一个二叉树，判断它是否是高度平衡的二叉树。

```go
type ResultType struct{
    height int
    valid bool
}
func isBalanced(root *TreeNode) bool {
    return dfs(root).valid
}
func dfs(root *TreeNode)(result ResultType){
    if root==nil{
        result.valid=true
        result.height=0
        return
    }
    left:=dfs(root.Left)
    right:=dfs(root.Right)
    // 满足所有特点：二叉搜索树&&平衡
    if left.valid&&right.valid&&abs(left.height,right.height)<=1{
        result.valid=true
    }
    result.height=Max(left.height,right.height)+1
    return
}
func abs(a,b int)int{
    if a>b{
        return a-b
    }
    return b-a
}
func Max(a,b int)int{
    if a>b{
        return a
    }
    return b
}

```

## 练习

- [ ] [validate-binary-search-tree](https://leetcode-cn.com/problems/validate-binary-search-tree/)
- [ ] [insert-into-a-binary-search-tree](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)
- [ ] [delete-node-in-a-bst](https://leetcode-cn.com/problems/delete-node-in-a-bst/)
- [ ] [balanced-binary-tree](https://leetcode-cn.com/problems/balanced-binary-tree/)
