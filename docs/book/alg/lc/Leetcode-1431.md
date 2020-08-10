# 1431. 拥有最多糖果的孩子

[Leetcode-1431](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/) / [力扣-1431](https://leetcode-cn.com/problems/kids-with-the-greatest-number-of-candies/)

```cpp
class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        vector<bool> kids(candies.size());
        int m = 0;
        for (int i = 0; i < candies.size(); i++) {
            kids[i] = false;
            m = max(m,candies[i]);
            candies[i] += extraCandies;
        }
        for (int i = 0; i < candies.size(); i++) {
            if (candies[i] >= m) {
                kids[i] = true;
            }
        }
        return kids;
    }
};
```