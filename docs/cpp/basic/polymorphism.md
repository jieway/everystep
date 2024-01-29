在C++中，多态性可以分为两种类型：动态多态（也称为运行时多态）和静态多态（也称为编译时多态）。两者都允许以不同的方式使用相同的接口，但实现机制和用途有所不同。

### 动态多态 (Runtime Polymorphism)

动态多态是通过虚函数和继承实现的。它在运行时发生，允许在程序执行期间决定调用哪个方法。动态多态的一个典型用途是基类指针或引用指向派生类对象，并在运行时调用正确的派生类方法。

#### 示例：

```cpp
#include <iostream>

class Base {
public:
    virtual void print() { std::cout << "Base class print\n"; }
};

class Derived : public Base {
public:
    void print() override { std::cout << "Derived class print\n"; }
};

int main() {
    Base *basePtr;
    Derived derivedObj;

    basePtr = &derivedObj;
    basePtr->print(); // 在运行时调用Derived的print方法

    return 0;
}
```

在这个例子中，`Base` 类有一个虚函数 `print`，而 `Derived` 类重写了这个函数。虽然 `basePtr` 是一个指向 `Base` 类的指针，但它实际上指向 `Derived` 类的对象。因此，调用 `basePtr->print()` 时，运行时系统会调用 `Derived` 类的 `print` 方法。

### 静态多态 (Compile-time Polymorphism)

静态多态是通过函数重载和模板实现的。这种多态性在编译时发生，编译器根据参数的类型或数量决定调用哪个函数。

#### 示例：

```cpp
#include <iostream>

class Print {
public:
    // 函数重载
    void show(int i) { std::cout << "Integer: " << i << "\n"; }
    void show(double d) { std::cout << "Double: " << d << "\n"; }
};

int main() {
    Print printObj;

    printObj.show(10);    // 调用show(int)
    printObj.show(10.5);  // 调用show(double)

    return 0;
}
```

在这个例子中，`Print` 类有两个 `show` 方法，一个接受整数，另一个接受双精度浮点数。编译器根据传递给 `show` 方法的参数类型来决定调用哪个版本。

### 区别

- **实现时机**：动态多态在运行时实现，静态多态在编译时实现。
- **效率**：静态多态通常比动态多态更高效，因为方法调用是在编译时解析的，而不是在运行时。
- **灵活性**：动态多态更灵活，允许在运行时决定对象的实际类型，适用于那些直到运行时才能确定的情况。
- **关键字**：动态多态使用虚函数和继承，静态多态使用函数重载和模板。

### 总结

动态多态和静态多态都是C++中实现多态的重要方式，它们各自有不同的用途和优势。理解它们的区别和适用场景对于编写高效和可维护的C++代码非常重要。