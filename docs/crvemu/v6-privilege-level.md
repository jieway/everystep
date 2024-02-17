本节内容增加了权限表示，设置了三种权限。当 cpu 初始化时默认的权限为 Machine 模式。接下来实现这三种特权模式，随后实现 sret 和 mret 指令。

RISC-V 定义了三种特权等级，分别是用户态（User Mode）、监管态（Supervisor Mode）、和机器态（Machine Mode）。这三种特权等级对应着不同的操作系统和应用场景，提供了不同级别的访问权限。

## 1. 权限表示

定义下面三个参数来表示不同的权限级别。

```cpp
// 使用 uint64_t 定义 Mode 类型
using Mode = uint64_t;

// 定义 User 模式，二进制表示为 00
constexpr Mode User = 0b00;

// 定义 Supervisor 模式，二进制表示为 01
constexpr Mode Supervisor = 0b01;

// 定义 Machine 模式，二进制表示为 11
constexpr Mode Machine = 0b11;
```

在 CPU 类中增加表示权限的成员变量并修改构造函数，最初的级别为 Machine 模式。

```cpp
class Cpu {
public:
    //...
    Mode mode;
    //...
      Cpu(const std::vector<uint8_t>& code)
      : pc(DRAM_BASE),
        bus(code),
        csr()  // 初始化 Csr
    {
        regs.fill(0); // 初始化寄存器为0
        regs[2] = DRAM_END; // 设置堆栈指针寄存器的初始值
        mode = Machine;
    }
}
```

## 2. FENCE / SFENCE.VMA

在 RISC-V（RV）中，FENCE（Fence）和 SFENCE.VMA（Store Fence Virtual Memory Atomic）是两个不同的指令，它们用于控制内存访问和同步。下面是它们的主要区别：

1. **FENCE（Fence）：**

   - 它是一个轻量级的同步指令，它确保在 `FENCE` 之前和之后的指令不会重排序，保证了程序的顺序一致性。
   - `FENCE` 没有特定的参数，因此它执行的同步操作是通用的，对所有处理器和内存操作都生效。

2. **SFENCE.VMA（Store Fence Virtual Memory Atomic）：**
   - `SFENCE.VMA` 指令是用于确保内存中原子操作的完成，并对虚拟内存进行同步的指令。
   - 它通常与原子指令（如原子加载-存储指令）一起使用，以确保在 `SFENCE.VMA` 之前的原子操作完成后，再执行 `SFENCE.VMA` 之后的指令。
   - 这个指令在多核或多处理器系统中确保对共享内存的原子访问的顺序性。

总体而言，`FENCE` 主要用于轻量级的指令序列同步，而 `SFENCE.VMA` 更专注于保障对虚拟内存中原子操作的完成和同步。在实际使用中，程序员需要根据具体情况选择使用哪个指令，以满足程序的同步和顺序一致性需求。

此处的 `FENCE` 和 `SFENCE.VMA` 都暂时简化处理，直接跳过。

```cpp
std::optional<uint64_t> executeSFENCE_VMA(Cpu& cpu, uint32_t inst) {
  // 此时模拟器没有实现虚拟内存或者页表，
  // 暂时该指令不需要执行任何操作。
  // 更新程序计数器
  return cpu.update_pc();
}

std::optional<uint64_t> executeFence(Cpu& cpu, uint32_t inst) {
  return cpu.update_pc();
}
```

## 3. SRET（Supervisor Return）:

`SRET` 指令用于从 Supervisor 模式返回到先前的特权级别。在执行异常处理程序时，如果发生了从用户态到 Supervisor 模式的特权级别切换，那么 `SRET` 会将程序计数器（PC）和一些相关的状态从 `sepc` 和 `sstatus` 寄存器中恢复，从而返回到用户态。以下是一个示例：

```assembly
# Exception or interrupt handler in Supervisor mode
exception_handler:
    # ... (处理异常的代码)

    # 返回到用户态
    sret
```

在上述示例中，当异常处理完成后，`SRET` 指令被用来将控制权返回到先前的用户态。

## 4. MRET（Machine Return）:

`MRET` 指令类似于 `SRET`，但用于从 Machine 模式返回到先前的特权级别。在执行异常处理程序时，如果发生了从用户态到 Machine 模式的特权级别切换，`MRET` 会将程序计数器（PC）和一些相关的状态从 `mepc` 和 `mstatus` 寄存器中恢复，从而返回到用户态。以下是一个示例：

```assembly
# Exception or interrupt handler in Machine mode
exception_handler:
    # ... (处理异常的代码)

    # 返回到用户态
    mret
```

在这个示例中，当异常处理完成后，`MRET` 指令被用来将控制权返回到先前的用户态。

总体而言，`SRET` 和 `MRET` 是在异常处理或中断处理过程中用于恢复先前特权级别的重要指令。这样的特权级别切换机制使得 RISC-V 处理器可以有效地处理不同特权级别下的异常和中断，保持系统的稳定性和安全性。

## 6. 实现

先编写单元测试，然后增肌对应指令的实现逻辑，例如 sret 代码如下。

```cpp
std::optional<uint64_t> executeSRET(Cpu& cpu, uint32_t inst) {
  // 从 CSR 寄存器加载 sstatus 的值
  uint64_t sstatus = cpu.csr.load(SSTATUS);

  // 根据 SPP 位设置权限级别，SPP 位是 sstatus 的第 8 位
  cpu.mode = (sstatus & MASK_SPP) >> 8;

  // SPIE 位是 sstatus 的第 5 位
  uint64_t spie = (sstatus & MASK_SPIE) >> 5;

  // 将 SIE 位设置为 SPIE 位的值，SIE 位是 sstatus 的第 1 位
  sstatus = (sstatus & ~MASK_SIE) | (spie << 1);

  // 将 SPIE 位设置为 1
  sstatus |= MASK_SPIE;

  // 将 SPP 位设置为最低权限模式（U-mode）
  sstatus &= ~MASK_SPP;

  // 将修改后的 sstatus 值存回 sstatus 寄存器
  cpu.csr.store(SSTATUS, sstatus);

  // 将程序计数器（PC）设置为 sepc 寄存器的值
  // 当 IALIGN=32 时，sepc[1] 位在读取时被屏蔽，使其看起来像是 0。这种屏蔽也发生在 SRET 指令的隐式读取中
  uint64_t new_pc = cpu.csr.load(SEPC) & ~0b11;

  // 返回新的程序计数器（PC）的值
  return new_pc;
}
```

mret 指令的解析代码没有列出来，完整代码可以参考该分支：https://github.com/weijiew/crvemu/tree/lab6-pm
