`std::make_unique` 是 C++14 标准库中引入的一个函数模板，用于创建一个 `std::unique_ptr` 智能指针。它是一个安全、方便的方法来创建动态分配的对象，同时确保这些对象的生命周期得到妥善管理。

### `std::unique_ptr` 简介

在深入 `std::make_unique` 之前，先简要了解一下 `std::unique_ptr`。`std::unique_ptr` 是一个智能指针，用于自动管理动态分配的内存。当 `std::unique_ptr` 离开其作用域时，它所指向的对象将被自动销毁（调用析构函数），内存被释放。这样可以防止内存泄漏，同时简化内存管理的复杂性。

### 使用 `std::make_unique`

`std::make_unique` 的基本用法是创建一个 `std::unique_ptr` 实例，它指向新分配的对象。例如：

```cpp
#include <memory>
#include <iostream>

class MyClass {
public:
    MyClass(int x) : x_(x) {}

    void Print() const {
        std::cout << "Value: " << x_ << std::endl;
    }

private:
    int x_;
};

int main() {
    // 使用 std::make_unique 创建 MyClass 的实例
    std::unique_ptr<MyClass> myPtr = std::make_unique<MyClass>(10);

    // 使用 -> 访问 MyClass 的成员函数
    myPtr->Print();

    // 当 myPtr 离开作用域时，它所指向的对象会被自动销毁
    return 0;
}
```

在这个例子中，`std::make_unique<MyClass>(10)` 创建了一个 `MyClass` 类型的对象，并将其初始化为 `10`。返回的 `std::unique_ptr<MyClass>` 对象 `myPtr` 管理这个新创建的对象。

### 为什么使用 `std::make_unique`

1. **安全性**：`std::make_unique` 通过自动内存管理减少了内存泄漏的风险。
2. **异常安全**：当使用 `new` 时，如果在构造函数调用之后、将指针赋给智能指针之前发生异常，可能会造成内存泄漏。`std::make_unique` 将这两个操作合并为一个原子操作，增加了代码的异常安全性。
3. **简洁性**：使用 `std::make_unique` 使代码更加简洁和清晰。

### 注意

- `std::make_unique` 是在 C++14 标准中引入的。如果你使用的是 C++11，你需要手动创建 `std::unique_ptr`。
- `std::unique_ptr` 不能被复制，只能被移动。这确保了所管理的对象有且只有一个拥有者。

## `std::make_unique` 出现之前是怎么做的？

在 `std::make_unique` 被引入 C++14 标准之前，创建一个 `std::unique_ptr` 通常需要直接使用 `new` 操作符来分配内存。然而，这种方式需要更谨慎地处理异常安全性和内存管理。

### 直接使用 `new` 示例

以下是一个没有使用 `std::make_unique` 而是直接使用 `new` 的例子：

```cpp
#include <memory>
#include <iostream>

class MyClass {
public:
    MyClass(int x) : x_(x) {}

    void Print() const {
        std::cout << "Value: " << x_ << std::endl;
    }

private:
    int x_;
};

int main() {
    // 使用 new 创建 MyClass 的实例
    std::unique_ptr<MyClass> myPtr(new MyClass(10));

    // 使用 -> 访问 MyClass 的成员函数
    myPtr->Print();

    // 当 myPtr 离开作用域时，它所指向的对象会被自动销毁
    return 0;
}
```

在这个例子中，我们直接使用 `new MyClass(10)` 来创建对象，并将其传递给 `std::unique_ptr` 的构造函数。这种方式在 C++11 和更早的版本中是标准的做法。

### 问题

虽然这种方法可行，但它有几个潜在的问题：

1. **异常安全性**：如果在 `new` 表达式和 `std::unique_ptr` 构造函数调用之间抛出异常（比如在复杂表达式中），那么已经分配的内存可能不会被释放，导致内存泄漏。

2. **冗长和易出错**：直接使用 `new` 需要书写更多的代码，这增加了出错的可能性。特别是在涉及到异常安全性时，代码需要更加小心地编写。

### `std::make_unique` 的优势

正因为这些原因，C++14 引入了 `std::make_unique`。它通过将内存分配和对象构造封装在一个函数中，简化了代码并提高了异常安全性。使用 `std::make_unique`，上述示例中的内存分配和初始化可以被安全地封装在一个原子操作中，减少了内存泄漏的风险。


