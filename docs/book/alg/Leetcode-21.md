# 21. Merge Two Sorted Lists (Easy)

[Leetcode-21](https://leetcode.com/problems/merge-two-sorted-lists/) / [力扣-21](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

- 归并排序的思想。

## CPP

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;
        if (l1->val < l2->val) {
            l1->next = mergeTwoLists(l1->next, l2);
            return l1;
        }else {
            l2->next = mergeTwoLists(l1,l2->next);
            return l2;
        }
    }
};
```

## Java

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) { return l2;}
        if (l2 == null) { return l1;}
        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        }else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}
```

