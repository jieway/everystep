# Part 1

接下来实现一个最简版本的 LSM-Tree ，主旨是能跑就行，所以一切从简，先跑起来再说，优化问题后续再考虑。

## 1. 结构体设计

下面是实现一颗 LSM-Tree 所需的字段：

```go
type LSMTree struct {
	segmentsDirectory string            // 存储段文件的目录路径
	walBasename       string            // 写入日志文件的基本名称
	currentSegment    string            // 当前活动段文件的名称
	segments          []string          // 所有段文件的名称列表
	threshold         int               // 内存表触发刷入磁盘的阈值
	memtable          map[string]string // 内存表，用于存储尚未持久化到磁盘的键值对
	totalBytes        int               // 记录键值对占用的总字节数
	index             map[string]string // 索引结构，用于加速键的查找
	sparsityFactor    int               // 稀疏因子，影响压缩算法等
	bfNumItems        int               // 布隆过滤器期望存储的元素数量
	bfFalsePosProb    float64           // 布隆过滤器期望的误报率
	bloomFilter       *BloomFilter      // 布隆过滤器，用于快速确定某个键可能存在于数据中
	lock              sync.Mutex        // 用于保护 LSM 树的并发访问的互斥锁
}
```

为方便理解，结合具体的例子来阐明每个字段的作用：

当提供每个字段的具体例子时，可以更好地说明这些字段在LSMTree中的作用和重要性。以下是每个字段的作用以及相应的例子：

1. **segmentsDirectory：** 存储段文件的目录路径，用于确定段文件的存放位置。

   示例：`segmentsDirectory = "/data/segments"`

2. **walBasename：** 写入日志文件的基本名称，用于构建写前日志（Write-Ahead Log）的文件名。

   示例：`walBasename = "wal_log"`

3. **currentSegment：** 当前活动段文件的名称，指示正在写入的段文件。

   示例：`currentSegment = "wal_log_active"`

4. **segments：** 所有段文件的名称列表，记录了LSMTree中所有段文件的名字，用于查找和管理已存储的数据。

   示例：`segments = ["wal_log_active", "segment_1", "segment_2"]`

5. **threshold：** 内存表触发刷入磁盘的阈值，用于控制何时将数据刷写到磁盘。

   示例：`threshold = 10000`  # 当内存表大小超过 10000 字节时触发刷入磁盘

6. **memtable：** 内存表，用于暂存尚未持久化到磁盘的键值对，提高写入性能。

   示例：
   ```
   memtable = {
       "key1": "value1",
       "key2": "value2"
   }
   ```

7. **totalBytes：** 记录键值对占用的总字节数，监控内存表的大小，控制刷入磁盘的阈值。

   示例：`totalBytes = 8000`  # 内存表中的数据总共占用 8000 字节

8. **index：** 索引结构，用于加速键的查找，帮助快速定位数据在段文件中的位置。

   示例：
   ```
   index = {
       "key1": "segment_1",
       "key2": "segment_2"
   }
   ```

9. **sparsityFactor：** 稀疏因子，影响合并和压缩操作的频率和策略。

   示例：`sparsityFactor = 4`  # 控制合并和压缩操作的频率和策略

10. **bfNumItems：** 布隆过滤器期望存储的元素数量，影响布隆过滤器的大小。

    示例：`bfNumItems = 1000`  # 布隆过滤器期望存储 1000 个元素

11. **bfFalsePosProb：** 布隆过滤器期望的误报率，影响布隆过滤器的大小和性能。

    示例：`bfFalsePosProb = 0.01`  # 布隆过滤器期望的误报率为 1%

12. **bloomFilter：** 布隆过滤器，用于快速确定某个键可能存在于数据中，避免不必要的磁盘读取。

    示例：布隆过滤器用于快速判断某个键可能存在于数据中，例如：`bloomFilter.contains("key1")`

13. **lock：** 用于保护LSM树的并发访问的互斥锁，确保多线程环境下的数据一致性和安全性。

    示例：在访问和修改LSM树数据时，使用互斥锁来确保线程安全。

通过为每个字段提供具体的示例，读者可以更好地理解它们在LSMTree中的实际应用和作用，从而更清楚地了解LSMTree的内部工作原理。

现在 bloom filter 还未实现，按下不表，下一章会讲具体该如何实现，所以报错先忍着。😈

memtable 直接用 map 来搞，后续会替换，不要激动不要激动。。。

## NewLSMTree

现在 LSMTree 的结构体已经写好了，接下里该如何实例化出来一个对象了，也就是 NewLSMTree 。下面是一个已经写好的函数签名，可以尝试自己实现一下。

```go
func NewLSMTree(segmentBasename, segmentsDirectory, walBasename string) (*LSMTree, error)
```


这个函数 `NewLSMTree` 的设计有着很好的原因，它的签名以及内部的操作都考虑了初始化一个LSMTree实例所需的各个方面。让我解释一下为什么这个函数签名被设计成这样：

1. **segmentBasename：** 传递 `segmentBasename` 是为了确定当前活动的段文件名称，这在创建 `LSMTree` 时需要提供。

2. **segmentsDirectory 和 walBasename：** 这两个参数是用于指定存储段文件的目录路径和写前日志文件的基本名称。这些参数在初始化时需要明确地指定。

3. **返回值和错误处理：** 函数返回了一个指向 `LSMTree` 实例的指针，同时可以处理可能出现的错误。这种设计可以方便地初始化LSMTree，并在需要时提供错误信息。

4. **初始化操作：** 在函数体内，首先创建了一个 `LSMTree` 实例，并为其各个字段赋予了默认值或者提供的值。然后，它检查并创建了段文件的存储目录。接着，它加载了可能存在的元数据和预先存在的内存表数据。

5. **元数据和内存表恢复：** `loadMetadata` 和 `restoreMemtable` 操作用于从之前的状态中恢复元数据和内存表，以便在重启后保持数据的持久性。

总之，这个函数的设计目标是提供一个方便初始化LSMTree的方式，同时考虑了数据的持久性、错误处理和必要的初始化操作。通过这个函数，你可以快速地创建一个LSMTree实例，然后继续操作数据。


**实现 `NewLSMTree` 函数：**

1. **函数介绍：** 首先，解释一下这个函数的作用，即它是用来初始化一个LSMTree实例的函数。它接收一些参数，并返回一个已经初始化好的LSMTree实例。

2. **参数解释：** 逐个解释函数参数的含义和作用。对于 `segmentBasename`，它是用来确定当前活动的段文件的基本名称。`segmentsDirectory` 是用来指定存储段文件的目录路径，而 `walBasename` 则是用于写前日志文件的基本名称。

3. **创建实例：** 在函数体内，解释如何通过 `&LSMTree{}` 创建一个 `LSMTree` 实例。这里使用了结构体字面值来初始化各个字段的值。

4. **设置字段值：** 对于结构体的每个字段，解释如何为它们设置初始值。例如，解释如何将 `segmentsDirectory`、`walBasename` 和 `currentSegment` 设置为提供的值。

5. **默认值和初始化：** 对于一些字段，如 `threshold`、`sparsityFactor`、`bfNumItems` 和 `bfFalsePosProb`，解释为什么要为它们设置这些默认值，以及这些值如何影响LSMTree的性能。

6. **创建目录：** 解释如何使用提供的 `os.Stat` 和 `os.Mkdir` 函数来检查和创建存储段文件的目录。这有助于确保存储目录的存在。

7. **恢复数据：** 说明如何使用 `loadMetadata` 和 `restoreMemtable` 函数来恢复可能存在的元数据和内存表数据，以确保数据的持久性。

8. **错误处理：** 讨论可能发生的错误，如何处理这些错误，并返回相应的错误信息。

通过按照这些步骤详细解释 `NewLSMTree` 函数的实现，读者可以逐步理解每个步骤的目的和实际操作。这有助于让他们从零开始逐步实现这个函数，以及了解其在LSMTree初始化过程中的重要作用。


## loadMetadata 

`loadMetadata` 函数用于加载LSMTree的元数据，以便在重新启动或重新加载系统时，能够恢复先前保存的状态和配置。元数据通常包括关于LSMTree的信息，例如已存储的段文件、内存表的状态、索引结构等。

具体来说，`loadMetadata` 函数可能会执行以下操作：

1. **读取元数据文件：** 在某个预定的位置，通常是存储段文件的目录中，保存有关LSMTree状态的元数据文件。`loadMetadata` 函数会读取这个文件。

2. **解析元数据：** 元数据文件中存储了关于已存储的段文件、内存表状态、索引结构等的信息。`loadMetadata` 函数会解析这些信息，以便将LSMTree恢复到先前的状态。

3. **更新LSMTree状态：** 根据元数据文件中的信息，`loadMetadata` 函数会更新LSMTree的状态，包括已存储的段文件列表、内存表中的数据、索引结构等。

4. **确保数据的一致性：** 加载元数据可以确保重新启动后，LSMTree能够恢复到之前的状态。这对于数据的持久性和一致性至关重要。

5. **处理错误：** 如果无法找到元数据文件或解析出现错误，`loadMetadata` 函数可能会处理这些错误情况，以便恢复恰当的状态或提供错误信息。

总之，`loadMetadata` 函数的作用是在重新启动或重新加载系统时，通过读取和解析元数据文件，将LSMTree恢复到先前的状态，从而保持数据的一致性和持久性。

## restoreMemtable

`restoreMemtable` 函数用于从持久化的存储中恢复上次LSMTree关闭或崩溃时内存表中的数据。内存表是存储在内存中的临时数据结构，其中存储了尚未持久化到磁盘的键值对。在重新启动系统时，`restoreMemtable` 函数可以帮助将这些数据重新加载到内存表中，以保持数据的完整性。

具体来说，`restoreMemtable` 函数可能会执行以下操作：

1. **读取存储的数据：** 在之前的操作中，将内存表中的数据存储到某种持久化存储中，如磁盘文件。`restoreMemtable` 函数会读取这些存储的数据。

2. **解析数据：** 存储的数据可能需要解析，以便将其转换为适合内存表的数据结构，通常是键值对的形式。

3. **恢复内存表：** 使用解析后的数据，`restoreMemtable` 函数会将数据重新加载到内存表中，以便在内存中保留先前未持久化的键值对。

4. **确保数据的一致性：** 通过恢复内存表中的数据，`restoreMemtable` 函数确保系统重新启动后，内存表中的数据不会丢失，从而保持数据的一致性。

5. **错误处理：** 如果在读取、解析或恢复数据时出现错误，`restoreMemtable` 函数可能会处理这些错误情况，以便在恢复数据时提供错误信息。

总之，`restoreMemtable` 函数的作用是在重新启动或重新加载系统时，从持久化的存储中恢复内存表中的数据，以保持数据的完整性和一致性。这对于确保系统的数据不会在关闭或崩溃时丢失是非常重要的。

