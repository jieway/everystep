# template

当我们谈论 `template <typename T>` 时，我们指的是在 C++ 中创建一个模板类或模板函数，其中 `T` 是一个占位符，代表数据类型。这允许我们编写通用的代码，可用于多种数据类型。下面我将通过一些具体例子来解释这一概念。

### 示例 1：模板函数

假设我们需要一个函数来比较两个值并返回较大的那个。通常，我们需要为每种数据类型（如 `int`, `double`, `string` 等）编写一个单独的函数。使用模板，我们只需编写一个函数即可：

```cpp
template <typename T>
T getMax(T a, T b) {
    return a > b ? a : b;
}

// 使用示例
int main() {
    int x = 5, y = 10;
    std::cout << "Max of x and y: " << getMax(x, y) << std::endl;

    double a = 3.14, b = 2.72;
    std::cout << "Max of a and b: " << getMax(a, b) << std::endl;

    std::string s1 = "apple", s2 = "orange";
    std::cout << "Max of s1 and s2: " << getMax(s1, s2) << std::endl;

    return 0;
}
```

在这个例子中，`getMax` 函数可以用于比较任何类型的两个值，只要这两个值支持 `>` 操作符。

### 示例 2：模板类

我们也可以使用模板来创建通用的类。例如，一个简单的封装类，可以存储任何类型的值：

```cpp
template <typename T>
class Wrapper {
private:
    T value;
public:
    Wrapper(T val) : value(val) {}

    T getValue() const { return value; }
};

// 使用示例
int main() {
    Wrapper<int> intWrapper(123);
    std::cout << "Int value: " << intWrapper.getValue() << std::endl;

    Wrapper<std::string> stringWrapper("Hello, World!");
    std::cout << "String value: " << stringWrapper.getValue() << std::endl;

    return 0;
}
```

在这个例子中，`Wrapper` 类可以用来封装任何类型的值，从基本数据类型（如 `int`）到复杂的对象（如 `std::string`）。

### 结论

模板使得在 C++ 中编写通用代码变得非常简单和高效。它们通过减少重复代码的需要，并允许程序员编写更加灵活和可重用的代码，极大地提高了编程效率和代码的质量。


## template  没有出现之前是怎么解决这个问题的？


在 C++ 中引入模板（templates）之前，解决通用编程问题的方法通常不那么优雅和灵活。以下是一些在模板出现之前常用的方法：

### 1. 函数重载
为每种数据类型编写单独的函数是解决不同数据类型通用性问题的一种方法。这意味着对于相似的操作，你需要为每种数据类型编写重载函数。

例如，如果你想要编写一个比较函数，你可能需要为 `int`、`double`、`char` 等类型分别编写。

```cpp
int max(int a, int b) { ... }
double max(double a, double b) { ... }
char max(char a, char b) { ... }
```

这种方法的主要问题是代码重复。对于每种新的数据类型，你需要添加新的重载，这使得代码维护变得更加困难。

### 2. 宏（Macros）
宏提供了一种编写可以处理多种数据类型的代码的方式，尽管这种方法通常不推荐使用，因为它容易出错且难以调试。宏在预处理阶段展开，因此可以用于任何数据类型。

```cpp
#define MAX(a, b) ((a) > (b) ? (a) : (b))
```

这种方法缺乏类型安全性，并且容易导致意外的副作用。

### 3. 无类型指针（Void Pointers）
在一些情况下，程序员可能使用 `void*` 来编写可以处理多种数据类型的函数。这需要手动处理类型转换和内存管理，是一种相当低级和容易出错的方法。

```cpp
void* max(void* a, void* b, int (*cmp)(void*, void*)) {
    return cmp(a, b) > 0 ? a : b;
}
```

这种方法牺牲了类型安全性和表达力，同时增加了错误的可能性。

### 4. 特定语言特性
在某些特定的语言中，比如 C，可能会使用其他技巧，例如通过使用共用体（union）来处理不同类型的数据。

### 模板的引入
模板的引入在 C++ 中解决了这些问题，提供了一种类型安全、高效且易于维护的方式来处理泛型编程。它们允许编写与数据类型无关的代码，同时保持类型安全和高性能。模板是 C++ STL（标准模板库）的基础，为现代 C++ 编程的许多方面提供支持。