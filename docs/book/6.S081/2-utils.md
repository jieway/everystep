# Lab: Xv6 and Unix utilities

熟悉 xv6 及其系统调用。

## sleep (easy)

在 xv6 中实现 Unix 中的 sleep 命令。

```cpp
int
main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(2, "input error!\n");
        exit(1);
    }else {
        int k = atoi(argv[1]);
        sleep(k);
    }
    exit(0);
}
```

* 关于 `int main(int argc, char *argv[]) `

argc 是 argument count 的缩写，表示参数个数。 
*argv[] 是 argument vector 的缩写。一个位置存了一个参数。
例如 echo b 以共有两个参数，那么 argc 就是 2 ，argv[0] = echo, argv[1] = b 。

* atoi 表示 ascii 转整数。

    == Test sleep, no arguments == sleep, no arguments: OK (10.3s) 
    == Test sleep, returns == sleep, returns: OK (1.7s) 
    == Test sleep, makes syscall == sleep, makes syscall: OK (0.9s) 

