

LevelDB 的 Manifest 文件是 LevelDB 数据库的一部分，它存储了数据库的元数据，包括当前的文件系统状态，比如哪些 SSTables 属于哪个 level，以及当前的日志文件编号等信息。

### Manifest 的作用？

Manifest 文件是 LevelDB 实现 Crash Recovery 的关键。当数据库重新打开时，LevelDB 会读取最新的 Manifest 文件来恢复数据库的状态。Manifest 文件的存在使得 LevelDB 能够在系统崩溃后恢复到一致的状态。

在 LevelDB 的源码中，Manifest 文件的写入主要在 `version_set.cc` 文件的 `VersionSet::WriteSnapshot` 函数中实现。以下是一个简化的代码示例：

```cpp
void VersionSet::WriteSnapshot(log::Writer* log) {
  // Save metadata
  // ...

  // Save compaction pointers
  for (int level = 0; level < config::kNumLevels; level++) {
    if (!compact_pointer_[level].empty()) {
      // Write compact_pointer_[level] to log
    }
  }

  // Save files in each level
  for (int level = 0; level < config::kNumLevels; level++) {
    const std::vector<FileMetaData*>& files = current_->files_[level];
    for (size_t i = 0; i < files.size(); i++) {
      const FileMetaData* f = files[i];
      // Write the metadata of each file to log
    }
  }
}
```

以上就是 LevelDB 中 Manifest 文件的作用和实现。具体的实现可能会因为 LevelDB 的版本和配置的不同而有所不同。

### Manifest 的编码格式？

Manifest 记录了数据库的元数据，包括当前的文件系统状态，比如哪些 SSTables 属于哪个 level，以及当前的日志文件编号等信息。Manifest 文件的编码格式主要由两部分组成：记录（Record）和块（Block）。

每个记录（Record）包含一个或多个块（Block）。每个块的格式如下：

- 类型（1字节）：块的类型，可以是 kZeroType、kFullType、kFirstType、kMiddleType、kLastType 中的一种。
- CRC（4字节）：块的 CRC32 校验和，用于检测数据是否在传输过程中被损坏。
- 长度（2字节）：块的长度，即数据的字节数。
- 数据（变长）：块的数据，长度由上面的长度字段指定。

每个记录的格式如下：

- 序列号（8字节）：记录的序列号，用于标识记录的顺序。
- 类型（1字节）：记录的类型，可以是 kComparator、kLogNumber、kNextFileNumber、kLastSequence、kCompactPointer、kDeletedFile、kNewFile 中的一种。
- 数据（变长）：记录的数据，长度和内容取决于记录的类型。

具体到代码层面，Manifest 文件的编码和解码主要在 `version_edit.cc` 文件中的 `VersionEdit::EncodeTo` 和 `VersionEdit::DecodeFrom` 函数中实现。以下是一个简化的代码示例：

以上就是 LevelDB 中 Manifest 文件的编码格式和实现。具体的实现可能会因为 LevelDB 的版本和配置的不同而有所不同。

### Manifest 体积过大怎么办？

LevelDB 使用了一种称为 "compaction" 的策略来解决 Manifest 文件过大的问题。当 Manifest 文件的大小超过一定阈值时，LevelDB 会触发一次 compaction 操作。

在 compaction 操作中，LevelDB 会遍历所有的 SST 文件，并将这些文件的元数据写入到一个新的 Manifest 文件中。然后，LevelDB 会将旧的 Manifest 文件删除，并将新的 Manifest 文件重命名为当前的 Manifest 文件。这样，Manifest 文件的大小就被控制在了一个可接受的范围内。

具体到代码层面，这个过程主要在 `db_impl.cc` 文件的 `DBImpl::WriteSnapshot` 和 `DBImpl::CompactMemTable` 函数中实现。以下是一个简化的代码示例：

```cpp
void DBImpl::WriteSnapshot(log::Writer* log) {
  // Save metadata
  // ...

  // Save compaction pointers
  for (int level = 0; level < config::kNumLevels; level++) {
    if (!compact_pointer_[level].empty()) {
      // Write compact_pointer_[level] to log
    }
  }

  // Save files in each level
  for (int level = 0; level < config::kNumLevels; level++) {
    const std::vector<FileMetaData*>& files = current_->files_[level];
    for (size_t i = 0; i < files.size(); i++) {
      const FileMetaData* f = files[i];
      // Write the metadata of each file to log
    }
  }
}

void DBImpl::CompactMemTable() {
  // 将 MemTable 转换为 SST 文件并刷新到磁盘
  // ...

  // 如果 Manifest 文件过大，触发 compaction 操作
  if (manifest_file_size_ > options_.max_manifest_file_size) {
    // 创建新的 Manifest 文件
    // ...

    // 将当前的元数据写入到新的 Manifest 文件中
    WriteSnapshot(log);

    // 删除旧的 Manifest 文件，并将新的 Manifest 文件重命名为当前的 Manifest 文件
    // ...
  }
}
```

以上就是 LevelDB 中解决 Manifest 文件过大问题的基本实现。具体的实现可能会因为 LevelDB 的版本和配置的不同而有所不同。


在引擎运行几个小时后，清单文件可能会变得非常大。

## 任务 2：写清单

现在，你可以修改你的 LSM 引擎在必要时写清单。在此任务中，你需要修改：

```
src/lsm_storage.rs
src/compact.rs
```

现在，我们只使用两种类型的清单记录：SST 刷新和合并。SST 刷新记录存储刷新到磁盘的 SST id。合并记录存储合并任务和生成的 SST id。每次你向磁盘写入一些新文件时，首先同步文件和存储目录，然后写入清单并同步清单。清单文件应写入 `<path>/MANIFEST`。

要同步目录，你可以实现 `sync_dir` 函数，你可以使用 `File::open(dir).sync_all()?` 来同步它。在 Linux 上，目录是一个包含目录中文件列表的文件。通过对目录进行 fsync，你将确保如果电源断开，新写入的（或删除的）文件可以对用户可见。

记住，无论是后台合并触发器（层次化/简单/通用）还是用户请求进行强制合并，都要写入合并清单记录。

## 任务 3：关闭时刷新

在此任务中，你需要修改：

```
src/lsm_storage.rs
```

你需要实现 `close` 函数。如果 `self.options.enable_wal = false`（我们将在下一章介绍 WAL），你应该在停止存储引擎之前将所有 memtables 刷新到磁盘，以便所有用户更改都将被持久化。

## 任务 4：从状态恢复

在此任务中，你需要修改：

```
src/lsm_storage.rs
```

现在，你可以修改 `open` 函数，从清单文件恢复引擎状态。要恢复它，你需要首先生成你需要加载的 SST 的列表。你可以通过调用 `apply_compaction_result` 和恢复 LSM 状态中的 SST id 来做到这一点。之后，你可以遍历状态并加载所有 SST（更新 sstables 哈希映射）。在此过程中，你需要计算最大的 SST id 并更新 `next_sst_id` 字段。之后，你可以使用该 id 创建一个新的 memtable，并将 id 增加一。

你可以使用 mini-lsm-cli 来测试你的实现。

```
cargo run --bin mini-lsm-cli
fill 1000 2000
close
cargo run --bin mini-lsm-cli
get 1500
```

## 测试你的理解

* 你什么时候需要调用 `fsync`？为什么需要对目录进行 fsync？
* 你需要在哪些地方写入清单？
* 考虑一个不使用清单文件的 LSM 引擎的替代实现。相反，它在每个文件的头部记录级别/层信息，每次重启时扫描存储目录，并仅从目录中存在的文件恢复 LSM 状态。这种实现是否可能正确地维护 LSM 状态，可能存在什么问题/挑战？

## 额外任务

* **清单压缩。**当清单文件中的日志数量过大时，你可以重写清单文件，只存储当前快照，并将新日志追加到该文件。
* **并行打开。**在你收集到需要打开的 SST 列表后，你可以并行打开和解码它们，而不是一个接一个地做，从而加速恢复过程。

{{#include copyright.md}}


