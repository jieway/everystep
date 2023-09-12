# Part 1. 数据在磁盘上如何存放？

这一章节主要研究数据在磁盘上是如何组织的。先从自底向上的方式来描述所需的组件。
## 1. 数据组成

当在 Bitcask 数据库中存储一行数据时，它由数据头部和数据部分组成。下面是对这两部分各自包含的字段进行详细的解释和图形化表示：

**数据头部（Header）：**

数据头部包含了关于这一行数据的一些基本信息，如时间戳、键的大小和值的大小。它由三个字段组成：

1. **时间戳（timestamp）**：占据 4 个字节，表示数据创建的时间。

2. **键的大小（key_size）**：占据 4 个字节，表示键的长度，即键有多少个字节。

3. **值的大小（value_size）**：占据 4 个字节，表示值的长度，即值有多少个字节。

数据头部的结构如下所示：

```
    ┌───────────────┬──────────────┬────────────────┐
    │ timestamp(4B) │ key_size(4B) │ value_size(4B) │
    └───────────────┴──────────────┴────────────────┘
```

**数据部分（Data）：**

数据部分是实际存储键值对的内容。它由两个字段组成：

1. **键（key）**：变长，根据键的大小确定，是实际存储的键值对的键部分。

2. **值（value）**：变长，根据值的大小确定，是实际存储的键值对的值部分。

数据部分的结构如下所示：

```
    ┌───────┬───────┐
    │  key  │ value │
    └───────┴───────┘
```

综合起来，一行数据的完整结构如下：

```
    ┌───────────┬──────────┬────────────┬─────┬───────┐
    │ timestamp │ key_size │ value_size │ key │ value │
    └───────────┴──────────┴────────────┴─────┴───────┘
```

这种结构允许 Bitcask 数据库以高效且一致的方式存储各种大小的键值对，同时能够在读取时准确地解析和定位每个字段的信息。这为高效的数据存储和检索提供了基础。

根据上述内容，现在需要将数据编码为二进制的形式存入磁盘，然后再从磁盘中读取数据。所以可以继续拆分为头部数据和数据部分编码解码四部分内容。

## 2. 如何编码头部数据？

当我们要将一个数据行的头部信息编码成字节流，使得数据库能够正确地存储和解析这些信息时，我们可以使用这段代码来完成这个任务。让我一步步地解释这段代码的每一部分，让你更好地理解它的工作原理。

```go
func EncodeHeader(timestamp, keySize, valueSize uint32) ([]byte, error) {
    buf := new(bytes.Buffer)
    
    // 将时间戳按照小端字节序写入 buf 中
    if err := binary.Write(buf, binary.LittleEndian, timestamp); err != nil {
        return nil, err
    }
    
    // 将键的大小按照小端字节序写入 buf 中
    if err := binary.Write(buf, binary.LittleEndian, keySize); err != nil {
        return nil, err
    }
    
    // 将值的大小按照小端字节序写入 buf 中
    if err := binary.Write(buf, binary.LittleEndian, valueSize); err != nil {
        return nil, err
    }
    
    // 返回编码后的头部数据字节切片和 nil 错误
    return buf.Bytes(), nil
}
```

总结：

1. **函数声明：**
   ```go
   func EncodeHeader(timestamp, keySize, valueSize uint32) ([]byte, error)
   ```
   这行代码定义了一个名为 `EncodeHeader` 的函数，它接受三个参数：时间戳 `timestamp`、键的大小 `keySize` 和值的大小 `valueSize`。这个函数会返回两个值：编码后的头部数据字节切片和一个错误（如果有的话）。

2. **字节缓冲区的创建：**
   ```go
   buf := new(bytes.Buffer)
   ```
   这里创建了一个新的字节缓冲区 `buf`，它会用于存储编码后的字节数据。

3. **编码时间戳、键的大小和值的大小：**
   ```go
   if err := binary.Write(buf, binary.LittleEndian, timestamp); err != nil {
       return nil, err
   }
   if err := binary.Write(buf, binary.LittleEndian, keySize); err != nil {
       return nil, err
   }
   if err := binary.Write(buf, binary.LittleEndian, valueSize); err != nil {
       return nil, err
   }
   ```
   这部分使用 `binary.Write` 函数将时间戳、键的大小和值的大小按照小端字节序写入字节缓冲区 `buf`。如果在写入过程中出现错误，函数会返回错误信息。

4. **返回编码后的头部数据：**
   ```go
   return buf.Bytes(), nil
   ```
   最后，函数返回编码后的头部数据字节切片，以及一个 `nil` 错误。这个字节切片包含了编码后的时间戳、键的大小和值的大小信息。

通过这段代码，我们能够将数据行的头部信息按照一定的格式编码成字节流，以便于数据库正确地存储和读取。这个过程就像是为头部信息做了一个标记，告诉数据库如何正确地保存它们。

## 3. 如何编码一条数据？

这段代码帮助我们把这个键值对编码成一种数据库可以理解的格式，从而能够正确地存储和读取。我会逐步解释这段代码的每一部分，让你更好地理解它的工作原理。

1. **函数声明：**
   ```go
   func EncodeKV(timestamp uint32, key, value string) (uint32, []byte, error) {
   ```
   这行代码定义了一个函数 `EncodeKV`，它接受三个参数：时间戳 `timestamp`、键 `key` 和值 `value`。这个函数会返回三个值：总大小、编码后的数据行以及一个错误（如果出现错误）。

2. **编码头部：**
   ```go
   header, err := EncodeHeader(timestamp, uint32(len(key)), uint32(len(value)))
   if err != nil {
       return 0, nil, err
   }
   ```
   在这一部分，我们调用了之前编写的 `EncodeHeader` 函数来编码时间戳、键的大小和值的大小。这样就得到了头部数据 `header`。如果在编码的过程中出现了错误，我们会返回一个错误信息。

3. **拼接数据：**
   ```go
   data := append(header, append([]byte(key), []byte(value)...)...)
   ```
   这里，我们把头部数据 `header` 和键 `key` 以及值 `value` 的字节内容都连接在一起，形成了一个完整的数据行 `data`。

4. **计算总大小：**
   ```go
   return HeaderSize + uint32(len(key)) + uint32(len(value)), data, nil
   ```
   最后，我们计算整个数据行的总大小。总大小由三部分组成：头部大小 `HeaderSize`、键的大小和值的大小之和。然后，我们把总大小、完整的数据行 `data` 以及一个 `nil` 错误一起返回。

这段代码的目标是将一个键值对编码成 Bitcask 数据库能够理解的格式。它分为三个步骤：编码头部、拼接数据和计算总大小。通过这些步骤，我们能够将键值对以一种特定的方式存储在数据库中，使得在读取时能够准确地解析和处理它们。这个过程就像是在为数据做了一个标记，告诉数据库如何正确地保存它们。

下面的完整的结构

```go
func EncodeKV(timestamp uint32, key, value string) (uint32, []byte, error) {
    // 使用 EncodeHeader 函数编码头部信息，得到头部数据
    header, err := EncodeHeader(timestamp, uint32(len(key)), uint32(len(value)))
    if err != nil {
        return 0, nil, err
    }

    // 将键和值的字节数据拼接在一起，形成完整的数据行
    data := append(header, append([]byte(key), []byte(value)...)...)

    // 计算整个数据行的总大小（包括头部、键和值）
    totalSize := HeaderSize + uint32(len(key)) + uint32(len(value))
        
    // 返回总大小、完整数据行的字节切片和 nil 错误
    return totalSize, data, nil
}
```

## 4. 如何解码头部数据？

当我们需要从一个编码后的头部数据字节切片中解码出时间戳、键的大小和值的大小时，以便于理解数据行的结构和内容，我们可以使用这段代码来实现。我将逐步解释这段代码的每一部分，以便你更好地理解它的工作原理。

```go
func DecodeHeader(data []byte) (uint32, uint32, uint32, error) {
	// 检查数据字节切片是否足够长，至少需要 HeaderSize 长度
	if len(data) < HeaderSize {
		return 0, 0, 0, errors.New("data too short")
	}

	// 声明变量用于存储解码后的时间戳、键的大小和值的大小
	var timestamp, keySize, valueSize uint32

	// 创建一个字节读取器，并按照小端字节序从数据字节切片中依次读取时间戳、键的大小和值的大小
	buf := bytes.NewReader(data)
	if err := binary.Read(buf, binary.LittleEndian, &timestamp); err != nil {
		return 0, 0, 0, err
	}
	if err := binary.Read(buf, binary.LittleEndian, &keySize); err != nil {
		return 0, 0, 0, err
	}
	if err := binary.Read(buf, binary.LittleEndian, &valueSize); err != nil {
		return 0, 0, 0, err
	}

	// 返回解码后的时间戳、键的大小、值的大小和 nil 错误
	return timestamp, keySize, valueSize, nil
}
```

总结：

1. **函数声明：**
   ```go
   func DecodeHeader(data []byte) (uint32, uint32, uint32, error) {
   ```
   这行代码定义了一个名为 `DecodeHeader` 的函数，它接受一个数据字节切片 `data` 作为参数。函数会返回三个解码后的值：时间戳、键的大小和值的大小，以及一个错误（如果有的话）。

2. **检查数据长度：**
   ```go
   if len(data) < HeaderSize {
       return 0, 0, 0, errors.New("data too short")
   }
   ```
   这部分代码首先检查传入的数据字节切片 `data` 是否至少包含了头部的大小，如果不足够长，就返回一个错误。

3. **解码数据：**
   ```go
   var timestamp, keySize, valueSize uint32

   buf := bytes.NewReader(data)
   if err := binary.Read(buf, binary.LittleEndian, &timestamp); err != nil {
       return 0, 0, 0, err
   }
   if err := binary.Read(buf, binary.LittleEndian, &keySize); err != nil {
       return 0, 0, 0, err
   }
   if err := binary.Read(buf, binary.LittleEndian, &valueSize); err != nil {
       return 0, 0, 0, err
   }
   ```
   这里我们使用 `binary.Read` 函数按照小端字节序从数据字节切片中依次解码时间戳、键的大小和值的大小。如果在解码过程中出现错误，函数会返回错误信息。

4. **返回解码结果：**
   ```go
   return timestamp, keySize, valueSize, nil
   ```
   最后，函数返回解码后的时间戳、键的大小、值的大小和一个 `nil` 错误。这样的解码方式能够从头部数据中提取出时间戳、键的大小和值的大小，以便于理解数据行的结构和内容。


## 5. 如何解码一条数据？

当我们需要从一个编码后的数据行字节切片中解码出时间戳、键和值时，以便于理解数据行的内容和信息，我们可以使用这段代码来实现。我将逐步解释这段代码的每一部分，以便你更好地理解它的工作原理。

```go
func DecodeKV(data []byte) (uint32, string, string, error) {
    // 检查数据字节切片是否足够长，至少需要 HeaderSize 长度
    if len(data) < HeaderSize {
        return 0, "", "", errors.New("data too short")
    }

    // 解码数据行的头部，获取时间戳、键的大小和值的大小
    timestamp, keySize, valueSize, err := DecodeHeader(data[:HeaderSize])
    if err != nil {
        return 0, "", "", err
    }

    // 检查数据字节切片是否足够长，以保证可以解码键和值的内容
    if len(data) < int(HeaderSize+keySize+valueSize) {
        return 0, "", "", errors.New("key/value data too short")
    }

    // 解码键和值的内容
    key := string(data[HeaderSize : HeaderSize+keySize])
    value := string(data[HeaderSize+keySize : HeaderSize+keySize+valueSize])

    // 返回解码后的时间戳、键、值和 nil 错误
    return timestamp, key, value, nil
}
```

总结：

1. **函数声明：**
   ```go
   func DecodeKV(data []byte) (uint32, string, string, error) {
   ```
   这行代码定义了一个名为 `DecodeKV` 的函数，它接受一个数据字节切片 `data` 作为参数。函数会返回四个解码后的值：时间戳、键、值以及一个错误（如果有的话）。

2. **检查数据长度：**
   ```go
   if len(data) < HeaderSize {
       return 0, "", "", errors.New("data too short")
   }
   ```
   这部分代码首先检查传入的数据字节切片 `data` 是否至少包含了头部的大小，如果不足够长，就返回一个错误。

3. **解码数据行头部：**
   ```go
   timestamp, keySize, valueSize, err := DecodeHeader(data[:HeaderSize])
   if err != nil {
       return 0, "", "", err
   }
   ```
   这里我们调用 `DecodeHeader` 函数来解码数据行的头部，以获取时间戳、键的大小和值的大小。如果在解码头部时出现错误，函数会返回错误信息。

4. **检查数据长度再次：**
   ```go
   if len(data) < int(HeaderSize+keySize+valueSize) {
       return 0, "", "", errors.New("key/value data too short")
   }
   ```
   这部分代码再次检查传入的数据字节切片 `data` 是否足够长，以保证可以解码出键和值的内容。

5. **解码键和值的内容：**
   ```go
   key := string(data[HeaderSize : HeaderSize+keySize])
   value := string(data[HeaderSize+keySize : HeaderSize+keySize+valueSize])
   ```
   这部分将根据解码得到的键的大小和值的大小，从数据字节切片 `data` 中提取出键和值的内容，并将它们转换成字符串。

6. **返回解码结果：**
   ```go
   return timestamp, key, value, nil
   ```
   最后，函数返回解码后的时间戳、键、值以及一个 `nil` 错误。这样的解码方式能够从数据行中提取出时间戳、键和值的内容，以便于理解数据行的信息和内容。
