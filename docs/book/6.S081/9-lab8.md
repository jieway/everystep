# Lab lock

首先切换代码：

    $ git fetch
    $ git checkout lock
    $ make clean

前置内容：

    第6章：《锁》和相应的代码。
    第3.5节：《代码：物理内存分配》
    第8.1节至第8.3节：《概述》、《Buffer cache层》和《代码：Buffer cache》

## 总结

在多核机器上并行性差的原因是因为锁的争用。

这个实验必须跑在多核机器上！

通过 kalloctest 可以判断锁的争夺次数，通过 usertests sbrkmuch 判断是否可以正常分配内存。确保通过 usertests 和 make grade 。

使用 cpuid 返回当前内核时需要关闭中断(push_off)，用完后再打开(push_off)。

锁优化的两个思路：

1. 能不共享就不共享。
2. 非得共享就尽可能的降低锁的粒度。

## Memory allocator(moderate)

`user/kalloctest.c` 中三个进程的地址空间对kalloc和kfree的多次调用。

优化前锁的正用情况：

    $  kalloctest
    start test1
    test1 results:
    --- lock kmem/bcache stats
    lock: kmem: #fetch-and-add 14549 #acquire() 433016
    lock: bcache: #fetch-and-add 0 #acquire() 1242
    --- top 5 contended locks:
    lock: proc: #fetch-and-add 94663 #acquire() 505245
    lock: proc: #fetch-and-add 41749 #acquire() 505570
    lock: proc: #fetch-and-add 31109 #acquire() 505573
    lock: kmem: #fetch-and-add 14549 #acquire() 433016
    lock: virtio_disk: #fetch-and-add 13668 #acquire() 114
    tot= 14549
    test1 FAIL
    start test2
    total free number of pages: 32499 (out of 32768)

重新设计 kalloc.c 降低对 kmem 锁的争用，从而提高并行性。

之前是对一个整个 freelist 直接上锁，一个 CPU 占用后就不能再用了。

> 此处用到了第一个策略，能不共享就不共享。

可以将 freelist 拆分，为每个 CPU 分配独立的 freelist 从而支持多个 CPU 同时申请内存，也就是并发。

除此之外可能存在某个 CPU 申请过猛的情况，也就是 freelist 不够用了，此时可以从别的 CPU 对应的 freelist 中借。

1. 修改 kmem 数据结构，改为数组实现，分别对应不同的 CPU 。
2. 修改 kfree，之前是直接删，现在需要获得 cpuid ，而 hind 提及获取 cpuid 时需要关闭中断。
3. CPU 中 freelist 不够用了，可以从别的 freelist 中借。借有两种策略，一种是直接对着一个收割，另一种是均匀收割。均匀收割的话不数字不能太大，否则依旧存在锁征用。

下面是 64 个块均匀收割的输出：

    --- lock kmem/bcache stats
    lock: kmem_cpu_0: #fetch-and-add 41 #acquire() 577717
    lock: kmem_cpu_1: #fetch-and-add 0 #acquire() 2358581
    lock: kmem_cpu_2: #fetch-and-add 0 #acquire() 1973063
    lock: kmem_cpu_3: #fetch-and-add 0 #acquire() 380552
    lock: kmem_cpu_4: #fetch-and-add 0 #acquire() 380552
    lock: kmem_cpu_5: #fetch-and-add 0 #acquire() 380552
    lock: kmem_cpu_6: #fetch-and-add 0 #acquire() 380552
    lock: kmem_cpu_7: #fetch-and-add 0 #acquire() 380552

下面是 32 个块均匀收割的输出：

    --- lock kmem/bcache stats
    lock: kmem_cpu_0: #fetch-and-add 0 #acquire() 87445
    lock: kmem_cpu_1: #fetch-and-add 0 #acquire() 174204
    lock: kmem_cpu_2: #fetch-and-add 0 #acquire() 171477
    lock: kmem_cpu_3: #fetch-and-add 0 #acquire() 55
    lock: kmem_cpu_4: #fetch-and-add 0 #acquire() 55
    lock: kmem_cpu_5: #fetch-and-add 0 #acquire() 55
    lock: kmem_cpu_6: #fetch-and-add 0 #acquire() 55
    lock: kmem_cpu_7: #fetch-and-add 0 #acquire() 55

显然在均匀收割的情况下，32 较为合理。

## Buffer cache (hard)

优化 Buffer cache 部分的锁征用问题。

和 kalloc 不同的是，kalloc 是一个 CPU 占用一个 freelist ，而此处则是一个 Buffer cache 可被多个 CPU 访问。所以不能从能不共享就不共享的角度来处理，而是从尽可能降低锁的粒度的角度处理。

此前是将一整个 Buffer cache 链表加锁。可以改为数组加链表，当两个进程同时访问数组的同一个位置时才加锁，这样可以细化锁的粒度，从而降低并发。

换成数组加链表：

1. 首先根据 dev 和 blockno 生成对应索引，查看对应桶中的是否存在 blockno 。
2. 如果存在直接返回。
3. 如果不存在就选择 LRU 节点删除。
4. 取出每一个桶中的 LRU 节点(加锁)，遍历所有桶，寻找使用次数最少的节点驱逐。
5. 然后根据 key 将待查找的节点加入桶中。

存在的问题：

在多线程场景下，如果对单个链表加锁，去锁后不能保证之前取得的 LRU 节点依旧有效，因为在去锁后有可能别的节点调用该节点使得 LRU 节点更改。

解决方案：

在遍历桶的时候，如果桶中没有节点不可能成为 LRU 节点则直接释放锁，反之锁不释放始终保持。也就是之前锁的策略粒度太小出问题了，需要加大粒度。

存在的问题：

接下来是死锁的问题，两个进程同时保持并申请对方的资源时会导致死锁。上一个方案加大了锁的粒度进而导致了存在死锁的可能。

死锁的四个条件：

1. 互斥（一个资源在任何时候只能属于一个线程）
2. 请求保持（线程在拿着一个锁的情况下，去申请另一个锁）
3. 不剥夺（外力不强制剥夺一个线程已经拥有的资源）
4. 环路等待（请求资源的顺序形成了一个环）

可以通过释放待查找桶的锁来解决问题。但是存在多个进程同时申请获得多分缓存的情况。

可以将驱逐+重分配的过程限制为单线程。也就是乐观锁。

bget 的功能是，如果带查找的节点在缓存中那么直接返回，反之驱逐 LRU 节点。