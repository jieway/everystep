# decltype

`decltype` 是 C++11 引入的一个关键字，用于查询表达式的类型。它不计算表达式的值，只是用来获取表达式的类型。`decltype` 在模板编程、自动类型推断以及需要精确类型信息的场景中特别有用。

### 示例 1：基本用法

假设你有一个函数，你想获取这个函数返回值的类型，然后用这个类型定义一个新的变量。

```cpp
#include <iostream>

int sum(int a, int b) {
    return a + b;
}

int main() {
    // 使用 decltype 获取函数返回值的类型
    decltype(sum(0, 0)) result;

    result = sum(3, 4);
    std::cout << "The result is " << result << std::endl; // 输出 7

    return 0;
}
```

在这个例子中，`decltype(sum(0, 0))` 将获取 `sum` 函数返回值的类型（在这个案例中是 `int`），然后用这个类型来定义 `result` 变量。

### 示例 2：结合 auto 使用

`decltype` 也常与 `auto` 关键字结合使用，尤其是在模板编程或复杂的类型推导场景中。

```cpp
#include <map>
#include <string>

int main() {
    std::map<std::string, int> wordCount;

    // 假设我们想要迭代这个 map
    for (auto it = wordCount.begin(); it != wordCount.end(); ++it) {
        // 使用 decltype 确定 it 的类型
        decltype(it) anotherIterator = it;
        // ...
    }

    return 0;
}
```

这里，`decltype(it)` 会得到 `it` 的准确类型，这在处理复杂的、嵌套的或模板类型时非常有用，因为这些类型可能很难手动书写。

### 示例 3：使用 decltype 推导表达式类型

`decltype` 不仅可以用于变量，还可以用于表达式。

```cpp
#include <iostream>

int main() {
    int x = 5;
    double y = 10.5;

    // decltype 用于推导表达式的结果类型
    decltype(x * y) result = x * y;

    std::cout << "The result is " << result << std::endl;

    return 0;
}
```

在这个例子中，`x * y` 的结果类型是 `double`，因此 `decltype(x * y)` 会得到 `double`。这种方式对于复杂表达式的类型推导非常有用。

## decltype 的使用场景

#### 1. 类型推导
当你需要推导一个表达式或变量的类型时，`decltype` 非常有用。这在泛型编程或模板编程中尤其常见。

```cpp
int x = 5;
decltype(x) y = 10; // y 的类型与 x 的类型相同，即 int
```

#### 2. 函数模板中的返回类型推导
在编写函数模板时，可能需要根据参数的类型推导出返回类型。这在处理复杂表达式时尤其有用。

```cpp
template <typename T, typename U>
auto add(T t, U u) -> decltype(t + u) {
    return t + u;
}
```

#### 3. 与 `auto` 结合使用
`decltype` 可以与 `auto` 结合使用，用于复杂的类型推导，尤其是在 C++14 引入的返回类型推导中。

```cpp
auto func() -> decltype(auto) {
    int x = 5;
    return (x); // 返回类型是 int&
}
```

#### 4. 泛型编程中的类型约束
在泛型编程中，`decltype` 可以用于对模板参数施加更精确的类型约束。

```cpp
template <typename T>
void printTwice(const T& value) {
    decltype(value) x = value;
    std::cout << x << " " << x << std::endl;
}
```

#### 5. 结构化绑定中的类型推导
在使用 C++17 引入的结构化绑定时，`decltype` 可以用来推导绑定变量的类型。

```cpp
std::map<std::string, int> myMap;
for (const auto& [key, value] : myMap) {
    decltype(value) number = value; // 推导出 value 的类型
    // ...
}
```

#### 6. 完美转发中的类型保留
在使用模板实现完美转发时，`decltype` 可以保留传递给函数的参数的确切类型，包括其值类别（左值或右值）。

```cpp
template <typename T>
void wrapper(T&& arg) {
    // 调用另一个函数，保留 arg 的类型和值类别
    anotherFunction(std::forward<T>(arg));
}
```

### 总结

`decltype` 是一个强大的工具，它提供了一种简单的方式来获取变量或表达式的类型。在模板编程、类型推导和处理复杂表达式时，`decltype` 显得尤为重要。通过使用 `decltype`，开发者可以编写出更通用、更灵活的代码。