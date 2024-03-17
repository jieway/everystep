
在 LevelDB 中，合并（Compaction）是一种重要的操作，用于优化存储空间和提高查询性能。它的主要目的是减少读放大（Read Amplification）并提高查询效率。

### 什么是合并？

合并操作主要包括两种：Minor Compaction 和 Major Compaction。当内存中的 MemTable 达到一定大小时，它会被转换为 SST 文件并刷新（Flush）到磁盘。这个过程称为 Minor Compaction。

在 LevelDB 中，Major Compaction 会涉及到两个层级的 SST 文件的合并。当一个层级的 SST 文件数量或大小达到一定阈值时，LevelDB 会选择一些 SST 文件，并将这些 SST 文件与下一层级的一些 SST 文件合并，生成新的 SST 文件。这些新的 SST 文件会被存储在下一层级中。

例如，当 Level 0 的 SST 文件数量达到一定数量（默认为 4）时，LevelDB 会触发一次 Major Compaction，将 Level 0 的 SST 文件和 Level 1 的 SST 文件合并，并生成新的 SST 文件。这些新的 SST 文件被存储在 Level 1 中。

同样，当 Level 1 的 SST 文件大小达到 10MB（默认值）时，LevelDB 会触发一次 Major Compaction，将 Level 1 的 SST 文件和 Level 2 的 SST 文件合并，并生成新的 SST 文件。这些新的 SST 文件被存储在 Level 2 中。

对于 Level 3 及以上，也是同样的处理方式。每次 Major Compaction 都会涉及到两个层级的 SST 文件的合并，生成的新的 SST 文件会被存储在下一层级中。

在合并过程中，LevelDB 会选择一些 SST 文件，将这些文件中的数据项进行排序并合并，然后分割成多个新的 SST 文件。这个过程中，原来的数据会被重新写入磁盘，从而导致写放大（Write Amplification）。但是，合并操作可以减少 SST 文件的数量，从而减少读放大和空间放大。

### Minor Compaction 实现细节

Minor Compaction：当内存中的 MemTable 达到一定大小时，它会被转换为 SST 文件并刷新到磁盘。这个过程称为 Minor Compaction。Minor Compaction 主要发生在 Level 0，主要涉及到最新的 SST 文件，因此产生的额外磁盘 I/O 较少。

在 LevelDB 中，Minor Compaction 主要发生在 MemTable 达到一定大小时。这个过程主要涉及到最新的 SST 文件，因此产生的额外磁盘 I/O 较少。

具体来说，当 MemTable 达到一定大小时，LevelDB 会创建一个新的 SST 文件，并将 MemTable 中的数据写入到这个 SST 文件中。在这个过程中，LevelDB 会使用 `BlockBuilder` 类来构建 SST 文件中的 block。

这个过程主要涉及到 `Add` 和 `Finish` 两个方法。

1. `Add` 方法：这个方法用于将一个键值对添加到 block 中。它首先检查是否需要添加一个 "restart point"。Restart points 是用于在 block 中进行二分查找的关键点，它们的存在可以提高查找速度。如果当前的键值对是第一个，或者与上一个键值对的共享前缀长度小于某个阈值，那么就会在 `restarts_` 数组中添加当前 block 的偏移量，作为一个新的 restart point。然后，`Add` 方法会将键值对的共享前缀长度、非共享前缀长度和值长度，以及非共享的键的部分和值，依次写入到 `buffer_` 中。

2. `Finish` 方法：这个方法用于完成 block 的构建。它首先将所有的 restart points 写入到 `buffer_` 的末尾，然后将 restart points 的数量写入到 `buffer_` 的末尾。最后，它返回一个 `Slice`，这个 `Slice` 引用了 `buffer_` 中的数据，代表了构建完成的 block。

在将 MemTable 中的数据写入到 SST 文件中时，LevelDB 会创建一个 `BlockBuilder` 对象，然后遍历 MemTable 中的所有键值对，使用 `Add` 方法将它们添加到 `BlockBuilder` 中。当所有的键值对都添加完毕后，调用 `Finish` 方法完成 block 的构建，然后将构建完成的 block 写入到 SST 文件中。

每个 block 中的数据都是按照 key 的顺序存储的，而且每个 key 都会进行前缀合并，也就是说，每个 key 只保存与前一个 key 的差异部分。但是，为了能够快速定位到任意一个 key，LevelDB 会在每个 block 中设置一些 restart points，每个 restart point 的位置都会保存一个完整的 key。

在 `BlockBuilder::Finish()` 方法中，LevelDB 会将所有的 restart points 的信息写入到 buffer 中，然后将 buffer 写入到 SST 文件中。这个过程就是 Minor Compaction 的一部分。

总的来说，Minor Compaction 是 LevelDB 中的一个重要操作，它可以有效地将内存中的数据刷新到磁盘，同时通过使用前缀合并和设置 restart points 来优化读取性能。

### Major Compaction 实现细节

Major Compaction：Major Compaction 是指将多个 SST 文件合并为一个新的 SST 文件，同时删除重复的键和过期的数据。这个过程会产生大量的额外磁盘 I/O，从而导致写放大。Major Compaction 涉及到所有的 SST 文件，它会读取所有的数据并重新写入磁盘。

在 LevelDB 的源代码中，合并操作是在 `db/db_impl.cc` 文件的 `DBImpl::CompactRange` 方法中实现的。这个方法会创建一个 `Compaction` 对象，然后调用 `DBImpl::DoCompactionWork` 方法来执行实际的合并操作。

在 `DBImpl::DoCompactionWork` 方法中，它会创建一个 `CompactionState` 对象来保存合并操作的状态，然后通过循环调用 `Compaction::Next` 方法来逐步进行合并操作。在每次循环中，它会调用 `Compaction::Next` 方法来获取下一个要合并的键值对，然后调用 `CompactionState::Add` 方法将这个键值对添加到新的 SST 文件中。

在 `CompactionState::Add` 方法中，它会检查当前的键是否与上一个键相同，如果相同，则表示这是一个重复的键，它会被忽略。如果当前的键是一个删除标记，则表示这是一个过期的数据，它也会被忽略。只有当当前的键既不是重复的键，也不是删除标记时，它才会被添加到新的 SST 文件中。

在合并操作完成后，`DBImpl::DoCompactionWork` 方法会调用 `CompactionState::Finish` 方法来关闭新的 SST 文件，并将其添加到 SST 文件的列表中。然后，它会调用 `VersionSet::LogAndApply` 方法来更新元数据，并将新的 SST 文件添加到 LSM 树中。最后，它会删除旧的 SST 文件，并释放相关的资源。

以上就是 LevelDB 中合并操作的基本流程。

### Leveldb 如何处理与合并并行的 L0 刷新？

LevelDB 的 L0 层刷新和合并操作主要在 `db_impl.cc` 文件中的 `DBImpl::CompactMemTable` 和 `DBImpl::BackgroundCompaction` 函数中进行。

首先，当内存表（MemTable）满了，或者用户手动触发了刷新操作，LevelDB 会将 MemTable 的内容写入到磁盘，形成一个新的 SST 文件，这个过程就是 L0 刷新。这个新的 SST 文件会被添加到 VersionSet 中，成为 L0 层的一部分。

然后，如果 L0 层的文件数量超过了一定的阈值（默认是 4），LevelDB 就会触发 L0 到 L1 的合并操作。这个过程是在 `DBImpl::BackgroundCompaction` 函数中进行的。在这个函数中，LevelDB 会选择一个合适的 L0 文件和 L1 文件，然后将这两个文件进行合并，合并的结果会生成新的 SST 文件，这些新的 SST 文件会被添加到 L1 层。

在这个过程中，LevelDB 会尽量避免获取全局的状态锁。具体来说，LevelDB 在进行 L0 刷新和合并操作时，会先获取状态锁，然后更新 VersionSet，添加新的 SST 文件，最后释放状态锁。这样，即使在进行 L0 刷新和合并操作的过程中有新的 L0 文件产生，也不会影响到正在进行的操作，因为新的 L0 文件会被添加到下一次的合并操作中。

这就是 LevelDB 如何处理和合并并行的 L0 刷新的大致过程。具体的实现细节可能会因为 LevelDB 的版本和配置的不同而有所不同。

### 合并后立即删除原始 SST 文件会有问题吗？

在 LevelDB 中，合并完成后立即删除原始 SST 文件通常不会在系统中引起问题。这是因为 LevelDB 使用了一种称为“延迟删除”的策略。

在这种策略中，当 LevelDB 决定删除一个 SST 文件时，它并不会立即删除这个文件。相反，它会将这个文件的文件名添加到一个待删除文件列表中。然后，在后台清理线程中，LevelDB 会定期检查这个待删除文件列表，如果列表中的文件没有被数据库的任何部分引用，那么这个文件就会被实际删除。

这种策略的好处是，即使在 LevelDB 合并完成后立即删除原始 SST 文件，也不会影响到正在使用这个文件的读操作。因为只有当文件没有被任何部分引用时，文件才会被实际删除。

这种策略在 macOS 和 Linux 上工作得很好，因为这两个操作系统都支持“删除打开文件”。也就是说，即使一个文件被删除了，只要还有一个文件句柄在引用这个文件，那么这个文件的内容就仍然可以被访问。只有当最后一个文件句柄被关闭时，文件才会被实际删除。


具体到代码层面，LevelDB 的这种延迟删除策略主要在 `db_impl.cc` 文件的 `DBImpl::DeleteObsoleteFiles` 函数中实现。这个函数会遍历待删除文件列表，对于每个文件，它会检查这个文件是否被数据库的任何部分引用，如果没有，那么这个文件就会被实际删除。

但是在 windows 上不能直接删除打开的文件，直接删除会返回一个错误。所以当删除时会线检查该文件是否正在被使用，如果不被使用时才会删除。这种策略可以确保删除操作不会影响到正在进行的读操作。

这种策略的实现主要在 `env_windows.cc` 文件的 `Win32SequentialFile` 和 `Win32RandomAccessFile` 类中。这两个类都有一个 `Unref` 方法，这个方法会在文件不再被使用时被调用。在 `Unref` 方法中，LevelDB 会检查待删除文件列表，如果列表中的文件没有被数据库的任何部分引用，那么这个文件就会被实际删除。

这就是 LevelDB 如何处理合并完成后的原始 SST 文件删除的问题。具体的实现细节可能会因为 LevelDB 的版本和配置的不同而有所不同。

### 读放大是什么？

读放大是指为了执行一个 get 操作，需要从磁盘读取的数据块的数量。如果有大量的 SST 文件，那么每个 get 操作可能需要从这些 SST 文件中读取多个数据块，这就会导致读放大。

接下来结合一个具体的例子来讲解读放大：

在 LevelDB 中，读放大（Read Amplification）是指为了读取一个键值对，需要进行的 I/O 操作数量。这主要是由于 LevelDB 的数据存储结构——LSM（Log-Structured Merge-tree）树造成的。

LSM 树由多个层级（Level）组成，每个层级包含多个 SST 文件（Sorted String Table，排序字符串表）。每个 SST 文件包含的 key-range 可能会和其他层级的 SST 文件重叠，但同一层级的 SST 文件之间的 key-range 不会重叠。

假设我们有一个 LevelDB 数据库，其中包含以下 SST 文件：

- Level 0：SST1，SST2
- Level 1：SST3，SST4
- Level 2：SST5，SST6，SST7

现在，我们要执行一个 get 操作，查找一个键值对。首先，我们需要在 Level 0 的 SST 文件中查找。如果在 SST1 中找到了，那么我们就可以直接返回结果。如果没有找到，我们需要继续在 SST2 中查找。如果在 SST2 中也没有找到，我们需要继续在 Level 1 的 SST 文件中查找，以此类推。

因此，为了查找一个键值对，我们可能需要从多个 SST 文件中读取数据。这就是读放大。在这个例子中，如果我们需要从 SST1，SST2，SST3 和 SST5 中读取数据，那么读放大就是 4。

为了减少读放大，LevelDB 会定期进行合并（Compaction）操作。合并操作会选择一些 SST 文件，将这些文件中的数据项进行排序并合并，然后分割成多个新的 SST 文件。这个过程中，原来的数据会被重新写入磁盘，从而导致写放大。但是，合并操作可以减少 SST 文件的数量，从而减少读放大。

### 为什么合并可以减少读放大？

当进行合并后，多个 SST 文件会被合并成一个更大的 SST 文件，这个文件的键范围是非重叠的。这样，当我们需要查找一个键时，我们只需要在一个 SST 文件中查找，这就大大减少了读放大。也就是说，为了获取一个键的值，我们只需要读取一个 SST 文件，因为每个键只会存在于一个 SST 文件中。

此外，合并过程中还会进行去重操作，只保留最新的键值对，这也有助于减少读放大。因为在没有进行合并的情况下，一个键的旧值可能会存在于多个 SST 文件中，这就需要读取多个 SST 文件才能找到这个键的最新值。但是在进行合并后，一个键的旧值会被删除，只保留最新的值，这样就只需要读取一个 SST 文件就能找到这个键的最新值。

因此，通过合并，我们可以将多个 SST 文件合并成一个更大的 SST 文件，减少了读放大，提高了查询效率。

### 什么是写放大？

在 LevelDB 中，合并（Compaction）是一种优化操作，它的目的是减少读放大（Read Amplification）和空间放大（Space Amplification）。然而，这个操作会导致写放大（Write Amplification），即实际写入磁盘的数据量会大于用户写入的数据量。

在 LevelDB 中，写放大（Write Amplification）是指将数据写入磁盘时，实际写入的数据量与用户写入的数据量之比。写放大是由于 LevelDB 的合并（Compaction）操作引起的。

在 LevelDB 中，新写入的数据首先被存储在内存中的 MemTable 中。当 MemTable 达到一定大小时，它会被转换为 SST 文件（Sorted String Table，排序字符串表）并刷新（Flush）到磁盘。这个过程中，每写入 1MB 的数据，就会产生 1MB 的磁盘 I/O，所以没有合并的写放大比例是 1x。

然而，LevelDB 使用了一种名为 LSM-tree（Log-Structured Merge-tree）的数据结构，它通过在后台进行合并操作来提高写入性能。合并操作是指将多个 SST 文件合并为一个新的 SST 文件，同时删除重复的键和过期的数据。这个过程会产生大量的额外磁盘 I/O，从而导致写放大。

具体来说，LevelDB 的合并操作分为两级：Minor Compaction 和 Major Compaction。Minor Compaction 主要处理 MemTable 刷新到磁盘的过程，它只涉及到最新的 SST 文件，因此产生的额外磁盘 I/O 较少，对写放大的影响较小。Major Compaction 则涉及到所有的 SST 文件，它会读取所有的数据并重新写入磁盘，因此产生的额外磁盘 I/O 较多，对写放大的影响较大。

### 合并对写放大的影响？

如果我们每次得到一个 SST 就做一次全合并，那么写入到磁盘的数据量将是刷新的 SST 数量的平方。这是因为每次合并都会生成一个新的 SST 文件，而每个新的 SST 文件都包含了所有之前的数据。这种情况下，每次合并都会对所有的 SST 文件进行读取和写入，这会导致大量的磁盘 I/O，从而导致写放大。

例如，如果我们将 100 个 SST 刷新到磁盘，我们将做 2 个文件，3 个文件，...，100 个文件的合并。在第一次合并时，我们将第一个和第二个 SST 文件合并成一个新的 SST 文件，这个新的 SST 文件包含了第一个和第二个 SST 文件的所有数据。在第二次合并时，我们将第一个、第二个和第三个 SST 文件合并成一个新的 SST 文件，这个新的 SST 文件包含了第一个、第二个和第三个 SST 文件的所有数据。以此类推，到第 100 次合并时，我们将所有的 SST 文件合并成一个新的 SST 文件，这个新的 SST 文件包含了所有 SST 文件的所有数据。

因此，实际写入到磁盘的总数据量大约是 5000 个 SST。在这种情况下，写入 100 个 SST 后的写放大将是 50x，即实际写入的数据量是用户写入的数据量的 50 倍。

因此，为了避免这种情况，LevelDB 在进行合并操作时，会根据 SST 文件的大小和级别进行选择，只对部分 SST 文件进行合并，从而降低写放大。

### 空间放大

计算空间放大最直观的方法是将 LSM 引擎实际使用的空间除以用户空间使用量（即，数据库大小，数据库中的行数等）。引擎需要存储删除墓碑，有时如果合并不够频繁，还需要存储同一键的多个版本，因此导致空间放大。

在引擎端，通常很难知道用户存储的数据的确切数量，除非我们扫描整个数据库并查看引擎中有多少死版本。因此，估计空间放大的一种方法是将完整存储文件大小除以最后一层大小。这种估计方法背后的假设是，用户填充初始数据后，工作负载的插入和删除率应该相同。我们假设用户端的数据大小不变，因此最后一层包含用户数据在某一点的快照，上层包含新的更改。当合并将所有内容合并到最后一层时，我们可以使用这种估计方法得到 1x 的空间放大因子。

请注意，合并也需要空间 -- 在合并完成之前，你不能删除正在合并的文件。如果你对数据库进行全面的合并，你将需要与当前引擎文件大小相等的空闲存储空间。

在这部分，我们将有一个合并模拟器来帮助你可视化合并过程和你的合并算法的决策。我们提供最小的测试用例来检查你的合并算法的属性，你应该密切关注统计数据和合并模拟器的输出，以了解你的合并算法的工作情况。

### Leveldb 是如何估计评估读/写/空间放大的？

在 LevelDB 中，读放大、写放大和空间放大的估计主要依赖于 LevelDB 的内部统计信息。这些统计信息可以通过 LevelDB 的 `DB::GetProperty` 方法获取。以下是一些具体的方法：

1. 读放大：LevelDB 并没有直接提供读放大的统计信息，但我们可以通过其他的统计信息来间接估计。例如，我们可以通过 `leveldb.sstables` 属性获取到每一层的 SST 文件数量和大小，然后根据 LSM-Tree 的特性，估计出平均每次读取操作需要访问的数据块数量。

2. 写放大：LevelDB 提供了 `leveldb.compaction.bytes-written` 属性，这个属性表示了由于压缩操作而写入到磁盘的数据量。我们可以将这个值除以实际写入的数据量（可以通过 `leveldb.bytes-written` 属性获取），得到写放大。

3. 空间放大：LevelDB 提供了 `leveldb.live-sst-files-size` 属性，这个属性表示了当前所有 SST 文件的总大小。我们可以将这个值除以实际写入的数据量（可以通过 `leveldb.bytes-written` 属性获取），得到空间放大。

具体到代码层面，我们可以通过以下的代码来获取这些统计信息：

以上就是在 LevelDB 中估计读放大、写放大和空间放大的方法。具体的实现可能会因为 LevelDB 的版本和配置的不同而有所不同。

### 总结

这篇文章详细介绍了LevelDB中的合并操作，包括Minor Compaction和Major Compaction，以及它们如何影响读放大、写放大和空间放大。合并操作是LevelDB优化存储空间和提高查询性能的关键，它通过减少SST文件的数量来减少读放大和空间放大，但同时会导致写放大，即实际写入磁盘的数据量大于用户写入的数据量。文章还讨论了LevelDB如何处理与合并并行的L0刷新，以及合并完成后立即删除原始SST文件的影响。最后，文章介绍了LevelDB如何估计和评估读放大、写放大和空间放大。