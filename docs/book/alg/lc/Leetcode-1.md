# 1. 两数之和

[Leetcode-1](https://leetcode.com/problems/two-sum/submissions/) / [力扣-1](https://leetcode-cn.com/problems/two-sum/submissions/)

先暴力写一遍。两层循环枚举所有情况。时间复杂度是 

* `vector<int> a` 表示声明一个名为 a 的动态数组。
* `a.push_back()` 表示向动态数组 a 中存入变量。
* `num.size()` 返回一个整型的变量，表示动态数组的长度。

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> a;
        for (int i = 0; i < nums.size() - 1; i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    a.push_back(i);
                    a.push_back(j);
                    break;
                }
            }
        }
        return a;
    }
};
```

将元素存入map 中，扫描一遍，每次都查看 map 中是否含有差值部分。

注意 map 中存入的键是数组中存放的值，而 map 的值则是数组中值对应的下标。

如果含就直接存入 vector 中注意要现存 map 中的值，因为 i 一定大于 map 中的值，注意不要搞反！

然后如果 map 中不含有差值部分，那么就将将当前数字存入 map 中，注意起始时 map 为空。

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> hash;
        vector<int> a;
        for (int i = 0; i < nums.size(); i++) {
            int aum = target - nums[i];
            if (hash.count(aum)) {
                a.push_back(hash[aum]);
                a.push_back(i);
                break;
            }
            hash[nums[i]] = i;
        }
        return a;
    }
};
```





