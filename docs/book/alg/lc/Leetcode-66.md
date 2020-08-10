## 66. 加一

[Leetcode-66](https://leetcode.com/problems/plus-one) / [力扣-66](https://leetcode-cn.com/problems/plus-one)

分三种情况讨论。

1. 没有 9 ，例如 123， 输出为 124 .
2. 个位是 9 ，例如 129， 输出 130 .
3. 全是 9 ， 例如 999 ， 输出 1000.

规律就是识别到 9 就将其变为 0 反之自增 return 。

如果将循环遍历完了就说明全是 9 ，那么创建一个新 vector 将其首位置为 1 。

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int t = 0;
        for(int i = digits.size()-1; i >= 0; i--) {
            if (digits[i] != 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        vector<int> a(digits.size()+1);
        a[0] = 1;
        return a;
    }
};
```

另一种思路：

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for(int i = digits.size()-1; i >= 0; i--) {
            digits[i]++;
            digits[i] = digits[i]%10;
            if (digits[i] != 0) {
                return digits;
            }
        }
        vector<int> a(digits.size()+1);
        a[0] = 1;
        return a;
    }
};
```