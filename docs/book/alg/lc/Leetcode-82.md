# 82. 删除排序链表中的重复元素 II

[Leetcode-82](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) / [??-82](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

> 仔细梳理一下关系很容易就写出来啦！

* 创建一个**哑节点**，处理时方便。
* 再创建对于哑巴的引用 b ，用于返回。
* 然后设定两层循环，外循环用于遍历全部元素，内循环用于遍历重复的元素。
* 注意遍历时如果存在重复元素时需要将所有的元素都删掉，但是内循环只删掉了后续的元素，第一个元素留了下来。
* 可以增加一个变量 f 用来表示当前元素出现了循环，将第一个元素也删掉。

## coding

1. 先将代码的框架写好！首先设定哑节点 a 用于后续操作，再设定一个引用 b 方便后续返回。

```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* a = new ListNode(0);
        a->next = head;
        // coding
        ListNode* b = a;
        return b->next;   
    }
};
```

2. 设置两层循环，判断值重复元素是否出现，如果元素重复就跨两步，反之跨一步。但是外层循环也要前进，并且这样并没有删掉第一个元素！

```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* a = new ListNode(0);
        a->next = head;
        ListNode* b = a;
        while(a->next != NULL) {
            ListNode* c = a->next;
            while(c->next != NULL) {
                if (a->next->val == c->next->val) {
                    c->next = c->next->next;
                }else {
                    c = c->next;
                }
            }
        }
        return b->next;   
    }
};
```

3. 设置一个变量 f 用于表示当前元素是否出现了循环，如果出现循环就外层循环一次跨两步，变相的删掉了第一个重复元素。

```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* a = new ListNode(0);
        a->next = head;
        ListNode* b = a;
        while(a->next != NULL) {
            ListNode* c = a->next;
            int f = 0;
            while(c->next != NULL) {
                if (a->next->val == c->next->val) {
                    f = 1;
                    c->next = c->next->next;
                }else {
                    c = c->next;
                }
            }
            if (f) {
                a->next = a->next->next;
            }else {
                a = a->next;
            }
        }
        return b->next;   
    }
};
```

