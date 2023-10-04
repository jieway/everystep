# Part 3 : spin lock

接上篇，本来要跳转到 main 函数，那么接下来应当实现 main 函数。但是因为自旋锁用的地方很多，所以还是先实现自旋锁吧。

先从全局的角度来解释自旋锁需要实现哪些部分：

- `initlock` 函数用于初始化自旋锁，设置锁的名称、状态以及关联的 CPU。

- `acquire` 函数用于获取自旋锁，如果锁已被其他线程持有，则会进入自旋等待状态，直到锁可用。在获取锁之前，会禁用中断以避免死锁。获取锁后，会使用原子操作确保锁的状态正确。

- `release` 函数用于释放自旋锁，将锁的状态标记为未锁定，并在释放锁后重新启用中断。

- `holding` 函数用于检查当前 CPU 是否持有指定的自旋锁，用于调试和确保锁的正确使用。

- `push_off` 和 `pop_off` 函数用于在获取自旋锁前禁用中断，并在释放锁后重新启用中断。这对函数用于确保在操作临界区时不会被中断打断，防止多线程竞争引发的问题。

总之自旋锁用于保护共享资源的访问，确保在多线程环境下的线程安全性。接下来是实现自旋锁：

## 1. 定义 spinlock

```c
kernel/spinlock.h
// Mutual exclusion lock.
struct spinlock {
    uint locked;       // Is the lock held?

    // For debugging:
    char *name;        // Name of lock.
    struct cpu *cpu;   // The cpu holding the lock.
};
```

这段代码定义了一个互斥锁数据结构 `spinlock`，用于在多线程或多核心的环境中实现资源的互斥访问。它包含了一个用于表示锁状态的整数字段 `locked`，一个用于标识锁的名称的字符指针 `name`，以及一个用于记录持有锁的 CPU 核心的指针 `cpu`。这个结构体用于确保在同一时间只有一个线程或核心可以访问共享资源，以避免竞态条件和数据一致性问题。

接下来实现如何设计一个结构体来表示 CPU 。

### 1.1 CPU 结构体定义

```c
kernel/proc.h
// Per-CPU state.
struct cpu {
    struct proc *proc;          // The process running on this cpu, or null.
    struct context context;     // swtch() here to enter scheduler().
    int noff;                   // Depth of push_off() nesting.
    int intena;                 // Were interrupts enabled before push_off()?
};
```

这个结构体表示了每个 CPU 的状态信息：

- `struct proc *proc`：指向正在运行在该 CPU 上的进程的指针，如果没有进程运行则为 null。

- `struct context context`：保存了 CPU 的上下文信息，用于在进程切换时保存和恢复寄存器状态。

- `int noff`：记录了 `push_off` 函数的调用次数，用于嵌套关闭中断的情况。

- `int intena`：记录了在调用 `push_off` 之前中断是否已经启用，用于在 `pop_off` 恢复中断状态时判断是否需要重新启用中断。

### 1.2 context

```c
// Saved registers for kernel context switches.
struct context {
    uint64 ra;
    uint64 sp;

    // callee-saved
    uint64 s0;
    uint64 s1;
    uint64 s2;
    uint64 s3;
    uint64 s4;
    uint64 s5;
    uint64 s6;
    uint64 s7;
    uint64 s8;
    uint64 s9;
    uint64 s10;
    uint64 s11;
};
```

这个结构体用于保存在内核上下文切换时需要保留的寄存器值，包括：

- `uint64 ra`：返回地址寄存器，保存函数返回后应该继续执行的地址。

- `uint64 sp`：栈指针寄存器，保存当前线程的栈顶指针，用于恢复栈状态。

- `uint64 s0` 到 `uint64 s11`：这些寄存器是被调用者保存的寄存器，用于保存函数调用期间的临时变量。在内核上下文切换时，需要保存和恢复这些寄存器的值，以确保线程切换后能够正确继续执行。

### 1.3 proc

这个结构体用来表示进程，涉及内容有点多此处先空着。

```c
// Per-process state
struct proc {
    struct spinlock lock;

    // TODO
};
```

## 2. 初始化 lock

```c
void
initlock(struct spinlock *lk, char *name)
{
    lk->name = name;
    lk->locked = 0;
    lk->cpu = 0;
}
```

这个函数 initlock 用于初始化自旋锁数据结构，设置锁的名称和初始状态。

### 2.1 如何使用？

先定义一把互斥锁，然后调用初始化即可。

```c
// the transmit output buffer.
struct spinlock uart_tx_lock;

initlock(&uart_tx_lock, "uart");
```


## 3. 断开中断

在获取锁之前，会禁用中断以避免死锁。获取锁后，会使用原子操作确保锁的状态正确。

接下来实现 push_off 和 pop_off 。这段注释解释了 `push_off` 和 `pop_off` 函数的特性：

- `push_off` 和 `pop_off` 函数与 `intr_off()` 和 `intr_on()` 函数类似，用于控制中断的开关状态。

- 不同之处在于它们是成对使用的，每个 `push_off` 都需要对应两个 `pop_off` 来撤销。这是为了确保中断状态在一段代码中可以被临时关闭，但在执行完后能够被正确恢复，避免永久地禁用中断。

- 如果在调用 `push_off` 之前中断已经处于关闭状态，那么无论调用多少次 `push_off`，中断都会保持关闭状态。这是为了避免不必要的中断状态切换。

总之，`push_off` 和 `pop_off` 是一对用于管理中断状态的函数，确保在多次嵌套调用的情况下中断状态可以正确地被禁用和恢复。

### 3.1 push_off

`push_off` 函数用于禁用中断，支持嵌套禁用，同时记录禁用前的中断状态。`pop_off` 函数用于恢复中断状态，支持嵌套的中断恢复。这两个函数一起确保在多层嵌套中断禁用的情况下，能够正确地保存和恢复中断状态，以保护临界区代码免受中断干扰。

```c
void
push_off(void)
{
    // 获取当前的中断状态
    int old = intr_get();

    // 关闭中断
    intr_off();
    // 如果是第一次关闭中断需要将关闭中断前是否中断记录下来
    // 目的是方便回复到此前的状态
    if(mycpu()->noff == 0) {
        mycpu()->intena = old;
    }
    mycpu()->noff += 1;
}
```c


```c
void
pop_off(void)
{
    struct cpu *c = mycpu();
    if(intr_get())
        panic("pop_off - interruptible");
    if(c->noff < 1)
        panic("pop_off");
    c->noff -= 1;
    if(c->noff == 0 && c->intena)
        intr_on();
}
```