---
title: 'shared_timed_mutex：读多写少的锁，终于有标准答案'
description: 'C++14 引入 shared_timed_mutex 和 shared_lock，用来表达“读可以并发，写需要独占”。'
---

那会儿还没有 `std::thread`。

也没有 `<mutex>`。

你写 C++，但干的活更像 C。

锁靠 `pthread_mutex_t`。

就是 pthread 里的那把互斥锁。

日志里最常见的一句话是：卡住了。

更讨厌的是。

它不是死锁。

它只是慢。

慢到你以为是网络。

慢到你开始怀疑人生。

后来我们才学会一件事。

有些系统。

天生就是“读多写少”。

### 当年没有它的时候

在 C++11 之前，标准库里压根没并发这一套。
Linux 上你多半用 pthread（POSIX 线程库），Windows 上用自己的 API，也有人用 Boost.Thread。
能跑就行，但项目一换平台，锁和线程那层就得重写。

C++11 才把 `std::thread`、`std::mutex` 这套搬进标准库。
如果你还没写过并发，可以先把“线程”理解成：同一个进程里，几段代码同时跑。
`mutex` 则是互斥：同一时刻只能一个线程进入那段“动共享数据”的代码。

那段“动共享数据”的代码，有个老名字：临界区（critical section）。
它不神秘。
就是：你不想让两个人同时进去改同一份东西。

麻烦也在这里。
很多数据不怕被很多人看，它只怕被同时改。
你不把它圈起来，程序也许能跑，但结果不归你管。

### 你以为读不用锁？（一个 10 行事故）

写得少的时候，你很容易想：那我读就别锁了吧。
反正我也不改。

然后你会遇到这种 bug。
它不一定天天复现。
但它一复现就很恶心。

前提是：`writer()` 和 `reader()` 真的是两个线程在同时跑。

```cpp
#include <cassert>

struct Pair { int x; int y; };
Pair p{0, 0};

void writer() { p.x = 1; p.y = 1; }
void reader() { assert(p.x == p.y); }
```

你以为读只是读。
但读到的可能是“写到一半”的状态。

这叫数据竞争（data race）。
在 C++ 里它属于未定义行为。
翻译成人话就是：你别指望它“偶尔错一次”。

### 各家的读写锁：pthread、Windows、Java、Boost

当年大家当然不傻。
既然读多写少，那就想办法让“读和读”别互斥。

POSIX 给了 `pthread_rwlock_t`。
读用 `rdlock`，写用 `wrlock`。
用起来大概是这样。

```cpp
#include <pthread.h>

pthread_rwlock_t rw;

pthread_rwlock_rdlock(&rw);
pthread_rwlock_unlock(&rw);
```

这里省略了初始化。
重点是看它把“读锁”和“写锁”分成了两套 API。

它能跑。
但它也把“上锁/解锁”这件事留给了你记忆力。

Windows 这边也有自己的读写锁。
你会看到一套很像的 API：shared / exclusive。
只是名字和头文件不一样。

```cpp
AcquireSRWLockShared(&rw);
ReleaseSRWLockShared(&rw);
```

这里的 `rw` 可以先理解成一把“Windows 版读写锁”。
这段也不是标准 C++。
只是让你感受一下它们的“形状”有多像。

Java 那边更早就把读写锁当成一个类。
读锁、写锁都是对象。
你去拿哪个，就表达哪个意图。

```java
rw.readLock().lock();
rw.readLock().unlock();
```

这段也不需要你会写 Java。
它想表达的还是同一件事：读锁和写锁在 API 上是两条路。

Boost 也做过一版。
很多早年写 C++ 的人，都是先在 Boost 里用上读写锁，再等标准库跟上。

你现在看到的 `shared_mutex` / `shared_lock` 这种“形状”。
在当年其实挺像 Boost 的。

它们都在解决同一个问题。
读要能并发。
写要能独占。

真正麻烦的差异在细节。
比如公平性（读多的时候写会不会饿死）。
比如你是不是容易忘了 unlock。

### 横向对比：它们到底差在哪

先别看名字。
读写锁这东西，大家基本都在拼三件事。

第一件事是 API 形状。
你能不能一眼看出“这是读还是写”。

第二件事是写法。
你是不是必须手写 `unlock()`。
还是能用 RAII 让它自动收尾。

第三件事是策略。
读特别多的时候，写会不会被饿死。
超时算不算支持。

标准库这套的取舍是很工程的。
把最常用的形状收进来。
把容易踩坑的解锁交给 RAII。

而且每个系统对公平性不一样。
有的更照顾读。
有的更照顾写。

所以你会遇到另一个老坑：写者饥饿。
读锁一直来。
写锁就一直进不来。

### 事故现场：我写了个小项目，线上啪一下

我当时写的是一个很小的配置缓存。
请求来了就读，偶尔后台线程热更新写一次。

你听着就知道它是读多写少。
但当年我只想着：一把锁不就完了？
于是我写成了下面这样。

```cpp
#include <mutex>
#include <string>
#include <utility>

std::mutex m;
std::string cfg;

std::string get_cfg() {
    std::lock_guard<std::mutex> lk(m);
    return cfg;
}

void set_cfg(std::string v) {
    std::lock_guard<std::mutex> lk(m);
    cfg = std::move(v);
}
```

这段当然正确，也很“标准”。
但它把所有读都串行化了。
就算两个请求只是读字符串，也必须排队。

于是线上就会出现那种很气人的画面：QPS 上不去，CPU 也没满，线程都在等锁。
你优化半天业务代码也没用。
因为瓶颈根本不在业务里。

### 当年大家是怎么从坑里爬出来的

第一反应通常是：换个更聪明的锁。
很多人会去用 `pthread_rwlock_t`：读加读锁，写加写锁，读就能并发。

但工程上很快就会出现“混搭”：有些地方用 `std::mutex`，有些地方用 pthread，然后你开始写适配层。
适配层的 bug 最会躲，尤其在异常、退出、超时这些路径上。

有人当年说得很刻薄：“你不是在写业务，你是在给锁写驱动。”
所以 C++14 这次的价值其实很朴素。
它把这类锁搬进标准库，让你别再每个项目都重新受一遍罪。

### 为什么标准库还要给你一堆 lock 类型

你可能会问。
不是有 mutex 了吗。
我自己 `lock()` / `unlock()` 不就行了。

真相是：人很容易忘。
尤其在“提前 return”这种路径上。

```cpp
m.lock();
if (!ok) return;
m.unlock();
```

一旦提前 return。
`unlock()` 就没机会跑到。

所以 C++ 更喜欢用 RAII。
意思是：资源跟着对象走。
对象活着就持有。
对象销毁就释放。

```cpp
std::lock_guard<std::mutex> lk(m);
if (!ok) return;
```

这段代码假设 `m` 是一个 `std::mutex`。
`lock_guard` 构造时上锁，离开作用域自动解锁。

你不需要写 `unlock()`。
也不需要靠祈祷。

`shared_lock` / `unique_lock` 也是同一套思路。
只是它们表达的不是“有没有锁”。
而是“这是读锁还是写锁”。

### 读写锁也不是银弹：两个常见坑

坑一：读锁拿太久。
读是共享的没错。
但写必须等所有读都放手。

```cpp
std::shared_lock<std::shared_timed_mutex> lk(m);
auto s = cfg;
slow_io(s);
```

`slow_io` 这种东西一慢。
写线程就全堵在门口。

这里的 `slow_io` 你可以理解成：写日志、访问磁盘、请求网络。
总之就是那种你没法保证多快的事。

更常见的写法是：先在锁里把数据拷出来。
然后把慢活放到锁外面。

```cpp
std::string local;
{
    std::shared_lock<std::shared_timed_mutex> lk(m);
    local = cfg;
}
slow_io(local);
```

你会发现这里的思路很朴素。
不是“锁更神奇”。
而是“临界区更短”。

坑二：读锁升级成写锁。
你在读的时候发现需要更新。
于是你顺手再来一个写锁。

```cpp
std::shared_lock<std::shared_timed_mutex> rlk(m);
if (need_update(cfg)) {
    std::unique_lock<std::shared_timed_mutex> wlk(m);
}
```

这里的 `need_update` 可以理解成“要不要刷新配置”。
重点不在它的逻辑，而在“读锁里再拿写锁”这件事。

这在很多实现里会卡住。
因为你自己还拿着读锁。
写锁在等“所有读锁都走人”，包括你。

常见做法是：先放掉读锁，再重新拿写锁。
当然会有个很短的窗口。
所以拿到写锁后要再检查一次条件。

```cpp
std::shared_lock<std::shared_timed_mutex> rlk(m);
bool upd = need_update(cfg);
rlk.unlock();

if (upd) {
    std::unique_lock<std::shared_timed_mutex> wlk(m);
    if (need_update(cfg)) do_update();
}
```

这里的 `do_update` 可以理解成“真的去更新”。
第二次 `need_update` 是为了防止：你放掉读锁到拿到写锁之间，别人已经先更新过了。

### 再来一个更像业务的例子：读多写少的 map 缓存

你可能会说。
配置这种东西太轻了。
锁一把 mutex 也没多慢。

那我们换个更像业务的。
比如一个“用户信息缓存”。
线上大部分请求只是查。
偶尔 miss 才写进去。

```cpp
#include <shared_mutex>
#include <string>
#include <unordered_map>

std::shared_timed_mutex m;
std::unordered_map<int, std::string> cache;

std::string get_user(int id) {
    std::shared_lock<std::shared_timed_mutex> lk(m);
    auto it = cache.find(id);
    if (it == cache.end()) return "";
    return it->second;
}

void put_user(int id, std::string name) {
    std::unique_lock<std::shared_timed_mutex> lk(m);
    cache[id] = std::move(name);
}
```

读路径拿共享锁。
读和读可以并发。

写路径拿独占锁。
写的时候，读要等。

这就是读写锁最适合的那类场景。

### C++14：shared_timed_mutex + shared_lock

C++14 给你标准的读写锁。

这次标准库选的名字有点长：`shared_timed_mutex`。
它想表达两件事：读是共享的，而且它支持“带超时”的锁。

`shared` 就是共享读。
`timed` 就是超时接口，比如 `try_lock_for`。

到了 C++17，又补了一个更轻的 `shared_mutex`。
它不带 timed。
很多实现里它会更省一点。

你可以把它理解成一次“减肥”。
只需要共享读 + 独占写的场景，就用 `shared_mutex`。
需要超时能力的时候，再用 `shared_timed_mutex`。

### 什么时候用 mutex，什么时候用读写锁

如果你还在犹豫。
我给你一个很偷懒的判断。

先用 `std::mutex`。
把临界区写短。

如果线上还是卡在读锁上。
读的比例又真的很高。
再上读写锁。

如果你还需要“最多等多久”。
比如超过 2ms 我宁愿走降级逻辑。
那就用 `shared_timed_mutex`。

“读写锁”这名字其实已经把结论写完了：读可以共享，写必须独占。

你不用猜，也不用再靠注释提醒同事。

```cpp
#include <shared_mutex>
#include <string>
#include <utility>

std::shared_timed_mutex m;
std::string cfg;

std::string get_cfg() {
    std::shared_lock<std::shared_timed_mutex> lk(m);
    return cfg;
}

void set_cfg(std::string v) {
    std::unique_lock<std::shared_timed_mutex> lk(m);
    cfg = std::move(v);
}
```

这次读用 `shared_lock`，写用 `unique_lock`。
`shared_lock` 表示“共享锁”（也就是读锁）：很多线程可以同时拿到。
`unique_lock` 表示“独占锁”（也就是写锁）：同一时刻只能一个线程进来。

你甚至不需要看注释。
光看类型，就知道这个函数是读多还是写多。

这些 `*_lock` 你可以先粗暴理解成：一个“带自动开关门的门禁”。
构造的时候把门关上（上锁），离开作用域自动开门（解锁）。
它解决的不是“锁更快”，而是“你更不容易忘记解锁”。

### timed 是干嘛的

名字里那个 `timed` 也不是凑字数。
它表示这把锁支持“带超时”：我最多等一会儿，等不到就算了。

这对线上很现实。
有时候你宁愿返回一个默认值，也别把请求拖死。

```cpp
#include <shared_mutex>
#include <chrono>
#include <string>

std::shared_timed_mutex m;
std::string cfg;

std::string get_cfg_with_timeout() {
    std::shared_lock<std::shared_timed_mutex> lk(m, std::defer_lock);
    if (lk.try_lock_for(std::chrono::milliseconds(2))) return cfg;
    return "";
}
```

`defer_lock` 的意思是：先构造这个锁对象，但先别真的去锁。
`try_lock_for` 就是带超时地尝试拿锁。

### 一句话的结论

并发里，“表达意图”比“写得能跑”更重要。

### 最后留个亮点

我后来发现，很多性能优化不是换算法，而是把“你其实是读多写少”这个事实写进类型里。
读写锁就是这种优化。
它不酷，但很值。

把事实写进类型里，是一种很朴素的工程诚实。
