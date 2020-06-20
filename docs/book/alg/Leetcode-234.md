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
