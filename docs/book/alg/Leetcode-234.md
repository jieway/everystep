# 234. 回文链表

[Leetcode-234](https://leetcode.com/problems/palindrome-linked-list/) / [力扣-234](https://leetcode-cn.com/problems/palindrome-linked-list/)

* 将链表转存到容器中，例如栈或者队列中都行。根据栈先入后出的特点，逐个比对。

## cpp

```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        stack<int> s;
        ListNode * a = head;
        while (a != NULL) {
            s.push(a->val);
            a = a->next;
        }
        ListNode * b = head;
        while (b != NULL) {
            if (b->val != s.top()) {
                return false;
            }
            b = b->next;
            s.pop();
        }
        return true;
    }
};
```
## Java

```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        List<Integer>  list = new ArrayList<>();
        while (head != null) {
            list.add(head.val);
            head = head.next;
        }
        int i = 0;
        int length = list.size() - 1 ;
        while (i < length) {
            if (!list.get(i).equals(list.get(length))){
                return false;
            }
            i ++;
            length --;
        }
        return true;
    }
}
```




### [palindrome-linked-list](https://leetcode-cn.com/problems/palindrome-linked-list/)

> 请判断一个链表是否为回文链表。

```go
func isPalindrome(head *ListNode) bool {
    // 1 2 nil
    // 1 2 1 nil
    // 1 2 2 1 nil
    if head==nil{
        return true
    }
    slow:=head
    // fast如果初始化为head.Next则中点在slow.Next
    // fast初始化为head,则中点在slow
    fast:=head.Next
    for fast!=nil&&fast.Next!=nil{
        fast=fast.Next.Next
        slow=slow.Next
    }

    tail:=reverse(slow.Next)
    // 断开两个链表(需要用到中点前一个节点)
    slow.Next=nil
    for head!=nil&&tail!=nil{
        if head.Val!=tail.Val{
            return false
        }
        head=head.Next
        tail=tail.Next
    }
    return true

}

func reverse(head *ListNode)*ListNode{
    // 1->2->3
    if head==nil{
        return head
    }
    var prev *ListNode
    for head!=nil{
        t:=head.Next
        head.Next=prev
        prev=head
        head=t
    }
    return prev
}
```