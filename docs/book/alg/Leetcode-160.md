# 160. Intersection of Two Linked Lists (Easy)

[Leetcode-160](https://leetcode.com/problems/intersection-of-two-linked-lists/) / [力扣-160](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

* 暴力，两层循环，两条链重复的元素就是相交部分。

* a 链到尽头后跳到 b 链上，同理 b 链走完后再跳到 a 链上。二者走的路程相同，如果存在相交部分 `a == b` 反之，`a == NULL` `b == NULL` 所以最后返回 a/b 即可。

## CPP

```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *a = headA , *b = headB;
        while (a != b) {
            a = a == NULL ? headB : a->next;
            b = b == NULL ? headA : b->next;
        }
        return a;
    }
};
```

## Java

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode startB = headB;
        while (headA != null ) {
            while (headB != null) {
                if (headA == headB) {
                    return headA;
                }
                headB = headB.next;
            }
            headB = startB;
            headA = headA.next;
        }
        return null;
    }
}
```

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode a = headA , b = headB;
        while (a != b) {
            a = a == null ? headB : a.next;
            b = b == null ? headA : b.next;
        }
        return a;
    }
}
```

