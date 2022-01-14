# MapReduce: Simplified Data Processing on Large Clusters

原文地址：https://pdos.csail.mit.edu/6.824/papers/mapreduce.pdf

## Abstract 摘要

MapReduce is a programming model and an associated implementation for processing and generating large data sets. 

MapReduce 是一种编程模型和处理并生成大型数据集的相关实现。

Users specify a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key. 

用户指定一个 map 函数处理键值对（key/value pair）并生成一组中间键值对，reduce 函数合并所有的中间值关系和一个 reduce 函数，该函数合并与同一中间键相关的所有中间值。

Many real world tasks are expressible in this model, as shown in the paper.

许多现实世界的任务都可以用这个模型来表达，如本文所示。

Programs written in this functional style are automatically parallelized and executed on a large cluster of commodity machines. 

以这种函数式风格编写的程序被自动并行化并在大型商品机集群上执行。

The run-time system takes care of the details of partitioning the input data, scheduling the program’s execution across a set of machines, handling machine failures, and managing the required inter-machine communication. 

运行时系统负责分割输入数据的细节，在一组机器上调度程序的执行，处理机器故障，以及管理所需的机器间通信。

This allows programmers without any experience with parallel and distributed systems to easily utilize the resources of a large distributed system.

这使得没有任何并行和分布式系统经验的程序员能够轻松地利用大型分布式系统的资源。

Our implementation of MapReduce runs on a large cluster of commodity machines and is highly scalable: a typical MapReduce computation processes many terabytes of data on thousands of machines. 

我们对MapReduce的实现是在一个大型的商品机集群上运行的，具有很强的可扩展性：一个典型的MapReduce计算会在成千上万的机器上处理许多TB的数据。

Programmers find the system easy to use: hundreds of MapReduce programs have been implemented and upwards of one thousand MapReduce jobs are executed on Google’s clusters every day.

程序员们发现这个系统很容易使用：已经有数百个MapReduce程序被实施，每天有多达一千多个MapReduce作业在谷歌的集群上执行。

## 1 Introduction 介绍

Over the past five years, the authors and many others at Google have implemented hundreds of special-purpose computations that process large amounts of raw data, such as crawled documents, web request logs, etc., to compute various kinds of derived data, such as inverted indices, various representations of the graph structure of web documents, summaries of the number of pages crawled per host, the set of most frequent queries in a given day, etc. 

在过去的五年里，作者和谷歌的许多其他人已经实现了数百个特殊用途的计算，这些计算处理大量的原始数据，如抓取的文件、网络请求日志等，以计算各种衍生数据，如倒置指数、网络文件的图形结构的各种表示、每个主机抓取的网页数量的总结、特定一天中最频繁的查询集合等。

Most such computations are conceptually straightforward. 

大多数这样的计算在概念上是简单明了的。

However, the input data is usually large and the computations have to be distributed across hundreds or thousands of machines in order to finish in a reasonable amount of time. 

然而，输入数据通常很大，计算必须分布在数百或数千台机器上，以便在合理的时间内完成。

The issues of how to parallelize the computation, distribute the data, and handle failures conspire to obscure the original simple computation with large amounts of complex code to deal with these issues.

如何并行计算、分配数据和处理故障等问题，合谋用大量复杂的代码来处理这些问题，掩盖了原来的简单计算。

As a reaction to this complexity, we designed a new abstraction that allows us to express the simple computations we were trying to perform but hides the messy details of parallelization, fault-tolerance, data distribution and load balancing in a library. 

作为对这种复杂性的反应，我们设计了一个新的抽象，使我们能够表达我们试图进行的简单计算，但却把并行化、容错、数据分配和负载平衡等混乱的细节隐藏在一个库中。

Our abstraction is inspired by the map and reduce primitives present in Lisp and many other functional languages. 

我们的抽象受到 Lisp 和许多其他功能语言中的 map 和 reduce 原语的启发。

We realized that most of our computations involved applying a map operation to each logical “record” in our input in order to compute a set of intermediate key/value pairs, and then applying a reduce operation to all the values that shared the same key, in order to combine the derived data appropriately. 

我们意识到，我们的大多数计算涉及到对我们输入的每一条逻辑 "记录 "应用 map 操作，以计算一组中间的键/值对，然后对所有共享相同键的值应用 reduce 操作，以适当地组合衍生数据。

Our use of a functional model with userspecified map and reduce operations allows us to parallelize large computations easily and to use re-execution as the primary mechanism for fault tolerance.

我们使用带有用户指定的 map 和 reduce 操作的函数模型，使我们能够轻松地并行化大型计算，并使用重新执行作为主要的容错机制。

The major contributions of this work are a simple and powerful interface that enables automatic parallelization and distribution of large-scale computations, combined with an implementation of this interface that achieves high performance on large clusters of commodity PCs.

这项工作的主要贡献是一个简单而强大的接口，能够实现大规模计算的自动并行化和分布，再加上这个接口的实现，在大型商品 PC 集群上实现了高性能。

Section 2 describes the basic programming model and gives several examples. 

第2节描述了基本的编程模型并给出了几个例子。

Section 3 describes an implementation of the MapReduce interface tailored towards our cluster-based computing environment. 

第3节描述了为我们基于集群的计算环境定制的MapReduce接口的实现。

Section 4 describes several refinements of the programming model that we have found useful. 

第4节描述了我们认为有用的编程模型的几个细化。

Section 5 has performance measurements of our implementation for a variety of tasks. 

第5节是我们对各种任务实现的性能测量。

Section 6 explores the use of MapReduce within Google including our experiences in using it as the basis for a rewrite of our production indexing system. 

第6节探讨了Google内部对MapReduce的使用，包括我们将其作为重写生产索引系统的基础的经验。

Section 7 discusses related and future work.

第7节讨论了相关和未来的工作。

## 2 Programming Model 编程模式

The computation takes a set of input key/value pairs, and produces a set of output key/value pairs. 

该计算接受一组输入键/值对，并产生一组输出键/值对。

The user of the MapReduce library expresses the computation as two functions: Map and Reduce.

MapReduce 库的用户将计算表达为两个函数：Map 和 Reduce 。

Map, written by the user, takes an input pair and produces a set of intermediate key/value pairs. 

由用户编写的Map，接受一个输入对，并产生一组中间的键/值对。

The MapReduce library groups together all intermediate values associated with the same intermediate key I and passes them to the Reduce function.

MapReduce 库将所有与同一中间键 I 相关的中间值组合在一起，并将它们传递给 Reduce 函数。

The Reduce function, also written by the user, accepts an intermediate key I and a set of values for that key. 

Reduce 函数也是由用户编写的，接受一个中间键I和该键的一组值。

It merges together these values to form a possibly smaller set of values. 

它将这些 value 合并在一起，形成一个可能更小的 value 集。

Typically just zero or one output value is produced per Reduce invocation. 

一般来说，每次 Reduce 调用只产生 0 或 1 个输出值。

The intermediate values are supplied to the user’s reduce function via an iterator. 

中间值通过一个迭代器提供给用户的 reduce 函数。

This allows us to handle lists of values that are too large to fit in memory.

这使我们能够处理那些大到无法装入内存的数值列表。

### 2.1 Example

Consider the problem of counting the number of occurrences of each word in a large collection of documents. 

考虑到计算大量文件中每个词的出现次数的问题。

The user would write code similar to the following pseudo-code: 

用户将编写类似于以下伪代码的代码。

```cpp
map(String key, String value):
    // key: document name
    // value: document contents
    for each word w in value:
        EmitIntermediate(w, "1");

reduce(String key, Iterator values):
    // key: a word
    // values: a list of counts
    int result = 0;
    for each v in values:
        result += ParseInt(v);
    Emit(AsString(result));
```

The map function emits each word plus an associated count of occurrences (just ‘1’ in this simple example).

map 函数计算出每个词加上相关的出现次数（在这个简单的例子中只有'1'）。

The reduce function sums together all counts emitted for a particular word. 

reduce 函数将某一特定词的所有计数相加。

In addition, the user writes code to fill in a mapreduce specification object with the names of the input and output files, and optional tuning parameters. 

此外，用户写代码来填写 mapreduce 规范对象，包括输入和输出文件的名称，以及可选的调整参数。

The user then invokes the MapReduce function, passing it the specification object. 

然后用户调用 MapReduce 函数，将规范对象传给它。

The user’s code is linked together with the MapReduce library (implemented in C++). 

用户的代码与 MapReduce 库（用C++实现）连接在一起。

Appendix A contains the full program text for this example.

附录A包含这个例子的完整程序文本。

### 2.2 Types 类型

Even though the previous pseudo-code is written in terms of string inputs and outputs, conceptually the map and reduce functions supplied by the user have associated types:

尽管前面的伪代码是用字符串输入和输出来写的，但从概念上讲，用户提供的 map 和 reduce 函数有相关类型。

    map (k1,v1) → list(k2,v2)
    reduce (k2,list(v2)) → list(v2)

I.e., the input keys and values are drawn from a different domain than the output keys and values. 

也就是说，输入的键和值与输出的键和值来自不同的领域。

Furthermore, the intermediate keys and values are from the same domain as the output keys and values. 

此外，中间键和值与输出键和值来自同一领域。

Our C++ implementation passes strings to and from the user-defined functions and leaves it to the user code to convert between strings and appropriate types.

我们的 C++ 实现将字符串传递给用户定义的函数，并让用户代码在字符串和适当类型之间进行转换。

### 2.3 More Examples 更多例子

Here are a few simple examples of interesting programs that can be easily expressed as MapReduce computations.

下面是几个简单的例子，这些有趣的程序可以很容易地表达为 MapReduce 的计算。

**Distributed Grep:** The map function emits a line if it matches a supplied pattern. 

分布式 Grep: map 函数如果与提供的模式相匹配，就会发出一个行。

The reduce function is an identity function that just copies the supplied intermediate data to the output.

reduce 函数是一个 identity function，只是将提供的中间数据复制到输出。

**Count of URL Access Frequency:** The map function processes logs of web page requests and outputs <URL, 1>. The reduce function adds together all values for the same URL and emits a <URL, total count> pair.

URL 访问频率的计数。map 函数处理网页请求的日志并输出 <URL, 1>。reduce 函数将同一 URL 的所有值加在一起，并计算 <URL, total count> 键值对.

**Reverse Web-Link Graph:** The map function outputs <target, source> pairs for each link to a target URL found in a page named source. 

反向网络链接图。该 map 函数为在名为 source 的页面中发现的每个指向目标URL的链接输出 <target, source> 键值对。

The reduce function concatenates the list of all source URLs associated with a given target URL and emits the pair: <target, list(source)>

reduce 函数将与给定的目标 URL 相关的所有源 URL 的列表连接起来，并发出这一对。<target, list(source)>

**Term-Vector per Host:** A term vector summarizes the most important words that occur in a document or a set of documents as a list of <word, frequency> pairs. 

每个主机的术语向量：术语向量将一个文件或一组文件中出现的最重要的词总结为一个 <词，频率> 对的列表。

The map function emits a <hostname, term vector> pair for each input document (where the hostname is extracted from the URL of the document). 

map 函数为每个输入的文档发出一个<主机名，术语向量>对（其中主机名是从文档的 URL 中提取的）。

The reduce function is passed all per-document term vectors for a given host. 

reduce 函数被传递给一个给定的主机的所有每文档术语向量。

It adds these term vectors together, throwing away infrequent terms, and then emits a final <hostname, term vector> pair.

它把这些术语向量加在一起，扔掉不经常出现的术语，然后发出一个最终的<主机名，术语向量>对。

![图1：执行情况概述](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.6nkkrgxqi6w0.webp)

**Inverted Index:** The map function parses each document, and emits a sequence of <word, document ID> pairs. 

**反转索引：** map函数解析每个文档，并发出一串<字，文档ID>对。

The reduce function accepts all pairs for a given word, sorts the corresponding document IDs and emits a <word, list(document ID)> pair. 

reduce 函数接受一个给定单词的所有配对，对相应的文档ID进行排序，并发出一个<单词，list(文档ID)>配对。

The set of all output pairs forms a simple inverted index. It is easy to augment this computation to keep track of word positions. 

所有输出对的集合形成一个简单的倒置索引。很容易对这种计算进行扩充，以保持对单词位置的跟踪。

**Distributed Sort:** The map function extracts the key from each record, and emits a <key, record> pair. 

**分布式排序：** map函数从每条记录中提取键，并发出一个<键，记录>对。

The reduce function emits all pairs unchanged. This computation depends on the partitioning facilities described in Section 4.1 and the ordering properties described in Section 4.2.

reduce 函数发射出所有的对，不做任何改变。这种计算依赖于第4.1节中描述的分区设施和第4.2节中描述的排序属性。

## 3 Implementation 实现

Many different implementations of the MapReduce interface are possible. 

MapReduce 接口的许多不同实现都是可能的。

The right choice depends on the environment. 

正确的选择取决于环境。

For example, one implementation may be suitable for a small shared-memory machine, another for a large NUMA multi-processor, and yet another for an even larger collection of networked machines.

例如，一个实施方案可能适合小型共享内存机器，另一个适合大型 NUMA 多处理器，还有一个适合更大的网络机器集合。

This section describes an implementation targeted to the computing environment in wide use at Google:large clusters of commodity PCs connected together with switched Ethernet [4]. In our environment:

本节描述了一个针对谷歌广泛使用的计算环境的实现：用交换式以太网[4]连接起来的大型商品PC集群。在我们的环境中。

(1) Machines are typically dual-processor x86 processors running Linux, with 2-4 GB of memory per machine.

(1) 机器通常是运行Linux的双处理器X86处理器，每台机器有2-4GB的内存。

(2) Commodity networking hardware is used – typically either 100 megabits/second or 1 gigabit/second at the machine level, but averaging considerably less in overall bisection bandwidth.

(2) 使用商品网络硬件--通常在机器层面上是100兆比特/秒或1千兆比特/秒，但平均而言，整体分节带宽要小得多。

(3) A cluster consists of hundreds or thousands of machines, and therefore machine failures are common. 

(3) 一个集群由数百或数千台机器组成，因此，机器故障是很常见的。

(4) Storage is provided by inexpensive IDE disks attached directly to individual machines. A distributed file system [8] developed in-house is used to manage the data stored on these disks. The file system uses replication to provide availability and reliability on top of unreliable hardware.

(4) 存储是由直接连接到各个机器的廉价IDE磁盘提供的。一个内部开发的分布式文件系统[8]被用来管理存储在这些磁盘上的数据。该文件系统使用复制技术，在不可靠的硬件上提供可用性和可靠性。

(5) Users submit jobs to a scheduling system. Each job consists of a set of tasks, and is mapped by the scheduler to a set of available machines within a cluster.

(5) 用户向调度系统提交作业。每个作业由一组任务组成，并由调度器映射到集群中的一组可用机器上。

## 3.1 Execution Overview 执行总览

The Map invocations are distributed across multiple machines by automatically partitioning the input data into a set of M splits. 

通过将输入数据自动划分为一组M个分片，Map 调用被分布在多个机器上。

The input splits can be processed in parallel by different machines. 

输入的分片可以由不同的机器并行处理。

Reduce invocations are distributed by partitioning the intermediate key space into R pieces using a partitioning function (e.g., hash(key) mod R). 

Reduce 调用是通过使用分区函数（例如，hash(key)mod R）将中间的密钥空间划分为 R 块来进行分配。

The number of partitions (R) and the partitioning function are specified by the user.

分区的数量（R）和分区的功能由用户指定。

Figure 1 shows the overall flow of a MapReduce operation in our implementation. 

图1显示了我们实现中的 MapReduce 操作的整体流程。

When the user program calls the MapReduce function, the following sequence of actions occurs (the numbered labels in Figure 1 correspond to the numbers in the list below):

当用户程序调用 MapReduce 函数时，会发生以下一系列动作（图1中的数字标签与下面列表中的数字对应）。

1. The MapReduce library in the user program first splits the input files into M pieces of typically 16 megabytes to 64 megabytes (MB) per piece (controllable by the user via an optional parameter). It then starts up many copies of the program on a cluster of machines.

    用户程序中的 MapReduce 库首先将输入文件分割成 M 块，每块通常为 16 兆到 64 兆（MB）（可由用户通过一个可选参数控制）。然后，它在一个机器集群上启动许多程序副本。

2. One of the copies of the program is special – the master. The rest are workers that are assigned work by the master. There are M map tasks and R reduce tasks to assign. The master picks idle workers and assigns each one a map task or a reduce task.

    程序的一个副本是特殊的--主程序(master)。其余的是由主程序分配工作的工作者(worker)。有 M 个 map 任务和 R 个 reduce 任务需要分配。主程序挑选空闲的 worker，给每个 worker 分配一个 map 任务或一个 reduce 任务。

1. A worker who is assigned a map task reads the contents of the corresponding input split. It parses key/value pairs out of the input data and passes each pair to the user-defined Map function. The intermediate key/value pairs produced by the Map function are buffered in memory.

    一个被分配到 map 任务的 worker 会读取相应的输入分片的内容。它从输入数据中解析出键/值对，并将每个键/值对传递给用户定义的 Map 函数。由 Map 函数产生的中间键/值对被缓冲在内存中。

3. Periodically, the buffered pairs are written to local disk, partitioned into R regions by the partitioning function. The locations of these buffered pairs on the local disk are passed back to the master, who is responsible for forwarding these locations to the reduce workers.

    周期性地，缓冲对被写入本地磁盘，通过分区功能被分割成 R 个区域。这些缓冲对在本地磁盘上的位置被传回给 master ，master 负责将这些位置转发给 reduce worker。

5. When a reduce worker is notified by the master about these locations, it uses remote procedure calls to read the buffered data from the local disks of the map workers. When a reduce worker has read all intermediate data, it sorts it by the intermediate keys so that all occurrences of the same key are grouped together. The sorting is needed because typically many different keys map to the same reduce task. If the amount of intermediate data is too large to fit in memory, an external sort is used.

    当一个 reduce worker 收到 master 关于这些位置的通知时，它使用远程过程调用从 map worker 的本地磁盘上读取缓冲数据。当一个 reduce worker 读取了所有的中间数据后，它将按照中间键进行排序，以便将所有相同键的出现归为一组。之所以需要排序，是因为通常许多不同的键会映射到同一个 reduce 任务。如果中间数据量太大，无法在内存中容纳，就会使用一个外部排序。

7. The reduce worker iterates over the sorted intermediate data and for each unique intermediate key encountered, it passes the key and the corresponding set of intermediate values to the user’s Reduce function. The output of the Reduce function is appended to a final output file for this reduce partition.

    reduce worker 在排序的中间数据上进行迭代，对于遇到的每个唯一的中间键，它将键和相应的中间值集传递给用户的 Reduce 函数。Reduce 函数的输出被附加到这个Reduce分区的最终输出文件中。

9. When all map tasks and reduce tasks have been completed, the master wakes up the user program. At this point, the MapReduce call in the user program returns back to the user code. 

    当所有的 map 任务和 reduce 任务都完成后，主程序会唤醒用户程序。这时，用户程序中的 MapReduce 调用又回到了用户代码中。

After successful completion, the output of the mapreduce execution is available in the R output files (one per reduce task, with file names as specified by the user). Typically, users do not need to combine these R output files into one file – they often pass these files as input to another MapReduce call, or use them from another distributed application that is able to deal with input that is partitioned into multiple files.

成功完成后，mapreduce 执行的输出可以在 R 输出文件中得到（每个还原任务一个，文件名由用户指定）。通常情况下，用户不需要将这些R输出文件合并成一个文件--他们经常将这些文件作为输入传递给另一个MapReduce调用，或者从另一个能够处理被分割成多个文件的输入的分布式程序中使用这些文件。

### 3.2 Master Data Structures

The master keeps several data structures. 

master 保留了几个数据结构。

For each map task and reduce task, it stores the state (idle, in-progress, or completed), and the identity of the worker machine (for non-idle tasks). 

对于每个 map 任务和 reduce 任务，它存储状态（空闲、进行中或完成），以及 worker 的身份（对于非空闲任务）。

The master is the conduit through which the location of intermediate file regions is propagated from map tasks to reduce tasks. 

master 是一个管道，中间文件区域的位置通过它从 map 任务传播到 reduce 任务。

Therefore, for each completed map task, the master stores the locations and sizes of the R intermediate file regions produced by the map task. 

因此，对于每个已完成的 map 任务，master 存储了由 map 任务产生的 R 中间文件区域的位置和大小。

Updates to this location and size information are received as map tasks are completed. The information is pushed incrementally to workers that have in-progress reduce tasks.

随着 map 任务的完成，会收到对这个位置和大小信息的更新。这些信息被递增地推送给有正在进行的 reduce 任务的工作者。

### 3.3 Fault Tolerance

Since the MapReduce library is designed to help process very large amounts of data using hundreds or thousands of machines, the library must tolerate machine failures gracefully.

由于 MapReduce 库被设计为使用成百上千台机器帮助处理非常大量的数据，所以该库必须优雅地容忍机器故障。

**Worker Failure** 

The master pings every worker periodically. 

master 会定期对每个工作器进行 ping。

If no response is received from a worker in a certain amount of time, the master marks the worker as failed. 

如果在一定时间内没有收到工作器的响应，master 将该工作器标记为失败。

Any map tasks completed by the worker are reset back to their initial idle state, and therefore become eligible for scheduling on other workers. 

worker 完成的任何 map 任务都被重置为最初的闲置状态，因此有资格在其他工作者上进行调度。

Similarly, any map task or reduce task in progress on a failed worker is also reset to idle and becomes eligible for rescheduling.

同样地，失败的工作器上正在进行的任何 map 任务或 reduce 任务也被重置为空闲，并有资格被重新安排。

Completed map tasks are re-executed on a failure because their output is stored on the local disk(s) of the failed machine and is therefore inaccessible. 

已完成的 map 任务在故障时被重新执行，因为它们的输出被存储在故障机器的本地磁盘上，因此无法访问。

Completed reduce tasks do not need to be re-executed since their output is stored in a global file system.

已完成的 reduce 任务不需要重新执行，因为它们的输出被存储在一个全局文件系统中。

When a map task is executed first by worker A and then later executed by worker B (because A failed), all workers executing reduce tasks are notified of the re-execution. 

当一个 map 任务先由 worker A 执行，然后再由 worker B 执行（因为A失败了），所有执行 reduce 任务的 worker 都会收到重新执行的通知。

Any reduce task that has not already read the data from worker A will read the data from worker B. 

任何尚未从工作者 A 读取数据的 reduce 任务将从工作者 B 读取数据。

MapReduce is resilient to large-scale worker failures. 

MapReduce对大规模工作者的故障具有弹性。

For example, during one MapReduce operation, network maintenance on a running cluster was causing groups of 80 machines at a time to become unreachable for several minutes. 

例如，在一次 MapReduce 操作中，正在运行的集群上的网络维护导致一次 80 台机器的群组在数分钟内无法连接。

The MapReduce master simply re-executed the work done by the unreachable worker machines, and continued to make forward progress, eventually completing the MapReduce operation.

MapReduce 主程序只是重新执行了无法到达的 worker 所做的工作，并继续向前推进，最终完成了 MapReduce 操作。

**Master Failure**

It is easy to make the master write periodic checkpoints of the master data structures described above. 

要让 master 写出上述 master 数据结构的定期检查点是很容易的。

If the master task dies, a new copy can be started from the last checkpointed state. 

如果 master 任务死亡，可以从最后的检查点状态启动一个新的副本。

However, given that there is only a single master, its failure is unlikely; therefore our current implementation aborts the MapReduce computation if the master fails. 

然而，考虑到只有一个master ，它的失败是不可能的；因此，我们目前的实现在master 失败时中止了 MapReduce 的计算。

Clients can check for this condition and retry the MapReduce operation if they desire.

客户端可以检查这种情况，并根据需要重试 MapReduce 操作。

Semantics in the Presence of Failures When the user-supplied map and reduce operators are deterministic functions of their input values, our distributed implementation produces the same output as would have been produced by a non-faulting sequential execution of the entire program.

失败情况下的语义当用户提供的 map 和 reduce 操作符是其输入值的确定性函数时，我们的分布式实现会产生与整个程序的非故障顺序执行所产生的相同的输出。

We rely on atomic commits of map and reduce task outputs to achieve this property.

我们依靠 map 和 reduce 任务输出的原子提交来实现这一特性。

Each in-progress task writes its output to private temporary files. 

每个正在进行的任务都将其输出写入私人临时文件。

A reduce task produces one such file, and a map task produces R such files (one per reduce task). 

一个 reduce 任务产生一个这样的文件，而一个 map 任务产生R个这样的文件（每个还原任务一个）。

When a map task completes, the worker sends a message to the master and includes the names of the R temporary files in the message. 

当一个 map 任务完成后， worker 会向 master 发送一个消息，并在消息中包括 R 个临时文件的名称。

If the master receives a completion message for an already completed map task, it ignores the message. 

如果master 收到一个已经完成的 map 任务的完成消息，它将忽略该消息。

Otherwise, it records the names of R files in a master data structure. 

否则，它在一个主数据结构中记录 R 文件的名称。

When a reduce task completes, the reduce worker atomically renames its temporary output file to the final output file. 

当一个 reduce 任务完成后，reduce 工作者会将其临时输出文件原子化地重命名为最终输出文件。

If the same reduce task is executed on multiple machines, multiple rename calls will be executed for the same final output file. 

如果同一个 reduce 任务在多台机器上执行，就会为同一个最终输出文件执行多次重命名调用。

We rely on the atomic rename operation provided by the underlying file system to guarantee that the final file system state contains just the data produced by one execution of the reduce task.

我们依靠底层文件系统提供的原子重命名操作来保证最终的文件系统状态只包含 reduce 任务的一次执行所产生的数据。

The vast majority of our map and reduce operators are deterministic, and the fact that our semantics are equivalent to a sequential execution in this case makes it very easy for programmers to reason about their program’s behavior. 

我们绝大多数的 map 和 reduce 操作符都是确定性的，在这种情况下，我们的语义等同于顺序执行，这使得程序员非常容易推理他们的程序行为。

When the map and/or reduce operators are nondeterministic, we provide weaker but still reasonable semantics. 

当 map/reduce 操作符是不确定性的，我们提供较弱但仍然合理的语义。

In the presence of non-deterministic operators, the output of a particular reduce task R1 is equivalent to the output for R1 produced by a sequential execution of the non-deterministic program. 

在不确定性运算符存在的情况下，一个特定的 reduce 任务 R1 的输出等同于不确定性程序的顺序执行所产生的R1的输出。

However, the output for a different reduce task R2 may correspond to the output for R2 produced by a different sequential execution of the non-deterministic program.

然而，不同的 reduce 任务R2的输出可能对应于非决定性程序的不同顺序执行所产生的 R2 的输出。

Consider map task M and reduce tasks R1 and R2. Let e(Ri) be the execution of Ri that committed (there is exactly one such execution). 

考虑 map 任务 M 和 reduce 任务 R1 和 R2 。让 e(Ri) 为 Ri 的执行结果（正好有一个这样的执行）。

The weaker semantics arise because e(R1) may have read the output produced by one execution of M and e(R2) may have read the output produced by a different execution of M.

出现这种较弱的语义是因为 e(R1) 可能已经读取了 M 的一个执行所产生的输出，而 e(R2) 可能已经读取了 M 的另一个执行所产生的输出。

## 3.4 Locality 

Network bandwidth is a relatively scarce resource in our computing environment. 

在我们的计算环境中，网络带宽是一种相对稀缺的资源。

We conserve network bandwidth by taking advantage of the fact that the input data (managed by GFS [8]) is stored on the local disks of the machines that make up our cluster. 

我们通过利用输入数据（由GFS[8]管理）存储在构成我们集群的机器的本地磁盘上这一事实来节约网络带宽。

GFS divides each file into 64 MB blocks, and stores several copies of each block (typically 3 copies) on different machines. 

GFS将每个文件划分为64MB的块，并在不同的机器上存储每个块的几个副本（通常是3个副本）。

The MapReduce master takes the location information of the input files into account and attempts to schedule a map task on a machine that contains a replica of the corresponding input data. 

MapReduce 主程序考虑到了输入文件的位置信息，并试图在包含相应输入数据副本的机器上安排一个 map 任务。

Failing that, it attempts to schedule a map task near a replica of that task’s input data (e.g., on a worker machine that is on the same network switch as the machine containing the data). 

如果做不到这一点，它就会尝试将 map 任务安排在该任务的输入数据的副本附近（例如，在与包含数据的机器处于同一网络交换机上的工作者机器上）。

When running large MapReduce operations on a significant fraction of the workers in a cluster, most input data is read locally and consumes no network bandwidth.

当在集群中相当一部分工作者上运行大型 MapReduce 操作时，大多数输入数据是在本地读取的，不消耗网络带宽。

## 3.5 Task Granularity 任务颗粒度

We subdivide the map phase into M pieces and the reduce phase into R pieces, as described above. 

如上所述，我们将映射阶段细分为 M 块，将还原阶段细分为 R 块。

Ideally, M and R should be much larger than the number of worker machines. 

理想情况下，M 和 R 应该远远大于工人机器的数量。

Having each worker perform many different tasks improves dynamic load balancing, and also speeds up recovery when a worker fails: the many map tasks it has completed can be spread out across all the other worker machines.

让每个工作者执行许多不同的任务，可以改善动态负载平衡，还可以在一个工作者失败时加快恢复速度：它所完成的许多 map 任务可以分散到所有其他工作者机器上。

There are practical bounds on how large M and R can be in our implementation, since the master must make O(M + R) scheduling decisions and keeps O(M ∗ R) state in memory as described above. (The constant factors for memory usage are small however: the O(M ∗R) piece of the state consists of approximately one byte of data per map task/reduce task pair.)

在我们的实现中，对M和R的大小是有实际限制的，因为主程序必须做出O(M + R)的调度决定，并在内存中保持O(M ∗ R)的状态，如上所述。(然而，内存使用的恒定因素很小：状态的O(M ∗R)部分由每个 map/reduce 任务对的大约一个字节的数据组成）。

Furthermore, R is often constrained by users because the output of each reduce task ends up in a separate output file. 

此外，R经常受到用户的制约，因为每个 reduce 任务的输出最终都在一个单独的输出文件中。

In practice, we tend to choose M so that each individual task is roughly 16 MB to 64 MB of input data (so that the locality optimization described above is most effective), and we make R a small multiple of the number of worker machines we expect to use. 

在实践中，我们倾向于选择 M，使每个单独的任务大约是16MB到64MB的输入数据（以便上述的定位优化是最有效的），并且我们使 R 成为我们预期使用的工人机器数量的一个小倍。

We often perform MapReduce computations with M = 200, 000 and R = 5, 000, using 2,000 worker machines.

我们经常使用 2,000 台工作机进行 M=200,000 和 R=5,000 的 MapReduce 计算。

## 3.6 Backup Tasks 备份任务

One of the common causes that lengthens the total time taken for a MapReduce operation is a “straggler”: a machine that takes an unusually long time to complete one of the last few map or reduce tasks in the computation.

延长 MapReduce 操作总时间的常见原因之一是 "落伍者"：一台机器花了异常长的时间来完成计算中最后几个 map 或 reduce 任务中的一个。

Stragglers can arise for a whole host of reasons. 

落伍者的出现有很多原因。

For example, a machine with a bad disk may experience frequent correctable errors that slow its read performance from 30 MB/s to 1 MB/s. 

例如，一台有坏磁盘的机器可能会经常出现可纠正的错误，使其读取性能从30MB/s降至1MB/s。

The cluster scheduling system may have scheduled other tasks on the machine, causing it to execute the MapReduce code more slowly due to competition for CPU, memory, local disk, or network bandwidth. 

集群调度系统可能已经在机器上安排了其他任务，由于对CPU、内存、本地磁盘或网络带宽的竞争，导致它执行MapReduce代码的速度更慢。

A recent problem we experienced was a bug in machine initialization code that caused processor caches to be disabled: computations on affected machines slowed down by over a factor of one hundred.

我们最近遇到的一个问题是机器初始化代码中的一个错误，导致处理器缓存被禁用：受影响机器上的计算速度降低了一百多倍。

We have a general mechanism to alleviate the problem of stragglers. 

我们有一个普遍的机制来缓解落伍者的问题。

When a MapReduce operation is close to completion, the master schedules backup executions of the remaining in-progress tasks. 

当一个MapReduce操作接近完成时，master 会安排对剩余的进行中任务进行备份执行。

The task is marked as completed whenever either the primary or the backup execution completes. 

只要主程序或备份程序执行完毕，该任务就被标记为完成。

We have tuned this mechanism so that it typically increases the computational resources used by the operation by no more than a few percent.

我们对这一机制进行了调整，使其通常会使操作所使用的计算资源增加不超过百分之几。

We have found that this significantly reduces the time to complete large MapReduce operations. 

我们发现，这大大减少了完成大型MapReduce操作的时间。

As an example, the sort program described in Section 5.3 takes 44% longer to complete when the backup task mechanism is disabled.

作为一个例子，第5.3节中描述的排序程序在禁用备份任务机制时需要花费44%的时间来完成。

# 4 Refinements 完善

Although the basic functionality provided by simply writing Map and Reduce functions is sufficient for most needs, we have found a few extensions useful. 

尽管简单地编写 Map 和 Reduce 函数所提供的基本功能足以满足大多数需求，但我们发现有一些扩展是很有用的。

These are described in this section.

本节将介绍这些情况。

## 4.1 Partitioning Function 分区函数

The users of MapReduce specify the number of reduce tasks/output files that they desire (R). 

MapReduce的用户指定他们想要的 reduce 任务/输出文件的数量（R）。

Data gets partitioned across these tasks using a partitioning function on the intermediate key. 

数据在这些任务中使用中间密钥的分区函数进行分区。

A default partitioning function is provided that uses hashing (e.g. “hash(key) mod R”).

提供了一个使用散列法的默认分区函数（例如 "hash(key) mod R"）。

This tends to result in fairly well-balanced partitions. 

这往往会导致相当均衡的分区。

In some cases, however, it is useful to partition data by some other function of the key. 

然而，在某些情况下，通过密钥的一些其他功能来划分数据是很有用的。

For example, sometimes the output keys are URLs, and we want all entries for a single host to end up in the same output file. 

例如，有时输出键是 URL ，而我们希望一个主机的所有条目最终都出现在同一个输出文件中。

To support situations like this, the user of the MapReduce library can provide a special partitioning function. 

为了支持这样的情况，MapReduce库的用户可以提供一个特殊的分区功能。

For example, using “hash(Hostname(urlkey)) mod R” as the partitioning function causes all URLs from the same host to end up in the same output file.

例如，使用 "hash(Hostname(urlkey))mod R "作为分区函数会导致来自同一主机的所有URL最终出现在同一个输出文件中。

## 4.2 Ordering Guarantees 订购保证

We guarantee that within a given partition, the intermediate key/value pairs are processed in increasing key order. 

我们保证在一个给定的分区内，中间的键/值对是按键的递增顺序处理的。

This ordering guarantee makes it easy to generate a sorted output file per partition, which is useful when the output file format needs to support efficient random access lookups by key, or users of the output find it convenient to have the data sorted.

这种排序保证使得每个分区很容易生成一个排序的输出文件，这在输出文件格式需要支持有效的按键随机访问查找，或者输出的用户觉得数据排序很方便的情况下很有用。

## 4.3 Combiner Function 组合器功能

In some cases, there is significant repetition in the intermediate keys produced by each map task, and the userspecified Reduce function is commutative and associative. 

在某些情况下，每个 map 任务产生的中间键会有明显的重复，而用户指定的 Reduce 函数是换元和关联的。

A good example of this is the word counting example in Section 2.1. Since word frequencies tend to follow a Zipf distribution, each map task will produce hundreds or thousands of records of the form <the, 1>. 

这方面的一个很好的例子是第2.1节中的单词计数例子。由于单词频率往往遵循 Zipf 分布，每个 map 任务都会产生成百上千条形式为<the, 1>的记录。

All of these counts will be sent over the network to a single reduce task and then added together by the Reduce function to produce one number. 

所有这些计数都将通过网络发送到一个 Reduce 任务，然后由 Reduce 函数相加，产生一个数字。

We allow the user to specify an optional Combiner function that does partial merging of this data before it is sent over the network. 

我们允许用户指定一个可选的组合器函数，在网络上发送之前对这些数据进行部分合并。

The Combiner function is executed on each machine that performs a map task. Typically the same code is used to implement both the combiner and the reduce functions. 

Combiner 函数在每台执行 map 任务的机器上执行。通常情况下，同样的代码被用来实现梳理器和还原函数。

The only difference between a reduce function and a combiner function is how the MapReduce library handles the output of the function. 

reduce 函数和 combiner 函数的唯一区别是 MapReduce 库如何处理函数的输出。

The output of a reduce function is written to the final output file. 

reduce 函数的输出被写入最终输出文件。

The output of a combiner function is written to an intermediate file that will be sent to a reduce task. 

组合器函数的输出被写入一个中间文件，该文件将被发送到一个减少任务。

Partial combining significantly speeds up certain classes of MapReduce operations. Appendix A contains an example that uses a combiner.

部分组合器大大加快了某些类别的 MapReduce 操作。附录 A 包含一个使用组合器的例子。

## 4.4 Input and Output Types 输入和输出类型

The MapReduce library provides support for reading input data in several different formats. 

MapReduce 库提供了对读取几种不同格式的输入数据的支持。

For example, “text” mode input treats each line as a key/value pair: the key is the offset in the file and the value is the contents of the line. 

例如，"文本 "模式的输入将每一行视为一个键/值对：键是文件中的偏移，值是该行的内容。

Another common supported format stores a sequence of key/value pairs sorted by key. 

另一种常见的支持格式是存储一串按键排序的键/值对。

Each input type implementation knows how to split itself into meaningful ranges for processing as separate map tasks (e.g. text mode’s range splitting ensures that range splits occur only at line boundaries). 

每个输入类型的实现都知道如何将自己分割成有意义的范围，作为单独的 map 任务进行处理（例如，文本模式的范围分割确保范围分割只发生在行的边界）。

Users can add support for a new input type by providing an implementation of a simple reader interface, though most users just use one of a small number of predefined input types.

用户可以通过提供一个简单的阅读器接口的实现来增加对新的输入类型的支持，尽管大多数用户只是使用少数预定义输入类型中的一种。

A reader does not necessarily need to provide data read from a file. 

读者不一定需要提供从文件中读取的数据。

For example, it is easy to define a reader that reads records from a database, or from data structures mapped in memory.

例如，很容易定义一个从数据库或从内存中映射的数据结构读取记录的阅读器。

In a similar fashion, we support a set of output types for producing data in different formats and it is easy for user code to add support for new output types.

以类似的方式，我们支持一组输出类型，用于产生不同格式的数据，而且用户代码很容易增加对新输出类型的支持。

## 4.5 Side-effects 副作用

In some cases, users of MapReduce have found it convenient to produce auxiliary files as additional outputs from their map and/or reduce operators. 

在某些情况下，MapReduce 的用户发现产生辅助文件作为其 map 和/或 reduce 操作者的额外输出是很方便的。

We rely on the application writer to make such side-effects atomic and idempotent. 

我们依靠应用程序的编写者来使这种副作用成为原子性的和可豁免的。

Typically the application writes to a temporary file and atomically renames this file once it has been fully generated.

通常情况下，应用程序写入一个临时文件，一旦该文件被完全生成，就原子化地重命名该文件。

We do not provide support for atomic two-phase commits of multiple output files produced by a single task.

我们不提供对一个任务产生的多个输出文件的原子性两阶段提交的支持。

Therefore, tasks that produce multiple output files with cross-file consistency requirements should be deterministic. 

因此，产生多个具有跨文件一致性要求的输出文件的任务应该是确定性的。

This restriction has never been an issue in practice.

这一限制在实践中从未成为一个问题。

## 4.6 Skipping Bad Records 跳过不良记录

Sometimes there are bugs in user code that cause the Map or Reduce functions to crash deterministically on certain records. 

有时，用户代码中存在一些错误，导致 Map 或 Reduce 函数在某些记录上确定性地崩溃。

Such bugs prevent a MapReduce operation from completing. 

这样的错误使 MapReduce 操作无法完成。

The usual course of action is to fix the bug, but sometimes this is not feasible; perhaps the bug is in a third-party library for which source code is unavailable. 

通常的做法是修复错误，但有时这并不可行；也许错误是在一个第三方库中，而该库的源代码是不可用的。

Also, sometimes it is acceptable to ignore a few records, for example when doing statistical analysis on a large data set. 

另外，有时忽略几条记录也是可以接受的，例如在对一个大数据集进行统计分析时。

We provide an optional mode of execution where the MapReduce library detects which records cause deterministic crashes and skips these records in order to make forward progress.

我们提供了一种可选的执行模式，即MapReduce库会检测哪些记录会导致确定性崩溃，并跳过这些记录，以便向前推进。

Each worker process installs a signal handler that catches segmentation violations and bus errors. 

每个工作进程都安装了一个信号处理程序，用于捕捉违反分段规定和总线错误。

Before invoking a user Map or Reduce operation, the MapReduce library stores the sequence number of the argument in a global variable. 

在调用用户的 Map 或 Reduce 操作之前，MapReduce 库将参数的序列号存储在一个全局变量中。

If the user code generates a signal, the signal handler sends a “last gasp” UDP packet that contains the sequence number to the MapReduce master. 

如果用户代码产生了一个信号，信号处理程序会向MapReduce主程序发送一个包含序列号的 "最后一击 "UDP包。

When the master has seen more than one failure on a particular record, it indicates that the record should be skipped when it issues the next re-execution of the corresponding Map or Reduce task.

当master 在某一特定记录上看到一个以上的故障时，它表示在发出相应的 Map 或 Reduce 任务的下一次重新执行时应跳过该记录。

## 4.7 Local Execution 本地执行

Debugging problems in Map or Reduce functions can be tricky, since the actual computation happens in a distributed system, often on several thousand machines, with work assignment decisions made dynamically by the master. 

调试Map或Reduce函数中的问题可能很棘手，因为实际计算是在分布式系统中进行的，通常是在几千台机器上进行，工作分配的决定是由master 动态做出的。

To help facilitate debugging, profiling, and small-scale testing, we have developed an alternative implementation of the MapReduce library that sequentially executes all of the work for a MapReduce operation on the local machine. 

为了方便调试、剖析和小规模测试，我们开发了一个 MapReduce 库的替代实现，在本地机器上按顺序执行一个 MapReduce 操作的所有工作。

Controls are provided to the user so that the computation can be limited to particular map tasks. 

向用户提供控制，以便将计算限制在特定的 map 任务上。

Users invoke their program with a special flag and can then easily use any debugging or testing tools they find useful (e.g. gdb).

用户用一个特殊的标志调用他们的程序，然后可以方便地使用他们认为有用的任何调试或测试工具（如gdb）。

## 4.8 Status Information 状态信息

The master runs an internal HTTP server and exports a set of status pages for human consumption. 

master 运行一个内部的HTTP服务器，并输出一组状态页面供人使用。

The status pages show the progress of the computation, such as how many tasks have been completed, how many are in progress, bytes of input, bytes of intermediate data, bytes of output, processing rates, etc. 

状态页显示了计算的进展，例如有多少任务已经完成，有多少正在进行中，输入的字节数，中间数据的字节数，输出的字节数，处理率等等。

The pages also contain links to the standard error and standard output files generated by each task. 

这些页面还包括每个任务产生的标准错误和标准输出文件的链接。

The user can use this data to predict how long the computation will take, and whether or not more resources should be added to the computation. 

用户可以使用这些数据来预测计算将需要多长时间，以及是否应该为计算添加更多的资源。

These pages can also be used to figure out when the computation is much slower than expected.

这些页面也可以用来计算出什么时候计算速度比预期的慢得多。

In addition, the top-level status page shows which workers have failed, and which map and reduce tasks they were processing when they failed. 

此外，顶层状态页面显示哪些工作者失败了，以及他们失败时正在处理哪些映射和还原任务。

This information is useful when attempting to diagnose bugs in the user code.

在试图诊断用户代码中的错误时，这些信息很有用。

## 4.9 Counters 计数器

The MapReduce library provides a counter facility to count occurrences of various events. 

MapReduce库提供了一个计数器，用来计算各种事件的发生次数。

For example, user code may want to count total number of words processed or the number of German documents indexed, etc. 

例如，用户代码可能想计算处理的总字数或索引的德国文件的数量，等等。

To use this facility, user code creates a named counter object and then increments the counter appropriately in the Map and/or Reduce function. For example:

为了使用这一设施，用户代码创建一个命名的计数器对象，然后在 Map 和/或 Reduce 函数中适当地增加该计数器。比如说。

    Counter* uppercase;
    uppercase = GetCounter("uppercase");

    map(String name, String contents):
        for each word w in contents:
            if (IsCapitalized(w)):
                uppercase->Increment();
            EmitIntermediate(w, "1");

The counter values from individual worker machines are periodically propagated to the master (piggybacked on the ping response). 

来自各个工人机器的计数器值会定期传播到master （捎带Ping响应）。

The master aggregates the counter values from successful map and reduce tasks and returns them to the user code when the MapReduce operation is completed. 

master 汇总来自成功的映射和还原任务的计数器值，并在MapReduce操作完成后将其返回给用户代码。

The current counter values are also displayed on the master status page so that a human can watch the progress of the live computation. 

当前的计数器值也显示在主状态页面上，这样人就可以看到实时计算的进展。

When aggregating counter values, the master eliminates the effects of duplicate executions of the same map or reduce task to avoid double counting. (Duplicate executions can arise from our use of backup tasks and from re-execution of tasks due to failures.)

在汇总计数器的值时，主程序消除了同一 map 或 reduce 任务重复执行的影响，以避免重复计算。(重复执行可能来自于我们对备份任务的使用，以及因故障而重新执行的任务)。

Some counter values are automatically maintained by the MapReduce library, such as the number of input key value pairs processed and the number of output key/value pairs produced.

有些计数器值是由MapReduce库自动维护的，比如处理的输入键值对的数量和产生的输出键/值对的数量。

Users have found the counter facility useful for sanity checking the behavior of MapReduce operations. 

用户发现计数器对检查 MapReduce 操作的合理性非常有用。

For example, in some MapReduce operations, the user code may want to ensure that the number of output pairs produced exactly equals the number of input pairs processed, or that the fraction of German documents processed is within some tolerable fraction of the total number of documents processed.

例如，在一些 MapReduce 操作中，用户代码可能希望确保产生的输出对的数量正好等于处理的输入对的数量，或者确保处理的德国文件的比例在处理的文件总数的某个可容忍的分数之内。

# 5 Performance 性能

In this section we measure the performance of MapReduce on two computations running on a large cluster of machines. 

在这一节中，我们测量了 MapReduce 在一个大型机器集群上运行的两个计算的性能。

One computation searches through approximately one terabyte of data looking for a particular pattern. 

一次计算可以搜索大约一兆字节的数据，寻找一个特定的模式。

The other computation sorts approximately one terabyte of data.

另一项计算整理了大约一兆字节的数据。

These two programs are representative of a large subset of the real programs written by users of MapReduce – one class of programs shuffles data from one representation to another, and another class extracts a small amount of interesting data from a large data set.

这两个程序代表了MapReduce用户编写的真实程序的一大子集--一类程序将数据从一个表示法洗成另一个表示法，另一类程序从大数据集中提取少量有趣的数据。

## 5.1 Cluster Configuration 集群配置

All of the programs were executed on a cluster that consisted of approximately 1800 machines. 

所有的程序都在一个由大约1800台机器组成的集群上执行。

Each machine had two 2GHz Intel Xeon processors with HyperThreading enabled, 4GB of memory, two 160GB IDE disks, and a gigabit Ethernet link. 

每台机器都有两个启用了超线程的2GHz英特尔至强处理器，4GB内存，两个160GB IDE磁盘，以及一个千兆以太网链接。

The machines were arranged in a two-level tree-shaped switched network with approximately 100-200 Gbps of aggregate bandwidth available at the root. 

这些机器被安排在一个两层的树形交换网络中，根部有大约100-200Gbps的总带宽。

All of the machines were in the same hosting facility and therefore the round-trip time between any pair of machines was less than a millisecond. 

所有的机器都在同一个托管设施中，因此任何一对机器之间的往返时间都小于一毫秒。

Out of the 4GB of memory, approximately 1-1.5GB was reserved by other tasks running on the cluster. 

在4GB的内存中，大约1-1.5GB被集群上运行的其他任务所保留。

The programs were executed on a weekend afternoon, when the CPUs, disks, and network were mostly idle.

这些程序是在一个周末的下午执行的，当时CPU、磁盘和网络大多处于空闲状态。

## 5.2 Grep 筛选

The grep program scans through 1010 100-byte records, searching for a relatively rare three-character pattern (the pattern occurs in 92,337 records). 

grep 程序扫描了 1010 条 100 字节的记录，搜索一个相对罕见的三字符模式（该模式出现在 92,337 条记录中）。

The input is split into approximately 64MB pieces (M = 15000), and the entire output is placed in one file (R = 1). 

输入被分割成大约64MB的碎片（M=15000），整个输出被放在一个文件中（R=1）。

Figure 2 shows the progress of the computation over time. 

图2显示了随时间推移的计算进度。

The Y-axis shows the rate at which the input data is scanned. 

Y轴显示输入数据的扫描速度。

The rate gradually picks up as more machines are assigned to this MapReduce computation, and peaks at over 30 GB/s when 1764 workers have been assigned.

随着越来越多的机器被分配到这个MapReduce计算中，速率逐渐加快，当分配到1764个 worker 时，速率达到了30GB/s以上的高峰。

As the map tasks finish, the rate starts dropping and hits zero about 80 seconds into the computation. 

随着 map 任务的完成，速率开始下降，在计算的 80 秒左右达到零。

The entire computation takes approximately 150 seconds from start to finish. 

整个计算过程从开始到结束大约需要 150 秒。

This includes about a minute of startup overhead. 

这包括大约1分钟的启动开销。

The overhead is due to the propagation of the program to all worker machines, and delays interacting with GFS to open the set of 1000 input files and to get the information needed for the locality optimization.

开销是由于程序传播到所有工人机器上，以及与GFS互动以打开1000个输入文件集和获得位置优化所需信息的延迟。

## 5.3 Sort 排序

The sort program sorts 1010 100-byte records (approximately 1 terabyte of data). 

该排序程序对1010条100字节的记录进行排序（大约1兆字节的数据）。

This program is modeled after the TeraSort benchmark [10].

这个程序是以TeraSort基准[10]为模型的。

The sorting program consists of less than 50 lines of user code. 

该排序程序由不到50行的用户代码组成。

A three-line Map function extracts a 10-byte sorting key from a text line and emits the key and the original text line as the intermediate key/value pair. 

一个三行Map函数从一个文本行中提取一个10字节的排序键，并将该键和原始文本行作为中间的键/值对发射出去。

We used a built-in Identity function as the Reduce operator. 

我们使用了一个内置的Identity函数作为Reduce操作符。

This functions passes the intermediate key/value pair unchanged as the output key/value pair. 

这个函数将中间的键/值对作为输出的键/值对，没有改变。

The final sorted output is written to a set of 2-way replicated GFS files (i.e., 2 terabytes are written as the output of the program).

最终的分类输出被写入一组2路复制的GFS文件（即2兆字节被写入程序的输出）。

As before, the input data is split into 64MB pieces (M = 15000). 

和以前一样，输入数据被分成64MB的碎片（M=15000）。

We partition the sorted output into 4000 files (R = 4000). 

我们将排序后的输出划分为4000个文件（R=4000）。

The partitioning function uses the initial bytes of the key to segregate it into one of R pieces.

分割功能使用钥匙的初始字节将其隔离成R个片断之一。

Our partitioning function for this benchmark has builtin knowledge of the distribution of keys. 

我们对这一基准的分区函数有关于钥匙分布的内置知识。

In a general sorting program, we would add a pre-pass MapReduce operation that would collect a sample of the keys and use the distribution of the sampled keys to compute splitpoints for the final sorting pass.

在一般的排序程序中，我们会添加一个预处理的MapReduce操作，该操作会收集一个键的样本，并使用抽样的键的分布来计算最终排序的分割点。

Figure 3 (a) shows the progress of a normal execution of the sort program. 

图3（a）显示了排序程序的正常执行进度。

The top-left graph shows the rate at which input is read. The rate peaks at about 13 GB/s and dies off fairly quickly since all map tasks finish before 200 seconds have elapsed. 

左上图显示了读取输入的速度。速率在大约13GB/s时达到峰值，并很快消失，因为所有的地图任务在200秒之前就已经完成。

Note that the input rate is less than for grep. 

请注意，输入率比grep要低。

This is because the sort map tasks spend about half their time and I/O bandwidth writing intermediate output to their local disks. 

这是因为排序图任务花了大约一半的时间和I/O带宽将中间输出写到本地磁盘。

The corresponding intermediate output for grep had negligible size.

grep的相应中间输出的大小可以忽略不计。

The middle-left graph shows the rate at which data is sent over the network from the map tasks to the reduce tasks. 

左边中间的图显示了数据通过网络从地图任务发送到还原任务的速率。

This shuffling starts as soon as the first map task completes. The first hump in the graph is for the first batch of approximately 1700 reduce tasks (the entire MapReduce was assigned about 1700 machines, and each machine executes at most one reduce task at a time). 

这种洗牌在第一个 map 任务完成后就开始了。图中的第一个驼峰是第一批约1700个 reduce 任务（整个 MapReduce 被分配了约1700台机器，每台机器每次最多执行一个 reduce 任务）。

Roughly 300 seconds into the computation, some of these first batch of reduce tasks finish and we start shuffling data for the remaining reduce tasks. 

在计算进行到大约300秒的时候，这些第一批还原任务中的一些完成了，我们开始为剩余的还原任务洗牌数据。

All of the shuffling is done about 600 seconds into the computation. 

所有的洗牌工作都是在计算的600秒左右完成的。

The bottom-left graph shows the rate at which sorted data is written to the final output files by the reduce tasks.

左下图显示了减少任务将排序后的数据写入最终输出文件的速度。

There is a delay between the end of the first shuffling period and the start of the writing period because the machines are busy sorting the intermediate data. 

在第一个洗牌期结束和写入期开始之间有一个延迟，因为机器正忙于对中间数据进行分类。

The writes continue at a rate of about 2-4 GB/s for a while. 

写入的速度持续了一段时间，大约为2-4GB/s。

All of the writes finish about 850 seconds into the computation. Including startup overhead, the entire computation takes 891 seconds. 

所有的写操作在计算过程中大约850秒完成。包括启动开销，整个计算需要891秒。

This is similar to the current best reported result of 1057 seconds for the TeraSort benchmark [18].

这与目前报道的TeraSort基准的1057秒的最佳结果相似[18]。

A few things to note: the input rate is higher than the shuffle rate and the output rate because of our locality optimization – most data is read from a local disk and bypasses our relatively bandwidth constrained network.

有几件事需要注意：输入率高于洗牌率和输出率，因为我们进行了定位优化--大多数数据是从本地磁盘读取的，绕过了我们相对带宽有限的网络。

The shuffle rate is higher than the output rate because the output phase writes two copies of the sorted data (we make two replicas of the output for reliability and availability reasons). 

洗牌率高于输出率，因为输出阶段写了两份排序后的数据（出于可靠性和可用性的考虑，我们对输出进行了两次复制）。

We write two replicas because that is the mechanism for reliability and availability provided by our underlying file system. 

我们写两个副本，因为这是我们底层文件系统提供的可靠性和可用性机制。

Network bandwidth requirements for writing data would be reduced if the underlying file system used erasure coding [14] rather than replication.

如果底层文件系统使用擦除编码[14]而不是复制，那么写入数据的网络带宽要求将减少。

## 5.4 Effect of Backup Tasks 备份任务的效果

In Figure 3 (b), we show an execution of the sort program with backup tasks disabled. 

在图3（b）中，我们展示了在禁用备份任务的情况下执行排序程序。

The execution flow is similar to that shown in Figure 3 (a), except that there is a very long tail where hardly any write activity occurs. 

执行流程与图3(a)所示相似，只是有一个非常长的尾巴，几乎没有任何写入活动发生。

After 960 seconds, all except 5 of the reduce tasks are completed. 

960秒后，除了5个减少任务外，其他的都完成了。

However these last few stragglers don’t finish until 300 seconds later. 

然而这最后几个落伍者直到300秒后才完成。

The entire computation takes 1283 seconds, an increase of 44% in elapsed time.

整个计算过程需要1283秒，耗时增加了44%。

## 5.5 Machine Failures 机器故障

In Figure 3 (c), we show an execution of the sort program where we intentionally killed 200 out of 1746 worker processes several minutes into the computation. 

在图3（c）中，我们展示了排序程序的执行情况，其中我们故意在计算的几分钟内杀死了1746个工作进程中的200个。

The underlying cluster scheduler immediately restarted new worker processes on these machines (since only the processes were killed, the machines were still functioning properly).

底层集群调度器立即在这些机器上重新启动了新的工作进程（因为只有进程被杀死，机器仍然正常运行）。

The worker deaths show up as a negative input rate since some previously completed map work disappears (since the corresponding map workers were killed) and needs to be redone. The re-execution of this map work happens relatively quickly. 

worker 的死亡显示为负输入率，因为一些先前完成的 map 工作消失了（因为相应的 map worker 被杀），需要重新做。这种 map 工作的重新执行发生得比较快。

The entire computation finishes in 933 seconds including startup overhead (just an increase of 5% over the normal execution time).

整个计算在933秒内完成，包括启动开销（仅比正常执行时间增加5%）。

# 6 Experience 经验

We wrote the first version of the MapReduce library in February of 2003, and made significant enhancements to it in August of 2003, including the locality optimization, dynamic load balancing of task execution across worker machines, etc. 

我们在2003年2月编写了第一个版本的 MapReduce 库，并在 2003 年 8 月对其进行了重大改进，包括位置优化、跨工作机的任务执行动态负载平衡等。

Since that time, we have been pleasantly surprised at how broadly applicable the MapReduce library has been for the kinds of problems we work on. 

从那时起，我们就对 MapReduce 库在我们工作的各种问题上的广泛适用性感到惊喜。

It has been used across a wide range of domains within Google, including:

它已被用于谷歌内部广泛的领域，包括。

• large-scale machine learning problems,

- 大规模机器学习问题。

• clustering problems for the Google News and Froogle products,

- 谷歌新闻和Froogle产品的聚类问题。

• extraction of data used to produce reports of popular queries (e.g. Google Zeitgeist),

- 提取用于制作流行查询报告的数据（例如，Google Zeitgeist）。

• extraction of properties of web pages for new experiments and products (e.g. extraction of geographical  locations from a large corpus of web pages for localized search), and

- 为新的实验和产品提取网页的属性（例如，从大量的网页语料库中提取地理位置用于本地化搜索），以及

• large-scale graph computations.

- 大规模图计算。

# 6.1 Large-Scale Indexing 大规模的索引编制

One of our most significant uses of MapReduce to date has been a complete rewrite of the production indexing system that produces the data structures used for the Google web search service. 

迄今为止，我们对MapReduce最重要的使用之一是完全重写了生产索引系统，该系统产生用于谷歌网络搜索服务的数据结构。

The indexing system takes as input a large set of documents that have been retrieved by our crawling system, stored as a set of GFS files. 

索引系统将我们的抓取系统检索到的大量文件作为输入，这些文件以一组GFS文件的形式存储。

The raw contents for these documents are more than 20 terabytes of data. The indexing process runs as a sequence of five to ten MapReduce operations. Using MapReduce (instead of the ad-hoc distributed passes in the prior version of the indexing system) has provided several benefits:

这些文件的原始内容是超过20兆字节的数据。索引过程以五到十次MapReduce操作的顺序运行。使用MapReduce（而不是之前版本的索引系统中的临时分布式传递）带来了几个好处。

• The indexing code is simpler, smaller, and easier to understand, because the code that deals with fault tolerance, distribution and parallelization is hidden within the MapReduce library. For example, the size of one phase of the computation dropped from approximately 3800 lines of C++ code to approximately 700 lines when expressed using MapReduce.

- 索引代码更简单、更小、更容易理解，因为处理容错、分布和并行化的代码都隐藏在MapReduce库中。例如，使用MapReduce表达时，一个阶段的计算规模从大约3800行的C++代码下降到大约700行。

• The performance of the MapReduce library is good enough that we can keep conceptually unrelated computations separate, instead of mixing them together to avoid extra passes over the data. This makes it easy to change the indexing process. For example, one change that took a few months to make in our old indexing system took only a few days to implement in the new system.

- MapReduce库的性能足够好，我们可以把概念上不相关的计算分开，而不是把它们混在一起，以避免对数据的额外传递。这使得我们很容易改变索引过程。例如，在我们旧的索引系统中需要花费几个月的时间，而在新的系统中只需要几天就可以实现。

• The indexing process has become much easier to operate, because most of the problems caused by machine failures, slow machines, and networking hiccups are dealt with automatically by the MapReduce library without operator intervention. Furthermore, it is easy to improve the performance of the indexing process by adding new machines to the indexing cluster.

- 索引过程变得更容易操作，因为大部分由机器故障、慢速机器和网络故障引起的问题都由MapReduce库自动处理，不需要操作员干预。此外，通过在索引集群中增加新的机器，也很容易提高索引过程的性能。

# 7 Related Work 相关工作

Many systems have provided restricted programming models and used the restrictions to parallelize the computation automatically. 

许多系统都提供了限制性的编程模型，并利用这些限制来自动并行化计算。

For example, an associative function can be computed over all prefixes of an N element array in log N time on N processors using parallel prefix computations [6, 9, 13]. 

例如，一个关联函数可以在N个处理器上使用并行前缀计算，以对数N的时间计算N个元素阵列的所有前缀[6, 9, 13]。

MapReduce can be considered a simplification and distillation of some of these models based on our experience with large real-world computations. 

MapReduce可以说是基于我们在大型现实世界计算中的经验，对其中一些模型的简化和提炼。

More significantly, we provide a fault-tolerant implementation that scales to thousands of processors.

更重要的是，我们提供了一个可扩展到数千个处理器的容错实现。

In contrast, most of the parallel processing systems have only been implemented on smaller scales and leave the details of handling machine failures to the programmer.

相比之下，大多数并行处理系统只在较小的规模上实现，并将处理机器故障的细节留给了程序员。

Bulk Synchronous Programming [17] and some MPI primitives [11] provide higher-level abstractions that make it easier for programmers to write parallel programs. 

批量同步编程[17]和一些MPI原语[11]提供了更高层次的抽象，使程序员更容易编写并行程序。

A key difference between these systems and MapReduce is that MapReduce exploits a restricted programming model to parallelize the user program automatically and to provide transparent fault-tolerance.

这些系统与MapReduce的一个关键区别是，MapReduce利用限制性编程模型来自动并行化用户程序，并提供透明的容错功能。

Our locality optimization draws its inspiration from techniques such as active disks [12, 15], where computation is pushed into processing elements that are close to local disks, to reduce the amount of data sent across I/O subsystems or the network. 

我们的位置优化从主动磁盘[12, 15]等技术中获得灵感，在这些技术中，计算被推到靠近本地磁盘的处理元件中，以减少跨I/O子系统或网络发送的数据量。

We run on commodity processors to which a small number of disks are directly connected instead of running directly on disk controller processors, but the general approach is similar.

我们在商品处理器上运行，少量的磁盘直接连接到这些处理器上，而不是直接在磁盘控制器处理器上运行，但一般的方法是类似的。

Our backup task mechanism is similar to the eager scheduling mechanism employed in the Charlotte System [3]. 

我们的备份任务机制类似于夏洛特系统[3]中采用的急切调度机制。

One of the shortcomings of simple eager  scheduling is that if a given task causes repeated failures, the entire computation fails to complete. 

简单的急切调度的缺点之一是，如果一个特定的任务导致重复失败，整个计算就无法完成。

We fix some instances of this problem with our mechanism for skipping bad records.

我们通过跳过不良记录的机制来解决这个问题的一些实例。

The MapReduce implementation relies on an in-house cluster management system that is responsible for distributing and running user tasks on a large collection of shared machines. 

MapReduce 的实现依赖于一个内部集群管理系统，该系统负责在大量的共享机器集合上分配和运行用户任务。

Though not the focus of this paper, the cluster management system is similar in spirit to other systems such as Condor [16].

虽然不是本文的重点，但集群管理系统在精神上与其他系统如Condor[16]相似。

The sorting facility that is a part of the MapReduce library is similar in operation to NOW-Sort [1]. 

作为 MapReduce 库的一部分，其排序设施在操作上与NOW-Sort[1]相似。

Source machines (map workers) partition the data to be sorted and send it to one of R reduce workers. 

源机器（ map 工作者）对要排序的数据进行分区，并将其发送给R的一个 reduce 工作者。

Each reduce worker sorts its data locally (in memory if possible). 

每个reduce worker在本地对其数据进行排序（如果可能的话，在内存中）。

Of course NOW-Sort does not have the user-definable Map and Reduce functions that make our library widely applicable. 

当然 NOW-Sort 没有用户可定义的 Map 和 Reduce 函数，而这些函数使我们的库广泛适用。

River [2] provides a programming model where processes communicate with each other by sending data over distributed queues. 

River[2] 提供了一个编程模型，在这个模型中，进程通过在分布式队列上发送数据来相互通信。

Like MapReduce, the River system tries to provide good average case performance even in the presence of non-uniformities introduced by heterogeneous hardware or system perturbations. 

与 MapReduce 一样，River 系统试图提供良好的平均情况下的性能，即使在异构硬件或系统扰动所带来的非均匀性的情况下。

River achieves this by careful scheduling of disk and network transfers to achieve balanced completion times. 

River 通过仔细安排磁盘和网络传输来实现这一目标，以达到平衡的完成时间。

MapReduce has a different approach. 

MapReduce 有一个不同的方法。

By restricting the programming model, the MapReduce framework is able to partition the problem into a large number of finegrained tasks. 

通过限制编程模型，MapReduce 框架能够将问题分割成大量的细粒度任务。

These tasks are dynamically scheduled on available workers so that faster workers process more tasks. 

这些任务被动态地安排在可用的工作者上，以便更快的工作者处理更多的任务。

The restricted programming model also allows us to schedule redundant executions of tasks near the end of the job which greatly reduces completion time in the presence of non-uniformities (such as slow or stuck
workers). 

限制性编程模型还允许我们在工作接近尾声时安排任务的冗余执行，这在存在非均匀性（如缓慢或卡住）的情况下大大减少了完成时间。
工人）。

BAD-FS [5] has a very different programming model from MapReduce, and unlike MapReduce, is targeted to the execution of jobs across a wide-area network. However, there are two fundamental similarities. 

BAD-FS[5]的编程模型与 MapReduce 非常不同，与 MapReduce 不同的是，它的目标是在广域网上执行作业。然而，有两个基本的相似之处。

(1) Both systems use redundant execution to recover from data loss caused by failures. 

(1) 这两个系统都使用冗余执行来恢复由故障引起的数据丢失。

(2) Both use locality-aware scheduling to reduce the amount of data sent across congested network links.

(2) 两者都使用局部感知的调度，以减少在拥挤的网络链接上发送的数据量。

TACC [7] is a system designed to simplify construction of highly-available networked services. 

TACC[7]是一个旨在简化构建高可用网络服务的系统。

Like MapReduce, it relies on re-execution as a mechanism for implementing fault-tolerance.

与 MapReduce 一样，它依靠重新执行作为实现容错的机制。

# 8 Conclusions 结论

The MapReduce programming model has been successfully used at Google for many different purposes. 

在谷歌，MapReduce编程模型已被成功用于许多不同的目的。

We attribute this success to several reasons. 

我们将这一成功归功于几个原因。

First, the model is easy to use, even for programmers without experience with parallel and distributed systems, since it hides the details of parallelization, fault-tolerance, locality optimization, and load balancing. 

首先，该模型很容易使用，即使是没有并行和分布式系统经验的程序员，因为它隐藏了并行化、容错、位置优化和负载平衡的细节。

Second, a large variety of problems are easily expressible as MapReduce computations. 

其次，大量的问题很容易被表达为MapReduce的计算。

For example, MapReduce is used for the generation of data for Google’s production web search service, for sorting, for data mining, for machine learning, and many other systems. 

例如，MapReduce被用于谷歌生产网络搜索服务的数据生成，用于排序，用于数据挖掘，用于机器学习，以及其他许多系统。

Third, we have developed an implementation of MapReduce that scales to large clusters of machines comprising thousands of machines. 

第三，我们开发了一个 MapReduce 的实现，可以扩展到由成千上万台机器组成的大型集群。

The implementation makes efficient use of these machine resources and therefore is suitable for use on many of the large computational problems encountered at Google.

该实施方案有效地利用了这些机器资源，因此适用于在谷歌遇到的许多大型计算问题。

We have learned several things from this work. 

我们从这项工作中学到了几件事。

First, restricting the programming model makes it easy to parallelize and distribute computations and to make such computations fault-tolerant. 

首先，限制编程模型使得并行化和分布式计算变得容易，并使这种计算具有容错性。

Second, network bandwidth is a scarce resource. 

第二，网络带宽是一种稀缺资源。

A number of optimizations in our system are therefore targeted at reducing the amount of data sent across the network: the locality optimization allows us to read data from local disks, and writing a single copy of the intermediate data to local disk saves network bandwidth. 

因此，我们系统中的一些优化是针对减少网络上发送的数据量的：定位优化允许我们从本地磁盘读取数据，而将中间数据的单一副本写入本地磁盘可以节省网络带宽。

Third, redundant execution can be used to reduce the impact of slow machines, and to handle machine failures and data loss. 

第三，可以使用冗余执行来减少慢速机器的影响，并处理机器故障和数据丢失。

**Acknowledgements** 鸣谢

Josh Levenberg has been instrumental in revising and extending the user-level MapReduce API with a number of new features based on his experience with using MapReduce and other people’s suggestions for enhancements. 

Josh Levenberg根据自己使用MapReduce的经验和其他人的改进建议，对用户级MapReduce API进行了修订和扩展，并增加了许多新功能。

MapReduce reads its input from and writes its output to the Google File System [8]. 

MapReduce从谷歌文件系统读取其输入，并将其输出写入谷歌文件系统[8]。

We would like to thank Mohit Aron, Howard Gobioff, Markus Gutschke, David Kramer, Shun-Tak Leung, and Josh Redstone for their work in developing GFS. 

我们要感谢Mohit Aron, Howard Gobioff, Markus Gutschke, David Kramer, Shun-Tak Leung和Josh Redstone在开发GFS方面所做的工作。

We would also like to thank Percy Liang and Olcan Sercinoglu for their work in developing the cluster management system used by MapReduce. 

我们还要感谢Percy Liang和Olcan Sercinoglu在开发MapReduce使用的集群管理系统方面的工作。

Mike Burrows, Wilson Hsieh, Josh Levenberg, Sharon Perl, Rob Pike, and Debby Wallach provided helpful comments on earlier drafts of this paper. 

Mike Burrows、Wilson Hsieh、Josh Levenberg、Sharon Perl、Rob Pike和Debby Wallach对本文的早期草稿提供了有益的意见。

The anonymous OSDI reviewers, and our shepherd, Eric Brewer, provided many useful suggestions of areas where the paper could be improved. 

OSDI的匿名审稿人和我们的监督人Eric Brewer对论文可以改进的地方提供了许多有用的建议。

Finally, we thank all the users of MapReduce within Google’s engineering organization for providing helpful feedback, suggestions, and bug reports.

最后，我们感谢谷歌工程组织内的所有MapReduce用户提供的有益反馈、建议和错误报告。