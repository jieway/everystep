# CMake 拆分

随着项目文件的增加，用一个 CMake 看起来比较繁琐，趁着现在项目还不大将接下来打算将 CMake 拆分为多个，即一个文件夹一个。

拆分 CMake 配置为每个文件夹一个文件的主要优势是提高了项目的组织性和模块化，使得维护大型项目更容易。这样做可以让不同的部分或组件独立管理，有助于团队协作和代码重用。然而，这也可能使项目结构更加复杂，对于新成员来说学习曲线可能更陡峭，且在管理多个文件时可能需要更多的努力。

总的来说，如果你的项目比较大，分成多个模块或团队较大，那么拆分 CMake 文件可能是个不错的选择。但如果项目相对较小，单个 CMake 文件可能更简单、更易于管理。选择哪种方式主要取决于你的项目需求和团队的工作方式。


## 1. 目录结构

下面内容是当前的目录树：

```txt
.
├── CMakeLists.txt
├── README.md
├── build.sh
├── include
│   └── aryadb
│       ├── slice.h
│       └── status.h
├── main.cpp
├── test
│   ├── arean_test.cc
│   ├── slice_test.cc
│   └── status_test.cc
├── third_party
│   ├── benchmark
│   └── googletest
└── util
    ├── arean.cc
    ├── arean.h
    ├── random.h
    └── status.cc
```


## 2. CMake 拆分

要将 CMake 配置拆分为每个文件一个 CMakeLists.txt，您可以按照以下步骤操作：

1. **创建顶层 CMakeLists.txt 文件**：
   - 在项目根目录下的 `CMakeLists.txt` 文件中，只保留通用配置和子目录的添加。
   - 例如，对于顶层的 CMakeLists.txt：

    ```cmake
    cmake_minimum_required(VERSION 3.27)
    project(aryadb)

    # Set the C++ standard to C++23
    set(CMAKE_CXX_STANDARD 23)

    # Include directories
    include_directories(include)

    # Add subdirectories
    add_subdirectory(util)
    add_subdirectory(test)
    add_subdirectory(third_party)

    # Main executable
    add_executable(aryadb main.cpp)
    target_link_libraries(aryadb util)
    ```

2. **在每个子目录中创建 CMakeLists.txt 文件**：
   - 对于每个子目录（如 `util`, `test`, `third_party`），创建一个 CMakeLists.txt 文件，并在其中处理该目录相关的配置。

   - 在 `util` 目录下的 CMakeLists.txt：

    ```cmake
    add_library(util
            arean.cc
            status.cc
            arean.h
            random.h
    )

    target_include_directories(util PUBLIC
            ${CMAKE_CURRENT_SOURCE_DIR}
    )
    ```

   - 对于 `test` 目录，创建一个类似的 CMakeLists.txt，包含测试相关的配置。

    ```cmake
    enable_testing()

    # Test executable
    add_executable(public_tests arean_test.cc slice_test.cc status_test.cc)
    target_link_libraries(public_tests GTest::gtest_main util)

    # Include Google Test utilities
    include(GoogleTest)

    # Auto-discover tests
    gtest_discover_tests(public_tests)
    ```

3. **处理第三方依赖**：
   - 在 `third_party` 目录下的 CMakeLists.txt 中，处理所有第三方依赖（如 Google Test）的配置。

     ```cmake
     # Add Google Test
     add_subdirectory(googletest)
     ```

这种方法的优点是提高了项目的模块化和可维护性。每个目录都有自己的构建逻辑，使得管理大型项目更加清晰。然而，这也可能增加了一些复杂性，尤其是对于新加入项目的开发者，他们需要理解多个 CMake 文件是如何协同工作的。在选择这种方法时，确保这样的模块化是项目所需，且团队成员都能够适应这种组织方式。

下面详细解释上面用到的指令含义，如果对 CMake 比较熟悉可以直接跳过。


## 3. CMake 指令总结

- include_directories

`include_directories` 是一个 CMake 指令，用于告诉编译器在编译项目时，在哪些目录下查找头文件。它为整个项目的所有编译目标（如可执行文件和库）设置包含路径。简单来说，它就是在告诉编译器：“在这些文件夹里找我项目需要的头文件”。

- add_subdirectory

`add_subdirectory` 是 CMake 中的一个命令，用于将指定的子目录添加到构建过程中。这个命令会让 CMake 查找并处理子目录中的 `CMakeLists.txt` 文件，从而使该子目录成为整个项目构建过程的一部分。简而言之，`add_subdirectory` 用于组织和管理大型项目中的多个组件，使你能够在各自的子目录中独立地处理这些组件的构建设置。

- add_executable

`add_executable` 是 CMake 中的一个命令，用于从指定的源文件创建一个可执行文件。当你在 `CMakeLists.txt` 文件中使用这个命令时，你需要提供可执行文件的名称以及构成这个可执行文件的源代码文件列表。这个命令会告诉 CMake 如何编译和链接这些源文件来生成可执行文件。简单来说，`add_executable` 就是在告诉 CMake：“用这些源文件来创建一个可运行的程序”。

- target_link_libraries

`target_link_libraries` 是 CMake 中的一个命令，用于指定要将哪些库链接到特定的目标（通常是可执行文件或其他库）。在 `CMakeLists.txt` 文件中使用这个命令时，你首先指定目标名称，然后列出要链接的库。

这个命令告诉 CMake 在编译阶段之后，链接阶段应该将哪些预编译的库文件（`.lib`, `.a` 等）与你的目标（可执行文件或库）链接在一起。这对于使用外部库或将多个项目模块组合成一个可执行文件非常重要。

简单来说，`target_link_libraries` 就是在告诉 CMake：“在构建这个程序或库时，确保它与这些特定的库文件链接起来。”


- enable_testing

`enable_testing` 是 CMake 中的一个命令，它启用和设置项目的测试功能。当你在项目的 `CMakeLists.txt` 文件中使用这个命令时，它会告诉 CMake 开始支持测试，允许你使用如 `add_test` 命令来定义测试用例。

简单来说，使用 `enable_testing` 就是在告诉 CMake：“我在这个项目中有测试，我想要构建和运行这些测试。” 这对于任何希望包含自动测试（比如单元测试）的项目来说都是非常重要的一步。

- include

在 CMake 中，`include` 是一个命令，用于引入并运行其他的 CMake 脚本文件或模块。这个命令会载入指定的 CMake 文件，并执行其中的命令，就好像这些命令是直接写在原始 `CMakeLists.txt` 文件中一样。

使用 `include` 命令，你可以：
- 引入项目外的 CMake 脚本，这些脚本可能定义了额外的函数或宏，用于辅助构建过程。
- 使用 CMake 提供的模块，这些模块可以帮助找到库、设置选项等。

简单来说，`include` 命令就像是在告诉 CMake：“读取并运行这个额外的 CMake 脚本或模块，就像它是这个 `CMakeLists.txt` 文件的一部分一样。”

- gtest_discover_tests

`gtest_discover_tests` 是 CMake 中与 Google Test 集成时使用的一个命令，用于自动发现和注册 Google Test 框架中定义的测试。当你在使用 Google Test 编写单元测试时，这个命令会扫描指定的测试可执行文件，识别其中的所有测试用例，并自动将它们添加到 CMake 测试仪表板中。

使用 `gtest_discover_tests` 后，你不需要手动列出每一个测试用例。这个命令会处理测试的发现和注册，使得新增或删除测试用例变得更加容易和自动化。

简而言之，`gtest_discover_tests` 命令就是在告诉 CMake：“去查找和识别这个测试程序中的所有 Google Test 测试用例，并自动为每个用例设置 CMake 测试。” 这样，当你运行 `make test` 或类似的命令时，所有的测试都会被执行。

- add_library

`add_library` 是 CMake 中的一个命令，用于创建一个库。在 `CMakeLists.txt` 文件中使用这个命令时，你需要指定库的名称以及构成这个库的源代码文件列表。CMake 支持创建静态库（Static Libraries）和动态库（Shared Libraries），以及模块库（Module Libraries，通常用于插件）。

使用 `add_library` 命令，你可以：

- 创建静态库：编译成单个库文件，该文件在程序链接时被复制到最终的可执行文件中。
- 创建动态库或共享库：编译成单独的库文件，可由多个程序共享，不会被复制到最终的可执行文件中。

简单来说，`add_library` 就是在告诉 CMake：“使用这些源文件创建一个库（无论是静态的还是动态的）”，从而为你的项目提供重用或模块化的代码单元。


- target_include_directories

`target_include_directories` 是 CMake 中的一个命令，用于为特定的构建目标（比如可执行文件或库）设置包含（include）目录。这些目录通常包含了头文件（`.h` 或 `.hpp` 文件），编译器在编译过程中会在这些目录中查找头文件。

在 `CMakeLists.txt` 文件中使用 `target_include_directories` 时，你首先指定目标名称，然后指定一个或多个目录，这些目录将被添加到该目标的包含路径中。这个命令可以接受几个关键字来指定包含路径的范围和用途，如 `PRIVATE`、`PUBLIC` 和 `INTERFACE`：

- `PRIVATE`：这些目录仅对目标自身可见。
- `PUBLIC`：这些目录不仅对目标自身可见，还对链接了该目标的其他目标可见。
- `INTERFACE`：这些目录不对目标自身可见，但对链接了该目标的其他目标可见。

简单来说，`target_include_directories` 命令就是在告诉 CMake：“对于这个特定的构建目标，请在这些指定的目录中查找头文件。” 这样可以更精确地控制不同目标的编译依赖项，有助于维护更清晰的项目结构。