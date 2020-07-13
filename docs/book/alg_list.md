
# 链表

|                   题目                   | 难度  |                               总结                               |
| :--------------------------------------: | :---: | :--------------------------------------------------------------: |
| [Leetcode-160](book/alg/Leetcode-160.md) |   1   |                    双指针，找两个链表的交点。                    |
| [Leetcode-141](book/alg/Leetcode-141.md) |   1   |                       快慢指针，注意细节！                       |
|  [Leetcode-21](book/alg/Leetcode-21.md)  |   2   |    合并两个有序链表，归并排序的思想，注意思考递归写法的实现！    |
|  [Leetcode-83](book/alg/Leetcode-83.md)  |   2   |                     **模拟题**，有序链表去重                     |
|  [Leetcode-82](book/alg/Leetcode-82.md)  |   3   |             **模拟题**，上一题的加强版，无序链表去重             |
|  [Leetcode-19](book/alg/Leetcode-19.md)  |   3   | **模拟题**，可以直接遍历，也可以用**快慢指针**写，注意特殊情况。 |

| [Leetcode-206](book/alg/Leetcode-206.md) |   2   | **模拟题**，原地反装链表，迭代和递归，仔细思考递归实现 ！  |

|    [Leetcode-92](alg/Leetcode-92.md)     |   3   | 
|    [Leetcode-24](alg/Leetcode-24.md)     |  💗💗   |
|   [Leetcode-2](alg/Leetcode-2.md)   |  💗💗   |
|   [Leetcode-7](alg/Leetcode-7.md)   |  💗💗   |

## 未完！


|   [Leetcode-9](alg/Leetcode-9.md)   |  💗💗   |
|  [Leetcode-10](alg/Leetcode-10.md)  |  💗💗   |
|  [Leetcode-86](alg/Leetcode-86.md)  |  💗💗   |
| [Leetcode-148](alg/Leetcode-148.md) |  💗💗   |
| [Leetcode-143](alg/Leetcode-143.md) |  💗💗   |
| [Leetcode-141](alg/Leetcode-141.md) |  💗💗   |
| [Leetcode-142](alg/Leetcode-142.md) |  💗💗   |
| [Leetcode-234](alg/Leetcode-234.md) |  💗💗   |
| [Leetcode-138](alg/Leetcode-138.md) |  💗💗   |

# 总结

* 删除的第 n 个结点存在有两种做法：
  * 可以设置哑节点来循环 n 次拿到被删除节点的前一个结点。
  * 或者从头节点循环 n-1 拿到被删除节点的前一个结点。

* 上面的两种做法也恰恰说明了想要删除链表的某个结点必须拿到该节点的前一个结点。
* 站在被删除的结点上是无法删除当前节点的。
