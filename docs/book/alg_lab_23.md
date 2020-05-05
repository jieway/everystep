# 最短路


## 背景

* 两地的最短距离，这个很容易理解。

## 注意
* 最短路不唯一，可能存在多条。


# Dijkstra

不能解决权重为负的情况。

# 最短路径
# 最短路径例题
## HDU2544最短路（dijkstral）


```c++
#include<iostream>
#include<cstring>
#define max_size 110//数组不要开太大，第一次没仔细看开了10010，然后内存超限 
#define inf 0x3f3f3f3f 
using namespace std; 
int map[max_size][max_size];
int dijkstral(int start,int end,int n){
	int dis[max_size],min,next;
	bool flag[max_size];
	memset(dis,0x3f,sizeof(dis));
	memset(flag,false,sizeof(flag));
	dis [start] = 0;
	for(int index = start; index != -1 ; index = next){
		flag [index] = true;
		min = inf;
		next = -1;
		for(int i = 1;i <= n;i++){
			if(dis[i] > map[index][i] + dis[index]){
				dis[i] = map[index][i] + dis [index];
			}
			if(!flag[i] && dis[i] < min){
				min  = dis[i];
				next = i;
			}
		}
		}
		if(dis[end] == inf){
			return -1;
		}
		return dis[end];
	}
	int main(){
		int N,M,a,b,c;
		while(cin>> N >> M && N!=0 && M!=0){
			memset(map,0x3f,sizeof(map));
			for ( int i= 1 ; i <= M ; i++){
				cin >> a >> b >> c ;
				if(a==b){ 
				map [a][b] = 0;
				}
				else {
				map [a][b] = min(map[a][b],c);
				map [b][a] = min(map[b][a],c);				
				}
			}
			cout<<dijkstral(1,N,N)<<endl;
		}
		return 0;
	} 
```
