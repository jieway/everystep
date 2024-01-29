在C++中，重载（Overloading）和重写（Overriding）是两个不同的概念，它们都是多态的实现方式，但应用的上下文和规则有所不同。我将通过具体的例子来解释这两个概念及其区别。

### 重载（Overloading）

重载是指在同一作用域内存在多个同名函数，但这些函数的参数列表（参数的数量或类型）不同。

**特点：**
1. 发生在同一个类中或者在同一个作用域内。
2. 函数名相同，但参数列表不同（参数类型、个数或者顺序不同）。
3. 与函数的返回类型无关。

**例子：**
```cpp
class Printer {
public:
    void Print(int i) {
        std::cout << "Integer: " << i << std::endl;
    }

    void Print(double f) {
        std::cout << "Float: " << f << std::endl;
    }

    void Print(const std::string &s) {
        std::cout << "String: " << s << std::endl;
    }
};

// 使用
Printer printer;
printer.Print(10);       // 调用 Print(int)
printer.Print(3.14);     // 调用 Print(double)
printer.Print("Hello");  // 调用 Print(const std::string&)
```

### 重写（Overriding）

重写是指在派生类中重新定义基类中的虚函数（virtual function）。重写的函数必须具有相同的签名（即相同的函数名、参数列表和返回类型）。

**特点：**
1. 发生在基类和派生类之间。
2. 函数名、参数列表和返回类型都必须相同。
3. 基类中的函数必须是虚函数（使用`virtual`关键字声明）。

**例子：**
```cpp
class Animal {
public:
    virtual void Speak() {
        std::cout << "Animal speaks" << std::endl;
    }
};

class Dog : public Animal {
public:
    void Speak() override {  // 重写 Speak()
        std::cout << "Dog barks" << std::endl;
    }
};

// 使用
Animal* animal = new Animal();
Animal* dog = new Dog();

animal->Speak();  // 输出 "Animal speaks"
dog->Speak();     // 输出 "Dog barks"，调用的是 Dog 中

重写的 `Speak()` 方法
```

### 重载与重写的区别

1. **定义位置**：
   - **重载**：在同一个类中或同一作用域内。
   - **重写**：在派生类中对基类的虚函数进行重新定义。

2. **函数签名**：
   - **重载**：函数名相同，但参数列表必须不同。
   - **重写**：函数名、参数列表和返回类型都必须与基类中的虚函数相同。

3. **目的和用途**：
   - **重载**：提供相同名称但适用于不同参数的方法，增加代码的可读性。
   - **重写**：在派生类中改变基类的虚函数行为，实现运行时多态。

4. **关键字**：
   - **重载**：没有特定关键字。
   - **重写**：可以使用 `override` 关键字（C++11及以后版本）来显式指示重写。

5. **多态性**：
   - **重载**：属于静态多态，或编译时多态。
   - **重写**：属于动态多态，或运行时多态。

理解这两个概念及其区别对于编写高质量的C++代码非常重要，它们都是C++面向对象编程的基本特性之一。