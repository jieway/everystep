在 C++ 的标准模板库（STL）中，`map` 相关的容器主要包括 `std::map` 和 `std::unordered_map`。这两个容器在用法和内部实现上有所不同，但它们都用于存储键值对。

### `std::map`

1. **用法**:
   - `std::map` 是基于键的排序容器。它按照键值自动排序元素（默认是升序）。
   - 主要用于需要根据键快速检索值的情况。

   **示例代码**:
   ```cpp
   #include <iostream>
   #include <map>

   int main() {
       std::map<std::string, int> ageMap;
       ageMap["Alice"] = 30;
       ageMap["Bob"] = 25;
       ageMap["Charlie"] = 35;

       // 访问和打印元素
       for (const auto& pair : ageMap) {
           std::cout << pair.first << ": " << pair.second << std::endl;
       }

       return 0;
   }
   ```

2. **实现原理**:
   - `std::map` 通常是使用平衡二叉树（如红黑树）实现的。
   - 确保了键的有序性以及对元素的快速访问（平均时间复杂度为 O(log n)）。

### `std::unordered_map`

1. **用法**:
   - `std::unordered_map` 是基于哈希表的容器。它不按键排序，但提供了快速的访问速度。
   - 主要用于当键的顺序不重要时，但需要快速插入、删除和查找。

   **示例代码**:
   ```cpp
   #include <iostream>
   #include <unordered_map>

   int main() {
       std::unordered_map<std::string, int> ageMap;
       ageMap["Alice"] = 30;
       ageMap["Bob"] = 25;
       ageMap["Charlie"] = 35;

       // 访问和打印元素
       for (const auto& pair : ageMap) {
           std::cout << pair.first << ": " << pair.second << std::endl;
       }

       return 0;
   }
   ```

2. **实现原理**:
   - `std::unordered_map` 使用哈希表实现。
   - 通过对键进行哈希，然后将其存储在一个大数组中，它提供了非常快的平均访问时间（通常是 O(1)）。
   - 因为不保持元素的有序性，所以插入和删除操作通常比 `std::map` 更快。

### 总结
- 使用 `std::map` 当你需要元素按键排序时。
- 使用 `std::unordered_map` 当你需要更快的访问速度且不在乎元素的顺序时。

在实际应用中，选择哪种容器取决于你的特定需求，比如是否需要排序、对插入和删除操作的性能要求等。