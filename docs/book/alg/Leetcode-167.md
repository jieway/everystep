## 167. Two Sum II - Input array is sorted

[leetcode-167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) / [力扣-167]([leetcode-167](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/))

因为数组升序，如果值小，右边的下标就减减，反之左边的值就加加。

暴力解法如下，直接枚举即可，但是会超时！

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        vector<int> a;
        for (int  i = 0; i < numbers.size() - 1; i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers[i] + numbers[j] == target) {
                    a.push_back(i+1);
                    a.push_back(j+1);
                }
            }
        }
        return a;
    }
};
```

双指针法，设置首位两个指针，因为数组升序所以首指针前进的话两个值的和会增加，反之尾指针后退的话值会减少。所以扫面一遍即可。

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int i = 0, j = numbers.size() - 1;
        vector<int> a;
        while(i < j) {
            int sum = numbers[i] + numbers[j];
            if (sum == target) {
                a.push_back(i+1);
                a.push_back(j+1);
                return a;
            }else if (sum > target) {
                j--;
            }else if (sum < target) {
                i++;
            }
        }
        return a;
    }
};
```

Java 版 

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        if(numbers == null )  return null;
        int index1 = 0 , index2 = numbers.length - 1;
        while(index1 < index2) {
            int temp = numbers[index1] + numbers[index2];
            if ( temp == target) {
                return new int[]{ index1 + 1 , index2 + 1 };
            }else if (temp < target) {
                index1++;
            }else {
                index2--;
            }
        }
        return null;
    }
}
```