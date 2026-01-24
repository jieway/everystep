---
title: 'std::quoted：日志里那对引号，别再手写了'
description: 'C++14 的 std::quoted 用来安全地输出/读取带引号的字符串，适合写日志、生成配置，少踩转义坑。'
---

那会儿日志就是纯文本。

也没人会说什么“结构化”。

我们写日志。

就是往文件里塞一行文本。

然后靠 `grep`、`awk`、一点耐心。

把问题捞出来。

看起来粗糙。

但真能救命。

直到某一天。

你想把“用户输入”也写进去。

你以为这只是多拼一个字符串。

结果用户名字里有空格。

有引号。

还有反斜杠。

线上啪一下。

服务没挂。

日志解析挂了。

### 当年没有它的时候

当年大家的直觉都差不多。
字符串嘛，那我就用引号包起来。
只要输出长得像 `name="..."`，空格就不会把它拆开。

```cpp
#include <iostream>
#include <string>

void log_name(const std::string& name) {
    std::cout << "name=\"" << name << "\"\n";
}
```

这段代码看着挺无辜。
`std::cout << ...` 就是“往输出里写一段文本”。
我把值用 `"` 包住，看日志的人也舒服。

### 那些坑是怎么来的

坑不在“加引号”。
坑在于你一旦这么写，就等于偷偷发明了一条协议。
而协议里最难的，是转义规则。

你可以把“转义”理解成一件很土的事。
遇到特殊字符，就在它前面插一个“提醒符”。
告诉读的人：别当成分隔符，这是内容。

```cpp
std::string name = "he said \"hi\"";
log_name(name);
```

你本来想要的是一句人话。
结果写进日志之后，引号开始打架。
你的人类同事还能勉强看懂，但脚本只会一刀切。

### 当年大家怎么补锅

很多人的第一反应，就是自己写个 escape。

```cpp
#include <string>

std::string escape_for_log(const std::string& s) {
    std::string out;
    for (char c : s) {
        if (c == '"' || c == '\\') out.push_back('\\');
        out.push_back(c);
    }
    return out;
}
```

这段代码只做一件事。
把 `"` 和 `\\` 前面补一个 `\\`。
这样输出的时候，看起来就“稳”一点。

但你也同时立了个新规矩。
以后谁来读这份日志，必须跟你用同一套规矩。
否则还是会炸。

### 一个很具体的事故现场

我当年做过一个小服务，没什么高大上。
就是收个用户名，然后把它写进日志。

线上某天啪一下。
报警不是因为服务挂了，而是因为“日志解析”挂了。

```cpp
std::string line = "name=\"he said \\\"hi\\\"\"";
```

你看这行，人眼能猜出大概意思。
但写解析的人会开始怀疑人生。
因为下一步通常是：你要把它读回来。

比如这种最朴素的“读日志”。

```cpp
#include <sstream>
#include <string>

std::string take_next_token(const std::string& line) {
    std::istringstream is(line);
    std::string token;
    is >> token;
    return token;
}
```

这段代码的意思就是：按空格切。
它不懂你发明的那对引号。

更具体一点。
对 `std::string` 来说，`>>` 的默认规则就是：跳过前面的空白，然后一直读，读到下一个空白就停。

### 读回来更难

写日志只是一半。
另一半是你总有一天会说：我把它读回来复现问题。
这时候你才发现，你需要的是“可逆”的格式。

比如一个最小的配置格式。

一行一个 `key=value`。

```cpp
key="hello world"
```

值里有空格，你只好用引号。
然后你就会遇到。

```cpp
key="he said \"hi\""
```

这时候你会发现：你不是在写配置。
你是在发明一门小语言。
还得自己写转义，写错一次，两边永远对不上。

### C 时代其实就见过“转义”

如果你刚学完 C，你其实已经见过它了。
只不过你当年转义的是“代码里的字符串字面量”。

```c
printf("he said \"hi\"\n");
```

这里的 `\"` 是在告诉编译器：这不是字符串结束。
而是字符串内容里的一枚引号。

到了日志和配置这类“运行时文本”。
你需要做同一件事。
只是这次没有编译器帮你兜底。

### C++14：std::quoted

后来标准库给了一个很务实的东西。

`std::quoted`。

它在 `<iomanip>` 里。

跟 `std::setw`、`std::setprecision` 那些“格式工具”是同一类。

简单说，它不改你的字符串。
它只告诉 `<<` / `>>`：这一段字符串，按“带引号+转义”的规则来。

```cpp
#include <iomanip>
#include <iostream>
#include <string>

void log_name(const std::string& name) {
    std::cout << "name=" << std::quoted(name) << "\n";
}
```

你不再手写那对引号。

也不用自己记哪里该加反斜杠。

你甚至可以直接看它会输出成什么样。

```cpp
std::cout << std::quoted("he said \"hi\"") << "\n";
```

输出里会有一对引号。
里面的引号会被转义。

### 它的默认规矩

默认情况下。
它用双引号 `"` 当“外壳”。
用反斜杠 `\\` 当“提醒符”。

它会转义两类东西：引号本身，和反斜杠本身。

```cpp
std::cout << std::quoted("a\\b\"c") << "\n";
```

你可以把它当成一句话。
把“分隔符”和“转义符”从内容里拎出来。
让读的人知道边界在哪。

### 这东西怎么来的

这类“带引号的字符串 I/O”，并不是 C++14 才突然想到。
在标准化之前，Boost 里就有一个 `quoted` 操纵器。

它的目标很朴素。
让字符串能 round-trip：写进去什么，读出来还是同一个东西。

后来 C++14 把这个思路收进了标准库。
于是你现在看到的是 `std::quoted`。

我一直觉得这事儿很像一句老话。
“文本一旦要给机器读，你就在写协议。”

### 它也能读

更关键的是，它的读写规则是一套。
写出来什么，就能按同样的规则读回什么。

先看一个最小的 round-trip。

```cpp
#include <iomanip>
#include <sstream>
#include <string>

std::string round_trip(const std::string& s) {
    std::stringstream ss;
    ss << std::quoted(s);
    ss.seekg(0);
    std::string out;
    ss >> std::quoted(out);
    return out;
}
```

`std::stringstream` 你可以把它理解成“内存里的文件”。
你先往里写，再从里读。
同一套规则跑一遍，就知道会不会对得上。

`seekg(0)` 的意思是：把“读的位置”挪回开头。
不然你刚写完，读指针还在末尾。
读出来当然是空的。

```cpp
#include <iomanip>
#include <sstream>
#include <string>

std::string parse_value(const std::string& text) {
    std::istringstream is(text);
    std::string v;
    is >> std::quoted(v);
    return v;
}
```

`std::istringstream` 你可以把它理解成“拿字符串当输入”。
你给它一段带引号的文本，它就按同一套规则，还原成真正的字符串。

再回到那个 `key=value` 的小配置。

```cpp
#include <iomanip>
#include <sstream>
#include <string>

void parse_kv(const std::string& line, std::string& key, std::string& value) {
    std::istringstream is(line);
    std::getline(is, key, '=');
    is >> std::quoted(value);
}
```

`std::getline(..., '=')` 就是“读到等号为止”。
后半段交给 `std::quoted`。
这样读写两端的规则就对齐了。

### 还能自定义那对符号

有的文本喜欢用单引号。
或者你不想用反斜杠当转义符。

`std::quoted` 也支持。

```cpp
std::stringstream ss;
ss << std::quoted("it's \\\\ ok", '\'', '\\');

std::string s;
ss >> std::quoted(s, '\'', '\\');
```

这里的第二个参数是“引号用什么”。
第三个参数是“用什么做转义”。

读的时候也要用同样的两个参数。
不然你又在发明第二套协议了。

### 横向对比：别的世界怎么处理

你会发现。
大家都在解决同一个问题：文本需要分隔符，但内容里也会出现分隔符。

CSV 的做法很有意思。
它不喜欢反斜杠。
它喜欢“重复一份”。

```text
"he said ""hi"""
```

很多语言的字符串字面量，会更像 C。
还是用反斜杠。

```text
"he said \"hi\""
```

JSON 也差不多。
只是它的规则写成了规范。
所以你能放心交给各种库。

```text
{"name":"he said \"hi\""}
```

还有命令行里的引号。
有的 shell 里，单引号和双引号还不是一个意思。
你以为你只是把字符串包起来。
其实你是在告诉解析器：从这里到那里，都当成数据。

这些规则没有谁绝对更好。
关键是：你得选一套。
并且让写的人和读的人都同意。

### 它解决不了的坑

`std::quoted` 主要处理的是：分隔符和转义符本身。
如果你的字符串里有换行，那日志还是会变成多行。
这就不是它能单靠“加引号”解决的了。

### 一句话的结论

日志和配置最怕的。

是“看起来像字符串，其实没有统一规则”。

### 最后留个亮点

我一直觉得字符串有两层。

一层是“值”。

另一层是“表示法”。

当年我们掉坑里。

其实就是把这两层混在了一起。

`std::quoted` 做的事不伟大。

它只是把表示法这件事。

从你的手写习惯里。

拎出来。

变成了一条能对齐的规则。
