# Slice 改造

担心改造后看不出问题，先加强一下 [slice 测试](https://github.com/weijiew/solardb/commit/f4eccec7499ec498bcc1977adbbadc049742c29b#diff-608d8de3fba954c50110b6d7386988f27295de845e9d7174e40095ba5efcf1bb)

## 1. 空指针使用 nullptr

将空指针 `""` 替换为 `nullptr`，以更好地表示空指针。

```cpp
// Slice() : data_(""), size_(0) {}
Slice() : data_(nullptr), size_(0) {
}
```

空指针常量 `nullptr` 是由 C++11 引入的新特性。在 C++11 标准中，引入了 `nullptr` 以用于表示空指针，以替代之前使用的 `NULL`
或 `0`。

使用 `nullptr` 的主要目的是提高代码的可读性和安全性。`nullptr` 具有明确的类型，并且不会隐式地转换为其他类型，这有助于减少一些与空指针相关的编程错误。

在代码中，将 `""` 替换为 `nullptr` 是一种良好的实践，因为 `nullptr` 更直观地表示一个空指针，而 `""`
表示的是一个空字符串的字符数组指针。这种改变使得代码更加清晰，也更符合现代 C++ 的编程风格。

### 1.1 为什么要用 nullptr ？

`nullptr` 是 C++11 引入的空指针常量，相较于之前使用的 `NULL` 或 `0`，`nullptr`
具有一些优势，主要体现在类型安全和代码清晰度方面。以下是一些使用 `nullptr` 的例子，以说明其优势：

1. **类型安全：**

```cpp
void foo(int* ptr) {
   // ...
}

int main() {
   foo(0);    // 可能导致不明确的调用
   foo(NULL); // 同样可能导致不明确的调用

   foo(nullptr); // 明确传递空指针，类型安全
   return 0;
}
```

使用 `nullptr` 可以避免在传递空指针时引起的不明确调用，因为 `nullptr` 是一个明确的空指针常量，而不是整数类型。

2. **重载决议：**

```cpp
void foo(int);
void foo(char*);

int main() {
   foo(0);    // 不明确的调用，可能调用 foo(int)
   foo(NULL); // 同样不明确的调用，可能调用 foo(int)

   foo(nullptr); // 调用 foo(char*), 明确指定了指针类型
   return 0;
}
```

总体而言，`nullptr` 提供了更明确、更类型安全的空指针表示方式，有助于避免一些潜在的编程错误。

## 2. 修正 clear

- **删除 `clear` 函数：**

删除 `clear` 函数中的 `data_ = "";`，因为它不会将 `data_` 指向空数组，而是将 `data_` 指向字符串字面量，这可能导致问题。

```cpp
void clear() {
   data_ = nullptr;
   size_ = 0;
}
```

### 2.1. 为什么喜欢用 char* data_ = "" 来置空？

将 `char* data_ = ""`
用于表示空字符串，通常是为了避免在处理字符串时出现空指针异常，这是一种常见的做法。

在这种情况下，`data_` 实际上指向了一个包含空字符 `'\0'` 的静态字符数组，即一个空字符串。这样做的目的是为了确保 `data_`
指针永远不会为 `nullptr`，从而避免了潜在的空指针异常。

例如：

```cpp
char* data_ = "";  // data_ 指向空字符串，而不是空指针
```

这样，当访问 `data_`
时，即使它指向空字符串，也不会触发空指针异常。在某些情况下，这可以简化代码，使其更加健壮，因为你不需要在使用 `data_`
之前进行空指针检查。

然而，这种用法也有一些潜在的问题。如果在代码的其他地方试图修改 `data_`
指向的空字符串，那么将会导致未定义的行为。此外，这样的做法可能使代码不够清晰，因为它违反了将空指针表示为空的一般约定。

相较于 `char* data_ = "";`，使用 `nullptr` 具有以下优势：

1. **类型安全：** `nullptr` 是空指针的类型，它没有特定的类型，可以用于所有指针类型，而 `""` 是一个指向 `const char` 的指针。

2. **清晰性：** `nullptr` 更清晰地表示空指针的概念，而 `char* data_ = "";` 可能误导其他开发者，因为它看起来好像 `data_`
   指向了一个空字符串。

3. **规避潜在问题：** 使用 `nullptr` 可以避免在代码的其他地方试图修改指向空字符串的尝试，因为 `nullptr` 不允许进行类似的操作。

因此，推荐使用 `nullptr` 来表示空指针，以提高代码的类型安全性和可读性。

## 3. 默认成员初始化

使用默认成员初始化来初始化成员变量，这是 C++11 引入的特性，可以提高代码的可读性和简洁性。

原始代码里面就是这样写的，不用修改，这里简单提一下。

```cpp
Slice(const char* d, size_t n) : data_(d), size_(n) {}
```

## 4. noexcept

以下是一些将 C++11 到 C++23 之间的新特性应用于上述代码的建议：

* 使用 **noexcept** 修饰符来表示函数不会抛出异常。例如，`const char* data() const { return data_; }`
  可以修改为 `const char* data() const noexcept { return data_; }`。

* 使用 **range-based for** 循环来遍历字符串。例如，`for (size_t i = 0; i < size_; ++i) { char c = operator[](i); }`
  可以修改为 `for (char c : *this) { /*...*/ }`。

* 使用 **std::string_view** 类来表示字符串视图。例如，`std::string ToString() const { return std::string(data_, size_); }`
  可以修改为 `std::string_view ToString() const { return std::string_view(data_, size_); }`。

* 使用 **std::span<const char_t>**
  类来表示字符范围。例如，`bool starts_with(const Slice& x) const { return ((size_ >= x.size_) && (memcmp(data_, x.data_, x.size_) == 0)); }`
  可以修改为 `bool starts_with(const Slice& x) const { return starts_with(std::span<const char_t>(data_, size_), std::span<const char_t>(x.data_, x.size_)); }`。

  这些修改可以使代码更加简洁、安全和易读。
   
   
   