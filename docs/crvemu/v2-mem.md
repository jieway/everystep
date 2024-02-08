# 内存和总线

上一部分将内存全部放到了 CPU 里面，总线的概念是隐含着的。这一部分将内存拆分出来，再引入总线的概念，CPU 通过总线连接内存。

完整代码可以查看这个分支：https://github.com/weijiew/crvemu/tree/lab2-memory

实际上可以直接看代码，文章作为补充，这部分内容很简单。后续内容并没有完全将代码的所有修改列出来，建议快速浏览下面的内容有一个整体的认识后再结合代码学习。

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

代码已经正确使用了`constexpr`来声明编译时常量，这是现代 C++推荐的做法，因为它可以在编译时而不是运行时解析这些值，从而提高效率。没有需要修改的地方。关于 `constexpr` 可以进一步阅读这篇[文章](https://mp.weixin.qq.com/s?__biz=MjM5NjAxMzk4NA==&mid=2247484630&idx=1&sn=aa89172b2dbc39d464d4c9171ce66285&chksm=a6eef61991997f0fc9db27ad0b666b69fd4ce62442a796e85ecf4d651f67900f4394ec48110c&token=1088982746&lang=zh_CN#rd)。

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

下面是具体的代码：

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

Bus 是用来将不同的设备衔接起来，用于在不同组件之间传输数据的通信系统。总线在计算机架构中起到了重要的桥梁作用，连接了各个硬件组件，如处理器、内存、输入/输出设备等。

目前只需要将内存 Dram 连接起来即可，下面是 bus 头文件的定义：

```cpp
// bus.h
class Bus {
public:
    Bus(const std::vector<uint8_t>& code);

    uint64_t load(uint64_t addr, uint64_t size);
    void store(uint64_t addr, uint64_t size, uint64_t value);

private:
    Dram dram;
};
```

其中 load 用于同 Dram 交互读取数据，而 store 用于写入数据。接下来实现 load 和 store 方法。

### 3.1 Bus load store

下面是代码是对 Dram 的包装，首先要检验地址是否合法随后调用 Dram 的方法，反之报错。

```cpp
Bus::Bus(const std::vector<uint8_t>& code) : dram(code) {}

uint64_t Bus::load(uint64_t addr, uint64_t size) {
    if (addr >= DRAM_BASE && addr <= DRAM_END) {
        return dram.load(addr, size);
    } else {
        throw std::runtime_error("LoadAccessFault at address " + std::to_string(addr));
    }
}

void Bus::store(uint64_t addr, uint64_t size, uint64_t value) {
    if (addr >= DRAM_BASE && addr <= DRAM_END) {
        dram.store(addr, size, value);
    } else {
        throw std::runtime_error("StoreAMOAccessFault at address " + std::to_string(addr));
    }
}
```

## 4. CPU

上面已经将 Dram、Bus 剥离出来的，接下来需要修改 cpu.cpp 部分的代码，在其中增加 Bus 成员变量，通过 bus 调用 dram 进行读写。

随后删除 `std::vector<uint8_t> dram;` 成员变量，再提供对应的 store 和 load 方法同 dram 读写。

```cpp
class Cpu {
public:
    // ... 其他
    Bus bus;

    uint64_t load(uint64_t addr, uint64_t size);

    void store(uint64_t addr, uint64_t size, uint64_t value);

    uint32_t fetch();
};
```

### 4.1 load 和 store

接下来实现 load 方法：

```cpp
uint64_t Cpu::load(uint64_t addr, uint64_t size) {
    try {
        return bus.load(addr, size);
    } catch (const Exception& e) {
        std::cerr << "Exception load: " << e << std::endl;
    }
}
```

直接调去 bus 即可，两个参数分别为对应的地址和要读取数据的长度。

store 同上

```cpp
void Cpu::store(uint64_t addr, uint64_t size, uint64_t value) {
    try {
        bus.store(addr, size, value);
    } catch (const Exception& e) {
        std::cerr << "Exception store: " << e << std::endl;
    }
}
```

### 4.2 fetch

fetch 即获取 32 位长度的指令。

```cpp
uint32_t Cpu::fetch() {
    try {
        bus.load(pc, 32);
    } catch (const Exception& e) {
        std::cerr << "Exception fetch: " << e << std::endl;
    }
}
```

目前先解析 32 位，后续再进一步扩展。

不是所有的 RISC-V 指令都是固定的 32 位长度。RISC-V（Reduced Instruction Set Computing - V）是一种基于精简指令集（RISC）的开放标准架构，它提供了多种指令长度的选项，以适应不同的需求。

RISC-V 支持的指令长度包括 32 位、64 位和 128 位。最常见的是 RV32I、RV64I 和 RV128I，它们分别表示 32 位、64 位和 128 位的整数基本指令集。

例如，RV32I 指令是固定长度为 32 位的整数指令集，而 RV64I 则是 64 位的整数指令集。此外，RISC-V 还提供了扩展指令集，如 M 扩展用于整数乘法和除法，A 扩展用于原子操作，F 和 D 扩展用于浮点运算等。

总的来说，RISC-V 的灵活性使得它可以适应不同的应用领域，并且可以选择不同长度的指令集来平衡性能和资源的需求。

## 5. main

接下来更新 main 函数，读取指令的二进制形式随后执行。

```cpp
int main(int argc, char* argv[]) {
    if (argc != 2) {
        std::cout << "Usage:\n"
                  << "- ./program_name <filename>\n";
        return 0;
    }

    std::ifstream file(argv[1], std::ios::binary);
    if (!file) {
        std::cerr << "Cannot open file: " << argv[1] << std::endl;
        return 1;
    }

    std::vector<uint8_t> code(std::istreambuf_iterator<char>(file), {});
    Cpu cpu(code); // 假设Cpu类的构造函数接受指令代码的vector

    try {
        while (true) {
            uint32_t inst = cpu.fetch();
            auto new_pc = cpu.execute(inst);
            if (new_pc.has_value()) {
                cpu.pc = new_pc.value();
            } else {
                break;
            }
        }
    } catch (const Exception& e) {
        std::cerr << "Exception main: " << e << std::endl;
    }

    // 使用cpu对象进行操作
    cpu.dump_registers(); // 打印寄存器状态
    cpu.dump_pc();

    return 0;
}
```

将汇编编译为二进制的形式

```sh
$ riscv64-unknown-elf-gcc -Wl,-Ttext=0x0 -nostdlib -o add-addi add-addi.s
$ riscv64-unknown-elf-objcopy -O binary add-addi add-addi.bin
```

编译并执行指令，运行并测试是否正确：

```sh
mkdir -p build && cd build && cmake .. && make && ./crvemu ../add-addi.bin
```

## 6. 测试

此外本节内容引入了单元测试，将上面手动测试的过程封装为函数：

```sh
$ riscv64-unknown-elf-gcc -Wl,-Ttext=0x0 -nostdlib -o add-addi add-addi.s
$ riscv64-unknown-elf-objcopy -O binary add-addi add-addi.bin
```

下面是最终的单元测试：

```cpp
// 消除警告： warning: cannot find entry symbol _start; defaulting to 0000000000000000
const std::string start = ".global _start \n _start:";

// Test addi instruction
TEST(RVTests, TestAddi) {
     std::string code = start + "addi x31, x0, 42 \n";
    Cpu cpu = rv_helper(code, "test_addi", 1);
    EXPECT_EQ(cpu.regs[31], 42) << "Error: x31 should be 42 after ADDI instruction";
}

// Test add instruction
TEST(RVTests, TestAdd) {
    std::string code = ".global _start \n _start:"
                       "addi x2, x0, 10 \n"   // 将 10 加载到 x2 中
                       "addi x3, x0, 20 \n"   // 将 20 加载到 x3 中
                       "add x1, x2, x3 \n";  // x1 = x2 + x3
    Cpu cpu = rv_helper(code, "test_add", 3);

    // 验证 x1 的值是否正确
    EXPECT_EQ(cpu.regs[1], 30) << "Error: x1 should be the result of ADD instruction";
}
```

### 5.1 rv_helper

通过 rv_helper 函数实现了将字符串转为汇编、二进制再放入 CPU 中执行。

三个参数分别为汇编代码的字符串形式，测试对应的名称，待测试的指令个数。

```cpp
Cpu rv_helper(const std::string& code, const std::string& testname, size_t n_clock) {
    std::string filename = testname + ".s";
    // 创建并写入汇编文件
    std::ofstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Failed to create assembly file.");
    }
    file << code;
    file.close();

    // 生成目标文件和二进制文件
    generate_rv_obj(filename.c_str());
    generate_rv_binary(testname.c_str());

    // 读取二进制文件内容
    std::string binFilename = testname + ".bin";
    std::ifstream file_bin(binFilename, std::ios::binary);
    if (!file_bin.is_open()) {
        throw std::runtime_error("Failed to open binary file.");
    }
    std::vector<uint8_t> binaryCode((std::istreambuf_iterator<char>(file_bin)), std::istreambuf_iterator<char>());

    // 初始化CPU并执行指令
    Cpu cpu(binaryCode);
    for (size_t i = 0; i < n_clock; ++i) {
        try {
            uint64_t inst = cpu.fetch();
            auto new_pc = cpu.execute(inst);
            if (new_pc.has_value()) {
                cpu.pc = new_pc.value();
            } else {
                break;
            }
        } catch (const std::exception& e) {
            std::cerr << "CPU execution error: " << e.what() << std::endl;
            break;
        }
    }

    return cpu;
}
```

### 5.2 generate_rv_obj

此函数为 `riscv64-unknown-elf-gcc -Wl,-Ttext=0x0 -nostdlib -o add-addi add-addi.s` 对应的处理过程：

```cpp
void generate_rv_obj(const std::string& assembly) {
    // 使用C++的字符串处理能力来获取不含扩展名的文件名
    size_t dotPos = assembly.find_last_of(".");
    std::string baseName = (dotPos == std::string::npos) ? assembly : assembly.substr(0, dotPos);

    std::string command = "riscv64-unknown-elf-gcc -Wl,-Ttext=0x0 -nostdlib -o " + baseName + " " + assembly;

    // 执行命令
    int result = std::system(command.c_str());

    // 检查命令执行结果
    if (result != 0) {
        std::cerr << "Failed to generate RV object from assembly: " << assembly << std::endl;
    }
}
```

### 5.2 generate_rv_obj

此函数为 `riscv64-unknown-elf-gcc -Wl,-Ttext=0x0 -nostdlib -o add-addi add-addi.s` 对应的处理过程：

```cpp
void generate_rv_obj(const std::string& assembly) {
    // 使用C++的字符串处理能力来获取不含扩展名的文件名
    size_t dotPos = assembly.find_last_of(".");
    std::string baseName = (dotPos == std::string::npos) ? assembly : assembly.substr(0, dotPos);

    std::string command = "riscv64-unknown-elf-gcc -Wl,-Ttext=0x0 -nostdlib -o " + baseName + " " + assembly;

    // 执行命令
    int result = std::system(command.c_str());

    // 检查命令执行结果
    if (result != 0) {
        std::cerr << "Failed to generate RV object from assembly: " << assembly << std::endl;
    }
}
```

### 5.3 generate_rv_binary

此函数为 `riscv64-unknown-elf-objcopy -O binary add-addi add-addi.bin` 对应的处理过程：

```cpp
void generate_rv_binary(const std::string& obj) {
    // 构建llvm-objcopy命令行字符串
    std::string command = "riscv64-unknown-elf-objcopy -O binary " + obj + " " + obj + ".bin";

    // 执行命令
    int result = std::system(command.c_str());

    // 检查命令执行结果
    if (result != 0) {
        std::cerr << "Failed to generate RV binary from object: " << obj << std::endl;
    }
}
```

## 6. 总结

综上，这一章节将 dram 拆分出来作为一个单独的类，为了链接 dram 又引入了 bus 。并且将手动编译的过程改成函数，避免了手动执行，后续可以很方便的测试更多的指令。
