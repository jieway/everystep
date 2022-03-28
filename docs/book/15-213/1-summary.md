# L0 cprogramminglab

阅读 [01-overview.pdf](https://www.cs.cmu.edu/~213/lectures/01-overview.pdf)，[cprogramminglab.pdf](https://www.cs.cmu.edu/afs/cs/academic/class/15213-s22/www/labs/cprogramminglab.pdf)

下载启动[代码](https://www.cs.cmu.edu/afs/cs/academic/class/15213-s22/www/labs/cprogramminglab-handout.tar)。

解压代码：

    $ tar xvf cprogramminglab-handout.tar

阅读 README 然后修改文件 queue.h 和 queue.c 。

## queue_size

queue_size: 计算队列中元素的数量。

在 queue_t 添加一个 size 字段，实时记录队列的长度，插入删除都要更新该字段，queue_size 直接返回该值即可。

queue_new 需要将 size 初始化为 0 。

queue_insert_head 插入