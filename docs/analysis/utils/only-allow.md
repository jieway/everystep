# `only-allow` 源码阅读

[only-allow](https://github.com/pnpm/only-allow) 用于强制在项目中使用特定的包管理器

## `only-allow` 使用方式

在 `package.json` 中添加 `preinstall` 钩子，以 `npm` 为例

```json
{
  "scripts": {
    "preinstall": "npx only-allow npm"
  }
}
```

### `npm` 钩子说明

在 `npm` 脚本中有 `pre` 和 `post` 两个钩子

比如 `build` 脚本命令的钩子就是 `prebuild` 和 `postbuild`

```json
{
  "scripts": {
    "prebuild": "echo I run before the build script",
    "build": "vue-cli-service build",
    "postbuild": "echo I run after the build script"
  }
}
```

当用户执行 `npm run build` 时会按如下顺序执行

```sh
npm run prebuild && npm run build && npm run postbuild
```

#### 相关资料

[使用 npm 脚本钩子](https://github.com/maomao1996/daily-notes/issues/20)

## `only-allow` 源码笔记

::: tip 前置知识

- [which-pm-runs](https://github.com/zkochan/packages/tree/main/which-pm-runs) 用于获取当前所使用的包管理器名称和版本（[which-pm-runs 源码笔记](#which-pm-runs-源码笔记)）
- [boxen](https://github.com/sindresorhus/boxen) 用于终端输出美化：在终端中生成一个方框图案
- `process.argv` 属性返回的是一个数组，包含了启动 Node 进程时的命令行参数
  - 第一个元素是 process.execPath 即启动 Node 进程的可执行文件所在的绝对路径
  - 第二个元素是当前执行的 JavaScript 脚本的文件路径
  - 剩余的元素是在命令中传入的参数

:::

> **当前 `only-allow` 源码版本为 v1.1.1**

```js
#!/usr/bin/env node
// 用于获取当前所使用的包管理器名称和版本
const whichPMRuns = require('which-pm-runs')
// 终端输出美化：在终端中生成一个方框图案
const boxen = require('boxen')

// 通过 process.argv 获取传入的参数
const argv = process.argv.slice(2)

// 对参数进行校验，为空时提示可使用的包管理器 <npm|cnpm|pnpm|yarn> 并退出进程
if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|cnpm|pnpm|yarn>')
  process.exit(1)
}

// 获取指定使用的包管理器，如果不是 npm|cnpm|pnpm|yarn 其中之一时提示当前可用的包管理器并退出进程
const wantedPM = argv[0]
if (wantedPM !== 'npm' && wantedPM !== 'cnpm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(
    `"${wantedPM}" is not a valid package manager. Available package managers are: npm, cnpm, pnpm, or yarn.`
  )
  process.exit(1)
}

// 获取当前所使用的包管理器名称和版本
const usedPM = whichPMRuns()

console.log('process.env.npm_config_user_agent', process.env.npm_config_user_agent, usedPM)

// 获取 Node 进程当前工作的目录（即项目目录）
const cwd = process.env.INIT_CWD || process.cwd()

/**
 * 用于判断 only-allow 是否作为依赖项安装，保证只在运行项目依赖项安装时进行包管理器验证
 * https://github.com/pnpm/only-allow/issues/2
 */
const isInstalledAsDependency = cwd.includes('node_modules')

// 当前进程的使用的包管理器与指定包管理器不一致时，根据指定的包管理器弹出错误提示并退出进程
if (usedPM && usedPM.name !== wantedPM && !isInstalledAsDependency) {
  const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
  switch (wantedPM) {
    case 'npm':
      console.log(boxen('Use "npm install" for installation in this project', boxenOpts))
      break
    case 'cnpm':
      console.log(boxen('Use "cnpm install" for installation in this project', boxenOpts))
      break
    case 'pnpm':
      console.log(
        boxen(
          `Use "pnpm install" for installation in this project.
If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`,
          boxenOpts
        )
      )
      break
    case 'yarn':
      console.log(
        boxen(
          `Use "yarn" for installation in this project.
If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`,
          boxenOpts
        )
      )
      break
  }
  process.exit(1)
}
```

## `which-pm-runs` 源码笔记

[which-pm-runs](https://github.com/zkochan/packages/tree/main/which-pm-runs) 用于获取当前所使用的包管理器名称和版本

::: tip process.env.npm_config_user_agent

`process.env.npm_config_user_agent` 可以获取当前所使用的包管理器名称和版本，其格式如下

```sh
# npm
'npm/8.19.2 node/v18.11.0 darwin x64 workspaces/false'

# yarn
'yarn/1.22.11 npm/? node/v18.11.0 darwin x64'

# pnpm
'pnpm/7.12.1 npm/? node/v14.19.2 darwin x64'

# cnpm
'npminstall/6.6.2 npm/? node/v18.11.0 darwin x64'
```

:::

> **当前 `which-pm-runs` 源码版本为 v1.1.0**

```js
'use strict'

/**
 * 对 process.env.npm_config_user_agent 做字符串切割，最终返回一个对象
 * 以 'npm/8.19.2 node/v18.11.0 darwin x64 workspaces/false' 为例
 */
function pmFromUserAgent(userAgent) {
  // 获取 npm 相关信息 => 'npm/8.19.2'
  const pmSpec = userAgent.split(' ')[0]
  // 获取 '/' 最后一次出现的索引 => 3
  const separatorPos = pmSpec.lastIndexOf('/')
  // 提取 name
  const name = pmSpec.substring(0, separatorPos)
  return {
    // 对 cnpm 做兼容处理
    name: name === 'npminstall' ? 'cnpm' : name,
    // 提取 version
    version: pmSpec.substring(separatorPos + 1)
  }
}

module.exports = function () {
  // 当 process.env.npm_config_user_agent 不存在时返回 undefined
  if (!process.env.npm_config_user_agent) {
    return undefined
  }
  // 返回 pmFromUserAgent 函数处理的结果
  return pmFromUserAgent(process.env.npm_config_user_agent)
}
```
