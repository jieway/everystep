# 原型模式（Prototype）

原型模式（Prototype Pattern）是一种创建型设计模式，它允许通过复制现有对象来创建新对象，而无需知道创建对象的具体类。这种模式特别适用于创建成本较高的实例化场景。

### 示例场景：复杂图形对象的创建

假设我们在开发一个图形编辑器，需要创建各种图形对象，如圆形、矩形等。这些图形对象的初始化可能非常复杂（例如，需要从数据库加载形状、颜色等信息）。为了避免重复创建这些复杂对象，我们可以使用原型模式来复制现有对象。

### 实现原型模式

为了实现原型模式，我们定义一个抽象基类，它包含一个克隆（clone）方法。然后，每个具体的图形类继承自这个基类，并实现克隆方法。

#### 抽象原型类

首先，我们定义一个抽象基类 `Shape`，它包含一个纯虚函数 `clone`。

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
#include <memory>
using namespace std;

// 抽象原型类
class Shape {
public:
    virtual ~Shape() {}
    virtual Shape* clone() const = 0;
    virtual void draw() const = 0;
};
```

#### 具体原型类

然后，我们为每种图形定义具体的原型类，如 `Circle` 和 `Rectangle`。

```cpp
// 具体原型类 - 圆形
class Circle : public Shape {
public:
    Circle* clone() const override {
        return new Circle(*this); // 复制构造函数
    }

    void draw() const override {
        cout << "Drawing a circle." << endl;
    }
};

// 具体原型类 - 矩形
class Rectangle : public Shape {
public:
    Rectangle* clone() const override {
        return new Rectangle(*this); // 复制构造函数
    }

    void draw() const override {
        cout << "Drawing a rectangle." << endl;
    }
};
```

#### 客户端代码

在客户端代码中，我们可以复制现有的图形对象，而不是每次都创建一个新对象。

```cpp
int main() {
    Circle circle;
    Rectangle rectangle;

    // 使用 clone 方法创建副本
    Shape* anotherCircle = circle.clone();
    Shape* anotherRectangle = rectangle.clone();

    // 绘制图形
    anotherCircle->draw();
    anotherRectangle->draw();

    delete anotherCircle;
    delete anotherRectangle;

    return 0;
}
```

### 原型模式的优点

1. **高效创建对象**：当直接创建对象的成本较高时，原型模式允许通过复制一个已存在的实例来高效地创建新实例。

2. **简化对象的创建**：原型模式隐藏了创建新实例的复杂性，使得客户端代码更简洁。

3. **动态添加或删除产品**：在运行时可以更改要实例化的具体原型类。

4. **减少子类的构造**：原型模式允许你复制对象而无需与它们所属的具体类耦合。

原型模式特别适用于那些创建新实例代价较高或者复杂性较高的场景，比如涉及到复杂计算、数据库操作或网络请求的对象创建过程。通过复制现有的实例来创建新的实例，可以提高效率并降低系统的复杂性。