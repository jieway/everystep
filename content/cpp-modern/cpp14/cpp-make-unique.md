---
title: 'make_unique：别再手写 new 了'
description: 'C++14 补上了 std::make_unique，让 unique_ptr 的创建跟 make_shared 一样顺手，也更安全。'
---

那会儿 C++11 刚开始进团队。

大家第一次认真聊起一句老话。

“资源跟着对象走”。

对象死了。

资源也该跟着收回。

听起来很美。

但你把代码一翻。

还全是 `new`。

你会愣一下。

这戒指戴上了。

怎么手里还攥着前任送的钥匙。

### 先把几个词说清楚（不然下面那几行你会卡住）

先说“资源”。
在 C 里它可能就是一块 `malloc` 出来的内存。
也可能是打开的文件、拿到的锁、甚至一条网络连接。

再说“所有权”。
谁负责释放它，谁就是“所有者”。
所有者不明确的时候，代码迟早会出事。

再说“析构”。
你可以把它当成 C++ 里自动帮你收尾的函数。
函数返回时，局部对象会被销毁，它的析构函数会被调用。

最后说“异常”。
C 里你习惯 `if (err) return;`。
C++ 里还多了一条路：直接 `throw`，一路跳出当前函数。

跳出去的过程中，C++ 会把已经构造好的局部对象都销毁一遍。
这件事有个名字，叫“栈展开”。

### C++11 时代：unique_ptr 有了，但入口还是 new

在那之前，很多人用过 `std::auto_ptr`。
它能“自动 delete”，听起来省心。
结果一复制就把所有权偷走，坑到离谱。

C++11 给了 `std::unique_ptr`。
独占，不能复制。
你终于敢说一句：“我不想管 delete 了。”

如果你刚从 C 过来。
你可以把 `unique_ptr` 想成一个小盒子。
盒子里装着指针。
盒子一死（离开作用域），就自动 `delete`。

但当年有个细节很烦。
C++11 有 `make_shared`，却没有 `make_unique`。
所以 `unique_ptr` 的入口，还是 `new`。

当年最常见的写法就是这样。

```cpp
#include <memory>

struct Foo {
    Foo(int) {}
};

auto p = std::unique_ptr<Foo>(new Foo(42));
```

它没错。
但它把 `new` 又请回来了。
而 `new` 一回来，老毛病也会跟着回来。

更早一点的 C++ 代码通常是这样的。

顺便一提。
默认的 `new` 失败会抛异常。
它不会乖乖返回 `nullptr`。

```cpp
struct Foo { Foo(int) {} };

bool need_quit() { return true; }

void f() {
    Foo* p = new Foo(42);
    if (need_quit()) return;
    delete p;
}
```

这段看着也没毛病。
但只要中间多一个 `return`，或者多一个“失败就跳走”。
`delete` 就很容易丢。

### 当年大家踩得最狠的坑：把 new 塞进函数参数

你写个小项目。
一个任务调度器。
接口很正常。

```cpp
#include <memory>

struct Job {
    Job(int) {}
};

void submit(std::unique_ptr<Job> job, int prio);
int calc_prio();
```

然后你图省事。
把创建和调用写成一行。

```cpp
void on_request(int id) {
    submit(std::unique_ptr<Job>(new Job(id)), calc_prio());
}
```

这行代码看起来也没错。

但在 C++17 之前，函数参数的“求值顺序”是不保证的。
通俗点说，就是这两个参数到底谁先算，编译器说了算。

更要命的是，它可能先做了 `new Job(id)`，却还没来得及把指针交给 `unique_ptr`。
这时如果 `calc_prio()` 抛异常（你可以把它理解成“函数出错直接跳走”）。
那块内存就真的没人管了。

### 一个线上啪一下的复现

你当然不会在代码里写 `throw`。
但线上会替你写。
比如配置没读到，比如某个字段突然变了。

```cpp
#include <memory>
#include <stdexcept>

struct Job { Job(int) {} };

int calc_prio() { throw std::runtime_error("bad config"); }
void submit(std::unique_ptr<Job>, int) {}

void on_request(int id) {
    submit(std::unique_ptr<Job>(new Job(id)), calc_prio());
}
```

这段代码的问题是。
在 C++11/14 里，你没法保证异常发生时，指针已经交到 `unique_ptr` 手上。
你也就没法保证它一定会被释放。

后来 C++17 把“参数求值顺序”这块也补了一刀。
它还是没告诉你“左边先算还是右边先算”。
但它至少保证不会把两个参数的求值过程搅在一起。

对你来说，最重要的一句是。
别指望 `unique_ptr<T>(new T(...))` 在复杂表达式里永远安全。
你写的是 C++。
不是在跟编译器玩猜拳。

但当年你写的是 C++11/14。
坑就在那儿。

### 当年为什么大家爱把它写成一行

因为一行看起来更“高级”。
而且你在写小项目的时候，真的很难每行都想着异常。

你可能还会在这一行里顺手加点别的。
比如再算个超时时间。
比如再拼个日志字符串。

这一类表达式越长。
你越难确信“指针到底什么时候被接住”。

### 当年的人是怎么爬出来的

老办法很朴素。
别写一行。
拆开。

```cpp
void on_request(int id) {
    auto job = std::unique_ptr<Job>(new Job(id));
    submit(std::move(job), calc_prio());
}
```

你看到 `std::move` 也别慌。
它不是“搬内存”。
它更像一句口头禅：我不用这个盒子了，你拿走吧。

```cpp
auto a = std::unique_ptr<Job>(new Job(1));
auto b = std::move(a);
```

这之后 `b` 拿到所有权。
而 `a` 会变空。

这样就算 `calc_prio()` 抛了，`job` 也已经接住资源了。
离开作用域会自动释放。
你安全了。

但你也开始讨厌自己。
为什么“写对”要靠这种自觉。

### make_unique 为什么拖到 C++14

你可能会问。
这东西看起来这么简单。
为什么 C++11 不顺手一起给了。

一个原因是。
C++11 本身就像一班赶点的火车。
`unique_ptr` 刚把“独占所有权”这件事落地。
大家先让你能用上。

另一个原因更现实。
`make_unique` 想做得“像标准库一样完整”，没那么一行。

它要处理。
完美转发。
你可以先把它理解成：构造函数要什么参数，我就原样传过去。
还要处理数组。
还得防止你写出一些危险的重载。

所以当年很多团队的做法是。
先在项目里自己补一个。
或者用 Boost 里已经验证过的版本。

### 当年社区的补丁：自己写一个 make_unique

所以在 C++14 之前。
很多项目会自己补一个小工具。
Boost 里也有类似的做法。

```cpp
#include <memory>
#include <utility>

template <class T, class... Args>
std::unique_ptr<T> make_unique_11(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}
```

这就是后来 `std::make_unique` 的样子。
它不神秘。
就是把“new 之后立刻装进盒子”这件事，强制写在一个地方。

`std::forward` 你现在可以先当成一句话。
把参数“原样转交”给构造函数。
别急着背定义。

它也有局限。
比如数组那种写法，你得另外处理。

### C++14：std::make_unique 把入口补上了

C++14 终于补了这块拼图。

```cpp
#include <memory>

auto job = std::make_unique<Job>(42);
```

它做的事很简单。

创建对象，然后立刻交给 `unique_ptr`。
中间没有“指针裸奔”的那一瞬间。

所以你可以放心写回那一行。

```cpp
void on_request(int id) {
    submit(std::make_unique<Job>(id), calc_prio());
}
```

就算 `calc_prio()` 在后面抛了。
那个临时的 `unique_ptr` 也会被析构，资源会被收回。
这里的“栈展开”，你可以理解成：出错往外跳的时候，会顺手把路上创建的临时对象都销毁一遍。

你不用再靠“我记得要拆开”。

### 再给你两个小项目里的常见写法

第一种是“接口用 `unique_ptr` 当参数”。
这是在明说：你把所有权交给我。

```cpp
void submit(std::unique_ptr<Job> job);

void f(int id) {
    submit(std::make_unique<Job>(id));
}
```

你不需要写 `std::move`。
因为这里你直接创建了一个临时盒子。
临时盒子交出去就行。

第二种是“塞进容器”。

```cpp
#include <memory>
#include <utility>
#include <vector>

struct Job { Job(int) {} };

std::vector<std::unique_ptr<Job>> q;

void push(int id) {
    q.push_back(std::make_unique<Job>(id));
}
```

`unique_ptr` 不能复制。
所以容器里放它，本质上是在放“所有权”。
你 push 进去那一刻，就别再惦记旧的那份了。

如果你手上已经有一个盒子。
那就得明确地“交出去”。

```cpp
void push2(int id) {
    auto job = std::make_unique<Job>(id);
    q.push_back(std::move(job));
}
```

这之后 `job` 会变空。
这就是独占所有权的代价。
也是它的好处。

它还有个小好处。
你写函数返回值的时候，也顺手。

```cpp
struct Job { Job(int) {} };

std::unique_ptr<Job> build(int id) {
    return std::make_unique<Job>(id);
}
```

不用再写一眼就累的 `std::unique_ptr<Job>(new Job(id))`。

### 你会马上用到的另一个点：数组

动态数组一直很尴尬。
因为你得记住用 `delete[]`。
写错一次就够你喝一壶。

`make_unique` 也顺手给你兜住了。

```cpp
#include <memory>

auto buf = std::make_unique<int[]>(1024);
```

你拿到的是 `unique_ptr<int[]>`。

析构时会用对的删除方式。

你不用猜。

### 横向对比一下：make_shared 为什么先有

`make_shared` 在 C++11 里就有。
一个常见原因是性能。
`shared_ptr` 需要一个“引用计数块”（用来记还有多少人共享它）。

`make_shared` 可以把“对象 + 引用计数块”一次分配。
少一次分配，少一次碎片。

`unique_ptr` 没有引用计数块。
所以当年大家更容易觉得：先凑合用 `new` 也行。

直到大家被那一堆“必须拆开写才能安全”的代码折磨。
`make_unique` 才算是姗姗来迟。

### 再横向对比一下：unique_ptr 和 shared_ptr

`unique_ptr` 的关键词是“唯一”。
一个资源，只能有一个所有者。

`shared_ptr` 的关键词是“共享”。
你可以复制它。

```cpp
#include <memory>

struct Job { Job(int) {} };

auto a = std::make_shared<Job>(1);
auto b = a;
```

这时候 `a` 和 `b` 都指向同一个对象。
它们背后会有一个引用计数。
计数归零才释放。

所以 `shared_ptr` 更重。
但当你确实需要“多个地方都活着”的所有权时，它是合理的。

大多数小项目里。
先用 `unique_ptr`。
真的被逼到“谁都不敢删”的时候。
再考虑 `shared_ptr`。

### 一句话的结论

`make_unique` 不是语法糖。

它是把异常安全的责任，从你身上拿走。

### 最后留个亮点

我后来有个很土的习惯。

代码里只要出现 `new`。

我就会停一下。

不是说它一定错。

而是它经常意味着。

“这里有一小段时间，资源没人管”。

`make_unique` 的价值。

就是把这段时间，缩到几乎不存在。
