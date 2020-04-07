

# 160. 相交链表

[传送门](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

## 题意
两个链表存在相加部分，找到相交点并输出。
## 思路

- 两层循环，发现地址相等就是相交的部分。

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

- 由 A 链跳转到 B 链，二者走的路程相等，虽然起点不同但是终点相同。如果没有交点的话 a 和 b 最终都为 null ，循环也结束。

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
# 206. 反转链表

[传送门](https://leetcode-cn.com/problems/reverse-linked-list/)

## 题意
将链表顺序反转。
## 思路

- 头插法

![如图](链表/swaphead.png)

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode tail = null;
        ListNode temp = null;
        while (head != null) {
            temp = head;
            temp.next = tail;
            tail = temp;
            head = head.next;
        }
        return tail;
    }
}
```

- 递归

![](链表/递归.gif)

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode p = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return p;
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

# 21. 合并两个有序链表

[传送门](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
## 题意
将两个链表按顺序合并成一个链表。
## 思路

- 归并排序的思想。

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


# 19. 删除链表的倒数第N个节点
[传送门](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)
## 题意
如题，注意倒数，如果超出就删除最后一个。
## 思路
- 设置快慢指针，间隔为 n 快指针爬到末尾删除慢指针的下一个节点。

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

# 234. 回文链表

[传送门](https://leetcode-cn.com/problems/palindrome-linked-list/)

## 思路
- 将链表转存到数组中进行判断。
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

# 2. 两数相加
[戳我](https://leetcode-cn.com/problems/add-two-numbers/)
## 思路
链表中的每一位相加，注意进位的情况。
一共三种情况：
- 其中一条链表为空。
- 两天条链表都为空。
- 两条链表都不为空。

还要注意两个链表都扫描到最后时还要进位的情况（两个数据相加最多进一位）。

```cpp
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode pre = new ListNode(0);
        ListNode temp = pre;
        int carry = 0;
        int sum = 0;
        while (l1 != null || l2 != null) {
            int x = l1 == null ?  0 : l1.val;
            int y = l2 == null ?  0 : l2.val;
            sum = x + y + carry;
            carry = sum / 10;
            sum %= 10;
            temp.next = new ListNode(sum);
            temp = temp.next;
            if (l1!= null) {
                l1 = l1.next;
            }
            if (l2!= null) {
                l2 = l2.next;
            }
        }
        if ( carry == 1 ) {
            temp.next = new ListNode(1);
        }
        return pre.next;
    }
}
```

