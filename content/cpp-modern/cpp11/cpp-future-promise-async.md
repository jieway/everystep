---
title: 'future / promise / async：把并发写得更像同步'
description: 'C++11 提供 future/promise/async，把线程的“结果”和“异常”正规化地传回调用方，让并发接口更像函数调用。'
---

### 当年没有它的时候

那会儿还没有 C++11。

也没有 `std::thread`。

更别提 `std::async`。

你想并发。

就去写 `pthread`。

或者上 Boost。

然后把“结果”塞回主线程。

靠全局变量。

靠输出参数。

靠一堆锁。

靠 `condition_variable` 去等。

能跑。

但接口丑。

更麻烦的是。

错误也很丑。

线程里一旦出事。

主线程经常是最后一个知道的。

甚至永远不知道。

有人把这叫“并发的沉默失败”。

我觉得挺贴切。

因为你看到的不是报错。

是卡死。

是偶发。

是凌晨两点的心跳。

### 当年的土办法长什么样

最常见的一种写法是。

线程里算完。

把结果塞进一个“大家都能摸到”的地方。

主线程再去等。

```cpp
#include <condition_variable>
#include <mutex>
#include <thread>

std::mutex m;
std::condition_variable cv;
int g_result = 0;
bool g_done = false;

void worker() {
    std::lock_guard<std::mutex> lk(m);
    g_result = 42;
    g_done = true;
    cv.notify_one();
}

int main() {
    std::thread t(worker);

    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk, [] { return g_done; });
    int v = g_result;

    t.join();
}
```

你先别急着背 API。

你只要抓住这个画面。

我开了个线程。

结果放全局。

再用一个“等人通知”的东西等它。

这个“等人通知”的东西就是 `condition_variable`。

它大概相当于：你先在门口蹲着，等对方喊你一声。

再往上看一眼。

`std::mutex` 就是一把锁。

你可以把它理解成厕所门。

同一时间只能进一个人。

`std::lock_guard` 和 `std::unique_lock` 都是“帮你拿着钥匙的人”。

作用域一结束。

它们会自动把锁放回去。

这就是 C++ 常说的 RAII。

`cv.wait(lk, [] { return g_done; });` 这一行有俩新东西。

`wait()` 的意思是：没等到就睡。

等到了再醒。

而且它睡觉时会先把锁放开。

不然 worker 想加锁写结果。

你俩就一起僵住了。

所以这里必须用 `unique_lock`。

因为它能临时解锁，再自动加回去。

`[] { return g_done; }` 叫 lambda。

你可以把它当成“临时小函数”。

它这里的作用是告诉 `wait()`：什么时候才算等到了。

它还有一个隐藏好处。

`wait()` 有时候会“莫名其妙醒一下”。

这叫虚假唤醒。

所以你最好把条件写清楚。

醒了就再检查一次。

### 这些土办法到底哪里坑

第一坑是。

你得自己保证结果的生命周期。

你放全局还好。

你要是放在栈上。

就很容易拿到一根“已经过期的指针”。

```cpp
#include <thread>

int* g_ptr = nullptr;

void worker() {
    int local = 42;
    g_ptr = &local;
}

int main() {
    std::thread t(worker);
    t.join();
    int v = *g_ptr;
}
```

这段看起来能编译。

但 `local` 早就没了。

你解引用的是空气。

第二坑是。

错误传播很别扭。

线程里失败了。

你要么用错误码。

要么再加一个“全局错误”。

要么用回调把错误送回去。

总之不像函数。

比如很多人会写一个“全局错误码”。

```cpp
#include <thread>

int g_errno = 0;

void worker() {
    g_errno = 123;
}

int main() {
    std::thread t(worker);
    t.join();

    if (g_errno != 0) {
        return 1;
    }
}
```

能跑。

但你会发现。

你写着写着就变成了“到处检查错误码”。

第三坑更隐蔽。

并发里最容易出的是“读写撞车”。

同一份数据。

一个线程写。

另一个线程读。

你以为自己写的是 42。

读到的可能是“写到一半的 42”。

这种问题有个名字叫“数据竞争”。

你不用现在就学术化。

你只要记住：没有同步，就别共享。

再多送你一句。

数据竞争在 C++ 里属于未定义行为。

意思是。

它不保证表现。

你今天测没事。

明天线上就出事。

### 我写了个小项目，线上啪一下

假设你写了个很小的服务。

收到请求后去压缩一段数据。

压缩很慢，你就丢到线程里跑。

某天线上突然“啪”一下。

进程直接没了。

你连 `try/catch` 都来不及写。

因为异常不是在主线程里抛的。

它是在子线程里飞出去的。

```cpp
#include <thread>
#include <stdexcept>

void zip_worker() {
    throw std::runtime_error("zip failed");
}

int main() {
    std::thread t(zip_worker);
    t.join();
}
```

在 `std::thread` 的线程函数里抛异常。

如果你不在这个线程里自己抓住。

程序会走 `std::terminate()`。

`std::terminate()` 你可以理解成。

程序直接放弃治疗。

通常就是立刻结束进程。

主线程没有机会“接住”它。

这里的 `join()` 也值得解释一句。

`join()` 的意思是：主线程在这里等着。

直到子线程真的跑完。

它有点像你在等同事把活做完。

不等完你就别往下走。

于是你被迫发明土办法。

比如用错误码。

比如用全局状态。

比如写一套“线程里失败了请告诉我”的协议。

写着写着。

你会开始怀念同步函数。

同步函数至少很诚实。

成功就返回值。

失败就抛异常。

### 它是怎么“长出来”的

你会发现。

大家要的其实不是“线程”。

大家要的是“一个将来会给我结果的东西”。

英文里很早就有人叫它 Future。

Java 里有 `Future`/`Callable`。

你提交任务。

拿到一个 Future。

C# 里有 `Task`。

后面甚至演化出 `async/await`。

写起来越来越像同步。

JavaScript 里有 `Promise`。

本质也是：先拿到一个“承诺”。

等它兑现。

C++11 这套 `future/promise/async`。

也不是凭空冒出来的。

委员会和工业界一直在吸收经验。

Boost 里的线程库也提供过类似思路。

### 横向对比一下，别人怎么处理这件事

你会发现各家方案在回答同一组问题。

结果怎么回传？

失败怎么回传？

等待怎么写得不难受？

Java 的 `Future`。

能拿到结果。

但早期写法常见的痛点是。

等待写起来偏“硬”。

你会看到很多 `get()` 阻塞在那里。

C# 的 `Task` 往前走了一步。

它不仅是“将来会有的值”。

还把“组合/串联异步”这件事做得更顺。

后来有了 `async/await`。

语言层面直接帮你把异步写得像同步。

JavaScript 的 `Promise`。

思路也很接近。

它强调“承诺”本身就是一个对象。

失败也会被当成一等公民传下去。

而 C++11 的取舍是。

它不强行给你一个统一的“事件循环”。

也不承诺每次都开线程。

但它把最关键的形状定下来：`future`/`promise`。

这让你至少能把“结果/失败/等待”写得像函数接口。

差别在于。

C++ 更在意。

类型。

生命周期。

还有“你到底有没有真的开线程”。

### std::async：先把慢活丢出去

`std::async` 很像你想象中的“开个线程跑函数”。

但它最值钱的不是线程。

而是它把“结果”打包成了一个 `std::future`。

`future` 你可以把它当成一句人话：

“这个值现在还没有，但将来会有。”

```cpp
#include <future>

int slow_zip() {
    return 42;
}

int main() {
    auto f = std::async(std::launch::async, slow_zip);
    int v = f.get();
}
```

`f.get()` 会等。

等到结果真的算出来。

然后把值交给你。

关键结论是这一句。

并发最怕的不是慢。

是你不知道它失败了。

### future：结果、等待、还有异常

`future` 里装的不只是结果。

它还装着“失败”。

也就是异常。

如果你还没系统用过异常也没关系。

你先把它当成“错误不是用 return 就能说清”的机制。

`throw` 抛出去，`try/catch` 在别处接住。

```cpp
#include <future>
#include <stdexcept>

int slow_zip() {
    throw std::runtime_error("zip failed");
}

int main() {
    auto f = std::async(std::launch::async, slow_zip);

    try {
        f.get();
    } catch (const std::exception&) {
        // 这里能接到子线程抛出的异常
    }
}
```

子线程里抛出的异常不会丢。

它会被 `future` 收起来。

等你 `get()` 的时候再抛回给你。

这一下就很像同步函数了。

你也会看到 `wait()`。

它也会等。

但它不取结果，结果还留在 `future` 里。

这里再补一句。

`wait()` 很像你在问：活做完没？

`get()` 则是：活做完没？给我成果。

另外一个很容易踩的点是：`get()` 只能调用一次。

因为它会把结果“取走”。

像收快递，你签收了，门口就空了。

如果你确实想“多个人都能拿到同一份结果”。

你要的是 `shared_future`。

```cpp
#include <future>

int main() {
    auto f = std::async(std::launch::async, [] { return 42; });
    auto sf = f.share();

    int a = sf.get();
    int b = sf.get();
}
```

`shared_future` 的直觉是。

普通 `future` 像一份一次性的快递。

`shared_future` 像一份复印件。

你可以拿很多次。

还有一个初学者常问的问题：“我不写 `std::launch::async` 行不行？”

能跑。

但默认策略可能会选择“延迟执行”，也就是不一定开线程。

它可能等你 `get()`/`wait()` 的时候。

才在当前线程把函数跑完。

所以你要的如果是并行，就老老实实写上 `std::launch::async`。

关键结论还是那句。

别把“延迟执行”当“并发”。

你也可以反过来。

我就是要它延迟。

那就显式写成 `deferred`。

```cpp
#include <future>

int slow_zip() {
    return 42;
}

int main() {
    auto f = std::async(std::launch::deferred, slow_zip);
    int v = f.get();
}
```

这段代码里。

函数不是立刻跑的。

而是你 `get()` 的那一刻。

才在当前线程开始跑。

### promise：不用 async，我也要把答案交回去

有时候你确实不想用 `async`。

比如你要自己管理线程生命周期。

但你还是想把“结果/失败”正规地传回去。

这时就轮到 `std::promise` 了。

名字挺中二。

但意思很直白：我承诺，稍后把答案给你。

`promise` 负责交卷。

`future` 负责等成绩。

```cpp
#include <future>
#include <thread>

int main() {
    std::promise<int> p;
    auto f = p.get_future();

    std::thread t([pp = std::move(p)]() mutable {
        pp.set_value(42);
    });

    t.join();
    int v = f.get();
}
```

这里的 `std::move(p)` 不是炫技。

是因为 `promise` 不能拷贝。

你要把它交给线程，就得把“拥有权”也交过去。

`[pp = std::move(p)]` 也是个新写法。

你可以把它理解成。

我在 lambda 里面新建了一个变量 `pp`。

把外面的 `p` move 进来。

然后线程里用的其实是 `pp`。

`mutable` 的意思是。

允许这个 lambda 里修改 `pp`。

`std::move` 的直觉是。

我不再坚持“这是我的”。

我允许你把它的内部资源搬走。

move 之后。

原来的对象还在。

但内容别指望了。

这跟 `unique_ptr` 的感觉很像。

你也可以让 `promise` 交一份失败。

用 `set_exception()`。

让主线程在 `get()` 的时候收到异常。

```cpp
#include <future>
#include <thread>

int main() {
    std::promise<int> p;
    auto f = p.get_future();

    std::thread t([pp = std::move(p)]() mutable {
        try {
            throw 1;
        } catch (...) {
            pp.set_exception(std::current_exception());
        }
    });

    t.join();

    try {
        f.get();
    } catch (...) {
        // 异常从子线程“转交”回来了
    }
}
```

`std::current_exception()` 做的事很朴素。

把“刚刚捕获到的异常”打包成一个可保存的句柄。

你可以把它当成“异常的快递单号”。

然后用 `set_exception()` 把它放进 `promise`。

等主线程 `get()` 的时候再还原出来。

你可以把这理解成。

异常不是“跨线程飞回来”。

是子线程把它装进盒子里。

主线程 `get()` 的时候把盒子打开。

还有一个很真实的坑。

promise 要是“忘了交卷”。

future 会报错。

```cpp
#include <future>

int main() {
    std::future<int> f;
    {
        std::promise<int> p;
        f = p.get_future();
    }

    try {
        f.get();
    } catch (const std::future_error&) {
    }
}
```

这类错误叫 broken promise。

它比卡死好一点。

至少它会明确告诉你：你漏了一步。

### 小洞见：它们在修“接口的形状”

`future/promise/async` 最核心的价值。

不是“帮你开线程”。

而是让并发接口变得像函数。

你想要的三件事：结果、等待、失败。
都被装进了类型里。
你一眼就能看出这个函数“要不要等、怎么等、会不会抛”。

你不用再靠注释说“这个指针参数是输出”。
也不用再靠约定说“失败了去看某个全局错误码”。

把协议写进类型。

比写进文档靠谱。
