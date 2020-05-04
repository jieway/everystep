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

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int p[110];
int main() {
    int c, n, v, w;
    cin >> c;
    while ( c-- ) {
        cin >> n >> v >> w;
        for (int i = 0; i < n; i++) {
            cin >> p[i];
        }
        double a = 0;
        int i;
        sort(p, p + n);
        for (i = 0; i < n; i++) {
            if ( (a + p[i]) / (i+1) <= w) {
                a += p[i];
            }else {
                break;
            }
        }
        if (i == 0) {
            printf("0 0.00\n");
        }else {
            printf("%d %.2lf\n", i * v, a / i / 100);
        }
    }
    return 0;
}
```

## 1.4 ❤🧡💛💙

[XYNU-1253: 磁带最大利用率问题]()

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

注意最后一个磁带，最大利用率，就剩一个位置了，如果还是按顺序的话不能保证最大的利用率，所以尽量找最大（倒序）的磁带填充进去。

```cpp
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