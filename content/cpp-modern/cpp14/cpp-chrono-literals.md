---
title: 'chrono 字面量：别再写 duration_cast 了'
description: 'C++14 给 <chrono> 加了 100ms、2s 这样的字面量，让时间单位更直观，也更少写错。'
---

我第一次被“时间单位”坑。

很久以前。

久到我还以为“超时”这种东西。

只会发生在别人家。

结果它找上门了。

而且一点都不高级。

就是单位写错。

### 当年：时间单位靠人脑记

在 C 的世界里。

你写延时，常见就是这些。

```cpp
sleep(2);      // 秒
usleep(2000);  // 微秒
Sleep(2000);   // 毫秒（Windows）
```

函数名都像亲戚。

单位却互相不认识。

你只要一走神。

就会把“2 秒”写成“2 毫秒”。

然后线上啪一下。

### 我在写一个小项目，然后线上啪一下

我当时写了个小服务。
失败了就等一等再重试。

配置里写的是 `2`。
我的脑子自动补全成“2 秒”。

代码也很自然地跟着我脑子走。

```cpp
#include <chrono>
#include <thread>

int retry_delay = 2; // 我以为是 2 秒
std::this_thread::sleep_for(std::chrono::milliseconds(retry_delay));
```

这行代码的意思其实是。

等 2 毫秒。

于是重试像机关枪。

把对面打穿。

我还在那儿纳闷。

“怎么越退避越激进？”

### 这东西怎么来的

说到这里，你可能会想。
那为什么不把单位写死在类型里？

这就是 `<chrono>` 想解决的事。
它背后其实有一段挺长的“标准化故事”。

在 C++11 之前。
很多人先在 Boost 里把时间这套东西做出来了。

它叫 Boost.Chrono。
参与设计的人里最有名的一个是 Howard Hinnant。

后来 C++11 把它们“收编”进标准库。
于是有了我们现在的 `<chrono>`。

但 C++11 当时的重点。
是把“时间”变得类型安全。

至于“写起来顺不顺”。
那是后话。

所以你会看到一堆 `std::chrono::milliseconds(2000)`。
能用，但不好看，也不够直观。

到 C++14。
委员会终于补上了那块“好写”的拼图：chrono 字面量。

### 先把几个词说清楚

`<chrono>` 是标准库里管时间的一套工具。
它主要管三样东西：时间长度、时间点、时钟。

这篇文章里你最常见的是 `duration`。
你可以把它当成“带单位的整数”。

`2s` 这种写法叫“字面量”。
就像 `123` 是一个整数字面量一样。

只不过 `2s` 不是 C++ 自带的。
它是 chrono 提供的“用户自定义字面量”。

那句 `using namespace std::chrono_literals;` 也别紧张。
它只是把 `ms`、`s`、`min` 这些后缀放到当前作用域里。

### C++11 的 <chrono>：终于有“带单位的整数”了

C++11 的思路很朴素。
别只传一个裸数字。

把单位也带上。

```cpp
#include <chrono>

auto t = std::chrono::milliseconds(200);
```

`milliseconds(200)` 就是“200 毫秒”。

它不是注释。
是类型的一部分。

单位写错的时候。
至少更容易被人一眼抓到。

### 但问题没完：你还是在心里换算

问题出在这里。
人脑很讨厌做单位换算。

你想写 2 秒。
手会不自觉地先写成 2000。

```cpp
std::this_thread::sleep_for(std::chrono::milliseconds(2000));
```

代码没错。
读代码的人却要先翻译一遍。

这种“需要翻译”的地方。
就是事故的温床。

更麻烦的是。
你在不同单位之间来回转。
`duration_cast` 会越来越常见。

它就是 chrono 里的“显式单位转换”。
把一个 `duration` 换成另一个单位时，你经常得写它。

### C++14：chrono 字面量，把单位贴到数字旁边

C++14 做了一件看起来很小的事。
但挺救命。

它让你可以写 `2s`、`500ms` 这种字面量。

这些东西会生成一个 `duration`。
你可以把它当成“带单位的时间长度”。

```cpp
#include <chrono>
#include <thread>

using namespace std::chrono_literals;

std::this_thread::sleep_for(2s);
```

你看到 `2s`。
基本不会误会。

也不需要先把秒换算成毫秒。

这时候 `duration_cast` 也就不用天天写了。

### 你会喜欢的地方：混着写也不乱

同一段代码里。
你可以很放心地混着写。

```cpp
auto t = 500ms;
```

```cpp
auto t = 1min;
```

单位直接长在字面量上。
你不靠记忆，靠眼睛就能检查。

读起来也更接近你脑子里的那句中文。

“等 500 毫秒”。

### 横向看一眼：别的语言其实早就这么干了

Go 里也差不多。
它写成“数字乘单位”。

```go
time.Sleep(2 * time.Second)
```

单位就在 `time.Second` 上。
不需要猜。

Python 也喜欢把单位摆出来。
你看见 `seconds=2`，脑子就安静了。

```python
from datetime import timedelta

timeout = timedelta(seconds=2)
```

单位写在参数名里。
读代码的人不用换算。

Rust 更像 chrono。
它也会先造一个 `Duration`。

```rust
std::thread::sleep(std::time::Duration::from_secs(2))
```

单位藏在函数名里：`from_secs`。
也挺直白。

回头看。
C++14 的 chrono 字面量就是把这件事做得更顺手。

### 再来几个能直接抄走的小例子

第一个是“做 deadline”。
很多时候你关心的不是睡多久。
而是“什么时候必须停”。

```cpp
using namespace std::chrono_literals;

auto deadline = std::chrono::steady_clock::now() + 2s;
```

`steady_clock` 你可以理解成“不受系统时间跳变影响的时钟”。
它更适合做超时和计时。

第二个是“接口要求秒”。
你把类型写死一点，反而更安全。

```cpp
using namespace std::chrono_literals;

void set_timeout(std::chrono::seconds t);

set_timeout(2s);
```

这行代码读起来就像中文。
你也不需要在脑子里乘 1000。

如果你传的是 `2500ms`。
很多实现里它会直接编译不过。
逼你显式做转换。

第三个是“最后还是要喂一个裸数字”。
比如某些 C API 只收一个毫秒整数。

```cpp
using namespace std::chrono_literals;

auto timeout = 2s;
auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(timeout).count();
```

`count()` 就是把 `duration` 里的“数字”拿出来。
这一步越靠近边界越好。

别在业务逻辑里到处飘着 `2000`。

当然。
从 `2500ms` 变成 `2s` 这种“会丢精度”的转换。
还是得靠 `duration_cast`。

但至少。
你不用把单位藏在一个孤零零的数字里。

### 一句话的结论

时间单位。

就该写在数字旁边。

别让读代码的人替你换算。

### 最后留个亮点

我现在有个土规则。

凡是需要“在脑子里乘 1000”的地方。

迟早会有人乘错。

`2s` 这种写法。

不是可爱。

是把坑提前填平。
