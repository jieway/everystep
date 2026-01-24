---
title: '变量模板：把“常量”也做成模板'
description: 'C++14 允许你写 template <...> constexpr T xxx = ...；少一些宏，少一些重复，也少一些玄学初始化。'
---

那会儿写 C++。

标准还没给你太多“高级玩具”。

但项目该写还是得写。

我们会写一堆常量。

配一堆平台。

再配一堆开关。

你以为你在写一个 `MAX_BUF`。

其实你在写一场“预处理器赌博”。

预处理器就是编译前那一步。

它会把 `#include` 展开。

也会把 `#define` 直接替换。

它不讲类型。

也不讲作用域。

有时候它编得过。

有时候它也编得过。

然后线上啪一下。

你才发现。

同一个名字。

在不同的 `.cpp` 里。

居然不是同一个东西。

### 那个年代：常量全靠宏撑着

最常见的写法就是宏。
写在头文件里。
所有人 `#include`。

```cpp
#define PI 3.1415926
```

它的优点很“C”。
到处能用。
也不用管类型。

但宏也有一种很“C”的脾气。
它只会做文本替换。
不懂作用域。

也不懂“这玩意儿到底是个什么类型”。
调试的时候你想看它。
它往往还躲着你。

### 我们后来学乖了：`static const` 的时代

大家很快会往 C++ 那边靠。
把常量塞进类里。
让它有名字空间。

```cpp
struct math {
    static const double pi;
};

const double math::pi = 3.1415926;
```

这段代码看起来更像 C++。
但它也会提醒你一个老规矩：声明和定义是两件事。
你得保证“只有一个定义”。

链接器就是那个“把多个 `.o` 拼成一个可执行文件”的家伙。
它最喜欢在你写重复定义的时候跳出来。
然后用一屏报错把你叫醒。

这个规矩有个名字。

叫 One Definition Rule。

中文你可以先记成“一个定义规则”。

同一个东西。

全程序只能有一个真身。

### 当年还有一招：用 `enum` 偷渡常量（但它很挑食）

如果你的常量是整数。

老 C++ 里还有一个很流行的绕法。

把它塞进 `enum`。

```cpp
struct cfg {
    enum { max_buf = 8 * 1024 };
};
```

它不用你写“类外定义”。

所以不会踩到重复定义。

但它很挑食。

它基本只适合整数。

你想拿它表示 `double pi`？

那会儿就别想了。

### 但我想要的不是“一个常量”

现实更麻烦。
你要的不只是 `pi`。
你要 `float` 版、`double` 版，有时还要 `long double` 版。

### 先把“模板”这个词说人话

你看到 `template <class T>`。

别慌。

它就是在说：

我先不写死类型。

先留个坑。

这个坑叫 `T`。

等你用的时候再填。

比如你写 `pi<double>`。

那 `T` 就是 `double`。

编译器会给你生成一个“专门给 double 的版本”。

当年很多人会先写成函数模板。

```cpp
template <class T>
T pi() {
    return static_cast<T>(3.14159265358979323846L);
}
```

它能返回不同类型的值。
但它是函数。
你想把“这个常量”当成一个对象来用时，会别扭。

比如你想把它塞进另一个模板里当参数。
你会开始绕路。
绕到最后，你会怀疑自己是不是在写 C++。

再后来就有人上 traits 了。
也就是“写一个模板壳子，然后给不同类型写不同版本”。
听起来很强，写起来很累。

先把 traits 这个词拆一下。

它的意思接近“特征表”。

你给类型做一张表。

表里写：这个类型对应的常量是多少。

比如 `pi`。

```cpp
template <class T>
struct pi_trait;

template <>
struct pi_trait<float> {
    static constexpr float value = 3.1415926f;
};

template <>
struct pi_trait<double> {
    static constexpr double value = 3.141592653589793;
};
```

用的时候长这样。

```cpp
double x = pi_trait<double>::value;
```

你会发现。

大家老爱用 `::value`。

不是因为它好看。

而是因为 C++11 把一整套 type traits 标准化了。

它的传统写法就是 `xxx<T>::value`。

很多库也跟着这么写。

Boost 就是一个大头。

### 为什么大家总写 `::value`

这里面有点历史包袱。

早年的 C++ 没有 `constexpr`。
也没有“直接写一个编译期常量变量”的手段。

所以大家就用类来装。

类里放一个 `static const`。

大概长这样。

```cpp
template <class T, T v>
struct integral_constant {
    static const T value = v;
};
```

这东西后来进了标准库。

名字叫 `std::integral_constant`。

它主要拿来装整数。

或者装 `true/false`。

type traits 很多都是在“继承它”。

于是你就会见到这种写法。

```cpp
bool same = std::is_same<int, long>::value;
```

它看起来像是在“从类型里取一个值”。

其实就是类型系统里夹带了一个常量。

### 变量模板把这层“夹带”拉出来了

你可能已经感觉到了。

`std::is_same<int, long>::value` 不是不能用。

就是太像咒语。

于是 C++17 标准库开始给 traits 配“变量别名”。

```cpp
bool same = std::is_same_v<int, long>;
```

这行之所以能写出来。

靠的就是 C++14 的变量模板。

### 事故现场：两个翻译单元，两套 `MAX_BUF`

先解释一个词：翻译单元。
你可以把它理解成“每个 `.cpp` 在 `#include` / `#define` 都展开之后，那份独立编译的源码”。
宏就是在这一步生效的。

所以宏最阴的地方在于：同一个宏名，在不同 `.cpp` 里可以长得不一样。
下面这个例子很土。
但线上出事往往就这么土。

我当时就在写个小协议解析。
为了兼容两种设备，我在两个 `.cpp` 里各自 `#define MAX_BUF`。
结果就发生了下面这事。

`parse.cpp`：

```cpp
#define MAX_BUF (64 * 1024)
void parse(char* p) { p[MAX_BUF - 1] = 0; }
```

这一行写的是“我保证传进来的缓冲区至少 64KB”。
但宏不会替你保证。
它只负责把字面量塞进去。

`handle.cpp`：

```cpp
#define MAX_BUF (8 * 1024)
void parse(char*);
void handle() { char buf[MAX_BUF]; parse(buf); }
```

`handle()` 以为自己只需要 8KB。
`parse()` 却按 64KB 去写。
于是越界，然后你开始通宵。

你排查的时候会觉得像玄学。
其实就是宏把你拆成了两个世界。

### C++14：变量模板把“常量”拉进模板系统

C++14 给了一个很朴素的能力。
变量也可以像函数一样写成模板。
它有类型，也能跟着模板参数变化。

它为什么是 C++14 才来？

因为 C++11 先把 `constexpr` 引进来。

但当时限制比较多。

很多东西还写不顺。

后来 C++14 放宽了一些规则。

顺手把“变量也能做模板”这件事补上了。

```cpp
template <class T>
constexpr T pi_v = static_cast<T>(3.14159265358979323846L);
```

这里的 `template <class T>` 跟函数模板一样。
只是后面不是 `T f()`。
而是一个变量 `pi_v`。

`constexpr` 的意思也别神化。
它就是在说：如果可能，就让它在编译期算出来。
这样它才能当数组大小、模板参数那类“编译期就得知道”的东西。

现在你就能写出“像常量一样用”的模板了。

```cpp
template <class T>
constexpr T pi_v = static_cast<T>(3.14159265358979323846L);

double x = pi_v<double>;
```

读起来像取变量。

因为它就是变量。

所以这里没有 `()`。

但它又能跟着类型变。

### 你可能会问：那我写个 `constexpr` 函数不就行了？

很多时候确实行。

比如你可以把函数也写成 `constexpr`。

```cpp
template <class T>
constexpr T pi_f() {
    return static_cast<T>(3.14159265358979323846L);
}

double a = pi_f<double>();
double b = pi_v<double>;
```

两行都能工作。

区别更像是“写起来顺不顺”。

变量模板会更贴近 traits 那套写法。

尤其是你想按类型做出很多版本的时候。

还有一个更关键的点。

函数模板不能做偏特化。

你只能靠重载绕。

traits 这套东西更喜欢偏特化。

变量模板也能跟着做。

```cpp
template <class T>
constexpr bool is_ptr_v = false;

template <class T>
constexpr bool is_ptr_v<T*> = true;
```

你一眼就能看出来。

指针类型走 `true`。

别的走 `false`。

### 把事故钉死：用类型选版本，而不是用宏赌运气

宏的问题不只是“丑”。
它更大的问题是：它不受类型系统管。
你没法让编译器帮你看门。

变量模板的思路是。
把“平台/版本”做成类型。
然后让常量跟着类型走。

你也许会问。

那 traits 不是也能做吗？

能。

只是写起来更绕。

比如缓冲区上限。

traits 版本可能长这样。

```cpp
template <class Platform>
struct max_buf {
    static constexpr std::size_t value = 64 * 1024;
};

struct mobile {};

template <>
struct max_buf<mobile> {
    static constexpr std::size_t value = 8 * 1024;
};
```

用的时候你得写 `max_buf<mobile>::value`。

看久了。

眼睛会累。

而且它经常会出现在“模板参数”里。

那就更长了。

```cpp
std::array<char, max_buf<mobile>::value> buf;
```

这里你可能又会皱眉。

`std::array<char, N>` 这个 `N` 不是类型。

它是一个数。

模板参数不只可以是类型。

也可以是这种“编译期就能确定的值”。

它有个正式名字。

叫非类型模板参数。

读起来像一口气爬三层楼。

```cpp
struct desktop {};
struct mobile {};

template <class Platform>
constexpr std::size_t max_buf_v = 64 * 1024;

template <>
constexpr std::size_t max_buf_v<mobile> = 8 * 1024;
```

同样的东西。

变量模板写出来就短一点。

```cpp
std::array<char, max_buf_v<mobile>> buf;
```

顺手解释两个小词。
`std::size_t` 就是“拿来表示大小和下标”的整数类型。

而 `struct mobile {}` 这种空结构体，很多时候只是个标签。
它不需要成员。
它的价值是“这个类型本身”。

这里的“给某个类型一个专门版本”，就叫特化。
你可以把它理解成：同一个模板名，遇到某个类型就走小灶。

接下来你就能把缓冲区大小写死在类型里。

```cpp
template <class Platform>
void handle() {
    char buf[max_buf_v<Platform>];
    parse(buf);
}
```

你再也不用靠 `#ifdef`、编译选项、包含顺序来“碰运气”。
版本选择变成了显式的模板参数。
写错了，编译器会更早告诉你。

变量模板不是语法糖。

它是在给“常量”一个能被类型系统管理的身份。

### 横向对比：你到底省掉了什么

宏的世界里。

“名字”跟“值”会在不同 `.cpp` 里分裂。

你看不见。

编译器也不管。

traits 的世界里。

你把分裂收回到类型系统里了。

但你得忍受 `xxx<T>::value` 这种仪式感。

变量模板就是把这层仪式感撕掉。

它让你写 `xxx_v<T>`。

读起来更像“一个常量”。

### 最后留个亮点

你以后会在标准库里看到一堆 `*_v`。
比如 `std::is_same_v` 这种。
它背后那点“小心思”就是：把本来要写成 `::value` 的东西，变成一个更像变量的名字。

严格说。

`*_v` 这一波是后来的 C++17 才在标准库里大面积铺开的。

但它用的就是 C++14 变量模板这块地基。

> 宏很强。
> 但它不负责。

人类读起来轻松一点。
编译器也更容易替你把坑堵上。
