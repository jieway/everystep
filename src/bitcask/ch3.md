# Part 3 实现 Set、Get

这一章节主要研究数据在内存中是如何组织的。通过 Set 和 Get 方法的具体实现将前两章串起来。

## Set 

当调用 `Set(key, value string) error` 方法时，将执行以下步骤来向存储中添加新的键值对：

1. 获取当前时间戳：通过 `time.Now().Unix()` 获取当前时间戳，以便记录键值对添加的时间。

2. 编码键值对：将键、值和时间戳传递给 `EncodeKV` 函数，该函数会将它们编码成字节序列。这个字节序列包括一个头部，其中包含时间戳、键的长度和值的长度。

3. 写入数据：调用 `ds.write(data)`，这会将编码后的键值对数据写入磁盘文件中。`ds.write(data)` 函数将数据写入文件，并在写入后执行 `ds.File.Sync()` 同步操作，确保数据被实际写入磁盘。

4. 更新 KeyDir 映射：创建一个新的 `KeyEntry` 实例，其中包含时间戳、写入位置和键值对数据的总大小。然后，将这个 `KeyEntry` 添加到 `KeyDir` 映射中，以便稍后能够通过键查找数据的位置和元数据。

5. 更新写入位置：增加 `ds.WritePosition` 的值，以便为下一个键值对的写入位置做好准备。

整个 `Set` 的流程如下：

```go
func (ds *DiskStorage) Set(key, value string) error {
    timestamp := uint32(time.Now().Unix())
    totalSize, data, _ := EncodeKV(timestamp, key, value) // 编码键值对为字节序列
    ds.write(data) // 写入数据到磁盘文件
    ds.KeyDir[key] = NewKeyEntry(timestamp, ds.WritePosition, totalSize) // 更新 KeyDir 映射
    ds.WritePosition += totalSize // 更新写入位置
    return nil
}
```

通过这个流程，新的键值对被编码并写入磁盘文件，同时也在内存中维护了键值对的索引，以便后续的检索和操作。

## Get

当调用 `Get(key string) (string, error)` 方法时，将执行以下步骤来获取特定键的值：

1. 从 `KeyDir` 映射中查找键：首先，会检查 `KeyDir` 映射，看是否存在给定的键。如果存在，可以通过 `KeyEntry` 得知该键值对的位置和大小信息，从而可以在磁盘文件中找到对应的数据。

2. 定位到文件位置：使用 `KeyEntry` 中的 `Position` 信息，将文件指针定位到存储特定键值对的位置。这通过调用 `ds.File.Seek()` 来实现。

3. 读取数据：从定位的文件位置开始，读取键值对数据的字节序列。首先，会创建一个足够大的字节切片来容纳数据，然后使用 `ds.File.Read()` 从文件中读取数据到切片中。

4. 解码数据：解码从文件中读取的数据，以从字节序列中提取键和值。这涉及到调用 `DecodeKV` 函数，它会将字节序列解码为键和值。

5. 返回值：从解码后的数据中获取值部分，并作为结果返回。

整个 `Get` 的流程如下：

```go
func (ds *DiskStorage) Get(key string) (string, error) {
    kv, ok := ds.KeyDir[key]
    if !ok {
        return "", fmt.Errorf("key not found")
    }

    ds.File.Seek(int64(kv.Position), 0) // 将文件指针定位到键值对位置
    data := make([]byte, kv.TotalSize) // 创建足够大的字节切片
    _, err := ds.File.Read(data) // 从文件读取数据到切片
    if err != nil {
        return "", err
    }

    // 解码数据，获取值部分
    _, _, value, err := DecodeKV(data)
    if err != nil {
        return "", err
    }

    return value, nil // 返回值
}
```

通过这个流程，`Get` 方法可以根据键查找存储在磁盘文件中的相应值，并将其解码后返回。这种方式避免了需要扫描整个文件以查找特定键的情况，从而实现了高效的键值对检索。

## 总结

综上一个简单的 Bitcask 存储引擎就写好了，目前还非常简陋，只提供了 Set 和 Get 方法，还有很多可以做的事情。

如果仅仅是粘贴没有任何成就感，可以尝试修改之前的代码，例如增加一个 CRC 字段来进一步加深理解。通过 CRC 可以确保数据存取过程中是否一致。编码数据的时候直接将 CRC 附加到字段中即可，解码的时候要根据读取的数据重新生成 CRC 并和之前存的 CRC 比对数据是否一致。

这个很简单，可以尝试自己能否实现。