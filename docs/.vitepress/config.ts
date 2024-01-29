import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoSlash } from 'shikiji-twoslash'
import { bundledThemes } from 'shikiji'
import { version } from '../../package.json'
import vite from './vite.config'
import { rendererFloatingVue } from './render-floating-vue'

import { MODERNCPP, CPPSTL, CppCoreGuidelinesNotes, CPP, DESIGNPATTERN } from './nav/cpp'
import { ALGARRAY, ALGLINKLIST, ALGTREE } from './nav/alg' 
import { ARYADB, SMARTPTR } from './nav/buildx' 
import { VERSIONS } from './nav/other' 

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'everystep',
  description: 'Learn by doing!',
  outDir: '../public',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    async shikijiSetup(shikiji) {
      await Promise.all(Object.keys(bundledThemes).map(async (theme) => {
        await shikiji.loadTheme(theme as any)
      }))
    },
    codeTransformers: [
      transformerTwoSlash({
        explicitTrigger: true,
        renderer: rendererFloatingVue,
      }),
      // HAST treat `template` element specially and ignore its children
      // We need to render it as `vue-template` and use postprocess to replace it back
      {
        postprocess(code) {
          return code
            .replace(/(<\/?)vue-template/g, '$1template')
        },
      },
      {
        // Render custom themes with codeblocks
        name: 'shikiji:inline-theme',
        preprocess(code, options) {
          const reg = /\btheme:([\w,-]+)\b/
          const match = options.meta?.__raw?.match(reg)
          if (!match?.[1])
            return
          const theme = match[1]
          const themes = theme.split(',').map(i => i.trim())
          if (!themes.length)
            return
          if (themes.length === 1) {
            // @ts-expect-error anyway
            delete options.themes
            // @ts-expect-error anyway
            options.theme = themes[0]
          }
          else if (themes.length === 2) {
            // @ts-expect-error anyway
            delete options.theme
            // @ts-expect-error anyway
            options.themes = {
              light: themes[0],
              dark: themes[1],
            }
          }
          else {
            throw new Error(`Only 1 or 2 themes are supported, got ${themes.length}`)
          }
          return code
        },
      },
      {
        name: 'shikiji:vitepress-patch',
        preprocess(_, options) {
          const cleanup = options.transformers?.find(i => i.name === 'vitepress:clean-up')
          if (cleanup)
            options.transformers?.splice(options.transformers.indexOf(cleanup), 1)

          // Disable v-pre for twoslash, because we need render it with FloatingVue
          if (options.meta?.__raw?.includes('twoslash')) {
            const vPre = options.transformers?.find(i => i.name === 'vitepress:v-pre')
            if (vPre)
              options.transformers?.splice(options.transformers.indexOf(vPre), 1)
          }
        },
      },
      {
        name: 'shikiji:remove-escape',
        postprocess(code) {
          return code.replace(/\[\\\!code/g, '[!code')
        },
      },
    ],
  },

  cleanUrls: true,
  vite,

  locales: {
    root: { label: '简体中文', lang: 'zh-CN' },
  },


  themeConfig: {
    logo: '/logo.svg',
    outline: 'deep',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '返回顶部',
    outlineTitle: '导航栏',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '归档',
    lastUpdatedText: '最后一次更新于',
    nav: [
      {
        text: '从零实现',
        items: [
          { text: '🐲 使用现代 C++ 重写 LevelDB', link: '/aryadb/README' },
          { text: '🐻 从零实现智能指针', link: '/cpp/smartptr/README' },
          { text: '🍼 从零实现Git', link: '/aryadb/README' },
          { text: '🍬 从零实现 malloc、free', link: '/aryadb/README' },
        ],
      },
      {
        text: '🦖 算法',
        items: [
          { text: '数组', link: '/alg/array/README' },
          { text: '链表', link: '/alg/linklist/README' },
          { text: '树', link: '/alg/tree/README' },
        ],
      },
      {
        text: 'C++ 总结',
        items: [
          { text: '🐷 C++ 基础', link: '/cpp/basic/README' },
          { text: '🐹 现代 C++', link: '/cpp/modern/README' },
          { text: '🌱 设计模式', link: '/designpattern/0-designpattern' },
        ],
      },
      {
        text: `v${version}`,
        items: VERSIONS,
      },
    ],

    sidebar: Object.assign(
      {},
      {

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
              {
                items: ALGARRAY,
              },
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

      },
    ),

    editLink: {
      pattern: 'https://github.com/weijiew/everystep/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/weijiew/everystep' },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="20" height="20"  viewBox="0 0 512 512" >
        <path fill="currentColor" d="M488.6 104.1c16.7 18.1 24.4 39.7 23.3 65.7v202.4c-.4 26.4-9.2 48.1-26.5 65.1c-17.2 17-39.1 25.9-65.5 26.7H92.02c-26.45-.8-48.21-9.8-65.28-27.2C9.682 419.4.767 396.5 0 368.2V169.8c.767-26 9.682-47.6 26.74-65.7C43.81 87.75 65.57 78.77 92.02 78h29.38L96.05 52.19c-5.75-5.73-8.63-13-8.63-21.79c0-8.8 2.88-16.06 8.63-21.797C101.8 2.868 109.1 0 117.9 0s16.1 2.868 21.9 8.603L213.1 78h88l74.5-69.397C381.7 2.868 389.2 0 398 0c8.8 0 16.1 2.868 21.9 8.603c5.7 5.737 8.6 12.997 8.6 21.797c0 8.79-2.9 16.06-8.6 21.79L394.6 78h29.3c26.4.77 48 9.75 64.7 26.1zm-38.8 69.7c-.4-9.6-3.7-17.4-10.7-23.5c-5.2-6.1-14-9.4-22.7-9.8H96.05c-9.59.4-17.45 3.7-23.58 9.8c-6.14 6.1-9.4 13.9-9.78 23.5v194.4c0 9.2 3.26 17 9.78 23.5s14.38 9.8 23.58 9.8H416.4c9.2 0 17-3.3 23.3-9.8c6.3-6.5 9.7-14.3 10.1-23.5V173.8zm-264.3 42.7c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2c-6.2 6.3-14 9.5-23.6 9.5c-9.6 0-17.5-3.2-23.6-9.5c-6.1-6.3-9.4-14-9.8-23.2v-33.3c.4-9.1 3.8-16.9 10.1-23.2c6.3-6.3 13.2-9.6 23.3-10c9.2.4 17 3.7 23.3 10zm191.5 0c6.3 6.3 9.7 14.1 10.1 23.2V273c-.4 9.2-3.7 16.9-9.8 23.2c-6.1 6.3-14 9.5-23.6 9.5c-9.6 0-17.4-3.2-23.6-9.5c-7-6.3-9.4-14-9.7-23.2v-33.3c.3-9.1 3.7-16.9 10-23.2c6.3-6.3 14.1-9.6 23.3-10c9.2.4 17 3.7 23.3 10z"></path>
      </svg>`,
        },
        link: 'https://space.bilibili.com/384826367',
      },
    ],

    footer: {
      message: 'Released under the CC BY-NC-SA 4.0 International License.',
      copyright: 'Copyright © 2019 - 2023 ©weijiew.',
    },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'alex' }],
    ['meta', { property: 'og:title', content: 'everystep' }],
    ['meta', { property: 'og:image', content: '/background-cover_.png' }],
    ['meta', { property: 'og:description', content: 'Learn by doing!' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: '/background-cover_.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
})


// > 🧊 上述内容如果存在问题可以去 github.com/weijiew/everystep 下面提 issue ，记录所学，感谢指正。
// > 
// > 🐻 致力于从零实现操作系统、数据库、编译器。热爱开源，欢迎Star。