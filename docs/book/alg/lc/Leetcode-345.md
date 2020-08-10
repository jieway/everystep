## 345. 反转字符串中的元音字母

[Leetcode-345](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/) / [力扣-345](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

设置一个集合，判断里面是否存在元音，也可以设置一个函数。

```cpp
class Solution {
public:
    string reverseVowels(string s) {
        int i = 0 , j = s.size() - 1;
        while (i < j) {
            if (!isVowel(s[i])) {
                i++;
            } else if (!isVowel(s[j])) {
                j--;
            }else {
                swap(s[i++],s[j--]);
            }
        }
        return s;
    }
    bool isVowel(char a) {
        if (a == 'a' || a == 'A' 
        || a == 'e' || a == 'E'
        || a == 'i' || a == 'I'
        || a == 'o' || a == 'O'
        || a == 'u' || a == 'U'
        ) {
            return true;
        }
        return false;
    }
};
```

注意 Java 的 String 数据类型是不可变的，也就是不能在原地址上修改。

查看源码可知其内部的实现本质上是维护了一个字符数组（private final char value[];），此数组是私有的且改数组没有提供 set/get 方法，所以无法在原有数组上修改。但是存在里面存在了一些像 substring， replace 的方法，可以修改值，当然也可以用还可以用反射来修改，重点是算法，此处不再讨论。

[这个回答解释的很好](https://www.zhihu.com/question/20618891)

```java
class Solution {
    private final static HashSet<Character> vowels = new HashSet<>(
        Arrays.asList('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'));
    public String reverseVowels(String s) {
        if (s == null) return null;
        int i = 0 , j = s.length() - 1;
        char[]a = new char[s.length()];
        while (i <= j) {
            char ii = s.charAt(i);
            char jj = s.charAt(j);
            if (!vowels.contains(ii)) { 
                a[i++] = ii;
            }else if(!vowels.contains(jj)) {
                a[j--] = jj;
            }else {
                a[i++] = jj;
                a[j--] = ii;
            }
        }
        return new String(a);
    }
}
```
