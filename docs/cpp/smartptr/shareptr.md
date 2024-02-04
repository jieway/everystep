`shared_ptr` 是 C++ 标准库中的智能指针之一，用于管理动态分配的内存。它的主要特点是允许多个智能指针共享同一个堆内存对象，使用引用计数来跟踪对象的所有者数量，当最后一个 `shared_ptr` 离开作用域时，释放对象的内存，从而避免内存泄漏。这种共享所有权的机制使其适用于多个部分需要共享相同资源的情况，例如在多个对象之间共享同一个对象或资源。`shared_ptr` 可以通过 `std::make_shared` 或 `std::shared_ptr` 构造函数来创建。

### `shared_ptr`和`unique_ptr` 的区别？

C++中的`shared_ptr`和`unique_ptr`是智能指针，用于管理动态分配的内存，以避免内存泄漏和资源泄漏。它们之间的主要区别在于所有权管理和性能。

1. `shared_ptr`：
   - `shared_ptr`允许多个智能指针共享同一个堆内存对象。它们使用引用计数来跟踪对象的所有者数量，并在最后一个`shared_ptr`离开作用域时释放对象的内存。
   - 适用于多个部分需要共享相同资源的情况，例如在多个对象之间共享同一个对象或资源。
   - 使用`std::make_shared`或`std::shared_ptr`构造函数来创建`shared_ptr`。

示例：

```cpp
#include <memory>

int main() {
    std::shared_ptr<int> shared1 = std::make_shared<int>(42);
    std::shared_ptr<int> shared2 = shared1;  // 多个shared_ptr共享同一个int对象
    // 当shared1和shared2离开作用域时，int对象才会被销毁
    return 0;
}
```

2. `unique_ptr`：
   - `unique_ptr`表示独占所有权，只有一个指针可以拥有它指向的对象。当`unique_ptr`离开作用域时，它所拥有的对象会被销毁。
   - 适用于需要确保只有一个部分拥有资源的情况，例如资源管理类。
   - 使用`std::make_unique`或`std::unique_ptr`构造函数来创建`unique_ptr`。

示例：

```cpp
#include <memory>

int main() {
    std::unique_ptr<int> unique1 = std::make_unique<int>(42);
    // std::unique_ptr<int> unique2 = unique1;  // 错误，unique_ptr不支持复制构造
    // 当unique1离开作用域时，int对象会被销毁
    return 0;
}
```

总结：

- `shared_ptr`允许多个指针共享同一资源，适用于共享所有权的情况，但引入了引用计数的开销。
- `unique_ptr`提供了独占所有权，适用于需要确保资源独占的情况，具有更轻量级的性能开销。
- 在选择`shared_ptr`和`unique_ptr`之间时，根据您的需求和设计目标来决定哪一个更合适。

接下来实现了一个简单的共享指针（`SharedPtr`），这是一种智能指针，用于自动管理资源（如动态分配的内存），以防止内存泄漏。共享指针的核心特性是它维护了一个引用计数，当没有任何共享指针指向某个资源时，该资源会被自动释放。我们将逐步分析这个实现。

### 基本结构

#### 类模板 `SharedPtr`

- `template <typename T>`：`SharedPtr`是一个类模板，可以用于任何类型 `T`。
- 私有成员变量：
  - `T* _p`：原始指针，指向管理的资源。
  - `int* _count`：指向引用计数的指针。

#### 构造函数

- 默认构造函数：初始化 `_p` 为 `nullptr`，引用计数为 0。
- 参数化构造函数：接受一个原始指针 `T* p`，初始化 `_p` 为 `p`，引用计数设为 1。

#### 拷贝构造函数

- 当一个新的 `SharedPtr` 通过拷贝另一个 `SharedPtr` 创建时，它们共享同一资源，并且引用计数增加。

#### 赋值运算符

- 当一个 `SharedPtr` 被赋予另一个 `SharedPtr` 的值时，它会先减少原有资源的引用计数，必要时释放资源，然后共享新资源并增加引用计数。

#### 析构函数

- 当 `SharedPtr` 对象销毁时，减少引用计数，必要时释放资源。

#### 成员函数

- `get()`：返回原始指针。
- `operator*` 和 `operator->`：允许通过 `SharedPtr` 直接访问资源。
- `explicit operator bool()`：允许 `SharedPtr` 在布尔上下文中使用，比如在 `if` 语句中。
- `use_count()`：返回引用计数。
- `reset()`：重置 `SharedPtr`，可更换管理的资源或者放弃当前资源。

#### `make_shared` 函数模板

- 这个函数模板创建一个新的 `T` 类型的对象，并返回一个管理它的 `SharedPtr`。

### 代码细节

1. **引用计数的管理**：引用计数是管理资源生命周期的关键。当一个 `SharedPtr` 指向一个资源时，计数增加；当不再指向时，计数减少。如果计数降至零，资源被释放。

2. **自我赋值的安全性**：赋值操作符考虑到了自我赋值的情况，首先检查赋值对象是否是自身。

3. **内存管理**：通过 `new` 和 `delete` 管理内存。当资源不再被任何 `SharedPtr` 指向时，使用 `delete` 释放资源。

4. **转发构造函数参数**：`make_shared` 使用完美转发 (`std::forward`) 来构造对象，这意味着它可以正确处理不同类型的参数，包括左值和右值。

### 使用场景

`SharedPtr` 适用于多个对象需要共享对同一个资源的所有权的场景。它自动处理资源的生命周期，避免了内存泄漏的风险，尤其是在异常抛出或复杂控制流程中。

接下来结合代码，从最基础的实现开始逐步讲解 `SharedPtr` 类的功能和实现。

### 最小实现

下面是一个简洁的版本，提供了 `SharedPtr` 的接口，具体功能还未实现。

```cpp
#ifndef SHARED_PTR
#define SHARED_PTR

#include <iostream>

template <typename T>
class SharedPtr {
private:
    T* _p;  // 原始指针
    int* _count;  // 引用计数

public:
    // 默认构造函数
    SharedPtr() : _p(nullptr), _count(new int(0)) {}

    // 构造函数
    explicit SharedPtr(T* p) : _p(p), _count(new int(1)) {}

    // 拷贝构造函数
    SharedPtr(const SharedPtr& other) : _p(other._p), _count(other._count) {}

    // 赋值运算符
    SharedPtr& operator=(const SharedPtr& other) {}

    // 析构函数
    ~SharedPtr() {}

    // 返回原始指针
    T* get() const {}

    // 重载解引用操作符 *
    T& operator*() const {}

    // 重载箭头操作符
    T* operator->() const {}

    // 提供隐式类型转换到 bool
    explicit operator bool() const {}

    // 返回引用计数
    int use_count() const {}

    // 重置指针
    void reset(T* p = nullptr) {}
};

// make_shared 函数实现
template <typename T, typename... Args>
SharedPtr<T> make_shared(Args&&... args) {
    return SharedPtr<T>(new T(std::forward<Args>(args)...));
}

#endif //SHARED_PTR
```

### 为什么直接存储引用计数不行？

假设我们不使用指针来共享引用计数，而是在每个`SharedPtr`实例中直接存储一个引用计数的值。这样的设计会导致每次复制`SharedPtr`时，引用计数也被复制，而不是被共享。这会导致每个`SharedPtr`实例都认为自己是唯一指向资源的所有者，从而无法正确管理资源的生命周期。

### 具体例子

考虑以下示例，我们首先定义一个错误的`SharedPtr`实现，不使用指针来共享引用计数：

```cpp
template<typename T>
class BadSharedPtr {
private:
    T* _p; // 原始指针
    int _count; // 引用计数（错误地直接存储，没有使用指针）

public:
    explicit BadSharedPtr(T* p = nullptr) : _p(p), _count(1) {}

    // 拷贝构造函数
    BadSharedPtr(const BadSharedPtr& other) : _p(other._p), _count(other._count + 1) {}

    // 析构函数
    ~BadSharedPtr() {
        if (--_count == 0) {
            delete _p;
        }
    }

    // 省略其他必要的函数实现
};
```

在这个错误的实现中，每个`BadSharedPtr`都有自己的`_count`成员，存储着对应资源的引用计数。

**现在，我们使用`BadSharedPtr`：**

```cpp
class Widget {};

BadSharedPtr<Widget> ptr1(new Widget()); // ptr1对Widget的引用计数为1
{
    BadSharedPtr<Widget> ptr2 = ptr1; // 现在ptr2有了自己的引用计数，也为1
    // 在这里，ptr1和ptr2应该共享引用计数，但实际上它们各自认为自己独占资源
}

// ptr2被销毁，其认为的引用计数减到0，Widget被删除
// 但ptr1仍然认为它有对Widget的有效引用
```

在这个例子中，由于引用计数不是通过指针共享的，`ptr1`和`ptr2`各自有一个认为自己独占的引用计数。这导致`ptr2`被销毁时错误地删除了`Widget`实例，尽管`ptr1`仍然认为它拥有对该资源的有效引用。这就造成了悬挂指针问题，使用`ptr1`访问`Widget`实例可能会导致未定义行为。

### 结论

如果不使用指针来共享引用计数，就无法在`SharedPtr`实例之间同步资源所有权的信息，这会导致资源被错误地释放或泄漏，以及程序运行时的错误。通过使用指针共享引用计数，所有的`SharedPtr`实例可以正确地共同管理一个资源的生命周期，确保资源仅在最后一个引用它的智能指针被销毁时才释放，从而避免了悬挂指针、双重释放等问题。

#### 默认构造函数

```cpp
SharedPtr() : _p(nullptr), _count(new int(0)) {}
```

- **作用**：创建一个不指向任何资源的 `SharedPtr`。
- **实现**：将 `_p` 设置为 `nullptr`，表示没有资源，将 `_count` 初始化为指向一个值为 0 的 `int`，表示没有任何 `SharedPtr` 指向资源。

#### 参数化构造函数

```cpp
explicit SharedPtr(T* p) : _p(p), _count(new int(1)) {}
```

- **作用**：创建一个指向给定资源的 `SharedPtr`。
- **实现**：将 `_p` 设置为指向传入的资源，将 `_count` 初始化为指向值为 1 的 `int`，表示有一个 `SharedPtr` 指向该资源。

#### 析构函数

```cpp
~SharedPtr() {
    if (_p && --(*_count) == 0) {
        delete _p;
        delete _count;
    }
}
```

- **作用**：销毁 `SharedPtr`，适当时释放其管理的资源。
- **实现**：递减 `_count`，如果没有其他 `SharedPtr` 指向资源（计数为 0），则释放资源和计数器。

### 添加复制能力

#### 拷贝构造函数

```cpp
SharedPtr(const SharedPtr& other) : _p(other._p), _count(other._count) {
    if (_p) {
        (*_count)++;
    }
}
```

- **作用**：创建一个新的 `SharedPtr`，它与另一个 `SharedPtr` 共享资源。
- **实现**：复制原始指针 `_p` 和计数器指针 `_count`，并递增计数器（表示现在有另一个 `SharedPtr` 指向资源）。

#### 赋值运算符

```cpp
SharedPtr& operator=(const SharedPtr& other) {
    if (this != &other) {
        if (_p && --(*_count) == 0) {
            delete _p;
            delete _count;
        }
        _p = other._p;
        _count = other._count;
        if (_p) {
            (*_count)++;
        }
    }
    return *this;
}
```

- **作用**：使一个 `SharedPtr` 指向另一个 `SharedPtr` 已经指向的资源。
- **实现**：首先检查自赋值，然后减少原 `_p` 的计数并在需要时释放资源。接着复制新的 `_p` 和 `_count`，并增加新的计数。

### 添加辅助功能

#### 获取原始指针

```cpp
T* get() const {
    return _p;
}
```

- **作用**：获取 `SharedPtr` 管理的原始指针。
- **实现**：返回 `_p`。

#### 解引用和箭头操作符

```cpp
T& operator*() const { return *_p; }
T* operator->() const { return _p; }
```

- **作用**：允许直接通过 `SharedPtr` 访问资源。
- **实现**：`*` 操作符返回资源的引用，`->` 操作符返回资源的指针。

#### 引用计数

```cpp
int use_count() const {
    return *_count;
}
```

- **作用**：获取指向资源的 `SharedPtr` 数量。
- **实现**：返回 `_count` 指向的值。

#### 重置指针

```cpp
void reset(T* p = nullptr) {
    if (_p && --(*_count) == 0) {
        delete _p;
        delete _count;
    }
    _p = p;
    _count = new int(p ? 1 : 0);
}
```

- **作用**：更改 `SharedPtr` 管理的资源或放弃当前资源。
- **实现**：减少旧资源的计数并在需要时释放。设置 `_p` 为新资源或 `nullptr`，重新初始化 `_count`。

### 添加工厂方法

#### `make_shared` 函数

```cpp
template <typename T, typename... Args>
SharedPtr<T> make_shared(Args&&... args) {
    return SharedPtr<T>(new T(std::forward<Args>(args)...));
}
```

- **作用**：创建并初始化资源，返回管理它的 `SharedPtr`。
- **实现**：使用完美转发构造新资源，封装在 `SharedPtr` 中返回。

通过这种逐步增加功能的方式，我们可以更好地理解每个部分如何独立工作，以及它们如何协同工作来实现一个完整的 `SharedPtr` 类。

### 测试

下面我们将结合提供的测试用例来逐步讲解如何使用 TDD 方法来开发和完善 `SharedPtr` 类。

### 测试用例分析

#### TEST1: 基础构造函数

- **目标**：验证基础构造函数和 `get` 方法是否正常工作。
- **实现**：创建两个 `SharedPtr` 对象，一个管理 `int` 类型，另一个管理 `std::string` 类型，并检查它们是否正确地初始化了值。

```cpp
TEST(SharedPtrTest, TEST1) {
    SharedPtr<int> ptr1{new int{10}};
    EXPECT_EQ(*ptr1.get(), 10);

    SharedPtr<std::string> ptr2{new std::string{"hello world!"}};
    EXPECT_EQ(*ptr2.get(), "hello world!");
}
```

#### TEST2: `make_shared` 函数

- **目标**：验证 `make_shared` 方法是否正确创建 `SharedPtr` 对象。
- **实现**：使用 `make_shared` 创建对象，并验证它们的值。

#### TEST3: 默认构造函数

- **目标**：检查默认构造函数是否正确初始化 `SharedPtr` 为 `nullptr`。
- **实现**：创建两个空的 `SharedPtr` 对象，并验证它们是否为空（`nullptr`）。

#### TEST4 & TEST5: 拷贝构造函数和引用计数

- **目标**：验证拷贝构造函数和引用计数是否正确。
- **实现**：创建多个 `SharedPtr` 对象，通过拷贝构造函数共享相同的资源，并检查引用计数是否正确更新。

#### TEST6: 析构函数和 `reset` 方法

- **目标**：验证析构函数和 `reset` 方法是否正确工作。
- **实现**：创建多个共享资源的 `SharedPtr` 对象，观察它们的生命周期以及对引用计数的影响，同时验证 `reset` 方法的效果。

#### TEST7: 解引用操作符 \*

- **目标**：检查解引用操作符是否正确返回资源。
- **实现**：创建 `SharedPtr` 对象并通过解引用操作符检查它们的值。

#### TEST8: 箭头操作符 ->

- **目标**：验证箭头操作符是否正确工作。
- **实现**：创建 `SharedPtr` 对象并通过箭头操作符访问它们的成员。

#### TEST9 & TEST10: `reset` 方法

- **目标**：进一步验证 `reset` 方法的不同使用方式。
- **实现**：创建 `SharedPtr` 对象，使用 `reset` 方法重置它们，并检查结果。

#### TEST11: 隐式转换到 bool

- **目标**：验证 `SharedPtr` 的隐式转换到 `bool` 是否正确。
- **实现**：创建 `SharedPtr` 对象，检查它们在布尔上下文中的行为。

#### TEST12: 赋值运算符

- **目标**：验证赋值运算符是否正确处理自赋值和正常赋值。
- **实现**：创建 `SharedPtr` 对象，进行自赋值和普通赋值操作，并检查结果。

### 使用 TDD 逐步开发 `SharedPtr`

1. **编写第一个测试（TEST1）**：首先，我们编写一个测试用例来验证基本的构造函数功能。然后，我们实现 `SharedPtr` 类以通过这个测试。

2. **逐步增加测试和功能**：随着每个新的测试用例（如 TEST2, TEST3 等），我们增加 `SharedPtr` 类的新功能或改进现有功能。

3. **重构和改善**：在新的测试通过后，可能需要重构代码以提高其效率和可读性，同时保持所有测试的通过。

4. **测试覆盖**：确保测试用例覆盖了所有的功能点和边缘情况，这有助于捕捉潜在的错误和缺陷。

通过这种方式，我们可以确保每增加一个功能或改进，`SharedPtr` 类都能通过

所有相关的测试，从而保证代码的稳定性和可靠性。

### 注意点

- 这个实现并不是线程安全的。在多线程环境中，对同一 `SharedPtr` 对象的操作可能需要额外的同步机制。
- 没有处理弱指针和循环引用的问题。在某些情况下，这可能导致内存泄漏。
- 异常安全：代码应确保在异常抛出时不会发生资源泄漏。

整体上，这段代码是一个很好的入门级示例，展示了如何实现一个简单的共享指针类。

> 碍于篇幅缘故没有全部列出测试代码，可以关注 everystep 回复关键词 **smartptr** 获取完整代码。
