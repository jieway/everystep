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

接下来跑另一个例子（当代码实现完成后就能跑通）

    $ rm mr-out*

首先启动 coordinator

    $ go run -race mrcoordinator.go pg-*.txt

在另一个窗口启动 mrworker 并塞入 wc.so 表示执行词频统计

    $ go run -race mrworker.go wc.so

`src/main/mrsequential.go` 是一个单机单进程 MapReduce 的顺序实现，实验要求是实现一个单机多进程的 MapReduce ，可以参考这个文件。先读明白这个文件，其中代码后续是需要借鉴的。

`mrapps/wc.go` 中提供了词频统计具体实现的 Map 和 Reduce 函数。

`mrapps/indexer.go` 中是文本索引器具体实现的 Map 和 Reduce 函数。

接下来是实现一个分布式的 MapReduce，其中包含了一个 coordinator 和多个 worker 。在实际中 worker 是并行的，但在这个实验中都在一台机器上通过多进程来模拟并行。worker 通过 RPC 和 coordinator 进行通信。worker 进程向 coordinator 进程请求任务，从一个或多个文件中读取任务输入，执行并将其写入多个文件中。

如果一个 worker 在一段时间内（此 lab 中，这段时间是 10s）无法将这些任务执行完，那么 coordinator 将会把同样的任务发给别的 worker 。

`mr/coordinator.go` `mr/worker.go` `mr/rpc.go` 三个是要实现的文件，其中已经提供了部分代码。

下面是运行单机多进程 MapReduce 的命令。首先重新构建 word-count MapReduce 应用程序：

`pg-*.txt` 作为 `mrcoordinator.go` 的输入文件，每个文件对应于一个 "split"，是一个Map任务的输入。


## 思考

1. 首先通过 mrcoordinator.go 创建 coordinator 。然后通过 mrworker.go 创建多个 worker 来实现并行处理。
2. 接下来设计 Task 的数据结构：task 两种状态：等待或正在执行。以及区分 mr 。
3. 然后是 Worker 如何申请一个到一个任务，也就是获取文件名称。这一点提供的研究 RPC 例子可以很容易的实现。
   1. 获取任务要区分当前状态，如果是 Map 就申请 map 任务，反之申请 reduce 任务。
   2. coordinator 中维护了一个 map task 的数组，其中包含了待处理的文件名和一些任务状态的信息，例如 id ，启动时间，任务状态。
   3. 加锁，做一些状态信息的处理。然后返回一个 map 任务。reduce 同理。
4. 拿到任务之后开始执行，区分 map 和 reduce 。
   1. 执行 map 任务：读取文件内容经过 map 处理然后用 json 编码塞入 reduce 中。
   2. 处理 reduce 任务，读取生成的中间文件中的内容然后用 reducef 来处理。
   3. Finish 遍历所有的 map 任务，处理已经 map 好的任务，然后判断是否所有的任务都已经被处理。如果都处理完了就转入 reduce 阶段。reduce 阶段同理，最后判断所有任务是否完成，然后 Done() 会最终终止整个流程。
5. MakeCoordinator 主要是初始化 map 任务队列，将 filename 初始化为 map 任务。然后初始化 Reduce 任务队列。最后将状态改为 map 阶段等待 worker 来领任务。

能通过 2020 版中的测试，但 wc 需要手动测试，而 2022 版的测试存在超时问题。

![20220320232720](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220320232720.png)