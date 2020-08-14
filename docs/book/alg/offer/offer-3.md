# 剑指 Offer 03. 数组中重复的数字

[剑指 Offer 03](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)



```cpp
class Solution {
public:
    int findRepeatNumber(vector<int>& nums) {
        int len = nums.size();
        vector<int> a(len);
        for (int i = 0; i < len; i++) {
            a[i] = 0;
        }
        for (int i = 0; i < len; i++) {
            a[nums[i]]++;
        }
        int t;
        for (int i = 0; i < len; i++) {
            if (a[i] >= 2) {
                t = i;
                break;
            }
        }
        return t;
    }
};
```

使用 set 。set 是集合，存储有序不重复的元素，底层是用红黑树实现的。时间复杂度为 $O(logN)$

insert 方法向集合中插入一个元素并判断是否是否插入成功。返回值是一个键值对（pair），由迭代器（iterator）和是否插入成功的布尔值（bool）组成。

```cpp
class Solution {
public:
    int findRepeatNumber(vector<int>& nums) {
        int len = nums.size();
        set<int> a;
        int k = -1;
        for (int i = 0; i < len; i++) {
            if (!a.insert(nums[i]).second) {
                k = nums[i];
                break;
            }
        }
        return k;
    }
};
```