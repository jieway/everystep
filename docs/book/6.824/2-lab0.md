# 6.824Spring 2020

http://nil.csail.mit.edu/6.824/2020/schedule.html

# 环境配置

http://nil.csail.mit.edu/6.824/2020/labs/lab-mr.html

第一个问题：

无法通过命令行下载：

![](image/2-lab0/1644730799365.png)

直接访问：https://dl.google.com/go/go1.13.6.linux-amd64.tar.gz 通过浏览器下载。

然后解压到指定位置 `sudo tar -C /usr/local -xzf go1.13.6.linux-amd64.tar.gz`

将 /usr/local/bin 放到 PATH 中，然后 source 生效。

检查是否安装成功：

```sh
$ go version
go version go1.13.6 linux/amd64
```

接下来下载代码

```sh
git clone git://g.csail.mit.edu/6.824-golabs-2020 6.824
```

```
$ cd ~/6.824
$ cd src/main
```

第二个问题

    $ go build -buildmode=plugin ../mrapps/wc.go
    unexpected directory layout:
            import path: _/mnt/e/Repo/6.824/src/mr
            root: /mnt/e/Repo/6.824/src
            dir: /mnt/e/Repo/6.824/src/mr
            expand root: /mnt/e/Repo/6.824
            expand dir: /mnt/e/Repo/6.824/src/mr
            separator: /

将 `../mrapps/wc.go` 中的 `import "../mr"` 改为 `import "mr"` 即可。

执行 `go run mrsequential.go wc.so pg*.txt` 同样会出现上面的问题，把相对路径改成绝对路径即可。

![](image/2-lab0/1644733007661.png)

执行了一个词频统计例子。

