
在C++中，如果你只定义了一个析构函数而没有定义任何构造函数，编译器会为你的类自动生成几个特殊的成员函数。具体来说，编译器将自动生成默认构造函数、拷贝构造函数和拷贝赋值运算符。从C++11开始，还会生成移动构造函数和移动赋值运算符。这些自动生成的函数是为了确保类的对象可以被正常构造、复制、移动和销毁。

让我们通过一个例子来说明这一点：

### 示例代码

```cpp
#include <iostream>
using namespace std;

class MyClass {
public:
    // 自定义析构函数
    ~MyClass() {
        cout << "析构函数被调用" << endl;
    }
};

int main() {
    MyClass a;           // 调用自动生成的默认构造函数
    MyClass b = a;       // 调用自动生成的拷贝构造函数
    MyClass c(MyClass()); // 调用自动生成的移动构造函数（C++11及以后）
    b = a;               // 调用自动生成的拷贝赋值运算符
    c = std::move(a);    // 调用自动生成的移动赋值运算符（C++11及以后）
    return 0;
}
```

### 解释

- **默认构造函数**：当`MyClass a;`被执行时，自动生成的默认构造函数被调用，用于初始化对象`a`。

- **拷贝构造函数**：当`MyClass b = a;`被执行时，自动生成的拷贝构造函数被调用，用于创建对象`b`作为`a`的副本。

- **移动构造函数（C++11及以后）**：当`MyClass c(MyClass());`被执行时，由于使用了临时对象，自动生成的移动构造函数被调用（如果你使用的是C++11或更高版本）。

- **拷贝赋值运算符**：当执行`b = a;`时，自动生成的拷贝赋值运算符被调用，用于将`a`的内容复制到`b`。

- **移动赋值运算符（C++11及以后）**：当执行`c = std::move(a);`时，自动生成的移动赋值运算符被调用（在C++11及以后），用于将`a`的内容移动到`c`。

### 注意

- 如果你定义了自己的拷贝构造函数、拷贝赋值运算符、移动构造函数或移动赋值运算符，编译器将不会自动生成这些函数。
- 自C++11起，如果你显式定义了析构函数，编译器仍然会自动生成移动构造函数和移动赋值运算符，但这种行为在某些情况下可能会被抑制（比如当你也定义了拷贝构造函数或拷贝赋值运算符时）。

### 定义一个空类呢？

在C++中，如果你声明一个空类，编译器会默认生成以下六种函数：

1. 默认构造函数（Default constructor）
2. 默认析构函数（Default destructor）
3. 拷贝构造函数（Copy constructor）
4. 拷贝赋值运算符（Copy assignment operator）
5. 移动构造函数（Move constructor）（C++11及以后）
6. 移动赋值运算符（Move assignment operator）（C++11及以后）

这些函数都是公有的，并且可以被继承。这就是为什么一个空类在C++中并不真正“空”，它会有一些默认的行为。

以下是一个空类的例子：

```cpp
class EmptyClass {
};
```

编译器会为这个类生成以下的成员函数：

```cpp
class EmptyClass {
public:
    EmptyClass() {} // 默认构造函数
    ~EmptyClass() {} // 默认析构函数
    EmptyClass(const EmptyClass& other) {} // 拷贝构造函数
    EmptyClass& operator=(const EmptyClass& other) { return *this; } // 拷贝赋值运算符
    EmptyClass(EmptyClass&& other) {} // 移动构造函数 (C++11及以后)
    EmptyClass& operator=(EmptyClass&& other) { return *this; } // 移动赋值运算符 (C++11及以后)
};
```

请注意，这些函数的实现是编译器生成的默认实现，可能并不符合你的需求，你可以根据需要重写这些函数。