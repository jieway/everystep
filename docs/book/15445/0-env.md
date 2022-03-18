# 15-445 fall 2021 环境搭建

课程主页：https://15445.courses.cs.cmu.edu/fall2021/

schedule：https://15445.courses.cs.cmu.edu/fall2021/schedule.html

[Gradescope Entry Code: 4PR8G5](https://www.gradescope.com/)

我在 Win11 下装了一个 Docker ，并且在支持 WSL2 中使用。

也就是在 WSL2 中使用 docke 来编译代码。

    git clone https://github.com/cmu-db/bustub
    cd bustub

建议直接在 WSL2 下 clone ，不要再 win 下 clone 。因为可能造成所有拉下的源码全是 CRLF 的结尾符，而 Linux 只认 LF 进而导致编译无法通过，可以使用 dos2unix来转换。

关于 docker 相关内容可以阅读[《Docker 技术入门与实战》](https://yeasy.gitbook.io/docker_practice/) 。

接下来是拉取 docker 镜像并构建 docker 容器。

首先根据当前目录下的 DockerFile 文件构建 docker 镜像。

    $ docker build . -t bustub

其中 [docker build](https://docs.docker.com/engine/reference/commandline/build/)表示构建一个镜像。而 . 表示当前目录，而 `-t bustub` 表示 tag 是 bustub 。需要等待一会，如果在国内的话会卡住。原因是没有换源。需要修改 DockerFile ，变更后内容如下：

```
FROM ubuntu:18.04
CMD bash

RUN  sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN  apt-get clean
RUN apt-get update

# Install Ubuntu packages.
# Please add packages in alphabetical order.
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update && \
    apt-get -y install \
      build-essential \
      clang-8 \
      clang-format-8 \
      clang-tidy-8 \
      cmake \
      doxygen \
      git \
      g++-7 \
      pkg-config \
      valgrind \
      zlib1g-dev
```

重新执行该命令：

    $ docker build . -t bustub

然后是创建容器：

    $ docker create -t -i --name bustub -v $(pwd):/bustub bustub bash

具体参数意思：

1. 其中 -t 表示创建一个伪终端。
2. -i 是 interactive 的缩写，表示交互式输入。
3. `--name bustub` 表示容器的名字是 bustub 。
4. `-v $(pwd):/bustub bustub` 表示将当前目录映射至容器 `/bustub` 下。
5. `bash` 表示终端以 bash 打开。

然后进入容器中：

    $ docker start -a -i bustub

接下来是在容器中操作，首先是进入 bustub 文件中然后构建 cmake 并编译：

    # cd bustub/
    # build_support/packages.sh
    # mkdir build
    #  cd build
    # cmake ..
    # make -j8

输入 `exit` 退出终端。

    docker container run -it -v /mnt/e/Repo/bustub:/bustub --name=bustub_env bustub /bin/bash

通过 `docker ps -a` 找到容器 bustub_env 对应的 id 

然后 `docker start <容器 id>` 

最后 `docker exec -it <容器 id> /bin/bash` 进入。

# 参考

1. [CMU数据库（15-445）Lab0-环境搭建](https://zhuanlan.zhihu.com/p/344374108)
2.  https://www.ravenxrz.ink/categories/CMU15445/
