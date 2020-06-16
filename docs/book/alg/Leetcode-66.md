
## 66. Plus One

[Leetcode-66](https://leetcode.com/problems/plus-one) / [力扣-66](https://leetcode-cn.com/problems/plus-one)

- 题意为提供一个数组，将这个数组中存的每一个数字看作是一个整数的每一位，也就是这个数组逆序分别是这个数字的个位，十位，百位等等。不存在零开头的数字数组。然后将这个“整数”加一。求变化后的数组。

- 首先很容易想到将数组转换成整数加一后再转化成数组，但是数组长度超过整型范围怎么办，会溢出。
- 不能通过整型来加一，那么只能在数组中实现了，特殊情况无非是结尾出现 9 加一后变成了 0 ，所以逆序遍历。一旦结尾不是 9 那么直接加一 return 即可。
- 特殊情况在于结尾的9，出现 9 就将这一位赋值成 0 ，因为进位了，而 999 这种情况进位后就变成了 1000 长度多了一位，所以需要全是 9 的情况单独拎出来。这样就写出来了。

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size()-1; i >= 0; i--) {
            if (digits[i] != 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        vector<int> r(digits.size()+1);
        r[0] = 1;
        return r;
    }
};
```
