## 141. Linked List Cycle (Easy)

[Leetcode-141](https://leetcode.com/problems/linked-list-cycle/) / [力扣-141](https://leetcode-cn.com/problems/linked-list-cycle/)

类似于跑步，一个跑的快，一个跑的慢，二者之间存在速度差，如果存在环二者必定会相遇。

## CPP

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (head == NULL) return false;
        ListNode *a = head , *b = head->next;
        while (a != NULL && b != NULL && b->next != NULL) {
            if (a == b) return true;
            a = a->next;
            b = b->next->next;
        }
        return false;
    }
};
```

## Java

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

