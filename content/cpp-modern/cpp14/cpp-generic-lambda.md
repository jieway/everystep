---
title: '泛型 lambda：auto 进了参数表之后'
description: 'C++14 把 auto 放进 lambda 的形参里，让“临时写个小函数”也能写出模板味道。'
---

那会儿还没有 lambda。

STL 刚进大家的工具箱。

你第一次用上 `std::sort` 的时候。

真的会觉得它很爽。

然后它就问你一句。

“按什么规则排？”

你以为这问题很简单。

结果你在代码库里多了一个新文件。

里面只有一个小 struct。

名字还特别随意。

`SortHelper`。

你知道以后没人会看它。

但你还是得写。

因为当年的 C++ 就是这么回事。

你想把“一点点逻辑”塞进算法里。

语言会让你先办个身份证。

### 那些年，比较器要么是函数指针，要么是一个类

最早的做法是函数指针。
算法要你一个“比较规则”，你就给它一个函数地址。

```cpp
bool by_length(const std::string& a, const std::string& b) {
    return a.size() < b.size();
}
```

能跑。

也不慢。

但它带不走状态。
你想加一个阈值，就得想办法把数据藏到别的地方。

于是大家开始写函数对象。
也就是写个类。

```cpp
struct ByLength {
    std::size_t bias{};

    bool operator()(const std::string& a, const std::string& b) const {
        return a.size() + bias < b.size();
    }
};
```

`operator()` 的意思是：这个对象可以像函数一样被调用。

成员变量就是它的行李。
你想带点“偏好”“阈值”“配置”，都塞进去。

### 在 lambda 之前，大家先学会了“绑参数”

那时候你也想写“带参数的比较器”。
但语言还不给你 lambda。
你只能把一个二元比较器，硬掰成一元。
先把其中一个参数固定住。

```cpp
std::vector<int> v{1, 7, 12, 20};

auto lt10 = std::bind2nd(std::less<int>(), 10);
auto n = std::count_if(v.begin(), v.end(), lt10);
```

`count_if` 会数一数：有多少元素让 lt10 返回 true。
`std::less<int>` 本来吃两个 int。
`bind2nd` 把第二个参数固定成 10。

这是 C++98 时代的老古董。
你今天基本见不到它了。

这招能用。
但读起来很不舒服。

后来 Boost 给了 `boost::bind`。
再后来 C++11 把它标准化成了 `std::bind`。

```cpp
auto lt10 = std::bind(std::less<int>{}, std::placeholders::_1, 10);
```

 `_1` 的意思是：把调用时传进来的第一个参数，塞到这里。
你写得越多，就越像在填表。

还有人用过 Boost.Lambda / Boost.Phoenix。
你会看到 `_1 < 10` 这种写法。

这些东西都在干同一件事。
在没有语言特性的年代，大家先用库把坑填上。

后来 lambda 一出来。
这些写法就像石器时代的工具。

不是它们不行。
是你终于有了更顺手的刀。

### 别的语言早就有了：C# / Java 是怎么写的

如果你写过一点 C#。
你可能见过这种一行小函数。

```csharp
Func<int, int> inc = x => x + 1;
```

它不是模板。
它靠的是“目标类型”。

左边写了 `Func<int, int>`。
编译器就知道 `x` 是 `int`。

Java 8 也差不多。
它把 lambda 绑在一个“函数式接口”上。

```java
Function<Integer, Integer> inc = x -> x + 1;
```

你先给它一个能装函数的壳。
lambda 才有了类型可以依靠。
类型推导发生在那一刻。

这俩语言的路子很像。
先有一个“函数类型”，再把 lambda 塞进去。

C++ 里也有一个类似的壳。
叫 `std::function`。

但它是通用盒子。
往往会比“直接用 lambda 对象”慢一点。

因为它把具体类型抹掉了。
你拿到的只剩“能不能调用”。

C++11 的 lambda 走了另一条路。
它先是一个对象，然后才有 `operator()`。

所以早期的 C++ 没法像它们那样“看一眼左边就推出来”。
你不写参数类型，编译器就没地方下手。

顺便一提。
C# 捕获的是“变量本身”，所以循环里容易踩坑。
Java 反过来，要求捕获的东西是 effectively final。

C# 里最经典的坑长这样。

```csharp
var fs = new List<Func<int>>();
for (int i = 0; i < 3; i++)
    fs.Add(() => i);

Console.WriteLine(fs[0]());
```

很多人以为会打印 0。
实际上很可能是 3。

修法也很“工程”。
你先把 i 拷贝一份到局部变量。

```csharp
for (int i = 0; i < 3; i++) {
    int x = i;
    fs.Add(() => x);
}
```

C++ 选择了更直白的方式：你自己写 `[=]` 还是 `[&]`。

`[=]` 大概就是：按值拷贝。
`[&]` 大概就是：按引用去用。

### C++11 的 lambda 来了，但它还不肯当“模板”

C++11 给了 lambda。
你终于可以把小逻辑写在调用点附近。

```cpp
std::size_t bias = 3;

auto by_length = [bias](const std::string& a, const std::string& b) {
    return a.size() + bias < b.size();
};
```

写起来舒服多了。
也很快。
但捕获这事也会出事故。
你写 `[&]` 会很省事。
然后你很可能某天就会被它反咬一口。

```cpp
std::function<int()> f;
{
    int bias = 3;
    f = [&]() { return bias; };
}

int x = f();
```

这里的 `bias` 会被拷贝进闭包对象里。
`bias` 虽然出了作用域，但那份拷贝还在。

如果你不需要“通用盒子”。
直接用 `auto` 接住 lambda，反而更轻。

```cpp
int bias = 3;
auto g = [bias]() { return bias; };

int x = g();
```

这时候 `g` 的类型就是那个闭包类型。
不需要类型擦除，也不需要堆分配。

但你很快又会撞墙。
C++11 的 lambda 参数类型还是写死的。

你想让同一段逻辑同时吃 `std::string` 和 `const char*`。
又得回去写模板和 struct。

```cpp
struct Less {
    template <class T, class U>
    bool operator()(const T& a, const U& b) const {
        return a < b;
    }
};
```

熟悉。
也烦。

### C++14 的变化很小：允许在形参里写 auto

C++14 放开了一道口子。
lambda 的形参位置允许写 `auto`。

```cpp
auto less = [](const auto& a, const auto& b) {
    return a < b;
};
```

你会发现它写的是 `const auto&`。
这其实是在说：别拷贝，尽量按引用比。
你拿一个很大的对象来比一下，就能体会。

```cpp
struct Big { std::vector<int> v; };
auto cmp = [](const auto& a, const auto& b) { return a.v.size() < b.v.size(); };
```

这段也有一个新手坑。
如果你把 C 字符串传进去，它比的不是内容。

```cpp
bool bad = less("a", "b");
```

这里比的是指针地址。
你要比内容，就得回到你熟悉的 `strcmp`。

```cpp
auto cstr_less = [](const char* a, const char* b) {
    return std::strcmp(a, b) < 0;
};
```

这看起来像动态类型。
但它不是。

模板你可以理解成：编译器按不同类型复制出多份代码。
泛型 lambda 也是这个路子。

```cpp
struct __Less {
    template <class A, class B>
    bool operator()(const A& a, const B& b) const {
        return a < b;
    }
};
```

这个 `__Less` 就是所谓的“闭包类型”。
意思是：编译器帮你生成的那个匿名类。

重点在它的 `operator()`。
其实就是一个函数模板。

泛型 lambda 本质上就是模板。
所以它的“泛型”发生在编译期。

### 同一年，标准库也学会了“泛型”：`std::less<>`

C++14 不只给了你泛型 lambda。
它还把 `std::less<T>` 补了一个默认版本：`std::less<>`。

你可以把它当成一个内置的“泛型比较器”。
它让 `std::map` / `std::set` 这种容器，可以直接用 `const char*` 去查 `std::string` 的键。

```cpp
std::map<std::string, int> m1;
m1.emplace("alice", 1);

auto it1 = m1.find("alice");
```

这行能编译。
因为 `find` 要的是 `std::string`。

你传 `const char*` 进去。
会发生一次隐式转换，然后构造一个临时 `std::string("alice")`。

```cpp
std::map<std::string, int, std::less<>> m2;
m2.emplace("alice", 1);

auto it2 = m2.find("alice");
```

`std::less<>` 是透明比较器。
容器会给你一套额外的 `find` 重载，让你用 `const char*` 直接查。

这类技巧有个名字。
heterogeneous lookup。

你甚至可以自己写一个。
核心就一条：告诉容器“我能比不同类型”。

```cpp
struct ByStr {
    using is_transparent = void;

    bool operator()(const std::string& a, const std::string& b) const { return a < b; }
    bool operator()(const std::string& a, const char* b) const { return a < b; }
    bool operator()(const char* a, const std::string& b) const { return a < b; }
};

std::set<std::string, ByStr> s;
auto it = s.find("alice");
```

`is_transparent` 就是一句暗号。
容器看到它，就知道可以做“异构查找”。

这跟泛型 lambda 是同一个动机。
别为了一个临时对象，让热路径冒烟。

### 事故现场：一个 `lower_bound`，把线上延迟拉成了直线

小项目。
线上照样能出事。

我们维护一张按名字排序的用户表。
请求里来的 key 是 C 接口给的 `const char*`。

```cpp
struct User { std::string name; };

std::vector<User> users{{"alice"}, {"bob"}, {"carl"}};
const char* key = "bob";
```

先别急着查。
你得先保证它是排好序的。

```cpp
std::sort(users.begin(), users.end(),
          [](const User& a, const User& b) { return a.name < b.name; });
```

`lower_bound` 不会替你检查排序。
它默认你已经按同一套规则排好了。

`std::lower_bound` 会在有序区间里做二分查找。
它返回一个迭代器，你可以把它理解成“指向某个元素的指针”。

旧代码最常见的写法，是先把 key 变成 `std::string`。
因为比较器吃不下别的类型。

```cpp
auto it = std::lower_bound(users.begin(), users.end(), std::string(key),
                           [](const User& u, const std::string& k) {
                               return u.name < k;
                           });
```

这行最坏的地方，是 `std::string(key)`。
每个请求都要构造一次临时字符串。

QPS（每秒请求数）一上来。
分配器开始排队，延迟就竖起来。

你当然想把临时对象删掉。
可比较器的参数类型被写死了。

这就是泛型 lambda 出手的地方。
它让你用同一套比较逻辑，直接吃 `const char*`。
它让你不再需要额外构造临时对象。

```cpp
auto by_name = [](const User& u, const auto& k) {
    return u.name.compare(k) < 0;
};

auto it = std::lower_bound(users.begin(), users.end(), key, by_name);
```

`compare` 会返回一个整数。
小于 0 表示左边更小，等于 0 表示相等。

这次 `k` 可以是 `const char*`。
也可以是 `std::string`。

你不需要再额外构造临时对象。
逻辑也只写了一份。

但别急着把它当万能钥匙。
`lower_bound` 只会用 `comp(element, value)` 这一种调用方式。

如果你换成 `upper_bound`。
它会反过来问你：`comp(value, element)`。

```cpp
auto it2 = std::upper_bound(users.begin(), users.end(), key, by_name);
```

这行会编译失败。
因为 `by_name(key, user)` 这条路你没写。

你要么再写一个能反向比的重载。
要么干脆写成一个小函数对象。

```cpp
struct ByName {
    bool operator()(const User& u, const char* k) const {
        return u.name.compare(k) < 0;
    }

    bool operator()(const char* k, const User& u) const {
        return std::strcmp(k, u.name.c_str()) < 0;
    }
};
```

`c_str()` 会把 `std::string` 变回 `const char*`。
`std::strcmp` 是你熟悉的 C 字符串比较。

这时候 `equal_range` 也能顺手用。
它会把“等于 key 的那一段”整个范围返回出来。

```cpp
auto r = std::equal_range(users.begin(), users.end(), key, ByName{});
```

`r.first` 是下界。
`r.second` 是上界。

泛型 lambda 让“算法的形参类型”不再把你锁死。

### 算法还有一个潜台词：比较器要像 `<`，别写成 `<=`

很多人第一次写比较器，会下意识写 `<=`。
看起来也合理。

```cpp
auto bad = [](int a, int b) { return a <= b; };
```

但这会把“相等”的情况也当成“更小”。
算法会迷路。

比较器回答的是“严格在前面吗”。

你拿两个相等的数试试。

```cpp
int a = 1, b = 1;
bool ab = bad(a, b);
bool ba = bad(b, a);
```

`ab` 和 `ba` 都是 true。
算法问你“谁在前”。
你回答“都在前”。

### 它到底是不是“万能比较器”？

它是模板。
模板很方便，但它也会复制出很多份实例。
用得越多，编译时间和二进制体积就越容易一起长。

### `auto&&`：把参数原样交出去

你还会遇到一种更常见的写法：`auto&&`。
它用来写“包装器”，把参数原样交给下一层。

```cpp
auto call_once = [](auto&& f, auto&& x) {
    return std::forward<decltype(f)>(f)(std::forward<decltype(x)>(x));
};
```

`decltype(x)` 的意思是：让编译器告诉我 x 的真实类型。
`std::forward` 的意思是：左值还是左值，右值还是右值。

左值你可以理解成：有名字的变量。
右值就是临时值，比如函数返回的那个匿名结果。

### 如果你只想让它吃某一种类型，就直说

泛型一旦放开。
就会有人塞奇怪的东西进来。

```cpp
auto only_int = [](auto x) {
    static_assert(std::is_same<decltype(x), int>::value, "int only");
    return x + 1;
};
```

`static_assert` 的意思是：编译期就检查。
不满足就直接不让你编。

### 最后留个亮点

以前写模板，像在跟语言对骂。
现在你在调用点写一行 lambda。

在别的语言里，lambda 更像“匿名函数”。
在 C++ 里，lambda 更像“带 `operator()` 的对象”。

模板在背后自己长出来。
你只需要把意图写清楚。

泛型 lambda 让你在写小函数时，能更关注逻辑本身，而不是类型。
它让你在写模板时，能更关注接口本身，而不是类型。
