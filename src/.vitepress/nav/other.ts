import type { DefaultTheme } from 'vitepress'
import { version } from '../../../package.json'

export const VERSIONS: DefaultTheme.NavItemWithLink[] = [
    { text: `v${version} (current)`, link: '/' },
    { text: `🔥 更新日志`, link: '/other/update' },
    { text: `🍬 参与贡献`, link: '/other/contributing' },
  ]