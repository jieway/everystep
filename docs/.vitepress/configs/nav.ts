import type { DefaultTheme } from 'vitepress'
import { VERSIONS } from './sidebar/other'
import { version } from '../../../package.json'

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '从零实现 🔥',
    items: [
      { text: '🍬 从零实现 RISC-V 模拟器', link: '/crvemu/README' },
      { text: '🐲 使用现代 C++ 重写 LevelDB', link: '/aryadb/README' },
      { text: '🐻 从零实现智能指针', link: '/cpp/smartptr/README' },
      { text: '🍼 从零实现Git', link: '/aryadb/README' }
    ]
  },
  {
    text: '算法 🦖',
    items: [
      { text: '数组', link: '/alg/array/README' },
      { text: '链表', link: '/alg/linklist/README' },
      { text: '哈希', link: '/alg/hash/README' },
      { text: '树', link: '/alg/tree/README' }
    ]
  },
  {
    text: '操作系统 🤖',
    items: [
      { text: '🐷 启动篇', link: '/os/start/README' },
      { text: '🐹 内核篇', link: '/os/kern/README' },
      { text: '🌱 进程篇', link: '/os/process/README' },
      { text: '🍼 附录', link: '/os/appendix/README' }
    ]
  },
  {
    text: 'C++ 总结 🍼',
    items: [
      { text: '🐷 C++ 基础', link: '/cpp/basic/README' },
      { text: '🐹 现代 C++', link: '/cpp/modern/README' },
      { text: '🌱 设计模式', link: '/designpattern/0-designpattern' }
    ]
  },
  {
    text: `v${version}`,
    items: VERSIONS
  }
]
