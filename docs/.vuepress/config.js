const versioning = require('./lib/versioning.js')

module.exports = {
  base: '/',
  title: 'codestep',
  description: '记一些笔记🌼',
  markdown: {
    lineNumbers: true
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ],
  theme: 'default-prefers-color-scheme',
  themeConfig: {
    repo: 'weijiew/codestep',
    repoLabel: 'Github',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    docsDir: 'docs/',
    versions: {
      latest: versioning.versions.latest,
      selected: versioning.versions.latest,
      all: versioning.versions.all
    },
    nav: [{
      text: '联系', items: [
        {
          text: 'GitHub', items: [
            { text: '项目地址', link: 'https://github.com/weijiew/codestep' },
            { text: '反馈提问', link: 'https://github.com/weijiew/codestep/issues/new/choose' }
          ]
        },
        {
          text: '关于作者', items: [
            { text: '个人主页', link: 'https://weijiew.com' }
          ]
        }
      ]
    }],
    searchPlaceholder: 'Search...',
    sidebar: versioning.sidebars,
    lastUpdated: 'Last Updated',
    logo: '/favicon.ico',
    sidebarDepth: 1,
    smoothScroll: true
  },
  plugins: [
    ['vuepress-plugin-container', {
      type: 'callout',
      before: info => `<div class="callout"><p class="title">${info}</p>`,
      after: '</div>'
    }],
    ['vuepress-plugin-container', {
      type: 'tree',
      before: `<pre class="tree"><code>`,
      after: `</code></pre>`
    }],
    ['@vuepress/nprogress'],
    ['vuepress-plugin-mathjax'],
    ['@vuepress/back-to-top'],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-144595390-1'
      }
    ],
    ['@vuepress/medium-zoom'],
    ['@markspec/vuepress-plugin-footnote']
  ]
}
