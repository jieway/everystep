# Lab Checkpoint 0: networking warmup

# Networking by hand

输入如下内容，手动模拟访问浏览器的过程。

```
cs144@cs144vm:~/sponge$ telnet cs144.keithw.org http
Trying 104.196.238.229...
Connected to cs144.keithw.org.
Escape character is '^]'.
GET /hello HTTP/1.1
Host: cs144.keithw.org
Connection: close

HTTP/1.1 200 OK
Date: Thu, 06 Jan 2022 08:23:10 GMT
Server: Apache
Last-Modified: Thu, 13 Dec 2018 15:45:29 GMT
ETag: "e-57ce93446cb64"
Accept-Ranges: bytes
Content-Length: 14
Connection: close
Content-Type: text/plain

Hello, CS144!
Connection closed by foreign host.
```

# Writing webget

之前是手动访问，这里要求写成代码。

通过打印输出可知 

```cpp
void get_URL(const string &host, const string &path) {
    // Your code here.
    cout << "host:  " <<  host  <<  " path: " << path << endl;
    // host:  cs144.keithw.org path: /nph-hasher/xyzzy
```

* host 是 cs144.keithw.org 
* path 是 /nph-hasher/xyzzy

```cpp
    TCPSocket socket;
    string recv;
    socket.connect(Address(host , "http"));
    socket.write("GET " + path + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close \r\n\r\n");
    while(socket.eof() == false){
        socket.read(recv);
        cout << recv;
    }
    socket.close();
```

## An in-memory reliable byte stream

这个问题首先需要考虑数据结构怎样设计。阅读函数部分思路就出来了，满足要求即可！

* 肯定要用容器将数据存起来，选了 deque。

* 接下来看函数部分，因为 `bytes_written()` 函数的存在，需要表示写入总字节数，所以需要一个变量来存，即 `_bytes_written` 表示到目前为止所写入的字节数。

* 还要把初始化的 `ByteStream::ByteStream(const size_t capacity) {}` capacity 存下来，即 `_capacity` 表示当前队列容量上限。
* 因为函数 `bytes_read()` 返回的是读取的总字节数，所以还需要一个变量来存读取数量，即`_bytes_read` 表示读取字节数。
* `input_ended()` 的返回值表示输入是否结束，用变量 `_is_end_input` 来表示。

综上，设计出来的数据结构如下：

`libsponge\byte_stream.hh`
```cpp
  private:
    // Your code here -- add private members as necessary.
    std::deque<char> _buf{};
    size_t _capacity = 0;        // 队列当前容量
    size_t _bytes_written = 0;   // 写入长度
    size_t _bytes_read = 0;      // 读取长度
    bool _is_end_input = false;  // 写入结束
```

至于 `libsponge\byte_stream.cc` 按照要求填坑即可。

测试通过！

    cs144@cs144vm:~/sponge/build$ make check_lab0
    [100%] Testing Lab 0...
    Test project /home/cs144/sponge/build
        Start 26: t_byte_stream_construction
    1/9 Test #26: t_byte_stream_construction .......   Passed    0.00 sec
        Start 27: t_byte_stream_one_write
    2/9 Test #27: t_byte_stream_one_write ..........   Passed    0.00 sec
        Start 28: t_byte_stream_two_writes
    3/9 Test #28: t_byte_stream_two_writes .........   Passed    0.00 sec
        Start 29: t_byte_stream_capacity
    4/9 Test #29: t_byte_stream_capacity ...........   Passed    0.75 sec
        Start 30: t_byte_stream_many_writes
    5/9 Test #30: t_byte_stream_many_writes ........   Passed    0.01 sec
        Start 31: t_webget
    6/9 Test #31: t_webget .........................   Passed    1.78 sec
        Start 53: t_address_dt
    7/9 Test #53: t_address_dt .....................   Passed    0.03 sec
        Start 54: t_parser_dt
    8/9 Test #54: t_parser_dt ......................   Passed    0.00 sec
        Start 55: t_socket_dt
    9/9 Test #55: t_socket_dt ......................   Passed    0.01 sec

    100% tests passed, 0 tests failed out of 9

    Total Test time (real) =   2.59 sec
    [100%] Built target check_lab0

