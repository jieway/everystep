
# 680. Valid Palindrome II

[Leetcode-680](https://leetcode.com/problems/valid-palindrome-ii/) / [力扣-680](https://leetcode-cn.com/problems/valid-palindrome-ii/)

如果暴力的话需要从头扫描。但是扫过的部分已经匹配过了所以不需要再从头开始，而且看评论里面提到暴力可能会超时。

用双指针来实现，当发现左右指针不相等时只需要考虑左边跳还是有边跳即可。

本来想在一个函数中实现，思考了一下发现好像不可以，左边跳一步还是右边跳一步二者是“或”的关系。

跳完之后的部分放在一个函数中实现。

## CPP

```cpp
class Solution {
public:
    bool validPalindrome(string s) {
        int i = 0 , j = s.size() - 1;
        while (i < j) {
            if (s[i] != s[j]) {
                return (again(s, i + 1, j) || again(s,i ,j-1));
            }
            i++ , j--;
        }
        return true;
    }
    bool again(string s, int i, int j) {
        while (i < j) {
            if (s[i++] != s[j--]) {
                return false;
            } 
        }
        return true;
    }
};
```

## Java

```java
class Solution {
    
    public boolean validPalindrome(String s) {
        int i = 0 , j = s.length() - 1;
        while( i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                return (again(s , i + 1 , j) || (again(s , i , j -1)));
            }
            i++;
            j--;
        }
        return true;
    }

    public boolean again(String s ,int i, int j) {
        while(i < j) {
            if(s.charAt(i++) != s.charAt(j--)) {
                return false;
            }
        }
        return true;
    }
}
```
