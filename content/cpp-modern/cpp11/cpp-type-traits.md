---
title: 'type traits（<type_traits>）：用编译期信息写更聪明的模板'
description: 'C++11 把模板元编程常用的“类型判断”标准化：is_integral、is_same、enable_if、decay 让泛型代码能讲条件，也能讲约束。'
---

我想先把时间拨回去。

拨回到一个更野的年代。

那会儿你也写模板。

也会写一个 `T`。

然后你盯着它发呆。

这玩意到底是不是整数。

能不能拷贝。

是不是引用。

是不是我想要的那个类型。

你问得很认真。

但编译器只回你一句。

“看你本事。”

后来大家才把这些“问类型”的招式收编起来。

收编进了标准库。

名字叫 `<type_traits>`。

### 那些年，没有 `<type_traits>` 的日子

当年如果你想“问类型问题”，最常见的做法，是自己造一个小工具。
靠的是偏特化、枚举常量，再加一点点黑魔法。

偏特化你可以先理解成：给模板的“某一种形态”开后门。
比如默认版本说“不满足”，但 `int` 版本说“满足”。

```cpp
#include <type_traits>

template <class T>
struct is_int { enum { value = 0 }; };

template <>
struct is_int<int> { enum { value = 1 }; };
```

这东西能用。
但也很容易失控。

你得一个类型一个类型地补，补不全，就等着线上帮你补。

更现实的是，一个团队里会出现三套 `is_int`。
各写各的，互相不兼容。

这就是为什么当年 Boost 会火。
很多“祖传招式”，都是先在 Boost 里活下来，后来才进标准。

### 它是怎么一路走进标准库的

当年写泛型库的人，其实很痛苦。
你想写一个容器、一个算法、一个序列化工具。
你就得不停地问：这个 `T` 能不能这么干。

标准库那会儿还没给你现成答案。
于是大家各自造轮子。
然后互相撞车。

Boost 先把这些轮子攒成一套。
你会看到 Boost.TypeTraits。
也会看到 Boost.MPL（模板元编程库）。

其实 traits 这套思路更早。
你在 STL 里就能看到它的影子。

更具体一点。
当年 SGI STL 那一波“泛型编程”很爱用 traits class。
写法不一定长这样。
但手势差不多。

它不一定是“判断”。
有时候它是“提取信息”。

比如 `iterator_traits`。

```cpp
#include <iterator>
#include <vector>

using It = std::vector<int>::iterator;
using V = std::iterator_traits<It>::value_type;
```

这段看起来没干嘛。
但它表达了一个很关键的手势。

算法不问迭代器“你是什么”。
算法去问它的 traits。

这套做法在当年有个很朴素的动机。

你想让算法更通用。
就不能把类型写死。

但你又得从类型里“掏出信息”。
那就让每个类型提供一份说明书。
这份说明书，就是 traits。

它们的做法很“工程”。
所有判断都变成一个小类型。
小类型里放一个 `value`。

后来这些东西先以 TR1（技术报告）的形式试水。
再后来，C++11 才把常用那部分搬进了 `<type_traits>`。

标准化的意义其实很朴素。

你不用再问同事。
“咱们项目里那个 `is_xxx` 在哪儿。”

你也不用再担心。
换个库就换一套写法。

### 一个很真实的事故：模板太“热心”了

你写了个小项目，比如一个 TCP 小服务。
你要把数据打包发出去。
于是很自然会写一个“泛型打包”。

```cpp
#include <vector>

template <class T>
void append_bytes(std::vector<unsigned char>& out, const T& x) {
    auto p = reinterpret_cast<const unsigned char*>(&x);
    out.insert(out.end(), p, p + sizeof(T));
}
```

看起来很爽。

`reinterpret_cast` 你先别怕。
它就是在说：我不管你 `x` 是什么类型，我把它当成一串字节来读。

听起来很“万能”。
但它也在暗示你：你现在绕开了类型系统的保护。

任何 `T` 都能塞进去。
直到有一天，有人把 `std::string` 也塞进去了。

```cpp
#include <string>
#include <vector>

std::vector<unsigned char> out;
std::string s = "OK";
append_bytes(out, s);
```

它会编译，也会跑。

但你发出去的不是字符串内容。
而是 `std::string` 这个对象的内部布局。

这玩意在不同机器、不同编译器、不同版本下都不一样。
于是线上就会出现那种很讨厌的现场。
白天好好的。
半夜啪一下。
对端解析崩了。

你抓包一看。
“这发的什么鬼。”

### 如果你只会 C，你多半会写“类型码”

刚学完 C 的人，面对这种需求通常会走一条老路。
给数据打一个 tag。
再用 `switch` 分发。

```c
enum Kind { KInt, KStr };

struct Value {
    enum Kind kind;
    union {
        int i;
        const char* s;
    } u;
};
```

这个思路很直。
也很好理解。

但它的代价也很直。
你得自己维护 tag。
你得自己保证 union 里放的东西和 tag 对得上。

一旦有人手滑。
线上照样啪一下。

模板和 type traits 想做的事，就是把这份“自律”交给编译器。
让它在编译期替你做体检。

### type traits 到底解决了什么

type traits 你可以先把它当成一种东西：给类型做体检。

体检结果是一堆编译期的真假值。
你不需要运行程序，编译器自己就能算出来。

于是你就能在编译期说清楚：哪些类型能走这条路，哪些类型不许进。

### 先把两个词说清楚：编译期和运行期

运行期你很熟。
就是程序跑起来之后。

编译期你也见过。
比如 `sizeof(int)`。
程序还没跑，答案就已经定了。

type traits 做的事，就是把“答案提前”。
提前到编译期。

你失败得更早。
也更便宜。

### 你可能会卡住的另一个词：实例化

模板本身不是函数。
它更像一个“配方”。

你用 `inc(1)` 这种方式调用时。
编译器会根据参数把 `T` 推出来。
然后生成一份真正的函数。

这一步就叫实例化。

type traits 的很多魔法。
就发生在这一步。
还没运行。
但已经能做决定。

### 你会经常看到三种写法：`::value`、`::type`、`typename`

先别急着背。
你先把它们当成三种“接口”。

`::value` 就是一个编译期的真假值。
`std::is_integral<T>::value` 这种。

`::type` 则是“算出来的新类型”。
比如 `std::decay<T>::type`。

`typename` 只是在告诉编译器。
“我接下来写的是一个类型名。”
因为在模板里，编译器有时候分不清。

### `typename` 到底在救什么火

你第一次见它，多半会觉得。
这不就是在凑字数吗。

但它真的在救命。

因为在模板里，像 `T::value_type` 这种写法。
到底是类型。
还是静态成员变量。
编译器在那一刻其实分不清。

所以你得提前告诉它。
“这是类型。”

```cpp
template <class T>
struct Wrap {
    using U = typename T::value_type;
};
```

你可以把它理解成。
在模板世界里。
编译器有时候需要你指一下路。

### 你看到 `std::is_integral<T>{}` 这个 `{}` 是什么

你前面已经见过 `std::is_integral<T>::value`。
那为什么有时候又写成 `std::is_integral<T>{}`？

因为 type traits 本身就是一个“小类型”。
它不是函数。

它可以被构造出一个对象。
这个对象在需要的时候能当成 `bool` 用。

```cpp
#include <type_traits>

static_assert(std::true_type::value, "true_type");
static_assert(!std::false_type::value, "false_type");

static_assert(std::is_integral<int>{}, "int is integral");
```

你可以把 `std::true_type` / `std::false_type` 理解成两张小卡片。
一张写着 true。
一张写着 false。

tag dispatch 传的就是这两张卡。

### `std::conditional`：在类型层面写一个“三元运算符”

有时候你不是想“选分支”。
你是想“选类型”。

`std::conditional` 就是干这个的。

```cpp
#include <type_traits>

template <class T>
using Wider = typename std::conditional<std::is_integral<T>::value, long long, double>::type;

static_assert(std::is_same<Wider<int>, long long>::value, "int -> long long");
static_assert(std::is_same<Wider<float>, double>::value, "float -> double");
```

先别纠结这个选择是不是“合理”。
你把它当成一个手法。
它让你能在类型层面写 if。

### `is_integral`：先学会问一个最简单的问题

先从最常见的开始。
你就问一句：它是不是整数。

```cpp
#include <type_traits>

static_assert(std::is_integral<int>::value, "int is integral");
static_assert(!std::is_integral<double>::value, "double is not integral");
```

这里的 `.value`，你可以把它当成一个“编译期的 `bool`”。
不是运行时算出来的。
是编译器在编译时就拍板的。

你可以把它理解成一张“体检表”。
`std::is_integral<T>` 这张表上。
对 `int` 打勾。
对 `double` 打叉。

```cpp
#include <type_traits>

static_assert(std::is_integral<char>::value, "char is integral");
static_assert(std::is_integral<unsigned>::value, "unsigned is integral");
static_assert(!std::is_integral<float>::value, "float is not integral");
```

### `static_assert`：先把门焊死

回到刚才那个打包函数。
你不想再让 `std::string` 混进来。
最直接的办法，是先把门焊死。

```cpp
#include <vector>
#include <type_traits>

template <class T>
void append_bytes(std::vector<unsigned char>& out, const T& x) {
    static_assert(std::is_trivially_copyable<T>::value, "T must be trivially copyable");
    auto p = reinterpret_cast<const unsigned char*>(&x);
    out.insert(out.end(), p, p + sizeof(T));
}
```

这时候你再传 `std::string`，编译器会直接拦住你。

错误信息也会变得像人话一点。

这一步很重要。
因为大多数“模板地狱”，其实都是缺一个像样的门卫。

这里我故意换了一个 trait。
`is_trivially_copyable` 你先不用背。

你只要抓住直觉。
它想表达的是。

这个类型能不能当成一坨字节 `memcpy` 走。

`int` 一般可以。
`std::string` 一般不行。

（顺便说句实话：序列化这事，光靠这个也不够。
网络协议通常还得考虑字节序、对齐、版本。
但这里我们先练“门卫”这一招。）

### 再来一个更像“刚学完 C”的例子：只给整数加一

```cpp
#include <type_traits>

template <class T>
T inc(T x) {
    static_assert(std::is_integral<T>::value, "T must be integral");
    return x + 1;
}
```

这个例子没有花活。
不是整数。
就别进来。

### `enable_if`：不是报错，而是换一条路

但你很快会嫌 `static_assert` 太硬。
有时候你不是想报错。
你是想“同名函数，分流处理”。

这就叫重载。
同一个函数名，参数不一样，编译器会挑一个“最像的”。

比如整数走一条路。
其它类型走另一条路。

```cpp
#include <type_traits>

template <class T>
typename std::enable_if<std::is_integral<T>::value, void>::type
log_value(const T& x) {
    // 这里只处理整数
}

template <class T>
typename std::enable_if<!std::is_integral<T>::value, void>::type
log_value(const T& x) {
    // 其它类型走这里
}
```

这写法看起来绕。

你可以把 `enable_if<条件, 类型>::type` 当成一个开关。
条件成立就有 `type` 这个东西，于是函数签名是完整的。

这里的“签名”你先理解成：函数名 + 参数那一串长相。

条件不成立就没有 `type`，这个重载在编译期就“组装失败”。

这就是你经常听到的那个词：SFINAE。
你不用背全称，把它当成“模板自己悄悄退场”就够用了。

还有个更“口语”的写法。
叫 tag dispatch。

你把 trait 的结果当成一个参数传下去。
传进去的是 `std::true_type` 或 `std::false_type`。

```cpp
#include <type_traits>

template <class T>
void log_value_impl(const T&, std::true_type) {}

template <class T>
void log_value_impl(const T&, std::false_type) {}

template <class T>
void log_value(const T& x) {
    log_value_impl(x, std::is_integral<T>{});
}
```

这套写法你以后在标准库实现里也能经常见到。
因为它比 `enable_if` 更好调试。

如果你觉得 `enable_if` 太长。
这是正常的。
当年写模板的人，十个里有九个也嫌它长。

（顺手补一句：C++14 之后有 `std::enable_if_t`。
写起来会短很多。
但底层还是同一招。）

你现在只要能读懂就行。
写多了自然就顺。

### `is_same`：当你想确认“到底是不是你以为的那个 T”

还有一种常见心虚。

你以为 `T` 是 `int`。
结果它其实是 `long`，或者是 `const int`。

要是你写的是“万能引用”（`T&&` 这种），它甚至可能变成 `int&`。
引用你可以理解成“别名”，`int&` 不是一个新的整数，它是某个整数的别名。

```cpp
#include <type_traits>

static_assert(std::is_same<int, int>::value, "same");
static_assert(!std::is_same<int, const int>::value, "not same");

template <class T>
void f(T&&) {
    static_assert(std::is_same<T, int&>::value, "T must be int&");
}

int main() {
    int x = 0;
    f(x);
}
```

这就是 `is_same`。

它不花里胡哨。
就是帮你问一句：这俩是不是同一个类型。

然后你很容易想要下一步。
“那我能不能把 `const`、引用这些壳子剥掉？”

可以。
这也是 type traits 常用的一大类。

```cpp
#include <type_traits>

template <class T>
using Bare = typename std::remove_const<typename std::remove_reference<T>::type>::type;

static_assert(std::is_same<Bare<const int&>, int>::value, "bare const int& -> int");
```

再给你一组更“眼见为实”的。

```cpp
#include <type_traits>

static_assert(std::is_pointer<int*>::value, "int* is pointer");
static_assert(!std::is_pointer<int>::value, "int is not pointer");

static_assert(std::is_same<std::remove_pointer<int*>::type, int>::value, "remove *");
```

### 一个横向对比：同样的需求，你还能怎么做

你当然可以不用 type traits。

你可以写一堆重载。
`log_value(int)`。
`log_value(double)`。
`log_value(std::string)`。

这对小项目挺友好。
但类型一多。
你会写到怀疑人生。

你也可以走运行期。
像 C 那样塞 tag。
或者用虚函数做多态。

这些路都能走。
只是它们把错误留到运行时。

后来 C++17 又给了一招 `if constexpr`。
写起来像 if。
但分支在编译期就能剪掉。

再后来 C++20 有 concepts。
你可以用更接近“人话”的方式写约束。

但不管外面怎么玩。
你会发现底层那套“体检表”，还是 traits。

type traits 的这条路更像是。
把 if 搬进类型系统里。
让编译器提前帮你做分支。

### `decay`：你以为你在存值，其实你在存引用

最后一个坑，新手特别容易踩。

你写了个小盒子，想把传进来的东西存起来。
看起来很无害。

```cpp
template <class T>
struct Box {
    T value;
};
```

但如果你写了一个工厂函数，用的是“万能引用”（也叫转发引用）。

它长得像 `T&&`。
但在模板里，它既能接左值（有名字的变量），也能接右值（临时对象）。

于是 `T` 的推导结果，可能会变成引用。

```cpp
#include <utility>

template <class T>
Box<T> make_box(T&& x) {
    return Box<T>{std::forward<T>(x)};
}

Box<int&> bad() {
    int x = 0;
    return make_box(x);
}
```

`std::forward` 你先把它当成：尽量保持参数原来的“身份”。
原来是左值就当左值，原来是右值就当右值。

这里的坑其实是左值。

你在 `bad()` 里传进去的是变量 `x`。
它是左值，于是 `T` 会推导成 `int&`，`Box<T>` 就会真的存一个引用。

然后 `bad()` 一返回。
`x` 没了。
引用还在。

这就叫引用悬空。

所谓“悬空”，就是别名还在，但它指向的那个对象已经没了。

你以为你在存值。
其实你在存定时炸弹。

`decay` 的意思很朴素。

把 `T` “揉成适合存储的样子”。

你可以把它当成一个组合拳。
先去引用。
再去 `const`。
然后把数组、函数这种“怪形状”变成更好存的版本。

你可以用几个断言把直觉钉住。

```cpp
#include <type_traits>

static_assert(std::is_same<std::decay<int&>::type, int>::value, "decay int& -> int");
static_assert(std::is_same<std::decay<const int>::type, int>::value, "decay const int -> int");
static_assert(std::is_same<std::decay<int[3]>::type, int*>::value, "decay array -> pointer");
```

再把它放回“存储”这个场景里。

```cpp
#include <type_traits>
#include <utility>

template <class T>
struct Box2 {
    using U = typename std::decay<T>::type;
    U value;
};

template <class T>
Box2<T> make_box2(T&& x) {
    return Box2<T>{std::forward<T>(x)};
}

int main() {
    int x = 0;
    auto b = make_box2(x);
    static_assert(std::is_same<decltype(b.value), int>::value, "stored as int");
}
```

`T&` 会变成 `T`。
`const T` 会去掉 `const`。

数组会变成指针。
函数类型会变成函数指针。

这个“数组变指针”的感觉，你其实在 C 里见过。
函数参数写 `int a[]`。
进函数以后它就是 `int*`。
这就是一种“退化”。

你可以把它理解成：把参数类型，翻译成一个更像值的存储类型。

### 小结：几条路其实是在解决同一件事

你想要的东西很简单。
在“泛型”里写清楚前置条件。

你可以靠文档。
也可以靠约定。
也可以靠 code review。

但最稳的一条路。
还是让编译器替你守门。

### 最后留一个洞见

type traits 的价值，真不在于你写出多炫的模板。

而在于你终于能把话讲清楚：哪些类型允许，哪些类型禁止。

你不是靠文档写一句 “T 必须是整数”。
你是让编译器签字，然后把锅提前扔回编译期。

这就是我觉得它最妙的地方。

你把“线上啪一下”的风险。

换成了“编译时啪一下”。

而这个“啪”。

通常更便宜。
