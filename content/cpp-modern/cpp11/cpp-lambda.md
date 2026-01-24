---
title: 'lambda 表达式：匿名函数与闭包'
description: 'C++11 的 lambda 让“临时写个小函数”变成日常操作，也把回调、算法和并发写得更顺手。'
---

那几年，写 STL 算法像背咒语。

你会在代码里看到 `bind1st`、`bind2nd`、`mem_fun`。

像一串古老的法术名。

懂的人很淡定。

不懂的人会怀疑自己是不是学错了语言。

当年的痛点其实很朴素。

你只是想“临时写个小函数”。

比如给 `sort` 换一行比较规则。

结果你得先造一个类。

起名。

放头文件。

然后在 code review 里解释：它真的只用一次。

更麻烦的是回调。

函数指针能救急。

但它带不走上下文。

阈值、配置、对象指针，全都没地方放。

于是当年的人就开始“发明解决方案”。

先是函数对象。

再是各种适配器和绑定器。

后来 Boost 也来帮忙，`_1`、`_2` 这些占位符满天飞。

能用。

也能把编译错误变成一面墙。

所以 C++11 的 lambda 不是潮流。

它更像一场“被现实逼出来的收敛”。

把逻辑写回现场。

把环境也一起带走。

也顺便把生命周期问题摊在你面前。

### 当年还没有 lambda 的时候

STL 算法爱收“可调用对象”。

这句话对刚学 C++ 的人不太友好。

我先翻译成人话。

所谓“可调用对象”，就是“你能写成 `x(...)` 这种样子去调用它”的东西。

函数当然算。

但更常见的是一种小对象：它重载了 `operator()`。

这种小对象很多人叫它“函数对象”。

你想塞一个比较规则，就得给 `sort` 一个函数对象。

也就是说，你得给它一个 `operator()`。

```cpp
#include <algorithm>
#include <string>
#include <vector>

struct ByLen {
    bool operator()(const std::string& a, const std::string& b) const {
        return a.size() < b.size();
    }
};

std::vector<std::string> v{"aaa", "b", "cc"};
std::sort(v.begin(), v.end(), ByLen{});
```

这段代码没错。

但你为了“一行比较”，制造了一个类型。

类型一旦出现，就开始有名字、有文件、有复用压力。

回调问题更要命。

你当然可以用函数指针。

但函数指针有一个硬伤：它带不走环境。

```cpp
#include <cstddef>
#include <string>

int g_limit = 2;

bool longer_equal_limit(const std::string& s) {
    return s.size() >= static_cast<std::size_t>(g_limit);
}
```

你看，环境被我塞进了全局变量。

能跑。

也很容易把“配置是谁写的、什么时候改的”变成下一次事故的导火索。

如果你写过 C，你可能会想到另一条路。

回调函数不带环境没关系。

我额外塞一个 `void* user_data`。

```cpp
#include <cstddef>
#include <cstring>

struct Ctx {
    std::size_t limit;
};

bool pred(const char* s, void* user) {
    auto* ctx = static_cast<Ctx*>(user);
    return std::strlen(s) >= ctx->limit;
}

bool call_pred(const char* s, bool (*p)(const char*, void*), void* user) {
    return p(s, user);
}

Ctx ctx{2};
bool ok = call_pred("abc", pred, &ctx);
(void)ok;
```

这种写法非常“C”。

但它也把责任全丢给你了：强转对不对、`user` 活没活着、谁负责释放。

你要是想把环境塞回局部变量里。

那在当年通常就得写成“带状态的函数对象”。

```cpp
#include <algorithm>
#include <cstddef>
#include <string>
#include <vector>

struct LongerEqual {
    std::size_t limit;
    bool operator()(const std::string& s) const { return s.size() >= limit; }
};

std::vector<std::string> v{"aaa", "b", "cc"};
auto it = std::find_if(v.begin(), v.end(), LongerEqual{2});
(void)it;
```

这段代码更像“正经 C++”。

但你又一次为了一个小逻辑，制造了一个类型。

### 那些年社区怎么补洞（以及借鉴了谁）

在 lambda 还没来之前，大家不是坐等标准。

大家会先想办法活下去。

一种常见做法是“绑定参数”。

意思是：先把一部分参数和对象塞进去，做成一个新的可调用对象。

```cpp
#include <functional>
#include <string>

struct Cmp {
    bool by_len(const std::string& a, const std::string& b) const {
        return a.size() < b.size();
    }
};

Cmp c;
auto f = std::bind(&Cmp::by_len, c, std::placeholders::_1, std::placeholders::_2);
```

这就是“把成员函数和对象先绑在一起”。

如果你是刚学 C++ 的读者，你大概率会卡在两个点。

一个是：`&Cmp::by_len` 为什么长这样。

它叫“指向成员函数的指针”，和普通函数指针不是一回事。

另一个是：`_1`、`_2` 是什么鬼。

它们是“占位符”，意思是“到时候调用时把第一个/第二个实参塞进来”。

lambda 出来之后，同一件事会变得更像人话。

```cpp
#include <string>

struct Cmp {
    bool by_len(const std::string& a, const std::string& b) const {
        return a.size() < b.size();
    }
};

Cmp c;
auto f = [&c](const std::string& a, const std::string& b) {
    return c.by_len(a, b);
};
```

你不再需要 `_1`、`_2`。

也不用解释“成员函数指针到底怎么调用”。

### 横向对比：别的语言怎么写这类回调

这类需求并不是 C++ 独有。

它更像“写业务代码的自然形态”。

在 Java 早些年，你会写匿名内部类。

逻辑很短。

样板很长。

```java
// Java 早年的“匿名内部类”风格
Collections.sort(list, new Comparator<String>() {
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
});
```

你想表达的只是比较规则。

但你得先把样板写完。

在 C# 里，lambda 早早成了日常。

写起来像在写数学。

```csharp
// C# 的 lambda 更像“直接把规则写出来”
list.Sort((a, b) => a.Length.CompareTo(b.Length));
```

这也是为什么很多人第一次见到 C++11 lambda 会说：终于像个人了。

而 C++ 之所以更拧巴，是因为它要同时照顾：零开销、泛型、老代码。

### 事故是怎么来的

我当时在写一个小服务。

为了省事，把一次性的小逻辑塞进异步线程。

然后我用了最省事的捕获：`[&]`。

```cpp
#include <thread>

void spawn() {
    int retry = 3;
    std::thread([&] { (void)retry; }).detach();
}
```

`retry` 是局部变量。

线程函数按引用捕获它。

`spawn()` 一返回，`retry` 就结束生命周期了。

线程里那一眼看过去，就是悬空引用。

这里顺手再解释一句“生命周期”。

对刚学 C++ 的你来说，它就是：变量从“进入作用域被创建”到“离开作用域被销毁”的那段时间。

引用能指向一个变量。

但引用挡不住变量死亡。

这类 bug 之所以恶心。

是因为它不一定当场炸。

它喜欢等内存被别的东西覆盖以后再炸。

### lambda 到底是什么

你可以把 lambda 当成“匿名的函数对象”。

它长得像函数，但本质更像一个带 `operator()` 的小对象。

```cpp
auto f = [](int x) { return x + 1; };
int y = f(41);
```

`f` 不是函数指针。

它是一个编译器生成的匿名类型的对象。

你写的函数体，变成了它的 `operator()`。

### 编译器到底生成了什么

你可以把 lambda 想成一种“编译器帮你写的结构体”。

按值捕获的变量，会变成这个结构体的成员变量。

lambda 里的函数体，会变成 `operator()`。

比如你写这样一段。

```cpp
int x = 10;
auto add_x = [x](int y) { return x + y; };
int z = add_x(1);
(void)z;
```

`x` 就是那份“随身行李”。

它不是到处引用外面的 `x`。

它是把 `x` 的值塞进了闭包对象。

```cpp
struct __Closure {
    int x;
    int operator()(int y) const { return x + y; }
};
```

你当然不会真的写出 `__Closure`。

但你脑子里有这个模型，很多语法细节就不再神秘了。

理解了这点，你就更容易理解：为什么按值捕获是副本，为什么按引用捕获会悬空。

### `[]` 里装的是什么

`[]` 叫“捕获列表”。

捕获的意思是：把外面的变量，塞进这个小对象里。

这个“带着环境的小对象”，很多人叫它“闭包”。

闭包听起来像数学。

你可以把它翻译成人话：函数带着随身行李。

```cpp
#include <cstddef>
#include <string>
#include <vector>
#include <algorithm>

std::vector<std::string> v{"aaa", "b", "cc"};
std::size_t limit = 2;
auto it = std::find_if(v.begin(), v.end(),
                       [limit](const std::string& s) { return s.size() >= limit; });
(void)it;
```

`[limit]` 是按值捕获。

等价于：闭包对象里有一个成员变量，保存了 `limit` 的副本。

### 按值捕获：稳，但不“同步”

按值捕获最适合跨线程、跨回调。

因为它把数据复制进去了。

```cpp
int x = 1;
auto f = [x] { return x; };
x = 2;
int y = f();
```

`y` 还是 1。

你捕获的是“当时的值”。

外面怎么改，它不关心。

### 按引用捕获：灵，但要盯住寿命

按引用捕获就像拿着一张“指路牌”。

它不搬家。

它只记住你家地址。

```cpp
int x = 1;
auto f = [&x] { return x; };
x = 2;
int y = f();
```

`y` 变成 2。

但你必须保证：`x` 在 `f()` 被调用时仍然活着。

否则就是我上面那种凌晨两点的故事。

### `mutable`：改副本，不改原件

按值捕获默认是“只读”。

因为编译器默认 `operator()` 是 `const`。

你要在 lambda 里改那份副本，就得加 `mutable`。

```cpp
int x = 1;
auto f = [x]() mutable { return ++x; };
```

这会修改闭包对象内部那份 `x`。

外面的 `x` 不会动。

### 捕获 `this`：顺手，但最容易把自己送走

在成员函数里写 lambda，最顺手的是捕获 `this`。

它让你在回调里直接用成员变量。

```cpp
#include <functional>

struct Worker {
    int base = 10;
    std::function<int(int)> make() {
        return [this](int x) { return base + x; };
    }
};
```

这段代码的隐含前提是：回调执行时，`*this` 还活着。

如果对象先析构，回调晚点才跑。

`this` 就变成悬空指针。

于是你会得到一种“看起来像内存被鬼摸了”的崩溃。

如果你只是想用当下的成员值。

更稳的办法是把它拷贝出来，再按值捕获。

```cpp
#include <functional>

struct Worker {
    int base = 10;
    std::function<int(int)> make() {
        int base_copy = base;
        return [base_copy](int x) { return base_copy + x; };
    }
};
```

这会把“访问成员变量”变成“使用一份快照”。

代价是：对象之后再改 `base`，这个回调也不会同步。

### 返回类型：需要时再写

大多数 lambda 的返回类型可以自动推导。

你不用写。

```cpp
auto f = [](int x) { return x > 0; };
```

但当你写了多分支，并且返回类型推不出来时，就要显式写 `-> T`。

```cpp
auto g = [](bool ok) -> int { return ok ? 1 : 0; };
```

这不是啰嗦。

这是在告诉编译器：别猜了，我给你定死。

### lambda 要放到哪里

能用 `auto` 就用 `auto`。

因为 lambda 的真实类型你写不出来。

```cpp
auto pred = [](int x) { return x > 0; };
```

当你需要“统一类型”时，比如要把回调塞进容器，才会用 `std::function`。

```cpp
#include <functional>

std::function<int(int)> f = [](int x) { return x + 1; };
```

`std::function` 做的是类型擦除。

“类型擦除”这四个字很吓人。

你可以把它理解成：把各种不同类型的可调用对象，装进同一个盒子里，对外只暴露一种调用方式。

这条路在 Boost 时代就有人走过。

`std::function` 的祖先之一就是 `boost::function`。

它可能带来堆分配，也可能带来一次间接调用。

写库时，若能让它走模板参数，通常更轻。

```cpp
template <class F>
int apply(F f, int x) { return f(x); }
```

这类写法更容易内联。

也更接近“零成本抽象”的理想。

### 回到事故现场：怎么写才不炸

回到那个线程例子。

你最稳的修法就是按值捕获。

把你要用的东西，复制进闭包对象里。

```cpp
#include <thread>

void spawn() {
    int retry = 3;
    std::thread([retry] { (void)retry; }).detach();
}
```

现在 `retry` 的副本跟着线程函数一起活。

`spawn()` 返回也没关系。

你不是在引用一个尸体。

你是在用你自己口袋里的零钱。

### 小结

lambda 的核心就两句话。

它把临时逻辑贴回现场。

它把需要的上下文装进对象。

真正的坑也就一件事。

你捕获的不是语法。

你捕获的是生命周期。

写得顺手的时候。

最好多看一眼 `[]`。

你到底带走了谁。
