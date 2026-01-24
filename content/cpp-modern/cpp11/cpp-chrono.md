---
title: 'std::chrono：时间与计时'
description: 'C++11 用 chrono 把“秒/毫秒/纳秒”和“系统时钟/稳定时钟”都装进类型系统，避免 timeout=500 这种单位事故。'
---

时间这东西。

最喜欢伪装成“一个数字”。

你看着它。

觉得没啥。

然后线上啪一下。

很久以前。

我们还没有那种“把单位写进类型里”的安全感。

也没有一个统一的时间工具箱。

时间就是 `int`。

单位靠约定。

约定靠注释。

注释靠人品。

人品靠运气。

你猜线上靠什么。

### 那些年：时间靠“约定”活着

C 时代的时间接口很多。
但它们有个共同点：单位不统一。

`time()` 给你“秒”。
`clock()` 给你“CPU ticks”（你可以先当成：进程消耗的 CPU 时间）。
`gettimeofday()` 给你“秒 + 微秒”。

你写业务逻辑的时候，脑子里只想一件事：我想等 500 毫秒。
而 API 只回你一句：给我一个数字。

于是大家发明了最朴素的解决方案。
写注释，写宏，写约定。
然后把坑留给下一个维护的人。

还有更现实的一层。

当年没有“跨平台标准库”这个概念。

你在 Linux 上用一套。

在 Windows 上又是一套。

你在某台机器上测试没事。

换台机器。

时间单位和精度又变了。

这种东西。

特别爱在“项目刚上线”那天来添乱。

### 线上啪一下：`timeout = 500` 到底是什么

我写过一个很小的网络小工具。
就一个进程，连接远端，超时就重试。
代码一开始是这样的。

```cpp
int timeout = 500; // ms

struct timeval tv;
tv.tv_sec = timeout;
tv.tv_usec = 0;

select(fd + 1, &rfds, nullptr, nullptr, &tv);
```

`struct timeval` 这种老接口，用两个字段表示时间。
`tv_sec` 是秒，`tv_usec` 是微秒。

我当时的意思是：等 500 毫秒。
但我写出来的是：等 500 秒。

本地测试很难发现。
因为本地网络好。
线上一旦卡住，你的“重试”会变成“发呆”。

这种事故特别气人。
因为你回头看代码，它也没崩。
它就是不干活。

你当然可以手动换算。
写起来像这样。

```cpp
tv.tv_sec = timeout / 1000;
tv.tv_usec = (timeout % 1000) * 1000;
```

问题是：这类换算写错一次就够你记很久。
更阴的是，它还很难一眼看出来错在哪。

### chrono 做的第一件事：把“单位”变成类型

`std::chrono::duration` 你可以把它理解成：一段时间的长度。
它的核心是：数值 + 单位。

### `duration` 背后其实是一个“比例”

你不用一上来就学模板。

但你得知道 chrono 为什么能这么严谨。

因为它把“单位”做成了编译期的比例。

大概长这样。

```cpp
// 大意是这样，不用背
// duration<数字类型, 单位比例>
// 比如 std::milli 表示 1/1000
```

所以 `milliseconds` 不是“一个 typedef”。

它更像是：一个带着 1/1000 这个比例的数字。

你一旦把比例塞进类型。

编译器就能替你做很多检查。

比如“500 毫秒”。
不是“500”。
是“500 毫秒”。

```cpp
#include <chrono>

std::chrono::milliseconds timeout(500);
```

这一行就很直白。
谁再读到它，都不需要猜单位。

你要把它给一个需要“秒”的接口。
chrono 会逼你把这件事写清楚。

```cpp
auto sec = std::chrono::duration_cast<std::chrono::seconds>(timeout);
```

`duration_cast` 不是为了难为你。
它是在逼你承认：你正在改单位。
改单位这件事，一旦隐身，就容易出事。

### 一个读者常问的问题：为什么写起来这么长

你可能会问。

`std::chrono::milliseconds(500)` 也太长了。

是的。

但在 C++11 里。

它就是最稳的写法。

你可以先偷个懒。

```cpp
using namespace std::chrono;

auto timeout = milliseconds(500);
```

这里的 `using namespace` 只是为了少写几次 `std::chrono::`。

你写正式工程代码时，不想用它也完全可以。

这里的关键不是“少打字”。

而是：单位已经写死在类型里了。

后面你想怎么传，怎么换算，都有路。

顺带一提。

像 `500ms` 这种字面量写法，是后来的 C++14 才加进来的。

你用更新一点的编译器会更舒服。

比如这样。

```cpp
// C++14 起
// using namespace std::chrono_literals;
// auto timeout = 500ms;
```

### 场景：让函数接口说清楚单位

当你写一个小工具。

你早晚会写出这种函数。

```cpp
void set_timeout(std::chrono::milliseconds t);

set_timeout(std::chrono::milliseconds(500));
```

这行调用很“顺”。

因为单位直接写在代码里。

你不需要记住“这个函数要毫秒还是秒”。

如果哪天你决定把接口改成秒。

编译器会替你拦住一批潜在事故。

### 再补一块拼图：`time_point` 是“读数”

新人第一次看到 `now()` 很容易懵。
`now()` 返回的不是“秒”，也不是“毫秒”。

它更像是：某个时钟在那一刻的读数。
这玩意在 chrono 里叫 `time_point`。

你一般不会拿 `time_point` 直接打印。
你更常用它做减法。
减出来的才是 `duration`。

如果你只记一句话。

就记这句。

`time_point` 是“表盘读数”。

`duration` 是“走了多久”。

### 场景：用 deadline 写超时逻辑

很多超时逻辑。

其实写成 deadline 更不容易错。

```cpp
using namespace std::chrono;

auto deadline = steady_clock::now() + milliseconds(500);
```

这句的意思很直白。

从现在开始。

再过 500 毫秒就算超时。

你后面只要不断比较 `now()` 有没有超过 `deadline`。

就不会再纠结“我到底是累加毫秒还是累加秒”。

### 场景：睡一会儿，别写魔法数字

刚学 C 的时候。

大家都写过 `usleep(500000)`。

看起来很熟练。

但过两周你再看。

你也得想一下：这到底睡了多久。

chrono 的写法就很直白。

```cpp
#include <chrono>
#include <thread>

std::this_thread::sleep_for(std::chrono::milliseconds(200));
```

你要“睡到某个 deadline”。

也可以。

```cpp
auto deadline = std::chrono::steady_clock::now() + std::chrono::milliseconds(200);
std::this_thread::sleep_until(deadline);
```

这类代码读起来像人话。

也更不容易写反单位。

### 另一个坑：拿“系统时间”当秒表

后来我又踩过一次更阴的坑。
我用系统时间来测耗时，看起来完全没问题。

```cpp
#include <chrono>

auto beg = std::chrono::system_clock::now();
work();
auto end = std::chrono::system_clock::now();

auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - beg).count();
```

本地跑，永远是正数。
线上某天日志里出现了负数。

我第一反应是：不可能。
第二反应是：那就是真的。

原因很简单。
`system_clock` 表示“墙上挂的那块钟”。

它会被校时。
比如 NTP（网络时间同步服务）一调整，你的时间就能往回跳。

秒表最怕的就是这个。
秒表要的是：只往前走。

### chrono 做的第二件事：把“时钟来源”也变成类型

chrono 里常见的三个时钟，你可以这么记。

`system_clock`：用来显示给人看的时间。

`steady_clock`：用来计时的时间。

`high_resolution_clock`：实现相关，别太依赖它的语义。

你要测耗时。
就用 `steady_clock`。

```cpp
auto beg = std::chrono::steady_clock::now();
work();
auto end = std::chrono::steady_clock::now();

auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - beg).count();
```

`steady` 的意思你可以当成：稳。
它保证单调递增。

也就是不回头。

这就像一个老工程师在旁边提醒你。

别拿墙上的钟当秒表。

如果你写过一点点 Linux/POSIX。

可以这样对上号。

`system_clock` 更像 `CLOCK_REALTIME`。

`steady_clock` 更像 `CLOCK_MONOTONIC`。

你不需要记住这些名字。

只要记住差别。

一个会被校时。

一个只往前走。

### 场景：打印一个“人能看懂”的当前时间

计时用 `steady_clock`。

那“现在几点了”这种需求怎么办。

用 `system_clock`。

```cpp
#include <chrono>
#include <cstdio>
#include <ctime>

auto now = std::chrono::system_clock::now();
std::time_t t = std::chrono::system_clock::to_time_t(now);

std::puts(std::ctime(&t));
```

这里 `time_t` 你可以当成：Unix 时间戳。

`ctime` 会把它转成一行可读的字符串。

这段代码不优雅。

但它特别适合新人先把“时间点”这个概念对上现实世界。

### `duration_cast` 还有一个小坑：它会截断

你刚学 C++ 时。

最容易忽略“整除”的那种损失。

chrono 也一样。

```cpp
using namespace std::chrono;

auto s = duration_cast<seconds>(milliseconds(1500));
```

这里的结果是 1 秒。

不是 2 秒。

它会直接把小数部分丢掉。

你要更精细的结果。

就别急着 cast 成秒。

你想保留小数。

可以先用 `double` 当底层。

```cpp
std::chrono::duration<double> sec = std::chrono::milliseconds(1500);
```

这里的 `sec.count()` 会是 1.5。

### `.count()` 是把单位丢回去

很多人学 chrono 的第一件事是 `.count()`。

也很容易把坑踩回去。

```cpp
auto n = std::chrono::milliseconds(500).count();
```

`n` 只是一个数字。

单位已经丢了。

所以我一般只在两种地方用 `.count()`。

一种是打印日志。

一种是喂给“只吃数字”的老接口。

别把 `.count()` 当成默认出口。

### 场景：要喂给 `timeval`，也别手写换算

现实世界里。

你总会碰到老接口。

它就只吃 `timeval`。

那也没关系。

你可以先把“我想要的时间”写成 chrono。

再在最后一步，把它压扁成数字。

```cpp
using namespace std::chrono;

auto timeout = milliseconds(500);
auto us = duration_cast<microseconds>(timeout).count();

timeval tv{};
tv.tv_sec = static_cast<long>(us / 1000000);
tv.tv_usec = static_cast<long>(us % 1000000);
```

单位这件事。

你把它放在最前面写清楚。

最后再“压扁”。

出错概率会小很多。

### chrono 是怎么来的：它先在 Boost 里长大

你可能会好奇。

标准库这种东西怎么“突然就有了”。

大多数时候。

它不是突然。

chrono 这套设计，在进 C++11 之前。

已经在 Boost 里试过一轮了。

你如果见过 `boost::chrono`。

会发现很多名字几乎是一眼就能对上。

标准化之后。

大家主要是把它搬到了 `std::chrono`。

再把一些边边角角磨平。

更早一点。

Boost 里还有过一套日期时间库（Boost.Date_Time）。

它更偏“日历”和“业务时间”。

而 chrono 更像“工程时间”。

我只关心两件事。

走了多久。

以及用哪个时钟来计。

你会发现。

这就是我们一开始踩的两个坑。

单位坑。

时钟坑。

Boost 你可以把它理解成：标准库的“实验田”。

大家先在那儿把接口磨顺。

踩够坑。

再把成熟的部分搬进标准。

这也是 C++ 的一种风格。

先让社区跑起来。

再把好用的东西写进规范里。

后来 chrono 还继续长大。

比如日期、时区这些更复杂的东西。

社区里常见的做法是用 Howard Hinnant 写的 `date` 库。

再后来，标准也把一部分能力收进去了（到 C++20 的 chrono 扩展）。

你可以先不用管这些。

但知道“它不是一锤子买卖”，心里会更踏实。

### 横向看：别的语言怎么处理时间

你不是第一个被“单位”折磨的人。

Java 里经常会让你显式带上 `TimeUnit`。

Go 走了另一条路。

它的 `time.Duration` 统一用纳秒做底层单位，然后靠常量相乘。

Rust 里把“计时用的瞬间”单独做成 `Instant`，故意不让你拿它当系统时间。

它们的共同点都很朴素。

别让时间只剩下一个数字。

### 一句话结论

计时用 `steady_clock`。

显示时间用 `system_clock`。

单位用 `duration` 写在类型里。

### 小洞见：chrono 其实是“让事故显形”

很多人以为 `<chrono>` 是个“计时库”。
我更愿意把它当成“事故预防库”。

有人调侃：时间是让一切别同时发生的东西。
可惜线上 bug 不这么想。

它不帮你跑得更快。
它帮你把两类最常见的时间坑，提前暴露在代码里。

单位坑。
和时钟坑。

你在本地写对了。
线上就少一堆离谱的故事。

chrono 真正厉害的地方是：它把“时间”从记忆题，变成类型题。
