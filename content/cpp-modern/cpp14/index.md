---
title: 'C++14 新特性'
description: '泛型 lambda、变量模板、二进制字面量等实用增强'
---

C++11 那一年。

大家忙着学新语法。

忙着把老项目拽到现代世界。

过了两年。

委员会干了一件很“工程”的事。

不推翻。

只修补。

把那些你每天都会用到的小痛点。

一个个抹平。

C++14 就是这么来的。

## 文章列表

[x] **[泛型 lambda](./cpp-generic-lambda)** — auto 参数让 lambda 更灵活

### 语言核心（不推翻，只打磨）

[x] **[初始化捕获（广义 lambda capture）](./cpp-init-capture)** — 把 move 塞进捕获列表

[x] **[返回类型推导（auto 返回）](./cpp-auto-return)** — 函数也能用 auto

[x] **[decltype(auto)](./cpp-decltype-auto)** — “按原样返回”引用和值类别

[x] **[放宽 constexpr（relaxed constexpr）](./cpp-relaxed-constexpr)** — constexpr 终于能写循环和局部变量

[x] **[变量模板](./cpp-variable-templates)** — 把“常量/配置”也做成模板

[x] **[ deprecated 属性](./cpp-deprecated-attribute)** — 标记过时的 API

[x] **[二进制字面量](./cpp-binary-literals)** — 0b1010 更直观

[x] **[数字分隔符](./cpp-digit-separators)** — 1'000'000 更易读

[x] **[sized deallocation（有大小的 delete）](./cpp-sized-deallocation)** — delete 也能知道对象多大

### 模板与类型系统（少写 ::type）

[x] **[type traits 的 `_t` 别名](./cpp-type-traits-t-alias)** — remove_reference_t / enable_if_t 这种

[x] **[std::integer_sequence / index_sequence](./cpp-integer-sequence)** — 编译期序列，展开参数包的“尺子”

### 标准库增强（工程里更常用）

[x] **[std::make_unique](./cpp-make-unique)** — 创建 unique_ptr 的正确姿势

[x] **[chrono 字面量](./cpp-chrono-literals)** — 100ms / 2s 写时间更像人话

[x] **[字符串字面量 "..."s](./cpp-string-literal-s)** — 让 string 不再到处写 std::string(...)

[x] **[std::exchange](./cpp-exchange)** — 交换并取旧值，一行写清状态迁移

[x] **[std::get<T>(tuple)](./cpp-get-by-type)** — 用类型取 tuple 元素

[x] **[std::quoted](./cpp-quoted)** — 打印带引号字符串，调试日志少踩坑

[x] **[std::shared_timed_mutex / shared_lock](./cpp-shared-timed-mutex)** — 读多写少的锁（读写锁）

[x] **[std::cbegin / std::cend](./cpp-cbegin-cend)** — 一眼看出“这是 const 迭代器”
