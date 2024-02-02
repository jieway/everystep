import type { DefaultTheme } from 'vitepress'
import { ALGARRAY, ALGLINKLIST, ALGTREE } from './sidebar/alg' 
import { MODERNCPP, CPPSTL, CppCoreGuidelinesNotes, CPP, DESIGNPATTERN } from './sidebar/cpp'
import { ARYADB, SMARTPTR } from './sidebar/buildx' 


export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/': [
    {
      text: '🐷 使用现代 C++ 重写 LevelDB',
      items: ARYADB,
    },
  ],
  '/alg/array/': [
    {
      text: '🦖 数组',
      items: [
        { text: '283. 移动零', link: '/alg/array/lc-283' },
        { text: '27. 移除元素', link: '/alg/array/lc-27' },
        { text: '977. 有序数组的平方', link: '/alg/array/lc-977' },
        { text: '二分查找', link: '/alg/array/lc-704' },
        { text: '螺旋矩阵', link: '/alg/array/lc-59' },
        { text: '螺旋矩阵进阶', link: '/alg/array/lc-54' },
      ],
    },
  ],


  '/alg/linklist/': [
    {
      text: '🦖 链表',
      items: [
        {
          items: ALGLINKLIST,
        },
      ],
    },
  ],

  '/alg/tree/': [
    {
      text: '树 🌲',
      items: [
        {
          items: ALGTREE,
        },
      ],
    },
  ],

  '/cpp/': [
    {
      text: 'C++ 总结',
      items: [
        {
          items: CPP,
        },
      ],
    },
  ],  

  '/cpp/modern/': [
    {
      text: '现代 C++',
      items: MODERNCPP,
    },
  ],        

  '/cpp/smartptr/': [
    {
      text: '🐻 从零实现智能指针',
      items: SMARTPTR,
    },
  ],        

  '/designpattern/': [
    {
      text: '设计模式',
      items: DESIGNPATTERN,
    },
  ],        
}
