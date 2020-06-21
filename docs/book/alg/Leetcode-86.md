

### [partition-list](https://leetcode-cn.com/problems/partition-list/)

> 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于  *x*  的节点都在大于或等于  *x*  的节点之前。

思路：将大于 x 的节点，放到另外一个链表，最后连接这两个链表

```go
func partition(head *ListNode, x int) *ListNode {
    // 思路：将大于x的节点，放到另外一个链表，最后连接这两个链表
    // check
    if head == nil {
        return head
    }
    headDummy := &ListNode{Val: 0}
    tailDummy := &ListNode{Val: 0}
    tail := tailDummy
    headDummy.Next = head
    head = headDummy
    for head.Next != nil {
        if head.Next.Val < x {
            head = head.Next
        } else {
            // 移除<x节点
            t := head.Next
            head.Next = head.Next.Next
            // 放到另外一个链表
            tail.Next = t
            tail = tail.Next
        }
    }
    // 拼接两个链表
    tail.Next = nil
    head.Next = tailDummy.Next
    return headDummy.Next
}
```

哑巴节点使用场景

> 当头节点不确定的时候，使用哑巴节点
