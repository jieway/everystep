---
title: 'C++11 内存模型与 atomic：你以为的“顺序”，可能不存在'
description: 'C++11 把并发里最危险的部分写进标准：数据竞争是未定义行为，atomic + memory order 让你能和编译器、CPU 讲清楚“顺序”。'
---

并发里最吓人的东西。

不是线程。

也不是锁。

是那句“当然”。

“当然我先写 data。”

“当然再写 ready。”

“当然别人看到 ready，就能看到 data。”

当年大家就是这么想的。

因为单线程一直这么活。

而 C++ 在很长一段时间里。

也确实假装自己只活在单线程。

### 那些年：线程进来了，C++ 假装没看见

你如果写过更老的代码。

会记得那股味道。

想开线程？

Linux 上你去用 pthread。

Windows 上你去用 `CreateThread`。

标准库？

标准库当时没有这个东西。

语言规范里也没有一句话告诉你。

“两个线程看同一份内存，到底算不算同一份”。

大家只能靠经验。

靠平台。

靠玄学。

最常见的玄学有两个。

一个叫“我加了 `volatile`”。

另一个叫“我机器上没复现”。

后来你会发现。

这俩都不太靠谱。

### 当年踩过的坑：你以为是红绿灯，其实只是便利贴

很多小项目里。

都会出现这种“发布数据”的写法。

一个线程写数据。

再把一个标志位点亮。

另一个线程看到标志位亮了。

就去读数据。

代码看上去很朴素，也很像人类。

```cpp
bool ready = false;
int data = 0;

// thread A
data = 42;
ready = true;

// thread B
if (ready) {
    use(data);
}
```

人的直觉会把它读成。

“ready 是红绿灯。”

“绿了就能走。”

但在多线程世界里。

它更像一张便利贴。

你贴上去了。

不代表别人立刻能看见。

也不代表别人看见时。

你桌上的东西已经摆好了。

### 线上啪一下：我只是想做个“热更新配置”

场景很小。

我写了个小服务，启动时读配置。

然后后台线程定时刷新。

主线程每次处理请求。

只要看到 `ready`。

就直接用新配置。

某天晚上。

线上啪一下。

偶尔会用到半旧半新的配置。

更离谱的是。

日志里能看到 `ready` 已经 true。

但配置里的某个字段还是 0。

为了把坑挖得更浅一点。

我把它缩成了最短的复现。

```cpp
struct Config {
    int value;
};

Config cfg{0};
bool ready = false;

// thread A
cfg.value = 42;
ready = true;

// thread B
if (ready) {
    use(cfg.value);
}
```

你可能会问。

“这还能读到 0？”

能。

而且标准允许它能。

### 这个坑的名字：data race（数据竞争）

先别急着背 `memory_order`。
先把这个词咬碎。
`data race`，中文一般叫“数据竞争”。

两个线程在没有同步的情况下。
同时摸同一个对象。
并且至少一个在写。

那就叫 data race。

**data race 的结果是未定义行为（undefined behavior）。**

这句很狠，但它其实是在救你。

它在说。
“别猜了，这段程序在标准眼里已经不是程序了。”

关键结论我用一句话说完。

**有 data race，就别讨论‘会不会偶尔错’，只能讨论‘怎么把它消掉’。**

### 先把几个词讲清楚：你可能卡在这里

如果你刚学完 C。

你多半会在这几个词上皱眉。

我先用最土的方式说。

**未定义行为（undefined behavior）到底有多狠**

“未定义行为”不是“可能会错”。

它更像是。

编译器对你说。

“你已经越界了。”

“我现在怎么优化都行。”

所以它的结果可能是。

偶尔错。

一直错。

只在你老板的电脑上错。

甚至看起来永远对。

这就是它最恶心的地方。

给一个特别“反直觉但常见”的例子。

```cpp
bool stop = false;

// thread A
while (!stop) {
    // do work
}

// thread B
stop = true;
```

你会以为 thread A 迟早会停。

但如果这里有 data race。

编译器可能会“非常合理地”想。

“既然没人能同时改它（你已经越界了）。”

“那我把 `stop` 读一次就行。”

结果就是。

thread A 可能永远不退出。

**原子性、可见性、顺序：是三件事**

原子性。

你可以理解成“这个读写不会被撕成两半”。

比如一个原子 `int`。

不会读到半个旧值半个新值。

可见性。

是“你写的东西，别人什么时候能看见”。

顺序。

是“你以为先发生的事，别人能不能也当成先发生”。

你会发现。

atomic 解决的是第一件事。

而后两件事。

要靠同步语义。

**同步（synchronization）不是 sleep**

很多新手会把“同步”理解成。

我让线程睡一下。

等一等。

这不叫同步。

同步在这里是个更硬的词。

它的意思是。

你要建立一条标准认可的“交接线”。

让另一个线程能依赖这条线。

**happens-before：你能拿来当证据的“先后关系”**

`happens-before` 中文有时翻成“先行发生”。

你不用背。

你只要记住它的用途。

它是你写并发代码时。

唯一能拿来当证据的“先后”。

你能证明“写在这条线之前”。

那么“读在这条线之后”就能看见。

证明不了。

那就是玄学。

### C++11 的补课：内存模型（memory model）到底补了什么

当年的 C++ 最大的问题不是“线程难”。
而是“线程在语言里没有位置”。

编译器只需要保证单线程看起来没变。
至于多线程谁先看到谁，标准以前没说，所以也就不保证。

C++11 做了一件很关键的事。
它把“多线程下内存怎么被看见”写进了标准。

这套规则就叫内存模型。

**语言终于承认：你写的不是一个人看的代码。**

顺手丢个引用。
Herb Sutter 有句老话，大意是：`volatile` 不是用来做线程同步的。
很多坑就是从“把 `volatile` 当锁”开始的。

### 这东西怎么来的：从“各写各的”到“写进标准”

在 C++11 之前。

大家也在写并发。

只是写得很像“各写各的”。

你用 pthread。

你看平台文档。

你甚至会看到一些更底层的词。

内存屏障。

栅栏。

但这些东西的问题是。

它们在语言之外。

编译器不欠你一句解释。

硬件也不欠你一句保证。

然后行业里开始出现两股“补课”的力量。

一股来自托管语言。

比如 Java。

它很早就遇到了同样的坑。

后来把 Java Memory Model（JMM）修了一次大补丁。

另一股来自 C 体系自己。

C11 也引入了 `atomic` 和内存序。

C++11 的内存模型。

很大程度上就是把这些经验。

变成一套能在标准里讲清楚的话。

你会看到一些词。

比如 `happens-before`。

比如 `release/acquire`。

它们不是委员会拍脑袋。

更像是。

行业把坑踩够了之后。

终于愿意把规则写下来。

### 横向对比：C++11、Java、C# 到底差在哪

你如果学过一点 Java 或 C#。

可能会更好理解这件事。

Java 和 C# 的“线程”是语言的一等公民。

它们从一开始就必须回答。

“多线程下这句代码到底算不算对”。

C++ 不一样。

它背着一大坨历史包袱。

它必须兼容旧代码。

还要允许你写出接近硬件的东西。

所以 C++11 的做法更像是。

我给你几档工具。

你可以用最强的。

也可以用更弱但更快的。

但代价是。

你要自己为“协议”负责。

这就是为什么。

新手更适合先用 mutex。

高手才会去精挑细选 memory order。

还有一个特别容易混的差异。

在 Java / C# 里。

`volatile` 往往真的是一种同步原语。

它至少能提供一种“交接”的语义。

但在 C++ 里。

`volatile` 不是用来干这事的。

它更多是面向硬件寄存器、信号这类场景。

所以你才会看到。

同一个单词。

在不同语言里脾气完全不一样。

### `volatile`：它不是你以为的那根“同步绳”

先给一个很多人当年真的写过的版本。

```cpp
struct Config {
    int value;
};

Config cfg{0};
volatile bool ready = false;

// thread A
cfg.value = 42;
ready = true;

// thread B
if (ready) {
    use(cfg.value);
}
```

很多人会想。

“我都 volatile 了。”

“编译器总得老实点吧？”

问题是。

`volatile` 主要管的是。

“别把这次读写优化没了”。

它不负责在两个线程之间。

建立你想要的那条交接线。

所以这个程序。

照样可能读到 0。

而且依然可能是未定义行为。

### 最朴素的对照：mutex 版本长什么样

如果你现在只想写对。

别跟 `memory_order` 较劲。

先上 mutex。

```cpp
#include <mutex>

struct Config {
    int value;
};

Config cfg{0};
bool ready = false;
std::mutex m;

// thread A
{
    std::lock_guard<std::mutex> lk(m);
    cfg.value = 42;
    ready = true;
}

// thread B
{
    std::lock_guard<std::mutex> lk(m);
    if (ready) {
        use(cfg.value);
    }
}
```

这段代码不酷。

但它很诚实。

它直接告诉你。

“你们俩别同时摸这份数据”。

你不用猜可见性。

也不用猜顺序。

### atomic：把共享变量升级成“带协议的共享”

那我到底要用什么？

如果你想共享的东西很小，比如一个标志位，一个计数。

你可以用 `std::atomic`。

它不神秘。
你可以把它当成“这个变量的读写，必须按标准的协议来”。

先给一个最不容易犯错的版本。
默认的顺序，不用自己选 `memory_order`。

```cpp
#include <atomic>

std::atomic<bool> ready{false};
std::atomic<int> data{0};

// thread A
data.store(42);
ready.store(true);

// thread B
if (ready.load()) {
    use(data.load());
}
```

这段代码最重要的不是“快”。
而是“说清楚”。

你在跟编译器说。
ready 不是便利贴。
ready 是交接信号。

### release / acquire：像盖章和验章

但你很快会遇到另一个更真实的需求。

我不想把所有数据都改成 atomic。
我只想用一个 atomic 标志位，去“发布”一份普通数据。

这时候就轮到 `release/acquire` 出场了。

我喜欢用一句人话记它。

release 像“盖章发布”。
acquire 像“验章接收”。

盖章之前整理好的东西。
验章之后就能看见。

```cpp
#include <atomic>

struct Config {
    int value;
};

Config cfg{0};
std::atomic<bool> ready{false};

// thread A
cfg.value = 42;
ready.store(true, std::memory_order_release);

// thread B
if (ready.load(std::memory_order_acquire)) {
    use(cfg.value);
}
```

这段代码的重点是。

我不用懂 CPU。
也不用懂汇编。

我只需要记住。

release/acquire 建立了一条“交接线”。

线这边写好的东西。
线那边读到 ready 之后就能放心用。

### 再给你一个反例：把 `ready` 写成 relaxed，会发生什么

很多人会觉得。

“那我也用 atomic 了。”

“我还更快了。”

然后就写出这种代码。

```cpp
#include <atomic>

int data = 0;
std::atomic<bool> ready{false};

// thread A
data = 42;
ready.store(true, std::memory_order_relaxed);

// thread B
if (ready.load(std::memory_order_relaxed)) {
    use(data);
}
```

这段代码里。

`ready` 的读写确实是原子的。

但它没有建立 happens-before。

也就没有建立那条“交接线”。

所以 `data` 的读写。

在标准眼里依然可能是 data race。

你以为你在省性能。

其实你是在把程序送回玄学。

修法也很简单。

要么用默认的最强顺序。

要么用 release/acquire 做交接。

### memory_order：你要的不是“越强越好”

`memory_order` 像几档不同的“约束强度”。

强一点，你更接近直觉，但也更可能付出代价。
弱一点，你更接近硬件的本来面目，但也更容易写错。

你不需要把它背成口诀。
你只要先记住三个常用角色。

`seq_cst` 是最强的。
像你脑子里的“大家排队走”。

默认就是它。
新手直接用默认完全没问题。

`release/acquire` 做交接。
用一个信号发布一批写入。

`relaxed` 只保证“这个变量本身是原子的”。
不替你保证别的变量。

你如果现在看不懂它能干嘛。
也正常。

先别碰。

### `relaxed` 什么时候能用：只做“统计”，别做“协议”

你可以先记一个很安全的场景。

`relaxed` 适合做计数。

比如 QPS。

比如“累计处理了多少请求”。

你不靠它去发布别的数据。

你只关心它自己不被撕裂。

```cpp
#include <atomic>

std::atomic<int> hits{0};

// many threads
hits.fetch_add(1, std::memory_order_relaxed);
```

这段代码的意思是。

我不要求你们谁先谁后。

我只要求。

这个加一别加丢。

别用它去做 ready。

别用它去做“交接线”。

那就又回到玄学了。

### 另一个常见误区：atomic 不是万能锁

你把所有变量都改成 atomic，并不等于程序就正确。

因为正确性往往不是“一个变量的性质”。
而是“多个变量之间的协议”。

队列。

状态机。

对象生命周期。

这些东西。

很多时候还是得靠 mutex 或 condition_variable。

它们不花哨。

但它们让你少掉头发。

### 最后留一个亮点：你要的不是顺序，是可交接

很多人第一次学内存模型。
会卡在“顺序”两个字。

总想问。
“到底谁先执行？”

但并发里真正值钱的问题其实是。
“我能不能把某个事实交接给另一个线程？”

你写 data。

你再亮 ready。

你想表达的是交接。

不是排队。

C++11 内存模型最厉害的地方。

不是给你一堆 `memory_order` 去炫技。

而是把“我觉得应该没问题”。

变成了“我能证明这里没有 data race”。

这时候你不是在跟 CPU 吵架。

你是在用标准语言。

把团队从玄学里拎出来。
