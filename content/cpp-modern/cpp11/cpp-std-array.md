---
title: '一段“祖传数组”的翻身仗：std::array 是怎么来的'
description: '从 C 风格数组的指针退化与“丢尺寸”，讲到 boost::array/TR1，再到 C++11 的 std::array：零开销的固定长度容器，写起来更像现代 C++。'
---

如果你写过一点 C。

你大概率相信过一句话。

数组的长度。

就在那对 `[]` 里。

写着呢。

不会丢。

结果第一次做小项目上了线。

啪。

你会发现。

长度不是“丢了”。

是你从来没真正拥有过它。

那是很早的年代。

大家写的不是“框架”。

是能跑的程序。

能省一字节就省一字节。

能少拷贝一次就少拷贝一次。

所以数组被设计成一段连续的内存。

再给你一个入口地址。

你拿着这个地址。

就能走到第 i 个元素。

这就是那句老话：

> a[i] 等价于 *(a + i)

听起来像技巧。

其实是在说实话。

数组更像“地址 + 规则”。

而长度经常只存在于你的脑子里。

### 当年最常见的坑：数组一进函数，长度就蒸发

我第一次真吃亏，是在一个很小的项目。做的是“打点上报”。

线上 CPU 偶尔飙一下，日志里还夹着乱码。你看着就像内存被谁咬了一口。

复现代码很短。短到你看一眼就觉得“这不可能出事”。

```cpp
#include <cstddef>

void send_bytes(const unsigned char* p, std::size_t n);

void report(unsigned char buf[16]) {
    send_bytes(buf, 16);
}
```

你以为 `buf` 是“16 字节数组”。但在函数参数里，它就是 `unsigned char*`。

那对 `[16]` 更像给人看的。编译器不会替你记长度。

这里有个新名词，你可能会皱眉。

叫“数组退化成指针”。

别怕。

它不是黑魔法。

就是一条语言规则。

当你把数组当作函数参数写进去时。

编译器会把它当成“指针参数”。

换句话说。

下面两种写法在函数参数里没区别。

```cpp
void report(unsigned char buf[16]);
void report(unsigned char* buf);
```

所以你在 `report` 里再也拿不到“16”。

你只能拿到一个地址。

于是 `sizeof` 也会跟着变味。

```cpp
#include <cstddef>

void send_bytes(const unsigned char* p, std::size_t n);

void report(unsigned char buf[16]) {
    send_bytes(buf, sizeof(buf));
}
```

如果你只学过 C。

你很容易以为这里会发 16 字节。

但在 64 位机器上。

`sizeof(buf)` 通常是 8。

因为它测到的是“指针的大小”。

### 当年大家怎么写：指针 + 长度，两样都得传

所以老代码里最常见的接口长这样。

```cpp
#include <cstddef>

void send_bytes(const unsigned char* p, std::size_t n);
```

指针给我地址。长度你自己再报一遍。

听上去很蠢，但在当年这是很清醒的做法。问题是人会记错。

尤其在“改着改着就上线”的项目里，你把缓冲区从 16 改成 32。调用点忘改，线上就开始随机抽风。

比如下面这段。

它能编译。

它也能跑。

然后它会在某个夜里教你做人。

```cpp
#include <cstddef>

void send_bytes(const unsigned char* p, std::size_t n);

void report() {
    unsigned char buf[32]{};
    send_bytes(buf, 16); // 忘改了
}
```

这类 bug 的可怕之处在于。

它不是每次都炸。

它是“偶尔炸”。

### 当年还有几种土办法：能用，但都别扭

你可能会问。

那就不能让编译器把长度带进去吗。

能。

但当年的写法都很别扭。

先看一种你以后也许会遇到的技巧。

把数组按“引用”传进去。

这里的“引用”你可以先当成一句话：

它不是拷贝。

也不是指针。

更像“给这个对象起了个别名”。

```cpp
#include <cstddef>

template <std::size_t N>
void dump(unsigned char (&buf)[N]) {
    // N 会自动变成 16、32... 由调用点决定
}

void report() {
    unsigned char buf[16]{};
    dump(buf);
}
```

这招的好处是。

长度不会丢。

这里你又会看到两个新名词。

一个是 `template`。

一个是 `N`。

你可以先把它理解成。

这不是“运行时的参数”。

这是“编译器帮你数出来的那个数”。

调用点是 `buf[16]`。

那 `N` 就是 16。

调用点是 `buf[32]`。

那 `N` 就是 32。

你不用手写。

编译器会替你带过去。

坏处也明显。

你得写模板。

你得让被调用者也“懂模板”。

而且它只适用于“真数组”。

你拿指针来就不行。

还有一种更朴素的土办法。

自己包个结构体。

```cpp
#include <cstdint>

struct Digest16 {
    std::uint8_t bytes[16];
};

void log_digest(const Digest16& d);
```

这招很实用。

它把长度钉进了类型里。

但它也很“手工”。

你要 16 就写一个 `Digest16`。

要 32 就再写一个 `Digest32`。

而且它没有 `begin()`。

也没有 `size()`。

你想跟 STL 算法玩。

就得自己再补一堆接口。

### 横向对比：这些方案到底差在哪

到这里你可能会有点乱。

我用一句很“工程”的方式帮你理一下。

你不是在选语法。

你是在选：谁来负责“长度”这件事。

先看 C 风格的。

```cpp
#include <cstddef>

void f(const int* p, std::size_t n);
```

它的优点是。

什么都能传。

数组。

指针。

动态分配的内存。

缺点也直白。

长度完全靠人。

而人最容易在改需求时忘记自己。

再看“数组引用 + 模板”那招。

```cpp
#include <cstddef>

template <std::size_t N>
void g(int (&a)[N]);
```

它的优点是。

长度不会丢。

而且你不需要额外的对象。

缺点是。

它只吃“真数组”。

你一旦拿到的是指针。

它就无能为力。

然后是“手工 struct 包一层”。

```cpp
struct A16 { int v[16]; };
```

优点是。

长度钉进类型。

接口写起来也清楚。

缺点是。

你要多少种长度。

就要手写多少种类型。

最后就是 `std::array<T, N>`。

你可以把它当成“标准库版的通用 struct 包装”。

它帮你把常用接口补齐了。

也帮你跟 STL 算法接上了。

至于 `std::vector`。

它解决的是另一类问题。

长度在运行时才知道。

而且会变。

这时候你就别勉强 `std::array`。

### 再给几个短例子：它到底怎么像“对象”

刚学 C++ 的时候。

你会特别在意一件事。

它到底是不是“值”。

是不是能拷贝。

是不是能比较。

`std::array` 在这些地方很像你期待的“对象”。

先看赋值。

```cpp
#include <array>

std::array<int, 3> a{1, 2, 3};
std::array<int, 3> b{4, 5, 6};

a = b;
```

这句不是魔法。

就是 3 个元素挨个拷过去。

再看比较。

```cpp
#include <array>

std::array<int, 3> a{1, 2, 3};
std::array<int, 3> b{1, 2, 3};

bool same = (a == b);
```

它会按元素比较。

你不用自己写循环。

再看“跟算法库一起玩”。

```cpp
#include <algorithm>
#include <array>

std::array<int, 4> a{3, 1, 4, 2};
std::sort(a.begin(), a.end());
```

`begin()`/`end()` 这两个入口。

就是它从“语法里的数组”。

变成“STL 世界里的序列”的关键。

### “那我用 sizeof 啊？”——你很快会踩第二个坑

你可能会写出这种看起来更聪明的代码。

```cpp
#include <cstddef>

void send_bytes(const unsigned char* p, std::size_t n);

void report() {
    unsigned char buf[16]{};
    send_bytes(buf, sizeof(buf));
}
```

这段在调用点没问题，因为 `buf` 还真的是数组，`sizeof(buf)` 也真的是 16。

但你一旦想“封装一下”，把它包进另一个函数，就又回到第一个坑了。数组一当参数就变指针，`sizeof` 也跟着变了。

这就是老工程师经常说的那句。它不是劝你细心，是劝你别靠细心：

> 数组传参别写错长度。

它听起来像经验。

其实是事故总结。

### 当年的另一个别扭：数组不像对象

你想把三元素拷过去，语言不让你写。

你越想把它当对象用，它越提醒你：我不是对象。

```cpp
int a[3] = {1, 2, 3};
int b[3] = {4, 5, 6};

// a = b; // 不让写
```

在那个年代，数组更像“语法”，不是“类型”。你没法用它写出舒服的接口。

### 于是社区开始补洞：先在 Boost 里“包一层”

后来 C++ 社区做了一件很朴素的事。

把 `T[N]` 包起来，让它变成一个真正的类型。

你可以拷贝，可以赋值，也能有 `begin/end` 这种“像 STL 那样的入口”。这就是 `boost::array`。

你可以把它想象成。

Boost 帮你写了一个“通用版的结构体土办法”。

只不过它是模板。

你不用再手写 `Digest16`、`Digest32`。

它大概长这样（简化版）：

```cpp
template <class T, std::size_t N>
struct array {
    T elems[N];
};
```

它的核心就一句。

把 `T[N]` 当作成员放进去。

这样对象就带着长度了。

然后再给它补上 `size()`、`begin()` 这类接口。

于是它就能进 STL 的世界。

再后来它进了 TR1。最后 C++11 把它收编进标准库，名字叫 `std::array`。

TR1 你可以先理解成“标准库的试运行区”。

当年很多东西都是先在 TR1 里试一试。

大家觉得靠谱了。

再进正式标准。

### std::array 是什么：把“长度”钉进类型里

`std::array<T, N>` 你可以先把它当成一句话：它是一个对象，里面放着连续的 `N` 个 `T`。

长度 `N` 不是注释，是类型的一部分。

这里的 `N` 也是一个新坑。

它必须是“编译期就知道的数”。

你可以先把它当成：

写在代码里、写在模板尖括号里、不会在运行时变的那个数。

```cpp
#include <array>

void f(int n) {
    // std::array<int, n> a{}; // 不行：n 是运行时变量
    (void)n;
}
```

这也是为什么它叫“固定长度”。

长度是类型的一部分。

不是对象运行时的状态。

```cpp
#include <array>

std::array<int, 3> a{1, 2, 3};
```

你现在不需要“靠记忆”了。

你在类型里就能看见长度。接口签名上也能看见。

### 场景一：线上“丢尺寸”——用类型把手滑堵死

我最喜欢 `std::array` 的地方，不是它长得像容器。是它让接口变得更难写错。

比如做协议、哈希、指纹这种固定长度的东西，你需要 16 字节，那就让 16 进到类型里。

```cpp
#include <array>
#include <cstdint>

using Digest = std::array<std::uint8_t, 16>;

void log_digest(const Digest& d);
```

这里你不再传 `16`。调用点少一个参数，也少一个“我以为我记得”的机会。

你如果要对接 C 接口，也不麻烦。

把指针和长度从对象里拿出来就行。

```cpp
#include <array>
#include <cstddef>
#include <cstdint>

void c_api_write(const std::uint8_t* p, std::size_t n);

void send(const std::array<std::uint8_t, 16>& d) {
    c_api_write(d.data(), d.size());
}
```

`data()` 给你指针。`size()` 给你长度。

不用猜，也不用写两份。这不是“高级”，这是少出事。

### 关键结论：把长度写进类型，是最便宜的防呆

你以前靠注释守住长度。现在靠类型。

### 场景二：静态表——别让常量表演“动态分配”

有些表，就是不会变。但我见过太多项目用 `std::vector` 存它。

然后启动时做初始化，再顺手分配一次内存。

你跑起来当然没问题，但你也说不清“我为什么需要这些步骤”。

你说它错吗，也不算错。就是有点没必要。

```cpp
#include <array>

constexpr std::array<int, 4> dx{1, 0, -1, 0};
constexpr std::array<int, 4> dy{0, 1, 0, -1};
```

这东西读起来就很“硬”。它就在那里，不会变。

也不会偷偷搞 allocator。

它不给你表演空间。

### 场景三：作为成员——你终于不用为数组写拷贝语义

把数组放进结构体，才是更真实的工程场景。

用 C 风格数组时，你很快会碰到“拷贝/赋值/比较”这些琐事。换成 `std::array`，它就像标准件。

```cpp
#include <array>
#include <cstdint>

struct Header {
    std::array<std::uint8_t, 4> magic;
    std::uint16_t version;
};
```

你不用自己写拷贝，也不用担心某个成员把默认操作弄没了。

你写结构体的心情会轻一点。

少一段“我是不是忘了写特殊成员函数”的自我怀疑。

### 初始化这点事：{} 是全清零，fill 是“批量写同一个值”

`std::array` 的初始化很直。你写 `{}`，就是把每个元素都初始化。

对 `int` 这种基础类型来说，就是全 0。

这里再补一个常见皱眉点。

下面这句和 `{}` 不一样。

```cpp
#include <array>

std::array<int, 3> a;   // 元素的值不确定
std::array<int, 3> b{}; // 元素都是 0
```

你可以把它先记成：

想要“全清零”。

就写 `{}`。

```cpp
#include <array>

std::array<int, 3> a{};
```

如果你想把它全填成同一个值，用 `fill`。

```cpp
#include <array>

std::array<int, 3> a{};
a.fill(7);
```

这比你写三次 `7` 更像工程代码。

而且读的人也不用替你数逗号。

### 它到底有没有开销：没有“额外层”，就是一段连续的 T[N]

很多人第一反应是不信。你包了一层，怎么可能没开销。

但 `std::array` 的目标就一个：把 `T[N]` 放进一个标准接口里。它不会替你分配，也不会替你绕路。

你拿它下标访问，本质还是那段连续内存。

如果你脑子里还不踏实。

可以用一句很土但很管用的话安慰自己：

它就是把数组穿上了衣服。

衣服提供口袋（接口）。

但里面的身体还是那段连续内存。

### 和 std::vector 的边界：长度是不是“设计的一部分”

`std::vector` 是可变长，`std::array` 是固定长。

所以它们不是谁干掉谁。更多时候是你先想明白：这个长度是不是设计的一部分。

如果是，就让它出现在类型里。如果不是，别硬装固定，用 `vector`。

再把话说得更具体一点。

你可以拿下面三个函数签名对比一下。

```cpp
#include <array>
#include <cstddef>
#include <vector>

void f1(const int* p, std::size_t n);
void f2(const std::array<int, 3>& a);
void f3(const std::vector<int>& v);
```

`f1` 是最像 C 的。

灵活。

但长度完全靠人维护。

`f2` 最硬。

它在类型里就写死了 `3`。

你不可能把 4 个元素塞进去。

这反而是它的价值。

`f3` 最常见。

长度跟对象走。

但它通常意味着“有动态分配的可能”。

你要的是固定缓冲区。

别硬让 `vector` 来演。

你要的是一段连续的 `T[N]`。

但又想当对象用。

那就是 `std::array`。

### 小尾声：std::array 的价值，不是“更现代”，是“更难写错”

写代码久了你会发现，最值钱的不是技巧，是约束。

把错误的空间写小。`std::array` 做的事很简单：把长度从注释里拎出来，钉进类型里。

### 亮点：你不是在选容器，你是在选“谁来记长度”

以前是你记。现在让类型记。
