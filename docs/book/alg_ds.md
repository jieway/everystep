
  * [哈希表](alg_lab_26.md)
  * [位运算](alg_lab_29.md)

# 栈

## 💗

括号配对问题

[Leetcode-20](https://leetcode.com/problems/valid-parentheses/) / [力扣-20](https://leetcode-cn.com/problems/valid-parentheses)

[Leet](https://leetcode-cn.com/problems/hanota-lcci/)

[Leetcode-150](https://leetcode.com/problems/evaluate-reverse-polish-notation/) / [力扣-150](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

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
