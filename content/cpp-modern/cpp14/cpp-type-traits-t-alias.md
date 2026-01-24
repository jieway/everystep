---
title: 'type traits 的 _t：把 ::type 从代码里赶出去'
description: 'C++14 给 <type_traits> 补了一批 *_t 别名，让模板代码少一层壳，也少一些肉眼解析。'
---

那会儿 C++11 刚开始进项目。

你第一次在代码里碰到 `<type_traits>`。

不是在书上。

是在发版前一晚。

你本地一跑编译。

它啪一下就挂了。

报错里反复出现一个词。

`::type`。

你盯着它。

像盯着一根不听使唤的螺丝。

你心里只有一句话。

我只是想“拿到一个类型”。

为什么要付出这么多语法税。

### 当年没有 `_t` 的日子

C++11 把 `<type_traits>` 带进了标准库。
这东西本意很朴素。
给你一堆“类型小工具”。

你把一个类型塞进去。
它告诉你另一个类型，或者一个真假。

比如 `std::remove_reference<T>`。
它的工作就是把 `T` 里的 `&`、`&&` 去掉。

问题在于。
答案不直接给你。
它躲在一个成员里，叫 `type`。

```cpp
#include <type_traits>

template <class T>
struct box {
    using U = typename std::remove_reference<T>::type;
};
```

这一行的意思很简单。
`U` 是 “`T` 去掉引用后的类型”。
但你得写出 `typename ...::type` 这套仪式。

写多了。
眼睛会开始自动跳过中间那截。

### 先把 “type trait” 这两个词掰开

你可以先把它当成“类型的体检表”。
不是运行时的。
是编译的时候，编译器顺手帮你算出来的。

有一类 trait 给你一个真假。

```cpp
#include <type_traits>

static_assert(std::is_pointer<int*>::value, "");
static_assert(!std::is_pointer<int>::value, "");
```

这里的 `value` 就是答案。
它是一个编译期的常量。
所以你能用 `static_assert` 在编译阶段就拦住错误。

还有一类 trait 给你一个“新类型”。

```cpp
#include <type_traits>

using A = std::remove_reference<int&>::type;
static_assert(std::is_same<A, int>::value, "");
```

你看到了。
答案不是一个数字。
而是一个类型。

它藏在 `::type` 里。

### 为什么答案要藏在 `::type` 里

这不是标准库故意刁难你。
它更多是历史留下来的写法。

在 C++11 之前。
你还没有“带参数的类型别名”这种能力。
更没有 `std::remove_reference_t<T>` 这种写法。

那时大家要在“编译期算一个类型”。
基本套路就是：
用一个 `struct` 包住结果。
然后把结果放在里面，起名叫 `type`。

像这样。

```cpp
template <class T>
struct my_remove_reference {
    typedef T type;
};
```

这套风格在当年很流行。
Boost 的 type traits、Boost.MPL 也大量这么写。

后来 TR1（可以理解成“标准库的前传试验田”）也吸收了不少。
再后来 C++11 把它们收编进 `<type_traits>`。

于是 `::type` 就成了“行业惯例”。
不是因为好看。
而是因为大家当年真的只有这一招。

### `typename`：编译器不是读心术

当年最常见的坑之一。
就是漏掉 `typename`。

比如你写成这样。

```cpp
#include <type_traits>

template <class T>
struct box {
    using U = std::remove_reference<T>::type;
};
```

这在模板里会炸。
因为这里的 `T` 还没定下来。
它要等你真的用 `box<int&>`、`box<std::string&&>` 这种东西时，才知道 `T` 是谁。

编译器看到 `::type`，它不敢猜你是在说“类型”。

它需要你用 `typename` 明确告诉它：这里是个类型。

你可能会想。
我明明就写了个 `::type`。
它不是类型还能是什么。

所以你加上。

```cpp
template <class T>
struct box {
    using U = typename std::remove_reference<T>::type;
};
```

能编译了。
但也更像在“填表”。
不是在表达意图。

### 当年大家怎么自救：先把扳手造出来

工程里没人愿意每天抄 `typename ...::type`。
尤其是你写的不止一层。
套两层三层的时候，读代码的人会开始怀疑人生。

所以很多团队会先统一一个小别名。

```cpp
#include <type_traits>

template <class T>
using remove_ref_t = typename std::remove_reference<T>::type;
```

然后你就能写得像人话一点。

```cpp
template <class T>
struct box {
    using U = remove_ref_t<T>;
};
```

这招很管用。
但也很烦。
每个项目都要造一遍。

名字还经常不一样。

今天叫 `remove_reference_t`。
明天叫 `remove_ref_t`。
后天叫 `RemoveRef`。
你接手别人的库，又得重新适应一套。

### 插一句历史：C++11 已经有 `using`，但当年还是一团乱

如果你只写过 C。
你可能更熟的是 `typedef`。

```cpp
typedef int i32;
```

它能起别名。
但它有一个硬伤。

你没法“带参数”。

你不能写 `typedef remove_reference<T> ...` 这种东西。
因为 `typedef` 不是模板。

C++11 给了一个更顺手的工具。
叫 alias template。
写法就是 `using`。

```cpp
#include <type_traits>

template <class T>
using my_remove_reference_t = typename std::remove_reference<T>::type;
```

你看。
这就是 `_t` 的原型。

所以从能力上讲。
C++11 时代你就已经能“自救”了。
大家也确实这么干。

但问题还是那个。
各家各写各家名。
没有统一的约定。

### 为什么等到 C++14 才统一给 `_t`

你可以把 C++14 当成一次“体验优化版”。
它没想塞很多新概念。
更像是在给 C++11 这套大工程擦屁股。

委员会看到大家都在重复写同一行别名。
也看到 Boost 这种生态里已经形成了事实用法。
于是干脆把最常用的一批收编。

统一名字。
统一位置。
你进任何项目，都能直接用。
不用先问“你们家 `RemoveRef` 放哪儿”。

### 事故复现：我只是想把参数“存起来”

给你一个特别像小项目的场景。
你写了个“延迟执行”的小工具。
传进来一个参数，你把它存起来，过一会儿再用。

你觉得这很安全。
结果线上啪一下。

最小复现长这样。

```cpp
#include <iostream>
#include <string>

template <class T>
struct job {
    T arg;
};

template <class T>
auto make_job(T&& x) {
    return job<T>{x};
}

job<std::string&> make_bad() {
    std::string s = "hello";
    return make_job(s);
}

int main() {
    auto j = make_bad();
    std::cout << j.arg << "\n";
}
```

这里的坑是。
`make_job(s)` 里 `T` 会被推导成 `std::string&`。
于是 `job<T>` 变成了 `job<std::string&>`。

你以为你存的是一个字符串。
其实你存的是一个引用。
而且还是指向函数内部局部变量的引用。

函数一返回，它就悬空了。
你打印它。
就等着未定义行为给你“惊喜”。
可能打印乱码。
也可能直接崩。

所以你得把 `T` 的引用去掉。
也就是回到我们开头那个 `remove_reference`。
在 C++11 里你通常会写成这样。

```cpp
#include <type_traits>

template <class T>
using stored = typename std::remove_reference<T>::type;

template <class T>
struct job {
    stored<T> arg;
};
```

能用。
但 `typename ...::type` 又回来了。
你写着写着，就会开始漏一个字。

然后编译再挂一次。

### C++14：标准库把常用扳手统一成 `*_t`

C++14 其实没发明新能力。
它做的是一件很工程化的事。
把大家最常用的那批别名，直接放进标准库。

比如。

```cpp
#include <type_traits>

template <class T>
using stored = std::remove_reference_t<T>;
```

### `_t` 的真身：就是把那行 `using` 放进标准库

它不是编译器新指令。
也不是模板黑魔法。
你可以把它想成标准库替你写了这一行。

```cpp
// 你可以把它粗略理解成这样
template <class T>
using remove_reference_t = typename std::remove_reference<T>::type;
```

这也是为什么我说。
`*_t` 不是新能力。
是“给旧能力降噪”。

你少写一个 `typename`。
少写一个 `::type`。
你也少一次把自己绊倒的机会。

而且团队里不会再出现“五花八门的自定义别名”。

大家读起来更统一。

### 横向对比：嵌套两层的时候，就开始难读了

你很快会遇到这种“链式处理”。
比如把引用去掉，再把 `const` 也去掉。

在没有 `_t` 的世界里，长这样。

```cpp
#include <type_traits>

template <class T>
using plain =
    typename std::remove_cv<typename std::remove_reference<T>::type>::type;
```

这段代码不是“难”。
是“吵”。
你得在一堆 `typename` 和 `::type` 里找主谓宾。

有了 `_t` 之后。

```cpp
#include <type_traits>

template <class T>
using plain = std::remove_cv_t<std::remove_reference_t<T>>;
```

意思没变。
但读起来像在串工具。
而不是在背语法。

### 再给一个你真的会用到的：`decay_t`

你写转发、存参数、做回调。
最后往往想要一个“拿来存就安全”的类型。

标准库给了一个更狠的。
叫 `std::decay<T>`。

它基本等价于“把 `T` 当成函数按值传参时会变成什么”。
去引用、去 `const`，数组会变指针，函数会变函数指针。

```cpp
#include <type_traits>

static_assert(std::is_same<std::decay_t<const int&>, int>::value, "");
```

你不一定马上需要它。
但你很可能很快就会看到别人用它。

### 你以后会在这些地方遇到 `_t`

`remove_reference_t` 只是开胃菜。
你还会遇到 `std::conditional_t`、`std::common_type_t` 这种“算类型”的工具。

比如 `conditional_t`。

```cpp
#include <type_traits>

template <bool ok>
using pick = std::conditional_t<ok, int, double>;
```

它的意思很直白。
条件为真就选 `int`，否则选 `double`。

甚至有一天你会看到 `std::enable_if_t`。
它的意思大概是：
如果条件不满足，就让这段模板“当场消失”。

先别急着学。
你只要先记住。
看到名字里带 `_t`。
大概率就是“别再写 `::type` 了”。

再给两个你经常会在代码里撞见的名字。

```cpp
#include <type_traits>

enum color : unsigned { red, green };
static_assert(std::is_same<std::underlying_type_t<color>, unsigned>::value, "");
```

`underlying_type_t` 的意思是。
枚举底下用的那个整数类型是什么。

```cpp
#include <type_traits>

int f(double);
using R = std::result_of_t<decltype(&f)(double)>;
static_assert(std::is_same<R, int>::value, "");
```

`result_of_t` 的意思是。
“像这样调用一次”，返回类型会是什么。
你写泛型回调的时候很常见。

顺带说一句。
你觉得这行写法有点别扭。
那不是你的问题。
`result_of` 这套语法本来就挺别扭。

### 一句话的结论

`*_t` 不会让模板变简单。

但它会让模板少一点“噪音”。

### 最后留个亮点

我一直觉得。

模板难。

有一半不是你不懂类型。

是你得先穿过一层层语法包装，才能看到“意图”。

`*_t` 就像把包装纸撕掉一点。

你终于能更快地读到那句话。

我想要的，就是那个类型。
