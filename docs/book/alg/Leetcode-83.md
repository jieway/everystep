# 83. Remove Duplicates from Sorted List (Easy)

[Leetcode-83](https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/) / [力扣-83](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/)

已经排好序的元素去重。

扫描一遍，因为有序发现右边相等就走两步跨过去，不相等就走一步。

## cpp

c++ 没有内存回收机制，注意需要释放删除节点的内存。

```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode * a = head;
        while (a != NULL && a->next != NULL) {
            if (a->val == a->next->val) {
                ListNode *b = a->next;
                a->next = a->next->next;
                delete b;
            }else {
                a = a->next;
            }
        }
        return head;
    }
};
```

## Java

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null ) return head;
        ListNode tail = head;
        while (tail.next != null) {
            if (tail.val == tail.next.val) {
                tail.next = tail.next.next;
            }else {
                tail = tail.next;
            }
        }
        return head;
    }
}
```

- 递归写法：

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if(head == null || head.next == null){
            return head;
        }
        head.next = deleteDuplicates(head.next);
        if(head.val == head.next.val) head = head.next;
        return head;
    }
}
```


