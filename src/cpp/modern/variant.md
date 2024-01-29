# C++17 variant

`std::variant` 是 C++17 引入的一个类型安全的联合体。它可以存储并操作几种不同类型中的一个，类似于传统的联合体（union），但比传统联合体提供了更高的类型安全性和更方便的接口。下面结合具体的例子详细对比 `std::variant` 和 `union` 。

### 1. `union` 的使用

`union` 是C++中一个较老的特性，它允许在相同的内存位置存储不同的数据类型，但一次只能存储其中一种类型的值。

#### 示例:

```cpp
#include <iostream>

union MyUnion {
    int intValue;
    float floatValue;
};

int main() {
    MyUnion u;
    u.intValue = 5;
    std::cout << "Integer value: " << u.intValue << std::endl;
    
    // 现在存储了一个float值，intValue的值将变得无效
    u.floatValue = 3.14f;
    std::cout << "Float value: " << u.floatValue << std::endl;

    return 0;
}
```

在这个例子中，`MyUnion` 能够存储一个 `int` 或一个 `float`，但不能同时存储。

### 2. `std::variant` 的使用

`std::variant` 是C++17中引入的，它是一种类型安全的 `union`，可以存储多种类型，并提供安全的访问方式。

#### 示例:

```cpp
#include <iostream>
#include <variant>

using MyVariant = std::variant<int, float>;

int main() {
    MyVariant v = 10; // 现在 v 存储了一个 int
    std::cout << std::get<int>(v) << std::endl;

    v = 3.14f; // 现在 v 存储了一个 float
    std::cout << std::get<float>(v) << std::endl;

    return 0;
}
```

在这个例子中，`MyVariant` 可以存储 `int` 或 `float` 类型的数据。不同于 `union`，`std::variant` 保留了存储的数据类型的信息，并提供了类型安全的访问。

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

### 对比

#### `std::variant` 的优势:

1. **类型安全:** `std::variant` 在存取数据时提供了类型安全，而 `union` 不提供这种保证。错误地解释 `union` 中的数据类型可能会导致未定义行为。

2. **自动类型管理:** `std::variant` 知道它当前存储的是哪种类型，而 `union` 需要外部方式来追踪当前存储的数据类型。

3. **异常安全:** 当存储的类型有非平凡的构造函数或析构函数时，`std::variant` 可以处理异常，而 `union` 不能。

#### `union` 的劣势:

1. **缺乏类型安全:** 使用 `union` 时，程序员需要确保正确地使用了当前存储的类型。不正确的使用可能导致数据损坏或未定义行为。

2. **手动类型追踪:** `union` 本身不记录它当前存储的是哪种类型的数据，因此通常需要额外的变量来追踪。

3. **受限的类型支持:** `union` 不能存储有复杂构造函数或析构函数的类型（例如，标准库中的容器类型）。

总结来说，`std::variant` 提供了比传统 `union` 更安全、更灵活的方式来处理存储多种类型的需求。尽管 `std::variant` 可能在性能和内存占用上略微不如 `union`，但其带来的类型安全和易用性在许多情况下是值得的。