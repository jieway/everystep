# 前言

最近在阅读**算法4th**这本书，想着把笔记记录一下，以**第一视角**来整理。

当我第一次拿到书后，发现还需要按照书中网站提供了 jar 包时配置了很久发现很繁琐也没有配好。

然后我想着把 jar 包中的标准化输入输出融合到代码中，也就是在 Idea 中将代码框架写好，直接填关键代码，一键运行即可，但是想法很美好。后续我意识到了工作量之庞大。

当我把第二章排序完成后发现在这上面花费了大量的时间，如果将后续的都实现一遍则需要耗费更多的时间。

看这本书的目的是侧重于算法层面而非配置这些环境之上，而后续阅读之时没有测试数据无法检验算法的正确性又很难受，特别是官网已经造好了数据。

这篇文章则是我看书过程中记录的**笔记**以及**踩过的坑**。

# 概述

环境：

* Idea 2019.3.1 
* JDK 1.8 
* [测试数据](https://algs4.cs.princeton.edu/code/algs4-data.zip)
* [官方提供的 JAR 包](https://algs4.cs.princeton.edu/code/algs4.jar)

前提是默认已经安装并配置好了 JDK 和 IDEA ，如果没有请先配置好再进行后续操作。

# 环境配置

首先确认 JDK 是否配置成功，以下是 win10 的配置流程。mac 只需要省略配置 JAR 包的环境变量这一步即可。

* 快捷键 `win + r` 输入 cmd，调出命令行界面。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622202014.png"/> </div>

* 输入 `java -version` 输出如下结果说明安装成功。

<div align="center"><div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200622212218.png"/></div></div>

* 然后打开 idea 左上角 File -> NEW -> project 创建一个项目。

<div aligen="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622202407.png"/> </div>
<div align="center">  <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622202512.png"/> </div>

* 接下来注意点击左上角，接下来就是创建项目名称，自定义。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622202610.png"/> </div>

* 然后下载好的 algs4-data.zip 文件解压，将其中的文件放入 src 目录下。我的目录如下：

<div align="center"><img src="https://gitee.com/weijiew/pic/raw/master/img/20200622202937.png"/></div>

* 然后再将 algs4.jar 包配置到环境变量中。我的 jar 包位置和工程路径如下：

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622203553.png"/> </div>

* 将 algs4.jar 的路径存入 CLASSPATH 中即可，这一步同配置 JDK 路径类似，注意最后结束要写分号。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622203149.png"/> </div>

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622203301.png"/> </div>

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622203451.png"/> </div>


# 运行代码

* 算法4 第五页，书中的第一个例子，运行一下试试。可以直接 [copy](https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/BinarySearch.java) 这里。

* 有必要提前说一下我创建项目的文件结结构。txt 等数据文件都位于 `src` 目录下，代码都位于 `src/com/company` 目录下。`com/company` 是创建项目时默认的，我没有修改，你可以修改，但是修改后，下面使用终端编译时也要修改成对应的路径。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622204750.png"/> </div>

* 输入文件名 `BinarySearch` 在 `src/com/company` 中创建成功。之后将代码 [BinarySearch.java](https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/BinarySearch.java) 贴入，然后发现报错。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622203959.png"/> </div>

* 此时先不管报错，因为缺少 `algs4.jar` ，所以先导入这个包。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622205000.png"/> </div>

* 将 JAR 包添加到对应位置，apply ok 即可。
<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622205106.png"/> </div>
<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622205252.png"/> </div>

* 然后按 alter + enter 将用到 JAR 包中的类导入。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622205335.png"/> </div>

* 然后打开左下角的 terminal 默认路径为当前的项目路径，使用命令 `cd src` 进入 src 文件中。因为测试数据放在了这里。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622205527.png"/> </div>

* 首先使用命令 `javac com/company/BinarySearch.java` 编译文件。
* javac + 文件名 的作用是将源代码编译成字节码。
* 然后使用命令 `java com.company.BinarySearch largeW.txt < largeT.txt` 运行，和书上第五页不同的是这里加上了路径，你也可以删除，com/company 文件夹，直接将文件`BinarySearch.java` 放入 src 目录下，那就和书中的命令一模一样了。
* java + 文件名（不带.class 后缀） 是将字节码运行再虚拟机上。而后面对应的参数则是代码中对应的输入。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622205853.png"/> </div>

* 运行后得到一堆数字说明运行成功。

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622210139.png"/> </div>

# 再次测试

* 再试一下第二章，熟练使用命令行。运行后发现排序成功，中间有坑注意善用搜索！

<div align="center"> <img src="https://gitee.com/weijiew/pic/raw/master/img/20200622211357.png"/> </div>

# 总结

之前我是不想去配环境变量的，认为在 idea 中导入 jar 包后应该就可以直接使用。但是发现不行，命令行无法运行。

后来仔细想想觉得应该是当命令行在编译 JAR 包时会扫描 classpath 中的路径。而 algs4.jar 这个包不在其中必定出问题，idea 只是配置在其对应的配置文件中，在终端上并没有生效。

可以直接在 idea 中直接运行生成字节码，然后在 windows terminal 中导入测试数据进行测试，下一节就可以舒服的敲代码啦！