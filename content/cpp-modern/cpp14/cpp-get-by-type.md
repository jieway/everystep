---
title: 'std::get<T>：tuple 不只按下标取，还能按类型取'
description: 'C++14 允许对 tuple 用 std::get<T>(t)，当你确定某个类型只出现一次时，代码会更不容易写错下标。'
---

你写 C。

一个函数想多返回点东西。

你就把指针塞进去。

当年大家都这么干。

也不是不行。

就是有点别扭。

指针一多。

你会开始记不清。

到底哪个是“耗时”。

哪个是“状态码”。

后来 Boost 先做了 tuple。

Boost 你可以先当成：当年 C++ 圈子里很大的一个“工具箱”。

再后来 C++11 把它收进标准库。

叫 `std::tuple`。

看起来终于可以“打包带走”。

但你很快会发现。

包是打好了。

标签没贴。

### 在 tuple 之前：返回一个，剩下的塞指针

C 时代最常见的写法是：函数返回一个值。
剩下的结果，用指针“带回来”。

```cpp
int fetch(int* ms);
```

你写的时候很自然。
但调用点一多，你就开始紧张。
哪个指针是哪个。
靠记忆。

于是另一派人说。
干脆写个 `struct`。
字段有名字。
别猜。

```cpp
#include <string>

struct Resp {
    int code;
    int ms;
    std::string err;
};
```

这当然靠谱。
代价也明显：很多“只用一次”的返回值，你也得为它起个名字。

还有一个更古早的折中。
如果你只想返回两个值。
C++98 就有 `std::pair`。

```cpp
#include <utility>

std::pair<int, int> fetchPair(); // code, ms

void reportPair() {
    auto r = fetchPair();
    int code = r.first;
    int ms   = r.second;
}
```

它比 tuple 简单。
但它的字段名是 `first/second`。
你还是得靠注释或者记忆。

### C++11：有了 tuple，但你只能写 get<index>

`std::tuple` 是一组固定数量的值。
每个位置的类型都可以不一样。
你把它当成“没有名字的小结构体”就行。

```cpp
#include <tuple>

auto r = std::make_tuple(200, 3.14);
int code = std::get<0>(r);
```

`get<0>` 里的 `0` 不是运行时的数字。
它是写在代码里的“编译期下标”。
编译器会按这个位置去取值。

编译期，就是编译器把源码翻译成可执行文件的那一刻。
你还没运行程序。
它就已经把位置算死了。

你可能会问。
那我能不能用变量当下标。
比如 `i`。

```cpp
#include <tuple>
#include <cstddef>

auto t = std::make_tuple(1, 2);
int a = std::get<0>(t);

std::size_t i = 0;
int b = std::get<i>(t);

constexpr std::size_t j = 0;
int c = std::get<j>(t);
```

第二句会报错。
因为尖括号里的东西是“模板参数”。
它必须在编译期就确定。

`constexpr` 的意思你可以先这么记。
它在说：这个变量的值，编译器现在就能算出来。

所以这里的 `j` 可以。
这里的 `i` 不行。

你也可以把它当成一个直觉。
`get<0>` 不是“拿第 0 个”。

它更像“选中一种固定形状的取法”。
形状写死了。

如果你非得用下标。
至少给下标起个名字。

```cpp
#include <tuple>
#include <cstddef>
#include <string>

using Resp = std::tuple<int, int, std::string>;

constexpr std::size_t kCode = 0;
constexpr std::size_t kMs   = 1;
constexpr std::size_t kErr  = 2;

int msOf(const Resp& r) {
    return std::get<kMs>(r);
}
```

这只能让你少写魔法数字。
顺序一旦变了，它还是会错。
但至少你不会在一屏 `get<0>` 里迷路。

### 坑是怎么来的：下标会活得比你想的久
我写过一个小客户端。
拉接口，解析响应，然后把结果打包返回。
当时图省事，就用了 tuple。

```cpp
#include <tuple>
#include <string>

using Resp = std::tuple<int, int, std::string>; // code, ms, err

Resp fetch();

void report() {
    auto r = fetch();
    int code = std::get<0>(r);
    int ms   = std::get<1>(r);
}
```

调用方也很自然。
你看着顺眼。
编译器也看着顺眼。

然后某天我加了一个字段。
也是 `int`。
我把它插到了中间。

```cpp
#include <tuple>
#include <string>

using Resp2 = std::tuple<int, int, int, std::string>; // code, retry, ms, err

Resp2 fetch2();

void report2() {
    auto r = fetch2();
    int ms = std::get<1>(r); // 现在读到的是 retry
}
```

这玩意最阴的是。
它通常还能编译。
因为你只是把“第 1 个 int”换成了“另一个 int”。

类型没变。
编译器就觉得一切都挺好。
测试也容易漏掉。
因为它不是崩溃。
它只是悄悄算错。

线上啪一下。
你把“耗时”当成“重试次数”用了。

### 当年怎么爬出来：给值起名字，不要只给位置

最稳的办法当然是写个 `struct`。
但很多时候你就是不想为一个临时返回值新建一个类型。
于是有人会用一个很朴素的技巧：把同一种基础类型包一层。

```cpp
#include <tuple>
#include <string>

struct StatusCode { int v; };
struct LatencyMs  { int v; };
struct RetryCount { int v; };

using RespTagged = std::tuple<StatusCode, RetryCount, LatencyMs, std::string>;
```

你看。
这时候 tuple 还是 tuple。
但每个格子终于像“贴了标签的包裹”。

这三个小结构体里都只有一个 `int`。
但在类型系统里，它们是三个不同的“名字”。

类型系统，你可以先理解成：编译器用来区分“这是什么”的那套规则。
你给它起了不同的类型名。
它就不让你随便把它们混着用。

如果这个返回值会活很久。
会被很多地方用。
老实写 `struct` 反而更省心。

```cpp
#include <string>

struct RespS {
    int code;
    int ms;
    std::string err;
};

RespS fetchS();

void reportS() {
    auto r = fetchS();
    int ms = r.ms;
}
```

这段代码没什么“高阶技巧”。
但它很难写错。

### C++14：std::get<T>，按类型拿

C++11 时代你只能写 `get<index>`。
C++14 开始你可以按类型拿。
尖括号里写类型就行。

你先把它理解成：给 `get` 一个类型。
它就去 tuple 里找“那个类型的格子”。

```cpp
#include <tuple>

struct StatusCode { int v; };
struct LatencyMs  { int v; };

auto r = std::make_tuple(StatusCode{200}, LatencyMs{15});
int ms = std::get<LatencyMs>(r).v;
```

`get<LatencyMs>` 的意思是。
“把类型是 `LatencyMs` 的那一格给我”。
它要求也很严格：这个类型在 tuple 里只能出现一次。

如果出现两次。
编译器会直接拒绝。
这其实是在逼你把含义说清楚。

### 它是怎么来的：Boost 先试，标准库再收

很多新东西不是“天降”。
它一般会先在社区里活一阵。
大家用顺了，坑也踩过了。
再被标准收进去。

tuple 这条线，Boost 走在前面。
而“按类型拿值”这件事，在 Boost 的其它组件里也很常见。

你可以先把标准委员会想象成一个很谨慎的编辑。
它不太愿意一次性塞太多“看起来很聪明”的接口。
所以 C++11 先给了按下标的 `get<index>`。
等大家确认“类型唯一时按类型取值很安全”。
C++14 才把 `get<T>` 补上。

顺带一提。
Boost 生态里很早就有类似的接口味道。
比如 `variant` 这种“要么是 A，要么是 B”的容器。
大家习惯用 `get<T>` 去表达“我要的是哪种类型”。
标准库后来也走了同一个方向。

你如果后来学到 `std::variant`。
会发现它也有同样的手感。

```cpp
#include <variant>
#include <string>

std::variant<int, std::string> v = 1;
int x = std::get<int>(v);
```

这就是一种很典型的“从库到标准”的味道。

### 横向看一眼：别的语言怎么处理“多返回值”

Python 很早就能返回 tuple。
解包也很顺。
但本质上还是靠顺序。

```python
code, ms, err = fetch()
```

Go 更直接。
语法层面支持多返回值。
但你也还是得按顺序接。

```go
code, ms, err := fetch()
```

你会发现。
“顺序”这件事很难彻底绕开。
C++14 的 `get<T>` 只是换了一个更硬的约束。
用类型去逼你把含义说清楚。

### get<T> 的限制：同一种类型只能出现一次

你一看到“类型只能出现一次”，大概率会嘀咕。
那我这不就用不了了吗。

```cpp
#include <tuple>

auto t = std::make_tuple(1, 2);
int x = std::get<int>(t);
```

这里会直接编译失败。
因为它不知道你想要第一个 `int`，还是第二个。

你要是真的需要两个 `int`。
又想用 `get<T>`。
办法也很土。
给它们包一层。

```cpp
#include <tuple>

struct FirstInt  { int v; };
struct SecondInt { int v; };

auto t = std::make_tuple(FirstInt{1}, SecondInt{2});
int x = std::get<SecondInt>(t).v;
```

看起来多写了点。
但它是那种“多写两行，少背一辈子锅”的写法。

这就是为什么我前面说。
`get<T>` 适合“字段类型都不一样”的 tuple。
或者你愿意用一层小包装把类型区分开。

### 它适合什么，不适合什么

当你的 tuple 更像“没有名字的小结构体”，而不是“数组”。
而且每个字段都能用不同的类型表达含义。
`get<T>` 就会很顺手。

如果你现在在纠结。
到底用 `struct`，还是 tuple。
我给一个很土的经验。

你要是愿意为它起名字。
而且这个返回值会传很多层。
那就写 `struct`。

你要是只在一个小范围里临时用一下。
又懒得起名字。
tuple 也行。

你要是用 tuple。
但又发现自己在写满屏的 `get<0>`。
那通常说明：它已经不“临时”了。
该收编成一个类型了。

如果你只是讨厌 `get<0>` 的数字。
但你又不想引入那些小包装类型。
还有一种折中：把 tuple“拆开”再用。

```cpp
#include <tuple>
#include <string>

std::tuple<int, int, std::string> fetch();

void report() {
    int code = 0;
    int ms = 0;
    std::string err;
    std::tie(code, ms, err) = fetch();
}
```

这能让调用点不再出现 `get<0>`。
但它依然依赖顺序。
返回值顺序一改。
你照样可能“悄悄读错”。

这里的 `std::tie` 你可以先把它当成“打包一堆引用”。
左边这几个变量。
会被当成“要写回去的目标”。

你也可以只接你关心的。
剩下的直接丢掉。

```cpp
#include <tuple>
#include <string>

std::tuple<int, int, std::string> fetch();

void report() {
    int ms = 0;
    std::string err;
    std::tie(std::ignore, ms, err) = fetch();
}
```

`std::ignore` 就是一个“占位符”。
它的意思是：这个位置的返回值我不要。

后来 C++17 又给了更顺眼的写法。
可以直接解包。
但顺序风险依然在。

```cpp
#include <tuple>
#include <string>

std::tuple<int, int, std::string> fetch();

void report() {
    auto [code, ms, err] = fetch();
}
```

如果你的字段类型天然会重复。
比如两个 `std::string`。
那就别硬按类型取。
要么继续用 `get<index>`，要么回到 `struct`。

### 一句话的结论

别把“含义”寄托在下标上。

### 最后留个亮点

`get<0>` 像是在说。
“相信我，我记得第 0 个是什么。”

`get<T>` 更像是在说。
“别信我，信类型。”

你把类型写清楚。
就是在给未来的自己留路。
