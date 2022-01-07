# 0. 环境配置

# 安装 GO

[Setup Go](https://pdos.csail.mit.edu/6.824/labs/go.html)

命令行下载不下来，于是直接访问网页通过浏览器下载。

[virtual Box 设置共享文件夹](https://jingyan.baidu.com/article/d2b1d102cf998b5c7f37d442.html) 将文件传到虚拟机中。

手动安装 `sudo tar -C /usr/local -xzf go1.15.8.linux-amd64.tar.gz`

将 `export PATH=$PATH:/usr/local/go/bin` 写入 `.bashrc` 中：

```
$ vim ~/.bashrc 
$ source ~/.bashrc 
```

检查是否安装成功：

```
$ go version
go version go1.15.8 linux/amd64
```

如果在国内安装 GO 插件之前先换源。

GO 换源 `go env -w GOPROXY="https://goproxy.cn"` 不然打开 vscode 后一堆库无法加载。

安装 vscode 的 GO 插件。

将 GOPATH 路径设置为项目路径 `go env -w GOPATH="/mnt/e/Repo/6.824lab"` 我的路径是这个，你需要改成自己的路径！

GOPATH 直接设置为全局其实是不合适的，但是因为只有一个 GO 项目，索性就直接设置了。如果有两个项目 GOPATH 又分为局部和全局两种。局部只对当前项目有效，全局则是对所有项目。

可以通过 `$ go env` 查看参数设置。


