# variant

`std::variant` 是 C++17 引入的一个类型安全的联合体。它可以存储并操作几种不同类型中的一个，类似于传统的联合体（union），但比传统联合体提供了更高的类型安全性和更方便的接口。

### 示例：使用 `std::variant` 来存储多种类型

假设我们要编写一个函数，该函数可以接受不同类型的输入（比如整数、浮点数或字符串），并根据输入的类型执行不同的操作。使用 `std::variant` 可以很方便地实现这个功能。

首先，我们定义一个 `std::variant`，它可以存储 `int`、`float` 或 `std::string` 类型的值：

```cpp
#include <iostream>
#include <variant>
#include <string>

// 定义一个可以存储 int、float 或 std::string 的 variant
using MyVariant = std::variant<int, float, std::string>;
```

接下来，我们可以定义一个函数来处理这个 `variant`：

```cpp
void processVariant(const MyVariant& v) {
    // 使用 std::visit 来访问 variant 中的值
    std::visit([](const auto& value) {
        // 打印出 variant 中存储的值的类型和值
        std::cout << "The value is: " << value << std::endl;
    }, v);
}
```

最后，在 `main` 函数中，我们可以创建不同类型的 `variant` 并使用 `processVariant` 函数：

```cpp
int main() {
    MyVariant v1 = 10;         // v1 存储 int
    MyVariant v2 = 3.14f;      // v2 存储 float
    MyVariant v3 = "hello";    // v3 存储 std::string

    processVariant(v1);
    processVariant(v2);
    processVariant(v3);

    return 0;
}
```

输出将是：

```
The value is: 10
The value is: 3.14
The value is: hello
```

在这个例子中，`std::variant` 允许我们以类型安全的方式存储和操作多种不同的数据类型。使用 `std::visit` 和 lambda 表达式可以方便地访问存储在 `variant` 中的值，并执行相应的操作。

这种方式比使用 `void*` 或联合体（`union`）更安全，因为 `std::variant` 会自动处理类型检查和类型转换，减少了出错的可能性。