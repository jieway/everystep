C++20 引入了 Concepts（概念）的新特性，它允许程序员在泛型编程中更清晰地表达类型要求和约束。Concepts 提供了一种在模板中描述类型特征的方式，用于限定模板参数的有效性。可以将 Concepts 理解为对类型的规则或概念，它们定义了模板参数必须满足的条件。通过使用 Concepts，程序员可以更加清晰地表达关于模板参数的期望，并在编译时对这些期望进行验证。

以下是一个简单的例子，演示了如何使用 C++20 的 Concepts 来定义和使用概念。假设我们有一个需求，需要编写一个泛型函数来计算两个数的和。我们希望确保这个函数只能接受可以进行加法运算的类型。我们可以使用 Concepts 来实现这个约束。

```cpp
#include <iostream>
#include <concepts>

// 定义一个概念（Concept），要求类型T支持加法运算
template <typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::same_as<T>;  // a + b 的结果类型必须与输入类型相同
};

// 泛型函数，接受两个可相加的类型，并返回它们的和
template <Addable T>
T add(T a, T b) {
    return a + b;
}

int main() {
    // 使用概念约束的泛型函数
    std::cout << add(3, 4) << std::endl;  // 输出 7

    // 如果尝试传递不支持加法运算的类型，编译器将发出错误
    // error: no matching function for call to 'add(const char [4], const char [4])'
    // std::cout << add("Hello", "World") << std::endl;

    return 0;
}
```

在这个例子中，我们首先定义了一个概念 `Addable`，该概念要求类型 T 支持加法运算，并且加法的结果类型必须与输入类型相同。然后，我们使用该概念来约束泛型函数`add`，确保它只能接受支持加法运算的类型。

在`main`函数中，我们展示了如何使用这个泛型函数来计算两个整数的和，并演示了如果尝试传递不支持加法运算的类型，编译器将会发出错误。

这是一个简单的例子，但 Concepts 的真正优势在于更复杂的泛型编程场景中，能够提高代码的可读性和可维护性。

### 更多的例子

接下来考虑一个稍微复杂的例子。假设希望实现一个通用的排序函数，但只想对支持“小于比较”（`<`运算符）的类型进行排序。我们可以使用 Concepts 来定义这样一个概念，然后将其应用于泛型排序函数。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <concepts>

// 定义一个概念（Concept），要求类型T支持小于比较
template <typename T>
concept LessComparable = requires(T a, T b) {
    { a < b } -> std::convertible_to<bool>;  // a < b 的结果类型必须是可转换为bool的
};

// 泛型排序函数，只接受支持小于比较的类型
template <LessComparable T>
void customSort(std::vector<T>& vec) {
    std::sort(vec.begin(), vec.end());
}

int main() {
    // 使用概念约束的泛型排序函数
    std::vector<int> intVec = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
    customSort(intVec);

    for (const auto& elem : intVec) {
        std::cout << elem << " ";
    }
    std::cout << std::endl;  // 输出 1 1 2 3 3 4 5 5 5 6 9

    // 如果尝试对不支持小于比较的类型排序，编译器将发出错误
    // error: no matching function for call to 'customSort(std::vector<std::__cxx11::basic_string<char> >&)'
    // std::vector<std::string> strVec = {"apple", "orange", "banana"};
    // customSort(strVec);

    return 0;
}
```

在这个例子中，我们首先定义了一个概念 `LessComparable`，该概念要求类型 T 支持小于比较，并且小于比较的结果类型必须是可转换为 bool 的。然后，我们使用该概念来约束泛型排序函数 `customSort`，以确保它只能接受支持小于比较的类型。

这种情况下，Concepts 的使用场景在于确保泛型函数只能应用于符合特定要求的类型，从而提高代码的类型安全性和可读性。
