

## Leetcode-202【双指针+数学】
* 💖
* [Leetcode-202](https://leetcode.com/problems/happy-number/) / [力扣-202](https://leetcode-cn.com/problems/happy-number/)

* 首先需要把整数拆分出来，拆分完成后意识到死循环的出现，想着试一下，果不其然 TLE 了，只过去了两个例子，然后将例子调出来发现是 2 ，然后我又自己试了几个例子发现死循环都经过 89 ，然后又将所有得到 89 的值排除掉，AC 了。这个不严谨，归纳出来的。

	$4 \rightarrow 16 \rightarrow 37 \rightarrow 58 \rightarrow 89 \rightarrow 145 \rightarrow 42 \rightarrow 20 \rightarrow 4$

* 看了评论区后意识到的，死循环出现的原因是出现了环，所以借助快慢指针的思想可以将这种情况调出来。也就是设置两个下标，一个下标速度快（一次走两步），一个下标速度慢（一次走一步），因为环的存在二者必定相遇。就像操场跑步，一个跑的快一个跑的慢，二者同时出发绕圈，必定会在某个位置相遇。


```cpp
class Solution {
public:
    bool isHappy(int n) {
        while (1) {
            int sum = 0;
            while (n != 0) {
                sum += (n % 10 ) * (n % 10);
                n /= 10;
            }
            if (sum == 89) {
                return false;
            }
            if (sum == 1) {
                return true;
            }
            n = sum;
        }
        return false;
    }
};
```
这个速度非常快。
```
Accepted
401/401 cases passed (0 ms)
Your runtime beats 100 % of cpp submissions
Your memory usage beats 100 % of cpp submissions (6 MB)
```
快慢指针的写法：
```cpp
class Solution {
public:
    int getNumber(int n) {
        int sum = 0;
        while (n != 0) {
            sum += (n % 10 ) * (n % 10);
            n /= 10;
        }
        return sum;
    }
    bool isHappy(int n) {
        int a = getNumber(n);
        int b = getNumber(a);
        while (a != b) {
            a = getNumber(a);
            b = getNumber(getNumber(b));
        }
        return a == 1;
    }
};
```
```
Accepted
401/401 cases passed (4 ms)
Your runtime beats 65.1 % of cpp submissions
Your memory usage beats 100 % of cpp submissions (6 MB)
```
