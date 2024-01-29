在 C++ 的标准模板库（STL）中，特别是在如 `std::vector` 这样的动态数组容器中，`resize` 和 `reserve` 是两个用于调整容器大小的重要函数，但它们的用途和行为有显著的不同。

### `resize`

`resize` 函数改变容器中元素的数量。如果新的大小大于当前大小，将添加新的元素。如果新的大小小于当前大小，多余的元素将被删除。

- **增加大小**：新添加的元素会被初始化（如果提供了初始化值，则使用该值，否则使用默认构造）。
- **减少大小**：超出新大小的元素会被销毁。

#### 示例：使用 `resize`

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec = {1, 2, 3};

    // 增加 vec 的大小到 5
    vec.resize(5); // 新增元素初始化为 0

    for (int i : vec) {
        std::cout << i << " "; // 输出: 1 2 3 0 0
    }
    std::cout << std::endl;

    // 减少 vec 的大小到 2
    vec.resize(2);

    for (int i : vec) {
        std::cout << i << " "; // 输出: 1 2
    }
    std::cout << std::endl;

    return 0;
}
```

### `reserve`

`reserve` 函数用于改变容器的容量，即容器可以在重新分配之前保存多少元素。这个函数不改变容器中元素的数量，而是预分配足够的内存空间以容纳指定数量的元素。

- **避免重新分配**：当你知道将要在容器中添加许多元素时，使用 `reserve` 可以减少多次内存分配。
- **不影响容器大小**：它不会改变容器中元素的数量。

#### 示例：使用 `reserve`

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> vec;

    // 预分配空间以容纳至少 5 个元素
    vec.reserve(5);

    std::cout << "Capacity: " << vec.capacity() << std::endl; // 输出: 5

    // 添加三个元素
    vec.push_back(1);
    vec.push_back(2);
    vec.push_back(3);

    std::cout << "Size: " << vec.size() << std::endl; // 输出: 3
    std::cout << "Capacity: " << vec.capacity() << std::endl; // 输出: 5

    return 0;
}
```

### 区别

现在来看`resize`和`reserve`的区别：

1. `resize`既分配了空间，也创建了对象，而`reserve`表示容器预留空间，但并不真正创建对象，需要通过`insert()`或`push_back()`等操作来创建对象。

2. `resize`既修改了`capacity`大小，也修改了`size`大小；而`reserve`只修改了`capacity`大小，不修改`size`大小。`capacity` 指容器能够容纳的最大元素个数，`size` 指容器中实际的元素个数。

3. 形参个数不同：`resize`带两个参数，一个表示容器大小，一个表示初始值（默认为0）；`reserve`只带一个参数，表示容器预留的大小。

具体例子代码：

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a;
    cout << "initial capacity: " << a.capacity() << endl;
    cout << "initial size: " << a.size() << endl;

    // 使用resize改变capacity和size
    a.resize(20);
    cout << "resize capacity: " << a.capacity() << endl;
    cout << "resize size: " << a.size() << endl;

    vector<int> b;
    // 使用reserve改变capacity，但不改变size
    b.reserve(100);
    cout << "reserve capacity: " << b.capacity() << endl;
    cout << "reserve size: " << b.size() << endl;

    return 0;
}
```

运行结果：

```
initial capacity: 0
initial size: 0
resize capacity: 20
resize size: 20
reserve capacity: 100
reserve size: 0
```

注意：如果`resize`或`reserve`的参数`n`大于当前的vector的容量，会引起自动内存分配，导致已有的指针、引用和迭代器失效，并且内存的重新配置可能耗费较多时间。

### 使用场景

`resize` 和 `reserve` 在C++ STL中用于管理动态数组大小，它们有不同的使用场景：

1. **resize 的使用场景：**
   - 当你想要改变数组的大小，并且需要初始化或清除元素时，可以使用 `resize`。
   - 例如，当你需要确保数组的大小达到某个值，并希望用默认值或特定值填充数组时，可以使用 `resize`。

     ```cpp
     std::vector<int> myVector;
     myVector.resize(10); // 将数组大小改为10，并用默认值填充
     ```

2. **reserve 的使用场景：**
   - 当你预先知道数组可能达到的最大大小时，可以使用 `reserve` 来预留空间，以避免多次重新分配内存。
   - 例如，在循环中逐步添加元素，但你知道循环结束后数组的最终大小，可以使用 `reserve` 避免多次动态分配。

     ```cpp
     std::vector<int> myVector;
     myVector.reserve(100); // 预留至少能容纳100个元素的空间
     for (int i = 0; i < 100; ++i) {
         myVector.push_back(i);
     }
     ```

总的来说，`resize` 用于改变数组大小并初始化/清除元素，而 `reserve` 用于在预先知道最大可能大小的情况下避免多次内存重新分配。选择使用哪个函数取决于你的需求和对数组操作的具体要求。

### 总结

- **`resize`** 改变容器中元素的数量，可以增加或减少容器的大小。
- **`reserve`** 改变容器可以容纳元素的数量（容量），但不改变当前元素的数量。它用于优化内存分配，避免在添加新元素时重复分配内存。