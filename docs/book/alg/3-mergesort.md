# 归并排序

[787. 归并排序](https://www.acwing.com/problem/content/789/)

```cpp
#include<iostream>
using namespace std;
int n;
int q[100010];
int t[100010];

void merge(int q[], int l, int r) {
    if (l >= r) return; // 漏写
    int mid = l + r >> 1;
    merge(q, l, mid);
    merge(q, mid + 1, r);
    int i = l, j = mid + 1, k = 0;
    while (i <= mid && j <= r) {
        if (q[i] <= q[j]) t[k++] = q[i++];
        else t[k++] = q[j++];
    }
    while (i <= mid) t[k++] = q[i++];
    while (j <= r) t[k++] = q[j++];
    
    for (i = l, j = 0; i <= r; i++,j++) q[i] = t[j];
    
}
int main() {
    scanf("%d", &n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &q[i]);
    }
    merge(q, 0, n-1);
    for(int i = 0; i < n; i++) {
        printf("%d ", q[i]);
    }
    return 0;
}
```

* 2022/1/1 20:57 