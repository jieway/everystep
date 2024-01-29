在 C++ 中，`struct`（结构体）和 `class`（类）在很多方面都非常相似，但它们在默认的访问权限和继承类型上有一些关键区别。让我们通过一个具体的例子来说明这些区别。

### 基本区别

1. **默认的访问权限**:
   - 在 `class` 中，默认的成员访问权限是 `private`。
   - 在 `struct` 中，默认的成员访问权限是 `public`。

2. **默认的继承类型**:
   - 当从 `class` 继承时，默认的继承类型是 `private`。
   - 当从 `struct` 继承时，默认的继承类型是 `public`。

### 示例

让我们通过一个示例来看看这些区别是如何体现在实际代码中的。

```cpp
// 定义一个 struct
struct StructExample {
    int a; // 默认是 public
    void show() { /* ... */ } // 默认是 public
};

// 定义一个 class
class ClassExample {
    int a; // 默认是 private
public:
    void show() { /* ... */ }
};

// 继承
struct DerivedStruct : StructExample { // 默认是 public 继承
    // ...
};

class DerivedClass : ClassExample { // 默认是 private 继承
    // ...
};
```

在这个例子中，`StructExample` 和 `ClassExample` 在功能上是等效的，但它们的成员 `a` 和成员函数 `show` 的默认访问权限不同。在 `StructExample` 中，`a` 和 `show` 默认是公开的（public），而在 `ClassExample` 中，`a` 默认是私有的（private），`show` 需要显式声明为公开。

同样，当 `DerivedStruct` 继承自 `StructExample` 时，默认是公开继承，这意味着 `StructExample` 中的公开成员在 `DerivedStruct` 中仍然是公开的。而 `DerivedClass` 从 `ClassExample` 继承时，默认是私有继承，这意味着 `ClassExample` 中的所有成员在 `DerivedClass` 中都成为了私有成员，除非它们在 `ClassExample` 中被声明为 `protected`。

### 使用建议

- 当你需要一个主要用于数据存储的简单结构体时，使用 `struct` 是更自然的选择。
- 当你需要一个具有封装、继承和多态等特性的完整类时，使用 `class` 更为合适。

在实际使用中，`struct` 和 `class` 的选择往往取决于你的编程风格和特定场景的需求。在 C++ 中，你可以在两者之间自由选择，只需注意它们在默认访问权限和继承类型上的差异。