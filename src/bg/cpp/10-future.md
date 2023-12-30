# std::async

`std::async` 是 C++11 引入的一个函数，用于简化异步编程。使用 `std::async` 可以轻松地在新线程中执行函数或者任务，并返回一个 `std::future` 对象，该对象可用于稍后获取函数的返回值或捕获异常。

### 基本用法

`std::async` 的基本用法是传递一个函数和其参数，`std::async` 会启动一个新线程（或者在某些情况下延迟执行），并立即返回一个 `std::future` 对象。

### 示例

假设我们有一个耗时的计算函数，我们想要异步执行它：

```cpp
#include <iostream>
#include <future>
#include <thread>

// 一个模拟的耗时计算函数
int longComputation(int x) {
    std::this_thread::sleep_for(std::chrono::seconds(2)); // 模拟耗时操作
    return x * x;
}

int main() {
    // 使用 std::async 异步执行 longComputation
    std::future<int> result = std::async(longComputation, 4);

    std::cout << "主线程继续执行其他任务。\n";

    // 获取异步操作的结果
    int value = result.get(); // 这将阻塞，直到异步操作完成

    std::cout << "异步计算的结果: " << value << std::endl;

    return 0;
}
```

在这个例子中：

- `longComputation` 函数模拟了一个耗时的计算任务。
- 我们使用 `std::async(longComputation, 4)` 来异步执行 `longComputation` 函数，其中 `4` 是传递给这个函数的参数。
- `std::async` 返回一个 `std::future<int>` 对象，它将在未来持有函数的返回值。
- 在等待异步计算结果的同时，主线程可以继续执行其他任务。
- 调用 `result.get()` 会阻塞主线程，直到异步操作完成，并返回计算的结果。

### 注意事项

- 使用 `std::async` 时，它返回的 `std::future` 对象必须被保存。如果忽略返回的 `std::future` 对象，异步操作会同步执行（即它会阻塞直到任务完成）。
- `std::async` 可能会立即启动一个新线程，也可能延迟执行，这取决于实现和系统资源。
- `get()` 方法只能调用一次，因为它会移动异步操作的结果。如果需要多次访问结果，可以先将结果存储在一个变量中。
- 在 `std::future` 对象被销毁之前，如果它持有的异步操作还没有完成，它的析构函数会阻塞等待操作完成。这是为了确保所有线程能够安全退出。


