# LAB-1: Data Lab

## 1. 阅读

如果你是教师的话，先阅读这个 [README-datalab.txt](https://github.com/weijiew/CSAPP-Labs/blob/main/lab1/README-datalab.txt)，里面包含了整个 lab 是怎么制作的一些信息。

如果你是学生并且想直接做实验，阅读教师的指导会浪费时间，建议直接阅读这个内容：[datalab-handout/README](https://github.com/weijiew/CSAPP-Labs/blob/main/lab1/datalab-handout/README) 。

此时就已经知晓整个实验的流程，以及文件中一些工具的使用。

## 2. 阅读总结

总结：

1. `make btest` 编译
2. `./btest` 运行

## 3. 写题


## 3.1. bitXor

& 是按位与运算符，也就是两个 1 才是 1 ，其他都是 0 .

~ 是取反操作，也就是 NOT 0 变 1 ，1 变 0 。

```c
int bitXor(int x, int y) {
  return ~(~x&~y)&~(x&y);
}
```

德摩根律的应用。

## 3.2 tmin

求补码的最小值，补码最高位是符号位，0 表示正数，1 表示负数。

int 共 32 位，1 左移 31 位即为最大值。

首先第 32 位是 1 表示是负数，而后续位数不能出现 1 因为出现即意味这加法，这将会使得值变大。

```c
int tmin(void) {
  return 1 << 31;
}
```

## 3.3 isTmax

判断输入的 x 在补码下是否是最大值，如果是返回 1 反之返回 0 .




# 参考

1. [CSAPP 之 DataLab详解，没有比这更详细的了](https://zhuanlan.zhihu.com/p/59534845)

