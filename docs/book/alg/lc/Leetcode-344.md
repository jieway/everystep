# 344. 反转字符串

[Leetcode-344](https://leetcode.com/problems/reverse-string/) / [力扣-344](https://leetcode-cn.com/problems/reverse-string/)

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        help(0,s.size()-1,s);
    }
    void help(int a, int b,vector<char>& s) {
        if (a >= b) {
            return ;
        }
        swap(s[a],s[b]);
        help(++a,--b,s);
    }
};
```