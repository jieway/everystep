# 安装

对于主流编辑器的支持 [IDE](https://www.rust-lang.org/zh-CN/tools) 。

我设置 idea 和 vscode 这两个 IDE，目前还没有比较出二者的差别。

个人推荐后者，因为免费。下面的都是基于 win10 + vscode 配置的。

首先需要去官网下载[编译器](https://www.rust-lang.org/zh-CN/tools/install) 。

注意小字部分需要提前下载 MSVC 。因为 Rust 是基于 C/C++ 编译器之上的，所以需要提前有 C/C++ 的编译器。

而 C/C++ 的编译器有多种，例如微软提供的 MSVC 和 GUN 提供的 MinGW。我采用的是 MSVC 。

然后下载 rustup-init 文件，一路默认到底。我就不去一一截图了，没有什么坑。如果不清楚可以去我[参考](#参考)的网站里面查看。

然后 win + r 打开 cmd 输入 `rustc -V` 查看是否安装成功。

之后去想要创建项目的目录下打开 vscode ，打开内置终端 （快捷键 ctrl + `）输入如下内容：

`cargo new rust-demo`  Cargo 是 Rust 的构建系统和包管理器。其中 rust-demo 则是想要创建的项目名，自定义。

其中目录树为：

```cpp
F:.
│  .gitignore
│  Cargo.toml
│
└─src
        main.rs
```

main.rs 文件就是 rust 源代码。

# 调试

这一节的内容是使用 vscode 对 rust 文件进行调试。

首先编写一段简单的代码用于调试。

```rust
fn main() {
    let a = "Hello ";
    let v = "world!";
    println!("{}!{}!",a,v);
}
```

首先打开**调试工具**，然后点击创建 **launch.json** 文件，之后点击 **C++ (Windows)**

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200810001428.png"/></div>

然后将 **launch.json** 第 11 行修改为如下内容。

```bash{11}
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(Windows) 启动",
            "type": "cppvsdbg",
            "request": "launch",
            "program": "${workspaceFolder}/target/debug/${workspaceFolderBasename}.exe", 
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false
        }
    ]
}
```

之后使用 `cargo build` 构建项目，然后打上断点，最后启动调试。

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200810002126.png"/></div>

然后就可以看到变量的变化了：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200810002419.png"/></div>

注意不能使用 code run 编译文件，一定要先使用 `cargo build`，不然变量会被优化，显示 Variable is optimized away and not available.

# 参考

* [runoob](https://www.runoob.com/rust/rust-tutorial.html)