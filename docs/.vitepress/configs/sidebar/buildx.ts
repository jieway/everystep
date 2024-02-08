import type { DefaultTheme } from 'vitepress'

export const ARYADB: DefaultTheme.NavItemWithLink[] = [
  { text: 'Summary', link: '/aryadb/README' },
  { text: 'Hello World', link: '/aryadb/1-create' },
  { text: 'Hash', link: '/aryadb/5-hash' },
  { text: 'Bloom Filter', link: '/aryadb/6-bloom' },
  { text: 'NoDestructor', link: '/aryadb/7-nodestructor' },
  { text: 'Log', link: '/aryadb/8-log' },
  { text: 'Write Bache', link: '/aryadb/9-write-bache' },
  { text: 'SkipList', link: '/aryadb/10-skiplist' },
  { text: 'MemTable', link: '/aryadb/11-memtable' },
  { text: 'Cache', link: '/aryadb/cache' }
]

export const LEVELDB: DefaultTheme.NavItemWithLink[] = [
  { text: 'Slice', link: '/leveldb/slice' },
  { text: 'Arean', link: '/leveldb/arean' },
  { text: 'Status', link: '/aryadb/status' }
]

export const CEMU: DefaultTheme.NavItemWithLink[] = [
  { text: '前言', link: '/crvemu/README' },
  { text: '最简 CPU', link: '/crvemu/v1-add' },
  { text: '内存和总线', link: '/crvemu/v2-mem' },
  { text: '指令解析', link: '/crvemu/v3-inst' }
]

export const SMARTPTR: DefaultTheme.NavItemWithLink[] = [
  { text: '智能指针', link: '/cpp/smartptr/masterptr' },
  { text: '实现 unique_ptr', link: '/cpp/smartptr/uniqueptr' },
  { text: '实现 share_ptr', link: '/cpp/smartptr/shareptr' }
]
