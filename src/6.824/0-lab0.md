# 6.824 Spring 2022

课程安排：[schedule](https://pdos.csail.mit.edu/6.824/schedule.html)

视频字幕中文翻译：https://shimo.im/docs/xwqvh3kGppJKvHvX/read

# lab

1. 第一次实验是一个简单的 MapReduce 实验。你们要根据你们在论文中读到的来实现你们版本的 MapReduce 。
2. 第二个实验实现 Raft 算法，这是一个理论上通过复制来让系统容错的算法，具体是通过复制和出现故障时自动切换来实现。
3. 第三个实验，你需要使用你的 Raft 算法实现来建立一个可以容错的 KV 服务。
4. 第四个实验，你需要把你写的KV服务器分发到一系列的独立集群中，这样你会切分你的KV服务，并通过运行这些独立的副本集群进行加速。同时，你也要负责将不同的数据块在不同的服务器之间搬迁，并确保数据完整。这里我们通常称之为分片式KV服务。分片是指我们将数据在多个服务器上做了分区，来实现并行的加速。

![20220331220013](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220331220013.png)

# 资源

* [视频内容文字版中文翻译](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/)
* [6.824 视频公开翻译文档链接](https://shimo.im/docs/xwqvh3kGppJKvHvX/read)