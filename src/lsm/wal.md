# 预写日志（WAL）

![章节概览](./lsm-tutorial/week2-06-overview.svg)

在本章中，你将：

* 实现预写日志文件的编码和解码。
* 系统重启时从 WAL 中恢复 memtables。

要将测试用例复制到起始代码并运行它们，

```
cargo x copy-test --week 2 --day 6
cargo x scheck
```

## 任务 1：WAL 编码

在此任务中，你需要修改：

```
src/wal.rs
```

在上一章中，我们已经实现了清单文件，以便可以持久化 LSM 状态。我们实现了 `close` 函数，在停止引擎之前将所有 memtables 刷新到 SSTs。现在，如果系统崩溃（即，断电）怎么办？我们可以将 memtable 的修改记录到 WAL（预写日志），并在重启数据库时恢复 WAL。只有当 `self.options.enable_wal = true` 时，才启用 WAL。

WAL 编码只是一个键值对列表。

```
| key_len | key | value_len | value |
```

你还需要实现 `recover` 函数，以读取 WAL 并恢复 memtable 的状态。

注意，我们使用 `BufWriter` 来写 WAL。使用 `BufWriter` 可以减少对 OS 的系统调用次数，从而减少写路径的延迟。当用户修改一个键时，数据并不保证被写入磁盘。相反，引擎只保证在调用 `sync` 时数据被持久化。要正确地将数据持久化到磁盘，你需要首先通过调用 `flush()` 将数据从缓冲写入器刷新到文件对象，然后通过使用 `get_mut().sync_all()` 在文件上进行 fsync。

## 任务 2：集成 WALs

在此任务中，你需要修改：

```
src/mem_table.rs
src/wal.rs
src/lsm_storage.rs
```

`MemTable` 有一个 WAL 字段。如果 `wal` 字段设置为 `Some(wal)`，则在更新 memtable 时需要追加到 WAL。在你的 LSM 引擎中，如果 `enable_wal = true`，你需要创建 WALs。你还需要在创建新 memtable 时使用 `ManifestRecord::NewMemtable` 记录更新清单。

你可以使用 `create_with_wal` 函数创建带有 WAL 的 memtable。WAL 应写入存储目录的 `<memtable_id>.wal`。如果此 memtable 作为 L0 SST 刷新，则 memtable id 应与 SST id 相同。

## 任务 3：从 WALs 恢复

在此任务中，你需要修改：

```
src/lsm_storage.rs
```

如果启用了 WAL，你需要在加载数据库时根据 WALs 恢复 memtables。你还需要实现数据库的 `sync` 函数。`sync` 的基本保证是引擎确保数据已经持久化到磁盘（并且在重启时会恢复）。为了实现这一点，你可以简单地同步对应于当前 memtable 的 WAL。

```
cargo run --bin mini-lsm-cli -- --enable-wal
```

记住从状态中恢复正确的 `next_sst_id`，它应该是 `max{memtable id, sst id}` + 1。在你的 `close` 函数中，如果 `enable_wal` 设置为 true，你不应该将 memtables 刷新到 SSTs，因为 WAL 本身提供了持久性。你应该等待所有合并和刷新线程退出后再关闭数据库。

## 测试你的理解

* 你何时可以告诉用户他们的修改（put/delete）已经被持久化？
* 你如何处理 WAL 中的损坏数据？
