`UniquePtr` 类是一个简单的智能指针类似于 C++ 标准库中的 `std::unique_ptr`。智能指针是一个非常有用的资源管理工具，它可以帮助自动管理动态分配的内存，避免内存泄漏等问题。

接下来先结合具体的例子对比讲解一下传统指针和智能指针 `std::unique_ptr` 的使用及其好处，如果已经有所了解可以直接跳过。随后从 `UniquePtr` 最小实现开始，逐步扩展，并解释每一步。

### 传统指针和智能指针的用法

在计算机程序设计中，指针是一种变量，其值为另一变量的地址，即内存中的位置。C++中的传统指针（raw pointer）和智能指针（如`std::unique_ptr`）都提供了对动态分配内存的访问能力，但它们的使用方法和目的存在显著差异。通过具体的例子，我们可以更好地理解这两种指针的使用及其好处。

### 1. 传统指针（Raw Pointer）

#### 使用场景

传统指针直接指向内存地址。它们没有内置的内存管理机制，因此程序员必须手动管理内存，包括分配和释放。

#### 示例代码

```cpp
int* rawPointer = new int(10); // 动态分配内存
// 使用rawPointer...
delete rawPointer; // 手动释放内存
rawPointer = nullptr; // 避免野指针
```

#### 缺点

- **内存泄漏**：如果忘记释放内存，会导致内存泄漏。
- **野指针**：如果释放内存后继续使用指针，可能会引起未定义行为。
- **所有权不明确**：在多个指针指向同一块内存时，难以管理所有权和生命周期。

### 2. 智能指针（`std::unique_ptr`）

#### 使用场景

`std::unique_ptr`是一种智能指针，它提供了类似于传统指针的功能，但加入了自动内存管理。它确保了被管理对象的唯一所有权，当`std::unique_ptr`离开作用域时，它会自动释放所管理的内存。

#### 示例代码

```cpp
#include <memory>

std::unique_ptr<int> uniquePtr = std::make_unique<int>(10);
// 使用uniquePtr...
// 离开作用域时自动释放内存，无需手动delete
```

#### 优点

- **自动内存管理**：自动释放内存，减少内存泄漏风险。
- **所有权语义清晰**：通过所有权的概念，使得资源管理更加明确和安全。
- **异常安全**：即使在函数抛出异常的情况下，也能保证资源被正确释放。

### 对比总结

- **内存管理**：智能指针如`std::unique_ptr`通过自动管理内存，减轻了程序员的负担，减少了内存泄漏和野指针的风险。
- **安全性**：智能指针提供了更高的安全性，尤其在异常处理和资源管理方面。
- **易用性**：智能指针的接口和标准库的集成使得它们更易于使用和理解。
- **性能**：虽然智能指针引入了一定的性能开销（如引用计数管理），但对于`std::unique_ptr`来说，这种开销非常小，几乎可以忽略不计。

总的来说，智能指针如`std::unique_ptr`在现代C++编程中被推荐使用，以提高代码的安全性、可读性和健壮性。然而，在一些性能敏感或底层的场景中，传统指针仍然有其用武之地。

### `std::unique_ptr` 最小实现

最小实现的 `UniquePtr` 类只需要包括基本的构造、析构、移动构造和移动赋值操作符，以及一个指针成员。这里我们暂时不考虑删除和禁止拷贝构造/赋值操作符，也不考虑其他便利功能。

```cpp
template <typename T>
class UniquePtr {
private:
    T* _p;  // 原始指针

public:
    // 构造函数
    explicit UniquePtr(T* p = nullptr) : _p(p) {}

    // 移动构造函数
    UniquePtr(UniquePtr&& other) noexcept : _p(other._p) {
        other._p = nullptr;
    }

    // 移动赋值操作符
    UniquePtr& operator=(UniquePtr&& other) noexcept {
        if (this != &other) {
            _p = other._p;
            other._p = nullptr;
        }
        return *this;
    }

    // 析构函数
    ~UniquePtr() {
        delete _p;
    }
};
```

这段代码定义了一个名为 `UniquePtr` 的模板类，它是一个实现了独占所有权语义的智能指针。智能指针是一种用来自动管理动态分配内存的工具，它确保在不再需要分配的内存时自动释放该内存，从而帮助防止内存泄漏。`UniquePtr` 类特别实现了以下功能：

1. **构造函数 (`UniquePtr(T* p = nullptr)`):** 这个构造函数接受一个原始指针 `T* p` 作为参数（默认为 `nullptr`）。当创建一个 `UniquePtr` 实例时，它接管了传入的原始指针的所有权，意味着 `UniquePtr` 现在负责管理该指针指向的内存。

2. **移动构造函数 (`UniquePtr(UniquePtr&& other)`):** 该构造函数实现了移动语义，允许从另一个同类型的 `UniquePtr` 实例（`other`）中“移动”资源。在这个过程中，资源（即原始指针 `_p`）从 `other` 转移到新创建的对象中，且 `other` 的指针被设置为 `nullptr`，确保不会发生双重释放。

3. **移动赋值操作符 (`operator=(UniquePtr&& other)`):** 类似于移动构造函数，这个操作符允许将一个 `UniquePtr` 实例的所有权转移到另一个 `UniquePtr` 实例。旧的指针被新的指针替换，而原来的 `UniquePtr` 实例将其指针设置为 `nullptr`。

4. **析构函数 (`~UniquePtr()`):** 析构函数确保当 `UniquePtr` 实例被销毁时，其管理的内存也被释放。这是通过删除其持有的原始指针 `_p` 实现的。

总的来说，这个 `UniquePtr` 类实现了基本的独占所有权内存管理模型，类似于 C++11 标准中引入的 `std::unique_ptr`。这种智能指针只允许一个 `UniquePtr` 实例在任何时候拥有一个给定的原始指针，从而防止多重删除同一个资源导致的问题。通过禁用拷贝构造和拷贝赋值操作（默认实现中未显示，但通常会这样做），它确保了独占所有权的语义。

### 扩展：禁止拷贝构造和拷贝赋值

在智能指针中，通常禁止拷贝构造和拷贝赋值，因为这会导致多个智能指针对象指向同一个资源，从而可能导致重复释放资源的问题。

```cpp
// 禁止拷贝构造和拷贝赋值
UniquePtr(const UniquePtr&) = delete;
UniquePtr& operator=(const UniquePtr&) = delete;
```

当然，让我们通过一个具体的例子来解释为什么 `UniquePtr` 禁止拷贝构造和拷贝赋值操作，并展示其独占所有权的特性。

### 示例场景

假设我们有一个类 `Resource`，它在构造时分配资源，在析构时释放资源。

```cpp
class Resource {
public:
    Resource() { std::cout << "Resource acquired.\n"; }
    ~Resource() { std::cout << "Resource released.\n"; }
};
```

现在，我们使用 `UniquePtr` 来管理 `Resource` 的实例。

### 正确使用 `UniquePtr`

```cpp
{
    UniquePtr<Resource> resPtr(new Resource()); // Resource 被创建
} // resPtr 离开作用域，Resource 被自动释放
```

在这个例子中，`resPtr` 是 `Resource` 实例的唯一拥有者。当 `resPtr` 离开作用域时，它的析构函数会被调用，从而释放 `Resource`。

### 尝试拷贝 `UniquePtr`

假设 `UniquePtr` 允许拷贝构造和拷贝赋值，看看会发生什么：

```cpp
{
    UniquePtr<Resource> resPtr(new Resource()); // Resource 被创建
    UniquePtr<Resource> resPtrCopy = resPtr; // 假设这是有效的
}
```

如果这段代码有效，`resPtrCopy` 将指向与 `resPtr` 相同的 `Resource` 实例。当 `resPtr` 离开作用域时，它的析构函数会释放 `Resource`。紧接着，当 `resPtrCopy` 离开作用域时，它也会尝试释放相同的 `Resource`。这将导致重复删除相同资源，进而可能导致程序崩溃。

#### 禁止拷贝构造和拷贝赋值的结果

```cpp
UniquePtr<Resource> resPtr(new Resource());
UniquePtr<Resource> resPtrCopy = resPtr; // 编译错误
```

由于 `UniquePtr` 禁止拷贝构造和拷贝赋值，上面的代码会在编译时失败。这样就避免了多个 `UniquePtr` 实例管理同一个资源的情况，从而防止了资源的重复释放。

#### 使用移动语义

`UniquePtr` 支持移动构造和移动赋值，允许资源的所有权转移。

```cpp
{
    UniquePtr<Resource> resPtr(new Resource());
    UniquePtr<Resource> resPtrMoved = std::move(resPtr); // 所有权转移
    // resPtr 现在为空，resPtrMoved 成为资源的唯一拥有者
}
// resPtrMoved 离开作用域，Resource 被释放
```

在这个例子中，资源的所有权从 `resPtr` 安全地转移到了 `resPtrMoved`。`resPtr` 在移动后变为空，不再指向原来的资源，因此不会发生资源的重复释放。

通过这个例子，我们看到 `UniquePtr` 通过禁止拷贝构造和拷贝赋值来维护资源的独占所有权，避免了重复释放同一资源的问题。同时，通过支持移动语义，它允许资源的所有权在不同的 `UniquePtr` 实例之间安全转移。这些特性使得 `UniquePtr` 成为管理动态分配资源的安全且有效的工具。


### 进一步扩展：添加辅助功能

为了使 `UniquePtr` 更实用，我们添加一些辅助功能，比如获取原始指针、重载解引用操作符、重载箭头操作符、提供隐式类型转换到 `bool`、重置指针和释放指针所有权的功能。

```cpp
// 返回原始指针
T* get() const {
    return _p;
}

// 重载解引用操作符 *
T& operator*() const {
    return *_p;
}

// 重载箭头操作符
T* operator->() const {
    return _p;
}

// 提供隐式类型转换到 bool
explicit operator bool() const {
    return _p != nullptr;
}

// 重置指针
void reset(T* p = nullptr) {
    if (_p != p) {
        delete _p;
        _p = p;
    }
}

// 释放指针所有权
T* release() {
    T* temp = _p;
    _p = nullptr;
    return temp;
}
```

### 最后的扩展：`make_unique` 函数实现

`make_unique` 函数是一个工厂函数，用于创建 `UniquePtr` 实例。它简化了智能指针的创建和使用，同时还有助于防止内存泄漏。

```cpp
template <typename T, typename... Args>
UniquePtr<T> make_unique(Args&&... args) {
    return UniquePtr<T>(new T(std::forward<Args>(args)...));
}
```

这篇文章专门讲解了完美转发的用法：[C++ 完美转发](https://mp.weixin.qq.com/s?__biz=MjM5NjAxMzk4NA==&mid=2247484843&idx=1&sn=4d174bb6a33b527e5298aae9fda92707&chksm=a6eef76491997e72708f5b25c37eabbd7e7f6e984af36cea44ad4d6e496fd1a6fd6b74f6a724&token=155455026&lang=zh_CN#rd) 。


这样，我们就完成了从最小实现到完整实现的逐步扩展。每一步都是在基础功能上添加更多的实用性和便利性。

### 单元测试

每个测试用例验证了`UniquePtr`智能指针的不同功能和特性，以下是每个测试的简明总结：

- **TEST1**: 验证通过直接使用`new`操作符初始化`UniquePtr`可以正确存储和访问基本类型和对象类型的值。


```c++
TEST(UniquePtrTest, TEST1) {
    UniquePtr<int> ptr1{new int{10}};
    EXPECT_EQ(*ptr1.get(), 10);

    UniquePtr<std::string> ptr2{new std::string{"hello world!"}};
    EXPECT_EQ(*ptr2.get(), "hello world!");
}
```

- **TEST2**: 验证通过`make_unique`函数初始化`UniquePtr`可以正确存储和访问基本类型和对象类型的值。
- **TEST3**: 验证默认初始化的`UniquePtr`其内部指针为`nullptr`。
- **TEST4**: 验证`UniquePtr`能够通过解引用操作符`*`访问存储的值，包括基本类型、对象类型和容器类型。
- **TEST5**: 验证`UniquePtr`能够通过箭头操作符`->`访问对象的成员函数和属性。
- **TEST6**: 验证`reset`方法无参数调用时，能够释放`UniquePtr`所持有的资源，并将内部指针设置为`nullptr`。
- **TEST7**: 验证`reset`方法带有新指针参数时，能够释放旧资源并接管新资源。
- **TEST8**: 验证`UniquePtr`在条件判断中的使用，以及`reset`调用后指针的有效性检查。
- **TEST9**: 验证`release`方法能够释放`UniquePtr`的所有权，并返回原始指针，同时确保`UniquePtr`不再管理该资源。
- **TEST10**: 验证`reset`方法用同一原始指针调用时，`UniquePtr`的行为（即不会导致资源被释放），以及重置为新指针后的行为。
- **TEST11**: 验证`release`方法后，`UniquePtr`变为空，原始指针仍然有效，并需要手动管理释放。

这些测试用例集中体现了`UniquePtr`的核心功能：自动资源管理、所有权控制、以及通过各种成员函数如`get`, `reset`, 和`release`进行灵活操作。通过这些测试，可以验证`UniquePtr`的实现是否符合智能指针的预期行为，尤其是在资源管理和所有权转移方面。

> 碍于篇幅缘故没有全部列出测试代码，可以关注 everystep 回复关键词 **smartptr** 获取完整代码。
