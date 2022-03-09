# Lab util

熟悉 xv6 及其系统调用。

https://pdos.csail.mit.edu/6.828/2020/labs/util.html

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

    $ sleep 2 

argc = 2
argv[0] = sleep
argv[1] = 2


## pingpong (easy)

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

## primes (moderate)/(hard)

```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"

void prime(int rd){
    int n;
    read(rd, &n, 4);
    printf("prime %d\n", n);
    int created = 0;
    int p[2];
    int num;
    while(read(rd, &num, 4) != 0){
        if(created == 0){
            pipe(p);
            created = 1;
            int pid = fork();
            if(pid == 0){
                close(p[1]);
                prime(p[0]);
                return;
            }else{
                close(p[0]);
            }
        }
        if(num % n != 0){
            write(p[1], &num, 4);
        }
    }
    close(rd);
    close(p[1]);
    wait(0);
}

int
main(int argc, char *argv[]){
    int p[2];
    pipe(p);
    // 父进程
    if(fork() != 0){
        close(p[0]);
        for(int i = 2; i <= 35; i++){
            // 第一个参数是文件描述符
            // 第二个参数是数据的指针
            // 第三个参数是要写入的字节数
            write(p[1], &i, 4);
        }
        close(p[1]);
        wait(0);
    }else{
        // 子进程
        close(p[1]);
        prime(p[0]);
        close(p[0]);
    }
    exit(0);
}
```

## find (moderate

照着 ls.c 改就行了。

```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"
#include "kernel/fs.h"

char* fmtname(char * path)
{
    static char buf[DIRSIZ+1];
    char *p;
    
    for (p = path + strlen(path); p >= path && *p != '/'; p--);
    p ++;
    if (strlen(p) >= DIRSIZ) return p;
    memmove(buf, p, strlen(p));
    buf[strlen(p)] = 0;
    return buf;
}

void
find(char *path,char *name)
{
  char buf[512], *p;
  int fd;
  struct dirent de;
  struct stat st;

  if((fd = open(path, 0)) < 0){
    fprintf(2, "ls: cannot open %s\n", path);
    return;
  }

  if(fstat(fd, &st) < 0){
    fprintf(2, "ls: cannot stat %s\n", path);
    close(fd);
    return;
  }

  switch(st.type){
  case T_FILE:
    if (strcmp(fmtname(path), name) == 0) printf("%s\n", path);
    break;

  case T_DIR:
    if(strlen(path) + 1 + DIRSIZ + 1 > sizeof buf){
      printf("ls: path too long\n");
      break;
    }
    strcpy(buf, path);
    p = buf+strlen(buf);
    *p++ = '/';
    while(read(fd, &de, sizeof(de)) == sizeof(de)){
      if(de.inum == 0)
        continue;
      memmove(p, de.name, DIRSIZ);
      p[DIRSIZ] = 0;
      // 忽略当前目录和父目录
      if (!strcmp(de.name, ".") || !strcmp(de.name, "..")) continue;
      find(buf, name);
    }
    break;
  }
  close(fd);
}

int
main(int argc, char *argv[])
{
    if (argc != 3) {
        fprintf(2, "usage: find [path] [patten]\n");
        exit(1);
    }
    find(argv[1], argv[2]);
    exit(0);
}
```

## xargs (moderate)

```
$ echo hello | xargs echo aa aaa aaa
aa aaa aaa hello

argv[0]: xargs
argv[1]: echo
argv[2]: aa
argv[3]: aaa
argv[4]: aaa    
```

```cpp
#include "kernel/types.h"
#include "kernel/stat.h"
#include "user/user.h"


int
main(int argc, char *argv[]) {
    if(argc < 2) {
        printf("Usage: xargs [command]\n");
        exit(-1);
    }
    // 拿到当前进程的标准化输入
    char buf[16];
    read(0, buf, 16);

    // 构造完整参数
    char *xargv[16];
    int xargc = 0;
    for (int i = 1; i < argc; i++) {
        xargv[xargc++] = argv[i];
    }

    // 遍历标准输入
    char *p = buf;
    for (int i = 0; i < 16; i++) {
        if (buf[i] == '\n') {
            if (fork() > 0) {
                p = &buf[i + 1];
                wait(0);
            }else {
                // 把标准输入放入指定位置
                buf[i] = 0;
                xargv[xargc] = p; 
                xargc++;
                xargv[xargc] = 0;
                xargc++;

                exec(xargv[0] , xargv);
                exit(0);
            }
        }
    }
    wait(0);
    exit(0);
}
```

```
$ ./grade-lab-util
make: 'kernel/kernel' is up to date.
== Test sleep, no arguments == sleep, no arguments: OK (2.8s)
== Test sleep, returns == sleep, returns: OK (0.8s)
== Test sleep, makes syscall == sleep, makes syscall: OK (0.8s)
== Test pingpong == pingpong: OK (1.1s)
== Test primes == primes: OK (0.9s)
== Test find, in current directory == find, in current directory: OK (1.0s)
== Test find, recursive == find, recursive: OK (1.1s)
== Test xargs == xargs: OK (1.1s)
== Test time ==
time: OK
Score: 100/100
```