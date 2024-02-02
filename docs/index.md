---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: "everystep"
  text: "Learn by doing!"
  tagline: 从零构建编译器、数据库、操作系统、模拟器、链接器
  image:
    src: /logo.png
    alt: everystep
  actions:
    - theme: brand
      text: Get Started
      link: /aryadb/README
  # actions:
  #   - text: 前端物语
  #     link: /fe/es6/
  #   - text: 前端导航
  #     link: /nav
  #     theme: alt

features:
  - title: 从零实现 RPC
    icon: 🍼
    details: 从基础开始，一步步构建自己的 RPC 框架。
  - title: 从零实现 WebServer
    icon: 😈
    details: 从基础开始，一步步构建自己的 Web 服务器。
  - title: 从零实现编译器(TODO)
    icon: 🐹
    details: 探索编译器的核心原理，从词法分析到语法解析，再到代码生成。
  - title: 从零实现 OS (TODO)
    icon: 🐷
    details: 详细介绍操作系统的设计与实现。包括进程管理、内存管理、文件系统等核心概念。
  - title: 从零实现数据库(TODO)
    icon: 🚀
    details: 从基础的数据存储到复杂的查询优化，深入浅出地讲解数据库的内部结构和工作原理，最终实现一个数据库。
  - title: 从零实现模拟器(TODO)
    icon: 🐲
    details: 揭秘模拟器的开发过程，包括硬件仿真、指令集实现等关键技术。

# - icon: 📖
#     title: C++ 知识点
#     details: 结合具体的例子讲解 C++ 常用知识点<small>（面试八股文）</small><br />
#     link: /fe/javascript/types
#     linkText: C++ 常用知识
#   - icon: 📘
#     title: 源码阅读
#     details: 了解各种库的实现原理<br />学习其中的小技巧和冷知识
#     link: /analysis/utils/only-allow
#     linkText: 源码阅读
#   - icon: 💡
#     title: Workflow
#     details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
#     link: /workflow/utils/library
#     linkText: 常用工具库
#   - icon: 🧰
#     title: 提效工具
#     details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
#     link: /efficiency/online-tools
#     linkText: 提效工具
#   - icon: 🐞
#     title: 踩坑记录
#     details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
#     link: /pit/npm
#     linkText: 踩坑记录
#   - icon: 💯
#     title: 吾志所向，一往无前。
#     details: '<small class="bottom-small">一个想躺平的小开发</small>'
#     link: /mao
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>

<!-- // > 🧊 上述内容如果存在问题可以去 github.com/weijiew/everystep 下面提 issue ，记录所学，感谢指正。
// > 
// > 🐻 致力于从零实现操作系统、数据库、编译器。热爱开源，欢迎Star。 -->