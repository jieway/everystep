---
title: 'std::thread / mutex / condition_variable：线程库的基础件'
description: 'C++11 把线程同步搬进标准库：thread 创建线程，mutex 保护共享状态，condition_variable 让线程“睡着等条件”。'
---

### 先别谈 C++11：当年写线程是什么味道

先说句不那么体面的真相。

当年写线程。

很多时候不是在写业务。

是写“平台差异”。

Linux 这套。

Windows 那套。

你写的是 `void*`。

你传的是 `void*`。

你 debug 的也是 `void*`。

有些项目会用 Boost。

但那又是另一套规矩。

你想可移植。

先把两套 API 都背一遍。

然后写一层胶水。

还得祈祷别漏一个角。

更要命的是。

出事的时候。

你不知道该怪谁。

怪业务？

怪线程？

怪你自己“写得不够小心”？

那会儿很多团队都会有一句黑话。

“线程这东西。

能不用就不用。”

不是大家胆小。

是坑真的多。

你要是没写过。

很容易掉进两个坑。

一个叫忙等。

一个叫数据竞争。

掉进去以后。

线上啪一下。

你就开始学哲学。

### 这套东西当年从哪儿长出来的

线程不是 C++11 发明的。

早就有了。

只是那会儿它长在操作系统里。

在 Linux 上你会碰到 POSIX 线程。

也就是大家常说的 pthread。

```cpp
#include <pthread.h>

void* worker(void*) {
    return nullptr;
}

int main() {
    pthread_t t;
    pthread_create(&t, nullptr, &worker, nullptr);
    pthread_join(t, nullptr);
}
```

这段代码里最扎眼的就是 `void*`。

你写的是 `void*`。

你传的是 `void*`。

你最后还得自己把类型转回去。

你再看同步那块。

pthread 的条件变量叫 `pthread_cond_t`。

写法基本就是：锁 + while + wait。

下面这段也不是为了让你复制编译。

只是让你看看那个姿势。

```text
pthread_mutex_lock(&m);
while (queue_empty) {
    pthread_cond_wait(&cv, &m);
}
pthread_mutex_unlock(&m);
```

这段代码的核心不是 pthread。

是那个 while。

你会发现。

C++11 的 `condition_variable`。

本质就是把这套规矩搬进了标准库。

到了 Windows 又是另一套。

你要跟 `HANDLE` 打交道。

还得记得关句柄。

这段不是能直接编译跑起来的代码。

它只是让你感受一下“另一套 API 的味道”。

```text
HANDLE h = CreateThread(...);
WaitForSingleObject(h, INFINITE);
CloseHandle(h);
```

于是 C++ 社区当年最常见的状态是。

“我们能不能把这套东西包一下？”

Boost.Thread 就是那个年代的答案。

它让你用更像 C++ 的方式写线程。

但它毕竟是库。

不是标准。

还有一条很有趣的支线。

Java 很早就把并发做进了语言。

`synchronized`、`wait()`、`notify()`。

那套思路叫监视器（monitor）。

你会看到一个很熟悉的姿势。

也是 while。

```text
synchronized (lock) {
    while (queue_empty) lock.wait();
}
```

C++11 最像“工程进展”的地方是。

它不想发明新并发。

它想把大家已经踩出来的规矩。

收编进标准库。

### 事故现场：一个小队列，把线上拖死

假设你在写一个小项目。

有个“后台 worker”。

主线程接到请求。

往队列里塞任务。

worker 线程负责慢慢处理。

平时一切正常。

直到某天凌晨。

监控报警。

CPU 100%。

你点开采样。

线程全在 `while(true)` 里打转。

你本来只想省点事。

于是写了个最直觉的版本。

```cpp
#include <vector>

std::vector<int> q;

void worker() {
    while (true) {
        if (!q.empty()) {
            int v = q.back();
            q.pop_back();
            (void)v;
        }
    }
}
```

这段代码能跑，也能“处理任务”。

但队列空的时候，它还是在 `while(true)` 里狂转。

CPU 直接顶满一个核心。

你可能会想到一个补丁：让它空的时候睡一会儿。

```cpp
#include <chrono>
#include <thread>
#include <vector>

std::vector<int> q;

void worker() {
    while (true) {
        if (!q.empty()) {
            int v = q.back();
            q.pop_back();
            (void)v;
        } else {
            std::this_thread::sleep_for(std::chrono::milliseconds(1));
        }
    }
}
```

CPU 是下来了。

但延迟也跟着上来了。

你开始在 1ms、5ms、10ms 里反复横跳，调成玄学。

这时候线上再啪一下，你会发现第二个坑更狠。

这个 `q`，主线程也在改，worker 线程也在改。

你没有任何同步。

这就叫 data race（数据竞争）。

两个线程同时摸同一块内存，至少有一个在写，而你没做任何保护。

标准把它归类成“未定义行为”。

未定义行为不是“会错”。

是“爱怎么炸怎么炸”。

### 先把几个词拆开，不然你会一路皱眉

线程是什么？

你可以先把它理解成。

“同一个进程里，同时跑的两个函数”。

共享状态是什么？

就是这俩函数能同时摸到的一块内存。

比如全局变量。

比如堆上对象。

```cpp
int counter = 0;

void hit() {
    ++counter;
}
```

单线程里 `++counter` 很直觉。

多线程里它不是一个原子动作。

你可能会丢更新。

也可能直接触发未定义行为。

同步是什么？

就是你得立规矩。

“谁什么时候能碰共享状态”。

RAII 是什么？

有人翻译成“资源获取即初始化”。

你可以先把它背成一句人话。

“资源交给对象管理。

对象活着就占着。

对象一死就自动释放。”

等会儿你会看到为什么锁特别需要这招。

你马上会看到一种写法。

`[] { return !q.empty(); }`。

它叫 lambda。

你可以先把它理解成“匿名函数”。

`[]` 叫捕获列表。

空的意思是“我不抓外面的局部变量进来”。

新手阶段你先别纠结细节。

你先把它当成“我把一个返回 bool 的小函数塞进了 wait 里”。

### std::thread：先把线程开起来

C++11 的第一步很简单。

它把“开线程”这件事标准化。

你不用再去查 `pthread_create` 或 `CreateThread`。

```cpp
#include <thread>

void work() {
}

int main() {
    std::thread t(work);
    t.join();
}
```

`std::thread` 这个对象，你可以把它当成“线程的句柄”。

句柄你就理解成“把手”。

像文件句柄一样，你拿着它，才谈得上关门收尾。

这里最容易踩的坑是 `join()` 和 `detach()`。

你不 `join()`，线程对象析构时会 `std::terminate()`。

这听起来很凶，但它是在逼你把话说清楚：你到底要不要等这个线程结束。

你要么 `join()`，等它把活干完，要么 `detach()`，放它自己跑。

`detach()` 更危险，因为线程在后台跑的时候，它用到的指针、引用、对象，可能已经在主线程里被销毁了。

初学阶段，把 `join()` 当默认，你会少很多夜里两点的电话，也更容易定位问题到底在哪儿。

你可以先看一个很短的反例。

```cpp
#include <string>
#include <thread>

void start() {
    std::string msg = "hi";
    std::thread([&] { (void)msg; }).detach();
}
```

`msg` 是局部变量。

`start()` 一返回，它就销毁了。

线程晚一点跑到那行，就踩空了。

`[&]` 的意思是“按引用捕获”。

也就是线程里拿到的不是 `msg` 的拷贝。

而是 `msg` 本人。

`msg` 的生命周期比线程短。

这就是问题所在。

### mutex：先把共享状态锁起来

线程开起来以后，你马上就会遇到第二个现实。

共享状态要么锁，要么别共享。

不锁，问题就不是“偶尔错”。

它更像是“迟早炸”。

这个“锁”在 C++11 里就是 `std::mutex`。

`mutex` 就是 mutual exclusion，翻成中文就是“互斥”。

```cpp
#include <mutex>
#include <vector>

std::mutex m;
std::vector<int> q;

void push(int v) {
    std::lock_guard<std::mutex> g(m);
    q.push_back(v);
}

bool pop(int& out) {
    std::lock_guard<std::mutex> g(m);
    if (q.empty()) return false;
    out = q.back();
    q.pop_back();
    return true;
}
```

这段代码的核心是你终于把规矩写进了代码里。

谁碰共享数据，谁就得先拿锁。

初学者最常见的坑是。

先学会了 `lock()`。

然后在某个早退分支里忘了 `unlock()`。

```cpp
int pop_bad(int& out) {
    m.lock();
    if (q.empty()) return 0;
    out = q.back();
    q.pop_back();
    m.unlock();
    return 1;
}
```

锁没解开。

其他线程就永远拿不到锁。

你一看现象。

“怎么不动了？”

你一看代码。

“我明明没写死循环啊。”

这就是为什么 C++ 借鉴了很多老工程经验。

把锁这种资源。

推荐你用 RAII 去管。

`lock_guard` 是 RAII。

出了作用域就自动解锁。

锁要用 RAII。

这样你就不容易忘 `unlock()`。

也不怕中途 `return`、抛异常把你坑了。

### 顺手对比：atomic 能帮你，但帮不了队列

你可能会问。

“那我不用 mutex。

用 atomic 行不行？”

有时候行。

比如你只是想做一个线程安全的计数器。

```cpp
#include <atomic>

std::atomic<int> counter{0};

void hit() {
    ++counter;
}
```

这段代码很漂亮。

因为它保护的是一个“单个整数”。

但队列不是单个整数。

它是一坨结构化状态。

`push_back()` 和 `pop_back()` 里有很多步骤。

你没法用一个 atomic 把它们全包住。

所以新手阶段你可以先记一条粗暴但好用的经验。

atomic 擅长保护“一个数字”。

mutex 擅长保护“一坨状态”。

### condition_variable：让线程真的睡下去

你真正想要的是：没任务就睡，有任务就醒。

忙等也好，`sleep_for` 也好，都只是把问题往后拖。

`std::condition_variable` 就是干这个的。

你可以把它当成一个门铃。

它不干活，只负责把你叫醒。

```cpp
#include <condition_variable>
#include <mutex>
#include <vector>

std::mutex m;
std::condition_variable cv;
std::vector<int> q;

void push(int v) {
    {
        std::lock_guard<std::mutex> g(m);
        q.push_back(v);
    }
    cv.notify_one();
}

int pop_blocking() {
    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk, [] { return !q.empty(); });
    int v = q.back();
    q.pop_back();
    return v;
}
```

初学者最容易写成这样。

```cpp
std::unique_lock<std::mutex> lk(m);
cv.wait(lk);
int v = q.back();
```

这里可能还是空。

因为“被叫醒”不等于“条件满足”。

还有一条初学者容易忽略的坑。

条件不满足时，线程会睡。

但醒来时，条件不一定满足。

所以你必须再检查一次。

```cpp
std::unique_lock<std::mutex> lk(m);
while (q.empty()) {
    cv.wait(lk);
}
```

`while` 不是形式主义。

它是在保护你的条件。

`wait(lk, pred)` 只是把这个 while 帮你写好了。

`wait(lk, pred)` 的意思是：条件不满足就睡，满足了再醒。

这里的 `pred` 叫谓词，你可以把它当成“返回 bool 的函数”。

这段代码里，它就是 `[] { return !q.empty(); }`。

也就是“队列不空了，我才醒”。

你会注意到，`wait` 用的是 `unique_lock`，不是 `lock_guard`。

原因很简单：等待的时候要临时放开锁，醒来以后再把锁拿回来。

还有一个更狠的坑。

通知可能比等待先发生。

你如果只写 `wait(lk)`。

就可能永远睡下去。

```cpp
bool ready = false;

void producer() {
    {
        std::lock_guard<std::mutex> g(m);
        ready = true;
    }
    cv.notify_one();
}

void consumer_bad() {
    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk);
}
```

`producer()` 可能早就 `notify_one()` 过了。

`consumer_bad()` 晚一步进来。

就再也没人叫它。

所以你要么写 while。

要么直接用 `wait(lk, pred)`。

```cpp
void consumer_ok() {
    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk, [] { return ready; });
}
```

这个版本就不会傻等。

因为它会先检查条件。

条件已经满足就不睡。

花括号是为了让锁尽快释放。

然后再 `notify_one()`。

这样被叫醒的线程醒来后。

更有机会立刻拿到锁。

还有一个初学者很容易忽略的工程需求。

线程怎么优雅退出？

```cpp
bool done = false;
 
void shutdown() {
    {
        std::lock_guard<std::mutex> g(m);
        done = true;
    }
    cv.notify_all();
}
 
int pop_or_quit(int& out) {
    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk, [] { return done || !q.empty(); });
    if (q.empty()) return 0;
    out = q.back();
    q.pop_back();
    return 1;
}
```

这里的关键点是。

条件不只看 `!q.empty()`。

还要把 `done` 也算进去。

另外，退出这种事通常要叫醒所有人。

所以这里用的是 `notify_all()`。

`notify_one()` 更像“叫一个人来干活”。

`notify_all()` 更像“集合开会”。

不然你会写出“队列永远空，线程永远睡，程序永远退不掉”的版本。

虚假唤醒也是真事。

所以你永远要用条件再检查一次。

还有一个新手常见误会。

“我加个 volatile 是不是就行了？”

```cpp
volatile bool ready_flag = false;
```

`volatile` 管的是“别优化掉读取”。

它不保证多线程之间的同步。

把它当成线程同步。

往往会更惨。

### 小洞见：cv 不是队列，条件才是队列的灵魂

很多人第一次用 `condition_variable`，会把它当成“消息本身”。

但实际上 cv 只是门铃，队列还是队列，mutex 还是 mutex。

真正决定你能不能干活的，永远是那个条件：`!q.empty()`。

别信通知，只信状态。

并发这东西，很多坑不是靠聪明绕过去的。

是靠规矩挡住的。

### 横向小结：三种等法，三种代价

忙等。

代价是 CPU。

它会把机器烧得很热。

sleep。

代价是延迟。

你会在“响应慢一点”和“CPU 省一点”之间摇摆。

condition_variable。

代价是你得守规矩。

条件写对。

锁用对。

但一旦你守住了。

它给你的回报就是。

空的时候真睡。

有活时再醒。
