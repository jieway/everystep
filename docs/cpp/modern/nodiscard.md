# C++17 nodiscard

`[[nodiscard]]` 是 C++17 引入的一个属性，用于指示函数的返回值不应被忽略。当一个函数被标记为 `[[nodiscard]]`，如果调用该函数但不使用其返回值，编译器将发出警告或错误。这对于那些返回值表示状态、错误或对程序逻辑至关重要的函数特别有用。

### 使用场景

#### 1. 错误状态检查

对于那些返回错误码或状态的函数，使用 `[[nodiscard]]` 可以确保调用者检查这些返回值，从而避免错误被忽视。

```cpp
#include <iostream>
#include <vector>

[[nodiscard]] bool insertIntoDatabase(const std::vector<int>& data) {
    if (data.empty()) {
        std::cerr << "Error: Data is empty." << std::endl;
        return false;
    }
    // 插入数据到数据库...
    return true;
}

int main() {
    std::vector<int> myData;

    // 假设忽略了函数返回值
    insertIntoDatabase(myData); // 编译器将发出警告

    // 正确的做法
    if (!insertIntoDatabase(myData)) {
        // 处理错误
    }

    return 0;
}
```

#### 2. 重要的返回值

当函数返回的值对程序的后续逻辑至关重要时，使用 `[[nodiscard]]` 可以避免调用者无意中忽略这些值。

```cpp
#include <memory>

class MyClass {};

[[nodiscard]] std::unique_ptr<MyClass> createMyClass() {
    return std::make_unique<MyClass>();
}

int main() {
    createMyClass(); // 这将导致编译器警告，因为创建的对象没有被使用

    auto myObject = createMyClass(); // 正确使用

    return 0;
}
```

#### 3. 提高代码清晰度和安全性

`[[nodiscard]]` 也可以用于那些虽然不返回错误状态，但其返回值非常重要的函数。这强制程序员显式地处理返回值，从而提高代码清晰度和安全性。

```cpp
#include <vector>

[[nodiscard]] std::vector<int>::iterator findValue(std::vector<int>& vec, int value) {
    return std::find(vec.begin(), vec.end(), value);
}

int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5};

    findValue(vec, 3); // 编译器警告，因为没有使用返回的迭代器

    auto it = findValue(vec, 3); // 正确处理返回值
    if (it != vec.end()) {
        // 找到值，进行处理
    }

    return 0;
}
```

### 总结

`[[nodiscard]]` 属性是一个强大的工具，它通过确保关键函数的返回值不被忽视，来帮助提高代码的可靠性和清晰度。通过在函数声明中使用这个属性，可以引导程序员更加谨慎地处理那些可能影响程序正确性的返回值。