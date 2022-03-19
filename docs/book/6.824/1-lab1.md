# Lab 1: MapReduce

环境：WSL2 Ubuntu20.04 LTS 

> 前置信息：
> 1. 读一遍《MapReduce》论文。
> 2. 看完 lec1 和 lec2 视频 （B站有中文翻译）
> 3. 过一遍 https://go.dev/tour/welcome/1
> 4. 阅读 lab1 
> 5. coordinator 就是 MapReduce 论文中的 master

> 预计耗时：1h

# GO 环境配置

阅读：https://pdos.csail.mit.edu/6.824/labs/go.html

第一个问题：

无法通过命令行下载：

直接访问：https://go.dev/dl/go1.17.6.linux-amd64.tar.gz 通过浏览器下载。

然后解压到指定位置 `sudo tar -C /usr/local -xzf go1.13.6.linux-amd64.tar.gz`

将环境遍历 `/usr/local/go/bin` 添加到 PATH 中。

我用的是 zsh 所以将 `export PATH=$PATH:/usr/local/go/bin` 放到 .zshrc 中，然后 source 生效。接下来检查是否安装成功：

```sh
$ go version
go version go1.17.6 linux/amd64
```

然后下载代码

```sh
git clone git://g.csail.mit.edu/6.824-golabs-2022 6.824
```

接下来执行一个单机版词频统计的例子，首先进入目录，生成词频统计的插件(wc.so)：

    $ cd ~/6.824
    $ cd src/main
    $ go build -race -buildmode=plugin ../mrapps/wc.go
    $ rm mr-out*

然后根据插件执行词频统计：

    $ go run -race mrsequential.go wc.so pg*.txt

`pg-xxx.txt` 是输入文件。`mr-out-0` 是产生的输出文件，key 和 value 分别是单词和词频。

go build -reace 参数用于检测数据竞争状态。

-buildmode 则是设置了编译模式。

接下里采用

    $ rm mr-out*

启动 coordinator

    $ go run -race mrcoordinator.go pg-*.txt

在另一个窗口启动 mrworker

    $ go run -race mrworker.go wc.so


`src/main/mrsequential.go` 是一个单机单进程 MapReduce 的顺序实现，实验要求是实现一个单机多进程的 MapReduce ，可以参考这个文件。先读明白这个文件，其中代码后续是需要借鉴的。

`mrapps/wc.go` 中提供了词频统计具体实现的 Map 和 Reduce 函数。

`mrapps/indexer.go` 中是文本索引器具体实现的 Map 和 Reduce 函数。

接下来是实现一个分布式的 MapReduce，其中包含了一个 coordinator 和多个 worker 。在实际中 worker 是并行的，但在这个实验中都在一台机器上通过多进程来模拟并行。worker 通过 RPC 和 coordinator 进行通信。worker 进程向 coordinator 进程请求任务，从一个或多个文件中读取任务输入，执行并将其写入多个文件中。

如果一个 worker 在一段时间内（此 lab 中，这段时间是 10s）无法将这些任务执行完，那么 coordinator 将会把同样的任务发给别的 worker 。

`mr/coordinator.go` `mr/worker.go` `mr/rpc.go` 三个是要实现的文件，其中已经提供了部分代码。

下面是运行单机多进程 MapReduce 的命令。首先重新构建 word-count MapReduce 应用程序：

`pg-*.txt` 作为 `mrcoordinator.go` 的输入文件，每个文件对应于一个 "split"，是一个Map任务的输入。

