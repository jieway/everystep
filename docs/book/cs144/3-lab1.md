# Lab Checkpoint 1: stitching substrings into a byte stream

> 实现之前先阅读 lab1 的文档。

问题： 丢失、重新排序、更改或复制。

* lab1 需要将混乱的字节片段拼成一个顺序正确的字节流。
* lab2 需要实现 TCP 接收端的功能，TCPReceiver

数据通过 `StreamReassembler` 得到重组，然后输入 lab0 实现的 `ByteStream` 中。

蓝色部分被用户进程读入，绿色部分是已经存入 ByteStream ，红色部分则是由 StreamReassembler 进行重组的内容。而容量 (capacity) 则是红色加绿色。



    cs144@cs144vm:~/sponge/build$ make check_lab1
    [100%] Testing the stream reassembler...
    Test project /home/cs144/sponge/build
        Start 18: t_strm_reassem_single
    1/16 Test #18: t_strm_reassem_single ............   Passed    0.00 sec
        Start 19: t_strm_reassem_seq
    2/16 Test #19: t_strm_reassem_seq ...............   Passed    0.00 sec
        Start 20: t_strm_reassem_dup
    3/16 Test #20: t_strm_reassem_dup ...............   Passed    0.01 sec
        Start 21: t_strm_reassem_holes
    4/16 Test #21: t_strm_reassem_holes .............   Passed    0.00 sec
        Start 22: t_strm_reassem_many
    5/16 Test #22: t_strm_reassem_many ..............   Passed    0.11 sec
        Start 23: t_strm_reassem_overlapping
    6/16 Test #23: t_strm_reassem_overlapping .......   Passed    0.00 sec
        Start 24: t_strm_reassem_win
    7/16 Test #24: t_strm_reassem_win ...............   Passed    0.11 sec
        Start 25: t_strm_reassem_cap
    8/16 Test #25: t_strm_reassem_cap ...............   Passed    0.19 sec
        Start 26: t_byte_stream_construction
    9/16 Test #26: t_byte_stream_construction .......   Passed    0.00 sec
        Start 27: t_byte_stream_one_write
    10/16 Test #27: t_byte_stream_one_write ..........   Passed    0.00 sec
        Start 28: t_byte_stream_two_writes
    11/16 Test #28: t_byte_stream_two_writes .........   Passed    0.00 sec
        Start 29: t_byte_stream_capacity
    12/16 Test #29: t_byte_stream_capacity ...........   Passed    0.71 sec
        Start 30: t_byte_stream_many_writes
    13/16 Test #30: t_byte_stream_many_writes ........   Passed    0.01 sec
        Start 53: t_address_dt
    14/16 Test #53: t_address_dt .....................   Passed    0.04 sec
        Start 54: t_parser_dt
    15/16 Test #54: t_parser_dt ......................   Passed    0.00 sec
        Start 55: t_socket_dt
    16/16 Test #55: t_socket_dt ......................   Passed    0.00 sec

    100% tests passed, 0 tests failed out of 16

    Total Test time (real) =   1.21 sec
    [100%] Built target check_lab1