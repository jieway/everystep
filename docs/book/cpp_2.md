# 第二章：开始学习C++

# 2.1 进入 C++

C++ 对大小写敏感，注意区分大小写。

```cpp
#include <iostream> // 预处理器编译指令
int main() {        // 函数头
    using namespace std; // 编译指令
    cout << "Come up and C++ me some time.";
    cout << endl;
    cout << "You won't regret it!" << endl;
    return 0; // 表示结束 main() 函数
}  // 函数体用 {} 括起来
```

如果运行时窗口自动关闭，可以在 return 之前添加 `cin.get();` 语句。

cin/cout 是 C++ 的输入输出工具。

