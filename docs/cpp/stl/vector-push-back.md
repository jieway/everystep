`emplace_back` 和 `push_back` 都是 C++ 标准库容器 `vector` 中用来在序列末尾添加元素的成员函数，但它们在添加新元素时的行为和效率上有所不同。通过具体的例子来说明这两个函数的区别：

### push_back

`push_back` 用于在 `vector` 的末尾添加一个元素。这个元素是通过拷贝构造或移动构造的方式添加的，这意味着在调用 `push_back` 时，传递的参数必须是已经存在的对象，`vector` 将会创建这个对象的一个副本（或者在支持移动语义的情况下移动这个对象）。

#### 例子：

```cpp
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> vec;
    std::string str = "Hello";

    // 使用 push_back 添加元素
    vec.push_back(str); // 这里会调用 std::string 的拷贝构造函数
    vec.push_back(std::move(str)); // 这里会调用 std::string 的移动构造函数

    for (const auto& s : vec) {
        std::cout << s << std::endl;
    }

    return 0;
}
```

在这个例子中，第一次调用 `push_back` 时，`str` 被拷贝到 `vector` 中。第二次调用 `push_back` 时，使用 `std::move`，`str` 被移动到 `vector` 中，避免了拷贝，但之后 `str` 可能变成空的。

### emplace_back

`emplace_back` 用于在 `vector` 的末尾直接构造一个元素，避免了临时对象的创建和拷贝或移动操作。它直接在 `vector` 的存储空间中构造元素，可以接受任意数量和类型的参数，这些参数被直接传递给元素构造函数。

#### 例子：

```cpp
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> vec;

    // 使用 emplace_back 直接在 vector 中构造元素
    vec.emplace_back("Hello"); // 直接调用 std::string 的构造函数

    for (const auto& s : vec) {
        std::cout << s << std::endl;
    }

    return 0;
}
```

在这个例子中，`emplace_back` 直接在 `vector` 的末尾调用 `std::string` 的构造函数，使用给定的参数 "Hello" 构造一个新的字符串对象。这避免了创建临时对象和额外的拷贝或移动操作。

### 总结

- `push_back` 在添加元素前需要一个已经构造好的对象，然后它会复制或移动这个对象到 `vector` 中。
- `emplace_back` 可以直接在 `vector` 的存储空间中构造对象，这通常更高效，因为它省去了临时对象的创建和不必要的拷贝或移动操作。

因此，当可能的时候，推荐使用 `emplace_back`，特别是当添加到 `vector` 的对象构造成本较高或支持移动语义时。
