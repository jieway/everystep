# 19. Remove Nth Node From End of List (Medium)

[Leetcode-19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) / [力扣-19](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)
 
- 两次遍历，删除对应节点。
- 设置快慢指针，间隔为 n 快指针爬到末尾删除慢指针的下一个节点。

## CPP


这个是最直接的思路，先得到链表的长度，注意这个例子：[1] n = 1  除此之外需要跑到待删除链表的前一个链表上，因为跑到待删除的链表上无法将其删除掉。

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        int l = 0;
        ListNode *t = head;
        while (t != NULL) {
            t = t->next;
            l++;
        }
        if (l == n) return head->next;
        int m = l - n - 1; 
        ListNode *b = head;
        while(m--) {
            b = b->next;
        }
        b->next = b->next->next;
        return head;
    }
};
```

注意不要这样写，应该设置虚拟节点，因为 n 可能正好删除的是头节点的情况。

例如这个用例：

[1,2,3,4,5] n = 5 头节点没了


```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *a = head;
        ListNode *b = new ListNode(0);
        b->next = head;
        while (n--) {
            a = a->next;
        }
        if (a == NULL) return a->next;
        while (a != NULL) {
            a = a->next;
            b = b->next;
        }
        b->next = b->next->next;
        return head;
    }
};
```

这个写的就复杂了，在纸上画一下就明白了。

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *t = new ListNode(0);
        t->next = head;
        ListNode *a = t;
        ListNode *b = new ListNode(0);
        b->next = t;
        while (n--) {
            a = a->next;
        }
        if (a == NULL) return a->next;
        while (a != NULL) {
            a = a->next;
            b = b->next;
        }
        b->next = b->next->next;
        return t->next;
    }
};
```


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

