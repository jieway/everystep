# std::future

`std::future` 是 C++11 引入的一个标准库组件，用于获取异步操作的结果。当你启动一个异步任务（比如通过 `std::async`、`std::packaged_task` 或 `std::promise`），它通常会返回一个 `std::future` 对象。这个对象在未来某个时间点提供对异步操作结果的访问。

### 如何使用 `std::future`

以下是一个使用 `std::future` 来获取异步操作结果的例子：

```cpp
#include <iostream>
#include <future>
#include <thread>

int performComputation(int x) {
    // 模拟耗时操作
    std::this_thread::sleep_for(std::chrono::seconds(2));
    return x * x;
}

int main() {
    // 启动异步任务
    std::future<int> result = std::async(performComputation, 4);

    // 在这里可以做其他事情...

    // 获取异步操作的结果
    int value = result.get(); // 阻塞直到异步操作完成

    std::cout << "Computed value: " << value << std::endl;

    return 0;
}
```

在这个例子中，`performComputation` 函数模拟了一个耗时操作。我们通过 `std::async` 异步地调用这个函数，并立即获得一个 `std::future` 对象。这个对象稍后将用于获取函数的返回值。

调用 `result.get()` 会阻塞当前线程，直到异步操作完成并返回结果。在等待结果的同时，主线程可以继续执行其他任务。

### `std::future` 的特点

- **获取结果**：使用 `get()` 方法可以获取异步操作的结果。注意，`get()` 只能调用一次，因为它会移动异步操作的结果。
- **等待结果**：如果你只想等待异步操作完成，但不立即需要结果，可以使用 `wait()` 方法。
- **状态查询**：可以使用 `valid()` 方法来检查 `future` 是否有有效的异步操作结果与之关联。

### 异常处理

如果异步操作抛出异常，这个异常不会在操作的线程中被捕获，而是会被存储起来。当你调用 `get()` 方法时，异常会被重新抛出。

### 注意

- 在调用 `get()` 之前，如果所关联的异步操作还没有完成，主线程会阻塞等待。
- `std::future` 不能被复制，只能被移动。这意味着它只能关联到一个特定的异步操作。

通过 `std::future`，C++ 为开发者提供了一个强大的工具，以简洁的方式处理异步编程的复杂性。


## 在 std::future 出现之前是怎么实现异步的？

在 `std::future` 和相关的 C++11 并发特性出现之前，实现真正的异步操作通常需要依赖于操作系统提供的线程功能，以及一些辅助的同步机制。这些方法比较底层，通常包括手动管理线程、使用回调函数、事件循环等。以下是几种在 `std::future` 出现之前实现异步操作的常用方法：

### 1. 使用线程

手动创建线程（如使用 POSIX 线程库 pthreads 或 Windows 线程）来执行异步操作。这些线程可以直接操作共享数据（使用互斥锁等机制进行保护）或通过线程间通信机制（如消息队列）交换数据。

```cpp
#include <pthread.h>
#include <iostream>

void* performComputation(void* arg) {
    int x = *reinterpret_cast<int*>(arg);
    // 执行一些操作
    int result = x * x;
    // 可以将结果存储在共享内存或发送到某个消息队列
    // ...
    return nullptr;
}

int main() {
    pthread_t thread;
    int x = 4;
    pthread_create(&thread, nullptr, &performComputation, &x);

    // 继续执行其他任务...

    pthread_join(thread, nullptr); // 如果需要等待线程结束
    // 获取结果...
    
    return 0;
}
```

### 2. 使用回调函数

使用回调函数是异步编程中的一种常用技术。可以在异步操作完成时调用回调函数来处理结果。

```cpp
void performComputationAsync(int x, void(*callback)(int)) {
    // 在新线程中运行
    std::thread([x, callback]() {
        int result = x * x;
        callback(result);
    }).detach(); // 分离线程
}

void resultHandler(int result) {
    std::cout << "Computed value: " << result << std::endl;
}

int main() {
    performComputationAsync(4, resultHandler);

    // 继续执行其他任务...
}
```

### 3. 使用事件循环和异步 I/O

在某些框架和库中，特别是 GUI 应用程序和网络编程中，经常使用事件循环和异步 I/O。这些机制允许程序在等待输入/输出操作完成时继续执行其他任务，而不是阻塞。

### 总结

在 `std::future` 和 C++11 并发特性之前，异步编程通常需要更多的样板代码和手动管理。这些方法虽然有效，但通常更复杂，容易出错。C++11 的并发特性为异步编程提供了更高级的抽象和更安全、更简洁的接口。