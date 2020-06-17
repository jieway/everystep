# 206. Reverse Linked List

[Leetcode-206](https://leetcode.com/problems/reverse-linked-list/) / [??-206](https://leetcode-cn.com/problems/reverse-linked-list/)

## cpp
```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode * c = NULL, *p = head;
        while (p != NULL) {
            ListNode* t = p->next;
            p->next = c;
            c = p;
            p = t;
        }
        return c;
    }
};
```

## Java

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode c = null , p = head;
        while (p != null) {
            ListNode t = p.next;
            p.next = c;
            c = p;
            p = t;
        }
        return c;
    }
}
```

## Python 

```python
    def reverseList(self, head):
        cur, prev = head,None
        while cur:
            cur.next , prev , cur = prev, cur, cur.next
        return prev
```

