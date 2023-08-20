# Lab util

熟悉 xv6 及其系统调用。

https://pdos.csail.mit.edu/6.828/2020/labs/util.html

需要阅读 xv6 book 第一章，下面是一些总结及部分翻译。

## 1. 前置阅读内容总结

- 第一章：操作系统接口
  - OS 需要实现多个程序运行在同一台计算机上。OS 对硬件进程抽象，为上层应用程序提供服务。例如一个文字处理程序不需要关心正在使用哪种类型的磁盘硬件。
  - OS 为程序共享数据，相互交互提供了基础。OS 以接口的形式向用户程序提供服务，一方面希望接口简单，另一方面希望接口提供强大功能。可以通过减少依赖的方式实现，将功能组合进而提高通用性。
  - 本书使用 xv6 来说明 OS 的具体概念。xv6 模仿了Unix的内部设计， Unix 接口设计的很好，精准且与其机制结合得很好，此外提供了很好的通用性。现代操作系统--BSD、Linux、macOS、Solaris，Windows 都和Unix的接口类似。
  - xv6 采用了传统的内核形式，为运行中的程序提供服务的特殊程序。每一个运行中的程序被称之为进程，拥有指令，数据和栈。指令实现了程序的计算。数据是计算作用的变量。堆栈组织了程序的过程调用。进程可以有多个，但通常只有一个内核。
  - 当一个进程需要调用内核服务时，首先调用一个系统调用，即操作系统接口中的一个接口。此后系统调用进入内核，内核执行完成后返回。因此，一个进程在用户空间和内核空间中交替执行。
  - 内核使用 CPU 提供的硬件保护机制来确保每个进程在用户空间执行只能访问自己的内存。内核实现了上述保护硬件权限保护功能。相较于用户程序而言，内核程序拥有更多的权限。用户程序调用系统调用时，内核会提高权限级别并执行内核中预设的功能。
  - 用户态下所看到的接口是内核提供的系统调用。xv6 内核提供了Unix内核传统上提供的服务和系统调用的一个子集。下面列出了xv6的所有系统调用。
    - `int fork()` 创建一个进程，返回子进程的  PID. 
    - `int exit(int status)`  终止当前进程，将状态报告给 wait ，没有返回值。
    - `int wait(int *status)` 等待子进程退出，`*status` 表示退出状态，返回子进程的 PID 。 
    - `int kill(int pid)` 终止进程PID。返回0，或-1为错误。
    - `int getpid()` 返回当前进程的PID。
    - `int sleep(int n)` 暂停n个时钟。
    - `int exec(char *file, char *argv[])` 加载一个文件并带着参数执行，仅在出错时返回。 
    -  `char *sbrk(int n)` 为进程内存扩大 n 个字节，返回新内存的起点。
    - `int open(char *file, int flags)` 打开一个文件；flags 表示读/写；返回一个fd（文件描述符）。
    - `int write(int fd, char *buf, int n)`  从buf写n个字节到文件描述符fd；返回n。
    - `int read(int fd, char *buf, int n)`  向 buf 中读取n个字节；返回读取的数量；如果文件结束则返回 0 。
    - `int close(int fd)` 释放打开的文件fd。
    - `int dup(int fd)` 返回一个新的文件描述符，指的是与 fd 相同的文件。
    - `int pipe(int p[])` 创建一个管道，把读/写文件描述符放在p[0]和p[1]中。
    - `int chdir(char *dir)` 改变当前目录。
    - `int mkdir(char *dir)` 创建一个新的目录。
    - `int mknod(char *file, int, int)`  创建一个设备文件。
    - `int fstat(int fd, struct stat *st)` 将打开的文件的信息放入`*st`。 
    - `int stat(char *file, struct stat *st)` 将一个命名的文件的信息放入`*st`。 
    - `int link(char *file1, char *file2)` 为文件file1创建另一个名字（file2）。 
    - `int unlink(char *file)` 删除一个文件。
    - 通常若不做其他说明，返回 0 表示没有错误，返回 1 表示存在错误。
  - 后续会结合 xv6 代码会详解服务，进程、内存、文件描述符、管道和文件系统，shell 等概念。
  - shell 是用户程序，并非内核的一部分。shell 在用户态下读取命令并执行。shell 的种类有很多，可以随时被替换。xv6 shell 是 Unix Bourne shell 的一个简单实现，具体代码可以在 `user/sh.c:1` 找到。
- 1.1 进程和内存
  - 一个xv6进程由用户空间内存（指令、数据和堆栈）和内核专用的每个进程状态组成。 xv6 采用时间共享的方式来调度进程，从执行的进程组中透明地切换可用的CPU。 当一个进程不执行时，xv6 会保存该进程的 CPU 寄存器，当它下次运行该进程时再恢复这些寄存器。内核通过进程标识符 PID 同每个进程相关联。
  - 进程使用 fork 可以创建新的进程，fork 使得新进程获得了调用进程内存的精确拷贝，包括指令和数据。fork 在原流程和新流程中都会返回。在原进程中，fork 返回新进程的 PID 。在新进程中，fork 返回 0 。原进程和新进程通常被称为父进程和子进程。
  - exit 系统调用使当前进程停止执行，并释放所打开的文件资源，例如内存。exit 的参数是一个整数，通常 0 表示成功，1 表示失败。系统调用返回当前进程的已退出（或已终止）子进程的 PID，并将子进程的退出状态复制到传递给 wait 的地址；如果调用者的子进程没有一个退出，则等待一个退出。如果调用者没有子进程，`wait`立即返回-1。如果父进程不关心子进程的退出状态，则可以传递一个 0 地址`wait`。
  - 父子进程的打印顺序是随机的，取决于父子进程哪个更快调用。子进程推出后父进程返回，随后父进程打印。
  - 虽然子进程与父进程具有相同的内存内容，但父进程和子进程使用单独的内存和单独的寄存器执行：更改一个变量不会影响另一个变量。例如，当`wait`的返回值存储在父进程的`pid`中时，它不会更改子进程中的变量`pid`。子进程中`pid`的值仍然为零。
  - 系统调用将调用进程的内存替换为从文件系统中存储的文件中加载的新内存映像。文件必须具有特定的格式，该格式指定文件的哪一部分保存指令，哪一部分是数据，在哪个指令开始等。Xv6使用ELF格式。通常文件是编译程序源代码的结果。当成功时，它不返回调用程序；相反，从文件加载的指令在ELF标头中声明的切入点开始执行。`exec`有两个参数：分别是可执行文件的文件名和字符串参数数组。例如：

```
char *argv[3];

argv[0] = "echo";
argv[1] = "hello";
argv[2] = 0;
exec("/bin/echo", argv);
printf("exec error\n");
```

  - 这个片段将调用程序替换为`/bin/echo`运行参数列表的程序实例`echo` `hello`。大多数程序忽略参数数组的第一个元素，一般是程序的名称。
  - xv6 shell 使用上面的调用来代表用户运行程序。shell 的主要结构很简单，参见`main`。主循环读取用户的一行输入，然后调用`fork`，创建 shell 进程的副本。父进程调用`wait`，而子进程运行命令。例如，如果在 shell 中输入`echo hello`，则调用`runcmd`时将使用“`echo hello`”作为参数。`runcmd`运行实际的命令。对于"`echo hello`"，它将调用`exec`。如果`exec`成功，则子进程将执行来自`echo`而不是`runcmd`的指令。在某些时候，`echo`将调用`out`，这将导致父进程从`main`中的`wait`返回。
 - 为什么没有在一次调用中合并；稍后将看到shell在其I/O重定向的实现中利用了分离。为了避免创建重复进程然后立即替换它（用`exec`）的浪费，操作内核通过使用虚拟内存技术（如写时复制）来优化此用例的`fork`的实现。
 - Xv6隐式分配大多数用户空间内存：分配父内存的子副本所需的内存，并分配足够的内存来保存可执行文件。在运行时需要更多内存的进程可以调用`sbrk（n）`将其数据内存增加`n`个字节；返回新内存的位置。
- 1.2 I/O和文件描述符
  - 文件描述符是一个整数，用来表示文件，目录或设备。xv6  使用文件描述符作为每个进程表的索引。每个进程都拥有。
  - 在内部，xv6内核使用文件描述符作为每个进程表的索引，每个进程都有一个自己的文件描述符空间，并从零开始编号。通常情况下一个进程从文件描述符0（标准输入）读取信息，将输出写入文件描述符1（标准输出），并将错误信息写入文件描述符2（标准错误）。shell 利用约定来实现I/O重定向和管道。shell确保它始终打开三个文件描述符，默认情况下是控制台的文件描述符。
  - 调用`read(fd, buf, n)`从文件描述符`fd`中最多读取`n`个字节，将其复制到`buf`中，并返回读取的字节数。指向一个文件的每个文件描述符都有一个与之相关的偏移量。读取 "从当前文件的偏移量读取数据，然后将该偏移量向前推进多少个字节：随后的 "读取 "将返回第一个 "读取 "所返回的字节之后的数据。当没有更多的字节可读时，`read`返回0，表示文件的结束。
  - 调用 `write(fd，buf，n)`将`n`个字节从`buf`写入文件描述符`fd`并返回写入的字节数。只有在发生错误时才写入少于`n`个字节。与`read`一样，`write`将数据写入当前文件偏移量，然后将偏移量向前推进写入的字节数：每次`写入`在前一次停止的地方进行。
  - 下面的程序片段（构成程序`cat`的本质）将数据从其标准输入复制到其标准输出。如果发生错误，它会向标准错误写入一条消息。

```c
char buf[512];
int n;

for(;;){
  n = read(0, buf, sizeof buf);
  if(n == 0)
    break;
  if(n < 0){
    fprintf(2, "read error\n");
    exit(1);
  }
  if(write(1, buf, n) != n){
    fprintf(2, "write error\n");
    exit(1);
  }
}
```

  - 在代码片段中需要注意的重要一点是，`cat`不知道是在读取文件、控制台还是管道。同样，`cat`也不知道它是在打印到控制台、文件还是其他什么。文件描述符的使用以及文件描述符0输入和文件描述符1输出的约定允许`cat`的简单实现。
  - 这个`close`系统调用释放了一个文件描述符，使得它可以在将来的`open`、`tube`或`dup`系统调用中自由使用（见下文）。新分配的文件描述符总是当前进程中编号最低的未使用描述符。
  - 文件描述符和交互使I/O重定向易于实现。`fork`复制父进程的文件描述符表及其内存，以便子进程开始时与父进程完全相同的打开文件。系统调用替换调用进程的内存，但保留其文件表。这种行为允许shell通过 fork 来实现，在子进程中重新打开选定的文件描述符，然后调用`exec`来运行新程序。以下是shell为命令`cat` `<` `input.txt`运行的代码的简化版本：

```
char *argv[2];

argv[0] = "cat";
argv[1] = 0;
if(fork() == 0) {
  close(0);
  open("input.txt", O_RDONLY);
  exec("cat", argv);
}
```

  - 子进程关闭文件描述符 0 后，`open`保证为新打开的文件使用该文件描述符`input.txt`：0将是最小的可用文件描述符。`cat`然后执行文件描述符0（标准输入）引用`input.txt`。父进程的文件描述符不会被这个序列改变，因为它只修改子进程的描述符。
  - xv6 shell中的I/O重定向代码就是这样工作的。回想一下，在代码的这一点上，shell已经 fork 了子shell，`runcmd`将调用`exec`来加载新程序。
  - 第二个参数`open`由一组标志组成，表示为位，用于控制`open`的作用。可能的值在文件控制（fcntl）头中定义：`O_RDONLY`、`O_WRONLY`、`O_RDWR`、`O_CREATE`和`O_TRUNC`，指示`open`打开文件以进行读取或写入，或同时进行读取和写入，如果文件不存在则创建文件，并将文件截断为零长度。
  - 现在应该很清楚为什么`fork`和`exec`是分开的调用是有帮助的：在两者之间，shell 有机会重定向子进程的I/O而不会干扰主shell的I/O设置。人们可以想象一个假设的组合`forkexec`系统调用，但是用这样的调用进行I/O重定向的选项看起来很尴尬。shell可以在调用`forkexec`之前修改自己的I/O设置（然后取消这些修改）；或者`forkexec`可以将I/O重定向的指令作为参数；或者（最不吸引人的）每个程序（如`cat`）都可以被教导做自己的I/O重定向。
  - 尽管`fork`复制了文件描述符表，但每个基础文件偏移量都在父文件和子文件之间共享。

```
if(fork() == 0) {
  write(1, "hello ", 6);
  exit(0);
} else {
  wait(0);
  write(1, "world\n", 6);
}
```

  - 在这个片段的末尾，附加到文件描述符1的文件将包含数据`hello` `world`。父级中的`write`（由于`wait`，只有在子级完成后才运行）从子级`写`停止的地方开始。这种行为有助于从shell命令序列中产生顺序输出，例如`（echo` `hello`；`echo` `world）` `>output.txt`。
  - 这个`dup`系统调用复制了一个现有的文件描述符，返回一个新的文件描述符，它引用同一个底层I/O对象。两个文件描述符共享一个偏移量，就像`fork`复制的文件描述符一样。这是另一种将`hello` `world`写入文件的方法：

```
fd = dup(1);
write(1, "hello ", 6);
write(fd, "world\n", 6);
```

  - 如果两个文件描述符通过一系列`fork`和`dup`调用从相同的原始文件描述符派生，则它们共享偏移量。否则，文件描述符不共享偏移量，即使它们是由对同一文件的`打开`调用引起的。`dup`允许shell实现如下命令：`ls` `现有文件` `非现有文件` `>` `tmp1` `2>&1`。`2>&1`告诉shell给命令一个文件描述符2，它是描述符1的副本。现有文件的名称和不存在文件的错误消息都将显示在文件`tmp1`中。xv6 shell不支持错误文件描述符的I/O重定向，但现在您知道如何实现它了。
  - 文件描述符是一个强大的抽象，因为它们隐藏了它们所连接的细节：写入文件描述符1的进程可能正在写入文件、控制台等设备或管道。
- 1.3 管道
  - A是一个小内核缓冲区，作为一对文件描述符暴露给进程，一个用于读取，一个用于写入。将数据写入管道的一端可以从管道的另一端读取数据。管道为进程提供了一种通信方式。
  - 下面的示例代码运行程序`wc`，其标准输入连接到管道的读取端。

```
int p[2];
char *argv[2];

argv[0] = "wc";
argv[1] = 0;

pipe(p);
if(fork() == 0) {
  close(0);
  dup(p[0]);
  close(p[0]);
  close(p[1]);
  exec("/bin/wc", argv);
} else {
  close(p[0]);
  write(p[1], "hello world\n", 12);
  close(p[1]);
}
```

  - 程序调用`pipe`，它创建一个新的管道，并记录数组`p`中的读写文件描述符。在`fork`之后，父级和子级都有引用管道的文件描述符。子级调用`over`和`dup`使文件描述符零引用管道的读取端，关闭`p`中的文件描述符，并调用`exec`运行`wc`。当`wc`从其标准输入读取时，它从管道读取。父级关闭管道的读取端，写入管道，然后关闭写入端。
  - 如果没有可用的数据，管道上的`读取`等待写入数据或关闭所有引用写入端的文件描述符；在后一种情况下，`读取`将返回0，就像到达数据文件的末尾一样。`读取`阻塞直到新数据不可能到达的事实是子级在执行上述`wc`之前关闭管道的写入端很重要的原因之一：如果`wc`的文件描述符之一引用管道的写入端，`wc`将永远不会看到文件结束。
  - xv6 shell以类似于上述代码的方式实现`grep fork sh. c|wc-l`之类的管道。子进程创建一个管道来连接管道的左端和右端。然后它调用管道的左端的`fork`和`runcmd`，调用管道的右端的`fork`和`runcmd`，并等待两者都完成。管道的右端可能是一个命令，它本身包括一个管道（例如，`a` `|` `b` `|` `c）`，它本身分叉两个新的子进程（一个用于`b`，一个用于`c`）。因此，shell可以创建一个进程树。这棵树的叶子是命令，内部节点是等待左右子进程完成的进程。

```
echo hello world | wc
```

  - 可以在没有管道的情况下实现

```
echo hello world >/tmp/xyz; wc </tmp/xyz
```


  - 在这种情况下，管道与临时文件相比至少有三个优点。首先，管道会自动清理自己；使用文件重定向，shell在完成时必须小心删除`/tmp/xyz`。其次，管道可以传递任意长的数据流，而文件重定向需要磁盘上足够的可用空间来存储所有数据。第三，管道允许并行执行管道阶段，而文件方法要求第一个程序在第二个程序启动之前完成。
- 1.4 文件系统
  - xv6文件系统提供数据文件，其中包含未解释的字节数组，以及目录，其中包含对数据文件和其他目录的命名引用。这些目录形成一棵树，从一个名为的特殊目录开始。a like`/a/b/c`指的是根目录`/`中名为`a`的目录内名为`b`的目录内名为`c`的文件或目录。不以`/`开头的路径相对于调用进程的路径进行评估，可以通过`chdir`系统调用更改。这两个代码片段打开同一个文件（假设所有涉及的目录都存在）：

```
chdir("/a");
chdir("b");
open("c", O_RDONLY);

open("/a/b/c", O_RDONLY);
```

  - 第一个片段将进程的当前目录更改为`/a/b`；第二个片段既不引用也不更改进程的当前目录。
  - 有创建新文件和目录的系统调用：`mkdir`创建一个新目录，使用`O_CREATE`标志`打开`创建一个新数据文件，`mKnod`创建一个新设备文件。

```
mkdir("/dir");
fd = open("/dir/file", O_CREATE|O_WRONLY);
close(fd);
mknod("/console", 1, 1);
```

  - `mKnod`创建一个引用设备的特殊文件。与设备文件关联的是主要和次要设备号（`mKnod`的两个参数），它们唯一标识内核设备。当进程稍后打开设备文件时，内核将`读取`和`写入`系统调用转移到内核设备实现，而不是将它们传递给文件系统。
  - 文件名与文件本身不同；同一个底层文件，称为an，可以有多个名称。每个链接由目录中的一个条目组成；该条目包含文件名和对inode的引用。inode包含关于文件的内容，包括其类型（文件或目录或设备）、长度、文件内容在磁盘上的位置以及文件链接的数量。
  - 该`fstat`系统调用从文件描述符引用的inode中检索信息。它填充一个`struct` `stat`，在`stat. h`中定义为：

```
#define T_DIR     1   // Directory
#define T_FILE    2   // File
#define T_DEVICE  3   // Device

struct stat {
  int dev;     // File system's disk device
  uint ino;    // Inode number
  short type;  // Type of file
  short nlink; // Number of links to file
  uint64 size; // Size of file in bytes
};
```

  - 这个`link`系统调用创建了另一个文件系统名，它引用了与现有文件相同的inode。这个片段创建了一个名为`a`和`b`的新文件。

```
open("a", O_CREATE|O_WRONLY);
link("a", "b");
```

  - 读取或写入`a`与读取或写入`b`相同。每个inode由唯一的 `_inode_ _number_` 标识。在上面的代码序列之后，可以通过检查`fstat`的结果来确定`a`和`b`引用相同的底层内容：两者都将返回相同的inode编号（`ino`），并且`nlink`计数将设置为2。
  - 该`解除关联`系统调用从文件系统中删除一个名称。只有当文件的链接计数为零且没有文件描述符引用它时，才释放文件的inode和保存其内容的磁盘空间

```
unlink("a");
```

  - 到最后一个代码序列，使inode和文件内容可以作为`b`访问。此外，

```
fd = open("/tmp/xyz", O_CREATE|O_RDWR);
unlink("/tmp/xyz");
```


  - 是一种创建没有名称的临时inode的惯用方法，该inode将在进程关闭`fd`或退出时被清理。
  - Unix提供了可从shell调用的文件实用程序作为用户级程序，例如`mkdir`、`ln`和`rm`。这种设计允许任何人通过添加新的用户级程序来扩展命令行界面。事后看来，这个计划似乎很明显，但在Unix时代设计的其他系统经常将这样的命令构建到shell中（并将shell构建到内核中）。
  - 一个例外是`cd`，它内置在shell中。`cd`必须改变shell本身的当前工作目录。如果`cd`作为常规命令运行，那么shell将分叉一个子进程，子进程将运行`cd`，`cd`将改变_子_的工作目录。父的（即shell的）工作目录不会改变。
- 1.5 现实世界
  - Unix结合了“标准”文件描述符、管道和方便的shell语法，这是编写通用可重用程序的一个重大进步。这个想法引发了一种“软件工具”文化，这种文化是Unix强大和流行的主要原因，shell是第一个所谓的“脚本语言”。Unix系统调用接口今天仍然存在于BSD、Linux和macOS等系统中。
  - Unix系统调用接口已经通过可移植操作系统接口（POSIX）标准进行了标准化。Xv6_不_符合POSIX标准：它缺少许多系统调用（包括基本的系统调用，如`lsearch`），并且它提供的许多系统调用与标准不同。我们对xv6的主要目标是简单和清晰，同时提供一个简单的UNIX系统调用接口。一些人已经扩展了xv6，增加了一些系统调用和一个简单的C库，以便运行基本的Unix程序。然而，现代内核提供了比xv6更多的系统调用和更多种类的内核服务。例如，它们支持网络、窗口系统、用户级线程、许多设备的驱动程序等。现代内核不断快速发展，并提供POSIX以外的许多功能。
  - Unix通过一组文件名和文件描述符接口统一访问多种类型的资源（文件、目录和设备）。这个想法可以扩展到更多种类的资源；一个很好的例子是Plan 9，它将“资源就是文件”的概念应用于网络、图形等。然而，大多数Unix派生的操作系统并没有遵循这条路线。
  - 文件系统和文件描述符是强大的抽象。即便如此，操作系统接口还有其他模型。Unix的前身Multics对文件存储进行了抽象，使其看起来像内存，从而产生了非常不同的界面风格。Multics设计的复杂性直接影响了Unix的设计者，他们的目标是构建更简单的东西。
  - Xv6没有提供用户或保护一个用户免受另一个用户的概念；在Unix术语中，所有xv6进程都以root身份运行。本书探讨了xv6如何实现其类Unix接口，但这些思想和概念不仅仅适用于Unix。任何操作系统都必须将进程多路复用到底层硬件上，将进程相互隔离，并提供受控进程间通信的机制。在学习了xv6之后，您应该能够查看其他更复杂的操作系统，并了解这些系统中xv6背后的概念。


## 2. 实验

### sleep (easy)

在 xv6 中实现 Unix 中的 sleep 命令。

```cpp
int
main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(2, "input error!\n");
        exit(1);
    }else {
        int k = atoi(argv[1]);
        sleep(k);
    }
    exit(0);
}
```

    $ sleep 2 

argc = 2
argv[0] = sleep
argv[1] = 2


### pingpong (easy)

```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

int
main(int argc, char *argv[]) {
    int p2c[2], c2p[2];
    pipe(p2c); pipe(c2p);
    char buf[64];

    if (fork() > 0) {
        write(p2c[1], "ping", 4);
        read(c2p[0], buf, 4);
        printf("%d: received %s\n", getpid(), buf);
    }else {
        read(p2c[0], buf, 4);
        printf("%d: received %s\n", getpid(), buf);
        write(c2p[1], "pong", 4);
    }
    exit(0);
}
```

### primes (moderate)/(hard)

```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

void prime(int rd){
    int n;
    read(rd, &n, 4);
    printf("prime %d\n", n);
    int created = 0;
    int p[2];
    int num;
    while(read(rd, &num, 4) != 0){
        if(created == 0){
            pipe(p);
            created = 1;
            int pid = fork();
            if(pid == 0){
                close(p[1]);
                prime(p[0]);
                return;
            }else{
                close(p[0]);
            }
        }
        if(num % n != 0){
            write(p[1], &num, 4);
        }
    }
    close(rd);
    close(p[1]);
    wait(0);
}

int
main(int argc, char *argv[]){
    int p[2];
    pipe(p);
    // 父进程
    if(fork() != 0){
        close(p[0]);
        for(int i = 2; i <= 35; i++){
            // 第一个参数是文件描述符
            // 第二个参数是数据的指针
            // 第三个参数是要写入的字节数
            write(p[1], &i, 4);
        }
        close(p[1]);
        wait(0);
    }else{
        // 子进程
        close(p[1]);
        prime(p[0]);
        close(p[0]);
    }
    exit(0);
}
```

### find (moderate

照着 ls.c 改就行了。

```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"
#include "kernel/fs.h"

char* fmtname(char * path)
{
    static char buf[DIRSIZ+1];
    char *p;
    
    for (p = path + strlen(path); p >= path && *p != '/'; p--);
    p ++;
    if (strlen(p) >= DIRSIZ) return p;
    memmove(buf, p, strlen(p));
    buf[strlen(p)] = 0;
    return buf;
}

void
find(char *path,char *name)
{
  char buf[512], *p;
  int fd;
  struct dirent de;
  struct stat st;

  if((fd = open(path, 0)) < 0){
    fprintf(2, "ls: cannot open %s\n", path);
    return;
  }

  if(fstat(fd, &st) < 0){
    fprintf(2, "ls: cannot stat %s\n", path);
    close(fd);
    return;
  }

  switch(st.type){
  case T_FILE:
    if (strcmp(fmtname(path), name) == 0) printf("%s\n", path);
    break;

  case T_DIR:
    if(strlen(path) + 1 + DIRSIZ + 1 > sizeof buf){
      printf("ls: path too long\n");
      break;
    }
    strcpy(buf, path);
    p = buf+strlen(buf);
    *p++ = '/';
    while(read(fd, &de, sizeof(de)) == sizeof(de)){
      if(de.inum == 0)
        continue;
      memmove(p, de.name, DIRSIZ);
      p[DIRSIZ] = 0;
      // 忽略当前目录和父目录
      if (!strcmp(de.name, ".") || !strcmp(de.name, "..")) continue;
      find(buf, name);
    }
    break;
  }
  close(fd);
}

int
main(int argc, char *argv[])
{
    if (argc != 3) {
        fprintf(2, "usage: find [path] [patten]\n");
        exit(1);
    }
    find(argv[1], argv[2]);
    exit(0);
}
```

### xargs (moderate)

```
$ echo hello | xargs echo aa aaa aaa
aa aaa aaa hello

argv[0]: xargs
argv[1]: echo
argv[2]: aa
argv[3]: aaa
argv[4]: aaa    
```

```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"


int
main(int argc, char *argv[]) {
    if(argc < 2) {
        printf("Usage: xargs [command]\n");
        exit(-1);
    }
    // 拿到当前进程的标准化输入
    char buf[16];
    read(0, buf, 16);

    // 构造完整参数
    char *xargv[16];
    int xargc = 0;
    for (int i = 1; i < argc; i++) {
        xargv[xargc++] = argv[i];
    }

    // 遍历标准输入
    char *p = buf;
    for (int i = 0; i < 16; i++) {
        if (buf[i] == '\n') {
            if (fork() > 0) {
                p = &buf[i + 1];
                wait(0);
            }else {
                // 把标准输入放入指定位置
                buf[i] = 0;
                xargv[xargc] = p; 
                xargc++;
                xargv[xargc] = 0;
                xargc++;

                exec(xargv[0] , xargv);
                exit(0);
            }
        }
    }
    wait(0);
    exit(0);
}
```

```
$ ./grade-lab-util
make: 'kernel/kernel' is up to date.
== Test sleep, no arguments == sleep, no arguments: OK (2.8s)
== Test sleep, returns == sleep, returns: OK (0.8s)
== Test sleep, makes syscall == sleep, makes syscall: OK (0.8s)
== Test pingpong == pingpong: OK (1.1s)
== Test primes == primes: OK (0.9s)
== Test find, in current directory == find, in current directory: OK (1.0s)
== Test find, recursive == find, recursive: OK (1.1s)
== Test xargs == xargs: OK (1.1s)
== Test time ==
time: OK
Score: 100/100
```