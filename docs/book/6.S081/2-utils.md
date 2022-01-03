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

    == Test sleep, no arguments == sleep, no arguments: OK (10.3s) 
    == Test sleep, returns == sleep, returns: OK (1.7s) 
    == Test sleep, makes syscall == sleep, makes syscall: OK (0.9s) 


```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

int
main(int argc, char *argv[]) {
    int p2c[2], c2p[2];
    pipe(p2c); pipe(c2p);
    char buf[64];

    if (fork() > 0) {
        write(p2c[1], "ping", 4);
        read(c2p[0], buf, 4);
        printf("%d: received %s\n", getpid(), buf);
    }else {
        read(p2c[0], buf, 4);
        printf("%d: received %s\n", getpid(), buf);
        write(c2p[1], "pong", 4);
    }
    exit(0);
}
```

    $ ./grade-lab-util pingpong

    make: 'kernel/kernel' is up to date.
    == Test pingpong == pingpong: OK (1.4s)