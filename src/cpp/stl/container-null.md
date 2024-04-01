# STL 判断长度空存在哪些坑？

在C++的标准模板库(STL)中，`empty()`和`size()`是容器的两个常用成员函数。`empty()`用于检查容器是否为空，而`size()`用于获取容器中元素的数量。

### 选择哪种方式判断容器为空？

可以通过 `if (c.size() == 0)` 或 `if (c.empty())` 来判断容器是否为空，那么应该使用哪一个呢？

虽然两个结果是一样的，但是应该优先使用`empty()`，因为 `empty()` 对于所有标准容器都是一个常数时间操作，但是对于一些list实现，`size()`需要线性时间。

这是因为，`empty()`只需要检查容器中是否有元素，这通常可以通过检查一两个内部指针或变量来实现，所以它的时间复杂度是O(1)。而`size()`需要返回容器中元素的准确数量，对于一些容器（如list），可能需要遍历整个容器来计数，所以它的时间复杂度可能是O(n)。

因此，当需要检查一个容器是否为空时，应该优先使用`empty()`，而不是`size() == 0`。这样可以确保代码在所有情况下都有最佳的性能。

### empty 是如何判空的？

`empty()`函数的实现取决于具体的容器类型。在大多数情况下，`empty()`函数只需要检查容器是否包含任何元素。这通常可以通过检查一两个内部指针或变量来实现。例如，对于`std::vector`或`std::deque`，`empty()`函数可能只需要检查开始和结束迭代器是否相等。

以下是`std::vector`中`empty()`函数的一个可能实现：

```cpp
template <class T, class Allocator = std::allocator<T>>
class vector {
public:
    // ...
    bool empty() const noexcept {
        return begin() == end();
    }
    // ...
};
```

在这个例子中，`begin()`和`end()`函数返回的是指向容器开始和结束的迭代器。如果这两个迭代器相等，那么容器就是空的。

对于`std::list`，`empty()`函数可能需要检查头节点是否为`nullptr`。以下是`std::list`中`empty()`函数的一个可能实现：

```cpp
template <class T, class Allocator = std::allocator<T>>
class list {
public:
    // ...
    bool empty() const noexcept {
        return head == nullptr;
    }
    // ...
private:
    Node* head;
};
```

在这个例子中，`head`是一个指向链表头节点的指针。如果`head`为`nullptr`，那么链表就是空的。

这些实现都能在常数时间内完成，因此`empty()`函数的时间复杂度是O(1)。

### 为什么 list 需要常数时间来计算 size ？

是 `splice()` 函数导致的，因为 `std::list` 是一个双向链表，它的`splice()`操作可以在常数时间内将元素从一个地方移动到另一个地方，而不需要复制任何数据。这是`std::list`的一个独特功能，也是许多开发者选择使用`std::list`的原因。

`std::list`的`splice`函数可以将一个列表中的元素移动到另一个列表中。以下是一个示例：

```cpp
#include <list>
#include <iostream>

int main() {
    std::list<int> list1 = {1, 2, 3, 4, 5};
    std::list<int> list2 = {6, 7, 8, 9, 10};

    // 打印list1和list2的初始状态
    // Initial state:
    // list1: 1 2 3 4 5 
    // list2: 6 7 8 9 10 
    std::cout << "Initial state:\n";
    std::cout << "list1: ";
    for (int n : list1) std::cout << n << ' ';
    std::cout << "\nlist2: ";
    for (int n : list2) std::cout << n << ' ';
    std::cout << '\n';

    // 使用splice将list2的元素移动到list1的末尾
    list1.splice(list1.end(), list2);

    // 打印list1和list2的最终状态
    // Final state:
    // list1: 1 2 3 4 5 6 7 8 9 10 
    // list2: 
    std::cout << "Final state:\n";
    std::cout << "list1: ";
    for (int n : list1) std::cout << n << ' ';
    std::cout << "\nlist2: ";
    for (int n : list2) std::cout << n << ' ';
    std::cout << '\n';

    return 0;
}
```

在这个示例中，我们首先创建了两个列表`list1`和`list2`。然后，我们使用`splice`函数将`list2`中的所有元素移动到`list1`的末尾。最后，我们打印出`list1`和`list2`的最终状态，可以看到`list2`现在是空的，而`list1`包含了所有的元素。

`std::list`的`size()`操作在某些实现中可能需要线性时间。这是因为，为了实现`splice()`操作的常数时间复杂度，`std::list`可能需要在每次插入或删除元素时更新其元素计数器。但是，`splice()`操作可能会移动任意数量的元素，而在不遍历这些元素的情况下，无法知道移动了多少元素。因此，如果`splice()`需要更新元素计数器，那么它就不能在常数时间内完成。

这就导致了一个困境：`size()`和`splice()`不能同时在常数时间内完成。如果`size()`是常数时间操作，那么`splice()`就需要线性时间；如果`splice()`是常数时间操作，那么`size()`就需要线性时间。

不同的`std::list`实现可能会以不同的方式解决这个问题，取决于它们更重视`size()`的效率还是`splice()`的效率。如果你正在使用的`std::list`实现优先考虑了`splice()`的效率，那么你应该使用`empty()`来检查容器是否为空，而不是`size() == 0`，因为`empty()`总是常数时间操作。

### 总结

这篇文章主要讨论了C++标准模板库(STL)中`empty()`和`size()`函数的使用和性能问题。`empty()`函数用于检查容器是否为空，通常可以在常数时间内完成，因为它只需要检查容器中是否有元素。而`size()`函数用于获取容器中元素的数量，对于一些容器（如`std::list`），可能需要遍历整个容器来计数，所以它的时间复杂度可能是O(n)。这是因为`std::list`的`splice()`操作需要在常数时间内完成，可能需要在每次插入或删除元素时更新其元素计数器。因此，当需要检查一个容器是否为空时，应该优先使用`empty()`，而不是`size() == 0`。

### 参考

1. 《Effective STL》
2. 《STL 源码剖析》