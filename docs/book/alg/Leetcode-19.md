
# 19. Remove Nth Node From End of List (Medium)

[Leetcode-19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) / [力扣-19](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)
 
- 两次遍历，删除对应节点。
- 设置快慢指针，间隔为 n 快指针爬到末尾删除慢指针的下一个节点。

## CPP



## Java

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode fast = head;
        ListNode slow = head;
        while ( n -- > 0 ) {
            fast = fast.next;
        }
        if ( fast == null ) {return head.next;}
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return head;
    }
}
```

