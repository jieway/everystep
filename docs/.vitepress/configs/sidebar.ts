import type { DefaultTheme } from 'vitepress'
import { ALGARRAY, ALGLINKLIST, ALGTREE, HASHTABLE } from './sidebar/alg'
import { MODERNCPP, CPPSTL, CppCoreGuidelinesNotes, CPP, DESIGNPATTERN } from './sidebar/cpp'
import { ARYADB, SMARTPTR, CEMU } from './sidebar/buildx'
import { OSKERN, OSSTART, OSPROCESS, OSAPPENDIX } from './sidebar/os'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/': [
    {
      text: '🐷 使用现代 C++ 重写 LevelDB',
      items: ARYADB
    }
  ],

  '/alg/array/': [
    {
      text: '🦖 数组',
      items: [
        {
          items: ALGARRAY
        }
      ]
    }
  ],

  '/alg/linklist/': [
    {
      text: '🤖 链表',
      items: [
        {
          items: ALGLINKLIST
        }
      ]
    }
  ],

  '/alg/hash/': [
    {
      text: '👾 哈希 ',
      items: [
        {
          items: HASHTABLE
        }
      ]
    }
  ],

  '/alg/tree/': [
    {
      text: '树 🌲',
      items: [
        {
          items: ALGTREE
        }
      ]
    }
  ],

  '/os/start/': [
    {
      text: '启动篇',
      items: [
        {
          items: OSSTART
        }
      ]
    }
  ],

  '/os/kern/': [
    {
      text: '内核篇',
      items: [
        {
          items: OSKERN
        }
      ]
    }
  ],

  '/os/process/': [
    {
      text: '进程篇',
      items: [
        {
          items: OSPROCESS
        }
      ]
    }
  ],

  '/os/appendix/': [
    {
      text: '附录',
      items: [
        {
          items: OSAPPENDIX
        }
      ]
    }
  ],

  '/cpp/': [
    {
      text: 'C++ 总结',
      items: [
        {
          items: CPP
        }
      ]
    }
  ],

  '/cpp/modern/': [
    {
      text: '现代 C++',
      items: MODERNCPP
    }
  ],

  '/cpp/smartptr/': [
    {
      text: '🐻 从零实现智能指针',
      items: SMARTPTR
    }
  ],

  '/designpattern/': [
    {
      text: '设计模式',
      items: DESIGNPATTERN
    }
  ],

  '/crvemu/': [
    {
      text: '🍬 从零实现 RISC-V 模拟器',
      items: CEMU
    }
  ]
}
