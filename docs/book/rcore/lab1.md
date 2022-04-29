# 环境配置

直接下载别人配好的 docker 镜像：`docker pull dinghao188/rcore-tutorial`

本地下载代码，在本地编辑在 docker 中编译：

    git clone https://github.com/rcore-os/rCore-Tutorial-v3.git
    cd rCore-Tutorial-v3
    git checkout ch1

文件映射：

    docker run -it -v /mnt/e/rCore:/root dinghao188/rcore-tutorial:latest /bin/bash

