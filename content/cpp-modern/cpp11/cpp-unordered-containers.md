---
title: 'unordered 容器：unordered_map / unordered_set'
description: 'C++11 把哈希容器标准化：平均 O(1) 查找很香，但你得理解哈希、负载因子和 rehash 的代价。'
---

### 当年没有 unordered 的日子

那会儿你想要一张“用 key 快速查值”的表。

标准库不给。

只给你 `std::map`。

要么你自己写一个。

要么去翻各家编译器的私货。

今天在你机器上能跑。

明天换个编译器就报错。

更惨的是。

同事一更新工具链。

线上就“啪”一下。

你还不知道为啥。

那时候大家都学会了一件事。

别太依赖“看起来像标准库”的东西。

它可能只是某个实现顺手塞的。

### 线上啪一下：map 很稳，但热点不讲道理

假设你写了个小服务。
就干一件事：统计每个用户今天点了多少次。
你图省事，用了 `std::map`。

```cpp
#include <map>
#include <string>

std::map<std::string, int> freq;

void on_click(const std::string& user) {
    ++freq[user];
}
```

这段代码很“稳”。
但 `map` 是红黑树。
每次查找/插入，都是 `logN`。

刚开始用户少，你感觉不到。
后来某天活动来了，请求量上去。
CPU 像被人拧紧了。

延迟开始抖。
你打开性能分析工具（profiler），发现时间都花在 `map` 上。
你开始怀疑人生。

你后来才知道。
所谓“热路径”，就是那段被调用最多的代码。
它哪怕只慢一点点，都会被放大成一场事故。

“不是就加一吗？”

### C++11 的收编：把“哈希容器”变成标准件

在 C++11 之前，“哈希表”不是没有。
只是它们不在一个统一的名字下面。
你在 Linux 可能用过 `__gnu_cxx::hash_map`，在 Windows 又见过 `stdext::hash_map`。

有人当年吐槽过一句话：
写一次。
编译三次。

C++11 把它们收编成 `unordered_map` 和 `unordered_set`。
名字里那个 `unordered` 很诚实：它不保证遍历顺序。
换来的，是更便宜的查找。

### 它不是“发明”，是“收编”

这类容器更早就有人做过。
SGI STL 里就有 `hash_map` / `hash_set`。

后来各家实现各玩各的。
你今天用这个名字。
明天换个平台就得改。

Boost 也看不下去了。
它给了 `boost::unordered_map`。
想做一份“到哪都能用”的版本。

再后来 TR1 把它先放进了 `std::tr1::unordered_map`。
算是“试运行”。

TR1 你可以把它理解成：
标准委员会先发一份“技术报告”。
把一些库先放进去。
让大家用。
让实现磨一磨。

C++11 才正式把它放进 `std::unordered_map`。
并且把行为写得更死。

所以你现在用到的 unordered。
更像一条规矩。
不是某家编译器的心情。

它怎么做到的？
靠“哈希”。

哈希就是把一个 key 变成一个数字。
再用这个数字，把元素分到一堆“桶”里。

桶（bucket）你可以理解成一排格子。
格子多，挤得就少。

### 先把“哈希”这个词掰开

你第一次见到 `unordered_map`。
很可能会卡在一个词：`std::hash`。

它其实没那么玄。
就是一个“把东西变成数字”的默认工具。

```cpp
#include <cstddef>
#include <functional>
#include <string>

std::size_t h1 = std::hash<std::string>{}("alice");
std::size_t h2 = std::hash<std::string>{}("bob");
```

你不需要关心 `h1` 到底是多少。
你可以把 `std::size_t` 当成“装大小的无符号整数”。
它就是一个数字。

你只希望它们分散。
别全挤在一起。

### 桶（bucket）和冲突（collision）

哈希算出来的是个大数字。
容器会用它去决定“放进哪个桶”。
你可以直接问它：

```cpp
#include <cstddef>
#include <string>
#include <unordered_map>

std::unordered_map<std::string, int> m;
m.reserve(8);

std::size_t bc = m.bucket_count();
std::size_t b = m.bucket("alice");
```

`bucket_count()` 是桶的数量。
`bucket(key)` 会告诉你：这个 key 会落到第几个桶。

冲突（collision）也好理解。
就是两个不同的 key。
算出来却落在同一个桶。

那落在同一个桶怎么办？

你可以先把每个桶想成一个小抽屉。
抽屉里可能有好几张卡片。

所以 unordered 查找时。
不止会算哈希。
它还要用“相等比较”去确认。

这个“相等比较”。
在模板参数里有个名字：`key_equal`。
默认是 `std::equal_to<Key>`。
它最终会去用你的 `operator==`。

对内置类型和 `std::string`。
标准库已经给你好了。
但对你自己的 struct。
你得提供 `operator==`。

冲突多了。
桶里就得排队。
查找就从“像数组”变回“像链表”。

你也可以用一个小实验直观看到“排队”。

```cpp
#include <cstddef>
#include <string>
#include <unordered_map>

std::unordered_map<std::string, int> m;
m.reserve(8);

m.emplace("alice", 1);
m.emplace("bob", 2);
m.emplace("carol", 3);

std::size_t b = m.bucket("alice");
std::size_t n = m.bucket_size(b);
```

`bucket_size(b)` 就是这个桶里有几个人。
数变大。
你就可以理解为：开始排队了。

### 一个故意写烂的 hash：让它退化

你要是想直观看到“退化”。
可以写个坏哈希。

```cpp
#include <unordered_map>

struct BadHash {
    std::size_t operator()(int) const noexcept { return 0; }
};

std::unordered_map<int, int, BadHash> m;

for (int i = 0; i < 5; ++i) {
    m.emplace(i, i);
}
```

这个 `BadHash` 的意思是：
不管 key 是多少。
我都把你扔进同一个桶。

这当然是故意写烂。
但真实世界里。
如果你的数据分布很偏。
效果也可能差不多。

于是 `find` 只能在桶里一个个比。
你以为自己在用“平均 O(1)”。
实际上你在做“线性扫描”。

### 先上手：最常见的写法

```cpp
#include <string>
#include <unordered_map>

std::unordered_map<std::string, int> freq;

void on_click(const std::string& user) {
    ++freq[user];
}
```

写法跟 `map` 很像。
但背后的行为不一样。
它不是“沿着树往下走”，而是“先算哈希，再去对应的桶里找”。

### 一个小项目里最容易踩的坑：`const char*`

如果你还在 C 的世界里。
很可能手里拿着的是 `const char*`。

这时候你会自然地写出这种代码：

```cpp
#include <unordered_map>

std::unordered_map<const char*, int> m;
m["alice"] = 1;
```

它能编。
也能跑。

但它比较的是指针。
不是字符串内容。

你以为 key 是“alice”。
其实 key 是“那段内存的地址”。

所以在 unordered 容器里。
字符串 key 优先用 `std::string`。
别用裸指针当名字。

### 你需要记住的一个习惯：先问自己“我是在比较值，还是比较地址”

还有个细节你得知道。
`operator[]` 会在 key 不存在时，帮你插一个默认值。
这很方便，但也很容易把你带沟里。

```cpp
if (freq["alice"] > 0) {
    // ...
}
```

你只是想“查一下”。
但这行会悄悄把 `"alice"` 插进去。
如果你在热路径里到处这么写，容器会越长越快。

真要“查有没有”，用 `find` 更老实。

```cpp
auto it = freq.find("alice");
bool ok = (it != freq.end());
```

### unordered_set：当你只关心“有没有”

有些需求压根不需要 value。
比如你维护一份“封禁用户集合”。
来一个请求就问：在不在？

```cpp
#include <string>
#include <unordered_set>

std::unordered_set<std::string> banned;

bool is_banned(const std::string& user) {
    return banned.find(user) != banned.end();
}
```

`unordered_set` 里只有 key。
你拿它做“判重”“查黑名单”，很顺手。
它不关心顺序。
它就关心你找得快不快。

### 顺序这事：别依赖

unordered 的那个 `unordered` 不是装饰。
它是真的不保证遍历顺序。

你可能今天跑出来是这个顺序。
明天换个编译器。
甚至同一份程序你做了一次 `reserve`。
顺序就变了。

```cpp
#include <iostream>
#include <unordered_map>

std::unordered_map<int, int> m;
m.emplace(1, 1);
m.emplace(2, 2);
m.emplace(3, 3);

for (const auto& kv : m) {
    std::cout << kv.first << ' ';
}
```

这里的 `auto` 你可以先理解成：
让编译器帮你把类型写出来。

`kv` 就是一对东西。
`kv.first` 是 key。
`kv.second` 是 value。

### 你迟早会踩的坑：rehash

unordered 容器会自动扩容。
扩的不是元素数组，是“桶”的数量。
这一步叫 `rehash`。

rehash 有一次性的成本。

更关键的是。

它会让迭代器失效。

你可以用一段小代码感受下这种“失效”。

这里的迭代器（iterator）。
你先把它当成“指向元素的指针”就行。
失效的意思就是：
这个“指针”不再可靠。

为什么会这样？

因为 rehash 的本质是：
桶变了。
元素要重新分桶。

你原来抓住的那个位置。
可能已经被搬家了。

```cpp
#include <unordered_map>

std::unordered_map<int, int> m;

m.emplace(1, 1);
auto it = m.find(1);

for (int i = 2; i < 10000; ++i) {
    m.emplace(i, i);
}

int x = it->second;
```

这段代码看着没毛病。
`emplace` 你可以先理解成“插入一个元素”。
`find` 你可以先理解成“去找这个 key”。

但 `it` 可能已经不再指向那个元素了。
你得到的可能不是崩溃，而是更阴间的东西：偶尔对，偶尔错。

如果你大概知道元素数量，提前 `reserve` 很值。

```cpp
freq.reserve(100000);
```

它的意思是：我大概要装这么多元素。
桶别一边跑一边加。

### 负载因子：桶到底挤不挤

你会在资料里看到“负载因子”（load factor）。
别被名字吓到。
它就是一句话：

元素数量 / 桶数量。

这个比值越大。
说明桶越挤。
越挤，就越容易在桶里排队。

你可以把它当成“拥挤程度”。

还有个新手常见误会。
`reserve(n)` 不是“我要 n 个桶”。
它的意思更像“我要装得下 n 个元素”。
桶的数量由容器自己挑。

如果你真的想“直接改桶数量”。
你会看到另一个接口：`rehash(n)`。

```cpp
freq.rehash(1024);
```

你可以把它理解成：
我想要至少这么多桶。
别太挤。

```cpp
float lf = freq.load_factor();
freq.max_load_factor(0.7f);
```

`load_factor()` 是当前有多挤。
`max_load_factor()` 是你给它设的“别太挤”的阈值。
一旦超过，它就倾向于 rehash。

### “平均 O(1)”的那句平均，到底在平均什么

unordered 的快，靠的是分布。
分布靠的是哈希函数。
哈希写得差，很多 key 会挤到同一个桶里。

桶里就得线性找。
你以为自己拿到了 O(1)。
实际拿到的是 O(N)。

这也是为什么书上写的是“平均”。
不是“保证”。

平均是建立在哈希分布正常。
冲突不至于把你全挤到同一个桶。

如果分布很偏。
或者有人故意用一堆会冲突的 key 来打你。
你就会看到退化。
这也是一些服务端代码会对输入更谨慎的原因。

所以有自定义 key 时，你得给它一个靠谱的 hash。

```cpp
#include <cstddef>
#include <functional>
#include <unordered_map>

struct Key {
    int a;
    int b;

    bool operator==(const Key& other) const noexcept {
        return a == other.a && b == other.b;
    }
};

struct KeyHash {
    std::size_t operator()(const Key& k) const noexcept {
        return std::hash<int>{}(k.a) ^ (std::hash<int>{}(k.b) << 1);
    }
};

std::unordered_map<Key, int, KeyHash> m;
```

除了 hash。
你还得告诉它“两个 Key 怎么算相等”。
不然它没法判断你要找的到底是不是同一个东西。

别把 hash 写得太花。
但也别随便。
哈希写不好，你得到的不是 unordered。

你得到的是“随机性能”。

### 横向对比：map 和 unordered 到底差在哪

`map` 的底层是树。
它的特点是稳定。
你拿到的顺序是有序的。

代价也很清楚。
每次操作要走 `logN`。
而且每个节点要挂指针。

`unordered_map` 的底层更像“桶 + 节点”。
它不承诺顺序。
它承诺的是：分布好时查得快。

但它的代价不是写在复杂度里的。
它藏在数据分布里。
也藏在 rehash 里。

还有一个你很可能会忽略的差别。
unordered 为了“桶”。
通常会吃更多内存。
而且一旦 rehash。
迭代器可能就会失效。

所以你选型时可以这么想。

你需要排序。
需要范围查询（比如找一段区间）。
用 `map`。

你只关心“有没有”。
只关心“能不能很快找到”。
并且你能接受顺序乱。
用 unordered。

### 小洞见

unordered 不是 map 的升级版。

很多人把 `unordered_map` 当成“更快的 map”。
但它真正换掉的不是数据结构。
是你的需求。

你愿意放弃“顺序”。
换“查找更便宜”。

你需要有序遍历。
用 map。

你需要快速查找。
并且不关心顺序。
unordered 往往更合适。

你用对场景，它会很香。
你用错场景，它会让你以为自己写了快代码。

其实只是写了不稳定代码。

### 最后一句话

map 像一本字典。

你按拼音或者部首去翻。

稳定。

但每次都得翻几页。

unordered 更像你在食堂打饭。

它给你分了很多窗口。

你刷一下卡就去对应窗口拿。

窗口分得好，就很快。

窗口分得烂，大家挤一堆，你还是得排队。
