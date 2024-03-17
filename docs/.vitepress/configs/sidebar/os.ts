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
  { text: 'OS backtrace 实现细节', link: '/os/kern/back-trace' },
  { text: 'OS 物理页面管理', link: '/os/kern/phy-manage' },
  { text: 'OS 如何建立虚拟内存映射？', link: '/os/kern/vir-mem' },
  { text: 'OS 内核空间映射细节', link: '/os/kern/map' }
]

export const OSUSER: DefaultTheme.NavItemWithLink[] = [
  { text: 'OS 进程内部的实现细节', link: '/os/user/process-mem' },
  { text: 'OS 如何将程序加载到虚拟内存中并执行', link: '/os/user/process-load' },
  { text: 'OS 什么是中断和异常？', link: '/os/user/trap-theory' },
  { text: 'OS 用户态和内核态之间的切换细节', link: '/os/user/uk-trans' },
  { text: 'OS 中断和异常实现细节', link: '/os/user/trap-impl' },
  { text: 'OS 页面错误实现细节', link: '/os/user/page-fault' },
  { text: 'OS 断点异常实现细节', link: '/os/user/break-point' },
  { text: 'OS 系统调用实现细节', link: '/os/user/system-call' }
]

export const OSMULT: DefaultTheme.NavItemWithLink[] = [
  { text: '多核 OS 初始化细节', link: '/os/mult/apic-intro' },
  { text: '多处理器内核栈和环境初始化实现细节', link: '/os/mult/ap-init' },
  { text: '多核 OS AP 启动细节', link: '/os/mult/ap-start' },
  { text: 'OS 自旋锁实现细节', link: '/os/mult/spin-lock' },
  { text: 'OS 循环调度实现细节', link: '/os/mult/round-robin' },
  { text: 'OS COW Fork 原理图解', link: '/os/mult/fork-intro' },
  { text: 'COW Fork 页面错误实现细节', link: '/os/mult/cow-fork-pagefalt' },
  { text: 'COW Fork 创建进程实现细节', link: '/os/mult/cow-fork-init' },
  { text: 'OS 时钟中断实现细节', link: '/os/mult/os-irq' },
  { text: 'OS IPC 进程通信实现细节', link: '/os/mult/os-ipc' }
]

export const OSFILE: DefaultTheme.NavItemWithLink[] = [
  { text: '多核 OS 初始化细节', link: '/os/file/file' },
  { text: 'OS 时钟中断实现细节', link: '/os/mult/os-irq' },
  { text: 'OS IPC 进程通信实现细节', link: '/os/mult/os-ipc' }
]

export const OSAPPENDIX: DefaultTheme.NavItemWithLink[] = [
  { text: 'MIT 6.828 JOS 2018 环境配置', link: '/os/appendix/README' }
]
