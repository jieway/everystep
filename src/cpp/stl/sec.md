在C++标准模板库（STL）中，没有容器是内置线程安全的。这意味着在标准的STL容器中，没有一个是保证在多线程环境下不出现数据竞争的。如果你需要在多线程环境中使用STL容器，必须自行管理对容器的访问，通常通过互斥锁（如 `std::mutex`）或其他同步机制来实现。

STL容器包括：

- 序列容器：如 `std::vector`, `std::list`, `std::deque`
- 关联容器：如 `std::set`, `std::map`, `std::multiset`, `std::multimap`
- 无序关联容器：如 `std::unordered_set`, `std::unordered_map`, `std::unordered_multiset`, `std::unordered_multimap`
- 容器适配器：如 `std::stack`, `std::queue`, `std::priority_queue`

所有这些容器在默认情况下都不是线程安全的。

### 为什么STL容器不是线程安全的？

设计STL时，考虑到性能和灵活性，决定不将线程安全作为容器的一个内置特性。这样做的原因是：

1. **性能考虑**：线程安全通常需要同步机制，如锁，这会降低性能。不是所有使用STL容器的程序都在多线程环境中运行，因此默认添加线程安全会使那些单线程应用程序承担不必要的性能开销。

2. **灵活性**：不同的应用程序可能需要不同的线程同步策略。通过不在STL容器中内置线程安全，开发者可以根据自己的需求选择最适合的同步机制。

### 如何安全地在多线程中使用STL容器？

要在多线程环境中安全地使用STL容器，你需要自行管理容器的线程安全。常见的方法是使用互斥锁（如 `std::mutex`）来保护容器的访问。这样，每次访问或修改容器时，线程都会首先尝试获取锁，确保在该时间点没有其他线程在操作同一个容器。

下面是一个简单的例子，展示如何使用互斥锁来同步对 `std::vector` 的访问：

```cpp
#include <iostream>
#include <vector>
#include <mutex>
#include <thread>

std::vector<int> vec;
std::mutex vec_mutex;

void add_to_vector(int value) {
    std::lock_guard<std::mutex> lock(vec_mutex);
    vec.push_back(value);
}

void print_vector() {
    std::lock_guard<std::mutex> lock(vec_mutex);
    for (int value : vec) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
}

int main() {
    std::thread t1(add_to_vector, 1);
    std::thread t2(add_to_vector, 2);

    t1.join();
    t2.join();

    print_vector();

    return 0;
}
```

在这个例子中，我们使用了 `std::mutex`（互斥锁）来同步对 `std::vector` 的访问。每当一个线程想要修改或访问 `vector`，它都会首先获取互斥锁，这可以防止其他线程同时修改或访问 `vector`，从而保证了线程安全。

然而，需要注意的是，这种方式会导致性能降低，因为线程在等待锁的时候会被阻塞。在设计多线程应用程序时，应当仔细考虑数据的同步和线程间通信的最佳实践。

### 替代方案

如果你需要线程安全的容器，可以考虑以下替代方案：

- 使用并发库提供的线程安全容器，例如 Intel Threading Building Blocks (TBB) 提供的并发容器。
- 实现自己的线程安全容器，根据应用程序的具体需求定制同步策略。

总的来说，STL容器本身不是线程安全的，使用它们时需要考虑适当的同步策略。
