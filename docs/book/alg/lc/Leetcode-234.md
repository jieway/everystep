# 234. 回文链表

[Leetcode-234](https://leetcode.com/problems/palindrome-linked-list/) / [力扣-234](https://leetcode-cn.com/problems/palindrome-linked-list/)


## cpp

* 将链表转存到容器中，例如栈或者队列中都行。根据栈先入后出的特点，逐个比对。

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

找到链表的后半部分的开始结点，然后原地转置，再和链表的前半部分比对。

```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode* a = head , * b = head,* c = NULL;;
        while(b) {
            a = a->next;
            b = b->next ? b->next->next : b->next;
        }
        while(a) {
            ListNode* t = a->next;
            a->next = c;
            c = a;
            a = t;
        }
        ListNode* d = head;
        while(d && c) {
            if (d->val != c->val) {
                return false;
            }
            d = d->next;
            c = c->next;
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