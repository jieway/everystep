# 206. 反转链表

[Leetcode-206](https://leetcode.com/problems/reverse-linked-list/) / [力扣-206](https://leetcode-cn.com/problems/reverse-linked-list/)

## cpp

迭代写法：

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode * c = NULL, *p = head; 
        while (p != NULL) {
            ListNode* t = p->next; // 临时保存后续结点
            p->next = c; // 将当前结点和 c 联系起来。
            c = p; 
            p = t;
        }
        return c;
    }
};
```

递归写法：

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (head == NULL || head->next == NULL) return head;
        ListNode* t = head->next;
        head->next = reverseList(t->next);
        t->next = head;
        return t; 
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

