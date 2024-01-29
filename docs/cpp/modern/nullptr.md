在C++11之前，`NULL`被用于表示空指针。`NULL`实际上是一个预处理宏，通常被定义为`0`或`((void*)0)`。使用`NULL`来表示空指针在很多情况下是有效的，但也存在一些局限性和潜在的问题。为了解决这些问题，C++11引入了`nullptr`作为空指针的标准表示。

`nullptr`是一个特殊的字面量，专门用来表示空指针。它有自己的类型`std::nullptr_t`，可以自动转换成任何类型的指针。这种设计解决了使用`NULL`的一些问题。

### 使用 `NULL` 的问题

1. **类型模糊**：`NULL`被定义为`0`，这意味着它实际上是一个整数，而不是指针。这可能导致类型推断问题，尤其是在模板和函数重载的情况下。

2. **函数重载冲突**：如果有一个接受整型参数的函数和一个接受指针参数的函数重载，使用`NULL`可能会调用错误的函数。

在面向对象的上下文中，考虑到函数重载的特性，`NULL` 和 `nullptr` 在处理空指针时的行为差异变得尤为重要。特别是当你有重载的成员函数时，这种差异会明显影响哪个函数被调用。让我们通过一个例子来说明这一点。

### 示例：使用 `NULL`

假设我们有一个类 `Printer`，它有两个重载的 `print` 方法：一个接受指针，另一个接受整数。

```cpp
#include <iostream>

class Printer {
public:
    void print(int number) {
        std::cout << "Printing number: " << number << std::endl;
    }

    void print(char* str) {
        if (str == NULL) {
            std::cout << "Printing NULL pointer" << std::endl;
        } else {
            std::cout << "Printing string: " << str << std::endl;
        }
    }
};

int main() {
    Printer printer;
    printer.print(NULL);  // 可能会调用 print(int)
}
```

在这个例子中，当我们调用 `printer.print(NULL)` 时，我们可能期望调用接受指针的 `print` 方法。然而，由于 `NULL` 被定义为 `0`，编译器将选择 `print(int)` 方法，这可能不是我们预期的行为。

### 示例：使用 `nullptr`

现在让我们看看使用 `nullptr` 如何改变情况。

```cpp
#include <iostream>

class Printer {
public:
    void print(int number) {
        std::cout << "Printing number: " << number << std::endl;
    }

    void print(char* str) {
        if (str == nullptr) {
            std::cout << "Printing nullptr" << std::endl;
        } else {
            std::cout << "Printing string: " << str << std::endl;
        }
    }
};

int main() {
    Printer printer;
    printer.print(nullptr);  // 将调用 print(char*)
}
```

在这个例子中，使用 `nullptr` 时，编译器明确地选择了 `print(char*)` 方法。这是因为 `nullptr` 的类型是 `std::nullptr_t`，它可以被自然地转换为任何类型的空指针，而不会与整数类型混淆。

### 总结

通过面向对象的例子，我们可以看到 `nullptr` 提供了一种更清晰和安全的方式来处理空指针，尤其是在函数重载的场景中。它消除了 `NULL` 可能导致的歧义，确保了代码的行为符合程序员的预期。因此，在C++11及更高版本中，推荐使用 `nullptr` 来表示空指针。