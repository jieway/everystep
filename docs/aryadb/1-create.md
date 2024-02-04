# Hello World

这一节主要描述如何创建 C++ 项目，引入 Cmake、Google Test 等知识。

## C++23 环境配置

使用 Ubuntu 20.04 作为开发环境，Windows 上推荐使用 WSL 。

在 ubuntu 20.04 上默认 GCC 版本比较低，需要升级到 GCC 11 ，这个版本的 GCC 支持 C++23 。

```sh
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install gcc-11
```

## 1. 创建项目

```shell
$ mkdir aryadb && cd aryadb
```

创建 main.cpp 并输入下面的内容

```cpp
#include <iostream>

int main()
{
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

创建 CMakeLists.txt 并输入下面的内容：

```cmake
cmake_minimum_required(VERSION 3.27)
project(aryadb)

set(CMAKE_CXX_STANDARD 23)

add_executable(aryadb main.cpp)
```

这段代码是一个 CMake 配置文件的一部分，用于设置和构建名为 "aryadb" 的项目。以下是对其主要内容的简要总结：

1. **指定 CMake 最低版本**：`cmake_minimum_required(VERSION 3.27)` 指定了构建此项目所需的最低 CMake 版本为 3.27。

2. **项目名称**：`project(aryadb)` 设置了项目的名称为 "aryadb"。

3. **设置 C++ 标准**：`set(CMAKE_CXX_STANDARD 23)` 指定了项目使用的 C++ 标准为 C++23。

4. **添加可执行文件**：`add_executable(aryadb main.cpp)` 指示 CMake 为项目创建一个名为 "aryadb" 的可执行文件，源文件是 "main.cpp"。

总的来说，这段 CMake 配置文件为名为 "aryadb" 的项目设置了基本的构建参数，包括 CMake 的最低版本要求、项目名称、使用的 C++ 标准以及主要的源文件。

在整个 `CMakeLists.txt` 文件中，定义了项目的基本属性和构建规则。CMake 是一个构建系统生成器，根据 `CMakeLists.txt` 文件中的指令，生成适用于编译器的实际构建文件（如 Makefile 或项目文件）。这样可以在多种不同的系统和环境中以一致的方式构建您的项目。

## 2. 执行

接下来创建 build 编译并运行代码。

```shell
mkdir -p build && cd build
cmake .. && make -j $(nproc)
./aryadb
```

1. `mkdir -p build && cd build`

   - `mkdir -p build`: 这个命令创建一个名为 `build` 的新目录。如果这个目录已经存在，`-p`（代表“父级”）参数确保命令不会失败。这通常用于创建一个用于存放构建输出的目录，以保持项目根目录的整洁。
   - `&&`: 这是一个命令连接符，它确保只有在左侧的命令（`mkdir -p build`）成功执行后，才会执行右侧的命令（`cd build`）。
   - `cd build`: 这个命令切换当前目录到刚刚创建的 `build` 目录中。

2. `cmake .. && make -j $(nproc)`

   - `cmake ..`: 这个命令运行 CMake，指导它配置项目。`..` 是一个相对路径，指向当前目录的上一级目录，也就是您的项目根目录（这里假设您的 `CMakeLists.txt` 文件在那里）。CMake 会读取 `CMakeLists.txt` 文件，并生成相应的构建系统文件（如 Makefile）。
   - `make -j $(nproc)`: 这个命令实际上开始构建过程。
     - `make` 是一个构建工具，用于实际编译代码和链接二进制文件。
     - `-j $(nproc)` 是一个加速编译过程的技巧。`-j` 参数允许 `make` 并行执行多个任务，而 `$(nproc)` 会被替换为当前系统可用的处理器核心数，从而使构建过程尽可能快地运行。

3. `./aryadb`
   - 这个命令运行编译后生成的可执行文件 `aryadb`。`./` 指示终端在当前目录下查找名为 `aryadb` 的可执行文件并运行它。

综上所述，这些命令组合用于创建一个构建目录，使用 CMake 配置项目，编译项目，并最终运行编译后的程序。这是 C++ 项目通常的构建和运行流程。

## 3. Google Test

接下来引入 Google Test 。Google Test 是一个由 Google 开发的 C++ 测试框架，专门用于编写单元测试。它提供了丰富的特性和工具，以支持开发者编写有效的单元测试。

要以 Git 子模块（Git Submodule）的方式引入 Google Test（gtest）到项目中，需要执行以下步骤：

1. **初始化 Git 子模块**：
   在您的 Git 项目根目录下，运行以下命令来初始化子模块系统。这一步只需要执行一次。

   ```bash
   git submodule init
   ```

2. **添加 gtest 作为子模块**：
   添加 Google Test 仓库作为子模块到您的项目中。您可以将子模块放置在您希望的任何目录下，这里以 `third_party/googletest` 为例。

   ```bash
   git submodule add https://github.com/google/googletest.git third_party/googletest
   ```

3. **更新子模块**：
   更新子模块，以确保您的项目包含了 Google Test 的最新代码。

   ```bash
   git submodule update --init --recursive
   ```

4. **集成到构建系统中**：
   根据项目的构建系统，需要在构建脚本中添加对 Google Test 子模块的引用。以 CMake 为例，可以在 CMakeLists.txt 中添加类似以下内容：

   ```cmake
    enable_testing()
    add_subdirectory("third_party/googletest")

    add_executable(
        g_test
        g_test.cc
    )

    target_link_libraries(
        g_test
        GTest::gtest_main
    )

    include(GoogleTest)
    gtest_discover_tests(g_test)
   ```

5. **创建 `g_test.cc` 文件并输入下述内容，用于验证 gtest 能否正常使用。**

   ```cpp
   #include "gtest/gtest.h"

   TEST(HelloTest, BasicAssertions) {
       EXPECT_STRNE("hello", "world");
       EXPECT_EQ(7 * 6, 42);
   }
   ```

6. **验证是否成功**

   ```
   cd build && cmake .. && make -j $(nproc) && ./g_test
   ...
   [==========] Running 1 test from 1 test suite.
   [----------] Global test environment set-up.
   [----------] 1 test from HelloTest
   [ RUN      ] HelloTest.BasicAssertions
   [       OK ] HelloTest.BasicAssertions (0 ms)
   [----------] 1 test from HelloTest (0 ms total)

   [----------] Global test environment tear-down
   [==========] 1 test from 1 test suite ran. (0 ms total)
   [  PASSED  ] 1 test.
   ```

这些步骤将 Google Test 作为一个子模块添加到 Gitsbs 项目中，使得可以方便地共享和更新测试框架。使用子模块还有助于保持项目的整洁和组织，同时确保依赖项的版本一致性。

## 4. 使用 Leveldb

1. 下载并运行代码

```bash
git clone --recurse-submodules https://github.com/google/leveldb.git
cd leveldb && mkdir -p build && cd build
cmake -DCMAKE_BUILD_TYPE=Release .. && cmake --build . -j $(nproc)
```

2. 创建文件 `app/main_test.cc` 并输入下面的内容来使用 Leveldb 。

```cpp
#include <iostream>
#include <cassert>
#include "leveldb/db.h"

int main() {
    leveldb::DB* db;
    leveldb::Options options;
    options.create_if_missing = true;
    leveldb::Status status = leveldb::DB::Open(options, "/tmp/testdb", &db);
    assert(status.ok());

	status = db->Put(leveldb::WriteOptions(), "name", "test");
    assert(status.ok());

    std::string val;
    status = db->Get(leveldb::ReadOptions(), "name", &val);
    assert(status.ok());
    std::cout << val << std::endl;    
}
```

在 CMakeLists.txt 中添加 `leveldb_test("app/main_test.cc")` 随后使用`cmake --build . -j8 &&  ./main_test` 编译并运行。

上面代码是一个简单实用 leveldb 插入删除的例子。
