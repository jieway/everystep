# 第五章

# 概述
基本概念：
* 串：字符串，由零个或多个字符组成的有限序列。
* 串长：串中字符的个数。
* 空串：串长为零的串。
* 子串：串中任意个连续字符组成的子序列。而原串是该串的主串。

空格也是也算字符。空格串则是全部由空格组成的字符串。空串是没有字符，于空格串不同。

在存储字符串是时候以 `\0` 结尾表示字符串的结束，但是这个字符不在字符串长度内。

字符串的存储方式也有顺序存储和链式存储两种。但是更多的还是采用顺序存储，索引方便。

# 模式匹配算法

模式匹配就是子串的定位运算，也成为串匹配。例如有两个串 S，T，其中 S 为主串，T 为子串，也称为模式。在主串 S 中查找与模式 T 项匹配的子串，如果查找成功就返回子串第一个字符在主串中的位置。

比较直观的想法就是暴力，不断枚举。发现相同就继续比较，不同的话就回溯再比较，也就是 BF 算法。

# BF 算法
BF 即 Brute Force 也就是蛮力算法。如果不清楚可以按照下面的测试数据，拿笔画一遍就明白了。注意下标从 0 开始。
* abaabaabeca 
* abaabe 
* 3

直观的写法：

```cpp
int bf(string a, string b) {
    int m = a.length();
    int n = b.length();
    for (int i = 0; i <= m-n; i++) {
        int j;
        for (j = 0; j < n; j++) {
            if (a[i+j] != b[j]) {
                break;
            }
        }
        if (j == n) {
            return i;
        }
    }
    return m;
}
```
这是另一个写法，可以看出 `i = i - j + 1` 如果不匹配就后退，说明 i 在后退，后续的 KMP 则是在这个框架的基础上使得 i 不后退。

```cpp
int bf(string a, string b) {
    int i = 0;
    int j = 0;
    while (i < a.length() && j < b.length()) {
        if (a[i] == b[j]) {
            i++;
            j++;
        }else {
            i = i - j + 1;
            j = 0;
        }
    }
    if (j == b.length()) {
        return i - b.length();
    }else {
        return 0;
    }
}
```

暴力最坏的情况就是 长度为 m 的主串没进一步都需要比较 n 次，最多进 m - n +1 ，所以时间复杂度是 $O(m*n)$ 

# KMP 算法
BF 算法存在回溯，起始可以不需要回溯，KMP 算法就是一路走到底，不回头。下标 i 不会减少，一旦不匹配之时通过减少 j 来实现重新比对。

```cpp
int KmpSearch(char* s, char* p)  
{  
    int i = 0;  
    int j = 0;  
    int sLen = strlen(s);  
    int pLen = strlen(p);  
    while (i < sLen && j < pLen)  
    {  
        if (j == -1 || s[i] == p[j])  
        {  
            i++;  
            j++;  
        }  
        else  
        {  
            j = next[j];  
        }  
    }  
    if (j == pLen)  
        return i - j;  
    else  
        return -1;  
}  
```
```cpp
void GetNext(char* p,int next[])  
{  
    int pLen = strlen(p);  
    next[0] = -1;  
    int k = -1;  
    int j = 0;  
    while (j < pLen - 1)  
    {  
        if (k == -1 || p[j] == p[k])   
        {  
            next[++j] = ++k;
        }  
        else   
        {  
            k = next[k];  
        }  
    }  
}
```

# 改进 KMP 算法

# 应用


