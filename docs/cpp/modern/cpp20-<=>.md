# C++20 三路比较操作符(<=>)

在 C++20 引入三路比较操作符（太空船操作符）之前，如果你想要比较两个对象，通常需要手动实现多个比较操作符（如 `<`, `<=`, `>`, `>=`, `==`, `!=`）。让我们通过比较相同功能的代码实现，来看看引入三路比较操作符之前和之后的区别。

### 没有三路比较操作符（C++20 之前）

假设你有一个 `Point` 类，并且你想要比较两个 `Point` 对象。在 C++20 之前，你需要为每个比较操作符提供一个单独的实现，比如在比较Point类的对象时，你需要为每个比较操作符（<, <=, >, >=, ==, !=）编写独立的函数。这不仅代码量大，而且容易出错，因为每个操作符都需要单独处理，这可能导致比较逻辑不一致。

例如，一个Point类的传统比较实现可能会包括六个不同的比较操作符方法。这些方法需要分别定义对象如何相等、不等、小于、大于、小于等于、大于等于。

```cpp
#include <iostream>

class Point {
public:
    int x, y;

    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }

    bool operator!=(const Point& other) const {
        return !(*this == other);
    }

    bool operator<(const Point& other) const {
        if (x < other.x) return true;
        if (x > other.x) return false;
        return y < other.y;
    }

    bool operator>(const Point& other) const {
        return other < *this;
    }

    bool operator<=(const Point& other) const {
        return !(other < *this);
    }

    bool operator>=(const Point& other) const {
        return !(*this < other);
    }
};

int main() {
    Point p1 = {1, 2};
    Point p2 = {1, 3};

    if (p1 < p2) {
        std::cout << "p1 is less than p2" << std::endl;
    }

    if (p1 != p2) {
        std::cout << "p1 is not equal to p2" << std::endl;
    }

    return 0;
}
```

在这个例子中，你需要为 `Point` 类实现六个不同的比较操作符，以支持各种比较。

### 有三路比较操作符（C++20 及以后）

使用 C++20 的三路比较操作符，你可以简化上述代码：

```cpp
#include <iostream>
#include <compare>

class Point {
public:
    int x, y;

    auto operator<=>(const Point& other) const = default;
};

int main() {
    Point p1 = {1, 2};
    Point p2 = {1, 3};

    if (p1 <=> p2 < 0) {
        std::cout << "p1 is less than p2" << std::endl;
    }

    if (p1 != p2) {
        std::cout << "p1 is not equal to p2" << std::endl;
    }

    return 0;
}
```

而在C++20及以后，引入三路比较操作符后，你可以通过实现单个`operator<=>`方法来自动处理所有这些比较操作。这个操作符返回一个特殊的比较结果类型，该类型可以自动转换为标准比较结果（如-1, 0, 1表示小于、等于、大于）。如果两个对象相等，则返回0；如果第一个对象小于第二个，则返回一个负值；如果大于，则返回一个正值。

在实际应用中，这意味着你只需编写一个比较函数，编译器就会自动推导出其他所有的比较操作。在这个例子中，使用 `operator<=>` 提供了一个默认的比较实现，它自动为你处理所有比较操作。这大大减少了代码量，并且使得比较逻辑更加简洁和一致。此外，三路比较操作符提供了一种更符合直觉的比较方式，使得代码更易于理解和维护。

### 总结

三路比较操作符在简化比较逻辑方面提供了显著的优势。它避免了重复代码，并降低了在实现比较操作符时可能出现的错误。通过引入这个特性，C++20 帮助程序员写出更简洁、更易于维护的代码。