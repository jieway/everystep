这一节内容解析了更多的指令，并且提供了更详细的 log 输出从而进一步的定位问题。

具体代码可以参考这个分支的代码：https://github.com/weijiew/crvemu/tree/lab4-load-store

## 1. 使用 C++17 的结构化绑定

接下来使用 C++17 的结构化绑定来消除重复的逻辑。

### 1.1 修改前

下面是修改前的代码，其中提取指令对应字段的逻辑是重复的。可以写成一个函数专门解析字段，统一管理，这样避免了变动的时候多次修改。

```cpp
std::optional<uint64_t> executeAddi(Cpu& cpu, uint32_t inst) {
    uint32_t rd = (inst >> 7) & 0x1f;
    uint32_t rs1 = (inst >> 15) & 0x1f;
    int64_t immediate = static_cast<int32_t>(inst & 0xfff00000) >> 20;
    // ....
}

std::optional<uint64_t> executeSlli(Cpu& cpu, uint32_t inst) {
    uint32_t rd = (inst >> 7) & 0x1f;
    uint32_t rs1 = (inst >> 15) & 0x1f;
    int64_t immediate = static_cast<int32_t>(inst & 0xfff00000) >> 20;
    // ....
}
```

### 1.2 修改后

下面是修改后的代码，其中使用了 C++17 的结构化绑定的语法，如果不熟悉可以参考这篇文渣：[C++17 结构化绑定](https://mp.weixin.qq.com/s?__biz=MjM5NjAxMzk4NA==&mid=2247484593&idx=1&sn=5321a61750037c01b42b592d468bda23&chksm=a6eef67e91997f68d114261457cdeec6750e9731b87f7a24408ab3501cdfe6969f46d49453b7&token=1829762161&lang=zh_CN#rd) 。

```cpp
// 拆包解包
std::tuple<uint32_t, uint32_t, uint32_t> unpackInstruction(uint32_t inst) {
  return {
    (inst >> 7) & 0x1f,   // rd
    (inst >> 15) & 0x1f,  // rs1
    (inst >> 20) & 0x1f  // rs2
  };
}

std::optional<uint64_t> executeAddi(Cpu& cpu, uint32_t inst) {
  auto [rd, rs1, rs2] = unpackInstruction(inst);

  auto immediate = static_cast<int64_t>(static_cast<int32_t>(inst & 0xfff00000) >> 20);
  std::cout << "ADDI: x" << rd << " = x" << rs1 << " + " << immediate << std::endl;
  cpu.regs[rd] = cpu.regs[rs1] + immediate;
  return cpu.update_pc();
}
```

上面还用到了 tuple ，如果没有接触过可以参考这篇文章：[C++11 tuple](https://mp.weixin.qq.com/s?__biz=MjM5NjAxMzk4NA==&mid=2247484996&idx=1&sn=1d93d8792bb5ae8975f4ec20d78eaeb2&chksm=a6eef48b91997d9df849fb628092e066c8b52659b571e40a4dc0704441904b2236f59755356f&token=1829762161&lang=zh_CN#rd) 。

这个 commit 列出了引入该特性的所有相关变动：[feat: Add unpacking function for instruction parsing.](https://github.com/weijiew/crvemu/commit/89ee1d547e8828011dbbea4ca3169e863e913b22) 。

## 2. LOG 改造

这部分实现一个简单的 LOG 函数，将日志分级，并且不同级别的日志用不同颜色来打印，进一步完善输出，使得后续调试起来更高效。

此前是直接用 std::cout 输出，接下来用 LOG 来输出，具体的使用例子如何下。第一个参数为日志的级别，ERROR 用红色输出，INFO 用绿输出。

```cpp
bool Dram::store(uint64_t addr, uint64_t size, uint64_t value) {
  if (size != 8 && size != 16 && size != 32 && size != 64) {
    LOG(ERROR, "Invalid size for store operation: ", size, " bytes.");
    return false;
  }

  uint64_t nbytes = size / 8;
  std::size_t index = (addr - DRAM_BASE);
  if (index + nbytes > dram.size()) {
    LOG(ERROR, "Invalid address range for store operation at DRAM address ", addr);
    return false;
  }

  for (uint64_t i = 0; i < nbytes; ++i) {
    dram[index + i] = (value >> (i * 8)) & 0xFF;
  }

  LOG(INFO, "DRAM store successful. Value: ", value, " at address ", addr, " with size ", size, " bytes.");
  return true;
}
```

接下来讲解如何实现 LOG 函数。

### 2.1 实现 LOG

简单来说下面的代码定义了一些变量来区分不同颜色，第一个参数为 LOG 的级别，分别为 "DEBUG", "INFO", "WARNING", "ERROR" 并且对应不同的颜色。

ENABLE_DEBUG_PANIC 专门用来调试，出现 ERROR 的时候程序会终止，这个对调试帮助很大，否则需要从很多的日志中寻找 ERROR。

```cpp
constexpr std::string_view RED = "\033[0;31m";
constexpr std::string_view GREEN = "\033[0;32m";
constexpr std::string_view YELLOW = "\033[0;33m";
constexpr std::string_view BLUE = "\033[0;34m";
constexpr std::string_view DIM = "\033[0;37m";
constexpr std::string_view NC = "\033[0m";  // No color

// Log 级别
enum LogLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR
};

// 接受任何可以通过 << 输出的类型
template <typename T>
concept Printable = requires(std::ostream& os, T s) {
  os << s;
};

// 是否启用 debug panic 输出
constexpr bool ENABLE_DEBUG_PANIC = true;

// 打印日志函数，接受可打印类型的参数（Printable... Args）
template <Printable... Args>
void print_log(std::ostream& os, LogLevel level, Args&&... s) {
  // 定义日志级别字符串数组
  const char* levelStrings[] = {"DEBUG", "INFO", "WARNING", "ERROR"};
  // 定义颜色字符串视图数组，对应不同的日志级别
  const std::string_view colors[] = {BLUE, GREEN, YELLOW, RED};

  // 输出带颜色的日志级别标识
  os << colors[level] << "[" << levelStrings[level] << "] ";
  // 使用折叠表达式将所有参数连接到输出流中
  (os << ... << s);
  // 输出颜色结束标识（假设NC被定义为颜色结束符号）
  os << NC << '\n';

  // 如果日志级别为 ERROR 并且启用了 debug panic 输出，则调用 abort
  if (level == ERROR && ENABLE_DEBUG_PANIC) {
    std::cerr << "Error occurred. Aborting program." << std::endl;
    std::abort();
  }
}

#define LOG(level, ...)                                             \
  do {                                                              \
    print_log(std::cout, level, "In function ", __FUNCTION__, " (", \
    __FILE__, ':', __LINE__, "): ", __VA_ARGS__);                   \
  } while (0)
```

这个 commit 列出了所有的相关改动：[feat: add log.](https://github.com/weijiew/crvemu/commit/94782d78460f8739e4ab981dc195febfbb5c0093)

## 3. 指令解析

需要解析的指令有点多就不全部列出来了，暂时提供下面几个吧。

### 3.1 解析 Lui

LUI（Load Upper Immediate）指令用于加载一个立即数的高位到目标寄存器中。让我们通过一个具体的 RISC-V 汇编代码例子来说明 LUI 指令的用法。

考虑以下 RISC-V 汇编代码片段：

```
lui x1, 0x12345
```

这条指令的含义是将立即数 `0x12345` 的高 20 位加载到寄存器 `x1` 中。现在，让我们详细解释一下：

- `lui`: 这是 LUI 指令的助记符，表示 Load Upper Immediate。

- `x1`: 这是目标寄存器，即将要存储加载的高位数据的寄存器。在这个例子中，数据将被加载到寄存器 `x1` 中。

- `0x12345`: 这是立即数，即要加载的数值。在这个例子中，它是 `0x12345`。LUI 指令加载的是这个数值的高 20 位。

因此，这条指令的效果是将 `0x12345` 的高 20 位加载到寄存器 `x1` 中，低 12 位填充为零。请注意，LUI 指令不会修改目标寄存器的低 12 位。

这是一个简单的例子，但在实际的程序中，LUI 指令通常用于构建大于 32 位的立即数，以进行后续的运算或数据访问。

#### 使用场景

下面是 LUI 指令在 RISC-V 中有一些常见的应用场景，包括但不限于：

1. **设置绝对地址：** 在程序的初始化过程中，可以使用 LUI 指令将一个常数的高位加载到目标寄存器，从而设置某个全局变量或数据结构的绝对地址。

```
lui x1, 0x10000  # 将 0x10000 的高 20 位加载到 x1 寄存器，用于设置某个全局变量的地址
```

2. **构建大立即数：** LUI 指令通常与后续的指令（例如 ADDI）一起使用，以构建一个大于 32 位的立即数。这在一些需要处理大数据的计算中很有用。

```
lui x2, 0x12345  # 将 0x12345 的高 20 位加载到 x2 寄存器
addi x2, x2, 0x6789  # 将 0x6789 加到 x2 寄存器的低 12 位
```

3. **数据访问：** 在某些情况下，程序可能需要使用 LUI 指令加载某个数据结构的地址的高位，然后使用其他指令完成对该数据结构的访问。

```
lui x3, 0xA0000  # 将数据结构的地址的高 20 位加载到 x3 寄存器
lw x4, 0(x3)  # 通过 x3 寄存器访问数据结构
```

总的来说，LUI 指令用于初始化全局变量、构建大立即数以及设置绝对地址等场景。在程序的早期阶段，它通常用于初始化阶段，为后续的指令提供合适的立即数或地址。

#### 指令的二进制组成

LUI 指令的二进制表示有固定的格式，具体结构如下：

```
imm[31:12] | rd | opcode
```

其中：

- `imm[31:12]` 表示立即数的高 20 位，即 immediate 部分。
- `rd` 表示目标寄存器，即将加载的值存放到的寄存器。
- `opcode` 表示操作码，用于指定这是一条 LUI 指令。

让我们具体来看一个例子，假设我们有一条 LUI 指令，要将立即数 `0x12345` 的高 20 位加载到寄存器 `x1` 中：

1. **将立即数转换成二进制：**

   - `0x12345` 的二进制表示是 `0001 0010 0011 0100 0101`。
   - 取高 20 位，即 `0001 0010 0011 0100 0101`。

2. **寄存器选择：**

   - 假设我们要加载到 `x1` 寄存器，其寄存器编号是 `00001`。

3. **操作码选择：**
   - LUI 指令的操作码是 `0110111`。

将这些部分组合起来，我们得到这条 LUI 指令的二进制表示：

```
0001 0010 0011 0100 0101 | 00001 | 0110111
```

这就是将 `0x12345` 的高 20 位加载到 `x1` 寄存器的 LUI 指令的二进制表示。这个二进制序列可以被计算机硬件识别和执行。

#### 代码及测试

下面是 LUI 具体的解析函数及其对应的单元测试。

```cpp
std::optional<uint64_t> executeLui(Cpu& cpu, uint32_t inst) {
  auto [rd, rs1, rs2] = unpackInstruction(inst);
  auto immediate = static_cast<uint64_t>(inst & 0xfffff000);  // Extract the upper 20 bits
  LOG(INFO, "LUI: x", rd , " = ", immediate);
  cpu.regs[rd] = immediate;
  return cpu.update_pc();
}

TEST(RVTests, TestLui) {
  std::string code = start +
      "lui a0, 42 \n";      // Load 42 into a0
  Cpu cpu = rv_helper(code, "test_lui", 1);

  // Verify if x1 has the correct value
  EXPECT_EQ(cpu.regs[10], 42 << 12) << "Error: a0 should be the result of LUI instruction";
}
```

### 3.2 解析 AUIPC

AUIPC（Add Upper Immediate to PC）指令用于将一个立即数的高位与当前 PC（程序计数器）值相加，并将结果存储到目标寄存器中。让我们通过一个具体的 RISC-V 汇编代码例子来说明 AUIPC 指令的用法。

考虑以下 RISC-V 汇编代码片段：

```
auipc x1, 0x12345
```

这条指令的含义是将立即数 `0x12345` 的高 20 位与当前 PC 值相加，并将结果存储到寄存器 `x1` 中。现在，让我们详细解释一下：

- `auipc`: 这是 AUIPC 指令的助记符，表示 Add Upper Immediate to PC。

- `x1`: 这是目标寄存器，即将要存储加载的高位数据与 PC 相加的结果的寄存器。在这个例子中，数据将被加载到寄存器 `x1` 中。

- `0x12345`: 这是立即数，即要加载的数值。在这个例子中，它是 `0x12345`。AUIPC 指令加载的是这个数值的高 20 位。

- PC（程序计数器）：AUIPC 指令会将当前 PC 的值作为基础，与立即数的高 20 位相加。这是 AUIPC 指令与 LUI 指令的主要区别。

因此，这条指令的效果是将 `0x12345` 的高 20 位与当前 PC 值相加，然后将结果存储到寄存器 `x1` 中，低 12 位填充为零。请注意，AUIPC 指令不会修改目标寄存器的低 12 位。

这是一个简单的例子，但在实际的程序中，AUIPC 指令通常用于构建全局变量的地址或进行跳转。

#### 使用场景

下面是 AUIPC 指令在 RISC-V 中有一些常见的应用场景，包括但不限于：

1. **构建全局变量地址：** 在程序中，可以使用 AUIPC 指令将一个常数的高位与当前 PC 相加，从而构建全局变量的地址。

```
auipc x1, 0x10000  # 将 0x10000 的高 20 位与当前 PC 相加，用于构建全局变量的地址
```

2. **跳转目标的构建：** 在程序中，AUIPC 指令也常用于构建跳转指令的目标地址。

```
auipc x2, 0x20000  # 将 0x20000 的高 20 位与当前 PC 相加，用于构建跳转指令的目标地址
jalr x3, x2, 0    # 使用 jalr 指令跳转到 x2 寄存器指定的地址
```

3. **构建大立即数：** AUIPC 指令通常与后续的指令（例如 ADDI）一起使用，以构建一个大于 32 位的立即数。

```
auipc x4, 0x12345  # 将 0x12345 的高 20 位与当前 PC 相加，用于构建大立即数的高位
addi x4, x4, 0x6789  # 将 0x6789 加到 x4 寄存器的低 12 位
```

总的来说，AUIPC 指令用于构建全局变量地址、跳转目标地址以及构建大立即数等场景。在程序中，它通常用于初始化阶段，为后续的指令提供合适的地址或立即数。

#### 指令的二进制组成

AUIPC 指令的二进制表示有固定的格式，具体结构如下：

```
imm[31:12] | rd | opcode
```

其中：

- `imm[31:12]` 表示立即数的高 20 位，即 immediate 部分。
- `rd` 表示目标寄存器，即将加载的值存放到的寄存器。
- `opcode` 表示操作码，用于指定这是一条 AUIPC 指令。

让我们具体来看一个例子，假设我们有一条 AUIPC 指令，要将立即数 `0x12345` 的高 20 位与当前 PC 相加，并将结果加载到寄存器 `x1` 中：

1. **将立即数转换成二进制：**

   - `0x12345` 的二进制表示是 `0001 0010 0011 0100 0101`。
   - 取高 20 位，即 `0001 0010 0011 0100 0101`。

2. **寄存器选择：**

   - 假设我们要加载到 `x1` 寄存器，其寄存器编号是 `00001`。

3. **操作码选择：**
   - AUIPC 指令的操作码是 `0010111`。

将这些部分组合起来，我们得到这条 AUIPC 指令的二进制表示：

```
0001 0010 0011 0100 0101 | 00001 | 0010111
```

这就是将 `0x12345` 的高 20 位与当前 PC 相加，并将结果加载到 `x1` 寄存器的 AUIPC 指令的二进制表示。这个二进制序列可以被计算机硬件识别和执行。

#### 代码及测试

下面是 AUIPC 具体的解析函数及其对应的单元测试。

```cpp
std::optional<uint64_t> executeAUIPC(Cpu& cpu, uint32_t inst) {
  auto [rd, rs1, rs2] = unpackInstruction(inst);
  auto imm = static_cast<int64_t>(static_cast<int32_t>(inst & 0xfffff000));

  LOG(INFO, "AUIPC: x", rd, " = pc + ", imm);
  cpu.regs[rd] = cpu.pc + imm;
  return cpu.update_pc();
}

TEST(RVTests, TestAUIPC) {
  std::string code = start +
      "auipc a0, 42 \n";      // Load 15 into x2
  Cpu cpu = rv_helper(code, "test_auipc", 1);

  EXPECT_EQ(cpu.regs[10], DRAM_BASE + (42 << 12)) << "Error: a0 should be the result of AUIPC instruction";
}
```

在这个测试中添加了一个名为 `executeAuipc` 的函数，该函数负责解析并执行 AUIPC 指令。同时编写了一个名为 `TestAuipc` 的单元测试，用于验证 AUIPC 指令的正确性。

### 3.3 解析 JAL

JAL（Jump and Link）指令用于实现无条件跳转到目标地址，并将跳转前的地址保存到寄存器中，通常用于实现函数调用和子程序的跳转。让我们通过一个具体的 RISC-V 汇编代码例子来说明 JAL 指令的用法。

考虑以下 RISC-V 汇编代码片段：

```
jal x1, target_label
```

这条指令的含义是无条件跳转到 `target_label` 处，并将跳转前的地址保存到寄存器 `x1` 中。现在，让我们详细解释一下：

- `jal`: 这是 JAL 指令的助记符，表示 Jump and Link。

- `x1`: 这是目标寄存器，即将要存储跳转前地址的寄存器。在这个例子中，地址将被保存到寄存器 `x1` 中。

- `target_label`: 这是跳转的目标地址，通常是代码中的标签或具体的地址。

因此，这条指令的效果是无条件跳转到 `target_label` 处，并将跳转前的地址保存到寄存器 `x1` 中。

#### 使用场景

JAL 指令在 RISC-V 中有一些常见的应用场景，包括但不限于：

1. **函数调用：** 在程序执行中，JAL 指令通常用于实现函数的跳转和调用。通过 JAL 指令，程序可以跳转到函数的入口地址，并在跳转前将返回地址保存到寄存器中。

```
jal ra, my_function  # 跳转到 my_function 函数，并将返回地址保存到 ra 寄存器中
```

2. **异常处理：** 在一些情况下，当程序发生异常或中断时，JAL 指令可以用于跳转到相应的异常处理程序，并保存当前执行位置。

```
jal a0, exception_handler  # 跳转到异常处理程序，并将返回地址保存到 a0 寄存器中
```

3. **程序跳转：** JAL 也可以用于实现程序中的跳转，例如在某个条件下跳转到指定的标签或地址。

```
jal x2, target_label  # 无条件跳转到 target_label，并将跳转前的地址保存到 x2 寄存器中
```

总体来说，JAL 指令常用于实现程序的跳转和函数调用，通过保存返回地址，使得程序能够在需要时返回到跳转前的位置。

#### 指令的二进制组成

JAL 指令的二进制表示有固定的格式，具体结构如下：

```
imm[20] | imm[10:1] | imm[11] | imm[19:12] | rd | opcode
```

其中：

- `imm[20]` 表示立即数的最高位，即 immediate 部分的符号位。
- `imm[10:1]` 表示立即数的中间部分，即 immediate 的位 10 到位 1。
- `imm[11]` 表示立即数的第 11 位。
- `imm[19:12]` 表示立即数的最低部分，即 immediate 的位 19 到位 12。
- `rd` 表示目标寄存器，即将跳转前地址保存到的寄存器。
- `opcode` 表示操作码，用于指定这是一条 JAL 指令。

让我们具体来看一个例子，假设我们有一条 JAL 指令，要无条件跳转到 `target_label` 处，并将跳转前的地址保存到寄存器 `x1` 中：

1. **计算跳转偏移：**

   - 计算 `target_label` 相对于当前指令的偏移量。
   - 假设 `target_label` 的地址是 0x40001234，当前指令的地址是 0x40001000。
   - 则偏移量为 `0x1234 - 0x1000 = 0x234`.

2. **将偏移量转换成二进制：**

   - `0x234` 的二进制表示是 `0010 0011 0100`.

3. **符号扩展：**

   - 将二进制偏移量符号扩展为 21 位，即 `0000 0000 0010 0011 0100`.

4. **寄存器选择：**

   - 假设我们要将返回地址保存到 `x1` 寄存器，其寄存器编号是 `00001`。

5. **操作码选择：**
   - JAL 指令的操作码是 `1101111`。

将这些部分组合起来，我们得到这条 JAL 指令的二进制表示：

```
0 | 0000 0000 0010 0011 0100 | 1 | 00001 | 1101111
```

这就是无条件跳转到 `target_label` 处，并将跳转前的地址保存到 `x1` 寄存器中的 JAL 指令的二进制表示。这个二进制序列可以被计算机硬件识别和执行。

#### 代码及测试

下面是 JAL 具体的解析函数及其对应的单元测试。

```cpp
std::optional<uint64_t> executeJAL(Cpu& cpu, uint32_t inst) {
  auto [rd, rs1, rs2] = unpackInstruction(inst);
  auto imm = ((inst & 0x80000000) ? 0xfff00000 : 0) |
             ((inst >> 20) & 0x7fe) |
             ((inst >> 9) & 0x800) |
             ((inst >> 12) & 0xff);

  LOG(INFO, "JAL: x", rd, " = pc + 4; pc = pc + ", imm);
  cpu.regs[rd] = cpu.pc + 4;
  return cpu.pc + imm;
}

TEST(RVTests, TestJAL) {
      std::string code = start +
        "jal a0, 42\n";
      Cpu cpu = rv_helper(code, "test_jal", 1);
      EXPECT_EQ(cpu.regs[10], DRAM_BASE + 4)
          << "Error: a0 should be the result of JAL instruction";
      EXPECT_EQ(cpu.pc, DRAM_BASE + 42)
          << "Error: pc should be the target address after JAL instruction";
}
```

### 3.4 解析 JALR

JALR（Jump and Link Register）指令用于实现通过寄存器间接跳转，并将跳转前的地址保存到目标寄存器中，通常用于实现函数调用和子程序的跳转。让我们通过一个具体的 RISC-V 汇编代码例子来说明 JALR 指令的用法。

考虑以下 RISC-V 汇编代码片段：

```
jalr x1, x2, 0x100
```

这条指令的含义是通过寄存器 `x2` 中的地址加上立即数 `0x100` 进行跳转，并将跳转前的地址保存到寄存器 `x1` 中。现在，让我们详细解释一下：

- `jalr`: 这是 JALR 指令的助记符，表示 Jump and Link Register。

- `x1`: 这是目标寄存器，即将要存储跳转前地址的寄存器。在这个例子中，地址将被保存到寄存器 `x1` 中。

- `x2`: 这是用于间接跳转的寄存器，其内容是跳转目标地址。

- `0x100`: 这是立即数偏移，表示相对于寄存器 `x2` 中的地址的偏移。

因此，这条指令的效果是通过寄存器间接跳转到 `x2 + 0x100` 处，并将跳转前的地址保存到寄存器 `x1` 中。

#### 使用场景

JALR 指令在 RISC-V 中有一些常见的应用场景，包括但不限于：

1. **函数调用：** 在程序执行中，JALR 指令通常用于实现函数的间接跳转和调用。通过 JALR 指令，程序可以跳转到由寄存器指定的函数入口地址，并在跳转前将返回地址保存到另一个寄存器中。

```
jalr ra, x3, 0x0  # 通过 x3 寄存器中的地址间接跳转，并将返回地址保存到 ra 寄存器中
```

2. **异常处理：** 在一些情况下，当程序发生异常或中断时，JALR 指令可以用于间接跳转到相应的异常处理程序，并保存当前执行位置。

```
jalr a0, x4, 0x200  # 通过 x4 寄存器中的地址间接跳转，并将返回地址保存到 a0 寄存器中
```

3. **程序跳转：** JALR 也可以用于实现程序中的间接跳转，例如在某个条件下跳转到由寄存器指定的地址。

```
jalr x5, x6, -8  # 通过 x6 寄存器中的地址间接跳转，并将返回地址保存到 x5 寄存器中，同时减去偏移 8
```

总体来说，JALR 指令常用于实现程序的间接跳转和函数调用，通过保存返回地址，使得程序能够在需要时返回到跳转前的位置。

#### 指令的二进制组成

JALR 指令的二进制表示有固定的格式，具体结构如下：

```
imm[11:0] | rd | funct3 | rs1 | opcode
```

其中：

- `imm[11:0]` 表示立即数的偏移，即 immediate 部分。
- `rd` 表示目标寄存器，即将跳转前地址保存到的寄存器。
- `funct3` 表示功能码，用于指定具体的 JALR 操作。
- `rs1` 表示用于间接跳转的寄存器。
- `opcode` 表示操作码，用于指定这是一条 JALR 指令。

让我们具体来看一个例子，假设我们有一条 JALR 指令，要通过寄存器 `x2` 中的地址加上立即数 `0x100` 进行跳转，并将跳转前的地址保存到寄存器 `x1` 中：

1. **将立即数转换成二进制：**

   - `0x100` 的二进制表示是 `0001 0000 0000`.

2. **寄存器选择：**

   - 假设我们要将返回地址保存到 `x1` 寄存器，其寄存器编号是 `00001`。
   - 用于间接跳转的寄存器是 `x2`，其寄存器编号是 `00010`。

3. **功能码选择：**

   - 假设 JALR 的功能码是 `110`。

4. **操作码选择：**
   - JALR 指令的操作码是 `1100111`。

将这些部分组合起来，我们得到这条 JALR 指令的二进制表示：

```
0001 0000 0000 | 00001 | 110 | 00010 | 1100111
```

这就是通过寄存器 `x2` 中的地址加上立即数 `0x100` 进行跳转，并将跳转前的地址保存到寄存器 `x1` 中的 JALR 指令的二进制表示。这个二进制序列可以被计算机硬件识别和执行。

#### 代码及测试

下面是 JALR 具体的解析函数及其对应的单元测试。

```cpp
std::optional<uint64_t> executeJALR(Cpu& cpu, uint32_t inst) {
  auto [rd, rs1, rs2] = unpackInstruction(inst);
  auto imm = static_cast<int64_t>(static_cast<int32_t>(inst & 0xfff00000) >> 20);

  uint64_t t = cpu.pc + 4;
  uint64_t new_pc = (cpu.regs[rs1] + imm) & ~1;

  LOG(INFO, "JALR: x", rd, " = pc + 4; pc = (x", rs1, " + ", imm, ") & ~1");
  cpu.regs[rd] = t;
  return new_pc;
}

TEST(RVTests, TestJALR) {
      std::string code = start +
        "addi a1, zero, 42\n"
        "jalr a0, -8(a1)\n";
      Cpu cpu = rv_helper(code, "test_jalr", 2);

      EXPECT_EQ(cpu.regs[10], DRAM_BASE + 8)
          << "Error: a0 should be the result of JALR instruction";
      EXPECT_EQ(cpu.pc, 34)
          << "Error: pc should be 34 after JALR instruction";
}
```
