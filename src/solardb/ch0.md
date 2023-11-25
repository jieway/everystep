# C++23 环境配置

使用 Ubuntu 20.04 作为开发环境，Windows 上推荐使用 WSL 。

## GCC 版本升级

在 ubuntu 20.04 上默认 GCC 版本比较低，需要升级到 GCC 11 ，这个版本的 GCC 支持 C++23 。

```sh
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install gcc-11
```

