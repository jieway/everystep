---
title: 'sized deallocation：delete 终于知道自己在删多大的东西'
description: 'C++14 允许在 delete 时把对象大小传给 operator delete，给内存分配器更多信息，减少一些“猜”。'
---

早年的 C 世界里，内存更像一张借条。

你借走一块。

还的时候只还一个地址。

不写大小。

听起来很离谱？

当年大家还真就这么干了，而且干得挺理直气壮。

### 那些年，`free` 从来不问“你借了多少”

在最早的 C 里，`malloc` 给你一段内存；`free` 收回去的时候，只认一个指针。

它不问大小。

它也不需要你告诉它大小。

这不是设计失误，更像是那个年代的一种默契：大小信息由“分配器自己偷偷记账”。你看不到，但它一直在。

C++ 后来沿用了这套思路。

所以默认的 `delete p;`，最后也会落到 `operator delete(void*)` —— 你没看错，它也只拿到一个指针。

### 先把几个概念捋顺，不然后面会越读越像在背书

你读到这里大概率会冒出两个疑问。

`free` 既然只要指针，那 `delete` 到底多干了啥？

还有：`delete` 和 `operator delete` 是同一个东西吗？

别急，我用几段小代码把地基打稳。你只要记住一句话：

`malloc/free` 处理“字节”，`new/delete` 处理“对象”。

#### `malloc/free`：借的是“字节”

`malloc` 只负责给你一段原始内存，不会帮你初始化对象；`free` 也只负责把内存交还给分配器，不会帮你调用析构。

```cpp
#include <cstdlib>

int main() {
    void* p = std::malloc(64);
    std::free(p);
}
```

这就像你去仓库借了一块木板。

木板上刻不刻字，仓库不管。

#### `new/delete`：处理的是“对象”

`new T` 会先申请一块足够大的内存，然后在那块内存上把 `T` 构造出来；`delete` 则反过来，先析构，再释放。

```cpp
#include <string>

int main() {
    auto* p = new std::string("hello");
    delete p;
}
```

你可以把它理解成：你不是借了一块木板，你是借了一台组装好的机器。

还回去之前，得先关机。

#### `delete` 不是函数，它是“编译器帮你展开的一套动作”

很多人直觉上把 `delete p;` 当成“调用一个函数”。但更贴近真实的理解是：编译器会把它拆成两步。

```cpp
// 这不是标准里的源码，只是帮助你理解。
if (p != nullptr) {
    p->~T();                 // 析构
    operator delete(p);      // 释放
}
```

本文讨论的 sized deallocation，盯的就是第二步：释放。

#### `operator delete` 其实有好几个版本，编译器要挑一个

当你写 `delete p;` 的时候，编译器会先看类型里有没有“类内的 delete”。没有的话才回退到全局的 `::operator delete`。

```cpp
#include <cstddef>

struct A {
    static void operator delete(void*) noexcept;
    static void operator delete(void*, std::size_t) noexcept;
};

int main() {
    delete new A;
}
```

你不用背完整套查找规则。

记一个够用的版本：`delete` 会尽量按对象类型去找“最合适的释放函数”。

### 土办法：给指针贴个“小纸条”

后来大家开始写更讲究的分配器，比如内存池。

想法很朴素：我提前挖好一堆固定大小的坑，你要 32 字节就给 32 那桶，你要 64 字节就给 64 那桶。

分配时很爽。

释放时就开始别扭：你手上只有指针，却不知道它当初是从哪一桶出来的。

工程里最常见的做法是：在指针旁边藏一张“小纸条”，上面写着“我多大、该回哪个桶”。

听起来很合理。

但信息从来不免费。

### 线上啪一下：4 个字节的小纸条也能炸

我以前写过一个小服务，请求量不大，但对象创建很多。

当时图省事，我就在指针前面塞了 4 个字节当纸条。

然后把“给用户的指针”往后挪 4 字节。

你猜怎么着。

事故复现短得离谱，锅也指得很准：就是 `raw + 4`。

```cpp
#include <cassert>
#include <cstddef>
#include <cstdint>
#include <cstdlib>

struct alignas(16) Packet {
    std::uint8_t buf[16];
};

int main() {
    auto* raw = static_cast<std::uint8_t*>(std::malloc(sizeof(Packet) + 4));
    void* p = raw + 4;
    assert(reinterpret_cast<std::uintptr_t>(p) % alignof(Packet) == 0);
    std::free(raw);
}
```

我只“多塞”了 4 字节，也把指针挪了 4 字节。

问题就出在这 4 字节：对齐被我干碎了。

对齐（alignment）的直觉很简单：有些类型要求地址必须“站在某种格子线上”。比如 16 字节对齐，就是地址要能被 16 整除。

`alignas(16)` 是在说：这个类型天生要求 16 字节对齐。

`alignof(Packet)` 是在问：那你到底要多少。

你没写 `assert` 的时候，测试机上可能只是“看起来没事”。

线上换了机器、换了编译器、换了库版本，就可能啪一下。

然后你就开始补 padding、把纸条做得更复杂、把回收路径也一起绕晕。

更惨的是：你还得把“分配时的历史”一路背到释放。

### “多塞 4 字节”为什么会翻车：对齐不是玄学

这块最容易让初学者疑惑：我就多塞了 4 个字节，怎么跟世界末日一样？

因为你动的是“地址”。

你把指针随手 `+4`，很可能从“对齐”变成“不对齐”。

如果你真的想在前面塞一个 header，常见的做法是“多分一点，再对齐”，然后把“原始指针怎么找回来”也一起记下来。

下面这个例子只讲思路（别急着抄去线上）：

```cpp
#include <cstddef>
#include <cstdint>
#include <cstdlib>
#include <new>

struct Header {
    std::uint32_t size;
    std::uint32_t offset;
};

void* alloc_with_header(std::size_t sz, std::size_t align) {
    std::size_t extra = sizeof(Header) + align;
    auto* raw = static_cast<std::uint8_t*>(std::malloc(sz + extra));
    if (!raw) throw std::bad_alloc();

    std::uintptr_t p = reinterpret_cast<std::uintptr_t>(raw + sizeof(Header));
    std::uintptr_t aligned = (p + (align - 1)) & ~(align - 1);
    auto* user = reinterpret_cast<std::uint8_t*>(aligned);

    auto* h = reinterpret_cast<Header*>(user - sizeof(Header));
    h->size = static_cast<std::uint32_t>(sz);
    h->offset = static_cast<std::uint32_t>(user - raw);
    return user;
}

void free_with_header(void* user) {
    auto* p = static_cast<std::uint8_t*>(user);
    auto* h = reinterpret_cast<Header*>(p - sizeof(Header));
    std::free(p - h->offset);
}
```

你看到了：麻烦点从来不在“多塞几个字节”。

麻烦在于：你得把对齐、header、回收路径打包成一个闭环。

### C++14：把“大小”正经交给 `delete`

说到这里，你很可能会拍桌子：

`new` 的时候我明明知道大小，`delete` 的时候为什么装傻？

C++14 给了一个很朴素的答案：既然你知道，那就传回来。

它允许你提供带 `size` 参数的 `operator delete`（也叫 sized deallocation）。

```cpp
#include <cstddef>

void operator delete(void* p, std::size_t sz) noexcept {
    (void)p;
    (void)sz;
}
```

`p` 是地址，`sz` 通常就是对象大小。

如果编译器在 `delete` 那一刻确实知道对象有多大，它就有机会把 `sz` 带回来。

这对写内存池的人很香：你可以按 `sz` 算出它该回哪个桶，不用在旁边藏纸条，也少一堆对齐/头部/padding 的碎活。

### 给你一口气看懂收益：size class 内存池怎么吃到 sized delete

想象你有 16/32/64 三个桶。

分配的时候你当然知道 `sz`，所以很好分桶。

但释放的时候如果只有一个指针，你就得反查：要么在旁边塞纸条，要么维护一张 `ptr -> bucket` 的表。

有了 sized delete，释放就能直接走快路径。

```cpp
#include <cstddef>
#include <cstdlib>
#include <new>

namespace pool {
    struct Node { Node* next; };
    static Node* free16 = nullptr;
    static Node* free32 = nullptr;
    static Node* free64 = nullptr;

    static Node*& list_for(std::size_t sz) {
        if (sz <= 16) return free16;
        if (sz <= 32) return free32;
        return free64;
    }

    static std::size_t round_up(std::size_t sz) {
        if (sz <= 16) return 16;
        if (sz <= 32) return 32;
        return 64;
    }

    static void* alloc(std::size_t sz) {
        sz = round_up(sz);
        Node*& list = list_for(sz);
        if (list) {
            Node* p = list;
            list = p->next;
            return p;
        }
        return std::malloc(sz);
    }

    static void dealloc(void* p, std::size_t sz) {
        sz = round_up(sz);
        Node*& list = list_for(sz);
        Node* n = static_cast<Node*>(p);
        n->next = list;
        list = n;
    }
}

void* operator new(std::size_t sz) {
    if (void* p = pool::alloc(sz)) return p;
    throw std::bad_alloc();
}

void operator delete(void* p, std::size_t sz) noexcept {
    if (!p) return;
    pool::dealloc(p, sz);
}
```

这段代码不是让你照抄去生产环境。

它只是想让你看到一个很“工程”的事实：`sz` 一旦回来了，释放路径就不需要额外记账。

纸条少了，坑也就少了。

### 你需要知道的现实：它不是“写了就一定生效”的魔法

这一点必须提前打预防针：sized deallocation 不是你写了重载，编译器就无脑用。

能不能用、用不用得上，取决于编译器、标准库实现，也取决于 `delete` 当下类型信息是否足够完整。

#### 你得真的“提供” sized delete

标准允许编译器去调用它，但函数实体得有人定义。

你可以自己写，也可以依赖标准库（libstdc++ / libc++）替你提供。

另外还有“我就是不想要它”的场景：例如 Clang 提供 `-fno-sized-deallocation` 可以禁用。

#### 类型不完整时，真没法传 size

如果在 `delete` 的位置，这个类型还是前置声明，编译器不知道 `sizeof(T)`，那就只能退回不带 size 的版本。

```cpp
struct Node;       // 只有声明
void f(Node* p) {
    delete p;      // 这里 Node 还不完整
}
```

（很多情况下这段代码本身也会踩到标准限制。

但直觉上你可以这么记：不完整类型没大小，怎么传。）

#### 用基类指针删派生类：如果析构不 virtual，本来就别玩

你用 `Base*` 去 `delete` 一个 `Derived`。

只有在“基类析构是 virtual”时才是良性用法。

否则就是未定义行为。

而 sized delete 的 size 选择也会被这种不良用法牵连——这是 N3778 里特别强调的点。

#### `new[]` / `delete[]` 也别乱配对

这个坑跟 sized delete 关系不大，但它很常见。

`new T[]` 必须配 `delete[]`。

乱配对就是未定义行为。

```cpp
int main() {
    int* p = new int[10];
    delete p;          // 错
}
```

数组这边还有个小插曲：很多实现会在数组分配时藏一个 cookie（记录元素个数），所以“数组那块内存到底多大”并不总是你想的 `N * sizeof(T)` 那么纯粹。

这也是为什么 sized delete 主要服务的是分配器实现，而不是业务逻辑。

### 这事不是 C++ 独有：别的世界早就在“想办法知道大小”

把视野拉远一点，你会发现 C++14 做的事并不新奇。

大家只是在不同层次，用不同方式解决同一个痛点：释放的时候，只有指针不太够用。

#### glibc / mimalloc：你能问出大小，但文档会拍拍你肩膀

glibc 有 GNU 扩展 `malloc_usable_size(ptr)`，mimalloc 也有 `mi_usable_size(p)`。

它们确实能告诉你“这块内存背后，分配器实际给了多少字节”。

但 glibc 的 man page 写得很直白：它主要用于诊断和统计；返回值可能大于你申请的大小；而且只在调用那一刻有效。

翻译成人话就是：能查到，不代表你该依赖。

这也反过来说明：分配器内部当然有元数据，但它是实现细节。标准接口不会保证你稳定拿到。

#### jemalloc：我干脆给你一个“带 size 的 free”

jemalloc 的 man page 里明确提供了一个接口：释放时你可以把 size 当作提示传进去：`sdallocx`。

```c
// 只为说明接口形状，不要求你真去链接 jemalloc
void sdallocx(void* ptr, size_t size, int flags);
```

动机也很朴素：现代分配器按 size class 分配，为了省空间不一定把 size 放在对象旁边；释放时反查就可能很贵。

#### TCMalloc：有 size 就走快路，没有就去查 pagemap

TCMalloc 的设计文档写得更直接：对象释放时，如果编译器能提供大小，就用这个大小走快路径；如果不知道，就要去 pagemap 查。

你可以把它理解成一句话：

知道 size，就少一次“反查”。

#### Rust / Swift：干脆规定你必须把 size/align 带回来

Rust 的 `GlobalAlloc` 要求 `dealloc(ptr, layout)`，`layout` 里包含 size 和 alignment。

```rust
use std::alloc::{GlobalAlloc, Layout};

unsafe fn demo<A: GlobalAlloc>(a: &A, p: *mut u8) {
    let layout = Layout::from_size_align(64, 16).unwrap();
    a.dealloc(p, layout);
}
```

Swift 的 `UnsafeMutableRawPointer` 也有类似的意思：释放时要你把 bytes 和 alignment 说清楚。

```swift
// 只为说明接口形状
ptr.deallocate(bytes: 64, alignedTo: 16)
```

它们的态度都很硬：你不带回“当初怎么分配的”，那就别怪我翻脸。

### 这特性怎么来的：C++14 的 sized deallocation 不是拍脑袋

WG21 的提案 N3778（Lawrence Crowl，2013）讲得很直白。

在 C++11 里，你已经可以在类里定义带 size 参数的 `operator delete`。

但全局的等价版本缺失。

这会带来性能问题：现代分配器按 size class 分配，有些实现为了节省空间不把 size 放在对象旁边；释放时就得通过额外的数据结构去查，而这些结构很可能不在 CPU cache 里。

N3778 的解决方案也很朴素：允许你定义全局的 `operator delete(void*, std::size_t)`，并规定当类型完整、且同时找到带 size 和不带 size 的版本时，优先选带 size 的那个。

它也提前把坑写在纸面上：

类型不完整就没 size，只能退回不带 size 的版本。

兼容性也要考虑：老二进制可能只知道 unsized delete，新库提供 sized delete 也必须安全。所以标准给了一个保守的默认：sized delete 可以简单转发到 unsized delete。想吃到性能收益，你得显式做点事。

### 一句话结论

sized delete 不是给业务写的。

它是给分配器写的。

### 最后留个亮点

我喜欢它，并不是因为“C++ 又多了一个重载”。

而是因为它承认了一件非常工程的事实：释放内存这事，光有地址有时候真的不够。

你可以把 `delete` 当成退货。

以前你只报订单号（指针）。

现在你还能顺手报一下重量（大小）。
