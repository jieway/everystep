## 20. Valid Parentheses (Easy)

[Leetcode-20](https://leetcode.com/problems/valid-parentheses/description/) / [力扣-20](https://leetcode-cn.com/problems/valid-parentheses/description/)


```cpp
class Solution {
public:
    bool isValid(string s) {
        if (s.empty()) return true;
        stack<char> a;
        for(int i = 0; i < s.size();i++) {
            if (a.empty()) {
                a.push(s[i]);
            }else {
                if ((a.top() == '(' && s[i] == ')')
                ||(a.top() == '[' && s[i] == ']')
                ||(a.top() == '{' && s[i] == '}')) {
                    a.pop();
                }else {
                    a.push(s[i]);
                }
            }
        }
        return a.empty();
    }
};
```

## Java

```java
class Solution {
    public boolean isTrue(char a , char b) {
        if ((a == '(' && b == ')') || (a == '{' && b == '}') || (a == '[' && b == ']' )) {
            return true;
        }else{
            return false;
        }
    }
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        char[] a = s.toCharArray();
        for (char aa: a) {
            if (stack.isEmpty()){
                stack.push(aa);
            }else if (isTrue(stack.peek(),aa)) {
                stack.pop();
            }else{
                stack.push(aa);
            }
        }
        if (stack.isEmpty()) {
            return true;
        }
        return false;
    }
}
```