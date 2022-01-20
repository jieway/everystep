# Lab 1: MapReduce

> 前置信息：
> 1. 读一遍《MapReduce》论文。
> 2. 看完 lec1 和 lec2 视频 （B站有中文翻译）
> 3. 过一遍 https://go.dev/tour/welcome/1
> 4. 阅读 lab1 

## 1. 环境配置

因为实验需要在 linux 平台进行，最终我选择了 Vmware ，CentOS 7.5，GoLang 这一套搭配。

虚拟机，静态 IP 配置，本地 ssh 连接虚拟机可以参考 [p18-p21](https://www.bilibili.com/video/BV1Qp4y1n7EN?p=18) 这四节的内容。

接下来是配置 GO ，由于命令行无响应所以直接访问网页通过浏览器下载。然后通过 Xftp 将安装包上传到 Centos 7.5 中。

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

下载项目

```
$ git clone git://g.csail.mit.edu/6.824-golabs-2021 6.824
$ cd 6.824
$ ls
Makefile src
$
```

然后是设置 GoLang 远程开发，写好相应内容即可。建议安装前先阅读此[页面](https://www.jetbrains.com/help/idea/2021.3/remote-development-a.html#)。（安装需要等待很长时间）

![image](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.7i4tacsnor40.webp)

特别注意此处，因为是 GoLang ，不要选择默认的 IDEA 。

![image](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.3xgh4wgdi720.webp)

## 2. 内容

`src/main/mrsequential.go` 是一个单进程 MR 的顺序实现，在一个单进程中产生一个 Map 并

`mrapps/wc.go` 中提供了词频统计的应用。

`mrapps/indexer.go` 中是文本索引器。使用方式如下：

```
$ cd ~/6.824
$ cd src/main
$ go build -race -buildmode=plugin ../mrapps/wc.go
$ rm mr-out*
$ go run -race mrsequential.go wc.so pg*.txt
$ more mr-out-0
A 509
ABOUT 2
ACT 8
...
```

`src/main/mrsequential.go` 是一个简单的顺序实现。可以借鉴！

`pg-xxx.txt` 是输入文件。 `mr-out-0` 是产生的输出文件，key 和 value 分别是单词和词频。

* go build -reace 参数用于检测数据竞争状态。
* -buildmode 则是设置了编译模式。

## 任务

> coordinator 就是 MapReduce 论文中的 master

实现一个分布式的 MapReduce，包含 coordinator 和 worker 。coordinator 只有一个，而 worker 有多个在同时执行。在实际中 worker 运行在多个机器之上，但是此次实验中 worker 只是运行在一台机器上。worker 通过 RPC 和 coordinator 进行通信。worker 进程向 coordinator 进程请求任务，从一个或多个文件中读取任务输入，执行并将其写入多个文件中。

如果一个 worker 在一段时间内（此 lab 中，这段时间是 10s）无法将这些任务执行完，那么 coordinator 将会把同样的任务发给别的 worker 。

开始工作前提供了一些代码，coordinator 和 worker 代码在 `main/mrcoordinator.go`， `main/mrworker.go` 中。

`mr/coordinator.go` `mr/worker.go` `mr/rpc.go` 三个是要实现的文件。

重新构建 word-count MapReduce 应用程序：

```
$ go build -race -buildmode=plugin ../mrapps/wc.go
```

在 main 文件夹下运行如下代码：

```
$ rm mr-out*
$ go run -race mrcoordinator.go pg-*.txt
```

`pg-*.txt` 作为 `mrcoordinator.go` 的输入文件，每个文件对应于一个 "split"，是一个Map任务的输入。

在其他窗口运行 worker 。

`$ go run -race mrworker.go wc.so`

当 worker 和 coordinator 结束后，查看 `mr-out-*` 输出，完成这个 lab 后将会输出如下内容：

```
$ cat mr-out-* | sort | more
A 509
ABOUT 2
ACT 8
...
```

`main/test-mr.sh` 是提供的测试文件，用于检测 wc 和 indexer 输出结果是否正确。除此之外还会检测并行性和任务崩溃的时候能否恢复。

如果你现在运行测试脚本，它就会挂起，因为 coordinator 还未完成。

```
$ cd ~/6.824/src/main
$ bash test-mr.sh
*** Starting wc test.
```

将 `mr/coordinator.go` 中 `Done` 函数的 `ret := false` 修改为 `true` 后 coordinate 将立即退出。

```
$ bash test-mr.sh
*** Starting wc test.
sort: No such file or directory
cmp: EOF on mr-wc-all
--- wc output is not the same as mr-correct-wc.txt
--- wc test: FAIL
$
```

测试脚本希望在名为`mr-out-X`的文件中看到输出，每个 reduce 任务都有一个。注意此时还没有写代码直接运行会失败。当完成后，结果如下：

```
$ bash test-mr.sh
*** Starting wc test.
--- wc test: PASS
*** Starting indexer test.
--- indexer test: PASS
*** Starting map parallelism test.
--- map parallelism test: PASS
*** Starting reduce parallelism test.
--- reduce parallelism test: PASS
*** Starting crash test.
--- crash test: PASS
*** PASSED ALL TESTS
$
```

如下信息是来自 Go RPC package ，忽略这些信息，

```
2019/12/16 13:27:09 rpc.Register: method "Done" has 1 input parameters; needs exactly three
```

## A few rules:

The map phase should divide the intermediate keys into buckets for nReduce reduce tasks, where nReduce is the argument that `main/mrcoordinator.go` passes to MakeCoordinator().

map 阶段应该把中间键分成 nReduce reduce 任务的桶，其中 nReduce 是 `main/mrcoordinator.go` 传递给 `MakeCoordinator()` 的参数。

Worker 应该把第 X 个 reduce 任务的输出放在文件 mr-out-X 中。

一个 mr-out-X 文件应该包含 Reduce 函数输出的一行。这一行应该以 Go 的"%v %v "的格式生成，称之为键和值。请看 `main/mrsequential.go` 中注释为 "this is the correct format" 的一行。如果你的实现过于偏离这个格式，测试脚本将会失败。

你可以修改 `mr/worker.go` ，`mr/coordinator.go`，和 `mr/rpc.go` 。你可以临时修改其他文件进行测试，但要确保你的代码能在原始版本中运行；我们会用原始版本进行测试。

Worker 将 Map 临时产生的文件存放在当前目录下，这些文件以后可以作为 Reduce 任务的输入。

`main/mrcoordinator.go` 希望 `mr/coordinator.go` 实现一个Done()方法，当 MapReduce 作业完全完成时返回 true ；这时，`mrcoordinator.go`将退出。当工作完全完成后，worker 进程应该退出。

实现这一点的一个简单方法是使用 call() 的返回值：如果 worker 未能联系到 coordinator ，它可以假设 coordinator 已经退出，因为工作已经完成，所以 worker 也可以终止。

根据你的设计，你可能也会发现有一个 "please exit" 的伪任务，coordinator 可以把它交给 workers。

## Hints

一个开始的方法是修改 `mr/worker.go` 中的 Worker()，向 coordinator 发送一个RPC，要求完成一个任务。

然后修改 coordinator ，以响应一个尚未启动的 map 任务的文件名。然后修改 worker 来读取该文件并调用应用程序的 Map 函数，例如 `mrsequential.go` 。

应用程序的 Map 和 Reduce 函数在运行时使用 Go 插件包加载，文件名以 .so 结尾。

如果你改变了 `mr/` 目录中的任何东西，你可能需要重新构建你使用的任何MapReduce插件，使用 `go build -race -buildmode=plugin .../mrapps/wc.go` 之类的方法。

这个 lab 依赖于 workers 共享一个文件系统。当所有工作器都在同一台机器上运行时，这很简单，但如果工作器在不同的机器上运行，就需要一个像GFS这样的全局文件系统。

一个合理的中间文件的命名惯例是 mr-X-Y，其中 X 是 Map 任务编号，Y 是 reduce 任务编号。

工作者的 map 任务代码需要一种方法，将中间的键/值对以一种可以在 reduce 任务中正确读回的方式存储在文件中。一种可能性是使用 Go 的 `encoding/json` 包。要将键/值对写入一个JSON文件。

```go
    enc := json.NewEncoder(file)
    for _, kv := ... {
      err := enc.Encode(&kv)
```

读取：

```go
    dec := json.NewDecoder(file)
    for {
      var kv KeyValue
      if err := dec.Decode(&kv); err != nil {
        break
      }
      kva = append(kva, kv)
    }
```

你的 worker 的 map 部分可以使用 `ihash(key)` 函数（在`worker.go`中）来为给定的键挑选 reduce 任务。

你可以从 `mrsequential.go` 中借鉴一些代码，用于读取 Map 输入文件，在 Map 和 Reduce 之间排序的中间键值对，以及将 Reduce 的输出存储在文件中。

coordinator 作为 RPC 服务器，将是并发的；别忘了锁定共享数据。

使用 Go's race 检测器，使用 go build -race 和 go run -race。test-mr.sh 默认使用 race detector 运行测试。

Workers 有时需要等待，例如，在最后一个 map 完成之前，reduce 不能开始。

一种可能性是 workers 定期向 coordinator 请求工作，在每次请求之间用 `time.Sleep()` 睡觉。

另一种可能性是 coordinator 中的相关 RPC 处理程序有一个等待的循环，可以使用 `time.Sleep()` 或 `sync.Cond`。

Go 在自己的线程中为每个 RPC 运行处理程序，因此一个处理程序在等待的事实不会妨碍 coordinator 处理其他RPC。

coordinator 无法可靠地区分崩溃的工作者、活着但由于某种原因停滞不前的工作者，以及正在执行但速度太慢而无法发挥作用的工作者。

你能做的最好的事情就是让 coordinator 等待一定的时间，然后放弃，把任务重新发给另一个 worker。

在这个实验中，让 coordinator 等待 10 秒钟；之后 coordinator 应该假定该 worker 已经死亡（当然，它可能没有死亡）。

If you choose to implement Backup Tasks (Section 3.6), note that we test that your code doesn't schedule extraneous tasks when workers execute tasks without crashing. 

如果你选择实现备份任务（第3.6节），请注意，当 workers 执行任务而不崩溃时，我们会测试你的代码不会安排无关的任务。

备份任务应该只在某个相对较长的时间段（如10s）后安排。

为了测试崩溃恢复，你可以使用 `mrapps/crash.go` 应用程序插件。它在 Map 和 Reduce 函数中随机退出。

To ensure that nobody observes partially written files in the presence of crashes, the MapReduce paper mentions the trick of using a temporary file and atomically renaming it once it is completely written. 

为了确保在崩溃的情况下没有人观察到部分写入的文件，MapReduce 论文中提到了使用临时文件的技巧，一旦完全写入就原子化地重命名。

你可以使用 `ioutil.TempFile` 来创建一个临时文件，使用 `os.Rename` 来原子化地重命名它。

`test-mr.sh` 运行子目录 `mr-tmp` 中的所有进程，所以如果出了问题，你想看中间文件或输出文件。你可以修改 `test-mr.sh`，使其在测试失败后退出，这样脚本就不会继续测试（并覆盖输出文件）。

`test-mr-many.sh` 提供了一个运行 `test-mr.sh` 的基本脚本，并带有超时功能（这就是我们要测试你的代码的方式）。它把运行测试的次数作为一个参数。你不应该同时运行几个 `test-mr.sh` 实例，因为 coordinator 会重复使用同一个套接字，造成冲突。