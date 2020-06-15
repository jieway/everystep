## 数组

## 1.0 

[Leetcode-66](https://leetcode.com/problems/plus-one) / [力扣-66](https://leetcode-cn.com/problems/plus-one)

- 题意为提供一个数组，将这个数组中存的每一个数字看作是一个整数的每一位，也就是这个数组逆序分别是这个数字的个位，十位，百位等等。不存在零开头的数字数组。然后将这个“整数”加一。求变化后的数组。

- 首先很容易想到将数组转换成整数加一后再转化成数组，但是数组长度超过整型范围怎么办，会溢出。
- 不能通过整型来加一，那么只能在数组中实现了，特殊情况无非是结尾出现 9 加一后变成了 0 ，所以逆序遍历。一旦结尾不是 9 那么直接加一 return 即可。
- 特殊情况在于结尾的9，出现 9 就将这一位赋值成 0 ，因为进位了，而 999 这种情况进位后就变成了 1000 长度多了一位，所以需要全是 9 的情况单独拎出来。这样就写出来了。

```cpp
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] != 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        vector<int> result(digits.size() + 1);
        result[0] = 1;
        return result;
    }
};
```
- Accepted
- 109/109 cases passed (0 ms)
- Your runtime beats 100 % of cpp submissions
- Your memory usage beats 100 % of cpp submissions (6.7 MB)

## 2.0 

[Leetcode-867](https://leetcode.com/problems/transpose-matrix/) / [力扣-867](https://leetcode-cn.com/problems/transpose-matrix/)

题意：矩阵转置，也就是二维数组沿对角线变换。

```cpp
class Solution {
public:
    vector<vector<int>> transpose(vector<vector<int>>& A) {
        vector<vector<int> > a(A[0].size());
        for (int i = 0; i < A[0].size(); i++) {
            for (int j = 0; j < A.size(); j++) {
                a[i].push_back(A[j][i]);
            }
        }
        return a;
    }
};
```

## 3.0

[Leetcode-283](https://leetcode.com/problems/move-zeroes/) / [力扣-283](https://leetcode-cn.com/problems/move-zeroes/)

双指针&数组

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int j = 0;
        int n = nums.size();
        for (int i = 0; i < n; i ++) {
            if (nums[i] != 0) {
                nums[j++] = nums[i];
            }
        }
        while(j < n) {
            nums[j++] = 0;
        }
    }
};
```