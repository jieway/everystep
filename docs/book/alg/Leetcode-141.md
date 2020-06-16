## 6.0 💗🧡💛

[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

简而言之，就像跑步，一个跑的快，一个跑的慢，二者之间存在速度差，如果存在环二者必定会相遇。

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
    if (head == null) {
        return false;
    }
    ListNode l1 = head, l2 = head.next;
    while (l1 != null && l2 != null && l2.next != null) {
        if (l1 == l2) {
            return true;
        }
        l1 = l1.next;
        l2 = l2.next.next;
    }
    return false;
    }
}
```

