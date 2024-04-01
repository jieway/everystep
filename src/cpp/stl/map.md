# map 和 unordered_map 的区别？

`std::map`和`std::unordered_map`都是C++标准库中的关联容器，用于存储键值对。它们的主要区别在于内部数据结构和性能特性。

### 实现原理

`std::map`：内部实现为红黑树，是一种自平衡的二叉搜索树。这意味着`std::map`中的元素是按照键的顺序排序的。插入，删除和查找操作的时间复杂度通常为O(log n)。`std::map`适合于元素需要按照顺序访问，或者需要频繁进行较低成本的查找和更新操作的场景。

`std::unordered_map`：内部实现为哈希表。这意味着元素的存储和检索是基于元素的哈希值，元素的顺序是不确定的。在理想情况下，插入，删除和查找操作的时间复杂度可以达到O(1)，但在最坏的情况下，这些操作的时间复杂度可能会达到O(n)。`std::unordered_map`适合于元素的顺序不重要，或者需要进行大量的查找操作，且哈希函数可以将元素均匀分布在哈希表中的场景。

### `std::map`

`std::map`是C++标准库中的一种关联容器，它存储的是键值对（key-value pairs），并且键是唯一的。`std::map`的内部实现通常是红黑树，这是一种自平衡的二叉搜索树。因此，`std::map`中的元素会按照键的顺序自动排序。

以下是`std::map`的一些主要特性：

1. **有序性**：`std::map`中的元素按照键的顺序存储，这是由其内部的红黑树数据结构保证的。

2. **唯一键**：`std::map`中的每个键都是唯一的。如果尝试插入一个已经存在的键，那么新的键值对将不会被插入，或者会替换旧的键值对（取决于具体的插入操作）。

3. **查找效率**：由于`std::map`的内部实现是红黑树，因此查找操作的时间复杂度是O(log n)，其中n是`std::map`中元素的数量。

4. **插入和删除效率**：插入和删除操作的时间复杂度也是O(log n)，这是由红黑树的性质决定的。

以下是一个`std::map`的使用示例：

```cpp
#include <map>
#include <string>
#include <iostream>

int main() {
    std::map<std::string, int> age_map;

    // 插入键值对
    age_map["Alice"] = 25;
    age_map["Bob"] = 30;
    age_map["Charlie"] = 35;

    // 查找并打印键值对
    for (const auto &pair : age_map) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    // 查找特定的键
    auto it = age_map.find("Bob");
    if (it != age_map.end()) {
        std::cout << "Found Bob, age: " << it->second << std::endl;
    } else {
        std::cout << "Bob not found" << std::endl;
    }

    // 删除键值对
    age_map.erase("Alice");

    return 0;
}
```

在这个示例中，我们首先创建了一个`std::map`，然后插入了几个键值对。然后，我们遍历了`std::map`并打印了所有的键值对。接着，我们查找了特定的键，并打印了对应的值。最后，我们删除了一个键值对。

### `std::unordered_map`

`std::unordered_map`是C++标准库中的一种关联容器，它存储的是键值对（key-value pairs），并且键是唯一的。`std::unordered_map`的内部实现通常是哈希表，这意味着元素的存储和检索是基于元素的哈希值，元素的顺序是不确定的。

以下是`std::unordered_map`的一些主要特性：

1. **无序性**：`std::unordered_map`中的元素不会按照键的顺序存储，而是根据哈希函数的结果存储。

2. **唯一键**：`std::unordered_map`中的每个键都是唯一的。如果尝试插入一个已经存在的键，那么新的键值对将不会被插入，或者会替换旧的键值对（取决于具体的插入操作）。

3. **查找效率**：由于`std::unordered_map`的内部实现是哈希表，因此在理想情况下，查找操作的时间复杂度是O(1)，但在最坏的情况下，这些操作的时间复杂度可能会达到O(n)。

4. **插入和删除效率**：插入和删除操作的时间复杂度在理想情况下也是O(1)，但在最坏的情况下可能会达到O(n)。

以下是一个`std::unordered_map`的使用示例：

```cpp
#include <unordered_map>
#include <string>
#include <iostream>

int main() {
    std::unordered_map<std::string, int> age_map;

    // 插入键值对
    age_map["Alice"] = 25;
    age_map["Bob"] = 30;
    age_map["Charlie"] = 35;

    // 查找并打印键值对
    for (const auto &pair : age_map) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    // 查找特定的键
    auto it = age_map.find("Bob");
    if (it != age_map.end()) {
        std::cout << "Found Bob, age: " << it->second << std::endl;
    } else {
        std::cout << "Bob not found" << std::endl;
    }

    // 删除键值对
    age_map.erase("Alice");

    return 0;
}
```

在这个示例中，我们首先创建了一个`std::unordered_map`，然后插入了几个键值对。然后，我们遍历了`std::unordered_map`并打印了所有的键值对。接着，我们查找了特定的键，并打印了对应的值。最后，我们删除了一个键值对。

### 总结
- 使用 `std::map` 当你需要元素按键排序时。
- 使用 `std::unordered_map` 当你需要更快的访问速度且不在乎元素的顺序时。

在实际应用中，选择哪种容器取决于你的特定需求，比如是否需要排序、对插入和删除操作的性能要求等。