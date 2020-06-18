
# 234. 回文链表

[传送门](https://leetcode-cn.com/problems/palindrome-linked-list/)

## 思路
- 将链表转存到数组中进行判断。
```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        List<Integer>  list = new ArrayList<>();
        while (head != null) {
            list.add(head.val);
            head = head.next;
        }
        int i = 0;
        int length = list.size() - 1 ;
        while (i < length) {
            if (!list.get(i).equals(list.get(length))){
                return false;
            }
            i ++;
            length --;
        }
        return true;
    }
}
```
