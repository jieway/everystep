# 适配器模式（Adapter）

适配器模式（Adapter Pattern）是一种结构型设计模式，它允许不兼容的接口之间进行交互。适配器会将一个类的接口转换成客户端期望的另一个接口，使原本接口不兼容的类可以一起工作。

### 示例场景：电源适配器

假设我们有一个场景，其中有一个美国制造的电器，设计用于接受110伏的电压。然而，在欧洲，标准电压是220伏。直接将美国电器插入欧洲的插座会损坏电器。为了使其兼容，我们需要一个电源适配器。

在软件开发中，这可以类比为使两个不兼容的接口协同工作。

### 实现适配器模式

让我们将上面的电源适配器例子转换为代码。

#### 步骤 1：定义不兼容的接口

首先，我们定义两个不兼容的接口：`AmericanSocket`（美国插座）和 `EuropeanAppliance`（欧洲电器）。

```cpp
// 美国插座接口
class AmericanSocket {
public:
    virtual void supply110v() const = 0;
};

// 欧洲电器接口
class EuropeanAppliance {
public:
    virtual void operateOn220v() const = 0;
};
```

#### 步骤 2：实现具体的类

我们实现一个美国插座和一个欧洲电器的具体类。

```cpp
// 具体的美国插座
class ConcreteAmericanSocket : public AmericanSocket {
public:
    void supply110v() const override {
        cout << "Supplying 110 volts" << endl;
    }
};

// 具体的欧洲电器
class ConcreteEuropeanAppliance : public EuropeanAppliance {
public:
    void operateOn220v() const override {
        cout << "Operating on 220 volts" << endl;
    }
};
```

#### 步骤 3：实现适配器

然后，我们实现一个适配器，将 `AmericanSocket` 的接口转换为 `EuropeanAppliance` 可以使用的接口。

```cpp
// 电源适配器
class PowerAdapter : public EuropeanAppliance {
private:
    AmericanSocket* socket;

public:
    PowerAdapter(AmericanSocket* s) : socket(s) {}

    void operateOn220v() const override {
        cout << "Converting 220v to 110v" << endl;
        socket->supply110v();
    }
};
```

#### 步骤 4：客户端代码

最后，在客户端代码中，我们可以使用适配器来使欧洲电器与美国插座兼容。

```cpp
int main() {
    ConcreteAmericanSocket americanSocket;
    PowerAdapter adapter(&americanSocket);
    
    // 将欧洲电器接入适配器
    adapter.operateOn220v(); // 适配器负责将电压转换为兼容的电压

    return 0;
}
```

### 适配器模式的优点

1. **提高类的复用性**：通过转换接口，可以使用一些现有的类，即使它们的接口不符合当前的需求。

2. **提升灵活性**：适配器可以在运行时适配不同的对象，提供更多的灵活性。

3. **解耦合**：适配器模式可以将原有的实现和客户端调用解耦，增加程序的可维护性。

适配器模式特别适用于需要整合使用一些现有的类，但它们的接口不兼容的情况，从而无需修改这些现有类的代码就能使它们在新环境中一起工作。