## 24. Swap Nodes in Pairs (Medium)

[Leetcode-24](https://leetcode.com/problems/swap-nodes-in-pairs/) / [力扣-24](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

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