# 建造者模式（Builder）

建造者模式（Builder Pattern）是一种用于构建复杂对象的设计模式，特别适合当对象的构造过程需要多个步骤或配置时。这个模式通过将对象的构造过程从其表示中分离出来，使得同样的构建过程可以创建不同的表示。建造者模式通常涉及到一个「指挥者（Director）」类和多个「建造者（Builder）」类。

### 示例场景：电脑组装

假设我们需要组装一台电脑。电脑的组装过程包括安装CPU、内存、硬盘和显卡等。不同类型的电脑（如办公电脑、游戏电脑）可能会有不同的组件和配置。

### 不使用建造者模式实现

如果不使用建造者模式来实现电脑的组装，通常会直接在客户端代码或者其他类中创建和组装电脑的具体配置。这种方式通常导致代码重复、耦合度高，且难以维护。下面是一个不使用建造者模式的简单实现示例：

- 示例：直接构建电脑

假设我们需要构建办公用电脑和游戏电脑，我们可能直接在客户端或者某个类中硬编码这些配置。

- 电脑类

我们首先定义一个电脑类，与之前一样：

```cpp
class Computer {
public:
    string CPU;
    string memory;
    string hardDrive;
    string GPU;

    void specifications() {
        cout << "CPU: " << CPU << "\n";
        cout << "Memory: " << memory << "\n";
        cout << "Hard Drive: " << hardDrive << "\n";
        cout << "GPU: " << GPU << "\n";
    }
};
```

- 直接在客户端代码中构建电脑

然后在客户端代码中，我们直接创建和配置电脑对象：

```cpp
int main() {
    // 构建办公电脑
    Computer officeComputer;
    officeComputer.CPU = "Intel Core i5";
    officeComputer.memory = "8GB";
    officeComputer.hardDrive = "256GB SSD";
    officeComputer.GPU = "Integrated";

    cout << "Office Computer: \n";
    officeComputer.specifications();

    // 构建游戏电脑
    Computer gamingComputer;
    gamingComputer.CPU = "Intel Core i9";
    gamingComputer.memory = "32GB";
    gamingComputer.hardDrive = "1TB SSD";
    gamingComputer.GPU = "NVIDIA RTX 3080";

    cout << "\nGaming Computer: \n";
    gamingComputer.specifications();

    return 0;
}
```

- 存在的问题

不使用建造者模式的实现方式存在以下问题：

1. **代码重复**：如果需要构建多个相似的电脑配置，你可能会在多个地方重复类似的代码。

2. **高耦合**：电脑的构建逻辑直接与客户端代码耦合。如果需要更改电脑的配置或添加新类型的电脑，你需要修改客户端代码。

3. **难以维护**：随着电脑类型和配置的增加，维护和更新电脑构建逻辑将变得更加困难。

4. **可扩展性差**：在引入新类型的电脑或者修改现有电脑配置时，这种实现方式不够灵活。

使用建造者模式可以解决这些问题，因为它将电脑的构建过程封装在各自的建造者类中，使得客户端代码与电脑的具体构建过程解耦，增强了系统的可维护性和扩展性。


### 使用建造者模式实现

为了实现这个例子，我们可以定义一个 `ComputerBuilder` 抽象类，具体的电脑类型（如 `OfficeComputerBuilder`、`GamingComputerBuilder`）继承自这个抽象类，并实现具体的组装步骤。同时，我们还需要一个 `Director` 类来控制组装过程。

- 代码实现

首先，定义电脑类和电脑建造者抽象类：

```cpp
#include <iostream>
#include <string>
using namespace std;

// Product
class Computer {
public:
    string CPU;
    string memory;
    string hardDrive;
    string GPU;

    void specifications() {
        cout << "CPU: " << CPU << "\n";
        cout << "Memory: " << memory << "\n";
        cout << "Hard Drive: " << hardDrive << "\n";
        cout << "GPU: " << GPU << "\n";
    }
};

// Abstract Builder
class ComputerBuilder {
protected:
    Computer* computer;

public:
    ComputerBuilder() { computer = new Computer(); }
    virtual ~ComputerBuilder() { delete computer; }

    Computer* getComputer() { return computer; }

    virtual void buildCPU() = 0;
    virtual void buildMemory() = 0;
    virtual void buildHardDrive() = 0;
    virtual void buildGPU() = 0;
};
```

然后，实现具体的建造者类：

```cpp
// Concrete Builder for Office Computer
class OfficeComputerBuilder : public ComputerBuilder {
public:
    void buildCPU() override { computer->CPU = "Intel Core i5"; }
    void buildMemory() override { computer->memory = "8GB"; }
    void buildHardDrive() override { computer->hardDrive = "256GB SSD"; }
    void buildGPU() override { computer->GPU = "Integrated"; }
};

// Concrete Builder for Gaming Computer
class GamingComputerBuilder : public ComputerBuilder {
public:
    void buildCPU() override { computer->CPU = "Intel Core i9"; }
    void buildMemory() override { computer->memory = "32GB"; }
    void buildHardDrive() override { computer->hardDrive = "1TB SSD"; }
    void buildGPU() override { computer->GPU = "NVIDIA RTX 3080"; }
};
```

接着，实现指挥者类：

```cpp
// Director
class Director {
public:
    void construct(ComputerBuilder* builder) {
        builder->buildCPU();
        builder->buildMemory();
        builder->buildHardDrive();
        builder->buildGPU();
    }
};
```

最后，在客户端代码中使用：

```cpp
int main() {
    Director director;
    OfficeComputerBuilder officeBuilder;
    GamingComputerBuilder gamingBuilder;

    cout << "Office Computer: \n";
    director.construct(&officeBuilder);
    officeBuilder.getComputer()->specifications();

    cout << "\nGaming Computer: \n";
    director.construct(&gamingBuilder);
    gamingBuilder.getComputer()->specifications();

    return 0;
}
```

### 总结

在这个例子中，建造者模式允许我们将电脑的构建过程（即具体的组装步骤）和其最终表示（即电脑的配置）分离开来。这样做的优势是，我们可以使用相同的构建过程来创建不同类型的电脑（如办公电脑和游戏电脑），而且以后如果需要引入更多类型的电

脑，只需增加新的建造者类而无需修改现有代码。这提高了代码的可维护性和扩展性。