// 文件：navItems.ts
import type { DefaultTheme } from 'vitepress'

export const OSSTART: DefaultTheme.NavItemWithLink[] = [
  { text: 'OS 启动之 BIOS', link: '/os/start/bios' },
  { text: 'OS 启动 Boot Loader 汇编实现细节', link: '/os/start/boot-loader' },
  { text: 'OS 启动 Boot Loader C语言实现细节', link: '/os/start/boot-main' },
  { text: 'OS 内存地址空间的演化历程', link: '/os/start/pc-address' },
  { text: 'OS 实模式、保护模式', link: '/os/start/real-mold' },
  { text: 'OS 分段、分页', link: '/os/start/seg-page' }
]

export const OSKERN: DefaultTheme.NavItemWithLink[] = [
  { text: 'OS 内核入口实现细节', link: '/os/kern/os-asm' },
  { text: 'OS 内核内存、堆栈布局', link: '/os/kern/os-stack' },
  { text: 'OS 物理页面管理', link: '/os/kern/phy-manage' },
  { text: 'OS 如何建立虚拟内存映射？', link: '/os/kern/vir-mem' },
  { text: 'OS 内核空间映射细节', link: '/os/kern/map' }
]

export const OSPROCESS: DefaultTheme.NavItemWithLink[] = [
  { text: 'OS 进程内部的实现细节？', link: '/os/process/process-mem' },
  { text: 'OS 如何将程序加载到虚拟内存中并执行？', link: '/os/process/process-load' },
  { text: 'OS 中断和异常', link: '/os/process/trap' }
]

export const OSAPPENDIX: DefaultTheme.NavItemWithLink[] = [
  { text: 'MIT 6.828 JOS 2018 环境配置', link: '/os/appendix/README' }
]
