# lab7

实现用户级线程之间的切换，使用多线程来切换。

切换分支

    $ git fetch
    $ git checkout thread
    $ make clean

## 总结

> 阅读 xv6 手册中的“第7章: 调度”， lec11,13

https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/lec11-thread-switching-robert/


为什么要用多线程？

1. 多个用户共同使用一台机器。
2. 程序结构简单。
3. 多线程在多核机器上可以通过并行实现加速。

线程的状态由三部分组成：

1. PC 
2. 保存变量的寄存器。
3. 程序栈，记录了函数调用的记录栈。

多线程并行的两个策略：

1. 在多核处理器上使用多个 CPU 。
2. 一个 CPU 在多个线程之间切换。

通过其他方式也可以实现并行，例如 event-driven programming 或 state machine ，但线程不是最简单的但却是最有效的。

实现线程面临的挑战：

1. 如何实现线程间的切换，也就是所谓的调度(Scheduling) 。
2. 切换线程时保存并恢复状态。
3. 如何处理密集型线程。

利用中断来处理密集型线程，中断处理程序优先级更高。 具体流程为定时器中断将CPU控制权给到内核，内核再自愿的出让CPU。这也被称之为 pre-emptive scheduling ，即用户代码本身没有让出 CPU 反之则是 voluntary scheduling 。

线程的三种状态：

1. RUNNING，线程当前正在某个CPU上运行。
2. RUNABLE，线程还没有在某个CPU上运行，但是一旦有空闲的CPU就可以运行。
3. SLEEPING 不想运行在CPU上的线程，因为这些线程可能在等待I/O或者其他事件。

从 RUNNING 转变为 RUNABLE 时需要将位于寄存器中的信息(trapframe)拷贝到内存中，例如 PC 。反之则要将之前保存的信息拷贝回对应 CPU 的寄存器中。

用户进程之间的切换流程：首先切换到 a 程序对应的内核进程，然后切换到 b 程序的内核进程，最后切换到 b 程序的用户进程。

程序 a 切换到程序 b 的具体流程： 

1. 将 a 程序内核线程的内核寄存器保存在一个 context 对象中。
2. 恢复 b 程序的 context 对象。
3. b 程序可继续进行中断，然后返回。


1. 一个定时器中断强迫 CPU 从用户空间进程切换到内核，trampoline 代码将用户寄存器保存于用户进程对应的 trapframe 对象中；
2. 在内核中运行 usertrap，来实际执行相应的中断处理程序。这时 CPU 处于进程 P1 的内核线程和内核栈上，执行内核中普通的C代码；
3. 假设进程 P1 对应的内核线程决定它想出让 CPU，它会做很多工作，这个我们稍后会看，但是最后它会调用swtch函数（译注：switch 是C 语言关键字，因此这个函数命名为swtch 来避免冲突），这是整个线程切换的核心函数之一；
4. swtch函数会保存用户进程P1对应内核线程的寄存器至context对象。所以目前为止有两类寄存器：用户寄存器存在trapframe中，内核线程的寄存器存在context中。
   1. CPU 上运行的内核线程可以直接切换到这个 CPU 对应的调度器线程。
   2. swtch 函数会恢复之前为 CPU0 的调度器线程保存的寄存器和 stack pointer，之后就在调度器线程的context 下执行 schedulder 函数。
   3. 在schedulder函数中会做一些清理工作，例如将进程P1设置成RUNABLE状态。
   4. 通过进程表单找到下一个RUNABLE进程。假设找到的下一个进程是P2（虽然也有可能找到的还是P1），schedulder函数会再次调用swtch函数，完成下面步骤：
      1. 先保存自己的寄存器到调度器线程的context对象
      2. 找到进程P2之前保存的context，恢复其中的寄存器
      3. 因为进程 P2 在进入RUNABLE状态之前，如刚刚介绍的进程 P1 一样，必然也调用了swtch函数。所以之前的swtch函数会被恢复，并返回到进程 P2 所在的系统调用或者中断处理程序中（注，因为 P2 进程之前调用 swtch 函数必然在系统调用或者中断处理程序中）。
      4. 不论是系统调用也好中断处理程序也好，在从用户空间进入到内核空间时会保存用户寄存器到trapframe对象。所以当内核程序执行完成之后，trapframe中的用户寄存器会被恢复。
      5. 最后用户进程P2就恢复运行了。

调度器线程：每一个CPU都有一个完全不同的调度器线程。调度器线程也是一种内核线程，它也有自己的context对象。任何运行在CPU1上的进程，当它决定出让CPU，它都会切换到CPU1对应的调度器线程，并由调度器线程切换到下一个进程。

[没看懂，需要反复看！！！](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/lec11-thread-switching-robert/11.4-xv6-thread-switching-2)




## 1. Uthread: switching between threads (moderate)

设计并实现用户级线程上下文切换机制，

uthread.c 包含大多数用户级线程包，以及三个简单测试线程的代码。


## 2. 