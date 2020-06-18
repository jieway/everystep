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
- 设想三个节点： head p swapPairs(); 我们要做的是交换 head 和 p 的位置，递归

```java
class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode p = head.next;
        head.next = swapPairs(p.next);
        p.next = head;
        return p;
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

