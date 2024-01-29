# 热烈欢迎各位加入贡献

下面是如何运行项目和提出您的 PR（Pull Request）的教程。

## 贡献指引

您可以在 [github](https://github.com/weijiew/everystep) 页面上，先将代码库 fork 一份到自己的账户下，再基于您 fork 后的仓库提交 PR 给我们。

如果不打算在本地运行可以直接修改相关内容提交即可，忽略后续内容。

需要先装好 node 和 pnpm 。如果无法运行可能是 node 版本不对，这个仓库在 node 20 下面是可以运行的。

随后 clone 仓库，切记要把 submodule 也下载下来，否则无法运行！

```bash
git clone --recursive https://github.com/weijiew/everystep
```

或者如果您已经克隆了该仓库，可以使用：

```bash
git submodule update --init --recursive
```

## 运行

建议采用 pnpm 进行安装：

```bash
pnpm install
```

本地环境下的开发流程：

```bash
pnpm -C docs run docs:dev
```

## 文字排版规范

笔记内容应遵循 [中文文案排版指北](https://mazhuang.org/wiki/chinese-copywriting-guidelines/) 的标准进行排版，尤其是中英文之间的空格处理，您也可以使用 VSCode 的相关格式化工具来辅助排版。