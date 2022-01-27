# Lab 2: Advanced C and Valgrind

前两个练习是照着阅读就好了。

记得在 `Makefile` 文件中写好对应命令。

```
bit_ops:
	$(CC) -o bit_ops bit_ops.c test_bit_ops.c

vector:
	$(CC) -o vector vector.c test_vector.c
```

## Exercise 3: Bit Operations

建议先阅读测试代码 `test_bit_ops.c: main`

其中 `test_get_bit(0b1001110,5,0);` 表示第五个位置的是零。

拿到第 n 个位置的值。

```cpp
unsigned get_bit(unsigned x, unsigned n) {
    /* YOUR CODE HERE */
    return  (x >> n) & 1; /* UPDATE WITH THE CORRECT RETURN VALUE*/
}
```

将第 n 个位置的值设置为 v ，因为 v 要么是 0，要么是 1 ，所以分两种情况：

* n 是 1 的时候，构造一个类似 `···000000100000000····` 的序列， 1 出现在第 n 个位置。
  *  x = ···111000000000000····
  *  a = ···000000100000000····
  * x|a= ···111000100000000····

* n 是 0 的是，构造一个类似`···111111011111111····` 的序列， 0 出现在第 n 个位置。
  *  x = ···111000100000000····
  *  a = ···111111011111111····
  * x&a= ···111000100000000····

```cpp
/* Set the nth bit of the value of x to v. Assumes 0 <= N <= 31, and V is 0 or 1 */
void set_bit(unsigned *x, unsigned n, unsigned v) {
    /* YOUR CODE HERE */
    if (v == 1) {
        *x |= (1 << n);
    }else {
        *x &= (0xffffffffU) - (1 << n);
    }

}
```

异或即可。

```cpp
/* Flips the Nth bit in X. Assumes 0 <= N <= 31.*/
void flip_bit(unsigned *x, unsigned n) {
    /* YOUR CODE HERE */
    *x ^= (1 << n);
}
```

![image](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.4fn5vgkmle00.webp)

## Exercise 4: Memory Management

按照提示填就行了。

![image](https://cdn.jsdelivr.net/gh/weijiew/pic@master/images/image.30i2zuefxk40.webp)