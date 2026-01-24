---
title: 'std::tuple：多返回值与结构化打包（无宏版）'
description: 'C++11 的 tuple 让“返回多个值”不再依赖 out 参数或 struct 临时拼装，也成为很多泛型库的基础积木。'
---

### C++11 之前

你想“从函数里带回两个东西”。

没有神兵利器。

只有手工活。

有人用引用。

有人用指针。

有人写一堆小结构体。

还有人……开始写宏。

你没听错。

为了多返回值。

真的有人写宏。

### 当年没有 tuple 的日子

那会儿还在 C++98 的年代。

标准库里没有 `std::tuple`。

但需求早就摆在那儿了。

解析一个字符串。

拆出两个字段。

算一个结果。

顺手再带个错误码。

你只想“回两个值”。

结果要先学会“怎么把值带出去”。

### 坑是怎么来的：out 参数

最常见的写法，是 out 参数。

也就是函数表面上返回一个 `bool`。

真正的数据，用引用（或者指针）塞到你手里。

如果你刚从 C 过来，“引用”可以先当成“变量的别名”。

它看起来像值，但它其实能改到外面那个变量。

指针你更熟，本质上也是“让函数能改到外面的东西”。

```cpp
bool parse_endpoint(const std::string& s, std::string& host, int& port);
```

这写法很 C。

但读起来像办手续：你得先准备好 `host` 和 `port`，再把它们递进去。

更麻烦的是，你还得祈祷每个调用点都记得检查返回值。

### 线上啪一下：失败路径把旧值带进了下一次

你写了个小服务，从配置里读地址列表。

一行一个 `host:port`。

某天凌晨，运维改了一行，多打了个空格。

然后线上啪一下。

```cpp
std::string host;
int port = 0;

for (auto& line : lines) {
    parse_endpoint(line, host, port); // 忘了检查返回值
    connect(host, port);
}
```

这一段代码最坏的地方不是“解析失败”。

而是失败以后，`host` / `port` 可能还保持着上一次的旧值。

下一次 `connect(host, port)`，你以为它连的是这一行，它其实连的是上一行。

日志看着还挺合理。

排查能把人逼疯。

失败路径和数据路径混在一起。

### 另一条路：临时 struct（更干净，但也更累）

于是有人说：那我就返回一个结构体。

别让调用点“自带容器”。

```cpp
struct Endpoint {
    std::string host;
    int port;
};

Endpoint parse_endpoint2(const std::string& s);
```

这确实更像“返回一个值”，也更好测试。

但你很快会遇到另一个现实问题：这个类型可能只用一次，你还得给它起名字。

它放在哪个头文件，会不会污染命名空间，再加一个字段要不要改一堆地方。

小项目里也就算了。

模板库作者看到这个，就开始掉头发了。

### 从坑里爬出来：`std::tuple`（一个“匿名 struct”）

后来 Boost 里先做了 `boost::tuple`，再后来 TR1 里也放过一版。

C++11 才把它变成了标准库的 `std::tuple`。

Boost 你可以理解成“民间高手的 C++ 扩展包”。

当年很多东西都是先在 Boost 里验证可行，再慢慢进标准。

TR1 你可以先不深究。

把它当成“标准库的一次预告片”就行。

你可能会好奇：tuple 这种东西听上去不复杂，为什么拖到 C++11 才“彻底定型”。

因为 C++11 之前，模板还做不到“想要多少个类型参数就来多少个”。

你只能写 `Tuple2<T1, T2>`，`Tuple3<T1, T2, T3>`，想支持到 10 个，就得写 10 套，或者用宏生成 10 套。

Boost 的 tuple 时代，这种活就经常交给预处理器干。

C++11 引入了变参模板，也就是你会看到的这种写法：`tuple<Ts...>`。

这个 `...` 的意思是“这里是一串类型”。

于是 tuple 才真的变成了一个可扩展的基础设施。

你可以把它理解成一个“匿名的结构体”：有字段，但字段不叫名字，只按位置排。

位置从 0 开始数，也就是：第 0 个，第 1 个，第 2 个。

这听上去不够优雅。

但它解决的是“组织代码”的问题：让多返回值变成一个真正的值，不再靠外部变量来承接。

多返回值很多时候不是语法糖。

它是在救你的数据流。

### 最常见的用法：打包返回 + `get`

还是那个解析。

我们把“成功/失败”和“数据”一起打包返回。

```cpp
#include <tuple>
#include <string>

std::tuple<bool, std::string, int> parse_endpoint3(const std::string& s);

auto r = parse_endpoint3(line);
bool ok = std::get<0>(r);
auto host = std::get<1>(r);
int port = std::get<2>(r);
```

`std::get<0>(r)` 的意思是取“第 0 个元素”。

这是编译期的索引。

所谓“编译期”，就是程序还没跑起来的时候。

编译器就能把你写错的地方揪出来。

你可能会问。

为什么这里是 `get<0>`。

而不是 `get(0)`。

原因很朴素。

tuple 的每个位置，类型可能都不一样。

第 0 个是 `bool`。

第 1 个是 `std::string`。

如果你给它一个运行时的 `int i`。

编译器就没法决定“返回什么类型”。

你写成 `std::get<3>(r)`，编译器会直接拒绝你，至少不会给你留一个“运行时炸雷”。

当然，`get<0>` / `get<1>` 这种写法，读起来还是有点像在点菜。

### 不想写 `get<0>`：用 `tie` 解包（C++11 很实用）

C++11 里常用的搭配是 `std::tie`。

你可以把它理解成“把一组变量绑成一个接收器”。

更具体一点：它会生成一个“由引用组成的 tuple”。

所以你才能把它放在赋值号左边，让右边的 tuple 把值一个个塞进来。

也正因为它是引用。

`tie` 适合在一行里做“接收”。

别把 `std::tie(...)` 保存起来到处传。

更别把它从函数里返回。

如果你非要记一句。

就记这个：`tie` 不存值。

```cpp
bool ok = false;
std::string host;
int port = 0;

std::tie(ok, host, port) = parse_endpoint3(line);
if (!ok) return;
connect(host, port);
```

这时候，数据流就清爽多了。

成功就用，失败就停。

不会悄悄带着旧值往下跑。

还有个小技巧。

你不关心某个位置，可以用 `std::ignore`。

它的意思很直白：这个坑我不要，扔掉。

```cpp
std::tie(std::ignore, host, port) = parse_endpoint3(line);
```

### 再来一个小项目味的例子：多字段比较

你写了个小工具。

要把日志按两个字段排序。

先按 `user_id`。

再按 `timestamp`。

你当然可以手写一堆 if。

但很多老 C++ 工程里，会这么写。

```cpp
#include <tuple>

struct Log {
    int user_id;
    int ts;
};

bool operator<(const Log& a, const Log& b) {
    return std::tie(a.user_id, a.ts) < std::tie(b.user_id, b.ts);
}
```

这里用到的是 tuple 的“字典序比较”。

先比第 0 个。

第 0 个相等，再比第 1 个。

跟你手写 if 的逻辑一样。

只是看起来更短。

### 横向对比：out 参数、struct、pair、tuple

到这一步，你大概会想问一句：“我到底该用哪个”。

先说个直观的经验：你不是在选语法，你是在选“数据怎么流动”。

out 参数省事，也最容易把状态带歪。

忘记检查一次，就可能带着旧值跑半天。

struct 最好读，字段有名字。

但你得定义一个类型，还得给它找个家。

pair 其实可以看成“只有两个元素的 tuple”。它出现得更早，也更常见。

你只有两个值要带回来的时候，`std::pair` 往往更轻。

```cpp
#include <utility>
#include <string>

std::pair<std::string, int> parse_endpoint_pair(const std::string& s);

auto p = parse_endpoint_pair(line);
connect(p.first, p.second);
```

`first/second` 虽然也不算完美。

但比 `get<0>/get<1>` 更像人话一点。

而且标准库里一堆接口就是用 pair 返回两个东西。

比如 `std::minmax`。

```cpp
#include <algorithm>
#include <utility>

auto mm = std::minmax(3, 7);
int lo = mm.first;
int hi = mm.second;
```

再比如 `map::insert`。

它会返回“插入位置”以及“到底插进去了没有”。

```cpp
#include <map>
#include <string>

std::map<std::string, int> m;
auto r = m.insert({"a", 1});
bool inserted = r.second;
```

当你要带回三个以上的东西。

tuple 就开始有优势了。

你不需要为“一次性返回值”专门造一个类型。

```cpp
#include <tuple>
#include <string>

std::tuple<std::string, int, bool> parse_endpoint4(const std::string& s);

std::string host;
int port = 0;
bool ok = false;
std::tie(host, port, ok) = parse_endpoint4(line);
```

如果你不想手写 `std::tuple<...>` 的类型。

也可以用 `std::make_tuple` 让编译器帮你推导。

```cpp
return std::make_tuple(host, port, ok);
```

这里 `tie` 的好处是。

左边像“解包”。

右边像“返回一个值”。

中间不需要 out 参数那种“先准备容器再递进去”的仪式感。

### 一个更老实的写法：把错误也带回来

新手写解析函数时。

最容易写成“失败就返回 false”。

然后把失败原因丢了。

你可以用 tuple 把错误信息也一起带回来。

```cpp
#include <tuple>
#include <string>

std::tuple<bool, std::string, std::string, int> parse_endpoint5(const std::string& s);

bool ok = false;
std::string err;
std::string host;
int port = 0;
std::tie(ok, err, host, port) = parse_endpoint5(line);
```

这时候你就不会写出那种。

“线上坏了但日志里什么都没有”的代码。

当然。

如果你发现字段越来越多。

那往往就是提醒你。

该回到 struct 了。

### tuple 为什么总出现在泛型库里

如果你只是写业务，很多时候，一个小 `struct` 依旧最好读。

`tuple` 真正擅长的是另一类场景：当你写模板时，你面对的不是“两个 int”，而是“一串类型”。

你需要一个容器，能把这串类型当成一个值，传来传去，组合来组合去。

于是 `tuple` 就变成了基础设施。

### 小洞见

`struct` 更像“给人看的”。字段有名字，一眼就懂。

`tuple` 更像“给类型系统看的”。

它不替代结构体。

它更像一条管道，让“多个东西”可以像“一个东西”那样流动。
