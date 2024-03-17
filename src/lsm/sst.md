

SST（Sorted String Table）是 LevelDB 中的一个重要组成部分，它是 LevelDB 存储数据的主要方式。SST 文件是由多个块（Block）组成的，每个块都存储了一部分键值对。这些键值对是有序的，这使得在 SST 文件中查找一个键变得非常高效。

### SST 和 MemTable 之间的关系

MemTable 是 LevelDB 中的另一个重要组成部分，它是 LevelDB 的写缓冲区。当我们向 LevelDB 写入数据时，数据首先被写入到 MemTable 中。当 MemTable 的大小超过一定的阈值（由配置选项决定）时，LevelDB 会将 MemTable 转换（Flush）成一个 SST 文件，并将这个 SST 文件写入到磁盘中。这个过程称为 Compaction。

在 Compaction 过程中，LevelDB 会将 MemTable 中的数据按照键的顺序写入到 SST 文件中，每个块存储一部分键值对。这样，当我们需要查找一个键时，我们只需要在 SST 文件中的一部分（即一个块）中查找，这大大提高了查找的效率。

总的来说，SST 和 MemTable 在 LevelDB 中起着非常重要的作用。它们一起工作，使得 LevelDB 能够高效地存储和查找数据。

### 如何构建 SST ？

在 LevelDB 中，SST（Sorted String Table）的构建主要通过 `BlockBuilder` 类来完成。以下是其主要步骤：

1. **初始化 BlockBuilder**：在 `BlockBuilder` 的构造函数中，会初始化一些成员变量，包括 `options_`（LevelDB 的配置选项）、`restarts_`（重启点数组）、`counter_`（计数器，用于记录自上一个重启点以来添加的键值对的数量）、`finished_`（标记是否已经完成了一个块的构建）和 `last_key_`（上一个添加的键）。

2. **添加键值对**：通过 `Add` 方法添加键值对。在添加键值对时，会首先计算当前键与上一个键的共享前缀长度，然后将共享前缀长度、非共享部分长度和值的长度以变长整数的形式写入到缓冲区中，接着将非共享部分的键和值写入到缓冲区中。

3. **处理重启点**：如果添加的键值对的数量达到了重启点间隔（由 `options_->block_restart_interval` 指定），那么就会添加一个重启点。重启点是一个偏移量，指向块中的一个键。重启点数组用于帮助在块中进行二分查找。

4. **完成块的构建**：通过 `Finish` 方法完成块的构建。在完成块的构建时，会将重启点数组和重启点的数量写入到缓冲区的末尾，然后将 `finished_` 设置为 `true`，表示已经完成了一个块的构建。

5. **重置 BlockBuilder**：通过 `Reset` 方法重置 `BlockBuilder`，以便开始构建下一个块。

以下是 `BlockBuilder` 的主要代码：

```cpp
BlockBuilder::BlockBuilder(const Options* options)
    : options_(options), restarts_(), counter_(0), finished_(false) {
  assert(options->block_restart_interval >= 1);
  restarts_.push_back(0);  // First restart point is at offset 0
}
```

### SST的编码格式

在LevelDB中，SST（Sorted String Table）的编码格式主要包括三个部分：数据块区域（Block Section）、元数据区域（Meta Section）和额外区域（Extra）。

1. 数据块区域（Block Section）：这个区域包含了所有的数据块。每个数据块都包含了一些键值对。这些键值对是按照键的顺序存储的，这使得SST可以高效地支持范围查询。

2. 元数据区域（Meta Section）：这个区域包含了元数据，元数据描述了数据块的信息，例如每个数据块的第一个和最后一个键，以及每个数据块的偏移量。

3. 额外区域（Extra）：这个区域包含了元块的偏移量，这是一个32位的无符号整数。

### 块缓存

在LevelDB中，SST（Sorted String Table）文件的数据块通常是懒加载的，也就是说，只有当用户请求时，它们才会被加载到内存中。这种机制被称为块缓存（Block Cache）。

块缓存的主要目的是减少对磁盘的读取次数，从而提高查询效率。当我们需要读取一个数据块时，首先会在块缓存中查找。如果找到了，就直接从缓存中读取，避免了磁盘IO操作。如果在缓存中没有找到，那么就需要从磁盘中读取数据块，并将读取的数据块添加到缓存中，以便下次使用。

块缓存通常使用LRU（Least Recently Used）策略来管理内存。当缓存满了，需要添加新的数据块时，会选择最近最少使用的数据块进行替换。

在LevelDB的实现中，块缓存是通过`leveldb::Cache`类来实现的。这个类提供了`Insert`、`Lookup`和`Erase`等方法，用于管理缓存中的数据块。

需要注意的是，块缓存只缓存数据块，不缓存索引块和过滤器块。这是因为索引块和过滤器块通常比较小，且一旦加载后会一直使用，所以没有必要缓存。

总的来说，块缓存是一种用空间换时间的策略，通过缓存常用的数据块，可以大大提高LevelDB的查询效率。

### 在 SST 中查找一个键的时间复杂度是多少？

在SST（Sorted String Table）中查找一个键的时间复杂度主要取决于两个部分：索引查找和数据块查找。

1. 索引查找：索引块中存储了数据块的元数据，包括每个数据块的第一个和最后一个键，以及每个数据块的偏移量。索引块通常存储在内存中，因此查找索引的时间复杂度为O(log n)，其中n是索引块的数量。

2. 数据块查找：在找到包含给定键的数据块后，需要在数据块中查找给定的键。数据块中的键是按排序顺序存储的，因此查找键的时间复杂度为O(log m)，其中m是数据块中的键的数量。

因此，总的来说，在SST中查找一个键的时间复杂度为O(log n + log m)。

### 在 SST 文件中进行原地更新是否可能（或必要）？

在SST（Sorted String Table）文件中进行原地更新通常是不可能的。这是因为SST文件是不可变的，一旦写入磁盘，就不能更改。这种设计可以简化系统的复杂性，并提高其可靠性，因为不需要处理在写入过程中可能发生的错误。

当需要更新SST文件中的键值对时，通常的做法是写入一个新的键值对，然后在后续的压缩操作中删除旧的键值对。这种做法被称为“写入放置”（Write-once or Write-Ahead）。

因此，原地更新SST文件中的数据既不可能，也不必要。如果需要更新存储在SST文件中的数据，应该使用LevelDB或其他键值存储系统提供的更新机制。

### 总结

SST（Sorted String Table）是 LevelDB 中的一个重要组成部分，它是 LevelDB 存储数据的主要方式。SST 文件是由多个块（Block）组成的，每个块都存储了一部分键值对。这些键值对是有序的，这使得在 SST 文件中查找一个键变得非常高效。SST 文件是由 MemTable 转换（Flush）而来的，当 MemTable 的大小超过一定的阈值时，LevelDB 会将 MemTable 转换成一个 SST 文件，并将这个 SST 文件写入到磁盘中。这个过程称为 Compaction。在 LevelDB 中，SST 的构建主要通过 `BlockBuilder` 类来完成。在添加键值对时，会首先计算当前键与上一个键的共享前缀长度，然后将共享前缀长度、非共享部分长度和值的长度以变长整数的形式写入到缓冲区中，接着将非共享部分的键和值写入到缓冲区中。在 LevelDB 中，SST 文件的数据块通常是懒加载的，也就是说，只有当用户请求时，它们才会被加载到内存中。这种机制被称为块缓存（Block Cache）。