# Part 2. Set、Get 方法实现

这一章节主要研究数据在内存中是如何组织的。

首先实现 DiskStorage ，用来管理一些元信息，例如数据在内存中的索引，用 map 来存。
## DiskStorage

`DiskStorage` 是在提供的代码中定义的一个结构体，表示了一个基于磁盘的键值存储系统。它包含了管理和操作键值对存储的方法和数据。

```go
type DiskStorage struct {
	FileName      string
	WritePosition uint32
	KeyDir        map[string]KeyEntry
	File          *os.File
}
```

以下是 `DiskStorage` 结构体的重要成员和功能的解释：

1. **FileName**: 一个字符串字段，表示用于存储数据的磁盘文件的名称。

2. **WritePosition**: 一个无符号整数字段，表示当前写入新数据的文件位置。在执行 `Set` 操作时，新的键值对数据将被追加到该位置之后。

3. **KeyDir**: 一个映射（map）字段，用于在内存中维护键值对的索引。它将键映射到 `KeyEntry` 结构体，以记录键值对的位置、时间戳和总大小等信息。

4. **File**: 一个指向磁盘文件的指针（*os.File）。该文件用于实际存储键值对的数据。

5. **NewDiskStorage(fileName string) (*DiskStorage, error)**: 一个构造函数，用于创建新的 `DiskStorage` 实例。它接受一个文件名作为参数，如果该文件存在，则会初始化 `KeyDir` 映射以加载文件中的现有数据。

6. **Set(key, value string) error**: 用于将键值对添加到存储中的方法。它接受键和值作为参数，生成时间戳并将数据编码后写入磁盘文件。同时，它还更新了 `KeyDir` 映射和 `WritePosition`，以反映新键值对的位置和信息。

7. **Get(key string) (string, error)**: 用于根据键检索值的方法。它会根据提供的键查找 `KeyDir` 映射，找到对应的 `KeyEntry`，然后根据位置信息从磁盘文件中读取数据并进行解码。

8. **write(data []byte) error**: 一个辅助方法，用于将数据写入磁盘文件。它会将提供的字节数据写入文件，并执行文件同步以确保数据被写入磁盘。

9. **initKeyDir()**: 初始化 `KeyDir` 映射的方法。它会读取现有的磁盘文件，解码其中存储的键值对，并在内存中构建 `KeyDir` 映射以加速后续操作。

10. **Close()**: 用于关闭存储系统的方法。它会执行文件同步操作，将数据刷新到磁盘，并关闭文件。

总之，`DiskStorage` 结构体是一个将键值对数据存储到磁盘并允许通过键进行检索的简单实现。它通过在内存中维护索引映射和在磁盘文件中存储实际数据来实现这一功能。

## KeyEntry

然后是 KeyEntry ，用来组织数据在内存中的存储方式。`KeyEntry` 在这个代码中扮演着关键的角色，用于管理和跟踪每个键值对在磁盘文件中的位置和元数据。具体来说，`KeyEntry` 有以下用途：

1. **位置追踪**：`KeyEntry` 中的 `Position` 字段表示键值对在磁盘文件中的位置。这允许系统知道在文件中的哪个位置存储了特定的键值对。在进行 `Get` 操作时，可以根据 `KeyEntry` 中的位置信息迅速定位和读取相应的数据。

2. **时间戳记录**：`KeyEntry` 的 `Timestamp` 字段记录了键值对添加的时间戳。这在需要了解特定键值对何时被添加的情况下非常有用，例如用于数据审计或其他需要时间相关信息的场景。

3. **总大小信息**：`KeyEntry` 中的 `TotalSize` 字段记录了键值对数据的总大小。这对于确定下一个键值对的写入位置很重要，因为在文件中的位置是逐个递增的。通过总大小，可以在文件中为下一个键值对分配合适的位置。

4. **内存中的索引**：`KeyEntry` 用作在内存中的索引，以便在执行 `Get` 操作时，可以通过键快速查找到对应的键值对位置和元数据。这避免了需要扫描整个文件以查找特定键的开销。

总之，`KeyEntry` 的存在使得系统能够高效地定位和管理存储在磁盘文件中的键值对。它提供了键值对的位置、时间戳和大小等关键信息，使存储和检索操作更加快速和可靠。

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

综上一个简单的 BitCask 存储引擎就写好了，目前还非常简陋，只提供了 Set 和 Get 方法，还有很多可以做的事情。

可以尝试实现增加 CRC 字段，Delete 方法等功能。