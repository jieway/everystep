
C++ 提供了四种类型转换运算符：`static_cast`、`dynamic_cast`、`const_cast` 和 `reinterpret_cast`。下面是每种转换的具体例子：

1. `static_cast`：这是最常用的类型转换运算符，可以在相关类型之间进行转换，例如从基类指针转换为派生类指针，或者在整数和浮点数之间进行转换。

```cpp
int i = 10;
double d = static_cast<double>(i); // convert int to double
```

2. `dynamic_cast`：这个运算符主要用于在类的层次结构中进行安全的向下转换。它在运行时检查转换是否有效。

```cpp
class Base {
public:
    virtual void foo() {}
};

class Derived : public Base {
public:
    void bar() {
        // Derived specific function
    }
};

int main() {
    Base* basePtr = new Derived();
    Derived* derivedPtr = dynamic_cast<Derived*>(basePtr); // safe downcasting
    if (derivedPtr) {
        derivedPtr->bar();
    }
    delete basePtr;
    return 0;
}
```

3. `const_cast`：这个运算符用于修改类型的 const 或 volatile 属性。最常见的用途是在函数中删除参数的 const 属性，以便可以对其进行修改。

```cpp
const int a = 10;
int* b = const_cast<int*>(&a); // remove constness
*b = 20; // now allowed
```

4. `reinterpret_cast`：这是最不安全的转换运算符，它会产生一个新的值。它主要用于进行某些机器特定的转换，或者进行一些非常规的类型转换。

```cpp
int i = 10;
int* p = &i;
long num = reinterpret_cast<long>(p); // convert int* to long
```

请注意，尽管 C++ 提供了这些类型转换运算符，但在可能的情况下，最好尽量避免使用它们。类型转换往往会隐藏潜在的错误，使得代码更难理解和维护。在许多情况下，可以通过改进代码设计来避免类型转换。