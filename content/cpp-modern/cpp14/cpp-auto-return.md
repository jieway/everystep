---
title: '返回类型推导：函数也可以写 auto'
description: 'C++14 让普通函数也能用 auto 作为返回类型，少写一堆重复的类型，还能让“包装函数”更干净。'
---

C++11 刚出来那会儿。

大家刚学会写模板。

写得挺兴奋。

直到你要给函数写返回类型。

手就停住了。

不是不会。

是你突然发现。

你得把同一个类型。

写两遍。

一遍在表达式里。

一遍在签名里。

而且还得保证。

永远一致。

这活儿很“机械”。

但你一机械。

线上就会啪一下。

### 当年没有“函数返回 auto”时，我们怎么活

那时候很常见一类函数。
它不做业务，只做“转一手”。
比如加日志、加计时、加个锁。

这种函数有个特点。
你最不想写的就是返回类型。
因为你写的不是“类型”，你写的是“复制粘贴”。

C++11 其实也给过你一点甜头：局部变量可以写 `auto`。
它的意思是“右边是什么类型，我就跟着是什么类型”。

```cpp
auto x = load_user();
```

这一招能少抄一堆长得要命的模板类型。
但函数的返回类型那一栏，你还是得写。

C++11 给了一个工具：尾置返回类型。
意思是“我先写 `auto` 占个位，真正的返回类型写到后面去”。
这样你就能用表达式去描述它。

```cpp
#include <utility>

template <class T>
auto first(T&& x) -> decltype(std::forward<T>(x).first) {
    return std::forward<T>(x).first;
}
```

这里的 `decltype(expr)` 你可以先把它当成一句话。
把表达式 `expr` 的类型，原样拿出来。
这招很强，但读起来也确实像在填表。

代码里那个 `std::forward` 你先别急。
你可以先把它当成“把参数原样传下去”。
等你以后学到完美转发，再回来看它也不迟。

顺便提一句。
你可能听过那句老话："Programs must be written for people to read"。
返回类型这事儿写得越绕，读的人越容易开始猜。

### 这东西怎么来的：从 typeof 到 decltype，再到函数返回 auto

在 C 里，你写函数，就得把返回类型写死。
编译器也不会替你“猜”。

但 C++ 一有模板，返回类型就开始变得“依赖表达式”。
你写的是一套代码，但每个 `T` 进来，表达式的类型可能都不一样。

在 C++11 之前，很多人只能靠编译器扩展。
比如 GCC 的 `typeof`。
再比如 Boost 的 Typeof 库。

它们解决的问题很直白：我不想抄类型。
我想问编译器一句：“这个表达式到底是什么类型？”

后来标准把这件事正面接住了。
C++11 给了 `decltype(expr)`。
专门干“把表达式的类型拿出来”。

但你马上会遇到另一个现实问题。
有些表达式要用到参数名。
而参数名只有在你把参数列表写完之后才存在。

所以 C++11 还顺手给了尾置返回类型。

```cpp
template <class T>
auto len(T const& x) -> decltype(x.size()) {
    return x.size();
}
```

你先写 `auto` 占个位。
等参数 `x` 出现了，再在后面用 `decltype(x.size())` 把返回类型补上。

有意思的是。
C++11 的 lambda 其实已经能“自己推返回类型”了。

```cpp
auto add1 = [](int x) { return x + 1; };
```

lambda 不用写返回类型。
编译器会从 `return` 里推出来。

C++14 做的事就很像：把这套推导规则搬到普通函数上。

### 线上啪一下：你写对了类型，但还是把人坑了

我讲个更像现实的。
你在写一个小项目，有个函数叫 `load_user()`。
一开始大家图省事，返回一个裸指针。

```cpp
struct User { int id; };

User* load_user();
```

你加个监控。
顺手包一层 wrapper，不想动原来的签名。

```cpp
User* load_user_with_metrics() {
    return load_user();
}
```

过了几周，你们踩到了内存泄漏。
有人把 `load_user()` 改成返回 `std::unique_ptr<User>`。
你可以把它理解成：一个会自己 `delete` 的指针，而且只能有一个主人。

这里有个新手最容易忽略的词：所有权。
你可以把它理解成“这块内存到底该谁负责释放”。
`unique_ptr` 的意思是：这事儿我负责，但我只允许一个负责人。

再有个词也很重要：悬空指针。
就是指针还在，但它指向的内存已经没了。
你一解引用，就像踩空台阶。

```cpp
#include <memory>

std::unique_ptr<User> load_user();
```

这时候 wrapper 麻烦了。
你原来写死了返回 `User*`，编译器也不会帮你“自动跟上”。
有人急着修编译，就会写出这种东西。

```cpp
#include <memory>

User* load_user_with_metrics() {
    auto p = load_user();
    return p.get();
}
```

编译能过。
但这代码在 `return` 那一刻就开始倒计时。
因为 `p` 是局部变量，函数结束它就析构，里面的 `User` 也被释放。

很多新手会问：那 `p` 里的东西怎么“交出去”？
答案是 move。
你可以把 move 理解成：把所有权转交给别人，自己变空。

`unique_ptr` 这类东西一般不能拷贝，只能 move。

```cpp
auto ok() {
    auto p = load_user();
    return p;
}
```

上面这句 `return p;` 会把 `unique_ptr` 移交出去。
所以返回值拿到的是“活的指针”。
而不是 `p.get()` 那种“把地址抄出来就跑”。

你把一根“悬空指针”塞回了线上。
然后某个请求一跑到这。
就啪一下。

（“它昨天还好好的啊？”——事故现场常见台词。）

### C++14：让编译器替你干这份机械活

C++14 做了一件很朴素的事。
允许普通函数也写 `auto` 作为返回类型。
然后由编译器根据 `return` 的表达式推导。

```cpp
auto load_user_with_metrics() {
    return load_user();
}
```

`load_user()` 还是返回裸指针时，wrapper 就返回裸指针。
`load_user()` 改成返回 `unique_ptr` 时，wrapper 也跟着返回 `unique_ptr`。
你不需要在脑子里同步两份类型。

### 你得知道的几个坑

第一个坑：同一个函数里，所有 `return` 推导出来的类型必须一致。
这不是“限制你自由”，这是在帮你拦住那种上线才炸的分支。

```cpp
auto f(bool ok) {
    if (ok) return 1;
    return 2;
}
```

上面没问题。
但下面这个会直接报错。

```cpp
auto f(bool ok) {
    if (ok) return 1;
    return 1.0;
}
```

第二个坑：`auto` 推导看的是 `return expr;` 里的 `expr`。
所以 `return {1,2,3};` 这种写法，很容易把自己绕进去。
因为 `{...}` 不是一个“带着明确类型的表达式”。

想要“返回一个容器”，就把容器写出来。

```cpp
#include <vector>

auto make_vec() {
    return std::vector<int>{1, 2, 3};
}
```

第三个坑：`auto` 返回类型通常是“按值”。
就算你 `return` 的东西看起来像引用，也可能被你不小心拷贝掉。
你以为你在改原变量，其实你在改副本。

```cpp
int& get_ref(int& x) { return x; }

auto bad(int& x) {
    return get_ref(x);
}
```

还有一种更像“真实项目里会踩”的。
比如你包一层 `std::vector::front()`。
你以为你在返回引用，其实你悄悄拷贝了一份。

```cpp
#include <vector>

auto front_copy(std::vector<int>& v) {
    return v.front();
}
```

`v.front()` 本来返回的是 `int&`。
但 `auto` 返回把它变成了 `int`。
改了返回值，不会改到原来的 `v`。

如果你确实想“原样返回”。
C++14 还有个更像“原样”的写法：`decltype(auto)`。
它会把 `return` 表达式的类型连同引用性一起保留下来。

```cpp
decltype(auto) good(int& x) {
    return get_ref(x);
}
```

第四个坑：返回类型推导需要看到函数定义。
因为返回类型是从 `return` 里推出来的。

所以你不能只在头文件里写个声明。

```cpp
auto f();
```

对调用方来说，返回类型是“未知的”，它没法编译。
解决方法通常就两个。

你要么把定义也放在头文件里（让调用方看得到）。

```cpp
auto f() { return 42; }
```

要么就老老实实写死返回类型。

```cpp
int f();
```

### 横向对比：四种写法，区别不在“帅”，在“会不会说谎”

先用同一个例子。
我们就想把 `get_ref(x)` 的返回值原样转出去。

```cpp
int& get_ref(int& x) { return x; }
```

手写返回类型。
最直白。
但你得保证“我写的类型”和“我 return 的东西”永远同步。

```cpp
int& a(int& x) {
    return get_ref(x);
}
```

尾置返回类型 + `decltype`。
能把“同步工作”交给表达式。
但写起来也确实更啰嗦。

```cpp
auto b(int& x) -> decltype(get_ref(x)) {
    return get_ref(x);
}
```

函数返回 `auto`（C++14）。
写起来最干净。
但它的推导规则更像“模板推导”，会把引用性抹掉。

```cpp
auto c(int& x) {
    return get_ref(x);
}
```

`decltype(auto)`（C++14）。
写法和 `auto` 一样干净。
但推导规则像 `decltype`，会把引用性保留下来。

```cpp
decltype(auto) d(int& x) {
    return get_ref(x);
}
```

### 别的语言怎么处理“少抄类型”

很多语言其实也在解决同一个问题：别让人重复写已经能推出来的信息。
只是它们下刀的位置不一样。

比如 C# 有 `var`，Java 有 `var`。
它们解决的是“局部变量”的啰嗦。
但函数签名的返回类型，基本还是要你写明白。

动态语言更激进。
比如 Python 就不靠返回类型吃饭。
但它换来的代价是：很多问题得跑到运行时才知道。

C++ 的选择比较中庸。
它宁愿让你在编译期把类型推干净。
也不愿意让你上线后才发现签名在说谎。

### 一句话的结论

`auto` 返回类型推导。

本质是把“抄类型”这份机械劳动。

交给编译器。

### 最后留个亮点

我现在看一个项目稳不稳。
很少先看它用没用新特性。
我先看它的 wrapper 有没有在“类型”上跟真实逻辑脱节。

类型一脱节。
代码就开始说谎。
而 bug 最喜欢听谎话。
