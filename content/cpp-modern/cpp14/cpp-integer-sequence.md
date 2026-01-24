---
title: 'integer_sequence：展开参数包时，那把“尺子”'
description: 'C++14 的 std::integer_sequence / index_sequence，解决的是“我有一包参数，怎么按下标一个个处理”。'
---

那会儿是 2013 年。

C++11 刚从标准里出来没多久。

编译器们各自“支持一点点”。

你在博客上刷到一句话。

“可变参数模板很强。”

你一激动。

想把自己的小项目也写得像个库。

结果写着写着就卡住了。

不是不会写。

是你突然发现。

标准库里少了一把很小的尺子。

但没有它。

你连“第几个参数”都数不清。

### 当年缺的那块拼图

C++11 给了你可变参数模板。

最直观的样子就是 `Ts...`。

它表示“一串类型”，长度在编译时就定死了。

听起来很美：我终于能写出泛型的库代码了。

但很快你会撞上一堵墙。

你能拿到“一包东西”，却没法“按顺序一个个处理它们”。

说白了你想要的就一件事。

给我一串 `0..N-1`。

我拿着下标去展开就行。

可惜那会儿，标准库还没把这件事补上。

### 线上啪一下：日志里只剩第 0 个参数

我印象很深的一个坑，是做一个小服务的埋点。

我们把“函数参数”打包进 `std::tuple`，扔给日志线程异步写文件。

然后某天线上报警了。

你去翻日志，心里一凉：每条记录里永远只打印了第一个参数。

剩下的像被谁抹掉了一样。

一开始你写的代码，大概就是这种“先跑起来再说”的版本。

```cpp
#include <tuple>
#include <iostream>

template <class... Ts>
void log_args(const std::tuple<Ts...>& t) {
    std::cout << std::get<0>(t) << "\n";
}
```

`std::tuple` 不是数组。

它没有 `for` 循环能跑。

你只能 `std::get<0>`、`std::get<1>` 这样一个个拿。

麻烦在于。

你根本不知道这里会有几个参数。

### 先把几个名词掰开

这里最容易把人绊倒的，是“这一切到底发生在什么时候”。

是在运行时，还是在编译时。

可变参数模板的核心，是“编译时就知道有多少个”。

```cpp
template <class... Ts>
struct box {};
```

这里的 `Ts...` 叫参数包。

你可以把它当成“一串类型”。

这串类型的长度，也是编译时就定死的。

```cpp
template <class... Ts>
void f(Ts... xs) {}
```

这里的 `xs...` 也是一包。

它是一串参数。

每个参数的类型分别对应 `Ts...`。

接着是 `std::tuple`。

你可以把它想成“能装不同类型的结构体”。

它不像数组那样全是 `int`。

所以你不能靠一个 `i` 在运行时去 `t[i]`。

而 `std::get<I>(t)` 里的 `I` 必须是编译时常量。

也就是你写死的 `0`、`1`、`2`。

如果你更习惯 C 的直觉。

可以这么记：

运行时的 `i` 是变量。

而 `std::get<I>` 需要的是“写在代码里的数字”。

### 当年的土办法：自己造一把“0..N-1”

于是大家就开始自己写“下标生成器”。

模板递归。

编译错误长得像电话账单。

比如这种东西，当年在很多项目里都能见到。

```cpp
#include <cstddef>

template <std::size_t... I>
struct idx {};

template <std::size_t N, std::size_t... I>
struct make_idx : make_idx<N - 1, N - 1, I...> {};

template <std::size_t... I>
struct make_idx<0, I...> { using type = idx<I...>; };
```

它的意思其实不复杂。

就是在编译期“攒出”一串数字。

比如 `make_idx<3>::type` 会变成 `idx<0, 1, 2>`。

你再拿着这串 `0,1,2` 去展开 `std::get<I>(t)`。

但这玩意儿不适合讲给新人听。

你光解释 `N - 1, I...` 的位置为什么这样放，就能讲掉一下午。

更现实的问题是。

每个项目都抄一份。

抄着抄着就会抄错。

有人少了一个特化。

有人换了个名字。

最后你在排查的不是业务 bug。

而是“这份模板递归到底对不对”。

### 这东西怎么来的

先把话说在前头。

`integer_sequence` 不是天上掉下来的。

它更像是标准库把“大家都在用的土办法”收编了。

当年在 Boost 里，你能找到很多“编译期序列”的影子。

比如 Boost.MPL 里有 `range_c`。

它也是一串编译期常量，但它更偏“列表算法”。

而我们在这里要的更简单。

就是一串整数。

能当下标。

能配合参数包展开。

还有一条路线，是标准库实现者自己先做。

很多实现内部早就有 `__make_integer_seq` 之类的工具，给 `tuple`、`bind` 这种组件打基础。

最后标准化的时候，干脆把它做成一个很小、很“没脾气”的积木。

不搞复杂算法。

只负责把 `0..N-1` 这件事变成标准能力。

有人调侃过一句话：

“标准库最厉害的地方，就是把大家各写各的土办法，变成一块谁都能放心踩上去的地砖。”

`integer_sequence` 就是这种地砖。

### C++14：标准库终于把尺子发下来了

C++14 给了 `std::integer_sequence`。

名字很学术。

但它干的事很接地气。

就是“保存一串编译期整数”。

然后标准库顺手给了一个别名：`std::index_sequence`。

意思是。

这串整数专门拿来当下标。

它大概长这样。

```cpp
template <class T, T... I>
struct integer_sequence {};

template <std::size_t... I>
using index_sequence = integer_sequence<std::size_t, I...>;
```

`I...` 就是一串整数。

你把它当成“编译器替你写出来的 0、1、2、3……”就行。

接下来你会看到几个“生成器”。

它们就是帮你生成这串 `0..N-1` 的。

常用的有三个。

`std::make_index_sequence<N>`。

给你 `index_sequence<0,1,...,N-1>`。

`std::make_integer_sequence<T, N>`。

给你 `integer_sequence<T, 0,1,...,N-1>`。

还有 `std::index_sequence_for<Ts...>`。

它是为了参数包准备的。

你可以把它理解成。

`std::make_index_sequence<sizeof...(Ts)>`。

你就可以把“下标序列”塞进实现函数，让它驱动展开。

```cpp
#include <tuple>
#include <utility>
#include <iostream>

template <class Tuple, std::size_t... I>
void log_tuple_impl(const Tuple& t, std::index_sequence<I...>) {
    int unused[] = {0, (std::cout << std::get<I>(t) << "\n", 0)...};
    (void)unused;
}

template <class... Ts>
void log_args(const std::tuple<Ts...>& t) {
    log_tuple_impl(t, std::index_sequence_for<Ts...>{});
}
```

这里的 `I...` 是一包下标。

`std::get<I>(t)` 在展开时，会变成 `get<0>`、`get<1>`、`get<2>`……

你不用手写，也不用递归模板把自己绕晕。

至于那行 `unused`。

它只是 C++14 时代常见的“把展开塞进初始化列表”技巧。

当年大家常用这种写法来保证“每个元素都被处理一遍”。

里面的 `(打印, 0)` 也别怕。

逗号运算符的意思是：先做左边，再把右边当结果。

我只想要“打印这个副作用”，所以后面塞个 `0` 当占位。

### 再来几个更像项目的用法

很多人第一次遇到 `index_sequence`，是在“把 tuple 里的参数还原成一次函数调用”。

你想象一个很常见的场景。

你把任务扔进队列里，队列里只有 `f` 和一份 `tuple`。

消费线程要把它们再拼回 `f(a, b, c)`。

```cpp
#include <tuple>
#include <utility>

template <class F, class... Ts, std::size_t... I>
auto apply_impl(F f, const std::tuple<Ts...>& t, std::index_sequence<I...>) {
    return f(std::get<I>(t)...);
}

template <class F, class... Ts>
auto apply(F f, const std::tuple<Ts...>& t) {
    return apply_impl(f, t, std::index_sequence_for<Ts...>{});
}
```

注意这一段里的 `std::get<I>(t)...`。

它会被展开成 `get<0>(t), get<1>(t), ...`。

然后刚好拼回一次正常调用。

这里的省略号 `...` 不是什么“省略参数”。

它表示“展开”。

把前面这个模式，按 `I...` 里的每个下标重复一遍。

再来一个更“日常”的。

你只是想对 tuple 的每个元素做同一件事。

比如都打印一遍。

```cpp
#include <tuple>
#include <utility>

template <class Tuple, class F, std::size_t... I>
void for_each_impl(const Tuple& t, F f, std::index_sequence<I...>) {
    int unused[] = {0, (f(std::get<I>(t)), 0)...};
    (void)unused;
}

template <class... Ts, class F>
void for_each_in_tuple(const std::tuple<Ts...>& t, F f) {
    for_each_impl(t, f, std::index_sequence_for<Ts...>{});
}
```

你会发现。

这其实就是我们最开始那个“日志函数”的泛化版。

区别只在于。

你把“要做的事”变成了一个回调 `f`。

同样的。

那行 `unused` 也不是在玩花活。

它只是利用了一个事实：初始化列表会从左到右执行。

所以每个 `f(...)` 都会被按顺序调用到。

还有一个小技巧。

有了下标，你就能顺手把“序号”也打印出来。

```cpp
template <class Tuple, std::size_t... I>
void dump_impl(const Tuple& t, std::index_sequence<I...>) {
    int unused[] = {0, (std::cout << "#" << I << ": " << std::get<I>(t) << "\n", 0)...};
    (void)unused;
}
```

这类需求在排查线上问题时特别常见。

你想知道的不是“它们是什么”。

而是“第几个是谁”。

还有一种也挺常见。

如果你的 tuple 里碰巧全是同一种类型。

你可以把它“搬运”成 `std::array`。

然后在运行时用 range-for 去遍历。

```cpp
#include <tuple>
#include <utility>
#include <array>

template <std::size_t... I>
auto to_array_impl(const std::tuple<int, int, int>& t, std::index_sequence<I...>) {
    return std::array<int, sizeof...(I)>{std::get<I>(t)...};
}

auto to_array(const std::tuple<int, int, int>& t) {
    return to_array_impl(t, std::make_index_sequence<3>{});
}
```

这个例子我写得有点笨。

因为我要它短。

而且它特别适合用来建立直觉。

你先用编译期的下标把东西“摊平”。

再交给运行时的循环去干活。

### 你应该记住的直觉

`index_sequence` 本身没有魔法。

它就是一串数字。

魔法发生在你把这串数字拿来当模板参数。

让一包表达式按下标被“摊开”。

### 横向对比：你可能会想到的别的路

如果你只写过 C。

你可能会想到 `...` 和 `va_list`。

它确实能“收一包参数”。

但它发生在运行时。

类型信息基本没了。

你最后只能靠约定。

或者靠格式字符串。

这就是 `printf` 那条路。

你也可能会想到宏。

宏能展开。

但宏没有类型系统。

它也不懂“第 0 个参数是什么类型”。

更别说 `tuple` 这种异构容器。

模板递归那条路我们也见过了。

能用。

但每个项目都要抄一次。

而且编译错误又长又难读。

`index_sequence` 做的事情很克制。

它不替你写业务逻辑。

它只把“下标”这件事标准化。

然后你就可以把精力放回你真正要做的事上。

### 一句话的结论

当标准库把这把“尺子”补上后。

可变参数模板才终于从“能写”变成“好写”。

### 最后留个亮点

我后来越来越觉得。

很多模板技巧，其实都在做同一件事。

把“编译期的结构”。

翻译成“一串可以执行的动作”。

你一旦抓住这个直觉。

再看到各种“展开花活”，心里就不慌了。

`integer_sequence` 就是最朴素、也最耐用的那种翻译器。
