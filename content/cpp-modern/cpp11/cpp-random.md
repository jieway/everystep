---
title: '随机数库 <random>：别再用 rand()'
description: 'C++11 的 <random> 把“随机”拆成引擎和分布：mt19937 + uniform_int_distribution 让你既可复现也更靠谱。'
---

很久以前。

你写 C。

你想要“随机”。

你只有一个按钮。

`rand()`。

它来自 C 标准库。

一开始也没打算让你拿它写抽奖、分流、风控。

更多时候。

是小游戏。

是模拟。

是“差不多就行”。

然后我们就真的把它当成“随机”用了。

直到线上啪一下。

### 当年：rand() 为啥长成这样

`rand()` 是 C 标准库留给你的一个“便宜的伪随机数发生器”。

伪随机的意思是：它不是从空气里抓“真随机”，更像一个按规则工作的机器。

你给它一个起点（seed），它就会吐出一串确定的序列。这个“确定”，当年反而是优点：方便调试，方便复现。

在 C 里，你会同时看到两样东西：`rand()` 和 `srand()`。

`srand()` 负责“设起点”，`rand()` 负责“往前吐下一个数”。它们背后通常共享同一份全局状态。

为了让你对“状态”有手感，我们用一个玩具版本模拟一下。

```cpp
unsigned state = 1;

unsigned next_u32() {
  state = state * 1103515245u + 12345u;
  return state;
}
```

你不用纠结这是不是某个系统的 `rand()`。

你只要记住一件事：有一个 `state`，每次调用都会把它往前推。

所以“随机”其实不是一个函数。

它是一台会变的机器。

API 小，依赖少，到哪儿都能跑。于是它就被大家一直用，一直用，最后用进了线上。

后来大家开始写更复杂的程序。

要做模拟。

要做洗牌。

要做抽样。

甚至要在多线程里用。

这时候 `rand()` 的朴素就开始变成麻烦。

### 线上啪一下：抽奖功能突然变得“很慷慨”

你写了个小项目，做个 1% 概率的“彩蛋抽奖”。

本地测着没问题，上线后某天晚上中奖率突然飙了，像有人在后台狂点。

你翻日志发现，同一秒进来的请求，结果几乎一模一样。

### 坑 1：你以为你在设 seed，其实你在重置

```cpp
#include <cstdlib>
#include <ctime>

bool win_1_percent() {
  std::srand(std::time(nullptr));
  return std::rand() % 100 == 0;
}
```

这段代码的毛病不在 `% 100`，而在于你把 `srand(time)` 放进了“每次调用”。

`time(nullptr)` 的精度通常只有秒。同一秒里调用很多次，seed 没变，你等于一直把机器拨回同一个起点。

所以线上一并发，就像大家一起中，一起不中。

还有个更阴的点：`rand()` 往往靠一个全局状态往前滚。

线程一多，它不是让你“更随机”，是让你更难复现。

### 坑 2：`%` 不是分布

很多老代码会这么写骰子。

```cpp
int dice_bad() {
  return std::rand() % 6 + 1;
}
```

这会有偏差。

原因很简单：`rand()` 的范围是 `0..RAND_MAX`，而 `RAND_MAX + 1` 往往不是 6 的整数倍。

多出来的那一截，会让某几个点数更容易出现。你肉眼看不出来，但统计一跑就露馅。

顺带一提，`RAND_MAX` 还经常很小。

你如果真拿它去做“大范围随机”，不是不行，就是很快开始自己拼位数、自己造轮子，然后又回到坑里。

想亲眼看一次“偏差长什么样”，可以写个很短的计数。

```cpp
#include <cstdlib>
#include <iostream>

int main() {
  int cnt[6] = {};
  for (int i = 0; i < 60000; ++i) {
    ++cnt[std::rand() % 6];
  }
  for (int i = 0; i < 6; ++i) std::cout << cnt[i] << " ";
}
```

你跑几次就会发现。

这里我甚至没写 `srand()`。

是故意的。

我只是想让你看清 `% 6` 的结构性偏差，不想让“seed 怎么设”把注意力带跑。

你要是顺手加一句 `std::srand(123);` 也行。

它不是“有点波动”那么简单。

某几个桶总是更胖。

### C++11 的做法：把“随机”拆成两件事

`<random>` 不再给你一个“万能函数”。

它把随机拆成“引擎”和“分布”。

引擎负责产生原始数字，分布负责把数字变成你想要的范围和形状。

```cpp
#include <random>

std::mt19937 rng(123);
std::uniform_int_distribution<int> dist(1, 6);

int dice() {
  return dist(rng);
}
```

`std::mt19937` 你可以理解成“吐数字的机器”。

`uniform_int_distribution` 你可以理解成“模具”：它保证每个点数等概率，而不是靠 `%` 碰运气。

这个“模具”顺便还帮你把边界讲清楚。

比如 `uniform_int_distribution<int>(1, 6)` 表示两头都包含。

你不会再纠结到底是 `[1, 6]` 还是 `[1, 6)`。

### 这套设计从哪儿来：不是拍脑袋

很多人以为 `<random>` 是 C++11 突然天降的。

其实它更像一次“收编”。

在标准库还没跟上之前，C++ 圈子里用得最多的一套是 Boost.Random。

Boost 把“引擎”和“分布”分开这件事，做得很早。

后来 TR1 时代也有过一轮铺垫。

等到 C++11 标准库正式把 `<random>` 收进来，很多接口风格就沿着这条路走了。

这也是为什么它看起来不像 `rand()` 那么“一个函数搞定”。

它更像积木。

你把引擎当电机。

把分布当齿轮箱。

你想要什么输出形状，就换什么齿轮。

### 引擎也有历史：mt19937 为啥这么常见

`std::mt19937` 这个名字里，`mt` 是 Mersenne Twister。

它是 90 年代末（Matsumoto 和 Nishimura）提出的一类伪随机算法。

它的目标不是“神秘”，而是“够大、够均匀、够稳定”。

所以它很适合做模拟、测试、洗牌这类事。

但它不是为加密设计的。

如果你要做密码、token、验证码那种安全场景，别用它。

### 横向对比：我到底该选哪个

如果你只是写个练习题，或者随便做点“看起来乱”的效果。

`rand()` 也不是立刻就会炸。

但它的问题是：你越往工程里走，它越像一个藏在角落的全局变量。

出事的时候你才想起来，它一直在。

如果你要的是“可解释、可复现、可组合”。

用 `<random>`。

你把引擎当状态机，把分布当需求说明书。

如果你要的是“每次都一样”。

用固定 seed。

这不是偷懒，这是测试。

如果你要的是“每次启动都不一样”。

用 `std::random_device` 作为 seed 的来源，再喂给 `mt19937`。

你别直接拿 `random_device` 每次都 `()` 一下当随机数用。

它更像火柴。

点一下就够。

这里你可能会想问：`random_device` 到底是什么？

更准确的说法是：它是“一个拿 seed 的入口”。

有的实现会去找操作系统的随机源。

也有的实现会退化成一个伪随机算法。

所以别把它当成“绝对可靠的真随机”。

你把它当成启动时用一下的“噪声来源”，就很舒服。

如果你要的是“安全”。

那就别在 `<random>` 里选引擎了。

换成专门的密码学随机来源（平台接口、系统库），别自己用 PRNG 硬扛。

还有一个新手常踩的点：`default_random_engine`。

它看起来像“默认最推荐”。

但它的具体算法是实现定义的。

也就是说，换个平台、换个标准库版本，你可能就换了一台机器。

做学习和项目当然能用。

但你要写教程、要写可复现测试，还是直接写 `mt19937` 更省心。

### 把 1% 这件事写得更像 1%

你前面看到的 `dist(0, 99) == 0` 没毛病。

但 `<random>` 甚至给你准备了更贴近人话的写法。

```cpp
#include <random>

bool win_1_percent() {
  static std::mt19937 rng(std::random_device{}());
  static std::bernoulli_distribution dist(0.01);
  return dist(rng);
}
```

`bernoulli_distribution(0.01)` 你可以理解成“抛一次硬币”，只是这枚硬币正面概率是 1%。

你读代码的时候，脑子里不会再出现 `% 100`。

你只会看到概率。

### 线上修复的手感：seed 一次，复用状态

解决“同一秒一起中”的核心动作也很朴素：不要每次都 `srand()`。

让随机的状态变成一个对象，然后复用它。你其实是在告诉代码：随机数是“状态机”，不是“计算器”。

```cpp
#include <random>

bool win_1_percent() {
  static std::mt19937 rng(std::random_device{}());
  static std::uniform_int_distribution<int> dist(0, 99);
  return dist(rng) == 0;
}
```

这里的 `static` 意思是：它们只初始化一次。

从 C++11 开始，局部 `static` 的初始化也做了线程安全的保证，你不用自己加锁就能先跑起来。

如果你在意 seed 的“来源混得更均匀一点”，可以用 `seed_seq` 做一次搅拌。

```cpp
#include <random>

std::mt19937 make_rng() {
  std::random_device rd;
  std::seed_seq seq{rd(), rd(), rd(), rd()};
  return std::mt19937(seq);
}
```

你可以把 `seed_seq` 当成一个搅拌机。

它不负责产生随机。

它负责把你拿到的那点“噪声”，搅成更适合喂给引擎的形状。

如果你就是要在多线程里“各跑各的”，更直白的写法是 `thread_local`。

```cpp
#include <random>

int dice() {
  thread_local std::mt19937 rng(std::random_device{}());
  thread_local std::uniform_int_distribution<int> dist(1, 6);
  return dist(rng);
}
```

`thread_local` 的意思是：每个线程都有一份自己的 `rng`。

你不会因为共享状态把自己绕晕。

### 你想要的不是“数字”，是“形状”

很多新手第一次用 `<random>` 会卡在这。

为什么还要一个 distribution？我只要一个 0 到 1 的数不行吗？

你当然可以要一个数。

但项目里你更常要的是“概率长相”。

比如你想要一个 0.0 到 1.0 的均匀浮点。

```cpp
#include <random>

double unit() {
  static std::mt19937 rng(123);
  static std::uniform_real_distribution<double> dist(0.0, 1.0);
  return dist(rng);
}
```

`uniform_real_distribution(0.0, 1.0)` 表示一个区间。

它的常见语义是 `[0.0, 1.0)`。

也就是包含 0.0，但通常不包含 1.0。

它不会像 `%` 那样悄悄把边界搞歪。

再比如你要模拟“多数时候很小，偶尔很大”的抖动。

```cpp
#include <random>

double jitter_ms() {
  static std::mt19937 rng(123);
  static std::normal_distribution<double> dist(0.0, 5.0);
  return dist(rng);
}
```

`normal_distribution(0, 5)` 你可以粗暴理解成：大部分值会落在 0 附近，越远越少。

这比你手写一堆 if-else 更像回事。

### 从容器里随便抽一个

你写业务代码时，很常见的需求其实是这个。

从一堆候选里随机挑一个。

```cpp
#include <random>
#include <vector>

int pick_one(const std::vector<int>& v) {
  static std::mt19937 rng(123);
  std::uniform_int_distribution<int> dist(0, (int)v.size() - 1);
  return v[dist(rng)];
}
```

这里我故意把 `dist` 放在函数里。

因为它的范围依赖 `v.size()`。

你的重点是：别再 `rand() % n`。

用分布把“范围”说清楚。

### 带权重抽奖：不是所有选项都等概率

再往前一步。

你可能希望 A 出现 70%，B 出现 20%，C 出现 10%。

```cpp
#include <random>

int pick_weighted() {
  static std::mt19937 rng(123);
  static std::discrete_distribution<int> dist({70, 20, 10});
  return dist(rng);
}
```

`discrete_distribution({70, 20, 10})` 你可以理解成：把权重交给库来算。

你不用自己写累加区间。

也不用担心边界和偏差。

### 洗牌：别再自己写“交换循环”

很多人学 C 的时候，会自己写 shuffle。

但写着写着就会写出偏差版本。

标准库已经给你准备好了。

```cpp
#include <algorithm>
#include <random>
#include <vector>

int main() {
  std::vector<int> v{1, 2, 3, 4, 5};
  std::mt19937 rng(123);
  std::shuffle(v.begin(), v.end(), rng);
}
```

`std::shuffle` 需要一个引擎。

它的意思很明确：随机来自哪里，你自己负责。

### 关键结论

随机不是一个函数。

随机是状态 + 规则。

你得把它当对象管。

### 复现：让 bug 乖乖回到你电脑上

上面我用 `123` 做 seed。

这不是为了“更随机”，恰恰相反，是为了“不要随机”。结果固定，测试才稳定，你才能对着同一条序列查 bug。

要上生产的时候，你再换一个更合适的 seed 来源，比如 `std::random_device`。

你可以把它理解成：向系统要一点“噪声”，用来当起点。

如果你正在查一个“偶发 bug”，有个很实用的小技巧。

先把 seed 打到日志里。

然后你就能用同一个 seed 把事故回放出来。

```cpp
#include <random>
#include <iostream>

int main() {
  unsigned seed = 123;
  std::mt19937 rng(seed);
  std::uniform_int_distribution<int> dist(0, 9);
  std::cout << "seed=" << seed << " ";
  for (int i = 0; i < 5; ++i) std::cout << dist(rng);
}
```

你不需要一上来就学什么“统计学”。

你先学会把 bug 抓回来。

这一步就已经很 C++ 了。

### 小洞见

Knuth 有句老话：

“Random numbers should not be generated with a method chosen at random.”

我理解成一句大白话就是。

关键不是“看起来乱”。

关键是你知道自己在用什么。

并且你能控制它。

随机不是玄学。

随机是组件。

你选对组件。

线上就少很多“啪一下”。

你还会发现一件事。

你把 seed 记下来。

事故就能回放。

这才是工程里最值钱的“随机”。

