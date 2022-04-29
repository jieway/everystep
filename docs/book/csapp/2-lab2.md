# lab2 Bomb Lab 

下载  Self-Study Handout 解压
阅读：bomblab.pdf

将 psol.txt 中的内容作为 `./bomb` 的输入。

    $ ./bomb psol.txt

反汇编，将二进制文件 bomb 的汇编代码存入 bomb.asm 文件中。

    $ objdump -d bomb > bomb.asm

## phase_1

分析 bomb.c 文件发现第一个待输入的字符存于 phase_1 函数中，下面分析根据 bomb.asm 分析 phase_1 的汇编代码。

在 bomb.asm 中全局搜索 phase_1 发现汇编代码如下：

![20220429194202](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429194202.png)

想要看明白这几行汇编代码需要明白内存布局。

![20220429201932](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429201932.png)

规定寄存器 %rsp 始终指向栈顶，栈上向下生长。每当申请内存的时候，%rsp 向下移动，而上部分是高地址，下部分是低地址。

![20220429202747](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429202747.png)

例如执行 `pushq Src` 时会先获取 Src 中的值，然后 %rsp 申请内存，也就是减去八个字节，最后将 Src 中的值存入 %rsp 指向的地址中。

![20220429202806](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429202806.png)

再例如执行 `popq Dest`，首先读取 `%rsp` 指向地址中的内容并将其存入寄存器中，例如此处的 Dest，然后 %rsp 加上八个字节。

![20220429203019](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429203019.png)

![20220429203039](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429203039.png)

但是内存中的数据其实没有发生变化，只有 %rsp 中存储的地址改变了。而此前指向的数据没有变化，其实就是脏数据。

![20220429203218](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429203218.png)

分析 strings_not_equal 在此处打断点，分析存储形参寄存器中的值即可。

![20220429223839](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220429223839.png)

## phase_2

