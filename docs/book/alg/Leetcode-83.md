
# 83. 删除排序链表中的重复元素
[传送门](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/)
## 题意

已经排好序的元素去重。

## 思考
扫描一遍，因为有序发现右边相等就走两步跨过去，不相等就走一步。

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


