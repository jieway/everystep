记录这门课程的学习过程。算是实验报告，详细过程加个人理解，仅供参考。

## Ubuntu 安装

## git 安装
```git
sudo apt install git
```
## 下载实验源码

将远程库下载代码下载到本地。
```bash
git clone https://github.com/chyyuu/ucore_lab.git
```
## 安装vim

强大的编辑器，配置一下便于使用。
可以用 ls -l 命令查看，如果没有这个文件就创建一个。

```shell
~/.vimrc
```

按 i 插入，将一下配置贴入。 
命令 :wq 保存文件。
```
set nocompatible
set encoding=utf-8
set fileencodings=utf-8,chinese
set tabstop=4
set cindent shiftwidth=4
set backspace=indent,eol,start
autocmd Filetype c set omnifunc=ccomplete#Complete
autocmd Filetype cpp set omnifunc=cppcomplete#Complete
set incsearch
set number
set display=lastline
set ignorecase
syntax on
set nobackup
set ruler
set showcmd
set smartindent
set hlsearch
set cmdheight=1
set laststatus=2
set shortmess=atI
set formatoptions=tcrqn
set autoindent  
```

## 安装 gcc 的编译环境

```shell 
sudo apt-get install build-essential
```
## 1.0 QEMU 安装
QEMU 用于模拟 x86 计算机，使 ucore 操作系统正常运转。

```shell
sudo apt-get install qemu-system
```
## 2.0 下载libsdl1.2-dev

```shell
sudo apt-get install libsdl1.2-dev 
```
