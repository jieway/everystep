# C++20 format

`std::format` 是 C++20 引入的一个新特性，它提供了一种更现代、更安全的方式来格式化字符串。这个函数类似于 Python 中的 `str.format()` 方法或者 C语言中的 `printf`，但它更安全，因为它避免了许多 `printf` 风格的格式化函数中常见的类型不匹配和缓冲区溢出问题。

下面是一些使用 `std::format` 的例子：

### 基本用法

```cpp
#include <iostream>
#include <format>

int main() {
    std::string name = "World";
    int year = 2024;

    // 使用 {} 作为占位符
    std::string text = std::format("Hello, {}! The year is {}.", name, year);

    std::cout << text << std::endl; // 输出: Hello, World! The year is 2024.
}
```

在这个例子中，`std::format` 使用花括号 `{}` 作为占位符，可以替换为传入的参数 `name` 和 `year`。

### 指定格式

`std::format` 还允许你指定输出格式，比如数字的精度、对齐方式等。

```cpp
#include <iostream>
#include <format>

int main() {
    double pi = 3.14159265359;

    // 指定小数点后保留的位数
    std::string pi_str = std::format("Pi is {:.2f}", pi);

    std::cout << pi_str << std::endl; // 输出: Pi is 3.14
}
```

在这个例子中，`{:.2f}` 指定了浮点数的格式，`.2` 表示小数点后保留两位，而 `f` 表示固定点表示法。

### 复杂格式

`std::format` 的格式规范非常灵活，允许进行更复杂的格式化。

```cpp
#include <iostream>
#include <format>
#include <vector>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};

    // 使用循环和 std::format 进行格式化
    for (int n : numbers) {
        std::cout << std::format("Number: {:>5}\n", n);
    }
}
```

这里 `{:>5}` 表示右对齐，并保证至少有5个字符宽度。如果数字不足5位，前面会用空格填充。

### 总结

`std::format` 是一个强大且灵活的工具，它不仅提高了代码的可读性和安全性，还简化了复杂的字符串格式化操作。随着 C++20 的普及，它可能会成为格式化字符串的首选方法。