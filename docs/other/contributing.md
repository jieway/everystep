# 热烈欢迎各位加入贡献

下面是如何运行项目和提出您的 PR（Pull Request）的教程。

## 贡献指引

您可以在 [github](https://github.com/weijiew/everystep) 页面上，先将代码库 fork 一份到自己的账户下，再基于您 fork 后的仓库提交 PR 给我们。

```bash
git clone https://github.com/weijiew/everystep
```

如果不打算在本地运行可以直接修改相关内容提交即可，走 CI/CD 会自动更新，后续内容可忽略。

## 本地运行

需要先装好 node 和 pnpm 。如果无法运行可能是 node 版本不对，这个仓库在 node 18 下面是可以运行的。

建议采用 pnpm 进行安装并运行：

```bash
pnpm install && pnpm run dev
```

## 文字排版规范

笔记内容应遵循 [中文文案排版指北](https://mazhuang.org/wiki/chinese-copywriting-guidelines/) 的标准进行排版，尤其是中英文之间的空格处理，您也可以使用 VSCode 的相关格式化工具来辅助排版。
