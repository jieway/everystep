Placement new 是 C++ 中的一个特殊功能，允许开发者在已经分配的内存位置上直接构造对象。这种技术特别适用于内存管理敏感的应用，如嵌入式系统、游戏开发、实时系统等，其中控制内存分配和避免额外的内存分配开销非常关键。

例如在日志模块中，通常需要使用单例模式来实现一个全局唯一的对象用来写入日志。而通过 Placement new 作为单例模式申请内存确保了被使用的内存不被释放掉，最终实现了生命周期和程序的整个生命周期等同。

### 使用场景

1. **自定义内存管理**：当需要在一个大的内存块中高效地管理小对象时，可以使用 placement new 在这块预先分配的内存中构造对象，这样可以避免多次调用 `new` 导致的内存碎片和分配开销。
2. **对象的重用**：在需要重用对象而不是频繁创建和销毁对象的场景中，可以使用 placement new 在同一内存位置上重新构造对象，以达到重用的目的。
3. **内存对齐要求**：对于需要特定内存对齐的对象，可以先分配一块满足对齐要求的内存，然后使用 placement new 在这块内存上构造对象。

### 示例

假设有一个简单的类 `Widget`，我们希望在一个预先分配的内存块上构造这个类的实例：

```cpp
#include <iostream>
#include <new> // 必须包含这个头文件

class Widget {
public:
    Widget() {
        std::cout << "Widget constructed\n";
    }
    ~Widget() {
        std::cout << "Widget destructed\n";
    }
    void display() const {
        std::cout << "Displaying Widget\n";
    }
};

int main() {
    // 分配足够的内存来存放一个Widget对象
    char buffer[sizeof(Widget)];

    // 在预先分配的内存上构造对象
    Widget* myWidget = new(buffer) Widget;

    // 使用对象
    myWidget->display();

    // 显式调用析构函数
    myWidget->~Widget();

    // 注意：不需要使用delete来释放内存，因为内存并不是通过new分配的
    // 如果需要，可以重用buffer来构造新的对象

    return 0;
}
```

在这个示例中，`buffer` 是一个足够大的字符数组，能够存放一个 `Widget` 类的实例。使用 placement new `new(buffer) Widget` 在 `buffer` 指向的内存位置上构造一个 `Widget` 对象。由于这块内存不是通过 `new` 分配的，所以不应该使用 `delete` 来释放它。当不再需要这个对象时，应该显式调用它的析构函数来清理资源。

这个技术允许开发者更精细地控制内存的使用，但也需要更谨慎地管理内存的分配和释放，以避免内存泄露或其它内存错误。
