# LEC 1 (ab): Introduction and examples (handouts: xv6 book; 2020: notes, video)

[2021 视频知识点总结](https://pdos.csail.mit.edu/6.S081/2021/schedule.html)

OS 的功能：

1. 对硬件的抽象。进程和文件系统都是为了方便。
2. 复用是指 OS 能够同时执行多个事情。
3. 隔离是指同时运行多个任务时任务之间互不影响。
4. 共享：能够共享某些东西
5. 安全：不想要共享的东西，保护起来。
6. 高性能
7. 多用途

例如多个用户登陆一台机器，而用户与用户之间的信息不希望对方访问，那么此时就不能共享。这被称为访问控制系统。

https://www.youtube.com/watch?v=o44d---Dk4o

