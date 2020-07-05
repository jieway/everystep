# two-sum

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





# 1. 数组中两个数的和为给定值

1\. Two Sum (Easy)

[Leetcode](https://leetcode.com/problems/two-sum/description/) / [力扣](https://leetcode-cn.com/problems/two-sum/description/)

可以先对数组进行排序，然后使用双指针方法或者二分查找方法。这样做的时间复杂度为 O(NlogN)，空间复杂度为 O(1)。

用 HashMap 存储数组元素和索引的映射，在访问到 nums[i] 时，判断 HashMap 中是否存在 target - nums[i]，如果存在说明 target - nums[i] 所在的索引和 i 就是要找的两个数。该方法的时间复杂度为 O(N)，空间复杂度为 O(N)，使用空间来换取时间。

```java
public int[] twoSum(int[] nums, int target) {
    HashMap<Integer, Integer> indexForNum = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        if (indexForNum.containsKey(target - nums[i])) {
            return new int[]{indexForNum.get(target - nums[i]), i};
        } else {
            indexForNum.put(nums[i], i);
        }
    }
    return null;
}
```
