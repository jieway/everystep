---
title: 'cbegin/cend：把 const 这件事写得更明显'
description: 'C++14 的 std::cbegin/std::cend 让你更明确地拿到 const 迭代器，减少“我只是想读，结果不小心改了”的尴尬。'
---

很多 bug。

都不是恶意。

是手滑。

你只是想遍历。

结果顺手改了。

然后线上啪一下。

数据被污染。

你还要回滚。

### 当年没有 cbegin/cend 的时候

你要遍历容器。

一般写。

```cpp
#include <vector>

void f(std::vector<int>& v) {
    for (auto it = v.begin(); it != v.end(); ++it) {
        
    }
}
```

`v` 是非常量。

所以 `begin()` 给你的是可写迭代器。

你在循环里。

一旦写了 `*it = ...`。

它就真的改了。

很多时候。

这不是你想要的。

### 一个很具体的场景

你在写一个小统计。

遍历 vector。

算个 sum。

```cpp
#include <vector>

int sum(std::vector<int>& v) {
    int s = 0;
    for (auto it = v.begin(); it != v.end(); ++it) {
        s += *it;
    }
    return s;
}
```

这段没错。

但它的签名是 `std::vector<int>&`。

意味着。

调用者觉得你可能会改 `v`。

你也确实“有能力”改。

这会让 review 更难。

### C++14：std::cbegin/std::cend

你可以更明确地写。

```cpp
#include <iterator>

int sum(std::vector<int>& v) {
    int s = 0;
    for (auto it = std::cbegin(v); it != std::cend(v); ++it) {
        s += *it;
    }
    return s;
}
```

`cbegin` 的意思是。

我要一个 const iterator。

你在循环里。

就没法通过它去改元素。

这等于在代码里装了个护栏。

### 你可能会问：那我把参数改成 const 不就行了

对。

那是更根本的。

但工程里很多时候。

函数签名暂时改不了。

或者你拿到的是一个非 const 的容器引用。

但你只想读。

`cbegin/cend` 就很实用。

### 一句话的结论

const 不是束缚。

是把“不会改”变成可验证的承诺。

### 最后留个亮点

我很喜欢这种小 API。

它不改变你能做什么。

它只是逼你在读代码时。

少猜一点。

而少猜。

就是少 bug。
