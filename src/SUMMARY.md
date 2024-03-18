# everystep

[关于项目](about-book.md)

# 🌟 计算机基础

---

- [操作系统](os/0-summary.md)
  - [OS 启动过程](os/start/README.md)
    - [OS 启动之 BIOS](os/start/bios.md)
    - [OS 启动 Boot Loader 汇编实现细节](os/start/boot-loader.md)
    - [OS 启动 Boot Loader C语言实现细节](os/start/boot-main.md)
    - [OS 内存地址空间的演化历程](os/start/pc-address.md)
    - [OS 实模式、保护模式](os/start/real-mold.md)
    - [OS 分段、分页](os/start/seg-page.md)

  - [OS 内核](os/kern/README.md)
    - [OS 内核入口实现细节](os/kern/os-asm.md)
    - [OS 内核内存、堆栈布局](os/kern/os-stack.md)
    - [OS backtrace 实现细节](os/kern/back-trace.md)
    - [OS 物理页面管理](os/kern/phy-manage.md)
    - [OS 如何建立虚拟内存映射？](os/kern/vir-mem.md)
    - [OS 内核空间映射细节](os/kern/map.md)

  - [OS 进程](os/kern/README.md)
    - [OS 进程内部的实现细节](os/user/process-mem.md)
    - [OS 如何将程序加载到虚拟内存中并执行](os/user/process-load.md)
    - [OS 什么是中断和异常？](os/user/trap-theory.md)
    - [OS 用户态和内核态之间的切换细节](os/user/uk-trans.md)
    - [OS 中断和异常实现细节](os/user/trap-impl.md)
    - [OS 页面错误实现细节](os/user/page-fault.md)
    - [OS 断点异常实现细节](os/user/break-point.md)
    - [OS 系统调用实现细节](os/user/system-call.md)

  - [多核 OS](os/mult/README.md)
    - [多核 OS 初始化细节](os/mult/apic-intro.md)
    - [多处理器内核栈和环境初始化实现细节](os/mult/ap-init.md)
    - [多核 OS AP 启动细节](os/mult/ap-start.md)
    - [OS 自旋锁实现细节](os/mult/spin-lock.md)
    - [OS 循环调度实现细节](os/mult/round-robin.md)
    - [OS COW Fork 原理图解](os/mult/fork-intro.md)
    - [COW Fork 页面错误实现细节](os/mult/cow-fork-pagefalt.md)
    - [COW Fork 创建进程实现细节](os/mult/cow-fork-init.md)
    - [OS 时钟中断实现细节](os/mult/os-irq.md)
    - [OS IPC 进程通信实现细节](os/mult/os-ipc.md)

  - [自旋锁和睡眠锁的区别](os/sleep-lock.md)
  - [Linux 常用命令使用场景](os/shell-know.md)
  - [MIT 6.828 JOS 2018 环境配置](os/appendix/README.md)

   <!-- - [Linux 常用命令使用技巧](os/shell-tech.md) -->

- [计算机网络](os/0-summary.md)

# 😈 C++

---

- [传统 C++](cpp/basic/README.md)

- [现代 C++](cpp/modern/README.md)

- [STL](cpp/stl/README.md)



# 🤡 源码解析

---


- [Leveldb LSM Tree](lsm/0-summary.md)
    - [Leveldb 读写过程](lsm/read-write.md)
    - [Leveldb Memtable 读写过程](lsm/memtable.md)
    - [Leveldb Memtable 迭代器](lsm/memtable-iter.md)
    - [Leveldb Block 实现细节](lsm/block.md)
    - [Leveldb SST 实现细节](lsm/sst.md)
    - [Leveldb 布隆过滤器](lsm/bloom-fliter.md)
    - [Leveldb Compaction 总揽](lsm/compact-detail.md)

    <!-- - [Leveldb Manifest](lsm/manifest.md)
    - [Leveldb WAL](lsm/wal.md)
    - [Leveldb 批量写入和校验和](lsm/batch.md)
    - [Leveldb Compaction 策略](lsm/compact-strategy.md) -->


# 🍭 精读

---


- [精读《C++ Core Guide Line》](ccgl/0-summary.md)
  - [精读《C++ Core Guide Line》P.1 如何在代码中提供更明确的语义？](ccgl/p1.md)
  - [精读《C++ Core Guide Line》P.2 使用 ISO 标准 C++](ccgl/p2.md)
  - [精读《C++ Core Guide Line》P.2 使用 ISO 标准 C++](ccgl/p3.md)




# 🎃 算法

---

- [数组](alg/array/README.md)
  - [283. 移动零](alg/array/lc-283.md)
  - [27. 移除元素](alg/array/lc-27.md)
  - [977. 有序数组的平方](alg/array/lc-977.md)
  - [二分查找](alg/array/lc-704.md)
  - [螺旋矩阵](alg/array/lc-59.md)
  - [螺旋矩阵进阶](alg/array/lc-54.md)

- [链表](alg/linklist/README.md)
  - [203. 移除链表元素](alg/linklist/lc-203.md)
  - [206. 反转链表](alg/linklist/lc-206.md)
  - [24. 两两交换链表中的节点](alg/linklist/lc-24.md)
  - [19. 删除链表的倒数第 N 个结点](alg/linklist/lc-19.md)
  - [面试题 02.07. 链表相交](alg/linklist/lc-02-07.md)
  - [142. 环形链表 II](alg/linklist/lc-142.md)
  - [一步一步图解跳表](alg/linklist/lc-1206.md)

- [哈希](alg/hash/README.md)
  - [242. 有效的字母异位词](alg/hash/lc-242.md)
  - [xxxx 1002. 查找共用字符](alg/hash/lc-1002.md)
  - [349. 两个数组的交集](alg/hash/lc-349.md)

- [树](alg/tree/README.md)
  - [Trie 树](alg/tree/trie.md)



# ⚡️ 其他

---

- [🔥 更新日志](other/update.md)
- [🍬 参与贡献](other/contributing.md)

