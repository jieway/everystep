在 C++ 标准模板库（STL）中，有几种常见的容器，每种都有其特定的用途和实现原理。下面是一些重要的容器及其简要介绍：

1. **向量（`std::vector`）**:
   - **用途**：动态数组，能够在尾部高效地添加或移除元素。
   - **实现**：在内存中连续存储元素，自动调整大小以容纳更多元素。当超出当前容量时，会分配一个更大的内存块，复制现有元素，并释放旧的内存。

2. **列表（`std::list`）**:
   - **用途**：双向链表，支持在任何位置快速插入和删除元素。
   - **实现**：每个元素作为独立的节点存储，每个节点有指向前一个和后一个节点的指针。

3. **双端队列（`std::deque`）**:
   - **用途**：类似于向量，但可以在头部和尾部高效添加或删除元素。
   - **实现**：通常由一系列固定大小的数组组成，用索引数组跟踪它们，从而支持快速随机访问和在两端高效操作。

4. **集合（`std::set`）**:
   - **用途**：存储唯一元素，自动按顺序排列。
   - **实现**：通常使用红黑树实现，保证元素排序和快速查找。

5. **映射（`std::map`）**:
   - **用途**：存储键值对，键是唯一的，按键排序。
   - **实现**：内部结构通常是红黑树，保证元素按键排序和高效的键值查找。

6. **无序集合（`std::unordered_set`）**:
   - **用途**：存储唯一元素，但不排序。
   - **实现**：使用哈希表，提供快速的平均时间复杂度访问。

7. **无序映射（`std::unordered_map`）**:
   - **用途**：存储键值对，但不按键排序。
   - **实现**：同样使用哈希表，提供快速的平均时间复杂度访问。

每种容器都有其优势和用途，选择合适的容器取决于具体应用的需求。例如，当需要频繁在序列中间插入或删除元素时，`std::list` 是一个好选择；而如果你需要快速随机访问元素，`std::vector` 或 `std::deque` 会更合适。对于需要排序和唯一性保证的场景，`std::set` 和 `std::map` 是理想的选择，而对于不关心排序但重视快速访问的情况，则可以考虑 `std::unordered_set` 和 `std::unordered_map`。