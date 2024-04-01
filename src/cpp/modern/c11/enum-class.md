# enum class 作用

`enum class`（也称为强类型枚举）是在 C++11 标准中引入的。C++11 带来了许多重要的语言特性和改进，`enum class` 是其中之一。与传统的枚举（`enum`）相比，`enum class` 提供了更好的类型安全性和作用域控制。它避免了与整数类型的隐式转换，并确保枚举值在其定义的枚举类中是独立的。

### 示例：使用 `enum class`

假设我们正在编写一个关于交通信号灯的程序，我们可以定义一个 `enum class` 来表示不同的信号灯状态：

```cpp
#include <iostream>

// 定义一个名为 TrafficLight 的 enum class
enum class TrafficLight {
    Red,
    Yellow,
    Green
};

// 函数来返回交通灯的状态
std::string getTrafficLightStatus(TrafficLight light) {
    switch (light) {
        case TrafficLight::Red:
            return "Stop";
        case TrafficLight::Yellow:
            return "Caution";
        case TrafficLight::Green:
            return "Go";
        default:
            return "Unknown";
    }
}

int main() {
    // 创建一个 TrafficLight 类型的变量
    TrafficLight light = TrafficLight::Red;

    // 打印交通灯的状态
    std::cout << "The traffic light is " << getTrafficLightStatus(light) << std::endl;

    return 0;
}
```

在这个例子中，`enum class TrafficLight` 定义了三个可能的值：`Red`、`Yellow` 和 `Green`。它们分别对应不同的交通信号灯状态。由于我们使用了 `enum class` 而不是传统的 `enum`，这些值在 `TrafficLight` 枚举类中是唯一的。这意味着我们不能随意将它们与整数互换，也不能与其他枚举类中的值混淆。

在 `getTrafficLightStatus` 函数中，我们使用 `switch` 语句来根据交通灯的状态返回相应的描述。注意，在引用枚举类中的值时，我们需要使用完全限定的名称，例如 `TrafficLight::Red`。

### 为什么使用 `enum class`

1. **类型安全**：`enum class` 防止了与整数的隐式转换，减少了类型错误。

2. **作用域控制**：`enum class` 中的枚举值有自己的作用域，并不会污染它们所在的命名空间。

3. **明确性**：使用 `enum class` 提高了代码的可读性和可维护性。

`enum class` 是 C++11 引入的特性，提供了一种更现代、更安全的方式来定义枚举类型。


### enum class 和 enum 的区别

`enum class`（强类型枚举）和传统的 `enum`（非强类型枚举）是 C++ 中两种不同的枚举类型，它们之间存在几个关键区别：

在 C++ 中，`enum` 和 `enum class` 都用于定义枚举类型，但它们有着明显的不同。下面我将通过具体的例子来展示这两者之间的区别。

#### 示例：使用传统的 `enum`

```cpp
enum Color {
    RED,    // 0
    GREEN,  // 1
    BLUE    // 2
};

void printColor(int color) {
    if (color == RED) {
        std::cout << "RED" << std::endl;
    } else if (color == GREEN) {
        std::cout << "GREEN" << std::endl;
    } else if (color == BLUE) {
        std::cout << "BLUE" << std::endl;
    }
}

int main() {
    Color color = RED;
    printColor(color);
    return 0;
}
```

在这个例子中，`Color` 是一个传统的 `enum`。`enum` 的一个主要问题是它的值会污染所在的作用域。比如，`RED`、`GREEN` 和 `BLUE` 都是全局的，可能会与其他同名的标识符发生冲突。

#### 示例：使用 `enum class`

```cpp
enum class Color {
    RED,    // 0
    GREEN,  // 1
    BLUE    // 2
};

void printColor(Color color) {
    if (color == Color::RED) {
        std::cout << "RED" << std::endl;
    } else if (color == Color::GREEN) {
        std::cout << "GREEN" << std::endl;
    } else if (color == Color::BLUE) {
        std::cout << "BLUE" << std::endl;
    }
}

int main() {
    Color color = Color::RED;
    printColor(color);
    return 0;
}
```

在这个例子中，`Color` 是一个 `enum class`。与传统的 `enum` 相比，`enum class` 引入了作用域。这意味着枚举值（如 `RED`、`GREEN` 和 `BLUE`）必须在其类型名（如 `Color::`）之后进行访问。这提供了更好的类型安全性和名称冲突的避免。

#### 总结对比

- **命名空间污染**：传统的 `enum` 可能会导致命名空间污染，因为它的枚举值是在全局作用域中。而 `enum class` 的枚举值则位于自己的作用域内，不会与外部作用域冲突。
- **类型安全**：`enum class` 提供了更好的类型安全性。例如，你不能直接将 `enum class` 类型的变量赋值给 `int`（除非显式转换），这减少了不同枚举类型间的混用。
- **强制作用域**：在 `enum class` 中，必须使用作用域运算符（`::`）来访问枚举值，这使得代码更加清晰可读。

### 更多 `enum class` 示例

#### 示例 1：表示星期

```cpp
enum class Weekday {
    Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
};

Weekday today = Weekday::Friday;
```

在这个例子中，`Weekday` 是一个 `enum class`，包含一周的七天。要引用这些值，需要使用 `Weekday::` 作为前缀。

#### 示例 2：具有显式底层类型的枚举类

```cpp
enum class StatusCode : unsigned int {
    Ok = 200,
    NotFound = 404,
    ServerError = 500
};

StatusCode response = StatusCode::NotFound;
```

在这个例子中，`StatusCode` 是一个具有显式底层类型 `unsigned int` 的 `enum class`。这对于需要特定整数值的枚举很有用。

#### 示例 3：与 `switch` 语句结合使用

```cpp
enum class Direction {
    North, East, South, West
};

Direction heading = Direction::North;

switch (heading) {
    case Direction::North:
        // 北
        break;
    case Direction::East:
        // 东
        break;
    case Direction::South:
        // 南
        break;
    case Direction::West:
        // 西
        break;
}
```

在这个例子中，我们定义了一个表示方向的 `enum class`，然后在 `switch` 语句中使用它。

### 总结

`enum class` 提供了比传统 `enum` 更好的类型安全和作用域控制，避免了许多常见的编程错误。它是 C++11 引入的现代 C++ 特性之一，推荐在需要枚举类型时使用。