
# lab

* 第一次实验是一个简单的 MapReduce 实验。你们要根据你们在论文中读到的来实现你们版本的 MapReduce 。
* 第二个实验实现 Raft 算法，这是一个理论上通过复制来让系统容错的算法，具体是通过复制和出现故障时自动切换来实现。
* 第三个实验，你需要使用你的 Raft 算法实现来建立一个可以容错的 KV 服务。
* 第四个实验，你需要把你写的KV服务器分发到一系列的独立集群中，这样你会切分你的KV服务，并通过运行这些独立的副本集群进行加速。同时，你也要负责将不同的数据块在不同的服务器之间搬迁，并确保数据完整。这里我们通常称之为分片式KV服务。分片是指我们将数据在多个服务器上做了分区，来实现并行的加速。

# 资源

[视频内容文字版中文翻译](https://mit-public-courses-cn-translatio.gitbook.io/)



# 安装 GO

[Setup Go](https://pdos.csail.mit.edu/6.824/labs/go.html)

命令行下载不下来，于是直接访问网页通过浏览器下载。

[virtual Box 设置共享文件夹](https://jingyan.baidu.com/article/d2b1d102cf998b5c7f37d442.html) 将文件传到虚拟机中。

手动安装 `sudo tar -C /usr/local -xzf go1.15.8.linux-amd64.tar.gz`

将 `export PATH=$PATH:/usr/local/go/bin` 写入 `.bashrc` 中：

```
$ vim ~/.bashrc 
$ source ~/.bashrc 
```

检查是否安装成功：

```
$ go version
go version go1.15.8 linux/amd64
```

如果在国内安装 GO 插件之前先换源。

GO 换源 `go env -w GOPROXY="https://goproxy.cn"` 不然打开 vscode 后一堆库无法加载。

安装 vscode 的 GO 插件。

将 GOPATH 路径设置为项目路径 `go env -w GOPATH="/mnt/e/Repo/6.824lab"` 我的路径是这个，你需要改成自己的路径！

GOPATH 直接设置为全局其实是不合适的，但是因为只有一个 GO 项目，索性就直接设置了。如果有两个项目 GOPATH 又分为局部和全局两种。局部只对当前项目有效，全局则是对所有项目。

可以通过 `$ go env` 查看参数设置。


