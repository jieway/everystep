# Lab cow

* [实验手册](http://xv6.dgs.zone/labs/requirements/lab6.html)

* [lec09-interrupts](https://mit-public-courses-cn-translatio.gitbook.io/mit6-s081/lec09-interrupts)

实现 Copy On Write Fork, 这个概念在 lec8 中已经讲过了.

不能随便释放物理页,因为共享页可能有多个 PTE 引用.释放时需要保证不能有其他 PTE 的引用.

> 在 shell 中执行指令时，首先会 fork 一个子进程，然后在子进程中使用 exec 执行 shell 中的指令。在这个过程中，fork 需要完整的拷贝所有父进程的地址空间，但在 exec 执行时，又会完全丢弃这个地址空间，创建一个新的，因此会造成很大的浪费。

> 为了优化这个特定场景（fork 时）的内存利用率，我们可以在 fork 时，并不实际分配内存（与上一个实验的懒分配很像），而是让子进程和父进程共享相同的内存区域（页表不同，但指向的物理地址相同）。但为了保证进程之间的隔离性，我们不能同时对这块区域进行写操作，因此，设置共享的内存地址只有读权限。当需要向内存页中写入数据时，会触发缺页中断，此时再拷贝一个内存页，更新进程的页表，将内容写进去，然后重新执行刚才出错的指令。

切换分支


    $ git fetch
    $ git checkout cow
    $ make clean

## Implement copy-on write (hard)

目标:实现 COW 并通过 cowtest 和 usertests .

1. 修改 uvmcopy() 父子进程共享物理页并将该页设置为只读,也就是清除 PTE_W 标志。设置 PTE_W 非法可以参考 uvmclear() . 
2. 设置 PTE_COW 方便识别. 利用 RSW (reserved for software) 位来表示.
3. 为每一个物理页设置引用计数,统计引用该页的次数.也就是设置数组,数组的每一位表示该页的引用次数. kmem 表示物理页.
4. CHUfreerange 表示释放范围内的物理页,释放的时候将页面的引用次数设置为 1 .
5. 在 usertrap 中捕获 page falut ,为 cow page 分配物理内存.
6. 使用 kalloc() 进行内存分配时，需要将对应 page 的 reference count 设置为 1，使用kfree()释放内存时，只能将reference count为 0 的页面放回空闲列表。
7. 注意读写的时候需要加锁.
8. 处理 copyout() , 从内核复制到用户时需要分配相应的物理内存.

## 参考

1. https://www.wmc1999.top/posts/6-s081-lab6-cow/