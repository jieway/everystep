---
title: '初始化捕获：终于可以把 move 塞进 lambda 里'
description: 'C++14 的广义 lambda capture，让资源可以被“带进”闭包，而不是被迫拐弯抹角。'
---

那几年。

C++11 刚出来。

很多人第一次用上 lambda。

感觉像突然不用再写那坨“函数对象”了。

回调顺手。

异步也顺手。

大家写得很嗨。

直到某天凌晨。

线上啪一下。

core dump。

你第一反应是线程。

第二反应是锁。

后来你才发现。

跟线程没什么关系。

是生命周期。

是你把一个“还没活够”的资源。

交给了一个“晚点才跑”的函数。

### 当年没有它的时候，我们怎么把资源带进 lambda

C++11 的 lambda 捕获很朴素。
它只能抓“一个已经存在的名字”。
抓法也固定，要么拷贝，要么引用。

但工程里很多东西，天生就不让你拷贝。
比如 `std::unique_ptr`。
它代表“唯一所有权”，只能 move，不能 copy。

于是你会遇到一个很现实的问题。
我想把一个 `unique_ptr` 交给后台任务，让任务自己拿着它慢慢干。
在 C++11 里，你会卡住。

那会儿常见的土办法，大概就两类。

先说 `shared_ptr` 这条路。
你把 `unique_ptr` 变成 `shared_ptr`。
然后按值捕获 `shared_ptr`。

```cpp
#include <future>
#include <memory>
#include <utility>

std::future<int> start_job(std::unique_ptr<int> p) {
    auto sp = std::shared_ptr<int>(std::move(p));
    return std::async(std::launch::async, [sp]() {
        return *sp;
    });
}
```

它能跑。
但你把“唯一所有权”变成了“共享所有权”。
多了引用计数，也多了一些你不一定想要的共享。

引用计数通常意味着每次拷贝都要加减一次计数。
在热点路径上，这东西有时候是原子操作。
你本地跑可能没感觉。
线上一忙，你就开始数那个“加一减一”了。

更麻烦的是心智负担。
你很难一眼看出：这个资源到底什么时候释放。
以及谁还偷偷拿着一份。

再加一条现实的。
项目里 `shared_ptr` 一旦绕出环，资源可能就“不死”了。
你排这种问题，会很想把咖啡续满。

再说 `std::bind` / 手写小 struct 这条路。
你把资源塞进一个函数对象里。
然后把这个对象丢给异步执行。

```cpp
#include <future>
#include <functional>
#include <memory>
#include <utility>

std::future<int> start_job(std::unique_ptr<int> p) {
    auto task = std::bind([](std::unique_ptr<int> p2) {
        return *p2;
    }, std::move(p));
    return std::async(std::launch::async, std::move(task));
}
```

它也能跑。
但你会开始在意这些细节：哪里会 copy，哪里必须 move。
而且 `bind` 一长，基本没人愿意看第二遍。

你本来只想“交出去一次”。
结果变成“谁都能留一份”。
你心里会嘀咕：我是在写业务，还是在跟语言掰手腕。

### 先把几个词说人话

如果你刚学 C++。
这里最容易卡住的不是语法。
是“这段代码到底谁活得更久”。

lambda 你可以先当成一个对象。
它里面装着你捕获的东西。
然后有一个 `operator()` 让它看起来像函数。

```cpp
int x = 1;
auto f = [x]() { return x + 1; };
```

这行 `[x]` 的意思是：把 `x` 复制一份，塞进 `f` 这个对象里。
所以 `f` 以后不依赖外面的 `x`。

“按值捕获”和“按引用捕获”的差别，就在这。

```cpp
int x = 1;
auto a = [x]() { return x; };
auto b = [&x]() { return x; };
```

`a` 里有一份自己的 `x`。
`b` 里只有一个引用，它指向外面的 `x`。
外面的 `x` 一死，`b` 也就跟着悬空。

最容易踩坑的写法之一就是：把引用捕获的 lambda 返回出去。

```cpp
auto make_bad() {
    int x = 1;
    return [&]() { return x; };
}
```

`x` 在函数返回时就没了。
但 lambda 还活着。
这就叫“悬空引用”。

还有一个词你会经常见到：`std::move`。
它不是“移动动作”。
它更像一句话：我把这个对象标记成“可以被搬空”。

`std::move` 自己不搬家。
它更像是对编译器说：这个东西我不打算再用，你可以把里面的资源拿走。
真正的搬家发生在后面的 move 构造/赋值里。

对 `unique_ptr` 来说。
被 move 走之后，它通常就变成空指针了。

这也是为什么 `unique_ptr` 很适合表达“交接”。
交给你，就不是我的了。
而不是我们俩都拿着一份。

### 一个很具体的事故现场

我说个很小的项目。
你写了个工具，读文件、解析，然后丢到后台线程慢慢处理。
你想把解析需要的资源，直接交给任务，代码看起来很“无辜”。

```cpp
#include <future>
#include <memory>

std::future<int> start_job(std::unique_ptr<int> p) {
    return std::async(std::launch::async, [p]() {
        return *p;
    });
}
```

这段在 C++11 里编译不过。
原因很直白：`[p]` 是“按值捕获”，按值就意味着要拷贝。
而 `unique_ptr` 不让拷贝。

你当年最容易做的“修复”。

就是改成引用捕获。

```cpp
std::future<int> start_job(std::unique_ptr<int> p) {
    return std::async(std::launch::async, [&p]() {
        return *p;
    });
}
```

这下能编译了。
也可能在你电脑上跑得挺好。
但它逻辑上已经坏了。

`p` 是 `start_job` 的局部变量。
函数一返回，`p` 就析构。
后台线程再跑起来，你就解引用了一个已经死掉的东西。

编译能过。
不代表命能活。

典型症状就是：测试环境没事，线上偶发崩溃。
而且你还会怀疑线程，怀疑很久。

### 这东西怎么来的

其实“把上下文打包交给回调”这件事，很老。
你在 C 里早就见过它。
只是当年我们写得更直白。

```cpp
using cb_t = void(*)(void*);

void run_async(cb_t cb, void* ctx);
```

函数指针负责“怎么做”。
`void*` 负责“用什么数据”。
而生命周期这口锅，你自己背。

C++03 时代我们更常用“函数对象”。
手写一个 struct，把要用的东西全塞进成员里。

```cpp
struct Task {
    int x;
    int operator()() const { return x + 1; }
};
```

那几年 Boost 也很流行。
很多人用过 `boost::bind`、`Boost.Lambda` 这一类库。
它们做的事情很像：把参数和上下文先“绑”起来，晚点再执行。

C++11 的 lambda 其实就是把这件事自动化了。
但它当时把捕获列表的语法收得很紧。
只允许写名字，不允许写表达式。

后来 move-only 资源（比如 `unique_ptr`）越来越常见。
异步也越来越常见。
于是这个洞就越来越痛。

### 横向看一眼：别的语言怎么处理“捕获”

很多语言的闭包，本质也都是“打包 + 延迟执行”。
只是它们大多允许你在创建闭包时，顺手造一个新变量。
这个新变量可以等于一个表达式的结果。

你在 JavaScript 里就见过类似的坑。
闭包抓的是“变量”，不是“那一刻的值”。

C# 也踩过。
早年的 `for` 循环闭包捕获同一个循环变量。
你以为抓到了 0、1、2，其实抓到的是“最后那个 3”。

```cpp
#include <functional>
#include <vector>

std::vector<std::function<int()>> fs;
for (int i = 0; i < 3; ++i) {
    fs.push_back([&]() { return i; });
}
```

这段 C++ 代码的问题也一样。
你用 `[&]` 把 `i` 引用进去了。
循环结束后 `i` 变成 3，三个 lambda 都会看到 3。

你当然可以改成按值捕获。
但初始化捕获提供了一个更“显式”的写法：我就是要快照。

```cpp
for (int i = 0; i < 3; ++i) {
    fs.push_back([j = i]() { return j; });
}
```

`j = i` 的含义很清楚。
这里不是“再抓一个外部变量”。
这里是在闭包里新建一个成员 `j`。

这也是 C++14 这次改动的味道。
让你能把“构造闭包成员”这件事写出来。

### 横向总结：三条路，各背一口锅

`shared_ptr` 的路子，解决的是“活着”。
代价是共享所有权和引用计数。
你往后排查资源到底谁持有，会更费劲。

`bind` / 手写函数对象，解决的是“能表达”。
代价是可读性和细节敏感。
一不小心就把 copy/move 写反了。

初始化捕获解决的是“语义写在脸上”。
你在捕获那一刻就把交接做完。
谁负责资源活下去，一眼就能看出来。

### 爬出来的那一步：把“交接”发生在捕获那一刻

后来 C++14 补上了这个洞。
它允许你在捕获列表里写一个初始化。
你可以读成一句人话：闭包里有个新成员，它等于某个表达式的结果。

这东西的名字叫：初始化捕获（init-capture）。

```cpp
#include <future>
#include <memory>
#include <utility>

std::future<int> start_job(std::unique_ptr<int> p) {
    return std::async(std::launch::async, [p2 = std::move(p)]() {
        return *p2;
    });
}
```

这行 `p2 = std::move(p)` 的意思很像“交接仪式”。
在创建闭包对象的那一刻，把所有权 move 进去。
任务活多久，资源就跟着活多久。

如果你以前写过 C 的 struct，就更好理解了。
你可以把 lambda 想成一个“带成员的小对象”。
初始化捕获，本质就是在构造这个对象的成员。

```cpp
struct Task {
    std::unique_ptr<int> p2;
    int operator()() { return *p2; }
};
```

上面这个 `Task` 当然不是标准写法。
但它能帮你把脑子里的那根筋接上。

lambda 不是魔法。
它就是个对象。

### 不只是 move：你还可以做“快照”

很多初学者会以为捕获只能抓变量。
其实初始化捕获更像“我在这里构造一个成员”。
所以你可以顺手做快照。

比如在 C++11 里你捕获 `this`。
抓到的是指针。
对象先析构，回调晚点跑，一样炸。

```cpp
struct Foo {
    int x;
    auto job() const {
        return [self = *this]() { return self.x; };
    }
};
```

这里的 `self = *this` 就是一份拷贝。
回调拿的是“当时的状态”。
而不是一根可能会悬空的指针。

当然，快照也有代价。
对象很大时，拷贝可能很贵。
但至少这个代价是明牌。

### 想把资源再 move 出去？记得 mutable

lambda 默认的 `operator()` 是 `const`。
也就是说，在函数体里你不能修改捕获的成员。
而 move 往往意味着“我要把它改成空”。

```cpp
#include <memory>
#include <utility>

auto make_sender(std::unique_ptr<int> p) {
    return [p2 = std::move(p)]() mutable {
        return std::move(p2);
    };
}
```

`mutable` 的作用就是：允许这次调用修改闭包对象。
不加它，你连“把 `p2` move 走”都做不到。

### 再来一个最常见的用法：把容器 move 进回调

你写异步时经常会遇到这种需求。
我手里有一堆数据。
我不想拷贝。
我就想交给后台线程。

```cpp
#include <vector>
#include <utility>

auto make_job(std::vector<int> v) {
    return [v2 = std::move(v)]() {
        return (int)v2.size();
    };
}
```

这段代码的重点不是 `size()`。
重点是 `v2` 的生命周期跟着闭包走。
你不用再猜：外面的 `v` 还在不在。

### 你会踩的几个小坑

第一个坑是 `std::move(p)` 之后，`p` 就“被掏空”了。
它还在，但已经不再拥有资源。
别在后面又用它当成原来的那个 `p`。

第二个坑是名字。
很多人把它叫 move capture，但它不只 move。
你也可以在捕获时做计算，把结果直接塞进闭包。

```cpp
#include <string>

auto f(std::string s) {
    return [msg = "hello " + s]() {
        return msg.size();
    };
}
```

这里的 `msg` 是闭包自己的字符串。
它不再依赖外面的 `s`，也就不怕 `s` 先销毁。
这点在异步里很救命。

### 一句话的结论

你不是在“捕获变量”。

你是在“构造闭包对象”。

### 最后留个亮点

我后来喜欢拿初始化捕获当代码审查的放大镜。
你看捕获列表，就能看出这段任务到底拿的是“引用”，还是拿了“所有权”。

很多线上事故其实不复杂。
复杂的是你没法一眼看出“谁负责把资源活下去”。

捕获列表，就是责任归属表。
