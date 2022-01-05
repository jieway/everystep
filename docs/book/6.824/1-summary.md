



# 环境配置

因为是 win11 ，选择了 WSL2

环境配置：WSL2 + Ubuntu 20.04 + Golang 

* 关于 WSL 的安装可以参考 [Dev on Windows with WSL](https://github.com/spencerwooo/dowww)

* WSL 1 无法 debug，必须切换到 wsl ，以下是切换步骤（以管理员的身份运行 powershell/cmd）

```
PS C:\WINDOWS\system32>  wsl --list
适用于 Linux 的 Windows 子系统分发版:
Ubuntu-20.04 (默认)
PS C:\WINDOWS\system32>  wsl --set-version Ubuntu-20.04  2
正在进行转换，这可能需要几分钟时间...
有关与 WSL 2 的主要区别的信息，请访问 https://aka.ms/wsl2
转换完成。
PS C:\WINDOWS\system32>  wsl --set-default-version 2
有关与 WSL 2 的主要区别的信息，请访问 https://aka.ms/wsl2
操作成功完成。
PS C:\WINDOWS\system32> wsl --list --verbose
  NAME            STATE           VERSION
* Ubuntu-20.04    Stopped         2
```

GO 换源 `go env -w GOPROXY="https://goproxy.cn"` 不然打开 vscode 后一堆库无法加载。

将 GOPATH 路径设置为项目路径 ` go env -w GOPATH="/mnt/e/Repo/6.824lab"` 我的路径是这个，你需要改成自己的路径！

GOPATH 直接设置为全局其实是不合适的，但是因为只有一个 GO 项目，索性就直接设置了。如果有两个项目 GOPATH 又分为局部和全局两种。局部只对当前项目有效，全局则是对所有项目。

可以通过 `$ go env` 查看参数设置。

# 开始

```
$ git clone git://g.csail.mit.edu/6.824-golabs-2021 6.824
$ cd 6.824
$ ls
Makefile src
$
```

跑一遍 MapReduce 的词频统计

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

`mrapps/wc.go` 是词频统计的代码。通过该代码了解如何使用 MapReduce！

`mrapps/indexer.go` 是一个文本索引器。

`pg-xxx.txt` 是输入文件。

`mr-out-0` 是产生的输出文件，key 和 value 分别是单词和词频。

* go build -reace 参数用于检测数据竞争状态。
* -buildmode 则是设置了编译模式。

## 任务

实现一个分布式的 MapReduce，包含 coordinator 和 worker 。

程序中有一个 coordinator 和一个或多个 worker 并行执行。在实际中 worker 运行在多个机器之上，但是本文中 worker 只是运行在一台机器上。 

worker 通过 RPC 和 coordinator 通信。worker 进程向 coordinator 进程请求任务，从一个或多个文件中读取任务输入，执行并将其写入多个文件中。

如果一个 worker 在一段时间内（此 lab 中，这段时间是 10s）无法将这些任务执行完，那么 coordinator 将会把同样的任务发给别的 worker 。

开始工作前提供了一些代码，coordinator 和 worker 代码在 `main/mrcoordinator.go`， `main/mrworker.go` 中。

`mr/coordinator` `go mr/worker.go` `mr/rpc.go` 三个是要实现的文件。

重新构建 word-count MapReduce 应用程序：

`go build -race -buildmode=plugin ../mrapps/wc.go`

在 main 文件夹下运行如下代码：

```
$ rm mr-out*
$ go run -race mrcoordinator.go pg-*.txt
```

`pg-*.txt` 作为 `mrcoordinator.go` 的输入文件，


`$ go run -race mrworker.go wc.so`

当 worker 和 coordinator 结束，查看 `mr-out-*` 输出，完成这个 lab 后将会输出如下内容：

```
$ cat mr-out-* | sort | more
A 509
ABOUT 2
ACT 8
...
```

`main/test-mr.sh` 是提供的测试文件，用于检测 wc 和 indexer 输出结果是否正确。除此之外还会检测并行性和任务崩溃的时候能否恢复。

如果你现在运行测试脚本，它就会挂起，因为协调器从未完成。

```
$ cd ~/6.824/src/main
$ bash test-mr.sh
*** Starting wc test.
```

将 `mr/coordinator.go` 中 `Done` 函数的 `ret := false` 修改为 `true` 以便于 coordinate 立即退出。

当完成后，结果如下：

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

如下信息可以忽略

```
2019/12/16 13:27:09 rpc.Register: method "Done" has 1 input parameters; needs exactly three
```

## A few rules:

The map phase should divide the intermediate keys into buckets for nReduce reduce tasks, where nReduce is the argument that `main/mrcoordinator.go` passes to MakeCoordinator().

map 阶段应该把中间键分成 nReduce reduce 任务的桶，其中 nReduce 是 `main/mrcoordinator.go` 传递给 MakeCoordinator() 的参数。

The worker implementation should put the output of the X'th reduce task in the file mr-out-X. 

Worker 实现应该把第 X 个 reduce 任务的输出放在文件 mr-out-X 中。

A mr-out-X file should contain one line per Reduce function output. The line should be generated with the Go "%v %v" format, called with the key and value. Have a look in main/mrsequential.go for the line commented "this is the correct format". The test script will fail if your implementation deviates too much from this format.

一个 mr-out-X 文件应该包含每个 Reduce 函数输出的一行。这一行应该以 Go 的"%v %v "的格式生成，用键和值来调用。请看main/mrsequential.go中注释为 "这是正确的格式 "的一行。如果你的实现过于偏离这个格式，测试脚本将会失败。

You can modify `mr/worker.go`, `mr/coordinator.go`, and `mr/rpc.go`. You can temporarily modify other files for testing, but make sure your code works with the original versions; we'll test with the original versions.

你可以修改`mr/worker.go`，`mr/coordinator.go`，和`mr/rpc.go`。你可以临时修改其他文件进行测试，但要确保你的代码能在原始版本中运行；我们会用原始版本进行测试。

The worker should put intermediate Map output in files in the current directory, where your worker can later read them as input to Reduce tasks.

Worker 应该将中间的 Map 输出放在当前目录下的文件中，你的 Worker 以后可以在那里读取它们作为 Reduce 任务的输入。

`main/mrcoordinator.go` expects `mr/coordinator.go` to implement a Done() method that returns true when the MapReduce job is completely finished; at that point, mrcoordinator.go will exit.

`main/mrcoordinator.go`希望`mr/coordinator.go`实现一个Done()方法，当MapReduce作业完全完成时返回true；这时，mrcoordinator.go将退出。

When the job is completely finished, the worker processes should exit. 

当工作完全完成后，工作进程应该退出。

A simple way to implement this is to use the return value from call(): if the worker fails to contact the coordinator, it can assume that the coordinator has exited because the job is done, and so the worker can terminate too. 

实现这一点的一个简单方法是使用call()的返回值：如果工作者未能联系到协调者，它可以假设协调者已经退出，因为工作已经完成，所以工作者也可以终止。

Depending on your design, you might also find it helpful to have a "please exit" pseudo-task that the coordinator can give to workers.

根据你的设计，你可能也会发现有一个 "请退出 "的伪任务，协调人可以把它交给工人。

## Hints

One way to get started is to modify mr/worker.go's Worker() to send an RPC to the coordinator asking for a task. 

一个开始的方法是修改mr/worker.go的Worker()，向协调者发送一个RPC，要求完成一个任务。

Then modify the coordinator to respond with the file name of an as-yet-unstarted map task. Then modify the worker to read that file and call the application Map function, as in mrsequential.go.

然后修改协调器，以响应一个尚未启动的地图任务的文件名。然后修改worker来读取该文件并调用应用程序的 Map 函数，如mrsequential.go。

The application Map and Reduce functions are loaded at run-time using the Go plugin package, from files whose names end in .so.

应用程序的Map和Reduce函数在运行时使用Go插件包加载，文件名以.so结尾。

If you change anything in the `mr/` directory, you will probably have to re-build any MapReduce plugins you use, with something like `go build -race -buildmode=plugin ../mrapps/wc.go`

如果你改变了`mr/`目录中的任何东西，你可能需要重新构建你使用的任何MapReduce插件，使用`go build -race -buildmode=plugin .../mrapps/wc.go`之类的方法。

This lab relies on the workers sharing a file system. That's straightforward when all workers run on the same machine, but would require a global filesystem like GFS if the workers ran on different machines.

这个实验室依赖于工作者共享一个文件系统。当所有工作器都在同一台机器上运行时，这很简单，但如果工作器在不同的机器上运行，就需要一个像GFS这样的全局文件系统。

A reasonable naming convention for intermediate files is mr-X-Y, where X is the Map task number, and Y is the reduce task number.

一个合理的中间文件的命名惯例是mr-X-Y，其中X是Map任务编号，Y是reduce任务编号。

The worker's map task code will need a way to store intermediate key/value pairs in files in a way that can be correctly read back during reduce tasks. One possibility is to use Go's encoding/json package. To write key/value pairs to a JSON file:

工作者的地图任务代码需要一种方法，将中间的键/值对以一种可以在还原任务中正确读回的方式存储在文件中。一种可能性是使用 Go 的编码/json 包。要将键/值对写入一个JSON文件。

    enc := json.NewEncoder(file)
    for _, kv := ... {
      err := enc.Encode(&kv)

and to read such a file back:

并把这样的文件读回来。

    dec := json.NewDecoder(file)
    for {
      var kv KeyValue
      if err := dec.Decode(&kv); err != nil {
        break
      }
      kva = append(kva, kv)
    }

The map part of your worker can use the `ihash(key)` function (in `worker.go`) to pick the reduce task for a given key.

你的 worker 的 map 部分可以使用ihash(key)函数（在worker.go中）来为给定的键挑选还原任务。

You can steal some code from `mrsequential.go` for reading Map input files, for sorting intermedate key/value pairs between the Map and Reduce, and for storing Reduce output in files.

你可以从`mrsequential.go`中窃取一些代码，用于读取Map输入文件，在Map和Reduce之间排序中间的键/值对，以及将Reduce的输出存储在文件中。

The coordinator, as an RPC server, will be concurrent; don't forget to lock shared data. 

协调器作为RPC服务器，将是并发的；别忘了锁定共享数据。

Use Go's race detector, with go build -race and go run -race. test-mr.sh by default runs the tests with the race detector. 

使用 Go 的竞赛检测器，使用 go build -race 和 go run -race。test-mr.sh 默认使用竞赛检测器运行测试。

Workers will sometimes need to wait, e.g. reduces can't start until the last map has finished. 

工人有时需要等待，例如，在最后一个 map 完成之前，reduce 不能开始。

One possibility is for workers to periodically ask the coordinator for work, sleeping with time.Sleep() between each request. 

一种可能性是工人定期向协调者请求工作，在每次请求之间用time.Sleep()睡觉。

Another possibility is for the relevant RPC handler in the coordinator to have a loop that waits, either with time.Sleep() or sync.Cond. 

另一种可能性是协调器中的相关RPC处理程序有一个等待的循环，可以使用time.Sleep()或sync.Cond。

Go runs the handler for each RPC in its own thread, so the fact that one handler is waiting won't prevent the coordinator from processing other RPCs.

Go在自己的线程中为每个RPC运行处理程序，因此一个处理程序在等待的事实不会妨碍协调器处理其他RPC。

The coordinator can't reliably distinguish between crashed workers, workers that are alive but have stalled for some reason, and workers that are executing but too slowly to be useful. 

协调器无法可靠地区分崩溃的工作者、活着但由于某种原因停滞不前的工作者，以及正在执行但速度太慢而无法发挥作用的工作者。

The best you can do is have the coordinator wait for some amount of time, and then give up and re-issue the task to a different worker. 

你能做的最好的事情就是让协调人等待一定的时间，然后放弃，把任务重新发给另一个工人。

For this lab, have the coordinator wait for ten seconds; after that the coordinator should assume the worker has died (of course, it might not have).

在这个实验中，让协调者等待10秒钟；之后协调者应该假定该工作者已经死亡（当然，它可能没有死亡）。

If you choose to implement Backup Tasks (Section 3.6), note that we test that your code doesn't schedule extraneous tasks when workers execute tasks without crashing. 

如果你选择实现备份任务（第3.6节），请注意，当工作者执行任务而不崩溃时，我们会测试你的代码不会安排无关的任务。

Backup tasks should only be scheduled after some relatively long period of time (e.g., 10s).

备份任务应该只在某个相对较长的时间段（如10s）后安排。

To test crash recovery, you can use the mrapps/crash.go application plugin. It randomly exits in the Map and Reduce functions.

为了测试崩溃恢复，你可以使用mrapps/crash.go应用程序插件。它在Map和Reduce函数中随机退出。

To ensure that nobody observes partially written files in the presence of crashes, the MapReduce paper mentions the trick of using a temporary file and atomically renaming it once it is completely written. 

为了确保在崩溃的情况下没有人观察到部分写入的文件，MapReduce论文中提到了使用临时文件的技巧，一旦完全写入就原子化地重命名。

You can use ioutil.TempFile to create a temporary file and os.Rename to atomically rename it.

你可以使用ioutil.TempFile来创建一个临时文件，使用os.Rename来原子化地重命名它。

test-mr.sh runs all the processes in the sub-directory mr-tmp, so if something goes wrong and you want to look at intermediate or output files, look there. You can modify test-mr.sh to exit after the failing test, so the script does not continue testing (and overwrite the output files).

test-mr.sh运行子目录mr-tmp中的所有进程，所以如果出了问题，你想看中间文件或输出文件，就看那里。你可以修改test-mr.sh，使其在测试失败后退出，这样脚本就不会继续测试（并覆盖输出文件）。

test-mr-many.sh provides a bare-bones script for running test-mr.sh with a timeout (which is how we'll test your code). It takes as an argument the number of times to run the tests. You should not run several test-mr.sh instances in parallel because the coordinator will reuse the same socket, causing conflicts.

test-mr-many.sh 提供了一个运行 test-mr.sh 的基本脚本，并带有超时功能（这就是我们要测试你的代码的方式）。它把运行测试的次数作为一个参数。你不应该同时运行几个test-mr.sh实例，因为协调器会重复使用同一个套接字，造成冲突。

## No-credit challenge exercises