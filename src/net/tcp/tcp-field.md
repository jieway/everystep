# TCP 报文格式

TCP（Transmission Control Protocol，传输控制协议）的数据包由头部和数据部分组成。以下是一个文本图形化的表示方式：

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            TCP Header                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            TCP Data                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

- **TCP Header**：TCP头部，包含了用于控制TCP连接和数据传输的各种信息，如源端口、目标端口、序列号、确认号、窗口大小等。

- **TCP Data**：TCP数据，这是TCP载荷的实际数据，也就是需要传输的信息。

TCP头部的长度通常是20字节，但如果包含了选项字段，长度可能会增加。数据部分的长度则取决于数据包的实际内容。

### TCP 头部字段

下面是 TCP（Transmission Control Protocol，传输控制协议）的头部结构：

```
 0                   1                   2                   3   
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

各字段的含义如下：

- **Source Port**：源端口号，用于标识发送端的应用程序。
- **Destination Port**：目标端口号，用于标识接收端的应用程序。
- **Sequence Number**：序列号，用于标识数据包在数据流中的位置。
- **Acknowledgment Number**：确认号，用于标识期望接收的下一个数据包的序列号。
- **Data Offset**：数据偏移，标识TCP头部的长度。
- **Reserved**：保留字段，未使用。
- **Flags**：标志位，包括URG、ACK、PSH、RST、SYN、FIN等，用于控制TCP的各种行为。
- **Window**：窗口大小，用于流量控制。
- **Checksum**：校验和，用于错误检测。
- **Urgent Pointer**：紧急指针，当URG标志位被设置时使用。
- **Options**：选项，用于支持一些可选的TCP功能。
- **Padding**：填充，用于确保TCP头部的长度为32位的整数倍。
- **Data**：数据，TCP载荷的实际数据。

### 端口

当两台计算机通过TCP进行通信时，它们各自都会有一个源端口和目标端口。这两个端口号是在TCP头部中定义的，用于标识发送端和接收端的应用程序。

例如，假设你的计算机（计算机A）正在尝试通过HTTP协议（它基于TCP）访问一个网站。在这种情况下，计算机A的浏览器会选择一个源端口，例如50000（通常是随机选择的），而目标端口则是80（HTTP协议的标准端口）。

在TCP头部中，这将表示为：

```
Source Port: 50000
Destination Port: 80
```

当网站的服务器收到这个请求时，它会看到源端口是50000，目标端口是80。服务器会处理这个请求，然后发送一个响应回计算机A。在响应的TCP头部中，源端口和目标端口的值会被交换：

```
Source Port: 80
Destination Port: 50000
```

这样，当计算机A收到这个响应时，它就知道这个响应是针对源端口50000的请求的，也就是说，这个响应应该被发送到发起请求的浏览器。

这就是源端口和目标端口在TCP通信中的作用。

### 序列号

在TCP（传输控制协议）中，序列号（Sequence Number）是一个非常重要的概念，它用于标识数据包在数据流中的位置，以确保数据包能够按照正确的顺序被接收和重组。

假设我们有两台计算机，计算机A和计算机B，它们正在通过TCP进行通信。计算机A想要发送一段消息给计算机B，这段消息的内容是"Hello, World!"，但是由于这段消息太长，不能一次性发送，所以它被分割成了两个数据包，分别是"Hello, "和"World!"。

在TCP中，每个数据包都会被赋予一个序列号。假设"Hello, "的序列号是1，"World!"的序列号是2。当计算机B收到这两个数据包时，它会根据序列号的值来确定数据包的顺序，然后将这两个数据包重组成原始的消息"Hello, World!"。

如果没有序列号，那么计算机B可能会收到"World!Hello, "，这显然是错误的。因此，序列号在TCP中起着至关重要的作用。

此外，序列号还用于实现TCP的可靠性。例如，如果计算机B没有收到序列号为2的数据包，它可以通过发送一个特殊的数据包（叫做ACK，Acknowledgment）来告诉计算机A，它需要重新发送序列号为2的数据包。这就是TCP如何确保数据的可靠传输的。

### 为什么序列号是随机的？

TCP（传输控制协议）连接的初始化序列号（ISN，Initial Sequence Number）在每次连接建立时都会变化，这是由于以下几个原因：

1. **避免数据混淆**：如果新的连接使用了与旧连接相同的序列号，那么网络中延迟的数据包可能会被错误地认为是新连接的数据包，从而导致数据混淆。

2. **安全性**：如果序列号是固定的或者可预测的，那么攻击者可能会利用这个特性进行攻击，例如伪造数据包。通过使每个连接的初始序列号随机，可以增加攻击的难度。

3. **流量控制**：序列号也用于TCP的流量控制。每个字节都有一个序列号，接收方通过确认序列号来告诉发送方哪些数据已经被接收。如果序列号不变，那么这个机制将无法正常工作。

因此，每次建立TCP连接时，都会生成一个新的、随机的初始序列号。

### Acknowledgment Number

在TCP（传输控制协议）中，Acknowledgment Number（确认号）是一个非常重要的概念，它用于标识接收端期望接收的下一个数据包的序列号，以此来实现TCP的可靠性。

假设我们有两台计算机，计算机A和计算机B，它们正在通过TCP进行通信。计算机A想要发送一段消息给计算机B，这段消息的内容是"Hello, World!"，但是由于这段消息太长，不能一次性发送，所以它被分割成了两个数据包，分别是"Hello, "和"World!"。

在TCP中，每个数据包都会被赋予一个序列号。假设"Hello, "的序列号是1，"World!"的序列号是2。当计算机B收到序列号为1的数据包后，它会发送一个确认号为2的ACK数据包给计算机A，表示它已经成功接收了序列号为1的数据包，期望接收序列号为2的数据包。

如果计算机A没有收到确认号为2的ACK数据包，它会认为序列号为2的数据包在传输过程中丢失，然后重新发送这个数据包。如果计算机A收到了确认号为2的ACK数据包，它就知道序列号为1的数据包已经被成功接收，然后继续发送下一个数据包。

这就是Acknowledgment Number在TCP中的作用。

### Data Offset

在TCP（传输控制协议）中，Data Offset（数据偏移）是一个非常重要的字段，它标识了TCP头部的长度。这个字段的值是以32位（4字节）为单位的，所以如果Data Offset的值是5，那么实际的TCP头部长度就是5*4=20字节。

这个字段的存在是因为TCP头部的长度是可变的。TCP头部有一些可选的字段，比如Options（选项），这些字段可能会被包含在某些数据包的头部中，也可能不被包含。因此，接收端需要通过查看Data Offset的值来确定头部的实际长度，从而知道数据部分从哪里开始。

例如，假设我们有一个TCP数据包，它的Data Offset的值是5，那么接收端就知道头部的长度是20字节，数据部分就从第21字节开始。如果Data Offset的值是6，那么头部的长度就是24字节，数据部分就从第25字节开始。

这就是Data Offset在TCP中的作用。

### Reserved 字段

在 TCP（传输控制协议）的头部，有一个字段被称为 "Reserved"。这个字段的长度为 6 位，用于未来的扩展。在当前的 TCP 规范中，这个字段必须被设置为 0。

这是 TCP 头部的一部分，其结构如下：

```cpp
typedef struct {
    unsigned short source_port;     // 源端口
    unsigned short dest_port;       // 目标端口
    unsigned int sequence_num;      // 序列号
    unsigned int ack_num;           // 确认号
    unsigned char data_offset:4;    // 数据偏移
    unsigned char reserved:6;       // 保留字段
    unsigned char flags;            // 标志字段
    unsigned short window_size;     // 窗口大小
    unsigned short checksum;        // 校验和
    unsigned short urgent_pointer;  // 紧急指针
} tcp_header;
```

在这个结构中，`reserved` 字段被设置为 6 位。这个字段目前没有使用，但是被保留用于未来的扩展。在发送 TCP 包时，这个字段应该被设置为 0。如果接收方收到的 TCP 包中这个字段不为 0，那么这个包应该被忽略。

这是一个简单的例子，展示了如何设置和检查这个字段：

```cpp
tcp_header header;
header.reserved = 0; // 设置保留字段为 0

// 检查接收到的 TCP 包的保留字段
if (received_header.reserved != 0) {
    // 忽略这个包
}
```

这个例子中，我们首先创建了一个 `tcp_header` 结构的实例，并将 `reserved` 字段设置为 0。然后，当我们接收到一个 TCP 包时，我们检查 `reserved` 字段。如果这个字段不为 0，我们就忽略这个包。

### 标志位

TCP（传输控制协议）的头部中有一个字段被称为 "Flags"。这个字段的长度为 8 位，用于控制 TCP 连接的各种状态。每一位都代表一个特定的标志，包括 URG、ACK、PSH、RST、SYN 和 FIN。

- URG：紧急指针有效。当这个标志被设置时，表示 TCP 报文段中的紧急指针字段有效，用于告知接收端有紧急数据需要处理。
- ACK：确认序号有效。当这个标志被设置时，表示 TCP 报文段中的确认号字段有效，用于告知发送端已经接收到了哪些数据。
- PSH：接收方应该尽快将这个报文段交给应用层。当这个标志被设置时，表示 TCP 报文段中的数据应该尽快被接收端的应用层处理，而不是在缓冲区中等待。
- RST：重置连接。当这个标志被设置时，表示 TCP 连接出现错误，需要被重置。发送端收到带有 RST 标志的 TCP 报文段后，会立即关闭连接，丢弃缓冲区中的所有数据。
- SYN：同步序号，用于建立连接。当这个标志被设置时，表示 TCP 连接正在尝试建立。发送端和接收端会通过交换带有 SYN 标志的 TCP 报文段来同步序号，完成连接的建立。
- FIN：结束连接。当这个标志被设置时，表示 TCP 连接正在尝试关闭。发送端和接收端会通过交换带有 FIN 标志的 TCP 报文段来完成连接的关闭。

这是一个简单的例子，展示了如何设置和检查这个字段：

```cpp
tcp_header header;
header.flags = 0x02; // 设置 SYN 标志

// 检查接收到的 TCP 包的标志字段
if (received_header.flags & 0x01) {
    // 如果 FIN 标志被设置，结束连接
}
```

这个例子中，我们首先创建了一个 `tcp_header` 结构的实例，并将 `flags` 字段设置为 0x02，表示设置 SYN 标志。然后，当我们接收到一个 TCP 包时，我们检查 `flags` 字段。如果 FIN 标志被设置（即 flags & 0x01 不为 0），我们就结束连接。

### 窗口大小

TCP（传输控制协议）的头部中有一个字段被称为 "Window Size"。这个字段的长度为 16 位，用于控制 TCP 连接的流量控制。窗口大小字段表示的是接收方愿意接收的数据量，单位是字节。

在 TCP 连接中，发送方不能无限制地发送数据，而是需要根据接收方的窗口大小来发送。接收方通过窗口大小字段告诉发送方，它还能接收多少数据。发送方在发送数据时，需要确保未被确认的数据量不超过接收方的窗口大小。

这是 TCP 头部的一部分，其结构如下：

```cpp
typedef struct {
    unsigned short source_port;     // 源端口
    unsigned short dest_port;       // 目标端口
    unsigned int sequence_num;      // 序列号
    unsigned int ack_num;           // 确认号
    unsigned char data_offset:4;    // 数据偏移
    unsigned char reserved:6;       // 保留字段
    unsigned char flags;            // 标志字段
    unsigned short window_size;     // 窗口大小
    unsigned short checksum;        // 校验和
    unsigned short urgent_pointer;  // 紧急指针
} tcp_header;
```

在这个结构中，`window_size` 字段被设置为 16 位。这个字段表示的是接收方愿意接收的数据量。

这是一个简单的例子，展示了如何设置和检查这个字段：

```cpp
tcp_header header;
header.window_size = 1024; // 设置窗口大小为 1024 字节

// 检查接收到的 TCP 包的窗口大小字段
if (received_header.window_size < 1024) {
    // 如果窗口大小小于 1024 字节，减小发送速率
}
```

这个例子中，我们首先创建了一个 `tcp_header` 结构的实例，并将 `window_size` 字段设置为 1024，表示我们愿意接收的数据量为 1024 字节。然后，当我们接收到一个 TCP 包时，我们检查 `window_size` 字段。如果窗口大小小于 1024 字节，我们就减小发送速率，以防止发送的数据量超过接收方的处理能力。

### 校验和

TCP（传输控制协议）的头部中有一个字段被称为 "Checksum"。这个字段的长度为 16 位，用于检查 TCP 报文段在传输过程中是否出现错误。校验和字段是通过对整个 TCP 报文段（包括 TCP 头部和数据）进行计算得到的，接收方在接收到 TCP 报文段后，会重新计算校验和，然后与接收到的校验和进行比较，以检查报文段是否在传输过程中出现错误。

这是 TCP 头部的一部分，其结构如下：

```cpp
typedef struct {
    unsigned short source_port;     // 源端口
    unsigned short dest_port;       // 目标端口
    unsigned int sequence_num;      // 序列号
    unsigned int ack_num;           // 确认号
    unsigned char data_offset:4;    // 数据偏移
    unsigned char reserved:6;       // 保留字段
    unsigned char flags;            // 标志字段
    unsigned short window_size;     // 窗口大小
    unsigned short checksum;        // 校验和
    unsigned short urgent_pointer;  // 紧急指针
} tcp_header;
```

在这个结构中，`checksum` 字段被设置为 16 位。这个字段是通过对整个 TCP 报文段进行计算得到的。

这是一个简单的例子，展示了如何设置和检查这个字段：

```cpp
tcp_header header;
header.checksum = calculate_checksum(&header); // 计算并设置校验和

// 检查接收到的 TCP 包的校验和字段
if (received_header.checksum != calculate_checksum(&received_header)) {
    // 如果校验和不匹配，丢弃这个包
}
```

这个例子中，我们首先创建了一个 `tcp_header` 结构的实例，并通过 `calculate_checksum` 函数计算并设置 `checksum` 字段。然后，当我们接收到一个 TCP 包时，我们重新计算校验和，并与接收到的校验和进行比较。如果校验和不匹配，我们就丢弃这个包。

请注意，这个例子中的 `calculate_checksum` 函数是假设存在的，实际的校验和计算过程会涉及到对 TCP 头部和数据的处理，这个过程比较复杂，超出了这个例子的范围。

### 紧急指针

TCP（传输控制协议）的头部中有一个字段被称为 "Urgent Pointer"。这个字段的长度为 16 位，只有当 URG 标志位被设置时，这个字段才有效。紧急指针用于指示 TCP 报文段中的紧急数据的结束位置。

当 TCP 连接中的一方需要发送紧急数据时，可以设置 URG 标志，并通过紧急指针字段指示紧急数据的结束位置。接收方在接收到带有 URG 标志的 TCP 报文段后，会优先处理紧急数据。

这是 TCP 头部的一部分，其结构如下：

```cpp
typedef struct {
    unsigned short source_port;     // 源端口
    unsigned short dest_port;       // 目标端口
    unsigned int sequence_num;      // 序列号
    unsigned int ack_num;           // 确认号
    unsigned char data_offset:4;    // 数据偏移
    unsigned char reserved:6;       // 保留字段
    unsigned char flags;            // 标志字段
    unsigned short window_size;     // 窗口大小
    unsigned short checksum;        // 校验和
    unsigned short urgent_pointer;  // 紧急指针
} tcp_header;
```

在这个结构中，`urgent_pointer` 字段被设置为 16 位。这个字段用于指示紧急数据的结束位置。

这是一个简单的例子，展示了如何设置和检查这个字段：

```cpp
tcp_header header;
header.flags = 0x20; // 设置 URG 标志
header.urgent_pointer = 100; // 设置紧急指针为 100

// 检查接收到的 TCP 包的紧急指针字段
if (received_header.flags & 0x20) {
    // 如果 URG 标志被设置，优先处理前 100 字节的紧急数据
}
```

这个例子中，我们首先创建了一个 `tcp_header` 结构的实例，并将 `flags` 字段设置为 0x20，表示设置 URG 标志。然后，我们设置 `urgent_pointer` 字段为 100，表示紧急数据的结束位置为第 100 字节。当我们接收到一个 TCP 包时，我们检查 `flags` 字段。如果 URG 标志被设置（即 flags & 0x20 不为 0），我们就优先处理前 100 字节的紧急数据。

### Options

TCP（传输控制协议）的头部中有一个可选字段被称为 "Options"。这个字段的长度可以变化，用于提供 TCP 连接的额外功能。Options 字段可以包含多个选项，每个选项都有一个选项种类和选项长度。常见的 TCP 选项包括最大报文段长度（MSS）、窗口扩大因子（Window Scale）、时间戳（Timestamps）等。

- 最大报文段长度（MSS）：这个选项用于指定 TCP 报文段的最大长度。发送方在建立连接时，会通过这个选项告诉接收方它能接收的最大报文段长度。接收方在接收到这个选项后，会限制发送的报文段长度不超过这个值。

- 窗口扩大因子（Window Scale）：这个选项用于扩大窗口大小字段的范围。在早期的 TCP 协议中，窗口大小字段的长度为 16 位，最大值为 65535 字节。但随着网络速度的提高，这个值已经不能满足需求。通过窗口扩大因子选项，可以将窗口大小字段的最大值扩大到 1GB。

- 时间戳（Timestamps）：这个选项用于提供更精确的 RTT（往返时间）测量和保护对旧的重复报文段的接收。

这是一个简单的例子，展示了如何设置和检查这个字段：

```cpp
typedef struct {
    unsigned char kind; // 选项种类
    unsigned char length; // 选项长度
    unsigned char data[]; // 选项数据
} tcp_option;

typedef struct {
    unsigned short source_port;     // 源端口
    unsigned short dest_port;       // 目标端口
    unsigned int sequence_num;      // 序列号
    unsigned int ack_num;           // 确认号
    unsigned char data_offset:4;    // 数据偏移
    unsigned char reserved:6;       // 保留字段
    unsigned char flags;            // 标志字段
    unsigned short window_size;     // 窗口大小
    unsigned short checksum;        // 校验和
    unsigned short urgent_pointer;  // 紧急指针
    tcp_option options[];           // 选项字段
} tcp_header;

// 创建一个 MSS 选项
tcp_option mss_option;
mss_option.kind = 2; // MSS 选项的种类为 2
mss_option.length = 4; // MSS 选项的长度为 4
*((unsigned short*)mss_option.data) = htons(1460); // MSS 选项的数据为 1460，转换为网络字节序

// 将 MSS 选项添加到 TCP 头部
tcp_header header;
header.options[0] = mss_option;
```

这个例子中，我们首先创建了一个 `tcp_option` 结构的实例，并设置 `kind` 字段为 2，表示这是一个 MSS 选项。然后，我们设置 `length` 字段为 4，表示这个选项的长度为 4 字节。最后，我们设置 `data` 字段为 1460，表示我们能接收的最大报文段长度为 1460 字节。然后，我们将这个选项添加到 TCP 头部的 `options` 字段。

请注意，这个例子中的 `htons` 函数用于将主机字节序转换为网络字节序。在实际的网络编程中，我们需要确保所有的网络协议字段都使用网络字节序。

### Padding

TCP（传输控制协议）的头部中有一个字段被称为 "Padding"。这个字段的长度可以变化，用于确保 TCP 头部的总长度为 32 位的整数倍。Padding 字段的内容没有实际意义，通常被设置为 0。

在 TCP 协议中，头部的长度必须是 32 位（即 4 字节）的整数倍。这是因为 TCP 协议的设计者选择了 32 位作为基本的对齐单位，以便于在硬件层面上处理 TCP 报文段。但是，由于 Options 字段的长度可以变化，所以 TCP 头部的长度可能不是 32 位的整数倍。在这种情况下，就需要使用 Padding 字段来填充 TCP 头部，使其长度达到 32 位的整数倍。

这是一个简单的例子，展示了如何设置这个字段：

```cpp
typedef struct {
    unsigned short source_port;     // 源端口
    unsigned short dest_port;       // 目标端口
    unsigned int sequence_num;      // 序列号
    unsigned int ack_num;           // 确认号
    unsigned char data_offset:4;    // 数据偏移
    unsigned char reserved:6;       // 保留字段
    unsigned char flags;            // 标志字段
    unsigned short window_size;     // 窗口大小
    unsigned short checksum;        // 校验和
    unsigned short urgent_pointer;  // 紧急指针
    unsigned char options_and_padding[40]; // 选项和填充字段
} tcp_header;

// 创建一个 TCP 头部
tcp_header header;
memset(&header, 0, sizeof(header)); // 将整个头部初始化为 0

// 设置选项
header.options_and_padding[0] = 0x02; // 设置 MSS 选项的种类
header.options_and_padding[1] = 0x04; // 设置 MSS 选项的长度
*((unsigned short*)&header.options_and_padding[2]) = htons(1460); // 设置 MSS 选项的数据

// 剩余的部分会作为 Padding 字段，已经被初始化为 0
```

这个例子中，我们首先创建了一个 `tcp_header` 结构的实例，并将整个头部初始化为 0。然后，我们在 `options_and_padding` 字段中设置 MSS 选项。剩余的部分会作为 Padding 字段，已经被初始化为 0，所以我们不需要再进行任何操作。

### Data 

TCP（传输控制协议）的头部后面跟随的是 "Data" 字段。这个字段的长度可以变化，用于携带 TCP 连接中传输的实际数据。Data 字段的内容由应用程序决定，TCP 协议本身并不关心其内容。

在 TCP 连接中，发送方和接收方会交换数据。发送方将要发送的数据放入 Data 字段，然后将 TCP 报文段发送给接收方。接收方在接收到 TCP 报文段后，会从 Data 字段中取出数据，然后将其交给应用程序。

这是一个简单的例子，展示了如何设置和检查这个字段：

```cpp
typedef struct {
    unsigned short source_port;     // 源端口
    unsigned short dest_port;       // 目标端口
    unsigned int sequence_num;      // 序列号
    unsigned int ack_num;           // 确认号
    unsigned char data_offset:4;    // 数据偏移
    unsigned char reserved:6;       // 保留字段
    unsigned char flags;            // 标志字段
    unsigned short window_size;     // 窗口大小
    unsigned short checksum;        // 校验和
    unsigned short urgent_pointer;  // 紧急指针
    unsigned char options_and_padding[40]; // 选项和填充字段
    char data[];                    // 数据字段
} tcp_header;

// 创建一个 TCP 头部
tcp_header* header = (tcp_header*)malloc(sizeof(tcp_header) + 1024); // 分配足够的空间来存储数据

// 设置数据
strcpy(header->data, "Hello, world!"); // 将 "Hello, world!" 复制到数据字段
```

这个例子中，我们首先创建了一个 `tcp_header` 结构的实例，并分配了足够的空间来存储数据。然后，我们将 "Hello, world!" 复制到数据字段。

请注意，这个例子中的 `malloc` 函数用于动态分配内存。在实际的网络编程中，我们需要根据实际的数据大小来动态分配内存。
