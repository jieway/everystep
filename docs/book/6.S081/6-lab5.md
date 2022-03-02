# Lab5

* 阅读 [Lab: xv6 lazy page allocation](https://pdos.csail.mit.edu/6.S081/2020/labs/lazy.html) 。
* 阅读 [Lec8](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/lec08-page-faults-frans)


## 0. 总结

在XV6中，一旦用户空间进程触发了page fault，会导致进程被杀掉。这是非常保守的处理方式。

虚拟内存的两个优点：Isolation，level of indirection 。

trampoline page，它使得内核可以将一个物理内存page映射到多个用户地址空间中。

guard page，它同时在内核空间和用户空间用来保护Stack。

直接映射表示虚拟地址就是物理地址。

page fault 三个有价值的信息：

* 引起page fault的内存地址。
* 引起page fault的原因类型。
* 引起page fault时的程序计数器值，这表明了page fault在用户空间发生的位置。

