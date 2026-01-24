---
title: 'std::function / std::bind：可调用对象的统一接口'
description: 'C++11 把“能调用的东西”统一起来：function 做类型擦除，bind 做参数绑定；但也要知道它们的成本和陷阱。'
---

### 那会儿还没 C++11

你写个小项目。

代码不多。

需求也不复杂。

直到它上线。

然后某天晚上。

线上啪一下。

你盯着日志发呆。

崩在一个“回调”。

你甚至没觉得自己写了什么高深东西。

你只是。

“想把一个能调用的东西传进去”。

### 那些年，回调是怎么写的

在 C 里，回调基本长这样：一个函数指针。
你把它丢给库。
库在合适的时候调用它。

```cpp
using Callback = void(*)(int);

void register_cb(Callback cb);
```

解释很朴素：`Callback` 就是“能被调用”的地址。
它很轻，也很直接。

但问题也很朴素：它带不走状态。
你回调里想用点数据，只能靠全局变量或者静态变量。

说白了就是把状态塞到天上。
一开始好用。
项目一大就开始还债。

不过 C 世界也不是完全没办法。
很多库会让你再传一个 `void* user_data`。

它就是“一根不带类型的指针”。
你可以把它当成：回调随身带着的那一小包私货。

```cpp
using CCallback = void(*)(void*, int);

void register_cb(CCallback cb, void* user_data);
```

这看起来土。
但它确实解决了“回调带状态”这件事。

```cpp
#include <iostream>

void thunk(void* p, int x) {
  auto* base = static_cast<int*>(p);
  std::cout << (x + *base) << "\n";
}

int main() {
  int base = 10;
  register_cb(&thunk, &base);
}
```

`static_cast<int*>` 你可以先理解成。
把 `void*` 还原回它本来的类型。

这招也有代价。
回调什么时候被调用，是库说了算。

所以 `user_data` 指向的东西必须活得够久。
你要是把它指向了一个已经退出作用域的局部变量。
线上还是会啪一下。

后来大家也想过别的办法。
比如用模板把回调类型“泛化”掉。

可你一旦要把回调塞进容器、塞进成员变量，模板就开始把类型传染到接口上。
接口看起来就不再像接口了。

模板方案的“甜”，你很容易体会。

```cpp
template <class F>
void run_twice(F f) {
  f(1);
  f(2);
}
```

它快。
而且没有额外的间接层。

但它的“苦”，通常在你想存起来的时候出现。

```cpp
template <class F>
struct Runner {
  F f;
  void fire(int x) { f(x); }
};
```

这时 `Runner` 的类型就跟着 `F` 变了。
你就很难把它当成一个普通成员变量。
也很难把不同回调放进同一个容器。

### 坑是怎么来的：状态一多，你就开始骗人

当年最常见的一招叫“偷塞 this”。

做法是：用一个 `static` 函数假装自己是回调，然后在里面转发到对象。

```cpp
#include <iostream>

using Callback = void(*)(int);

Callback g_cb = nullptr;
void register_cb(Callback cb) { g_cb = cb; }
void fire(int x) { g_cb(x); }

struct Handler {
  int base;
  static Handler* self;

  static void thunk(int x) { self->handle(x); }
  void handle(int x) { std::cout << (x + base) << "\n"; }
};

Handler* Handler::self = nullptr;
```

这段代码能跑。

跑得还挺像那么回事。

可它其实在赌：你永远只会有一个 `Handler`。

一旦你需要两个实例。
或者你在多线程里跑它。
这个赌注就开始变得很贵。

### 线上啪一下：最小复现

你后来加了第二个 handler。

比如两个连接，或者两个定时器。

然后就开始出戏。

```cpp
int main() {
  Handler a{10};
  Handler b{100};

  Handler::self = &a;
  register_cb(&Handler::thunk);

  Handler::self = &b;
  fire(1);
}
```

你以为它会打印 `11`。

实际打印 `101`。

更坏的情况是 `self` 指向了已经析构的对象。

然后你就收获了一个深夜 core dump。

这类 bug 的味道很统一。

平时没事。

一忙就炸。

### std::function：给“能调用的东西”一个盒子

C++11 之前，很多人靠 Boost 顶着。

`boost::function`、`boost::bind` 这些你可能听过。

它们不是凭空发明的。

就是大家被上面那些坑逼出来的。

更具体一点。

很多东西会先在 Boost 里长出来。
大家用着用着发现：这套做法靠谱。
于是再想办法推进标准化。

在 C++11 之前，标准库也试着“先放一小部分进来”。
那套东西叫 TR1。

你可以把 TR1 理解成：标准库的试运行版本。
它里头就有类似 `function`、`bind` 的东西。

等到 C++11。
这套能力才算正式进了标准库。

C++11 的 `std::function` 干的事很简单。

它不问你是什么类型。

它只问你“能不能按这个签名调用”。

```cpp
#include <functional>

std::function<void(int)> cb;

void register_cb(std::function<void(int)> f) {
  cb = f;
}

void fire(int x) {
  if (cb) cb(x);
}
```

这里的 `std::function<void(int)>`，就是在说：我只认 `void(int)` 这个接口。

至于里面装的是函数、lambda、还是某个“函数对象”，我不关心。

所谓函数对象，你可以先把它当成：一个对象，但它写了 `operator()`，所以也能像函数一样被调用。

这就叫类型擦除。

你可以把它理解成：把具体类型藏起来，只留下一个可调用的口子。

如果你刚学 C++，这个词先别背。
你先记一个手感就够了。

`std::function` 像一个盒子。
盒子里装着“某个东西”，再额外带一段“怎么调用它”的办法。

如果你觉得这个描述有点虚。
我给你一个更接地气的类比。

它其实就很像 C 时代的那套“函数指针 + `void* user_data`”。
只是 C++ 把它包装得更安全。

你不用自己写 `static_cast`。
也不用自己保证函数签名匹配。
更不用自己手写那堆转发函数。

所以它才能做到。
不管你塞的是函数、lambda、还是函数对象。
拿出来都能按同一种方式调用。

David Wheeler 那句话就挺贴。

“All problems in computer science can be solved by another level of indirection.”

### 把它放回事故现场

这次我们不用全局 `self` 了。

让状态跟着回调走。

最简单的做法是：把你需要的那点状态，直接“抓”进回调里。

```cpp
#include <iostream>

int main() {
  int base = 10;

  register_cb([base](int x) {
    std::cout << (x + base) << "\n";
  });

  fire(1);
}
```

这里的 lambda 你可以先当成一个“带状态的函数”。

它会把 `base` 这份数据跟自己绑在一起。

所以你不用再把状态塞到全局变量里。

方括号里的 `[base]` 叫捕获列表。
意思是：把外面的 `base` 复制一份，塞进这个回调里。

如果你写成 `[&base]`。
那就不是复制了。
而是抓了一个引用。

这句话很多新人第一次听会皱眉。
你可以把引用先当成“别名”。
它本质上还是指向原对象的。

所以引用捕获最怕的坑就是：原对象没了，别名还在。

```cpp
#include <functional>
#include <iostream>

std::function<void(int)> make_cb() {
  int base = 10;
  return [&base](int x) {
    std::cout << (x + base) << "\n";
  };
}

int main() {
  auto f = make_cb();
  f(1);
}
```

这段代码“看起来能跑”。
但 `base` 早就没了。

剩下的是一个悬空引用。
出不出事，全看运气。

再来一个更像“工程代码”的例子。

你一旦想把回调塞进容器。
你就会开始理解 `std::function` 的价值。

```cpp
#include <functional>
#include <iostream>
#include <vector>

int main() {
  std::vector<std::function<int(int)>> fs;
  fs.push_back([](int x) { return x + 1; });
  fs.push_back([](int x) { return x * 2; });

  for (auto& f : fs) {
    std::cout << f(10) << "\n";
  }
}
```

这两段 lambda 本来是两个完全不同的类型。
你用模板是能分别吃掉。
但你很难把它们放进同一个 `vector` 里。

`std::function<int(int)>` 就像统一包装。
它让你能把“不同类型的可调用对象”放在同一个地方管理。

再来一个。

你想把回调当成成员变量。
这也是 `std::function` 的典型场景。

```cpp
#include <functional>

struct Timer {
  std::function<void()> on_tick;
  void tick() { if (on_tick) on_tick(); }
};
```

你后面想给它塞函数也行。
塞 lambda 也行。
接口不需要跟着变。

### std::bind：把参数先绑一部分

`std::bind` 更像历史产物。

Boost 时代大家就这么干。

C++11 只是把它收编进标准库。

它做的事也不复杂。

先把一部分参数固定住。

留下剩下的以后再填。

```cpp
#include <functional>

using namespace std::placeholders;

auto add10 = std::bind(std::plus<int>{}, _1, 10);
int r = add10(32);
```

`_1` 的意思是“第一个参数先欠着”。

`placeholders` 你可以把它理解成“占位符”。

`std::plus<int>{}` 则是一个“可调用对象”，干的事就是做加法。

写的人省事。

读的人得多想两秒。

但说实话。

这玩意读起来像填空题。

所以。

后来大家更爱写 lambda。

```cpp
auto add10 = [](int x) { return x + 10; };
```

这段不用解释。

一眼就懂。

`bind` 也有它擅长的地方。
比如你想把“成员函数”变成一个普通回调。

```cpp
#include <functional>
#include <iostream>

struct Handler {
  int base;
  void handle(int x) { std::cout << (x + base) << "\n"; }
};

int main() {
  Handler h{10};
  auto cb = std::bind(&Handler::handle, &h, std::placeholders::_1);
  cb(1);
}
```

不过你看。
读起来还是有点绕。

同样的东西用 lambda 写往往更直观。

```cpp
auto cb = [&h](int x) { h.handle(x); };
```

所以很多人把 `bind` 当成“你要会，但别沉迷”的技能。

还有个小坑也挺常见。
`bind` 默认会把你绑定进去的东西复制一份。

```cpp
#include <functional>
#include <iostream>

using namespace std::placeholders;

int main() {
  int base = 10;
  auto add = std::bind(std::plus<int>{}, _1, base);
  base = 100;
  std::cout << add(1) << "\n";
}
```

很多人会以为它输出 `101`。
但它会输出 `11`。

因为 `bind` 早就把当时的 `base` 复制走了。

如果你真的想让它“跟着变”。
你就得显式告诉 `bind`：别复制。

标准库给了一个小工具：`std::ref`。
它会把一个引用包成一个“引用包装”。
你可以把它理解成：专门用来告诉库——这里要按引用传。

```cpp
#include <functional>
#include <iostream>

using namespace std::placeholders;

int main() {
  int base = 10;
  auto add = std::bind(std::plus<int>{}, _1, std::ref(base));
  base = 100;
  std::cout << add(1) << "\n";
}
```

这次输出就是 `101` 了。

### 你需要知道的成本

`std::function` 不是免费的。

它可能会做一次间接调用。

也可能在装不下的时候去堆上分配内存。

关键结论是。

它换的是接口的稳定，而不是速度。

这就是为什么工程里常见的取舍是。

回调作为“接口”。

用 `std::function`。

热路径追性能。

用模板直接吃 lambda。

### 横向对比：你到底该选哪个

如果你只是写一个小算法。
回调只在当前作用域里用。

那模板或者直接传 lambda 通常最省事。
也最接近“零成本”。

如果你要把回调存起来。
比如塞进容器。
比如当成员变量。
比如跨模块当接口。

那你迟早会想要一个统一的类型。
这就是 `std::function` 的地盘。

如果你在对接老 C 接口。
API 只认函数指针。

那 `void* user_data` 这套你多半躲不开。
你可以嫌它土。
但你得尊重它能活到今天。

### 最后一个亮点：插座、转接头、和自己焊的线

我一直觉得可以这么记。

`std::function` 像插座。

你只要符合这个口。

什么插头都能插。

`std::bind` 像转接头。

有时候你不得不用。

但它会让线路变丑。

lambda 像你自己焊的线。

简单。

直观。

也最不容易在凌晨两点坑你。

你不是在学两个库函数。

你是在学一件事：让“状态”跟着“行为”走。

### 标题备选（更克制一点）

《std::function 到底解决了什么问题》

《回调带状态：从函数指针到 std::function》

《std::bind 我会用，但我更爱 lambda》

《把“能调用的东西”存起来：std::function 的用武之地》

《线上啪一下之后，我才理解 function/bind》
