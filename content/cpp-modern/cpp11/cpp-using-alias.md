---
title: 'using 类型别名与别名模板：typedef 的升级版'
description: 'C++11 的 using 把类型别名变得更直观，也补上 typedef 做不到的“别名模板”，让模板代码少一层绕口令。'
---

typedef 这东西。

老。

但它当年是救命的。

那会儿你想写一点“通用代码”。

类型名一长就失控。

你以为自己在写程序。

其实是在抄模板参数。

typedef 就像一根救生绳。

先把你从类型海里拽出来。

然后你会更好奇。

后来为什么又冒出了 using。

### 当年：只有 typedef 的年代

C++ 把“泛型编程”带进来之后，STL 这套库一下子火了。
你开始用 `std::vector`、`std::map`。

也第一次正面撞上模板（template）。
你可以先粗暴理解成：模板就是把“类型”当参数传进来的语法。

如果你只写过 C。
你可能见过另一种“假泛型”。

```c
#define SWAP(a, b, T) do { T t = (a); (a) = (b); (b) = t; } while (0)
```

宏也能解决问题。
但它不认识类型。
它只是复制粘贴。

模板不一样。
它是真在“按类型生成代码”。
所以它一旦组合起来，类型名也会跟着组合起来。

```cpp
typedef std::vector<std::string> StrVec;
```

这行在当年很重要。
它把“火车一样长的类型”压成一个短名字。
你写业务代码时，脑子能喘口气。

但注意。
这只是“给一个具体类型起外号”。
它解决不了“给一类类型起外号”。

### 事故：我只是想写个“能复用的别名”

场景很朴素。
你写了个小服务，线上要接一堆数字 ID。
代码里到处都是 `std::vector<...>`。

上线一周都挺稳。
直到某天凌晨报警，你要加一个热修逻辑。

线上啪一下。

```cpp
typedef std::vector<int> IntVec;

IntVec ids;
```

这时候 `typedef` 很香。
你不用在业务里到处看见 `std::vector<int>`。
变量声明也不再像绕口令。

然后需求开始分叉。
有的地方是 `int`，有的地方是 `long`，还有的是 `std::string`。

你想要的其实是一个“可复用的壳”：`Vec<T>`。
于是你很自然地写了这么一段。

```cpp
template <class T>
typedef std::vector<T> Vec;
```

编译器会直接拒绝你。
`typedef` 不能做成模板。
你想表达的是“别名模板”（alias template），但当年的语法里没有这玩意。

### 踩坑：typedef + struct + ::type 的绕口令

没有别名模板怎么办？
当年大家的解法很一致：用一个 `struct` 包一层，再塞一个 `type`。
听着像废话，但它确实能工作。

你可以把它当成一种老式约定。
就像大家默认把“返回值”叫 `type`。
因为它真的在“返回一个类型”。

```cpp
template <class T>
struct Vec {
  typedef std::vector<T> type;
};
```

你要用的时候，再把 `type` 抽出来。
这时候你会第一次见到一个新词：`typename`。
它的作用很简单：告诉编译器“后面这个东西是类型名”。

```cpp
template <class T>
void push_one(typename Vec<T>::type& v, const T& x) {
  v.push_back(x);
}
```

然后你就会理解那种经典吐槽。
“模板报错像一张长卷轴，你从上往下读完，天都亮了。”

不是你不会改。
是你得先翻译编译器在说什么。

再补一句背景。
模板是“先把代码记下来”，等你传进 `T` 之后再展开。
在展开之前，编译器看到 `Vec<T>::type`，它其实不敢肯定 `type` 是类型。

万一有人写的是这样呢。

```cpp
template <class T>
struct Vec {
  static int type;
};
```

所以它需要你明确一下。

这就是 `typename` 这类语法的来历。
不是为了刁难人。
是为了让编译器别乱猜。

### C++11：using 把语序掰正了

C++11 做的第一件事很克制：把“给类型起外号”写得像赋值。
读法也更顺：左边是名字，右边是原型。
你一眼就知道在干嘛。

顺手提醒一下。
`using` 在 C++ 里其实有好几种用法。
我们这篇只聊“类型别名”这一种。

```cpp
using std::swap;

using namespace std;
```

上面这俩也是 `using`。
但它们是在导入名字。
不是在起类型外号。

```cpp
using StrVec = std::vector<std::string>;
```

StrVec 就是 `vector<string>`。
没有 `typedef` 那种“名字夹在中间”的倒装句。
写久了你会发现，代码噪音少一点，脑子的错误也少一点。

### 别名模板：终于可以“把壳拿出来”

第二件事才是真正补坑：允许你给模板类型起外号。
也就是你当年写不出来的 `Vec<T>`。
语法长这样。

```cpp
template <class T>
using Vec = std::vector<T>;
```

它看起来像语法糖。
但它把上面那套 `struct + ::type + typename` 直接删了。
你写业务函数时，终于能直说“这是 Vec<T>”。

```cpp
template <class T>
void push_one(Vec<T>& v, const T& x) {
  v.push_back(x);
}
```

注意这次没有 `::type`。
也不需要 `typename`。
你表达的意图更直接：我就是要一个“装 T 的 vector”。

### 横向看一眼：为什么 using 更像“写给人看的”

`typedef` 的读法，是从中间开始绕。
你得把声明“倒过来读”。

`using` 更像赋值。
你把名字放在左边。
把真实类型放在右边。

这件事看起来小。
但对新手很友好。

因为你看懂的速度更快。
你犯错的概率也会跟着低一点。

### 横向瞄一眼：别的语言怎么写“类型别名”

很多语言都把类型别名写得像赋值。
人眼一扫就懂。

```csharp
using StrVec = System.Collections.Generic.List<string>;
```

```rust
type StrVec = Vec<String>;
```

你不写这些语言也没关系。
你只要记住一件事：左边是名字，右边是原型。

### 例子：函数指针（typedef 最容易把人绕晕）

你在 C 里应该见过函数指针。
只是到了 C++，这种声明更容易长成麻花。

```cpp
typedef void (*Handler)(int);
```

能看懂。
但你得盯着括号看半天。

换成 `using`。

```cpp
using Handler = void(*)(int);
```

读法很直。
Handler 就是“接收 int、返回 void 的函数指针”。

### 例子：traits（这就是 ::type 传统的主战场）

当年 `::type` 为啥这么常见？

因为 Boost 这类库把模板玩得很深。
它们需要一堆“编译期的小工具函数”。

这些工具的返回值不是数字。
而是“一个类型”。

比如标准库今天就有这种写法。

```cpp
typename std::remove_reference<T>::type
```

意思是：把 `T&`、`T&&` 这种引用去掉，得到一个干净的类型。
（你先把它当成“类型层面的工具函数”就行。）

有了别名模板之后，你可以把它压成一个更像人话的名字。

```cpp
template <class T>
using RemoveRef = typename std::remove_reference<T>::type;
```

然后调用点就舒服了。

```cpp
RemoveRef<int&> x = 1;
```

这类 traits 通常在头文件 `<type_traits>` 里。

你看到的就是意图。
而不是一串 `::type`。

### 例子：资源管理（把你不想暴露的参数藏起来）

你刚接触 C++11 时，很容易被 `std::unique_ptr` 的第二个模板参数吓一跳。
它叫 deleter。
简单说就是“释放资源的函数”。

你在写文件句柄时就会遇到。

```cpp
using FilePtr = std::unique_ptr<FILE, int(*)(FILE*)>;
```

这个例子里。
`std::unique_ptr` 在 `<memory>`。
`FILE` 在 `<cstdio>`。

这行看着有点烦。
但它表达的事情很具体：FILE 要用 `fclose` 那套规则释放。

如果你想让项目里都统一用这个类型。
你就把细节藏进别名。

业务代码里。
你就只看到 `FilePtr`。

### 再往后一点：C++14 把“常用的别名”官方化了

C++11 有了别名模板。
但你会发现一个尴尬点。

很多 traits 还是得写 `typename ...::type`。
调用点依然吵。

所以后来标准库顺势给了 `_t` 这一套。

```cpp
std::remove_reference_t<T>
```

它本质上就是一个官方提供的别名模板。
把 `::type` 这层皮直接剥掉。

### 把场景再落地一点：藏住你不想让人关心的细节

更现实的用法，是把团队不想反复讨论的细节藏起来。
比如“统一的字符串类型”。
你希望大家关注语义，而不是 `basic_string` 的模板参数。

所以你可能会写这样的别名。

```cpp
template <class Char>
using BasicStr = std::basic_string<Char>;

using Utf8Str = BasicStr<char>;
```

读代码的人看到 `Utf8Str`，心里想的是“这是 UTF-8 字符串”。
不是先被 `basic_string` 绊一跤，再去回忆那一串参数代表啥。
这就是别名的意义：把注意力挪回业务上。

### 小洞见

`using` 的价值，真不只是“少打几个字”。
它是在帮你把“类型细节”从接口里剥出去。
你留下的是意图。

大项目里。

省的不是手指头。

是脑子。
