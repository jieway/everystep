# 概念
模块化：对代码进行分析，将可复用代码抽离成模块。

组件化：从 ui 角度分析，将可复用的 ui 元素分装成组件。

组件化的好处，随着项目的增大，可以把组简很方便的拼接。

React 都以 JS 来实现组简。

# 虚拟 DOM
* DOM ： 文档对象模型，浏览器提供。其实就是标签组成的一颗树。
* 虚拟 DOM： 框架提供的 DOM，本质是用 JS 对象的形式是用来模拟 DOM 树的。

页面元素需要更新时，部分元素是可以不改变的但是之前的方式是实现全部改变，损耗了渲染时的性能，而框架可以实现用 JS 对象来模拟 DOM 元素的嵌套关系来比对需要改变的元素，进行高效的渲染。

# diff 算法
为了实现高效的更新，就需要比对元素需要改变的部分，就是将需要改变的部分逐步细化，减少不必要的改变和。

比对分为三个级别： tree diff / components diff / element diff

* tree diff : 整体上比对新旧两颗 DOM 树的差异部分，像 <body> <head> 这样的整体比对。
* components diff : 比对组件类型的改变。类型相同就不需要改变。
* element diff： 组简类型相同就比对组简中的元素，看元素是否相同。

# webpack 项目 
webpack 基于 node 构建，语法也是 node 的项目。是一个工具，用于管理项目，打包项目。
约定 > 配置，为了减少配置的体积。
* 创建一个文件夹，不要命名为 webpack 与这个webpack 的工具名重复，后面会无法加载包。 
* 创建一个 `src` 文件和 `dist` 文件，前者存放源代码，后者存放打包好的文件。
* `npm init -y ` 快速初始化项目。
* 在 src 目录下床架 index.html main.js
* `npm install webpack -g` 下载这个包，如果终端提示找不到命令就全局安装。
* `npm i webpack-cli -D` 脚手架，自动打包，工具。
* index.js 默认的入口， dist 目录下的 main.js 是默认的输出。
* `npm i webpack-dev-server -D` 实时打包编译功能，也就是热重载。
* `npm i html-webpack-plugin -D`


# 参考
* [1] [bilibili](https://www.bilibili.com/video/BV11t411S7iG) 