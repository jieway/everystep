# 内存和总线

上一部分中将内存全部放到了 CPU 里面，总线的概念是隐含着的。这一部分将内存拆分出来，再引入总线的概念，CPU 通过总线连接内存。

## 1. CPU、内存和总线之间的关系

下面展示了 CPU、内存和总线之间的关系：

```
                    +-----+
                    | CPU |
                    +-----+
                        |
                +-------+-------+
                |       |       |
            控制总线  数据总线 地址总线
                |       |       |
                v       v       v
        +--------------------------------+
        |             总线               |
        +--------------------------------+
                    |       |
                    v       v
              +-----+       +-----+
              | 内存 |<---->| I/O  |
              +-----+       +-----+
```

在这个简化模型中：

- **CPU**：作为计算中心，它执行程序代码，处理数据。

- **总线**：分为控制总线、数据总线和地址总线，连接 CPU 和内存以及 I/O 设备。

  - **控制总线**：CPU 通过它发送控制信号，如读写请求。
  - **数据总线**：实际数据在 CPU 和内存之间的传输通道。
  - **地址总线**：指定数据来源或目标位置的内存地址。

- **内存**：存储指令和数据，供 CPU 直接访问。

这个表示强调了 CPU 通过不同类型的总线与内存进行通信的方式，体现了它们之间的关系。

## 2. 内存 Dram

上一节已经实现的部分中内存是放在了 CPU 中，下面要将内存单独拆分出来作为一个类名为 Dram 的类（"Dynamic Random Access Memory" 动态随机访问内存）。随后再实现一个类名为 bus 的类来表示总线， CPU 通过总线 bus 读写内存 Dram ，接下来先实现 Dram 。

在实现之前要先定义几个参数来表示从内存中哪里开始读取，在 Qemu 中不是从物理地址 0 开始读取的，而是定义了一个具体的数字，下面的内容会详细讲解。

### 2.1 参数

上面的代码中涉及到了一些参数还没有定义，接下来定义一下参数。

```cpp
// param.cpp
#include <cstddef> // 引入定义 std::size_t 的头文件

// 定义DRAM的基地址
constexpr std::size_t DRAM_BASE = 0x8000'0000;

// 定义DRAM的大小，128MB
constexpr std::size_t DRAM_SIZE = 1024 * 1024 * 128;

// 定义DRAM的结束地址
constexpr std::size_t DRAM_END = DRAM_SIZE + DRAM_BASE - 1;
```

这三个参数是在计算机内存管理上下文中定义的，用于指定特定内存区域（在本例中是 DRAM，即动态随机访问内存）的基本属性。

- `DRAM_BASE` 定义了 DRAM 内存区域的起始物理地址。

qemu 中定义了这个变量，这个地址是一个十六进制数，从 `0x8000'0000` 处开始执行，即内存区域的开始点。

- `DRAM_SIZE` 定义了 DRAM 区域的总大小。

这个变量指定了从`DRAM_BASE`开始，可以用于存储数据的内存量。这个大小是以字节为单位的，对于内存大小的计算通常使用字节作为基本单位。`DRAM_SIZE`被定义为`1024 * 1024 * 128`字节，即 128MB。这是通过计算 1024 字节（1KB）乘以 1024（即 1MB）再乘以 128 得到的，即 DRAM 区域有 128MB 的存储容量。

- `DRAM_END`定义了 DRAM 内存区域的结束地址。

基于`DRAM_BASE`和`DRAM_SIZE`计算得出，指出了 DRAM 区域的最后一个字节的地址。这个地址用于界定 DRAM 区域的范围，对于确定内存访问是否越界很有帮助。

总结来说，这三个参数共同定义了 DRAM 内存区域的物理位置和大小，是计算机内存管理的基本组成部分。通过这些参数，操作系统和应用程序可以正确地定位和管理内存资源。

下面是涉及到现代 C++ 语法层面的解释：

1. 使用`std::size_t`替换`uint64_t`用于表示大小

虽然在上述代码中使用`uint64_t`对于定义 DRAM 大小和地址范围是合适的，但在 C++中，表示大小或基于内存的索引时通常推荐使用`std::size_t`。这是因为`std::size_t`是一个无符号整数类型，其大小是为了能够安全地表示对象的大小，以及对象最大可能的索引，这样可以增强代码的可移植性和安全性。

2. 使用`constexpr`确保编译时常量

代码已经正确使用了`constexpr`来声明编译时常量，这是现代 C++推荐的做法，因为它可以在编译时而不是运行时解析这些值，从而提高效率。没有需要修改的地方。

3. 使用单引号（`'`）作为数字分隔符

这个特性自 C++14 起被引入，允许开发者在数字字面量中加入单引号来分隔数字，使得长数字序列更容易被阅读。对于`DRAM_BASE`的定义，我们可以这样改写来增加其可读性：

```cpp
constexpr std::size_t DRAM_BASE = 0x8000'0000;
```

这里，`0x8000'0000`与`0x80000000`在编译时是完全相同的，但加入分隔符后，数字更易于阅读，尤其是对于较长的十六进制或十进制数值。这种写法没有改变原有的数值，只是使得数值的表示更为友好。使用这种方式，你可以使代码更加清晰和易于维护。

### 2.2 实现 Dram

接下来讲解如何实现 Dram ，下面是一个最简的形式，简单来说用一个 vector 来表示内存，Dram 初始化的时候需要将指令写入内存中。

```cpp
// dram.cpp
// 定义一个名为Dram的类，用于模拟DRAM（动态随机访问内存）的行为。
class Dram {
public:
    // 类的构造函数，接受一个包含机器码（即初始化代码）的vector作为参数。
    Dram(const std::vector<uint8_t>& code) {
        // 将dram成员变量的大小调整为DRAM_SIZE，并将所有元素初始化为0。
        // 这里DRAM_SIZE应该是一个在类外部定义的常量，表示DRAM的总容量（字节数）。
        dram.resize(DRAM_SIZE, 0); // 使用0初始化DRAM。

        // 将传入的code（机器码）复制到dram向量的开始位置。
        // std::copy是标准库算法，用于复制一个范围内的元素到另一个范围。
        // code.begin()和code.end()分别指向传入vector的开始和结束，指定了要复制的数据范围。
        // dram.begin()指定了目标范围的开始位置。
        std::copy(code.begin(), code.end(), dram.begin());
    }

private:
    // 类的私有成员变量，用std::vector<uint8_t>表示DRAM存储的数据。
    // uint8_t是8位无符号整数类型，代表DRAM中每个存储单元可以存储的数据范围（0-255）。
    // 使用vector是因为它是一个动态数组，可以灵活地调整大小，并提供随机访问能力。
    std::vector<uint8_t> dram;
};
```

接下来**添加`load`和`store`成员函数**，这些函数将模拟从 DRAM 加载和向 DRAM 存储数据的行为。

### 2.3 实现 Dram Load 方法

接下来要实现 Dram Load 方法，即从内存中读取指定长度的数据，输入参数为 addr 表示内存地址，size 表示需要读取的长度。目前 size 只能读取 8 位、16 位、32 位或 64 位 。

内存用 vector 来表示，其中一个位置表示 8 bit 所以需要计算 size 对应的比特数，即读取 vector 中多少个位置。随后使用 ｜ 运算符将读取到的数据拼接起来。

下面是具体的代码实现：

```cpp
class Dram {
public:
    // ...

    // 模拟从DRAM加载数据
    uint64_t load(uint64_t addr, uint64_t size) {
        if (size != 8 && size != 16 && size != 32 && size != 64) {
            throw std::runtime_error("LoadAccessFault");
        }
        uint64_t nbytes = size / 8;
        std::size_t index = (addr - DRAM_BASE);
        if (index + nbytes > dram.size()) {
            throw std::out_of_range("Address out of range");
        }

        uint64_t value = 0;
        for (uint64_t i = 0; i < nbytes; ++i) {
            value |= static_cast<uint64_t>(dram[index + i]) << (i * 8);
        }
        return value;
    }

    // ...

private:
    std::vector<uint8_t> dram;

};
```

### 2.4 实现 Dram store 方法

这部分实现写入内存的方法，输入参数需要给定读取对应的内存地址 addr ，待读取的长度 size 和返回值 value 。

和之前读取的方法类似，依旧是计算出来对应的索引然后将数据拼接起来。

```cpp
class Dram {
public:
    // ...
    // 模拟向DRAM存储数据
    void store(uint64_t addr, uint64_t size, uint64_t value) {
        if (size != 8 && size != 16 && size != 32 && size != 64) {
            throw std::runtime_error("StoreAMOAccessFault");
        }
        uint64_t nbytes = size / 8;
        std::size_t index = (addr - DRAM_BASE);
        if (index + nbytes > dram.size()) {
            throw std::out_of_range("Address out of range");
        }

        for (uint64_t i = 0; i < nbytes; ++i) {
            dram[index + i] = (value >> (i * 8)) & 0xFF;
        }
    }

private:
    std::vector<uint8_t> dram;
};
```

## 3. 总线 Bus
