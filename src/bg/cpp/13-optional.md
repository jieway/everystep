# optional

`std::optional` 是 C++17 标准库中引入的一个模板类，用于表示一个可能存在也可能不存在的值。在很多场景下，这种类型特别有用，特别是当函数需要返回一个值，但在某些情况下可能没有合适的值可返回时。

让我们通过一个具体的例子来理解 `std::optional` 的使用：

想象我们有一个函数，该函数从数据库中检索用户信息。如果找到了用户，它会返回用户的信息；如果没有找到，以前的做法可能是返回一个特殊值（比如空指针或者一个特定的错误代码），但这种方法可能导致错误的使用或者需要额外的错误检查。使用 `std::optional`，我们可以更优雅地处理这种“可能有值，也可能无值”的情况。

下面是一个示例代码：

```cpp
#include <iostream>
#include <optional>
#include <string>

// 假设的用户信息结构
struct UserInfo {
    std::string name;
    int age;
};

// 模拟的数据库查询函数
std::optional<UserInfo> getUserFromDatabase(int id) {
    // 假设我们只有ID为1的用户
    if (id == 1) {
        return UserInfo{"Alice", 30}; // 找到用户，返回信息
    } else {
        return std::nullopt; // 没找到用户，返回无值
    }
}

int main() {
    auto userInfo = getUserFromDatabase(1);
    if (userInfo) {
        // 有值时访问
        std::cout << "Name: " << userInfo->name << ", Age: " << userInfo->age << std::endl;
    } else {
        // 无值时的处理
        std::cout << "User not found." << std::endl;
    }

    return 0;
}
```

在这个例子中，`getUserFromDatabase` 函数返回一个 `std::optional<UserInfo>`。如果根据提供的 ID 找到用户，它会返回一个包含 `UserInfo` 的 `std::optional`；如果没有找到，它返回 `std::nullopt`，表示没有值。

在 `main` 函数中，我们通过检查 `std::optional` 是否有值（`if (userInfo)`）来确定是否成功获取到了用户信息。这种方式使得代码更加清晰和安全。

## 没有 optional 的时候时怎么解决这个问题的？

让我们通过一个具体的例子来理解在没有 `std::optional` 的时代是如何处理可能不存在值的情况的，并对比一下使用 `std::optional` 的优势。

### 示例：查找数组中的元素

假设我们有一个任务：在一个整数数组中查找一个特定的元素，并返回它的位置。如果元素不存在，我们需要有一种方式来表示这一点。

#### 在没有 `std::optional` 的时代

##### 方法 1: 使用特殊值

```cpp
int findElement(const std::vector<int>& data, int value) {
    for (size_t i = 0; i < data.size(); ++i) {
        if (data[i] == value) {
            return i; // 找到元素，返回索引
        }
    }
    return -1; // 用 -1 表示没有找到元素
}

// 使用示例
int position = findElement(myData, target);
if (position == -1) {
    // 未找到元素的处理
}
```

##### 方法 2: 使用输出参数和返回布尔值

```cpp
bool findElement(const std::vector<int>& data, int value, int& position) {
    for (size_t i = 0; i < data.size(); ++i) {
        if (data[i] == value) {
            position = i;
            return true; // 找到元素
        }
    }
    return false; // 没找到元素
}

// 使用示例
int position;
if (findElement(myData, target, position)) {
    // 找到元素的处理
} else {
    // 未找到元素的处理
}
```

#### 使用 `std::optional`

```cpp
std::optional<int> findElement(const std::vector<int>& data, int value) {
    for (size_t i = 0; i < data.size(); ++i) {
        if (data[i] == value) {
            return i; // 找到元素，返回索引
        }
    }
    return std::nullopt; // 没找到元素，返回无值
}

// 使用示例
auto position = findElement(myData, target);
if (position) {
    // 找到元素的处理
} else {
    // 未找到元素的处理
}
```

### `std::optional` 的优势

1. **语义清晰**：`std::optional` 明确表示值是“可选的”或“可能不存在的”，这比使用特殊值或输出参数更直观，易于理解。

2. **减少错误**：使用特殊值时，如果忘记检查这个特殊值，可能会引入bug。`std::optional` 强制调用者考虑到值可能不存在的情况。

3. **类型安全**：特殊值可能不适用于所有数据类型（例如，所有整数值都可能是有效的）。`std::optional` 提供了一种类型安全的方式来表示“无值”。

4. **更好的接口设计**：`std::optional` 使得函数的返回类型更加明确，而不是依赖于外部的引用或指针参数。

5. **标准化**：`std::optional` 是 C++ 标准的一部分，提供了跨项目的一致性和兼容性，减少了对第三方库（如 Boost）的依赖。

总的来说，`std::optional` 提供了一种更清晰、安全且现代的方式来处理那些可能不存在值的情况，改善了代码的质量和可维护性。
