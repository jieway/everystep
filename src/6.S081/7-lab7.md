# Lab thread

[实验手册](http://xv6.dgs.zone/labs/requirements/lab7.html)

实现用户级线程之间的切换，使用多线程来切换。

切换分支

    $ git fetch
    $ git checkout thread
    $ make clean

## 总结

[lec09-interrupts](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/lec09-interrupts)

中断的场景：
  
1. 网卡收到了一个packet，网卡会生成一个中断。
2. 用户通过键盘按下了一个按键，键盘会产生一个中断。

操作系统需要做的是，保存当前的工作，处理中断，处理完成之后再恢复之前的工作。

系统调用，page fault，中断，都使用相同的机制但是又不完全一样。

中断与系统调用的三个差别：

1. asynchronous 系统调用发生在正在运行进程的 context 中，而中断于当前运行在 CPU 上的进程没有任何关系。
2. concurrency CPU和生成中断的设备是并行的在运行。
3. program device 每个设备都有一个编程手册，就像RISC-V有一个包含了指令和寄存器的手册一样。设备的编程手册包含了它有什么样的寄存器，它能执行什么样的操作，在读写控制寄存器的时候，设备会如何响应。

PLIC(Platform Level Interrupt Control)会管理来自于外设的中断。

53 个不同的来自于设备的中断经过 PLIC 路由到某个 CPU 的核中处理。

1. PLIC会通知当前有一个待处理的中断
2. 其中一个CPU核会Claim接收中断，这样PLIC就不会把中断发给其他的CPU处理
3. CPU核处理完中断之后，CPU会通知PLIC
4. PLIC将不再保存中断的信息

Console是如何显示出“$ ls” 其中“ $ ”是Shell程序的输出，而“ls”是用户通过键盘输入之后再显示出来的。

位于 sh.c getcmd() 中，设备会将字符传输给UART的寄存器，UART之后会在发送完字符之后产生一个中断。
在QEMU中，模拟的线路的另一端会有另一个UART芯片（模拟的），这个UART芯片连接到了虚拟的Console，它会进一步将“$ ”显示在console上。

对于“ls”，这是用户输入的字符。键盘连接到了UART的输入线路，当你在键盘上按下一个按键，UART芯片会将按键字符通过串口线发送到另一端的UART芯片。另一端的UART芯片先将数据bit合并成一个Byte，之后再产生一个中断，并告诉处理器说这里有一个来自于键盘的字符。之后Interrupt handler会处理来自于UART的字符。

* 位于start.c的start函数。在机器模式的 stack0 下从 entry.S 在这里以机器模式跳到这个函数上。
  * 这里将所有的中断都设置在Supervisor mode，然后设置SIE寄存器来接收External，软件和定时器中断，之后初始化定时器。
  * 处理 main 函数
    * 第一个外设是 console，处理 consoleinit 函数
      * 初始化锁
      * 调用了 uartinit 配置好UART芯片使其可以被使用。
        * 关闭中断
        * 设置波特率(串口线的传输速率)
        * 设置字符长度为8bit
        * 重置FIFO
        * 重新打开中断
    * 调用plicinit函数
      * 代码的第一行使能了UART的中断，这里实际上就是设置PLIC会接收哪些中断，进而将中断路由到CPU。
      * 代码的第二行设置PLIC接收来自IO磁盘的中断。
    * plicinithart函数
      * plicinit是由0号CPU运行，之后，每个CPU的核都需要调用plicinithart函数表明对于哪些外设中断感兴趣。
      * 在plicinithart函数中，每个CPU的核都表明自己对来自于UART和VIRTIO的中断感兴趣。因为我们忽略中断的优先级，所以我们将优先级设置为0。
  * 此时已经有了生成中断的外部设备，我们有了PLIC可以传递中断到单个的CPU。
  * 在main函数的最后，程序调用了scheduler函数，
    * scheduler函数主要是运行进程。但是在实际运行进程之前，会执行intr_on函数来使得CPU能接收中断。
      * intr_on函数只完成一件事情，就是设置SSTATUS寄存器，打开中断标志位。
  * 在这个时间点，中断被完全打开了。如果PLIC正好有pending的中断，那么这个CPU核会收到中断。





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

## xv6 book ch7

三个问题：

1. 如何从一个进程切换到另一个进程？
2. 如何对用户进程透明的强制切换？
3. 许多 CPU 可能会在进程间并发切换，需要设计一个锁来避免竞争。
4. 第四，当进程退出时，必须释放进程的内存和其他资源，但它自己不能做到这一切，因为它不能释放自己的内核栈，同时又在使用内核栈。
5. 第五，多核机器的每个内核必须记住它正在执行的进程，这样系统调用就会修改相应进程的内核状态。

## 1. Uthread: switching between threads (moderate)

设计并实现用户级线程上下文切换机制，

有三个文件：

1. `user/uthread.c` 包含大多数用户级线程包，以及三个简单测试线程的代码。
2. `user/uthread_switch.S`
3. `Makefile` 构建 uthread 程序

任务：

1. 实现线程的保存和恢复。
2. 线程之间的切换。

通过 `make grade` 

将代码添加下面两个文件中的函数

* `user/uthread.c` 中的 thread_create() 和 thread_schedule()
* `user/uthread_switch.S` 中的 thread_switch()

当 thread_schedule() 第一次运行给定线程时，该线程在自己的栈上执行传递给 thread_create() 的函数。

另一个目标是确保 thread_switch() 保存被切换线程的寄存器，恢复切换到线程的寄存器，并返回到后一个线程指令中最后停止的点。

必须决定保存/恢复寄存器的位置；修改 struct thread 以保存寄存器是一个很好的计划。

您需要在 thread_schedule 中添加对 thread_switch 的调用；您可以将需要的任何参数传递给thread_switch，但目的是将线程从t切换到 next_thread。

1. thread_switch 只需要保存/还原被调用方保存的寄存器

保存 callee-save register 中的内容。

2. 在 `user/uthread.asm` 中可以看到 uthread 的汇编代码，这对于调试可能很方便。


1. 为线程的结构体 `struct thread` 添加需要保存的 `struct context ctx;`。其中 context 从 `kernel/proc.h` 中复制，这些是需要保存的 callee 寄存器。

保存到哪里？

2. `thread_create()` 中更新寄存器 ra 和 sp 的值。

ra 是什么？ sp 是什么？

3. 在 `thread_schedule` 中调用 `thread_switch` 实现线程上下文切换。

4. `thread_switch` 具体在 `user/uthread_switch.S` 中实现，可参考 `swtch.S`

输入 make grade 

## 2. Using threads (moderate)

多线程情况下同时对同一个桶执行插入操作的时候可能回导致数据丢失。

  $ make ph
  $ ./ph 1

创建互斥锁：

静态创建：`pthread_mutex_t lock[NBUCKET] = { PTHREAD_MUTEX_INITIALIZER };` 

也可以用动态的方式创建 `pthread_mutex_init(&locks[i], NULL);  //NULL为默认的互斥锁` 但是需要在main 函数中初始化。

然后对 insert 加互斥锁即可，get 的时候不会有问题。

## 3. Barrier(moderate)

记录当前已经来临的线程，如果线程达到上限就唤醒所有线程然后释放锁，反之则使来临的线程沉睡，醒来后重新获取锁。


