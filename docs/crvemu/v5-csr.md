RISC-V 为每个 hart 定义了一个独立的控制状态寄存器（CSR）地址空间，提供了 4096 个独立的寄存器位置。每个 hart 都可以通过这个独立的 CSR 地址空间来配置、管理和监控其执行环境，实现对其控制状态的细粒度操作。

接下来讲解什么是 hart ，随后实现 CSR 。

## Hart

在 RISC-V 架构中，"hart"是指硬件线程（Hardware Thread）的缩写。hart 表示在该架构中执行指令的硬件线程或处理器核心。

每个 hart 都是一个独立的执行单元，包含一套完整的处理器资源，如寄存器文件、执行单元和控制逻辑。RISC-V 架构的设计允许多个 harts 同时存在，从而支持多核处理器。这种设计使得 RISC-V 在不同系统中可以以不同的方式配置，适应各种应用场景，从嵌入式系统到高性能计算。

让我们通过一个简单的例子来理解 RISC-V hart 的概念。假设我们有一个双核 RISC-V 处理器，其中每个核心都是一个独立的 hart。在这个双核处理器中，可以同时执行两个不同的程序或任务，每个核心都有自己的寄存器文件、执行单元和缓存。

```plaintext
   +--------------------------+
   |      Core 0 (Hart 0)      |
   |                          |
   |   Register File, ALU,    |
   |   Cache, Control Logic   |
   +--------------------------+
               |
   +--------------------------+
   |      Core 1 (Hart 1)      |
   |                          |
   |   Register File, ALU,    |
   |   Cache, Control Logic   |
   +--------------------------+
```

在这个例子中，我们有两个 harts，即两个独立的核心，每个核心都有自己的硬件资源。这允许并行执行两个不同的任务，提高了整个系统的性能。每个 hart 都有一个唯一的标识符（通常称为 hart ID），以区分不同的硬件线程。

总体而言，RISC-V hart 的概念体现了 RISC-V 架构的灵活性，使其能够适应各种不同的系统架构和应用需求，从而促进了 RISC-V 在各种计算平台上的广泛应用。

### Hart 和 CPU 的关系

在 RISC-V 架构中，"hart"（硬件线程）和"CPU"（中央处理单元）之间存在一种直接关系，但它们并不完全等同。下面解释一下它们之间的关系：

1. **Hart（硬件线程）：** Hart 是指在 RISC-V 处理器中独立的硬件执行线程。每个 hart 都有自己的寄存器文件（包括通用寄存器和特殊寄存器）、执行单元、控制逻辑等硬件资源。Hart 的概念强调硬件执行线程的独立性，因此在一个多核 RISC-V 处理器中，每个核心就是一个独立的 hart。

2. **CPU（中央处理单元）：** CPU 是一个更广泛的术语，通常指整个中央处理单元，包括执行指令的硬件和相关的控制逻辑。在一个多核 RISC-V 处理器中，每个核心（hart）都有自己的 CPU，因为它包含了执行指令所需的全部硬件资源。因此，一个多核 RISC-V 处理器中有多个 CPU，每个 CPU 对应一个独立的 hart。

简而言之，hart 是 CPU 内部的硬件线程，一个多核 RISC-V 处理器中的每个核心就是一个 hart，而每个 hart 都有自己的 CPU。多个 harts 可以在同一处理器芯片上共存，共享一些系统资源（如内存），但它们是相对独立的硬件执行单元。

### 一个 CPU 对应一个 hart ？

不一定。在 RISC-V 架构中，一个 CPU 可以包含多个 harts（硬件线程）。RISC-V 的设计允许在一个物理处理器芯片上集成多个独立的 hart，这些 harts 可以共享一些资源（如内存），但它们是相对独立的执行单元。

因此，一个物理 CPU 上可以有多个 harts，每个 hart 都有自己的寄存器文件、执行单元和控制逻辑。这种设计支持多核处理器，其中每个核心都对应一个独立的 hart。在这种情况下，一个物理 CPU 上的多个 harts 可以并行执行不同的任务，提高系统的整体性能。

总之，在 RISC-V 架构中，一个 CPU 可以包含一个或多个 harts，这取决于具体的实现和系统设计。

## 特权级别

RISC-V 架构定义了三种特权等级，这些等级对应于不同的操作系统和应用场景。这三种特权等级分别是：

1. **用户态（User Mode）：** 用户态是 RISC-V 中最低特权等级。在用户态下，程序运行在用户空间，只能访问被允许的资源和寄存器。用户态是用于执行普通应用程序的特权级别。

2. **监管态（Supervisor Mode）：** 监管态是 RISC-V 中介于用户态和机器态之间的特权等级。在监管态下，操作系统内核运行，具有更高的特权级别，可以执行特权指令，访问更多的寄存器和资源。监管态用于操作系统的内核代码执行。

3. **机器态（Machine Mode）：** 机器态是 RISC-V 中最高的特权等级。在机器态下，处理器拥有最大的权限，可以执行所有指令、访问所有寄存器和系统资源。机器态主要用于处理器的初始化、系统的引导和一些底层的系统管理任务。

这些特权等级的引入旨在提供对处理器和系统资源的不同级别的访问权限。用户态提供了最低的权限，限制了对系统资源的直接访问，从而增加了系统的安全性。监管态在用户态和机器态之间提供了一个中间层，用于运行操作系统内核。机器态具有最高的权限，适用于系统的底层管理和初始化。

在 RISC-V 中，切换不同特权等级是通过特权级别切换的 CSR（控制状态寄存器）指令来完成的。这些特权级别的设计使得 RISC-V 架构灵活适应不同的系统需求，从嵌入式系统到高性能计算。

### hart 和特权级别

在 RISC-V 架构中，每个 hart（硬件线程）在任意时刻都会运行在某种特权等级上。特权等级表示了该 hart 当前操作所拥有的权限级别，可以是用户态、监管态或机器态中的一种。

让我们通过一个简单的例子来理解这个概念。假设我们有一个 RISC-V 处理器，其中包含一个 hart，并且这个处理器支持用户态、监管态和机器态这三种特权等级。

在处理器启动时，该 hart 可能最初处于机器态，执行一些底层的系统初始化任务。随后，当执行用户程序时，该 hart 可能切换到用户态，其中它只能访问被允许的资源。当用户程序需要进行某些系统调用或需要执行特权指令时，该 hart 可能会通过修改 CSR（控制状态寄存器）的值来切换到监管态，从而提升其权限级别。在监管态中，hart 可以执行一些操作系统内核的任务。

在上述例子中，特权等级的切换通过修改 CSR 完成，CSR 中保存了当前 hart 所在的特权等级。这样的设计允许系统在运行时动态地切换特权等级，从而灵活地管理和调整系统的运行状态。

总体而言，RISC-V 的特权等级概念提供了一种灵活的机制，使得不同任务和系统级别的代码可以在同一个 hart 上运行，同时确保系统的安全性和稳定性。在后续章节中，对特权等级的更详细讨论可能会涉及到 CSR 的具体使用和特权级别切换的细节。

## CSR

Hart（硬件线程）和 CSR（控制状态寄存器）之间的关系在 RISC-V 架构中非常密切。CSR 用于配置、管理和监控每个 hart 的执行环境，确保对系统行为的细粒度控制。以下是 hart 和 CSR 之间关系的一些关键点：

1. **Hart 的独立性：** 每个 hart 都有自己独立的 CSR 空间。这意味着每个硬件线程可以配置和控制其自身的状态，而不会直接影响其他 harts。

2. **CSR 用于配置和控制：** CSR 包含一系列寄存器，用于控制和配置 hart 的各个方面，例如中断使能、时钟设置、异常处理等。通过对 CSR 的读写，软件可以调整和管理每个 hart 的执行环境。

3. **特权级别切换：** CSR 中的一些寄存器用于管理 hart 的特权级别。通过修改这些寄存器的值，可以在用户态、监管态和机器态之间切换，提供不同特权级别下的权限和访问控制。

4. **上下文保存与恢复：** CSR 中的一些寄存器用于保存和恢复 hart 的上下文信息。在上下文切换时，处理器会保存当前 hart 的状态到 CSR 中，然后加载新任务的状态。

5. **中断和异常处理：** CSR 也与中断和异常处理相关。中断使能、中断掩码等设置都通过 CSR 进行。当发生中断或异常时，相关的状态信息也会被保存到 CSR 中，以便后续的处理程序能够正确执行。

总体而言，CSR 为每个 hart 提供了一个独立的、可编程的控制接口，用于管理和配置其执行环境。这种设计允许系统在运行时动态地调整每个 hart 的状态，提供了对系统行为更细粒度的控制。在多核处理器中，每个 hart 都可以通过 CSR 实现对自身的独立配置和控制。

### 设计 CSR

`Csr`类是一个用于处理 RISC-V 架构中的控制和状态寄存器（CSR）的类。在 RISC-V 架构中，CSR 是一种特殊类型的寄存器，用于控制处理器的各种功能，包括中断处理、异常处理、性能监视等。下面是 CSR 对应的头文件。

```cpp
class Csr {
public:
  Csr();  // 构造函数
  void dump_csrs() const;  // 打印所有的CSR
  uint64_t load(size_t addr) const;  // 加载指定地址的CSR
  void store(size_t addr, uint64_t value);  // 存储值到指定地址的CSR
  bool is_medelegated(uint64_t cause) const;  // 检查是否有机器异常委托
  bool is_midelegated(uint64_t cause) const;  // 检查是否有机器中断委托

private:
  std::array<uint64_t, NUM_CSRS> csrs;  // 存储CSR的数组
};
```

在 Cpu.h 中增加 Csr 成员变量，并且更新构造函数，增加 Csr 对应的成员构造函数。

### Csr::load

下面代码是`Csr`类中的`load`方法的实现。`Csr`类表示控制状态寄存器（CSR）。

`load`方法接受一个地址作为参数，然后返回该地址的 CSR 的值。这个方法使用了一个`switch`语句来处理不同的地址。

- 当地址是`SIE`时，它返回`MIE`寄存器和`MIDELEG`寄存器的位与结果。这表示获取中断使能状态。
- 当地址是`SIP`时，它返回`MIP`寄存器和`MIDELEG`寄存器的位与结果。这表示获取中断挂起状态。
- 当地址是`SSTATUS`时，它返回`MSTATUS`寄存器和`MASK_SSTATUS`的位与结果。这表示获取特权级状态。
- 对于其他地址，它直接返回该地址的 CSR 的值。

这个方法的返回类型是`uint64_t`，表示它返回一个 64 位的无符号整数。

```cpp
uint64_t Csr::load(size_t addr) const {
  switch (addr) {
    case SIE:
      return csrs[MIE] & csrs[MIDELEG];
    case SIP:
      return csrs[MIP] & csrs[MIDELEG];
    case SSTATUS:
      return csrs[MSTATUS] & MASK_SSTATUS;
    default:
      return csrs[addr];
  }
}
```

在这段代码中，`SIE`，`SIP`和`SSTATUS`是控制状态寄存器（CSR）的地址。这些地址对应的 CSR 有特殊的含义和用途。

- `SIE`（Supervisor Interrupt Enable）：这是一个控制寄存器，用于控制在 Supervisor 模式下哪些中断是被允许的。在这段代码中，`csrs[MIE] & csrs[MIDELEG]`表示获取在 MIE（Machine Interrupt Enable）寄存器中被允许并且在 MIDELEG（Machine Interrupt Delegation）寄存器中被委托到 Supervisor 模式的中断。

- `SIP`（Supervisor Interrupt Pending）：这是一个状态寄存器，用于表示在 Supervisor 模式下哪些中断是挂起的。在这段代码中，`csrs[MIP] & csrs[MIDELEG]`表示获取在 MIP（Machine Interrupt Pending）寄存器中被挂起并且在 MIDELEG 寄存器中被委托到 Supervisor 模式的中断。

- `SSTATUS`（Supervisor Status）：这是一个状态寄存器，用于保存和恢复 Supervisor 模式下的状态。在这段代码中，`csrs[MSTATUS] & MASK_SSTATUS`表示获取 MSTATUS（Machine Status）寄存器中的 Supervisor 模式的状态。

这些寄存器在处理中断和异常，以及在不同的特权级之间切换时非常重要。

### CSR 指令

CSR 指令是 RISC-V 架构中的 CSR（Control and Status Register）指令，用于对控制和状态寄存器进行读取、写入和修改。以下是每个指令的简要说明：

1. `csrrw`（CSR Read and Write）:

   - 格式：`csrrw rd, csr, rs1`
   - 作用：将控制和状态寄存器（CSR）`csr` 的当前值读取到寄存器 `rd` 中，并将 `rs1` 中的值写入到 CSR `csr`。
   - 示例汇编代码：
     ```assembly
     csrrw x3, mstatus, x1
     ```

2. `csrrs`（CSR Read and Set）:

   - 格式：`csrrs rd, csr, rs1`
   - 作用：将控制和状态寄存器（CSR）`csr` 的当前值读取到寄存器 `rd` 中，并将 `rs1` 中的值设置为 CSR `csr` 的位。
   - 示例汇编代码：
     ```assembly
     csrrs x5, mstatus, x2
     ```

3. `csrrc`（CSR Read and Clear）:

   - 格式：`csrrc rd, csr, rs1`
   - 作用：将控制和状态寄存器（CSR）`csr` 的当前值读取到寄存器 `rd` 中，并将 `rs1` 中的值清零 CSR `csr` 的相应位。
   - 示例汇编代码：
     ```assembly
     csrrc x7, mstatus, x3
     ```

4. `csrrwi`（CSR Read and Write Immediate）:

   - 格式：`csrrwi rd, csr, zimm`
   - 作用：将控制和状态寄存器（CSR）`csr` 的当前值读取到寄存器 `rd` 中，并将立即数 `zimm` 写入到 CSR `csr`。
   - 示例汇编代码：
     ```assembly
     csrrwi x9, mstatus, 5
     ```

5. `csrrsi`（CSR Read and Set Immediate）:

   - 格式：`csrrsi rd, csr, zimm`
   - 作用：将控制和状态寄存器（CSR）`csr` 的当前值读取到寄存器 `rd` 中，并将立即数 `zimm` 设置为 CSR `csr` 的位。
   - 示例汇编代码：
     ```assembly
     csrrsi x11, mstatus, 2
     ```

6. `csrrci`（CSR Read and Clear Immediate）:
   - 格式：`csrrci rd, csr, zimm`
   - 作用：将控制和状态寄存器（CSR）`csr` 的当前值读取到寄存器 `rd` 中，并将立即数 `zimm` 清零 CSR `csr` 的相应位。
   - 示例汇编代码：
     ```assembly
     csrrci x13, mstatus, 1
     ```

这些指令允许程序在运行时操作控制和状态寄存器，从而改变处理器的行为和状态。在示例中，`mstatus` 是一个控制和状态寄存器的例子，实际使用时会根据具体的需求选择不同的 CSR。

### 使用场景

RISC-V 中的 CSR（Control and Status Register）指令主要用于处理器内部的控制和状态寄存器的读取、写入和修改。这些寄存器用于管理和监控处理器的运行状态。以下是一些 CSR 指令的使用场景：

1. **系统控制和状态管理：**

   - `csrrw`、`csrrs` 和 `csrrc` 指令允许程序读取、设置和清除系统控制和状态寄存器，例如 `mstatus` 寄存器，以控制系统的运行状态。

2. **中断和异常处理：**

   - CSR 指令用于配置和管理中断、异常和处理器的状态。通过读写 `mie`（Machine Interrupt Enable）、`mip`（Machine Interrupt Pending）等寄存器，可以启用或禁用中断，检查中断状态等。

3. **性能计数器：**

   - RISC-V 架构中的 CSR 指令允许程序读取和配置性能计数器，例如 `cycle` 和 `time`，以用于性能分析和优化。

4. **用户模式切换：**

   - CSR 指令可用于切换处理器的执行模式，例如从用户模式到特权模式。`mstatus` 中的相关位可以通过 CSR 指令进行设置或清除。

5. **随机数生成：**

   - 一些 CSR 指令可以用于生成随机数，例如 `misa`（Machine ISA Register）。

6. **访存权限管理：**

   - 一些 CSR 寄存器用于管理访存权限，例如 `satp`（Supervisor Address Translation and Protection）寄存器，它用于设置虚拟内存地址转换和内存保护。

7. **环境保存和恢复：**

   - CSR 指令可用于保存和恢复处理器的上下文环境，例如通过 `mepc`（Machine Exception Program Counter）保存异常处理程序的返回地址。

8. **系统调试：**
   - CSR 指令还可以用于系统调试，例如通过 `dcsr`（Debug Control and Status Register）进行调试模式的配置。

这些使用场景展示了 CSR 指令在处理器内部控制和状态管理中的多样性和重要性。不同的 CSR 寄存器提供了对处理器不同方面的控制和监控。

### 指令解析及对应的单元测试

下面是 CSRRW 指令对应的解析代码及其单元测试。没有完全列出，完整代码可以去对应分支 https://github.com/weijiew/crvemu/tree/lab5-csr 查看。

```cpp
std::optional<uint64_t> executeCSR_RW(Cpu& cpu, uint32_t inst) {
  auto [rd, rs1, rs2] = unpackInstruction(inst);
  auto csr_addr = (inst & 0xfff00000) >> 20;

  // Load the value from the CSR register
  uint64_t t = cpu.csr.load(csr_addr);

  // Store the value from the rs1 register into the CSR register
  cpu.csr.store(csr_addr, cpu.regs[rs1]);

  // Store the original CSR value into the rd register
  cpu.regs[rd] = t;

  // Update the program counter
  return cpu.update_pc();
}

// Test csrrw instruction
TEST(RVTests, TestCsrrw) {
  {
    std::string code = start +
    "addi x2, x0, 5 \n"    // Load 5 into x2
    "csrrw x1, mstatus, x2 \n";  // x1 = mstatus; mstatus = x2;
    Cpu cpu = rv_helper(code, "test_csrrw", 2);

    // Verify if MSTATUS register has the correct value
    EXPECT_EQ(cpu.getRegValueByName("mstatus"), 5) << "Error: mstatus should be 5 after CSRRW instruction";
  }
}
```

### 总结

这部分内容增加了 CSR 相关的寄存器，通过 CPU 可以直接读取，此外增加了六个 CSR 相关的指令解析及其对应的单元测试。
