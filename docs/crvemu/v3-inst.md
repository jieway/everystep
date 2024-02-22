# 指令解析

这章内容进一解析更多的指令，此外将解析指令的过程拆分为一个单独的类，采用表格驱动的方式，将数据和逻辑分离，降低了 if else 嵌套层数过多。

这部分依旧改动不多，只增加了七个指令。此外代码中细碎的变动没有完全列出来，下面只是主体部分的更新，可以尝试自己动手实现，如果简单抄一遍是没有成长的，总之需要在解决问题中加深印象。可以参考这个分支的代码：https://github.com/weijiew/crvemu/tree/lab3-inst

## 1. InstructionExecutor

接下来首先将指令解析拆分为一个单独的类 InstructionExecutor ，用来专门解析指令。

```cpp
class InstructionExecutor {
public:
  static std::optional<uint64_t> execute(Cpu& cpu, uint32_t inst);
};
```

### 1.2 Cpu::execute

将 CPU 中的 execute 方法改为下面的形式：

```cpp
std::optional<uint64_t>  Cpu::execute(uint32_t inst) {
  auto exe = InstructionExecutor::execute(*this, inst);
  if (exe.has_value()) {
    return exe;
  }
  return std::nullopt;
}
```

此前将所有指令解析都放入了一个 switch 来维护，但是解析指令的个数一增加就难以维护了。

### 1.3 InstructionExecutor::execute

接下来讲解 `InstructionExecutor::execute` 如何实现表格驱动的方式来解析指令：

```cpp
std::optional<uint64_t> executeAddi(Cpu& cpu, uint32_t inst) {
    uint32_t rd = (inst >> 7) & 0x1f;
    uint32_t rs1 = (inst >> 15) & 0x1f;
    int64_t immediate = static_cast<int32_t>(inst & 0xfff00000) >> 20;

    std::cout << "ADDI: x" << rd << " = x" << rs1 << " + " << immediate << std::endl;
    cpu.regs[rd] = cpu.regs[rs1] + immediate;
    return cpu.update_pc();
}

std::optional<uint64_t> InstructionExecutor::execute(Cpu& cpu, uint32_t inst) {
  uint32_t opcode = inst & 0x7f;
  uint32_t funct3 = (inst >> 12) & 0x7;

  // x0 is hardwired zero
  cpu.regs[0] = 0;
  std::cout << "Executing instruction: 0x" << std::hex << opcode <<
    ", funct3: 0x" << funct3 << std::dec << std::endl;

  std::unordered_map<
      std::tuple<uint32_t, uint32_t>,
      std::function<std::optional<uint64_t>(Cpu&, uint32_t)>
  > instructionMap = {
    {std::make_tuple(0x13, 0x0), executeAddi},
    {std::make_tuple(0x13, 0x1), executeSlli},
    {std::make_tuple(0x13, 0x2), executeSlti},
    {std::make_tuple(0x13, 0x3), executeSltiu},
    {std::make_tuple(0x13, 0x4), executeXori},
    {std::make_tuple(0x13, 0x5), executefunct70X5},
    {std::make_tuple(0x13, 0x6), executeOri},
    {std::make_tuple(0x13, 0x7), executeAndi},
    {std::make_tuple(0x33, 0x0), executeAdd},
  };

  auto it = instructionMap.find({opcode, funct3});
  if (it != instructionMap.end()) {
    return it->second(cpu, inst);
  }
    // 确保所有可能的执行路径都有明确的返回值
}
```

其中维护了一张哈希表，key 是有 opcode 和 funct3 组成，value 对应解析指令的函数。

当执行的时候会根据解析出来 opcode 和 funct3 用来进一步跳转到对应的指令。

此外采用 C++17 optional 来控制处理错误，这也是为什么最后一行找不到的时候会返回 `return std::nullopt;` 。这部分内容可以进一步阅读这篇文章：[C++17 optional](https://mp.weixin.qq.com/s?__biz=MjM5NjAxMzk4NA==&mid=2247484649&idx=1&sn=e70aa7b0615c211a7bca50d7f601374b&chksm=a6eef62691997f3068e72eb2a3d68c3655b419f7b454e58966b1ea9ca47478746c8ff76a8dff&token=1088982746&lang=zh_CN#rd) 其中给出了 optional 出来之前是如何处理的，存在哪些问题，出现之后又是如何处理的。

### 1.2 funct7

注意 `{std::make_tuple(0x13, 0x5), executefunct70X5},` 对应了多个指令。

因为所有的指令都需要 opcode 和 funct3 定位，但有时候需要 funct7 进一步区分。下面的函数就是做了进一步的跳转。

```cpp
std::optional<uint64_t> executefunct70X5(Cpu& cpu, uint32_t inst) {
  uint32_t funct7 = (inst & 0xfe000000) >> 25;
  std::cout << "Executing srli or srai funct7: 0x" << std::hex << funct7 << std::dec << std::endl;
  switch (funct7) {
    // srli
    case 0x00: {
      return executeSrli(cpu, inst);
    }
    // srai
    case 0x20: {
      return executeSrai(cpu, inst);
    }
    default:
      return std::nullopt;
  }
}
```

## 2.1 指令解析

从下面的维护的哈希表中我们已经能够看到接下来需要进一步解析的指令，此前 addi 和 add 已经解析完成了的。

```cpp
  std::unordered_map<
      std::tuple<uint32_t, uint32_t>,
      std::function<std::optional<uint64_t>(Cpu&, uint32_t)>
  > instructionMap = {
    {std::make_tuple(0x13, 0x0), executeAddi},
    {std::make_tuple(0x13, 0x1), executeSlli},
    {std::make_tuple(0x13, 0x2), executeSlti},
    {std::make_tuple(0x13, 0x3), executeSltiu},
    {std::make_tuple(0x13, 0x4), executeXori},
    {std::make_tuple(0x13, 0x5), executefunct70X5},
    {std::make_tuple(0x13, 0x6), executeOri},
    {std::make_tuple(0x13, 0x7), executeAndi},
    {std::make_tuple(0x33, 0x0), executeAdd},
  };
```

新增加的指令都属于 RISC-V 指令集中的 I（立即数）类型指令和 R（寄存器-寄存器）类型指令的一部分，用于进行基本的整数运算和逻辑操作。以下是每个指令的功能和类别：

1. **Slli (Shift Left Logical Immediate)**

   - **类型：** I 类型指令
   - **功能：** 逻辑左移，将寄存器中的数值左移一个指定的位数（由立即数字段指定）。

2. **Slti (Set Less Than Immediate)**

   - **类型：** I 类型指令
   - **功能：** 将寄存器中的数值与立即数进行有符号比较，如果寄存器的值小于立即数，则将目标寄存器设置为 1，否则为 0。

3. **Sltiu (Set Less Than Immediate Unsigned)**

   - **类型：** I 类型指令
   - **功能：** 与 Slti 类似，但是进行的是无符号比较。

4. **Xori (XOR Immediate)**

   - **类型：** I 类型指令
   - **功能：** 对寄存器中的数值与立即数进行异或操作。

5. **Ori (OR Immediate)**

   - **类型：** I 类型指令
   - **功能：** 对寄存器中的数值与立即数进行按位或操作。

6. **Andi (AND Immediate)**

   - **类型：** I 类型指令
   - **功能：** 对寄存器中的数值与立即数进行按位与操作。

7. **Srli (Shift Right Logical Immediate)**

   - **类型：** I 类型指令
   - **功能：** 逻辑右移，将寄存器中的数值右移一个指定的位数（由立即数字段指定）。

8. **Srai (Shift Right Arithmetic Immediate)**
   - **类型：** I 类型指令
   - **功能：** 算术右移，将寄存器中的数值右移一个指定的位数（由立即数字段指定），保持符号位不变。

这些指令提供了基本的算术运算和位操作，用于实现诸如加法、减法、逻辑运算等基本操作，是 RISC-V 指令集中用于处理整数数据的关键部分。

### 2.2 SLLI 指令格式

RISC-V 指令 `SLLI`（Shift Left Logical Immediate）用于将寄存器中的值左移指定的位数，然后将结果存储回寄存器。下面是 `SLLI` 指令的内部组成以及一个文本图形化的表示：

```
31              20        15     10        6          0
+----------------+---------+-----+---------+----------+
|   imm[11:0]    |  shamt  |  rd |  funct3 |  opcode  |  I-type
+----------------+---------+-----+---------+----------+
```

- `imm[11:0]`: 12 位的立即数，表示左移的位数。
- `shamt`: 移位操作数，指定左移的位数，范围为 0 到 31。
- `rd`: 目标寄存器，用于存储结果。
- `funct3`: 功能字段，对于 `SLLI` 指令为 001。
- `opcode`: 操作码字段，指定指令类型。

例子：

假设有以下 `SLLI` 指令：

```
SLLI x1, x2, 4
```

这表示将寄存器 `x2` 中的值左移 4 位，并将结果存储回 `x1`。在文本图形化的内部表示中：

```
  000000000100  10000  00001  001  0110011
  imm[11:0]    shamt    rd   funct3   opcode
```

- `imm[11:0]` 是 000000000100，表示左移的位数为 4。
- `shamt` 是 10000，也就是 4 的二进制表示。
- `rd` 是 00001，表示目标寄存器为 `x1`。
- `funct3` 是 001，表示 `SLLI` 操作。
- `opcode` 是 0110011，表示 R-type 操作。

因此，`SLLI x1, x2, 4` 的二进制表示为 `00000000010010000000010010110011`。

使用场景：

`SLLI` 指令通常用于位操作，例如在实现算法时需要将某个寄存器中的值左移一定位数，以进行乘法或其他算术运算。这在编写低级别的系统软件或底层硬件控制程序时可能会经常遇到。例如，在实现加密算法或图形处理器中，位操作是常见的操作之一。

### 2.3 SLTI

`slti` 是一条有符号立即数比较指令，用于将一个寄存器的值与一个立即数进行比较。下面是 `slti` 指令的内部组成的文本图形表示：

```
  [  immediate  ] [  rs1  ] [  funct3  ] [  rd  ] [ opcode ]
   31          20 19     15 14        12 11    7  6       0
```

- `opcode`：操作码字段，指定指令的类型。
- `rd`：目标寄存器，用于存储比较结果。
- `funct3`：功能码字段，用于指定具体的比较操作。
- `rs1`：源寄存器，包含待比较的值。
- `immediate`：立即数，与源寄存器的值进行比较。

具体来说，`slti` 的操作是将 `rs1` 中的值与有符号的 `immediate` 相比较，如果 `rs1` 的值小于 `immediate`，则将目标寄存器 `rd` 设置为 1，否则设置为 0。

以下是一个例子，假设我们有如下 RISC-V 汇编代码：

```
slti x3, x1, 10
```

这条指令的意思是将寄存器 `x1` 中的值与立即数 `10` 进行比较，如果 `x1` 的值小于 `10`，则将寄存器 `x3` 设置为 1，否则设置为 0。这样，`x3` 将存储比较的结果，表示 `x1 < 10` 的情况。

### 2.4 SRAI

"SRAI" 的完整展开是 "Shift Right Arithmetic Immediate"，其中：

- "S" 表示 "Shift"，表示进行位移操作。
- "RA" 表示 "Right Arithmetic"，表示是算术右移，即在右移时保持符号。
- "I" 表示 "Immediate"，表示使用一个立即数值来指定移动的位数。

因此，"SRAI" 用于对有符号整数执行算术右移操作，移动的位数由一个立即数值指定。

下面是一个 RISC-V 汇编指令的示例：

```
SRAI x1, x2, 2
```

这意味着：进行算术右移立即数操作，取寄存器 `x2` 中的值，将其算术右移 2 位，然后将结果存储在寄存器 `x1` 中。

## 3. 测试

因为上一部分已经增加了编译和运行汇编代码的工具函数，接下来可以直接调用：

```cpp
    TEST(RVTests, TestSlli) {
        std::string code = start +
            "addi x2, x0, 5 \n"    // Load 5 into x2
            "slli x1, x2, 3 \n";   // x1 = x2 << 3
        Cpu cpu = rv_helper(code, "test_slli", 2);

        // Verify if x1 has the correct value
        EXPECT_EQ(cpu.regs[1], 5 << 3) << "Error: x1 should be the result of SLLI instruction";
    }

    // Test slti instruction
    TEST(RVTests, TestSlti) {
        std::string code = start +
            "addi x2, x0, 8 \n"    // 将 8 加载到 x2 中
            "slti x1, x2, 10 \n";  // x1 = (x2 < 10) ? 1 : 0
        Cpu cpu = rv_helper(code, "test_slti", 2);

        // 验证 x1 的值是否正确
        EXPECT_EQ(cpu.regs[1], 1) << "Error: x1 should be the result of SLTI instruction";
    }
```

上面只是一部分内容，变动没有完全列出，需要参考代码来实现。下一节会解析更多的指令，并且引入一些现代 C++ 新特性并完善工具类。
