# 19. 删除链表的倒数第N个节点

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

> 五个月后再次写，还是卡在了 [1] 1 这个用例上了。

此时对于 `if (l == n) return head->next;` 这条语句有了更深的体会， l 表示链表长度， n 表示倒着数想要删除节点的个数。

而 l == n 则表示删除第一个节点，那么直接返回 head->next 即可。根本原因在于后面的语句无法处理删除根节点的操作，删除一个节点需要先拿到被删除节点的前驱。所以需要先将这种情况写好。
注意不要这样写，应该设置虚拟节点，因为 n 可能正好删除的是头节点的情况。

例如这个用例：

[1,2,3,4,5] n = 5 头节点没了

快慢指针的写法，两个指针的间隔为 n ，然后同时移动始终保存为 n。

快指针跑到了末尾，那么慢指针就跑到了要删除的节点上。但是这样是无法删掉节点的，因为慢指针站在节点上。

所以需要设置哑节点，最终慢指针来到了被删除节点的前一个结点之上，一下跨两步将被删除的结点跨过去，删除成功。

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

