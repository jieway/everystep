# Part 2. 如何使用存储引擎？

这一章以自顶向下的方式来描述，将要实现一个什么样的东西，以及如何使用。

## 如何使用 DiskStorage ？

下面讲了该怎么使用这个存储引擎，首先就是如何实例化。要实例化 `DiskStorage`，可以使用提供的构造函数 `NewDiskStorage`。这个构造函数接受一个文件名作为参数，并返回一个 `DiskStorage` 实例的指针，同时会进行初始化操作，包括初始化 `KeyDir` 索引映射和打开文件。

下面是一个实例化 `DiskStorage` 的示例代码：

```go
func main() {
    // 调用 NewDiskStorage 构造函数来实例化 DiskStorage
    storage, err := NewDiskStorage("data.db")
    if err != nil {
        fmt.Println("Error creating DiskStorage:", err)
        return
    }
    defer storage.Close() // 最后关闭存储实例

    // 使用实例进行操作
    err = storage.Set("key1", "value1")
    if err != nil {
        fmt.Println("Error setting value:", err)
        return
    }

    value, err := storage.Get("key1")
    if err != nil {
        fmt.Println("Error getting value:", err)
        return
    }

    fmt.Println("Value for key1:", value)
}
```

在上面的示例中，`NewDiskStorage("data.db")` 调用实例化了一个名为 "data.db" 的磁盘存储。然后，通过实例进行了 `Set` 和 `Get` 操作。最后，在程序结束时，通过 `defer storage.Close()` 来确保存储实例关闭，以便数据被正确地刷新到磁盘。

通过实例化 `DiskStorage`，您可以使用其提供的方法来操作键值对数据，并在磁盘和内存中进行数据存储和检索。

## NewDiskStorage

`NewDiskStorage` 是一个构造函数，用于创建 `DiskStorage` 实例，并在创建过程中执行初始化操作。以下是 `NewDiskStorage` 函数的功能和流程解释：

```go
func NewDiskStorage(fileName string) (*DiskStorage, error) {
    ds := &DiskStorage{
        FileName: fileName,
        KeyDir:   make(map[string]KeyEntry),
    }

    // 检查文件是否存在
    _, err := os.Stat(fileName)
    if err == nil {
        ds.initKeyDir() // 如果文件存在，初始化 KeyDir 映射
    }

    // 打开或创建文件
    ds.File, err = os.OpenFile(fileName, os.O_APPEND|os.O_RDWR|os.O_CREATE, 0644)
    return ds, err
}
```

解释 `NewDiskStorage` 的步骤：

1. **创建 DiskStorage 实例**：首先，创建一个 `DiskStorage` 实例 `ds`，并设置其 `FileName` 字段为传入的文件名。同时，创建一个空的 `KeyDir` 映射，用于存储键索引。

2. **检查文件是否存在**：使用 `os.Stat(fileName)` 来检查指定的文件是否存在。如果文件存在（即没有返回错误），则说明存储系统中可能已经有数据。在这种情况下，调用 `initKeyDir` 方法以初始化 `KeyDir` 映射。

3. **打开或创建文件**：使用 `os.OpenFile` 打开指定的文件。如果文件不存在，将会被创建。打开文件时使用了 `os.O_APPEND`、`os.O_RDWR` 和 `os.O_CREATE` 标志，以允许文件追加、读写和创建。

4. **返回实例和错误**：返回创建的 `DiskStorage` 实例和可能的错误。如果发生错误，可能是因为文件打开或初始化过程中出现了问题。

通过调用 `NewDiskStorage`，您可以创建一个经过初始化的 `DiskStorage` 实例，准备好用于存储和检索键值对数据。


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

## initKeyDir

`initKeyDir` 函数在创建 `DiskStorage` 实例时，当检测到指定的磁盘文件已经存在时被调用。这是为了在初始化存储系统时，从已有的数据文件中读取并加载现有的键值对信息。

具体来说，以下情况会触发调用 `initKeyDir` 函数：

1. **创建新的 `DiskStorage` 实例**：当调用 `NewDiskStorage` 构造函数创建新的 `DiskStorage` 实例时，会首先检查指定的文件是否已经存在。

2. **已有的数据文件**：如果文件已经存在，说明存储系统之前可能已经存储了一些键值对数据。为了确保新创建的 `DiskStorage` 实例能够恢复已有的数据，它会调用 `initKeyDir` 函数来加载这些现有的键值对信息。

3. **内存中的索引构建**：`initKeyDir` 函数的主要目的是在内存中构建键索引映射 `KeyDir`。这个映射可以用来在内存中快速访问键值对的位置和元数据，以加速后续的读取、写入和查询操作。

总之，`initKeyDir` 函数在创建 `DiskStorage` 实例时被调用，用于加载已有的键值对数据，并在内存中构建键索引映射，以便在之后的操作中能够高效地访问存储的数据。

`initKeyDir` 是一个在 `DiskStorage` 结构体中定义的方法，用于初始化内存中的键索引映射 `KeyDir`，以便在创建 `DiskStorage` 实例时能够快速访问存储在磁盘文件中的键值对的位置和元数据。以下是 `initKeyDir` 方法的功能和流程解释：

```go
func (ds *DiskStorage) initKeyDir() {
    file, err := os.Open(ds.FileName)
    if err != nil {
        fmt.Println("Error initializing KeyDir:", err)
        return
    }
    defer file.Close()

    for {
        headerBytes := make([]byte, HeaderSize)
        _, err := file.Read(headerBytes)
        if err != nil {
            break
        }

        timestamp, keySize, valueSize, _ := DecodeHeader(headerBytes)
        keyBytes := make([]byte, keySize)
        file.Read(keyBytes)

        valueBytes := make([]byte, valueSize)
        file.Read(valueBytes)

        key := string(keyBytes)
        value := string(valueBytes)

        totalSize := HeaderSize + uint32(keySize+valueSize)
        ds.KeyDir[key] = NewKeyEntry(timestamp, ds.WritePosition, totalSize)
        ds.WritePosition += totalSize

        fmt.Printf("loaded k=%s, v=%s\n", key, value)
    }
}
```

解释 `initKeyDir` 的步骤：

1. 打开文件：使用 `os.Open` 方法打开指定的磁盘文件以读取数据。如果打开文件时发生错误，方法会输出错误信息并返回。

2. 循环读取：通过一个循环，从文件中连续读取每个键值对的数据。循环会一直运行，直到无法读取到更多数据（`file.Read` 返回错误）。

3. 读取头部信息：首先，从文件中读取一个固定大小的字节序列，该序列包含了键值对头部的信息。这些信息包括时间戳、键的大小和值的大小。

4. 解码头部：使用 `DecodeHeader` 函数解码头部信息，以获取时间戳、键的大小和值的大小。

5. 读取键和值数据：根据键和值的大小信息，从文件中分别读取键和值的字节数据。

6. 构建 `KeyEntry`：使用解码的信息和从文件中读取的数据，创建一个新的 `KeyEntry` 实例，其中包含时间戳、位置和总大小信息。

7. 更新位置和索引：将新的 `KeyEntry` 添加到 `KeyDir` 映射中，然后更新 `WritePosition`，以便为下一个键值对的写入位置做好准备。

8. 输出加载信息：将加载的键和值信息打印出来，以便查看初始化过程。

通过这个流程，`initKeyDir` 方法会逐个读取磁盘文件中的键值对，并在内存中构建 `KeyDir` 映射，以便之后的操作可以快速定位和访问键值对的位置和元数据。这在创建 `DiskStorage` 实例时非常有用。

