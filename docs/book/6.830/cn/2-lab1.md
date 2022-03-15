# Lab 1 翻译

**Assigned: Wed, Feb 24**

**Due: Wed, Mar 10 11:59 PM EDT**

<!--
**Bug Update:** We have a [page](bugs.html) to keep track
of SimpleDB bugs that you or we find. Fixes for bugs/annoyances will also be
posted there. Some bugs may have already been found, so do take a look at the page
to get the latest version/ patches for the lab code.
-->

In the lab assignments in 6.830 you will write a basic database management system called SimpleDB. For this lab, you will focus on implementing the core modules required to access stored data on disk; in future labs, you will add support for various query processing operators, as well as transactions, locking, and concurrent queries.

在6.830的实验作业中，你将编写一个名为SimpleDB的基本数据库管理系统。在这个实验中，你将专注于实现访问磁盘上存储的数据所需的核心模块；在未来的实验中，你将增加对各种查询处理操作符以及事务、锁定和并发查询的支持。

SimpleDB is written in Java. We have provided you with a set of mostly unimplemented classes and interfaces. You will need to write the code for these classes. We will grade your code by running a set of system tests written using [JUnit](http://junit.sourceforge.net/). We have also provided a number of unit tests, which we will not use for grading but that you may find useful in verifying that your code works. We also encourage you to develop your own test suite in addition to our tests.

SimpleDB是用Java编写的。我们已经为你提供了一组大部分未实现的类和接口。你将需要为这些类编写代码。我们将通过运行一组用[JUnit](http://junit.sourceforge.net/)编写的系统测试来评定你的代码。我们还提供了一些单元测试，我们不会在评分中使用这些测试，但你可能会发现这些测试对验证你的代码是否工作很有用。我们也鼓励你在我们的测试之外，开发你自己的测试套件。

The remainder of this document describes the basic architecture of SimpleDB, gives some suggestions about how to start coding, and discusses how to hand in your lab.

本文件的其余部分描述了SimpleDB的基本架构，给出了一些关于如何开始编码的建议，并讨论了如何在实验中交接。

We **strongly recommend** that you start as early as possible on this lab. It requires you to write a fair amount of code!

我们***强烈建议你尽早开始做这个实验。它需要你写相当数量的代码!

<!--

##  0.  Find bugs, be patient, earn candy bars 

SimpleDB is a relatively complex piece of code.
It is very possible you are going to find bugs, inconsistencies, and bad,
outdated, or incorrect documentation, etc.

We ask you, therefore, to do this lab with an adventurous mindset.  Don't get
mad if something is not clear, or even wrong; rather, try to figure it out
yourself or send us a friendly email.  We promise to help out by posting
bug fixes, new commits to the HW repo, etc., as bugs and issues are reported.

<p>...and if you find a bug in our code, we`ll give you a candy bar (see [Section 3.3](#bugs))!

-->
<!--which you can find [here](bugs.html).</p>-->

## 0. Environment Setup

**Start by downloading the code for lab 1 from the course GitHub repository by following the instructions [here](https://github.com/MIT-DB-Class/simple-db-hw-2021).**

首先按照说明[这里](https://github.com/MIT-DB-Class/simple-db-hw-2021)从课程的GitHub资源库下载实验1的代码。

These instructions are written for Athena or any other Unix-based platform (e.g., Linux, MacOS, etc.)  Because the code is written in Java, it should work under Windows as well, although the directions in this document may not apply.

这些说明是为Athena或任何其他基于Unix的平台（如Linux、MacOS等）编写的。因为代码是用Java编写的，所以在Windows下也应该可以工作，尽管本文件中的说明可能不适用。

We have included [Section 1.2](#eclipse) on using the project with Eclipse or IntelliJ.

我们已经包括了[第1.2节](#eclipse)关于用Eclipse或IntelliJ使用该项目。

## 1. Getting started

SimpleDB uses the [Ant build tool](http://ant.apache.org/) to compile the code and run tests. Ant is similar to [make](http://www.gnu.org/software/make/manual/), but the build file is written in XML and is somewhat better suited to Java code. Most modern Linux distributions include Ant. Under Athena, it is included in the `sipb` locker, which you can get to by typing `add sipb` at the Athena prompt. Note that on some versions of Athena you must also run `add -f java` to set the environment correctly for Java programs. See the [Athena documentation on using Java](http://web.mit.edu/acs/www/languages.html#Java) for more details.

SimpleDB使用[Ant构建工具](http://ant.apache.org/)来编译代码和运行测试。Ant类似于[make](http://www.gnu.org/software/make/manual/)，但构建文件是用XML写的，在某种程度上更适合于Java代码。大多数现代Linux发行版都包括Ant。在Athena下，它被包含在`sipb`锁存器中，你可以通过在Athena提示符下输入`add sipb`来获得它。注意，在某些版本的Athena上，你还必须运行`add -f java`来为Java程序正确设置环境。更多细节见[Athena使用Java的文档](http://web.mit.edu/acs/www/languages.html#Java)。

To help you during development, we have provided a set of unit tests in addition to the end-to-end tests that we use for grading. These are by no means comprehensive, and you should not rely on them exclusively to verify the correctness of your project (put those 6.170 skills to use!).

为了在开发过程中帮助你，除了我们用于评分的端到端测试外，我们还提供了一套单元测试。这些绝不是全面的，你不应该完全依赖它们来验证你的项目的正确性（把那些6.170的技能用上吧！）。

To run the unit tests use the `test` build target:

要运行单元测试，请使用`test`构建目标。

```
$ cd [project-directory]
$ # run all unit tests
$ ant test
$ # run a specific unit test
$ ant runtest -Dtest=TupleTest
```

You should see output similar to:

你应该看到类似的输出。
```
 build output...

test:
    [junit] Running simpledb.CatalogTest
    [junit] Testsuite: simpledb.CatalogTest
    [junit] Tests run: 2, Failures: 0, Errors: 2, Time elapsed: 0.037 sec
    [junit] Tests run: 2, Failures: 0, Errors: 2, Time elapsed: 0.037 sec

 ... stack traces and error reports ...
```

The output above indicates that two errors occurred during compilation; this is because the code we have given you doesn't yet work. As you complete parts of the lab, you will work towards passing additional unit tests.

上面的输出表明，在编译过程中发生了两个错误；这是因为我们给你的代码还不能工作。当你完成实验的部分内容时，你将努力通过额外的单元测试。

If you wish to write new unit tests as you code, they should be added to the <tt>test simpledb</tt> directory.

如果你希望在编码时编写新的单元测试，它们应该被添加到<tt>test simpledb</tt> catalog 。

<p>For more details about how to use Ant, see the [manual](http://ant.apache.org/manual/). The [Running Ant](http://ant.apache.org/manual/running.html) section provides details about using the `ant` command. However, the quick reference table below should be sufficient for working on the labs.

<p>关于如何使用Ant的更多细节，请参阅[手册](http://ant.apache.org/manual/)。运行Ant](http://ant.apache.org/manual/running.html)部分提供了关于使用`ant`命令的细节。然而，下面的快速参考表应该足以用于实验的工作。

Command | Description
--- | ---
ant|Build the default target (for simpledb, this is dist). 构建默认的目标（对于simpledb，这是dist）。
ant -projecthelp|List all the targets in `build.xml` with descriptions. 列出`build.xml`中的所有目标和描述。
ant dist|Compile the code in src and package it in `dist/simpledb.jar`. 编译src中的代码并将其打包到`dist/simpledb.jar`中。
ant test|Compile and run all the unit tests. 编译并运行所有单元测试。
ant runtest -Dtest=testname|Run the unit test named `testname`. 运行名为`testname`的单元测试。
ant systemtest|Compile and run all the system tests. 编译并运行所有的系统测试。
ant runsystest -Dtest=testname|Compile and run the system test named `testname`. 编译并运行名为`testname`的系统测试。

If you are under windows system and don't want to run ant tests from command line, you can also run them from eclipse. Right click build.xml, in the targets tab, you can see "runtest" "runsystest" etc. For example, select runtest would be equivalent to "ant runtest" from command line. Arguments such as "-Dtest=testname" can be specified in the "Main" Tab, " Arguments" textbox. Note that you can also create a shortcut to runtest by copying from build.xml, modifying targets and arguments and renaming it to, say, runtest_build.xml.

如果你在windows系统下，不想从命令行运行ant测试，你也可以从eclipse运行它们。右击build.xml，在target标签中，你可以看到 "runtest""runystest "等。例如，选择runtest就相当于从命令行中的 "ant runtest"。诸如"-Dtest=testname "这样的参数可以在 "主 "标签的 "参数 "文本框中指定。注意，你也可以通过复制build.xml，修改目标和参数，并将其重命名为例如runtest_build.xml来创建runtest的快捷方式。

### 1.1. Running end-to-end tests

We have also provided a set of end-to-end tests that will eventually be used for grading. These tests are structured as JUnit tests that live in the `test/simpledb/systemtest` directory. To run all the system tests, use the `systemtest` build target:

我们还提供了一套端到端的测试，最终将用于评分。这些测试的结构是JUnit测试，存在于`test/simpledb/systemtest` catalog 中。要运行所有的系统测试，请使用`systemtest`构建目标。

```
$ ant systemtest

 ... build output ...

    [junit] Testcase: testSmall took 0.017 sec
    [junit]     Caused an ERROR
    [junit] expected to find the following tuples:
    [junit]     19128
    [junit] 
    [junit] java.lang.AssertionError: expected to find the following tuples:
    [junit]     19128
    [junit] 
    [junit]     at simpledb.systemtest.SystemTestUtil.matchTuples(SystemTestUtil.java:122)
    [junit]     at simpledb.systemtest.SystemTestUtil.matchTuples(SystemTestUtil.java:83)
    [junit]     at simpledb.systemtest.SystemTestUtil.matchTuples(SystemTestUtil.java:75)
    [junit]     at simpledb.systemtest.ScanTest.validateScan(ScanTest.java:30)
    [junit]     at simpledb.systemtest.ScanTest.testSmall(ScanTest.java:40)

 ... more error messages ...
```

This indicates that this test failed, showing the stack trace where the error was detected. To debug, start by reading the source code where the error occurred. When the tests pass, you will see something like the following:

这表明这个测试失败了，显示检测到错误的堆栈跟踪。要进行调试，首先阅读发生错误的源代码。当测试通过时，你会看到类似下面的内容。

```
$ ant systemtest

 ... build output ...

    [junit] Testsuite: simpledb.systemtest.ScanTest
    [junit] Tests run: 3, Failures: 0, Errors: 0, Time elapsed: 7.278 sec
    [junit] Tests run: 3, Failures: 0, Errors: 0, Time elapsed: 7.278 sec
    [junit] 
    [junit] Testcase: testSmall took 0.937 sec
    [junit] Testcase: testLarge took 5.276 sec
    [junit] Testcase: testRandom took 1.049 sec

BUILD SUCCESSFUL
Total time: 52 seconds
```

#### 1.1.1 Creating dummy tables

It is likely you'll want to create your own tests and your own data tables to test your own implementation of SimpleDB. You can create any `.txt` file and convert it to a `.dat` file in SimpleDB's `HeapFile` format using the
command:

你很可能想要创建自己的测试和自己的数据表来测试你自己的SimpleDB的实现。你可以创建任何".txt "文件并将其转换成SimpleDB的 "HeapFile "格式的".dat "文件，使用
命令。

```
$ java -jar dist/simpledb.jar convert file.txt N
```

where `file.txt` is the name of the file and `N` is the number of columns in the file. Notice that `file.txt` has to be in the following format:

其中`file.txt`是文件的名称，`N`是文件中的列数。请注意，`file.txt`必须是以下格式。

```
int1,int2,...,intN
int1,int2,...,intN
int1,int2,...,intN
int1,int2,...,intN
```

...where each intN is a non-negative integer.

...其中每个intN是一个非负整数。

To view the contents of a table, use the `print` command:

要查看一个表的内容，使用`print`命令。

```
$ java -jar dist/simpledb.jar print file.dat N
```

where `file.dat` is the name of a table created with the <tt>convert</tt> command, and `N` is the number of columns in the file.

其中 `file.dat` 是用<tt>convert</tt>命令创建的表的名称，`N` 是文件中的列数。

### 1.2. Working with an IDE

IDEs (Integrated Development Environments) are graphical software development environments that may help you manage larger projects. We provide instructions for setting up both [Eclipse](http://www.eclipse.org) and [IntelliJ](https://www.jetbrains.com/idea/). The instructions we provide for Eclipse were generated by using Eclipse for Java Developers (not the enterprise edition) with Java 1.7. For IntelliJ, we are using the Ultimate edition, which you can get with an education license through your mit.edu account [here](https://www.jetbrains.com/community/education/#students). We strongly encourage you to set up and learn one of the IDEs for this project.

IDE（集成开发环境）是图形化的软件开发环境，可以帮助你管理大型项目。我们提供[Eclipse](http://www.eclipse.org)和[IntelliJ](https://www.jetbrains.com/idea/)的设置说明。我们为 Eclipse 提供的说明是通过使用 Java 1.7 的 Eclipse for Java Developers（不是企业版）生成的。对于 IntelliJ，我们使用的是终极版，你可以通过你的 mit.edu 账户获得教育许可[这里](https://www.jetbrains.com/community/education/#students)。我们强烈建议你为这个项目设置并学习其中的一个IDE。

**Preparing the Codebase**

**准备代码库**。

Run the following command to generate the project file for IDEs:

运行下面的命令来生成用于IDE的项目文件。

```
ant eclipse
```

**Setting the Lab Up in Eclipse**

* Once Eclipse is installed, start it, and note that the first screen asks you to select a location for your workspace (we will refer to this directory as $W). Select the directory containing your simple-db-hw repository.
* In Eclipse, select File->New->Project->Java->Java Project, and push Next.
* Enter "simple-db-hw" as the project name.
* On the same screen that you entered the project name, select "Create project from existing source," and browse to $W/simple-db-hw.
* Click finish, and you should be able to see "simple-db-hw" as a new project in the Project Explorer tab on the left-hand side of your screen. Opening this project reveals the directory structure discussed above - implementation code can be found in "src," and unit tests and system tests found in "test."

* 一旦Eclipse安装完毕，启动它，注意第一个屏幕会要求你为你的工作区选择一个位置（我们将这个 catalog 称为$W）。选择包含simple-db-hw资源库的 catalog 。
* 在Eclipse中，选择File->New->Project->Java->Java Project，然后按Next。
* 输入 "simple-db-hw "作为项目名称。
* 在你输入项目名称的同一个屏幕上，选择 "从现有源码创建项目"，并浏览到$W/simple-db-hw。
* 点击完成，你应该能够看到 "simple-db-hw "作为一个新的项目出现在屏幕左侧的 "项目浏览器 "标签中。打开这个项目可以看到上面讨论的 catalog 结构--实现代码可以在 "src "中找到，单元测试和系统测试在 "test "中找到。

**Note:** that this class assumes that you are using the official Oracle release of Java. This is the default on MacOS X, and for most Windows Eclipse installs; but many Linux distributions default to alternate Java runtimes (like OpenJDK). Please download the latest Java8 updates from [Oracle Website](http://www.oracle.com/technetwork/java/javase/downloads/index.html), and use that Java version. If you don't switch, you may see spurious test failures in some of the performance tests in later labs.

**注意：**该类假定你使用的是Oracle官方发布的Java。这在 MacOS X 上是默认的，对于大多数 Windows Eclipse 安装来说也是如此；但许多 Linux 发行版默认使用其他 Java 运行时（如 OpenJDK）。请从 [Oracle 网站] (http://www.oracle.com/technetwork/java/javase/downloads/index.html) 下载最新的 Java8 更新，并使用该 Java 版本。如果你不切换，你可能会在后面的实验的一些性能测试中看到虚假的测试失败。

**Running Individual Unit and System Tests**

**运行单个单元和系统测试**。

To run a unit test or system test (both are JUnit tests, and can be initialized the same way), go to the Package Explorer tab on the left side of your screen. Under the "simple-db-hw" project, open the "test" directory. Unit tests are found in the "simpledb" package, and system tests are found in the "simpledb.systemtests" package. To run one of these tests, select the test (they are all called *Test.java - don't select TestUtil.java or SystemTestUtil.java), right click on it, select "Run As," and select "JUnit Test."  This will bring up a JUnit tab, which will tell you the status of the individual tests within the JUnit test suite, and will show you exceptions and other errors that will help you debug problems.

要运行一个单元测试或系统测试（两者都是JUnit测试，可以用同样的方法初始化），去屏幕左边的Package Explorer标签。在 "simple-db-hw "项目下，打开 "test " catalog 。单元测试可以在 "simpledb "包中找到，系统测试可以在 "simpledb.systemtests "包中找到。要运行这些测试之一，选择测试（它们都被称为*Test.java - 不要选择TestUtil.java或SystemTestUtil.java），右击它，选择 "运行为"，并选择 "JUnit测试"。 这将弹出一个JUnit标签，它将告诉你JUnit测试套件中各个测试的状态，并将显示异常和其他错误，这将有助于你调试问题。


**Running Ant Build Targets**

If you want to run commands such as "ant test" or "ant systemtest," right click on build.xml in the Package Explorer. Select "Run As," and then "Ant Build..." (note: select the option with the ellipsis (...), otherwise you won't be presented with a set of build targets to run). Then, in the "Targets" tab of the next screen, check off the targets you want to run (probably "dist" and one of "test" or "systemtest"). This should run the build targets and show you the results in Eclipse's console window.

如果你想运行 "ant test "或 "ant systemtest "这样的命令，在软件包资源管理器中右击build.xml。选择 "Run As"，然后选择 "Ant Build..."（注意：选择带省略号（...）的选项，否则你将不会看到一组要运行的构建目标）。然后，在下一个屏幕的 "目标 "选项卡中，选中你想运行的目标（可能是 "dist "和 "test "或 "systemtest "中的一个）。这应该会运行构建目标，并在 Eclipse 的控制台窗口中显示结果。

**Setting the Lab Up in IntelliJ**

IntelliJ is a more modern Java IDE that is popular and more intuitive to use by some accounts. To use IntelliJ, first install it and open the application. Similar to Eclipse, under Projects, select Open and navigate to your project root. Double-click on the .project file (you may need to configure your operating system to reveal hidden files to see it), and click "open as project". IntelliJ has tool window support with Ant that you may want to setup according to instructions [here](https://www.jetbrains.com/help/idea/ant.html), but this is not essential to development. You can find a detailed walkthrough of IntelliJ features [here](https://www.jetbrains.com/help/idea/discover-intellij-idea.html)

IntelliJ是一个更现代的Java集成开发环境，在一些人看来，它很受欢迎，使用起来也更直观。要使用IntelliJ，首先安装它并打开应用程序。与Eclipse类似，在Projects下，选择Open并导航到你的项目根。双击.project文件（你可能需要配置你的操作系统以显示隐藏的文件来查看它），然后点击 "作为项目打开"。IntelliJ有Ant的工具窗口支持，你可能想根据说明[这里]（https://www.jetbrains.com/help/idea/ant.html）进行设置，但这对开发来说并不是必不可少的。你可以找到一个关于IntelliJ功能的详细介绍[这里](https://www.jetbrains.com/help/idea/discover-intellij-idea.html)

### 1.3. Implementation hints

Before beginning to write code, we **strongly encourage** you to read through this entire document to get a feel for the high-level design of SimpleDB.

在开始写代码之前，我们***强烈建议你阅读整个文档，以了解SimpleDB的顶层设计。

<p>

You will need to fill in any piece of code that is not implemented. It will be obvious where we think you should write code. You may need to add private methods and/or helper classes. You may change APIs, but make sure our [grading](#grading) tests still run and make sure to mention, explain, and defend your decisions in your writeup.

你将需要填写任何没有实现的代码。我们认为你应该在哪里写代码，这将是显而易见的。你可能需要添加私有方法和/或辅助类。你可以改变API，但要确保我们的[评分](#评分)测试仍然运行，并确保在你的写法中提到、解释和辩护你的决定。

<p>

In addition to the methods that you need to fill out for this lab, the class interfaces contain numerous methods that you need not implement until subsequent labs. These will either be indicated per class:

除了本实验需要填写的方法外，类的接口还包含许多方法，你需要在以后的实验中才能实现。这些方法或者会在每个类中注明。

```java
// Not necessary for lab1.
public class Insert implements DbIterator {
```

or per method:

或每个方法。

```Java
public boolean deleteTuple(Tuple t)throws DbException{
        // some code goes here
        // not necessary for lab1
        return false;
        }
```

The code that you submit should compile without having to modify these methods.

你提交的代码应该在不修改这些方法的情况下进行编译。

<p>

We suggest exercises along this document to guide your implementation, but you may find that a different order makes more sense for you.

我们建议沿着这份文件进行练习，以指导你的实施，但你可能发现不同的顺序对你更有意义。

**Here's a rough outline of one way you might proceed with your SimpleDB implementation:**

**以下是你可能进行SimpleDB实现的一个粗略轮廓：**。

****

* Implement the classes to manage tuples, namely Tuple, TupleDesc. We have already implemented Field, IntField,
  StringField, and Type for you. Since you only need to support integer and (fixed length) string fields and fixed
  length tuples, these are straightforward.
* Implement the Catalog (this should be very simple).
* Implement the BufferPool constructor and the getPage() method.
* Implement the access methods, HeapPage and HeapFile and associated ID classes. A good portion of these files has
  already been written for you.
* Implement the operator SeqScan.
* At this point, you should be able to pass the ScanTest system test, which is the goal for this lab.

***

* 实现管理Tuple的类，即Tuple、TupleDesc。 我们已经实现了Field、IntField。
  StringField，和Type给你。因为你只需要支持整数和（固定长度的）字符串字段以及固定长度的 tuples 。
  长度的 tuples，这些都是简单明了的。
* 实现 catalog （这应该非常简单）。
* 实现BufferPool构造函数和getPage()方法。
* 实现访问方法，HeapPage和HeapFile以及相关的ID类。这些文件的很大一部分已经
  已经为你写好了。
* 实现操作符SeqScan。
* 在这一点上，你应该能够通过ScanTest系统测试，这是本实验的目标。


Section 2 below walks you through these implementation steps and the unit tests corresponding to each one in more detail.

下面的第2节将引导你更详细地了解这些实现步骤和每个步骤所对应的单元测试。

### 1.4. Transactions, locking, and recovery

As you look through the interfaces we have provided you, you will see a number of references to locking, transactions, and recovery. You do not need to support these features in this lab, but you should keep these parameters in the interfaces of your code because you will be implementing transactions and locking in a future lab. The test code we have provided you with generates a fake transaction ID that is passed into the operators of the query it runs; you should pass this transaction ID into other operators and the buffer pool.

当你浏览我们提供给你的接口时，你会看到许多对锁、事务和恢复的引用。你不需要在这个实验中支持这些功能，但是你应该在你的代码的接口中保留这些参数，因为你将在未来的实验中实现事务和锁定。我们为你提供的测试代码会生成一个假的事务ID，并将其传递给它所运行的查询的操作者；你应该将这个事务ID传递给其他操作者和缓冲池。

## 2. SimpleDB Architecture and Implementation Guide

SimpleDB consists of:

* Classes that represent fields, tuples, and tuple schemas;
* Classes that apply predicates and conditions to tuples;
* One or more access methods (e.g., heap files) that store relations on disk and provide a way to iterate through tuples of those relations;
* A collection of operator classes (e.g., select, join, insert, delete, etc.) that process tuples;
* A buffer pool that caches active tuples and pages in memory and handles concurrency control and transactions (neither of which you need to worry about for this lab); and,
* A catalog that stores information about available tables and their schemas.

SimpleDB由以下部分组成：

* 代表字段、Tuple和Tuple模式的类。
* 对Tuple应用谓词和条件的类。
* 一个或多个访问方法（例如，堆文件），将关系存储在磁盘上，并提供一种方法来遍历这些关系的Tuple。
* 一个操作者类的集合（例如，选择、连接、插入、删除等），用于处理Tuple。
* 一个缓冲池，用于缓存内存中的活动Tuple和页面，并处理并发控制和事务（在本实验中你不需要担心这两点）；以及。
* 一个 catalog ，用于存储关于可用表和它们的模式的信息。


SimpleDB does not include many things that you may think of as being a part of a "database."  In particular, SimpleDB does not have:

SimpleDB不包括许多你可能认为是 "数据库 "一部分的东西。 特别是，SimpleDB没有。

* (In this lab), a SQL front end or parser that allows you to type queries directly into SimpleDB. Instead, queries are built up by chaining a set of operators together into a hand-built query plan (see [Section 2.7](#query_walkthrough)). We will provide a simple parser for use in later labs.
* Views.
* Data types except integers and fixed length strings.
* (In this lab) Query optimizer.
* (In this lab) Indices.

*（在本实验中），一个SQL前端或分析器，允许你直接向SimpleDB输入查询。取而代之的是，查询是通过将一组运算符串联到一个手工建立的查询计划中来建立的（见[2.7节](#query_walkthrough)）。我们将提供一个简单的解析器，在后面的实验中使用。
* 视图。
* 数据类型，除了整数和固定长度的字符串。
* （在本实验中）查询优化器。
* （在本实验中）索引。

<p>

In the rest of this Section, we describe each of the main components of SimpleDB that you will need to implement in this lab. You should use the exercises in this discussion to guide your implementation. This document is by no means a complete specification for SimpleDB; you will need to make decisions about how to design and implement various parts of the system. Note that for Lab 1 you do not need to implement any operators (e.g., select, join, project) except sequential scan. You will add support for additional operators in future labs.

在本节的其余部分，我们将描述你在本实验中需要实现的SimpleDB的每个主要组件。你应该使用本讨论中的练习来指导你的实现。本文档绝不是SimpleDB的完整规范；你将需要对如何设计和实现系统的各个部分做出决定。注意，对于实验1，除了顺序扫描，你不需要实现任何操作符（例如，选择、连接、项目）。你将在未来的实验中增加对其他运算符的支持。

<p>

### 2.1. The Database Class

The Database class provides access to a collection of static objects that are the global state of the database. In particular, this includes methods to access the catalog (the list of all the tables in the database), the buffer pool ( the collection of database file pages that are currently resident in memory), and the log file. You will not need to worry about the log file in this lab. We have implemented the Database class for you. You should take a look at this file as you will need to access these objects.

数据库类提供了对静态对象集合的访问，这些对象是数据库的全局状态。特别是，这包括访问 catalog （数据库中所有表的列表）、缓冲池（当前驻留在内存中的数据库文件页的集合）和日志文件的方法。在本实验中，你不需要担心日志文件的问题。我们已经为你实现了数据库类。你应该看一下这个文件，因为你将需要访问这些对象。

### 2.2. Fields and Tuples

Tuples in SimpleDB are quite basic.  They consist of a collection of `Field` objects, one per field in the `Tuple`. `Field` is an interface that different data types (e.g., integer, string) implement.  `Tuple` objects are created by the underlying access methods (e.g., heap files, or B-trees), as described in the next section.  Tuples also have a type (or schema), called a _tuple descriptor_, represented by a `TupleDesc` object.  This object consists of a collection of `Type` objects, one per field in the tuple, each of which describes the type of the corresponding field.

SimpleDB中的元组是非常基本的。 它们由 "字段 "对象的集合组成，在 "Tuple "中每个字段一个。`Field`是一个接口，不同的数据类型（例如，整数，字符串）都可以实现。 `Tuple`对象是由底层访问方法（例如，堆文件，或B-树）创建的，如下一节所述。 元组也有一个类型（或模式），称为_元组描述符_，由`TupleDesc`对象表示。 这个对象由 "类型 "对象的集合组成，元组中的每个字段都有一个，每个对象都描述了相应字段的类型。

### Exercise 1

**Implement the skeleton methods in:**

***

* src/java/simpledb/storage/TupleDesc.java
* src/java/simpledb/storage/Tuple.java

***

At this point, your code should pass the unit tests TupleTest and TupleDescTest. At this point, modifyRecordId() should fail because you havn't implemented it yet.

在这一点上，你的代码应该通过单元测试TupleTest和TupleDescTest。在这一点上，modifyRecordId()应该失败，因为你还没有实现它。

### 2.3. Catalog

The catalog (class `Catalog` in SimpleDB) consists of a list of the tables and schemas of the tables that are currently in the database. You will need to support the ability to add a new table, as well as getting information about a particular table. Associated with each table is a `TupleDesc` object that allows operators to determine the types and number of fields in a table.

 catalog （SimpleDB中的`Catalog`类）由当前数据库中的表和表的模式的列表组成。你需要支持添加一个新的表的能力，以及获得一个特定表的信息。与每个表相关的是一个`TupleDesc`对象，它允许操作者确定一个表的字段类型和数量。

The global catalog is a single instance of `Catalog` that is allocated for the entire SimpleDB process. The global catalog can be retrieved via the method `Database.getCatalog()`, and the same goes for the global buffer pool (using `Database.getBufferPool()`).

全局 catalog 是一个单一的`Catalog`实例，为整个SimpleDB进程分配。全局 catalog 可以通过`Database.getCatalog()`方法来检索，全局缓冲池也是如此（使用`Database.getBufferPool()`）。

### Exercise 2

**Implement the skeleton methods in:**
***

* src/java/simpledb/common/Catalog.java

*** 

At this point, your code should pass the unit tests in CatalogTest.

在这一点上，你的代码应该通过CatalogTest的单元测试。

### 2.4. BufferPool

The buffer pool (class `BufferPool` in SimpleDB) is responsible for caching pages in memory that have been recently read from disk. All operators read and write pages from various files on disk through the buffer pool. It consists of a fixed number of pages, defined by the `numPages` parameter to the `BufferPool` constructor. In later labs, you will implement an eviction policy. For this lab, you only need to implement the constructor and the `BufferPool.getPage()` method used by the SeqScan operator. The BufferPool should store up to `numPages` pages. For this lab, if more than `numPages` requests are made for different pages, then instead of implementing an eviction policy, you may throw a DbException. In future labs you will be required to implement an eviction policy.

缓冲池（SimpleDB中的`BufferPool`类）负责在内存中缓存最近从磁盘读取的页面。所有的操作者通过缓冲池从磁盘上的各种文件读写页面。它由固定数量的页面组成，由`BufferPool`构造函数的`numPages`参数定义。在后面的实验中，你将实现一个驱逐策略。对于这个实验，你只需要实现构造函数和SeqScan操作者使用的`BufferPool.getPage()`方法。BufferPool应该最多存储`numPages`页。对于这个实验，如果对不同页面的请求超过`numPages`，那么你可以抛出一个DbException，而不是实施驱逐策略。在未来的实验中，你将被要求实现一个驱逐策略。

The `Database` class provides a static method, `Database.getBufferPool()`, that returns a reference to the single BufferPool instance for the entire SimpleDB process.

数据库 "类提供了一个静态方法，"Database.getBufferPool()"，用于返回整个SimpleDB进程的单个BufferPool实例的引用。

### Exercise 3

**Implement the `getPage()` method in:**

***

* src/java/simpledb/storage/BufferPool.java

***

We have not provided unit tests for BufferPool. The functionality you implemented will be tested in the implementation of HeapFile below. You should use the `DbFile.readPage` method to access pages of a DbFile.

我们没有为 BufferPool 提供单元测试。你实现的功能将在下面HeapFile的实现中得到测试。你应该使用`DbFile.readPage`方法来访问DbFile的页面。


<!--
When more than this many pages are in the buffer pool, one page should be evicted from the pool before the next is loaded.  The choice of eviction policy is up to you; it is not necessary to do something sophisticated.

当缓冲池中的页面超过这个数量时，在加载下一个页面之前，应该将一个页面从缓冲池中驱逐出去。 驱逐策略的选择由你决定；没有必要做一些复杂的事情。

-->

<!--
<p>

Notice that `BufferPool` asks you to implement a `flush_all_pages()` method.  This is not something you would ever need in a real implementation of a buffer pool.  However, we need this method for testing purposes.  You really should never call this method from anywhere in your code.

注意`BufferPool`要求你实现`flush_all_pages()`方法。 这不是你在真正实现缓冲池时需要的东西。 然而，我们需要这个方法用于测试。 你真的不应该在你的代码中的任何地方调用这个方法。

-->

### 2.5. HeapFile access method

Access methods provide a way to read or write data from disk that is arranged in a specific way. Common access methods include heap files (unsorted files of tuples) and B-trees; for this assignment, you will only implement a heap file access method, and we have written some of the code for you.

访问方法提供了一种从磁盘读取或写入以特定方式排列的数据的方法。常见的访问方法包括堆文件（未经排序的 tuple 文件）和 B 树；对于这项作业，你将只实现一个堆文件访问方法，我们已经为你写了一些代码。

<p>

A `HeapFile` object is arranged into a set of pages, each of which consists of a fixed number of bytes for storing tuples, (defined by the constant `BufferPool.DEFAULT_PAGE_SIZE`), including a header. In SimpleDB, there is one `HeapFile` object for each table in the database. Each page in a `HeapFile` is arranged as a set of slots, each of which can hold one tuple (tuples for a given table in SimpleDB are all of the same size). In addition to these slots, each page has a header that consists of a bitmap with one bit per tuple slot. If the bit corresponding to a particular tuple is 1, it indicates that the tuple is valid; if it is 0, the tuple is invalid (e.g., has been deleted or was never initialized.)  Pages of `HeapFile` objects are of type `HeapPage` which implements the `Page` interface. Pages are stored in the buffer pool but are read and written by the `HeapFile` class.

一个`HeapFile`对象被安排成一组页面，每个页面由固定数量的字节组成，用于存储 tuple ，（由常数`BufferPool.DEFAULT_PAGE_SIZE`定义），包括一个头。在SimpleDB中，数据库中每个表都有一个`HeapFile`对象。`HeapFile`中的每个页面被安排为一组槽，每个槽可以容纳一个元组（SimpleDB中一个给定的表的元组都是相同大小的）。除了这些槽之外，每个页面都有一个头，由一个位图组成，每个元组槽有一个位。如果某个元组对应的位是1，表示该元组是有效的；如果是0，表示该元组是无效的（例如，已经被删除或者从未被初始化）。 `HeapFile`对象的页是`HeapPage`类型，实现了`Page`接口。页被存储在缓冲池中，但由`HeapFile`类来读写。

<p>

SimpleDB stores heap files on disk in more or less the same format they are stored in memory. Each file consists of page data arranged consecutively on disk. Each page consists of one or more bytes representing the header, followed by the _ page size_ bytes of actual page content. Each tuple requires _tuple size_ * 8 bits for its content and 1 bit for the header. Thus, the number of tuples that can fit in a single page is:

SimpleDB在磁盘上存储堆文件的格式或多或少与它们在内存中的存储格式相同。每个文件由磁盘上连续排列的页面数据组成。每个页面由一个或多个代表头的字节组成，然后是实际页面内容的_页面大小_字节。每个元组的内容需要_元组大小_*8位，页眉需要1位。因此，一个页面中可以容纳的 tuple 数量是。

<p>

`
_tuples per page_ = floor((_page size_ * 8) / (_tuple size_ * 8 + 1))
`

<p>

Where _tuple size_ is the size of a tuple in the page in bytes. The idea here is that each tuple requires one additional bit of storage in the header. We compute the number of bits in a page (by mulitplying page size by 8), and divide this quantity by the number of bits in a tuple (including this extra header bit) to get the number of tuples per page. The floor operation rounds down to the nearest integer number of tuples (we don't want to store partial tuples on a page!)

其中_tuple size_是页面中一个元组的大小，单位是字节。这里的想法是，每个元组需要在头中增加一个比特的存储。我们计算一个页面中的比特数（通过将页面大小乘以8），然后用这个数量除以元组中的比特数（包括这个额外的头部比特），得到每页的元组数。下限操作将四舍五入到最接近的 tuple 数（我们不想在一个页面上存储部分 tuple ！）。


<p>

Once we know the number of tuples per page, the number of bytes required to store the header is simply:

一旦我们知道了每页的 tuple 数，存储页眉所需的字节数就简单了。

<p>

`
headerBytes = ceiling(tupsPerPage/8)
`

<p>

The ceiling operation rounds up to the nearest integer number of bytes (we never store less than a full byte of header information.)

上限操作四舍五入到最接近的整数字节（我们永远不会存储少于一个完整字节的头信息）。

<p>

The low (least significant) bits of each byte represents the status of the slots that are earlier in the file. Hence, the lowest bit of the first byte represents whether or not the first slot in the page is in use. The second lowest bit of the first byte represents whether or not the second slot in the page is in use, and so on. Also, note that the high-order bits of the last byte may not correspond to a slot that is actually in the file, since the number of slots may not be a multiple of 8. Also note that all Java virtual machines are [big-endian](http://en.wikipedia.org/wiki/Endianness).

每个字节的低位（最小有效位）代表文件中较早的槽位的状态。因此，第一个字节的最低位代表页面中的第一个槽是否正在使用。第一个字节的第二个最低位代表页面中的第二个槽是否在使用中，以此类推。另外，请注意，最后一个字节的高阶位可能不对应于文件中实际存在的槽，因为槽的数量可能不是8的倍数。还要注意，所有的Java虚拟机都是[big-endian](http://en.wikipedia.org/wiki/Endianness)。

<p>

### Exercise 4

**Implement the skeleton methods in:**
***

* src/java/simpledb/storage/HeapPageId.java
* src/java/simpledb/storage/RecordId.java
* src/java/simpledb/storage/HeapPage.java

***

Although you will not use them directly in Lab 1, we ask you to implement `getNumEmptySlots()` and `isSlotUsed()` in HeapPage. These require pushing around bits in the page header. You may find it helpful to look at the other methods that have been provided in HeapPage or in `src/simpledb/HeapFileEncoder.java` to understand the layout of pages.

尽管你不会在实验1中直接使用它们，但我们要求你在HeapPage中实现`getNumEmptySlots()`和`isSlotUsed()`。这些都需要在页头中推送一些位。你可能会发现查看HeapPage或`src/simpledb/HeapFileEncoder.java`中提供的其他方法对理解页面的布局有帮助。

You will also need to implement an Iterator over the tuples in the page, which may involve an auxiliary class or data structure.

你还需要在页面中的 tuple 上实现一个迭代器，这可能涉及一个辅助类或数据结构。

At this point, your code should pass the unit tests in HeapPageIdTest, RecordIDTest, and HeapPageReadTest.

在这一点上，你的代码应该通过HeapPageIdTest、RecordIDTest和HeapPageReadTest的单元测试。

<p> 

After you have implemented `HeapPage`, you will write methods for `HeapFile` in this lab to calculate the number of pages in a file and to read a page from the file. You will then be able to fetch tuples from a file stored on disk.

在你实现了 "HeapPage "之后，你将在本实验中为 "HeapFile "编写方法，以计算文件中的页数，并从文件中读取一个页。然后你将能够从存储在磁盘上的文件中获取 tuple 。

### Exercise 5

**Implement the skeleton methods in:**

***

* src/java/simpledb/storage/HeapFile.java

*** 

To read a page from disk, you will first need to calculate the correct offset in the file. 

要从磁盘上读取一个页面，你首先需要计算出文件中的正确偏移量。

Hint: you will need random access to the file in order to read and write pages at arbitrary offsets. You should not call BufferPool methods when reading a page from disk.

提示：你需要对文件进行随机访问，以便在任意的偏移量上读写页面。当从磁盘上读取一个页面时，你不应该调用BufferPool方法。

<p> 

You will also need to implement the `HeapFile.iterator()` method, which should iterate through through the tuples of each page in the HeapFile. The iterator must use the `BufferPool.getPage()` method to access pages in the `HeapFile`. This method loads the page into the buffer pool and will eventually be used (in a later lab) to implement locking-based concurrency control and recovery.  Do not load the entire table into memory on the open() call -- this will cause an out of memory error for very large tables.

你还需要实现`HeapFile.iterator()`方法，它应该遍历HeapFile中每个页面的 tuple 。迭代器必须使用`BufferPool.getPage()`方法来访问`HeapFile`中的页面。这个方法将页面加载到缓冲池中，最终将被用于（在后面的实验中）实现基于锁的并发控制和恢复。 不要在open()调用时将整个表加载到内存中 -- 这将导致非常大的表出现内存不足的错误。

<p>

At this point, your code should pass the unit tests in HeapFileReadTest.

在这一点上，你的代码应该通过HeapFileReadTest的单元测试。

### 2.6. Operators

Operators are responsible for the actual execution of the query plan. They implement the operations of the relational algebra. In SimpleDB, operators are iterator based; each operator implements the `DbIterator` interface.

操作员负责查询计划的实际执行。他们实现了关系代数的操作。在SimpleDB中，操作符是基于迭代器的；每个操作符实现了`DbIterator'接口。

<p>

Operators are connected together into a plan by passing lower-level operators into the constructors of higher-level operators, i.e., by 'chaining them together.' Special access method operators at the leaves of the plan are responsible for reading data from the disk (and hence do not have any operators below them).

操作符通过将低级别的操作符传递到高级别的操作符的构造器中，即通过 "连锁 "将它们连接到一个计划中。在计划叶子上的特殊访问方法运算符负责从磁盘上读取数据（因此没有下面的任何运算符）。

<p>

At the top of the plan, the program interacting with SimpleDB simply calls `getNext` on the root operator; this operator then calls `getNext` on its children, and so on, until these leaf operators are called. They fetch tuples from disk and pass them up the tree (as return arguments to `getNext`); tuples propagate up the plan in this way until they are output at the root or combined or rejected by another operator in the plan.

在计划的顶部，与SimpleDB交互的程序只需在根操作符上调用`getNext`；这个操作符接着在其子操作符上调用`getNext`，以此类推，直到这些叶操作符被调用。他们从磁盘中获取 tuple ，并将其传递到树上（作为`getNext`的返回参数）； tuple 以这种方式在计划中传播，直到它们在根部输出或被计划中的另一个运算符合并或拒绝。

<p>

<!--

For plans that implement `INSERT` and `DELETE` queries, the top-most operator is a special `Insert` or `Delete` operator that modifies the pages on disk.  These operators return a tuple containing the count of the number of affected tuples to the user-level program.

对于实现`INSERT'和`DELETE'查询的计划，最上面的运算符是一个特殊的`Insert'或`Delete'运算符，它修改了磁盘上的页面。 这些操作符向用户级程序返回一个包含受影响 tuple 数量的计数。

<p>
-->

For this lab, you will only need to implement one SimpleDB operator.

对于这个实验，你只需要实现一个SimpleDB操作符。

### Exercise 6.

**Implement the skeleton methods in:**

***

* src/java/simpledb/execution/SeqScan.java

***

This operator sequentially scans all of the tuples from the pages of the table specified by the `tableid` in the constructor. This operator should access tuples through the `DbFile.iterator()` method.

这个操作者从构造函数中的`tableid`指定的表中的页面中顺序扫描所有 tuple 。这个操作符应该通过`DbFile.iterator()`方法访问 tuple 。

At this point, you should be able to complete the ScanTest system test. Good work!

在这一点上，你应该能够完成ScanTest系统测试。干得好!

You will fill in other operators in subsequent labs.

你将在随后的实验中填写其他 operators 。

<a name="query_walkthrough"></a>

### 2.7. A simple query

The purpose of this section is to illustrate how these various components are connected together to process a simple query.

本节的目的是说明这些不同的组件是如何连接在一起以处理一个简单的查询。

Suppose you have a data file, "some_data_file.txt", with the following contents:

假设你有一个数据文件，"some_data_file.txt"，其内容如下。

```
1,1,1
2,2,2 
3,4,4
```

<p>
You can convert this into a binary file that SimpleDB can query as follows:

你可以将其转换成SimpleDB可以查询的二进制文件，如下所示。
<p>
```java -jar dist/simpledb.jar convert some_data_file.txt 3```
<p>
Here, the argument "3" tells conver that the input has 3 columns.

这里，参数 "3 "告诉Conver，输入有3列。
<p>
The following code implements a simple selection query over this file. This code is equivalent to the SQL statement `SELECT * FROM some_data_file`.

下面的代码在这个文件上实现了一个简单的选择查询。这段代码等同于SQL语句`SELECT * FROM some_data_file`。

```
package simpledb;
import java.io.*;

public class test {

    public static void main(String[] argv) {

        // construct a 3-column table schema
        Type types[] = new Type[]{ Type.INT_TYPE, Type.INT_TYPE, Type.INT_TYPE };
        String names[] = new String[]{ "field0", "field1", "field2" };
        TupleDesc descriptor = new TupleDesc(types, names);

        // create the table, associate it with some_data_file.dat
        // and tell the catalog about the schema of this table.
        HeapFile table1 = new HeapFile(new File("some_data_file.dat"), descriptor);
        Database.getCatalog().addTable(table1, "test");

        // construct the query: we use a simple SeqScan, which spoonfeeds
        // tuples via its iterator.
        TransactionId tid = new TransactionId();
        SeqScan f = new SeqScan(tid, table1.getId());

        try {
            // and run it
            f.open();
            while (f.hasNext()) {
                Tuple tup = f.next();
                System.out.println(tup);
            }
            f.close();
            Database.getBufferPool().transactionComplete(tid);
        } catch (Exception e) {
            System.out.println ("Exception : " + e);
        }
    }

}
```

The table we create has three integer fields. To express this, we create a `TupleDesc` object and pass it an array of `Type` objects, and optionally an array of `String` field names. Once we have created this `TupleDesc`, we initialize a `HeapFile` object representing the table stored in `some_data_file.dat`. Once we have created the table, we add it to the catalog. If this were a database server that was already running, we would have this catalog information loaded. We need to load it explicitly to make this code self-contained.

我们创建的表有三个整数字段。为了表达这一点，我们创建了一个`TupleDesc`对象，并传递给它一个`Type`对象数组，还有一个`String`字段名数组。一旦我们创建了这个`TupleDesc`，我们就初始化一个`HeapFile`对象，代表存储在`some_data_file.dat`的表。一旦我们创建了这个表，我们就把它添加到 catalog 中。如果这是一个已经在运行的数据库服务器，我们会加载这个 catalog 信息。我们需要明确地加载它，使这段代码自成一体。

Once we have finished initializing the database system, we create a query plan. Our plan consists only of the `SeqScan` operator that scans the tuples from disk. In general, these operators are instantiated with references to the appropriate table (in the case of `SeqScan`) or child operator (in the case of e.g. Filter). The test program then repeatedly calls `hasNext` and `next` on the `SeqScan` operator. As tuples are output from the `SeqScan`, they are printed out on the command line.

一旦我们完成了数据库系统的初始化，我们就创建一个查询计划。我们的计划只由`SeqScan`操作符组成，它从磁盘上扫描 tuple 。一般来说，这些操作符的实例化需要引用相应的表（在`SeqScan`的情况下）或子操作符（在例如Filter的情况下）。然后测试程序在`SeqScan`运算符上反复调用`hasNext`和`next`。当 tuple 从`SeqScan`中输出时，它们会在命令行中打印出来。

We **strongly recommend** you try this out as a fun end-to-end test that will help you get experience writing your own test programs for simpledb. You should create the file "test.java" in the src/java/simpledb directory with the code above,  and you should add some "import" statement above the code,  and place the `some_data_file.dat` file in the top level directory. Then run:

我们***强烈建议你尝试一下，作为一个有趣的端到端测试，它将帮助你获得为simpledb编写自己的测试程序的经验。你应该在 src/java/simpledb  catalog 中用上面的代码创建 "test.java "文件，你应该在代码上方添加一些 "import "语句，并将 `some_data_file.dat`文件放在顶层 catalog 中。然后运行

```
ant
java -classpath dist/simpledb.jar simpledb.test
```

Note that `ant` compiles `test.java` and generates a new jarfile that contains it.

注意，`ant`编译`test.java`并生成一个包含它的新jarfile。

## 3. Logistics

You must submit your code (see below) as well as a short (2 pages, maximum) writeup describing your approach. This writeup should:

你必须提交你的代码（见下文），以及描述你的方法的简短（最多两页）的文章。这篇报告应该

* Describe any design decisions you made. These may be minimal for Lab 1.
* Discuss and justify any changes you made to the API.
* Describe any missing or incomplete elements of your code.
* Describe how long you spent on the lab, and whether there was anything you found particularly difficult or confusing.

* 描述你做出的任何设计决定。这些可能是实验1的最低限度。
* 讨论并论证你对API所做的任何修改。
* 描述你的代码中任何缺失或不完整的元素。
* 描述你花了多长时间做这个实验，以及是否有任何你认为特别困难或困惑的事情。

### 3.1. Collaboration

This lab should be manageable for a single person, but if you prefer to work with a partner, this is also OK. Larger groups are not allowed. Please indicate clearly who you worked with, if anyone, on your individual writeup.

这个实验对一个人来说应该是可以应付的，但如果你喜欢和一个伙伴一起工作，这也是可以的。不允许有较大的团体。如果有的话，请在你的个人报告中明确指出你和谁一起工作。

### 3.2. Submitting your assignment

<!--

To submit your code, please create a `6.830-lab1.tar.gz` tarball (such that, untarred, it creates a `6.830-lab1/src/simpledb` directory with your code) and submit it on the [6.830 Stellar Site](https://stellar.mit.edu/S/course/6/sp13/6.830/index.html). You can use the `ant handin` target to generate the tarball.

要提交你的代码，请创建一个`6.830-lab1.tar.gz`的压缩包（这样，未经压缩的压缩包会创建一个`6.830-lab1/src/simpledb` catalog ，里面有你的代码），并提交到[6.830 Stellar Site]（https://stellar.mit.edu/S/course/6/sp13/6.830/index.html）。你可以使用`ant handin`目标来生成tarball。
-->

We will be using gradescope to autograde all programming assignments. You should have all been invited to the class instance; if not, please check piazza for an invite code. If you are still having trouble, let us know and we can help you set up. You may submit your code multiple times before the deadline; we will use the latest version as determined by gradescope. Place the write-up in a file called lab1-writeup.txt with your submission. You also need to explicitly add any other files you create, such as new *.java files.

我们将使用gradescope对所有编程作业进行自动评分。你们应该都被邀请到班级实例中去了；如果没有，请在piazza上查询邀请码。如果你仍然有问题，请告诉我们，我们可以帮助你设置。你可以在截止日期前多次提交你的代码；我们将使用由gradescope确定的最新版本。把写好的东西放在一个叫lab1-writeup.txt的文件里，和你的提交一起。你还需要明确地添加你创建的任何其他文件，如新的*.java文件。

The easiest way to submit to gradescope is with `.zip` files containing your code. On Linux/MacOS, you can do so by running the following command:

向 gradescope 提交的最简单方法是使用包含你的代码的 `.zip` 文件。在Linux/MacOS上，你可以通过运行以下命令来实现。


```bash
$ zip -r submission.zip src/ lab1-writeup.txt
```

### 3.3. Submitting a bug

Please submit (friendly!) bug reports to [6.830-staff@mit.edu](mailto:6.830-staff@mit.edu). When you do, please try to include:

请提交（友好的！）错误报告到[6.830-staff@mit.edu](mailto:6.830-staff@mit.edu)。当你这样做时，请尽量包括。

* A description of the bug.
* A .java file we can drop in the test/simpledb directory, compile, and run.
* A .txt file with the data that reproduces the bug. We should be able to convert it to a .dat file using
  HeapFileEncoder.

* 一个关于该错误的描述。
* 一个.java文件，我们可以把它放到test/simpledb catalog 中，编译并运行。
* 一个带有再现该错误的数据的.txt文件。我们应该能够使用HeapFileEncoder将其转换为一个.dat文件。
  HeapFileEncoder.


If you are the first person to report a particular bug in the code, we will give you a candy bar!

如果你是第一个报告代码中某一特定错误的人，我们将给你一个糖果棒!

<!--The latest bug reports/fixes can be found [here](bugs.html).-->

<a name="grading"></a>

### 3.4 Grading

<p>

75% of your grade will be based on whether or not your code passes the system test suite we will run over it. 

你的成绩的75%将基于你的代码是否通过我们将对其进行的系统测试套件。

These tests will be a superset of the tests we have provided. Before handing in your code, you should make sure it produces no errors (passes all of the tests) from both  `ant test` and `ant systemtest`.

这些测试将是我们提供的测试的超集。在提交你的代码之前，你应该确保它在`ant test`和`ant systemtest`中没有产生错误（通过所有的测试）。


**Important:** before testing, gradescope will replace your `build.xml` and the entire contents of the `test` directory with our version of these files. This means you cannot change the format of `.dat` files!  You should also be careful changing our APIs. You should test that your code compiles the unmodified tests.

**重要的是：**在测试之前，gradescope将用我们的这些文件的版本替换你的`build.xml`和`test` catalog 中的全部内容。这意味着你不能改变`.dat`文件的格式!  你也应该小心改变我们的API。你应该测试你的代码是否能编译未修改的测试。

You should get immediate feedback and error outputs for failed tests (if any) from gradescope after submission. The score given will be your grade for the autograded portion of the assignment. An additional 25% of your grade will be based on the quality of your writeup and our subjective evaluation of your code. This part will also be published on gradescope after we finish grading your assignment.

在提交后，你应该从gradescope获得即时反馈和失败测试的错误输出（如果有的话）。给出的分数将是你在作业的自动评分部分的成绩。另外25%的分数将基于你的写作质量和我们对你代码的主观评价。这一部分也将在我们完成作业评分后公布在gradescope上。

We had a lot of fun designing this assignment, and we hope you enjoy hacking on it!

我们在设计这项任务时有很多乐趣，我们希望你喜欢在这上面 hacking。