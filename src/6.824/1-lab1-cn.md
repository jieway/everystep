# Lab 1: MapReduce 翻译

Due: Friday Feb 11 23:59ET (MIT Time)
Collaboration policy // Submit lab // Setup Go // Guidance // Piazza

## Introduction

In this lab you'll build a MapReduce system. You'll implement a worker process that calls application Map and Reduce functions and handles reading and writing files, and a coordinator process that hands out tasks to workers and copes with failed workers. You'll be building something similar to the MapReduce paper. (Note: this lab uses "coordinator" instead of the paper's "master".)

在这个实验中，您将构建一个MapReduce系统。您将实现一个调用应用程序Map和Reduce函数并处理读写文件的工作进程，以及一个将任务分配给工作人员并处理失败工作人员的协调进程。您将构建类似于MapReduce论文的东西。（注意：这个实验使用“协调者”而不是论文的“主人”。）

## Getting started

You need to setup Go to do the labs.

你需要设置Go来做实验室。

Fetch the initial lab software with git (a version control system). To learn more about git, look at the Pro Git book or the git user's manual.

使用git（版本控制系统）获取初始实验室软件。要了解更多关于git的信息，请查看专业Git手册或git用户手册。

    $ git clone git://g.csail.mit.edu/6.824-golabs-2022 6.824
    $ cd 6.824
    $ ls
    Makefile src
    $

We supply you with a simple sequential mapreduce implementation in src/main/mrsequential.go. It runs the maps and reduces one at a time, in a single process. We also provide you with a couple of MapReduce applications: word-count in mrapps/wc.go, and a text indexer in mrapps/indexer.go. You can run word count sequentially as follows:

我们在src/main/mrsequential.go.中为您提供了一个简单的顺序mapReduce实现，它在单个进程中运行映射并一次减少一个。我们还为您提供了几个MapReduce应用程序：mrapps/wc.go中的字数计数和mrapps/indexer.go.中的文本索引器。您可以按以下顺序运行字数计数：

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
    ...

(Note: the -race enables the Go race detector. We suggest you develop and test your 6.824 lab code with the race detector. When we grade your labs, we will not use the race detector. Nevertheless, if your code has races, there's a good chance it will fail when we test it even without the race detector.)
（注意：-races支持Go竞赛检测器。我们建议你用竞赛检测器开发和测试你的6.824实验室代码。当我们对你的实验室评分时，我们不会使用竞赛检测器。然而，如果你的代码有竞赛，即使没有竞赛检测器，当我们测试它时，它也很有可能失败。）

mrsequential.go leaves its output in the file mr-out-0. The input is from the text files named pg-xxx.txt.
mrsequential.go将其输出留在文件mr-out-0中。输入来自名为pg-xxx.txt.的文本文件

Feel free to borrow code from mrsequential.go. You should also have a look at mrapps/wc.go to see what MapReduce application code looks like.
请随意从mrsequential.go.借用代码。您还应该看看mrapps/wc.go，看看MapReduce应用程序代码是什么样子。

## Your Job (moderate/hard)

Your job is to implement a distributed MapReduce, consisting of two programs, the coordinator and the worker. There will be just one coordinator process, and one or more worker processes executing in parallel. In a real system the workers would run on a bunch of different machines, but for this lab you'll run them all on a single machine. The workers will talk to the coordinator via RPC. Each worker process will ask the coordinator for a task, read the task's input from one or more files, execute the task, and write the task's output to one or more files. The coordinator should notice if a worker hasn't completed its task in a reasonable amount of time (for this lab, use ten seconds), and give the same task to a different worker.
您的工作是实现一个分布式MapReduce，由两个程序组成，协调器和工作进程。只有一个协调器进程和一个或多个并行执行的工作进程。在一个真实的系统中，工作进程将在一堆不同的机器上运行，但是对于这个实验室，您将在一台机器上运行它们。工作进程将通过RPC与协调器对话。每个工作进程将向协调器询问任务，从一个或多个文件中读取任务的输入，执行任务，并将任务的输出写入一个或多个文件。协调人应该注意到一个工人是否在合理的时间内没有完成任务（对于这个实验室，用十秒钟），并把同样的任务交给另一个工人。

We have given you a little code to start you off. The "main" routines for the coordinator and worker are in main/mrcoordinator.go and main/mrworker.go; don't change these files. You should put your implementation in mr/coordinator.go, mr/worker.go, and mr/rpc.go.

我们已经给了你一个小代码来开始你。协调员和工作人员的“主要”例程在main/mrcoordinator.go和main/mrworker.go；不要改变这些文件。你应该把你的实现放在先生/coordinator.go、先生/worker.go和先生/rpc.go.

Here's how to run your code on the word-count MapReduce application. First, make sure the word-count plugin is freshly built:
以下是如何在字数MapReduce应用程序上运行代码。首先，确保字数插件是新构建的：
    
    $ go build -race -buildmode=plugin ../mrapps/wc.go

In the main directory, run the coordinator.
在主目录中，运行协调器。

    $ rm mr-out*
    $rm mr-out*
    $ go run -race mrcoordinator.go pg-*.txt

The pg-*.txt arguments to mrcoordinator.go are the input files; each file corresponds to one "split", and is the input to one Map task. The -race flags runs go with its race detector.

mrcoordinator.go的pg-*. txt参数是输入文件；每个文件对应于一个“拆分”，是一个地图任务的输入。-种族标志运行与它的种族检测器一起运行。

In one or more other windows, run some workers:
在一个或多个其他窗口中，运行一些辅助角色：

    $ go run -race mrworker.go wc.so

When the workers and coordinator have finished, look at the output in mr-out-*. When you've completed the lab, the sorted union of the output files should match the sequential output, like this:
当工作人员和协调者完成后，查看mr-out-*中的输出。当您完成实验室时，输出文件的排序联合应该与顺序输出匹配，如下所示：

    $ cat mr-out-* | sort | more
    A 509
    ABOUT 2
    ACT 8
    ...
    ...

We supply you with a test script in main/test-mr.sh. The tests check that the wc and indexer MapReduce applications produce the correct output when given the pg-xxx.txt files as input. The tests also check that your implementation runs the Map and Reduce tasks in parallel, and that your implementation recovers from workers that crash while running tasks.

我们在main/test-mr.sh.中为您提供了一个测试脚本。测试检查wc和索引器MapReduce应用程序在输入pg-xxx.txt文件时是否产生正确的输出。测试还检查您的实现是否并行运行地图和减少任务，以及您的实现是否从运行任务时崩溃的辅助角色中恢复。

If you run the test script now, it will hang because the coordinator never finishes:

如果您现在运行测试脚本，它将挂起，因为协调器永远不会完成：

    $ cd ~/6.824/src/main
    $ bash test-mr.sh
    *** Starting wc test.

You can change ret := false to true in the Done function in mr/coordinator.go so that the coordinator exits immediately. Then:

您可以在mr/coordinator.go中的Done函数中将ret：=false更改为true，以便协调器立即退出。然后：

    $ bash test-mr.sh
    *** Starting wc test.
    sort: No such file or directory
    cmp: EOF on mr-wc-all
    --- wc output is not the same as mr-correct-wc.txt
    --- wc test: FAIL
    $

The test script expects to see output in files named mr-out-X, one for each reduce task. The empty implementations of mr/coordinator.go and mr/worker.go don't produce those files (or do much of anything else), so the test fails.
测试脚本期望在名为mr-out-X的文件中看到输出，每个减少任务一个输出。mr/coordinator.go和mr/worker.go的空实现不生成这些文件（或做其他任何事情），因此测试失败。

When you've finished, the test script output should look like this:
完成后，测试脚本输出应该如下所示：

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

You'll also see some errors from the Go RPC package that look like
您还将看到Go RPC包中的一些错误，看起来像

    2019/12/16 13:27:09 rpc.Register: method "Done" has 1 input parameters; needs exactly three

Ignore these messages; registering the coordinator as an RPC server checks if all its methods are suitable for RPCs (have 3 inputs); we know that Done is not called via RPC.
忽略这些消息；将协调器注册为RPC服务器检查其所有方法是否适合RPC（有3个输入）；我们知道Done不是通过RPC调用的。

## A few rules:

- The map phase should divide the intermediate keys into buckets for nReduce reduce tasks, where nReduce is the number of reduce tasks -- argument that main/mrcoordinator.go passes to MakeCoordinator(). So, each mapper needs to create nReduce intermediate files for consumption by the reduce tasks.

映射阶段应该将nReduce减少任务的中间键分成桶，其中nReduce是减少任务的数量--主/mrcoordinator.go传递给Make协调员（）的参数。因此，每个映射器需要创建nReduce中间文件，供减少任务使用。

- The worker implementation should put the output of the X'th reduce task in the file mr-out-X.

工作人员实现应该把第X个减少任务的输出放在mr-out-X文件中。

- A mr-out-X file should contain one line per Reduce function output. The line should be generated with the Go "%v %v" format, called with the key and value. Have a look in main/mrsequential.go for the line commented "this is the correct format". The test script will fail if your implementation deviates too much from this format.

mr-out-X文件应该包含每个Reduce函数输出的一行。该行应该用Go“%v%v”格式生成，用键和值调用。在main/mrsequential.go中查看注释为“这是正确的格式”的行。如果您的实现偏离这种格式太多，测试脚本将失败。

- You can modify mr/worker.go, mr/coordinator.go, and mr/rpc.go. You can temporarily modify other files for testing, but make sure your code works with the original versions; we'll test with the original versions.

您可以修改mr/worker.go、mr/coordinator.go和mr/rpc.go.您可以临时修改其他文件进行测试，但请确保您的代码与原始版本一起工作；我们将使用原始版本进行测试。

- The worker should put intermediate Map output in files in the current directory, where your worker can later read them as input to Reduce tasks.

辅助角色应该将中间映射输出放在当前目录中的文件中，您的辅助角色可以稍后将其作为减少任务的输入读取。

- main/mrcoordinator.go expects mr/coordinator.go to implement a Done() method that returns true when the MapReduce job is completely finished; at that point, mrcoordinator.go will exit.

main/mrcoordinator.go期望mr/coordinator.go实现一个Done（）方法，该方法在MapReduce作业完全完成时返回true；此时，mrcoordinator.go将退出。

- When the job is completely finished, the worker processes should exit. A simple way to implement this is to use the return value from call(): if the worker fails to contact the coordinator, it can assume that the coordinator has exited because the job is done, and so the worker can terminate too. Depending on your design, you might also find it helpful to have a "please exit" pseudo-task that the coordinator can give to workers.

当工作完全完成时，辅助进程应该退出。实现这一点的一个简单方法是使用call（）的返回值：如果辅助进程未能联系协调器，它可以假设协调器已经退出，因为工作已经完成，因此辅助进程也可以终止。根据您的设计，您可能会发现协调器可以给辅助进程一个“请退出”伪任务是有帮助的。

## Hints

- The Guidance page has some tips on developing and debugging.

该指南页面提供了一些开发和调试提示。

- One way to get started is to modify mr/worker.go's Worker() to send an RPC to the coordinator asking for a task. Then modify the coordinator to respond with the file name of an as-yet-unstarted map task. Then modify the worker to read that file and call the application Map function, as in mrsequential.go.

开始的一种方法是修改mr/worker.go's Worker（）以向请求任务的协调器发送RPC。然后修改协调器以用尚未启动的映射任务的文件名进行响应。然后修改工作器以读取该文件并调用应用程序Map函数，如mrsequential.go.

- The application Map and Reduce functions are loaded at run-time using the Go plugin package, from files whose names end in .so.

应用程序Map和Reduce函数在运行时使用Go插件包从名称以. so结尾的文件中加载。

- If you change anything in the mr/ directory, you will probably have to re-build any MapReduce plugins you use, with something like go build -race -buildmode=plugin ../mrapps/wc.go

如果您更改了mr/目录中的任何内容，您可能必须重新构建您使用的任何MapReduce插件，例如go build-race-BuildMode=plugin.../mrapps/wc.go

- This lab relies on the workers sharing a file system. That's straightforward when all workers run on the same machine, but would require a global filesystem like GFS if the workers ran on different machines.

这个实验室依赖于工作人员共享一个文件系统。当所有工作人员在同一台机器上运行时，这很简单，但是如果工作人员在不同的机器上运行，就需要像GFS这样的全局文件系统。

- A reasonable naming convention for intermediate files is mr-X-Y, where X is the Map task number, and Y is the reduce task number.

中间文件的合理命名约定是mr-X-Y，其中X是Map任务号，Y是减少任务号。

- The worker's map task code will need a way to store intermediate key/value pairs in files in a way that can be correctly read back during reduce tasks. One possibility is to use Go's encoding/json package. To write key/value pairs in JSON format to an open file:

工作人员的映射任务代码将需要一种在文件中存储中间键/值对的方法，这种方法可以在减少任务期间正确地读回。一种可能性是使用Go的编码/json包。以JSON格式将键/值对写入打开的文件：

  enc := json.NewEncoder(file)
  for _, kv := ... {
    err := enc.Encode(&kv)

并读取这样的文件：dec：=json. NewDecoder（file）
  
  dec := json.NewDecoder(file)
  for {
    var kv KeyValue
    if err := dec.Decode(&kv); err != nil {
      break
    }
    kva = append(kva, kv)
  }

- The map part of your worker can use the ihash(key) function (in worker.go) to pick the reduce task for a given key.

您的辅助角色的map部分可以使用ihash（key）函数（worker.go）为给定的key选择减少任务。

- You can steal some code from mrsequential.go for reading Map input files, for sorting intermedate key/value pairs between the Map and Reduce, and for storing Reduce output in files.

您可以从mrsequential.go中窃取一些代码，用于读取Map输入文件、对Map和Reduce之间的间隔键/值对进行排序以及将Reduce输出存储在文件中。

- The coordinator, as an RPC server, will be concurrent; don't forget to lock shared data.

协调器作为RPC服务器将是并发的；不要忘记锁定共享数据。

- Use Go's race detector, with go build -race and go run -race. test-mr.sh by default runs the tests with the race detector.

使用Go的竞赛检测器，包括go构建竞赛和go运行竞赛。默认情况下，test-mr.sh使用竞赛检测器运行测试。

- Workers will sometimes need to wait, e.g. reduces can't start until the last map has finished. One possibility is for workers to periodically ask the coordinator for work, sleeping with time.Sleep() between each request. Another possibility is for the relevant RPC handler in the coordinator to have a loop that waits, either with time.Sleep() or sync.Cond. Go runs the handler for each RPC in its own thread, so the fact that one handler is waiting won't prevent the coordinator from processing other RPCs.

工作人员有时需要等待，例如，在最后一张地图完成之前，减少无法启动。一种可能性是工作人员定期向协调器询问工作，与时间一起睡觉。每个请求之间的睡眠（）。另一种可能性是协调器中相关的RPC处理程序有一个循环，随着时间的推移而等待。睡眠（）或同步。Cond。Go在自己的线程中运行每个RPC的处理程序，所以一个处理程序正在等待的事实不会阻止协调器处理其他RPC。

- The coordinator can't reliably distinguish between crashed workers, workers that are alive but have stalled for some reason, and workers that are executing but too slowly to be useful. The best you can do is have the coordinator wait for some amount of time, and then give up and re-issue the task to a different worker. For this lab, have the coordinator wait for ten seconds; after that the coordinator should assume the worker has died (of course, it might not have).

协调者无法可靠地区分崩溃的工人、活着但由于某种原因停滞不前的工人和正在执行但执行速度太慢而不起作用的工人。你能做的最好的事情是让协调者等待一段时间，然后放弃并将任务重新分配给另一个工人。对于这个实验室，让协调者等待10秒钟；在那之后，协调者应该假设工人已经死了（当然，它可能没有死）。

- If you choose to implement Backup Tasks (Section 3.6), note that we test that your code doesn't schedule extraneous tasks when workers execute tasks without crashing. Backup tasks should only be scheduled after some relatively long period of time (e.g., 10s).

如果您选择实现备份任务（第3.6节），请注意，我们测试了当工作者执行任务而不崩溃时，您的代码不会调度无关的任务。备份任务应该只在相对较长的时间（例如10秒）后进行调度。

- To test crash recovery, you can use the mrapps/crash.go application plugin. It randomly exits in the Map and Reduce functions.

要测试崩溃恢复，您可以使用mrapps/crash.go应用程序插件。它在地图和减少功能中随机退出。

- To ensure that nobody observes partially written files in the presence of crashes, the MapReduce paper mentions the trick of using a temporary file and atomically renaming it once it is completely written. You can use ioutil.TempFile to create a temporary file and os.Rename to atomically rename it.

为了确保没有人在崩溃的情况下观察到部分写入的文件，MapReduce论文提到了使用临时文件并在完全写入后自动重命名的技巧。您可以使用ioutil. TempFile来创建临时文件，也可以使用os. Rename来自动重命名它。

- test-mr.sh runs all its processes in the sub-directory mr-tmp, so if something goes wrong and you want to look at intermediate or output files, look there. You can temporarily modify test-mr.sh to exit after the failing test, so the script does not continue testing (and overwrite the output files).

test-mr.sh在子目录mr-tmp中运行它的所有进程，所以如果出了问题，您想查看中间或输出文件，请查看那里。您可以暂时修改test-mr.sh以在测试失败后退出，这样脚本就不会继续测试（并覆盖输出文件）。

- test-mr-many.sh provides a bare-bones script for running test-mr.sh with a timeout (which is how we'll test your code). It takes as an argument the number of times to run the tests. You should not run several test-mr.sh instances in parallel because the coordinator will reuse the same socket, causing conflicts.

test-mr-many.sh提供了一个简单的脚本来运行超时test-mr.sh（这就是我们测试代码的方式）。它以运行测试的次数为参数。您不应该并行运行多个test-mr.sh实例，因为协调器会重用同一个套接字，导致冲突。

- Go RPC sends only struct fields whose names start with capital letters. Sub-structures must also have capitalized field names.

Go RPC只发送名称以大写字母开头的结构字段。子结构也必须有大写的字段名。

- When passing a pointer to a reply struct to the RPC system, the object that *reply points to should be zero-allocated. The code for RPC calls should always look like

当将指向回复结构的指针传递给RPC系统时，*回复指向的对象应该是零分配的。RPC调用的代码应该总是这样

  reply := SomeType{}
  call(..., &reply)

without setting any fields of reply before the call. If you don't follow this requirement, there will be a problem when you pre-initialize a reply field to the non-default value for that datatype, and the server on which the RPC executes sets that reply field to the default value; you will observe that the write doesnâ€™t appear to take effect, and that on the caller side, the non-default value remains.

如果您不遵循此要求，当您将回复字段预初始化为该数据类型的非默认值，并且RPC执行的服务器将该回复字段设置为默认值时，将出现问题；您将观察到写似乎™生效，并且在调用方，非默认值仍然存在。

## No-credit challenge exercises

Implement your own MapReduce application (see examples in mrapps/*), e.g., Distributed Grep (Section 2.3 of the MapReduce paper).
实现您自己的MapReduce应用程序（请参阅mrapps/*中的示例），例如，分布式Grep（MapReduce论文的第2.3节）。

Get your MapReduce coordinator and workers to run on separate machines, as they would in practice. You will need to set up your RPCs to communicate over TCP/IP instead of Unix sockets (see the commented out line in Coordinator.server()), and read/write files using a shared file system. For example, you can ssh into multiple Athena cluster machines at MIT, which use AFS to share files; or you could rent a couple AWS instances and use S3 for storage.
让您的MapReduce协调器和辅助角色在不同的机器上运行，就像他们在实践中一样。您需要将RPC设置为通过TCP/IP而不是Unix套接字进行通信（参见Coordinator.server（）中注释的输出行），并使用共享文件系统读取/写入文件。例如，您可以ssh到麻省理工学院的多个雅典娜集群机器中，这些机器使用AFS共享文件；或者您可以租用几个AWS实例，并使用S3进行存储。
