# Part 4 Bench Mark

## 1. 什么是 benchmark ？

## 2. 研究 leveldb 的 benchmark

- fillseq: 按顺序写入N个key-value 
- fillrandom: 随机顺序写入N个key-value
- overwrite: 随机覆盖写入N个已存在的key-value
- fillsync: 同步模式随机写入N/100个key-value
- fill100K: 异步模式随机写入N/1000个值大小为100K的key-value
- deleteseq: 按顺序删除N个key
- deleterandom: 随机顺序删除N个key
- readseq: 按顺序读取N次
- readreverse: 逆序读取N次
- readrandom: 随机顺序读取N次
- readmissing: 读取N个不存在的key
- readhot: 从DB的1%热点区域随机读取N次
- seekrandom: N次随机seek
- seekordered: N次有序seek
- open: 计算打开一个DB的耗时
- crc32c: 对4K数据计算crc32c校验N次
- compact: 压缩整个DB
- stats: 打印DB统计信息
- sstables: 打印sstables信息
- heapprofile: 打印heap profiling (如果supported)

## 3. 如何使用 Go 来实现 benchmark ？


