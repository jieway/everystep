# 在 if 语句中进行初始化

在 C++17 引入 `if` 语句的初始化器之前，初始化操作和条件检查是分开的。让我们通过比较相同功能的代码，来看看引入 `if` 语句的初始化器之前和之后的区别。

### 没有 `if` 语句的初始化器（C++17 之前）

在 C++17 之前，你通常会先执行初始化操作，然后在接下来的 `if` 语句中进行条件检查。例如：

```cpp
#include <iostream>
#include <utility>
#include <string>

std::pair<bool, std::string> performOperation() {
    // 假设这个函数执行了某种操作
    bool success = true;
    std::string message = "Operation completed successfully.";
    return {success, message};
}

int main() {
    // 首先执行初始化操作
    auto result = performOperation();
    bool success = result.first;
    std::string message = result.second;

    // 然后进行条件检查
    if (success) {
        std::cout << message << std::endl;
    } else {
        std::cout << "Operation failed: " << message << std::endl;
    }

    return 0;
}
```

在这个例子中，`performOperation()` 返回的结果首先被存储在 `result` 变量中，然后我们从中提取 `success` 和 `message`。这种方式的缺点是变量的作用域比较广，`result`, `success`, 和 `message` 在整个 `main` 函数中都是可用的，这可能不是我们想要的。

### 有 `if` 语句的初始化器（C++17 及以后）

在 C++17 中引入了 `if` 语句的初始化器，它允许在 `if` 条件表达式之前执行初始化操作。同样的功能可以这样实现：

```cpp
#include <iostream>
#include <utility>
#include <string>

std::pair<bool, std::string> performOperation() {
    // 假设这个函数执行了某种操作
    bool success = true;
    std::string message = "Operation completed successfully.";
    return {success, message};
}

int main() {
    // 使用 if 语句的初始化器
    if (auto [success, message] = performOperation(); success) {
        std::cout << message << std::endl;
    } else {
        std::cout << "Operation failed: " << message << std::endl;
    }

    return 0;
}
```

在这个例子中，通过 `if` 语句的初始化器，我们直接在 `if` 语句中进行了初始化，并将 `success` 和 `message` 的作用域限制在了 `if` 和 `else` 块内。这提高了代码的简洁性，并减少了变量的作用域，从而降低了代码出错的风险。

### 总结

`if` 语句的初始化器提供了一种更简洁的方式来组合初始化操作和条件检查，同时限制了初始化变量的作用域。这使得代码更加简洁、清晰，也更容易维护。
