# 24. Swap Nodes in Pairs (Medium)

[Leetcode-24](https://leetcode.com/problems/swap-nodes-in-pairs/) / [力扣-24](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

## 递归

```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (head == NULL || head->next == NULL) {
            return head;
        }
        ListNode* a = head;
        ListNode* b = head->next;
        a->next = swapPairs(b->next);
        b->next = a;
        return b;
    }
};
```

简化版：

```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (head == NULL || head->next == NULL) {
            return head;
        }
        ListNode* t = head->next;
        head->next = swapPairs(t->next);
        t->next = head;
        return t;
    }
};
```

## 循环

```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode* a = new ListNode(0);
        a->next = head;
        ListNode* p = a;

        while (a->next != NULL && a->next->next != NULL) {
            ListNode* b = a->next;
            ListNode* c = b->next;
            ListNode* d = c->next;

            c->next = b;
            b->next = d;
            a->next = c;

            a = b;
        }
        return p->next;
    }
};
```