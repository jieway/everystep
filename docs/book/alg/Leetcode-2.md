# 2. 两数相加

[戳我](https://leetcode-cn.com/problems/add-two-numbers/)

## 思路
链表中的每一位相加，注意进位的情况。
一共三种情况：
- 其中一条链表为空。
- 两天条链表都为空。
- 两条链表都不为空。

还要注意两个链表都扫描到最后时还要进位的情况（两个数据相加最多进一位）。

```cpp
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode pre = new ListNode(0);
        ListNode temp = pre;
        int carry = 0;
        int sum = 0;
        while (l1 != null || l2 != null) {
            int x = l1 == null ?  0 : l1.val;
            int y = l2 == null ?  0 : l2.val;
            sum = x + y + carry;
            carry = sum / 10;
            sum %= 10;
            temp.next = new ListNode(sum);
            temp = temp.next;
            if (l1!= null) {
                l1 = l1.next;
            }
            if (l2!= null) {
                l2 = l2.next;
            }
        }
        if ( carry == 1 ) {
            temp.next = new ListNode(1);
        }
        return pre.next;
    }
}
```
