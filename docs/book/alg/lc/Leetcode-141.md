## 141. 环形链表 (Easy)

[Leetcode-141](https://leetcode.com/problems/linked-list-cycle/) / [力扣-141](https://leetcode-cn.com/problems/linked-list-cycle/)

类似于跑步，一个跑的快，一个跑的慢，二者之间存在速度差，如果存在环二者必定会相遇。

注意先比较快慢指针的**地址**的话就不能同时出发，如果同时出发，也就是 `*b = head` 那么直接比较就会发现快慢指针相等，直接就返回 true 了。

如果在同一起点出发，可以先**前进**再**比较**，这样就避免了因为在同一起点直接比较而导致的错误返回。

循环结束的条件要么是**快指针走到了末尾**从而说明链表不循环，要么是**快慢指针相遇**说明链表存在循环。

## CPP

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        // 零个或一个结点是不可能成环！
        if (head == NULL || head->next == NULL) return false; 
        // 设置快慢指针
        ListNode *a = head , *b = head->next;
        // 
        while (b != NULL && b->next != NULL) {
            if (a == b) return true;
            a = a->next;
            b = b->next->next;
        }
        return false;
    }
};
```

如果想要在同一起点出发可以这样写：

```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if(head == NULL) return false;
        ListNode * a = head , *b = head;
        while(b != NULL && b->next != NULL) {
            a = a->next;
            b = b->next->next;
            if (a == b) {
                return true;
            }
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
    while (l2 != null && l2.next != null) {
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